import {
  useExpenseSheetsFilterCache
} from "./chunks/chunk-6XWUBHOD.js";
import {
  ExpenseQuickTicketProgressOverlay_default,
  PageBottomActionButton,
  PageBottomActions_default,
  TICKET_IMAGE_ACCEPT_ATTRIBUTE,
  useExpenseSheetQuickTicketFlow
} from "./chunks/chunk-MMX74FD2.js";
import {
  DEFAULT_EXPENSE_STATUS_FILTER,
  getExpenseStatusLabel
} from "./chunks/chunk-CHKLJEF3.js";
import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-Y7PWEQHF.js";
import {
  ExpenseTimelineCard_default
} from "./chunks/chunk-C2UHVVSW.js";
import {
  ExpenseCurrencyFlagIcon_default
} from "./chunks/chunk-WQESTJQX.js";
import {
  CompactPagination_default,
  FloatingActionButton_default,
  useTimelineCardEffects
} from "./chunks/chunk-2YXSM2RQ.js";
import "./chunks/chunk-YMDESVRK.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-5FRAKTKT.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-GMPCIITL.js";
import "./chunks/chunk-4BE3ZFCK.js";
import {
  isManagingOtherExpenseRecord,
  resolveExpenseSheetDetailPolicy,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-WQGMDJUU.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-UXY4YQ3D.js";
import "./chunks/chunk-CBDB7NMA.js";
import {
  clearExpenseNavigationGuard,
  formatAmountWithCurrency,
  formatExpenseInputNumber,
  formatExpenseNumber,
  navigateToExpenseUrl,
  parseExpenseNumericInput,
  reloadExpensePage,
  setExpenseNavigationGuard
} from "./chunks/chunk-GYS3ZBXR.js";
import {
  configureExpenseApiAuth,
  createExpenseSheet,
  deleteExpenseSheet,
  fetchExpenseSheetDetail,
  formatExpenseDateParts,
  formatExpenseDisplayDate,
  getExchangeRate,
  getExpenseSheetDefaultCurrencyCode,
  hasAssignedVoucher,
  mapExpenseSheetHeader,
  mapExpenseSheetLine,
  parseExpenseDate,
  safeText,
  startOfDay,
  toIsoDate,
  updateExpenseSheetHeader
} from "./chunks/chunk-GDLOXSCF.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-FBPSAJMQ.js";
import {
  getExpenseScopeToken,
  mapWindowEnumOptions,
  setExpenseActingUserOverride
} from "./chunks/chunk-HGU6IHIX.js";
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
  indFormat,
  indT
} from "./chunks/chunk-63VW7TTG.js";
import {
  getSessionJsonWithExpiry,
  removeSessionValueWithExpiry,
  setSessionJsonWithExpiry
} from "./chunks/chunk-6HGCHSZG.js";
import {
  __toESM
} from "./chunks/chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/pages/gastos/detail/ExpenseSheetDetailPage.tsx
var import_react5 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/components/ExpenseSheetHeaderCurrencySection.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ExpenseSheetHeaderCurrencySection = ({
  headerCurrencyCode,
  baseCurrencyCode
}) => {
  const reimbursementCurrencyCode = baseCurrencyCode || headerCurrencyCode || "-";
  const reimbursementCurrencyOptions = import_react.default.useMemo(
    () => [
      {
        value: reimbursementCurrencyCode,
        text: reimbursementCurrencyCode,
        icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseCurrencyFlagIcon_default, { currencyCode: reimbursementCurrencyCode, sizeClassName: "h-6 w-6" })
      }
    ],
    [reimbursementCurrencyCode]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    SelectCombobox_default,
    {
      label: indT("ExpenseSheets_Field_LocalCurrency", "Local currency"),
      options: reimbursementCurrencyOptions,
      value: reimbursementCurrencyCode,
      onChange: () => void 0,
      placeholder: indT("ExpenseSheets_Filter_Currency_Placeholder", "Currency code"),
      readOnly: true,
      disabled: true,
      allowTextInput: false,
      showSearchButton: false,
      showLabel: true,
      usePortal: false,
      selectedTextMode: "value",
      dropdownMaxHeightClass: "max-h-96",
      selectedIconClassName: "h-6 w-6",
      optionIconClassName: "h-6 w-6",
      selectedInputPaddingClassName: "pl-12",
      idBase: "expense-header-local-currency-readonly",
      portalClassName: "visitas-typography",
      panelClassName: "visitas-typography"
    }
  );
};
var ExpenseSheetHeaderCurrencySection_default = ExpenseSheetHeaderCurrencySection;

// Web/wwwroot/react/src/pages/gastos/constants/exchangeRateEntryModeCatalog.ts
var EXCHANGE_RATE_MODE_META = {
  0: {
    labelKey: "ExpenseSheets_Filter_ExchangeRateMode_Official",
    fallback: "T.C. Oficial"
  },
  1: {
    labelKey: "ExpenseSheets_Filter_ExchangeRateMode_Manual",
    fallback: "T.C. Manual"
  }
};
var getExpenseExchangeRateModeCatalogOptions = () => {
  const source = typeof window !== "undefined" && Array.isArray(window.__EXPENSE_EXCHANGE_RATE_MODES__) ? window.__EXPENSE_EXCHANGE_RATE_MODES__ : [];
  return mapWindowEnumOptions(source).filter((option) => {
    const parsed = Number(option.value);
    return Number.isInteger(parsed) && parsed >= 0;
  });
};
var getExpenseExchangeRateModeCatalogLabel = (value) => {
  const match = getExpenseExchangeRateModeCatalogOptions().find((option) => Number(option.value) === value);
  return match?.text || "";
};
var normalizeExpenseExchangeRateMode = (value) => {
  if (value === null || value === void 0 || String(value).trim() === "") return null;
  const parsed = Number(value);
  if (Number.isInteger(parsed) && parsed >= 0) {
    return parsed;
  }
  return null;
};
var getExpenseExchangeRateModeLabel = (value) => {
  const normalized = normalizeExpenseExchangeRateMode(value);
  if (normalized === null) return "";
  const catalogLabel = getExpenseExchangeRateModeCatalogLabel(normalized);
  if (catalogLabel) return catalogLabel;
  const meta = EXCHANGE_RATE_MODE_META[normalized];
  return meta ? indT(meta.labelKey, meta.fallback) : String(normalized);
};

// Web/wwwroot/react/src/pages/gastos/components/ExpenseSheetHeaderForm.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var EXCHANGE_RATE_MODE_PREFIX_PATTERN = /^T\.?C\.?\s*/i;
var ExpenseSheetHeaderForm = ({
  mode,
  currencyLocks,
  header,
  ownerDisplay = "",
  projectValue,
  normalizedDraftCurrency,
  exchangeRateBaseCurrency,
  exchangeRateReferenceAmount,
  exchangeRateValue,
  exchangeRateValidationMessage,
  totalAmountText,
  draftDescription,
  draftProjectId,
  draftCurrencyCode,
  draftExchangeRate,
  officialExchangeRateRawValue,
  officialExchangeRateDate,
  officialExchangeRateSource,
  onDraftDescriptionChange,
  onDraftProjectIdChange,
  onDraftCurrencyCodeChange,
  onDraftExchangeRateChange
}) => {
  const { isCreateMode, isEditing, canEditHeaderFields, statusCommentMode } = mode;
  const { isCurrencyLockedByLines, isExchangeRateLockedByLines, showExchangeRate } = currencyLocks;
  const isForeignCurrency = isEditing && canEditHeaderFields && normalizedDraftCurrency !== "" && normalizedDraftCurrency !== exchangeRateBaseCurrency;
  const expenseCurrencyLabel = isForeignCurrency ? indT("ExpenseSheets_Field_ExpenseCurrency", "Expense currency") : indT("ExpenseSheets_Field_Currency", "Currency");
  const statusValue = header.expenseSheetStatus === null || header.expenseSheetStatus === void 0 ? "-" : getExpenseStatusLabel(header.expenseSheetStatus);
  const headerCurrencyCode = safeText(header.currencyCode).toUpperCase();
  const baseCurrencyCode = safeText(exchangeRateBaseCurrency).toUpperCase();
  const statusCommentValue = safeText(header.estadoComentarios);
  const showStatusCommentField = !isCreateMode && statusCommentMode !== "hidden";
  const parsedDraftExchangeRate = parseExpenseNumericInput(draftExchangeRate);
  const parsedOfficialRawRate = parseExpenseNumericInput(officialExchangeRateRawValue);
  const baseExchangeRateValue = parsedDraftExchangeRate != null ? parsedDraftExchangeRate : parsedOfficialRawRate != null ? parsedOfficialRawRate * exchangeRateReferenceAmount : null;
  const exchangeRateInfoValue = formatExpenseNumber(
    baseExchangeRateValue != null ? baseExchangeRateValue / exchangeRateReferenceAmount : null,
    {
      minimumFractionDigits: 7,
      maximumFractionDigits: 7,
      useGrouping: false,
      fallback: "0.0000000"
    }
  );
  const exchangeRateModeValue = normalizeExpenseExchangeRateMode(header.exchangeRateMode) ?? 0;
  const exchangeRateModeKey = exchangeRateModeValue === 1 ? "ExpenseSheets_Filter_ExchangeRateMode_Manual" : "ExpenseSheets_Filter_ExchangeRateMode_Official";
  const exchangeRateModeFallback = exchangeRateModeValue === 1 ? "T.C. Manual" : "T.C. Oficial";
  const exchangeRateModeLabel = (getExpenseExchangeRateModeLabel(exchangeRateModeValue) || indT(exchangeRateModeKey, exchangeRateModeFallback)).replace(EXCHANGE_RATE_MODE_PREFIX_PATTERN, "").trim().toLowerCase() || (exchangeRateModeValue === 1 ? "manual" : "oficial");
  const hasEndpointExchangeRateData = !!safeText(officialExchangeRateRawValue) || !!safeText(officialExchangeRateDate) || !!safeText(officialExchangeRateSource);
  const endpointExchangeRateInfoDate = safeText(officialExchangeRateDate) || indT("Common_NotAvailable", "N/A");
  const endpointExchangeRateInfoSource = safeText(officialExchangeRateSource).replace(/\s*\([^()]*\)\s*/g, " ").replace(/\s{2,}/g, " ").trim() || indT("Common_NotAvailable", "N/A");
  const endpointExchangeRateInfoMessage = indFormat(
    "ExpenseSheets_ExchangeRate_InfoPopover_Detail",
    "Tipo de cambio obtenido {0}\nFecha: {1}\nOrigen: {2}",
    safeText(officialExchangeRateRawValue) || "0.0000000",
    endpointExchangeRateInfoDate,
    endpointExchangeRateInfoSource
  );
  const storedExchangeRateInfoMessage = indFormat(
    "ExpenseSheets_ExchangeRate_InfoPopover_Stored",
    "Tipo de cambio {0} {1}",
    exchangeRateModeLabel,
    exchangeRateInfoValue
  );
  const exchangeRateInfoMessage = hasEndpointExchangeRateData ? endpointExchangeRateInfoMessage : storedExchangeRateInfoMessage;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("section", { className: "relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-[var(--radius-xl)]", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
    ownerDisplay ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ExpenseReadOnlyField_default,
      {
        label: indT("ExpenseSheets_Field_OwnerUser", "Owner user"),
        value: ownerDisplay,
        fullWidth: true
      }
    ) : null,
    !isCreateMode ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ExpenseReadOnlyField_default,
      {
        label: indT("ExpenseSheets_Field_SheetId", "Expense sheet code"),
        value: safeText(header.hojaGastosId) || "-"
      }
    ) : null,
    !isCreateMode ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_Status", "Status"), value: statusValue }) : null,
    showStatusCommentField ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ExpenseReadOnlyField_default,
      {
        label: indT("ExpenseSheets_Field_StatusComment", "Status comment"),
        value: statusCommentValue || "-",
        fullWidth: true
      }
    ) : null,
    isEditing && canEditHeaderFields ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "sm:col-span-2 space-y-1.5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_Description", "Description") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "input",
        {
          className: "form-control",
          value: draftDescription,
          onChange: (event) => onDraftDescriptionChange(event.target.value || ""),
          "aria-label": indT("ExpenseSheets_Field_Description", "Description")
        }
      )
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ExpenseReadOnlyField_default,
      {
        label: indT("ExpenseSheets_Field_Description", "Description"),
        value: safeText(header.description) || "-",
        fullWidth: true
      }
    ),
    isEditing && canEditHeaderFields ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ExpenseProjectFilterInput_default,
      {
        label: indT("ExpenseSheets_Field_Project", "Project"),
        placeholder: indT("ExpenseSheets_Filter_Project_Placeholder", "Project id"),
        value: draftProjectId,
        onChange: onDraftProjectIdChange,
        disabled: !isEditing || !canEditHeaderFields,
        readOnly: !isEditing || !canEditHeaderFields
      }
    ) : projectValue ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_Project", "Project"), value: projectValue }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ExpenseSheetHeaderCurrencySection_default,
      {
        interaction: { isEditing, canEditHeaderFields },
        currencyState: { isForeignCurrency, isCurrencyLockedByLines, isExchangeRateLockedByLines, showExchangeRate },
        expenseCurrencyLabel,
        headerCurrencyCode,
        baseCurrencyCode,
        draftCurrencyCode,
        draftExchangeRate,
        exchangeRateValue,
        exchangeRateValidationMessage,
        exchangeRateReferenceAmount,
        exchangeRateInfoMessage,
        onDraftCurrencyCodeChange,
        onDraftExchangeRateChange
      }
    ),
    !isCreateMode ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_TotalAmount", "Total amount"), value: totalAmountText }) : null
  ] }) });
};
var ExpenseSheetHeaderForm_default = ExpenseSheetHeaderForm;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseLinesTimeline.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var ExpenseLinesTimeline = ({
  visibleLines,
  currencyCode,
  totalLinePages,
  linePage,
  linesLabel,
  emptyText,
  paginationLabels,
  containerRef,
  onLinePageChange,
  onOpenLine
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: "space-y-0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ExpenseSectionDivider_default, { label: linesLabel, className: "expense-section-divider--spaced" }),
    visibleLines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "timeline-box timeline-empty", "data-empty-text": emptyText }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { ref: containerRef, className: "timeline-box", children: visibleLines.map((line, index) => {
      const lineId = safeText(line.lineRecId);
      const description = safeText(line.description);
      const lineCurrencyCode = safeText(line.currencyCode) || currencyCode;
      const amountText = formatAmountWithCurrency(line.amount ?? null, lineCurrencyCode);
      const linkedTicketFileId = safeText(line.fileId);
      const projectId = safeText(line.projId);
      const dateParts = formatExpenseDateParts(safeText(line.transDate), document?.documentElement?.lang || "es-ES");
      const ticketStatusIcon = linkedTicketFileId ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "size-4",
          "aria-hidden": "true",
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
            }
          )
        }
      ) : null;
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "timeline-item", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        ExpenseTimelineCard_default,
        {
          dateParts,
          title: description || lineId || "-",
          amountText,
          onOpen: () => onOpenLine(lineId),
          titleClassName: "timeline-name expense-line-card__title",
          subtitleClassName: "expense-sheet-card__subtitle expense-line-card__meta",
          statusIcon: ticketStatusIcon,
          statusIconClassName: "expense-line-card__ticket-icon",
          statusLabel: linkedTicketFileId || void 0
        }
      ) }, lineId || `${safeText(line.transDate)}-${description}-${amountText}-${projectId}`);
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
var ExpenseLinesTimeline_default = ExpenseLinesTimeline;

// Web/wwwroot/react/src/pages/gastos/detail/ExpenseSheetStatusActionBar.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var ExpenseSheetStatusActionBar = ({ actions, busy, disabled = false, onActionClick }) => {
  if (actions.length < 1) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(PageBottomActions_default, { ariaLabel: indT("ExpenseSheets_BottomActions_Toolbar", "Acciones de estado de la hoja de gasto"), children: actions.map((action) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    PageBottomActionButton,
    {
      label: indT(action.labelKey, action.fallback),
      disabled: busy || disabled,
      onClick: () => onActionClick(action)
    },
    action.id
  )) });
};
var ExpenseSheetStatusActionBar_default = ExpenseSheetStatusActionBar;

// Web/wwwroot/react/src/pages/gastos/detail/ExpenseSheetDetailOverlays.tsx
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var ExpenseSheetDetailOverlays = ({
  modal,
  modalError,
  status,
  busy,
  isRedirectingAfterCreate,
  modalLoadingText,
  modalCancelText,
  modalConfirmText,
  modalBody,
  cameraInputRef,
  galleryInputRef,
  sourcePickerOpen,
  quickTicketBusy,
  quickTicketProgressMessage,
  quickTicketProgressStages,
  quickTicketElapsedMs,
  quickTicketErrorMessage,
  quickTicketAttemptId,
  quickTicketTraceList,
  hasPendingUploadRetry,
  hasPartialTicketFailure,
  onConfirm,
  onCancel,
  onSelectedCameraFile,
  onSelectedGalleryFile,
  onSelectFromCamera,
  onSelectFromGallery,
  onCloseSourcePicker,
  onRetryPendingUpload,
  onClearQuickTicketError
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
        busy: busy || isRedirectingAfterCreate,
        error: modalError,
        status,
        onConfirm,
        onCancel,
        children: modalBody
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "input",
      {
        ref: cameraInputRef,
        type: "file",
        accept: TICKET_IMAGE_ACCEPT_ATTRIBUTE,
        capture: "environment",
        className: "hidden",
        onChange: (event) => {
          const file = event.currentTarget.files?.[0] || null;
          event.currentTarget.value = "";
          onSelectedCameraFile(file);
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "input",
      {
        ref: galleryInputRef,
        type: "file",
        accept: TICKET_IMAGE_ACCEPT_ATTRIBUTE,
        className: "hidden",
        onChange: (event) => {
          const file = event.currentTarget.files?.[0] || null;
          event.currentTarget.value = "";
          onSelectedGalleryFile(file);
        }
      }
    ),
    sourcePickerOpen ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/45 px-4 py-6", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "w-full max-w-sm rounded-[var(--radius-xl)] border border-slate-200 bg-white p-4 shadow-xl", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h3", { className: "text-[16px] font-semibold text-slate-800", children: indT("ExpenseSheets_NewTicket_Source_Title", "Nuevo ticket") }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "mt-1 text-sm text-slate-600", children: indT(
        "ExpenseSheets_NewTicket_Source_Body",
        "Selecciona una fuente para capturar o elegir la imagen del ticket."
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "mt-4 grid grid-cols-1 gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "ind-action-btn w-full px-3 py-2 text-sm", onClick: onSelectFromCamera, children: indT("ExpenseSheets_NewTicket_Source_Camera", "Usar c\xE1mara") }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "ind-action-btn w-full px-3 py-2 text-sm", onClick: onSelectFromGallery, children: indT("ExpenseSheets_NewTicket_Source_Gallery", "Elegir imagen") }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "ind-action-btn w-full px-3 py-2 text-sm", onClick: onCloseSourcePicker, children: indT("Common_Cancel", "Cancel") })
      ] })
    ] }) }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      ExpenseQuickTicketProgressOverlay_default,
      {
        open: quickTicketBusy,
        title: indT("ExpenseSheets_NewTicket_Progress_Title", "Processing ticket"),
        summary: quickTicketProgressMessage || indT("Common_Loading", "Loading"),
        elapsedMs: quickTicketElapsedMs,
        stages: quickTicketProgressStages
      }
    ),
    quickTicketErrorMessage ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
      "div",
      {
        className: hasPartialTicketFailure ? "glass-panel shadow-card space-y-2 rounded-[var(--radius-xl)] border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900" : "glass-panel shadow-card space-y-2 rounded-[var(--radius-xl)] border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: quickTicketErrorMessage }),
          quickTicketAttemptId ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "p",
            {
              className: hasPartialTicketFailure ? "rounded-[var(--radius-xl)] border border-amber-200 bg-white px-2 py-1 font-mono text-[11px] text-amber-900 break-all" : "rounded-[var(--radius-xl)] border border-rose-200 bg-white px-2 py-1 font-mono text-[11px] text-rose-800 break-all",
              children: `attemptId: ${quickTicketAttemptId}`
            }
          ) : null,
          quickTicketTraceList.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "div",
            {
              className: hasPartialTicketFailure ? "rounded-[var(--radius-xl)] border border-amber-200 bg-white p-2 text-xs text-amber-800" : "rounded-[var(--radius-xl)] border border-rose-200 bg-white p-2 text-xs text-rose-700",
              children: quickTicketTraceList.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: `${entry.step}: ${entry.traceId}` }, `${entry.step}-${entry.at}`))
            }
          ) : null,
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-wrap gap-2", children: [
            hasPendingUploadRetry ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "ind-action-btn px-3 py-1.5 text-xs", onClick: onRetryPendingUpload, children: indT("ExpenseSheets_NewTicket_RetryUpload", "Reintentar upload") }) : null,
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "ind-action-btn px-3 py-1.5 text-xs", onClick: onClearQuickTicketError, children: indT("Common_Close", "Close") })
          ] })
        ]
      }
    ) : null
  ] });
};
var ExpenseSheetDetailOverlays_default = ExpenseSheetDetailOverlays;

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetDetailPageController.tsx
var import_react4 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/utils/expenseSheetCreatedReturnContext.ts
var EXPENSE_SHEET_CREATED_RETURN_CONTEXT_KEY_PREFIX = "expense_sheet_created_return_context_v1";
var EXPENSE_SHEET_CREATED_RETURN_CONTEXT_TTL_MS = 2 * 60 * 60 * 1e3;
var getScopedKey = () => {
  return `${EXPENSE_SHEET_CREATED_RETURN_CONTEXT_KEY_PREFIX}_${getExpenseScopeToken()}`;
};
var normalizeExpenseSheetCreatedReturnContext = (value) => {
  if (!value || typeof value !== "object") return null;
  const payload = value;
  const sheetId = safeText(payload.sheetId);
  if (!sheetId) return null;
  return {
    sheetId
  };
};
var readExpenseSheetCreatedReturnContext = (sheetId) => {
  const stored = normalizeExpenseSheetCreatedReturnContext(
    getSessionJsonWithExpiry(getScopedKey())
  );
  if (!stored) return null;
  const safeSheetId = safeText(sheetId);
  if (!safeSheetId) return stored;
  return stored.sheetId.toUpperCase() === safeSheetId.toUpperCase() ? stored : null;
};
var clearExpenseSheetCreatedReturnContext = () => {
  removeSessionValueWithExpiry(getScopedKey());
};
var saveExpenseSheetCreatedReturnContext = (value) => {
  const normalized = normalizeExpenseSheetCreatedReturnContext(value);
  if (!normalized) {
    clearExpenseSheetCreatedReturnContext();
    return null;
  }
  setSessionJsonWithExpiry(getScopedKey(), normalized, EXPENSE_SHEET_CREATED_RETURN_CONTEXT_TTL_MS);
  return normalized;
};
var consumeExpenseSheetCreatedReturnContext = (sheetId) => {
  const stored = readExpenseSheetCreatedReturnContext(sheetId);
  if (!stored) return null;
  clearExpenseSheetCreatedReturnContext();
  return stored;
};

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetDetailMutations.ts
var import_react2 = __toESM(require_react());
var useExpenseSheetDetailMutations = ({
  busy,
  isEditing,
  isCreateMode,
  isEditLocked,
  isDeleteLocked,
  isCurrencyLockedByLines,
  isExchangeRateLockedByLines,
  lockedCurrencyCode,
  lockedExchangeRate,
  canCreateExpense,
  canEditExpense,
  canDeleteExpense,
  canEditHeaderFields,
  canTransitionStatus,
  sheetId,
  draftDescription,
  draftCurrencyCode,
  draftExchangeRate,
  officialExchangeRateValue,
  draftProjectId,
  draftEstadoComentarios,
  exchangeRateBaseCurrency,
  currentExpenseSheetStatus,
  onCreateSuccess,
  setModalError,
  setBusy,
  setStatus,
  setIsEditing
}) => {
  const buildUpdatePayload = (0, import_react2.useCallback)(
    (nextStatus, statusCommentOverride) => {
      const hasExplicitStatusCommentOverride = statusCommentOverride !== void 0;
      const normalizedDescription = String(draftDescription || "").trim();
      const normalizedProjectId = String(draftProjectId || "").trim();
      const normalizedEstadoComentarios = String(
        statusCommentOverride ?? draftEstadoComentarios ?? ""
      ).trim();
      const resolvedExpenseSheetStatus = nextStatus ?? (currentExpenseSheetStatus != null ? Number(currentExpenseSheetStatus) : void 0);
      if (!normalizedDescription) {
        return {
          error: indT("ExpenseSheets_Validation_DescriptionRequired", "Description is required.")
        };
      }
      return {
        payload: {
          description: normalizedDescription,
          projId: normalizedProjectId || void 0,
          expenseSheetStatus: resolvedExpenseSheetStatus,
          // Preserve explicit empty status comments so the backend can clear the stored value.
          estadoComentarios: hasExplicitStatusCommentOverride ? normalizedEstadoComentarios : normalizedEstadoComentarios || void 0
        }
      };
    },
    [
      canEditHeaderFields,
      currentExpenseSheetStatus,
      draftDescription,
      draftEstadoComentarios,
      draftProjectId,
      isCreateMode
    ]
  );
  const handleUpdate = (0, import_react2.useCallback)(async () => {
    if (busy || !isEditing) return false;
    if (!isCreateMode && isEditLocked) return false;
    const canProceed = isCreateMode ? canCreateExpense : canEditExpense;
    if (!canProceed) {
      showPermissionModal();
      return false;
    }
    const payloadResult = buildUpdatePayload();
    if ("error" in payloadResult) {
      setModalError(payloadResult.error);
      setStatus(payloadResult.error);
      return false;
    }
    const result = await executeExpenseMutation({
      startStatus: isCreateMode ? indT("Common_Loading", "Loading") : indT("ExpenseSheets_Detail_Updating", "Updating expense sheet..."),
      fallbackErrorMessage: indT("ExpenseSheets_Detail_UpdateError", "Update error."),
      setModalError,
      setBusy,
      setStatus,
      action: async () => {
        if (isCreateMode) {
          const createPayload = payloadResult.payload;
          const payload = {
            mode: 1,
            existingHojaGastosId: void 0,
            description: createPayload.description,
            projId: createPayload.projId,
            expenseSheetStatus: 0,
            lines: []
          };
          const response2 = await createExpenseSheet(payload);
          if (!response2.Success) {
            throw new Error(response2.Message || indT("Api_RequestFailed", "Request failed."));
          }
          const createdData = response2?.Data;
          const createdSheetId = String(createdData?.HojaGastosId ?? createdData?.hojaGastosId ?? "").trim();
          if (!createdSheetId) {
            throw new Error(indT("Api_RequestFailed", "Request failed."));
          }
          onCreateSuccess(createdSheetId);
          setStatus(indT("Common_Save", "Save"));
          return true;
        }
        const response = await updateExpenseSheetHeader(sheetId, payloadResult.payload);
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
    buildUpdatePayload,
    canCreateExpense,
    canEditExpense,
    isCreateMode,
    isEditLocked,
    isEditing,
    onCreateSuccess,
    setBusy,
    setIsEditing,
    setModalError,
    setStatus,
    sheetId
  ]);
  const handleStatusTransition = (0, import_react2.useCallback)(
    async (nextStatus, startStatus, statusCommentOverride) => {
      if (busy || isCreateMode || !sheetId) return false;
      if (!canTransitionStatus) {
        showPermissionModal();
        return false;
      }
      const payloadResult = buildUpdatePayload(nextStatus, statusCommentOverride);
      if ("error" in payloadResult) {
        setModalError(payloadResult.error);
        setStatus(payloadResult.error);
        return false;
      }
      const result = await executeExpenseMutation({
        startStatus,
        fallbackErrorMessage: indT("ExpenseSheets_Detail_UpdateError", "Update error."),
        setModalError,
        setBusy,
        setStatus,
        action: async () => {
          const response = await updateExpenseSheetHeader(sheetId, payloadResult.payload);
          if (!response.Success) {
            throw new Error(response.Message || indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
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
      buildUpdatePayload,
      canTransitionStatus,
      isCreateMode,
      setBusy,
      setIsEditing,
      setModalError,
      setStatus,
      sheetId
    ]
  );
  const handleDelete = (0, import_react2.useCallback)(async () => {
    if (busy) return false;
    if (isDeleteLocked) return false;
    if (!canDeleteExpense) {
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
        const response = await deleteExpenseSheet(sheetId);
        if (!response.Success) {
          throw new Error(response.Message || indT("ExpenseSheets_Detail_DeleteFailed", "Delete failed."));
        }
        setStatus(indT("ExpenseSheets_Detail_Deleted", "Expense sheet deleted"));
        return true;
      }
    });
    return result.ok;
  }, [busy, canDeleteExpense, isDeleteLocked, setBusy, setModalError, setStatus, sheetId]);
  return {
    handleUpdate,
    handleStatusTransition,
    handleDelete
  };
};

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetDetailTopbarActions.ts
var useExpenseSheetDetailTopbarActions = ({
  busy,
  modalOpen,
  isEditing,
  isCreateMode,
  actionMode = "default",
  isLocked,
  isEditLocked,
  isDeleteLocked,
  permissionsReady = true,
  canEditExpense,
  canCreateExpense,
  canDeleteExpense,
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
    actionGroupId: "expense-sheet-detail-actions",
    ids: {
      editIconId: "expenseEditIcon",
      saveIconId: "expenseSaveIcon",
      deleteBtnId: "expenseDeleteBtn",
      cancelBtnId: "expenseCancelBtn"
    },
    events: {
      editEvent: "expense-detail-edit",
      deleteEvent: "expense-detail-delete",
      cancelEvent: "expense-detail-cancel-edit"
    },
    busy,
    modalOpen,
    isEditing,
    isCreateMode,
    isLocked,
    actionMode,
    isEditLocked,
    isDeleteLocked,
    allowCreateModeActionsWhenLocked: true,
    permissionsReady,
    canCreate: canCreateExpense,
    canEdit: canEditExpense,
    canDelete: canDeleteExpense,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
    handleSave: handleUpdate,
    handleDelete,
    saveConfirmTitle: indT("ExpenseSheets_Detail_SaveChanges_Title", "Save changes"),
    saveConfirmMessage: indT("ExpenseSheets_Detail_SaveChanges_Body", "Do you want to save changes?"),
    saveConfirmText: indT("Common_Save", "Save"),
    deleteConfirmTitle: indT("ExpenseSheets_Detail_DeleteSheet_Title", "Delete expense sheet"),
    deleteConfirmMessage: indT("ExpenseSheets_Detail_DeleteSheet_Body", "Do you want to delete this expense sheet?"),
    deleteConfirmText: indT("Common_Delete", "Delete"),
    onSaveSuccess,
    onDeleteSuccess: onDeleteSuccess || (() => navigateToExpenseUrl("/Gastos/ExpenseSheets")),
    openConfirm,
    closeConfirm
  });
};

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetDetailState.ts
var import_react3 = __toESM(require_react());
var EXCHANGE_RATE_DEBOUNCE_MS = 400;
var EXCHANGE_RATE_REFERENCE_AMOUNT = 100;
var EXCHANGE_RATE_DECIMAL_DIGITS = 7;
var EXPENSE_STATUS_APPROVED = 2;
var EXPENSE_STATUS_PAID = 4;
var formatExchangeRateInputValue = (value) => {
  return formatExpenseInputNumber(value, {
    minimumFractionDigits: EXCHANGE_RATE_DECIMAL_DIGITS,
    maximumFractionDigits: EXCHANGE_RATE_DECIMAL_DIGITS,
    useGrouping: true,
    fallback: ""
  });
};
var SAME_CURRENCY_EXCHANGE_RATE_INPUT = formatExchangeRateInputValue(EXCHANGE_RATE_REFERENCE_AMOUNT);
var buildCreateHeaderDraft = () => {
  return {
    hojaGastosId: "",
    description: "",
    projId: "",
    currencyCode: "",
    totalAmount: null,
    expenseSheetStatus: 0,
    exchangeRateMode: 0,
    createdDate: "",
    exchRate: String(EXCHANGE_RATE_REFERENCE_AMOUNT)
  };
};
var shouldShowExchangeRate = (value) => {
  if (!value) return false;
  const parsed = parseExpenseNumericInput(value);
  if (parsed === null) return true;
  return Math.abs(parsed) > 0;
};
var useExpenseSheetDetailState = ({
  hasAccess,
  canCreateExpense,
  allowSelfManagement,
  canManageOtherUsers,
  currentAxUserId,
  currentCrmUserId,
  selectedManagedUserId,
  sheetId,
  isCreateMode,
  onForbidden
}) => {
  const [header, setHeader] = (0, import_react3.useState)(null);
  const [lines, setLines] = (0, import_react3.useState)([]);
  const [linePage, setLinePage] = (0, import_react3.useState)(1);
  const [isLoading, setIsLoading] = (0, import_react3.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react3.useState)("");
  const [busy, setBusy] = (0, import_react3.useState)(false);
  const [status, setStatus] = (0, import_react3.useState)("");
  const [isEditing, setIsEditing] = (0, import_react3.useState)(false);
  const [modalError, setModalError] = (0, import_react3.useState)("");
  const [draftDescription, setDraftDescription] = (0, import_react3.useState)("");
  const [draftProjectId, setDraftProjectId] = (0, import_react3.useState)("");
  const [draftCurrencyCode, setDraftCurrencyCode] = (0, import_react3.useState)("");
  const [draftExchangeRate, setDraftExchangeRate] = (0, import_react3.useState)("");
  const [draftEstadoComentarios, setDraftEstadoComentarios] = (0, import_react3.useState)("");
  const [defaultCurrencyCode, setDefaultCurrencyCode] = (0, import_react3.useState)("");
  const [isExchangeRateLoading, setIsExchangeRateLoading] = (0, import_react3.useState)(false);
  const [exchangeRateMessage, setExchangeRateMessage] = (0, import_react3.useState)("");
  const [exchangeRateMessageIsError, setExchangeRateMessageIsError] = (0, import_react3.useState)(false);
  const [officialExchangeRateValue, setOfficialExchangeRateValue] = (0, import_react3.useState)("");
  const [officialExchangeRateRawValue, setOfficialExchangeRateRawValue] = (0, import_react3.useState)("");
  const [officialExchangeRateDate, setOfficialExchangeRateDate] = (0, import_react3.useState)("");
  const [officialExchangeRateSource, setOfficialExchangeRateSource] = (0, import_react3.useState)("");
  const hydrateDraftFromHeader = (0, import_react3.useCallback)((nextHeader) => {
    setDraftDescription(safeText(nextHeader?.description));
    setDraftProjectId(safeText(nextHeader?.projId));
    setDraftCurrencyCode(safeText(nextHeader?.currencyCode));
    setDraftExchangeRate(
      formatExpenseInputNumber(nextHeader?.exchRate, {
        minimumFractionDigits: EXCHANGE_RATE_DECIMAL_DIGITS,
        maximumFractionDigits: EXCHANGE_RATE_DECIMAL_DIGITS,
        useGrouping: true,
        fallback: ""
      })
    );
    setDraftEstadoComentarios(safeText(nextHeader?.estadoComentarios));
  }, []);
  (0, import_react3.useEffect)(() => {
    const loadDetail = async () => {
      if (!hasAccess) {
        onForbidden();
        return;
      }
      if (isCreateMode) {
        if (!canCreateExpense) {
          onForbidden();
          return;
        }
        const draftHeader = buildCreateHeaderDraft();
        setHeader(draftHeader);
        setLines([]);
        setLinePage(1);
        setIsEditing(true);
        hydrateDraftFromHeader(draftHeader);
        setStatus("");
        setErrorMessage("");
        return;
      }
      if (!sheetId) {
        setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet was not found."));
        setHeader(null);
        setLines([]);
        return;
      }
      setIsLoading(true);
      setErrorMessage("");
      try {
        const response = await fetchExpenseSheetDetail(sheetId, {
          suppressPermissionModal: true
        });
        if (response?.Success === false) {
          setErrorMessage(response?.Message || indT("ExpenseSheets_LoadError", "Could not load expense sheet detail."));
          setHeader(null);
          setLines([]);
          return;
        }
        const sheets = Array.isArray(response?.Items) ? response.Items : [];
        const selectedSheet = sheets.find((entry) => safeText(entry?.HojaGastosId).toUpperCase() === sheetId.trim().toUpperCase()) || sheets[0];
        if (!selectedSheet) {
          setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet was not found."));
          setHeader(null);
          setLines([]);
          return;
        }
        const nextHeader = mapExpenseSheetHeader(selectedSheet);
        const nextLines = (Array.isArray(selectedSheet.Lines) ? selectedSheet.Lines : []).map(
          (entry) => mapExpenseSheetLine(entry)
        );
        setHeader(nextHeader);
        setLines(nextLines);
      } catch (error) {
        if (error instanceof ApiFetchError && error.status === 403) {
          onForbidden();
          return;
        }
        setErrorMessage(
          error instanceof Error ? error.message : indT("ExpenseSheets_LoadError", "Could not load expense sheet detail.")
        );
        setHeader(null);
        setLines([]);
      } finally {
        setIsLoading(false);
      }
    };
    void loadDetail();
  }, [canCreateExpense, hasAccess, hydrateDraftFromHeader, isCreateMode, onForbidden, sheetId]);
  (0, import_react3.useEffect)(() => {
    if (!header || isEditing) return;
    hydrateDraftFromHeader(header);
  }, [header, hydrateDraftFromHeader, isEditing]);
  (0, import_react3.useEffect)(() => {
    if (!hasAccess) return;
    let isCancelled = false;
    const controller = new AbortController();
    const loadDefaultCurrencyCode = async () => {
      try {
        const code = await getExpenseSheetDefaultCurrencyCode({
          suppressPermissionModal: true,
          signal: controller.signal
        });
        if (isCancelled) return;
        setDefaultCurrencyCode(safeText(code).toUpperCase());
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    };
    void loadDefaultCurrencyCode();
    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [hasAccess]);
  const hasActiveProcess = (0, import_react3.useMemo)(() => busy || isEditing, [busy, isEditing]);
  (0, import_react3.useEffect)(() => {
    setExpenseNavigationGuard(hasActiveProcess);
    return () => {
      clearExpenseNavigationGuard();
    };
  }, [hasActiveProcess]);
  const projectValue = safeText(header?.projId);
  const statusCode = typeof header?.expenseSheetStatus === "number" ? header.expenseSheetStatus : null;
  const isSheetApproved = statusCode === EXPENSE_STATUS_APPROVED;
  const isSheetPaidByStatus = statusCode === EXPENSE_STATUS_PAID;
  const isSheetPaidByVoucher = hasAssignedVoucher(header?.voucher);
  const isSheetPaid = isSheetPaidByStatus || isSheetPaidByVoucher;
  const isManagingOtherUser = isManagingOtherExpenseRecord({
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    recordOwnerUserId: header?.userId,
    isCreateMode
  });
  const detailPolicy = (0, import_react3.useMemo)(() => {
    if (isCreateMode) {
      return {
        interactionMode: "full_edit",
        showFab: false,
        canDeleteSheet: false,
        statusActions: []
      };
    }
    return resolveExpenseSheetDetailPolicy({
      statusCode,
      isManagingOtherUser,
      allowSelfManagement,
      isPaid: isSheetPaid
    });
  }, [allowSelfManagement, isCreateMode, isManagingOtherUser, isSheetPaid, statusCode]);
  const canEditHeaderFieldsCurrent = isCreateMode || !isManagingOtherUser && detailPolicy.interactionMode === "full_edit";
  const canEditStatusCommentCurrent = !isCreateMode && detailPolicy.interactionMode === "comment_only_edit";
  const canEditAnyCurrent = isCreateMode && canCreateExpense || canEditHeaderFieldsCurrent || canEditStatusCommentCurrent;
  const canUseFullEditFeatures = !isCreateMode && detailPolicy.interactionMode === "full_edit";
  const isSheetLocked = isSheetApproved || isSheetPaid;
  const hasLines = lines.length > 0;
  const exchangeRateValue = formatExpenseInputNumber(safeText(header?.exchRate), {
    minimumFractionDigits: EXCHANGE_RATE_DECIMAL_DIGITS,
    maximumFractionDigits: EXCHANGE_RATE_DECIMAL_DIGITS,
    useGrouping: true,
    fallback: ""
  });
  const showExchangeRate = (0, import_react3.useMemo)(() => shouldShowExchangeRate(exchangeRateValue), [exchangeRateValue]);
  const normalizedDraftCurrency = (0, import_react3.useMemo)(() => draftCurrencyCode.trim().toUpperCase(), [draftCurrencyCode]);
  const normalizedDefaultCurrency = (0, import_react3.useMemo)(() => safeText(defaultCurrencyCode).toUpperCase(), [defaultCurrencyCode]);
  const exchangeRateBaseCurrency = normalizedDefaultCurrency || "EUR";
  const uiLocale = (0, import_react3.useMemo)(() => {
    if (typeof document === "undefined") return "es-ES";
    return safeText(document.documentElement?.lang) || "es-ES";
  }, []);
  const formExchangeDate = (0, import_react3.useMemo)(() => {
    const parsedDate = parseExpenseDate(safeText(header?.createdDate));
    if (parsedDate) return toIsoDate(parsedDate);
    return toIsoDate(/* @__PURE__ */ new Date());
  }, [header?.createdDate]);
  const shouldLoadHeaderExchangeRate = false;
  const exchangeRateValidationMessage = "";
  const isCurrencyLockedByLines = false;
  const isExchangeRateLockedByLines = false;
  (0, import_react3.useEffect)(() => {
    let isCancelled = false;
    let requestTimer = null;
    let requestAbortController = null;
    const clearRequestArtifacts = () => {
      if (requestTimer) {
        clearTimeout(requestTimer);
        requestTimer = null;
      }
      if (requestAbortController) {
        requestAbortController.abort();
        requestAbortController = null;
      }
    };
    if (!shouldLoadHeaderExchangeRate || !isEditing || !canEditHeaderFieldsCurrent || isExchangeRateLockedByLines) {
      setIsExchangeRateLoading(false);
      setExchangeRateMessage("");
      setExchangeRateMessageIsError(false);
      setOfficialExchangeRateValue("");
      setOfficialExchangeRateRawValue("");
      setOfficialExchangeRateDate("");
      setOfficialExchangeRateSource("");
      return () => {
        clearRequestArtifacts();
      };
    }
    if (!normalizedDraftCurrency || !exchangeRateBaseCurrency) {
      setIsExchangeRateLoading(false);
      setExchangeRateMessage("");
      setExchangeRateMessageIsError(false);
      setOfficialExchangeRateValue("");
      setOfficialExchangeRateRawValue("");
      setOfficialExchangeRateDate("");
      setOfficialExchangeRateSource("");
      return () => {
        clearRequestArtifacts();
      };
    }
    if (normalizedDraftCurrency === exchangeRateBaseCurrency) {
      setDraftExchangeRate(SAME_CURRENCY_EXCHANGE_RATE_INPUT);
      setOfficialExchangeRateValue(SAME_CURRENCY_EXCHANGE_RATE_INPUT);
      setIsExchangeRateLoading(false);
      setExchangeRateMessage("");
      setExchangeRateMessageIsError(false);
      setOfficialExchangeRateRawValue("");
      setOfficialExchangeRateDate("");
      setOfficialExchangeRateSource("");
      return () => {
        clearRequestArtifacts();
      };
    }
    requestTimer = setTimeout(async () => {
      requestAbortController = new AbortController();
      setIsExchangeRateLoading(true);
      setExchangeRateMessage("");
      setExchangeRateMessageIsError(false);
      setOfficialExchangeRateValue("");
      setOfficialExchangeRateRawValue("");
      setOfficialExchangeRateDate("");
      setOfficialExchangeRateSource("");
      try {
        const response = await getExchangeRate(
          exchangeRateBaseCurrency,
          normalizedDraftCurrency,
          formExchangeDate,
          {
            suppressPermissionModal: true,
            signal: requestAbortController.signal
          }
        );
        if (isCancelled) return;
        if (!response.Success || !response.Data || !Number.isFinite(Number(response.Data.Rate))) {
          setOfficialExchangeRateRawValue("");
          setOfficialExchangeRateDate("");
          setOfficialExchangeRateSource("");
          setExchangeRateMessage(
            safeText(response.Message) || indT("ExpenseSheets_ExchangeRate_Unavailable", "No se pudo obtener el tipo de cambio.")
          );
          setExchangeRateMessageIsError(true);
          return;
        }
        const officialRatePerBaseUnit = Number(response.Data.Rate);
        const officialRateForReferenceAmount = officialRatePerBaseUnit * EXCHANGE_RATE_REFERENCE_AMOUNT;
        const nextExchangeRateValue = formatExchangeRateInputValue(officialRateForReferenceAmount);
        const officialRateRawValue = formatExchangeRateInputValue(officialRatePerBaseUnit);
        setOfficialExchangeRateValue(nextExchangeRateValue);
        setOfficialExchangeRateRawValue(officialRateRawValue);
        setDraftExchangeRate(nextExchangeRateValue);
        const effectiveRateDate = safeText(response.Data.Date) || formExchangeDate;
        const source = safeText(response.Data.Source);
        setOfficialExchangeRateDate(effectiveRateDate);
        setOfficialExchangeRateSource(source);
        const officialLabel = getExpenseExchangeRateModeLabel(0) || indT("ExpenseSheets_Filter_ExchangeRateMode_Official", "T.C. Oficial");
        const localizedRateDate = formatExpenseDisplayDate(effectiveRateDate, uiLocale) || effectiveRateDate;
        const exchangeRateInfoMessage = source ? `${officialLabel} ${localizedRateDate} (${source})` : `${officialLabel} ${localizedRateDate}`;
        setExchangeRateMessage(officialRateRawValue ? `${exchangeRateInfoMessage} - ${officialRateRawValue}` : exchangeRateInfoMessage);
        setExchangeRateMessageIsError(false);
      } catch (error) {
        if (isCancelled) return;
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (error instanceof ApiFetchError) {
          if (error.status === 404) {
            setOfficialExchangeRateValue("");
            setOfficialExchangeRateRawValue("");
            setOfficialExchangeRateDate("");
            setOfficialExchangeRateSource("");
            setExchangeRateMessage(indT("ExpenseSheets_ExchangeRate_NotFound", "No hay tipo de cambio para la fecha"));
            setExchangeRateMessageIsError(true);
            return;
          }
          if (error.status === 422 || error.status === 500) {
            setOfficialExchangeRateValue("");
            setOfficialExchangeRateRawValue("");
            setOfficialExchangeRateDate("");
            setOfficialExchangeRateSource("");
            setExchangeRateMessage(
              safeText(error.message) || indT("ExpenseSheets_ExchangeRate_Unavailable", "No se pudo obtener el tipo de cambio.")
            );
            setExchangeRateMessageIsError(true);
            return;
          }
          setOfficialExchangeRateValue("");
          setOfficialExchangeRateRawValue("");
          setOfficialExchangeRateDate("");
          setOfficialExchangeRateSource("");
          setExchangeRateMessage(
            safeText(error.message) || indT("ExpenseSheets_ExchangeRate_Unavailable", "No se pudo obtener el tipo de cambio.")
          );
          setExchangeRateMessageIsError(true);
          return;
        }
        setOfficialExchangeRateValue("");
        setOfficialExchangeRateRawValue("");
        setOfficialExchangeRateDate("");
        setOfficialExchangeRateSource("");
        setExchangeRateMessage(indT("ExpenseSheets_ExchangeRate_Unavailable", "No se pudo obtener el tipo de cambio."));
        setExchangeRateMessageIsError(true);
      } finally {
        if (!isCancelled) {
          setIsExchangeRateLoading(false);
        }
      }
    }, EXCHANGE_RATE_DEBOUNCE_MS);
    return () => {
      isCancelled = true;
      clearRequestArtifacts();
    };
  }, [
    canEditHeaderFieldsCurrent,
    formExchangeDate,
    exchangeRateBaseCurrency,
    isEditing,
    isExchangeRateLockedByLines,
    normalizedDraftCurrency,
    shouldLoadHeaderExchangeRate,
    uiLocale,
    setDraftExchangeRate
  ]);
  const handleEnableEdit = (0, import_react3.useCallback)(() => {
    if (isCreateMode || isLoading || !header) {
      return;
    }
    if (!canEditAnyCurrent) {
      onForbidden();
      return;
    }
    setModalError("");
    setIsEditing(true);
    hydrateDraftFromHeader(header);
    setStatus(indT("ExpenseSheets_Detail_EditingEnabled", "Editing enabled"));
  }, [canEditAnyCurrent, header, hydrateDraftFromHeader, isCreateMode, isLoading, onForbidden]);
  const handleCancelEdit = (0, import_react3.useCallback)(() => {
    if (isCreateMode) {
      navigateToExpenseUrl("/Gastos/ExpenseSheets", {
        askConfirmation: true
      });
      return;
    }
    if (!isEditing) return;
    setIsEditing(false);
    setModalError("");
    hydrateDraftFromHeader(header);
    setStatus(indT("Common_Cancel", "Cancel"));
  }, [header, hydrateDraftFromHeader, isCreateMode, isEditing]);
  const handleOpenCreateSheetMode = (0, import_react3.useCallback)(() => {
    if (!canCreateExpense) {
      onForbidden();
      return;
    }
    if (isCreateMode) {
      return;
    }
    navigateToExpenseUrl("/Gastos/ExpenseSheetDetail?mode=create", {
      askConfirmation: isEditing
    });
  }, [canCreateExpense, isCreateMode, isEditing, onForbidden]);
  const handleOpenCreateLineMode = (0, import_react3.useCallback)(() => {
    if (!sheetId || !canUseFullEditFeatures) {
      onForbidden();
      return;
    }
    if (isCreateMode) {
      return;
    }
    const targetUrl = `/Gastos/ExpenseSheetLineDetail?hojaGastosId=${encodeURIComponent(sheetId)}&mode=create`;
    navigateToExpenseUrl(targetUrl, {
      askConfirmation: isEditing
    });
  }, [canUseFullEditFeatures, isCreateMode, isEditing, onForbidden, sheetId]);
  const openTicketsFromSheet = (0, import_react3.useCallback)(
    (action) => {
      if (!sheetId || !canUseFullEditFeatures) {
        onForbidden();
        return;
      }
      if (isCreateMode) {
        return;
      }
      const query = new URLSearchParams({
        action,
        hojaGastosId: sheetId
      });
      navigateToExpenseUrl(`/Gastos/Tickets?${query.toString()}`, {
        askConfirmation: isEditing
      });
    },
    [canUseFullEditFeatures, isCreateMode, isEditing, onForbidden, sheetId]
  );
  const handleOpenCreateTicketMode = (0, import_react3.useCallback)(() => {
    openTicketsFromSheet("new");
  }, [openTicketsFromSheet]);
  const handleOpenLinkTicketMode = (0, import_react3.useCallback)(() => {
    openTicketsFromSheet("link");
  }, [openTicketsFromSheet]);
  const navigateToCreatedSheet = (0, import_react3.useCallback)((createdSheetId) => {
    const safeCreatedSheetId = safeText(createdSheetId);
    if (!safeCreatedSheetId) return;
    const targetUrl = `/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(safeCreatedSheetId)}`;
    navigateToExpenseUrl(targetUrl);
  }, []);
  const navigateToLineDetail = (0, import_react3.useCallback)(
    (lineRecId, options) => {
      const safeLineId = safeText(lineRecId);
      const safeSheetId = safeText(sheetId);
      if (!safeLineId || !safeSheetId) return;
      const safeMode = options?.mode === "edit" ? "edit" : "";
      const targetUrl = `/Gastos/ExpenseSheetLineDetail?hojaGastosId=${encodeURIComponent(safeSheetId)}&lineRecId=${encodeURIComponent(safeLineId)}${safeMode ? `&mode=${safeMode}` : ""}`;
      navigateToExpenseUrl(targetUrl, {
        askConfirmation: options?.askConfirmation ?? true,
        bypassGuardOnce: options?.bypassGuardOnce ?? false
      });
    },
    [sheetId]
  );
  return {
    header,
    lines,
    linePage,
    isLoading,
    errorMessage,
    busy,
    status,
    isEditing,
    modalError,
    draftDescription,
    draftProjectId,
    draftCurrencyCode,
    draftExchangeRate,
    draftEstadoComentarios,
    officialExchangeRateValue,
    officialExchangeRateRawValue,
    officialExchangeRateDate,
    officialExchangeRateSource,
    isExchangeRateLoading,
    exchangeRateMessage,
    exchangeRateMessageIsError,
    projectValue,
    isSheetApproved,
    isSheetPaid,
    isSheetLocked,
    exchangeRateValue,
    showExchangeRate,
    normalizedDraftCurrency,
    exchangeRateBaseCurrency,
    exchangeRateReferenceAmount: EXCHANGE_RATE_REFERENCE_AMOUNT,
    exchangeRateValidationMessage,
    detailPolicy,
    isManagingOtherUser,
    canEditStatusCommentCurrent,
    canEditAnyCurrent,
    canUseFullEditFeatures,
    canEditHeaderFieldsCurrent,
    isCurrencyLockedByLines,
    isExchangeRateLockedByLines,
    setLinePage,
    setLines,
    setBusy,
    setStatus,
    setIsEditing,
    setModalError,
    setDraftDescription,
    setDraftProjectId,
    setDraftCurrencyCode,
    setDraftExchangeRate,
    setDraftEstadoComentarios,
    handleEnableEdit,
    handleCancelEdit,
    handleOpenCreateSheetMode,
    handleOpenCreateLineMode,
    handleOpenCreateTicketMode,
    handleOpenLinkTicketMode,
    navigateToCreatedSheet,
    navigateToLineDetail
  };
};

// Web/wwwroot/react/src/pages/gastos/detail/ExpenseSheetDetailIcons.tsx
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var NewTicketIcon = () => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true", className: "size-5", children: [
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 20h-5a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v2" }),
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14.362 11.15a3 3 0 1 0 -4.144 4.263" }),
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 21v-4a2 2 0 1 1 4 0v4" }),
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 19h4" }),
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 15v6" })
] });
var LinkTicketIcon = () => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true", className: "size-5", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" }) });
var NewLineIcon = () => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true", className: "size-5", children: [
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 19c3.333 -2 5 -4 5 -6c0 -3 -1 -3 -2 -3s-2.032 1.085 -2 3c.034 2.048 1.658 2.877 2.5 4c1.5 2 2.5 2.5 3.5 1c.667 -1 1.167 -1.833 1.5 -2.5c1 2.333 2.333 3.5 4 3.5h2.5" }),
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2" }),
  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16 7h4" })
] });

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetDetailPageController.tsx
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
var LINES_PAGE_SIZE = 6;
var EXPENSE_STATUS_APPROVAL_REQUESTED = 1;
var pagedSlice = (items, page, pageSize) => {
  if (!items.length) return [];
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * pageSize;
  return items.slice(start, start + pageSize);
};
var hasPositiveTotalAmount = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0;
};
var bootstrapExpenseApiAuth = () => {
  configureExpenseApiAuth({
    token: safeText(window.__IND_API_TOKEN__),
    entraOid: safeText(window.__IND_ENTRA_OID__),
    appCode: safeText(window.__IND_APP_CODE__)
  });
};
var useExpenseSheetDetailPageController = () => {
  const {
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    managementBootstrapReady
  } = useAuthContext();
  const hasAccess = canAccess("GASTOS_HOJA_GASTO", "View");
  const canCreateExpense = canAccess("GASTOS_HOJA_GASTO", "Add");
  const sheetId = safeText(window.__EXPENSE_SHEET_ID__);
  const sheetMode = safeText(window.__EXPENSE_SHEET_MODE__).toLowerCase();
  const isCreateMode = sheetMode === "create";
  const isManagingOtherUserBySelection = isManagingOtherExpenseRecord({
    canManageOtherUsers,
    currentAxUserId,
    selectedManagedUserId,
    recordOwnerUserId: "",
    isCreateMode
  });
  const canCreateExpenseForSelectedContext = canCreateExpense && !isManagingOtherUserBySelection;
  const lineContainerRef = (0, import_react4.useRef)(null);
  const createdSheetIdRef = (0, import_react4.useRef)("");
  const cameraInputRef = (0, import_react4.useRef)(null);
  const galleryInputRef = (0, import_react4.useRef)(null);
  const [isRedirectingAfterCreate, setIsRedirectingAfterCreate] = (0, import_react4.useState)(false);
  const [statusTransitionComment, setStatusTransitionComment] = (0, import_react4.useState)("");
  const [showStatusTransitionCommentField, setShowStatusTransitionCommentField] = (0, import_react4.useState)(false);
  const statusTransitionCommentRef = (0, import_react4.useRef)("");
  const paginationLabels = (0, import_react4.useMemo)(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last")
    }),
    []
  );
  const detailState = useExpenseSheetDetailState({
    hasAccess,
    canCreateExpense: canCreateExpenseForSelectedContext,
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    sheetId,
    isCreateMode,
    onForbidden: showPermissionModal
  });
  const {
    header,
    lines,
    linePage,
    isLoading,
    errorMessage,
    busy,
    status,
    isEditing,
    modalError,
    draftDescription,
    draftProjectId,
    draftCurrencyCode,
    draftExchangeRate,
    draftEstadoComentarios,
    officialExchangeRateValue,
    officialExchangeRateRawValue,
    officialExchangeRateDate,
    officialExchangeRateSource,
    projectValue,
    detailPolicy,
    isManagingOtherUser,
    isSheetLocked,
    exchangeRateValue,
    showExchangeRate,
    normalizedDraftCurrency,
    exchangeRateBaseCurrency,
    exchangeRateReferenceAmount,
    exchangeRateValidationMessage,
    canEditAnyCurrent,
    canUseFullEditFeatures,
    canEditHeaderFieldsCurrent,
    isCurrencyLockedByLines,
    isExchangeRateLockedByLines,
    setLinePage,
    setBusy,
    setStatus,
    setIsEditing,
    setModalError,
    setDraftDescription,
    setDraftProjectId,
    setDraftCurrencyCode,
    setDraftExchangeRate,
    setDraftEstadoComentarios,
    handleEnableEdit,
    handleCancelEdit,
    handleOpenCreateLineMode,
    handleOpenLinkTicketMode,
    navigateToCreatedSheet,
    navigateToLineDetail
  } = detailState;
  const canCreateExpenseForCurrentView = canCreateExpense && !isManagingOtherUser;
  const canDeleteExpenseForCurrentView = detailPolicy.canDeleteSheet;
  const canTransitionStatus = detailPolicy.statusActions.length > 0;
  const isReadOnlyMode = detailPolicy.interactionMode === "read_only";
  const currentStatusCode = typeof header?.expenseSheetStatus === "number" ? header.expenseSheetStatus : null;
  const hidesCrudTopbarByStatus = currentStatusCode === EXPENSE_STATUS_APPROVAL_REQUESTED && !canEditAnyCurrent;
  const topbarActionMode = !isCreateMode && (isReadOnlyMode || hidesCrudTopbarByStatus) ? "view_only" : "default";
  const detailPermissionsReady = managementBootstrapReady && (isCreateMode || !!header);
  const { invalidateCachedListForRefetch } = useExpenseSheetsFilterCache();
  const { modal, openConfirm, closeConfirm, handleConfirm } = useConfirmDialog({
    defaultConfirmText: indT("Confirm_Yes", "OK"),
    defaultCancelText: indT("Confirm_No", "Cancel")
  });
  const resetStatusTransitionDialog = (0, import_react4.useCallback)(() => {
    statusTransitionCommentRef.current = "";
    setStatusTransitionComment("");
    setShowStatusTransitionCommentField(false);
  }, []);
  const handleCloseConfirm = (0, import_react4.useCallback)(() => {
    resetStatusTransitionDialog();
    closeConfirm();
  }, [closeConfirm, resetStatusTransitionDialog]);
  const handleModalConfirm = (0, import_react4.useCallback)(async () => {
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
  const handleModalButtonConfirm = (0, import_react4.useCallback)(() => {
    if (!busy && modalError) {
      handleCloseConfirm();
      return;
    }
    void handleModalConfirm();
  }, [busy, handleCloseConfirm, handleModalConfirm, modalError]);
  const visibleLines = (0, import_react4.useMemo)(() => pagedSlice(lines, linePage, LINES_PAGE_SIZE), [linePage, lines]);
  const totalLinePages = Math.ceil((lines.length || 0) / LINES_PAGE_SIZE);
  const totalAmountText = (0, import_react4.useMemo)(
    () => formatAmountWithCurrency(header?.totalAmount ?? null, safeText(header?.currencyCode)),
    [header?.currencyCode, header?.totalAmount]
  );
  const hasStatusActionContent = lines.length > 0 || hasPositiveTotalAmount(header?.totalAmount);
  const areStatusActionsDisabled = !hasStatusActionContent;
  const ownerDisplay = (0, import_react4.useMemo)(() => {
    const ownerUserId = safeText(header?.userId);
    const currentUserId = safeText(currentCrmUserId);
    if (!ownerUserId || !currentUserId || ownerUserId.toUpperCase() === currentUserId.toUpperCase()) {
      return "";
    }
    const ownerName = safeText(header?.userName);
    return ownerName ? `${ownerName} (${ownerUserId})` : ownerUserId;
  }, [currentCrmUserId, header?.userId, header?.userName]);
  const { handleUpdate, handleStatusTransition, handleDelete } = useExpenseSheetDetailMutations({
    busy,
    isEditing,
    isCreateMode,
    isEditLocked: isReadOnlyMode,
    isDeleteLocked: isSheetLocked,
    isCurrencyLockedByLines,
    isExchangeRateLockedByLines,
    lockedCurrencyCode: safeText(header?.currencyCode),
    lockedExchangeRate: safeText(header?.exchRate),
    canCreateExpense: canCreateExpenseForCurrentView,
    canEditExpense: canEditAnyCurrent,
    canDeleteExpense: canDeleteExpenseForCurrentView,
    canEditHeaderFields: canEditHeaderFieldsCurrent,
    canTransitionStatus,
    sheetId,
    draftDescription,
    draftCurrencyCode,
    draftExchangeRate,
    officialExchangeRateValue,
    draftProjectId,
    draftEstadoComentarios,
    currentExpenseSheetStatus: header?.expenseSheetStatus,
    exchangeRateBaseCurrency,
    onCreateSuccess: (createdSheetId) => {
      createdSheetIdRef.current = safeText(createdSheetId);
    },
    setModalError,
    setBusy,
    setStatus,
    setIsEditing
  });
  const handleOpenLineDetail = (0, import_react4.useCallback)(
    async (lineRecId) => {
      const safeLineId = safeText(lineRecId);
      if (!safeLineId || busy || isRedirectingAfterCreate) {
        return;
      }
      if (isEditing && canEditHeaderFieldsCurrent) {
        const ok = await handleUpdate();
        if (!ok) {
          return;
        }
        navigateToLineDetail(safeLineId, {
          mode: "edit",
          askConfirmation: false,
          bypassGuardOnce: true
        });
        return;
      }
      navigateToLineDetail(safeLineId);
    },
    [
      busy,
      canEditHeaderFieldsCurrent,
      handleUpdate,
      isEditing,
      isRedirectingAfterCreate,
      navigateToLineDetail
    ]
  );
  const handleSaveSuccess = (0, import_react4.useCallback)(() => {
    if (isCreateMode) {
      const createdSheetId = safeText(createdSheetIdRef.current);
      if (!createdSheetId) return;
      saveExpenseSheetCreatedReturnContext({
        sheetId: createdSheetId
      });
      setIsRedirectingAfterCreate(true);
      navigateToCreatedSheet(createdSheetId);
      return;
    }
    reloadExpensePage();
  }, [isCreateMode, navigateToCreatedSheet]);
  const handleStatusActionClick = (0, import_react4.useCallback)(
    (action) => {
      if (!hasStatusActionContent) {
        return;
      }
      const actionLabel = indT(action.labelKey, action.fallback);
      const currentStatusLabel = header?.expenseSheetStatus === null || header?.expenseSheetStatus === void 0 ? indT("Common_NoData", "No data") : getExpenseStatusLabel(header.expenseSheetStatus);
      const nextStatusLabel = getExpenseStatusLabel(action.nextStatus);
      const transitionMessage = indFormat(
        "ExpenseSheets_BottomActions_ConfirmTransition",
        "Current status: {0}\nNew status: {1}\n\nDo you want to update the expense sheet status?",
        currentStatusLabel,
        nextStatusLabel
      ).replace(/\\n/g, "\n");
      const initialComment = safeText(header?.estadoComentarios);
      statusTransitionCommentRef.current = initialComment;
      setStatusTransitionComment(initialComment);
      setShowStatusTransitionCommentField(true);
      openConfirm({
        title: actionLabel,
        message: transitionMessage,
        confirmText: actionLabel,
        onConfirm: async () => {
          const ok = await handleStatusTransition(
            action.nextStatus,
            actionLabel,
            statusTransitionCommentRef.current
          );
          if (ok) {
            invalidateCachedListForRefetch();
            resetStatusTransitionDialog();
            closeConfirm();
            reloadExpensePage();
          }
          return ok;
        }
      });
    },
    [
      closeConfirm,
      handleStatusTransition,
      hasStatusActionContent,
      header?.estadoComentarios,
      header?.expenseSheetStatus,
      invalidateCachedListForRefetch,
      openConfirm,
      resetStatusTransitionDialog
    ]
  );
  useExpenseSheetDetailTopbarActions({
    busy: busy || isRedirectingAfterCreate,
    modalOpen: modal.open,
    isEditing,
    isCreateMode,
    actionMode: topbarActionMode,
    isLocked: isSheetLocked,
    isEditLocked: isReadOnlyMode,
    isDeleteLocked: isSheetLocked,
    permissionsReady: detailPermissionsReady,
    canCreateExpense: canCreateExpenseForCurrentView,
    canEditExpense: canEditAnyCurrent,
    canDeleteExpense: canDeleteExpenseForCurrentView,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
    handleUpdate,
    handleDelete,
    onSaveSuccess: handleSaveSuccess,
    onDeleteSuccess: () => {
      invalidateCachedListForRefetch();
      navigateToExpenseUrl("/Gastos/ExpenseSheets");
    },
    openConfirm,
    closeConfirm
  });
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
  const quickTicketFlow = useExpenseSheetQuickTicketFlow({
    sheetId: safeText(header?.hojaGastosId || sheetId),
    projectId: projectValue,
    currencyCode: safeText(header?.currencyCode),
    canCreateExpense: !isCreateMode && detailPolicy.showFab,
    isCreateMode,
    isSheetLocked: !canUseFullEditFeatures,
    linkToSheet: false,
    onForbidden: showPermissionModal,
    onCompleted: (result) => {
      const createdFileId = safeText(result?.fileId);
      if (!createdFileId) {
        reloadExpensePage();
        return;
      }
      if (result?.linkedToSheet === true) {
        reloadExpensePage();
        return;
      }
      const currentSheetId = safeText(header?.hojaGastosId || sheetId);
      const query = new URLSearchParams({
        fileId: createdFileId,
        mode: "edit",
        origin: "sheet-create"
      });
      if (currentSheetId) {
        saveExpenseTicketReturnContext({
          fileId: createdFileId,
          origin: "sheet-create",
          sheetId: currentSheetId
        });
        query.set("sheetId", currentSheetId);
      }
      navigateToExpenseUrl(`/Gastos/TicketDetail?${query.toString()}`);
    }
  });
  const fabMenuItems = (0, import_react4.useMemo)(
    () => [
      {
        id: "new-ticket",
        label: indT("ExpenseSheets_Fab_NewTicket", "Nuevo Ticket"),
        icon: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(NewTicketIcon, {}),
        onClick: quickTicketFlow.openSourcePicker
      },
      {
        id: "link-ticket",
        label: indT("ExpenseSheets_Fab_LinkTicket", "Vincular Ticket"),
        icon: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(LinkTicketIcon, {}),
        onClick: handleOpenLinkTicketMode
      },
      {
        id: "new-line",
        label: indT("ExpenseSheets_Fab_NewLine", "Nueva Linea"),
        icon: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(NewLineIcon, {}),
        onClick: handleOpenCreateLineMode
      }
    ],
    [handleOpenCreateLineMode, handleOpenLinkTicketMode, quickTicketFlow.openSourcePicker]
  );
  const showStatusActionBar = !isCreateMode && !isLoading && !isRedirectingAfterCreate && !errorMessage && detailPolicy.statusActions.length > 0;
  const showFab = !isCreateMode && detailPolicy.showFab;
  const hasVisibleStatusComment = safeText(header?.estadoComentarios).trim().length > 0;
  const statusCommentMode = hasVisibleStatusComment ? "read" : "hidden";
  const modalBody = showStatusTransitionCommentField ? /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_StatusComment", "Status comment") }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      "textarea",
      {
        className: "form-control resize-none",
        rows: 3,
        value: statusTransitionComment,
        onChange: (event) => {
          const nextValue = event.target.value || "";
          statusTransitionCommentRef.current = nextValue;
          setStatusTransitionComment(nextValue);
        },
        "aria-label": indT("ExpenseSheets_Field_StatusComment", "Status comment")
      }
    )
  ] }) : null;
  return {
    sheetId,
    header,
    visibleLines,
    linePage,
    totalLinePages,
    isLoading,
    errorMessage,
    isCreateMode,
    isEditing,
    busy,
    status,
    modalError,
    isRedirectingAfterCreate,
    modal,
    modalLoadingText,
    modalCancelText,
    modalConfirmText,
    modalBody,
    canCreateExpenseForCurrentView,
    canEditHeaderFieldsCurrent,
    canUseFullEditFeatures,
    showStatusActionBar,
    showFab,
    areStatusActionsDisabled,
    fabMenuItems,
    paginationLabels,
    totalAmountText,
    statusCommentMode,
    ownerDisplay,
    projectValue,
    normalizedDraftCurrency,
    exchangeRateBaseCurrency,
    exchangeRateReferenceAmount,
    showExchangeRate,
    exchangeRateValue,
    exchangeRateValidationMessage,
    draftDescription,
    draftProjectId,
    draftCurrencyCode,
    draftExchangeRate,
    draftEstadoComentarios,
    officialExchangeRateRawValue,
    officialExchangeRateDate,
    officialExchangeRateSource,
    isCurrencyLockedByLines,
    isExchangeRateLockedByLines,
    detailPolicy,
    lineContainerRef,
    cameraInputRef,
    galleryInputRef,
    quickTicketFlow,
    setLinePage,
    setDraftDescription,
    setDraftProjectId,
    setDraftCurrencyCode,
    setDraftExchangeRate,
    setDraftEstadoComentarios,
    navigateToLineDetail: handleOpenLineDetail,
    handleModalButtonConfirm,
    handleStatusActionClick,
    closeConfirm: handleCloseConfirm
  };
};

// Web/wwwroot/react/src/pages/gastos/detail/ExpenseSheetDetailPage.tsx
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
var DETAIL_FAB_BOTTOM_WITH_ACTION_BAR = 176;
var EXPENSE_SHEETS_LIST_URL = "/Gastos/ExpenseSheets";
var bootstrapExpenseLinkActingUser = () => {
  const actingUserId = safeText(window.__EXPENSE_ACTING_USER_ID__);
  if (!actingUserId) return;
  setExpenseActingUserOverride(actingUserId);
};
var ExpenseSheetDetailPageContent = () => {
  const controller = useExpenseSheetDetailPageController();
  const { currentAxUserId } = useAuthContext();
  const { readCachedState, saveCachedState } = useExpenseSheetsFilterCache();
  const createdSheetReturnIdRef = import_react5.default.useRef("");
  import_react5.default.useEffect(() => {
    const createdContext = consumeExpenseSheetCreatedReturnContext(controller.sheetId);
    createdSheetReturnIdRef.current = createdContext?.sheetId || "";
  }, [controller.sheetId]);
  const prepareCreatedSheetReturnState = import_react5.default.useCallback(() => {
    const createdSheetId = safeText(createdSheetReturnIdRef.current);
    if (!createdSheetId) return false;
    const today = startOfDay(/* @__PURE__ */ new Date());
    const fromDate = new Date(today);
    fromDate.setDate(today.getDate() - 89);
    saveCachedState({
      filters: {
        fromDate: toIsoDate(fromDate),
        toDate: toIsoDate(today),
        projectId: "",
        hojaGastosId: createdSheetId,
        currencyCode: "",
        managedUserId: safeText(currentAxUserId),
        includeSubordinates: false,
        statusFilter: DEFAULT_EXPENSE_STATUS_FILTER,
        exchangeRateMode: null,
        filter: createdSheetId
      },
      page: 1,
      scrollY: 0,
      items: [],
      total: 0
    });
    createdSheetReturnIdRef.current = "";
    return true;
  }, [currentAxUserId, saveCachedState]);
  const rearmExpenseSheetsReturnState = import_react5.default.useCallback(() => {
    if (prepareCreatedSheetReturnState()) {
      return;
    }
    const cachedState = readCachedState();
    if (!cachedState) return;
    saveCachedState(cachedState);
  }, [prepareCreatedSheetReturnState, readCachedState, saveCachedState]);
  import_react5.default.useEffect(() => {
    const backButton = document.getElementById("globalBackBtn");
    if (!backButton) return;
    backButton.setAttribute("data-back-url", EXPENSE_SHEETS_LIST_URL);
    return () => {
      backButton.removeAttribute("data-back-url");
    };
  }, []);
  import_react5.default.useEffect(() => {
    const backButton = document.getElementById("globalBackBtn");
    if (!backButton) return;
    const handleTopbarBackClick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      const executeBackNavigation = () => {
        rearmExpenseSheetsReturnState();
        window.__indBypassNavigationGuardOnce?.();
        window.location.href = EXPENSE_SHEETS_LIST_URL;
      };
      if (typeof window.__indRequestNavigation === "function") {
        window.__indRequestNavigation(executeBackNavigation);
        return;
      }
      executeBackNavigation();
    };
    backButton.addEventListener("click", handleTopbarBackClick, true);
    return () => {
      backButton.removeEventListener("click", handleTopbarBackClick, true);
    };
  }, [rearmExpenseSheetsReturnState]);
  import_react5.default.useEffect(() => {
    const handleNativeBack = (event) => {
      if (event?.state && event.state.indTrap === true) {
        return;
      }
      const executeBackNavigation = () => {
        rearmExpenseSheetsReturnState();
        window.__indBypassNavigationGuardOnce?.();
        window.location.replace(EXPENSE_SHEETS_LIST_URL);
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
  }, [rearmExpenseSheetsReturnState]);
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "space-y-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      ExpenseSheetDetailOverlays_default,
      {
        modal: controller.modal,
        modalError: controller.modalError,
        status: controller.status,
        busy: controller.busy,
        isRedirectingAfterCreate: controller.isRedirectingAfterCreate,
        modalLoadingText: controller.modalLoadingText,
        modalCancelText: controller.modalCancelText,
        modalConfirmText: controller.modalConfirmText,
        modalBody: controller.modalBody,
        cameraInputRef: controller.cameraInputRef,
        galleryInputRef: controller.galleryInputRef,
        sourcePickerOpen: controller.quickTicketFlow.sourcePickerOpen,
        quickTicketBusy: controller.quickTicketFlow.busy,
        quickTicketProgressMessage: controller.quickTicketFlow.progressMessage,
        quickTicketProgressStages: controller.quickTicketFlow.progressStages,
        quickTicketElapsedMs: controller.quickTicketFlow.progressElapsedMs,
        quickTicketErrorMessage: controller.quickTicketFlow.errorMessage,
        quickTicketAttemptId: controller.quickTicketFlow.attemptId,
        quickTicketTraceList: controller.quickTicketFlow.traceList,
        hasPendingUploadRetry: controller.quickTicketFlow.hasPendingUploadRetry,
        hasPartialTicketFailure: controller.quickTicketFlow.hasPartialTicketFailure,
        onConfirm: controller.handleModalButtonConfirm,
        onCancel: controller.closeConfirm,
        onSelectedCameraFile: (file) => {
          void controller.quickTicketFlow.handleSelectedFile(file, "camera");
        },
        onSelectedGalleryFile: (file) => {
          void controller.quickTicketFlow.handleSelectedFile(file, "gallery");
        },
        onSelectFromCamera: () => {
          void controller.quickTicketFlow.selectFromCamera(controller.cameraInputRef.current);
        },
        onSelectFromGallery: () => controller.quickTicketFlow.selectFromGallery(controller.galleryInputRef.current),
        onCloseSourcePicker: controller.quickTicketFlow.closeSourcePicker,
        onRetryPendingUpload: () => {
          void controller.quickTicketFlow.retryPendingUpload();
        },
        onClearQuickTicketError: controller.quickTicketFlow.clearError
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
      "div",
      {
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700",
        style: { display: controller.isLoading || controller.isRedirectingAfterCreate ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { className: "ind-spinner size-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ]
      }
    ),
    controller.errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "text-danger", children: controller.errorMessage }) : null,
    !controller.isLoading && !controller.isRedirectingAfterCreate && !controller.errorMessage && controller.header ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      ExpenseSheetHeaderForm_default,
      {
        mode: {
          isCreateMode: controller.isCreateMode,
          isEditing: controller.isEditing,
          canEditHeaderFields: controller.canEditHeaderFieldsCurrent,
          statusCommentMode: controller.statusCommentMode
        },
        currencyLocks: {
          isCurrencyLockedByLines: controller.isCurrencyLockedByLines,
          isExchangeRateLockedByLines: controller.isExchangeRateLockedByLines,
          showExchangeRate: controller.showExchangeRate
        },
        header: controller.header,
        ownerDisplay: controller.ownerDisplay,
        projectValue: controller.projectValue,
        normalizedDraftCurrency: controller.normalizedDraftCurrency,
        exchangeRateBaseCurrency: controller.exchangeRateBaseCurrency,
        exchangeRateReferenceAmount: controller.exchangeRateReferenceAmount,
        exchangeRateValue: controller.exchangeRateValue,
        exchangeRateValidationMessage: controller.exchangeRateValidationMessage,
        totalAmountText: controller.totalAmountText,
        draftDescription: controller.draftDescription,
        draftProjectId: controller.draftProjectId,
        draftCurrencyCode: controller.draftCurrencyCode,
        draftExchangeRate: controller.draftExchangeRate,
        officialExchangeRateRawValue: controller.officialExchangeRateRawValue,
        officialExchangeRateDate: controller.officialExchangeRateDate,
        officialExchangeRateSource: controller.officialExchangeRateSource,
        onDraftDescriptionChange: controller.setDraftDescription,
        onDraftProjectIdChange: controller.setDraftProjectId,
        onDraftCurrencyCodeChange: controller.setDraftCurrencyCode,
        onDraftExchangeRateChange: controller.setDraftExchangeRate
      }
    ) : null,
    !controller.isCreateMode && !controller.isLoading && !controller.isRedirectingAfterCreate && !controller.errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      ExpenseLinesTimeline_default,
      {
        visibleLines: controller.visibleLines,
        currencyCode: safeText(controller.header?.currencyCode),
        totalLinePages: controller.totalLinePages,
        linePage: controller.linePage,
        linesLabel: indT("ExpenseSheets_Lines", "Lines"),
        emptyText: indT("ExpenseSheets_NoLines", "No lines for this expense sheet."),
        paginationLabels: controller.paginationLabels,
        containerRef: controller.lineContainerRef,
        onLinePageChange: controller.setLinePage,
        onOpenLine: controller.navigateToLineDetail
      }
    ) : null,
    controller.showStatusActionBar ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      ExpenseSheetStatusActionBar_default,
      {
        actions: controller.detailPolicy.statusActions,
        busy: controller.busy || controller.isRedirectingAfterCreate,
        disabled: controller.areStatusActionsDisabled,
        onActionClick: controller.handleStatusActionClick
      }
    ) : null,
    controller.showFab ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      FloatingActionButton_default,
      {
        ariaLabel: indT("ExpenseSheets_Fab_Actions", "Acciones r\xE1pidas"),
        size: 76,
        right: 16,
        bottom: controller.showStatusActionBar ? DETAIL_FAB_BOTTOM_WITH_ACTION_BAR : 24,
        menuAriaLabel: indT("ExpenseSheets_Fab_Actions", "Acciones r\xE1pidas"),
        menuItems: controller.fabMenuItems
      }
    ) : null
  ] });
};
var ExpenseSheetDetailPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(VisitasPageProviders_default, { enableExpenseManagement: true, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ExpenseSheetDetailPageContent, {}) });
};
var mount = () => {
  bootstrapExpenseApiAuth();
  bootstrapExpenseLinkActingUser();
  const rootEl = document.getElementById("expense-sheet-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ExpenseSheetDetailPage, {}));
};
mountWhenDocumentReady(mount);
var ExpenseSheetDetailPage_default = ExpenseSheetDetailPage;
export {
  ExpenseSheetDetailPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvRXhwZW5zZVNoZWV0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvbi50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb25zdGFudHMvZXhjaGFuZ2VSYXRlRW50cnlNb2RlQ2F0YWxvZy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0SGVhZGVyRm9ybS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VMaW5lc1RpbWVsaW5lLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC9FeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25CYXIudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL0V4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC91c2VFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udHJvbGxlci50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dC50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC91c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC91c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC9FeHBlbnNlU2hlZXREZXRhaWxJY29ucy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XHJcbmltcG9ydCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nQWN0aW9uQnV0dG9uLnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VBdXRoQ29udGV4dCB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlU2hlZXRIZWFkZXJGb3JtLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZUxpbmVzVGltZWxpbmUgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZUxpbmVzVGltZWxpbmUudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25CYXIgZnJvbSBcIi4vRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXMgZnJvbSBcIi4vRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXMudHN4XCI7XHJcbmltcG9ydCB7IGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoLCB1c2VFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udHJvbGxlciB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250cm9sbGVyLnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcclxuaW1wb3J0IHsgREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VTdGF0dXNDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0LCBzdGFydE9mRGF5LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IGNvbnN1bWVFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dC50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlIH0gZnJvbSBcIi4uL2xpc3QvdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlLnRzXCI7XG5pbXBvcnQgeyBzZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBY3RpbmdVc2VyLnRzXCI7XG5cclxuY29uc3QgREVUQUlMX0ZBQl9CT1RUT01fV0lUSF9BQ1RJT05fQkFSID0gMTc2O1xyXG5jb25zdCBFWFBFTlNFX1NIRUVUU19MSVNUX1VSTCA9IFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXRzXCI7XG5cbi8vIEFwcGxpZXMgdGhlIHNlcnZlci1yZXNvbHZlZCBhY3RpbmcgdXNlciBmb3IgZW1haWwgZGVlcCBsaW5rcyBiZWZvcmUgZGV0YWlsIEFQSSBjYWxscyBydW4uXG5jb25zdCBib290c3RyYXBFeHBlbnNlTGlua0FjdGluZ1VzZXIgPSAoKSA9PiB7XG4gIGNvbnN0IGFjdGluZ1VzZXJJZCA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfQUNUSU5HX1VTRVJfSURfXyk7XG4gIGlmICghYWN0aW5nVXNlcklkKSByZXR1cm47XG4gIHNldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUoYWN0aW5nVXNlcklkKTtcbn07XG5cclxuY29uc3QgRXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRlbnQgPSAoKSA9PiB7XHJcbiAgY29uc3QgY29udHJvbGxlciA9IHVzZUV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250cm9sbGVyKCk7XHJcbiAgY29uc3QgeyBjdXJyZW50QXhVc2VySWQgfSA9IHVzZUF1dGhDb250ZXh0KCk7XHJcbiAgY29uc3QgeyByZWFkQ2FjaGVkU3RhdGUsIHNhdmVDYWNoZWRTdGF0ZSB9ID0gdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlKCk7XHJcbiAgY29uc3QgY3JlYXRlZFNoZWV0UmV0dXJuSWRSZWYgPSBSZWFjdC51c2VSZWYoXCJcIik7XHJcblxyXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBjcmVhdGVkQ29udGV4dCA9IGNvbnN1bWVFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dChjb250cm9sbGVyLnNoZWV0SWQpO1xyXG4gICAgY3JlYXRlZFNoZWV0UmV0dXJuSWRSZWYuY3VycmVudCA9IGNyZWF0ZWRDb250ZXh0Py5zaGVldElkIHx8IFwiXCI7XHJcbiAgfSwgW2NvbnRyb2xsZXIuc2hlZXRJZF0pO1xyXG5cclxuICBjb25zdCBwcmVwYXJlQ3JlYXRlZFNoZWV0UmV0dXJuU3RhdGUgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBjcmVhdGVkU2hlZXRJZCA9IHNhZmVUZXh0KGNyZWF0ZWRTaGVldFJldHVybklkUmVmLmN1cnJlbnQpO1xyXG4gICAgaWYgKCFjcmVhdGVkU2hlZXRJZCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcclxuICAgIGNvbnN0IGZyb21EYXRlID0gbmV3IERhdGUodG9kYXkpO1xyXG4gICAgZnJvbURhdGUuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSA4OSk7XHJcblxyXG4gICAgc2F2ZUNhY2hlZFN0YXRlKHtcclxuICAgICAgZmlsdGVyczoge1xyXG4gICAgICAgIGZyb21EYXRlOiB0b0lzb0RhdGUoZnJvbURhdGUpLFxyXG4gICAgICAgIHRvRGF0ZTogdG9Jc29EYXRlKHRvZGF5KSxcclxuICAgICAgICBwcm9qZWN0SWQ6IFwiXCIsXHJcbiAgICAgICAgaG9qYUdhc3Rvc0lkOiBjcmVhdGVkU2hlZXRJZCxcclxuICAgICAgICBjdXJyZW5jeUNvZGU6IFwiXCIsXHJcbiAgICAgICAgbWFuYWdlZFVzZXJJZDogc2FmZVRleHQoY3VycmVudEF4VXNlcklkKSxcclxuICAgICAgICBpbmNsdWRlU3Vib3JkaW5hdGVzOiBmYWxzZSxcclxuICAgICAgICBzdGF0dXNGaWx0ZXI6IERFRkFVTFRfRVhQRU5TRV9TVEFUVVNfRklMVEVSLFxyXG4gICAgICAgIGV4Y2hhbmdlUmF0ZU1vZGU6IG51bGwsXHJcbiAgICAgICAgZmlsdGVyOiBjcmVhdGVkU2hlZXRJZCxcclxuICAgICAgfSxcclxuICAgICAgcGFnZTogMSxcclxuICAgICAgc2Nyb2xsWTogMCxcclxuICAgICAgaXRlbXM6IFtdLFxyXG4gICAgICB0b3RhbDogMCxcclxuICAgIH0pO1xyXG5cclxuICAgIGNyZWF0ZWRTaGVldFJldHVybklkUmVmLmN1cnJlbnQgPSBcIlwiO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSwgW2N1cnJlbnRBeFVzZXJJZCwgc2F2ZUNhY2hlZFN0YXRlXSk7XHJcblxyXG4gIGNvbnN0IHJlYXJtRXhwZW5zZVNoZWV0c1JldHVyblN0YXRlID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKHByZXBhcmVDcmVhdGVkU2hlZXRSZXR1cm5TdGF0ZSgpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjYWNoZWRTdGF0ZSA9IHJlYWRDYWNoZWRTdGF0ZSgpO1xyXG4gICAgaWYgKCFjYWNoZWRTdGF0ZSkgcmV0dXJuO1xyXG4gICAgc2F2ZUNhY2hlZFN0YXRlKGNhY2hlZFN0YXRlKTtcclxuICB9LCBbcHJlcGFyZUNyZWF0ZWRTaGVldFJldHVyblN0YXRlLCByZWFkQ2FjaGVkU3RhdGUsIHNhdmVDYWNoZWRTdGF0ZV0pO1xyXG5cclxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgYmFja0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsQmFja0J0blwiKTtcclxuICAgIGlmICghYmFja0J1dHRvbikgcmV0dXJuO1xyXG5cclxuICAgIGJhY2tCdXR0b24uc2V0QXR0cmlidXRlKFwiZGF0YS1iYWNrLXVybFwiLCBFWFBFTlNFX1NIRUVUU19MSVNUX1VSTCk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgYmFja0J1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLWJhY2stdXJsXCIpO1xyXG4gICAgfTtcclxuICB9LCBbXSk7XHJcblxyXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBiYWNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxCYWNrQnRuXCIpO1xyXG4gICAgaWYgKCFiYWNrQnV0dG9uKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaGFuZGxlVG9wYmFyQmFja0NsaWNrID0gKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICBjb25zdCBleGVjdXRlQmFja05hdmlnYXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgcmVhcm1FeHBlbnNlU2hlZXRzUmV0dXJuU3RhdGUoKTtcclxuICAgICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IEVYUEVOU0VfU0hFRVRTX0xJU1RfVVJMO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuX19pbmRSZXF1ZXN0TmF2aWdhdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24oZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGV4ZWN1dGVCYWNrTmF2aWdhdGlvbigpO1xyXG4gICAgfTtcclxuXHJcbiAgICBiYWNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVUb3BiYXJCYWNrQ2xpY2ssIHRydWUpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgYmFja0J1dHRvbi5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlVG9wYmFyQmFja0NsaWNrLCB0cnVlKTtcclxuICAgIH07XHJcbiAgfSwgW3JlYXJtRXhwZW5zZVNoZWV0c1JldHVyblN0YXRlXSk7XHJcblxyXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBoYW5kbGVOYXRpdmVCYWNrID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChldmVudD8uc3RhdGUgJiYgZXZlbnQuc3RhdGUuaW5kVHJhcCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIHJlYXJtRXhwZW5zZVNoZWV0c1JldHVyblN0YXRlKCk7XHJcbiAgICAgICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoRVhQRU5TRV9TSEVFVFNfTElTVF9VUkwpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuX19pbmRSZXF1ZXN0TmF2aWdhdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24oZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGV4ZWN1dGVCYWNrTmF2aWdhdGlvbigpO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGhhbmRsZU5hdGl2ZUJhY2spO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBoYW5kbGVOYXRpdmVCYWNrKTtcclxuICAgIH07XHJcbiAgfSwgW3JlYXJtRXhwZW5zZVNoZWV0c1JldHVyblN0YXRlXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxyXG4gICAgICA8RXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXNcclxuICAgICAgICBtb2RhbD17Y29udHJvbGxlci5tb2RhbH1cclxuICAgICAgICBtb2RhbEVycm9yPXtjb250cm9sbGVyLm1vZGFsRXJyb3J9XHJcbiAgICAgICAgc3RhdHVzPXtjb250cm9sbGVyLnN0YXR1c31cclxuICAgICAgICBidXN5PXtjb250cm9sbGVyLmJ1c3l9XHJcbiAgICAgICAgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlPXtjb250cm9sbGVyLmlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZX1cclxuICAgICAgICBtb2RhbExvYWRpbmdUZXh0PXtjb250cm9sbGVyLm1vZGFsTG9hZGluZ1RleHR9XHJcbiAgICAgICAgbW9kYWxDYW5jZWxUZXh0PXtjb250cm9sbGVyLm1vZGFsQ2FuY2VsVGV4dH1cclxuICAgICAgICBtb2RhbENvbmZpcm1UZXh0PXtjb250cm9sbGVyLm1vZGFsQ29uZmlybVRleHR9XHJcbiAgICAgICAgbW9kYWxCb2R5PXtjb250cm9sbGVyLm1vZGFsQm9keX1cclxuICAgICAgICBjYW1lcmFJbnB1dFJlZj17Y29udHJvbGxlci5jYW1lcmFJbnB1dFJlZn1cclxuICAgICAgICBnYWxsZXJ5SW5wdXRSZWY9e2NvbnRyb2xsZXIuZ2FsbGVyeUlucHV0UmVmfVxyXG4gICAgICAgIHNvdXJjZVBpY2tlck9wZW49e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnNvdXJjZVBpY2tlck9wZW59XHJcbiAgICAgICAgcXVpY2tUaWNrZXRCdXN5PXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5idXN5fVxyXG4gICAgICAgIHF1aWNrVGlja2V0UHJvZ3Jlc3NNZXNzYWdlPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5wcm9ncmVzc01lc3NhZ2V9XHJcbiAgICAgICAgcXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlcz17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cucHJvZ3Jlc3NTdGFnZXN9XHJcbiAgICAgICAgcXVpY2tUaWNrZXRFbGFwc2VkTXM9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnByb2dyZXNzRWxhcHNlZE1zfVxyXG4gICAgICAgIHF1aWNrVGlja2V0RXJyb3JNZXNzYWdlPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5lcnJvck1lc3NhZ2V9XHJcbiAgICAgICAgcXVpY2tUaWNrZXRBdHRlbXB0SWQ9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmF0dGVtcHRJZH1cclxuICAgICAgICBxdWlja1RpY2tldFRyYWNlTGlzdD17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cudHJhY2VMaXN0fVxyXG4gICAgICAgIGhhc1BlbmRpbmdVcGxvYWRSZXRyeT17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuaGFzUGVuZGluZ1VwbG9hZFJldHJ5fVxyXG4gICAgICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5oYXNQYXJ0aWFsVGlja2V0RmFpbHVyZX1cclxuICAgICAgICBvbkNvbmZpcm09e2NvbnRyb2xsZXIuaGFuZGxlTW9kYWxCdXR0b25Db25maXJtfVxyXG4gICAgICAgIG9uQ2FuY2VsPXtjb250cm9sbGVyLmNsb3NlQ29uZmlybX1cclxuICAgICAgICBvblNlbGVjdGVkQ2FtZXJhRmlsZT17KGZpbGUpID0+IHtcclxuICAgICAgICAgIHZvaWQgY29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuaGFuZGxlU2VsZWN0ZWRGaWxlKGZpbGUsIFwiY2FtZXJhXCIpO1xyXG4gICAgICAgIH19XHJcbiAgICAgICAgb25TZWxlY3RlZEdhbGxlcnlGaWxlPXsoZmlsZSkgPT4ge1xyXG4gICAgICAgICAgdm9pZCBjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5oYW5kbGVTZWxlY3RlZEZpbGUoZmlsZSwgXCJnYWxsZXJ5XCIpO1xyXG4gICAgICAgIH19XHJcbiAgICAgICAgb25TZWxlY3RGcm9tQ2FtZXJhPXsoKSA9PiB7XHJcbiAgICAgICAgICB2b2lkIGNvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnNlbGVjdEZyb21DYW1lcmEoY29udHJvbGxlci5jYW1lcmFJbnB1dFJlZi5jdXJyZW50KTtcclxuICAgICAgICB9fVxyXG4gICAgICAgIG9uU2VsZWN0RnJvbUdhbGxlcnk9eygpID0+IGNvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnNlbGVjdEZyb21HYWxsZXJ5KGNvbnRyb2xsZXIuZ2FsbGVyeUlucHV0UmVmLmN1cnJlbnQpfVxyXG4gICAgICAgIG9uQ2xvc2VTb3VyY2VQaWNrZXI9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmNsb3NlU291cmNlUGlja2VyfVxyXG4gICAgICAgIG9uUmV0cnlQZW5kaW5nVXBsb2FkPXsoKSA9PiB7XG4gICAgICAgICAgdm9pZCBjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5yZXRyeVBlbmRpbmdVcGxvYWQoKTtcbiAgICAgICAgfX1cbiAgICAgICAgb25DbGVhclF1aWNrVGlja2V0RXJyb3I9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmNsZWFyRXJyb3J9XG4gICAgICAvPlxuXHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIlxyXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGNvbnRyb2xsZXIuaXNMb2FkaW5nIHx8IGNvbnRyb2xsZXIuaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBzaXplLTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtjb250cm9sbGVyLmVycm9yTWVzc2FnZSA/IDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57Y29udHJvbGxlci5lcnJvck1lc3NhZ2V9PC9kaXY+IDogbnVsbH1cclxuXHJcbiAgICAgIHshY29udHJvbGxlci5pc0xvYWRpbmcgJiYgIWNvbnRyb2xsZXIuaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlICYmICFjb250cm9sbGVyLmVycm9yTWVzc2FnZSAmJiBjb250cm9sbGVyLmhlYWRlciA/IChcbiAgICAgICAgPEV4cGVuc2VTaGVldEhlYWRlckZvcm1cbiAgICAgICAgICBtb2RlPXt7XG4gICAgICAgICAgICBpc0NyZWF0ZU1vZGU6IGNvbnRyb2xsZXIuaXNDcmVhdGVNb2RlLFxuICAgICAgICAgICAgaXNFZGl0aW5nOiBjb250cm9sbGVyLmlzRWRpdGluZyxcbiAgICAgICAgICAgIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGNvbnRyb2xsZXIuY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXG4gICAgICAgICAgICBzdGF0dXNDb21tZW50TW9kZTogY29udHJvbGxlci5zdGF0dXNDb21tZW50TW9kZSxcbiAgICAgICAgICB9fVxuICAgICAgICAgIGN1cnJlbmN5TG9ja3M9e3tcbiAgICAgICAgICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzOiBjb250cm9sbGVyLmlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxuICAgICAgICAgICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzOiBjb250cm9sbGVyLmlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcbiAgICAgICAgICAgIHNob3dFeGNoYW5nZVJhdGU6IGNvbnRyb2xsZXIuc2hvd0V4Y2hhbmdlUmF0ZSxcbiAgICAgICAgICB9fVxuICAgICAgICAgIGhlYWRlcj17Y29udHJvbGxlci5oZWFkZXJ9XG4gICAgICAgICAgb3duZXJEaXNwbGF5PXtjb250cm9sbGVyLm93bmVyRGlzcGxheX1cbiAgICAgICAgICBwcm9qZWN0VmFsdWU9e2NvbnRyb2xsZXIucHJvamVjdFZhbHVlfVxuICAgICAgICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5PXtjb250cm9sbGVyLm5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5fVxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeT17Y29udHJvbGxlci5leGNoYW5nZVJhdGVCYXNlQ3VycmVuY3l9XG4gICAgICAgICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50PXtjb250cm9sbGVyLmV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudH1cbiAgICAgICAgICBleGNoYW5nZVJhdGVWYWx1ZT17Y29udHJvbGxlci5leGNoYW5nZVJhdGVWYWx1ZX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZT17Y29udHJvbGxlci5leGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZX1cclxuICAgICAgICAgIHRvdGFsQW1vdW50VGV4dD17Y29udHJvbGxlci50b3RhbEFtb3VudFRleHR9XHJcbiAgICAgICAgICBkcmFmdERlc2NyaXB0aW9uPXtjb250cm9sbGVyLmRyYWZ0RGVzY3JpcHRpb259XHJcbiAgICAgICAgICBkcmFmdFByb2plY3RJZD17Y29udHJvbGxlci5kcmFmdFByb2plY3RJZH1cclxuICAgICAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlPXtjb250cm9sbGVyLmRyYWZ0Q3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgZHJhZnRFeGNoYW5nZVJhdGU9e2NvbnRyb2xsZXIuZHJhZnRFeGNoYW5nZVJhdGV9XHJcbiAgICAgICAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlPXtjb250cm9sbGVyLm9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWV9XHJcbiAgICAgICAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGU9e2NvbnRyb2xsZXIub2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlfVxyXG4gICAgICAgICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2U9e2NvbnRyb2xsZXIub2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2V9XHJcbiAgICAgICAgICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U9e2NvbnRyb2xsZXIuc2V0RHJhZnREZXNjcmlwdGlvbn1cclxuICAgICAgICAgIG9uRHJhZnRQcm9qZWN0SWRDaGFuZ2U9e2NvbnRyb2xsZXIuc2V0RHJhZnRQcm9qZWN0SWR9XHJcbiAgICAgICAgICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlPXtjb250cm9sbGVyLnNldERyYWZ0Q3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZT17Y29udHJvbGxlci5zZXREcmFmdEV4Y2hhbmdlUmF0ZX1cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHshY29udHJvbGxlci5pc0NyZWF0ZU1vZGUgJiYgIWNvbnRyb2xsZXIuaXNMb2FkaW5nICYmICFjb250cm9sbGVyLmlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSAmJiAhY29udHJvbGxlci5lcnJvck1lc3NhZ2UgPyAoXHJcbiAgICAgICAgPEV4cGVuc2VMaW5lc1RpbWVsaW5lXHJcbiAgICAgICAgICB2aXNpYmxlTGluZXM9e2NvbnRyb2xsZXIudmlzaWJsZUxpbmVzfVxyXG4gICAgICAgICAgY3VycmVuY3lDb2RlPXtzYWZlVGV4dChjb250cm9sbGVyLmhlYWRlcj8uY3VycmVuY3lDb2RlKX1cclxuICAgICAgICAgIHRvdGFsTGluZVBhZ2VzPXtjb250cm9sbGVyLnRvdGFsTGluZVBhZ2VzfVxyXG4gICAgICAgICAgbGluZVBhZ2U9e2NvbnRyb2xsZXIubGluZVBhZ2V9XHJcbiAgICAgICAgICBsaW5lc0xhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lc1wiLCBcIkxpbmVzXCIpfVxyXG4gICAgICAgICAgZW1wdHlUZXh0PXtpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob0xpbmVzXCIsIFwiTm8gbGluZXMgZm9yIHRoaXMgZXhwZW5zZSBzaGVldC5cIil9XHJcbiAgICAgICAgICBwYWdpbmF0aW9uTGFiZWxzPXtjb250cm9sbGVyLnBhZ2luYXRpb25MYWJlbHN9XHJcbiAgICAgICAgICBjb250YWluZXJSZWY9e2NvbnRyb2xsZXIubGluZUNvbnRhaW5lclJlZn1cclxuICAgICAgICAgIG9uTGluZVBhZ2VDaGFuZ2U9e2NvbnRyb2xsZXIuc2V0TGluZVBhZ2V9XHJcbiAgICAgICAgICBvbk9wZW5MaW5lPXtjb250cm9sbGVyLm5hdmlnYXRlVG9MaW5lRGV0YWlsfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAge2NvbnRyb2xsZXIuc2hvd1N0YXR1c0FjdGlvbkJhciA/IChcclxuICAgICAgICA8RXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyXHJcbiAgICAgICAgICBhY3Rpb25zPXtjb250cm9sbGVyLmRldGFpbFBvbGljeS5zdGF0dXNBY3Rpb25zfVxyXG4gICAgICAgICAgYnVzeT17Y29udHJvbGxlci5idXN5IHx8IGNvbnRyb2xsZXIuaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e2NvbnRyb2xsZXIuYXJlU3RhdHVzQWN0aW9uc0Rpc2FibGVkfVxyXG4gICAgICAgICAgb25BY3Rpb25DbGljaz17Y29udHJvbGxlci5oYW5kbGVTdGF0dXNBY3Rpb25DbGlja31cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHtjb250cm9sbGVyLnNob3dGYWIgPyAoXHJcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXHJcbiAgICAgICAgICBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgclx1MDBFMXBpZGFzXCIpfVxyXG4gICAgICAgICAgc2l6ZT17NzZ9XHJcbiAgICAgICAgICByaWdodD17MTZ9XHJcbiAgICAgICAgICBib3R0b209e2NvbnRyb2xsZXIuc2hvd1N0YXR1c0FjdGlvbkJhciA/IERFVEFJTF9GQUJfQk9UVE9NX1dJVEhfQUNUSU9OX0JBUiA6IDI0fVxyXG4gICAgICAgICAgbWVudUFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX0FjdGlvbnNcIiwgXCJBY2Npb25lcyByXHUwMEUxcGlkYXNcIil9XHJcbiAgICAgICAgICBtZW51SXRlbXM9e2NvbnRyb2xsZXIuZmFiTWVudUl0ZW1zfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIE1haW4gcGFnZSBlbnRyeSBmb3IgZXhwZW5zZSBzaGVldCBkZXRhaWwuXHJcbmNvbnN0IEV4cGVuc2VTaGVldERldGFpbFBhZ2UgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycyBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD5cclxuICAgICAgPEV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250ZW50IC8+XHJcbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcbiAgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGgoKTtcbiAgYm9vdHN0cmFwRXhwZW5zZUxpbmtBY3RpbmdVc2VyKCk7XG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS1zaGVldC1kZXRhaWwtcm9vdFwiKTtcbiAgaWYgKCFyb290RWwpIHJldHVybjtcbiAgbW91bnRSZWFjdElzbGFuZChyb290RWwsIDxFeHBlbnNlU2hlZXREZXRhaWxQYWdlIC8+KTtcbn07XHJcblxyXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldERldGFpbFBhZ2U7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uIGZyb20gXCIuL0V4cGVuc2VDdXJyZW5jeUZsYWdJY29uLnRzeFwiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XG5cclxudHlwZSBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeUludGVyYWN0aW9uID0ge1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGJvb2xlYW47XG59O1xuXG50eXBlIEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U3RhdGUgPSB7XG4gIGlzRm9yZWlnbkN1cnJlbmN5OiBib29sZWFuO1xuICBzaG93RXhjaGFuZ2VSYXRlOiBib29sZWFuO1xuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogYm9vbGVhbjtcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xufTtcblxudHlwZSBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb25Qcm9wcyA9IHtcbiAgaW50ZXJhY3Rpb246IEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5SW50ZXJhY3Rpb247XG4gIGN1cnJlbmN5U3RhdGU6IEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U3RhdGU7XG4gIGV4cGVuc2VDdXJyZW5jeUxhYmVsOiBzdHJpbmc7XG4gIGhlYWRlckN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBiYXNlQ3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRFeGNoYW5nZVJhdGU6IHN0cmluZztcbiAgZXhjaGFuZ2VSYXRlVmFsdWU6IHN0cmluZztcbiAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2U6IHN0cmluZztcbiAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50OiBudW1iZXI7XG4gIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlOiBzdHJpbmc7XG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbn07XG5cbi8vIE93bnMgdGhlIGN1cnJlbmN5IGFuZCBleGNoYW5nZS1yYXRlIFVJIHNvIHRoZSBoZWFkZXIgZm9ybSBzdGF5cyBjb21wYWN0LlxuY29uc3QgRXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lTZWN0aW9uID0gKHtcbiAgaGVhZGVyQ3VycmVuY3lDb2RlLFxuICBiYXNlQ3VycmVuY3lDb2RlLFxufTogRXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lTZWN0aW9uUHJvcHMpID0+IHtcbiAgY29uc3QgcmVpbWJ1cnNlbWVudEN1cnJlbmN5Q29kZSA9IGJhc2VDdXJyZW5jeUNvZGUgfHwgaGVhZGVyQ3VycmVuY3lDb2RlIHx8IFwiLVwiO1xuICBjb25zdCByZWltYnVyc2VtZW50Q3VycmVuY3lPcHRpb25zID0gUmVhY3QudXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KFxuICAgICgpID0+IFtcbiAgICAgIHtcbiAgICAgICAgdmFsdWU6IHJlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGUsXG4gICAgICAgIHRleHQ6IHJlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGUsXG4gICAgICAgIGljb246IDxFeHBlbnNlQ3VycmVuY3lGbGFnSWNvbiBjdXJyZW5jeUNvZGU9e3JlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGV9IHNpemVDbGFzc05hbWU9XCJoLTYgdy02XCIgLz4sXG4gICAgICB9LFxuICAgIF0sXG4gICAgW3JlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGVdXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Mb2NhbEN1cnJlbmN5XCIsIFwiTG9jYWwgY3VycmVuY3lcIil9XG4gICAgICBvcHRpb25zPXtyZWltYnVyc2VtZW50Q3VycmVuY3lPcHRpb25zfVxuICAgICAgdmFsdWU9e3JlaW1idXJzZW1lbnRDdXJyZW5jeUNvZGV9XG4gICAgICBvbkNoYW5nZT17KCkgPT4gdW5kZWZpbmVkfVxuICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeV9QbGFjZWhvbGRlclwiLCBcIkN1cnJlbmN5IGNvZGVcIil9XG4gICAgICByZWFkT25seVxuICAgICAgZGlzYWJsZWRcbiAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgIHNob3dTZWFyY2hCdXR0b249e2ZhbHNlfVxuICAgICAgc2hvd0xhYmVsXG4gICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxuICAgICAgc2VsZWN0ZWRUZXh0TW9kZT1cInZhbHVlXCJcbiAgICAgIGRyb3Bkb3duTWF4SGVpZ2h0Q2xhc3M9XCJtYXgtaC05NlwiXG4gICAgICBzZWxlY3RlZEljb25DbGFzc05hbWU9XCJoLTYgdy02XCJcbiAgICAgIG9wdGlvbkljb25DbGFzc05hbWU9XCJoLTYgdy02XCJcbiAgICAgIHNlbGVjdGVkSW5wdXRQYWRkaW5nQ2xhc3NOYW1lPVwicGwtMTJcIlxuICAgICAgaWRCYXNlPVwiZXhwZW5zZS1oZWFkZXItbG9jYWwtY3VycmVuY3ktcmVhZG9ubHlcIlxuICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAvPlxuICApO1xufTtcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb247XHJcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDb2RlIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgbWFwV2luZG93RW51bU9wdGlvbnMsIHR5cGUgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuXHJcbnR5cGUgRXhjaGFuZ2VSYXRlTW9kZVVpTWV0YSA9IHtcclxuICBsYWJlbEtleTogc3RyaW5nO1xyXG4gIGZhbGxiYWNrOiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCBFWENIQU5HRV9SQVRFX01PREVfTUVUQTogUGFydGlhbDxSZWNvcmQ8RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDb2RlLCBFeGNoYW5nZVJhdGVNb2RlVWlNZXRhPj4gPSB7XG4gIDA6IHtcclxuICAgIGxhYmVsS2V5OiBcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0V4Y2hhbmdlUmF0ZU1vZGVfT2ZmaWNpYWxcIixcclxuICAgIGZhbGxiYWNrOiBcIlQuQy4gT2ZpY2lhbFwiLFxyXG4gIH0sXHJcbiAgMToge1xyXG4gICAgbGFiZWxLZXk6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9NYW51YWxcIixcclxuICAgIGZhbGxiYWNrOiBcIlQuQy4gTWFudWFsXCIsXHJcbiAgfSxcclxufTtcclxuY29uc3QgRVhDSEFOR0VfUkFURV9NT0RFX0NPREVTOiBFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNvZGVbXSA9IFswLCAxXTtcblxuY29uc3QgZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDYXRhbG9nT3B0aW9ucyA9ICgpOiBFeHBlbnNlU2VsZWN0T3B0aW9uW10gPT4ge1xuICBjb25zdCBzb3VyY2UgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIEFycmF5LmlzQXJyYXkod2luZG93Ll9fRVhQRU5TRV9FWENIQU5HRV9SQVRFX01PREVTX18pXG4gICAgPyB3aW5kb3cuX19FWFBFTlNFX0VYQ0hBTkdFX1JBVEVfTU9ERVNfX1xuICAgIDogW107XG5cbiAgcmV0dXJuIG1hcFdpbmRvd0VudW1PcHRpb25zKHNvdXJjZSkuZmlsdGVyKChvcHRpb24pID0+IHtcbiAgICBjb25zdCBwYXJzZWQgPSBOdW1iZXIob3B0aW9uLnZhbHVlKTtcbiAgICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpICYmIHBhcnNlZCA+PSAwO1xuICB9KTtcbn07XG5cbmNvbnN0IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ2F0YWxvZ0xhYmVsID0gKHZhbHVlOiBFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNvZGUpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBtYXRjaCA9IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ2F0YWxvZ09wdGlvbnMoKS5maW5kKChvcHRpb24pID0+IE51bWJlcihvcHRpb24udmFsdWUpID09PSB2YWx1ZSk7XG4gIHJldHVybiBtYXRjaD8udGV4dCB8fCBcIlwiO1xufTtcblxuLy8gS2VlcHMgZXhjaGFuZ2UgcmF0ZSBtb2RlIHZhbHVlcyBjb25zdHJhaW5lZCB0byBub24tbmVnYXRpdmUgbnVtZXJpYyBlbnVtIGNvZGVzLlxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDb2RlIHwgbnVsbCA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IFN0cmluZyh2YWx1ZSkudHJpbSgpID09PSBcIlwiKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgaWYgKE51bWJlci5pc0ludGVnZXIocGFyc2VkKSAmJiBwYXJzZWQgPj0gMCkge1xuICAgIHJldHVybiBwYXJzZWQ7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXHJcbi8vIEJ1aWxkcyBmaXhlZCBvcHRpb25zIGZvciB0aGUgZXhjaGFuZ2UgcmF0ZSBtb2RlIGZpbHRlci5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZU9wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcbiAgY29uc3QgY2F0YWxvZ09wdGlvbnMgPSBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNhdGFsb2dPcHRpb25zKCk7XG4gIGlmIChjYXRhbG9nT3B0aW9ucy5sZW5ndGggPiAwKSByZXR1cm4gY2F0YWxvZ09wdGlvbnM7XG5cbiAgcmV0dXJuIEVYQ0hBTkdFX1JBVEVfTU9ERV9DT0RFU1xuICAgIC5tYXAoKGNvZGUpID0+IHtcbiAgICAgIGNvbnN0IG1ldGEgPSBFWENIQU5HRV9SQVRFX01PREVfTUVUQVtjb2RlXTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiBTdHJpbmcoY29kZSksXG4gICAgICAgIHRleHQ6IG1ldGEgPyBpbmRUKG1ldGEubGFiZWxLZXksIG1ldGEuZmFsbGJhY2spIDogU3RyaW5nKGNvZGUpLFxuICAgICAgfTtcbiAgICB9KTtcbn07XG5cclxuLy8gUmV0dXJucyBhIGxvY2FsaXplZCBtb2RlIGxhYmVsIG9yIGVtcHR5IHRleHQgZm9yIG5vbi1zZWxlY3RlZCB2YWx1ZXMuXHJcbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlKHZhbHVlKTtcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IG51bGwpIHJldHVybiBcIlwiO1xuICBjb25zdCBjYXRhbG9nTGFiZWwgPSBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNhdGFsb2dMYWJlbChub3JtYWxpemVkKTtcbiAgaWYgKGNhdGFsb2dMYWJlbCkgcmV0dXJuIGNhdGFsb2dMYWJlbDtcblxuICBjb25zdCBtZXRhID0gRVhDSEFOR0VfUkFURV9NT0RFX01FVEFbbm9ybWFsaXplZF07XG4gIHJldHVybiBtZXRhID8gaW5kVChtZXRhLmxhYmVsS2V5LCBtZXRhLmZhbGxiYWNrKSA6IFN0cmluZyhub3JtYWxpemVkKTtcbn07XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRGb3JtYXQsIGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldEhlYWRlciB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvbiBmcm9tIFwiLi9FeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb24udHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0IGZyb20gXCIuL0V4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlUmVhZE9ubHlGaWVsZCBmcm9tIFwiLi9FeHBlbnNlUmVhZE9ubHlGaWVsZC50c3hcIjtcclxuaW1wb3J0IHsgZ2V0RXhwZW5zZVN0YXR1c0xhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlU3RhdHVzQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQge1xuICBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsLFxuICBub3JtYWxpemVFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZSxcbn0gZnJvbSBcIi4uL2NvbnN0YW50cy9leGNoYW5nZVJhdGVFbnRyeU1vZGVDYXRhbG9nLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlTnVtYmVyLCBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlU2hlZXRIZWFkZXJGb3JtTW9kZSA9IHtcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGJvb2xlYW47XG4gIHN0YXR1c0NvbW1lbnRNb2RlOiBcImhpZGRlblwiIHwgXCJyZWFkXCI7XG59O1xuXG50eXBlIEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5TG9ja3MgPSB7XG4gIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XG4gIHNob3dFeGNoYW5nZVJhdGU6IGJvb2xlYW47XG59O1xuXG50eXBlIEV4cGVuc2VTaGVldEhlYWRlckZvcm1Qcm9wcyA9IHtcbiAgbW9kZTogRXhwZW5zZVNoZWV0SGVhZGVyRm9ybU1vZGU7XG4gIGN1cnJlbmN5TG9ja3M6IEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5TG9ja3M7XG4gIGhlYWRlcjogRXhwZW5zZVNoZWV0SGVhZGVyO1xuICBvd25lckRpc3BsYXk/OiBzdHJpbmc7XG4gIHByb2plY3RWYWx1ZTogc3RyaW5nO1xuICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeTogc3RyaW5nO1xuICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k6IHN0cmluZztcbiAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50OiBudW1iZXI7XG4gIGV4Y2hhbmdlUmF0ZVZhbHVlOiBzdHJpbmc7XG4gIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlOiBzdHJpbmc7XG4gIHRvdGFsQW1vdW50VGV4dDogc3RyaW5nO1xyXG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcclxuICBkcmFmdFByb2plY3RJZDogc3RyaW5nO1xyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRFeGNoYW5nZVJhdGU6IHN0cmluZztcclxuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlOiBzdHJpbmc7XHJcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlOiBzdHJpbmc7XHJcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2U6IHN0cmluZztcclxuICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRQcm9qZWN0SWRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuY29uc3QgRVhDSEFOR0VfUkFURV9NT0RFX1BSRUZJWF9QQVRURVJOID0gL15UXFwuP0NcXC4/XFxzKi9pO1xyXG5cclxuLy8gUHVyZSBwcmVzZW50YXRpb25hbCBoZWFkZXIgZm9ybSBmb3IgZXhwZW5zZSBzaGVldCBkZXRhaWwvY3JlYXRlIHNjcmVlbnMuXG5jb25zdCBFeHBlbnNlU2hlZXRIZWFkZXJGb3JtID0gKHtcbiAgbW9kZSxcbiAgY3VycmVuY3lMb2NrcyxcbiAgaGVhZGVyLFxuICBvd25lckRpc3BsYXkgPSBcIlwiLFxuICBwcm9qZWN0VmFsdWUsXG4gIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxuICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXG4gIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudCxcbiAgZXhjaGFuZ2VSYXRlVmFsdWUsXG4gIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlLFxuICB0b3RhbEFtb3VudFRleHQsXHJcbiAgZHJhZnREZXNjcmlwdGlvbixcclxuICBkcmFmdFByb2plY3RJZCxcclxuICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlLFxyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSxcclxuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSxcclxuICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2UsXHJcbiAgb25EcmFmdFByb2plY3RJZENoYW5nZSxcclxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlLFxuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlLFxufTogRXhwZW5zZVNoZWV0SGVhZGVyRm9ybVByb3BzKSA9PiB7XG4gIGNvbnN0IHsgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmcsIGNhbkVkaXRIZWFkZXJGaWVsZHMsIHN0YXR1c0NvbW1lbnRNb2RlIH0gPSBtb2RlO1xuICBjb25zdCB7IGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLCBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsIHNob3dFeGNoYW5nZVJhdGUgfSA9IGN1cnJlbmN5TG9ja3M7XG4gIGNvbnN0IGlzRm9yZWlnbkN1cnJlbmN5ID1cbiAgICBpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkcyAmJiBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSAhPT0gXCJcIiAmJiBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSAhPT0gZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5O1xyXG4gIGNvbnN0IGV4cGVuc2VDdXJyZW5jeUxhYmVsID0gaXNGb3JlaWduQ3VycmVuY3lcclxuICAgID8gaW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhwZW5zZUN1cnJlbmN5XCIsIFwiRXhwZW5zZSBjdXJyZW5jeVwiKVxyXG4gICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpO1xyXG4gIGNvbnN0IHN0YXR1c1ZhbHVlID1cclxuICAgIGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgPT09IG51bGwgfHwgaGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gdW5kZWZpbmVkXHJcbiAgICAgID8gXCItXCJcclxuICAgICAgOiBnZXRFeHBlbnNlU3RhdHVzTGFiZWwoaGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyk7XHJcbiAgY29uc3QgaGVhZGVyQ3VycmVuY3lDb2RlID0gc2FmZVRleHQoaGVhZGVyLmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBiYXNlQ3VycmVuY3lDb2RlID0gc2FmZVRleHQoZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xyXG4gIC8vIFN0YXR1cyBjb21tZW50IGlzIG5vdyBlZGl0ZWQgb25seSBpbiB0aGUgc3RhdHVzIHRyYW5zaXRpb24gcG9wdXAuXHJcbiAgY29uc3Qgc3RhdHVzQ29tbWVudFZhbHVlID0gc2FmZVRleHQoaGVhZGVyLmVzdGFkb0NvbWVudGFyaW9zKTtcclxuICBjb25zdCBzaG93U3RhdHVzQ29tbWVudEZpZWxkID0gIWlzQ3JlYXRlTW9kZSAmJiBzdGF0dXNDb21tZW50TW9kZSAhPT0gXCJoaWRkZW5cIjtcclxuICBjb25zdCBwYXJzZWREcmFmdEV4Y2hhbmdlUmF0ZSA9IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dChkcmFmdEV4Y2hhbmdlUmF0ZSk7XHJcbiAgY29uc3QgcGFyc2VkT2ZmaWNpYWxSYXdSYXRlID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUpO1xyXG4gIGNvbnN0IGJhc2VFeGNoYW5nZVJhdGVWYWx1ZSA9XHJcbiAgICBwYXJzZWREcmFmdEV4Y2hhbmdlUmF0ZSAhPSBudWxsXHJcbiAgICAgID8gcGFyc2VkRHJhZnRFeGNoYW5nZVJhdGVcclxuICAgICAgOiBwYXJzZWRPZmZpY2lhbFJhd1JhdGUgIT0gbnVsbFxyXG4gICAgICAgID8gcGFyc2VkT2ZmaWNpYWxSYXdSYXRlICogZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50XHJcbiAgICAgICAgOiBudWxsO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZUluZm9WYWx1ZSA9IGZvcm1hdEV4cGVuc2VOdW1iZXIoXHJcbiAgICBiYXNlRXhjaGFuZ2VSYXRlVmFsdWUgIT0gbnVsbCA/IGJhc2VFeGNoYW5nZVJhdGVWYWx1ZSAvIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudCA6IG51bGwsXHJcbiAgICB7XHJcbiAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogNyxcclxuICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiA3LFxyXG4gICAgICB1c2VHcm91cGluZzogZmFsc2UsXHJcbiAgICAgIGZhbGxiYWNrOiBcIjAuMDAwMDAwMFwiLFxyXG4gICAgfVxyXG4gICk7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlTW9kZVZhbHVlID0gbm9ybWFsaXplRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGUoaGVhZGVyLmV4Y2hhbmdlUmF0ZU1vZGUpID8/IDA7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZU1vZGVLZXkgPVxuICAgIGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSA9PT0gMVxuICAgICAgPyBcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0V4Y2hhbmdlUmF0ZU1vZGVfTWFudWFsXCJcbiAgICAgIDogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX09mZmljaWFsXCI7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZU1vZGVGYWxsYmFjayA9IGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSA9PT0gMSA/IFwiVC5DLiBNYW51YWxcIiA6IFwiVC5DLiBPZmljaWFsXCI7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCA9XHJcbiAgICAoZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVMYWJlbChleGNoYW5nZVJhdGVNb2RlVmFsdWUpIHx8IGluZFQoZXhjaGFuZ2VSYXRlTW9kZUtleSwgZXhjaGFuZ2VSYXRlTW9kZUZhbGxiYWNrKSlcclxuICAgICAgLnJlcGxhY2UoRVhDSEFOR0VfUkFURV9NT0RFX1BSRUZJWF9QQVRURVJOLCBcIlwiKVxyXG4gICAgICAudHJpbSgpXHJcbiAgICAgIC50b0xvd2VyQ2FzZSgpIHx8IChleGNoYW5nZVJhdGVNb2RlVmFsdWUgPT09IDEgPyBcIm1hbnVhbFwiIDogXCJvZmljaWFsXCIpO1xyXG4gIGNvbnN0IGhhc0VuZHBvaW50RXhjaGFuZ2VSYXRlRGF0YSA9XHJcbiAgICAhIXNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUpIHx8ICEhc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKSB8fCAhIXNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKTtcclxuICBjb25zdCBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9EYXRlID0gc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKSB8fCBpbmRUKFwiQ29tbW9uX05vdEF2YWlsYWJsZVwiLCBcIk4vQVwiKTtcclxuICBjb25zdCBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9Tb3VyY2UgPSBzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSlcclxuICAgIC5yZXBsYWNlKC9cXHMqXFwoW14oKV0qXFwpXFxzKi9nLCBcIiBcIilcclxuICAgIC5yZXBsYWNlKC9cXHN7Mix9L2csIFwiIFwiKVxyXG4gICAgLnRyaW0oKSB8fCBpbmRUKFwiQ29tbW9uX05vdEF2YWlsYWJsZVwiLCBcIk4vQVwiKTtcclxuICBjb25zdCBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlID0gaW5kRm9ybWF0KFxyXG4gICAgXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9JbmZvUG9wb3Zlcl9EZXRhaWxcIixcclxuICAgIFwiVGlwbyBkZSBjYW1iaW8gb2J0ZW5pZG8gezB9XFxuRmVjaGE6IHsxfVxcbk9yaWdlbjogezJ9XCIsXHJcbiAgICBzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKSB8fCBcIjAuMDAwMDAwMFwiLFxyXG4gICAgZW5kcG9pbnRFeGNoYW5nZVJhdGVJbmZvRGF0ZSxcclxuICAgIGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb1NvdXJjZVxyXG4gICk7XHJcbiAgY29uc3Qgc3RvcmVkRXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UgPSBpbmRGb3JtYXQoXHJcbiAgICBcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX0luZm9Qb3BvdmVyX1N0b3JlZFwiLFxyXG4gICAgXCJUaXBvIGRlIGNhbWJpbyB7MH0gezF9XCIsXHJcbiAgICBleGNoYW5nZVJhdGVNb2RlTGFiZWwsXHJcbiAgICBleGNoYW5nZVJhdGVJbmZvVmFsdWVcclxuICApO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlID0gaGFzRW5kcG9pbnRFeGNoYW5nZVJhdGVEYXRhID8gZW5kcG9pbnRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZSA6IHN0b3JlZEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicmVsYXRpdmUgc2hhZG93LXhzIGdsYXNzLXBhbmVsIHAtNCBzcGFjZS15LTQgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV1cIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCI+XG4gICAgICAgIHtvd25lckRpc3BsYXkgPyAoXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfT3duZXJVc2VyXCIsIFwiT3duZXIgdXNlclwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtvd25lckRpc3BsYXl9XG4gICAgICAgICAgICBmdWxsV2lkdGhcbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgeyFpc0NyZWF0ZU1vZGUgPyAoXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU2hlZXRJZFwiLCBcIkV4cGVuc2Ugc2hlZXQgY29kZVwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e3NhZmVUZXh0KGhlYWRlci5ob2phR2FzdG9zSWQpIHx8IFwiLVwifVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgICB7IWlzQ3JlYXRlTW9kZSA/IDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzXCIsIFwiU3RhdHVzXCIpfSB2YWx1ZT17c3RhdHVzVmFsdWV9IC8+IDogbnVsbH1cclxuICAgICAgICB7c2hvd1N0YXR1c0NvbW1lbnRGaWVsZCA/IChcclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzQ29tbWVudFwiLCBcIlN0YXR1cyBjb21tZW50XCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17c3RhdHVzQ29tbWVudFZhbHVlIHx8IFwiLVwifVxyXG4gICAgICAgICAgICBmdWxsV2lkdGhcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAge2lzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzID8gKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbTpjb2wtc3Bhbi0yIHNwYWNlLXktMS41XCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX08L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxyXG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdERlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XHJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtzYWZlVGV4dChoZWFkZXIuZGVzY3JpcHRpb24pIHx8IFwiLVwifVxyXG4gICAgICAgICAgICBmdWxsV2lkdGhcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKX1cclxuICAgICAgICB7aXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHMgPyAoXHJcbiAgICAgICAgICA8RXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfUHJvamVjdF9QbGFjZWhvbGRlclwiLCBcIlByb2plY3QgaWRcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtkcmFmdFByb2plY3RJZH1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRQcm9qZWN0SWRDaGFuZ2V9XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nIHx8ICFjYW5FZGl0SGVhZGVyRmllbGRzfVxyXG4gICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZyB8fCAhY2FuRWRpdEhlYWRlckZpZWxkc31cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IHByb2plY3RWYWx1ZSA/IChcclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9IHZhbHVlPXtwcm9qZWN0VmFsdWV9IC8+XHJcbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDxFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb25cbiAgICAgICAgICBpbnRlcmFjdGlvbj17eyBpc0VkaXRpbmcsIGNhbkVkaXRIZWFkZXJGaWVsZHMgfX1cbiAgICAgICAgICBjdXJyZW5jeVN0YXRlPXt7IGlzRm9yZWlnbkN1cnJlbmN5LCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcywgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLCBzaG93RXhjaGFuZ2VSYXRlIH19XG4gICAgICAgICAgZXhwZW5zZUN1cnJlbmN5TGFiZWw9e2V4cGVuc2VDdXJyZW5jeUxhYmVsfVxuICAgICAgICAgIGhlYWRlckN1cnJlbmN5Q29kZT17aGVhZGVyQ3VycmVuY3lDb2RlfVxuICAgICAgICAgIGJhc2VDdXJyZW5jeUNvZGU9e2Jhc2VDdXJyZW5jeUNvZGV9XG4gICAgICAgICAgZHJhZnRDdXJyZW5jeUNvZGU9e2RyYWZ0Q3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgZHJhZnRFeGNoYW5nZVJhdGU9e2RyYWZ0RXhjaGFuZ2VSYXRlfVxyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlVmFsdWU9e2V4Y2hhbmdlUmF0ZVZhbHVlfVxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlPXtleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQ9e2V4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudH1cbiAgICAgICAgICBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZT17ZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2V9XG4gICAgICAgICAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZT17b25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZX1cbiAgICAgICAgICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlPXtvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlfVxuICAgICAgICAvPlxyXG4gICAgICAgIHshaXNDcmVhdGVNb2RlID8gPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Ub3RhbEFtb3VudFwiLCBcIlRvdGFsIGFtb3VudFwiKX0gdmFsdWU9e3RvdGFsQW1vdW50VGV4dH0gLz4gOiBudWxsfVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBDb21wYWN0UGFnaW5hdGlvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbXBhY3RQYWdpbmF0aW9uLnRzeFwiO1xuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldExpbmUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzLCBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IEV4cGVuc2VTZWN0aW9uRGl2aWRlciBmcm9tIFwiLi9FeHBlbnNlU2VjdGlvbkRpdmlkZXIudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGltZWxpbmVDYXJkIGZyb20gXCIuL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4XCI7XHJcblxyXG50eXBlIFBhZ2luYXRpb25MYWJlbHMgPSB7XHJcbiAgZmlyc3Q6IHN0cmluZztcclxuICBwcmV2OiBzdHJpbmc7XHJcbiAgbmV4dDogc3RyaW5nO1xyXG4gIGxhc3Q6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZUxpbmVzVGltZWxpbmVQcm9wcyA9IHtcclxuICB2aXNpYmxlTGluZXM6IEV4cGVuc2VTaGVldExpbmVbXTtcclxuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICB0b3RhbExpbmVQYWdlczogbnVtYmVyO1xyXG4gIGxpbmVQYWdlOiBudW1iZXI7XHJcbiAgbGluZXNMYWJlbDogc3RyaW5nO1xyXG4gIGVtcHR5VGV4dDogc3RyaW5nO1xyXG4gIHBhZ2luYXRpb25MYWJlbHM6IFBhZ2luYXRpb25MYWJlbHM7XHJcbiAgY29udGFpbmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBvbkxpbmVQYWdlQ2hhbmdlOiAocGFnZTogbnVtYmVyKSA9PiB2b2lkO1xyXG4gIG9uT3BlbkxpbmU6IChsaW5lUmVjSWQ6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIER1bWIgdGltZWxpbmUgZm9yIGV4cGVuc2Ugc2hlZXQgbGluZXMgd2l0aCBzdGFuZGFyZCBjYXJkIGFuZCBwYWdpbmF0aW9uIGxheW91dC5cclxuY29uc3QgRXhwZW5zZUxpbmVzVGltZWxpbmUgPSAoe1xyXG4gIHZpc2libGVMaW5lcyxcclxuICBjdXJyZW5jeUNvZGUsXHJcbiAgdG90YWxMaW5lUGFnZXMsXHJcbiAgbGluZVBhZ2UsXHJcbiAgbGluZXNMYWJlbCxcclxuICBlbXB0eVRleHQsXHJcbiAgcGFnaW5hdGlvbkxhYmVscyxcclxuICBjb250YWluZXJSZWYsXHJcbiAgb25MaW5lUGFnZUNoYW5nZSxcclxuICBvbk9wZW5MaW5lLFxufTogRXhwZW5zZUxpbmVzVGltZWxpbmVQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNwYWNlLXktMFwiPlxyXG4gICAgICA8RXhwZW5zZVNlY3Rpb25EaXZpZGVyIGxhYmVsPXtsaW5lc0xhYmVsfSBjbGFzc05hbWU9XCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlci0tc3BhY2VkXCIgLz5cclxuXHJcbiAgICAgIHt2aXNpYmxlTGluZXMubGVuZ3RoID09PSAwID8gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtYm94IHRpbWVsaW5lLWVtcHR5XCIgZGF0YS1lbXB0eS10ZXh0PXtlbXB0eVRleHR9IC8+XHJcbiAgICAgICkgOiAoXHJcbiAgICAgICAgPGRpdiByZWY9e2NvbnRhaW5lclJlZn0gY2xhc3NOYW1lPVwidGltZWxpbmUtYm94XCI+XHJcbiAgICAgICAgICB7dmlzaWJsZUxpbmVzLm1hcCgobGluZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbGluZUlkID0gc2FmZVRleHQobGluZS5saW5lUmVjSWQpO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBzYWZlVGV4dChsaW5lLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGNvbnN0IGxpbmVDdXJyZW5jeUNvZGUgPSBzYWZlVGV4dChsaW5lLmN1cnJlbmN5Q29kZSkgfHwgY3VycmVuY3lDb2RlO1xuICAgICAgICAgICAgY29uc3QgYW1vdW50VGV4dCA9IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShsaW5lLmFtb3VudCA/PyBudWxsLCBsaW5lQ3VycmVuY3lDb2RlKTtcbiAgICAgICAgICAgIGNvbnN0IGxpbmtlZFRpY2tldEZpbGVJZCA9IHNhZmVUZXh0KGxpbmUuZmlsZUlkKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RJZCA9IHNhZmVUZXh0KGxpbmUucHJvaklkKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVQYXJ0cyA9IGZvcm1hdEV4cGVuc2VEYXRlUGFydHMoc2FmZVRleHQobGluZS50cmFuc0RhdGUpLCBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIik7XG4gICAgICAgICAgICBjb25zdCB0aWNrZXRTdGF0dXNJY29uID0gbGlua2VkVGlja2V0RmlsZUlkID8gKFxyXG4gICAgICAgICAgICAgIDxzdmdcclxuICAgICAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICAgICAgICAgICAgZmlsbD1cIm5vbmVcIlxyXG4gICAgICAgICAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXHJcbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD17MS41fVxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInNpemUtNFwiXG4gICAgICAgICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcclxuICAgICAgICAgICAgICAgICAgZD1cIk0xMy4xOSA4LjY4OGE0LjUgNC41IDAgMCAxIDEuMjQyIDcuMjQ0bC00LjUgNC41YTQuNSA0LjUgMCAwIDEtNi4zNjQtNi4zNjRsMS43NTctMS43NTdtMTMuMzUtLjYyMiAxLjc1Ny0xLjc1N2E0LjUgNC41IDAgMCAwLTYuMzY0LTYuMzY0bC00LjUgNC41YTQuNSA0LjUgMCAwIDAgMS4yNDIgNy4yNDRcIlxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgKSA6IG51bGw7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtsaW5lSWQgfHwgYCR7c2FmZVRleHQobGluZS50cmFuc0RhdGUpfS0ke2Rlc2NyaXB0aW9ufS0ke2Ftb3VudFRleHR9LSR7cHJvamVjdElkfWB9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxyXG4gICAgICAgICAgICAgICAgICBkYXRlUGFydHM9e2RhdGVQYXJ0c31cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXtkZXNjcmlwdGlvbiB8fCBsaW5lSWQgfHwgXCItXCJ9XG4gICAgICAgICAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxuICAgICAgICAgICAgICAgICAgb25PcGVuPXsoKSA9PiBvbk9wZW5MaW5lKGxpbmVJZCl9XG4gICAgICAgICAgICAgICAgICB0aXRsZUNsYXNzTmFtZT1cInRpbWVsaW5lLW5hbWUgZXhwZW5zZS1saW5lLWNhcmRfX3RpdGxlXCJcbiAgICAgICAgICAgICAgICAgIHN1YnRpdGxlQ2xhc3NOYW1lPVwiZXhwZW5zZS1zaGVldC1jYXJkX19zdWJ0aXRsZSBleHBlbnNlLWxpbmUtY2FyZF9fbWV0YVwiXG4gICAgICAgICAgICAgICAgICBzdGF0dXNJY29uPXt0aWNrZXRTdGF0dXNJY29ufVxuICAgICAgICAgICAgICAgICAgc3RhdHVzSWNvbkNsYXNzTmFtZT1cImV4cGVuc2UtbGluZS1jYXJkX190aWNrZXQtaWNvblwiXHJcbiAgICAgICAgICAgICAgICAgIHN0YXR1c0xhYmVsPXtsaW5rZWRUaWNrZXRGaWxlSWQgfHwgdW5kZWZpbmVkfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG5cclxuICAgICAgPENvbXBhY3RQYWdpbmF0aW9uXHJcbiAgICAgICAgdG90YWxQYWdlcz17dG90YWxMaW5lUGFnZXN9XHJcbiAgICAgICAgY3VycmVudFBhZ2U9e2xpbmVQYWdlfVxyXG4gICAgICAgIG9uUGFnZUNoYW5nZT17b25MaW5lUGFnZUNoYW5nZX1cclxuICAgICAgICBsYWJlbHM9e3BhZ2luYXRpb25MYWJlbHN9XHJcbiAgICAgIC8+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VMaW5lc1RpbWVsaW5lO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUGFnZUJvdHRvbUFjdGlvbnMsIHsgUGFnZUJvdHRvbUFjdGlvbkJ1dHRvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvUGFnZUJvdHRvbUFjdGlvbnMudHN4XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbiB9IGZyb20gXCIuL2V4cGVuc2VTaGVldERldGFpbFBvbGljeS50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25CYXJQcm9wcyA9IHtcclxuICBhY3Rpb25zOiBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25bXTtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICBvbkFjdGlvbkNsaWNrOiAoYWN0aW9uOiBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb24pID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIHRoZSBib3R0b20gdG9vbGJhciBmb3IgZXhwZW5zZSBzaGVldCBzdGF0dXMgdHJhbnNpdGlvbnMuXHJcbmNvbnN0IEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbkJhciA9ICh7IGFjdGlvbnMsIGJ1c3ksIGRpc2FibGVkID0gZmFsc2UsIG9uQWN0aW9uQ2xpY2sgfTogRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyUHJvcHMpID0+IHtcclxuICBpZiAoYWN0aW9ucy5sZW5ndGggPCAxKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8UGFnZUJvdHRvbUFjdGlvbnMgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19Cb3R0b21BY3Rpb25zX1Rvb2xiYXJcIiwgXCJBY2Npb25lcyBkZSBlc3RhZG8gZGUgbGEgaG9qYSBkZSBnYXN0b1wiKX0+XG4gICAgICB7YWN0aW9ucy5tYXAoKGFjdGlvbikgPT4gKFxyXG4gICAgICAgIDxQYWdlQm90dG9tQWN0aW9uQnV0dG9uXHJcbiAgICAgICAgICBrZXk9e2FjdGlvbi5pZH1cclxuICAgICAgICAgIGxhYmVsPXtpbmRUKGFjdGlvbi5sYWJlbEtleSwgYWN0aW9uLmZhbGxiYWNrKX1cclxuICAgICAgICAgIGRpc2FibGVkPXtidXN5IHx8IGRpc2FibGVkfVxyXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gb25BY3Rpb25DbGljayhhY3Rpb24pfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICkpfVxyXG4gICAgPC9QYWdlQm90dG9tQWN0aW9ucz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5IGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VRdWlja1RpY2tldFByb2dyZXNzT3ZlcmxheS50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IFRJQ0tFVF9JTUFHRV9BQ0NFUFRfQVRUUklCVVRFIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93Q29yZS50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlU2hlZXREZXRhaWxPdmVybGF5c1Byb3BzID0ge1xyXG4gIG1vZGFsOiB7XHJcbiAgICBvcGVuOiBib29sZWFuO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xyXG4gICAgY2FuY2VsVGV4dD86IHN0cmluZztcclxuICAgIHNob3dDYW5jZWw/OiBib29sZWFuO1xyXG4gICAgc2hvd0NvbmZpcm0/OiBib29sZWFuO1xyXG4gIH07XHJcbiAgbW9kYWxFcnJvcjogc3RyaW5nO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlOiBib29sZWFuO1xyXG4gIG1vZGFsTG9hZGluZ1RleHQ6IHN0cmluZztcclxuICBtb2RhbENhbmNlbFRleHQ6IHN0cmluZztcclxuICBtb2RhbENvbmZpcm1UZXh0OiBzdHJpbmc7XHJcbiAgbW9kYWxCb2R5PzogUmVhY3QuUmVhY3ROb2RlO1xyXG4gIGNhbWVyYUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gIGdhbGxlcnlJbnB1dFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcclxuICBzb3VyY2VQaWNrZXJPcGVuOiBib29sZWFuO1xyXG4gIHF1aWNrVGlja2V0QnVzeTogYm9vbGVhbjtcclxuICBxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZTogc3RyaW5nO1xyXG4gIHF1aWNrVGlja2V0UHJvZ3Jlc3NTdGFnZXM6IEFycmF5PHtcclxuICAgIGtleTogc3RyaW5nO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICBzdGF0ZTogXCJjb21wbGV0ZWRcIiB8IFwiYWN0aXZlXCIgfCBcInBlbmRpbmdcIjtcclxuICB9PjtcclxuICBxdWlja1RpY2tldEVsYXBzZWRNczogbnVtYmVyO1xyXG4gIHF1aWNrVGlja2V0RXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbiAgcXVpY2tUaWNrZXRBdHRlbXB0SWQ6IHN0cmluZztcclxuICBxdWlja1RpY2tldFRyYWNlTGlzdDogQXJyYXk8eyBzdGVwOiBzdHJpbmc7IHRyYWNlSWQ6IHN0cmluZzsgYXQ6IHN0cmluZyB9PjtcclxuICBoYXNQZW5kaW5nVXBsb2FkUmV0cnk6IGJvb2xlYW47XHJcbiAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmU6IGJvb2xlYW47XHJcbiAgb25Db25maXJtOiAoKSA9PiB2b2lkO1xyXG4gIG9uQ2FuY2VsOiAoKSA9PiB2b2lkO1xyXG4gIG9uU2VsZWN0ZWRDYW1lcmFGaWxlOiAoZmlsZTogRmlsZSB8IG51bGwpID0+IHZvaWQ7XHJcbiAgb25TZWxlY3RlZEdhbGxlcnlGaWxlOiAoZmlsZTogRmlsZSB8IG51bGwpID0+IHZvaWQ7XHJcbiAgb25TZWxlY3RGcm9tQ2FtZXJhOiAoKSA9PiB2b2lkO1xyXG4gIG9uU2VsZWN0RnJvbUdhbGxlcnk6ICgpID0+IHZvaWQ7XG4gIG9uQ2xvc2VTb3VyY2VQaWNrZXI6ICgpID0+IHZvaWQ7XG4gIG9uUmV0cnlQZW5kaW5nVXBsb2FkOiAoKSA9PiB2b2lkO1xuICBvbkNsZWFyUXVpY2tUaWNrZXRFcnJvcjogKCkgPT4gdm9pZDtcbn07XG5cclxuLy8gUmVuZGVycyBtb2RhbCBhbmQgcXVpY2stdGlja2V0IG92ZXJsYXlzIGZvciB0aGUgZXhwZW5zZSBzaGVldCBkZXRhaWwgcGFnZS5cclxuY29uc3QgRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXMgPSAoe1xyXG4gIG1vZGFsLFxyXG4gIG1vZGFsRXJyb3IsXHJcbiAgc3RhdHVzLFxyXG4gIGJ1c3ksXHJcbiAgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLFxyXG4gIG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgbW9kYWxDYW5jZWxUZXh0LFxyXG4gIG1vZGFsQ29uZmlybVRleHQsXHJcbiAgbW9kYWxCb2R5LFxyXG4gIGNhbWVyYUlucHV0UmVmLFxyXG4gIGdhbGxlcnlJbnB1dFJlZixcclxuICBzb3VyY2VQaWNrZXJPcGVuLFxyXG4gIHF1aWNrVGlja2V0QnVzeSxcclxuICBxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSxcclxuICBxdWlja1RpY2tldFByb2dyZXNzU3RhZ2VzLFxyXG4gIHF1aWNrVGlja2V0RWxhcHNlZE1zLFxyXG4gIHF1aWNrVGlja2V0RXJyb3JNZXNzYWdlLFxyXG4gIHF1aWNrVGlja2V0QXR0ZW1wdElkLFxyXG4gIHF1aWNrVGlja2V0VHJhY2VMaXN0LFxyXG4gIGhhc1BlbmRpbmdVcGxvYWRSZXRyeSxcclxuICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZSxcclxuICBvbkNvbmZpcm0sXHJcbiAgb25DYW5jZWwsXHJcbiAgb25TZWxlY3RlZENhbWVyYUZpbGUsXHJcbiAgb25TZWxlY3RlZEdhbGxlcnlGaWxlLFxyXG4gIG9uU2VsZWN0RnJvbUNhbWVyYSxcclxuICBvblNlbGVjdEZyb21HYWxsZXJ5LFxuICBvbkNsb3NlU291cmNlUGlja2VyLFxuICBvblJldHJ5UGVuZGluZ1VwbG9hZCxcbiAgb25DbGVhclF1aWNrVGlja2V0RXJyb3IsXG59OiBFeHBlbnNlU2hlZXREZXRhaWxPdmVybGF5c1Byb3BzKSA9PiB7XG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8Q29uZmlybU1vZGFsXHJcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cclxuICAgICAgICB0aXRsZT17bW9kYWwudGl0bGV9XHJcbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cclxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cclxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbENhbmNlbFRleHR9XHJcbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsTG9hZGluZ1RleHR9XHJcbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cclxuICAgICAgICBzaG93Q29uZmlybT17bW9kYWwuc2hvd0NvbmZpcm19XHJcbiAgICAgICAgYnVzeT17YnVzeSB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGV9XHJcbiAgICAgICAgZXJyb3I9e21vZGFsRXJyb3J9XHJcbiAgICAgICAgc3RhdHVzPXtzdGF0dXN9XHJcbiAgICAgICAgb25Db25maXJtPXtvbkNvbmZpcm19XHJcbiAgICAgICAgb25DYW5jZWw9e29uQ2FuY2VsfVxyXG4gICAgICA+XHJcbiAgICAgICAge21vZGFsQm9keX1cclxuICAgICAgPC9Db25maXJtTW9kYWw+XHJcblxyXG4gICAgICA8aW5wdXRcclxuICAgICAgICByZWY9e2NhbWVyYUlucHV0UmVmfVxyXG4gICAgICAgIHR5cGU9XCJmaWxlXCJcclxuICAgICAgICBhY2NlcHQ9e1RJQ0tFVF9JTUFHRV9BQ0NFUFRfQVRUUklCVVRFfVxyXG4gICAgICAgIGNhcHR1cmU9XCJlbnZpcm9ubWVudFwiXHJcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcclxuICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBmaWxlID0gZXZlbnQuY3VycmVudFRhcmdldC5maWxlcz8uWzBdIHx8IG51bGw7XHJcbiAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgIG9uU2VsZWN0ZWRDYW1lcmFGaWxlKGZpbGUpO1xyXG4gICAgICAgIH19XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICA8aW5wdXRcclxuICAgICAgICByZWY9e2dhbGxlcnlJbnB1dFJlZn1cclxuICAgICAgICB0eXBlPVwiZmlsZVwiXHJcbiAgICAgICAgYWNjZXB0PXtUSUNLRVRfSU1BR0VfQUNDRVBUX0FUVFJJQlVURX1cclxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxyXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGZpbGUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmZpbGVzPy5bMF0gfHwgbnVsbDtcclxuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgb25TZWxlY3RlZEdhbGxlcnlGaWxlKGZpbGUpO1xyXG4gICAgICAgIH19XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICB7c291cmNlUGlja2VyT3BlbiA/IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctc2xhdGUtOTUwLzQ1IHB4LTQgcHktNlwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctc20gcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUgcC00IHNoYWRvdy14bFwiPlxyXG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1bMTZweF0gZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTgwMFwiPlxyXG4gICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX1RpdGxlXCIsIFwiTnVldm8gdGlja2V0XCIpfVxyXG4gICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0xIHRleHQtc20gdGV4dC1zbGF0ZS02MDBcIj5cclxuICAgICAgICAgICAgICB7aW5kVChcclxuICAgICAgICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX0JvZHlcIixcclxuICAgICAgICAgICAgICAgIFwiU2VsZWNjaW9uYSB1bmEgZnVlbnRlIHBhcmEgY2FwdHVyYXIgbyBlbGVnaXIgbGEgaW1hZ2VuIGRlbCB0aWNrZXQuXCJcclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L3A+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgZ3JpZCBncmlkLWNvbHMtMSBnYXAtMlwiPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiIG9uQ2xpY2s9e29uU2VsZWN0RnJvbUNhbWVyYX0+XHJcbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9DYW1lcmFcIiwgXCJVc2FyIGNcdTAwRTFtYXJhXCIpfVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiIG9uQ2xpY2s9e29uU2VsZWN0RnJvbUdhbGxlcnl9PlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfR2FsbGVyeVwiLCBcIkVsZWdpciBpbWFnZW5cIil9XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCIgb25DbGljaz17b25DbG9zZVNvdXJjZVBpY2tlcn0+XHJcbiAgICAgICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIil9XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgPEV4cGVuc2VRdWlja1RpY2tldFByb2dyZXNzT3ZlcmxheVxyXG4gICAgICAgIG9wZW49e3F1aWNrVGlja2V0QnVzeX1cclxuICAgICAgICB0aXRsZT17aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX1RpdGxlXCIsIFwiUHJvY2Vzc2luZyB0aWNrZXRcIil9XHJcbiAgICAgICAgc3VtbWFyeT17cXVpY2tUaWNrZXRQcm9ncmVzc01lc3NhZ2UgfHwgaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cclxuICAgICAgICBlbGFwc2VkTXM9e3F1aWNrVGlja2V0RWxhcHNlZE1zfVxyXG4gICAgICAgIHN0YWdlcz17cXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlc31cclxuICAgICAgLz5cclxuXHJcbiAgICAgIHtxdWlja1RpY2tldEVycm9yTWVzc2FnZSA/IChcclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZVxyXG4gICAgICAgICAgICAgID8gXCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBzcGFjZS15LTIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1hbWJlci0yMDAgYmctYW1iZXItNTAgcC0zIHRleHQtc20gdGV4dC1hbWJlci05MDBcIlxyXG4gICAgICAgICAgICAgIDogXCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBzcGFjZS15LTIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy1yb3NlLTUwIHAtMyB0ZXh0LXNtIHRleHQtcm9zZS04MDBcIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxwPntxdWlja1RpY2tldEVycm9yTWVzc2FnZX08L3A+XHJcbiAgICAgICAgICB7cXVpY2tUaWNrZXRBdHRlbXB0SWQgPyAoXHJcbiAgICAgICAgICAgIDxwXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcclxuICAgICAgICAgICAgICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlXHJcbiAgICAgICAgICAgICAgICAgID8gXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLWFtYmVyLTIwMCBiZy13aGl0ZSBweC0yIHB5LTEgZm9udC1tb25vIHRleHQtWzExcHhdIHRleHQtYW1iZXItOTAwIGJyZWFrLWFsbFwiXHJcbiAgICAgICAgICAgICAgICAgIDogXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXdoaXRlIHB4LTIgcHktMSBmb250LW1vbm8gdGV4dC1bMTFweF0gdGV4dC1yb3NlLTgwMCBicmVhay1hbGxcIlxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtgYXR0ZW1wdElkOiAke3F1aWNrVGlja2V0QXR0ZW1wdElkfWB9XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICAgICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmVcclxuICAgICAgICAgICAgICAgICAgPyBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItYW1iZXItMjAwIGJnLXdoaXRlIHAtMiB0ZXh0LXhzIHRleHQtYW1iZXItODAwXCJcclxuICAgICAgICAgICAgICAgICAgOiBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctd2hpdGUgcC0yIHRleHQteHMgdGV4dC1yb3NlLTcwMFwiXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lm1hcCgoZW50cnkpID0+IChcclxuICAgICAgICAgICAgICAgIDxwIGtleT17YCR7ZW50cnkuc3RlcH0tJHtlbnRyeS5hdH1gfT57YCR7ZW50cnkuc3RlcH06ICR7ZW50cnkudHJhY2VJZH1gfTwvcD5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGdhcC0yXCI+XG4gICAgICAgICAgICB7aGFzUGVuZGluZ1VwbG9hZFJldHJ5ID8gKFxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCIgb25DbGljaz17b25SZXRyeVBlbmRpbmdVcGxvYWR9PlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUmV0cnlVcGxvYWRcIiwgXCJSZWludGVudGFyIHVwbG9hZFwiKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCIgb25DbGljaz17b25DbGVhclF1aWNrVGlja2V0RXJyb3J9PlxyXG4gICAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0Nsb3NlXCIsIFwiQ2xvc2VcIil9XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgPC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIHsgRmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbSB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdBY3Rpb25CdXR0b24udHN4XCI7XHJcbmltcG9ydCB7IHVzZUF1dGhDb250ZXh0IH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XHJcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xyXG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcclxuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyBpbmRGb3JtYXQsIGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHsgY29uZmlndXJlRXhwZW5zZUFwaUF1dGggfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHsgaXNNYW5hZ2luZ090aGVyRXhwZW5zZVJlY29yZCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTWFuYWdlZFVzZXJTY29wZS50c1wiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCwgcmVsb2FkRXhwZW5zZVBhZ2UgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcclxuaW1wb3J0IHsgc2F2ZUV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dC50c1wiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlU3RhdHVzTGFiZWwgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VTdGF0dXNDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9ucy50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZS50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93LnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUgfSBmcm9tIFwiLi4vbGlzdC91c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUudHNcIjtcbmltcG9ydCB7IExpbmtUaWNrZXRJY29uLCBOZXdMaW5lSWNvbiwgTmV3VGlja2V0SWNvbiB9IGZyb20gXCIuL0V4cGVuc2VTaGVldERldGFpbEljb25zLnRzeFwiO1xuXHJcbmNvbnN0IExJTkVTX1BBR0VfU0laRSA9IDY7XHJcbmNvbnN0IEVYUEVOU0VfU1RBVFVTX0FQUFJPVkFMX1JFUVVFU1RFRCA9IDE7XHJcblxyXG5jb25zdCBwYWdlZFNsaWNlID0gPFQsPihpdGVtczogVFtdLCBwYWdlOiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIpOiBUW10gPT4ge1xyXG4gIGlmICghaXRlbXMubGVuZ3RoKSByZXR1cm4gW107XHJcbiAgY29uc3Qgc2FmZVBhZ2UgPSBNYXRoLm1heCgxLCBwYWdlKTtcclxuICBjb25zdCBzdGFydCA9IChzYWZlUGFnZSAtIDEpICogcGFnZVNpemU7XHJcbiAgcmV0dXJuIGl0ZW1zLnNsaWNlKHN0YXJ0LCBzdGFydCArIHBhZ2VTaXplKTtcclxufTtcclxuXHJcbi8vIFRyZWF0cyBvbmx5IHBvc2l0aXZlIG51bWVyaWMgdG90YWxzIGFzIGFjdGlvbmFibGUgc2hlZXQgY29udGVudC5cclxuY29uc3QgaGFzUG9zaXRpdmVUb3RhbEFtb3VudCA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XHJcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpICYmIHBhcnNlZCA+IDA7XHJcbn07XHJcblxyXG4vLyBJbml0aWFsaXplcyBhdXRoIHNlZWQgZm9yIGV4cGVuc2UgQVBJIGNhbGxzIGJlZm9yZSBpc2xhbmQgZWZmZWN0cyBydW4uXG5leHBvcnQgY29uc3QgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGggPSAoKSA9PiB7XG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoKHtcclxuICAgIHRva2VuOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBJX1RPS0VOX18pLFxyXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXHJcbiAgICBhcHBDb2RlOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBQX0NPREVfXyksXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyBPd25zIHRoZSBkZXRhaWwtcGFnZSBvcmNoZXN0cmF0aW9uIGFuZCBrZWVwcyB0aGUgdmlldyBjb21wb25lbnQgZm9jdXNlZCBvbiByZW5kZXJpbmcuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udHJvbGxlciA9ICgpID0+IHtcclxuICBjb25zdCB7XHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXHJcbiAgfSA9IHVzZUF1dGhDb250ZXh0KCk7XHJcbiAgY29uc3QgaGFzQWNjZXNzID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJWaWV3XCIpO1xyXG4gIGNvbnN0IGNhbkNyZWF0ZUV4cGVuc2UgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIkFkZFwiKTtcclxuICBjb25zdCBzaGVldElkID0gc2FmZVRleHQod2luZG93Ll9fRVhQRU5TRV9TSEVFVF9JRF9fKTtcclxuICBjb25zdCBzaGVldE1vZGUgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1NIRUVUX01PREVfXykudG9Mb3dlckNhc2UoKTtcclxuICBjb25zdCBpc0NyZWF0ZU1vZGUgPSBzaGVldE1vZGUgPT09IFwiY3JlYXRlXCI7XHJcbiAgY29uc3QgaXNNYW5hZ2luZ090aGVyVXNlckJ5U2VsZWN0aW9uID0gaXNNYW5hZ2luZ090aGVyRXhwZW5zZVJlY29yZCh7XHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgcmVjb3JkT3duZXJVc2VySWQ6IFwiXCIsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgfSk7XHJcbiAgY29uc3QgY2FuQ3JlYXRlRXhwZW5zZUZvclNlbGVjdGVkQ29udGV4dCA9IGNhbkNyZWF0ZUV4cGVuc2UgJiYgIWlzTWFuYWdpbmdPdGhlclVzZXJCeVNlbGVjdGlvbjtcclxuICBjb25zdCBsaW5lQ29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgY3JlYXRlZFNoZWV0SWRSZWYgPSB1c2VSZWYoXCJcIik7XHJcbiAgY29uc3QgY2FtZXJhSW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGdhbGxlcnlJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2lzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSwgc2V0SXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc3RhdHVzVHJhbnNpdGlvbkNvbW1lbnQsIHNldFN0YXR1c1RyYW5zaXRpb25Db21tZW50XSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtzaG93U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRGaWVsZCwgc2V0U2hvd1N0YXR1c1RyYW5zaXRpb25Db21tZW50RmllbGRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IHN0YXR1c1RyYW5zaXRpb25Db21tZW50UmVmID0gdXNlUmVmKFwiXCIpO1xyXG5cclxuICBjb25zdCBwYWdpbmF0aW9uTGFiZWxzID0gdXNlTWVtbyhcclxuICAgICgpID0+ICh7XHJcbiAgICAgIGZpcnN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIiksXHJcbiAgICAgIHByZXY6IGluZFQoXCJIaXN0b3J5X1BhZ2VfUHJldlwiLCBcIlByZXZpb3VzXCIpLFxyXG4gICAgICBuZXh0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX05leHRcIiwgXCJOZXh0XCIpLFxyXG4gICAgICBsYXN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpLFxyXG4gICAgfSksXHJcbiAgICBbXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGRldGFpbFN0YXRlID0gdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUoe1xyXG4gICAgaGFzQWNjZXNzLFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogY2FuQ3JlYXRlRXhwZW5zZUZvclNlbGVjdGVkQ29udGV4dCxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIHNoZWV0SWQsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcclxuICB9KTtcclxuXHJcbiAgY29uc3Qge1xyXG4gICAgaGVhZGVyLFxyXG4gICAgbGluZXMsXHJcbiAgICBsaW5lUGFnZSxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGJ1c3ksXHJcbiAgICBzdGF0dXMsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBtb2RhbEVycm9yLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRyYWZ0UHJvamVjdElkLFxyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlLFxyXG4gICAgcHJvamVjdFZhbHVlLFxyXG4gICAgZGV0YWlsUG9saWN5LFxyXG4gICAgaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgIGlzU2hlZXRMb2NrZWQsXHJcbiAgICBleGNoYW5nZVJhdGVWYWx1ZSxcclxuICAgIHNob3dFeGNoYW5nZVJhdGUsXHJcbiAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcclxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcclxuICAgIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudCxcclxuICAgIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlLFxyXG4gICAgY2FuRWRpdEFueUN1cnJlbnQsXHJcbiAgICBjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzLFxyXG4gICAgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXHJcbiAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcclxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcclxuICAgIHNldExpbmVQYWdlLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXHJcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlLFxyXG4gICAgaGFuZGxlT3BlbkxpbmtUaWNrZXRNb2RlLFxyXG4gICAgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldCxcclxuICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsLFxyXG4gIH0gPSBkZXRhaWxTdGF0ZTtcclxuXHJcbiAgY29uc3QgY2FuQ3JlYXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3ID0gY2FuQ3JlYXRlRXhwZW5zZSAmJiAhaXNNYW5hZ2luZ090aGVyVXNlcjtcclxuICBjb25zdCBjYW5EZWxldGVFeHBlbnNlRm9yQ3VycmVudFZpZXcgPSBkZXRhaWxQb2xpY3kuY2FuRGVsZXRlU2hlZXQ7XHJcbiAgY29uc3QgY2FuVHJhbnNpdGlvblN0YXR1cyA9IGRldGFpbFBvbGljeS5zdGF0dXNBY3Rpb25zLmxlbmd0aCA+IDA7XHJcbiAgY29uc3QgaXNSZWFkT25seU1vZGUgPSBkZXRhaWxQb2xpY3kuaW50ZXJhY3Rpb25Nb2RlID09PSBcInJlYWRfb25seVwiO1xyXG4gIGNvbnN0IGN1cnJlbnRTdGF0dXNDb2RlID0gdHlwZW9mIGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzID09PSBcIm51bWJlclwiID8gaGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA6IG51bGw7XHJcbiAgY29uc3QgaGlkZXNDcnVkVG9wYmFyQnlTdGF0dXMgPVxyXG4gICAgY3VycmVudFN0YXR1c0NvZGUgPT09IEVYUEVOU0VfU1RBVFVTX0FQUFJPVkFMX1JFUVVFU1RFRCAmJiAhY2FuRWRpdEFueUN1cnJlbnQ7XHJcbiAgY29uc3QgdG9wYmFyQWN0aW9uTW9kZSA9ICFpc0NyZWF0ZU1vZGUgJiYgKGlzUmVhZE9ubHlNb2RlIHx8IGhpZGVzQ3J1ZFRvcGJhckJ5U3RhdHVzKSA/IFwidmlld19vbmx5XCIgOiBcImRlZmF1bHRcIjtcclxuICBjb25zdCBkZXRhaWxQZXJtaXNzaW9uc1JlYWR5ID0gbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5ICYmIChpc0NyZWF0ZU1vZGUgfHwgISFoZWFkZXIpO1xyXG4gIGNvbnN0IHsgaW52YWxpZGF0ZUNhY2hlZExpc3RGb3JSZWZldGNoIH0gPSB1c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUoKTtcclxuXHJcbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XHJcbiAgICBkZWZhdWx0Q29uZmlybVRleHQ6IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpLFxyXG4gICAgZGVmYXVsdENhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCByZXNldFN0YXR1c1RyYW5zaXRpb25EaWFsb2cgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzdGF0dXNUcmFuc2l0aW9uQ29tbWVudFJlZi5jdXJyZW50ID0gXCJcIjtcclxuICAgIHNldFN0YXR1c1RyYW5zaXRpb25Db21tZW50KFwiXCIpO1xyXG4gICAgc2V0U2hvd1N0YXR1c1RyYW5zaXRpb25Db21tZW50RmllbGQoZmFsc2UpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xvc2VDb25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgcmVzZXRTdGF0dXNUcmFuc2l0aW9uRGlhbG9nKCk7XHJcbiAgICBjbG9zZUNvbmZpcm0oKTtcclxuICB9LCBbY2xvc2VDb25maXJtLCByZXNldFN0YXR1c1RyYW5zaXRpb25EaWFsb2ddKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xyXG4gICAgICBidXN5LFxyXG4gICAgICBvbkVycm9yOiAobXNnKSA9PiB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm0sIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1c10pO1xyXG5cclxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcclxuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBidXN5XHJcbiAgICA/IG1vZGFsTG9hZGluZ1RleHRcclxuICAgIDogIWJ1c3kgJiYgbW9kYWxFcnJvclxyXG4gICAgICA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKVxyXG4gICAgICA6IChtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghYnVzeSAmJiBtb2RhbEVycm9yKSB7XHJcbiAgICAgIGhhbmRsZUNsb3NlQ29uZmlybSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdm9pZCBoYW5kbGVNb2RhbENvbmZpcm0oKTtcclxuICB9LCBbYnVzeSwgaGFuZGxlQ2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm0sIG1vZGFsRXJyb3JdKTtcclxuXHJcbiAgY29uc3QgdmlzaWJsZUxpbmVzID0gdXNlTWVtbygoKSA9PiBwYWdlZFNsaWNlKGxpbmVzLCBsaW5lUGFnZSwgTElORVNfUEFHRV9TSVpFKSwgW2xpbmVQYWdlLCBsaW5lc10pO1xyXG4gIGNvbnN0IHRvdGFsTGluZVBhZ2VzID0gTWF0aC5jZWlsKChsaW5lcy5sZW5ndGggfHwgMCkgLyBMSU5FU19QQUdFX1NJWkUpO1xuICBjb25zdCB0b3RhbEFtb3VudFRleHQgPSB1c2VNZW1vKFxuICAgICgpID0+IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShoZWFkZXI/LnRvdGFsQW1vdW50ID8/IG51bGwsIHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSksXG4gICAgW2hlYWRlcj8uY3VycmVuY3lDb2RlLCBoZWFkZXI/LnRvdGFsQW1vdW50XVxuICApO1xuICBjb25zdCBoYXNTdGF0dXNBY3Rpb25Db250ZW50ID0gbGluZXMubGVuZ3RoID4gMCB8fCBoYXNQb3NpdGl2ZVRvdGFsQW1vdW50KGhlYWRlcj8udG90YWxBbW91bnQpO1xyXG4gIGNvbnN0IGFyZVN0YXR1c0FjdGlvbnNEaXNhYmxlZCA9ICFoYXNTdGF0dXNBY3Rpb25Db250ZW50O1xuICBjb25zdCBvd25lckRpc3BsYXkgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBvd25lclVzZXJJZCA9IHNhZmVUZXh0KGhlYWRlcj8udXNlcklkKTtcbiAgICBjb25zdCBjdXJyZW50VXNlcklkID0gc2FmZVRleHQoY3VycmVudENybVVzZXJJZCk7XG4gICAgaWYgKCFvd25lclVzZXJJZCB8fCAhY3VycmVudFVzZXJJZCB8fCBvd25lclVzZXJJZC50b1VwcGVyQ2FzZSgpID09PSBjdXJyZW50VXNlcklkLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cblxuICAgIGNvbnN0IG93bmVyTmFtZSA9IHNhZmVUZXh0KGhlYWRlcj8udXNlck5hbWUpO1xuICAgIHJldHVybiBvd25lck5hbWUgPyBgJHtvd25lck5hbWV9ICgke293bmVyVXNlcklkfSlgIDogb3duZXJVc2VySWQ7XG4gIH0sIFtjdXJyZW50Q3JtVXNlcklkLCBoZWFkZXI/LnVzZXJJZCwgaGVhZGVyPy51c2VyTmFtZV0pO1xuXG4gIGNvbnN0IHsgaGFuZGxlVXBkYXRlLCBoYW5kbGVTdGF0dXNUcmFuc2l0aW9uLCBoYW5kbGVEZWxldGUgfSA9IHVzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9ucyh7XG4gICAgYnVzeSxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzRWRpdExvY2tlZDogaXNSZWFkT25seU1vZGUsXHJcbiAgICBpc0RlbGV0ZUxvY2tlZDogaXNTaGVldExvY2tlZCxcclxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxyXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gICAgbG9ja2VkQ3VycmVuY3lDb2RlOiBzYWZlVGV4dChoZWFkZXI/LmN1cnJlbmN5Q29kZSksXHJcbiAgICBsb2NrZWRFeGNoYW5nZVJhdGU6IHNhZmVUZXh0KGhlYWRlcj8uZXhjaFJhdGUpLFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogY2FuQ3JlYXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxyXG4gICAgY2FuRWRpdEV4cGVuc2U6IGNhbkVkaXRBbnlDdXJyZW50LFxyXG4gICAgY2FuRGVsZXRlRXhwZW5zZTogY2FuRGVsZXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxyXG4gICAgY2FuRWRpdEhlYWRlckZpZWxkczogY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXHJcbiAgICBjYW5UcmFuc2l0aW9uU3RhdHVzLFxyXG4gICAgc2hlZXRJZCxcclxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcclxuICAgIGRyYWZ0UHJvamVjdElkLFxuICAgIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXG4gICAgY3VycmVudEV4cGVuc2VTaGVldFN0YXR1czogaGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMsXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxuICAgIG9uQ3JlYXRlU3VjY2VzczogKGNyZWF0ZWRTaGVldElkKSA9PiB7XHJcbiAgICAgIGNyZWF0ZWRTaGVldElkUmVmLmN1cnJlbnQgPSBzYWZlVGV4dChjcmVhdGVkU2hlZXRJZCk7XHJcbiAgICB9LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU9wZW5MaW5lRGV0YWlsID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAobGluZVJlY0lkOiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3Qgc2FmZUxpbmVJZCA9IHNhZmVUZXh0KGxpbmVSZWNJZCk7XHJcbiAgICAgIGlmICghc2FmZUxpbmVJZCB8fCBidXN5IHx8IGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGlzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCkge1xyXG4gICAgICAgIGNvbnN0IG9rID0gYXdhaXQgaGFuZGxlVXBkYXRlKCk7XHJcbiAgICAgICAgaWYgKCFvaykge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmF2aWdhdGVUb0xpbmVEZXRhaWwoc2FmZUxpbmVJZCwge1xyXG4gICAgICAgICAgbW9kZTogXCJlZGl0XCIsXHJcbiAgICAgICAgICBhc2tDb25maXJtYXRpb246IGZhbHNlLFxyXG4gICAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgbmF2aWdhdGVUb0xpbmVEZXRhaWwoc2FmZUxpbmVJZCk7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBidXN5LFxyXG4gICAgICBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcclxuICAgICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgICBpc0VkaXRpbmcsXHJcbiAgICAgIGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSxcclxuICAgICAgbmF2aWdhdGVUb0xpbmVEZXRhaWwsXHJcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2F2ZVN1Y2Nlc3MgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgIGNvbnN0IGNyZWF0ZWRTaGVldElkID0gc2FmZVRleHQoY3JlYXRlZFNoZWV0SWRSZWYuY3VycmVudCk7XHJcbiAgICAgIGlmICghY3JlYXRlZFNoZWV0SWQpIHJldHVybjtcclxuICAgICAgc2F2ZUV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0KHtcclxuICAgICAgICBzaGVldElkOiBjcmVhdGVkU2hlZXRJZCxcclxuICAgICAgfSk7XHJcbiAgICAgIHNldElzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSh0cnVlKTtcclxuICAgICAgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldChjcmVhdGVkU2hlZXRJZCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICByZWxvYWRFeHBlbnNlUGFnZSgpO1xyXG4gIH0sIFtpc0NyZWF0ZU1vZGUsIG5hdmlnYXRlVG9DcmVhdGVkU2hlZXRdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU3RhdHVzQWN0aW9uQ2xpY2sgPSB1c2VDYWxsYmFjayhcclxuICAgIChhY3Rpb246IHsgbGFiZWxLZXk6IHN0cmluZzsgZmFsbGJhY2s6IHN0cmluZzsgbmV4dFN0YXR1czogbnVtYmVyIH0pID0+IHtcclxuICAgICAgaWYgKCFoYXNTdGF0dXNBY3Rpb25Db250ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBhY3Rpb25MYWJlbCA9IGluZFQoYWN0aW9uLmxhYmVsS2V5LCBhY3Rpb24uZmFsbGJhY2spO1xyXG4gICAgICBjb25zdCBjdXJyZW50U3RhdHVzTGFiZWwgPVxyXG4gICAgICAgIGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzID09PSBudWxsIHx8IGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzID09PSB1bmRlZmluZWRcclxuICAgICAgICAgID8gaW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpXHJcbiAgICAgICAgICA6IGdldEV4cGVuc2VTdGF0dXNMYWJlbChoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzKTtcclxuICAgICAgY29uc3QgbmV4dFN0YXR1c0xhYmVsID0gZ2V0RXhwZW5zZVN0YXR1c0xhYmVsKGFjdGlvbi5uZXh0U3RhdHVzKTtcclxuICAgICAgY29uc3QgdHJhbnNpdGlvbk1lc3NhZ2UgPSBpbmRGb3JtYXQoXHJcbiAgICAgICAgXCJFeHBlbnNlU2hlZXRzX0JvdHRvbUFjdGlvbnNfQ29uZmlybVRyYW5zaXRpb25cIixcclxuICAgICAgICBcIkN1cnJlbnQgc3RhdHVzOiB7MH1cXG5OZXcgc3RhdHVzOiB7MX1cXG5cXG5EbyB5b3Ugd2FudCB0byB1cGRhdGUgdGhlIGV4cGVuc2Ugc2hlZXQgc3RhdHVzP1wiLFxyXG4gICAgICAgIGN1cnJlbnRTdGF0dXNMYWJlbCxcclxuICAgICAgICBuZXh0U3RhdHVzTGFiZWxcclxuICAgICAgKS5yZXBsYWNlKC9cXFxcbi9nLCBcIlxcblwiKTtcclxuICAgICAgY29uc3QgaW5pdGlhbENvbW1lbnQgPSBzYWZlVGV4dChoZWFkZXI/LmVzdGFkb0NvbWVudGFyaW9zKTtcclxuICAgICAgc3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRSZWYuY3VycmVudCA9IGluaXRpYWxDb21tZW50O1xyXG4gICAgICBzZXRTdGF0dXNUcmFuc2l0aW9uQ29tbWVudChpbml0aWFsQ29tbWVudCk7XHJcbiAgICAgIHNldFNob3dTdGF0dXNUcmFuc2l0aW9uQ29tbWVudEZpZWxkKHRydWUpO1xyXG5cclxuICAgICAgb3BlbkNvbmZpcm0oe1xyXG4gICAgICAgIHRpdGxlOiBhY3Rpb25MYWJlbCxcclxuICAgICAgICBtZXNzYWdlOiB0cmFuc2l0aW9uTWVzc2FnZSxcclxuICAgICAgICBjb25maXJtVGV4dDogYWN0aW9uTGFiZWwsXHJcbiAgICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZVN0YXR1c1RyYW5zaXRpb24oXHJcbiAgICAgICAgICAgIGFjdGlvbi5uZXh0U3RhdHVzLFxyXG4gICAgICAgICAgICBhY3Rpb25MYWJlbCxcclxuICAgICAgICAgICAgc3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRSZWYuY3VycmVudFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGlmIChvaykge1xyXG4gICAgICAgICAgICBpbnZhbGlkYXRlQ2FjaGVkTGlzdEZvclJlZmV0Y2goKTtcclxuICAgICAgICAgICAgcmVzZXRTdGF0dXNUcmFuc2l0aW9uRGlhbG9nKCk7XHJcbiAgICAgICAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICAgICAgICByZWxvYWRFeHBlbnNlUGFnZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG9rO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgY2xvc2VDb25maXJtLFxyXG4gICAgICBoYW5kbGVTdGF0dXNUcmFuc2l0aW9uLFxyXG4gICAgICBoYXNTdGF0dXNBY3Rpb25Db250ZW50LFxyXG4gICAgICBoZWFkZXI/LmVzdGFkb0NvbWVudGFyaW9zLFxyXG4gICAgICBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyxcclxuICAgICAgaW52YWxpZGF0ZUNhY2hlZExpc3RGb3JSZWZldGNoLFxyXG4gICAgICBvcGVuQ29uZmlybSxcclxuICAgICAgcmVzZXRTdGF0dXNUcmFuc2l0aW9uRGlhbG9nLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIHVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMoe1xyXG4gICAgYnVzeTogYnVzeSB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsXHJcbiAgICBtb2RhbE9wZW46IG1vZGFsLm9wZW4sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBhY3Rpb25Nb2RlOiB0b3BiYXJBY3Rpb25Nb2RlLFxyXG4gICAgaXNMb2NrZWQ6IGlzU2hlZXRMb2NrZWQsXHJcbiAgICBpc0VkaXRMb2NrZWQ6IGlzUmVhZE9ubHlNb2RlLFxyXG4gICAgaXNEZWxldGVMb2NrZWQ6IGlzU2hlZXRMb2NrZWQsXHJcbiAgICBwZXJtaXNzaW9uc1JlYWR5OiBkZXRhaWxQZXJtaXNzaW9uc1JlYWR5LFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogY2FuQ3JlYXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxyXG4gICAgY2FuRWRpdEV4cGVuc2U6IGNhbkVkaXRBbnlDdXJyZW50LFxyXG4gICAgY2FuRGVsZXRlRXhwZW5zZTogY2FuRGVsZXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgb25TYXZlU3VjY2VzczogaGFuZGxlU2F2ZVN1Y2Nlc3MsXHJcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgaW52YWxpZGF0ZUNhY2hlZExpc3RGb3JSZWZldGNoKCk7XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXRzXCIpO1xyXG4gICAgfSxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xyXG4gICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcclxuICAgIGNvbnN0IGNhcmQgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiKTtcclxuICAgIGlmICghY2FyZCkgcmV0dXJuIG51bGw7XHJcbiAgICBpZiAoIWxpbmVDb250YWluZXJSZWYuY3VycmVudD8uY29udGFpbnMoY2FyZCkpIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIGNhcmQ7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VUaW1lbGluZUNhcmRFZmZlY3RzKHtcclxuICAgIGNvbnRhaW5lclJlZjogbGluZUNvbnRhaW5lclJlZixcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGl0ZW1zOiB2aXNpYmxlTGluZXMsXHJcbiAgICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgcXVpY2tUaWNrZXRGbG93ID0gdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93KHtcclxuICAgIHNoZWV0SWQ6IHNhZmVUZXh0KGhlYWRlcj8uaG9qYUdhc3Rvc0lkIHx8IHNoZWV0SWQpLFxyXG4gICAgcHJvamVjdElkOiBwcm9qZWN0VmFsdWUsXHJcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSxcclxuICAgIGNhbkNyZWF0ZUV4cGVuc2U6ICFpc0NyZWF0ZU1vZGUgJiYgZGV0YWlsUG9saWN5LnNob3dGYWIsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc1NoZWV0TG9ja2VkOiAhY2FuVXNlRnVsbEVkaXRGZWF0dXJlcyxcclxuICAgIGxpbmtUb1NoZWV0OiBmYWxzZSxcclxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxyXG4gICAgb25Db21wbGV0ZWQ6IChyZXN1bHQpID0+IHtcclxuICAgICAgY29uc3QgY3JlYXRlZEZpbGVJZCA9IHNhZmVUZXh0KHJlc3VsdD8uZmlsZUlkKTtcclxuICAgICAgaWYgKCFjcmVhdGVkRmlsZUlkKSB7XHJcbiAgICAgICAgcmVsb2FkRXhwZW5zZVBhZ2UoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChyZXN1bHQ/LmxpbmtlZFRvU2hlZXQgPT09IHRydWUpIHtcclxuICAgICAgICByZWxvYWRFeHBlbnNlUGFnZSgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY3VycmVudFNoZWV0SWQgPSBzYWZlVGV4dChoZWFkZXI/LmhvamFHYXN0b3NJZCB8fCBzaGVldElkKTtcclxuICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgICBmaWxlSWQ6IGNyZWF0ZWRGaWxlSWQsXHJcbiAgICAgICAgbW9kZTogXCJlZGl0XCIsXHJcbiAgICAgICAgb3JpZ2luOiBcInNoZWV0LWNyZWF0ZVwiLFxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKGN1cnJlbnRTaGVldElkKSB7XHJcbiAgICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KHtcclxuICAgICAgICAgIGZpbGVJZDogY3JlYXRlZEZpbGVJZCxcclxuICAgICAgICAgIG9yaWdpbjogXCJzaGVldC1jcmVhdGVcIixcclxuICAgICAgICAgIHNoZWV0SWQ6IGN1cnJlbnRTaGVldElkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHF1ZXJ5LnNldChcInNoZWV0SWRcIiwgY3VycmVudFNoZWV0SWQpO1xyXG4gICAgICB9XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCk7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBmYWJNZW51SXRlbXMgPSB1c2VNZW1vPEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW1bXT4oXHJcbiAgICAoKSA9PiBbXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogXCJuZXctdGlja2V0XCIsXHJcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9OZXdUaWNrZXRcIiwgXCJOdWV2byBUaWNrZXRcIiksXHJcbiAgICAgICAgaWNvbjogPE5ld1RpY2tldEljb24gLz4sXHJcbiAgICAgICAgb25DbGljazogcXVpY2tUaWNrZXRGbG93Lm9wZW5Tb3VyY2VQaWNrZXIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogXCJsaW5rLXRpY2tldFwiLFxyXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfTGlua1RpY2tldFwiLCBcIlZpbmN1bGFyIFRpY2tldFwiKSxcclxuICAgICAgICBpY29uOiA8TGlua1RpY2tldEljb24gLz4sXHJcbiAgICAgICAgb25DbGljazogaGFuZGxlT3BlbkxpbmtUaWNrZXRNb2RlLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IFwibmV3LWxpbmVcIixcclxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX05ld0xpbmVcIiwgXCJOdWV2YSBMaW5lYVwiKSxcclxuICAgICAgICBpY29uOiA8TmV3TGluZUljb24gLz4sXHJcbiAgICAgICAgb25DbGljazogaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICAgIFtoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUsIGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSwgcXVpY2tUaWNrZXRGbG93Lm9wZW5Tb3VyY2VQaWNrZXJdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2hvd1N0YXR1c0FjdGlvbkJhciA9XHJcbiAgICAhaXNDcmVhdGVNb2RlICYmICFpc0xvYWRpbmcgJiYgIWlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSAmJiAhZXJyb3JNZXNzYWdlICYmIGRldGFpbFBvbGljeS5zdGF0dXNBY3Rpb25zLmxlbmd0aCA+IDA7XHJcbiAgY29uc3Qgc2hvd0ZhYiA9ICFpc0NyZWF0ZU1vZGUgJiYgZGV0YWlsUG9saWN5LnNob3dGYWI7XHJcbiAgY29uc3QgaGFzVmlzaWJsZVN0YXR1c0NvbW1lbnQgPSBzYWZlVGV4dChoZWFkZXI/LmVzdGFkb0NvbWVudGFyaW9zKS50cmltKCkubGVuZ3RoID4gMDtcclxuICBjb25zdCBzdGF0dXNDb21tZW50TW9kZTogXCJoaWRkZW5cIiB8IFwicmVhZFwiID0gaGFzVmlzaWJsZVN0YXR1c0NvbW1lbnQgPyBcInJlYWRcIiA6IFwiaGlkZGVuXCI7XHJcbiAgY29uc3QgbW9kYWxCb2R5ID0gc2hvd1N0YXR1c1RyYW5zaXRpb25Db21tZW50RmllbGQgPyAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XHJcbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj5cclxuICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzQ29tbWVudFwiLCBcIlN0YXR1cyBjb21tZW50XCIpfVxyXG4gICAgICA8L2xhYmVsPlxyXG4gICAgICA8dGV4dGFyZWFcclxuICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgcmVzaXplLW5vbmVcIlxyXG4gICAgICAgIHJvd3M9ezN9XHJcbiAgICAgICAgdmFsdWU9e3N0YXR1c1RyYW5zaXRpb25Db21tZW50fVxyXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG5leHRWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiO1xyXG4gICAgICAgICAgc3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRSZWYuY3VycmVudCA9IG5leHRWYWx1ZTtcclxuICAgICAgICAgIHNldFN0YXR1c1RyYW5zaXRpb25Db21tZW50KG5leHRWYWx1ZSk7XHJcbiAgICAgICAgfX1cclxuICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TdGF0dXNDb21tZW50XCIsIFwiU3RhdHVzIGNvbW1lbnRcIil9XHJcbiAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxuICApIDogbnVsbDtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNoZWV0SWQsXHJcbiAgICBoZWFkZXIsXHJcbiAgICB2aXNpYmxlTGluZXMsXHJcbiAgICBsaW5lUGFnZSxcclxuICAgIHRvdGFsTGluZVBhZ2VzLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgYnVzeSxcclxuICAgIHN0YXR1cyxcclxuICAgIG1vZGFsRXJyb3IsXHJcbiAgICBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsXHJcbiAgICBtb2RhbCxcclxuICAgIG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgICBtb2RhbENhbmNlbFRleHQsXHJcbiAgICBtb2RhbENvbmZpcm1UZXh0LFxyXG4gICAgbW9kYWxCb2R5LFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxyXG4gICAgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXHJcbiAgICBjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzLFxyXG4gICAgc2hvd1N0YXR1c0FjdGlvbkJhcixcclxuICAgIHNob3dGYWIsXHJcbiAgICBhcmVTdGF0dXNBY3Rpb25zRGlzYWJsZWQsXHJcbiAgICBmYWJNZW51SXRlbXMsXHJcbiAgICBwYWdpbmF0aW9uTGFiZWxzLFxyXG4gICAgdG90YWxBbW91bnRUZXh0LFxyXG4gICAgc3RhdHVzQ29tbWVudE1vZGUsXG4gICAgb3duZXJEaXNwbGF5LFxuICAgIHByb2plY3RWYWx1ZSxcbiAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcclxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcclxuICAgIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudCxcclxuICAgIHNob3dFeGNoYW5nZVJhdGUsXHJcbiAgICBleGNoYW5nZVJhdGVWYWx1ZSxcclxuICAgIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRyYWZ0UHJvamVjdElkLFxyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsXHJcbiAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcclxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcclxuICAgIGRldGFpbFBvbGljeSxcclxuICAgIGxpbmVDb250YWluZXJSZWYsXHJcbiAgICBjYW1lcmFJbnB1dFJlZixcclxuICAgIGdhbGxlcnlJbnB1dFJlZixcclxuICAgIHF1aWNrVGlja2V0RmxvdyxcclxuICAgIHNldExpbmVQYWdlLFxyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICAgIHNldERyYWZ0UHJvamVjdElkLFxyXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIHNldERyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICBuYXZpZ2F0ZVRvTGluZURldGFpbDogaGFuZGxlT3BlbkxpbmVEZXRhaWwsXHJcbiAgICBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgICBoYW5kbGVTdGF0dXNBY3Rpb25DbGljayxcclxuICAgIGNsb3NlQ29uZmlybTogaGFuZGxlQ2xvc2VDb25maXJtLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQge1xyXG4gIGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeSxcclxuICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LFxyXG4gIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeSxcclxufSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvc2Vzc2lvbkV4cGlyeS50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VTY29wZVRva2VuIH0gZnJvbSBcIi4vZXhwZW5zZVNjb3BlLnRzXCI7XHJcblxyXG5jb25zdCBFWFBFTlNFX1NIRUVUX0NSRUFURURfUkVUVVJOX0NPTlRFWFRfS0VZX1BSRUZJWCA9IFwiZXhwZW5zZV9zaGVldF9jcmVhdGVkX3JldHVybl9jb250ZXh0X3YxXCI7XHJcbmNvbnN0IEVYUEVOU0VfU0hFRVRfQ1JFQVRFRF9SRVRVUk5fQ09OVEVYVF9UVExfTVMgPSAyICogNjAgKiA2MCAqIDEwMDA7XHJcblxyXG5leHBvcnQgdHlwZSBFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCA9IHtcclxuICBzaGVldElkOiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCBnZXRTY29wZWRLZXkgPSAoKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gYCR7RVhQRU5TRV9TSEVFVF9DUkVBVEVEX1JFVFVSTl9DT05URVhUX0tFWV9QUkVGSVh9XyR7Z2V0RXhwZW5zZVNjb3BlVG9rZW4oKX1gO1xyXG59O1xyXG5cclxuLy8gTm9ybWFsaXplcyB0aGUgY3JlYXRlZC1zaGVldCByZXR1cm4gcGF5bG9hZCB1c2VkIGJldHdlZW4gY3JlYXRlIGFuZCBkZXRhaWwgZmxvd3MuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCA9IChcclxuICB2YWx1ZTogdW5rbm93blxyXG4pOiBFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCB8IG51bGwgPT4ge1xyXG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgcGF5bG9hZCA9IHZhbHVlIGFzIFBhcnRpYWw8RXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQ+O1xyXG4gIGNvbnN0IHNoZWV0SWQgPSBzYWZlVGV4dChwYXlsb2FkLnNoZWV0SWQpO1xyXG4gIGlmICghc2hlZXRJZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzaGVldElkLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBSZWFkcyB0aGUgc3RvcmVkIGNyZWF0ZWQtc2hlZXQgcmV0dXJuIGNvbnRleHQgZm9yIHRoZSBhY3RpdmUgZXhwZW5zZSBzY29wZS5cclxuZXhwb3J0IGNvbnN0IHJlYWRFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCA9IChcclxuICBzaGVldElkPzogdW5rbm93blxyXG4pOiBFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IHN0b3JlZCA9IG5vcm1hbGl6ZUV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0KFxyXG4gICAgZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5PEV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0PihnZXRTY29wZWRLZXkoKSlcclxuICApO1xyXG4gIGlmICghc3RvcmVkKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChzaGVldElkKTtcclxuICBpZiAoIXNhZmVTaGVldElkKSByZXR1cm4gc3RvcmVkO1xyXG4gIHJldHVybiBzdG9yZWQuc2hlZXRJZC50b1VwcGVyQ2FzZSgpID09PSBzYWZlU2hlZXRJZC50b1VwcGVyQ2FzZSgpID8gc3RvcmVkIDogbnVsbDtcclxufTtcclxuXHJcbi8vIENsZWFycyB0aGUgY3JlYXRlZC1zaGVldCByZXR1cm4gY29udGV4dCBmb3IgdGhlIGFjdGl2ZSBleHBlbnNlIHNjb3BlLlxyXG5leHBvcnQgY29uc3QgY2xlYXJFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCA9ICgpOiB2b2lkID0+IHtcclxuICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGdldFNjb3BlZEtleSgpKTtcclxufTtcclxuXHJcbi8vIFBlcnNpc3RzIHRoZSBjcmVhdGVkLXNoZWV0IGNvbnRleHQgc28gdGhlIG5leHQgZGV0YWlsIHBhZ2UgY2FuIGFybSB0aGUgbGlzdCByZXR1cm4gc3RhdGUuXHJcbmV4cG9ydCBjb25zdCBzYXZlRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQgPSAoXHJcbiAgdmFsdWU6IEV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0IHwgbnVsbCB8IHVuZGVmaW5lZFxyXG4pOiBFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCh2YWx1ZSk7XHJcbiAgaWYgKCFub3JtYWxpemVkKSB7XHJcbiAgICBjbGVhckV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0KCk7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeShnZXRTY29wZWRLZXkoKSwgbm9ybWFsaXplZCwgRVhQRU5TRV9TSEVFVF9DUkVBVEVEX1JFVFVSTl9DT05URVhUX1RUTF9NUyk7XHJcbiAgcmV0dXJuIG5vcm1hbGl6ZWQ7XHJcbn07XHJcblxyXG4vLyBDb25zdW1lcyB0aGUgY3JlYXRlZC1zaGVldCBjb250ZXh0IG9uY2UgdGhlIG1hdGNoaW5nIGRldGFpbCBwYWdlIGlzIGxvYWRlZC5cclxuZXhwb3J0IGNvbnN0IGNvbnN1bWVFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCA9IChcclxuICBzaGVldElkPzogdW5rbm93blxyXG4pOiBFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IHN0b3JlZCA9IHJlYWRFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dChzaGVldElkKTtcclxuICBpZiAoIXN0b3JlZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNsZWFyRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQoKTtcclxuICByZXR1cm4gc3RvcmVkO1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0LCBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0IH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbiB9IGZyb20gXCIuLi9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50c1wiO1xuaW1wb3J0IHtcclxuICBjcmVhdGVFeHBlbnNlU2hlZXQsXHJcbiAgZGVsZXRlRXhwZW5zZVNoZWV0LFxyXG4gIHVwZGF0ZUV4cGVuc2VTaGVldEhlYWRlcixcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnNBcmdzID0ge1xuICBidXN5OiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XHJcbiAgaXNFZGl0TG9ja2VkOiBib29sZWFuO1xyXG4gIGlzRGVsZXRlTG9ja2VkOiBib29sZWFuO1xyXG4gIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xyXG4gIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lczogYm9vbGVhbjtcclxuICBsb2NrZWRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBsb2NrZWRFeGNoYW5nZVJhdGU6IHN0cmluZztcclxuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xyXG4gIGNhbkVkaXRFeHBlbnNlOiBib29sZWFuO1xyXG4gIGNhbkRlbGV0ZUV4cGVuc2U6IGJvb2xlYW47XHJcbiAgY2FuRWRpdEhlYWRlckZpZWxkczogYm9vbGVhbjtcclxuICBjYW5UcmFuc2l0aW9uU3RhdHVzOiBib29sZWFuO1xyXG4gIHNoZWV0SWQ6IHN0cmluZztcclxuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBkcmFmdEV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWU6IHN0cmluZztcclxuICBkcmFmdFByb2plY3RJZDogc3RyaW5nO1xyXG4gIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3M6IHN0cmluZztcclxuICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k6IHN0cmluZztcbiAgY3VycmVudEV4cGVuc2VTaGVldFN0YXR1cz86IG51bWJlciB8IG51bGw7XG4gIG9uQ3JlYXRlU3VjY2VzczogKGNyZWF0ZWRTaGVldElkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldEJ1c3k6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxuICBzZXRTdGF0dXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldElzRWRpdGluZzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG59O1xyXG5cclxuLy8gRW5jYXBzdWxhdGVzIHVwZGF0ZSBhbmQgZGVsZXRlIG11dGF0aW9ucyBmb3IgZXhwZW5zZSBzaGVldCBoZWFkZXIgZGV0YWlsLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9ucyA9ICh7XHJcbiAgYnVzeSxcclxuICBpc0VkaXRpbmcsXHJcbiAgaXNDcmVhdGVNb2RlLFxyXG4gIGlzRWRpdExvY2tlZCxcclxuICBpc0RlbGV0ZUxvY2tlZCxcclxuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcclxuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXHJcbiAgbG9ja2VkQ3VycmVuY3lDb2RlLFxyXG4gIGxvY2tlZEV4Y2hhbmdlUmF0ZSxcclxuICBjYW5DcmVhdGVFeHBlbnNlLFxyXG4gIGNhbkVkaXRFeHBlbnNlLFxyXG4gIGNhbkRlbGV0ZUV4cGVuc2UsXHJcbiAgY2FuRWRpdEhlYWRlckZpZWxkcyxcclxuICBjYW5UcmFuc2l0aW9uU3RhdHVzLFxyXG4gIHNoZWV0SWQsXHJcbiAgZHJhZnREZXNjcmlwdGlvbixcclxuICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gIGRyYWZ0UHJvamVjdElkLFxyXG4gIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXG4gIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgY3VycmVudEV4cGVuc2VTaGVldFN0YXR1cyxcbiAgb25DcmVhdGVTdWNjZXNzLFxuICBzZXRNb2RhbEVycm9yLFxyXG4gIHNldEJ1c3ksXHJcbiAgc2V0U3RhdHVzLFxyXG4gIHNldElzRWRpdGluZyxcclxufTogVXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zQXJncykgPT4ge1xyXG4gIGNvbnN0IGJ1aWxkVXBkYXRlUGF5bG9hZCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKFxyXG4gICAgICBuZXh0U3RhdHVzPzogbnVtYmVyIHwgbnVsbCxcclxuICAgICAgc3RhdHVzQ29tbWVudE92ZXJyaWRlPzogc3RyaW5nIHwgbnVsbFxuICAgICk6IHsgcGF5bG9hZDogRXhwZW5zZVNoZWV0SGVhZGVyVXBkYXRlUmVxdWVzdCB9IHwgeyBlcnJvcjogc3RyaW5nIH0gPT4ge1xuICAgICAgY29uc3QgaGFzRXhwbGljaXRTdGF0dXNDb21tZW50T3ZlcnJpZGUgPSBzdGF0dXNDb21tZW50T3ZlcnJpZGUgIT09IHVuZGVmaW5lZDtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWREZXNjcmlwdGlvbiA9IFN0cmluZyhkcmFmdERlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRQcm9qZWN0SWQgPSBTdHJpbmcoZHJhZnRQcm9qZWN0SWQgfHwgXCJcIikudHJpbSgpO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZEVzdGFkb0NvbWVudGFyaW9zID0gU3RyaW5nKFxuICAgICAgICBzdGF0dXNDb21tZW50T3ZlcnJpZGUgPz8gZHJhZnRFc3RhZG9Db21lbnRhcmlvcyA/PyBcIlwiXG4gICAgICApLnRyaW0oKTtcbiAgICAgIGNvbnN0IHJlc29sdmVkRXhwZW5zZVNoZWV0U3RhdHVzID1cbiAgICAgICAgbmV4dFN0YXR1cyA/PyAoY3VycmVudEV4cGVuc2VTaGVldFN0YXR1cyAhPSBudWxsID8gTnVtYmVyKGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXMpIDogdW5kZWZpbmVkKTtcblxuICAgICAgaWYgKCFub3JtYWxpemVkRGVzY3JpcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBlcnJvcjogaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9EZXNjcmlwdGlvblJlcXVpcmVkXCIsIFwiRGVzY3JpcHRpb24gaXMgcmVxdWlyZWQuXCIpLFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgZGVzY3JpcHRpb246IG5vcm1hbGl6ZWREZXNjcmlwdGlvbixcbiAgICAgICAgICBwcm9qSWQ6IG5vcm1hbGl6ZWRQcm9qZWN0SWQgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgIGV4cGVuc2VTaGVldFN0YXR1czogcmVzb2x2ZWRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gICAgICAgICAgLy8gUHJlc2VydmUgZXhwbGljaXQgZW1wdHkgc3RhdHVzIGNvbW1lbnRzIHNvIHRoZSBiYWNrZW5kIGNhbiBjbGVhciB0aGUgc3RvcmVkIHZhbHVlLlxuICAgICAgICAgIGVzdGFkb0NvbWVudGFyaW9zOiBoYXNFeHBsaWNpdFN0YXR1c0NvbW1lbnRPdmVycmlkZVxuICAgICAgICAgICAgPyBub3JtYWxpemVkRXN0YWRvQ29tZW50YXJpb3NcbiAgICAgICAgICAgIDogKG5vcm1hbGl6ZWRFc3RhZG9Db21lbnRhcmlvcyB8fCB1bmRlZmluZWQpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBjYW5FZGl0SGVhZGVyRmllbGRzLFxuICAgICAgY3VycmVudEV4cGVuc2VTaGVldFN0YXR1cyxcbiAgICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxuICAgICAgZHJhZnRQcm9qZWN0SWQsXG4gICAgICBpc0NyZWF0ZU1vZGUsXG4gICAgXVxuICApO1xuXHJcbiAgY29uc3QgaGFuZGxlVXBkYXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kgfHwgIWlzRWRpdGluZykgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFpc0NyZWF0ZU1vZGUgJiYgaXNFZGl0TG9ja2VkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgY2FuUHJvY2VlZCA9IGlzQ3JlYXRlTW9kZSA/IGNhbkNyZWF0ZUV4cGVuc2UgOiBjYW5FZGl0RXhwZW5zZTtcclxuICAgIGlmICghY2FuUHJvY2VlZCkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXlsb2FkUmVzdWx0ID0gYnVpbGRVcGRhdGVQYXlsb2FkKCk7XHJcbiAgICBpZiAoXCJlcnJvclwiIGluIHBheWxvYWRSZXN1bHQpIHtcclxuICAgICAgc2V0TW9kYWxFcnJvcihwYXlsb2FkUmVzdWx0LmVycm9yKTtcclxuICAgICAgc2V0U3RhdHVzKHBheWxvYWRSZXN1bHQuZXJyb3IpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XHJcbiAgICAgIHN0YXJ0U3RhdHVzOiBpc0NyZWF0ZU1vZGVcclxuICAgICAgICA/IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIilcclxuICAgICAgICA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGluZ1wiLCBcIlVwZGF0aW5nIGV4cGVuc2Ugc2hlZXQuLi5cIiksXHJcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRXJyb3JcIiwgXCJVcGRhdGUgZXJyb3IuXCIpLFxyXG4gICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICBzZXRCdXN5LFxyXG4gICAgICBzZXRTdGF0dXMsXHJcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgICAgIGNvbnN0IGNyZWF0ZVBheWxvYWQgPSBwYXlsb2FkUmVzdWx0LnBheWxvYWQ7XHJcbiAgICAgICAgICBjb25zdCBwYXlsb2FkOiBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0ID0ge1xyXG4gICAgICAgICAgICBtb2RlOiAxLFxuICAgICAgICAgICAgZXhpc3RpbmdIb2phR2FzdG9zSWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBjcmVhdGVQYXlsb2FkLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgcHJvaklkOiBjcmVhdGVQYXlsb2FkLnByb2pJZCxcbiAgICAgICAgICAgIGV4cGVuc2VTaGVldFN0YXR1czogMCxcbiAgICAgICAgICAgIGxpbmVzOiBbXSxcbiAgICAgICAgICB9O1xuXHJcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNyZWF0ZUV4cGVuc2VTaGVldChwYXlsb2FkKTtcclxuXHJcbiAgICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBBY2NlcHQgYm90aCBjYXNpbmcgdmFyaWFudHMgZnJvbSBiYWNrZW5kIGVudmVsb3Blcy5cclxuICAgICAgICAgIGNvbnN0IGNyZWF0ZWREYXRhID0gcmVzcG9uc2U/LkRhdGEgYXMgeyBIb2phR2FzdG9zSWQ/OiB1bmtub3duOyBob2phR2FzdG9zSWQ/OiB1bmtub3duIH0gfCBudWxsIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgY29uc3QgY3JlYXRlZFNoZWV0SWQgPSBTdHJpbmcoY3JlYXRlZERhdGE/LkhvamFHYXN0b3NJZCA/PyBjcmVhdGVkRGF0YT8uaG9qYUdhc3Rvc0lkID8/IFwiXCIpLnRyaW0oKTtcclxuICAgICAgICAgIGlmICghY3JlYXRlZFNoZWV0SWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgb25DcmVhdGVTdWNjZXNzKGNyZWF0ZWRTaGVldElkKTtcclxuICAgICAgICAgIHNldFN0YXR1cyhpbmRUKFwiQ29tbW9uX1NhdmVcIiwgXCJTYXZlXCIpKTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB1cGRhdGVFeHBlbnNlU2hlZXRIZWFkZXIoc2hlZXRJZCwgcGF5bG9hZFJlc3VsdC5wYXlsb2FkKTtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVkXCIsIFwiRXhwZW5zZSBzaGVldCB1cGRhdGVkXCIpKTtcclxuICAgICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcclxuICB9LCBbXHJcbiAgICBidXN5LFxyXG4gICAgYnVpbGRVcGRhdGVQYXlsb2FkLFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZSxcclxuICAgIGNhbkVkaXRFeHBlbnNlLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgaXNFZGl0TG9ja2VkLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgb25DcmVhdGVTdWNjZXNzLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzaGVldElkLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVTdGF0dXNUcmFuc2l0aW9uID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAobmV4dFN0YXR1czogbnVtYmVyLCBzdGFydFN0YXR1czogc3RyaW5nLCBzdGF0dXNDb21tZW50T3ZlcnJpZGU/OiBzdHJpbmcgfCBudWxsKSA9PiB7XHJcbiAgICAgIGlmIChidXN5IHx8IGlzQ3JlYXRlTW9kZSB8fCAhc2hlZXRJZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoIWNhblRyYW5zaXRpb25TdGF0dXMpIHtcclxuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwYXlsb2FkUmVzdWx0ID0gYnVpbGRVcGRhdGVQYXlsb2FkKG5leHRTdGF0dXMsIHN0YXR1c0NvbW1lbnRPdmVycmlkZSk7XHJcbiAgICAgIGlmIChcImVycm9yXCIgaW4gcGF5bG9hZFJlc3VsdCkge1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IocGF5bG9hZFJlc3VsdC5lcnJvcik7XHJcbiAgICAgICAgc2V0U3RhdHVzKHBheWxvYWRSZXN1bHQuZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XHJcbiAgICAgICAgc3RhcnRTdGF0dXMsXHJcbiAgICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIiksXHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgICBzZXRCdXN5LFxyXG4gICAgICAgIHNldFN0YXR1cyxcclxuICAgICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyKHNoZWV0SWQsIHBheWxvYWRSZXN1bHQucGF5bG9hZCk7XHJcblxyXG4gICAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVGYWlsZWRcIiwgXCJVcGRhdGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVkXCIsIFwiRXhwZW5zZSBzaGVldCB1cGRhdGVkXCIpKTtcclxuICAgICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQub2s7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBidXN5LFxyXG4gICAgICBidWlsZFVwZGF0ZVBheWxvYWQsXHJcbiAgICAgIGNhblRyYW5zaXRpb25TdGF0dXMsXHJcbiAgICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgICAgc2V0QnVzeSxcclxuICAgICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICBzZXRTdGF0dXMsXHJcbiAgICAgIHNoZWV0SWQsXHJcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChpc0RlbGV0ZUxvY2tlZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFjYW5EZWxldGVFeHBlbnNlKSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xyXG4gICAgICBzdGFydFN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0aW5nXCIsIFwiRGVsZXRpbmcgZXhwZW5zZSBzaGVldC4uLlwiKSxcclxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVFcnJvclwiLCBcIkRlbGV0ZSBlcnJvci5cIiksXHJcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldEJ1c3ksXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXQoc2hlZXRJZCk7XHJcblxyXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlZFwiLCBcIkV4cGVuc2Ugc2hlZXQgZGVsZXRlZFwiKSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xyXG4gIH0sIFtidXN5LCBjYW5EZWxldGVFeHBlbnNlLCBpc0RlbGV0ZUxvY2tlZCwgc2V0QnVzeSwgc2V0TW9kYWxFcnJvciwgc2V0U3RhdHVzLCBzaGVldElkXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVTdGF0dXNUcmFuc2l0aW9uLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zIH0gZnJvbSBcIi4uL2hvb2tzL3VzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xyXG4gIGFjdGlvbk1vZGU/OiBcImRlZmF1bHRcIiB8IFwiZGVsZXRlX29ubHlcIiB8IFwidmlld19vbmx5XCI7XHJcbiAgaXNMb2NrZWQ6IGJvb2xlYW47XHJcbiAgaXNFZGl0TG9ja2VkPzogYm9vbGVhbjtcclxuICBpc0RlbGV0ZUxvY2tlZD86IGJvb2xlYW47XHJcbiAgcGVybWlzc2lvbnNSZWFkeT86IGJvb2xlYW47XHJcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XHJcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcclxuICBjYW5EZWxldGVFeHBlbnNlOiBib29sZWFuO1xyXG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUVuYWJsZUVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcclxuICBoYW5kbGVVcGRhdGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgaGFuZGxlRGVsZXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XHJcbiAgb25EZWxldGVTdWNjZXNzPzogKCkgPT4gdm9pZDtcclxuICBvcGVuQ29uZmlybTogKG9wdHM6IHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBjb25maXJtVGV4dD86IHN0cmluZztcclxuICAgIG9uQ29uZmlybT86ICgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQ7XHJcbiAgfSkgPT4gdm9pZDtcclxuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBDb29yZGluYXRlcyB0b3BiYXIgaWNvbiBzdGF0ZSBhbmQgZGlzcGF0Y2ggYWN0aW9ucyBmb3IgZXhwZW5zZSBzaGVldCBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zID0gKHtcclxuICBidXN5LFxyXG4gIG1vZGFsT3BlbixcclxuICBpc0VkaXRpbmcsXHJcbiAgaXNDcmVhdGVNb2RlLFxyXG4gIGFjdGlvbk1vZGUgPSBcImRlZmF1bHRcIixcclxuICBpc0xvY2tlZCxcclxuICBpc0VkaXRMb2NrZWQsXHJcbiAgaXNEZWxldGVMb2NrZWQsXHJcbiAgcGVybWlzc2lvbnNSZWFkeSA9IHRydWUsXHJcbiAgY2FuRWRpdEV4cGVuc2UsXHJcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcclxuICBjYW5EZWxldGVFeHBlbnNlLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gIGhhbmRsZVVwZGF0ZSxcclxuICBoYW5kbGVEZWxldGUsXHJcbiAgb25TYXZlU3VjY2VzcyxcclxuICBvbkRlbGV0ZVN1Y2Nlc3MsXHJcbiAgb3BlbkNvbmZpcm0sXHJcbiAgY2xvc2VDb25maXJtLFxyXG59OiBVc2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zQXJncykgPT4ge1xyXG4gIHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25Hcm91cElkOiBcImV4cGVuc2Utc2hlZXQtZGV0YWlsLWFjdGlvbnNcIixcclxuICAgIGlkczoge1xyXG4gICAgICBlZGl0SWNvbklkOiBcImV4cGVuc2VFZGl0SWNvblwiLFxyXG4gICAgICBzYXZlSWNvbklkOiBcImV4cGVuc2VTYXZlSWNvblwiLFxyXG4gICAgICBkZWxldGVCdG5JZDogXCJleHBlbnNlRGVsZXRlQnRuXCIsXHJcbiAgICAgIGNhbmNlbEJ0bklkOiBcImV4cGVuc2VDYW5jZWxCdG5cIixcclxuICAgIH0sXHJcbiAgICBldmVudHM6IHtcclxuICAgICAgZWRpdEV2ZW50OiBcImV4cGVuc2UtZGV0YWlsLWVkaXRcIixcclxuICAgICAgZGVsZXRlRXZlbnQ6IFwiZXhwZW5zZS1kZXRhaWwtZGVsZXRlXCIsXHJcbiAgICAgIGNhbmNlbEV2ZW50OiBcImV4cGVuc2UtZGV0YWlsLWNhbmNlbC1lZGl0XCIsXHJcbiAgICB9LFxyXG4gICAgYnVzeSxcclxuICAgIG1vZGFsT3BlbixcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzTG9ja2VkLFxyXG4gICAgYWN0aW9uTW9kZSxcclxuICAgIGlzRWRpdExvY2tlZCxcclxuICAgIGlzRGVsZXRlTG9ja2VkLFxyXG4gICAgYWxsb3dDcmVhdGVNb2RlQWN0aW9uc1doZW5Mb2NrZWQ6IHRydWUsXHJcbiAgICBwZXJtaXNzaW9uc1JlYWR5LFxyXG4gICAgY2FuQ3JlYXRlOiBjYW5DcmVhdGVFeHBlbnNlLFxyXG4gICAgY2FuRWRpdDogY2FuRWRpdEV4cGVuc2UsXHJcbiAgICBjYW5EZWxldGU6IGNhbkRlbGV0ZUV4cGVuc2UsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBoYW5kbGVTYXZlOiBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBzYXZlQ29uZmlybVRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiwgXCJTYXZlIGNoYW5nZXNcIiksXHJcbiAgICBzYXZlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gc2F2ZSBjaGFuZ2VzP1wiKSxcclxuICAgIHNhdmVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1UaXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZVNoZWV0X1RpdGxlXCIsIFwiRGVsZXRlIGV4cGVuc2Ugc2hlZXRcIiksXHJcbiAgICBkZWxldGVDb25maXJtTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZVNoZWV0X0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBleHBlbnNlIHNoZWV0P1wiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkRlbGV0ZVwiKSxcclxuICAgIG9uU2F2ZVN1Y2Nlc3MsXHJcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6IG9uRGVsZXRlU3VjY2VzcyB8fCAoKCkgPT4gbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL0V4cGVuc2VTaGVldHNcIikpLFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgfSk7XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHtcclxuICBFeHBlbnNlU2hlZXRIZWFkZXIsXHJcbiAgRXhwZW5zZVNoZWV0TGluZSxcclxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwsXHJcbiAgZ2V0RXhjaGFuZ2VSYXRlLFxyXG4gIGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUsXHJcbiAgbWFwRXhwZW5zZVNoZWV0SGVhZGVyLFxyXG4gIG1hcEV4cGVuc2VTaGVldExpbmUsXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHtcclxuICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsXHJcbiAgbmF2aWdhdGVUb0V4cGVuc2VVcmwsXHJcbiAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCxcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcclxuaW1wb3J0IHsgaXNNYW5hZ2luZ090aGVyRXhwZW5zZVJlY29yZCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTWFuYWdlZFVzZXJTY29wZS50c1wiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leGNoYW5nZVJhdGVFbnRyeU1vZGVDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSwgaGFzQXNzaWduZWRWb3VjaGVyLCBwYXJzZUV4cGVuc2VEYXRlLCBzYWZlVGV4dCwgdG9Jc29EYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlciwgcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZUV4cGVuc2VTaGVldERldGFpbFBvbGljeSB9IGZyb20gXCIuL2V4cGVuc2VTaGVldERldGFpbFBvbGljeS50c1wiO1xyXG5cclxuY29uc3QgRVhDSEFOR0VfUkFURV9ERUJPVU5DRV9NUyA9IDQwMDtcclxuY29uc3QgRVhDSEFOR0VfUkFURV9SRUZFUkVOQ0VfQU1PVU5UID0gMTAwO1xyXG5jb25zdCBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTID0gNztcclxuY29uc3QgRVhQRU5TRV9TVEFUVVNfQVBQUk9WRUQgPSAyO1xyXG5jb25zdCBFWFBFTlNFX1NUQVRVU19QQUlEID0gNDtcclxuXHJcbi8vIE5vcm1hbGl6ZXMgZXhjaGFuZ2UtcmF0ZSBudW1iZXJzIGZvciBudW1lcmljIGlucHV0IGNvbnRyb2xzLlxyXG5jb25zdCBmb3JtYXRFeGNoYW5nZVJhdGVJbnB1dFZhbHVlID0gKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIodmFsdWUsIHtcclxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcclxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcclxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gICAgZmFsbGJhY2s6IFwiXCIsXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyBSZXVzZXMgdGhlIGZpeGVkIHNhbWUtY3VycmVuY3kgcmF0ZSBzbyBFVVIgc2hlZXRzIHN0YXkgYWxpZ25lZCB3aXRoIHRoZSAxMDAgcmVmZXJlbmNlIGFtb3VudC5cclxuY29uc3QgU0FNRV9DVVJSRU5DWV9FWENIQU5HRV9SQVRFX0lOUFVUID0gZm9ybWF0RXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZShFWENIQU5HRV9SQVRFX1JFRkVSRU5DRV9BTU9VTlQpO1xyXG5cclxuY29uc3QgYnVpbGRDcmVhdGVIZWFkZXJEcmFmdCA9ICgpOiBFeHBlbnNlU2hlZXRIZWFkZXIgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBob2phR2FzdG9zSWQ6IFwiXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJcIixcclxuICAgIHByb2pJZDogXCJcIixcclxuICAgIGN1cnJlbmN5Q29kZTogXCJcIixcclxuICAgIHRvdGFsQW1vdW50OiBudWxsLFxyXG4gICAgZXhwZW5zZVNoZWV0U3RhdHVzOiAwLFxyXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogMCxcclxuICAgIGNyZWF0ZWREYXRlOiBcIlwiLFxyXG4gICAgZXhjaFJhdGU6IFN0cmluZyhFWENIQU5HRV9SQVRFX1JFRkVSRU5DRV9BTU9VTlQpLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBzaG91bGRTaG93RXhjaGFuZ2VSYXRlID0gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gZmFsc2U7XHJcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KHZhbHVlKTtcclxuICBpZiAocGFyc2VkID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuICByZXR1cm4gTWF0aC5hYnMocGFyc2VkKSA+IDA7XHJcbn07XHJcblxyXG50eXBlIFVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlQXJncyA9IHtcclxuICBoYXNBY2Nlc3M6IGJvb2xlYW47XHJcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xyXG4gIGNhbk1hbmFnZU90aGVyVXNlcnM6IGJvb2xlYW47XHJcbiAgY3VycmVudEF4VXNlcklkOiBzdHJpbmc7XHJcbiAgY3VycmVudENybVVzZXJJZDogc3RyaW5nO1xyXG4gIHNlbGVjdGVkTWFuYWdlZFVzZXJJZDogc3RyaW5nO1xyXG4gIHNoZWV0SWQ6IHN0cmluZztcclxuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XHJcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBPd25zIHN0YXRlIGFuZCBiZWhhdmlvciBmb3IgZXhwZW5zZSBzaGVldCBkZXRhaWwgcGFnZSAocmVhZCwgZWRpdCwgY3JlYXRlKS5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlID0gKHtcclxuICBoYXNBY2Nlc3MsXHJcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgY3VycmVudEF4VXNlcklkLFxyXG4gIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gIHNoZWV0SWQsXHJcbiAgaXNDcmVhdGVNb2RlLFxyXG4gIG9uRm9yYmlkZGVuLFxyXG59OiBVc2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZUFyZ3MpID0+IHtcclxuICBjb25zdCBbaGVhZGVyLCBzZXRIZWFkZXJdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0SGVhZGVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2xpbmVzLCBzZXRMaW5lc10gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRMaW5lW10+KFtdKTtcclxuICBjb25zdCBbbGluZVBhZ2UsIHNldExpbmVQYWdlXSA9IHVzZVN0YXRlKDEpO1xyXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2lzRWRpdGluZywgc2V0SXNFZGl0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbW9kYWxFcnJvciwgc2V0TW9kYWxFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnREZXNjcmlwdGlvbiwgc2V0RHJhZnREZXNjcmlwdGlvbl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRQcm9qZWN0SWQsIHNldERyYWZ0UHJvamVjdElkXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdEN1cnJlbmN5Q29kZSwgc2V0RHJhZnRDdXJyZW5jeUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0RXhjaGFuZ2VSYXRlLCBzZXREcmFmdEV4Y2hhbmdlUmF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRFc3RhZG9Db21lbnRhcmlvcywgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvc10gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZGVmYXVsdEN1cnJlbmN5Q29kZSwgc2V0RGVmYXVsdEN1cnJlbmN5Q29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbaXNFeGNoYW5nZVJhdGVMb2FkaW5nLCBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtleGNoYW5nZVJhdGVNZXNzYWdlLCBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtleGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvciwgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLCBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlLCBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUsIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICBjb25zdCBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyID0gdXNlQ2FsbGJhY2soKG5leHRIZWFkZXI6IEV4cGVuc2VTaGVldEhlYWRlciB8IG51bGwpID0+IHtcclxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24oc2FmZVRleHQobmV4dEhlYWRlcj8uZGVzY3JpcHRpb24pKTtcclxuICAgIHNldERyYWZ0UHJvamVjdElkKHNhZmVUZXh0KG5leHRIZWFkZXI/LnByb2pJZCkpO1xyXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUoc2FmZVRleHQobmV4dEhlYWRlcj8uY3VycmVuY3lDb2RlKSk7XHJcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZShcclxuICAgICAgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKG5leHRIZWFkZXI/LmV4Y2hSYXRlLCB7XHJcbiAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxyXG4gICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcclxuICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgICAgICBmYWxsYmFjazogXCJcIixcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgICBzZXREcmFmdEVzdGFkb0NvbWVudGFyaW9zKHNhZmVUZXh0KG5leHRIZWFkZXI/LmVzdGFkb0NvbWVudGFyaW9zKSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgbG9hZERldGFpbCA9IGFzeW5jICgpID0+IHtcclxuICAgICAgaWYgKCFoYXNBY2Nlc3MpIHtcclxuICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSkge1xyXG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRyYWZ0SGVhZGVyID0gYnVpbGRDcmVhdGVIZWFkZXJEcmFmdCgpO1xyXG4gICAgICAgIHNldEhlYWRlcihkcmFmdEhlYWRlcik7XHJcbiAgICAgICAgc2V0TGluZXMoW10pO1xyXG4gICAgICAgIHNldExpbmVQYWdlKDEpO1xyXG4gICAgICAgIHNldElzRWRpdGluZyh0cnVlKTtcclxuICAgICAgICBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyKGRyYWZ0SGVhZGVyKTtcclxuICAgICAgICBzZXRTdGF0dXMoXCJcIik7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFzaGVldElkKSB7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCB3YXMgbm90IGZvdW5kLlwiKSk7XHJcbiAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcclxuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsKHNoZWV0SWQsIHtcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2U/Lk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBkZXRhaWwuXCIpKTtcclxuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNoZWV0cyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRTaGVldCA9XHJcbiAgICAgICAgICBzaGVldHMuZmluZCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5Py5Ib2phR2FzdG9zSWQpLnRvVXBwZXJDYXNlKCkgPT09IHNoZWV0SWQudHJpbSgpLnRvVXBwZXJDYXNlKCkpIHx8IHNoZWV0c1swXTtcclxuXHJcbiAgICAgICAgaWYgKCFzZWxlY3RlZFNoZWV0KSB7XHJcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG5leHRIZWFkZXIgPSBtYXBFeHBlbnNlU2hlZXRIZWFkZXIoc2VsZWN0ZWRTaGVldCk7XHJcbiAgICAgICAgY29uc3QgbmV4dExpbmVzID0gKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRTaGVldC5MaW5lcykgPyBzZWxlY3RlZFNoZWV0LkxpbmVzIDogW10pLm1hcCgoZW50cnkpID0+XHJcbiAgICAgICAgICBtYXBFeHBlbnNlU2hlZXRMaW5lKGVudHJ5KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgc2V0SGVhZGVyKG5leHRIZWFkZXIpO1xyXG4gICAgICAgIHNldExpbmVzKG5leHRMaW5lcyk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShcclxuICAgICAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBkZXRhaWwuXCIpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgc2V0TGluZXMoW10pO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdm9pZCBsb2FkRGV0YWlsKCk7XHJcbiAgfSwgW2NhbkNyZWF0ZUV4cGVuc2UsIGhhc0FjY2VzcywgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNDcmVhdGVNb2RlLCBvbkZvcmJpZGRlbiwgc2hlZXRJZF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFoZWFkZXIgfHwgaXNFZGl0aW5nKSByZXR1cm47XHJcbiAgICBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyKGhlYWRlcik7XHJcbiAgfSwgW2hlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNFZGl0aW5nXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWhhc0FjY2VzcykgcmV0dXJuO1xyXG4gICAgbGV0IGlzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG5cclxuICAgIGNvbnN0IGxvYWREZWZhdWx0Q3VycmVuY3lDb2RlID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSBhd2FpdCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlKHtcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcclxuICAgICAgICBzZXREZWZhdWx0Q3VycmVuY3lDb2RlKHNhZmVUZXh0KGNvZGUpLnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSBcIkFib3J0RXJyb3JcIikgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZvaWQgbG9hZERlZmF1bHRDdXJyZW5jeUNvZGUoKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlzQ2FuY2VsbGVkID0gdHJ1ZTtcclxuICAgICAgY29udHJvbGxlci5hYm9ydCgpO1xyXG4gICAgfTtcclxuICB9LCBbaGFzQWNjZXNzXSk7XHJcblxyXG4gIGNvbnN0IGhhc0FjdGl2ZVByb2Nlc3MgPSB1c2VNZW1vKCgpID0+IGJ1c3kgfHwgaXNFZGl0aW5nLCBbYnVzeSwgaXNFZGl0aW5nXSk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoaGFzQWN0aXZlUHJvY2Vzcyk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcclxuICAgIH07XHJcbiAgfSwgW2hhc0FjdGl2ZVByb2Nlc3NdKTtcclxuXHJcbiAgY29uc3QgcHJvamVjdFZhbHVlID0gc2FmZVRleHQoaGVhZGVyPy5wcm9qSWQpO1xyXG4gIGNvbnN0IHN0YXR1c0NvZGUgPSB0eXBlb2YgaGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMgPT09IFwibnVtYmVyXCIgPyBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzIDogbnVsbDtcclxuICBjb25zdCBpc1NoZWV0QXBwcm92ZWQgPSBzdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19BUFBST1ZFRDtcclxuICBjb25zdCBpc1NoZWV0UGFpZEJ5U3RhdHVzID0gc3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfUEFJRDtcclxuICBjb25zdCBpc1NoZWV0UGFpZEJ5Vm91Y2hlciA9IGhhc0Fzc2lnbmVkVm91Y2hlcihoZWFkZXI/LnZvdWNoZXIpO1xyXG4gIGNvbnN0IGlzU2hlZXRQYWlkID0gaXNTaGVldFBhaWRCeVN0YXR1cyB8fCBpc1NoZWV0UGFpZEJ5Vm91Y2hlcjtcclxuICBjb25zdCBpc01hbmFnaW5nT3RoZXJVc2VyID0gaXNNYW5hZ2luZ090aGVyRXhwZW5zZVJlY29yZCh7XHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIHJlY29yZE93bmVyVXNlcklkOiBoZWFkZXI/LnVzZXJJZCxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICB9KTtcclxuICBjb25zdCBkZXRhaWxQb2xpY3kgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpbnRlcmFjdGlvbk1vZGU6IFwiZnVsbF9lZGl0XCIgYXMgY29uc3QsXHJcbiAgICAgICAgc2hvd0ZhYjogZmFsc2UsXHJcbiAgICAgICAgY2FuRGVsZXRlU2hlZXQ6IGZhbHNlLFxyXG4gICAgICAgIHN0YXR1c0FjdGlvbnM6IFtdLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXNvbHZlRXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5KHtcclxuICAgICAgc3RhdHVzQ29kZSxcclxuICAgICAgaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgICAgaXNQYWlkOiBpc1NoZWV0UGFpZCxcclxuICAgIH0pO1xyXG4gIH0sIFthbGxvd1NlbGZNYW5hZ2VtZW50LCBpc0NyZWF0ZU1vZGUsIGlzTWFuYWdpbmdPdGhlclVzZXIsIGlzU2hlZXRQYWlkLCBzdGF0dXNDb2RlXSk7XHJcbiAgY29uc3QgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQgPSBpc0NyZWF0ZU1vZGUgfHwgKCFpc01hbmFnaW5nT3RoZXJVc2VyICYmIGRldGFpbFBvbGljeS5pbnRlcmFjdGlvbk1vZGUgPT09IFwiZnVsbF9lZGl0XCIpO1xyXG4gIGNvbnN0IGNhbkVkaXRTdGF0dXNDb21tZW50Q3VycmVudCA9ICFpc0NyZWF0ZU1vZGUgJiYgZGV0YWlsUG9saWN5LmludGVyYWN0aW9uTW9kZSA9PT0gXCJjb21tZW50X29ubHlfZWRpdFwiO1xyXG4gIGNvbnN0IGNhbkVkaXRBbnlDdXJyZW50ID0gKGlzQ3JlYXRlTW9kZSAmJiBjYW5DcmVhdGVFeHBlbnNlKSB8fCBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCB8fCBjYW5FZGl0U3RhdHVzQ29tbWVudEN1cnJlbnQ7XHJcbiAgY29uc3QgY2FuVXNlRnVsbEVkaXRGZWF0dXJlcyA9ICFpc0NyZWF0ZU1vZGUgJiYgZGV0YWlsUG9saWN5LmludGVyYWN0aW9uTW9kZSA9PT0gXCJmdWxsX2VkaXRcIjtcclxuICBjb25zdCBpc1NoZWV0TG9ja2VkID0gaXNTaGVldEFwcHJvdmVkIHx8IGlzU2hlZXRQYWlkO1xyXG4gIGNvbnN0IGhhc0xpbmVzID0gbGluZXMubGVuZ3RoID4gMDtcclxuICBjb25zdCBleGNoYW5nZVJhdGVWYWx1ZSA9IGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcihzYWZlVGV4dChoZWFkZXI/LmV4Y2hSYXRlKSwge1xyXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxyXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxyXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICBmYWxsYmFjazogXCJcIixcclxuICB9KTtcclxuICBjb25zdCBzaG93RXhjaGFuZ2VSYXRlID0gdXNlTWVtbygoKSA9PiBzaG91bGRTaG93RXhjaGFuZ2VSYXRlKGV4Y2hhbmdlUmF0ZVZhbHVlKSwgW2V4Y2hhbmdlUmF0ZVZhbHVlXSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgPSB1c2VNZW1vKCgpID0+IGRyYWZ0Q3VycmVuY3lDb2RlLnRyaW0oKS50b1VwcGVyQ2FzZSgpLCBbZHJhZnRDdXJyZW5jeUNvZGVdKTtcclxuICBjb25zdCBub3JtYWxpemVkRGVmYXVsdEN1cnJlbmN5ID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChkZWZhdWx0Q3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpLCBbZGVmYXVsdEN1cnJlbmN5Q29kZV0pO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSA9IG5vcm1hbGl6ZWREZWZhdWx0Q3VycmVuY3kgfHwgXCJFVVJcIjtcclxuICBjb25zdCB1aUxvY2FsZSA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIFwiZXMtRVNcIjtcclxuICAgIHJldHVybiBzYWZlVGV4dChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ/LmxhbmcpIHx8IFwiZXMtRVNcIjtcclxuICB9LCBbXSk7XHJcbiAgY29uc3QgZm9ybUV4Y2hhbmdlRGF0ZSA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgcGFyc2VkRGF0ZSA9IHBhcnNlRXhwZW5zZURhdGUoc2FmZVRleHQoaGVhZGVyPy5jcmVhdGVkRGF0ZSkpO1xyXG4gICAgaWYgKHBhcnNlZERhdGUpIHJldHVybiB0b0lzb0RhdGUocGFyc2VkRGF0ZSk7XHJcbiAgICByZXR1cm4gdG9Jc29EYXRlKG5ldyBEYXRlKCkpO1xyXG4gIH0sIFtoZWFkZXI/LmNyZWF0ZWREYXRlXSk7XHJcbiAgY29uc3Qgc2hvdWxkTG9hZEhlYWRlckV4Y2hhbmdlUmF0ZSA9IGZhbHNlO1xuICBjb25zdCBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSA9IFwiXCI7XG4gIC8vIEhlYWRlciBjdXJyZW5jeSBpcyBsZWdhY3kvcmVhZC1vbmx5OyBlZGl0YWJsZSBjdXJyZW5jeSBub3cgYmVsb25ncyB0byBlYWNoIGxpbmUuXG4gIGNvbnN0IGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzID0gZmFsc2U7XG4gIGNvbnN0IGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyA9IGZhbHNlO1xuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGxldCBpc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgbGV0IHJlcXVlc3RUaW1lcjogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4gfCBudWxsID0gbnVsbDtcclxuICAgIGxldCByZXF1ZXN0QWJvcnRDb250cm9sbGVyOiBBYm9ydENvbnRyb2xsZXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBjb25zdCBjbGVhclJlcXVlc3RBcnRpZmFjdHMgPSAoKSA9PiB7XHJcbiAgICAgIGlmIChyZXF1ZXN0VGltZXIpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQocmVxdWVzdFRpbWVyKTtcclxuICAgICAgICByZXF1ZXN0VGltZXIgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChyZXF1ZXN0QWJvcnRDb250cm9sbGVyKSB7XHJcbiAgICAgICAgcmVxdWVzdEFib3J0Q29udHJvbGxlci5hYm9ydCgpO1xyXG4gICAgICAgIHJlcXVlc3RBYm9ydENvbnRyb2xsZXIgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmICghc2hvdWxkTG9hZEhlYWRlckV4Y2hhbmdlUmF0ZSB8fCAhaXNFZGl0aW5nIHx8ICFjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCB8fCBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMpIHtcbiAgICAgIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXCJcIik7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICBjbGVhclJlcXVlc3RBcnRpZmFjdHMoKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIW5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5IHx8ICFleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3kpIHtcclxuICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xyXG4gICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGNsZWFyUmVxdWVzdEFydGlmYWN0cygpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChub3JtYWxpemVkRHJhZnRDdXJyZW5jeSA9PT0gZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5KSB7XHJcbiAgICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlKFNBTUVfQ1VSUkVOQ1lfRVhDSEFOR0VfUkFURV9JTlBVVCk7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoU0FNRV9DVVJSRU5DWV9FWENIQU5HRV9SQVRFX0lOUFVUKTtcclxuICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xyXG4gICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGNsZWFyUmVxdWVzdEFydGlmYWN0cygpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3RUaW1lciA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xyXG4gICAgICByZXF1ZXN0QWJvcnRDb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG4gICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcodHJ1ZSk7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXCJcIik7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRFeGNoYW5nZVJhdGUoXHJcbiAgICAgICAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXHJcbiAgICAgICAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcclxuICAgICAgICAgIGZvcm1FeGNoYW5nZURhdGUsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICBzaWduYWw6IHJlcXVlc3RBYm9ydENvbnRyb2xsZXIuc2lnbmFsLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MgfHwgIXJlc3BvbnNlLkRhdGEgfHwgIU51bWJlci5pc0Zpbml0ZShOdW1iZXIocmVzcG9uc2UuRGF0YS5SYXRlKSkpIHtcclxuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XHJcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXHJcbiAgICAgICAgICAgIHNhZmVUZXh0KHJlc3BvbnNlLk1lc3NhZ2UpIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9VbmF2YWlsYWJsZVwiLCBcIk5vIHNlIHB1ZG8gb2J0ZW5lciBlbCB0aXBvIGRlIGNhbWJpby5cIilcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoZSBlbmRwb2ludCByZXR1cm5zIG9uZSBiYXNlLWN1cnJlbmN5IHVuaXQgaW4gdGhlIGV4cGVuc2UgY3VycmVuY3kuXHJcbiAgICAgICAgLy8gVGhlIFVJIHN0b3JlcyB0aGUgYW1vdW50IGZvciB0aGUgZml4ZWQgbG9jYWwgcmVmZXJlbmNlIGFtb3VudCAoMTAwKS5cclxuICAgICAgICBjb25zdCBvZmZpY2lhbFJhdGVQZXJCYXNlVW5pdCA9IE51bWJlcihyZXNwb25zZS5EYXRhLlJhdGUpO1xyXG4gICAgICAgIGNvbnN0IG9mZmljaWFsUmF0ZUZvclJlZmVyZW5jZUFtb3VudCA9IG9mZmljaWFsUmF0ZVBlckJhc2VVbml0ICogRVhDSEFOR0VfUkFURV9SRUZFUkVOQ0VfQU1PVU5UO1xyXG4gICAgICAgIGNvbnN0IG5leHRFeGNoYW5nZVJhdGVWYWx1ZSA9IGZvcm1hdEV4Y2hhbmdlUmF0ZUlucHV0VmFsdWUob2ZmaWNpYWxSYXRlRm9yUmVmZXJlbmNlQW1vdW50KTtcclxuICAgICAgICBjb25zdCBvZmZpY2lhbFJhdGVSYXdWYWx1ZSA9IGZvcm1hdEV4Y2hhbmdlUmF0ZUlucHV0VmFsdWUob2ZmaWNpYWxSYXRlUGVyQmFzZVVuaXQpO1xyXG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUobmV4dEV4Y2hhbmdlUmF0ZVZhbHVlKTtcclxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKG9mZmljaWFsUmF0ZVJhd1ZhbHVlKTtcclxuICAgICAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZShuZXh0RXhjaGFuZ2VSYXRlVmFsdWUpO1xyXG5cclxuICAgICAgICBjb25zdCBlZmZlY3RpdmVSYXRlRGF0ZSA9IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGEuRGF0ZSkgfHwgZm9ybUV4Y2hhbmdlRGF0ZTtcclxuICAgICAgICBjb25zdCBzb3VyY2UgPSBzYWZlVGV4dChyZXNwb25zZS5EYXRhLlNvdXJjZSk7XHJcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKGVmZmVjdGl2ZVJhdGVEYXRlKTtcclxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShzb3VyY2UpO1xyXG4gICAgICAgIGNvbnN0IG9mZmljaWFsTGFiZWwgPSBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsKDApIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX09mZmljaWFsXCIsIFwiVC5DLiBPZmljaWFsXCIpO1xyXG4gICAgICAgIGNvbnN0IGxvY2FsaXplZFJhdGVEYXRlID0gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGVmZmVjdGl2ZVJhdGVEYXRlLCB1aUxvY2FsZSkgfHwgZWZmZWN0aXZlUmF0ZURhdGU7XHJcbiAgICAgICAgY29uc3QgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UgPSBzb3VyY2UgPyBgJHtvZmZpY2lhbExhYmVsfSAke2xvY2FsaXplZFJhdGVEYXRlfSAoJHtzb3VyY2V9KWAgOiBgJHtvZmZpY2lhbExhYmVsfSAke2xvY2FsaXplZFJhdGVEYXRlfWA7XHJcbiAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShvZmZpY2lhbFJhdGVSYXdWYWx1ZSA/IGAke2V4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlfSAtICR7b2ZmaWNpYWxSYXRlUmF3VmFsdWV9YCA6IGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlKTtcclxuICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XHJcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHtcclxuICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQwNCkge1xyXG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9Ob3RGb3VuZFwiLCBcIk5vIGhheSB0aXBvIGRlIGNhbWJpbyBwYXJhIGxhIGZlY2hhXCIpKTtcclxuICAgICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MjIgfHwgZXJyb3Iuc3RhdHVzID09PSA1MDApIHtcclxuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcclxuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuICAgICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcclxuICAgICAgICAgICAgICBzYWZlVGV4dChlcnJvci5tZXNzYWdlKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcclxuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XHJcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXHJcbiAgICAgICAgICAgIHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9VbmF2YWlsYWJsZVwiLCBcIk5vIHNlIHB1ZG8gb2J0ZW5lciBlbCB0aXBvIGRlIGNhbWJpby5cIilcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XHJcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XHJcbiAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpKTtcclxuICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICBpZiAoIWlzQ2FuY2VsbGVkKSB7XHJcbiAgICAgICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSwgRVhDSEFOR0VfUkFURV9ERUJPVU5DRV9NUyk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgaXNDYW5jZWxsZWQgPSB0cnVlO1xyXG4gICAgICBjbGVhclJlcXVlc3RBcnRpZmFjdHMoKTtcclxuICAgIH07XHJcbiAgfSwgW1xyXG4gICAgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXHJcbiAgICBmb3JtRXhjaGFuZ2VEYXRlLFxyXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gICAgaXNFZGl0aW5nLFxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcbiAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcbiAgICBzaG91bGRMb2FkSGVhZGVyRXhjaGFuZ2VSYXRlLFxuICAgIHVpTG9jYWxlLFxuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlLFxuICBdKTtcblxyXG4gIGNvbnN0IGhhbmRsZUVuYWJsZUVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoaXNDcmVhdGVNb2RlIHx8IGlzTG9hZGluZyB8fCAhaGVhZGVyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWNhbkVkaXRBbnlDdXJyZW50KSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgc2V0SXNFZGl0aW5nKHRydWUpO1xyXG4gICAgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlcihoZWFkZXIpO1xyXG4gICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9FZGl0aW5nRW5hYmxlZFwiLCBcIkVkaXRpbmcgZW5hYmxlZFwiKSk7XHJcbiAgfSwgW2NhbkVkaXRBbnlDdXJyZW50LCBoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIsIGlzQ3JlYXRlTW9kZSwgaXNMb2FkaW5nLCBvbkZvcmJpZGRlbl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDYW5jZWxFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvRXhwZW5zZVNoZWV0c1wiLCB7XHJcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNFZGl0aW5nKSByZXR1cm47XHJcblxyXG4gICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyKGhlYWRlcik7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIikpO1xyXG4gIH0sIFtoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIsIGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nXSk7XHJcblxyXG4gIC8vIE9wZW5zIGV4cGVuc2Ugc2hlZXQgY3JlYXRlIG1vZGUgZnJvbSBsaXN0LWxldmVsIGVudHJ5IHBvaW50cy5cclxuICBjb25zdCBoYW5kbGVPcGVuQ3JlYXRlU2hlZXRNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFjYW5DcmVhdGVFeHBlbnNlKSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP21vZGU9Y3JlYXRlXCIsIHtcclxuICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXHJcbiAgICB9KTtcclxuICB9LCBbY2FuQ3JlYXRlRXhwZW5zZSwgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmcsIG9uRm9yYmlkZGVuXSk7XHJcblxyXG4gIC8vIE9wZW5zIGV4cGVuc2UgbGluZSBjcmVhdGUgbW9kZSBmcm9tIGFuIGV4aXN0aW5nIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlxyXG4gIGNvbnN0IGhhbmRsZU9wZW5DcmVhdGVMaW5lTW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghc2hlZXRJZCB8fCAhY2FuVXNlRnVsbEVkaXRGZWF0dXJlcykge1xyXG4gICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0TGluZURldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2hlZXRJZCl9Jm1vZGU9Y3JlYXRlYDtcclxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCwge1xyXG4gICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcclxuICAgIH0pO1xyXG4gIH0sIFtjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcclxuXHJcbiAgLy8gT3BlbnMgdGlja2V0cyBwYWdlIGZyb20gZXhwZW5zZSBzaGVldCBjb250ZXh0IHRvIGNyZWF0ZSBvciBsaW5rIHRpY2tldHMuXHJcbiAgY29uc3Qgb3BlblRpY2tldHNGcm9tU2hlZXQgPSB1c2VDYWxsYmFjayhcclxuICAgIChhY3Rpb246IFwibmV3XCIgfCBcImxpbmtcIikgPT4ge1xyXG4gICAgICBpZiAoIXNoZWV0SWQgfHwgIWNhblVzZUZ1bGxFZGl0RmVhdHVyZXMpIHtcclxuICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgICBhY3Rpb24sXHJcbiAgICAgICAgaG9qYUdhc3Rvc0lkOiBzaGVldElkLFxyXG4gICAgICB9KTtcclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0cz8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xyXG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogaXNFZGl0aW5nLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbY2FuVXNlRnVsbEVkaXRGZWF0dXJlcywgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmcsIG9uRm9yYmlkZGVuLCBzaGVldElkXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU9wZW5DcmVhdGVUaWNrZXRNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgb3BlblRpY2tldHNGcm9tU2hlZXQoXCJuZXdcIik7XHJcbiAgfSwgW29wZW5UaWNrZXRzRnJvbVNoZWV0XSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIG9wZW5UaWNrZXRzRnJvbVNoZWV0KFwibGlua1wiKTtcclxuICB9LCBbb3BlblRpY2tldHNGcm9tU2hlZXRdKTtcclxuXHJcbiAgY29uc3QgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldCA9IHVzZUNhbGxiYWNrKChjcmVhdGVkU2hlZXRJZDogc3RyaW5nKSA9PiB7XHJcbiAgICBjb25zdCBzYWZlQ3JlYXRlZFNoZWV0SWQgPSBzYWZlVGV4dChjcmVhdGVkU2hlZXRJZCk7XHJcbiAgICBpZiAoIXNhZmVDcmVhdGVkU2hlZXRJZCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHRhcmdldFVybCA9IGAvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZUNyZWF0ZWRTaGVldElkKX1gO1xyXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwodGFyZ2V0VXJsKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IG5hdmlnYXRlVG9MaW5lRGV0YWlsID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoXHJcbiAgICAgIGxpbmVSZWNJZDogc3RyaW5nLFxyXG4gICAgICBvcHRpb25zPzoge1xyXG4gICAgICAgIG1vZGU/OiBcInZpZXdcIiB8IFwiZWRpdFwiO1xyXG4gICAgICAgIGFza0NvbmZpcm1hdGlvbj86IGJvb2xlYW47XHJcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlPzogYm9vbGVhbjtcclxuICAgICAgfVxyXG4gICAgKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNhZmVMaW5lSWQgPSBzYWZlVGV4dChsaW5lUmVjSWQpO1xyXG4gICAgICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KHNoZWV0SWQpO1xyXG4gICAgICBpZiAoIXNhZmVMaW5lSWQgfHwgIXNhZmVTaGVldElkKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBzYWZlTW9kZSA9IG9wdGlvbnM/Lm1vZGUgPT09IFwiZWRpdFwiID8gXCJlZGl0XCIgOiBcIlwiO1xyXG4gICAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXRMaW5lRGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlU2hlZXRJZCl9JmxpbmVSZWNJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlTGluZUlkKX0ke3NhZmVNb2RlID8gYCZtb2RlPSR7c2FmZU1vZGV9YCA6IFwiXCJ9YDtcclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwodGFyZ2V0VXJsLCB7XHJcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBvcHRpb25zPy5hc2tDb25maXJtYXRpb24gPz8gdHJ1ZSxcclxuICAgICAgICBieXBhc3NHdWFyZE9uY2U6IG9wdGlvbnM/LmJ5cGFzc0d1YXJkT25jZSA/PyBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW3NoZWV0SWRdXHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGhlYWRlcixcclxuICAgIGxpbmVzLFxyXG4gICAgbGluZVBhZ2UsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBidXN5LFxyXG4gICAgc3RhdHVzLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgbW9kYWxFcnJvcixcclxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBkcmFmdFByb2plY3RJZCxcclxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgZHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSxcclxuICAgIGlzRXhjaGFuZ2VSYXRlTG9hZGluZyxcclxuICAgIGV4Y2hhbmdlUmF0ZU1lc3NhZ2UsXHJcbiAgICBleGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcixcclxuICAgIHByb2plY3RWYWx1ZSxcclxuICAgIGlzU2hlZXRBcHByb3ZlZCxcclxuICAgIGlzU2hlZXRQYWlkLFxyXG4gICAgaXNTaGVldExvY2tlZCxcclxuICAgIGV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gICAgc2hvd0V4Y2hhbmdlUmF0ZSxcclxuICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxyXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50OiBFWENIQU5HRV9SQVRFX1JFRkVSRU5DRV9BTU9VTlQsXHJcbiAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSxcclxuICAgIGRldGFpbFBvbGljeSxcclxuICAgIGlzTWFuYWdpbmdPdGhlclVzZXIsXHJcbiAgICBjYW5FZGl0U3RhdHVzQ29tbWVudEN1cnJlbnQsXHJcbiAgICBjYW5FZGl0QW55Q3VycmVudCxcclxuICAgIGNhblVzZUZ1bGxFZGl0RmVhdHVyZXMsXHJcbiAgICBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcclxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxyXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gICAgc2V0TGluZVBhZ2UsXHJcbiAgICBzZXRMaW5lcyxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICAgIHNldERyYWZ0UHJvamVjdElkLFxyXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIHNldERyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICAgIGhhbmRsZU9wZW5DcmVhdGVTaGVldE1vZGUsXHJcbiAgICBoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUsXHJcbiAgICBoYW5kbGVPcGVuQ3JlYXRlVGlja2V0TW9kZSxcclxuICAgIGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSxcclxuICAgIG5hdmlnYXRlVG9DcmVhdGVkU2hlZXQsXHJcbiAgICBuYXZpZ2F0ZVRvTGluZURldGFpbCxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG4vLyBTaGFyZWQgaWNvbiBnbHlwaHMgZm9yIHRoZSBleHBlbnNlIHNoZWV0IGRldGFpbCBhY3Rpb24gbWVudS5cbmV4cG9ydCBjb25zdCBOZXdUaWNrZXRJY29uID0gKCkgPT4gKFxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsxLjV9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzTmFtZT1cInNpemUtNVwiPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTEwIDIwaC01YTIgMiAwIDAgMSAtMiAtMnYtOWEyIDIgMCAwIDEgMiAtMmgxYTIgMiAwIDAgMCAyIC0yYTEgMSAwIDAgMSAxIC0xaDZhMSAxIDAgMCAxIDEgMWEyIDIgMCAwIDAgMiAyaDFhMiAyIDAgMCAxIDIgMnYyXCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNC4zNjIgMTEuMTVhMyAzIDAgMSAwIC00LjE0NCA0LjI2M1wiIC8+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgMjF2LTRhMiAyIDAgMSAxIDQgMHY0XCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAxOWg0XCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0yMSAxNXY2XCIgLz5cbiAgPC9zdmc+XG4pO1xuXG5leHBvcnQgY29uc3QgTGlua1RpY2tldEljb24gPSAoKSA9PiAoXG4gIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9ezEuNX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3NOYW1lPVwic2l6ZS01XCI+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTMuMTkgOC42ODhhNC41IDQuNSAwIDAgMSAxLjI0MiA3LjI0NGwtNC41IDQuNWE0LjUgNC41IDAgMCAxLTYuMzY0LTYuMzY0bDEuNzU3LTEuNzU3bTEzLjM1LS42MjIgMS43NTctMS43NTdhNC41IDQuNSAwIDAgMC02LjM2NC02LjM2NGwtNC41IDQuNWE0LjUgNC41IDAgMCAwIDEuMjQyIDcuMjQ0XCIgLz5cbiAgPC9zdmc+XG4pO1xuXG5leHBvcnQgY29uc3QgTmV3TGluZUljb24gPSAoKSA9PiAoXG4gIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9ezEuNX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3NOYW1lPVwic2l6ZS01XCI+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMyAxOWMzLjMzMyAtMiA1IC00IDUgLTZjMCAtMyAtMSAtMyAtMiAtM3MtMi4wMzIgMS4wODUgLTIgM2MuMDM0IDIuMDQ4IDEuNjU4IDIuODc3IDIuNSA0YzEuNSAyIDIuNSAyLjUgMy41IDFjLjY2NyAtMSAxLjE2NyAtMS44MzMgMS41IC0yLjVjMSAyLjMzMyAyLjMzMyAzLjUgNCAzLjVoMi41XCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0yMCAxN3YtMTJjMCAtMS4xMjEgLS44NzkgLTIgLTIgLTJzLTIgLjg3OSAtMiAydjEybDIgMmwyIC0yXCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNiA3aDRcIiAvPlxuICA8L3N2Zz5cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7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UUFDcEMsVUFBVSxXQUFXO0FBQUEsUUFDckIsZUFBZSxXQUFXO0FBQUE7QUFBQSxJQUM1QixJQUNFO0FBQUEsSUFFSCxXQUFXLFVBQ1Y7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFdBQVcsS0FBSyw2QkFBNkIscUJBQWtCO0FBQUEsUUFDL0QsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsUUFBUSxXQUFXLHNCQUFzQixvQ0FBb0M7QUFBQSxRQUM3RSxlQUFlLEtBQUssNkJBQTZCLHFCQUFrQjtBQUFBLFFBQ25FLFdBQVcsV0FBVztBQUFBO0FBQUEsSUFDeEIsSUFDRTtBQUFBLEtBQ047QUFFSjtBQUdBLElBQU0seUJBQXlCLE1BQU07QUFDbkMsU0FDRSw2Q0FBQyxnQ0FBcUIseUJBQXVCLE1BQzNDLHVEQUFDLGlDQUE4QixHQUNqQztBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsMEJBQXdCO0FBQ3hCLGlDQUErQjtBQUMvQixRQUFNLFNBQVMsU0FBUyxlQUFlLDJCQUEyQjtBQUNsRSxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLDBCQUF1QixDQUFFO0FBQ3JEO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxpQ0FBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgInJlc3BvbnNlIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJSZWFjdCJdCn0K
