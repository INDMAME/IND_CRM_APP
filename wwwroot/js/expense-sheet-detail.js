import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-TOS75A4D.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-FL5N4NUX.js";
import {
  getExpenseSheetStatusOptions,
  getExpenseStatusLabel
} from "./chunks/chunk-TBE4ZTHU.js";
import "./chunks/chunk-7JHOWTDN.js";
import "./chunks/chunk-6HMZLOGF.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseCurrencyFlagIcon_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-XOBQKR27.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-JQOT2YM5.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-SXXGXRNM.js";
import {
  useOutsideClick
} from "./chunks/chunk-USUN7TKP.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-WOQJ6Y4W.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-F2XH6T62.js";
import "./chunks/chunk-K7MECJ5E.js";
import {
  applyExpenseSheetTicketIa,
  clearExpenseNavigationGuard,
  configureExpenseApiAuth,
  createExpenseSheet,
  createExpenseSheetTicket,
  deleteExpenseSheet,
  extractExpenseFromTicketDraft,
  fetchExpenseSheetDetail,
  formatAmountWithCurrency,
  formatExpenseDateParts,
  formatExpenseDisplayDate,
  formatExpenseInputNumber,
  formatExpenseNumber,
  getExchangeRate,
  getExpenseSheetDefaultCurrencyCode,
  hasAssignedVoucher,
  mapExpenseSheetHeader,
  mapExpenseSheetLine,
  navigateToExpenseUrl,
  parseExpenseDate,
  parseExpenseNumericInput,
  safeText,
  setExpenseNavigationGuard,
  toIsoDate,
  updateExpenseSheetHeader,
  uploadExpenseSheetTicketFile
} from "./chunks/chunk-RN3YUQHY.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-PLUNQIQU.js";
import {
  ApiFetchError,
  Spinner_default,
  canAccess,
  classNames,
  indFormat,
  indT,
  showPermissionModal
} from "./chunks/chunk-GEXVJWY3.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunks/chunk-KJNAPDCZ.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/gastos/detail/ExpenseSheetDetailPage.tsx
var import_react6 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/components/ExpenseSheetHeaderForm.tsx
var import_react2 = __toESM(require_react());

// Web/wwwroot/react/src/components/commons/InfoPopoverIconButton.tsx
var import_react = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var InfoPopoverIconButton = ({
  content,
  ariaLabel,
  className = "",
  panelClassName = ""
}) => {
  const HORIZONTAL_VIEWPORT_GUTTER_PX = 8;
  const VERTICAL_VIEWPORT_GUTTER_PX = 8;
  const PANEL_TRIGGER_GAP_PX = 6;
  const GLOBAL_RADIUS = "var(--radius-xl, 5px)";
  const [isOpen, setIsOpen] = (0, import_react.useState)(false);
  const [panelStyle, setPanelStyle] = (0, import_react.useState)({
    position: "fixed",
    top: 0,
    left: 0,
    visibility: "hidden"
  });
  const buttonRef = (0, import_react.useRef)(null);
  const panelRef = (0, import_react.useRef)(null);
  useOutsideClick([buttonRef, panelRef], () => setIsOpen(false));
  const updatePanelPosition = (0, import_react.useCallback)(() => {
    if (typeof window === "undefined") {
      return;
    }
    const buttonElement = buttonRef.current;
    const panelElement = panelRef.current;
    if (!buttonElement || !panelElement) {
      return;
    }
    const buttonRect = buttonElement.getBoundingClientRect();
    const panelRect = panelElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const safeWidth = Math.min(panelRect.width, Math.max(180, viewportWidth - HORIZONTAL_VIEWPORT_GUTTER_PX * 2));
    let left = buttonRect.left + buttonRect.width / 2 - safeWidth / 2;
    left = Math.max(HORIZONTAL_VIEWPORT_GUTTER_PX, Math.min(left, viewportWidth - safeWidth - HORIZONTAL_VIEWPORT_GUTTER_PX));
    let top = buttonRect.bottom + PANEL_TRIGGER_GAP_PX;
    const hasBottomOverflow = top + panelRect.height + VERTICAL_VIEWPORT_GUTTER_PX > viewportHeight;
    if (hasBottomOverflow) {
      const topAboveTrigger = buttonRect.top - panelRect.height - PANEL_TRIGGER_GAP_PX;
      top = topAboveTrigger >= VERTICAL_VIEWPORT_GUTTER_PX ? topAboveTrigger : Math.max(VERTICAL_VIEWPORT_GUTTER_PX, viewportHeight - panelRect.height - VERTICAL_VIEWPORT_GUTTER_PX);
    }
    setPanelStyle({
      position: "fixed",
      top: Math.round(top),
      left: Math.round(left),
      width: Math.round(safeWidth),
      visibility: "visible"
    });
  }, []);
  (0, import_react.useLayoutEffect)(() => {
    if (!isOpen) {
      return;
    }
    updatePanelPosition();
  }, [isOpen, content, updatePanelPosition]);
  (0, import_react.useEffect)(() => {
    if (!isOpen) {
      return;
    }
    const handleViewportChange = () => updatePanelPosition();
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);
    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
    };
  }, [isOpen, updatePanelPosition]);
  const portalTarget = typeof document === "undefined" ? null : document.body;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: classNames("inline-flex", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        ref: buttonRef,
        type: "button",
        "aria-label": ariaLabel,
        "aria-expanded": isOpen,
        "aria-haspopup": "dialog",
        className: "inline-flex h-6 w-6 items-center justify-center rounded-[var(--radius-xl)] border border-transparent bg-transparent p-0 text-slate-500 transition hover:text-primary focus:outline-hidden focus:ring-2 focus:ring-primary/30",
        style: { borderRadius: GLOBAL_RADIUS },
        onClick: () => setIsOpen((previous) => !previous),
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "20",
            height: "20",
            viewBox: "3 3 18 18",
            fill: "none",
            stroke: "#64748b",
            strokeWidth: "1.75",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            className: "block",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "4", y: "4", width: "16", height: "16", rx: "3", ry: "3" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 9h.01" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M11 12h1v4h1" })
            ]
          }
        )
      }
    ),
    isOpen && portalTarget ? (0, import_react_dom.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          ref: panelRef,
          role: "dialog",
          style: { ...panelStyle, borderRadius: GLOBAL_RADIUS },
          className: classNames(
            "z-360000 min-w-[220px] max-w-[calc(100vw-1rem)] rounded-[var(--radius-xl)] border border-slate-200 bg-white p-3 shadow-lg",
            panelClassName
          ),
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-[12px] text-slate-700 whitespace-pre-line", children: content })
        }
      ),
      portalTarget
    ) : null
  ] });
};
var InfoPopoverIconButton_default = InfoPopoverIconButton;

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
var normalizeExpenseExchangeRateMode = (value) => {
  const parsed = Number(value);
  if (parsed === 0 || parsed === 1) {
    return parsed;
  }
  return null;
};
var getExpenseExchangeRateModeLabel = (value) => {
  const normalized = normalizeExpenseExchangeRateMode(value);
  if (normalized === null) return "";
  const meta = EXCHANGE_RATE_MODE_META[normalized];
  return indT(meta.labelKey, meta.fallback);
};

// Web/wwwroot/react/src/pages/gastos/components/ExpenseSheetHeaderForm.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var EXCHANGE_RATE_MODE_PREFIX_PATTERN = /^T\.?C\.?\s*/i;
var ExpenseSheetHeaderForm = ({
  isCreateMode,
  isEditing,
  canEditHeaderFields,
  canEditStatus,
  header,
  projectValue,
  voucherValue,
  isSheetPaid,
  isCurrencyLockedByLines,
  isExchangeRateLockedByLines,
  normalizedDraftCurrency,
  exchangeRateBaseCurrency,
  exchangeRateReferenceAmount,
  showExchangeRate,
  exchangeRateValue,
  exchangeRateValidationMessage,
  totalAmountText,
  draftDescription,
  draftProjectId,
  draftCurrencyCode,
  draftExchangeRate,
  draftExpenseSheetStatus,
  draftEstadoComentarios,
  officialExchangeRateRawValue,
  officialExchangeRateDate,
  officialExchangeRateSource,
  onDraftDescriptionChange,
  onDraftProjectIdChange,
  onDraftCurrencyCodeChange,
  onDraftExchangeRateChange,
  onDraftExpenseSheetStatusChange,
  onDraftEstadoComentariosChange
}) => {
  const isForeignCurrency = isEditing && canEditHeaderFields && normalizedDraftCurrency !== "" && normalizedDraftCurrency !== exchangeRateBaseCurrency;
  const expenseCurrencyLabel = isForeignCurrency ? indT("ExpenseSheets_Field_ExpenseCurrency", "Expense currency") : indT("ExpenseSheets_Field_Currency", "Currency");
  const statusValue = header.expenseSheetStatus === null || header.expenseSheetStatus === void 0 ? "-" : getExpenseStatusLabel(header.expenseSheetStatus);
  const headerCurrencyCode = safeText(header.currencyCode).toUpperCase();
  const baseCurrencyCode = safeText(exchangeRateBaseCurrency).toUpperCase();
  const statusOptions = import_react2.default.useMemo(() => getExpenseSheetStatusOptions(), []);
  const statusDraftValue = String(Number.isInteger(draftExpenseSheetStatus) ? draftExpenseSheetStatus : 0);
  const statusCommentValue = safeText(header.estadoComentarios);
  const showStatusCommentField = !isCreateMode && (isEditing && canEditStatus || !!statusCommentValue);
  const localCurrencyOptions = import_react2.default.useMemo(
    () => [
      {
        value: baseCurrencyCode,
        text: baseCurrencyCode,
        icon: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExpenseCurrencyFlagIcon_default, { currencyCode: baseCurrencyCode, sizeClassName: "h-6 w-6" })
      }
    ],
    [baseCurrencyCode]
  );
  const headerCurrencyOptions = import_react2.default.useMemo(
    () => [
      {
        value: headerCurrencyCode || "-",
        text: headerCurrencyCode || "-",
        icon: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExpenseCurrencyFlagIcon_default, { currencyCode: headerCurrencyCode || "-", sizeClassName: "h-6 w-6" })
      }
    ],
    [headerCurrencyCode]
  );
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
  const exchangeRateModeValue = Number(header.exchangeRateMode) === 1 ? 1 : 0;
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("section", { className: "relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-2xl", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
    !isCreateMode ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ExpenseReadOnlyField_default,
      {
        label: indT("ExpenseSheets_Field_SheetId", "Expense sheet code"),
        value: safeText(header.hojaGastosId) || "-"
      }
    ) : null,
    !isCreateMode ? isEditing && canEditStatus ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      SelectCombobox_default,
      {
        label: indT("ExpenseSheets_Field_Status", "Status"),
        options: statusOptions,
        value: statusDraftValue,
        onChange: (nextValue) => {
          const parsed = Number(nextValue);
          if (Number.isInteger(parsed) && parsed >= 0) {
            onDraftExpenseSheetStatusChange(parsed);
          }
        },
        placeholder: indT("ExpenseSheets_Field_Status", "Status"),
        emitOnValueChange: true,
        allowTextInput: false,
        idBase: "expense-header-status",
        portalClassName: "visitas-typography"
      }
    ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_Status", "Status"), value: statusValue }) : null,
    showStatusCommentField ? isEditing && canEditStatus ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "md:col-span-2 space-y-1.5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_StatusComment", "Status comment") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "textarea",
        {
          className: "form-control resize-none",
          rows: 3,
          value: draftEstadoComentarios,
          onChange: (event) => onDraftEstadoComentariosChange(event.target.value || ""),
          "aria-label": indT("ExpenseSheets_Field_StatusComment", "Status comment")
        }
      )
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
    !isEditing && isSheetPaid ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_Voucher", "Voucher"), value: voucherValue || "-" }) : null,
    isEditing && canEditHeaderFields ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "sm:col-span-2 space-y-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: `grid gap-4 ${isForeignCurrency ? "grid-cols-2" : "grid-cols-1"}`.trim(), children: isForeignCurrency ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "form-label font-semibold", children: expenseCurrencyLabel }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            ExpenseCurrencyFilterSelect_default,
            {
              label: expenseCurrencyLabel,
              placeholder: indT("ExpenseSheets_Filter_Currency_Placeholder", "Currency code"),
              value: draftCurrencyCode,
              onChange: onDraftCurrencyCodeChange,
              disabled: !isEditing || isCurrencyLockedByLines,
              readOnly: !isEditing || isCurrencyLockedByLines,
              showLabel: false,
              idBase: "expense-header-currency",
              preferDefaultCurrencyFromContext: true
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "relative space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "form-label pr-8 font-semibold", children: indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            InfoPopoverIconButton_default,
            {
              ariaLabel: indT("ExpenseSheets_ExchangeRate_InfoPopover_Aria", "Show exchange rate information"),
              content: exchangeRateInfoMessage,
              className: "absolute right-0 -top-1 z-20"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "input",
            {
              className: `form-control ${exchangeRateValidationMessage ? "border-danger ring-1 ring-danger" : ""} ${isExchangeRateLockedByLines ? "ind-readonly-field" : ""}`,
              type: "text",
              inputMode: "decimal",
              value: draftExchangeRate,
              onChange: (event) => onDraftExchangeRateChange(event.target.value || ""),
              onBlur: (event) => onDraftExchangeRateChange(
                formatExpenseInputNumber(event.target.value, {
                  minimumFractionDigits: 7,
                  maximumFractionDigits: 7,
                  useGrouping: true,
                  fallback: ""
                })
              ),
              "aria-label": indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate"),
              placeholder: indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate"),
              readOnly: isExchangeRateLockedByLines,
              disabled: isExchangeRateLockedByLines
            }
          ) })
        ] })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        ExpenseCurrencyFilterSelect_default,
        {
          label: expenseCurrencyLabel,
          placeholder: indT("ExpenseSheets_Filter_Currency_Placeholder", "Currency code"),
          value: draftCurrencyCode,
          onChange: onDraftCurrencyCodeChange,
          disabled: !isEditing || isCurrencyLockedByLines,
          readOnly: !isEditing || isCurrencyLockedByLines,
          idBase: "expense-header-currency",
          preferDefaultCurrencyFromContext: true
        }
      ) }),
      isForeignCurrency ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          SelectCombobox_default,
          {
            label: indT("ExpenseSheets_Field_LocalCurrency", "Local currency"),
            options: localCurrencyOptions,
            value: baseCurrencyCode,
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
            idBase: "expense-header-local-currency",
            portalClassName: "visitas-typography",
            panelClassName: "visitas-typography"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_Amount", "Amount") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "input",
            {
              className: "form-control ind-readonly-field",
              value: formatExpenseNumber(exchangeRateReferenceAmount, {
                minimumFractionDigits: 7,
                maximumFractionDigits: 7,
                useGrouping: true,
                fallback: "-"
              }),
              "aria-label": indT("ExpenseSheets_Field_Amount", "Amount"),
              readOnly: true,
              disabled: true
            }
          )
        ] })
      ] }) : null,
      isForeignCurrency && exchangeRateValidationMessage ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-danger text-sm", children: exchangeRateValidationMessage }) : null
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      SelectCombobox_default,
      {
        label: indT("ExpenseSheets_Field_Currency", "Currency"),
        options: headerCurrencyOptions,
        value: headerCurrencyCode || "-",
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
        idBase: "expense-header-currency-readonly",
        portalClassName: "visitas-typography",
        panelClassName: "visitas-typography"
      }
    ),
    !isEditing && showExchangeRate ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate"), value: exchangeRateValue }) : null,
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
      const amountText = formatAmountWithCurrency(line.amount ?? null, currencyCode);
      const dateParts = formatExpenseDateParts(safeText(line.transDate), document?.documentElement?.lang || "es-ES");
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "timeline-item", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        ExpenseTimelineCard_default,
        {
          dateParts,
          title: description || lineId || "-",
          amountText,
          onOpen: () => onOpenLine(lineId),
          titleClassName: "timeline-name expense-line-card__title"
        }
      ) }, `${lineId}-${index}`);
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

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetDetailMutations.ts
var import_react3 = __toESM(require_react());
var normalizeExchangeRate = (raw) => parseDecimalInput(raw);
var areRatesEquivalent = (left, right) => {
  if (left == null || right == null) return false;
  return Math.abs(left - right) < 1e-7;
};
var useExpenseSheetDetailMutations = ({
  busy,
  isEditing,
  isCreateMode,
  isLocked,
  isCurrencyLockedByLines,
  isExchangeRateLockedByLines,
  lockedCurrencyCode,
  lockedExchangeRate,
  canCreateExpense,
  canEditExpense,
  canDeleteExpense,
  canEditStatus,
  sheetId,
  draftDescription,
  draftCurrencyCode,
  draftExchangeRate,
  officialExchangeRateValue,
  draftProjectId,
  draftExpenseSheetStatus,
  draftEstadoComentarios,
  exchangeRateBaseCurrency,
  currentExpenseSheetStatus,
  currentExchangeRateMode,
  onCreateSuccess,
  setModalError,
  setBusy,
  setStatus,
  setIsEditing
}) => {
  const handleUpdate = (0, import_react3.useCallback)(async () => {
    if (busy || !isEditing) return false;
    if (!isCreateMode && isLocked) return false;
    const canProceed = isCreateMode ? canCreateExpense : canEditExpense;
    if (!canProceed) {
      showPermissionModal();
      return false;
    }
    const normalizedCurrency = String(
      isCurrencyLockedByLines ? lockedCurrencyCode || draftCurrencyCode || "" : draftCurrencyCode || ""
    ).trim().toUpperCase();
    const normalizedDescription = String(draftDescription || "").trim();
    const normalizedProjectId = String(draftProjectId || "").trim();
    const normalizedEstadoComentarios = canEditStatus ? String(draftEstadoComentarios || "").trim() : "";
    const normalizedExchangeRateRaw = String(
      isExchangeRateLockedByLines ? lockedExchangeRate || draftExchangeRate || "" : draftExchangeRate || ""
    );
    const normalizedBaseCurrency = String(exchangeRateBaseCurrency || "EUR").trim().toUpperCase() || "EUR";
    const requiresExchangeRate = normalizedCurrency !== "" && normalizedCurrency !== normalizedBaseCurrency;
    const parsedExchangeRate = normalizeExchangeRate(normalizedExchangeRateRaw);
    const officialExchangeRate = normalizeExchangeRate(officialExchangeRateValue);
    const originalExchangeRate = normalizeExchangeRate(lockedExchangeRate);
    const parsedCurrentExchangeRateMode = Number(currentExchangeRateMode);
    const hasCurrentExchangeRateMode = Number.isInteger(parsedCurrentExchangeRateMode) && parsedCurrentExchangeRateMode >= 0;
    const hasValidRate = parsedExchangeRate != null && parsedExchangeRate > 0;
    const parsedDraftStatus = Number(draftExpenseSheetStatus);
    const hasDraftStatus = Number.isInteger(parsedDraftStatus) && parsedDraftStatus >= 0;
    const hasManualRateEditOnUpdate = !isCreateMode && hasValidRate && (originalExchangeRate == null || !areRatesEquivalent(parsedExchangeRate, originalExchangeRate));
    const isManualExchangeRate = (() => {
      if (!requiresExchangeRate || !hasValidRate) return false;
      if (isExchangeRateLockedByLines) return false;
      if (!isCreateMode && !hasManualRateEditOnUpdate) return false;
      if (officialExchangeRate == null) return true;
      return !areRatesEquivalent(parsedExchangeRate, officialExchangeRate);
    })();
    const resolvedExchangeRateMode = isManualExchangeRate ? 1 : normalizedEstadoComentarios ? hasCurrentExchangeRateMode ? parsedCurrentExchangeRateMode : 0 : void 0;
    const resolvedExpenseSheetStatus = hasDraftStatus ? parsedDraftStatus : currentExpenseSheetStatus ?? void 0;
    if (isCreateMode) {
      if (!normalizedDescription) {
        const validationMessage = indT("ExpenseSheets_Validation_DescriptionRequired", "Description is required.");
        setModalError(validationMessage);
        setStatus(validationMessage);
        return false;
      }
      if (!normalizedCurrency) {
        const validationMessage = indT("ExpenseSheets_Validation_CurrencyRequired", "Currency is required.");
        setModalError(validationMessage);
        setStatus(validationMessage);
        return false;
      }
    }
    if (requiresExchangeRate && !hasValidRate) {
      const validationMessage = indT(
        "ExpenseSheets_Validation_ExchangeRateRequired",
        "Exchange rate is required when currency is different from base currency."
      );
      setModalError(validationMessage);
      setStatus(validationMessage);
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
          const payload2 = {
            mode: 1,
            existingHojaGastosId: void 0,
            description: normalizedDescription,
            currencyCode: normalizedCurrency,
            exchRate: hasValidRate ? Number(parsedExchangeRate) : 1,
            projId: normalizedProjectId || void 0,
            expenseSheetStatus: 0,
            exchangeRateMode: resolvedExchangeRateMode,
            lines: []
          };
          const response2 = await createExpenseSheet(payload2);
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
        const payload = {
          description: String(draftDescription || "").trim(),
          currencyCode: normalizedCurrency,
          exchRate: hasValidRate ? Number(parsedExchangeRate) : 1,
          projId: String(draftProjectId || "").trim() || void 0,
          expenseSheetStatus: resolvedExpenseSheetStatus,
          exchangeRateMode: resolvedExchangeRateMode,
          estadoComentarios: canEditStatus ? normalizedEstadoComentarios : void 0
        };
        const response = await updateExpenseSheetHeader(sheetId, payload);
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
    canCreateExpense,
    canEditExpense,
    draftCurrencyCode,
    draftDescription,
    draftExchangeRate,
    draftExpenseSheetStatus,
    draftEstadoComentarios,
    officialExchangeRateValue,
    draftProjectId,
    exchangeRateBaseCurrency,
    currentExpenseSheetStatus,
    currentExchangeRateMode,
    canEditStatus,
    isCreateMode,
    isCurrencyLockedByLines,
    isExchangeRateLockedByLines,
    isLocked,
    isEditing,
    lockedCurrencyCode,
    lockedExchangeRate,
    onCreateSuccess,
    setBusy,
    setIsEditing,
    setModalError,
    setStatus,
    sheetId
  ]);
  const handleDelete = (0, import_react3.useCallback)(async () => {
    if (busy) return false;
    if (isLocked) return false;
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
  }, [busy, canDeleteExpense, isLocked, setBusy, setModalError, setStatus, sheetId]);
  return {
    handleUpdate,
    handleDelete
  };
};

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetDetailTopbarActions.ts
var useExpenseSheetDetailTopbarActions = ({
  busy,
  modalOpen,
  isEditing,
  isCreateMode,
  isLocked,
  canEditExpense,
  canCreateExpense,
  canDeleteExpense,
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
    allowCreateModeActionsWhenLocked: true,
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
    onDeleteSuccess: () => {
      navigateToExpenseUrl("/Gastos/ExpenseSheets");
    },
    openConfirm,
    closeConfirm
  });
};

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetDetailState.ts
var import_react4 = __toESM(require_react());
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
var buildCreateHeaderDraft = () => {
  return {
    hojaGastosId: "",
    description: "",
    projId: "",
    voucher: "",
    currencyCode: "",
    totalAmount: null,
    expenseSheetStatus: 0,
    exchangeRateMode: 0,
    createdDate: "",
    exchRate: "1"
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
  canEditExpense,
  canEditHeaderFields,
  sheetId,
  isCreateMode,
  onForbidden
}) => {
  const [header, setHeader] = (0, import_react4.useState)(null);
  const [lines, setLines] = (0, import_react4.useState)([]);
  const [linePage, setLinePage] = (0, import_react4.useState)(1);
  const [isLoading, setIsLoading] = (0, import_react4.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react4.useState)("");
  const [busy, setBusy] = (0, import_react4.useState)(false);
  const [status, setStatus] = (0, import_react4.useState)("");
  const [isEditing, setIsEditing] = (0, import_react4.useState)(false);
  const [modalError, setModalError] = (0, import_react4.useState)("");
  const [draftDescription, setDraftDescription] = (0, import_react4.useState)("");
  const [draftProjectId, setDraftProjectId] = (0, import_react4.useState)("");
  const [draftCurrencyCode, setDraftCurrencyCode] = (0, import_react4.useState)("");
  const [draftExchangeRate, setDraftExchangeRate] = (0, import_react4.useState)("");
  const [draftExpenseSheetStatus, setDraftExpenseSheetStatus] = (0, import_react4.useState)(0);
  const [draftEstadoComentarios, setDraftEstadoComentarios] = (0, import_react4.useState)("");
  const [defaultCurrencyCode, setDefaultCurrencyCode] = (0, import_react4.useState)("");
  const [isExchangeRateLoading, setIsExchangeRateLoading] = (0, import_react4.useState)(false);
  const [exchangeRateMessage, setExchangeRateMessage] = (0, import_react4.useState)("");
  const [exchangeRateMessageIsError, setExchangeRateMessageIsError] = (0, import_react4.useState)(false);
  const [officialExchangeRateValue, setOfficialExchangeRateValue] = (0, import_react4.useState)("");
  const [officialExchangeRateRawValue, setOfficialExchangeRateRawValue] = (0, import_react4.useState)("");
  const [officialExchangeRateDate, setOfficialExchangeRateDate] = (0, import_react4.useState)("");
  const [officialExchangeRateSource, setOfficialExchangeRateSource] = (0, import_react4.useState)("");
  const hydrateDraftFromHeader = (0, import_react4.useCallback)((nextHeader) => {
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
    const nextStatus = Number(nextHeader?.expenseSheetStatus);
    setDraftExpenseSheetStatus(Number.isInteger(nextStatus) && nextStatus >= 0 ? nextStatus : 0);
    setDraftEstadoComentarios(safeText(nextHeader?.estadoComentarios));
  }, []);
  (0, import_react4.useEffect)(() => {
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
  (0, import_react4.useEffect)(() => {
    if (!header || isEditing) return;
    hydrateDraftFromHeader(header);
  }, [header, hydrateDraftFromHeader, isEditing]);
  (0, import_react4.useEffect)(() => {
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
  const hasActiveProcess = (0, import_react4.useMemo)(() => busy || isEditing, [busy, isEditing]);
  (0, import_react4.useEffect)(() => {
    setExpenseNavigationGuard(hasActiveProcess);
    return () => {
      clearExpenseNavigationGuard();
    };
  }, [hasActiveProcess]);
  const projectValue = safeText(header?.projId);
  const voucherValue = safeText(header?.voucher);
  const statusCode = typeof header?.expenseSheetStatus === "number" ? header.expenseSheetStatus : null;
  const isSheetApproved = statusCode === EXPENSE_STATUS_APPROVED;
  const isSheetPaidByStatus = statusCode === EXPENSE_STATUS_PAID;
  const isSheetPaidByVoucher = hasAssignedVoucher(voucherValue);
  const isSheetPaid = isSheetPaidByStatus || isSheetPaidByVoucher;
  const isSheetLocked = isSheetApproved || isSheetPaid;
  const hasLines = lines.length > 0;
  const exchangeRateValue = formatExpenseInputNumber(safeText(header?.exchRate), {
    minimumFractionDigits: EXCHANGE_RATE_DECIMAL_DIGITS,
    maximumFractionDigits: EXCHANGE_RATE_DECIMAL_DIGITS,
    useGrouping: true,
    fallback: ""
  });
  const showExchangeRate = (0, import_react4.useMemo)(() => shouldShowExchangeRate(exchangeRateValue), [exchangeRateValue]);
  const normalizedDraftCurrency = (0, import_react4.useMemo)(() => draftCurrencyCode.trim().toUpperCase(), [draftCurrencyCode]);
  const normalizedDefaultCurrency = (0, import_react4.useMemo)(() => safeText(defaultCurrencyCode).toUpperCase(), [defaultCurrencyCode]);
  const exchangeRateBaseCurrency = normalizedDefaultCurrency || "EUR";
  const uiLocale = (0, import_react4.useMemo)(() => {
    if (typeof document === "undefined") return "es-ES";
    return safeText(document.documentElement?.lang) || "es-ES";
  }, []);
  const formExchangeDate = (0, import_react4.useMemo)(() => {
    const parsedDate = parseExpenseDate(safeText(header?.createdDate));
    if (parsedDate) return toIsoDate(parsedDate);
    return toIsoDate(/* @__PURE__ */ new Date());
  }, [header?.createdDate]);
  const exchangeRateRequired = isEditing && canEditHeaderFields && normalizedDraftCurrency !== "" && normalizedDraftCurrency !== exchangeRateBaseCurrency;
  const exchangeRateValidationMessage = exchangeRateRequired && !draftExchangeRate.trim() ? indT(
    "ExpenseSheets_Validation_ExchangeRateRequired",
    "Exchange rate is required when currency is different from base currency."
  ) : "";
  const isCurrencyLockedByLines = false;
  const isExchangeRateLockedByLines = isEditing && canEditHeaderFields && hasLines && showExchangeRate;
  (0, import_react4.useEffect)(() => {
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
    if (!isEditing || !canEditHeaderFields || isExchangeRateLockedByLines) {
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
      setDraftExchangeRate("1");
      setOfficialExchangeRateValue("1");
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
          normalizedDraftCurrency,
          exchangeRateBaseCurrency,
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
        const officialRateRaw = Number(response.Data.Rate);
        const officialRateForAmount100 = officialRateRaw * EXCHANGE_RATE_REFERENCE_AMOUNT;
        const nextExchangeRateValue = formatExchangeRateInputValue(officialRateForAmount100);
        const officialRateRawValue = formatExchangeRateInputValue(officialRateRaw);
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
    canEditHeaderFields,
    formExchangeDate,
    exchangeRateBaseCurrency,
    isEditing,
    isExchangeRateLockedByLines,
    normalizedDraftCurrency,
    uiLocale,
    setDraftExchangeRate
  ]);
  const handleEnableEdit = (0, import_react4.useCallback)(() => {
    if (isCreateMode || isLoading || !header || isSheetLocked) {
      return;
    }
    if (!canEditExpense) {
      onForbidden();
      return;
    }
    setModalError("");
    setIsEditing(true);
    hydrateDraftFromHeader(header);
    setStatus(indT("ExpenseSheets_Detail_EditingEnabled", "Editing enabled"));
  }, [canEditExpense, header, hydrateDraftFromHeader, isCreateMode, isLoading, isSheetLocked, onForbidden]);
  const handleCancelEdit = (0, import_react4.useCallback)(() => {
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
  const handleOpenCreateSheetMode = (0, import_react4.useCallback)(() => {
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
  const handleOpenCreateLineMode = (0, import_react4.useCallback)(() => {
    if (!canCreateExpense || !sheetId || isSheetLocked) {
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
  }, [canCreateExpense, isCreateMode, isEditing, isSheetLocked, onForbidden, sheetId]);
  const openTicketsFromSheet = (0, import_react4.useCallback)(
    (action) => {
      if (!canCreateExpense || !sheetId || isSheetLocked) {
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
    [canCreateExpense, isCreateMode, isEditing, isSheetLocked, onForbidden, sheetId]
  );
  const handleOpenCreateTicketMode = (0, import_react4.useCallback)(() => {
    openTicketsFromSheet("new");
  }, [openTicketsFromSheet]);
  const handleOpenLinkTicketMode = (0, import_react4.useCallback)(() => {
    openTicketsFromSheet("link");
  }, [openTicketsFromSheet]);
  const navigateToCreatedSheet = (0, import_react4.useCallback)((createdSheetId) => {
    const safeCreatedSheetId = safeText(createdSheetId);
    if (!safeCreatedSheetId) return;
    const targetUrl = `/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(safeCreatedSheetId)}`;
    navigateToExpenseUrl(targetUrl);
  }, []);
  const navigateToLineDetail = (0, import_react4.useCallback)(
    (lineRecId) => {
      const safeLineId = safeText(lineRecId);
      const safeSheetId = safeText(sheetId);
      if (!safeLineId || !safeSheetId) return;
      const targetUrl = `/Gastos/ExpenseSheetLineDetail?hojaGastosId=${encodeURIComponent(safeSheetId)}&lineRecId=${encodeURIComponent(safeLineId)}`;
      navigateToExpenseUrl(targetUrl, {
        askConfirmation: true,
        bypassGuardOnce: false
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
    draftExpenseSheetStatus,
    draftEstadoComentarios,
    officialExchangeRateValue,
    officialExchangeRateRawValue,
    officialExchangeRateDate,
    officialExchangeRateSource,
    isExchangeRateLoading,
    exchangeRateMessage,
    exchangeRateMessageIsError,
    projectValue,
    voucherValue,
    isSheetPaid,
    isSheetLocked,
    exchangeRateValue,
    showExchangeRate,
    normalizedDraftCurrency,
    exchangeRateBaseCurrency,
    exchangeRateReferenceAmount: EXCHANGE_RATE_REFERENCE_AMOUNT,
    exchangeRateValidationMessage,
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
    setDraftExpenseSheetStatus,
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

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetQuickTicketFlow.ts
var import_react5 = __toESM(require_react());
var TICKET_IMAGE_CACHE_NAME = "ind-expense-ticket-image-v1";
var TICKET_IMAGE_CACHE_PREFIX = "/__ind_cache__/ticket-image/";
var TICKET_TRACE_STORAGE_KEY = "expense_sheet_ticket_quick_flow_trace_v1";
var MAX_TICKET_IMAGE_SIZE_BYTES = 50 * 1024 * 1024;
var ALLOWED_TICKET_GASTO_TYPES = /* @__PURE__ */ new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);
var DEFAULT_TICKET_GASTO_TYPE = 8;
var DEFAULT_CREATE_MODE = "ia";
var asRecord = (value) => {
  if (!value || typeof value !== "object") return {};
  return value;
};
var getFirstDefined = (record, keys) => {
  for (const key of keys) {
    if (key in record) {
      return record[key];
    }
  }
  return void 0;
};
var toNumber = (value) => {
  if (value === null || value === void 0) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};
var toPositiveNumber = (value) => {
  const parsed = toNumber(value);
  return parsed !== null && parsed > 0 ? parsed : null;
};
var toYyyyMMdd = (value) => {
  const raw = safeText(value);
  if (!raw) return "";
  const dateOnly = raw.split("T")[0].split(" ")[0];
  if (/^\d{8}$/.test(dateOnly)) return dateOnly;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateOnly)) {
    return dateOnly.replace(/-/g, "");
  }
  if (/^\d{4}\/\d{2}\/\d{2}$/.test(dateOnly)) {
    return dateOnly.replace(/\//g, "");
  }
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return "";
  const year = String(parsed.getFullYear());
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};
var getTodayYyyyMMdd = () => {
  return toYyyyMMdd(/* @__PURE__ */ new Date());
};
var normalizeGastoType = (value) => {
  const parsed = toNumber(value);
  if (parsed === null || !Number.isInteger(parsed) || !ALLOWED_TICKET_GASTO_TYPES.has(parsed)) {
    return null;
  }
  return parsed;
};
var inferExtension = (file) => {
  const fromName = safeText(file.name).split(".").pop() || "";
  const normalizedFromName = fromName.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (normalizedFromName) return normalizedFromName;
  const type = safeText(file.type).toLowerCase();
  if (type === "image/jpeg") return "jpg";
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  if (type === "image/heic") return "heic";
  if (type === "image/heif") return "heif";
  return "jpg";
};
var resolveRandomKey = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};
var sanitizeFileName = (value) => {
  const base = safeText(value).replace(/[<>:"/\\|?*\u0000-\u001F]/g, "_");
  return base || "ticket-image";
};
var extractTraceIdFromError = (error) => {
  const payload = safeText(error.responseBody);
  if (!payload) return "";
  try {
    const json = JSON.parse(payload);
    const traceId = safeText(json.TraceId ?? json.traceId);
    return traceId;
  } catch {
    return "";
  }
};
var normalizeDraftFromIaResponse = (rawData) => {
  const data = asRecord(rawData);
  const draftDescription = safeText(getFirstDefined(data, ["description", "Description"]));
  const draftCurrency = safeText(getFirstDefined(data, ["currencyCode", "CurrencyCode"])).toUpperCase();
  const draftTotalAmount = toPositiveNumber(getFirstDefined(data, ["totalAmount", "TotalAmount"])) || 0;
  const draftTransDate = toYyyyMMdd(getFirstDefined(data, ["transDate", "TransDate"])) || getTodayYyyyMMdd();
  const draftComment = safeText(getFirstDefined(data, ["comentario", "Comentario"]));
  const draftGastoType = normalizeGastoType(getFirstDefined(data, ["gastoType", "GastoType"]));
  const rawLines = getFirstDefined(data, ["lines", "Lines"]);
  const lineArray = Array.isArray(rawLines) ? rawLines : [];
  const lines = lineArray.map((entry) => {
    const lineRecord = asRecord(entry);
    const qty = toPositiveNumber(getFirstDefined(lineRecord, ["qty", "Qty"])) || 1;
    const price = toPositiveNumber(getFirstDefined(lineRecord, ["price", "Price"])) || 0;
    const explicitTotal = toPositiveNumber(getFirstDefined(lineRecord, ["totalAmount", "TotalAmount"])) || 0;
    const computedTotal = explicitTotal > 0 ? explicitTotal : qty * price;
    if (!(computedTotal > 0)) return null;
    const candidateTypeValue = toPositiveNumber(getFirstDefined(lineRecord, ["typeValue", "TypeValue"]));
    const safeTypeValue = Number.isInteger(candidateTypeValue) ? Number(candidateTypeValue) : null;
    const typeValue = safeTypeValue && safeTypeValue > 0 ? safeTypeValue : draftGastoType || DEFAULT_TICKET_GASTO_TYPE;
    const description = safeText(getFirstDefined(lineRecord, ["description", "Description"])) || draftDescription;
    const transDate = toYyyyMMdd(getFirstDefined(lineRecord, ["transDate", "TransDate"])) || draftTransDate;
    return {
      transDate,
      typeValue,
      description: description || "Ticket",
      qty,
      price: price > 0 ? price : computedTotal,
      totalAmount: computedTotal
    };
  }).filter((entry) => entry !== null);
  return {
    description: draftDescription || "Ticket",
    currencyCode: draftCurrency || "EUR",
    totalAmount: draftTotalAmount > 0 ? draftTotalAmount : lines.reduce((sum, line) => sum + line.totalAmount, 0),
    transDate: draftTransDate,
    comentario: draftComment,
    gastoType: draftGastoType,
    lines
  };
};
var resolveTicketFileIdFromDraftResponse = (rawData) => {
  const data = asRecord(rawData);
  const creationRaw = getFirstDefined(data, ["TicketCreation", "ticketCreation"]);
  const creation = asRecord(creationRaw);
  return safeText(getFirstDefined(creation, ["FileId", "fileId"]));
};
var resolveUploadResult = (responseData) => {
  const data = asRecord(responseData);
  return {
    urlFile: safeText(getFirstDefined(data, ["UrlFile", "urlFile"])),
    fileName: safeText(getFirstDefined(data, ["FileName", "fileName"]))
  };
};
var buildTicketIaPayload = (draft, upload) => {
  const iaLines = draft.lines.map((line) => ({
    description: line.description,
    qty: line.qty,
    price: line.price,
    totalAmount: line.totalAmount
  }));
  const payload = {
    description: draft.description,
    currencyCode: draft.currencyCode,
    totalAmount: draft.totalAmount > 0 ? draft.totalAmount : void 0,
    transDate: draft.transDate,
    comentario: draft.comentario || void 0,
    urlFile: upload.urlFile || void 0,
    fileName: upload.fileName || void 0,
    lines: iaLines
  };
  if (draft.gastoType !== null) {
    payload.gastoType = draft.gastoType;
  }
  return payload;
};
var buildSheetLinePayload = (draft, fileId, projectId) => {
  const lineFromDraft = draft.lines[0];
  const fallbackTotal = lineFromDraft?.totalAmount || draft.totalAmount;
  if (!(fallbackTotal > 0)) return null;
  const typeValueCandidate = lineFromDraft?.typeValue || draft.gastoType || DEFAULT_TICKET_GASTO_TYPE;
  const safeTypeValue = Number(typeValueCandidate);
  const typeValue = Number.isInteger(safeTypeValue) && safeTypeValue > 0 ? safeTypeValue : DEFAULT_TICKET_GASTO_TYPE;
  return {
    transDate: lineFromDraft?.transDate || draft.transDate || getTodayYyyyMMdd(),
    typeValue,
    description: safeText(lineFromDraft?.description || draft.description) || "Ticket",
    internacional: false,
    fileId,
    ticket: true,
    qty: 1,
    price: fallbackTotal,
    projId: safeText(projectId) || void 0
  };
};
var persistTraceList = (traceList) => {
  try {
    sessionStorage.setItem(TICKET_TRACE_STORAGE_KEY, JSON.stringify(traceList));
  } catch {
  }
};
var cacheImageFile = async (cacheKey, file) => {
  if (typeof window === "undefined" || !("caches" in window)) return;
  const cache = await caches.open(TICKET_IMAGE_CACHE_NAME);
  const requestUrl = `${TICKET_IMAGE_CACHE_PREFIX}${encodeURIComponent(cacheKey)}`;
  await cache.put(
    new Request(requestUrl),
    new Response(file, {
      headers: {
        "Content-Type": safeText(file.type) || "application/octet-stream"
      }
    })
  );
};
var readCachedImageFile = async (cacheKey) => {
  if (typeof window === "undefined" || !("caches" in window)) return null;
  const cache = await caches.open(TICKET_IMAGE_CACHE_NAME);
  const requestUrl = `${TICKET_IMAGE_CACHE_PREFIX}${encodeURIComponent(cacheKey)}`;
  const cachedResponse = await cache.match(requestUrl);
  if (!cachedResponse) return null;
  return cachedResponse.blob();
};
var removeCachedImageFile = async (cacheKey) => {
  if (typeof window === "undefined" || !("caches" in window)) return;
  const cache = await caches.open(TICKET_IMAGE_CACHE_NAME);
  const requestUrl = `${TICKET_IMAGE_CACHE_PREFIX}${encodeURIComponent(cacheKey)}`;
  await cache.delete(requestUrl);
};
var useExpenseSheetQuickTicketFlow = ({
  sheetId,
  projectId,
  currencyCode,
  canCreateExpense,
  isCreateMode,
  isSheetLocked,
  onForbidden,
  onCompleted
}) => {
  const [sourcePickerOpen, setSourcePickerOpen] = (0, import_react5.useState)(false);
  const [busy, setBusy] = (0, import_react5.useState)(false);
  const [progressKey, setProgressKey] = (0, import_react5.useState)(null);
  const [errorMessage, setErrorMessage] = (0, import_react5.useState)("");
  const [pendingUploadRetry, setPendingUploadRetry] = (0, import_react5.useState)(null);
  const [traceList, setTraceList] = (0, import_react5.useState)([]);
  const latestFileRef = (0, import_react5.useRef)(null);
  const progressMessage = (0, import_react5.useMemo)(() => {
    if (progressKey === "uploadingImage") {
      return indT("ExpenseSheets_NewTicket_Status_UploadingImage", "Uploading image...");
    }
    if (progressKey === "creatingTicket") {
      return indT("ExpenseSheets_NewTicket_Status_CreatingTicket", "Creating ticket...");
    }
    if (progressKey === "syncingFile") {
      return indT("ExpenseSheets_NewTicket_Status_SyncingFile", "Syncing file...");
    }
    if (progressKey === "finalizingIa") {
      return indT("ExpenseSheets_NewTicket_Status_Finalizing", "Finalizing IA...");
    }
    if (progressKey === "linkingExpenseLine") {
      return indT("ExpenseSheets_NewTicket_Status_LinkingLine", "Linking expense line...");
    }
    if (progressKey === "done") {
      return indT("ExpenseSheets_NewTicket_Status_Done", "Done");
    }
    return "";
  }, [progressKey]);
  const addTrace = (0, import_react5.useCallback)((step, traceId) => {
    const safeTraceId = safeText(traceId);
    if (!safeTraceId) return;
    setTraceList((previous) => {
      const next = [
        ...previous,
        {
          step,
          traceId: safeTraceId,
          at: (/* @__PURE__ */ new Date()).toISOString()
        }
      ];
      persistTraceList(next);
      return next;
    });
  }, []);
  const clearFlowState = (0, import_react5.useCallback)(() => {
    setErrorMessage("");
    setPendingUploadRetry(null);
    setTraceList([]);
    persistTraceList([]);
  }, []);
  const ensureQuickCreatePermission = (0, import_react5.useCallback)(() => {
    if (!canCreateExpense || !sheetId || isCreateMode || isSheetLocked) {
      onForbidden();
      return false;
    }
    return true;
  }, [canCreateExpense, isCreateMode, isSheetLocked, onForbidden, sheetId]);
  const resolveUiErrorMessage = (0, import_react5.useCallback)(
    (error) => {
      if (error instanceof ApiFetchError) {
        if (error.status === 422) {
          const validationText = Array.isArray(error.validationErrors) ? error.validationErrors.map((entry) => {
            const field = safeText(entry?.Field);
            const message = safeText(entry?.Message);
            if (field && message) return `${field}: ${message}`;
            return message || field;
          }).filter((entry) => entry).join(" | ") : "";
          return validationText || indT("ExpenseSheets_NewTicket_Error_Validation", "Validation error.");
        }
        if (error.status === 404) {
          return indT("ExpenseSheets_NewTicket_Error_NotFound", "Record not found.");
        }
        if (error.status === 500) {
          return indT("ExpenseSheets_NewTicket_Error_Server", "Server error.");
        }
      }
      return error instanceof Error && safeText(error.message) ? safeText(error.message) : indT("Api_RequestFailed", "Request failed.");
    },
    []
  );
  const applyIaAndLinkToSheet = (0, import_react5.useCallback)(
    async (fileId, draft, uploadResult) => {
      setProgressKey("finalizingIa");
      const iaPayload = buildTicketIaPayload(draft, uploadResult);
      const iaResponse = await applyExpenseSheetTicketIa(fileId, iaPayload, {
        suppressPermissionModal: true
      });
      addTrace("ticket-ia", safeText(iaResponse?.TraceId));
      if (iaResponse.Success !== true) {
        throw new Error(safeText(iaResponse.Message) || indT("Api_RequestFailed", "Request failed."));
      }
      const linePayload = buildSheetLinePayload(draft, fileId, projectId);
      if (!linePayload) return;
      setProgressKey("linkingExpenseLine");
      const createResponse = await createExpenseSheet(
        {
          mode: 2,
          existingHojaGastosId: sheetId,
          lines: [linePayload]
        },
        {
          suppressPermissionModal: true
        }
      );
      addTrace("expense-sheet-append-line", safeText(createResponse?.TraceId));
      if (createResponse.Success !== true) {
        throw new Error(safeText(createResponse.Message) || indT("Api_RequestFailed", "Request failed."));
      }
    },
    [addTrace, projectId, sheetId]
  );
  const resumeFromUploadStep = (0, import_react5.useCallback)(
    async (pendingState, file) => {
      setBusy(true);
      setErrorMessage("");
      setProgressKey("syncingFile");
      try {
        const uploadResponse = await uploadExpenseSheetTicketFile(
          pendingState.fileId,
          file,
          pendingState.extension,
          {
            suppressPermissionModal: true
          }
        );
        addTrace("ticket-file-upload", safeText(uploadResponse?.TraceId));
        if (uploadResponse.Success !== true) {
          throw new Error(safeText(uploadResponse.Message) || indT("Api_RequestFailed", "Request failed."));
        }
        const uploadResult = resolveUploadResult(uploadResponse.Data);
        await applyIaAndLinkToSheet(pendingState.fileId, pendingState.draft, uploadResult);
        setProgressKey("done");
        setPendingUploadRetry(null);
        await removeCachedImageFile(pendingState.cacheKey);
        setTimeout(() => {
          setBusy(false);
          setProgressKey(null);
          onCompleted?.();
        }, 320);
      } catch (error) {
        if (error instanceof ApiFetchError) {
          const traceId = extractTraceIdFromError(error);
          addTrace("ticket-file-upload-error", traceId);
        }
        setBusy(false);
        setProgressKey(null);
        setErrorMessage(resolveUiErrorMessage(error));
      }
    },
    [addTrace, applyIaAndLinkToSheet, onCompleted, resolveUiErrorMessage]
  );
  const runIaCreateFlow = (0, import_react5.useCallback)(
    async (file, extension, cacheKey) => {
      setBusy(true);
      setProgressKey("uploadingImage");
      clearFlowState();
      try {
        setProgressKey("creatingTicket");
        const draftResponse = await extractExpenseFromTicketDraft(file, true, void 0, {
          suppressPermissionModal: true
        });
        addTrace("expensefromticket", safeText(draftResponse?.TraceId));
        if (draftResponse.Success !== true) {
          throw new Error(safeText(draftResponse.Message) || indT("Api_RequestFailed", "Request failed."));
        }
        const draft = normalizeDraftFromIaResponse(draftResponse.Data);
        const fileId = resolveTicketFileIdFromDraftResponse(draftResponse.Data);
        if (!fileId) {
          throw new Error(indT("ExpenseSheets_NewTicket_Error_NoFileId", "Could not resolve ticket file id."));
        }
        try {
          setProgressKey("syncingFile");
          const uploadResponse = await uploadExpenseSheetTicketFile(fileId, file, extension, {
            suppressPermissionModal: true
          });
          addTrace("ticket-file-upload", safeText(uploadResponse?.TraceId));
          if (uploadResponse.Success !== true) {
            throw new Error(safeText(uploadResponse.Message) || indT("Api_RequestFailed", "Request failed."));
          }
          const uploadResult = resolveUploadResult(uploadResponse.Data);
          await applyIaAndLinkToSheet(fileId, draft, uploadResult);
          setProgressKey("done");
          await removeCachedImageFile(cacheKey);
          setTimeout(() => {
            setBusy(false);
            setProgressKey(null);
            onCompleted?.();
          }, 320);
        } catch (uploadError) {
          if (uploadError instanceof ApiFetchError) {
            const traceId = extractTraceIdFromError(uploadError);
            addTrace("ticket-file-upload-error", traceId);
          }
          setPendingUploadRetry({
            fileId,
            extension,
            cacheKey,
            draft,
            fileNameHint: sanitizeFileName(file.name)
          });
          throw new Error(
            indT(
              "ExpenseSheets_NewTicket_Error_UploadRetry",
              "Ticket created, but file sync failed. Retry upload to complete process."
            )
          );
        }
      } catch (error) {
        setBusy(false);
        setProgressKey(null);
        setErrorMessage(resolveUiErrorMessage(error));
      }
    },
    [addTrace, applyIaAndLinkToSheet, clearFlowState, onCompleted, resolveUiErrorMessage]
  );
  const runManualCreateFlow = (0, import_react5.useCallback)(
    async (file, extension, cacheKey) => {
      setBusy(true);
      setProgressKey("creatingTicket");
      clearFlowState();
      try {
        const today = getTodayYyyyMMdd();
        const placeholderUrl = `pending://ticket-upload/${resolveRandomKey()}`;
        const createPayload = {
          mode: 1,
          description: sanitizeFileName(file.name).replace(/\.[a-z0-9]+$/i, "") || "Ticket",
          currencyCode: safeText(currencyCode).toUpperCase() || "EUR",
          transDate: today,
          comentario: "",
          urlFile: placeholderUrl,
          fileExtension: extension
        };
        const createResponse = await createExpenseSheetTicket(createPayload, {
          suppressPermissionModal: true
        });
        addTrace("ticket-create-manual", safeText(createResponse?.TraceId));
        if (createResponse.Success !== true) {
          throw new Error(safeText(createResponse.Message) || indT("Api_RequestFailed", "Request failed."));
        }
        const createData = asRecord(createResponse?.Data);
        const fileId = safeText(getFirstDefined(createData, ["FileId", "fileId"]));
        if (!fileId) {
          throw new Error(indT("ExpenseSheets_NewTicket_Error_NoFileId", "Could not resolve ticket file id."));
        }
        setProgressKey("syncingFile");
        const uploadResponse = await uploadExpenseSheetTicketFile(fileId, file, extension, {
          suppressPermissionModal: true
        });
        addTrace("ticket-file-upload", safeText(uploadResponse?.TraceId));
        if (uploadResponse.Success !== true) {
          throw new Error(safeText(uploadResponse.Message) || indT("Api_RequestFailed", "Request failed."));
        }
        const uploadResult = resolveUploadResult(uploadResponse.Data);
        setProgressKey("uploadingImage");
        const iaDraftResponse = await extractExpenseFromTicketDraft(file, false, uploadResult.urlFile || void 0, {
          suppressPermissionModal: true
        });
        addTrace("expensefromticket", safeText(iaDraftResponse?.TraceId));
        if (iaDraftResponse.Success !== true) {
          throw new Error(safeText(iaDraftResponse.Message) || indT("Api_RequestFailed", "Request failed."));
        }
        const draft = normalizeDraftFromIaResponse(iaDraftResponse.Data);
        await applyIaAndLinkToSheet(fileId, draft, uploadResult);
        setProgressKey("done");
        await removeCachedImageFile(cacheKey);
        setTimeout(() => {
          setBusy(false);
          setProgressKey(null);
          onCompleted?.();
        }, 320);
      } catch (error) {
        if (error instanceof ApiFetchError) {
          const traceId = extractTraceIdFromError(error);
          addTrace("ticket-manual-error", traceId);
        }
        setBusy(false);
        setProgressKey(null);
        setErrorMessage(resolveUiErrorMessage(error));
      }
    },
    [addTrace, applyIaAndLinkToSheet, clearFlowState, currencyCode, onCompleted, resolveUiErrorMessage]
  );
  const handleSelectedFile = (0, import_react5.useCallback)(
    async (file, _source) => {
      if (!file) return;
      if (!ensureQuickCreatePermission()) return;
      const safeType = safeText(file.type).toLowerCase();
      if (safeType && !safeType.startsWith("image/")) {
        setErrorMessage(indT("ExpenseSheets_NewTicket_Error_FileType", "Unsupported image format."));
        return;
      }
      if (file.size > MAX_TICKET_IMAGE_SIZE_BYTES) {
        setErrorMessage(indT("ExpenseSheets_NewTicket_Error_FileSize", "Image exceeds 50MB max size."));
        return;
      }
      const extension = inferExtension(file);
      const cacheKey = resolveRandomKey();
      latestFileRef.current = { cacheKey, file };
      try {
        await cacheImageFile(cacheKey, file);
      } catch {
      }
      if (DEFAULT_CREATE_MODE === "manual") {
        await runManualCreateFlow(file, extension, cacheKey);
      } else {
        await runIaCreateFlow(file, extension, cacheKey);
      }
    },
    [ensureQuickCreatePermission, runIaCreateFlow, runManualCreateFlow]
  );
  const retryPendingUpload = (0, import_react5.useCallback)(async () => {
    if (!pendingUploadRetry) return;
    if (!ensureQuickCreatePermission()) return;
    let selectedFile = latestFileRef.current?.cacheKey === pendingUploadRetry.cacheKey ? latestFileRef.current.file : null;
    if (!selectedFile) {
      const blob = await readCachedImageFile(pendingUploadRetry.cacheKey);
      if (!blob) {
        setErrorMessage(indT("ExpenseSheets_NewTicket_Error_RetryFileMissing", "Cached image is no longer available."));
        return;
      }
      selectedFile = new File([blob], pendingUploadRetry.fileNameHint || "ticket-image", {
        type: safeText(blob.type) || "image/jpeg"
      });
      latestFileRef.current = { cacheKey: pendingUploadRetry.cacheKey, file: selectedFile };
    }
    await resumeFromUploadStep(pendingUploadRetry, selectedFile);
  }, [ensureQuickCreatePermission, pendingUploadRetry, resumeFromUploadStep]);
  const openSourcePicker = (0, import_react5.useCallback)(() => {
    if (!ensureQuickCreatePermission()) return;
    setErrorMessage("");
    setSourcePickerOpen(true);
  }, [ensureQuickCreatePermission]);
  const closeSourcePicker = (0, import_react5.useCallback)(() => {
    if (busy) return;
    setSourcePickerOpen(false);
  }, [busy]);
  const requestCameraPermission = (0, import_react5.useCallback)(async () => {
    if (typeof navigator === "undefined") return null;
    const mediaDevices = navigator.mediaDevices;
    if (!mediaDevices || typeof mediaDevices.getUserMedia !== "function") return null;
    try {
      const stream = await mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch {
      return false;
    }
  }, []);
  const selectFromCamera = (0, import_react5.useCallback)(
    async (inputElement) => {
      if (!inputElement) return;
      const granted = await requestCameraPermission();
      if (granted === false) {
        setErrorMessage(indT("ExpenseSheets_NewTicket_Error_CameraPermission", "Camera permission is required."));
        return;
      }
      setSourcePickerOpen(false);
      inputElement.click();
    },
    [requestCameraPermission]
  );
  const selectFromGallery = (0, import_react5.useCallback)((inputElement) => {
    if (!inputElement) return;
    setSourcePickerOpen(false);
    inputElement.click();
  }, []);
  const clearError = (0, import_react5.useCallback)(() => {
    setErrorMessage("");
  }, []);
  return {
    sourcePickerOpen,
    busy,
    progressKey,
    progressMessage,
    errorMessage,
    hasPendingUploadRetry: pendingUploadRetry !== null,
    traceList,
    openSourcePicker,
    closeSourcePicker,
    selectFromCamera,
    selectFromGallery,
    handleSelectedFile,
    retryPendingUpload,
    clearError
  };
};

// Web/wwwroot/react/src/pages/gastos/detail/ExpenseSheetDetailPage.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var LINES_PAGE_SIZE = 6;
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
var NewTicketIcon = () => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true", className: "h-5 w-5", children: [
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 20h-5a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v2" }),
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14.362 11.15a3 3 0 1 0 -4.144 4.263" }),
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 21v-4a2 2 0 1 1 4 0v4" }),
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 19h4" }),
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 15v6" })
] });
var LinkTicketIcon = () => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true", className: "h-5 w-5", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" }) });
var NewLineIcon = () => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true", className: "h-5 w-5", children: [
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 19c3.333 -2 5 -4 5 -6c0 -3 -1 -3 -2 -3s-2.032 1.085 -2 3c.034 2.048 1.658 2.877 2.5 4c1.5 2 2.5 2.5 3.5 1c.667 -1 1.167 -1.833 1.5 -2.5c1 2.333 2.333 3.5 4 3.5h2.5" }),
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2" }),
  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16 7h4" })
] });
var ExpenseSheetDetailPageContent = () => {
  const { allowSelfManagement } = useAuthContext();
  const hasAccess = canAccess("GASTOS_HOJA_GASTO", "View");
  const canEditExpenseByModule = canAccess("GASTOS_HOJA_GASTO", "Edit");
  const canDeleteExpense = canAccess("GASTOS_HOJA_GASTO", "FullAccess");
  const canCreateExpense = canAccess("GASTOS_HOJA_GASTO", "Add");
  const sheetId = safeText(window.__EXPENSE_SHEET_ID__);
  const sheetMode = safeText(window.__EXPENSE_SHEET_MODE__).toLowerCase();
  const isCreateMode = sheetMode === "create";
  const canEditExpenseStatusByPermission = allowSelfManagement === true && !isCreateMode;
  const canEditExpense = canEditExpenseByModule || canEditExpenseStatusByPermission;
  const lineContainerRef = (0, import_react6.useRef)(null);
  const createdSheetIdRef = (0, import_react6.useRef)("");
  const cameraInputRef = (0, import_react6.useRef)(null);
  const galleryInputRef = (0, import_react6.useRef)(null);
  const [isRedirectingAfterCreate, setIsRedirectingAfterCreate] = (0, import_react6.useState)(false);
  const paginationLabels = (0, import_react6.useMemo)(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last")
    }),
    []
  );
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
    draftExpenseSheetStatus,
    draftEstadoComentarios,
    officialExchangeRateValue,
    officialExchangeRateRawValue,
    officialExchangeRateDate,
    officialExchangeRateSource,
    projectValue,
    voucherValue,
    isSheetPaid,
    isSheetLocked,
    exchangeRateValue,
    showExchangeRate,
    normalizedDraftCurrency,
    exchangeRateBaseCurrency,
    exchangeRateReferenceAmount,
    exchangeRateValidationMessage,
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
    setDraftExpenseSheetStatus,
    setDraftEstadoComentarios,
    handleEnableEdit,
    handleCancelEdit,
    handleOpenCreateLineMode,
    handleOpenLinkTicketMode,
    navigateToCreatedSheet,
    navigateToLineDetail
  } = useExpenseSheetDetailState({
    hasAccess,
    canCreateExpense,
    canEditExpense,
    canEditHeaderFields: canEditExpenseByModule,
    sheetId,
    isCreateMode,
    onForbidden: showPermissionModal
  });
  const canEditExpenseStatus = canEditExpenseStatusByPermission && !isSheetLocked;
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
  }, [busy, handleConfirm]);
  const modalLoadingText = indT("Common_Loading", "Loading");
  const modalCancelText = modal.cancelText || indT("Confirm_No", "Cancel");
  const modalConfirmText = busy ? modalLoadingText : !busy && modalError ? indT("Common_OK", "OK") : modal.confirmText || indT("Confirm_Yes", "OK");
  const handleModalButtonConfirm = (0, import_react6.useCallback)(() => {
    if (!busy && modalError) {
      closeConfirm();
      return;
    }
    handleModalConfirm();
  }, [busy, closeConfirm, handleModalConfirm, modalError]);
  const visibleLines = (0, import_react6.useMemo)(() => pagedSlice(lines, linePage, LINES_PAGE_SIZE), [linePage, lines]);
  const totalLinePages = Math.ceil((lines.length || 0) / LINES_PAGE_SIZE);
  const totalAmountText = (0, import_react6.useMemo)(
    () => formatExpenseNumber(header?.totalAmount, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
      fallback: "-"
    }),
    [header?.totalAmount]
  );
  const { handleUpdate, handleDelete } = useExpenseSheetDetailMutations({
    busy,
    isEditing,
    isCreateMode,
    isLocked: isSheetLocked,
    isCurrencyLockedByLines,
    isExchangeRateLockedByLines,
    lockedCurrencyCode: safeText(header?.currencyCode),
    lockedExchangeRate: safeText(header?.exchRate),
    canCreateExpense,
    canEditExpense,
    canDeleteExpense,
    canEditStatus: canEditExpenseStatus,
    sheetId,
    draftDescription,
    draftCurrencyCode,
    draftExchangeRate,
    officialExchangeRateValue,
    draftProjectId,
    draftExpenseSheetStatus,
    draftEstadoComentarios,
    currentExpenseSheetStatus: header?.expenseSheetStatus,
    currentExchangeRateMode: header?.exchangeRateMode,
    exchangeRateBaseCurrency,
    onCreateSuccess: (createdSheetId) => {
      createdSheetIdRef.current = safeText(createdSheetId);
    },
    setModalError,
    setBusy,
    setStatus,
    setIsEditing
  });
  const handleSaveSuccess = (0, import_react6.useCallback)(() => {
    if (isCreateMode) {
      const createdSheetId = safeText(createdSheetIdRef.current);
      if (!createdSheetId) return;
      setIsRedirectingAfterCreate(true);
      navigateToCreatedSheet(createdSheetId);
      return;
    }
    window.location.reload();
  }, [isCreateMode, navigateToCreatedSheet]);
  useExpenseSheetDetailTopbarActions({
    busy: busy || isRedirectingAfterCreate,
    modalOpen: modal.open,
    isEditing,
    isCreateMode,
    isLocked: isSheetLocked,
    canCreateExpense,
    canEditExpense,
    canDeleteExpense,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
    handleUpdate,
    handleDelete,
    onSaveSuccess: handleSaveSuccess,
    openConfirm,
    closeConfirm
  });
  const resolveClickableCard = (0, import_react6.useCallback)((target) => {
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
  const {
    sourcePickerOpen,
    busy: quickTicketBusy,
    progressMessage: quickTicketProgressMessage,
    errorMessage: quickTicketErrorMessage,
    hasPendingUploadRetry,
    traceList: quickTicketTraceList,
    openSourcePicker,
    closeSourcePicker,
    selectFromCamera,
    selectFromGallery,
    handleSelectedFile,
    retryPendingUpload,
    clearError: clearQuickTicketError
  } = useExpenseSheetQuickTicketFlow({
    sheetId: safeText(header?.hojaGastosId || sheetId),
    projectId: projectValue,
    currencyCode: safeText(header?.currencyCode),
    canCreateExpense,
    isCreateMode,
    isSheetLocked,
    onForbidden: showPermissionModal,
    onCompleted: () => {
      window.location.reload();
    }
  });
  const fabMenuItems = (0, import_react6.useMemo)(
    () => [
      {
        id: "new-ticket",
        label: indT("ExpenseSheets_Fab_NewTicket", "Nuevo Ticket"),
        icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(NewTicketIcon, {}),
        onClick: openSourcePicker
      },
      {
        id: "link-ticket",
        label: indT("ExpenseSheets_Fab_LinkTicket", "Vincular Ticket"),
        icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(LinkTicketIcon, {}),
        onClick: handleOpenLinkTicketMode
      },
      {
        id: "new-line",
        label: indT("ExpenseSheets_Fab_NewLine", "Nueva Linea"),
        icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(NewLineIcon, {}),
        onClick: handleOpenCreateLineMode
      }
    ],
    [handleOpenCreateLineMode, handleOpenLinkTicketMode, openSourcePicker]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-3", children: [
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
        busy: busy || isRedirectingAfterCreate,
        error: modalError,
        status,
        onConfirm: handleModalButtonConfirm,
        onCancel: closeConfirm
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "input",
      {
        ref: cameraInputRef,
        type: "file",
        accept: "image/*",
        capture: "environment",
        className: "hidden",
        onChange: (event) => {
          const file = event.currentTarget.files?.[0] || null;
          event.currentTarget.value = "";
          void handleSelectedFile(file, "camera");
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "input",
      {
        ref: galleryInputRef,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: (event) => {
          const file = event.currentTarget.files?.[0] || null;
          event.currentTarget.value = "";
          void handleSelectedFile(file, "gallery");
        }
      }
    ),
    sourcePickerOpen ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/45 px-4 py-6", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-xl", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h3", { className: "text-[16px] font-semibold text-slate-800", children: indT("ExpenseSheets_NewTicket_Source_Title", "Nuevo ticket") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "mt-1 text-sm text-slate-600", children: indT(
        "ExpenseSheets_NewTicket_Source_Body",
        "Selecciona una fuente para capturar o elegir la imagen del ticket."
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "mt-4 grid grid-cols-1 gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            type: "button",
            className: "ind-action-btn w-full px-3 py-2 text-sm",
            onClick: () => {
              void selectFromCamera(cameraInputRef.current);
            },
            children: indT("ExpenseSheets_NewTicket_Source_Camera", "Usar camara")
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            type: "button",
            className: "ind-action-btn w-full px-3 py-2 text-sm",
            onClick: () => selectFromGallery(galleryInputRef.current),
            children: indT("ExpenseSheets_NewTicket_Source_Gallery", "Elegir imagen")
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            type: "button",
            className: "ind-action-btn w-full px-3 py-2 text-sm",
            onClick: closeSourcePicker,
            children: indT("Common_Cancel", "Cancel")
          }
        )
      ] })
    ] }) }) : null,
    quickTicketBusy ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/35 px-4", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "glass-panel shadow-card flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-sm text-slate-700", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Spinner_default, { size: "h-5 w-5", label: indT("Common_Loading", "Loading") }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: quickTicketProgressMessage || indT("Common_Loading", "Loading") })
    ] }) }) : null,
    quickTicketErrorMessage ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "glass-panel shadow-card space-y-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: quickTicketErrorMessage }),
      quickTicketTraceList.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "rounded-lg border border-rose-200 bg-white p-2 text-xs text-rose-700", children: quickTicketTraceList.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: `${entry.step}: ${entry.traceId}` }, `${entry.step}-${entry.at}`)) }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-wrap gap-2", children: [
        hasPendingUploadRetry ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            type: "button",
            className: "ind-action-btn px-3 py-1.5 text-xs",
            onClick: () => {
              void retryPendingUpload();
            },
            children: indT("ExpenseSheets_NewTicket_RetryUpload", "Reintentar upload")
          }
        ) : null,
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "ind-action-btn px-3 py-1.5 text-xs", onClick: clearQuickTicketError, children: indT("Common_Close", "Close") })
      ] })
    ] }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "div",
      {
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700",
        style: { display: isLoading || isRedirectingAfterCreate ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ]
      }
    ),
    errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-danger", children: errorMessage }) : null,
    !isLoading && !isRedirectingAfterCreate && !errorMessage && header ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      ExpenseSheetHeaderForm_default,
      {
        isCreateMode,
        isEditing,
        canEditHeaderFields: canEditExpenseByModule,
        canEditStatus: canEditExpenseStatus,
        header,
        projectValue,
        voucherValue,
        isSheetPaid,
        isCurrencyLockedByLines,
        isExchangeRateLockedByLines,
        normalizedDraftCurrency,
        exchangeRateBaseCurrency,
        exchangeRateReferenceAmount,
        showExchangeRate,
        exchangeRateValue,
        exchangeRateValidationMessage,
        totalAmountText,
        draftDescription,
        draftProjectId,
        draftCurrencyCode,
        draftExchangeRate,
        draftExpenseSheetStatus,
        draftEstadoComentarios,
        officialExchangeRateRawValue,
        officialExchangeRateDate,
        officialExchangeRateSource,
        onDraftDescriptionChange: setDraftDescription,
        onDraftProjectIdChange: setDraftProjectId,
        onDraftCurrencyCodeChange: setDraftCurrencyCode,
        onDraftExchangeRateChange: setDraftExchangeRate,
        onDraftExpenseSheetStatusChange: setDraftExpenseSheetStatus,
        onDraftEstadoComentariosChange: setDraftEstadoComentarios
      }
    ) : null,
    !isCreateMode && !isLoading && !isRedirectingAfterCreate && !errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      ExpenseLinesTimeline_default,
      {
        visibleLines,
        currencyCode: safeText(header?.currencyCode),
        totalLinePages,
        linePage,
        linesLabel: indT("ExpenseSheets_Lines", "Lines"),
        emptyText: indT("ExpenseSheets_NoLines", "No lines for this expense sheet."),
        paginationLabels,
        containerRef: lineContainerRef,
        onLinePageChange: setLinePage,
        onOpenLine: navigateToLineDetail
      }
    ) : null,
    canCreateExpense && !isCreateMode && !isSheetLocked ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      FloatingActionButton_default,
      {
        ariaLabel: indT("ExpenseSheets_Fab_Actions", "Acciones rapidas"),
        size: 76,
        right: 16,
        bottom: 24,
        menuAriaLabel: indT("ExpenseSheets_Fab_Actions", "Acciones rapidas"),
        menuItems: fabMenuItems
      }
    ) : null
  ] });
};
var ExpenseSheetDetailPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(VisitasPageProviders_default, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ExpenseSheetDetailPageContent, {}) });
};
var mount = () => {
  bootstrapExpenseApiAuth();
  const rootEl = document.getElementById("expense-sheet-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ExpenseSheetDetailPage, {}));
};
mountWhenDocumentReady(mount);
var ExpenseSheetDetailPage_default = ExpenseSheetDetailPage;
export {
  ExpenseSheetDetailPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvRXhwZW5zZVNoZWV0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VTaGVldEhlYWRlckZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvSW5mb1BvcG92ZXJJY29uQnV0dG9uLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbnN0YW50cy9leGNoYW5nZVJhdGVFbnRyeU1vZGVDYXRhbG9nLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlTGluZXNUaW1lbGluZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbmZpcm1Nb2RhbC50c3hcIjtcbmltcG9ydCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiwgeyB0eXBlIEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW0gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nQWN0aW9uQnV0dG9uLnRzeFwiO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TcGlubmVyLnRzeFwiO1xuaW1wb3J0IHsgdXNlQXV0aENvbnRleHQgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xuaW1wb3J0IHsgdXNlQ29uZmlybURpYWxvZyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzXCI7XG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0TGluZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCBFeHBlbnNlU2hlZXRIZWFkZXJGb3JtIGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VTaGVldEhlYWRlckZvcm0udHN4XCI7XG5pbXBvcnQgRXhwZW5zZUxpbmVzVGltZWxpbmUgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZUxpbmVzVGltZWxpbmUudHN4XCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZU51bWJlciB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XG5pbXBvcnQgeyBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cudHNcIjtcblxuY29uc3QgTElORVNfUEFHRV9TSVpFID0gNjtcblxuY29uc3QgcGFnZWRTbGljZSA9IDxULD4oaXRlbXM6IFRbXSwgcGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyKTogVFtdID0+IHtcbiAgaWYgKCFpdGVtcy5sZW5ndGgpIHJldHVybiBbXTtcbiAgY29uc3Qgc2FmZVBhZ2UgPSBNYXRoLm1heCgxLCBwYWdlKTtcbiAgY29uc3Qgc3RhcnQgPSAoc2FmZVBhZ2UgLSAxKSAqIHBhZ2VTaXplO1xuICByZXR1cm4gaXRlbXMuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgcGFnZVNpemUpO1xufTtcblxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxuY29uc3QgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGggPSAoKSA9PiB7XG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoKHtcbiAgICB0b2tlbjogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcbiAgICBlbnRyYU9pZDogc2FmZVRleHQod2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcbiAgICBhcHBDb2RlOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBQX0NPREVfXyksXG4gIH0pO1xufTtcblxuY29uc3QgTmV3VGlja2V0SWNvbiA9ICgpID0+IChcbiAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD17MS41fSBhcmlhLWhpZGRlbj1cInRydWVcIiBjbGFzc05hbWU9XCJoLTUgdy01XCI+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTAgMjBoLTVhMiAyIDAgMCAxIC0yIC0ydi05YTIgMiAwIDAgMSAyIC0yaDFhMiAyIDAgMCAwIDIgLTJhMSAxIDAgMCAxIDEgLTFoNmExIDEgMCAwIDEgMSAxYTIgMiAwIDAgMCAyIDJoMWEyIDIgMCAwIDEgMiAydjJcIiAvPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0LjM2MiAxMS4xNWEzIDMgMCAxIDAgLTQuMTQ0IDQuMjYzXCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAyMXYtNGEyIDIgMCAxIDEgNCAwdjRcIiAvPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDE5aDRcIiAvPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTIxIDE1djZcIiAvPlxuICA8L3N2Zz5cbik7XG5cbmNvbnN0IExpbmtUaWNrZXRJY29uID0gKCkgPT4gKFxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsxLjV9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzTmFtZT1cImgtNSB3LTVcIj5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xMy4xOSA4LjY4OGE0LjUgNC41IDAgMCAxIDEuMjQyIDcuMjQ0bC00LjUgNC41YTQuNSA0LjUgMCAwIDEtNi4zNjQtNi4zNjRsMS43NTctMS43NTdtMTMuMzUtLjYyMiAxLjc1Ny0xLjc1N2E0LjUgNC41IDAgMCAwLTYuMzY0LTYuMzY0bC00LjUgNC41YTQuNSA0LjUgMCAwIDAgMS4yNDIgNy4yNDRcIiAvPlxuICA8L3N2Zz5cbik7XG5cbmNvbnN0IE5ld0xpbmVJY29uID0gKCkgPT4gKFxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsxLjV9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzTmFtZT1cImgtNSB3LTVcIj5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0zIDE5YzMuMzMzIC0yIDUgLTQgNSAtNmMwIC0zIC0xIC0zIC0yIC0zcy0yLjAzMiAxLjA4NSAtMiAzYy4wMzQgMi4wNDggMS42NTggMi44NzcgMi41IDRjMS41IDIgMi41IDIuNSAzLjUgMWMuNjY3IC0xIDEuMTY3IC0xLjgzMyAxLjUgLTIuNWMxIDIuMzMzIDIuMzMzIDMuNSA0IDMuNWgyLjVcIiAvPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTIwIDE3di0xMmMwIC0xLjEyMSAtLjg3OSAtMiAtMiAtMnMtMiAuODc5IC0yIDJ2MTJsMiAybDIgLTJcIiAvPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE2IDdoNFwiIC8+XG4gIDwvc3ZnPlxuKTtcblxuY29uc3QgRXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRlbnQgPSAoKSA9PiB7XG4gIGNvbnN0IHsgYWxsb3dTZWxmTWFuYWdlbWVudCB9ID0gdXNlQXV0aENvbnRleHQoKTtcbiAgY29uc3QgaGFzQWNjZXNzID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJWaWV3XCIpO1xuICBjb25zdCBjYW5FZGl0RXhwZW5zZUJ5TW9kdWxlID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJFZGl0XCIpO1xuICBjb25zdCBjYW5EZWxldGVFeHBlbnNlID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJGdWxsQWNjZXNzXCIpO1xuICBjb25zdCBjYW5DcmVhdGVFeHBlbnNlID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJBZGRcIik7XG4gIGNvbnN0IHNoZWV0SWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1NIRUVUX0lEX18pO1xuICBjb25zdCBzaGVldE1vZGUgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1NIRUVUX01PREVfXykudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgaXNDcmVhdGVNb2RlID0gc2hlZXRNb2RlID09PSBcImNyZWF0ZVwiO1xuICBjb25zdCBjYW5FZGl0RXhwZW5zZVN0YXR1c0J5UGVybWlzc2lvbiA9IGFsbG93U2VsZk1hbmFnZW1lbnQgPT09IHRydWUgJiYgIWlzQ3JlYXRlTW9kZTtcbiAgY29uc3QgY2FuRWRpdEV4cGVuc2UgPSBjYW5FZGl0RXhwZW5zZUJ5TW9kdWxlIHx8IGNhbkVkaXRFeHBlbnNlU3RhdHVzQnlQZXJtaXNzaW9uO1xuICBjb25zdCBsaW5lQ29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGNyZWF0ZWRTaGVldElkUmVmID0gdXNlUmVmKFwiXCIpO1xuICBjb25zdCBjYW1lcmFJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGdhbGxlcnlJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsIHNldElzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZpcnN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIiksXG4gICAgICBwcmV2OiBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKSxcbiAgICAgIG5leHQ6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIiksXG4gICAgICBsYXN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpLFxuICAgIH0pLFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3Qge1xuICAgIGhlYWRlcixcbiAgICBsaW5lcyxcbiAgICBsaW5lUGFnZSxcbiAgICBpc0xvYWRpbmcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGJ1c3ksXG4gICAgc3RhdHVzLFxuICAgIGlzRWRpdGluZyxcbiAgICBtb2RhbEVycm9yLFxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgZHJhZnRQcm9qZWN0SWQsXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgZHJhZnRFeGNoYW5nZVJhdGUsXG4gICAgZHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlLFxuICAgIHByb2plY3RWYWx1ZSxcbiAgICB2b3VjaGVyVmFsdWUsXG4gICAgaXNTaGVldFBhaWQsXG4gICAgaXNTaGVldExvY2tlZCxcbiAgICBleGNoYW5nZVJhdGVWYWx1ZSxcbiAgICBzaG93RXhjaGFuZ2VSYXRlLFxuICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQsXG4gICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXG4gICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxuICAgIHNldExpbmVQYWdlLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXG4gICAgc2V0RHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gICAgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlLFxuICAgIGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSxcbiAgICBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0LFxuICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsLFxuICB9ID0gdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUoe1xuICAgIGhhc0FjY2VzcyxcbiAgICBjYW5DcmVhdGVFeHBlbnNlLFxuICAgIGNhbkVkaXRFeHBlbnNlLFxuICAgIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGNhbkVkaXRFeHBlbnNlQnlNb2R1bGUsXG4gICAgc2hlZXRJZCxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gIH0pO1xuXG4gIGNvbnN0IGNhbkVkaXRFeHBlbnNlU3RhdHVzID0gY2FuRWRpdEV4cGVuc2VTdGF0dXNCeVBlcm1pc3Npb24gJiYgIWlzU2hlZXRMb2NrZWQ7XG5cbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXG4gIH0pO1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xuICAgICAgYnVzeSxcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xuICAgICAgICBzZXRTdGF0dXMobXNnKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtXSk7XG5cbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIik7XG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBidXN5XG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XG4gICAgOiAoIWJ1c3kgJiYgbW9kYWxFcnJvciA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKSA6IChtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSkpO1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xuICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xuICB9LCBbYnVzeSwgY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm0sIG1vZGFsRXJyb3JdKTtcblxuICBjb25zdCB2aXNpYmxlTGluZXMgPSB1c2VNZW1vKCgpID0+IHBhZ2VkU2xpY2UobGluZXMsIGxpbmVQYWdlLCBMSU5FU19QQUdFX1NJWkUpLCBbbGluZVBhZ2UsIGxpbmVzXSk7XG4gIGNvbnN0IHRvdGFsTGluZVBhZ2VzID0gTWF0aC5jZWlsKChsaW5lcy5sZW5ndGggfHwgMCkgLyBMSU5FU19QQUdFX1NJWkUpO1xuICBjb25zdCB0b3RhbEFtb3VudFRleHQgPSB1c2VNZW1vKFxuICAgICgpID0+XG4gICAgICBmb3JtYXRFeHBlbnNlTnVtYmVyKGhlYWRlcj8udG90YWxBbW91bnQsIHtcbiAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgICAgICBmYWxsYmFjazogXCItXCIsXG4gICAgICB9KSxcbiAgICBbaGVhZGVyPy50b3RhbEFtb3VudF1cbiAgKTtcblxuICBjb25zdCB7IGhhbmRsZVVwZGF0ZSwgaGFuZGxlRGVsZXRlIH0gPSB1c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMoe1xuICAgIGJ1c3ksXG4gICAgaXNFZGl0aW5nLFxuICAgIGlzQ3JlYXRlTW9kZSxcbiAgICBpc0xvY2tlZDogaXNTaGVldExvY2tlZCxcbiAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXG4gICAgbG9ja2VkQ3VycmVuY3lDb2RlOiBzYWZlVGV4dChoZWFkZXI/LmN1cnJlbmN5Q29kZSksXG4gICAgbG9ja2VkRXhjaGFuZ2VSYXRlOiBzYWZlVGV4dChoZWFkZXI/LmV4Y2hSYXRlKSxcbiAgICBjYW5DcmVhdGVFeHBlbnNlLFxuICAgIGNhbkVkaXRFeHBlbnNlLFxuICAgIGNhbkRlbGV0ZUV4cGVuc2UsXG4gICAgY2FuRWRpdFN0YXR1czogY2FuRWRpdEV4cGVuc2VTdGF0dXMsXG4gICAgc2hlZXRJZCxcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsXG4gICAgZHJhZnRQcm9qZWN0SWQsXG4gICAgZHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcbiAgICBjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzOiBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyxcbiAgICBjdXJyZW50RXhjaGFuZ2VSYXRlTW9kZTogaGVhZGVyPy5leGNoYW5nZVJhdGVNb2RlLFxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgICBvbkNyZWF0ZVN1Y2Nlc3M6IChjcmVhdGVkU2hlZXRJZCkgPT4ge1xuICAgICAgY3JlYXRlZFNoZWV0SWRSZWYuY3VycmVudCA9IHNhZmVUZXh0KGNyZWF0ZWRTaGVldElkKTtcbiAgICB9LFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRTdGF0dXMsXG4gICAgc2V0SXNFZGl0aW5nLFxuICB9KTtcblxuICBjb25zdCBoYW5kbGVTYXZlU3VjY2VzcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICBjb25zdCBjcmVhdGVkU2hlZXRJZCA9IHNhZmVUZXh0KGNyZWF0ZWRTaGVldElkUmVmLmN1cnJlbnQpO1xuICAgICAgaWYgKCFjcmVhdGVkU2hlZXRJZCkgcmV0dXJuO1xuICAgICAgc2V0SXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlKHRydWUpO1xuICAgICAgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldChjcmVhdGVkU2hlZXRJZCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9LCBbaXNDcmVhdGVNb2RlLCBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0XSk7XG5cbiAgdXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9ucyh7XG4gICAgYnVzeTogYnVzeSB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsXG4gICAgbW9kYWxPcGVuOiBtb2RhbC5vcGVuLFxuICAgIGlzRWRpdGluZyxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgaXNMb2NrZWQ6IGlzU2hlZXRMb2NrZWQsXG4gICAgY2FuQ3JlYXRlRXhwZW5zZSxcbiAgICBjYW5FZGl0RXhwZW5zZSxcbiAgICBjYW5EZWxldGVFeHBlbnNlLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxuICAgIGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVEZWxldGUsXG4gICAgb25TYXZlU3VjY2VzczogaGFuZGxlU2F2ZVN1Y2Nlc3MsXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgY2xvc2VDb25maXJtLFxuICB9KTtcblxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGNhcmQgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiKTtcbiAgICBpZiAoIWNhcmQpIHJldHVybiBudWxsO1xuICAgIGlmICghbGluZUNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyhjYXJkKSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNhcmQ7XG4gIH0sIFtdKTtcblxuICB1c2VUaW1lbGluZUNhcmRFZmZlY3RzKHtcbiAgICBjb250YWluZXJSZWY6IGxpbmVDb250YWluZXJSZWYsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGl0ZW1zOiB2aXNpYmxlTGluZXMsXG4gICAgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsXG4gIH0pO1xuXG4gIGNvbnN0IHtcbiAgICBzb3VyY2VQaWNrZXJPcGVuLFxuICAgIGJ1c3k6IHF1aWNrVGlja2V0QnVzeSxcbiAgICBwcm9ncmVzc01lc3NhZ2U6IHF1aWNrVGlja2V0UHJvZ3Jlc3NNZXNzYWdlLFxuICAgIGVycm9yTWVzc2FnZTogcXVpY2tUaWNrZXRFcnJvck1lc3NhZ2UsXG4gICAgaGFzUGVuZGluZ1VwbG9hZFJldHJ5LFxuICAgIHRyYWNlTGlzdDogcXVpY2tUaWNrZXRUcmFjZUxpc3QsXG4gICAgb3BlblNvdXJjZVBpY2tlcixcbiAgICBjbG9zZVNvdXJjZVBpY2tlcixcbiAgICBzZWxlY3RGcm9tQ2FtZXJhLFxuICAgIHNlbGVjdEZyb21HYWxsZXJ5LFxuICAgIGhhbmRsZVNlbGVjdGVkRmlsZSxcbiAgICByZXRyeVBlbmRpbmdVcGxvYWQsXG4gICAgY2xlYXJFcnJvcjogY2xlYXJRdWlja1RpY2tldEVycm9yLFxuICB9ID0gdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93KHtcbiAgICBzaGVldElkOiBzYWZlVGV4dChoZWFkZXI/LmhvamFHYXN0b3NJZCB8fCBzaGVldElkKSxcbiAgICBwcm9qZWN0SWQ6IHByb2plY3RWYWx1ZSxcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSxcbiAgICBjYW5DcmVhdGVFeHBlbnNlLFxuICAgIGlzQ3JlYXRlTW9kZSxcbiAgICBpc1NoZWV0TG9ja2VkLFxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxuICAgIG9uQ29tcGxldGVkOiAoKSA9PiB7XG4gICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSxcbiAgfSk7XG5cbiAgY29uc3QgZmFiTWVudUl0ZW1zID0gdXNlTWVtbzxGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtW10+KFxuICAgICgpID0+IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6IFwibmV3LXRpY2tldFwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX05ld1RpY2tldFwiLCBcIk51ZXZvIFRpY2tldFwiKSxcbiAgICAgICAgaWNvbjogPE5ld1RpY2tldEljb24gLz4sXG4gICAgICAgIG9uQ2xpY2s6IG9wZW5Tb3VyY2VQaWNrZXIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogXCJsaW5rLXRpY2tldFwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX0xpbmtUaWNrZXRcIiwgXCJWaW5jdWxhciBUaWNrZXRcIiksXG4gICAgICAgIGljb246IDxMaW5rVGlja2V0SWNvbiAvPixcbiAgICAgICAgb25DbGljazogaGFuZGxlT3BlbkxpbmtUaWNrZXRNb2RlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6IFwibmV3LWxpbmVcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9OZXdMaW5lXCIsIFwiTnVldmEgTGluZWFcIiksXG4gICAgICAgIGljb246IDxOZXdMaW5lSWNvbiAvPixcbiAgICAgICAgb25DbGljazogaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlLFxuICAgICAgfSxcbiAgICBdLFxuICAgIFtoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUsIGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSwgb3BlblNvdXJjZVBpY2tlcl1cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICA8Q29uZmlybU1vZGFsXG4gICAgICAgIG9wZW49e21vZGFsLm9wZW59XG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cbiAgICAgICAgY29uZmlybVRleHQ9e21vZGFsQ29uZmlybVRleHR9XG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsTG9hZGluZ1RleHR9XG4gICAgICAgIHNob3dDYW5jZWw9e21vZGFsLnNob3dDYW5jZWx9XG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cbiAgICAgICAgYnVzeT17YnVzeSB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGV9XG4gICAgICAgIGVycm9yPXttb2RhbEVycm9yfVxuICAgICAgICBzdGF0dXM9e3N0YXR1c31cbiAgICAgICAgb25Db25maXJtPXtoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm19XG4gICAgICAgIG9uQ2FuY2VsPXtjbG9zZUNvbmZpcm19XG4gICAgICAvPlxuXG4gICAgICA8aW5wdXRcbiAgICAgICAgcmVmPXtjYW1lcmFJbnB1dFJlZn1cbiAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICBhY2NlcHQ9XCJpbWFnZS8qXCJcbiAgICAgICAgY2FwdHVyZT1cImVudmlyb25tZW50XCJcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZpbGUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmZpbGVzPy5bMF0gfHwgbnVsbDtcbiAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgICB2b2lkIGhhbmRsZVNlbGVjdGVkRmlsZShmaWxlLCBcImNhbWVyYVwiKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgICA8aW5wdXRcbiAgICAgICAgcmVmPXtnYWxsZXJ5SW5wdXRSZWZ9XG4gICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgYWNjZXB0PVwiaW1hZ2UvKlwiXG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBmaWxlID0gZXZlbnQuY3VycmVudFRhcmdldC5maWxlcz8uWzBdIHx8IG51bGw7XG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgdm9pZCBoYW5kbGVTZWxlY3RlZEZpbGUoZmlsZSwgXCJnYWxsZXJ5XCIpO1xuICAgICAgICB9fVxuICAgICAgLz5cblxuICAgICAge3NvdXJjZVBpY2tlck9wZW4gPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTYwMDAwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1zbGF0ZS05NTAvNDUgcHgtNCBweS02XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctc20gcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUgcC00IHNoYWRvdy14bFwiPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtWzE2cHhdIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfVGl0bGVcIiwgXCJOdWV2byB0aWNrZXRcIil9XG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+XG4gICAgICAgICAgICAgIHtpbmRUKFxuICAgICAgICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX0JvZHlcIixcbiAgICAgICAgICAgICAgICBcIlNlbGVjY2lvbmEgdW5hIGZ1ZW50ZSBwYXJhIGNhcHR1cmFyIG8gZWxlZ2lyIGxhIGltYWdlbiBkZWwgdGlja2V0LlwiXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNCBncmlkIGdyaWQtY29scy0xIGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIHZvaWQgc2VsZWN0RnJvbUNhbWVyYShjYW1lcmFJbnB1dFJlZi5jdXJyZW50KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfQ2FtZXJhXCIsIFwiVXNhciBjYW1hcmFcIil9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZWxlY3RGcm9tR2FsbGVyeShnYWxsZXJ5SW5wdXRSZWYuY3VycmVudCl9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9HYWxsZXJ5XCIsIFwiRWxlZ2lyIGltYWdlblwiKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2Nsb3NlU291cmNlUGlja2VyfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7cXVpY2tUaWNrZXRCdXN5ID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctc2xhdGUtOTUwLzM1IHB4LTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlLzk1IHB4LTQgcHktMyB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCI+XG4gICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC01IHctNVwiIGxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfSAvPlxuICAgICAgICAgICAgPHNwYW4+e3F1aWNrVGlja2V0UHJvZ3Jlc3NNZXNzYWdlIHx8IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7cXVpY2tUaWNrZXRFcnJvck1lc3NhZ2UgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgc3BhY2UteS0yIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctcm9zZS01MCBwLTMgdGV4dC1zbSB0ZXh0LXJvc2UtODAwXCI+XG4gICAgICAgICAgPHA+e3F1aWNrVGlja2V0RXJyb3JNZXNzYWdlfTwvcD5cbiAgICAgICAgICB7cXVpY2tUaWNrZXRUcmFjZUxpc3QubGVuZ3RoID4gMCA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXdoaXRlIHAtMiB0ZXh0LXhzIHRleHQtcm9zZS03MDBcIj5cbiAgICAgICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lm1hcCgoZW50cnkpID0+IChcbiAgICAgICAgICAgICAgICA8cCBrZXk9e2Ake2VudHJ5LnN0ZXB9LSR7ZW50cnkuYXR9YH0+e2Ake2VudHJ5LnN0ZXB9OiAke2VudHJ5LnRyYWNlSWR9YH08L3A+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMlwiPlxuICAgICAgICAgICAge2hhc1BlbmRpbmdVcGxvYWRSZXRyeSA/IChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIHZvaWQgcmV0cnlQZW5kaW5nVXBsb2FkKCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUmV0cnlVcGxvYWRcIiwgXCJSZWludGVudGFyIHVwbG9hZFwiKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIiBvbkNsaWNrPXtjbGVhclF1aWNrVGlja2V0RXJyb3J9PlxuICAgICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9DbG9zZVwiLCBcIkNsb3NlXCIpfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwibG9hZGVyLWJveCBnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCJcbiAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogaXNMb2FkaW5nIHx8IGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cbiAgICAgID5cbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cbiAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHtlcnJvck1lc3NhZ2UgPyA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2Vycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxuXG4gICAgICB7IWlzTG9hZGluZyAmJiAhaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlICYmICFlcnJvck1lc3NhZ2UgJiYgaGVhZGVyID8gKFxuICAgICAgICA8RXhwZW5zZVNoZWV0SGVhZGVyRm9ybVxuICAgICAgICAgIGlzQ3JlYXRlTW9kZT17aXNDcmVhdGVNb2RlfVxuICAgICAgICAgIGlzRWRpdGluZz17aXNFZGl0aW5nfVxuICAgICAgICAgIGNhbkVkaXRIZWFkZXJGaWVsZHM9e2NhbkVkaXRFeHBlbnNlQnlNb2R1bGV9XG4gICAgICAgICAgY2FuRWRpdFN0YXR1cz17Y2FuRWRpdEV4cGVuc2VTdGF0dXN9XG4gICAgICAgICAgaGVhZGVyPXtoZWFkZXJ9XG4gICAgICAgICAgcHJvamVjdFZhbHVlPXtwcm9qZWN0VmFsdWV9XG4gICAgICAgICAgdm91Y2hlclZhbHVlPXt2b3VjaGVyVmFsdWV9XG4gICAgICAgICAgaXNTaGVldFBhaWQ9e2lzU2hlZXRQYWlkfVxuICAgICAgICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzPXtpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cbiAgICAgICAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXM9e2lzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lc31cbiAgICAgICAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeT17bm9ybWFsaXplZERyYWZ0Q3VycmVuY3l9XG4gICAgICAgICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5PXtleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3l9XG4gICAgICAgICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50PXtleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnR9XG4gICAgICAgICAgc2hvd0V4Y2hhbmdlUmF0ZT17c2hvd0V4Y2hhbmdlUmF0ZX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVWYWx1ZT17ZXhjaGFuZ2VSYXRlVmFsdWV9XG4gICAgICAgICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2U9e2V4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlfVxuICAgICAgICAgIHRvdGFsQW1vdW50VGV4dD17dG90YWxBbW91bnRUZXh0fVxuICAgICAgICAgIGRyYWZ0RGVzY3JpcHRpb249e2RyYWZ0RGVzY3JpcHRpb259XG4gICAgICAgICAgZHJhZnRQcm9qZWN0SWQ9e2RyYWZ0UHJvamVjdElkfVxuICAgICAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlPXtkcmFmdEN1cnJlbmN5Q29kZX1cbiAgICAgICAgICBkcmFmdEV4Y2hhbmdlUmF0ZT17ZHJhZnRFeGNoYW5nZVJhdGV9XG4gICAgICAgICAgZHJhZnRFeHBlbnNlU2hlZXRTdGF0dXM9e2RyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzfVxuICAgICAgICAgIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3M9e2RyYWZ0RXN0YWRvQ29tZW50YXJpb3N9XG4gICAgICAgICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZT17b2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZX1cbiAgICAgICAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGU9e29mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZX1cbiAgICAgICAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZT17b2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2V9XG4gICAgICAgICAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlPXtzZXREcmFmdERlc2NyaXB0aW9ufVxuICAgICAgICAgIG9uRHJhZnRQcm9qZWN0SWRDaGFuZ2U9e3NldERyYWZ0UHJvamVjdElkfVxuICAgICAgICAgIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U9e3NldERyYWZ0Q3VycmVuY3lDb2RlfVxuICAgICAgICAgIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2U9e3NldERyYWZ0RXhjaGFuZ2VSYXRlfVxuICAgICAgICAgIG9uRHJhZnRFeHBlbnNlU2hlZXRTdGF0dXNDaGFuZ2U9e3NldERyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzfVxuICAgICAgICAgIG9uRHJhZnRFc3RhZG9Db21lbnRhcmlvc0NoYW5nZT17c2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvc31cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7IWlzQ3JlYXRlTW9kZSAmJiAhaXNMb2FkaW5nICYmICFpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUgJiYgIWVycm9yTWVzc2FnZSA/IChcbiAgICAgICAgPEV4cGVuc2VMaW5lc1RpbWVsaW5lXG4gICAgICAgICAgdmlzaWJsZUxpbmVzPXt2aXNpYmxlTGluZXN9XG4gICAgICAgICAgY3VycmVuY3lDb2RlPXtzYWZlVGV4dChoZWFkZXI/LmN1cnJlbmN5Q29kZSl9XG4gICAgICAgICAgdG90YWxMaW5lUGFnZXM9e3RvdGFsTGluZVBhZ2VzfVxuICAgICAgICAgIGxpbmVQYWdlPXtsaW5lUGFnZX1cbiAgICAgICAgICBsaW5lc0xhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lc1wiLCBcIkxpbmVzXCIpfVxuICAgICAgICAgIGVtcHR5VGV4dD17aW5kVChcIkV4cGVuc2VTaGVldHNfTm9MaW5lc1wiLCBcIk5vIGxpbmVzIGZvciB0aGlzIGV4cGVuc2Ugc2hlZXQuXCIpfVxuICAgICAgICAgIHBhZ2luYXRpb25MYWJlbHM9e3BhZ2luYXRpb25MYWJlbHN9XG4gICAgICAgICAgY29udGFpbmVyUmVmPXtsaW5lQ29udGFpbmVyUmVmfVxuICAgICAgICAgIG9uTGluZVBhZ2VDaGFuZ2U9e3NldExpbmVQYWdlfVxuICAgICAgICAgIG9uT3BlbkxpbmU9e25hdmlnYXRlVG9MaW5lRGV0YWlsfVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIHtjYW5DcmVhdGVFeHBlbnNlICYmICFpc0NyZWF0ZU1vZGUgJiYgIWlzU2hlZXRMb2NrZWQgPyAoXG4gICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxuICAgICAgICAgIGFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX0FjdGlvbnNcIiwgXCJBY2Npb25lcyByYXBpZGFzXCIpfVxuICAgICAgICAgIHNpemU9ezc2fVxuICAgICAgICAgIHJpZ2h0PXsxNn1cbiAgICAgICAgICBib3R0b209ezI0fVxuICAgICAgICAgIG1lbnVBcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgcmFwaWRhc1wiKX1cbiAgICAgICAgICBtZW51SXRlbXM9e2ZhYk1lbnVJdGVtc31cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gTWFpbiBwYWdlIGVudHJ5IGZvciBleHBlbnNlIHNoZWV0IGRldGFpbC5cbmNvbnN0IEV4cGVuc2VTaGVldERldGFpbFBhZ2UgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFZpc2l0YXNQYWdlUHJvdmlkZXJzPlxuICAgICAgPEV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250ZW50IC8+XG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgKTtcbn07XG5cbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cGVuc2Utc2hlZXQtZGV0YWlsLXJvb3RcIik7XG4gIGlmICghcm9vdEVsKSByZXR1cm47XG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVNoZWV0RGV0YWlsUGFnZSAvPik7XG59O1xuXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0RGV0YWlsUGFnZTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBpbmRGb3JtYXQsIGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRIZWFkZXIgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dCBmcm9tIFwiLi9FeHBlbnNlUHJvamVjdEZpbHRlcklucHV0LnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VSZWFkT25seUZpZWxkIGZyb20gXCIuL0V4cGVuc2VSZWFkT25seUZpZWxkLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24udHN4XCI7XG5pbXBvcnQgSW5mb1BvcG92ZXJJY29uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvSW5mb1BvcG92ZXJJY29uQnV0dG9uLnRzeFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlU2hlZXRTdGF0dXNPcHRpb25zLCBnZXRFeHBlbnNlU3RhdHVzTGFiZWwgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leGNoYW5nZVJhdGVFbnRyeU1vZGVDYXRhbG9nLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIsIGZvcm1hdEV4cGVuc2VOdW1iZXIsIHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XG5cbnR5cGUgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybVByb3BzID0ge1xuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgY2FuRWRpdEhlYWRlckZpZWxkczogYm9vbGVhbjtcbiAgY2FuRWRpdFN0YXR1czogYm9vbGVhbjtcbiAgaGVhZGVyOiBFeHBlbnNlU2hlZXRIZWFkZXI7XG4gIHByb2plY3RWYWx1ZTogc3RyaW5nO1xuICB2b3VjaGVyVmFsdWU6IHN0cmluZztcbiAgaXNTaGVldFBhaWQ6IGJvb2xlYW47XG4gIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XG4gIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5OiBzdHJpbmc7XG4gIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeTogc3RyaW5nO1xuICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQ6IG51bWJlcjtcbiAgc2hvd0V4Y2hhbmdlUmF0ZTogYm9vbGVhbjtcbiAgZXhjaGFuZ2VSYXRlVmFsdWU6IHN0cmluZztcbiAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2U6IHN0cmluZztcbiAgdG90YWxBbW91bnRUZXh0OiBzdHJpbmc7XG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcbiAgZHJhZnRQcm9qZWN0SWQ6IHN0cmluZztcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgZHJhZnRFeGNoYW5nZVJhdGU6IHN0cmluZztcbiAgZHJhZnRFeHBlbnNlU2hlZXRTdGF0dXM6IG51bWJlcjtcbiAgZHJhZnRFc3RhZG9Db21lbnRhcmlvczogc3RyaW5nO1xuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlOiBzdHJpbmc7XG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZTogc3RyaW5nO1xuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZTogc3RyaW5nO1xuICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzQ2hhbmdlOiAodmFsdWU6IG51bWJlcikgPT4gdm9pZDtcbiAgb25EcmFmdEVzdGFkb0NvbWVudGFyaW9zQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbn07XG5cbmNvbnN0IEVYQ0hBTkdFX1JBVEVfTU9ERV9QUkVGSVhfUEFUVEVSTiA9IC9eVFxcLj9DXFwuP1xccyovaTtcblxuLy8gUHVyZSBwcmVzZW50YXRpb25hbCBoZWFkZXIgZm9ybSBmb3IgZXhwZW5zZSBzaGVldCBkZXRhaWwvY3JlYXRlIHNjcmVlbnMuXG5jb25zdCBFeHBlbnNlU2hlZXRIZWFkZXJGb3JtID0gKHtcbiAgaXNDcmVhdGVNb2RlLFxuICBpc0VkaXRpbmcsXG4gIGNhbkVkaXRIZWFkZXJGaWVsZHMsXG4gIGNhbkVkaXRTdGF0dXMsXG4gIGhlYWRlcixcbiAgcHJvamVjdFZhbHVlLFxuICB2b3VjaGVyVmFsdWUsXG4gIGlzU2hlZXRQYWlkLFxuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxuICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcbiAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxuICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQsXG4gIHNob3dFeGNoYW5nZVJhdGUsXG4gIGV4Y2hhbmdlUmF0ZVZhbHVlLFxuICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSxcbiAgdG90YWxBbW91bnRUZXh0LFxuICBkcmFmdERlc2NyaXB0aW9uLFxuICBkcmFmdFByb2plY3RJZCxcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlLFxuICBkcmFmdEV4cGVuc2VTaGVldFN0YXR1cyxcbiAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSxcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLFxuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSxcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlLFxuICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlLFxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlLFxuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlLFxuICBvbkRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzQ2hhbmdlLFxuICBvbkRyYWZ0RXN0YWRvQ29tZW50YXJpb3NDaGFuZ2UsXG59OiBFeHBlbnNlU2hlZXRIZWFkZXJGb3JtUHJvcHMpID0+IHtcbiAgY29uc3QgaXNGb3JlaWduQ3VycmVuY3kgPVxuICAgIGlzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzICYmIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5ICE9PSBcIlwiICYmIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5ICE9PSBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k7XG4gIGNvbnN0IGV4cGVuc2VDdXJyZW5jeUxhYmVsID0gaXNGb3JlaWduQ3VycmVuY3lcbiAgICA/IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0V4cGVuc2VDdXJyZW5jeVwiLCBcIkV4cGVuc2UgY3VycmVuY3lcIilcbiAgICA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIik7XG4gIGNvbnN0IHN0YXR1c1ZhbHVlID1cbiAgICBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzID09PSBudWxsIHx8IGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgPT09IHVuZGVmaW5lZFxuICAgICAgPyBcIi1cIlxuICAgICAgOiBnZXRFeHBlbnNlU3RhdHVzTGFiZWwoaGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyk7XG4gIGNvbnN0IGhlYWRlckN1cnJlbmN5Q29kZSA9IHNhZmVUZXh0KGhlYWRlci5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IGJhc2VDdXJyZW5jeUNvZGUgPSBzYWZlVGV4dChleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IHN0YXR1c09wdGlvbnMgPSBSZWFjdC51c2VNZW1vKCgpID0+IGdldEV4cGVuc2VTaGVldFN0YXR1c09wdGlvbnMoKSwgW10pO1xuICBjb25zdCBzdGF0dXNEcmFmdFZhbHVlID0gU3RyaW5nKE51bWJlci5pc0ludGVnZXIoZHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMpID8gZHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMgOiAwKTtcbiAgY29uc3Qgc3RhdHVzQ29tbWVudFZhbHVlID0gc2FmZVRleHQoaGVhZGVyLmVzdGFkb0NvbWVudGFyaW9zKTtcbiAgY29uc3Qgc2hvd1N0YXR1c0NvbW1lbnRGaWVsZCA9ICFpc0NyZWF0ZU1vZGUgJiYgKChpc0VkaXRpbmcgJiYgY2FuRWRpdFN0YXR1cykgfHwgISFzdGF0dXNDb21tZW50VmFsdWUpO1xuICBjb25zdCBsb2NhbEN1cnJlbmN5T3B0aW9ucyA9IFJlYWN0LnVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPihcbiAgICAoKSA9PiBbXG4gICAgICB7XG4gICAgICAgIHZhbHVlOiBiYXNlQ3VycmVuY3lDb2RlLFxuICAgICAgICB0ZXh0OiBiYXNlQ3VycmVuY3lDb2RlLFxuICAgICAgICBpY29uOiA8RXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gY3VycmVuY3lDb2RlPXtiYXNlQ3VycmVuY3lDb2RlfSBzaXplQ2xhc3NOYW1lPVwiaC02IHctNlwiIC8+LFxuICAgICAgfSxcbiAgICBdLFxuICAgIFtiYXNlQ3VycmVuY3lDb2RlXVxuICApO1xuICBjb25zdCBoZWFkZXJDdXJyZW5jeU9wdGlvbnMgPSBSZWFjdC51c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oXG4gICAgKCkgPT4gW1xuICAgICAge1xuICAgICAgICB2YWx1ZTogaGVhZGVyQ3VycmVuY3lDb2RlIHx8IFwiLVwiLFxuICAgICAgICB0ZXh0OiBoZWFkZXJDdXJyZW5jeUNvZGUgfHwgXCItXCIsXG4gICAgICAgIGljb246IDxFeHBlbnNlQ3VycmVuY3lGbGFnSWNvbiBjdXJyZW5jeUNvZGU9e2hlYWRlckN1cnJlbmN5Q29kZSB8fCBcIi1cIn0gc2l6ZUNsYXNzTmFtZT1cImgtNiB3LTZcIiAvPixcbiAgICAgIH0sXG4gICAgXSxcbiAgICBbaGVhZGVyQ3VycmVuY3lDb2RlXVxuICApO1xuICBjb25zdCBwYXJzZWREcmFmdEV4Y2hhbmdlUmF0ZSA9IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dChkcmFmdEV4Y2hhbmdlUmF0ZSk7XG4gIGNvbnN0IHBhcnNlZE9mZmljaWFsUmF3UmF0ZSA9IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKTtcbiAgY29uc3QgYmFzZUV4Y2hhbmdlUmF0ZVZhbHVlID1cbiAgICBwYXJzZWREcmFmdEV4Y2hhbmdlUmF0ZSAhPSBudWxsXG4gICAgICA/IHBhcnNlZERyYWZ0RXhjaGFuZ2VSYXRlXG4gICAgICA6IHBhcnNlZE9mZmljaWFsUmF3UmF0ZSAhPSBudWxsXG4gICAgICAgID8gcGFyc2VkT2ZmaWNpYWxSYXdSYXRlICogZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50XG4gICAgICAgIDogbnVsbDtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlSW5mb1ZhbHVlID0gZm9ybWF0RXhwZW5zZU51bWJlcihcbiAgICBiYXNlRXhjaGFuZ2VSYXRlVmFsdWUgIT0gbnVsbCA/IGJhc2VFeGNoYW5nZVJhdGVWYWx1ZSAvIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudCA6IG51bGwsXG4gICAge1xuICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiA3LFxuICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiA3LFxuICAgICAgdXNlR3JvdXBpbmc6IGZhbHNlLFxuICAgICAgZmFsbGJhY2s6IFwiMC4wMDAwMDAwXCIsXG4gICAgfVxuICApO1xuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlVmFsdWUgPSBOdW1iZXIoaGVhZGVyLmV4Y2hhbmdlUmF0ZU1vZGUpID09PSAxID8gMSA6IDA7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZU1vZGVLZXkgPVxuICAgIGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSA9PT0gMVxuICAgICAgPyBcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0V4Y2hhbmdlUmF0ZU1vZGVfTWFudWFsXCJcbiAgICAgIDogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX09mZmljaWFsXCI7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZU1vZGVGYWxsYmFjayA9IGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSA9PT0gMSA/IFwiVC5DLiBNYW51YWxcIiA6IFwiVC5DLiBPZmljaWFsXCI7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCA9XG4gICAgKGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlTGFiZWwoZXhjaGFuZ2VSYXRlTW9kZVZhbHVlKSB8fCBpbmRUKGV4Y2hhbmdlUmF0ZU1vZGVLZXksIGV4Y2hhbmdlUmF0ZU1vZGVGYWxsYmFjaykpXG4gICAgICAucmVwbGFjZShFWENIQU5HRV9SQVRFX01PREVfUFJFRklYX1BBVFRFUk4sIFwiXCIpXG4gICAgICAudHJpbSgpXG4gICAgICAudG9Mb3dlckNhc2UoKSB8fCAoZXhjaGFuZ2VSYXRlTW9kZVZhbHVlID09PSAxID8gXCJtYW51YWxcIiA6IFwib2ZpY2lhbFwiKTtcbiAgY29uc3QgaGFzRW5kcG9pbnRFeGNoYW5nZVJhdGVEYXRhID1cbiAgICAhIXNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUpIHx8ICEhc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKSB8fCAhIXNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKTtcbiAgY29uc3QgZW5kcG9pbnRFeGNoYW5nZVJhdGVJbmZvRGF0ZSA9IHNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSkgfHwgaW5kVChcIkNvbW1vbl9Ob3RBdmFpbGFibGVcIiwgXCJOL0FcIik7XG4gIGNvbnN0IGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb1NvdXJjZSA9IHNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKVxuICAgIC5yZXBsYWNlKC9cXHMqXFwoW14oKV0qXFwpXFxzKi9nLCBcIiBcIilcbiAgICAucmVwbGFjZSgvXFxzezIsfS9nLCBcIiBcIilcbiAgICAudHJpbSgpIHx8IGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xuICBjb25zdCBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlID0gaW5kRm9ybWF0KFxuICAgIFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfSW5mb1BvcG92ZXJfRGV0YWlsXCIsXG4gICAgXCJUaXBvIGRlIGNhbWJpbyBvYnRlbmlkbyB7MH1cXG5GZWNoYTogezF9XFxuT3JpZ2VuOiB7Mn1cIixcbiAgICBzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKSB8fCBcIjAuMDAwMDAwMFwiLFxuICAgIGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb0RhdGUsXG4gICAgZW5kcG9pbnRFeGNoYW5nZVJhdGVJbmZvU291cmNlXG4gICk7XG4gIGNvbnN0IHN0b3JlZEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlID0gaW5kRm9ybWF0KFxuICAgIFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfSW5mb1BvcG92ZXJfU3RvcmVkXCIsXG4gICAgXCJUaXBvIGRlIGNhbWJpbyB7MH0gezF9XCIsXG4gICAgZXhjaGFuZ2VSYXRlTW9kZUxhYmVsLFxuICAgIGV4Y2hhbmdlUmF0ZUluZm9WYWx1ZVxuICApO1xuICBjb25zdCBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZSA9IGhhc0VuZHBvaW50RXhjaGFuZ2VSYXRlRGF0YSA/IGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UgOiBzdG9yZWRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZTtcblxuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInJlbGF0aXZlIHNoYWRvdy14cyBnbGFzcy1wYW5lbCBwLTQgc3BhY2UteS00IGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgeyFpc0NyZWF0ZU1vZGUgPyAoXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU2hlZXRJZFwiLCBcIkV4cGVuc2Ugc2hlZXQgY29kZVwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtzYWZlVGV4dChoZWFkZXIuaG9qYUdhc3Rvc0lkKSB8fCBcIi1cIn1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgeyFpc0NyZWF0ZU1vZGUgPyAoXG4gICAgICAgICAgaXNFZGl0aW5nICYmIGNhbkVkaXRTdGF0dXMgPyAoXG4gICAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1N0YXR1c1wiLCBcIlN0YXR1c1wiKX1cbiAgICAgICAgICAgICAgb3B0aW9ucz17c3RhdHVzT3B0aW9uc31cbiAgICAgICAgICAgICAgdmFsdWU9e3N0YXR1c0RyYWZ0VmFsdWV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFyc2VkID0gTnVtYmVyKG5leHRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKE51bWJlci5pc0ludGVnZXIocGFyc2VkKSAmJiBwYXJzZWQgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgb25EcmFmdEV4cGVuc2VTaGVldFN0YXR1c0NoYW5nZShwYXJzZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1N0YXR1c1wiLCBcIlN0YXR1c1wiKX1cbiAgICAgICAgICAgICAgZW1pdE9uVmFsdWVDaGFuZ2VcbiAgICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxuICAgICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLWhlYWRlci1zdGF0dXNcIlxuICAgICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TdGF0dXNcIiwgXCJTdGF0dXNcIil9IHZhbHVlPXtzdGF0dXNWYWx1ZX0gLz5cbiAgICAgICAgICApXG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7c2hvd1N0YXR1c0NvbW1lbnRGaWVsZCA/IChcbiAgICAgICAgICBpc0VkaXRpbmcgJiYgY2FuRWRpdFN0YXR1cyA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWQ6Y29sLXNwYW4tMiBzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1N0YXR1c0NvbW1lbnRcIiwgXCJTdGF0dXMgY29tbWVudFwiKX08L2xhYmVsPlxuICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgcmVzaXplLW5vbmVcIlxuICAgICAgICAgICAgICAgIHJvd3M9ezN9XG4gICAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0RXN0YWRvQ29tZW50YXJpb3N9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdEVzdGFkb0NvbWVudGFyaW9zQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKX1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TdGF0dXNDb21tZW50XCIsIFwiU3RhdHVzIGNvbW1lbnRcIil9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TdGF0dXNDb21tZW50XCIsIFwiU3RhdHVzIGNvbW1lbnRcIil9XG4gICAgICAgICAgICAgIHZhbHVlPXtzdGF0dXNDb21tZW50VmFsdWUgfHwgXCItXCJ9XG4gICAgICAgICAgICAgIGZ1bGxXaWR0aFxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApXG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7aXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHMgPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbTpjb2wtc3Bhbi0yIHNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9PC9sYWJlbD5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnREZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKX1cbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtzYWZlVGV4dChoZWFkZXIuZGVzY3JpcHRpb24pIHx8IFwiLVwifVxuICAgICAgICAgICAgZnVsbFdpZHRoXG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge2lzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzID8gKFxuICAgICAgICAgIDxFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1Byb2plY3RfUGxhY2Vob2xkZXJcIiwgXCJQcm9qZWN0IGlkXCIpfVxuICAgICAgICAgICAgdmFsdWU9e2RyYWZ0UHJvamVjdElkfVxuICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRQcm9qZWN0SWRDaGFuZ2V9XG4gICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZyB8fCAhY2FuRWRpdEhlYWRlckZpZWxkc31cbiAgICAgICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nIHx8ICFjYW5FZGl0SGVhZGVyRmllbGRzfVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiBwcm9qZWN0VmFsdWUgPyAoXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Qcm9qZWN0XCIsIFwiUHJvamVjdFwiKX0gdmFsdWU9e3Byb2plY3RWYWx1ZX0gLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHshaXNFZGl0aW5nICYmIGlzU2hlZXRQYWlkID8gKFxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVm91Y2hlclwiLCBcIlZvdWNoZXJcIil9IHZhbHVlPXt2b3VjaGVyVmFsdWUgfHwgXCItXCJ9IC8+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7aXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHMgPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbTpjb2wtc3Bhbi0yIHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BncmlkIGdhcC00ICR7aXNGb3JlaWduQ3VycmVuY3kgPyBcImdyaWQtY29scy0yXCIgOiBcImdyaWQtY29scy0xXCJ9YC50cmltKCl9PlxuICAgICAgICAgICAgICB7aXNGb3JlaWduQ3VycmVuY3kgPyAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntleHBlbnNlQ3VycmVuY3lMYWJlbH08L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8RXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw9e2V4cGVuc2VDdXJyZW5jeUxhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lfUGxhY2Vob2xkZXJcIiwgXCJDdXJyZW5jeSBjb2RlXCIpfVxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdEN1cnJlbmN5Q29kZX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZyB8fCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cbiAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZyB8fCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cbiAgICAgICAgICAgICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtaGVhZGVyLWN1cnJlbmN5XCJcbiAgICAgICAgICAgICAgICAgICAgICBwcmVmZXJEZWZhdWx0Q3VycmVuY3lGcm9tQ29udGV4dFxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIHByLTggZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9FeGNoYW5nZVJhdGVcIiwgXCJFeGNoYW5nZSByYXRlXCIpfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxJbmZvUG9wb3Zlckljb25CdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9JbmZvUG9wb3Zlcl9BcmlhXCIsIFwiU2hvdyBleGNoYW5nZSByYXRlIGluZm9ybWF0aW9uXCIpfVxuICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ9e2V4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHJpZ2h0LTAgLXRvcC0xIHotMjBcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9ybS1jb250cm9sICR7ZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UgPyBcImJvcmRlci1kYW5nZXIgcmluZy0xIHJpbmctZGFuZ2VyXCIgOiBcIlwifSAke2lzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwifWB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dE1vZGU9XCJkZWNpbWFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdEV4Y2hhbmdlUmF0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25CbHVyPXsoZXZlbnQpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKGV2ZW50LnRhcmdldC52YWx1ZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiA3LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiA3LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxsYmFjazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9FeGNoYW5nZVJhdGVcIiwgXCJFeGNoYW5nZSByYXRlXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0V4Y2hhbmdlUmF0ZVwiLCBcIkV4Y2hhbmdlIHJhdGVcIil9XG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17aXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lc31cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDxFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RcbiAgICAgICAgICAgICAgICAgIGxhYmVsPXtleHBlbnNlQ3VycmVuY3lMYWJlbH1cbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lfUGxhY2Vob2xkZXJcIiwgXCJDdXJyZW5jeSBjb2RlXCIpfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0Q3VycmVuY3lDb2RlfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZyB8fCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cbiAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nIHx8IGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzfVxuICAgICAgICAgICAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS1oZWFkZXItY3VycmVuY3lcIlxuICAgICAgICAgICAgICAgICAgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHRcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHtpc0ZvcmVpZ25DdXJyZW5jeSA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC00XCI+XG4gICAgICAgICAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfTG9jYWxDdXJyZW5jeVwiLCBcIkxvY2FsIGN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgICAgICAgb3B0aW9ucz17bG9jYWxDdXJyZW5jeU9wdGlvbnN9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17YmFzZUN1cnJlbmN5Q29kZX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiB1bmRlZmluZWR9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5X1BsYWNlaG9sZGVyXCIsIFwiQ3VycmVuY3kgY29kZVwiKX1cbiAgICAgICAgICAgICAgICAgIHJlYWRPbmx5XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZFxuICAgICAgICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICBzaG93TGFiZWxcbiAgICAgICAgICAgICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICBzZWxlY3RlZFRleHRNb2RlPVwidmFsdWVcIlxuICAgICAgICAgICAgICAgICAgZHJvcGRvd25NYXhIZWlnaHRDbGFzcz1cIm1heC1oLTk2XCJcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSWNvbkNsYXNzTmFtZT1cImgtNiB3LTZcIlxuICAgICAgICAgICAgICAgICAgb3B0aW9uSWNvbkNsYXNzTmFtZT1cImgtNiB3LTZcIlxuICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJbnB1dFBhZGRpbmdDbGFzc05hbWU9XCJwbC0xMlwiXG4gICAgICAgICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLWhlYWRlci1sb2NhbC1jdXJyZW5jeVwiXG4gICAgICAgICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9BbW91bnRcIiwgXCJBbW91bnRcIil9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgaW5kLXJlYWRvbmx5LWZpZWxkXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1hdEV4cGVuc2VOdW1iZXIoZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiA3LFxuICAgICAgICAgICAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogNyxcbiAgICAgICAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBmYWxsYmFjazogXCItXCIsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9BbW91bnRcIiwgXCJBbW91bnRcIil9XG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgICAgICB7aXNGb3JlaWduQ3VycmVuY3kgJiYgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlciB0ZXh0LXNtXCI+e2V4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlfTwvcD4gOiBudWxsfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XG4gICAgICAgICAgICBvcHRpb25zPXtoZWFkZXJDdXJyZW5jeU9wdGlvbnN9XG4gICAgICAgICAgICB2YWx1ZT17aGVhZGVyQ3VycmVuY3lDb2RlIHx8IFwiLVwifVxuICAgICAgICAgICAgb25DaGFuZ2U9eygpID0+IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lfUGxhY2Vob2xkZXJcIiwgXCJDdXJyZW5jeSBjb2RlXCIpfVxuICAgICAgICAgICAgcmVhZE9ubHlcbiAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICAgICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cbiAgICAgICAgICAgIHNob3dMYWJlbFxuICAgICAgICAgICAgdXNlUG9ydGFsPXtmYWxzZX1cbiAgICAgICAgICAgIHNlbGVjdGVkVGV4dE1vZGU9XCJ2YWx1ZVwiXG4gICAgICAgICAgICBkcm9wZG93bk1heEhlaWdodENsYXNzPVwibWF4LWgtOTZcIlxuICAgICAgICAgICAgc2VsZWN0ZWRJY29uQ2xhc3NOYW1lPVwiaC02IHctNlwiXG4gICAgICAgICAgICBvcHRpb25JY29uQ2xhc3NOYW1lPVwiaC02IHctNlwiXG4gICAgICAgICAgICBzZWxlY3RlZElucHV0UGFkZGluZ0NsYXNzTmFtZT1cInBsLTEyXCJcbiAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtaGVhZGVyLWN1cnJlbmN5LXJlYWRvbmx5XCJcbiAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAgeyFpc0VkaXRpbmcgJiYgc2hvd0V4Y2hhbmdlUmF0ZSA/IChcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0V4Y2hhbmdlUmF0ZVwiLCBcIkV4Y2hhbmdlIHJhdGVcIil9IHZhbHVlPXtleGNoYW5nZVJhdGVWYWx1ZX0gLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHshaXNDcmVhdGVNb2RlID8gPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Ub3RhbEFtb3VudFwiLCBcIlRvdGFsIGFtb3VudFwiKX0gdmFsdWU9e3RvdGFsQW1vdW50VGV4dH0gLz4gOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTGF5b3V0RWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgeyB1c2VPdXRzaWRlQ2xpY2sgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlT3V0c2lkZUNsaWNrLnRzXCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcblxudHlwZSBJbmZvUG9wb3Zlckljb25CdXR0b25Qcm9wcyA9IHtcbiAgY29udGVudDogUmVhY3QuUmVhY3ROb2RlO1xuICBhcmlhTGFiZWw6IHN0cmluZztcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcbn07XG5cbi8vIFNoYXJlZCBkdW1iIHBvcG92ZXIgdHJpZ2dlciB1c2VkIHRvIGRpc3BsYXkgc2hvcnQgY29udGV4dHVhbCBpbmZvLlxuY29uc3QgSW5mb1BvcG92ZXJJY29uQnV0dG9uID0gKHtcbiAgY29udGVudCxcbiAgYXJpYUxhYmVsLFxuICBjbGFzc05hbWUgPSBcIlwiLFxuICBwYW5lbENsYXNzTmFtZSA9IFwiXCIsXG59OiBJbmZvUG9wb3Zlckljb25CdXR0b25Qcm9wcykgPT4ge1xuICBjb25zdCBIT1JJWk9OVEFMX1ZJRVdQT1JUX0dVVFRFUl9QWCA9IDg7XG4gIGNvbnN0IFZFUlRJQ0FMX1ZJRVdQT1JUX0dVVFRFUl9QWCA9IDg7XG4gIGNvbnN0IFBBTkVMX1RSSUdHRVJfR0FQX1BYID0gNjtcbiAgY29uc3QgR0xPQkFMX1JBRElVUyA9IFwidmFyKC0tcmFkaXVzLXhsLCA1cHgpXCI7XG4gIGNvbnN0IFtpc09wZW4sIHNldElzT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwYW5lbFN0eWxlLCBzZXRQYW5lbFN0eWxlXSA9IHVzZVN0YXRlPFJlYWN0LkNTU1Byb3BlcnRpZXM+KHtcbiAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICAgIHRvcDogMCxcbiAgICBsZWZ0OiAwLFxuICAgIHZpc2liaWxpdHk6IFwiaGlkZGVuXCIsXG4gIH0pO1xuICBjb25zdCBidXR0b25SZWYgPSB1c2VSZWY8SFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcGFuZWxSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICB1c2VPdXRzaWRlQ2xpY2soW2J1dHRvblJlZiwgcGFuZWxSZWZdLCAoKSA9PiBzZXRJc09wZW4oZmFsc2UpKTtcbiAgY29uc3QgdXBkYXRlUGFuZWxQb3NpdGlvbiA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSBidXR0b25SZWYuY3VycmVudDtcbiAgICBjb25zdCBwYW5lbEVsZW1lbnQgPSBwYW5lbFJlZi5jdXJyZW50O1xuICAgIGlmICghYnV0dG9uRWxlbWVudCB8fCAhcGFuZWxFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYnV0dG9uUmVjdCA9IGJ1dHRvbkVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgcGFuZWxSZWN0ID0gcGFuZWxFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHZpZXdwb3J0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBjb25zdCB2aWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBjb25zdCBzYWZlV2lkdGggPSBNYXRoLm1pbihwYW5lbFJlY3Qud2lkdGgsIE1hdGgubWF4KDE4MCwgdmlld3BvcnRXaWR0aCAtIEhPUklaT05UQUxfVklFV1BPUlRfR1VUVEVSX1BYICogMikpO1xuXG4gICAgbGV0IGxlZnQgPSBidXR0b25SZWN0LmxlZnQgKyBidXR0b25SZWN0LndpZHRoIC8gMiAtIHNhZmVXaWR0aCAvIDI7XG4gICAgbGVmdCA9IE1hdGgubWF4KEhPUklaT05UQUxfVklFV1BPUlRfR1VUVEVSX1BYLCBNYXRoLm1pbihsZWZ0LCB2aWV3cG9ydFdpZHRoIC0gc2FmZVdpZHRoIC0gSE9SSVpPTlRBTF9WSUVXUE9SVF9HVVRURVJfUFgpKTtcblxuICAgIGxldCB0b3AgPSBidXR0b25SZWN0LmJvdHRvbSArIFBBTkVMX1RSSUdHRVJfR0FQX1BYO1xuICAgIGNvbnN0IGhhc0JvdHRvbU92ZXJmbG93ID0gdG9wICsgcGFuZWxSZWN0LmhlaWdodCArIFZFUlRJQ0FMX1ZJRVdQT1JUX0dVVFRFUl9QWCA+IHZpZXdwb3J0SGVpZ2h0O1xuICAgIGlmIChoYXNCb3R0b21PdmVyZmxvdykge1xuICAgICAgY29uc3QgdG9wQWJvdmVUcmlnZ2VyID0gYnV0dG9uUmVjdC50b3AgLSBwYW5lbFJlY3QuaGVpZ2h0IC0gUEFORUxfVFJJR0dFUl9HQVBfUFg7XG4gICAgICB0b3AgPSB0b3BBYm92ZVRyaWdnZXIgPj0gVkVSVElDQUxfVklFV1BPUlRfR1VUVEVSX1BYXG4gICAgICAgID8gdG9wQWJvdmVUcmlnZ2VyXG4gICAgICAgIDogTWF0aC5tYXgoVkVSVElDQUxfVklFV1BPUlRfR1VUVEVSX1BYLCB2aWV3cG9ydEhlaWdodCAtIHBhbmVsUmVjdC5oZWlnaHQgLSBWRVJUSUNBTF9WSUVXUE9SVF9HVVRURVJfUFgpO1xuICAgIH1cblxuICAgIHNldFBhbmVsU3R5bGUoe1xuICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgICAgIHRvcDogTWF0aC5yb3VuZCh0b3ApLFxuICAgICAgbGVmdDogTWF0aC5yb3VuZChsZWZ0KSxcbiAgICAgIHdpZHRoOiBNYXRoLnJvdW5kKHNhZmVXaWR0aCksXG4gICAgICB2aXNpYmlsaXR5OiBcInZpc2libGVcIixcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc09wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdXBkYXRlUGFuZWxQb3NpdGlvbigpO1xuICB9LCBbaXNPcGVuLCBjb250ZW50LCB1cGRhdGVQYW5lbFBvc2l0aW9uXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzT3Blbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBoYW5kbGVWaWV3cG9ydENoYW5nZSA9ICgpID0+IHVwZGF0ZVBhbmVsUG9zaXRpb24oKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBoYW5kbGVWaWV3cG9ydENoYW5nZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlVmlld3BvcnRDaGFuZ2UsIHRydWUpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBoYW5kbGVWaWV3cG9ydENoYW5nZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVWaWV3cG9ydENoYW5nZSwgdHJ1ZSk7XG4gICAgfTtcbiAgfSwgW2lzT3BlbiwgdXBkYXRlUGFuZWxQb3NpdGlvbl0pO1xuXG4gIGNvbnN0IHBvcnRhbFRhcmdldCA9IHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIiA/IG51bGwgOiBkb2N1bWVudC5ib2R5O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJpbmxpbmUtZmxleFwiLCBjbGFzc05hbWUpfT5cbiAgICAgIDxidXR0b25cbiAgICAgICAgcmVmPXtidXR0b25SZWZ9XG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWx9XG4gICAgICAgIGFyaWEtZXhwYW5kZWQ9e2lzT3Blbn1cbiAgICAgICAgYXJpYS1oYXNwb3B1cD1cImRpYWxvZ1wiXG4gICAgICAgIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGgtNiB3LTYgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItdHJhbnNwYXJlbnQgYmctdHJhbnNwYXJlbnQgcC0wIHRleHQtc2xhdGUtNTAwIHRyYW5zaXRpb24gaG92ZXI6dGV4dC1wcmltYXJ5IGZvY3VzOm91dGxpbmUtaGlkZGVuIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXByaW1hcnkvMzBcIlxuICAgICAgICBzdHlsZT17eyBib3JkZXJSYWRpdXM6IEdMT0JBTF9SQURJVVMgfX1cbiAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNPcGVuKChwcmV2aW91cykgPT4gIXByZXZpb3VzKX1cbiAgICAgID5cbiAgICAgICAgPHN2Z1xuICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgICAgIHdpZHRoPVwiMjBcIlxuICAgICAgICAgIGhlaWdodD1cIjIwXCJcbiAgICAgICAgICB2aWV3Qm94PVwiMyAzIDE4IDE4XCJcbiAgICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgc3Ryb2tlPVwiIzY0NzQ4YlwiXG4gICAgICAgICAgc3Ryb2tlV2lkdGg9XCIxLjc1XCJcbiAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxuICAgICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYmxvY2tcIlxuICAgICAgICA+XG4gICAgICAgICAgPHJlY3QgeD1cIjRcIiB5PVwiNFwiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIHJ4PVwiM1wiIHJ5PVwiM1wiIC8+XG4gICAgICAgICAgPHBhdGggZD1cIk0xMiA5aC4wMVwiIC8+XG4gICAgICAgICAgPHBhdGggZD1cIk0xMSAxMmgxdjRoMVwiIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgPC9idXR0b24+XG5cbiAgICAgIHtpc09wZW4gJiYgcG9ydGFsVGFyZ2V0XG4gICAgICAgID8gY3JlYXRlUG9ydGFsKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICByZWY9e3BhbmVsUmVmfVxuICAgICAgICAgICAgICByb2xlPVwiZGlhbG9nXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgLi4ucGFuZWxTdHlsZSwgYm9yZGVyUmFkaXVzOiBHTE9CQUxfUkFESVVTIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICBcInotMzYwMDAwIG1pbi13LVsyMjBweF0gbWF4LXctW2NhbGMoMTAwdnctMXJlbSldIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHAtMyBzaGFkb3ctbGdcIixcbiAgICAgICAgICAgICAgICBwYW5lbENsYXNzTmFtZVxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMnB4XSB0ZXh0LXNsYXRlLTcwMCB3aGl0ZXNwYWNlLXByZS1saW5lXCI+e2NvbnRlbnR9PC9wPlxuICAgICAgICAgICAgPC9kaXY+LFxuICAgICAgICAgICAgcG9ydGFsVGFyZ2V0XG4gICAgICAgICAgKVxuICAgICAgICA6IG51bGx9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbmZvUG9wb3Zlckljb25CdXR0b247XG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuXG50eXBlIEV4Y2hhbmdlUmF0ZU1vZGVVaU1ldGEgPSB7XG4gIGxhYmVsS2V5OiBzdHJpbmc7XG4gIGZhbGxiYWNrOiBzdHJpbmc7XG59O1xuXG5jb25zdCBFWENIQU5HRV9SQVRFX01PREVfTUVUQTogUmVjb3JkPEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ29kZSwgRXhjaGFuZ2VSYXRlTW9kZVVpTWV0YT4gPSB7XG4gIDA6IHtcbiAgICBsYWJlbEtleTogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX09mZmljaWFsXCIsXG4gICAgZmFsbGJhY2s6IFwiVC5DLiBPZmljaWFsXCIsXG4gIH0sXG4gIDE6IHtcbiAgICBsYWJlbEtleTogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX01hbnVhbFwiLFxuICAgIGZhbGxiYWNrOiBcIlQuQy4gTWFudWFsXCIsXG4gIH0sXG59O1xuY29uc3QgRVhDSEFOR0VfUkFURV9NT0RFX0NPREVTOiBFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNvZGVbXSA9IFswLCAxXTtcblxuLy8gS2VlcHMgZXhjaGFuZ2UgcmF0ZSBtb2RlIHZhbHVlcyBjb25zdHJhaW5lZCB0byBudW1lcmljIDAgb3IgMS5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ29kZSB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xuICBpZiAocGFyc2VkID09PSAwIHx8IHBhcnNlZCA9PT0gMSkge1xuICAgIHJldHVybiBwYXJzZWQ7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG4vLyBCdWlsZHMgZml4ZWQgb3B0aW9ucyBmb3IgdGhlIGV4Y2hhbmdlIHJhdGUgbW9kZSBmaWx0ZXIuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVPcHRpb25zID0gKCk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XG4gIHJldHVybiBFWENIQU5HRV9SQVRFX01PREVfQ09ERVNcbiAgICAubWFwKChjb2RlKSA9PiB7XG4gICAgICBjb25zdCBtZXRhID0gRVhDSEFOR0VfUkFURV9NT0RFX01FVEFbY29kZV07XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogU3RyaW5nKGNvZGUpLFxuICAgICAgICB0ZXh0OiBpbmRUKG1ldGEubGFiZWxLZXksIG1ldGEuZmFsbGJhY2spLFxuICAgICAgfTtcbiAgICB9KTtcbn07XG5cbi8vIFJldHVybnMgYSBsb2NhbGl6ZWQgbW9kZSBsYWJlbCBvciBlbXB0eSB0ZXh0IGZvciBub24tc2VsZWN0ZWQgdmFsdWVzLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlTGFiZWwgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGUodmFsdWUpO1xuICBpZiAobm9ybWFsaXplZCA9PT0gbnVsbCkgcmV0dXJuIFwiXCI7XG4gIGNvbnN0IG1ldGEgPSBFWENIQU5HRV9SQVRFX01PREVfTUVUQVtub3JtYWxpemVkXTtcbiAgcmV0dXJuIGluZFQobWV0YS5sYWJlbEtleSwgbWV0YS5mYWxsYmFjayk7XG59O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBDb21wYWN0UGFnaW5hdGlvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbXBhY3RQYWdpbmF0aW9uLnRzeFwiO1xuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldExpbmUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzLCBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IEV4cGVuc2VTZWN0aW9uRGl2aWRlciBmcm9tIFwiLi9FeHBlbnNlU2VjdGlvbkRpdmlkZXIudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVRpbWVsaW5lQ2FyZCBmcm9tIFwiLi9FeHBlbnNlVGltZWxpbmVDYXJkLnRzeFwiO1xuXG50eXBlIFBhZ2luYXRpb25MYWJlbHMgPSB7XG4gIGZpcnN0OiBzdHJpbmc7XG4gIHByZXY6IHN0cmluZztcbiAgbmV4dDogc3RyaW5nO1xuICBsYXN0OiBzdHJpbmc7XG59O1xuXG50eXBlIEV4cGVuc2VMaW5lc1RpbWVsaW5lUHJvcHMgPSB7XG4gIHZpc2libGVMaW5lczogRXhwZW5zZVNoZWV0TGluZVtdO1xuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgdG90YWxMaW5lUGFnZXM6IG51bWJlcjtcbiAgbGluZVBhZ2U6IG51bWJlcjtcbiAgbGluZXNMYWJlbDogc3RyaW5nO1xuICBlbXB0eVRleHQ6IHN0cmluZztcbiAgcGFnaW5hdGlvbkxhYmVsczogUGFnaW5hdGlvbkxhYmVscztcbiAgY29udGFpbmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcbiAgb25MaW5lUGFnZUNoYW5nZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcbiAgb25PcGVuTGluZTogKGxpbmVSZWNJZDogc3RyaW5nKSA9PiB2b2lkO1xufTtcblxuLy8gRHVtYiB0aW1lbGluZSBmb3IgZXhwZW5zZSBzaGVldCBsaW5lcyB3aXRoIHN0YW5kYXJkIGNhcmQgYW5kIHBhZ2luYXRpb24gbGF5b3V0LlxuY29uc3QgRXhwZW5zZUxpbmVzVGltZWxpbmUgPSAoe1xuICB2aXNpYmxlTGluZXMsXG4gIGN1cnJlbmN5Q29kZSxcbiAgdG90YWxMaW5lUGFnZXMsXG4gIGxpbmVQYWdlLFxuICBsaW5lc0xhYmVsLFxuICBlbXB0eVRleHQsXG4gIHBhZ2luYXRpb25MYWJlbHMsXG4gIGNvbnRhaW5lclJlZixcbiAgb25MaW5lUGFnZUNoYW5nZSxcbiAgb25PcGVuTGluZSxcbn06IEV4cGVuc2VMaW5lc1RpbWVsaW5lUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzcGFjZS15LTBcIj5cbiAgICAgIDxFeHBlbnNlU2VjdGlvbkRpdmlkZXIgbGFiZWw9e2xpbmVzTGFiZWx9IGNsYXNzTmFtZT1cImV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyLS1zcGFjZWRcIiAvPlxuXG4gICAgICB7dmlzaWJsZUxpbmVzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3ggdGltZWxpbmUtZW1wdHlcIiBkYXRhLWVtcHR5LXRleHQ9e2VtcHR5VGV4dH0gLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxkaXYgcmVmPXtjb250YWluZXJSZWZ9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveFwiPlxuICAgICAgICAgIHt2aXNpYmxlTGluZXMubWFwKChsaW5lLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGluZUlkID0gc2FmZVRleHQobGluZS5saW5lUmVjSWQpO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBzYWZlVGV4dChsaW5lLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGNvbnN0IGFtb3VudFRleHQgPSBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kobGluZS5hbW91bnQgPz8gbnVsbCwgY3VycmVuY3lDb2RlKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVQYXJ0cyA9IGZvcm1hdEV4cGVuc2VEYXRlUGFydHMoc2FmZVRleHQobGluZS50cmFuc0RhdGUpLCBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIik7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtgJHtsaW5lSWR9LSR7aW5kZXh9YH0gY2xhc3NOYW1lPVwidGltZWxpbmUtaXRlbVwiPlxuICAgICAgICAgICAgICAgIDxFeHBlbnNlVGltZWxpbmVDYXJkXG4gICAgICAgICAgICAgICAgICBkYXRlUGFydHM9e2RhdGVQYXJ0c31cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXtkZXNjcmlwdGlvbiB8fCBsaW5lSWQgfHwgXCItXCJ9XG4gICAgICAgICAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxuICAgICAgICAgICAgICAgICAgb25PcGVuPXsoKSA9PiBvbk9wZW5MaW5lKGxpbmVJZCl9XG4gICAgICAgICAgICAgICAgICB0aXRsZUNsYXNzTmFtZT1cInRpbWVsaW5lLW5hbWUgZXhwZW5zZS1saW5lLWNhcmRfX3RpdGxlXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgPENvbXBhY3RQYWdpbmF0aW9uXG4gICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsTGluZVBhZ2VzfVxuICAgICAgICBjdXJyZW50UGFnZT17bGluZVBhZ2V9XG4gICAgICAgIG9uUGFnZUNoYW5nZT17b25MaW5lUGFnZUNoYW5nZX1cbiAgICAgICAgbGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxuICAgICAgLz5cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlTGluZXNUaW1lbGluZTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0LCBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0IH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbiwgcGFyc2VEZWNpbWFsSW5wdXQgfSBmcm9tIFwiLi4vaG9va3MvZXhwZW5zZU11dGF0aW9uVXRpbHMudHNcIjtcbmltcG9ydCB7XG4gIGNyZWF0ZUV4cGVuc2VTaGVldCxcbiAgZGVsZXRlRXhwZW5zZVNoZWV0LFxuICB1cGRhdGVFeHBlbnNlU2hlZXRIZWFkZXIsXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zQXJncyA9IHtcbiAgYnVzeTogYm9vbGVhbjtcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XG4gIGlzTG9ja2VkOiBib29sZWFuO1xuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogYm9vbGVhbjtcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xuICBsb2NrZWRDdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgbG9ja2VkRXhjaGFuZ2VSYXRlOiBzdHJpbmc7XG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XG4gIGNhbkVkaXRFeHBlbnNlOiBib29sZWFuO1xuICBjYW5EZWxldGVFeHBlbnNlOiBib29sZWFuO1xuICBjYW5FZGl0U3RhdHVzOiBib29sZWFuO1xuICBzaGVldElkOiBzdHJpbmc7XG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgZHJhZnRFeGNoYW5nZVJhdGU6IHN0cmluZztcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZTogc3RyaW5nO1xuICBkcmFmdFByb2plY3RJZDogc3RyaW5nO1xuICBkcmFmdEV4cGVuc2VTaGVldFN0YXR1cz86IG51bWJlciB8IG51bGw7XG4gIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3M6IHN0cmluZztcbiAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5OiBzdHJpbmc7XG4gIGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXM/OiBudW1iZXIgfCBudWxsO1xuICBjdXJyZW50RXhjaGFuZ2VSYXRlTW9kZT86IG51bWJlciB8IG51bGw7XG4gIG9uQ3JlYXRlU3VjY2VzczogKGNyZWF0ZWRTaGVldElkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldElzRWRpdGluZzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xufTtcblxuY29uc3Qgbm9ybWFsaXplRXhjaGFuZ2VSYXRlID0gKHJhdzogc3RyaW5nKTogbnVtYmVyIHwgbnVsbCA9PiBwYXJzZURlY2ltYWxJbnB1dChyYXcpO1xuLy8gQ29tcGFyZXMgcmF0ZXMgd2l0aCB0b2xlcmFuY2UgdG8gYXZvaWQgZmxvYXRpbmcgcG9pbnQgbWlzbWF0Y2ggb24gcGF5bG9hZCBtb2RlLlxuY29uc3QgYXJlUmF0ZXNFcXVpdmFsZW50ID0gKGxlZnQ6IG51bWJlciB8IG51bGwsIHJpZ2h0OiBudW1iZXIgfCBudWxsKTogYm9vbGVhbiA9PiB7XG4gIGlmIChsZWZ0ID09IG51bGwgfHwgcmlnaHQgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gTWF0aC5hYnMobGVmdCAtIHJpZ2h0KSA8IDAuMDAwMDAwMTtcbn07XG5cbi8vIEVuY2Fwc3VsYXRlcyB1cGRhdGUgYW5kIGRlbGV0ZSBtdXRhdGlvbnMgZm9yIGV4cGVuc2Ugc2hlZXQgaGVhZGVyIGRldGFpbC5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMgPSAoe1xuICBidXN5LFxuICBpc0VkaXRpbmcsXG4gIGlzQ3JlYXRlTW9kZSxcbiAgaXNMb2NrZWQsXG4gIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXG4gIGxvY2tlZEN1cnJlbmN5Q29kZSxcbiAgbG9ja2VkRXhjaGFuZ2VSYXRlLFxuICBjYW5DcmVhdGVFeHBlbnNlLFxuICBjYW5FZGl0RXhwZW5zZSxcbiAgY2FuRGVsZXRlRXhwZW5zZSxcbiAgY2FuRWRpdFN0YXR1cyxcbiAgc2hlZXRJZCxcbiAgZHJhZnREZXNjcmlwdGlvbixcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlLFxuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLFxuICBkcmFmdFByb2plY3RJZCxcbiAgZHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXG4gIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgY3VycmVudEV4cGVuc2VTaGVldFN0YXR1cyxcbiAgY3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUsXG4gIG9uQ3JlYXRlU3VjY2VzcyxcbiAgc2V0TW9kYWxFcnJvcixcbiAgc2V0QnVzeSxcbiAgc2V0U3RhdHVzLFxuICBzZXRJc0VkaXRpbmcsXG59OiBVc2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnNBcmdzKSA9PiB7XG4gIGNvbnN0IGhhbmRsZVVwZGF0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoYnVzeSB8fCAhaXNFZGl0aW5nKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFpc0NyZWF0ZU1vZGUgJiYgaXNMb2NrZWQpIHJldHVybiBmYWxzZTtcblxuICAgIGNvbnN0IGNhblByb2NlZWQgPSBpc0NyZWF0ZU1vZGUgPyBjYW5DcmVhdGVFeHBlbnNlIDogY2FuRWRpdEV4cGVuc2U7XG4gICAgaWYgKCFjYW5Qcm9jZWVkKSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbmN5ID0gU3RyaW5nKFxuICAgICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMgPyAobG9ja2VkQ3VycmVuY3lDb2RlIHx8IGRyYWZ0Q3VycmVuY3lDb2RlIHx8IFwiXCIpIDogKGRyYWZ0Q3VycmVuY3lDb2RlIHx8IFwiXCIpXG4gICAgKVxuICAgICAgLnRyaW0oKVxuICAgICAgLnRvVXBwZXJDYXNlKCk7XG4gICAgY29uc3Qgbm9ybWFsaXplZERlc2NyaXB0aW9uID0gU3RyaW5nKGRyYWZ0RGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRQcm9qZWN0SWQgPSBTdHJpbmcoZHJhZnRQcm9qZWN0SWQgfHwgXCJcIikudHJpbSgpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRFc3RhZG9Db21lbnRhcmlvcyA9IGNhbkVkaXRTdGF0dXMgPyBTdHJpbmcoZHJhZnRFc3RhZG9Db21lbnRhcmlvcyB8fCBcIlwiKS50cmltKCkgOiBcIlwiO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRFeGNoYW5nZVJhdGVSYXcgPSBTdHJpbmcoXG4gICAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMgPyAobG9ja2VkRXhjaGFuZ2VSYXRlIHx8IGRyYWZ0RXhjaGFuZ2VSYXRlIHx8IFwiXCIpIDogKGRyYWZ0RXhjaGFuZ2VSYXRlIHx8IFwiXCIpXG4gICAgKTtcbiAgICBjb25zdCBub3JtYWxpemVkQmFzZUN1cnJlbmN5ID0gU3RyaW5nKGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSB8fCBcIkVVUlwiKS50cmltKCkudG9VcHBlckNhc2UoKSB8fCBcIkVVUlwiO1xuICAgIGNvbnN0IHJlcXVpcmVzRXhjaGFuZ2VSYXRlID0gbm9ybWFsaXplZEN1cnJlbmN5ICE9PSBcIlwiICYmIG5vcm1hbGl6ZWRDdXJyZW5jeSAhPT0gbm9ybWFsaXplZEJhc2VDdXJyZW5jeTtcbiAgICBjb25zdCBwYXJzZWRFeGNoYW5nZVJhdGUgPSBub3JtYWxpemVFeGNoYW5nZVJhdGUobm9ybWFsaXplZEV4Y2hhbmdlUmF0ZVJhdyk7XG4gICAgY29uc3Qgb2ZmaWNpYWxFeGNoYW5nZVJhdGUgPSBub3JtYWxpemVFeGNoYW5nZVJhdGUob2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSk7XG4gICAgY29uc3Qgb3JpZ2luYWxFeGNoYW5nZVJhdGUgPSBub3JtYWxpemVFeGNoYW5nZVJhdGUobG9ja2VkRXhjaGFuZ2VSYXRlKTtcbiAgICBjb25zdCBwYXJzZWRDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA9IE51bWJlcihjdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSk7XG4gICAgY29uc3QgaGFzQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUgPSBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZEN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlKSAmJiBwYXJzZWRDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA+PSAwO1xuICAgIGNvbnN0IGhhc1ZhbGlkUmF0ZSA9IHBhcnNlZEV4Y2hhbmdlUmF0ZSAhPSBudWxsICYmIHBhcnNlZEV4Y2hhbmdlUmF0ZSA+IDA7XG4gICAgY29uc3QgcGFyc2VkRHJhZnRTdGF0dXMgPSBOdW1iZXIoZHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMpO1xuICAgIGNvbnN0IGhhc0RyYWZ0U3RhdHVzID0gTnVtYmVyLmlzSW50ZWdlcihwYXJzZWREcmFmdFN0YXR1cykgJiYgcGFyc2VkRHJhZnRTdGF0dXMgPj0gMDtcbiAgICBjb25zdCBoYXNNYW51YWxSYXRlRWRpdE9uVXBkYXRlID1cbiAgICAgICFpc0NyZWF0ZU1vZGUgJiZcbiAgICAgIGhhc1ZhbGlkUmF0ZSAmJlxuICAgICAgKG9yaWdpbmFsRXhjaGFuZ2VSYXRlID09IG51bGwgfHwgIWFyZVJhdGVzRXF1aXZhbGVudChwYXJzZWRFeGNoYW5nZVJhdGUsIG9yaWdpbmFsRXhjaGFuZ2VSYXRlKSk7XG4gICAgLy8gT25seSBzZW5kIGV4Y2hhbmdlUmF0ZU1vZGUgd2hlbiB0aGUgdXNlciBhY3R1YWxseSBjaGFuZ2VkIHRoZSByYXRlIG1hbnVhbGx5LlxuICAgIGNvbnN0IGlzTWFudWFsRXhjaGFuZ2VSYXRlID0gKCgpID0+IHtcbiAgICAgIGlmICghcmVxdWlyZXNFeGNoYW5nZVJhdGUgfHwgIWhhc1ZhbGlkUmF0ZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcykgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKCFpc0NyZWF0ZU1vZGUgJiYgIWhhc01hbnVhbFJhdGVFZGl0T25VcGRhdGUpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmIChvZmZpY2lhbEV4Y2hhbmdlUmF0ZSA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgICAgIHJldHVybiAhYXJlUmF0ZXNFcXVpdmFsZW50KHBhcnNlZEV4Y2hhbmdlUmF0ZSwgb2ZmaWNpYWxFeGNoYW5nZVJhdGUpO1xuICAgIH0pKCk7XG4gICAgY29uc3QgcmVzb2x2ZWRFeGNoYW5nZVJhdGVNb2RlID0gaXNNYW51YWxFeGNoYW5nZVJhdGVcbiAgICAgID8gMVxuICAgICAgOiAobm9ybWFsaXplZEVzdGFkb0NvbWVudGFyaW9zID8gKGhhc0N1cnJlbnRFeGNoYW5nZVJhdGVNb2RlID8gcGFyc2VkQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUgOiAwKSA6IHVuZGVmaW5lZCk7XG4gICAgY29uc3QgcmVzb2x2ZWRFeHBlbnNlU2hlZXRTdGF0dXMgPSBoYXNEcmFmdFN0YXR1cyA/IHBhcnNlZERyYWZ0U3RhdHVzIDogKGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXMgPz8gdW5kZWZpbmVkKTtcblxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgIGlmICghbm9ybWFsaXplZERlc2NyaXB0aW9uKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25NZXNzYWdlID0gaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9EZXNjcmlwdGlvblJlcXVpcmVkXCIsIFwiRGVzY3JpcHRpb24gaXMgcmVxdWlyZWQuXCIpO1xuICAgICAgICBzZXRNb2RhbEVycm9yKHZhbGlkYXRpb25NZXNzYWdlKTtcbiAgICAgICAgc2V0U3RhdHVzKHZhbGlkYXRpb25NZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW5vcm1hbGl6ZWRDdXJyZW5jeSkge1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uTWVzc2FnZSA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fQ3VycmVuY3lSZXF1aXJlZFwiLCBcIkN1cnJlbmN5IGlzIHJlcXVpcmVkLlwiKTtcbiAgICAgICAgc2V0TW9kYWxFcnJvcih2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICAgIHNldFN0YXR1cyh2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVxdWlyZXNFeGNoYW5nZVJhdGUgJiYgIWhhc1ZhbGlkUmF0ZSkge1xuICAgICAgY29uc3QgdmFsaWRhdGlvbk1lc3NhZ2UgPSBpbmRUKFxuICAgICAgICBcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9FeGNoYW5nZVJhdGVSZXF1aXJlZFwiLFxuICAgICAgICBcIkV4Y2hhbmdlIHJhdGUgaXMgcmVxdWlyZWQgd2hlbiBjdXJyZW5jeSBpcyBkaWZmZXJlbnQgZnJvbSBiYXNlIGN1cnJlbmN5LlwiXG4gICAgICApO1xuICAgICAgc2V0TW9kYWxFcnJvcih2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICBzZXRTdGF0dXModmFsaWRhdGlvbk1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xuICAgICAgc3RhcnRTdGF0dXM6IGlzQ3JlYXRlTW9kZVxuICAgICAgICA/IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIilcbiAgICAgICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRpbmdcIiwgXCJVcGRhdGluZyBleHBlbnNlIHNoZWV0Li4uXCIpLFxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIiksXG4gICAgICBzZXRNb2RhbEVycm9yLFxuICAgICAgc2V0QnVzeSxcbiAgICAgIHNldFN0YXR1cyxcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICAgICAgY29uc3QgcGF5bG9hZDogRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCA9IHtcbiAgICAgICAgICAgIG1vZGU6IDEsXG4gICAgICAgICAgICBleGlzdGluZ0hvamFHYXN0b3NJZDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IG5vcm1hbGl6ZWREZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGN1cnJlbmN5Q29kZTogbm9ybWFsaXplZEN1cnJlbmN5LFxuICAgICAgICAgICAgZXhjaFJhdGU6IGhhc1ZhbGlkUmF0ZSA/IE51bWJlcihwYXJzZWRFeGNoYW5nZVJhdGUpIDogMSxcbiAgICAgICAgICAgIHByb2pJZDogbm9ybWFsaXplZFByb2plY3RJZCB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICBleHBlbnNlU2hlZXRTdGF0dXM6IDAsXG4gICAgICAgICAgICBleGNoYW5nZVJhdGVNb2RlOiByZXNvbHZlZEV4Y2hhbmdlUmF0ZU1vZGUsXG4gICAgICAgICAgICBsaW5lczogW10sXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY3JlYXRlRXhwZW5zZVNoZWV0KHBheWxvYWQpO1xuXG4gICAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIEFjY2VwdCBib3RoIGNhc2luZyB2YXJpYW50cyBmcm9tIGJhY2tlbmQgZW52ZWxvcGVzLlxuICAgICAgICAgIGNvbnN0IGNyZWF0ZWREYXRhID0gcmVzcG9uc2U/LkRhdGEgYXMgeyBIb2phR2FzdG9zSWQ/OiB1bmtub3duOyBob2phR2FzdG9zSWQ/OiB1bmtub3duIH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgICAgICAgIGNvbnN0IGNyZWF0ZWRTaGVldElkID0gU3RyaW5nKGNyZWF0ZWREYXRhPy5Ib2phR2FzdG9zSWQgPz8gY3JlYXRlZERhdGE/LmhvamFHYXN0b3NJZCA/PyBcIlwiKS50cmltKCk7XG4gICAgICAgICAgaWYgKCFjcmVhdGVkU2hlZXRJZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgb25DcmVhdGVTdWNjZXNzKGNyZWF0ZWRTaGVldElkKTtcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXlsb2FkOiBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0ID0ge1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoZHJhZnREZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCksXG4gICAgICAgICAgY3VycmVuY3lDb2RlOiBub3JtYWxpemVkQ3VycmVuY3ksXG4gICAgICAgICAgZXhjaFJhdGU6IGhhc1ZhbGlkUmF0ZSA/IE51bWJlcihwYXJzZWRFeGNoYW5nZVJhdGUpIDogMSxcbiAgICAgICAgICBwcm9qSWQ6IFN0cmluZyhkcmFmdFByb2plY3RJZCB8fCBcIlwiKS50cmltKCkgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgIGV4cGVuc2VTaGVldFN0YXR1czogcmVzb2x2ZWRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlTW9kZTogcmVzb2x2ZWRFeGNoYW5nZVJhdGVNb2RlLFxuICAgICAgICAgIGVzdGFkb0NvbWVudGFyaW9zOiBjYW5FZGl0U3RhdHVzID8gbm9ybWFsaXplZEVzdGFkb0NvbWVudGFyaW9zIDogdW5kZWZpbmVkLFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyKHNoZWV0SWQsIHBheWxvYWQpO1xuXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVGYWlsZWRcIiwgXCJVcGRhdGUgZmFpbGVkLlwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IHVwZGF0ZWRcIikpO1xuICAgICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xuICB9LCBbXG4gICAgYnVzeSxcbiAgICBjYW5DcmVhdGVFeHBlbnNlLFxuICAgIGNhbkVkaXRFeHBlbnNlLFxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgZHJhZnRFeGNoYW5nZVJhdGUsXG4gICAgZHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLFxuICAgIGRyYWZ0UHJvamVjdElkLFxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgICBjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzLFxuICAgIGN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlLFxuICAgIGNhbkVkaXRTdGF0dXMsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcbiAgICBpc0xvY2tlZCxcbiAgICBpc0VkaXRpbmcsXG4gICAgbG9ja2VkQ3VycmVuY3lDb2RlLFxuICAgIGxvY2tlZEV4Y2hhbmdlUmF0ZSxcbiAgICBvbkNyZWF0ZVN1Y2Nlc3MsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRJc0VkaXRpbmcsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBzZXRTdGF0dXMsXG4gICAgc2hlZXRJZCxcbiAgXSk7XG5cbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChidXN5KSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGlzTG9ja2VkKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFjYW5EZWxldGVFeHBlbnNlKSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XG4gICAgICBzdGFydFN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0aW5nXCIsIFwiRGVsZXRpbmcgZXhwZW5zZSBzaGVldC4uLlwiKSxcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRXJyb3JcIiwgXCJEZWxldGUgZXJyb3IuXCIpLFxuICAgICAgc2V0TW9kYWxFcnJvcixcbiAgICAgIHNldEJ1c3ksXG4gICAgICBzZXRTdGF0dXMsXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXQoc2hlZXRJZCk7XG5cbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlZFwiLCBcIkV4cGVuc2Ugc2hlZXQgZGVsZXRlZFwiKSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQub2s7XG4gIH0sIFtidXN5LCBjYW5EZWxldGVFeHBlbnNlLCBpc0xvY2tlZCwgc2V0QnVzeSwgc2V0TW9kYWxFcnJvciwgc2V0U3RhdHVzLCBzaGVldElkXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBoYW5kbGVVcGRhdGUsXG4gICAgaGFuZGxlRGVsZXRlLFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyB9IGZyb20gXCIuLi9ob29rcy91c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMudHNcIjtcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MgPSB7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XG4gIGlzTG9ja2VkOiBib29sZWFuO1xuICBjYW5FZGl0RXhwZW5zZTogYm9vbGVhbjtcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcbiAgY2FuRGVsZXRlRXhwZW5zZTogYm9vbGVhbjtcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGhhbmRsZUVuYWJsZUVkaXQ6ICgpID0+IHZvaWQ7XG4gIGhhbmRsZUNhbmNlbEVkaXQ6ICgpID0+IHZvaWQ7XG4gIGhhbmRsZVVwZGF0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcbiAgaGFuZGxlRGVsZXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuICBvblNhdmVTdWNjZXNzOiAoKSA9PiB2b2lkO1xuICBvcGVuQ29uZmlybTogKG9wdHM6IHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBjb25maXJtVGV4dD86IHN0cmluZztcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xuICB9KSA9PiB2b2lkO1xuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBDb29yZGluYXRlcyB0b3BiYXIgaWNvbiBzdGF0ZSBhbmQgZGlzcGF0Y2ggYWN0aW9ucyBmb3IgZXhwZW5zZSBzaGVldCBkZXRhaWwuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9ucyA9ICh7XG4gIGJ1c3ksXG4gIG1vZGFsT3BlbixcbiAgaXNFZGl0aW5nLFxuICBpc0NyZWF0ZU1vZGUsXG4gIGlzTG9ja2VkLFxuICBjYW5FZGl0RXhwZW5zZSxcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcbiAgY2FuRGVsZXRlRXhwZW5zZSxcbiAgc2V0TW9kYWxFcnJvcixcbiAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgaGFuZGxlVXBkYXRlLFxuICBoYW5kbGVEZWxldGUsXG4gIG9uU2F2ZVN1Y2Nlc3MsXG4gIG9wZW5Db25maXJtLFxuICBjbG9zZUNvbmZpcm0sXG59OiBVc2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zQXJncykgPT4ge1xuICB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMoe1xuICAgIGlkczoge1xuICAgICAgZWRpdEljb25JZDogXCJleHBlbnNlRWRpdEljb25cIixcbiAgICAgIHNhdmVJY29uSWQ6IFwiZXhwZW5zZVNhdmVJY29uXCIsXG4gICAgICBkZWxldGVCdG5JZDogXCJleHBlbnNlRGVsZXRlQnRuXCIsXG4gICAgICBjYW5jZWxCdG5JZDogXCJleHBlbnNlQ2FuY2VsQnRuXCIsXG4gICAgfSxcbiAgICBldmVudHM6IHtcbiAgICAgIGVkaXRFdmVudDogXCJleHBlbnNlLWRldGFpbC1lZGl0XCIsXG4gICAgICBkZWxldGVFdmVudDogXCJleHBlbnNlLWRldGFpbC1kZWxldGVcIixcbiAgICAgIGNhbmNlbEV2ZW50OiBcImV4cGVuc2UtZGV0YWlsLWNhbmNlbC1lZGl0XCIsXG4gICAgfSxcbiAgICBidXN5LFxuICAgIG1vZGFsT3BlbixcbiAgICBpc0VkaXRpbmcsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIGlzTG9ja2VkLFxuICAgIGFsbG93Q3JlYXRlTW9kZUFjdGlvbnNXaGVuTG9ja2VkOiB0cnVlLFxuICAgIGNhbkNyZWF0ZTogY2FuQ3JlYXRlRXhwZW5zZSxcbiAgICBjYW5FZGl0OiBjYW5FZGl0RXhwZW5zZSxcbiAgICBjYW5EZWxldGU6IGNhbkRlbGV0ZUV4cGVuc2UsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlU2F2ZTogaGFuZGxlVXBkYXRlLFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgICBzYXZlQ29uZmlybVRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiwgXCJTYXZlIGNoYW5nZXNcIiksXG4gICAgc2F2ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIHNhdmUgY2hhbmdlcz9cIiksXG4gICAgc2F2ZUNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX1NhdmVcIiwgXCJTYXZlXCIpLFxuICAgIGRlbGV0ZUNvbmZpcm1UaXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZVNoZWV0X1RpdGxlXCIsIFwiRGVsZXRlIGV4cGVuc2Ugc2hlZXRcIiksXG4gICAgZGVsZXRlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVTaGVldF9Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgZXhwZW5zZSBzaGVldD9cIiksXG4gICAgZGVsZXRlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpLFxuICAgIG9uU2F2ZVN1Y2Nlc3MsXG4gICAgb25EZWxldGVTdWNjZXNzOiAoKSA9PiB7XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvRXhwZW5zZVNoZWV0c1wiKTtcbiAgICB9LFxuICAgIG9wZW5Db25maXJtLFxuICAgIGNsb3NlQ29uZmlybSxcbiAgfSk7XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUge1xuICBFeHBlbnNlU2hlZXRIZWFkZXIsXG4gIEV4cGVuc2VTaGVldExpbmUsXG59IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7XG4gIGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsLFxuICBnZXRFeGNoYW5nZVJhdGUsXG4gIGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUsXG4gIG1hcEV4cGVuc2VTaGVldEhlYWRlcixcbiAgbWFwRXhwZW5zZVNoZWV0TGluZSxcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7XG4gIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCxcbiAgbmF2aWdhdGVUb0V4cGVuc2VVcmwsXG4gIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhjaGFuZ2VSYXRlRW50cnlNb2RlQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBoYXNBc3NpZ25lZFZvdWNoZXIsIHBhcnNlRXhwZW5zZURhdGUsIHNhZmVUZXh0LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlciwgcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcblxuY29uc3QgRVhDSEFOR0VfUkFURV9ERUJPVU5DRV9NUyA9IDQwMDtcbmNvbnN0IEVYQ0hBTkdFX1JBVEVfUkVGRVJFTkNFX0FNT1VOVCA9IDEwMDtcbmNvbnN0IEVYQ0hBTkdFX1JBVEVfREVDSU1BTF9ESUdJVFMgPSA3O1xuY29uc3QgRVhQRU5TRV9TVEFUVVNfQVBQUk9WRUQgPSAyO1xuY29uc3QgRVhQRU5TRV9TVEFUVVNfUEFJRCA9IDQ7XG5cbi8vIE5vcm1hbGl6ZXMgZXhjaGFuZ2UtcmF0ZSBudW1iZXJzIGZvciBudW1lcmljIGlucHV0IGNvbnRyb2xzLlxuY29uc3QgZm9ybWF0RXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZSA9ICh2YWx1ZTogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcih2YWx1ZSwge1xuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IEVYQ0hBTkdFX1JBVEVfREVDSU1BTF9ESUdJVFMsXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgZmFsbGJhY2s6IFwiXCIsXG4gIH0pO1xufTtcblxuY29uc3QgYnVpbGRDcmVhdGVIZWFkZXJEcmFmdCA9ICgpOiBFeHBlbnNlU2hlZXRIZWFkZXIgPT4ge1xuICByZXR1cm4ge1xuICAgIGhvamFHYXN0b3NJZDogXCJcIixcbiAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICBwcm9qSWQ6IFwiXCIsXG4gICAgdm91Y2hlcjogXCJcIixcbiAgICBjdXJyZW5jeUNvZGU6IFwiXCIsXG4gICAgdG90YWxBbW91bnQ6IG51bGwsXG4gICAgZXhwZW5zZVNoZWV0U3RhdHVzOiAwLFxuICAgIGV4Y2hhbmdlUmF0ZU1vZGU6IDAsXG4gICAgY3JlYXRlZERhdGU6IFwiXCIsXG4gICAgZXhjaFJhdGU6IFwiMVwiLFxuICB9O1xufTtcblxuY29uc3Qgc2hvdWxkU2hvd0V4Y2hhbmdlUmF0ZSA9ICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIGlmICghdmFsdWUpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KHZhbHVlKTtcbiAgaWYgKHBhcnNlZCA9PT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gIHJldHVybiBNYXRoLmFicyhwYXJzZWQpID4gMDtcbn07XG5cbnR5cGUgVXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGVBcmdzID0ge1xuICBoYXNBY2Nlc3M6IGJvb2xlYW47XG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XG4gIGNhbkVkaXRFeHBlbnNlOiBib29sZWFuO1xuICBjYW5FZGl0SGVhZGVyRmllbGRzOiBib29sZWFuO1xuICBzaGVldElkOiBzdHJpbmc7XG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBPd25zIHN0YXRlIGFuZCBiZWhhdmlvciBmb3IgZXhwZW5zZSBzaGVldCBkZXRhaWwgcGFnZSAocmVhZCwgZWRpdCwgY3JlYXRlKS5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZSA9ICh7XG4gIGhhc0FjY2VzcyxcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcbiAgY2FuRWRpdEV4cGVuc2UsXG4gIGNhbkVkaXRIZWFkZXJGaWVsZHMsXG4gIHNoZWV0SWQsXG4gIGlzQ3JlYXRlTW9kZSxcbiAgb25Gb3JiaWRkZW4sXG59OiBVc2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZUFyZ3MpID0+IHtcbiAgY29uc3QgW2hlYWRlciwgc2V0SGVhZGVyXSA9IHVzZVN0YXRlPEV4cGVuc2VTaGVldEhlYWRlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbGluZXMsIHNldExpbmVzXSA9IHVzZVN0YXRlPEV4cGVuc2VTaGVldExpbmVbXT4oW10pO1xuICBjb25zdCBbbGluZVBhZ2UsIHNldExpbmVQYWdlXSA9IHVzZVN0YXRlKDEpO1xuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbaXNFZGl0aW5nLCBzZXRJc0VkaXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbW9kYWxFcnJvciwgc2V0TW9kYWxFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0RGVzY3JpcHRpb24sIHNldERyYWZ0RGVzY3JpcHRpb25dID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdFByb2plY3RJZCwgc2V0RHJhZnRQcm9qZWN0SWRdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdEN1cnJlbmN5Q29kZSwgc2V0RHJhZnRDdXJyZW5jeUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdEV4Y2hhbmdlUmF0ZSwgc2V0RHJhZnRFeGNoYW5nZVJhdGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdEV4cGVuc2VTaGVldFN0YXR1cywgc2V0RHJhZnRFeHBlbnNlU2hlZXRTdGF0dXNdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtkcmFmdEVzdGFkb0NvbWVudGFyaW9zLCBzZXREcmFmdEVzdGFkb0NvbWVudGFyaW9zXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZGVmYXVsdEN1cnJlbmN5Q29kZSwgc2V0RGVmYXVsdEN1cnJlbmN5Q29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2lzRXhjaGFuZ2VSYXRlTG9hZGluZywgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2V4Y2hhbmdlUmF0ZU1lc3NhZ2UsIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtleGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvciwgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSwgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW29mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUsIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW29mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlLCBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZV0gPSB1c2VTdGF0ZShcIlwiKTtcblxuICBjb25zdCBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyID0gdXNlQ2FsbGJhY2soKG5leHRIZWFkZXI6IEV4cGVuc2VTaGVldEhlYWRlciB8IG51bGwpID0+IHtcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uKHNhZmVUZXh0KG5leHRIZWFkZXI/LmRlc2NyaXB0aW9uKSk7XG4gICAgc2V0RHJhZnRQcm9qZWN0SWQoc2FmZVRleHQobmV4dEhlYWRlcj8ucHJvaklkKSk7XG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUoc2FmZVRleHQobmV4dEhlYWRlcj8uY3VycmVuY3lDb2RlKSk7XG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUoXG4gICAgICBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIobmV4dEhlYWRlcj8uZXhjaFJhdGUsIHtcbiAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxuICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IEVYQ0hBTkdFX1JBVEVfREVDSU1BTF9ESUdJVFMsXG4gICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgICAgICBmYWxsYmFjazogXCJcIixcbiAgICAgIH0pXG4gICAgKTtcbiAgICBjb25zdCBuZXh0U3RhdHVzID0gTnVtYmVyKG5leHRIZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyk7XG4gICAgc2V0RHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMoTnVtYmVyLmlzSW50ZWdlcihuZXh0U3RhdHVzKSAmJiBuZXh0U3RhdHVzID49IDAgPyBuZXh0U3RhdHVzIDogMCk7XG4gICAgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvcyhzYWZlVGV4dChuZXh0SGVhZGVyPy5lc3RhZG9Db21lbnRhcmlvcykpO1xuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBsb2FkRGV0YWlsID0gYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKCFoYXNBY2Nlc3MpIHtcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSkge1xuICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZHJhZnRIZWFkZXIgPSBidWlsZENyZWF0ZUhlYWRlckRyYWZ0KCk7XG4gICAgICAgIHNldEhlYWRlcihkcmFmdEhlYWRlcik7XG4gICAgICAgIHNldExpbmVzKFtdKTtcbiAgICAgICAgc2V0TGluZVBhZ2UoMSk7XG4gICAgICAgIHNldElzRWRpdGluZyh0cnVlKTtcbiAgICAgICAgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlcihkcmFmdEhlYWRlcik7XG4gICAgICAgIHNldFN0YXR1cyhcIlwiKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghc2hlZXRJZCkge1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IHdhcyBub3QgZm91bmQuXCIpKTtcbiAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgICBzZXRMaW5lcyhbXSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsKHNoZWV0SWQsIHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZT8uTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0IGRldGFpbC5cIikpO1xuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgICBzZXRMaW5lcyhbXSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2hlZXRzID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRTaGVldCA9XG4gICAgICAgICAgc2hlZXRzLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeT8uSG9qYUdhc3Rvc0lkKS50b1VwcGVyQ2FzZSgpID09PSBzaGVldElkLnRyaW0oKS50b1VwcGVyQ2FzZSgpKSB8fCBzaGVldHNbMF07XG5cbiAgICAgICAgaWYgKCFzZWxlY3RlZFNoZWV0KSB7XG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCB3YXMgbm90IGZvdW5kLlwiKSk7XG4gICAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgICAgIHNldExpbmVzKFtdKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXh0SGVhZGVyID0gbWFwRXhwZW5zZVNoZWV0SGVhZGVyKHNlbGVjdGVkU2hlZXQpO1xuICAgICAgICBjb25zdCBuZXh0TGluZXMgPSAoQXJyYXkuaXNBcnJheShzZWxlY3RlZFNoZWV0LkxpbmVzKSA/IHNlbGVjdGVkU2hlZXQuTGluZXMgOiBbXSkubWFwKChlbnRyeSkgPT5cbiAgICAgICAgICBtYXBFeHBlbnNlU2hlZXRMaW5lKGVudHJ5KVxuICAgICAgICApO1xuICAgICAgICBzZXRIZWFkZXIobmV4dEhlYWRlcik7XG4gICAgICAgIHNldExpbmVzKG5leHRMaW5lcyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoXG4gICAgICAgICAgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0IGRldGFpbC5cIilcbiAgICAgICAgKTtcbiAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgICBzZXRMaW5lcyhbXSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2b2lkIGxvYWREZXRhaWwoKTtcbiAgfSwgW2NhbkNyZWF0ZUV4cGVuc2UsIGhhc0FjY2VzcywgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNDcmVhdGVNb2RlLCBvbkZvcmJpZGRlbiwgc2hlZXRJZF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFoZWFkZXIgfHwgaXNFZGl0aW5nKSByZXR1cm47XG4gICAgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlcihoZWFkZXIpO1xuICB9LCBbaGVhZGVyLCBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyLCBpc0VkaXRpbmddKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaGFzQWNjZXNzKSByZXR1cm47XG4gICAgbGV0IGlzQ2FuY2VsbGVkID0gZmFsc2U7XG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICAgIGNvbnN0IGxvYWREZWZhdWx0Q3VycmVuY3lDb2RlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY29kZSA9IGF3YWl0IGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUoe1xuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgc2V0RGVmYXVsdEN1cnJlbmN5Q29kZShzYWZlVGV4dChjb2RlKS50b1VwcGVyQ2FzZSgpKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSBcIkFib3J0RXJyb3JcIikgcmV0dXJuO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2b2lkIGxvYWREZWZhdWx0Q3VycmVuY3lDb2RlKCk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlzQ2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgIGNvbnRyb2xsZXIuYWJvcnQoKTtcbiAgICB9O1xuICB9LCBbaGFzQWNjZXNzXSk7XG5cbiAgY29uc3QgaGFzQWN0aXZlUHJvY2VzcyA9IHVzZU1lbW8oKCkgPT4gYnVzeSB8fCBpc0VkaXRpbmcsIFtidXN5LCBpc0VkaXRpbmddKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKGhhc0FjdGl2ZVByb2Nlc3MpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcbiAgICB9O1xuICB9LCBbaGFzQWN0aXZlUHJvY2Vzc10pO1xuXG4gIGNvbnN0IHByb2plY3RWYWx1ZSA9IHNhZmVUZXh0KGhlYWRlcj8ucHJvaklkKTtcbiAgY29uc3Qgdm91Y2hlclZhbHVlID0gc2FmZVRleHQoaGVhZGVyPy52b3VjaGVyKTtcbiAgY29uc3Qgc3RhdHVzQ29kZSA9IHR5cGVvZiBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgOiBudWxsO1xuICBjb25zdCBpc1NoZWV0QXBwcm92ZWQgPSBzdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19BUFBST1ZFRDtcbiAgY29uc3QgaXNTaGVldFBhaWRCeVN0YXR1cyA9IHN0YXR1c0NvZGUgPT09IEVYUEVOU0VfU1RBVFVTX1BBSUQ7XG4gIGNvbnN0IGlzU2hlZXRQYWlkQnlWb3VjaGVyID0gaGFzQXNzaWduZWRWb3VjaGVyKHZvdWNoZXJWYWx1ZSk7XG4gIGNvbnN0IGlzU2hlZXRQYWlkID0gaXNTaGVldFBhaWRCeVN0YXR1cyB8fCBpc1NoZWV0UGFpZEJ5Vm91Y2hlcjtcbiAgY29uc3QgaXNTaGVldExvY2tlZCA9IGlzU2hlZXRBcHByb3ZlZCB8fCBpc1NoZWV0UGFpZDtcbiAgY29uc3QgaGFzTGluZXMgPSBsaW5lcy5sZW5ndGggPiAwO1xuICBjb25zdCBleGNoYW5nZVJhdGVWYWx1ZSA9IGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcihzYWZlVGV4dChoZWFkZXI/LmV4Y2hSYXRlKSwge1xuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IEVYQ0hBTkdFX1JBVEVfREVDSU1BTF9ESUdJVFMsXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgZmFsbGJhY2s6IFwiXCIsXG4gIH0pO1xuICBjb25zdCBzaG93RXhjaGFuZ2VSYXRlID0gdXNlTWVtbygoKSA9PiBzaG91bGRTaG93RXhjaGFuZ2VSYXRlKGV4Y2hhbmdlUmF0ZVZhbHVlKSwgW2V4Y2hhbmdlUmF0ZVZhbHVlXSk7XG4gIGNvbnN0IG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5ID0gdXNlTWVtbygoKSA9PiBkcmFmdEN1cnJlbmN5Q29kZS50cmltKCkudG9VcHBlckNhc2UoKSwgW2RyYWZ0Q3VycmVuY3lDb2RlXSk7XG4gIGNvbnN0IG5vcm1hbGl6ZWREZWZhdWx0Q3VycmVuY3kgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KGRlZmF1bHRDdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCksIFtkZWZhdWx0Q3VycmVuY3lDb2RlXSk7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSA9IG5vcm1hbGl6ZWREZWZhdWx0Q3VycmVuY3kgfHwgXCJFVVJcIjtcbiAgY29uc3QgdWlMb2NhbGUgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gXCJlcy1FU1wiO1xuICAgIHJldHVybiBzYWZlVGV4dChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ/LmxhbmcpIHx8IFwiZXMtRVNcIjtcbiAgfSwgW10pO1xuICBjb25zdCBmb3JtRXhjaGFuZ2VEYXRlID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgcGFyc2VkRGF0ZSA9IHBhcnNlRXhwZW5zZURhdGUoc2FmZVRleHQoaGVhZGVyPy5jcmVhdGVkRGF0ZSkpO1xuICAgIGlmIChwYXJzZWREYXRlKSByZXR1cm4gdG9Jc29EYXRlKHBhcnNlZERhdGUpO1xuICAgIHJldHVybiB0b0lzb0RhdGUobmV3IERhdGUoKSk7XG4gIH0sIFtoZWFkZXI/LmNyZWF0ZWREYXRlXSk7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZVJlcXVpcmVkID1cbiAgICBpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkcyAmJiBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSAhPT0gXCJcIiAmJiBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSAhPT0gZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5O1xuICBjb25zdCBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSA9XG4gICAgZXhjaGFuZ2VSYXRlUmVxdWlyZWQgJiYgIWRyYWZ0RXhjaGFuZ2VSYXRlLnRyaW0oKVxuICAgICAgPyBpbmRUKFxuICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0V4Y2hhbmdlUmF0ZVJlcXVpcmVkXCIsXG4gICAgICAgICAgXCJFeGNoYW5nZSByYXRlIGlzIHJlcXVpcmVkIHdoZW4gY3VycmVuY3kgaXMgZGlmZmVyZW50IGZyb20gYmFzZSBjdXJyZW5jeS5cIlxuICAgICAgICApXG4gICAgICA6IFwiXCI7XG4gIC8vIEN1cnJlbmN5IHR5cGUgY2FuIGJlIGVkaXRlZCB3aGVuZXZlciB0aGUgc2hlZXQgaXRzZWxmIGlzIGVkaXRhYmxlIChub3QgYXBwcm92ZWQvcGFpZCkuXG4gIGNvbnN0IGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzID0gZmFsc2U7XG4gIGNvbnN0IGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyA9IGlzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzICYmIGhhc0xpbmVzICYmIHNob3dFeGNoYW5nZVJhdGU7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgaXNDYW5jZWxsZWQgPSBmYWxzZTtcbiAgICBsZXQgcmVxdWVzdFRpbWVyOiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IG51bGwgPSBudWxsO1xuICAgIGxldCByZXF1ZXN0QWJvcnRDb250cm9sbGVyOiBBYm9ydENvbnRyb2xsZXIgfCBudWxsID0gbnVsbDtcblxuICAgIGNvbnN0IGNsZWFyUmVxdWVzdEFydGlmYWN0cyA9ICgpID0+IHtcbiAgICAgIGlmIChyZXF1ZXN0VGltZXIpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHJlcXVlc3RUaW1lcik7XG4gICAgICAgIHJlcXVlc3RUaW1lciA9IG51bGw7XG4gICAgICB9XG4gICAgICBpZiAocmVxdWVzdEFib3J0Q29udHJvbGxlcikge1xuICAgICAgICByZXF1ZXN0QWJvcnRDb250cm9sbGVyLmFib3J0KCk7XG4gICAgICAgIHJlcXVlc3RBYm9ydENvbnRyb2xsZXIgPSBudWxsO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoIWlzRWRpdGluZyB8fCAhY2FuRWRpdEhlYWRlckZpZWxkcyB8fCBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMpIHtcbiAgICAgIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZyhmYWxzZSk7XG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFwiXCIpO1xuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNsZWFyUmVxdWVzdEFydGlmYWN0cygpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoIW5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5IHx8ICFleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3kpIHtcbiAgICAgIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZyhmYWxzZSk7XG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFwiXCIpO1xuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNsZWFyUmVxdWVzdEFydGlmYWN0cygpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAobm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgPT09IGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSkge1xuICAgICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUoXCIxXCIpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIjFcIik7XG4gICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcoZmFsc2UpO1xuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcIlwiKTtcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNsZWFyUmVxdWVzdEFydGlmYWN0cygpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXF1ZXN0VGltZXIgPSBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgIHJlcXVlc3RBYm9ydENvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFwiXCIpO1xuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRFeGNoYW5nZVJhdGUoXG4gICAgICAgICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxuICAgICAgICAgIGZvcm1FeGNoYW5nZURhdGUsXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgICBzaWduYWw6IHJlcXVlc3RBYm9ydENvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MgfHwgIXJlc3BvbnNlLkRhdGEgfHwgIU51bWJlci5pc0Zpbml0ZShOdW1iZXIocmVzcG9uc2UuRGF0YS5SYXRlKSkpIHtcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFxuICAgICAgICAgICAgc2FmZVRleHQocmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX1VuYXZhaWxhYmxlXCIsIFwiTm8gc2UgcHVkbyBvYnRlbmVyIGVsIHRpcG8gZGUgY2FtYmlvLlwiKVxuICAgICAgICAgICk7XG4gICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb2ZmaWNpYWxSYXRlUmF3ID0gTnVtYmVyKHJlc3BvbnNlLkRhdGEuUmF0ZSk7XG4gICAgICAgIGNvbnN0IG9mZmljaWFsUmF0ZUZvckFtb3VudDEwMCA9IG9mZmljaWFsUmF0ZVJhdyAqIEVYQ0hBTkdFX1JBVEVfUkVGRVJFTkNFX0FNT1VOVDtcbiAgICAgICAgY29uc3QgbmV4dEV4Y2hhbmdlUmF0ZVZhbHVlID0gZm9ybWF0RXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZShvZmZpY2lhbFJhdGVGb3JBbW91bnQxMDApO1xuICAgICAgICBjb25zdCBvZmZpY2lhbFJhdGVSYXdWYWx1ZSA9IGZvcm1hdEV4Y2hhbmdlUmF0ZUlucHV0VmFsdWUob2ZmaWNpYWxSYXRlUmF3KTtcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShuZXh0RXhjaGFuZ2VSYXRlVmFsdWUpO1xuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKG9mZmljaWFsUmF0ZVJhd1ZhbHVlKTtcbiAgICAgICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUobmV4dEV4Y2hhbmdlUmF0ZVZhbHVlKTtcblxuICAgICAgICBjb25zdCBlZmZlY3RpdmVSYXRlRGF0ZSA9IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGEuRGF0ZSkgfHwgZm9ybUV4Y2hhbmdlRGF0ZTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gc2FmZVRleHQocmVzcG9uc2UuRGF0YS5Tb3VyY2UpO1xuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoZWZmZWN0aXZlUmF0ZURhdGUpO1xuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShzb3VyY2UpO1xuICAgICAgICBjb25zdCBvZmZpY2lhbExhYmVsID0gZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCgwKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9PZmZpY2lhbFwiLCBcIlQuQy4gT2ZpY2lhbFwiKTtcbiAgICAgICAgY29uc3QgbG9jYWxpemVkUmF0ZURhdGUgPSBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoZWZmZWN0aXZlUmF0ZURhdGUsIHVpTG9jYWxlKSB8fCBlZmZlY3RpdmVSYXRlRGF0ZTtcbiAgICAgICAgY29uc3QgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UgPSBzb3VyY2UgPyBgJHtvZmZpY2lhbExhYmVsfSAke2xvY2FsaXplZFJhdGVEYXRlfSAoJHtzb3VyY2V9KWAgOiBgJHtvZmZpY2lhbExhYmVsfSAke2xvY2FsaXplZFJhdGVEYXRlfWA7XG4gICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2Uob2ZmaWNpYWxSYXRlUmF3VmFsdWUgPyBgJHtleGNoYW5nZVJhdGVJbmZvTWVzc2FnZX0gLSAke29mZmljaWFsUmF0ZVJhd1ZhbHVlfWAgOiBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZSk7XG4gICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHJldHVybjtcblxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xuICAgICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfTm90Rm91bmRcIiwgXCJObyBoYXkgdGlwbyBkZSBjYW1iaW8gcGFyYSBsYSBmZWNoYVwiKSk7XG4gICAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MjIgfHwgZXJyb3Iuc3RhdHVzID09PSA1MDApIHtcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XG4gICAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFxuICAgICAgICAgICAgICBzYWZlVGV4dChlcnJvci5tZXNzYWdlKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFxuICAgICAgICAgICAgc2FmZVRleHQoZXJyb3IubWVzc2FnZSkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX1VuYXZhaWxhYmxlXCIsIFwiTm8gc2UgcHVkbyBvYnRlbmVyIGVsIHRpcG8gZGUgY2FtYmlvLlwiKVxuICAgICAgICAgICk7XG4gICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcbiAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpKTtcbiAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoIWlzQ2FuY2VsbGVkKSB7XG4gICAgICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIEVYQ0hBTkdFX1JBVEVfREVCT1VOQ0VfTVMpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlzQ2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgIGNsZWFyUmVxdWVzdEFydGlmYWN0cygpO1xuICAgIH07XG4gIH0sIFtcbiAgICBjYW5FZGl0SGVhZGVyRmllbGRzLFxuICAgIGZvcm1FeGNoYW5nZURhdGUsXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxuICAgIGlzRWRpdGluZyxcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXG4gICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXG4gICAgdWlMb2NhbGUsXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXG4gIF0pO1xuXG4gIGNvbnN0IGhhbmRsZUVuYWJsZUVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGlzQ3JlYXRlTW9kZSB8fCBpc0xvYWRpbmcgfHwgIWhlYWRlciB8fCBpc1NoZWV0TG9ja2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFjYW5FZGl0RXhwZW5zZSkge1xuICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgIHNldElzRWRpdGluZyh0cnVlKTtcbiAgICBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyKGhlYWRlcik7XG4gICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9FZGl0aW5nRW5hYmxlZFwiLCBcIkVkaXRpbmcgZW5hYmxlZFwiKSk7XG4gIH0sIFtjYW5FZGl0RXhwZW5zZSwgaGVhZGVyLCBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyLCBpc0NyZWF0ZU1vZGUsIGlzTG9hZGluZywgaXNTaGVldExvY2tlZCwgb25Gb3JiaWRkZW5dKTtcblxuICBjb25zdCBoYW5kbGVDYW5jZWxFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXRzXCIsIHtcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiB0cnVlLFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFpc0VkaXRpbmcpIHJldHVybjtcblxuICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyKGhlYWRlcik7XG4gICAgc2V0U3RhdHVzKGluZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpKTtcbiAgfSwgW2hlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmddKTtcblxuICAvLyBPcGVucyBleHBlbnNlIHNoZWV0IGNyZWF0ZSBtb2RlIGZyb20gbGlzdC1sZXZlbCBlbnRyeSBwb2ludHMuXG4gIGNvbnN0IGhhbmRsZU9wZW5DcmVhdGVTaGVldE1vZGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFjYW5DcmVhdGVFeHBlbnNlKSB7XG4gICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP21vZGU9Y3JlYXRlXCIsIHtcbiAgICAgIGFza0NvbmZpcm1hdGlvbjogaXNFZGl0aW5nLFxuICAgIH0pO1xuICB9LCBbY2FuQ3JlYXRlRXhwZW5zZSwgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmcsIG9uRm9yYmlkZGVuXSk7XG5cbiAgLy8gT3BlbnMgZXhwZW5zZSBsaW5lIGNyZWF0ZSBtb2RlIGZyb20gYW4gZXhpc3RpbmcgZXhwZW5zZSBzaGVldCBkZXRhaWwuXG4gIGNvbnN0IGhhbmRsZU9wZW5DcmVhdGVMaW5lTW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWNhbkNyZWF0ZUV4cGVuc2UgfHwgIXNoZWV0SWQgfHwgaXNTaGVldExvY2tlZCkge1xuICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0TGluZURldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2hlZXRJZCl9Jm1vZGU9Y3JlYXRlYDtcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwsIHtcbiAgICAgIGFza0NvbmZpcm1hdGlvbjogaXNFZGl0aW5nLFxuICAgIH0pO1xuICB9LCBbY2FuQ3JlYXRlRXhwZW5zZSwgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmcsIGlzU2hlZXRMb2NrZWQsIG9uRm9yYmlkZGVuLCBzaGVldElkXSk7XG5cbiAgLy8gT3BlbnMgdGlja2V0cyBwYWdlIGZyb20gZXhwZW5zZSBzaGVldCBjb250ZXh0IHRvIGNyZWF0ZSBvciBsaW5rIHRpY2tldHMuXG4gIGNvbnN0IG9wZW5UaWNrZXRzRnJvbVNoZWV0ID0gdXNlQ2FsbGJhY2soXG4gICAgKGFjdGlvbjogXCJuZXdcIiB8IFwibGlua1wiKSA9PiB7XG4gICAgICBpZiAoIWNhbkNyZWF0ZUV4cGVuc2UgfHwgIXNoZWV0SWQgfHwgaXNTaGVldExvY2tlZCkge1xuICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xuICAgICAgICBhY3Rpb24sXG4gICAgICAgIGhvamFHYXN0b3NJZDogc2hlZXRJZCxcbiAgICAgIH0pO1xuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0cz8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xuICAgICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW2NhbkNyZWF0ZUV4cGVuc2UsIGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nLCBpc1NoZWV0TG9ja2VkLCBvbkZvcmJpZGRlbiwgc2hlZXRJZF1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVPcGVuQ3JlYXRlVGlja2V0TW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBvcGVuVGlja2V0c0Zyb21TaGVldChcIm5ld1wiKTtcbiAgfSwgW29wZW5UaWNrZXRzRnJvbVNoZWV0XSk7XG5cbiAgY29uc3QgaGFuZGxlT3BlbkxpbmtUaWNrZXRNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIG9wZW5UaWNrZXRzRnJvbVNoZWV0KFwibGlua1wiKTtcbiAgfSwgW29wZW5UaWNrZXRzRnJvbVNoZWV0XSk7XG5cbiAgY29uc3QgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldCA9IHVzZUNhbGxiYWNrKChjcmVhdGVkU2hlZXRJZDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3Qgc2FmZUNyZWF0ZWRTaGVldElkID0gc2FmZVRleHQoY3JlYXRlZFNoZWV0SWQpO1xuICAgIGlmICghc2FmZUNyZWF0ZWRTaGVldElkKSByZXR1cm47XG5cbiAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVDcmVhdGVkU2hlZXRJZCl9YDtcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgbmF2aWdhdGVUb0xpbmVEZXRhaWwgPSB1c2VDYWxsYmFjayhcbiAgICAobGluZVJlY0lkOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHNhZmVMaW5lSWQgPSBzYWZlVGV4dChsaW5lUmVjSWQpO1xuICAgICAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChzaGVldElkKTtcbiAgICAgIGlmICghc2FmZUxpbmVJZCB8fCAhc2FmZVNoZWV0SWQpIHJldHVybjtcblxuICAgICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0TGluZURldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZVNoZWV0SWQpfSZsaW5lUmVjSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZUxpbmVJZCl9YDtcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCwge1xuICAgICAgICBhc2tDb25maXJtYXRpb246IHRydWUsXG4gICAgICAgIGJ5cGFzc0d1YXJkT25jZTogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtzaGVldElkXVxuICApO1xuXG4gIHJldHVybiB7XG4gICAgaGVhZGVyLFxuICAgIGxpbmVzLFxuICAgIGxpbmVQYWdlLFxuICAgIGlzTG9hZGluZyxcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgYnVzeSxcbiAgICBzdGF0dXMsXG4gICAgaXNFZGl0aW5nLFxuICAgIG1vZGFsRXJyb3IsXG4gICAgZHJhZnREZXNjcmlwdGlvbixcbiAgICBkcmFmdFByb2plY3RJZCxcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgICBkcmFmdEV4cGVuc2VTaGVldFN0YXR1cyxcbiAgICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSxcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUsXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsXG4gICAgaXNFeGNoYW5nZVJhdGVMb2FkaW5nLFxuICAgIGV4Y2hhbmdlUmF0ZU1lc3NhZ2UsXG4gICAgZXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IsXG4gICAgcHJvamVjdFZhbHVlLFxuICAgIHZvdWNoZXJWYWx1ZSxcbiAgICBpc1NoZWV0UGFpZCxcbiAgICBpc1NoZWV0TG9ja2VkLFxuICAgIGV4Y2hhbmdlUmF0ZVZhbHVlLFxuICAgIHNob3dFeGNoYW5nZVJhdGUsXG4gICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxuICAgIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudDogRVhDSEFOR0VfUkFURV9SRUZFUkVOQ0VfQU1PVU5ULFxuICAgIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlLFxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcbiAgICBzZXRMaW5lUGFnZSxcbiAgICBzZXRMaW5lcyxcbiAgICBzZXRCdXN5LFxuICAgIHNldFN0YXR1cyxcbiAgICBzZXRJc0VkaXRpbmcsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxuICAgIHNldERyYWZ0UHJvamVjdElkLFxuICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlLFxuICAgIHNldERyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzLFxuICAgIHNldERyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxuICAgIGhhbmRsZU9wZW5DcmVhdGVTaGVldE1vZGUsXG4gICAgaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlLFxuICAgIGhhbmRsZU9wZW5DcmVhdGVUaWNrZXRNb2RlLFxuICAgIGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSxcbiAgICBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0LFxuICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsLFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHtcbiAgRXhwZW5zZUdhc3RvVHlwZUNvZGUsXG4gIEV4cGVuc2VTaGVldENyZWF0ZUxpbmVSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXREcmFmdFJlc3BvbnNlLFxuICBFeHBlbnNlU2hlZXRUaWNrZXRDcmVhdGVSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3QsXG59IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7XG4gIGFwcGx5RXhwZW5zZVNoZWV0VGlja2V0SWEsXG4gIGNyZWF0ZUV4cGVuc2VTaGVldCxcbiAgY3JlYXRlRXhwZW5zZVNoZWV0VGlja2V0LFxuICBleHRyYWN0RXhwZW5zZUZyb21UaWNrZXREcmFmdCxcbiAgdXBsb2FkRXhwZW5zZVNoZWV0VGlja2V0RmlsZSxcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5cbmNvbnN0IFRJQ0tFVF9JTUFHRV9DQUNIRV9OQU1FID0gXCJpbmQtZXhwZW5zZS10aWNrZXQtaW1hZ2UtdjFcIjtcbmNvbnN0IFRJQ0tFVF9JTUFHRV9DQUNIRV9QUkVGSVggPSBcIi9fX2luZF9jYWNoZV9fL3RpY2tldC1pbWFnZS9cIjtcbmNvbnN0IFRJQ0tFVF9UUkFDRV9TVE9SQUdFX0tFWSA9IFwiZXhwZW5zZV9zaGVldF90aWNrZXRfcXVpY2tfZmxvd190cmFjZV92MVwiO1xuY29uc3QgTUFYX1RJQ0tFVF9JTUFHRV9TSVpFX0JZVEVTID0gNTAgKiAxMDI0ICogMTAyNDtcbmNvbnN0IEFMTE9XRURfVElDS0VUX0dBU1RPX1RZUEVTID0gbmV3IFNldDxudW1iZXI+KFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxNF0pO1xuY29uc3QgREVGQVVMVF9USUNLRVRfR0FTVE9fVFlQRSA9IDg7XG5jb25zdCBERUZBVUxUX0NSRUFURV9NT0RFID0gXCJpYVwiIGFzIFwiaWFcIiB8IFwibWFudWFsXCI7XG5cbnR5cGUgVGlja2V0SW1hZ2VTb3VyY2UgPSBcImNhbWVyYVwiIHwgXCJnYWxsZXJ5XCI7XG5cbnR5cGUgVGlja2V0VHJhY2VFbnRyeSA9IHtcbiAgc3RlcDogc3RyaW5nO1xuICB0cmFjZUlkOiBzdHJpbmc7XG4gIGF0OiBzdHJpbmc7XG59O1xuXG50eXBlIE5vcm1hbGl6ZWREcmFmdExpbmUgPSB7XG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xuICB0eXBlVmFsdWU6IG51bWJlcjtcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgcXR5OiBudW1iZXI7XG4gIHByaWNlOiBudW1iZXI7XG4gIHRvdGFsQW1vdW50OiBudW1iZXI7XG59O1xuXG50eXBlIE5vcm1hbGl6ZWREcmFmdCA9IHtcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIHRvdGFsQW1vdW50OiBudW1iZXI7XG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xuICBjb21lbnRhcmlvOiBzdHJpbmc7XG4gIGdhc3RvVHlwZTogbnVtYmVyIHwgbnVsbDtcbiAgbGluZXM6IE5vcm1hbGl6ZWREcmFmdExpbmVbXTtcbn07XG5cbnR5cGUgUGVuZGluZ1VwbG9hZFJldHJ5ID0ge1xuICBmaWxlSWQ6IHN0cmluZztcbiAgZXh0ZW5zaW9uOiBzdHJpbmc7XG4gIGNhY2hlS2V5OiBzdHJpbmc7XG4gIGRyYWZ0OiBOb3JtYWxpemVkRHJhZnQ7XG4gIGZpbGVOYW1lSGludDogc3RyaW5nO1xufTtcblxudHlwZSBVcGxvYWRTeW5jUmVzdWx0ID0ge1xuICB1cmxGaWxlOiBzdHJpbmc7XG4gIGZpbGVOYW1lOiBzdHJpbmc7XG59O1xuXG50eXBlIFVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvd0FyZ3MgPSB7XG4gIHNoZWV0SWQ6IHN0cmluZztcbiAgcHJvamVjdElkOiBzdHJpbmc7XG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XG4gIGlzU2hlZXRMb2NrZWQ6IGJvb2xlYW47XG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xuICBvbkNvbXBsZXRlZD86ICgpID0+IHZvaWQ7XG59O1xuXG50eXBlIFF1aWNrRmxvd1Byb2dyZXNzS2V5ID1cbiAgfCBcInVwbG9hZGluZ0ltYWdlXCJcbiAgfCBcImNyZWF0aW5nVGlja2V0XCJcbiAgfCBcInN5bmNpbmdGaWxlXCJcbiAgfCBcImZpbmFsaXppbmdJYVwiXG4gIHwgXCJsaW5raW5nRXhwZW5zZUxpbmVcIlxuICB8IFwiZG9uZVwiO1xuXG5jb25zdCBhc1JlY29yZCA9ICh2YWx1ZTogdW5rbm93bik6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0+IHtcbiAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiB7fTtcbiAgcmV0dXJuIHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xufTtcblxuY29uc3QgZ2V0Rmlyc3REZWZpbmVkID0gKHJlY29yZDogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIGtleXM6IHN0cmluZ1tdKTogdW5rbm93biA9PiB7XG4gIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICBpZiAoa2V5IGluIHJlY29yZCkge1xuICAgICAgcmV0dXJuIHJlY29yZFtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufTtcblxuY29uc3QgdG9OdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgPyBwYXJzZWQgOiBudWxsO1xufTtcblxuY29uc3QgdG9Qb3NpdGl2ZU51bWJlciA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJzZWQgPSB0b051bWJlcih2YWx1ZSk7XG4gIHJldHVybiBwYXJzZWQgIT09IG51bGwgJiYgcGFyc2VkID4gMCA/IHBhcnNlZCA6IG51bGw7XG59O1xuXG5jb25zdCB0b1l5eXlNTWRkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcmF3ID0gc2FmZVRleHQodmFsdWUpO1xuICBpZiAoIXJhdykgcmV0dXJuIFwiXCI7XG5cbiAgY29uc3QgZGF0ZU9ubHkgPSByYXcuc3BsaXQoXCJUXCIpWzBdLnNwbGl0KFwiIFwiKVswXTtcbiAgaWYgKC9eXFxkezh9JC8udGVzdChkYXRlT25seSkpIHJldHVybiBkYXRlT25seTtcbiAgaWYgKC9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KGRhdGVPbmx5KSkge1xuICAgIHJldHVybiBkYXRlT25seS5yZXBsYWNlKC8tL2csIFwiXCIpO1xuICB9XG4gIGlmICgvXlxcZHs0fVxcL1xcZHsyfVxcL1xcZHsyfSQvLnRlc3QoZGF0ZU9ubHkpKSB7XG4gICAgcmV0dXJuIGRhdGVPbmx5LnJlcGxhY2UoL1xcLy9nLCBcIlwiKTtcbiAgfVxuICBjb25zdCBwYXJzZWQgPSBuZXcgRGF0ZShyYXcpO1xuICBpZiAoTnVtYmVyLmlzTmFOKHBhcnNlZC5nZXRUaW1lKCkpKSByZXR1cm4gXCJcIjtcbiAgY29uc3QgeWVhciA9IFN0cmluZyhwYXJzZWQuZ2V0RnVsbFllYXIoKSk7XG4gIGNvbnN0IG1vbnRoID0gU3RyaW5nKHBhcnNlZC5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICBjb25zdCBkYXkgPSBTdHJpbmcocGFyc2VkLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICByZXR1cm4gYCR7eWVhcn0ke21vbnRofSR7ZGF5fWA7XG59O1xuXG5jb25zdCBnZXRUb2RheVl5eXlNTWRkID0gKCk6IHN0cmluZyA9PiB7XG4gIHJldHVybiB0b1l5eXlNTWRkKG5ldyBEYXRlKCkpO1xufTtcblxuY29uc3Qgbm9ybWFsaXplR2FzdG9UeXBlID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHRvTnVtYmVyKHZhbHVlKTtcbiAgaWYgKHBhcnNlZCA9PT0gbnVsbCB8fCAhTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpIHx8ICFBTExPV0VEX1RJQ0tFVF9HQVNUT19UWVBFUy5oYXMocGFyc2VkKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBwYXJzZWQ7XG59O1xuXG5jb25zdCBpbmZlckV4dGVuc2lvbiA9IChmaWxlOiBGaWxlKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZnJvbU5hbWUgPSBzYWZlVGV4dChmaWxlLm5hbWUpLnNwbGl0KFwiLlwiKS5wb3AoKSB8fCBcIlwiO1xuICBjb25zdCBub3JtYWxpemVkRnJvbU5hbWUgPSBmcm9tTmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1teYS16MC05XS9nLCBcIlwiKTtcbiAgaWYgKG5vcm1hbGl6ZWRGcm9tTmFtZSkgcmV0dXJuIG5vcm1hbGl6ZWRGcm9tTmFtZTtcblxuICBjb25zdCB0eXBlID0gc2FmZVRleHQoZmlsZS50eXBlKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAodHlwZSA9PT0gXCJpbWFnZS9qcGVnXCIpIHJldHVybiBcImpwZ1wiO1xuICBpZiAodHlwZSA9PT0gXCJpbWFnZS9wbmdcIikgcmV0dXJuIFwicG5nXCI7XG4gIGlmICh0eXBlID09PSBcImltYWdlL3dlYnBcIikgcmV0dXJuIFwid2VicFwiO1xuICBpZiAodHlwZSA9PT0gXCJpbWFnZS9oZWljXCIpIHJldHVybiBcImhlaWNcIjtcbiAgaWYgKHR5cGUgPT09IFwiaW1hZ2UvaGVpZlwiKSByZXR1cm4gXCJoZWlmXCI7XG4gIHJldHVybiBcImpwZ1wiO1xufTtcblxuY29uc3QgcmVzb2x2ZVJhbmRvbUtleSA9ICgpOiBzdHJpbmcgPT4ge1xuICBpZiAodHlwZW9mIGNyeXB0byAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY3J5cHRvLnJhbmRvbVVVSUQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBjcnlwdG8ucmFuZG9tVVVJRCgpO1xuICB9XG4gIHJldHVybiBgJHtEYXRlLm5vdygpfS0ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKDIsIDEwKX1gO1xufTtcblxuY29uc3Qgc2FuaXRpemVGaWxlTmFtZSA9ICh2YWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgYmFzZSA9IHNhZmVUZXh0KHZhbHVlKS5yZXBsYWNlKC9bPD46XCIvXFxcXHw/KlxcdTAwMDAtXFx1MDAxRl0vZywgXCJfXCIpO1xuICByZXR1cm4gYmFzZSB8fCBcInRpY2tldC1pbWFnZVwiO1xufTtcblxuY29uc3QgZXh0cmFjdFRyYWNlSWRGcm9tRXJyb3IgPSAoZXJyb3I6IEFwaUZldGNoRXJyb3IpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBwYXlsb2FkID0gc2FmZVRleHQoZXJyb3IucmVzcG9uc2VCb2R5KTtcbiAgaWYgKCFwYXlsb2FkKSByZXR1cm4gXCJcIjtcbiAgdHJ5IHtcbiAgICBjb25zdCBqc29uID0gSlNPTi5wYXJzZShwYXlsb2FkKSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgICBjb25zdCB0cmFjZUlkID0gc2FmZVRleHQoanNvbi5UcmFjZUlkID8/IGpzb24udHJhY2VJZCk7XG4gICAgcmV0dXJuIHRyYWNlSWQ7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG59O1xuXG5jb25zdCBub3JtYWxpemVEcmFmdEZyb21JYVJlc3BvbnNlID0gKHJhd0RhdGE6IHVua25vd24pOiBOb3JtYWxpemVkRHJhZnQgPT4ge1xuICBjb25zdCBkYXRhID0gYXNSZWNvcmQocmF3RGF0YSk7XG4gIGNvbnN0IGRyYWZ0RGVzY3JpcHRpb24gPSBzYWZlVGV4dChnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiZGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiXSkpO1xuICBjb25zdCBkcmFmdEN1cnJlbmN5ID0gc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcImN1cnJlbmN5Q29kZVwiLCBcIkN1cnJlbmN5Q29kZVwiXSkpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IGRyYWZ0VG90YWxBbW91bnQgPSB0b1Bvc2l0aXZlTnVtYmVyKGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJ0b3RhbEFtb3VudFwiLCBcIlRvdGFsQW1vdW50XCJdKSkgfHwgMDtcbiAgY29uc3QgZHJhZnRUcmFuc0RhdGUgPSB0b1l5eXlNTWRkKGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJ0cmFuc0RhdGVcIiwgXCJUcmFuc0RhdGVcIl0pKSB8fCBnZXRUb2RheVl5eXlNTWRkKCk7XG4gIGNvbnN0IGRyYWZ0Q29tbWVudCA9IHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJjb21lbnRhcmlvXCIsIFwiQ29tZW50YXJpb1wiXSkpO1xuICBjb25zdCBkcmFmdEdhc3RvVHlwZSA9IG5vcm1hbGl6ZUdhc3RvVHlwZShnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiZ2FzdG9UeXBlXCIsIFwiR2FzdG9UeXBlXCJdKSk7XG5cbiAgY29uc3QgcmF3TGluZXMgPSBnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wibGluZXNcIiwgXCJMaW5lc1wiXSk7XG4gIGNvbnN0IGxpbmVBcnJheSA9IEFycmF5LmlzQXJyYXkocmF3TGluZXMpID8gcmF3TGluZXMgOiBbXTtcblxuICBjb25zdCBsaW5lczogTm9ybWFsaXplZERyYWZ0TGluZVtdID0gbGluZUFycmF5XG4gICAgLm1hcCgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGxpbmVSZWNvcmQgPSBhc1JlY29yZChlbnRyeSk7XG4gICAgICBjb25zdCBxdHkgPSB0b1Bvc2l0aXZlTnVtYmVyKGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJxdHlcIiwgXCJRdHlcIl0pKSB8fCAxO1xuICAgICAgY29uc3QgcHJpY2UgPSB0b1Bvc2l0aXZlTnVtYmVyKGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJwcmljZVwiLCBcIlByaWNlXCJdKSkgfHwgMDtcbiAgICAgIGNvbnN0IGV4cGxpY2l0VG90YWwgPSB0b1Bvc2l0aXZlTnVtYmVyKGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJ0b3RhbEFtb3VudFwiLCBcIlRvdGFsQW1vdW50XCJdKSkgfHwgMDtcbiAgICAgIGNvbnN0IGNvbXB1dGVkVG90YWwgPSBleHBsaWNpdFRvdGFsID4gMCA/IGV4cGxpY2l0VG90YWwgOiBxdHkgKiBwcmljZTtcbiAgICAgIGlmICghKGNvbXB1dGVkVG90YWwgPiAwKSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIGNvbnN0IGNhbmRpZGF0ZVR5cGVWYWx1ZSA9IHRvUG9zaXRpdmVOdW1iZXIoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcInR5cGVWYWx1ZVwiLCBcIlR5cGVWYWx1ZVwiXSkpO1xuICAgICAgY29uc3Qgc2FmZVR5cGVWYWx1ZSA9IE51bWJlci5pc0ludGVnZXIoY2FuZGlkYXRlVHlwZVZhbHVlKSA/IE51bWJlcihjYW5kaWRhdGVUeXBlVmFsdWUpIDogbnVsbDtcbiAgICAgIGNvbnN0IHR5cGVWYWx1ZSA9IHNhZmVUeXBlVmFsdWUgJiYgc2FmZVR5cGVWYWx1ZSA+IDAgPyBzYWZlVHlwZVZhbHVlIDogZHJhZnRHYXN0b1R5cGUgfHwgREVGQVVMVF9USUNLRVRfR0FTVE9fVFlQRTtcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcImRlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIl0pKSB8fCBkcmFmdERlc2NyaXB0aW9uO1xuICAgICAgY29uc3QgdHJhbnNEYXRlID0gdG9ZeXl5TU1kZChnZXRGaXJzdERlZmluZWQobGluZVJlY29yZCwgW1widHJhbnNEYXRlXCIsIFwiVHJhbnNEYXRlXCJdKSkgfHwgZHJhZnRUcmFuc0RhdGU7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRyYW5zRGF0ZSxcbiAgICAgICAgdHlwZVZhbHVlLFxuICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24gfHwgXCJUaWNrZXRcIixcbiAgICAgICAgcXR5LFxuICAgICAgICBwcmljZTogcHJpY2UgPiAwID8gcHJpY2UgOiBjb21wdXRlZFRvdGFsLFxuICAgICAgICB0b3RhbEFtb3VudDogY29tcHV0ZWRUb3RhbCxcbiAgICAgIH07XG4gICAgfSlcbiAgICAuZmlsdGVyKChlbnRyeSk6IGVudHJ5IGlzIE5vcm1hbGl6ZWREcmFmdExpbmUgPT4gZW50cnkgIT09IG51bGwpO1xuXG4gIHJldHVybiB7XG4gICAgZGVzY3JpcHRpb246IGRyYWZ0RGVzY3JpcHRpb24gfHwgXCJUaWNrZXRcIixcbiAgICBjdXJyZW5jeUNvZGU6IGRyYWZ0Q3VycmVuY3kgfHwgXCJFVVJcIixcbiAgICB0b3RhbEFtb3VudDogZHJhZnRUb3RhbEFtb3VudCA+IDAgPyBkcmFmdFRvdGFsQW1vdW50IDogbGluZXMucmVkdWNlKChzdW0sIGxpbmUpID0+IHN1bSArIGxpbmUudG90YWxBbW91bnQsIDApLFxuICAgIHRyYW5zRGF0ZTogZHJhZnRUcmFuc0RhdGUsXG4gICAgY29tZW50YXJpbzogZHJhZnRDb21tZW50LFxuICAgIGdhc3RvVHlwZTogZHJhZnRHYXN0b1R5cGUsXG4gICAgbGluZXMsXG4gIH07XG59O1xuXG5jb25zdCByZXNvbHZlVGlja2V0RmlsZUlkRnJvbURyYWZ0UmVzcG9uc2UgPSAocmF3RGF0YTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGRhdGEgPSBhc1JlY29yZChyYXdEYXRhKTtcbiAgY29uc3QgY3JlYXRpb25SYXcgPSBnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiVGlja2V0Q3JlYXRpb25cIiwgXCJ0aWNrZXRDcmVhdGlvblwiXSk7XG4gIGNvbnN0IGNyZWF0aW9uID0gYXNSZWNvcmQoY3JlYXRpb25SYXcpO1xuICByZXR1cm4gc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGNyZWF0aW9uLCBbXCJGaWxlSWRcIiwgXCJmaWxlSWRcIl0pKTtcbn07XG5cbmNvbnN0IHJlc29sdmVVcGxvYWRSZXN1bHQgPSAocmVzcG9uc2VEYXRhOiB1bmtub3duKTogVXBsb2FkU3luY1Jlc3VsdCA9PiB7XG4gIGNvbnN0IGRhdGEgPSBhc1JlY29yZChyZXNwb25zZURhdGEpO1xuICByZXR1cm4ge1xuICAgIHVybEZpbGU6IHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJVcmxGaWxlXCIsIFwidXJsRmlsZVwiXSkpLFxuICAgIGZpbGVOYW1lOiBzYWZlVGV4dChnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiRmlsZU5hbWVcIiwgXCJmaWxlTmFtZVwiXSkpLFxuICB9O1xufTtcblxuY29uc3QgYnVpbGRUaWNrZXRJYVBheWxvYWQgPSAoZHJhZnQ6IE5vcm1hbGl6ZWREcmFmdCwgdXBsb2FkOiBVcGxvYWRTeW5jUmVzdWx0KTogRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0ID0+IHtcbiAgY29uc3QgaWFMaW5lcyA9IGRyYWZ0LmxpbmVzLm1hcCgobGluZSkgPT4gKHtcbiAgICBkZXNjcmlwdGlvbjogbGluZS5kZXNjcmlwdGlvbixcbiAgICBxdHk6IGxpbmUucXR5LFxuICAgIHByaWNlOiBsaW5lLnByaWNlLFxuICAgIHRvdGFsQW1vdW50OiBsaW5lLnRvdGFsQW1vdW50LFxuICB9KSk7XG5cbiAgY29uc3QgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0ID0ge1xuICAgIGRlc2NyaXB0aW9uOiBkcmFmdC5kZXNjcmlwdGlvbixcbiAgICBjdXJyZW5jeUNvZGU6IGRyYWZ0LmN1cnJlbmN5Q29kZSxcbiAgICB0b3RhbEFtb3VudDogZHJhZnQudG90YWxBbW91bnQgPiAwID8gZHJhZnQudG90YWxBbW91bnQgOiB1bmRlZmluZWQsXG4gICAgdHJhbnNEYXRlOiBkcmFmdC50cmFuc0RhdGUsXG4gICAgY29tZW50YXJpbzogZHJhZnQuY29tZW50YXJpbyB8fCB1bmRlZmluZWQsXG4gICAgdXJsRmlsZTogdXBsb2FkLnVybEZpbGUgfHwgdW5kZWZpbmVkLFxuICAgIGZpbGVOYW1lOiB1cGxvYWQuZmlsZU5hbWUgfHwgdW5kZWZpbmVkLFxuICAgIGxpbmVzOiBpYUxpbmVzLFxuICB9O1xuXG4gIGlmIChkcmFmdC5nYXN0b1R5cGUgIT09IG51bGwpIHtcbiAgICBwYXlsb2FkLmdhc3RvVHlwZSA9IGRyYWZ0Lmdhc3RvVHlwZSBhcyBFeHBlbnNlR2FzdG9UeXBlQ29kZTtcbiAgfVxuXG4gIHJldHVybiBwYXlsb2FkO1xufTtcblxuY29uc3QgYnVpbGRTaGVldExpbmVQYXlsb2FkID0gKFxuICBkcmFmdDogTm9ybWFsaXplZERyYWZ0LFxuICBmaWxlSWQ6IHN0cmluZyxcbiAgcHJvamVjdElkOiBzdHJpbmdcbik6IEV4cGVuc2VTaGVldENyZWF0ZUxpbmVSZXF1ZXN0IHwgbnVsbCA9PiB7XG4gIGNvbnN0IGxpbmVGcm9tRHJhZnQgPSBkcmFmdC5saW5lc1swXTtcbiAgY29uc3QgZmFsbGJhY2tUb3RhbCA9IGxpbmVGcm9tRHJhZnQ/LnRvdGFsQW1vdW50IHx8IGRyYWZ0LnRvdGFsQW1vdW50O1xuICBpZiAoIShmYWxsYmFja1RvdGFsID4gMCkpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHR5cGVWYWx1ZUNhbmRpZGF0ZSA9IGxpbmVGcm9tRHJhZnQ/LnR5cGVWYWx1ZSB8fCBkcmFmdC5nYXN0b1R5cGUgfHwgREVGQVVMVF9USUNLRVRfR0FTVE9fVFlQRTtcbiAgY29uc3Qgc2FmZVR5cGVWYWx1ZSA9IE51bWJlcih0eXBlVmFsdWVDYW5kaWRhdGUpO1xuICBjb25zdCB0eXBlVmFsdWUgPSBOdW1iZXIuaXNJbnRlZ2VyKHNhZmVUeXBlVmFsdWUpICYmIHNhZmVUeXBlVmFsdWUgPiAwID8gc2FmZVR5cGVWYWx1ZSA6IERFRkFVTFRfVElDS0VUX0dBU1RPX1RZUEU7XG5cbiAgcmV0dXJuIHtcbiAgICB0cmFuc0RhdGU6IGxpbmVGcm9tRHJhZnQ/LnRyYW5zRGF0ZSB8fCBkcmFmdC50cmFuc0RhdGUgfHwgZ2V0VG9kYXlZeXl5TU1kZCgpLFxuICAgIHR5cGVWYWx1ZSxcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQobGluZUZyb21EcmFmdD8uZGVzY3JpcHRpb24gfHwgZHJhZnQuZGVzY3JpcHRpb24pIHx8IFwiVGlja2V0XCIsXG4gICAgaW50ZXJuYWNpb25hbDogZmFsc2UsXG4gICAgZmlsZUlkLFxuICAgIHRpY2tldDogdHJ1ZSxcbiAgICBxdHk6IDEsXG4gICAgcHJpY2U6IGZhbGxiYWNrVG90YWwsXG4gICAgcHJvaklkOiBzYWZlVGV4dChwcm9qZWN0SWQpIHx8IHVuZGVmaW5lZCxcbiAgfTtcbn07XG5cbmNvbnN0IHBlcnNpc3RUcmFjZUxpc3QgPSAodHJhY2VMaXN0OiBUaWNrZXRUcmFjZUVudHJ5W10pOiB2b2lkID0+IHtcbiAgdHJ5IHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFRJQ0tFVF9UUkFDRV9TVE9SQUdFX0tFWSwgSlNPTi5zdHJpbmdpZnkodHJhY2VMaXN0KSk7XG4gIH0gY2F0Y2gge1xuICAgIC8vIElnbm9yZSBzdG9yYWdlIGZhaWx1cmVzIGluIHJlc3RyaWN0ZWQgYnJvd3NlciBjb250ZXh0cy5cbiAgfVxufTtcblxuY29uc3QgY2FjaGVJbWFnZUZpbGUgPSBhc3luYyAoY2FjaGVLZXk6IHN0cmluZywgZmlsZTogRmlsZSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFwiY2FjaGVzXCIgaW4gd2luZG93KSkgcmV0dXJuO1xuICBjb25zdCBjYWNoZSA9IGF3YWl0IGNhY2hlcy5vcGVuKFRJQ0tFVF9JTUFHRV9DQUNIRV9OQU1FKTtcbiAgY29uc3QgcmVxdWVzdFVybCA9IGAke1RJQ0tFVF9JTUFHRV9DQUNIRV9QUkVGSVh9JHtlbmNvZGVVUklDb21wb25lbnQoY2FjaGVLZXkpfWA7XG4gIGF3YWl0IGNhY2hlLnB1dChcbiAgICBuZXcgUmVxdWVzdChyZXF1ZXN0VXJsKSxcbiAgICBuZXcgUmVzcG9uc2UoZmlsZSwge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBzYWZlVGV4dChmaWxlLnR5cGUpIHx8IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIsXG4gICAgICB9LFxuICAgIH0pXG4gICk7XG59O1xuXG5jb25zdCByZWFkQ2FjaGVkSW1hZ2VGaWxlID0gYXN5bmMgKGNhY2hlS2V5OiBzdHJpbmcpOiBQcm9taXNlPEJsb2IgfCBudWxsPiA9PiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiIHx8ICEoXCJjYWNoZXNcIiBpbiB3aW5kb3cpKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgY2FjaGUgPSBhd2FpdCBjYWNoZXMub3BlbihUSUNLRVRfSU1BR0VfQ0FDSEVfTkFNRSk7XG4gIGNvbnN0IHJlcXVlc3RVcmwgPSBgJHtUSUNLRVRfSU1BR0VfQ0FDSEVfUFJFRklYfSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNhY2hlS2V5KX1gO1xuICBjb25zdCBjYWNoZWRSZXNwb25zZSA9IGF3YWl0IGNhY2hlLm1hdGNoKHJlcXVlc3RVcmwpO1xuICBpZiAoIWNhY2hlZFJlc3BvbnNlKSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIGNhY2hlZFJlc3BvbnNlLmJsb2IoKTtcbn07XG5cbmNvbnN0IHJlbW92ZUNhY2hlZEltYWdlRmlsZSA9IGFzeW5jIChjYWNoZUtleTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiIHx8ICEoXCJjYWNoZXNcIiBpbiB3aW5kb3cpKSByZXR1cm47XG4gIGNvbnN0IGNhY2hlID0gYXdhaXQgY2FjaGVzLm9wZW4oVElDS0VUX0lNQUdFX0NBQ0hFX05BTUUpO1xuICBjb25zdCByZXF1ZXN0VXJsID0gYCR7VElDS0VUX0lNQUdFX0NBQ0hFX1BSRUZJWH0ke2VuY29kZVVSSUNvbXBvbmVudChjYWNoZUtleSl9YDtcbiAgYXdhaXQgY2FjaGUuZGVsZXRlKHJlcXVlc3RVcmwpO1xufTtcblxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0RmxvdyA9ICh7XG4gIHNoZWV0SWQsXG4gIHByb2plY3RJZCxcbiAgY3VycmVuY3lDb2RlLFxuICBjYW5DcmVhdGVFeHBlbnNlLFxuICBpc0NyZWF0ZU1vZGUsXG4gIGlzU2hlZXRMb2NrZWQsXG4gIG9uRm9yYmlkZGVuLFxuICBvbkNvbXBsZXRlZCxcbn06IFVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvd0FyZ3MpID0+IHtcbiAgY29uc3QgW3NvdXJjZVBpY2tlck9wZW4sIHNldFNvdXJjZVBpY2tlck9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwcm9ncmVzc0tleSwgc2V0UHJvZ3Jlc3NLZXldID0gdXNlU3RhdGU8UXVpY2tGbG93UHJvZ3Jlc3NLZXkgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbcGVuZGluZ1VwbG9hZFJldHJ5LCBzZXRQZW5kaW5nVXBsb2FkUmV0cnldID0gdXNlU3RhdGU8UGVuZGluZ1VwbG9hZFJldHJ5IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFt0cmFjZUxpc3QsIHNldFRyYWNlTGlzdF0gPSB1c2VTdGF0ZTxUaWNrZXRUcmFjZUVudHJ5W10+KFtdKTtcbiAgY29uc3QgbGF0ZXN0RmlsZVJlZiA9IHVzZVJlZjx7IGNhY2hlS2V5OiBzdHJpbmc7IGZpbGU6IEZpbGUgfSB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IHByb2dyZXNzTWVzc2FnZSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmIChwcm9ncmVzc0tleSA9PT0gXCJ1cGxvYWRpbmdJbWFnZVwiKSB7XG4gICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19VcGxvYWRpbmdJbWFnZVwiLCBcIlVwbG9hZGluZyBpbWFnZS4uLlwiKTtcbiAgICB9XG4gICAgaWYgKHByb2dyZXNzS2V5ID09PSBcImNyZWF0aW5nVGlja2V0XCIpIHtcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0NyZWF0aW5nVGlja2V0XCIsIFwiQ3JlYXRpbmcgdGlja2V0Li4uXCIpO1xuICAgIH1cbiAgICBpZiAocHJvZ3Jlc3NLZXkgPT09IFwic3luY2luZ0ZpbGVcIikge1xuICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfU3luY2luZ0ZpbGVcIiwgXCJTeW5jaW5nIGZpbGUuLi5cIik7XG4gICAgfVxuICAgIGlmIChwcm9ncmVzc0tleSA9PT0gXCJmaW5hbGl6aW5nSWFcIikge1xuICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfRmluYWxpemluZ1wiLCBcIkZpbmFsaXppbmcgSUEuLi5cIik7XG4gICAgfVxuICAgIGlmIChwcm9ncmVzc0tleSA9PT0gXCJsaW5raW5nRXhwZW5zZUxpbmVcIikge1xuICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfTGlua2luZ0xpbmVcIiwgXCJMaW5raW5nIGV4cGVuc2UgbGluZS4uLlwiKTtcbiAgICB9XG4gICAgaWYgKHByb2dyZXNzS2V5ID09PSBcImRvbmVcIikge1xuICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfRG9uZVwiLCBcIkRvbmVcIik7XG4gICAgfVxuICAgIHJldHVybiBcIlwiO1xuICB9LCBbcHJvZ3Jlc3NLZXldKTtcblxuICBjb25zdCBhZGRUcmFjZSA9IHVzZUNhbGxiYWNrKChzdGVwOiBzdHJpbmcsIHRyYWNlSWQ6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHNhZmVUcmFjZUlkID0gc2FmZVRleHQodHJhY2VJZCk7XG4gICAgaWYgKCFzYWZlVHJhY2VJZCkgcmV0dXJuO1xuXG4gICAgc2V0VHJhY2VMaXN0KChwcmV2aW91cykgPT4ge1xuICAgICAgY29uc3QgbmV4dCA9IFtcbiAgICAgICAgLi4ucHJldmlvdXMsXG4gICAgICAgIHtcbiAgICAgICAgICBzdGVwLFxuICAgICAgICAgIHRyYWNlSWQ6IHNhZmVUcmFjZUlkLFxuICAgICAgICAgIGF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgIH0sXG4gICAgICBdO1xuICAgICAgcGVyc2lzdFRyYWNlTGlzdChuZXh0KTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH0pO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgY2xlYXJGbG93U3RhdGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICAgIHNldFBlbmRpbmdVcGxvYWRSZXRyeShudWxsKTtcbiAgICBzZXRUcmFjZUxpc3QoW10pO1xuICAgIHBlcnNpc3RUcmFjZUxpc3QoW10pO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgZW5zdXJlUXVpY2tDcmVhdGVQZXJtaXNzaW9uID0gdXNlQ2FsbGJhY2soKCk6IGJvb2xlYW4gPT4ge1xuICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSB8fCAhc2hlZXRJZCB8fCBpc0NyZWF0ZU1vZGUgfHwgaXNTaGVldExvY2tlZCkge1xuICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlLCBpc0NyZWF0ZU1vZGUsIGlzU2hlZXRMb2NrZWQsIG9uRm9yYmlkZGVuLCBzaGVldElkXSk7XG5cbiAgY29uc3QgcmVzb2x2ZVVpRXJyb3JNZXNzYWdlID0gdXNlQ2FsbGJhY2soXG4gICAgKGVycm9yOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDIyKSB7XG4gICAgICAgICAgY29uc3QgdmFsaWRhdGlvblRleHQgPSBBcnJheS5pc0FycmF5KGVycm9yLnZhbGlkYXRpb25FcnJvcnMpXG4gICAgICAgICAgICA/IGVycm9yLnZhbGlkYXRpb25FcnJvcnNcbiAgICAgICAgICAgICAgICAubWFwKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgZmllbGQgPSBzYWZlVGV4dChlbnRyeT8uRmllbGQpO1xuICAgICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHNhZmVUZXh0KGVudHJ5Py5NZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgIGlmIChmaWVsZCAmJiBtZXNzYWdlKSByZXR1cm4gYCR7ZmllbGR9OiAke21lc3NhZ2V9YDtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlIHx8IGZpZWxkO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmZpbHRlcigoZW50cnkpID0+IGVudHJ5KVxuICAgICAgICAgICAgICAgIC5qb2luKFwiIHwgXCIpXG4gICAgICAgICAgICA6IFwiXCI7XG4gICAgICAgICAgcmV0dXJuIHZhbGlkYXRpb25UZXh0IHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9WYWxpZGF0aW9uXCIsIFwiVmFsaWRhdGlvbiBlcnJvci5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9Ob3RGb3VuZFwiLCBcIlJlY29yZCBub3QgZm91bmQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDUwMCkge1xuICAgICAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfU2VydmVyXCIsIFwiU2VydmVyIGVycm9yLlwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBzYWZlVGV4dChlcnJvci5tZXNzYWdlKVxuICAgICAgICA/IHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpXG4gICAgICAgIDogaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpO1xuICAgIH0sXG4gICAgW11cbiAgKTtcblxuICBjb25zdCBhcHBseUlhQW5kTGlua1RvU2hlZXQgPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAoZmlsZUlkOiBzdHJpbmcsIGRyYWZ0OiBOb3JtYWxpemVkRHJhZnQsIHVwbG9hZFJlc3VsdDogVXBsb2FkU3luY1Jlc3VsdCkgPT4ge1xuICAgICAgc2V0UHJvZ3Jlc3NLZXkoXCJmaW5hbGl6aW5nSWFcIik7XG4gICAgICBjb25zdCBpYVBheWxvYWQgPSBidWlsZFRpY2tldElhUGF5bG9hZChkcmFmdCwgdXBsb2FkUmVzdWx0KTtcbiAgICAgIGNvbnN0IGlhUmVzcG9uc2UgPSBhd2FpdCBhcHBseUV4cGVuc2VTaGVldFRpY2tldElhKGZpbGVJZCwgaWFQYXlsb2FkLCB7XG4gICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgfSk7XG4gICAgICBhZGRUcmFjZShcInRpY2tldC1pYVwiLCBzYWZlVGV4dCgoaWFSZXNwb25zZSBhcyB7IFRyYWNlSWQ/OiB1bmtub3duIH0pPy5UcmFjZUlkKSk7XG4gICAgICBpZiAoaWFSZXNwb25zZS5TdWNjZXNzICE9PSB0cnVlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihzYWZlVGV4dChpYVJlc3BvbnNlLk1lc3NhZ2UpIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxpbmVQYXlsb2FkID0gYnVpbGRTaGVldExpbmVQYXlsb2FkKGRyYWZ0LCBmaWxlSWQsIHByb2plY3RJZCk7XG4gICAgICBpZiAoIWxpbmVQYXlsb2FkKSByZXR1cm47XG5cbiAgICAgIHNldFByb2dyZXNzS2V5KFwibGlua2luZ0V4cGVuc2VMaW5lXCIpO1xuICAgICAgY29uc3QgY3JlYXRlUmVzcG9uc2UgPSBhd2FpdCBjcmVhdGVFeHBlbnNlU2hlZXQoXG4gICAgICAgIHtcbiAgICAgICAgICBtb2RlOiAyLFxuICAgICAgICAgIGV4aXN0aW5nSG9qYUdhc3Rvc0lkOiBzaGVldElkLFxuICAgICAgICAgIGxpbmVzOiBbbGluZVBheWxvYWRdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICBhZGRUcmFjZShcImV4cGVuc2Utc2hlZXQtYXBwZW5kLWxpbmVcIiwgc2FmZVRleHQoKGNyZWF0ZVJlc3BvbnNlIGFzIHsgVHJhY2VJZD86IHVua25vd24gfSk/LlRyYWNlSWQpKTtcbiAgICAgIGlmIChjcmVhdGVSZXNwb25zZS5TdWNjZXNzICE9PSB0cnVlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihzYWZlVGV4dChjcmVhdGVSZXNwb25zZS5NZXNzYWdlKSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2FkZFRyYWNlLCBwcm9qZWN0SWQsIHNoZWV0SWRdXG4gICk7XG5cbiAgY29uc3QgcmVzdW1lRnJvbVVwbG9hZFN0ZXAgPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAocGVuZGluZ1N0YXRlOiBQZW5kaW5nVXBsb2FkUmV0cnksIGZpbGU6IEZpbGUpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgIHNldEJ1c3kodHJ1ZSk7XG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gICAgICBzZXRQcm9ncmVzc0tleShcInN5bmNpbmdGaWxlXCIpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB1cGxvYWRSZXNwb25zZSA9IGF3YWl0IHVwbG9hZEV4cGVuc2VTaGVldFRpY2tldEZpbGUoXG4gICAgICAgICAgcGVuZGluZ1N0YXRlLmZpbGVJZCxcbiAgICAgICAgICBmaWxlLFxuICAgICAgICAgIHBlbmRpbmdTdGF0ZS5leHRlbnNpb24sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBhZGRUcmFjZShcInRpY2tldC1maWxlLXVwbG9hZFwiLCBzYWZlVGV4dCgodXBsb2FkUmVzcG9uc2UgYXMgeyBUcmFjZUlkPzogdW5rbm93biB9KT8uVHJhY2VJZCkpO1xuICAgICAgICBpZiAodXBsb2FkUmVzcG9uc2UuU3VjY2VzcyAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihzYWZlVGV4dCh1cGxvYWRSZXNwb25zZS5NZXNzYWdlKSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdXBsb2FkUmVzdWx0ID0gcmVzb2x2ZVVwbG9hZFJlc3VsdCh1cGxvYWRSZXNwb25zZS5EYXRhKTtcbiAgICAgICAgYXdhaXQgYXBwbHlJYUFuZExpbmtUb1NoZWV0KHBlbmRpbmdTdGF0ZS5maWxlSWQsIHBlbmRpbmdTdGF0ZS5kcmFmdCwgdXBsb2FkUmVzdWx0KTtcblxuICAgICAgICBzZXRQcm9ncmVzc0tleShcImRvbmVcIik7XG4gICAgICAgIHNldFBlbmRpbmdVcGxvYWRSZXRyeShudWxsKTtcbiAgICAgICAgYXdhaXQgcmVtb3ZlQ2FjaGVkSW1hZ2VGaWxlKHBlbmRpbmdTdGF0ZS5jYWNoZUtleSk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHNldEJ1c3koZmFsc2UpO1xuICAgICAgICAgIHNldFByb2dyZXNzS2V5KG51bGwpO1xuICAgICAgICAgIG9uQ29tcGxldGVkPy4oKTtcbiAgICAgICAgfSwgMzIwKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHtcbiAgICAgICAgICBjb25zdCB0cmFjZUlkID0gZXh0cmFjdFRyYWNlSWRGcm9tRXJyb3IoZXJyb3IpO1xuICAgICAgICAgIGFkZFRyYWNlKFwidGlja2V0LWZpbGUtdXBsb2FkLWVycm9yXCIsIHRyYWNlSWQpO1xuICAgICAgICB9XG4gICAgICAgIHNldEJ1c3koZmFsc2UpO1xuICAgICAgICBzZXRQcm9ncmVzc0tleShudWxsKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc29sdmVVaUVycm9yTWVzc2FnZShlcnJvcikpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2FkZFRyYWNlLCBhcHBseUlhQW5kTGlua1RvU2hlZXQsIG9uQ29tcGxldGVkLCByZXNvbHZlVWlFcnJvck1lc3NhZ2VdXG4gICk7XG5cbiAgY29uc3QgcnVuSWFDcmVhdGVGbG93ID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKGZpbGU6IEZpbGUsIGV4dGVuc2lvbjogc3RyaW5nLCBjYWNoZUtleTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICBzZXRCdXN5KHRydWUpO1xuICAgICAgc2V0UHJvZ3Jlc3NLZXkoXCJ1cGxvYWRpbmdJbWFnZVwiKTtcbiAgICAgIGNsZWFyRmxvd1N0YXRlKCk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHNldFByb2dyZXNzS2V5KFwiY3JlYXRpbmdUaWNrZXRcIik7XG4gICAgICAgIGNvbnN0IGRyYWZ0UmVzcG9uc2UgPSBhd2FpdCBleHRyYWN0RXhwZW5zZUZyb21UaWNrZXREcmFmdChmaWxlLCB0cnVlLCB1bmRlZmluZWQsIHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGFkZFRyYWNlKFwiZXhwZW5zZWZyb210aWNrZXRcIiwgc2FmZVRleHQoKGRyYWZ0UmVzcG9uc2UgYXMgeyBUcmFjZUlkPzogdW5rbm93biB9KT8uVHJhY2VJZCkpO1xuICAgICAgICBpZiAoZHJhZnRSZXNwb25zZS5TdWNjZXNzICE9PSB0cnVlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHNhZmVUZXh0KGRyYWZ0UmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRyYWZ0ID0gbm9ybWFsaXplRHJhZnRGcm9tSWFSZXNwb25zZShkcmFmdFJlc3BvbnNlLkRhdGEgYXMgRXhwZW5zZVNoZWV0RHJhZnRSZXNwb25zZSk7XG4gICAgICAgIGNvbnN0IGZpbGVJZCA9IHJlc29sdmVUaWNrZXRGaWxlSWRGcm9tRHJhZnRSZXNwb25zZShkcmFmdFJlc3BvbnNlLkRhdGEpO1xuICAgICAgICBpZiAoIWZpbGVJZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfTm9GaWxlSWRcIiwgXCJDb3VsZCBub3QgcmVzb2x2ZSB0aWNrZXQgZmlsZSBpZC5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzZXRQcm9ncmVzc0tleShcInN5bmNpbmdGaWxlXCIpO1xuICAgICAgICAgIGNvbnN0IHVwbG9hZFJlc3BvbnNlID0gYXdhaXQgdXBsb2FkRXhwZW5zZVNoZWV0VGlja2V0RmlsZShmaWxlSWQsIGZpbGUsIGV4dGVuc2lvbiwge1xuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYWRkVHJhY2UoXCJ0aWNrZXQtZmlsZS11cGxvYWRcIiwgc2FmZVRleHQoKHVwbG9hZFJlc3BvbnNlIGFzIHsgVHJhY2VJZD86IHVua25vd24gfSk/LlRyYWNlSWQpKTtcbiAgICAgICAgICBpZiAodXBsb2FkUmVzcG9uc2UuU3VjY2VzcyAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHNhZmVUZXh0KHVwbG9hZFJlc3BvbnNlLk1lc3NhZ2UpIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgdXBsb2FkUmVzdWx0ID0gcmVzb2x2ZVVwbG9hZFJlc3VsdCh1cGxvYWRSZXNwb25zZS5EYXRhKTtcbiAgICAgICAgICBhd2FpdCBhcHBseUlhQW5kTGlua1RvU2hlZXQoZmlsZUlkLCBkcmFmdCwgdXBsb2FkUmVzdWx0KTtcblxuICAgICAgICAgIHNldFByb2dyZXNzS2V5KFwiZG9uZVwiKTtcbiAgICAgICAgICBhd2FpdCByZW1vdmVDYWNoZWRJbWFnZUZpbGUoY2FjaGVLZXkpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgc2V0QnVzeShmYWxzZSk7XG4gICAgICAgICAgICBzZXRQcm9ncmVzc0tleShudWxsKTtcbiAgICAgICAgICAgIG9uQ29tcGxldGVkPy4oKTtcbiAgICAgICAgICB9LCAzMjApO1xuICAgICAgICB9IGNhdGNoICh1cGxvYWRFcnJvcikge1xuICAgICAgICAgIGlmICh1cGxvYWRFcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHRyYWNlSWQgPSBleHRyYWN0VHJhY2VJZEZyb21FcnJvcih1cGxvYWRFcnJvcik7XG4gICAgICAgICAgICBhZGRUcmFjZShcInRpY2tldC1maWxlLXVwbG9hZC1lcnJvclwiLCB0cmFjZUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0UGVuZGluZ1VwbG9hZFJldHJ5KHtcbiAgICAgICAgICAgIGZpbGVJZCxcbiAgICAgICAgICAgIGV4dGVuc2lvbixcbiAgICAgICAgICAgIGNhY2hlS2V5LFxuICAgICAgICAgICAgZHJhZnQsXG4gICAgICAgICAgICBmaWxlTmFtZUhpbnQ6IHNhbml0aXplRmlsZU5hbWUoZmlsZS5uYW1lKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBpbmRUKFxuICAgICAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX1VwbG9hZFJldHJ5XCIsXG4gICAgICAgICAgICAgIFwiVGlja2V0IGNyZWF0ZWQsIGJ1dCBmaWxlIHN5bmMgZmFpbGVkLiBSZXRyeSB1cGxvYWQgdG8gY29tcGxldGUgcHJvY2Vzcy5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHNldEJ1c3koZmFsc2UpO1xuICAgICAgICBzZXRQcm9ncmVzc0tleShudWxsKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc29sdmVVaUVycm9yTWVzc2FnZShlcnJvcikpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2FkZFRyYWNlLCBhcHBseUlhQW5kTGlua1RvU2hlZXQsIGNsZWFyRmxvd1N0YXRlLCBvbkNvbXBsZXRlZCwgcmVzb2x2ZVVpRXJyb3JNZXNzYWdlXVxuICApO1xuXG4gIGNvbnN0IHJ1bk1hbnVhbENyZWF0ZUZsb3cgPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAoZmlsZTogRmlsZSwgZXh0ZW5zaW9uOiBzdHJpbmcsIGNhY2hlS2V5OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgIHNldEJ1c3kodHJ1ZSk7XG4gICAgICBzZXRQcm9ncmVzc0tleShcImNyZWF0aW5nVGlja2V0XCIpO1xuICAgICAgY2xlYXJGbG93U3RhdGUoKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdG9kYXkgPSBnZXRUb2RheVl5eXlNTWRkKCk7XG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyVXJsID0gYHBlbmRpbmc6Ly90aWNrZXQtdXBsb2FkLyR7cmVzb2x2ZVJhbmRvbUtleSgpfWA7XG4gICAgICAgIGNvbnN0IGNyZWF0ZVBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldENyZWF0ZVJlcXVlc3QgPSB7XG4gICAgICAgICAgbW9kZTogMSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogc2FuaXRpemVGaWxlTmFtZShmaWxlLm5hbWUpLnJlcGxhY2UoL1xcLlthLXowLTldKyQvaSwgXCJcIikgfHwgXCJUaWNrZXRcIixcbiAgICAgICAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSB8fCBcIkVVUlwiLFxuICAgICAgICAgIHRyYW5zRGF0ZTogdG9kYXksXG4gICAgICAgICAgY29tZW50YXJpbzogXCJcIixcbiAgICAgICAgICB1cmxGaWxlOiBwbGFjZWhvbGRlclVybCxcbiAgICAgICAgICBmaWxlRXh0ZW5zaW9uOiBleHRlbnNpb24sXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNyZWF0ZVJlc3BvbnNlID0gYXdhaXQgY3JlYXRlRXhwZW5zZVNoZWV0VGlja2V0KGNyZWF0ZVBheWxvYWQsIHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGFkZFRyYWNlKFwidGlja2V0LWNyZWF0ZS1tYW51YWxcIiwgc2FmZVRleHQoKGNyZWF0ZVJlc3BvbnNlIGFzIHsgVHJhY2VJZD86IHVua25vd24gfSk/LlRyYWNlSWQpKTtcbiAgICAgICAgaWYgKGNyZWF0ZVJlc3BvbnNlLlN1Y2Nlc3MgIT09IHRydWUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioc2FmZVRleHQoY3JlYXRlUmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNyZWF0ZURhdGEgPSBhc1JlY29yZCgoY3JlYXRlUmVzcG9uc2UgYXMgeyBEYXRhPzogdW5rbm93biB9KT8uRGF0YSk7XG4gICAgICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChjcmVhdGVEYXRhLCBbXCJGaWxlSWRcIiwgXCJmaWxlSWRcIl0pKTtcbiAgICAgICAgaWYgKCFmaWxlSWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX05vRmlsZUlkXCIsIFwiQ291bGQgbm90IHJlc29sdmUgdGlja2V0IGZpbGUgaWQuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFByb2dyZXNzS2V5KFwic3luY2luZ0ZpbGVcIik7XG4gICAgICAgIGNvbnN0IHVwbG9hZFJlc3BvbnNlID0gYXdhaXQgdXBsb2FkRXhwZW5zZVNoZWV0VGlja2V0RmlsZShmaWxlSWQsIGZpbGUsIGV4dGVuc2lvbiwge1xuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgYWRkVHJhY2UoXCJ0aWNrZXQtZmlsZS11cGxvYWRcIiwgc2FmZVRleHQoKHVwbG9hZFJlc3BvbnNlIGFzIHsgVHJhY2VJZD86IHVua25vd24gfSk/LlRyYWNlSWQpKTtcbiAgICAgICAgaWYgKHVwbG9hZFJlc3BvbnNlLlN1Y2Nlc3MgIT09IHRydWUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioc2FmZVRleHQodXBsb2FkUmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1cGxvYWRSZXN1bHQgPSByZXNvbHZlVXBsb2FkUmVzdWx0KHVwbG9hZFJlc3BvbnNlLkRhdGEpO1xuXG4gICAgICAgIHNldFByb2dyZXNzS2V5KFwidXBsb2FkaW5nSW1hZ2VcIik7XG4gICAgICAgIGNvbnN0IGlhRHJhZnRSZXNwb25zZSA9IGF3YWl0IGV4dHJhY3RFeHBlbnNlRnJvbVRpY2tldERyYWZ0KGZpbGUsIGZhbHNlLCB1cGxvYWRSZXN1bHQudXJsRmlsZSB8fCB1bmRlZmluZWQsIHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGFkZFRyYWNlKFwiZXhwZW5zZWZyb210aWNrZXRcIiwgc2FmZVRleHQoKGlhRHJhZnRSZXNwb25zZSBhcyB7IFRyYWNlSWQ/OiB1bmtub3duIH0pPy5UcmFjZUlkKSk7XG4gICAgICAgIGlmIChpYURyYWZ0UmVzcG9uc2UuU3VjY2VzcyAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihzYWZlVGV4dChpYURyYWZ0UmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkcmFmdCA9IG5vcm1hbGl6ZURyYWZ0RnJvbUlhUmVzcG9uc2UoaWFEcmFmdFJlc3BvbnNlLkRhdGEgYXMgRXhwZW5zZVNoZWV0RHJhZnRSZXNwb25zZSk7XG4gICAgICAgIGF3YWl0IGFwcGx5SWFBbmRMaW5rVG9TaGVldChmaWxlSWQsIGRyYWZ0LCB1cGxvYWRSZXN1bHQpO1xuXG4gICAgICAgIHNldFByb2dyZXNzS2V5KFwiZG9uZVwiKTtcbiAgICAgICAgYXdhaXQgcmVtb3ZlQ2FjaGVkSW1hZ2VGaWxlKGNhY2hlS2V5KTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgc2V0QnVzeShmYWxzZSk7XG4gICAgICAgICAgc2V0UHJvZ3Jlc3NLZXkobnVsbCk7XG4gICAgICAgICAgb25Db21wbGV0ZWQ/LigpO1xuICAgICAgICB9LCAzMjApO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikge1xuICAgICAgICAgIGNvbnN0IHRyYWNlSWQgPSBleHRyYWN0VHJhY2VJZEZyb21FcnJvcihlcnJvcik7XG4gICAgICAgICAgYWRkVHJhY2UoXCJ0aWNrZXQtbWFudWFsLWVycm9yXCIsIHRyYWNlSWQpO1xuICAgICAgICB9XG4gICAgICAgIHNldEJ1c3koZmFsc2UpO1xuICAgICAgICBzZXRQcm9ncmVzc0tleShudWxsKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc29sdmVVaUVycm9yTWVzc2FnZShlcnJvcikpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2FkZFRyYWNlLCBhcHBseUlhQW5kTGlua1RvU2hlZXQsIGNsZWFyRmxvd1N0YXRlLCBjdXJyZW5jeUNvZGUsIG9uQ29tcGxldGVkLCByZXNvbHZlVWlFcnJvck1lc3NhZ2VdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0ZWRGaWxlID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKGZpbGU6IEZpbGUgfCBudWxsLCBfc291cmNlOiBUaWNrZXRJbWFnZVNvdXJjZSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgaWYgKCFmaWxlKSByZXR1cm47XG4gICAgICBpZiAoIWVuc3VyZVF1aWNrQ3JlYXRlUGVybWlzc2lvbigpKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IHNhZmVUeXBlID0gc2FmZVRleHQoZmlsZS50eXBlKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKHNhZmVUeXBlICYmICFzYWZlVHlwZS5zdGFydHNXaXRoKFwiaW1hZ2UvXCIpKSB7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfRmlsZVR5cGVcIiwgXCJVbnN1cHBvcnRlZCBpbWFnZSBmb3JtYXQuXCIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGZpbGUuc2l6ZSA+IE1BWF9USUNLRVRfSU1BR0VfU0laRV9CWVRFUykge1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX0ZpbGVTaXplXCIsIFwiSW1hZ2UgZXhjZWVkcyA1ME1CIG1heCBzaXplLlwiKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZXh0ZW5zaW9uID0gaW5mZXJFeHRlbnNpb24oZmlsZSk7XG4gICAgICBjb25zdCBjYWNoZUtleSA9IHJlc29sdmVSYW5kb21LZXkoKTtcbiAgICAgIGxhdGVzdEZpbGVSZWYuY3VycmVudCA9IHsgY2FjaGVLZXksIGZpbGUgfTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgY2FjaGVJbWFnZUZpbGUoY2FjaGVLZXksIGZpbGUpO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIERvIG5vdCBibG9jayBmbG93IGlmIGJyb3dzZXIgY2FjaGUgc3RvcmFnZSBpcyB1bmF2YWlsYWJsZS5cbiAgICAgIH1cblxuICAgICAgaWYgKERFRkFVTFRfQ1JFQVRFX01PREUgPT09IFwibWFudWFsXCIpIHtcbiAgICAgICAgYXdhaXQgcnVuTWFudWFsQ3JlYXRlRmxvdyhmaWxlLCBleHRlbnNpb24sIGNhY2hlS2V5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IHJ1bklhQ3JlYXRlRmxvdyhmaWxlLCBleHRlbnNpb24sIGNhY2hlS2V5KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtlbnN1cmVRdWlja0NyZWF0ZVBlcm1pc3Npb24sIHJ1bklhQ3JlYXRlRmxvdywgcnVuTWFudWFsQ3JlYXRlRmxvd11cbiAgKTtcblxuICBjb25zdCByZXRyeVBlbmRpbmdVcGxvYWQgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFwZW5kaW5nVXBsb2FkUmV0cnkpIHJldHVybjtcbiAgICBpZiAoIWVuc3VyZVF1aWNrQ3JlYXRlUGVybWlzc2lvbigpKSByZXR1cm47XG5cbiAgICBsZXQgc2VsZWN0ZWRGaWxlID0gbGF0ZXN0RmlsZVJlZi5jdXJyZW50Py5jYWNoZUtleSA9PT0gcGVuZGluZ1VwbG9hZFJldHJ5LmNhY2hlS2V5ID8gbGF0ZXN0RmlsZVJlZi5jdXJyZW50LmZpbGUgOiBudWxsO1xuICAgIGlmICghc2VsZWN0ZWRGaWxlKSB7XG4gICAgICBjb25zdCBibG9iID0gYXdhaXQgcmVhZENhY2hlZEltYWdlRmlsZShwZW5kaW5nVXBsb2FkUmV0cnkuY2FjaGVLZXkpO1xuICAgICAgaWYgKCFibG9iKSB7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfUmV0cnlGaWxlTWlzc2luZ1wiLCBcIkNhY2hlZCBpbWFnZSBpcyBubyBsb25nZXIgYXZhaWxhYmxlLlwiKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNlbGVjdGVkRmlsZSA9IG5ldyBGaWxlKFtibG9iXSwgcGVuZGluZ1VwbG9hZFJldHJ5LmZpbGVOYW1lSGludCB8fCBcInRpY2tldC1pbWFnZVwiLCB7XG4gICAgICAgIHR5cGU6IHNhZmVUZXh0KGJsb2IudHlwZSkgfHwgXCJpbWFnZS9qcGVnXCIsXG4gICAgICB9KTtcbiAgICAgIGxhdGVzdEZpbGVSZWYuY3VycmVudCA9IHsgY2FjaGVLZXk6IHBlbmRpbmdVcGxvYWRSZXRyeS5jYWNoZUtleSwgZmlsZTogc2VsZWN0ZWRGaWxlIH07XG4gICAgfVxuXG4gICAgYXdhaXQgcmVzdW1lRnJvbVVwbG9hZFN0ZXAocGVuZGluZ1VwbG9hZFJldHJ5LCBzZWxlY3RlZEZpbGUpO1xuICB9LCBbZW5zdXJlUXVpY2tDcmVhdGVQZXJtaXNzaW9uLCBwZW5kaW5nVXBsb2FkUmV0cnksIHJlc3VtZUZyb21VcGxvYWRTdGVwXSk7XG5cbiAgY29uc3Qgb3BlblNvdXJjZVBpY2tlciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWVuc3VyZVF1aWNrQ3JlYXRlUGVybWlzc2lvbigpKSByZXR1cm47XG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICAgIHNldFNvdXJjZVBpY2tlck9wZW4odHJ1ZSk7XG4gIH0sIFtlbnN1cmVRdWlja0NyZWF0ZVBlcm1pc3Npb25dKTtcblxuICBjb25zdCBjbG9zZVNvdXJjZVBpY2tlciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoYnVzeSkgcmV0dXJuO1xuICAgIHNldFNvdXJjZVBpY2tlck9wZW4oZmFsc2UpO1xuICB9LCBbYnVzeV0pO1xuXG4gIGNvbnN0IHJlcXVlc3RDYW1lcmFQZXJtaXNzaW9uID0gdXNlQ2FsbGJhY2soYXN5bmMgKCk6IFByb21pc2U8Ym9vbGVhbiB8IG51bGw+ID0+IHtcbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvciA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgbWVkaWFEZXZpY2VzID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcztcbiAgICBpZiAoIW1lZGlhRGV2aWNlcyB8fCB0eXBlb2YgbWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdHJlYW0gPSBhd2FpdCBtZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHtcbiAgICAgICAgdmlkZW86IHsgZmFjaW5nTW9kZTogXCJlbnZpcm9ubWVudFwiIH0sXG4gICAgICB9KTtcbiAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKCh0cmFjaykgPT4gdHJhY2suc3RvcCgpKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2gge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIGNvbnN0IHNlbGVjdEZyb21DYW1lcmEgPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAoaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbCkgPT4ge1xuICAgICAgaWYgKCFpbnB1dEVsZW1lbnQpIHJldHVybjtcbiAgICAgIGNvbnN0IGdyYW50ZWQgPSBhd2FpdCByZXF1ZXN0Q2FtZXJhUGVybWlzc2lvbigpO1xuICAgICAgaWYgKGdyYW50ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfQ2FtZXJhUGVybWlzc2lvblwiLCBcIkNhbWVyYSBwZXJtaXNzaW9uIGlzIHJlcXVpcmVkLlwiKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNldFNvdXJjZVBpY2tlck9wZW4oZmFsc2UpO1xuICAgICAgaW5wdXRFbGVtZW50LmNsaWNrKCk7XG4gICAgfSxcbiAgICBbcmVxdWVzdENhbWVyYVBlcm1pc3Npb25dXG4gICk7XG5cbiAgY29uc3Qgc2VsZWN0RnJvbUdhbGxlcnkgPSB1c2VDYWxsYmFjaygoaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbCkgPT4ge1xuICAgIGlmICghaW5wdXRFbGVtZW50KSByZXR1cm47XG4gICAgc2V0U291cmNlUGlja2VyT3BlbihmYWxzZSk7XG4gICAgaW5wdXRFbGVtZW50LmNsaWNrKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBjbGVhckVycm9yID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgc291cmNlUGlja2VyT3BlbixcbiAgICBidXN5LFxuICAgIHByb2dyZXNzS2V5LFxuICAgIHByb2dyZXNzTWVzc2FnZSxcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgaGFzUGVuZGluZ1VwbG9hZFJldHJ5OiBwZW5kaW5nVXBsb2FkUmV0cnkgIT09IG51bGwsXG4gICAgdHJhY2VMaXN0LFxuICAgIG9wZW5Tb3VyY2VQaWNrZXIsXG4gICAgY2xvc2VTb3VyY2VQaWNrZXIsXG4gICAgc2VsZWN0RnJvbUNhbWVyYSxcbiAgICBzZWxlY3RGcm9tR2FsbGVyeSxcbiAgICBoYW5kbGVTZWxlY3RlZEZpbGUsXG4gICAgcmV0cnlQZW5kaW5nVXBsb2FkLFxuICAgIGNsZWFyRXJyb3IsXG4gIH07XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBOEQ7OztBQ0E5RCxJQUFBQyxnQkFBa0I7OztBQ0FsQixtQkFBaUY7QUFDakYsdUJBQTZCO0FBeUdyQjtBQTdGUixJQUFNLHdCQUF3QixDQUFDO0FBQUEsRUFDN0I7QUFBQSxFQUNBO0FBQUEsRUFDQSxZQUFZO0FBQUEsRUFDWixpQkFBaUI7QUFDbkIsTUFBa0M7QUFDaEMsUUFBTSxnQ0FBZ0M7QUFDdEMsUUFBTSw4QkFBOEI7QUFDcEMsUUFBTSx1QkFBdUI7QUFDN0IsUUFBTSxnQkFBZ0I7QUFDdEIsUUFBTSxDQUFDLFFBQVEsU0FBUyxRQUFJLHVCQUFTLEtBQUs7QUFDMUMsUUFBTSxDQUFDLFlBQVksYUFBYSxRQUFJLHVCQUE4QjtBQUFBLElBQ2hFLFVBQVU7QUFBQSxJQUNWLEtBQUs7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxFQUNkLENBQUM7QUFDRCxRQUFNLGdCQUFZLHFCQUFpQyxJQUFJO0FBQ3ZELFFBQU0sZUFBVyxxQkFBOEIsSUFBSTtBQUVuRCxrQkFBZ0IsQ0FBQyxXQUFXLFFBQVEsR0FBRyxNQUFNLFVBQVUsS0FBSyxDQUFDO0FBQzdELFFBQU0sMEJBQXNCLDBCQUFZLE1BQU07QUFDNUMsUUFBSSxPQUFPLFdBQVcsYUFBYTtBQUNqQztBQUFBLElBQ0Y7QUFFQSxVQUFNLGdCQUFnQixVQUFVO0FBQ2hDLFVBQU0sZUFBZSxTQUFTO0FBQzlCLFFBQUksQ0FBQyxp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QUFBQSxRQUMzQiwyQkFBMkI7QUFBQSxRQUMzQixpQ0FBaUM7QUFBQSxRQUNqQyxnQ0FBZ0M7QUFBQTtBQUFBLElBQ2xDLElBQ0U7QUFBQSxJQUVILENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUFDLGVBQzVEO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0EsY0FBYyxTQUFTLFFBQVEsWUFBWTtBQUFBLFFBQzNDO0FBQUEsUUFDQTtBQUFBLFFBQ0EsWUFBWSxLQUFLLHVCQUF1QixPQUFPO0FBQUEsUUFDL0MsV0FBVyxLQUFLLHlCQUF5QixrQ0FBa0M7QUFBQSxRQUMzRTtBQUFBLFFBQ0EsY0FBYztBQUFBLFFBQ2Qsa0JBQWtCO0FBQUEsUUFDbEIsWUFBWTtBQUFBO0FBQUEsSUFDZCxJQUNFO0FBQUEsSUFFSCxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFDckM7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFdBQVcsS0FBSyw2QkFBNkIsa0JBQWtCO0FBQUEsUUFDL0QsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBLFFBQ1IsZUFBZSxLQUFLLDZCQUE2QixrQkFBa0I7QUFBQSxRQUNuRSxXQUFXO0FBQUE7QUFBQSxJQUNiLElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFHQSxJQUFNLHlCQUF5QixNQUFNO0FBQ25DLFNBQ0UsNkNBQUMsZ0NBQ0MsdURBQUMsaUNBQThCLEdBQ2pDO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsUUFBTSxTQUFTLFNBQVMsZUFBZSwyQkFBMkI7QUFDbEUsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQywwQkFBdUIsQ0FBRTtBQUNyRDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8saUNBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlJlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAicGF5bG9hZCIsICJyZXNwb25zZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
