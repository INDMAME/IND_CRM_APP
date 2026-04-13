import {
  useExpenseSheetsFilterCache
} from "./chunks/chunk-F25XAZCL.js";
import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-IOPHGJXH.js";
import {
  ExpenseQuickTicketProgressOverlay_default,
  PageBottomActionButton,
  PageBottomActions_default,
  TICKET_IMAGE_ACCEPT_ATTRIBUTE,
  useExpenseSheetQuickTicketFlow
} from "./chunks/chunk-TQPUPGPG.js";
import {
  resolveExpenseSheetDetailPolicy
} from "./chunks/chunk-JXC4T3HC.js";
import {
  getExpenseStatusLabel
} from "./chunks/chunk-6IISIQEI.js";
import "./chunks/chunk-DYOWCOBG.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-LZSH3IN4.js";
import "./chunks/chunk-YMDESVRK.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseCurrencyFlagIcon_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-W7BHZPHM.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-S6U6GZC2.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-C2QA25S4.js";
import {
  useOutsideClick
} from "./chunks/chunk-OSBLOXTE.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-LGHRS62I.js";
import "./chunks/chunk-4BE3ZFCK.js";
import {
  isManagingOtherExpenseRecord,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-6S2OIB2U.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-ZHUOZUVW.js";
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
} from "./chunks/chunk-S4F4JMPK.js";
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
  toIsoDate,
  updateExpenseSheetHeader
} from "./chunks/chunk-RTMYDEOL.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-MYRRRBUI.js";
import "./chunks/chunk-7CXSZQJB.js";
import "./chunks/chunk-ZBKHPZJX.js";
import {
  canAccess,
  classNames,
  showPermissionModal
} from "./chunks/chunk-ZHH4AWW7.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunks/chunk-2NKOKBT5.js";
import {
  ApiFetchError,
  indFormat,
  indT
} from "./chunks/chunk-5TAE4PEJ.js";
import "./chunks/chunk-6HGCHSZG.js";
import {
  __toESM
} from "./chunks/chunk-W7NC74ZX.js";

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
  officialExchangeRateRawValue,
  officialExchangeRateDate,
  officialExchangeRateSource,
  onDraftDescriptionChange,
  onDraftProjectIdChange,
  onDraftCurrencyCodeChange,
  onDraftExchangeRateChange
}) => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("section", { className: "relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-[var(--radius-xl)]", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
    !isCreateMode ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      ExpenseReadOnlyField_default,
      {
        label: indT("ExpenseSheets_Field_SheetId", "Expense sheet code"),
        value: safeText(header.hojaGastosId) || "-"
      }
    ) : null,
    !isCreateMode ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_Status", "Status"), value: statusValue }) : null,
    showStatusCommentField ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
        onCancel,
        children: modalBody
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
    sourcePickerOpen ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/45 px-4 py-6", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "w-full max-w-sm rounded-[var(--radius-xl)] border border-slate-200 bg-white p-4 shadow-xl", children: [
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
        className: hasPartialTicketFailure ? "glass-panel shadow-card space-y-2 rounded-[var(--radius-xl)] border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900" : "glass-panel shadow-card space-y-2 rounded-[var(--radius-xl)] border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { children: quickTicketErrorMessage }),
          quickTicketAttemptId ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "p",
            {
              className: hasPartialTicketFailure ? "rounded-[var(--radius-xl)] border border-amber-200 bg-white px-2 py-1 font-mono text-[11px] text-amber-900 break-all" : "rounded-[var(--radius-xl)] border border-rose-200 bg-white px-2 py-1 font-mono text-[11px] text-rose-800 break-all",
              children: `attemptId: ${quickTicketAttemptId}`
            }
          ) : null,
          quickTicketTraceList.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "div",
            {
              className: hasPartialTicketFailure ? "rounded-[var(--radius-xl)] border border-amber-200 bg-white p-2 text-xs text-amber-800" : "rounded-[var(--radius-xl)] border border-rose-200 bg-white p-2 text-xs text-rose-700",
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
    (nextStatus, statusCommentOverride) => {
      const hasExplicitStatusCommentOverride = statusCommentOverride !== void 0;
      const normalizedCurrency = String(
        isCurrencyLockedByLines ? lockedCurrencyCode || draftCurrencyCode || "" : draftCurrencyCode || ""
      ).trim().toUpperCase();
      const normalizedDescription = String(draftDescription || "").trim();
      const normalizedProjectId = String(draftProjectId || "").trim();
      const normalizedEstadoComentarios = String(
        statusCommentOverride ?? draftEstadoComentarios ?? ""
      ).trim();
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
      const resolvedExchangeRate = canEditHeaderFields ? hasValidRate ? Number(parsedExchangeRate) : 1 : originalExchangeRate ?? parsedExchangeRate ?? 0;
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
          exchRate: resolvedExchangeRate,
          projId: normalizedProjectId || void 0,
          expenseSheetStatus: resolvedExpenseSheetStatus,
          exchangeRateMode: resolvedExchangeRateMode,
          // Preserve explicit empty status comments so the backend can clear the stored value.
          estadoComentarios: hasExplicitStatusCommentOverride ? normalizedEstadoComentarios : normalizedEstadoComentarios || void 0
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
  const [statusTransitionComment, setStatusTransitionComment] = (0, import_react5.useState)("");
  const [showStatusTransitionCommentField, setShowStatusTransitionCommentField] = (0, import_react5.useState)(false);
  const statusTransitionCommentRef = (0, import_react5.useRef)("");
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
  const resetStatusTransitionDialog = (0, import_react5.useCallback)(() => {
    statusTransitionCommentRef.current = "";
    setStatusTransitionComment("");
    setShowStatusTransitionCommentField(false);
  }, []);
  const handleCloseConfirm = (0, import_react5.useCallback)(() => {
    resetStatusTransitionDialog();
    closeConfirm();
  }, [closeConfirm, resetStatusTransitionDialog]);
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
      handleCloseConfirm();
      return;
    }
    void handleModalConfirm();
  }, [busy, handleCloseConfirm, handleModalConfirm, modalError]);
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
  const handleOpenLineDetail = (0, import_react5.useCallback)(
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
  const rootEl = document.getElementById("expense-sheet-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ExpenseSheetDetailPage, {}));
};
mountWhenDocumentReady(mount);
var ExpenseSheetDetailPage_default = ExpenseSheetDetailPage;
export {
  ExpenseSheetDetailPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvRXhwZW5zZVNoZWV0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvbi50c3giLCAiLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9JbmZvUG9wb3Zlckljb25CdXR0b24udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29uc3RhbnRzL2V4Y2hhbmdlUmF0ZUVudHJ5TW9kZUNhdGFsb2cudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VTaGVldEhlYWRlckZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlTGluZXNUaW1lbGluZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC9FeHBlbnNlU2hlZXREZXRhaWxPdmVybGF5cy50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRyb2xsZXIudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC91c2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xyXG5pbXBvcnQgRmxvYXRpbmdBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VTaGVldEhlYWRlckZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0SGVhZGVyRm9ybS50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VMaW5lc1RpbWVsaW5lIGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VMaW5lc1RpbWVsaW5lLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyIGZyb20gXCIuL0V4cGVuc2VTaGVldFN0YXR1c0FjdGlvbkJhci50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzIGZyb20gXCIuL0V4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzLnRzeFwiO1xyXG5pbXBvcnQgeyBib290c3RyYXBFeHBlbnNlQXBpQXV0aCwgdXNlRXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRyb2xsZXIgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udHJvbGxlci50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZSB9IGZyb20gXCIuLi9saXN0L3VzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZS50c1wiO1xyXG5cclxuY29uc3QgREVUQUlMX0ZBQl9CT1RUT01fV0lUSF9BQ1RJT05fQkFSID0gMTc2O1xyXG5jb25zdCBFWFBFTlNFX1NIRUVUU19MSVNUX1VSTCA9IFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXRzXCI7XHJcblxyXG5jb25zdCBFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udGVudCA9ICgpID0+IHtcclxuICBjb25zdCBjb250cm9sbGVyID0gdXNlRXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRyb2xsZXIoKTtcclxuICBjb25zdCB7IHJlYWRDYWNoZWRTdGF0ZSwgc2F2ZUNhY2hlZFN0YXRlIH0gPSB1c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUoKTtcclxuXHJcbiAgY29uc3QgcmVhcm1FeHBlbnNlU2hlZXRzUmV0dXJuU3RhdGUgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBjYWNoZWRTdGF0ZSA9IHJlYWRDYWNoZWRTdGF0ZSgpO1xyXG4gICAgaWYgKCFjYWNoZWRTdGF0ZSkgcmV0dXJuO1xyXG4gICAgc2F2ZUNhY2hlZFN0YXRlKGNhY2hlZFN0YXRlKTtcclxuICB9LCBbcmVhZENhY2hlZFN0YXRlLCBzYXZlQ2FjaGVkU3RhdGVdKTtcclxuXHJcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGJhY2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbEJhY2tCdG5cIik7XHJcbiAgICBpZiAoIWJhY2tCdXR0b24pIHJldHVybjtcclxuXHJcbiAgICBiYWNrQnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtYmFjay11cmxcIiwgRVhQRU5TRV9TSEVFVFNfTElTVF9VUkwpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGJhY2tCdXR0b24ucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1iYWNrLXVybFwiKTtcclxuICAgIH07XHJcbiAgfSwgW10pO1xyXG5cclxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgaGFuZGxlTmF0aXZlQmFjayA9IChldmVudCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQ/LnN0YXRlICYmIGV2ZW50LnN0YXRlLmluZFRyYXAgPT09IHRydWUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGV4ZWN1dGVCYWNrTmF2aWdhdGlvbiA9ICgpID0+IHtcclxuICAgICAgICByZWFybUV4cGVuc2VTaGVldHNSZXR1cm5TdGF0ZSgpO1xyXG4gICAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKEVYUEVOU0VfU0hFRVRTX0xJU1RfVVJMKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIHdpbmRvdy5fX2luZFJlcXVlc3ROYXZpZ2F0aW9uKGV4ZWN1dGVCYWNrTmF2aWdhdGlvbik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBleGVjdXRlQmFja05hdmlnYXRpb24oKTtcclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBoYW5kbGVOYXRpdmVCYWNrKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgaGFuZGxlTmF0aXZlQmFjayk7XHJcbiAgICB9O1xyXG4gIH0sIFtyZWFybUV4cGVuc2VTaGVldHNSZXR1cm5TdGF0ZV0pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cclxuICAgICAgPEV4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzXHJcbiAgICAgICAgbW9kYWw9e2NvbnRyb2xsZXIubW9kYWx9XHJcbiAgICAgICAgbW9kYWxFcnJvcj17Y29udHJvbGxlci5tb2RhbEVycm9yfVxyXG4gICAgICAgIHN0YXR1cz17Y29udHJvbGxlci5zdGF0dXN9XHJcbiAgICAgICAgYnVzeT17Y29udHJvbGxlci5idXN5fVxyXG4gICAgICAgIGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZT17Y29udHJvbGxlci5pc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGV9XHJcbiAgICAgICAgbW9kYWxMb2FkaW5nVGV4dD17Y29udHJvbGxlci5tb2RhbExvYWRpbmdUZXh0fVxyXG4gICAgICAgIG1vZGFsQ2FuY2VsVGV4dD17Y29udHJvbGxlci5tb2RhbENhbmNlbFRleHR9XHJcbiAgICAgICAgbW9kYWxDb25maXJtVGV4dD17Y29udHJvbGxlci5tb2RhbENvbmZpcm1UZXh0fVxyXG4gICAgICAgIG1vZGFsQm9keT17Y29udHJvbGxlci5tb2RhbEJvZHl9XHJcbiAgICAgICAgY2FtZXJhSW5wdXRSZWY9e2NvbnRyb2xsZXIuY2FtZXJhSW5wdXRSZWZ9XHJcbiAgICAgICAgZ2FsbGVyeUlucHV0UmVmPXtjb250cm9sbGVyLmdhbGxlcnlJbnB1dFJlZn1cclxuICAgICAgICBzb3VyY2VQaWNrZXJPcGVuPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5zb3VyY2VQaWNrZXJPcGVufVxyXG4gICAgICAgIHF1aWNrVGlja2V0QnVzeT17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuYnVzeX1cclxuICAgICAgICBxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZT17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cucHJvZ3Jlc3NNZXNzYWdlfVxyXG4gICAgICAgIHF1aWNrVGlja2V0UHJvZ3Jlc3NTdGFnZXM9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnByb2dyZXNzU3RhZ2VzfVxyXG4gICAgICAgIHF1aWNrVGlja2V0RWxhcHNlZE1zPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5wcm9ncmVzc0VsYXBzZWRNc31cclxuICAgICAgICBxdWlja1RpY2tldEVycm9yTWVzc2FnZT17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuZXJyb3JNZXNzYWdlfVxyXG4gICAgICAgIHF1aWNrVGlja2V0QXR0ZW1wdElkPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5hdHRlbXB0SWR9XHJcbiAgICAgICAgcXVpY2tUaWNrZXRUcmFjZUxpc3Q9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnRyYWNlTGlzdH1cclxuICAgICAgICBoYXNQZW5kaW5nVXBsb2FkUmV0cnk9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93Lmhhc1BlbmRpbmdVcGxvYWRSZXRyeX1cclxuICAgICAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZT17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuaGFzUGFydGlhbFRpY2tldEZhaWx1cmV9XHJcbiAgICAgICAgb25Db25maXJtPXtjb250cm9sbGVyLmhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17Y29udHJvbGxlci5jbG9zZUNvbmZpcm19XHJcbiAgICAgICAgb25TZWxlY3RlZENhbWVyYUZpbGU9eyhmaWxlKSA9PiB7XHJcbiAgICAgICAgICB2b2lkIGNvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmhhbmRsZVNlbGVjdGVkRmlsZShmaWxlLCBcImNhbWVyYVwiKTtcclxuICAgICAgICB9fVxyXG4gICAgICAgIG9uU2VsZWN0ZWRHYWxsZXJ5RmlsZT17KGZpbGUpID0+IHtcclxuICAgICAgICAgIHZvaWQgY29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuaGFuZGxlU2VsZWN0ZWRGaWxlKGZpbGUsIFwiZ2FsbGVyeVwiKTtcclxuICAgICAgICB9fVxyXG4gICAgICAgIG9uU2VsZWN0RnJvbUNhbWVyYT17KCkgPT4ge1xyXG4gICAgICAgICAgdm9pZCBjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5zZWxlY3RGcm9tQ2FtZXJhKGNvbnRyb2xsZXIuY2FtZXJhSW5wdXRSZWYuY3VycmVudCk7XHJcbiAgICAgICAgfX1cclxuICAgICAgICBvblNlbGVjdEZyb21HYWxsZXJ5PXsoKSA9PiBjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5zZWxlY3RGcm9tR2FsbGVyeShjb250cm9sbGVyLmdhbGxlcnlJbnB1dFJlZi5jdXJyZW50KX1cclxuICAgICAgICBvbkNsb3NlU291cmNlUGlja2VyPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5jbG9zZVNvdXJjZVBpY2tlcn1cclxuICAgICAgICBvblJldHJ5UGVuZGluZ1VwbG9hZD17KCkgPT4ge1xyXG4gICAgICAgICAgdm9pZCBjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5yZXRyeVBlbmRpbmdVcGxvYWQoKTtcclxuICAgICAgICB9fVxyXG4gICAgICAgIG9uT3BlbkNyZWF0ZWRUaWNrZXQ9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93Lm9wZW5DcmVhdGVkVGlja2V0fVxyXG4gICAgICAgIG9uQ2xlYXJRdWlja1RpY2tldEVycm9yPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5jbGVhckVycm9yfVxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXHJcbiAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogY29udHJvbGxlci5pc0xvYWRpbmcgfHwgY29udHJvbGxlci5pc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XHJcbiAgICAgID5cclxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxyXG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAge2NvbnRyb2xsZXIuZXJyb3JNZXNzYWdlID8gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntjb250cm9sbGVyLmVycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxyXG5cclxuICAgICAgeyFjb250cm9sbGVyLmlzTG9hZGluZyAmJiAhY29udHJvbGxlci5pc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUgJiYgIWNvbnRyb2xsZXIuZXJyb3JNZXNzYWdlICYmIGNvbnRyb2xsZXIuaGVhZGVyID8gKFxyXG4gICAgICAgIDxFeHBlbnNlU2hlZXRIZWFkZXJGb3JtXHJcbiAgICAgICAgICBpc0NyZWF0ZU1vZGU9e2NvbnRyb2xsZXIuaXNDcmVhdGVNb2RlfVxyXG4gICAgICAgICAgaXNFZGl0aW5nPXtjb250cm9sbGVyLmlzRWRpdGluZ31cclxuICAgICAgICAgIGNhbkVkaXRIZWFkZXJGaWVsZHM9e2NvbnRyb2xsZXIuY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnR9XHJcbiAgICAgICAgICBzdGF0dXNDb21tZW50TW9kZT17Y29udHJvbGxlci5zdGF0dXNDb21tZW50TW9kZX1cclxuICAgICAgICAgIGhlYWRlcj17Y29udHJvbGxlci5oZWFkZXJ9XHJcbiAgICAgICAgICBwcm9qZWN0VmFsdWU9e2NvbnRyb2xsZXIucHJvamVjdFZhbHVlfVxyXG4gICAgICAgICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXM9e2NvbnRyb2xsZXIuaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXN9XHJcbiAgICAgICAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXM9e2NvbnRyb2xsZXIuaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzfVxyXG4gICAgICAgICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3k9e2NvbnRyb2xsZXIubm9ybWFsaXplZERyYWZ0Q3VycmVuY3l9XHJcbiAgICAgICAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k9e2NvbnRyb2xsZXIuZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5fVxyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50PXtjb250cm9sbGVyLmV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudH1cclxuICAgICAgICAgIHNob3dFeGNoYW5nZVJhdGU9e2NvbnRyb2xsZXIuc2hvd0V4Y2hhbmdlUmF0ZX1cclxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZVZhbHVlPXtjb250cm9sbGVyLmV4Y2hhbmdlUmF0ZVZhbHVlfVxyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2U9e2NvbnRyb2xsZXIuZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2V9XHJcbiAgICAgICAgICB0b3RhbEFtb3VudFRleHQ9e2NvbnRyb2xsZXIudG90YWxBbW91bnRUZXh0fVxyXG4gICAgICAgICAgZHJhZnREZXNjcmlwdGlvbj17Y29udHJvbGxlci5kcmFmdERlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgZHJhZnRQcm9qZWN0SWQ9e2NvbnRyb2xsZXIuZHJhZnRQcm9qZWN0SWR9XHJcbiAgICAgICAgICBkcmFmdEN1cnJlbmN5Q29kZT17Y29udHJvbGxlci5kcmFmdEN1cnJlbmN5Q29kZX1cclxuICAgICAgICAgIGRyYWZ0RXhjaGFuZ2VSYXRlPXtjb250cm9sbGVyLmRyYWZ0RXhjaGFuZ2VSYXRlfVxyXG4gICAgICAgICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZT17Y29udHJvbGxlci5vZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlfVxyXG4gICAgICAgICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlPXtjb250cm9sbGVyLm9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZX1cclxuICAgICAgICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlPXtjb250cm9sbGVyLm9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlfVxyXG4gICAgICAgICAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlPXtjb250cm9sbGVyLnNldERyYWZ0RGVzY3JpcHRpb259XHJcbiAgICAgICAgICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlPXtjb250cm9sbGVyLnNldERyYWZ0UHJvamVjdElkfVxyXG4gICAgICAgICAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZT17Y29udHJvbGxlci5zZXREcmFmdEN1cnJlbmN5Q29kZX1cclxuICAgICAgICAgIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2U9e2NvbnRyb2xsZXIuc2V0RHJhZnRFeGNoYW5nZVJhdGV9XHJcbiAgICAgICAgLz5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICB7IWNvbnRyb2xsZXIuaXNDcmVhdGVNb2RlICYmICFjb250cm9sbGVyLmlzTG9hZGluZyAmJiAhY29udHJvbGxlci5pc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUgJiYgIWNvbnRyb2xsZXIuZXJyb3JNZXNzYWdlID8gKFxyXG4gICAgICAgIDxFeHBlbnNlTGluZXNUaW1lbGluZVxyXG4gICAgICAgICAgdmlzaWJsZUxpbmVzPXtjb250cm9sbGVyLnZpc2libGVMaW5lc31cclxuICAgICAgICAgIGN1cnJlbmN5Q29kZT17c2FmZVRleHQoY29udHJvbGxlci5oZWFkZXI/LmN1cnJlbmN5Q29kZSl9XHJcbiAgICAgICAgICB0b3RhbExpbmVQYWdlcz17Y29udHJvbGxlci50b3RhbExpbmVQYWdlc31cclxuICAgICAgICAgIGxpbmVQYWdlPXtjb250cm9sbGVyLmxpbmVQYWdlfVxyXG4gICAgICAgICAgbGluZXNMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfTGluZXNcIiwgXCJMaW5lc1wiKX1cclxuICAgICAgICAgIGVtcHR5VGV4dD17aW5kVChcIkV4cGVuc2VTaGVldHNfTm9MaW5lc1wiLCBcIk5vIGxpbmVzIGZvciB0aGlzIGV4cGVuc2Ugc2hlZXQuXCIpfVxyXG4gICAgICAgICAgcGFnaW5hdGlvbkxhYmVscz17Y29udHJvbGxlci5wYWdpbmF0aW9uTGFiZWxzfVxyXG4gICAgICAgICAgY29udGFpbmVyUmVmPXtjb250cm9sbGVyLmxpbmVDb250YWluZXJSZWZ9XHJcbiAgICAgICAgICBvbkxpbmVQYWdlQ2hhbmdlPXtjb250cm9sbGVyLnNldExpbmVQYWdlfVxyXG4gICAgICAgICAgb25PcGVuTGluZT17Y29udHJvbGxlci5uYXZpZ2F0ZVRvTGluZURldGFpbH1cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHtjb250cm9sbGVyLnNob3dTdGF0dXNBY3Rpb25CYXIgPyAoXHJcbiAgICAgICAgPEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbkJhclxyXG4gICAgICAgICAgYWN0aW9ucz17Y29udHJvbGxlci5kZXRhaWxQb2xpY3kuc3RhdHVzQWN0aW9uc31cclxuICAgICAgICAgIGJ1c3k9e2NvbnRyb2xsZXIuYnVzeSB8fCBjb250cm9sbGVyLmlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZX1cclxuICAgICAgICAgIGRpc2FibGVkPXtjb250cm9sbGVyLmFyZVN0YXR1c0FjdGlvbnNEaXNhYmxlZH1cclxuICAgICAgICAgIG9uQWN0aW9uQ2xpY2s9e2NvbnRyb2xsZXIuaGFuZGxlU3RhdHVzQWN0aW9uQ2xpY2t9XHJcbiAgICAgICAgLz5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICB7Y29udHJvbGxlci5zaG93RmFiID8gKFxyXG4gICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxyXG4gICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfQWN0aW9uc1wiLCBcIkFjY2lvbmVzIHJcdTAwRTFwaWRhc1wiKX1cclxuICAgICAgICAgIHNpemU9ezc2fVxyXG4gICAgICAgICAgcmlnaHQ9ezE2fVxyXG4gICAgICAgICAgYm90dG9tPXtjb250cm9sbGVyLnNob3dTdGF0dXNBY3Rpb25CYXIgPyBERVRBSUxfRkFCX0JPVFRPTV9XSVRIX0FDVElPTl9CQVIgOiAyNH1cclxuICAgICAgICAgIG1lbnVBcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgclx1MDBFMXBpZGFzXCIpfVxyXG4gICAgICAgICAgbWVudUl0ZW1zPXtjb250cm9sbGVyLmZhYk1lbnVJdGVtc31cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlxyXG5jb25zdCBFeHBlbnNlU2hlZXREZXRhaWxQYWdlID0gKCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnMgZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQ+XHJcbiAgICAgIDxFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udGVudCAvPlxyXG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cclxuICApO1xyXG59O1xyXG5cclxuY29uc3QgbW91bnQgPSAoKSA9PiB7XHJcbiAgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGgoKTtcclxuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cGVuc2Utc2hlZXQtZGV0YWlsLXJvb3RcIik7XHJcbiAgaWYgKCFyb290RWwpIHJldHVybjtcclxuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPEV4cGVuc2VTaGVldERldGFpbFBhZ2UgLz4pO1xyXG59O1xyXG5cclxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXREZXRhaWxQYWdlO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IEluZm9Qb3BvdmVySWNvbkJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0luZm9Qb3BvdmVySWNvbkJ1dHRvbi50c3hcIjtcclxuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QgZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0LnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24udHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlUmVhZE9ubHlGaWVsZCBmcm9tIFwiLi9FeHBlbnNlUmVhZE9ubHlGaWVsZC50c3hcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlciwgZm9ybWF0RXhwZW5zZU51bWJlciB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvblByb3BzID0ge1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBjYW5FZGl0SGVhZGVyRmllbGRzOiBib29sZWFuO1xyXG4gIGlzRm9yZWlnbkN1cnJlbmN5OiBib29sZWFuO1xyXG4gIGV4cGVuc2VDdXJyZW5jeUxhYmVsOiBzdHJpbmc7XHJcbiAgaGVhZGVyQ3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgYmFzZUN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRFeGNoYW5nZVJhdGU6IHN0cmluZztcclxuICBleGNoYW5nZVJhdGVWYWx1ZTogc3RyaW5nO1xyXG4gIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlOiBzdHJpbmc7XHJcbiAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50OiBudW1iZXI7XHJcbiAgc2hvd0V4Y2hhbmdlUmF0ZTogYm9vbGVhbjtcclxuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogYm9vbGVhbjtcclxuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XHJcbiAgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2U6IHN0cmluZztcclxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIE93bnMgdGhlIGN1cnJlbmN5IGFuZCBleGNoYW5nZS1yYXRlIFVJIHNvIHRoZSBoZWFkZXIgZm9ybSBzdGF5cyBjb21wYWN0LlxyXG5jb25zdCBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb24gPSAoe1xyXG4gIGlzRWRpdGluZyxcclxuICBjYW5FZGl0SGVhZGVyRmllbGRzLFxyXG4gIGlzRm9yZWlnbkN1cnJlbmN5LFxyXG4gIGV4cGVuc2VDdXJyZW5jeUxhYmVsLFxyXG4gIGhlYWRlckN1cnJlbmN5Q29kZSxcclxuICBiYXNlQ3VycmVuY3lDb2RlLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gIGV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlLFxyXG4gIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudCxcclxuICBzaG93RXhjaGFuZ2VSYXRlLFxyXG4gIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxyXG4gIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcclxuICBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZSxcclxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlLFxyXG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2UsXHJcbn06IEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvblByb3BzKSA9PiB7XHJcbiAgY29uc3QgbG9jYWxDdXJyZW5jeU9wdGlvbnMgPSBSZWFjdC51c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oXHJcbiAgICAoKSA9PiBbXHJcbiAgICAgIHtcclxuICAgICAgICB2YWx1ZTogYmFzZUN1cnJlbmN5Q29kZSxcclxuICAgICAgICB0ZXh0OiBiYXNlQ3VycmVuY3lDb2RlLFxyXG4gICAgICAgIGljb246IDxFeHBlbnNlQ3VycmVuY3lGbGFnSWNvbiBjdXJyZW5jeUNvZGU9e2Jhc2VDdXJyZW5jeUNvZGV9IHNpemVDbGFzc05hbWU9XCJoLTYgdy02XCIgLz4sXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgW2Jhc2VDdXJyZW5jeUNvZGVdXHJcbiAgKTtcclxuICBjb25zdCBoZWFkZXJDdXJyZW5jeU9wdGlvbnMgPSBSZWFjdC51c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oXHJcbiAgICAoKSA9PiBbXHJcbiAgICAgIHtcclxuICAgICAgICB2YWx1ZTogaGVhZGVyQ3VycmVuY3lDb2RlIHx8IFwiLVwiLFxyXG4gICAgICAgIHRleHQ6IGhlYWRlckN1cnJlbmN5Q29kZSB8fCBcIi1cIixcclxuICAgICAgICBpY29uOiA8RXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gY3VycmVuY3lDb2RlPXtoZWFkZXJDdXJyZW5jeUNvZGUgfHwgXCItXCJ9IHNpemVDbGFzc05hbWU9XCJoLTYgdy02XCIgLz4sXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgW2hlYWRlckN1cnJlbmN5Q29kZV1cclxuICApO1xyXG5cclxuICBpZiAoaXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHMpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBzcGFjZS15LTNcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGdyaWQgZ2FwLTQgJHtpc0ZvcmVpZ25DdXJyZW5jeSA/IFwiZ3JpZC1jb2xzLTJcIiA6IFwiZ3JpZC1jb2xzLTFcIn1gLnRyaW0oKX0+XHJcbiAgICAgICAgICB7aXNGb3JlaWduQ3VycmVuY3kgPyAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntleHBlbnNlQ3VycmVuY3lMYWJlbH08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdFxyXG4gICAgICAgICAgICAgICAgICBsYWJlbD17ZXhwZW5zZUN1cnJlbmN5TGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lfUGxhY2Vob2xkZXJcIiwgXCJDdXJyZW5jeSBjb2RlXCIpfVxyXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRDdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZyB8fCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cclxuICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmcgfHwgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXN9XHJcbiAgICAgICAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtaGVhZGVyLWN1cnJlbmN5XCJcclxuICAgICAgICAgICAgICAgICAgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHRcclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzcGFjZS15LTEuNVwiPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgcHItOCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0V4Y2hhbmdlUmF0ZVwiLCBcIkV4Y2hhbmdlIHJhdGVcIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxJbmZvUG9wb3Zlckljb25CdXR0b25cclxuICAgICAgICAgICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfSW5mb1BvcG92ZXJfQXJpYVwiLCBcIlNob3cgZXhjaGFuZ2UgcmF0ZSBpbmZvcm1hdGlvblwiKX1cclxuICAgICAgICAgICAgICAgICAgY29udGVudD17ZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHJpZ2h0LTAgLXRvcC0xIHotMjBcIlxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvcm0tY29udHJvbCAke2V4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlID8gXCJib3JkZXItZGFuZ2VyIHJpbmctMSByaW5nLWRhbmdlclwiIDogXCJcIn0gJHtpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJcIn1gfVxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dE1vZGU9XCJkZWNpbWFsXCJcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRFeGNoYW5nZVJhdGV9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XHJcbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXsoZXZlbnQpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiA3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogNyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxsYmFjazogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhjaGFuZ2VSYXRlXCIsIFwiRXhjaGFuZ2UgcmF0ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhjaGFuZ2VSYXRlXCIsIFwiRXhjaGFuZ2UgcmF0ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17aXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzfVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXN9XHJcbiAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8RXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0XHJcbiAgICAgICAgICAgICAgbGFiZWw9e2V4cGVuc2VDdXJyZW5jeUxhYmVsfVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lfUGxhY2Vob2xkZXJcIiwgXCJDdXJyZW5jeSBjb2RlXCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdEN1cnJlbmN5Q29kZX1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZX1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZyB8fCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cclxuICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZyB8fCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cclxuICAgICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLWhlYWRlci1jdXJyZW5jeVwiXHJcbiAgICAgICAgICAgICAgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHRcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIHtpc0ZvcmVpZ25DdXJyZW5jeSA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtNFwiPlxyXG4gICAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfTG9jYWxDdXJyZW5jeVwiLCBcIkxvY2FsIGN1cnJlbmN5XCIpfVxyXG4gICAgICAgICAgICAgIG9wdGlvbnM9e2xvY2FsQ3VycmVuY3lPcHRpb25zfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtiYXNlQ3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeV9QbGFjZWhvbGRlclwiLCBcIkN1cnJlbmN5IGNvZGVcIil9XHJcbiAgICAgICAgICAgICAgcmVhZE9ubHlcclxuICAgICAgICAgICAgICBkaXNhYmxlZFxyXG4gICAgICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cclxuICAgICAgICAgICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cclxuICAgICAgICAgICAgICBzaG93TGFiZWxcclxuICAgICAgICAgICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxyXG4gICAgICAgICAgICAgIHNlbGVjdGVkVGV4dE1vZGU9XCJ2YWx1ZVwiXHJcbiAgICAgICAgICAgICAgZHJvcGRvd25NYXhIZWlnaHRDbGFzcz1cIm1heC1oLTk2XCJcclxuICAgICAgICAgICAgICBzZWxlY3RlZEljb25DbGFzc05hbWU9XCJoLTYgdy02XCJcclxuICAgICAgICAgICAgICBvcHRpb25JY29uQ2xhc3NOYW1lPVwiaC02IHctNlwiXHJcbiAgICAgICAgICAgICAgc2VsZWN0ZWRJbnB1dFBhZGRpbmdDbGFzc05hbWU9XCJwbC0xMlwiXHJcbiAgICAgICAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS1oZWFkZXItbG9jYWwtY3VycmVuY3lcIlxyXG4gICAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XHJcbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9BbW91bnRcIiwgXCJBbW91bnRcIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBpbmQtcmVhZG9ubHktZmllbGRcIlxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1hdEV4cGVuc2VOdW1iZXIoZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LCB7XHJcbiAgICAgICAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogNyxcclxuICAgICAgICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiA3LFxyXG4gICAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgZmFsbGJhY2s6IFwiLVwiLFxyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9BbW91bnRcIiwgXCJBbW91bnRcIil9XHJcbiAgICAgICAgICAgICAgICByZWFkT25seVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWRcclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICB7aXNGb3JlaWduQ3VycmVuY3kgJiYgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlciB0ZXh0LXNtXCI+e2V4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlfTwvcD4gOiBudWxsfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XHJcbiAgICAgICAgb3B0aW9ucz17aGVhZGVyQ3VycmVuY3lPcHRpb25zfVxyXG4gICAgICAgIHZhbHVlPXtoZWFkZXJDdXJyZW5jeUNvZGUgfHwgXCItXCJ9XHJcbiAgICAgICAgb25DaGFuZ2U9eygpID0+IHVuZGVmaW5lZH1cclxuICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5X1BsYWNlaG9sZGVyXCIsIFwiQ3VycmVuY3kgY29kZVwiKX1cclxuICAgICAgICByZWFkT25seVxyXG4gICAgICAgIGRpc2FibGVkXHJcbiAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxyXG4gICAgICAgIHNob3dTZWFyY2hCdXR0b249e2ZhbHNlfVxyXG4gICAgICAgIHNob3dMYWJlbFxyXG4gICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XHJcbiAgICAgICAgc2VsZWN0ZWRUZXh0TW9kZT1cInZhbHVlXCJcclxuICAgICAgICBkcm9wZG93bk1heEhlaWdodENsYXNzPVwibWF4LWgtOTZcIlxyXG4gICAgICAgIHNlbGVjdGVkSWNvbkNsYXNzTmFtZT1cImgtNiB3LTZcIlxyXG4gICAgICAgIG9wdGlvbkljb25DbGFzc05hbWU9XCJoLTYgdy02XCJcclxuICAgICAgICBzZWxlY3RlZElucHV0UGFkZGluZ0NsYXNzTmFtZT1cInBsLTEyXCJcclxuICAgICAgICBpZEJhc2U9XCJleHBlbnNlLWhlYWRlci1jdXJyZW5jeS1yZWFkb25seVwiXHJcbiAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgIC8+XHJcbiAgICAgIHshaXNFZGl0aW5nICYmIHNob3dFeGNoYW5nZVJhdGUgPyAoXHJcbiAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9FeGNoYW5nZVJhdGVcIiwgXCJFeGNoYW5nZSByYXRlXCIpfSB2YWx1ZT17ZXhjaGFuZ2VSYXRlVmFsdWV9IC8+XHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgPC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvbjtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VMYXlvdXRFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSBcInJlYWN0LWRvbVwiO1xyXG5pbXBvcnQgeyB1c2VPdXRzaWRlQ2xpY2sgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlT3V0c2lkZUNsaWNrLnRzXCI7XHJcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xyXG5cclxudHlwZSBJbmZvUG9wb3Zlckljb25CdXR0b25Qcm9wcyA9IHtcclxuICBjb250ZW50OiBSZWFjdC5SZWFjdE5vZGU7XHJcbiAgYXJpYUxhYmVsOiBzdHJpbmc7XHJcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIHBhbmVsQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG59O1xyXG5cclxuLy8gU2hhcmVkIGR1bWIgcG9wb3ZlciB0cmlnZ2VyIHVzZWQgdG8gZGlzcGxheSBzaG9ydCBjb250ZXh0dWFsIGluZm8uXHJcbmNvbnN0IEluZm9Qb3BvdmVySWNvbkJ1dHRvbiA9ICh7XHJcbiAgY29udGVudCxcclxuICBhcmlhTGFiZWwsXHJcbiAgY2xhc3NOYW1lID0gXCJcIixcclxuICBwYW5lbENsYXNzTmFtZSA9IFwiXCIsXHJcbn06IEluZm9Qb3BvdmVySWNvbkJ1dHRvblByb3BzKSA9PiB7XHJcbiAgY29uc3QgSE9SSVpPTlRBTF9WSUVXUE9SVF9HVVRURVJfUFggPSA4O1xyXG4gIGNvbnN0IFZFUlRJQ0FMX1ZJRVdQT1JUX0dVVFRFUl9QWCA9IDg7XHJcbiAgY29uc3QgUEFORUxfVFJJR0dFUl9HQVBfUFggPSA2O1xyXG4gIGNvbnN0IEdMT0JBTF9SQURJVVMgPSBcInZhcigtLXJhZGl1cy14bCwgNXB4KVwiO1xyXG4gIGNvbnN0IFtpc09wZW4sIHNldElzT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3BhbmVsU3R5bGUsIHNldFBhbmVsU3R5bGVdID0gdXNlU3RhdGU8UmVhY3QuQ1NTUHJvcGVydGllcz4oe1xyXG4gICAgcG9zaXRpb246IFwiZml4ZWRcIixcclxuICAgIHRvcDogMCxcclxuICAgIGxlZnQ6IDAsXHJcbiAgICB2aXNpYmlsaXR5OiBcImhpZGRlblwiLFxyXG4gIH0pO1xyXG4gIGNvbnN0IGJ1dHRvblJlZiA9IHVzZVJlZjxIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHBhbmVsUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIHVzZU91dHNpZGVDbGljayhbYnV0dG9uUmVmLCBwYW5lbFJlZl0sICgpID0+IHNldElzT3BlbihmYWxzZSkpO1xyXG4gIGNvbnN0IHVwZGF0ZVBhbmVsUG9zaXRpb24gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IGJ1dHRvblJlZi5jdXJyZW50O1xyXG4gICAgY29uc3QgcGFuZWxFbGVtZW50ID0gcGFuZWxSZWYuY3VycmVudDtcclxuICAgIGlmICghYnV0dG9uRWxlbWVudCB8fCAhcGFuZWxFbGVtZW50KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBidXR0b25SZWN0ID0gYnV0dG9uRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IHBhbmVsUmVjdCA9IHBhbmVsRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IHZpZXdwb3J0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgIGNvbnN0IHZpZXdwb3J0SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgY29uc3Qgc2FmZVdpZHRoID0gTWF0aC5taW4ocGFuZWxSZWN0LndpZHRoLCBNYXRoLm1heCgxODAsIHZpZXdwb3J0V2lkdGggLSBIT1JJWk9OVEFMX1ZJRVdQT1JUX0dVVFRFUl9QWCAqIDIpKTtcclxuXHJcbiAgICBsZXQgbGVmdCA9IGJ1dHRvblJlY3QubGVmdCArIGJ1dHRvblJlY3Qud2lkdGggLyAyIC0gc2FmZVdpZHRoIC8gMjtcclxuICAgIGxlZnQgPSBNYXRoLm1heChIT1JJWk9OVEFMX1ZJRVdQT1JUX0dVVFRFUl9QWCwgTWF0aC5taW4obGVmdCwgdmlld3BvcnRXaWR0aCAtIHNhZmVXaWR0aCAtIEhPUklaT05UQUxfVklFV1BPUlRfR1VUVEVSX1BYKSk7XHJcblxyXG4gICAgbGV0IHRvcCA9IGJ1dHRvblJlY3QuYm90dG9tICsgUEFORUxfVFJJR0dFUl9HQVBfUFg7XHJcbiAgICBjb25zdCBoYXNCb3R0b21PdmVyZmxvdyA9IHRvcCArIHBhbmVsUmVjdC5oZWlnaHQgKyBWRVJUSUNBTF9WSUVXUE9SVF9HVVRURVJfUFggPiB2aWV3cG9ydEhlaWdodDtcclxuICAgIGlmIChoYXNCb3R0b21PdmVyZmxvdykge1xyXG4gICAgICBjb25zdCB0b3BBYm92ZVRyaWdnZXIgPSBidXR0b25SZWN0LnRvcCAtIHBhbmVsUmVjdC5oZWlnaHQgLSBQQU5FTF9UUklHR0VSX0dBUF9QWDtcclxuICAgICAgdG9wID0gdG9wQWJvdmVUcmlnZ2VyID49IFZFUlRJQ0FMX1ZJRVdQT1JUX0dVVFRFUl9QWFxyXG4gICAgICAgID8gdG9wQWJvdmVUcmlnZ2VyXHJcbiAgICAgICAgOiBNYXRoLm1heChWRVJUSUNBTF9WSUVXUE9SVF9HVVRURVJfUFgsIHZpZXdwb3J0SGVpZ2h0IC0gcGFuZWxSZWN0LmhlaWdodCAtIFZFUlRJQ0FMX1ZJRVdQT1JUX0dVVFRFUl9QWCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGFuZWxTdHlsZSh7XHJcbiAgICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXHJcbiAgICAgIHRvcDogTWF0aC5yb3VuZCh0b3ApLFxyXG4gICAgICBsZWZ0OiBNYXRoLnJvdW5kKGxlZnQpLFxyXG4gICAgICB3aWR0aDogTWF0aC5yb3VuZChzYWZlV2lkdGgpLFxyXG4gICAgICB2aXNpYmlsaXR5OiBcInZpc2libGVcIixcclxuICAgIH0pO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaXNPcGVuKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHVwZGF0ZVBhbmVsUG9zaXRpb24oKTtcclxuICB9LCBbaXNPcGVuLCBjb250ZW50LCB1cGRhdGVQYW5lbFBvc2l0aW9uXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWlzT3Blbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBoYW5kbGVWaWV3cG9ydENoYW5nZSA9ICgpID0+IHVwZGF0ZVBhbmVsUG9zaXRpb24oKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGhhbmRsZVZpZXdwb3J0Q2hhbmdlKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhhbmRsZVZpZXdwb3J0Q2hhbmdlLCB0cnVlKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGhhbmRsZVZpZXdwb3J0Q2hhbmdlKTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlVmlld3BvcnRDaGFuZ2UsIHRydWUpO1xyXG4gICAgfTtcclxuICB9LCBbaXNPcGVuLCB1cGRhdGVQYW5lbFBvc2l0aW9uXSk7XHJcblxyXG4gIGNvbnN0IHBvcnRhbFRhcmdldCA9IHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIiA/IG51bGwgOiBkb2N1bWVudC5ib2R5O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJpbmxpbmUtZmxleFwiLCBjbGFzc05hbWUpfT5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgIHJlZj17YnV0dG9uUmVmfVxyXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbH1cclxuICAgICAgICBhcmlhLWV4cGFuZGVkPXtpc09wZW59XHJcbiAgICAgICAgYXJpYS1oYXNwb3B1cD1cImRpYWxvZ1wiXHJcbiAgICAgICAgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaC02IHctNiBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci10cmFuc3BhcmVudCBiZy10cmFuc3BhcmVudCBwLTAgdGV4dC1zbGF0ZS01MDAgdHJhbnNpdGlvbiBob3Zlcjp0ZXh0LXByaW1hcnkgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHJpbWFyeS8zMFwiXHJcbiAgICAgICAgc3R5bGU9e3sgYm9yZGVyUmFkaXVzOiBHTE9CQUxfUkFESVVTIH19XHJcbiAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNPcGVuKChwcmV2aW91cykgPT4gIXByZXZpb3VzKX1cclxuICAgICAgPlxyXG4gICAgICAgIDxzdmdcclxuICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICAgICAgd2lkdGg9XCIyMFwiXHJcbiAgICAgICAgICBoZWlnaHQ9XCIyMFwiXHJcbiAgICAgICAgICB2aWV3Qm94PVwiMyAzIDE4IDE4XCJcclxuICAgICAgICAgIGZpbGw9XCJub25lXCJcclxuICAgICAgICAgIHN0cm9rZT1cIiM2NDc0OGJcIlxyXG4gICAgICAgICAgc3Ryb2tlV2lkdGg9XCIxLjc1XCJcclxuICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcclxuICAgICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJibG9ja1wiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHJlY3QgeD1cIjRcIiB5PVwiNFwiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIHJ4PVwiM1wiIHJ5PVwiM1wiIC8+XHJcbiAgICAgICAgICA8cGF0aCBkPVwiTTEyIDloLjAxXCIgLz5cclxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTEgMTJoMXY0aDFcIiAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgIHtpc09wZW4gJiYgcG9ydGFsVGFyZ2V0XHJcbiAgICAgICAgPyBjcmVhdGVQb3J0YWwoXHJcbiAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICByZWY9e3BhbmVsUmVmfVxyXG4gICAgICAgICAgICAgIHJvbGU9XCJkaWFsb2dcIlxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnBhbmVsU3R5bGUsIGJvcmRlclJhZGl1czogR0xPQkFMX1JBRElVUyB9fVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICAgIFwiei0zNjAwMDAgbWluLXctWzIyMHB4XSBtYXgtdy1bY2FsYygxMDB2dy0xcmVtKV0gcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUgcC0zIHNoYWRvdy1sZ1wiLFxyXG4gICAgICAgICAgICAgICAgcGFuZWxDbGFzc05hbWVcclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTJweF0gdGV4dC1zbGF0ZS03MDAgd2hpdGVzcGFjZS1wcmUtbGluZVwiPntjb250ZW50fTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+LFxyXG4gICAgICAgICAgICBwb3J0YWxUYXJnZXRcclxuICAgICAgICAgIClcclxuICAgICAgICA6IG51bGx9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW5mb1BvcG92ZXJJY29uQnV0dG9uO1xyXG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDb2RlIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcclxuXHJcbnR5cGUgRXhjaGFuZ2VSYXRlTW9kZVVpTWV0YSA9IHtcclxuICBsYWJlbEtleTogc3RyaW5nO1xyXG4gIGZhbGxiYWNrOiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCBFWENIQU5HRV9SQVRFX01PREVfTUVUQTogUmVjb3JkPEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ29kZSwgRXhjaGFuZ2VSYXRlTW9kZVVpTWV0YT4gPSB7XHJcbiAgMDoge1xyXG4gICAgbGFiZWxLZXk6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9PZmZpY2lhbFwiLFxyXG4gICAgZmFsbGJhY2s6IFwiVC5DLiBPZmljaWFsXCIsXHJcbiAgfSxcclxuICAxOiB7XHJcbiAgICBsYWJlbEtleTogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX01hbnVhbFwiLFxyXG4gICAgZmFsbGJhY2s6IFwiVC5DLiBNYW51YWxcIixcclxuICB9LFxyXG59O1xyXG5jb25zdCBFWENIQU5HRV9SQVRFX01PREVfQ09ERVM6IEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ29kZVtdID0gWzAsIDFdO1xyXG5cclxuLy8gS2VlcHMgZXhjaGFuZ2UgcmF0ZSBtb2RlIHZhbHVlcyBjb25zdHJhaW5lZCB0byBudW1lcmljIDAgb3IgMS5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDb2RlIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcclxuICBpZiAocGFyc2VkID09PSAwIHx8IHBhcnNlZCA9PT0gMSkge1xyXG4gICAgcmV0dXJuIHBhcnNlZDtcclxuICB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG4vLyBCdWlsZHMgZml4ZWQgb3B0aW9ucyBmb3IgdGhlIGV4Y2hhbmdlIHJhdGUgbW9kZSBmaWx0ZXIuXHJcbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZU9wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcclxuICByZXR1cm4gRVhDSEFOR0VfUkFURV9NT0RFX0NPREVTXHJcbiAgICAubWFwKChjb2RlKSA9PiB7XHJcbiAgICAgIGNvbnN0IG1ldGEgPSBFWENIQU5HRV9SQVRFX01PREVfTUVUQVtjb2RlXTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB2YWx1ZTogU3RyaW5nKGNvZGUpLFxyXG4gICAgICAgIHRleHQ6IGluZFQobWV0YS5sYWJlbEtleSwgbWV0YS5mYWxsYmFjayksXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8vIFJldHVybnMgYSBsb2NhbGl6ZWQgbW9kZSBsYWJlbCBvciBlbXB0eSB0ZXh0IGZvciBub24tc2VsZWN0ZWQgdmFsdWVzLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlKHZhbHVlKTtcclxuICBpZiAobm9ybWFsaXplZCA9PT0gbnVsbCkgcmV0dXJuIFwiXCI7XHJcbiAgY29uc3QgbWV0YSA9IEVYQ0hBTkdFX1JBVEVfTU9ERV9NRVRBW25vcm1hbGl6ZWRdO1xyXG4gIHJldHVybiBpbmRUKG1ldGEubGFiZWxLZXksIG1ldGEuZmFsbGJhY2spO1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRGb3JtYXQsIGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldEhlYWRlciB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvbiBmcm9tIFwiLi9FeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb24udHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0IGZyb20gXCIuL0V4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlUmVhZE9ubHlGaWVsZCBmcm9tIFwiLi9FeHBlbnNlUmVhZE9ubHlGaWVsZC50c3hcIjtcclxuaW1wb3J0IHsgZ2V0RXhwZW5zZVN0YXR1c0xhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlU3RhdHVzQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leGNoYW5nZVJhdGVFbnRyeU1vZGVDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VOdW1iZXIsIHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VTaGVldEhlYWRlckZvcm1Qcm9wcyA9IHtcclxuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGJvb2xlYW47XHJcbiAgc3RhdHVzQ29tbWVudE1vZGU6IFwiaGlkZGVuXCIgfCBcInJlYWRcIjtcclxuICBoZWFkZXI6IEV4cGVuc2VTaGVldEhlYWRlcjtcclxuICBwcm9qZWN0VmFsdWU6IHN0cmluZztcclxuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogYm9vbGVhbjtcclxuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XHJcbiAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3k6IHN0cmluZztcclxuICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k6IHN0cmluZztcclxuICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQ6IG51bWJlcjtcclxuICBzaG93RXhjaGFuZ2VSYXRlOiBib29sZWFuO1xyXG4gIGV4Y2hhbmdlUmF0ZVZhbHVlOiBzdHJpbmc7XHJcbiAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2U6IHN0cmluZztcclxuICB0b3RhbEFtb3VudFRleHQ6IHN0cmluZztcclxuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZHJhZnRQcm9qZWN0SWQ6IHN0cmluZztcclxuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlOiBzdHJpbmc7XHJcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZTogc3RyaW5nO1xyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZTogc3RyaW5nO1xyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlOiBzdHJpbmc7XHJcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IEVYQ0hBTkdFX1JBVEVfTU9ERV9QUkVGSVhfUEFUVEVSTiA9IC9eVFxcLj9DXFwuP1xccyovaTtcclxuXHJcbi8vIFB1cmUgcHJlc2VudGF0aW9uYWwgaGVhZGVyIGZvcm0gZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsL2NyZWF0ZSBzY3JlZW5zLlxyXG5jb25zdCBFeHBlbnNlU2hlZXRIZWFkZXJGb3JtID0gKHtcclxuICBpc0NyZWF0ZU1vZGUsXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGNhbkVkaXRIZWFkZXJGaWVsZHMsXHJcbiAgc3RhdHVzQ29tbWVudE1vZGUsXHJcbiAgaGVhZGVyLFxyXG4gIHByb2plY3RWYWx1ZSxcclxuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcclxuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXHJcbiAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXHJcbiAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudCxcclxuICBzaG93RXhjaGFuZ2VSYXRlLFxyXG4gIGV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlLFxyXG4gIHRvdGFsQW1vdW50VGV4dCxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRyYWZ0UHJvamVjdElkLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsXHJcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLFxyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlLFxyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZSxcclxuICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlLFxyXG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2UsXHJcbiAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZSxcclxufTogRXhwZW5zZVNoZWV0SGVhZGVyRm9ybVByb3BzKSA9PiB7XHJcbiAgY29uc3QgaXNGb3JlaWduQ3VycmVuY3kgPVxyXG4gICAgaXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHMgJiYgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgIT09IFwiXCIgJiYgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgIT09IGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeTtcclxuICBjb25zdCBleHBlbnNlQ3VycmVuY3lMYWJlbCA9IGlzRm9yZWlnbkN1cnJlbmN5XHJcbiAgICA/IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0V4cGVuc2VDdXJyZW5jeVwiLCBcIkV4cGVuc2UgY3VycmVuY3lcIilcclxuICAgIDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKTtcclxuICBjb25zdCBzdGF0dXNWYWx1ZSA9XHJcbiAgICBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzID09PSBudWxsIHx8IGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgPT09IHVuZGVmaW5lZFxyXG4gICAgICA/IFwiLVwiXHJcbiAgICAgIDogZ2V0RXhwZW5zZVN0YXR1c0xhYmVsKGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMpO1xyXG4gIGNvbnN0IGhlYWRlckN1cnJlbmN5Q29kZSA9IHNhZmVUZXh0KGhlYWRlci5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3QgYmFzZUN1cnJlbmN5Q29kZSA9IHNhZmVUZXh0KGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSkudG9VcHBlckNhc2UoKTtcclxuICAvLyBTdGF0dXMgY29tbWVudCBpcyBub3cgZWRpdGVkIG9ubHkgaW4gdGhlIHN0YXR1cyB0cmFuc2l0aW9uIHBvcHVwLlxyXG4gIGNvbnN0IHN0YXR1c0NvbW1lbnRWYWx1ZSA9IHNhZmVUZXh0KGhlYWRlci5lc3RhZG9Db21lbnRhcmlvcyk7XHJcbiAgY29uc3Qgc2hvd1N0YXR1c0NvbW1lbnRGaWVsZCA9ICFpc0NyZWF0ZU1vZGUgJiYgc3RhdHVzQ29tbWVudE1vZGUgIT09IFwiaGlkZGVuXCI7XHJcbiAgY29uc3QgcGFyc2VkRHJhZnRFeGNoYW5nZVJhdGUgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQoZHJhZnRFeGNoYW5nZVJhdGUpO1xyXG4gIGNvbnN0IHBhcnNlZE9mZmljaWFsUmF3UmF0ZSA9IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKTtcclxuICBjb25zdCBiYXNlRXhjaGFuZ2VSYXRlVmFsdWUgPVxyXG4gICAgcGFyc2VkRHJhZnRFeGNoYW5nZVJhdGUgIT0gbnVsbFxyXG4gICAgICA/IHBhcnNlZERyYWZ0RXhjaGFuZ2VSYXRlXHJcbiAgICAgIDogcGFyc2VkT2ZmaWNpYWxSYXdSYXRlICE9IG51bGxcclxuICAgICAgICA/IHBhcnNlZE9mZmljaWFsUmF3UmF0ZSAqIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudFxyXG4gICAgICAgIDogbnVsbDtcclxuICBjb25zdCBleGNoYW5nZVJhdGVJbmZvVmFsdWUgPSBmb3JtYXRFeHBlbnNlTnVtYmVyKFxyXG4gICAgYmFzZUV4Y2hhbmdlUmF0ZVZhbHVlICE9IG51bGwgPyBiYXNlRXhjaGFuZ2VSYXRlVmFsdWUgLyBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQgOiBudWxsLFxyXG4gICAge1xyXG4gICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDcsXHJcbiAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogNyxcclxuICAgICAgdXNlR3JvdXBpbmc6IGZhbHNlLFxyXG4gICAgICBmYWxsYmFjazogXCIwLjAwMDAwMDBcIixcclxuICAgIH1cclxuICApO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSA9IE51bWJlcihoZWFkZXIuZXhjaGFuZ2VSYXRlTW9kZSkgPT09IDEgPyAxIDogMDtcclxuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlS2V5ID1cclxuICAgIGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSA9PT0gMVxyXG4gICAgICA/IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9NYW51YWxcIlxyXG4gICAgICA6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9PZmZpY2lhbFwiO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZU1vZGVGYWxsYmFjayA9IGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSA9PT0gMSA/IFwiVC5DLiBNYW51YWxcIiA6IFwiVC5DLiBPZmljaWFsXCI7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlTW9kZUxhYmVsID1cclxuICAgIChnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsKGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSkgfHwgaW5kVChleGNoYW5nZVJhdGVNb2RlS2V5LCBleGNoYW5nZVJhdGVNb2RlRmFsbGJhY2spKVxyXG4gICAgICAucmVwbGFjZShFWENIQU5HRV9SQVRFX01PREVfUFJFRklYX1BBVFRFUk4sIFwiXCIpXHJcbiAgICAgIC50cmltKClcclxuICAgICAgLnRvTG93ZXJDYXNlKCkgfHwgKGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSA9PT0gMSA/IFwibWFudWFsXCIgOiBcIm9maWNpYWxcIik7XHJcbiAgY29uc3QgaGFzRW5kcG9pbnRFeGNoYW5nZVJhdGVEYXRhID1cclxuICAgICEhc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSkgfHwgISFzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUpIHx8ICEhc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UpO1xyXG4gIGNvbnN0IGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb0RhdGUgPSBzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUpIHx8IGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xyXG4gIGNvbnN0IGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb1NvdXJjZSA9IHNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKVxyXG4gICAgLnJlcGxhY2UoL1xccypcXChbXigpXSpcXClcXHMqL2csIFwiIFwiKVxyXG4gICAgLnJlcGxhY2UoL1xcc3syLH0vZywgXCIgXCIpXHJcbiAgICAudHJpbSgpIHx8IGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xyXG4gIGNvbnN0IGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UgPSBpbmRGb3JtYXQoXHJcbiAgICBcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX0luZm9Qb3BvdmVyX0RldGFpbFwiLFxyXG4gICAgXCJUaXBvIGRlIGNhbWJpbyBvYnRlbmlkbyB7MH1cXG5GZWNoYTogezF9XFxuT3JpZ2VuOiB7Mn1cIixcclxuICAgIHNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUpIHx8IFwiMC4wMDAwMDAwXCIsXHJcbiAgICBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9EYXRlLFxyXG4gICAgZW5kcG9pbnRFeGNoYW5nZVJhdGVJbmZvU291cmNlXHJcbiAgKTtcclxuICBjb25zdCBzdG9yZWRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZSA9IGluZEZvcm1hdChcclxuICAgIFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfSW5mb1BvcG92ZXJfU3RvcmVkXCIsXHJcbiAgICBcIlRpcG8gZGUgY2FtYmlvIHswfSB7MX1cIixcclxuICAgIGV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCxcclxuICAgIGV4Y2hhbmdlUmF0ZUluZm9WYWx1ZVxyXG4gICk7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UgPSBoYXNFbmRwb2ludEV4Y2hhbmdlUmF0ZURhdGEgPyBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlIDogc3RvcmVkRXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2U7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cclxuICAgICAgICB7IWlzQ3JlYXRlTW9kZSA/IChcclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU2hlZXRJZFwiLCBcIkV4cGVuc2Ugc2hlZXQgY29kZVwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e3NhZmVUZXh0KGhlYWRlci5ob2phR2FzdG9zSWQpIHx8IFwiLVwifVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgICB7IWlzQ3JlYXRlTW9kZSA/IDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzXCIsIFwiU3RhdHVzXCIpfSB2YWx1ZT17c3RhdHVzVmFsdWV9IC8+IDogbnVsbH1cclxuICAgICAgICB7c2hvd1N0YXR1c0NvbW1lbnRGaWVsZCA/IChcclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzQ29tbWVudFwiLCBcIlN0YXR1cyBjb21tZW50XCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17c3RhdHVzQ29tbWVudFZhbHVlIHx8IFwiLVwifVxyXG4gICAgICAgICAgICBmdWxsV2lkdGhcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAge2lzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzID8gKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbTpjb2wtc3Bhbi0yIHNwYWNlLXktMS41XCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX08L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxyXG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdERlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XHJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtzYWZlVGV4dChoZWFkZXIuZGVzY3JpcHRpb24pIHx8IFwiLVwifVxyXG4gICAgICAgICAgICBmdWxsV2lkdGhcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKX1cclxuICAgICAgICB7aXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHMgPyAoXHJcbiAgICAgICAgICA8RXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfUHJvamVjdF9QbGFjZWhvbGRlclwiLCBcIlByb2plY3QgaWRcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtkcmFmdFByb2plY3RJZH1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRQcm9qZWN0SWRDaGFuZ2V9XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nIHx8ICFjYW5FZGl0SGVhZGVyRmllbGRzfVxyXG4gICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZyB8fCAhY2FuRWRpdEhlYWRlckZpZWxkc31cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IHByb2plY3RWYWx1ZSA/IChcclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9IHZhbHVlPXtwcm9qZWN0VmFsdWV9IC8+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgPEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvblxyXG4gICAgICAgICAgaXNFZGl0aW5nPXtpc0VkaXRpbmd9XHJcbiAgICAgICAgICBjYW5FZGl0SGVhZGVyRmllbGRzPXtjYW5FZGl0SGVhZGVyRmllbGRzfVxyXG4gICAgICAgICAgaXNGb3JlaWduQ3VycmVuY3k9e2lzRm9yZWlnbkN1cnJlbmN5fVxyXG4gICAgICAgICAgZXhwZW5zZUN1cnJlbmN5TGFiZWw9e2V4cGVuc2VDdXJyZW5jeUxhYmVsfVxyXG4gICAgICAgICAgaGVhZGVyQ3VycmVuY3lDb2RlPXtoZWFkZXJDdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgICBiYXNlQ3VycmVuY3lDb2RlPXtiYXNlQ3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgZHJhZnRDdXJyZW5jeUNvZGU9e2RyYWZ0Q3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgZHJhZnRFeGNoYW5nZVJhdGU9e2RyYWZ0RXhjaGFuZ2VSYXRlfVxyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlVmFsdWU9e2V4Y2hhbmdlUmF0ZVZhbHVlfVxyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2U9e2V4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlfVxyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50PXtleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnR9XHJcbiAgICAgICAgICBzaG93RXhjaGFuZ2VSYXRlPXtzaG93RXhjaGFuZ2VSYXRlfVxyXG4gICAgICAgICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXM9e2lzQ3VycmVuY3lMb2NrZWRCeUxpbmVzfVxyXG4gICAgICAgICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzPXtpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXN9XHJcbiAgICAgICAgICBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZT17ZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2V9XHJcbiAgICAgICAgICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlPXtvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlfVxyXG4gICAgICAgICAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZT17b25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZX1cclxuICAgICAgICAvPlxyXG4gICAgICAgIHshaXNDcmVhdGVNb2RlID8gPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Ub3RhbEFtb3VudFwiLCBcIlRvdGFsIGFtb3VudFwiKX0gdmFsdWU9e3RvdGFsQW1vdW50VGV4dH0gLz4gOiBudWxsfVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IENvbXBhY3RQYWdpbmF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29tcGFjdFBhZ2luYXRpb24udHN4XCI7XHJcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldExpbmUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEYXRlUGFydHMsIHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlU2VjdGlvbkRpdmlkZXIgZnJvbSBcIi4vRXhwZW5zZVNlY3Rpb25EaXZpZGVyLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpbWVsaW5lQ2FyZCBmcm9tIFwiLi9FeHBlbnNlVGltZWxpbmVDYXJkLnRzeFwiO1xyXG5cclxudHlwZSBQYWdpbmF0aW9uTGFiZWxzID0ge1xyXG4gIGZpcnN0OiBzdHJpbmc7XHJcbiAgcHJldjogc3RyaW5nO1xyXG4gIG5leHQ6IHN0cmluZztcclxuICBsYXN0OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VMaW5lc1RpbWVsaW5lUHJvcHMgPSB7XHJcbiAgdmlzaWJsZUxpbmVzOiBFeHBlbnNlU2hlZXRMaW5lW107XHJcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgdG90YWxMaW5lUGFnZXM6IG51bWJlcjtcclxuICBsaW5lUGFnZTogbnVtYmVyO1xyXG4gIGxpbmVzTGFiZWw6IHN0cmluZztcclxuICBlbXB0eVRleHQ6IHN0cmluZztcclxuICBwYWdpbmF0aW9uTGFiZWxzOiBQYWdpbmF0aW9uTGFiZWxzO1xyXG4gIGNvbnRhaW5lclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgb25MaW5lUGFnZUNoYW5nZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcclxuICBvbk9wZW5MaW5lOiAobGluZVJlY0lkOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBEdW1iIHRpbWVsaW5lIGZvciBleHBlbnNlIHNoZWV0IGxpbmVzIHdpdGggc3RhbmRhcmQgY2FyZCBhbmQgcGFnaW5hdGlvbiBsYXlvdXQuXHJcbmNvbnN0IEV4cGVuc2VMaW5lc1RpbWVsaW5lID0gKHtcclxuICB2aXNpYmxlTGluZXMsXHJcbiAgY3VycmVuY3lDb2RlLFxyXG4gIHRvdGFsTGluZVBhZ2VzLFxyXG4gIGxpbmVQYWdlLFxyXG4gIGxpbmVzTGFiZWwsXHJcbiAgZW1wdHlUZXh0LFxyXG4gIHBhZ2luYXRpb25MYWJlbHMsXHJcbiAgY29udGFpbmVyUmVmLFxyXG4gIG9uTGluZVBhZ2VDaGFuZ2UsXHJcbiAgb25PcGVuTGluZSxcclxufTogRXhwZW5zZUxpbmVzVGltZWxpbmVQcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzcGFjZS15LTBcIj5cclxuICAgICAgPEV4cGVuc2VTZWN0aW9uRGl2aWRlciBsYWJlbD17bGluZXNMYWJlbH0gY2xhc3NOYW1lPVwiZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXItLXNwYWNlZFwiIC8+XHJcblxyXG4gICAgICB7dmlzaWJsZUxpbmVzLmxlbmd0aCA9PT0gMCA/IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveCB0aW1lbGluZS1lbXB0eVwiIGRhdGEtZW1wdHktdGV4dD17ZW1wdHlUZXh0fSAvPlxyXG4gICAgICApIDogKFxyXG4gICAgICAgIDxkaXYgcmVmPXtjb250YWluZXJSZWZ9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveFwiPlxyXG4gICAgICAgICAge3Zpc2libGVMaW5lcy5tYXAoKGxpbmUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmVJZCA9IHNhZmVUZXh0KGxpbmUubGluZVJlY0lkKTtcclxuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBzYWZlVGV4dChsaW5lLmRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgY29uc3QgYW1vdW50VGV4dCA9IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShsaW5lLmFtb3VudCA/PyBudWxsLCBjdXJyZW5jeUNvZGUpO1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rZWRUaWNrZXRGaWxlSWQgPSBzYWZlVGV4dChsaW5lLmZpbGVJZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGVQYXJ0cyA9IGZvcm1hdEV4cGVuc2VEYXRlUGFydHMoc2FmZVRleHQobGluZS50cmFuc0RhdGUpLCBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpY2tldFN0YXR1c0ljb24gPSBsaW5rZWRUaWNrZXRGaWxlSWQgPyAoXHJcbiAgICAgICAgICAgICAgPHN2Z1xyXG4gICAgICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgICAgICAgICAgICBmaWxsPVwibm9uZVwiXHJcbiAgICAgICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXsxLjV9XHJcbiAgICAgICAgICAgICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC00IHctNFwiXHJcbiAgICAgICAgICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICBkPVwiTTEzLjE5IDguNjg4YTQuNSA0LjUgMCAwIDEgMS4yNDIgNy4yNDRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMS02LjM2NC02LjM2NGwxLjc1Ny0xLjc1N20xMy4zNS0uNjIyIDEuNzU3LTEuNzU3YTQuNSA0LjUgMCAwIDAtNi4zNjQtNi4zNjRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMCAxLjI0MiA3LjI0NFwiXHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICApIDogbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2Ake2xpbmVJZH0tJHtpbmRleH1gfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxyXG4gICAgICAgICAgICAgICAgICBkYXRlUGFydHM9e2RhdGVQYXJ0c31cclxuICAgICAgICAgICAgICAgICAgdGl0bGU9e2Rlc2NyaXB0aW9uIHx8IGxpbmVJZCB8fCBcIi1cIn1cclxuICAgICAgICAgICAgICAgICAgYW1vdW50VGV4dD17YW1vdW50VGV4dH1cclxuICAgICAgICAgICAgICAgICAgb25PcGVuPXsoKSA9PiBvbk9wZW5MaW5lKGxpbmVJZCl9XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlQ2xhc3NOYW1lPVwidGltZWxpbmUtbmFtZSBleHBlbnNlLWxpbmUtY2FyZF9fdGl0bGVcIlxyXG4gICAgICAgICAgICAgICAgICBzdGF0dXNJY29uPXt0aWNrZXRTdGF0dXNJY29ufVxyXG4gICAgICAgICAgICAgICAgICBzdGF0dXNJY29uQ2xhc3NOYW1lPVwiZXhwZW5zZS1saW5lLWNhcmRfX3RpY2tldC1pY29uXCJcclxuICAgICAgICAgICAgICAgICAgc3RhdHVzTGFiZWw9e2xpbmtlZFRpY2tldEZpbGVJZCB8fCB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICA8Q29tcGFjdFBhZ2luYXRpb25cclxuICAgICAgICB0b3RhbFBhZ2VzPXt0b3RhbExpbmVQYWdlc31cclxuICAgICAgICBjdXJyZW50UGFnZT17bGluZVBhZ2V9XHJcbiAgICAgICAgb25QYWdlQ2hhbmdlPXtvbkxpbmVQYWdlQ2hhbmdlfVxyXG4gICAgICAgIGxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cclxuICAgICAgLz5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUxpbmVzVGltZWxpbmU7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQYWdlQm90dG9tQWN0aW9ucywgeyBQYWdlQm90dG9tQWN0aW9uQnV0dG9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9QYWdlQm90dG9tQWN0aW9ucy50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uIH0gZnJvbSBcIi4vZXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5LnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbkJhclByb3BzID0ge1xyXG4gIGFjdGlvbnM6IEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbltdO1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gIG9uQWN0aW9uQ2xpY2s6IChhY3Rpb246IEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbikgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIFJlbmRlcnMgdGhlIGJvdHRvbSB0b29sYmFyIGZvciBleHBlbnNlIHNoZWV0IHN0YXR1cyB0cmFuc2l0aW9ucy5cclxuY29uc3QgRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyID0gKHsgYWN0aW9ucywgYnVzeSwgZGlzYWJsZWQgPSBmYWxzZSwgb25BY3Rpb25DbGljayB9OiBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25CYXJQcm9wcykgPT4ge1xyXG4gIGlmIChhY3Rpb25zLmxlbmd0aCA8IDEpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxQYWdlQm90dG9tQWN0aW9ucyBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0JvdHRvbUFjdGlvbnNfVG9vbGJhclwiLCBcIkV4cGVuc2Ugc2hlZXQgc3RhdHVzIGFjdGlvbnNcIil9PlxyXG4gICAgICB7YWN0aW9ucy5tYXAoKGFjdGlvbikgPT4gKFxyXG4gICAgICAgIDxQYWdlQm90dG9tQWN0aW9uQnV0dG9uXHJcbiAgICAgICAgICBrZXk9e2FjdGlvbi5pZH1cclxuICAgICAgICAgIGxhYmVsPXtpbmRUKGFjdGlvbi5sYWJlbEtleSwgYWN0aW9uLmZhbGxiYWNrKX1cclxuICAgICAgICAgIGRpc2FibGVkPXtidXN5IHx8IGRpc2FibGVkfVxyXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gb25BY3Rpb25DbGljayhhY3Rpb24pfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICkpfVxyXG4gICAgPC9QYWdlQm90dG9tQWN0aW9ucz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5IGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VRdWlja1RpY2tldFByb2dyZXNzT3ZlcmxheS50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IFRJQ0tFVF9JTUFHRV9BQ0NFUFRfQVRUUklCVVRFIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93Q29yZS50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlU2hlZXREZXRhaWxPdmVybGF5c1Byb3BzID0ge1xyXG4gIG1vZGFsOiB7XHJcbiAgICBvcGVuOiBib29sZWFuO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xyXG4gICAgY2FuY2VsVGV4dD86IHN0cmluZztcclxuICAgIHNob3dDYW5jZWw/OiBib29sZWFuO1xyXG4gICAgc2hvd0NvbmZpcm0/OiBib29sZWFuO1xyXG4gIH07XHJcbiAgbW9kYWxFcnJvcjogc3RyaW5nO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlOiBib29sZWFuO1xyXG4gIG1vZGFsTG9hZGluZ1RleHQ6IHN0cmluZztcclxuICBtb2RhbENhbmNlbFRleHQ6IHN0cmluZztcclxuICBtb2RhbENvbmZpcm1UZXh0OiBzdHJpbmc7XHJcbiAgbW9kYWxCb2R5PzogUmVhY3QuUmVhY3ROb2RlO1xyXG4gIGNhbWVyYUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gIGdhbGxlcnlJbnB1dFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcclxuICBzb3VyY2VQaWNrZXJPcGVuOiBib29sZWFuO1xyXG4gIHF1aWNrVGlja2V0QnVzeTogYm9vbGVhbjtcclxuICBxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZTogc3RyaW5nO1xyXG4gIHF1aWNrVGlja2V0UHJvZ3Jlc3NTdGFnZXM6IEFycmF5PHtcclxuICAgIGtleTogc3RyaW5nO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICBzdGF0ZTogXCJjb21wbGV0ZWRcIiB8IFwiYWN0aXZlXCIgfCBcInBlbmRpbmdcIjtcclxuICB9PjtcclxuICBxdWlja1RpY2tldEVsYXBzZWRNczogbnVtYmVyO1xyXG4gIHF1aWNrVGlja2V0RXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbiAgcXVpY2tUaWNrZXRBdHRlbXB0SWQ6IHN0cmluZztcclxuICBxdWlja1RpY2tldFRyYWNlTGlzdDogQXJyYXk8eyBzdGVwOiBzdHJpbmc7IHRyYWNlSWQ6IHN0cmluZzsgYXQ6IHN0cmluZyB9PjtcclxuICBoYXNQZW5kaW5nVXBsb2FkUmV0cnk6IGJvb2xlYW47XHJcbiAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmU6IGJvb2xlYW47XHJcbiAgb25Db25maXJtOiAoKSA9PiB2b2lkO1xyXG4gIG9uQ2FuY2VsOiAoKSA9PiB2b2lkO1xyXG4gIG9uU2VsZWN0ZWRDYW1lcmFGaWxlOiAoZmlsZTogRmlsZSB8IG51bGwpID0+IHZvaWQ7XHJcbiAgb25TZWxlY3RlZEdhbGxlcnlGaWxlOiAoZmlsZTogRmlsZSB8IG51bGwpID0+IHZvaWQ7XHJcbiAgb25TZWxlY3RGcm9tQ2FtZXJhOiAoKSA9PiB2b2lkO1xyXG4gIG9uU2VsZWN0RnJvbUdhbGxlcnk6ICgpID0+IHZvaWQ7XHJcbiAgb25DbG9zZVNvdXJjZVBpY2tlcjogKCkgPT4gdm9pZDtcclxuICBvblJldHJ5UGVuZGluZ1VwbG9hZDogKCkgPT4gdm9pZDtcclxuICBvbk9wZW5DcmVhdGVkVGlja2V0OiAoKSA9PiB2b2lkO1xyXG4gIG9uQ2xlYXJRdWlja1RpY2tldEVycm9yOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyBtb2RhbCBhbmQgcXVpY2stdGlja2V0IG92ZXJsYXlzIGZvciB0aGUgZXhwZW5zZSBzaGVldCBkZXRhaWwgcGFnZS5cclxuY29uc3QgRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXMgPSAoe1xyXG4gIG1vZGFsLFxyXG4gIG1vZGFsRXJyb3IsXHJcbiAgc3RhdHVzLFxyXG4gIGJ1c3ksXHJcbiAgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLFxyXG4gIG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgbW9kYWxDYW5jZWxUZXh0LFxyXG4gIG1vZGFsQ29uZmlybVRleHQsXHJcbiAgbW9kYWxCb2R5LFxyXG4gIGNhbWVyYUlucHV0UmVmLFxyXG4gIGdhbGxlcnlJbnB1dFJlZixcclxuICBzb3VyY2VQaWNrZXJPcGVuLFxyXG4gIHF1aWNrVGlja2V0QnVzeSxcclxuICBxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSxcclxuICBxdWlja1RpY2tldFByb2dyZXNzU3RhZ2VzLFxyXG4gIHF1aWNrVGlja2V0RWxhcHNlZE1zLFxyXG4gIHF1aWNrVGlja2V0RXJyb3JNZXNzYWdlLFxyXG4gIHF1aWNrVGlja2V0QXR0ZW1wdElkLFxyXG4gIHF1aWNrVGlja2V0VHJhY2VMaXN0LFxyXG4gIGhhc1BlbmRpbmdVcGxvYWRSZXRyeSxcclxuICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZSxcclxuICBvbkNvbmZpcm0sXHJcbiAgb25DYW5jZWwsXHJcbiAgb25TZWxlY3RlZENhbWVyYUZpbGUsXHJcbiAgb25TZWxlY3RlZEdhbGxlcnlGaWxlLFxyXG4gIG9uU2VsZWN0RnJvbUNhbWVyYSxcclxuICBvblNlbGVjdEZyb21HYWxsZXJ5LFxyXG4gIG9uQ2xvc2VTb3VyY2VQaWNrZXIsXHJcbiAgb25SZXRyeVBlbmRpbmdVcGxvYWQsXHJcbiAgb25PcGVuQ3JlYXRlZFRpY2tldCxcclxuICBvbkNsZWFyUXVpY2tUaWNrZXRFcnJvcixcclxufTogRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXNQcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8Q29uZmlybU1vZGFsXHJcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cclxuICAgICAgICB0aXRsZT17bW9kYWwudGl0bGV9XHJcbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cclxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cclxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbENhbmNlbFRleHR9XHJcbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsTG9hZGluZ1RleHR9XHJcbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cclxuICAgICAgICBzaG93Q29uZmlybT17bW9kYWwuc2hvd0NvbmZpcm19XHJcbiAgICAgICAgYnVzeT17YnVzeSB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGV9XHJcbiAgICAgICAgZXJyb3I9e21vZGFsRXJyb3J9XHJcbiAgICAgICAgc3RhdHVzPXtzdGF0dXN9XHJcbiAgICAgICAgb25Db25maXJtPXtvbkNvbmZpcm19XHJcbiAgICAgICAgb25DYW5jZWw9e29uQ2FuY2VsfVxyXG4gICAgICA+XHJcbiAgICAgICAge21vZGFsQm9keX1cclxuICAgICAgPC9Db25maXJtTW9kYWw+XHJcblxyXG4gICAgICA8aW5wdXRcclxuICAgICAgICByZWY9e2NhbWVyYUlucHV0UmVmfVxyXG4gICAgICAgIHR5cGU9XCJmaWxlXCJcclxuICAgICAgICBhY2NlcHQ9e1RJQ0tFVF9JTUFHRV9BQ0NFUFRfQVRUUklCVVRFfVxyXG4gICAgICAgIGNhcHR1cmU9XCJlbnZpcm9ubWVudFwiXHJcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcclxuICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBmaWxlID0gZXZlbnQuY3VycmVudFRhcmdldC5maWxlcz8uWzBdIHx8IG51bGw7XHJcbiAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgIG9uU2VsZWN0ZWRDYW1lcmFGaWxlKGZpbGUpO1xyXG4gICAgICAgIH19XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICA8aW5wdXRcclxuICAgICAgICByZWY9e2dhbGxlcnlJbnB1dFJlZn1cclxuICAgICAgICB0eXBlPVwiZmlsZVwiXHJcbiAgICAgICAgYWNjZXB0PXtUSUNLRVRfSU1BR0VfQUNDRVBUX0FUVFJJQlVURX1cclxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxyXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGZpbGUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmZpbGVzPy5bMF0gfHwgbnVsbDtcclxuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgb25TZWxlY3RlZEdhbGxlcnlGaWxlKGZpbGUpO1xyXG4gICAgICAgIH19XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICB7c291cmNlUGlja2VyT3BlbiA/IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctc2xhdGUtOTUwLzQ1IHB4LTQgcHktNlwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctc20gcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUgcC00IHNoYWRvdy14bFwiPlxyXG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1bMTZweF0gZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTgwMFwiPlxyXG4gICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX1RpdGxlXCIsIFwiTnVldm8gdGlja2V0XCIpfVxyXG4gICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0xIHRleHQtc20gdGV4dC1zbGF0ZS02MDBcIj5cclxuICAgICAgICAgICAgICB7aW5kVChcclxuICAgICAgICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX0JvZHlcIixcclxuICAgICAgICAgICAgICAgIFwiU2VsZWNjaW9uYSB1bmEgZnVlbnRlIHBhcmEgY2FwdHVyYXIgbyBlbGVnaXIgbGEgaW1hZ2VuIGRlbCB0aWNrZXQuXCJcclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L3A+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgZ3JpZCBncmlkLWNvbHMtMSBnYXAtMlwiPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiIG9uQ2xpY2s9e29uU2VsZWN0RnJvbUNhbWVyYX0+XHJcbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9DYW1lcmFcIiwgXCJVc2FyIGNcdTAwRTFtYXJhXCIpfVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiIG9uQ2xpY2s9e29uU2VsZWN0RnJvbUdhbGxlcnl9PlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfR2FsbGVyeVwiLCBcIkVsZWdpciBpbWFnZW5cIil9XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCIgb25DbGljaz17b25DbG9zZVNvdXJjZVBpY2tlcn0+XHJcbiAgICAgICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIil9XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgPEV4cGVuc2VRdWlja1RpY2tldFByb2dyZXNzT3ZlcmxheVxyXG4gICAgICAgIG9wZW49e3F1aWNrVGlja2V0QnVzeX1cclxuICAgICAgICB0aXRsZT17aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX1RpdGxlXCIsIFwiUHJvY2Vzc2luZyB0aWNrZXRcIil9XHJcbiAgICAgICAgc3VtbWFyeT17cXVpY2tUaWNrZXRQcm9ncmVzc01lc3NhZ2UgfHwgaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cclxuICAgICAgICBlbGFwc2VkTXM9e3F1aWNrVGlja2V0RWxhcHNlZE1zfVxyXG4gICAgICAgIHN0YWdlcz17cXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlc31cclxuICAgICAgLz5cclxuXHJcbiAgICAgIHtxdWlja1RpY2tldEVycm9yTWVzc2FnZSA/IChcclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZVxyXG4gICAgICAgICAgICAgID8gXCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBzcGFjZS15LTIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1hbWJlci0yMDAgYmctYW1iZXItNTAgcC0zIHRleHQtc20gdGV4dC1hbWJlci05MDBcIlxyXG4gICAgICAgICAgICAgIDogXCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBzcGFjZS15LTIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy1yb3NlLTUwIHAtMyB0ZXh0LXNtIHRleHQtcm9zZS04MDBcIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxwPntxdWlja1RpY2tldEVycm9yTWVzc2FnZX08L3A+XHJcbiAgICAgICAgICB7cXVpY2tUaWNrZXRBdHRlbXB0SWQgPyAoXHJcbiAgICAgICAgICAgIDxwXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcclxuICAgICAgICAgICAgICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlXHJcbiAgICAgICAgICAgICAgICAgID8gXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLWFtYmVyLTIwMCBiZy13aGl0ZSBweC0yIHB5LTEgZm9udC1tb25vIHRleHQtWzExcHhdIHRleHQtYW1iZXItOTAwIGJyZWFrLWFsbFwiXHJcbiAgICAgICAgICAgICAgICAgIDogXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXdoaXRlIHB4LTIgcHktMSBmb250LW1vbm8gdGV4dC1bMTFweF0gdGV4dC1yb3NlLTgwMCBicmVhay1hbGxcIlxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtgYXR0ZW1wdElkOiAke3F1aWNrVGlja2V0QXR0ZW1wdElkfWB9XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICAgICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmVcclxuICAgICAgICAgICAgICAgICAgPyBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItYW1iZXItMjAwIGJnLXdoaXRlIHAtMiB0ZXh0LXhzIHRleHQtYW1iZXItODAwXCJcclxuICAgICAgICAgICAgICAgICAgOiBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctd2hpdGUgcC0yIHRleHQteHMgdGV4dC1yb3NlLTcwMFwiXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lm1hcCgoZW50cnkpID0+IChcclxuICAgICAgICAgICAgICAgIDxwIGtleT17YCR7ZW50cnkuc3RlcH0tJHtlbnRyeS5hdH1gfT57YCR7ZW50cnkuc3RlcH06ICR7ZW50cnkudHJhY2VJZH1gfTwvcD5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTJcIj5cclxuICAgICAgICAgICAge2hhc1BhcnRpYWxUaWNrZXRGYWlsdXJlID8gKFxyXG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIiBvbkNsaWNrPXtvbk9wZW5DcmVhdGVkVGlja2V0fT5cclxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfT3BlbkNyZWF0ZWRUaWNrZXRcIiwgXCJPcGVuIGNyZWF0ZWQgdGlja2V0XCIpfVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAge2hhc1BlbmRpbmdVcGxvYWRSZXRyeSA/IChcclxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCIgb25DbGljaz17b25SZXRyeVBlbmRpbmdVcGxvYWR9PlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9SZXRyeVVwbG9hZFwiLCBcIlJlaW50ZW50YXIgdXBsb2FkXCIpfVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gcHgtMyBweS0xLjUgdGV4dC14c1wiIG9uQ2xpY2s9e29uQ2xlYXJRdWlja1RpY2tldEVycm9yfT5cclxuICAgICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9DbG9zZVwiLCBcIkNsb3NlXCIpfVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuICAgIDwvPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXREZXRhaWxPdmVybGF5cztcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW0gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nQWN0aW9uQnV0dG9uLnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VBdXRoQ29udGV4dCB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VUaW1lbGluZUNhcmRFZmZlY3RzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRpbWVsaW5lQ2FyZEVmZmVjdHMudHNcIjtcclxuaW1wb3J0IHsgdXNlQ29uZmlybURpYWxvZyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBpbmRGb3JtYXQsIGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlTnVtYmVyIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcclxuaW1wb3J0IHsgY29uZmlndXJlRXhwZW5zZUFwaUF1dGggfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQgeyBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VNYW5hZ2VkVXNlclNjb3BlLnRzXCI7XHJcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsLCByZWxvYWRFeHBlbnNlUGFnZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQudHNcIjtcclxuaW1wb3J0IHsgZ2V0RXhwZW5zZVN0YXR1c0xhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlU3RhdHVzQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlIH0gZnJvbSBcIi4uL2xpc3QvdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlLnRzXCI7XHJcblxyXG5jb25zdCBMSU5FU19QQUdFX1NJWkUgPSA2O1xyXG5jb25zdCBFWFBFTlNFX1NUQVRVU19BUFBST1ZBTF9SRVFVRVNURUQgPSAxO1xyXG5cclxuY29uc3QgcGFnZWRTbGljZSA9IDxULD4oaXRlbXM6IFRbXSwgcGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyKTogVFtdID0+IHtcclxuICBpZiAoIWl0ZW1zLmxlbmd0aCkgcmV0dXJuIFtdO1xyXG4gIGNvbnN0IHNhZmVQYWdlID0gTWF0aC5tYXgoMSwgcGFnZSk7XHJcbiAgY29uc3Qgc3RhcnQgPSAoc2FmZVBhZ2UgLSAxKSAqIHBhZ2VTaXplO1xyXG4gIHJldHVybiBpdGVtcy5zbGljZShzdGFydCwgc3RhcnQgKyBwYWdlU2l6ZSk7XHJcbn07XHJcblxyXG4vLyBUcmVhdHMgb25seSBwb3NpdGl2ZSBudW1lcmljIHRvdGFscyBhcyBhY3Rpb25hYmxlIHNoZWV0IGNvbnRlbnQuXHJcbmNvbnN0IGhhc1Bvc2l0aXZlVG90YWxBbW91bnQgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSAmJiBwYXJzZWQgPiAwO1xyXG59O1xyXG5cclxuY29uc3QgTmV3VGlja2V0SWNvbiA9ICgpID0+IChcclxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsxLjV9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzTmFtZT1cImgtNSB3LTVcIj5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTEwIDIwaC01YTIgMiAwIDAgMSAtMiAtMnYtOWEyIDIgMCAwIDEgMiAtMmgxYTIgMiAwIDAgMCAyIC0yYTEgMSAwIDAgMSAxIC0xaDZhMSAxIDAgMCAxIDEgMWEyIDIgMCAwIDAgMiAyaDFhMiAyIDAgMCAxIDIgMnYyXCIgLz5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0LjM2MiAxMS4xNWEzIDMgMCAxIDAgLTQuMTQ0IDQuMjYzXCIgLz5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDIxdi00YTIgMiAwIDEgMSA0IDB2NFwiIC8+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAxOWg0XCIgLz5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTIxIDE1djZcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgTGlua1RpY2tldEljb24gPSAoKSA9PiAoXHJcbiAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD17MS41fSBhcmlhLWhpZGRlbj1cInRydWVcIiBjbGFzc05hbWU9XCJoLTUgdy01XCI+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xMy4xOSA4LjY4OGE0LjUgNC41IDAgMCAxIDEuMjQyIDcuMjQ0bC00LjUgNC41YTQuNSA0LjUgMCAwIDEtNi4zNjQtNi4zNjRsMS43NTctMS43NTdtMTMuMzUtLjYyMiAxLjc1Ny0xLjc1N2E0LjUgNC41IDAgMCAwLTYuMzY0LTYuMzY0bC00LjUgNC41YTQuNSA0LjUgMCAwIDAgMS4yNDIgNy4yNDRcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgTmV3TGluZUljb24gPSAoKSA9PiAoXHJcbiAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD17MS41fSBhcmlhLWhpZGRlbj1cInRydWVcIiBjbGFzc05hbWU9XCJoLTUgdy01XCI+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0zIDE5YzMuMzMzIC0yIDUgLTQgNSAtNmMwIC0zIC0xIC0zIC0yIC0zcy0yLjAzMiAxLjA4NSAtMiAzYy4wMzQgMi4wNDggMS42NTggMi44NzcgMi41IDRjMS41IDIgMi41IDIuNSAzLjUgMWMuNjY3IC0xIDEuMTY3IC0xLjgzMyAxLjUgLTIuNWMxIDIuMzMzIDIuMzMzIDMuNSA0IDMuNWgyLjVcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMjAgMTd2LTEyYzAgLTEuMTIxIC0uODc5IC0yIC0yIC0ycy0yIC44NzkgLTIgMnYxMmwyIDJsMiAtMlwiIC8+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNiA3aDRcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxyXG5leHBvcnQgY29uc3QgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGggPSAoKSA9PiB7XHJcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgoe1xyXG4gICAgdG9rZW46IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXHJcbiAgICBlbnRyYU9pZDogc2FmZVRleHQod2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcclxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUFBfQ09ERV9fKSxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIE93bnMgdGhlIGRldGFpbC1wYWdlIG9yY2hlc3RyYXRpb24gYW5kIGtlZXBzIHRoZSB2aWV3IGNvbXBvbmVudCBmb2N1c2VkIG9uIHJlbmRlcmluZy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250cm9sbGVyID0gKCkgPT4ge1xyXG4gIGNvbnN0IHtcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICB9ID0gdXNlQXV0aENvbnRleHQoKTtcclxuICBjb25zdCBoYXNBY2Nlc3MgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIlZpZXdcIik7XHJcbiAgY29uc3QgY2FuQ3JlYXRlRXhwZW5zZSA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiQWRkXCIpO1xyXG4gIGNvbnN0IHNoZWV0SWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1NIRUVUX0lEX18pO1xyXG4gIGNvbnN0IHNoZWV0TW9kZSA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfU0hFRVRfTU9ERV9fKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGNvbnN0IGlzQ3JlYXRlTW9kZSA9IHNoZWV0TW9kZSA9PT0gXCJjcmVhdGVcIjtcclxuICBjb25zdCBpc01hbmFnaW5nT3RoZXJVc2VyQnlTZWxlY3Rpb24gPSBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkKHtcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICByZWNvcmRPd25lclVzZXJJZDogXCJcIixcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICB9KTtcclxuICBjb25zdCBjYW5DcmVhdGVFeHBlbnNlRm9yU2VsZWN0ZWRDb250ZXh0ID0gY2FuQ3JlYXRlRXhwZW5zZSAmJiAhaXNNYW5hZ2luZ090aGVyVXNlckJ5U2VsZWN0aW9uO1xyXG4gIGNvbnN0IGxpbmVDb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBjcmVhdGVkU2hlZXRJZFJlZiA9IHVzZVJlZihcIlwiKTtcclxuICBjb25zdCBjYW1lcmFJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgZ2FsbGVyeUlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLCBzZXRJc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzdGF0dXNUcmFuc2l0aW9uQ29tbWVudCwgc2V0U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3Nob3dTdGF0dXNUcmFuc2l0aW9uQ29tbWVudEZpZWxkLCBzZXRTaG93U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRGaWVsZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3Qgc3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRSZWYgPSB1c2VSZWYoXCJcIik7XHJcblxyXG4gIGNvbnN0IHBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gKHtcclxuICAgICAgZmlyc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfRmlyc3RcIiwgXCJGaXJzdFwiKSxcclxuICAgICAgcHJldjogaW5kVChcIkhpc3RvcnlfUGFnZV9QcmV2XCIsIFwiUHJldmlvdXNcIiksXHJcbiAgICAgIG5leHQ6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIiksXHJcbiAgICAgIGxhc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTGFzdFwiLCBcIkxhc3RcIiksXHJcbiAgICB9KSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgZGV0YWlsU3RhdGUgPSB1c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZSh7XHJcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBjYW5DcmVhdGVFeHBlbnNlOiBjYW5DcmVhdGVFeHBlbnNlRm9yU2VsZWN0ZWRDb250ZXh0LFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgc2hlZXRJZCxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCB7XHJcbiAgICBoZWFkZXIsXHJcbiAgICBsaW5lcyxcclxuICAgIGxpbmVQYWdlLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgYnVzeSxcclxuICAgIHN0YXR1cyxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIG1vZGFsRXJyb3IsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsXHJcbiAgICBwcm9qZWN0VmFsdWUsXHJcbiAgICBkZXRhaWxQb2xpY3ksXHJcbiAgICBpc01hbmFnaW5nT3RoZXJVc2VyLFxyXG4gICAgaXNTaGVldExvY2tlZCxcclxuICAgIGV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gICAgc2hvd0V4Y2hhbmdlUmF0ZSxcclxuICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxyXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LFxyXG4gICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXHJcbiAgICBjYW5FZGl0QW55Q3VycmVudCxcclxuICAgIGNhblVzZUZ1bGxFZGl0RmVhdHVyZXMsXHJcbiAgICBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcclxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxyXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gICAgc2V0TGluZVBhZ2UsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBzZXREcmFmdFByb2plY3RJZCxcclxuICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICBzZXREcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUsXHJcbiAgICBoYW5kbGVPcGVuTGlua1RpY2tldE1vZGUsXHJcbiAgICBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0LFxyXG4gICAgbmF2aWdhdGVUb0xpbmVEZXRhaWwsXHJcbiAgfSA9IGRldGFpbFN0YXRlO1xyXG5cclxuICBjb25zdCBjYW5DcmVhdGVFeHBlbnNlRm9yQ3VycmVudFZpZXcgPSBjYW5DcmVhdGVFeHBlbnNlICYmICFpc01hbmFnaW5nT3RoZXJVc2VyO1xyXG4gIGNvbnN0IGNhbkRlbGV0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyA9IGRldGFpbFBvbGljeS5jYW5EZWxldGVTaGVldDtcclxuICBjb25zdCBjYW5UcmFuc2l0aW9uU3RhdHVzID0gZGV0YWlsUG9saWN5LnN0YXR1c0FjdGlvbnMubGVuZ3RoID4gMDtcclxuICBjb25zdCBpc1JlYWRPbmx5TW9kZSA9IGRldGFpbFBvbGljeS5pbnRlcmFjdGlvbk1vZGUgPT09IFwicmVhZF9vbmx5XCI7XHJcbiAgY29uc3QgY3VycmVudFN0YXR1c0NvZGUgPSB0eXBlb2YgaGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMgPT09IFwibnVtYmVyXCIgPyBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzIDogbnVsbDtcclxuICBjb25zdCBoaWRlc0NydWRUb3BiYXJCeVN0YXR1cyA9XHJcbiAgICBjdXJyZW50U3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfQVBQUk9WQUxfUkVRVUVTVEVEICYmICFjYW5FZGl0QW55Q3VycmVudDtcclxuICBjb25zdCB0b3BiYXJBY3Rpb25Nb2RlID0gIWlzQ3JlYXRlTW9kZSAmJiAoaXNSZWFkT25seU1vZGUgfHwgaGlkZXNDcnVkVG9wYmFyQnlTdGF0dXMpID8gXCJ2aWV3X29ubHlcIiA6IFwiZGVmYXVsdFwiO1xyXG4gIGNvbnN0IGRldGFpbFBlcm1pc3Npb25zUmVhZHkgPSBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHkgJiYgKGlzQ3JlYXRlTW9kZSB8fCAhIWhlYWRlcik7XHJcbiAgY29uc3QgeyBpbnZhbGlkYXRlQ2FjaGVkTGlzdEZvclJlZmV0Y2ggfSA9IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZSgpO1xyXG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHJlc2V0U3RhdHVzVHJhbnNpdGlvbkRpYWxvZyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHN0YXR1c1RyYW5zaXRpb25Db21tZW50UmVmLmN1cnJlbnQgPSBcIlwiO1xyXG4gICAgc2V0U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnQoXCJcIik7XHJcbiAgICBzZXRTaG93U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRGaWVsZChmYWxzZSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDbG9zZUNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICByZXNldFN0YXR1c1RyYW5zaXRpb25EaWFsb2coKTtcclxuICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gIH0sIFtjbG9zZUNvbmZpcm0sIHJlc2V0U3RhdHVzVHJhbnNpdGlvbkRpYWxvZ10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbENvbmZpcm0gPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XHJcbiAgICAgICAgc2V0U3RhdHVzKG1zZyk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9LCBbYnVzeSwgaGFuZGxlQ29uZmlybSwgc2V0TW9kYWxFcnJvciwgc2V0U3RhdHVzXSk7XHJcblxyXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIik7XHJcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGJ1c3lcclxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxyXG4gICAgOiAhYnVzeSAmJiBtb2RhbEVycm9yXHJcbiAgICAgID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpXHJcbiAgICAgIDogKG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcclxuICAgICAgaGFuZGxlQ2xvc2VDb25maXJtKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2b2lkIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xyXG4gIH0sIFtidXN5LCBoYW5kbGVDbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybSwgbW9kYWxFcnJvcl0pO1xyXG5cclxuICBjb25zdCB2aXNpYmxlTGluZXMgPSB1c2VNZW1vKCgpID0+IHBhZ2VkU2xpY2UobGluZXMsIGxpbmVQYWdlLCBMSU5FU19QQUdFX1NJWkUpLCBbbGluZVBhZ2UsIGxpbmVzXSk7XHJcbiAgY29uc3QgdG90YWxMaW5lUGFnZXMgPSBNYXRoLmNlaWwoKGxpbmVzLmxlbmd0aCB8fCAwKSAvIExJTkVTX1BBR0VfU0laRSk7XHJcbiAgY29uc3QgdG90YWxBbW91bnRUZXh0ID0gdXNlTWVtbyhcclxuICAgICgpID0+XHJcbiAgICAgIGZvcm1hdEV4cGVuc2VOdW1iZXIoaGVhZGVyPy50b3RhbEFtb3VudCwge1xyXG4gICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICAgICAgZmFsbGJhY2s6IFwiLVwiLFxyXG4gICAgICB9KSxcclxuICAgIFtoZWFkZXI/LnRvdGFsQW1vdW50XVxyXG4gICk7XHJcbiAgY29uc3QgaGFzU3RhdHVzQWN0aW9uQ29udGVudCA9IGxpbmVzLmxlbmd0aCA+IDAgfHwgaGFzUG9zaXRpdmVUb3RhbEFtb3VudChoZWFkZXI/LnRvdGFsQW1vdW50KTtcclxuICBjb25zdCBhcmVTdGF0dXNBY3Rpb25zRGlzYWJsZWQgPSAhaGFzU3RhdHVzQWN0aW9uQ29udGVudDtcclxuXHJcbiAgY29uc3QgeyBoYW5kbGVVcGRhdGUsIGhhbmRsZVN0YXR1c1RyYW5zaXRpb24sIGhhbmRsZURlbGV0ZSB9ID0gdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zKHtcclxuICAgIGJ1c3ksXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc0VkaXRMb2NrZWQ6IGlzUmVhZE9ubHlNb2RlLFxyXG4gICAgaXNEZWxldGVMb2NrZWQ6IGlzU2hlZXRMb2NrZWQsXHJcbiAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcclxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcclxuICAgIGxvY2tlZEN1cnJlbmN5Q29kZTogc2FmZVRleHQoaGVhZGVyPy5jdXJyZW5jeUNvZGUpLFxyXG4gICAgbG9ja2VkRXhjaGFuZ2VSYXRlOiBzYWZlVGV4dChoZWFkZXI/LmV4Y2hSYXRlKSxcclxuICAgIGNhbkNyZWF0ZUV4cGVuc2U6IGNhbkNyZWF0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyxcclxuICAgIGNhbkVkaXRFeHBlbnNlOiBjYW5FZGl0QW55Q3VycmVudCxcclxuICAgIGNhbkRlbGV0ZUV4cGVuc2U6IGNhbkRlbGV0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyxcclxuICAgIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50LFxyXG4gICAgY2FuVHJhbnNpdGlvblN0YXR1cyxcclxuICAgIHNoZWV0SWQsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsXHJcbiAgICBkcmFmdFByb2plY3RJZCxcclxuICAgIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICBjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzOiBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyxcclxuICAgIGN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlOiBoZWFkZXI/LmV4Y2hhbmdlUmF0ZU1vZGUsXHJcbiAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXHJcbiAgICBvbkNyZWF0ZVN1Y2Nlc3M6IChjcmVhdGVkU2hlZXRJZCkgPT4ge1xyXG4gICAgICBjcmVhdGVkU2hlZXRJZFJlZi5jdXJyZW50ID0gc2FmZVRleHQoY3JlYXRlZFNoZWV0SWQpO1xyXG4gICAgfSxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVPcGVuTGluZURldGFpbCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKGxpbmVSZWNJZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNhZmVMaW5lSWQgPSBzYWZlVGV4dChsaW5lUmVjSWQpO1xyXG4gICAgICBpZiAoIXNhZmVMaW5lSWQgfHwgYnVzeSB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQpIHtcclxuICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZVVwZGF0ZSgpO1xyXG4gICAgICAgIGlmICghb2spIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsKHNhZmVMaW5lSWQsIHtcclxuICAgICAgICAgIG1vZGU6IFwiZWRpdFwiLFxyXG4gICAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcclxuICAgICAgICAgIGJ5cGFzc0d1YXJkT25jZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsKHNhZmVMaW5lSWQpO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgYnVzeSxcclxuICAgICAgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXHJcbiAgICAgIGhhbmRsZVVwZGF0ZSxcclxuICAgICAgaXNFZGl0aW5nLFxyXG4gICAgICBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsXHJcbiAgICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNhdmVTdWNjZXNzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICBjb25zdCBjcmVhdGVkU2hlZXRJZCA9IHNhZmVUZXh0KGNyZWF0ZWRTaGVldElkUmVmLmN1cnJlbnQpO1xyXG4gICAgICBpZiAoIWNyZWF0ZWRTaGVldElkKSByZXR1cm47XHJcbiAgICAgIHNldElzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSh0cnVlKTtcclxuICAgICAgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldChjcmVhdGVkU2hlZXRJZCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICByZWxvYWRFeHBlbnNlUGFnZSgpO1xyXG4gIH0sIFtpc0NyZWF0ZU1vZGUsIG5hdmlnYXRlVG9DcmVhdGVkU2hlZXRdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU3RhdHVzQWN0aW9uQ2xpY2sgPSB1c2VDYWxsYmFjayhcclxuICAgIChhY3Rpb246IHsgbGFiZWxLZXk6IHN0cmluZzsgZmFsbGJhY2s6IHN0cmluZzsgbmV4dFN0YXR1czogbnVtYmVyIH0pID0+IHtcclxuICAgICAgaWYgKCFoYXNTdGF0dXNBY3Rpb25Db250ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBhY3Rpb25MYWJlbCA9IGluZFQoYWN0aW9uLmxhYmVsS2V5LCBhY3Rpb24uZmFsbGJhY2spO1xyXG4gICAgICBjb25zdCBjdXJyZW50U3RhdHVzTGFiZWwgPVxyXG4gICAgICAgIGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzID09PSBudWxsIHx8IGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzID09PSB1bmRlZmluZWRcclxuICAgICAgICAgID8gaW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpXHJcbiAgICAgICAgICA6IGdldEV4cGVuc2VTdGF0dXNMYWJlbChoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzKTtcclxuICAgICAgY29uc3QgbmV4dFN0YXR1c0xhYmVsID0gZ2V0RXhwZW5zZVN0YXR1c0xhYmVsKGFjdGlvbi5uZXh0U3RhdHVzKTtcclxuICAgICAgY29uc3QgdHJhbnNpdGlvbk1lc3NhZ2UgPSBpbmRGb3JtYXQoXHJcbiAgICAgICAgXCJFeHBlbnNlU2hlZXRzX0JvdHRvbUFjdGlvbnNfQ29uZmlybVRyYW5zaXRpb25cIixcclxuICAgICAgICBcIkN1cnJlbnQgc3RhdHVzOiB7MH1cXG5OZXcgc3RhdHVzOiB7MX1cXG5cXG5EbyB5b3Ugd2FudCB0byB1cGRhdGUgdGhlIGV4cGVuc2Ugc2hlZXQgc3RhdHVzP1wiLFxyXG4gICAgICAgIGN1cnJlbnRTdGF0dXNMYWJlbCxcclxuICAgICAgICBuZXh0U3RhdHVzTGFiZWxcclxuICAgICAgKS5yZXBsYWNlKC9cXFxcbi9nLCBcIlxcblwiKTtcclxuICAgICAgY29uc3QgaW5pdGlhbENvbW1lbnQgPSBzYWZlVGV4dChoZWFkZXI/LmVzdGFkb0NvbWVudGFyaW9zKTtcclxuICAgICAgc3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRSZWYuY3VycmVudCA9IGluaXRpYWxDb21tZW50O1xyXG4gICAgICBzZXRTdGF0dXNUcmFuc2l0aW9uQ29tbWVudChpbml0aWFsQ29tbWVudCk7XHJcbiAgICAgIHNldFNob3dTdGF0dXNUcmFuc2l0aW9uQ29tbWVudEZpZWxkKHRydWUpO1xyXG5cclxuICAgICAgb3BlbkNvbmZpcm0oe1xyXG4gICAgICAgIHRpdGxlOiBhY3Rpb25MYWJlbCxcclxuICAgICAgICBtZXNzYWdlOiB0cmFuc2l0aW9uTWVzc2FnZSxcclxuICAgICAgICBjb25maXJtVGV4dDogYWN0aW9uTGFiZWwsXHJcbiAgICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZVN0YXR1c1RyYW5zaXRpb24oXHJcbiAgICAgICAgICAgIGFjdGlvbi5uZXh0U3RhdHVzLFxyXG4gICAgICAgICAgICBhY3Rpb25MYWJlbCxcclxuICAgICAgICAgICAgc3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRSZWYuY3VycmVudFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGlmIChvaykge1xyXG4gICAgICAgICAgICBpbnZhbGlkYXRlQ2FjaGVkTGlzdEZvclJlZmV0Y2goKTtcclxuICAgICAgICAgICAgcmVzZXRTdGF0dXNUcmFuc2l0aW9uRGlhbG9nKCk7XHJcbiAgICAgICAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICAgICAgICByZWxvYWRFeHBlbnNlUGFnZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG9rO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgY2xvc2VDb25maXJtLFxyXG4gICAgICBoYW5kbGVTdGF0dXNUcmFuc2l0aW9uLFxyXG4gICAgICBoYXNTdGF0dXNBY3Rpb25Db250ZW50LFxyXG4gICAgICBoZWFkZXI/LmVzdGFkb0NvbWVudGFyaW9zLFxyXG4gICAgICBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyxcclxuICAgICAgaW52YWxpZGF0ZUNhY2hlZExpc3RGb3JSZWZldGNoLFxyXG4gICAgICBvcGVuQ29uZmlybSxcclxuICAgICAgcmVzZXRTdGF0dXNUcmFuc2l0aW9uRGlhbG9nLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIHVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMoe1xyXG4gICAgYnVzeTogYnVzeSB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsXHJcbiAgICBtb2RhbE9wZW46IG1vZGFsLm9wZW4sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBhY3Rpb25Nb2RlOiB0b3BiYXJBY3Rpb25Nb2RlLFxyXG4gICAgaXNMb2NrZWQ6IGlzU2hlZXRMb2NrZWQsXHJcbiAgICBpc0VkaXRMb2NrZWQ6IGlzUmVhZE9ubHlNb2RlLFxyXG4gICAgaXNEZWxldGVMb2NrZWQ6IGlzU2hlZXRMb2NrZWQsXHJcbiAgICBwZXJtaXNzaW9uc1JlYWR5OiBkZXRhaWxQZXJtaXNzaW9uc1JlYWR5LFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogY2FuQ3JlYXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxyXG4gICAgY2FuRWRpdEV4cGVuc2U6IGNhbkVkaXRBbnlDdXJyZW50LFxyXG4gICAgY2FuRGVsZXRlRXhwZW5zZTogY2FuRGVsZXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgb25TYXZlU3VjY2VzczogaGFuZGxlU2F2ZVN1Y2Nlc3MsXHJcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgaW52YWxpZGF0ZUNhY2hlZExpc3RGb3JSZWZldGNoKCk7XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXRzXCIpO1xyXG4gICAgfSxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xyXG4gICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcclxuICAgIGNvbnN0IGNhcmQgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiKTtcclxuICAgIGlmICghY2FyZCkgcmV0dXJuIG51bGw7XHJcbiAgICBpZiAoIWxpbmVDb250YWluZXJSZWYuY3VycmVudD8uY29udGFpbnMoY2FyZCkpIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIGNhcmQ7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VUaW1lbGluZUNhcmRFZmZlY3RzKHtcclxuICAgIGNvbnRhaW5lclJlZjogbGluZUNvbnRhaW5lclJlZixcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGl0ZW1zOiB2aXNpYmxlTGluZXMsXHJcbiAgICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgcXVpY2tUaWNrZXRGbG93ID0gdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93KHtcclxuICAgIHNoZWV0SWQ6IHNhZmVUZXh0KGhlYWRlcj8uaG9qYUdhc3Rvc0lkIHx8IHNoZWV0SWQpLFxyXG4gICAgcHJvamVjdElkOiBwcm9qZWN0VmFsdWUsXHJcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSxcclxuICAgIGNhbkNyZWF0ZUV4cGVuc2U6ICFpc0NyZWF0ZU1vZGUgJiYgZGV0YWlsUG9saWN5LnNob3dGYWIsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc1NoZWV0TG9ja2VkOiAhY2FuVXNlRnVsbEVkaXRGZWF0dXJlcyxcclxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxyXG4gICAgb25Db21wbGV0ZWQ6IChyZXN1bHQpID0+IHtcclxuICAgICAgY29uc3QgY3JlYXRlZEZpbGVJZCA9IHNhZmVUZXh0KHJlc3VsdD8uZmlsZUlkKTtcclxuICAgICAgaWYgKCFjcmVhdGVkRmlsZUlkKSB7XHJcbiAgICAgICAgcmVsb2FkRXhwZW5zZVBhZ2UoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGN1cnJlbnRTaGVldElkID0gc2FmZVRleHQoaGVhZGVyPy5ob2phR2FzdG9zSWQgfHwgc2hlZXRJZCk7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XHJcbiAgICAgICAgZmlsZUlkOiBjcmVhdGVkRmlsZUlkLFxyXG4gICAgICAgIG1vZGU6IFwiZWRpdFwiLFxyXG4gICAgICAgIG9yaWdpbjogXCJzaGVldC1jcmVhdGVcIixcclxuICAgICAgfSk7XHJcbiAgICAgIGlmIChjdXJyZW50U2hlZXRJZCkge1xyXG4gICAgICAgIHNhdmVFeHBlbnNlVGlja2V0UmV0dXJuQ29udGV4dCh7XHJcbiAgICAgICAgICBmaWxlSWQ6IGNyZWF0ZWRGaWxlSWQsXHJcbiAgICAgICAgICBvcmlnaW46IFwic2hlZXQtY3JlYXRlXCIsXHJcbiAgICAgICAgICBzaGVldElkOiBjdXJyZW50U2hlZXRJZCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBxdWVyeS5zZXQoXCJzaGVldElkXCIsIGN1cnJlbnRTaGVldElkKTtcclxuICAgICAgfVxyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXREZXRhaWw/JHtxdWVyeS50b1N0cmluZygpfWApO1xyXG4gICAgfSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZmFiTWVudUl0ZW1zID0gdXNlTWVtbzxGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtW10+KFxyXG4gICAgKCkgPT4gW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IFwibmV3LXRpY2tldFwiLFxyXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfTmV3VGlja2V0XCIsIFwiTnVldm8gVGlja2V0XCIpLFxyXG4gICAgICAgIGljb246IDxOZXdUaWNrZXRJY29uIC8+LFxyXG4gICAgICAgIG9uQ2xpY2s6IHF1aWNrVGlja2V0Rmxvdy5vcGVuU291cmNlUGlja2VyLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IFwibGluay10aWNrZXRcIixcclxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX0xpbmtUaWNrZXRcIiwgXCJWaW5jdWxhciBUaWNrZXRcIiksXHJcbiAgICAgICAgaWNvbjogPExpbmtUaWNrZXRJY29uIC8+LFxyXG4gICAgICAgIG9uQ2xpY2s6IGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSxcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiBcIm5ldy1saW5lXCIsXHJcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9OZXdMaW5lXCIsIFwiTnVldmEgTGluZWFcIiksXHJcbiAgICAgICAgaWNvbjogPE5ld0xpbmVJY29uIC8+LFxyXG4gICAgICAgIG9uQ2xpY2s6IGhhbmRsZU9wZW5DcmVhdGVMaW5lTW9kZSxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgICBbaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlLCBoYW5kbGVPcGVuTGlua1RpY2tldE1vZGUsIHF1aWNrVGlja2V0Rmxvdy5vcGVuU291cmNlUGlja2VyXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHNob3dTdGF0dXNBY3Rpb25CYXIgPVxyXG4gICAgIWlzQ3JlYXRlTW9kZSAmJiAhaXNMb2FkaW5nICYmICFpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUgJiYgIWVycm9yTWVzc2FnZSAmJiBkZXRhaWxQb2xpY3kuc3RhdHVzQWN0aW9ucy5sZW5ndGggPiAwO1xyXG4gIGNvbnN0IHNob3dGYWIgPSAhaXNDcmVhdGVNb2RlICYmIGRldGFpbFBvbGljeS5zaG93RmFiO1xyXG4gIGNvbnN0IGhhc1Zpc2libGVTdGF0dXNDb21tZW50ID0gc2FmZVRleHQoaGVhZGVyPy5lc3RhZG9Db21lbnRhcmlvcykudHJpbSgpLmxlbmd0aCA+IDA7XHJcbiAgY29uc3Qgc3RhdHVzQ29tbWVudE1vZGU6IFwiaGlkZGVuXCIgfCBcInJlYWRcIiA9IGhhc1Zpc2libGVTdGF0dXNDb21tZW50ID8gXCJyZWFkXCIgOiBcImhpZGRlblwiO1xyXG4gIGNvbnN0IG1vZGFsQm9keSA9IHNob3dTdGF0dXNUcmFuc2l0aW9uQ29tbWVudEZpZWxkID8gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxyXG4gICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+XHJcbiAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1N0YXR1c0NvbW1lbnRcIiwgXCJTdGF0dXMgY29tbWVudFwiKX1cclxuICAgICAgPC9sYWJlbD5cclxuICAgICAgPHRleHRhcmVhXHJcbiAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIHJlc2l6ZS1ub25lXCJcclxuICAgICAgICByb3dzPXszfVxyXG4gICAgICAgIHZhbHVlPXtzdGF0dXNUcmFuc2l0aW9uQ29tbWVudH1cclxuICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBuZXh0VmFsdWUgPSBldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIjtcclxuICAgICAgICAgIHN0YXR1c1RyYW5zaXRpb25Db21tZW50UmVmLmN1cnJlbnQgPSBuZXh0VmFsdWU7XHJcbiAgICAgICAgICBzZXRTdGF0dXNUcmFuc2l0aW9uQ29tbWVudChuZXh0VmFsdWUpO1xyXG4gICAgICAgIH19XHJcbiAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzQ29tbWVudFwiLCBcIlN0YXR1cyBjb21tZW50XCIpfVxyXG4gICAgICAvPlxyXG4gICAgPC9kaXY+XHJcbiAgKSA6IG51bGw7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoZWFkZXIsXHJcbiAgICB2aXNpYmxlTGluZXMsXHJcbiAgICBsaW5lUGFnZSxcclxuICAgIHRvdGFsTGluZVBhZ2VzLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgYnVzeSxcclxuICAgIHN0YXR1cyxcclxuICAgIG1vZGFsRXJyb3IsXHJcbiAgICBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsXHJcbiAgICBtb2RhbCxcclxuICAgIG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgICBtb2RhbENhbmNlbFRleHQsXHJcbiAgICBtb2RhbENvbmZpcm1UZXh0LFxyXG4gICAgbW9kYWxCb2R5LFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxyXG4gICAgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXHJcbiAgICBjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzLFxyXG4gICAgc2hvd1N0YXR1c0FjdGlvbkJhcixcclxuICAgIHNob3dGYWIsXHJcbiAgICBhcmVTdGF0dXNBY3Rpb25zRGlzYWJsZWQsXHJcbiAgICBmYWJNZW51SXRlbXMsXHJcbiAgICBwYWdpbmF0aW9uTGFiZWxzLFxyXG4gICAgdG90YWxBbW91bnRUZXh0LFxyXG4gICAgc3RhdHVzQ29tbWVudE1vZGUsXHJcbiAgICBwcm9qZWN0VmFsdWUsXHJcbiAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcclxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcclxuICAgIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudCxcclxuICAgIHNob3dFeGNoYW5nZVJhdGUsXHJcbiAgICBleGNoYW5nZVJhdGVWYWx1ZSxcclxuICAgIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRyYWZ0UHJvamVjdElkLFxyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsXHJcbiAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcclxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcclxuICAgIGRldGFpbFBvbGljeSxcclxuICAgIGxpbmVDb250YWluZXJSZWYsXHJcbiAgICBjYW1lcmFJbnB1dFJlZixcclxuICAgIGdhbGxlcnlJbnB1dFJlZixcclxuICAgIHF1aWNrVGlja2V0RmxvdyxcclxuICAgIHNldExpbmVQYWdlLFxyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICAgIHNldERyYWZ0UHJvamVjdElkLFxyXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIHNldERyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICBuYXZpZ2F0ZVRvTGluZURldGFpbDogaGFuZGxlT3BlbkxpbmVEZXRhaWwsXHJcbiAgICBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgICBoYW5kbGVTdGF0dXNBY3Rpb25DbGljayxcclxuICAgIGNsb3NlQ29uZmlybTogaGFuZGxlQ2xvc2VDb25maXJtLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0LCBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0IH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBleGVjdXRlRXhwZW5zZU11dGF0aW9uLCBwYXJzZURlY2ltYWxJbnB1dCB9IGZyb20gXCIuLi9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGNyZWF0ZUV4cGVuc2VTaGVldCxcclxuICBkZWxldGVFeHBlbnNlU2hlZXQsXHJcbiAgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyLFxyXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xyXG4gIGlzRWRpdExvY2tlZDogYm9vbGVhbjtcclxuICBpc0RlbGV0ZUxvY2tlZDogYm9vbGVhbjtcclxuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogYm9vbGVhbjtcclxuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XHJcbiAgbG9ja2VkQ3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgbG9ja2VkRXhjaGFuZ2VSYXRlOiBzdHJpbmc7XHJcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcclxuICBjYW5FZGl0RXhwZW5zZTogYm9vbGVhbjtcclxuICBjYW5EZWxldGVFeHBlbnNlOiBib29sZWFuO1xyXG4gIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGJvb2xlYW47XHJcbiAgY2FuVHJhbnNpdGlvblN0YXR1czogYm9vbGVhbjtcclxuICBzaGVldElkOiBzdHJpbmc7XHJcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRFeGNoYW5nZVJhdGU6IHN0cmluZztcclxuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlOiBzdHJpbmc7XHJcbiAgZHJhZnRQcm9qZWN0SWQ6IHN0cmluZztcclxuICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zOiBzdHJpbmc7XHJcbiAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5OiBzdHJpbmc7XHJcbiAgY3VycmVudEV4cGVuc2VTaGVldFN0YXR1cz86IG51bWJlciB8IG51bGw7XHJcbiAgY3VycmVudEV4Y2hhbmdlUmF0ZU1vZGU/OiBudW1iZXIgfCBudWxsO1xyXG4gIG9uQ3JlYXRlU3VjY2VzczogKGNyZWF0ZWRTaGVldElkOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0QnVzeTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVFeGNoYW5nZVJhdGUgPSAocmF3OiBzdHJpbmcpOiBudW1iZXIgfCBudWxsID0+IHBhcnNlRGVjaW1hbElucHV0KHJhdyk7XHJcbi8vIENvbXBhcmVzIHJhdGVzIHdpdGggdG9sZXJhbmNlIHRvIGF2b2lkIGZsb2F0aW5nIHBvaW50IG1pc21hdGNoIG9uIHBheWxvYWQgbW9kZS5cclxuY29uc3QgYXJlUmF0ZXNFcXVpdmFsZW50ID0gKGxlZnQ6IG51bWJlciB8IG51bGwsIHJpZ2h0OiBudW1iZXIgfCBudWxsKTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKGxlZnQgPT0gbnVsbCB8fCByaWdodCA9PSBudWxsKSByZXR1cm4gZmFsc2U7XHJcbiAgcmV0dXJuIE1hdGguYWJzKGxlZnQgLSByaWdodCkgPCAwLjAwMDAwMDE7XHJcbn07XHJcblxyXG4vLyBFbmNhcHN1bGF0ZXMgdXBkYXRlIGFuZCBkZWxldGUgbXV0YXRpb25zIGZvciBleHBlbnNlIHNoZWV0IGhlYWRlciBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGlzQ3JlYXRlTW9kZSxcclxuICBpc0VkaXRMb2NrZWQsXHJcbiAgaXNEZWxldGVMb2NrZWQsXHJcbiAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXHJcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gIGxvY2tlZEN1cnJlbmN5Q29kZSxcclxuICBsb2NrZWRFeGNoYW5nZVJhdGUsXHJcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcclxuICBjYW5FZGl0RXhwZW5zZSxcclxuICBjYW5EZWxldGVFeHBlbnNlLFxyXG4gIGNhbkVkaXRIZWFkZXJGaWVsZHMsXHJcbiAgY2FuVHJhbnNpdGlvblN0YXR1cyxcclxuICBzaGVldElkLFxyXG4gIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgZHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcclxuICBkcmFmdFByb2plY3RJZCxcclxuICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxyXG4gIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcclxuICBjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzLFxyXG4gIGN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlLFxyXG4gIG9uQ3JlYXRlU3VjY2VzcyxcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIHNldEJ1c3ksXHJcbiAgc2V0U3RhdHVzLFxyXG4gIHNldElzRWRpdGluZyxcclxufTogVXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zQXJncykgPT4ge1xyXG4gIGNvbnN0IGJ1aWxkVXBkYXRlUGF5bG9hZCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKFxuICAgICAgbmV4dFN0YXR1cz86IG51bWJlciB8IG51bGwsXG4gICAgICBzdGF0dXNDb21tZW50T3ZlcnJpZGU/OiBzdHJpbmcgfCBudWxsXG4gICAgKTogeyBwYXlsb2FkOiBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0IH0gfCB7IGVycm9yOiBzdHJpbmcgfSA9PiB7XG4gICAgICBjb25zdCBoYXNFeHBsaWNpdFN0YXR1c0NvbW1lbnRPdmVycmlkZSA9IHN0YXR1c0NvbW1lbnRPdmVycmlkZSAhPT0gdW5kZWZpbmVkO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbmN5ID0gU3RyaW5nKFxuICAgICAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyA/IChsb2NrZWRDdXJyZW5jeUNvZGUgfHwgZHJhZnRDdXJyZW5jeUNvZGUgfHwgXCJcIikgOiAoZHJhZnRDdXJyZW5jeUNvZGUgfHwgXCJcIilcbiAgICAgIClcbiAgICAgICAgLnRyaW0oKVxuICAgICAgICAudG9VcHBlckNhc2UoKTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWREZXNjcmlwdGlvbiA9IFN0cmluZyhkcmFmdERlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZFByb2plY3RJZCA9IFN0cmluZyhkcmFmdFByb2plY3RJZCB8fCBcIlwiKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRFc3RhZG9Db21lbnRhcmlvcyA9IFN0cmluZyhcclxuICAgICAgICBzdGF0dXNDb21tZW50T3ZlcnJpZGUgPz8gZHJhZnRFc3RhZG9Db21lbnRhcmlvcyA/PyBcIlwiXHJcbiAgICAgICkudHJpbSgpO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkRXhjaGFuZ2VSYXRlUmF3ID0gU3RyaW5nKFxyXG4gICAgICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyA/IChsb2NrZWRFeGNoYW5nZVJhdGUgfHwgZHJhZnRFeGNoYW5nZVJhdGUgfHwgXCJcIikgOiAoZHJhZnRFeGNoYW5nZVJhdGUgfHwgXCJcIilcclxuICAgICAgKTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSA9IFN0cmluZyhleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3kgfHwgXCJFVVJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCkgfHwgXCJFVVJcIjtcclxuICAgICAgY29uc3QgcmVxdWlyZXNFeGNoYW5nZVJhdGUgPVxyXG4gICAgICAgIGNhbkVkaXRIZWFkZXJGaWVsZHMgJiYgbm9ybWFsaXplZEN1cnJlbmN5ICE9PSBcIlwiICYmIG5vcm1hbGl6ZWRDdXJyZW5jeSAhPT0gbm9ybWFsaXplZEJhc2VDdXJyZW5jeTtcclxuICAgICAgY29uc3QgcGFyc2VkRXhjaGFuZ2VSYXRlID0gbm9ybWFsaXplRXhjaGFuZ2VSYXRlKG5vcm1hbGl6ZWRFeGNoYW5nZVJhdGVSYXcpO1xyXG4gICAgICBjb25zdCBvZmZpY2lhbEV4Y2hhbmdlUmF0ZSA9IG5vcm1hbGl6ZUV4Y2hhbmdlUmF0ZShvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKTtcclxuICAgICAgY29uc3Qgb3JpZ2luYWxFeGNoYW5nZVJhdGUgPSBub3JtYWxpemVFeGNoYW5nZVJhdGUobG9ja2VkRXhjaGFuZ2VSYXRlKTtcclxuICAgICAgY29uc3QgcGFyc2VkQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUgPSBOdW1iZXIoY3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUpO1xyXG4gICAgICBjb25zdCBoYXNDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA9IE51bWJlci5pc0ludGVnZXIocGFyc2VkQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUpICYmIHBhcnNlZEN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlID49IDA7XHJcbiAgICAgIGNvbnN0IGhhc1ZhbGlkUmF0ZSA9IHBhcnNlZEV4Y2hhbmdlUmF0ZSAhPSBudWxsICYmIHBhcnNlZEV4Y2hhbmdlUmF0ZSA+IDA7XHJcbiAgICAgIGNvbnN0IGhhc01hbnVhbFJhdGVFZGl0T25VcGRhdGUgPVxyXG4gICAgICAgIGNhbkVkaXRIZWFkZXJGaWVsZHMgJiZcclxuICAgICAgICAhaXNDcmVhdGVNb2RlICYmXHJcbiAgICAgICAgaGFzVmFsaWRSYXRlICYmXHJcbiAgICAgICAgKG9yaWdpbmFsRXhjaGFuZ2VSYXRlID09IG51bGwgfHwgIWFyZVJhdGVzRXF1aXZhbGVudChwYXJzZWRFeGNoYW5nZVJhdGUsIG9yaWdpbmFsRXhjaGFuZ2VSYXRlKSk7XHJcbiAgICAgIC8vIE9ubHkgc2VuZCBleGNoYW5nZVJhdGVNb2RlIHdoZW4gdGhlIHVzZXIgYWN0dWFsbHkgY2hhbmdlZCB0aGUgcmF0ZSBtYW51YWxseS5cclxuICAgICAgY29uc3QgaXNNYW51YWxFeGNoYW5nZVJhdGUgPSAoKCkgPT4ge1xyXG4gICAgICAgIGlmICghY2FuRWRpdEhlYWRlckZpZWxkcykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmICghcmVxdWlyZXNFeGNoYW5nZVJhdGUgfHwgIWhhc1ZhbGlkUmF0ZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoIWlzQ3JlYXRlTW9kZSAmJiAhaGFzTWFudWFsUmF0ZUVkaXRPblVwZGF0ZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChvZmZpY2lhbEV4Y2hhbmdlUmF0ZSA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gIWFyZVJhdGVzRXF1aXZhbGVudChwYXJzZWRFeGNoYW5nZVJhdGUsIG9mZmljaWFsRXhjaGFuZ2VSYXRlKTtcclxuICAgICAgfSkoKTtcclxuICAgICAgY29uc3QgcmVzb2x2ZWRFeGNoYW5nZVJhdGVNb2RlID0gY2FuRWRpdEhlYWRlckZpZWxkc1xyXG4gICAgICAgID8gKGlzTWFudWFsRXhjaGFuZ2VSYXRlID8gMSA6IChoYXNDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA/IHBhcnNlZEN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlIDogMCkpXHJcbiAgICAgICAgOiAoaGFzQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUgPyBwYXJzZWRDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA6IHVuZGVmaW5lZCk7XHJcbiAgICAgIGNvbnN0IHJlc29sdmVkRXhwZW5zZVNoZWV0U3RhdHVzID1cbiAgICAgICAgbmV4dFN0YXR1cyA/PyAoY3VycmVudEV4cGVuc2VTaGVldFN0YXR1cyAhPSBudWxsID8gTnVtYmVyKGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXMpIDogdW5kZWZpbmVkKTtcbiAgICAgIC8vIFN0YXR1cy9jb21tZW50LW9ubHkgZmxvd3Mgc3RpbGwgc3VibWl0IHRoZSBmdWxsIGhlYWRlciBwYXlsb2FkLCBzbyBrZWVwIHRoZSBzdG9yZWQgcmF0ZSB1bnRvdWNoZWQuXG4gICAgICBjb25zdCByZXNvbHZlZEV4Y2hhbmdlUmF0ZSA9IGNhbkVkaXRIZWFkZXJGaWVsZHNcbiAgICAgICAgPyAoaGFzVmFsaWRSYXRlID8gTnVtYmVyKHBhcnNlZEV4Y2hhbmdlUmF0ZSkgOiAxKVxuICAgICAgICA6IChvcmlnaW5hbEV4Y2hhbmdlUmF0ZSA/PyBwYXJzZWRFeGNoYW5nZVJhdGUgPz8gMCk7XG5cclxuICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICAgIGlmICghbm9ybWFsaXplZERlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlcnJvcjogaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9EZXNjcmlwdGlvblJlcXVpcmVkXCIsIFwiRGVzY3JpcHRpb24gaXMgcmVxdWlyZWQuXCIpLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghbm9ybWFsaXplZEN1cnJlbmN5KSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlcnJvcjogaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9DdXJyZW5jeVJlcXVpcmVkXCIsIFwiQ3VycmVuY3kgaXMgcmVxdWlyZWQuXCIpLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChyZXF1aXJlc0V4Y2hhbmdlUmF0ZSAmJiAhaGFzVmFsaWRSYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGVycm9yOiBpbmRUKFxyXG4gICAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9FeGNoYW5nZVJhdGVSZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICBcIkV4Y2hhbmdlIHJhdGUgaXMgcmVxdWlyZWQgd2hlbiBjdXJyZW5jeSBpcyBkaWZmZXJlbnQgZnJvbSBiYXNlIGN1cnJlbmN5LlwiXHJcbiAgICAgICAgICApLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiBub3JtYWxpemVkRGVzY3JpcHRpb24sXG4gICAgICAgICAgY3VycmVuY3lDb2RlOiBub3JtYWxpemVkQ3VycmVuY3ksXG4gICAgICAgICAgZXhjaFJhdGU6IHJlc29sdmVkRXhjaGFuZ2VSYXRlLFxuICAgICAgICAgIHByb2pJZDogbm9ybWFsaXplZFByb2plY3RJZCB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgZXhwZW5zZVNoZWV0U3RhdHVzOiByZXNvbHZlZEV4cGVuc2VTaGVldFN0YXR1cyxcbiAgICAgICAgICBleGNoYW5nZVJhdGVNb2RlOiByZXNvbHZlZEV4Y2hhbmdlUmF0ZU1vZGUsXG4gICAgICAgICAgLy8gUHJlc2VydmUgZXhwbGljaXQgZW1wdHkgc3RhdHVzIGNvbW1lbnRzIHNvIHRoZSBiYWNrZW5kIGNhbiBjbGVhciB0aGUgc3RvcmVkIHZhbHVlLlxuICAgICAgICAgIGVzdGFkb0NvbWVudGFyaW9zOiBoYXNFeHBsaWNpdFN0YXR1c0NvbW1lbnRPdmVycmlkZVxuICAgICAgICAgICAgPyBub3JtYWxpemVkRXN0YWRvQ29tZW50YXJpb3NcbiAgICAgICAgICAgIDogKG5vcm1hbGl6ZWRFc3RhZG9Db21lbnRhcmlvcyB8fCB1bmRlZmluZWQpLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9LFxuICAgIFtcclxuICAgICAgY2FuRWRpdEhlYWRlckZpZWxkcyxcclxuICAgICAgY3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUsXHJcbiAgICAgIGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXMsXHJcbiAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxyXG4gICAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgICAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcclxuICAgICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcclxuICAgICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gICAgICBsb2NrZWRDdXJyZW5jeUNvZGUsXHJcbiAgICAgIGxvY2tlZEV4Y2hhbmdlUmF0ZSxcclxuICAgICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVVcGRhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSB8fCAhaXNFZGl0aW5nKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIWlzQ3JlYXRlTW9kZSAmJiBpc0VkaXRMb2NrZWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBjYW5Qcm9jZWVkID0gaXNDcmVhdGVNb2RlID8gY2FuQ3JlYXRlRXhwZW5zZSA6IGNhbkVkaXRFeHBlbnNlO1xyXG4gICAgaWYgKCFjYW5Qcm9jZWVkKSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBheWxvYWRSZXN1bHQgPSBidWlsZFVwZGF0ZVBheWxvYWQoKTtcclxuICAgIGlmIChcImVycm9yXCIgaW4gcGF5bG9hZFJlc3VsdCkge1xyXG4gICAgICBzZXRNb2RhbEVycm9yKHBheWxvYWRSZXN1bHQuZXJyb3IpO1xyXG4gICAgICBzZXRTdGF0dXMocGF5bG9hZFJlc3VsdC5lcnJvcik7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcclxuICAgICAgc3RhcnRTdGF0dXM6IGlzQ3JlYXRlTW9kZVxyXG4gICAgICAgID8gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKVxyXG4gICAgICAgIDogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0aW5nXCIsIFwiVXBkYXRpbmcgZXhwZW5zZSBzaGVldC4uLlwiKSxcclxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIiksXHJcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldEJ1c3ksXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICAgICAgY29uc3QgY3JlYXRlUGF5bG9hZCA9IHBheWxvYWRSZXN1bHQucGF5bG9hZDtcclxuICAgICAgICAgIGNvbnN0IHBheWxvYWQ6IEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QgPSB7XHJcbiAgICAgICAgICAgIG1vZGU6IDEsXHJcbiAgICAgICAgICAgIGV4aXN0aW5nSG9qYUdhc3Rvc0lkOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBjcmVhdGVQYXlsb2FkLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICBjdXJyZW5jeUNvZGU6IGNyZWF0ZVBheWxvYWQuY3VycmVuY3lDb2RlLFxyXG4gICAgICAgICAgICBleGNoUmF0ZTogY3JlYXRlUGF5bG9hZC5leGNoUmF0ZSxcclxuICAgICAgICAgICAgcHJvaklkOiBjcmVhdGVQYXlsb2FkLnByb2pJZCxcclxuICAgICAgICAgICAgZXhwZW5zZVNoZWV0U3RhdHVzOiAwLFxyXG4gICAgICAgICAgICBleGNoYW5nZVJhdGVNb2RlOiBjcmVhdGVQYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUsXHJcbiAgICAgICAgICAgIGxpbmVzOiBbXSxcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjcmVhdGVFeHBlbnNlU2hlZXQocGF5bG9hZCk7XHJcblxyXG4gICAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gQWNjZXB0IGJvdGggY2FzaW5nIHZhcmlhbnRzIGZyb20gYmFja2VuZCBlbnZlbG9wZXMuXHJcbiAgICAgICAgICBjb25zdCBjcmVhdGVkRGF0YSA9IHJlc3BvbnNlPy5EYXRhIGFzIHsgSG9qYUdhc3Rvc0lkPzogdW5rbm93bjsgaG9qYUdhc3Rvc0lkPzogdW5rbm93biB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcclxuICAgICAgICAgIGNvbnN0IGNyZWF0ZWRTaGVldElkID0gU3RyaW5nKGNyZWF0ZWREYXRhPy5Ib2phR2FzdG9zSWQgPz8gY3JlYXRlZERhdGE/LmhvamFHYXN0b3NJZCA/PyBcIlwiKS50cmltKCk7XHJcbiAgICAgICAgICBpZiAoIWNyZWF0ZWRTaGVldElkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIG9uQ3JlYXRlU3VjY2VzcyhjcmVhdGVkU2hlZXRJZCk7XHJcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyKHNoZWV0SWQsIHBheWxvYWRSZXN1bHQucGF5bG9hZCk7XHJcblxyXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlZFwiLCBcIkV4cGVuc2Ugc2hlZXQgdXBkYXRlZFwiKSk7XHJcbiAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiByZXN1bHQub2s7XHJcbiAgfSwgW1xyXG4gICAgYnVzeSxcclxuICAgIGJ1aWxkVXBkYXRlUGF5bG9hZCxcclxuICAgIGNhbkNyZWF0ZUV4cGVuc2UsXHJcbiAgICBjYW5FZGl0RXhwZW5zZSxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzRWRpdExvY2tlZCxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIG9uQ3JlYXRlU3VjY2VzcyxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2hlZXRJZCxcclxuICBdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU3RhdHVzVHJhbnNpdGlvbiA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKG5leHRTdGF0dXM6IG51bWJlciwgc3RhcnRTdGF0dXM6IHN0cmluZywgc3RhdHVzQ29tbWVudE92ZXJyaWRlPzogc3RyaW5nIHwgbnVsbCkgPT4ge1xyXG4gICAgICBpZiAoYnVzeSB8fCBpc0NyZWF0ZU1vZGUgfHwgIXNoZWV0SWQpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKCFjYW5UcmFuc2l0aW9uU3RhdHVzKSB7XHJcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcGF5bG9hZFJlc3VsdCA9IGJ1aWxkVXBkYXRlUGF5bG9hZChuZXh0U3RhdHVzLCBzdGF0dXNDb21tZW50T3ZlcnJpZGUpO1xyXG4gICAgICBpZiAoXCJlcnJvclwiIGluIHBheWxvYWRSZXN1bHQpIHtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKHBheWxvYWRSZXN1bHQuZXJyb3IpO1xyXG4gICAgICAgIHNldFN0YXR1cyhwYXlsb2FkUmVzdWx0LmVycm9yKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xyXG4gICAgICAgIHN0YXJ0U3RhdHVzLFxyXG4gICAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRXJyb3JcIiwgXCJVcGRhdGUgZXJyb3IuXCIpLFxyXG4gICAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgICAgc2V0QnVzeSxcclxuICAgICAgICBzZXRTdGF0dXMsXHJcbiAgICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHVwZGF0ZUV4cGVuc2VTaGVldEhlYWRlcihzaGVldElkLCBwYXlsb2FkUmVzdWx0LnBheWxvYWQpO1xyXG5cclxuICAgICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlZFwiLCBcIkV4cGVuc2Ugc2hlZXQgdXBkYXRlZFwiKSk7XHJcbiAgICAgICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gcmVzdWx0Lm9rO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgYnVzeSxcclxuICAgICAgYnVpbGRVcGRhdGVQYXlsb2FkLFxyXG4gICAgICBjYW5UcmFuc2l0aW9uU3RhdHVzLFxyXG4gICAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICAgIHNldEJ1c3ksXHJcbiAgICAgIHNldElzRWRpdGluZyxcclxuICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICBzaGVldElkLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZURlbGV0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoaXNEZWxldGVMb2NrZWQpIHJldHVybiBmYWxzZTtcclxuICAgIGlmICghY2FuRGVsZXRlRXhwZW5zZSkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcclxuICAgICAgc3RhcnRTdGF0dXM6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGluZ1wiLCBcIkRlbGV0aW5nIGV4cGVuc2Ugc2hlZXQuLi5cIiksXHJcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRXJyb3JcIiwgXCJEZWxldGUgZXJyb3IuXCIpLFxyXG4gICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICBzZXRCdXN5LFxyXG4gICAgICBzZXRTdGF0dXMsXHJcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0KHNoZWV0SWQpO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IGRlbGV0ZWRcIikpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcclxuICB9LCBbYnVzeSwgY2FuRGVsZXRlRXhwZW5zZSwgaXNEZWxldGVMb2NrZWQsIHNldEJ1c3ksIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1cywgc2hlZXRJZF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlU3RhdHVzVHJhbnNpdGlvbixcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyB9IGZyb20gXCIuLi9ob29rcy91c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgbmF2aWdhdGVUb0V4cGVuc2VVcmwgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBtb2RhbE9wZW46IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcclxuICBhY3Rpb25Nb2RlPzogXCJkZWZhdWx0XCIgfCBcImRlbGV0ZV9vbmx5XCIgfCBcInZpZXdfb25seVwiO1xyXG4gIGlzTG9ja2VkOiBib29sZWFuO1xyXG4gIGlzRWRpdExvY2tlZD86IGJvb2xlYW47XHJcbiAgaXNEZWxldGVMb2NrZWQ/OiBib29sZWFuO1xyXG4gIHBlcm1pc3Npb25zUmVhZHk/OiBib29sZWFuO1xyXG4gIGNhbkVkaXRFeHBlbnNlOiBib29sZWFuO1xyXG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlRXhwZW5zZTogYm9vbGVhbjtcclxuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUNhbmNlbEVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBvblNhdmVTdWNjZXNzOiAoKSA9PiB2b2lkO1xyXG4gIG9uRGVsZXRlU3VjY2Vzcz86ICgpID0+IHZvaWQ7XHJcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XHJcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xyXG4gIH0pID0+IHZvaWQ7XHJcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gQ29vcmRpbmF0ZXMgdG9wYmFyIGljb24gc3RhdGUgYW5kIGRpc3BhdGNoIGFjdGlvbnMgZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9ucyA9ICh7XHJcbiAgYnVzeSxcclxuICBtb2RhbE9wZW4sXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGlzQ3JlYXRlTW9kZSxcclxuICBhY3Rpb25Nb2RlID0gXCJkZWZhdWx0XCIsXHJcbiAgaXNMb2NrZWQsXHJcbiAgaXNFZGl0TG9ja2VkLFxyXG4gIGlzRGVsZXRlTG9ja2VkLFxyXG4gIHBlcm1pc3Npb25zUmVhZHkgPSB0cnVlLFxyXG4gIGNhbkVkaXRFeHBlbnNlLFxyXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXHJcbiAgY2FuRGVsZXRlRXhwZW5zZSxcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICBoYW5kbGVVcGRhdGUsXHJcbiAgaGFuZGxlRGVsZXRlLFxyXG4gIG9uU2F2ZVN1Y2Nlc3MsXHJcbiAgb25EZWxldGVTdWNjZXNzLFxyXG4gIG9wZW5Db25maXJtLFxyXG4gIGNsb3NlQ29uZmlybSxcclxufTogVXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MpID0+IHtcclxuICB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMoe1xyXG4gICAgYWN0aW9uR3JvdXBJZDogXCJleHBlbnNlLXNoZWV0LWRldGFpbC1hY3Rpb25zXCIsXHJcbiAgICBpZHM6IHtcclxuICAgICAgZWRpdEljb25JZDogXCJleHBlbnNlRWRpdEljb25cIixcclxuICAgICAgc2F2ZUljb25JZDogXCJleHBlbnNlU2F2ZUljb25cIixcclxuICAgICAgZGVsZXRlQnRuSWQ6IFwiZXhwZW5zZURlbGV0ZUJ0blwiLFxyXG4gICAgICBjYW5jZWxCdG5JZDogXCJleHBlbnNlQ2FuY2VsQnRuXCIsXHJcbiAgICB9LFxyXG4gICAgZXZlbnRzOiB7XHJcbiAgICAgIGVkaXRFdmVudDogXCJleHBlbnNlLWRldGFpbC1lZGl0XCIsXHJcbiAgICAgIGRlbGV0ZUV2ZW50OiBcImV4cGVuc2UtZGV0YWlsLWRlbGV0ZVwiLFxyXG4gICAgICBjYW5jZWxFdmVudDogXCJleHBlbnNlLWRldGFpbC1jYW5jZWwtZWRpdFwiLFxyXG4gICAgfSxcclxuICAgIGJ1c3ksXHJcbiAgICBtb2RhbE9wZW4sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc0xvY2tlZCxcclxuICAgIGFjdGlvbk1vZGUsXHJcbiAgICBpc0VkaXRMb2NrZWQsXHJcbiAgICBpc0RlbGV0ZUxvY2tlZCxcclxuICAgIGFsbG93Q3JlYXRlTW9kZUFjdGlvbnNXaGVuTG9ja2VkOiB0cnVlLFxyXG4gICAgcGVybWlzc2lvbnNSZWFkeSxcclxuICAgIGNhbkNyZWF0ZTogY2FuQ3JlYXRlRXhwZW5zZSxcclxuICAgIGNhbkVkaXQ6IGNhbkVkaXRFeHBlbnNlLFxyXG4gICAgY2FuRGVsZXRlOiBjYW5EZWxldGVFeHBlbnNlLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgaGFuZGxlU2F2ZTogaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgc2F2ZUNvbmZpcm1UaXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIsIFwiU2F2ZSBjaGFuZ2VzXCIpLFxyXG4gICAgc2F2ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIHNhdmUgY2hhbmdlcz9cIiksXHJcbiAgICBzYXZlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIiksXHJcbiAgICBkZWxldGVDb25maXJtVGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVTaGVldF9UaXRsZVwiLCBcIkRlbGV0ZSBleHBlbnNlIHNoZWV0XCIpLFxyXG4gICAgZGVsZXRlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVTaGVldF9Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgZXhwZW5zZSBzaGVldD9cIiksXHJcbiAgICBkZWxldGVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJEZWxldGVcIiksXHJcbiAgICBvblNhdmVTdWNjZXNzLFxyXG4gICAgb25EZWxldGVTdWNjZXNzOiBvbkRlbGV0ZVN1Y2Nlc3MgfHwgKCgpID0+IG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXRzXCIpKSxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gIH0pO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7XHJcbiAgRXhwZW5zZVNoZWV0SGVhZGVyLFxyXG4gIEV4cGVuc2VTaGVldExpbmUsXHJcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsLFxyXG4gIGdldEV4Y2hhbmdlUmF0ZSxcclxuICBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlLFxyXG4gIG1hcEV4cGVuc2VTaGVldEhlYWRlcixcclxuICBtYXBFeHBlbnNlU2hlZXRMaW5lLFxyXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLFxyXG4gIG5hdmlnYXRlVG9FeHBlbnNlVXJsLFxyXG4gIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VSZWNvcmQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU1hbmFnZWRVc2VyU2NvcGUudHNcIjtcclxuaW1wb3J0IHsgZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhjaGFuZ2VSYXRlRW50cnlNb2RlQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIGhhc0Fzc2lnbmVkVm91Y2hlciwgcGFyc2VFeHBlbnNlRGF0ZSwgc2FmZVRleHQsIHRvSXNvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIsIHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XHJcbmltcG9ydCB7IHJlc29sdmVFeHBlbnNlU2hlZXREZXRhaWxQb2xpY3kgfSBmcm9tIFwiLi9leHBlbnNlU2hlZXREZXRhaWxQb2xpY3kudHNcIjtcclxuXHJcbmNvbnN0IEVYQ0hBTkdFX1JBVEVfREVCT1VOQ0VfTVMgPSA0MDA7XHJcbmNvbnN0IEVYQ0hBTkdFX1JBVEVfUkVGRVJFTkNFX0FNT1VOVCA9IDEwMDtcclxuY29uc3QgRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyA9IDc7XHJcbmNvbnN0IEVYUEVOU0VfU1RBVFVTX0FQUFJPVkVEID0gMjtcclxuY29uc3QgRVhQRU5TRV9TVEFUVVNfUEFJRCA9IDQ7XHJcblxyXG4vLyBOb3JtYWxpemVzIGV4Y2hhbmdlLXJhdGUgbnVtYmVycyBmb3IgbnVtZXJpYyBpbnB1dCBjb250cm9scy5cclxuY29uc3QgZm9ybWF0RXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZSA9ICh2YWx1ZTogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKHZhbHVlLCB7XHJcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IEVYQ0hBTkdFX1JBVEVfREVDSU1BTF9ESUdJVFMsXHJcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IEVYQ0hBTkdFX1JBVEVfREVDSU1BTF9ESUdJVFMsXHJcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgIGZhbGxiYWNrOiBcIlwiLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRDcmVhdGVIZWFkZXJEcmFmdCA9ICgpOiBFeHBlbnNlU2hlZXRIZWFkZXIgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBob2phR2FzdG9zSWQ6IFwiXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJcIixcclxuICAgIHByb2pJZDogXCJcIixcclxuICAgIGN1cnJlbmN5Q29kZTogXCJcIixcclxuICAgIHRvdGFsQW1vdW50OiBudWxsLFxyXG4gICAgZXhwZW5zZVNoZWV0U3RhdHVzOiAwLFxyXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogMCxcclxuICAgIGNyZWF0ZWREYXRlOiBcIlwiLFxyXG4gICAgZXhjaFJhdGU6IFwiMVwiLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBzaG91bGRTaG93RXhjaGFuZ2VSYXRlID0gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gZmFsc2U7XHJcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KHZhbHVlKTtcclxuICBpZiAocGFyc2VkID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuICByZXR1cm4gTWF0aC5hYnMocGFyc2VkKSA+IDA7XHJcbn07XHJcblxyXG50eXBlIFVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlQXJncyA9IHtcclxuICBoYXNBY2Nlc3M6IGJvb2xlYW47XHJcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xyXG4gIGNhbk1hbmFnZU90aGVyVXNlcnM6IGJvb2xlYW47XHJcbiAgY3VycmVudEF4VXNlcklkOiBzdHJpbmc7XHJcbiAgY3VycmVudENybVVzZXJJZDogc3RyaW5nO1xyXG4gIHNlbGVjdGVkTWFuYWdlZFVzZXJJZDogc3RyaW5nO1xyXG4gIHNoZWV0SWQ6IHN0cmluZztcclxuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XHJcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBPd25zIHN0YXRlIGFuZCBiZWhhdmlvciBmb3IgZXhwZW5zZSBzaGVldCBkZXRhaWwgcGFnZSAocmVhZCwgZWRpdCwgY3JlYXRlKS5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlID0gKHtcclxuICBoYXNBY2Nlc3MsXHJcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgY3VycmVudEF4VXNlcklkLFxyXG4gIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gIHNoZWV0SWQsXHJcbiAgaXNDcmVhdGVNb2RlLFxyXG4gIG9uRm9yYmlkZGVuLFxyXG59OiBVc2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZUFyZ3MpID0+IHtcclxuICBjb25zdCBbaGVhZGVyLCBzZXRIZWFkZXJdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0SGVhZGVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2xpbmVzLCBzZXRMaW5lc10gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRMaW5lW10+KFtdKTtcclxuICBjb25zdCBbbGluZVBhZ2UsIHNldExpbmVQYWdlXSA9IHVzZVN0YXRlKDEpO1xyXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2lzRWRpdGluZywgc2V0SXNFZGl0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbW9kYWxFcnJvciwgc2V0TW9kYWxFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnREZXNjcmlwdGlvbiwgc2V0RHJhZnREZXNjcmlwdGlvbl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRQcm9qZWN0SWQsIHNldERyYWZ0UHJvamVjdElkXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdEN1cnJlbmN5Q29kZSwgc2V0RHJhZnRDdXJyZW5jeUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0RXhjaGFuZ2VSYXRlLCBzZXREcmFmdEV4Y2hhbmdlUmF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRFc3RhZG9Db21lbnRhcmlvcywgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvc10gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZGVmYXVsdEN1cnJlbmN5Q29kZSwgc2V0RGVmYXVsdEN1cnJlbmN5Q29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbaXNFeGNoYW5nZVJhdGVMb2FkaW5nLCBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtleGNoYW5nZVJhdGVNZXNzYWdlLCBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtleGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvciwgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLCBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlLCBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUsIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICBjb25zdCBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyID0gdXNlQ2FsbGJhY2soKG5leHRIZWFkZXI6IEV4cGVuc2VTaGVldEhlYWRlciB8IG51bGwpID0+IHtcclxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24oc2FmZVRleHQobmV4dEhlYWRlcj8uZGVzY3JpcHRpb24pKTtcclxuICAgIHNldERyYWZ0UHJvamVjdElkKHNhZmVUZXh0KG5leHRIZWFkZXI/LnByb2pJZCkpO1xyXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUoc2FmZVRleHQobmV4dEhlYWRlcj8uY3VycmVuY3lDb2RlKSk7XHJcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZShcclxuICAgICAgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKG5leHRIZWFkZXI/LmV4Y2hSYXRlLCB7XHJcbiAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxyXG4gICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcclxuICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgICAgICBmYWxsYmFjazogXCJcIixcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgICBzZXREcmFmdEVzdGFkb0NvbWVudGFyaW9zKHNhZmVUZXh0KG5leHRIZWFkZXI/LmVzdGFkb0NvbWVudGFyaW9zKSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgbG9hZERldGFpbCA9IGFzeW5jICgpID0+IHtcclxuICAgICAgaWYgKCFoYXNBY2Nlc3MpIHtcclxuICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSkge1xyXG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRyYWZ0SGVhZGVyID0gYnVpbGRDcmVhdGVIZWFkZXJEcmFmdCgpO1xyXG4gICAgICAgIHNldEhlYWRlcihkcmFmdEhlYWRlcik7XHJcbiAgICAgICAgc2V0TGluZXMoW10pO1xyXG4gICAgICAgIHNldExpbmVQYWdlKDEpO1xyXG4gICAgICAgIHNldElzRWRpdGluZyh0cnVlKTtcclxuICAgICAgICBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyKGRyYWZ0SGVhZGVyKTtcclxuICAgICAgICBzZXRTdGF0dXMoXCJcIik7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFzaGVldElkKSB7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCB3YXMgbm90IGZvdW5kLlwiKSk7XHJcbiAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcclxuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsKHNoZWV0SWQsIHtcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2U/Lk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBkZXRhaWwuXCIpKTtcclxuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNoZWV0cyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRTaGVldCA9XHJcbiAgICAgICAgICBzaGVldHMuZmluZCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5Py5Ib2phR2FzdG9zSWQpLnRvVXBwZXJDYXNlKCkgPT09IHNoZWV0SWQudHJpbSgpLnRvVXBwZXJDYXNlKCkpIHx8IHNoZWV0c1swXTtcclxuXHJcbiAgICAgICAgaWYgKCFzZWxlY3RlZFNoZWV0KSB7XHJcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG5leHRIZWFkZXIgPSBtYXBFeHBlbnNlU2hlZXRIZWFkZXIoc2VsZWN0ZWRTaGVldCk7XHJcbiAgICAgICAgY29uc3QgbmV4dExpbmVzID0gKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRTaGVldC5MaW5lcykgPyBzZWxlY3RlZFNoZWV0LkxpbmVzIDogW10pLm1hcCgoZW50cnkpID0+XHJcbiAgICAgICAgICBtYXBFeHBlbnNlU2hlZXRMaW5lKGVudHJ5KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgc2V0SGVhZGVyKG5leHRIZWFkZXIpO1xyXG4gICAgICAgIHNldExpbmVzKG5leHRMaW5lcyk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShcclxuICAgICAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBkZXRhaWwuXCIpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgc2V0TGluZXMoW10pO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdm9pZCBsb2FkRGV0YWlsKCk7XHJcbiAgfSwgW2NhbkNyZWF0ZUV4cGVuc2UsIGhhc0FjY2VzcywgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNDcmVhdGVNb2RlLCBvbkZvcmJpZGRlbiwgc2hlZXRJZF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFoZWFkZXIgfHwgaXNFZGl0aW5nKSByZXR1cm47XHJcbiAgICBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyKGhlYWRlcik7XHJcbiAgfSwgW2hlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNFZGl0aW5nXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWhhc0FjY2VzcykgcmV0dXJuO1xyXG4gICAgbGV0IGlzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG5cclxuICAgIGNvbnN0IGxvYWREZWZhdWx0Q3VycmVuY3lDb2RlID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSBhd2FpdCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlKHtcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcclxuICAgICAgICBzZXREZWZhdWx0Q3VycmVuY3lDb2RlKHNhZmVUZXh0KGNvZGUpLnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSBcIkFib3J0RXJyb3JcIikgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZvaWQgbG9hZERlZmF1bHRDdXJyZW5jeUNvZGUoKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlzQ2FuY2VsbGVkID0gdHJ1ZTtcclxuICAgICAgY29udHJvbGxlci5hYm9ydCgpO1xyXG4gICAgfTtcclxuICB9LCBbaGFzQWNjZXNzXSk7XHJcblxyXG4gIGNvbnN0IGhhc0FjdGl2ZVByb2Nlc3MgPSB1c2VNZW1vKCgpID0+IGJ1c3kgfHwgaXNFZGl0aW5nLCBbYnVzeSwgaXNFZGl0aW5nXSk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoaGFzQWN0aXZlUHJvY2Vzcyk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcclxuICAgIH07XHJcbiAgfSwgW2hhc0FjdGl2ZVByb2Nlc3NdKTtcclxuXHJcbiAgY29uc3QgcHJvamVjdFZhbHVlID0gc2FmZVRleHQoaGVhZGVyPy5wcm9qSWQpO1xyXG4gIGNvbnN0IHN0YXR1c0NvZGUgPSB0eXBlb2YgaGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMgPT09IFwibnVtYmVyXCIgPyBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzIDogbnVsbDtcclxuICBjb25zdCBpc1NoZWV0QXBwcm92ZWQgPSBzdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19BUFBST1ZFRDtcclxuICBjb25zdCBpc1NoZWV0UGFpZEJ5U3RhdHVzID0gc3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfUEFJRDtcclxuICBjb25zdCBpc1NoZWV0UGFpZEJ5Vm91Y2hlciA9IGhhc0Fzc2lnbmVkVm91Y2hlcihoZWFkZXI/LnZvdWNoZXIpO1xyXG4gIGNvbnN0IGlzU2hlZXRQYWlkID0gaXNTaGVldFBhaWRCeVN0YXR1cyB8fCBpc1NoZWV0UGFpZEJ5Vm91Y2hlcjtcclxuICBjb25zdCBpc01hbmFnaW5nT3RoZXJVc2VyID0gaXNNYW5hZ2luZ090aGVyRXhwZW5zZVJlY29yZCh7XHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIHJlY29yZE93bmVyVXNlcklkOiBoZWFkZXI/LnVzZXJJZCxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICB9KTtcclxuICBjb25zdCBkZXRhaWxQb2xpY3kgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpbnRlcmFjdGlvbk1vZGU6IFwiZnVsbF9lZGl0XCIgYXMgY29uc3QsXHJcbiAgICAgICAgc2hvd0ZhYjogZmFsc2UsXHJcbiAgICAgICAgY2FuRGVsZXRlU2hlZXQ6IGZhbHNlLFxyXG4gICAgICAgIHN0YXR1c0FjdGlvbnM6IFtdLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXNvbHZlRXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5KHtcclxuICAgICAgc3RhdHVzQ29kZSxcclxuICAgICAgaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgICAgaXNQYWlkOiBpc1NoZWV0UGFpZCxcclxuICAgIH0pO1xyXG4gIH0sIFthbGxvd1NlbGZNYW5hZ2VtZW50LCBpc0NyZWF0ZU1vZGUsIGlzTWFuYWdpbmdPdGhlclVzZXIsIGlzU2hlZXRQYWlkLCBzdGF0dXNDb2RlXSk7XHJcbiAgY29uc3QgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQgPSBpc0NyZWF0ZU1vZGUgfHwgKCFpc01hbmFnaW5nT3RoZXJVc2VyICYmIGRldGFpbFBvbGljeS5pbnRlcmFjdGlvbk1vZGUgPT09IFwiZnVsbF9lZGl0XCIpO1xyXG4gIGNvbnN0IGNhbkVkaXRTdGF0dXNDb21tZW50Q3VycmVudCA9ICFpc0NyZWF0ZU1vZGUgJiYgZGV0YWlsUG9saWN5LmludGVyYWN0aW9uTW9kZSA9PT0gXCJjb21tZW50X29ubHlfZWRpdFwiO1xyXG4gIGNvbnN0IGNhbkVkaXRBbnlDdXJyZW50ID0gKGlzQ3JlYXRlTW9kZSAmJiBjYW5DcmVhdGVFeHBlbnNlKSB8fCBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCB8fCBjYW5FZGl0U3RhdHVzQ29tbWVudEN1cnJlbnQ7XHJcbiAgY29uc3QgY2FuVXNlRnVsbEVkaXRGZWF0dXJlcyA9ICFpc0NyZWF0ZU1vZGUgJiYgZGV0YWlsUG9saWN5LmludGVyYWN0aW9uTW9kZSA9PT0gXCJmdWxsX2VkaXRcIjtcclxuICBjb25zdCBpc1NoZWV0TG9ja2VkID0gaXNTaGVldEFwcHJvdmVkIHx8IGlzU2hlZXRQYWlkO1xyXG4gIGNvbnN0IGhhc0xpbmVzID0gbGluZXMubGVuZ3RoID4gMDtcclxuICBjb25zdCBleGNoYW5nZVJhdGVWYWx1ZSA9IGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcihzYWZlVGV4dChoZWFkZXI/LmV4Y2hSYXRlKSwge1xyXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxyXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxyXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICBmYWxsYmFjazogXCJcIixcclxuICB9KTtcclxuICBjb25zdCBzaG93RXhjaGFuZ2VSYXRlID0gdXNlTWVtbygoKSA9PiBzaG91bGRTaG93RXhjaGFuZ2VSYXRlKGV4Y2hhbmdlUmF0ZVZhbHVlKSwgW2V4Y2hhbmdlUmF0ZVZhbHVlXSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgPSB1c2VNZW1vKCgpID0+IGRyYWZ0Q3VycmVuY3lDb2RlLnRyaW0oKS50b1VwcGVyQ2FzZSgpLCBbZHJhZnRDdXJyZW5jeUNvZGVdKTtcclxuICBjb25zdCBub3JtYWxpemVkRGVmYXVsdEN1cnJlbmN5ID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChkZWZhdWx0Q3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpLCBbZGVmYXVsdEN1cnJlbmN5Q29kZV0pO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSA9IG5vcm1hbGl6ZWREZWZhdWx0Q3VycmVuY3kgfHwgXCJFVVJcIjtcclxuICBjb25zdCB1aUxvY2FsZSA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIFwiZXMtRVNcIjtcclxuICAgIHJldHVybiBzYWZlVGV4dChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ/LmxhbmcpIHx8IFwiZXMtRVNcIjtcclxuICB9LCBbXSk7XHJcbiAgY29uc3QgZm9ybUV4Y2hhbmdlRGF0ZSA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgcGFyc2VkRGF0ZSA9IHBhcnNlRXhwZW5zZURhdGUoc2FmZVRleHQoaGVhZGVyPy5jcmVhdGVkRGF0ZSkpO1xyXG4gICAgaWYgKHBhcnNlZERhdGUpIHJldHVybiB0b0lzb0RhdGUocGFyc2VkRGF0ZSk7XHJcbiAgICByZXR1cm4gdG9Jc29EYXRlKG5ldyBEYXRlKCkpO1xyXG4gIH0sIFtoZWFkZXI/LmNyZWF0ZWREYXRlXSk7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlUmVxdWlyZWQgPVxyXG4gICAgaXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50ICYmIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5ICE9PSBcIlwiICYmIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5ICE9PSBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UgPVxyXG4gICAgZXhjaGFuZ2VSYXRlUmVxdWlyZWQgJiYgIWRyYWZ0RXhjaGFuZ2VSYXRlLnRyaW0oKVxyXG4gICAgICA/IGluZFQoXHJcbiAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9FeGNoYW5nZVJhdGVSZXF1aXJlZFwiLFxyXG4gICAgICAgICAgXCJFeGNoYW5nZSByYXRlIGlzIHJlcXVpcmVkIHdoZW4gY3VycmVuY3kgaXMgZGlmZmVyZW50IGZyb20gYmFzZSBjdXJyZW5jeS5cIlxyXG4gICAgICAgIClcclxuICAgICAgOiBcIlwiO1xyXG4gIC8vIEN1cnJlbmN5IHR5cGUgY2FuIGJlIGVkaXRlZCB3aGVuZXZlciB0aGUgc2hlZXQgaXRzZWxmIGlzIGVkaXRhYmxlIChub3QgYXBwcm92ZWQvcGFpZCkuXHJcbiAgY29uc3QgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMgPSBmYWxzZTtcclxuICBjb25zdCBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMgPSBpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQgJiYgaGFzTGluZXMgJiYgc2hvd0V4Y2hhbmdlUmF0ZTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGxldCBpc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgbGV0IHJlcXVlc3RUaW1lcjogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4gfCBudWxsID0gbnVsbDtcclxuICAgIGxldCByZXF1ZXN0QWJvcnRDb250cm9sbGVyOiBBYm9ydENvbnRyb2xsZXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBjb25zdCBjbGVhclJlcXVlc3RBcnRpZmFjdHMgPSAoKSA9PiB7XHJcbiAgICAgIGlmIChyZXF1ZXN0VGltZXIpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQocmVxdWVzdFRpbWVyKTtcclxuICAgICAgICByZXF1ZXN0VGltZXIgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChyZXF1ZXN0QWJvcnRDb250cm9sbGVyKSB7XHJcbiAgICAgICAgcmVxdWVzdEFib3J0Q29udHJvbGxlci5hYm9ydCgpO1xyXG4gICAgICAgIHJlcXVlc3RBYm9ydENvbnRyb2xsZXIgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmICghaXNFZGl0aW5nIHx8ICFjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCB8fCBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMpIHtcclxuICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xyXG4gICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGNsZWFyUmVxdWVzdEFydGlmYWN0cygpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgfHwgIWV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSkge1xyXG4gICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcoZmFsc2UpO1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFwiXCIpO1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XHJcbiAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5ID09PSBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3kpIHtcclxuICAgICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUoXCIxXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiMVwiKTtcclxuICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xyXG4gICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGNsZWFyUmVxdWVzdEFydGlmYWN0cygpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3RUaW1lciA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xyXG4gICAgICByZXF1ZXN0QWJvcnRDb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG4gICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcodHJ1ZSk7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXCJcIik7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRFeGNoYW5nZVJhdGUoXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxuICAgICAgICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxuICAgICAgICAgIGZvcm1FeGNoYW5nZURhdGUsXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgICBzaWduYWw6IHJlcXVlc3RBYm9ydENvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcblxyXG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MgfHwgIXJlc3BvbnNlLkRhdGEgfHwgIU51bWJlci5pc0Zpbml0ZShOdW1iZXIocmVzcG9uc2UuRGF0YS5SYXRlKSkpIHtcclxuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XHJcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXHJcbiAgICAgICAgICAgIHNhZmVUZXh0KHJlc3BvbnNlLk1lc3NhZ2UpIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9VbmF2YWlsYWJsZVwiLCBcIk5vIHNlIHB1ZG8gb2J0ZW5lciBlbCB0aXBvIGRlIGNhbWJpby5cIilcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoZSBlbmRwb2ludCByZXR1cm5zIG9uZSBiYXNlLWN1cnJlbmN5IHVuaXQgaW4gdGhlIGV4cGVuc2UgY3VycmVuY3kuXG4gICAgICAgIC8vIFRoZSBVSSBzdG9yZXMgdGhlIGFtb3VudCBmb3IgdGhlIGZpeGVkIGxvY2FsIHJlZmVyZW5jZSBhbW91bnQgKDEwMCkuXG4gICAgICAgIGNvbnN0IG9mZmljaWFsUmF0ZVBlckJhc2VVbml0ID0gTnVtYmVyKHJlc3BvbnNlLkRhdGEuUmF0ZSk7XG4gICAgICAgIGNvbnN0IG9mZmljaWFsUmF0ZUZvclJlZmVyZW5jZUFtb3VudCA9IG9mZmljaWFsUmF0ZVBlckJhc2VVbml0ICogRVhDSEFOR0VfUkFURV9SRUZFUkVOQ0VfQU1PVU5UO1xuICAgICAgICBjb25zdCBuZXh0RXhjaGFuZ2VSYXRlVmFsdWUgPSBmb3JtYXRFeGNoYW5nZVJhdGVJbnB1dFZhbHVlKG9mZmljaWFsUmF0ZUZvclJlZmVyZW5jZUFtb3VudCk7XG4gICAgICAgIGNvbnN0IG9mZmljaWFsUmF0ZVJhd1ZhbHVlID0gZm9ybWF0RXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZShvZmZpY2lhbFJhdGVQZXJCYXNlVW5pdCk7XG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUobmV4dEV4Y2hhbmdlUmF0ZVZhbHVlKTtcclxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKG9mZmljaWFsUmF0ZVJhd1ZhbHVlKTtcclxuICAgICAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZShuZXh0RXhjaGFuZ2VSYXRlVmFsdWUpO1xyXG5cclxuICAgICAgICBjb25zdCBlZmZlY3RpdmVSYXRlRGF0ZSA9IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGEuRGF0ZSkgfHwgZm9ybUV4Y2hhbmdlRGF0ZTtcclxuICAgICAgICBjb25zdCBzb3VyY2UgPSBzYWZlVGV4dChyZXNwb25zZS5EYXRhLlNvdXJjZSk7XHJcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKGVmZmVjdGl2ZVJhdGVEYXRlKTtcclxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShzb3VyY2UpO1xyXG4gICAgICAgIGNvbnN0IG9mZmljaWFsTGFiZWwgPSBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsKDApIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX09mZmljaWFsXCIsIFwiVC5DLiBPZmljaWFsXCIpO1xyXG4gICAgICAgIGNvbnN0IGxvY2FsaXplZFJhdGVEYXRlID0gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGVmZmVjdGl2ZVJhdGVEYXRlLCB1aUxvY2FsZSkgfHwgZWZmZWN0aXZlUmF0ZURhdGU7XHJcbiAgICAgICAgY29uc3QgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UgPSBzb3VyY2UgPyBgJHtvZmZpY2lhbExhYmVsfSAke2xvY2FsaXplZFJhdGVEYXRlfSAoJHtzb3VyY2V9KWAgOiBgJHtvZmZpY2lhbExhYmVsfSAke2xvY2FsaXplZFJhdGVEYXRlfWA7XHJcbiAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShvZmZpY2lhbFJhdGVSYXdWYWx1ZSA/IGAke2V4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlfSAtICR7b2ZmaWNpYWxSYXRlUmF3VmFsdWV9YCA6IGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlKTtcclxuICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XHJcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHtcclxuICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQwNCkge1xyXG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9Ob3RGb3VuZFwiLCBcIk5vIGhheSB0aXBvIGRlIGNhbWJpbyBwYXJhIGxhIGZlY2hhXCIpKTtcclxuICAgICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MjIgfHwgZXJyb3Iuc3RhdHVzID09PSA1MDApIHtcclxuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcclxuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuICAgICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcclxuICAgICAgICAgICAgICBzYWZlVGV4dChlcnJvci5tZXNzYWdlKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcclxuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XHJcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXHJcbiAgICAgICAgICAgIHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9VbmF2YWlsYWJsZVwiLCBcIk5vIHNlIHB1ZG8gb2J0ZW5lciBlbCB0aXBvIGRlIGNhbWJpby5cIilcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XHJcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XHJcbiAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpKTtcclxuICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICBpZiAoIWlzQ2FuY2VsbGVkKSB7XHJcbiAgICAgICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSwgRVhDSEFOR0VfUkFURV9ERUJPVU5DRV9NUyk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgaXNDYW5jZWxsZWQgPSB0cnVlO1xyXG4gICAgICBjbGVhclJlcXVlc3RBcnRpZmFjdHMoKTtcclxuICAgIH07XHJcbiAgfSwgW1xyXG4gICAgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXHJcbiAgICBmb3JtRXhjaGFuZ2VEYXRlLFxyXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXHJcbiAgICB1aUxvY2FsZSxcclxuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSB8fCBpc0xvYWRpbmcgfHwgIWhlYWRlcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFjYW5FZGl0QW55Q3VycmVudCkge1xyXG4gICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIHNldElzRWRpdGluZyh0cnVlKTtcclxuICAgIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIoaGVhZGVyKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRWRpdGluZ0VuYWJsZWRcIiwgXCJFZGl0aW5nIGVuYWJsZWRcIikpO1xyXG4gIH0sIFtjYW5FZGl0QW55Q3VycmVudCwgaGVhZGVyLCBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyLCBpc0NyZWF0ZU1vZGUsIGlzTG9hZGluZywgb25Gb3JiaWRkZW5dKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL0V4cGVuc2VTaGVldHNcIiwge1xyXG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWlzRWRpdGluZykgcmV0dXJuO1xyXG5cclxuICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlcihoZWFkZXIpO1xyXG4gICAgc2V0U3RhdHVzKGluZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpKTtcclxuICB9LCBbaGVhZGVyLCBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZ10pO1xyXG5cclxuICAvLyBPcGVucyBleHBlbnNlIHNoZWV0IGNyZWF0ZSBtb2RlIGZyb20gbGlzdC1sZXZlbCBlbnRyeSBwb2ludHMuXHJcbiAgY29uc3QgaGFuZGxlT3BlbkNyZWF0ZVNoZWV0TW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSkge1xyXG4gICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9tb2RlPWNyZWF0ZVwiLCB7XHJcbiAgICAgIGFza0NvbmZpcm1hdGlvbjogaXNFZGl0aW5nLFxyXG4gICAgfSk7XHJcbiAgfSwgW2NhbkNyZWF0ZUV4cGVuc2UsIGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nLCBvbkZvcmJpZGRlbl0pO1xyXG5cclxuICAvLyBPcGVucyBleHBlbnNlIGxpbmUgY3JlYXRlIG1vZGUgZnJvbSBhbiBleGlzdGluZyBleHBlbnNlIHNoZWV0IGRldGFpbC5cclxuICBjb25zdCBoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIXNoZWV0SWQgfHwgIWNhblVzZUZ1bGxFZGl0RmVhdHVyZXMpIHtcclxuICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRhcmdldFVybCA9IGAvR2FzdG9zL0V4cGVuc2VTaGVldExpbmVEZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNoZWV0SWQpfSZtb2RlPWNyZWF0ZWA7XHJcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwsIHtcclxuICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXHJcbiAgICB9KTtcclxuICB9LCBbY2FuVXNlRnVsbEVkaXRGZWF0dXJlcywgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmcsIG9uRm9yYmlkZGVuLCBzaGVldElkXSk7XHJcblxyXG4gIC8vIE9wZW5zIHRpY2tldHMgcGFnZSBmcm9tIGV4cGVuc2Ugc2hlZXQgY29udGV4dCB0byBjcmVhdGUgb3IgbGluayB0aWNrZXRzLlxyXG4gIGNvbnN0IG9wZW5UaWNrZXRzRnJvbVNoZWV0ID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoYWN0aW9uOiBcIm5ld1wiIHwgXCJsaW5rXCIpID0+IHtcclxuICAgICAgaWYgKCFzaGVldElkIHx8ICFjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzKSB7XHJcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XHJcbiAgICAgICAgYWN0aW9uLFxyXG4gICAgICAgIGhvamFHYXN0b3NJZDogc2hlZXRJZCxcclxuICAgICAgfSk7XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldHM/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcclxuICAgICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW2NhblVzZUZ1bGxFZGl0RmVhdHVyZXMsIGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nLCBvbkZvcmJpZGRlbiwgc2hlZXRJZF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVPcGVuQ3JlYXRlVGlja2V0TW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIG9wZW5UaWNrZXRzRnJvbVNoZWV0KFwibmV3XCIpO1xyXG4gIH0sIFtvcGVuVGlja2V0c0Zyb21TaGVldF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVPcGVuTGlua1RpY2tldE1vZGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBvcGVuVGlja2V0c0Zyb21TaGVldChcImxpbmtcIik7XHJcbiAgfSwgW29wZW5UaWNrZXRzRnJvbVNoZWV0XSk7XHJcblxyXG4gIGNvbnN0IG5hdmlnYXRlVG9DcmVhdGVkU2hlZXQgPSB1c2VDYWxsYmFjaygoY3JlYXRlZFNoZWV0SWQ6IHN0cmluZykgPT4ge1xyXG4gICAgY29uc3Qgc2FmZUNyZWF0ZWRTaGVldElkID0gc2FmZVRleHQoY3JlYXRlZFNoZWV0SWQpO1xyXG4gICAgaWYgKCFzYWZlQ3JlYXRlZFNoZWV0SWQpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVDcmVhdGVkU2hlZXRJZCl9YDtcclxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBuYXZpZ2F0ZVRvTGluZURldGFpbCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKFxyXG4gICAgICBsaW5lUmVjSWQ6IHN0cmluZyxcclxuICAgICAgb3B0aW9ucz86IHtcclxuICAgICAgICBtb2RlPzogXCJ2aWV3XCIgfCBcImVkaXRcIjtcclxuICAgICAgICBhc2tDb25maXJtYXRpb24/OiBib29sZWFuO1xyXG4gICAgICAgIGJ5cGFzc0d1YXJkT25jZT86IGJvb2xlYW47XHJcbiAgICAgIH1cclxuICAgICkgPT4ge1xyXG4gICAgICBjb25zdCBzYWZlTGluZUlkID0gc2FmZVRleHQobGluZVJlY0lkKTtcclxuICAgICAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChzaGVldElkKTtcclxuICAgICAgaWYgKCFzYWZlTGluZUlkIHx8ICFzYWZlU2hlZXRJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3Qgc2FmZU1vZGUgPSBvcHRpb25zPy5tb2RlID09PSBcImVkaXRcIiA/IFwiZWRpdFwiIDogXCJcIjtcclxuICAgICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0TGluZURldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZVNoZWV0SWQpfSZsaW5lUmVjSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZUxpbmVJZCl9JHtzYWZlTW9kZSA/IGAmbW9kZT0ke3NhZmVNb2RlfWAgOiBcIlwifWA7XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCwge1xyXG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogb3B0aW9ucz8uYXNrQ29uZmlybWF0aW9uID8/IHRydWUsXHJcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiBvcHRpb25zPy5ieXBhc3NHdWFyZE9uY2UgPz8gZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtzaGVldElkXVxyXG4gICk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoZWFkZXIsXHJcbiAgICBsaW5lcyxcclxuICAgIGxpbmVQYWdlLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgYnVzeSxcclxuICAgIHN0YXR1cyxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIG1vZGFsRXJyb3IsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsXHJcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvYWRpbmcsXHJcbiAgICBleGNoYW5nZVJhdGVNZXNzYWdlLFxyXG4gICAgZXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IsXHJcbiAgICBwcm9qZWN0VmFsdWUsXHJcbiAgICBpc1NoZWV0QXBwcm92ZWQsXHJcbiAgICBpc1NoZWV0UGFpZCxcclxuICAgIGlzU2hlZXRMb2NrZWQsXHJcbiAgICBleGNoYW5nZVJhdGVWYWx1ZSxcclxuICAgIHNob3dFeGNoYW5nZVJhdGUsXHJcbiAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcclxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcclxuICAgIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudDogRVhDSEFOR0VfUkFURV9SRUZFUkVOQ0VfQU1PVU5ULFxyXG4gICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXHJcbiAgICBkZXRhaWxQb2xpY3ksXHJcbiAgICBpc01hbmFnaW5nT3RoZXJVc2VyLFxyXG4gICAgY2FuRWRpdFN0YXR1c0NvbW1lbnRDdXJyZW50LFxyXG4gICAgY2FuRWRpdEFueUN1cnJlbnQsXHJcbiAgICBjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzLFxyXG4gICAgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXHJcbiAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcclxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcclxuICAgIHNldExpbmVQYWdlLFxyXG4gICAgc2V0TGluZXMsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBzZXREcmFmdFByb2plY3RJZCxcclxuICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICBzZXREcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBoYW5kbGVPcGVuQ3JlYXRlU2hlZXRNb2RlLFxyXG4gICAgaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlLFxyXG4gICAgaGFuZGxlT3BlbkNyZWF0ZVRpY2tldE1vZGUsXHJcbiAgICBoYW5kbGVPcGVuTGlua1RpY2tldE1vZGUsXHJcbiAgICBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0LFxyXG4gICAgbmF2aWdhdGVUb0xpbmVEZXRhaWwsXHJcbiAgfTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUFrQjs7O0FDQWxCLElBQUFDLGdCQUFrQjs7O0FDQWxCLG1CQUFpRjtBQUNqRix1QkFBNkI7QUF5R3JCO0FBN0ZSLElBQU0sd0JBQXdCLENBQUM7QUFBQSxFQUM3QjtBQUFBLEVBQ0E7QUFBQSxFQUNBLFlBQVk7QUFBQSxFQUNaLGlCQUFpQjtBQUNuQixNQUFrQztBQUNoQyxRQUFNLGdDQUFnQztBQUN0QyxRQUFNLDhCQUE4QjtBQUNwQyxRQUFNLHVCQUF1QjtBQUM3QixRQUFNLGdCQUFnQjtBQUN0QixRQUFNLENBQUMsUUFBUSxTQUFTLFFBQUksdUJBQVMsS0FBSztBQUMxQyxRQUFNLENBQUMsWUFBWSxhQUFhLFFBQUksdUJBQThCO0FBQUEsSUFDaEUsVUFBVTtBQUFBLElBQ1YsS0FBSztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLEVBQ2QsQ0FBQztBQUNELFFBQU0sZ0JBQVkscUJBQWlDLElBQUk7QUFDdkQsUUFBTSxlQUFXLHFCQUE4QixJQUFJO0FBRW5ELGtCQUFnQixDQUFDLFdBQVcsUUFBUSxHQUFHLE1BQU0sVUFBVSxLQUFLLENBQUM7QUFDN0QsUUFBTSwwQkFBc0IsMEJB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QSxNQUFDO0FBQUE7QUFBQSxRQUNDLFNBQVMsV0FBVyxhQUFhO0FBQUEsUUFDakMsTUFBTSxXQUFXLFFBQVEsV0FBVztBQUFBLFFBQ3BDLFVBQVUsV0FBVztBQUFBLFFBQ3JCLGVBQWUsV0FBVztBQUFBO0FBQUEsSUFDNUIsSUFDRTtBQUFBLElBRUgsV0FBVyxVQUNWO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxXQUFXLEtBQUssNkJBQTZCLHFCQUFrQjtBQUFBLFFBQy9ELE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLFFBQVEsV0FBVyxzQkFBc0Isb0NBQW9DO0FBQUEsUUFDN0UsZUFBZSxLQUFLLDZCQUE2QixxQkFBa0I7QUFBQSxRQUNuRSxXQUFXLFdBQVc7QUFBQTtBQUFBLElBQ3hCLElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFHQSxJQUFNLHlCQUF5QixNQUFNO0FBQ25DLFNBQ0UsNkNBQUMsZ0NBQXFCLHlCQUF1QixNQUMzQyx1REFBQyxpQ0FBOEIsR0FDakM7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLDBCQUF3QjtBQUN4QixRQUFNLFNBQVMsU0FBUyxlQUFlLDJCQUEyQjtBQUNsRSxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLDBCQUF1QixDQUFFO0FBQ3JEO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxpQ0FBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAicmVzcG9uc2UiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiXQp9Cg==
