import {
  SingleDatePicker
} from "./chunks/chunk-AS4EE5L2.js";
import {
  getExpenseTicketStatusLabel,
  useExpenseTicketsFilterCache
} from "./chunks/chunk-H2H2IOIN.js";
import {
  mapWindowEnumOptions
} from "./chunks/chunk-BVPBMOU4.js";
import {
  mapExpenseTicketDetailHeader,
  mapExpenseTicketDetailLine
} from "./chunks/chunk-KDPPT3XA.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-NKPACNDZ.js";
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
  isManagingOtherExpenseUser,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-TSBMOQWT.js";
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
} from "./chunks/chunk-FUOK7RBM.js";
import {
  configureExpenseApiAuth,
  deleteExpenseSheetLine,
  deleteExpenseSheetTicket,
  deleteExpenseSheetTicketFile,
  fetchExpenseSheetTicket,
  fetchExpenseSheetTicketPreviewBlob,
  updateExpenseSheetTicket
} from "./chunks/chunk-SAOIE2GK.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-7GJWN6F3.js";
import {
  EXPENSE_API_DATE_FORMAT_MESSAGE,
  toExpenseApiDdMmYyyy
} from "./chunks/chunk-QGAYQR5R.js";
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
} from "./chunks/chunk-REMMAK3K.js";
import "./chunks/chunk-7SKLSV7K.js";
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
  const { canManageOtherUsers, currentAxUserId, selectedManagedUserId, managementBootstrapReady } = useAuthContext();
  const hasAccess = canAccess("GASTOS_TICKETS", "View");
  const canEditTicketByModule = canAccess("GASTOS_TICKETS", "Edit");
  const canDeleteTicketByModule = canAccess("GASTOS_TICKETS", "FullAccess");
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
  const isManagingOtherUser = isManagingOtherExpenseUser({
    canManageOtherUsers,
    currentAxUserId,
    selectedManagedUserId
  });
  const canEditTicket = canEditTicketByModule && !isManagingOtherUser;
  const canDeleteTicket = canDeleteTicketByModule && !isManagingOtherUser;
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
  const ticketTopbarActionMode = isManagingOtherUser || isFromExpenseLine || isFromSheetLink ? "view_only" : "default";
  const { removeCachedTicket } = useExpenseTicketsFilterCache();
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
      removeCachedTicket(safeText(header?.fileId || fileId));
      if (isFromExpenseLine) {
        navigateToExpenseUrl(`/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(contextSheetId)}`);
        return;
      }
      navigateToExpenseUrl("/Gastos/Tickets");
    },
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmVzTGlzdC50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3LnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSBcIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4XCI7XG5pbXBvcnQgeyB1c2VBdXRoQ29udGV4dCB9IGZyb20gXCIuLi8uLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xuaW1wb3J0IHsgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyB9IGZyb20gXCIuLi8uLi8uLi8uLi9ob29rcy91c2VUaW1lbGluZUNhcmRFZmZlY3RzLnRzXCI7XG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtIGZyb20gXCIuLi8uLi9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VUaWNrZXRMaW5lc0xpc3QgZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmVzTGlzdC50c3hcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi8uLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0xhYmVsIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50cy9leHBlbnNlVGlja2V0U3RhdHVzQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHsgY29uZmlndXJlRXhwZW5zZUFwaUF1dGggfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHsgbmF2aWdhdGVUb0V4cGVuc2VVcmwgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcbmltcG9ydCB7IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VVc2VyIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VNYW5hZ2VkVXNlclNjb3BlLnRzXCI7XG5pbXBvcnQgeyBtYXBXaW5kb3dFbnVtT3B0aW9ucywgdHlwZSBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIHBhcnNlRXhwZW5zZURhdGUsIHNhZmVUZXh0LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZS50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3LnRzXCI7XG5pbXBvcnQgRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbCBmcm9tIFwiLi9FeHBlbnNlVGlja2V0UHJldmlld01vZGFsLnRzeFwiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldHNGaWx0ZXJDYWNoZSB9IGZyb20gXCIuLi91c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlLnRzXCI7XG5cbmNvbnN0IEFMTE9XRURfR0FTVE9fVFlQRVMgPSBuZXcgU2V0PG51bWJlcj4oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XG5jb25zdCBMSU5FU19QQUdFX1NJWkUgPSA2O1xuY29uc3QgR0FTVE9fVFlQRV9MQUJFTF9LRVlTOiBSZWNvcmQ8bnVtYmVyLCB7IGtleTogc3RyaW5nOyBmYWxsYmFjazogc3RyaW5nIH0+ID0ge1xuICAwOiB7IGtleTogXCJFbnVtX05vbmVcIiwgZmFsbGJhY2s6IFwiTm9uZVwiIH0sXG4gIDE6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1BlYWplXCIsIGZhbGxiYWNrOiBcIlBlYWplXCIgfSxcbiAgMjogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfUGFya2luZ1wiLCBmYWxsYmFjazogXCJQYXJraW5nXCIgfSxcbiAgMzogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfS21cIiwgZmFsbGJhY2s6IFwiS21cIiB9LFxuICA0OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9EZXNheXVub1wiLCBmYWxsYmFjazogXCJEZXNheXVub1wiIH0sXG4gIDU6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0NvbWlkYVwiLCBmYWxsYmFjazogXCJDb21pZGFcIiB9LFxuICA2OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9DZW5hXCIsIGZhbGxiYWNrOiBcIkNlbmFcIiB9LFxuICA3OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9Ib3RlbFwiLCBmYWxsYmFjazogXCJIb3RlbFwiIH0sXG4gIDg6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1Zhcmlvc1wiLCBmYWxsYmFjazogXCJWYXJpb3NcIiB9LFxuICAxNDogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfVGF4aVwiLCBmYWxsYmFjazogXCJUYXhpXCIgfSxcbn07XG5cbmNvbnN0IHBhZ2VkU2xpY2UgPSA8VCw+KGl0ZW1zOiBUW10sIHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcik6IFRbXSA9PiB7XG4gIGlmICghaXRlbXMubGVuZ3RoKSByZXR1cm4gW107XG4gIGNvbnN0IHNhZmVQYWdlID0gTWF0aC5tYXgoMSwgcGFnZSk7XG4gIGNvbnN0IHN0YXJ0ID0gKHNhZmVQYWdlIC0gMSkgKiBwYWdlU2l6ZTtcbiAgcmV0dXJuIGl0ZW1zLnNsaWNlKHN0YXJ0LCBzdGFydCArIHBhZ2VTaXplKTtcbn07XG5cbi8vIEluaXRpYWxpemVzIGF1dGggc2VlZCBmb3IgZXhwZW5zZSBBUEkgY2FsbHMgYmVmb3JlIGlzbGFuZCBlZmZlY3RzIHJ1bi5cbmNvbnN0IGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoID0gKCkgPT4ge1xuICBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCh7XG4gICAgdG9rZW46IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXG4gICAgYXBwQ29kZTogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxuICB9KTtcbn07XG5cbmNvbnN0IGJ1aWxkRmFsbGJhY2tHYXN0b1R5cGVPcHRpb25zID0gKCk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XG4gIHJldHVybiBPYmplY3QuZW50cmllcyhHQVNUT19UWVBFX0xBQkVMX0tFWVMpXG4gICAgLm1hcCgoW2NvZGUsIGNmZ10pID0+ICh7XG4gICAgICB2YWx1ZTogU3RyaW5nKGNvZGUpLFxuICAgICAgdGV4dDogaW5kVChjZmcua2V5LCBjZmcuZmFsbGJhY2spLFxuICAgIH0pKVxuICAgIC5zb3J0KChsZWZ0LCByaWdodCkgPT4gTnVtYmVyKGxlZnQudmFsdWUpIC0gTnVtYmVyKHJpZ2h0LnZhbHVlKSk7XG59O1xuXG5jb25zdCB0b0lucHV0RGF0ZSA9IChyYXc/OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZUV4cGVuc2VEYXRlKHJhdyk7XG4gIHJldHVybiBwYXJzZWQgPyB0b0lzb0RhdGUocGFyc2VkKSA6IFwiXCI7XG59O1xuXG5jb25zdCBFeHBlbnNlVGlja2V0RGV0YWlsUGFnZUNvbnRlbnQgPSAoKSA9PiB7XG4gIGNvbnN0IHsgY2FuTWFuYWdlT3RoZXJVc2VycywgY3VycmVudEF4VXNlcklkLCBzZWxlY3RlZE1hbmFnZWRVc2VySWQsIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSB9ID0gdXNlQXV0aENvbnRleHQoKTtcbiAgY29uc3QgaGFzQWNjZXNzID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJWaWV3XCIpO1xuICBjb25zdCBjYW5FZGl0VGlja2V0QnlNb2R1bGUgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfVElDS0VUU1wiLCBcIkVkaXRcIik7XG4gIGNvbnN0IGNhbkRlbGV0ZVRpY2tldEJ5TW9kdWxlID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJGdWxsQWNjZXNzXCIpO1xuICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1RJQ0tFVF9GSUxFX0lEX18pO1xuICBjb25zdCBsaW5lQ29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHJvdXRlUGFyYW1zID0gdXNlTWVtbygoKSA9PiBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpLCBbXSk7XG4gIGNvbnN0IGF1dG9FZGl0TW9kZSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IG1vZGUgPSByb3V0ZVBhcmFtcy5nZXQoXCJtb2RlXCIpO1xuICAgIHJldHVybiBzYWZlVGV4dChtb2RlKS50b0xvd2VyQ2FzZSgpID09PSBcImVkaXRcIjtcbiAgfSwgW3JvdXRlUGFyYW1zXSk7XG4gIGNvbnN0IGRldGFpbE9yaWdpbiA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwib3JpZ2luXCIpKS50b0xvd2VyQ2FzZSgpLCBbcm91dGVQYXJhbXNdKTtcbiAgY29uc3QgY29udGV4dFNoZWV0SWQgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KHJvdXRlUGFyYW1zLmdldChcInNoZWV0SWRcIikpLCBbcm91dGVQYXJhbXNdKTtcbiAgY29uc3QgY29udGV4dExpbmVSZWNJZCA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQocm91dGVQYXJhbXMuZ2V0KFwibGluZVJlY0lkXCIpKSwgW3JvdXRlUGFyYW1zXSk7XG4gIGNvbnN0IGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZSA9IGRldGFpbE9yaWdpbiA9PT0gXCJzaGVldC1jcmVhdGVcIjtcbiAgY29uc3QgaXNGcm9tRXhwZW5zZUxpbmUgPSBkZXRhaWxPcmlnaW4gPT09IFwiZXhwZW5zZS1saW5lXCIgJiYgISFjb250ZXh0U2hlZXRJZCAmJiAhIWNvbnRleHRMaW5lUmVjSWQ7XG4gIGNvbnN0IGlzRnJvbVNoZWV0TGluayA9IGRldGFpbE9yaWdpbiA9PT0gXCJzaGVldC1saW5rXCIgJiYgISFjb250ZXh0U2hlZXRJZDtcbiAgY29uc3QgaXNNYW5hZ2luZ090aGVyVXNlciA9IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VVc2VyKHtcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxuICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXG4gIH0pO1xuICBjb25zdCBjYW5FZGl0VGlja2V0ID0gY2FuRWRpdFRpY2tldEJ5TW9kdWxlICYmICFpc01hbmFnaW5nT3RoZXJVc2VyO1xuICBjb25zdCBjYW5EZWxldGVUaWNrZXQgPSBjYW5EZWxldGVUaWNrZXRCeU1vZHVsZSAmJiAhaXNNYW5hZ2luZ090aGVyVXNlcjtcbiAgY29uc3QgYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCA9IGlzRnJvbUV4cGVuc2VTaGVldENyZWF0ZTtcbiAgY29uc3QgYXV0b0VkaXRBdHRlbXB0ZWRSZWYgPSB1c2VSZWYoZmFsc2UpO1xuXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbaXNFZGl0aW5nLCBzZXRJc0VkaXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbW9kYWxFcnJvciwgc2V0TW9kYWxFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2xpbmVQYWdlLCBzZXRMaW5lUGFnZV0gPSB1c2VTdGF0ZSgxKTtcblxuICBjb25zdCBbZHJhZnREZXNjcmlwdGlvbiwgc2V0RHJhZnREZXNjcmlwdGlvbl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0R2FzdG9UeXBlLCBzZXREcmFmdEdhc3RvVHlwZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0Q3VycmVuY3lDb2RlLCBzZXREcmFmdEN1cnJlbmN5Q29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0VHJhbnNEYXRlLCBzZXREcmFmdFRyYW5zRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0Q29tZW50YXJpbywgc2V0RHJhZnRDb21lbnRhcmlvXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRVcmxGaWxlLCBzZXREcmFmdFVybEZpbGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdEZpbGVOYW1lLCBzZXREcmFmdEZpbGVOYW1lXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIGNvbnN0IHBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxuICAgICgpID0+ICh7XG4gICAgICBmaXJzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9GaXJzdFwiLCBcIkZpcnN0XCIpLFxuICAgICAgcHJldjogaW5kVChcIkhpc3RvcnlfUGFnZV9QcmV2XCIsIFwiUHJldmlvdXNcIiksXG4gICAgICBuZXh0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX05leHRcIiwgXCJOZXh0XCIpLFxuICAgICAgbGFzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9MYXN0XCIsIFwiTGFzdFwiKSxcbiAgICB9KSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IGdhc3RvVHlwZU9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oKCkgPT4ge1xuICAgIGNvbnN0IHNvdXJjZSA9IEFycmF5LmlzQXJyYXkod2luZG93Ll9fRVhQRU5TRV9HQVNUT19UWVBFU19fKSA/IHdpbmRvdy5fX0VYUEVOU0VfR0FTVE9fVFlQRVNfXyA6IFtdO1xuICAgIGNvbnN0IG1hcHBlZCA9IG1hcFdpbmRvd0VudW1PcHRpb25zKHNvdXJjZSkuZmlsdGVyKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgcGFyc2VkID0gTnVtYmVyKGVudHJ5LnZhbHVlKTtcbiAgICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgJiYgQUxMT1dFRF9HQVNUT19UWVBFUy5oYXMocGFyc2VkKTtcbiAgICB9KTtcblxuICAgIGlmIChtYXBwZWQubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIG1hcHBlZC5zb3J0KChsZWZ0LCByaWdodCkgPT4gTnVtYmVyKGxlZnQudmFsdWUpIC0gTnVtYmVyKHJpZ2h0LnZhbHVlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1aWxkRmFsbGJhY2tHYXN0b1R5cGVPcHRpb25zKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBnYXN0b1R5cGVMYWJlbE1hcCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgZ2FzdG9UeXBlT3B0aW9ucykge1xuICAgICAgbWFwLnNldChTdHJpbmcob3B0aW9uLnZhbHVlKSwgb3B0aW9uLnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gbWFwO1xuICB9LCBbZ2FzdG9UeXBlT3B0aW9uc10pO1xuXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXG4gICAgZGVmYXVsdENhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpLFxuICB9KTtcblxuICBjb25zdCB7IGhlYWRlciwgbGluZXMsIGlzTG9hZGluZywgZXJyb3JNZXNzYWdlLCByZWxvYWREZXRhaWwgfSA9IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZSh7XG4gICAgaGFzQWNjZXNzLFxuICAgIGZpbGVJZCxcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcbiAgfSk7XG5cbiAgY29uc3QgcHJldmlld1NvdXJjZVVybCA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQoaXNFZGl0aW5nID8gZHJhZnRVcmxGaWxlIDogaGVhZGVyPy51cmxGaWxlKSwgW2RyYWZ0VXJsRmlsZSwgaGVhZGVyPy51cmxGaWxlLCBpc0VkaXRpbmddKTtcbiAgY29uc3QgcHJldmlld0FsdFRleHQgPSB1c2VNZW1vKFxuICAgICgpID0+IHNhZmVUZXh0KGlzRWRpdGluZyA/IGRyYWZ0RmlsZU5hbWUgOiBoZWFkZXI/LmZpbGVOYW1lKSB8fCBpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXRcIiksXG4gICAgW2RyYWZ0RmlsZU5hbWUsIGhlYWRlcj8uZmlsZU5hbWUsIGlzRWRpdGluZ11cbiAgKTtcbiAgY29uc3Qge1xuICAgIHByZXZpZXdPcGVuLFxuICAgIHByZXZpZXdCdXN5LFxuICAgIHByZXZpZXdFcnJvcixcbiAgICBwcmV2aWV3SW1hZ2VVcmwsXG4gICAgcHJldmlld1NjYWxlLFxuICAgIHByZXZpZXdUcmFuc2xhdGUsXG4gICAgb3BlblByZXZpZXcsXG4gICAgY2xvc2VQcmV2aWV3LFxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bixcbiAgICBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUsXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJFbmQsXG4gICAgaGFuZGxlUHJldmlld1doZWVsLFxuICB9ID0gdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldyh7IHNvdXJjZVVybDogcHJldmlld1NvdXJjZVVybCB9KTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc0VkaXRpbmcgfHwgIWhlYWRlcikgcmV0dXJuO1xuXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbihzYWZlVGV4dChoZWFkZXIuZGVzY3JpcHRpb24pKTtcbiAgICBzZXREcmFmdEdhc3RvVHlwZShoZWFkZXIuZ2FzdG9UeXBlID09PSBudWxsID8gXCJcIiA6IFN0cmluZyhoZWFkZXIuZ2FzdG9UeXBlKSk7XG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUoc2FmZVRleHQoaGVhZGVyLmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSk7XG4gICAgc2V0RHJhZnRUcmFuc0RhdGUodG9JbnB1dERhdGUoaGVhZGVyLnRyYW5zRGF0ZSkpO1xuICAgIHNldERyYWZ0Q29tZW50YXJpbyhzYWZlVGV4dChoZWFkZXIuY29tZW50YXJpbykpO1xuICAgIHNldERyYWZ0VXJsRmlsZShzYWZlVGV4dChoZWFkZXIudXJsRmlsZSkpO1xuICAgIHNldERyYWZ0RmlsZU5hbWUoc2FmZVRleHQoaGVhZGVyLmZpbGVOYW1lKSk7XG4gIH0sIFtoZWFkZXIsIGlzRWRpdGluZ10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbWF4UGFnZSA9IE1hdGgubWF4KDEsIE1hdGguY2VpbChsaW5lcy5sZW5ndGggLyBMSU5FU19QQUdFX1NJWkUpKTtcbiAgICBpZiAobGluZVBhZ2UgPiBtYXhQYWdlKSB7XG4gICAgICBzZXRMaW5lUGFnZShtYXhQYWdlKTtcbiAgICB9XG4gIH0sIFtsaW5lUGFnZSwgbGluZXMubGVuZ3RoXSk7XG5cbiAgY29uc3QgdmlzaWJsZUxpbmVzID0gdXNlTWVtbygoKSA9PiBwYWdlZFNsaWNlKGxpbmVzLCBsaW5lUGFnZSwgTElORVNfUEFHRV9TSVpFKSwgW2xpbmVQYWdlLCBsaW5lc10pO1xuICBjb25zdCB0b3RhbExpbmVQYWdlcyA9IE1hdGguY2VpbCgobGluZXMubGVuZ3RoIHx8IDApIC8gTElORVNfUEFHRV9TSVpFKTtcblxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghaGVhZGVyIHx8IGlzTG9hZGluZykgcmV0dXJuO1xuICAgIGlmIChpc0Zyb21TaGVldExpbmspIHJldHVybjtcbiAgICBpZiAoaGVhZGVyLnN0YXR1cyA9PT0gMSAmJiAhYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCkgcmV0dXJuO1xuICAgIGlmICghY2FuRWRpdFRpY2tldCkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgc2V0SXNFZGl0aW5nKHRydWUpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRWRpdGluZ0VuYWJsZWRcIiwgXCJFZGl0aW5nIGVuYWJsZWRcIikpO1xuICB9LCBbYWxsb3dBc3NpZ25lZERyYWZ0RWRpdCwgY2FuRWRpdFRpY2tldCwgaGVhZGVyLCBpc0Zyb21TaGVldExpbmssIGlzTG9hZGluZ10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFhdXRvRWRpdE1vZGUgfHwgaXNGcm9tRXhwZW5zZUxpbmUgfHwgaXNGcm9tU2hlZXRMaW5rIHx8IGF1dG9FZGl0QXR0ZW1wdGVkUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBpZiAoaXNMb2FkaW5nIHx8ICFoZWFkZXIpIHJldHVybjtcbiAgICBhdXRvRWRpdEF0dGVtcHRlZFJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICBoYW5kbGVFbmFibGVFZGl0KCk7XG4gIH0sIFthdXRvRWRpdE1vZGUsIGhhbmRsZUVuYWJsZUVkaXQsIGhlYWRlciwgaXNGcm9tRXhwZW5zZUxpbmUsIGlzRnJvbVNoZWV0TGluaywgaXNMb2FkaW5nXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWlzRWRpdGluZykgcmV0dXJuO1xuICAgIGlmICghaGVhZGVyKSB7XG4gICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uKHNhZmVUZXh0KGhlYWRlci5kZXNjcmlwdGlvbikpO1xuICAgIHNldERyYWZ0R2FzdG9UeXBlKGhlYWRlci5nYXN0b1R5cGUgPT09IG51bGwgPyBcIlwiIDogU3RyaW5nKGhlYWRlci5nYXN0b1R5cGUpKTtcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZShzYWZlVGV4dChoZWFkZXIuY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpKTtcbiAgICBzZXREcmFmdFRyYW5zRGF0ZSh0b0lucHV0RGF0ZShoZWFkZXIudHJhbnNEYXRlKSk7XG4gICAgc2V0RHJhZnRDb21lbnRhcmlvKHNhZmVUZXh0KGhlYWRlci5jb21lbnRhcmlvKSk7XG4gICAgc2V0RHJhZnRVcmxGaWxlKHNhZmVUZXh0KGhlYWRlci51cmxGaWxlKSk7XG4gICAgc2V0RHJhZnRGaWxlTmFtZShzYWZlVGV4dChoZWFkZXIuZmlsZU5hbWUpKTtcbiAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIikpO1xuICB9LCBbaGVhZGVyLCBpc0VkaXRpbmddKTtcblxuICBjb25zdCB7IGhhbmRsZVVwZGF0ZSwgaGFuZGxlRGVsZXRlIH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zKHtcbiAgICBidXN5LFxuICAgIGlzRWRpdGluZyxcbiAgICBjYW5FZGl0VGlja2V0LFxuICAgIGNhbkRlbGV0ZVRpY2tldCxcbiAgICBmaWxlSWQsXG4gICAgZHJhZnREZXNjcmlwdGlvbixcbiAgICBkcmFmdEdhc3RvVHlwZSxcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBkcmFmdFRyYW5zRGF0ZSxcbiAgICBkcmFmdENvbWVudGFyaW8sXG4gICAgZHJhZnRVcmxGaWxlLFxuICAgIGRyYWZ0RmlsZU5hbWUsXG4gICAgZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0OiBpc0Zyb21FeHBlbnNlTGluZVxuICAgICAgPyB7XG4gICAgICAgICAgc2hlZXRJZDogY29udGV4dFNoZWV0SWQsXG4gICAgICAgICAgbGluZVJlY0lkOiBjb250ZXh0TGluZVJlY0lkLFxuICAgICAgICB9XG4gICAgICA6IG51bGwsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBzZXRCdXN5LFxuICAgIHNldFN0YXR1cyxcbiAgICBzZXRJc0VkaXRpbmcsXG4gIH0pO1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xuICAgICAgYnVzeSxcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xuICAgICAgICBzZXRTdGF0dXMobXNnKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtXSk7XG5cbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIik7XG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBidXN5XG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XG4gICAgOiAhYnVzeSAmJiBtb2RhbEVycm9yXG4gICAgICA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKVxuICAgICAgOiBtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKTtcblxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2b2lkIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xuICB9LCBbYnVzeSwgY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm0sIG1vZGFsRXJyb3JdKTtcblxuICBjb25zdCBpc0Fzc2lnbmVkVGlja2V0ID0gaGVhZGVyPy5zdGF0dXMgPT09IDE7XG4gIGNvbnN0IGlzQ29udGV4dExvY2tlZCA9IGlzQXNzaWduZWRUaWNrZXQgJiYgIWFsbG93QXNzaWduZWREcmFmdEVkaXQ7XG4gIGNvbnN0IGNhbkVkaXRUaWNrZXRJbkNvbnRleHQgPSBjYW5FZGl0VGlja2V0ICYmICFpc0Zyb21FeHBlbnNlTGluZSAmJiAhaXNGcm9tU2hlZXRMaW5rO1xuICBjb25zdCBjYW5EZWxldGVUaWNrZXRJbkNvbnRleHQgPSBjYW5EZWxldGVUaWNrZXQgJiYgIWlzRnJvbUV4cGVuc2VMaW5lICYmICFpc0Zyb21TaGVldExpbms7XG4gIGNvbnN0IHRpY2tldFRvcGJhckFjdGlvbk1vZGU6IFwiZGVmYXVsdFwiIHwgXCJ2aWV3X29ubHlcIiA9XG4gICAgaXNNYW5hZ2luZ090aGVyVXNlciB8fCBpc0Zyb21FeHBlbnNlTGluZSB8fCBpc0Zyb21TaGVldExpbmsgPyBcInZpZXdfb25seVwiIDogXCJkZWZhdWx0XCI7XG4gIGNvbnN0IHsgcmVtb3ZlQ2FjaGVkVGlja2V0IH0gPSB1c2VFeHBlbnNlVGlja2V0c0ZpbHRlckNhY2hlKCk7XG5cbiAgdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMoe1xuICAgIGJ1c3ksXG4gICAgbW9kYWxPcGVuOiBtb2RhbC5vcGVuLFxuICAgIGlzRWRpdGluZyxcbiAgICBpc0xvY2tlZDogaXNDb250ZXh0TG9ja2VkLFxuICAgIGFjdGlvbk1vZGU6IHRpY2tldFRvcGJhckFjdGlvbk1vZGUsXG4gICAgcGVybWlzc2lvbnNSZWFkeTogbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxuICAgIGNhbkVkaXRUaWNrZXQ6IGNhbkVkaXRUaWNrZXRJbkNvbnRleHQsXG4gICAgY2FuRGVsZXRlVGlja2V0OiBjYW5EZWxldGVUaWNrZXRJbkNvbnRleHQsXG4gICAgZmlsZUlkLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxuICAgIGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVEZWxldGUsXG4gICAgb25TYXZlU3VjY2VzczogKCkgPT4ge1xuICAgICAgdm9pZCByZWxvYWREZXRhaWwoKTtcbiAgICB9LFxuICAgIG9uRGVsZXRlU3VjY2VzczogKCkgPT4ge1xuICAgICAgcmVtb3ZlQ2FjaGVkVGlja2V0KHNhZmVUZXh0KGhlYWRlcj8uZmlsZUlkIHx8IGZpbGVJZCkpO1xuICAgICAgaWYgKGlzRnJvbUV4cGVuc2VMaW5lKSB7XG4gICAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoY29udGV4dFNoZWV0SWQpfWApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvVGlja2V0c1wiKTtcbiAgICB9LFxuICAgIG9wZW5Db25maXJtLFxuICAgIGNsb3NlQ29uZmlybSxcbiAgfSk7XG5cbiAgY29uc3Qgb3BlbkxpbmVEZXRhaWwgPSB1c2VDYWxsYmFjayhcbiAgICAocmF3TGluZVJlY0lkOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChpc0Zyb21FeHBlbnNlTGluZSB8fCBpc0Zyb21TaGVldExpbmspIHJldHVybjtcbiAgICAgIGNvbnN0IGxpbmVSZWNJZCA9IHNhZmVUZXh0KHJhd0xpbmVSZWNJZCk7XG4gICAgICBpZiAoIWxpbmVSZWNJZCkgcmV0dXJuO1xuICAgICAgaWYgKCFmaWxlSWQpIHJldHVybjtcblxuICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcbiAgICAgICAgZmlsZUlkLFxuICAgICAgICBsaW5lUmVjSWQsXG4gICAgICB9KTtcbiAgICAgIGlmIChpc0Zyb21FeHBlbnNlU2hlZXRDcmVhdGUpIHtcbiAgICAgICAgcXVlcnkuc2V0KFwib3JpZ2luXCIsIFwic2hlZXQtY3JlYXRlXCIpO1xuICAgICAgICBxdWVyeS5zZXQoXCJtb2RlXCIsIFwiZWRpdFwiKTtcbiAgICAgICAgaWYgKGNvbnRleHRTaGVldElkKSB7XG4gICAgICAgICAgcXVlcnkuc2V0KFwic2hlZXRJZFwiLCBjb250ZXh0U2hlZXRJZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvVGlja2V0TGluZURldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YDtcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCwge1xuICAgICAgICBhc2tDb25maXJtYXRpb246IHRydWUsXG4gICAgICAgIGJ5cGFzc0d1YXJkT25jZTogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtjb250ZXh0U2hlZXRJZCwgZmlsZUlkLCBpc0Zyb21FeHBlbnNlTGluZSwgaXNGcm9tRXhwZW5zZVNoZWV0Q3JlYXRlLCBpc0Zyb21TaGVldExpbmtdXG4gICk7XG5cbiAgY29uc3QgcmVzb2x2ZUNsaWNrYWJsZUNhcmQgPSB1c2VDYWxsYmFjaygodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IHtcbiAgICBjb25zdCBub2RlID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBjYXJkID0gbm9kZS5jbG9zZXN0PEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIik7XG4gICAgaWYgKCFjYXJkKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIWxpbmVDb250YWluZXJSZWYuY3VycmVudD8uY29udGFpbnMoY2FyZCkpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBjYXJkO1xuICB9LCBbXSk7XG5cbiAgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyh7XG4gICAgY29udGFpbmVyUmVmOiBsaW5lQ29udGFpbmVyUmVmLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBpdGVtczogdmlzaWJsZUxpbmVzLFxuICAgIHJlc29sdmVDbGlja2FibGVDYXJkLFxuICB9KTtcblxuICBjb25zdCBvcGVuRmlsZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICB2b2lkIG9wZW5QcmV2aWV3KCk7XG4gIH0sIFtvcGVuUHJldmlld10pO1xuXG4gIGNvbnN0IGhhbmRsZU9wZW5FeHBlbnNlU2hlZXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGlzRnJvbVNoZWV0TGluaykgcmV0dXJuO1xuICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQoaGVhZGVyPy5ob2phR2FzdG9zSWREaXNwbGF5KTtcbiAgICBpZiAoIXNhZmVTaGVldElkKSByZXR1cm47XG5cbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVTaGVldElkKX1gLCB7XG4gICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcbiAgICB9KTtcbiAgfSwgW2hlYWRlcj8uaG9qYUdhc3Rvc0lkRGlzcGxheSwgaXNFZGl0aW5nLCBpc0Zyb21TaGVldExpbmtdKTtcblxuICBjb25zdCBzdGF0dXNMYWJlbCA9IHVzZU1lbW8oKCkgPT4gZ2V0RXhwZW5zZVRpY2tldFN0YXR1c0xhYmVsKGhlYWRlcj8uc3RhdHVzKSwgW2hlYWRlcj8uc3RhdHVzXSk7XG4gIGNvbnN0IGdhc3RvVHlwZUxhYmVsID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgY3VycmVudEdhc3RvVHlwZSA9IGlzRWRpdGluZyA/IGRyYWZ0R2FzdG9UeXBlIDogaGVhZGVyPy5nYXN0b1R5cGUgPT09IG51bGwgPyBcIlwiIDogU3RyaW5nKGhlYWRlcj8uZ2FzdG9UeXBlID8/IFwiXCIpO1xuICAgIGlmICghY3VycmVudEdhc3RvVHlwZSkge1xuICAgICAgcmV0dXJuIGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xuICAgIH1cbiAgICByZXR1cm4gZ2FzdG9UeXBlTGFiZWxNYXAuZ2V0KFN0cmluZyhjdXJyZW50R2FzdG9UeXBlKSkgfHwgU3RyaW5nKGN1cnJlbnRHYXN0b1R5cGUpO1xuICB9LCBbZHJhZnRHYXN0b1R5cGUsIGdhc3RvVHlwZUxhYmVsTWFwLCBoZWFkZXI/Lmdhc3RvVHlwZSwgaXNFZGl0aW5nXSk7XG4gIGNvbnN0IHRvdGFsQW1vdW50VGV4dCA9IHVzZU1lbW8oXG4gICAgKCkgPT4gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGhlYWRlcj8udG90YWxBbW91bnQgPz8gbnVsbCwgKGlzRWRpdGluZyA/IGRyYWZ0Q3VycmVuY3lDb2RlIDogaGVhZGVyPy5jdXJyZW5jeUNvZGUpIHx8IGhlYWRlcj8uY3VycmVuY3lDb2RlKSxcbiAgICBbZHJhZnRDdXJyZW5jeUNvZGUsIGhlYWRlcj8uY3VycmVuY3lDb2RlLCBoZWFkZXI/LnRvdGFsQW1vdW50LCBpc0VkaXRpbmddXG4gICk7XG4gIGNvbnN0IHRyYW5zRGF0ZVRleHQgPSB1c2VNZW1vKFxuICAgICgpID0+IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShpc0VkaXRpbmcgPyBkcmFmdFRyYW5zRGF0ZSA6IGhlYWRlcj8udHJhbnNEYXRlLCBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIiksXG4gICAgW2RyYWZ0VHJhbnNEYXRlLCBoZWFkZXI/LnRyYW5zRGF0ZSwgaXNFZGl0aW5nXVxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgIDxDb25maXJtTW9kYWxcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cbiAgICAgICAgdGl0bGU9e21vZGFsLnRpdGxlfVxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cbiAgICAgICAgY2FuY2VsVGV4dD17bW9kYWxDYW5jZWxUZXh0fVxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cbiAgICAgICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxuICAgICAgICBidXN5PXtidXN5fVxuICAgICAgICBlcnJvcj17bW9kYWxFcnJvcn1cbiAgICAgICAgc3RhdHVzPXtzdGF0dXN9XG4gICAgICAgIG9uQ29uZmlybT17aGFuZGxlTW9kYWxCdXR0b25Db25maXJtfVxuICAgICAgICBvbkNhbmNlbD17Y2xvc2VDb25maXJtfVxuICAgICAgLz5cbiAgICAgIDxFeHBlbnNlVGlja2V0UHJldmlld01vZGFsXG4gICAgICAgIG9wZW49e3ByZXZpZXdPcGVufVxuICAgICAgICBidXN5PXtwcmV2aWV3QnVzeX1cbiAgICAgICAgZXJyb3I9e3ByZXZpZXdFcnJvcn1cbiAgICAgICAgaW1hZ2VVcmw9e3ByZXZpZXdJbWFnZVVybH1cbiAgICAgICAgaW1hZ2VBbHQ9e3ByZXZpZXdBbHRUZXh0fVxuICAgICAgICBzY2FsZT17cHJldmlld1NjYWxlfVxuICAgICAgICB0cmFuc2xhdGU9e3ByZXZpZXdUcmFuc2xhdGV9XG4gICAgICAgIG9uQ2xvc2U9e2Nsb3NlUHJldmlld31cbiAgICAgICAgb25Qb2ludGVyRG93bj17aGFuZGxlUHJldmlld1BvaW50ZXJEb3dufVxuICAgICAgICBvblBvaW50ZXJNb3ZlPXtoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmV9XG4gICAgICAgIG9uUG9pbnRlckVuZD17aGFuZGxlUHJldmlld1BvaW50ZXJFbmR9XG4gICAgICAgIG9uV2hlZWw9e2hhbmRsZVByZXZpZXdXaGVlbH1cbiAgICAgIC8+XG5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwibG9hZGVyLWJveCBnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCJcbiAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogaXNMb2FkaW5nID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9fVxuICAgICAgPlxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XG4gICAgICA8L2Rpdj5cblxuICAgICAge2Vycm9yTWVzc2FnZSA/IDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57ZXJyb3JNZXNzYWdlfTwvZGl2PiA6IG51bGx9XG5cbiAgICAgIHshaXNMb2FkaW5nICYmICFlcnJvck1lc3NhZ2UgJiYgaGVhZGVyID8gKFxuICAgICAgICA8PlxuICAgICAgICAgIDxFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybVxuICAgICAgICAgICAgaGVhZGVyPXtoZWFkZXJ9XG4gICAgICAgICAgICBzdGF0dXNMYWJlbD17c3RhdHVzTGFiZWx9XG4gICAgICAgICAgICBnYXN0b1R5cGVMYWJlbD17Z2FzdG9UeXBlTGFiZWx9XG4gICAgICAgICAgICB0b3RhbEFtb3VudFRleHQ9e3RvdGFsQW1vdW50VGV4dH1cbiAgICAgICAgICAgIHRyYW5zRGF0ZVRleHQ9e3RyYW5zRGF0ZVRleHR9XG4gICAgICAgICAgICBpc0VkaXRpbmc9e2lzRWRpdGluZ31cbiAgICAgICAgICAgIGdhc3RvVHlwZU9wdGlvbnM9e2dhc3RvVHlwZU9wdGlvbnN9XG4gICAgICAgICAgICBkcmFmdERlc2NyaXB0aW9uPXtkcmFmdERlc2NyaXB0aW9ufVxuICAgICAgICAgICAgZHJhZnRHYXN0b1R5cGU9e2RyYWZ0R2FzdG9UeXBlfVxuICAgICAgICAgICAgZHJhZnRDdXJyZW5jeUNvZGU9e2RyYWZ0Q3VycmVuY3lDb2RlfVxuICAgICAgICAgICAgZHJhZnRUcmFuc0RhdGU9e2RyYWZ0VHJhbnNEYXRlfVxuICAgICAgICAgICAgZHJhZnRVcmxGaWxlPXtkcmFmdFVybEZpbGV9XG4gICAgICAgICAgICBkcmFmdEZpbGVOYW1lPXtkcmFmdEZpbGVOYW1lfVxuICAgICAgICAgICAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlPXtzZXREcmFmdERlc2NyaXB0aW9ufVxuICAgICAgICAgICAgb25EcmFmdEdhc3RvVHlwZUNoYW5nZT17c2V0RHJhZnRHYXN0b1R5cGV9XG4gICAgICAgICAgICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlPXtzZXREcmFmdEN1cnJlbmN5Q29kZX1cbiAgICAgICAgICAgIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2U9e3NldERyYWZ0VHJhbnNEYXRlfVxuICAgICAgICAgICAgb25PcGVuRmlsZT17b3BlbkZpbGV9XG4gICAgICAgICAgICBvbk9wZW5FeHBlbnNlU2hlZXQ9e2lzRnJvbVNoZWV0TGluayA/IHVuZGVmaW5lZCA6IGhhbmRsZU9wZW5FeHBlbnNlU2hlZXR9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8RXhwZW5zZVRpY2tldExpbmVzTGlzdFxuICAgICAgICAgICAgdmlzaWJsZUxpbmVzPXt2aXNpYmxlTGluZXN9XG4gICAgICAgICAgICB0b3RhbExpbmVQYWdlcz17dG90YWxMaW5lUGFnZXN9XG4gICAgICAgICAgICBsaW5lUGFnZT17bGluZVBhZ2V9XG4gICAgICAgICAgICBjdXJyZW5jeUNvZGU9e2lzRWRpdGluZyA/IGRyYWZ0Q3VycmVuY3lDb2RlIDogc2FmZVRleHQoaGVhZGVyLmN1cnJlbmN5Q29kZSl9XG4gICAgICAgICAgICBwYWdpbmF0aW9uTGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxuICAgICAgICAgICAgY29udGFpbmVyUmVmPXtsaW5lQ29udGFpbmVyUmVmfVxuICAgICAgICAgICAgb25MaW5lUGFnZUNoYW5nZT17c2V0TGluZVBhZ2V9XG4gICAgICAgICAgICBvbk9wZW5MaW5lPXtvcGVuTGluZURldGFpbH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPntzdGF0dXN9PC9kaXY+XG4gICAgICAgIDwvPlxuICAgICAgKSA6IG51bGx9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2UgdGlja2V0IGRldGFpbC5cbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycyBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD5cbiAgICAgIDxFeHBlbnNlVGlja2V0RGV0YWlsUGFnZUNvbnRlbnQgLz5cbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxuICApO1xufTtcblxuY29uc3QgbW91bnQgPSAoKSA9PiB7XG4gIGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoKCk7XG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLXJvb3RcIik7XG4gIGlmICghcm9vdEVsKSByZXR1cm47XG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVRpY2tldERldGFpbFBhZ2UgLz4pO1xufTtcblxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgU2luZ2xlRGF0ZVBpY2tlciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NpbmdsZURhdGVQaWNrZXIudHN4XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB9IGZyb20gXCIuLi90aWNrZXRzL2RldGFpbC9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSwgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCBFeHBlbnNlUmVhZE9ubHlGaWVsZCBmcm9tIFwiLi9FeHBlbnNlUmVhZE9ubHlGaWVsZC50c3hcIjtcbmltcG9ydCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QgZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0LnRzeFwiO1xuXG5jb25zdCBoYXNSZWFsRXhwZW5zZVNoZWV0VmFsdWUgPSAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBub3JtYWxpemVkID0gc2FmZVRleHQodmFsdWUpLnRvTG93ZXJDYXNlKCk7XG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIGZhbHNlO1xuICBpZiAobm9ybWFsaXplZCA9PT0gXCItXCIgfHwgbm9ybWFsaXplZCA9PT0gXCIwXCIpIHJldHVybiBmYWxzZTtcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwibi9hXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJuYVwiKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiB0cnVlO1xufTtcblxuY29uc3QgSU1BR0VfRVhURU5TSU9OUyA9IG5ldyBTZXQ8c3RyaW5nPihbXCJqcGdcIiwgXCJqcGVnXCIsIFwicG5nXCIsIFwid2VicFwiLCBcImdpZlwiLCBcImJtcFwiLCBcImhlaWNcIiwgXCJoZWlmXCIsIFwiYXZpZlwiXSk7XG5cbmNvbnN0IGdldEZpbGVFeHRlbnNpb25Gcm9tUGF0aCA9ICh2YWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgc291cmNlID0gc2FmZVRleHQodmFsdWUpLnRvTG93ZXJDYXNlKCk7XG4gIGlmICghc291cmNlKSByZXR1cm4gXCJcIjtcblxuICBjb25zdCB3aXRob3V0UXVlcnkgPSBzb3VyY2Uuc3BsaXQoXCI/XCIpWzBdLnNwbGl0KFwiI1wiKVswXTtcbiAgY29uc3QgcGFydHMgPSB3aXRob3V0UXVlcnkuc3BsaXQoXCIuXCIpO1xuICBpZiAocGFydHMubGVuZ3RoIDwgMikgcmV0dXJuIFwiXCI7XG5cbiAgY29uc3QgcmF3RXh0ID0gc2FmZVRleHQocGFydHNbcGFydHMubGVuZ3RoIC0gMV0pLnJlcGxhY2UoL1teYS16MC05XS9nLCBcIlwiKTtcbiAgcmV0dXJuIHJhd0V4dCA9PT0gXCJqcGVnXCIgPyBcImpwZ1wiIDogcmF3RXh0O1xufTtcblxuY29uc3QgaGFzSW1hZ2VQcmV2aWV3TGluayA9ICh1cmxWYWx1ZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRVcmwgPSBzYWZlVGV4dCh1cmxWYWx1ZSk7XG4gIGlmICghbm9ybWFsaXplZFVybCkgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChub3JtYWxpemVkVXJsLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChcImRhdGE6aW1hZ2UvXCIpKSByZXR1cm4gdHJ1ZTtcblxuICBjb25zdCBleHRlbnNpb24gPSBnZXRGaWxlRXh0ZW5zaW9uRnJvbVBhdGgobm9ybWFsaXplZFVybCk7XG4gIGlmIChleHRlbnNpb24gJiYgSU1BR0VfRVhURU5TSU9OUy5oYXMoZXh0ZW5zaW9uKSkgcmV0dXJuIHRydWU7XG5cbiAgY29uc3Qgbm9ybWFsaXplZExvd2VyID0gbm9ybWFsaXplZFVybC50b0xvd2VyQ2FzZSgpO1xuICBpZiAobm9ybWFsaXplZExvd2VyLmluY2x1ZGVzKFwiYmxvYi5jb3JlLndpbmRvd3MubmV0XCIpICYmIG5vcm1hbGl6ZWRMb3dlci5pbmNsdWRlcyhcImltYWdlXCIpKSByZXR1cm4gdHJ1ZTtcblxuICByZXR1cm4gZmFsc2U7XG59O1xuXG50eXBlIEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtUHJvcHMgPSB7XG4gIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlcjtcbiAgc3RhdHVzTGFiZWw6IHN0cmluZztcbiAgZ2FzdG9UeXBlTGFiZWw6IHN0cmluZztcbiAgdG90YWxBbW91bnRUZXh0OiBzdHJpbmc7XG4gIHRyYW5zRGF0ZVRleHQ6IHN0cmluZztcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBnYXN0b1R5cGVPcHRpb25zOiBBcnJheTx7IHZhbHVlOiBzdHJpbmc7IHRleHQ6IHN0cmluZyB9PjtcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xuICBkcmFmdEdhc3RvVHlwZTogc3RyaW5nO1xuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xuICBkcmFmdFVybEZpbGU6IHN0cmluZztcbiAgZHJhZnRGaWxlTmFtZTogc3RyaW5nO1xuICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRUcmFuc0RhdGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbk9wZW5GaWxlOiAoKSA9PiB2b2lkO1xuICBvbk9wZW5FeHBlbnNlU2hlZXQ/OiAoKSA9PiB2b2lkO1xufTtcblxuLy8gUmVhZC1vbmx5IGFuZCBlZGl0YWJsZSBoZWFkZXIgZm9ybSBmb3IgdGlja2V0IGRldGFpbC5cbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtID0gKHtcbiAgaGVhZGVyLFxuICBzdGF0dXNMYWJlbCxcbiAgZ2FzdG9UeXBlTGFiZWwsXG4gIHRvdGFsQW1vdW50VGV4dCxcbiAgdHJhbnNEYXRlVGV4dCxcbiAgaXNFZGl0aW5nLFxuICBnYXN0b1R5cGVPcHRpb25zLFxuICBkcmFmdERlc2NyaXB0aW9uLFxuICBkcmFmdEdhc3RvVHlwZSxcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gIGRyYWZ0VHJhbnNEYXRlLFxuICBkcmFmdFVybEZpbGUsXG4gIGRyYWZ0RmlsZU5hbWUsXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZSxcbiAgb25EcmFmdEdhc3RvVHlwZUNoYW5nZSxcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZSxcbiAgb25EcmFmdFRyYW5zRGF0ZUNoYW5nZSxcbiAgb25PcGVuRmlsZSxcbiAgb25PcGVuRXhwZW5zZVNoZWV0LFxufTogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm1Qcm9wcykgPT4ge1xuICBjb25zdCBwcmV2aWV3VXJsID0gc2FmZVRleHQoaXNFZGl0aW5nID8gZHJhZnRVcmxGaWxlIDogaGVhZGVyLnVybEZpbGUpO1xuICBjb25zdCBjYW5PcGVuRmlsZSA9IGhhc0ltYWdlUHJldmlld0xpbmsocHJldmlld1VybCk7XG4gIGNvbnN0IHNob3dFeHBlbnNlU2hlZXRGaWVsZCA9IGhhc1JlYWxFeHBlbnNlU2hlZXRWYWx1ZShoZWFkZXIuaG9qYUdhc3Rvc0lkRGlzcGxheSk7XG5cbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCI+XG4gICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXRcIil9XG4gICAgICAgICAgdmFsdWU9e2hlYWRlci5maWxlSWQgfHwgXCItXCJ9XG4gICAgICAgIC8+XG5cbiAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpZWxkX1N0YXR1c1wiLCBcIlN0YXR1c1wiKX1cbiAgICAgICAgICB2YWx1ZT17c3RhdHVzTGFiZWwgfHwgXCItXCJ9XG4gICAgICAgIC8+XG5cbiAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNtOmNvbC1zcGFuLTIgc3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX08L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdERlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxuICAgICAgICAgICAgdmFsdWU9e2hlYWRlci5kZXNjcmlwdGlvbiB8fCBcIi1cIn1cbiAgICAgICAgICAgIGZ1bGxXaWR0aFxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG5cbiAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cbiAgICAgICAgICAgIG9wdGlvbnM9e2dhc3RvVHlwZU9wdGlvbnN9XG4gICAgICAgICAgICB2YWx1ZT17ZHJhZnRHYXN0b1R5cGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdEdhc3RvVHlwZUNoYW5nZX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfQ2F0ZWdvcnlcIiwgXCJDYXRlZ29yeVwiKX1cbiAgICAgICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XG4gICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICAgICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxuICAgICAgICAgICAgdmFsdWU9e2dhc3RvVHlwZUxhYmVsIHx8IFwiLVwifVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG5cbiAgICAgICAge3Nob3dFeHBlbnNlU2hlZXRGaWVsZCA/IChcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9FeHBlbnNlU2hlZXREaXNwbGF5XCIsIFwiRXhwZW5zZSBzaGVldFwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtoZWFkZXIuaG9qYUdhc3Rvc0lkRGlzcGxheSB8fCBcIi1cIn1cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uT3BlbkV4cGVuc2VTaGVldH1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cblxuICAgICAgICB7aXNFZGl0aW5nID8gKFxuICAgICAgICAgIDxFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XG4gICAgICAgICAgICB2YWx1ZT17ZHJhZnRDdXJyZW5jeUNvZGV9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZX1cbiAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtdGlja2V0LWRldGFpbC1jdXJyZW5jeVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgdmFsdWU9e2hlYWRlci5jdXJyZW5jeUNvZGUgfHwgXCItXCJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cblxuICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVG90YWxBbW91bnRcIiwgXCJUb3RhbCBhbW91bnRcIil9XG4gICAgICAgICAgdmFsdWU9e3RvdGFsQW1vdW50VGV4dCB8fCBcIi1cIn1cbiAgICAgICAgLz5cblxuICAgICAgICB7aXNFZGl0aW5nID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlzaXRhLWZpZWxkLXRleHRcIj5cbiAgICAgICAgICAgIDxTaW5nbGVEYXRlUGlja2VyXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DcmVhdGVkRGF0ZVwiLCBcIkRhdGVcIil9XG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFRyYW5zRGF0ZX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRUcmFuc0RhdGVDaGFuZ2V9XG4gICAgICAgICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0NyZWF0ZWREYXRlXCIsIFwiRGF0ZVwiKX1cbiAgICAgICAgICAgICAgdmFsdWU9e3RyYW5zRGF0ZVRleHQgfHwgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGhlYWRlci50cmFuc0RhdGUsIGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiKSB8fCBcIi1cIn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7Y2FuT3BlbkZpbGUgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWVuZFwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gcHgtMyBweS0xLjUgdGV4dC14c1wiXG4gICAgICAgICAgICBvbkNsaWNrPXtvbk9wZW5GaWxlfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpbmRUKFwiVGlja2V0c19EZXRhaWxfVmlld0F0dGFjaG1lbnRcIiwgXCJWZXIgYWRqdW50b1wiKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBDb21wYWN0UGFnaW5hdGlvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbXBhY3RQYWdpbmF0aW9uLnRzeFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VEYXRlUGFydHMgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZU51bWJlciB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lIH0gZnJvbSBcIi4uL3RpY2tldHMvZGV0YWlsL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xuaW1wb3J0IEV4cGVuc2VTZWN0aW9uRGl2aWRlciBmcm9tIFwiLi9FeHBlbnNlU2VjdGlvbkRpdmlkZXIudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVRpbWVsaW5lQ2FyZCBmcm9tIFwiLi9FeHBlbnNlVGltZWxpbmVDYXJkLnRzeFwiO1xuXG50eXBlIFBhZ2luYXRpb25MYWJlbHMgPSB7XG4gIGZpcnN0OiBzdHJpbmc7XG4gIHByZXY6IHN0cmluZztcbiAgbmV4dDogc3RyaW5nO1xuICBsYXN0OiBzdHJpbmc7XG59O1xuXG50eXBlIEV4cGVuc2VUaWNrZXRMaW5lc0xpc3RQcm9wcyA9IHtcbiAgdmlzaWJsZUxpbmVzOiBFeHBlbnNlVGlja2V0RGV0YWlsTGluZVtdO1xuICB0b3RhbExpbmVQYWdlczogbnVtYmVyO1xuICBsaW5lUGFnZTogbnVtYmVyO1xuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgcGFnaW5hdGlvbkxhYmVsczogUGFnaW5hdGlvbkxhYmVscztcbiAgY29udGFpbmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcbiAgb25MaW5lUGFnZUNoYW5nZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcbiAgb25PcGVuTGluZTogKGxpbmVSZWNJZDogc3RyaW5nKSA9PiB2b2lkO1xufTtcblxuY29uc3QgZm9ybWF0UXR5VmFsdWUgPSAodmFsdWU6IG51bWJlciB8IG51bGwpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gZm9ybWF0RXhwZW5zZU51bWJlcih2YWx1ZSwge1xuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgZmFsbGJhY2s6IFwiLVwiLFxuICB9KTtcbn07XG5cbmNvbnN0IEVNUFRZX0RBVEVfUEFSVFM6IEV4cGVuc2VEYXRlUGFydHMgPSB7XG4gIHllYXI6IFwiLS1cIixcbiAgbW9udGg6IFwiLS1cIixcbiAgZGF5OiBcIi0tXCIsXG59O1xuXG5jb25zdCBUSUNLRVRfTElORV9EQVRFX1BBTkVMX0lDT04gPSAoXG4gIDxzdmdcbiAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcbiAgICBmaWxsPVwibm9uZVwiXG4gICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcbiAgICBzdHJva2VXaWR0aD1cIjFcIlxuICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXG4gICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXG4gICAgY2xhc3NOYW1lPVwiaC0xMCB3LTEwIHRleHQtc2xhdGUtNTAwXCJcbiAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICA+XG4gICAgPHBhdGggc3Ryb2tlPVwibm9uZVwiIGQ9XCJNMCAwaDI0djI0SDB6XCIgZmlsbD1cIm5vbmVcIiAvPlxuICAgIDxwYXRoIGQ9XCJNMTQgM3Y0YTEgMSAwIDAgMCAxIDFoNFwiIC8+XG4gICAgPHBhdGggZD1cIk0xNyAyMWgtMTBhMiAyIDAgMCAxIC0yIC0ydi0xNGEyIDIgMCAwIDEgMiAtMmg3bDUgNXYxMWEyIDIgMCAwIDEgLTIgMlwiIC8+XG4gICAgPHBhdGggZD1cIk05IDdsMSAwXCIgLz5cbiAgICA8cGF0aCBkPVwiTTkgMTNsNiAwXCIgLz5cbiAgICA8cGF0aCBkPVwiTTEzIDE3bDIgMFwiIC8+XG4gIDwvc3ZnPlxuKTtcblxuLy8gVGlja2V0IGxpbmVzIHNlY3Rpb24gcmVuZGVyZWQgd2l0aCB0aW1lbGluZSBjYXJkcyBhbmQgcGFnaW5nIGNvbnRyb2xzLlxuY29uc3QgRXhwZW5zZVRpY2tldExpbmVzTGlzdCA9ICh7XG4gIHZpc2libGVMaW5lcyxcbiAgdG90YWxMaW5lUGFnZXMsXG4gIGxpbmVQYWdlLFxuICBjdXJyZW5jeUNvZGUsXG4gIHBhZ2luYXRpb25MYWJlbHMsXG4gIGNvbnRhaW5lclJlZixcbiAgb25MaW5lUGFnZUNoYW5nZSxcbiAgb25PcGVuTGluZSxcbn06IEV4cGVuc2VUaWNrZXRMaW5lc0xpc3RQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNwYWNlLXktMFwiPlxuICAgICAgPEV4cGVuc2VTZWN0aW9uRGl2aWRlciBsYWJlbD17aW5kVChcIlRpY2tldHNfRGV0YWlsX0xpbmVzXCIsIFwiTGluZXNcIil9IGNsYXNzTmFtZT1cImV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyLS1zcGFjZWRcIiAvPlxuXG4gICAgICB7dmlzaWJsZUxpbmVzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3ggdGltZWxpbmUtZW1wdHlcIiBkYXRhLWVtcHR5LXRleHQ9e2luZFQoXCJUaWNrZXRzX0RldGFpbF9Ob0xpbmVzXCIsIFwiTm8gbGluZXMgZm9yIHRoaXMgdGlja2V0LlwiKX0gLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxkaXYgcmVmPXtjb250YWluZXJSZWZ9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveFwiPlxuICAgICAgICAgIHt2aXNpYmxlTGluZXMubWFwKChsaW5lLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYW1vdW50VGV4dCA9IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShsaW5lLnRvdGFsQW1vdW50LCBjdXJyZW5jeUNvZGUpO1xuICAgICAgICAgICAgY29uc3QgcXR5VGV4dCA9IGZvcm1hdFF0eVZhbHVlKGxpbmUucXR5KTtcbiAgICAgICAgICAgIGNvbnN0IHByaWNlVGV4dCA9IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShsaW5lLnByaWNlLCBjdXJyZW5jeUNvZGUpO1xuICAgICAgICAgICAgY29uc3QgdGl0bGUgPSBsaW5lLmRlc2NyaXB0aW9uIHx8IGxpbmUucmVjSWQgfHwgXCItXCI7XG4gICAgICAgICAgICBjb25zdCBzdWJ0aXRsZSA9IGAke2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1F0eVwiLCBcIlF1YW50aXR5XCIpfTogJHtxdHlUZXh0fSAgICR7aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJpY2VcIiwgXCJQcmljZVwiKX06ICR7cHJpY2VUZXh0fWA7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtgJHtsaW5lLnJlY0lkfS0ke2luZGV4fWB9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxuICAgICAgICAgICAgICAgICAgZGF0ZVBhcnRzPXtFTVBUWV9EQVRFX1BBUlRTfVxuICAgICAgICAgICAgICAgICAgZGF0ZVBhbmVsQ29udGVudD17VElDS0VUX0xJTkVfREFURV9QQU5FTF9JQ09OfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICAgICAgICAgICAgc3VidGl0bGU9e3N1YnRpdGxlfVxuICAgICAgICAgICAgICAgICAgc3VidGl0bGVDbGFzc05hbWU9XCJleHBlbnNlLXNoZWV0LWNhcmRfX3N1YnRpdGxlIGV4cGVuc2UtbGluZS1jYXJkX19tZXRhXCJcbiAgICAgICAgICAgICAgICAgIGFtb3VudFRleHQ9e2Ftb3VudFRleHR9XG4gICAgICAgICAgICAgICAgICBvbk9wZW49eygpID0+IG9uT3BlbkxpbmUobGluZS5yZWNJZCl9XG4gICAgICAgICAgICAgICAgICB0aXRsZUNsYXNzTmFtZT1cInRpbWVsaW5lLW5hbWUgZXhwZW5zZS1saW5lLWNhcmRfX3RpdGxlXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgPENvbXBhY3RQYWdpbmF0aW9uXG4gICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsTGluZVBhZ2VzfVxuICAgICAgICBjdXJyZW50UGFnZT17bGluZVBhZ2V9XG4gICAgICAgIG9uUGFnZUNoYW5nZT17b25MaW5lUGFnZUNoYW5nZX1cbiAgICAgICAgbGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxuICAgICAgLz5cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0TGluZXNMaXN0O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyLCBFeHBlbnNlVGlja2V0RGV0YWlsTGluZSB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xuaW1wb3J0IHsgbWFwRXhwZW5zZVRpY2tldERldGFpbEhlYWRlciwgbWFwRXhwZW5zZVRpY2tldERldGFpbExpbmUgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0RGV0YWlsVHlwZXMudHNcIjtcblxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGVBcmdzID0ge1xuICBoYXNBY2Nlc3M6IGJvb2xlYW47XG4gIGZpbGVJZDogc3RyaW5nO1xuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcbn07XG5cbi8vIE93bnMgcmVhZCBzdGF0ZSBhbmQgQVBJIGxvYWRpbmcgYmVoYXZpb3IgZm9yIHRoZSB0aWNrZXQgZGV0YWlsIHBhZ2UuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbFN0YXRlID0gKHsgaGFzQWNjZXNzLCBmaWxlSWQsIG9uRm9yYmlkZGVuIH06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZUFyZ3MpID0+IHtcbiAgY29uc3QgW2hlYWRlciwgc2V0SGVhZGVyXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2xpbmVzLCBzZXRMaW5lc10gPSB1c2VTdGF0ZTxFeHBlbnNlVGlja2V0RGV0YWlsTGluZVtdPihbXSk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcblxuICBjb25zdCByZWxvYWREZXRhaWwgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFoYXNBY2Nlc3MpIHtcbiAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2FmZUZpbGVJZCA9IHNhZmVUZXh0KGZpbGVJZCk7XG4gICAgaWYgKCFzYWZlRmlsZUlkKSB7XG4gICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIlRpY2tldHNfRGV0YWlsX05vdEZvdW5kXCIsIFwiVGlja2V0IHdhcyBub3QgZm91bmQuXCIpKTtcbiAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgIHNldExpbmVzKFtdKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXQoc2FmZUZpbGVJZCwge1xuICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZT8uTWVzc2FnZSB8fCBpbmRUKFwiVGlja2V0c19EZXRhaWxfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgdGlja2V0IGRldGFpbC5cIikpO1xuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgIHNldExpbmVzKFtdKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XG4gICAgICBjb25zdCBzZWxlY3RlZCA9XG4gICAgICAgIGl0ZW1zLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeT8uRmlsZUlkKS50b1VwcGVyQ2FzZSgpID09PSBzYWZlRmlsZUlkLnRvVXBwZXJDYXNlKCkpIHx8IGl0ZW1zWzBdIHx8IG51bGw7XG5cbiAgICAgIGlmICghc2VsZWN0ZWQpIHtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJUaWNrZXRzX0RldGFpbF9Ob3RGb3VuZFwiLCBcIlRpY2tldCB3YXMgbm90IGZvdW5kLlwiKSk7XG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgc2V0TGluZXMoW10pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1hcHBlZEhlYWRlciA9IG1hcEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIoc2VsZWN0ZWQpO1xuICAgICAgY29uc3QgbWFwcGVkTGluZXMgPSAoQXJyYXkuaXNBcnJheShzZWxlY3RlZC5MaW5lcykgPyBzZWxlY3RlZC5MaW5lcyA6IFtdKS5tYXAoKGxpbmUpID0+XG4gICAgICAgIG1hcEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lKGxpbmUpXG4gICAgICApO1xuICAgICAgc2V0SGVhZGVyKG1hcHBlZEhlYWRlcik7XG4gICAgICBzZXRMaW5lcyhtYXBwZWRMaW5lcyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRFcnJvck1lc3NhZ2UoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiVGlja2V0c19EZXRhaWxfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgdGlja2V0IGRldGFpbC5cIikpO1xuICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgc2V0TGluZXMoW10pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfSwgW2ZpbGVJZCwgaGFzQWNjZXNzLCBvbkZvcmJpZGRlbl0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgdm9pZCByZWxvYWREZXRhaWwoKTtcbiAgfSwgW3JlbG9hZERldGFpbF0pO1xuXG4gIHJldHVybiB7XG4gICAgaGVhZGVyLFxuICAgIGxpbmVzLFxuICAgIGlzTG9hZGluZyxcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgcmVsb2FkRGV0YWlsLFxuICB9O1xufTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldFRpY2tldFVwZGF0ZVJlcXVlc3QgfSBmcm9tIFwiLi4vLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBleGVjdXRlRXhwZW5zZU11dGF0aW9uIH0gZnJvbSBcIi4uLy4uL2hvb2tzL2V4cGVuc2VNdXRhdGlvblV0aWxzLnRzXCI7XG5pbXBvcnQge1xuICBkZWxldGVFeHBlbnNlU2hlZXRMaW5lLFxuICBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXQsXG4gIGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldEZpbGUsXG4gIHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldCxcbn0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UsIHRvRXhwZW5zZUFwaURkTW1ZeXl5IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGlEYXRlVXRpbHMudHNcIjtcblxudHlwZSBEZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQgPSB7XG4gIHNoZWV0SWQ6IHN0cmluZztcbiAgbGluZVJlY0lkOiBzdHJpbmc7XG59O1xuXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnNBcmdzID0ge1xuICBidXN5OiBib29sZWFuO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGNhbkVkaXRUaWNrZXQ6IGJvb2xlYW47XG4gIGNhbkRlbGV0ZVRpY2tldDogYm9vbGVhbjtcbiAgZmlsZUlkOiBzdHJpbmc7XG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcbiAgZHJhZnRHYXN0b1R5cGU6IHN0cmluZztcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgZHJhZnRUcmFuc0RhdGU6IHN0cmluZztcbiAgZHJhZnRDb21lbnRhcmlvOiBzdHJpbmc7XG4gIGRyYWZ0VXJsRmlsZTogc3RyaW5nO1xuICBkcmFmdEZpbGVOYW1lOiBzdHJpbmc7XG4gIGRlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dD86IERlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCB8IG51bGw7XG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldElzRWRpdGluZzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xufTtcblxuY29uc3QgcGFyc2VPcHRpb25hbEludGVnZXIgPSAocmF3OiBzdHJpbmcpOiBudW1iZXIgfCB1bmRlZmluZWQgPT4ge1xuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhyYXcgfHwgXCJcIikudHJpbSgpO1xuICBpZiAoIXZhbHVlKSByZXR1cm4gdW5kZWZpbmVkO1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIucGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIocGFyc2VkKSA/IHBhcnNlZCA6IHVuZGVmaW5lZDtcbn07XG5cbi8vIFRyaWVzIHRvIGluZmVyIGEgc2FmZSBleHRlbnNpb24gZm9yIHVwZGF0ZSBwYXlsb2FkIGZyb20gZmlsZSBuYW1lIG9yIFVSTC5cbmNvbnN0IHJlc29sdmVUaWNrZXRGaWxlRXh0ZW5zaW9uID0gKGZpbGVOYW1lOiBzdHJpbmcsIHVybEZpbGU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XG4gIGNvbnN0IHNvdXJjZSA9IFN0cmluZyhmaWxlTmFtZSB8fCBcIlwiKS50cmltKCkgfHwgU3RyaW5nKHVybEZpbGUgfHwgXCJcIikudHJpbSgpO1xuICBjb25zdCBtYXRjaCA9IHNvdXJjZS5tYXRjaCgvXFwuKFthLXpBLVowLTldezEsMTB9KSg/OiR8Wz8jXSkvKTtcbiAgaWYgKCFtYXRjaCB8fCAhbWF0Y2hbMV0pIHJldHVybiB1bmRlZmluZWQ7XG4gIHJldHVybiBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xufTtcblxuY29uc3QgaXNOb3RGb3VuZEVycm9yID0gKGVycm9yOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiBlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDQ7XG59O1xuXG5jb25zdCBpc01pc3NpbmdUaWNrZXRGaWxlTWVzc2FnZSA9IChtZXNzYWdlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcobWVzc2FnZSB8fCBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gZmFsc2U7XG5cbiAgcmV0dXJuIChcbiAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXJjaGl2byBhc29jaWFkb1wiKSB8fFxuICAgIG5vcm1hbGl6ZWQuaW5jbHVkZXMoXCJhcmNoaXZvIGFkanVudG9cIikgfHxcbiAgICBub3JtYWxpemVkLmluY2x1ZGVzKFwiYXNzb2NpYXRlZCBmaWxlXCIpIHx8XG4gICAgbm9ybWFsaXplZC5pbmNsdWRlcyhcImF0dGFjaGVkIGZpbGVcIilcbiAgKTtcbn07XG5cbi8vIEVuY2Fwc3VsYXRlcyB1cGRhdGUgYW5kIGRlbGV0ZSBtdXRhdGlvbnMgZm9yIHRpY2tldCBoZWFkZXIgZGV0YWlsLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnMgPSAoe1xuICBidXN5LFxuICBpc0VkaXRpbmcsXG4gIGNhbkVkaXRUaWNrZXQsXG4gIGNhbkRlbGV0ZVRpY2tldCxcbiAgZmlsZUlkLFxuICBkcmFmdERlc2NyaXB0aW9uLFxuICBkcmFmdEdhc3RvVHlwZSxcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gIGRyYWZ0VHJhbnNEYXRlLFxuICBkcmFmdENvbWVudGFyaW8sXG4gIGRyYWZ0VXJsRmlsZSxcbiAgZHJhZnRGaWxlTmFtZSxcbiAgZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0LFxuICBzZXRNb2RhbEVycm9yLFxuICBzZXRCdXN5LFxuICBzZXRTdGF0dXMsXG4gIHNldElzRWRpdGluZyxcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnNBcmdzKSA9PiB7XG4gIGNvbnN0IGhhbmRsZVVwZGF0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoYnVzeSB8fCAhaXNFZGl0aW5nKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFjYW5FZGl0VGlja2V0KSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3Qgbm9ybWFsaXplZERlc2NyaXB0aW9uID0gU3RyaW5nKGRyYWZ0RGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpO1xuICAgIGlmICghbm9ybWFsaXplZERlc2NyaXB0aW9uKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9EZXNjcmlwdGlvblJlcXVpcmVkXCIsIFwiRGVzY3JpcHRpb24gaXMgcmVxdWlyZWQuXCIpO1xuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBub3JtYWxpemVkQ3VycmVuY3kgPSBTdHJpbmcoZHJhZnRDdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XG4gICAgaWYgKCFub3JtYWxpemVkQ3VycmVuY3kpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBpbmRUKFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0N1cnJlbmN5UmVxdWlyZWRcIiwgXCJDdXJyZW5jeSBpcyByZXF1aXJlZC5cIik7XG4gICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcnNlZEdhc3RvVHlwZSA9IHBhcnNlT3B0aW9uYWxJbnRlZ2VyKGRyYWZ0R2FzdG9UeXBlKTtcbiAgICBpZiAocGFyc2VkR2FzdG9UeXBlICE9PSB1bmRlZmluZWQgJiYgIVswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxNF0uaW5jbHVkZXMocGFyc2VkR2FzdG9UeXBlKSkge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKTtcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgcmF3VHJhbnNEYXRlID0gU3RyaW5nKGRyYWZ0VHJhbnNEYXRlIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBjb25zdCBub3JtYWxpemVkVHJhbnNEYXRlID0gcmF3VHJhbnNEYXRlID8gdG9FeHBlbnNlQXBpRGRNbVl5eXkocmF3VHJhbnNEYXRlKSA6IFwiXCI7XG4gICAgaWYgKHJhd1RyYW5zRGF0ZSAmJiAhbm9ybWFsaXplZFRyYW5zRGF0ZSkge1xuICAgICAgc2V0TW9kYWxFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcbiAgICAgIHNldFN0YXR1cyhFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0ID0ge1xuICAgICAgZGVzY3JpcHRpb246IG5vcm1hbGl6ZWREZXNjcmlwdGlvbixcbiAgICAgIGN1cnJlbmN5Q29kZTogbm9ybWFsaXplZEN1cnJlbmN5LFxuICAgICAgdHJhbnNEYXRlOiBub3JtYWxpemVkVHJhbnNEYXRlIHx8IHVuZGVmaW5lZCxcbiAgICAgIGNvbWVudGFyaW86IFN0cmluZyhkcmFmdENvbWVudGFyaW8gfHwgXCJcIikudHJpbSgpIHx8IHVuZGVmaW5lZCxcbiAgICAgIHVybEZpbGU6IFN0cmluZyhkcmFmdFVybEZpbGUgfHwgXCJcIikudHJpbSgpIHx8IHVuZGVmaW5lZCxcbiAgICAgIGZpbGVOYW1lOiBTdHJpbmcoZHJhZnRGaWxlTmFtZSB8fCBcIlwiKS50cmltKCkgfHwgdW5kZWZpbmVkLFxuICAgICAgZmlsZUV4dGVuc2lvbjogcmVzb2x2ZVRpY2tldEZpbGVFeHRlbnNpb24oZHJhZnRGaWxlTmFtZSwgZHJhZnRVcmxGaWxlKSxcbiAgICAgIGdhc3RvVHlwZTogcGFyc2VkR2FzdG9UeXBlIGFzIEV4cGVuc2VTaGVldFRpY2tldFVwZGF0ZVJlcXVlc3RbXCJnYXN0b1R5cGVcIl0sXG4gICAgfTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xuICAgICAgc3RhcnRTdGF0dXM6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGluZ1wiLCBcIlVwZGF0aW5nIGV4cGVuc2Ugc2hlZXQuLi5cIiksXG4gICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKSxcbiAgICAgIHNldE1vZGFsRXJyb3IsXG4gICAgICBzZXRCdXN5LFxuICAgICAgc2V0U3RhdHVzLFxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdXBkYXRlRXhwZW5zZVNoZWV0VGlja2V0KGZpbGVJZCwgcGF5bG9hZCk7XG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVGYWlsZWRcIiwgXCJVcGRhdGUgZmFpbGVkLlwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IHVwZGF0ZWRcIikpO1xuICAgICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xuICB9LCBbXG4gICAgYnVzeSxcbiAgICBjYW5FZGl0VGlja2V0LFxuICAgIGRyYWZ0Q29tZW50YXJpbyxcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0RmlsZU5hbWUsXG4gICAgZHJhZnRHYXN0b1R5cGUsXG4gICAgZHJhZnRUcmFuc0RhdGUsXG4gICAgZHJhZnRVcmxGaWxlLFxuICAgIGZpbGVJZCxcbiAgICBpc0VkaXRpbmcsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRJc0VkaXRpbmcsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBzZXRTdGF0dXMsXG4gIF0pO1xuXG4gIGNvbnN0IGhhbmRsZURlbGV0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghY2FuRGVsZXRlVGlja2V0KSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XG4gICAgICBzdGFydFN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0aW5nXCIsIFwiRGVsZXRpbmcgZXhwZW5zZSBzaGVldC4uLlwiKSxcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRXJyb3JcIiwgXCJEZWxldGUgZXJyb3IuXCIpLFxuICAgICAgc2V0TW9kYWxFcnJvcixcbiAgICAgIHNldEJ1c3ksXG4gICAgICBzZXRTdGF0dXMsXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBkZWxldGVGaWxlUmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRGaWxlKGZpbGVJZCwge1xuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKCFkZWxldGVGaWxlUmVzcG9uc2UuU3VjY2VzcyAmJiAhaXNNaXNzaW5nVGlja2V0RmlsZU1lc3NhZ2UoZGVsZXRlRmlsZVJlc3BvbnNlLk1lc3NhZ2UpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGVsZXRlRmlsZVJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaWYgKCFpc05vdEZvdW5kRXJyb3IoZXJyb3IpKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldChmaWxlSWQpO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRlbGV0ZUxpbmtlZEV4cGVuc2VMaW5lQ29udGV4dCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBsaW5lRGVsZXRlUmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXRMaW5lKFxuICAgICAgICAgICAgICBkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQuc2hlZXRJZCxcbiAgICAgICAgICAgICAgZGVsZXRlTGlua2VkRXhwZW5zZUxpbmVDb250ZXh0LmxpbmVSZWNJZCxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBpZiAoIWxpbmVEZWxldGVSZXNwb25zZS5TdWNjZXNzKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihsaW5lRGVsZXRlUmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAvLyBUaGUgbGlua2VkIGxpbmUgY2FuIGJlIGF1dG8tcmVtb3ZlZCBieSBiYWNrZW5kIGNhc2NhZGU7IGtlZXAgZmxvdyBzdWNjZXNzZnVsIGluIHRoYXQgY2FzZS5cbiAgICAgICAgICAgIGlmICghaXNOb3RGb3VuZEVycm9yKGVycm9yKSkge1xuICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IGRlbGV0ZWRcIikpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xuICB9LCBbYnVzeSwgY2FuRGVsZXRlVGlja2V0LCBkZWxldGVMaW5rZWRFeHBlbnNlTGluZUNvbnRleHQsIGZpbGVJZCwgc2V0QnVzeSwgc2V0TW9kYWxFcnJvciwgc2V0U3RhdHVzXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBoYW5kbGVVcGRhdGUsXG4gICAgaGFuZGxlRGVsZXRlLFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMudHNcIjtcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnNBcmdzID0ge1xuICBidXN5OiBib29sZWFuO1xuICBtb2RhbE9wZW46IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgaXNMb2NrZWQ6IGJvb2xlYW47XG4gIGFjdGlvbk1vZGU/OiBcImRlZmF1bHRcIiB8IFwiZGVsZXRlX29ubHlcIiB8IFwidmlld19vbmx5XCI7XG4gIHBlcm1pc3Npb25zUmVhZHk/OiBib29sZWFuO1xuICBjYW5FZGl0VGlja2V0OiBib29sZWFuO1xuICBjYW5EZWxldGVUaWNrZXQ6IGJvb2xlYW47XG4gIGZpbGVJZDogc3RyaW5nO1xuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuICBoYW5kbGVEZWxldGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XG4gIG9uRGVsZXRlU3VjY2Vzcz86ICgpID0+IHZvaWQ7XG4gIG9wZW5Db25maXJtOiAob3B0czoge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xuICAgIG9uQ29uZmlybT86ICgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQ7XG4gIH0pID0+IHZvaWQ7XG4gIGNsb3NlQ29uZmlybTogKCkgPT4gdm9pZDtcbn07XG5cbi8vIENvb3JkaW5hdGVzIHRvcGJhciBpY29uIHN0YXRlIGFuZCBkaXNwYXRjaCBhY3Rpb25zIGZvciB0aWNrZXQgZGV0YWlsLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zID0gKHtcbiAgYnVzeSxcbiAgbW9kYWxPcGVuLFxuICBpc0VkaXRpbmcsXG4gIGlzTG9ja2VkLFxuICBhY3Rpb25Nb2RlID0gXCJkZWZhdWx0XCIsXG4gIHBlcm1pc3Npb25zUmVhZHkgPSB0cnVlLFxuICBjYW5FZGl0VGlja2V0LFxuICBjYW5EZWxldGVUaWNrZXQsXG4gIGZpbGVJZCxcbiAgc2V0TW9kYWxFcnJvcixcbiAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgaGFuZGxlVXBkYXRlLFxuICBoYW5kbGVEZWxldGUsXG4gIG9uU2F2ZVN1Y2Nlc3MsXG4gIG9uRGVsZXRlU3VjY2VzcyxcbiAgb3BlbkNvbmZpcm0sXG4gIGNsb3NlQ29uZmlybSxcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zQXJncykgPT4ge1xuICB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMoe1xuICAgIGFjdGlvbkdyb3VwSWQ6IFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLWFjdGlvbnNcIixcbiAgICBpZHM6IHtcbiAgICAgIGVkaXRJY29uSWQ6IFwiZXhwZW5zZVRpY2tldEVkaXRJY29uXCIsXG4gICAgICBzYXZlSWNvbklkOiBcImV4cGVuc2VUaWNrZXRTYXZlSWNvblwiLFxuICAgICAgZGVsZXRlQnRuSWQ6IFwiZXhwZW5zZVRpY2tldERlbGV0ZUJ0blwiLFxuICAgICAgY2FuY2VsQnRuSWQ6IFwiZXhwZW5zZVRpY2tldENhbmNlbEJ0blwiLFxuICAgIH0sXG4gICAgZXZlbnRzOiB7XG4gICAgICBlZGl0RXZlbnQ6IFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLWVkaXRcIixcbiAgICAgIGRlbGV0ZUV2ZW50OiBcImV4cGVuc2UtdGlja2V0LWRldGFpbC1kZWxldGVcIixcbiAgICAgIGNhbmNlbEV2ZW50OiBcImV4cGVuc2UtdGlja2V0LWRldGFpbC1jYW5jZWwtZWRpdFwiLFxuICAgIH0sXG4gICAgYnVzeSxcbiAgICBtb2RhbE9wZW4sXG4gICAgaXNFZGl0aW5nLFxuICAgIGlzQ3JlYXRlTW9kZTogZmFsc2UsXG4gICAgaXNMb2NrZWQsXG4gICAgYWN0aW9uTW9kZSxcbiAgICBwZXJtaXNzaW9uc1JlYWR5LFxuICAgIGNhbkNyZWF0ZTogZmFsc2UsXG4gICAgY2FuRWRpdDogY2FuRWRpdFRpY2tldCxcbiAgICBjYW5EZWxldGU6IGNhbkRlbGV0ZVRpY2tldCxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVTYXZlOiBoYW5kbGVVcGRhdGUsXG4gICAgaGFuZGxlRGVsZXRlLFxuICAgIHNhdmVDb25maXJtVGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19UaXRsZVwiLCBcIlNhdmUgY2hhbmdlc1wiKSxcbiAgICBzYXZlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gc2F2ZSBjaGFuZ2VzP1wiKSxcbiAgICBzYXZlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIiksXG4gICAgZGVsZXRlQ29uZmlybVRpdGxlOiBpbmRUKFwiQ29uZmlybV9EZWxldGVfVGl0bGVcIiwgXCJEZWxldGVcIiksXG4gICAgZGVsZXRlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJDb25maXJtX0RlbGV0ZV9Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgaXRlbT9cIiksXG4gICAgZGVsZXRlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpLFxuICAgIG9uU2F2ZVN1Y2Nlc3MsXG4gICAgb25EZWxldGVTdWNjZXNzOiBvbkRlbGV0ZVN1Y2Nlc3MgfHwgKCgpID0+IG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9UaWNrZXRzXCIpKSxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBjbG9zZUNvbmZpcm0sXG4gIH0pO1xufTtcbiIsICJcdUZFRkZpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRQcmV2aWV3QmxvYiB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuXG5jb25zdCBQUkVWSUVXX01BWF9TQ0FMRSA9IDQ7XG5jb25zdCBQUkVWSUVXX1NDQUxFX1NURVAgPSAwLjI1O1xuXG5leHBvcnQgdHlwZSBUaWNrZXRQcmV2aWV3UG9pbnQgPSB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xufTtcblxudHlwZSBVc2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3QXJncyA9IHtcbiAgc291cmNlVXJsOiBzdHJpbmc7XG59O1xuXG5jb25zdCBjbGFtcFByZXZpZXdTY2FsZSA9ICh2YWx1ZTogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgaWYgKCFOdW1iZXIuaXNGaW5pdGUodmFsdWUpKSByZXR1cm4gMTtcbiAgcmV0dXJuIE1hdGgubWluKFBSRVZJRVdfTUFYX1NDQUxFLCBNYXRoLm1heCgxLCB2YWx1ZSkpO1xufTtcblxuY29uc3QgZ2V0UHJldmlld1BvaW50RGlzdGFuY2UgPSAobGVmdDogVGlja2V0UHJldmlld1BvaW50LCByaWdodDogVGlja2V0UHJldmlld1BvaW50KTogbnVtYmVyID0+IHtcbiAgY29uc3QgZGVsdGFYID0gcmlnaHQueCAtIGxlZnQueDtcbiAgY29uc3QgZGVsdGFZID0gcmlnaHQueSAtIGxlZnQueTtcbiAgcmV0dXJuIE1hdGguc3FydChkZWx0YVggKiBkZWx0YVggKyBkZWx0YVkgKiBkZWx0YVkpO1xufTtcblxuY29uc3QgZ2V0UHJldmlld1BvaW50Q2VudGVyID0gKGxlZnQ6IFRpY2tldFByZXZpZXdQb2ludCwgcmlnaHQ6IFRpY2tldFByZXZpZXdQb2ludCk6IFRpY2tldFByZXZpZXdQb2ludCA9PiAoe1xuICB4OiAobGVmdC54ICsgcmlnaHQueCkgLyAyLFxuICB5OiAobGVmdC55ICsgcmlnaHQueSkgLyAyLFxufSk7XG5cbi8vIE1hbmFnZXMgdGlja2V0IGltYWdlIHByZXZpZXcgc3RhdGUgYW5kIHpvb20vcGFuIGdlc3R1cmVzLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcgPSAoeyBzb3VyY2VVcmwgfTogVXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlld0FyZ3MpID0+IHtcbiAgY29uc3QgW3ByZXZpZXdPcGVuLCBzZXRQcmV2aWV3T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwcmV2aWV3QnVzeSwgc2V0UHJldmlld0J1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcHJldmlld0Vycm9yLCBzZXRQcmV2aWV3RXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtwcmV2aWV3SW1hZ2VVcmwsIHNldFByZXZpZXdJbWFnZVVybF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3ByZXZpZXdTY2FsZSwgc2V0UHJldmlld1NjYWxlXSA9IHVzZVN0YXRlKDEpO1xuICBjb25zdCBbcHJldmlld1RyYW5zbGF0ZSwgc2V0UHJldmlld1RyYW5zbGF0ZV0gPSB1c2VTdGF0ZTxUaWNrZXRQcmV2aWV3UG9pbnQ+KHsgeDogMCwgeTogMCB9KTtcblxuICBjb25zdCBwcmV2aWV3U2NhbGVSZWYgPSB1c2VSZWYoMSk7XG4gIGNvbnN0IHByZXZpZXdUcmFuc2xhdGVSZWYgPSB1c2VSZWY8VGlja2V0UHJldmlld1BvaW50Pih7IHg6IDAsIHk6IDAgfSk7XG4gIGNvbnN0IHByZXZpZXdQb2ludGVyc1JlZiA9IHVzZVJlZjxNYXA8bnVtYmVyLCBUaWNrZXRQcmV2aWV3UG9pbnQ+PihuZXcgTWFwKCkpO1xuICBjb25zdCBwcmV2aWV3UGFuUG9pbnRlclJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcHJldmlld1Bhbkxhc3RQb2ludFJlZiA9IHVzZVJlZjxUaWNrZXRQcmV2aWV3UG9pbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcHJldmlld1BpbmNoU25hcHNob3RSZWYgPSB1c2VSZWY8e1xuICAgIGRpc3RhbmNlOiBudW1iZXI7XG4gICAgc2NhbGU6IG51bWJlcjtcbiAgICBjZW50ZXI6IFRpY2tldFByZXZpZXdQb2ludDtcbiAgICB0cmFuc2xhdGU6IFRpY2tldFByZXZpZXdQb2ludDtcbiAgfSB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IGFwcGx5UHJldmlld1RyYW5zZm9ybSA9IHVzZUNhbGxiYWNrKChuZXh0U2NhbGU6IG51bWJlciwgbmV4dFRyYW5zbGF0ZTogVGlja2V0UHJldmlld1BvaW50KSA9PiB7XG4gICAgY29uc3Qgbm9ybWFsaXplZFNjYWxlID0gY2xhbXBQcmV2aWV3U2NhbGUobmV4dFNjYWxlKTtcbiAgICBjb25zdCBub3JtYWxpemVkVHJhbnNsYXRlID0gbm9ybWFsaXplZFNjYWxlIDw9IDEgPyB7IHg6IDAsIHk6IDAgfSA6IG5leHRUcmFuc2xhdGU7XG5cbiAgICBwcmV2aWV3U2NhbGVSZWYuY3VycmVudCA9IG5vcm1hbGl6ZWRTY2FsZTtcbiAgICBwcmV2aWV3VHJhbnNsYXRlUmVmLmN1cnJlbnQgPSBub3JtYWxpemVkVHJhbnNsYXRlO1xuICAgIHNldFByZXZpZXdTY2FsZShub3JtYWxpemVkU2NhbGUpO1xuICAgIHNldFByZXZpZXdUcmFuc2xhdGUobm9ybWFsaXplZFRyYW5zbGF0ZSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCByZXNldFByZXZpZXdHZXN0dXJlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LmNsZWFyKCk7XG4gICAgcHJldmlld1BhblBvaW50ZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICBwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICBhcHBseVByZXZpZXdUcmFuc2Zvcm0oMSwgeyB4OiAwLCB5OiAwIH0pO1xuICB9LCBbYXBwbHlQcmV2aWV3VHJhbnNmb3JtXSk7XG5cbiAgY29uc3QgcmVidWlsZFBpbmNoU25hcHNob3QgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3QgcG9pbnRlclBvaW50cyA9IEFycmF5LmZyb20ocHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQudmFsdWVzKCkpO1xuICAgIGlmIChwb2ludGVyUG9pbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgIHByZXZpZXdQaW5jaFNuYXBzaG90UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IFtsZWZ0LCByaWdodF0gPSBwb2ludGVyUG9pbnRzO1xuICAgIHByZXZpZXdQaW5jaFNuYXBzaG90UmVmLmN1cnJlbnQgPSB7XG4gICAgICBkaXN0YW5jZTogTWF0aC5tYXgoMSwgZ2V0UHJldmlld1BvaW50RGlzdGFuY2UobGVmdCwgcmlnaHQpKSxcbiAgICAgIHNjYWxlOiBwcmV2aWV3U2NhbGVSZWYuY3VycmVudCxcbiAgICAgIGNlbnRlcjogZ2V0UHJldmlld1BvaW50Q2VudGVyKGxlZnQsIHJpZ2h0KSxcbiAgICAgIHRyYW5zbGF0ZTogcHJldmlld1RyYW5zbGF0ZVJlZi5jdXJyZW50LFxuICAgIH07XG4gIH0sIFtdKTtcblxuICBjb25zdCBjbG9zZVByZXZpZXcgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0UHJldmlld09wZW4oZmFsc2UpO1xuICAgIHNldFByZXZpZXdCdXN5KGZhbHNlKTtcbiAgICBzZXRQcmV2aWV3RXJyb3IoXCJcIik7XG4gICAgcmVzZXRQcmV2aWV3R2VzdHVyZSgpO1xuICAgIHNldFByZXZpZXdJbWFnZVVybCgocHJldmlvdXMpID0+IHtcbiAgICAgIGlmIChwcmV2aW91cykge1xuICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHByZXZpb3VzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH0pO1xuICB9LCBbcmVzZXRQcmV2aWV3R2VzdHVyZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChwcmV2aWV3SW1hZ2VVcmwpIHtcbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChwcmV2aWV3SW1hZ2VVcmwpO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFtwcmV2aWV3SW1hZ2VVcmxdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghcHJldmlld09wZW4pIHJldHVybjtcblxuICAgIGNvbnN0IG9uS2V5RG93biA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgICBjbG9zZVByZXZpZXcoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5RG93bik7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xuICB9LCBbcHJldmlld09wZW4sIGNsb3NlUHJldmlld10pO1xuXG4gIGNvbnN0IGhhbmRsZVByZXZpZXdQb2ludGVyRG93biA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgaWYgKCFwcmV2aWV3SW1hZ2VVcmwgfHwgcHJldmlld0J1c3kpIHJldHVybjtcbiAgICAgIGNvbnN0IHBvaW50OiBUaWNrZXRQcmV2aWV3UG9pbnQgPSB7IHg6IGV2ZW50LmNsaWVudFgsIHk6IGV2ZW50LmNsaWVudFkgfTtcbiAgICAgIHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LnNldChldmVudC5wb2ludGVySWQsIHBvaW50KTtcbiAgICAgIGlmICh0eXBlb2YgZXZlbnQuY3VycmVudFRhcmdldC5zZXRQb2ludGVyQ2FwdHVyZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5zZXRQb2ludGVyQ2FwdHVyZShldmVudC5wb2ludGVySWQpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAvLyBJZ25vcmUgY2FwdHVyZSBmYWlsdXJlcyBvbiBicm93c2VycyB0aGF0IGRvIG5vdCBmdWxseSBzdXBwb3J0IHBvaW50ZXIgY2FwdHVyZS5cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuc2l6ZSA9PT0gMSkge1xuICAgICAgICBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ID0gZXZlbnQucG9pbnRlcklkO1xuICAgICAgICBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQgPSBwb2ludDtcbiAgICAgICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcHJldmlld1BhblBvaW50ZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgcmVidWlsZFBpbmNoU25hcHNob3QoKTtcbiAgICB9LFxuICAgIFtwcmV2aWV3QnVzeSwgcHJldmlld0ltYWdlVXJsLCByZWJ1aWxkUGluY2hTbmFwc2hvdF1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUgPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICAgIGlmICghcHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuaGFzKGV2ZW50LnBvaW50ZXJJZCkpIHJldHVybjtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnN0IHBvaW50OiBUaWNrZXRQcmV2aWV3UG9pbnQgPSB7IHg6IGV2ZW50LmNsaWVudFgsIHk6IGV2ZW50LmNsaWVudFkgfTtcbiAgICAgIHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LnNldChldmVudC5wb2ludGVySWQsIHBvaW50KTtcblxuICAgICAgY29uc3QgcG9pbnRlckVudHJpZXMgPSBBcnJheS5mcm9tKHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LmVudHJpZXMoKSk7XG4gICAgICBjb25zdCBwb2ludGVyUG9pbnRzID0gcG9pbnRlckVudHJpZXMubWFwKChlbnRyeSkgPT4gZW50cnlbMV0pO1xuXG4gICAgICBpZiAocG9pbnRlclBvaW50cy5sZW5ndGggPj0gMikge1xuICAgICAgICBpZiAoIXByZXZpZXdQaW5jaFNuYXBzaG90UmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICByZWJ1aWxkUGluY2hTbmFwc2hvdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc25hcHNob3QgPSBwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50O1xuICAgICAgICBpZiAoIXNuYXBzaG90KSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgW2xlZnQsIHJpZ2h0XSA9IHBvaW50ZXJQb2ludHM7XG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5tYXgoMSwgZ2V0UHJldmlld1BvaW50RGlzdGFuY2UobGVmdCwgcmlnaHQpKTtcbiAgICAgICAgY29uc3QgcmF0aW8gPSBkaXN0YW5jZSAvIE1hdGgubWF4KDEsIHNuYXBzaG90LmRpc3RhbmNlKTtcbiAgICAgICAgY29uc3QgbmV4dFNjYWxlID0gY2xhbXBQcmV2aWV3U2NhbGUoc25hcHNob3Quc2NhbGUgKiByYXRpbyk7XG4gICAgICAgIGNvbnN0IGNlbnRlciA9IGdldFByZXZpZXdQb2ludENlbnRlcihsZWZ0LCByaWdodCk7XG4gICAgICAgIGNvbnN0IG5leHRUcmFuc2xhdGU6IFRpY2tldFByZXZpZXdQb2ludCA9IHtcbiAgICAgICAgICB4OiBzbmFwc2hvdC50cmFuc2xhdGUueCArIChjZW50ZXIueCAtIHNuYXBzaG90LmNlbnRlci54KSxcbiAgICAgICAgICB5OiBzbmFwc2hvdC50cmFuc2xhdGUueSArIChjZW50ZXIueSAtIHNuYXBzaG90LmNlbnRlci55KSxcbiAgICAgICAgfTtcbiAgICAgICAgYXBwbHlQcmV2aWV3VHJhbnNmb3JtKG5leHRTY2FsZSwgbmV4dFRyYW5zbGF0ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHBvaW50ZXJQb2ludHMubGVuZ3RoICE9PSAxIHx8IHByZXZpZXdTY2FsZVJlZi5jdXJyZW50IDw9IDEgfHwgcHJldmlld1BhblBvaW50ZXJSZWYuY3VycmVudCAhPT0gZXZlbnQucG9pbnRlcklkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbGFzdFBvaW50ID0gcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50O1xuICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gcG9pbnQ7XG4gICAgICBpZiAoIWxhc3RQb2ludCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBuZXh0VHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQgPSB7XG4gICAgICAgIHg6IHByZXZpZXdUcmFuc2xhdGVSZWYuY3VycmVudC54ICsgKHBvaW50LnggLSBsYXN0UG9pbnQueCksXG4gICAgICAgIHk6IHByZXZpZXdUcmFuc2xhdGVSZWYuY3VycmVudC55ICsgKHBvaW50LnkgLSBsYXN0UG9pbnQueSksXG4gICAgICB9O1xuICAgICAgYXBwbHlQcmV2aWV3VHJhbnNmb3JtKHByZXZpZXdTY2FsZVJlZi5jdXJyZW50LCBuZXh0VHJhbnNsYXRlKTtcbiAgICB9LFxuICAgIFthcHBseVByZXZpZXdUcmFuc2Zvcm0sIHJlYnVpbGRQaW5jaFNuYXBzaG90XVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZVByZXZpZXdQb2ludGVyRW5kID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICBpZiAoIXByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LmhhcyhldmVudC5wb2ludGVySWQpKSByZXR1cm47XG4gICAgICBwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5kZWxldGUoZXZlbnQucG9pbnRlcklkKTtcbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIGV2ZW50LmN1cnJlbnRUYXJnZXQuaGFzUG9pbnRlckNhcHR1cmUgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0Lmhhc1BvaW50ZXJDYXB0dXJlKGV2ZW50LnBvaW50ZXJJZClcbiAgICAgICkge1xuICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnJlbGVhc2VQb2ludGVyQ2FwdHVyZShldmVudC5wb2ludGVySWQpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwb2ludGVyRW50cmllcyA9IEFycmF5LmZyb20ocHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuZW50cmllcygpKTtcbiAgICAgIGlmIChwb2ludGVyRW50cmllcy5sZW5ndGggPj0gMikge1xuICAgICAgICBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgcmVidWlsZFBpbmNoU25hcHNob3QoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAocG9pbnRlckVudHJpZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGNvbnN0IFtwb2ludGVySWQsIHBvaW50ZXJQb2ludF0gPSBwb2ludGVyRW50cmllc1swXTtcbiAgICAgICAgcHJldmlld1BhblBvaW50ZXJSZWYuY3VycmVudCA9IHBvaW50ZXJJZDtcbiAgICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gcG9pbnRlclBvaW50O1xuICAgICAgICBwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICBwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIGlmIChwcmV2aWV3U2NhbGVSZWYuY3VycmVudCA8PSAxKSB7XG4gICAgICAgIGFwcGx5UHJldmlld1RyYW5zZm9ybSgxLCB7IHg6IDAsIHk6IDAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbYXBwbHlQcmV2aWV3VHJhbnNmb3JtLCByZWJ1aWxkUGluY2hTbmFwc2hvdF1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVQcmV2aWV3V2hlZWwgPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LldoZWVsRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICBpZiAoIXByZXZpZXdJbWFnZVVybCB8fCBwcmV2aWV3QnVzeSkgcmV0dXJuO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgY29uc3QgZGlyZWN0aW9uID0gZXZlbnQuZGVsdGFZIDwgMCA/IDEgOiAtMTtcbiAgICAgIGNvbnN0IG5leHRTY2FsZSA9IGNsYW1wUHJldmlld1NjYWxlKHByZXZpZXdTY2FsZVJlZi5jdXJyZW50ICsgZGlyZWN0aW9uICogUFJFVklFV19TQ0FMRV9TVEVQKTtcbiAgICAgIGFwcGx5UHJldmlld1RyYW5zZm9ybShuZXh0U2NhbGUsIHByZXZpZXdUcmFuc2xhdGVSZWYuY3VycmVudCk7XG4gICAgfSxcbiAgICBbYXBwbHlQcmV2aWV3VHJhbnNmb3JtLCBwcmV2aWV3QnVzeSwgcHJldmlld0ltYWdlVXJsXVxuICApO1xuXG4gIGNvbnN0IG9wZW5QcmV2aWV3ID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRVcmwgPSBzYWZlVGV4dChzb3VyY2VVcmwpO1xuICAgIGlmICghY3VycmVudFVybCkgcmV0dXJuO1xuXG4gICAgcmVzZXRQcmV2aWV3R2VzdHVyZSgpO1xuICAgIHNldFByZXZpZXdPcGVuKHRydWUpO1xuICAgIHNldFByZXZpZXdCdXN5KHRydWUpO1xuICAgIHNldFByZXZpZXdFcnJvcihcIlwiKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBibG9iID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRQcmV2aWV3QmxvYihjdXJyZW50VXJsLCB7XG4gICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBvYmplY3RVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgc2V0UHJldmlld0ltYWdlVXJsKChwcmV2aW91cykgPT4ge1xuICAgICAgICBpZiAocHJldmlvdXMpIHtcbiAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHByZXZpb3VzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqZWN0VXJsO1xuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHNldFByZXZpZXdFcnJvcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XG4gICAgICBzZXRQcmV2aWV3SW1hZ2VVcmwoXCJcIik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFByZXZpZXdCdXN5KGZhbHNlKTtcbiAgICB9XG4gIH0sIFtyZXNldFByZXZpZXdHZXN0dXJlLCBzb3VyY2VVcmxdKTtcblxuICByZXR1cm4ge1xuICAgIHByZXZpZXdPcGVuLFxuICAgIHByZXZpZXdCdXN5LFxuICAgIHByZXZpZXdFcnJvcixcbiAgICBwcmV2aWV3SW1hZ2VVcmwsXG4gICAgcHJldmlld1NjYWxlLFxuICAgIHByZXZpZXdUcmFuc2xhdGUsXG4gICAgb3BlblByZXZpZXcsXG4gICAgY2xvc2VQcmV2aWV3LFxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bixcbiAgICBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUsXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJFbmQsXG4gICAgaGFuZGxlUHJldmlld1doZWVsLFxuICB9O1xufTtcclxuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBUaWNrZXRQcmV2aWV3UG9pbnQgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3LnRzXCI7XG5cbnR5cGUgRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbFByb3BzID0ge1xuICBvcGVuOiBib29sZWFuO1xuICBidXN5OiBib29sZWFuO1xuICBlcnJvcjogc3RyaW5nO1xuICBpbWFnZVVybDogc3RyaW5nO1xuICBpbWFnZUFsdDogc3RyaW5nO1xuICBzY2FsZTogbnVtYmVyO1xuICB0cmFuc2xhdGU6IFRpY2tldFByZXZpZXdQb2ludDtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgb25Qb2ludGVyRG93bjogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xuICBvblBvaW50ZXJNb3ZlOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XG4gIG9uUG9pbnRlckVuZDogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xuICBvbldoZWVsOiAoZXZlbnQ6IFJlYWN0LldoZWVsRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xufTtcblxuLy8gUmVuZGVycyB0aGUgdGlja2V0IGltYWdlIHByZXZpZXcgb3ZlcmxheSB3aXRoIHpvb20gYW5kIHBhbiBnZXN0dXJlcy5cbmNvbnN0IEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWwgPSAoe1xuICBvcGVuLFxuICBidXN5LFxuICBlcnJvcixcbiAgaW1hZ2VVcmwsXG4gIGltYWdlQWx0LFxuICBzY2FsZSxcbiAgdHJhbnNsYXRlLFxuICBvbkNsb3NlLFxuICBvblBvaW50ZXJEb3duLFxuICBvblBvaW50ZXJNb3ZlLFxuICBvblBvaW50ZXJFbmQsXG4gIG9uV2hlZWwsXG59OiBFeHBlbnNlVGlja2V0UHJldmlld01vZGFsUHJvcHMpID0+IHtcbiAgaWYgKCFvcGVuKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4gY3JlYXRlUG9ydGFsKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTYwMDAwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1zbGF0ZS05NTAvNDUgYmFja2Ryb3AtYmx1ci1tZCBweC00IHB5LTZcIiBvbkNsaWNrPXtvbkNsb3NlfT5cbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fQ2xvc2VcIiwgXCJDbG9zZVwiKX1cbiAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcmlnaHQtNCB0b3AtNCBpbmxpbmUtZmxleCBoLTEwIHctMTAgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMC82MCBiZy1zbGF0ZS05MDAvNTUgdGV4dC1zbGF0ZS0xMDAgdHJhbnNpdGlvbiBob3ZlcjpiZy1zbGF0ZS05MDAvNzAgZm9jdXMtdmlzaWJsZTpvdXRsaW5lLWhpZGRlbiBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctc2xhdGUtMjAwLzgwXCJcbiAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgb25DbG9zZSgpO1xuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgZD1cIk02IDZMMTggMThNMTggNkw2IDE4XCJcbiAgICAgICAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXG4gICAgICAgICAgICBzdHJva2VXaWR0aD1cIjEuNzVcIlxuICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcbiAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgPC9idXR0b24+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LWgtWzkydmhdIG1heC13LVs5MnZ3XSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiIG9uQ2xpY2s9eyhldmVudCkgPT4gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCl9PlxuICAgICAgICB7YnVzeSA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS0xMDBcIj5cbiAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XG4gICAgICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IGVycm9yID8gKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1yb3NlLTIwMFwiPntlcnJvcn08L3A+XG4gICAgICAgICkgOiBpbWFnZVVybCA/IChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZSBtYXgtaC1bOTB2aF0gbWF4LXctWzkydnddIG92ZXJmbG93LWhpZGRlbiByb3VuZGVkLWxnIHRvdWNoLW5vbmVcIlxuICAgICAgICAgICAgb25Qb2ludGVyRG93bj17b25Qb2ludGVyRG93bn1cbiAgICAgICAgICAgIG9uUG9pbnRlck1vdmU9e29uUG9pbnRlck1vdmV9XG4gICAgICAgICAgICBvblBvaW50ZXJVcD17b25Qb2ludGVyRW5kfVxuICAgICAgICAgICAgb25Qb2ludGVyQ2FuY2VsPXtvblBvaW50ZXJFbmR9XG4gICAgICAgICAgICBvbldoZWVsPXtvbldoZWVsfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgc3JjPXtpbWFnZVVybH1cbiAgICAgICAgICAgICAgYWx0PXtpbWFnZUFsdCB8fCBpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXRcIil9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInBvaW50ZXItZXZlbnRzLW5vbmUgbWF4LWgtWzkwdmhdIHctYXV0byBtYXgtdy1bOTJ2d10gc2VsZWN0LW5vbmUgcm91bmRlZC1sZyBvYmplY3QtY29udGFpbiBzaGFkb3ctMnhsXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgke3RyYW5zbGF0ZS54fXB4LCAke3RyYW5zbGF0ZS55fXB4LCAwKSBzY2FsZSgke3NjYWxlfSlgLFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybU9yaWdpbjogXCJjZW50ZXIgY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogc2NhbGUgPD0gMSA/IFwidHJhbnNmb3JtIDE0MG1zIGVhc2Utb3V0XCIgOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgZHJhZ2dhYmxlPXtmYWxzZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXNsYXRlLTEwMFwiPntpbmRUKFwiQ29tbW9uX05vdEF2YWlsYWJsZVwiLCBcIk4vQVwiKX08L3A+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj4sXG4gICAgZG9jdW1lbnQuYm9keVxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbDtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsZ0JBQXlFOzs7QUNpR2pFO0FBeEZSLElBQU0sMkJBQTJCLENBQUMsVUFBMkI7QUFDM0QsUUFBTSxhQUFhLFNBQVMsS0FBSyxFQUFFLFlBQVk7QUFDL0MsTUFBSSxDQUFDLFdBQVksUUFBTztBQUN4QixNQUFJLGVBQWUsT0FBTyxlQUFlLElBQUssUUFBTztBQUNyRCxNQUFJLGVBQWUsU0FBUyxlQUFlLEtBQU0sUUFBTztBQUN4RCxTQUFPO0FBQ1Q7QUFFQSxJQUFNLG1CQUFtQixvQkFBSSxJQUFZLENBQUMsT0FBTyxRQUFRLE9BQU8sUUFBUSxPQUFPLE9BQU8sUUFBUSxRQUFRLE1BQU0sQ0FBQztBQUU3RyxJQUFNLDJCQUEyQixDQUFDLFVBQTBCO0FBQzFELFFBQU0sU0FBUyxTQUFTLEtBQUssRUFBRSxZQUFZO0FBQzNDLE1BQUksQ0FBQyxPQUFRLFFBQU87QUFFcEIsUUFBTSxlQUFlLE9BQU8sTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDdEQsUUFBTSxRQUFRLGFBQWEsTUFBTSxHQUFHO0FBQ3BDLE1BQUksTUFBTSxTQUFTLEVBQUcsUUFBTztBQUU3QixRQUFNLFNBQVMsU0FBUyxNQUFNLE1BQU0sU0FBUyxDQUFDLENBQUMsRUFBRSxRQUFRLGNBQWMsRUFBRTtBQUN6RSxT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SUFBUztBQUFBLElBRW5FLENBQUMsYUFBYSxDQUFDLGdCQUFnQixTQUM5Qiw4RUFDRTtBQUFBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQztBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0EsMEJBQTBCO0FBQUEsVUFDMUIsd0JBQXdCO0FBQUEsVUFDeEIsMkJBQTJCO0FBQUEsVUFDM0Isd0JBQXdCO0FBQUEsVUFDeEIsWUFBWTtBQUFBLFVBQ1osb0JBQW9CLGtCQUFrQixTQUFZO0FBQUE7QUFBQSxNQUNwRDtBQUFBLE1BQ0E7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBLGNBQWMsWUFBWSxvQkFBb0IsU0FBUyxPQUFPLFlBQVk7QUFBQSxVQUMxRTtBQUFBLFVBQ0EsY0FBYztBQUFBLFVBQ2Qsa0JBQWtCO0FBQUEsVUFDbEIsWUFBWTtBQUFBO0FBQUEsTUFDZDtBQUFBLE1BQ0EsNkNBQUMsU0FBSSxXQUFVLDBCQUEwQixrQkFBTztBQUFBLE9BQ2xELElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFHQSxJQUFNLDBCQUEwQixNQUFNO0FBQ3BDLFNBQ0UsNkNBQUMsZ0NBQXFCLHlCQUF1QixNQUMzQyx1REFBQyxrQ0FBK0IsR0FDbEM7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLDBCQUF3QjtBQUN4QixRQUFNLFNBQVMsU0FBUyxlQUFlLDRCQUE0QjtBQUNuRSxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLDJCQUF3QixDQUFFO0FBQ3REO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxrQ0FBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIm5leHRUcmFuc2xhdGUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
