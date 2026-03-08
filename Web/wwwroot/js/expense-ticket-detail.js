import {
  SingleDatePicker
} from "./chunks/chunk-AS4EE5L2.js";
import {
  getExpenseTicketStatusLabel
} from "./chunks/chunk-BBSOJ6P2.js";
import {
  mapWindowEnumOptions
} from "./chunks/chunk-BVPBMOU4.js";
import {
  mapExpenseTicketDetailHeader,
  mapExpenseTicketDetailLine
} from "./chunks/chunk-AYPP56M4.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-OQYUG3ZL.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-AGYAFSYB.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-BZQM6LH3.js";
import "./chunks/chunk-6YXFJB4W.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-MHFNPMJW.js";
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
} from "./chunks/chunk-TWBQPWHO.js";
import {
  configureExpenseApiAuth,
  deleteExpenseSheetLine,
  deleteExpenseSheetTicket,
  deleteExpenseSheetTicketFile,
  fetchExpenseSheetTicket,
  fetchExpenseSheetTicketPreviewBlob,
  updateExpenseSheetTicket
} from "./chunks/chunk-IDWB5SME.js";
import {
  VisitasPageProviders_default
} from "./chunks/chunk-FQJSMENJ.js";
import {
  EXPENSE_API_DATE_FORMAT_MESSAGE,
  toExpenseApiDdMmYyyy
} from "./chunks/chunk-LCBK6SHP.js";
import {
  canAccess,
  indT,
  showPermissionModal
} from "./chunks/chunk-BYICIYT4.js";
import "./chunks/chunk-7SKLSV7K.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunks/chunk-BWM3JLWG.js";
import {
  ApiFetchError
} from "./chunks/chunk-REMMAK3K.js";
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
  const isFromSheetLink = detailOrigin === "sheet-link" && !!contextSheetId;
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
    if (isFromSheetLink) return;
    if (header.status === 1 && !allowAssignedDraftEdit) return;
    if (!canEditTicket) {
      showPermissionModal();
      return;
    }
    setModalError("");
    setIsEditing(true);
    setStatus(indT("ExpenseSheets_Detail_EditingEnabled", "Editing enabled"));
  }, [allowAssignedDraftEdit, canEditTicket, header, isFromSheetLink, isLoading]);
  (0, import_react4.useEffect)(() => {
    if (!autoEditMode || isFromExpenseLine || isFromSheetLink || autoEditAttemptedRef.current) return;
    if (isLoading || !header) return;
    autoEditAttemptedRef.current = true;
    handleEnableEdit();
  }, [autoEditMode, handleEnableEdit, header, isFromExpenseLine, isFromSheetLink, isLoading]);
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
  const canEditTicketInContext = canEditTicket && !isFromExpenseLine && !isFromSheetLink;
  const canDeleteTicketInContext = canDeleteTicket && !isFromExpenseLine && !isFromSheetLink;
  const ticketTopbarActionMode = isFromExpenseLine || isFromSheetLink ? "view_only" : "default";
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
      if (isFromExpenseLine || isFromSheetLink) return;
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
    [contextSheetId, fileId, isFromExpenseLine, isFromExpenseSheetCreate, isFromSheetLink]
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
    if (isFromSheetLink) return;
    const safeSheetId = safeText(header?.hojaGastosIdDisplay);
    if (!safeSheetId) return;
    navigateToExpenseUrl(`/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(safeSheetId)}`, {
      askConfirmation: isEditing
    });
  }, [header?.hojaGastosIdDisplay, isEditing, isFromSheetLink]);
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
          onOpenExpenseSheet: isFromSheetLink ? void 0 : handleOpenExpenseSheet
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmVzTGlzdC50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3LnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSBcIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4XCI7XG5pbXBvcnQgeyB1c2VUaW1lbGluZUNhcmRFZmZlY3RzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2hvb2tzL3VzZVRpbWVsaW5lQ2FyZEVmZmVjdHMudHNcIjtcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm0udHN4XCI7XG5pbXBvcnQgRXhwZW5zZVRpY2tldExpbmVzTGlzdCBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0TGluZXNMaXN0LnRzeFwiO1xuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uLy4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlVGlja2V0U3RhdHVzTGFiZWwgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzL2V4cGVuc2VUaWNrZXRTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgeyBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuaW1wb3J0IHsgbWFwV2luZG93RW51bU9wdGlvbnMsIHR5cGUgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBwYXJzZUV4cGVuc2VEYXRlLCBzYWZlVGV4dCwgdG9Jc29EYXRlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldy50c1wiO1xuaW1wb3J0IEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWwgZnJvbSBcIi4vRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbC50c3hcIjtcblxuY29uc3QgQUxMT1dFRF9HQVNUT19UWVBFUyA9IG5ldyBTZXQ8bnVtYmVyPihbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMTRdKTtcbmNvbnN0IExJTkVTX1BBR0VfU0laRSA9IDY7XG5jb25zdCBHQVNUT19UWVBFX0xBQkVMX0tFWVM6IFJlY29yZDxudW1iZXIsIHsga2V5OiBzdHJpbmc7IGZhbGxiYWNrOiBzdHJpbmcgfT4gPSB7XG4gIDA6IHsga2V5OiBcIkVudW1fTm9uZVwiLCBmYWxsYmFjazogXCJOb25lXCIgfSxcbiAgMTogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfUGVhamVcIiwgZmFsbGJhY2s6IFwiUGVhamVcIiB9LFxuICAyOiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9QYXJraW5nXCIsIGZhbGxiYWNrOiBcIlBhcmtpbmdcIiB9LFxuICAzOiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9LbVwiLCBmYWxsYmFjazogXCJLbVwiIH0sXG4gIDQ6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0Rlc2F5dW5vXCIsIGZhbGxiYWNrOiBcIkRlc2F5dW5vXCIgfSxcbiAgNTogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfQ29taWRhXCIsIGZhbGxiYWNrOiBcIkNvbWlkYVwiIH0sXG4gIDY6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0NlbmFcIiwgZmFsbGJhY2s6IFwiQ2VuYVwiIH0sXG4gIDc6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0hvdGVsXCIsIGZhbGxiYWNrOiBcIkhvdGVsXCIgfSxcbiAgODogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfVmFyaW9zXCIsIGZhbGxiYWNrOiBcIlZhcmlvc1wiIH0sXG4gIDE0OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9UYXhpXCIsIGZhbGxiYWNrOiBcIlRheGlcIiB9LFxufTtcblxuY29uc3QgcGFnZWRTbGljZSA9IDxULD4oaXRlbXM6IFRbXSwgcGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyKTogVFtdID0+IHtcbiAgaWYgKCFpdGVtcy5sZW5ndGgpIHJldHVybiBbXTtcbiAgY29uc3Qgc2FmZVBhZ2UgPSBNYXRoLm1heCgxLCBwYWdlKTtcbiAgY29uc3Qgc3RhcnQgPSAoc2FmZVBhZ2UgLSAxKSAqIHBhZ2VTaXplO1xuICByZXR1cm4gaXRlbXMuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgcGFnZVNpemUpO1xufTtcblxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxuY29uc3QgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGggPSAoKSA9PiB7XG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoKHtcbiAgICB0b2tlbjogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcbiAgICBlbnRyYU9pZDogc2FmZVRleHQod2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcbiAgICBhcHBDb2RlOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBQX0NPREVfXyksXG4gIH0pO1xufTtcblxuY29uc3QgYnVpbGRGYWxsYmFja0dhc3RvVHlwZU9wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKEdBU1RPX1RZUEVfTEFCRUxfS0VZUylcbiAgICAubWFwKChbY29kZSwgY2ZnXSkgPT4gKHtcbiAgICAgIHZhbHVlOiBTdHJpbmcoY29kZSksXG4gICAgICB0ZXh0OiBpbmRUKGNmZy5rZXksIGNmZy5mYWxsYmFjayksXG4gICAgfSkpXG4gICAgLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PiBOdW1iZXIobGVmdC52YWx1ZSkgLSBOdW1iZXIocmlnaHQudmFsdWUpKTtcbn07XG5cbmNvbnN0IHRvSW5wdXREYXRlID0gKHJhdz86IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlRXhwZW5zZURhdGUocmF3KTtcbiAgcmV0dXJuIHBhcnNlZCA/IHRvSXNvRGF0ZShwYXJzZWQpIDogXCJcIjtcbn07XG5cbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlQ29udGVudCA9ICgpID0+IHtcbiAgY29uc3QgaGFzQWNjZXNzID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJWaWV3XCIpO1xuICBjb25zdCBjYW5FZGl0VGlja2V0ID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJFZGl0XCIpO1xuICBjb25zdCBjYW5EZWxldGVUaWNrZXQgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIkZ1bGxBY2Nlc3NcIik7XG4gIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfVElDS0VUX0ZJTEVfSURfXyk7XG4gIGNvbnN0IGxpbmVDb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3Qgcm91dGVQYXJhbXMgPSB1c2VNZW1vKCgpID0+IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCksIFtdKTtcbiAgY29uc3QgYXV0b0VkaXRNb2RlID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgbW9kZSA9IHJvdXRlUGFyYW1zLmdldChcIm1vZGVcIik7XG4gICAgcmV0dXJuIHNhZmVUZXh0KG1vZGUpLnRvTG93ZXJDYXNlKCkgPT09IFwiZWRpdFwiO1xuICB9LCBbcm91dGVQYXJhbXNdKTtcbiAgY29uc3QgZGV0YWlsT3JpZ2luID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChyb3V0ZVBhcmFtcy5nZXQoXCJvcmlnaW5cIikpLnRvTG93ZXJDYXNlKCksIFtyb3V0ZVBhcmFtc10pO1xuICBjb25zdCBjb250ZXh0U2hlZXRJZCA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwic2hlZXRJZFwiKSksIFtyb3V0ZVBhcmFtc10pO1xuICBjb25zdCBjb250ZXh0TGluZVJlY0lkID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChyb3V0ZVBhcmFtcy5nZXQoXCJsaW5lUmVjSWRcIikpLCBbcm91dGVQYXJhbXNdKTtcbiAgY29uc3QgaXNGcm9tRXhwZW5zZVNoZWV0Q3JlYXRlID0gZGV0YWlsT3JpZ2luID09PSBcInNoZWV0LWNyZWF0ZVwiO1xuICBjb25zdCBpc0Zyb21FeHBlbnNlTGluZSA9IGRldGFpbE9yaWdpbiA9PT0gXCJleHBlbnNlLWxpbmVcIiAmJiAhIWNvbnRleHRTaGVldElkICYmICEhY29udGV4dExpbmVSZWNJZDtcbiAgY29uc3QgaXNGcm9tU2hlZXRMaW5rID0gZGV0YWlsT3JpZ2luID09PSBcInNoZWV0LWxpbmtcIiAmJiAhIWNvbnRleHRTaGVldElkO1xuICBjb25zdCBhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0ID0gaXNGcm9tRXhwZW5zZVNoZWV0Q3JlYXRlO1xuICBjb25zdCBhdXRvRWRpdEF0dGVtcHRlZFJlZiA9IHVzZVJlZihmYWxzZSk7XG5cbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtpc0VkaXRpbmcsIHNldElzRWRpdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFttb2RhbEVycm9yLCBzZXRNb2RhbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbGluZVBhZ2UsIHNldExpbmVQYWdlXSA9IHVzZVN0YXRlKDEpO1xuXG4gIGNvbnN0IFtkcmFmdERlc2NyaXB0aW9uLCBzZXREcmFmdERlc2NyaXB0aW9uXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRHYXN0b1R5cGUsIHNldERyYWZ0R2FzdG9UeXBlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRDdXJyZW5jeUNvZGUsIHNldERyYWZ0Q3VycmVuY3lDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRUcmFuc0RhdGUsIHNldERyYWZ0VHJhbnNEYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRDb21lbnRhcmlvLCBzZXREcmFmdENvbWVudGFyaW9dID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdFVybEZpbGUsIHNldERyYWZ0VXJsRmlsZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0RmlsZU5hbWUsIHNldERyYWZ0RmlsZU5hbWVdID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZpcnN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIiksXG4gICAgICBwcmV2OiBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKSxcbiAgICAgIG5leHQ6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIiksXG4gICAgICBsYXN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpLFxuICAgIH0pLFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgZ2FzdG9UeXBlT3B0aW9ucyA9IHVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPigoKSA9PiB7XG4gICAgY29uc3Qgc291cmNlID0gQXJyYXkuaXNBcnJheSh3aW5kb3cuX19FWFBFTlNFX0dBU1RPX1RZUEVTX18pID8gd2luZG93Ll9fRVhQRU5TRV9HQVNUT19UWVBFU19fIDogW107XG4gICAgY29uc3QgbWFwcGVkID0gbWFwV2luZG93RW51bU9wdGlvbnMoc291cmNlKS5maWx0ZXIoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBwYXJzZWQgPSBOdW1iZXIoZW50cnkudmFsdWUpO1xuICAgICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIocGFyc2VkKSAmJiBBTExPV0VEX0dBU1RPX1RZUEVTLmhhcyhwYXJzZWQpO1xuICAgIH0pO1xuXG4gICAgaWYgKG1hcHBlZC5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gbWFwcGVkLnNvcnQoKGxlZnQsIHJpZ2h0KSA9PiBOdW1iZXIobGVmdC52YWx1ZSkgLSBOdW1iZXIocmlnaHQudmFsdWUpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVpbGRGYWxsYmFja0dhc3RvVHlwZU9wdGlvbnMoKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGdhc3RvVHlwZUxhYmVsTWFwID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiAgICBmb3IgKGNvbnN0IG9wdGlvbiBvZiBnYXN0b1R5cGVPcHRpb25zKSB7XG4gICAgICBtYXAuc2V0KFN0cmluZyhvcHRpb24udmFsdWUpLCBvcHRpb24udGV4dCk7XG4gICAgfVxuICAgIHJldHVybiBtYXA7XG4gIH0sIFtnYXN0b1R5cGVPcHRpb25zXSk7XG5cbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXG4gIH0pO1xuXG4gIGNvbnN0IHsgaGVhZGVyLCBsaW5lcywgaXNMb2FkaW5nLCBlcnJvck1lc3NhZ2UsIHJlbG9hZERldGFpbCB9ID0gdXNlRXhwZW5zZVRpY2tldERldGFpbFN0YXRlKHtcbiAgICBoYXNBY2Nlc3MsXG4gICAgZmlsZUlkLFxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxuICB9KTtcblxuICBjb25zdCBwcmV2aWV3U291cmNlVXJsID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChpc0VkaXRpbmcgPyBkcmFmdFVybEZpbGUgOiBoZWFkZXI/LnVybEZpbGUpLCBbZHJhZnRVcmxGaWxlLCBoZWFkZXI/LnVybEZpbGUsIGlzRWRpdGluZ10pO1xuICBjb25zdCBwcmV2aWV3QWx0VGV4dCA9IHVzZU1lbW8oXG4gICAgKCkgPT4gc2FmZVRleHQoaXNFZGl0aW5nID8gZHJhZnRGaWxlTmFtZSA6IGhlYWRlcj8uZmlsZU5hbWUpIHx8IGluZFQoXCJUaWNrZXRzX0ZpZWxkX0ZpbGVJZFwiLCBcIlRpY2tldFwiKSxcbiAgICBbZHJhZnRGaWxlTmFtZSwgaGVhZGVyPy5maWxlTmFtZSwgaXNFZGl0aW5nXVxuICApO1xuICBjb25zdCB7XG4gICAgcHJldmlld09wZW4sXG4gICAgcHJldmlld0J1c3ksXG4gICAgcHJldmlld0Vycm9yLFxuICAgIHByZXZpZXdJbWFnZVVybCxcbiAgICBwcmV2aWV3U2NhbGUsXG4gICAgcHJldmlld1RyYW5zbGF0ZSxcbiAgICBvcGVuUHJldmlldyxcbiAgICBjbG9zZVByZXZpZXcsXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duLFxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSxcbiAgICBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCxcbiAgICBoYW5kbGVQcmV2aWV3V2hlZWwsXG4gIH0gPSB1c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3KHsgc291cmNlVXJsOiBwcmV2aWV3U291cmNlVXJsIH0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzRWRpdGluZyB8fCAhaGVhZGVyKSByZXR1cm47XG5cbiAgICBzZXREcmFmdERlc2NyaXB0aW9uKHNhZmVUZXh0KGhlYWRlci5kZXNjcmlwdGlvbikpO1xuICAgIHNldERyYWZ0R2FzdG9UeXBlKGhlYWRlci5nYXN0b1R5cGUgPT09IG51bGwgPyBcIlwiIDogU3RyaW5nKGhlYWRlci5nYXN0b1R5cGUpKTtcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZShzYWZlVGV4dChoZWFkZXIuY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpKTtcbiAgICBzZXREcmFmdFRyYW5zRGF0ZSh0b0lucHV0RGF0ZShoZWFkZXIudHJhbnNEYXRlKSk7XG4gICAgc2V0RHJhZnRDb21lbnRhcmlvKHNhZmVUZXh0KGhlYWRlci5jb21lbnRhcmlvKSk7XG4gICAgc2V0RHJhZnRVcmxGaWxlKHNhZmVUZXh0KGhlYWRlci51cmxGaWxlKSk7XG4gICAgc2V0RHJhZnRGaWxlTmFtZShzYWZlVGV4dChoZWFkZXIuZmlsZU5hbWUpKTtcbiAgfSwgW2hlYWRlciwgaXNFZGl0aW5nXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBtYXhQYWdlID0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKGxpbmVzLmxlbmd0aCAvIExJTkVTX1BBR0VfU0laRSkpO1xuICAgIGlmIChsaW5lUGFnZSA+IG1heFBhZ2UpIHtcbiAgICAgIHNldExpbmVQYWdlKG1heFBhZ2UpO1xuICAgIH1cbiAgfSwgW2xpbmVQYWdlLCBsaW5lcy5sZW5ndGhdKTtcblxuICBjb25zdCB2aXNpYmxlTGluZXMgPSB1c2VNZW1vKCgpID0+IHBhZ2VkU2xpY2UobGluZXMsIGxpbmVQYWdlLCBMSU5FU19QQUdFX1NJWkUpLCBbbGluZVBhZ2UsIGxpbmVzXSk7XG4gIGNvbnN0IHRvdGFsTGluZVBhZ2VzID0gTWF0aC5jZWlsKChsaW5lcy5sZW5ndGggfHwgMCkgLyBMSU5FU19QQUdFX1NJWkUpO1xuXG4gIGNvbnN0IGhhbmRsZUVuYWJsZUVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFoZWFkZXIgfHwgaXNMb2FkaW5nKSByZXR1cm47XG4gICAgaWYgKGlzRnJvbVNoZWV0TGluaykgcmV0dXJuO1xuICAgIGlmIChoZWFkZXIuc3RhdHVzID09PSAxICYmICFhbGxvd0Fzc2lnbmVkRHJhZnRFZGl0KSByZXR1cm47XG4gICAgaWYgKCFjYW5FZGl0VGlja2V0KSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XG4gICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9FZGl0aW5nRW5hYmxlZFwiLCBcIkVkaXRpbmcgZW5hYmxlZFwiKSk7XG4gIH0sIFthbGxvd0Fzc2lnbmVkRHJhZnRFZGl0LCBjYW5FZGl0VGlja2V0LCBoZWFkZXIsIGlzRnJvbVNoZWV0TGluaywgaXNMb2FkaW5nXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWF1dG9FZGl0TW9kZSB8fCBpc0Zyb21FeHBlbnNlTGluZSB8fCBpc0Zyb21TaGVldExpbmsgfHwgYXV0b0VkaXRBdHRlbXB0ZWRSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGlmIChpc0xvYWRpbmcgfHwgIWhlYWRlcikgcmV0dXJuO1xuICAgIGF1dG9FZGl0QXR0ZW1wdGVkUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgIGhhbmRsZUVuYWJsZUVkaXQoKTtcbiAgfSwgW2F1dG9FZGl0TW9kZSwgaGFuZGxlRW5hYmxlRWRpdCwgaGVhZGVyLCBpc0Zyb21FeHBlbnNlTGluZSwgaXNGcm9tU2hlZXRMaW5rLCBpc0xvYWRpbmddKTtcblxuICBjb25zdCBoYW5kbGVDYW5jZWxFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghaXNFZGl0aW5nKSByZXR1cm47XG4gICAgaWYgKCFoZWFkZXIpIHtcbiAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgIHNldERyYWZ0RGVzY3JpcHRpb24oc2FmZVRleHQoaGVhZGVyLmRlc2NyaXB0aW9uKSk7XG4gICAgc2V0RHJhZnRHYXN0b1R5cGUoaGVhZGVyLmdhc3RvVHlwZSA9PT0gbnVsbCA/IFwiXCIgOiBTdHJpbmcoaGVhZGVyLmdhc3RvVHlwZSkpO1xuICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlKHNhZmVUZXh0KGhlYWRlci5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCkpO1xuICAgIHNldERyYWZ0VHJhbnNEYXRlKHRvSW5wdXREYXRlKGhlYWRlci50cmFuc0RhdGUpKTtcbiAgICBzZXREcmFmdENvbWVudGFyaW8oc2FmZVRleHQoaGVhZGVyLmNvbWVudGFyaW8pKTtcbiAgICBzZXREcmFmdFVybEZpbGUoc2FmZVRleHQoaGVhZGVyLnVybEZpbGUpKTtcbiAgICBzZXREcmFmdEZpbGVOYW1lKHNhZmVUZXh0KGhlYWRlci5maWxlTmFtZSkpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKSk7XG4gIH0sIFtoZWFkZXIsIGlzRWRpdGluZ10pO1xuXG4gIGNvbnN0IHsgaGFuZGxlVXBkYXRlLCBoYW5kbGVEZWxldGUgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnMoe1xuICAgIGJ1c3ksXG4gICAgaXNFZGl0aW5nLFxuICAgIGNhbkVkaXRUaWNrZXQsXG4gICAgY2FuRGVsZXRlVGlja2V0LFxuICAgIGZpbGVJZCxcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0R2FzdG9UeXBlLFxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIGRyYWZ0VHJhbnNEYXRlLFxuICAgIGRyYWZ0Q29tZW50YXJpbyxcbiAgICBkcmFmdFVybEZpbGUsXG4gICAgZHJhZnRGaWxlTmFtZSxcbiAgICBkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQ6IGlzRnJvbUV4cGVuc2VMaW5lXG4gICAgICA/IHtcbiAgICAgICAgICBzaGVldElkOiBjb250ZXh0U2hlZXRJZCxcbiAgICAgICAgICBsaW5lUmVjSWQ6IGNvbnRleHRMaW5lUmVjSWQsXG4gICAgICAgIH1cbiAgICAgIDogbnVsbCxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzRWRpdGluZyxcbiAgfSk7XG5cbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XG4gICAgICBidXN5LFxuICAgICAgb25FcnJvcjogKG1zZykgPT4ge1xuICAgICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm1dKTtcblxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKTtcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGJ1c3lcbiAgICA/IG1vZGFsTG9hZGluZ1RleHRcbiAgICA6ICFidXN5ICYmIG1vZGFsRXJyb3JcbiAgICAgID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpXG4gICAgICA6IG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpO1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xuICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZvaWQgaGFuZGxlTW9kYWxDb25maXJtKCk7XG4gIH0sIFtidXN5LCBjbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybSwgbW9kYWxFcnJvcl0pO1xuXG4gIGNvbnN0IGlzQXNzaWduZWRUaWNrZXQgPSBoZWFkZXI/LnN0YXR1cyA9PT0gMTtcbiAgY29uc3QgaXNDb250ZXh0TG9ja2VkID0gaXNBc3NpZ25lZFRpY2tldCAmJiAhYWxsb3dBc3NpZ25lZERyYWZ0RWRpdDtcbiAgY29uc3QgY2FuRWRpdFRpY2tldEluQ29udGV4dCA9IGNhbkVkaXRUaWNrZXQgJiYgIWlzRnJvbUV4cGVuc2VMaW5lICYmICFpc0Zyb21TaGVldExpbms7XG4gIGNvbnN0IGNhbkRlbGV0ZVRpY2tldEluQ29udGV4dCA9IGNhbkRlbGV0ZVRpY2tldCAmJiAhaXNGcm9tRXhwZW5zZUxpbmUgJiYgIWlzRnJvbVNoZWV0TGluaztcbiAgY29uc3QgdGlja2V0VG9wYmFyQWN0aW9uTW9kZTogXCJkZWZhdWx0XCIgfCBcInZpZXdfb25seVwiID0gaXNGcm9tRXhwZW5zZUxpbmUgfHwgaXNGcm9tU2hlZXRMaW5rID8gXCJ2aWV3X29ubHlcIiA6IFwiZGVmYXVsdFwiO1xuXG4gIHVzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zKHtcbiAgICBidXN5LFxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcbiAgICBpc0VkaXRpbmcsXG4gICAgaXNMb2NrZWQ6IGlzQ29udGV4dExvY2tlZCxcbiAgICBhY3Rpb25Nb2RlOiB0aWNrZXRUb3BiYXJBY3Rpb25Nb2RlLFxuICAgIGNhbkVkaXRUaWNrZXQ6IGNhbkVkaXRUaWNrZXRJbkNvbnRleHQsXG4gICAgY2FuRGVsZXRlVGlja2V0OiBjYW5EZWxldGVUaWNrZXRJbkNvbnRleHQsXG4gICAgZmlsZUlkLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxuICAgIGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVEZWxldGUsXG4gICAgb25TYXZlU3VjY2VzczogKCkgPT4ge1xuICAgICAgdm9pZCByZWxvYWREZXRhaWwoKTtcbiAgICB9LFxuICAgIG9uRGVsZXRlU3VjY2VzczogaXNGcm9tRXhwZW5zZUxpbmVcbiAgICAgID8gKCkgPT4ge1xuICAgICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoY29udGV4dFNoZWV0SWQpfWApO1xuICAgICAgICB9XG4gICAgICA6IHVuZGVmaW5lZCxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBjbG9zZUNvbmZpcm0sXG4gIH0pO1xuXG4gIGNvbnN0IG9wZW5MaW5lRGV0YWlsID0gdXNlQ2FsbGJhY2soXG4gICAgKHJhd0xpbmVSZWNJZDogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoaXNGcm9tRXhwZW5zZUxpbmUgfHwgaXNGcm9tU2hlZXRMaW5rKSByZXR1cm47XG4gICAgICBjb25zdCBsaW5lUmVjSWQgPSBzYWZlVGV4dChyYXdMaW5lUmVjSWQpO1xuICAgICAgaWYgKCFsaW5lUmVjSWQpIHJldHVybjtcbiAgICAgIGlmICghZmlsZUlkKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XG4gICAgICAgIGZpbGVJZCxcbiAgICAgICAgbGluZVJlY0lkLFxuICAgICAgfSk7XG4gICAgICBpZiAoaXNGcm9tRXhwZW5zZVNoZWV0Q3JlYXRlKSB7XG4gICAgICAgIHF1ZXJ5LnNldChcIm9yaWdpblwiLCBcInNoZWV0LWNyZWF0ZVwiKTtcbiAgICAgICAgcXVlcnkuc2V0KFwibW9kZVwiLCBcImVkaXRcIik7XG4gICAgICAgIGlmIChjb250ZXh0U2hlZXRJZCkge1xuICAgICAgICAgIHF1ZXJ5LnNldChcInNoZWV0SWRcIiwgY29udGV4dFNoZWV0SWQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRhcmdldFVybCA9IGAvR2FzdG9zL1RpY2tldExpbmVEZXRhaWw/JHtxdWVyeS50b1N0cmluZygpfWA7XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwsIHtcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiB0cnVlLFxuICAgICAgICBieXBhc3NHdWFyZE9uY2U6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbY29udGV4dFNoZWV0SWQsIGZpbGVJZCwgaXNGcm9tRXhwZW5zZUxpbmUsIGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSwgaXNGcm9tU2hlZXRMaW5rXVxuICApO1xuXG4gIGNvbnN0IHJlc29sdmVDbGlja2FibGVDYXJkID0gdXNlQ2FsbGJhY2soKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XG4gICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG4gICAgaWYgKCFub2RlIHx8IHR5cGVvZiBub2RlLmNsb3Nlc3QgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgY2FyZCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIpO1xuICAgIGlmICghY2FyZCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCFsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKGNhcmQpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY2FyZDtcbiAgfSwgW10pO1xuXG4gIHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMoe1xuICAgIGNvbnRhaW5lclJlZjogbGluZUNvbnRhaW5lclJlZixcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgaXRlbXM6IHZpc2libGVMaW5lcyxcbiAgICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcbiAgfSk7XG5cbiAgY29uc3Qgb3BlbkZpbGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgdm9pZCBvcGVuUHJldmlldygpO1xuICB9LCBbb3BlblByZXZpZXddKTtcblxuICBjb25zdCBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChpc0Zyb21TaGVldExpbmspIHJldHVybjtcbiAgICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KGhlYWRlcj8uaG9qYUdhc3Rvc0lkRGlzcGxheSk7XG4gICAgaWYgKCFzYWZlU2hlZXRJZCkgcmV0dXJuO1xuXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlU2hlZXRJZCl9YCwge1xuICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXG4gICAgfSk7XG4gIH0sIFtoZWFkZXI/LmhvamFHYXN0b3NJZERpc3BsYXksIGlzRWRpdGluZywgaXNGcm9tU2hlZXRMaW5rXSk7XG5cbiAgY29uc3Qgc3RhdHVzTGFiZWwgPSB1c2VNZW1vKCgpID0+IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbChoZWFkZXI/LnN0YXR1cyksIFtoZWFkZXI/LnN0YXR1c10pO1xuICBjb25zdCBnYXN0b1R5cGVMYWJlbCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRHYXN0b1R5cGUgPSBpc0VkaXRpbmcgPyBkcmFmdEdhc3RvVHlwZSA6IGhlYWRlcj8uZ2FzdG9UeXBlID09PSBudWxsID8gXCJcIiA6IFN0cmluZyhoZWFkZXI/Lmdhc3RvVHlwZSA/PyBcIlwiKTtcbiAgICBpZiAoIWN1cnJlbnRHYXN0b1R5cGUpIHtcbiAgICAgIHJldHVybiBpbmRUKFwiQ29tbW9uX05vdEF2YWlsYWJsZVwiLCBcIk4vQVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIGdhc3RvVHlwZUxhYmVsTWFwLmdldChTdHJpbmcoY3VycmVudEdhc3RvVHlwZSkpIHx8IFN0cmluZyhjdXJyZW50R2FzdG9UeXBlKTtcbiAgfSwgW2RyYWZ0R2FzdG9UeXBlLCBnYXN0b1R5cGVMYWJlbE1hcCwgaGVhZGVyPy5nYXN0b1R5cGUsIGlzRWRpdGluZ10pO1xuICBjb25zdCB0b3RhbEFtb3VudFRleHQgPSB1c2VNZW1vKFxuICAgICgpID0+IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShoZWFkZXI/LnRvdGFsQW1vdW50ID8/IG51bGwsIChpc0VkaXRpbmcgPyBkcmFmdEN1cnJlbmN5Q29kZSA6IGhlYWRlcj8uY3VycmVuY3lDb2RlKSB8fCBoZWFkZXI/LmN1cnJlbmN5Q29kZSksXG4gICAgW2RyYWZ0Q3VycmVuY3lDb2RlLCBoZWFkZXI/LmN1cnJlbmN5Q29kZSwgaGVhZGVyPy50b3RhbEFtb3VudCwgaXNFZGl0aW5nXVxuICApO1xuICBjb25zdCB0cmFuc0RhdGVUZXh0ID0gdXNlTWVtbyhcbiAgICAoKSA9PiBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoaXNFZGl0aW5nID8gZHJhZnRUcmFuc0RhdGUgOiBoZWFkZXI/LnRyYW5zRGF0ZSwgZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCIpLFxuICAgIFtkcmFmdFRyYW5zRGF0ZSwgaGVhZGVyPy50cmFuc0RhdGUsIGlzRWRpdGluZ11cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICA8Q29uZmlybU1vZGFsXG4gICAgICAgIG9wZW49e21vZGFsLm9wZW59XG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cbiAgICAgICAgY29uZmlybVRleHQ9e21vZGFsQ29uZmlybVRleHR9XG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsTG9hZGluZ1RleHR9XG4gICAgICAgIHNob3dDYW5jZWw9e21vZGFsLnNob3dDYW5jZWx9XG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cbiAgICAgICAgYnVzeT17YnVzeX1cbiAgICAgICAgZXJyb3I9e21vZGFsRXJyb3J9XG4gICAgICAgIHN0YXR1cz17c3RhdHVzfVxuICAgICAgICBvbkNvbmZpcm09e2hhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cbiAgICAgICAgb25DYW5jZWw9e2Nsb3NlQ29uZmlybX1cbiAgICAgIC8+XG4gICAgICA8RXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbFxuICAgICAgICBvcGVuPXtwcmV2aWV3T3Blbn1cbiAgICAgICAgYnVzeT17cHJldmlld0J1c3l9XG4gICAgICAgIGVycm9yPXtwcmV2aWV3RXJyb3J9XG4gICAgICAgIGltYWdlVXJsPXtwcmV2aWV3SW1hZ2VVcmx9XG4gICAgICAgIGltYWdlQWx0PXtwcmV2aWV3QWx0VGV4dH1cbiAgICAgICAgc2NhbGU9e3ByZXZpZXdTY2FsZX1cbiAgICAgICAgdHJhbnNsYXRlPXtwcmV2aWV3VHJhbnNsYXRlfVxuICAgICAgICBvbkNsb3NlPXtjbG9zZVByZXZpZXd9XG4gICAgICAgIG9uUG9pbnRlckRvd249e2hhbmRsZVByZXZpZXdQb2ludGVyRG93bn1cbiAgICAgICAgb25Qb2ludGVyTW92ZT17aGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlfVxuICAgICAgICBvblBvaW50ZXJFbmQ9e2hhbmRsZVByZXZpZXdQb2ludGVyRW5kfVxuICAgICAgICBvbldoZWVsPXtoYW5kbGVQcmV2aWV3V2hlZWx9XG4gICAgICAvPlxuXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGlzTG9hZGluZyA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cbiAgICAgID5cbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cbiAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHtlcnJvck1lc3NhZ2UgPyA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2Vycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxuXG4gICAgICB7IWlzTG9hZGluZyAmJiAhZXJyb3JNZXNzYWdlICYmIGhlYWRlciA/IChcbiAgICAgICAgPD5cbiAgICAgICAgICA8RXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm1cbiAgICAgICAgICAgIGhlYWRlcj17aGVhZGVyfVxuICAgICAgICAgICAgc3RhdHVzTGFiZWw9e3N0YXR1c0xhYmVsfVxuICAgICAgICAgICAgZ2FzdG9UeXBlTGFiZWw9e2dhc3RvVHlwZUxhYmVsfVxuICAgICAgICAgICAgdG90YWxBbW91bnRUZXh0PXt0b3RhbEFtb3VudFRleHR9XG4gICAgICAgICAgICB0cmFuc0RhdGVUZXh0PXt0cmFuc0RhdGVUZXh0fVxuICAgICAgICAgICAgaXNFZGl0aW5nPXtpc0VkaXRpbmd9XG4gICAgICAgICAgICBnYXN0b1R5cGVPcHRpb25zPXtnYXN0b1R5cGVPcHRpb25zfVxuICAgICAgICAgICAgZHJhZnREZXNjcmlwdGlvbj17ZHJhZnREZXNjcmlwdGlvbn1cbiAgICAgICAgICAgIGRyYWZ0R2FzdG9UeXBlPXtkcmFmdEdhc3RvVHlwZX1cbiAgICAgICAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlPXtkcmFmdEN1cnJlbmN5Q29kZX1cbiAgICAgICAgICAgIGRyYWZ0VHJhbnNEYXRlPXtkcmFmdFRyYW5zRGF0ZX1cbiAgICAgICAgICAgIGRyYWZ0VXJsRmlsZT17ZHJhZnRVcmxGaWxlfVxuICAgICAgICAgICAgZHJhZnRGaWxlTmFtZT17ZHJhZnRGaWxlTmFtZX1cbiAgICAgICAgICAgIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZT17c2V0RHJhZnREZXNjcmlwdGlvbn1cbiAgICAgICAgICAgIG9uRHJhZnRHYXN0b1R5cGVDaGFuZ2U9e3NldERyYWZ0R2FzdG9UeXBlfVxuICAgICAgICAgICAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZT17c2V0RHJhZnRDdXJyZW5jeUNvZGV9XG4gICAgICAgICAgICBvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlPXtzZXREcmFmdFRyYW5zRGF0ZX1cbiAgICAgICAgICAgIG9uT3BlbkZpbGU9e29wZW5GaWxlfVxuICAgICAgICAgICAgb25PcGVuRXhwZW5zZVNoZWV0PXtpc0Zyb21TaGVldExpbmsgPyB1bmRlZmluZWQgOiBoYW5kbGVPcGVuRXhwZW5zZVNoZWV0fVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEV4cGVuc2VUaWNrZXRMaW5lc0xpc3RcbiAgICAgICAgICAgIHZpc2libGVMaW5lcz17dmlzaWJsZUxpbmVzfVxuICAgICAgICAgICAgdG90YWxMaW5lUGFnZXM9e3RvdGFsTGluZVBhZ2VzfVxuICAgICAgICAgICAgbGluZVBhZ2U9e2xpbmVQYWdlfVxuICAgICAgICAgICAgY3VycmVuY3lDb2RlPXtpc0VkaXRpbmcgPyBkcmFmdEN1cnJlbmN5Q29kZSA6IHNhZmVUZXh0KGhlYWRlci5jdXJyZW5jeUNvZGUpfVxuICAgICAgICAgICAgcGFnaW5hdGlvbkxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cbiAgICAgICAgICAgIGNvbnRhaW5lclJlZj17bGluZUNvbnRhaW5lclJlZn1cbiAgICAgICAgICAgIG9uTGluZVBhZ2VDaGFuZ2U9e3NldExpbmVQYWdlfVxuICAgICAgICAgICAgb25PcGVuTGluZT17b3BlbkxpbmVEZXRhaWx9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1zbGF0ZS02MDBcIj57c3RhdHVzfTwvZGl2PlxuICAgICAgICA8Lz5cbiAgICAgICkgOiBudWxsfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gTWFpbiBwYWdlIGVudHJ5IGZvciBleHBlbnNlIHRpY2tldCBkZXRhaWwuXG5jb25zdCBFeHBlbnNlVGlja2V0RGV0YWlsUGFnZSA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnMgZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQ+XG4gICAgICA8RXhwZW5zZVRpY2tldERldGFpbFBhZ2VDb250ZW50IC8+XG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgKTtcbn07XG5cbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cGVuc2UtdGlja2V0LWRldGFpbC1yb290XCIpO1xuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlIC8+KTtcbn07XG5cbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0RGV0YWlsUGFnZTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IFNpbmdsZURhdGVQaWNrZXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TaW5nbGVEYXRlUGlja2VyLnRzeFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfSBmcm9tIFwiLi4vdGlja2V0cy9kZXRhaWwvZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgRXhwZW5zZVJlYWRPbmx5RmllbGQgZnJvbSBcIi4vRXhwZW5zZVJlYWRPbmx5RmllbGQudHN4XCI7XG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdC50c3hcIjtcblxuY29uc3QgaGFzUmVhbEV4cGVuc2VTaGVldFZhbHVlID0gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IHNhZmVUZXh0KHZhbHVlKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBmYWxzZTtcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwiLVwiIHx8IG5vcm1hbGl6ZWQgPT09IFwiMFwiKSByZXR1cm4gZmFsc2U7XG4gIGlmIChub3JtYWxpemVkID09PSBcIm4vYVwiIHx8IG5vcm1hbGl6ZWQgPT09IFwibmFcIikgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmNvbnN0IElNQUdFX0VYVEVOU0lPTlMgPSBuZXcgU2V0PHN0cmluZz4oW1wianBnXCIsIFwianBlZ1wiLCBcInBuZ1wiLCBcIndlYnBcIiwgXCJnaWZcIiwgXCJibXBcIiwgXCJoZWljXCIsIFwiaGVpZlwiLCBcImF2aWZcIl0pO1xuXG5jb25zdCBnZXRGaWxlRXh0ZW5zaW9uRnJvbVBhdGggPSAodmFsdWU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHNvdXJjZSA9IHNhZmVUZXh0KHZhbHVlKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoIXNvdXJjZSkgcmV0dXJuIFwiXCI7XG5cbiAgY29uc3Qgd2l0aG91dFF1ZXJ5ID0gc291cmNlLnNwbGl0KFwiP1wiKVswXS5zcGxpdChcIiNcIilbMF07XG4gIGNvbnN0IHBhcnRzID0gd2l0aG91dFF1ZXJ5LnNwbGl0KFwiLlwiKTtcbiAgaWYgKHBhcnRzLmxlbmd0aCA8IDIpIHJldHVybiBcIlwiO1xuXG4gIGNvbnN0IHJhd0V4dCA9IHNhZmVUZXh0KHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdKS5yZXBsYWNlKC9bXmEtejAtOV0vZywgXCJcIik7XG4gIHJldHVybiByYXdFeHQgPT09IFwianBlZ1wiID8gXCJqcGdcIiA6IHJhd0V4dDtcbn07XG5cbmNvbnN0IGhhc0ltYWdlUHJldmlld0xpbmsgPSAodXJsVmFsdWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBub3JtYWxpemVkVXJsID0gc2FmZVRleHQodXJsVmFsdWUpO1xuICBpZiAoIW5vcm1hbGl6ZWRVcmwpIHJldHVybiBmYWxzZTtcblxuICBpZiAobm9ybWFsaXplZFVybC50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoXCJkYXRhOmltYWdlL1wiKSkgcmV0dXJuIHRydWU7XG5cbiAgY29uc3QgZXh0ZW5zaW9uID0gZ2V0RmlsZUV4dGVuc2lvbkZyb21QYXRoKG5vcm1hbGl6ZWRVcmwpO1xuICBpZiAoZXh0ZW5zaW9uICYmIElNQUdFX0VYVEVOU0lPTlMuaGFzKGV4dGVuc2lvbikpIHJldHVybiB0cnVlO1xuXG4gIGNvbnN0IG5vcm1hbGl6ZWRMb3dlciA9IG5vcm1hbGl6ZWRVcmwudG9Mb3dlckNhc2UoKTtcbiAgaWYgKG5vcm1hbGl6ZWRMb3dlci5pbmNsdWRlcyhcImJsb2IuY29yZS53aW5kb3dzLm5ldFwiKSAmJiBub3JtYWxpemVkTG93ZXIuaW5jbHVkZXMoXCJpbWFnZVwiKSkgcmV0dXJuIHRydWU7XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxudHlwZSBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybVByb3BzID0ge1xuICBoZWFkZXI6IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXI7XG4gIHN0YXR1c0xhYmVsOiBzdHJpbmc7XG4gIGdhc3RvVHlwZUxhYmVsOiBzdHJpbmc7XG4gIHRvdGFsQW1vdW50VGV4dDogc3RyaW5nO1xuICB0cmFuc0RhdGVUZXh0OiBzdHJpbmc7XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgZ2FzdG9UeXBlT3B0aW9uczogQXJyYXk8eyB2YWx1ZTogc3RyaW5nOyB0ZXh0OiBzdHJpbmcgfT47XG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcbiAgZHJhZnRHYXN0b1R5cGU6IHN0cmluZztcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgZHJhZnRUcmFuc0RhdGU6IHN0cmluZztcbiAgZHJhZnRVcmxGaWxlOiBzdHJpbmc7XG4gIGRyYWZ0RmlsZU5hbWU6IHN0cmluZztcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdEdhc3RvVHlwZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25PcGVuRmlsZTogKCkgPT4gdm9pZDtcbiAgb25PcGVuRXhwZW5zZVNoZWV0PzogKCkgPT4gdm9pZDtcbn07XG5cbi8vIFJlYWQtb25seSBhbmQgZWRpdGFibGUgaGVhZGVyIGZvcm0gZm9yIHRpY2tldCBkZXRhaWwuXG5jb25zdCBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybSA9ICh7XG4gIGhlYWRlcixcbiAgc3RhdHVzTGFiZWwsXG4gIGdhc3RvVHlwZUxhYmVsLFxuICB0b3RhbEFtb3VudFRleHQsXG4gIHRyYW5zRGF0ZVRleHQsXG4gIGlzRWRpdGluZyxcbiAgZ2FzdG9UeXBlT3B0aW9ucyxcbiAgZHJhZnREZXNjcmlwdGlvbixcbiAgZHJhZnRHYXN0b1R5cGUsXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICBkcmFmdFRyYW5zRGF0ZSxcbiAgZHJhZnRVcmxGaWxlLFxuICBkcmFmdEZpbGVOYW1lLFxuICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2UsXG4gIG9uRHJhZnRHYXN0b1R5cGVDaGFuZ2UsXG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2UsXG4gIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2UsXG4gIG9uT3BlbkZpbGUsXG4gIG9uT3BlbkV4cGVuc2VTaGVldCxcbn06IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtUHJvcHMpID0+IHtcbiAgY29uc3QgcHJldmlld1VybCA9IHNhZmVUZXh0KGlzRWRpdGluZyA/IGRyYWZ0VXJsRmlsZSA6IGhlYWRlci51cmxGaWxlKTtcbiAgY29uc3QgY2FuT3BlbkZpbGUgPSBoYXNJbWFnZVByZXZpZXdMaW5rKHByZXZpZXdVcmwpO1xuICBjb25zdCBzaG93RXhwZW5zZVNoZWV0RmllbGQgPSBoYXNSZWFsRXhwZW5zZVNoZWV0VmFsdWUoaGVhZGVyLmhvamFHYXN0b3NJZERpc3BsYXkpO1xuXG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicmVsYXRpdmUgc2hhZG93LXhzIGdsYXNzLXBhbmVsIHAtNCBzcGFjZS15LTQgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC0yeGxcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiPlxuICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmllbGRfRmlsZUlkXCIsIFwiVGlja2V0XCIpfVxuICAgICAgICAgIHZhbHVlPXtoZWFkZXIuZmlsZUlkIHx8IFwiLVwifVxuICAgICAgICAvPlxuXG4gICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9TdGF0dXNcIiwgXCJTdGF0dXNcIil9XG4gICAgICAgICAgdmFsdWU9e3N0YXR1c0xhYmVsIHx8IFwiLVwifVxuICAgICAgICAvPlxuXG4gICAgICAgIHtpc0VkaXRpbmcgPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbTpjb2wtc3Bhbi0yIHNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnREZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKX1cbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtoZWFkZXIuZGVzY3JpcHRpb24gfHwgXCItXCJ9XG4gICAgICAgICAgICBmdWxsV2lkdGhcbiAgICAgICAgICAvPlxuICAgICAgICApfVxuXG4gICAgICAgIHtpc0VkaXRpbmcgPyAoXG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIil9XG4gICAgICAgICAgICBvcHRpb25zPXtnYXN0b1R5cGVPcHRpb25zfVxuICAgICAgICAgICAgdmFsdWU9e2RyYWZ0R2FzdG9UeXBlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRHYXN0b1R5cGVDaGFuZ2V9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIil9XG4gICAgICAgICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxuICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxuICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtnYXN0b1R5cGVMYWJlbCB8fCBcIi1cIn1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuXG4gICAgICAgIHtzaG93RXhwZW5zZVNoZWV0RmllbGQgPyAoXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlRpY2tldHNfRmllbGRfRXhwZW5zZVNoZWV0RGlzcGxheVwiLCBcIkV4cGVuc2Ugc2hlZXRcIil9XG4gICAgICAgICAgICB2YWx1ZT17aGVhZGVyLmhvamFHYXN0b3NJZERpc3BsYXkgfHwgXCItXCJ9XG4gICAgICAgICAgICBvbkNsaWNrPXtvbk9wZW5FeHBlbnNlU2hlZXR9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICA8RXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgdmFsdWU9e2RyYWZ0Q3VycmVuY3lDb2RlfVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2V9XG4gICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLXRpY2tldC1kZXRhaWwtY3VycmVuY3lcIlxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtoZWFkZXIuY3VycmVuY3lDb2RlIHx8IFwiLVwifVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG5cbiAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1RvdGFsQW1vdW50XCIsIFwiVG90YWwgYW1vdW50XCIpfVxuICAgICAgICAgIHZhbHVlPXt0b3RhbEFtb3VudFRleHQgfHwgXCItXCJ9XG4gICAgICAgIC8+XG5cbiAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZpc2l0YS1maWVsZC10ZXh0XCI+XG4gICAgICAgICAgICA8U2luZ2xlRGF0ZVBpY2tlclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3JlYXRlZERhdGVcIiwgXCJEYXRlXCIpfVxuICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRUcmFuc0RhdGV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlfVxuICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmd9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DcmVhdGVkRGF0ZVwiLCBcIkRhdGVcIil9XG4gICAgICAgICAgICAgIHZhbHVlPXt0cmFuc0RhdGVUZXh0IHx8IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShoZWFkZXIudHJhbnNEYXRlLCBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIikgfHwgXCItXCJ9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICA8L2Rpdj5cblxuICAgICAge2Nhbk9wZW5GaWxlID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1lbmRcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIlxuICAgICAgICAgICAgb25DbGljaz17b25PcGVuRmlsZX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7aW5kVChcIlRpY2tldHNfRGV0YWlsX1ZpZXdBdHRhY2htZW50XCIsIFwiVmVyIGFkanVudG9cIil9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG4gICAgPC9zZWN0aW9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm07XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQ29tcGFjdFBhZ2luYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3hcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlRGF0ZVBhcnRzIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kgfSBmcm9tIFwiLi4vZXhwZW5zZUZvcm1hdHRlcnMudHNcIjtcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VOdW1iZXIgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsTGluZSB9IGZyb20gXCIuLi90aWNrZXRzL2RldGFpbC9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcbmltcG9ydCBFeHBlbnNlU2VjdGlvbkRpdmlkZXIgZnJvbSBcIi4vRXhwZW5zZVNlY3Rpb25EaXZpZGVyLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VUaW1lbGluZUNhcmQgZnJvbSBcIi4vRXhwZW5zZVRpbWVsaW5lQ2FyZC50c3hcIjtcblxudHlwZSBQYWdpbmF0aW9uTGFiZWxzID0ge1xuICBmaXJzdDogc3RyaW5nO1xuICBwcmV2OiBzdHJpbmc7XG4gIG5leHQ6IHN0cmluZztcbiAgbGFzdDogc3RyaW5nO1xufTtcblxudHlwZSBFeHBlbnNlVGlja2V0TGluZXNMaXN0UHJvcHMgPSB7XG4gIHZpc2libGVMaW5lczogRXhwZW5zZVRpY2tldERldGFpbExpbmVbXTtcbiAgdG90YWxMaW5lUGFnZXM6IG51bWJlcjtcbiAgbGluZVBhZ2U6IG51bWJlcjtcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIHBhZ2luYXRpb25MYWJlbHM6IFBhZ2luYXRpb25MYWJlbHM7XG4gIGNvbnRhaW5lclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XG4gIG9uTGluZVBhZ2VDaGFuZ2U6IChwYWdlOiBudW1iZXIpID0+IHZvaWQ7XG4gIG9uT3BlbkxpbmU6IChsaW5lUmVjSWQ6IHN0cmluZykgPT4gdm9pZDtcbn07XG5cbmNvbnN0IGZvcm1hdFF0eVZhbHVlID0gKHZhbHVlOiBudW1iZXIgfCBudWxsKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGZvcm1hdEV4cGVuc2VOdW1iZXIodmFsdWUsIHtcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgIGZhbGxiYWNrOiBcIi1cIixcbiAgfSk7XG59O1xuXG5jb25zdCBFTVBUWV9EQVRFX1BBUlRTOiBFeHBlbnNlRGF0ZVBhcnRzID0ge1xuICB5ZWFyOiBcIi0tXCIsXG4gIG1vbnRoOiBcIi0tXCIsXG4gIGRheTogXCItLVwiLFxufTtcblxuY29uc3QgVElDS0VUX0xJTkVfREFURV9QQU5FTF9JQ09OID0gKFxuICA8c3ZnXG4gICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXG4gICAgZmlsbD1cIm5vbmVcIlxuICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXG4gICAgc3Ryb2tlV2lkdGg9XCIxXCJcbiAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxuICAgIGNsYXNzTmFtZT1cImgtMTAgdy0xMCB0ZXh0LXNsYXRlLTUwMFwiXG4gICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgPlxuICAgIDxwYXRoIHN0cm9rZT1cIm5vbmVcIiBkPVwiTTAgMGgyNHYyNEgwelwiIGZpbGw9XCJub25lXCIgLz5cbiAgICA8cGF0aCBkPVwiTTE0IDN2NGExIDEgMCAwIDAgMSAxaDRcIiAvPlxuICAgIDxwYXRoIGQ9XCJNMTcgMjFoLTEwYTIgMiAwIDAgMSAtMiAtMnYtMTRhMiAyIDAgMCAxIDIgLTJoN2w1IDV2MTFhMiAyIDAgMCAxIC0yIDJcIiAvPlxuICAgIDxwYXRoIGQ9XCJNOSA3bDEgMFwiIC8+XG4gICAgPHBhdGggZD1cIk05IDEzbDYgMFwiIC8+XG4gICAgPHBhdGggZD1cIk0xMyAxN2wyIDBcIiAvPlxuICA8L3N2Zz5cbik7XG5cbi8vIFRpY2tldCBsaW5lcyBzZWN0aW9uIHJlbmRlcmVkIHdpdGggdGltZWxpbmUgY2FyZHMgYW5kIHBhZ2luZyBjb250cm9scy5cbmNvbnN0IEV4cGVuc2VUaWNrZXRMaW5lc0xpc3QgPSAoe1xuICB2aXNpYmxlTGluZXMsXG4gIHRvdGFsTGluZVBhZ2VzLFxuICBsaW5lUGFnZSxcbiAgY3VycmVuY3lDb2RlLFxuICBwYWdpbmF0aW9uTGFiZWxzLFxuICBjb250YWluZXJSZWYsXG4gIG9uTGluZVBhZ2VDaGFuZ2UsXG4gIG9uT3BlbkxpbmUsXG59OiBFeHBlbnNlVGlja2V0TGluZXNMaXN0UHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzcGFjZS15LTBcIj5cbiAgICAgIDxFeHBlbnNlU2VjdGlvbkRpdmlkZXIgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0RldGFpbF9MaW5lc1wiLCBcIkxpbmVzXCIpfSBjbGFzc05hbWU9XCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlci0tc3BhY2VkXCIgLz5cblxuICAgICAge3Zpc2libGVMaW5lcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtYm94IHRpbWVsaW5lLWVtcHR5XCIgZGF0YS1lbXB0eS10ZXh0PXtpbmRUKFwiVGlja2V0c19EZXRhaWxfTm9MaW5lc1wiLCBcIk5vIGxpbmVzIGZvciB0aGlzIHRpY2tldC5cIil9IC8+XG4gICAgICApIDogKFxuICAgICAgICA8ZGl2IHJlZj17Y29udGFpbmVyUmVmfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3hcIj5cbiAgICAgICAgICB7dmlzaWJsZUxpbmVzLm1hcCgobGluZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFtb3VudFRleHQgPSBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kobGluZS50b3RhbEFtb3VudCwgY3VycmVuY3lDb2RlKTtcbiAgICAgICAgICAgIGNvbnN0IHF0eVRleHQgPSBmb3JtYXRRdHlWYWx1ZShsaW5lLnF0eSk7XG4gICAgICAgICAgICBjb25zdCBwcmljZVRleHQgPSBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kobGluZS5wcmljZSwgY3VycmVuY3lDb2RlKTtcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gbGluZS5kZXNjcmlwdGlvbiB8fCBsaW5lLnJlY0lkIHx8IFwiLVwiO1xuICAgICAgICAgICAgY29uc3Qgc3VidGl0bGUgPSBgJHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9RdHlcIiwgXCJRdWFudGl0eVwiKX06ICR7cXR5VGV4dH0gICAke2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1ByaWNlXCIsIFwiUHJpY2VcIil9OiAke3ByaWNlVGV4dH1gO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17YCR7bGluZS5yZWNJZH0tJHtpbmRleH1gfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgPEV4cGVuc2VUaW1lbGluZUNhcmRcbiAgICAgICAgICAgICAgICAgIGRhdGVQYXJ0cz17RU1QVFlfREFURV9QQVJUU31cbiAgICAgICAgICAgICAgICAgIGRhdGVQYW5lbENvbnRlbnQ9e1RJQ0tFVF9MSU5FX0RBVEVfUEFORUxfSUNPTn1cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgICAgICAgICAgIHN1YnRpdGxlPXtzdWJ0aXRsZX1cbiAgICAgICAgICAgICAgICAgIHN1YnRpdGxlQ2xhc3NOYW1lPVwiZXhwZW5zZS1zaGVldC1jYXJkX19zdWJ0aXRsZSBleHBlbnNlLWxpbmUtY2FyZF9fbWV0YVwiXG4gICAgICAgICAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxuICAgICAgICAgICAgICAgICAgb25PcGVuPXsoKSA9PiBvbk9wZW5MaW5lKGxpbmUucmVjSWQpfVxuICAgICAgICAgICAgICAgICAgdGl0bGVDbGFzc05hbWU9XCJ0aW1lbGluZS1uYW1lIGV4cGVuc2UtbGluZS1jYXJkX190aXRsZVwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIDxDb21wYWN0UGFnaW5hdGlvblxuICAgICAgICB0b3RhbFBhZ2VzPXt0b3RhbExpbmVQYWdlc31cbiAgICAgICAgY3VycmVudFBhZ2U9e2xpbmVQYWdlfVxuICAgICAgICBvblBhZ2VDaGFuZ2U9e29uTGluZVBhZ2VDaGFuZ2V9XG4gICAgICAgIGxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cbiAgICAgIC8+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldExpbmVzTGlzdDtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciwgRXhwZW5zZVRpY2tldERldGFpbExpbmUgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcbmltcG9ydCB7IG1hcEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIsIG1hcEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbFN0YXRlQXJncyA9IHtcbiAgaGFzQWNjZXNzOiBib29sZWFuO1xuICBmaWxlSWQ6IHN0cmluZztcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBPd25zIHJlYWQgc3RhdGUgYW5kIEFQSSBsb2FkaW5nIGJlaGF2aW9yIGZvciB0aGUgdGlja2V0IGRldGFpbCBwYWdlLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZSA9ICh7IGhhc0FjY2VzcywgZmlsZUlkLCBvbkZvcmJpZGRlbiB9OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGVBcmdzKSA9PiB7XG4gIGNvbnN0IFtoZWFkZXIsIHNldEhlYWRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtsaW5lcywgc2V0TGluZXNdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldERldGFpbExpbmVbXT4oW10pO1xuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgY29uc3QgcmVsb2FkRGV0YWlsID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmICghaGFzQWNjZXNzKSB7XG4gICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNhZmVGaWxlSWQgPSBzYWZlVGV4dChmaWxlSWQpO1xuICAgIGlmICghc2FmZUZpbGVJZCkge1xuICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJUaWNrZXRzX0RldGFpbF9Ob3RGb3VuZFwiLCBcIlRpY2tldCB3YXMgbm90IGZvdW5kLlwiKSk7XG4gICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICBzZXRMaW5lcyhbXSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0KHNhZmVGaWxlSWQsIHtcbiAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICB9KTtcblxuICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2U/Lk1lc3NhZ2UgfHwgaW5kVChcIlRpY2tldHNfRGV0YWlsX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldCBkZXRhaWwuXCIpKTtcbiAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgICBzZXRMaW5lcyhbXSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xuICAgICAgY29uc3Qgc2VsZWN0ZWQgPVxuICAgICAgICBpdGVtcy5maW5kKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnk/LkZpbGVJZCkudG9VcHBlckNhc2UoKSA9PT0gc2FmZUZpbGVJZC50b1VwcGVyQ2FzZSgpKSB8fCBpdGVtc1swXSB8fCBudWxsO1xuXG4gICAgICBpZiAoIXNlbGVjdGVkKSB7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiVGlja2V0c19EZXRhaWxfTm90Rm91bmRcIiwgXCJUaWNrZXQgd2FzIG5vdCBmb3VuZC5cIikpO1xuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgIHNldExpbmVzKFtdKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtYXBwZWRIZWFkZXIgPSBtYXBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyKHNlbGVjdGVkKTtcbiAgICAgIGNvbnN0IG1hcHBlZExpbmVzID0gKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWQuTGluZXMpID8gc2VsZWN0ZWQuTGluZXMgOiBbXSkubWFwKChsaW5lKSA9PlxuICAgICAgICBtYXBFeHBlbnNlVGlja2V0RGV0YWlsTGluZShsaW5lKVxuICAgICAgKTtcbiAgICAgIHNldEhlYWRlcihtYXBwZWRIZWFkZXIpO1xuICAgICAgc2V0TGluZXMobWFwcGVkTGluZXMpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0RXJyb3JNZXNzYWdlKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIlRpY2tldHNfRGV0YWlsX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldCBkZXRhaWwuXCIpKTtcbiAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgIHNldExpbmVzKFtdKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH0sIFtmaWxlSWQsIGhhc0FjY2Vzcywgb25Gb3JiaWRkZW5dKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHZvaWQgcmVsb2FkRGV0YWlsKCk7XG4gIH0sIFtyZWxvYWREZXRhaWxdKTtcblxuICByZXR1cm4ge1xuICAgIGhlYWRlcixcbiAgICBsaW5lcyxcbiAgICBpc0xvYWRpbmcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIHJlbG9hZERldGFpbCxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0IH0gZnJvbSBcIi4uLy4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbiB9IGZyb20gXCIuLi8uLi9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50c1wiO1xuaW1wb3J0IHtcbiAgZGVsZXRlRXhwZW5zZVNoZWV0TGluZSxcbiAgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0LFxuICBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRGaWxlLFxuICB1cGRhdGVFeHBlbnNlU2hlZXRUaWNrZXQsXG59IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFLCB0b0V4cGVuc2VBcGlEZE1tWXl5eSB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XG5cbnR5cGUgRGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0ID0ge1xuICBzaGVldElkOiBzdHJpbmc7XG4gIGxpbmVSZWNJZDogc3RyaW5nO1xufTtcblxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zQXJncyA9IHtcbiAgYnVzeTogYm9vbGVhbjtcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBjYW5FZGl0VGlja2V0OiBib29sZWFuO1xuICBjYW5EZWxldGVUaWNrZXQ6IGJvb2xlYW47XG4gIGZpbGVJZDogc3RyaW5nO1xuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGRyYWZ0R2FzdG9UeXBlOiBzdHJpbmc7XG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGRyYWZ0VHJhbnNEYXRlOiBzdHJpbmc7XG4gIGRyYWZ0Q29tZW50YXJpbzogc3RyaW5nO1xuICBkcmFmdFVybEZpbGU6IHN0cmluZztcbiAgZHJhZnRGaWxlTmFtZTogc3RyaW5nO1xuICBkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQ/OiBEZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQgfCBudWxsO1xuICBzZXRNb2RhbEVycm9yOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0QnVzeTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xuICBzZXRTdGF0dXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRJc0VkaXRpbmc6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+Pjtcbn07XG5cbmNvbnN0IHBhcnNlT3B0aW9uYWxJbnRlZ2VyID0gKHJhdzogc3RyaW5nKTogbnVtYmVyIHwgdW5kZWZpbmVkID0+IHtcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcocmF3IHx8IFwiXCIpLnRyaW0oKTtcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyLnBhcnNlSW50KHZhbHVlLCAxMCk7XG4gIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgPyBwYXJzZWQgOiB1bmRlZmluZWQ7XG59O1xuXG4vLyBUcmllcyB0byBpbmZlciBhIHNhZmUgZXh0ZW5zaW9uIGZvciB1cGRhdGUgcGF5bG9hZCBmcm9tIGZpbGUgbmFtZSBvciBVUkwuXG5jb25zdCByZXNvbHZlVGlja2V0RmlsZUV4dGVuc2lvbiA9IChmaWxlTmFtZTogc3RyaW5nLCB1cmxGaWxlOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuICBjb25zdCBzb3VyY2UgPSBTdHJpbmcoZmlsZU5hbWUgfHwgXCJcIikudHJpbSgpIHx8IFN0cmluZyh1cmxGaWxlIHx8IFwiXCIpLnRyaW0oKTtcbiAgY29uc3QgbWF0Y2ggPSBzb3VyY2UubWF0Y2goL1xcLihbYS16QS1aMC05XXsxLDEwfSkoPzokfFs/I10pLyk7XG4gIGlmICghbWF0Y2ggfHwgIW1hdGNoWzFdKSByZXR1cm4gdW5kZWZpbmVkO1xuICByZXR1cm4gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKTtcbn07XG5cbmNvbnN0IGlzTm90Rm91bmRFcnJvciA9IChlcnJvcjogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDA0O1xufTtcblxuY29uc3QgaXNNaXNzaW5nVGlja2V0RmlsZU1lc3NhZ2UgPSAobWVzc2FnZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBub3JtYWxpemVkID0gU3RyaW5nKG1lc3NhZ2UgfHwgXCJcIikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIGZhbHNlO1xuXG4gIHJldHVybiAoXG4gICAgbm9ybWFsaXplZC5pbmNsdWRlcyhcImFyY2hpdm8gYXNvY2lhZG9cIikgfHxcbiAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXJjaGl2byBhZGp1bnRvXCIpIHx8XG4gICAgbm9ybWFsaXplZC5pbmNsdWRlcyhcImFzc29jaWF0ZWQgZmlsZVwiKSB8fFxuICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhdHRhY2hlZCBmaWxlXCIpXG4gICk7XG59O1xuXG4vLyBFbmNhcHN1bGF0ZXMgdXBkYXRlIGFuZCBkZWxldGUgbXV0YXRpb25zIGZvciB0aWNrZXQgaGVhZGVyIGRldGFpbC5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zID0gKHtcbiAgYnVzeSxcbiAgaXNFZGl0aW5nLFxuICBjYW5FZGl0VGlja2V0LFxuICBjYW5EZWxldGVUaWNrZXQsXG4gIGZpbGVJZCxcbiAgZHJhZnREZXNjcmlwdGlvbixcbiAgZHJhZnRHYXN0b1R5cGUsXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICBkcmFmdFRyYW5zRGF0ZSxcbiAgZHJhZnRDb21lbnRhcmlvLFxuICBkcmFmdFVybEZpbGUsXG4gIGRyYWZ0RmlsZU5hbWUsXG4gIGRlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCxcbiAgc2V0TW9kYWxFcnJvcixcbiAgc2V0QnVzeSxcbiAgc2V0U3RhdHVzLFxuICBzZXRJc0VkaXRpbmcsXG59OiBVc2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zQXJncykgPT4ge1xuICBjb25zdCBoYW5kbGVVcGRhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKGJ1c3kgfHwgIWlzRWRpdGluZykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghY2FuRWRpdFRpY2tldCkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IG5vcm1hbGl6ZWREZXNjcmlwdGlvbiA9IFN0cmluZyhkcmFmdERlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBpZiAoIW5vcm1hbGl6ZWREZXNjcmlwdGlvbikge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fRGVzY3JpcHRpb25SZXF1aXJlZFwiLCBcIkRlc2NyaXB0aW9uIGlzIHJlcXVpcmVkLlwiKTtcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbmN5ID0gU3RyaW5nKGRyYWZ0Q3VycmVuY3lDb2RlIHx8IFwiXCIpLnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xuICAgIGlmICghbm9ybWFsaXplZEN1cnJlbmN5KSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9DdXJyZW5jeVJlcXVpcmVkXCIsIFwiQ3VycmVuY3kgaXMgcmVxdWlyZWQuXCIpO1xuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBwYXJzZWRHYXN0b1R5cGUgPSBwYXJzZU9wdGlvbmFsSW50ZWdlcihkcmFmdEdhc3RvVHlwZSk7XG4gICAgaWYgKHBhcnNlZEdhc3RvVHlwZSAhPT0gdW5kZWZpbmVkICYmICFbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMTRdLmluY2x1ZGVzKHBhcnNlZEdhc3RvVHlwZSkpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIik7XG4gICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHJhd1RyYW5zRGF0ZSA9IFN0cmluZyhkcmFmdFRyYW5zRGF0ZSB8fCBcIlwiKS50cmltKCk7XG4gICAgY29uc3Qgbm9ybWFsaXplZFRyYW5zRGF0ZSA9IHJhd1RyYW5zRGF0ZSA/IHRvRXhwZW5zZUFwaURkTW1ZeXl5KHJhd1RyYW5zRGF0ZSkgOiBcIlwiO1xuICAgIGlmIChyYXdUcmFuc0RhdGUgJiYgIW5vcm1hbGl6ZWRUcmFuc0RhdGUpIHtcbiAgICAgIHNldE1vZGFsRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XG4gICAgICBzZXRTdGF0dXMoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdCA9IHtcbiAgICAgIGRlc2NyaXB0aW9uOiBub3JtYWxpemVkRGVzY3JpcHRpb24sXG4gICAgICBjdXJyZW5jeUNvZGU6IG5vcm1hbGl6ZWRDdXJyZW5jeSxcbiAgICAgIHRyYW5zRGF0ZTogbm9ybWFsaXplZFRyYW5zRGF0ZSB8fCB1bmRlZmluZWQsXG4gICAgICBjb21lbnRhcmlvOiBTdHJpbmcoZHJhZnRDb21lbnRhcmlvIHx8IFwiXCIpLnRyaW0oKSB8fCB1bmRlZmluZWQsXG4gICAgICB1cmxGaWxlOiBTdHJpbmcoZHJhZnRVcmxGaWxlIHx8IFwiXCIpLnRyaW0oKSB8fCB1bmRlZmluZWQsXG4gICAgICBmaWxlTmFtZTogU3RyaW5nKGRyYWZ0RmlsZU5hbWUgfHwgXCJcIikudHJpbSgpIHx8IHVuZGVmaW5lZCxcbiAgICAgIGZpbGVFeHRlbnNpb246IHJlc29sdmVUaWNrZXRGaWxlRXh0ZW5zaW9uKGRyYWZ0RmlsZU5hbWUsIGRyYWZ0VXJsRmlsZSksXG4gICAgICBnYXN0b1R5cGU6IHBhcnNlZEdhc3RvVHlwZSBhcyBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0W1wiZ2FzdG9UeXBlXCJdLFxuICAgIH07XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcbiAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRpbmdcIiwgXCJVcGRhdGluZyBleHBlbnNlIHNoZWV0Li4uXCIpLFxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIiksXG4gICAgICBzZXRNb2RhbEVycm9yLFxuICAgICAgc2V0QnVzeSxcbiAgICAgIHNldFN0YXR1cyxcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldChmaWxlSWQsIHBheWxvYWQpO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVkXCIsIFwiRXhwZW5zZSBzaGVldCB1cGRhdGVkXCIpKTtcbiAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcbiAgfSwgW1xuICAgIGJ1c3ksXG4gICAgY2FuRWRpdFRpY2tldCxcbiAgICBkcmFmdENvbWVudGFyaW8sXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgZHJhZnREZXNjcmlwdGlvbixcbiAgICBkcmFmdEZpbGVOYW1lLFxuICAgIGRyYWZ0R2FzdG9UeXBlLFxuICAgIGRyYWZ0VHJhbnNEYXRlLFxuICAgIGRyYWZ0VXJsRmlsZSxcbiAgICBmaWxlSWQsXG4gICAgaXNFZGl0aW5nLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0SXNFZGl0aW5nLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0U3RhdHVzLFxuICBdKTtcblxuICBjb25zdCBoYW5kbGVEZWxldGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKGJ1c3kpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWNhbkRlbGV0ZVRpY2tldCkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xuICAgICAgc3RhcnRTdGF0dXM6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGluZ1wiLCBcIkRlbGV0aW5nIGV4cGVuc2Ugc2hlZXQuLi5cIiksXG4gICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUVycm9yXCIsIFwiRGVsZXRlIGVycm9yLlwiKSxcbiAgICAgIHNldE1vZGFsRXJyb3IsXG4gICAgICBzZXRCdXN5LFxuICAgICAgc2V0U3RhdHVzLFxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgZGVsZXRlRmlsZVJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0RmlsZShmaWxlSWQsIHtcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmICghZGVsZXRlRmlsZVJlc3BvbnNlLlN1Y2Nlc3MgJiYgIWlzTWlzc2luZ1RpY2tldEZpbGVNZXNzYWdlKGRlbGV0ZUZpbGVSZXNwb25zZS5NZXNzYWdlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRlbGV0ZUZpbGVSZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGlmICghaXNOb3RGb3VuZEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXQoZmlsZUlkKTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgbGluZURlbGV0ZVJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0TGluZShcbiAgICAgICAgICAgICAgZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0LnNoZWV0SWQsXG4gICAgICAgICAgICAgIGRlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dC5saW5lUmVjSWQsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKCFsaW5lRGVsZXRlUmVzcG9uc2UuU3VjY2Vzcykge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobGluZURlbGV0ZVJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8gVGhlIGxpbmtlZCBsaW5lIGNhbiBiZSBhdXRvLXJlbW92ZWQgYnkgYmFja2VuZCBjYXNjYWRlOyBrZWVwIGZsb3cgc3VjY2Vzc2Z1bCBpbiB0aGF0IGNhc2UuXG4gICAgICAgICAgICBpZiAoIWlzTm90Rm91bmRFcnJvcihlcnJvcikpIHtcbiAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVkXCIsIFwiRXhwZW5zZSBzaGVldCBkZWxldGVkXCIpKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcbiAgfSwgW2J1c3ksIGNhbkRlbGV0ZVRpY2tldCwgZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0LCBmaWxlSWQsIHNldEJ1c3ksIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1c10pO1xuXG4gIHJldHVybiB7XG4gICAgaGFuZGxlVXBkYXRlLFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zLnRzXCI7XG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zQXJncyA9IHtcbiAgYnVzeTogYm9vbGVhbjtcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGlzTG9ja2VkOiBib29sZWFuO1xuICBhY3Rpb25Nb2RlPzogXCJkZWZhdWx0XCIgfCBcImRlbGV0ZV9vbmx5XCIgfCBcInZpZXdfb25seVwiO1xuICBjYW5FZGl0VGlja2V0OiBib29sZWFuO1xuICBjYW5EZWxldGVUaWNrZXQ6IGJvb2xlYW47XG4gIGZpbGVJZDogc3RyaW5nO1xuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuICBoYW5kbGVEZWxldGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XG4gIG9uRGVsZXRlU3VjY2Vzcz86ICgpID0+IHZvaWQ7XG4gIG9wZW5Db25maXJtOiAob3B0czoge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xuICAgIG9uQ29uZmlybT86ICgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQ7XG4gIH0pID0+IHZvaWQ7XG4gIGNsb3NlQ29uZmlybTogKCkgPT4gdm9pZDtcbn07XG5cbi8vIENvb3JkaW5hdGVzIHRvcGJhciBpY29uIHN0YXRlIGFuZCBkaXNwYXRjaCBhY3Rpb25zIGZvciB0aWNrZXQgZGV0YWlsLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zID0gKHtcbiAgYnVzeSxcbiAgbW9kYWxPcGVuLFxuICBpc0VkaXRpbmcsXG4gIGlzTG9ja2VkLFxuICBhY3Rpb25Nb2RlID0gXCJkZWZhdWx0XCIsXG4gIGNhbkVkaXRUaWNrZXQsXG4gIGNhbkRlbGV0ZVRpY2tldCxcbiAgZmlsZUlkLFxuICBzZXRNb2RhbEVycm9yLFxuICBoYW5kbGVFbmFibGVFZGl0LFxuICBoYW5kbGVDYW5jZWxFZGl0LFxuICBoYW5kbGVVcGRhdGUsXG4gIGhhbmRsZURlbGV0ZSxcbiAgb25TYXZlU3VjY2VzcyxcbiAgb25EZWxldGVTdWNjZXNzLFxuICBvcGVuQ29uZmlybSxcbiAgY2xvc2VDb25maXJtLFxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnNBcmdzKSA9PiB7XG4gIHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyh7XG4gICAgaWRzOiB7XG4gICAgICBlZGl0SWNvbklkOiBcImV4cGVuc2VUaWNrZXRFZGl0SWNvblwiLFxuICAgICAgc2F2ZUljb25JZDogXCJleHBlbnNlVGlja2V0U2F2ZUljb25cIixcbiAgICAgIGRlbGV0ZUJ0bklkOiBcImV4cGVuc2VUaWNrZXREZWxldGVCdG5cIixcbiAgICAgIGNhbmNlbEJ0bklkOiBcImV4cGVuc2VUaWNrZXRDYW5jZWxCdG5cIixcbiAgICB9LFxuICAgIGV2ZW50czoge1xuICAgICAgZWRpdEV2ZW50OiBcImV4cGVuc2UtdGlja2V0LWRldGFpbC1lZGl0XCIsXG4gICAgICBkZWxldGVFdmVudDogXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtZGVsZXRlXCIsXG4gICAgICBjYW5jZWxFdmVudDogXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtY2FuY2VsLWVkaXRcIixcbiAgICB9LFxuICAgIGJ1c3ksXG4gICAgbW9kYWxPcGVuLFxuICAgIGlzRWRpdGluZyxcbiAgICBpc0NyZWF0ZU1vZGU6IGZhbHNlLFxuICAgIGlzTG9ja2VkLFxuICAgIGFjdGlvbk1vZGUsXG4gICAgY2FuQ3JlYXRlOiBmYWxzZSxcbiAgICBjYW5FZGl0OiBjYW5FZGl0VGlja2V0LFxuICAgIGNhbkRlbGV0ZTogY2FuRGVsZXRlVGlja2V0LFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxuICAgIGhhbmRsZVNhdmU6IGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVEZWxldGUsXG4gICAgc2F2ZUNvbmZpcm1UaXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIsIFwiU2F2ZSBjaGFuZ2VzXCIpLFxuICAgIHNhdmVDb25maXJtTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBzYXZlIGNoYW5nZXM/XCIpLFxuICAgIHNhdmVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKSxcbiAgICBkZWxldGVDb25maXJtVGl0bGU6IGluZFQoXCJDb25maXJtX0RlbGV0ZV9UaXRsZVwiLCBcIkRlbGV0ZVwiKSxcbiAgICBkZWxldGVDb25maXJtTWVzc2FnZTogaW5kVChcIkNvbmZpcm1fRGVsZXRlX0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBpdGVtP1wiKSxcbiAgICBkZWxldGVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJEZWxldGVcIiksXG4gICAgb25TYXZlU3VjY2VzcyxcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6IG9uRGVsZXRlU3VjY2VzcyB8fCAoKCkgPT4gbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL1RpY2tldHNcIikpLFxuICAgIG9wZW5Db25maXJtLFxuICAgIGNsb3NlQ29uZmlybSxcbiAgfSk7XG59O1xuIiwgIlx1RkVGRmltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldFByZXZpZXdCbG9iIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5cbmNvbnN0IFBSRVZJRVdfTUFYX1NDQUxFID0gNDtcbmNvbnN0IFBSRVZJRVdfU0NBTEVfU1RFUCA9IDAuMjU7XG5cbmV4cG9ydCB0eXBlIFRpY2tldFByZXZpZXdQb2ludCA9IHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG59O1xuXG50eXBlIFVzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdBcmdzID0ge1xuICBzb3VyY2VVcmw6IHN0cmluZztcbn07XG5cbmNvbnN0IGNsYW1wUHJldmlld1NjYWxlID0gKHZhbHVlOiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICBpZiAoIU51bWJlci5pc0Zpbml0ZSh2YWx1ZSkpIHJldHVybiAxO1xuICByZXR1cm4gTWF0aC5taW4oUFJFVklFV19NQVhfU0NBTEUsIE1hdGgubWF4KDEsIHZhbHVlKSk7XG59O1xuXG5jb25zdCBnZXRQcmV2aWV3UG9pbnREaXN0YW5jZSA9IChsZWZ0OiBUaWNrZXRQcmV2aWV3UG9pbnQsIHJpZ2h0OiBUaWNrZXRQcmV2aWV3UG9pbnQpOiBudW1iZXIgPT4ge1xuICBjb25zdCBkZWx0YVggPSByaWdodC54IC0gbGVmdC54O1xuICBjb25zdCBkZWx0YVkgPSByaWdodC55IC0gbGVmdC55O1xuICByZXR1cm4gTWF0aC5zcXJ0KGRlbHRhWCAqIGRlbHRhWCArIGRlbHRhWSAqIGRlbHRhWSk7XG59O1xuXG5jb25zdCBnZXRQcmV2aWV3UG9pbnRDZW50ZXIgPSAobGVmdDogVGlja2V0UHJldmlld1BvaW50LCByaWdodDogVGlja2V0UHJldmlld1BvaW50KTogVGlja2V0UHJldmlld1BvaW50ID0+ICh7XG4gIHg6IChsZWZ0LnggKyByaWdodC54KSAvIDIsXG4gIHk6IChsZWZ0LnkgKyByaWdodC55KSAvIDIsXG59KTtcblxuLy8gTWFuYWdlcyB0aWNrZXQgaW1hZ2UgcHJldmlldyBzdGF0ZSBhbmQgem9vbS9wYW4gZ2VzdHVyZXMuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldyA9ICh7IHNvdXJjZVVybCB9OiBVc2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3QXJncykgPT4ge1xuICBjb25zdCBbcHJldmlld09wZW4sIHNldFByZXZpZXdPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3ByZXZpZXdCdXN5LCBzZXRQcmV2aWV3QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwcmV2aWV3RXJyb3IsIHNldFByZXZpZXdFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3ByZXZpZXdJbWFnZVVybCwgc2V0UHJldmlld0ltYWdlVXJsXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbcHJldmlld1NjYWxlLCBzZXRQcmV2aWV3U2NhbGVdID0gdXNlU3RhdGUoMSk7XG4gIGNvbnN0IFtwcmV2aWV3VHJhbnNsYXRlLCBzZXRQcmV2aWV3VHJhbnNsYXRlXSA9IHVzZVN0YXRlPFRpY2tldFByZXZpZXdQb2ludD4oeyB4OiAwLCB5OiAwIH0pO1xuXG4gIGNvbnN0IHByZXZpZXdTY2FsZVJlZiA9IHVzZVJlZigxKTtcbiAgY29uc3QgcHJldmlld1RyYW5zbGF0ZVJlZiA9IHVzZVJlZjxUaWNrZXRQcmV2aWV3UG9pbnQ+KHsgeDogMCwgeTogMCB9KTtcbiAgY29uc3QgcHJldmlld1BvaW50ZXJzUmVmID0gdXNlUmVmPE1hcDxudW1iZXIsIFRpY2tldFByZXZpZXdQb2ludD4+KG5ldyBNYXAoKSk7XG4gIGNvbnN0IHByZXZpZXdQYW5Qb2ludGVyUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBwcmV2aWV3UGFuTGFzdFBvaW50UmVmID0gdXNlUmVmPFRpY2tldFByZXZpZXdQb2ludCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBwcmV2aWV3UGluY2hTbmFwc2hvdFJlZiA9IHVzZVJlZjx7XG4gICAgZGlzdGFuY2U6IG51bWJlcjtcbiAgICBzY2FsZTogbnVtYmVyO1xuICAgIGNlbnRlcjogVGlja2V0UHJldmlld1BvaW50O1xuICAgIHRyYW5zbGF0ZTogVGlja2V0UHJldmlld1BvaW50O1xuICB9IHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgYXBwbHlQcmV2aWV3VHJhbnNmb3JtID0gdXNlQ2FsbGJhY2soKG5leHRTY2FsZTogbnVtYmVyLCBuZXh0VHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQpID0+IHtcbiAgICBjb25zdCBub3JtYWxpemVkU2NhbGUgPSBjbGFtcFByZXZpZXdTY2FsZShuZXh0U2NhbGUpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc2xhdGUgPSBub3JtYWxpemVkU2NhbGUgPD0gMSA/IHsgeDogMCwgeTogMCB9IDogbmV4dFRyYW5zbGF0ZTtcblxuICAgIHByZXZpZXdTY2FsZVJlZi5jdXJyZW50ID0gbm9ybWFsaXplZFNjYWxlO1xuICAgIHByZXZpZXdUcmFuc2xhdGVSZWYuY3VycmVudCA9IG5vcm1hbGl6ZWRUcmFuc2xhdGU7XG4gICAgc2V0UHJldmlld1NjYWxlKG5vcm1hbGl6ZWRTY2FsZSk7XG4gICAgc2V0UHJldmlld1RyYW5zbGF0ZShub3JtYWxpemVkVHJhbnNsYXRlKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHJlc2V0UHJldmlld0dlc3R1cmUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgcHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuY2xlYXIoKTtcbiAgICBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIHByZXZpZXdQaW5jaFNuYXBzaG90UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIGFwcGx5UHJldmlld1RyYW5zZm9ybSgxLCB7IHg6IDAsIHk6IDAgfSk7XG4gIH0sIFthcHBseVByZXZpZXdUcmFuc2Zvcm1dKTtcblxuICBjb25zdCByZWJ1aWxkUGluY2hTbmFwc2hvdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBwb2ludGVyUG9pbnRzID0gQXJyYXkuZnJvbShwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC52YWx1ZXMoKSk7XG4gICAgaWYgKHBvaW50ZXJQb2ludHMubGVuZ3RoIDwgMikge1xuICAgICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgW2xlZnQsIHJpZ2h0XSA9IHBvaW50ZXJQb2ludHM7XG4gICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IHtcbiAgICAgIGRpc3RhbmNlOiBNYXRoLm1heCgxLCBnZXRQcmV2aWV3UG9pbnREaXN0YW5jZShsZWZ0LCByaWdodCkpLFxuICAgICAgc2NhbGU6IHByZXZpZXdTY2FsZVJlZi5jdXJyZW50LFxuICAgICAgY2VudGVyOiBnZXRQcmV2aWV3UG9pbnRDZW50ZXIobGVmdCwgcmlnaHQpLFxuICAgICAgdHJhbnNsYXRlOiBwcmV2aWV3VHJhbnNsYXRlUmVmLmN1cnJlbnQsXG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNsb3NlUHJldmlldyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRQcmV2aWV3T3BlbihmYWxzZSk7XG4gICAgc2V0UHJldmlld0J1c3koZmFsc2UpO1xuICAgIHNldFByZXZpZXdFcnJvcihcIlwiKTtcbiAgICByZXNldFByZXZpZXdHZXN0dXJlKCk7XG4gICAgc2V0UHJldmlld0ltYWdlVXJsKChwcmV2aW91cykgPT4ge1xuICAgICAgaWYgKHByZXZpb3VzKSB7XG4gICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwocHJldmlvdXMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfSk7XG4gIH0sIFtyZXNldFByZXZpZXdHZXN0dXJlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKHByZXZpZXdJbWFnZVVybCkge1xuICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHByZXZpZXdJbWFnZVVybCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW3ByZXZpZXdJbWFnZVVybF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFwcmV2aWV3T3BlbikgcmV0dXJuO1xuXG4gICAgY29uc3Qgb25LZXlEb3duID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICAgIGNsb3NlUHJldmlldygpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXlEb3duKTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5RG93bik7XG4gIH0sIFtwcmV2aWV3T3BlbiwgY2xvc2VQcmV2aWV3XSk7XG5cbiAgY29uc3QgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICBpZiAoIXByZXZpZXdJbWFnZVVybCB8fCBwcmV2aWV3QnVzeSkgcmV0dXJuO1xuICAgICAgY29uc3QgcG9pbnQ6IFRpY2tldFByZXZpZXdQb2ludCA9IHsgeDogZXZlbnQuY2xpZW50WCwgeTogZXZlbnQuY2xpZW50WSB9O1xuICAgICAgcHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuc2V0KGV2ZW50LnBvaW50ZXJJZCwgcG9pbnQpO1xuICAgICAgaWYgKHR5cGVvZiBldmVudC5jdXJyZW50VGFyZ2V0LnNldFBvaW50ZXJDYXB0dXJlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnNldFBvaW50ZXJDYXB0dXJlKGV2ZW50LnBvaW50ZXJJZCk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIC8vIElnbm9yZSBjYXB0dXJlIGZhaWx1cmVzIG9uIGJyb3dzZXJzIHRoYXQgZG8gbm90IGZ1bGx5IHN1cHBvcnQgcG9pbnRlciBjYXB0dXJlLlxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5zaXplID09PSAxKSB7XG4gICAgICAgIHByZXZpZXdQYW5Qb2ludGVyUmVmLmN1cnJlbnQgPSBldmVudC5wb2ludGVySWQ7XG4gICAgICAgIHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudCA9IHBvaW50O1xuICAgICAgICBwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICByZWJ1aWxkUGluY2hTbmFwc2hvdCgpO1xuICAgIH0sXG4gICAgW3ByZXZpZXdCdXN5LCBwcmV2aWV3SW1hZ2VVcmwsIHJlYnVpbGRQaW5jaFNuYXBzaG90XVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgaWYgKCFwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5oYXMoZXZlbnQucG9pbnRlcklkKSkgcmV0dXJuO1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgcG9pbnQ6IFRpY2tldFByZXZpZXdQb2ludCA9IHsgeDogZXZlbnQuY2xpZW50WCwgeTogZXZlbnQuY2xpZW50WSB9O1xuICAgICAgcHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuc2V0KGV2ZW50LnBvaW50ZXJJZCwgcG9pbnQpO1xuXG4gICAgICBjb25zdCBwb2ludGVyRW50cmllcyA9IEFycmF5LmZyb20ocHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuZW50cmllcygpKTtcbiAgICAgIGNvbnN0IHBvaW50ZXJQb2ludHMgPSBwb2ludGVyRW50cmllcy5tYXAoKGVudHJ5KSA9PiBlbnRyeVsxXSk7XG5cbiAgICAgIGlmIChwb2ludGVyUG9pbnRzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgIGlmICghcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCkge1xuICAgICAgICAgIHJlYnVpbGRQaW5jaFNuYXBzaG90KCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzbmFwc2hvdCA9IHByZXZpZXdQaW5jaFNuYXBzaG90UmVmLmN1cnJlbnQ7XG4gICAgICAgIGlmICghc25hcHNob3QpIHJldHVybjtcblxuICAgICAgICBjb25zdCBbbGVmdCwgcmlnaHRdID0gcG9pbnRlclBvaW50cztcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLm1heCgxLCBnZXRQcmV2aWV3UG9pbnREaXN0YW5jZShsZWZ0LCByaWdodCkpO1xuICAgICAgICBjb25zdCByYXRpbyA9IGRpc3RhbmNlIC8gTWF0aC5tYXgoMSwgc25hcHNob3QuZGlzdGFuY2UpO1xuICAgICAgICBjb25zdCBuZXh0U2NhbGUgPSBjbGFtcFByZXZpZXdTY2FsZShzbmFwc2hvdC5zY2FsZSAqIHJhdGlvKTtcbiAgICAgICAgY29uc3QgY2VudGVyID0gZ2V0UHJldmlld1BvaW50Q2VudGVyKGxlZnQsIHJpZ2h0KTtcbiAgICAgICAgY29uc3QgbmV4dFRyYW5zbGF0ZTogVGlja2V0UHJldmlld1BvaW50ID0ge1xuICAgICAgICAgIHg6IHNuYXBzaG90LnRyYW5zbGF0ZS54ICsgKGNlbnRlci54IC0gc25hcHNob3QuY2VudGVyLngpLFxuICAgICAgICAgIHk6IHNuYXBzaG90LnRyYW5zbGF0ZS55ICsgKGNlbnRlci55IC0gc25hcHNob3QuY2VudGVyLnkpLFxuICAgICAgICB9O1xuICAgICAgICBhcHBseVByZXZpZXdUcmFuc2Zvcm0obmV4dFNjYWxlLCBuZXh0VHJhbnNsYXRlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAocG9pbnRlclBvaW50cy5sZW5ndGggIT09IDEgfHwgcHJldmlld1NjYWxlUmVmLmN1cnJlbnQgPD0gMSB8fCBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ICE9PSBldmVudC5wb2ludGVySWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBsYXN0UG9pbnQgPSBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQ7XG4gICAgICBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQgPSBwb2ludDtcbiAgICAgIGlmICghbGFzdFBvaW50KSByZXR1cm47XG5cbiAgICAgIGNvbnN0IG5leHRUcmFuc2xhdGU6IFRpY2tldFByZXZpZXdQb2ludCA9IHtcbiAgICAgICAgeDogcHJldmlld1RyYW5zbGF0ZVJlZi5jdXJyZW50LnggKyAocG9pbnQueCAtIGxhc3RQb2ludC54KSxcbiAgICAgICAgeTogcHJldmlld1RyYW5zbGF0ZVJlZi5jdXJyZW50LnkgKyAocG9pbnQueSAtIGxhc3RQb2ludC55KSxcbiAgICAgIH07XG4gICAgICBhcHBseVByZXZpZXdUcmFuc2Zvcm0ocHJldmlld1NjYWxlUmVmLmN1cnJlbnQsIG5leHRUcmFuc2xhdGUpO1xuICAgIH0sXG4gICAgW2FwcGx5UHJldmlld1RyYW5zZm9ybSwgcmVidWlsZFBpbmNoU25hcHNob3RdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlUHJldmlld1BvaW50ZXJFbmQgPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICAgIGlmICghcHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuaGFzKGV2ZW50LnBvaW50ZXJJZCkpIHJldHVybjtcbiAgICAgIHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LmRlbGV0ZShldmVudC5wb2ludGVySWQpO1xuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2YgZXZlbnQuY3VycmVudFRhcmdldC5oYXNQb2ludGVyQ2FwdHVyZSA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuaGFzUG9pbnRlckNhcHR1cmUoZXZlbnQucG9pbnRlcklkKVxuICAgICAgKSB7XG4gICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQucmVsZWFzZVBvaW50ZXJDYXB0dXJlKGV2ZW50LnBvaW50ZXJJZCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBvaW50ZXJFbnRyaWVzID0gQXJyYXkuZnJvbShwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5lbnRyaWVzKCkpO1xuICAgICAgaWYgKHBvaW50ZXJFbnRyaWVzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgIHByZXZpZXdQYW5Qb2ludGVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICByZWJ1aWxkUGluY2hTbmFwc2hvdCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChwb2ludGVyRW50cmllcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgY29uc3QgW3BvaW50ZXJJZCwgcG9pbnRlclBvaW50XSA9IHBvaW50ZXJFbnRyaWVzWzBdO1xuICAgICAgICBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ID0gcG9pbnRlcklkO1xuICAgICAgICBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQgPSBwb2ludGVyUG9pbnQ7XG4gICAgICAgIHByZXZpZXdQaW5jaFNuYXBzaG90UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHByZXZpZXdQYW5Qb2ludGVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIHByZXZpZXdQaW5jaFNuYXBzaG90UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgaWYgKHByZXZpZXdTY2FsZVJlZi5jdXJyZW50IDw9IDEpIHtcbiAgICAgICAgYXBwbHlQcmV2aWV3VHJhbnNmb3JtKDEsIHsgeDogMCwgeTogMCB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFthcHBseVByZXZpZXdUcmFuc2Zvcm0sIHJlYnVpbGRQaW5jaFNuYXBzaG90XVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZVByZXZpZXdXaGVlbCA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuV2hlZWxFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICAgIGlmICghcHJldmlld0ltYWdlVXJsIHx8IHByZXZpZXdCdXN5KSByZXR1cm47XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBjb25zdCBkaXJlY3Rpb24gPSBldmVudC5kZWx0YVkgPCAwID8gMSA6IC0xO1xuICAgICAgY29uc3QgbmV4dFNjYWxlID0gY2xhbXBQcmV2aWV3U2NhbGUocHJldmlld1NjYWxlUmVmLmN1cnJlbnQgKyBkaXJlY3Rpb24gKiBQUkVWSUVXX1NDQUxFX1NURVApO1xuICAgICAgYXBwbHlQcmV2aWV3VHJhbnNmb3JtKG5leHRTY2FsZSwgcHJldmlld1RyYW5zbGF0ZVJlZi5jdXJyZW50KTtcbiAgICB9LFxuICAgIFthcHBseVByZXZpZXdUcmFuc2Zvcm0sIHByZXZpZXdCdXN5LCBwcmV2aWV3SW1hZ2VVcmxdXG4gICk7XG5cbiAgY29uc3Qgb3BlblByZXZpZXcgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgY3VycmVudFVybCA9IHNhZmVUZXh0KHNvdXJjZVVybCk7XG4gICAgaWYgKCFjdXJyZW50VXJsKSByZXR1cm47XG5cbiAgICByZXNldFByZXZpZXdHZXN0dXJlKCk7XG4gICAgc2V0UHJldmlld09wZW4odHJ1ZSk7XG4gICAgc2V0UHJldmlld0J1c3kodHJ1ZSk7XG4gICAgc2V0UHJldmlld0Vycm9yKFwiXCIpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGJsb2IgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldFByZXZpZXdCbG9iKGN1cnJlbnRVcmwsIHtcbiAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IG9iamVjdFVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICBzZXRQcmV2aWV3SW1hZ2VVcmwoKHByZXZpb3VzKSA9PiB7XG4gICAgICAgIGlmIChwcmV2aW91cykge1xuICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwocHJldmlvdXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmplY3RVcmw7XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgc2V0UHJldmlld0Vycm9yKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICAgIHNldFByZXZpZXdJbWFnZVVybChcIlwiKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0UHJldmlld0J1c3koZmFsc2UpO1xuICAgIH1cbiAgfSwgW3Jlc2V0UHJldmlld0dlc3R1cmUsIHNvdXJjZVVybF0pO1xuXG4gIHJldHVybiB7XG4gICAgcHJldmlld09wZW4sXG4gICAgcHJldmlld0J1c3ksXG4gICAgcHJldmlld0Vycm9yLFxuICAgIHByZXZpZXdJbWFnZVVybCxcbiAgICBwcmV2aWV3U2NhbGUsXG4gICAgcHJldmlld1RyYW5zbGF0ZSxcbiAgICBvcGVuUHJldmlldyxcbiAgICBjbG9zZVByZXZpZXcsXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duLFxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSxcbiAgICBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCxcbiAgICBoYW5kbGVQcmV2aWV3V2hlZWwsXG4gIH07XG59O1xyXG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IFRpY2tldFByZXZpZXdQb2ludCB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcudHNcIjtcblxudHlwZSBFeHBlbnNlVGlja2V0UHJldmlld01vZGFsUHJvcHMgPSB7XG4gIG9wZW46IGJvb2xlYW47XG4gIGJ1c3k6IGJvb2xlYW47XG4gIGVycm9yOiBzdHJpbmc7XG4gIGltYWdlVXJsOiBzdHJpbmc7XG4gIGltYWdlQWx0OiBzdHJpbmc7XG4gIHNjYWxlOiBudW1iZXI7XG4gIHRyYW5zbGF0ZTogVGlja2V0UHJldmlld1BvaW50O1xuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xuICBvblBvaW50ZXJEb3duOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XG4gIG9uUG9pbnRlck1vdmU6IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcbiAgb25Qb2ludGVyRW5kOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XG4gIG9uV2hlZWw6IChldmVudDogUmVhY3QuV2hlZWxFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XG59O1xuXG4vLyBSZW5kZXJzIHRoZSB0aWNrZXQgaW1hZ2UgcHJldmlldyBvdmVybGF5IHdpdGggem9vbSBhbmQgcGFuIGdlc3R1cmVzLlxuY29uc3QgRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbCA9ICh7XG4gIG9wZW4sXG4gIGJ1c3ksXG4gIGVycm9yLFxuICBpbWFnZVVybCxcbiAgaW1hZ2VBbHQsXG4gIHNjYWxlLFxuICB0cmFuc2xhdGUsXG4gIG9uQ2xvc2UsXG4gIG9uUG9pbnRlckRvd24sXG4gIG9uUG9pbnRlck1vdmUsXG4gIG9uUG9pbnRlckVuZCxcbiAgb25XaGVlbCxcbn06IEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWxQcm9wcykgPT4ge1xuICBpZiAoIW9wZW4pIHJldHVybiBudWxsO1xuXG4gIHJldHVybiBjcmVhdGVQb3J0YWwoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNjAwMDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTk1MC80NSBiYWNrZHJvcC1ibHVyLW1kIHB4LTQgcHktNlwiIG9uQ2xpY2s9e29uQ2xvc2V9PlxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9DbG9zZVwiLCBcIkNsb3NlXCIpfVxuICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSByaWdodC00IHRvcC00IGlubGluZS1mbGV4IGgtMTAgdy0xMCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwLzYwIGJnLXNsYXRlLTkwMC81NSB0ZXh0LXNsYXRlLTEwMCB0cmFuc2l0aW9uIGhvdmVyOmJnLXNsYXRlLTkwMC83MCBmb2N1cy12aXNpYmxlOm91dGxpbmUtaGlkZGVuIGZvY3VzLXZpc2libGU6cmluZy0yIGZvY3VzLXZpc2libGU6cmluZy1zbGF0ZS0yMDAvODBcIlxuICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBvbkNsb3NlKCk7XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICBkPVwiTTYgNkwxOCAxOE0xOCA2TDYgMThcIlxuICAgICAgICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMS43NVwiXG4gICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgICAgICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICA8L2J1dHRvbj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtaC1bOTJ2aF0gbWF4LXctWzkydnddIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCIgb25DbGljaz17KGV2ZW50KSA9PiBldmVudC5zdG9wUHJvcGFnYXRpb24oKX0+XG4gICAgICAgIHtidXN5ID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTEwMFwiPlxuICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cbiAgICAgICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogZXJyb3IgPyAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXJvc2UtMjAwXCI+e2Vycm9yfTwvcD5cbiAgICAgICAgKSA6IGltYWdlVXJsID8gKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIG1heC1oLVs5MHZoXSBtYXgtdy1bOTJ2d10gb3ZlcmZsb3ctaGlkZGVuIHJvdW5kZWQtbGcgdG91Y2gtbm9uZVwiXG4gICAgICAgICAgICBvblBvaW50ZXJEb3duPXtvblBvaW50ZXJEb3dufVxuICAgICAgICAgICAgb25Qb2ludGVyTW92ZT17b25Qb2ludGVyTW92ZX1cbiAgICAgICAgICAgIG9uUG9pbnRlclVwPXtvblBvaW50ZXJFbmR9XG4gICAgICAgICAgICBvblBvaW50ZXJDYW5jZWw9e29uUG9pbnRlckVuZH1cbiAgICAgICAgICAgIG9uV2hlZWw9e29uV2hlZWx9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBzcmM9e2ltYWdlVXJsfVxuICAgICAgICAgICAgICBhbHQ9e2ltYWdlQWx0IHx8IGluZFQoXCJUaWNrZXRzX0ZpZWxkX0ZpbGVJZFwiLCBcIlRpY2tldFwiKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtbm9uZSBtYXgtaC1bOTB2aF0gdy1hdXRvIG1heC13LVs5MnZ3XSBzZWxlY3Qtbm9uZSByb3VuZGVkLWxnIG9iamVjdC1jb250YWluIHNoYWRvdy0yeGxcIlxuICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCR7dHJhbnNsYXRlLnh9cHgsICR7dHJhbnNsYXRlLnl9cHgsIDApIHNjYWxlKCR7c2NhbGV9KWAsXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiBcImNlbnRlciBjZW50ZXJcIixcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBzY2FsZSA8PSAxID8gXCJ0cmFuc2Zvcm0gMTQwbXMgZWFzZS1vdXRcIiA6IFwibm9uZVwiLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBkcmFnZ2FibGU9e2ZhbHNlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtc2xhdGUtMTAwXCI+e2luZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpfTwvcD5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PixcbiAgICBkb2N1bWVudC5ib2R5XG4gICk7XG59O1xuXG5leHBv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O0FBQUEsUUFDZCxTQUFTO0FBQUE7QUFBQSxJQUNYO0FBQUEsSUFFQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsV0FBVTtBQUFBLFFBQ1YsT0FBTyxFQUFFLFNBQVMsWUFBWSxTQUFTLE9BQU87QUFBQSxRQUU5QztBQUFBLHVEQUFDLFNBQUksV0FBVSx1QkFBc0IsU0FBUSxhQUFZLE1BQUssVUFBUyxjQUFZLEtBQUssa0JBQWtCLFNBQVMsR0FDakgsdURBQUMsWUFBTyxXQUFVLHVCQUFzQixJQUFHLE1BQUssSUFBRyxNQUFLLEdBQUUsS0FBSSxhQUFZLEtBQUksR0FDaEY7QUFBQSxVQUNDLEtBQUssa0JBQWtCLFNBQVM7QUFBQTtBQUFBO0FBQUEsSUFDbkM7QUFBQSxJQUVDLGVBQWUsNkNBQUMsU0FBSSxXQUFVLGVBQWUsd0JBQWEsSUFBUztBQUFBLElBRW5FLENBQUMsYUFBYSxDQUFDLGdCQUFnQixTQUM5Qiw4RUFDRTtBQUFBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQztBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0EsMEJBQTBCO0FBQUEsVUFDMUIsd0JBQXdCO0FBQUEsVUFDeEIsMkJBQTJCO0FBQUEsVUFDM0Isd0JBQXdCO0FBQUEsVUFDeEIsWUFBWTtBQUFBLFVBQ1osb0JBQW9CLGtCQUFrQixTQUFZO0FBQUE7QUFBQSxNQUNwRDtBQUFBLE1BQ0E7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBLGNBQWMsWUFBWSxvQkFBb0IsU0FBUyxPQUFPLFlBQVk7QUFBQSxVQUMxRTtBQUFBLFVBQ0EsY0FBYztBQUFBLFVBQ2Qsa0JBQWtCO0FBQUEsVUFDbEIsWUFBWTtBQUFBO0FBQUEsTUFDZDtBQUFBLE1BQ0EsNkNBQUMsU0FBSSxXQUFVLDBCQUEwQixrQkFBTztBQUFBLE9BQ2xELElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFHQSxJQUFNLDBCQUEwQixNQUFNO0FBQ3BDLFNBQ0UsNkNBQUMsZ0NBQXFCLHlCQUF1QixNQUMzQyx1REFBQyxrQ0FBK0IsR0FDbEM7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLDBCQUF3QjtBQUN4QixRQUFNLFNBQVMsU0FBUyxlQUFlLDRCQUE0QjtBQUNuRSxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLDJCQUF3QixDQUFFO0FBQ3REO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxrQ0FBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIm5leHRUcmFuc2xhdGUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
