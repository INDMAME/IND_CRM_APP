import {
  useExpenseSheetsFilterCache
} from "./chunks/chunk-73WLOVIE.js";
import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-OF6ODLTW.js";
import {
  ExpenseQuickTicketProgressOverlay_default,
  PageBottomActionButton,
  PageBottomActions_default,
  TICKET_IMAGE_ACCEPT_ATTRIBUTE,
  useExpenseSheetQuickTicketFlow
} from "./chunks/chunk-FQI72KDD.js";
import {
  resolveExpenseSheetDetailPolicy
} from "./chunks/chunk-JXC4T3HC.js";
import {
  getExpenseStatusLabel
} from "./chunks/chunk-WBHH7JK7.js";
import "./chunks/chunk-6JJRBKFS.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-LZSH3IN4.js";
import "./chunks/chunk-YMDESVRK.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseCurrencyFlagIcon_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-SV2WY3SH.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-QKSAMRAN.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-EJOK676V.js";
import {
  useOutsideClick
} from "./chunks/chunk-OSBLOXTE.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-2LYP2LM4.js";
import "./chunks/chunk-4BE3ZFCK.js";
import {
  isManagingOtherExpenseRecord,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-FMQKLPFH.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-PDB5ASGP.js";
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
} from "./chunks/chunk-TC2T4EQZ.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-YWX6VBOY.js";
import "./chunks/chunk-KUDPX4K4.js";
import "./chunks/chunk-ZBKHPZJX.js";
import {
  canAccess,
  classNames,
  showPermissionModal
} from "./chunks/chunk-UNQYUM6B.js";
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
} from "./chunks/chunk-PNIKV5DC.js";
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
var SAME_CURRENCY_EXCHANGE_RATE = 100;
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
      const usesSameCurrencyRate = canEditHeaderFields && normalizedCurrency !== "" && !requiresExchangeRate;
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
      const resolvedExchangeRate = canEditHeaderFields ? usesSameCurrencyRate ? SAME_CURRENCY_EXCHANGE_RATE : hasValidRate ? Number(parsedExchangeRate) : 1 : originalExchangeRate ?? parsedExchangeRate ?? 0;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvRXhwZW5zZVNoZWV0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvbi50c3giLCAiLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9JbmZvUG9wb3Zlckljb25CdXR0b24udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29uc3RhbnRzL2V4Y2hhbmdlUmF0ZUVudHJ5TW9kZUNhdGFsb2cudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VTaGVldEhlYWRlckZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlTGluZXNUaW1lbGluZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC9FeHBlbnNlU2hlZXREZXRhaWxPdmVybGF5cy50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRyb2xsZXIudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC91c2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xyXG5pbXBvcnQgRmxvYXRpbmdBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VTaGVldEhlYWRlckZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0SGVhZGVyRm9ybS50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VMaW5lc1RpbWVsaW5lIGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VMaW5lc1RpbWVsaW5lLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyIGZyb20gXCIuL0V4cGVuc2VTaGVldFN0YXR1c0FjdGlvbkJhci50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzIGZyb20gXCIuL0V4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzLnRzeFwiO1xyXG5pbXBvcnQgeyBib290c3RyYXBFeHBlbnNlQXBpQXV0aCwgdXNlRXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRyb2xsZXIgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udHJvbGxlci50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZSB9IGZyb20gXCIuLi9saXN0L3VzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZS50c1wiO1xyXG5cclxuY29uc3QgREVUQUlMX0ZBQl9CT1RUT01fV0lUSF9BQ1RJT05fQkFSID0gMTc2O1xyXG5jb25zdCBFWFBFTlNFX1NIRUVUU19MSVNUX1VSTCA9IFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXRzXCI7XHJcblxyXG5jb25zdCBFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udGVudCA9ICgpID0+IHtcclxuICBjb25zdCBjb250cm9sbGVyID0gdXNlRXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRyb2xsZXIoKTtcclxuICBjb25zdCB7IHJlYWRDYWNoZWRTdGF0ZSwgc2F2ZUNhY2hlZFN0YXRlIH0gPSB1c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUoKTtcclxuXHJcbiAgY29uc3QgcmVhcm1FeHBlbnNlU2hlZXRzUmV0dXJuU3RhdGUgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBjYWNoZWRTdGF0ZSA9IHJlYWRDYWNoZWRTdGF0ZSgpO1xyXG4gICAgaWYgKCFjYWNoZWRTdGF0ZSkgcmV0dXJuO1xyXG4gICAgc2F2ZUNhY2hlZFN0YXRlKGNhY2hlZFN0YXRlKTtcclxuICB9LCBbcmVhZENhY2hlZFN0YXRlLCBzYXZlQ2FjaGVkU3RhdGVdKTtcclxuXHJcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGJhY2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbEJhY2tCdG5cIik7XHJcbiAgICBpZiAoIWJhY2tCdXR0b24pIHJldHVybjtcclxuXHJcbiAgICBiYWNrQnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtYmFjay11cmxcIiwgRVhQRU5TRV9TSEVFVFNfTElTVF9VUkwpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGJhY2tCdXR0b24ucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1iYWNrLXVybFwiKTtcclxuICAgIH07XHJcbiAgfSwgW10pO1xyXG5cclxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgaGFuZGxlTmF0aXZlQmFjayA9IChldmVudCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQ/LnN0YXRlICYmIGV2ZW50LnN0YXRlLmluZFRyYXAgPT09IHRydWUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGV4ZWN1dGVCYWNrTmF2aWdhdGlvbiA9ICgpID0+IHtcclxuICAgICAgICByZWFybUV4cGVuc2VTaGVldHNSZXR1cm5TdGF0ZSgpO1xyXG4gICAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKEVYUEVOU0VfU0hFRVRTX0xJU1RfVVJMKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIHdpbmRvdy5fX2luZFJlcXVlc3ROYXZpZ2F0aW9uKGV4ZWN1dGVCYWNrTmF2aWdhdGlvbik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBleGVjdXRlQmFja05hdmlnYXRpb24oKTtcclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBoYW5kbGVOYXRpdmVCYWNrKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgaGFuZGxlTmF0aXZlQmFjayk7XHJcbiAgICB9O1xyXG4gIH0sIFtyZWFybUV4cGVuc2VTaGVldHNSZXR1cm5TdGF0ZV0pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cclxuICAgICAgPEV4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzXHJcbiAgICAgICAgbW9kYWw9e2NvbnRyb2xsZXIubW9kYWx9XHJcbiAgICAgICAgbW9kYWxFcnJvcj17Y29udHJvbGxlci5tb2RhbEVycm9yfVxyXG4gICAgICAgIHN0YXR1cz17Y29udHJvbGxlci5zdGF0dXN9XHJcbiAgICAgICAgYnVzeT17Y29udHJvbGxlci5idXN5fVxyXG4gICAgICAgIGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZT17Y29udHJvbGxlci5pc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGV9XHJcbiAgICAgICAgbW9kYWxMb2FkaW5nVGV4dD17Y29udHJvbGxlci5tb2RhbExvYWRpbmdUZXh0fVxyXG4gICAgICAgIG1vZGFsQ2FuY2VsVGV4dD17Y29udHJvbGxlci5tb2RhbENhbmNlbFRleHR9XHJcbiAgICAgICAgbW9kYWxDb25maXJtVGV4dD17Y29udHJvbGxlci5tb2RhbENvbmZpcm1UZXh0fVxyXG4gICAgICAgIG1vZGFsQm9keT17Y29udHJvbGxlci5tb2RhbEJvZHl9XHJcbiAgICAgICAgY2FtZXJhSW5wdXRSZWY9e2NvbnRyb2xsZXIuY2FtZXJhSW5wdXRSZWZ9XHJcbiAgICAgICAgZ2FsbGVyeUlucHV0UmVmPXtjb250cm9sbGVyLmdhbGxlcnlJbnB1dFJlZn1cclxuICAgICAgICBzb3VyY2VQaWNrZXJPcGVuPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5zb3VyY2VQaWNrZXJPcGVufVxyXG4gICAgICAgIHF1aWNrVGlja2V0QnVzeT17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuYnVzeX1cclxuICAgICAgICBxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZT17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cucHJvZ3Jlc3NNZXNzYWdlfVxyXG4gICAgICAgIHF1aWNrVGlja2V0UHJvZ3Jlc3NTdGFnZXM9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnByb2dyZXNzU3RhZ2VzfVxyXG4gICAgICAgIHF1aWNrVGlja2V0RWxhcHNlZE1zPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5wcm9ncmVzc0VsYXBzZWRNc31cclxuICAgICAgICBxdWlja1RpY2tldEVycm9yTWVzc2FnZT17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuZXJyb3JNZXNzYWdlfVxyXG4gICAgICAgIHF1aWNrVGlja2V0QXR0ZW1wdElkPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5hdHRlbXB0SWR9XHJcbiAgICAgICAgcXVpY2tUaWNrZXRUcmFjZUxpc3Q9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnRyYWNlTGlzdH1cclxuICAgICAgICBoYXNQZW5kaW5nVXBsb2FkUmV0cnk9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93Lmhhc1BlbmRpbmdVcGxvYWRSZXRyeX1cclxuICAgICAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZT17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuaGFzUGFydGlhbFRpY2tldEZhaWx1cmV9XHJcbiAgICAgICAgb25Db25maXJtPXtjb250cm9sbGVyLmhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17Y29udHJvbGxlci5jbG9zZUNvbmZpcm19XHJcbiAgICAgICAgb25TZWxlY3RlZENhbWVyYUZpbGU9eyhmaWxlKSA9PiB7XHJcbiAgICAgICAgICB2b2lkIGNvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmhhbmRsZVNlbGVjdGVkRmlsZShmaWxlLCBcImNhbWVyYVwiKTtcclxuICAgICAgICB9fVxyXG4gICAgICAgIG9uU2VsZWN0ZWRHYWxsZXJ5RmlsZT17KGZpbGUpID0+IHtcclxuICAgICAgICAgIHZvaWQgY29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuaGFuZGxlU2VsZWN0ZWRGaWxlKGZpbGUsIFwiZ2FsbGVyeVwiKTtcclxuICAgICAgICB9fVxyXG4gICAgICAgIG9uU2VsZWN0RnJvbUNhbWVyYT17KCkgPT4ge1xyXG4gICAgICAgICAgdm9pZCBjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5zZWxlY3RGcm9tQ2FtZXJhKGNvbnRyb2xsZXIuY2FtZXJhSW5wdXRSZWYuY3VycmVudCk7XHJcbiAgICAgICAgfX1cclxuICAgICAgICBvblNlbGVjdEZyb21HYWxsZXJ5PXsoKSA9PiBjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5zZWxlY3RGcm9tR2FsbGVyeShjb250cm9sbGVyLmdhbGxlcnlJbnB1dFJlZi5jdXJyZW50KX1cclxuICAgICAgICBvbkNsb3NlU291cmNlUGlja2VyPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5jbG9zZVNvdXJjZVBpY2tlcn1cclxuICAgICAgICBvblJldHJ5UGVuZGluZ1VwbG9hZD17KCkgPT4ge1xyXG4gICAgICAgICAgdm9pZCBjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5yZXRyeVBlbmRpbmdVcGxvYWQoKTtcclxuICAgICAgICB9fVxyXG4gICAgICAgIG9uT3BlbkNyZWF0ZWRUaWNrZXQ9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93Lm9wZW5DcmVhdGVkVGlja2V0fVxyXG4gICAgICAgIG9uQ2xlYXJRdWlja1RpY2tldEVycm9yPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5jbGVhckVycm9yfVxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXHJcbiAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogY29udHJvbGxlci5pc0xvYWRpbmcgfHwgY29udHJvbGxlci5pc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XHJcbiAgICAgID5cclxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxyXG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAge2NvbnRyb2xsZXIuZXJyb3JNZXNzYWdlID8gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntjb250cm9sbGVyLmVycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxyXG5cclxuICAgICAgeyFjb250cm9sbGVyLmlzTG9hZGluZyAmJiAhY29udHJvbGxlci5pc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUgJiYgIWNvbnRyb2xsZXIuZXJyb3JNZXNzYWdlICYmIGNvbnRyb2xsZXIuaGVhZGVyID8gKFxyXG4gICAgICAgIDxFeHBlbnNlU2hlZXRIZWFkZXJGb3JtXHJcbiAgICAgICAgICBpc0NyZWF0ZU1vZGU9e2NvbnRyb2xsZXIuaXNDcmVhdGVNb2RlfVxyXG4gICAgICAgICAgaXNFZGl0aW5nPXtjb250cm9sbGVyLmlzRWRpdGluZ31cclxuICAgICAgICAgIGNhbkVkaXRIZWFkZXJGaWVsZHM9e2NvbnRyb2xsZXIuY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnR9XHJcbiAgICAgICAgICBzdGF0dXNDb21tZW50TW9kZT17Y29udHJvbGxlci5zdGF0dXNDb21tZW50TW9kZX1cclxuICAgICAgICAgIGhlYWRlcj17Y29udHJvbGxlci5oZWFkZXJ9XHJcbiAgICAgICAgICBwcm9qZWN0VmFsdWU9e2NvbnRyb2xsZXIucHJvamVjdFZhbHVlfVxyXG4gICAgICAgICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXM9e2NvbnRyb2xsZXIuaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXN9XHJcbiAgICAgICAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXM9e2NvbnRyb2xsZXIuaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzfVxyXG4gICAgICAgICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3k9e2NvbnRyb2xsZXIubm9ybWFsaXplZERyYWZ0Q3VycmVuY3l9XHJcbiAgICAgICAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k9e2NvbnRyb2xsZXIuZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5fVxyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50PXtjb250cm9sbGVyLmV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudH1cclxuICAgICAgICAgIHNob3dFeGNoYW5nZVJhdGU9e2NvbnRyb2xsZXIuc2hvd0V4Y2hhbmdlUmF0ZX1cclxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZVZhbHVlPXtjb250cm9sbGVyLmV4Y2hhbmdlUmF0ZVZhbHVlfVxyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2U9e2NvbnRyb2xsZXIuZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2V9XHJcbiAgICAgICAgICB0b3RhbEFtb3VudFRleHQ9e2NvbnRyb2xsZXIudG90YWxBbW91bnRUZXh0fVxyXG4gICAgICAgICAgZHJhZnREZXNjcmlwdGlvbj17Y29udHJvbGxlci5kcmFmdERlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgZHJhZnRQcm9qZWN0SWQ9e2NvbnRyb2xsZXIuZHJhZnRQcm9qZWN0SWR9XHJcbiAgICAgICAgICBkcmFmdEN1cnJlbmN5Q29kZT17Y29udHJvbGxlci5kcmFmdEN1cnJlbmN5Q29kZX1cclxuICAgICAgICAgIGRyYWZ0RXhjaGFuZ2VSYXRlPXtjb250cm9sbGVyLmRyYWZ0RXhjaGFuZ2VSYXRlfVxyXG4gICAgICAgICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZT17Y29udHJvbGxlci5vZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlfVxyXG4gICAgICAgICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlPXtjb250cm9sbGVyLm9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZX1cclxuICAgICAgICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlPXtjb250cm9sbGVyLm9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlfVxyXG4gICAgICAgICAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlPXtjb250cm9sbGVyLnNldERyYWZ0RGVzY3JpcHRpb259XHJcbiAgICAgICAgICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlPXtjb250cm9sbGVyLnNldERyYWZ0UHJvamVjdElkfVxyXG4gICAgICAgICAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZT17Y29udHJvbGxlci5zZXREcmFmdEN1cnJlbmN5Q29kZX1cclxuICAgICAgICAgIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2U9e2NvbnRyb2xsZXIuc2V0RHJhZnRFeGNoYW5nZVJhdGV9XHJcbiAgICAgICAgLz5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICB7IWNvbnRyb2xsZXIuaXNDcmVhdGVNb2RlICYmICFjb250cm9sbGVyLmlzTG9hZGluZyAmJiAhY29udHJvbGxlci5pc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUgJiYgIWNvbnRyb2xsZXIuZXJyb3JNZXNzYWdlID8gKFxyXG4gICAgICAgIDxFeHBlbnNlTGluZXNUaW1lbGluZVxyXG4gICAgICAgICAgdmlzaWJsZUxpbmVzPXtjb250cm9sbGVyLnZpc2libGVMaW5lc31cclxuICAgICAgICAgIGN1cnJlbmN5Q29kZT17c2FmZVRleHQoY29udHJvbGxlci5oZWFkZXI/LmN1cnJlbmN5Q29kZSl9XHJcbiAgICAgICAgICB0b3RhbExpbmVQYWdlcz17Y29udHJvbGxlci50b3RhbExpbmVQYWdlc31cclxuICAgICAgICAgIGxpbmVQYWdlPXtjb250cm9sbGVyLmxpbmVQYWdlfVxyXG4gICAgICAgICAgbGluZXNMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfTGluZXNcIiwgXCJMaW5lc1wiKX1cclxuICAgICAgICAgIGVtcHR5VGV4dD17aW5kVChcIkV4cGVuc2VTaGVldHNfTm9MaW5lc1wiLCBcIk5vIGxpbmVzIGZvciB0aGlzIGV4cGVuc2Ugc2hlZXQuXCIpfVxyXG4gICAgICAgICAgcGFnaW5hdGlvbkxhYmVscz17Y29udHJvbGxlci5wYWdpbmF0aW9uTGFiZWxzfVxyXG4gICAgICAgICAgY29udGFpbmVyUmVmPXtjb250cm9sbGVyLmxpbmVDb250YWluZXJSZWZ9XHJcbiAgICAgICAgICBvbkxpbmVQYWdlQ2hhbmdlPXtjb250cm9sbGVyLnNldExpbmVQYWdlfVxyXG4gICAgICAgICAgb25PcGVuTGluZT17Y29udHJvbGxlci5uYXZpZ2F0ZVRvTGluZURldGFpbH1cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHtjb250cm9sbGVyLnNob3dTdGF0dXNBY3Rpb25CYXIgPyAoXHJcbiAgICAgICAgPEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbkJhclxyXG4gICAgICAgICAgYWN0aW9ucz17Y29udHJvbGxlci5kZXRhaWxQb2xpY3kuc3RhdHVzQWN0aW9uc31cclxuICAgICAgICAgIGJ1c3k9e2NvbnRyb2xsZXIuYnVzeSB8fCBjb250cm9sbGVyLmlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZX1cclxuICAgICAgICAgIGRpc2FibGVkPXtjb250cm9sbGVyLmFyZVN0YXR1c0FjdGlvbnNEaXNhYmxlZH1cclxuICAgICAgICAgIG9uQWN0aW9uQ2xpY2s9e2NvbnRyb2xsZXIuaGFuZGxlU3RhdHVzQWN0aW9uQ2xpY2t9XHJcbiAgICAgICAgLz5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICB7Y29udHJvbGxlci5zaG93RmFiID8gKFxyXG4gICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxyXG4gICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfQWN0aW9uc1wiLCBcIkFjY2lvbmVzIHJcdTAwRTFwaWRhc1wiKX1cclxuICAgICAgICAgIHNpemU9ezc2fVxyXG4gICAgICAgICAgcmlnaHQ9ezE2fVxyXG4gICAgICAgICAgYm90dG9tPXtjb250cm9sbGVyLnNob3dTdGF0dXNBY3Rpb25CYXIgPyBERVRBSUxfRkFCX0JPVFRPTV9XSVRIX0FDVElPTl9CQVIgOiAyNH1cclxuICAgICAgICAgIG1lbnVBcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgclx1MDBFMXBpZGFzXCIpfVxyXG4gICAgICAgICAgbWVudUl0ZW1zPXtjb250cm9sbGVyLmZhYk1lbnVJdGVtc31cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlxyXG5jb25zdCBFeHBlbnNlU2hlZXREZXRhaWxQYWdlID0gKCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnMgZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQ+XHJcbiAgICAgIDxFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udGVudCAvPlxyXG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cclxuICApO1xyXG59O1xyXG5cclxuY29uc3QgbW91bnQgPSAoKSA9PiB7XHJcbiAgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGgoKTtcclxuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cGVuc2Utc2hlZXQtZGV0YWlsLXJvb3RcIik7XHJcbiAgaWYgKCFyb290RWwpIHJldHVybjtcclxuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPEV4cGVuc2VTaGVldERldGFpbFBhZ2UgLz4pO1xyXG59O1xyXG5cclxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXREZXRhaWxQYWdlO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IEluZm9Qb3BvdmVySWNvbkJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0luZm9Qb3BvdmVySWNvbkJ1dHRvbi50c3hcIjtcclxuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QgZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0LnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24udHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlUmVhZE9ubHlGaWVsZCBmcm9tIFwiLi9FeHBlbnNlUmVhZE9ubHlGaWVsZC50c3hcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlciwgZm9ybWF0RXhwZW5zZU51bWJlciB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvblByb3BzID0ge1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBjYW5FZGl0SGVhZGVyRmllbGRzOiBib29sZWFuO1xyXG4gIGlzRm9yZWlnbkN1cnJlbmN5OiBib29sZWFuO1xyXG4gIGV4cGVuc2VDdXJyZW5jeUxhYmVsOiBzdHJpbmc7XHJcbiAgaGVhZGVyQ3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgYmFzZUN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRFeGNoYW5nZVJhdGU6IHN0cmluZztcclxuICBleGNoYW5nZVJhdGVWYWx1ZTogc3RyaW5nO1xyXG4gIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlOiBzdHJpbmc7XHJcbiAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50OiBudW1iZXI7XHJcbiAgc2hvd0V4Y2hhbmdlUmF0ZTogYm9vbGVhbjtcclxuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogYm9vbGVhbjtcclxuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XHJcbiAgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2U6IHN0cmluZztcclxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIE93bnMgdGhlIGN1cnJlbmN5IGFuZCBleGNoYW5nZS1yYXRlIFVJIHNvIHRoZSBoZWFkZXIgZm9ybSBzdGF5cyBjb21wYWN0LlxyXG5jb25zdCBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb24gPSAoe1xyXG4gIGlzRWRpdGluZyxcclxuICBjYW5FZGl0SGVhZGVyRmllbGRzLFxyXG4gIGlzRm9yZWlnbkN1cnJlbmN5LFxyXG4gIGV4cGVuc2VDdXJyZW5jeUxhYmVsLFxyXG4gIGhlYWRlckN1cnJlbmN5Q29kZSxcclxuICBiYXNlQ3VycmVuY3lDb2RlLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gIGV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlLFxyXG4gIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudCxcclxuICBzaG93RXhjaGFuZ2VSYXRlLFxyXG4gIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxyXG4gIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcclxuICBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZSxcclxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlLFxyXG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2UsXHJcbn06IEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvblByb3BzKSA9PiB7XHJcbiAgY29uc3QgbG9jYWxDdXJyZW5jeU9wdGlvbnMgPSBSZWFjdC51c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oXHJcbiAgICAoKSA9PiBbXHJcbiAgICAgIHtcclxuICAgICAgICB2YWx1ZTogYmFzZUN1cnJlbmN5Q29kZSxcclxuICAgICAgICB0ZXh0OiBiYXNlQ3VycmVuY3lDb2RlLFxyXG4gICAgICAgIGljb246IDxFeHBlbnNlQ3VycmVuY3lGbGFnSWNvbiBjdXJyZW5jeUNvZGU9e2Jhc2VDdXJyZW5jeUNvZGV9IHNpemVDbGFzc05hbWU9XCJoLTYgdy02XCIgLz4sXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgW2Jhc2VDdXJyZW5jeUNvZGVdXHJcbiAgKTtcclxuICBjb25zdCBoZWFkZXJDdXJyZW5jeU9wdGlvbnMgPSBSZWFjdC51c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oXHJcbiAgICAoKSA9PiBbXHJcbiAgICAgIHtcclxuICAgICAgICB2YWx1ZTogaGVhZGVyQ3VycmVuY3lDb2RlIHx8IFwiLVwiLFxyXG4gICAgICAgIHRleHQ6IGhlYWRlckN1cnJlbmN5Q29kZSB8fCBcIi1cIixcclxuICAgICAgICBpY29uOiA8RXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gY3VycmVuY3lDb2RlPXtoZWFkZXJDdXJyZW5jeUNvZGUgfHwgXCItXCJ9IHNpemVDbGFzc05hbWU9XCJoLTYgdy02XCIgLz4sXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgW2hlYWRlckN1cnJlbmN5Q29kZV1cclxuICApO1xyXG5cclxuICBpZiAoaXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHMpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBzcGFjZS15LTNcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGdyaWQgZ2FwLTQgJHtpc0ZvcmVpZ25DdXJyZW5jeSA/IFwiZ3JpZC1jb2xzLTJcIiA6IFwiZ3JpZC1jb2xzLTFcIn1gLnRyaW0oKX0+XHJcbiAgICAgICAgICB7aXNGb3JlaWduQ3VycmVuY3kgPyAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntleHBlbnNlQ3VycmVuY3lMYWJlbH08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdFxyXG4gICAgICAgICAgICAgICAgICBsYWJlbD17ZXhwZW5zZUN1cnJlbmN5TGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lfUGxhY2Vob2xkZXJcIiwgXCJDdXJyZW5jeSBjb2RlXCIpfVxyXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRDdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZyB8fCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cclxuICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmcgfHwgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXN9XHJcbiAgICAgICAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtaGVhZGVyLWN1cnJlbmN5XCJcclxuICAgICAgICAgICAgICAgICAgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHRcclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzcGFjZS15LTEuNVwiPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgcHItOCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0V4Y2hhbmdlUmF0ZVwiLCBcIkV4Y2hhbmdlIHJhdGVcIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxJbmZvUG9wb3Zlckljb25CdXR0b25cclxuICAgICAgICAgICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfSW5mb1BvcG92ZXJfQXJpYVwiLCBcIlNob3cgZXhjaGFuZ2UgcmF0ZSBpbmZvcm1hdGlvblwiKX1cclxuICAgICAgICAgICAgICAgICAgY29udGVudD17ZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHJpZ2h0LTAgLXRvcC0xIHotMjBcIlxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvcm0tY29udHJvbCAke2V4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlID8gXCJib3JkZXItZGFuZ2VyIHJpbmctMSByaW5nLWRhbmdlclwiIDogXCJcIn0gJHtpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJcIn1gfVxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dE1vZGU9XCJkZWNpbWFsXCJcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRFeGNoYW5nZVJhdGV9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XHJcbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXsoZXZlbnQpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiA3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogNyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxsYmFjazogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhjaGFuZ2VSYXRlXCIsIFwiRXhjaGFuZ2UgcmF0ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhjaGFuZ2VSYXRlXCIsIFwiRXhjaGFuZ2UgcmF0ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17aXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzfVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXN9XHJcbiAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8RXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0XHJcbiAgICAgICAgICAgICAgbGFiZWw9e2V4cGVuc2VDdXJyZW5jeUxhYmVsfVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lfUGxhY2Vob2xkZXJcIiwgXCJDdXJyZW5jeSBjb2RlXCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdEN1cnJlbmN5Q29kZX1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZX1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZyB8fCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cclxuICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZyB8fCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cclxuICAgICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLWhlYWRlci1jdXJyZW5jeVwiXHJcbiAgICAgICAgICAgICAgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHRcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIHtpc0ZvcmVpZ25DdXJyZW5jeSA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtNFwiPlxyXG4gICAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfTG9jYWxDdXJyZW5jeVwiLCBcIkxvY2FsIGN1cnJlbmN5XCIpfVxyXG4gICAgICAgICAgICAgIG9wdGlvbnM9e2xvY2FsQ3VycmVuY3lPcHRpb25zfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtiYXNlQ3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeV9QbGFjZWhvbGRlclwiLCBcIkN1cnJlbmN5IGNvZGVcIil9XHJcbiAgICAgICAgICAgICAgcmVhZE9ubHlcclxuICAgICAgICAgICAgICBkaXNhYmxlZFxyXG4gICAgICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cclxuICAgICAgICAgICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cclxuICAgICAgICAgICAgICBzaG93TGFiZWxcclxuICAgICAgICAgICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxyXG4gICAgICAgICAgICAgIHNlbGVjdGVkVGV4dE1vZGU9XCJ2YWx1ZVwiXHJcbiAgICAgICAgICAgICAgZHJvcGRvd25NYXhIZWlnaHRDbGFzcz1cIm1heC1oLTk2XCJcclxuICAgICAgICAgICAgICBzZWxlY3RlZEljb25DbGFzc05hbWU9XCJoLTYgdy02XCJcclxuICAgICAgICAgICAgICBvcHRpb25JY29uQ2xhc3NOYW1lPVwiaC02IHctNlwiXHJcbiAgICAgICAgICAgICAgc2VsZWN0ZWRJbnB1dFBhZGRpbmdDbGFzc05hbWU9XCJwbC0xMlwiXHJcbiAgICAgICAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS1oZWFkZXItbG9jYWwtY3VycmVuY3lcIlxyXG4gICAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XHJcbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9BbW91bnRcIiwgXCJBbW91bnRcIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBpbmQtcmVhZG9ubHktZmllbGRcIlxyXG4gICAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1hdEV4cGVuc2VOdW1iZXIoZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LCB7XHJcbiAgICAgICAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogNyxcclxuICAgICAgICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiA3LFxyXG4gICAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgZmFsbGJhY2s6IFwiLVwiLFxyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9BbW91bnRcIiwgXCJBbW91bnRcIil9XHJcbiAgICAgICAgICAgICAgICByZWFkT25seVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWRcclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICB7aXNGb3JlaWduQ3VycmVuY3kgJiYgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlciB0ZXh0LXNtXCI+e2V4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlfTwvcD4gOiBudWxsfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XHJcbiAgICAgICAgb3B0aW9ucz17aGVhZGVyQ3VycmVuY3lPcHRpb25zfVxyXG4gICAgICAgIHZhbHVlPXtoZWFkZXJDdXJyZW5jeUNvZGUgfHwgXCItXCJ9XHJcbiAgICAgICAgb25DaGFuZ2U9eygpID0+IHVuZGVmaW5lZH1cclxuICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5X1BsYWNlaG9sZGVyXCIsIFwiQ3VycmVuY3kgY29kZVwiKX1cclxuICAgICAgICByZWFkT25seVxyXG4gICAgICAgIGRpc2FibGVkXHJcbiAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxyXG4gICAgICAgIHNob3dTZWFyY2hCdXR0b249e2ZhbHNlfVxyXG4gICAgICAgIHNob3dMYWJlbFxyXG4gICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XHJcbiAgICAgICAgc2VsZWN0ZWRUZXh0TW9kZT1cInZhbHVlXCJcclxuICAgICAgICBkcm9wZG93bk1heEhlaWdodENsYXNzPVwibWF4LWgtOTZcIlxyXG4gICAgICAgIHNlbGVjdGVkSWNvbkNsYXNzTmFtZT1cImgtNiB3LTZcIlxyXG4gICAgICAgIG9wdGlvbkljb25DbGFzc05hbWU9XCJoLTYgdy02XCJcclxuICAgICAgICBzZWxlY3RlZElucHV0UGFkZGluZ0NsYXNzTmFtZT1cInBsLTEyXCJcclxuICAgICAgICBpZEJhc2U9XCJleHBlbnNlLWhlYWRlci1jdXJyZW5jeS1yZWFkb25seVwiXHJcbiAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgIC8+XHJcbiAgICAgIHshaXNFZGl0aW5nICYmIHNob3dFeGNoYW5nZVJhdGUgPyAoXHJcbiAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9FeGNoYW5nZVJhdGVcIiwgXCJFeGNoYW5nZSByYXRlXCIpfSB2YWx1ZT17ZXhjaGFuZ2VSYXRlVmFsdWV9IC8+XHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgPC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvbjtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VMYXlvdXRFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSBcInJlYWN0LWRvbVwiO1xyXG5pbXBvcnQgeyB1c2VPdXRzaWRlQ2xpY2sgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlT3V0c2lkZUNsaWNrLnRzXCI7XHJcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xyXG5cclxudHlwZSBJbmZvUG9wb3Zlckljb25CdXR0b25Qcm9wcyA9IHtcclxuICBjb250ZW50OiBSZWFjdC5SZWFjdE5vZGU7XHJcbiAgYXJpYUxhYmVsOiBzdHJpbmc7XHJcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIHBhbmVsQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG59O1xyXG5cclxuLy8gU2hhcmVkIGR1bWIgcG9wb3ZlciB0cmlnZ2VyIHVzZWQgdG8gZGlzcGxheSBzaG9ydCBjb250ZXh0dWFsIGluZm8uXHJcbmNvbnN0IEluZm9Qb3BvdmVySWNvbkJ1dHRvbiA9ICh7XHJcbiAgY29udGVudCxcclxuICBhcmlhTGFiZWwsXHJcbiAgY2xhc3NOYW1lID0gXCJcIixcclxuICBwYW5lbENsYXNzTmFtZSA9IFwiXCIsXHJcbn06IEluZm9Qb3BvdmVySWNvbkJ1dHRvblByb3BzKSA9PiB7XHJcbiAgY29uc3QgSE9SSVpPTlRBTF9WSUVXUE9SVF9HVVRURVJfUFggPSA4O1xyXG4gIGNvbnN0IFZFUlRJQ0FMX1ZJRVdQT1JUX0dVVFRFUl9QWCA9IDg7XHJcbiAgY29uc3QgUEFORUxfVFJJR0dFUl9HQVBfUFggPSA2O1xyXG4gIGNvbnN0IEdMT0JBTF9SQURJVVMgPSBcInZhcigtLXJhZGl1cy14bCwgNXB4KVwiO1xyXG4gIGNvbnN0IFtpc09wZW4sIHNldElzT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3BhbmVsU3R5bGUsIHNldFBhbmVsU3R5bGVdID0gdXNlU3RhdGU8UmVhY3QuQ1NTUHJvcGVydGllcz4oe1xyXG4gICAgcG9zaXRpb246IFwiZml4ZWRcIixcclxuICAgIHRvcDogMCxcclxuICAgIGxlZnQ6IDAsXHJcbiAgICB2aXNpYmlsaXR5OiBcImhpZGRlblwiLFxyXG4gIH0pO1xyXG4gIGNvbnN0IGJ1dHRvblJlZiA9IHVzZVJlZjxIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHBhbmVsUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIHVzZU91dHNpZGVDbGljayhbYnV0dG9uUmVmLCBwYW5lbFJlZl0sICgpID0+IHNldElzT3BlbihmYWxzZSkpO1xyXG4gIGNvbnN0IHVwZGF0ZVBhbmVsUG9zaXRpb24gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYnV0dG9uRWxlbWVudCA9IGJ1dHRvblJlZi5jdXJyZW50O1xyXG4gICAgY29uc3QgcGFuZWxFbGVtZW50ID0gcGFuZWxSZWYuY3VycmVudDtcclxuICAgIGlmICghYnV0dG9uRWxlbWVudCB8fCAhcGFuZWxFbGVtZW50KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBidXR0b25SZWN0ID0gYnV0dG9uRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IHBhbmVsUmVjdCA9IHBhbmVsRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IHZpZXdwb3J0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgIGNvbnN0IHZpZXdwb3J0SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgY29uc3Qgc2FmZVdpZHRoID0gTWF0aC5taW4ocGFuZWxSZWN0LndpZHRoLCBNYXRoLm1heCgxODAsIHZpZXdwb3J0V2lkdGggLSBIT1JJWk9OVEFMX1ZJRVdQT1JUX0dVVFRFUl9QWCAqIDIpKTtcclxuXHJcbiAgICBsZXQgbGVmdCA9IGJ1dHRvblJlY3QubGVmdCArIGJ1dHRvblJlY3Qud2lkdGggLyAyIC0gc2FmZVdpZHRoIC8gMjtcclxuICAgIGxlZnQgPSBNYXRoLm1heChIT1JJWk9OVEFMX1ZJRVdQT1JUX0dVVFRFUl9QWCwgTWF0aC5taW4obGVmdCwgdmlld3BvcnRXaWR0aCAtIHNhZmVXaWR0aCAtIEhPUklaT05UQUxfVklFV1BPUlRfR1VUVEVSX1BYKSk7XHJcblxyXG4gICAgbGV0IHRvcCA9IGJ1dHRvblJlY3QuYm90dG9tICsgUEFORUxfVFJJR0dFUl9HQVBfUFg7XHJcbiAgICBjb25zdCBoYXNCb3R0b21PdmVyZmxvdyA9IHRvcCArIHBhbmVsUmVjdC5oZWlnaHQgKyBWRVJUSUNBTF9WSUVXUE9SVF9HVVRURVJfUFggPiB2aWV3cG9ydEhlaWdodDtcclxuICAgIGlmIChoYXNCb3R0b21PdmVyZmxvdykge1xyXG4gICAgICBjb25zdCB0b3BBYm92ZVRyaWdnZXIgPSBidXR0b25SZWN0LnRvcCAtIHBhbmVsUmVjdC5oZWlnaHQgLSBQQU5FTF9UUklHR0VSX0dBUF9QWDtcclxuICAgICAgdG9wID0gdG9wQWJvdmVUcmlnZ2VyID49IFZFUlRJQ0FMX1ZJRVdQT1JUX0dVVFRFUl9QWFxyXG4gICAgICAgID8gdG9wQWJvdmVUcmlnZ2VyXHJcbiAgICAgICAgOiBNYXRoLm1heChWRVJUSUNBTF9WSUVXUE9SVF9HVVRURVJfUFgsIHZpZXdwb3J0SGVpZ2h0IC0gcGFuZWxSZWN0LmhlaWdodCAtIFZFUlRJQ0FMX1ZJRVdQT1JUX0dVVFRFUl9QWCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0UGFuZWxTdHlsZSh7XHJcbiAgICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXHJcbiAgICAgIHRvcDogTWF0aC5yb3VuZCh0b3ApLFxyXG4gICAgICBsZWZ0OiBNYXRoLnJvdW5kKGxlZnQpLFxyXG4gICAgICB3aWR0aDogTWF0aC5yb3VuZChzYWZlV2lkdGgpLFxyXG4gICAgICB2aXNpYmlsaXR5OiBcInZpc2libGVcIixcclxuICAgIH0pO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaXNPcGVuKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHVwZGF0ZVBhbmVsUG9zaXRpb24oKTtcclxuICB9LCBbaXNPcGVuLCBjb250ZW50LCB1cGRhdGVQYW5lbFBvc2l0aW9uXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWlzT3Blbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBoYW5kbGVWaWV3cG9ydENoYW5nZSA9ICgpID0+IHVwZGF0ZVBhbmVsUG9zaXRpb24oKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGhhbmRsZVZpZXdwb3J0Q2hhbmdlKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhhbmRsZVZpZXdwb3J0Q2hhbmdlLCB0cnVlKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGhhbmRsZVZpZXdwb3J0Q2hhbmdlKTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlVmlld3BvcnRDaGFuZ2UsIHRydWUpO1xyXG4gICAgfTtcclxuICB9LCBbaXNPcGVuLCB1cGRhdGVQYW5lbFBvc2l0aW9uXSk7XHJcblxyXG4gIGNvbnN0IHBvcnRhbFRhcmdldCA9IHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIiA/IG51bGwgOiBkb2N1bWVudC5ib2R5O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJpbmxpbmUtZmxleFwiLCBjbGFzc05hbWUpfT5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgIHJlZj17YnV0dG9uUmVmfVxyXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbH1cclxuICAgICAgICBhcmlhLWV4cGFuZGVkPXtpc09wZW59XHJcbiAgICAgICAgYXJpYS1oYXNwb3B1cD1cImRpYWxvZ1wiXHJcbiAgICAgICAgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaC02IHctNiBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci10cmFuc3BhcmVudCBiZy10cmFuc3BhcmVudCBwLTAgdGV4dC1zbGF0ZS01MDAgdHJhbnNpdGlvbiBob3Zlcjp0ZXh0LXByaW1hcnkgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHJpbWFyeS8zMFwiXHJcbiAgICAgICAgc3R5bGU9e3sgYm9yZGVyUmFkaXVzOiBHTE9CQUxfUkFESVVTIH19XHJcbiAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNPcGVuKChwcmV2aW91cykgPT4gIXByZXZpb3VzKX1cclxuICAgICAgPlxyXG4gICAgICAgIDxzdmdcclxuICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICAgICAgd2lkdGg9XCIyMFwiXHJcbiAgICAgICAgICBoZWlnaHQ9XCIyMFwiXHJcbiAgICAgICAgICB2aWV3Qm94PVwiMyAzIDE4IDE4XCJcclxuICAgICAgICAgIGZpbGw9XCJub25lXCJcclxuICAgICAgICAgIHN0cm9rZT1cIiM2NDc0OGJcIlxyXG4gICAgICAgICAgc3Ryb2tlV2lkdGg9XCIxLjc1XCJcclxuICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcclxuICAgICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJibG9ja1wiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHJlY3QgeD1cIjRcIiB5PVwiNFwiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIHJ4PVwiM1wiIHJ5PVwiM1wiIC8+XHJcbiAgICAgICAgICA8cGF0aCBkPVwiTTEyIDloLjAxXCIgLz5cclxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTEgMTJoMXY0aDFcIiAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgIHtpc09wZW4gJiYgcG9ydGFsVGFyZ2V0XHJcbiAgICAgICAgPyBjcmVhdGVQb3J0YWwoXHJcbiAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICByZWY9e3BhbmVsUmVmfVxyXG4gICAgICAgICAgICAgIHJvbGU9XCJkaWFsb2dcIlxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnBhbmVsU3R5bGUsIGJvcmRlclJhZGl1czogR0xPQkFMX1JBRElVUyB9fVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICAgIFwiei0zNjAwMDAgbWluLXctWzIyMHB4XSBtYXgtdy1bY2FsYygxMDB2dy0xcmVtKV0gcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUgcC0zIHNoYWRvdy1sZ1wiLFxyXG4gICAgICAgICAgICAgICAgcGFuZWxDbGFzc05hbWVcclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTJweF0gdGV4dC1zbGF0ZS03MDAgd2hpdGVzcGFjZS1wcmUtbGluZVwiPntjb250ZW50fTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+LFxyXG4gICAgICAgICAgICBwb3J0YWxUYXJnZXRcclxuICAgICAgICAgIClcclxuICAgICAgICA6IG51bGx9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW5mb1BvcG92ZXJJY29uQnV0dG9uO1xyXG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDb2RlIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcclxuXHJcbnR5cGUgRXhjaGFuZ2VSYXRlTW9kZVVpTWV0YSA9IHtcclxuICBsYWJlbEtleTogc3RyaW5nO1xyXG4gIGZhbGxiYWNrOiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCBFWENIQU5HRV9SQVRFX01PREVfTUVUQTogUmVjb3JkPEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ29kZSwgRXhjaGFuZ2VSYXRlTW9kZVVpTWV0YT4gPSB7XHJcbiAgMDoge1xyXG4gICAgbGFiZWxLZXk6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9PZmZpY2lhbFwiLFxyXG4gICAgZmFsbGJhY2s6IFwiVC5DLiBPZmljaWFsXCIsXHJcbiAgfSxcclxuICAxOiB7XHJcbiAgICBsYWJlbEtleTogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX01hbnVhbFwiLFxyXG4gICAgZmFsbGJhY2s6IFwiVC5DLiBNYW51YWxcIixcclxuICB9LFxyXG59O1xyXG5jb25zdCBFWENIQU5HRV9SQVRFX01PREVfQ09ERVM6IEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ29kZVtdID0gWzAsIDFdO1xyXG5cclxuLy8gS2VlcHMgZXhjaGFuZ2UgcmF0ZSBtb2RlIHZhbHVlcyBjb25zdHJhaW5lZCB0byBudW1lcmljIDAgb3IgMS5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDb2RlIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcclxuICBpZiAocGFyc2VkID09PSAwIHx8IHBhcnNlZCA9PT0gMSkge1xyXG4gICAgcmV0dXJuIHBhcnNlZDtcclxuICB9XHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG4vLyBCdWlsZHMgZml4ZWQgb3B0aW9ucyBmb3IgdGhlIGV4Y2hhbmdlIHJhdGUgbW9kZSBmaWx0ZXIuXHJcbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZU9wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcclxuICByZXR1cm4gRVhDSEFOR0VfUkFURV9NT0RFX0NPREVTXHJcbiAgICAubWFwKChjb2RlKSA9PiB7XHJcbiAgICAgIGNvbnN0IG1ldGEgPSBFWENIQU5HRV9SQVRFX01PREVfTUVUQVtjb2RlXTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB2YWx1ZTogU3RyaW5nKGNvZGUpLFxyXG4gICAgICAgIHRleHQ6IGluZFQobWV0YS5sYWJlbEtleSwgbWV0YS5mYWxsYmFjayksXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxufTtcclxuXHJcbi8vIFJldHVybnMgYSBsb2NhbGl6ZWQgbW9kZSBsYWJlbCBvciBlbXB0eSB0ZXh0IGZvciBub24tc2VsZWN0ZWQgdmFsdWVzLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlKHZhbHVlKTtcclxuICBpZiAobm9ybWFsaXplZCA9PT0gbnVsbCkgcmV0dXJuIFwiXCI7XHJcbiAgY29uc3QgbWV0YSA9IEVYQ0hBTkdFX1JBVEVfTU9ERV9NRVRBW25vcm1hbGl6ZWRdO1xyXG4gIHJldHVybiBpbmRUKG1ldGEubGFiZWxLZXksIG1ldGEuZmFsbGJhY2spO1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRGb3JtYXQsIGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldEhlYWRlciB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvbiBmcm9tIFwiLi9FeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb24udHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0IGZyb20gXCIuL0V4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlUmVhZE9ubHlGaWVsZCBmcm9tIFwiLi9FeHBlbnNlUmVhZE9ubHlGaWVsZC50c3hcIjtcclxuaW1wb3J0IHsgZ2V0RXhwZW5zZVN0YXR1c0xhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlU3RhdHVzQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leGNoYW5nZVJhdGVFbnRyeU1vZGVDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VOdW1iZXIsIHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VTaGVldEhlYWRlckZvcm1Qcm9wcyA9IHtcclxuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGJvb2xlYW47XHJcbiAgc3RhdHVzQ29tbWVudE1vZGU6IFwiaGlkZGVuXCIgfCBcInJlYWRcIjtcclxuICBoZWFkZXI6IEV4cGVuc2VTaGVldEhlYWRlcjtcclxuICBwcm9qZWN0VmFsdWU6IHN0cmluZztcclxuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogYm9vbGVhbjtcclxuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XHJcbiAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3k6IHN0cmluZztcclxuICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k6IHN0cmluZztcclxuICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQ6IG51bWJlcjtcclxuICBzaG93RXhjaGFuZ2VSYXRlOiBib29sZWFuO1xyXG4gIGV4Y2hhbmdlUmF0ZVZhbHVlOiBzdHJpbmc7XHJcbiAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2U6IHN0cmluZztcclxuICB0b3RhbEFtb3VudFRleHQ6IHN0cmluZztcclxuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZHJhZnRQcm9qZWN0SWQ6IHN0cmluZztcclxuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlOiBzdHJpbmc7XHJcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZTogc3RyaW5nO1xyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZTogc3RyaW5nO1xyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlOiBzdHJpbmc7XHJcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IEVYQ0hBTkdFX1JBVEVfTU9ERV9QUkVGSVhfUEFUVEVSTiA9IC9eVFxcLj9DXFwuP1xccyovaTtcclxuXHJcbi8vIFB1cmUgcHJlc2VudGF0aW9uYWwgaGVhZGVyIGZvcm0gZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsL2NyZWF0ZSBzY3JlZW5zLlxyXG5jb25zdCBFeHBlbnNlU2hlZXRIZWFkZXJGb3JtID0gKHtcclxuICBpc0NyZWF0ZU1vZGUsXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGNhbkVkaXRIZWFkZXJGaWVsZHMsXHJcbiAgc3RhdHVzQ29tbWVudE1vZGUsXHJcbiAgaGVhZGVyLFxyXG4gIHByb2plY3RWYWx1ZSxcclxuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcclxuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXHJcbiAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXHJcbiAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudCxcclxuICBzaG93RXhjaGFuZ2VSYXRlLFxyXG4gIGV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlLFxyXG4gIHRvdGFsQW1vdW50VGV4dCxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRyYWZ0UHJvamVjdElkLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsXHJcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLFxyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlLFxyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZSxcclxuICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlLFxyXG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2UsXHJcbiAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZSxcclxufTogRXhwZW5zZVNoZWV0SGVhZGVyRm9ybVByb3BzKSA9PiB7XHJcbiAgY29uc3QgaXNGb3JlaWduQ3VycmVuY3kgPVxyXG4gICAgaXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHMgJiYgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgIT09IFwiXCIgJiYgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgIT09IGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeTtcclxuICBjb25zdCBleHBlbnNlQ3VycmVuY3lMYWJlbCA9IGlzRm9yZWlnbkN1cnJlbmN5XHJcbiAgICA/IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0V4cGVuc2VDdXJyZW5jeVwiLCBcIkV4cGVuc2UgY3VycmVuY3lcIilcclxuICAgIDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKTtcclxuICBjb25zdCBzdGF0dXNWYWx1ZSA9XHJcbiAgICBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzID09PSBudWxsIHx8IGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgPT09IHVuZGVmaW5lZFxyXG4gICAgICA/IFwiLVwiXHJcbiAgICAgIDogZ2V0RXhwZW5zZVN0YXR1c0xhYmVsKGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMpO1xyXG4gIGNvbnN0IGhlYWRlckN1cnJlbmN5Q29kZSA9IHNhZmVUZXh0KGhlYWRlci5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3QgYmFzZUN1cnJlbmN5Q29kZSA9IHNhZmVUZXh0KGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSkudG9VcHBlckNhc2UoKTtcclxuICAvLyBTdGF0dXMgY29tbWVudCBpcyBub3cgZWRpdGVkIG9ubHkgaW4gdGhlIHN0YXR1cyB0cmFuc2l0aW9uIHBvcHVwLlxyXG4gIGNvbnN0IHN0YXR1c0NvbW1lbnRWYWx1ZSA9IHNhZmVUZXh0KGhlYWRlci5lc3RhZG9Db21lbnRhcmlvcyk7XHJcbiAgY29uc3Qgc2hvd1N0YXR1c0NvbW1lbnRGaWVsZCA9ICFpc0NyZWF0ZU1vZGUgJiYgc3RhdHVzQ29tbWVudE1vZGUgIT09IFwiaGlkZGVuXCI7XHJcbiAgY29uc3QgcGFyc2VkRHJhZnRFeGNoYW5nZVJhdGUgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQoZHJhZnRFeGNoYW5nZVJhdGUpO1xyXG4gIGNvbnN0IHBhcnNlZE9mZmljaWFsUmF3UmF0ZSA9IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKTtcclxuICBjb25zdCBiYXNlRXhjaGFuZ2VSYXRlVmFsdWUgPVxyXG4gICAgcGFyc2VkRHJhZnRFeGNoYW5nZVJhdGUgIT0gbnVsbFxyXG4gICAgICA/IHBhcnNlZERyYWZ0RXhjaGFuZ2VSYXRlXHJcbiAgICAgIDogcGFyc2VkT2ZmaWNpYWxSYXdSYXRlICE9IG51bGxcclxuICAgICAgICA/IHBhcnNlZE9mZmljaWFsUmF3UmF0ZSAqIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudFxyXG4gICAgICAgIDogbnVsbDtcclxuICBjb25zdCBleGNoYW5nZVJhdGVJbmZvVmFsdWUgPSBmb3JtYXRFeHBlbnNlTnVtYmVyKFxyXG4gICAgYmFzZUV4Y2hhbmdlUmF0ZVZhbHVlICE9IG51bGwgPyBiYXNlRXhjaGFuZ2VSYXRlVmFsdWUgLyBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQgOiBudWxsLFxyXG4gICAge1xyXG4gICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDcsXHJcbiAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogNyxcclxuICAgICAgdXNlR3JvdXBpbmc6IGZhbHNlLFxyXG4gICAgICBmYWxsYmFjazogXCIwLjAwMDAwMDBcIixcclxuICAgIH1cclxuICApO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSA9IE51bWJlcihoZWFkZXIuZXhjaGFuZ2VSYXRlTW9kZSkgPT09IDEgPyAxIDogMDtcclxuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlS2V5ID1cclxuICAgIGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSA9PT0gMVxyXG4gICAgICA/IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9NYW51YWxcIlxyXG4gICAgICA6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9PZmZpY2lhbFwiO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZU1vZGVGYWxsYmFjayA9IGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSA9PT0gMSA/IFwiVC5DLiBNYW51YWxcIiA6IFwiVC5DLiBPZmljaWFsXCI7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlTW9kZUxhYmVsID1cclxuICAgIChnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsKGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSkgfHwgaW5kVChleGNoYW5nZVJhdGVNb2RlS2V5LCBleGNoYW5nZVJhdGVNb2RlRmFsbGJhY2spKVxyXG4gICAgICAucmVwbGFjZShFWENIQU5HRV9SQVRFX01PREVfUFJFRklYX1BBVFRFUk4sIFwiXCIpXHJcbiAgICAgIC50cmltKClcclxuICAgICAgLnRvTG93ZXJDYXNlKCkgfHwgKGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSA9PT0gMSA/IFwibWFudWFsXCIgOiBcIm9maWNpYWxcIik7XHJcbiAgY29uc3QgaGFzRW5kcG9pbnRFeGNoYW5nZVJhdGVEYXRhID1cclxuICAgICEhc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSkgfHwgISFzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUpIHx8ICEhc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UpO1xyXG4gIGNvbnN0IGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb0RhdGUgPSBzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUpIHx8IGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xyXG4gIGNvbnN0IGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb1NvdXJjZSA9IHNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKVxyXG4gICAgLnJlcGxhY2UoL1xccypcXChbXigpXSpcXClcXHMqL2csIFwiIFwiKVxyXG4gICAgLnJlcGxhY2UoL1xcc3syLH0vZywgXCIgXCIpXHJcbiAgICAudHJpbSgpIHx8IGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xyXG4gIGNvbnN0IGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UgPSBpbmRGb3JtYXQoXHJcbiAgICBcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX0luZm9Qb3BvdmVyX0RldGFpbFwiLFxyXG4gICAgXCJUaXBvIGRlIGNhbWJpbyBvYnRlbmlkbyB7MH1cXG5GZWNoYTogezF9XFxuT3JpZ2VuOiB7Mn1cIixcclxuICAgIHNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUpIHx8IFwiMC4wMDAwMDAwXCIsXHJcbiAgICBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9EYXRlLFxyXG4gICAgZW5kcG9pbnRFeGNoYW5nZVJhdGVJbmZvU291cmNlXHJcbiAgKTtcclxuICBjb25zdCBzdG9yZWRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZSA9IGluZEZvcm1hdChcclxuICAgIFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfSW5mb1BvcG92ZXJfU3RvcmVkXCIsXHJcbiAgICBcIlRpcG8gZGUgY2FtYmlvIHswfSB7MX1cIixcclxuICAgIGV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCxcclxuICAgIGV4Y2hhbmdlUmF0ZUluZm9WYWx1ZVxyXG4gICk7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UgPSBoYXNFbmRwb2ludEV4Y2hhbmdlUmF0ZURhdGEgPyBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlIDogc3RvcmVkRXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2U7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cclxuICAgICAgICB7IWlzQ3JlYXRlTW9kZSA/IChcclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU2hlZXRJZFwiLCBcIkV4cGVuc2Ugc2hlZXQgY29kZVwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e3NhZmVUZXh0KGhlYWRlci5ob2phR2FzdG9zSWQpIHx8IFwiLVwifVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgICB7IWlzQ3JlYXRlTW9kZSA/IDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzXCIsIFwiU3RhdHVzXCIpfSB2YWx1ZT17c3RhdHVzVmFsdWV9IC8+IDogbnVsbH1cclxuICAgICAgICB7c2hvd1N0YXR1c0NvbW1lbnRGaWVsZCA/IChcclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzQ29tbWVudFwiLCBcIlN0YXR1cyBjb21tZW50XCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17c3RhdHVzQ29tbWVudFZhbHVlIHx8IFwiLVwifVxyXG4gICAgICAgICAgICBmdWxsV2lkdGhcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAge2lzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzID8gKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbTpjb2wtc3Bhbi0yIHNwYWNlLXktMS41XCI+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX08L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIlxyXG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdERlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XHJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtzYWZlVGV4dChoZWFkZXIuZGVzY3JpcHRpb24pIHx8IFwiLVwifVxyXG4gICAgICAgICAgICBmdWxsV2lkdGhcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKX1cclxuICAgICAgICB7aXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHMgPyAoXHJcbiAgICAgICAgICA8RXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dFxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfUHJvamVjdF9QbGFjZWhvbGRlclwiLCBcIlByb2plY3QgaWRcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtkcmFmdFByb2plY3RJZH1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRQcm9qZWN0SWRDaGFuZ2V9XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXshaXNFZGl0aW5nIHx8ICFjYW5FZGl0SGVhZGVyRmllbGRzfVxyXG4gICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZyB8fCAhY2FuRWRpdEhlYWRlckZpZWxkc31cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IHByb2plY3RWYWx1ZSA/IChcclxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9IHZhbHVlPXtwcm9qZWN0VmFsdWV9IC8+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgPEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvblxyXG4gICAgICAgICAgaXNFZGl0aW5nPXtpc0VkaXRpbmd9XHJcbiAgICAgICAgICBjYW5FZGl0SGVhZGVyRmllbGRzPXtjYW5FZGl0SGVhZGVyRmllbGRzfVxyXG4gICAgICAgICAgaXNGb3JlaWduQ3VycmVuY3k9e2lzRm9yZWlnbkN1cnJlbmN5fVxyXG4gICAgICAgICAgZXhwZW5zZUN1cnJlbmN5TGFiZWw9e2V4cGVuc2VDdXJyZW5jeUxhYmVsfVxyXG4gICAgICAgICAgaGVhZGVyQ3VycmVuY3lDb2RlPXtoZWFkZXJDdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgICBiYXNlQ3VycmVuY3lDb2RlPXtiYXNlQ3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgZHJhZnRDdXJyZW5jeUNvZGU9e2RyYWZ0Q3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgZHJhZnRFeGNoYW5nZVJhdGU9e2RyYWZ0RXhjaGFuZ2VSYXRlfVxyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlVmFsdWU9e2V4Y2hhbmdlUmF0ZVZhbHVlfVxyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2U9e2V4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlfVxyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50PXtleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnR9XHJcbiAgICAgICAgICBzaG93RXhjaGFuZ2VSYXRlPXtzaG93RXhjaGFuZ2VSYXRlfVxyXG4gICAgICAgICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXM9e2lzQ3VycmVuY3lMb2NrZWRCeUxpbmVzfVxyXG4gICAgICAgICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzPXtpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXN9XHJcbiAgICAgICAgICBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZT17ZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2V9XHJcbiAgICAgICAgICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlPXtvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlfVxyXG4gICAgICAgICAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZT17b25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZX1cclxuICAgICAgICAvPlxyXG4gICAgICAgIHshaXNDcmVhdGVNb2RlID8gPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Ub3RhbEFtb3VudFwiLCBcIlRvdGFsIGFtb3VudFwiKX0gdmFsdWU9e3RvdGFsQW1vdW50VGV4dH0gLz4gOiBudWxsfVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IENvbXBhY3RQYWdpbmF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29tcGFjdFBhZ2luYXRpb24udHN4XCI7XHJcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldExpbmUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEYXRlUGFydHMsIHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlU2VjdGlvbkRpdmlkZXIgZnJvbSBcIi4vRXhwZW5zZVNlY3Rpb25EaXZpZGVyLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpbWVsaW5lQ2FyZCBmcm9tIFwiLi9FeHBlbnNlVGltZWxpbmVDYXJkLnRzeFwiO1xyXG5cclxudHlwZSBQYWdpbmF0aW9uTGFiZWxzID0ge1xyXG4gIGZpcnN0OiBzdHJpbmc7XHJcbiAgcHJldjogc3RyaW5nO1xyXG4gIG5leHQ6IHN0cmluZztcclxuICBsYXN0OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VMaW5lc1RpbWVsaW5lUHJvcHMgPSB7XHJcbiAgdmlzaWJsZUxpbmVzOiBFeHBlbnNlU2hlZXRMaW5lW107XHJcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgdG90YWxMaW5lUGFnZXM6IG51bWJlcjtcclxuICBsaW5lUGFnZTogbnVtYmVyO1xyXG4gIGxpbmVzTGFiZWw6IHN0cmluZztcclxuICBlbXB0eVRleHQ6IHN0cmluZztcclxuICBwYWdpbmF0aW9uTGFiZWxzOiBQYWdpbmF0aW9uTGFiZWxzO1xyXG4gIGNvbnRhaW5lclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgb25MaW5lUGFnZUNoYW5nZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcclxuICBvbk9wZW5MaW5lOiAobGluZVJlY0lkOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBEdW1iIHRpbWVsaW5lIGZvciBleHBlbnNlIHNoZWV0IGxpbmVzIHdpdGggc3RhbmRhcmQgY2FyZCBhbmQgcGFnaW5hdGlvbiBsYXlvdXQuXHJcbmNvbnN0IEV4cGVuc2VMaW5lc1RpbWVsaW5lID0gKHtcclxuICB2aXNpYmxlTGluZXMsXHJcbiAgY3VycmVuY3lDb2RlLFxyXG4gIHRvdGFsTGluZVBhZ2VzLFxyXG4gIGxpbmVQYWdlLFxyXG4gIGxpbmVzTGFiZWwsXHJcbiAgZW1wdHlUZXh0LFxyXG4gIHBhZ2luYXRpb25MYWJlbHMsXHJcbiAgY29udGFpbmVyUmVmLFxyXG4gIG9uTGluZVBhZ2VDaGFuZ2UsXHJcbiAgb25PcGVuTGluZSxcclxufTogRXhwZW5zZUxpbmVzVGltZWxpbmVQcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzcGFjZS15LTBcIj5cclxuICAgICAgPEV4cGVuc2VTZWN0aW9uRGl2aWRlciBsYWJlbD17bGluZXNMYWJlbH0gY2xhc3NOYW1lPVwiZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXItLXNwYWNlZFwiIC8+XHJcblxyXG4gICAgICB7dmlzaWJsZUxpbmVzLmxlbmd0aCA9PT0gMCA/IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveCB0aW1lbGluZS1lbXB0eVwiIGRhdGEtZW1wdHktdGV4dD17ZW1wdHlUZXh0fSAvPlxyXG4gICAgICApIDogKFxyXG4gICAgICAgIDxkaXYgcmVmPXtjb250YWluZXJSZWZ9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveFwiPlxyXG4gICAgICAgICAge3Zpc2libGVMaW5lcy5tYXAoKGxpbmUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmVJZCA9IHNhZmVUZXh0KGxpbmUubGluZVJlY0lkKTtcclxuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBzYWZlVGV4dChsaW5lLmRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgY29uc3QgYW1vdW50VGV4dCA9IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShsaW5lLmFtb3VudCA/PyBudWxsLCBjdXJyZW5jeUNvZGUpO1xyXG4gICAgICAgICAgICBjb25zdCBsaW5rZWRUaWNrZXRGaWxlSWQgPSBzYWZlVGV4dChsaW5lLmZpbGVJZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGVQYXJ0cyA9IGZvcm1hdEV4cGVuc2VEYXRlUGFydHMoc2FmZVRleHQobGluZS50cmFuc0RhdGUpLCBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpY2tldFN0YXR1c0ljb24gPSBsaW5rZWRUaWNrZXRGaWxlSWQgPyAoXHJcbiAgICAgICAgICAgICAgPHN2Z1xyXG4gICAgICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgICAgICAgICAgICBmaWxsPVwibm9uZVwiXHJcbiAgICAgICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXsxLjV9XHJcbiAgICAgICAgICAgICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC00IHctNFwiXHJcbiAgICAgICAgICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICBkPVwiTTEzLjE5IDguNjg4YTQuNSA0LjUgMCAwIDEgMS4yNDIgNy4yNDRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMS02LjM2NC02LjM2NGwxLjc1Ny0xLjc1N20xMy4zNS0uNjIyIDEuNzU3LTEuNzU3YTQuNSA0LjUgMCAwIDAtNi4zNjQtNi4zNjRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMCAxLjI0MiA3LjI0NFwiXHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICApIDogbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2Ake2xpbmVJZH0tJHtpbmRleH1gfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxyXG4gICAgICAgICAgICAgICAgICBkYXRlUGFydHM9e2RhdGVQYXJ0c31cclxuICAgICAgICAgICAgICAgICAgdGl0bGU9e2Rlc2NyaXB0aW9uIHx8IGxpbmVJZCB8fCBcIi1cIn1cclxuICAgICAgICAgICAgICAgICAgYW1vdW50VGV4dD17YW1vdW50VGV4dH1cclxuICAgICAgICAgICAgICAgICAgb25PcGVuPXsoKSA9PiBvbk9wZW5MaW5lKGxpbmVJZCl9XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlQ2xhc3NOYW1lPVwidGltZWxpbmUtbmFtZSBleHBlbnNlLWxpbmUtY2FyZF9fdGl0bGVcIlxyXG4gICAgICAgICAgICAgICAgICBzdGF0dXNJY29uPXt0aWNrZXRTdGF0dXNJY29ufVxyXG4gICAgICAgICAgICAgICAgICBzdGF0dXNJY29uQ2xhc3NOYW1lPVwiZXhwZW5zZS1saW5lLWNhcmRfX3RpY2tldC1pY29uXCJcclxuICAgICAgICAgICAgICAgICAgc3RhdHVzTGFiZWw9e2xpbmtlZFRpY2tldEZpbGVJZCB8fCB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICA8Q29tcGFjdFBhZ2luYXRpb25cclxuICAgICAgICB0b3RhbFBhZ2VzPXt0b3RhbExpbmVQYWdlc31cclxuICAgICAgICBjdXJyZW50UGFnZT17bGluZVBhZ2V9XHJcbiAgICAgICAgb25QYWdlQ2hhbmdlPXtvbkxpbmVQYWdlQ2hhbmdlfVxyXG4gICAgICAgIGxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cclxuICAgICAgLz5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUxpbmVzVGltZWxpbmU7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQYWdlQm90dG9tQWN0aW9ucywgeyBQYWdlQm90dG9tQWN0aW9uQnV0dG9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9QYWdlQm90dG9tQWN0aW9ucy50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uIH0gZnJvbSBcIi4vZXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5LnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbkJhclByb3BzID0ge1xyXG4gIGFjdGlvbnM6IEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbltdO1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gIG9uQWN0aW9uQ2xpY2s6IChhY3Rpb246IEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbikgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIFJlbmRlcnMgdGhlIGJvdHRvbSB0b29sYmFyIGZvciBleHBlbnNlIHNoZWV0IHN0YXR1cyB0cmFuc2l0aW9ucy5cclxuY29uc3QgRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyID0gKHsgYWN0aW9ucywgYnVzeSwgZGlzYWJsZWQgPSBmYWxzZSwgb25BY3Rpb25DbGljayB9OiBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25CYXJQcm9wcykgPT4ge1xyXG4gIGlmIChhY3Rpb25zLmxlbmd0aCA8IDEpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxQYWdlQm90dG9tQWN0aW9ucyBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0JvdHRvbUFjdGlvbnNfVG9vbGJhclwiLCBcIkV4cGVuc2Ugc2hlZXQgc3RhdHVzIGFjdGlvbnNcIil9PlxyXG4gICAgICB7YWN0aW9ucy5tYXAoKGFjdGlvbikgPT4gKFxyXG4gICAgICAgIDxQYWdlQm90dG9tQWN0aW9uQnV0dG9uXHJcbiAgICAgICAgICBrZXk9e2FjdGlvbi5pZH1cclxuICAgICAgICAgIGxhYmVsPXtpbmRUKGFjdGlvbi5sYWJlbEtleSwgYWN0aW9uLmZhbGxiYWNrKX1cclxuICAgICAgICAgIGRpc2FibGVkPXtidXN5IHx8IGRpc2FibGVkfVxyXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gb25BY3Rpb25DbGljayhhY3Rpb24pfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICkpfVxyXG4gICAgPC9QYWdlQm90dG9tQWN0aW9ucz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5IGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VRdWlja1RpY2tldFByb2dyZXNzT3ZlcmxheS50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IFRJQ0tFVF9JTUFHRV9BQ0NFUFRfQVRUUklCVVRFIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93Q29yZS50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlU2hlZXREZXRhaWxPdmVybGF5c1Byb3BzID0ge1xyXG4gIG1vZGFsOiB7XHJcbiAgICBvcGVuOiBib29sZWFuO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xyXG4gICAgY2FuY2VsVGV4dD86IHN0cmluZztcclxuICAgIHNob3dDYW5jZWw/OiBib29sZWFuO1xyXG4gICAgc2hvd0NvbmZpcm0/OiBib29sZWFuO1xyXG4gIH07XHJcbiAgbW9kYWxFcnJvcjogc3RyaW5nO1xyXG4gIHN0YXR1czogc3RyaW5nO1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlOiBib29sZWFuO1xyXG4gIG1vZGFsTG9hZGluZ1RleHQ6IHN0cmluZztcclxuICBtb2RhbENhbmNlbFRleHQ6IHN0cmluZztcclxuICBtb2RhbENvbmZpcm1UZXh0OiBzdHJpbmc7XHJcbiAgbW9kYWxCb2R5PzogUmVhY3QuUmVhY3ROb2RlO1xyXG4gIGNhbWVyYUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gIGdhbGxlcnlJbnB1dFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcclxuICBzb3VyY2VQaWNrZXJPcGVuOiBib29sZWFuO1xyXG4gIHF1aWNrVGlja2V0QnVzeTogYm9vbGVhbjtcclxuICBxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZTogc3RyaW5nO1xyXG4gIHF1aWNrVGlja2V0UHJvZ3Jlc3NTdGFnZXM6IEFycmF5PHtcclxuICAgIGtleTogc3RyaW5nO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgICBzdGF0ZTogXCJjb21wbGV0ZWRcIiB8IFwiYWN0aXZlXCIgfCBcInBlbmRpbmdcIjtcclxuICB9PjtcclxuICBxdWlja1RpY2tldEVsYXBzZWRNczogbnVtYmVyO1xyXG4gIHF1aWNrVGlja2V0RXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbiAgcXVpY2tUaWNrZXRBdHRlbXB0SWQ6IHN0cmluZztcclxuICBxdWlja1RpY2tldFRyYWNlTGlzdDogQXJyYXk8eyBzdGVwOiBzdHJpbmc7IHRyYWNlSWQ6IHN0cmluZzsgYXQ6IHN0cmluZyB9PjtcclxuICBoYXNQZW5kaW5nVXBsb2FkUmV0cnk6IGJvb2xlYW47XHJcbiAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmU6IGJvb2xlYW47XHJcbiAgb25Db25maXJtOiAoKSA9PiB2b2lkO1xyXG4gIG9uQ2FuY2VsOiAoKSA9PiB2b2lkO1xyXG4gIG9uU2VsZWN0ZWRDYW1lcmFGaWxlOiAoZmlsZTogRmlsZSB8IG51bGwpID0+IHZvaWQ7XHJcbiAgb25TZWxlY3RlZEdhbGxlcnlGaWxlOiAoZmlsZTogRmlsZSB8IG51bGwpID0+IHZvaWQ7XHJcbiAgb25TZWxlY3RGcm9tQ2FtZXJhOiAoKSA9PiB2b2lkO1xyXG4gIG9uU2VsZWN0RnJvbUdhbGxlcnk6ICgpID0+IHZvaWQ7XHJcbiAgb25DbG9zZVNvdXJjZVBpY2tlcjogKCkgPT4gdm9pZDtcclxuICBvblJldHJ5UGVuZGluZ1VwbG9hZDogKCkgPT4gdm9pZDtcclxuICBvbk9wZW5DcmVhdGVkVGlja2V0OiAoKSA9PiB2b2lkO1xyXG4gIG9uQ2xlYXJRdWlja1RpY2tldEVycm9yOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyBtb2RhbCBhbmQgcXVpY2stdGlja2V0IG92ZXJsYXlzIGZvciB0aGUgZXhwZW5zZSBzaGVldCBkZXRhaWwgcGFnZS5cclxuY29uc3QgRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXMgPSAoe1xyXG4gIG1vZGFsLFxyXG4gIG1vZGFsRXJyb3IsXHJcbiAgc3RhdHVzLFxyXG4gIGJ1c3ksXHJcbiAgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLFxyXG4gIG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgbW9kYWxDYW5jZWxUZXh0LFxyXG4gIG1vZGFsQ29uZmlybVRleHQsXHJcbiAgbW9kYWxCb2R5LFxyXG4gIGNhbWVyYUlucHV0UmVmLFxyXG4gIGdhbGxlcnlJbnB1dFJlZixcclxuICBzb3VyY2VQaWNrZXJPcGVuLFxyXG4gIHF1aWNrVGlja2V0QnVzeSxcclxuICBxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSxcclxuICBxdWlja1RpY2tldFByb2dyZXNzU3RhZ2VzLFxyXG4gIHF1aWNrVGlja2V0RWxhcHNlZE1zLFxyXG4gIHF1aWNrVGlja2V0RXJyb3JNZXNzYWdlLFxyXG4gIHF1aWNrVGlja2V0QXR0ZW1wdElkLFxyXG4gIHF1aWNrVGlja2V0VHJhY2VMaXN0LFxyXG4gIGhhc1BlbmRpbmdVcGxvYWRSZXRyeSxcclxuICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZSxcclxuICBvbkNvbmZpcm0sXHJcbiAgb25DYW5jZWwsXHJcbiAgb25TZWxlY3RlZENhbWVyYUZpbGUsXHJcbiAgb25TZWxlY3RlZEdhbGxlcnlGaWxlLFxyXG4gIG9uU2VsZWN0RnJvbUNhbWVyYSxcclxuICBvblNlbGVjdEZyb21HYWxsZXJ5LFxyXG4gIG9uQ2xvc2VTb3VyY2VQaWNrZXIsXHJcbiAgb25SZXRyeVBlbmRpbmdVcGxvYWQsXHJcbiAgb25PcGVuQ3JlYXRlZFRpY2tldCxcclxuICBvbkNsZWFyUXVpY2tUaWNrZXRFcnJvcixcclxufTogRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXNQcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8Q29uZmlybU1vZGFsXHJcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cclxuICAgICAgICB0aXRsZT17bW9kYWwudGl0bGV9XHJcbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cclxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cclxuICAgICAgICBjYW5jZWxUZXh0PXttb2RhbENhbmNlbFRleHR9XHJcbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsTG9hZGluZ1RleHR9XHJcbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cclxuICAgICAgICBzaG93Q29uZmlybT17bW9kYWwuc2hvd0NvbmZpcm19XHJcbiAgICAgICAgYnVzeT17YnVzeSB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGV9XHJcbiAgICAgICAgZXJyb3I9e21vZGFsRXJyb3J9XHJcbiAgICAgICAgc3RhdHVzPXtzdGF0dXN9XHJcbiAgICAgICAgb25Db25maXJtPXtvbkNvbmZpcm19XHJcbiAgICAgICAgb25DYW5jZWw9e29uQ2FuY2VsfVxyXG4gICAgICA+XHJcbiAgICAgICAge21vZGFsQm9keX1cclxuICAgICAgPC9Db25maXJtTW9kYWw+XHJcblxyXG4gICAgICA8aW5wdXRcclxuICAgICAgICByZWY9e2NhbWVyYUlucHV0UmVmfVxyXG4gICAgICAgIHR5cGU9XCJmaWxlXCJcclxuICAgICAgICBhY2NlcHQ9e1RJQ0tFVF9JTUFHRV9BQ0NFUFRfQVRUUklCVVRFfVxyXG4gICAgICAgIGNhcHR1cmU9XCJlbnZpcm9ubWVudFwiXHJcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcclxuICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBmaWxlID0gZXZlbnQuY3VycmVudFRhcmdldC5maWxlcz8uWzBdIHx8IG51bGw7XHJcbiAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgIG9uU2VsZWN0ZWRDYW1lcmFGaWxlKGZpbGUpO1xyXG4gICAgICAgIH19XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICA8aW5wdXRcclxuICAgICAgICByZWY9e2dhbGxlcnlJbnB1dFJlZn1cclxuICAgICAgICB0eXBlPVwiZmlsZVwiXHJcbiAgICAgICAgYWNjZXB0PXtUSUNLRVRfSU1BR0VfQUNDRVBUX0FUVFJJQlVURX1cclxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxyXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGZpbGUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmZpbGVzPy5bMF0gfHwgbnVsbDtcclxuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgb25TZWxlY3RlZEdhbGxlcnlGaWxlKGZpbGUpO1xyXG4gICAgICAgIH19XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICB7c291cmNlUGlja2VyT3BlbiA/IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctc2xhdGUtOTUwLzQ1IHB4LTQgcHktNlwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctc20gcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUgcC00IHNoYWRvdy14bFwiPlxyXG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1bMTZweF0gZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTgwMFwiPlxyXG4gICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX1RpdGxlXCIsIFwiTnVldm8gdGlja2V0XCIpfVxyXG4gICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0xIHRleHQtc20gdGV4dC1zbGF0ZS02MDBcIj5cclxuICAgICAgICAgICAgICB7aW5kVChcclxuICAgICAgICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX0JvZHlcIixcclxuICAgICAgICAgICAgICAgIFwiU2VsZWNjaW9uYSB1bmEgZnVlbnRlIHBhcmEgY2FwdHVyYXIgbyBlbGVnaXIgbGEgaW1hZ2VuIGRlbCB0aWNrZXQuXCJcclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA8L3A+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgZ3JpZCBncmlkLWNvbHMtMSBnYXAtMlwiPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiIG9uQ2xpY2s9e29uU2VsZWN0RnJvbUNhbWVyYX0+XHJcbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9DYW1lcmFcIiwgXCJVc2FyIGNcdTAwRTFtYXJhXCIpfVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiIG9uQ2xpY2s9e29uU2VsZWN0RnJvbUdhbGxlcnl9PlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfR2FsbGVyeVwiLCBcIkVsZWdpciBpbWFnZW5cIil9XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCIgb25DbGljaz17b25DbG9zZVNvdXJjZVBpY2tlcn0+XHJcbiAgICAgICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIil9XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgPEV4cGVuc2VRdWlja1RpY2tldFByb2dyZXNzT3ZlcmxheVxyXG4gICAgICAgIG9wZW49e3F1aWNrVGlja2V0QnVzeX1cclxuICAgICAgICB0aXRsZT17aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX1RpdGxlXCIsIFwiUHJvY2Vzc2luZyB0aWNrZXRcIil9XHJcbiAgICAgICAgc3VtbWFyeT17cXVpY2tUaWNrZXRQcm9ncmVzc01lc3NhZ2UgfHwgaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cclxuICAgICAgICBlbGFwc2VkTXM9e3F1aWNrVGlja2V0RWxhcHNlZE1zfVxyXG4gICAgICAgIHN0YWdlcz17cXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlc31cclxuICAgICAgLz5cclxuXHJcbiAgICAgIHtxdWlja1RpY2tldEVycm9yTWVzc2FnZSA/IChcclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZVxyXG4gICAgICAgICAgICAgID8gXCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBzcGFjZS15LTIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1hbWJlci0yMDAgYmctYW1iZXItNTAgcC0zIHRleHQtc20gdGV4dC1hbWJlci05MDBcIlxyXG4gICAgICAgICAgICAgIDogXCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBzcGFjZS15LTIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy1yb3NlLTUwIHAtMyB0ZXh0LXNtIHRleHQtcm9zZS04MDBcIlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxwPntxdWlja1RpY2tldEVycm9yTWVzc2FnZX08L3A+XHJcbiAgICAgICAgICB7cXVpY2tUaWNrZXRBdHRlbXB0SWQgPyAoXHJcbiAgICAgICAgICAgIDxwXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcclxuICAgICAgICAgICAgICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlXHJcbiAgICAgICAgICAgICAgICAgID8gXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLWFtYmVyLTIwMCBiZy13aGl0ZSBweC0yIHB5LTEgZm9udC1tb25vIHRleHQtWzExcHhdIHRleHQtYW1iZXItOTAwIGJyZWFrLWFsbFwiXHJcbiAgICAgICAgICAgICAgICAgIDogXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXdoaXRlIHB4LTIgcHktMSBmb250LW1vbm8gdGV4dC1bMTFweF0gdGV4dC1yb3NlLTgwMCBicmVhay1hbGxcIlxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtgYXR0ZW1wdElkOiAke3F1aWNrVGlja2V0QXR0ZW1wdElkfWB9XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICAgICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmVcclxuICAgICAgICAgICAgICAgICAgPyBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItYW1iZXItMjAwIGJnLXdoaXRlIHAtMiB0ZXh0LXhzIHRleHQtYW1iZXItODAwXCJcclxuICAgICAgICAgICAgICAgICAgOiBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctd2hpdGUgcC0yIHRleHQteHMgdGV4dC1yb3NlLTcwMFwiXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lm1hcCgoZW50cnkpID0+IChcclxuICAgICAgICAgICAgICAgIDxwIGtleT17YCR7ZW50cnkuc3RlcH0tJHtlbnRyeS5hdH1gfT57YCR7ZW50cnkuc3RlcH06ICR7ZW50cnkudHJhY2VJZH1gfTwvcD5cclxuICAgICAgICAgICAgICApKX1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTJcIj5cclxuICAgICAgICAgICAge2hhc1BhcnRpYWxUaWNrZXRGYWlsdXJlID8gKFxyXG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIiBvbkNsaWNrPXtvbk9wZW5DcmVhdGVkVGlja2V0fT5cclxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfT3BlbkNyZWF0ZWRUaWNrZXRcIiwgXCJPcGVuIGNyZWF0ZWQgdGlja2V0XCIpfVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAge2hhc1BlbmRpbmdVcGxvYWRSZXRyeSA/IChcclxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCIgb25DbGljaz17b25SZXRyeVBlbmRpbmdVcGxvYWR9PlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9SZXRyeVVwbG9hZFwiLCBcIlJlaW50ZW50YXIgdXBsb2FkXCIpfVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gcHgtMyBweS0xLjUgdGV4dC14c1wiIG9uQ2xpY2s9e29uQ2xlYXJRdWlja1RpY2tldEVycm9yfT5cclxuICAgICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9DbG9zZVwiLCBcIkNsb3NlXCIpfVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuICAgIDwvPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXREZXRhaWxPdmVybGF5cztcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW0gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nQWN0aW9uQnV0dG9uLnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VBdXRoQ29udGV4dCB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VUaW1lbGluZUNhcmRFZmZlY3RzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRpbWVsaW5lQ2FyZEVmZmVjdHMudHNcIjtcclxuaW1wb3J0IHsgdXNlQ29uZmlybURpYWxvZyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBpbmRGb3JtYXQsIGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlTnVtYmVyIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcclxuaW1wb3J0IHsgY29uZmlndXJlRXhwZW5zZUFwaUF1dGggfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQgeyBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VNYW5hZ2VkVXNlclNjb3BlLnRzXCI7XHJcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsLCByZWxvYWRFeHBlbnNlUGFnZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQudHNcIjtcclxuaW1wb3J0IHsgZ2V0RXhwZW5zZVN0YXR1c0xhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlU3RhdHVzQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlIH0gZnJvbSBcIi4uL2xpc3QvdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlLnRzXCI7XHJcblxyXG5jb25zdCBMSU5FU19QQUdFX1NJWkUgPSA2O1xyXG5jb25zdCBFWFBFTlNFX1NUQVRVU19BUFBST1ZBTF9SRVFVRVNURUQgPSAxO1xyXG5cclxuY29uc3QgcGFnZWRTbGljZSA9IDxULD4oaXRlbXM6IFRbXSwgcGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyKTogVFtdID0+IHtcclxuICBpZiAoIWl0ZW1zLmxlbmd0aCkgcmV0dXJuIFtdO1xyXG4gIGNvbnN0IHNhZmVQYWdlID0gTWF0aC5tYXgoMSwgcGFnZSk7XHJcbiAgY29uc3Qgc3RhcnQgPSAoc2FmZVBhZ2UgLSAxKSAqIHBhZ2VTaXplO1xyXG4gIHJldHVybiBpdGVtcy5zbGljZShzdGFydCwgc3RhcnQgKyBwYWdlU2l6ZSk7XHJcbn07XHJcblxyXG4vLyBUcmVhdHMgb25seSBwb3NpdGl2ZSBudW1lcmljIHRvdGFscyBhcyBhY3Rpb25hYmxlIHNoZWV0IGNvbnRlbnQuXHJcbmNvbnN0IGhhc1Bvc2l0aXZlVG90YWxBbW91bnQgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSAmJiBwYXJzZWQgPiAwO1xyXG59O1xyXG5cclxuY29uc3QgTmV3VGlja2V0SWNvbiA9ICgpID0+IChcclxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsxLjV9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzTmFtZT1cImgtNSB3LTVcIj5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTEwIDIwaC01YTIgMiAwIDAgMSAtMiAtMnYtOWEyIDIgMCAwIDEgMiAtMmgxYTIgMiAwIDAgMCAyIC0yYTEgMSAwIDAgMSAxIC0xaDZhMSAxIDAgMCAxIDEgMWEyIDIgMCAwIDAgMiAyaDFhMiAyIDAgMCAxIDIgMnYyXCIgLz5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0LjM2MiAxMS4xNWEzIDMgMCAxIDAgLTQuMTQ0IDQuMjYzXCIgLz5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDIxdi00YTIgMiAwIDEgMSA0IDB2NFwiIC8+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAxOWg0XCIgLz5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTIxIDE1djZcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgTGlua1RpY2tldEljb24gPSAoKSA9PiAoXHJcbiAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD17MS41fSBhcmlhLWhpZGRlbj1cInRydWVcIiBjbGFzc05hbWU9XCJoLTUgdy01XCI+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xMy4xOSA4LjY4OGE0LjUgNC41IDAgMCAxIDEuMjQyIDcuMjQ0bC00LjUgNC41YTQuNSA0LjUgMCAwIDEtNi4zNjQtNi4zNjRsMS43NTctMS43NTdtMTMuMzUtLjYyMiAxLjc1Ny0xLjc1N2E0LjUgNC41IDAgMCAwLTYuMzY0LTYuMzY0bC00LjUgNC41YTQuNSA0LjUgMCAwIDAgMS4yNDIgNy4yNDRcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgTmV3TGluZUljb24gPSAoKSA9PiAoXHJcbiAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD17MS41fSBhcmlhLWhpZGRlbj1cInRydWVcIiBjbGFzc05hbWU9XCJoLTUgdy01XCI+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0zIDE5YzMuMzMzIC0yIDUgLTQgNSAtNmMwIC0zIC0xIC0zIC0yIC0zcy0yLjAzMiAxLjA4NSAtMiAzYy4wMzQgMi4wNDggMS42NTggMi44NzcgMi41IDRjMS41IDIgMi41IDIuNSAzLjUgMWMuNjY3IC0xIDEuMTY3IC0xLjgzMyAxLjUgLTIuNWMxIDIuMzMzIDIuMzMzIDMuNSA0IDMuNWgyLjVcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMjAgMTd2LTEyYzAgLTEuMTIxIC0uODc5IC0yIC0yIC0ycy0yIC44NzkgLTIgMnYxMmwyIDJsMiAtMlwiIC8+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNiA3aDRcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxyXG5leHBvcnQgY29uc3QgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGggPSAoKSA9PiB7XHJcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgoe1xyXG4gICAgdG9rZW46IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXHJcbiAgICBlbnRyYU9pZDogc2FmZVRleHQod2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcclxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUFBfQ09ERV9fKSxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIE93bnMgdGhlIGRldGFpbC1wYWdlIG9yY2hlc3RyYXRpb24gYW5kIGtlZXBzIHRoZSB2aWV3IGNvbXBvbmVudCBmb2N1c2VkIG9uIHJlbmRlcmluZy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250cm9sbGVyID0gKCkgPT4ge1xyXG4gIGNvbnN0IHtcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICB9ID0gdXNlQXV0aENvbnRleHQoKTtcclxuICBjb25zdCBoYXNBY2Nlc3MgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIlZpZXdcIik7XHJcbiAgY29uc3QgY2FuQ3JlYXRlRXhwZW5zZSA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiQWRkXCIpO1xyXG4gIGNvbnN0IHNoZWV0SWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1NIRUVUX0lEX18pO1xyXG4gIGNvbnN0IHNoZWV0TW9kZSA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfU0hFRVRfTU9ERV9fKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGNvbnN0IGlzQ3JlYXRlTW9kZSA9IHNoZWV0TW9kZSA9PT0gXCJjcmVhdGVcIjtcclxuICBjb25zdCBpc01hbmFnaW5nT3RoZXJVc2VyQnlTZWxlY3Rpb24gPSBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkKHtcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICByZWNvcmRPd25lclVzZXJJZDogXCJcIixcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICB9KTtcclxuICBjb25zdCBjYW5DcmVhdGVFeHBlbnNlRm9yU2VsZWN0ZWRDb250ZXh0ID0gY2FuQ3JlYXRlRXhwZW5zZSAmJiAhaXNNYW5hZ2luZ090aGVyVXNlckJ5U2VsZWN0aW9uO1xyXG4gIGNvbnN0IGxpbmVDb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBjcmVhdGVkU2hlZXRJZFJlZiA9IHVzZVJlZihcIlwiKTtcclxuICBjb25zdCBjYW1lcmFJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgZ2FsbGVyeUlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLCBzZXRJc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzdGF0dXNUcmFuc2l0aW9uQ29tbWVudCwgc2V0U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3Nob3dTdGF0dXNUcmFuc2l0aW9uQ29tbWVudEZpZWxkLCBzZXRTaG93U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRGaWVsZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3Qgc3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRSZWYgPSB1c2VSZWYoXCJcIik7XHJcblxyXG4gIGNvbnN0IHBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gKHtcclxuICAgICAgZmlyc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfRmlyc3RcIiwgXCJGaXJzdFwiKSxcclxuICAgICAgcHJldjogaW5kVChcIkhpc3RvcnlfUGFnZV9QcmV2XCIsIFwiUHJldmlvdXNcIiksXHJcbiAgICAgIG5leHQ6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIiksXHJcbiAgICAgIGxhc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTGFzdFwiLCBcIkxhc3RcIiksXHJcbiAgICB9KSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgZGV0YWlsU3RhdGUgPSB1c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZSh7XHJcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBjYW5DcmVhdGVFeHBlbnNlOiBjYW5DcmVhdGVFeHBlbnNlRm9yU2VsZWN0ZWRDb250ZXh0LFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgc2hlZXRJZCxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCB7XHJcbiAgICBoZWFkZXIsXHJcbiAgICBsaW5lcyxcclxuICAgIGxpbmVQYWdlLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgYnVzeSxcclxuICAgIHN0YXR1cyxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIG1vZGFsRXJyb3IsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsXHJcbiAgICBwcm9qZWN0VmFsdWUsXHJcbiAgICBkZXRhaWxQb2xpY3ksXHJcbiAgICBpc01hbmFnaW5nT3RoZXJVc2VyLFxyXG4gICAgaXNTaGVldExvY2tlZCxcclxuICAgIGV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gICAgc2hvd0V4Y2hhbmdlUmF0ZSxcclxuICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxyXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LFxyXG4gICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXHJcbiAgICBjYW5FZGl0QW55Q3VycmVudCxcclxuICAgIGNhblVzZUZ1bGxFZGl0RmVhdHVyZXMsXHJcbiAgICBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcclxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxyXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gICAgc2V0TGluZVBhZ2UsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBzZXREcmFmdFByb2plY3RJZCxcclxuICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICBzZXREcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUsXHJcbiAgICBoYW5kbGVPcGVuTGlua1RpY2tldE1vZGUsXHJcbiAgICBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0LFxyXG4gICAgbmF2aWdhdGVUb0xpbmVEZXRhaWwsXHJcbiAgfSA9IGRldGFpbFN0YXRlO1xyXG5cclxuICBjb25zdCBjYW5DcmVhdGVFeHBlbnNlRm9yQ3VycmVudFZpZXcgPSBjYW5DcmVhdGVFeHBlbnNlICYmICFpc01hbmFnaW5nT3RoZXJVc2VyO1xyXG4gIGNvbnN0IGNhbkRlbGV0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyA9IGRldGFpbFBvbGljeS5jYW5EZWxldGVTaGVldDtcclxuICBjb25zdCBjYW5UcmFuc2l0aW9uU3RhdHVzID0gZGV0YWlsUG9saWN5LnN0YXR1c0FjdGlvbnMubGVuZ3RoID4gMDtcclxuICBjb25zdCBpc1JlYWRPbmx5TW9kZSA9IGRldGFpbFBvbGljeS5pbnRlcmFjdGlvbk1vZGUgPT09IFwicmVhZF9vbmx5XCI7XHJcbiAgY29uc3QgY3VycmVudFN0YXR1c0NvZGUgPSB0eXBlb2YgaGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMgPT09IFwibnVtYmVyXCIgPyBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzIDogbnVsbDtcclxuICBjb25zdCBoaWRlc0NydWRUb3BiYXJCeVN0YXR1cyA9XHJcbiAgICBjdXJyZW50U3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfQVBQUk9WQUxfUkVRVUVTVEVEICYmICFjYW5FZGl0QW55Q3VycmVudDtcclxuICBjb25zdCB0b3BiYXJBY3Rpb25Nb2RlID0gIWlzQ3JlYXRlTW9kZSAmJiAoaXNSZWFkT25seU1vZGUgfHwgaGlkZXNDcnVkVG9wYmFyQnlTdGF0dXMpID8gXCJ2aWV3X29ubHlcIiA6IFwiZGVmYXVsdFwiO1xyXG4gIGNvbnN0IGRldGFpbFBlcm1pc3Npb25zUmVhZHkgPSBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHkgJiYgKGlzQ3JlYXRlTW9kZSB8fCAhIWhlYWRlcik7XHJcbiAgY29uc3QgeyBpbnZhbGlkYXRlQ2FjaGVkTGlzdEZvclJlZmV0Y2ggfSA9IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZSgpO1xyXG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHJlc2V0U3RhdHVzVHJhbnNpdGlvbkRpYWxvZyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHN0YXR1c1RyYW5zaXRpb25Db21tZW50UmVmLmN1cnJlbnQgPSBcIlwiO1xyXG4gICAgc2V0U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnQoXCJcIik7XHJcbiAgICBzZXRTaG93U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRGaWVsZChmYWxzZSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDbG9zZUNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICByZXNldFN0YXR1c1RyYW5zaXRpb25EaWFsb2coKTtcclxuICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gIH0sIFtjbG9zZUNvbmZpcm0sIHJlc2V0U3RhdHVzVHJhbnNpdGlvbkRpYWxvZ10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbENvbmZpcm0gPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XHJcbiAgICAgICAgc2V0U3RhdHVzKG1zZyk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9LCBbYnVzeSwgaGFuZGxlQ29uZmlybSwgc2V0TW9kYWxFcnJvciwgc2V0U3RhdHVzXSk7XHJcblxyXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIik7XHJcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGJ1c3lcclxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxyXG4gICAgOiAhYnVzeSAmJiBtb2RhbEVycm9yXHJcbiAgICAgID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpXHJcbiAgICAgIDogKG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcclxuICAgICAgaGFuZGxlQ2xvc2VDb25maXJtKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2b2lkIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xyXG4gIH0sIFtidXN5LCBoYW5kbGVDbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybSwgbW9kYWxFcnJvcl0pO1xyXG5cclxuICBjb25zdCB2aXNpYmxlTGluZXMgPSB1c2VNZW1vKCgpID0+IHBhZ2VkU2xpY2UobGluZXMsIGxpbmVQYWdlLCBMSU5FU19QQUdFX1NJWkUpLCBbbGluZVBhZ2UsIGxpbmVzXSk7XHJcbiAgY29uc3QgdG90YWxMaW5lUGFnZXMgPSBNYXRoLmNlaWwoKGxpbmVzLmxlbmd0aCB8fCAwKSAvIExJTkVTX1BBR0VfU0laRSk7XHJcbiAgY29uc3QgdG90YWxBbW91bnRUZXh0ID0gdXNlTWVtbyhcclxuICAgICgpID0+XHJcbiAgICAgIGZvcm1hdEV4cGVuc2VOdW1iZXIoaGVhZGVyPy50b3RhbEFtb3VudCwge1xyXG4gICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICAgICAgZmFsbGJhY2s6IFwiLVwiLFxyXG4gICAgICB9KSxcclxuICAgIFtoZWFkZXI/LnRvdGFsQW1vdW50XVxyXG4gICk7XHJcbiAgY29uc3QgaGFzU3RhdHVzQWN0aW9uQ29udGVudCA9IGxpbmVzLmxlbmd0aCA+IDAgfHwgaGFzUG9zaXRpdmVUb3RhbEFtb3VudChoZWFkZXI/LnRvdGFsQW1vdW50KTtcclxuICBjb25zdCBhcmVTdGF0dXNBY3Rpb25zRGlzYWJsZWQgPSAhaGFzU3RhdHVzQWN0aW9uQ29udGVudDtcclxuXHJcbiAgY29uc3QgeyBoYW5kbGVVcGRhdGUsIGhhbmRsZVN0YXR1c1RyYW5zaXRpb24sIGhhbmRsZURlbGV0ZSB9ID0gdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zKHtcclxuICAgIGJ1c3ksXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc0VkaXRMb2NrZWQ6IGlzUmVhZE9ubHlNb2RlLFxyXG4gICAgaXNEZWxldGVMb2NrZWQ6IGlzU2hlZXRMb2NrZWQsXHJcbiAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcclxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcclxuICAgIGxvY2tlZEN1cnJlbmN5Q29kZTogc2FmZVRleHQoaGVhZGVyPy5jdXJyZW5jeUNvZGUpLFxyXG4gICAgbG9ja2VkRXhjaGFuZ2VSYXRlOiBzYWZlVGV4dChoZWFkZXI/LmV4Y2hSYXRlKSxcclxuICAgIGNhbkNyZWF0ZUV4cGVuc2U6IGNhbkNyZWF0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyxcclxuICAgIGNhbkVkaXRFeHBlbnNlOiBjYW5FZGl0QW55Q3VycmVudCxcclxuICAgIGNhbkRlbGV0ZUV4cGVuc2U6IGNhbkRlbGV0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyxcclxuICAgIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50LFxyXG4gICAgY2FuVHJhbnNpdGlvblN0YXR1cyxcclxuICAgIHNoZWV0SWQsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsXHJcbiAgICBkcmFmdFByb2plY3RJZCxcclxuICAgIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICBjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzOiBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyxcclxuICAgIGN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlOiBoZWFkZXI/LmV4Y2hhbmdlUmF0ZU1vZGUsXHJcbiAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXHJcbiAgICBvbkNyZWF0ZVN1Y2Nlc3M6IChjcmVhdGVkU2hlZXRJZCkgPT4ge1xyXG4gICAgICBjcmVhdGVkU2hlZXRJZFJlZi5jdXJyZW50ID0gc2FmZVRleHQoY3JlYXRlZFNoZWV0SWQpO1xyXG4gICAgfSxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVPcGVuTGluZURldGFpbCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKGxpbmVSZWNJZDogc3RyaW5nKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNhZmVMaW5lSWQgPSBzYWZlVGV4dChsaW5lUmVjSWQpO1xyXG4gICAgICBpZiAoIXNhZmVMaW5lSWQgfHwgYnVzeSB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQpIHtcclxuICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZVVwZGF0ZSgpO1xyXG4gICAgICAgIGlmICghb2spIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsKHNhZmVMaW5lSWQsIHtcclxuICAgICAgICAgIG1vZGU6IFwiZWRpdFwiLFxyXG4gICAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBmYWxzZSxcclxuICAgICAgICAgIGJ5cGFzc0d1YXJkT25jZTogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsKHNhZmVMaW5lSWQpO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgYnVzeSxcclxuICAgICAgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXHJcbiAgICAgIGhhbmRsZVVwZGF0ZSxcclxuICAgICAgaXNFZGl0aW5nLFxyXG4gICAgICBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsXHJcbiAgICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNhdmVTdWNjZXNzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICBjb25zdCBjcmVhdGVkU2hlZXRJZCA9IHNhZmVUZXh0KGNyZWF0ZWRTaGVldElkUmVmLmN1cnJlbnQpO1xyXG4gICAgICBpZiAoIWNyZWF0ZWRTaGVldElkKSByZXR1cm47XHJcbiAgICAgIHNldElzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSh0cnVlKTtcclxuICAgICAgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldChjcmVhdGVkU2hlZXRJZCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICByZWxvYWRFeHBlbnNlUGFnZSgpO1xyXG4gIH0sIFtpc0NyZWF0ZU1vZGUsIG5hdmlnYXRlVG9DcmVhdGVkU2hlZXRdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU3RhdHVzQWN0aW9uQ2xpY2sgPSB1c2VDYWxsYmFjayhcclxuICAgIChhY3Rpb246IHsgbGFiZWxLZXk6IHN0cmluZzsgZmFsbGJhY2s6IHN0cmluZzsgbmV4dFN0YXR1czogbnVtYmVyIH0pID0+IHtcclxuICAgICAgaWYgKCFoYXNTdGF0dXNBY3Rpb25Db250ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBhY3Rpb25MYWJlbCA9IGluZFQoYWN0aW9uLmxhYmVsS2V5LCBhY3Rpb24uZmFsbGJhY2spO1xyXG4gICAgICBjb25zdCBjdXJyZW50U3RhdHVzTGFiZWwgPVxyXG4gICAgICAgIGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzID09PSBudWxsIHx8IGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzID09PSB1bmRlZmluZWRcclxuICAgICAgICAgID8gaW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpXHJcbiAgICAgICAgICA6IGdldEV4cGVuc2VTdGF0dXNMYWJlbChoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzKTtcclxuICAgICAgY29uc3QgbmV4dFN0YXR1c0xhYmVsID0gZ2V0RXhwZW5zZVN0YXR1c0xhYmVsKGFjdGlvbi5uZXh0U3RhdHVzKTtcclxuICAgICAgY29uc3QgdHJhbnNpdGlvbk1lc3NhZ2UgPSBpbmRGb3JtYXQoXHJcbiAgICAgICAgXCJFeHBlbnNlU2hlZXRzX0JvdHRvbUFjdGlvbnNfQ29uZmlybVRyYW5zaXRpb25cIixcclxuICAgICAgICBcIkN1cnJlbnQgc3RhdHVzOiB7MH1cXG5OZXcgc3RhdHVzOiB7MX1cXG5cXG5EbyB5b3Ugd2FudCB0byB1cGRhdGUgdGhlIGV4cGVuc2Ugc2hlZXQgc3RhdHVzP1wiLFxyXG4gICAgICAgIGN1cnJlbnRTdGF0dXNMYWJlbCxcclxuICAgICAgICBuZXh0U3RhdHVzTGFiZWxcclxuICAgICAgKS5yZXBsYWNlKC9cXFxcbi9nLCBcIlxcblwiKTtcclxuICAgICAgY29uc3QgaW5pdGlhbENvbW1lbnQgPSBzYWZlVGV4dChoZWFkZXI/LmVzdGFkb0NvbWVudGFyaW9zKTtcclxuICAgICAgc3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRSZWYuY3VycmVudCA9IGluaXRpYWxDb21tZW50O1xyXG4gICAgICBzZXRTdGF0dXNUcmFuc2l0aW9uQ29tbWVudChpbml0aWFsQ29tbWVudCk7XHJcbiAgICAgIHNldFNob3dTdGF0dXNUcmFuc2l0aW9uQ29tbWVudEZpZWxkKHRydWUpO1xyXG5cclxuICAgICAgb3BlbkNvbmZpcm0oe1xyXG4gICAgICAgIHRpdGxlOiBhY3Rpb25MYWJlbCxcclxuICAgICAgICBtZXNzYWdlOiB0cmFuc2l0aW9uTWVzc2FnZSxcclxuICAgICAgICBjb25maXJtVGV4dDogYWN0aW9uTGFiZWwsXHJcbiAgICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZVN0YXR1c1RyYW5zaXRpb24oXHJcbiAgICAgICAgICAgIGFjdGlvbi5uZXh0U3RhdHVzLFxyXG4gICAgICAgICAgICBhY3Rpb25MYWJlbCxcclxuICAgICAgICAgICAgc3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRSZWYuY3VycmVudFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGlmIChvaykge1xyXG4gICAgICAgICAgICBpbnZhbGlkYXRlQ2FjaGVkTGlzdEZvclJlZmV0Y2goKTtcclxuICAgICAgICAgICAgcmVzZXRTdGF0dXNUcmFuc2l0aW9uRGlhbG9nKCk7XHJcbiAgICAgICAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICAgICAgICByZWxvYWRFeHBlbnNlUGFnZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG9rO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgY2xvc2VDb25maXJtLFxyXG4gICAgICBoYW5kbGVTdGF0dXNUcmFuc2l0aW9uLFxyXG4gICAgICBoYXNTdGF0dXNBY3Rpb25Db250ZW50LFxyXG4gICAgICBoZWFkZXI/LmVzdGFkb0NvbWVudGFyaW9zLFxyXG4gICAgICBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyxcclxuICAgICAgaW52YWxpZGF0ZUNhY2hlZExpc3RGb3JSZWZldGNoLFxyXG4gICAgICBvcGVuQ29uZmlybSxcclxuICAgICAgcmVzZXRTdGF0dXNUcmFuc2l0aW9uRGlhbG9nLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIHVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMoe1xyXG4gICAgYnVzeTogYnVzeSB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsXHJcbiAgICBtb2RhbE9wZW46IG1vZGFsLm9wZW4sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBhY3Rpb25Nb2RlOiB0b3BiYXJBY3Rpb25Nb2RlLFxyXG4gICAgaXNMb2NrZWQ6IGlzU2hlZXRMb2NrZWQsXHJcbiAgICBpc0VkaXRMb2NrZWQ6IGlzUmVhZE9ubHlNb2RlLFxyXG4gICAgaXNEZWxldGVMb2NrZWQ6IGlzU2hlZXRMb2NrZWQsXHJcbiAgICBwZXJtaXNzaW9uc1JlYWR5OiBkZXRhaWxQZXJtaXNzaW9uc1JlYWR5LFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogY2FuQ3JlYXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxyXG4gICAgY2FuRWRpdEV4cGVuc2U6IGNhbkVkaXRBbnlDdXJyZW50LFxyXG4gICAgY2FuRGVsZXRlRXhwZW5zZTogY2FuRGVsZXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgb25TYXZlU3VjY2VzczogaGFuZGxlU2F2ZVN1Y2Nlc3MsXHJcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgaW52YWxpZGF0ZUNhY2hlZExpc3RGb3JSZWZldGNoKCk7XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXRzXCIpO1xyXG4gICAgfSxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xyXG4gICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcclxuICAgIGNvbnN0IGNhcmQgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiKTtcclxuICAgIGlmICghY2FyZCkgcmV0dXJuIG51bGw7XHJcbiAgICBpZiAoIWxpbmVDb250YWluZXJSZWYuY3VycmVudD8uY29udGFpbnMoY2FyZCkpIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIGNhcmQ7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VUaW1lbGluZUNhcmRFZmZlY3RzKHtcclxuICAgIGNvbnRhaW5lclJlZjogbGluZUNvbnRhaW5lclJlZixcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGl0ZW1zOiB2aXNpYmxlTGluZXMsXHJcbiAgICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgcXVpY2tUaWNrZXRGbG93ID0gdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93KHtcclxuICAgIHNoZWV0SWQ6IHNhZmVUZXh0KGhlYWRlcj8uaG9qYUdhc3Rvc0lkIHx8IHNoZWV0SWQpLFxyXG4gICAgcHJvamVjdElkOiBwcm9qZWN0VmFsdWUsXHJcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSxcclxuICAgIGNhbkNyZWF0ZUV4cGVuc2U6ICFpc0NyZWF0ZU1vZGUgJiYgZGV0YWlsUG9saWN5LnNob3dGYWIsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc1NoZWV0TG9ja2VkOiAhY2FuVXNlRnVsbEVkaXRGZWF0dXJlcyxcclxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxyXG4gICAgb25Db21wbGV0ZWQ6IChyZXN1bHQpID0+IHtcclxuICAgICAgY29uc3QgY3JlYXRlZEZpbGVJZCA9IHNhZmVUZXh0KHJlc3VsdD8uZmlsZUlkKTtcclxuICAgICAgaWYgKCFjcmVhdGVkRmlsZUlkKSB7XHJcbiAgICAgICAgcmVsb2FkRXhwZW5zZVBhZ2UoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChyZXN1bHQ/LmxpbmtlZFRvU2hlZXQgPT09IHRydWUpIHtcclxuICAgICAgICByZWxvYWRFeHBlbnNlUGFnZSgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY3VycmVudFNoZWV0SWQgPSBzYWZlVGV4dChoZWFkZXI/LmhvamFHYXN0b3NJZCB8fCBzaGVldElkKTtcclxuICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgICBmaWxlSWQ6IGNyZWF0ZWRGaWxlSWQsXHJcbiAgICAgICAgbW9kZTogXCJlZGl0XCIsXHJcbiAgICAgICAgb3JpZ2luOiBcInNoZWV0LWNyZWF0ZVwiLFxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKGN1cnJlbnRTaGVldElkKSB7XHJcbiAgICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KHtcclxuICAgICAgICAgIGZpbGVJZDogY3JlYXRlZEZpbGVJZCxcclxuICAgICAgICAgIG9yaWdpbjogXCJzaGVldC1jcmVhdGVcIixcclxuICAgICAgICAgIHNoZWV0SWQ6IGN1cnJlbnRTaGVldElkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHF1ZXJ5LnNldChcInNoZWV0SWRcIiwgY3VycmVudFNoZWV0SWQpO1xyXG4gICAgICB9XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCk7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBmYWJNZW51SXRlbXMgPSB1c2VNZW1vPEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW1bXT4oXHJcbiAgICAoKSA9PiBbXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogXCJuZXctdGlja2V0XCIsXHJcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9OZXdUaWNrZXRcIiwgXCJOdWV2byBUaWNrZXRcIiksXHJcbiAgICAgICAgaWNvbjogPE5ld1RpY2tldEljb24gLz4sXHJcbiAgICAgICAgb25DbGljazogcXVpY2tUaWNrZXRGbG93Lm9wZW5Tb3VyY2VQaWNrZXIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogXCJsaW5rLXRpY2tldFwiLFxyXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfTGlua1RpY2tldFwiLCBcIlZpbmN1bGFyIFRpY2tldFwiKSxcclxuICAgICAgICBpY29uOiA8TGlua1RpY2tldEljb24gLz4sXHJcbiAgICAgICAgb25DbGljazogaGFuZGxlT3BlbkxpbmtUaWNrZXRNb2RlLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IFwibmV3LWxpbmVcIixcclxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX05ld0xpbmVcIiwgXCJOdWV2YSBMaW5lYVwiKSxcclxuICAgICAgICBpY29uOiA8TmV3TGluZUljb24gLz4sXHJcbiAgICAgICAgb25DbGljazogaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICAgIFtoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUsIGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSwgcXVpY2tUaWNrZXRGbG93Lm9wZW5Tb3VyY2VQaWNrZXJdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2hvd1N0YXR1c0FjdGlvbkJhciA9XHJcbiAgICAhaXNDcmVhdGVNb2RlICYmICFpc0xvYWRpbmcgJiYgIWlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSAmJiAhZXJyb3JNZXNzYWdlICYmIGRldGFpbFBvbGljeS5zdGF0dXNBY3Rpb25zLmxlbmd0aCA+IDA7XHJcbiAgY29uc3Qgc2hvd0ZhYiA9ICFpc0NyZWF0ZU1vZGUgJiYgZGV0YWlsUG9saWN5LnNob3dGYWI7XHJcbiAgY29uc3QgaGFzVmlzaWJsZVN0YXR1c0NvbW1lbnQgPSBzYWZlVGV4dChoZWFkZXI/LmVzdGFkb0NvbWVudGFyaW9zKS50cmltKCkubGVuZ3RoID4gMDtcclxuICBjb25zdCBzdGF0dXNDb21tZW50TW9kZTogXCJoaWRkZW5cIiB8IFwicmVhZFwiID0gaGFzVmlzaWJsZVN0YXR1c0NvbW1lbnQgPyBcInJlYWRcIiA6IFwiaGlkZGVuXCI7XHJcbiAgY29uc3QgbW9kYWxCb2R5ID0gc2hvd1N0YXR1c1RyYW5zaXRpb25Db21tZW50RmllbGQgPyAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XHJcbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj5cclxuICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzQ29tbWVudFwiLCBcIlN0YXR1cyBjb21tZW50XCIpfVxyXG4gICAgICA8L2xhYmVsPlxyXG4gICAgICA8dGV4dGFyZWFcclxuICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgcmVzaXplLW5vbmVcIlxyXG4gICAgICAgIHJvd3M9ezN9XHJcbiAgICAgICAgdmFsdWU9e3N0YXR1c1RyYW5zaXRpb25Db21tZW50fVxyXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG5leHRWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiO1xyXG4gICAgICAgICAgc3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRSZWYuY3VycmVudCA9IG5leHRWYWx1ZTtcclxuICAgICAgICAgIHNldFN0YXR1c1RyYW5zaXRpb25Db21tZW50KG5leHRWYWx1ZSk7XHJcbiAgICAgICAgfX1cclxuICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TdGF0dXNDb21tZW50XCIsIFwiU3RhdHVzIGNvbW1lbnRcIil9XHJcbiAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxuICApIDogbnVsbDtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGhlYWRlcixcclxuICAgIHZpc2libGVMaW5lcyxcclxuICAgIGxpbmVQYWdlLFxyXG4gICAgdG90YWxMaW5lUGFnZXMsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBidXN5LFxyXG4gICAgc3RhdHVzLFxyXG4gICAgbW9kYWxFcnJvcixcclxuICAgIGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSxcclxuICAgIG1vZGFsLFxyXG4gICAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICAgIG1vZGFsQ2FuY2VsVGV4dCxcclxuICAgIG1vZGFsQ29uZmlybVRleHQsXHJcbiAgICBtb2RhbEJvZHksXHJcbiAgICBjYW5DcmVhdGVFeHBlbnNlRm9yQ3VycmVudFZpZXcsXHJcbiAgICBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcclxuICAgIGNhblVzZUZ1bGxFZGl0RmVhdHVyZXMsXHJcbiAgICBzaG93U3RhdHVzQWN0aW9uQmFyLFxyXG4gICAgc2hvd0ZhYixcclxuICAgIGFyZVN0YXR1c0FjdGlvbnNEaXNhYmxlZCxcclxuICAgIGZhYk1lbnVJdGVtcyxcclxuICAgIHBhZ2luYXRpb25MYWJlbHMsXHJcbiAgICB0b3RhbEFtb3VudFRleHQsXHJcbiAgICBzdGF0dXNDb21tZW50TW9kZSxcclxuICAgIHByb2plY3RWYWx1ZSxcclxuICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxyXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LFxyXG4gICAgc2hvd0V4Y2hhbmdlUmF0ZSxcclxuICAgIGV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSxcclxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxyXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gICAgZGV0YWlsUG9saWN5LFxyXG4gICAgbGluZUNvbnRhaW5lclJlZixcclxuICAgIGNhbWVyYUlucHV0UmVmLFxyXG4gICAgZ2FsbGVyeUlucHV0UmVmLFxyXG4gICAgcXVpY2tUaWNrZXRGbG93LFxyXG4gICAgc2V0TGluZVBhZ2UsXHJcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXHJcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcclxuICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsOiBoYW5kbGVPcGVuTGluZURldGFpbCxcclxuICAgIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSxcclxuICAgIGhhbmRsZVN0YXR1c0FjdGlvbkNsaWNrLFxyXG4gICAgY2xvc2VDb25maXJtOiBoYW5kbGVDbG9zZUNvbmZpcm0sXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QsIEV4cGVuc2VTaGVldEhlYWRlclVwZGF0ZVJlcXVlc3QgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24sIHBhcnNlRGVjaW1hbElucHV0IH0gZnJvbSBcIi4uL2hvb2tzL2V4cGVuc2VNdXRhdGlvblV0aWxzLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgY3JlYXRlRXhwZW5zZVNoZWV0LFxyXG4gIGRlbGV0ZUV4cGVuc2VTaGVldCxcclxuICB1cGRhdGVFeHBlbnNlU2hlZXRIZWFkZXIsXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuXHJcbmNvbnN0IFNBTUVfQ1VSUkVOQ1lfRVhDSEFOR0VfUkFURSA9IDEwMDtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XHJcbiAgaXNFZGl0TG9ja2VkOiBib29sZWFuO1xyXG4gIGlzRGVsZXRlTG9ja2VkOiBib29sZWFuO1xyXG4gIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xyXG4gIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lczogYm9vbGVhbjtcclxuICBsb2NrZWRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBsb2NrZWRFeGNoYW5nZVJhdGU6IHN0cmluZztcclxuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xyXG4gIGNhbkVkaXRFeHBlbnNlOiBib29sZWFuO1xyXG4gIGNhbkRlbGV0ZUV4cGVuc2U6IGJvb2xlYW47XHJcbiAgY2FuRWRpdEhlYWRlckZpZWxkczogYm9vbGVhbjtcclxuICBjYW5UcmFuc2l0aW9uU3RhdHVzOiBib29sZWFuO1xyXG4gIHNoZWV0SWQ6IHN0cmluZztcclxuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBkcmFmdEV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWU6IHN0cmluZztcclxuICBkcmFmdFByb2plY3RJZDogc3RyaW5nO1xyXG4gIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3M6IHN0cmluZztcclxuICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k6IHN0cmluZztcclxuICBjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzPzogbnVtYmVyIHwgbnVsbDtcclxuICBjdXJyZW50RXhjaGFuZ2VSYXRlTW9kZT86IG51bWJlciB8IG51bGw7XHJcbiAgb25DcmVhdGVTdWNjZXNzOiAoY3JlYXRlZFNoZWV0SWQ6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRNb2RhbEVycm9yOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRCdXN5OiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxuICBzZXRJc0VkaXRpbmc6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUV4Y2hhbmdlUmF0ZSA9IChyYXc6IHN0cmluZyk6IG51bWJlciB8IG51bGwgPT4gcGFyc2VEZWNpbWFsSW5wdXQocmF3KTtcclxuLy8gQ29tcGFyZXMgcmF0ZXMgd2l0aCB0b2xlcmFuY2UgdG8gYXZvaWQgZmxvYXRpbmcgcG9pbnQgbWlzbWF0Y2ggb24gcGF5bG9hZCBtb2RlLlxyXG5jb25zdCBhcmVSYXRlc0VxdWl2YWxlbnQgPSAobGVmdDogbnVtYmVyIHwgbnVsbCwgcmlnaHQ6IG51bWJlciB8IG51bGwpOiBib29sZWFuID0+IHtcclxuICBpZiAobGVmdCA9PSBudWxsIHx8IHJpZ2h0ID09IG51bGwpIHJldHVybiBmYWxzZTtcclxuICByZXR1cm4gTWF0aC5hYnMobGVmdCAtIHJpZ2h0KSA8IDAuMDAwMDAwMTtcclxufTtcclxuXHJcbi8vIEVuY2Fwc3VsYXRlcyB1cGRhdGUgYW5kIGRlbGV0ZSBtdXRhdGlvbnMgZm9yIGV4cGVuc2Ugc2hlZXQgaGVhZGVyIGRldGFpbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9ucyA9ICh7XHJcbiAgYnVzeSxcclxuICBpc0VkaXRpbmcsXHJcbiAgaXNDcmVhdGVNb2RlLFxyXG4gIGlzRWRpdExvY2tlZCxcclxuICBpc0RlbGV0ZUxvY2tlZCxcclxuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcclxuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXHJcbiAgbG9ja2VkQ3VycmVuY3lDb2RlLFxyXG4gIGxvY2tlZEV4Y2hhbmdlUmF0ZSxcclxuICBjYW5DcmVhdGVFeHBlbnNlLFxyXG4gIGNhbkVkaXRFeHBlbnNlLFxyXG4gIGNhbkRlbGV0ZUV4cGVuc2UsXHJcbiAgY2FuRWRpdEhlYWRlckZpZWxkcyxcclxuICBjYW5UcmFuc2l0aW9uU3RhdHVzLFxyXG4gIHNoZWV0SWQsXHJcbiAgZHJhZnREZXNjcmlwdGlvbixcclxuICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gIGRyYWZ0UHJvamVjdElkLFxyXG4gIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gIGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXMsXHJcbiAgY3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUsXHJcbiAgb25DcmVhdGVTdWNjZXNzLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgc2V0QnVzeSxcclxuICBzZXRTdGF0dXMsXHJcbiAgc2V0SXNFZGl0aW5nLFxyXG59OiBVc2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnNBcmdzKSA9PiB7XHJcbiAgY29uc3QgYnVpbGRVcGRhdGVQYXlsb2FkID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoXHJcbiAgICAgIG5leHRTdGF0dXM/OiBudW1iZXIgfCBudWxsLFxyXG4gICAgICBzdGF0dXNDb21tZW50T3ZlcnJpZGU/OiBzdHJpbmcgfCBudWxsXHJcbiAgICApOiB7IHBheWxvYWQ6IEV4cGVuc2VTaGVldEhlYWRlclVwZGF0ZVJlcXVlc3QgfSB8IHsgZXJyb3I6IHN0cmluZyB9ID0+IHtcclxuICAgICAgY29uc3QgaGFzRXhwbGljaXRTdGF0dXNDb21tZW50T3ZlcnJpZGUgPSBzdGF0dXNDb21tZW50T3ZlcnJpZGUgIT09IHVuZGVmaW5lZDtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZEN1cnJlbmN5ID0gU3RyaW5nKFxyXG4gICAgICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzID8gKGxvY2tlZEN1cnJlbmN5Q29kZSB8fCBkcmFmdEN1cnJlbmN5Q29kZSB8fCBcIlwiKSA6IChkcmFmdEN1cnJlbmN5Q29kZSB8fCBcIlwiKVxyXG4gICAgICApXHJcbiAgICAgICAgLnRyaW0oKVxyXG4gICAgICAgIC50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkRGVzY3JpcHRpb24gPSBTdHJpbmcoZHJhZnREZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRQcm9qZWN0SWQgPSBTdHJpbmcoZHJhZnRQcm9qZWN0SWQgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkRXN0YWRvQ29tZW50YXJpb3MgPSBTdHJpbmcoXHJcbiAgICAgICAgc3RhdHVzQ29tbWVudE92ZXJyaWRlID8/IGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MgPz8gXCJcIlxyXG4gICAgICApLnRyaW0oKTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZEV4Y2hhbmdlUmF0ZVJhdyA9IFN0cmluZyhcclxuICAgICAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMgPyAobG9ja2VkRXhjaGFuZ2VSYXRlIHx8IGRyYWZ0RXhjaGFuZ2VSYXRlIHx8IFwiXCIpIDogKGRyYWZ0RXhjaGFuZ2VSYXRlIHx8IFwiXCIpXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kgPSBTdHJpbmcoZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5IHx8IFwiRVVSXCIpLnRyaW0oKS50b1VwcGVyQ2FzZSgpIHx8IFwiRVVSXCI7XHJcbiAgICAgIGNvbnN0IHJlcXVpcmVzRXhjaGFuZ2VSYXRlID1cclxuICAgICAgICBjYW5FZGl0SGVhZGVyRmllbGRzICYmIG5vcm1hbGl6ZWRDdXJyZW5jeSAhPT0gXCJcIiAmJiBub3JtYWxpemVkQ3VycmVuY3kgIT09IG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3k7XHJcbiAgICAgIGNvbnN0IHVzZXNTYW1lQ3VycmVuY3lSYXRlID0gY2FuRWRpdEhlYWRlckZpZWxkcyAmJiBub3JtYWxpemVkQ3VycmVuY3kgIT09IFwiXCIgJiYgIXJlcXVpcmVzRXhjaGFuZ2VSYXRlO1xyXG4gICAgICBjb25zdCBwYXJzZWRFeGNoYW5nZVJhdGUgPSBub3JtYWxpemVFeGNoYW5nZVJhdGUobm9ybWFsaXplZEV4Y2hhbmdlUmF0ZVJhdyk7XHJcbiAgICAgIGNvbnN0IG9mZmljaWFsRXhjaGFuZ2VSYXRlID0gbm9ybWFsaXplRXhjaGFuZ2VSYXRlKG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUpO1xyXG4gICAgICBjb25zdCBvcmlnaW5hbEV4Y2hhbmdlUmF0ZSA9IG5vcm1hbGl6ZUV4Y2hhbmdlUmF0ZShsb2NrZWRFeGNoYW5nZVJhdGUpO1xyXG4gICAgICBjb25zdCBwYXJzZWRDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA9IE51bWJlcihjdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSk7XHJcbiAgICAgIGNvbnN0IGhhc0N1cnJlbnRFeGNoYW5nZVJhdGVNb2RlID0gTnVtYmVyLmlzSW50ZWdlcihwYXJzZWRDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSkgJiYgcGFyc2VkQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUgPj0gMDtcclxuICAgICAgY29uc3QgaGFzVmFsaWRSYXRlID0gcGFyc2VkRXhjaGFuZ2VSYXRlICE9IG51bGwgJiYgcGFyc2VkRXhjaGFuZ2VSYXRlID4gMDtcclxuICAgICAgY29uc3QgaGFzTWFudWFsUmF0ZUVkaXRPblVwZGF0ZSA9XHJcbiAgICAgICAgY2FuRWRpdEhlYWRlckZpZWxkcyAmJlxyXG4gICAgICAgICFpc0NyZWF0ZU1vZGUgJiZcclxuICAgICAgICBoYXNWYWxpZFJhdGUgJiZcclxuICAgICAgICAob3JpZ2luYWxFeGNoYW5nZVJhdGUgPT0gbnVsbCB8fCAhYXJlUmF0ZXNFcXVpdmFsZW50KHBhcnNlZEV4Y2hhbmdlUmF0ZSwgb3JpZ2luYWxFeGNoYW5nZVJhdGUpKTtcclxuICAgICAgLy8gT25seSBzZW5kIGV4Y2hhbmdlUmF0ZU1vZGUgd2hlbiB0aGUgdXNlciBhY3R1YWxseSBjaGFuZ2VkIHRoZSByYXRlIG1hbnVhbGx5LlxyXG4gICAgICBjb25zdCBpc01hbnVhbEV4Y2hhbmdlUmF0ZSA9ICgoKSA9PiB7XHJcbiAgICAgICAgaWYgKCFjYW5FZGl0SGVhZGVyRmllbGRzKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKCFyZXF1aXJlc0V4Y2hhbmdlUmF0ZSB8fCAhaGFzVmFsaWRSYXRlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmICghaXNDcmVhdGVNb2RlICYmICFoYXNNYW51YWxSYXRlRWRpdE9uVXBkYXRlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKG9mZmljaWFsRXhjaGFuZ2VSYXRlID09IG51bGwpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHJldHVybiAhYXJlUmF0ZXNFcXVpdmFsZW50KHBhcnNlZEV4Y2hhbmdlUmF0ZSwgb2ZmaWNpYWxFeGNoYW5nZVJhdGUpO1xyXG4gICAgICB9KSgpO1xyXG4gICAgICBjb25zdCByZXNvbHZlZEV4Y2hhbmdlUmF0ZU1vZGUgPSBjYW5FZGl0SGVhZGVyRmllbGRzXHJcbiAgICAgICAgPyAoaXNNYW51YWxFeGNoYW5nZVJhdGUgPyAxIDogKGhhc0N1cnJlbnRFeGNoYW5nZVJhdGVNb2RlID8gcGFyc2VkQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUgOiAwKSlcclxuICAgICAgICA6IChoYXNDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA/IHBhcnNlZEN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlIDogdW5kZWZpbmVkKTtcclxuICAgICAgY29uc3QgcmVzb2x2ZWRFeHBlbnNlU2hlZXRTdGF0dXMgPVxyXG4gICAgICAgIG5leHRTdGF0dXMgPz8gKGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXMgIT0gbnVsbCA/IE51bWJlcihjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzKSA6IHVuZGVmaW5lZCk7XHJcbiAgICAgIC8vIFN0YXR1cy9jb21tZW50LW9ubHkgZmxvd3Mgc3RpbGwgc3VibWl0IHRoZSBmdWxsIGhlYWRlciBwYXlsb2FkLCBzbyBrZWVwIHRoZSBzdG9yZWQgcmF0ZSB1bnRvdWNoZWQuXHJcbiAgICAgIGNvbnN0IHJlc29sdmVkRXhjaGFuZ2VSYXRlID0gY2FuRWRpdEhlYWRlckZpZWxkc1xyXG4gICAgICAgID8gKHVzZXNTYW1lQ3VycmVuY3lSYXRlID8gU0FNRV9DVVJSRU5DWV9FWENIQU5HRV9SQVRFIDogKGhhc1ZhbGlkUmF0ZSA/IE51bWJlcihwYXJzZWRFeGNoYW5nZVJhdGUpIDogMSkpXHJcbiAgICAgICAgOiAob3JpZ2luYWxFeGNoYW5nZVJhdGUgPz8gcGFyc2VkRXhjaGFuZ2VSYXRlID8/IDApO1xyXG5cclxuICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICAgIGlmICghbm9ybWFsaXplZERlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlcnJvcjogaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9EZXNjcmlwdGlvblJlcXVpcmVkXCIsIFwiRGVzY3JpcHRpb24gaXMgcmVxdWlyZWQuXCIpLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghbm9ybWFsaXplZEN1cnJlbmN5KSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlcnJvcjogaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9DdXJyZW5jeVJlcXVpcmVkXCIsIFwiQ3VycmVuY3kgaXMgcmVxdWlyZWQuXCIpLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChyZXF1aXJlc0V4Y2hhbmdlUmF0ZSAmJiAhaGFzVmFsaWRSYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGVycm9yOiBpbmRUKFxyXG4gICAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9FeGNoYW5nZVJhdGVSZXF1aXJlZFwiLFxyXG4gICAgICAgICAgICBcIkV4Y2hhbmdlIHJhdGUgaXMgcmVxdWlyZWQgd2hlbiBjdXJyZW5jeSBpcyBkaWZmZXJlbnQgZnJvbSBiYXNlIGN1cnJlbmN5LlwiXHJcbiAgICAgICAgICApLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgcGF5bG9hZDoge1xyXG4gICAgICAgICAgZGVzY3JpcHRpb246IG5vcm1hbGl6ZWREZXNjcmlwdGlvbixcclxuICAgICAgICAgIGN1cnJlbmN5Q29kZTogbm9ybWFsaXplZEN1cnJlbmN5LFxyXG4gICAgICAgICAgZXhjaFJhdGU6IHJlc29sdmVkRXhjaGFuZ2VSYXRlLFxyXG4gICAgICAgICAgcHJvaklkOiBub3JtYWxpemVkUHJvamVjdElkIHx8IHVuZGVmaW5lZCxcclxuICAgICAgICAgIGV4cGVuc2VTaGVldFN0YXR1czogcmVzb2x2ZWRFeHBlbnNlU2hlZXRTdGF0dXMsXHJcbiAgICAgICAgICBleGNoYW5nZVJhdGVNb2RlOiByZXNvbHZlZEV4Y2hhbmdlUmF0ZU1vZGUsXHJcbiAgICAgICAgICAvLyBQcmVzZXJ2ZSBleHBsaWNpdCBlbXB0eSBzdGF0dXMgY29tbWVudHMgc28gdGhlIGJhY2tlbmQgY2FuIGNsZWFyIHRoZSBzdG9yZWQgdmFsdWUuXHJcbiAgICAgICAgICBlc3RhZG9Db21lbnRhcmlvczogaGFzRXhwbGljaXRTdGF0dXNDb21tZW50T3ZlcnJpZGVcclxuICAgICAgICAgICAgPyBub3JtYWxpemVkRXN0YWRvQ29tZW50YXJpb3NcclxuICAgICAgICAgICAgOiAobm9ybWFsaXplZEVzdGFkb0NvbWVudGFyaW9zIHx8IHVuZGVmaW5lZCksXHJcbiAgICAgICAgfSxcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGNhbkVkaXRIZWFkZXJGaWVsZHMsXHJcbiAgICAgIGN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlLFxyXG4gICAgICBjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzLFxyXG4gICAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcclxuICAgICAgZHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICAgIGRyYWZ0UHJvamVjdElkLFxyXG4gICAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXHJcbiAgICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXHJcbiAgICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcclxuICAgICAgbG9ja2VkQ3VycmVuY3lDb2RlLFxyXG4gICAgICBsb2NrZWRFeGNoYW5nZVJhdGUsXHJcbiAgICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsXHJcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlVXBkYXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kgfHwgIWlzRWRpdGluZykgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFpc0NyZWF0ZU1vZGUgJiYgaXNFZGl0TG9ja2VkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgY2FuUHJvY2VlZCA9IGlzQ3JlYXRlTW9kZSA/IGNhbkNyZWF0ZUV4cGVuc2UgOiBjYW5FZGl0RXhwZW5zZTtcclxuICAgIGlmICghY2FuUHJvY2VlZCkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXlsb2FkUmVzdWx0ID0gYnVpbGRVcGRhdGVQYXlsb2FkKCk7XHJcbiAgICBpZiAoXCJlcnJvclwiIGluIHBheWxvYWRSZXN1bHQpIHtcclxuICAgICAgc2V0TW9kYWxFcnJvcihwYXlsb2FkUmVzdWx0LmVycm9yKTtcclxuICAgICAgc2V0U3RhdHVzKHBheWxvYWRSZXN1bHQuZXJyb3IpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XHJcbiAgICAgIHN0YXJ0U3RhdHVzOiBpc0NyZWF0ZU1vZGVcclxuICAgICAgICA/IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIilcclxuICAgICAgICA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGluZ1wiLCBcIlVwZGF0aW5nIGV4cGVuc2Ugc2hlZXQuLi5cIiksXHJcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRXJyb3JcIiwgXCJVcGRhdGUgZXJyb3IuXCIpLFxyXG4gICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICBzZXRCdXN5LFxyXG4gICAgICBzZXRTdGF0dXMsXHJcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgICAgIGNvbnN0IGNyZWF0ZVBheWxvYWQgPSBwYXlsb2FkUmVzdWx0LnBheWxvYWQ7XHJcbiAgICAgICAgICBjb25zdCBwYXlsb2FkOiBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0ID0ge1xyXG4gICAgICAgICAgICBtb2RlOiAxLFxyXG4gICAgICAgICAgICBleGlzdGluZ0hvamFHYXN0b3NJZDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogY3JlYXRlUGF5bG9hZC5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgY3VycmVuY3lDb2RlOiBjcmVhdGVQYXlsb2FkLmN1cnJlbmN5Q29kZSxcclxuICAgICAgICAgICAgZXhjaFJhdGU6IGNyZWF0ZVBheWxvYWQuZXhjaFJhdGUsXHJcbiAgICAgICAgICAgIHByb2pJZDogY3JlYXRlUGF5bG9hZC5wcm9qSWQsXHJcbiAgICAgICAgICAgIGV4cGVuc2VTaGVldFN0YXR1czogMCxcclxuICAgICAgICAgICAgZXhjaGFuZ2VSYXRlTW9kZTogY3JlYXRlUGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlLFxyXG4gICAgICAgICAgICBsaW5lczogW10sXHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY3JlYXRlRXhwZW5zZVNoZWV0KHBheWxvYWQpO1xyXG5cclxuICAgICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIEFjY2VwdCBib3RoIGNhc2luZyB2YXJpYW50cyBmcm9tIGJhY2tlbmQgZW52ZWxvcGVzLlxyXG4gICAgICAgICAgY29uc3QgY3JlYXRlZERhdGEgPSByZXNwb25zZT8uRGF0YSBhcyB7IEhvamFHYXN0b3NJZD86IHVua25vd247IGhvamFHYXN0b3NJZD86IHVua25vd24gfSB8IG51bGwgfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICBjb25zdCBjcmVhdGVkU2hlZXRJZCA9IFN0cmluZyhjcmVhdGVkRGF0YT8uSG9qYUdhc3Rvc0lkID8/IGNyZWF0ZWREYXRhPy5ob2phR2FzdG9zSWQgPz8gXCJcIikudHJpbSgpO1xyXG4gICAgICAgICAgaWYgKCFjcmVhdGVkU2hlZXRJZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBvbkNyZWF0ZVN1Y2Nlc3MoY3JlYXRlZFNoZWV0SWQpO1xyXG4gICAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIikpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHVwZGF0ZUV4cGVuc2VTaGVldEhlYWRlcihzaGVldElkLCBwYXlsb2FkUmVzdWx0LnBheWxvYWQpO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVGYWlsZWRcIiwgXCJVcGRhdGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IHVwZGF0ZWRcIikpO1xyXG4gICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xyXG4gIH0sIFtcclxuICAgIGJ1c3ksXHJcbiAgICBidWlsZFVwZGF0ZVBheWxvYWQsXHJcbiAgICBjYW5DcmVhdGVFeHBlbnNlLFxyXG4gICAgY2FuRWRpdEV4cGVuc2UsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc0VkaXRMb2NrZWQsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBvbkNyZWF0ZVN1Y2Nlc3MsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNoZWV0SWQsXHJcbiAgXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVN0YXR1c1RyYW5zaXRpb24gPSB1c2VDYWxsYmFjayhcclxuICAgIGFzeW5jIChuZXh0U3RhdHVzOiBudW1iZXIsIHN0YXJ0U3RhdHVzOiBzdHJpbmcsIHN0YXR1c0NvbW1lbnRPdmVycmlkZT86IHN0cmluZyB8IG51bGwpID0+IHtcclxuICAgICAgaWYgKGJ1c3kgfHwgaXNDcmVhdGVNb2RlIHx8ICFzaGVldElkKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmICghY2FuVHJhbnNpdGlvblN0YXR1cykge1xyXG4gICAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHBheWxvYWRSZXN1bHQgPSBidWlsZFVwZGF0ZVBheWxvYWQobmV4dFN0YXR1cywgc3RhdHVzQ29tbWVudE92ZXJyaWRlKTtcclxuICAgICAgaWYgKFwiZXJyb3JcIiBpbiBwYXlsb2FkUmVzdWx0KSB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihwYXlsb2FkUmVzdWx0LmVycm9yKTtcclxuICAgICAgICBzZXRTdGF0dXMocGF5bG9hZFJlc3VsdC5lcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcclxuICAgICAgICBzdGFydFN0YXR1cyxcclxuICAgICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKSxcclxuICAgICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICAgIHNldEJ1c3ksXHJcbiAgICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB1cGRhdGVFeHBlbnNlU2hlZXRIZWFkZXIoc2hlZXRJZCwgcGF5bG9hZFJlc3VsdC5wYXlsb2FkKTtcclxuXHJcbiAgICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IHVwZGF0ZWRcIikpO1xyXG4gICAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmV0dXJuIHJlc3VsdC5vaztcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIGJ1aWxkVXBkYXRlUGF5bG9hZCxcclxuICAgICAgY2FuVHJhbnNpdGlvblN0YXR1cyxcclxuICAgICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgICBzZXRCdXN5LFxyXG4gICAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgICAgc2hlZXRJZCxcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVEZWxldGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKGlzRGVsZXRlTG9ja2VkKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIWNhbkRlbGV0ZUV4cGVuc2UpIHtcclxuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XHJcbiAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRpbmdcIiwgXCJEZWxldGluZyBleHBlbnNlIHNoZWV0Li4uXCIpLFxyXG4gICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUVycm9yXCIsIFwiRGVsZXRlIGVycm9yLlwiKSxcclxuICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgc2V0QnVzeSxcclxuICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldChzaGVldElkKTtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVkXCIsIFwiRXhwZW5zZSBzaGVldCBkZWxldGVkXCIpKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiByZXN1bHQub2s7XHJcbiAgfSwgW2J1c3ksIGNhbkRlbGV0ZUV4cGVuc2UsIGlzRGVsZXRlTG9ja2VkLCBzZXRCdXN5LCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXMsIHNoZWV0SWRdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGhhbmRsZVVwZGF0ZSxcclxuICAgIGhhbmRsZVN0YXR1c1RyYW5zaXRpb24sXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMgfSBmcm9tIFwiLi4vaG9va3MvdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zLnRzXCI7XHJcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnNBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XHJcbiAgYWN0aW9uTW9kZT86IFwiZGVmYXVsdFwiIHwgXCJkZWxldGVfb25seVwiIHwgXCJ2aWV3X29ubHlcIjtcclxuICBpc0xvY2tlZDogYm9vbGVhbjtcclxuICBpc0VkaXRMb2NrZWQ/OiBib29sZWFuO1xyXG4gIGlzRGVsZXRlTG9ja2VkPzogYm9vbGVhbjtcclxuICBwZXJtaXNzaW9uc1JlYWR5PzogYm9vbGVhbjtcclxuICBjYW5FZGl0RXhwZW5zZTogYm9vbGVhbjtcclxuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xyXG4gIGNhbkRlbGV0ZUV4cGVuc2U6IGJvb2xlYW47XHJcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcclxuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xyXG4gIGhhbmRsZVVwZGF0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBoYW5kbGVEZWxldGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgb25TYXZlU3VjY2VzczogKCkgPT4gdm9pZDtcclxuICBvbkRlbGV0ZVN1Y2Nlc3M/OiAoKSA9PiB2b2lkO1xyXG4gIG9wZW5Db25maXJtOiAob3B0czoge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xyXG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcclxuICB9KSA9PiB2b2lkO1xyXG4gIGNsb3NlQ29uZmlybTogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIENvb3JkaW5hdGVzIHRvcGJhciBpY29uIHN0YXRlIGFuZCBkaXNwYXRjaCBhY3Rpb25zIGZvciBleHBlbnNlIHNoZWV0IGRldGFpbC5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgbW9kYWxPcGVuLFxyXG4gIGlzRWRpdGluZyxcclxuICBpc0NyZWF0ZU1vZGUsXHJcbiAgYWN0aW9uTW9kZSA9IFwiZGVmYXVsdFwiLFxyXG4gIGlzTG9ja2VkLFxyXG4gIGlzRWRpdExvY2tlZCxcclxuICBpc0RlbGV0ZUxvY2tlZCxcclxuICBwZXJtaXNzaW9uc1JlYWR5ID0gdHJ1ZSxcclxuICBjYW5FZGl0RXhwZW5zZSxcclxuICBjYW5DcmVhdGVFeHBlbnNlLFxyXG4gIGNhbkRlbGV0ZUV4cGVuc2UsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgaGFuZGxlVXBkYXRlLFxyXG4gIGhhbmRsZURlbGV0ZSxcclxuICBvblNhdmVTdWNjZXNzLFxyXG4gIG9uRGVsZXRlU3VjY2VzcyxcclxuICBvcGVuQ29uZmlybSxcclxuICBjbG9zZUNvbmZpcm0sXHJcbn06IFVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnNBcmdzKSA9PiB7XHJcbiAgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zKHtcclxuICAgIGFjdGlvbkdyb3VwSWQ6IFwiZXhwZW5zZS1zaGVldC1kZXRhaWwtYWN0aW9uc1wiLFxyXG4gICAgaWRzOiB7XHJcbiAgICAgIGVkaXRJY29uSWQ6IFwiZXhwZW5zZUVkaXRJY29uXCIsXHJcbiAgICAgIHNhdmVJY29uSWQ6IFwiZXhwZW5zZVNhdmVJY29uXCIsXHJcbiAgICAgIGRlbGV0ZUJ0bklkOiBcImV4cGVuc2VEZWxldGVCdG5cIixcclxuICAgICAgY2FuY2VsQnRuSWQ6IFwiZXhwZW5zZUNhbmNlbEJ0blwiLFxyXG4gICAgfSxcclxuICAgIGV2ZW50czoge1xyXG4gICAgICBlZGl0RXZlbnQ6IFwiZXhwZW5zZS1kZXRhaWwtZWRpdFwiLFxyXG4gICAgICBkZWxldGVFdmVudDogXCJleHBlbnNlLWRldGFpbC1kZWxldGVcIixcclxuICAgICAgY2FuY2VsRXZlbnQ6IFwiZXhwZW5zZS1kZXRhaWwtY2FuY2VsLWVkaXRcIixcclxuICAgIH0sXHJcbiAgICBidXN5LFxyXG4gICAgbW9kYWxPcGVuLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgaXNMb2NrZWQsXHJcbiAgICBhY3Rpb25Nb2RlLFxyXG4gICAgaXNFZGl0TG9ja2VkLFxyXG4gICAgaXNEZWxldGVMb2NrZWQsXHJcbiAgICBhbGxvd0NyZWF0ZU1vZGVBY3Rpb25zV2hlbkxvY2tlZDogdHJ1ZSxcclxuICAgIHBlcm1pc3Npb25zUmVhZHksXHJcbiAgICBjYW5DcmVhdGU6IGNhbkNyZWF0ZUV4cGVuc2UsXHJcbiAgICBjYW5FZGl0OiBjYW5FZGl0RXhwZW5zZSxcclxuICAgIGNhbkRlbGV0ZTogY2FuRGVsZXRlRXhwZW5zZSxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICAgIGhhbmRsZVNhdmU6IGhhbmRsZVVwZGF0ZSxcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICAgIHNhdmVDb25maXJtVGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19UaXRsZVwiLCBcIlNhdmUgY2hhbmdlc1wiKSxcclxuICAgIHNhdmVDb25maXJtTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBzYXZlIGNoYW5nZXM/XCIpLFxyXG4gICAgc2F2ZUNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX1NhdmVcIiwgXCJTYXZlXCIpLFxyXG4gICAgZGVsZXRlQ29uZmlybVRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlU2hlZXRfVGl0bGVcIiwgXCJEZWxldGUgZXhwZW5zZSBzaGVldFwiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlU2hlZXRfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGV4cGVuc2Ugc2hlZXQ/XCIpLFxyXG4gICAgZGVsZXRlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fRGVsZXRlXCIsIFwiRGVsZXRlXCIpLFxyXG4gICAgb25TYXZlU3VjY2VzcyxcclxuICAgIG9uRGVsZXRlU3VjY2Vzczogb25EZWxldGVTdWNjZXNzIHx8ICgoKSA9PiBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvRXhwZW5zZVNoZWV0c1wiKSksXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICB9KTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUge1xyXG4gIEV4cGVuc2VTaGVldEhlYWRlcixcclxuICBFeHBlbnNlU2hlZXRMaW5lLFxyXG59IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHtcclxuICBmZXRjaEV4cGVuc2VTaGVldERldGFpbCxcclxuICBnZXRFeGNoYW5nZVJhdGUsXHJcbiAgZ2V0RXhwZW5zZVNoZWV0RGVmYXVsdEN1cnJlbmN5Q29kZSxcclxuICBtYXBFeHBlbnNlU2hlZXRIZWFkZXIsXHJcbiAgbWFwRXhwZW5zZVNoZWV0TGluZSxcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCxcclxuICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCxcclxuICBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLFxyXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VNYW5hZ2VkVXNlclNjb3BlLnRzXCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlTGFiZWwgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4Y2hhbmdlUmF0ZUVudHJ5TW9kZUNhdGFsb2cudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlLCBoYXNBc3NpZ25lZFZvdWNoZXIsIHBhcnNlRXhwZW5zZURhdGUsIHNhZmVUZXh0LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyLCBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xyXG5pbXBvcnQgeyByZXNvbHZlRXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5IH0gZnJvbSBcIi4vZXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5LnRzXCI7XHJcblxyXG5jb25zdCBFWENIQU5HRV9SQVRFX0RFQk9VTkNFX01TID0gNDAwO1xyXG5jb25zdCBFWENIQU5HRV9SQVRFX1JFRkVSRU5DRV9BTU9VTlQgPSAxMDA7XHJcbmNvbnN0IEVYQ0hBTkdFX1JBVEVfREVDSU1BTF9ESUdJVFMgPSA3O1xyXG5jb25zdCBFWFBFTlNFX1NUQVRVU19BUFBST1ZFRCA9IDI7XHJcbmNvbnN0IEVYUEVOU0VfU1RBVFVTX1BBSUQgPSA0O1xyXG5cclxuLy8gTm9ybWFsaXplcyBleGNoYW5nZS1yYXRlIG51bWJlcnMgZm9yIG51bWVyaWMgaW5wdXQgY29udHJvbHMuXHJcbmNvbnN0IGZvcm1hdEV4Y2hhbmdlUmF0ZUlucHV0VmFsdWUgPSAodmFsdWU6IG51bWJlcik6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcih2YWx1ZSwge1xyXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxyXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxyXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICBmYWxsYmFjazogXCJcIixcclxuICB9KTtcclxufTtcclxuXHJcbi8vIFJldXNlcyB0aGUgZml4ZWQgc2FtZS1jdXJyZW5jeSByYXRlIHNvIEVVUiBzaGVldHMgc3RheSBhbGlnbmVkIHdpdGggdGhlIDEwMCByZWZlcmVuY2UgYW1vdW50LlxyXG5jb25zdCBTQU1FX0NVUlJFTkNZX0VYQ0hBTkdFX1JBVEVfSU5QVVQgPSBmb3JtYXRFeGNoYW5nZVJhdGVJbnB1dFZhbHVlKEVYQ0hBTkdFX1JBVEVfUkVGRVJFTkNFX0FNT1VOVCk7XHJcblxyXG5jb25zdCBidWlsZENyZWF0ZUhlYWRlckRyYWZ0ID0gKCk6IEV4cGVuc2VTaGVldEhlYWRlciA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGhvamFHYXN0b3NJZDogXCJcIixcclxuICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxyXG4gICAgcHJvaklkOiBcIlwiLFxyXG4gICAgY3VycmVuY3lDb2RlOiBcIlwiLFxyXG4gICAgdG90YWxBbW91bnQ6IG51bGwsXHJcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IDAsXHJcbiAgICBleGNoYW5nZVJhdGVNb2RlOiAwLFxyXG4gICAgY3JlYXRlZERhdGU6IFwiXCIsXHJcbiAgICBleGNoUmF0ZTogU3RyaW5nKEVYQ0hBTkdFX1JBVEVfUkVGRVJFTkNFX0FNT1VOVCksXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IHNob3VsZFNob3dFeGNoYW5nZVJhdGUgPSAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBmYWxzZTtcclxuICBjb25zdCBwYXJzZWQgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQodmFsdWUpO1xyXG4gIGlmIChwYXJzZWQgPT09IG51bGwpIHJldHVybiB0cnVlO1xyXG4gIHJldHVybiBNYXRoLmFicyhwYXJzZWQpID4gMDtcclxufTtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGVBcmdzID0ge1xyXG4gIGhhc0FjY2VzczogYm9vbGVhbjtcclxuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xyXG4gIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGJvb2xlYW47XHJcbiAgY2FuTWFuYWdlT3RoZXJVc2VyczogYm9vbGVhbjtcclxuICBjdXJyZW50QXhVc2VySWQ6IHN0cmluZztcclxuICBjdXJyZW50Q3JtVXNlcklkOiBzdHJpbmc7XHJcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkOiBzdHJpbmc7XHJcbiAgc2hlZXRJZDogc3RyaW5nO1xyXG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcclxuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIE93bnMgc3RhdGUgYW5kIGJlaGF2aW9yIGZvciBleHBlbnNlIHNoZWV0IGRldGFpbCBwYWdlIChyZWFkLCBlZGl0LCBjcmVhdGUpLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUgPSAoe1xyXG4gIGhhc0FjY2VzcyxcclxuICBjYW5DcmVhdGVFeHBlbnNlLFxyXG4gIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICBjdXJyZW50QXhVc2VySWQsXHJcbiAgY3VycmVudENybVVzZXJJZCxcclxuICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgc2hlZXRJZCxcclxuICBpc0NyZWF0ZU1vZGUsXHJcbiAgb25Gb3JiaWRkZW4sXHJcbn06IFVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlQXJncykgPT4ge1xyXG4gIGNvbnN0IFtoZWFkZXIsIHNldEhlYWRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRIZWFkZXIgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbbGluZXMsIHNldExpbmVzXSA9IHVzZVN0YXRlPEV4cGVuc2VTaGVldExpbmVbXT4oW10pO1xyXG4gIGNvbnN0IFtsaW5lUGFnZSwgc2V0TGluZVBhZ2VdID0gdXNlU3RhdGUoMSk7XHJcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbaXNFZGl0aW5nLCBzZXRJc0VkaXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFttb2RhbEVycm9yLCBzZXRNb2RhbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdERlc2NyaXB0aW9uLCBzZXREcmFmdERlc2NyaXB0aW9uXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdFByb2plY3RJZCwgc2V0RHJhZnRQcm9qZWN0SWRdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0Q3VycmVuY3lDb2RlLCBzZXREcmFmdEN1cnJlbmN5Q29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRFeGNoYW5nZVJhdGUsIHNldERyYWZ0RXhjaGFuZ2VSYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdEVzdGFkb0NvbWVudGFyaW9zLCBzZXREcmFmdEVzdGFkb0NvbWVudGFyaW9zXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkZWZhdWx0Q3VycmVuY3lDb2RlLCBzZXREZWZhdWx0Q3VycmVuY3lDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtpc0V4Y2hhbmdlUmF0ZUxvYWRpbmcsIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2V4Y2hhbmdlUmF0ZU1lc3NhZ2UsIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2V4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yLCBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW29mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW29mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW29mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSwgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSwgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2VdID0gdXNlU3RhdGUoXCJcIik7XHJcblxyXG4gIGNvbnN0IGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIgPSB1c2VDYWxsYmFjaygobmV4dEhlYWRlcjogRXhwZW5zZVNoZWV0SGVhZGVyIHwgbnVsbCkgPT4ge1xyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbihzYWZlVGV4dChuZXh0SGVhZGVyPy5kZXNjcmlwdGlvbikpO1xyXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQoc2FmZVRleHQobmV4dEhlYWRlcj8ucHJvaklkKSk7XHJcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZShzYWZlVGV4dChuZXh0SGVhZGVyPy5jdXJyZW5jeUNvZGUpKTtcclxuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlKFxyXG4gICAgICBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIobmV4dEhlYWRlcj8uZXhjaFJhdGUsIHtcclxuICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IEVYQ0hBTkdFX1JBVEVfREVDSU1BTF9ESUdJVFMsXHJcbiAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxyXG4gICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gICAgICAgIGZhbGxiYWNrOiBcIlwiLFxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICAgIHNldERyYWZ0RXN0YWRvQ29tZW50YXJpb3Moc2FmZVRleHQobmV4dEhlYWRlcj8uZXN0YWRvQ29tZW50YXJpb3MpKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBsb2FkRGV0YWlsID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICBpZiAoIWhhc0FjY2Vzcykge1xyXG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgICAgaWYgKCFjYW5DcmVhdGVFeHBlbnNlKSB7XHJcbiAgICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZHJhZnRIZWFkZXIgPSBidWlsZENyZWF0ZUhlYWRlckRyYWZ0KCk7XHJcbiAgICAgICAgc2V0SGVhZGVyKGRyYWZ0SGVhZGVyKTtcclxuICAgICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICAgICAgc2V0TGluZVBhZ2UoMSk7XHJcbiAgICAgICAgc2V0SXNFZGl0aW5nKHRydWUpO1xyXG4gICAgICAgIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIoZHJhZnRIZWFkZXIpO1xyXG4gICAgICAgIHNldFN0YXR1cyhcIlwiKTtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXNoZWV0SWQpIHtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgc2V0TGluZXMoW10pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xyXG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwoc2hlZXRJZCwge1xyXG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZT8uTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0IGRldGFpbC5cIikpO1xyXG4gICAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICAgICAgc2V0TGluZXMoW10pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2hlZXRzID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICAgICAgICBjb25zdCBzZWxlY3RlZFNoZWV0ID1cclxuICAgICAgICAgIHNoZWV0cy5maW5kKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnk/LkhvamFHYXN0b3NJZCkudG9VcHBlckNhc2UoKSA9PT0gc2hlZXRJZC50cmltKCkudG9VcHBlckNhc2UoKSkgfHwgc2hlZXRzWzBdO1xyXG5cclxuICAgICAgICBpZiAoIXNlbGVjdGVkU2hlZXQpIHtcclxuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob3RGb3VuZFwiLCBcIkV4cGVuc2Ugc2hlZXQgd2FzIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICAgICAgc2V0TGluZXMoW10pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbmV4dEhlYWRlciA9IG1hcEV4cGVuc2VTaGVldEhlYWRlcihzZWxlY3RlZFNoZWV0KTtcclxuICAgICAgICBjb25zdCBuZXh0TGluZXMgPSAoQXJyYXkuaXNBcnJheShzZWxlY3RlZFNoZWV0LkxpbmVzKSA/IHNlbGVjdGVkU2hlZXQuTGluZXMgOiBbXSkubWFwKChlbnRyeSkgPT5cclxuICAgICAgICAgIG1hcEV4cGVuc2VTaGVldExpbmUoZW50cnkpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBzZXRIZWFkZXIobmV4dEhlYWRlcik7XHJcbiAgICAgICAgc2V0TGluZXMobmV4dExpbmVzKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVycm9yLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKFxyXG4gICAgICAgICAgZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0IGRldGFpbC5cIilcclxuICAgICAgICApO1xyXG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2b2lkIGxvYWREZXRhaWwoKTtcclxuICB9LCBbY2FuQ3JlYXRlRXhwZW5zZSwgaGFzQWNjZXNzLCBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyLCBpc0NyZWF0ZU1vZGUsIG9uRm9yYmlkZGVuLCBzaGVldElkXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWhlYWRlciB8fCBpc0VkaXRpbmcpIHJldHVybjtcclxuICAgIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIoaGVhZGVyKTtcclxuICB9LCBbaGVhZGVyLCBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyLCBpc0VkaXRpbmddKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaGFzQWNjZXNzKSByZXR1cm47XHJcbiAgICBsZXQgaXNDYW5jZWxsZWQgPSBmYWxzZTtcclxuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcblxyXG4gICAgY29uc3QgbG9hZERlZmF1bHRDdXJyZW5jeUNvZGUgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgY29kZSA9IGF3YWl0IGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUoe1xyXG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xyXG4gICAgICAgIHNldERlZmF1bHRDdXJyZW5jeUNvZGUoc2FmZVRleHQoY29kZSkudG9VcHBlckNhc2UoKSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdm9pZCBsb2FkRGVmYXVsdEN1cnJlbmN5Q29kZSgpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgaXNDYW5jZWxsZWQgPSB0cnVlO1xyXG4gICAgICBjb250cm9sbGVyLmFib3J0KCk7XHJcbiAgICB9O1xyXG4gIH0sIFtoYXNBY2Nlc3NdKTtcclxuXHJcbiAgY29uc3QgaGFzQWN0aXZlUHJvY2VzcyA9IHVzZU1lbW8oKCkgPT4gYnVzeSB8fCBpc0VkaXRpbmcsIFtidXN5LCBpc0VkaXRpbmddKTtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZChoYXNBY3RpdmVQcm9jZXNzKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCgpO1xyXG4gICAgfTtcclxuICB9LCBbaGFzQWN0aXZlUHJvY2Vzc10pO1xyXG5cclxuICBjb25zdCBwcm9qZWN0VmFsdWUgPSBzYWZlVGV4dChoZWFkZXI/LnByb2pJZCk7XHJcbiAgY29uc3Qgc3RhdHVzQ29kZSA9IHR5cGVvZiBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgOiBudWxsO1xyXG4gIGNvbnN0IGlzU2hlZXRBcHByb3ZlZCA9IHN0YXR1c0NvZGUgPT09IEVYUEVOU0VfU1RBVFVTX0FQUFJPVkVEO1xyXG4gIGNvbnN0IGlzU2hlZXRQYWlkQnlTdGF0dXMgPSBzdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19QQUlEO1xyXG4gIGNvbnN0IGlzU2hlZXRQYWlkQnlWb3VjaGVyID0gaGFzQXNzaWduZWRWb3VjaGVyKGhlYWRlcj8udm91Y2hlcik7XHJcbiAgY29uc3QgaXNTaGVldFBhaWQgPSBpc1NoZWV0UGFpZEJ5U3RhdHVzIHx8IGlzU2hlZXRQYWlkQnlWb3VjaGVyO1xyXG4gIGNvbnN0IGlzTWFuYWdpbmdPdGhlclVzZXIgPSBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkKHtcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgcmVjb3JkT3duZXJVc2VySWQ6IGhlYWRlcj8udXNlcklkLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gIH0pO1xyXG4gIGNvbnN0IGRldGFpbFBvbGljeSA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGludGVyYWN0aW9uTW9kZTogXCJmdWxsX2VkaXRcIiBhcyBjb25zdCxcclxuICAgICAgICBzaG93RmFiOiBmYWxzZSxcclxuICAgICAgICBjYW5EZWxldGVTaGVldDogZmFsc2UsXHJcbiAgICAgICAgc3RhdHVzQWN0aW9uczogW10sXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc29sdmVFeHBlbnNlU2hlZXREZXRhaWxQb2xpY3koe1xyXG4gICAgICBzdGF0dXNDb2RlLFxyXG4gICAgICBpc01hbmFnaW5nT3RoZXJVc2VyLFxyXG4gICAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgICBpc1BhaWQ6IGlzU2hlZXRQYWlkLFxyXG4gICAgfSk7XHJcbiAgfSwgW2FsbG93U2VsZk1hbmFnZW1lbnQsIGlzQ3JlYXRlTW9kZSwgaXNNYW5hZ2luZ090aGVyVXNlciwgaXNTaGVldFBhaWQsIHN0YXR1c0NvZGVdKTtcclxuICBjb25zdCBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCA9IGlzQ3JlYXRlTW9kZSB8fCAoIWlzTWFuYWdpbmdPdGhlclVzZXIgJiYgZGV0YWlsUG9saWN5LmludGVyYWN0aW9uTW9kZSA9PT0gXCJmdWxsX2VkaXRcIik7XHJcbiAgY29uc3QgY2FuRWRpdFN0YXR1c0NvbW1lbnRDdXJyZW50ID0gIWlzQ3JlYXRlTW9kZSAmJiBkZXRhaWxQb2xpY3kuaW50ZXJhY3Rpb25Nb2RlID09PSBcImNvbW1lbnRfb25seV9lZGl0XCI7XHJcbiAgY29uc3QgY2FuRWRpdEFueUN1cnJlbnQgPSAoaXNDcmVhdGVNb2RlICYmIGNhbkNyZWF0ZUV4cGVuc2UpIHx8IGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50IHx8IGNhbkVkaXRTdGF0dXNDb21tZW50Q3VycmVudDtcclxuICBjb25zdCBjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzID0gIWlzQ3JlYXRlTW9kZSAmJiBkZXRhaWxQb2xpY3kuaW50ZXJhY3Rpb25Nb2RlID09PSBcImZ1bGxfZWRpdFwiO1xyXG4gIGNvbnN0IGlzU2hlZXRMb2NrZWQgPSBpc1NoZWV0QXBwcm92ZWQgfHwgaXNTaGVldFBhaWQ7XHJcbiAgY29uc3QgaGFzTGluZXMgPSBsaW5lcy5sZW5ndGggPiAwO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZVZhbHVlID0gZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKHNhZmVUZXh0KGhlYWRlcj8uZXhjaFJhdGUpLCB7XHJcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IEVYQ0hBTkdFX1JBVEVfREVDSU1BTF9ESUdJVFMsXHJcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IEVYQ0hBTkdFX1JBVEVfREVDSU1BTF9ESUdJVFMsXHJcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgIGZhbGxiYWNrOiBcIlwiLFxyXG4gIH0pO1xyXG4gIGNvbnN0IHNob3dFeGNoYW5nZVJhdGUgPSB1c2VNZW1vKCgpID0+IHNob3VsZFNob3dFeGNoYW5nZVJhdGUoZXhjaGFuZ2VSYXRlVmFsdWUpLCBbZXhjaGFuZ2VSYXRlVmFsdWVdKTtcclxuICBjb25zdCBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSA9IHVzZU1lbW8oKCkgPT4gZHJhZnRDdXJyZW5jeUNvZGUudHJpbSgpLnRvVXBwZXJDYXNlKCksIFtkcmFmdEN1cnJlbmN5Q29kZV0pO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWREZWZhdWx0Q3VycmVuY3kgPSB1c2VNZW1vKCgpID0+IHNhZmVUZXh0KGRlZmF1bHRDdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCksIFtkZWZhdWx0Q3VycmVuY3lDb2RlXSk7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5ID0gbm9ybWFsaXplZERlZmF1bHRDdXJyZW5jeSB8fCBcIkVVUlwiO1xyXG4gIGNvbnN0IHVpTG9jYWxlID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gXCJlcy1FU1wiO1xyXG4gICAgcmV0dXJuIHNhZmVUZXh0KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudD8ubGFuZykgfHwgXCJlcy1FU1wiO1xyXG4gIH0sIFtdKTtcclxuICBjb25zdCBmb3JtRXhjaGFuZ2VEYXRlID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBwYXJzZWREYXRlID0gcGFyc2VFeHBlbnNlRGF0ZShzYWZlVGV4dChoZWFkZXI/LmNyZWF0ZWREYXRlKSk7XHJcbiAgICBpZiAocGFyc2VkRGF0ZSkgcmV0dXJuIHRvSXNvRGF0ZShwYXJzZWREYXRlKTtcclxuICAgIHJldHVybiB0b0lzb0RhdGUobmV3IERhdGUoKSk7XHJcbiAgfSwgW2hlYWRlcj8uY3JlYXRlZERhdGVdKTtcclxuICBjb25zdCBleGNoYW5nZVJhdGVSZXF1aXJlZCA9XHJcbiAgICBpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQgJiYgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgIT09IFwiXCIgJiYgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgIT09IGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeTtcclxuICBjb25zdCBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSA9XHJcbiAgICBleGNoYW5nZVJhdGVSZXF1aXJlZCAmJiAhZHJhZnRFeGNoYW5nZVJhdGUudHJpbSgpXHJcbiAgICAgID8gaW5kVChcclxuICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0V4Y2hhbmdlUmF0ZVJlcXVpcmVkXCIsXHJcbiAgICAgICAgICBcIkV4Y2hhbmdlIHJhdGUgaXMgcmVxdWlyZWQgd2hlbiBjdXJyZW5jeSBpcyBkaWZmZXJlbnQgZnJvbSBiYXNlIGN1cnJlbmN5LlwiXHJcbiAgICAgICAgKVxyXG4gICAgICA6IFwiXCI7XHJcbiAgLy8gQ3VycmVuY3kgdHlwZSBjYW4gYmUgZWRpdGVkIHdoZW5ldmVyIHRoZSBzaGVldCBpdHNlbGYgaXMgZWRpdGFibGUgKG5vdCBhcHByb3ZlZC9wYWlkKS5cclxuICBjb25zdCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyA9IGZhbHNlO1xyXG4gIGNvbnN0IGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyA9IGlzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCAmJiBoYXNMaW5lcyAmJiBzaG93RXhjaGFuZ2VSYXRlO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgbGV0IGlzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICBsZXQgcmVxdWVzdFRpbWVyOiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IG51bGwgPSBudWxsO1xyXG4gICAgbGV0IHJlcXVlc3RBYm9ydENvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlciB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0IGNsZWFyUmVxdWVzdEFydGlmYWN0cyA9ICgpID0+IHtcclxuICAgICAgaWYgKHJlcXVlc3RUaW1lcikge1xyXG4gICAgICAgIGNsZWFyVGltZW91dChyZXF1ZXN0VGltZXIpO1xyXG4gICAgICAgIHJlcXVlc3RUaW1lciA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlcXVlc3RBYm9ydENvbnRyb2xsZXIpIHtcclxuICAgICAgICByZXF1ZXN0QWJvcnRDb250cm9sbGVyLmFib3J0KCk7XHJcbiAgICAgICAgcmVxdWVzdEFib3J0Q29udHJvbGxlciA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgaWYgKCFpc0VkaXRpbmcgfHwgIWNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50IHx8IGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcykge1xyXG4gICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcoZmFsc2UpO1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFwiXCIpO1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XHJcbiAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFub3JtYWxpemVkRHJhZnRDdXJyZW5jeSB8fCAhZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5KSB7XHJcbiAgICAgIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXCJcIik7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICBjbGVhclJlcXVlc3RBcnRpZmFjdHMoKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgPT09IGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSkge1xyXG4gICAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZShTQU1FX0NVUlJFTkNZX0VYQ0hBTkdFX1JBVEVfSU5QVVQpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFNBTUVfQ1VSUkVOQ1lfRVhDSEFOR0VfUkFURV9JTlBVVCk7XHJcbiAgICAgIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXCJcIik7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICBjbGVhclJlcXVlc3RBcnRpZmFjdHMoKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXN0VGltZXIgPSBzZXRUaW1lb3V0KGFzeW5jICgpID0+IHtcclxuICAgICAgcmVxdWVzdEFib3J0Q29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcclxuICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKHRydWUpO1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFwiXCIpO1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZ2V0RXhjaGFuZ2VSYXRlKFxyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gICAgICAgICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXHJcbiAgICAgICAgICBmb3JtRXhjaGFuZ2VEYXRlLFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgc2lnbmFsOiByZXF1ZXN0QWJvcnRDb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzIHx8ICFyZXNwb25zZS5EYXRhIHx8ICFOdW1iZXIuaXNGaW5pdGUoTnVtYmVyKHJlc3BvbnNlLkRhdGEuUmF0ZSkpKSB7XHJcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xyXG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xyXG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XHJcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFxyXG4gICAgICAgICAgICBzYWZlVGV4dChyZXNwb25zZS5NZXNzYWdlKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUaGUgZW5kcG9pbnQgcmV0dXJucyBvbmUgYmFzZS1jdXJyZW5jeSB1bml0IGluIHRoZSBleHBlbnNlIGN1cnJlbmN5LlxyXG4gICAgICAgIC8vIFRoZSBVSSBzdG9yZXMgdGhlIGFtb3VudCBmb3IgdGhlIGZpeGVkIGxvY2FsIHJlZmVyZW5jZSBhbW91bnQgKDEwMCkuXHJcbiAgICAgICAgY29uc3Qgb2ZmaWNpYWxSYXRlUGVyQmFzZVVuaXQgPSBOdW1iZXIocmVzcG9uc2UuRGF0YS5SYXRlKTtcclxuICAgICAgICBjb25zdCBvZmZpY2lhbFJhdGVGb3JSZWZlcmVuY2VBbW91bnQgPSBvZmZpY2lhbFJhdGVQZXJCYXNlVW5pdCAqIEVYQ0hBTkdFX1JBVEVfUkVGRVJFTkNFX0FNT1VOVDtcclxuICAgICAgICBjb25zdCBuZXh0RXhjaGFuZ2VSYXRlVmFsdWUgPSBmb3JtYXRFeGNoYW5nZVJhdGVJbnB1dFZhbHVlKG9mZmljaWFsUmF0ZUZvclJlZmVyZW5jZUFtb3VudCk7XHJcbiAgICAgICAgY29uc3Qgb2ZmaWNpYWxSYXRlUmF3VmFsdWUgPSBmb3JtYXRFeGNoYW5nZVJhdGVJbnB1dFZhbHVlKG9mZmljaWFsUmF0ZVBlckJhc2VVbml0KTtcclxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKG5leHRFeGNoYW5nZVJhdGVWYWx1ZSk7XHJcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShvZmZpY2lhbFJhdGVSYXdWYWx1ZSk7XHJcbiAgICAgICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUobmV4dEV4Y2hhbmdlUmF0ZVZhbHVlKTtcclxuXHJcbiAgICAgICAgY29uc3QgZWZmZWN0aXZlUmF0ZURhdGUgPSBzYWZlVGV4dChyZXNwb25zZS5EYXRhLkRhdGUpIHx8IGZvcm1FeGNoYW5nZURhdGU7XHJcbiAgICAgICAgY29uc3Qgc291cmNlID0gc2FmZVRleHQocmVzcG9uc2UuRGF0YS5Tb3VyY2UpO1xyXG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShlZmZlY3RpdmVSYXRlRGF0ZSk7XHJcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2Uoc291cmNlKTtcclxuICAgICAgICBjb25zdCBvZmZpY2lhbExhYmVsID0gZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCgwKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9PZmZpY2lhbFwiLCBcIlQuQy4gT2ZpY2lhbFwiKTtcclxuICAgICAgICBjb25zdCBsb2NhbGl6ZWRSYXRlRGF0ZSA9IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShlZmZlY3RpdmVSYXRlRGF0ZSwgdWlMb2NhbGUpIHx8IGVmZmVjdGl2ZVJhdGVEYXRlO1xyXG4gICAgICAgIGNvbnN0IGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlID0gc291cmNlID8gYCR7b2ZmaWNpYWxMYWJlbH0gJHtsb2NhbGl6ZWRSYXRlRGF0ZX0gKCR7c291cmNlfSlgIDogYCR7b2ZmaWNpYWxMYWJlbH0gJHtsb2NhbGl6ZWRSYXRlRGF0ZX1gO1xyXG4gICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2Uob2ZmaWNpYWxSYXRlUmF3VmFsdWUgPyBgJHtleGNoYW5nZVJhdGVJbmZvTWVzc2FnZX0gLSAke29mZmljaWFsUmF0ZVJhd1ZhbHVlfWAgOiBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZSk7XHJcbiAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSBcIkFib3J0RXJyb3JcIikgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSB7XHJcbiAgICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDQpIHtcclxuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcclxuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuICAgICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfTm90Rm91bmRcIiwgXCJObyBoYXkgdGlwbyBkZSBjYW1iaW8gcGFyYSBsYSBmZWNoYVwiKSk7XHJcbiAgICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDIyIHx8IGVycm9yLnN0YXR1cyA9PT0gNTAwKSB7XHJcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XHJcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XHJcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcclxuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XHJcbiAgICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXHJcbiAgICAgICAgICAgICAgc2FmZVRleHQoZXJyb3IubWVzc2FnZSkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX1VuYXZhaWxhYmxlXCIsIFwiTm8gc2UgcHVkbyBvYnRlbmVyIGVsIHRpcG8gZGUgY2FtYmlvLlwiKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XHJcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xyXG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xyXG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XHJcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFxyXG4gICAgICAgICAgICBzYWZlVGV4dChlcnJvci5tZXNzYWdlKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xyXG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XHJcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xyXG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xyXG4gICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX1VuYXZhaWxhYmxlXCIsIFwiTm8gc2UgcHVkbyBvYnRlbmVyIGVsIHRpcG8gZGUgY2FtYmlvLlwiKSk7XHJcbiAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XHJcbiAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgaWYgKCFpc0NhbmNlbGxlZCkge1xyXG4gICAgICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sIEVYQ0hBTkdFX1JBVEVfREVCT1VOQ0VfTVMpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlzQ2FuY2VsbGVkID0gdHJ1ZTtcclxuICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XHJcbiAgICB9O1xyXG4gIH0sIFtcclxuICAgIGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50LFxyXG4gICAgZm9ybUV4Y2hhbmdlRGF0ZSxcclxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcclxuICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxyXG4gICAgdWlMb2NhbGUsXHJcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICBdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRW5hYmxlRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChpc0NyZWF0ZU1vZGUgfHwgaXNMb2FkaW5nIHx8ICFoZWFkZXIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghY2FuRWRpdEFueUN1cnJlbnQpIHtcclxuICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XHJcbiAgICBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyKGhlYWRlcik7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0VkaXRpbmdFbmFibGVkXCIsIFwiRWRpdGluZyBlbmFibGVkXCIpKTtcclxuICB9LCBbY2FuRWRpdEFueUN1cnJlbnQsIGhlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNDcmVhdGVNb2RlLCBpc0xvYWRpbmcsIG9uRm9yYmlkZGVuXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNhbmNlbEVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXRzXCIsIHtcclxuICAgICAgICBhc2tDb25maXJtYXRpb246IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc0VkaXRpbmcpIHJldHVybjtcclxuXHJcbiAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIoaGVhZGVyKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKSk7XHJcbiAgfSwgW2hlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmddKTtcclxuXHJcbiAgLy8gT3BlbnMgZXhwZW5zZSBzaGVldCBjcmVhdGUgbW9kZSBmcm9tIGxpc3QtbGV2ZWwgZW50cnkgcG9pbnRzLlxyXG4gIGNvbnN0IGhhbmRsZU9wZW5DcmVhdGVTaGVldE1vZGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWNhbkNyZWF0ZUV4cGVuc2UpIHtcclxuICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/bW9kZT1jcmVhdGVcIiwge1xyXG4gICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcclxuICAgIH0pO1xyXG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgb25Gb3JiaWRkZW5dKTtcclxuXHJcbiAgLy8gT3BlbnMgZXhwZW5zZSBsaW5lIGNyZWF0ZSBtb2RlIGZyb20gYW4gZXhpc3RpbmcgZXhwZW5zZSBzaGVldCBkZXRhaWwuXHJcbiAgY29uc3QgaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFzaGVldElkIHx8ICFjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzKSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXRMaW5lRGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzaGVldElkKX0mbW9kZT1jcmVhdGVgO1xyXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwodGFyZ2V0VXJsLCB7XHJcbiAgICAgIGFza0NvbmZpcm1hdGlvbjogaXNFZGl0aW5nLFxyXG4gICAgfSk7XHJcbiAgfSwgW2NhblVzZUZ1bGxFZGl0RmVhdHVyZXMsIGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nLCBvbkZvcmJpZGRlbiwgc2hlZXRJZF0pO1xyXG5cclxuICAvLyBPcGVucyB0aWNrZXRzIHBhZ2UgZnJvbSBleHBlbnNlIHNoZWV0IGNvbnRleHQgdG8gY3JlYXRlIG9yIGxpbmsgdGlja2V0cy5cclxuICBjb25zdCBvcGVuVGlja2V0c0Zyb21TaGVldCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGFjdGlvbjogXCJuZXdcIiB8IFwibGlua1wiKSA9PiB7XHJcbiAgICAgIGlmICghc2hlZXRJZCB8fCAhY2FuVXNlRnVsbEVkaXRGZWF0dXJlcykge1xyXG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xyXG4gICAgICAgIGFjdGlvbixcclxuICAgICAgICBob2phR2FzdG9zSWQ6IHNoZWV0SWQsXHJcbiAgICAgIH0pO1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXRzPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XHJcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgb25Gb3JiaWRkZW4sIHNoZWV0SWRdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlT3BlbkNyZWF0ZVRpY2tldE1vZGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBvcGVuVGlja2V0c0Zyb21TaGVldChcIm5ld1wiKTtcclxuICB9LCBbb3BlblRpY2tldHNGcm9tU2hlZXRdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlT3BlbkxpbmtUaWNrZXRNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgb3BlblRpY2tldHNGcm9tU2hlZXQoXCJsaW5rXCIpO1xyXG4gIH0sIFtvcGVuVGlja2V0c0Zyb21TaGVldF0pO1xyXG5cclxuICBjb25zdCBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0ID0gdXNlQ2FsbGJhY2soKGNyZWF0ZWRTaGVldElkOiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnN0IHNhZmVDcmVhdGVkU2hlZXRJZCA9IHNhZmVUZXh0KGNyZWF0ZWRTaGVldElkKTtcclxuICAgIGlmICghc2FmZUNyZWF0ZWRTaGVldElkKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlQ3JlYXRlZFNoZWV0SWQpfWA7XHJcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgbmF2aWdhdGVUb0xpbmVEZXRhaWwgPSB1c2VDYWxsYmFjayhcclxuICAgIChcclxuICAgICAgbGluZVJlY0lkOiBzdHJpbmcsXHJcbiAgICAgIG9wdGlvbnM/OiB7XHJcbiAgICAgICAgbW9kZT86IFwidmlld1wiIHwgXCJlZGl0XCI7XHJcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uPzogYm9vbGVhbjtcclxuICAgICAgICBieXBhc3NHdWFyZE9uY2U/OiBib29sZWFuO1xyXG4gICAgICB9XHJcbiAgICApID0+IHtcclxuICAgICAgY29uc3Qgc2FmZUxpbmVJZCA9IHNhZmVUZXh0KGxpbmVSZWNJZCk7XHJcbiAgICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQoc2hlZXRJZCk7XHJcbiAgICAgIGlmICghc2FmZUxpbmVJZCB8fCAhc2FmZVNoZWV0SWQpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IHNhZmVNb2RlID0gb3B0aW9ucz8ubW9kZSA9PT0gXCJlZGl0XCIgPyBcImVkaXRcIiA6IFwiXCI7XHJcbiAgICAgIGNvbnN0IHRhcmdldFVybCA9IGAvR2FzdG9zL0V4cGVuc2VTaGVldExpbmVEZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVTaGVldElkKX0mbGluZVJlY0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVMaW5lSWQpfSR7c2FmZU1vZGUgPyBgJm1vZGU9JHtzYWZlTW9kZX1gIDogXCJcIn1gO1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwsIHtcclxuICAgICAgICBhc2tDb25maXJtYXRpb246IG9wdGlvbnM/LmFza0NvbmZpcm1hdGlvbiA/PyB0cnVlLFxyXG4gICAgICAgIGJ5cGFzc0d1YXJkT25jZTogb3B0aW9ucz8uYnlwYXNzR3VhcmRPbmNlID8/IGZhbHNlLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbc2hlZXRJZF1cclxuICApO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGVhZGVyLFxyXG4gICAgbGluZXMsXHJcbiAgICBsaW5lUGFnZSxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGJ1c3ksXHJcbiAgICBzdGF0dXMsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBtb2RhbEVycm9yLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRyYWZ0UHJvamVjdElkLFxyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlLFxyXG4gICAgaXNFeGNoYW5nZVJhdGVMb2FkaW5nLFxyXG4gICAgZXhjaGFuZ2VSYXRlTWVzc2FnZSxcclxuICAgIGV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yLFxyXG4gICAgcHJvamVjdFZhbHVlLFxyXG4gICAgaXNTaGVldEFwcHJvdmVkLFxyXG4gICAgaXNTaGVldFBhaWQsXHJcbiAgICBpc1NoZWV0TG9ja2VkLFxyXG4gICAgZXhjaGFuZ2VSYXRlVmFsdWUsXHJcbiAgICBzaG93RXhjaGFuZ2VSYXRlLFxyXG4gICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXHJcbiAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXHJcbiAgICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQ6IEVYQ0hBTkdFX1JBVEVfUkVGRVJFTkNFX0FNT1VOVCxcclxuICAgIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlLFxyXG4gICAgZGV0YWlsUG9saWN5LFxyXG4gICAgaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgIGNhbkVkaXRTdGF0dXNDb21tZW50Q3VycmVudCxcclxuICAgIGNhbkVkaXRBbnlDdXJyZW50LFxyXG4gICAgY2FuVXNlRnVsbEVkaXRGZWF0dXJlcyxcclxuICAgIGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50LFxyXG4gICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXHJcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXHJcbiAgICBzZXRMaW5lUGFnZSxcclxuICAgIHNldExpbmVzLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXHJcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgaGFuZGxlT3BlbkNyZWF0ZVNoZWV0TW9kZSxcclxuICAgIGhhbmRsZU9wZW5DcmVhdGVMaW5lTW9kZSxcclxuICAgIGhhbmRsZU9wZW5DcmVhdGVUaWNrZXRNb2RlLFxyXG4gICAgaGFuZGxlT3BlbkxpbmtUaWNrZXRNb2RlLFxyXG4gICAgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldCxcclxuICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsLFxyXG4gIH07XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBa0I7OztBQ0FsQixJQUFBQyxnQkFBa0I7OztBQ0FsQixtQkFBaUY7QUFDakYsdUJBQTZCO0FBeUdyQjtBQTdGUixJQUFNLHdCQUF3QixDQUFDO0FBQUEsRUFDN0I7QUFBQSxFQUNBO0FBQUEsRUFDQSxZQUFZO0FBQUEsRUFDWixpQkFBaUI7QUFDbkIsTUFBa0M7QUFDaEMsUUFBTSxnQ0FBZ0M7QUFDdEMsUUFBTSw4QkFBOEI7QUFDcEMsUUFBTSx1QkFBdUI7QUFDN0IsUUFBTSxnQkFBZ0I7QUFDdEIsUUFBTSxDQUFDLFFBQVEsU0FBUyxRQUFJLHVCQUFTLEtBQUs7QUFDMUMsUUFBTSxDQUFDLFlBQVksYUFBYSxRQUFJLHVCQUE4QjtBQUFBLElBQ2hFLFVBQVU7QUFBQSxJQUNWLEtBQUs7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxFQUNkLENBQUM7QUFDRCxRQUFNLGdCQUFZLHFCQUFpQyxJQUFJO0FBQ3ZELFFBQU0sZUFBVyxxQkFBOEIsSUFBSTtBQUVuRCxrQkFBZ0IsQ0FBQyxXQUFXLFFBQVEsR0FBRyxNQUFNLFVBQVUsS0FBSyxDQUFDO0FBQzdELFFBQU0sMEJBQXNCLDBCQUFZLE1BQU07QUFDNUMsUUFBSSxPQUFPLFdBQVcsYUFBYTtBQUNqQztBQUFBLElBQ0Y7QUFFQSxVQUFNLGdCQUFnQixVQUFVO0FBQ2hDLFVBQU0sZUFBZSxTQUFTO0FBQzlCLFFBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjO0FBQ25DO0FBQUEsSUFDRjtBQUVBLFVBQU0sYUFBYSxjQUFjLHNCQUFzQjtBQUN2RCxVQUFNLFlBQVksYUFBYSxzQkFBc0I7QUFDckQsVUFBTSxnQkFBZ0IsT0FBTztBQUM3QixVQUFNLGlCQUFpQixPQUFPO0FBQzlCLFVBQU0sWUFBWSxLQUFLLElBQUksVUFBVSxPQUFPLEtBQUssSUFBSSxLQUFLLGdCQUFnQixnQ0FBZ0MsQ0FBQyxDQUFDO0FBRTVHLFFBQUksT0FBTyxXQUFXLE9BQU8sV0FBVyxRQUFRLElBQUksWUFBWTtBQUNoRSxXQUFPLEtBQUssSUFBSSwrQkFBK0IsS0FBSyxJQUFJLE1BQU0sZ0JBQWdCLFlBQVksNkJBQTZCLENBQUM7QUFFeEgsUUFBSSxNQUFNLFdBQVcsU0FBUztBQUM5QixVQUFNLG9CQUFvQixNQUFNLFVBQVUsU0FBUyw4QkFBOEI7QUFDakYsUUFBSSxtQkFBbUI7QUFDckIsWUFBTSxrQkFBa0IsV0FBVyxNQUFNLFVBQVUsU0FBUztBQUM1RCxZQUFNLG1CQUFtQiw4QkFDckIsa0JBQ0EsS0FBSyxJQUFJLDZCQUE2QixpQkFBaUIsVUFBVSxTQUFTLDJCQUEyQjtBQUFBLElBQzNHO0FBRUEsa0JBQWM7QUFBQSxNQUNaLFVBQVU7QUFBQSxNQUNWLEtBQUssS0FBSyxNQUFNLEdBQUc7QUFBQSxNQUNuQixNQUFNLEtBQUssTUFBTSxJQUFJO0FBQUEsTUFDckIsT0FBTyxLQUFLLE1BQU0sU0FBUztBQUFBLE1BQzNCLFlBQVk7QUFBQSxJQUNkLENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxDQUFDO0FBRUwsb0NBQWdCLE1BQU07QUFDcEIsUUFBSSxDQUFDLFFBQVE7QUFDWDtBQUFBLElBQ0Y7QUFDQSx3QkFBb0I7QUFBQSxFQUN0QixHQUFHLENBQUMsUUFBUSxTQUFTLG1CQUFtQixDQUFDO0FBRXpDLDhCQUFVLE1BQU07QUFDZCxRQUFJLENBQUMsUUFBUTtBQUNYO0FBQUEsSUFDRjtBQUNBLFVBQU0sdUJBQXVCLE1BQU0sb0JBQW9CO0FBQ3ZELFdBQU8saUJBQWlCLFVBQVUsb0JBQW9CO0FBQ3RELFdBQU8saUJBQWlCLFVBQVUsc0JBQXNCLElBQUk7QUFDNUQsV0FBTyxNQUFNO0FBQ1gsYUFBTyxvQkFBb0IsVUFBVSxvQkFBb0I7QUFDekQsYUFBTyxvQkFBb0IsVUFBVSxzQkFBc0IsSUFBSTtBQUFBLElBQ2pFO0FBQUEsRUFDRixHQUFHLENBQUMsUUFBUSxtQkFBbUIsQ0FBQztBQUVoQyxRQUFNLGVBQWUsT0FBTyxhQUFhLGNBQWMsT0FBTyxTQUFTO0FBRXZFLFNBQ0UsNkNBQUMsU0FBSSxXQUFXLFdBQVcsZUFBZSxTQUFTLEdBQ2pEO0FBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLEtBQUs7QUFBQSxRQUNMLE1BQUs7QUFBQSxRQUNMLGNBQVk7QUFBQSxRQUNaLGlCQUFlO0FBQUEsUUFDZixpQkFBYztBQUFBLFFBQ2QsV0FBVTtBQUFBLFFBQ1YsT0FBTyxFQUFFLGNBQWMsY0FBYztBQUFBLFFBQ3JDLFNBQVMsTUFBTSxVQUFVLENBQUMsYUFBYSxDQUFDLFFBQVE7QUFBQSxRQUVoRDtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsT0FBTTtBQUFBLFlBQ04sT0FBTTtBQUFBLFlBQ04sUUFBTztBQUFBLFlBQ1AsU0FBUTtBQUFBLFlBQ1IsTUFBSztBQUFBLFlBQ0wsUUFBTztBQUFBLFlBQ1AsYUFBWTtBQUFBLFlBQ1osZUFBYztBQUFBLFlBQ2QsZ0JBQWU7QUFBQSxZQUNmLGVBQVk7QUFBQSxZQUNaLFdBQVU7QUFBQSxZQUVWO0FBQUEsMERBQUMsVUFBSyxHQUFFLEtBQUksR0FBRSxLQUFJLE9BQU0sTUFBSyxRQUFPLE1BQUssSUFBRyxLQUFJLElBQUcsS0FBSTtBQUFBLGNBQ3ZELDRDQUFDLFVBQUssR0FBRSxhQUFZO0FBQUEsY0FDcEIsNENBQUMsVUFBSyxHQUFFLGdCQUFlO0FBQUE7QUFBQTtBQUFBLFFBQ3pCO0FBQUE7QUFBQSxJQUNGO0FBQUEsSUFFQyxVQUFVLG1CQUNQO0FBQUEsTUFDRTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsS0FBSztBQUFBLFVBQ0wsTUFBSztBQUFBLFVBQ0wsT0FBTyxFQUFFLEdBQUcsWUFBWSxjQUFjLGNBQWM7QUFBQSxVQUNwRCxXQUFXO0FBQUEsWUFDVDtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsVUFFQSxzREFBQyxPQUFFLFdBQVUsa0RBQWtELG1CQUFRO0FBQUE7QUFBQSxNQUN6RTtBQUFBLE1BQ0E7QUFBQSxJQUNGLElBQ0E7QUFBQSxLQUNOO0FBRUo7QUFFQSxJQUFPLGdDQUFROzs7QUQxRkQsSUFBQUMsc0JBQUE7QUF4QmQsSUFBTSxvQ0FBb0MsQ0FBQztBQUFBLEVBQ3pDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQThDO0FBQzVDLFFBQU0sdUJBQXVCLGNBQUFDLFFBQU07QUFBQSxJQUNqQyxNQUFNO0FBQUEsTUFDSjtBQUFBLFFBQ0UsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sTUFBTSw2Q0FBQyxtQ0FBd0IsY0FBYyxrQkFBa0IsZUFBYyxXQUFVO0FBQUEsTUFDekY7QUFBQSxJQUNGO0FBQUEsSUFDQSxDQUFDLGdCQUFnQjtBQUFBLEVBQ25CO0FBQ0EsUUFBTSx3QkFBd0IsY0FBQUEsUUFBTTtBQUFBLElBQ2xDLE1BQU07QUFBQSxNQUNKO0FBQUEsUUFDRSxPQUFPLHNCQUFzQjtBQUFBLFFBQzdCLE1BQU0sc0JBQXNCO0FBQUEsUUFDNUIsTUFBTSw2Q0FBQyxtQ0FBd0IsY0FBYyxzQkFBc0IsS0FBSyxlQUFjLFdBQVU7QUFBQSxNQUNsRztBQUFBLElBQ0Y7QUFBQSxJQUNBLENBQUMsa0JBQWtCO0FBQUEsRUFDckI7QUFFQSxNQUFJLGFBQWEscUJBQXFCO0FBQ3BDLFdBQ0UsOENBQUMsU0FBSSxXQUFVLDJCQUNiO0FBQUEsbURBQUMsU0FBSSxXQUFXLGNBQWMsb0JBQW9CLGdCQUFnQixhQUFhLEdBQUcsS0FBSyxHQUNwRiw4QkFDQyw4RUFDRTtBQUFBLHNEQUFDLFNBQUksV0FBVSxlQUNiO0FBQUEsdURBQUMsV0FBTSxXQUFVLDRCQUE0QixnQ0FBcUI7QUFBQSxVQUNsRTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsT0FBTztBQUFBLGNBQ1AsYUFBYSxLQUFLLDZDQUE2QyxlQUFlO0FBQUEsY0FDOUUsT0FBTztBQUFBLGNBQ1AsVUFBVTtBQUFBLGNBQ1YsVUFBVSxDQUFDLGFBQWE7QUFBQSxjQUN4QixVQUFVLENBQUMsYUFBYTtBQUFBLGNBQ3hCLFdBQVc7QUFBQSxjQUNYLFFBQU87QUFBQSxjQUNQLGtDQUFnQztBQUFBO0FBQUEsVUFDbEM7QUFBQSxXQUNGO0FBQUEsUUFDQSw4Q0FBQyxTQUFJLFdBQVUsd0JBQ2I7QUFBQSx1REFBQyxXQUFNLFdBQVUsaUNBQWlDLGVBQUssb0NBQW9DLGVBQWUsR0FBRTtBQUFBLFVBQzVHO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxXQUFXLEtBQUssK0NBQStDLGdDQUFnQztBQUFBLGNBQy9GLFNBQVM7QUFBQSxjQUNULFdBQVU7QUFBQTtBQUFBLFVBQ1o7QUFBQSxVQUNBLDZDQUFDLFNBQ0M7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFdBQVcsZ0JBQWdCLGdDQUFnQyxxQ0FBcUMsRUFBRSxJQUFJLDhCQUE4Qix1QkFBdUIsRUFBRTtBQUFBLGNBQzdKLE1BQUs7QUFBQSxjQUNMLFdBQVU7QUFBQSxjQUNWLE9BQU87QUFBQSxjQUNQLFVBQVUsQ0FBQyxVQUFVLDBCQUEwQixNQUFNLE9BQU8sU0FBUyxFQUFFO0FBQUEsY0FDdkUsUUFBUSxDQUFDLFVBQ1A7QUFBQSxnQkFDRSx5QkFBeUIsTUFBTSxPQUFPLE9BQU87QUFBQSxrQkFDM0MsdUJBQXVCO0FBQUEsa0JBQ3ZCLHVCQUF1QjtBQUFBLGtCQUN2QixhQUFhO0FBQUEsa0JBQ2IsVUFBVTtBQUFBLGdCQUNaLENBQUM7QUFBQSxjQUNIO0FBQUEsY0FFRixjQUFZLEtBQUssb0NBQW9DLGVBQWU7QUFBQSxjQUNwRSxhQUFhLEtBQUssb0NBQW9DLGVBQWU7QUFBQSxjQUNyRSxVQUFVO0FBQUEsY0FDVixVQUFVO0FBQUE7QUFBQSxVQUNaLEdBQ0Y7QUFBQSxXQUNGO0FBQUEsU0FDRixJQUVBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxPQUFPO0FBQUEsVUFDUCxhQUFhLEtBQUssNkNBQTZDLGVBQWU7QUFBQSxVQUM5RSxPQUFPO0FBQUEsVUFDUCxVQUFVO0FBQUEsVUFDVixVQUFVLENBQUMsYUFBYTtBQUFBLFVBQ3hCLFVBQVUsQ0FBQyxhQUFhO0FBQUEsVUFDeEIsUUFBTztBQUFBLFVBQ1Asa0NBQWdDO0FBQUE7QUFBQSxNQUNsQyxHQUVKO0FBQUEsTUFFQyxvQkFDQyw4Q0FBQyxTQUFJLFdBQVUsMEJBQ2I7QUFBQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsT0FBTyxLQUFLLHFDQUFxQyxnQkFBZ0I7QUFBQSxZQUNqRSxTQUFTO0FBQUEsWUFDVCxPQUFPO0FBQUEsWUFDUCxVQUFVLE1BQU07QUFBQSxZQUNoQixhQUFhLEtBQUssNkNBQTZDLGVBQWU7QUFBQSxZQUM5RSxVQUFRO0FBQUEsWUFDUixVQUFRO0FBQUEsWUFDUixnQkFBZ0I7QUFBQSxZQUNoQixrQkFBa0I7QUFBQSxZQUNsQixXQUFTO0FBQUEsWUFDVCxXQUFXO0FBQUEsWUFDWCxrQkFBaUI7QUFBQSxZQUNqQix3QkFBdUI7QUFBQSxZQUN2Qix1QkFBc0I7QUFBQSxZQUN0QixxQkFBb0I7QUFBQSxZQUNwQiwrQkFBOEI7QUFBQSxZQUM5QixRQUFPO0FBQUEsWUFDUCxpQkFBZ0I7QUFBQSxZQUNoQixnQkFBZTtBQUFBO0FBQUEsUUFDakI7QUFBQSxRQUNBLDhDQUFDLFNBQUksV0FBVSxlQUNiO0FBQUEsdURBQUMsV0FBTSxXQUFVLDRCQUE0QixlQUFLLDhCQUE4QixRQUFRLEdBQUU7QUFBQSxVQUMxRjtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsV0FBVTtBQUFBLGNBQ1YsT0FBTyxvQkFBb0IsNkJBQTZCO0FBQUEsZ0JBQ3RELHVCQUF1QjtBQUFBLGdCQUN2Qix1QkFBdUI7QUFBQSxnQkFDdkIsYUFBYTtBQUFBLGdCQUNiLFVBQVU7QUFBQSxjQUNaLENBQUM7QUFBQSxjQUNELGNBQVksS0FBSyw4QkFBOEIsUUFBUTtBQUFBLGNBQ3ZELFVBQVE7QUFBQSxjQUNSLFVBQVE7QUFBQTtBQUFBLFVBQ1Y7QUFBQSxXQUNGO0FBQUEsU0FDRixJQUNFO0FBQUEsTUFFSCxxQkFBcUIsZ0NBQWdDLDZDQUFDLE9BQUUsV0FBVSx1QkFBdUIseUNBQThCLElBQU87QUFBQSxPQUNqSTtBQUFBLEVBRUo7QUFFQSxTQUNFLDhFQUNFO0FBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE9BQU8sS0FBSyxnQ0FBZ0MsVUFBVTtBQUFBLFFBQ3RELFNBQVM7QUFBQSxRQUNULE9BQU8sc0JBQXNCO0FBQUEsUUFDN0IsVUFBVSxNQUFNO0FBQUEsUUFDaEIsYUFBYSxLQUFLLDZDQUE2QyxlQUFlO0FBQUEsUUFDOUUsVUFBUTtBQUFBLFFBQ1IsVUFBUTtBQUFBLFFBQ1IsZ0JBQWdCO0FBQUEsUUFDaEIsa0JBQWtCO0FBQUEsUUFDbEIsV0FBUztBQUFBLFFBQ1QsV0FBVztBQUFBLFFBQ1gsa0JBQWlCO0FBQUEsUUFDakIsd0JBQXVCO0FBQUEsUUFDdkIsdUJBQXNCO0FBQUEsUUFDdEIscUJBQW9CO0FBQUEsUUFDcEIsK0JBQThCO0FBQUEsUUFDOUIsUUFBTztBQUFBLFFBQ1AsaUJBQWdCO0FBQUEsUUFDaEIsZ0JBQWU7QUFBQTtBQUFBLElBQ2pCO0FBQUEsSUFDQyxDQUFDLGFBQWEsbUJBQ2IsNkNBQUMsZ0NBQXFCLE9BQU8sS0FBSyxvQ0FBb0MsZUFBZSxHQUFHLE9BQU8sbUJBQW1CLElBQ2hIO0FBQUEsS0FDTjtBQUVKO0FBRUEsSUFBTyw0Q0FBUTs7O0FFNU1mLElBQU0sMEJBQXVGO0FBQUEsRUFDM0YsR0FBRztBQUFBLElBQ0QsVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBLEVBQ1o7QUFBQSxFQUNBLEdBQUc7QUFBQSxJQUNELFVBQVU7QUFBQSxJQUNWLFVBQVU7QUFBQSxFQUNaO0FBQ0Y7QUFJTyxJQUFNLG1DQUFtQyxDQUFDLFVBQXVEO0FBQ3RHLFFBQU0sU0FBUyxPQUFPLEtBQUs7QUFDM0IsTUFBSSxXQUFXLEtBQUssV0FBVyxHQUFHO0FBQ2hDLFdBQU87QUFBQSxFQUNUO0FBQ0EsU0FBTztBQUNUO0FBZU8sSUFBTSxrQ0FBa0MsQ0FBQyxVQUEyQjtBQUN6RSxRQUFNLGFBQWEsaUNBQWlDLEtBQUs7QUFDekQsTUFBSSxlQUFlLEtBQU0sUUFBTztBQUNoQyxRQUFNLE9BQU8sd0JBQXdCLFVBQVU7QUFDL0MsU0FBTyxLQUFLLEtBQUssVUFBVSxLQUFLLFFBQVE7QUFDMUM7OztBQzJGVSxJQUFBQyxzQkFBQTtBQW5HVixJQUFNLG9DQUFvQztBQUcxQyxJQUFNLHlCQUF5QixDQUFDO0FBQUEsRUFDOUI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBbUM7QUFDakMsUUFBTSxvQkFDSixhQUFhLHVCQUF1Qiw0QkFBNEIsTUFBTSw0QkFBNEI7QUFDcEcsUUFBTSx1QkFBdUIsb0JBQ3pCLEtBQUssdUNBQXVDLGtCQUFrQixJQUM5RCxLQUFLLGdDQUFnQyxVQUFVO0FBQ25ELFFBQU0sY0FDSixPQUFPLHVCQUF1QixRQUFRLE9BQU8sdUJBQXVCLFNBQ2hFLE1BQ0Esc0JBQXNCLE9BQU8sa0JBQWtCO0FBQ3JELFFBQU0scUJBQXFCLFNBQVMsT0FBTyxZQUFZLEVBQUUsWUFBWTtBQUNyRSxRQUFNLG1CQUFtQixTQUFTLHdCQUF3QixFQUFFLFlBQVk7QUFFeEUsUUFBTSxxQkFBcUIsU0FBUyxPQUFPLGlCQUFpQjtBQUM1RCxRQUFNLHlCQUF5QixDQUFDLGdCQUFnQixzQkFBc0I7QUFDdEUsUUFBTSwwQkFBMEIseUJBQXlCLGlCQUFpQjtBQUMxRSxRQUFNLHdCQUF3Qix5QkFBeUIsNEJBQTRCO0FBQ25GLFFBQU0sd0JBQ0osMkJBQTJCLE9BQ3ZCLDBCQUNBLHlCQUF5QixPQUN2Qix3QkFBd0IsOEJBQ3hCO0FBQ1IsUUFBTSx3QkFBd0I7QUFBQSxJQUM1Qix5QkFBeUIsT0FBTyx3QkFBd0IsOEJBQThCO0FBQUEsSUFDdEY7QUFBQSxNQUNFLHVCQUF1QjtBQUFBLE1BQ3ZCLHVCQUF1QjtBQUFBLE1BQ3ZCLGFBQWE7QUFBQSxNQUNiLFVBQVU7QUFBQSxJQUNaO0FBQUEsRUFDRjtBQUNBLFFBQU0sd0JBQXdCLE9BQU8sT0FBTyxnQkFBZ0IsTUFBTSxJQUFJLElBQUk7QUFDMUUsUUFBTSxzQkFDSiwwQkFBMEIsSUFDdEIsaURBQ0E7QUFDTixRQUFNLDJCQUEyQiwwQkFBMEIsSUFBSSxnQkFBZ0I7QUFDL0UsUUFBTSx5QkFDSCxnQ0FBZ0MscUJBQXFCLEtBQUssS0FBSyxxQkFBcUIsd0JBQXdCLEdBQzFHLFFBQVEsbUNBQW1DLEVBQUUsRUFDN0MsS0FBSyxFQUNMLFlBQVksTUFBTSwwQkFBMEIsSUFBSSxXQUFXO0FBQ2hFLFFBQU0sOEJBQ0osQ0FBQyxDQUFDLFNBQVMsNEJBQTRCLEtBQUssQ0FBQyxDQUFDLFNBQVMsd0JBQXdCLEtBQUssQ0FBQyxDQUFDLFNBQVMsMEJBQTBCO0FBQzNILFFBQU0sK0JBQStCLFNBQVMsd0JBQXdCLEtBQUssS0FBSyx1QkFBdUIsS0FBSztBQUM1RyxRQUFNLGlDQUFpQyxTQUFTLDBCQUEwQixFQUN2RSxRQUFRLHFCQUFxQixHQUFHLEVBQ2hDLFFBQVEsV0FBVyxHQUFHLEVBQ3RCLEtBQUssS0FBSyxLQUFLLHVCQUF1QixLQUFLO0FBQzlDLFFBQU0sa0NBQWtDO0FBQUEsSUFDdEM7QUFBQSxJQUNBO0FBQUEsSUFDQSxTQUFTLDRCQUE0QixLQUFLO0FBQUEsSUFDMUM7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNBLFFBQU0sZ0NBQWdDO0FBQUEsSUFDcEM7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0EsUUFBTSwwQkFBMEIsOEJBQThCLGtDQUFrQztBQUVoRyxTQUNFLDZDQUFDLGFBQVEsV0FBVSxtR0FDakIsd0RBQUMsU0FBSSxXQUFVLHlDQUNaO0FBQUEsS0FBQyxlQUNBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFPLEtBQUssK0JBQStCLG9CQUFvQjtBQUFBLFFBQy9ELE9BQU8sU0FBUyxPQUFPLFlBQVksS0FBSztBQUFBO0FBQUEsSUFDMUMsSUFDRTtBQUFBLElBQ0gsQ0FBQyxlQUFlLDZDQUFDLGdDQUFxQixPQUFPLEtBQUssOEJBQThCLFFBQVEsR0FBRyxPQUFPLGFBQWEsSUFBSztBQUFBLElBQ3BILHlCQUNDO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFPLEtBQUsscUNBQXFDLGdCQUFnQjtBQUFBLFFBQ2pFLE9BQU8sc0JBQXNCO0FBQUEsUUFDN0IsV0FBUztBQUFBO0FBQUEsSUFDWCxJQUNFO0FBQUEsSUFDSCxhQUFhLHNCQUNaLDhDQUFDLFNBQUksV0FBVSw2QkFDYjtBQUFBLG1EQUFDLFdBQU0sV0FBVSw0QkFBNEIsZUFBSyxtQ0FBbUMsYUFBYSxHQUFFO0FBQUEsTUFDcEc7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLFdBQVU7QUFBQSxVQUNWLE9BQU87QUFBQSxVQUNQLFVBQVUsQ0FBQyxVQUFVLHlCQUF5QixNQUFNLE9BQU8sU0FBUyxFQUFFO0FBQUEsVUFDdEUsY0FBWSxLQUFLLG1DQUFtQyxhQUFhO0FBQUE7QUFBQSxNQUNuRTtBQUFBLE9BQ0YsSUFFQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsT0FBTyxLQUFLLG1DQUFtQyxhQUFhO0FBQUEsUUFDNUQsT0FBTyxTQUFTLE9BQU8sV0FBVyxLQUFLO0FBQUEsUUFDdkMsV0FBUztBQUFBO0FBQUEsSUFDWDtBQUFBLElBRUQsYUFBYSxzQkFDWjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsT0FBTyxLQUFLLCtCQUErQixTQUFTO0FBQUEsUUFDcEQsYUFBYSxLQUFLLDRDQUE0QyxZQUFZO0FBQUEsUUFDMUUsT0FBTztBQUFBLFFBQ1AsVUFBVTtBQUFBLFFBQ1YsVUFBVSxDQUFDLGFBQWEsQ0FBQztBQUFBLFFBQ3pCLFVBQVUsQ0FBQyxhQUFhLENBQUM7QUFBQTtBQUFBLElBQzNCLElBQ0UsZUFDRiw2Q0FBQyxnQ0FBcUIsT0FBTyxLQUFLLCtCQUErQixTQUFTLEdBQUcsT0FBTyxjQUFjLElBQ2hHO0FBQUEsSUFDSjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUE7QUFBQSxJQUNGO0FBQUEsSUFDQyxDQUFDLGVBQWUsNkNBQUMsZ0NBQXFCLE9BQU8sS0FBSyxtQ0FBbUMsY0FBYyxHQUFHLE9BQU8saUJBQWlCLElBQUs7QUFBQSxLQUN0SSxHQUNGO0FBRUo7QUFFQSxJQUFPLGlDQUFROzs7QUNwS1gsSUFBQUMsc0JBQUE7QUFiSixJQUFNLHVCQUF1QixDQUFDO0FBQUEsRUFDNUI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUFpQztBQUMvQixTQUNFLDhDQUFDLGFBQVEsV0FBVSxhQUNqQjtBQUFBLGlEQUFDLGlDQUFzQixPQUFPLFlBQVksV0FBVSxtQ0FBa0M7QUFBQSxJQUVyRixhQUFhLFdBQVcsSUFDdkIsNkNBQUMsU0FBSSxXQUFVLCtCQUE4QixtQkFBaUIsV0FBVyxJQUV6RSw2Q0FBQyxTQUFJLEtBQUssY0FBYyxXQUFVLGdCQUMvQix1QkFBYSxJQUFJLENBQUMsTUFBTSxVQUFVO0FBQ2pDLFlBQU0sU0FBUyxTQUFTLEtBQUssU0FBUztBQUN0QyxZQUFNLGNBQWMsU0FBUyxLQUFLLFdBQVc7QUFDN0MsWUFBTSxhQUFhLHlCQUF5QixLQUFLLFVBQVUsTUFBTSxZQUFZO0FBQzdFLFlBQU0scUJBQXFCLFNBQVMsS0FBSyxNQUFNO0FBQy9DLFlBQU0sWUFBWSx1QkFBdUIsU0FBUyxLQUFLLFNBQVMsR0FBRyxVQUFVLGlCQUFpQixRQUFRLE9BQU87QUFDN0csWUFBTSxtQkFBbUIscUJBQ3ZCO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxPQUFNO0FBQUEsVUFDTixNQUFLO0FBQUEsVUFDTCxTQUFRO0FBQUEsVUFDUixhQUFhO0FBQUEsVUFDYixRQUFPO0FBQUEsVUFDUCxXQUFVO0FBQUEsVUFDVixlQUFZO0FBQUEsVUFFWjtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsZUFBYztBQUFBLGNBQ2QsZ0JBQWU7QUFBQSxjQUNmLEdBQUU7QUFBQTtBQUFBLFVBQ0o7QUFBQTtBQUFBLE1BQ0YsSUFDRTtBQUVKLGFBQ0UsNkNBQUMsU0FBK0IsV0FBVSxpQkFDeEM7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDO0FBQUEsVUFDQSxPQUFPLGVBQWUsVUFBVTtBQUFBLFVBQ2hDO0FBQUEsVUFDQSxRQUFRLE1BQU0sV0FBVyxNQUFNO0FBQUEsVUFDL0IsZ0JBQWU7QUFBQSxVQUNmLFlBQVk7QUFBQSxVQUNaLHFCQUFvQjtBQUFBLFVBQ3BCLGFBQWEsc0JBQXNCO0FBQUE7QUFBQSxNQUNyQyxLQVZRLEdBQUcsTUFBTSxJQUFJLEtBQUssRUFXNUI7QUFBQSxJQUVKLENBQUMsR0FDSDtBQUFBLElBR0Y7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFlBQVk7QUFBQSxRQUNaLGFBQWE7QUFBQSxRQUNiLGNBQWM7QUFBQSxRQUNkLFFBQVE7QUFBQTtBQUFBLElBQ1Y7QUFBQSxLQUNGO0FBRUo7QUFFQSxJQUFPLCtCQUFROzs7QUNoRlAsSUFBQUMsc0JBQUE7QUFSUixJQUFNLDhCQUE4QixDQUFDLEVBQUUsU0FBUyxNQUFNLFdBQVcsT0FBTyxjQUFjLE1BQXdDO0FBQzVILE1BQUksUUFBUSxTQUFTLEdBQUc7QUFDdEIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUNFLDZDQUFDLDZCQUFrQixXQUFXLEtBQUssdUNBQXVDLDhCQUE4QixHQUNyRyxrQkFBUSxJQUFJLENBQUMsV0FDWjtBQUFBLElBQUM7QUFBQTtBQUFBLE1BRUMsT0FBTyxLQUFLLE9BQU8sVUFBVSxPQUFPLFFBQVE7QUFBQSxNQUM1QyxVQUFVLFFBQVE7QUFBQSxNQUNsQixTQUFTLE1BQU0sY0FBYyxNQUFNO0FBQUE7QUFBQSxJQUg5QixPQUFPO0FBQUEsRUFJZCxDQUNELEdBQ0g7QUFFSjtBQUVBLElBQU8sc0NBQVE7OztBQ3dEWCxJQUFBQyxzQkFBQTtBQWxDSixJQUFNLDZCQUE2QixDQUFDO0FBQUEsRUFDbEM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUF1QztBQUNyQyxTQUNFLDhFQUNFO0FBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE1BQU0sTUFBTTtBQUFBLFFBQ1osT0FBTyxNQUFNO0FBQUEsUUFDYixTQUFTLE1BQU07QUFBQSxRQUNmLGFBQWE7QUFBQSxRQUNiLFlBQVk7QUFBQSxRQUNaLGFBQWE7QUFBQSxRQUNiLFlBQVksTUFBTTtBQUFBLFFBQ2xCLGFBQWEsTUFBTTtBQUFBLFFBQ25CLE1BQU0sUUFBUTtBQUFBLFFBQ2QsT0FBTztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBRUM7QUFBQTtBQUFBLElBQ0g7QUFBQSxJQUVBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxLQUFLO0FBQUEsUUFDTCxNQUFLO0FBQUEsUUFDTCxRQUFRO0FBQUEsUUFDUixTQUFRO0FBQUEsUUFDUixXQUFVO0FBQUEsUUFDVixVQUFVLENBQUMsVUFBVTtBQUNuQixnQkFBTSxPQUFPLE1BQU0sY0FBYyxRQUFRLENBQUMsS0FBSztBQUMvQyxnQkFBTSxjQUFjLFFBQVE7QUFDNUIsK0JBQXFCLElBQUk7QUFBQSxRQUMzQjtBQUFBO0FBQUEsSUFDRjtBQUFBLElBRUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLEtBQUs7QUFBQSxRQUNMLE1BQUs7QUFBQSxRQUNMLFFBQVE7QUFBQSxRQUNSLFdBQVU7QUFBQSxRQUNWLFVBQVUsQ0FBQyxVQUFVO0FBQ25CLGdCQUFNLE9BQU8sTUFBTSxjQUFjLFFBQVEsQ0FBQyxLQUFLO0FBQy9DLGdCQUFNLGNBQWMsUUFBUTtBQUM1QixnQ0FBc0IsSUFBSTtBQUFBLFFBQzVCO0FBQUE7QUFBQSxJQUNGO0FBQUEsSUFFQyxtQkFDQyw2Q0FBQyxTQUFJLFdBQVUscUZBQ2Isd0RBQUMsU0FBSSxXQUFVLDZGQUNiO0FBQUEsbURBQUMsUUFBRyxXQUFVLDRDQUNYLGVBQUssd0NBQXdDLGNBQWMsR0FDOUQ7QUFBQSxNQUNBLDZDQUFDLE9BQUUsV0FBVSwrQkFDVjtBQUFBLFFBQ0M7QUFBQSxRQUNBO0FBQUEsTUFDRixHQUNGO0FBQUEsTUFFQSw4Q0FBQyxTQUFJLFdBQVUsK0JBQ2I7QUFBQSxxREFBQyxZQUFPLE1BQUssVUFBUyxXQUFVLDJDQUEwQyxTQUFTLG9CQUNoRixlQUFLLHlDQUF5QyxnQkFBYSxHQUM5RDtBQUFBLFFBQ0EsNkNBQUMsWUFBTyxNQUFLLFVBQVMsV0FBVSwyQ0FBMEMsU0FBUyxxQkFDaEYsZUFBSywwQ0FBMEMsZUFBZSxHQUNqRTtBQUFBLFFBQ0EsNkNBQUMsWUFBTyxNQUFLLFVBQVMsV0FBVSwyQ0FBMEMsU0FBUyxxQkFDaEYsZUFBSyxpQkFBaUIsUUFBUSxHQUNqQztBQUFBLFNBQ0Y7QUFBQSxPQUNGLEdBQ0YsSUFDRTtBQUFBLElBRUo7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE1BQU07QUFBQSxRQUNOLE9BQU8sS0FBSywwQ0FBMEMsbUJBQW1CO0FBQUEsUUFDekUsU0FBUyw4QkFBOEIsS0FBSyxrQkFBa0IsU0FBUztBQUFBLFFBQ3ZFLFdBQVc7QUFBQSxRQUNYLFFBQVE7QUFBQTtBQUFBLElBQ1Y7QUFBQSxJQUVDLDBCQUNDO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxXQUNFLDBCQUNJLGdJQUNBO0FBQUEsUUFHTjtBQUFBLHVEQUFDLE9BQUcsbUNBQXdCO0FBQUEsVUFDM0IsdUJBQ0M7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFdBQ0UsMEJBQ0kseUhBQ0E7QUFBQSxjQUdMLHdCQUFjLG9CQUFvQjtBQUFBO0FBQUEsVUFDckMsSUFDRTtBQUFBLFVBQ0gscUJBQXFCLFNBQVMsSUFDN0I7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFdBQ0UsMEJBQ0ksMkZBQ0E7QUFBQSxjQUdMLCtCQUFxQixJQUFJLENBQUMsVUFDekIsNkNBQUMsT0FBcUMsYUFBRyxNQUFNLElBQUksS0FBSyxNQUFNLE9BQU8sTUFBN0QsR0FBRyxNQUFNLElBQUksSUFBSSxNQUFNLEVBQUUsRUFBdUMsQ0FDekU7QUFBQTtBQUFBLFVBQ0gsSUFDRTtBQUFBLFVBQ0osOENBQUMsU0FBSSxXQUFVLHdCQUNaO0FBQUEsc0NBQ0MsNkNBQUMsWUFBTyxNQUFLLFVBQVMsV0FBVSxzQ0FBcUMsU0FBUyxxQkFDM0UsZUFBSyw2Q0FBNkMscUJBQXFCLEdBQzFFLElBQ0U7QUFBQSxZQUNILHdCQUNDLDZDQUFDLFlBQU8sTUFBSyxVQUFTLFdBQVUsc0NBQXFDLFNBQVMsc0JBQzNFLGVBQUssdUNBQXVDLG1CQUFtQixHQUNsRSxJQUNFO0FBQUEsWUFDSiw2Q0FBQyxZQUFPLE1BQUssVUFBUyxXQUFVLHNDQUFxQyxTQUFTLHlCQUMzRSxlQUFLLGdCQUFnQixPQUFPLEdBQy9CO0FBQUEsYUFDRjtBQUFBO0FBQUE7QUFBQSxJQUNGLElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFFQSxJQUFPLHFDQUFROzs7QUM5TmYsSUFBQUMsZ0JBQThEOzs7QUNBOUQsSUFBQUMsZ0JBQW1DO0FBV25DLElBQU0sOEJBQThCO0FBa0NwQyxJQUFNLHdCQUF3QixDQUFDLFFBQStCLGtCQUFrQixHQUFHO0FBRW5GLElBQU0scUJBQXFCLENBQUMsTUFBcUIsVUFBa0M7QUFDakYsTUFBSSxRQUFRLFFBQVEsU0FBUyxLQUFNLFFBQU87QUFDMUMsU0FBTyxLQUFLLElBQUksT0FBTyxLQUFLLElBQUk7QUFDbEM7QUFHTyxJQUFNLGlDQUFpQyxDQUFDO0FBQUEsRUFDN0M7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBMEM7QUFDeEMsUUFBTSx5QkFBcUI7QUFBQSxJQUN6QixDQUNFLFlBQ0EsMEJBQ3FFO0FBQ3JFLFlBQU0sbUNBQW1DLDBCQUEwQjtBQUNuRSxZQUFNLHFCQUFxQjtBQUFBLFFBQ3pCLDBCQUEyQixzQkFBc0IscUJBQXFCLEtBQU8scUJBQXFCO0FBQUEsTUFDcEcsRUFDRyxLQUFLLEVBQ0wsWUFBWTtBQUNmLFlBQU0sd0JBQXdCLE9BQU8sb0JBQW9CLEVBQUUsRUFBRSxLQUFLO0FBQ2xFLFlBQU0sc0JBQXNCLE9BQU8sa0JBQWtCLEVBQUUsRUFBRSxLQUFLO0FBQzlELFlBQU0sOEJBQThCO0FBQUEsUUFDbEMseUJBQXlCLDBCQUEwQjtBQUFBLE1BQ3JELEVBQUUsS0FBSztBQUNQLFlBQU0sNEJBQTRCO0FBQUEsUUFDaEMsOEJBQStCLHNCQUFzQixxQkFBcUIsS0FBTyxxQkFBcUI7QUFBQSxNQUN4RztBQUNBLFlBQU0seUJBQXlCLE9BQU8sNEJBQTRCLEtBQUssRUFBRSxLQUFLLEVBQUUsWUFBWSxLQUFLO0FBQ2pHLFlBQU0sdUJBQ0osdUJBQXVCLHVCQUF1QixNQUFNLHVCQUF1QjtBQUM3RSxZQUFNLHVCQUF1Qix1QkFBdUIsdUJBQXVCLE1BQU0sQ0FBQztBQUNsRixZQUFNLHFCQUFxQixzQkFBc0IseUJBQXlCO0FBQzFFLFlBQU0sdUJBQXVCLHNCQUFzQix5QkFBeUI7QUFDNUUsWUFBTSx1QkFBdUIsc0JBQXNCLGtCQUFrQjtBQUNyRSxZQUFNLGdDQUFnQyxPQUFPLHVCQUF1QjtBQUNwRSxZQUFNLDZCQUE2QixPQUFPLFVBQVUsNkJBQTZCLEtBQUssaUNBQWlDO0FBQ3ZILFlBQU0sZUFBZSxzQkFBc0IsUUFBUSxxQkFBcUI7QUFDeEUsWUFBTSw0QkFDSix1QkFDQSxDQUFDLGdCQUNELGlCQUNDLHdCQUF3QixRQUFRLENBQUMsbUJBQW1CLG9CQUFvQixvQkFBb0I7QUFFL0YsWUFBTSx3QkFBd0IsTUFBTTtBQUNsQyxZQUFJLENBQUMsb0JBQXFCLFFBQU87QUFDakMsWUFBSSxDQUFDLHdCQUF3QixDQUFDLGFBQWMsUUFBTztBQUNuRCxZQUFJLDRCQUE2QixRQUFPO0FBQ3hDLFlBQUksQ0FBQyxnQkFBZ0IsQ0FBQywwQkFBMkIsUUFBTztBQUN4RCxZQUFJLHdCQUF3QixLQUFNLFFBQU87QUFDekMsZUFBTyxDQUFDLG1CQUFtQixvQkFBb0Isb0JBQW9CO0FBQUEsTUFDckUsR0FBRztBQUNILFlBQU0sMkJBQTJCLHNCQUM1Qix1QkFBdUIsSUFBSyw2QkFBNkIsZ0NBQWdDLElBQ3pGLDZCQUE2QixnQ0FBZ0M7QUFDbEUsWUFBTSw2QkFDSixlQUFlLDZCQUE2QixPQUFPLE9BQU8seUJBQXlCLElBQUk7QUFFekYsWUFBTSx1QkFBdUIsc0JBQ3hCLHVCQUF1Qiw4QkFBK0IsZUFBZSxPQUFPLGtCQUFrQixJQUFJLElBQ2xHLHdCQUF3QixzQkFBc0I7QUFFbkQsVUFBSSxjQUFjO0FBQ2hCLFlBQUksQ0FBQyx1QkFBdUI7QUFDMUIsaUJBQU87QUFBQSxZQUNMLE9BQU8sS0FBSyxnREFBZ0QsMEJBQTBCO0FBQUEsVUFDeEY7QUFBQSxRQUNGO0FBRUEsWUFBSSxDQUFDLG9CQUFvQjtBQUN2QixpQkFBTztBQUFBLFlBQ0wsT0FBTyxLQUFLLDZDQUE2Qyx1QkFBdUI7QUFBQSxVQUNsRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBRUEsVUFBSSx3QkFBd0IsQ0FBQyxjQUFjO0FBQ3pDLGVBQU87QUFBQSxVQUNMLE9BQU87QUFBQSxZQUNMO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUVBLGFBQU87QUFBQSxRQUNMLFNBQVM7QUFBQSxVQUNQLGFBQWE7QUFBQSxVQUNiLGNBQWM7QUFBQSxVQUNkLFVBQVU7QUFBQSxVQUNWLFFBQVEsdUJBQXVCO0FBQUEsVUFDL0Isb0JBQW9CO0FBQUEsVUFDcEIsa0JBQWtCO0FBQUE7QUFBQSxVQUVsQixtQkFBbUIsbUNBQ2YsOEJBQ0MsK0JBQStCO0FBQUEsUUFDdEM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLFFBQU0sbUJBQWUsMkJBQVksWUFBWTtBQUMzQyxRQUFJLFFBQVEsQ0FBQyxVQUFXLFFBQU87QUFDL0IsUUFBSSxDQUFDLGdCQUFnQixhQUFjLFFBQU87QUFFMUMsVUFBTSxhQUFhLGVBQWUsbUJBQW1CO0FBQ3JELFFBQUksQ0FBQyxZQUFZO0FBQ2YsMEJBQW9CO0FBQ3BCLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxnQkFBZ0IsbUJBQW1CO0FBQ3pDLFFBQUksV0FBVyxlQUFlO0FBQzVCLG9CQUFjLGNBQWMsS0FBSztBQUNqQyxnQkFBVSxjQUFjLEtBQUs7QUFDN0IsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLFNBQVMsTUFBTSx1QkFBdUI7QUFBQSxNQUMxQyxhQUFhLGVBQ1QsS0FBSyxrQkFBa0IsU0FBUyxJQUNoQyxLQUFLLGlDQUFpQywyQkFBMkI7QUFBQSxNQUNyRSxzQkFBc0IsS0FBSyxvQ0FBb0MsZUFBZTtBQUFBLE1BQzlFO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLFFBQVEsWUFBWTtBQUNsQixZQUFJLGNBQWM7QUFDaEIsZ0JBQU0sZ0JBQWdCLGNBQWM7QUFDcEMsZ0JBQU0sVUFBcUM7QUFBQSxZQUN6QyxNQUFNO0FBQUEsWUFDTixzQkFBc0I7QUFBQSxZQUN0QixhQUFhLGNBQWM7QUFBQSxZQUMzQixjQUFjLGNBQWM7QUFBQSxZQUM1QixVQUFVLGNBQWM7QUFBQSxZQUN4QixRQUFRLGNBQWM7QUFBQSxZQUN0QixvQkFBb0I7QUFBQSxZQUNwQixrQkFBa0IsY0FBYztBQUFBLFlBQ2hDLE9BQU8sQ0FBQztBQUFBLFVBQ1Y7QUFFQSxnQkFBTUMsWUFBVyxNQUFNLG1CQUFtQixPQUFPO0FBRWpELGNBQUksQ0FBQ0EsVUFBUyxTQUFTO0FBQ3JCLGtCQUFNLElBQUksTUFBTUEsVUFBUyxXQUFXLEtBQUsscUJBQXFCLGlCQUFpQixDQUFDO0FBQUEsVUFDbEY7QUFHQSxnQkFBTSxjQUFjQSxXQUFVO0FBQzlCLGdCQUFNLGlCQUFpQixPQUFPLGFBQWEsZ0JBQWdCLGFBQWEsZ0JBQWdCLEVBQUUsRUFBRSxLQUFLO0FBQ2pHLGNBQUksQ0FBQyxnQkFBZ0I7QUFDbkIsa0JBQU0sSUFBSSxNQUFNLEtBQUsscUJBQXFCLGlCQUFpQixDQUFDO0FBQUEsVUFDOUQ7QUFFQSwwQkFBZ0IsY0FBYztBQUM5QixvQkFBVSxLQUFLLGVBQWUsTUFBTSxDQUFDO0FBQ3JDLGlCQUFPO0FBQUEsUUFDVDtBQUVBLGNBQU0sV0FBVyxNQUFNLHlCQUF5QixTQUFTLGNBQWMsT0FBTztBQUU5RSxZQUFJLENBQUMsU0FBUyxTQUFTO0FBQ3JCLGdCQUFNLElBQUksTUFBTSxTQUFTLFdBQVcsS0FBSyxxQ0FBcUMsZ0JBQWdCLENBQUM7QUFBQSxRQUNqRztBQUVBLGtCQUFVLEtBQUssZ0NBQWdDLHVCQUF1QixDQUFDO0FBQ3ZFLHFCQUFhLEtBQUs7QUFDbEIsZUFBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGLENBQUM7QUFFRCxXQUFPLE9BQU87QUFBQSxFQUNoQixHQUFHO0FBQUEsSUFDRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sNkJBQXlCO0FBQUEsSUFDN0IsT0FBTyxZQUFvQixhQUFxQiwwQkFBMEM7QUFDeEYsVUFBSSxRQUFRLGdCQUFnQixDQUFDLFFBQVMsUUFBTztBQUM3QyxVQUFJLENBQUMscUJBQXFCO0FBQ3hCLDRCQUFvQjtBQUNwQixlQUFPO0FBQUEsTUFDVDtBQUVBLFlBQU0sZ0JBQWdCLG1CQUFtQixZQUFZLHFCQUFxQjtBQUMxRSxVQUFJLFdBQVcsZUFBZTtBQUM1QixzQkFBYyxjQUFjLEtBQUs7QUFDakMsa0JBQVUsY0FBYyxLQUFLO0FBQzdCLGVBQU87QUFBQSxNQUNUO0FBRUEsWUFBTSxTQUFTLE1BQU0sdUJBQXVCO0FBQUEsUUFDMUM7QUFBQSxRQUNBLHNCQUFzQixLQUFLLG9DQUFvQyxlQUFlO0FBQUEsUUFDOUU7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsUUFBUSxZQUFZO0FBQ2xCLGdCQUFNLFdBQVcsTUFBTSx5QkFBeUIsU0FBUyxjQUFjLE9BQU87QUFFOUUsY0FBSSxDQUFDLFNBQVMsU0FBUztBQUNyQixrQkFBTSxJQUFJLE1BQU0sU0FBUyxXQUFXLEtBQUsscUNBQXFDLGdCQUFnQixDQUFDO0FBQUEsVUFDakc7QUFFQSxvQkFBVSxLQUFLLGdDQUFnQyx1QkFBdUIsQ0FBQztBQUN2RSx1QkFBYSxLQUFLO0FBQ2xCLGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0YsQ0FBQztBQUVELGFBQU8sT0FBTztBQUFBLElBQ2hCO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsUUFBTSxtQkFBZSwyQkFBWSxZQUFZO0FBQzNDLFFBQUksS0FBTSxRQUFPO0FBQ2pCLFFBQUksZUFBZ0IsUUFBTztBQUMzQixRQUFJLENBQUMsa0JBQWtCO0FBQ3JCLDBCQUFvQjtBQUNwQixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sU0FBUyxNQUFNLHVCQUF1QjtBQUFBLE1BQzFDLGFBQWEsS0FBSyxpQ0FBaUMsMkJBQTJCO0FBQUEsTUFDOUUsc0JBQXNCLEtBQUssb0NBQW9DLGVBQWU7QUFBQSxNQUM5RTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSxRQUFRLFlBQVk7QUFDbEIsY0FBTSxXQUFXLE1BQU0sbUJBQW1CLE9BQU87QUFFakQsWUFBSSxDQUFDLFNBQVMsU0FBUztBQUNyQixnQkFBTSxJQUFJLE1BQU0sU0FBUyxXQUFXLEtBQUsscUNBQXFDLGdCQUFnQixDQUFDO0FBQUEsUUFDakc7QUFFQSxrQkFBVSxLQUFLLGdDQUFnQyx1QkFBdUIsQ0FBQztBQUN2RSxlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0YsQ0FBQztBQUVELFdBQU8sT0FBTztBQUFBLEVBQ2hCLEdBQUcsQ0FBQyxNQUFNLGtCQUFrQixnQkFBZ0IsU0FBUyxlQUFlLFdBQVcsT0FBTyxDQUFDO0FBRXZGLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBQzFVTyxJQUFNLHFDQUFxQyxDQUFDO0FBQUEsRUFDakQ7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLGFBQWE7QUFBQSxFQUNiO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLG1CQUFtQjtBQUFBLEVBQ25CO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUE4QztBQUM1Qyw4QkFBNEI7QUFBQSxJQUMxQixlQUFlO0FBQUEsSUFDZixLQUFLO0FBQUEsTUFDSCxZQUFZO0FBQUEsTUFDWixZQUFZO0FBQUEsTUFDWixhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sV0FBVztBQUFBLE1BQ1gsYUFBYTtBQUFBLE1BQ2IsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0Esa0NBQWtDO0FBQUEsSUFDbEM7QUFBQSxJQUNBLFdBQVc7QUFBQSxJQUNYLFNBQVM7QUFBQSxJQUNULFdBQVc7QUFBQSxJQUNYO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLFlBQVk7QUFBQSxJQUNaO0FBQUEsSUFDQSxrQkFBa0IsS0FBSywwQ0FBMEMsY0FBYztBQUFBLElBQy9FLG9CQUFvQixLQUFLLHlDQUF5Qyw4QkFBOEI7QUFBQSxJQUNoRyxpQkFBaUIsS0FBSyxlQUFlLE1BQU07QUFBQSxJQUMzQyxvQkFBb0IsS0FBSywwQ0FBMEMsc0JBQXNCO0FBQUEsSUFDekYsc0JBQXNCLEtBQUsseUNBQXlDLDJDQUEyQztBQUFBLElBQy9HLG1CQUFtQixLQUFLLGlCQUFpQixRQUFRO0FBQUEsSUFDakQ7QUFBQSxJQUNBLGlCQUFpQixvQkFBb0IsTUFBTSxxQkFBcUIsdUJBQXVCO0FBQUEsSUFDdkY7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBQ0g7OztBQ25HQSxJQUFBQyxnQkFBMEQ7QUF5QjFELElBQU0sNEJBQTRCO0FBQ2xDLElBQU0saUNBQWlDO0FBQ3ZDLElBQU0sK0JBQStCO0FBQ3JDLElBQU0sMEJBQTBCO0FBQ2hDLElBQU0sc0JBQXNCO0FBRzVCLElBQU0sK0JBQStCLENBQUMsVUFBMEI7QUFDOUQsU0FBTyx5QkFBeUIsT0FBTztBQUFBLElBQ3JDLHVCQUF1QjtBQUFBLElBQ3ZCLHVCQUF1QjtBQUFBLElBQ3ZCLGFBQWE7QUFBQSxJQUNiLFVBQVU7QUFBQSxFQUNaLENBQUM7QUFDSDtBQUdBLElBQU0sb0NBQW9DLDZCQUE2Qiw4QkFBOEI7QUFFckcsSUFBTSx5QkFBeUIsTUFBMEI7QUFDdkQsU0FBTztBQUFBLElBQ0wsY0FBYztBQUFBLElBQ2QsYUFBYTtBQUFBLElBQ2IsUUFBUTtBQUFBLElBQ1IsY0FBYztBQUFBLElBQ2QsYUFBYTtBQUFBLElBQ2Isb0JBQW9CO0FBQUEsSUFDcEIsa0JBQWtCO0FBQUEsSUFDbEIsYUFBYTtBQUFBLElBQ2IsVUFBVSxPQUFPLDhCQUE4QjtBQUFBLEVBQ2pEO0FBQ0Y7QUFFQSxJQUFNLHlCQUF5QixDQUFDLFVBQTJCO0FBQ3pELE1BQUksQ0FBQyxNQUFPLFFBQU87QUFDbkIsUUFBTSxTQUFTLHlCQUF5QixLQUFLO0FBQzdDLE1BQUksV0FBVyxLQUFNLFFBQU87QUFDNUIsU0FBTyxLQUFLLElBQUksTUFBTSxJQUFJO0FBQzVCO0FBZ0JPLElBQU0sNkJBQTZCLENBQUM7QUFBQSxFQUN6QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQXNDO0FBQ3BDLFFBQU0sQ0FBQyxRQUFRLFNBQVMsUUFBSSx3QkFBb0MsSUFBSTtBQUNwRSxRQUFNLENBQUMsT0FBTyxRQUFRLFFBQUksd0JBQTZCLENBQUMsQ0FBQztBQUN6RCxRQUFNLENBQUMsVUFBVSxXQUFXLFFBQUksd0JBQVMsQ0FBQztBQUMxQyxRQUFNLENBQUMsV0FBVyxZQUFZLFFBQUksd0JBQVMsS0FBSztBQUNoRCxRQUFNLENBQUMsY0FBYyxlQUFlLFFBQUksd0JBQVMsRUFBRTtBQUNuRCxRQUFNLENBQUMsTUFBTSxPQUFPLFFBQUksd0JBQVMsS0FBSztBQUN0QyxRQUFNLENBQUMsUUFBUSxTQUFTLFFBQUksd0JBQVMsRUFBRTtBQUN2QyxRQUFNLENBQUMsV0FBVyxZQUFZLFFBQUksd0JBQVMsS0FBSztBQUNoRCxRQUFNLENBQUMsWUFBWSxhQUFhLFFBQUksd0JBQVMsRUFBRTtBQUMvQyxRQUFNLENBQUMsa0JBQWtCLG1CQUFtQixRQUFJLHdCQUFTLEVBQUU7QUFDM0QsUUFBTSxDQUFDLGdCQUFnQixpQkFBaUIsUUFBSSx3QkFBUyxFQUFFO0FBQ3ZELFFBQU0sQ0FBQyxtQkFBbUIsb0JBQW9CLFFBQUksd0JBQVMsRUFBRTtBQUM3RCxRQUFNLENBQUMsbUJBQW1CLG9CQUFvQixRQUFJLHdCQUFTLEVBQUU7QUFDN0QsUUFBTSxDQUFDLHdCQUF3Qix5QkFBeUIsUUFBSSx3QkFBUyxFQUFFO0FBQ3ZFLFFBQU0sQ0FBQyxxQkFBcUIsc0JBQXNCLFFBQUksd0JBQVMsRUFBRTtBQUNqRSxRQUFNLENBQUMsdUJBQXVCLHdCQUF3QixRQUFJLHdCQUFTLEtBQUs7QUFDeEUsUUFBTSxDQUFDLHFCQUFxQixzQkFBc0IsUUFBSSx3QkFBUyxFQUFFO0FBQ2pFLFFBQU0sQ0FBQyw0QkFBNEIsNkJBQTZCLFFBQUksd0JBQVMsS0FBSztBQUNsRixRQUFNLENBQUMsMkJBQTJCLDRCQUE0QixRQUFJLHdCQUFTLEVBQUU7QUFDN0UsUUFBTSxDQUFDLDhCQUE4QiwrQkFBK0IsUUFBSSx3QkFBUyxFQUFFO0FBQ25GLFFBQU0sQ0FBQywwQkFBMEIsMkJBQTJCLFFBQUksd0JBQVMsRUFBRTtBQUMzRSxRQUFNLENBQUMsNEJBQTRCLDZCQUE2QixRQUFJLHdCQUFTLEVBQUU7QUFFL0UsUUFBTSw2QkFBeUIsMkJBQVksQ0FBQyxlQUEwQztBQUNwRix3QkFBb0IsU0FBUyxZQUFZLFdBQVcsQ0FBQztBQUNyRCxzQkFBa0IsU0FBUyxZQUFZLE1BQU0sQ0FBQztBQUM5Qyx5QkFBcUIsU0FBUyxZQUFZLFlBQVksQ0FBQztBQUN2RDtBQUFBLE1BQ0UseUJBQXlCLFlBQVksVUFBVTtBQUFBLFFBQzdDLHVCQUF1QjtBQUFBLFFBQ3ZCLHVCQUF1QjtBQUFBLFFBQ3ZCLGFBQWE7QUFBQSxRQUNiLFVBQVU7QUFBQSxNQUNaLENBQUM7QUFBQSxJQUNIO0FBQ0EsOEJBQTBCLFNBQVMsWUFBWSxpQkFBaUIsQ0FBQztBQUFBLEVBQ25FLEdBQUcsQ0FBQyxDQUFDO0FBRUwsK0JBQVUsTUFBTTtBQUNkLFVBQU0sYUFBYSxZQUFZO0FBQzdCLFVBQUksQ0FBQyxXQUFXO0FBQ2Qsb0JBQVk7QUFDWjtBQUFBLE1BQ0Y7QUFFQSxVQUFJLGNBQWM7QUFDaEIsWUFBSSxDQUFDLGtCQUFrQjtBQUNyQixzQkFBWTtBQUNaO0FBQUEsUUFDRjtBQUVBLGNBQU0sY0FBYyx1QkFBdUI7QUFDM0Msa0JBQVUsV0FBVztBQUNyQixpQkFBUyxDQUFDLENBQUM7QUFDWCxvQkFBWSxDQUFDO0FBQ2IscUJBQWEsSUFBSTtBQUNqQiwrQkFBdUIsV0FBVztBQUNsQyxrQkFBVSxFQUFFO0FBQ1osd0JBQWdCLEVBQUU7QUFDbEI7QUFBQSxNQUNGO0FBRUEsVUFBSSxDQUFDLFNBQVM7QUFDWix3QkFBZ0IsS0FBSywwQkFBMEIsOEJBQThCLENBQUM7QUFDOUUsa0JBQVUsSUFBSTtBQUNkLGlCQUFTLENBQUMsQ0FBQztBQUNYO0FBQUEsTUFDRjtBQUVBLG1CQUFhLElBQUk7QUFDakIsc0JBQWdCLEVBQUU7QUFFbEIsVUFBSTtBQUNGLGNBQU0sV0FBVyxNQUFNLHdCQUF3QixTQUFTO0FBQUEsVUFDdEQseUJBQXlCO0FBQUEsUUFDM0IsQ0FBQztBQUVELFlBQUksVUFBVSxZQUFZLE9BQU87QUFDL0IsMEJBQWdCLFVBQVUsV0FBVyxLQUFLLDJCQUEyQixzQ0FBc0MsQ0FBQztBQUM1RyxvQkFBVSxJQUFJO0FBQ2QsbUJBQVMsQ0FBQyxDQUFDO0FBQ1g7QUFBQSxRQUNGO0FBRUEsY0FBTSxTQUFTLE1BQU0sUUFBUSxVQUFVLEtBQUssSUFBSSxTQUFTLFFBQVEsQ0FBQztBQUNsRSxjQUFNLGdCQUNKLE9BQU8sS0FBSyxDQUFDLFVBQVUsU0FBUyxPQUFPLFlBQVksRUFBRSxZQUFZLE1BQU0sUUFBUSxLQUFLLEVBQUUsWUFBWSxDQUFDLEtBQUssT0FBTyxDQUFDO0FBRWxILFlBQUksQ0FBQyxlQUFlO0FBQ2xCLDBCQUFnQixLQUFLLDBCQUEwQiw4QkFBOEIsQ0FBQztBQUM5RSxvQkFBVSxJQUFJO0FBQ2QsbUJBQVMsQ0FBQyxDQUFDO0FBQ1g7QUFBQSxRQUNGO0FBRUEsY0FBTSxhQUFhLHNCQUFzQixhQUFhO0FBQ3RELGNBQU0sYUFBYSxNQUFNLFFBQVEsY0FBYyxLQUFLLElBQUksY0FBYyxRQUFRLENBQUMsR0FBRztBQUFBLFVBQUksQ0FBQyxVQUNyRixvQkFBb0IsS0FBSztBQUFBLFFBQzNCO0FBQ0Esa0JBQVUsVUFBVTtBQUNwQixpQkFBUyxTQUFTO0FBQUEsTUFDcEIsU0FBUyxPQUFPO0FBQ2QsWUFBSSxpQkFBaUIsaUJBQWlCLE1BQU0sV0FBVyxLQUFLO0FBQzFELHNCQUFZO0FBQ1o7QUFBQSxRQUNGO0FBRUE7QUFBQSxVQUNFLGlCQUFpQixRQUFRLE1BQU0sVUFBVSxLQUFLLDJCQUEyQixzQ0FBc0M7QUFBQSxRQUNqSDtBQUNBLGtCQUFVLElBQUk7QUFDZCxpQkFBUyxDQUFDLENBQUM7QUFBQSxNQUNiLFVBQUU7QUFDQSxxQkFBYSxLQUFLO0FBQUEsTUFDcEI7QUFBQSxJQUNGO0FBRUEsU0FBSyxXQUFXO0FBQUEsRUFDbEIsR0FBRyxDQUFDLGtCQUFrQixXQUFXLHdCQUF3QixjQUFjLGFBQWEsT0FBTyxDQUFDO0FBRTVGLCtCQUFVLE1BQU07QUFDZCxRQUFJLENBQUMsVUFBVSxVQUFXO0FBQzFCLDJCQUF1QixNQUFNO0FBQUEsRUFDL0IsR0FBRyxDQUFDLFFBQVEsd0JBQXdCLFNBQVMsQ0FBQztBQUU5QywrQkFBVSxNQUFNO0FBQ2QsUUFBSSxDQUFDLFVBQVc7QUFDaEIsUUFBSSxjQUFjO0FBQ2xCLFVBQU0sYUFBYSxJQUFJLGdCQUFnQjtBQUV2QyxVQUFNLDBCQUEwQixZQUFZO0FBQzFDLFVBQUk7QUFDRixjQUFNLE9BQU8sTUFBTSxtQ0FBbUM7QUFBQSxVQUNwRCx5QkFBeUI7QUFBQSxVQUN6QixRQUFRLFdBQVc7QUFBQSxRQUNyQixDQUFDO0FBQ0QsWUFBSSxZQUFhO0FBQ2pCLCtCQUF1QixTQUFTLElBQUksRUFBRSxZQUFZLENBQUM7QUFBQSxNQUNyRCxTQUFTLE9BQU87QUFDZCxZQUFJLGlCQUFpQixnQkFBZ0IsTUFBTSxTQUFTLGFBQWM7QUFBQSxNQUNwRTtBQUFBLElBQ0Y7QUFFQSxTQUFLLHdCQUF3QjtBQUM3QixXQUFPLE1BQU07QUFDWCxvQkFBYztBQUNkLGlCQUFXLE1BQU07QUFBQSxJQUNuQjtBQUFBLEVBQ0YsR0FBRyxDQUFDLFNBQVMsQ0FBQztBQUVkLFFBQU0sdUJBQW1CLHVCQUFRLE1BQU0sUUFBUSxXQUFXLENBQUMsTUFBTSxTQUFTLENBQUM7QUFDM0UsK0JBQVUsTUFBTTtBQUNkLDhCQUEwQixnQkFBZ0I7QUFDMUMsV0FBTyxNQUFNO0FBQ1gsa0NBQTRCO0FBQUEsSUFDOUI7QUFBQSxFQUNGLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztBQUVyQixRQUFNLGVBQWUsU0FBUyxRQUFRLE1BQU07QUFDNUMsUUFBTSxhQUFhLE9BQU8sUUFBUSx1QkFBdUIsV0FBVyxPQUFPLHFCQUFxQjtBQUNoRyxRQUFNLGtCQUFrQixlQUFlO0FBQ3ZDLFFBQU0sc0JBQXNCLGVBQWU7QUFDM0MsUUFBTSx1QkFBdUIsbUJBQW1CLFFBQVEsT0FBTztBQUMvRCxRQUFNLGNBQWMsdUJBQXVCO0FBQzNDLFFBQU0sc0JBQXNCLDZCQUE2QjtBQUFBLElBQ3ZEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxtQkFBbUIsUUFBUTtBQUFBLElBQzNCO0FBQUEsRUFDRixDQUFDO0FBQ0QsUUFBTSxtQkFBZSx1QkFBUSxNQUFNO0FBQ2pDLFFBQUksY0FBYztBQUNoQixhQUFPO0FBQUEsUUFDTCxpQkFBaUI7QUFBQSxRQUNqQixTQUFTO0FBQUEsUUFDVCxnQkFBZ0I7QUFBQSxRQUNoQixlQUFlLENBQUM7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFFQSxXQUFPLGdDQUFnQztBQUFBLE1BQ3JDO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLFFBQVE7QUFBQSxJQUNWLENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxxQkFBcUIsY0FBYyxxQkFBcUIsYUFBYSxVQUFVLENBQUM7QUFDcEYsUUFBTSw2QkFBNkIsZ0JBQWlCLENBQUMsdUJBQXVCLGFBQWEsb0JBQW9CO0FBQzdHLFFBQU0sOEJBQThCLENBQUMsZ0JBQWdCLGFBQWEsb0JBQW9CO0FBQ3RGLFFBQU0sb0JBQXFCLGdCQUFnQixvQkFBcUIsOEJBQThCO0FBQzlGLFFBQU0seUJBQXlCLENBQUMsZ0JBQWdCLGFBQWEsb0JBQW9CO0FBQ2pGLFFBQU0sZ0JBQWdCLG1CQUFtQjtBQUN6QyxRQUFNLFdBQVcsTUFBTSxTQUFTO0FBQ2hDLFFBQU0sb0JBQW9CLHlCQUF5QixTQUFTLFFBQVEsUUFBUSxHQUFHO0FBQUEsSUFDN0UsdUJBQXVCO0FBQUEsSUFDdkIsdUJBQXVCO0FBQUEsSUFDdkIsYUFBYTtBQUFBLElBQ2IsVUFBVTtBQUFBLEVBQ1osQ0FBQztBQUNELFFBQU0sdUJBQW1CLHVCQUFRLE1BQU0sdUJBQXVCLGlCQUFpQixHQUFHLENBQUMsaUJBQWlCLENBQUM7QUFDckcsUUFBTSw4QkFBMEIsdUJBQVEsTUFBTSxrQkFBa0IsS0FBSyxFQUFFLFlBQVksR0FBRyxDQUFDLGlCQUFpQixDQUFDO0FBQ3pHLFFBQU0sZ0NBQTRCLHVCQUFRLE1BQU0sU0FBUyxtQkFBbUIsRUFBRSxZQUFZLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztBQUNsSCxRQUFNLDJCQUEyQiw2QkFBNkI7QUFDOUQsUUFBTSxlQUFXLHVCQUFRLE1BQU07QUFDN0IsUUFBSSxPQUFPLGFBQWEsWUFBYSxRQUFPO0FBQzVDLFdBQU8sU0FBUyxTQUFTLGlCQUFpQixJQUFJLEtBQUs7QUFBQSxFQUNyRCxHQUFHLENBQUMsQ0FBQztBQUNMLFFBQU0sdUJBQW1CLHVCQUFRLE1BQU07QUFDckMsVUFBTSxhQUFhLGlCQUFpQixTQUFTLFFBQVEsV0FBVyxDQUFDO0FBQ2pFLFFBQUksV0FBWSxRQUFPLFVBQVUsVUFBVTtBQUMzQyxXQUFPLFVBQVUsb0JBQUksS0FBSyxDQUFDO0FBQUEsRUFDN0IsR0FBRyxDQUFDLFFBQVEsV0FBVyxDQUFDO0FBQ3hCLFFBQU0sdUJBQ0osYUFBYSw4QkFBOEIsNEJBQTRCLE1BQU0sNEJBQTRCO0FBQzNHLFFBQU0sZ0NBQ0osd0JBQXdCLENBQUMsa0JBQWtCLEtBQUssSUFDNUM7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLEVBQ0YsSUFDQTtBQUVOLFFBQU0sMEJBQTBCO0FBQ2hDLFFBQU0sOEJBQThCLGFBQWEsOEJBQThCLFlBQVk7QUFFM0YsK0JBQVUsTUFBTTtBQUNkLFFBQUksY0FBYztBQUNsQixRQUFJLGVBQXFEO0FBQ3pELFFBQUkseUJBQWlEO0FBRXJELFVBQU0sd0JBQXdCLE1BQU07QUFDbEMsVUFBSSxjQUFjO0FBQ2hCLHFCQUFhLFlBQVk7QUFDekIsdUJBQWU7QUFBQSxNQUNqQjtBQUNBLFVBQUksd0JBQXdCO0FBQzFCLCtCQUF1QixNQUFNO0FBQzdCLGlDQUF5QjtBQUFBLE1BQzNCO0FBQUEsSUFDRjtBQUVBLFFBQUksQ0FBQyxhQUFhLENBQUMsOEJBQThCLDZCQUE2QjtBQUM1RSwrQkFBeUIsS0FBSztBQUM5Qiw2QkFBdUIsRUFBRTtBQUN6QixvQ0FBOEIsS0FBSztBQUNuQyxtQ0FBNkIsRUFBRTtBQUMvQixzQ0FBZ0MsRUFBRTtBQUNsQyxrQ0FBNEIsRUFBRTtBQUM5QixvQ0FBOEIsRUFBRTtBQUNoQyxhQUFPLE1BQU07QUFDWCw4QkFBc0I7QUFBQSxNQUN4QjtBQUFBLElBQ0Y7QUFFQSxRQUFJLENBQUMsMkJBQTJCLENBQUMsMEJBQTBCO0FBQ3pELCtCQUF5QixLQUFLO0FBQzlCLDZCQUF1QixFQUFFO0FBQ3pCLG9DQUE4QixLQUFLO0FBQ25DLG1DQUE2QixFQUFFO0FBQy9CLHNDQUFnQyxFQUFFO0FBQ2xDLGtDQUE0QixFQUFFO0FBQzlCLG9DQUE4QixFQUFFO0FBQ2hDLGFBQU8sTUFBTTtBQUNYLDhCQUFzQjtBQUFBLE1BQ3hCO0FBQUEsSUFDRjtBQUVBLFFBQUksNEJBQTRCLDBCQUEwQjtBQUN4RCwyQkFBcUIsaUNBQWlDO0FBQ3RELG1DQUE2QixpQ0FBaUM7QUFDOUQsK0JBQXlCLEtBQUs7QUFDOUIsNkJBQXVCLEVBQUU7QUFDekIsb0NBQThCLEtBQUs7QUFDbkMsc0NBQWdDLEVBQUU7QUFDbEMsa0NBQTRCLEVBQUU7QUFDOUIsb0NBQThCLEVBQUU7QUFDaEMsYUFBTyxNQUFNO0FBQ1gsOEJBQXNCO0FBQUEsTUFDeEI7QUFBQSxJQUNGO0FBRUEsbUJBQWUsV0FBVyxZQUFZO0FBQ3BDLCtCQUF5QixJQUFJLGdCQUFnQjtBQUM3QywrQkFBeUIsSUFBSTtBQUM3Qiw2QkFBdUIsRUFBRTtBQUN6QixvQ0FBOEIsS0FBSztBQUNuQyxtQ0FBNkIsRUFBRTtBQUMvQixzQ0FBZ0MsRUFBRTtBQUNsQyxrQ0FBNEIsRUFBRTtBQUM5QixvQ0FBOEIsRUFBRTtBQUVoQyxVQUFJO0FBQ0YsY0FBTSxXQUFXLE1BQU07QUFBQSxVQUNyQjtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFlBQ0UseUJBQXlCO0FBQUEsWUFDekIsUUFBUSx1QkFBdUI7QUFBQSxVQUNqQztBQUFBLFFBQ0Y7QUFFQSxZQUFJLFlBQWE7QUFFakIsWUFBSSxDQUFDLFNBQVMsV0FBVyxDQUFDLFNBQVMsUUFBUSxDQUFDLE9BQU8sU0FBUyxPQUFPLFNBQVMsS0FBSyxJQUFJLENBQUMsR0FBRztBQUN2RiwwQ0FBZ0MsRUFBRTtBQUNsQyxzQ0FBNEIsRUFBRTtBQUM5Qix3Q0FBOEIsRUFBRTtBQUNoQztBQUFBLFlBQ0UsU0FBUyxTQUFTLE9BQU8sS0FBSyxLQUFLLDBDQUEwQyx1Q0FBdUM7QUFBQSxVQUN0SDtBQUNBLHdDQUE4QixJQUFJO0FBQ2xDO0FBQUEsUUFDRjtBQUlBLGNBQU0sMEJBQTBCLE9BQU8sU0FBUyxLQUFLLElBQUk7QUFDekQsY0FBTSxpQ0FBaUMsMEJBQTBCO0FBQ2pFLGNBQU0sd0JBQXdCLDZCQUE2Qiw4QkFBOEI7QUFDekYsY0FBTSx1QkFBdUIsNkJBQTZCLHVCQUF1QjtBQUNqRixxQ0FBNkIscUJBQXFCO0FBQ2xELHdDQUFnQyxvQkFBb0I7QUFDcEQsNkJBQXFCLHFCQUFxQjtBQUUxQyxjQUFNLG9CQUFvQixTQUFTLFNBQVMsS0FBSyxJQUFJLEtBQUs7QUFDMUQsY0FBTSxTQUFTLFNBQVMsU0FBUyxLQUFLLE1BQU07QUFDNUMsb0NBQTRCLGlCQUFpQjtBQUM3QyxzQ0FBOEIsTUFBTTtBQUNwQyxjQUFNLGdCQUFnQixnQ0FBZ0MsQ0FBQyxLQUFLLEtBQUssa0RBQWtELGNBQWM7QUFDakksY0FBTSxvQkFBb0IseUJBQXlCLG1CQUFtQixRQUFRLEtBQUs7QUFDbkYsY0FBTSwwQkFBMEIsU0FBUyxHQUFHLGFBQWEsSUFBSSxpQkFBaUIsS0FBSyxNQUFNLE1BQU0sR0FBRyxhQUFhLElBQUksaUJBQWlCO0FBQ3BJLCtCQUF1Qix1QkFBdUIsR0FBRyx1QkFBdUIsTUFBTSxvQkFBb0IsS0FBSyx1QkFBdUI7QUFDOUgsc0NBQThCLEtBQUs7QUFBQSxNQUNyQyxTQUFTLE9BQU87QUFDZCxZQUFJLFlBQWE7QUFDakIsWUFBSSxpQkFBaUIsZ0JBQWdCLE1BQU0sU0FBUyxhQUFjO0FBRWxFLFlBQUksaUJBQWlCLGVBQWU7QUFDbEMsY0FBSSxNQUFNLFdBQVcsS0FBSztBQUN4Qix5Q0FBNkIsRUFBRTtBQUMvQiw0Q0FBZ0MsRUFBRTtBQUNsQyx3Q0FBNEIsRUFBRTtBQUM5QiwwQ0FBOEIsRUFBRTtBQUNoQyxtQ0FBdUIsS0FBSyx1Q0FBdUMscUNBQXFDLENBQUM7QUFDekcsMENBQThCLElBQUk7QUFDbEM7QUFBQSxVQUNGO0FBRUEsY0FBSSxNQUFNLFdBQVcsT0FBTyxNQUFNLFdBQVcsS0FBSztBQUNoRCx5Q0FBNkIsRUFBRTtBQUMvQiw0Q0FBZ0MsRUFBRTtBQUNsQyx3Q0FBNEIsRUFBRTtBQUM5QiwwQ0FBOEIsRUFBRTtBQUNoQztBQUFBLGNBQ0UsU0FBUyxNQUFNLE9BQU8sS0FBSyxLQUFLLDBDQUEwQyx1Q0FBdUM7QUFBQSxZQUNuSDtBQUNBLDBDQUE4QixJQUFJO0FBQ2xDO0FBQUEsVUFDRjtBQUVBLHVDQUE2QixFQUFFO0FBQy9CLDBDQUFnQyxFQUFFO0FBQ2xDLHNDQUE0QixFQUFFO0FBQzlCLHdDQUE4QixFQUFFO0FBQ2hDO0FBQUEsWUFDRSxTQUFTLE1BQU0sT0FBTyxLQUFLLEtBQUssMENBQTBDLHVDQUF1QztBQUFBLFVBQ25IO0FBQ0Esd0NBQThCLElBQUk7QUFDbEM7QUFBQSxRQUNGO0FBRUEscUNBQTZCLEVBQUU7QUFDL0Isd0NBQWdDLEVBQUU7QUFDbEMsb0NBQTRCLEVBQUU7QUFDOUIsc0NBQThCLEVBQUU7QUFDaEMsK0JBQXVCLEtBQUssMENBQTBDLHVDQUF1QyxDQUFDO0FBQzlHLHNDQUE4QixJQUFJO0FBQUEsTUFDcEMsVUFBRTtBQUNBLFlBQUksQ0FBQyxhQUFhO0FBQ2hCLG1DQUF5QixLQUFLO0FBQUEsUUFDaEM7QUFBQSxNQUNGO0FBQUEsSUFDRixHQUFHLHlCQUF5QjtBQUU1QixXQUFPLE1BQU07QUFDWCxvQkFBYztBQUNkLDRCQUFzQjtBQUFBLElBQ3hCO0FBQUEsRUFDRixHQUFHO0FBQUEsSUFDRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCxRQUFNLHVCQUFtQiwyQkFBWSxNQUFNO0FBQ3pDLFFBQUksZ0JBQWdCLGFBQWEsQ0FBQyxRQUFRO0FBQ3hDO0FBQUEsSUFDRjtBQUVBLFFBQUksQ0FBQyxtQkFBbUI7QUFDdEIsa0JBQVk7QUFDWjtBQUFBLElBQ0Y7QUFFQSxrQkFBYyxFQUFFO0FBQ2hCLGlCQUFhLElBQUk7QUFDakIsMkJBQXVCLE1BQU07QUFDN0IsY0FBVSxLQUFLLHVDQUF1QyxpQkFBaUIsQ0FBQztBQUFBLEVBQzFFLEdBQUcsQ0FBQyxtQkFBbUIsUUFBUSx3QkFBd0IsY0FBYyxXQUFXLFdBQVcsQ0FBQztBQUU1RixRQUFNLHVCQUFtQiwyQkFBWSxNQUFNO0FBQ3pDLFFBQUksY0FBYztBQUNoQiwyQkFBcUIseUJBQXlCO0FBQUEsUUFDNUMsaUJBQWlCO0FBQUEsTUFDbkIsQ0FBQztBQUNEO0FBQUEsSUFDRjtBQUVBLFFBQUksQ0FBQyxVQUFXO0FBRWhCLGlCQUFhLEtBQUs7QUFDbEIsa0JBQWMsRUFBRTtBQUNoQiwyQkFBdUIsTUFBTTtBQUM3QixjQUFVLEtBQUssaUJBQWlCLFFBQVEsQ0FBQztBQUFBLEVBQzNDLEdBQUcsQ0FBQyxRQUFRLHdCQUF3QixjQUFjLFNBQVMsQ0FBQztBQUc1RCxRQUFNLGdDQUE0QiwyQkFBWSxNQUFNO0FBQ2xELFFBQUksQ0FBQyxrQkFBa0I7QUFDckIsa0JBQVk7QUFDWjtBQUFBLElBQ0Y7QUFFQSxRQUFJLGNBQWM7QUFDaEI7QUFBQSxJQUNGO0FBRUEseUJBQXFCLDBDQUEwQztBQUFBLE1BQzdELGlCQUFpQjtBQUFBLElBQ25CLENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxrQkFBa0IsY0FBYyxXQUFXLFdBQVcsQ0FBQztBQUczRCxRQUFNLCtCQUEyQiwyQkFBWSxNQUFNO0FBQ2pELFFBQUksQ0FBQyxXQUFXLENBQUMsd0JBQXdCO0FBQ3ZDLGtCQUFZO0FBQ1o7QUFBQSxJQUNGO0FBRUEsUUFBSSxjQUFjO0FBQ2hCO0FBQUEsSUFDRjtBQUVBLFVBQU0sWUFBWSwrQ0FBK0MsbUJBQW1CLE9BQU8sQ0FBQztBQUM1Rix5QkFBcUIsV0FBVztBQUFBLE1BQzlCLGlCQUFpQjtBQUFBLElBQ25CLENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyx3QkFBd0IsY0FBYyxXQUFXLGFBQWEsT0FBTyxDQUFDO0FBRzFFLFFBQU0sMkJBQXVCO0FBQUEsSUFDM0IsQ0FBQyxXQUEyQjtBQUMxQixVQUFJLENBQUMsV0FBVyxDQUFDLHdCQUF3QjtBQUN2QyxvQkFBWTtBQUNaO0FBQUEsTUFDRjtBQUVBLFVBQUksY0FBYztBQUNoQjtBQUFBLE1BQ0Y7QUFFQSxZQUFNLFFBQVEsSUFBSSxnQkFBZ0I7QUFBQSxRQUNoQztBQUFBLFFBQ0EsY0FBYztBQUFBLE1BQ2hCLENBQUM7QUFDRCwyQkFBcUIsbUJBQW1CLE1BQU0sU0FBUyxDQUFDLElBQUk7QUFBQSxRQUMxRCxpQkFBaUI7QUFBQSxNQUNuQixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsQ0FBQyx3QkFBd0IsY0FBYyxXQUFXLGFBQWEsT0FBTztBQUFBLEVBQ3hFO0FBRUEsUUFBTSxpQ0FBNkIsMkJBQVksTUFBTTtBQUNuRCx5QkFBcUIsS0FBSztBQUFBLEVBQzVCLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztBQUV6QixRQUFNLCtCQUEyQiwyQkFBWSxNQUFNO0FBQ2pELHlCQUFxQixNQUFNO0FBQUEsRUFDN0IsR0FBRyxDQUFDLG9CQUFvQixDQUFDO0FBRXpCLFFBQU0sNkJBQXlCLDJCQUFZLENBQUMsbUJBQTJCO0FBQ3JFLFVBQU0scUJBQXFCLFNBQVMsY0FBYztBQUNsRCxRQUFJLENBQUMsbUJBQW9CO0FBRXpCLFVBQU0sWUFBWSwyQ0FBMkMsbUJBQW1CLGtCQUFrQixDQUFDO0FBQ25HLHlCQUFxQixTQUFTO0FBQUEsRUFDaEMsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLDJCQUF1QjtBQUFBLElBQzNCLENBQ0UsV0FDQSxZQUtHO0FBQ0gsWUFBTSxhQUFhLFNBQVMsU0FBUztBQUNyQyxZQUFNLGNBQWMsU0FBUyxPQUFPO0FBQ3BDLFVBQUksQ0FBQyxjQUFjLENBQUMsWUFBYTtBQUVqQyxZQUFNLFdBQVcsU0FBUyxTQUFTLFNBQVMsU0FBUztBQUNyRCxZQUFNLFlBQVksK0NBQStDLG1CQUFtQixXQUFXLENBQUMsY0FBYyxtQkFBbUIsVUFBVSxDQUFDLEdBQUcsV0FBVyxTQUFTLFFBQVEsS0FBSyxFQUFFO0FBQ2xMLDJCQUFxQixXQUFXO0FBQUEsUUFDOUIsaUJBQWlCLFNBQVMsbUJBQW1CO0FBQUEsUUFDN0MsaUJBQWlCLFNBQVMsbUJBQW1CO0FBQUEsTUFDL0MsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLENBQUMsT0FBTztBQUFBLEVBQ1Y7QUFFQSxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLDZCQUE2QjtBQUFBLElBQzdCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGOzs7QUhub0JFLElBQUFDLHNCQUFBO0FBakJGLElBQU0sa0JBQWtCO0FBQ3hCLElBQU0sb0NBQW9DO0FBRTFDLElBQU0sYUFBYSxDQUFLLE9BQVksTUFBYyxhQUEwQjtBQUMxRSxNQUFJLENBQUMsTUFBTSxPQUFRLFFBQU8sQ0FBQztBQUMzQixRQUFNLFdBQVcsS0FBSyxJQUFJLEdBQUcsSUFBSTtBQUNqQyxRQUFNLFNBQVMsV0FBVyxLQUFLO0FBQy9CLFNBQU8sTUFBTSxNQUFNLE9BQU8sUUFBUSxRQUFRO0FBQzVDO0FBR0EsSUFBTSx5QkFBeUIsQ0FBQyxVQUE0QjtBQUMxRCxRQUFNLFNBQVMsT0FBTyxLQUFLO0FBQzNCLFNBQU8sT0FBTyxTQUFTLE1BQU0sS0FBSyxTQUFTO0FBQzdDO0FBRUEsSUFBTSxnQkFBZ0IsTUFDcEIsOENBQUMsU0FBSSxTQUFRLGFBQVksTUFBSyxRQUFPLFFBQU8sZ0JBQWUsYUFBYSxLQUFLLGVBQVksUUFBTyxXQUFVLFdBQ3hHO0FBQUEsK0NBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLCtIQUE4SDtBQUFBLEVBQ25MLDZDQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSx3Q0FBdUM7QUFBQSxFQUM1Riw2Q0FBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsNkJBQTRCO0FBQUEsRUFDakYsNkNBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLFlBQVc7QUFBQSxFQUNoRSw2Q0FBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsWUFBVztBQUFBLEdBQ2xFO0FBR0YsSUFBTSxpQkFBaUIsTUFDckIsNkNBQUMsU0FBSSxTQUFRLGFBQVksTUFBSyxRQUFPLFFBQU8sZ0JBQWUsYUFBYSxLQUFLLGVBQVksUUFBTyxXQUFVLFdBQ3hHLHVEQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSw2S0FBNEssR0FDbk87QUFHRixJQUFNLGNBQWMsTUFDbEIsOENBQUMsU0FBSSxTQUFRLGFBQVksTUFBSyxRQUFPLFFBQU8sZ0JBQWUsYUFBYSxLQUFLLGVBQVksUUFBTyxXQUFVLFdBQ3hHO0FBQUEsK0NBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLDBLQUF5SztBQUFBLEVBQzlOLDZDQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSwrREFBOEQ7QUFBQSxFQUNuSCw2Q0FBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsV0FBVTtBQUFBLEdBQ2pFO0FBSUssSUFBTSwwQkFBMEIsTUFBTTtBQUMzQywwQkFBd0I7QUFBQSxJQUN0QixPQUFPLFNBQVMsT0FBTyxpQkFBaUI7QUFBQSxJQUN4QyxVQUFVLFNBQVMsT0FBTyxpQkFBaUI7QUFBQSxJQUMzQyxTQUFTLFNBQVMsT0FBTyxnQkFBZ0I7QUFBQSxFQUMzQyxDQUFDO0FBQ0g7QUFHTyxJQUFNLHNDQUFzQyxNQUFNO0FBQ3ZELFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLElBQUksZUFBZTtBQUNuQixRQUFNLFlBQVksVUFBVSxxQkFBcUIsTUFBTTtBQUN2RCxRQUFNLG1CQUFtQixVQUFVLHFCQUFxQixLQUFLO0FBQzdELFFBQU0sVUFBVSxTQUFTLE9BQU8sb0JBQW9CO0FBQ3BELFFBQU0sWUFBWSxTQUFTLE9BQU8sc0JBQXNCLEVBQUUsWUFBWTtBQUN0RSxRQUFNLGVBQWUsY0FBYztBQUNuQyxRQUFNLGlDQUFpQyw2QkFBNkI7QUFBQSxJQUNsRTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxtQkFBbUI7QUFBQSxJQUNuQjtBQUFBLEVBQ0YsQ0FBQztBQUNELFFBQU0scUNBQXFDLG9CQUFvQixDQUFDO0FBQ2hFLFFBQU0sdUJBQW1CLHNCQUE4QixJQUFJO0FBQzNELFFBQU0sd0JBQW9CLHNCQUFPLEVBQUU7QUFDbkMsUUFBTSxxQkFBaUIsc0JBQWdDLElBQUk7QUFDM0QsUUFBTSxzQkFBa0Isc0JBQWdDLElBQUk7QUFDNUQsUUFBTSxDQUFDLDBCQUEwQiwyQkFBMkIsUUFBSSx3QkFBUyxLQUFLO0FBQzlFLFFBQU0sQ0FBQyx5QkFBeUIsMEJBQTBCLFFBQUksd0JBQVMsRUFBRTtBQUN6RSxRQUFNLENBQUMsa0NBQWtDLG1DQUFtQyxRQUFJLHdCQUFTLEtBQUs7QUFDOUYsUUFBTSxpQ0FBNkIsc0JBQU8sRUFBRTtBQUU1QyxRQUFNLHVCQUFtQjtBQUFBLElBQ3ZCLE9BQU87QUFBQSxNQUNMLE9BQU8sS0FBSyxzQkFBc0IsT0FBTztBQUFBLE1BQ3pDLE1BQU0sS0FBSyxxQkFBcUIsVUFBVTtBQUFBLE1BQzFDLE1BQU0sS0FBSyxxQkFBcUIsTUFBTTtBQUFBLE1BQ3RDLE1BQU0sS0FBSyxxQkFBcUIsTUFBTTtBQUFBLElBQ3hDO0FBQUEsSUFDQSxDQUFDO0FBQUEsRUFDSDtBQUVBLFFBQU0sY0FBYywyQkFBMkI7QUFBQSxJQUM3QztBQUFBLElBQ0Esa0JBQWtCO0FBQUEsSUFDbEI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLGFBQWE7QUFBQSxFQUNmLENBQUM7QUFFRCxRQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsSUFBSTtBQUVKLFFBQU0saUNBQWlDLG9CQUFvQixDQUFDO0FBQzVELFFBQU0saUNBQWlDLGFBQWE7QUFDcEQsUUFBTSxzQkFBc0IsYUFBYSxjQUFjLFNBQVM7QUFDaEUsUUFBTSxpQkFBaUIsYUFBYSxvQkFBb0I7QUFDeEQsUUFBTSxvQkFBb0IsT0FBTyxRQUFRLHVCQUF1QixXQUFXLE9BQU8scUJBQXFCO0FBQ3ZHLFFBQU0sMEJBQ0osc0JBQXNCLHFDQUFxQyxDQUFDO0FBQzlELFFBQU0sbUJBQW1CLENBQUMsaUJBQWlCLGtCQUFrQiwyQkFBMkIsY0FBYztBQUN0RyxRQUFNLHlCQUF5Qiw2QkFBNkIsZ0JBQWdCLENBQUMsQ0FBQztBQUM5RSxRQUFNLEVBQUUsK0JBQStCLElBQUksNEJBQTRCO0FBRXZFLFFBQU0sRUFBRSxPQUFPLGFBQWEsY0FBYyxjQUFjLElBQUksaUJBQWlCO0FBQUEsSUFDM0Usb0JBQW9CLEtBQUssZUFBZSxJQUFJO0FBQUEsSUFDNUMsbUJBQW1CLEtBQUssY0FBYyxRQUFRO0FBQUEsRUFDaEQsQ0FBQztBQUVELFFBQU0sa0NBQThCLDJCQUFZLE1BQU07QUFDcEQsK0JBQTJCLFVBQVU7QUFDckMsK0JBQTJCLEVBQUU7QUFDN0Isd0NBQW9DLEtBQUs7QUFBQSxFQUMzQyxHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0seUJBQXFCLDJCQUFZLE1BQU07QUFDM0MsZ0NBQTRCO0FBQzVCLGlCQUFhO0FBQUEsRUFDZixHQUFHLENBQUMsY0FBYywyQkFBMkIsQ0FBQztBQUU5QyxRQUFNLHlCQUFxQiwyQkFBWSxZQUFZO0FBQ2pELGtCQUFjLEVBQUU7QUFDaEIsVUFBTSxjQUFjO0FBQUEsTUFDbEI7QUFBQSxNQUNBLFNBQVMsQ0FBQyxRQUFRO0FBQ2hCLHNCQUFjLEdBQUc7QUFDakIsa0JBQVUsR0FBRztBQUFBLE1BQ2Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxNQUFNLGVBQWUsZUFBZSxTQUFTLENBQUM7QUFFbEQsUUFBTSxtQkFBbUIsS0FBSyxrQkFBa0IsU0FBUztBQUN6RCxRQUFNLGtCQUFrQixNQUFNLGNBQWMsS0FBSyxjQUFjLFFBQVE7QUFDdkUsUUFBTSxtQkFBbUIsT0FDckIsbUJBQ0EsQ0FBQyxRQUFRLGFBQ1AsS0FBSyxhQUFhLElBQUksSUFDckIsTUFBTSxlQUFlLEtBQUssZUFBZSxJQUFJO0FBRXBELFFBQU0sK0JBQTJCLDJCQUFZLE1BQU07QUFDakQsUUFBSSxDQUFDLFFBQVEsWUFBWTtBQUN2Qix5QkFBbUI7QUFDbkI7QUFBQSxJQUNGO0FBRUEsU0FBSyxtQkFBbUI7QUFBQSxFQUMxQixHQUFHLENBQUMsTUFBTSxvQkFBb0Isb0JBQW9CLFVBQVUsQ0FBQztBQUU3RCxRQUFNLG1CQUFlLHVCQUFRLE1BQU0sV0FBVyxPQUFPLFVBQVUsZUFBZSxHQUFHLENBQUMsVUFBVSxLQUFLLENBQUM7QUFDbEcsUUFBTSxpQkFBaUIsS0FBSyxNQUFNLE1BQU0sVUFBVSxLQUFLLGVBQWU7QUFDdEUsUUFBTSxzQkFBa0I7QUFBQSxJQUN0QixNQUNFLG9CQUFvQixRQUFRLGFBQWE7QUFBQSxNQUN2Qyx1QkFBdUI7QUFBQSxNQUN2Qix1QkFBdUI7QUFBQSxNQUN2QixhQUFhO0FBQUEsTUFDYixVQUFVO0FBQUEsSUFDWixDQUFDO0FBQUEsSUFDSCxDQUFDLFFBQVEsV0FBVztBQUFBLEVBQ3RCO0FBQ0EsUUFBTSx5QkFBeUIsTUFBTSxTQUFTLEtBQUssdUJBQXVCLFFBQVEsV0FBVztBQUM3RixRQUFNLDJCQUEyQixDQUFDO0FBRWxDLFFBQU0sRUFBRSxjQUFjLHdCQUF3QixhQUFhLElBQUksK0JBQStCO0FBQUEsSUFDNUY7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsY0FBYztBQUFBLElBQ2QsZ0JBQWdCO0FBQUEsSUFDaEI7QUFBQSxJQUNBO0FBQUEsSUFDQSxvQkFBb0IsU0FBUyxRQUFRLFlBQVk7QUFBQSxJQUNqRCxvQkFBb0IsU0FBUyxRQUFRLFFBQVE7QUFBQSxJQUM3QyxrQkFBa0I7QUFBQSxJQUNsQixnQkFBZ0I7QUFBQSxJQUNoQixrQkFBa0I7QUFBQSxJQUNsQixxQkFBcUI7QUFBQSxJQUNyQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLDJCQUEyQixRQUFRO0FBQUEsSUFDbkMseUJBQXlCLFFBQVE7QUFBQSxJQUNqQztBQUFBLElBQ0EsaUJBQWlCLENBQUMsbUJBQW1CO0FBQ25DLHdCQUFrQixVQUFVLFNBQVMsY0FBYztBQUFBLElBQ3JEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sMkJBQXVCO0FBQUEsSUFDM0IsT0FBTyxjQUFzQjtBQUMzQixZQUFNLGFBQWEsU0FBUyxTQUFTO0FBQ3JDLFVBQUksQ0FBQyxjQUFjLFFBQVEsMEJBQTBCO0FBQ25EO0FBQUEsTUFDRjtBQUVBLFVBQUksYUFBYSw0QkFBNEI7QUFDM0MsY0FBTSxLQUFLLE1BQU0sYUFBYTtBQUM5QixZQUFJLENBQUMsSUFBSTtBQUNQO0FBQUEsUUFDRjtBQUVBLDZCQUFxQixZQUFZO0FBQUEsVUFDL0IsTUFBTTtBQUFBLFVBQ04saUJBQWlCO0FBQUEsVUFDakIsaUJBQWlCO0FBQUEsUUFDbkIsQ0FBQztBQUNEO0FBQUEsTUFDRjtBQUVBLDJCQUFxQixVQUFVO0FBQUEsSUFDakM7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLHdCQUFvQiwyQkFBWSxNQUFNO0FBQzFDLFFBQUksY0FBYztBQUNoQixZQUFNLGlCQUFpQixTQUFTLGtCQUFrQixPQUFPO0FBQ3pELFVBQUksQ0FBQyxlQUFnQjtBQUNyQixrQ0FBNEIsSUFBSTtBQUNoQyw2QkFBdUIsY0FBYztBQUNyQztBQUFBLElBQ0Y7QUFFQSxzQkFBa0I7QUFBQSxFQUNwQixHQUFHLENBQUMsY0FBYyxzQkFBc0IsQ0FBQztBQUV6QyxRQUFNLDhCQUEwQjtBQUFBLElBQzlCLENBQUMsV0FBdUU7QUFDdEUsVUFBSSxDQUFDLHdCQUF3QjtBQUMzQjtBQUFBLE1BQ0Y7QUFFQSxZQUFNLGNBQWMsS0FBSyxPQUFPLFVBQVUsT0FBTyxRQUFRO0FBQ3pELFlBQU0scUJBQ0osUUFBUSx1QkFBdUIsUUFBUSxRQUFRLHVCQUF1QixTQUNsRSxLQUFLLGlCQUFpQixTQUFTLElBQy9CLHNCQUFzQixPQUFPLGtCQUFrQjtBQUNyRCxZQUFNLGtCQUFrQixzQkFBc0IsT0FBTyxVQUFVO0FBQy9ELFlBQU0sb0JBQW9CO0FBQUEsUUFDeEI7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGLEVBQUUsUUFBUSxRQUFRLElBQUk7QUFDdEIsWUFBTSxpQkFBaUIsU0FBUyxRQUFRLGlCQUFpQjtBQUN6RCxpQ0FBMkIsVUFBVTtBQUNyQyxpQ0FBMkIsY0FBYztBQUN6QywwQ0FBb0MsSUFBSTtBQUV4QyxrQkFBWTtBQUFBLFFBQ1YsT0FBTztBQUFBLFFBQ1AsU0FBUztBQUFBLFFBQ1QsYUFBYTtBQUFBLFFBQ2IsV0FBVyxZQUFZO0FBQ3JCLGdCQUFNLEtBQUssTUFBTTtBQUFBLFlBQ2YsT0FBTztBQUFBLFlBQ1A7QUFBQSxZQUNBLDJCQUEyQjtBQUFBLFVBQzdCO0FBQ0EsY0FBSSxJQUFJO0FBQ04sMkNBQStCO0FBQy9CLHdDQUE0QjtBQUM1Qix5QkFBYTtBQUNiLDhCQUFrQjtBQUFBLFVBQ3BCO0FBQ0EsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLHFDQUFtQztBQUFBLElBQ2pDLE1BQU0sUUFBUTtBQUFBLElBQ2QsV0FBVyxNQUFNO0FBQUEsSUFDakI7QUFBQSxJQUNBO0FBQUEsSUFDQSxZQUFZO0FBQUEsSUFDWixVQUFVO0FBQUEsSUFDVixjQUFjO0FBQUEsSUFDZCxnQkFBZ0I7QUFBQSxJQUNoQixrQkFBa0I7QUFBQSxJQUNsQixrQkFBa0I7QUFBQSxJQUNsQixnQkFBZ0I7QUFBQSxJQUNoQixrQkFBa0I7QUFBQSxJQUNsQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLGVBQWU7QUFBQSxJQUNmLGlCQUFpQixNQUFNO0FBQ3JCLHFDQUErQjtBQUMvQiwyQkFBcUIsdUJBQXVCO0FBQUEsSUFDOUM7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sMkJBQXVCLDJCQUFZLENBQUMsV0FBK0I7QUFDdkUsVUFBTSxPQUFPO0FBQ2IsUUFBSSxDQUFDLFFBQVEsT0FBTyxLQUFLLFlBQVksV0FBWSxRQUFPO0FBQ3hELFVBQU0sT0FBTyxLQUFLLFFBQXFCLDJCQUEyQjtBQUNsRSxRQUFJLENBQUMsS0FBTSxRQUFPO0FBQ2xCLFFBQUksQ0FBQyxpQkFBaUIsU0FBUyxTQUFTLElBQUksRUFBRyxRQUFPO0FBQ3RELFdBQU87QUFBQSxFQUNULEdBQUcsQ0FBQyxDQUFDO0FBRUwseUJBQXVCO0FBQUEsSUFDckIsY0FBYztBQUFBLElBQ2Q7QUFBQSxJQUNBLE9BQU87QUFBQSxJQUNQO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSxrQkFBa0IsK0JBQStCO0FBQUEsSUFDckQsU0FBUyxTQUFTLFFBQVEsZ0JBQWdCLE9BQU87QUFBQSxJQUNqRCxXQUFXO0FBQUEsSUFDWCxjQUFjLFNBQVMsUUFBUSxZQUFZO0FBQUEsSUFDM0Msa0JBQWtCLENBQUMsZ0JBQWdCLGFBQWE7QUFBQSxJQUNoRDtBQUFBLElBQ0EsZUFBZSxDQUFDO0FBQUEsSUFDaEIsYUFBYTtBQUFBLElBQ2IsYUFBYSxDQUFDLFdBQVc7QUFDdkIsWUFBTSxnQkFBZ0IsU0FBUyxRQUFRLE1BQU07QUFDN0MsVUFBSSxDQUFDLGVBQWU7QUFDbEIsMEJBQWtCO0FBQ2xCO0FBQUEsTUFDRjtBQUVBLFVBQUksUUFBUSxrQkFBa0IsTUFBTTtBQUNsQywwQkFBa0I7QUFDbEI7QUFBQSxNQUNGO0FBRUEsWUFBTSxpQkFBaUIsU0FBUyxRQUFRLGdCQUFnQixPQUFPO0FBQy9ELFlBQU0sUUFBUSxJQUFJLGdCQUFnQjtBQUFBLFFBQ2hDLFFBQVE7QUFBQSxRQUNSLE1BQU07QUFBQSxRQUNOLFFBQVE7QUFBQSxNQUNWLENBQUM7QUFDRCxVQUFJLGdCQUFnQjtBQUNsQix1Q0FBK0I7QUFBQSxVQUM3QixRQUFRO0FBQUEsVUFDUixRQUFRO0FBQUEsVUFDUixTQUFTO0FBQUEsUUFDWCxDQUFDO0FBQ0QsY0FBTSxJQUFJLFdBQVcsY0FBYztBQUFBLE1BQ3JDO0FBQ0EsMkJBQXFCLHdCQUF3QixNQUFNLFNBQVMsQ0FBQyxFQUFFO0FBQUEsSUFDakU7QUFBQSxFQUNGLENBQUM7QUFFRCxRQUFNLG1CQUFlO0FBQUEsSUFDbkIsTUFBTTtBQUFBLE1BQ0o7QUFBQSxRQUNFLElBQUk7QUFBQSxRQUNKLE9BQU8sS0FBSywrQkFBK0IsY0FBYztBQUFBLFFBQ3pELE1BQU0sNkNBQUMsaUJBQWM7QUFBQSxRQUNyQixTQUFTLGdCQUFnQjtBQUFBLE1BQzNCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsSUFBSTtBQUFBLFFBQ0osT0FBTyxLQUFLLGdDQUFnQyxpQkFBaUI7QUFBQSxRQUM3RCxNQUFNLDZDQUFDLGtCQUFlO0FBQUEsUUFDdEIsU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsUUFDRSxJQUFJO0FBQUEsUUFDSixPQUFPLEtBQUssNkJBQTZCLGFBQWE7QUFBQSxRQUN0RCxNQUFNLDZDQUFDLGVBQVk7QUFBQSxRQUNuQixTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0Y7QUFBQSxJQUNBLENBQUMsMEJBQTBCLDBCQUEwQixnQkFBZ0IsZ0JBQWdCO0FBQUEsRUFDdkY7QUFFQSxRQUFNLHNCQUNKLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLDRCQUE0QixDQUFDLGdCQUFnQixhQUFhLGNBQWMsU0FBUztBQUNuSCxRQUFNLFVBQVUsQ0FBQyxnQkFBZ0IsYUFBYTtBQUM5QyxRQUFNLDBCQUEwQixTQUFTLFFBQVEsaUJBQWlCLEVBQUUsS0FBSyxFQUFFLFNBQVM7QUFDcEYsUUFBTSxvQkFBdUMsMEJBQTBCLFNBQVM7QUFDaEYsUUFBTSxZQUFZLG1DQUNoQiw4Q0FBQyxTQUFJLFdBQVUsZUFDYjtBQUFBLGlEQUFDLFdBQU0sV0FBVSw0QkFDZCxlQUFLLHFDQUFxQyxnQkFBZ0IsR0FDN0Q7QUFBQSxJQUNBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxXQUFVO0FBQUEsUUFDVixNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxVQUFVLENBQUMsVUFBVTtBQUNuQixnQkFBTSxZQUFZLE1BQU0sT0FBTyxTQUFTO0FBQ3hDLHFDQUEyQixVQUFVO0FBQ3JDLHFDQUEyQixTQUFTO0FBQUEsUUFDdEM7QUFBQSxRQUNBLGNBQVksS0FBSyxxQ0FBcUMsZ0JBQWdCO0FBQUE7QUFBQSxJQUN4RTtBQUFBLEtBQ0YsSUFDRTtBQUVKLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxzQkFBc0I7QUFBQSxJQUN0QjtBQUFBLElBQ0E7QUFBQSxJQUNBLGNBQWM7QUFBQSxFQUNoQjtBQUNGOzs7QVJ6Zk0sSUFBQUMsc0JBQUE7QUFwRE4sSUFBTSxvQ0FBb0M7QUFDMUMsSUFBTSwwQkFBMEI7QUFFaEMsSUFBTSxnQ0FBZ0MsTUFBTTtBQUMxQyxRQUFNLGFBQWEsb0NBQW9DO0FBQ3ZELFFBQU0sRUFBRSxpQkFBaUIsZ0JBQWdCLElBQUksNEJBQTRCO0FBRXpFLFFBQU0sZ0NBQWdDLGNBQUFDLFFBQU0sWUFBWSxNQUFNO0FBQzVELFVBQU0sY0FBYyxnQkFBZ0I7QUFDcEMsUUFBSSxDQUFDLFlBQWE7QUFDbEIsb0JBQWdCLFdBQVc7QUFBQSxFQUM3QixHQUFHLENBQUMsaUJBQWlCLGVBQWUsQ0FBQztBQUVyQyxnQkFBQUEsUUFBTSxVQUFVLE1BQU07QUFDcEIsVUFBTSxhQUFhLFNBQVMsZUFBZSxlQUFlO0FBQzFELFFBQUksQ0FBQyxXQUFZO0FBRWpCLGVBQVcsYUFBYSxpQkFBaUIsdUJBQXVCO0FBRWhFLFdBQU8sTUFBTTtBQUNYLGlCQUFXLGdCQUFnQixlQUFlO0FBQUEsSUFDNUM7QUFBQSxFQUNGLEdBQUcsQ0FBQyxDQUFDO0FBRUwsZ0JBQUFBLFFBQU0sVUFBVSxNQUFNO0FBQ3BCLFVBQU0sbUJBQW1CLENBQUMsVUFBVTtBQUNsQyxVQUFJLE9BQU8sU0FBUyxNQUFNLE1BQU0sWUFBWSxNQUFNO0FBQ2hEO0FBQUEsTUFDRjtBQUVBLFlBQU0sd0JBQXdCLE1BQU07QUFDbEMsc0NBQThCO0FBQzlCLGVBQU8saUNBQWlDO0FBQ3hDLGVBQU8sU0FBUyxRQUFRLHVCQUF1QjtBQUFBLE1BQ2pEO0FBRUEsVUFBSSxPQUFPLE9BQU8sMkJBQTJCLFlBQVk7QUFDdkQsZUFBTyx1QkFBdUIscUJBQXFCO0FBQ25EO0FBQUEsTUFDRjtBQUVBLDRCQUFzQjtBQUFBLElBQ3hCO0FBRUEsV0FBTyxpQkFBaUIsWUFBWSxnQkFBZ0I7QUFDcEQsV0FBTyxNQUFNO0FBQ1gsYUFBTyxvQkFBb0IsWUFBWSxnQkFBZ0I7QUFBQSxJQUN6RDtBQUFBLEVBQ0YsR0FBRyxDQUFDLDZCQUE2QixDQUFDO0FBRWxDLFNBQ0UsOENBQUMsU0FBSSxXQUFVLGFBQ2I7QUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsT0FBTyxXQUFXO0FBQUEsUUFDbEIsWUFBWSxXQUFXO0FBQUEsUUFDdkIsUUFBUSxXQUFXO0FBQUEsUUFDbkIsTUFBTSxXQUFXO0FBQUEsUUFDakIsMEJBQTBCLFdBQVc7QUFBQSxRQUNyQyxrQkFBa0IsV0FBVztBQUFBLFFBQzdCLGlCQUFpQixXQUFXO0FBQUEsUUFDNUIsa0JBQWtCLFdBQVc7QUFBQSxRQUM3QixXQUFXLFdBQVc7QUFBQSxRQUN0QixnQkFBZ0IsV0FBVztBQUFBLFFBQzNCLGlCQUFpQixXQUFXO0FBQUEsUUFDNUIsa0JBQWtCLFdBQVcsZ0JBQWdCO0FBQUEsUUFDN0MsaUJBQWlCLFdBQVcsZ0JBQWdCO0FBQUEsUUFDNUMsNEJBQTRCLFdBQVcsZ0JBQWdCO0FBQUEsUUFDdkQsMkJBQTJCLFdBQVcsZ0JBQWdCO0FBQUEsUUFDdEQsc0JBQXNCLFdBQVcsZ0JBQWdCO0FBQUEsUUFDakQseUJBQXlCLFdBQVcsZ0JBQWdCO0FBQUEsUUFDcEQsc0JBQXNCLFdBQVcsZ0JBQWdCO0FBQUEsUUFDakQsc0JBQXNCLFdBQVcsZ0JBQWdCO0FBQUEsUUFDakQsdUJBQXVCLFdBQVcsZ0JBQWdCO0FBQUEsUUFDbEQseUJBQXlCLFdBQVcsZ0JBQWdCO0FBQUEsUUFDcEQsV0FBVyxXQUFXO0FBQUEsUUFDdEIsVUFBVSxXQUFXO0FBQUEsUUFDckIsc0JBQXNCLENBQUMsU0FBUztBQUM5QixlQUFLLFdBQVcsZ0JBQWdCLG1CQUFtQixNQUFNLFFBQVE7QUFBQSxRQUNuRTtBQUFBLFFBQ0EsdUJBQXVCLENBQUMsU0FBUztBQUMvQixlQUFLLFdBQVcsZ0JBQWdCLG1CQUFtQixNQUFNLFNBQVM7QUFBQSxRQUNwRTtBQUFBLFFBQ0Esb0JBQW9CLE1BQU07QUFDeEIsZUFBSyxXQUFXLGdCQUFnQixpQkFBaUIsV0FBVyxlQUFlLE9BQU87QUFBQSxRQUNwRjtBQUFBLFFBQ0EscUJBQXFCLE1BQU0sV0FBVyxnQkFBZ0Isa0JBQWtCLFdBQVcsZ0JBQWdCLE9BQU87QUFBQSxRQUMxRyxxQkFBcUIsV0FBVyxnQkFBZ0I7QUFBQSxRQUNoRCxzQkFBc0IsTUFBTTtBQUMxQixlQUFLLFdBQVcsZ0JBQWdCLG1CQUFtQjtBQUFBLFFBQ3JEO0FBQUEsUUFDQSxxQkFBcUIsV0FBVyxnQkFBZ0I7QUFBQSxRQUNoRCx5QkFBeUIsV0FBVyxnQkFBZ0I7QUFBQTtBQUFBLElBQ3REO0FBQUEsSUFFQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsV0FBVTtBQUFBLFFBQ1YsT0FBTyxFQUFFLFNBQVMsV0FBVyxhQUFhLFdBQVcsMkJBQTJCLFNBQVMsT0FBTztBQUFBLFFBRWhHO0FBQUEsdURBQUMsU0FBSSxXQUFVLHVCQUFzQixTQUFRLGFBQVksTUFBSyxVQUFTLGNBQVksS0FBSyxrQkFBa0IsU0FBUyxHQUNqSCx1REFBQyxZQUFPLFdBQVUsdUJBQXNCLElBQUcsTUFBSyxJQUFHLE1BQUssR0FBRSxLQUFJLGFBQVksS0FBSSxHQUNoRjtBQUFBLFVBQ0MsS0FBSyxrQkFBa0IsU0FBUztBQUFBO0FBQUE7QUFBQSxJQUNuQztBQUFBLElBRUMsV0FBVyxlQUFlLDZDQUFDLFNBQUksV0FBVSxlQUFlLHFCQUFXLGNBQWEsSUFBUztBQUFBLElBRXpGLENBQUMsV0FBVyxhQUFhLENBQUMsV0FBVyw0QkFBNEIsQ0FBQyxXQUFXLGdCQUFnQixXQUFXLFNBQ3ZHO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxjQUFjLFdBQVc7QUFBQSxRQUN6QixXQUFXLFdBQVc7QUFBQSxRQUN0QixxQkFBcUIsV0FBVztBQUFBLFFBQ2hDLG1CQUFtQixXQUFXO0FBQUEsUUFDOUIsUUFBUSxXQUFXO0FBQUEsUUFDbkIsY0FBYyxXQUFXO0FBQUEsUUFDekIseUJBQXlCLFdBQVc7QUFBQSxRQUNwQyw2QkFBNkIsV0FBVztBQUFBLFFBQ3hDLHlCQUF5QixXQUFXO0FBQUEsUUFDcEMsMEJBQTBCLFdBQVc7QUFBQSxRQUNyQyw2QkFBNkIsV0FBVztBQUFBLFFBQ3hDLGtCQUFrQixXQUFXO0FBQUEsUUFDN0IsbUJBQW1CLFdBQVc7QUFBQSxRQUM5QiwrQkFBK0IsV0FBVztBQUFBLFFBQzFDLGlCQUFpQixXQUFXO0FBQUEsUUFDNUIsa0JBQWtCLFdBQVc7QUFBQSxRQUM3QixnQkFBZ0IsV0FBVztBQUFBLFFBQzNCLG1CQUFtQixXQUFXO0FBQUEsUUFDOUIsbUJBQW1CLFdBQVc7QUFBQSxRQUM5Qiw4QkFBOEIsV0FBVztBQUFBLFFBQ3pDLDBCQUEwQixXQUFXO0FBQUEsUUFDckMsNEJBQTRCLFdBQVc7QUFBQSxRQUN2QywwQkFBMEIsV0FBVztBQUFBLFFBQ3JDLHdCQUF3QixXQUFXO0FBQUEsUUFDbkMsMkJBQTJCLFdBQVc7QUFBQSxRQUN0QywyQkFBMkIsV0FBVztBQUFBO0FBQUEsSUFDeEMsSUFDRTtBQUFBLElBRUgsQ0FBQyxXQUFXLGdCQUFnQixDQUFDLFdBQVcsYUFBYSxDQUFDLFdBQVcsNEJBQTRCLENBQUMsV0FBVyxlQUN4RztBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsY0FBYyxXQUFXO0FBQUEsUUFDekIsY0FBYyxTQUFTLFdBQVcsUUFBUSxZQUFZO0FBQUEsUUFDdEQsZ0JBQWdCLFdBQVc7QUFBQSxRQUMzQixVQUFVLFdBQVc7QUFBQSxRQUNyQixZQUFZLEtBQUssdUJBQXVCLE9BQU87QUFBQSxRQUMvQyxXQUFXLEtBQUsseUJBQXlCLGtDQUFrQztBQUFBLFFBQzNFLGtCQUFrQixXQUFXO0FBQUEsUUFDN0IsY0FBYyxXQUFXO0FBQUEsUUFDekIsa0JBQWtCLFdBQVc7QUFBQSxRQUM3QixZQUFZLFdBQVc7QUFBQTtBQUFBLElBQ3pCLElBQ0U7QUFBQSxJQUVILFdBQVcsc0JBQ1Y7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFNBQVMsV0FBVyxhQUFhO0FBQUEsUUFDakMsTUFBTSxXQUFXLFFBQVEsV0FBVztBQUFBLFFBQ3BDLFVBQVUsV0FBVztBQUFBLFFBQ3JCLGVBQWUsV0FBVztBQUFBO0FBQUEsSUFDNUIsSUFDRTtBQUFBLElBRUgsV0FBVyxVQUNWO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxXQUFXLEtBQUssNkJBQTZCLHFCQUFrQjtBQUFBLFFBQy9ELE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLFFBQVEsV0FBVyxzQkFBc0Isb0NBQW9DO0FBQUEsUUFDN0UsZUFBZSxLQUFLLDZCQUE2QixxQkFBa0I7QUFBQSxRQUNuRSxXQUFXLFdBQVc7QUFBQTtBQUFBLElBQ3hCLElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFHQSxJQUFNLHlCQUF5QixNQUFNO0FBQ25DLFNBQ0UsNkNBQUMsZ0NBQXFCLHlCQUF1QixNQUMzQyx1REFBQyxpQ0FBOEIsR0FDakM7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLDBCQUF3QjtBQUN4QixRQUFNLFNBQVMsU0FBUyxlQUFlLDJCQUEyQjtBQUNsRSxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLDBCQUF1QixDQUFFO0FBQ3JEO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxpQ0FBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAicmVzcG9uc2UiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiXQp9Cg==
