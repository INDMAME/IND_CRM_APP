import {
  useExpenseSheetsFilterCache
} from "./chunks/chunk-2GJBCQBO.js";
import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-T5YBQJ7T.js";
import {
  PageBottomActionButton,
  PageBottomActions_default,
  TICKET_IMAGE_ACCEPT_ATTRIBUTE,
  useExpenseSheetQuickTicketFlow
} from "./chunks/chunk-SP5ZER7M.js";
import {
  resolveExpenseSheetDetailPolicy
} from "./chunks/chunk-YSFQS4W5.js";
import {
  getExpenseStatusLabel
} from "./chunks/chunk-W2YOA3BT.js";
import "./chunks/chunk-PAD7VA7I.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-QGBVJNF4.js";
import "./chunks/chunk-6HMZLOGF.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseCurrencyFlagIcon_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-CL6KAXCB.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-YGPFKAYG.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-FRQBPU47.js";
import {
  useOutsideClick
} from "./chunks/chunk-6YXFJB4W.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-66XMPGLV.js";
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
  Spinner_default,
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
var ExpenseSheetStatusActionBar = ({ actions, busy, onActionClick }) => {
  if (actions.length < 1) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(PageBottomActions_default, { ariaLabel: indT("ExpenseSheets_BottomActions_Toolbar", "Expense sheet status actions"), children: actions.map((action) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    PageBottomActionButton,
    {
      label: indT(action.labelKey, action.fallback),
      disabled: busy,
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
    quickTicketBusy ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/35 px-4", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "glass-panel shadow-card flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-sm text-slate-700", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Spinner_default, { size: "h-5 w-5", label: indT("Common_Loading", "Loading") }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: quickTicketProgressMessage || indT("Common_Loading", "Loading") })
    ] }) }) : null,
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
    [closeConfirm, handleStatusTransition, header?.expenseSheetStatus, invalidateCachedListForRefetch, openConfirm]
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvRXhwZW5zZVNoZWV0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvbi50c3giLCAiLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9JbmZvUG9wb3Zlckljb25CdXR0b24udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29uc3RhbnRzL2V4Y2hhbmdlUmF0ZUVudHJ5TW9kZUNhdGFsb2cudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VTaGVldEhlYWRlckZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlTGluZXNUaW1lbGluZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC9FeHBlbnNlU2hlZXREZXRhaWxPdmVybGF5cy50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRyb2xsZXIudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC91c2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcbmltcG9ydCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nQWN0aW9uQnV0dG9uLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VTaGVldEhlYWRlckZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0SGVhZGVyRm9ybS50c3hcIjtcbmltcG9ydCBFeHBlbnNlTGluZXNUaW1lbGluZSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlTGluZXNUaW1lbGluZS50c3hcIjtcbmltcG9ydCBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25CYXIgZnJvbSBcIi4vRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzIGZyb20gXCIuL0V4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzLnRzeFwiO1xuaW1wb3J0IHsgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGgsIHVzZUV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250cm9sbGVyIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRyb2xsZXIudHN4XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlIH0gZnJvbSBcIi4uL2xpc3QvdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlLnRzXCI7XG5cbmNvbnN0IERFVEFJTF9GQUJfQk9UVE9NX1dJVEhfQUNUSU9OX0JBUiA9IDE3NjtcbmNvbnN0IEVYUEVOU0VfU0hFRVRTX0xJU1RfVVJMID0gXCIvR2FzdG9zL0V4cGVuc2VTaGVldHNcIjtcblxuY29uc3QgRXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRlbnQgPSAoKSA9PiB7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSB1c2VFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udHJvbGxlcigpO1xuICBjb25zdCB7IHJlYWRDYWNoZWRTdGF0ZSwgc2F2ZUNhY2hlZFN0YXRlIH0gPSB1c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUoKTtcblxuICBjb25zdCByZWFybUV4cGVuc2VTaGVldHNSZXR1cm5TdGF0ZSA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBjYWNoZWRTdGF0ZSA9IHJlYWRDYWNoZWRTdGF0ZSgpO1xuICAgIGlmICghY2FjaGVkU3RhdGUpIHJldHVybjtcbiAgICBzYXZlQ2FjaGVkU3RhdGUoY2FjaGVkU3RhdGUpO1xuICB9LCBbcmVhZENhY2hlZFN0YXRlLCBzYXZlQ2FjaGVkU3RhdGVdKTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGJhY2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbEJhY2tCdG5cIik7XG4gICAgaWYgKCFiYWNrQnV0dG9uKSByZXR1cm47XG5cbiAgICBiYWNrQnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtYmFjay11cmxcIiwgRVhQRU5TRV9TSEVFVFNfTElTVF9VUkwpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGJhY2tCdXR0b24ucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1iYWNrLXVybFwiKTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVOYXRpdmVCYWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQ/LnN0YXRlICYmIGV2ZW50LnN0YXRlLmluZFRyYXAgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBleGVjdXRlQmFja05hdmlnYXRpb24gPSAoKSA9PiB7XG4gICAgICAgIHJlYXJtRXhwZW5zZVNoZWV0c1JldHVyblN0YXRlKCk7XG4gICAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShFWFBFTlNFX1NIRUVUU19MSVNUX1VSTCk7XG4gICAgICB9O1xuXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdy5fX2luZFJlcXVlc3ROYXZpZ2F0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24oZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBleGVjdXRlQmFja05hdmlnYXRpb24oKTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBoYW5kbGVOYXRpdmVCYWNrKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBoYW5kbGVOYXRpdmVCYWNrKTtcbiAgICB9O1xuICB9LCBbcmVhcm1FeHBlbnNlU2hlZXRzUmV0dXJuU3RhdGVdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICA8RXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXNcbiAgICAgICAgbW9kYWw9e2NvbnRyb2xsZXIubW9kYWx9XG4gICAgICAgIG1vZGFsRXJyb3I9e2NvbnRyb2xsZXIubW9kYWxFcnJvcn1cbiAgICAgICAgc3RhdHVzPXtjb250cm9sbGVyLnN0YXR1c31cbiAgICAgICAgYnVzeT17Y29udHJvbGxlci5idXN5fVxuICAgICAgICBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGU9e2NvbnRyb2xsZXIuaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlfVxuICAgICAgICBtb2RhbExvYWRpbmdUZXh0PXtjb250cm9sbGVyLm1vZGFsTG9hZGluZ1RleHR9XG4gICAgICAgIG1vZGFsQ2FuY2VsVGV4dD17Y29udHJvbGxlci5tb2RhbENhbmNlbFRleHR9XG4gICAgICAgIG1vZGFsQ29uZmlybVRleHQ9e2NvbnRyb2xsZXIubW9kYWxDb25maXJtVGV4dH1cbiAgICAgICAgY2FtZXJhSW5wdXRSZWY9e2NvbnRyb2xsZXIuY2FtZXJhSW5wdXRSZWZ9XG4gICAgICAgIGdhbGxlcnlJbnB1dFJlZj17Y29udHJvbGxlci5nYWxsZXJ5SW5wdXRSZWZ9XG4gICAgICAgIHNvdXJjZVBpY2tlck9wZW49e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnNvdXJjZVBpY2tlck9wZW59XG4gICAgICAgIHF1aWNrVGlja2V0QnVzeT17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuYnVzeX1cbiAgICAgICAgcXVpY2tUaWNrZXRQcm9ncmVzc01lc3NhZ2U9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnByb2dyZXNzTWVzc2FnZX1cbiAgICAgICAgcXVpY2tUaWNrZXRFcnJvck1lc3NhZ2U9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmVycm9yTWVzc2FnZX1cbiAgICAgICAgcXVpY2tUaWNrZXRBdHRlbXB0SWQ9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmF0dGVtcHRJZH1cbiAgICAgICAgcXVpY2tUaWNrZXRUcmFjZUxpc3Q9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnRyYWNlTGlzdH1cbiAgICAgICAgaGFzUGVuZGluZ1VwbG9hZFJldHJ5PXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5oYXNQZW5kaW5nVXBsb2FkUmV0cnl9XG4gICAgICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5oYXNQYXJ0aWFsVGlja2V0RmFpbHVyZX1cbiAgICAgICAgb25Db25maXJtPXtjb250cm9sbGVyLmhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cbiAgICAgICAgb25DYW5jZWw9e2NvbnRyb2xsZXIuY2xvc2VDb25maXJtfVxuICAgICAgICBvblNlbGVjdGVkQ2FtZXJhRmlsZT17KGZpbGUpID0+IHtcbiAgICAgICAgICB2b2lkIGNvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmhhbmRsZVNlbGVjdGVkRmlsZShmaWxlLCBcImNhbWVyYVwiKTtcbiAgICAgICAgfX1cbiAgICAgICAgb25TZWxlY3RlZEdhbGxlcnlGaWxlPXsoZmlsZSkgPT4ge1xuICAgICAgICAgIHZvaWQgY29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuaGFuZGxlU2VsZWN0ZWRGaWxlKGZpbGUsIFwiZ2FsbGVyeVwiKTtcbiAgICAgICAgfX1cbiAgICAgICAgb25TZWxlY3RGcm9tQ2FtZXJhPXsoKSA9PiB7XG4gICAgICAgICAgdm9pZCBjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5zZWxlY3RGcm9tQ2FtZXJhKGNvbnRyb2xsZXIuY2FtZXJhSW5wdXRSZWYuY3VycmVudCk7XG4gICAgICAgIH19XG4gICAgICAgIG9uU2VsZWN0RnJvbUdhbGxlcnk9eygpID0+IGNvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnNlbGVjdEZyb21HYWxsZXJ5KGNvbnRyb2xsZXIuZ2FsbGVyeUlucHV0UmVmLmN1cnJlbnQpfVxuICAgICAgICBvbkNsb3NlU291cmNlUGlja2VyPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5jbG9zZVNvdXJjZVBpY2tlcn1cbiAgICAgICAgb25SZXRyeVBlbmRpbmdVcGxvYWQ9eygpID0+IHtcbiAgICAgICAgICB2b2lkIGNvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnJldHJ5UGVuZGluZ1VwbG9hZCgpO1xuICAgICAgICB9fVxuICAgICAgICBvbk9wZW5DcmVhdGVkVGlja2V0PXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5vcGVuQ3JlYXRlZFRpY2tldH1cbiAgICAgICAgb25DbGVhclF1aWNrVGlja2V0RXJyb3I9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmNsZWFyRXJyb3J9XG4gICAgICAvPlxuXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGNvbnRyb2xsZXIuaXNMb2FkaW5nIHx8IGNvbnRyb2xsZXIuaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9fVxuICAgICAgPlxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XG4gICAgICA8L2Rpdj5cblxuICAgICAge2NvbnRyb2xsZXIuZXJyb3JNZXNzYWdlID8gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntjb250cm9sbGVyLmVycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxuXG4gICAgICB7IWNvbnRyb2xsZXIuaXNMb2FkaW5nICYmICFjb250cm9sbGVyLmlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSAmJiAhY29udHJvbGxlci5lcnJvck1lc3NhZ2UgJiYgY29udHJvbGxlci5oZWFkZXIgPyAoXG4gICAgICAgIDxFeHBlbnNlU2hlZXRIZWFkZXJGb3JtXG4gICAgICAgICAgaXNDcmVhdGVNb2RlPXtjb250cm9sbGVyLmlzQ3JlYXRlTW9kZX1cbiAgICAgICAgICBpc0VkaXRpbmc9e2NvbnRyb2xsZXIuaXNFZGl0aW5nfVxuICAgICAgICAgIGNhbkVkaXRIZWFkZXJGaWVsZHM9e2NvbnRyb2xsZXIuY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnR9XG4gICAgICAgICAgc3RhdHVzQ29tbWVudE1vZGU9e2NvbnRyb2xsZXIuc3RhdHVzQ29tbWVudE1vZGV9XG4gICAgICAgICAgaGVhZGVyPXtjb250cm9sbGVyLmhlYWRlcn1cbiAgICAgICAgICBwcm9qZWN0VmFsdWU9e2NvbnRyb2xsZXIucHJvamVjdFZhbHVlfVxuICAgICAgICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzPXtjb250cm9sbGVyLmlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzfVxuICAgICAgICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcz17Y29udHJvbGxlci5pc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXN9XG4gICAgICAgICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3k9e2NvbnRyb2xsZXIubm9ybWFsaXplZERyYWZ0Q3VycmVuY3l9XG4gICAgICAgICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5PXtjb250cm9sbGVyLmV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQ9e2NvbnRyb2xsZXIuZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50fVxuICAgICAgICAgIHNob3dFeGNoYW5nZVJhdGU9e2NvbnRyb2xsZXIuc2hvd0V4Y2hhbmdlUmF0ZX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVWYWx1ZT17Y29udHJvbGxlci5leGNoYW5nZVJhdGVWYWx1ZX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZT17Y29udHJvbGxlci5leGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZX1cbiAgICAgICAgICB0b3RhbEFtb3VudFRleHQ9e2NvbnRyb2xsZXIudG90YWxBbW91bnRUZXh0fVxuICAgICAgICAgIGRyYWZ0RGVzY3JpcHRpb249e2NvbnRyb2xsZXIuZHJhZnREZXNjcmlwdGlvbn1cbiAgICAgICAgICBkcmFmdFByb2plY3RJZD17Y29udHJvbGxlci5kcmFmdFByb2plY3RJZH1cbiAgICAgICAgICBkcmFmdEN1cnJlbmN5Q29kZT17Y29udHJvbGxlci5kcmFmdEN1cnJlbmN5Q29kZX1cbiAgICAgICAgICBkcmFmdEV4Y2hhbmdlUmF0ZT17Y29udHJvbGxlci5kcmFmdEV4Y2hhbmdlUmF0ZX1cbiAgICAgICAgICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zPXtjb250cm9sbGVyLmRyYWZ0RXN0YWRvQ29tZW50YXJpb3N9XG4gICAgICAgICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZT17Y29udHJvbGxlci5vZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlfVxuICAgICAgICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZT17Y29udHJvbGxlci5vZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGV9XG4gICAgICAgICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2U9e2NvbnRyb2xsZXIub2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2V9XG4gICAgICAgICAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlPXtjb250cm9sbGVyLnNldERyYWZ0RGVzY3JpcHRpb259XG4gICAgICAgICAgb25EcmFmdFByb2plY3RJZENoYW5nZT17Y29udHJvbGxlci5zZXREcmFmdFByb2plY3RJZH1cbiAgICAgICAgICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlPXtjb250cm9sbGVyLnNldERyYWZ0Q3VycmVuY3lDb2RlfVxuICAgICAgICAgIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2U9e2NvbnRyb2xsZXIuc2V0RHJhZnRFeGNoYW5nZVJhdGV9XG4gICAgICAgICAgb25EcmFmdEVzdGFkb0NvbWVudGFyaW9zQ2hhbmdlPXtjb250cm9sbGVyLnNldERyYWZ0RXN0YWRvQ29tZW50YXJpb3N9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgeyFjb250cm9sbGVyLmlzQ3JlYXRlTW9kZSAmJiAhY29udHJvbGxlci5pc0xvYWRpbmcgJiYgIWNvbnRyb2xsZXIuaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlICYmICFjb250cm9sbGVyLmVycm9yTWVzc2FnZSA/IChcbiAgICAgICAgPEV4cGVuc2VMaW5lc1RpbWVsaW5lXG4gICAgICAgICAgdmlzaWJsZUxpbmVzPXtjb250cm9sbGVyLnZpc2libGVMaW5lc31cbiAgICAgICAgICBjdXJyZW5jeUNvZGU9e3NhZmVUZXh0KGNvbnRyb2xsZXIuaGVhZGVyPy5jdXJyZW5jeUNvZGUpfVxuICAgICAgICAgIHRvdGFsTGluZVBhZ2VzPXtjb250cm9sbGVyLnRvdGFsTGluZVBhZ2VzfVxuICAgICAgICAgIGxpbmVQYWdlPXtjb250cm9sbGVyLmxpbmVQYWdlfVxuICAgICAgICAgIGxpbmVzTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0xpbmVzXCIsIFwiTGluZXNcIil9XG4gICAgICAgICAgZW1wdHlUZXh0PXtpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob0xpbmVzXCIsIFwiTm8gbGluZXMgZm9yIHRoaXMgZXhwZW5zZSBzaGVldC5cIil9XG4gICAgICAgICAgcGFnaW5hdGlvbkxhYmVscz17Y29udHJvbGxlci5wYWdpbmF0aW9uTGFiZWxzfVxuICAgICAgICAgIGNvbnRhaW5lclJlZj17Y29udHJvbGxlci5saW5lQ29udGFpbmVyUmVmfVxuICAgICAgICAgIG9uTGluZVBhZ2VDaGFuZ2U9e2NvbnRyb2xsZXIuc2V0TGluZVBhZ2V9XG4gICAgICAgICAgb25PcGVuTGluZT17Y29udHJvbGxlci5uYXZpZ2F0ZVRvTGluZURldGFpbH1cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7Y29udHJvbGxlci5zaG93U3RhdHVzQWN0aW9uQmFyID8gKFxuICAgICAgICA8RXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyXG4gICAgICAgICAgYWN0aW9ucz17Y29udHJvbGxlci5kZXRhaWxQb2xpY3kuc3RhdHVzQWN0aW9uc31cbiAgICAgICAgICBidXN5PXtjb250cm9sbGVyLmJ1c3kgfHwgY29udHJvbGxlci5pc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGV9XG4gICAgICAgICAgb25BY3Rpb25DbGljaz17Y29udHJvbGxlci5oYW5kbGVTdGF0dXNBY3Rpb25DbGlja31cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7Y29udHJvbGxlci5zaG93RmFiID8gKFxuICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b25cbiAgICAgICAgICBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgclx1MDBFMXBpZGFzXCIpfVxuICAgICAgICAgIHNpemU9ezc2fVxuICAgICAgICAgIHJpZ2h0PXsxNn1cbiAgICAgICAgICBib3R0b209e2NvbnRyb2xsZXIuc2hvd1N0YXR1c0FjdGlvbkJhciA/IERFVEFJTF9GQUJfQk9UVE9NX1dJVEhfQUNUSU9OX0JBUiA6IDI0fVxuICAgICAgICAgIG1lbnVBcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgclx1MDBFMXBpZGFzXCIpfVxuICAgICAgICAgIG1lbnVJdGVtcz17Y29udHJvbGxlci5mYWJNZW51SXRlbXN9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbi8vIE1haW4gcGFnZSBlbnRyeSBmb3IgZXhwZW5zZSBzaGVldCBkZXRhaWwuXG5jb25zdCBFeHBlbnNlU2hlZXREZXRhaWxQYWdlID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycyBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD5cbiAgICAgIDxFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udGVudCAvPlxuICAgIDwvVmlzaXRhc1BhZ2VQcm92aWRlcnM+XG4gICk7XG59O1xuXG5jb25zdCBtb3VudCA9ICgpID0+IHtcbiAgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGgoKTtcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJleHBlbnNlLXNoZWV0LWRldGFpbC1yb290XCIpO1xuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPEV4cGVuc2VTaGVldERldGFpbFBhZ2UgLz4pO1xufTtcblxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldERldGFpbFBhZ2U7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgSW5mb1BvcG92ZXJJY29uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvSW5mb1BvcG92ZXJJY29uQnV0dG9uLnRzeFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0IGZyb20gXCIuL0V4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdC50c3hcIjtcbmltcG9ydCBFeHBlbnNlQ3VycmVuY3lGbGFnSWNvbiBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGbGFnSWNvbi50c3hcIjtcbmltcG9ydCBFeHBlbnNlUmVhZE9ubHlGaWVsZCBmcm9tIFwiLi9FeHBlbnNlUmVhZE9ubHlGaWVsZC50c3hcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyLCBmb3JtYXRFeHBlbnNlTnVtYmVyIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcblxudHlwZSBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb25Qcm9wcyA9IHtcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBjYW5FZGl0SGVhZGVyRmllbGRzOiBib29sZWFuO1xuICBpc0ZvcmVpZ25DdXJyZW5jeTogYm9vbGVhbjtcbiAgZXhwZW5zZUN1cnJlbmN5TGFiZWw6IHN0cmluZztcbiAgaGVhZGVyQ3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGJhc2VDdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgZHJhZnRFeGNoYW5nZVJhdGU6IHN0cmluZztcbiAgZXhjaGFuZ2VSYXRlVmFsdWU6IHN0cmluZztcbiAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2U6IHN0cmluZztcbiAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50OiBudW1iZXI7XG4gIHNob3dFeGNoYW5nZVJhdGU6IGJvb2xlYW47XG4gIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XG4gIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlOiBzdHJpbmc7XG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbn07XG5cbi8vIE93bnMgdGhlIGN1cnJlbmN5IGFuZCBleGNoYW5nZS1yYXRlIFVJIHNvIHRoZSBoZWFkZXIgZm9ybSBzdGF5cyBjb21wYWN0LlxuY29uc3QgRXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lTZWN0aW9uID0gKHtcbiAgaXNFZGl0aW5nLFxuICBjYW5FZGl0SGVhZGVyRmllbGRzLFxuICBpc0ZvcmVpZ25DdXJyZW5jeSxcbiAgZXhwZW5zZUN1cnJlbmN5TGFiZWwsXG4gIGhlYWRlckN1cnJlbmN5Q29kZSxcbiAgYmFzZUN1cnJlbmN5Q29kZSxcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlLFxuICBleGNoYW5nZVJhdGVWYWx1ZSxcbiAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXG4gIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudCxcbiAgc2hvd0V4Y2hhbmdlUmF0ZSxcbiAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXG4gIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcbiAgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UsXG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2UsXG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2UsXG59OiBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb25Qcm9wcykgPT4ge1xuICBjb25zdCBsb2NhbEN1cnJlbmN5T3B0aW9ucyA9IFJlYWN0LnVzZU1lbW88RXhwZW5zZVNlbGVjdE9wdGlvbltdPihcbiAgICAoKSA9PiBbXG4gICAgICB7XG4gICAgICAgIHZhbHVlOiBiYXNlQ3VycmVuY3lDb2RlLFxuICAgICAgICB0ZXh0OiBiYXNlQ3VycmVuY3lDb2RlLFxuICAgICAgICBpY29uOiA8RXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gY3VycmVuY3lDb2RlPXtiYXNlQ3VycmVuY3lDb2RlfSBzaXplQ2xhc3NOYW1lPVwiaC02IHctNlwiIC8+LFxuICAgICAgfSxcbiAgICBdLFxuICAgIFtiYXNlQ3VycmVuY3lDb2RlXVxuICApO1xuICBjb25zdCBoZWFkZXJDdXJyZW5jeU9wdGlvbnMgPSBSZWFjdC51c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oXG4gICAgKCkgPT4gW1xuICAgICAge1xuICAgICAgICB2YWx1ZTogaGVhZGVyQ3VycmVuY3lDb2RlIHx8IFwiLVwiLFxuICAgICAgICB0ZXh0OiBoZWFkZXJDdXJyZW5jeUNvZGUgfHwgXCItXCIsXG4gICAgICAgIGljb246IDxFeHBlbnNlQ3VycmVuY3lGbGFnSWNvbiBjdXJyZW5jeUNvZGU9e2hlYWRlckN1cnJlbmN5Q29kZSB8fCBcIi1cIn0gc2l6ZUNsYXNzTmFtZT1cImgtNiB3LTZcIiAvPixcbiAgICAgIH0sXG4gICAgXSxcbiAgICBbaGVhZGVyQ3VycmVuY3lDb2RlXVxuICApO1xuXG4gIGlmIChpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkcykge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNtOmNvbC1zcGFuLTIgc3BhY2UteS0zXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZ3JpZCBnYXAtNCAke2lzRm9yZWlnbkN1cnJlbmN5ID8gXCJncmlkLWNvbHMtMlwiIDogXCJncmlkLWNvbHMtMVwifWAudHJpbSgpfT5cbiAgICAgICAgICB7aXNGb3JlaWduQ3VycmVuY3kgPyAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntleHBlbnNlQ3VycmVuY3lMYWJlbH08L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RcbiAgICAgICAgICAgICAgICAgIGxhYmVsPXtleHBlbnNlQ3VycmVuY3lMYWJlbH1cbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lfUGxhY2Vob2xkZXJcIiwgXCJDdXJyZW5jeSBjb2RlXCIpfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0Q3VycmVuY3lDb2RlfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZyB8fCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cbiAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nIHx8IGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzfVxuICAgICAgICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtaGVhZGVyLWN1cnJlbmN5XCJcbiAgICAgICAgICAgICAgICAgIHByZWZlckRlZmF1bHRDdXJyZW5jeUZyb21Db250ZXh0XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgc3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBwci04IGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhjaGFuZ2VSYXRlXCIsIFwiRXhjaGFuZ2UgcmF0ZVwiKX08L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxJbmZvUG9wb3Zlckljb25CdXR0b25cbiAgICAgICAgICAgICAgICAgIGFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX0luZm9Qb3BvdmVyX0FyaWFcIiwgXCJTaG93IGV4Y2hhbmdlIHJhdGUgaW5mb3JtYXRpb25cIil9XG4gICAgICAgICAgICAgICAgICBjb250ZW50PXtleGNoYW5nZVJhdGVJbmZvTWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHJpZ2h0LTAgLXRvcC0xIHotMjBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb3JtLWNvbnRyb2wgJHtleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSA/IFwiYm9yZGVyLWRhbmdlciByaW5nLTEgcmluZy1kYW5nZXJcIiA6IFwiXCJ9ICR7aXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwiXCJ9YH1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICBpbnB1dE1vZGU9XCJkZWNpbWFsXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0RXhjaGFuZ2VSYXRlfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKX1cbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXsoZXZlbnQpID0+XG4gICAgICAgICAgICAgICAgICAgICAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZShcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcihldmVudC50YXJnZXQudmFsdWUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiA3LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxsYmFjazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0V4Y2hhbmdlUmF0ZVwiLCBcIkV4Y2hhbmdlIHJhdGVcIil9XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9FeGNoYW5nZVJhdGVcIiwgXCJFeGNoYW5nZSByYXRlXCIpfVxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17aXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzfVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdFxuICAgICAgICAgICAgICBsYWJlbD17ZXhwZW5zZUN1cnJlbmN5TGFiZWx9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lfUGxhY2Vob2xkZXJcIiwgXCJDdXJyZW5jeSBjb2RlXCIpfVxuICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRDdXJyZW5jeUNvZGV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZyB8fCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cbiAgICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmcgfHwgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXN9XG4gICAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtaGVhZGVyLWN1cnJlbmN5XCJcbiAgICAgICAgICAgICAgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHRcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAge2lzRm9yZWlnbkN1cnJlbmN5ID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtNFwiPlxuICAgICAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Mb2NhbEN1cnJlbmN5XCIsIFwiTG9jYWwgY3VycmVuY3lcIil9XG4gICAgICAgICAgICAgIG9wdGlvbnM9e2xvY2FsQ3VycmVuY3lPcHRpb25zfVxuICAgICAgICAgICAgICB2YWx1ZT17YmFzZUN1cnJlbmN5Q29kZX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eygpID0+IHVuZGVmaW5lZH1cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeV9QbGFjZWhvbGRlclwiLCBcIkN1cnJlbmN5IGNvZGVcIil9XG4gICAgICAgICAgICAgIHJlYWRPbmx5XG4gICAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XG4gICAgICAgICAgICAgIHNob3dMYWJlbFxuICAgICAgICAgICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxuICAgICAgICAgICAgICBzZWxlY3RlZFRleHRNb2RlPVwidmFsdWVcIlxuICAgICAgICAgICAgICBkcm9wZG93bk1heEhlaWdodENsYXNzPVwibWF4LWgtOTZcIlxuICAgICAgICAgICAgICBzZWxlY3RlZEljb25DbGFzc05hbWU9XCJoLTYgdy02XCJcbiAgICAgICAgICAgICAgb3B0aW9uSWNvbkNsYXNzTmFtZT1cImgtNiB3LTZcIlxuICAgICAgICAgICAgICBzZWxlY3RlZElucHV0UGFkZGluZ0NsYXNzTmFtZT1cInBsLTEyXCJcbiAgICAgICAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS1oZWFkZXItbG9jYWwtY3VycmVuY3lcIlxuICAgICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Ftb3VudFwiLCBcIkFtb3VudFwiKX08L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgaW5kLXJlYWRvbmx5LWZpZWxkXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17Zm9ybWF0RXhwZW5zZU51bWJlcihleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQsIHtcbiAgICAgICAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogNyxcbiAgICAgICAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogNyxcbiAgICAgICAgICAgICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgZmFsbGJhY2s6IFwiLVwiLFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Ftb3VudFwiLCBcIkFtb3VudFwiKX1cbiAgICAgICAgICAgICAgICByZWFkT25seVxuICAgICAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAge2lzRm9yZWlnbkN1cnJlbmN5ICYmIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlID8gPHAgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXIgdGV4dC1zbVwiPntleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZX08L3A+IDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XG4gICAgICAgIG9wdGlvbnM9e2hlYWRlckN1cnJlbmN5T3B0aW9uc31cbiAgICAgICAgdmFsdWU9e2hlYWRlckN1cnJlbmN5Q29kZSB8fCBcIi1cIn1cbiAgICAgICAgb25DaGFuZ2U9eygpID0+IHVuZGVmaW5lZH1cbiAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeV9QbGFjZWhvbGRlclwiLCBcIkN1cnJlbmN5IGNvZGVcIil9XG4gICAgICAgIHJlYWRPbmx5XG4gICAgICAgIGRpc2FibGVkXG4gICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XG4gICAgICAgIHNob3dMYWJlbFxuICAgICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxuICAgICAgICBzZWxlY3RlZFRleHRNb2RlPVwidmFsdWVcIlxuICAgICAgICBkcm9wZG93bk1heEhlaWdodENsYXNzPVwibWF4LWgtOTZcIlxuICAgICAgICBzZWxlY3RlZEljb25DbGFzc05hbWU9XCJoLTYgdy02XCJcbiAgICAgICAgb3B0aW9uSWNvbkNsYXNzTmFtZT1cImgtNiB3LTZcIlxuICAgICAgICBzZWxlY3RlZElucHV0UGFkZGluZ0NsYXNzTmFtZT1cInBsLTEyXCJcbiAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS1oZWFkZXItY3VycmVuY3ktcmVhZG9ubHlcIlxuICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAvPlxuICAgICAgeyFpc0VkaXRpbmcgJiYgc2hvd0V4Y2hhbmdlUmF0ZSA/IChcbiAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9FeGNoYW5nZVJhdGVcIiwgXCJFeGNoYW5nZSByYXRlXCIpfSB2YWx1ZT17ZXhjaGFuZ2VSYXRlVmFsdWV9IC8+XG4gICAgICApIDogbnVsbH1cbiAgICA8Lz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvbjtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTGF5b3V0RWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgeyB1c2VPdXRzaWRlQ2xpY2sgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlT3V0c2lkZUNsaWNrLnRzXCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcblxudHlwZSBJbmZvUG9wb3Zlckljb25CdXR0b25Qcm9wcyA9IHtcbiAgY29udGVudDogUmVhY3QuUmVhY3ROb2RlO1xuICBhcmlhTGFiZWw6IHN0cmluZztcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcbn07XG5cbi8vIFNoYXJlZCBkdW1iIHBvcG92ZXIgdHJpZ2dlciB1c2VkIHRvIGRpc3BsYXkgc2hvcnQgY29udGV4dHVhbCBpbmZvLlxuY29uc3QgSW5mb1BvcG92ZXJJY29uQnV0dG9uID0gKHtcbiAgY29udGVudCxcbiAgYXJpYUxhYmVsLFxuICBjbGFzc05hbWUgPSBcIlwiLFxuICBwYW5lbENsYXNzTmFtZSA9IFwiXCIsXG59OiBJbmZvUG9wb3Zlckljb25CdXR0b25Qcm9wcykgPT4ge1xuICBjb25zdCBIT1JJWk9OVEFMX1ZJRVdQT1JUX0dVVFRFUl9QWCA9IDg7XG4gIGNvbnN0IFZFUlRJQ0FMX1ZJRVdQT1JUX0dVVFRFUl9QWCA9IDg7XG4gIGNvbnN0IFBBTkVMX1RSSUdHRVJfR0FQX1BYID0gNjtcbiAgY29uc3QgR0xPQkFMX1JBRElVUyA9IFwidmFyKC0tcmFkaXVzLXhsLCA1cHgpXCI7XG4gIGNvbnN0IFtpc09wZW4sIHNldElzT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwYW5lbFN0eWxlLCBzZXRQYW5lbFN0eWxlXSA9IHVzZVN0YXRlPFJlYWN0LkNTU1Byb3BlcnRpZXM+KHtcbiAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICAgIHRvcDogMCxcbiAgICBsZWZ0OiAwLFxuICAgIHZpc2liaWxpdHk6IFwiaGlkZGVuXCIsXG4gIH0pO1xuICBjb25zdCBidXR0b25SZWYgPSB1c2VSZWY8SFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcGFuZWxSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICB1c2VPdXRzaWRlQ2xpY2soW2J1dHRvblJlZiwgcGFuZWxSZWZdLCAoKSA9PiBzZXRJc09wZW4oZmFsc2UpKTtcbiAgY29uc3QgdXBkYXRlUGFuZWxQb3NpdGlvbiA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSBidXR0b25SZWYuY3VycmVudDtcbiAgICBjb25zdCBwYW5lbEVsZW1lbnQgPSBwYW5lbFJlZi5jdXJyZW50O1xuICAgIGlmICghYnV0dG9uRWxlbWVudCB8fCAhcGFuZWxFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYnV0dG9uUmVjdCA9IGJ1dHRvbkVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgcGFuZWxSZWN0ID0gcGFuZWxFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHZpZXdwb3J0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBjb25zdCB2aWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBjb25zdCBzYWZlV2lkdGggPSBNYXRoLm1pbihwYW5lbFJlY3Qud2lkdGgsIE1hdGgubWF4KDE4MCwgdmlld3BvcnRXaWR0aCAtIEhPUklaT05UQUxfVklFV1BPUlRfR1VUVEVSX1BYICogMikpO1xuXG4gICAgbGV0IGxlZnQgPSBidXR0b25SZWN0LmxlZnQgKyBidXR0b25SZWN0LndpZHRoIC8gMiAtIHNhZmVXaWR0aCAvIDI7XG4gICAgbGVmdCA9IE1hdGgubWF4KEhPUklaT05UQUxfVklFV1BPUlRfR1VUVEVSX1BYLCBNYXRoLm1pbihsZWZ0LCB2aWV3cG9ydFdpZHRoIC0gc2FmZVdpZHRoIC0gSE9SSVpPTlRBTF9WSUVXUE9SVF9HVVRURVJfUFgpKTtcblxuICAgIGxldCB0b3AgPSBidXR0b25SZWN0LmJvdHRvbSArIFBBTkVMX1RSSUdHRVJfR0FQX1BYO1xuICAgIGNvbnN0IGhhc0JvdHRvbU92ZXJmbG93ID0gdG9wICsgcGFuZWxSZWN0LmhlaWdodCArIFZFUlRJQ0FMX1ZJRVdQT1JUX0dVVFRFUl9QWCA+IHZpZXdwb3J0SGVpZ2h0O1xuICAgIGlmIChoYXNCb3R0b21PdmVyZmxvdykge1xuICAgICAgY29uc3QgdG9wQWJvdmVUcmlnZ2VyID0gYnV0dG9uUmVjdC50b3AgLSBwYW5lbFJlY3QuaGVpZ2h0IC0gUEFORUxfVFJJR0dFUl9HQVBfUFg7XG4gICAgICB0b3AgPSB0b3BBYm92ZVRyaWdnZXIgPj0gVkVSVElDQUxfVklFV1BPUlRfR1VUVEVSX1BYXG4gICAgICAgID8gdG9wQWJvdmVUcmlnZ2VyXG4gICAgICAgIDogTWF0aC5tYXgoVkVSVElDQUxfVklFV1BPUlRfR1VUVEVSX1BYLCB2aWV3cG9ydEhlaWdodCAtIHBhbmVsUmVjdC5oZWlnaHQgLSBWRVJUSUNBTF9WSUVXUE9SVF9HVVRURVJfUFgpO1xuICAgIH1cblxuICAgIHNldFBhbmVsU3R5bGUoe1xuICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgICAgIHRvcDogTWF0aC5yb3VuZCh0b3ApLFxuICAgICAgbGVmdDogTWF0aC5yb3VuZChsZWZ0KSxcbiAgICAgIHdpZHRoOiBNYXRoLnJvdW5kKHNhZmVXaWR0aCksXG4gICAgICB2aXNpYmlsaXR5OiBcInZpc2libGVcIixcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc09wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdXBkYXRlUGFuZWxQb3NpdGlvbigpO1xuICB9LCBbaXNPcGVuLCBjb250ZW50LCB1cGRhdGVQYW5lbFBvc2l0aW9uXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzT3Blbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBoYW5kbGVWaWV3cG9ydENoYW5nZSA9ICgpID0+IHVwZGF0ZVBhbmVsUG9zaXRpb24oKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBoYW5kbGVWaWV3cG9ydENoYW5nZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlVmlld3BvcnRDaGFuZ2UsIHRydWUpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBoYW5kbGVWaWV3cG9ydENoYW5nZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVWaWV3cG9ydENoYW5nZSwgdHJ1ZSk7XG4gICAgfTtcbiAgfSwgW2lzT3BlbiwgdXBkYXRlUGFuZWxQb3NpdGlvbl0pO1xuXG4gIGNvbnN0IHBvcnRhbFRhcmdldCA9IHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIiA/IG51bGwgOiBkb2N1bWVudC5ib2R5O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJpbmxpbmUtZmxleFwiLCBjbGFzc05hbWUpfT5cbiAgICAgIDxidXR0b25cbiAgICAgICAgcmVmPXtidXR0b25SZWZ9XG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWx9XG4gICAgICAgIGFyaWEtZXhwYW5kZWQ9e2lzT3Blbn1cbiAgICAgICAgYXJpYS1oYXNwb3B1cD1cImRpYWxvZ1wiXG4gICAgICAgIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGgtNiB3LTYgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItdHJhbnNwYXJlbnQgYmctdHJhbnNwYXJlbnQgcC0wIHRleHQtc2xhdGUtNTAwIHRyYW5zaXRpb24gaG92ZXI6dGV4dC1wcmltYXJ5IGZvY3VzOm91dGxpbmUtaGlkZGVuIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXByaW1hcnkvMzBcIlxuICAgICAgICBzdHlsZT17eyBib3JkZXJSYWRpdXM6IEdMT0JBTF9SQURJVVMgfX1cbiAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNPcGVuKChwcmV2aW91cykgPT4gIXByZXZpb3VzKX1cbiAgICAgID5cbiAgICAgICAgPHN2Z1xuICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgICAgIHdpZHRoPVwiMjBcIlxuICAgICAgICAgIGhlaWdodD1cIjIwXCJcbiAgICAgICAgICB2aWV3Qm94PVwiMyAzIDE4IDE4XCJcbiAgICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgc3Ryb2tlPVwiIzY0NzQ4YlwiXG4gICAgICAgICAgc3Ryb2tlV2lkdGg9XCIxLjc1XCJcbiAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxuICAgICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYmxvY2tcIlxuICAgICAgICA+XG4gICAgICAgICAgPHJlY3QgeD1cIjRcIiB5PVwiNFwiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIHJ4PVwiM1wiIHJ5PVwiM1wiIC8+XG4gICAgICAgICAgPHBhdGggZD1cIk0xMiA5aC4wMVwiIC8+XG4gICAgICAgICAgPHBhdGggZD1cIk0xMSAxMmgxdjRoMVwiIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgPC9idXR0b24+XG5cbiAgICAgIHtpc09wZW4gJiYgcG9ydGFsVGFyZ2V0XG4gICAgICAgID8gY3JlYXRlUG9ydGFsKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICByZWY9e3BhbmVsUmVmfVxuICAgICAgICAgICAgICByb2xlPVwiZGlhbG9nXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgLi4ucGFuZWxTdHlsZSwgYm9yZGVyUmFkaXVzOiBHTE9CQUxfUkFESVVTIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICBcInotMzYwMDAwIG1pbi13LVsyMjBweF0gbWF4LXctW2NhbGMoMTAwdnctMXJlbSldIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHAtMyBzaGFkb3ctbGdcIixcbiAgICAgICAgICAgICAgICBwYW5lbENsYXNzTmFtZVxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMnB4XSB0ZXh0LXNsYXRlLTcwMCB3aGl0ZXNwYWNlLXByZS1saW5lXCI+e2NvbnRlbnR9PC9wPlxuICAgICAgICAgICAgPC9kaXY+LFxuICAgICAgICAgICAgcG9ydGFsVGFyZ2V0XG4gICAgICAgICAgKVxuICAgICAgICA6IG51bGx9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbmZvUG9wb3Zlckljb25CdXR0b247XG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuXG50eXBlIEV4Y2hhbmdlUmF0ZU1vZGVVaU1ldGEgPSB7XG4gIGxhYmVsS2V5OiBzdHJpbmc7XG4gIGZhbGxiYWNrOiBzdHJpbmc7XG59O1xuXG5jb25zdCBFWENIQU5HRV9SQVRFX01PREVfTUVUQTogUmVjb3JkPEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ29kZSwgRXhjaGFuZ2VSYXRlTW9kZVVpTWV0YT4gPSB7XG4gIDA6IHtcbiAgICBsYWJlbEtleTogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX09mZmljaWFsXCIsXG4gICAgZmFsbGJhY2s6IFwiVC5DLiBPZmljaWFsXCIsXG4gIH0sXG4gIDE6IHtcbiAgICBsYWJlbEtleTogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX01hbnVhbFwiLFxuICAgIGZhbGxiYWNrOiBcIlQuQy4gTWFudWFsXCIsXG4gIH0sXG59O1xuY29uc3QgRVhDSEFOR0VfUkFURV9NT0RFX0NPREVTOiBFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNvZGVbXSA9IFswLCAxXTtcblxuLy8gS2VlcHMgZXhjaGFuZ2UgcmF0ZSBtb2RlIHZhbHVlcyBjb25zdHJhaW5lZCB0byBudW1lcmljIDAgb3IgMS5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ29kZSB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xuICBpZiAocGFyc2VkID09PSAwIHx8IHBhcnNlZCA9PT0gMSkge1xuICAgIHJldHVybiBwYXJzZWQ7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG4vLyBCdWlsZHMgZml4ZWQgb3B0aW9ucyBmb3IgdGhlIGV4Y2hhbmdlIHJhdGUgbW9kZSBmaWx0ZXIuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVPcHRpb25zID0gKCk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XG4gIHJldHVybiBFWENIQU5HRV9SQVRFX01PREVfQ09ERVNcbiAgICAubWFwKChjb2RlKSA9PiB7XG4gICAgICBjb25zdCBtZXRhID0gRVhDSEFOR0VfUkFURV9NT0RFX01FVEFbY29kZV07XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogU3RyaW5nKGNvZGUpLFxuICAgICAgICB0ZXh0OiBpbmRUKG1ldGEubGFiZWxLZXksIG1ldGEuZmFsbGJhY2spLFxuICAgICAgfTtcbiAgICB9KTtcbn07XG5cbi8vIFJldHVybnMgYSBsb2NhbGl6ZWQgbW9kZSBsYWJlbCBvciBlbXB0eSB0ZXh0IGZvciBub24tc2VsZWN0ZWQgdmFsdWVzLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlTGFiZWwgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGUodmFsdWUpO1xuICBpZiAobm9ybWFsaXplZCA9PT0gbnVsbCkgcmV0dXJuIFwiXCI7XG4gIGNvbnN0IG1ldGEgPSBFWENIQU5HRV9SQVRFX01PREVfTUVUQVtub3JtYWxpemVkXTtcbiAgcmV0dXJuIGluZFQobWV0YS5sYWJlbEtleSwgbWV0YS5mYWxsYmFjayk7XG59O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldEhlYWRlciB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb24gZnJvbSBcIi4vRXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lTZWN0aW9uLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQgZnJvbSBcIi4vRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dC50c3hcIjtcbmltcG9ydCBFeHBlbnNlUmVhZE9ubHlGaWVsZCBmcm9tIFwiLi9FeHBlbnNlUmVhZE9ubHlGaWVsZC50c3hcIjtcbmltcG9ydCB7IGdldEV4cGVuc2VTdGF0dXNMYWJlbCB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVN0YXR1c0NhdGFsb2cudHNcIjtcbmltcG9ydCB7IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlTGFiZWwgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4Y2hhbmdlUmF0ZUVudHJ5TW9kZUNhdGFsb2cudHNcIjtcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlTnVtYmVyLCBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xuXG50eXBlIEV4cGVuc2VTaGVldEhlYWRlckZvcm1Qcm9wcyA9IHtcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGJvb2xlYW47XG4gIHN0YXR1c0NvbW1lbnRNb2RlOiBcImhpZGRlblwiIHwgXCJyZWFkXCIgfCBcImVkaXRcIjtcbiAgaGVhZGVyOiBFeHBlbnNlU2hlZXRIZWFkZXI7XG4gIHByb2plY3RWYWx1ZTogc3RyaW5nO1xuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogYm9vbGVhbjtcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xuICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeTogc3RyaW5nO1xuICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k6IHN0cmluZztcbiAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50OiBudW1iZXI7XG4gIHNob3dFeGNoYW5nZVJhdGU6IGJvb2xlYW47XG4gIGV4Y2hhbmdlUmF0ZVZhbHVlOiBzdHJpbmc7XG4gIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlOiBzdHJpbmc7XG4gIHRvdGFsQW1vdW50VGV4dDogc3RyaW5nO1xuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGRyYWZ0UHJvamVjdElkOiBzdHJpbmc7XG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGRyYWZ0RXhjaGFuZ2VSYXRlOiBzdHJpbmc7XG4gIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3M6IHN0cmluZztcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZTogc3RyaW5nO1xuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGU6IHN0cmluZztcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2U6IHN0cmluZztcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdFByb2plY3RJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdEVzdGFkb0NvbWVudGFyaW9zQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbn07XG5cbmNvbnN0IEVYQ0hBTkdFX1JBVEVfTU9ERV9QUkVGSVhfUEFUVEVSTiA9IC9eVFxcLj9DXFwuP1xccyovaTtcblxuLy8gUHVyZSBwcmVzZW50YXRpb25hbCBoZWFkZXIgZm9ybSBmb3IgZXhwZW5zZSBzaGVldCBkZXRhaWwvY3JlYXRlIHNjcmVlbnMuXG5jb25zdCBFeHBlbnNlU2hlZXRIZWFkZXJGb3JtID0gKHtcbiAgaXNDcmVhdGVNb2RlLFxuICBpc0VkaXRpbmcsXG4gIGNhbkVkaXRIZWFkZXJGaWVsZHMsXG4gIHN0YXR1c0NvbW1lbnRNb2RlLFxuICBoZWFkZXIsXG4gIHByb2plY3RWYWx1ZSxcbiAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXG4gIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcbiAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXG4gIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LFxuICBzaG93RXhjaGFuZ2VSYXRlLFxuICBleGNoYW5nZVJhdGVWYWx1ZSxcbiAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXG4gIHRvdGFsQW1vdW50VGV4dCxcbiAgZHJhZnREZXNjcmlwdGlvbixcbiAgZHJhZnRQcm9qZWN0SWQsXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICBkcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSxcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLFxuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSxcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlLFxuICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlLFxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlLFxuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlLFxuICBvbkRyYWZ0RXN0YWRvQ29tZW50YXJpb3NDaGFuZ2UsXG59OiBFeHBlbnNlU2hlZXRIZWFkZXJGb3JtUHJvcHMpID0+IHtcbiAgY29uc3QgaXNGb3JlaWduQ3VycmVuY3kgPVxuICAgIGlzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzICYmIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5ICE9PSBcIlwiICYmIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5ICE9PSBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k7XG4gIGNvbnN0IGV4cGVuc2VDdXJyZW5jeUxhYmVsID0gaXNGb3JlaWduQ3VycmVuY3lcbiAgICA/IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0V4cGVuc2VDdXJyZW5jeVwiLCBcIkV4cGVuc2UgY3VycmVuY3lcIilcbiAgICA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIik7XG4gIGNvbnN0IHN0YXR1c1ZhbHVlID1cbiAgICBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzID09PSBudWxsIHx8IGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgPT09IHVuZGVmaW5lZFxuICAgICAgPyBcIi1cIlxuICAgICAgOiBnZXRFeHBlbnNlU3RhdHVzTGFiZWwoaGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyk7XG4gIGNvbnN0IGhlYWRlckN1cnJlbmN5Q29kZSA9IHNhZmVUZXh0KGhlYWRlci5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IGJhc2VDdXJyZW5jeUNvZGUgPSBzYWZlVGV4dChleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IHN0YXR1c0NvbW1lbnRWYWx1ZSA9IHNhZmVUZXh0KGhlYWRlci5lc3RhZG9Db21lbnRhcmlvcyk7XG4gIGNvbnN0IHNob3dTdGF0dXNDb21tZW50RmllbGQgPSAhaXNDcmVhdGVNb2RlICYmIHN0YXR1c0NvbW1lbnRNb2RlICE9PSBcImhpZGRlblwiO1xuICBjb25zdCBjYW5FZGl0U3RhdHVzQ29tbWVudCA9IGlzRWRpdGluZyAmJiBzdGF0dXNDb21tZW50TW9kZSA9PT0gXCJlZGl0XCI7XG4gIGNvbnN0IHBhcnNlZERyYWZ0RXhjaGFuZ2VSYXRlID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KGRyYWZ0RXhjaGFuZ2VSYXRlKTtcbiAgY29uc3QgcGFyc2VkT2ZmaWNpYWxSYXdSYXRlID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUpO1xuICBjb25zdCBiYXNlRXhjaGFuZ2VSYXRlVmFsdWUgPVxuICAgIHBhcnNlZERyYWZ0RXhjaGFuZ2VSYXRlICE9IG51bGxcbiAgICAgID8gcGFyc2VkRHJhZnRFeGNoYW5nZVJhdGVcbiAgICAgIDogcGFyc2VkT2ZmaWNpYWxSYXdSYXRlICE9IG51bGxcbiAgICAgICAgPyBwYXJzZWRPZmZpY2lhbFJhd1JhdGUgKiBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnRcbiAgICAgICAgOiBudWxsO1xuICBjb25zdCBleGNoYW5nZVJhdGVJbmZvVmFsdWUgPSBmb3JtYXRFeHBlbnNlTnVtYmVyKFxuICAgIGJhc2VFeGNoYW5nZVJhdGVWYWx1ZSAhPSBudWxsID8gYmFzZUV4Y2hhbmdlUmF0ZVZhbHVlIC8gZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50IDogbnVsbCxcbiAgICB7XG4gICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDcsXG4gICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDcsXG4gICAgICB1c2VHcm91cGluZzogZmFsc2UsXG4gICAgICBmYWxsYmFjazogXCIwLjAwMDAwMDBcIixcbiAgICB9XG4gICk7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSA9IE51bWJlcihoZWFkZXIuZXhjaGFuZ2VSYXRlTW9kZSkgPT09IDEgPyAxIDogMDtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlTW9kZUtleSA9XG4gICAgZXhjaGFuZ2VSYXRlTW9kZVZhbHVlID09PSAxXG4gICAgICA/IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9NYW51YWxcIlxuICAgICAgOiBcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0V4Y2hhbmdlUmF0ZU1vZGVfT2ZmaWNpYWxcIjtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlTW9kZUZhbGxiYWNrID0gZXhjaGFuZ2VSYXRlTW9kZVZhbHVlID09PSAxID8gXCJULkMuIE1hbnVhbFwiIDogXCJULkMuIE9maWNpYWxcIjtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlTW9kZUxhYmVsID1cbiAgICAoZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVMYWJlbChleGNoYW5nZVJhdGVNb2RlVmFsdWUpIHx8IGluZFQoZXhjaGFuZ2VSYXRlTW9kZUtleSwgZXhjaGFuZ2VSYXRlTW9kZUZhbGxiYWNrKSlcbiAgICAgIC5yZXBsYWNlKEVYQ0hBTkdFX1JBVEVfTU9ERV9QUkVGSVhfUEFUVEVSTiwgXCJcIilcbiAgICAgIC50cmltKClcbiAgICAgIC50b0xvd2VyQ2FzZSgpIHx8IChleGNoYW5nZVJhdGVNb2RlVmFsdWUgPT09IDEgPyBcIm1hbnVhbFwiIDogXCJvZmljaWFsXCIpO1xuICBjb25zdCBoYXNFbmRwb2ludEV4Y2hhbmdlUmF0ZURhdGEgPVxuICAgICEhc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSkgfHwgISFzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUpIHx8ICEhc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UpO1xuICBjb25zdCBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9EYXRlID0gc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKSB8fCBpbmRUKFwiQ29tbW9uX05vdEF2YWlsYWJsZVwiLCBcIk4vQVwiKTtcbiAgY29uc3QgZW5kcG9pbnRFeGNoYW5nZVJhdGVJbmZvU291cmNlID0gc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UpXG4gICAgLnJlcGxhY2UoL1xccypcXChbXigpXSpcXClcXHMqL2csIFwiIFwiKVxuICAgIC5yZXBsYWNlKC9cXHN7Mix9L2csIFwiIFwiKVxuICAgIC50cmltKCkgfHwgaW5kVChcIkNvbW1vbl9Ob3RBdmFpbGFibGVcIiwgXCJOL0FcIik7XG4gIGNvbnN0IGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UgPSBpbmRGb3JtYXQoXG4gICAgXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9JbmZvUG9wb3Zlcl9EZXRhaWxcIixcbiAgICBcIlRpcG8gZGUgY2FtYmlvIG9idGVuaWRvIHswfVxcbkZlY2hhOiB7MX1cXG5PcmlnZW46IHsyfVwiLFxuICAgIHNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUpIHx8IFwiMC4wMDAwMDAwXCIsXG4gICAgZW5kcG9pbnRFeGNoYW5nZVJhdGVJbmZvRGF0ZSxcbiAgICBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9Tb3VyY2VcbiAgKTtcbiAgY29uc3Qgc3RvcmVkRXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UgPSBpbmRGb3JtYXQoXG4gICAgXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9JbmZvUG9wb3Zlcl9TdG9yZWRcIixcbiAgICBcIlRpcG8gZGUgY2FtYmlvIHswfSB7MX1cIixcbiAgICBleGNoYW5nZVJhdGVNb2RlTGFiZWwsXG4gICAgZXhjaGFuZ2VSYXRlSW5mb1ZhbHVlXG4gICk7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlID0gaGFzRW5kcG9pbnRFeGNoYW5nZVJhdGVEYXRhID8gZW5kcG9pbnRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZSA6IHN0b3JlZEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlO1xuXG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicmVsYXRpdmUgc2hhZG93LXhzIGdsYXNzLXBhbmVsIHAtNCBzcGFjZS15LTQgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC0yeGxcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiPlxuICAgICAgICB7IWlzQ3JlYXRlTW9kZSA/IChcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TaGVldElkXCIsIFwiRXhwZW5zZSBzaGVldCBjb2RlXCIpfVxuICAgICAgICAgICAgdmFsdWU9e3NhZmVUZXh0KGhlYWRlci5ob2phR2FzdG9zSWQpIHx8IFwiLVwifVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7IWlzQ3JlYXRlTW9kZSA/IDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzXCIsIFwiU3RhdHVzXCIpfSB2YWx1ZT17c3RhdHVzVmFsdWV9IC8+IDogbnVsbH1cbiAgICAgICAge3Nob3dTdGF0dXNDb21tZW50RmllbGQgPyAoXG4gICAgICAgICAgY2FuRWRpdFN0YXR1c0NvbW1lbnQgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1kOmNvbC1zcGFuLTIgc3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TdGF0dXNDb21tZW50XCIsIFwiU3RhdHVzIGNvbW1lbnRcIil9PC9sYWJlbD5cbiAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIHJlc2l6ZS1ub25lXCJcbiAgICAgICAgICAgICAgICByb3dzPXszfVxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdEVzdGFkb0NvbWVudGFyaW9zfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnRFc3RhZG9Db21lbnRhcmlvc0NoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzQ29tbWVudFwiLCBcIlN0YXR1cyBjb21tZW50XCIpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzQ29tbWVudFwiLCBcIlN0YXR1cyBjb21tZW50XCIpfVxuICAgICAgICAgICAgICB2YWx1ZT17c3RhdHVzQ29tbWVudFZhbHVlIHx8IFwiLVwifVxuICAgICAgICAgICAgICBmdWxsV2lkdGhcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKVxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge2lzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfTwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0RGVzY3JpcHRpb259XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XG4gICAgICAgICAgICB2YWx1ZT17c2FmZVRleHQoaGVhZGVyLmRlc2NyaXB0aW9uKSB8fCBcIi1cIn1cbiAgICAgICAgICAgIGZ1bGxXaWR0aFxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIHtpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkcyA/IChcbiAgICAgICAgICA8RXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9Qcm9qZWN0X1BsYWNlaG9sZGVyXCIsIFwiUHJvamVjdCBpZFwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtkcmFmdFByb2plY3RJZH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0UHJvamVjdElkQ2hhbmdlfVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmcgfHwgIWNhbkVkaXRIZWFkZXJGaWVsZHN9XG4gICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZyB8fCAhY2FuRWRpdEhlYWRlckZpZWxkc31cbiAgICAgICAgICAvPlxuICAgICAgICApIDogcHJvamVjdFZhbHVlID8gKFxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9IHZhbHVlPXtwcm9qZWN0VmFsdWV9IC8+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICA8RXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lTZWN0aW9uXG4gICAgICAgICAgaXNFZGl0aW5nPXtpc0VkaXRpbmd9XG4gICAgICAgICAgY2FuRWRpdEhlYWRlckZpZWxkcz17Y2FuRWRpdEhlYWRlckZpZWxkc31cbiAgICAgICAgICBpc0ZvcmVpZ25DdXJyZW5jeT17aXNGb3JlaWduQ3VycmVuY3l9XG4gICAgICAgICAgZXhwZW5zZUN1cnJlbmN5TGFiZWw9e2V4cGVuc2VDdXJyZW5jeUxhYmVsfVxuICAgICAgICAgIGhlYWRlckN1cnJlbmN5Q29kZT17aGVhZGVyQ3VycmVuY3lDb2RlfVxuICAgICAgICAgIGJhc2VDdXJyZW5jeUNvZGU9e2Jhc2VDdXJyZW5jeUNvZGV9XG4gICAgICAgICAgZHJhZnRDdXJyZW5jeUNvZGU9e2RyYWZ0Q3VycmVuY3lDb2RlfVxuICAgICAgICAgIGRyYWZ0RXhjaGFuZ2VSYXRlPXtkcmFmdEV4Y2hhbmdlUmF0ZX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVWYWx1ZT17ZXhjaGFuZ2VSYXRlVmFsdWV9XG4gICAgICAgICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2U9e2V4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlfVxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudD17ZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50fVxuICAgICAgICAgIHNob3dFeGNoYW5nZVJhdGU9e3Nob3dFeGNoYW5nZVJhdGV9XG4gICAgICAgICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXM9e2lzQ3VycmVuY3lMb2NrZWRCeUxpbmVzfVxuICAgICAgICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcz17aXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzfVxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlPXtleGNoYW5nZVJhdGVJbmZvTWVzc2FnZX1cbiAgICAgICAgICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlPXtvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlfVxuICAgICAgICAgIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2U9e29uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2V9XG4gICAgICAgIC8+XG4gICAgICAgIHshaXNDcmVhdGVNb2RlID8gPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Ub3RhbEFtb3VudFwiLCBcIlRvdGFsIGFtb3VudFwiKX0gdmFsdWU9e3RvdGFsQW1vdW50VGV4dH0gLz4gOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQ29tcGFjdFBhZ2luYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3hcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURhdGVQYXJ0cywgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCBFeHBlbnNlU2VjdGlvbkRpdmlkZXIgZnJvbSBcIi4vRXhwZW5zZVNlY3Rpb25EaXZpZGVyLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VUaW1lbGluZUNhcmQgZnJvbSBcIi4vRXhwZW5zZVRpbWVsaW5lQ2FyZC50c3hcIjtcblxudHlwZSBQYWdpbmF0aW9uTGFiZWxzID0ge1xuICBmaXJzdDogc3RyaW5nO1xuICBwcmV2OiBzdHJpbmc7XG4gIG5leHQ6IHN0cmluZztcbiAgbGFzdDogc3RyaW5nO1xufTtcblxudHlwZSBFeHBlbnNlTGluZXNUaW1lbGluZVByb3BzID0ge1xuICB2aXNpYmxlTGluZXM6IEV4cGVuc2VTaGVldExpbmVbXTtcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIHRvdGFsTGluZVBhZ2VzOiBudW1iZXI7XG4gIGxpbmVQYWdlOiBudW1iZXI7XG4gIGxpbmVzTGFiZWw6IHN0cmluZztcbiAgZW1wdHlUZXh0OiBzdHJpbmc7XG4gIHBhZ2luYXRpb25MYWJlbHM6IFBhZ2luYXRpb25MYWJlbHM7XG4gIGNvbnRhaW5lclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XG4gIG9uTGluZVBhZ2VDaGFuZ2U6IChwYWdlOiBudW1iZXIpID0+IHZvaWQ7XG4gIG9uT3BlbkxpbmU6IChsaW5lUmVjSWQ6IHN0cmluZykgPT4gdm9pZDtcbn07XG5cbi8vIER1bWIgdGltZWxpbmUgZm9yIGV4cGVuc2Ugc2hlZXQgbGluZXMgd2l0aCBzdGFuZGFyZCBjYXJkIGFuZCBwYWdpbmF0aW9uIGxheW91dC5cbmNvbnN0IEV4cGVuc2VMaW5lc1RpbWVsaW5lID0gKHtcbiAgdmlzaWJsZUxpbmVzLFxuICBjdXJyZW5jeUNvZGUsXG4gIHRvdGFsTGluZVBhZ2VzLFxuICBsaW5lUGFnZSxcbiAgbGluZXNMYWJlbCxcbiAgZW1wdHlUZXh0LFxuICBwYWdpbmF0aW9uTGFiZWxzLFxuICBjb250YWluZXJSZWYsXG4gIG9uTGluZVBhZ2VDaGFuZ2UsXG4gIG9uT3BlbkxpbmUsXG59OiBFeHBlbnNlTGluZXNUaW1lbGluZVByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic3BhY2UteS0wXCI+XG4gICAgICA8RXhwZW5zZVNlY3Rpb25EaXZpZGVyIGxhYmVsPXtsaW5lc0xhYmVsfSBjbGFzc05hbWU9XCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlci0tc3BhY2VkXCIgLz5cblxuICAgICAge3Zpc2libGVMaW5lcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtYm94IHRpbWVsaW5lLWVtcHR5XCIgZGF0YS1lbXB0eS10ZXh0PXtlbXB0eVRleHR9IC8+XG4gICAgICApIDogKFxuICAgICAgICA8ZGl2IHJlZj17Y29udGFpbmVyUmVmfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3hcIj5cbiAgICAgICAgICB7dmlzaWJsZUxpbmVzLm1hcCgobGluZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmVJZCA9IHNhZmVUZXh0KGxpbmUubGluZVJlY0lkKTtcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gc2FmZVRleHQobGluZS5kZXNjcmlwdGlvbik7XG4gICAgICAgICAgICBjb25zdCBhbW91bnRUZXh0ID0gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGxpbmUuYW1vdW50ID8/IG51bGwsIGN1cnJlbmN5Q29kZSk7XG4gICAgICAgICAgICBjb25zdCBsaW5rZWRUaWNrZXRGaWxlSWQgPSBzYWZlVGV4dChsaW5lLmZpbGVJZCk7XG4gICAgICAgICAgICBjb25zdCBkYXRlUGFydHMgPSBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzKHNhZmVUZXh0KGxpbmUudHJhbnNEYXRlKSwgZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCIpO1xuICAgICAgICAgICAgY29uc3QgdGlja2V0U3RhdHVzSWNvbiA9IGxpbmtlZFRpY2tldEZpbGVJZCA/IChcbiAgICAgICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgICAgICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD17MS41fVxuICAgICAgICAgICAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC00IHctNFwiXG4gICAgICAgICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXG4gICAgICAgICAgICAgICAgICBkPVwiTTEzLjE5IDguNjg4YTQuNSA0LjUgMCAwIDEgMS4yNDIgNy4yNDRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMS02LjM2NC02LjM2NGwxLjc1Ny0xLjc1N20xMy4zNS0uNjIyIDEuNzU3LTEuNzU3YTQuNSA0LjUgMCAwIDAtNi4zNjQtNi4zNjRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMCAxLjI0MiA3LjI0NFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICApIDogbnVsbDtcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2Ake2xpbmVJZH0tJHtpbmRleH1gfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgPEV4cGVuc2VUaW1lbGluZUNhcmRcbiAgICAgICAgICAgICAgICAgIGRhdGVQYXJ0cz17ZGF0ZVBhcnRzfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9e2Rlc2NyaXB0aW9uIHx8IGxpbmVJZCB8fCBcIi1cIn1cbiAgICAgICAgICAgICAgICAgIGFtb3VudFRleHQ9e2Ftb3VudFRleHR9XG4gICAgICAgICAgICAgICAgICBvbk9wZW49eygpID0+IG9uT3BlbkxpbmUobGluZUlkKX1cbiAgICAgICAgICAgICAgICAgIHRpdGxlQ2xhc3NOYW1lPVwidGltZWxpbmUtbmFtZSBleHBlbnNlLWxpbmUtY2FyZF9fdGl0bGVcIlxuICAgICAgICAgICAgICAgICAgc3RhdHVzSWNvbj17dGlja2V0U3RhdHVzSWNvbn1cbiAgICAgICAgICAgICAgICAgIHN0YXR1c0ljb25DbGFzc05hbWU9XCJleHBlbnNlLWxpbmUtY2FyZF9fdGlja2V0LWljb25cIlxuICAgICAgICAgICAgICAgICAgc3RhdHVzTGFiZWw9e2xpbmtlZFRpY2tldEZpbGVJZCB8fCB1bmRlZmluZWR9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIDxDb21wYWN0UGFnaW5hdGlvblxuICAgICAgICB0b3RhbFBhZ2VzPXt0b3RhbExpbmVQYWdlc31cbiAgICAgICAgY3VycmVudFBhZ2U9e2xpbmVQYWdlfVxuICAgICAgICBvblBhZ2VDaGFuZ2U9e29uTGluZVBhZ2VDaGFuZ2V9XG4gICAgICAgIGxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cbiAgICAgIC8+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUxpbmVzVGltZWxpbmU7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFBhZ2VCb3R0b21BY3Rpb25zLCB7IFBhZ2VCb3R0b21BY3Rpb25CdXR0b24gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1BhZ2VCb3R0b21BY3Rpb25zLnRzeFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbiB9IGZyb20gXCIuL2V4cGVuc2VTaGVldERldGFpbFBvbGljeS50c1wiO1xuXG50eXBlIEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbkJhclByb3BzID0ge1xuICBhY3Rpb25zOiBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25bXTtcbiAgYnVzeTogYm9vbGVhbjtcbiAgb25BY3Rpb25DbGljazogKGFjdGlvbjogRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uKSA9PiB2b2lkO1xufTtcblxuLy8gUmVuZGVycyB0aGUgYm90dG9tIHRvb2xiYXIgZm9yIGV4cGVuc2Ugc2hlZXQgc3RhdHVzIHRyYW5zaXRpb25zLlxuY29uc3QgRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyID0gKHsgYWN0aW9ucywgYnVzeSwgb25BY3Rpb25DbGljayB9OiBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25CYXJQcm9wcykgPT4ge1xuICBpZiAoYWN0aW9ucy5sZW5ndGggPCAxKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxQYWdlQm90dG9tQWN0aW9ucyBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0JvdHRvbUFjdGlvbnNfVG9vbGJhclwiLCBcIkV4cGVuc2Ugc2hlZXQgc3RhdHVzIGFjdGlvbnNcIil9PlxuICAgICAge2FjdGlvbnMubWFwKChhY3Rpb24pID0+IChcbiAgICAgICAgPFBhZ2VCb3R0b21BY3Rpb25CdXR0b25cbiAgICAgICAgICBrZXk9e2FjdGlvbi5pZH1cbiAgICAgICAgICBsYWJlbD17aW5kVChhY3Rpb24ubGFiZWxLZXksIGFjdGlvbi5mYWxsYmFjayl9XG4gICAgICAgICAgZGlzYWJsZWQ9e2J1c3l9XG4gICAgICAgICAgb25DbGljaz17KCkgPT4gb25BY3Rpb25DbGljayhhY3Rpb24pfVxuICAgICAgICAvPlxuICAgICAgKSl9XG4gICAgPC9QYWdlQm90dG9tQWN0aW9ucz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbkJhcjtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TcGlubmVyLnRzeFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBUSUNLRVRfSU1BR0VfQUNDRVBUX0FUVFJJQlVURSB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvd0NvcmUudHNcIjtcblxudHlwZSBFeHBlbnNlU2hlZXREZXRhaWxPdmVybGF5c1Byb3BzID0ge1xuICBtb2RhbDoge1xuICAgIG9wZW46IGJvb2xlYW47XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XG4gICAgY2FuY2VsVGV4dD86IHN0cmluZztcbiAgICBzaG93Q2FuY2VsPzogYm9vbGVhbjtcbiAgICBzaG93Q29uZmlybT86IGJvb2xlYW47XG4gIH07XG4gIG1vZGFsRXJyb3I6IHN0cmluZztcbiAgc3RhdHVzOiBzdHJpbmc7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZTogYm9vbGVhbjtcbiAgbW9kYWxMb2FkaW5nVGV4dDogc3RyaW5nO1xuICBtb2RhbENhbmNlbFRleHQ6IHN0cmluZztcbiAgbW9kYWxDb25maXJtVGV4dDogc3RyaW5nO1xuICBjYW1lcmFJbnB1dFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcbiAgZ2FsbGVyeUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xuICBzb3VyY2VQaWNrZXJPcGVuOiBib29sZWFuO1xuICBxdWlja1RpY2tldEJ1c3k6IGJvb2xlYW47XG4gIHF1aWNrVGlja2V0UHJvZ3Jlc3NNZXNzYWdlOiBzdHJpbmc7XG4gIHF1aWNrVGlja2V0RXJyb3JNZXNzYWdlOiBzdHJpbmc7XG4gIHF1aWNrVGlja2V0QXR0ZW1wdElkOiBzdHJpbmc7XG4gIHF1aWNrVGlja2V0VHJhY2VMaXN0OiBBcnJheTx7IHN0ZXA6IHN0cmluZzsgdHJhY2VJZDogc3RyaW5nOyBhdDogc3RyaW5nIH0+O1xuICBoYXNQZW5kaW5nVXBsb2FkUmV0cnk6IGJvb2xlYW47XG4gIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlOiBib29sZWFuO1xuICBvbkNvbmZpcm06ICgpID0+IHZvaWQ7XG4gIG9uQ2FuY2VsOiAoKSA9PiB2b2lkO1xuICBvblNlbGVjdGVkQ2FtZXJhRmlsZTogKGZpbGU6IEZpbGUgfCBudWxsKSA9PiB2b2lkO1xuICBvblNlbGVjdGVkR2FsbGVyeUZpbGU6IChmaWxlOiBGaWxlIHwgbnVsbCkgPT4gdm9pZDtcbiAgb25TZWxlY3RGcm9tQ2FtZXJhOiAoKSA9PiB2b2lkO1xuICBvblNlbGVjdEZyb21HYWxsZXJ5OiAoKSA9PiB2b2lkO1xuICBvbkNsb3NlU291cmNlUGlja2VyOiAoKSA9PiB2b2lkO1xuICBvblJldHJ5UGVuZGluZ1VwbG9hZDogKCkgPT4gdm9pZDtcbiAgb25PcGVuQ3JlYXRlZFRpY2tldDogKCkgPT4gdm9pZDtcbiAgb25DbGVhclF1aWNrVGlja2V0RXJyb3I6ICgpID0+IHZvaWQ7XG59O1xuXG4vLyBSZW5kZXJzIG1vZGFsIGFuZCBxdWljay10aWNrZXQgb3ZlcmxheXMgZm9yIHRoZSBleHBlbnNlIHNoZWV0IGRldGFpbCBwYWdlLlxuY29uc3QgRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXMgPSAoe1xuICBtb2RhbCxcbiAgbW9kYWxFcnJvcixcbiAgc3RhdHVzLFxuICBidXN5LFxuICBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsXG4gIG1vZGFsTG9hZGluZ1RleHQsXG4gIG1vZGFsQ2FuY2VsVGV4dCxcbiAgbW9kYWxDb25maXJtVGV4dCxcbiAgY2FtZXJhSW5wdXRSZWYsXG4gIGdhbGxlcnlJbnB1dFJlZixcbiAgc291cmNlUGlja2VyT3BlbixcbiAgcXVpY2tUaWNrZXRCdXN5LFxuICBxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSxcbiAgcXVpY2tUaWNrZXRFcnJvck1lc3NhZ2UsXG4gIHF1aWNrVGlja2V0QXR0ZW1wdElkLFxuICBxdWlja1RpY2tldFRyYWNlTGlzdCxcbiAgaGFzUGVuZGluZ1VwbG9hZFJldHJ5LFxuICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZSxcbiAgb25Db25maXJtLFxuICBvbkNhbmNlbCxcbiAgb25TZWxlY3RlZENhbWVyYUZpbGUsXG4gIG9uU2VsZWN0ZWRHYWxsZXJ5RmlsZSxcbiAgb25TZWxlY3RGcm9tQ2FtZXJhLFxuICBvblNlbGVjdEZyb21HYWxsZXJ5LFxuICBvbkNsb3NlU291cmNlUGlja2VyLFxuICBvblJldHJ5UGVuZGluZ1VwbG9hZCxcbiAgb25PcGVuQ3JlYXRlZFRpY2tldCxcbiAgb25DbGVhclF1aWNrVGlja2V0RXJyb3IsXG59OiBFeHBlbnNlU2hlZXREZXRhaWxPdmVybGF5c1Byb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxDb25maXJtTW9kYWxcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cbiAgICAgICAgdGl0bGU9e21vZGFsLnRpdGxlfVxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cbiAgICAgICAgY2FuY2VsVGV4dD17bW9kYWxDYW5jZWxUZXh0fVxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cbiAgICAgICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxuICAgICAgICBidXN5PXtidXN5IHx8IGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZX1cbiAgICAgICAgZXJyb3I9e21vZGFsRXJyb3J9XG4gICAgICAgIHN0YXR1cz17c3RhdHVzfVxuICAgICAgICBvbkNvbmZpcm09e29uQ29uZmlybX1cbiAgICAgICAgb25DYW5jZWw9e29uQ2FuY2VsfVxuICAgICAgLz5cblxuICAgICAgPGlucHV0XG4gICAgICAgIHJlZj17Y2FtZXJhSW5wdXRSZWZ9XG4gICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgYWNjZXB0PXtUSUNLRVRfSU1BR0VfQUNDRVBUX0FUVFJJQlVURX1cbiAgICAgICAgY2FwdHVyZT1cImVudmlyb25tZW50XCJcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZpbGUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmZpbGVzPy5bMF0gfHwgbnVsbDtcbiAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgICBvblNlbGVjdGVkQ2FtZXJhRmlsZShmaWxlKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG5cbiAgICAgIDxpbnB1dFxuICAgICAgICByZWY9e2dhbGxlcnlJbnB1dFJlZn1cbiAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICBhY2NlcHQ9e1RJQ0tFVF9JTUFHRV9BQ0NFUFRfQVRUUklCVVRFfVxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgZmlsZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZmlsZXM/LlswXSB8fCBudWxsO1xuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgIG9uU2VsZWN0ZWRHYWxsZXJ5RmlsZShmaWxlKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG5cbiAgICAgIHtzb3VyY2VQaWNrZXJPcGVuID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctc2xhdGUtOTUwLzQ1IHB4LTQgcHktNlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LXNtIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHAtNCBzaGFkb3cteGxcIj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LVsxNnB4XSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX1RpdGxlXCIsIFwiTnVldm8gdGlja2V0XCIpfVxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxuICAgICAgICAgICAgICB7aW5kVChcbiAgICAgICAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9Cb2R5XCIsXG4gICAgICAgICAgICAgICAgXCJTZWxlY2Npb25hIHVuYSBmdWVudGUgcGFyYSBjYXB0dXJhciBvIGVsZWdpciBsYSBpbWFnZW4gZGVsIHRpY2tldC5cIlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgZ3JpZCBncmlkLWNvbHMtMSBnYXAtMlwiPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIiBvbkNsaWNrPXtvblNlbGVjdEZyb21DYW1lcmF9PlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX0NhbWVyYVwiLCBcIlVzYXIgY1x1MDBFMW1hcmFcIil9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIiBvbkNsaWNrPXtvblNlbGVjdEZyb21HYWxsZXJ5fT5cbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9HYWxsZXJ5XCIsIFwiRWxlZ2lyIGltYWdlblwiKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiIG9uQ2xpY2s9e29uQ2xvc2VTb3VyY2VQaWNrZXJ9PlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cblxuICAgICAge3F1aWNrVGlja2V0QnVzeSA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNjAwMDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTk1MC8zNSBweC00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZS85NSBweC00IHB5LTMgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiPlxuICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNSB3LTVcIiBsYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0gLz5cbiAgICAgICAgICAgIDxzcGFuPntxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cblxuICAgICAge3F1aWNrVGlja2V0RXJyb3JNZXNzYWdlID8gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlXG4gICAgICAgICAgICAgID8gXCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBzcGFjZS15LTIgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1hbWJlci0yMDAgYmctYW1iZXItNTAgcC0zIHRleHQtc20gdGV4dC1hbWJlci05MDBcIlxuICAgICAgICAgICAgICA6IFwiZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgc3BhY2UteS0yIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctcm9zZS01MCBwLTMgdGV4dC1zbSB0ZXh0LXJvc2UtODAwXCJcbiAgICAgICAgICB9XG4gICAgICAgID5cbiAgICAgICAgICA8cD57cXVpY2tUaWNrZXRFcnJvck1lc3NhZ2V9PC9wPlxuICAgICAgICAgIHtxdWlja1RpY2tldEF0dGVtcHRJZCA/IChcbiAgICAgICAgICAgIDxwXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgICAgICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmVcbiAgICAgICAgICAgICAgICAgID8gXCJyb3VuZGVkLWxnIGJvcmRlciBib3JkZXItYW1iZXItMjAwIGJnLXdoaXRlIHB4LTIgcHktMSBmb250LW1vbm8gdGV4dC1bMTFweF0gdGV4dC1hbWJlci05MDAgYnJlYWstYWxsXCJcbiAgICAgICAgICAgICAgICAgIDogXCJyb3VuZGVkLWxnIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctd2hpdGUgcHgtMiBweS0xIGZvbnQtbW9ubyB0ZXh0LVsxMXB4XSB0ZXh0LXJvc2UtODAwIGJyZWFrLWFsbFwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2BhdHRlbXB0SWQ6ICR7cXVpY2tUaWNrZXRBdHRlbXB0SWR9YH1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICB7cXVpY2tUaWNrZXRUcmFjZUxpc3QubGVuZ3RoID4gMCA/IChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICAgICAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZVxuICAgICAgICAgICAgICAgICAgPyBcInJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1hbWJlci0yMDAgYmctd2hpdGUgcC0yIHRleHQteHMgdGV4dC1hbWJlci04MDBcIlxuICAgICAgICAgICAgICAgICAgOiBcInJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy13aGl0ZSBwLTIgdGV4dC14cyB0ZXh0LXJvc2UtNzAwXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7cXVpY2tUaWNrZXRUcmFjZUxpc3QubWFwKChlbnRyeSkgPT4gKFxuICAgICAgICAgICAgICAgIDxwIGtleT17YCR7ZW50cnkuc3RlcH0tJHtlbnRyeS5hdH1gfT57YCR7ZW50cnkuc3RlcH06ICR7ZW50cnkudHJhY2VJZH1gfTwvcD5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGdhcC0yXCI+XG4gICAgICAgICAgICB7aGFzUGFydGlhbFRpY2tldEZhaWx1cmUgPyAoXG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIiBvbkNsaWNrPXtvbk9wZW5DcmVhdGVkVGlja2V0fT5cbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X09wZW5DcmVhdGVkVGlja2V0XCIsIFwiT3BlbiBjcmVhdGVkIHRpY2tldFwiKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIHtoYXNQZW5kaW5nVXBsb2FkUmV0cnkgPyAoXG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIiBvbkNsaWNrPXtvblJldHJ5UGVuZGluZ1VwbG9hZH0+XG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9SZXRyeVVwbG9hZFwiLCBcIlJlaW50ZW50YXIgdXBsb2FkXCIpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gcHgtMyBweS0xLjUgdGV4dC14c1wiIG9uQ2xpY2s9e29uQ2xlYXJRdWlja1RpY2tldEVycm9yfT5cbiAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fQ2xvc2VcIiwgXCJDbG9zZVwiKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXM7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7IEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW0gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nQWN0aW9uQnV0dG9uLnRzeFwiO1xuaW1wb3J0IHsgdXNlQXV0aENvbnRleHQgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcbmltcG9ydCB7IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlVGltZWxpbmVDYXJkRWZmZWN0cy50c1wiO1xuaW1wb3J0IHsgdXNlQ29uZmlybURpYWxvZyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzXCI7XG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZU51bWJlciB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XG5pbXBvcnQgeyBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VNYW5hZ2VkVXNlclNjb3BlLnRzXCI7XG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCwgcmVsb2FkRXhwZW5zZVBhZ2UgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcbmltcG9ydCB7IHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dC50c1wiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZVN0YXR1c0xhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlU3RhdHVzQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9ucy50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZS50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93LnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUgfSBmcm9tIFwiLi4vbGlzdC91c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUudHNcIjtcblxuY29uc3QgTElORVNfUEFHRV9TSVpFID0gNjtcbmNvbnN0IEVYUEVOU0VfU1RBVFVTX0FQUFJPVkFMX1JFUVVFU1RFRCA9IDE7XG5cbmNvbnN0IHBhZ2VkU2xpY2UgPSA8VCw+KGl0ZW1zOiBUW10sIHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcik6IFRbXSA9PiB7XG4gIGlmICghaXRlbXMubGVuZ3RoKSByZXR1cm4gW107XG4gIGNvbnN0IHNhZmVQYWdlID0gTWF0aC5tYXgoMSwgcGFnZSk7XG4gIGNvbnN0IHN0YXJ0ID0gKHNhZmVQYWdlIC0gMSkgKiBwYWdlU2l6ZTtcbiAgcmV0dXJuIGl0ZW1zLnNsaWNlKHN0YXJ0LCBzdGFydCArIHBhZ2VTaXplKTtcbn07XG5cbmNvbnN0IE5ld1RpY2tldEljb24gPSAoKSA9PiAoXG4gIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9ezEuNX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3NOYW1lPVwiaC01IHctNVwiPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTEwIDIwaC01YTIgMiAwIDAgMSAtMiAtMnYtOWEyIDIgMCAwIDEgMiAtMmgxYTIgMiAwIDAgMCAyIC0yYTEgMSAwIDAgMSAxIC0xaDZhMSAxIDAgMCAxIDEgMWEyIDIgMCAwIDAgMiAyaDFhMiAyIDAgMCAxIDIgMnYyXCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNC4zNjIgMTEuMTVhMyAzIDAgMSAwIC00LjE0NCA0LjI2M1wiIC8+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgMjF2LTRhMiAyIDAgMSAxIDQgMHY0XCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAxOWg0XCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0yMSAxNXY2XCIgLz5cbiAgPC9zdmc+XG4pO1xuXG5jb25zdCBMaW5rVGlja2V0SWNvbiA9ICgpID0+IChcbiAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD17MS41fSBhcmlhLWhpZGRlbj1cInRydWVcIiBjbGFzc05hbWU9XCJoLTUgdy01XCI+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTMuMTkgOC42ODhhNC41IDQuNSAwIDAgMSAxLjI0MiA3LjI0NGwtNC41IDQuNWE0LjUgNC41IDAgMCAxLTYuMzY0LTYuMzY0bDEuNzU3LTEuNzU3bTEzLjM1LS42MjIgMS43NTctMS43NTdhNC41IDQuNSAwIDAgMC02LjM2NC02LjM2NGwtNC41IDQuNWE0LjUgNC41IDAgMCAwIDEuMjQyIDcuMjQ0XCIgLz5cbiAgPC9zdmc+XG4pO1xuXG5jb25zdCBOZXdMaW5lSWNvbiA9ICgpID0+IChcbiAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD17MS41fSBhcmlhLWhpZGRlbj1cInRydWVcIiBjbGFzc05hbWU9XCJoLTUgdy01XCI+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMyAxOWMzLjMzMyAtMiA1IC00IDUgLTZjMCAtMyAtMSAtMyAtMiAtM3MtMi4wMzIgMS4wODUgLTIgM2MuMDM0IDIuMDQ4IDEuNjU4IDIuODc3IDIuNSA0YzEuNSAyIDIuNSAyLjUgMy41IDFjLjY2NyAtMSAxLjE2NyAtMS44MzMgMS41IC0yLjVjMSAyLjMzMyAyLjMzMyAzLjUgNCAzLjVoMi41XCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0yMCAxN3YtMTJjMCAtMS4xMjEgLS44NzkgLTIgLTIgLTJzLTIgLjg3OSAtMiAydjEybDIgMmwyIC0yXCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNiA3aDRcIiAvPlxuICA8L3N2Zz5cbik7XG5cbi8vIEluaXRpYWxpemVzIGF1dGggc2VlZCBmb3IgZXhwZW5zZSBBUEkgY2FsbHMgYmVmb3JlIGlzbGFuZCBlZmZlY3RzIHJ1bi5cbmV4cG9ydCBjb25zdCBib290c3RyYXBFeHBlbnNlQXBpQXV0aCA9ICgpID0+IHtcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgoe1xuICAgIHRva2VuOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBJX1RPS0VOX18pLFxuICAgIGVudHJhT2lkOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfRU5UUkFfT0lEX18pLFxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUFBfQ09ERV9fKSxcbiAgfSk7XG59O1xuXG4vLyBPd25zIHRoZSBkZXRhaWwtcGFnZSBvcmNoZXN0cmF0aW9uIGFuZCBrZWVwcyB0aGUgdmlldyBjb21wb25lbnQgZm9jdXNlZCBvbiByZW5kZXJpbmcuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRyb2xsZXIgPSAoKSA9PiB7XG4gIGNvbnN0IHtcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gICAgY3VycmVudEF4VXNlcklkLFxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcbiAgfSA9IHVzZUF1dGhDb250ZXh0KCk7XG4gIGNvbnN0IGhhc0FjY2VzcyA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiVmlld1wiKTtcbiAgY29uc3QgY2FuQ3JlYXRlRXhwZW5zZSA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiQWRkXCIpO1xuICBjb25zdCBzaGVldElkID0gc2FmZVRleHQod2luZG93Ll9fRVhQRU5TRV9TSEVFVF9JRF9fKTtcbiAgY29uc3Qgc2hlZXRNb2RlID0gc2FmZVRleHQod2luZG93Ll9fRVhQRU5TRV9TSEVFVF9NT0RFX18pLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGlzQ3JlYXRlTW9kZSA9IHNoZWV0TW9kZSA9PT0gXCJjcmVhdGVcIjtcbiAgY29uc3QgaXNNYW5hZ2luZ090aGVyVXNlckJ5U2VsZWN0aW9uID0gaXNNYW5hZ2luZ090aGVyRXhwZW5zZVJlY29yZCh7XG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcbiAgICBjdXJyZW50QXhVc2VySWQsXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICAgIHJlY29yZE93bmVyVXNlcklkOiBcIlwiLFxuICAgIGlzQ3JlYXRlTW9kZSxcbiAgfSk7XG4gIGNvbnN0IGNhbkNyZWF0ZUV4cGVuc2VGb3JTZWxlY3RlZENvbnRleHQgPSBjYW5DcmVhdGVFeHBlbnNlICYmICFpc01hbmFnaW5nT3RoZXJVc2VyQnlTZWxlY3Rpb247XG4gIGNvbnN0IGxpbmVDb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgY3JlYXRlZFNoZWV0SWRSZWYgPSB1c2VSZWYoXCJcIik7XG4gIGNvbnN0IGNhbWVyYUlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgZ2FsbGVyeUlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2lzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSwgc2V0SXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBwYWdpbmF0aW9uTGFiZWxzID0gdXNlTWVtbyhcbiAgICAoKSA9PiAoe1xuICAgICAgZmlyc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfRmlyc3RcIiwgXCJGaXJzdFwiKSxcbiAgICAgIHByZXY6IGluZFQoXCJIaXN0b3J5X1BhZ2VfUHJldlwiLCBcIlByZXZpb3VzXCIpLFxuICAgICAgbmV4dDogaW5kVChcIkhpc3RvcnlfUGFnZV9OZXh0XCIsIFwiTmV4dFwiKSxcbiAgICAgIGxhc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTGFzdFwiLCBcIkxhc3RcIiksXG4gICAgfSksXG4gICAgW11cbiAgKTtcblxuICBjb25zdCBkZXRhaWxTdGF0ZSA9IHVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlKHtcbiAgICBoYXNBY2Nlc3MsXG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogY2FuQ3JlYXRlRXhwZW5zZUZvclNlbGVjdGVkQ29udGV4dCxcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gICAgY3VycmVudEF4VXNlcklkLFxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICAgIHNoZWV0SWQsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxuICB9KTtcblxuICBjb25zdCB7XG4gICAgaGVhZGVyLFxuICAgIGxpbmVzLFxuICAgIGxpbmVQYWdlLFxuICAgIGlzTG9hZGluZyxcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgYnVzeSxcbiAgICBzdGF0dXMsXG4gICAgaXNFZGl0aW5nLFxuICAgIG1vZGFsRXJyb3IsXG4gICAgZHJhZnREZXNjcmlwdGlvbixcbiAgICBkcmFmdFByb2plY3RJZCxcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSxcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUsXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsXG4gICAgcHJvamVjdFZhbHVlLFxuICAgIGRldGFpbFBvbGljeSxcbiAgICBpc01hbmFnaW5nT3RoZXJVc2VyLFxuICAgIGlzU2hlZXRMb2NrZWQsXG4gICAgZXhjaGFuZ2VSYXRlVmFsdWUsXG4gICAgc2hvd0V4Y2hhbmdlUmF0ZSxcbiAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcbiAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXG4gICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LFxuICAgIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlLFxuICAgIGNhbkVkaXRTdGF0dXNDb21tZW50Q3VycmVudCxcbiAgICBjYW5FZGl0QW55Q3VycmVudCxcbiAgICBjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzLFxuICAgIGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50LFxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcbiAgICBzZXRMaW5lUGFnZSxcbiAgICBzZXRCdXN5LFxuICAgIHNldFN0YXR1cyxcbiAgICBzZXRJc0VkaXRpbmcsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxuICAgIHNldERyYWZ0UHJvamVjdElkLFxuICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlLFxuICAgIHNldERyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxuICAgIGhhbmRsZU9wZW5DcmVhdGVMaW5lTW9kZSxcbiAgICBoYW5kbGVPcGVuTGlua1RpY2tldE1vZGUsXG4gICAgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldCxcbiAgICBuYXZpZ2F0ZVRvTGluZURldGFpbCxcbiAgfSA9IGRldGFpbFN0YXRlO1xuXG4gIGNvbnN0IGNhbkNyZWF0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyA9IGNhbkNyZWF0ZUV4cGVuc2UgJiYgIWlzTWFuYWdpbmdPdGhlclVzZXI7XG4gIGNvbnN0IGNhbkRlbGV0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyA9IGRldGFpbFBvbGljeS5jYW5EZWxldGVTaGVldDtcbiAgY29uc3QgY2FuVHJhbnNpdGlvblN0YXR1cyA9IGRldGFpbFBvbGljeS5zdGF0dXNBY3Rpb25zLmxlbmd0aCA+IDA7XG4gIGNvbnN0IGlzUmVhZE9ubHlNb2RlID0gZGV0YWlsUG9saWN5LmludGVyYWN0aW9uTW9kZSA9PT0gXCJyZWFkX29ubHlcIjtcbiAgY29uc3QgY3VycmVudFN0YXR1c0NvZGUgPSB0eXBlb2YgaGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMgPT09IFwibnVtYmVyXCIgPyBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzIDogbnVsbDtcbiAgY29uc3QgaGlkZXNDcnVkVG9wYmFyQnlTdGF0dXMgPVxuICAgIGN1cnJlbnRTdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19BUFBST1ZBTF9SRVFVRVNURUQgJiYgIWNhbkVkaXRBbnlDdXJyZW50O1xuICBjb25zdCB0b3BiYXJBY3Rpb25Nb2RlID0gIWlzQ3JlYXRlTW9kZSAmJiAoaXNSZWFkT25seU1vZGUgfHwgaGlkZXNDcnVkVG9wYmFyQnlTdGF0dXMpID8gXCJ2aWV3X29ubHlcIiA6IFwiZGVmYXVsdFwiO1xuICBjb25zdCBkZXRhaWxQZXJtaXNzaW9uc1JlYWR5ID0gbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5ICYmIChpc0NyZWF0ZU1vZGUgfHwgISFoZWFkZXIpO1xuICBjb25zdCB7IGludmFsaWRhdGVDYWNoZWRMaXN0Rm9yUmVmZXRjaCB9ID0gdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlKCk7XG5cbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXG4gIH0pO1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xuICAgICAgYnVzeSxcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xuICAgICAgICBzZXRTdGF0dXMobXNnKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtLCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXNdKTtcblxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKTtcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGJ1c3lcbiAgICA/IG1vZGFsTG9hZGluZ1RleHRcbiAgICA6ICFidXN5ICYmIG1vZGFsRXJyb3JcbiAgICAgID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpXG4gICAgICA6IChtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSk7XG5cbiAgY29uc3QgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghYnVzeSAmJiBtb2RhbEVycm9yKSB7XG4gICAgICBjbG9zZUNvbmZpcm0oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2b2lkIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xuICB9LCBbYnVzeSwgY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm0sIG1vZGFsRXJyb3JdKTtcblxuICBjb25zdCB2aXNpYmxlTGluZXMgPSB1c2VNZW1vKCgpID0+IHBhZ2VkU2xpY2UobGluZXMsIGxpbmVQYWdlLCBMSU5FU19QQUdFX1NJWkUpLCBbbGluZVBhZ2UsIGxpbmVzXSk7XG4gIGNvbnN0IHRvdGFsTGluZVBhZ2VzID0gTWF0aC5jZWlsKChsaW5lcy5sZW5ndGggfHwgMCkgLyBMSU5FU19QQUdFX1NJWkUpO1xuICBjb25zdCB0b3RhbEFtb3VudFRleHQgPSB1c2VNZW1vKFxuICAgICgpID0+XG4gICAgICBmb3JtYXRFeHBlbnNlTnVtYmVyKGhlYWRlcj8udG90YWxBbW91bnQsIHtcbiAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgICAgICBmYWxsYmFjazogXCItXCIsXG4gICAgICB9KSxcbiAgICBbaGVhZGVyPy50b3RhbEFtb3VudF1cbiAgKTtcblxuICBjb25zdCB7IGhhbmRsZVVwZGF0ZSwgaGFuZGxlU3RhdHVzVHJhbnNpdGlvbiwgaGFuZGxlRGVsZXRlIH0gPSB1c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMoe1xuICAgIGJ1c3ksXG4gICAgaXNFZGl0aW5nLFxuICAgIGlzQ3JlYXRlTW9kZSxcbiAgICBpc0VkaXRMb2NrZWQ6IGlzUmVhZE9ubHlNb2RlLFxuICAgIGlzRGVsZXRlTG9ja2VkOiBpc1NoZWV0TG9ja2VkLFxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcbiAgICBsb2NrZWRDdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSxcbiAgICBsb2NrZWRFeGNoYW5nZVJhdGU6IHNhZmVUZXh0KGhlYWRlcj8uZXhjaFJhdGUpLFxuICAgIGNhbkNyZWF0ZUV4cGVuc2U6IGNhbkNyZWF0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyxcbiAgICBjYW5FZGl0RXhwZW5zZTogY2FuRWRpdEFueUN1cnJlbnQsXG4gICAgY2FuRGVsZXRlRXhwZW5zZTogY2FuRGVsZXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxuICAgIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50LFxuICAgIGNhblRyYW5zaXRpb25TdGF0dXMsXG4gICAgc2hlZXRJZCxcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsXG4gICAgZHJhZnRQcm9qZWN0SWQsXG4gICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcbiAgICBjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzOiBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyxcbiAgICBjdXJyZW50RXhjaGFuZ2VSYXRlTW9kZTogaGVhZGVyPy5leGNoYW5nZVJhdGVNb2RlLFxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgICBvbkNyZWF0ZVN1Y2Nlc3M6IChjcmVhdGVkU2hlZXRJZCkgPT4ge1xuICAgICAgY3JlYXRlZFNoZWV0SWRSZWYuY3VycmVudCA9IHNhZmVUZXh0KGNyZWF0ZWRTaGVldElkKTtcbiAgICB9LFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRTdGF0dXMsXG4gICAgc2V0SXNFZGl0aW5nLFxuICB9KTtcblxuICBjb25zdCBoYW5kbGVTYXZlU3VjY2VzcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICBjb25zdCBjcmVhdGVkU2hlZXRJZCA9IHNhZmVUZXh0KGNyZWF0ZWRTaGVldElkUmVmLmN1cnJlbnQpO1xuICAgICAgaWYgKCFjcmVhdGVkU2hlZXRJZCkgcmV0dXJuO1xuICAgICAgc2V0SXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlKHRydWUpO1xuICAgICAgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldChjcmVhdGVkU2hlZXRJZCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmVsb2FkRXhwZW5zZVBhZ2UoKTtcbiAgfSwgW2lzQ3JlYXRlTW9kZSwgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldF0pO1xuXG4gIGNvbnN0IGhhbmRsZVN0YXR1c0FjdGlvbkNsaWNrID0gdXNlQ2FsbGJhY2soXG4gICAgKGFjdGlvbjogeyBsYWJlbEtleTogc3RyaW5nOyBmYWxsYmFjazogc3RyaW5nOyBuZXh0U3RhdHVzOiBudW1iZXIgfSkgPT4ge1xuICAgICAgY29uc3QgYWN0aW9uTGFiZWwgPSBpbmRUKGFjdGlvbi5sYWJlbEtleSwgYWN0aW9uLmZhbGxiYWNrKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRTdGF0dXNMYWJlbCA9XG4gICAgICAgIGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzID09PSBudWxsIHx8IGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzID09PSB1bmRlZmluZWRcbiAgICAgICAgICA/IGluZFQoXCJDb21tb25fTm9EYXRhXCIsIFwiTm8gZGF0YVwiKVxuICAgICAgICAgIDogZ2V0RXhwZW5zZVN0YXR1c0xhYmVsKGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMpO1xuICAgICAgY29uc3QgbmV4dFN0YXR1c0xhYmVsID0gZ2V0RXhwZW5zZVN0YXR1c0xhYmVsKGFjdGlvbi5uZXh0U3RhdHVzKTtcbiAgICAgIGNvbnN0IHRyYW5zaXRpb25NZXNzYWdlID0gaW5kRm9ybWF0KFxuICAgICAgICBcIkV4cGVuc2VTaGVldHNfQm90dG9tQWN0aW9uc19Db25maXJtVHJhbnNpdGlvblwiLFxuICAgICAgICBcIkN1cnJlbnQgc3RhdHVzOiB7MH1cXG5OZXcgc3RhdHVzOiB7MX1cXG5cXG5EbyB5b3Ugd2FudCB0byB1cGRhdGUgdGhlIGV4cGVuc2Ugc2hlZXQgc3RhdHVzP1wiLFxuICAgICAgICBjdXJyZW50U3RhdHVzTGFiZWwsXG4gICAgICAgIG5leHRTdGF0dXNMYWJlbFxuICAgICAgKS5yZXBsYWNlKC9cXFxcbi9nLCBcIlxcblwiKTtcbiAgICAgIG9wZW5Db25maXJtKHtcbiAgICAgICAgdGl0bGU6IGFjdGlvbkxhYmVsLFxuICAgICAgICBtZXNzYWdlOiB0cmFuc2l0aW9uTWVzc2FnZSxcbiAgICAgICAgY29uZmlybVRleHQ6IGFjdGlvbkxhYmVsLFxuICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZVN0YXR1c1RyYW5zaXRpb24oYWN0aW9uLm5leHRTdGF0dXMsIGFjdGlvbkxhYmVsKTtcbiAgICAgICAgICBpZiAob2spIHtcbiAgICAgICAgICAgIGludmFsaWRhdGVDYWNoZWRMaXN0Rm9yUmVmZXRjaCgpO1xuICAgICAgICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICAgICAgICByZWxvYWRFeHBlbnNlUGFnZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gb2s7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtjbG9zZUNvbmZpcm0sIGhhbmRsZVN0YXR1c1RyYW5zaXRpb24sIGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzLCBpbnZhbGlkYXRlQ2FjaGVkTGlzdEZvclJlZmV0Y2gsIG9wZW5Db25maXJtXVxuICApO1xuXG4gIHVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMoe1xuICAgIGJ1c3k6IGJ1c3kgfHwgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLFxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcbiAgICBpc0VkaXRpbmcsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIGFjdGlvbk1vZGU6IHRvcGJhckFjdGlvbk1vZGUsXG4gICAgaXNMb2NrZWQ6IGlzU2hlZXRMb2NrZWQsXG4gICAgaXNFZGl0TG9ja2VkOiBpc1JlYWRPbmx5TW9kZSxcbiAgICBpc0RlbGV0ZUxvY2tlZDogaXNTaGVldExvY2tlZCxcbiAgICBwZXJtaXNzaW9uc1JlYWR5OiBkZXRhaWxQZXJtaXNzaW9uc1JlYWR5LFxuICAgIGNhbkNyZWF0ZUV4cGVuc2U6IGNhbkNyZWF0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyxcbiAgICBjYW5FZGl0RXhwZW5zZTogY2FuRWRpdEFueUN1cnJlbnQsXG4gICAgY2FuRGVsZXRlRXhwZW5zZTogY2FuRGVsZXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxuICAgIGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVEZWxldGUsXG4gICAgb25TYXZlU3VjY2VzczogaGFuZGxlU2F2ZVN1Y2Nlc3MsXG4gICAgb25EZWxldGVTdWNjZXNzOiAoKSA9PiB7XG4gICAgICBpbnZhbGlkYXRlQ2FjaGVkTGlzdEZvclJlZmV0Y2goKTtcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXRzXCIpO1xuICAgIH0sXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgY2xvc2VDb25maXJtLFxuICB9KTtcblxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGNhcmQgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiKTtcbiAgICBpZiAoIWNhcmQpIHJldHVybiBudWxsO1xuICAgIGlmICghbGluZUNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyhjYXJkKSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNhcmQ7XG4gIH0sIFtdKTtcblxuICB1c2VUaW1lbGluZUNhcmRFZmZlY3RzKHtcbiAgICBjb250YWluZXJSZWY6IGxpbmVDb250YWluZXJSZWYsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGl0ZW1zOiB2aXNpYmxlTGluZXMsXG4gICAgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsXG4gIH0pO1xuXG4gIGNvbnN0IHF1aWNrVGlja2V0RmxvdyA9IHVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvdyh7XG4gICAgc2hlZXRJZDogc2FmZVRleHQoaGVhZGVyPy5ob2phR2FzdG9zSWQgfHwgc2hlZXRJZCksXG4gICAgcHJvamVjdElkOiBwcm9qZWN0VmFsdWUsXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChoZWFkZXI/LmN1cnJlbmN5Q29kZSksXG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogIWlzQ3JlYXRlTW9kZSAmJiBkZXRhaWxQb2xpY3kuc2hvd0ZhYixcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgaXNTaGVldExvY2tlZDogIWNhblVzZUZ1bGxFZGl0RmVhdHVyZXMsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gICAgb25Db21wbGV0ZWQ6IChyZXN1bHQpID0+IHtcbiAgICAgIGNvbnN0IGNyZWF0ZWRGaWxlSWQgPSBzYWZlVGV4dChyZXN1bHQ/LmZpbGVJZCk7XG4gICAgICBpZiAoIWNyZWF0ZWRGaWxlSWQpIHtcbiAgICAgICAgcmVsb2FkRXhwZW5zZVBhZ2UoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjdXJyZW50U2hlZXRJZCA9IHNhZmVUZXh0KGhlYWRlcj8uaG9qYUdhc3Rvc0lkIHx8IHNoZWV0SWQpO1xuICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcbiAgICAgICAgZmlsZUlkOiBjcmVhdGVkRmlsZUlkLFxuICAgICAgICBtb2RlOiBcImVkaXRcIixcbiAgICAgICAgb3JpZ2luOiBcInNoZWV0LWNyZWF0ZVwiLFxuICAgICAgfSk7XG4gICAgICBpZiAoY3VycmVudFNoZWV0SWQpIHtcbiAgICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KHtcbiAgICAgICAgICBmaWxlSWQ6IGNyZWF0ZWRGaWxlSWQsXG4gICAgICAgICAgb3JpZ2luOiBcInNoZWV0LWNyZWF0ZVwiLFxuICAgICAgICAgIHNoZWV0SWQ6IGN1cnJlbnRTaGVldElkLFxuICAgICAgICB9KTtcbiAgICAgICAgcXVlcnkuc2V0KFwic2hlZXRJZFwiLCBjdXJyZW50U2hlZXRJZCk7XG4gICAgICB9XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXREZXRhaWw/JHtxdWVyeS50b1N0cmluZygpfWApO1xuICAgIH0sXG4gIH0pO1xuXG4gIGNvbnN0IGZhYk1lbnVJdGVtcyA9IHVzZU1lbW88RmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbVtdPihcbiAgICAoKSA9PiBbXG4gICAgICB7XG4gICAgICAgIGlkOiBcIm5ldy10aWNrZXRcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9OZXdUaWNrZXRcIiwgXCJOdWV2byBUaWNrZXRcIiksXG4gICAgICAgIGljb246IDxOZXdUaWNrZXRJY29uIC8+LFxuICAgICAgICBvbkNsaWNrOiBxdWlja1RpY2tldEZsb3cub3BlblNvdXJjZVBpY2tlcixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiBcImxpbmstdGlja2V0XCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfTGlua1RpY2tldFwiLCBcIlZpbmN1bGFyIFRpY2tldFwiKSxcbiAgICAgICAgaWNvbjogPExpbmtUaWNrZXRJY29uIC8+LFxuICAgICAgICBvbkNsaWNrOiBoYW5kbGVPcGVuTGlua1RpY2tldE1vZGUsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogXCJuZXctbGluZVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX05ld0xpbmVcIiwgXCJOdWV2YSBMaW5lYVwiKSxcbiAgICAgICAgaWNvbjogPE5ld0xpbmVJY29uIC8+LFxuICAgICAgICBvbkNsaWNrOiBoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUsXG4gICAgICB9LFxuICAgIF0sXG4gICAgW2hhbmRsZU9wZW5DcmVhdGVMaW5lTW9kZSwgaGFuZGxlT3BlbkxpbmtUaWNrZXRNb2RlLCBxdWlja1RpY2tldEZsb3cub3BlblNvdXJjZVBpY2tlcl1cbiAgKTtcblxuICBjb25zdCBzaG93U3RhdHVzQWN0aW9uQmFyID1cbiAgICAhaXNDcmVhdGVNb2RlICYmICFpc0xvYWRpbmcgJiYgIWlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSAmJiAhZXJyb3JNZXNzYWdlICYmIGRldGFpbFBvbGljeS5zdGF0dXNBY3Rpb25zLmxlbmd0aCA+IDA7XG4gIGNvbnN0IHNob3dGYWIgPSAhaXNDcmVhdGVNb2RlICYmIGRldGFpbFBvbGljeS5zaG93RmFiO1xuICBjb25zdCBoYXNWaXNpYmxlU3RhdHVzQ29tbWVudCA9IHNhZmVUZXh0KGhlYWRlcj8uZXN0YWRvQ29tZW50YXJpb3MpLnRyaW0oKS5sZW5ndGggPiAwO1xuICBjb25zdCBzdGF0dXNDb21tZW50TW9kZTogXCJoaWRkZW5cIiB8IFwicmVhZFwiIHwgXCJlZGl0XCIgPVxuICAgIGlzRWRpdGluZyAmJiBjYW5FZGl0U3RhdHVzQ29tbWVudEN1cnJlbnQgPyBcImVkaXRcIiA6IChoYXNWaXNpYmxlU3RhdHVzQ29tbWVudCA/IFwicmVhZFwiIDogXCJoaWRkZW5cIik7XG5cbiAgcmV0dXJuIHtcbiAgICBoZWFkZXIsXG4gICAgdmlzaWJsZUxpbmVzLFxuICAgIGxpbmVQYWdlLFxuICAgIHRvdGFsTGluZVBhZ2VzLFxuICAgIGlzTG9hZGluZyxcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIGlzRWRpdGluZyxcbiAgICBidXN5LFxuICAgIHN0YXR1cyxcbiAgICBtb2RhbEVycm9yLFxuICAgIGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSxcbiAgICBtb2RhbCxcbiAgICBtb2RhbExvYWRpbmdUZXh0LFxuICAgIG1vZGFsQ2FuY2VsVGV4dCxcbiAgICBtb2RhbENvbmZpcm1UZXh0LFxuICAgIGNhbkNyZWF0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyxcbiAgICBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcbiAgICBjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzLFxuICAgIHNob3dTdGF0dXNBY3Rpb25CYXIsXG4gICAgc2hvd0ZhYixcbiAgICBmYWJNZW51SXRlbXMsXG4gICAgcGFnaW5hdGlvbkxhYmVscyxcbiAgICB0b3RhbEFtb3VudFRleHQsXG4gICAgc3RhdHVzQ29tbWVudE1vZGUsXG4gICAgcHJvamVjdFZhbHVlLFxuICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQsXG4gICAgc2hvd0V4Y2hhbmdlUmF0ZSxcbiAgICBleGNoYW5nZVJhdGVWYWx1ZSxcbiAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSxcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0UHJvamVjdElkLFxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxuICAgIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSxcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUsXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsXG4gICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxuICAgIGRldGFpbFBvbGljeSxcbiAgICBsaW5lQ29udGFpbmVyUmVmLFxuICAgIGNhbWVyYUlucHV0UmVmLFxuICAgIGdhbGxlcnlJbnB1dFJlZixcbiAgICBxdWlja1RpY2tldEZsb3csXG4gICAgc2V0TGluZVBhZ2UsXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcbiAgICBzZXREcmFmdFByb2plY3RJZCxcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgICBzZXREcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxuICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsLFxuICAgIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSxcbiAgICBoYW5kbGVTdGF0dXNBY3Rpb25DbGljayxcbiAgICBjbG9zZUNvbmZpcm0sXG4gIH07XG59O1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QsIEV4cGVuc2VTaGVldEhlYWRlclVwZGF0ZVJlcXVlc3QgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBleGVjdXRlRXhwZW5zZU11dGF0aW9uLCBwYXJzZURlY2ltYWxJbnB1dCB9IGZyb20gXCIuLi9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50c1wiO1xuaW1wb3J0IHtcbiAgY3JlYXRlRXhwZW5zZVNoZWV0LFxuICBkZWxldGVFeHBlbnNlU2hlZXQsXG4gIHVwZGF0ZUV4cGVuc2VTaGVldEhlYWRlcixcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcblxudHlwZSBVc2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnNBcmdzID0ge1xuICBidXN5OiBib29sZWFuO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcbiAgaXNFZGl0TG9ja2VkOiBib29sZWFuO1xuICBpc0RlbGV0ZUxvY2tlZDogYm9vbGVhbjtcbiAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XG4gIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lczogYm9vbGVhbjtcbiAgbG9ja2VkQ3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGxvY2tlZEV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xuICBjYW5FZGl0RXhwZW5zZTogYm9vbGVhbjtcbiAgY2FuRGVsZXRlRXhwZW5zZTogYm9vbGVhbjtcbiAgY2FuRWRpdEhlYWRlckZpZWxkczogYm9vbGVhbjtcbiAgY2FuVHJhbnNpdGlvblN0YXR1czogYm9vbGVhbjtcbiAgc2hlZXRJZDogc3RyaW5nO1xuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGRyYWZ0RXhjaGFuZ2VSYXRlOiBzdHJpbmc7XG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWU6IHN0cmluZztcbiAgZHJhZnRQcm9qZWN0SWQ6IHN0cmluZztcbiAgZHJhZnRFc3RhZG9Db21lbnRhcmlvczogc3RyaW5nO1xuICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k6IHN0cmluZztcbiAgY3VycmVudEV4cGVuc2VTaGVldFN0YXR1cz86IG51bWJlciB8IG51bGw7XG4gIGN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlPzogbnVtYmVyIHwgbnVsbDtcbiAgb25DcmVhdGVTdWNjZXNzOiAoY3JlYXRlZFNoZWV0SWQ6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldEJ1c3k6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG59O1xuXG5jb25zdCBub3JtYWxpemVFeGNoYW5nZVJhdGUgPSAocmF3OiBzdHJpbmcpOiBudW1iZXIgfCBudWxsID0+IHBhcnNlRGVjaW1hbElucHV0KHJhdyk7XG4vLyBDb21wYXJlcyByYXRlcyB3aXRoIHRvbGVyYW5jZSB0byBhdm9pZCBmbG9hdGluZyBwb2ludCBtaXNtYXRjaCBvbiBwYXlsb2FkIG1vZGUuXG5jb25zdCBhcmVSYXRlc0VxdWl2YWxlbnQgPSAobGVmdDogbnVtYmVyIHwgbnVsbCwgcmlnaHQ6IG51bWJlciB8IG51bGwpOiBib29sZWFuID0+IHtcbiAgaWYgKGxlZnQgPT0gbnVsbCB8fCByaWdodCA9PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBNYXRoLmFicyhsZWZ0IC0gcmlnaHQpIDwgMC4wMDAwMDAxO1xufTtcblxuLy8gRW5jYXBzdWxhdGVzIHVwZGF0ZSBhbmQgZGVsZXRlIG11dGF0aW9ucyBmb3IgZXhwZW5zZSBzaGVldCBoZWFkZXIgZGV0YWlsLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9ucyA9ICh7XG4gIGJ1c3ksXG4gIGlzRWRpdGluZyxcbiAgaXNDcmVhdGVNb2RlLFxuICBpc0VkaXRMb2NrZWQsXG4gIGlzRGVsZXRlTG9ja2VkLFxuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxuICBsb2NrZWRDdXJyZW5jeUNvZGUsXG4gIGxvY2tlZEV4Y2hhbmdlUmF0ZSxcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcbiAgY2FuRWRpdEV4cGVuc2UsXG4gIGNhbkRlbGV0ZUV4cGVuc2UsXG4gIGNhbkVkaXRIZWFkZXJGaWVsZHMsXG4gIGNhblRyYW5zaXRpb25TdGF0dXMsXG4gIHNoZWV0SWQsXG4gIGRyYWZ0RGVzY3JpcHRpb24sXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICBkcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcbiAgZHJhZnRQcm9qZWN0SWQsXG4gIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXG4gIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgY3VycmVudEV4cGVuc2VTaGVldFN0YXR1cyxcbiAgY3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUsXG4gIG9uQ3JlYXRlU3VjY2VzcyxcbiAgc2V0TW9kYWxFcnJvcixcbiAgc2V0QnVzeSxcbiAgc2V0U3RhdHVzLFxuICBzZXRJc0VkaXRpbmcsXG59OiBVc2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnNBcmdzKSA9PiB7XG4gIGNvbnN0IGJ1aWxkVXBkYXRlUGF5bG9hZCA9IHVzZUNhbGxiYWNrKFxuICAgIChuZXh0U3RhdHVzPzogbnVtYmVyIHwgbnVsbCk6IHsgcGF5bG9hZDogRXhwZW5zZVNoZWV0SGVhZGVyVXBkYXRlUmVxdWVzdCB9IHwgeyBlcnJvcjogc3RyaW5nIH0gPT4ge1xuICAgICAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbmN5ID0gU3RyaW5nKFxuICAgICAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyA/IChsb2NrZWRDdXJyZW5jeUNvZGUgfHwgZHJhZnRDdXJyZW5jeUNvZGUgfHwgXCJcIikgOiAoZHJhZnRDdXJyZW5jeUNvZGUgfHwgXCJcIilcbiAgICAgIClcbiAgICAgICAgLnRyaW0oKVxuICAgICAgICAudG9VcHBlckNhc2UoKTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWREZXNjcmlwdGlvbiA9IFN0cmluZyhkcmFmdERlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRQcm9qZWN0SWQgPSBTdHJpbmcoZHJhZnRQcm9qZWN0SWQgfHwgXCJcIikudHJpbSgpO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZEVzdGFkb0NvbWVudGFyaW9zID0gU3RyaW5nKGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MgfHwgXCJcIikudHJpbSgpO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZEV4Y2hhbmdlUmF0ZVJhdyA9IFN0cmluZyhcbiAgICAgICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzID8gKGxvY2tlZEV4Y2hhbmdlUmF0ZSB8fCBkcmFmdEV4Y2hhbmdlUmF0ZSB8fCBcIlwiKSA6IChkcmFmdEV4Y2hhbmdlUmF0ZSB8fCBcIlwiKVxuICAgICAgKTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kgPSBTdHJpbmcoZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5IHx8IFwiRVVSXCIpLnRyaW0oKS50b1VwcGVyQ2FzZSgpIHx8IFwiRVVSXCI7XG4gICAgICBjb25zdCByZXF1aXJlc0V4Y2hhbmdlUmF0ZSA9XG4gICAgICAgIGNhbkVkaXRIZWFkZXJGaWVsZHMgJiYgbm9ybWFsaXplZEN1cnJlbmN5ICE9PSBcIlwiICYmIG5vcm1hbGl6ZWRDdXJyZW5jeSAhPT0gbm9ybWFsaXplZEJhc2VDdXJyZW5jeTtcbiAgICAgIGNvbnN0IHBhcnNlZEV4Y2hhbmdlUmF0ZSA9IG5vcm1hbGl6ZUV4Y2hhbmdlUmF0ZShub3JtYWxpemVkRXhjaGFuZ2VSYXRlUmF3KTtcbiAgICAgIGNvbnN0IG9mZmljaWFsRXhjaGFuZ2VSYXRlID0gbm9ybWFsaXplRXhjaGFuZ2VSYXRlKG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUpO1xuICAgICAgY29uc3Qgb3JpZ2luYWxFeGNoYW5nZVJhdGUgPSBub3JtYWxpemVFeGNoYW5nZVJhdGUobG9ja2VkRXhjaGFuZ2VSYXRlKTtcbiAgICAgIGNvbnN0IHBhcnNlZEN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlID0gTnVtYmVyKGN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlKTtcbiAgICAgIGNvbnN0IGhhc0N1cnJlbnRFeGNoYW5nZVJhdGVNb2RlID0gTnVtYmVyLmlzSW50ZWdlcihwYXJzZWRDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSkgJiYgcGFyc2VkQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUgPj0gMDtcbiAgICAgIGNvbnN0IGhhc1ZhbGlkUmF0ZSA9IHBhcnNlZEV4Y2hhbmdlUmF0ZSAhPSBudWxsICYmIHBhcnNlZEV4Y2hhbmdlUmF0ZSA+IDA7XG4gICAgICBjb25zdCBoYXNNYW51YWxSYXRlRWRpdE9uVXBkYXRlID1cbiAgICAgICAgY2FuRWRpdEhlYWRlckZpZWxkcyAmJlxuICAgICAgICAhaXNDcmVhdGVNb2RlICYmXG4gICAgICAgIGhhc1ZhbGlkUmF0ZSAmJlxuICAgICAgICAob3JpZ2luYWxFeGNoYW5nZVJhdGUgPT0gbnVsbCB8fCAhYXJlUmF0ZXNFcXVpdmFsZW50KHBhcnNlZEV4Y2hhbmdlUmF0ZSwgb3JpZ2luYWxFeGNoYW5nZVJhdGUpKTtcbiAgICAgIC8vIE9ubHkgc2VuZCBleGNoYW5nZVJhdGVNb2RlIHdoZW4gdGhlIHVzZXIgYWN0dWFsbHkgY2hhbmdlZCB0aGUgcmF0ZSBtYW51YWxseS5cbiAgICAgIGNvbnN0IGlzTWFudWFsRXhjaGFuZ2VSYXRlID0gKCgpID0+IHtcbiAgICAgICAgaWYgKCFjYW5FZGl0SGVhZGVyRmllbGRzKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICghcmVxdWlyZXNFeGNoYW5nZVJhdGUgfHwgIWhhc1ZhbGlkUmF0ZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICghaXNDcmVhdGVNb2RlICYmICFoYXNNYW51YWxSYXRlRWRpdE9uVXBkYXRlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChvZmZpY2lhbEV4Y2hhbmdlUmF0ZSA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuICFhcmVSYXRlc0VxdWl2YWxlbnQocGFyc2VkRXhjaGFuZ2VSYXRlLCBvZmZpY2lhbEV4Y2hhbmdlUmF0ZSk7XG4gICAgICB9KSgpO1xuICAgICAgY29uc3QgcmVzb2x2ZWRFeGNoYW5nZVJhdGVNb2RlID0gY2FuRWRpdEhlYWRlckZpZWxkc1xuICAgICAgICA/IChpc01hbnVhbEV4Y2hhbmdlUmF0ZSA/IDEgOiAoaGFzQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUgPyBwYXJzZWRDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA6IDApKVxuICAgICAgICA6IChoYXNDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA/IHBhcnNlZEN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlIDogdW5kZWZpbmVkKTtcbiAgICAgIGNvbnN0IHJlc29sdmVkRXhwZW5zZVNoZWV0U3RhdHVzID1cbiAgICAgICAgbmV4dFN0YXR1cyA/PyAoY3VycmVudEV4cGVuc2VTaGVldFN0YXR1cyAhPSBudWxsID8gTnVtYmVyKGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXMpIDogdW5kZWZpbmVkKTtcblxuICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgICBpZiAoIW5vcm1hbGl6ZWREZXNjcmlwdGlvbikge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlcnJvcjogaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9EZXNjcmlwdGlvblJlcXVpcmVkXCIsIFwiRGVzY3JpcHRpb24gaXMgcmVxdWlyZWQuXCIpLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW5vcm1hbGl6ZWRDdXJyZW5jeSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBlcnJvcjogaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9DdXJyZW5jeVJlcXVpcmVkXCIsIFwiQ3VycmVuY3kgaXMgcmVxdWlyZWQuXCIpLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHJlcXVpcmVzRXhjaGFuZ2VSYXRlICYmICFoYXNWYWxpZFJhdGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBlcnJvcjogaW5kVChcbiAgICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0V4Y2hhbmdlUmF0ZVJlcXVpcmVkXCIsXG4gICAgICAgICAgICBcIkV4Y2hhbmdlIHJhdGUgaXMgcmVxdWlyZWQgd2hlbiBjdXJyZW5jeSBpcyBkaWZmZXJlbnQgZnJvbSBiYXNlIGN1cnJlbmN5LlwiXG4gICAgICAgICAgKSxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiBub3JtYWxpemVkRGVzY3JpcHRpb24sXG4gICAgICAgICAgY3VycmVuY3lDb2RlOiBub3JtYWxpemVkQ3VycmVuY3ksXG4gICAgICAgICAgZXhjaFJhdGU6IGhhc1ZhbGlkUmF0ZSA/IE51bWJlcihwYXJzZWRFeGNoYW5nZVJhdGUpIDogMSxcbiAgICAgICAgICBwcm9qSWQ6IG5vcm1hbGl6ZWRQcm9qZWN0SWQgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgIGV4cGVuc2VTaGVldFN0YXR1czogcmVzb2x2ZWRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlTW9kZTogcmVzb2x2ZWRFeGNoYW5nZVJhdGVNb2RlLFxuICAgICAgICAgIGVzdGFkb0NvbWVudGFyaW9zOiBub3JtYWxpemVkRXN0YWRvQ29tZW50YXJpb3MgfHwgdW5kZWZpbmVkLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9LFxuICAgIFtcbiAgICAgIGNhbkVkaXRIZWFkZXJGaWVsZHMsXG4gICAgICBjdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSxcbiAgICAgIGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gICAgICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxuICAgICAgZHJhZnRFeGNoYW5nZVJhdGUsXG4gICAgICBkcmFmdFByb2plY3RJZCxcbiAgICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgICAgIGlzQ3JlYXRlTW9kZSxcbiAgICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxuICAgICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxuICAgICAgbG9ja2VkQ3VycmVuY3lDb2RlLFxuICAgICAgbG9ja2VkRXhjaGFuZ2VSYXRlLFxuICAgICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcbiAgICBdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlVXBkYXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChidXN5IHx8ICFpc0VkaXRpbmcpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWlzQ3JlYXRlTW9kZSAmJiBpc0VkaXRMb2NrZWQpIHJldHVybiBmYWxzZTtcblxuICAgIGNvbnN0IGNhblByb2NlZWQgPSBpc0NyZWF0ZU1vZGUgPyBjYW5DcmVhdGVFeHBlbnNlIDogY2FuRWRpdEV4cGVuc2U7XG4gICAgaWYgKCFjYW5Qcm9jZWVkKSB7XG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgcGF5bG9hZFJlc3VsdCA9IGJ1aWxkVXBkYXRlUGF5bG9hZCgpO1xuICAgIGlmIChcImVycm9yXCIgaW4gcGF5bG9hZFJlc3VsdCkge1xuICAgICAgc2V0TW9kYWxFcnJvcihwYXlsb2FkUmVzdWx0LmVycm9yKTtcbiAgICAgIHNldFN0YXR1cyhwYXlsb2FkUmVzdWx0LmVycm9yKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcbiAgICAgIHN0YXJ0U3RhdHVzOiBpc0NyZWF0ZU1vZGVcbiAgICAgICAgPyBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpXG4gICAgICAgIDogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0aW5nXCIsIFwiVXBkYXRpbmcgZXhwZW5zZSBzaGVldC4uLlwiKSxcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRXJyb3JcIiwgXCJVcGRhdGUgZXJyb3IuXCIpLFxuICAgICAgc2V0TW9kYWxFcnJvcixcbiAgICAgIHNldEJ1c3ksXG4gICAgICBzZXRTdGF0dXMsXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgICAgIGNvbnN0IGNyZWF0ZVBheWxvYWQgPSBwYXlsb2FkUmVzdWx0LnBheWxvYWQ7XG4gICAgICAgICAgY29uc3QgcGF5bG9hZDogRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCA9IHtcbiAgICAgICAgICAgIG1vZGU6IDEsXG4gICAgICAgICAgICBleGlzdGluZ0hvamFHYXN0b3NJZDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGNyZWF0ZVBheWxvYWQuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBjdXJyZW5jeUNvZGU6IGNyZWF0ZVBheWxvYWQuY3VycmVuY3lDb2RlLFxuICAgICAgICAgICAgZXhjaFJhdGU6IGNyZWF0ZVBheWxvYWQuZXhjaFJhdGUsXG4gICAgICAgICAgICBwcm9qSWQ6IGNyZWF0ZVBheWxvYWQucHJvaklkLFxuICAgICAgICAgICAgZXhwZW5zZVNoZWV0U3RhdHVzOiAwLFxuICAgICAgICAgICAgZXhjaGFuZ2VSYXRlTW9kZTogY3JlYXRlUGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlLFxuICAgICAgICAgICAgbGluZXM6IFtdLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNyZWF0ZUV4cGVuc2VTaGVldChwYXlsb2FkKTtcblxuICAgICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBBY2NlcHQgYm90aCBjYXNpbmcgdmFyaWFudHMgZnJvbSBiYWNrZW5kIGVudmVsb3Blcy5cbiAgICAgICAgICBjb25zdCBjcmVhdGVkRGF0YSA9IHJlc3BvbnNlPy5EYXRhIGFzIHsgSG9qYUdhc3Rvc0lkPzogdW5rbm93bjsgaG9qYUdhc3Rvc0lkPzogdW5rbm93biB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAgICAgICBjb25zdCBjcmVhdGVkU2hlZXRJZCA9IFN0cmluZyhjcmVhdGVkRGF0YT8uSG9qYUdhc3Rvc0lkID8/IGNyZWF0ZWREYXRhPy5ob2phR2FzdG9zSWQgPz8gXCJcIikudHJpbSgpO1xuICAgICAgICAgIGlmICghY3JlYXRlZFNoZWV0SWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG9uQ3JlYXRlU3VjY2VzcyhjcmVhdGVkU2hlZXRJZCk7XG4gICAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIikpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB1cGRhdGVFeHBlbnNlU2hlZXRIZWFkZXIoc2hlZXRJZCwgcGF5bG9hZFJlc3VsdC5wYXlsb2FkKTtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVkXCIsIFwiRXhwZW5zZSBzaGVldCB1cGRhdGVkXCIpKTtcbiAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcbiAgfSwgW1xuICAgIGJ1c3ksXG4gICAgYnVpbGRVcGRhdGVQYXlsb2FkLFxuICAgIGNhbkNyZWF0ZUV4cGVuc2UsXG4gICAgY2FuRWRpdEV4cGVuc2UsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIGlzRWRpdExvY2tlZCxcbiAgICBpc0VkaXRpbmcsXG4gICAgb25DcmVhdGVTdWNjZXNzLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0SXNFZGl0aW5nLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0U3RhdHVzLFxuICAgIHNoZWV0SWQsXG4gIF0pO1xuXG4gIGNvbnN0IGhhbmRsZVN0YXR1c1RyYW5zaXRpb24gPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAobmV4dFN0YXR1czogbnVtYmVyLCBzdGFydFN0YXR1czogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoYnVzeSB8fCBpc0NyZWF0ZU1vZGUgfHwgIXNoZWV0SWQpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmICghY2FuVHJhbnNpdGlvblN0YXR1cykge1xuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGF5bG9hZFJlc3VsdCA9IGJ1aWxkVXBkYXRlUGF5bG9hZChuZXh0U3RhdHVzKTtcbiAgICAgIGlmIChcImVycm9yXCIgaW4gcGF5bG9hZFJlc3VsdCkge1xuICAgICAgICBzZXRNb2RhbEVycm9yKHBheWxvYWRSZXN1bHQuZXJyb3IpO1xuICAgICAgICBzZXRTdGF0dXMocGF5bG9hZFJlc3VsdC5lcnJvcik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XG4gICAgICAgIHN0YXJ0U3RhdHVzLFxuICAgICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKSxcbiAgICAgICAgc2V0TW9kYWxFcnJvcixcbiAgICAgICAgc2V0QnVzeSxcbiAgICAgICAgc2V0U3RhdHVzLFxuICAgICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHVwZGF0ZUV4cGVuc2VTaGVldEhlYWRlcihzaGVldElkLCBwYXlsb2FkUmVzdWx0LnBheWxvYWQpO1xuXG4gICAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlZFwiLCBcIkV4cGVuc2Ugc2hlZXQgdXBkYXRlZFwiKSk7XG4gICAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmVzdWx0Lm9rO1xuICAgIH0sXG4gICAgW2J1c3ksIGJ1aWxkVXBkYXRlUGF5bG9hZCwgY2FuVHJhbnNpdGlvblN0YXR1cywgaXNDcmVhdGVNb2RlLCBzZXRCdXN5LCBzZXRJc0VkaXRpbmcsIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1cywgc2hlZXRJZF1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVEZWxldGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKGJ1c3kpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoaXNEZWxldGVMb2NrZWQpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWNhbkRlbGV0ZUV4cGVuc2UpIHtcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcbiAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRpbmdcIiwgXCJEZWxldGluZyBleHBlbnNlIHNoZWV0Li4uXCIpLFxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVFcnJvclwiLCBcIkRlbGV0ZSBlcnJvci5cIiksXG4gICAgICBzZXRNb2RhbEVycm9yLFxuICAgICAgc2V0QnVzeSxcbiAgICAgIHNldFN0YXR1cyxcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldChzaGVldElkKTtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVkXCIsIFwiRXhwZW5zZSBzaGVldCBkZWxldGVkXCIpKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcbiAgfSwgW2J1c3ksIGNhbkRlbGV0ZUV4cGVuc2UsIGlzRGVsZXRlTG9ja2VkLCBzZXRCdXN5LCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXMsIHNoZWV0SWRdKTtcblxuICByZXR1cm4ge1xuICAgIGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVTdGF0dXNUcmFuc2l0aW9uLFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMgfSBmcm9tIFwiLi4vaG9va3MvdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zLnRzXCI7XG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuXG50eXBlIFVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnNBcmdzID0ge1xuICBidXN5OiBib29sZWFuO1xuICBtb2RhbE9wZW46IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xuICBhY3Rpb25Nb2RlPzogXCJkZWZhdWx0XCIgfCBcImRlbGV0ZV9vbmx5XCIgfCBcInZpZXdfb25seVwiO1xuICBpc0xvY2tlZDogYm9vbGVhbjtcbiAgaXNFZGl0TG9ja2VkPzogYm9vbGVhbjtcbiAgaXNEZWxldGVMb2NrZWQ/OiBib29sZWFuO1xuICBwZXJtaXNzaW9uc1JlYWR5PzogYm9vbGVhbjtcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XG4gIGNhbkRlbGV0ZUV4cGVuc2U6IGJvb2xlYW47XG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVVcGRhdGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcbiAgb25TYXZlU3VjY2VzczogKCkgPT4gdm9pZDtcbiAgb25EZWxldGVTdWNjZXNzPzogKCkgPT4gdm9pZDtcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcbiAgfSkgPT4gdm9pZDtcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gQ29vcmRpbmF0ZXMgdG9wYmFyIGljb24gc3RhdGUgYW5kIGRpc3BhdGNoIGFjdGlvbnMgZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMgPSAoe1xuICBidXN5LFxuICBtb2RhbE9wZW4sXG4gIGlzRWRpdGluZyxcbiAgaXNDcmVhdGVNb2RlLFxuICBhY3Rpb25Nb2RlID0gXCJkZWZhdWx0XCIsXG4gIGlzTG9ja2VkLFxuICBpc0VkaXRMb2NrZWQsXG4gIGlzRGVsZXRlTG9ja2VkLFxuICBwZXJtaXNzaW9uc1JlYWR5ID0gdHJ1ZSxcbiAgY2FuRWRpdEV4cGVuc2UsXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXG4gIGNhbkRlbGV0ZUV4cGVuc2UsXG4gIHNldE1vZGFsRXJyb3IsXG4gIGhhbmRsZUVuYWJsZUVkaXQsXG4gIGhhbmRsZUNhbmNlbEVkaXQsXG4gIGhhbmRsZVVwZGF0ZSxcbiAgaGFuZGxlRGVsZXRlLFxuICBvblNhdmVTdWNjZXNzLFxuICBvbkRlbGV0ZVN1Y2Nlc3MsXG4gIG9wZW5Db25maXJtLFxuICBjbG9zZUNvbmZpcm0sXG59OiBVc2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zQXJncykgPT4ge1xuICB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMoe1xuICAgIGFjdGlvbkdyb3VwSWQ6IFwiZXhwZW5zZS1zaGVldC1kZXRhaWwtYWN0aW9uc1wiLFxuICAgIGlkczoge1xuICAgICAgZWRpdEljb25JZDogXCJleHBlbnNlRWRpdEljb25cIixcbiAgICAgIHNhdmVJY29uSWQ6IFwiZXhwZW5zZVNhdmVJY29uXCIsXG4gICAgICBkZWxldGVCdG5JZDogXCJleHBlbnNlRGVsZXRlQnRuXCIsXG4gICAgICBjYW5jZWxCdG5JZDogXCJleHBlbnNlQ2FuY2VsQnRuXCIsXG4gICAgfSxcbiAgICBldmVudHM6IHtcbiAgICAgIGVkaXRFdmVudDogXCJleHBlbnNlLWRldGFpbC1lZGl0XCIsXG4gICAgICBkZWxldGVFdmVudDogXCJleHBlbnNlLWRldGFpbC1kZWxldGVcIixcbiAgICAgIGNhbmNlbEV2ZW50OiBcImV4cGVuc2UtZGV0YWlsLWNhbmNlbC1lZGl0XCIsXG4gICAgfSxcbiAgICBidXN5LFxuICAgIG1vZGFsT3BlbixcbiAgICBpc0VkaXRpbmcsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIGlzTG9ja2VkLFxuICAgIGFjdGlvbk1vZGUsXG4gICAgaXNFZGl0TG9ja2VkLFxuICAgIGlzRGVsZXRlTG9ja2VkLFxuICAgIGFsbG93Q3JlYXRlTW9kZUFjdGlvbnNXaGVuTG9ja2VkOiB0cnVlLFxuICAgIHBlcm1pc3Npb25zUmVhZHksXG4gICAgY2FuQ3JlYXRlOiBjYW5DcmVhdGVFeHBlbnNlLFxuICAgIGNhbkVkaXQ6IGNhbkVkaXRFeHBlbnNlLFxuICAgIGNhbkRlbGV0ZTogY2FuRGVsZXRlRXhwZW5zZSxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVTYXZlOiBoYW5kbGVVcGRhdGUsXG4gICAgaGFuZGxlRGVsZXRlLFxuICAgIHNhdmVDb25maXJtVGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19UaXRsZVwiLCBcIlNhdmUgY2hhbmdlc1wiKSxcbiAgICBzYXZlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gc2F2ZSBjaGFuZ2VzP1wiKSxcbiAgICBzYXZlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIiksXG4gICAgZGVsZXRlQ29uZmlybVRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlU2hlZXRfVGl0bGVcIiwgXCJEZWxldGUgZXhwZW5zZSBzaGVldFwiKSxcbiAgICBkZWxldGVDb25maXJtTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZVNoZWV0X0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBleHBlbnNlIHNoZWV0P1wiKSxcbiAgICBkZWxldGVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJEZWxldGVcIiksXG4gICAgb25TYXZlU3VjY2VzcyxcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6IG9uRGVsZXRlU3VjY2VzcyB8fCAoKCkgPT4gbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL0V4cGVuc2VTaGVldHNcIikpLFxuICAgIG9wZW5Db25maXJtLFxuICAgIGNsb3NlQ29uZmlybSxcbiAgfSk7XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUge1xuICBFeHBlbnNlU2hlZXRIZWFkZXIsXG4gIEV4cGVuc2VTaGVldExpbmUsXG59IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7XG4gIGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsLFxuICBnZXRFeGNoYW5nZVJhdGUsXG4gIGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUsXG4gIG1hcEV4cGVuc2VTaGVldEhlYWRlcixcbiAgbWFwRXhwZW5zZVNoZWV0TGluZSxcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7XG4gIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCxcbiAgbmF2aWdhdGVUb0V4cGVuc2VVcmwsXG4gIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuaW1wb3J0IHsgaXNNYW5hZ2luZ090aGVyRXhwZW5zZVJlY29yZCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTWFuYWdlZFVzZXJTY29wZS50c1wiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhjaGFuZ2VSYXRlRW50cnlNb2RlQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBoYXNBc3NpZ25lZFZvdWNoZXIsIHBhcnNlRXhwZW5zZURhdGUsIHNhZmVUZXh0LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlciwgcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcbmltcG9ydCB7IHJlc29sdmVFeHBlbnNlU2hlZXREZXRhaWxQb2xpY3kgfSBmcm9tIFwiLi9leHBlbnNlU2hlZXREZXRhaWxQb2xpY3kudHNcIjtcblxuY29uc3QgRVhDSEFOR0VfUkFURV9ERUJPVU5DRV9NUyA9IDQwMDtcbmNvbnN0IEVYQ0hBTkdFX1JBVEVfUkVGRVJFTkNFX0FNT1VOVCA9IDEwMDtcbmNvbnN0IEVYQ0hBTkdFX1JBVEVfREVDSU1BTF9ESUdJVFMgPSA3O1xuY29uc3QgRVhQRU5TRV9TVEFUVVNfQVBQUk9WRUQgPSAyO1xuY29uc3QgRVhQRU5TRV9TVEFUVVNfUEFJRCA9IDQ7XG5cbi8vIE5vcm1hbGl6ZXMgZXhjaGFuZ2UtcmF0ZSBudW1iZXJzIGZvciBudW1lcmljIGlucHV0IGNvbnRyb2xzLlxuY29uc3QgZm9ybWF0RXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZSA9ICh2YWx1ZTogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcih2YWx1ZSwge1xuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IEVYQ0hBTkdFX1JBVEVfREVDSU1BTF9ESUdJVFMsXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgZmFsbGJhY2s6IFwiXCIsXG4gIH0pO1xufTtcblxuY29uc3QgYnVpbGRDcmVhdGVIZWFkZXJEcmFmdCA9ICgpOiBFeHBlbnNlU2hlZXRIZWFkZXIgPT4ge1xuICByZXR1cm4ge1xuICAgIGhvamFHYXN0b3NJZDogXCJcIixcbiAgICBkZXNjcmlwdGlvbjogXCJcIixcbiAgICBwcm9qSWQ6IFwiXCIsXG4gICAgY3VycmVuY3lDb2RlOiBcIlwiLFxuICAgIHRvdGFsQW1vdW50OiBudWxsLFxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogMCxcbiAgICBleGNoYW5nZVJhdGVNb2RlOiAwLFxuICAgIGNyZWF0ZWREYXRlOiBcIlwiLFxuICAgIGV4Y2hSYXRlOiBcIjFcIixcbiAgfTtcbn07XG5cbmNvbnN0IHNob3VsZFNob3dFeGNoYW5nZVJhdGUgPSAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICBpZiAoIXZhbHVlKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dCh2YWx1ZSk7XG4gIGlmIChwYXJzZWQgPT09IG51bGwpIHJldHVybiB0cnVlO1xuICByZXR1cm4gTWF0aC5hYnMocGFyc2VkKSA+IDA7XG59O1xuXG50eXBlIFVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlQXJncyA9IHtcbiAgaGFzQWNjZXNzOiBib29sZWFuO1xuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xuICBjYW5NYW5hZ2VPdGhlclVzZXJzOiBib29sZWFuO1xuICBjdXJyZW50QXhVc2VySWQ6IHN0cmluZztcbiAgY3VycmVudENybVVzZXJJZDogc3RyaW5nO1xuICBzZWxlY3RlZE1hbmFnZWRVc2VySWQ6IHN0cmluZztcbiAgc2hlZXRJZDogc3RyaW5nO1xuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gT3ducyBzdGF0ZSBhbmQgYmVoYXZpb3IgZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsIHBhZ2UgKHJlYWQsIGVkaXQsIGNyZWF0ZSkuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUgPSAoe1xuICBoYXNBY2Nlc3MsXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXG4gIGFsbG93U2VsZk1hbmFnZW1lbnQsXG4gIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gIGN1cnJlbnRBeFVzZXJJZCxcbiAgY3VycmVudENybVVzZXJJZCxcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICBzaGVldElkLFxuICBpc0NyZWF0ZU1vZGUsXG4gIG9uRm9yYmlkZGVuLFxufTogVXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGVBcmdzKSA9PiB7XG4gIGNvbnN0IFtoZWFkZXIsIHNldEhlYWRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRIZWFkZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2xpbmVzLCBzZXRMaW5lc10gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRMaW5lW10+KFtdKTtcbiAgY29uc3QgW2xpbmVQYWdlLCBzZXRMaW5lUGFnZV0gPSB1c2VTdGF0ZSgxKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2lzRWRpdGluZywgc2V0SXNFZGl0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW21vZGFsRXJyb3IsIHNldE1vZGFsRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdERlc2NyaXB0aW9uLCBzZXREcmFmdERlc2NyaXB0aW9uXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRQcm9qZWN0SWQsIHNldERyYWZ0UHJvamVjdElkXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRDdXJyZW5jeUNvZGUsIHNldERyYWZ0Q3VycmVuY3lDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRFeGNoYW5nZVJhdGUsIHNldERyYWZ0RXhjaGFuZ2VSYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRFc3RhZG9Db21lbnRhcmlvcywgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvc10gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RlZmF1bHRDdXJyZW5jeUNvZGUsIHNldERlZmF1bHRDdXJyZW5jeUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtpc0V4Y2hhbmdlUmF0ZUxvYWRpbmcsIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtleGNoYW5nZVJhdGVNZXNzYWdlLCBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IsIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW29mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlLCBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLCBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSwgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2VdID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgY29uc3QgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciA9IHVzZUNhbGxiYWNrKChuZXh0SGVhZGVyOiBFeHBlbnNlU2hlZXRIZWFkZXIgfCBudWxsKSA9PiB7XG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbihzYWZlVGV4dChuZXh0SGVhZGVyPy5kZXNjcmlwdGlvbikpO1xuICAgIHNldERyYWZ0UHJvamVjdElkKHNhZmVUZXh0KG5leHRIZWFkZXI/LnByb2pJZCkpO1xuICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlKHNhZmVUZXh0KG5leHRIZWFkZXI/LmN1cnJlbmN5Q29kZSkpO1xuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlKFxuICAgICAgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKG5leHRIZWFkZXI/LmV4Y2hSYXRlLCB7XG4gICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcbiAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxuICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICAgICAgZmFsbGJhY2s6IFwiXCIsXG4gICAgICB9KVxuICAgICk7XG4gICAgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvcyhzYWZlVGV4dChuZXh0SGVhZGVyPy5lc3RhZG9Db21lbnRhcmlvcykpO1xuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBsb2FkRGV0YWlsID0gYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKCFoYXNBY2Nlc3MpIHtcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSkge1xuICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZHJhZnRIZWFkZXIgPSBidWlsZENyZWF0ZUhlYWRlckRyYWZ0KCk7XG4gICAgICAgIHNldEhlYWRlcihkcmFmdEhlYWRlcik7XG4gICAgICAgIHNldExpbmVzKFtdKTtcbiAgICAgICAgc2V0TGluZVBhZ2UoMSk7XG4gICAgICAgIHNldElzRWRpdGluZyh0cnVlKTtcbiAgICAgICAgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlcihkcmFmdEhlYWRlcik7XG4gICAgICAgIHNldFN0YXR1cyhcIlwiKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghc2hlZXRJZCkge1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IHdhcyBub3QgZm91bmQuXCIpKTtcbiAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgICBzZXRMaW5lcyhbXSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsKHNoZWV0SWQsIHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZT8uTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0IGRldGFpbC5cIikpO1xuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgICBzZXRMaW5lcyhbXSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2hlZXRzID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRTaGVldCA9XG4gICAgICAgICAgc2hlZXRzLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeT8uSG9qYUdhc3Rvc0lkKS50b1VwcGVyQ2FzZSgpID09PSBzaGVldElkLnRyaW0oKS50b1VwcGVyQ2FzZSgpKSB8fCBzaGVldHNbMF07XG5cbiAgICAgICAgaWYgKCFzZWxlY3RlZFNoZWV0KSB7XG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCB3YXMgbm90IGZvdW5kLlwiKSk7XG4gICAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgICAgIHNldExpbmVzKFtdKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXh0SGVhZGVyID0gbWFwRXhwZW5zZVNoZWV0SGVhZGVyKHNlbGVjdGVkU2hlZXQpO1xuICAgICAgICBjb25zdCBuZXh0TGluZXMgPSAoQXJyYXkuaXNBcnJheShzZWxlY3RlZFNoZWV0LkxpbmVzKSA/IHNlbGVjdGVkU2hlZXQuTGluZXMgOiBbXSkubWFwKChlbnRyeSkgPT5cbiAgICAgICAgICBtYXBFeHBlbnNlU2hlZXRMaW5lKGVudHJ5KVxuICAgICAgICApO1xuICAgICAgICBzZXRIZWFkZXIobmV4dEhlYWRlcik7XG4gICAgICAgIHNldExpbmVzKG5leHRMaW5lcyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoXG4gICAgICAgICAgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0IGRldGFpbC5cIilcbiAgICAgICAgKTtcbiAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgICBzZXRMaW5lcyhbXSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2b2lkIGxvYWREZXRhaWwoKTtcbiAgfSwgW2NhbkNyZWF0ZUV4cGVuc2UsIGhhc0FjY2VzcywgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNDcmVhdGVNb2RlLCBvbkZvcmJpZGRlbiwgc2hlZXRJZF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFoZWFkZXIgfHwgaXNFZGl0aW5nKSByZXR1cm47XG4gICAgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlcihoZWFkZXIpO1xuICB9LCBbaGVhZGVyLCBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyLCBpc0VkaXRpbmddKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaGFzQWNjZXNzKSByZXR1cm47XG4gICAgbGV0IGlzQ2FuY2VsbGVkID0gZmFsc2U7XG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICAgIGNvbnN0IGxvYWREZWZhdWx0Q3VycmVuY3lDb2RlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY29kZSA9IGF3YWl0IGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUoe1xuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgc2V0RGVmYXVsdEN1cnJlbmN5Q29kZShzYWZlVGV4dChjb2RlKS50b1VwcGVyQ2FzZSgpKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSBcIkFib3J0RXJyb3JcIikgcmV0dXJuO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2b2lkIGxvYWREZWZhdWx0Q3VycmVuY3lDb2RlKCk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlzQ2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgIGNvbnRyb2xsZXIuYWJvcnQoKTtcbiAgICB9O1xuICB9LCBbaGFzQWNjZXNzXSk7XG5cbiAgY29uc3QgaGFzQWN0aXZlUHJvY2VzcyA9IHVzZU1lbW8oKCkgPT4gYnVzeSB8fCBpc0VkaXRpbmcsIFtidXN5LCBpc0VkaXRpbmddKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKGhhc0FjdGl2ZVByb2Nlc3MpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcbiAgICB9O1xuICB9LCBbaGFzQWN0aXZlUHJvY2Vzc10pO1xuXG4gIGNvbnN0IHByb2plY3RWYWx1ZSA9IHNhZmVUZXh0KGhlYWRlcj8ucHJvaklkKTtcbiAgY29uc3Qgc3RhdHVzQ29kZSA9IHR5cGVvZiBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgOiBudWxsO1xuICBjb25zdCBpc1NoZWV0QXBwcm92ZWQgPSBzdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19BUFBST1ZFRDtcbiAgY29uc3QgaXNTaGVldFBhaWRCeVN0YXR1cyA9IHN0YXR1c0NvZGUgPT09IEVYUEVOU0VfU1RBVFVTX1BBSUQ7XG4gIGNvbnN0IGlzU2hlZXRQYWlkQnlWb3VjaGVyID0gaGFzQXNzaWduZWRWb3VjaGVyKGhlYWRlcj8udm91Y2hlcik7XG4gIGNvbnN0IGlzU2hlZXRQYWlkID0gaXNTaGVldFBhaWRCeVN0YXR1cyB8fCBpc1NoZWV0UGFpZEJ5Vm91Y2hlcjtcbiAgY29uc3QgaXNNYW5hZ2luZ090aGVyVXNlciA9IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VSZWNvcmQoe1xuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gICAgY3VycmVudEF4VXNlcklkLFxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxuICAgIHJlY29yZE93bmVyVXNlcklkOiBoZWFkZXI/LnVzZXJJZCxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gIH0pO1xuICBjb25zdCBkZXRhaWxQb2xpY3kgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpbnRlcmFjdGlvbk1vZGU6IFwiZnVsbF9lZGl0XCIgYXMgY29uc3QsXG4gICAgICAgIHNob3dGYWI6IGZhbHNlLFxuICAgICAgICBjYW5EZWxldGVTaGVldDogZmFsc2UsXG4gICAgICAgIHN0YXR1c0FjdGlvbnM6IFtdLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzb2x2ZUV4cGVuc2VTaGVldERldGFpbFBvbGljeSh7XG4gICAgICBzdGF0dXNDb2RlLFxuICAgICAgaXNNYW5hZ2luZ090aGVyVXNlcixcbiAgICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXG4gICAgICBpc1BhaWQ6IGlzU2hlZXRQYWlkLFxuICAgIH0pO1xuICB9LCBbYWxsb3dTZWxmTWFuYWdlbWVudCwgaXNDcmVhdGVNb2RlLCBpc01hbmFnaW5nT3RoZXJVc2VyLCBpc1NoZWV0UGFpZCwgc3RhdHVzQ29kZV0pO1xuICBjb25zdCBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCA9IGlzQ3JlYXRlTW9kZSB8fCAoIWlzTWFuYWdpbmdPdGhlclVzZXIgJiYgZGV0YWlsUG9saWN5LmludGVyYWN0aW9uTW9kZSA9PT0gXCJmdWxsX2VkaXRcIik7XG4gIGNvbnN0IGNhbkVkaXRTdGF0dXNDb21tZW50Q3VycmVudCA9ICFpc0NyZWF0ZU1vZGUgJiYgZGV0YWlsUG9saWN5LmludGVyYWN0aW9uTW9kZSA9PT0gXCJjb21tZW50X29ubHlfZWRpdFwiO1xuICBjb25zdCBjYW5FZGl0QW55Q3VycmVudCA9IChpc0NyZWF0ZU1vZGUgJiYgY2FuQ3JlYXRlRXhwZW5zZSkgfHwgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQgfHwgY2FuRWRpdFN0YXR1c0NvbW1lbnRDdXJyZW50O1xuICBjb25zdCBjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzID0gIWlzQ3JlYXRlTW9kZSAmJiBkZXRhaWxQb2xpY3kuaW50ZXJhY3Rpb25Nb2RlID09PSBcImZ1bGxfZWRpdFwiO1xuICBjb25zdCBpc1NoZWV0TG9ja2VkID0gaXNTaGVldEFwcHJvdmVkIHx8IGlzU2hlZXRQYWlkO1xuICBjb25zdCBoYXNMaW5lcyA9IGxpbmVzLmxlbmd0aCA+IDA7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZVZhbHVlID0gZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKHNhZmVUZXh0KGhlYWRlcj8uZXhjaFJhdGUpLCB7XG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICBmYWxsYmFjazogXCJcIixcbiAgfSk7XG4gIGNvbnN0IHNob3dFeGNoYW5nZVJhdGUgPSB1c2VNZW1vKCgpID0+IHNob3VsZFNob3dFeGNoYW5nZVJhdGUoZXhjaGFuZ2VSYXRlVmFsdWUpLCBbZXhjaGFuZ2VSYXRlVmFsdWVdKTtcbiAgY29uc3Qgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgPSB1c2VNZW1vKCgpID0+IGRyYWZ0Q3VycmVuY3lDb2RlLnRyaW0oKS50b1VwcGVyQ2FzZSgpLCBbZHJhZnRDdXJyZW5jeUNvZGVdKTtcbiAgY29uc3Qgbm9ybWFsaXplZERlZmF1bHRDdXJyZW5jeSA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQoZGVmYXVsdEN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSwgW2RlZmF1bHRDdXJyZW5jeUNvZGVdKTtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5ID0gbm9ybWFsaXplZERlZmF1bHRDdXJyZW5jeSB8fCBcIkVVUlwiO1xuICBjb25zdCB1aUxvY2FsZSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBcImVzLUVTXCI7XG4gICAgcmV0dXJuIHNhZmVUZXh0KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudD8ubGFuZykgfHwgXCJlcy1FU1wiO1xuICB9LCBbXSk7XG4gIGNvbnN0IGZvcm1FeGNoYW5nZURhdGUgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBwYXJzZWREYXRlID0gcGFyc2VFeHBlbnNlRGF0ZShzYWZlVGV4dChoZWFkZXI/LmNyZWF0ZWREYXRlKSk7XG4gICAgaWYgKHBhcnNlZERhdGUpIHJldHVybiB0b0lzb0RhdGUocGFyc2VkRGF0ZSk7XG4gICAgcmV0dXJuIHRvSXNvRGF0ZShuZXcgRGF0ZSgpKTtcbiAgfSwgW2hlYWRlcj8uY3JlYXRlZERhdGVdKTtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlUmVxdWlyZWQgPVxuICAgIGlzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCAmJiBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSAhPT0gXCJcIiAmJiBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSAhPT0gZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5O1xuICBjb25zdCBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSA9XG4gICAgZXhjaGFuZ2VSYXRlUmVxdWlyZWQgJiYgIWRyYWZ0RXhjaGFuZ2VSYXRlLnRyaW0oKVxuICAgICAgPyBpbmRUKFxuICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0V4Y2hhbmdlUmF0ZVJlcXVpcmVkXCIsXG4gICAgICAgICAgXCJFeGNoYW5nZSByYXRlIGlzIHJlcXVpcmVkIHdoZW4gY3VycmVuY3kgaXMgZGlmZmVyZW50IGZyb20gYmFzZSBjdXJyZW5jeS5cIlxuICAgICAgICApXG4gICAgICA6IFwiXCI7XG4gIC8vIEN1cnJlbmN5IHR5cGUgY2FuIGJlIGVkaXRlZCB3aGVuZXZlciB0aGUgc2hlZXQgaXRzZWxmIGlzIGVkaXRhYmxlIChub3QgYXBwcm92ZWQvcGFpZCkuXG4gIGNvbnN0IGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzID0gZmFsc2U7XG4gIGNvbnN0IGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyA9IGlzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCAmJiBoYXNMaW5lcyAmJiBzaG93RXhjaGFuZ2VSYXRlO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGlzQ2FuY2VsbGVkID0gZmFsc2U7XG4gICAgbGV0IHJlcXVlc3RUaW1lcjogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4gfCBudWxsID0gbnVsbDtcbiAgICBsZXQgcmVxdWVzdEFib3J0Q29udHJvbGxlcjogQWJvcnRDb250cm9sbGVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICBjb25zdCBjbGVhclJlcXVlc3RBcnRpZmFjdHMgPSAoKSA9PiB7XG4gICAgICBpZiAocmVxdWVzdFRpbWVyKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChyZXF1ZXN0VGltZXIpO1xuICAgICAgICByZXF1ZXN0VGltZXIgPSBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKHJlcXVlc3RBYm9ydENvbnRyb2xsZXIpIHtcbiAgICAgICAgcmVxdWVzdEFib3J0Q29udHJvbGxlci5hYm9ydCgpO1xuICAgICAgICByZXF1ZXN0QWJvcnRDb250cm9sbGVyID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKCFpc0VkaXRpbmcgfHwgIWNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50IHx8IGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcykge1xuICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKGZhbHNlKTtcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXCJcIik7XG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICghbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgfHwgIWV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSkge1xuICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKGZhbHNlKTtcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXCJcIik7XG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChub3JtYWxpemVkRHJhZnRDdXJyZW5jeSA9PT0gZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5KSB7XG4gICAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZShcIjFcIik7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiMVwiKTtcbiAgICAgIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZyhmYWxzZSk7XG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFwiXCIpO1xuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJlcXVlc3RUaW1lciA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgcmVxdWVzdEFib3J0Q29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXCJcIik7XG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldEV4Y2hhbmdlUmF0ZShcbiAgICAgICAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcbiAgICAgICAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXG4gICAgICAgICAgZm9ybUV4Y2hhbmdlRGF0ZSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHNpZ25hbDogcmVxdWVzdEFib3J0Q29udHJvbGxlci5zaWduYWwsXG4gICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2VzcyB8fCAhcmVzcG9uc2UuRGF0YSB8fCAhTnVtYmVyLmlzRmluaXRlKE51bWJlcihyZXNwb25zZS5EYXRhLlJhdGUpKSkge1xuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xuICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXG4gICAgICAgICAgICBzYWZlVGV4dChyZXNwb25zZS5NZXNzYWdlKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvZmZpY2lhbFJhdGVSYXcgPSBOdW1iZXIocmVzcG9uc2UuRGF0YS5SYXRlKTtcbiAgICAgICAgY29uc3Qgb2ZmaWNpYWxSYXRlRm9yQW1vdW50MTAwID0gb2ZmaWNpYWxSYXRlUmF3ICogRVhDSEFOR0VfUkFURV9SRUZFUkVOQ0VfQU1PVU5UO1xuICAgICAgICBjb25zdCBuZXh0RXhjaGFuZ2VSYXRlVmFsdWUgPSBmb3JtYXRFeGNoYW5nZVJhdGVJbnB1dFZhbHVlKG9mZmljaWFsUmF0ZUZvckFtb3VudDEwMCk7XG4gICAgICAgIGNvbnN0IG9mZmljaWFsUmF0ZVJhd1ZhbHVlID0gZm9ybWF0RXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZShvZmZpY2lhbFJhdGVSYXcpO1xuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKG5leHRFeGNoYW5nZVJhdGVWYWx1ZSk7XG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUob2ZmaWNpYWxSYXRlUmF3VmFsdWUpO1xuICAgICAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZShuZXh0RXhjaGFuZ2VSYXRlVmFsdWUpO1xuXG4gICAgICAgIGNvbnN0IGVmZmVjdGl2ZVJhdGVEYXRlID0gc2FmZVRleHQocmVzcG9uc2UuRGF0YS5EYXRlKSB8fCBmb3JtRXhjaGFuZ2VEYXRlO1xuICAgICAgICBjb25zdCBzb3VyY2UgPSBzYWZlVGV4dChyZXNwb25zZS5EYXRhLlNvdXJjZSk7XG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShlZmZlY3RpdmVSYXRlRGF0ZSk7XG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKHNvdXJjZSk7XG4gICAgICAgIGNvbnN0IG9mZmljaWFsTGFiZWwgPSBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsKDApIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX09mZmljaWFsXCIsIFwiVC5DLiBPZmljaWFsXCIpO1xuICAgICAgICBjb25zdCBsb2NhbGl6ZWRSYXRlRGF0ZSA9IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShlZmZlY3RpdmVSYXRlRGF0ZSwgdWlMb2NhbGUpIHx8IGVmZmVjdGl2ZVJhdGVEYXRlO1xuICAgICAgICBjb25zdCBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZSA9IHNvdXJjZSA/IGAke29mZmljaWFsTGFiZWx9ICR7bG9jYWxpemVkUmF0ZURhdGV9ICgke3NvdXJjZX0pYCA6IGAke29mZmljaWFsTGFiZWx9ICR7bG9jYWxpemVkUmF0ZURhdGV9YDtcbiAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShvZmZpY2lhbFJhdGVSYXdWYWx1ZSA/IGAke2V4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlfSAtICR7b2ZmaWNpYWxSYXRlUmF3VmFsdWV9YCA6IGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlKTtcbiAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSBcIkFib3J0RXJyb3JcIikgcmV0dXJuO1xuXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XG4gICAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9Ob3RGb3VuZFwiLCBcIk5vIGhheSB0aXBvIGRlIGNhbWJpbyBwYXJhIGxhIGZlY2hhXCIpKTtcbiAgICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQyMiB8fCBlcnJvci5zdGF0dXMgPT09IDUwMCkge1xuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcbiAgICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXG4gICAgICAgICAgICAgIHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9VbmF2YWlsYWJsZVwiLCBcIk5vIHNlIHB1ZG8gb2J0ZW5lciBlbCB0aXBvIGRlIGNhbWJpby5cIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xuICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXG4gICAgICAgICAgICBzYWZlVGV4dChlcnJvci5tZXNzYWdlKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xuICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9VbmF2YWlsYWJsZVwiLCBcIk5vIHNlIHB1ZG8gb2J0ZW5lciBlbCB0aXBvIGRlIGNhbWJpby5cIikpO1xuICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmICghaXNDYW5jZWxsZWQpIHtcbiAgICAgICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgRVhDSEFOR0VfUkFURV9ERUJPVU5DRV9NUyk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaXNDYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XG4gICAgfTtcbiAgfSwgW1xuICAgIGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50LFxuICAgIGZvcm1FeGNoYW5nZURhdGUsXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxuICAgIGlzRWRpdGluZyxcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXG4gICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXG4gICAgdWlMb2NhbGUsXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXG4gIF0pO1xuXG4gIGNvbnN0IGhhbmRsZUVuYWJsZUVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGlzQ3JlYXRlTW9kZSB8fCBpc0xvYWRpbmcgfHwgIWhlYWRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghY2FuRWRpdEFueUN1cnJlbnQpIHtcbiAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XG4gICAgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlcihoZWFkZXIpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRWRpdGluZ0VuYWJsZWRcIiwgXCJFZGl0aW5nIGVuYWJsZWRcIikpO1xuICB9LCBbY2FuRWRpdEFueUN1cnJlbnQsIGhlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNDcmVhdGVNb2RlLCBpc0xvYWRpbmcsIG9uRm9yYmlkZGVuXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvRXhwZW5zZVNoZWV0c1wiLCB7XG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghaXNFZGl0aW5nKSByZXR1cm47XG5cbiAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlcihoZWFkZXIpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKSk7XG4gIH0sIFtoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIsIGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nXSk7XG5cbiAgLy8gT3BlbnMgZXhwZW5zZSBzaGVldCBjcmVhdGUgbW9kZSBmcm9tIGxpc3QtbGV2ZWwgZW50cnkgcG9pbnRzLlxuICBjb25zdCBoYW5kbGVPcGVuQ3JlYXRlU2hlZXRNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSkge1xuICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9tb2RlPWNyZWF0ZVwiLCB7XG4gICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcbiAgICB9KTtcbiAgfSwgW2NhbkNyZWF0ZUV4cGVuc2UsIGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nLCBvbkZvcmJpZGRlbl0pO1xuXG4gIC8vIE9wZW5zIGV4cGVuc2UgbGluZSBjcmVhdGUgbW9kZSBmcm9tIGFuIGV4aXN0aW5nIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlxuICBjb25zdCBoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFzaGVldElkIHx8ICFjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzKSB7XG4gICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXRMaW5lRGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzaGVldElkKX0mbW9kZT1jcmVhdGVgO1xuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCwge1xuICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXG4gICAgfSk7XG4gIH0sIFtjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcblxuICAvLyBPcGVucyB0aWNrZXRzIHBhZ2UgZnJvbSBleHBlbnNlIHNoZWV0IGNvbnRleHQgdG8gY3JlYXRlIG9yIGxpbmsgdGlja2V0cy5cbiAgY29uc3Qgb3BlblRpY2tldHNGcm9tU2hlZXQgPSB1c2VDYWxsYmFjayhcbiAgICAoYWN0aW9uOiBcIm5ld1wiIHwgXCJsaW5rXCIpID0+IHtcbiAgICAgIGlmICghc2hlZXRJZCB8fCAhY2FuVXNlRnVsbEVkaXRGZWF0dXJlcykge1xuICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xuICAgICAgICBhY3Rpb24sXG4gICAgICAgIGhvamFHYXN0b3NJZDogc2hlZXRJZCxcbiAgICAgIH0pO1xuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0cz8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xuICAgICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW2NhblVzZUZ1bGxFZGl0RmVhdHVyZXMsIGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nLCBvbkZvcmJpZGRlbiwgc2hlZXRJZF1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVPcGVuQ3JlYXRlVGlja2V0TW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBvcGVuVGlja2V0c0Zyb21TaGVldChcIm5ld1wiKTtcbiAgfSwgW29wZW5UaWNrZXRzRnJvbVNoZWV0XSk7XG5cbiAgY29uc3QgaGFuZGxlT3BlbkxpbmtUaWNrZXRNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIG9wZW5UaWNrZXRzRnJvbVNoZWV0KFwibGlua1wiKTtcbiAgfSwgW29wZW5UaWNrZXRzRnJvbVNoZWV0XSk7XG5cbiAgY29uc3QgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldCA9IHVzZUNhbGxiYWNrKChjcmVhdGVkU2hlZXRJZDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3Qgc2FmZUNyZWF0ZWRTaGVldElkID0gc2FmZVRleHQoY3JlYXRlZFNoZWV0SWQpO1xuICAgIGlmICghc2FmZUNyZWF0ZWRTaGVldElkKSByZXR1cm47XG5cbiAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVDcmVhdGVkU2hlZXRJZCl9YDtcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgbmF2aWdhdGVUb0xpbmVEZXRhaWwgPSB1c2VDYWxsYmFjayhcbiAgICAobGluZVJlY0lkOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IHNhZmVMaW5lSWQgPSBzYWZlVGV4dChsaW5lUmVjSWQpO1xuICAgICAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChzaGVldElkKTtcbiAgICAgIGlmICghc2FmZUxpbmVJZCB8fCAhc2FmZVNoZWV0SWQpIHJldHVybjtcblxuICAgICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0TGluZURldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZVNoZWV0SWQpfSZsaW5lUmVjSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZUxpbmVJZCl9YDtcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCwge1xuICAgICAgICBhc2tDb25maXJtYXRpb246IHRydWUsXG4gICAgICAgIGJ5cGFzc0d1YXJkT25jZTogZmFsc2UsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtzaGVldElkXVxuICApO1xuXG4gIHJldHVybiB7XG4gICAgaGVhZGVyLFxuICAgIGxpbmVzLFxuICAgIGxpbmVQYWdlLFxuICAgIGlzTG9hZGluZyxcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgYnVzeSxcbiAgICBzdGF0dXMsXG4gICAgaXNFZGl0aW5nLFxuICAgIG1vZGFsRXJyb3IsXG4gICAgZHJhZnREZXNjcmlwdGlvbixcbiAgICBkcmFmdFByb2plY3RJZCxcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSxcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUsXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsXG4gICAgaXNFeGNoYW5nZVJhdGVMb2FkaW5nLFxuICAgIGV4Y2hhbmdlUmF0ZU1lc3NhZ2UsXG4gICAgZXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IsXG4gICAgcHJvamVjdFZhbHVlLFxuICAgIGlzU2hlZXRBcHByb3ZlZCxcbiAgICBpc1NoZWV0UGFpZCxcbiAgICBpc1NoZWV0TG9ja2VkLFxuICAgIGV4Y2hhbmdlUmF0ZVZhbHVlLFxuICAgIHNob3dFeGNoYW5nZVJhdGUsXG4gICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxuICAgIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudDogRVhDSEFOR0VfUkFURV9SRUZFUkVOQ0VfQU1PVU5ULFxuICAgIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlLFxuICAgIGRldGFpbFBvbGljeSxcbiAgICBpc01hbmFnaW5nT3RoZXJVc2VyLFxuICAgIGNhbkVkaXRTdGF0dXNDb21tZW50Q3VycmVudCxcbiAgICBjYW5FZGl0QW55Q3VycmVudCxcbiAgICBjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzLFxuICAgIGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50LFxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcbiAgICBzZXRMaW5lUGFnZSxcbiAgICBzZXRMaW5lcyxcbiAgICBzZXRCdXN5LFxuICAgIHNldFN0YXR1cyxcbiAgICBzZXRJc0VkaXRpbmcsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxuICAgIHNldERyYWZ0UHJvamVjdElkLFxuICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlLFxuICAgIHNldERyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxuICAgIGhhbmRsZU9wZW5DcmVhdGVTaGVldE1vZGUsXG4gICAgaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlLFxuICAgIGhhbmRsZU9wZW5DcmVhdGVUaWNrZXRNb2RlLFxuICAgIGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSxcbiAgICBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0LFxuICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsLFxuICB9O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBa0I7OztBQ0FsQixJQUFBQyxnQkFBa0I7OztBQ0FsQixtQkFBaUY7QUFDakYsdUJBQTZCO0FBeUdyQjtBQTdGUixJQUFNLHdCQUF3QixDQUFDO0FBQUEsRUFDN0I7QUFBQSxFQUNBO0FBQUEsRUFDQSxZQUFZO0FBQUEsRUFDWixpQkFBaUI7QUFDbkIsTUFBa0M7QUFDaEMsUUFBTSxnQ0FBZ0M7QUFDdEMsUUFBTSw4QkFBOEI7QUFDcEMsUUFBTSx1QkFBdUI7QUFDN0IsUUFBTSxnQkFBZ0I7QUFDdEIsUUFBTSxDQUFDLFFB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O0FBQUEsS0FDTjtBQUVKO0FBR0EsSUFBTSx5QkFBeUIsTUFBTTtBQUNuQyxTQUNFLDZDQUFDLGdDQUFxQix5QkFBdUIsTUFDM0MsdURBQUMsaUNBQThCLEdBQ2pDO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsUUFBTSxTQUFTLFNBQVMsZUFBZSwyQkFBMkI7QUFDbEUsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQywwQkFBdUIsQ0FBRTtBQUNyRDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8saUNBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlJlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgInJlc3BvbnNlIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlJlYWN0Il0KfQo=
