import {
  useExpenseSheetsFilterCache
} from "./chunks/chunk-2GJBCQBO.js";
import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-AEUWWHOM.js";
import {
  ExpenseQuickTicketProgressOverlay_default,
  PageBottomActionButton,
  PageBottomActions_default,
  TICKET_IMAGE_ACCEPT_ATTRIBUTE,
  useExpenseSheetQuickTicketFlow
} from "./chunks/chunk-2QTOYRKC.js";
import {
  resolveExpenseSheetDetailPolicy
} from "./chunks/chunk-YSFQS4W5.js";
import {
  getExpenseStatusLabel
} from "./chunks/chunk-W2YOA3BT.js";
import "./chunks/chunk-ASLVMCBT.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-QGBVJNF4.js";
import "./chunks/chunk-6HMZLOGF.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseCurrencyFlagIcon_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-4PPSRAOM.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-JR7YV7OS.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-FRQBPU47.js";
import {
  useOutsideClick
} from "./chunks/chunk-AXUPQW6N.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-AZR24WS3.js";
import "./chunks/chunk-KJ3UA2J6.js";
import {
  isManagingOtherExpenseRecord,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-BYJNWY32.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-JR3OAOOU.js";
import "./chunks/chunk-K7MECJ5E.js";
import {
  clearExpenseNavigationGuard,
  formatAmountWithCurrency,
  formatExpenseDateParts,
  formatExpenseDisplayDate,
  formatExpenseInputNumber,
  formatExpenseNumber,
  hasAssignedVoucher,
  navigateToExpenseUrl,
  parseExpenseDate,
  parseExpenseNumericInput,
  reloadExpensePage,
  safeText,
  setExpenseNavigationGuard,
  toIsoDate
} from "./chunks/chunk-JWQJTNB4.js";
import {
  configureExpenseApiAuth,
  createExpenseSheet,
  deleteExpenseSheet,
  fetchExpenseSheetDetail,
  getExchangeRate,
  getExpenseSheetDefaultCurrencyCode,
  mapExpenseSheetHeader,
  mapExpenseSheetLine,
  updateExpenseSheetHeader
} from "./chunks/chunk-CNJSX7GH.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-YRLD2CA7.js";
import "./chunks/chunk-KTF6MF2Z.js";
import "./chunks/chunk-6G7EOWHU.js";
import {
  canAccess,
  classNames,
  indFormat,
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

// Web/wwwroot/react/src/pages/gastos/detail/ExpenseSheetDetailPage.tsx
var import_react6 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/components/ExpenseSheetHeaderCurrencySection.tsx
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

// Web/wwwroot/react/src/pages/gastos/components/ExpenseSheetHeaderCurrencySection.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var ExpenseSheetHeaderCurrencySection = ({
  isEditing,
  canEditHeaderFields,
  isForeignCurrency,
  expenseCurrencyLabel,
  headerCurrencyCode,
  baseCurrencyCode,
  draftCurrencyCode,
  draftExchangeRate,
  exchangeRateValue,
  exchangeRateValidationMessage,
  exchangeRateReferenceAmount,
  showExchangeRate,
  isCurrencyLockedByLines,
  isExchangeRateLockedByLines,
  exchangeRateInfoMessage,
  onDraftCurrencyCodeChange,
  onDraftExchangeRateChange
}) => {
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
  if (isEditing && canEditHeaderFields) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "sm:col-span-2 space-y-3", children: [
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
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
    !isEditing && showExchangeRate ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate"), value: exchangeRateValue }) : null
  ] });
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
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var EXCHANGE_RATE_MODE_PREFIX_PATTERN = /^T\.?C\.?\s*/i;
var ExpenseSheetHeaderForm = ({
  isCreateMode,
  isEditing,
  canEditHeaderFields,
  statusCommentMode,
  header,
  projectValue,
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
  draftEstadoComentarios,
  officialExchangeRateRawValue,
  officialExchangeRateDate,
  officialExchangeRateSource,
  onDraftDescriptionChange,
  onDraftProjectIdChange,
  onDraftCurrencyCodeChange,
  onDraftExchangeRateChange,
  onDraftEstadoComentariosChange
}) => {
  const isForeignCurrency = isEditing && canEditHeaderFields && normalizedDraftCurrency !== "" && normalizedDraftCurrency !== exchangeRateBaseCurrency;
  const expenseCurrencyLabel = isForeignCurrency ? indT("ExpenseSheets_Field_ExpenseCurrency", "Expense currency") : indT("ExpenseSheets_Field_Currency", "Currency");
  const statusValue = header.expenseSheetStatus === null || header.expenseSheetStatus === void 0 ? "-" : getExpenseStatusLabel(header.expenseSheetStatus);
  const headerCurrencyCode = safeText(header.currencyCode).toUpperCase();
  const baseCurrencyCode = safeText(exchangeRateBaseCurrency).toUpperCase();
  const statusCommentValue = safeText(header.estadoComentarios);
  const showStatusCommentField = !isCreateMode && statusCommentMode !== "hidden";
  const canEditStatusComment = isEditing && statusCommentMode === "edit";
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("section", { className: "relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-2xl", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
    !isCreateMode ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      ExpenseReadOnlyField_default,
      {
        label: indT("ExpenseSheets_Field_SheetId", "Expense sheet code"),
        value: safeText(header.hojaGastosId) || "-"
      }
    ) : null,
    !isCreateMode ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_Status", "Status"), value: statusValue }) : null,
    showStatusCommentField ? canEditStatusComment ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "md:col-span-2 space-y-1.5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_StatusComment", "Status comment") }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "textarea",
        {
          className: "form-control resize-none",
          rows: 3,
          value: draftEstadoComentarios,
          onChange: (event) => onDraftEstadoComentariosChange(event.target.value || ""),
          "aria-label": indT("ExpenseSheets_Field_StatusComment", "Status comment")
        }
      )
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      ExpenseReadOnlyField_default,
      {
        label: indT("ExpenseSheets_Field_StatusComment", "Status comment"),
        value: statusCommentValue || "-",
        fullWidth: true
      }
    ) : null,
    isEditing && canEditHeaderFields ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "sm:col-span-2 space-y-1.5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_Description", "Description") }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "input",
        {
          className: "form-control",
          value: draftDescription,
          onChange: (event) => onDraftDescriptionChange(event.target.value || ""),
          "aria-label": indT("ExpenseSheets_Field_Description", "Description")
        }
      )
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      ExpenseReadOnlyField_default,
      {
        label: indT("ExpenseSheets_Field_Description", "Description"),
        value: safeText(header.description) || "-",
        fullWidth: true
      }
    ),
    isEditing && canEditHeaderFields ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      ExpenseProjectFilterInput_default,
      {
        label: indT("ExpenseSheets_Field_Project", "Project"),
        placeholder: indT("ExpenseSheets_Filter_Project_Placeholder", "Project id"),
        value: draftProjectId,
        onChange: onDraftProjectIdChange,
        disabled: !isEditing || !canEditHeaderFields,
        readOnly: !isEditing || !canEditHeaderFields
      }
    ) : projectValue ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_Project", "Project"), value: projectValue }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      ExpenseSheetHeaderCurrencySection_default,
      {
        isEditing,
        canEditHeaderFields,
        isForeignCurrency,
        expenseCurrencyLabel,
        headerCurrencyCode,
        baseCurrencyCode,
        draftCurrencyCode,
        draftExchangeRate,
        exchangeRateValue,
        exchangeRateValidationMessage,
        exchangeRateReferenceAmount,
        showExchangeRate,
        isCurrencyLockedByLines,
        isExchangeRateLockedByLines,
        exchangeRateInfoMessage,
        onDraftCurrencyCodeChange,
        onDraftExchangeRateChange
      }
    ),
    !isCreateMode ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_TotalAmount", "Total amount"), value: totalAmountText }) : null
  ] }) });
};
var ExpenseSheetHeaderForm_default = ExpenseSheetHeaderForm;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseLinesTimeline.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("section", { className: "space-y-0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ExpenseSectionDivider_default, { label: linesLabel, className: "expense-section-divider--spaced" }),
    visibleLines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "timeline-box timeline-empty", "data-empty-text": emptyText }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { ref: containerRef, className: "timeline-box", children: visibleLines.map((line, index) => {
      const lineId = safeText(line.lineRecId);
      const description = safeText(line.description);
      const amountText = formatAmountWithCurrency(line.amount ?? null, currencyCode);
      const linkedTicketFileId = safeText(line.fileId);
      const dateParts = formatExpenseDateParts(safeText(line.transDate), document?.documentElement?.lang || "es-ES");
      const ticketStatusIcon = linkedTicketFileId ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-4 w-4",
          "aria-hidden": "true",
          children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
            }
          )
        }
      ) : null;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "timeline-item", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        ExpenseTimelineCard_default,
        {
          dateParts,
          title: description || lineId || "-",
          amountText,
          onOpen: () => onOpenLine(lineId),
          titleClassName: "timeline-name expense-line-card__title",
          statusIcon: ticketStatusIcon,
          statusIconClassName: "expense-line-card__ticket-icon",
          statusLabel: linkedTicketFileId || void 0
        }
      ) }, `${lineId}-${index}`);
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var ExpenseSheetStatusActionBar = ({ actions, busy, disabled = false, onActionClick }) => {
  if (actions.length < 1) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(PageBottomActions_default, { ariaLabel: indT("ExpenseSheets_BottomActions_Toolbar", "Expense sheet status actions"), children: actions.map((action) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var ExpenseSheetDetailOverlays = ({
  modal,
  modalError,
  status,
  busy,
  isRedirectingAfterCreate,
  modalLoadingText,
  modalCancelText,
  modalConfirmText,
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
  onOpenCreatedTicket,
  onClearQuickTicketError
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
        onCancel
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
    sourcePickerOpen ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/45 px-4 py-6", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-xl", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h3", { className: "text-[16px] font-semibold text-slate-800", children: indT("ExpenseSheets_NewTicket_Source_Title", "Nuevo ticket") }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "mt-1 text-sm text-slate-600", children: indT(
        "ExpenseSheets_NewTicket_Source_Body",
        "Selecciona una fuente para capturar o elegir la imagen del ticket."
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "mt-4 grid grid-cols-1 gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", className: "ind-action-btn w-full px-3 py-2 text-sm", onClick: onSelectFromCamera, children: indT("ExpenseSheets_NewTicket_Source_Camera", "Usar c\xE1mara") }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", className: "ind-action-btn w-full px-3 py-2 text-sm", onClick: onSelectFromGallery, children: indT("ExpenseSheets_NewTicket_Source_Gallery", "Elegir imagen") }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", className: "ind-action-btn w-full px-3 py-2 text-sm", onClick: onCloseSourcePicker, children: indT("Common_Cancel", "Cancel") })
      ] })
    ] }) }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      ExpenseQuickTicketProgressOverlay_default,
      {
        open: quickTicketBusy,
        title: indT("ExpenseSheets_NewTicket_Progress_Title", "Processing ticket"),
        summary: quickTicketProgressMessage || indT("Common_Loading", "Loading"),
        elapsedMs: quickTicketElapsedMs,
        stages: quickTicketProgressStages
      }
    ),
    quickTicketErrorMessage ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "div",
      {
        className: hasPartialTicketFailure ? "glass-panel shadow-card space-y-2 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900" : "glass-panel shadow-card space-y-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { children: quickTicketErrorMessage }),
          quickTicketAttemptId ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "p",
            {
              className: hasPartialTicketFailure ? "rounded-lg border border-amber-200 bg-white px-2 py-1 font-mono text-[11px] text-amber-900 break-all" : "rounded-lg border border-rose-200 bg-white px-2 py-1 font-mono text-[11px] text-rose-800 break-all",
              children: `attemptId: ${quickTicketAttemptId}`
            }
          ) : null,
          quickTicketTraceList.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "div",
            {
              className: hasPartialTicketFailure ? "rounded-lg border border-amber-200 bg-white p-2 text-xs text-amber-800" : "rounded-lg border border-rose-200 bg-white p-2 text-xs text-rose-700",
              children: quickTicketTraceList.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { children: `${entry.step}: ${entry.traceId}` }, `${entry.step}-${entry.at}`))
            }
          ) : null,
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex flex-wrap gap-2", children: [
            hasPartialTicketFailure ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", className: "ind-action-btn px-3 py-1.5 text-xs", onClick: onOpenCreatedTicket, children: indT("ExpenseSheets_NewTicket_OpenCreatedTicket", "Open created ticket") }) : null,
            hasPendingUploadRetry ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", className: "ind-action-btn px-3 py-1.5 text-xs", onClick: onRetryPendingUpload, children: indT("ExpenseSheets_NewTicket_RetryUpload", "Reintentar upload") }) : null,
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", className: "ind-action-btn px-3 py-1.5 text-xs", onClick: onClearQuickTicketError, children: indT("Common_Close", "Close") })
          ] })
        ]
      }
    ) : null
  ] });
};
var ExpenseSheetDetailOverlays_default = ExpenseSheetDetailOverlays;

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetDetailPageController.tsx
var import_react5 = __toESM(require_react());

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
  currentExchangeRateMode,
  onCreateSuccess,
  setModalError,
  setBusy,
  setStatus,
  setIsEditing
}) => {
  const buildUpdatePayload = (0, import_react3.useCallback)(
    (nextStatus) => {
      const normalizedCurrency = String(
        isCurrencyLockedByLines ? lockedCurrencyCode || draftCurrencyCode || "" : draftCurrencyCode || ""
      ).trim().toUpperCase();
      const normalizedDescription = String(draftDescription || "").trim();
      const normalizedProjectId = String(draftProjectId || "").trim();
      const normalizedEstadoComentarios = String(draftEstadoComentarios || "").trim();
      const normalizedExchangeRateRaw = String(
        isExchangeRateLockedByLines ? lockedExchangeRate || draftExchangeRate || "" : draftExchangeRate || ""
      );
      const normalizedBaseCurrency = String(exchangeRateBaseCurrency || "EUR").trim().toUpperCase() || "EUR";
      const requiresExchangeRate = canEditHeaderFields && normalizedCurrency !== "" && normalizedCurrency !== normalizedBaseCurrency;
      const parsedExchangeRate = normalizeExchangeRate(normalizedExchangeRateRaw);
      const officialExchangeRate = normalizeExchangeRate(officialExchangeRateValue);
      const originalExchangeRate = normalizeExchangeRate(lockedExchangeRate);
      const parsedCurrentExchangeRateMode = Number(currentExchangeRateMode);
      const hasCurrentExchangeRateMode = Number.isInteger(parsedCurrentExchangeRateMode) && parsedCurrentExchangeRateMode >= 0;
      const hasValidRate = parsedExchangeRate != null && parsedExchangeRate > 0;
      const hasManualRateEditOnUpdate = canEditHeaderFields && !isCreateMode && hasValidRate && (originalExchangeRate == null || !areRatesEquivalent(parsedExchangeRate, originalExchangeRate));
      const isManualExchangeRate = (() => {
        if (!canEditHeaderFields) return false;
        if (!requiresExchangeRate || !hasValidRate) return false;
        if (isExchangeRateLockedByLines) return false;
        if (!isCreateMode && !hasManualRateEditOnUpdate) return false;
        if (officialExchangeRate == null) return true;
        return !areRatesEquivalent(parsedExchangeRate, officialExchangeRate);
      })();
      const resolvedExchangeRateMode = canEditHeaderFields ? isManualExchangeRate ? 1 : hasCurrentExchangeRateMode ? parsedCurrentExchangeRateMode : 0 : hasCurrentExchangeRateMode ? parsedCurrentExchangeRateMode : void 0;
      const resolvedExpenseSheetStatus = nextStatus ?? (currentExpenseSheetStatus != null ? Number(currentExpenseSheetStatus) : void 0);
      if (isCreateMode) {
        if (!normalizedDescription) {
          return {
            error: indT("ExpenseSheets_Validation_DescriptionRequired", "Description is required.")
          };
        }
        if (!normalizedCurrency) {
          return {
            error: indT("ExpenseSheets_Validation_CurrencyRequired", "Currency is required.")
          };
        }
      }
      if (requiresExchangeRate && !hasValidRate) {
        return {
          error: indT(
            "ExpenseSheets_Validation_ExchangeRateRequired",
            "Exchange rate is required when currency is different from base currency."
          )
        };
      }
      return {
        payload: {
          description: normalizedDescription,
          currencyCode: normalizedCurrency,
          exchRate: hasValidRate ? Number(parsedExchangeRate) : 1,
          projId: normalizedProjectId || void 0,
          expenseSheetStatus: resolvedExpenseSheetStatus,
          exchangeRateMode: resolvedExchangeRateMode,
          estadoComentarios: normalizedEstadoComentarios || void 0
        }
      };
    },
    [
      canEditHeaderFields,
      currentExchangeRateMode,
      currentExpenseSheetStatus,
      draftCurrencyCode,
      draftDescription,
      draftEstadoComentarios,
      draftExchangeRate,
      draftProjectId,
      exchangeRateBaseCurrency,
      isCreateMode,
      isCurrencyLockedByLines,
      isExchangeRateLockedByLines,
      lockedCurrencyCode,
      lockedExchangeRate,
      officialExchangeRateValue
    ]
  );
  const handleUpdate = (0, import_react3.useCallback)(async () => {
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
            currencyCode: createPayload.currencyCode,
            exchRate: createPayload.exchRate,
            projId: createPayload.projId,
            expenseSheetStatus: 0,
            exchangeRateMode: createPayload.exchangeRateMode,
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
  const handleStatusTransition = (0, import_react3.useCallback)(
    async (nextStatus, startStatus) => {
      if (busy || isCreateMode || !sheetId) return false;
      if (!canTransitionStatus) {
        showPermissionModal();
        return false;
      }
      const payloadResult = buildUpdatePayload(nextStatus);
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
    [busy, buildUpdatePayload, canTransitionStatus, isCreateMode, setBusy, setIsEditing, setModalError, setStatus, sheetId]
  );
  const handleDelete = (0, import_react3.useCallback)(async () => {
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
  allowSelfManagement,
  canManageOtherUsers,
  currentAxUserId,
  currentCrmUserId,
  selectedManagedUserId,
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
  const detailPolicy = (0, import_react4.useMemo)(() => {
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
  const exchangeRateRequired = isEditing && canEditHeaderFieldsCurrent && normalizedDraftCurrency !== "" && normalizedDraftCurrency !== exchangeRateBaseCurrency;
  const exchangeRateValidationMessage = exchangeRateRequired && !draftExchangeRate.trim() ? indT(
    "ExpenseSheets_Validation_ExchangeRateRequired",
    "Exchange rate is required when currency is different from base currency."
  ) : "";
  const isCurrencyLockedByLines = false;
  const isExchangeRateLockedByLines = isEditing && canEditHeaderFieldsCurrent && hasLines && showExchangeRate;
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
    if (!isEditing || !canEditHeaderFieldsCurrent || isExchangeRateLockedByLines) {
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
    canEditHeaderFieldsCurrent,
    formExchangeDate,
    exchangeRateBaseCurrency,
    isEditing,
    isExchangeRateLockedByLines,
    normalizedDraftCurrency,
    uiLocale,
    setDraftExchangeRate
  ]);
  const handleEnableEdit = (0, import_react4.useCallback)(() => {
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
  const openTicketsFromSheet = (0, import_react4.useCallback)(
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
var NewTicketIcon = () => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true", className: "h-5 w-5", children: [
  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 20h-5a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v2" }),
  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14.362 11.15a3 3 0 1 0 -4.144 4.263" }),
  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 21v-4a2 2 0 1 1 4 0v4" }),
  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 19h4" }),
  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 15v6" })
] });
var LinkTicketIcon = () => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true", className: "h-5 w-5", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" }) });
var NewLineIcon = () => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true", className: "h-5 w-5", children: [
  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 19c3.333 -2 5 -4 5 -6c0 -3 -1 -3 -2 -3s-2.032 1.085 -2 3c.034 2.048 1.658 2.877 2.5 4c1.5 2 2.5 2.5 3.5 1c.667 -1 1.167 -1.833 1.5 -2.5c1 2.333 2.333 3.5 4 3.5h2.5" }),
  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2" }),
  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16 7h4" })
] });
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
  const lineContainerRef = (0, import_react5.useRef)(null);
  const createdSheetIdRef = (0, import_react5.useRef)("");
  const cameraInputRef = (0, import_react5.useRef)(null);
  const galleryInputRef = (0, import_react5.useRef)(null);
  const [isRedirectingAfterCreate, setIsRedirectingAfterCreate] = (0, import_react5.useState)(false);
  const paginationLabels = (0, import_react5.useMemo)(
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
    canEditStatusCommentCurrent,
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
  const handleModalConfirm = (0, import_react5.useCallback)(async () => {
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
  const handleModalButtonConfirm = (0, import_react5.useCallback)(() => {
    if (!busy && modalError) {
      closeConfirm();
      return;
    }
    void handleModalConfirm();
  }, [busy, closeConfirm, handleModalConfirm, modalError]);
  const visibleLines = (0, import_react5.useMemo)(() => pagedSlice(lines, linePage, LINES_PAGE_SIZE), [linePage, lines]);
  const totalLinePages = Math.ceil((lines.length || 0) / LINES_PAGE_SIZE);
  const totalAmountText = (0, import_react5.useMemo)(
    () => formatExpenseNumber(header?.totalAmount, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
      fallback: "-"
    }),
    [header?.totalAmount]
  );
  const hasStatusActionContent = lines.length > 0 || hasPositiveTotalAmount(header?.totalAmount);
  const areStatusActionsDisabled = !hasStatusActionContent;
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
  const handleSaveSuccess = (0, import_react5.useCallback)(() => {
    if (isCreateMode) {
      const createdSheetId = safeText(createdSheetIdRef.current);
      if (!createdSheetId) return;
      setIsRedirectingAfterCreate(true);
      navigateToCreatedSheet(createdSheetId);
      return;
    }
    reloadExpensePage();
  }, [isCreateMode, navigateToCreatedSheet]);
  const handleStatusActionClick = (0, import_react5.useCallback)(
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
      openConfirm({
        title: actionLabel,
        message: transitionMessage,
        confirmText: actionLabel,
        onConfirm: async () => {
          const ok = await handleStatusTransition(action.nextStatus, actionLabel);
          if (ok) {
            invalidateCachedListForRefetch();
            closeConfirm();
            reloadExpensePage();
          }
          return ok;
        }
      });
    },
    [closeConfirm, handleStatusTransition, hasStatusActionContent, header?.expenseSheetStatus, invalidateCachedListForRefetch, openConfirm]
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
  const resolveClickableCard = (0, import_react5.useCallback)((target) => {
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
    onForbidden: showPermissionModal,
    onCompleted: (result) => {
      const createdFileId = safeText(result?.fileId);
      if (!createdFileId) {
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
  const fabMenuItems = (0, import_react5.useMemo)(
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
  const statusCommentMode = isEditing && canEditStatusCommentCurrent ? "edit" : hasVisibleStatusComment ? "read" : "hidden";
  return {
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
    navigateToLineDetail,
    handleModalButtonConfirm,
    handleStatusActionClick,
    closeConfirm
  };
};

// Web/wwwroot/react/src/pages/gastos/detail/ExpenseSheetDetailPage.tsx
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
var DETAIL_FAB_BOTTOM_WITH_ACTION_BAR = 176;
var EXPENSE_SHEETS_LIST_URL = "/Gastos/ExpenseSheets";
var ExpenseSheetDetailPageContent = () => {
  const controller = useExpenseSheetDetailPageController();
  const { readCachedState, saveCachedState } = useExpenseSheetsFilterCache();
  const rearmExpenseSheetsReturnState = import_react6.default.useCallback(() => {
    const cachedState = readCachedState();
    if (!cachedState) return;
    saveCachedState(cachedState);
  }, [readCachedState, saveCachedState]);
  import_react6.default.useEffect(() => {
    const backButton = document.getElementById("globalBackBtn");
    if (!backButton) return;
    backButton.setAttribute("data-back-url", EXPENSE_SHEETS_LIST_URL);
    return () => {
      backButton.removeAttribute("data-back-url");
    };
  }, []);
  import_react6.default.useEffect(() => {
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
        onOpenCreatedTicket: controller.quickTicketFlow.openCreatedTicket,
        onClearQuickTicketError: controller.quickTicketFlow.clearError
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
      "div",
      {
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700",
        style: { display: controller.isLoading || controller.isRedirectingAfterCreate ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ]
      }
    ),
    controller.errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "text-danger", children: controller.errorMessage }) : null,
    !controller.isLoading && !controller.isRedirectingAfterCreate && !controller.errorMessage && controller.header ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      ExpenseSheetHeaderForm_default,
      {
        isCreateMode: controller.isCreateMode,
        isEditing: controller.isEditing,
        canEditHeaderFields: controller.canEditHeaderFieldsCurrent,
        statusCommentMode: controller.statusCommentMode,
        header: controller.header,
        projectValue: controller.projectValue,
        isCurrencyLockedByLines: controller.isCurrencyLockedByLines,
        isExchangeRateLockedByLines: controller.isExchangeRateLockedByLines,
        normalizedDraftCurrency: controller.normalizedDraftCurrency,
        exchangeRateBaseCurrency: controller.exchangeRateBaseCurrency,
        exchangeRateReferenceAmount: controller.exchangeRateReferenceAmount,
        showExchangeRate: controller.showExchangeRate,
        exchangeRateValue: controller.exchangeRateValue,
        exchangeRateValidationMessage: controller.exchangeRateValidationMessage,
        totalAmountText: controller.totalAmountText,
        draftDescription: controller.draftDescription,
        draftProjectId: controller.draftProjectId,
        draftCurrencyCode: controller.draftCurrencyCode,
        draftExchangeRate: controller.draftExchangeRate,
        draftEstadoComentarios: controller.draftEstadoComentarios,
        officialExchangeRateRawValue: controller.officialExchangeRateRawValue,
        officialExchangeRateDate: controller.officialExchangeRateDate,
        officialExchangeRateSource: controller.officialExchangeRateSource,
        onDraftDescriptionChange: controller.setDraftDescription,
        onDraftProjectIdChange: controller.setDraftProjectId,
        onDraftCurrencyCodeChange: controller.setDraftCurrencyCode,
        onDraftExchangeRateChange: controller.setDraftExchangeRate,
        onDraftEstadoComentariosChange: controller.setDraftEstadoComentarios
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
  const rootEl = document.getElementById("expense-sheet-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ExpenseSheetDetailPage, {}));
};
mountWhenDocumentReady(mount);
var ExpenseSheetDetailPage_default = ExpenseSheetDetailPage;
export {
  ExpenseSheetDetailPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvRXhwZW5zZVNoZWV0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvbi50c3giLCAiLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9JbmZvUG9wb3Zlckljb25CdXR0b24udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29uc3RhbnRzL2V4Y2hhbmdlUmF0ZUVudHJ5TW9kZUNhdGFsb2cudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VTaGVldEhlYWRlckZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlTGluZXNUaW1lbGluZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC9FeHBlbnNlU2hlZXREZXRhaWxPdmVybGF5cy50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRyb2xsZXIudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC91c2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcbmltcG9ydCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nQWN0aW9uQnV0dG9uLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VTaGVldEhlYWRlckZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0SGVhZGVyRm9ybS50c3hcIjtcbmltcG9ydCBFeHBlbnNlTGluZXNUaW1lbGluZSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlTGluZXNUaW1lbGluZS50c3hcIjtcbmltcG9ydCBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25CYXIgZnJvbSBcIi4vRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzIGZyb20gXCIuL0V4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzLnRzeFwiO1xuaW1wb3J0IHsgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGgsIHVzZUV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250cm9sbGVyIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRyb2xsZXIudHN4XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlIH0gZnJvbSBcIi4uL2xpc3QvdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlLnRzXCI7XG5cbmNvbnN0IERFVEFJTF9GQUJfQk9UVE9NX1dJVEhfQUNUSU9OX0JBUiA9IDE3NjtcbmNvbnN0IEVYUEVOU0VfU0hFRVRTX0xJU1RfVVJMID0gXCIvR2FzdG9zL0V4cGVuc2VTaGVldHNcIjtcblxuY29uc3QgRXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRlbnQgPSAoKSA9PiB7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSB1c2VFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udHJvbGxlcigpO1xuICBjb25zdCB7IHJlYWRDYWNoZWRTdGF0ZSwgc2F2ZUNhY2hlZFN0YXRlIH0gPSB1c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUoKTtcblxuICBjb25zdCByZWFybUV4cGVuc2VTaGVldHNSZXR1cm5TdGF0ZSA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBjYWNoZWRTdGF0ZSA9IHJlYWRDYWNoZWRTdGF0ZSgpO1xuICAgIGlmICghY2FjaGVkU3RhdGUpIHJldHVybjtcbiAgICBzYXZlQ2FjaGVkU3RhdGUoY2FjaGVkU3RhdGUpO1xuICB9LCBbcmVhZENhY2hlZFN0YXRlLCBzYXZlQ2FjaGVkU3RhdGVdKTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGJhY2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbEJhY2tCdG5cIik7XG4gICAgaWYgKCFiYWNrQnV0dG9uKSByZXR1cm47XG5cbiAgICBiYWNrQnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtYmFjay11cmxcIiwgRVhQRU5TRV9TSEVFVFNfTElTVF9VUkwpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGJhY2tCdXR0b24ucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1iYWNrLXVybFwiKTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVOYXRpdmVCYWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQ/LnN0YXRlICYmIGV2ZW50LnN0YXRlLmluZFRyYXAgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBleGVjdXRlQmFja05hdmlnYXRpb24gPSAoKSA9PiB7XG4gICAgICAgIHJlYXJtRXhwZW5zZVNoZWV0c1JldHVyblN0YXRlKCk7XG4gICAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShFWFBFTlNFX1NIRUVUU19MSVNUX1VSTCk7XG4gICAgICB9O1xuXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdy5fX2luZFJlcXVlc3ROYXZpZ2F0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24oZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBleGVjdXRlQmFja05hdmlnYXRpb24oKTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBoYW5kbGVOYXRpdmVCYWNrKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBoYW5kbGVOYXRpdmVCYWNrKTtcbiAgICB9O1xuICB9LCBbcmVhcm1FeHBlbnNlU2hlZXRzUmV0dXJuU3RhdGVdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICA8RXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXNcbiAgICAgICAgbW9kYWw9e2NvbnRyb2xsZXIubW9kYWx9XG4gICAgICAgIG1vZGFsRXJyb3I9e2NvbnRyb2xsZXIubW9kYWxFcnJvcn1cbiAgICAgICAgc3RhdHVzPXtjb250cm9sbGVyLnN0YXR1c31cbiAgICAgICAgYnVzeT17Y29udHJvbGxlci5idXN5fVxuICAgICAgICBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGU9e2NvbnRyb2xsZXIuaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlfVxuICAgICAgICBtb2RhbExvYWRpbmdUZXh0PXtjb250cm9sbGVyLm1vZGFsTG9hZGluZ1RleHR9XG4gICAgICAgIG1vZGFsQ2FuY2VsVGV4dD17Y29udHJvbGxlci5tb2RhbENhbmNlbFRleHR9XG4gICAgICAgIG1vZGFsQ29uZmlybVRleHQ9e2NvbnRyb2xsZXIubW9kYWxDb25maXJtVGV4dH1cbiAgICAgICAgY2FtZXJhSW5wdXRSZWY9e2NvbnRyb2xsZXIuY2FtZXJhSW5wdXRSZWZ9XG4gICAgICAgIGdhbGxlcnlJbnB1dFJlZj17Y29udHJvbGxlci5nYWxsZXJ5SW5wdXRSZWZ9XG4gICAgICAgIHNvdXJjZVBpY2tlck9wZW49e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnNvdXJjZVBpY2tlck9wZW59XG4gICAgICAgIHF1aWNrVGlja2V0QnVzeT17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuYnVzeX1cbiAgICAgICAgcXVpY2tUaWNrZXRQcm9ncmVzc01lc3NhZ2U9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnByb2dyZXNzTWVzc2FnZX1cbiAgICAgICAgcXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlcz17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cucHJvZ3Jlc3NTdGFnZXN9XG4gICAgICAgIHF1aWNrVGlja2V0RWxhcHNlZE1zPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5wcm9ncmVzc0VsYXBzZWRNc31cbiAgICAgICAgcXVpY2tUaWNrZXRFcnJvck1lc3NhZ2U9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmVycm9yTWVzc2FnZX1cbiAgICAgICAgcXVpY2tUaWNrZXRBdHRlbXB0SWQ9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmF0dGVtcHRJZH1cbiAgICAgICAgcXVpY2tUaWNrZXRUcmFjZUxpc3Q9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnRyYWNlTGlzdH1cbiAgICAgICAgaGFzUGVuZGluZ1VwbG9hZFJldHJ5PXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5oYXNQZW5kaW5nVXBsb2FkUmV0cnl9XG4gICAgICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5oYXNQYXJ0aWFsVGlja2V0RmFpbHVyZX1cbiAgICAgICAgb25Db25maXJtPXtjb250cm9sbGVyLmhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cbiAgICAgICAgb25DYW5jZWw9e2NvbnRyb2xsZXIuY2xvc2VDb25maXJtfVxuICAgICAgICBvblNlbGVjdGVkQ2FtZXJhRmlsZT17KGZpbGUpID0+IHtcbiAgICAgICAgICB2b2lkIGNvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmhhbmRsZVNlbGVjdGVkRmlsZShmaWxlLCBcImNhbWVyYVwiKTtcbiAgICAgICAgfX1cbiAgICAgICAgb25TZWxlY3RlZEdhbGxlcnlGaWxlPXsoZmlsZSkgPT4ge1xuICAgICAgICAgIHZvaWQgY29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuaGFuZGxlU2VsZWN0ZWRGaWxlKGZpbGUsIFwiZ2FsbGVyeVwiKTtcbiAgICAgICAgfX1cbiAgICAgICAgb25TZWxlY3RGcm9tQ2FtZXJhPXsoKSA9PiB7XG4gICAgICAgICAgdm9pZCBjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5zZWxlY3RGcm9tQ2FtZXJhKGNvbnRyb2xsZXIuY2FtZXJhSW5wdXRSZWYuY3VycmVudCk7XG4gICAgICAgIH19XG4gICAgICAgIG9uU2VsZWN0RnJvbUdhbGxlcnk9eygpID0+IGNvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnNlbGVjdEZyb21HYWxsZXJ5KGNvbnRyb2xsZXIuZ2FsbGVyeUlucHV0UmVmLmN1cnJlbnQpfVxuICAgICAgICBvbkNsb3NlU291cmNlUGlja2VyPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5jbG9zZVNvdXJjZVBpY2tlcn1cbiAgICAgICAgb25SZXRyeVBlbmRpbmdVcGxvYWQ9eygpID0+IHtcbiAgICAgICAgICB2b2lkIGNvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnJldHJ5UGVuZGluZ1VwbG9hZCgpO1xuICAgICAgICB9fVxuICAgICAgICBvbk9wZW5DcmVhdGVkVGlja2V0PXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5vcGVuQ3JlYXRlZFRpY2tldH1cbiAgICAgICAgb25DbGVhclF1aWNrVGlja2V0RXJyb3I9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmNsZWFyRXJyb3J9XG4gICAgICAvPlxuXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGNvbnRyb2xsZXIuaXNMb2FkaW5nIHx8IGNvbnRyb2xsZXIuaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9fVxuICAgICAgPlxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XG4gICAgICA8L2Rpdj5cblxuICAgICAge2NvbnRyb2xsZXIuZXJyb3JNZXNzYWdlID8gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntjb250cm9sbGVyLmVycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxuXG4gICAgICB7IWNvbnRyb2xsZXIuaXNMb2FkaW5nICYmICFjb250cm9sbGVyLmlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSAmJiAhY29udHJvbGxlci5lcnJvck1lc3NhZ2UgJiYgY29udHJvbGxlci5oZWFkZXIgPyAoXG4gICAgICAgIDxFeHBlbnNlU2hlZXRIZWFkZXJGb3JtXG4gICAgICAgICAgaXNDcmVhdGVNb2RlPXtjb250cm9sbGVyLmlzQ3JlYXRlTW9kZX1cbiAgICAgICAgICBpc0VkaXRpbmc9e2NvbnRyb2xsZXIuaXNFZGl0aW5nfVxuICAgICAgICAgIGNhbkVkaXRIZWFkZXJGaWVsZHM9e2NvbnRyb2xsZXIuY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnR9XG4gICAgICAgICAgc3RhdHVzQ29tbWVudE1vZGU9e2NvbnRyb2xsZXIuc3RhdHVzQ29tbWVudE1vZGV9XG4gICAgICAgICAgaGVhZGVyPXtjb250cm9sbGVyLmhlYWRlcn1cbiAgICAgICAgICBwcm9qZWN0VmFsdWU9e2NvbnRyb2xsZXIucHJvamVjdFZhbHVlfVxuICAgICAgICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzPXtjb250cm9sbGVyLmlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzfVxuICAgICAgICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcz17Y29udHJvbGxlci5pc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXN9XG4gICAgICAgICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3k9e2NvbnRyb2xsZXIubm9ybWFsaXplZERyYWZ0Q3VycmVuY3l9XG4gICAgICAgICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5PXtjb250cm9sbGVyLmV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQ9e2NvbnRyb2xsZXIuZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50fVxuICAgICAgICAgIHNob3dFeGNoYW5nZVJhdGU9e2NvbnRyb2xsZXIuc2hvd0V4Y2hhbmdlUmF0ZX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVWYWx1ZT17Y29udHJvbGxlci5leGNoYW5nZVJhdGVWYWx1ZX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZT17Y29udHJvbGxlci5leGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZX1cbiAgICAgICAgICB0b3RhbEFtb3VudFRleHQ9e2NvbnRyb2xsZXIudG90YWxBbW91bnRUZXh0fVxuICAgICAgICAgIGRyYWZ0RGVzY3JpcHRpb249e2NvbnRyb2xsZXIuZHJhZnREZXNjcmlwdGlvbn1cbiAgICAgICAgICBkcmFmdFByb2plY3RJZD17Y29udHJvbGxlci5kcmFmdFByb2plY3RJZH1cbiAgICAgICAgICBkcmFmdEN1cnJlbmN5Q29kZT17Y29udHJvbGxlci5kcmFmdEN1cnJlbmN5Q29kZX1cbiAgICAgICAgICBkcmFmdEV4Y2hhbmdlUmF0ZT17Y29udHJvbGxlci5kcmFmdEV4Y2hhbmdlUmF0ZX1cbiAgICAgICAgICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zPXtjb250cm9sbGVyLmRyYWZ0RXN0YWRvQ29tZW50YXJpb3N9XG4gICAgICAgICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZT17Y29udHJvbGxlci5vZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlfVxuICAgICAgICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZT17Y29udHJvbGxlci5vZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGV9XG4gICAgICAgICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2U9e2NvbnRyb2xsZXIub2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2V9XG4gICAgICAgICAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlPXtjb250cm9sbGVyLnNldERyYWZ0RGVzY3JpcHRpb259XG4gICAgICAgICAgb25EcmFmdFByb2plY3RJZENoYW5nZT17Y29udHJvbGxlci5zZXREcmFmdFByb2plY3RJZH1cbiAgICAgICAgICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlPXtjb250cm9sbGVyLnNldERyYWZ0Q3VycmVuY3lDb2RlfVxuICAgICAgICAgIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2U9e2NvbnRyb2xsZXIuc2V0RHJhZnRFeGNoYW5nZVJhdGV9XG4gICAgICAgICAgb25EcmFmdEVzdGFkb0NvbWVudGFyaW9zQ2hhbmdlPXtjb250cm9sbGVyLnNldERyYWZ0RXN0YWRvQ29tZW50YXJpb3N9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgeyFjb250cm9sbGVyLmlzQ3JlYXRlTW9kZSAmJiAhY29udHJvbGxlci5pc0xvYWRpbmcgJiYgIWNvbnRyb2xsZXIuaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlICYmICFjb250cm9sbGVyLmVycm9yTWVzc2FnZSA/IChcbiAgICAgICAgPEV4cGVuc2VMaW5lc1RpbWVsaW5lXG4gICAgICAgICAgdmlzaWJsZUxpbmVzPXtjb250cm9sbGVyLnZpc2libGVMaW5lc31cbiAgICAgICAgICBjdXJyZW5jeUNvZGU9e3NhZmVUZXh0KGNvbnRyb2xsZXIuaGVhZGVyPy5jdXJyZW5jeUNvZGUpfVxuICAgICAgICAgIHRvdGFsTGluZVBhZ2VzPXtjb250cm9sbGVyLnRvdGFsTGluZVBhZ2VzfVxuICAgICAgICAgIGxpbmVQYWdlPXtjb250cm9sbGVyLmxpbmVQYWdlfVxuICAgICAgICAgIGxpbmVzTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0xpbmVzXCIsIFwiTGluZXNcIil9XG4gICAgICAgICAgZW1wdHlUZXh0PXtpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob0xpbmVzXCIsIFwiTm8gbGluZXMgZm9yIHRoaXMgZXhwZW5zZSBzaGVldC5cIil9XG4gICAgICAgICAgcGFnaW5hdGlvbkxhYmVscz17Y29udHJvbGxlci5wYWdpbmF0aW9uTGFiZWxzfVxuICAgICAgICAgIGNvbnRhaW5lclJlZj17Y29udHJvbGxlci5saW5lQ29udGFpbmVyUmVmfVxuICAgICAgICAgIG9uTGluZVBhZ2VDaGFuZ2U9e2NvbnRyb2xsZXIuc2V0TGluZVBhZ2V9XG4gICAgICAgICAgb25PcGVuTGluZT17Y29udHJvbGxlci5uYXZpZ2F0ZVRvTGluZURldGFpbH1cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7Y29udHJvbGxlci5zaG93U3RhdHVzQWN0aW9uQmFyID8gKFxuICAgICAgICA8RXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyXG4gICAgICAgICAgYWN0aW9ucz17Y29udHJvbGxlci5kZXRhaWxQb2xpY3kuc3RhdHVzQWN0aW9uc31cbiAgICAgICAgICBidXN5PXtjb250cm9sbGVyLmJ1c3kgfHwgY29udHJvbGxlci5pc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGV9XG4gICAgICAgICAgZGlzYWJsZWQ9e2NvbnRyb2xsZXIuYXJlU3RhdHVzQWN0aW9uc0Rpc2FibGVkfVxuICAgICAgICAgIG9uQWN0aW9uQ2xpY2s9e2NvbnRyb2xsZXIuaGFuZGxlU3RhdHVzQWN0aW9uQ2xpY2t9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cblxuICAgICAge2NvbnRyb2xsZXIuc2hvd0ZhYiA/IChcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXG4gICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfQWN0aW9uc1wiLCBcIkFjY2lvbmVzIHJcdTAwRTFwaWRhc1wiKX1cbiAgICAgICAgICBzaXplPXs3Nn1cbiAgICAgICAgICByaWdodD17MTZ9XG4gICAgICAgICAgYm90dG9tPXtjb250cm9sbGVyLnNob3dTdGF0dXNBY3Rpb25CYXIgPyBERVRBSUxfRkFCX0JPVFRPTV9XSVRIX0FDVElPTl9CQVIgOiAyNH1cbiAgICAgICAgICBtZW51QXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfQWN0aW9uc1wiLCBcIkFjY2lvbmVzIHJcdTAwRTFwaWRhc1wiKX1cbiAgICAgICAgICBtZW51SXRlbXM9e2NvbnRyb2xsZXIuZmFiTWVudUl0ZW1zfVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlxuY29uc3QgRXhwZW5zZVNoZWV0RGV0YWlsUGFnZSA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnMgZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQ+XG4gICAgICA8RXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRlbnQgLz5cbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxuICApO1xufTtcblxuY29uc3QgbW91bnQgPSAoKSA9PiB7XG4gIGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoKCk7XG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS1zaGVldC1kZXRhaWwtcm9vdFwiKTtcbiAgaWYgKCFyb290RWwpIHJldHVybjtcbiAgbW91bnRSZWFjdElzbGFuZChyb290RWwsIDxFeHBlbnNlU2hlZXREZXRhaWxQYWdlIC8+KTtcbn07XG5cbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXREZXRhaWxQYWdlO1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IEluZm9Qb3BvdmVySWNvbkJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0luZm9Qb3BvdmVySWNvbkJ1dHRvbi50c3hcIjtcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24udHN4XCI7XG5pbXBvcnQgRXhwZW5zZVJlYWRPbmx5RmllbGQgZnJvbSBcIi4vRXhwZW5zZVJlYWRPbmx5RmllbGQudHN4XCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlciwgZm9ybWF0RXhwZW5zZU51bWJlciB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XG5cbnR5cGUgRXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lTZWN0aW9uUHJvcHMgPSB7XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgY2FuRWRpdEhlYWRlckZpZWxkczogYm9vbGVhbjtcbiAgaXNGb3JlaWduQ3VycmVuY3k6IGJvb2xlYW47XG4gIGV4cGVuc2VDdXJyZW5jeUxhYmVsOiBzdHJpbmc7XG4gIGhlYWRlckN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBiYXNlQ3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGRyYWZ0RXhjaGFuZ2VSYXRlOiBzdHJpbmc7XG4gIGV4Y2hhbmdlUmF0ZVZhbHVlOiBzdHJpbmc7XG4gIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlOiBzdHJpbmc7XG4gIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudDogbnVtYmVyO1xuICBzaG93RXhjaGFuZ2VSYXRlOiBib29sZWFuO1xuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogYm9vbGVhbjtcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xuICBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZTogc3RyaW5nO1xuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG59O1xuXG4vLyBPd25zIHRoZSBjdXJyZW5jeSBhbmQgZXhjaGFuZ2UtcmF0ZSBVSSBzbyB0aGUgaGVhZGVyIGZvcm0gc3RheXMgY29tcGFjdC5cbmNvbnN0IEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvbiA9ICh7XG4gIGlzRWRpdGluZyxcbiAgY2FuRWRpdEhlYWRlckZpZWxkcyxcbiAgaXNGb3JlaWduQ3VycmVuY3ksXG4gIGV4cGVuc2VDdXJyZW5jeUxhYmVsLFxuICBoZWFkZXJDdXJyZW5jeUNvZGUsXG4gIGJhc2VDdXJyZW5jeUNvZGUsXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICBkcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgZXhjaGFuZ2VSYXRlVmFsdWUsXG4gIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlLFxuICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQsXG4gIHNob3dFeGNoYW5nZVJhdGUsXG4gIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXG4gIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlLFxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlLFxuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlLFxufTogRXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lTZWN0aW9uUHJvcHMpID0+IHtcbiAgY29uc3QgbG9jYWxDdXJyZW5jeU9wdGlvbnMgPSBSZWFjdC51c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oXG4gICAgKCkgPT4gW1xuICAgICAge1xuICAgICAgICB2YWx1ZTogYmFzZUN1cnJlbmN5Q29kZSxcbiAgICAgICAgdGV4dDogYmFzZUN1cnJlbmN5Q29kZSxcbiAgICAgICAgaWNvbjogPEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uIGN1cnJlbmN5Q29kZT17YmFzZUN1cnJlbmN5Q29kZX0gc2l6ZUNsYXNzTmFtZT1cImgtNiB3LTZcIiAvPixcbiAgICAgIH0sXG4gICAgXSxcbiAgICBbYmFzZUN1cnJlbmN5Q29kZV1cbiAgKTtcbiAgY29uc3QgaGVhZGVyQ3VycmVuY3lPcHRpb25zID0gUmVhY3QudXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KFxuICAgICgpID0+IFtcbiAgICAgIHtcbiAgICAgICAgdmFsdWU6IGhlYWRlckN1cnJlbmN5Q29kZSB8fCBcIi1cIixcbiAgICAgICAgdGV4dDogaGVhZGVyQ3VycmVuY3lDb2RlIHx8IFwiLVwiLFxuICAgICAgICBpY29uOiA8RXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gY3VycmVuY3lDb2RlPXtoZWFkZXJDdXJyZW5jeUNvZGUgfHwgXCItXCJ9IHNpemVDbGFzc05hbWU9XCJoLTYgdy02XCIgLz4sXG4gICAgICB9LFxuICAgIF0sXG4gICAgW2hlYWRlckN1cnJlbmN5Q29kZV1cbiAgKTtcblxuICBpZiAoaXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHMpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbTpjb2wtc3Bhbi0yIHNwYWNlLXktM1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGdyaWQgZ2FwLTQgJHtpc0ZvcmVpZ25DdXJyZW5jeSA/IFwiZ3JpZC1jb2xzLTJcIiA6IFwiZ3JpZC1jb2xzLTFcIn1gLnRyaW0oKX0+XG4gICAgICAgICAge2lzRm9yZWlnbkN1cnJlbmN5ID8gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57ZXhwZW5zZUN1cnJlbmN5TGFiZWx9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8RXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0XG4gICAgICAgICAgICAgICAgICBsYWJlbD17ZXhwZW5zZUN1cnJlbmN5TGFiZWx9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5X1BsYWNlaG9sZGVyXCIsIFwiQ3VycmVuY3kgY29kZVwiKX1cbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdEN1cnJlbmN5Q29kZX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmcgfHwgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXN9XG4gICAgICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZyB8fCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cbiAgICAgICAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLWhlYWRlci1jdXJyZW5jeVwiXG4gICAgICAgICAgICAgICAgICBwcmVmZXJEZWZhdWx0Q3VycmVuY3lGcm9tQ29udGV4dFxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgcHItOCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0V4Y2hhbmdlUmF0ZVwiLCBcIkV4Y2hhbmdlIHJhdGVcIil9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8SW5mb1BvcG92ZXJJY29uQnV0dG9uXG4gICAgICAgICAgICAgICAgICBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9JbmZvUG9wb3Zlcl9BcmlhXCIsIFwiU2hvdyBleGNoYW5nZSByYXRlIGluZm9ybWF0aW9uXCIpfVxuICAgICAgICAgICAgICAgICAgY29udGVudD17ZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSByaWdodC0wIC10b3AtMSB6LTIwXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9ybS1jb250cm9sICR7ZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UgPyBcImJvcmRlci1kYW5nZXIgcmluZy0xIHJpbmctZGFuZ2VyXCIgOiBcIlwifSAke2lzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwifWB9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRNb2RlPVwiZGVjaW1hbFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdEV4Y2hhbmdlUmF0ZX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17KGV2ZW50KSA9PlxuICAgICAgICAgICAgICAgICAgICAgIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2UoXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogNyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiA3LFxuICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsbGJhY2s6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9FeGNoYW5nZVJhdGVcIiwgXCJFeGNoYW5nZSByYXRlXCIpfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhjaGFuZ2VSYXRlXCIsIFwiRXhjaGFuZ2UgcmF0ZVwiKX1cbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9e2lzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lc31cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lc31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RcbiAgICAgICAgICAgICAgbGFiZWw9e2V4cGVuc2VDdXJyZW5jeUxhYmVsfVxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5X1BsYWNlaG9sZGVyXCIsIFwiQ3VycmVuY3kgY29kZVwiKX1cbiAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0Q3VycmVuY3lDb2RlfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmcgfHwgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXN9XG4gICAgICAgICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nIHx8IGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzfVxuICAgICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLWhlYWRlci1jdXJyZW5jeVwiXG4gICAgICAgICAgICAgIHByZWZlckRlZmF1bHRDdXJyZW5jeUZyb21Db250ZXh0XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHtpc0ZvcmVpZ25DdXJyZW5jeSA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfTG9jYWxDdXJyZW5jeVwiLCBcIkxvY2FsIGN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgICBvcHRpb25zPXtsb2NhbEN1cnJlbmN5T3B0aW9uc31cbiAgICAgICAgICAgICAgdmFsdWU9e2Jhc2VDdXJyZW5jeUNvZGV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiB1bmRlZmluZWR9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lfUGxhY2Vob2xkZXJcIiwgXCJDdXJyZW5jeSBjb2RlXCIpfVxuICAgICAgICAgICAgICByZWFkT25seVxuICAgICAgICAgICAgICBkaXNhYmxlZFxuICAgICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICAgICAgICAgIHNob3dTZWFyY2hCdXR0b249e2ZhbHNlfVxuICAgICAgICAgICAgICBzaG93TGFiZWxcbiAgICAgICAgICAgICAgdXNlUG9ydGFsPXtmYWxzZX1cbiAgICAgICAgICAgICAgc2VsZWN0ZWRUZXh0TW9kZT1cInZhbHVlXCJcbiAgICAgICAgICAgICAgZHJvcGRvd25NYXhIZWlnaHRDbGFzcz1cIm1heC1oLTk2XCJcbiAgICAgICAgICAgICAgc2VsZWN0ZWRJY29uQ2xhc3NOYW1lPVwiaC02IHctNlwiXG4gICAgICAgICAgICAgIG9wdGlvbkljb25DbGFzc05hbWU9XCJoLTYgdy02XCJcbiAgICAgICAgICAgICAgc2VsZWN0ZWRJbnB1dFBhZGRpbmdDbGFzc05hbWU9XCJwbC0xMlwiXG4gICAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtaGVhZGVyLWxvY2FsLWN1cnJlbmN5XCJcbiAgICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9BbW91bnRcIiwgXCJBbW91bnRcIil9PC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIGluZC1yZWFkb25seS1maWVsZFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1hdEV4cGVuc2VOdW1iZXIoZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LCB7XG4gICAgICAgICAgICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDcsXG4gICAgICAgICAgICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDcsXG4gICAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGZhbGxiYWNrOiBcIi1cIixcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9BbW91bnRcIiwgXCJBbW91bnRcIil9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHlcbiAgICAgICAgICAgICAgICBkaXNhYmxlZFxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgIHtpc0ZvcmVpZ25DdXJyZW5jeSAmJiBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSA/IDxwIGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyIHRleHQtc21cIj57ZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2V9PC9wPiA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICBvcHRpb25zPXtoZWFkZXJDdXJyZW5jeU9wdGlvbnN9XG4gICAgICAgIHZhbHVlPXtoZWFkZXJDdXJyZW5jeUNvZGUgfHwgXCItXCJ9XG4gICAgICAgIG9uQ2hhbmdlPXsoKSA9PiB1bmRlZmluZWR9XG4gICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lfUGxhY2Vob2xkZXJcIiwgXCJDdXJyZW5jeSBjb2RlXCIpfVxuICAgICAgICByZWFkT25seVxuICAgICAgICBkaXNhYmxlZFxuICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICAgIHNob3dTZWFyY2hCdXR0b249e2ZhbHNlfVxuICAgICAgICBzaG93TGFiZWxcbiAgICAgICAgdXNlUG9ydGFsPXtmYWxzZX1cbiAgICAgICAgc2VsZWN0ZWRUZXh0TW9kZT1cInZhbHVlXCJcbiAgICAgICAgZHJvcGRvd25NYXhIZWlnaHRDbGFzcz1cIm1heC1oLTk2XCJcbiAgICAgICAgc2VsZWN0ZWRJY29uQ2xhc3NOYW1lPVwiaC02IHctNlwiXG4gICAgICAgIG9wdGlvbkljb25DbGFzc05hbWU9XCJoLTYgdy02XCJcbiAgICAgICAgc2VsZWN0ZWRJbnB1dFBhZGRpbmdDbGFzc05hbWU9XCJwbC0xMlwiXG4gICAgICAgIGlkQmFzZT1cImV4cGVuc2UtaGVhZGVyLWN1cnJlbmN5LXJlYWRvbmx5XCJcbiAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgLz5cbiAgICAgIHshaXNFZGl0aW5nICYmIHNob3dFeGNoYW5nZVJhdGUgPyAoXG4gICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhjaGFuZ2VSYXRlXCIsIFwiRXhjaGFuZ2UgcmF0ZVwiKX0gdmFsdWU9e2V4Y2hhbmdlUmF0ZVZhbHVlfSAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgPC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb247XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZUxheW91dEVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0IHsgdXNlT3V0c2lkZUNsaWNrIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZU91dHNpZGVDbGljay50c1wiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5cbnR5cGUgSW5mb1BvcG92ZXJJY29uQnV0dG9uUHJvcHMgPSB7XG4gIGNvbnRlbnQ6IFJlYWN0LlJlYWN0Tm9kZTtcbiAgYXJpYUxhYmVsOiBzdHJpbmc7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XG59O1xuXG4vLyBTaGFyZWQgZHVtYiBwb3BvdmVyIHRyaWdnZXIgdXNlZCB0byBkaXNwbGF5IHNob3J0IGNvbnRleHR1YWwgaW5mby5cbmNvbnN0IEluZm9Qb3BvdmVySWNvbkJ1dHRvbiA9ICh7XG4gIGNvbnRlbnQsXG4gIGFyaWFMYWJlbCxcbiAgY2xhc3NOYW1lID0gXCJcIixcbiAgcGFuZWxDbGFzc05hbWUgPSBcIlwiLFxufTogSW5mb1BvcG92ZXJJY29uQnV0dG9uUHJvcHMpID0+IHtcbiAgY29uc3QgSE9SSVpPTlRBTF9WSUVXUE9SVF9HVVRURVJfUFggPSA4O1xuICBjb25zdCBWRVJUSUNBTF9WSUVXUE9SVF9HVVRURVJfUFggPSA4O1xuICBjb25zdCBQQU5FTF9UUklHR0VSX0dBUF9QWCA9IDY7XG4gIGNvbnN0IEdMT0JBTF9SQURJVVMgPSBcInZhcigtLXJhZGl1cy14bCwgNXB4KVwiO1xuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcGFuZWxTdHlsZSwgc2V0UGFuZWxTdHlsZV0gPSB1c2VTdGF0ZTxSZWFjdC5DU1NQcm9wZXJ0aWVzPih7XG4gICAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgICB0b3A6IDAsXG4gICAgbGVmdDogMCxcbiAgICB2aXNpYmlsaXR5OiBcImhpZGRlblwiLFxuICB9KTtcbiAgY29uc3QgYnV0dG9uUmVmID0gdXNlUmVmPEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHBhbmVsUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgdXNlT3V0c2lkZUNsaWNrKFtidXR0b25SZWYsIHBhbmVsUmVmXSwgKCkgPT4gc2V0SXNPcGVuKGZhbHNlKSk7XG4gIGNvbnN0IHVwZGF0ZVBhbmVsUG9zaXRpb24gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBidXR0b25FbGVtZW50ID0gYnV0dG9uUmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgcGFuZWxFbGVtZW50ID0gcGFuZWxSZWYuY3VycmVudDtcbiAgICBpZiAoIWJ1dHRvbkVsZW1lbnQgfHwgIXBhbmVsRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGJ1dHRvblJlY3QgPSBidXR0b25FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHBhbmVsUmVjdCA9IHBhbmVsRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB2aWV3cG9ydFdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgY29uc3Qgdmlld3BvcnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgY29uc3Qgc2FmZVdpZHRoID0gTWF0aC5taW4ocGFuZWxSZWN0LndpZHRoLCBNYXRoLm1heCgxODAsIHZpZXdwb3J0V2lkdGggLSBIT1JJWk9OVEFMX1ZJRVdQT1JUX0dVVFRFUl9QWCAqIDIpKTtcblxuICAgIGxldCBsZWZ0ID0gYnV0dG9uUmVjdC5sZWZ0ICsgYnV0dG9uUmVjdC53aWR0aCAvIDIgLSBzYWZlV2lkdGggLyAyO1xuICAgIGxlZnQgPSBNYXRoLm1heChIT1JJWk9OVEFMX1ZJRVdQT1JUX0dVVFRFUl9QWCwgTWF0aC5taW4obGVmdCwgdmlld3BvcnRXaWR0aCAtIHNhZmVXaWR0aCAtIEhPUklaT05UQUxfVklFV1BPUlRfR1VUVEVSX1BYKSk7XG5cbiAgICBsZXQgdG9wID0gYnV0dG9uUmVjdC5ib3R0b20gKyBQQU5FTF9UUklHR0VSX0dBUF9QWDtcbiAgICBjb25zdCBoYXNCb3R0b21PdmVyZmxvdyA9IHRvcCArIHBhbmVsUmVjdC5oZWlnaHQgKyBWRVJUSUNBTF9WSUVXUE9SVF9HVVRURVJfUFggPiB2aWV3cG9ydEhlaWdodDtcbiAgICBpZiAoaGFzQm90dG9tT3ZlcmZsb3cpIHtcbiAgICAgIGNvbnN0IHRvcEFib3ZlVHJpZ2dlciA9IGJ1dHRvblJlY3QudG9wIC0gcGFuZWxSZWN0LmhlaWdodCAtIFBBTkVMX1RSSUdHRVJfR0FQX1BYO1xuICAgICAgdG9wID0gdG9wQWJvdmVUcmlnZ2VyID49IFZFUlRJQ0FMX1ZJRVdQT1JUX0dVVFRFUl9QWFxuICAgICAgICA/IHRvcEFib3ZlVHJpZ2dlclxuICAgICAgICA6IE1hdGgubWF4KFZFUlRJQ0FMX1ZJRVdQT1JUX0dVVFRFUl9QWCwgdmlld3BvcnRIZWlnaHQgLSBwYW5lbFJlY3QuaGVpZ2h0IC0gVkVSVElDQUxfVklFV1BPUlRfR1VUVEVSX1BYKTtcbiAgICB9XG5cbiAgICBzZXRQYW5lbFN0eWxlKHtcbiAgICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXG4gICAgICB0b3A6IE1hdGgucm91bmQodG9wKSxcbiAgICAgIGxlZnQ6IE1hdGgucm91bmQobGVmdCksXG4gICAgICB3aWR0aDogTWF0aC5yb3VuZChzYWZlV2lkdGgpLFxuICAgICAgdmlzaWJpbGl0eTogXCJ2aXNpYmxlXCIsXG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNPcGVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHVwZGF0ZVBhbmVsUG9zaXRpb24oKTtcbiAgfSwgW2lzT3BlbiwgY29udGVudCwgdXBkYXRlUGFuZWxQb3NpdGlvbl0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc09wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaGFuZGxlVmlld3BvcnRDaGFuZ2UgPSAoKSA9PiB1cGRhdGVQYW5lbFBvc2l0aW9uKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgaGFuZGxlVmlld3BvcnRDaGFuZ2UpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhhbmRsZVZpZXdwb3J0Q2hhbmdlLCB0cnVlKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgaGFuZGxlVmlld3BvcnRDaGFuZ2UpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlVmlld3BvcnRDaGFuZ2UsIHRydWUpO1xuICAgIH07XG4gIH0sIFtpc09wZW4sIHVwZGF0ZVBhbmVsUG9zaXRpb25dKTtcblxuICBjb25zdCBwb3J0YWxUYXJnZXQgPSB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIgPyBudWxsIDogZG9jdW1lbnQuYm9keTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiaW5saW5lLWZsZXhcIiwgY2xhc3NOYW1lKX0+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHJlZj17YnV0dG9uUmVmfVxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsfVxuICAgICAgICBhcmlhLWV4cGFuZGVkPXtpc09wZW59XG4gICAgICAgIGFyaWEtaGFzcG9wdXA9XCJkaWFsb2dcIlxuICAgICAgICBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBoLTYgdy02IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXRyYW5zcGFyZW50IGJnLXRyYW5zcGFyZW50IHAtMCB0ZXh0LXNsYXRlLTUwMCB0cmFuc2l0aW9uIGhvdmVyOnRleHQtcHJpbWFyeSBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5LzMwXCJcbiAgICAgICAgc3R5bGU9e3sgYm9yZGVyUmFkaXVzOiBHTE9CQUxfUkFESVVTIH19XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzT3BlbigocHJldmlvdXMpID0+ICFwcmV2aW91cyl9XG4gICAgICA+XG4gICAgICAgIDxzdmdcbiAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgICB3aWR0aD1cIjIwXCJcbiAgICAgICAgICBoZWlnaHQ9XCIyMFwiXG4gICAgICAgICAgdmlld0JveD1cIjMgMyAxOCAxOFwiXG4gICAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgIHN0cm9rZT1cIiM2NDc0OGJcIlxuICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMS43NVwiXG4gICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcbiAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcbiAgICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImJsb2NrXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxyZWN0IHg9XCI0XCIgeT1cIjRcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiByeD1cIjNcIiByeT1cIjNcIiAvPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTIgOWguMDFcIiAvPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTEgMTJoMXY0aDFcIiAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvYnV0dG9uPlxuXG4gICAgICB7aXNPcGVuICYmIHBvcnRhbFRhcmdldFxuICAgICAgICA/IGNyZWF0ZVBvcnRhbChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgcmVmPXtwYW5lbFJlZn1cbiAgICAgICAgICAgICAgcm9sZT1cImRpYWxvZ1wiXG4gICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnBhbmVsU3R5bGUsIGJvcmRlclJhZGl1czogR0xPQkFMX1JBRElVUyB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgXCJ6LTM2MDAwMCBtaW4tdy1bMjIwcHhdIG1heC13LVtjYWxjKDEwMHZ3LTFyZW0pXSByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZSBwLTMgc2hhZG93LWxnXCIsXG4gICAgICAgICAgICAgICAgcGFuZWxDbGFzc05hbWVcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTJweF0gdGV4dC1zbGF0ZS03MDAgd2hpdGVzcGFjZS1wcmUtbGluZVwiPntjb250ZW50fTwvcD5cbiAgICAgICAgICAgIDwvZGl2PixcbiAgICAgICAgICAgIHBvcnRhbFRhcmdldFxuICAgICAgICAgIClcbiAgICAgICAgOiBudWxsfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSW5mb1BvcG92ZXJJY29uQnV0dG9uO1xuIiwgImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcblxudHlwZSBFeGNoYW5nZVJhdGVNb2RlVWlNZXRhID0ge1xuICBsYWJlbEtleTogc3RyaW5nO1xuICBmYWxsYmFjazogc3RyaW5nO1xufTtcblxuY29uc3QgRVhDSEFOR0VfUkFURV9NT0RFX01FVEE6IFJlY29yZDxFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNvZGUsIEV4Y2hhbmdlUmF0ZU1vZGVVaU1ldGE+ID0ge1xuICAwOiB7XG4gICAgbGFiZWxLZXk6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9PZmZpY2lhbFwiLFxuICAgIGZhbGxiYWNrOiBcIlQuQy4gT2ZpY2lhbFwiLFxuICB9LFxuICAxOiB7XG4gICAgbGFiZWxLZXk6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9NYW51YWxcIixcbiAgICBmYWxsYmFjazogXCJULkMuIE1hbnVhbFwiLFxuICB9LFxufTtcbmNvbnN0IEVYQ0hBTkdFX1JBVEVfTU9ERV9DT0RFUzogRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDb2RlW10gPSBbMCwgMV07XG5cbi8vIEtlZXBzIGV4Y2hhbmdlIHJhdGUgbW9kZSB2YWx1ZXMgY29uc3RyYWluZWQgdG8gbnVtZXJpYyAwIG9yIDEuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNvZGUgfCBudWxsID0+IHtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgaWYgKHBhcnNlZCA9PT0gMCB8fCBwYXJzZWQgPT09IDEpIHtcbiAgICByZXR1cm4gcGFyc2VkO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuLy8gQnVpbGRzIGZpeGVkIG9wdGlvbnMgZm9yIHRoZSBleGNoYW5nZSByYXRlIG1vZGUgZmlsdGVyLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlT3B0aW9ucyA9ICgpOiBFeHBlbnNlU2VsZWN0T3B0aW9uW10gPT4ge1xuICByZXR1cm4gRVhDSEFOR0VfUkFURV9NT0RFX0NPREVTXG4gICAgLm1hcCgoY29kZSkgPT4ge1xuICAgICAgY29uc3QgbWV0YSA9IEVYQ0hBTkdFX1JBVEVfTU9ERV9NRVRBW2NvZGVdO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IFN0cmluZyhjb2RlKSxcbiAgICAgICAgdGV4dDogaW5kVChtZXRhLmxhYmVsS2V5LCBtZXRhLmZhbGxiYWNrKSxcbiAgICAgIH07XG4gICAgfSk7XG59O1xuXG4vLyBSZXR1cm5zIGEgbG9jYWxpemVkIG1vZGUgbGFiZWwgb3IgZW1wdHkgdGV4dCBmb3Igbm9uLXNlbGVjdGVkIHZhbHVlcy5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlKHZhbHVlKTtcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IG51bGwpIHJldHVybiBcIlwiO1xuICBjb25zdCBtZXRhID0gRVhDSEFOR0VfUkFURV9NT0RFX01FVEFbbm9ybWFsaXplZF07XG4gIHJldHVybiBpbmRUKG1ldGEubGFiZWxLZXksIG1ldGEuZmFsbGJhY2spO1xufTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBpbmRGb3JtYXQsIGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRIZWFkZXIgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgRXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lTZWN0aW9uIGZyb20gXCIuL0V4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvbi50c3hcIjtcbmltcG9ydCBFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0IGZyb20gXCIuL0V4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVJlYWRPbmx5RmllbGQgZnJvbSBcIi4vRXhwZW5zZVJlYWRPbmx5RmllbGQudHN4XCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlU3RhdHVzTGFiZWwgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leGNoYW5nZVJhdGVFbnRyeU1vZGVDYXRhbG9nLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZU51bWJlciwgcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcblxudHlwZSBFeHBlbnNlU2hlZXRIZWFkZXJGb3JtUHJvcHMgPSB7XG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBjYW5FZGl0SGVhZGVyRmllbGRzOiBib29sZWFuO1xuICBzdGF0dXNDb21tZW50TW9kZTogXCJoaWRkZW5cIiB8IFwicmVhZFwiIHwgXCJlZGl0XCI7XG4gIGhlYWRlcjogRXhwZW5zZVNoZWV0SGVhZGVyO1xuICBwcm9qZWN0VmFsdWU6IHN0cmluZztcbiAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XG4gIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lczogYm9vbGVhbjtcbiAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3k6IHN0cmluZztcbiAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5OiBzdHJpbmc7XG4gIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudDogbnVtYmVyO1xuICBzaG93RXhjaGFuZ2VSYXRlOiBib29sZWFuO1xuICBleGNoYW5nZVJhdGVWYWx1ZTogc3RyaW5nO1xuICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZTogc3RyaW5nO1xuICB0b3RhbEFtb3VudFRleHQ6IHN0cmluZztcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xuICBkcmFmdFByb2plY3RJZDogc3RyaW5nO1xuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBkcmFmdEV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xuICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zOiBzdHJpbmc7XG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWU6IHN0cmluZztcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlOiBzdHJpbmc7XG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlOiBzdHJpbmc7XG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRQcm9qZWN0SWRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRFc3RhZG9Db21lbnRhcmlvc0NoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG59O1xuXG5jb25zdCBFWENIQU5HRV9SQVRFX01PREVfUFJFRklYX1BBVFRFUk4gPSAvXlRcXC4/Q1xcLj9cXHMqL2k7XG5cbi8vIFB1cmUgcHJlc2VudGF0aW9uYWwgaGVhZGVyIGZvcm0gZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsL2NyZWF0ZSBzY3JlZW5zLlxuY29uc3QgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybSA9ICh7XG4gIGlzQ3JlYXRlTW9kZSxcbiAgaXNFZGl0aW5nLFxuICBjYW5FZGl0SGVhZGVyRmllbGRzLFxuICBzdGF0dXNDb21tZW50TW9kZSxcbiAgaGVhZGVyLFxuICBwcm9qZWN0VmFsdWUsXG4gIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXG4gIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxuICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXG4gIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudCxcbiAgc2hvd0V4Y2hhbmdlUmF0ZSxcbiAgZXhjaGFuZ2VSYXRlVmFsdWUsXG4gIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlLFxuICB0b3RhbEFtb3VudFRleHQsXG4gIGRyYWZ0RGVzY3JpcHRpb24sXG4gIGRyYWZ0UHJvamVjdElkLFxuICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgZHJhZnRFeGNoYW5nZVJhdGUsXG4gIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSxcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZSxcbiAgb25EcmFmdFByb2plY3RJZENoYW5nZSxcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZSxcbiAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZSxcbiAgb25EcmFmdEVzdGFkb0NvbWVudGFyaW9zQ2hhbmdlLFxufTogRXhwZW5zZVNoZWV0SGVhZGVyRm9ybVByb3BzKSA9PiB7XG4gIGNvbnN0IGlzRm9yZWlnbkN1cnJlbmN5ID1cbiAgICBpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkcyAmJiBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSAhPT0gXCJcIiAmJiBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSAhPT0gZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5O1xuICBjb25zdCBleHBlbnNlQ3VycmVuY3lMYWJlbCA9IGlzRm9yZWlnbkN1cnJlbmN5XG4gICAgPyBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9FeHBlbnNlQ3VycmVuY3lcIiwgXCJFeHBlbnNlIGN1cnJlbmN5XCIpXG4gICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpO1xuICBjb25zdCBzdGF0dXNWYWx1ZSA9XG4gICAgaGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gbnVsbCB8fCBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzID09PSB1bmRlZmluZWRcbiAgICAgID8gXCItXCJcbiAgICAgIDogZ2V0RXhwZW5zZVN0YXR1c0xhYmVsKGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMpO1xuICBjb25zdCBoZWFkZXJDdXJyZW5jeUNvZGUgPSBzYWZlVGV4dChoZWFkZXIuY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBiYXNlQ3VycmVuY3lDb2RlID0gc2FmZVRleHQoZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBzdGF0dXNDb21tZW50VmFsdWUgPSBzYWZlVGV4dChoZWFkZXIuZXN0YWRvQ29tZW50YXJpb3MpO1xuICBjb25zdCBzaG93U3RhdHVzQ29tbWVudEZpZWxkID0gIWlzQ3JlYXRlTW9kZSAmJiBzdGF0dXNDb21tZW50TW9kZSAhPT0gXCJoaWRkZW5cIjtcbiAgY29uc3QgY2FuRWRpdFN0YXR1c0NvbW1lbnQgPSBpc0VkaXRpbmcgJiYgc3RhdHVzQ29tbWVudE1vZGUgPT09IFwiZWRpdFwiO1xuICBjb25zdCBwYXJzZWREcmFmdEV4Y2hhbmdlUmF0ZSA9IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dChkcmFmdEV4Y2hhbmdlUmF0ZSk7XG4gIGNvbnN0IHBhcnNlZE9mZmljaWFsUmF3UmF0ZSA9IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKTtcbiAgY29uc3QgYmFzZUV4Y2hhbmdlUmF0ZVZhbHVlID1cbiAgICBwYXJzZWREcmFmdEV4Y2hhbmdlUmF0ZSAhPSBudWxsXG4gICAgICA/IHBhcnNlZERyYWZ0RXhjaGFuZ2VSYXRlXG4gICAgICA6IHBhcnNlZE9mZmljaWFsUmF3UmF0ZSAhPSBudWxsXG4gICAgICAgID8gcGFyc2VkT2ZmaWNpYWxSYXdSYXRlICogZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50XG4gICAgICAgIDogbnVsbDtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlSW5mb1ZhbHVlID0gZm9ybWF0RXhwZW5zZU51bWJlcihcbiAgICBiYXNlRXhjaGFuZ2VSYXRlVmFsdWUgIT0gbnVsbCA/IGJhc2VFeGNoYW5nZVJhdGVWYWx1ZSAvIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudCA6IG51bGwsXG4gICAge1xuICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiA3LFxuICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiA3LFxuICAgICAgdXNlR3JvdXBpbmc6IGZhbHNlLFxuICAgICAgZmFsbGJhY2s6IFwiMC4wMDAwMDAwXCIsXG4gICAgfVxuICApO1xuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlVmFsdWUgPSBOdW1iZXIoaGVhZGVyLmV4Y2hhbmdlUmF0ZU1vZGUpID09PSAxID8gMSA6IDA7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZU1vZGVLZXkgPVxuICAgIGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSA9PT0gMVxuICAgICAgPyBcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0V4Y2hhbmdlUmF0ZU1vZGVfTWFudWFsXCJcbiAgICAgIDogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX09mZmljaWFsXCI7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZU1vZGVGYWxsYmFjayA9IGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSA9PT0gMSA/IFwiVC5DLiBNYW51YWxcIiA6IFwiVC5DLiBPZmljaWFsXCI7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCA9XG4gICAgKGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlTGFiZWwoZXhjaGFuZ2VSYXRlTW9kZVZhbHVlKSB8fCBpbmRUKGV4Y2hhbmdlUmF0ZU1vZGVLZXksIGV4Y2hhbmdlUmF0ZU1vZGVGYWxsYmFjaykpXG4gICAgICAucmVwbGFjZShFWENIQU5HRV9SQVRFX01PREVfUFJFRklYX1BBVFRFUk4sIFwiXCIpXG4gICAgICAudHJpbSgpXG4gICAgICAudG9Mb3dlckNhc2UoKSB8fCAoZXhjaGFuZ2VSYXRlTW9kZVZhbHVlID09PSAxID8gXCJtYW51YWxcIiA6IFwib2ZpY2lhbFwiKTtcbiAgY29uc3QgaGFzRW5kcG9pbnRFeGNoYW5nZVJhdGVEYXRhID1cbiAgICAhIXNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUpIHx8ICEhc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKSB8fCAhIXNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKTtcbiAgY29uc3QgZW5kcG9pbnRFeGNoYW5nZVJhdGVJbmZvRGF0ZSA9IHNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSkgfHwgaW5kVChcIkNvbW1vbl9Ob3RBdmFpbGFibGVcIiwgXCJOL0FcIik7XG4gIGNvbnN0IGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb1NvdXJjZSA9IHNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKVxuICAgIC5yZXBsYWNlKC9cXHMqXFwoW14oKV0qXFwpXFxzKi9nLCBcIiBcIilcbiAgICAucmVwbGFjZSgvXFxzezIsfS9nLCBcIiBcIilcbiAgICAudHJpbSgpIHx8IGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xuICBjb25zdCBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlID0gaW5kRm9ybWF0KFxuICAgIFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfSW5mb1BvcG92ZXJfRGV0YWlsXCIsXG4gICAgXCJUaXBvIGRlIGNhbWJpbyBvYnRlbmlkbyB7MH1cXG5GZWNoYTogezF9XFxuT3JpZ2VuOiB7Mn1cIixcbiAgICBzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKSB8fCBcIjAuMDAwMDAwMFwiLFxuICAgIGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb0RhdGUsXG4gICAgZW5kcG9pbnRFeGNoYW5nZVJhdGVJbmZvU291cmNlXG4gICk7XG4gIGNvbnN0IHN0b3JlZEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlID0gaW5kRm9ybWF0KFxuICAgIFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfSW5mb1BvcG92ZXJfU3RvcmVkXCIsXG4gICAgXCJUaXBvIGRlIGNhbWJpbyB7MH0gezF9XCIsXG4gICAgZXhjaGFuZ2VSYXRlTW9kZUxhYmVsLFxuICAgIGV4Y2hhbmdlUmF0ZUluZm9WYWx1ZVxuICApO1xuICBjb25zdCBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZSA9IGhhc0VuZHBvaW50RXhjaGFuZ2VSYXRlRGF0YSA/IGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UgOiBzdG9yZWRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZTtcblxuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInJlbGF0aXZlIHNoYWRvdy14cyBnbGFzcy1wYW5lbCBwLTQgc3BhY2UteS00IGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtMnhsXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgeyFpc0NyZWF0ZU1vZGUgPyAoXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU2hlZXRJZFwiLCBcIkV4cGVuc2Ugc2hlZXQgY29kZVwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtzYWZlVGV4dChoZWFkZXIuaG9qYUdhc3Rvc0lkKSB8fCBcIi1cIn1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgeyFpc0NyZWF0ZU1vZGUgPyA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1N0YXR1c1wiLCBcIlN0YXR1c1wiKX0gdmFsdWU9e3N0YXR1c1ZhbHVlfSAvPiA6IG51bGx9XG4gICAgICAgIHtzaG93U3RhdHVzQ29tbWVudEZpZWxkID8gKFxuICAgICAgICAgIGNhbkVkaXRTdGF0dXNDb21tZW50ID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZDpjb2wtc3Bhbi0yIHNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzQ29tbWVudFwiLCBcIlN0YXR1cyBjb21tZW50XCIpfTwvbGFiZWw+XG4gICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCByZXNpemUtbm9uZVwiXG4gICAgICAgICAgICAgICAgcm93cz17M31cbiAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRFc3RhZG9Db21lbnRhcmlvc31cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0RXN0YWRvQ29tZW50YXJpb3NDaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1N0YXR1c0NvbW1lbnRcIiwgXCJTdGF0dXMgY29tbWVudFwiKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1N0YXR1c0NvbW1lbnRcIiwgXCJTdGF0dXMgY29tbWVudFwiKX1cbiAgICAgICAgICAgICAgdmFsdWU9e3N0YXR1c0NvbW1lbnRWYWx1ZSB8fCBcIi1cIn1cbiAgICAgICAgICAgICAgZnVsbFdpZHRoXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIClcbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHtpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkcyA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNtOmNvbC1zcGFuLTIgc3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX08L2xhYmVsPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdERlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxuICAgICAgICAgICAgdmFsdWU9e3NhZmVUZXh0KGhlYWRlci5kZXNjcmlwdGlvbikgfHwgXCItXCJ9XG4gICAgICAgICAgICBmdWxsV2lkdGhcbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICB7aXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHMgPyAoXG4gICAgICAgICAgPEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXRcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Qcm9qZWN0XCIsIFwiUHJvamVjdFwiKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfUHJvamVjdF9QbGFjZWhvbGRlclwiLCBcIlByb2plY3QgaWRcIil9XG4gICAgICAgICAgICB2YWx1ZT17ZHJhZnRQcm9qZWN0SWR9XG4gICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdFByb2plY3RJZENoYW5nZX1cbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nIHx8ICFjYW5FZGl0SGVhZGVyRmllbGRzfVxuICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmcgfHwgIWNhbkVkaXRIZWFkZXJGaWVsZHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IHByb2plY3RWYWx1ZSA/IChcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfSB2YWx1ZT17cHJvamVjdFZhbHVlfSAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvblxuICAgICAgICAgIGlzRWRpdGluZz17aXNFZGl0aW5nfVxuICAgICAgICAgIGNhbkVkaXRIZWFkZXJGaWVsZHM9e2NhbkVkaXRIZWFkZXJGaWVsZHN9XG4gICAgICAgICAgaXNGb3JlaWduQ3VycmVuY3k9e2lzRm9yZWlnbkN1cnJlbmN5fVxuICAgICAgICAgIGV4cGVuc2VDdXJyZW5jeUxhYmVsPXtleHBlbnNlQ3VycmVuY3lMYWJlbH1cbiAgICAgICAgICBoZWFkZXJDdXJyZW5jeUNvZGU9e2hlYWRlckN1cnJlbmN5Q29kZX1cbiAgICAgICAgICBiYXNlQ3VycmVuY3lDb2RlPXtiYXNlQ3VycmVuY3lDb2RlfVxuICAgICAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlPXtkcmFmdEN1cnJlbmN5Q29kZX1cbiAgICAgICAgICBkcmFmdEV4Y2hhbmdlUmF0ZT17ZHJhZnRFeGNoYW5nZVJhdGV9XG4gICAgICAgICAgZXhjaGFuZ2VSYXRlVmFsdWU9e2V4Y2hhbmdlUmF0ZVZhbHVlfVxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlPXtleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQ9e2V4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudH1cbiAgICAgICAgICBzaG93RXhjaGFuZ2VSYXRlPXtzaG93RXhjaGFuZ2VSYXRlfVxuICAgICAgICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzPXtpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cbiAgICAgICAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXM9e2lzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lc31cbiAgICAgICAgICBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZT17ZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2V9XG4gICAgICAgICAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZT17b25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZX1cbiAgICAgICAgICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlPXtvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlfVxuICAgICAgICAvPlxuICAgICAgICB7IWlzQ3JlYXRlTW9kZSA/IDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVG90YWxBbW91bnRcIiwgXCJUb3RhbCBhbW91bnRcIil9IHZhbHVlPXt0b3RhbEFtb3VudFRleHR9IC8+IDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldEhlYWRlckZvcm07XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IENvbXBhY3RQYWdpbmF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29tcGFjdFBhZ2luYXRpb24udHN4XCI7XG5pbXBvcnQgeyBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kgfSBmcm9tIFwiLi4vZXhwZW5zZUZvcm1hdHRlcnMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0TGluZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEYXRlUGFydHMsIHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgRXhwZW5zZVNlY3Rpb25EaXZpZGVyIGZyb20gXCIuL0V4cGVuc2VTZWN0aW9uRGl2aWRlci50c3hcIjtcbmltcG9ydCBFeHBlbnNlVGltZWxpbmVDYXJkIGZyb20gXCIuL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4XCI7XG5cbnR5cGUgUGFnaW5hdGlvbkxhYmVscyA9IHtcbiAgZmlyc3Q6IHN0cmluZztcbiAgcHJldjogc3RyaW5nO1xuICBuZXh0OiBzdHJpbmc7XG4gIGxhc3Q6IHN0cmluZztcbn07XG5cbnR5cGUgRXhwZW5zZUxpbmVzVGltZWxpbmVQcm9wcyA9IHtcbiAgdmlzaWJsZUxpbmVzOiBFeHBlbnNlU2hlZXRMaW5lW107XG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICB0b3RhbExpbmVQYWdlczogbnVtYmVyO1xuICBsaW5lUGFnZTogbnVtYmVyO1xuICBsaW5lc0xhYmVsOiBzdHJpbmc7XG4gIGVtcHR5VGV4dDogc3RyaW5nO1xuICBwYWdpbmF0aW9uTGFiZWxzOiBQYWdpbmF0aW9uTGFiZWxzO1xuICBjb250YWluZXJSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xuICBvbkxpbmVQYWdlQ2hhbmdlOiAocGFnZTogbnVtYmVyKSA9PiB2b2lkO1xuICBvbk9wZW5MaW5lOiAobGluZVJlY0lkOiBzdHJpbmcpID0+IHZvaWQ7XG59O1xuXG4vLyBEdW1iIHRpbWVsaW5lIGZvciBleHBlbnNlIHNoZWV0IGxpbmVzIHdpdGggc3RhbmRhcmQgY2FyZCBhbmQgcGFnaW5hdGlvbiBsYXlvdXQuXG5jb25zdCBFeHBlbnNlTGluZXNUaW1lbGluZSA9ICh7XG4gIHZpc2libGVMaW5lcyxcbiAgY3VycmVuY3lDb2RlLFxuICB0b3RhbExpbmVQYWdlcyxcbiAgbGluZVBhZ2UsXG4gIGxpbmVzTGFiZWwsXG4gIGVtcHR5VGV4dCxcbiAgcGFnaW5hdGlvbkxhYmVscyxcbiAgY29udGFpbmVyUmVmLFxuICBvbkxpbmVQYWdlQ2hhbmdlLFxuICBvbk9wZW5MaW5lLFxufTogRXhwZW5zZUxpbmVzVGltZWxpbmVQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNwYWNlLXktMFwiPlxuICAgICAgPEV4cGVuc2VTZWN0aW9uRGl2aWRlciBsYWJlbD17bGluZXNMYWJlbH0gY2xhc3NOYW1lPVwiZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXItLXNwYWNlZFwiIC8+XG5cbiAgICAgIHt2aXNpYmxlTGluZXMubGVuZ3RoID09PSAwID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveCB0aW1lbGluZS1lbXB0eVwiIGRhdGEtZW1wdHktdGV4dD17ZW1wdHlUZXh0fSAvPlxuICAgICAgKSA6IChcbiAgICAgICAgPGRpdiByZWY9e2NvbnRhaW5lclJlZn0gY2xhc3NOYW1lPVwidGltZWxpbmUtYm94XCI+XG4gICAgICAgICAge3Zpc2libGVMaW5lcy5tYXAoKGxpbmUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsaW5lSWQgPSBzYWZlVGV4dChsaW5lLmxpbmVSZWNJZCk7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHNhZmVUZXh0KGxpbmUuZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgY29uc3QgYW1vdW50VGV4dCA9IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShsaW5lLmFtb3VudCA/PyBudWxsLCBjdXJyZW5jeUNvZGUpO1xuICAgICAgICAgICAgY29uc3QgbGlua2VkVGlja2V0RmlsZUlkID0gc2FmZVRleHQobGluZS5maWxlSWQpO1xuICAgICAgICAgICAgY29uc3QgZGF0ZVBhcnRzID0gZm9ybWF0RXhwZW5zZURhdGVQYXJ0cyhzYWZlVGV4dChsaW5lLnRyYW5zRGF0ZSksIGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiKTtcbiAgICAgICAgICAgIGNvbnN0IHRpY2tldFN0YXR1c0ljb24gPSBsaW5rZWRUaWNrZXRGaWxlSWQgPyAoXG4gICAgICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXG4gICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9ezEuNX1cbiAgICAgICAgICAgICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtNCB3LTRcIlxuICAgICAgICAgICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxuICAgICAgICAgICAgICAgICAgZD1cIk0xMy4xOSA4LjY4OGE0LjUgNC41IDAgMCAxIDEuMjQyIDcuMjQ0bC00LjUgNC41YTQuNSA0LjUgMCAwIDEtNi4zNjQtNi4zNjRsMS43NTctMS43NTdtMTMuMzUtLjYyMiAxLjc1Ny0xLjc1N2E0LjUgNC41IDAgMCAwLTYuMzY0LTYuMzY0bC00LjUgNC41YTQuNSA0LjUgMCAwIDAgMS4yNDIgNy4yNDRcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgKSA6IG51bGw7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtgJHtsaW5lSWR9LSR7aW5kZXh9YH0gY2xhc3NOYW1lPVwidGltZWxpbmUtaXRlbVwiPlxuICAgICAgICAgICAgICAgIDxFeHBlbnNlVGltZWxpbmVDYXJkXG4gICAgICAgICAgICAgICAgICBkYXRlUGFydHM9e2RhdGVQYXJ0c31cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXtkZXNjcmlwdGlvbiB8fCBsaW5lSWQgfHwgXCItXCJ9XG4gICAgICAgICAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxuICAgICAgICAgICAgICAgICAgb25PcGVuPXsoKSA9PiBvbk9wZW5MaW5lKGxpbmVJZCl9XG4gICAgICAgICAgICAgICAgICB0aXRsZUNsYXNzTmFtZT1cInRpbWVsaW5lLW5hbWUgZXhwZW5zZS1saW5lLWNhcmRfX3RpdGxlXCJcbiAgICAgICAgICAgICAgICAgIHN0YXR1c0ljb249e3RpY2tldFN0YXR1c0ljb259XG4gICAgICAgICAgICAgICAgICBzdGF0dXNJY29uQ2xhc3NOYW1lPVwiZXhwZW5zZS1saW5lLWNhcmRfX3RpY2tldC1pY29uXCJcbiAgICAgICAgICAgICAgICAgIHN0YXR1c0xhYmVsPXtsaW5rZWRUaWNrZXRGaWxlSWQgfHwgdW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICA8Q29tcGFjdFBhZ2luYXRpb25cbiAgICAgICAgdG90YWxQYWdlcz17dG90YWxMaW5lUGFnZXN9XG4gICAgICAgIGN1cnJlbnRQYWdlPXtsaW5lUGFnZX1cbiAgICAgICAgb25QYWdlQ2hhbmdlPXtvbkxpbmVQYWdlQ2hhbmdlfVxuICAgICAgICBsYWJlbHM9e3BhZ2luYXRpb25MYWJlbHN9XG4gICAgICAvPlxuICAgIDwvc2VjdGlvbj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VMaW5lc1RpbWVsaW5lO1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQYWdlQm90dG9tQWN0aW9ucywgeyBQYWdlQm90dG9tQWN0aW9uQnV0dG9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9QYWdlQm90dG9tQWN0aW9ucy50c3hcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb24gfSBmcm9tIFwiLi9leHBlbnNlU2hlZXREZXRhaWxQb2xpY3kudHNcIjtcblxudHlwZSBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25CYXJQcm9wcyA9IHtcbiAgYWN0aW9uczogRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uW107XG4gIGJ1c3k6IGJvb2xlYW47XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgb25BY3Rpb25DbGljazogKGFjdGlvbjogRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uKSA9PiB2b2lkO1xufTtcblxuLy8gUmVuZGVycyB0aGUgYm90dG9tIHRvb2xiYXIgZm9yIGV4cGVuc2Ugc2hlZXQgc3RhdHVzIHRyYW5zaXRpb25zLlxuY29uc3QgRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyID0gKHsgYWN0aW9ucywgYnVzeSwgZGlzYWJsZWQgPSBmYWxzZSwgb25BY3Rpb25DbGljayB9OiBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25CYXJQcm9wcykgPT4ge1xuICBpZiAoYWN0aW9ucy5sZW5ndGggPCAxKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxQYWdlQm90dG9tQWN0aW9ucyBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0JvdHRvbUFjdGlvbnNfVG9vbGJhclwiLCBcIkV4cGVuc2Ugc2hlZXQgc3RhdHVzIGFjdGlvbnNcIil9PlxuICAgICAge2FjdGlvbnMubWFwKChhY3Rpb24pID0+IChcbiAgICAgICAgPFBhZ2VCb3R0b21BY3Rpb25CdXR0b25cbiAgICAgICAgICBrZXk9e2FjdGlvbi5pZH1cbiAgICAgICAgICBsYWJlbD17aW5kVChhY3Rpb24ubGFiZWxLZXksIGFjdGlvbi5mYWxsYmFjayl9XG4gICAgICAgICAgZGlzYWJsZWQ9e2J1c3kgfHwgZGlzYWJsZWR9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4gb25BY3Rpb25DbGljayhhY3Rpb24pfVxuICAgICAgICAvPlxuICAgICAgKSl9XG4gICAgPC9QYWdlQm90dG9tQWN0aW9ucz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbkJhcjtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VRdWlja1RpY2tldFByb2dyZXNzT3ZlcmxheSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlUXVpY2tUaWNrZXRQcm9ncmVzc092ZXJsYXkudHN4XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IFRJQ0tFVF9JTUFHRV9BQ0NFUFRfQVRUUklCVVRFIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93Q29yZS50c1wiO1xuXG50eXBlIEV4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzUHJvcHMgPSB7XG4gIG1vZGFsOiB7XG4gICAgb3BlbjogYm9vbGVhbjtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICBjb25maXJtVGV4dD86IHN0cmluZztcbiAgICBjYW5jZWxUZXh0Pzogc3RyaW5nO1xuICAgIHNob3dDYW5jZWw/OiBib29sZWFuO1xuICAgIHNob3dDb25maXJtPzogYm9vbGVhbjtcbiAgfTtcbiAgbW9kYWxFcnJvcjogc3RyaW5nO1xuICBzdGF0dXM6IHN0cmluZztcbiAgYnVzeTogYm9vbGVhbjtcbiAgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlOiBib29sZWFuO1xuICBtb2RhbExvYWRpbmdUZXh0OiBzdHJpbmc7XG4gIG1vZGFsQ2FuY2VsVGV4dDogc3RyaW5nO1xuICBtb2RhbENvbmZpcm1UZXh0OiBzdHJpbmc7XG4gIGNhbWVyYUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xuICBnYWxsZXJ5SW5wdXRSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XG4gIHNvdXJjZVBpY2tlck9wZW46IGJvb2xlYW47XG4gIHF1aWNrVGlja2V0QnVzeTogYm9vbGVhbjtcbiAgcXVpY2tUaWNrZXRQcm9ncmVzc01lc3NhZ2U6IHN0cmluZztcbiAgcXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlczogQXJyYXk8e1xuICAgIGtleTogc3RyaW5nO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBzdGF0ZTogXCJjb21wbGV0ZWRcIiB8IFwiYWN0aXZlXCIgfCBcInBlbmRpbmdcIjtcbiAgfT47XG4gIHF1aWNrVGlja2V0RWxhcHNlZE1zOiBudW1iZXI7XG4gIHF1aWNrVGlja2V0RXJyb3JNZXNzYWdlOiBzdHJpbmc7XG4gIHF1aWNrVGlja2V0QXR0ZW1wdElkOiBzdHJpbmc7XG4gIHF1aWNrVGlja2V0VHJhY2VMaXN0OiBBcnJheTx7IHN0ZXA6IHN0cmluZzsgdHJhY2VJZDogc3RyaW5nOyBhdDogc3RyaW5nIH0+O1xuICBoYXNQZW5kaW5nVXBsb2FkUmV0cnk6IGJvb2xlYW47XG4gIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlOiBib29sZWFuO1xuICBvbkNvbmZpcm06ICgpID0+IHZvaWQ7XG4gIG9uQ2FuY2VsOiAoKSA9PiB2b2lkO1xuICBvblNlbGVjdGVkQ2FtZXJhRmlsZTogKGZpbGU6IEZpbGUgfCBudWxsKSA9PiB2b2lkO1xuICBvblNlbGVjdGVkR2FsbGVyeUZpbGU6IChmaWxlOiBGaWxlIHwgbnVsbCkgPT4gdm9pZDtcbiAgb25TZWxlY3RGcm9tQ2FtZXJhOiAoKSA9PiB2b2lkO1xuICBvblNlbGVjdEZyb21HYWxsZXJ5OiAoKSA9PiB2b2lkO1xuICBvbkNsb3NlU291cmNlUGlja2VyOiAoKSA9PiB2b2lkO1xuICBvblJldHJ5UGVuZGluZ1VwbG9hZDogKCkgPT4gdm9pZDtcbiAgb25PcGVuQ3JlYXRlZFRpY2tldDogKCkgPT4gdm9pZDtcbiAgb25DbGVhclF1aWNrVGlja2V0RXJyb3I6ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBSZW5kZXJzIG1vZGFsIGFuZCBxdWljay10aWNrZXQgb3ZlcmxheXMgZm9yIHRoZSBleHBlbnNlIHNoZWV0IGRldGFpbCBwYWdlLlxuY29uc3QgRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXMgPSAoe1xuICBtb2RhbCxcbiAgbW9kYWxFcnJvcixcbiAgc3RhdHVzLFxuICBidXN5LFxuICBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsXG4gIG1vZGFsTG9hZGluZ1RleHQsXG4gIG1vZGFsQ2FuY2VsVGV4dCxcbiAgbW9kYWxDb25maXJtVGV4dCxcbiAgY2FtZXJhSW5wdXRSZWYsXG4gIGdhbGxlcnlJbnB1dFJlZixcbiAgc291cmNlUGlja2VyT3BlbixcbiAgcXVpY2tUaWNrZXRCdXN5LFxuICBxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSxcbiAgcXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlcyxcbiAgcXVpY2tUaWNrZXRFbGFwc2VkTXMsXG4gIHF1aWNrVGlja2V0RXJyb3JNZXNzYWdlLFxuICBxdWlja1RpY2tldEF0dGVtcHRJZCxcbiAgcXVpY2tUaWNrZXRUcmFjZUxpc3QsXG4gIGhhc1BlbmRpbmdVcGxvYWRSZXRyeSxcbiAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmUsXG4gIG9uQ29uZmlybSxcbiAgb25DYW5jZWwsXG4gIG9uU2VsZWN0ZWRDYW1lcmFGaWxlLFxuICBvblNlbGVjdGVkR2FsbGVyeUZpbGUsXG4gIG9uU2VsZWN0RnJvbUNhbWVyYSxcbiAgb25TZWxlY3RGcm9tR2FsbGVyeSxcbiAgb25DbG9zZVNvdXJjZVBpY2tlcixcbiAgb25SZXRyeVBlbmRpbmdVcGxvYWQsXG4gIG9uT3BlbkNyZWF0ZWRUaWNrZXQsXG4gIG9uQ2xlYXJRdWlja1RpY2tldEVycm9yLFxufTogRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXNQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8Q29uZmlybU1vZGFsXG4gICAgICAgIG9wZW49e21vZGFsLm9wZW59XG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cbiAgICAgICAgY29uZmlybVRleHQ9e21vZGFsQ29uZmlybVRleHR9XG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsTG9hZGluZ1RleHR9XG4gICAgICAgIHNob3dDYW5jZWw9e21vZGFsLnNob3dDYW5jZWx9XG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cbiAgICAgICAgYnVzeT17YnVzeSB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGV9XG4gICAgICAgIGVycm9yPXttb2RhbEVycm9yfVxuICAgICAgICBzdGF0dXM9e3N0YXR1c31cbiAgICAgICAgb25Db25maXJtPXtvbkNvbmZpcm19XG4gICAgICAgIG9uQ2FuY2VsPXtvbkNhbmNlbH1cbiAgICAgIC8+XG5cbiAgICAgIDxpbnB1dFxuICAgICAgICByZWY9e2NhbWVyYUlucHV0UmVmfVxuICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgIGFjY2VwdD17VElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEV9XG4gICAgICAgIGNhcHR1cmU9XCJlbnZpcm9ubWVudFwiXG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBmaWxlID0gZXZlbnQuY3VycmVudFRhcmdldC5maWxlcz8uWzBdIHx8IG51bGw7XG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgb25TZWxlY3RlZENhbWVyYUZpbGUoZmlsZSk7XG4gICAgICAgIH19XG4gICAgICAvPlxuXG4gICAgICA8aW5wdXRcbiAgICAgICAgcmVmPXtnYWxsZXJ5SW5wdXRSZWZ9XG4gICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgYWNjZXB0PXtUSUNLRVRfSU1BR0VfQUNDRVBUX0FUVFJJQlVURX1cbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZpbGUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmZpbGVzPy5bMF0gfHwgbnVsbDtcbiAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgICBvblNlbGVjdGVkR2FsbGVyeUZpbGUoZmlsZSk7XG4gICAgICAgIH19XG4gICAgICAvPlxuXG4gICAgICB7c291cmNlUGlja2VyT3BlbiA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNjAwMDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTk1MC80NSBweC00IHB5LTZcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtYXgtdy1zbSByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZSBwLTQgc2hhZG93LXhsXCI+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1bMTZweF0gZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9UaXRsZVwiLCBcIk51ZXZvIHRpY2tldFwiKX1cbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0xIHRleHQtc20gdGV4dC1zbGF0ZS02MDBcIj5cbiAgICAgICAgICAgICAge2luZFQoXG4gICAgICAgICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfQm9keVwiLFxuICAgICAgICAgICAgICAgIFwiU2VsZWNjaW9uYSB1bmEgZnVlbnRlIHBhcmEgY2FwdHVyYXIgbyBlbGVnaXIgbGEgaW1hZ2VuIGRlbCB0aWNrZXQuXCJcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IGdyaWQgZ3JpZC1jb2xzLTEgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCIgb25DbGljaz17b25TZWxlY3RGcm9tQ2FtZXJhfT5cbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9DYW1lcmFcIiwgXCJVc2FyIGNcdTAwRTFtYXJhXCIpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCIgb25DbGljaz17b25TZWxlY3RGcm9tR2FsbGVyeX0+XG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfR2FsbGVyeVwiLCBcIkVsZWdpciBpbWFnZW5cIil9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIiBvbkNsaWNrPXtvbkNsb3NlU291cmNlUGlja2VyfT5cbiAgICAgICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIil9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIDxFeHBlbnNlUXVpY2tUaWNrZXRQcm9ncmVzc092ZXJsYXlcbiAgICAgICAgb3Blbj17cXVpY2tUaWNrZXRCdXN5fVxuICAgICAgICB0aXRsZT17aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX1RpdGxlXCIsIFwiUHJvY2Vzc2luZyB0aWNrZXRcIil9XG4gICAgICAgIHN1bW1hcnk9e3F1aWNrVGlja2V0UHJvZ3Jlc3NNZXNzYWdlIHx8IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XG4gICAgICAgIGVsYXBzZWRNcz17cXVpY2tUaWNrZXRFbGFwc2VkTXN9XG4gICAgICAgIHN0YWdlcz17cXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlc31cbiAgICAgIC8+XG5cbiAgICAgIHtxdWlja1RpY2tldEVycm9yTWVzc2FnZSA/IChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZVxuICAgICAgICAgICAgICA/IFwiZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgc3BhY2UteS0yIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItYW1iZXItMjAwIGJnLWFtYmVyLTUwIHAtMyB0ZXh0LXNtIHRleHQtYW1iZXItOTAwXCJcbiAgICAgICAgICAgICAgOiBcImdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIHNwYWNlLXktMiByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXJvc2UtNTAgcC0zIHRleHQtc20gdGV4dC1yb3NlLTgwMFwiXG4gICAgICAgICAgfVxuICAgICAgICA+XG4gICAgICAgICAgPHA+e3F1aWNrVGlja2V0RXJyb3JNZXNzYWdlfTwvcD5cbiAgICAgICAgICB7cXVpY2tUaWNrZXRBdHRlbXB0SWQgPyAoXG4gICAgICAgICAgICA8cFxuICAgICAgICAgICAgICBjbGFzc05hbWU9e1xuICAgICAgICAgICAgICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlXG4gICAgICAgICAgICAgICAgICA/IFwicm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLWFtYmVyLTIwMCBiZy13aGl0ZSBweC0yIHB5LTEgZm9udC1tb25vIHRleHQtWzExcHhdIHRleHQtYW1iZXItOTAwIGJyZWFrLWFsbFwiXG4gICAgICAgICAgICAgICAgICA6IFwicm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXdoaXRlIHB4LTIgcHktMSBmb250LW1vbm8gdGV4dC1bMTFweF0gdGV4dC1yb3NlLTgwMCBicmVhay1hbGxcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtgYXR0ZW1wdElkOiAke3F1aWNrVGlja2V0QXR0ZW1wdElkfWB9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgICAgICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmVcbiAgICAgICAgICAgICAgICAgID8gXCJyb3VuZGVkLWxnIGJvcmRlciBib3JkZXItYW1iZXItMjAwIGJnLXdoaXRlIHAtMiB0ZXh0LXhzIHRleHQtYW1iZXItODAwXCJcbiAgICAgICAgICAgICAgICAgIDogXCJyb3VuZGVkLWxnIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctd2hpdGUgcC0yIHRleHQteHMgdGV4dC1yb3NlLTcwMFwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lm1hcCgoZW50cnkpID0+IChcbiAgICAgICAgICAgICAgICA8cCBrZXk9e2Ake2VudHJ5LnN0ZXB9LSR7ZW50cnkuYXR9YH0+e2Ake2VudHJ5LnN0ZXB9OiAke2VudHJ5LnRyYWNlSWR9YH08L3A+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMlwiPlxuICAgICAgICAgICAge2hhc1BhcnRpYWxUaWNrZXRGYWlsdXJlID8gKFxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCIgb25DbGljaz17b25PcGVuQ3JlYXRlZFRpY2tldH0+XG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9PcGVuQ3JlYXRlZFRpY2tldFwiLCBcIk9wZW4gY3JlYXRlZCB0aWNrZXRcIil9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICB7aGFzUGVuZGluZ1VwbG9hZFJldHJ5ID8gKFxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCIgb25DbGljaz17b25SZXRyeVBlbmRpbmdVcGxvYWR9PlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUmV0cnlVcGxvYWRcIiwgXCJSZWludGVudGFyIHVwbG9hZFwiKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIiBvbkNsaWNrPXtvbkNsZWFyUXVpY2tUaWNrZXRFcnJvcn0+XG4gICAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0Nsb3NlXCIsIFwiQ2xvc2VcIil9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cbiAgICA8Lz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzO1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcbmltcG9ydCB7IHVzZUF1dGhDb250ZXh0IH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XG5pbXBvcnQgeyB1c2VUaW1lbGluZUNhcmRFZmZlY3RzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRpbWVsaW5lQ2FyZEVmZmVjdHMudHNcIjtcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyBpbmRGb3JtYXQsIGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VOdW1iZXIgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xuaW1wb3J0IHsgY29uZmlndXJlRXhwZW5zZUFwaUF1dGggfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHsgaXNNYW5hZ2luZ090aGVyRXhwZW5zZVJlY29yZCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTWFuYWdlZFVzZXJTY29wZS50c1wiO1xuaW1wb3J0IHsgbmF2aWdhdGVUb0V4cGVuc2VVcmwsIHJlbG9hZEV4cGVuc2VQYWdlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQudHNcIjtcbmltcG9ydCB7IGdldEV4cGVuc2VTdGF0dXNMYWJlbCB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVN0YXR1c0NhdGFsb2cudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9ucy50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0RmxvdyB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvdy50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlIH0gZnJvbSBcIi4uL2xpc3QvdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlLnRzXCI7XG5cbmNvbnN0IExJTkVTX1BBR0VfU0laRSA9IDY7XG5jb25zdCBFWFBFTlNFX1NUQVRVU19BUFBST1ZBTF9SRVFVRVNURUQgPSAxO1xuXG5jb25zdCBwYWdlZFNsaWNlID0gPFQsPihpdGVtczogVFtdLCBwYWdlOiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIpOiBUW10gPT4ge1xuICBpZiAoIWl0ZW1zLmxlbmd0aCkgcmV0dXJuIFtdO1xuICBjb25zdCBzYWZlUGFnZSA9IE1hdGgubWF4KDEsIHBhZ2UpO1xuICBjb25zdCBzdGFydCA9IChzYWZlUGFnZSAtIDEpICogcGFnZVNpemU7XG4gIHJldHVybiBpdGVtcy5zbGljZShzdGFydCwgc3RhcnQgKyBwYWdlU2l6ZSk7XG59O1xuXG4vLyBUcmVhdHMgb25seSBwb3NpdGl2ZSBudW1lcmljIHRvdGFscyBhcyBhY3Rpb25hYmxlIHNoZWV0IGNvbnRlbnQuXG5jb25zdCBoYXNQb3NpdGl2ZVRvdGFsQW1vdW50ID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSAmJiBwYXJzZWQgPiAwO1xufTtcblxuY29uc3QgTmV3VGlja2V0SWNvbiA9ICgpID0+IChcbiAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD17MS41fSBhcmlhLWhpZGRlbj1cInRydWVcIiBjbGFzc05hbWU9XCJoLTUgdy01XCI+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTAgMjBoLTVhMiAyIDAgMCAxIC0yIC0ydi05YTIgMiAwIDAgMSAyIC0yaDFhMiAyIDAgMCAwIDIgLTJhMSAxIDAgMCAxIDEgLTFoNmExIDEgMCAwIDEgMSAxYTIgMiAwIDAgMCAyIDJoMWEyIDIgMCAwIDEgMiAydjJcIiAvPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0LjM2MiAxMS4xNWEzIDMgMCAxIDAgLTQuMTQ0IDQuMjYzXCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAyMXYtNGEyIDIgMCAxIDEgNCAwdjRcIiAvPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDE5aDRcIiAvPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTIxIDE1djZcIiAvPlxuICA8L3N2Zz5cbik7XG5cbmNvbnN0IExpbmtUaWNrZXRJY29uID0gKCkgPT4gKFxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsxLjV9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzTmFtZT1cImgtNSB3LTVcIj5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xMy4xOSA4LjY4OGE0LjUgNC41IDAgMCAxIDEuMjQyIDcuMjQ0bC00LjUgNC41YTQuNSA0LjUgMCAwIDEtNi4zNjQtNi4zNjRsMS43NTctMS43NTdtMTMuMzUtLjYyMiAxLjc1Ny0xLjc1N2E0LjUgNC41IDAgMCAwLTYuMzY0LTYuMzY0bC00LjUgNC41YTQuNSA0LjUgMCAwIDAgMS4yNDIgNy4yNDRcIiAvPlxuICA8L3N2Zz5cbik7XG5cbmNvbnN0IE5ld0xpbmVJY29uID0gKCkgPT4gKFxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsxLjV9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzTmFtZT1cImgtNSB3LTVcIj5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0zIDE5YzMuMzMzIC0yIDUgLTQgNSAtNmMwIC0zIC0xIC0zIC0yIC0zcy0yLjAzMiAxLjA4NSAtMiAzYy4wMzQgMi4wNDggMS42NTggMi44NzcgMi41IDRjMS41IDIgMi41IDIuNSAzLjUgMWMuNjY3IC0xIDEuMTY3IC0xLjgzMyAxLjUgLTIuNWMxIDIuMzMzIDIuMzMzIDMuNSA0IDMuNWgyLjVcIiAvPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTIwIDE3di0xMmMwIC0xLjEyMSAtLjg3OSAtMiAtMiAtMnMtMiAuODc5IC0yIDJ2MTJsMiAybDIgLTJcIiAvPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE2IDdoNFwiIC8+XG4gIDwvc3ZnPlxuKTtcblxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxuZXhwb3J0IGNvbnN0IGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoID0gKCkgPT4ge1xuICBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCh7XG4gICAgdG9rZW46IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXG4gICAgYXBwQ29kZTogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxuICB9KTtcbn07XG5cbi8vIE93bnMgdGhlIGRldGFpbC1wYWdlIG9yY2hlc3RyYXRpb24gYW5kIGtlZXBzIHRoZSB2aWV3IGNvbXBvbmVudCBmb2N1c2VkIG9uIHJlbmRlcmluZy5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udHJvbGxlciA9ICgpID0+IHtcbiAgY29uc3Qge1xuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcbiAgICBjdXJyZW50QXhVc2VySWQsXG4gICAgY3VycmVudENybVVzZXJJZCxcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXG4gICAgbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxuICB9ID0gdXNlQXV0aENvbnRleHQoKTtcbiAgY29uc3QgaGFzQWNjZXNzID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJWaWV3XCIpO1xuICBjb25zdCBjYW5DcmVhdGVFeHBlbnNlID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJBZGRcIik7XG4gIGNvbnN0IHNoZWV0SWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1NIRUVUX0lEX18pO1xuICBjb25zdCBzaGVldE1vZGUgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1NIRUVUX01PREVfXykudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgaXNDcmVhdGVNb2RlID0gc2hlZXRNb2RlID09PSBcImNyZWF0ZVwiO1xuICBjb25zdCBpc01hbmFnaW5nT3RoZXJVc2VyQnlTZWxlY3Rpb24gPSBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkKHtcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxuICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXG4gICAgcmVjb3JkT3duZXJVc2VySWQ6IFwiXCIsXG4gICAgaXNDcmVhdGVNb2RlLFxuICB9KTtcbiAgY29uc3QgY2FuQ3JlYXRlRXhwZW5zZUZvclNlbGVjdGVkQ29udGV4dCA9IGNhbkNyZWF0ZUV4cGVuc2UgJiYgIWlzTWFuYWdpbmdPdGhlclVzZXJCeVNlbGVjdGlvbjtcbiAgY29uc3QgbGluZUNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBjcmVhdGVkU2hlZXRJZFJlZiA9IHVzZVJlZihcIlwiKTtcbiAgY29uc3QgY2FtZXJhSW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBnYWxsZXJ5SW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLCBzZXRJc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IHBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxuICAgICgpID0+ICh7XG4gICAgICBmaXJzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9GaXJzdFwiLCBcIkZpcnN0XCIpLFxuICAgICAgcHJldjogaW5kVChcIkhpc3RvcnlfUGFnZV9QcmV2XCIsIFwiUHJldmlvdXNcIiksXG4gICAgICBuZXh0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX05leHRcIiwgXCJOZXh0XCIpLFxuICAgICAgbGFzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9MYXN0XCIsIFwiTGFzdFwiKSxcbiAgICB9KSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IGRldGFpbFN0YXRlID0gdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUoe1xuICAgIGhhc0FjY2VzcyxcbiAgICBjYW5DcmVhdGVFeHBlbnNlOiBjYW5DcmVhdGVFeHBlbnNlRm9yU2VsZWN0ZWRDb250ZXh0LFxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcbiAgICBjdXJyZW50QXhVc2VySWQsXG4gICAgY3VycmVudENybVVzZXJJZCxcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXG4gICAgc2hlZXRJZCxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gIH0pO1xuXG4gIGNvbnN0IHtcbiAgICBoZWFkZXIsXG4gICAgbGluZXMsXG4gICAgbGluZVBhZ2UsXG4gICAgaXNMb2FkaW5nLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBidXN5LFxuICAgIHN0YXR1cyxcbiAgICBpc0VkaXRpbmcsXG4gICAgbW9kYWxFcnJvcixcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0UHJvamVjdElkLFxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxuICAgIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSxcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSxcbiAgICBwcm9qZWN0VmFsdWUsXG4gICAgZGV0YWlsUG9saWN5LFxuICAgIGlzTWFuYWdpbmdPdGhlclVzZXIsXG4gICAgaXNTaGVldExvY2tlZCxcbiAgICBleGNoYW5nZVJhdGVWYWx1ZSxcbiAgICBzaG93RXhjaGFuZ2VSYXRlLFxuICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQsXG4gICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXG4gICAgY2FuRWRpdFN0YXR1c0NvbW1lbnRDdXJyZW50LFxuICAgIGNhbkVkaXRBbnlDdXJyZW50LFxuICAgIGNhblVzZUZ1bGxFZGl0RmVhdHVyZXMsXG4gICAgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXG4gICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxuICAgIHNldExpbmVQYWdlLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXG4gICAgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlLFxuICAgIGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSxcbiAgICBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0LFxuICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsLFxuICB9ID0gZGV0YWlsU3RhdGU7XG5cbiAgY29uc3QgY2FuQ3JlYXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3ID0gY2FuQ3JlYXRlRXhwZW5zZSAmJiAhaXNNYW5hZ2luZ090aGVyVXNlcjtcbiAgY29uc3QgY2FuRGVsZXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3ID0gZGV0YWlsUG9saWN5LmNhbkRlbGV0ZVNoZWV0O1xuICBjb25zdCBjYW5UcmFuc2l0aW9uU3RhdHVzID0gZGV0YWlsUG9saWN5LnN0YXR1c0FjdGlvbnMubGVuZ3RoID4gMDtcbiAgY29uc3QgaXNSZWFkT25seU1vZGUgPSBkZXRhaWxQb2xpY3kuaW50ZXJhY3Rpb25Nb2RlID09PSBcInJlYWRfb25seVwiO1xuICBjb25zdCBjdXJyZW50U3RhdHVzQ29kZSA9IHR5cGVvZiBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgOiBudWxsO1xuICBjb25zdCBoaWRlc0NydWRUb3BiYXJCeVN0YXR1cyA9XG4gICAgY3VycmVudFN0YXR1c0NvZGUgPT09IEVYUEVOU0VfU1RBVFVTX0FQUFJPVkFMX1JFUVVFU1RFRCAmJiAhY2FuRWRpdEFueUN1cnJlbnQ7XG4gIGNvbnN0IHRvcGJhckFjdGlvbk1vZGUgPSAhaXNDcmVhdGVNb2RlICYmIChpc1JlYWRPbmx5TW9kZSB8fCBoaWRlc0NydWRUb3BiYXJCeVN0YXR1cykgPyBcInZpZXdfb25seVwiIDogXCJkZWZhdWx0XCI7XG4gIGNvbnN0IGRldGFpbFBlcm1pc3Npb25zUmVhZHkgPSBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHkgJiYgKGlzQ3JlYXRlTW9kZSB8fCAhIWhlYWRlcik7XG4gIGNvbnN0IHsgaW52YWxpZGF0ZUNhY2hlZExpc3RGb3JSZWZldGNoIH0gPSB1c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUoKTtcblxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcbiAgICBkZWZhdWx0Q29uZmlybVRleHQ6IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpLFxuICAgIGRlZmF1bHRDYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKSxcbiAgfSk7XG5cbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XG4gICAgICBidXN5LFxuICAgICAgb25FcnJvcjogKG1zZykgPT4ge1xuICAgICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm0sIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1c10pO1xuXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpO1xuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpO1xuICBjb25zdCBtb2RhbENvbmZpcm1UZXh0ID0gYnVzeVxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxuICAgIDogIWJ1c3kgJiYgbW9kYWxFcnJvclxuICAgICAgPyBpbmRUKFwiQ29tbW9uX09LXCIsIFwiT0tcIilcbiAgICAgIDogKG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpKTtcblxuICBjb25zdCBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcbiAgICAgIGNsb3NlQ29uZmlybSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZvaWQgaGFuZGxlTW9kYWxDb25maXJtKCk7XG4gIH0sIFtidXN5LCBjbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybSwgbW9kYWxFcnJvcl0pO1xuXG4gIGNvbnN0IHZpc2libGVMaW5lcyA9IHVzZU1lbW8oKCkgPT4gcGFnZWRTbGljZShsaW5lcywgbGluZVBhZ2UsIExJTkVTX1BBR0VfU0laRSksIFtsaW5lUGFnZSwgbGluZXNdKTtcbiAgY29uc3QgdG90YWxMaW5lUGFnZXMgPSBNYXRoLmNlaWwoKGxpbmVzLmxlbmd0aCB8fCAwKSAvIExJTkVTX1BBR0VfU0laRSk7XG4gIGNvbnN0IHRvdGFsQW1vdW50VGV4dCA9IHVzZU1lbW8oXG4gICAgKCkgPT5cbiAgICAgIGZvcm1hdEV4cGVuc2VOdW1iZXIoaGVhZGVyPy50b3RhbEFtb3VudCwge1xuICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgICAgIGZhbGxiYWNrOiBcIi1cIixcbiAgICAgIH0pLFxuICAgIFtoZWFkZXI/LnRvdGFsQW1vdW50XVxuICApO1xuICBjb25zdCBoYXNTdGF0dXNBY3Rpb25Db250ZW50ID0gbGluZXMubGVuZ3RoID4gMCB8fCBoYXNQb3NpdGl2ZVRvdGFsQW1vdW50KGhlYWRlcj8udG90YWxBbW91bnQpO1xuICBjb25zdCBhcmVTdGF0dXNBY3Rpb25zRGlzYWJsZWQgPSAhaGFzU3RhdHVzQWN0aW9uQ29udGVudDtcblxuICBjb25zdCB7IGhhbmRsZVVwZGF0ZSwgaGFuZGxlU3RhdHVzVHJhbnNpdGlvbiwgaGFuZGxlRGVsZXRlIH0gPSB1c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMoe1xuICAgIGJ1c3ksXG4gICAgaXNFZGl0aW5nLFxuICAgIGlzQ3JlYXRlTW9kZSxcbiAgICBpc0VkaXRMb2NrZWQ6IGlzUmVhZE9ubHlNb2RlLFxuICAgIGlzRGVsZXRlTG9ja2VkOiBpc1NoZWV0TG9ja2VkLFxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcbiAgICBsb2NrZWRDdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSxcbiAgICBsb2NrZWRFeGNoYW5nZVJhdGU6IHNhZmVUZXh0KGhlYWRlcj8uZXhjaFJhdGUpLFxuICAgIGNhbkNyZWF0ZUV4cGVuc2U6IGNhbkNyZWF0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyxcbiAgICBjYW5FZGl0RXhwZW5zZTogY2FuRWRpdEFueUN1cnJlbnQsXG4gICAgY2FuRGVsZXRlRXhwZW5zZTogY2FuRGVsZXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxuICAgIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50LFxuICAgIGNhblRyYW5zaXRpb25TdGF0dXMsXG4gICAgc2hlZXRJZCxcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsXG4gICAgZHJhZnRQcm9qZWN0SWQsXG4gICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcbiAgICBjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzOiBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyxcbiAgICBjdXJyZW50RXhjaGFuZ2VSYXRlTW9kZTogaGVhZGVyPy5leGNoYW5nZVJhdGVNb2RlLFxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgICBvbkNyZWF0ZVN1Y2Nlc3M6IChjcmVhdGVkU2hlZXRJZCkgPT4ge1xuICAgICAgY3JlYXRlZFNoZWV0SWRSZWYuY3VycmVudCA9IHNhZmVUZXh0KGNyZWF0ZWRTaGVldElkKTtcbiAgICB9LFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRTdGF0dXMsXG4gICAgc2V0SXNFZGl0aW5nLFxuICB9KTtcblxuICBjb25zdCBoYW5kbGVTYXZlU3VjY2VzcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICBjb25zdCBjcmVhdGVkU2hlZXRJZCA9IHNhZmVUZXh0KGNyZWF0ZWRTaGVldElkUmVmLmN1cnJlbnQpO1xuICAgICAgaWYgKCFjcmVhdGVkU2hlZXRJZCkgcmV0dXJuO1xuICAgICAgc2V0SXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlKHRydWUpO1xuICAgICAgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldChjcmVhdGVkU2hlZXRJZCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmVsb2FkRXhwZW5zZVBhZ2UoKTtcbiAgfSwgW2lzQ3JlYXRlTW9kZSwgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldF0pO1xuXG4gIGNvbnN0IGhhbmRsZVN0YXR1c0FjdGlvbkNsaWNrID0gdXNlQ2FsbGJhY2soXG4gICAgKGFjdGlvbjogeyBsYWJlbEtleTogc3RyaW5nOyBmYWxsYmFjazogc3RyaW5nOyBuZXh0U3RhdHVzOiBudW1iZXIgfSkgPT4ge1xuICAgICAgaWYgKCFoYXNTdGF0dXNBY3Rpb25Db250ZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYWN0aW9uTGFiZWwgPSBpbmRUKGFjdGlvbi5sYWJlbEtleSwgYWN0aW9uLmZhbGxiYWNrKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRTdGF0dXNMYWJlbCA9XG4gICAgICAgIGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzID09PSBudWxsIHx8IGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzID09PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGluZFQoXCJDb21tb25fTm9EYXRhXCIsIFwiTm8gZGF0YVwiKVxuICAgICAgICAgIDogZ2V0RXhwZW5zZVN0YXR1c0xhYmVsKGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMpO1xuICAgICAgY29uc3QgbmV4dFN0YXR1c0xhYmVsID0gZ2V0RXhwZW5zZVN0YXR1c0xhYmVsKGFjdGlvbi5uZXh0U3RhdHVzKTtcbiAgICAgIGNvbnN0IHRyYW5zaXRpb25NZXNzYWdlID0gaW5kRm9ybWF0KFxuICAgICAgICBcIkV4cGVuc2VTaGVldHNfQm90dG9tQWN0aW9uc19Db25maXJtVHJhbnNpdGlvblwiLFxuICAgICAgICBcIkN1cnJlbnQgc3RhdHVzOiB7MH1cXG5OZXcgc3RhdHVzOiB7MX1cXG5cXG5EbyB5b3Ugd2FudCB0byB1cGRhdGUgdGhlIGV4cGVuc2Ugc2hlZXQgc3RhdHVzP1wiLFxuICAgICAgICBjdXJyZW50U3RhdHVzTGFiZWwsXG4gICAgICAgIG5leHRTdGF0dXNMYWJlbFxuICAgICAgKS5yZXBsYWNlKC9cXFxcbi9nLCBcIlxcblwiKTtcbiAgICAgIG9wZW5Db25maXJtKHtcbiAgICAgICAgdGl0bGU6IGFjdGlvbkxhYmVsLFxuICAgICAgICBtZXNzYWdlOiB0cmFuc2l0aW9uTWVzc2FnZSxcbiAgICAgICAgY29uZmlybVRleHQ6IGFjdGlvbkxhYmVsLFxuICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZVN0YXR1c1RyYW5zaXRpb24oYWN0aW9uLm5leHRTdGF0dXMsIGFjdGlvbkxhYmVsKTtcbiAgICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICAgIGludmFsaWRhdGVDYWNoZWRMaXN0Rm9yUmVmZXRjaCgpO1xuICAgICAgICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICAgICAgICByZWxvYWRFeHBlbnNlUGFnZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gb2s7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtjbG9zZUNvbmZpcm0sIGhhbmRsZVN0YXR1c1RyYW5zaXRpb24sIGhhc1N0YXR1c0FjdGlvbkNvbnRlbnQsIGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzLCBpbnZhbGlkYXRlQ2FjaGVkTGlzdEZvclJlZmV0Y2gsIG9wZW5Db25maXJtXVxuICApO1xuXG4gIHVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMoe1xuICAgIGJ1c3k6IGJ1c3kgfHwgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLFxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcbiAgICBpc0VkaXRpbmcsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIGFjdGlvbk1vZGU6IHRvcGJhckFjdGlvbk1vZGUsXG4gICAgaXNMb2NrZWQ6IGlzU2hlZXRMb2NrZWQsXG4gICAgaXNFZGl0TG9ja2VkOiBpc1JlYWRPbmx5TW9kZSxcbiAgICBpc0RlbGV0ZUxvY2tlZDogaXNTaGVldExvY2tlZCxcbiAgICBwZXJtaXNzaW9uc1JlYWR5OiBkZXRhaWxQZXJtaXNzaW9uc1JlYWR5LFxuICAgIGNhbkNyZWF0ZUV4cGVuc2U6IGNhbkNyZWF0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyxcbiAgICBjYW5FZGl0RXhwZW5zZTogY2FuRWRpdEFueUN1cnJlbnQsXG4gICAgY2FuRGVsZXRlRXhwZW5zZTogY2FuRGVsZXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxuICAgIGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVEZWxldGUsXG4gICAgb25TYXZlU3VjY2VzczogaGFuZGxlU2F2ZVN1Y2Nlc3MsXG4gICAgb25EZWxldGVTdWNjZXNzOiAoKSA9PiB7XG4gICAgICBpbnZhbGlkYXRlQ2FjaGVkTGlzdEZvclJlZmV0Y2goKTtcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXRzXCIpO1xuICAgIH0sXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgY2xvc2VDb25maXJtLFxuICB9KTtcblxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGNhcmQgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiKTtcbiAgICBpZiAoIWNhcmQpIHJldHVybiBudWxsO1xuICAgIGlmICghbGluZUNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyhjYXJkKSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNhcmQ7XG4gIH0sIFtdKTtcblxuICB1c2VUaW1lbGluZUNhcmRFZmZlY3RzKHtcbiAgICBjb250YWluZXJSZWY6IGxpbmVDb250YWluZXJSZWYsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGl0ZW1zOiB2aXNpYmxlTGluZXMsXG4gICAgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsXG4gIH0pO1xuXG4gIGNvbnN0IHF1aWNrVGlja2V0RmxvdyA9IHVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvdyh7XG4gICAgc2hlZXRJZDogc2FmZVRleHQoaGVhZGVyPy5ob2phR2FzdG9zSWQgfHwgc2hlZXRJZCksXG4gICAgcHJvamVjdElkOiBwcm9qZWN0VmFsdWUsXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChoZWFkZXI/LmN1cnJlbmN5Q29kZSksXG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogIWlzQ3JlYXRlTW9kZSAmJiBkZXRhaWxQb2xpY3kuc2hvd0ZhYixcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgaXNTaGVldExvY2tlZDogIWNhblVzZUZ1bGxFZGl0RmVhdHVyZXMsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gICAgb25Db21wbGV0ZWQ6IChyZXN1bHQpID0+IHtcbiAgICAgIGNvbnN0IGNyZWF0ZWRGaWxlSWQgPSBzYWZlVGV4dChyZXN1bHQ/LmZpbGVJZCk7XG4gICAgICBpZiAoIWNyZWF0ZWRGaWxlSWQpIHtcbiAgICAgICAgcmVsb2FkRXhwZW5zZVBhZ2UoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjdXJyZW50U2hlZXRJZCA9IHNhZmVUZXh0KGhlYWRlcj8uaG9qYUdhc3Rvc0lkIHx8IHNoZWV0SWQpO1xuICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcbiAgICAgICAgZmlsZUlkOiBjcmVhdGVkRmlsZUlkLFxuICAgICAgICBtb2RlOiBcImVkaXRcIixcbiAgICAgICAgb3JpZ2luOiBcInNoZWV0LWNyZWF0ZVwiLFxuICAgICAgfSk7XG4gICAgICBpZiAoY3VycmVudFNoZWV0SWQpIHtcbiAgICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KHtcbiAgICAgICAgICBmaWxlSWQ6IGNyZWF0ZWRGaWxlSWQsXG4gICAgICAgICAgb3JpZ2luOiBcInNoZWV0LWNyZWF0ZVwiLFxuICAgICAgICAgIHNoZWV0SWQ6IGN1cnJlbnRTaGVldElkLFxuICAgICAgICB9KTtcbiAgICAgICAgcXVlcnkuc2V0KFwic2hlZXRJZFwiLCBjdXJyZW50U2hlZXRJZCk7XG4gICAgICB9XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXREZXRhaWw/JHtxdWVyeS50b1N0cmluZygpfWApO1xuICAgIH0sXG4gIH0pO1xuXG4gIGNvbnN0IGZhYk1lbnVJdGVtcyA9IHVzZU1lbW88RmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbVtdPihcbiAgICAoKSA9PiBbXG4gICAgICB7XG4gICAgICAgIGlkOiBcIm5ldy10aWNrZXRcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9OZXdUaWNrZXRcIiwgXCJOdWV2byBUaWNrZXRcIiksXG4gICAgICAgIGljb246IDxOZXdUaWNrZXRJY29uIC8+LFxuICAgICAgICBvbkNsaWNrOiBxdWlja1RpY2tldEZsb3cub3BlblNvdXJjZVBpY2tlcixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiBcImxpbmstdGlja2V0XCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfTGlua1RpY2tldFwiLCBcIlZpbmN1bGFyIFRpY2tldFwiKSxcbiAgICAgICAgaWNvbjogPExpbmtUaWNrZXRJY29uIC8+LFxuICAgICAgICBvbkNsaWNrOiBoYW5kbGVPcGVuTGlua1RpY2tldE1vZGUsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogXCJuZXctbGluZVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX05ld0xpbmVcIiwgXCJOdWV2YSBMaW5lYVwiKSxcbiAgICAgICAgaWNvbjogPE5ld0xpbmVJY29uIC8+LFxuICAgICAgICBvbkNsaWNrOiBoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUsXG4gICAgICB9LFxuICAgIF0sXG4gICAgW2hhbmRsZU9wZW5DcmVhdGVMaW5lTW9kZSwgaGFuZGxlT3BlbkxpbmtUaWNrZXRNb2RlLCBxdWlja1RpY2tldEZsb3cub3BlblNvdXJjZVBpY2tlcl1cbiAgKTtcblxuICBjb25zdCBzaG93U3RhdHVzQWN0aW9uQmFyID1cbiAgICAhaXNDcmVhdGVNb2RlICYmICFpc0xvYWRpbmcgJiYgIWlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSAmJiAhZXJyb3JNZXNzYWdlICYmIGRldGFpbFBvbGljeS5zdGF0dXNBY3Rpb25zLmxlbmd0aCA+IDA7XG4gIGNvbnN0IHNob3dGYWIgPSAhaXNDcmVhdGVNb2RlICYmIGRldGFpbFBvbGljeS5zaG93RmFiO1xuICBjb25zdCBoYXNWaXNpYmxlU3RhdHVzQ29tbWVudCA9IHNhZmVUZXh0KGhlYWRlcj8uZXN0YWRvQ29tZW50YXJpb3MpLnRyaW0oKS5sZW5ndGggPiAwO1xuICBjb25zdCBzdGF0dXNDb21tZW50TW9kZTogXCJoaWRkZW5cIiB8IFwicmVhZFwiIHwgXCJlZGl0XCIgPVxuICAgIGlzRWRpdGluZyAmJiBjYW5FZGl0U3RhdHVzQ29tbWVudEN1cnJlbnQgPyBcImVkaXRcIiA6IChoYXNWaXNpYmxlU3RhdHVzQ29tbWVudCA/IFwicmVhZFwiIDogXCJoaWRkZW5cIik7XG5cbiAgcmV0dXJuIHtcbiAgICBoZWFkZXIsXG4gICAgdmlzaWJsZUxpbmVzLFxuICAgIGxpbmVQYWdlLFxuICAgIHRvdGFsTGluZVBhZ2VzLFxuICAgIGlzTG9hZGluZyxcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIGlzRWRpdGluZyxcbiAgICBidXN5LFxuICAgIHN0YXR1cyxcbiAgICBtb2RhbEVycm9yLFxuICAgIGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSxcbiAgICBtb2RhbCxcbiAgICBtb2RhbExvYWRpbmdUZXh0LFxuICAgIG1vZGFsQ2FuY2VsVGV4dCxcbiAgICBtb2RhbENvbmZpcm1UZXh0LFxuICAgIGNhbkNyZWF0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyxcbiAgICBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcbiAgICBjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzLFxuICAgIHNob3dTdGF0dXNBY3Rpb25CYXIsXG4gICAgc2hvd0ZhYixcbiAgICBhcmVTdGF0dXNBY3Rpb25zRGlzYWJsZWQsXG4gICAgZmFiTWVudUl0ZW1zLFxuICAgIHBhZ2luYXRpb25MYWJlbHMsXG4gICAgdG90YWxBbW91bnRUZXh0LFxuICAgIHN0YXR1c0NvbW1lbnRNb2RlLFxuICAgIHByb2plY3RWYWx1ZSxcbiAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcbiAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXG4gICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LFxuICAgIHNob3dFeGNoYW5nZVJhdGUsXG4gICAgZXhjaGFuZ2VSYXRlVmFsdWUsXG4gICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXG4gICAgZHJhZnREZXNjcmlwdGlvbixcbiAgICBkcmFmdFByb2plY3RJZCxcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlLFxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcbiAgICBkZXRhaWxQb2xpY3ksXG4gICAgbGluZUNvbnRhaW5lclJlZixcbiAgICBjYW1lcmFJbnB1dFJlZixcbiAgICBnYWxsZXJ5SW5wdXRSZWYsXG4gICAgcXVpY2tUaWNrZXRGbG93LFxuICAgIHNldExpbmVQYWdlLFxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXG4gICAgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcbiAgICBuYXZpZ2F0ZVRvTGluZURldGFpbCxcbiAgICBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXG4gICAgaGFuZGxlU3RhdHVzQWN0aW9uQ2xpY2ssXG4gICAgY2xvc2VDb25maXJtLFxuICB9O1xufTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0LCBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0IH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbiwgcGFyc2VEZWNpbWFsSW5wdXQgfSBmcm9tIFwiLi4vaG9va3MvZXhwZW5zZU11dGF0aW9uVXRpbHMudHNcIjtcbmltcG9ydCB7XG4gIGNyZWF0ZUV4cGVuc2VTaGVldCxcbiAgZGVsZXRlRXhwZW5zZVNoZWV0LFxuICB1cGRhdGVFeHBlbnNlU2hlZXRIZWFkZXIsXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zQXJncyA9IHtcbiAgYnVzeTogYm9vbGVhbjtcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XG4gIGlzRWRpdExvY2tlZDogYm9vbGVhbjtcbiAgaXNEZWxldGVMb2NrZWQ6IGJvb2xlYW47XG4gIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XG4gIGxvY2tlZEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBsb2NrZWRFeGNoYW5nZVJhdGU6IHN0cmluZztcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XG4gIGNhbkRlbGV0ZUV4cGVuc2U6IGJvb2xlYW47XG4gIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGJvb2xlYW47XG4gIGNhblRyYW5zaXRpb25TdGF0dXM6IGJvb2xlYW47XG4gIHNoZWV0SWQ6IHN0cmluZztcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBkcmFmdEV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlOiBzdHJpbmc7XG4gIGRyYWZ0UHJvamVjdElkOiBzdHJpbmc7XG4gIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3M6IHN0cmluZztcbiAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5OiBzdHJpbmc7XG4gIGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXM/OiBudW1iZXIgfCBudWxsO1xuICBjdXJyZW50RXhjaGFuZ2VSYXRlTW9kZT86IG51bWJlciB8IG51bGw7XG4gIG9uQ3JlYXRlU3VjY2VzczogKGNyZWF0ZWRTaGVldElkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldElzRWRpdGluZzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xufTtcblxuY29uc3Qgbm9ybWFsaXplRXhjaGFuZ2VSYXRlID0gKHJhdzogc3RyaW5nKTogbnVtYmVyIHwgbnVsbCA9PiBwYXJzZURlY2ltYWxJbnB1dChyYXcpO1xuLy8gQ29tcGFyZXMgcmF0ZXMgd2l0aCB0b2xlcmFuY2UgdG8gYXZvaWQgZmxvYXRpbmcgcG9pbnQgbWlzbWF0Y2ggb24gcGF5bG9hZCBtb2RlLlxuY29uc3QgYXJlUmF0ZXNFcXVpdmFsZW50ID0gKGxlZnQ6IG51bWJlciB8IG51bGwsIHJpZ2h0OiBudW1iZXIgfCBudWxsKTogYm9vbGVhbiA9PiB7XG4gIGlmIChsZWZ0ID09IG51bGwgfHwgcmlnaHQgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gTWF0aC5hYnMobGVmdCAtIHJpZ2h0KSA8IDAuMDAwMDAwMTtcbn07XG5cbi8vIEVuY2Fwc3VsYXRlcyB1cGRhdGUgYW5kIGRlbGV0ZSBtdXRhdGlvbnMgZm9yIGV4cGVuc2Ugc2hlZXQgaGVhZGVyIGRldGFpbC5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMgPSAoe1xuICBidXN5LFxuICBpc0VkaXRpbmcsXG4gIGlzQ3JlYXRlTW9kZSxcbiAgaXNFZGl0TG9ja2VkLFxuICBpc0RlbGV0ZUxvY2tlZCxcbiAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXG4gIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcbiAgbG9ja2VkQ3VycmVuY3lDb2RlLFxuICBsb2NrZWRFeGNoYW5nZVJhdGUsXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXG4gIGNhbkVkaXRFeHBlbnNlLFxuICBjYW5EZWxldGVFeHBlbnNlLFxuICBjYW5FZGl0SGVhZGVyRmllbGRzLFxuICBjYW5UcmFuc2l0aW9uU3RhdHVzLFxuICBzaGVldElkLFxuICBkcmFmdERlc2NyaXB0aW9uLFxuICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgZHJhZnRFeGNoYW5nZVJhdGUsXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsXG4gIGRyYWZ0UHJvamVjdElkLFxuICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxuICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXG4gIGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gIGN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlLFxuICBvbkNyZWF0ZVN1Y2Nlc3MsXG4gIHNldE1vZGFsRXJyb3IsXG4gIHNldEJ1c3ksXG4gIHNldFN0YXR1cyxcbiAgc2V0SXNFZGl0aW5nLFxufTogVXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zQXJncykgPT4ge1xuICBjb25zdCBidWlsZFVwZGF0ZVBheWxvYWQgPSB1c2VDYWxsYmFjayhcbiAgICAobmV4dFN0YXR1cz86IG51bWJlciB8IG51bGwpOiB7IHBheWxvYWQ6IEV4cGVuc2VTaGVldEhlYWRlclVwZGF0ZVJlcXVlc3QgfSB8IHsgZXJyb3I6IHN0cmluZyB9ID0+IHtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW5jeSA9IFN0cmluZyhcbiAgICAgICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMgPyAobG9ja2VkQ3VycmVuY3lDb2RlIHx8IGRyYWZ0Q3VycmVuY3lDb2RlIHx8IFwiXCIpIDogKGRyYWZ0Q3VycmVuY3lDb2RlIHx8IFwiXCIpXG4gICAgICApXG4gICAgICAgIC50cmltKClcbiAgICAgICAgLnRvVXBwZXJDYXNlKCk7XG4gICAgICBjb25zdCBub3JtYWxpemVkRGVzY3JpcHRpb24gPSBTdHJpbmcoZHJhZnREZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCk7XG4gICAgICBjb25zdCBub3JtYWxpemVkUHJvamVjdElkID0gU3RyaW5nKGRyYWZ0UHJvamVjdElkIHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRFc3RhZG9Db21lbnRhcmlvcyA9IFN0cmluZyhkcmFmdEVzdGFkb0NvbWVudGFyaW9zIHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRFeGNoYW5nZVJhdGVSYXcgPSBTdHJpbmcoXG4gICAgICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyA/IChsb2NrZWRFeGNoYW5nZVJhdGUgfHwgZHJhZnRFeGNoYW5nZVJhdGUgfHwgXCJcIikgOiAoZHJhZnRFeGNoYW5nZVJhdGUgfHwgXCJcIilcbiAgICAgICk7XG4gICAgICBjb25zdCBub3JtYWxpemVkQmFzZUN1cnJlbmN5ID0gU3RyaW5nKGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSB8fCBcIkVVUlwiKS50cmltKCkudG9VcHBlckNhc2UoKSB8fCBcIkVVUlwiO1xuICAgICAgY29uc3QgcmVxdWlyZXNFeGNoYW5nZVJhdGUgPVxuICAgICAgICBjYW5FZGl0SGVhZGVyRmllbGRzICYmIG5vcm1hbGl6ZWRDdXJyZW5jeSAhPT0gXCJcIiAmJiBub3JtYWxpemVkQ3VycmVuY3kgIT09IG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3k7XG4gICAgICBjb25zdCBwYXJzZWRFeGNoYW5nZVJhdGUgPSBub3JtYWxpemVFeGNoYW5nZVJhdGUobm9ybWFsaXplZEV4Y2hhbmdlUmF0ZVJhdyk7XG4gICAgICBjb25zdCBvZmZpY2lhbEV4Y2hhbmdlUmF0ZSA9IG5vcm1hbGl6ZUV4Y2hhbmdlUmF0ZShvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKTtcbiAgICAgIGNvbnN0IG9yaWdpbmFsRXhjaGFuZ2VSYXRlID0gbm9ybWFsaXplRXhjaGFuZ2VSYXRlKGxvY2tlZEV4Y2hhbmdlUmF0ZSk7XG4gICAgICBjb25zdCBwYXJzZWRDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA9IE51bWJlcihjdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSk7XG4gICAgICBjb25zdCBoYXNDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA9IE51bWJlci5pc0ludGVnZXIocGFyc2VkQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUpICYmIHBhcnNlZEN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlID49IDA7XG4gICAgICBjb25zdCBoYXNWYWxpZFJhdGUgPSBwYXJzZWRFeGNoYW5nZVJhdGUgIT0gbnVsbCAmJiBwYXJzZWRFeGNoYW5nZVJhdGUgPiAwO1xuICAgICAgY29uc3QgaGFzTWFudWFsUmF0ZUVkaXRPblVwZGF0ZSA9XG4gICAgICAgIGNhbkVkaXRIZWFkZXJGaWVsZHMgJiZcbiAgICAgICAgIWlzQ3JlYXRlTW9kZSAmJlxuICAgICAgICBoYXNWYWxpZFJhdGUgJiZcbiAgICAgICAgKG9yaWdpbmFsRXhjaGFuZ2VSYXRlID09IG51bGwgfHwgIWFyZVJhdGVzRXF1aXZhbGVudChwYXJzZWRFeGNoYW5nZVJhdGUsIG9yaWdpbmFsRXhjaGFuZ2VSYXRlKSk7XG4gICAgICAvLyBPbmx5IHNlbmQgZXhjaGFuZ2VSYXRlTW9kZSB3aGVuIHRoZSB1c2VyIGFjdHVhbGx5IGNoYW5nZWQgdGhlIHJhdGUgbWFudWFsbHkuXG4gICAgICBjb25zdCBpc01hbnVhbEV4Y2hhbmdlUmF0ZSA9ICgoKSA9PiB7XG4gICAgICAgIGlmICghY2FuRWRpdEhlYWRlckZpZWxkcykgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoIXJlcXVpcmVzRXhjaGFuZ2VSYXRlIHx8ICFoYXNWYWxpZFJhdGUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcykgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoIWlzQ3JlYXRlTW9kZSAmJiAhaGFzTWFudWFsUmF0ZUVkaXRPblVwZGF0ZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAob2ZmaWNpYWxFeGNoYW5nZVJhdGUgPT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiAhYXJlUmF0ZXNFcXVpdmFsZW50KHBhcnNlZEV4Y2hhbmdlUmF0ZSwgb2ZmaWNpYWxFeGNoYW5nZVJhdGUpO1xuICAgICAgfSkoKTtcbiAgICAgIGNvbnN0IHJlc29sdmVkRXhjaGFuZ2VSYXRlTW9kZSA9IGNhbkVkaXRIZWFkZXJGaWVsZHNcbiAgICAgICAgPyAoaXNNYW51YWxFeGNoYW5nZVJhdGUgPyAxIDogKGhhc0N1cnJlbnRFeGNoYW5nZVJhdGVNb2RlID8gcGFyc2VkQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUgOiAwKSlcbiAgICAgICAgOiAoaGFzQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUgPyBwYXJzZWRDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA6IHVuZGVmaW5lZCk7XG4gICAgICBjb25zdCByZXNvbHZlZEV4cGVuc2VTaGVldFN0YXR1cyA9XG4gICAgICAgIG5leHRTdGF0dXMgPz8gKGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXMgIT0gbnVsbCA/IE51bWJlcihjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzKSA6IHVuZGVmaW5lZCk7XG5cbiAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgICAgaWYgKCFub3JtYWxpemVkRGVzY3JpcHRpb24pIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZXJyb3I6IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fRGVzY3JpcHRpb25SZXF1aXJlZFwiLCBcIkRlc2NyaXB0aW9uIGlzIHJlcXVpcmVkLlwiKSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFub3JtYWxpemVkQ3VycmVuY3kpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZXJyb3I6IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fQ3VycmVuY3lSZXF1aXJlZFwiLCBcIkN1cnJlbmN5IGlzIHJlcXVpcmVkLlwiKSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXF1aXJlc0V4Y2hhbmdlUmF0ZSAmJiAhaGFzVmFsaWRSYXRlKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZXJyb3I6IGluZFQoXG4gICAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9FeGNoYW5nZVJhdGVSZXF1aXJlZFwiLFxuICAgICAgICAgICAgXCJFeGNoYW5nZSByYXRlIGlzIHJlcXVpcmVkIHdoZW4gY3VycmVuY3kgaXMgZGlmZmVyZW50IGZyb20gYmFzZSBjdXJyZW5jeS5cIlxuICAgICAgICAgICksXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBkZXNjcmlwdGlvbjogbm9ybWFsaXplZERlc2NyaXB0aW9uLFxuICAgICAgICAgIGN1cnJlbmN5Q29kZTogbm9ybWFsaXplZEN1cnJlbmN5LFxuICAgICAgICAgIGV4Y2hSYXRlOiBoYXNWYWxpZFJhdGUgPyBOdW1iZXIocGFyc2VkRXhjaGFuZ2VSYXRlKSA6IDEsXG4gICAgICAgICAgcHJvaklkOiBub3JtYWxpemVkUHJvamVjdElkIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICBleHBlbnNlU2hlZXRTdGF0dXM6IHJlc29sdmVkRXhwZW5zZVNoZWV0U3RhdHVzLFxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZU1vZGU6IHJlc29sdmVkRXhjaGFuZ2VSYXRlTW9kZSxcbiAgICAgICAgICBlc3RhZG9Db21lbnRhcmlvczogbm9ybWFsaXplZEVzdGFkb0NvbWVudGFyaW9zIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfSxcbiAgICBbXG4gICAgICBjYW5FZGl0SGVhZGVyRmllbGRzLFxuICAgICAgY3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUsXG4gICAgICBjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzLFxuICAgICAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcbiAgICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxuICAgICAgZHJhZnRQcm9qZWN0SWQsXG4gICAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXG4gICAgICBpc0NyZWF0ZU1vZGUsXG4gICAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcbiAgICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcbiAgICAgIGxvY2tlZEN1cnJlbmN5Q29kZSxcbiAgICAgIGxvY2tlZEV4Y2hhbmdlUmF0ZSxcbiAgICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsXG4gICAgXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZVVwZGF0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoYnVzeSB8fCAhaXNFZGl0aW5nKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFpc0NyZWF0ZU1vZGUgJiYgaXNFZGl0TG9ja2VkKSByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBjYW5Qcm9jZWVkID0gaXNDcmVhdGVNb2RlID8gY2FuQ3JlYXRlRXhwZW5zZSA6IGNhbkVkaXRFeHBlbnNlO1xuICAgIGlmICghY2FuUHJvY2VlZCkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHBheWxvYWRSZXN1bHQgPSBidWlsZFVwZGF0ZVBheWxvYWQoKTtcbiAgICBpZiAoXCJlcnJvclwiIGluIHBheWxvYWRSZXN1bHQpIHtcbiAgICAgIHNldE1vZGFsRXJyb3IocGF5bG9hZFJlc3VsdC5lcnJvcik7XG4gICAgICBzZXRTdGF0dXMocGF5bG9hZFJlc3VsdC5lcnJvcik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XG4gICAgICBzdGFydFN0YXR1czogaXNDcmVhdGVNb2RlXG4gICAgICAgID8gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKVxuICAgICAgICA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGluZ1wiLCBcIlVwZGF0aW5nIGV4cGVuc2Ugc2hlZXQuLi5cIiksXG4gICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKSxcbiAgICAgIHNldE1vZGFsRXJyb3IsXG4gICAgICBzZXRCdXN5LFxuICAgICAgc2V0U3RhdHVzLFxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgICAgICBjb25zdCBjcmVhdGVQYXlsb2FkID0gcGF5bG9hZFJlc3VsdC5wYXlsb2FkO1xuICAgICAgICAgIGNvbnN0IHBheWxvYWQ6IEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QgPSB7XG4gICAgICAgICAgICBtb2RlOiAxLFxuICAgICAgICAgICAgZXhpc3RpbmdIb2phR2FzdG9zSWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBjcmVhdGVQYXlsb2FkLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgY3VycmVuY3lDb2RlOiBjcmVhdGVQYXlsb2FkLmN1cnJlbmN5Q29kZSxcbiAgICAgICAgICAgIGV4Y2hSYXRlOiBjcmVhdGVQYXlsb2FkLmV4Y2hSYXRlLFxuICAgICAgICAgICAgcHJvaklkOiBjcmVhdGVQYXlsb2FkLnByb2pJZCxcbiAgICAgICAgICAgIGV4cGVuc2VTaGVldFN0YXR1czogMCxcbiAgICAgICAgICAgIGV4Y2hhbmdlUmF0ZU1vZGU6IGNyZWF0ZVBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSxcbiAgICAgICAgICAgIGxpbmVzOiBbXSxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjcmVhdGVFeHBlbnNlU2hlZXQocGF5bG9hZCk7XG5cbiAgICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQWNjZXB0IGJvdGggY2FzaW5nIHZhcmlhbnRzIGZyb20gYmFja2VuZCBlbnZlbG9wZXMuXG4gICAgICAgICAgY29uc3QgY3JlYXRlZERhdGEgPSByZXNwb25zZT8uRGF0YSBhcyB7IEhvamFHYXN0b3NJZD86IHVua25vd247IGhvamFHYXN0b3NJZD86IHVua25vd24gfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgICAgICAgY29uc3QgY3JlYXRlZFNoZWV0SWQgPSBTdHJpbmcoY3JlYXRlZERhdGE/LkhvamFHYXN0b3NJZCA/PyBjcmVhdGVkRGF0YT8uaG9qYUdhc3Rvc0lkID8/IFwiXCIpLnRyaW0oKTtcbiAgICAgICAgICBpZiAoIWNyZWF0ZWRTaGVldElkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvbkNyZWF0ZVN1Y2Nlc3MoY3JlYXRlZFNoZWV0SWQpO1xuICAgICAgICAgIHNldFN0YXR1cyhpbmRUKFwiQ29tbW9uX1NhdmVcIiwgXCJTYXZlXCIpKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyKHNoZWV0SWQsIHBheWxvYWRSZXN1bHQucGF5bG9hZCk7XG5cbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlZFwiLCBcIkV4cGVuc2Ugc2hlZXQgdXBkYXRlZFwiKSk7XG4gICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQub2s7XG4gIH0sIFtcbiAgICBidXN5LFxuICAgIGJ1aWxkVXBkYXRlUGF5bG9hZCxcbiAgICBjYW5DcmVhdGVFeHBlbnNlLFxuICAgIGNhbkVkaXRFeHBlbnNlLFxuICAgIGlzQ3JlYXRlTW9kZSxcbiAgICBpc0VkaXRMb2NrZWQsXG4gICAgaXNFZGl0aW5nLFxuICAgIG9uQ3JlYXRlU3VjY2VzcyxcbiAgICBzZXRCdXN5LFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldFN0YXR1cyxcbiAgICBzaGVldElkLFxuICBdKTtcblxuICBjb25zdCBoYW5kbGVTdGF0dXNUcmFuc2l0aW9uID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKG5leHRTdGF0dXM6IG51bWJlciwgc3RhcnRTdGF0dXM6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKGJ1c3kgfHwgaXNDcmVhdGVNb2RlIHx8ICFzaGVldElkKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAoIWNhblRyYW5zaXRpb25TdGF0dXMpIHtcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBheWxvYWRSZXN1bHQgPSBidWlsZFVwZGF0ZVBheWxvYWQobmV4dFN0YXR1cyk7XG4gICAgICBpZiAoXCJlcnJvclwiIGluIHBheWxvYWRSZXN1bHQpIHtcbiAgICAgICAgc2V0TW9kYWxFcnJvcihwYXlsb2FkUmVzdWx0LmVycm9yKTtcbiAgICAgICAgc2V0U3RhdHVzKHBheWxvYWRSZXN1bHQuZXJyb3IpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xuICAgICAgICBzdGFydFN0YXR1cyxcbiAgICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIiksXG4gICAgICAgIHNldE1vZGFsRXJyb3IsXG4gICAgICAgIHNldEJ1c3ksXG4gICAgICAgIHNldFN0YXR1cyxcbiAgICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB1cGRhdGVFeHBlbnNlU2hlZXRIZWFkZXIoc2hlZXRJZCwgcGF5bG9hZFJlc3VsdC5wYXlsb2FkKTtcblxuICAgICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IHVwZGF0ZWRcIikpO1xuICAgICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlc3VsdC5vaztcbiAgICB9LFxuICAgIFtidXN5LCBidWlsZFVwZGF0ZVBheWxvYWQsIGNhblRyYW5zaXRpb25TdGF0dXMsIGlzQ3JlYXRlTW9kZSwgc2V0QnVzeSwgc2V0SXNFZGl0aW5nLCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXMsIHNoZWV0SWRdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChidXN5KSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKGlzRGVsZXRlTG9ja2VkKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKCFjYW5EZWxldGVFeHBlbnNlKSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XG4gICAgICBzdGFydFN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0aW5nXCIsIFwiRGVsZXRpbmcgZXhwZW5zZSBzaGVldC4uLlwiKSxcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRXJyb3JcIiwgXCJEZWxldGUgZXJyb3IuXCIpLFxuICAgICAgc2V0TW9kYWxFcnJvcixcbiAgICAgIHNldEJ1c3ksXG4gICAgICBzZXRTdGF0dXMsXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXQoc2hlZXRJZCk7XG5cbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlZFwiLCBcIkV4cGVuc2Ugc2hlZXQgZGVsZXRlZFwiKSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHJldHVybiByZXN1bHQub2s7XG4gIH0sIFtidXN5LCBjYW5EZWxldGVFeHBlbnNlLCBpc0RlbGV0ZUxvY2tlZCwgc2V0QnVzeSwgc2V0TW9kYWxFcnJvciwgc2V0U3RhdHVzLCBzaGVldElkXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBoYW5kbGVVcGRhdGUsXG4gICAgaGFuZGxlU3RhdHVzVHJhbnNpdGlvbixcbiAgICBoYW5kbGVEZWxldGUsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zIH0gZnJvbSBcIi4uL2hvb2tzL3VzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucy50c1wiO1xuaW1wb3J0IHsgbmF2aWdhdGVUb0V4cGVuc2VVcmwgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcblxudHlwZSBVc2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zQXJncyA9IHtcbiAgYnVzeTogYm9vbGVhbjtcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcbiAgYWN0aW9uTW9kZT86IFwiZGVmYXVsdFwiIHwgXCJkZWxldGVfb25seVwiIHwgXCJ2aWV3X29ubHlcIjtcbiAgaXNMb2NrZWQ6IGJvb2xlYW47XG4gIGlzRWRpdExvY2tlZD86IGJvb2xlYW47XG4gIGlzRGVsZXRlTG9ja2VkPzogYm9vbGVhbjtcbiAgcGVybWlzc2lvbnNSZWFkeT86IGJvb2xlYW47XG4gIGNhbkVkaXRFeHBlbnNlOiBib29sZWFuO1xuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xuICBjYW5EZWxldGVFeHBlbnNlOiBib29sZWFuO1xuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuICBoYW5kbGVEZWxldGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XG4gIG9uRGVsZXRlU3VjY2Vzcz86ICgpID0+IHZvaWQ7XG4gIG9wZW5Db25maXJtOiAob3B0czoge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xuICAgIG9uQ29uZmlybT86ICgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQ7XG4gIH0pID0+IHZvaWQ7XG4gIGNsb3NlQ29uZmlybTogKCkgPT4gdm9pZDtcbn07XG5cbi8vIENvb3JkaW5hdGVzIHRvcGJhciBpY29uIHN0YXRlIGFuZCBkaXNwYXRjaCBhY3Rpb25zIGZvciBleHBlbnNlIHNoZWV0IGRldGFpbC5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zID0gKHtcbiAgYnVzeSxcbiAgbW9kYWxPcGVuLFxuICBpc0VkaXRpbmcsXG4gIGlzQ3JlYXRlTW9kZSxcbiAgYWN0aW9uTW9kZSA9IFwiZGVmYXVsdFwiLFxuICBpc0xvY2tlZCxcbiAgaXNFZGl0TG9ja2VkLFxuICBpc0RlbGV0ZUxvY2tlZCxcbiAgcGVybWlzc2lvbnNSZWFkeSA9IHRydWUsXG4gIGNhbkVkaXRFeHBlbnNlLFxuICBjYW5DcmVhdGVFeHBlbnNlLFxuICBjYW5EZWxldGVFeHBlbnNlLFxuICBzZXRNb2RhbEVycm9yLFxuICBoYW5kbGVFbmFibGVFZGl0LFxuICBoYW5kbGVDYW5jZWxFZGl0LFxuICBoYW5kbGVVcGRhdGUsXG4gIGhhbmRsZURlbGV0ZSxcbiAgb25TYXZlU3VjY2VzcyxcbiAgb25EZWxldGVTdWNjZXNzLFxuICBvcGVuQ29uZmlybSxcbiAgY2xvc2VDb25maXJtLFxufTogVXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MpID0+IHtcbiAgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zKHtcbiAgICBhY3Rpb25Hcm91cElkOiBcImV4cGVuc2Utc2hlZXQtZGV0YWlsLWFjdGlvbnNcIixcbiAgICBpZHM6IHtcbiAgICAgIGVkaXRJY29uSWQ6IFwiZXhwZW5zZUVkaXRJY29uXCIsXG4gICAgICBzYXZlSWNvbklkOiBcImV4cGVuc2VTYXZlSWNvblwiLFxuICAgICAgZGVsZXRlQnRuSWQ6IFwiZXhwZW5zZURlbGV0ZUJ0blwiLFxuICAgICAgY2FuY2VsQnRuSWQ6IFwiZXhwZW5zZUNhbmNlbEJ0blwiLFxuICAgIH0sXG4gICAgZXZlbnRzOiB7XG4gICAgICBlZGl0RXZlbnQ6IFwiZXhwZW5zZS1kZXRhaWwtZWRpdFwiLFxuICAgICAgZGVsZXRlRXZlbnQ6IFwiZXhwZW5zZS1kZXRhaWwtZGVsZXRlXCIsXG4gICAgICBjYW5jZWxFdmVudDogXCJleHBlbnNlLWRldGFpbC1jYW5jZWwtZWRpdFwiLFxuICAgIH0sXG4gICAgYnVzeSxcbiAgICBtb2RhbE9wZW4sXG4gICAgaXNFZGl0aW5nLFxuICAgIGlzQ3JlYXRlTW9kZSxcbiAgICBpc0xvY2tlZCxcbiAgICBhY3Rpb25Nb2RlLFxuICAgIGlzRWRpdExvY2tlZCxcbiAgICBpc0RlbGV0ZUxvY2tlZCxcbiAgICBhbGxvd0NyZWF0ZU1vZGVBY3Rpb25zV2hlbkxvY2tlZDogdHJ1ZSxcbiAgICBwZXJtaXNzaW9uc1JlYWR5LFxuICAgIGNhbkNyZWF0ZTogY2FuQ3JlYXRlRXhwZW5zZSxcbiAgICBjYW5FZGl0OiBjYW5FZGl0RXhwZW5zZSxcbiAgICBjYW5EZWxldGU6IGNhbkRlbGV0ZUV4cGVuc2UsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlU2F2ZTogaGFuZGxlVXBkYXRlLFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgICBzYXZlQ29uZmlybVRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiwgXCJTYXZlIGNoYW5nZXNcIiksXG4gICAgc2F2ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIHNhdmUgY2hhbmdlcz9cIiksXG4gICAgc2F2ZUNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX1NhdmVcIiwgXCJTYXZlXCIpLFxuICAgIGRlbGV0ZUNvbmZpcm1UaXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZVNoZWV0X1RpdGxlXCIsIFwiRGVsZXRlIGV4cGVuc2Ugc2hlZXRcIiksXG4gICAgZGVsZXRlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVTaGVldF9Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgZXhwZW5zZSBzaGVldD9cIiksXG4gICAgZGVsZXRlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpLFxuICAgIG9uU2F2ZVN1Y2Nlc3MsXG4gICAgb25EZWxldGVTdWNjZXNzOiBvbkRlbGV0ZVN1Y2Nlc3MgfHwgKCgpID0+IG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXRzXCIpKSxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBjbG9zZUNvbmZpcm0sXG4gIH0pO1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHtcbiAgRXhwZW5zZVNoZWV0SGVhZGVyLFxuICBFeHBlbnNlU2hlZXRMaW5lLFxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQge1xuICBmZXRjaEV4cGVuc2VTaGVldERldGFpbCxcbiAgZ2V0RXhjaGFuZ2VSYXRlLFxuICBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlLFxuICBtYXBFeHBlbnNlU2hlZXRIZWFkZXIsXG4gIG1hcEV4cGVuc2VTaGVldExpbmUsXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQge1xuICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsXG4gIG5hdmlnYXRlVG9FeHBlbnNlVXJsLFxuICBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLFxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcbmltcG9ydCB7IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VSZWNvcmQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU1hbmFnZWRVc2VyU2NvcGUudHNcIjtcbmltcG9ydCB7IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlTGFiZWwgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4Y2hhbmdlUmF0ZUVudHJ5TW9kZUNhdGFsb2cudHNcIjtcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSwgaGFzQXNzaWduZWRWb3VjaGVyLCBwYXJzZUV4cGVuc2VEYXRlLCBzYWZlVGV4dCwgdG9Jc29EYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIsIHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XG5pbXBvcnQgeyByZXNvbHZlRXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5IH0gZnJvbSBcIi4vZXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5LnRzXCI7XG5cbmNvbnN0IEVYQ0hBTkdFX1JBVEVfREVCT1VOQ0VfTVMgPSA0MDA7XG5jb25zdCBFWENIQU5HRV9SQVRFX1JFRkVSRU5DRV9BTU9VTlQgPSAxMDA7XG5jb25zdCBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTID0gNztcbmNvbnN0IEVYUEVOU0VfU1RBVFVTX0FQUFJPVkVEID0gMjtcbmNvbnN0IEVYUEVOU0VfU1RBVFVTX1BBSUQgPSA0O1xuXG4vLyBOb3JtYWxpemVzIGV4Y2hhbmdlLXJhdGUgbnVtYmVycyBmb3IgbnVtZXJpYyBpbnB1dCBjb250cm9scy5cbmNvbnN0IGZvcm1hdEV4Y2hhbmdlUmF0ZUlucHV0VmFsdWUgPSAodmFsdWU6IG51bWJlcik6IHN0cmluZyA9PiB7XG4gIHJldHVybiBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIodmFsdWUsIHtcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IEVYQ0hBTkdFX1JBVEVfREVDSU1BTF9ESUdJVFMsXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgIGZhbGxiYWNrOiBcIlwiLFxuICB9KTtcbn07XG5cbmNvbnN0IGJ1aWxkQ3JlYXRlSGVhZGVyRHJhZnQgPSAoKTogRXhwZW5zZVNoZWV0SGVhZGVyID0+IHtcbiAgcmV0dXJuIHtcbiAgICBob2phR2FzdG9zSWQ6IFwiXCIsXG4gICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgcHJvaklkOiBcIlwiLFxuICAgIGN1cnJlbmN5Q29kZTogXCJcIixcbiAgICB0b3RhbEFtb3VudDogbnVsbCxcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IDAsXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogMCxcbiAgICBjcmVhdGVkRGF0ZTogXCJcIixcbiAgICBleGNoUmF0ZTogXCIxXCIsXG4gIH07XG59O1xuXG5jb25zdCBzaG91bGRTaG93RXhjaGFuZ2VSYXRlID0gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQodmFsdWUpO1xuICBpZiAocGFyc2VkID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIE1hdGguYWJzKHBhcnNlZCkgPiAwO1xufTtcblxudHlwZSBVc2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZUFyZ3MgPSB7XG4gIGhhc0FjY2VzczogYm9vbGVhbjtcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcbiAgY2FuTWFuYWdlT3RoZXJVc2VyczogYm9vbGVhbjtcbiAgY3VycmVudEF4VXNlcklkOiBzdHJpbmc7XG4gIGN1cnJlbnRDcm1Vc2VySWQ6IHN0cmluZztcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkOiBzdHJpbmc7XG4gIHNoZWV0SWQ6IHN0cmluZztcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcbn07XG5cbi8vIE93bnMgc3RhdGUgYW5kIGJlaGF2aW9yIGZvciBleHBlbnNlIHNoZWV0IGRldGFpbCBwYWdlIChyZWFkLCBlZGl0LCBjcmVhdGUpLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlID0gKHtcbiAgaGFzQWNjZXNzLFxuICBjYW5DcmVhdGVFeHBlbnNlLFxuICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxuICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxuICBjdXJyZW50QXhVc2VySWQsXG4gIGN1cnJlbnRDcm1Vc2VySWQsXG4gIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcbiAgc2hlZXRJZCxcbiAgaXNDcmVhdGVNb2RlLFxuICBvbkZvcmJpZGRlbixcbn06IFVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlQXJncykgPT4ge1xuICBjb25zdCBbaGVhZGVyLCBzZXRIZWFkZXJdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0SGVhZGVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtsaW5lcywgc2V0TGluZXNdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0TGluZVtdPihbXSk7XG4gIGNvbnN0IFtsaW5lUGFnZSwgc2V0TGluZVBhZ2VdID0gdXNlU3RhdGUoMSk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtpc0VkaXRpbmcsIHNldElzRWRpdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFttb2RhbEVycm9yLCBzZXRNb2RhbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnREZXNjcmlwdGlvbiwgc2V0RHJhZnREZXNjcmlwdGlvbl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0UHJvamVjdElkLCBzZXREcmFmdFByb2plY3RJZF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0Q3VycmVuY3lDb2RlLCBzZXREcmFmdEN1cnJlbmN5Q29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0RXhjaGFuZ2VSYXRlLCBzZXREcmFmdEV4Y2hhbmdlUmF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0RXN0YWRvQ29tZW50YXJpb3MsIHNldERyYWZ0RXN0YWRvQ29tZW50YXJpb3NdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkZWZhdWx0Q3VycmVuY3lDb2RlLCBzZXREZWZhdWx0Q3VycmVuY3lDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbaXNFeGNoYW5nZVJhdGVMb2FkaW5nLCBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXhjaGFuZ2VSYXRlTWVzc2FnZSwgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2V4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yLCBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLCBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSwgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW29mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSwgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIGNvbnN0IGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIgPSB1c2VDYWxsYmFjaygobmV4dEhlYWRlcjogRXhwZW5zZVNoZWV0SGVhZGVyIHwgbnVsbCkgPT4ge1xuICAgIHNldERyYWZ0RGVzY3JpcHRpb24oc2FmZVRleHQobmV4dEhlYWRlcj8uZGVzY3JpcHRpb24pKTtcbiAgICBzZXREcmFmdFByb2plY3RJZChzYWZlVGV4dChuZXh0SGVhZGVyPy5wcm9qSWQpKTtcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZShzYWZlVGV4dChuZXh0SGVhZGVyPy5jdXJyZW5jeUNvZGUpKTtcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZShcbiAgICAgIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcihuZXh0SGVhZGVyPy5leGNoUmF0ZSwge1xuICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IEVYQ0hBTkdFX1JBVEVfREVDSU1BTF9ESUdJVFMsXG4gICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcbiAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgICAgIGZhbGxiYWNrOiBcIlwiLFxuICAgICAgfSlcbiAgICApO1xuICAgIHNldERyYWZ0RXN0YWRvQ29tZW50YXJpb3Moc2FmZVRleHQobmV4dEhlYWRlcj8uZXN0YWRvQ29tZW50YXJpb3MpKTtcbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbG9hZERldGFpbCA9IGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghaGFzQWNjZXNzKSB7XG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgICBpZiAoIWNhbkNyZWF0ZUV4cGVuc2UpIHtcbiAgICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRyYWZ0SGVhZGVyID0gYnVpbGRDcmVhdGVIZWFkZXJEcmFmdCgpO1xuICAgICAgICBzZXRIZWFkZXIoZHJhZnRIZWFkZXIpO1xuICAgICAgICBzZXRMaW5lcyhbXSk7XG4gICAgICAgIHNldExpbmVQYWdlKDEpO1xuICAgICAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XG4gICAgICAgIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIoZHJhZnRIZWFkZXIpO1xuICAgICAgICBzZXRTdGF0dXMoXCJcIik7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXNoZWV0SWQpIHtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCB3YXMgbm90IGZvdW5kLlwiKSk7XG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgc2V0TGluZXMoW10pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldERldGFpbChzaGVldElkLCB7XG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2U/Lk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBkZXRhaWwuXCIpKTtcbiAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgICAgc2V0TGluZXMoW10pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNoZWV0cyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkU2hlZXQgPVxuICAgICAgICAgIHNoZWV0cy5maW5kKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnk/LkhvamFHYXN0b3NJZCkudG9VcHBlckNhc2UoKSA9PT0gc2hlZXRJZC50cmltKCkudG9VcHBlckNhc2UoKSkgfHwgc2hlZXRzWzBdO1xuXG4gICAgICAgIGlmICghc2VsZWN0ZWRTaGVldCkge1xuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob3RGb3VuZFwiLCBcIkV4cGVuc2Ugc2hlZXQgd2FzIG5vdCBmb3VuZC5cIikpO1xuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgICBzZXRMaW5lcyhbXSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV4dEhlYWRlciA9IG1hcEV4cGVuc2VTaGVldEhlYWRlcihzZWxlY3RlZFNoZWV0KTtcbiAgICAgICAgY29uc3QgbmV4dExpbmVzID0gKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRTaGVldC5MaW5lcykgPyBzZWxlY3RlZFNoZWV0LkxpbmVzIDogW10pLm1hcCgoZW50cnkpID0+XG4gICAgICAgICAgbWFwRXhwZW5zZVNoZWV0TGluZShlbnRyeSlcbiAgICAgICAgKTtcbiAgICAgICAgc2V0SGVhZGVyKG5leHRIZWFkZXIpO1xuICAgICAgICBzZXRMaW5lcyhuZXh0TGluZXMpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKFxuICAgICAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBkZXRhaWwuXCIpXG4gICAgICAgICk7XG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgc2V0TGluZXMoW10pO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdm9pZCBsb2FkRGV0YWlsKCk7XG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlLCBoYXNBY2Nlc3MsIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIsIGlzQ3JlYXRlTW9kZSwgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaGVhZGVyIHx8IGlzRWRpdGluZykgcmV0dXJuO1xuICAgIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIoaGVhZGVyKTtcbiAgfSwgW2hlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNFZGl0aW5nXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWhhc0FjY2VzcykgcmV0dXJuO1xuICAgIGxldCBpc0NhbmNlbGxlZCA9IGZhbHNlO1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cbiAgICBjb25zdCBsb2FkRGVmYXVsdEN1cnJlbmN5Q29kZSA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSBhd2FpdCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlKHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XG4gICAgICAgIHNldERlZmF1bHRDdXJyZW5jeUNvZGUoc2FmZVRleHQoY29kZSkudG9VcHBlckNhc2UoKSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHJldHVybjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdm9pZCBsb2FkRGVmYXVsdEN1cnJlbmN5Q29kZSgpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpc0NhbmNlbGxlZCA9IHRydWU7XG4gICAgICBjb250cm9sbGVyLmFib3J0KCk7XG4gICAgfTtcbiAgfSwgW2hhc0FjY2Vzc10pO1xuXG4gIGNvbnN0IGhhc0FjdGl2ZVByb2Nlc3MgPSB1c2VNZW1vKCgpID0+IGJ1c3kgfHwgaXNFZGl0aW5nLCBbYnVzeSwgaXNFZGl0aW5nXSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZChoYXNBY3RpdmVQcm9jZXNzKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKCk7XG4gICAgfTtcbiAgfSwgW2hhc0FjdGl2ZVByb2Nlc3NdKTtcblxuICBjb25zdCBwcm9qZWN0VmFsdWUgPSBzYWZlVGV4dChoZWFkZXI/LnByb2pJZCk7XG4gIGNvbnN0IHN0YXR1c0NvZGUgPSB0eXBlb2YgaGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMgPT09IFwibnVtYmVyXCIgPyBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzIDogbnVsbDtcbiAgY29uc3QgaXNTaGVldEFwcHJvdmVkID0gc3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfQVBQUk9WRUQ7XG4gIGNvbnN0IGlzU2hlZXRQYWlkQnlTdGF0dXMgPSBzdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19QQUlEO1xuICBjb25zdCBpc1NoZWV0UGFpZEJ5Vm91Y2hlciA9IGhhc0Fzc2lnbmVkVm91Y2hlcihoZWFkZXI/LnZvdWNoZXIpO1xuICBjb25zdCBpc1NoZWV0UGFpZCA9IGlzU2hlZXRQYWlkQnlTdGF0dXMgfHwgaXNTaGVldFBhaWRCeVZvdWNoZXI7XG4gIGNvbnN0IGlzTWFuYWdpbmdPdGhlclVzZXIgPSBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkKHtcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxuICAgIGN1cnJlbnRBeFVzZXJJZCxcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcbiAgICByZWNvcmRPd25lclVzZXJJZDogaGVhZGVyPy51c2VySWQsXG4gICAgaXNDcmVhdGVNb2RlLFxuICB9KTtcbiAgY29uc3QgZGV0YWlsUG9saWN5ID0gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaW50ZXJhY3Rpb25Nb2RlOiBcImZ1bGxfZWRpdFwiIGFzIGNvbnN0LFxuICAgICAgICBzaG93RmFiOiBmYWxzZSxcbiAgICAgICAgY2FuRGVsZXRlU2hlZXQ6IGZhbHNlLFxuICAgICAgICBzdGF0dXNBY3Rpb25zOiBbXSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc29sdmVFeHBlbnNlU2hlZXREZXRhaWxQb2xpY3koe1xuICAgICAgc3RhdHVzQ29kZSxcbiAgICAgIGlzTWFuYWdpbmdPdGhlclVzZXIsXG4gICAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxuICAgICAgaXNQYWlkOiBpc1NoZWV0UGFpZCxcbiAgICB9KTtcbiAgfSwgW2FsbG93U2VsZk1hbmFnZW1lbnQsIGlzQ3JlYXRlTW9kZSwgaXNNYW5hZ2luZ090aGVyVXNlciwgaXNTaGVldFBhaWQsIHN0YXR1c0NvZGVdKTtcbiAgY29uc3QgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQgPSBpc0NyZWF0ZU1vZGUgfHwgKCFpc01hbmFnaW5nT3RoZXJVc2VyICYmIGRldGFpbFBvbGljeS5pbnRlcmFjdGlvbk1vZGUgPT09IFwiZnVsbF9lZGl0XCIpO1xuICBjb25zdCBjYW5FZGl0U3RhdHVzQ29tbWVudEN1cnJlbnQgPSAhaXNDcmVhdGVNb2RlICYmIGRldGFpbFBvbGljeS5pbnRlcmFjdGlvbk1vZGUgPT09IFwiY29tbWVudF9vbmx5X2VkaXRcIjtcbiAgY29uc3QgY2FuRWRpdEFueUN1cnJlbnQgPSAoaXNDcmVhdGVNb2RlICYmIGNhbkNyZWF0ZUV4cGVuc2UpIHx8IGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50IHx8IGNhbkVkaXRTdGF0dXNDb21tZW50Q3VycmVudDtcbiAgY29uc3QgY2FuVXNlRnVsbEVkaXRGZWF0dXJlcyA9ICFpc0NyZWF0ZU1vZGUgJiYgZGV0YWlsUG9saWN5LmludGVyYWN0aW9uTW9kZSA9PT0gXCJmdWxsX2VkaXRcIjtcbiAgY29uc3QgaXNTaGVldExvY2tlZCA9IGlzU2hlZXRBcHByb3ZlZCB8fCBpc1NoZWV0UGFpZDtcbiAgY29uc3QgaGFzTGluZXMgPSBsaW5lcy5sZW5ndGggPiAwO1xuICBjb25zdCBleGNoYW5nZVJhdGVWYWx1ZSA9IGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcihzYWZlVGV4dChoZWFkZXI/LmV4Y2hSYXRlKSwge1xuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IEVYQ0hBTkdFX1JBVEVfREVDSU1BTF9ESUdJVFMsXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgZmFsbGJhY2s6IFwiXCIsXG4gIH0pO1xuICBjb25zdCBzaG93RXhjaGFuZ2VSYXRlID0gdXNlTWVtbygoKSA9PiBzaG91bGRTaG93RXhjaGFuZ2VSYXRlKGV4Y2hhbmdlUmF0ZVZhbHVlKSwgW2V4Y2hhbmdlUmF0ZVZhbHVlXSk7XG4gIGNvbnN0IG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5ID0gdXNlTWVtbygoKSA9PiBkcmFmdEN1cnJlbmN5Q29kZS50cmltKCkudG9VcHBlckNhc2UoKSwgW2RyYWZ0Q3VycmVuY3lDb2RlXSk7XG4gIGNvbnN0IG5vcm1hbGl6ZWREZWZhdWx0Q3VycmVuY3kgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KGRlZmF1bHRDdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCksIFtkZWZhdWx0Q3VycmVuY3lDb2RlXSk7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSA9IG5vcm1hbGl6ZWREZWZhdWx0Q3VycmVuY3kgfHwgXCJFVVJcIjtcbiAgY29uc3QgdWlMb2NhbGUgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gXCJlcy1FU1wiO1xuICAgIHJldHVybiBzYWZlVGV4dChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ/LmxhbmcpIHx8IFwiZXMtRVNcIjtcbiAgfSwgW10pO1xuICBjb25zdCBmb3JtRXhjaGFuZ2VEYXRlID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgcGFyc2VkRGF0ZSA9IHBhcnNlRXhwZW5zZURhdGUoc2FmZVRleHQoaGVhZGVyPy5jcmVhdGVkRGF0ZSkpO1xuICAgIGlmIChwYXJzZWREYXRlKSByZXR1cm4gdG9Jc29EYXRlKHBhcnNlZERhdGUpO1xuICAgIHJldHVybiB0b0lzb0RhdGUobmV3IERhdGUoKSk7XG4gIH0sIFtoZWFkZXI/LmNyZWF0ZWREYXRlXSk7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZVJlcXVpcmVkID1cbiAgICBpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQgJiYgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgIT09IFwiXCIgJiYgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgIT09IGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeTtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UgPVxuICAgIGV4Y2hhbmdlUmF0ZVJlcXVpcmVkICYmICFkcmFmdEV4Y2hhbmdlUmF0ZS50cmltKClcbiAgICAgID8gaW5kVChcbiAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9FeGNoYW5nZVJhdGVSZXF1aXJlZFwiLFxuICAgICAgICAgIFwiRXhjaGFuZ2UgcmF0ZSBpcyByZXF1aXJlZCB3aGVuIGN1cnJlbmN5IGlzIGRpZmZlcmVudCBmcm9tIGJhc2UgY3VycmVuY3kuXCJcbiAgICAgICAgKVxuICAgICAgOiBcIlwiO1xuICAvLyBDdXJyZW5jeSB0eXBlIGNhbiBiZSBlZGl0ZWQgd2hlbmV2ZXIgdGhlIHNoZWV0IGl0c2VsZiBpcyBlZGl0YWJsZSAobm90IGFwcHJvdmVkL3BhaWQpLlxuICBjb25zdCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyA9IGZhbHNlO1xuICBjb25zdCBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMgPSBpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQgJiYgaGFzTGluZXMgJiYgc2hvd0V4Y2hhbmdlUmF0ZTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBpc0NhbmNlbGxlZCA9IGZhbHNlO1xuICAgIGxldCByZXF1ZXN0VGltZXI6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IHJlcXVlc3RBYm9ydENvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlciB8IG51bGwgPSBudWxsO1xuXG4gICAgY29uc3QgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzID0gKCkgPT4ge1xuICAgICAgaWYgKHJlcXVlc3RUaW1lcikge1xuICAgICAgICBjbGVhclRpbWVvdXQocmVxdWVzdFRpbWVyKTtcbiAgICAgICAgcmVxdWVzdFRpbWVyID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmIChyZXF1ZXN0QWJvcnRDb250cm9sbGVyKSB7XG4gICAgICAgIHJlcXVlc3RBYm9ydENvbnRyb2xsZXIuYWJvcnQoKTtcbiAgICAgICAgcmVxdWVzdEFib3J0Q29udHJvbGxlciA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICghaXNFZGl0aW5nIHx8ICFjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCB8fCBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMpIHtcbiAgICAgIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZyhmYWxzZSk7XG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFwiXCIpO1xuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNsZWFyUmVxdWVzdEFydGlmYWN0cygpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoIW5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5IHx8ICFleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3kpIHtcbiAgICAgIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZyhmYWxzZSk7XG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFwiXCIpO1xuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNsZWFyUmVxdWVzdEFydGlmYWN0cygpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAobm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgPT09IGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSkge1xuICAgICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUoXCIxXCIpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIjFcIik7XG4gICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcoZmFsc2UpO1xuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcIlwiKTtcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNsZWFyUmVxdWVzdEFydGlmYWN0cygpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXF1ZXN0VGltZXIgPSBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcbiAgICAgIHJlcXVlc3RBYm9ydENvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFwiXCIpO1xuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRFeGNoYW5nZVJhdGUoXG4gICAgICAgICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxuICAgICAgICAgIGZvcm1FeGNoYW5nZURhdGUsXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgICBzaWduYWw6IHJlcXVlc3RBYm9ydENvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MgfHwgIXJlc3BvbnNlLkRhdGEgfHwgIU51bWJlci5pc0Zpbml0ZShOdW1iZXIocmVzcG9uc2UuRGF0YS5SYXRlKSkpIHtcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFxuICAgICAgICAgICAgc2FmZVRleHQocmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX1VuYXZhaWxhYmxlXCIsIFwiTm8gc2UgcHVkbyBvYnRlbmVyIGVsIHRpcG8gZGUgY2FtYmlvLlwiKVxuICAgICAgICAgICk7XG4gICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb2ZmaWNpYWxSYXRlUmF3ID0gTnVtYmVyKHJlc3BvbnNlLkRhdGEuUmF0ZSk7XG4gICAgICAgIGNvbnN0IG9mZmljaWFsUmF0ZUZvckFtb3VudDEwMCA9IG9mZmljaWFsUmF0ZVJhdyAqIEVYQ0hBTkdFX1JBVEVfUkVGRVJFTkNFX0FNT1VOVDtcbiAgICAgICAgY29uc3QgbmV4dEV4Y2hhbmdlUmF0ZVZhbHVlID0gZm9ybWF0RXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZShvZmZpY2lhbFJhdGVGb3JBbW91bnQxMDApO1xuICAgICAgICBjb25zdCBvZmZpY2lhbFJhdGVSYXdWYWx1ZSA9IGZvcm1hdEV4Y2hhbmdlUmF0ZUlucHV0VmFsdWUob2ZmaWNpYWxSYXRlUmF3KTtcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShuZXh0RXhjaGFuZ2VSYXRlVmFsdWUpO1xuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKG9mZmljaWFsUmF0ZVJhd1ZhbHVlKTtcbiAgICAgICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUobmV4dEV4Y2hhbmdlUmF0ZVZhbHVlKTtcblxuICAgICAgICBjb25zdCBlZmZlY3RpdmVSYXRlRGF0ZSA9IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGEuRGF0ZSkgfHwgZm9ybUV4Y2hhbmdlRGF0ZTtcbiAgICAgICAgY29uc3Qgc291cmNlID0gc2FmZVRleHQocmVzcG9uc2UuRGF0YS5Tb3VyY2UpO1xuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoZWZmZWN0aXZlUmF0ZURhdGUpO1xuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShzb3VyY2UpO1xuICAgICAgICBjb25zdCBvZmZpY2lhbExhYmVsID0gZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCgwKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9PZmZpY2lhbFwiLCBcIlQuQy4gT2ZpY2lhbFwiKTtcbiAgICAgICAgY29uc3QgbG9jYWxpemVkUmF0ZURhdGUgPSBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoZWZmZWN0aXZlUmF0ZURhdGUsIHVpTG9jYWxlKSB8fCBlZmZlY3RpdmVSYXRlRGF0ZTtcbiAgICAgICAgY29uc3QgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UgPSBzb3VyY2UgPyBgJHtvZmZpY2lhbExhYmVsfSAke2xvY2FsaXplZFJhdGVEYXRlfSAoJHtzb3VyY2V9KWAgOiBgJHtvZmZpY2lhbExhYmVsfSAke2xvY2FsaXplZFJhdGVEYXRlfWA7XG4gICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2Uob2ZmaWNpYWxSYXRlUmF3VmFsdWUgPyBgJHtleGNoYW5nZVJhdGVJbmZvTWVzc2FnZX0gLSAke29mZmljaWFsUmF0ZVJhd1ZhbHVlfWAgOiBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZSk7XG4gICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHJldHVybjtcblxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSB7XG4gICAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xuICAgICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfTm90Rm91bmRcIiwgXCJObyBoYXkgdGlwbyBkZSBjYW1iaW8gcGFyYSBsYSBmZWNoYVwiKSk7XG4gICAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MjIgfHwgZXJyb3Iuc3RhdHVzID09PSA1MDApIHtcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XG4gICAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFxuICAgICAgICAgICAgICBzYWZlVGV4dChlcnJvci5tZXNzYWdlKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFxuICAgICAgICAgICAgc2FmZVRleHQoZXJyb3IubWVzc2FnZSkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX1VuYXZhaWxhYmxlXCIsIFwiTm8gc2UgcHVkbyBvYnRlbmVyIGVsIHRpcG8gZGUgY2FtYmlvLlwiKVxuICAgICAgICAgICk7XG4gICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcbiAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpKTtcbiAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoIWlzQ2FuY2VsbGVkKSB7XG4gICAgICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIEVYQ0hBTkdFX1JBVEVfREVCT1VOQ0VfTVMpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlzQ2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgIGNsZWFyUmVxdWVzdEFydGlmYWN0cygpO1xuICAgIH07XG4gIH0sIFtcbiAgICBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcbiAgICBmb3JtRXhjaGFuZ2VEYXRlLFxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgICBpc0VkaXRpbmcsXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxuICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxuICAgIHVpTG9jYWxlLFxuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlLFxuICBdKTtcblxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChpc0NyZWF0ZU1vZGUgfHwgaXNMb2FkaW5nIHx8ICFoZWFkZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWNhbkVkaXRBbnlDdXJyZW50KSB7XG4gICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgc2V0SXNFZGl0aW5nKHRydWUpO1xuICAgIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIoaGVhZGVyKTtcbiAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0VkaXRpbmdFbmFibGVkXCIsIFwiRWRpdGluZyBlbmFibGVkXCIpKTtcbiAgfSwgW2NhbkVkaXRBbnlDdXJyZW50LCBoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIsIGlzQ3JlYXRlTW9kZSwgaXNMb2FkaW5nLCBvbkZvcmJpZGRlbl0pO1xuXG4gIGNvbnN0IGhhbmRsZUNhbmNlbEVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL0V4cGVuc2VTaGVldHNcIiwge1xuICAgICAgICBhc2tDb25maXJtYXRpb246IHRydWUsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWlzRWRpdGluZykgcmV0dXJuO1xuXG4gICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIoaGVhZGVyKTtcbiAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIikpO1xuICB9LCBbaGVhZGVyLCBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZ10pO1xuXG4gIC8vIE9wZW5zIGV4cGVuc2Ugc2hlZXQgY3JlYXRlIG1vZGUgZnJvbSBsaXN0LWxldmVsIGVudHJ5IHBvaW50cy5cbiAgY29uc3QgaGFuZGxlT3BlbkNyZWF0ZVNoZWV0TW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWNhbkNyZWF0ZUV4cGVuc2UpIHtcbiAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/bW9kZT1jcmVhdGVcIiwge1xuICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXG4gICAgfSk7XG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgb25Gb3JiaWRkZW5dKTtcblxuICAvLyBPcGVucyBleHBlbnNlIGxpbmUgY3JlYXRlIG1vZGUgZnJvbSBhbiBleGlzdGluZyBleHBlbnNlIHNoZWV0IGRldGFpbC5cbiAgY29uc3QgaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghc2hlZXRJZCB8fCAhY2FuVXNlRnVsbEVkaXRGZWF0dXJlcykge1xuICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0TGluZURldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2hlZXRJZCl9Jm1vZGU9Y3JlYXRlYDtcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwsIHtcbiAgICAgIGFza0NvbmZpcm1hdGlvbjogaXNFZGl0aW5nLFxuICAgIH0pO1xuICB9LCBbY2FuVXNlRnVsbEVkaXRGZWF0dXJlcywgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmcsIG9uRm9yYmlkZGVuLCBzaGVldElkXSk7XG5cbiAgLy8gT3BlbnMgdGlja2V0cyBwYWdlIGZyb20gZXhwZW5zZSBzaGVldCBjb250ZXh0IHRvIGNyZWF0ZSBvciBsaW5rIHRpY2tldHMuXG4gIGNvbnN0IG9wZW5UaWNrZXRzRnJvbVNoZWV0ID0gdXNlQ2FsbGJhY2soXG4gICAgKGFjdGlvbjogXCJuZXdcIiB8IFwibGlua1wiKSA9PiB7XG4gICAgICBpZiAoIXNoZWV0SWQgfHwgIWNhblVzZUZ1bGxFZGl0RmVhdHVyZXMpIHtcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcbiAgICAgICAgYWN0aW9uLFxuICAgICAgICBob2phR2FzdG9zSWQ6IHNoZWV0SWQsXG4gICAgICB9KTtcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldHM/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgb25Gb3JiaWRkZW4sIHNoZWV0SWRdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlT3BlbkNyZWF0ZVRpY2tldE1vZGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgb3BlblRpY2tldHNGcm9tU2hlZXQoXCJuZXdcIik7XG4gIH0sIFtvcGVuVGlja2V0c0Zyb21TaGVldF0pO1xuXG4gIGNvbnN0IGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBvcGVuVGlja2V0c0Zyb21TaGVldChcImxpbmtcIik7XG4gIH0sIFtvcGVuVGlja2V0c0Zyb21TaGVldF0pO1xuXG4gIGNvbnN0IG5hdmlnYXRlVG9DcmVhdGVkU2hlZXQgPSB1c2VDYWxsYmFjaygoY3JlYXRlZFNoZWV0SWQ6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHNhZmVDcmVhdGVkU2hlZXRJZCA9IHNhZmVUZXh0KGNyZWF0ZWRTaGVldElkKTtcbiAgICBpZiAoIXNhZmVDcmVhdGVkU2hlZXRJZCkgcmV0dXJuO1xuXG4gICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlQ3JlYXRlZFNoZWV0SWQpfWA7XG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwodGFyZ2V0VXJsKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IG5hdmlnYXRlVG9MaW5lRGV0YWlsID0gdXNlQ2FsbGJhY2soXG4gICAgKGxpbmVSZWNJZDogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBzYWZlTGluZUlkID0gc2FmZVRleHQobGluZVJlY0lkKTtcbiAgICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQoc2hlZXRJZCk7XG4gICAgICBpZiAoIXNhZmVMaW5lSWQgfHwgIXNhZmVTaGVldElkKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IHRhcmdldFVybCA9IGAvR2FzdG9zL0V4cGVuc2VTaGVldExpbmVEZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVTaGVldElkKX0mbGluZVJlY0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVMaW5lSWQpfWA7XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwsIHtcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiB0cnVlLFxuICAgICAgICBieXBhc3NHdWFyZE9uY2U6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbc2hlZXRJZF1cbiAgKTtcblxuICByZXR1cm4ge1xuICAgIGhlYWRlcixcbiAgICBsaW5lcyxcbiAgICBsaW5lUGFnZSxcbiAgICBpc0xvYWRpbmcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGJ1c3ksXG4gICAgc3RhdHVzLFxuICAgIGlzRWRpdGluZyxcbiAgICBtb2RhbEVycm9yLFxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgZHJhZnRQcm9qZWN0SWQsXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgZHJhZnRFeGNoYW5nZVJhdGUsXG4gICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlLFxuICAgIGlzRXhjaGFuZ2VSYXRlTG9hZGluZyxcbiAgICBleGNoYW5nZVJhdGVNZXNzYWdlLFxuICAgIGV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yLFxuICAgIHByb2plY3RWYWx1ZSxcbiAgICBpc1NoZWV0QXBwcm92ZWQsXG4gICAgaXNTaGVldFBhaWQsXG4gICAgaXNTaGVldExvY2tlZCxcbiAgICBleGNoYW5nZVJhdGVWYWx1ZSxcbiAgICBzaG93RXhjaGFuZ2VSYXRlLFxuICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQ6IEVYQ0hBTkdFX1JBVEVfUkVGRVJFTkNFX0FNT1VOVCxcbiAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSxcbiAgICBkZXRhaWxQb2xpY3ksXG4gICAgaXNNYW5hZ2luZ090aGVyVXNlcixcbiAgICBjYW5FZGl0U3RhdHVzQ29tbWVudEN1cnJlbnQsXG4gICAgY2FuRWRpdEFueUN1cnJlbnQsXG4gICAgY2FuVXNlRnVsbEVkaXRGZWF0dXJlcyxcbiAgICBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcbiAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXG4gICAgc2V0TGluZVBhZ2UsXG4gICAgc2V0TGluZXMsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRTdGF0dXMsXG4gICAgc2V0SXNFZGl0aW5nLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcbiAgICBzZXREcmFmdFByb2plY3RJZCxcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgICBzZXREcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVPcGVuQ3JlYXRlU2hlZXRNb2RlLFxuICAgIGhhbmRsZU9wZW5DcmVhdGVMaW5lTW9kZSxcbiAgICBoYW5kbGVPcGVuQ3JlYXRlVGlja2V0TW9kZSxcbiAgICBoYW5kbGVPcGVuTGlua1RpY2tldE1vZGUsXG4gICAgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldCxcbiAgICBuYXZpZ2F0ZVRvTGluZURldGFpbCxcbiAgfTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsZ0JBQWtCOzs7QUNBbEIsSUFBQUMsZ0JBQWtCOzs7QUNBbEIsbUJBQWlGO0FBQ2pGLHVCQUE2QjtBQXlHckI7QUE3RlIsSUFBTSx3QkFBd0IsQ0FBQztBQUFBLEVBQzdCO0FBQUEsRUFDQTtBQUFBLEVBQ0EsWUFBWTtBQUFBLEVBQ1osaUJBQWlCO0FBQ25CLE1BQWtDO0FBQ2hDLFFBQU0sZ0NBQWdDO0FBQ3RDLFFBQU0sOEJBQThCO0FBQ3BDLFFBQU0sdUJBQXVCO0FBQzdCLFFBQU0sZ0JBQWdCO0FBQ3RCLFFBQU0sQ0FBQyxRQUFRLFNBQVMsUUFBSSx1QkFBUyxLQUFLO0FB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TSxXQUFXLFFBQVEsV0FBVztBQUFBLFFBQ3BDLFVBQVUsV0FBVztBQUFBLFFBQ3JCLGVBQWUsV0FBVztBQUFBO0FBQUEsSUFDNUIsSUFDRTtBQUFBLElBRUgsV0FBVyxVQUNWO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxXQUFXLEtBQUssNkJBQTZCLHFCQUFrQjtBQUFBLFFBQy9ELE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLFFBQVEsV0FBVyxzQkFBc0Isb0NBQW9DO0FBQUEsUUFDN0UsZUFBZSxLQUFLLDZCQUE2QixxQkFBa0I7QUFBQSxRQUNuRSxXQUFXLFdBQVc7QUFBQTtBQUFBLElBQ3hCLElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFHQSxJQUFNLHlCQUF5QixNQUFNO0FBQ25DLFNBQ0UsNkNBQUMsZ0NBQXFCLHlCQUF1QixNQUMzQyx1REFBQyxpQ0FBOEIsR0FDakM7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLDBCQUF3QjtBQUN4QixRQUFNLFNBQVMsU0FBUyxlQUFlLDJCQUEyQjtBQUNsRSxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLDBCQUF1QixDQUFFO0FBQ3JEO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxpQ0FBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAicmVzcG9uc2UiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiXQp9Cg==
