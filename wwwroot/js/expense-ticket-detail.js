import {
  SingleDatePicker
} from "./chunks/chunk-AS4EE5L2.js";
import {
  getExpenseTicketStatusLabel
} from "./chunks/chunk-YK25Q5RF.js";
import {
  mapWindowEnumOptions
} from "./chunks/chunk-BVPBMOU4.js";
import {
  mapExpenseTicketDetailHeader,
  mapExpenseTicketDetailLine
} from "./chunks/chunk-BUASLBT5.js";
import {
  ExpenseTimelineCard_default
} from "./chunks/chunk-6FHEKASQ.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-XULPHUDU.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-I3FZBW7M.js";
import "./chunks/chunk-6YXFJB4W.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-HEQ4OZHC.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-MC6PU3KM.js";
import "./chunks/chunk-K7MECJ5E.js";
import {
  configureExpenseApiAuth,
  deleteExpenseSheetTicket,
  fetchExpenseSheetTicket,
  formatAmountWithCurrency,
  formatExpenseDisplayDate,
  formatExpenseInputNumber,
  formatExpenseNumber,
  navigateToExpenseUrl,
  parseExpenseNumericInput,
  safeText,
  updateExpenseSheetTicket
} from "./chunks/chunk-ZZ3K4DA3.js";
import {
  VisitasPageProviders_default
} from "./chunks/chunk-EVHUYAZN.js";
import {
  ApiFetchError,
  canAccess,
  indT,
  showPermissionModal
} from "./chunks/chunk-U25S3E2U.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/gastos/tickets/detail/ExpenseTicketDetailPage.tsx
var import_react3 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/components/ExpenseTicketDetailHeaderForm.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ExpenseTicketDetailHeaderForm = ({
  header,
  statusLabel,
  gastoTypeLabel,
  processedByAiLabel,
  totalAmountText,
  transDateText,
  isEditing,
  statusOptions,
  gastoTypeOptions,
  processedByAiOptions,
  draftDescription,
  draftStatus,
  draftGastoType,
  draftProcessedByAI,
  draftCurrencyCode,
  draftTotalAmount,
  draftTransDate,
  draftComentario,
  draftUrlFile,
  draftFileName,
  onDraftDescriptionChange,
  onDraftStatusChange,
  onDraftGastoTypeChange,
  onDraftProcessedByAIChange,
  onDraftCurrencyCodeChange,
  onDraftTotalAmountChange,
  onDraftTransDateChange,
  onDraftComentarioChange,
  onDraftUrlFileChange,
  onDraftFileNameChange,
  onOpenFile
}) => {
  const canOpenFile = !!safeText(isEditing ? draftUrlFile : header.urlFile);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "space-y-0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseSectionDivider_default, { label: indT("Tickets_Detail_Header", "Header"), className: "expense-section-divider--spaced" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-2xl", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ExpenseReadOnlyField_default,
          {
            label: indT("Tickets_Field_FileId", "Ticket"),
            value: header.fileId || "-"
          }
        ),
        isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          SelectCombobox_default,
          {
            label: indT("Tickets_Field_Status", "Status"),
            options: statusOptions,
            value: draftStatus,
            onChange: onDraftStatusChange,
            placeholder: indT("Tickets_Field_Status", "Status"),
            usePortal: false,
            allowTextInput: false,
            showSearchButton: false
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
        isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          SelectCombobox_default,
          {
            label: indT("Tickets_Filter_ProcessedByIA", "Processed by IA"),
            options: processedByAiOptions,
            value: draftProcessedByAI,
            onChange: onDraftProcessedByAIChange,
            placeholder: indT("Tickets_Filter_ProcessedByIA", "Processed by IA"),
            usePortal: false,
            allowTextInput: false,
            showSearchButton: false
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ExpenseReadOnlyField_default,
          {
            label: indT("Tickets_Filter_ProcessedByIA", "Processed by IA"),
            value: processedByAiLabel || "-"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ExpenseReadOnlyField_default,
          {
            label: indT("Tickets_Field_ExpenseSheetDisplay", "Expense sheet"),
            value: header.hojaGastosIdDisplay || "-"
          }
        ),
        isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_Currency", "Currency") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              className: "form-control",
              value: draftCurrencyCode,
              onChange: (event) => onDraftCurrencyCodeChange((event.target.value || "").toUpperCase()),
              maxLength: 8,
              "aria-label": indT("ExpenseSheets_Field_Currency", "Currency")
            }
          )
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ExpenseReadOnlyField_default,
          {
            label: indT("ExpenseSheets_Field_Currency", "Currency"),
            value: header.currencyCode || "-"
          }
        ),
        isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_TotalAmount", "Total amount") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              className: "form-control",
              type: "text",
              inputMode: "decimal",
              value: draftTotalAmount,
              onChange: (event) => onDraftTotalAmountChange(event.target.value || ""),
              onBlur: (event) => onDraftTotalAmountChange(
                formatExpenseInputNumber(event.target.value, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                  fallback: ""
                })
              ),
              "aria-label": indT("ExpenseSheets_Field_TotalAmount", "Total amount")
            }
          )
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ExpenseReadOnlyField_default,
          {
            label: indT("ExpenseSheets_Field_UserId", "User"),
            value: header.createdByUserId || "-"
          }
        ),
        isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sm:col-span-2 space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("Visits_Field_Comments", "Comments") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "textarea",
            {
              className: "form-control min-h-[84px]",
              value: draftComentario,
              onChange: (event) => onDraftComentarioChange(event.target.value || ""),
              "aria-label": indT("Visits_Field_Comments", "Comments")
            }
          )
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ExpenseReadOnlyField_default,
          {
            label: indT("Visits_Field_Comments", "Comments"),
            value: header.comentario || "-",
            fullWidth: true
          }
        ),
        isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sm:col-span-2 space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("Common_Link", "Link") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              className: "form-control",
              value: draftUrlFile,
              onChange: (event) => onDraftUrlFileChange(event.target.value || ""),
              "aria-label": indT("Common_Link", "Link")
            }
          )
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ExpenseReadOnlyField_default,
          {
            label: indT("Common_Link", "Link"),
            value: safeText(header.urlFile) || "-",
            fullWidth: true
          }
        ),
        isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "sm:col-span-2 space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", children: indT("AudioRecorder_Download_FileName", "File name") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "input",
            {
              className: "form-control",
              value: draftFileName,
              onChange: (event) => onDraftFileNameChange(event.target.value || ""),
              "aria-label": indT("AudioRecorder_Download_FileName", "File name")
            }
          )
        ] }) : null
      ] }),
      canOpenFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex justify-end", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          type: "button",
          className: "ind-action-btn px-3 py-1.5 text-xs",
          onClick: onOpenFile,
          children: safeText(isEditing ? draftFileName : header.fileName) || header.fileId || indT("Tickets_Field_FileId", "Ticket")
        }
      ) }) : null
    ] })
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
      const subtitle = [
        `${indT("ExpenseSheets_Field_LineId", "Line")}: ${line.recId || "-"}`,
        `${indT("ExpenseSheets_Field_Qty", "Quantity")}: ${qtyText}`,
        `${indT("ExpenseSheets_Field_Price", "Price")}: ${priceText}`,
        `${indT("ExpenseSheets_Field_SheetId", "Sheet")}: ${line.refRecIdTable || "-"}`,
        `${indT("ExpenseSheets_Field_UserId", "User")}: ${line.createdByUserId || "-"}`
      ].join("   ");
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "timeline-item", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        ExpenseTimelineCard_default,
        {
          dateParts: EMPTY_DATE_PARTS,
          title,
          subtitle,
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
  (0, import_react.useEffect)(() => {
    const loadDetail = async () => {
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
    };
    void loadDetail();
  }, [fileId, hasAccess, onForbidden]);
  return {
    header,
    lines,
    isLoading,
    errorMessage
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
var parseOptionalBoolean = (raw) => {
  const value = String(raw || "").trim().toLowerCase();
  if (!value) return void 0;
  if (value === "true") return true;
  if (value === "false") return false;
  return void 0;
};
var resolveTicketFileExtension = (fileName, urlFile) => {
  const source = String(fileName || "").trim() || String(urlFile || "").trim();
  const match = source.match(/\.([a-zA-Z0-9]{1,10})(?:$|[?#])/);
  if (!match || !match[1]) return void 0;
  return match[1].toLowerCase();
};
var useExpenseTicketDetailMutations = ({
  busy,
  isEditing,
  canEditTicket,
  canDeleteTicket,
  fileId,
  draftDescription,
  draftStatus,
  draftGastoType,
  draftProcessedByAI,
  draftCurrencyCode,
  draftTotalAmount,
  draftTransDate,
  draftComentario,
  draftUrlFile,
  draftFileName,
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
    const parsedTotalAmount = parseDecimalInput(draftTotalAmount);
    if (parsedTotalAmount === null || parsedTotalAmount < 0) {
      const message = indT("ExpenseSheets_Line_Validation_AmountQty", "Quantity and price must be greater than 0.");
      setModalError(message);
      setStatus(message);
      return false;
    }
    const parsedStatus = parseOptionalInteger(draftStatus);
    if (parsedStatus !== void 0 && parsedStatus !== 0 && parsedStatus !== 1) {
      const message = indT("Api_RequestFailed", "Request failed.");
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
    const payload = {
      description: normalizedDescription,
      currencyCode: normalizedCurrency,
      totalAmount: Number(parsedTotalAmount),
      status: parsedStatus,
      transDate: String(draftTransDate || "").trim() || void 0,
      comentario: String(draftComentario || "").trim() || void 0,
      urlFile: String(draftUrlFile || "").trim() || void 0,
      fileName: String(draftFileName || "").trim() || void 0,
      processedByAI: parseOptionalBoolean(draftProcessedByAI),
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
    draftProcessedByAI,
    draftStatus,
    draftTotalAmount,
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
        const response = await deleteExpenseSheetTicket(fileId);
        if (!response.Success) {
          throw new Error(response.Message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed."));
        }
        setStatus(indT("ExpenseSheets_Detail_Deleted", "Expense sheet deleted"));
        return true;
      }
    });
    return result.ok;
  }, [busy, canDeleteTicket, fileId, setBusy, setModalError, setStatus]);
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
  canEditTicket,
  canDeleteTicket,
  fileId,
  setModalError,
  handleEnableEdit,
  handleCancelEdit,
  handleUpdate,
  handleDelete,
  onSaveSuccess,
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
    isLocked: false,
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
    onDeleteSuccess: () => {
      navigateToExpenseUrl("/Gastos/Tickets");
    },
    openConfirm,
    closeConfirm
  });
};

// Web/wwwroot/react/src/pages/gastos/tickets/detail/ExpenseTicketDetailPage.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
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
  const hasAccess = canAccess("GASTOS_TICKETS", "View");
  const canEditTicket = canAccess("GASTOS_TICKETS", "Edit");
  const canDeleteTicket = canAccess("GASTOS_TICKETS", "FullAccess");
  const fileId = safeText(window.__EXPENSE_TICKET_FILE_ID__);
  const lineContainerRef = (0, import_react3.useRef)(null);
  const [busy, setBusy] = (0, import_react3.useState)(false);
  const [status, setStatus] = (0, import_react3.useState)("");
  const [isEditing, setIsEditing] = (0, import_react3.useState)(false);
  const [modalError, setModalError] = (0, import_react3.useState)("");
  const [linePage, setLinePage] = (0, import_react3.useState)(1);
  const [draftDescription, setDraftDescription] = (0, import_react3.useState)("");
  const [draftStatus, setDraftStatus] = (0, import_react3.useState)("0");
  const [draftGastoType, setDraftGastoType] = (0, import_react3.useState)("");
  const [draftProcessedByAI, setDraftProcessedByAI] = (0, import_react3.useState)("");
  const [draftCurrencyCode, setDraftCurrencyCode] = (0, import_react3.useState)("");
  const [draftTotalAmount, setDraftTotalAmount] = (0, import_react3.useState)("");
  const [draftTransDate, setDraftTransDate] = (0, import_react3.useState)("");
  const [draftComentario, setDraftComentario] = (0, import_react3.useState)("");
  const [draftUrlFile, setDraftUrlFile] = (0, import_react3.useState)("");
  const [draftFileName, setDraftFileName] = (0, import_react3.useState)("");
  const paginationLabels = (0, import_react3.useMemo)(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last")
    }),
    []
  );
  const gastoTypeOptions = (0, import_react3.useMemo)(() => {
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
  const gastoTypeLabelMap = (0, import_react3.useMemo)(() => {
    const map = /* @__PURE__ */ new Map();
    for (const option of gastoTypeOptions) {
      map.set(String(option.value), option.text);
    }
    return map;
  }, [gastoTypeOptions]);
  const statusOptions = (0, import_react3.useMemo)(
    () => [
      { value: "0", text: indT("Tickets_Filter_Status_Pending", "Pending") },
      { value: "1", text: indT("Tickets_Filter_Status_Assigned", "Assigned") }
    ],
    []
  );
  const processedByAiOptions = (0, import_react3.useMemo)(
    () => [
      { value: "true", text: indT("Tickets_Filter_ProcessedByIA_Yes", "Yes") },
      { value: "false", text: indT("Tickets_Filter_ProcessedByIA_No", "No") }
    ],
    []
  );
  const { modal, openConfirm, closeConfirm, handleConfirm } = useConfirmDialog({
    defaultConfirmText: indT("Confirm_Yes", "OK"),
    defaultCancelText: indT("Confirm_No", "Cancel")
  });
  const { header, lines, isLoading, errorMessage } = useExpenseTicketDetailState({
    hasAccess,
    fileId,
    onForbidden: showPermissionModal
  });
  (0, import_react3.useEffect)(() => {
    if (isEditing || !header) return;
    setDraftDescription(safeText(header.description));
    setDraftStatus(header.status === 1 ? "1" : "0");
    setDraftGastoType(header.gastoType === null ? "" : String(header.gastoType));
    setDraftProcessedByAI(header.processedByAI === true ? "true" : header.processedByAI === false ? "false" : "false");
    setDraftCurrencyCode(safeText(header.currencyCode).toUpperCase());
    setDraftTotalAmount(
      formatExpenseInputNumber(header.totalAmount, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
        fallback: ""
      })
    );
    setDraftTransDate(safeText(header.transDate));
    setDraftComentario(safeText(header.comentario));
    setDraftUrlFile(safeText(header.urlFile));
    setDraftFileName(safeText(header.fileName));
  }, [header, isEditing]);
  (0, import_react3.useEffect)(() => {
    const maxPage = Math.max(1, Math.ceil(lines.length / LINES_PAGE_SIZE));
    if (linePage > maxPage) {
      setLinePage(maxPage);
    }
  }, [linePage, lines.length]);
  const visibleLines = (0, import_react3.useMemo)(() => pagedSlice(lines, linePage, LINES_PAGE_SIZE), [linePage, lines]);
  const totalLinePages = Math.ceil((lines.length || 0) / LINES_PAGE_SIZE);
  const handleEnableEdit = (0, import_react3.useCallback)(() => {
    if (!header || isLoading) return;
    if (!canEditTicket) {
      showPermissionModal();
      return;
    }
    setModalError("");
    setIsEditing(true);
    setStatus(indT("ExpenseSheets_Detail_EditingEnabled", "Editing enabled"));
  }, [canEditTicket, header, isLoading]);
  const handleCancelEdit = (0, import_react3.useCallback)(() => {
    if (!isEditing) return;
    if (!header) {
      setIsEditing(false);
      return;
    }
    setIsEditing(false);
    setModalError("");
    setDraftDescription(safeText(header.description));
    setDraftStatus(header.status === 1 ? "1" : "0");
    setDraftGastoType(header.gastoType === null ? "" : String(header.gastoType));
    setDraftProcessedByAI(header.processedByAI === true ? "true" : header.processedByAI === false ? "false" : "false");
    setDraftCurrencyCode(safeText(header.currencyCode).toUpperCase());
    setDraftTotalAmount(
      formatExpenseInputNumber(header.totalAmount, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
        fallback: ""
      })
    );
    setDraftTransDate(safeText(header.transDate));
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
    draftStatus,
    draftGastoType,
    draftProcessedByAI,
    draftCurrencyCode,
    draftTotalAmount,
    draftTransDate,
    draftComentario,
    draftUrlFile,
    draftFileName,
    setModalError,
    setBusy,
    setStatus,
    setIsEditing
  });
  const handleModalConfirm = (0, import_react3.useCallback)(async () => {
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
  const handleModalButtonConfirm = (0, import_react3.useCallback)(() => {
    if (!busy && modalError) {
      closeConfirm();
      return;
    }
    void handleModalConfirm();
  }, [busy, closeConfirm, handleModalConfirm, modalError]);
  useExpenseTicketDetailTopbarActions({
    busy,
    modalOpen: modal.open,
    isEditing,
    canEditTicket,
    canDeleteTicket,
    fileId,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
    handleUpdate,
    handleDelete,
    onSaveSuccess: () => {
      window.location.reload();
    },
    openConfirm,
    closeConfirm
  });
  const openLineDetail = (0, import_react3.useCallback)(
    (rawLineRecId) => {
      const lineRecId = safeText(rawLineRecId);
      if (!lineRecId) return;
      if (!fileId) return;
      const targetUrl = `/Gastos/TicketLineDetail?fileId=${encodeURIComponent(fileId)}&lineRecId=${encodeURIComponent(lineRecId)}`;
      navigateToExpenseUrl(targetUrl, {
        askConfirmation: true,
        bypassGuardOnce: false
      });
    },
    [fileId]
  );
  const resolveClickableCard = (0, import_react3.useCallback)((target) => {
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
  const openFile = (0, import_react3.useCallback)(() => {
    const currentUrl = safeText(isEditing ? draftUrlFile : header?.urlFile);
    if (!currentUrl) return;
    window.open(currentUrl, "_blank", "noopener,noreferrer");
  }, [draftUrlFile, header?.urlFile, isEditing]);
  const statusLabel = (0, import_react3.useMemo)(() => getExpenseTicketStatusLabel(isEditing ? draftStatus : header?.status), [draftStatus, header?.status, isEditing]);
  const gastoTypeLabel = (0, import_react3.useMemo)(() => {
    const currentGastoType = isEditing ? draftGastoType : header?.gastoType === null ? "" : String(header?.gastoType ?? "");
    if (!currentGastoType) {
      return indT("Common_NotAvailable", "N/A");
    }
    return gastoTypeLabelMap.get(String(currentGastoType)) || String(currentGastoType);
  }, [draftGastoType, gastoTypeLabelMap, header?.gastoType, isEditing]);
  const processedByAiLabel = (0, import_react3.useMemo)(() => {
    const value = isEditing ? draftProcessedByAI : header?.processedByAI === true ? "true" : header?.processedByAI === false ? "false" : "";
    if (value === "true") return indT("Tickets_Filter_ProcessedByIA_Yes", "Yes");
    if (value === "false") return indT("Tickets_Filter_ProcessedByIA_No", "No");
    return indT("Common_NotAvailable", "N/A");
  }, [draftProcessedByAI, header?.processedByAI, isEditing]);
  const totalAmountText = (0, import_react3.useMemo)(() => {
    if (isEditing) {
      const parsed = parseExpenseNumericInput(draftTotalAmount);
      return formatAmountWithCurrency(parsed, draftCurrencyCode || header?.currencyCode);
    }
    return formatAmountWithCurrency(header?.totalAmount ?? null, header?.currencyCode);
  }, [draftCurrencyCode, draftTotalAmount, header?.currencyCode, header?.totalAmount, isEditing]);
  const transDateText = (0, import_react3.useMemo)(
    () => formatExpenseDisplayDate(isEditing ? draftTransDate : header?.transDate, document?.documentElement?.lang || "es-ES"),
    [draftTransDate, header?.transDate, isEditing]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      "div",
      {
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700",
        style: { display: isLoading ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ]
      }
    ),
    errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-danger", children: errorMessage }) : null,
    !isLoading && !errorMessage && header ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        ExpenseTicketDetailHeaderForm_default,
        {
          header,
          statusLabel,
          gastoTypeLabel,
          processedByAiLabel,
          totalAmountText,
          transDateText,
          isEditing,
          statusOptions,
          gastoTypeOptions,
          processedByAiOptions,
          draftDescription,
          draftStatus,
          draftGastoType,
          draftProcessedByAI,
          draftCurrencyCode,
          draftTotalAmount,
          draftTransDate,
          draftComentario,
          draftUrlFile,
          draftFileName,
          onDraftDescriptionChange: setDraftDescription,
          onDraftStatusChange: setDraftStatus,
          onDraftGastoTypeChange: setDraftGastoType,
          onDraftProcessedByAIChange: setDraftProcessedByAI,
          onDraftCurrencyCodeChange: setDraftCurrencyCode,
          onDraftTotalAmountChange: setDraftTotalAmount,
          onDraftTransDateChange: setDraftTransDate,
          onDraftComentarioChange: setDraftComentario,
          onDraftUrlFileChange: setDraftUrlFile,
          onDraftFileNameChange: setDraftFileName,
          onOpenFile: openFile
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-sm text-slate-600", children: status })
    ] }) : null
  ] });
};
var ExpenseTicketDetailPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(VisitasPageProviders_default, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ExpenseTicketDetailPageContent, {}) });
};
var mount = () => {
  bootstrapExpenseApiAuth();
  const rootEl = document.getElementById("expense-ticket-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ExpenseTicketDetailPage, {}));
};
mountWhenDocumentReady(mount);
var ExpenseTicketDetailPage_default = ExpenseTicketDetailPage;
export {
  ExpenseTicketDetailPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldExpbmVzTGlzdC50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSBcIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4XCI7XG5pbXBvcnQgeyB1c2VUaW1lbGluZUNhcmRFZmZlY3RzIH0gZnJvbSBcIi4uLy4uLy4uLy4uL2hvb2tzL3VzZVRpbWVsaW5lQ2FyZEVmZmVjdHMudHNcIjtcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm0gZnJvbSBcIi4uLy4uL2NvbXBvbmVudHMvRXhwZW5zZVRpY2tldERldGFpbEhlYWRlckZvcm0udHN4XCI7XG5pbXBvcnQgRXhwZW5zZVRpY2tldExpbmVzTGlzdCBmcm9tIFwiLi4vLi4vY29tcG9uZW50cy9FeHBlbnNlVGlja2V0TGluZXNMaXN0LnRzeFwiO1xuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uLy4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlVGlja2V0U3RhdHVzTGFiZWwgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzL2V4cGVuc2VUaWNrZXRTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgeyBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuaW1wb3J0IHsgbWFwV2luZG93RW51bU9wdGlvbnMsIHR5cGUgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyLCBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbFN0YXRlIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbFN0YXRlLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9ucy50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9ucy50c1wiO1xuXG5jb25zdCBBTExPV0VEX0dBU1RPX1RZUEVTID0gbmV3IFNldDxudW1iZXI+KFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxNF0pO1xuY29uc3QgTElORVNfUEFHRV9TSVpFID0gNjtcblxuY29uc3QgR0FTVE9fVFlQRV9MQUJFTF9LRVlTOiBSZWNvcmQ8bnVtYmVyLCB7IGtleTogc3RyaW5nOyBmYWxsYmFjazogc3RyaW5nIH0+ID0ge1xuICAwOiB7IGtleTogXCJFbnVtX05vbmVcIiwgZmFsbGJhY2s6IFwiTm9uZVwiIH0sXG4gIDE6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1BlYWplXCIsIGZhbGxiYWNrOiBcIlBlYWplXCIgfSxcbiAgMjogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfUGFya2luZ1wiLCBmYWxsYmFjazogXCJQYXJraW5nXCIgfSxcbiAgMzogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfS21cIiwgZmFsbGJhY2s6IFwiS21cIiB9LFxuICA0OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9EZXNheXVub1wiLCBmYWxsYmFjazogXCJEZXNheXVub1wiIH0sXG4gIDU6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX0NvbWlkYVwiLCBmYWxsYmFjazogXCJDb21pZGFcIiB9LFxuICA2OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9DZW5hXCIsIGZhbGxiYWNrOiBcIkNlbmFcIiB9LFxuICA3OiB7IGtleTogXCJFbnVtX0dhc3RvVHlwZV9Ib3RlbFwiLCBmYWxsYmFjazogXCJIb3RlbFwiIH0sXG4gIDg6IHsga2V5OiBcIkVudW1fR2FzdG9UeXBlX1Zhcmlvc1wiLCBmYWxsYmFjazogXCJWYXJpb3NcIiB9LFxuICAxNDogeyBrZXk6IFwiRW51bV9HYXN0b1R5cGVfVGF4aVwiLCBmYWxsYmFjazogXCJUYXhpXCIgfSxcbn07XG5cbmNvbnN0IHBhZ2VkU2xpY2UgPSA8VCw+KGl0ZW1zOiBUW10sIHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcik6IFRbXSA9PiB7XG4gIGlmICghaXRlbXMubGVuZ3RoKSByZXR1cm4gW107XG4gIGNvbnN0IHNhZmVQYWdlID0gTWF0aC5tYXgoMSwgcGFnZSk7XG4gIGNvbnN0IHN0YXJ0ID0gKHNhZmVQYWdlIC0gMSkgKiBwYWdlU2l6ZTtcbiAgcmV0dXJuIGl0ZW1zLnNsaWNlKHN0YXJ0LCBzdGFydCArIHBhZ2VTaXplKTtcbn07XG5cbi8vIEluaXRpYWxpemVzIGF1dGggc2VlZCBmb3IgZXhwZW5zZSBBUEkgY2FsbHMgYmVmb3JlIGlzbGFuZCBlZmZlY3RzIHJ1bi5cbmNvbnN0IGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoID0gKCkgPT4ge1xuICBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCh7XG4gICAgdG9rZW46IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXG4gICAgYXBwQ29kZTogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxuICB9KTtcbn07XG5cbmNvbnN0IGJ1aWxkRmFsbGJhY2tHYXN0b1R5cGVPcHRpb25zID0gKCk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XG4gIHJldHVybiBPYmplY3QuZW50cmllcyhHQVNUT19UWVBFX0xBQkVMX0tFWVMpXG4gICAgLm1hcCgoW2NvZGUsIGNmZ10pID0+ICh7XG4gICAgICB2YWx1ZTogU3RyaW5nKGNvZGUpLFxuICAgICAgdGV4dDogaW5kVChjZmcua2V5LCBjZmcuZmFsbGJhY2spLFxuICAgIH0pKVxuICAgIC5zb3J0KChsZWZ0LCByaWdodCkgPT4gTnVtYmVyKGxlZnQudmFsdWUpIC0gTnVtYmVyKHJpZ2h0LnZhbHVlKSk7XG59O1xuXG5jb25zdCBFeHBlbnNlVGlja2V0RGV0YWlsUGFnZUNvbnRlbnQgPSAoKSA9PiB7XG4gIGNvbnN0IGhhc0FjY2VzcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19USUNLRVRTXCIsIFwiVmlld1wiKTtcbiAgY29uc3QgY2FuRWRpdFRpY2tldCA9IGNhbkFjY2VzcyhcIkdBU1RPU19USUNLRVRTXCIsIFwiRWRpdFwiKTtcbiAgY29uc3QgY2FuRGVsZXRlVGlja2V0ID0gY2FuQWNjZXNzKFwiR0FTVE9TX1RJQ0tFVFNcIiwgXCJGdWxsQWNjZXNzXCIpO1xuICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1RJQ0tFVF9GSUxFX0lEX18pO1xuICBjb25zdCBsaW5lQ29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtpc0VkaXRpbmcsIHNldElzRWRpdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFttb2RhbEVycm9yLCBzZXRNb2RhbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbbGluZVBhZ2UsIHNldExpbmVQYWdlXSA9IHVzZVN0YXRlKDEpO1xuXG4gIGNvbnN0IFtkcmFmdERlc2NyaXB0aW9uLCBzZXREcmFmdERlc2NyaXB0aW9uXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRTdGF0dXMsIHNldERyYWZ0U3RhdHVzXSA9IHVzZVN0YXRlKFwiMFwiKTtcbiAgY29uc3QgW2RyYWZ0R2FzdG9UeXBlLCBzZXREcmFmdEdhc3RvVHlwZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0UHJvY2Vzc2VkQnlBSSwgc2V0RHJhZnRQcm9jZXNzZWRCeUFJXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRDdXJyZW5jeUNvZGUsIHNldERyYWZ0Q3VycmVuY3lDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRUb3RhbEFtb3VudCwgc2V0RHJhZnRUb3RhbEFtb3VudF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0VHJhbnNEYXRlLCBzZXREcmFmdFRyYW5zRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0Q29tZW50YXJpbywgc2V0RHJhZnRDb21lbnRhcmlvXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRVcmxGaWxlLCBzZXREcmFmdFVybEZpbGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdEZpbGVOYW1lLCBzZXREcmFmdEZpbGVOYW1lXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIGNvbnN0IHBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxuICAgICgpID0+ICh7XG4gICAgICBmaXJzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9GaXJzdFwiLCBcIkZpcnN0XCIpLFxuICAgICAgcHJldjogaW5kVChcIkhpc3RvcnlfUGFnZV9QcmV2XCIsIFwiUHJldmlvdXNcIiksXG4gICAgICBuZXh0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX05leHRcIiwgXCJOZXh0XCIpLFxuICAgICAgbGFzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9MYXN0XCIsIFwiTGFzdFwiKSxcbiAgICB9KSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IGdhc3RvVHlwZU9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oKCkgPT4ge1xuICAgIGNvbnN0IHNvdXJjZSA9IEFycmF5LmlzQXJyYXkod2luZG93Ll9fRVhQRU5TRV9HQVNUT19UWVBFU19fKSA/IHdpbmRvdy5fX0VYUEVOU0VfR0FTVE9fVFlQRVNfXyA6IFtdO1xuICAgIGNvbnN0IG1hcHBlZCA9IG1hcFdpbmRvd0VudW1PcHRpb25zKHNvdXJjZSkuZmlsdGVyKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgcGFyc2VkID0gTnVtYmVyKGVudHJ5LnZhbHVlKTtcbiAgICAgIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgJiYgQUxMT1dFRF9HQVNUT19UWVBFUy5oYXMocGFyc2VkKTtcbiAgICB9KTtcblxuICAgIGlmIChtYXBwZWQubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIG1hcHBlZC5zb3J0KChsZWZ0LCByaWdodCkgPT4gTnVtYmVyKGxlZnQudmFsdWUpIC0gTnVtYmVyKHJpZ2h0LnZhbHVlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJ1aWxkRmFsbGJhY2tHYXN0b1R5cGVPcHRpb25zKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBnYXN0b1R5cGVMYWJlbE1hcCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgZ2FzdG9UeXBlT3B0aW9ucykge1xuICAgICAgbWFwLnNldChTdHJpbmcob3B0aW9uLnZhbHVlKSwgb3B0aW9uLnRleHQpO1xuICAgIH1cbiAgICByZXR1cm4gbWFwO1xuICB9LCBbZ2FzdG9UeXBlT3B0aW9uc10pO1xuXG4gIGNvbnN0IHN0YXR1c09wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oXG4gICAgKCkgPT4gW1xuICAgICAgeyB2YWx1ZTogXCIwXCIsIHRleHQ6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9TdGF0dXNfUGVuZGluZ1wiLCBcIlBlbmRpbmdcIikgfSxcbiAgICAgIHsgdmFsdWU6IFwiMVwiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfU3RhdHVzX0Fzc2lnbmVkXCIsIFwiQXNzaWduZWRcIikgfSxcbiAgICBdLFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgcHJvY2Vzc2VkQnlBaU9wdGlvbnMgPSB1c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oXG4gICAgKCkgPT4gW1xuICAgICAgeyB2YWx1ZTogXCJ0cnVlXCIsIHRleHQ6IGluZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBX1llc1wiLCBcIlllc1wiKSB9LFxuICAgICAgeyB2YWx1ZTogXCJmYWxzZVwiLCB0ZXh0OiBpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQV9Ob1wiLCBcIk5vXCIpIH0sXG4gICAgXSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IHsgbW9kYWwsIG9wZW5Db25maXJtLCBjbG9zZUNvbmZpcm0sIGhhbmRsZUNvbmZpcm0gfSA9IHVzZUNvbmZpcm1EaWFsb2coe1xuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXG4gICAgZGVmYXVsdENhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpLFxuICB9KTtcblxuICBjb25zdCB7IGhlYWRlciwgbGluZXMsIGlzTG9hZGluZywgZXJyb3JNZXNzYWdlIH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUoe1xuICAgIGhhc0FjY2VzcyxcbiAgICBmaWxlSWQsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gIH0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzRWRpdGluZyB8fCAhaGVhZGVyKSByZXR1cm47XG5cbiAgICBzZXREcmFmdERlc2NyaXB0aW9uKHNhZmVUZXh0KGhlYWRlci5kZXNjcmlwdGlvbikpO1xuICAgIHNldERyYWZ0U3RhdHVzKGhlYWRlci5zdGF0dXMgPT09IDEgPyBcIjFcIiA6IFwiMFwiKTtcbiAgICBzZXREcmFmdEdhc3RvVHlwZShoZWFkZXIuZ2FzdG9UeXBlID09PSBudWxsID8gXCJcIiA6IFN0cmluZyhoZWFkZXIuZ2FzdG9UeXBlKSk7XG4gICAgc2V0RHJhZnRQcm9jZXNzZWRCeUFJKGhlYWRlci5wcm9jZXNzZWRCeUFJID09PSB0cnVlID8gXCJ0cnVlXCIgOiBoZWFkZXIucHJvY2Vzc2VkQnlBSSA9PT0gZmFsc2UgPyBcImZhbHNlXCIgOiBcImZhbHNlXCIpO1xuICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlKHNhZmVUZXh0KGhlYWRlci5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCkpO1xuICAgIHNldERyYWZ0VG90YWxBbW91bnQoXG4gICAgICBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIoaGVhZGVyLnRvdGFsQW1vdW50LCB7XG4gICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICAgICAgZmFsbGJhY2s6IFwiXCIsXG4gICAgICB9KVxuICAgICk7XG4gICAgc2V0RHJhZnRUcmFuc0RhdGUoc2FmZVRleHQoaGVhZGVyLnRyYW5zRGF0ZSkpO1xuICAgIHNldERyYWZ0Q29tZW50YXJpbyhzYWZlVGV4dChoZWFkZXIuY29tZW50YXJpbykpO1xuICAgIHNldERyYWZ0VXJsRmlsZShzYWZlVGV4dChoZWFkZXIudXJsRmlsZSkpO1xuICAgIHNldERyYWZ0RmlsZU5hbWUoc2FmZVRleHQoaGVhZGVyLmZpbGVOYW1lKSk7XG4gIH0sIFtoZWFkZXIsIGlzRWRpdGluZ10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbWF4UGFnZSA9IE1hdGgubWF4KDEsIE1hdGguY2VpbChsaW5lcy5sZW5ndGggLyBMSU5FU19QQUdFX1NJWkUpKTtcbiAgICBpZiAobGluZVBhZ2UgPiBtYXhQYWdlKSB7XG4gICAgICBzZXRMaW5lUGFnZShtYXhQYWdlKTtcbiAgICB9XG4gIH0sIFtsaW5lUGFnZSwgbGluZXMubGVuZ3RoXSk7XG5cbiAgY29uc3QgdmlzaWJsZUxpbmVzID0gdXNlTWVtbygoKSA9PiBwYWdlZFNsaWNlKGxpbmVzLCBsaW5lUGFnZSwgTElORVNfUEFHRV9TSVpFKSwgW2xpbmVQYWdlLCBsaW5lc10pO1xuICBjb25zdCB0b3RhbExpbmVQYWdlcyA9IE1hdGguY2VpbCgobGluZXMubGVuZ3RoIHx8IDApIC8gTElORVNfUEFHRV9TSVpFKTtcblxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghaGVhZGVyIHx8IGlzTG9hZGluZykgcmV0dXJuO1xuICAgIGlmICghY2FuRWRpdFRpY2tldCkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgc2V0SXNFZGl0aW5nKHRydWUpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRWRpdGluZ0VuYWJsZWRcIiwgXCJFZGl0aW5nIGVuYWJsZWRcIikpO1xuICB9LCBbY2FuRWRpdFRpY2tldCwgaGVhZGVyLCBpc0xvYWRpbmddKTtcblxuICBjb25zdCBoYW5kbGVDYW5jZWxFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghaXNFZGl0aW5nKSByZXR1cm47XG4gICAgaWYgKCFoZWFkZXIpIHtcbiAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgIHNldERyYWZ0RGVzY3JpcHRpb24oc2FmZVRleHQoaGVhZGVyLmRlc2NyaXB0aW9uKSk7XG4gICAgc2V0RHJhZnRTdGF0dXMoaGVhZGVyLnN0YXR1cyA9PT0gMSA/IFwiMVwiIDogXCIwXCIpO1xuICAgIHNldERyYWZ0R2FzdG9UeXBlKGhlYWRlci5nYXN0b1R5cGUgPT09IG51bGwgPyBcIlwiIDogU3RyaW5nKGhlYWRlci5nYXN0b1R5cGUpKTtcbiAgICBzZXREcmFmdFByb2Nlc3NlZEJ5QUkoaGVhZGVyLnByb2Nlc3NlZEJ5QUkgPT09IHRydWUgPyBcInRydWVcIiA6IGhlYWRlci5wcm9jZXNzZWRCeUFJID09PSBmYWxzZSA/IFwiZmFsc2VcIiA6IFwiZmFsc2VcIik7XG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUoc2FmZVRleHQoaGVhZGVyLmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSk7XG4gICAgc2V0RHJhZnRUb3RhbEFtb3VudChcbiAgICAgIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcihoZWFkZXIudG90YWxBbW91bnQsIHtcbiAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgICAgICBmYWxsYmFjazogXCJcIixcbiAgICAgIH0pXG4gICAgKTtcbiAgICBzZXREcmFmdFRyYW5zRGF0ZShzYWZlVGV4dChoZWFkZXIudHJhbnNEYXRlKSk7XG4gICAgc2V0RHJhZnRDb21lbnRhcmlvKHNhZmVUZXh0KGhlYWRlci5jb21lbnRhcmlvKSk7XG4gICAgc2V0RHJhZnRVcmxGaWxlKHNhZmVUZXh0KGhlYWRlci51cmxGaWxlKSk7XG4gICAgc2V0RHJhZnRGaWxlTmFtZShzYWZlVGV4dChoZWFkZXIuZmlsZU5hbWUpKTtcbiAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIikpO1xuICB9LCBbaGVhZGVyLCBpc0VkaXRpbmddKTtcblxuICBjb25zdCB7IGhhbmRsZVVwZGF0ZSwgaGFuZGxlRGVsZXRlIH0gPSB1c2VFeHBlbnNlVGlja2V0RGV0YWlsTXV0YXRpb25zKHtcbiAgICBidXN5LFxuICAgIGlzRWRpdGluZyxcbiAgICBjYW5FZGl0VGlja2V0LFxuICAgIGNhbkRlbGV0ZVRpY2tldCxcbiAgICBmaWxlSWQsXG4gICAgZHJhZnREZXNjcmlwdGlvbixcbiAgICBkcmFmdFN0YXR1cyxcbiAgICBkcmFmdEdhc3RvVHlwZSxcbiAgICBkcmFmdFByb2Nlc3NlZEJ5QUksXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgZHJhZnRUb3RhbEFtb3VudCxcbiAgICBkcmFmdFRyYW5zRGF0ZSxcbiAgICBkcmFmdENvbWVudGFyaW8sXG4gICAgZHJhZnRVcmxGaWxlLFxuICAgIGRyYWZ0RmlsZU5hbWUsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBzZXRCdXN5LFxuICAgIHNldFN0YXR1cyxcbiAgICBzZXRJc0VkaXRpbmcsXG4gIH0pO1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xuICAgICAgYnVzeSxcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xuICAgICAgICBzZXRTdGF0dXMobXNnKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtXSk7XG5cbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIik7XG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBidXN5XG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XG4gICAgOiAhYnVzeSAmJiBtb2RhbEVycm9yXG4gICAgICA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKVxuICAgICAgOiBtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKTtcblxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2b2lkIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xuICB9LCBbYnVzeSwgY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm0sIG1vZGFsRXJyb3JdKTtcblxuICB1c2VFeHBlbnNlVGlja2V0RGV0YWlsVG9wYmFyQWN0aW9ucyh7XG4gICAgYnVzeSxcbiAgICBtb2RhbE9wZW46IG1vZGFsLm9wZW4sXG4gICAgaXNFZGl0aW5nLFxuICAgIGNhbkVkaXRUaWNrZXQsXG4gICAgY2FuRGVsZXRlVGlja2V0LFxuICAgIGZpbGVJZCxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVVcGRhdGUsXG4gICAgaGFuZGxlRGVsZXRlLFxuICAgIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9LFxuICAgIG9wZW5Db25maXJtLFxuICAgIGNsb3NlQ29uZmlybSxcbiAgfSk7XG5cbiAgY29uc3Qgb3BlbkxpbmVEZXRhaWwgPSB1c2VDYWxsYmFjayhcbiAgICAocmF3TGluZVJlY0lkOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGxpbmVSZWNJZCA9IHNhZmVUZXh0KHJhd0xpbmVSZWNJZCk7XG4gICAgICBpZiAoIWxpbmVSZWNJZCkgcmV0dXJuO1xuICAgICAgaWYgKCFmaWxlSWQpIHJldHVybjtcblxuICAgICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvVGlja2V0TGluZURldGFpbD9maWxlSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoZmlsZUlkKX0mbGluZVJlY0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGxpbmVSZWNJZCl9YDtcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCwge1xuICAgICAgICBhc2tDb25maXJtYXRpb246IHRydWUsXG4gICAgICAgIGJ5cGFzc0d1YXJkT25jZTogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtmaWxlSWRdXG4gICk7XG5cbiAgY29uc3QgcmVzb2x2ZUNsaWNrYWJsZUNhcmQgPSB1c2VDYWxsYmFjaygodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IHtcbiAgICBjb25zdCBub2RlID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBjYXJkID0gbm9kZS5jbG9zZXN0PEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIik7XG4gICAgaWYgKCFjYXJkKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIWxpbmVDb250YWluZXJSZWYuY3VycmVudD8uY29udGFpbnMoY2FyZCkpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBjYXJkO1xuICB9LCBbXSk7XG5cbiAgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyh7XG4gICAgY29udGFpbmVyUmVmOiBsaW5lQ29udGFpbmVyUmVmLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBpdGVtczogdmlzaWJsZUxpbmVzLFxuICAgIHJlc29sdmVDbGlja2FibGVDYXJkLFxuICB9KTtcblxuICBjb25zdCBvcGVuRmlsZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBjdXJyZW50VXJsID0gc2FmZVRleHQoaXNFZGl0aW5nID8gZHJhZnRVcmxGaWxlIDogaGVhZGVyPy51cmxGaWxlKTtcbiAgICBpZiAoIWN1cnJlbnRVcmwpIHJldHVybjtcbiAgICB3aW5kb3cub3BlbihjdXJyZW50VXJsLCBcIl9ibGFua1wiLCBcIm5vb3BlbmVyLG5vcmVmZXJyZXJcIik7XG4gIH0sIFtkcmFmdFVybEZpbGUsIGhlYWRlcj8udXJsRmlsZSwgaXNFZGl0aW5nXSk7XG5cbiAgY29uc3Qgc3RhdHVzTGFiZWwgPSB1c2VNZW1vKCgpID0+IGdldEV4cGVuc2VUaWNrZXRTdGF0dXNMYWJlbChpc0VkaXRpbmcgPyBkcmFmdFN0YXR1cyA6IGhlYWRlcj8uc3RhdHVzKSwgW2RyYWZ0U3RhdHVzLCBoZWFkZXI/LnN0YXR1cywgaXNFZGl0aW5nXSk7XG4gIGNvbnN0IGdhc3RvVHlwZUxhYmVsID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgY3VycmVudEdhc3RvVHlwZSA9IGlzRWRpdGluZyA/IGRyYWZ0R2FzdG9UeXBlIDogaGVhZGVyPy5nYXN0b1R5cGUgPT09IG51bGwgPyBcIlwiIDogU3RyaW5nKGhlYWRlcj8uZ2FzdG9UeXBlID8/IFwiXCIpO1xuICAgIGlmICghY3VycmVudEdhc3RvVHlwZSkge1xuICAgICAgcmV0dXJuIGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xuICAgIH1cbiAgICByZXR1cm4gZ2FzdG9UeXBlTGFiZWxNYXAuZ2V0KFN0cmluZyhjdXJyZW50R2FzdG9UeXBlKSkgfHwgU3RyaW5nKGN1cnJlbnRHYXN0b1R5cGUpO1xuICB9LCBbZHJhZnRHYXN0b1R5cGUsIGdhc3RvVHlwZUxhYmVsTWFwLCBoZWFkZXI/Lmdhc3RvVHlwZSwgaXNFZGl0aW5nXSk7XG4gIGNvbnN0IHByb2Nlc3NlZEJ5QWlMYWJlbCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gaXNFZGl0aW5nID8gZHJhZnRQcm9jZXNzZWRCeUFJIDogaGVhZGVyPy5wcm9jZXNzZWRCeUFJID09PSB0cnVlID8gXCJ0cnVlXCIgOiBoZWFkZXI/LnByb2Nlc3NlZEJ5QUkgPT09IGZhbHNlID8gXCJmYWxzZVwiIDogXCJcIjtcbiAgICBpZiAodmFsdWUgPT09IFwidHJ1ZVwiKSByZXR1cm4gaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFfWWVzXCIsIFwiWWVzXCIpO1xuICAgIGlmICh2YWx1ZSA9PT0gXCJmYWxzZVwiKSByZXR1cm4gaW5kVChcIlRpY2tldHNfRmlsdGVyX1Byb2Nlc3NlZEJ5SUFfTm9cIiwgXCJOb1wiKTtcbiAgICByZXR1cm4gaW5kVChcIkNvbW1vbl9Ob3RBdmFpbGFibGVcIiwgXCJOL0FcIik7XG4gIH0sIFtkcmFmdFByb2Nlc3NlZEJ5QUksIGhlYWRlcj8ucHJvY2Vzc2VkQnlBSSwgaXNFZGl0aW5nXSk7XG4gIGNvbnN0IHRvdGFsQW1vdW50VGV4dCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmIChpc0VkaXRpbmcpIHtcbiAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dChkcmFmdFRvdGFsQW1vdW50KTtcbiAgICAgIHJldHVybiBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kocGFyc2VkLCBkcmFmdEN1cnJlbmN5Q29kZSB8fCBoZWFkZXI/LmN1cnJlbmN5Q29kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShoZWFkZXI/LnRvdGFsQW1vdW50ID8/IG51bGwsIGhlYWRlcj8uY3VycmVuY3lDb2RlKTtcbiAgfSwgW2RyYWZ0Q3VycmVuY3lDb2RlLCBkcmFmdFRvdGFsQW1vdW50LCBoZWFkZXI/LmN1cnJlbmN5Q29kZSwgaGVhZGVyPy50b3RhbEFtb3VudCwgaXNFZGl0aW5nXSk7XG4gIGNvbnN0IHRyYW5zRGF0ZVRleHQgPSB1c2VNZW1vKFxuICAgICgpID0+IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShpc0VkaXRpbmcgPyBkcmFmdFRyYW5zRGF0ZSA6IGhlYWRlcj8udHJhbnNEYXRlLCBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIiksXG4gICAgW2RyYWZ0VHJhbnNEYXRlLCBoZWFkZXI/LnRyYW5zRGF0ZSwgaXNFZGl0aW5nXVxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgIDxDb25maXJtTW9kYWxcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cbiAgICAgICAgdGl0bGU9e21vZGFsLnRpdGxlfVxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cbiAgICAgICAgY2FuY2VsVGV4dD17bW9kYWxDYW5jZWxUZXh0fVxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cbiAgICAgICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxuICAgICAgICBidXN5PXtidXN5fVxuICAgICAgICBlcnJvcj17bW9kYWxFcnJvcn1cbiAgICAgICAgc3RhdHVzPXtzdGF0dXN9XG4gICAgICAgIG9uQ29uZmlybT17aGFuZGxlTW9kYWxCdXR0b25Db25maXJtfVxuICAgICAgICBvbkNhbmNlbD17Y2xvc2VDb25maXJtfVxuICAgICAgLz5cblxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIlxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBpc0xvYWRpbmcgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XG4gICAgICA+XG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7ZXJyb3JNZXNzYWdlID8gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntlcnJvck1lc3NhZ2V9PC9kaXY+IDogbnVsbH1cblxuICAgICAgeyFpc0xvYWRpbmcgJiYgIWVycm9yTWVzc2FnZSAmJiBoZWFkZXIgPyAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtXG4gICAgICAgICAgICBoZWFkZXI9e2hlYWRlcn1cbiAgICAgICAgICAgIHN0YXR1c0xhYmVsPXtzdGF0dXNMYWJlbH1cbiAgICAgICAgICAgIGdhc3RvVHlwZUxhYmVsPXtnYXN0b1R5cGVMYWJlbH1cbiAgICAgICAgICAgIHByb2Nlc3NlZEJ5QWlMYWJlbD17cHJvY2Vzc2VkQnlBaUxhYmVsfVxuICAgICAgICAgICAgdG90YWxBbW91bnRUZXh0PXt0b3RhbEFtb3VudFRleHR9XG4gICAgICAgICAgICB0cmFuc0RhdGVUZXh0PXt0cmFuc0RhdGVUZXh0fVxuICAgICAgICAgICAgaXNFZGl0aW5nPXtpc0VkaXRpbmd9XG4gICAgICAgICAgICBzdGF0dXNPcHRpb25zPXtzdGF0dXNPcHRpb25zfVxuICAgICAgICAgICAgZ2FzdG9UeXBlT3B0aW9ucz17Z2FzdG9UeXBlT3B0aW9uc31cbiAgICAgICAgICAgIHByb2Nlc3NlZEJ5QWlPcHRpb25zPXtwcm9jZXNzZWRCeUFpT3B0aW9uc31cbiAgICAgICAgICAgIGRyYWZ0RGVzY3JpcHRpb249e2RyYWZ0RGVzY3JpcHRpb259XG4gICAgICAgICAgICBkcmFmdFN0YXR1cz17ZHJhZnRTdGF0dXN9XG4gICAgICAgICAgICBkcmFmdEdhc3RvVHlwZT17ZHJhZnRHYXN0b1R5cGV9XG4gICAgICAgICAgICBkcmFmdFByb2Nlc3NlZEJ5QUk9e2RyYWZ0UHJvY2Vzc2VkQnlBSX1cbiAgICAgICAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlPXtkcmFmdEN1cnJlbmN5Q29kZX1cbiAgICAgICAgICAgIGRyYWZ0VG90YWxBbW91bnQ9e2RyYWZ0VG90YWxBbW91bnR9XG4gICAgICAgICAgICBkcmFmdFRyYW5zRGF0ZT17ZHJhZnRUcmFuc0RhdGV9XG4gICAgICAgICAgICBkcmFmdENvbWVudGFyaW89e2RyYWZ0Q29tZW50YXJpb31cbiAgICAgICAgICAgIGRyYWZ0VXJsRmlsZT17ZHJhZnRVcmxGaWxlfVxuICAgICAgICAgICAgZHJhZnRGaWxlTmFtZT17ZHJhZnRGaWxlTmFtZX1cbiAgICAgICAgICAgIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZT17c2V0RHJhZnREZXNjcmlwdGlvbn1cbiAgICAgICAgICAgIG9uRHJhZnRTdGF0dXNDaGFuZ2U9e3NldERyYWZ0U3RhdHVzfVxuICAgICAgICAgICAgb25EcmFmdEdhc3RvVHlwZUNoYW5nZT17c2V0RHJhZnRHYXN0b1R5cGV9XG4gICAgICAgICAgICBvbkRyYWZ0UHJvY2Vzc2VkQnlBSUNoYW5nZT17c2V0RHJhZnRQcm9jZXNzZWRCeUFJfVxuICAgICAgICAgICAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZT17c2V0RHJhZnRDdXJyZW5jeUNvZGV9XG4gICAgICAgICAgICBvbkRyYWZ0VG90YWxBbW91bnRDaGFuZ2U9e3NldERyYWZ0VG90YWxBbW91bnR9XG4gICAgICAgICAgICBvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlPXtzZXREcmFmdFRyYW5zRGF0ZX1cbiAgICAgICAgICAgIG9uRHJhZnRDb21lbnRhcmlvQ2hhbmdlPXtzZXREcmFmdENvbWVudGFyaW99XG4gICAgICAgICAgICBvbkRyYWZ0VXJsRmlsZUNoYW5nZT17c2V0RHJhZnRVcmxGaWxlfVxuICAgICAgICAgICAgb25EcmFmdEZpbGVOYW1lQ2hhbmdlPXtzZXREcmFmdEZpbGVOYW1lfVxuICAgICAgICAgICAgb25PcGVuRmlsZT17b3BlbkZpbGV9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8RXhwZW5zZVRpY2tldExpbmVzTGlzdFxuICAgICAgICAgICAgdmlzaWJsZUxpbmVzPXt2aXNpYmxlTGluZXN9XG4gICAgICAgICAgICB0b3RhbExpbmVQYWdlcz17dG90YWxMaW5lUGFnZXN9XG4gICAgICAgICAgICBsaW5lUGFnZT17bGluZVBhZ2V9XG4gICAgICAgICAgICBjdXJyZW5jeUNvZGU9e2lzRWRpdGluZyA/IGRyYWZ0Q3VycmVuY3lDb2RlIDogc2FmZVRleHQoaGVhZGVyLmN1cnJlbmN5Q29kZSl9XG4gICAgICAgICAgICBwYWdpbmF0aW9uTGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxuICAgICAgICAgICAgY29udGFpbmVyUmVmPXtsaW5lQ29udGFpbmVyUmVmfVxuICAgICAgICAgICAgb25MaW5lUGFnZUNoYW5nZT17c2V0TGluZVBhZ2V9XG4gICAgICAgICAgICBvbk9wZW5MaW5lPXtvcGVuTGluZURldGFpbH1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPntzdGF0dXN9PC9kaXY+XG4gICAgICAgIDwvPlxuICAgICAgKSA6IG51bGx9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2UgdGlja2V0IGRldGFpbC5cbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgICAgIDxFeHBlbnNlVGlja2V0RGV0YWlsUGFnZUNvbnRlbnQgLz5cbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxuICApO1xufTtcblxuY29uc3QgbW91bnQgPSAoKSA9PiB7XG4gIGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoKCk7XG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS10aWNrZXQtZGV0YWlsLXJvb3RcIik7XG4gIGlmICghcm9vdEVsKSByZXR1cm47XG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVRpY2tldERldGFpbFBhZ2UgLz4pO1xufTtcblxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXREZXRhaWxQYWdlO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgU2luZ2xlRGF0ZVBpY2tlciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NpbmdsZURhdGVQaWNrZXIudHN4XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyIH0gZnJvbSBcIi4uL3RpY2tldHMvZGV0YWlsL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcbmltcG9ydCBFeHBlbnNlUmVhZE9ubHlGaWVsZCBmcm9tIFwiLi9FeHBlbnNlUmVhZE9ubHlGaWVsZC50c3hcIjtcbmltcG9ydCBFeHBlbnNlU2VjdGlvbkRpdmlkZXIgZnJvbSBcIi4vRXhwZW5zZVNlY3Rpb25EaXZpZGVyLnRzeFwiO1xuXG50eXBlIEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtUHJvcHMgPSB7XG4gIGhlYWRlcjogRXhwZW5zZVRpY2tldERldGFpbEhlYWRlcjtcbiAgc3RhdHVzTGFiZWw6IHN0cmluZztcbiAgZ2FzdG9UeXBlTGFiZWw6IHN0cmluZztcbiAgcHJvY2Vzc2VkQnlBaUxhYmVsOiBzdHJpbmc7XG4gIHRvdGFsQW1vdW50VGV4dDogc3RyaW5nO1xuICB0cmFuc0RhdGVUZXh0OiBzdHJpbmc7XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgc3RhdHVzT3B0aW9uczogRXhwZW5zZVNlbGVjdE9wdGlvbltdO1xuICBnYXN0b1R5cGVPcHRpb25zOiBFeHBlbnNlU2VsZWN0T3B0aW9uW107XG4gIHByb2Nlc3NlZEJ5QWlPcHRpb25zOiBFeHBlbnNlU2VsZWN0T3B0aW9uW107XG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcbiAgZHJhZnRTdGF0dXM6IHN0cmluZztcbiAgZHJhZnRHYXN0b1R5cGU6IHN0cmluZztcbiAgZHJhZnRQcm9jZXNzZWRCeUFJOiBzdHJpbmc7XG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGRyYWZ0VG90YWxBbW91bnQ6IHN0cmluZztcbiAgZHJhZnRUcmFuc0RhdGU6IHN0cmluZztcbiAgZHJhZnRDb21lbnRhcmlvOiBzdHJpbmc7XG4gIGRyYWZ0VXJsRmlsZTogc3RyaW5nO1xuICBkcmFmdEZpbGVOYW1lOiBzdHJpbmc7XG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRTdGF0dXNDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdFByb2Nlc3NlZEJ5QUlDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdFRvdGFsQW1vdW50Q2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdFRyYW5zRGF0ZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRDb21lbnRhcmlvQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdFVybEZpbGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0RmlsZU5hbWVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbk9wZW5GaWxlOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gUmVhZC1vbmx5IGFuZCBlZGl0YWJsZSBoZWFkZXIgZm9ybSBmb3IgdGlja2V0IGRldGFpbC5cbmNvbnN0IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtID0gKHtcbiAgaGVhZGVyLFxuICBzdGF0dXNMYWJlbCxcbiAgZ2FzdG9UeXBlTGFiZWwsXG4gIHByb2Nlc3NlZEJ5QWlMYWJlbCxcbiAgdG90YWxBbW91bnRUZXh0LFxuICB0cmFuc0RhdGVUZXh0LFxuICBpc0VkaXRpbmcsXG4gIHN0YXR1c09wdGlvbnMsXG4gIGdhc3RvVHlwZU9wdGlvbnMsXG4gIHByb2Nlc3NlZEJ5QWlPcHRpb25zLFxuICBkcmFmdERlc2NyaXB0aW9uLFxuICBkcmFmdFN0YXR1cyxcbiAgZHJhZnRHYXN0b1R5cGUsXG4gIGRyYWZ0UHJvY2Vzc2VkQnlBSSxcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gIGRyYWZ0VG90YWxBbW91bnQsXG4gIGRyYWZ0VHJhbnNEYXRlLFxuICBkcmFmdENvbWVudGFyaW8sXG4gIGRyYWZ0VXJsRmlsZSxcbiAgZHJhZnRGaWxlTmFtZSxcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlLFxuICBvbkRyYWZ0U3RhdHVzQ2hhbmdlLFxuICBvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlLFxuICBvbkRyYWZ0UHJvY2Vzc2VkQnlBSUNoYW5nZSxcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZSxcbiAgb25EcmFmdFRvdGFsQW1vdW50Q2hhbmdlLFxuICBvbkRyYWZ0VHJhbnNEYXRlQ2hhbmdlLFxuICBvbkRyYWZ0Q29tZW50YXJpb0NoYW5nZSxcbiAgb25EcmFmdFVybEZpbGVDaGFuZ2UsXG4gIG9uRHJhZnRGaWxlTmFtZUNoYW5nZSxcbiAgb25PcGVuRmlsZSxcbn06IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXJGb3JtUHJvcHMpID0+IHtcbiAgY29uc3QgY2FuT3BlbkZpbGUgPSAhIXNhZmVUZXh0KGlzRWRpdGluZyA/IGRyYWZ0VXJsRmlsZSA6IGhlYWRlci51cmxGaWxlKTtcblxuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNwYWNlLXktMFwiPlxuICAgICAgPEV4cGVuc2VTZWN0aW9uRGl2aWRlciBsYWJlbD17aW5kVChcIlRpY2tldHNfRGV0YWlsX0hlYWRlclwiLCBcIkhlYWRlclwiKX0gY2xhc3NOYW1lPVwiZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXItLXNwYWNlZFwiIC8+XG5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInJlbGF0aXZlIHNoYWRvdy14cyBnbGFzcy1wYW5lbCBwLTQgc3BhY2UteS00IGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiPlxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpZWxkX0ZpbGVJZFwiLCBcIlRpY2tldFwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtoZWFkZXIuZmlsZUlkIHx8IFwiLVwifVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxuICAgICAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWVsZF9TdGF0dXNcIiwgXCJTdGF0dXNcIil9XG4gICAgICAgICAgICAgIG9wdGlvbnM9e3N0YXR1c09wdGlvbnN9XG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFN0YXR1c31cbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRTdGF0dXNDaGFuZ2V9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiVGlja2V0c19GaWVsZF9TdGF0dXNcIiwgXCJTdGF0dXNcIil9XG4gICAgICAgICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XG4gICAgICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpZWxkX1N0YXR1c1wiLCBcIlN0YXR1c1wiKX1cbiAgICAgICAgICAgICAgdmFsdWU9e3N0YXR1c0xhYmVsIHx8IFwiLVwifVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9PC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnREZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxuICAgICAgICAgICAgICB2YWx1ZT17aGVhZGVyLmRlc2NyaXB0aW9uIHx8IFwiLVwifVxuICAgICAgICAgICAgICBmdWxsV2lkdGhcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHtpc0VkaXRpbmcgPyAoXG4gICAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxuICAgICAgICAgICAgICBvcHRpb25zPXtnYXN0b1R5cGVPcHRpb25zfVxuICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRHYXN0b1R5cGV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0R2FzdG9UeXBlQ2hhbmdlfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIlRpY2tldHNfRmlsdGVyX0NhdGVnb3J5XCIsIFwiQ2F0ZWdvcnlcIil9XG4gICAgICAgICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XG4gICAgICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9DYXRlZ29yeVwiLCBcIkNhdGVnb3J5XCIpfVxuICAgICAgICAgICAgICB2YWx1ZT17Z2FzdG9UeXBlTGFiZWwgfHwgXCItXCJ9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxuICAgICAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQVwiLCBcIlByb2Nlc3NlZCBieSBJQVwiKX1cbiAgICAgICAgICAgICAgb3B0aW9ucz17cHJvY2Vzc2VkQnlBaU9wdGlvbnN9XG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFByb2Nlc3NlZEJ5QUl9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0UHJvY2Vzc2VkQnlBSUNoYW5nZX1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJUaWNrZXRzX0ZpbHRlcl9Qcm9jZXNzZWRCeUlBXCIsIFwiUHJvY2Vzc2VkIGJ5IElBXCIpfVxuICAgICAgICAgICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxuICAgICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICAgICAgICAgIHNob3dTZWFyY2hCdXR0b249e2ZhbHNlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVGlja2V0c19GaWx0ZXJfUHJvY2Vzc2VkQnlJQVwiLCBcIlByb2Nlc3NlZCBieSBJQVwiKX1cbiAgICAgICAgICAgICAgdmFsdWU9e3Byb2Nlc3NlZEJ5QWlMYWJlbCB8fCBcIi1cIn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0ZpZWxkX0V4cGVuc2VTaGVldERpc3BsYXlcIiwgXCJFeHBlbnNlIHNoZWV0XCIpfVxuICAgICAgICAgICAgdmFsdWU9e2hlYWRlci5ob2phR2FzdG9zSWREaXNwbGF5IHx8IFwiLVwifVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9PC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRDdXJyZW5jeUNvZGV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZSgoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpLnRvVXBwZXJDYXNlKCkpfVxuICAgICAgICAgICAgICAgIG1heExlbmd0aD17OH1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cbiAgICAgICAgICAgICAgdmFsdWU9e2hlYWRlci5jdXJyZW5jeUNvZGUgfHwgXCItXCJ9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1RvdGFsQW1vdW50XCIsIFwiVG90YWwgYW1vdW50XCIpfTwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIGlucHV0TW9kZT1cImRlY2ltYWxcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFRvdGFsQW1vdW50fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnRUb3RhbEFtb3VudENoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XG4gICAgICAgICAgICAgICAgb25CbHVyPXsoZXZlbnQpID0+XG4gICAgICAgICAgICAgICAgICBvbkRyYWZ0VG90YWxBbW91bnRDaGFuZ2UoXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcihldmVudC50YXJnZXQudmFsdWUsIHtcbiAgICAgICAgICAgICAgICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgICAgICAgICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgICAgICAgICAgICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIGZhbGxiYWNrOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Ub3RhbEFtb3VudFwiLCBcIlRvdGFsIGFtb3VudFwiKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1RvdGFsQW1vdW50XCIsIFwiVG90YWwgYW1vdW50XCIpfVxuICAgICAgICAgICAgICB2YWx1ZT17dG90YWxBbW91bnRUZXh0IHx8IFwiLVwifVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmlzaXRhLWZpZWxkLXRleHRcIj5cbiAgICAgICAgICAgICAgPFNpbmdsZURhdGVQaWNrZXJcbiAgICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3JlYXRlZERhdGVcIiwgXCJEYXRlXCIpfVxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFRyYW5zRGF0ZX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdFRyYW5zRGF0ZUNoYW5nZX1cbiAgICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0NyZWF0ZWREYXRlXCIsIFwiRGF0ZVwiKX1cbiAgICAgICAgICAgICAgdmFsdWU9e3RyYW5zRGF0ZVRleHQgfHwgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGhlYWRlci50cmFuc0RhdGUsIGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiKSB8fCBcIi1cIn1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1VzZXJJZFwiLCBcIlVzZXJcIil9XG4gICAgICAgICAgICB2YWx1ZT17aGVhZGVyLmNyZWF0ZWRCeVVzZXJJZCB8fCBcIi1cIn1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJWaXNpdHNfRmllbGRfQ29tbWVudHNcIiwgXCJDb21tZW50c1wiKX08L2xhYmVsPlxuICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgbWluLWgtWzg0cHhdXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRDb21lbnRhcmlvfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnRDb21lbnRhcmlvQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKX1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbW1lbnRzXCIsIFwiQ29tbWVudHNcIil9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbW1lbnRzXCIsIFwiQ29tbWVudHNcIil9XG4gICAgICAgICAgICAgIHZhbHVlPXtoZWFkZXIuY29tZW50YXJpbyB8fCBcIi1cIn1cbiAgICAgICAgICAgICAgZnVsbFdpZHRoXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7aXNFZGl0aW5nID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbTpjb2wtc3Bhbi0yIHNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkNvbW1vbl9MaW5rXCIsIFwiTGlua1wiKX08L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdFVybEZpbGV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdFVybEZpbGVDaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTGlua1wiLCBcIkxpbmtcIil9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiQ29tbW9uX0xpbmtcIiwgXCJMaW5rXCIpfVxuICAgICAgICAgICAgICB2YWx1ZT17c2FmZVRleHQoaGVhZGVyLnVybEZpbGUpIHx8IFwiLVwifVxuICAgICAgICAgICAgICBmdWxsV2lkdGhcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHtpc0VkaXRpbmcgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNtOmNvbC1zcGFuLTIgc3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiQXVkaW9SZWNvcmRlcl9Eb3dubG9hZF9GaWxlTmFtZVwiLCBcIkZpbGUgbmFtZVwiKX08L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdEZpbGVOYW1lfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnRGaWxlTmFtZUNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkF1ZGlvUmVjb3JkZXJfRG93bmxvYWRfRmlsZU5hbWVcIiwgXCJGaWxlIG5hbWVcIil9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAge2Nhbk9wZW5GaWxlID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWVuZFwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gcHgtMyBweS0xLjUgdGV4dC14c1wiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uT3BlbkZpbGV9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtzYWZlVGV4dChpc0VkaXRpbmcgPyBkcmFmdEZpbGVOYW1lIDogaGVhZGVyLmZpbGVOYW1lKSB8fCBoZWFkZXIuZmlsZUlkIHx8IGluZFQoXCJUaWNrZXRzX0ZpZWxkX0ZpbGVJZFwiLCBcIlRpY2tldFwiKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvc2VjdGlvbj5cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyRm9ybTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBDb21wYWN0UGFnaW5hdGlvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbXBhY3RQYWdpbmF0aW9uLnRzeFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VEYXRlUGFydHMgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZU51bWJlciB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lIH0gZnJvbSBcIi4uL3RpY2tldHMvZGV0YWlsL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xuaW1wb3J0IEV4cGVuc2VTZWN0aW9uRGl2aWRlciBmcm9tIFwiLi9FeHBlbnNlU2VjdGlvbkRpdmlkZXIudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVRpbWVsaW5lQ2FyZCBmcm9tIFwiLi9FeHBlbnNlVGltZWxpbmVDYXJkLnRzeFwiO1xuXG50eXBlIFBhZ2luYXRpb25MYWJlbHMgPSB7XG4gIGZpcnN0OiBzdHJpbmc7XG4gIHByZXY6IHN0cmluZztcbiAgbmV4dDogc3RyaW5nO1xuICBsYXN0OiBzdHJpbmc7XG59O1xuXG50eXBlIEV4cGVuc2VUaWNrZXRMaW5lc0xpc3RQcm9wcyA9IHtcbiAgdmlzaWJsZUxpbmVzOiBFeHBlbnNlVGlja2V0RGV0YWlsTGluZVtdO1xuICB0b3RhbExpbmVQYWdlczogbnVtYmVyO1xuICBsaW5lUGFnZTogbnVtYmVyO1xuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgcGFnaW5hdGlvbkxhYmVsczogUGFnaW5hdGlvbkxhYmVscztcbiAgY29udGFpbmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcbiAgb25MaW5lUGFnZUNoYW5nZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcbiAgb25PcGVuTGluZTogKGxpbmVSZWNJZDogc3RyaW5nKSA9PiB2b2lkO1xufTtcblxuY29uc3QgZm9ybWF0UXR5VmFsdWUgPSAodmFsdWU6IG51bWJlciB8IG51bGwpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gZm9ybWF0RXhwZW5zZU51bWJlcih2YWx1ZSwge1xuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgZmFsbGJhY2s6IFwiLVwiLFxuICB9KTtcbn07XG5cbmNvbnN0IEVNUFRZX0RBVEVfUEFSVFM6IEV4cGVuc2VEYXRlUGFydHMgPSB7XG4gIHllYXI6IFwiLS1cIixcbiAgbW9udGg6IFwiLS1cIixcbiAgZGF5OiBcIi0tXCIsXG59O1xuXG4vLyBUaWNrZXQgbGluZXMgc2VjdGlvbiByZW5kZXJlZCB3aXRoIHRpbWVsaW5lIGNhcmRzIGFuZCBwYWdpbmcgY29udHJvbHMuXG5jb25zdCBFeHBlbnNlVGlja2V0TGluZXNMaXN0ID0gKHtcbiAgdmlzaWJsZUxpbmVzLFxuICB0b3RhbExpbmVQYWdlcyxcbiAgbGluZVBhZ2UsXG4gIGN1cnJlbmN5Q29kZSxcbiAgcGFnaW5hdGlvbkxhYmVscyxcbiAgY29udGFpbmVyUmVmLFxuICBvbkxpbmVQYWdlQ2hhbmdlLFxuICBvbk9wZW5MaW5lLFxufTogRXhwZW5zZVRpY2tldExpbmVzTGlzdFByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic3BhY2UteS0wXCI+XG4gICAgICA8RXhwZW5zZVNlY3Rpb25EaXZpZGVyIGxhYmVsPXtpbmRUKFwiVGlja2V0c19EZXRhaWxfTGluZXNcIiwgXCJMaW5lc1wiKX0gY2xhc3NOYW1lPVwiZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXItLXNwYWNlZFwiIC8+XG5cbiAgICAgIHt2aXNpYmxlTGluZXMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveCB0aW1lbGluZS1lbXB0eVwiIGRhdGEtZW1wdHktdGV4dD17aW5kVChcIlRpY2tldHNfRGV0YWlsX05vTGluZXNcIiwgXCJObyBsaW5lcyBmb3IgdGhpcyB0aWNrZXQuXCIpfSAvPlxuICAgICAgKSA6IChcbiAgICAgICAgPGRpdiByZWY9e2NvbnRhaW5lclJlZn0gY2xhc3NOYW1lPVwidGltZWxpbmUtYm94XCI+XG4gICAgICAgICAge3Zpc2libGVMaW5lcy5tYXAoKGxpbmUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhbW91bnRUZXh0ID0gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGxpbmUudG90YWxBbW91bnQsIGN1cnJlbmN5Q29kZSk7XG4gICAgICAgICAgICBjb25zdCBxdHlUZXh0ID0gZm9ybWF0UXR5VmFsdWUobGluZS5xdHkpO1xuICAgICAgICAgICAgY29uc3QgcHJpY2VUZXh0ID0gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGxpbmUucHJpY2UsIGN1cnJlbmN5Q29kZSk7XG4gICAgICAgICAgICBjb25zdCB0aXRsZSA9IGxpbmUuZGVzY3JpcHRpb24gfHwgbGluZS5yZWNJZCB8fCBcIi1cIjtcbiAgICAgICAgICAgIGNvbnN0IHN1YnRpdGxlID0gW1xuICAgICAgICAgICAgICBgJHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9MaW5lSWRcIiwgXCJMaW5lXCIpfTogJHtsaW5lLnJlY0lkIHx8IFwiLVwifWAsXG4gICAgICAgICAgICAgIGAke2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1F0eVwiLCBcIlF1YW50aXR5XCIpfTogJHtxdHlUZXh0fWAsXG4gICAgICAgICAgICAgIGAke2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1ByaWNlXCIsIFwiUHJpY2VcIil9OiAke3ByaWNlVGV4dH1gLFxuICAgICAgICAgICAgICBgJHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TaGVldElkXCIsIFwiU2hlZXRcIil9OiAke2xpbmUucmVmUmVjSWRUYWJsZSB8fCBcIi1cIn1gLFxuICAgICAgICAgICAgICBgJHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Vc2VySWRcIiwgXCJVc2VyXCIpfTogJHtsaW5lLmNyZWF0ZWRCeVVzZXJJZCB8fCBcIi1cIn1gLFxuICAgICAgICAgICAgXS5qb2luKFwiICAgXCIpO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17YCR7bGluZS5yZWNJZH0tJHtpbmRleH1gfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgPEV4cGVuc2VUaW1lbGluZUNhcmRcbiAgICAgICAgICAgICAgICAgIGRhdGVQYXJ0cz17RU1QVFlfREFURV9QQVJUU31cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgICAgICAgICAgIHN1YnRpdGxlPXtzdWJ0aXRsZX1cbiAgICAgICAgICAgICAgICAgIGFtb3VudFRleHQ9e2Ftb3VudFRleHR9XG4gICAgICAgICAgICAgICAgICBvbk9wZW49eygpID0+IG9uT3BlbkxpbmUobGluZS5yZWNJZCl9XG4gICAgICAgICAgICAgICAgICB0aXRsZUNsYXNzTmFtZT1cInRpbWVsaW5lLW5hbWUgZXhwZW5zZS1saW5lLWNhcmRfX3RpdGxlXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgPENvbXBhY3RQYWdpbmF0aW9uXG4gICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsTGluZVBhZ2VzfVxuICAgICAgICBjdXJyZW50UGFnZT17bGluZVBhZ2V9XG4gICAgICAgIG9uUGFnZUNoYW5nZT17b25MaW5lUGFnZUNoYW5nZX1cbiAgICAgICAgbGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxuICAgICAgLz5cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0TGluZXNMaXN0O1xyXG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxIZWFkZXIsIEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lIH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldERldGFpbFR5cGVzLnRzXCI7XG5pbXBvcnQgeyBtYXBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyLCBtYXBFeHBlbnNlVGlja2V0RGV0YWlsTGluZSB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xuXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZUFyZ3MgPSB7XG4gIGhhc0FjY2VzczogYm9vbGVhbjtcbiAgZmlsZUlkOiBzdHJpbmc7XG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gT3ducyByZWFkIHN0YXRlIGFuZCBBUEkgbG9hZGluZyBiZWhhdmlvciBmb3IgdGhlIHRpY2tldCBkZXRhaWwgcGFnZS5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUgPSAoeyBoYXNBY2Nlc3MsIGZpbGVJZCwgb25Gb3JiaWRkZW4gfTogVXNlRXhwZW5zZVRpY2tldERldGFpbFN0YXRlQXJncykgPT4ge1xuICBjb25zdCBbaGVhZGVyLCBzZXRIZWFkZXJdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbGluZXMsIHNldExpbmVzXSA9IHVzZVN0YXRlPEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lW10+KFtdKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbG9hZERldGFpbCA9IGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghaGFzQWNjZXNzKSB7XG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc2FmZUZpbGVJZCA9IHNhZmVUZXh0KGZpbGVJZCk7XG4gICAgICBpZiAoIXNhZmVGaWxlSWQpIHtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJUaWNrZXRzX0RldGFpbF9Ob3RGb3VuZFwiLCBcIlRpY2tldCB3YXMgbm90IGZvdW5kLlwiKSk7XG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgc2V0TGluZXMoW10pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldChzYWZlRmlsZUlkLCB7XG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2U/Lk1lc3NhZ2UgfHwgaW5kVChcIlRpY2tldHNfRGV0YWlsX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldCBkZXRhaWwuXCIpKTtcbiAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgICAgc2V0TGluZXMoW10pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPVxuICAgICAgICAgIGl0ZW1zLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeT8uRmlsZUlkKS50b1VwcGVyQ2FzZSgpID09PSBzYWZlRmlsZUlkLnRvVXBwZXJDYXNlKCkpIHx8IGl0ZW1zWzBdIHx8IG51bGw7XG5cbiAgICAgICAgaWYgKCFzZWxlY3RlZCkge1xuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiVGlja2V0c19EZXRhaWxfTm90Rm91bmRcIiwgXCJUaWNrZXQgd2FzIG5vdCBmb3VuZC5cIikpO1xuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgICBzZXRMaW5lcyhbXSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWFwcGVkSGVhZGVyID0gbWFwRXhwZW5zZVRpY2tldERldGFpbEhlYWRlcihzZWxlY3RlZCk7XG4gICAgICAgIGNvbnN0IG1hcHBlZExpbmVzID0gKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWQuTGluZXMpID8gc2VsZWN0ZWQuTGluZXMgOiBbXSkubWFwKChsaW5lKSA9PlxuICAgICAgICAgIG1hcEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lKGxpbmUpXG4gICAgICAgICk7XG4gICAgICAgIHNldEhlYWRlcihtYXBwZWRIZWFkZXIpO1xuICAgICAgICBzZXRMaW5lcyhtYXBwZWRMaW5lcyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiVGlja2V0c19EZXRhaWxfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgdGlja2V0IGRldGFpbC5cIikpO1xuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgIHNldExpbmVzKFtdKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZvaWQgbG9hZERldGFpbCgpO1xuICB9LCBbZmlsZUlkLCBoYXNBY2Nlc3MsIG9uRm9yYmlkZGVuXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBoZWFkZXIsXG4gICAgbGluZXMsXG4gICAgaXNMb2FkaW5nLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdCB9IGZyb20gXCIuLi8uLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24sIHBhcnNlRGVjaW1hbElucHV0IH0gZnJvbSBcIi4uLy4uL2hvb2tzL2V4cGVuc2VNdXRhdGlvblV0aWxzLnRzXCI7XG5pbXBvcnQgeyBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXQsIHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9uc0FyZ3MgPSB7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgY2FuRWRpdFRpY2tldDogYm9vbGVhbjtcbiAgY2FuRGVsZXRlVGlja2V0OiBib29sZWFuO1xuICBmaWxlSWQ6IHN0cmluZztcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xuICBkcmFmdFN0YXR1czogc3RyaW5nO1xuICBkcmFmdEdhc3RvVHlwZTogc3RyaW5nO1xuICBkcmFmdFByb2Nlc3NlZEJ5QUk6IHN0cmluZztcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgZHJhZnRUb3RhbEFtb3VudDogc3RyaW5nO1xuICBkcmFmdFRyYW5zRGF0ZTogc3RyaW5nO1xuICBkcmFmdENvbWVudGFyaW86IHN0cmluZztcbiAgZHJhZnRVcmxGaWxlOiBzdHJpbmc7XG4gIGRyYWZ0RmlsZU5hbWU6IHN0cmluZztcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldEJ1c3k6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG59O1xuXG5jb25zdCBwYXJzZU9wdGlvbmFsSW50ZWdlciA9IChyYXc6IHN0cmluZyk6IG51bWJlciB8IHVuZGVmaW5lZCA9PiB7XG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKHJhdyB8fCBcIlwiKS50cmltKCk7XG4gIGlmICghdmFsdWUpIHJldHVybiB1bmRlZmluZWQ7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlci5wYXJzZUludCh2YWx1ZSwgMTApO1xuICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpID8gcGFyc2VkIDogdW5kZWZpbmVkO1xufTtcblxuY29uc3QgcGFyc2VPcHRpb25hbEJvb2xlYW4gPSAocmF3OiBzdHJpbmcpOiBib29sZWFuIHwgdW5kZWZpbmVkID0+IHtcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcocmF3IHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoIXZhbHVlKSByZXR1cm4gdW5kZWZpbmVkO1xuICBpZiAodmFsdWUgPT09IFwidHJ1ZVwiKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKHZhbHVlID09PSBcImZhbHNlXCIpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG5cbi8vIFRyaWVzIHRvIGluZmVyIGEgc2FmZSBleHRlbnNpb24gZm9yIHVwZGF0ZSBwYXlsb2FkIGZyb20gZmlsZSBuYW1lIG9yIFVSTC5cbmNvbnN0IHJlc29sdmVUaWNrZXRGaWxlRXh0ZW5zaW9uID0gKGZpbGVOYW1lOiBzdHJpbmcsIHVybEZpbGU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XG4gIGNvbnN0IHNvdXJjZSA9IFN0cmluZyhmaWxlTmFtZSB8fCBcIlwiKS50cmltKCkgfHwgU3RyaW5nKHVybEZpbGUgfHwgXCJcIikudHJpbSgpO1xuICBjb25zdCBtYXRjaCA9IHNvdXJjZS5tYXRjaCgvXFwuKFthLXpBLVowLTldezEsMTB9KSg/OiR8Wz8jXSkvKTtcbiAgaWYgKCFtYXRjaCB8fCAhbWF0Y2hbMV0pIHJldHVybiB1bmRlZmluZWQ7XG4gIHJldHVybiBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xufTtcblxuLy8gRW5jYXBzdWxhdGVzIHVwZGF0ZSBhbmQgZGVsZXRlIG11dGF0aW9ucyBmb3IgdGlja2V0IGhlYWRlciBkZXRhaWwuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbE11dGF0aW9ucyA9ICh7XG4gIGJ1c3ksXG4gIGlzRWRpdGluZyxcbiAgY2FuRWRpdFRpY2tldCxcbiAgY2FuRGVsZXRlVGlja2V0LFxuICBmaWxlSWQsXG4gIGRyYWZ0RGVzY3JpcHRpb24sXG4gIGRyYWZ0U3RhdHVzLFxuICBkcmFmdEdhc3RvVHlwZSxcbiAgZHJhZnRQcm9jZXNzZWRCeUFJLFxuICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgZHJhZnRUb3RhbEFtb3VudCxcbiAgZHJhZnRUcmFuc0RhdGUsXG4gIGRyYWZ0Q29tZW50YXJpbyxcbiAgZHJhZnRVcmxGaWxlLFxuICBkcmFmdEZpbGVOYW1lLFxuICBzZXRNb2RhbEVycm9yLFxuICBzZXRCdXN5LFxuICBzZXRTdGF0dXMsXG4gIHNldElzRWRpdGluZyxcbn06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxNdXRhdGlvbnNBcmdzKSA9PiB7XG4gIGNvbnN0IGhhbmRsZVVwZGF0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoYnVzeSB8fCAhaXNFZGl0aW5nKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFjYW5FZGl0VGlja2V0KSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3Qgbm9ybWFsaXplZERlc2NyaXB0aW9uID0gU3RyaW5nKGRyYWZ0RGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpO1xuICAgIGlmICghbm9ybWFsaXplZERlc2NyaXB0aW9uKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9EZXNjcmlwdGlvblJlcXVpcmVkXCIsIFwiRGVzY3JpcHRpb24gaXMgcmVxdWlyZWQuXCIpO1xuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBub3JtYWxpemVkQ3VycmVuY3kgPSBTdHJpbmcoZHJhZnRDdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XG4gICAgaWYgKCFub3JtYWxpemVkQ3VycmVuY3kpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBpbmRUKFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0N1cnJlbmN5UmVxdWlyZWRcIiwgXCJDdXJyZW5jeSBpcyByZXF1aXJlZC5cIik7XG4gICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcnNlZFRvdGFsQW1vdW50ID0gcGFyc2VEZWNpbWFsSW5wdXQoZHJhZnRUb3RhbEFtb3VudCk7XG4gICAgaWYgKHBhcnNlZFRvdGFsQW1vdW50ID09PSBudWxsIHx8IHBhcnNlZFRvdGFsQW1vdW50IDwgMCkge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xpbmVfVmFsaWRhdGlvbl9BbW91bnRRdHlcIiwgXCJRdWFudGl0eSBhbmQgcHJpY2UgbXVzdCBiZSBncmVhdGVyIHRoYW4gMC5cIik7XG4gICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xuICAgICAgc2V0U3RhdHVzKG1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcnNlZFN0YXR1cyA9IHBhcnNlT3B0aW9uYWxJbnRlZ2VyKGRyYWZ0U3RhdHVzKTtcbiAgICBpZiAocGFyc2VkU3RhdHVzICE9PSB1bmRlZmluZWQgJiYgcGFyc2VkU3RhdHVzICE9PSAwICYmIHBhcnNlZFN0YXR1cyAhPT0gMSkge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKTtcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgcGFyc2VkR2FzdG9UeXBlID0gcGFyc2VPcHRpb25hbEludGVnZXIoZHJhZnRHYXN0b1R5cGUpO1xuICAgIGlmIChwYXJzZWRHYXN0b1R5cGUgIT09IHVuZGVmaW5lZCAmJiAhWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XS5pbmNsdWRlcyhwYXJzZWRHYXN0b1R5cGUpKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpO1xuICAgICAgc2V0TW9kYWxFcnJvcihtZXNzYWdlKTtcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0ID0ge1xuICAgICAgZGVzY3JpcHRpb246IG5vcm1hbGl6ZWREZXNjcmlwdGlvbixcbiAgICAgIGN1cnJlbmN5Q29kZTogbm9ybWFsaXplZEN1cnJlbmN5LFxuICAgICAgdG90YWxBbW91bnQ6IE51bWJlcihwYXJzZWRUb3RhbEFtb3VudCksXG4gICAgICBzdGF0dXM6IHBhcnNlZFN0YXR1cyxcbiAgICAgIHRyYW5zRGF0ZTogU3RyaW5nKGRyYWZ0VHJhbnNEYXRlIHx8IFwiXCIpLnRyaW0oKSB8fCB1bmRlZmluZWQsXG4gICAgICBjb21lbnRhcmlvOiBTdHJpbmcoZHJhZnRDb21lbnRhcmlvIHx8IFwiXCIpLnRyaW0oKSB8fCB1bmRlZmluZWQsXG4gICAgICB1cmxGaWxlOiBTdHJpbmcoZHJhZnRVcmxGaWxlIHx8IFwiXCIpLnRyaW0oKSB8fCB1bmRlZmluZWQsXG4gICAgICBmaWxlTmFtZTogU3RyaW5nKGRyYWZ0RmlsZU5hbWUgfHwgXCJcIikudHJpbSgpIHx8IHVuZGVmaW5lZCxcbiAgICAgIHByb2Nlc3NlZEJ5QUk6IHBhcnNlT3B0aW9uYWxCb29sZWFuKGRyYWZ0UHJvY2Vzc2VkQnlBSSksXG4gICAgICBmaWxlRXh0ZW5zaW9uOiByZXNvbHZlVGlja2V0RmlsZUV4dGVuc2lvbihkcmFmdEZpbGVOYW1lLCBkcmFmdFVybEZpbGUpLFxuICAgICAgZ2FzdG9UeXBlOiBwYXJzZWRHYXN0b1R5cGUgYXMgRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdFtcImdhc3RvVHlwZVwiXSxcbiAgICB9O1xuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XG4gICAgICBzdGFydFN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0aW5nXCIsIFwiVXBkYXRpbmcgZXhwZW5zZSBzaGVldC4uLlwiKSxcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRXJyb3JcIiwgXCJVcGRhdGUgZXJyb3IuXCIpLFxuICAgICAgc2V0TW9kYWxFcnJvcixcbiAgICAgIHNldEJ1c3ksXG4gICAgICBzZXRTdGF0dXMsXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB1cGRhdGVFeHBlbnNlU2hlZXRUaWNrZXQoZmlsZUlkLCBwYXlsb2FkKTtcbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlZFwiLCBcIkV4cGVuc2Ugc2hlZXQgdXBkYXRlZFwiKSk7XG4gICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQub2s7XG4gIH0sIFtcbiAgICBidXN5LFxuICAgIGNhbkVkaXRUaWNrZXQsXG4gICAgZHJhZnRDb21lbnRhcmlvLFxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgZHJhZnRGaWxlTmFtZSxcbiAgICBkcmFmdEdhc3RvVHlwZSxcbiAgICBkcmFmdFByb2Nlc3NlZEJ5QUksXG4gICAgZHJhZnRTdGF0dXMsXG4gICAgZHJhZnRUb3RhbEFtb3VudCxcbiAgICBkcmFmdFRyYW5zRGF0ZSxcbiAgICBkcmFmdFVybEZpbGUsXG4gICAgZmlsZUlkLFxuICAgIGlzRWRpdGluZyxcbiAgICBzZXRCdXN5LFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldFN0YXR1cyxcbiAgXSk7XG5cbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChidXN5KSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFjYW5EZWxldGVUaWNrZXQpIHtcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcbiAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRpbmdcIiwgXCJEZWxldGluZyBleHBlbnNlIHNoZWV0Li4uXCIpLFxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVFcnJvclwiLCBcIkRlbGV0ZSBlcnJvci5cIiksXG4gICAgICBzZXRNb2RhbEVycm9yLFxuICAgICAgc2V0QnVzeSxcbiAgICAgIHNldFN0YXR1cyxcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldChmaWxlSWQpO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVkXCIsIFwiRXhwZW5zZSBzaGVldCBkZWxldGVkXCIpKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcbiAgfSwgW2J1c3ksIGNhbkRlbGV0ZVRpY2tldCwgZmlsZUlkLCBzZXRCdXN5LCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXNdKTtcblxuICByZXR1cm4ge1xuICAgIGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVEZWxldGUsXG4gIH07XG59O1xyXG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zLnRzXCI7XG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuXG50eXBlIFVzZUV4cGVuc2VUaWNrZXREZXRhaWxUb3BiYXJBY3Rpb25zQXJncyA9IHtcbiAgYnVzeTogYm9vbGVhbjtcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGNhbkVkaXRUaWNrZXQ6IGJvb2xlYW47XG4gIGNhbkRlbGV0ZVRpY2tldDogYm9vbGVhbjtcbiAgZmlsZUlkOiBzdHJpbmc7XG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVVcGRhdGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcbiAgb25TYXZlU3VjY2VzczogKCkgPT4gdm9pZDtcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcbiAgfSkgPT4gdm9pZDtcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gQ29vcmRpbmF0ZXMgdG9wYmFyIGljb24gc3RhdGUgYW5kIGRpc3BhdGNoIGFjdGlvbnMgZm9yIHRpY2tldCBkZXRhaWwuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnMgPSAoe1xuICBidXN5LFxuICBtb2RhbE9wZW4sXG4gIGlzRWRpdGluZyxcbiAgY2FuRWRpdFRpY2tldCxcbiAgY2FuRGVsZXRlVGlja2V0LFxuICBmaWxlSWQsXG4gIHNldE1vZGFsRXJyb3IsXG4gIGhhbmRsZUVuYWJsZUVkaXQsXG4gIGhhbmRsZUNhbmNlbEVkaXQsXG4gIGhhbmRsZVVwZGF0ZSxcbiAgaGFuZGxlRGVsZXRlLFxuICBvblNhdmVTdWNjZXNzLFxuICBvcGVuQ29uZmlybSxcbiAgY2xvc2VDb25maXJtLFxufTogVXNlRXhwZW5zZVRpY2tldERldGFpbFRvcGJhckFjdGlvbnNBcmdzKSA9PiB7XG4gIHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyh7XG4gICAgaWRzOiB7XG4gICAgICBlZGl0SWNvbklkOiBcImV4cGVuc2VUaWNrZXRFZGl0SWNvblwiLFxuICAgICAgc2F2ZUljb25JZDogXCJleHBlbnNlVGlja2V0U2F2ZUljb25cIixcbiAgICAgIGRlbGV0ZUJ0bklkOiBcImV4cGVuc2VUaWNrZXREZWxldGVCdG5cIixcbiAgICAgIGNhbmNlbEJ0bklkOiBcImV4cGVuc2VUaWNrZXRDYW5jZWxCdG5cIixcbiAgICB9LFxuICAgIGV2ZW50czoge1xuICAgICAgZWRpdEV2ZW50OiBcImV4cGVuc2UtdGlja2V0LWRldGFpbC1lZGl0XCIsXG4gICAgICBkZWxldGVFdmVudDogXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtZGVsZXRlXCIsXG4gICAgICBjYW5jZWxFdmVudDogXCJleHBlbnNlLXRpY2tldC1kZXRhaWwtY2FuY2VsLWVkaXRcIixcbiAgICB9LFxuICAgIGJ1c3ksXG4gICAgbW9kYWxPcGVuLFxuICAgIGlzRWRpdGluZyxcbiAgICBpc0NyZWF0ZU1vZGU6IGZhbHNlLFxuICAgIGlzTG9ja2VkOiBmYWxzZSxcbiAgICBjYW5DcmVhdGU6IGZhbHNlLFxuICAgIGNhbkVkaXQ6IGNhbkVkaXRUaWNrZXQsXG4gICAgY2FuRGVsZXRlOiBjYW5EZWxldGVUaWNrZXQsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlU2F2ZTogaGFuZGxlVXBkYXRlLFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgICBzYXZlQ29uZmlybVRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiwgXCJTYXZlIGNoYW5nZXNcIiksXG4gICAgc2F2ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIHNhdmUgY2hhbmdlcz9cIiksXG4gICAgc2F2ZUNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX1NhdmVcIiwgXCJTYXZlXCIpLFxuICAgIGRlbGV0ZUNvbmZpcm1UaXRsZTogaW5kVChcIkNvbmZpcm1fRGVsZXRlX1RpdGxlXCIsIFwiRGVsZXRlXCIpLFxuICAgIGRlbGV0ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiQ29uZmlybV9EZWxldGVfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGl0ZW0/XCIpLFxuICAgIGRlbGV0ZUNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkRlbGV0ZVwiKSxcbiAgICBvblNhdmVTdWNjZXNzLFxuICAgIG9uRGVsZXRlU3VjY2VzczogKCkgPT4ge1xuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL1RpY2tldHNcIik7XG4gICAgfSxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBjbG9zZUNvbmZpcm0sXG4gIH0pO1xufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsZ0JBQXlFOzs7QUNtRm5FO0FBckNOLElBQU0sZ0NBQWdDLENBQUM7QUFBQSxFQUNyQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQTBDO0FBQ3hDLFFBQU0sY0FBYyxDQUFDLENBQUMsU0FBUyxZQUFZLGVBQWUsT0FBTyxPQUFPO0FBRXhFLFNBQ0UsNkNBQUMsYUFBUSxXQUFVLGFBQ2pCO0FBQUEsZ0RBQUMsaUNBQXNCLE9BQU8sS0FBSyx5QkFBeUIsUUFBUSxHQUFHLFdBQVUsbUNBQWtDO0FBQUEsSUFFbkgsNkNBQUMsYUFBUSxXQUFVLG9GQUNqQjtBQUFBLG1EQUFDLFNBQUksV0FBVSx5Q0FDYjtBQUFBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxPQUFPLEtBQUssd0JBQXdCLFFBQVE7QUFBQSxZQUM1QyxPQUFPLE9BQU8sVUFBVTtBQUFBO0FBQUEsUUFDMUI7QUFBQSxRQUVDLFlBQ0M7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLE9BQU8sS0FBSyx3QkFB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LFVBQ0M7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0EsY0FBYyxZQUFZLG9CQUFvQixTQUFTLE9BQU8sWUFBWTtBQUFBLFVBQzFFO0FBQUEsVUFDQSxjQUFjO0FBQUEsVUFDZCxrQkFBa0I7QUFBQSxVQUNsQixZQUFZO0FBQUE7QUFBQSxNQUNkO0FBQUEsTUFDQSw2Q0FBQyxTQUFJLFdBQVUsMEJBQTBCLGtCQUFPO0FBQUEsT0FDbEQsSUFDRTtBQUFBLEtBQ047QUFFSjtBQUdBLElBQU0sMEJBQTBCLE1BQU07QUFDcEMsU0FDRSw2Q0FBQyxnQ0FDQyx1REFBQyxrQ0FBK0IsR0FDbEM7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLDBCQUF3QjtBQUN4QixRQUFNLFNBQVMsU0FBUyxlQUFlLDRCQUE0QjtBQUNuRSxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLDJCQUF3QixDQUFFO0FBQ3REO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxrQ0FBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
