import {
  useExpenseSheetsFilterCache
} from "./chunks/chunk-QHPAIVPL.js";
import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-JAUOKSPC.js";
import {
  ExpenseQuickTicketProgressOverlay_default,
  PageBottomActionButton,
  PageBottomActions_default,
  TICKET_IMAGE_ACCEPT_ATTRIBUTE,
  useExpenseSheetQuickTicketFlow
} from "./chunks/chunk-TJ3YOGDE.js";
import {
  DEFAULT_EXPENSE_STATUS_FILTER,
  getExpenseStatusLabel
} from "./chunks/chunk-2BH5SUTF.js";
import "./chunks/chunk-BU755TFH.js";
import "./chunks/chunk-YMDESVRK.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseCurrencyFlagIcon_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-IB6JTALH.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-6TVWMV24.js";
import {
  CompactPagination_default,
  FloatingActionButton_default,
  useTimelineCardEffects
} from "./chunks/chunk-MYQREIJ7.js";
import {
  useOutsideClick
} from "./chunks/chunk-HF2ANVLM.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-FRTU3UIU.js";
import "./chunks/chunk-4BE3ZFCK.js";
import {
  isManagingOtherExpenseRecord,
  resolveExpenseSheetDetailPolicy,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-5LXV4724.js";
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
} from "./chunks/chunk-FJXF5IDK.js";
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
} from "./chunks/chunk-5YP53PRM.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-PHLRNKZH.js";
import {
  getExpenseScopeToken
} from "./chunks/chunk-SRZDJTMJ.js";
import "./chunks/chunk-ZBKHPZJX.js";
import {
  canAccess,
  classNames,
  showPermissionModal
} from "./chunks/chunk-EGSPAV7B.js";
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
  interaction,
  currencyState,
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
}) => {
  const { isEditing, canEditHeaderFields } = interaction;
  const { isForeignCurrency, isCurrencyLockedByLines, isExchangeRateLockedByLines, showExchangeRate } = currencyState;
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
              value: formatAmountWithCurrency(exchangeRateReferenceAmount, baseCurrencyCode),
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
  mode,
  currencyLocks,
  header,
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
  const projectLabel = indT("ExpenseSheets_Field_Project", "Project");
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("section", { className: "space-y-0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ExpenseSectionDivider_default, { label: linesLabel, className: "expense-section-divider--spaced" }),
    visibleLines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "timeline-box timeline-empty", "data-empty-text": emptyText }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { ref: containerRef, className: "timeline-box", children: visibleLines.map((line, index) => {
      const lineId = safeText(line.lineRecId);
      const description = safeText(line.description);
      const amountText = formatAmountWithCurrency(line.amount ?? null, currencyCode);
      const linkedTicketFileId = safeText(line.fileId);
      const projectId = safeText(line.projId);
      const projectSubtitle = projectId ? `${projectLabel}: ${projectId}` : "";
      const dateParts = formatExpenseDateParts(safeText(line.transDate), document?.documentElement?.lang || "es-ES");
      const ticketStatusIcon = linkedTicketFileId ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "size-4",
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
          subtitle: projectSubtitle,
          titleClassName: "timeline-name expense-line-card__title",
          subtitleClassName: "expense-sheet-card__subtitle expense-line-card__meta",
          statusIcon: ticketStatusIcon,
          statusIconClassName: "expense-line-card__ticket-icon",
          statusLabel: linkedTicketFileId || void 0
        }
      ) }, lineId || `${safeText(line.transDate)}-${description}-${amountText}-${projectId}`);
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
var NewTicketIcon = () => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true", className: "size-5", children: [
  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 20h-5a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v2" }),
  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14.362 11.15a3 3 0 1 0 -4.144 4.263" }),
  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 21v-4a2 2 0 1 1 4 0v4" }),
  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 19h4" }),
  /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 15v6" })
] });
var LinkTicketIcon = () => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true", className: "size-5", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" }) });
var NewLineIcon = () => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true", className: "size-5", children: [
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
    () => formatAmountWithCurrency(header?.totalAmount ?? null, safeText(header?.currencyCode)),
    [header?.currencyCode, header?.totalAmount]
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
      saveExpenseSheetCreatedReturnContext({
        sheetId: createdSheetId
      });
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
  const { currentAxUserId } = useAuthContext();
  const { readCachedState, saveCachedState } = useExpenseSheetsFilterCache();
  const createdSheetReturnIdRef = import_react6.default.useRef("");
  import_react6.default.useEffect(() => {
    const createdContext = consumeExpenseSheetCreatedReturnContext(controller.sheetId);
    createdSheetReturnIdRef.current = createdContext?.sheetId || "";
  }, [controller.sheetId]);
  const prepareCreatedSheetReturnState = import_react6.default.useCallback(() => {
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
  const rearmExpenseSheetsReturnState = import_react6.default.useCallback(() => {
    if (prepareCreatedSheetReturnState()) {
      return;
    }
    const cachedState = readCachedState();
    if (!cachedState) return;
    saveCachedState(cachedState);
  }, [prepareCreatedSheetReturnState, readCachedState, saveCachedState]);
  import_react6.default.useEffect(() => {
    const backButton = document.getElementById("globalBackBtn");
    if (!backButton) return;
    backButton.setAttribute("data-back-url", EXPENSE_SHEETS_LIST_URL);
    return () => {
      backButton.removeAttribute("data-back-url");
    };
  }, []);
  import_react6.default.useEffect(() => {
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
  const rootEl = document.getElementById("expense-sheet-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ExpenseSheetDetailPage, {}));
};
mountWhenDocumentReady(mount);
var ExpenseSheetDetailPage_default = ExpenseSheetDetailPage;
export {
  ExpenseSheetDetailPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvRXhwZW5zZVNoZWV0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvbi50c3giLCAiLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9JbmZvUG9wb3Zlckljb25CdXR0b24udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29uc3RhbnRzL2V4Y2hhbmdlUmF0ZUVudHJ5TW9kZUNhdGFsb2cudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VTaGVldEhlYWRlckZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlTGluZXNUaW1lbGluZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC9FeHBlbnNlU2hlZXREZXRhaWxPdmVybGF5cy50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRyb2xsZXIudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XHJcbmltcG9ydCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nQWN0aW9uQnV0dG9uLnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VBdXRoQ29udGV4dCB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlU2hlZXRIZWFkZXJGb3JtLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZUxpbmVzVGltZWxpbmUgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZUxpbmVzVGltZWxpbmUudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25CYXIgZnJvbSBcIi4vRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXMgZnJvbSBcIi4vRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXMudHN4XCI7XHJcbmltcG9ydCB7IGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoLCB1c2VFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udHJvbGxlciB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250cm9sbGVyLnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcclxuaW1wb3J0IHsgREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VTdGF0dXNDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0LCBzdGFydE9mRGF5LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgY29uc3VtZUV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZSB9IGZyb20gXCIuLi9saXN0L3VzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZS50c1wiO1xyXG5cclxuY29uc3QgREVUQUlMX0ZBQl9CT1RUT01fV0lUSF9BQ1RJT05fQkFSID0gMTc2O1xyXG5jb25zdCBFWFBFTlNFX1NIRUVUU19MSVNUX1VSTCA9IFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXRzXCI7XHJcblxyXG5jb25zdCBFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udGVudCA9ICgpID0+IHtcclxuICBjb25zdCBjb250cm9sbGVyID0gdXNlRXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRyb2xsZXIoKTtcclxuICBjb25zdCB7IGN1cnJlbnRBeFVzZXJJZCB9ID0gdXNlQXV0aENvbnRleHQoKTtcclxuICBjb25zdCB7IHJlYWRDYWNoZWRTdGF0ZSwgc2F2ZUNhY2hlZFN0YXRlIH0gPSB1c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUoKTtcclxuICBjb25zdCBjcmVhdGVkU2hlZXRSZXR1cm5JZFJlZiA9IFJlYWN0LnVzZVJlZihcIlwiKTtcclxuXHJcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGNyZWF0ZWRDb250ZXh0ID0gY29uc3VtZUV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0KGNvbnRyb2xsZXIuc2hlZXRJZCk7XHJcbiAgICBjcmVhdGVkU2hlZXRSZXR1cm5JZFJlZi5jdXJyZW50ID0gY3JlYXRlZENvbnRleHQ/LnNoZWV0SWQgfHwgXCJcIjtcclxuICB9LCBbY29udHJvbGxlci5zaGVldElkXSk7XHJcblxyXG4gIGNvbnN0IHByZXBhcmVDcmVhdGVkU2hlZXRSZXR1cm5TdGF0ZSA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IGNyZWF0ZWRTaGVldElkID0gc2FmZVRleHQoY3JlYXRlZFNoZWV0UmV0dXJuSWRSZWYuY3VycmVudCk7XHJcbiAgICBpZiAoIWNyZWF0ZWRTaGVldElkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xyXG4gICAgY29uc3QgZnJvbURhdGUgPSBuZXcgRGF0ZSh0b2RheSk7XHJcbiAgICBmcm9tRGF0ZS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDg5KTtcclxuXHJcbiAgICBzYXZlQ2FjaGVkU3RhdGUoe1xyXG4gICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgZnJvbURhdGU6IHRvSXNvRGF0ZShmcm9tRGF0ZSksXHJcbiAgICAgICAgdG9EYXRlOiB0b0lzb0RhdGUodG9kYXkpLFxyXG4gICAgICAgIHByb2plY3RJZDogXCJcIixcclxuICAgICAgICBob2phR2FzdG9zSWQ6IGNyZWF0ZWRTaGVldElkLFxyXG4gICAgICAgIGN1cnJlbmN5Q29kZTogXCJcIixcclxuICAgICAgICBtYW5hZ2VkVXNlcklkOiBzYWZlVGV4dChjdXJyZW50QXhVc2VySWQpLFxyXG4gICAgICAgIGluY2x1ZGVTdWJvcmRpbmF0ZXM6IGZhbHNlLFxyXG4gICAgICAgIHN0YXR1c0ZpbHRlcjogREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIsXHJcbiAgICAgICAgZXhjaGFuZ2VSYXRlTW9kZTogbnVsbCxcclxuICAgICAgICBmaWx0ZXI6IGNyZWF0ZWRTaGVldElkLFxyXG4gICAgICB9LFxyXG4gICAgICBwYWdlOiAxLFxyXG4gICAgICBzY3JvbGxZOiAwLFxyXG4gICAgICBpdGVtczogW10sXHJcbiAgICAgIHRvdGFsOiAwLFxyXG4gICAgfSk7XHJcblxyXG4gICAgY3JlYXRlZFNoZWV0UmV0dXJuSWRSZWYuY3VycmVudCA9IFwiXCI7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9LCBbY3VycmVudEF4VXNlcklkLCBzYXZlQ2FjaGVkU3RhdGVdKTtcclxuXHJcbiAgY29uc3QgcmVhcm1FeHBlbnNlU2hlZXRzUmV0dXJuU3RhdGUgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAocHJlcGFyZUNyZWF0ZWRTaGVldFJldHVyblN0YXRlKCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNhY2hlZFN0YXRlID0gcmVhZENhY2hlZFN0YXRlKCk7XHJcbiAgICBpZiAoIWNhY2hlZFN0YXRlKSByZXR1cm47XHJcbiAgICBzYXZlQ2FjaGVkU3RhdGUoY2FjaGVkU3RhdGUpO1xyXG4gIH0sIFtwcmVwYXJlQ3JlYXRlZFNoZWV0UmV0dXJuU3RhdGUsIHJlYWRDYWNoZWRTdGF0ZSwgc2F2ZUNhY2hlZFN0YXRlXSk7XHJcblxyXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBiYWNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxCYWNrQnRuXCIpO1xyXG4gICAgaWYgKCFiYWNrQnV0dG9uKSByZXR1cm47XHJcblxyXG4gICAgYmFja0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWJhY2stdXJsXCIsIEVYUEVOU0VfU0hFRVRTX0xJU1RfVVJMKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBiYWNrQnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtYmFjay11cmxcIik7XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGJhY2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbEJhY2tCdG5cIik7XHJcbiAgICBpZiAoIWJhY2tCdXR0b24pIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVUb3BiYXJCYWNrQ2xpY2sgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgIGNvbnN0IGV4ZWN1dGVCYWNrTmF2aWdhdGlvbiA9ICgpID0+IHtcclxuICAgICAgICByZWFybUV4cGVuc2VTaGVldHNSZXR1cm5TdGF0ZSgpO1xyXG4gICAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gRVhQRU5TRV9TSEVFVFNfTElTVF9VUkw7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdy5fX2luZFJlcXVlc3ROYXZpZ2F0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICB3aW5kb3cuX19pbmRSZXF1ZXN0TmF2aWdhdGlvbihleGVjdXRlQmFja05hdmlnYXRpb24pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGJhY2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVRvcGJhckJhY2tDbGljaywgdHJ1ZSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBiYWNrQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVUb3BiYXJCYWNrQ2xpY2ssIHRydWUpO1xyXG4gICAgfTtcclxuICB9LCBbcmVhcm1FeHBlbnNlU2hlZXRzUmV0dXJuU3RhdGVdKTtcclxuXHJcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGhhbmRsZU5hdGl2ZUJhY2sgPSAoZXZlbnQpID0+IHtcclxuICAgICAgaWYgKGV2ZW50Py5zdGF0ZSAmJiBldmVudC5zdGF0ZS5pbmRUcmFwID09PSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBleGVjdXRlQmFja05hdmlnYXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgcmVhcm1FeHBlbnNlU2hlZXRzUmV0dXJuU3RhdGUoKTtcclxuICAgICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShFWFBFTlNFX1NIRUVUU19MSVNUX1VSTCk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdy5fX2luZFJlcXVlc3ROYXZpZ2F0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICB3aW5kb3cuX19pbmRSZXF1ZXN0TmF2aWdhdGlvbihleGVjdXRlQmFja05hdmlnYXRpb24pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgaGFuZGxlTmF0aXZlQmFjayk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGhhbmRsZU5hdGl2ZUJhY2spO1xyXG4gICAgfTtcclxuICB9LCBbcmVhcm1FeHBlbnNlU2hlZXRzUmV0dXJuU3RhdGVdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XHJcbiAgICAgIDxFeHBlbnNlU2hlZXREZXRhaWxPdmVybGF5c1xyXG4gICAgICAgIG1vZGFsPXtjb250cm9sbGVyLm1vZGFsfVxyXG4gICAgICAgIG1vZGFsRXJyb3I9e2NvbnRyb2xsZXIubW9kYWxFcnJvcn1cclxuICAgICAgICBzdGF0dXM9e2NvbnRyb2xsZXIuc3RhdHVzfVxyXG4gICAgICAgIGJ1c3k9e2NvbnRyb2xsZXIuYnVzeX1cclxuICAgICAgICBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGU9e2NvbnRyb2xsZXIuaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlfVxyXG4gICAgICAgIG1vZGFsTG9hZGluZ1RleHQ9e2NvbnRyb2xsZXIubW9kYWxMb2FkaW5nVGV4dH1cclxuICAgICAgICBtb2RhbENhbmNlbFRleHQ9e2NvbnRyb2xsZXIubW9kYWxDYW5jZWxUZXh0fVxyXG4gICAgICAgIG1vZGFsQ29uZmlybVRleHQ9e2NvbnRyb2xsZXIubW9kYWxDb25maXJtVGV4dH1cclxuICAgICAgICBtb2RhbEJvZHk9e2NvbnRyb2xsZXIubW9kYWxCb2R5fVxyXG4gICAgICAgIGNhbWVyYUlucHV0UmVmPXtjb250cm9sbGVyLmNhbWVyYUlucHV0UmVmfVxyXG4gICAgICAgIGdhbGxlcnlJbnB1dFJlZj17Y29udHJvbGxlci5nYWxsZXJ5SW5wdXRSZWZ9XHJcbiAgICAgICAgc291cmNlUGlja2VyT3Blbj17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuc291cmNlUGlja2VyT3Blbn1cclxuICAgICAgICBxdWlja1RpY2tldEJ1c3k9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmJ1c3l9XHJcbiAgICAgICAgcXVpY2tUaWNrZXRQcm9ncmVzc01lc3NhZ2U9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnByb2dyZXNzTWVzc2FnZX1cclxuICAgICAgICBxdWlja1RpY2tldFByb2dyZXNzU3RhZ2VzPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5wcm9ncmVzc1N0YWdlc31cclxuICAgICAgICBxdWlja1RpY2tldEVsYXBzZWRNcz17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cucHJvZ3Jlc3NFbGFwc2VkTXN9XHJcbiAgICAgICAgcXVpY2tUaWNrZXRFcnJvck1lc3NhZ2U9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmVycm9yTWVzc2FnZX1cclxuICAgICAgICBxdWlja1RpY2tldEF0dGVtcHRJZD17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuYXR0ZW1wdElkfVxyXG4gICAgICAgIHF1aWNrVGlja2V0VHJhY2VMaXN0PXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy50cmFjZUxpc3R9XHJcbiAgICAgICAgaGFzUGVuZGluZ1VwbG9hZFJldHJ5PXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5oYXNQZW5kaW5nVXBsb2FkUmV0cnl9XHJcbiAgICAgICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmU9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93Lmhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlfVxyXG4gICAgICAgIG9uQ29uZmlybT17Y29udHJvbGxlci5oYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm19XHJcbiAgICAgICAgb25DYW5jZWw9e2NvbnRyb2xsZXIuY2xvc2VDb25maXJtfVxyXG4gICAgICAgIG9uU2VsZWN0ZWRDYW1lcmFGaWxlPXsoZmlsZSkgPT4ge1xyXG4gICAgICAgICAgdm9pZCBjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5oYW5kbGVTZWxlY3RlZEZpbGUoZmlsZSwgXCJjYW1lcmFcIik7XHJcbiAgICAgICAgfX1cclxuICAgICAgICBvblNlbGVjdGVkR2FsbGVyeUZpbGU9eyhmaWxlKSA9PiB7XHJcbiAgICAgICAgICB2b2lkIGNvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmhhbmRsZVNlbGVjdGVkRmlsZShmaWxlLCBcImdhbGxlcnlcIik7XHJcbiAgICAgICAgfX1cclxuICAgICAgICBvblNlbGVjdEZyb21DYW1lcmE9eygpID0+IHtcclxuICAgICAgICAgIHZvaWQgY29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuc2VsZWN0RnJvbUNhbWVyYShjb250cm9sbGVyLmNhbWVyYUlucHV0UmVmLmN1cnJlbnQpO1xyXG4gICAgICAgIH19XHJcbiAgICAgICAgb25TZWxlY3RGcm9tR2FsbGVyeT17KCkgPT4gY29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuc2VsZWN0RnJvbUdhbGxlcnkoY29udHJvbGxlci5nYWxsZXJ5SW5wdXRSZWYuY3VycmVudCl9XHJcbiAgICAgICAgb25DbG9zZVNvdXJjZVBpY2tlcj17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuY2xvc2VTb3VyY2VQaWNrZXJ9XHJcbiAgICAgICAgb25SZXRyeVBlbmRpbmdVcGxvYWQ9eygpID0+IHtcbiAgICAgICAgICB2b2lkIGNvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnJldHJ5UGVuZGluZ1VwbG9hZCgpO1xuICAgICAgICB9fVxuICAgICAgICBvbkNsZWFyUXVpY2tUaWNrZXRFcnJvcj17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuY2xlYXJFcnJvcn1cbiAgICAgIC8+XG5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXHJcbiAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogY29udHJvbGxlci5pc0xvYWRpbmcgfHwgY29udHJvbGxlci5pc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XHJcbiAgICAgID5cclxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIHNpemUtNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAge2NvbnRyb2xsZXIuZXJyb3JNZXNzYWdlID8gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntjb250cm9sbGVyLmVycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxyXG5cclxuICAgICAgeyFjb250cm9sbGVyLmlzTG9hZGluZyAmJiAhY29udHJvbGxlci5pc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUgJiYgIWNvbnRyb2xsZXIuZXJyb3JNZXNzYWdlICYmIGNvbnRyb2xsZXIuaGVhZGVyID8gKFxuICAgICAgICA8RXhwZW5zZVNoZWV0SGVhZGVyRm9ybVxuICAgICAgICAgIG1vZGU9e3tcbiAgICAgICAgICAgIGlzQ3JlYXRlTW9kZTogY29udHJvbGxlci5pc0NyZWF0ZU1vZGUsXG4gICAgICAgICAgICBpc0VkaXRpbmc6IGNvbnRyb2xsZXIuaXNFZGl0aW5nLFxuICAgICAgICAgICAgY2FuRWRpdEhlYWRlckZpZWxkczogY29udHJvbGxlci5jYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcbiAgICAgICAgICAgIHN0YXR1c0NvbW1lbnRNb2RlOiBjb250cm9sbGVyLnN0YXR1c0NvbW1lbnRNb2RlLFxuICAgICAgICAgIH19XG4gICAgICAgICAgY3VycmVuY3lMb2Nrcz17e1xuICAgICAgICAgICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXM6IGNvbnRyb2xsZXIuaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXG4gICAgICAgICAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXM6IGNvbnRyb2xsZXIuaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxuICAgICAgICAgICAgc2hvd0V4Y2hhbmdlUmF0ZTogY29udHJvbGxlci5zaG93RXhjaGFuZ2VSYXRlLFxuICAgICAgICAgIH19XG4gICAgICAgICAgaGVhZGVyPXtjb250cm9sbGVyLmhlYWRlcn1cbiAgICAgICAgICBwcm9qZWN0VmFsdWU9e2NvbnRyb2xsZXIucHJvamVjdFZhbHVlfVxuICAgICAgICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5PXtjb250cm9sbGVyLm5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5fVxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeT17Y29udHJvbGxlci5leGNoYW5nZVJhdGVCYXNlQ3VycmVuY3l9XG4gICAgICAgICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50PXtjb250cm9sbGVyLmV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudH1cbiAgICAgICAgICBleGNoYW5nZVJhdGVWYWx1ZT17Y29udHJvbGxlci5leGNoYW5nZVJhdGVWYWx1ZX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZT17Y29udHJvbGxlci5leGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZX1cclxuICAgICAgICAgIHRvdGFsQW1vdW50VGV4dD17Y29udHJvbGxlci50b3RhbEFtb3VudFRleHR9XHJcbiAgICAgICAgICBkcmFmdERlc2NyaXB0aW9uPXtjb250cm9sbGVyLmRyYWZ0RGVzY3JpcHRpb259XHJcbiAgICAgICAgICBkcmFmdFByb2plY3RJZD17Y29udHJvbGxlci5kcmFmdFByb2plY3RJZH1cclxuICAgICAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlPXtjb250cm9sbGVyLmRyYWZ0Q3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgZHJhZnRFeGNoYW5nZVJhdGU9e2NvbnRyb2xsZXIuZHJhZnRFeGNoYW5nZVJhdGV9XHJcbiAgICAgICAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlPXtjb250cm9sbGVyLm9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWV9XHJcbiAgICAgICAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGU9e2NvbnRyb2xsZXIub2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlfVxyXG4gICAgICAgICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2U9e2NvbnRyb2xsZXIub2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2V9XHJcbiAgICAgICAgICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U9e2NvbnRyb2xsZXIuc2V0RHJhZnREZXNjcmlwdGlvbn1cclxuICAgICAgICAgIG9uRHJhZnRQcm9qZWN0SWRDaGFuZ2U9e2NvbnRyb2xsZXIuc2V0RHJhZnRQcm9qZWN0SWR9XHJcbiAgICAgICAgICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlPXtjb250cm9sbGVyLnNldERyYWZ0Q3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZT17Y29udHJvbGxlci5zZXREcmFmdEV4Y2hhbmdlUmF0ZX1cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHshY29udHJvbGxlci5pc0NyZWF0ZU1vZGUgJiYgIWNvbnRyb2xsZXIuaXNMb2FkaW5nICYmICFjb250cm9sbGVyLmlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSAmJiAhY29udHJvbGxlci5lcnJvck1lc3NhZ2UgPyAoXHJcbiAgICAgICAgPEV4cGVuc2VMaW5lc1RpbWVsaW5lXHJcbiAgICAgICAgICB2aXNpYmxlTGluZXM9e2NvbnRyb2xsZXIudmlzaWJsZUxpbmVzfVxyXG4gICAgICAgICAgY3VycmVuY3lDb2RlPXtzYWZlVGV4dChjb250cm9sbGVyLmhlYWRlcj8uY3VycmVuY3lDb2RlKX1cclxuICAgICAgICAgIHRvdGFsTGluZVBhZ2VzPXtjb250cm9sbGVyLnRvdGFsTGluZVBhZ2VzfVxyXG4gICAgICAgICAgbGluZVBhZ2U9e2NvbnRyb2xsZXIubGluZVBhZ2V9XHJcbiAgICAgICAgICBsaW5lc0xhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lc1wiLCBcIkxpbmVzXCIpfVxyXG4gICAgICAgICAgZW1wdHlUZXh0PXtpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob0xpbmVzXCIsIFwiTm8gbGluZXMgZm9yIHRoaXMgZXhwZW5zZSBzaGVldC5cIil9XHJcbiAgICAgICAgICBwYWdpbmF0aW9uTGFiZWxzPXtjb250cm9sbGVyLnBhZ2luYXRpb25MYWJlbHN9XHJcbiAgICAgICAgICBjb250YWluZXJSZWY9e2NvbnRyb2xsZXIubGluZUNvbnRhaW5lclJlZn1cclxuICAgICAgICAgIG9uTGluZVBhZ2VDaGFuZ2U9e2NvbnRyb2xsZXIuc2V0TGluZVBhZ2V9XHJcbiAgICAgICAgICBvbk9wZW5MaW5lPXtjb250cm9sbGVyLm5hdmlnYXRlVG9MaW5lRGV0YWlsfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAge2NvbnRyb2xsZXIuc2hvd1N0YXR1c0FjdGlvbkJhciA/IChcclxuICAgICAgICA8RXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyXHJcbiAgICAgICAgICBhY3Rpb25zPXtjb250cm9sbGVyLmRldGFpbFBvbGljeS5zdGF0dXNBY3Rpb25zfVxyXG4gICAgICAgICAgYnVzeT17Y29udHJvbGxlci5idXN5IHx8IGNvbnRyb2xsZXIuaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e2NvbnRyb2xsZXIuYXJlU3RhdHVzQWN0aW9uc0Rpc2FibGVkfVxyXG4gICAgICAgICAgb25BY3Rpb25DbGljaz17Y29udHJvbGxlci5oYW5kbGVTdGF0dXNBY3Rpb25DbGlja31cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHtjb250cm9sbGVyLnNob3dGYWIgPyAoXHJcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXHJcbiAgICAgICAgICBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgclx1MDBFMXBpZGFzXCIpfVxyXG4gICAgICAgICAgc2l6ZT17NzZ9XHJcbiAgICAgICAgICByaWdodD17MTZ9XHJcbiAgICAgICAgICBib3R0b209e2NvbnRyb2xsZXIuc2hvd1N0YXR1c0FjdGlvbkJhciA/IERFVEFJTF9GQUJfQk9UVE9NX1dJVEhfQUNUSU9OX0JBUiA6IDI0fVxyXG4gICAgICAgICAgbWVudUFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX0FjdGlvbnNcIiwgXCJBY2Npb25lcyByXHUwMEUxcGlkYXNcIil9XHJcbiAgICAgICAgICBtZW51SXRlbXM9e2NvbnRyb2xsZXIuZmFiTWVudUl0ZW1zfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIE1haW4gcGFnZSBlbnRyeSBmb3IgZXhwZW5zZSBzaGVldCBkZXRhaWwuXHJcbmNvbnN0IEV4cGVuc2VTaGVldERldGFpbFBhZ2UgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycyBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD5cclxuICAgICAgPEV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250ZW50IC8+XHJcbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcclxuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xyXG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS1zaGVldC1kZXRhaWwtcm9vdFwiKTtcclxuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xyXG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVNoZWV0RGV0YWlsUGFnZSAvPik7XHJcbn07XHJcblxyXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldERldGFpbFBhZ2U7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgSW5mb1BvcG92ZXJJY29uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvSW5mb1BvcG92ZXJJY29uQnV0dG9uLnRzeFwiO1xyXG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24udHN4XCI7XG5pbXBvcnQgRXhwZW5zZVJlYWRPbmx5RmllbGQgZnJvbSBcIi4vRXhwZW5zZVJlYWRPbmx5RmllbGQudHN4XCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcblxyXG50eXBlIEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5SW50ZXJhY3Rpb24gPSB7XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgY2FuRWRpdEhlYWRlckZpZWxkczogYm9vbGVhbjtcbn07XG5cbnR5cGUgRXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lTdGF0ZSA9IHtcbiAgaXNGb3JlaWduQ3VycmVuY3k6IGJvb2xlYW47XG4gIHNob3dFeGNoYW5nZVJhdGU6IGJvb2xlYW47XG4gIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XG59O1xuXG50eXBlIEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvblByb3BzID0ge1xuICBpbnRlcmFjdGlvbjogRXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lJbnRlcmFjdGlvbjtcbiAgY3VycmVuY3lTdGF0ZTogRXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lTdGF0ZTtcbiAgZXhwZW5zZUN1cnJlbmN5TGFiZWw6IHN0cmluZztcbiAgaGVhZGVyQ3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGJhc2VDdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBkcmFmdEV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xuICBleGNoYW5nZVJhdGVWYWx1ZTogc3RyaW5nO1xuICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZTogc3RyaW5nO1xuICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQ6IG51bWJlcjtcbiAgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2U6IHN0cmluZztcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xufTtcblxuLy8gT3ducyB0aGUgY3VycmVuY3kgYW5kIGV4Y2hhbmdlLXJhdGUgVUkgc28gdGhlIGhlYWRlciBmb3JtIHN0YXlzIGNvbXBhY3QuXG5jb25zdCBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb24gPSAoe1xuICBpbnRlcmFjdGlvbixcbiAgY3VycmVuY3lTdGF0ZSxcbiAgZXhwZW5zZUN1cnJlbmN5TGFiZWwsXG4gIGhlYWRlckN1cnJlbmN5Q29kZSxcbiAgYmFzZUN1cnJlbmN5Q29kZSxcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgZHJhZnRFeGNoYW5nZVJhdGUsXG4gIGV4Y2hhbmdlUmF0ZVZhbHVlLFxuICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSxcbiAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LFxuICBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZSxcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZSxcbiAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZSxcbn06IEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvblByb3BzKSA9PiB7XG4gIGNvbnN0IHsgaXNFZGl0aW5nLCBjYW5FZGl0SGVhZGVyRmllbGRzIH0gPSBpbnRlcmFjdGlvbjtcbiAgY29uc3QgeyBpc0ZvcmVpZ25DdXJyZW5jeSwgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcywgc2hvd0V4Y2hhbmdlUmF0ZSB9ID0gY3VycmVuY3lTdGF0ZTtcbiAgY29uc3QgbG9jYWxDdXJyZW5jeU9wdGlvbnMgPSBSZWFjdC51c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oXHJcbiAgICAoKSA9PiBbXHJcbiAgICAgIHtcclxuICAgICAgICB2YWx1ZTogYmFzZUN1cnJlbmN5Q29kZSxcclxuICAgICAgICB0ZXh0OiBiYXNlQ3VycmVuY3lDb2RlLFxyXG4gICAgICAgIGljb246IDxFeHBlbnNlQ3VycmVuY3lGbGFnSWNvbiBjdXJyZW5jeUNvZGU9e2Jhc2VDdXJyZW5jeUNvZGV9IHNpemVDbGFzc05hbWU9XCJoLTYgdy02XCIgLz4sXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgW2Jhc2VDdXJyZW5jeUNvZGVdXHJcbiAgKTtcclxuICBjb25zdCBoZWFkZXJDdXJyZW5jeU9wdGlvbnMgPSBSZWFjdC51c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oXHJcbiAgICAoKSA9PiBbXHJcbiAgICAgIHtcclxuICAgICAgICB2YWx1ZTogaGVhZGVyQ3VycmVuY3lDb2RlIHx8IFwiLVwiLFxyXG4gICAgICAgIHRleHQ6IGhlYWRlckN1cnJlbmN5Q29kZSB8fCBcIi1cIixcclxuICAgICAgICBpY29uOiA8RXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gY3VycmVuY3lDb2RlPXtoZWFkZXJDdXJyZW5jeUNvZGUgfHwgXCItXCJ9IHNpemVDbGFzc05hbWU9XCJoLTYgdy02XCIgLz4sXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgW2hlYWRlckN1cnJlbmN5Q29kZV1cclxuICApO1xyXG5cclxuICBpZiAoaXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHMpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBzcGFjZS15LTNcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGdyaWQgZ2FwLTQgJHtpc0ZvcmVpZ25DdXJyZW5jeSA/IFwiZ3JpZC1jb2xzLTJcIiA6IFwiZ3JpZC1jb2xzLTFcIn1gLnRyaW0oKX0+XHJcbiAgICAgICAgICB7aXNGb3JlaWduQ3VycmVuY3kgPyAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntleHBlbnNlQ3VycmVuY3lMYWJlbH08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdFxyXG4gICAgICAgICAgICAgICAgICBsYWJlbD17ZXhwZW5zZUN1cnJlbmN5TGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lfUGxhY2Vob2xkZXJcIiwgXCJDdXJyZW5jeSBjb2RlXCIpfVxyXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRDdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZyB8fCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cclxuICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmcgfHwgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXN9XHJcbiAgICAgICAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtaGVhZGVyLWN1cnJlbmN5XCJcclxuICAgICAgICAgICAgICAgICAgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHRcclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzcGFjZS15LTEuNVwiPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgcHItOCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0V4Y2hhbmdlUmF0ZVwiLCBcIkV4Y2hhbmdlIHJhdGVcIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxJbmZvUG9wb3Zlckljb25CdXR0b25cclxuICAgICAgICAgICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfSW5mb1BvcG92ZXJfQXJpYVwiLCBcIlNob3cgZXhjaGFuZ2UgcmF0ZSBpbmZvcm1hdGlvblwiKX1cclxuICAgICAgICAgICAgICAgICAgY29udGVudD17ZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHJpZ2h0LTAgLXRvcC0xIHotMjBcIlxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvcm0tY29udHJvbCAke2V4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlID8gXCJib3JkZXItZGFuZ2VyIHJpbmctMSByaW5nLWRhbmdlclwiIDogXCJcIn0gJHtpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJcIn1gfVxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dE1vZGU9XCJkZWNpbWFsXCJcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRFeGNoYW5nZVJhdGV9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XHJcbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXsoZXZlbnQpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiA3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogNyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxsYmFjazogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhjaGFuZ2VSYXRlXCIsIFwiRXhjaGFuZ2UgcmF0ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhjaGFuZ2VSYXRlXCIsIFwiRXhjaGFuZ2UgcmF0ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17aXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzfVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXN9XHJcbiAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8RXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0XHJcbiAgICAgICAgICAgICAgbGFiZWw9e2V4cGVuc2VDdXJyZW5jeUxhYmVsfVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lfUGxhY2Vob2xkZXJcIiwgXCJDdXJyZW5jeSBjb2RlXCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdEN1cnJlbmN5Q29kZX1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZX1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZyB8fCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cclxuICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZyB8fCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cclxuICAgICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLWhlYWRlci1jdXJyZW5jeVwiXHJcbiAgICAgICAgICAgICAgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHRcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIHtpc0ZvcmVpZ25DdXJyZW5jeSA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtNFwiPlxyXG4gICAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfTG9jYWxDdXJyZW5jeVwiLCBcIkxvY2FsIGN1cnJlbmN5XCIpfVxyXG4gICAgICAgICAgICAgIG9wdGlvbnM9e2xvY2FsQ3VycmVuY3lPcHRpb25zfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtiYXNlQ3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeV9QbGFjZWhvbGRlclwiLCBcIkN1cnJlbmN5IGNvZGVcIil9XHJcbiAgICAgICAgICAgICAgcmVhZE9ubHlcclxuICAgICAgICAgICAgICBkaXNhYmxlZFxyXG4gICAgICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cclxuICAgICAgICAgICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cclxuICAgICAgICAgICAgICBzaG93TGFiZWxcclxuICAgICAgICAgICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxyXG4gICAgICAgICAgICAgIHNlbGVjdGVkVGV4dE1vZGU9XCJ2YWx1ZVwiXHJcbiAgICAgICAgICAgICAgZHJvcGRvd25NYXhIZWlnaHRDbGFzcz1cIm1heC1oLTk2XCJcclxuICAgICAgICAgICAgICBzZWxlY3RlZEljb25DbGFzc05hbWU9XCJoLTYgdy02XCJcclxuICAgICAgICAgICAgICBvcHRpb25JY29uQ2xhc3NOYW1lPVwiaC02IHctNlwiXHJcbiAgICAgICAgICAgICAgc2VsZWN0ZWRJbnB1dFBhZGRpbmdDbGFzc05hbWU9XCJwbC0xMlwiXHJcbiAgICAgICAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS1oZWFkZXItbG9jYWwtY3VycmVuY3lcIlxyXG4gICAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XHJcbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9BbW91bnRcIiwgXCJBbW91bnRcIil9PC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIGluZC1yZWFkb25seS1maWVsZFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQsIGJhc2VDdXJyZW5jeUNvZGUpfVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Ftb3VudFwiLCBcIkFtb3VudFwiKX1cbiAgICAgICAgICAgICAgICByZWFkT25seVxuICAgICAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgIHtpc0ZvcmVpZ25DdXJyZW5jeSAmJiBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSA/IDxwIGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyIHRleHQtc21cIj57ZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2V9PC9wPiA6IG51bGx9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cclxuICAgICAgICBvcHRpb25zPXtoZWFkZXJDdXJyZW5jeU9wdGlvbnN9XHJcbiAgICAgICAgdmFsdWU9e2hlYWRlckN1cnJlbmN5Q29kZSB8fCBcIi1cIn1cclxuICAgICAgICBvbkNoYW5nZT17KCkgPT4gdW5kZWZpbmVkfVxyXG4gICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lfUGxhY2Vob2xkZXJcIiwgXCJDdXJyZW5jeSBjb2RlXCIpfVxyXG4gICAgICAgIHJlYWRPbmx5XHJcbiAgICAgICAgZGlzYWJsZWRcclxuICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XHJcbiAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XHJcbiAgICAgICAgc2hvd0xhYmVsXHJcbiAgICAgICAgdXNlUG9ydGFsPXtmYWxzZX1cclxuICAgICAgICBzZWxlY3RlZFRleHRNb2RlPVwidmFsdWVcIlxyXG4gICAgICAgIGRyb3Bkb3duTWF4SGVpZ2h0Q2xhc3M9XCJtYXgtaC05NlwiXHJcbiAgICAgICAgc2VsZWN0ZWRJY29uQ2xhc3NOYW1lPVwiaC02IHctNlwiXHJcbiAgICAgICAgb3B0aW9uSWNvbkNsYXNzTmFtZT1cImgtNiB3LTZcIlxyXG4gICAgICAgIHNlbGVjdGVkSW5wdXRQYWRkaW5nQ2xhc3NOYW1lPVwicGwtMTJcIlxyXG4gICAgICAgIGlkQmFzZT1cImV4cGVuc2UtaGVhZGVyLWN1cnJlbmN5LXJlYWRvbmx5XCJcclxuICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgLz5cclxuICAgICAgeyFpc0VkaXRpbmcgJiYgc2hvd0V4Y2hhbmdlUmF0ZSA/IChcclxuICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0V4Y2hhbmdlUmF0ZVwiLCBcIkV4Y2hhbmdlIHJhdGVcIil9IHZhbHVlPXtleGNoYW5nZVJhdGVWYWx1ZX0gLz5cclxuICAgICAgKSA6IG51bGx9XHJcbiAgICA8Lz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lTZWN0aW9uO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZUxheW91dEVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tIFwicmVhY3QtZG9tXCI7XHJcbmltcG9ydCB7IHVzZU91dHNpZGVDbGljayB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHNcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcblxyXG50eXBlIEluZm9Qb3BvdmVySWNvbkJ1dHRvblByb3BzID0ge1xyXG4gIGNvbnRlbnQ6IFJlYWN0LlJlYWN0Tm9kZTtcclxuICBhcmlhTGFiZWw6IHN0cmluZztcclxuICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG4vLyBTaGFyZWQgZHVtYiBwb3BvdmVyIHRyaWdnZXIgdXNlZCB0byBkaXNwbGF5IHNob3J0IGNvbnRleHR1YWwgaW5mby5cclxuY29uc3QgSW5mb1BvcG92ZXJJY29uQnV0dG9uID0gKHtcclxuICBjb250ZW50LFxyXG4gIGFyaWFMYWJlbCxcclxuICBjbGFzc05hbWUgPSBcIlwiLFxyXG4gIHBhbmVsQ2xhc3NOYW1lID0gXCJcIixcclxufTogSW5mb1BvcG92ZXJJY29uQnV0dG9uUHJvcHMpID0+IHtcclxuICBjb25zdCBIT1JJWk9OVEFMX1ZJRVdQT1JUX0dVVFRFUl9QWCA9IDg7XHJcbiAgY29uc3QgVkVSVElDQUxfVklFV1BPUlRfR1VUVEVSX1BYID0gODtcclxuICBjb25zdCBQQU5FTF9UUklHR0VSX0dBUF9QWCA9IDY7XHJcbiAgY29uc3QgR0xPQkFMX1JBRElVUyA9IFwidmFyKC0tcmFkaXVzLXhsLCA1cHgpXCI7XHJcbiAgY29uc3QgW2lzT3Blbiwgc2V0SXNPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbcGFuZWxTdHlsZSwgc2V0UGFuZWxTdHlsZV0gPSB1c2VTdGF0ZTxSZWFjdC5DU1NQcm9wZXJ0aWVzPih7XHJcbiAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxyXG4gICAgdG9wOiAwLFxyXG4gICAgbGVmdDogMCxcclxuICAgIHZpc2liaWxpdHk6IFwiaGlkZGVuXCIsXHJcbiAgfSk7XHJcbiAgY29uc3QgYnV0dG9uUmVmID0gdXNlUmVmPEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgcGFuZWxSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuXHJcbiAgdXNlT3V0c2lkZUNsaWNrKFtidXR0b25SZWYsIHBhbmVsUmVmXSwgKCkgPT4gc2V0SXNPcGVuKGZhbHNlKSk7XHJcbiAgY29uc3QgdXBkYXRlUGFuZWxQb3NpdGlvbiA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBidXR0b25FbGVtZW50ID0gYnV0dG9uUmVmLmN1cnJlbnQ7XHJcbiAgICBjb25zdCBwYW5lbEVsZW1lbnQgPSBwYW5lbFJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFidXR0b25FbGVtZW50IHx8ICFwYW5lbEVsZW1lbnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJ1dHRvblJlY3QgPSBidXR0b25FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3QgcGFuZWxSZWN0ID0gcGFuZWxFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3Qgdmlld3BvcnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgY29uc3Qgdmlld3BvcnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICBjb25zdCBzYWZlV2lkdGggPSBNYXRoLm1pbihwYW5lbFJlY3Qud2lkdGgsIE1hdGgubWF4KDE4MCwgdmlld3BvcnRXaWR0aCAtIEhPUklaT05UQUxfVklFV1BPUlRfR1VUVEVSX1BYICogMikpO1xyXG5cclxuICAgIGxldCBsZWZ0ID0gYnV0dG9uUmVjdC5sZWZ0ICsgYnV0dG9uUmVjdC53aWR0aCAvIDIgLSBzYWZlV2lkdGggLyAyO1xyXG4gICAgbGVmdCA9IE1hdGgubWF4KEhPUklaT05UQUxfVklFV1BPUlRfR1VUVEVSX1BYLCBNYXRoLm1pbihsZWZ0LCB2aWV3cG9ydFdpZHRoIC0gc2FmZVdpZHRoIC0gSE9SSVpPTlRBTF9WSUVXUE9SVF9HVVRURVJfUFgpKTtcclxuXHJcbiAgICBsZXQgdG9wID0gYnV0dG9uUmVjdC5ib3R0b20gKyBQQU5FTF9UUklHR0VSX0dBUF9QWDtcclxuICAgIGNvbnN0IGhhc0JvdHRvbU92ZXJmbG93ID0gdG9wICsgcGFuZWxSZWN0LmhlaWdodCArIFZFUlRJQ0FMX1ZJRVdQT1JUX0dVVFRFUl9QWCA+IHZpZXdwb3J0SGVpZ2h0O1xyXG4gICAgaWYgKGhhc0JvdHRvbU92ZXJmbG93KSB7XHJcbiAgICAgIGNvbnN0IHRvcEFib3ZlVHJpZ2dlciA9IGJ1dHRvblJlY3QudG9wIC0gcGFuZWxSZWN0LmhlaWdodCAtIFBBTkVMX1RSSUdHRVJfR0FQX1BYO1xyXG4gICAgICB0b3AgPSB0b3BBYm92ZVRyaWdnZXIgPj0gVkVSVElDQUxfVklFV1BPUlRfR1VUVEVSX1BYXHJcbiAgICAgICAgPyB0b3BBYm92ZVRyaWdnZXJcclxuICAgICAgICA6IE1hdGgubWF4KFZFUlRJQ0FMX1ZJRVdQT1JUX0dVVFRFUl9QWCwgdmlld3BvcnRIZWlnaHQgLSBwYW5lbFJlY3QuaGVpZ2h0IC0gVkVSVElDQUxfVklFV1BPUlRfR1VUVEVSX1BYKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQYW5lbFN0eWxlKHtcclxuICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcclxuICAgICAgdG9wOiBNYXRoLnJvdW5kKHRvcCksXHJcbiAgICAgIGxlZnQ6IE1hdGgucm91bmQobGVmdCksXHJcbiAgICAgIHdpZHRoOiBNYXRoLnJvdW5kKHNhZmVXaWR0aCksXHJcbiAgICAgIHZpc2liaWxpdHk6IFwidmlzaWJsZVwiLFxyXG4gICAgfSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc09wZW4pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlUGFuZWxQb3NpdGlvbigpO1xyXG4gIH0sIFtpc09wZW4sIGNvbnRlbnQsIHVwZGF0ZVBhbmVsUG9zaXRpb25dKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaXNPcGVuKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGhhbmRsZVZpZXdwb3J0Q2hhbmdlID0gKCkgPT4gdXBkYXRlUGFuZWxQb3NpdGlvbigpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgaGFuZGxlVmlld3BvcnRDaGFuZ2UpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlVmlld3BvcnRDaGFuZ2UsIHRydWUpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgaGFuZGxlVmlld3BvcnRDaGFuZ2UpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVWaWV3cG9ydENoYW5nZSwgdHJ1ZSk7XHJcbiAgICB9O1xyXG4gIH0sIFtpc09wZW4sIHVwZGF0ZVBhbmVsUG9zaXRpb25dKTtcclxuXHJcbiAgY29uc3QgcG9ydGFsVGFyZ2V0ID0gdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiID8gbnVsbCA6IGRvY3VtZW50LmJvZHk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImlubGluZS1mbGV4XCIsIGNsYXNzTmFtZSl9PlxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAgcmVmPXtidXR0b25SZWZ9XHJcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsfVxyXG4gICAgICAgIGFyaWEtZXhwYW5kZWQ9e2lzT3Blbn1cclxuICAgICAgICBhcmlhLWhhc3BvcHVwPVwiZGlhbG9nXCJcclxuICAgICAgICBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBoLTYgdy02IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXRyYW5zcGFyZW50IGJnLXRyYW5zcGFyZW50IHAtMCB0ZXh0LXNsYXRlLTUwMCB0cmFuc2l0aW9uIGhvdmVyOnRleHQtcHJpbWFyeSBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5LzMwXCJcclxuICAgICAgICBzdHlsZT17eyBib3JkZXJSYWRpdXM6IEdMT0JBTF9SQURJVVMgfX1cclxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc09wZW4oKHByZXZpb3VzKSA9PiAhcHJldmlvdXMpfVxyXG4gICAgICA+XHJcbiAgICAgICAgPHN2Z1xyXG4gICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgICAgICB3aWR0aD1cIjIwXCJcclxuICAgICAgICAgIGhlaWdodD1cIjIwXCJcclxuICAgICAgICAgIHZpZXdCb3g9XCIzIDMgMTggMThcIlxyXG4gICAgICAgICAgZmlsbD1cIm5vbmVcIlxyXG4gICAgICAgICAgc3Ryb2tlPVwiIzY0NzQ4YlwiXHJcbiAgICAgICAgICBzdHJva2VXaWR0aD1cIjEuNzVcIlxyXG4gICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcclxuICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxyXG4gICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgICAgICAgIGNsYXNzTmFtZT1cImJsb2NrXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8cmVjdCB4PVwiNFwiIHk9XCI0XCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgcng9XCIzXCIgcnk9XCIzXCIgLz5cclxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTIgOWguMDFcIiAvPlxyXG4gICAgICAgICAgPHBhdGggZD1cIk0xMSAxMmgxdjRoMVwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAge2lzT3BlbiAmJiBwb3J0YWxUYXJnZXRcclxuICAgICAgICA/IGNyZWF0ZVBvcnRhbChcclxuICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgIHJlZj17cGFuZWxSZWZ9XHJcbiAgICAgICAgICAgICAgcm9sZT1cImRpYWxvZ1wiXHJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgLi4ucGFuZWxTdHlsZSwgYm9yZGVyUmFkaXVzOiBHTE9CQUxfUkFESVVTIH19XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICAgICAgXCJ6LTM2MDAwMCBtaW4tdy1bMjIwcHhdIG1heC13LVtjYWxjKDEwMHZ3LTFyZW0pXSByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZSBwLTMgc2hhZG93LWxnXCIsXHJcbiAgICAgICAgICAgICAgICBwYW5lbENsYXNzTmFtZVxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMnB4XSB0ZXh0LXNsYXRlLTcwMCB3aGl0ZXNwYWNlLXByZS1saW5lXCI+e2NvbnRlbnR9PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj4sXHJcbiAgICAgICAgICAgIHBvcnRhbFRhcmdldFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIDogbnVsbH1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbmZvUG9wb3Zlckljb25CdXR0b247XHJcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xyXG5cclxudHlwZSBFeGNoYW5nZVJhdGVNb2RlVWlNZXRhID0ge1xyXG4gIGxhYmVsS2V5OiBzdHJpbmc7XHJcbiAgZmFsbGJhY2s6IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IEVYQ0hBTkdFX1JBVEVfTU9ERV9NRVRBOiBSZWNvcmQ8RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDb2RlLCBFeGNoYW5nZVJhdGVNb2RlVWlNZXRhPiA9IHtcclxuICAwOiB7XHJcbiAgICBsYWJlbEtleTogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX09mZmljaWFsXCIsXHJcbiAgICBmYWxsYmFjazogXCJULkMuIE9maWNpYWxcIixcclxuICB9LFxyXG4gIDE6IHtcclxuICAgIGxhYmVsS2V5OiBcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0V4Y2hhbmdlUmF0ZU1vZGVfTWFudWFsXCIsXHJcbiAgICBmYWxsYmFjazogXCJULkMuIE1hbnVhbFwiLFxyXG4gIH0sXHJcbn07XHJcbmNvbnN0IEVYQ0hBTkdFX1JBVEVfTU9ERV9DT0RFUzogRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDb2RlW10gPSBbMCwgMV07XHJcblxyXG4vLyBLZWVwcyBleGNoYW5nZSByYXRlIG1vZGUgdmFsdWVzIGNvbnN0cmFpbmVkIHRvIG51bWVyaWMgMCBvciAxLlxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNvZGUgfCBudWxsID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIGlmIChwYXJzZWQgPT09IDAgfHwgcGFyc2VkID09PSAxKSB7XHJcbiAgICByZXR1cm4gcGFyc2VkO1xyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbi8vIEJ1aWxkcyBmaXhlZCBvcHRpb25zIGZvciB0aGUgZXhjaGFuZ2UgcmF0ZSBtb2RlIGZpbHRlci5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlT3B0aW9ucyA9ICgpOiBFeHBlbnNlU2VsZWN0T3B0aW9uW10gPT4ge1xyXG4gIHJldHVybiBFWENIQU5HRV9SQVRFX01PREVfQ09ERVNcclxuICAgIC5tYXAoKGNvZGUpID0+IHtcclxuICAgICAgY29uc3QgbWV0YSA9IEVYQ0hBTkdFX1JBVEVfTU9ERV9NRVRBW2NvZGVdO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHZhbHVlOiBTdHJpbmcoY29kZSksXHJcbiAgICAgICAgdGV4dDogaW5kVChtZXRhLmxhYmVsS2V5LCBtZXRhLmZhbGxiYWNrKSxcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLy8gUmV0dXJucyBhIGxvY2FsaXplZCBtb2RlIGxhYmVsIG9yIGVtcHR5IHRleHQgZm9yIG5vbi1zZWxlY3RlZCB2YWx1ZXMuXHJcbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGUodmFsdWUpO1xyXG4gIGlmIChub3JtYWxpemVkID09PSBudWxsKSByZXR1cm4gXCJcIjtcclxuICBjb25zdCBtZXRhID0gRVhDSEFOR0VfUkFURV9NT0RFX01FVEFbbm9ybWFsaXplZF07XHJcbiAgcmV0dXJuIGluZFQobWV0YS5sYWJlbEtleSwgbWV0YS5mYWxsYmFjayk7XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0SGVhZGVyIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lTZWN0aW9uIGZyb20gXCIuL0V4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvbi50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQgZnJvbSBcIi4vRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VSZWFkT25seUZpZWxkIGZyb20gXCIuL0V4cGVuc2VSZWFkT25seUZpZWxkLnRzeFwiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlU3RhdHVzTGFiZWwgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VTdGF0dXNDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlTGFiZWwgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4Y2hhbmdlUmF0ZUVudHJ5TW9kZUNhdGFsb2cudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZU51bWJlciwgcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybU1vZGUgPSB7XG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBjYW5FZGl0SGVhZGVyRmllbGRzOiBib29sZWFuO1xuICBzdGF0dXNDb21tZW50TW9kZTogXCJoaWRkZW5cIiB8IFwicmVhZFwiO1xufTtcblxudHlwZSBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeUxvY2tzID0ge1xuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogYm9vbGVhbjtcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xuICBzaG93RXhjaGFuZ2VSYXRlOiBib29sZWFuO1xufTtcblxudHlwZSBFeHBlbnNlU2hlZXRIZWFkZXJGb3JtUHJvcHMgPSB7XG4gIG1vZGU6IEV4cGVuc2VTaGVldEhlYWRlckZvcm1Nb2RlO1xuICBjdXJyZW5jeUxvY2tzOiBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeUxvY2tzO1xuICBoZWFkZXI6IEV4cGVuc2VTaGVldEhlYWRlcjtcbiAgcHJvamVjdFZhbHVlOiBzdHJpbmc7XG4gIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5OiBzdHJpbmc7XG4gIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeTogc3RyaW5nO1xuICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQ6IG51bWJlcjtcbiAgZXhjaGFuZ2VSYXRlVmFsdWU6IHN0cmluZztcbiAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2U6IHN0cmluZztcbiAgdG90YWxBbW91bnRUZXh0OiBzdHJpbmc7XHJcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGRyYWZ0UHJvamVjdElkOiBzdHJpbmc7XHJcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBkcmFmdEV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWU6IHN0cmluZztcclxuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGU6IHN0cmluZztcclxuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZTogc3RyaW5nO1xyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdFByb2plY3RJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBFWENIQU5HRV9SQVRFX01PREVfUFJFRklYX1BBVFRFUk4gPSAvXlRcXC4/Q1xcLj9cXHMqL2k7XHJcblxyXG4vLyBQdXJlIHByZXNlbnRhdGlvbmFsIGhlYWRlciBmb3JtIGZvciBleHBlbnNlIHNoZWV0IGRldGFpbC9jcmVhdGUgc2NyZWVucy5cbmNvbnN0IEV4cGVuc2VTaGVldEhlYWRlckZvcm0gPSAoe1xuICBtb2RlLFxuICBjdXJyZW5jeUxvY2tzLFxuICBoZWFkZXIsXG4gIHByb2plY3RWYWx1ZSxcbiAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXG4gIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LFxuICBleGNoYW5nZVJhdGVWYWx1ZSxcbiAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXG4gIHRvdGFsQW1vdW50VGV4dCxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRyYWZ0UHJvamVjdElkLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsXHJcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLFxyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlLFxyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZSxcclxuICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlLFxyXG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2UsXG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2UsXG59OiBFeHBlbnNlU2hlZXRIZWFkZXJGb3JtUHJvcHMpID0+IHtcbiAgY29uc3QgeyBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgY2FuRWRpdEhlYWRlckZpZWxkcywgc3RhdHVzQ29tbWVudE1vZGUgfSA9IG1vZGU7XG4gIGNvbnN0IHsgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcywgc2hvd0V4Y2hhbmdlUmF0ZSB9ID0gY3VycmVuY3lMb2NrcztcbiAgY29uc3QgaXNGb3JlaWduQ3VycmVuY3kgPVxuICAgIGlzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzICYmIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5ICE9PSBcIlwiICYmIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5ICE9PSBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k7XHJcbiAgY29uc3QgZXhwZW5zZUN1cnJlbmN5TGFiZWwgPSBpc0ZvcmVpZ25DdXJyZW5jeVxyXG4gICAgPyBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9FeHBlbnNlQ3VycmVuY3lcIiwgXCJFeHBlbnNlIGN1cnJlbmN5XCIpXHJcbiAgICA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIik7XHJcbiAgY29uc3Qgc3RhdHVzVmFsdWUgPVxyXG4gICAgaGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gbnVsbCB8fCBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzID09PSB1bmRlZmluZWRcclxuICAgICAgPyBcIi1cIlxyXG4gICAgICA6IGdldEV4cGVuc2VTdGF0dXNMYWJlbChoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzKTtcclxuICBjb25zdCBoZWFkZXJDdXJyZW5jeUNvZGUgPSBzYWZlVGV4dChoZWFkZXIuY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpO1xyXG4gIGNvbnN0IGJhc2VDdXJyZW5jeUNvZGUgPSBzYWZlVGV4dChleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XHJcbiAgLy8gU3RhdHVzIGNvbW1lbnQgaXMgbm93IGVkaXRlZCBvbmx5IGluIHRoZSBzdGF0dXMgdHJhbnNpdGlvbiBwb3B1cC5cclxuICBjb25zdCBzdGF0dXNDb21tZW50VmFsdWUgPSBzYWZlVGV4dChoZWFkZXIuZXN0YWRvQ29tZW50YXJpb3MpO1xyXG4gIGNvbnN0IHNob3dTdGF0dXNDb21tZW50RmllbGQgPSAhaXNDcmVhdGVNb2RlICYmIHN0YXR1c0NvbW1lbnRNb2RlICE9PSBcImhpZGRlblwiO1xyXG4gIGNvbnN0IHBhcnNlZERyYWZ0RXhjaGFuZ2VSYXRlID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KGRyYWZ0RXhjaGFuZ2VSYXRlKTtcclxuICBjb25zdCBwYXJzZWRPZmZpY2lhbFJhd1JhdGUgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQob2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSk7XHJcbiAgY29uc3QgYmFzZUV4Y2hhbmdlUmF0ZVZhbHVlID1cclxuICAgIHBhcnNlZERyYWZ0RXhjaGFuZ2VSYXRlICE9IG51bGxcclxuICAgICAgPyBwYXJzZWREcmFmdEV4Y2hhbmdlUmF0ZVxyXG4gICAgICA6IHBhcnNlZE9mZmljaWFsUmF3UmF0ZSAhPSBudWxsXHJcbiAgICAgICAgPyBwYXJzZWRPZmZpY2lhbFJhd1JhdGUgKiBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnRcclxuICAgICAgICA6IG51bGw7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlSW5mb1ZhbHVlID0gZm9ybWF0RXhwZW5zZU51bWJlcihcclxuICAgIGJhc2VFeGNoYW5nZVJhdGVWYWx1ZSAhPSBudWxsID8gYmFzZUV4Y2hhbmdlUmF0ZVZhbHVlIC8gZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50IDogbnVsbCxcclxuICAgIHtcclxuICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiA3LFxyXG4gICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDcsXHJcbiAgICAgIHVzZUdyb3VwaW5nOiBmYWxzZSxcclxuICAgICAgZmFsbGJhY2s6IFwiMC4wMDAwMDAwXCIsXHJcbiAgICB9XHJcbiAgKTtcclxuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlVmFsdWUgPSBOdW1iZXIoaGVhZGVyLmV4Y2hhbmdlUmF0ZU1vZGUpID09PSAxID8gMSA6IDA7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlTW9kZUtleSA9XHJcbiAgICBleGNoYW5nZVJhdGVNb2RlVmFsdWUgPT09IDFcclxuICAgICAgPyBcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0V4Y2hhbmdlUmF0ZU1vZGVfTWFudWFsXCJcclxuICAgICAgOiBcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0V4Y2hhbmdlUmF0ZU1vZGVfT2ZmaWNpYWxcIjtcclxuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlRmFsbGJhY2sgPSBleGNoYW5nZVJhdGVNb2RlVmFsdWUgPT09IDEgPyBcIlQuQy4gTWFudWFsXCIgOiBcIlQuQy4gT2ZpY2lhbFwiO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCA9XHJcbiAgICAoZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVMYWJlbChleGNoYW5nZVJhdGVNb2RlVmFsdWUpIHx8IGluZFQoZXhjaGFuZ2VSYXRlTW9kZUtleSwgZXhjaGFuZ2VSYXRlTW9kZUZhbGxiYWNrKSlcclxuICAgICAgLnJlcGxhY2UoRVhDSEFOR0VfUkFURV9NT0RFX1BSRUZJWF9QQVRURVJOLCBcIlwiKVxyXG4gICAgICAudHJpbSgpXHJcbiAgICAgIC50b0xvd2VyQ2FzZSgpIHx8IChleGNoYW5nZVJhdGVNb2RlVmFsdWUgPT09IDEgPyBcIm1hbnVhbFwiIDogXCJvZmljaWFsXCIpO1xyXG4gIGNvbnN0IGhhc0VuZHBvaW50RXhjaGFuZ2VSYXRlRGF0YSA9XHJcbiAgICAhIXNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUpIHx8ICEhc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKSB8fCAhIXNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKTtcclxuICBjb25zdCBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9EYXRlID0gc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKSB8fCBpbmRUKFwiQ29tbW9uX05vdEF2YWlsYWJsZVwiLCBcIk4vQVwiKTtcclxuICBjb25zdCBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9Tb3VyY2UgPSBzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSlcclxuICAgIC5yZXBsYWNlKC9cXHMqXFwoW14oKV0qXFwpXFxzKi9nLCBcIiBcIilcclxuICAgIC5yZXBsYWNlKC9cXHN7Mix9L2csIFwiIFwiKVxyXG4gICAgLnRyaW0oKSB8fCBpbmRUKFwiQ29tbW9uX05vdEF2YWlsYWJsZVwiLCBcIk4vQVwiKTtcclxuICBjb25zdCBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlID0gaW5kRm9ybWF0KFxyXG4gICAgXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9JbmZvUG9wb3Zlcl9EZXRhaWxcIixcclxuICAgIFwiVGlwbyBkZSBjYW1iaW8gb2J0ZW5pZG8gezB9XFxuRmVjaGE6IHsxfVxcbk9yaWdlbjogezJ9XCIsXHJcbiAgICBzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKSB8fCBcIjAuMDAwMDAwMFwiLFxyXG4gICAgZW5kcG9pbnRFeGNoYW5nZVJhdGVJbmZvRGF0ZSxcclxuICAgIGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb1NvdXJjZVxyXG4gICk7XHJcbiAgY29uc3Qgc3RvcmVkRXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UgPSBpbmRGb3JtYXQoXHJcbiAgICBcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX0luZm9Qb3BvdmVyX1N0b3JlZFwiLFxyXG4gICAgXCJUaXBvIGRlIGNhbWJpbyB7MH0gezF9XCIsXHJcbiAgICBleGNoYW5nZVJhdGVNb2RlTGFiZWwsXHJcbiAgICBleGNoYW5nZVJhdGVJbmZvVmFsdWVcclxuICApO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlID0gaGFzRW5kcG9pbnRFeGNoYW5nZVJhdGVEYXRhID8gZW5kcG9pbnRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZSA6IHN0b3JlZEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicmVsYXRpdmUgc2hhZG93LXhzIGdsYXNzLXBhbmVsIHAtNCBzcGFjZS15LTQgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV1cIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCI+XHJcbiAgICAgICAgeyFpc0NyZWF0ZU1vZGUgPyAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1NoZWV0SWRcIiwgXCJFeHBlbnNlIHNoZWV0IGNvZGVcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtzYWZlVGV4dChoZWFkZXIuaG9qYUdhc3Rvc0lkKSB8fCBcIi1cIn1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgeyFpc0NyZWF0ZU1vZGUgPyA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1N0YXR1c1wiLCBcIlN0YXR1c1wiKX0gdmFsdWU9e3N0YXR1c1ZhbHVlfSAvPiA6IG51bGx9XHJcbiAgICAgICAge3Nob3dTdGF0dXNDb21tZW50RmllbGQgPyAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1N0YXR1c0NvbW1lbnRcIiwgXCJTdGF0dXMgY29tbWVudFwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e3N0YXR1c0NvbW1lbnRWYWx1ZSB8fCBcIi1cIn1cclxuICAgICAgICAgICAgZnVsbFdpZHRoXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgIHtpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkcyA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBzcGFjZS15LTEuNVwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcclxuICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnREZXNjcmlwdGlvbn1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxyXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17c2FmZVRleHQoaGVhZGVyLmRlc2NyaXB0aW9uKSB8fCBcIi1cIn1cclxuICAgICAgICAgICAgZnVsbFdpZHRoXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICl9XHJcbiAgICAgICAge2lzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzID8gKFxyXG4gICAgICAgICAgPEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1Byb2plY3RfUGxhY2Vob2xkZXJcIiwgXCJQcm9qZWN0IGlkXCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17ZHJhZnRQcm9qZWN0SWR9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0UHJvamVjdElkQ2hhbmdlfVxyXG4gICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZyB8fCAhY2FuRWRpdEhlYWRlckZpZWxkc31cclxuICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmcgfHwgIWNhbkVkaXRIZWFkZXJGaWVsZHN9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICkgOiBwcm9qZWN0VmFsdWUgPyAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfSB2YWx1ZT17cHJvamVjdFZhbHVlfSAvPlxyXG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICA8RXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lTZWN0aW9uXG4gICAgICAgICAgaW50ZXJhY3Rpb249e3sgaXNFZGl0aW5nLCBjYW5FZGl0SGVhZGVyRmllbGRzIH19XG4gICAgICAgICAgY3VycmVuY3lTdGF0ZT17eyBpc0ZvcmVpZ25DdXJyZW5jeSwgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcywgc2hvd0V4Y2hhbmdlUmF0ZSB9fVxuICAgICAgICAgIGV4cGVuc2VDdXJyZW5jeUxhYmVsPXtleHBlbnNlQ3VycmVuY3lMYWJlbH1cbiAgICAgICAgICBoZWFkZXJDdXJyZW5jeUNvZGU9e2hlYWRlckN1cnJlbmN5Q29kZX1cbiAgICAgICAgICBiYXNlQ3VycmVuY3lDb2RlPXtiYXNlQ3VycmVuY3lDb2RlfVxuICAgICAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlPXtkcmFmdEN1cnJlbmN5Q29kZX1cclxuICAgICAgICAgIGRyYWZ0RXhjaGFuZ2VSYXRlPXtkcmFmdEV4Y2hhbmdlUmF0ZX1cclxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZVZhbHVlPXtleGNoYW5nZVJhdGVWYWx1ZX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZT17ZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2V9XG4gICAgICAgICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50PXtleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnR9XG4gICAgICAgICAgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2U9e2V4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlfVxuICAgICAgICAgIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U9e29uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2V9XG4gICAgICAgICAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZT17b25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZX1cbiAgICAgICAgLz5cclxuICAgICAgICB7IWlzQ3JlYXRlTW9kZSA/IDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVG90YWxBbW91bnRcIiwgXCJUb3RhbCBhbW91bnRcIil9IHZhbHVlPXt0b3RhbEFtb3VudFRleHR9IC8+IDogbnVsbH1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldEhlYWRlckZvcm07XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBDb21wYWN0UGFnaW5hdGlvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbXBhY3RQYWdpbmF0aW9uLnRzeFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kgfSBmcm9tIFwiLi4vZXhwZW5zZUZvcm1hdHRlcnMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0TGluZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURhdGVQYXJ0cywgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VTZWN0aW9uRGl2aWRlciBmcm9tIFwiLi9FeHBlbnNlU2VjdGlvbkRpdmlkZXIudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlVGltZWxpbmVDYXJkIGZyb20gXCIuL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4XCI7XHJcblxyXG50eXBlIFBhZ2luYXRpb25MYWJlbHMgPSB7XHJcbiAgZmlyc3Q6IHN0cmluZztcclxuICBwcmV2OiBzdHJpbmc7XHJcbiAgbmV4dDogc3RyaW5nO1xyXG4gIGxhc3Q6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZUxpbmVzVGltZWxpbmVQcm9wcyA9IHtcclxuICB2aXNpYmxlTGluZXM6IEV4cGVuc2VTaGVldExpbmVbXTtcclxuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICB0b3RhbExpbmVQYWdlczogbnVtYmVyO1xyXG4gIGxpbmVQYWdlOiBudW1iZXI7XHJcbiAgbGluZXNMYWJlbDogc3RyaW5nO1xyXG4gIGVtcHR5VGV4dDogc3RyaW5nO1xyXG4gIHBhZ2luYXRpb25MYWJlbHM6IFBhZ2luYXRpb25MYWJlbHM7XHJcbiAgY29udGFpbmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBvbkxpbmVQYWdlQ2hhbmdlOiAocGFnZTogbnVtYmVyKSA9PiB2b2lkO1xyXG4gIG9uT3BlbkxpbmU6IChsaW5lUmVjSWQ6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIER1bWIgdGltZWxpbmUgZm9yIGV4cGVuc2Ugc2hlZXQgbGluZXMgd2l0aCBzdGFuZGFyZCBjYXJkIGFuZCBwYWdpbmF0aW9uIGxheW91dC5cclxuY29uc3QgRXhwZW5zZUxpbmVzVGltZWxpbmUgPSAoe1xyXG4gIHZpc2libGVMaW5lcyxcclxuICBjdXJyZW5jeUNvZGUsXHJcbiAgdG90YWxMaW5lUGFnZXMsXHJcbiAgbGluZVBhZ2UsXHJcbiAgbGluZXNMYWJlbCxcclxuICBlbXB0eVRleHQsXHJcbiAgcGFnaW5hdGlvbkxhYmVscyxcclxuICBjb250YWluZXJSZWYsXHJcbiAgb25MaW5lUGFnZUNoYW5nZSxcclxuICBvbk9wZW5MaW5lLFxyXG59OiBFeHBlbnNlTGluZXNUaW1lbGluZVByb3BzKSA9PiB7XG4gIGNvbnN0IHByb2plY3RMYWJlbCA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpO1xuXG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic3BhY2UteS0wXCI+XHJcbiAgICAgIDxFeHBlbnNlU2VjdGlvbkRpdmlkZXIgbGFiZWw9e2xpbmVzTGFiZWx9IGNsYXNzTmFtZT1cImV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyLS1zcGFjZWRcIiAvPlxyXG5cclxuICAgICAge3Zpc2libGVMaW5lcy5sZW5ndGggPT09IDAgPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3ggdGltZWxpbmUtZW1wdHlcIiBkYXRhLWVtcHR5LXRleHQ9e2VtcHR5VGV4dH0gLz5cclxuICAgICAgKSA6IChcclxuICAgICAgICA8ZGl2IHJlZj17Y29udGFpbmVyUmVmfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3hcIj5cclxuICAgICAgICAgIHt2aXNpYmxlTGluZXMubWFwKChsaW5lLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5lSWQgPSBzYWZlVGV4dChsaW5lLmxpbmVSZWNJZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gc2FmZVRleHQobGluZS5kZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgIGNvbnN0IGFtb3VudFRleHQgPSBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kobGluZS5hbW91bnQgPz8gbnVsbCwgY3VycmVuY3lDb2RlKTtcbiAgICAgICAgICAgIGNvbnN0IGxpbmtlZFRpY2tldEZpbGVJZCA9IHNhZmVUZXh0KGxpbmUuZmlsZUlkKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RJZCA9IHNhZmVUZXh0KGxpbmUucHJvaklkKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RTdWJ0aXRsZSA9IHByb2plY3RJZCA/IGAke3Byb2plY3RMYWJlbH06ICR7cHJvamVjdElkfWAgOiBcIlwiO1xuICAgICAgICAgICAgY29uc3QgZGF0ZVBhcnRzID0gZm9ybWF0RXhwZW5zZURhdGVQYXJ0cyhzYWZlVGV4dChsaW5lLnRyYW5zRGF0ZSksIGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiKTtcbiAgICAgICAgICAgIGNvbnN0IHRpY2tldFN0YXR1c0ljb24gPSBsaW5rZWRUaWNrZXRGaWxlSWQgPyAoXHJcbiAgICAgICAgICAgICAgPHN2Z1xyXG4gICAgICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgICAgICAgICAgICBmaWxsPVwibm9uZVwiXHJcbiAgICAgICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXsxLjV9XHJcbiAgICAgICAgICAgICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic2l6ZS00XCJcbiAgICAgICAgICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICBkPVwiTTEzLjE5IDguNjg4YTQuNSA0LjUgMCAwIDEgMS4yNDIgNy4yNDRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMS02LjM2NC02LjM2NGwxLjc1Ny0xLjc1N20xMy4zNS0uNjIyIDEuNzU3LTEuNzU3YTQuNSA0LjUgMCAwIDAtNi4zNjQtNi4zNjRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMCAxLjI0MiA3LjI0NFwiXHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICApIDogbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2xpbmVJZCB8fCBgJHtzYWZlVGV4dChsaW5lLnRyYW5zRGF0ZSl9LSR7ZGVzY3JpcHRpb259LSR7YW1vdW50VGV4dH0tJHtwcm9qZWN0SWR9YH0gY2xhc3NOYW1lPVwidGltZWxpbmUtaXRlbVwiPlxuICAgICAgICAgICAgICAgIDxFeHBlbnNlVGltZWxpbmVDYXJkXHJcbiAgICAgICAgICAgICAgICAgIGRhdGVQYXJ0cz17ZGF0ZVBhcnRzfVxyXG4gICAgICAgICAgICAgICAgICB0aXRsZT17ZGVzY3JpcHRpb24gfHwgbGluZUlkIHx8IFwiLVwifVxyXG4gICAgICAgICAgICAgICAgICBhbW91bnRUZXh0PXthbW91bnRUZXh0fVxuICAgICAgICAgICAgICAgICAgb25PcGVuPXsoKSA9PiBvbk9wZW5MaW5lKGxpbmVJZCl9XG4gICAgICAgICAgICAgICAgICBzdWJ0aXRsZT17cHJvamVjdFN1YnRpdGxlfVxuICAgICAgICAgICAgICAgICAgdGl0bGVDbGFzc05hbWU9XCJ0aW1lbGluZS1uYW1lIGV4cGVuc2UtbGluZS1jYXJkX190aXRsZVwiXG4gICAgICAgICAgICAgICAgICBzdWJ0aXRsZUNsYXNzTmFtZT1cImV4cGVuc2Utc2hlZXQtY2FyZF9fc3VidGl0bGUgZXhwZW5zZS1saW5lLWNhcmRfX21ldGFcIlxuICAgICAgICAgICAgICAgICAgc3RhdHVzSWNvbj17dGlja2V0U3RhdHVzSWNvbn1cbiAgICAgICAgICAgICAgICAgIHN0YXR1c0ljb25DbGFzc05hbWU9XCJleHBlbnNlLWxpbmUtY2FyZF9fdGlja2V0LWljb25cIlxyXG4gICAgICAgICAgICAgICAgICBzdGF0dXNMYWJlbD17bGlua2VkVGlja2V0RmlsZUlkIHx8IHVuZGVmaW5lZH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KX1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKX1cclxuXHJcbiAgICAgIDxDb21wYWN0UGFnaW5hdGlvblxyXG4gICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsTGluZVBhZ2VzfVxyXG4gICAgICAgIGN1cnJlbnRQYWdlPXtsaW5lUGFnZX1cclxuICAgICAgICBvblBhZ2VDaGFuZ2U9e29uTGluZVBhZ2VDaGFuZ2V9XHJcbiAgICAgICAgbGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxyXG4gICAgICAvPlxyXG4gICAgPC9zZWN0aW9uPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlTGluZXNUaW1lbGluZTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFBhZ2VCb3R0b21BY3Rpb25zLCB7IFBhZ2VCb3R0b21BY3Rpb25CdXR0b24gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1BhZ2VCb3R0b21BY3Rpb25zLnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb24gfSBmcm9tIFwiLi9leHBlbnNlU2hlZXREZXRhaWxQb2xpY3kudHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyUHJvcHMgPSB7XHJcbiAgYWN0aW9uczogRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uW107XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgb25BY3Rpb25DbGljazogKGFjdGlvbjogRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyB0aGUgYm90dG9tIHRvb2xiYXIgZm9yIGV4cGVuc2Ugc2hlZXQgc3RhdHVzIHRyYW5zaXRpb25zLlxyXG5jb25zdCBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25CYXIgPSAoeyBhY3Rpb25zLCBidXN5LCBkaXNhYmxlZCA9IGZhbHNlLCBvbkFjdGlvbkNsaWNrIH06IEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbkJhclByb3BzKSA9PiB7XHJcbiAgaWYgKGFjdGlvbnMubGVuZ3RoIDwgMSkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPFBhZ2VCb3R0b21BY3Rpb25zIGFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfQm90dG9tQWN0aW9uc19Ub29sYmFyXCIsIFwiRXhwZW5zZSBzaGVldCBzdGF0dXMgYWN0aW9uc1wiKX0+XHJcbiAgICAgIHthY3Rpb25zLm1hcCgoYWN0aW9uKSA9PiAoXHJcbiAgICAgICAgPFBhZ2VCb3R0b21BY3Rpb25CdXR0b25cclxuICAgICAgICAgIGtleT17YWN0aW9uLmlkfVxyXG4gICAgICAgICAgbGFiZWw9e2luZFQoYWN0aW9uLmxhYmVsS2V5LCBhY3Rpb24uZmFsbGJhY2spfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e2J1c3kgfHwgZGlzYWJsZWR9XHJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkFjdGlvbkNsaWNrKGFjdGlvbil9XHJcbiAgICAgICAgLz5cclxuICAgICAgKSl9XHJcbiAgICA8L1BhZ2VCb3R0b21BY3Rpb25zPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25CYXI7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlUXVpY2tUaWNrZXRQcm9ncmVzc092ZXJsYXkgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5LnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgVElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEUgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dDb3JlLnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzUHJvcHMgPSB7XHJcbiAgbW9kYWw6IHtcclxuICAgIG9wZW46IGJvb2xlYW47XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XHJcbiAgICBjYW5jZWxUZXh0Pzogc3RyaW5nO1xyXG4gICAgc2hvd0NhbmNlbD86IGJvb2xlYW47XHJcbiAgICBzaG93Q29uZmlybT86IGJvb2xlYW47XHJcbiAgfTtcclxuICBtb2RhbEVycm9yOiBzdHJpbmc7XHJcbiAgc3RhdHVzOiBzdHJpbmc7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGU6IGJvb2xlYW47XHJcbiAgbW9kYWxMb2FkaW5nVGV4dDogc3RyaW5nO1xyXG4gIG1vZGFsQ2FuY2VsVGV4dDogc3RyaW5nO1xyXG4gIG1vZGFsQ29uZmlybVRleHQ6IHN0cmluZztcclxuICBtb2RhbEJvZHk/OiBSZWFjdC5SZWFjdE5vZGU7XHJcbiAgY2FtZXJhSW5wdXRSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XHJcbiAgZ2FsbGVyeUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gIHNvdXJjZVBpY2tlck9wZW46IGJvb2xlYW47XHJcbiAgcXVpY2tUaWNrZXRCdXN5OiBib29sZWFuO1xyXG4gIHF1aWNrVGlja2V0UHJvZ3Jlc3NNZXNzYWdlOiBzdHJpbmc7XHJcbiAgcXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlczogQXJyYXk8e1xyXG4gICAga2V5OiBzdHJpbmc7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIHN0YXRlOiBcImNvbXBsZXRlZFwiIHwgXCJhY3RpdmVcIiB8IFwicGVuZGluZ1wiO1xyXG4gIH0+O1xyXG4gIHF1aWNrVGlja2V0RWxhcHNlZE1zOiBudW1iZXI7XHJcbiAgcXVpY2tUaWNrZXRFcnJvck1lc3NhZ2U6IHN0cmluZztcclxuICBxdWlja1RpY2tldEF0dGVtcHRJZDogc3RyaW5nO1xyXG4gIHF1aWNrVGlja2V0VHJhY2VMaXN0OiBBcnJheTx7IHN0ZXA6IHN0cmluZzsgdHJhY2VJZDogc3RyaW5nOyBhdDogc3RyaW5nIH0+O1xyXG4gIGhhc1BlbmRpbmdVcGxvYWRSZXRyeTogYm9vbGVhbjtcclxuICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZTogYm9vbGVhbjtcclxuICBvbkNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbiAgb25DYW5jZWw6ICgpID0+IHZvaWQ7XHJcbiAgb25TZWxlY3RlZENhbWVyYUZpbGU6IChmaWxlOiBGaWxlIHwgbnVsbCkgPT4gdm9pZDtcclxuICBvblNlbGVjdGVkR2FsbGVyeUZpbGU6IChmaWxlOiBGaWxlIHwgbnVsbCkgPT4gdm9pZDtcclxuICBvblNlbGVjdEZyb21DYW1lcmE6ICgpID0+IHZvaWQ7XHJcbiAgb25TZWxlY3RGcm9tR2FsbGVyeTogKCkgPT4gdm9pZDtcbiAgb25DbG9zZVNvdXJjZVBpY2tlcjogKCkgPT4gdm9pZDtcbiAgb25SZXRyeVBlbmRpbmdVcGxvYWQ6ICgpID0+IHZvaWQ7XG4gIG9uQ2xlYXJRdWlja1RpY2tldEVycm9yOiAoKSA9PiB2b2lkO1xufTtcblxyXG4vLyBSZW5kZXJzIG1vZGFsIGFuZCBxdWljay10aWNrZXQgb3ZlcmxheXMgZm9yIHRoZSBleHBlbnNlIHNoZWV0IGRldGFpbCBwYWdlLlxyXG5jb25zdCBFeHBlbnNlU2hlZXREZXRhaWxPdmVybGF5cyA9ICh7XHJcbiAgbW9kYWwsXHJcbiAgbW9kYWxFcnJvcixcclxuICBzdGF0dXMsXHJcbiAgYnVzeSxcclxuICBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsXHJcbiAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICBtb2RhbENhbmNlbFRleHQsXHJcbiAgbW9kYWxDb25maXJtVGV4dCxcclxuICBtb2RhbEJvZHksXHJcbiAgY2FtZXJhSW5wdXRSZWYsXHJcbiAgZ2FsbGVyeUlucHV0UmVmLFxyXG4gIHNvdXJjZVBpY2tlck9wZW4sXHJcbiAgcXVpY2tUaWNrZXRCdXN5LFxyXG4gIHF1aWNrVGlja2V0UHJvZ3Jlc3NNZXNzYWdlLFxyXG4gIHF1aWNrVGlja2V0UHJvZ3Jlc3NTdGFnZXMsXHJcbiAgcXVpY2tUaWNrZXRFbGFwc2VkTXMsXHJcbiAgcXVpY2tUaWNrZXRFcnJvck1lc3NhZ2UsXHJcbiAgcXVpY2tUaWNrZXRBdHRlbXB0SWQsXHJcbiAgcXVpY2tUaWNrZXRUcmFjZUxpc3QsXHJcbiAgaGFzUGVuZGluZ1VwbG9hZFJldHJ5LFxyXG4gIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlLFxyXG4gIG9uQ29uZmlybSxcclxuICBvbkNhbmNlbCxcclxuICBvblNlbGVjdGVkQ2FtZXJhRmlsZSxcclxuICBvblNlbGVjdGVkR2FsbGVyeUZpbGUsXHJcbiAgb25TZWxlY3RGcm9tQ2FtZXJhLFxyXG4gIG9uU2VsZWN0RnJvbUdhbGxlcnksXG4gIG9uQ2xvc2VTb3VyY2VQaWNrZXIsXG4gIG9uUmV0cnlQZW5kaW5nVXBsb2FkLFxuICBvbkNsZWFyUXVpY2tUaWNrZXRFcnJvcixcbn06IEV4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxDb25maXJtTW9kYWxcclxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxyXG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cclxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxyXG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbENvbmZpcm1UZXh0fVxyXG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cclxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cclxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxyXG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cclxuICAgICAgICBidXN5PXtidXN5IHx8IGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZX1cclxuICAgICAgICBlcnJvcj17bW9kYWxFcnJvcn1cclxuICAgICAgICBzdGF0dXM9e3N0YXR1c31cclxuICAgICAgICBvbkNvbmZpcm09e29uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17b25DYW5jZWx9XHJcbiAgICAgID5cclxuICAgICAgICB7bW9kYWxCb2R5fVxyXG4gICAgICA8L0NvbmZpcm1Nb2RhbD5cclxuXHJcbiAgICAgIDxpbnB1dFxyXG4gICAgICAgIHJlZj17Y2FtZXJhSW5wdXRSZWZ9XHJcbiAgICAgICAgdHlwZT1cImZpbGVcIlxyXG4gICAgICAgIGFjY2VwdD17VElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEV9XHJcbiAgICAgICAgY2FwdHVyZT1cImVudmlyb25tZW50XCJcclxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxyXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGZpbGUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmZpbGVzPy5bMF0gfHwgbnVsbDtcclxuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgb25TZWxlY3RlZENhbWVyYUZpbGUoZmlsZSk7XHJcbiAgICAgICAgfX1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIDxpbnB1dFxyXG4gICAgICAgIHJlZj17Z2FsbGVyeUlucHV0UmVmfVxyXG4gICAgICAgIHR5cGU9XCJmaWxlXCJcclxuICAgICAgICBhY2NlcHQ9e1RJQ0tFVF9JTUFHRV9BQ0NFUFRfQVRUUklCVVRFfVxyXG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXHJcbiAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZmlsZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZmlsZXM/LlswXSB8fCBudWxsO1xyXG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICBvblNlbGVjdGVkR2FsbGVyeUZpbGUoZmlsZSk7XHJcbiAgICAgICAgfX1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIHtzb3VyY2VQaWNrZXJPcGVuID8gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTYwMDAwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1zbGF0ZS05NTAvNDUgcHgtNCBweS02XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtYXgtdy1zbSByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZSBwLTQgc2hhZG93LXhsXCI+XHJcbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LVsxNnB4XSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtODAwXCI+XHJcbiAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfVGl0bGVcIiwgXCJOdWV2byB0aWNrZXRcIil9XHJcbiAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgICAgIHtpbmRUKFxyXG4gICAgICAgICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfQm9keVwiLFxyXG4gICAgICAgICAgICAgICAgXCJTZWxlY2Npb25hIHVuYSBmdWVudGUgcGFyYSBjYXB0dXJhciBvIGVsZWdpciBsYSBpbWFnZW4gZGVsIHRpY2tldC5cIlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDwvcD5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNCBncmlkIGdyaWQtY29scy0xIGdhcC0yXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCIgb25DbGljaz17b25TZWxlY3RGcm9tQ2FtZXJhfT5cclxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX0NhbWVyYVwiLCBcIlVzYXIgY1x1MDBFMW1hcmFcIil9XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCIgb25DbGljaz17b25TZWxlY3RGcm9tR2FsbGVyeX0+XHJcbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9HYWxsZXJ5XCIsIFwiRWxlZ2lyIGltYWdlblwiKX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIiBvbkNsaWNrPXtvbkNsb3NlU291cmNlUGlja2VyfT5cclxuICAgICAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICA8RXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5XHJcbiAgICAgICAgb3Blbj17cXVpY2tUaWNrZXRCdXN5fVxyXG4gICAgICAgIHRpdGxlPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUHJvZ3Jlc3NfVGl0bGVcIiwgXCJQcm9jZXNzaW5nIHRpY2tldFwiKX1cclxuICAgICAgICBzdW1tYXJ5PXtxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICAgIGVsYXBzZWRNcz17cXVpY2tUaWNrZXRFbGFwc2VkTXN9XHJcbiAgICAgICAgc3RhZ2VzPXtxdWlja1RpY2tldFByb2dyZXNzU3RhZ2VzfVxyXG4gICAgICAvPlxyXG5cclxuICAgICAge3F1aWNrVGlja2V0RXJyb3JNZXNzYWdlID8gKFxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzTmFtZT17XHJcbiAgICAgICAgICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlXHJcbiAgICAgICAgICAgICAgPyBcImdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIHNwYWNlLXktMiByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLWFtYmVyLTIwMCBiZy1hbWJlci01MCBwLTMgdGV4dC1zbSB0ZXh0LWFtYmVyLTkwMFwiXHJcbiAgICAgICAgICAgICAgOiBcImdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIHNwYWNlLXktMiByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXJvc2UtNTAgcC0zIHRleHQtc20gdGV4dC1yb3NlLTgwMFwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHA+e3F1aWNrVGlja2V0RXJyb3JNZXNzYWdlfTwvcD5cclxuICAgICAgICAgIHtxdWlja1RpY2tldEF0dGVtcHRJZCA/IChcclxuICAgICAgICAgICAgPHBcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICAgICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmVcclxuICAgICAgICAgICAgICAgICAgPyBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItYW1iZXItMjAwIGJnLXdoaXRlIHB4LTIgcHktMSBmb250LW1vbm8gdGV4dC1bMTFweF0gdGV4dC1hbWJlci05MDAgYnJlYWstYWxsXCJcclxuICAgICAgICAgICAgICAgICAgOiBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctd2hpdGUgcHgtMiBweS0xIGZvbnQtbW9ubyB0ZXh0LVsxMXB4XSB0ZXh0LXJvc2UtODAwIGJyZWFrLWFsbFwiXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge2BhdHRlbXB0SWQ6ICR7cXVpY2tUaWNrZXRBdHRlbXB0SWR9YH1cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICB7cXVpY2tUaWNrZXRUcmFjZUxpc3QubGVuZ3RoID4gMCA/IChcclxuICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17XHJcbiAgICAgICAgICAgICAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZVxyXG4gICAgICAgICAgICAgICAgICA/IFwicm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1hbWJlci0yMDAgYmctd2hpdGUgcC0yIHRleHQteHMgdGV4dC1hbWJlci04MDBcIlxyXG4gICAgICAgICAgICAgICAgICA6IFwicm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy13aGl0ZSBwLTIgdGV4dC14cyB0ZXh0LXJvc2UtNzAwXCJcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7cXVpY2tUaWNrZXRUcmFjZUxpc3QubWFwKChlbnRyeSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPHAga2V5PXtgJHtlbnRyeS5zdGVwfS0ke2VudHJ5LmF0fWB9PntgJHtlbnRyeS5zdGVwfTogJHtlbnRyeS50cmFjZUlkfWB9PC9wPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTJcIj5cbiAgICAgICAgICAgIHtoYXNQZW5kaW5nVXBsb2FkUmV0cnkgPyAoXG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIiBvbkNsaWNrPXtvblJldHJ5UGVuZGluZ1VwbG9hZH0+XG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9SZXRyeVVwbG9hZFwiLCBcIlJlaW50ZW50YXIgdXBsb2FkXCIpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIiBvbkNsaWNrPXtvbkNsZWFyUXVpY2tUaWNrZXRFcnJvcn0+XHJcbiAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fQ2xvc2VcIiwgXCJDbG9zZVwiKX1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSA6IG51bGx9XHJcbiAgICA8Lz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXM7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcclxuaW1wb3J0IHsgdXNlQXV0aENvbnRleHQgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcclxuaW1wb3J0IHsgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUaW1lbGluZUNhcmRFZmZlY3RzLnRzXCI7XHJcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xyXG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XG5pbXBvcnQgeyBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VNYW5hZ2VkVXNlclNjb3BlLnRzXCI7XHJcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsLCByZWxvYWRFeHBlbnNlUGFnZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBzYXZlRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQudHNcIjtcclxuaW1wb3J0IHsgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VTdGF0dXNMYWJlbCB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVN0YXR1c0NhdGFsb2cudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93LnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZSB9IGZyb20gXCIuLi9saXN0L3VzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZS50c1wiO1xyXG5cclxuY29uc3QgTElORVNfUEFHRV9TSVpFID0gNjtcclxuY29uc3QgRVhQRU5TRV9TVEFUVVNfQVBQUk9WQUxfUkVRVUVTVEVEID0gMTtcclxuXHJcbmNvbnN0IHBhZ2VkU2xpY2UgPSA8VCw+KGl0ZW1zOiBUW10sIHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcik6IFRbXSA9PiB7XHJcbiAgaWYgKCFpdGVtcy5sZW5ndGgpIHJldHVybiBbXTtcclxuICBjb25zdCBzYWZlUGFnZSA9IE1hdGgubWF4KDEsIHBhZ2UpO1xyXG4gIGNvbnN0IHN0YXJ0ID0gKHNhZmVQYWdlIC0gMSkgKiBwYWdlU2l6ZTtcclxuICByZXR1cm4gaXRlbXMuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgcGFnZVNpemUpO1xyXG59O1xyXG5cclxuLy8gVHJlYXRzIG9ubHkgcG9zaXRpdmUgbnVtZXJpYyB0b3RhbHMgYXMgYWN0aW9uYWJsZSBzaGVldCBjb250ZW50LlxyXG5jb25zdCBoYXNQb3NpdGl2ZVRvdGFsQW1vdW50ID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcclxuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgJiYgcGFyc2VkID4gMDtcclxufTtcclxuXHJcbmNvbnN0IE5ld1RpY2tldEljb24gPSAoKSA9PiAoXHJcbiAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD17MS41fSBhcmlhLWhpZGRlbj1cInRydWVcIiBjbGFzc05hbWU9XCJzaXplLTVcIj5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xMCAyMGgtNWEyIDIgMCAwIDEgLTIgLTJ2LTlhMiAyIDAgMCAxIDIgLTJoMWEyIDIgMCAwIDAgMiAtMmExIDEgMCAwIDEgMSAtMWg2YTEgMSAwIDAgMSAxIDFhMiAyIDAgMCAwIDIgMmgxYTIgMiAwIDAgMSAyIDJ2MlwiIC8+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNC4zNjIgMTEuMTVhMyAzIDAgMSAwIC00LjE0NCA0LjI2M1wiIC8+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAyMXYtNGEyIDIgMCAxIDEgNCAwdjRcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgMTloNFwiIC8+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0yMSAxNXY2XCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IExpbmtUaWNrZXRJY29uID0gKCkgPT4gKFxyXG4gIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9ezEuNX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3NOYW1lPVwic2l6ZS01XCI+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTMuMTkgOC42ODhhNC41IDQuNSAwIDAgMSAxLjI0MiA3LjI0NGwtNC41IDQuNWE0LjUgNC41IDAgMCAxLTYuMzY0LTYuMzY0bDEuNzU3LTEuNzU3bTEzLjM1LS42MjIgMS43NTctMS43NTdhNC41IDQuNSAwIDAgMC02LjM2NC02LjM2NGwtNC41IDQuNWE0LjUgNC41IDAgMCAwIDEuMjQyIDcuMjQ0XCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbmNvbnN0IE5ld0xpbmVJY29uID0gKCkgPT4gKFxyXG4gIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9ezEuNX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3NOYW1lPVwic2l6ZS01XCI+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMyAxOWMzLjMzMyAtMiA1IC00IDUgLTZjMCAtMyAtMSAtMyAtMiAtM3MtMi4wMzIgMS4wODUgLTIgM2MuMDM0IDIuMDQ4IDEuNjU4IDIuODc3IDIuNSA0YzEuNSAyIDIuNSAyLjUgMy41IDFjLjY2NyAtMSAxLjE2NyAtMS44MzMgMS41IC0yLjVjMSAyLjMzMyAyLjMzMyAzLjUgNCAzLjVoMi41XCIgLz5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTIwIDE3di0xMmMwIC0xLjEyMSAtLjg3OSAtMiAtMiAtMnMtMiAuODc5IC0yIDJ2MTJsMiAybDIgLTJcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTYgN2g0XCIgLz5cclxuICA8L3N2Zz5cclxuKTtcclxuXHJcbi8vIEluaXRpYWxpemVzIGF1dGggc2VlZCBmb3IgZXhwZW5zZSBBUEkgY2FsbHMgYmVmb3JlIGlzbGFuZCBlZmZlY3RzIHJ1bi5cclxuZXhwb3J0IGNvbnN0IGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoID0gKCkgPT4ge1xyXG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoKHtcclxuICAgIHRva2VuOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBJX1RPS0VOX18pLFxyXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXHJcbiAgICBhcHBDb2RlOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBQX0NPREVfXyksXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyBPd25zIHRoZSBkZXRhaWwtcGFnZSBvcmNoZXN0cmF0aW9uIGFuZCBrZWVwcyB0aGUgdmlldyBjb21wb25lbnQgZm9jdXNlZCBvbiByZW5kZXJpbmcuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udHJvbGxlciA9ICgpID0+IHtcclxuICBjb25zdCB7XHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHksXHJcbiAgfSA9IHVzZUF1dGhDb250ZXh0KCk7XHJcbiAgY29uc3QgaGFzQWNjZXNzID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJWaWV3XCIpO1xyXG4gIGNvbnN0IGNhbkNyZWF0ZUV4cGVuc2UgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIkFkZFwiKTtcclxuICBjb25zdCBzaGVldElkID0gc2FmZVRleHQod2luZG93Ll9fRVhQRU5TRV9TSEVFVF9JRF9fKTtcclxuICBjb25zdCBzaGVldE1vZGUgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1NIRUVUX01PREVfXykudG9Mb3dlckNhc2UoKTtcclxuICBjb25zdCBpc0NyZWF0ZU1vZGUgPSBzaGVldE1vZGUgPT09IFwiY3JlYXRlXCI7XHJcbiAgY29uc3QgaXNNYW5hZ2luZ090aGVyVXNlckJ5U2VsZWN0aW9uID0gaXNNYW5hZ2luZ090aGVyRXhwZW5zZVJlY29yZCh7XHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgcmVjb3JkT3duZXJVc2VySWQ6IFwiXCIsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgfSk7XHJcbiAgY29uc3QgY2FuQ3JlYXRlRXhwZW5zZUZvclNlbGVjdGVkQ29udGV4dCA9IGNhbkNyZWF0ZUV4cGVuc2UgJiYgIWlzTWFuYWdpbmdPdGhlclVzZXJCeVNlbGVjdGlvbjtcclxuICBjb25zdCBsaW5lQ29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgY3JlYXRlZFNoZWV0SWRSZWYgPSB1c2VSZWYoXCJcIik7XHJcbiAgY29uc3QgY2FtZXJhSW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGdhbGxlcnlJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2lzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSwgc2V0SXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc3RhdHVzVHJhbnNpdGlvbkNvbW1lbnQsIHNldFN0YXR1c1RyYW5zaXRpb25Db21tZW50XSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtzaG93U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRGaWVsZCwgc2V0U2hvd1N0YXR1c1RyYW5zaXRpb25Db21tZW50RmllbGRdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IHN0YXR1c1RyYW5zaXRpb25Db21tZW50UmVmID0gdXNlUmVmKFwiXCIpO1xyXG5cclxuICBjb25zdCBwYWdpbmF0aW9uTGFiZWxzID0gdXNlTWVtbyhcclxuICAgICgpID0+ICh7XHJcbiAgICAgIGZpcnN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIiksXHJcbiAgICAgIHByZXY6IGluZFQoXCJIaXN0b3J5X1BhZ2VfUHJldlwiLCBcIlByZXZpb3VzXCIpLFxyXG4gICAgICBuZXh0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX05leHRcIiwgXCJOZXh0XCIpLFxyXG4gICAgICBsYXN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpLFxyXG4gICAgfSksXHJcbiAgICBbXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGRldGFpbFN0YXRlID0gdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUoe1xyXG4gICAgaGFzQWNjZXNzLFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogY2FuQ3JlYXRlRXhwZW5zZUZvclNlbGVjdGVkQ29udGV4dCxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIHNoZWV0SWQsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcclxuICB9KTtcclxuXHJcbiAgY29uc3Qge1xyXG4gICAgaGVhZGVyLFxyXG4gICAgbGluZXMsXHJcbiAgICBsaW5lUGFnZSxcclxuICAgIGlzTG9hZGluZyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGJ1c3ksXHJcbiAgICBzdGF0dXMsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBtb2RhbEVycm9yLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRyYWZ0UHJvamVjdElkLFxyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlLFxyXG4gICAgcHJvamVjdFZhbHVlLFxyXG4gICAgZGV0YWlsUG9saWN5LFxyXG4gICAgaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgIGlzU2hlZXRMb2NrZWQsXHJcbiAgICBleGNoYW5nZVJhdGVWYWx1ZSxcclxuICAgIHNob3dFeGNoYW5nZVJhdGUsXHJcbiAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcclxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcclxuICAgIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudCxcclxuICAgIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlLFxyXG4gICAgY2FuRWRpdEFueUN1cnJlbnQsXHJcbiAgICBjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzLFxyXG4gICAgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXHJcbiAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcclxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcclxuICAgIHNldExpbmVQYWdlLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXHJcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlLFxyXG4gICAgaGFuZGxlT3BlbkxpbmtUaWNrZXRNb2RlLFxyXG4gICAgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldCxcclxuICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsLFxyXG4gIH0gPSBkZXRhaWxTdGF0ZTtcclxuXHJcbiAgY29uc3QgY2FuQ3JlYXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3ID0gY2FuQ3JlYXRlRXhwZW5zZSAmJiAhaXNNYW5hZ2luZ090aGVyVXNlcjtcclxuICBjb25zdCBjYW5EZWxldGVFeHBlbnNlRm9yQ3VycmVudFZpZXcgPSBkZXRhaWxQb2xpY3kuY2FuRGVsZXRlU2hlZXQ7XHJcbiAgY29uc3QgY2FuVHJhbnNpdGlvblN0YXR1cyA9IGRldGFpbFBvbGljeS5zdGF0dXNBY3Rpb25zLmxlbmd0aCA+IDA7XHJcbiAgY29uc3QgaXNSZWFkT25seU1vZGUgPSBkZXRhaWxQb2xpY3kuaW50ZXJhY3Rpb25Nb2RlID09PSBcInJlYWRfb25seVwiO1xyXG4gIGNvbnN0IGN1cnJlbnRTdGF0dXNDb2RlID0gdHlwZW9mIGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzID09PSBcIm51bWJlclwiID8gaGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA6IG51bGw7XHJcbiAgY29uc3QgaGlkZXNDcnVkVG9wYmFyQnlTdGF0dXMgPVxyXG4gICAgY3VycmVudFN0YXR1c0NvZGUgPT09IEVYUEVOU0VfU1RBVFVTX0FQUFJPVkFMX1JFUVVFU1RFRCAmJiAhY2FuRWRpdEFueUN1cnJlbnQ7XHJcbiAgY29uc3QgdG9wYmFyQWN0aW9uTW9kZSA9ICFpc0NyZWF0ZU1vZGUgJiYgKGlzUmVhZE9ubHlNb2RlIHx8IGhpZGVzQ3J1ZFRvcGJhckJ5U3RhdHVzKSA/IFwidmlld19vbmx5XCIgOiBcImRlZmF1bHRcIjtcclxuICBjb25zdCBkZXRhaWxQZXJtaXNzaW9uc1JlYWR5ID0gbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5ICYmIChpc0NyZWF0ZU1vZGUgfHwgISFoZWFkZXIpO1xyXG4gIGNvbnN0IHsgaW52YWxpZGF0ZUNhY2hlZExpc3RGb3JSZWZldGNoIH0gPSB1c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUoKTtcclxuXHJcbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XHJcbiAgICBkZWZhdWx0Q29uZmlybVRleHQ6IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpLFxyXG4gICAgZGVmYXVsdENhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCByZXNldFN0YXR1c1RyYW5zaXRpb25EaWFsb2cgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzdGF0dXNUcmFuc2l0aW9uQ29tbWVudFJlZi5jdXJyZW50ID0gXCJcIjtcclxuICAgIHNldFN0YXR1c1RyYW5zaXRpb25Db21tZW50KFwiXCIpO1xyXG4gICAgc2V0U2hvd1N0YXR1c1RyYW5zaXRpb25Db21tZW50RmllbGQoZmFsc2UpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xvc2VDb25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgcmVzZXRTdGF0dXNUcmFuc2l0aW9uRGlhbG9nKCk7XHJcbiAgICBjbG9zZUNvbmZpcm0oKTtcclxuICB9LCBbY2xvc2VDb25maXJtLCByZXNldFN0YXR1c1RyYW5zaXRpb25EaWFsb2ddKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xyXG4gICAgICBidXN5LFxyXG4gICAgICBvbkVycm9yOiAobXNnKSA9PiB7XHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xyXG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm0sIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1c10pO1xyXG5cclxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcclxuICBjb25zdCBtb2RhbENhbmNlbFRleHQgPSBtb2RhbC5jYW5jZWxUZXh0IHx8IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ2FuY2VsXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBidXN5XHJcbiAgICA/IG1vZGFsTG9hZGluZ1RleHRcclxuICAgIDogIWJ1c3kgJiYgbW9kYWxFcnJvclxyXG4gICAgICA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKVxyXG4gICAgICA6IChtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghYnVzeSAmJiBtb2RhbEVycm9yKSB7XHJcbiAgICAgIGhhbmRsZUNsb3NlQ29uZmlybSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdm9pZCBoYW5kbGVNb2RhbENvbmZpcm0oKTtcclxuICB9LCBbYnVzeSwgaGFuZGxlQ2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm0sIG1vZGFsRXJyb3JdKTtcclxuXHJcbiAgY29uc3QgdmlzaWJsZUxpbmVzID0gdXNlTWVtbygoKSA9PiBwYWdlZFNsaWNlKGxpbmVzLCBsaW5lUGFnZSwgTElORVNfUEFHRV9TSVpFKSwgW2xpbmVQYWdlLCBsaW5lc10pO1xyXG4gIGNvbnN0IHRvdGFsTGluZVBhZ2VzID0gTWF0aC5jZWlsKChsaW5lcy5sZW5ndGggfHwgMCkgLyBMSU5FU19QQUdFX1NJWkUpO1xuICBjb25zdCB0b3RhbEFtb3VudFRleHQgPSB1c2VNZW1vKFxuICAgICgpID0+IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShoZWFkZXI/LnRvdGFsQW1vdW50ID8/IG51bGwsIHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSksXG4gICAgW2hlYWRlcj8uY3VycmVuY3lDb2RlLCBoZWFkZXI/LnRvdGFsQW1vdW50XVxuICApO1xuICBjb25zdCBoYXNTdGF0dXNBY3Rpb25Db250ZW50ID0gbGluZXMubGVuZ3RoID4gMCB8fCBoYXNQb3NpdGl2ZVRvdGFsQW1vdW50KGhlYWRlcj8udG90YWxBbW91bnQpO1xyXG4gIGNvbnN0IGFyZVN0YXR1c0FjdGlvbnNEaXNhYmxlZCA9ICFoYXNTdGF0dXNBY3Rpb25Db250ZW50O1xyXG5cclxuICBjb25zdCB7IGhhbmRsZVVwZGF0ZSwgaGFuZGxlU3RhdHVzVHJhbnNpdGlvbiwgaGFuZGxlRGVsZXRlIH0gPSB1c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMoe1xyXG4gICAgYnVzeSxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzRWRpdExvY2tlZDogaXNSZWFkT25seU1vZGUsXHJcbiAgICBpc0RlbGV0ZUxvY2tlZDogaXNTaGVldExvY2tlZCxcclxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxyXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gICAgbG9ja2VkQ3VycmVuY3lDb2RlOiBzYWZlVGV4dChoZWFkZXI/LmN1cnJlbmN5Q29kZSksXHJcbiAgICBsb2NrZWRFeGNoYW5nZVJhdGU6IHNhZmVUZXh0KGhlYWRlcj8uZXhjaFJhdGUpLFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogY2FuQ3JlYXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxyXG4gICAgY2FuRWRpdEV4cGVuc2U6IGNhbkVkaXRBbnlDdXJyZW50LFxyXG4gICAgY2FuRGVsZXRlRXhwZW5zZTogY2FuRGVsZXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxyXG4gICAgY2FuRWRpdEhlYWRlckZpZWxkczogY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXHJcbiAgICBjYW5UcmFuc2l0aW9uU3RhdHVzLFxyXG4gICAgc2hlZXRJZCxcclxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcclxuICAgIGRyYWZ0UHJvamVjdElkLFxyXG4gICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcclxuICAgIGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXM6IGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzLFxyXG4gICAgY3VycmVudEV4Y2hhbmdlUmF0ZU1vZGU6IGhlYWRlcj8uZXhjaGFuZ2VSYXRlTW9kZSxcclxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcclxuICAgIG9uQ3JlYXRlU3VjY2VzczogKGNyZWF0ZWRTaGVldElkKSA9PiB7XHJcbiAgICAgIGNyZWF0ZWRTaGVldElkUmVmLmN1cnJlbnQgPSBzYWZlVGV4dChjcmVhdGVkU2hlZXRJZCk7XHJcbiAgICB9LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU9wZW5MaW5lRGV0YWlsID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAobGluZVJlY0lkOiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3Qgc2FmZUxpbmVJZCA9IHNhZmVUZXh0KGxpbmVSZWNJZCk7XHJcbiAgICAgIGlmICghc2FmZUxpbmVJZCB8fCBidXN5IHx8IGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGlzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCkge1xyXG4gICAgICAgIGNvbnN0IG9rID0gYXdhaXQgaGFuZGxlVXBkYXRlKCk7XHJcbiAgICAgICAgaWYgKCFvaykge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmF2aWdhdGVUb0xpbmVEZXRhaWwoc2FmZUxpbmVJZCwge1xyXG4gICAgICAgICAgbW9kZTogXCJlZGl0XCIsXHJcbiAgICAgICAgICBhc2tDb25maXJtYXRpb246IGZhbHNlLFxyXG4gICAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgbmF2aWdhdGVUb0xpbmVEZXRhaWwoc2FmZUxpbmVJZCk7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBidXN5LFxyXG4gICAgICBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcclxuICAgICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgICBpc0VkaXRpbmcsXHJcbiAgICAgIGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSxcclxuICAgICAgbmF2aWdhdGVUb0xpbmVEZXRhaWwsXHJcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2F2ZVN1Y2Nlc3MgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgIGNvbnN0IGNyZWF0ZWRTaGVldElkID0gc2FmZVRleHQoY3JlYXRlZFNoZWV0SWRSZWYuY3VycmVudCk7XHJcbiAgICAgIGlmICghY3JlYXRlZFNoZWV0SWQpIHJldHVybjtcclxuICAgICAgc2F2ZUV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0KHtcclxuICAgICAgICBzaGVldElkOiBjcmVhdGVkU2hlZXRJZCxcclxuICAgICAgfSk7XHJcbiAgICAgIHNldElzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSh0cnVlKTtcclxuICAgICAgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldChjcmVhdGVkU2hlZXRJZCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICByZWxvYWRFeHBlbnNlUGFnZSgpO1xyXG4gIH0sIFtpc0NyZWF0ZU1vZGUsIG5hdmlnYXRlVG9DcmVhdGVkU2hlZXRdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU3RhdHVzQWN0aW9uQ2xpY2sgPSB1c2VDYWxsYmFjayhcclxuICAgIChhY3Rpb246IHsgbGFiZWxLZXk6IHN0cmluZzsgZmFsbGJhY2s6IHN0cmluZzsgbmV4dFN0YXR1czogbnVtYmVyIH0pID0+IHtcclxuICAgICAgaWYgKCFoYXNTdGF0dXNBY3Rpb25Db250ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBhY3Rpb25MYWJlbCA9IGluZFQoYWN0aW9uLmxhYmVsS2V5LCBhY3Rpb24uZmFsbGJhY2spO1xyXG4gICAgICBjb25zdCBjdXJyZW50U3RhdHVzTGFiZWwgPVxyXG4gICAgICAgIGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzID09PSBudWxsIHx8IGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzID09PSB1bmRlZmluZWRcclxuICAgICAgICAgID8gaW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpXHJcbiAgICAgICAgICA6IGdldEV4cGVuc2VTdGF0dXNMYWJlbChoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzKTtcclxuICAgICAgY29uc3QgbmV4dFN0YXR1c0xhYmVsID0gZ2V0RXhwZW5zZVN0YXR1c0xhYmVsKGFjdGlvbi5uZXh0U3RhdHVzKTtcclxuICAgICAgY29uc3QgdHJhbnNpdGlvbk1lc3NhZ2UgPSBpbmRGb3JtYXQoXHJcbiAgICAgICAgXCJFeHBlbnNlU2hlZXRzX0JvdHRvbUFjdGlvbnNfQ29uZmlybVRyYW5zaXRpb25cIixcclxuICAgICAgICBcIkN1cnJlbnQgc3RhdHVzOiB7MH1cXG5OZXcgc3RhdHVzOiB7MX1cXG5cXG5EbyB5b3Ugd2FudCB0byB1cGRhdGUgdGhlIGV4cGVuc2Ugc2hlZXQgc3RhdHVzP1wiLFxyXG4gICAgICAgIGN1cnJlbnRTdGF0dXNMYWJlbCxcclxuICAgICAgICBuZXh0U3RhdHVzTGFiZWxcclxuICAgICAgKS5yZXBsYWNlKC9cXFxcbi9nLCBcIlxcblwiKTtcclxuICAgICAgY29uc3QgaW5pdGlhbENvbW1lbnQgPSBzYWZlVGV4dChoZWFkZXI/LmVzdGFkb0NvbWVudGFyaW9zKTtcclxuICAgICAgc3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRSZWYuY3VycmVudCA9IGluaXRpYWxDb21tZW50O1xyXG4gICAgICBzZXRTdGF0dXNUcmFuc2l0aW9uQ29tbWVudChpbml0aWFsQ29tbWVudCk7XHJcbiAgICAgIHNldFNob3dTdGF0dXNUcmFuc2l0aW9uQ29tbWVudEZpZWxkKHRydWUpO1xyXG5cclxuICAgICAgb3BlbkNvbmZpcm0oe1xyXG4gICAgICAgIHRpdGxlOiBhY3Rpb25MYWJlbCxcclxuICAgICAgICBtZXNzYWdlOiB0cmFuc2l0aW9uTWVzc2FnZSxcclxuICAgICAgICBjb25maXJtVGV4dDogYWN0aW9uTGFiZWwsXHJcbiAgICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBvayA9IGF3YWl0IGhhbmRsZVN0YXR1c1RyYW5zaXRpb24oXHJcbiAgICAgICAgICAgIGFjdGlvbi5uZXh0U3RhdHVzLFxyXG4gICAgICAgICAgICBhY3Rpb25MYWJlbCxcclxuICAgICAgICAgICAgc3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRSZWYuY3VycmVudFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGlmIChvaykge1xyXG4gICAgICAgICAgICBpbnZhbGlkYXRlQ2FjaGVkTGlzdEZvclJlZmV0Y2goKTtcclxuICAgICAgICAgICAgcmVzZXRTdGF0dXNUcmFuc2l0aW9uRGlhbG9nKCk7XHJcbiAgICAgICAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICAgICAgICByZWxvYWRFeHBlbnNlUGFnZSgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIG9rO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgY2xvc2VDb25maXJtLFxyXG4gICAgICBoYW5kbGVTdGF0dXNUcmFuc2l0aW9uLFxyXG4gICAgICBoYXNTdGF0dXNBY3Rpb25Db250ZW50LFxyXG4gICAgICBoZWFkZXI/LmVzdGFkb0NvbWVudGFyaW9zLFxyXG4gICAgICBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyxcclxuICAgICAgaW52YWxpZGF0ZUNhY2hlZExpc3RGb3JSZWZldGNoLFxyXG4gICAgICBvcGVuQ29uZmlybSxcclxuICAgICAgcmVzZXRTdGF0dXNUcmFuc2l0aW9uRGlhbG9nLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIHVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMoe1xyXG4gICAgYnVzeTogYnVzeSB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsXHJcbiAgICBtb2RhbE9wZW46IG1vZGFsLm9wZW4sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBhY3Rpb25Nb2RlOiB0b3BiYXJBY3Rpb25Nb2RlLFxyXG4gICAgaXNMb2NrZWQ6IGlzU2hlZXRMb2NrZWQsXHJcbiAgICBpc0VkaXRMb2NrZWQ6IGlzUmVhZE9ubHlNb2RlLFxyXG4gICAgaXNEZWxldGVMb2NrZWQ6IGlzU2hlZXRMb2NrZWQsXHJcbiAgICBwZXJtaXNzaW9uc1JlYWR5OiBkZXRhaWxQZXJtaXNzaW9uc1JlYWR5LFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogY2FuQ3JlYXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxyXG4gICAgY2FuRWRpdEV4cGVuc2U6IGNhbkVkaXRBbnlDdXJyZW50LFxyXG4gICAgY2FuRGVsZXRlRXhwZW5zZTogY2FuRGVsZXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgb25TYXZlU3VjY2VzczogaGFuZGxlU2F2ZVN1Y2Nlc3MsXHJcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6ICgpID0+IHtcclxuICAgICAgaW52YWxpZGF0ZUNhY2hlZExpc3RGb3JSZWZldGNoKCk7XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXRzXCIpO1xyXG4gICAgfSxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xyXG4gICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcclxuICAgIGNvbnN0IGNhcmQgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiKTtcclxuICAgIGlmICghY2FyZCkgcmV0dXJuIG51bGw7XHJcbiAgICBpZiAoIWxpbmVDb250YWluZXJSZWYuY3VycmVudD8uY29udGFpbnMoY2FyZCkpIHJldHVybiBudWxsO1xyXG4gICAgcmV0dXJuIGNhcmQ7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VUaW1lbGluZUNhcmRFZmZlY3RzKHtcclxuICAgIGNvbnRhaW5lclJlZjogbGluZUNvbnRhaW5lclJlZixcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGl0ZW1zOiB2aXNpYmxlTGluZXMsXHJcbiAgICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgcXVpY2tUaWNrZXRGbG93ID0gdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93KHtcclxuICAgIHNoZWV0SWQ6IHNhZmVUZXh0KGhlYWRlcj8uaG9qYUdhc3Rvc0lkIHx8IHNoZWV0SWQpLFxyXG4gICAgcHJvamVjdElkOiBwcm9qZWN0VmFsdWUsXHJcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSxcclxuICAgIGNhbkNyZWF0ZUV4cGVuc2U6ICFpc0NyZWF0ZU1vZGUgJiYgZGV0YWlsUG9saWN5LnNob3dGYWIsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc1NoZWV0TG9ja2VkOiAhY2FuVXNlRnVsbEVkaXRGZWF0dXJlcyxcclxuICAgIGxpbmtUb1NoZWV0OiBmYWxzZSxcclxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxyXG4gICAgb25Db21wbGV0ZWQ6IChyZXN1bHQpID0+IHtcclxuICAgICAgY29uc3QgY3JlYXRlZEZpbGVJZCA9IHNhZmVUZXh0KHJlc3VsdD8uZmlsZUlkKTtcclxuICAgICAgaWYgKCFjcmVhdGVkRmlsZUlkKSB7XHJcbiAgICAgICAgcmVsb2FkRXhwZW5zZVBhZ2UoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChyZXN1bHQ/LmxpbmtlZFRvU2hlZXQgPT09IHRydWUpIHtcclxuICAgICAgICByZWxvYWRFeHBlbnNlUGFnZSgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY3VycmVudFNoZWV0SWQgPSBzYWZlVGV4dChoZWFkZXI/LmhvamFHYXN0b3NJZCB8fCBzaGVldElkKTtcclxuICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgICBmaWxlSWQ6IGNyZWF0ZWRGaWxlSWQsXHJcbiAgICAgICAgbW9kZTogXCJlZGl0XCIsXHJcbiAgICAgICAgb3JpZ2luOiBcInNoZWV0LWNyZWF0ZVwiLFxyXG4gICAgICB9KTtcclxuICAgICAgaWYgKGN1cnJlbnRTaGVldElkKSB7XHJcbiAgICAgICAgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0KHtcclxuICAgICAgICAgIGZpbGVJZDogY3JlYXRlZEZpbGVJZCxcclxuICAgICAgICAgIG9yaWdpbjogXCJzaGVldC1jcmVhdGVcIixcclxuICAgICAgICAgIHNoZWV0SWQ6IGN1cnJlbnRTaGVldElkLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHF1ZXJ5LnNldChcInNoZWV0SWRcIiwgY3VycmVudFNoZWV0SWQpO1xyXG4gICAgICB9XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCk7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBmYWJNZW51SXRlbXMgPSB1c2VNZW1vPEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW1bXT4oXHJcbiAgICAoKSA9PiBbXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogXCJuZXctdGlja2V0XCIsXHJcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9OZXdUaWNrZXRcIiwgXCJOdWV2byBUaWNrZXRcIiksXHJcbiAgICAgICAgaWNvbjogPE5ld1RpY2tldEljb24gLz4sXHJcbiAgICAgICAgb25DbGljazogcXVpY2tUaWNrZXRGbG93Lm9wZW5Tb3VyY2VQaWNrZXIsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogXCJsaW5rLXRpY2tldFwiLFxyXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfTGlua1RpY2tldFwiLCBcIlZpbmN1bGFyIFRpY2tldFwiKSxcclxuICAgICAgICBpY29uOiA8TGlua1RpY2tldEljb24gLz4sXHJcbiAgICAgICAgb25DbGljazogaGFuZGxlT3BlbkxpbmtUaWNrZXRNb2RlLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IFwibmV3LWxpbmVcIixcclxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX05ld0xpbmVcIiwgXCJOdWV2YSBMaW5lYVwiKSxcclxuICAgICAgICBpY29uOiA8TmV3TGluZUljb24gLz4sXHJcbiAgICAgICAgb25DbGljazogaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICAgIFtoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUsIGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSwgcXVpY2tUaWNrZXRGbG93Lm9wZW5Tb3VyY2VQaWNrZXJdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2hvd1N0YXR1c0FjdGlvbkJhciA9XHJcbiAgICAhaXNDcmVhdGVNb2RlICYmICFpc0xvYWRpbmcgJiYgIWlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSAmJiAhZXJyb3JNZXNzYWdlICYmIGRldGFpbFBvbGljeS5zdGF0dXNBY3Rpb25zLmxlbmd0aCA+IDA7XHJcbiAgY29uc3Qgc2hvd0ZhYiA9ICFpc0NyZWF0ZU1vZGUgJiYgZGV0YWlsUG9saWN5LnNob3dGYWI7XHJcbiAgY29uc3QgaGFzVmlzaWJsZVN0YXR1c0NvbW1lbnQgPSBzYWZlVGV4dChoZWFkZXI/LmVzdGFkb0NvbWVudGFyaW9zKS50cmltKCkubGVuZ3RoID4gMDtcclxuICBjb25zdCBzdGF0dXNDb21tZW50TW9kZTogXCJoaWRkZW5cIiB8IFwicmVhZFwiID0gaGFzVmlzaWJsZVN0YXR1c0NvbW1lbnQgPyBcInJlYWRcIiA6IFwiaGlkZGVuXCI7XHJcbiAgY29uc3QgbW9kYWxCb2R5ID0gc2hvd1N0YXR1c1RyYW5zaXRpb25Db21tZW50RmllbGQgPyAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XHJcbiAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj5cclxuICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzQ29tbWVudFwiLCBcIlN0YXR1cyBjb21tZW50XCIpfVxyXG4gICAgICA8L2xhYmVsPlxyXG4gICAgICA8dGV4dGFyZWFcclxuICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgcmVzaXplLW5vbmVcIlxyXG4gICAgICAgIHJvd3M9ezN9XHJcbiAgICAgICAgdmFsdWU9e3N0YXR1c1RyYW5zaXRpb25Db21tZW50fVxyXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG5leHRWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiO1xyXG4gICAgICAgICAgc3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRSZWYuY3VycmVudCA9IG5leHRWYWx1ZTtcclxuICAgICAgICAgIHNldFN0YXR1c1RyYW5zaXRpb25Db21tZW50KG5leHRWYWx1ZSk7XHJcbiAgICAgICAgfX1cclxuICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TdGF0dXNDb21tZW50XCIsIFwiU3RhdHVzIGNvbW1lbnRcIil9XHJcbiAgICAgIC8+XHJcbiAgICA8L2Rpdj5cclxuICApIDogbnVsbDtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNoZWV0SWQsXHJcbiAgICBoZWFkZXIsXHJcbiAgICB2aXNpYmxlTGluZXMsXHJcbiAgICBsaW5lUGFnZSxcclxuICAgIHRvdGFsTGluZVBhZ2VzLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgYnVzeSxcclxuICAgIHN0YXR1cyxcclxuICAgIG1vZGFsRXJyb3IsXHJcbiAgICBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsXHJcbiAgICBtb2RhbCxcclxuICAgIG1vZGFsTG9hZGluZ1RleHQsXHJcbiAgICBtb2RhbENhbmNlbFRleHQsXHJcbiAgICBtb2RhbENvbmZpcm1UZXh0LFxyXG4gICAgbW9kYWxCb2R5LFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxyXG4gICAgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXHJcbiAgICBjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzLFxyXG4gICAgc2hvd1N0YXR1c0FjdGlvbkJhcixcclxuICAgIHNob3dGYWIsXHJcbiAgICBhcmVTdGF0dXNBY3Rpb25zRGlzYWJsZWQsXHJcbiAgICBmYWJNZW51SXRlbXMsXHJcbiAgICBwYWdpbmF0aW9uTGFiZWxzLFxyXG4gICAgdG90YWxBbW91bnRUZXh0LFxyXG4gICAgc3RhdHVzQ29tbWVudE1vZGUsXHJcbiAgICBwcm9qZWN0VmFsdWUsXHJcbiAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcclxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcclxuICAgIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudCxcclxuICAgIHNob3dFeGNoYW5nZVJhdGUsXHJcbiAgICBleGNoYW5nZVJhdGVWYWx1ZSxcclxuICAgIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRyYWZ0UHJvamVjdElkLFxyXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsXHJcbiAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcclxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcclxuICAgIGRldGFpbFBvbGljeSxcclxuICAgIGxpbmVDb250YWluZXJSZWYsXHJcbiAgICBjYW1lcmFJbnB1dFJlZixcclxuICAgIGdhbGxlcnlJbnB1dFJlZixcclxuICAgIHF1aWNrVGlja2V0RmxvdyxcclxuICAgIHNldExpbmVQYWdlLFxyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICAgIHNldERyYWZ0UHJvamVjdElkLFxyXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIHNldERyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICBuYXZpZ2F0ZVRvTGluZURldGFpbDogaGFuZGxlT3BlbkxpbmVEZXRhaWwsXHJcbiAgICBoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm0sXHJcbiAgICBoYW5kbGVTdGF0dXNBY3Rpb25DbGljayxcclxuICAgIGNsb3NlQ29uZmlybTogaGFuZGxlQ2xvc2VDb25maXJtLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQge1xyXG4gIGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeSxcclxuICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LFxyXG4gIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeSxcclxufSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvc2Vzc2lvbkV4cGlyeS50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VTY29wZVRva2VuIH0gZnJvbSBcIi4vZXhwZW5zZVNjb3BlLnRzXCI7XHJcblxyXG5jb25zdCBFWFBFTlNFX1NIRUVUX0NSRUFURURfUkVUVVJOX0NPTlRFWFRfS0VZX1BSRUZJWCA9IFwiZXhwZW5zZV9zaGVldF9jcmVhdGVkX3JldHVybl9jb250ZXh0X3YxXCI7XHJcbmNvbnN0IEVYUEVOU0VfU0hFRVRfQ1JFQVRFRF9SRVRVUk5fQ09OVEVYVF9UVExfTVMgPSAyICogNjAgKiA2MCAqIDEwMDA7XHJcblxyXG5leHBvcnQgdHlwZSBFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCA9IHtcclxuICBzaGVldElkOiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCBnZXRTY29wZWRLZXkgPSAoKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gYCR7RVhQRU5TRV9TSEVFVF9DUkVBVEVEX1JFVFVSTl9DT05URVhUX0tFWV9QUkVGSVh9XyR7Z2V0RXhwZW5zZVNjb3BlVG9rZW4oKX1gO1xyXG59O1xyXG5cclxuLy8gTm9ybWFsaXplcyB0aGUgY3JlYXRlZC1zaGVldCByZXR1cm4gcGF5bG9hZCB1c2VkIGJldHdlZW4gY3JlYXRlIGFuZCBkZXRhaWwgZmxvd3MuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCA9IChcclxuICB2YWx1ZTogdW5rbm93blxyXG4pOiBFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCB8IG51bGwgPT4ge1xyXG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgcGF5bG9hZCA9IHZhbHVlIGFzIFBhcnRpYWw8RXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQ+O1xyXG4gIGNvbnN0IHNoZWV0SWQgPSBzYWZlVGV4dChwYXlsb2FkLnNoZWV0SWQpO1xyXG4gIGlmICghc2hlZXRJZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzaGVldElkLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBSZWFkcyB0aGUgc3RvcmVkIGNyZWF0ZWQtc2hlZXQgcmV0dXJuIGNvbnRleHQgZm9yIHRoZSBhY3RpdmUgZXhwZW5zZSBzY29wZS5cclxuZXhwb3J0IGNvbnN0IHJlYWRFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCA9IChcclxuICBzaGVldElkPzogdW5rbm93blxyXG4pOiBFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IHN0b3JlZCA9IG5vcm1hbGl6ZUV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0KFxyXG4gICAgZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5PEV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0PihnZXRTY29wZWRLZXkoKSlcclxuICApO1xyXG4gIGlmICghc3RvcmVkKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChzaGVldElkKTtcclxuICBpZiAoIXNhZmVTaGVldElkKSByZXR1cm4gc3RvcmVkO1xyXG4gIHJldHVybiBzdG9yZWQuc2hlZXRJZC50b1VwcGVyQ2FzZSgpID09PSBzYWZlU2hlZXRJZC50b1VwcGVyQ2FzZSgpID8gc3RvcmVkIDogbnVsbDtcclxufTtcclxuXHJcbi8vIENsZWFycyB0aGUgY3JlYXRlZC1zaGVldCByZXR1cm4gY29udGV4dCBmb3IgdGhlIGFjdGl2ZSBleHBlbnNlIHNjb3BlLlxyXG5leHBvcnQgY29uc3QgY2xlYXJFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCA9ICgpOiB2b2lkID0+IHtcclxuICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGdldFNjb3BlZEtleSgpKTtcclxufTtcclxuXHJcbi8vIFBlcnNpc3RzIHRoZSBjcmVhdGVkLXNoZWV0IGNvbnRleHQgc28gdGhlIG5leHQgZGV0YWlsIHBhZ2UgY2FuIGFybSB0aGUgbGlzdCByZXR1cm4gc3RhdGUuXHJcbmV4cG9ydCBjb25zdCBzYXZlRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQgPSAoXHJcbiAgdmFsdWU6IEV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0IHwgbnVsbCB8IHVuZGVmaW5lZFxyXG4pOiBFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCh2YWx1ZSk7XHJcbiAgaWYgKCFub3JtYWxpemVkKSB7XHJcbiAgICBjbGVhckV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0KCk7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHNldFNlc3Npb25Kc29uV2l0aEV4cGlyeShnZXRTY29wZWRLZXkoKSwgbm9ybWFsaXplZCwgRVhQRU5TRV9TSEVFVF9DUkVBVEVEX1JFVFVSTl9DT05URVhUX1RUTF9NUyk7XHJcbiAgcmV0dXJuIG5vcm1hbGl6ZWQ7XHJcbn07XHJcblxyXG4vLyBDb25zdW1lcyB0aGUgY3JlYXRlZC1zaGVldCBjb250ZXh0IG9uY2UgdGhlIG1hdGNoaW5nIGRldGFpbCBwYWdlIGlzIGxvYWRlZC5cclxuZXhwb3J0IGNvbnN0IGNvbnN1bWVFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCA9IChcclxuICBzaGVldElkPzogdW5rbm93blxyXG4pOiBFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IHN0b3JlZCA9IHJlYWRFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dChzaGVldElkKTtcclxuICBpZiAoIXN0b3JlZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNsZWFyRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQoKTtcclxuICByZXR1cm4gc3RvcmVkO1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCwgRXhwZW5zZVNoZWV0SGVhZGVyVXBkYXRlUmVxdWVzdCB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbiwgcGFyc2VEZWNpbWFsSW5wdXQgfSBmcm9tIFwiLi4vaG9va3MvZXhwZW5zZU11dGF0aW9uVXRpbHMudHNcIjtcclxuaW1wb3J0IHtcclxuICBjcmVhdGVFeHBlbnNlU2hlZXQsXHJcbiAgZGVsZXRlRXhwZW5zZVNoZWV0LFxyXG4gIHVwZGF0ZUV4cGVuc2VTaGVldEhlYWRlcixcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5cclxuY29uc3QgU0FNRV9DVVJSRU5DWV9FWENIQU5HRV9SQVRFID0gMTAwO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnNBcmdzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcclxuICBpc0VkaXRMb2NrZWQ6IGJvb2xlYW47XHJcbiAgaXNEZWxldGVMb2NrZWQ6IGJvb2xlYW47XHJcbiAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XHJcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xyXG4gIGxvY2tlZEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGxvY2tlZEV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xyXG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XHJcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlRXhwZW5zZTogYm9vbGVhbjtcclxuICBjYW5FZGl0SGVhZGVyRmllbGRzOiBib29sZWFuO1xyXG4gIGNhblRyYW5zaXRpb25TdGF0dXM6IGJvb2xlYW47XHJcbiAgc2hlZXRJZDogc3RyaW5nO1xyXG4gIGRyYWZ0RGVzY3JpcHRpb246IHN0cmluZztcclxuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlOiBzdHJpbmc7XHJcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZTogc3RyaW5nO1xyXG4gIGRyYWZ0UHJvamVjdElkOiBzdHJpbmc7XHJcbiAgZHJhZnRFc3RhZG9Db21lbnRhcmlvczogc3RyaW5nO1xyXG4gIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeTogc3RyaW5nO1xyXG4gIGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXM/OiBudW1iZXIgfCBudWxsO1xyXG4gIGN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlPzogbnVtYmVyIHwgbnVsbDtcclxuICBvbkNyZWF0ZVN1Y2Nlc3M6IChjcmVhdGVkU2hlZXRJZDogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldEJ1c3k6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxuICBzZXRTdGF0dXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldElzRWRpdGluZzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplRXhjaGFuZ2VSYXRlID0gKHJhdzogc3RyaW5nKTogbnVtYmVyIHwgbnVsbCA9PiBwYXJzZURlY2ltYWxJbnB1dChyYXcpO1xyXG4vLyBDb21wYXJlcyByYXRlcyB3aXRoIHRvbGVyYW5jZSB0byBhdm9pZCBmbG9hdGluZyBwb2ludCBtaXNtYXRjaCBvbiBwYXlsb2FkIG1vZGUuXHJcbmNvbnN0IGFyZVJhdGVzRXF1aXZhbGVudCA9IChsZWZ0OiBudW1iZXIgfCBudWxsLCByaWdodDogbnVtYmVyIHwgbnVsbCk6IGJvb2xlYW4gPT4ge1xyXG4gIGlmIChsZWZ0ID09IG51bGwgfHwgcmlnaHQgPT0gbnVsbCkgcmV0dXJuIGZhbHNlO1xyXG4gIHJldHVybiBNYXRoLmFicyhsZWZ0IC0gcmlnaHQpIDwgMC4wMDAwMDAxO1xyXG59O1xyXG5cclxuLy8gRW5jYXBzdWxhdGVzIHVwZGF0ZSBhbmQgZGVsZXRlIG11dGF0aW9ucyBmb3IgZXhwZW5zZSBzaGVldCBoZWFkZXIgZGV0YWlsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zID0gKHtcclxuICBidXN5LFxyXG4gIGlzRWRpdGluZyxcclxuICBpc0NyZWF0ZU1vZGUsXHJcbiAgaXNFZGl0TG9ja2VkLFxyXG4gIGlzRGVsZXRlTG9ja2VkLFxyXG4gIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxyXG4gIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcclxuICBsb2NrZWRDdXJyZW5jeUNvZGUsXHJcbiAgbG9ja2VkRXhjaGFuZ2VSYXRlLFxyXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXHJcbiAgY2FuRWRpdEV4cGVuc2UsXHJcbiAgY2FuRGVsZXRlRXhwZW5zZSxcclxuICBjYW5FZGl0SGVhZGVyRmllbGRzLFxyXG4gIGNhblRyYW5zaXRpb25TdGF0dXMsXHJcbiAgc2hlZXRJZCxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsXHJcbiAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcclxuICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXHJcbiAgY3VycmVudEV4cGVuc2VTaGVldFN0YXR1cyxcclxuICBjdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSxcclxuICBvbkNyZWF0ZVN1Y2Nlc3MsXHJcbiAgc2V0TW9kYWxFcnJvcixcclxuICBzZXRCdXN5LFxyXG4gIHNldFN0YXR1cyxcclxuICBzZXRJc0VkaXRpbmcsXHJcbn06IFVzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9uc0FyZ3MpID0+IHtcclxuICBjb25zdCBidWlsZFVwZGF0ZVBheWxvYWQgPSB1c2VDYWxsYmFjayhcclxuICAgIChcclxuICAgICAgbmV4dFN0YXR1cz86IG51bWJlciB8IG51bGwsXHJcbiAgICAgIHN0YXR1c0NvbW1lbnRPdmVycmlkZT86IHN0cmluZyB8IG51bGxcclxuICAgICk6IHsgcGF5bG9hZDogRXhwZW5zZVNoZWV0SGVhZGVyVXBkYXRlUmVxdWVzdCB9IHwgeyBlcnJvcjogc3RyaW5nIH0gPT4ge1xyXG4gICAgICBjb25zdCBoYXNFeHBsaWNpdFN0YXR1c0NvbW1lbnRPdmVycmlkZSA9IHN0YXR1c0NvbW1lbnRPdmVycmlkZSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkQ3VycmVuY3kgPSBTdHJpbmcoXHJcbiAgICAgICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMgPyAobG9ja2VkQ3VycmVuY3lDb2RlIHx8IGRyYWZ0Q3VycmVuY3lDb2RlIHx8IFwiXCIpIDogKGRyYWZ0Q3VycmVuY3lDb2RlIHx8IFwiXCIpXHJcbiAgICAgIClcclxuICAgICAgICAudHJpbSgpXHJcbiAgICAgICAgLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWREZXNjcmlwdGlvbiA9IFN0cmluZyhkcmFmdERlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZFByb2plY3RJZCA9IFN0cmluZyhkcmFmdFByb2plY3RJZCB8fCBcIlwiKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRFc3RhZG9Db21lbnRhcmlvcyA9IFN0cmluZyhcclxuICAgICAgICBzdGF0dXNDb21tZW50T3ZlcnJpZGUgPz8gZHJhZnRFc3RhZG9Db21lbnRhcmlvcyA/PyBcIlwiXHJcbiAgICAgICkudHJpbSgpO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkRXhjaGFuZ2VSYXRlUmF3ID0gU3RyaW5nKFxyXG4gICAgICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyA/IChsb2NrZWRFeGNoYW5nZVJhdGUgfHwgZHJhZnRFeGNoYW5nZVJhdGUgfHwgXCJcIikgOiAoZHJhZnRFeGNoYW5nZVJhdGUgfHwgXCJcIilcclxuICAgICAgKTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSA9IFN0cmluZyhleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3kgfHwgXCJFVVJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCkgfHwgXCJFVVJcIjtcclxuICAgICAgY29uc3QgcmVxdWlyZXNFeGNoYW5nZVJhdGUgPVxyXG4gICAgICAgIGNhbkVkaXRIZWFkZXJGaWVsZHMgJiYgbm9ybWFsaXplZEN1cnJlbmN5ICE9PSBcIlwiICYmIG5vcm1hbGl6ZWRDdXJyZW5jeSAhPT0gbm9ybWFsaXplZEJhc2VDdXJyZW5jeTtcclxuICAgICAgY29uc3QgdXNlc1NhbWVDdXJyZW5jeVJhdGUgPSBjYW5FZGl0SGVhZGVyRmllbGRzICYmIG5vcm1hbGl6ZWRDdXJyZW5jeSAhPT0gXCJcIiAmJiAhcmVxdWlyZXNFeGNoYW5nZVJhdGU7XHJcbiAgICAgIGNvbnN0IHBhcnNlZEV4Y2hhbmdlUmF0ZSA9IG5vcm1hbGl6ZUV4Y2hhbmdlUmF0ZShub3JtYWxpemVkRXhjaGFuZ2VSYXRlUmF3KTtcclxuICAgICAgY29uc3Qgb2ZmaWNpYWxFeGNoYW5nZVJhdGUgPSBub3JtYWxpemVFeGNoYW5nZVJhdGUob2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IG9yaWdpbmFsRXhjaGFuZ2VSYXRlID0gbm9ybWFsaXplRXhjaGFuZ2VSYXRlKGxvY2tlZEV4Y2hhbmdlUmF0ZSk7XHJcbiAgICAgIGNvbnN0IHBhcnNlZEN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlID0gTnVtYmVyKGN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlKTtcclxuICAgICAgY29uc3QgaGFzQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUgPSBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZEN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlKSAmJiBwYXJzZWRDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA+PSAwO1xyXG4gICAgICBjb25zdCBoYXNWYWxpZFJhdGUgPSBwYXJzZWRFeGNoYW5nZVJhdGUgIT0gbnVsbCAmJiBwYXJzZWRFeGNoYW5nZVJhdGUgPiAwO1xyXG4gICAgICBjb25zdCBoYXNNYW51YWxSYXRlRWRpdE9uVXBkYXRlID1cclxuICAgICAgICBjYW5FZGl0SGVhZGVyRmllbGRzICYmXHJcbiAgICAgICAgIWlzQ3JlYXRlTW9kZSAmJlxyXG4gICAgICAgIGhhc1ZhbGlkUmF0ZSAmJlxyXG4gICAgICAgIChvcmlnaW5hbEV4Y2hhbmdlUmF0ZSA9PSBudWxsIHx8ICFhcmVSYXRlc0VxdWl2YWxlbnQocGFyc2VkRXhjaGFuZ2VSYXRlLCBvcmlnaW5hbEV4Y2hhbmdlUmF0ZSkpO1xyXG4gICAgICAvLyBPbmx5IHNlbmQgZXhjaGFuZ2VSYXRlTW9kZSB3aGVuIHRoZSB1c2VyIGFjdHVhbGx5IGNoYW5nZWQgdGhlIHJhdGUgbWFudWFsbHkuXHJcbiAgICAgIGNvbnN0IGlzTWFudWFsRXhjaGFuZ2VSYXRlID0gKCgpID0+IHtcclxuICAgICAgICBpZiAoIWNhbkVkaXRIZWFkZXJGaWVsZHMpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoIXJlcXVpcmVzRXhjaGFuZ2VSYXRlIHx8ICFoYXNWYWxpZFJhdGUpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKCFpc0NyZWF0ZU1vZGUgJiYgIWhhc01hbnVhbFJhdGVFZGl0T25VcGRhdGUpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAob2ZmaWNpYWxFeGNoYW5nZVJhdGUgPT0gbnVsbCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgcmV0dXJuICFhcmVSYXRlc0VxdWl2YWxlbnQocGFyc2VkRXhjaGFuZ2VSYXRlLCBvZmZpY2lhbEV4Y2hhbmdlUmF0ZSk7XHJcbiAgICAgIH0pKCk7XHJcbiAgICAgIGNvbnN0IHJlc29sdmVkRXhjaGFuZ2VSYXRlTW9kZSA9IGNhbkVkaXRIZWFkZXJGaWVsZHNcclxuICAgICAgICA/IChpc01hbnVhbEV4Y2hhbmdlUmF0ZSA/IDEgOiAoaGFzQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUgPyBwYXJzZWRDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA6IDApKVxyXG4gICAgICAgIDogKGhhc0N1cnJlbnRFeGNoYW5nZVJhdGVNb2RlID8gcGFyc2VkQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUgOiB1bmRlZmluZWQpO1xyXG4gICAgICBjb25zdCByZXNvbHZlZEV4cGVuc2VTaGVldFN0YXR1cyA9XHJcbiAgICAgICAgbmV4dFN0YXR1cyA/PyAoY3VycmVudEV4cGVuc2VTaGVldFN0YXR1cyAhPSBudWxsID8gTnVtYmVyKGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXMpIDogdW5kZWZpbmVkKTtcclxuICAgICAgLy8gU3RhdHVzL2NvbW1lbnQtb25seSBmbG93cyBzdGlsbCBzdWJtaXQgdGhlIGZ1bGwgaGVhZGVyIHBheWxvYWQsIHNvIGtlZXAgdGhlIHN0b3JlZCByYXRlIHVudG91Y2hlZC5cclxuICAgICAgY29uc3QgcmVzb2x2ZWRFeGNoYW5nZVJhdGUgPSBjYW5FZGl0SGVhZGVyRmllbGRzXHJcbiAgICAgICAgPyAodXNlc1NhbWVDdXJyZW5jeVJhdGUgPyBTQU1FX0NVUlJFTkNZX0VYQ0hBTkdFX1JBVEUgOiAoaGFzVmFsaWRSYXRlID8gTnVtYmVyKHBhcnNlZEV4Y2hhbmdlUmF0ZSkgOiAxKSlcclxuICAgICAgICA6IChvcmlnaW5hbEV4Y2hhbmdlUmF0ZSA/PyBwYXJzZWRFeGNoYW5nZVJhdGUgPz8gMCk7XHJcblxyXG4gICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgICAgaWYgKCFub3JtYWxpemVkRGVzY3JpcHRpb24pIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGVycm9yOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0Rlc2NyaXB0aW9uUmVxdWlyZWRcIiwgXCJEZXNjcmlwdGlvbiBpcyByZXF1aXJlZC5cIiksXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFub3JtYWxpemVkQ3VycmVuY3kpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGVycm9yOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0N1cnJlbmN5UmVxdWlyZWRcIiwgXCJDdXJyZW5jeSBpcyByZXF1aXJlZC5cIiksXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHJlcXVpcmVzRXhjaGFuZ2VSYXRlICYmICFoYXNWYWxpZFJhdGUpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgZXJyb3I6IGluZFQoXHJcbiAgICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0V4Y2hhbmdlUmF0ZVJlcXVpcmVkXCIsXHJcbiAgICAgICAgICAgIFwiRXhjaGFuZ2UgcmF0ZSBpcyByZXF1aXJlZCB3aGVuIGN1cnJlbmN5IGlzIGRpZmZlcmVudCBmcm9tIGJhc2UgY3VycmVuY3kuXCJcclxuICAgICAgICAgICksXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBwYXlsb2FkOiB7XHJcbiAgICAgICAgICBkZXNjcmlwdGlvbjogbm9ybWFsaXplZERlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgY3VycmVuY3lDb2RlOiBub3JtYWxpemVkQ3VycmVuY3ksXHJcbiAgICAgICAgICBleGNoUmF0ZTogcmVzb2x2ZWRFeGNoYW5nZVJhdGUsXHJcbiAgICAgICAgICBwcm9qSWQ6IG5vcm1hbGl6ZWRQcm9qZWN0SWQgfHwgdW5kZWZpbmVkLFxyXG4gICAgICAgICAgZXhwZW5zZVNoZWV0U3RhdHVzOiByZXNvbHZlZEV4cGVuc2VTaGVldFN0YXR1cyxcclxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZU1vZGU6IHJlc29sdmVkRXhjaGFuZ2VSYXRlTW9kZSxcclxuICAgICAgICAgIC8vIFByZXNlcnZlIGV4cGxpY2l0IGVtcHR5IHN0YXR1cyBjb21tZW50cyBzbyB0aGUgYmFja2VuZCBjYW4gY2xlYXIgdGhlIHN0b3JlZCB2YWx1ZS5cclxuICAgICAgICAgIGVzdGFkb0NvbWVudGFyaW9zOiBoYXNFeHBsaWNpdFN0YXR1c0NvbW1lbnRPdmVycmlkZVxyXG4gICAgICAgICAgICA/IG5vcm1hbGl6ZWRFc3RhZG9Db21lbnRhcmlvc1xyXG4gICAgICAgICAgICA6IChub3JtYWxpemVkRXN0YWRvQ29tZW50YXJpb3MgfHwgdW5kZWZpbmVkKSxcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgY2FuRWRpdEhlYWRlckZpZWxkcyxcclxuICAgICAgY3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUsXHJcbiAgICAgIGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXMsXHJcbiAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxyXG4gICAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgICAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcclxuICAgICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcclxuICAgICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gICAgICBsb2NrZWRDdXJyZW5jeUNvZGUsXHJcbiAgICAgIGxvY2tlZEV4Y2hhbmdlUmF0ZSxcclxuICAgICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVVcGRhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSB8fCAhaXNFZGl0aW5nKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoIWlzQ3JlYXRlTW9kZSAmJiBpc0VkaXRMb2NrZWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBjYW5Qcm9jZWVkID0gaXNDcmVhdGVNb2RlID8gY2FuQ3JlYXRlRXhwZW5zZSA6IGNhbkVkaXRFeHBlbnNlO1xyXG4gICAgaWYgKCFjYW5Qcm9jZWVkKSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBheWxvYWRSZXN1bHQgPSBidWlsZFVwZGF0ZVBheWxvYWQoKTtcclxuICAgIGlmIChcImVycm9yXCIgaW4gcGF5bG9hZFJlc3VsdCkge1xyXG4gICAgICBzZXRNb2RhbEVycm9yKHBheWxvYWRSZXN1bHQuZXJyb3IpO1xyXG4gICAgICBzZXRTdGF0dXMocGF5bG9hZFJlc3VsdC5lcnJvcik7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcclxuICAgICAgc3RhcnRTdGF0dXM6IGlzQ3JlYXRlTW9kZVxyXG4gICAgICAgID8gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKVxyXG4gICAgICAgIDogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0aW5nXCIsIFwiVXBkYXRpbmcgZXhwZW5zZSBzaGVldC4uLlwiKSxcclxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIiksXHJcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldEJ1c3ksXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICAgICAgY29uc3QgY3JlYXRlUGF5bG9hZCA9IHBheWxvYWRSZXN1bHQucGF5bG9hZDtcclxuICAgICAgICAgIGNvbnN0IHBheWxvYWQ6IEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QgPSB7XHJcbiAgICAgICAgICAgIG1vZGU6IDEsXHJcbiAgICAgICAgICAgIGV4aXN0aW5nSG9qYUdhc3Rvc0lkOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBjcmVhdGVQYXlsb2FkLmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICBjdXJyZW5jeUNvZGU6IGNyZWF0ZVBheWxvYWQuY3VycmVuY3lDb2RlLFxyXG4gICAgICAgICAgICBleGNoUmF0ZTogY3JlYXRlUGF5bG9hZC5leGNoUmF0ZSxcclxuICAgICAgICAgICAgcHJvaklkOiBjcmVhdGVQYXlsb2FkLnByb2pJZCxcclxuICAgICAgICAgICAgZXhwZW5zZVNoZWV0U3RhdHVzOiAwLFxyXG4gICAgICAgICAgICBleGNoYW5nZVJhdGVNb2RlOiBjcmVhdGVQYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUsXHJcbiAgICAgICAgICAgIGxpbmVzOiBbXSxcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjcmVhdGVFeHBlbnNlU2hlZXQocGF5bG9hZCk7XHJcblxyXG4gICAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gQWNjZXB0IGJvdGggY2FzaW5nIHZhcmlhbnRzIGZyb20gYmFja2VuZCBlbnZlbG9wZXMuXHJcbiAgICAgICAgICBjb25zdCBjcmVhdGVkRGF0YSA9IHJlc3BvbnNlPy5EYXRhIGFzIHsgSG9qYUdhc3Rvc0lkPzogdW5rbm93bjsgaG9qYUdhc3Rvc0lkPzogdW5rbm93biB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcclxuICAgICAgICAgIGNvbnN0IGNyZWF0ZWRTaGVldElkID0gU3RyaW5nKGNyZWF0ZWREYXRhPy5Ib2phR2FzdG9zSWQgPz8gY3JlYXRlZERhdGE/LmhvamFHYXN0b3NJZCA/PyBcIlwiKS50cmltKCk7XHJcbiAgICAgICAgICBpZiAoIWNyZWF0ZWRTaGVldElkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIG9uQ3JlYXRlU3VjY2VzcyhjcmVhdGVkU2hlZXRJZCk7XHJcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyKHNoZWV0SWQsIHBheWxvYWRSZXN1bHQucGF5bG9hZCk7XHJcblxyXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlZFwiLCBcIkV4cGVuc2Ugc2hlZXQgdXBkYXRlZFwiKSk7XHJcbiAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiByZXN1bHQub2s7XHJcbiAgfSwgW1xyXG4gICAgYnVzeSxcclxuICAgIGJ1aWxkVXBkYXRlUGF5bG9hZCxcclxuICAgIGNhbkNyZWF0ZUV4cGVuc2UsXHJcbiAgICBjYW5FZGl0RXhwZW5zZSxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzRWRpdExvY2tlZCxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIG9uQ3JlYXRlU3VjY2VzcyxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2hlZXRJZCxcclxuICBdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU3RhdHVzVHJhbnNpdGlvbiA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKG5leHRTdGF0dXM6IG51bWJlciwgc3RhcnRTdGF0dXM6IHN0cmluZywgc3RhdHVzQ29tbWVudE92ZXJyaWRlPzogc3RyaW5nIHwgbnVsbCkgPT4ge1xyXG4gICAgICBpZiAoYnVzeSB8fCBpc0NyZWF0ZU1vZGUgfHwgIXNoZWV0SWQpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKCFjYW5UcmFuc2l0aW9uU3RhdHVzKSB7XHJcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcGF5bG9hZFJlc3VsdCA9IGJ1aWxkVXBkYXRlUGF5bG9hZChuZXh0U3RhdHVzLCBzdGF0dXNDb21tZW50T3ZlcnJpZGUpO1xyXG4gICAgICBpZiAoXCJlcnJvclwiIGluIHBheWxvYWRSZXN1bHQpIHtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKHBheWxvYWRSZXN1bHQuZXJyb3IpO1xyXG4gICAgICAgIHNldFN0YXR1cyhwYXlsb2FkUmVzdWx0LmVycm9yKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xyXG4gICAgICAgIHN0YXJ0U3RhdHVzLFxyXG4gICAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRXJyb3JcIiwgXCJVcGRhdGUgZXJyb3IuXCIpLFxyXG4gICAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgICAgc2V0QnVzeSxcclxuICAgICAgICBzZXRTdGF0dXMsXHJcbiAgICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHVwZGF0ZUV4cGVuc2VTaGVldEhlYWRlcihzaGVldElkLCBwYXlsb2FkUmVzdWx0LnBheWxvYWQpO1xyXG5cclxuICAgICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlZFwiLCBcIkV4cGVuc2Ugc2hlZXQgdXBkYXRlZFwiKSk7XHJcbiAgICAgICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gcmVzdWx0Lm9rO1xyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgYnVzeSxcclxuICAgICAgYnVpbGRVcGRhdGVQYXlsb2FkLFxyXG4gICAgICBjYW5UcmFuc2l0aW9uU3RhdHVzLFxyXG4gICAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICAgIHNldEJ1c3ksXHJcbiAgICAgIHNldElzRWRpdGluZyxcclxuICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICBzaGVldElkLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZURlbGV0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoaXNEZWxldGVMb2NrZWQpIHJldHVybiBmYWxzZTtcclxuICAgIGlmICghY2FuRGVsZXRlRXhwZW5zZSkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcclxuICAgICAgc3RhcnRTdGF0dXM6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGluZ1wiLCBcIkRlbGV0aW5nIGV4cGVuc2Ugc2hlZXQuLi5cIiksXHJcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRXJyb3JcIiwgXCJEZWxldGUgZXJyb3IuXCIpLFxyXG4gICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICBzZXRCdXN5LFxyXG4gICAgICBzZXRTdGF0dXMsXHJcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0KHNoZWV0SWQpO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IGRlbGV0ZWRcIikpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcclxuICB9LCBbYnVzeSwgY2FuRGVsZXRlRXhwZW5zZSwgaXNEZWxldGVMb2NrZWQsIHNldEJ1c3ksIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1cywgc2hlZXRJZF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlU3RhdHVzVHJhbnNpdGlvbixcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyB9IGZyb20gXCIuLi9ob29rcy91c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgbmF2aWdhdGVUb0V4cGVuc2VVcmwgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBtb2RhbE9wZW46IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcclxuICBhY3Rpb25Nb2RlPzogXCJkZWZhdWx0XCIgfCBcImRlbGV0ZV9vbmx5XCIgfCBcInZpZXdfb25seVwiO1xyXG4gIGlzTG9ja2VkOiBib29sZWFuO1xyXG4gIGlzRWRpdExvY2tlZD86IGJvb2xlYW47XHJcbiAgaXNEZWxldGVMb2NrZWQ/OiBib29sZWFuO1xyXG4gIHBlcm1pc3Npb25zUmVhZHk/OiBib29sZWFuO1xyXG4gIGNhbkVkaXRFeHBlbnNlOiBib29sZWFuO1xyXG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XHJcbiAgY2FuRGVsZXRlRXhwZW5zZTogYm9vbGVhbjtcclxuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUNhbmNlbEVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBvblNhdmVTdWNjZXNzOiAoKSA9PiB2b2lkO1xyXG4gIG9uRGVsZXRlU3VjY2Vzcz86ICgpID0+IHZvaWQ7XHJcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XHJcbiAgICBvbkNvbmZpcm0/OiAoKSA9PiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiB8IGJvb2xlYW4gfCB2b2lkO1xyXG4gIH0pID0+IHZvaWQ7XHJcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gQ29vcmRpbmF0ZXMgdG9wYmFyIGljb24gc3RhdGUgYW5kIGRpc3BhdGNoIGFjdGlvbnMgZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9ucyA9ICh7XHJcbiAgYnVzeSxcclxuICBtb2RhbE9wZW4sXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGlzQ3JlYXRlTW9kZSxcclxuICBhY3Rpb25Nb2RlID0gXCJkZWZhdWx0XCIsXHJcbiAgaXNMb2NrZWQsXHJcbiAgaXNFZGl0TG9ja2VkLFxyXG4gIGlzRGVsZXRlTG9ja2VkLFxyXG4gIHBlcm1pc3Npb25zUmVhZHkgPSB0cnVlLFxyXG4gIGNhbkVkaXRFeHBlbnNlLFxyXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXHJcbiAgY2FuRGVsZXRlRXhwZW5zZSxcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICBoYW5kbGVVcGRhdGUsXHJcbiAgaGFuZGxlRGVsZXRlLFxyXG4gIG9uU2F2ZVN1Y2Nlc3MsXHJcbiAgb25EZWxldGVTdWNjZXNzLFxyXG4gIG9wZW5Db25maXJtLFxyXG4gIGNsb3NlQ29uZmlybSxcclxufTogVXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MpID0+IHtcclxuICB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMoe1xyXG4gICAgYWN0aW9uR3JvdXBJZDogXCJleHBlbnNlLXNoZWV0LWRldGFpbC1hY3Rpb25zXCIsXHJcbiAgICBpZHM6IHtcclxuICAgICAgZWRpdEljb25JZDogXCJleHBlbnNlRWRpdEljb25cIixcclxuICAgICAgc2F2ZUljb25JZDogXCJleHBlbnNlU2F2ZUljb25cIixcclxuICAgICAgZGVsZXRlQnRuSWQ6IFwiZXhwZW5zZURlbGV0ZUJ0blwiLFxyXG4gICAgICBjYW5jZWxCdG5JZDogXCJleHBlbnNlQ2FuY2VsQnRuXCIsXHJcbiAgICB9LFxyXG4gICAgZXZlbnRzOiB7XHJcbiAgICAgIGVkaXRFdmVudDogXCJleHBlbnNlLWRldGFpbC1lZGl0XCIsXHJcbiAgICAgIGRlbGV0ZUV2ZW50OiBcImV4cGVuc2UtZGV0YWlsLWRlbGV0ZVwiLFxyXG4gICAgICBjYW5jZWxFdmVudDogXCJleHBlbnNlLWRldGFpbC1jYW5jZWwtZWRpdFwiLFxyXG4gICAgfSxcclxuICAgIGJ1c3ksXHJcbiAgICBtb2RhbE9wZW4sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc0xvY2tlZCxcclxuICAgIGFjdGlvbk1vZGUsXHJcbiAgICBpc0VkaXRMb2NrZWQsXHJcbiAgICBpc0RlbGV0ZUxvY2tlZCxcclxuICAgIGFsbG93Q3JlYXRlTW9kZUFjdGlvbnNXaGVuTG9ja2VkOiB0cnVlLFxyXG4gICAgcGVybWlzc2lvbnNSZWFkeSxcclxuICAgIGNhbkNyZWF0ZTogY2FuQ3JlYXRlRXhwZW5zZSxcclxuICAgIGNhbkVkaXQ6IGNhbkVkaXRFeHBlbnNlLFxyXG4gICAgY2FuRGVsZXRlOiBjYW5EZWxldGVFeHBlbnNlLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgaGFuZGxlU2F2ZTogaGFuZGxlVXBkYXRlLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgc2F2ZUNvbmZpcm1UaXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIsIFwiU2F2ZSBjaGFuZ2VzXCIpLFxyXG4gICAgc2F2ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIHNhdmUgY2hhbmdlcz9cIiksXHJcbiAgICBzYXZlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIiksXHJcbiAgICBkZWxldGVDb25maXJtVGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVTaGVldF9UaXRsZVwiLCBcIkRlbGV0ZSBleHBlbnNlIHNoZWV0XCIpLFxyXG4gICAgZGVsZXRlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVTaGVldF9Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgZXhwZW5zZSBzaGVldD9cIiksXHJcbiAgICBkZWxldGVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJEZWxldGVcIiksXHJcbiAgICBvblNhdmVTdWNjZXNzLFxyXG4gICAgb25EZWxldGVTdWNjZXNzOiBvbkRlbGV0ZVN1Y2Nlc3MgfHwgKCgpID0+IG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXRzXCIpKSxcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgY2xvc2VDb25maXJtLFxyXG4gIH0pO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7XHJcbiAgRXhwZW5zZVNoZWV0SGVhZGVyLFxyXG4gIEV4cGVuc2VTaGVldExpbmUsXHJcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsLFxyXG4gIGdldEV4Y2hhbmdlUmF0ZSxcclxuICBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlLFxyXG4gIG1hcEV4cGVuc2VTaGVldEhlYWRlcixcclxuICBtYXBFeHBlbnNlU2hlZXRMaW5lLFxyXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLFxyXG4gIG5hdmlnYXRlVG9FeHBlbnNlVXJsLFxyXG4gIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VSZWNvcmQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU1hbmFnZWRVc2VyU2NvcGUudHNcIjtcclxuaW1wb3J0IHsgZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhjaGFuZ2VSYXRlRW50cnlNb2RlQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIGhhc0Fzc2lnbmVkVm91Y2hlciwgcGFyc2VFeHBlbnNlRGF0ZSwgc2FmZVRleHQsIHRvSXNvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIsIHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XHJcbmltcG9ydCB7IHJlc29sdmVFeHBlbnNlU2hlZXREZXRhaWxQb2xpY3kgfSBmcm9tIFwiLi9leHBlbnNlU2hlZXREZXRhaWxQb2xpY3kudHNcIjtcclxuXHJcbmNvbnN0IEVYQ0hBTkdFX1JBVEVfREVCT1VOQ0VfTVMgPSA0MDA7XHJcbmNvbnN0IEVYQ0hBTkdFX1JBVEVfUkVGRVJFTkNFX0FNT1VOVCA9IDEwMDtcclxuY29uc3QgRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyA9IDc7XHJcbmNvbnN0IEVYUEVOU0VfU1RBVFVTX0FQUFJPVkVEID0gMjtcclxuY29uc3QgRVhQRU5TRV9TVEFUVVNfUEFJRCA9IDQ7XHJcblxyXG4vLyBOb3JtYWxpemVzIGV4Y2hhbmdlLXJhdGUgbnVtYmVycyBmb3IgbnVtZXJpYyBpbnB1dCBjb250cm9scy5cclxuY29uc3QgZm9ybWF0RXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZSA9ICh2YWx1ZTogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKHZhbHVlLCB7XHJcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IEVYQ0hBTkdFX1JBVEVfREVDSU1BTF9ESUdJVFMsXHJcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IEVYQ0hBTkdFX1JBVEVfREVDSU1BTF9ESUdJVFMsXHJcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgIGZhbGxiYWNrOiBcIlwiLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gUmV1c2VzIHRoZSBmaXhlZCBzYW1lLWN1cnJlbmN5IHJhdGUgc28gRVVSIHNoZWV0cyBzdGF5IGFsaWduZWQgd2l0aCB0aGUgMTAwIHJlZmVyZW5jZSBhbW91bnQuXHJcbmNvbnN0IFNBTUVfQ1VSUkVOQ1lfRVhDSEFOR0VfUkFURV9JTlBVVCA9IGZvcm1hdEV4Y2hhbmdlUmF0ZUlucHV0VmFsdWUoRVhDSEFOR0VfUkFURV9SRUZFUkVOQ0VfQU1PVU5UKTtcclxuXHJcbmNvbnN0IGJ1aWxkQ3JlYXRlSGVhZGVyRHJhZnQgPSAoKTogRXhwZW5zZVNoZWV0SGVhZGVyID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgaG9qYUdhc3Rvc0lkOiBcIlwiLFxyXG4gICAgZGVzY3JpcHRpb246IFwiXCIsXHJcbiAgICBwcm9qSWQ6IFwiXCIsXHJcbiAgICBjdXJyZW5jeUNvZGU6IFwiXCIsXHJcbiAgICB0b3RhbEFtb3VudDogbnVsbCxcclxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogMCxcclxuICAgIGV4Y2hhbmdlUmF0ZU1vZGU6IDAsXHJcbiAgICBjcmVhdGVkRGF0ZTogXCJcIixcclxuICAgIGV4Y2hSYXRlOiBTdHJpbmcoRVhDSEFOR0VfUkFURV9SRUZFUkVOQ0VfQU1PVU5UKSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3Qgc2hvdWxkU2hvd0V4Y2hhbmdlUmF0ZSA9ICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIGZhbHNlO1xyXG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dCh2YWx1ZSk7XHJcbiAgaWYgKHBhcnNlZCA9PT0gbnVsbCkgcmV0dXJuIHRydWU7XHJcbiAgcmV0dXJuIE1hdGguYWJzKHBhcnNlZCkgPiAwO1xyXG59O1xyXG5cclxudHlwZSBVc2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZUFyZ3MgPSB7XHJcbiAgaGFzQWNjZXNzOiBib29sZWFuO1xyXG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XHJcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcclxuICBjYW5NYW5hZ2VPdGhlclVzZXJzOiBib29sZWFuO1xyXG4gIGN1cnJlbnRBeFVzZXJJZDogc3RyaW5nO1xyXG4gIGN1cnJlbnRDcm1Vc2VySWQ6IHN0cmluZztcclxuICBzZWxlY3RlZE1hbmFnZWRVc2VySWQ6IHN0cmluZztcclxuICBzaGVldElkOiBzdHJpbmc7XHJcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xyXG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gT3ducyBzdGF0ZSBhbmQgYmVoYXZpb3IgZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsIHBhZ2UgKHJlYWQsIGVkaXQsIGNyZWF0ZSkuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZSA9ICh7XHJcbiAgaGFzQWNjZXNzLFxyXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXHJcbiAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gIGN1cnJlbnRBeFVzZXJJZCxcclxuICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICBzaGVldElkLFxyXG4gIGlzQ3JlYXRlTW9kZSxcclxuICBvbkZvcmJpZGRlbixcclxufTogVXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGVBcmdzKSA9PiB7XHJcbiAgY29uc3QgW2hlYWRlciwgc2V0SGVhZGVyXSA9IHVzZVN0YXRlPEV4cGVuc2VTaGVldEhlYWRlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtsaW5lcywgc2V0TGluZXNdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0TGluZVtdPihbXSk7XHJcbiAgY29uc3QgW2xpbmVQYWdlLCBzZXRMaW5lUGFnZV0gPSB1c2VTdGF0ZSgxKTtcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtpc0VkaXRpbmcsIHNldElzRWRpdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW21vZGFsRXJyb3IsIHNldE1vZGFsRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0RGVzY3JpcHRpb24sIHNldERyYWZ0RGVzY3JpcHRpb25dID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0UHJvamVjdElkLCBzZXREcmFmdFByb2plY3RJZF0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRDdXJyZW5jeUNvZGUsIHNldERyYWZ0Q3VycmVuY3lDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdEV4Y2hhbmdlUmF0ZSwgc2V0RHJhZnRFeGNoYW5nZVJhdGVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0RXN0YWRvQ29tZW50YXJpb3MsIHNldERyYWZ0RXN0YWRvQ29tZW50YXJpb3NdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RlZmF1bHRDdXJyZW5jeUNvZGUsIHNldERlZmF1bHRDdXJyZW5jeUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2lzRXhjaGFuZ2VSYXRlTG9hZGluZywgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbZXhjaGFuZ2VSYXRlTWVzc2FnZSwgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IsIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSwgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSwgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLCBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW29mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlLCBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuXHJcbiAgY29uc3QgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciA9IHVzZUNhbGxiYWNrKChuZXh0SGVhZGVyOiBFeHBlbnNlU2hlZXRIZWFkZXIgfCBudWxsKSA9PiB7XHJcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uKHNhZmVUZXh0KG5leHRIZWFkZXI/LmRlc2NyaXB0aW9uKSk7XHJcbiAgICBzZXREcmFmdFByb2plY3RJZChzYWZlVGV4dChuZXh0SGVhZGVyPy5wcm9qSWQpKTtcclxuICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlKHNhZmVUZXh0KG5leHRIZWFkZXI/LmN1cnJlbmN5Q29kZSkpO1xyXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUoXHJcbiAgICAgIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcihuZXh0SGVhZGVyPy5leGNoUmF0ZSwge1xyXG4gICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcclxuICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IEVYQ0hBTkdFX1JBVEVfREVDSU1BTF9ESUdJVFMsXHJcbiAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICAgICAgZmFsbGJhY2s6IFwiXCIsXHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gICAgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvcyhzYWZlVGV4dChuZXh0SGVhZGVyPy5lc3RhZG9Db21lbnRhcmlvcykpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGxvYWREZXRhaWwgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIGlmICghaGFzQWNjZXNzKSB7XHJcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgICBpZiAoIWNhbkNyZWF0ZUV4cGVuc2UpIHtcclxuICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBkcmFmdEhlYWRlciA9IGJ1aWxkQ3JlYXRlSGVhZGVyRHJhZnQoKTtcclxuICAgICAgICBzZXRIZWFkZXIoZHJhZnRIZWFkZXIpO1xyXG4gICAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgICBzZXRMaW5lUGFnZSgxKTtcclxuICAgICAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XHJcbiAgICAgICAgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlcihkcmFmdEhlYWRlcik7XHJcbiAgICAgICAgc2V0U3RhdHVzKFwiXCIpO1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICghc2hlZXRJZCkge1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob3RGb3VuZFwiLCBcIkV4cGVuc2Ugc2hlZXQgd2FzIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XHJcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldERldGFpbChzaGVldElkLCB7XHJcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlPy5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlwiKSk7XHJcbiAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzaGVldHMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkU2hlZXQgPVxyXG4gICAgICAgICAgc2hlZXRzLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeT8uSG9qYUdhc3Rvc0lkKS50b1VwcGVyQ2FzZSgpID09PSBzaGVldElkLnRyaW0oKS50b1VwcGVyQ2FzZSgpKSB8fCBzaGVldHNbMF07XHJcblxyXG4gICAgICAgIGlmICghc2VsZWN0ZWRTaGVldCkge1xyXG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCB3YXMgbm90IGZvdW5kLlwiKSk7XHJcbiAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBuZXh0SGVhZGVyID0gbWFwRXhwZW5zZVNoZWV0SGVhZGVyKHNlbGVjdGVkU2hlZXQpO1xyXG4gICAgICAgIGNvbnN0IG5leHRMaW5lcyA9IChBcnJheS5pc0FycmF5KHNlbGVjdGVkU2hlZXQuTGluZXMpID8gc2VsZWN0ZWRTaGVldC5MaW5lcyA6IFtdKS5tYXAoKGVudHJ5KSA9PlxyXG4gICAgICAgICAgbWFwRXhwZW5zZVNoZWV0TGluZShlbnRyeSlcclxuICAgICAgICApO1xyXG4gICAgICAgIHNldEhlYWRlcihuZXh0SGVhZGVyKTtcclxuICAgICAgICBzZXRMaW5lcyhuZXh0TGluZXMpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoXHJcbiAgICAgICAgICBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlwiKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZvaWQgbG9hZERldGFpbCgpO1xyXG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlLCBoYXNBY2Nlc3MsIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIsIGlzQ3JlYXRlTW9kZSwgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaGVhZGVyIHx8IGlzRWRpdGluZykgcmV0dXJuO1xyXG4gICAgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlcihoZWFkZXIpO1xyXG4gIH0sIFtoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIsIGlzRWRpdGluZ10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFoYXNBY2Nlc3MpIHJldHVybjtcclxuICAgIGxldCBpc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcclxuXHJcbiAgICBjb25zdCBsb2FkRGVmYXVsdEN1cnJlbmN5Q29kZSA9IGFzeW5jICgpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBjb2RlID0gYXdhaXQgZ2V0RXhwZW5zZVNoZWV0RGVmYXVsdEN1cnJlbmN5Q29kZSh7XHJcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XHJcbiAgICAgICAgc2V0RGVmYXVsdEN1cnJlbmN5Q29kZShzYWZlVGV4dChjb2RlKS50b1VwcGVyQ2FzZSgpKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2b2lkIGxvYWREZWZhdWx0Q3VycmVuY3lDb2RlKCk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpc0NhbmNlbGxlZCA9IHRydWU7XHJcbiAgICAgIGNvbnRyb2xsZXIuYWJvcnQoKTtcclxuICAgIH07XHJcbiAgfSwgW2hhc0FjY2Vzc10pO1xyXG5cclxuICBjb25zdCBoYXNBY3RpdmVQcm9jZXNzID0gdXNlTWVtbygoKSA9PiBidXN5IHx8IGlzRWRpdGluZywgW2J1c3ksIGlzRWRpdGluZ10pO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKGhhc0FjdGl2ZVByb2Nlc3MpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKCk7XHJcbiAgICB9O1xyXG4gIH0sIFtoYXNBY3RpdmVQcm9jZXNzXSk7XHJcblxyXG4gIGNvbnN0IHByb2plY3RWYWx1ZSA9IHNhZmVUZXh0KGhlYWRlcj8ucHJvaklkKTtcclxuICBjb25zdCBzdGF0dXNDb2RlID0gdHlwZW9mIGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzID09PSBcIm51bWJlclwiID8gaGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA6IG51bGw7XHJcbiAgY29uc3QgaXNTaGVldEFwcHJvdmVkID0gc3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfQVBQUk9WRUQ7XHJcbiAgY29uc3QgaXNTaGVldFBhaWRCeVN0YXR1cyA9IHN0YXR1c0NvZGUgPT09IEVYUEVOU0VfU1RBVFVTX1BBSUQ7XHJcbiAgY29uc3QgaXNTaGVldFBhaWRCeVZvdWNoZXIgPSBoYXNBc3NpZ25lZFZvdWNoZXIoaGVhZGVyPy52b3VjaGVyKTtcclxuICBjb25zdCBpc1NoZWV0UGFpZCA9IGlzU2hlZXRQYWlkQnlTdGF0dXMgfHwgaXNTaGVldFBhaWRCeVZvdWNoZXI7XHJcbiAgY29uc3QgaXNNYW5hZ2luZ090aGVyVXNlciA9IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VSZWNvcmQoe1xyXG4gICAgY2FuTWFuYWdlT3RoZXJVc2VycyxcclxuICAgIGN1cnJlbnRBeFVzZXJJZCxcclxuICAgIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICByZWNvcmRPd25lclVzZXJJZDogaGVhZGVyPy51c2VySWQsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgfSk7XHJcbiAgY29uc3QgZGV0YWlsUG9saWN5ID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaW50ZXJhY3Rpb25Nb2RlOiBcImZ1bGxfZWRpdFwiIGFzIGNvbnN0LFxyXG4gICAgICAgIHNob3dGYWI6IGZhbHNlLFxyXG4gICAgICAgIGNhbkRlbGV0ZVNoZWV0OiBmYWxzZSxcclxuICAgICAgICBzdGF0dXNBY3Rpb25zOiBbXSxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzb2x2ZUV4cGVuc2VTaGVldERldGFpbFBvbGljeSh7XHJcbiAgICAgIHN0YXR1c0NvZGUsXHJcbiAgICAgIGlzTWFuYWdpbmdPdGhlclVzZXIsXHJcbiAgICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICAgIGlzUGFpZDogaXNTaGVldFBhaWQsXHJcbiAgICB9KTtcclxuICB9LCBbYWxsb3dTZWxmTWFuYWdlbWVudCwgaXNDcmVhdGVNb2RlLCBpc01hbmFnaW5nT3RoZXJVc2VyLCBpc1NoZWV0UGFpZCwgc3RhdHVzQ29kZV0pO1xyXG4gIGNvbnN0IGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50ID0gaXNDcmVhdGVNb2RlIHx8ICghaXNNYW5hZ2luZ090aGVyVXNlciAmJiBkZXRhaWxQb2xpY3kuaW50ZXJhY3Rpb25Nb2RlID09PSBcImZ1bGxfZWRpdFwiKTtcclxuICBjb25zdCBjYW5FZGl0U3RhdHVzQ29tbWVudEN1cnJlbnQgPSAhaXNDcmVhdGVNb2RlICYmIGRldGFpbFBvbGljeS5pbnRlcmFjdGlvbk1vZGUgPT09IFwiY29tbWVudF9vbmx5X2VkaXRcIjtcclxuICBjb25zdCBjYW5FZGl0QW55Q3VycmVudCA9IChpc0NyZWF0ZU1vZGUgJiYgY2FuQ3JlYXRlRXhwZW5zZSkgfHwgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQgfHwgY2FuRWRpdFN0YXR1c0NvbW1lbnRDdXJyZW50O1xyXG4gIGNvbnN0IGNhblVzZUZ1bGxFZGl0RmVhdHVyZXMgPSAhaXNDcmVhdGVNb2RlICYmIGRldGFpbFBvbGljeS5pbnRlcmFjdGlvbk1vZGUgPT09IFwiZnVsbF9lZGl0XCI7XHJcbiAgY29uc3QgaXNTaGVldExvY2tlZCA9IGlzU2hlZXRBcHByb3ZlZCB8fCBpc1NoZWV0UGFpZDtcclxuICBjb25zdCBoYXNMaW5lcyA9IGxpbmVzLmxlbmd0aCA+IDA7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlVmFsdWUgPSBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIoc2FmZVRleHQoaGVhZGVyPy5leGNoUmF0ZSksIHtcclxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcclxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcclxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gICAgZmFsbGJhY2s6IFwiXCIsXHJcbiAgfSk7XHJcbiAgY29uc3Qgc2hvd0V4Y2hhbmdlUmF0ZSA9IHVzZU1lbW8oKCkgPT4gc2hvdWxkU2hvd0V4Y2hhbmdlUmF0ZShleGNoYW5nZVJhdGVWYWx1ZSksIFtleGNoYW5nZVJhdGVWYWx1ZV0pO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5ID0gdXNlTWVtbygoKSA9PiBkcmFmdEN1cnJlbmN5Q29kZS50cmltKCkudG9VcHBlckNhc2UoKSwgW2RyYWZ0Q3VycmVuY3lDb2RlXSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZERlZmF1bHRDdXJyZW5jeSA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQoZGVmYXVsdEN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSwgW2RlZmF1bHRDdXJyZW5jeUNvZGVdKTtcclxuICBjb25zdCBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3kgPSBub3JtYWxpemVkRGVmYXVsdEN1cnJlbmN5IHx8IFwiRVVSXCI7XHJcbiAgY29uc3QgdWlMb2NhbGUgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBcImVzLUVTXCI7XHJcbiAgICByZXR1cm4gc2FmZVRleHQoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Py5sYW5nKSB8fCBcImVzLUVTXCI7XHJcbiAgfSwgW10pO1xyXG4gIGNvbnN0IGZvcm1FeGNoYW5nZURhdGUgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IHBhcnNlZERhdGUgPSBwYXJzZUV4cGVuc2VEYXRlKHNhZmVUZXh0KGhlYWRlcj8uY3JlYXRlZERhdGUpKTtcclxuICAgIGlmIChwYXJzZWREYXRlKSByZXR1cm4gdG9Jc29EYXRlKHBhcnNlZERhdGUpO1xyXG4gICAgcmV0dXJuIHRvSXNvRGF0ZShuZXcgRGF0ZSgpKTtcclxuICB9LCBbaGVhZGVyPy5jcmVhdGVkRGF0ZV0pO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZVJlcXVpcmVkID1cclxuICAgIGlzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCAmJiBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSAhPT0gXCJcIiAmJiBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSAhPT0gZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5O1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlID1cclxuICAgIGV4Y2hhbmdlUmF0ZVJlcXVpcmVkICYmICFkcmFmdEV4Y2hhbmdlUmF0ZS50cmltKClcclxuICAgICAgPyBpbmRUKFxyXG4gICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fRXhjaGFuZ2VSYXRlUmVxdWlyZWRcIixcclxuICAgICAgICAgIFwiRXhjaGFuZ2UgcmF0ZSBpcyByZXF1aXJlZCB3aGVuIGN1cnJlbmN5IGlzIGRpZmZlcmVudCBmcm9tIGJhc2UgY3VycmVuY3kuXCJcclxuICAgICAgICApXHJcbiAgICAgIDogXCJcIjtcclxuICAvLyBDdXJyZW5jeSB0eXBlIGNhbiBiZSBlZGl0ZWQgd2hlbmV2ZXIgdGhlIHNoZWV0IGl0c2VsZiBpcyBlZGl0YWJsZSAobm90IGFwcHJvdmVkL3BhaWQpLlxyXG4gIGNvbnN0IGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzID0gZmFsc2U7XHJcbiAgY29uc3QgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzID0gaXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50ICYmIGhhc0xpbmVzICYmIHNob3dFeGNoYW5nZVJhdGU7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBsZXQgaXNDYW5jZWxsZWQgPSBmYWxzZTtcclxuICAgIGxldCByZXF1ZXN0VGltZXI6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgbnVsbCA9IG51bGw7XHJcbiAgICBsZXQgcmVxdWVzdEFib3J0Q29udHJvbGxlcjogQWJvcnRDb250cm9sbGVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgY29uc3QgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzID0gKCkgPT4ge1xyXG4gICAgICBpZiAocmVxdWVzdFRpbWVyKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHJlcXVlc3RUaW1lcik7XHJcbiAgICAgICAgcmVxdWVzdFRpbWVyID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgICBpZiAocmVxdWVzdEFib3J0Q29udHJvbGxlcikge1xyXG4gICAgICAgIHJlcXVlc3RBYm9ydENvbnRyb2xsZXIuYWJvcnQoKTtcclxuICAgICAgICByZXF1ZXN0QWJvcnRDb250cm9sbGVyID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoIWlzRWRpdGluZyB8fCAhY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQgfHwgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzKSB7XHJcbiAgICAgIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXCJcIik7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICBjbGVhclJlcXVlc3RBcnRpZmFjdHMoKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIW5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5IHx8ICFleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3kpIHtcclxuICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xyXG4gICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGNsZWFyUmVxdWVzdEFydGlmYWN0cygpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChub3JtYWxpemVkRHJhZnRDdXJyZW5jeSA9PT0gZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5KSB7XHJcbiAgICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlKFNBTUVfQ1VSUkVOQ1lfRVhDSEFOR0VfUkFURV9JTlBVVCk7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoU0FNRV9DVVJSRU5DWV9FWENIQU5HRV9SQVRFX0lOUFVUKTtcclxuICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xyXG4gICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGNsZWFyUmVxdWVzdEFydGlmYWN0cygpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJlcXVlc3RUaW1lciA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xyXG4gICAgICByZXF1ZXN0QWJvcnRDb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG4gICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcodHJ1ZSk7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXCJcIik7XHJcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRFeGNoYW5nZVJhdGUoXHJcbiAgICAgICAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXHJcbiAgICAgICAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcclxuICAgICAgICAgIGZvcm1FeGNoYW5nZURhdGUsXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICBzaWduYWw6IHJlcXVlc3RBYm9ydENvbnRyb2xsZXIuc2lnbmFsLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MgfHwgIXJlc3BvbnNlLkRhdGEgfHwgIU51bWJlci5pc0Zpbml0ZShOdW1iZXIocmVzcG9uc2UuRGF0YS5SYXRlKSkpIHtcclxuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XHJcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXHJcbiAgICAgICAgICAgIHNhZmVUZXh0KHJlc3BvbnNlLk1lc3NhZ2UpIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9VbmF2YWlsYWJsZVwiLCBcIk5vIHNlIHB1ZG8gb2J0ZW5lciBlbCB0aXBvIGRlIGNhbWJpby5cIilcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFRoZSBlbmRwb2ludCByZXR1cm5zIG9uZSBiYXNlLWN1cnJlbmN5IHVuaXQgaW4gdGhlIGV4cGVuc2UgY3VycmVuY3kuXHJcbiAgICAgICAgLy8gVGhlIFVJIHN0b3JlcyB0aGUgYW1vdW50IGZvciB0aGUgZml4ZWQgbG9jYWwgcmVmZXJlbmNlIGFtb3VudCAoMTAwKS5cclxuICAgICAgICBjb25zdCBvZmZpY2lhbFJhdGVQZXJCYXNlVW5pdCA9IE51bWJlcihyZXNwb25zZS5EYXRhLlJhdGUpO1xyXG4gICAgICAgIGNvbnN0IG9mZmljaWFsUmF0ZUZvclJlZmVyZW5jZUFtb3VudCA9IG9mZmljaWFsUmF0ZVBlckJhc2VVbml0ICogRVhDSEFOR0VfUkFURV9SRUZFUkVOQ0VfQU1PVU5UO1xyXG4gICAgICAgIGNvbnN0IG5leHRFeGNoYW5nZVJhdGVWYWx1ZSA9IGZvcm1hdEV4Y2hhbmdlUmF0ZUlucHV0VmFsdWUob2ZmaWNpYWxSYXRlRm9yUmVmZXJlbmNlQW1vdW50KTtcclxuICAgICAgICBjb25zdCBvZmZpY2lhbFJhdGVSYXdWYWx1ZSA9IGZvcm1hdEV4Y2hhbmdlUmF0ZUlucHV0VmFsdWUob2ZmaWNpYWxSYXRlUGVyQmFzZVVuaXQpO1xyXG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUobmV4dEV4Y2hhbmdlUmF0ZVZhbHVlKTtcclxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKG9mZmljaWFsUmF0ZVJhd1ZhbHVlKTtcclxuICAgICAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZShuZXh0RXhjaGFuZ2VSYXRlVmFsdWUpO1xyXG5cclxuICAgICAgICBjb25zdCBlZmZlY3RpdmVSYXRlRGF0ZSA9IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGEuRGF0ZSkgfHwgZm9ybUV4Y2hhbmdlRGF0ZTtcclxuICAgICAgICBjb25zdCBzb3VyY2UgPSBzYWZlVGV4dChyZXNwb25zZS5EYXRhLlNvdXJjZSk7XHJcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKGVmZmVjdGl2ZVJhdGVEYXRlKTtcclxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShzb3VyY2UpO1xyXG4gICAgICAgIGNvbnN0IG9mZmljaWFsTGFiZWwgPSBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsKDApIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX09mZmljaWFsXCIsIFwiVC5DLiBPZmljaWFsXCIpO1xyXG4gICAgICAgIGNvbnN0IGxvY2FsaXplZFJhdGVEYXRlID0gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGVmZmVjdGl2ZVJhdGVEYXRlLCB1aUxvY2FsZSkgfHwgZWZmZWN0aXZlUmF0ZURhdGU7XHJcbiAgICAgICAgY29uc3QgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UgPSBzb3VyY2UgPyBgJHtvZmZpY2lhbExhYmVsfSAke2xvY2FsaXplZFJhdGVEYXRlfSAoJHtzb3VyY2V9KWAgOiBgJHtvZmZpY2lhbExhYmVsfSAke2xvY2FsaXplZFJhdGVEYXRlfWA7XHJcbiAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShvZmZpY2lhbFJhdGVSYXdWYWx1ZSA/IGAke2V4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlfSAtICR7b2ZmaWNpYWxSYXRlUmF3VmFsdWV9YCA6IGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlKTtcclxuICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XHJcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHtcclxuICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQwNCkge1xyXG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9Ob3RGb3VuZFwiLCBcIk5vIGhheSB0aXBvIGRlIGNhbWJpbyBwYXJhIGxhIGZlY2hhXCIpKTtcclxuICAgICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MjIgfHwgZXJyb3Iuc3RhdHVzID09PSA1MDApIHtcclxuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcclxuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuICAgICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcclxuICAgICAgICAgICAgICBzYWZlVGV4dChlcnJvci5tZXNzYWdlKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcclxuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XHJcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXHJcbiAgICAgICAgICAgIHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9VbmF2YWlsYWJsZVwiLCBcIk5vIHNlIHB1ZG8gb2J0ZW5lciBlbCB0aXBvIGRlIGNhbWJpby5cIilcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XHJcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XHJcbiAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpKTtcclxuICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICBpZiAoIWlzQ2FuY2VsbGVkKSB7XHJcbiAgICAgICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSwgRVhDSEFOR0VfUkFURV9ERUJPVU5DRV9NUyk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgaXNDYW5jZWxsZWQgPSB0cnVlO1xyXG4gICAgICBjbGVhclJlcXVlc3RBcnRpZmFjdHMoKTtcclxuICAgIH07XHJcbiAgfSwgW1xyXG4gICAgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXHJcbiAgICBmb3JtRXhjaGFuZ2VEYXRlLFxyXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXHJcbiAgICB1aUxvY2FsZSxcclxuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSB8fCBpc0xvYWRpbmcgfHwgIWhlYWRlcikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFjYW5FZGl0QW55Q3VycmVudCkge1xyXG4gICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIHNldElzRWRpdGluZyh0cnVlKTtcclxuICAgIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIoaGVhZGVyKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRWRpdGluZ0VuYWJsZWRcIiwgXCJFZGl0aW5nIGVuYWJsZWRcIikpO1xyXG4gIH0sIFtjYW5FZGl0QW55Q3VycmVudCwgaGVhZGVyLCBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyLCBpc0NyZWF0ZU1vZGUsIGlzTG9hZGluZywgb25Gb3JiaWRkZW5dKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL0V4cGVuc2VTaGVldHNcIiwge1xyXG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWlzRWRpdGluZykgcmV0dXJuO1xyXG5cclxuICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlcihoZWFkZXIpO1xyXG4gICAgc2V0U3RhdHVzKGluZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpKTtcclxuICB9LCBbaGVhZGVyLCBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZ10pO1xyXG5cclxuICAvLyBPcGVucyBleHBlbnNlIHNoZWV0IGNyZWF0ZSBtb2RlIGZyb20gbGlzdC1sZXZlbCBlbnRyeSBwb2ludHMuXHJcbiAgY29uc3QgaGFuZGxlT3BlbkNyZWF0ZVNoZWV0TW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSkge1xyXG4gICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9tb2RlPWNyZWF0ZVwiLCB7XHJcbiAgICAgIGFza0NvbmZpcm1hdGlvbjogaXNFZGl0aW5nLFxyXG4gICAgfSk7XHJcbiAgfSwgW2NhbkNyZWF0ZUV4cGVuc2UsIGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nLCBvbkZvcmJpZGRlbl0pO1xyXG5cclxuICAvLyBPcGVucyBleHBlbnNlIGxpbmUgY3JlYXRlIG1vZGUgZnJvbSBhbiBleGlzdGluZyBleHBlbnNlIHNoZWV0IGRldGFpbC5cclxuICBjb25zdCBoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIXNoZWV0SWQgfHwgIWNhblVzZUZ1bGxFZGl0RmVhdHVyZXMpIHtcclxuICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRhcmdldFVybCA9IGAvR2FzdG9zL0V4cGVuc2VTaGVldExpbmVEZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNoZWV0SWQpfSZtb2RlPWNyZWF0ZWA7XHJcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwsIHtcclxuICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXHJcbiAgICB9KTtcclxuICB9LCBbY2FuVXNlRnVsbEVkaXRGZWF0dXJlcywgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmcsIG9uRm9yYmlkZGVuLCBzaGVldElkXSk7XHJcblxyXG4gIC8vIE9wZW5zIHRpY2tldHMgcGFnZSBmcm9tIGV4cGVuc2Ugc2hlZXQgY29udGV4dCB0byBjcmVhdGUgb3IgbGluayB0aWNrZXRzLlxyXG4gIGNvbnN0IG9wZW5UaWNrZXRzRnJvbVNoZWV0ID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoYWN0aW9uOiBcIm5ld1wiIHwgXCJsaW5rXCIpID0+IHtcclxuICAgICAgaWYgKCFzaGVldElkIHx8ICFjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzKSB7XHJcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XHJcbiAgICAgICAgYWN0aW9uLFxyXG4gICAgICAgIGhvamFHYXN0b3NJZDogc2hlZXRJZCxcclxuICAgICAgfSk7XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldHM/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcclxuICAgICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW2NhblVzZUZ1bGxFZGl0RmVhdHVyZXMsIGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nLCBvbkZvcmJpZGRlbiwgc2hlZXRJZF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVPcGVuQ3JlYXRlVGlja2V0TW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIG9wZW5UaWNrZXRzRnJvbVNoZWV0KFwibmV3XCIpO1xyXG4gIH0sIFtvcGVuVGlja2V0c0Zyb21TaGVldF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVPcGVuTGlua1RpY2tldE1vZGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBvcGVuVGlja2V0c0Zyb21TaGVldChcImxpbmtcIik7XHJcbiAgfSwgW29wZW5UaWNrZXRzRnJvbVNoZWV0XSk7XHJcblxyXG4gIGNvbnN0IG5hdmlnYXRlVG9DcmVhdGVkU2hlZXQgPSB1c2VDYWxsYmFjaygoY3JlYXRlZFNoZWV0SWQ6IHN0cmluZykgPT4ge1xyXG4gICAgY29uc3Qgc2FmZUNyZWF0ZWRTaGVldElkID0gc2FmZVRleHQoY3JlYXRlZFNoZWV0SWQpO1xyXG4gICAgaWYgKCFzYWZlQ3JlYXRlZFNoZWV0SWQpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVDcmVhdGVkU2hlZXRJZCl9YDtcclxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBuYXZpZ2F0ZVRvTGluZURldGFpbCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKFxyXG4gICAgICBsaW5lUmVjSWQ6IHN0cmluZyxcclxuICAgICAgb3B0aW9ucz86IHtcclxuICAgICAgICBtb2RlPzogXCJ2aWV3XCIgfCBcImVkaXRcIjtcclxuICAgICAgICBhc2tDb25maXJtYXRpb24/OiBib29sZWFuO1xyXG4gICAgICAgIGJ5cGFzc0d1YXJkT25jZT86IGJvb2xlYW47XHJcbiAgICAgIH1cclxuICAgICkgPT4ge1xyXG4gICAgICBjb25zdCBzYWZlTGluZUlkID0gc2FmZVRleHQobGluZVJlY0lkKTtcclxuICAgICAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChzaGVldElkKTtcclxuICAgICAgaWYgKCFzYWZlTGluZUlkIHx8ICFzYWZlU2hlZXRJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3Qgc2FmZU1vZGUgPSBvcHRpb25zPy5tb2RlID09PSBcImVkaXRcIiA/IFwiZWRpdFwiIDogXCJcIjtcclxuICAgICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0TGluZURldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZVNoZWV0SWQpfSZsaW5lUmVjSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZUxpbmVJZCl9JHtzYWZlTW9kZSA/IGAmbW9kZT0ke3NhZmVNb2RlfWAgOiBcIlwifWA7XHJcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCwge1xyXG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogb3B0aW9ucz8uYXNrQ29uZmlybWF0aW9uID8/IHRydWUsXHJcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiBvcHRpb25zPy5ieXBhc3NHdWFyZE9uY2UgPz8gZmFsc2UsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtzaGVldElkXVxyXG4gICk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoZWFkZXIsXHJcbiAgICBsaW5lcyxcclxuICAgIGxpbmVQYWdlLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgYnVzeSxcclxuICAgIHN0YXR1cyxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIG1vZGFsRXJyb3IsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsXHJcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvYWRpbmcsXHJcbiAgICBleGNoYW5nZVJhdGVNZXNzYWdlLFxyXG4gICAgZXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IsXHJcbiAgICBwcm9qZWN0VmFsdWUsXHJcbiAgICBpc1NoZWV0QXBwcm92ZWQsXHJcbiAgICBpc1NoZWV0UGFpZCxcclxuICAgIGlzU2hlZXRMb2NrZWQsXHJcbiAgICBleGNoYW5nZVJhdGVWYWx1ZSxcclxuICAgIHNob3dFeGNoYW5nZVJhdGUsXHJcbiAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcclxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcclxuICAgIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudDogRVhDSEFOR0VfUkFURV9SRUZFUkVOQ0VfQU1PVU5ULFxyXG4gICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXHJcbiAgICBkZXRhaWxQb2xpY3ksXHJcbiAgICBpc01hbmFnaW5nT3RoZXJVc2VyLFxyXG4gICAgY2FuRWRpdFN0YXR1c0NvbW1lbnRDdXJyZW50LFxyXG4gICAgY2FuRWRpdEFueUN1cnJlbnQsXHJcbiAgICBjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzLFxyXG4gICAgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXHJcbiAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcclxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcclxuICAgIHNldExpbmVQYWdlLFxyXG4gICAgc2V0TGluZXMsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBzZXREcmFmdFByb2plY3RJZCxcclxuICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICBzZXREcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBoYW5kbGVPcGVuQ3JlYXRlU2hlZXRNb2RlLFxyXG4gICAgaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlLFxyXG4gICAgaGFuZGxlT3BlbkNyZWF0ZVRpY2tldE1vZGUsXHJcbiAgICBoYW5kbGVPcGVuTGlua1RpY2tldE1vZGUsXHJcbiAgICBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0LFxyXG4gICAgbmF2aWdhdGVUb0xpbmVEZXRhaWwsXHJcbiAgfTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBa0I7OztBQ0FsQixJQUFBQyxnQkFBa0I7OztBQ0FsQixtQkFBaUY7QUFDakYsdUJBQTZCO0FBeUdyQjtBQTdGUixJQUFNLHdCQUF3QixDQUFDO0FBQUEsRUFDN0I7QUFBQSxFQUNBO0FBQUEsRUFDQSxZQUFZO0FBQUEsRUFDWixpQkFBaUI7QUFDbkIsTUFBa0M7QUFDaEMsUUFBTSxnQ0FBZ0M7QUFDdEMsUUFBTSw4QkFBOEI7QUFDcEMsUUFBTSx1QkFBdUI7QUFDN0IsUUFBTSxnQkFBZ0I7QUFDdEIsUUFBTSxDQUFDLFFBQVEsU0FBUyxRQUFJLHVCQUFTLEtBQUs7QUFDMUMsUUFBTSxDQUFDLFlBQVksYUFBYSxRQUFJLHVCQUE4QjtBQUFBLElBQ2hFLFVBQVU7QUFBQSxJQUNWLEtBQUs7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxFQUNkLENBQUM7QUFDRCxRQUFNLGdCQUFZLHFCQUFpQyxJQUFJO0FBQ3ZELFFBQU0sZUFBVyxxQkFBOEIsSUFBSTtBQUVuRCxrQkFBZ0IsQ0FBQyxXQUFXLFFBQVEsR0FBRyxNQUFNLFVBQVUsS0FBSyxDQUFDO0FBQzdELFFBQU0sMEJBQXNCLDBCQUFZLE1BQU07QUFDNUMsUUFBSSxPQUFPLFdBQVcsYUFBYTtBQUNqQztBQUFBLElBQ0Y7QUFFQSxVQUFNLGdCQUFnQixVQUFVO0FBQ2hDLFVBQU0sZUFBZSxTQUFTO0FBQzlCLFFBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjO0FBQ25DO0FBQUEsSUFDRjtBQUVBLFVBQU0sYUFBYSxjQUFjLHNCQUFzQjtBQUN2RCxVQUFNLFlBQVksYUFBYSxzQkFBc0I7QUFDckQsVUFBTSxnQkFBZ0IsT0FBTztBQUM3QixVQUFNLGlCQUFpQixPQUFPO0FBQzlCLFVBQU0sWUFBWSxLQUFLLElBQUksVUFBVSxPQUFPLEtBQUssSUFBSSxLQUFLLGdCQUFnQixnQ0FBZ0MsQ0FBQyxDQUFDO0FBRTVHLFFBQUksT0FBTyxXQUFXLE9BQU8sV0FBVyxRQUFRLElBQUksWUFBWTtBQUNoRSxXQUFPLEtBQUssSUFBSSwrQkFBK0IsS0FBSyxJQUFJLE1BQU0sZ0JBQWdCLFlBQVksNkJBQTZCLENBQUM7QUFFeEgsUUFBSSxNQUFNLFdBQVcsU0FBUztBQUM5QixVQUFNLG9CQUFvQixNQUFNLFVBQVUsU0FBUyw4QkFBOEI7QUFDakYsUUFBSSxtQkFBbUI7QUFDckIsWUFBTSxrQkFBa0IsV0FBVyxNQUFNLFVBQVUsU0FBUztBQUM1RCxZQUFNLG1CQUFtQiw4QkFDckIsa0JBQ0EsS0FBSyxJQUFJLDZCQUE2QixpQkFBaUIsVUFBVSxTQUFTLDJCQUEyQjtBQUFBLElBQzNHO0FBRUEsa0JBQWM7QUFBQSxNQUNaLFVBQVU7QUFBQSxNQUNWLEtBQUssS0FBSyxNQUFNLEdBQUc7QUFBQSxNQUNuQixNQUFNLEtBQUssTUFBTSxJQUFJO0FBQUEsTUFDckIsT0FBTyxLQUFLLE1BQU0sU0FBUztBQUFBLE1BQzNCLFlBQVk7QUFBQSxJQUNkLENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxDQUFDO0FBRUwsb0NBQWdCLE1BQU07QUFDcEIsUUFBSSxDQUFDLFFBQVE7QUFDWDtBQUFBLElBQ0Y7QUFDQSx3QkFBb0I7QUFBQSxFQUN0QixHQUFHLENBQUMsUUFBUSxTQUFTLG1CQUFtQixDQUFDO0FBRXpDLDhCQUFVLE1BQU07QUFDZCxRQUFJLENBQUMsUUFBUTtBQUNYO0FBQUEsSUFDRjtBQUNBLFVBQU0sdUJBQXVCLE1BQU0sb0JBQW9CO0FBQ3ZELFdBQU8saUJBQWlCLFVBQVUsb0JBQW9CO0FBQ3RELFdBQU8saUJBQWlCLFVBQVUsc0JBQXNCLElBQUk7QUFDNUQsV0FBTyxNQUFNO0FBQ1gsYUFBTyxvQkFBb0IsVUFBVSxvQkFBb0I7QUFDekQsYUFBTyxvQkFBb0IsVUFBVSxzQkFBc0IsSUFBSTtBQUFBLElBQ2pFO0FBQUEsRUFDRixHQUFHLENBQUMsUUFBUSxtQkFBbUIsQ0FBQztBQUVoQyxRQUFNLGVBQWUsT0FBTyxhQUFhLGNBQWMsT0FBTyxTQUFTO0FBRXZFLFNBQ0UsNkNBQUMsU0FBSSxXQUFXLFdBQVcsZUFBZSxTQUFTLEdBQ2pEO0FBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLEtBQUs7QUFBQSxRQUNMLE1BQUs7QUFBQSxRQUNMLGNBQVk7QUFBQSxRQUNaLGlCQUFlO0FBQUEsUUFDZixpQkFBYztBQUFBLFFBQ2QsV0FBVTtBQUFBLFFBQ1YsT0FBTyxFQUFFLGNBQWMsY0FBYztBQUFBLFFBQ3JDLFNBQVMsTUFBTSxVQUFVLENBQUMsYUFBYSxDQUFDLFFBQVE7QUFBQSxRQUVoRDtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsT0FBTTtBQUFBLFlBQ04sT0FBTTtBQUFBLFlBQ04sUUFBTztBQUFBLFlBQ1AsU0FBUTtBQUFBLFlBQ1IsTUFBSztBQUFBLFlBQ0wsUUFBTztBQUFBLFlBQ1AsYUFBWTtBQUFBLFlBQ1osZUFBYztBQUFBLFlBQ2QsZ0JBQWU7QUFBQSxZQUNmLGVBQVk7QUFBQSxZQUNaLFdBQVU7QUFBQSxZQUVWO0FBQUEsMERBQUMsVUFBSyxHQUFFLEtBQUksR0FBRSxLQUFJLE9BQU0sTUFBSyxRQUFPLE1BQUssSUFBRyxLQUFJLElBQUcsS0FBSTtBQUFBLGNBQ3ZELDRDQUFDLFVBQUssR0FBRSxhQUFZO0FBQUEsY0FDcEIsNENBQUMsVUFBSyxHQUFFLGdCQUFlO0FBQUE7QUFBQTtBQUFBLFFBQ3pCO0FBQUE7QUFBQSxJQUNGO0FBQUEsSUFFQyxVQUFVLG1CQUNQO0FBQUEsTUFDRTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsS0FBSztBQUFBLFVBQ0wsTUFBSztBQUFBLFVBQ0wsT0FBTyxFQUFFLEdBQUcsWUFBWSxjQUFjLGNBQWM7QUFBQSxVQUNwRCxXQUFXO0FBQUEsWUFDVDtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsVUFFQSxzREFBQyxPQUFFLFdBQVUsa0RBQWtELG1CQUFRO0FBQUE7QUFBQSxNQUN6RTtBQUFBLE1BQ0E7QUFBQSxJQUNGLElBQ0E7QUFBQSxLQUNOO0FBRUo7QUFFQSxJQUFPLGdDQUFROzs7QURuRkQsSUFBQUMsc0JBQUE7QUF0QmQsSUFBTSxvQ0FBb0MsQ0FBQztBQUFBLEVBQ3pDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBOEM7QUFDNUMsUUFBTSxFQUFFLFdBQVcsb0JBQW9CLElBQUk7QUFDM0MsUUFBTSxFQUFFLG1CQUFtQix5QkFBeUIsNkJBQTZCLGlCQUFpQixJQUFJO0FBQ3RHLFFBQU0sdUJBQXVCLGNBQUFDLFFBQU07QUFBQSxJQUNqQyxNQUFNO0FBQUEsTUFDSjtBQUFBLFFBQ0UsT0FBTztBQUFBLFFBQ1AsTUFBTTtBQUFBLFFBQ04sTUFBTSw2Q0FBQyxtQ0FBd0IsY0FBYyxrQkFBa0IsZUFBYyxXQUFVO0FBQUEsTUFDekY7QUFBQSxJQUNGO0FBQUEsSUFDQSxDQUFDLGdCQUFnQjtBQUFBLEVBQ25CO0FBQ0EsUUFBTSx3QkFBd0IsY0FBQUEsUUFBTTtBQUFBLElBQ2xDLE1BQU07QUFBQSxNQUNKO0FBQUEsUUFDRSxPQUFPLHNCQUFzQjtBQUFBLFFBQzdCLE1BQU0sc0JBQXNCO0FBQUEsUUFDNUIsTUFBTSw2Q0FBQyxtQ0FBd0IsY0FBYyxzQkFBc0IsS0FBSyxlQUFjLFdBQVU7QUFBQSxNQUNsRztBQUFBLElBQ0Y7QUFBQSxJQUNBLENBQUMsa0JBQWtCO0FBQUEsRUFDckI7QUFFQSxNQUFJLGFBQWEscUJBQXFCO0FBQ3BDLFdBQ0UsOENBQUMsU0FBSSxXQUFVLDJCQUNiO0FBQUEsbURBQUMsU0FBSSxXQUFXLGNBQWMsb0JBQW9CLGdCQUFnQixhQUFhLEdBQUcsS0FBSyxHQUNwRiw4QkFDQyw4RUFDRTtBQUFBLHNEQUFDLFNBQUksV0FBVSxlQUNiO0FBQUEsdURBQUMsV0FBTSxXQUFVLDRCQUE0QixnQ0FBcUI7QUFBQSxVQUNsRTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsT0FBTztBQUFBLGNBQ1AsYUFBYSxLQUFLLDZDQUE2QyxlQUFlO0FBQUEsY0FDOUUsT0FBTztBQUFBLGNBQ1AsVUFBVTtBQUFBLGNBQ1YsVUFBVSxDQUFDLGFBQWE7QUFBQSxjQUN4QixVQUFVLENBQUMsYUFBYTtBQUFBLGNBQ3hCLFdBQVc7QUFBQSxjQUNYLFFBQU87QUFBQSxjQUNQLGtDQUFnQztBQUFBO0FBQUEsVUFDbEM7QUFBQSxXQUNGO0FBQUEsUUFDQSw4Q0FBQyxTQUFJLFdBQVUsd0JBQ2I7QUFBQSx1REFBQyxXQUFNLFdBQVUsaUNBQWlDLGVBQUssb0NBQW9DLGVBQWUsR0FBRTtBQUFBLFVBQzVHO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxXQUFXLEtBQUssK0NBQStDLGdDQUFnQztBQUFBLGNBQy9GLFNBQVM7QUFBQSxjQUNULFdBQVU7QUFBQTtBQUFBLFVBQ1o7QUFBQSxVQUNBLDZDQUFDLFNBQ0M7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFdBQVcsZ0JBQWdCLGdDQUFnQyxxQ0FBcUMsRUFBRSxJQUFJLDhCQUE4Qix1QkFBdUIsRUFBRTtBQUFBLGNBQzdKLE1BQUs7QUFBQSxjQUNMLFdBQVU7QUFBQSxjQUNWLE9BQU87QUFBQSxjQUNQLFVBQVUsQ0FBQyxVQUFVLDBCQUEwQixNQUFNLE9BQU8sU0FBUyxFQUFFO0FBQUEsY0FDdkUsUUFBUSxDQUFDLFVBQ1A7QUFBQSxnQkFDRSx5QkFBeUIsTUFBTSxPQUFPLE9BQU87QUFBQSxrQkFDM0MsdUJBQXVCO0FBQUEsa0JBQ3ZCLHVCQUF1QjtBQUFBLGtCQUN2QixhQUFhO0FBQUEsa0JBQ2IsVUFBVTtBQUFBLGdCQUNaLENBQUM7QUFBQSxjQUNIO0FBQUEsY0FFRixjQUFZLEtBQUssb0NBQW9DLGVBQWU7QUFBQSxjQUNwRSxhQUFhLEtBQUssb0NBQW9DLGVBQWU7QUFBQSxjQUNyRSxVQUFVO0FBQUEsY0FDVixVQUFVO0FBQUE7QUFBQSxVQUNaLEdBQ0Y7QUFBQSxXQUNGO0FBQUEsU0FDRixJQUVBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxPQUFPO0FBQUEsVUFDUCxhQUFhLEtBQUssNkNBQTZDLGVBQWU7QUFBQSxVQUM5RSxPQUFPO0FBQUEsVUFDUCxVQUFVO0FBQUEsVUFDVixVQUFVLENBQUMsYUFBYTtBQUFBLFVBQ3hCLFVBQVUsQ0FBQyxhQUFhO0FBQUEsVUFDeEIsUUFBTztBQUFBLFVBQ1Asa0NBQWdDO0FBQUE7QUFBQSxNQUNsQyxHQUVKO0FBQUEsTUFFQyxvQkFDQyw4Q0FBQyxTQUFJLFdBQVUsMEJBQ2I7QUFBQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsT0FBTyxLQUFLLHFDQUFxQyxnQkFBZ0I7QUFBQSxZQUNqRSxTQUFTO0FBQUEsWUFDVCxPQUFPO0FBQUEsWUFDUCxVQUFVLE1BQU07QUFBQSxZQUNoQixhQUFhLEtBQUssNkNBQTZDLGVBQWU7QUFBQSxZQUM5RSxVQUFRO0FBQUEsWUFDUixVQUFRO0FBQUEsWUFDUixnQkFBZ0I7QUFBQSxZQUNoQixrQkFBa0I7QUFBQSxZQUNsQixXQUFTO0FBQUEsWUFDVCxXQUFXO0FBQUEsWUFDWCxrQkFBaUI7QUFBQSxZQUNqQix3QkFBdUI7QUFBQSxZQUN2Qix1QkFBc0I7QUFBQSxZQUN0QixxQkFBb0I7QUFBQSxZQUNwQiwrQkFBOEI7QUFBQSxZQUM5QixRQUFPO0FBQUEsWUFDUCxpQkFBZ0I7QUFBQSxZQUNoQixnQkFBZTtBQUFBO0FBQUEsUUFDakI7QUFBQSxRQUNBLDhDQUFDLFNBQUksV0FBVSxlQUNiO0FBQUEsdURBQUMsV0FBTSxXQUFVLDRCQUE0QixlQUFLLDhCQUE4QixRQUFRLEdBQUU7QUFBQSxVQUMxRjtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsV0FBVTtBQUFBLGNBQ1YsT0FBTyx5QkFBeUIsNkJBQTZCLGdCQUFnQjtBQUFBLGNBQzdFLGNBQVksS0FBSyw4QkFBOEIsUUFBUTtBQUFBLGNBQ3ZELFVBQVE7QUFBQSxjQUNSLFVBQVE7QUFBQTtBQUFBLFVBQ1Y7QUFBQSxXQUNGO0FBQUEsU0FDRixJQUNFO0FBQUEsTUFFSCxxQkFBcUIsZ0NBQWdDLDZDQUFDLE9BQUUsV0FBVSx1QkFBdUIseUNBQThCLElBQU87QUFBQSxPQUNqSTtBQUFBLEVBRUo7QUFFQSxTQUNFLDhFQUNFO0FBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE9BQU8sS0FBSyxnQ0FBZ0MsVUFBVTtBQUFBLFFBQ3RELFNBQVM7QUFBQSxRQUNULE9BQU8sc0JBQXNCO0FBQUEsUUFDN0IsVUFBVSxNQUFNO0FBQUEsUUFDaEIsYUFBYSxLQUFLLDZDQUE2QyxlQUFlO0FBQUEsUUFDOUUsVUFBUTtBQUFBLFFBQ1IsVUFBUTtBQUFBLFFBQ1IsZ0JBQWdCO0FBQUEsUUFDaEIsa0JBQWtCO0FBQUEsUUFDbEIsV0FBUztBQUFBLFFBQ1QsV0FBVztBQUFBLFFBQ1gsa0JBQWlCO0FBQUEsUUFDakIsd0JBQXVCO0FBQUEsUUFDdkIsdUJBQXNCO0FBQUEsUUFDdEIscUJBQW9CO0FBQUEsUUFDcEIsK0JBQThCO0FBQUEsUUFDOUIsUUFBTztBQUFBLFFBQ1AsaUJBQWdCO0FBQUEsUUFDaEIsZ0JBQWU7QUFBQTtBQUFBLElBQ2pCO0FBQUEsSUFDQyxDQUFDLGFBQWEsbUJBQ2IsNkNBQUMsZ0NBQXFCLE9BQU8sS0FBSyxvQ0FBb0MsZUFBZSxHQUFHLE9BQU8sbUJBQW1CLElBQ2hIO0FBQUEsS0FDTjtBQUVKO0FBRUEsSUFBTyw0Q0FBUTs7O0FFOU1mLElBQU0sMEJBQXVGO0FBQUEsRUFDM0YsR0FBRztBQUFBLElBQ0QsVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBLEVBQ1o7QUFBQSxFQUNBLEdBQUc7QUFBQSxJQUNELFVBQVU7QUFBQSxJQUNWLFVBQVU7QUFBQSxFQUNaO0FBQ0Y7QUFJTyxJQUFNLG1DQUFtQyxDQUFDLFVBQXVEO0FBQ3RHLFFBQU0sU0FBUyxPQUFPLEtBQUs7QUFDM0IsTUFBSSxXQUFXLEtBQUssV0FBVyxHQUFHO0FBQ2hDLFdBQU87QUFBQSxFQUNUO0FBQ0EsU0FBTztBQUNUO0FBZU8sSUFBTSxrQ0FBa0MsQ0FBQyxVQUEyQjtBQUN6RSxRQUFNLGFBQWEsaUNBQWlDLEtBQUs7QUFDekQsTUFBSSxlQUFlLEtBQU0sUUFBTztBQUNoQyxRQUFNLE9BQU8sd0JBQXdCLFVBQVU7QUFDL0MsU0FBTyxLQUFLLEtBQUssVUFBVSxLQUFLLFFBQVE7QUFDMUM7OztBQ2dHVSxJQUFBQyxzQkFBQTtBQWhHVixJQUFNLG9DQUFvQztBQUcxQyxJQUFNLHlCQUF5QixDQUFDO0FBQUEsRUFDOUI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQW1DO0FBQ2pDLFFBQU0sRUFBRSxjQUFjLFdBQVcscUJBQXFCLGtCQUFrQixJQUFJO0FBQzVFLFFBQU0sRUFBRSx5QkFBeUIsNkJBQTZCLGlCQUFpQixJQUFJO0FBQ25GLFFBQU0sb0JBQ0osYUFBYSx1QkFBdUIsNEJBQTRCLE1BQU0sNEJBQTRCO0FBQ3BHLFFBQU0sdUJBQXVCLG9CQUN6QixLQUFLLHVDQUF1QyxrQkFBa0IsSUFDOUQsS0FBSyxnQ0FBZ0MsVUFBVTtBQUNuRCxRQUFNLGNBQ0osT0FBTyx1QkFBdUIsUUFBUSxPQUFPLHVCQUF1QixTQUNoRSxNQUNBLHNCQUFzQixPQUFPLGtCQUFrQjtBQUNyRCxRQUFNLHFCQUFxQixTQUFTLE9BQU8sWUFBWSxFQUFFLFlBQVk7QUFDckUsUUFBTSxtQkFBbUIsU0FBUyx3QkFBd0IsRUFBRSxZQUFZO0FBRXhFLFFBQU0scUJBQXFCLFNBQVMsT0FBTyxpQkFBaUI7QUFDNUQsUUFBTSx5QkFBeUIsQ0FBQyxnQkFBZ0Isc0JBQXNCO0FBQ3RFLFFBQU0sMEJBQTBCLHlCQUF5QixpQkFBaUI7QUFDMUUsUUFBTSx3QkFBd0IseUJBQXlCLDRCQUE0QjtBQUNuRixRQUFNLHdCQUNKLDJCQUEyQixPQUN2QiwwQkFDQSx5QkFBeUIsT0FDdkIsd0JBQXdCLDhCQUN4QjtBQUNSLFFBQU0sd0JBQXdCO0FBQUEsSUFDNUIseUJBQXlCLE9BQU8sd0JBQXdCLDhCQUE4QjtBQUFBLElBQ3RGO0FBQUEsTUFDRSx1QkFBdUI7QUFBQSxNQUN2Qix1QkFBdUI7QUFBQSxNQUN2QixhQUFhO0FBQUEsTUFDYixVQUFVO0FBQUEsSUFDWjtBQUFBLEVBQ0Y7QUFDQSxRQUFNLHdCQUF3QixPQUFPLE9BQU8sZ0JBQWdCLE1BQU0sSUFBSSxJQUFJO0FBQzFFLFFBQU0sc0JBQ0osMEJBQTBCLElBQ3RCLGlEQUNBO0FBQ04sUUFBTSwyQkFBMkIsMEJBQTBCLElBQUksZ0JBQWdCO0FBQy9FLFFBQU0seUJBQ0gsZ0NBQWdDLHFCQUFxQixLQUFLLEtBQUsscUJBQXFCLHdCQUF3QixHQUMxRyxRQUFRLG1DQUFtQyxFQUFFLEVBQzdDLEtBQUssRUFDTCxZQUFZLE1BQU0sMEJBQTBCLElBQUksV0FBVztBQUNoRSxRQUFNLDhCQUNKLENBQUMsQ0FBQyxTQUFTLDRCQUE0QixLQUFLLENBQUMsQ0FBQyxTQUFTLHdCQUF3QixLQUFLLENBQUMsQ0FBQyxTQUFTLDBCQUEwQjtBQUMzSCxRQUFNLCtCQUErQixTQUFTLHdCQUF3QixLQUFLLEtBQUssdUJBQXVCLEtBQUs7QUFDNUcsUUFBTSxpQ0FBaUMsU0FBUywwQkFBMEIsRUFDdkUsUUFBUSxxQkFBcUIsR0FBRyxFQUNoQyxRQUFRLFdBQVcsR0FBRyxFQUN0QixLQUFLLEtBQUssS0FBSyx1QkFBdUIsS0FBSztBQUM5QyxRQUFNLGtDQUFrQztBQUFBLElBQ3RDO0FBQUEsSUFDQTtBQUFBLElBQ0EsU0FBUyw0QkFBNEIsS0FBSztBQUFBLElBQzFDO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDQSxRQUFNLGdDQUFnQztBQUFBLElBQ3BDO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNBLFFBQU0sMEJBQTBCLDhCQUE4QixrQ0FBa0M7QUFFaEcsU0FDRSw2Q0FBQyxhQUFRLFdBQVUsbUdBQ2pCLHdEQUFDLFNBQUksV0FBVSx5Q0FDWjtBQUFBLEtBQUMsZUFDQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsT0FBTyxLQUFLLCtCQUErQixvQkFBb0I7QUFBQSxRQUMvRCxPQUFPLFNBQVMsT0FBTyxZQUFZLEtBQUs7QUFBQTtBQUFBLElBQzFDLElBQ0U7QUFBQSxJQUNILENBQUMsZUFBZSw2Q0FBQyxnQ0FBcUIsT0FBTyxLQUFLLDhCQUE4QixRQUFRLEdBQUcsT0FBTyxhQUFhLElBQUs7QUFBQSxJQUNwSCx5QkFDQztBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsT0FBTyxLQUFLLHFDQUFxQyxnQkFBZ0I7QUFBQSxRQUNqRSxPQUFPLHNCQUFzQjtBQUFBLFFBQzdCLFdBQVM7QUFBQTtBQUFBLElBQ1gsSUFDRTtBQUFBLElBQ0gsYUFBYSxzQkFDWiw4Q0FBQyxTQUFJLFdBQVUsNkJBQ2I7QUFBQSxtREFBQyxXQUFNLFdBQVUsNEJBQTRCLGVBQUssbUNBQW1DLGFBQWEsR0FBRTtBQUFBLE1BQ3BHO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxXQUFVO0FBQUEsVUFDVixPQUFPO0FBQUEsVUFDUCxVQUFVLENBQUMsVUFBVSx5QkFBeUIsTUFBTSxPQUFPLFNBQVMsRUFBRTtBQUFBLFVBQ3RFLGNBQVksS0FBSyxtQ0FBbUMsYUFBYTtBQUFBO0FBQUEsTUFDbkU7QUFBQSxPQUNGLElBRUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE9BQU8sS0FBSyxtQ0FBbUMsYUFBYTtBQUFBLFFBQzVELE9BQU8sU0FBUyxPQUFPLFdBQVcsS0FBSztBQUFBLFFBQ3ZDLFdBQVM7QUFBQTtBQUFBLElBQ1g7QUFBQSxJQUVELGFBQWEsc0JBQ1o7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE9BQU8sS0FBSywrQkFBK0IsU0FBUztBQUFBLFFBQ3BELGFBQWEsS0FBSyw0Q0FBNEMsWUFBWTtBQUFBLFFBQzFFLE9BQU87QUFBQSxRQUNQLFVBQVU7QUFBQSxRQUNWLFVBQVUsQ0FBQyxhQUFhLENBQUM7QUFBQSxRQUN6QixVQUFVLENBQUMsYUFBYSxDQUFDO0FBQUE7QUFBQSxJQUMzQixJQUNFLGVBQ0YsNkNBQUMsZ0NBQXFCLE9BQU8sS0FBSywrQkFBK0IsU0FBUyxHQUFHLE9BQU8sY0FBYyxJQUNoRztBQUFBLElBQ0o7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLGFBQWEsRUFBRSxXQUFXLG9CQUFvQjtBQUFBLFFBQzlDLGVBQWUsRUFBRSxtQkFBbUIseUJBQXlCLDZCQUE2QixpQkFBaUI7QUFBQSxRQUMzRztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQTtBQUFBLElBQ0Y7QUFBQSxJQUNDLENBQUMsZUFBZSw2Q0FBQyxnQ0FBcUIsT0FBTyxLQUFLLG1DQUFtQyxjQUFjLEdBQUcsT0FBTyxpQkFBaUIsSUFBSztBQUFBLEtBQ3RJLEdBQ0Y7QUFFSjtBQUVBLElBQU8saUNBQVE7OztBQ2xLWCxJQUFBQyxzQkFBQTtBQWZKLElBQU0sdUJBQXVCLENBQUM7QUFBQSxFQUM1QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQWlDO0FBQy9CLFFBQU0sZUFBZSxLQUFLLCtCQUErQixTQUFTO0FBRWxFLFNBQ0UsOENBQUMsYUFBUSxXQUFVLGFBQ2pCO0FBQUEsaURBQUMsaUNBQXNCLE9BQU8sWUFBWSxXQUFVLG1DQUFrQztBQUFBLElBRXJGLGFBQWEsV0FBVyxJQUN2Qiw2Q0FBQyxTQUFJLFdBQVUsK0JBQThCLG1CQUFpQixXQUFXLElBRXpFLDZDQUFDLFNBQUksS0FBSyxjQUFjLFdBQVUsZ0JBQy9CLHVCQUFhLElBQUksQ0FBQyxNQUFNLFVBQVU7QUFDakMsWUFBTSxTQUFTLFNBQVMsS0FBSyxTQUFTO0FBQ3RDLFlBQU0sY0FBYyxTQUFTLEtBQUssV0FBVztBQUM3QyxZQUFNLGFBQWEseUJBQXlCLEtBQUssVUFBVSxNQUFNLFlBQVk7QUFDN0UsWUFBTSxxQkFBcUIsU0FBUyxLQUFLLE1BQU07QUFDL0MsWUFBTSxZQUFZLFNBQVMsS0FBSyxNQUFNO0FBQ3RDLFlBQU0sa0JBQWtCLFlBQVksR0FBRyxZQUFZLEtBQUssU0FBUyxLQUFLO0FBQ3RFLFlBQU0sWUFBWSx1QkFBdUIsU0FBUyxLQUFLLFNBQVMsR0FBRyxVQUFVLGlCQUFpQixRQUFRLE9BQU87QUFDN0csWUFBTSxtQkFBbUIscUJBQ3ZCO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxPQUFNO0FBQUEsVUFDTixNQUFLO0FBQUEsVUFDTCxTQUFRO0FBQUEsVUFDUixhQUFhO0FBQUEsVUFDYixRQUFPO0FBQUEsVUFDUCxXQUFVO0FBQUEsVUFDVixlQUFZO0FBQUEsVUFFWjtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsZUFBYztBQUFBLGNBQ2QsZ0JBQWU7QUFBQSxjQUNmLEdBQUU7QUFBQTtBQUFBLFVBQ0o7QUFBQTtBQUFBLE1BQ0YsSUFDRTtBQUVKLGFBQ0UsNkNBQUMsU0FBNEYsV0FBVSxpQkFDckc7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDO0FBQUEsVUFDQSxPQUFPLGVBQWUsVUFBVTtBQUFBLFVBQ2hDO0FBQUEsVUFDQSxRQUFRLE1BQU0sV0FBVyxNQUFNO0FBQUEsVUFDL0IsVUFBVTtBQUFBLFVBQ1YsZ0JBQWU7QUFBQSxVQUNmLG1CQUFrQjtBQUFBLFVBQ2xCLFlBQVk7QUFBQSxVQUNaLHFCQUFvQjtBQUFBLFVBQ3BCLGFBQWEsc0JBQXNCO0FBQUE7QUFBQSxNQUNyQyxLQVpRLFVBQVUsR0FBRyxTQUFTLEtBQUssU0FBUyxDQUFDLElBQUksV0FBVyxJQUFJLFVBQVUsSUFBSSxTQUFTLEVBYXpGO0FBQUEsSUFFSixDQUFDLEdBQ0g7QUFBQSxJQUdGO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixjQUFjO0FBQUEsUUFDZCxRQUFRO0FBQUE7QUFBQSxJQUNWO0FBQUEsS0FDRjtBQUVKO0FBRUEsSUFBTywrQkFBUTs7O0FDdkZQLElBQUFDLHNCQUFBO0FBUlIsSUFBTSw4QkFBOEIsQ0FBQyxFQUFFLFNBQVMsTUFBTSxXQUFXLE9BQU8sY0FBYyxNQUF3QztBQUM1SCxNQUFJLFFBQVEsU0FBUyxHQUFHO0FBQ3RCLFdBQU87QUFBQSxFQUNUO0FBRUEsU0FDRSw2Q0FBQyw2QkFBa0IsV0FBVyxLQUFLLHVDQUF1Qyw4QkFBOEIsR0FDckcsa0JBQVEsSUFBSSxDQUFDLFdBQ1o7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUVDLE9BQU8sS0FBSyxPQUFPLFVBQVUsT0FBTyxRQUFRO0FBQUEsTUFDNUMsVUFBVSxRQUFRO0FBQUEsTUFDbEIsU0FBUyxNQUFNLGNBQWMsTUFBTTtBQUFBO0FBQUEsSUFIOUIsT0FBTztBQUFBLEVBSWQsQ0FDRCxHQUNIO0FBRUo7QUFFQSxJQUFPLHNDQUFROzs7QUNzRFgsSUFBQUMsc0JBQUE7QUFqQ0osSUFBTSw2QkFBNkIsQ0FBQztBQUFBLEVBQ2xDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUF1QztBQUNyQyxTQUNFLDhFQUNFO0FBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE1BQU0sTUFBTTtBQUFBLFFBQ1osT0FBTyxNQUFNO0FBQUEsUUFDYixTQUFTLE1BQU07QUFBQSxRQUNmLGFBQWE7QUFBQSxRQUNiLFlBQVk7QUFBQSxRQUNaLGFBQWE7QUFBQSxRQUNiLFlBQVksTUFBTTtBQUFBLFFBQ2xCLGFBQWEsTUFBTTtBQUFBLFFBQ25CLE1BQU0sUUFBUTtBQUFBLFFBQ2QsT0FBTztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBRUM7QUFBQTtBQUFBLElBQ0g7QUFBQSxJQUVBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxLQUFLO0FBQUEsUUFDTCxNQUFLO0FBQUEsUUFDTCxRQUFRO0FBQUEsUUFDUixTQUFRO0FBQUEsUUFDUixXQUFVO0FBQUEsUUFDVixVQUFVLENBQUMsVUFBVTtBQUNuQixnQkFBTSxPQUFPLE1BQU0sY0FBYyxRQUFRLENBQUMsS0FBSztBQUMvQyxnQkFBTSxjQUFjLFFBQVE7QUFDNUIsK0JBQXFCLElBQUk7QUFBQSxRQUMzQjtBQUFBO0FBQUEsSUFDRjtBQUFBLElBRUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLEtBQUs7QUFBQSxRQUNMLE1BQUs7QUFBQSxRQUNMLFFBQVE7QUFBQSxRQUNSLFdBQVU7QUFBQSxRQUNWLFVBQVUsQ0FBQyxVQUFVO0FBQ25CLGdCQUFNLE9BQU8sTUFBTSxjQUFjLFFBQVEsQ0FBQyxLQUFLO0FBQy9DLGdCQUFNLGNBQWMsUUFBUTtBQUM1QixnQ0FBc0IsSUFBSTtBQUFBLFFBQzVCO0FBQUE7QUFBQSxJQUNGO0FBQUEsSUFFQyxtQkFDQyw2Q0FBQyxTQUFJLFdBQVUscUZBQ2Isd0RBQUMsU0FBSSxXQUFVLDZGQUNiO0FBQUEsbURBQUMsUUFBRyxXQUFVLDRDQUNYLGVBQUssd0NBQXdDLGNBQWMsR0FDOUQ7QUFBQSxNQUNBLDZDQUFDLE9BQUUsV0FBVSwrQkFDVjtBQUFBLFFBQ0M7QUFBQSxRQUNBO0FBQUEsTUFDRixHQUNGO0FBQUEsTUFFQSw4Q0FBQyxTQUFJLFdBQVUsK0JBQ2I7QUFBQSxxREFBQyxZQUFPLE1BQUssVUFBUyxXQUFVLDJDQUEwQyxTQUFTLG9CQUNoRixlQUFLLHlDQUF5QyxnQkFBYSxHQUM5RDtBQUFBLFFBQ0EsNkNBQUMsWUFBTyxNQUFLLFVBQVMsV0FBVSwyQ0FBMEMsU0FBUyxxQkFDaEYsZUFBSywwQ0FBMEMsZUFBZSxHQUNqRTtBQUFBLFFBQ0EsNkNBQUMsWUFBTyxNQUFLLFVBQVMsV0FBVSwyQ0FBMEMsU0FBUyxxQkFDaEYsZUFBSyxpQkFBaUIsUUFBUSxHQUNqQztBQUFBLFNBQ0Y7QUFBQSxPQUNGLEdBQ0YsSUFDRTtBQUFBLElBRUo7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE1BQU07QUFBQSxRQUNOLE9BQU8sS0FBSywwQ0FBMEMsbUJBQW1CO0FBQUEsUUFDekUsU0FBUyw4QkFBOEIsS0FBSyxrQkFBa0IsU0FBUztBQUFBLFFBQ3ZFLFdBQVc7QUFBQSxRQUNYLFFBQVE7QUFBQTtBQUFBLElBQ1Y7QUFBQSxJQUVDLDBCQUNDO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxXQUNFLDBCQUNJLGdJQUNBO0FBQUEsUUFHTjtBQUFBLHVEQUFDLE9BQUcsbUNBQXdCO0FBQUEsVUFDM0IsdUJBQ0M7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFdBQ0UsMEJBQ0kseUhBQ0E7QUFBQSxjQUdMLHdCQUFjLG9CQUFvQjtBQUFBO0FBQUEsVUFDckMsSUFDRTtBQUFBLFVBQ0gscUJBQXFCLFNBQVMsSUFDN0I7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFdBQ0UsMEJBQ0ksMkZBQ0E7QUFBQSxjQUdMLCtCQUFxQixJQUFJLENBQUMsVUFDekIsNkNBQUMsT0FBcUMsYUFBRyxNQUFNLElBQUksS0FBSyxNQUFNLE9BQU8sTUFBN0QsR0FBRyxNQUFNLElBQUksSUFBSSxNQUFNLEVBQUUsRUFBdUMsQ0FDekU7QUFBQTtBQUFBLFVBQ0gsSUFDRTtBQUFBLFVBQ0osOENBQUMsU0FBSSxXQUFVLHdCQUNaO0FBQUEsb0NBQ0MsNkNBQUMsWUFBTyxNQUFLLFVBQVMsV0FBVSxzQ0FBcUMsU0FBUyxzQkFDM0UsZUFBSyx1Q0FBdUMsbUJBQW1CLEdBQ2xFLElBQ0U7QUFBQSxZQUNKLDZDQUFDLFlBQU8sTUFBSyxVQUFTLFdBQVUsc0NBQXFDLFNBQVMseUJBQzNFLGVBQUssZ0JBQWdCLE9BQU8sR0FDL0I7QUFBQSxhQUNGO0FBQUE7QUFBQTtBQUFBLElBQ0YsSUFDRTtBQUFBLEtBQ047QUFFSjtBQUVBLElBQU8scUNBQVE7OztBQ3ZOZixJQUFBQyxnQkFBOEQ7OztBQ1E5RCxJQUFNLGtEQUFrRDtBQUN4RCxJQUFNLDhDQUE4QyxJQUFJLEtBQUssS0FBSztBQU1sRSxJQUFNLGVBQWUsTUFBYztBQUNqQyxTQUFPLEdBQUcsK0NBQStDLElBQUkscUJBQXFCLENBQUM7QUFDckY7QUFHTyxJQUFNLDRDQUE0QyxDQUN2RCxVQUM0QztBQUM1QyxNQUFJLENBQUMsU0FBUyxPQUFPLFVBQVUsU0FBVSxRQUFPO0FBRWhELFFBQU0sVUFBVTtBQUNoQixRQUFNLFVBQVUsU0FBUyxRQUFRLE9BQU87QUFDeEMsTUFBSSxDQUFDLFFBQVMsUUFBTztBQUVyQixTQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFDRjtBQUdPLElBQU0sdUNBQXVDLENBQ2xELFlBQzRDO0FBQzVDLFFBQU0sU0FBUztBQUFBLElBQ2IseUJBQTJELGFBQWEsQ0FBQztBQUFBLEVBQzNFO0FBQ0EsTUFBSSxDQUFDLE9BQVEsUUFBTztBQUVwQixRQUFNLGNBQWMsU0FBUyxPQUFPO0FBQ3BDLE1BQUksQ0FBQyxZQUFhLFFBQU87QUFDekIsU0FBTyxPQUFPLFFBQVEsWUFBWSxNQUFNLFlBQVksWUFBWSxJQUFJLFNBQVM7QUFDL0U7QUFHTyxJQUFNLHdDQUF3QyxNQUFZO0FBQy9ELCtCQUE2QixhQUFhLENBQUM7QUFDN0M7QUFHTyxJQUFNLHVDQUF1QyxDQUNsRCxVQUM0QztBQUM1QyxRQUFNLGFBQWEsMENBQTBDLEtBQUs7QUFDbEUsTUFBSSxDQUFDLFlBQVk7QUFDZiwwQ0FBc0M7QUFDdEMsV0FBTztBQUFBLEVBQ1Q7QUFFQSwyQkFBeUIsYUFBYSxHQUFHLFlBQVksMkNBQTJDO0FBQ2hHLFNBQU87QUFDVDtBQUdPLElBQU0sMENBQTBDLENBQ3JELFlBQzRDO0FBQzVDLFFBQU0sU0FBUyxxQ0FBcUMsT0FBTztBQUMzRCxNQUFJLENBQUMsT0FBUSxRQUFPO0FBRXBCLHdDQUFzQztBQUN0QyxTQUFPO0FBQ1Q7OztBQzVFQSxJQUFBQyxnQkFBbUM7QUFXbkMsSUFBTSw4QkFBOEI7QUFrQ3BDLElBQU0sd0JBQXdCLENBQUMsUUFBK0Isa0JBQWtCLEdBQUc7QUFFbkYsSUFBTSxxQkFBcUIsQ0FBQyxNQUFxQixVQUFrQztBQUNqRixNQUFJLFFBQVEsUUFBUSxTQUFTLEtBQU0sUUFBTztBQUMxQyxTQUFPLEtBQUssSUFBSSxPQUFPLEtBQUssSUFBSTtBQUNsQztBQUdPLElBQU0saUNBQWlDLENBQUM7QUFBQSxFQUM3QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUEwQztBQUN4QyxRQUFNLHlCQUFxQjtBQUFBLElBQ3pCLENBQ0UsWUFDQSwwQkFDcUU7QUFDckUsWUFBTSxtQ0FBbUMsMEJBQTBCO0FBQ25FLFlBQU0scUJBQXFCO0FBQUEsUUFDekIsMEJBQTJCLHNCQUFzQixxQkFBcUIsS0FBTyxxQkFBcUI7QUFBQSxNQUNwRyxFQUNHLEtBQUssRUFDTCxZQUFZO0FBQ2YsWUFBTSx3QkFBd0IsT0FBTyxvQkFBb0IsRUFBRSxFQUFFLEtBQUs7QUFDbEUsWUFBTSxzQkFBc0IsT0FBTyxrQkFBa0IsRUFBRSxFQUFFLEtBQUs7QUFDOUQsWUFBTSw4QkFBOEI7QUFBQSxRQUNsQyx5QkFBeUIsMEJBQTBCO0FBQUEsTUFDckQsRUFBRSxLQUFLO0FBQ1AsWUFBTSw0QkFBNEI7QUFBQSxRQUNoQyw4QkFBK0Isc0JBQXNCLHFCQUFxQixLQUFPLHFCQUFxQjtBQUFBLE1BQ3hHO0FBQ0EsWUFBTSx5QkFBeUIsT0FBTyw0QkFBNEIsS0FBSyxFQUFFLEtBQUssRUFBRSxZQUFZLEtBQUs7QUFDakcsWUFBTSx1QkFDSix1QkFBdUIsdUJBQXVCLE1BQU0sdUJBQXVCO0FBQzdFLFlBQU0sdUJBQXVCLHVCQUF1Qix1QkFBdUIsTUFBTSxDQUFDO0FBQ2xGLFlBQU0scUJBQXFCLHNCQUFzQix5QkFBeUI7QUFDMUUsWUFBTSx1QkFBdUIsc0JBQXNCLHlCQUF5QjtBQUM1RSxZQUFNLHVCQUF1QixzQkFBc0Isa0JBQWtCO0FBQ3JFLFlBQU0sZ0NBQWdDLE9BQU8sdUJBQXVCO0FBQ3BFLFlBQU0sNkJBQTZCLE9BQU8sVUFBVSw2QkFBNkIsS0FBSyxpQ0FBaUM7QUFDdkgsWUFBTSxlQUFlLHNCQUFzQixRQUFRLHFCQUFxQjtBQUN4RSxZQUFNLDRCQUNKLHVCQUNBLENBQUMsZ0JBQ0QsaUJBQ0Msd0JBQXdCLFFBQVEsQ0FBQyxtQkFBbUIsb0JBQW9CLG9CQUFvQjtBQUUvRixZQUFNLHdCQUF3QixNQUFNO0FBQ2xDLFlBQUksQ0FBQyxvQkFBcUIsUUFBTztBQUNqQyxZQUFJLENBQUMsd0JBQXdCLENBQUMsYUFBYyxRQUFPO0FBQ25ELFlBQUksNEJBQTZCLFFBQU87QUFDeEMsWUFBSSxDQUFDLGdCQUFnQixDQUFDLDBCQUEyQixRQUFPO0FBQ3hELFlBQUksd0JBQXdCLEtBQU0sUUFBTztBQUN6QyxlQUFPLENBQUMsbUJBQW1CLG9CQUFvQixvQkFBb0I7QUFBQSxNQUNyRSxHQUFHO0FBQ0gsWUFBTSwyQkFBMkIsc0JBQzVCLHVCQUF1QixJQUFLLDZCQUE2QixnQ0FBZ0MsSUFDekYsNkJBQTZCLGdDQUFnQztBQUNsRSxZQUFNLDZCQUNKLGVBQWUsNkJBQTZCLE9BQU8sT0FBTyx5QkFBeUIsSUFBSTtBQUV6RixZQUFNLHVCQUF1QixzQkFDeEIsdUJBQXVCLDhCQUErQixlQUFlLE9BQU8sa0JBQWtCLElBQUksSUFDbEcsd0JBQXdCLHNCQUFzQjtBQUVuRCxVQUFJLGNBQWM7QUFDaEIsWUFBSSxDQUFDLHVCQUF1QjtBQUMxQixpQkFBTztBQUFBLFlBQ0wsT0FBTyxLQUFLLGdEQUFnRCwwQkFBMEI7QUFBQSxVQUN4RjtBQUFBLFFBQ0Y7QUFFQSxZQUFJLENBQUMsb0JBQW9CO0FBQ3ZCLGlCQUFPO0FBQUEsWUFDTCxPQUFPLEtBQUssNkNBQTZDLHVCQUF1QjtBQUFBLFVBQ2xGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFFQSxVQUFJLHdCQUF3QixDQUFDLGNBQWM7QUFDekMsZUFBTztBQUFBLFVBQ0wsT0FBTztBQUFBLFlBQ0w7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBRUEsYUFBTztBQUFBLFFBQ0wsU0FBUztBQUFBLFVBQ1AsYUFBYTtBQUFBLFVBQ2IsY0FBYztBQUFBLFVBQ2QsVUFBVTtBQUFBLFVBQ1YsUUFBUSx1QkFBdUI7QUFBQSxVQUMvQixvQkFBb0I7QUFBQSxVQUNwQixrQkFBa0I7QUFBQTtBQUFBLFVBRWxCLG1CQUFtQixtQ0FDZiw4QkFDQywrQkFBK0I7QUFBQSxRQUN0QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsUUFBTSxtQkFBZSwyQkFBWSxZQUFZO0FBQzNDLFFBQUksUUFBUSxDQUFDLFVBQVcsUUFBTztBQUMvQixRQUFJLENBQUMsZ0JBQWdCLGFBQWMsUUFBTztBQUUxQyxVQUFNLGFBQWEsZUFBZSxtQkFBbUI7QUFDckQsUUFBSSxDQUFDLFlBQVk7QUFDZiwwQkFBb0I7QUFDcEIsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLGdCQUFnQixtQkFBbUI7QUFDekMsUUFBSSxXQUFXLGVBQWU7QUFDNUIsb0JBQWMsY0FBYyxLQUFLO0FBQ2pDLGdCQUFVLGNBQWMsS0FBSztBQUM3QixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sU0FBUyxNQUFNLHVCQUF1QjtBQUFBLE1BQzFDLGFBQWEsZUFDVCxLQUFLLGtCQUFrQixTQUFTLElBQ2hDLEtBQUssaUNBQWlDLDJCQUEyQjtBQUFBLE1BQ3JFLHNCQUFzQixLQUFLLG9DQUFvQyxlQUFlO0FBQUEsTUFDOUU7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsUUFBUSxZQUFZO0FBQ2xCLFlBQUksY0FBYztBQUNoQixnQkFBTSxnQkFBZ0IsY0FBYztBQUNwQyxnQkFBTSxVQUFxQztBQUFBLFlBQ3pDLE1BQU07QUFBQSxZQUNOLHNCQUFzQjtBQUFBLFlBQ3RCLGFBQWEsY0FBYztBQUFBLFlBQzNCLGNBQWMsY0FBYztBQUFBLFlBQzVCLFVBQVUsY0FBYztBQUFBLFlBQ3hCLFFBQVEsY0FBYztBQUFBLFlBQ3RCLG9CQUFvQjtBQUFBLFlBQ3BCLGtCQUFrQixjQUFjO0FBQUEsWUFDaEMsT0FBTyxDQUFDO0FBQUEsVUFDVjtBQUVBLGdCQUFNQyxZQUFXLE1BQU0sbUJBQW1CLE9BQU87QUFFakQsY0FBSSxDQUFDQSxVQUFTLFNBQVM7QUFDckIsa0JBQU0sSUFBSSxNQUFNQSxVQUFTLFdBQVcsS0FBSyxxQkFBcUIsaUJBQWlCLENBQUM7QUFBQSxVQUNsRjtBQUdBLGdCQUFNLGNBQWNBLFdBQVU7QUFDOUIsZ0JBQU0saUJBQWlCLE9BQU8sYUFBYSxnQkFBZ0IsYUFBYSxnQkFBZ0IsRUFBRSxFQUFFLEtBQUs7QUFDakcsY0FBSSxDQUFDLGdCQUFnQjtBQUNuQixrQkFBTSxJQUFJLE1BQU0sS0FBSyxxQkFBcUIsaUJBQWlCLENBQUM7QUFBQSxVQUM5RDtBQUVBLDBCQUFnQixjQUFjO0FBQzlCLG9CQUFVLEtBQUssZUFBZSxNQUFNLENBQUM7QUFDckMsaUJBQU87QUFBQSxRQUNUO0FBRUEsY0FBTSxXQUFXLE1BQU0seUJBQXlCLFNBQVMsY0FBYyxPQUFPO0FBRTlFLFlBQUksQ0FBQyxTQUFTLFNBQVM7QUFDckIsZ0JBQU0sSUFBSSxNQUFNLFNBQVMsV0FBVyxLQUFLLHFDQUFxQyxnQkFBZ0IsQ0FBQztBQUFBLFFBQ2pHO0FBRUEsa0JBQVUsS0FBSyxnQ0FBZ0MsdUJBQXVCLENBQUM7QUFDdkUscUJBQWEsS0FBSztBQUNsQixlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0YsQ0FBQztBQUVELFdBQU8sT0FBTztBQUFBLEVBQ2hCLEdBQUc7QUFBQSxJQUNEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSw2QkFBeUI7QUFBQSxJQUM3QixPQUFPLFlBQW9CLGFBQXFCLDBCQUEwQztBQUN4RixVQUFJLFFBQVEsZ0JBQWdCLENBQUMsUUFBUyxRQUFPO0FBQzdDLFVBQUksQ0FBQyxxQkFBcUI7QUFDeEIsNEJBQW9CO0FBQ3BCLGVBQU87QUFBQSxNQUNUO0FBRUEsWUFBTSxnQkFBZ0IsbUJBQW1CLFlBQVkscUJBQXFCO0FBQzFFLFVBQUksV0FBVyxlQUFlO0FBQzVCLHNCQUFjLGNBQWMsS0FBSztBQUNqQyxrQkFBVSxjQUFjLEtBQUs7QUFDN0IsZUFBTztBQUFBLE1BQ1Q7QUFFQSxZQUFNLFNBQVMsTUFBTSx1QkFBdUI7QUFBQSxRQUMxQztBQUFBLFFBQ0Esc0JBQXNCLEtBQUssb0NBQW9DLGVBQWU7QUFBQSxRQUM5RTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxRQUFRLFlBQVk7QUFDbEIsZ0JBQU0sV0FBVyxNQUFNLHlCQUF5QixTQUFTLGNBQWMsT0FBTztBQUU5RSxjQUFJLENBQUMsU0FBUyxTQUFTO0FBQ3JCLGtCQUFNLElBQUksTUFBTSxTQUFTLFdBQVcsS0FBSyxxQ0FBcUMsZ0JBQWdCLENBQUM7QUFBQSxVQUNqRztBQUVBLG9CQUFVLEtBQUssZ0NBQWdDLHVCQUF1QixDQUFDO0FBQ3ZFLHVCQUFhLEtBQUs7QUFDbEIsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRixDQUFDO0FBRUQsYUFBTyxPQUFPO0FBQUEsSUFDaEI7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLG1CQUFlLDJCQUFZLFlBQVk7QUFDM0MsUUFBSSxLQUFNLFFBQU87QUFDakIsUUFBSSxlQUFnQixRQUFPO0FBQzNCLFFBQUksQ0FBQyxrQkFBa0I7QUFDckIsMEJBQW9CO0FBQ3BCLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxTQUFTLE1BQU0sdUJBQXVCO0FBQUEsTUFDMUMsYUFBYSxLQUFLLGlDQUFpQywyQkFBMkI7QUFBQSxNQUM5RSxzQkFBc0IsS0FBSyxvQ0FBb0MsZUFBZTtBQUFBLE1BQzlFO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLFFBQVEsWUFBWTtBQUNsQixjQUFNLFdBQVcsTUFBTSxtQkFBbUIsT0FBTztBQUVqRCxZQUFJLENBQUMsU0FBUyxTQUFTO0FBQ3JCLGdCQUFNLElBQUksTUFBTSxTQUFTLFdBQVcsS0FBSyxxQ0FBcUMsZ0JBQWdCLENBQUM7QUFBQSxRQUNqRztBQUVBLGtCQUFVLEtBQUssZ0NBQWdDLHVCQUF1QixDQUFDO0FBQ3ZFLGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRixDQUFDO0FBRUQsV0FBTyxPQUFPO0FBQUEsRUFDaEIsR0FBRyxDQUFDLE1BQU0sa0JBQWtCLGdCQUFnQixTQUFTLGVBQWUsV0FBVyxPQUFPLENBQUM7QUFFdkYsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjs7O0FDMVVPLElBQU0scUNBQXFDLENBQUM7QUFBQSxFQUNqRDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsYUFBYTtBQUFBLEVBQ2I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsbUJBQW1CO0FBQUEsRUFDbkI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQThDO0FBQzVDLDhCQUE0QjtBQUFBLElBQzFCLGVBQWU7QUFBQSxJQUNmLEtBQUs7QUFBQSxNQUNILFlBQVk7QUFBQSxNQUNaLFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixXQUFXO0FBQUEsTUFDWCxhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxrQ0FBa0M7QUFBQSxJQUNsQztBQUFBLElBQ0EsV0FBVztBQUFBLElBQ1gsU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1g7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsWUFBWTtBQUFBLElBQ1o7QUFBQSxJQUNBLGtCQUFrQixLQUFLLDBDQUEwQyxjQUFjO0FBQUEsSUFDL0Usb0JBQW9CLEtBQUsseUNBQXlDLDhCQUE4QjtBQUFBLElBQ2hHLGlCQUFpQixLQUFLLGVBQWUsTUFBTTtBQUFBLElBQzNDLG9CQUFvQixLQUFLLDBDQUEwQyxzQkFBc0I7QUFBQSxJQUN6RixzQkFBc0IsS0FBSyx5Q0FBeUMsMkNBQTJDO0FBQUEsSUFDL0csbUJBQW1CLEtBQUssaUJBQWlCLFFBQVE7QUFBQSxJQUNqRDtBQUFBLElBQ0EsaUJBQWlCLG9CQUFvQixNQUFNLHFCQUFxQix1QkFBdUI7QUFBQSxJQUN2RjtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFDSDs7O0FDbkdBLElBQUFDLGdCQUEwRDtBQXlCMUQsSUFBTSw0QkFBNEI7QUFDbEMsSUFBTSxpQ0FBaUM7QUFDdkMsSUFBTSwrQkFBK0I7QUFDckMsSUFBTSwwQkFBMEI7QUFDaEMsSUFBTSxzQkFBc0I7QUFHNUIsSUFBTSwrQkFBK0IsQ0FBQyxVQUEwQjtBQUM5RCxTQUFPLHlCQUF5QixPQUFPO0FBQUEsSUFDckMsdUJBQXVCO0FBQUEsSUFDdkIsdUJBQXVCO0FBQUEsSUFDdkIsYUFBYTtBQUFBLElBQ2IsVUFBVTtBQUFBLEVBQ1osQ0FBQztBQUNIO0FBR0EsSUFBTSxvQ0FBb0MsNkJBQTZCLDhCQUE4QjtBQUVyRyxJQUFNLHlCQUF5QixNQUEwQjtBQUN2RCxTQUFPO0FBQUEsSUFDTCxjQUFjO0FBQUEsSUFDZCxhQUFhO0FBQUEsSUFDYixRQUFRO0FBQUEsSUFDUixjQUFjO0FBQUEsSUFDZCxhQUFhO0FBQUEsSUFDYixvQkFBb0I7QUFBQSxJQUNwQixrQkFBa0I7QUFBQSxJQUNsQixhQUFhO0FBQUEsSUFDYixVQUFVLE9BQU8sOEJBQThCO0FBQUEsRUFDakQ7QUFDRjtBQUVBLElBQU0seUJBQXlCLENBQUMsVUFBMkI7QUFDekQsTUFBSSxDQUFDLE1BQU8sUUFBTztBQUNuQixRQUFNLFNBQVMseUJBQXlCLEtBQUs7QUFDN0MsTUFBSSxXQUFXLEtBQU0sUUFBTztBQUM1QixTQUFPLEtBQUssSUFBSSxNQUFNLElBQUk7QUFDNUI7QUFnQk8sSUFBTSw2QkFBNkIsQ0FBQztBQUFBLEVBQ3pDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBc0M7QUFDcEMsUUFBTSxDQUFDLFFBQVEsU0FBUyxRQUFJLHdCQUFvQyxJQUFJO0FBQ3BFLFFBQU0sQ0FBQyxPQUFPLFFBQVEsUUFBSSx3QkFBNkIsQ0FBQyxDQUFDO0FBQ3pELFFBQU0sQ0FBQyxVQUFVLFdBQVcsUUFBSSx3QkFBUyxDQUFDO0FBQzFDLFFBQU0sQ0FBQyxXQUFXLFlBQVksUUFBSSx3QkFBUyxLQUFLO0FBQ2hELFFBQU0sQ0FBQyxjQUFjLGVBQWUsUUFBSSx3QkFBUyxFQUFFO0FBQ25ELFFBQU0sQ0FBQyxNQUFNLE9BQU8sUUFBSSx3QkFBUyxLQUFLO0FBQ3RDLFFBQU0sQ0FBQyxRQUFRLFNBQVMsUUFBSSx3QkFBUyxFQUFFO0FBQ3ZDLFFBQU0sQ0FBQyxXQUFXLFlBQVksUUFBSSx3QkFBUyxLQUFLO0FBQ2hELFFBQU0sQ0FBQyxZQUFZLGFBQWEsUUFBSSx3QkFBUyxFQUFFO0FBQy9DLFFBQU0sQ0FBQyxrQkFBa0IsbUJBQW1CLFFBQUksd0JBQVMsRUFBRTtBQUMzRCxRQUFNLENBQUMsZ0JBQWdCLGlCQUFpQixRQUFJLHdCQUFTLEVBQUU7QUFDdkQsUUFBTSxDQUFDLG1CQUFtQixvQkFBb0IsUUFBSSx3QkFBUyxFQUFFO0FBQzdELFFBQU0sQ0FBQyxtQkFBbUIsb0JBQW9CLFFBQUksd0JBQVMsRUFBRTtBQUM3RCxRQUFNLENBQUMsd0JBQXdCLHlCQUF5QixRQUFJLHdCQUFTLEVBQUU7QUFDdkUsUUFBTSxDQUFDLHFCQUFxQixzQkFBc0IsUUFBSSx3QkFBUyxFQUFFO0FBQ2pFLFFBQU0sQ0FBQyx1QkFBdUIsd0JBQXdCLFFBQUksd0JBQVMsS0FBSztBQUN4RSxRQUFNLENBQUMscUJBQXFCLHNCQUFzQixRQUFJLHdCQUFTLEVBQUU7QUFDakUsUUFBTSxDQUFDLDRCQUE0Qiw2QkFBNkIsUUFBSSx3QkFBUyxLQUFLO0FBQ2xGLFFBQU0sQ0FBQywyQkFBMkIsNEJBQTRCLFFBQUksd0JBQVMsRUFBRTtBQUM3RSxRQUFNLENBQUMsOEJBQThCLCtCQUErQixRQUFJLHdCQUFTLEVBQUU7QUFDbkYsUUFBTSxDQUFDLDBCQUEwQiwyQkFBMkIsUUFBSSx3QkFBUyxFQUFFO0FBQzNFLFFBQU0sQ0FBQyw0QkFBNEIsNkJBQTZCLFFBQUksd0JBQVMsRUFBRTtBQUUvRSxRQUFNLDZCQUF5QiwyQkFBWSxDQUFDLGVBQTBDO0FBQ3BGLHdCQUFvQixTQUFTLFlBQVksV0FBVyxDQUFDO0FBQ3JELHNCQUFrQixTQUFTLFlBQVksTUFBTSxDQUFDO0FBQzlDLHlCQUFxQixTQUFTLFlBQVksWUFBWSxDQUFDO0FBQ3ZEO0FBQUEsTUFDRSx5QkFBeUIsWUFBWSxVQUFVO0FBQUEsUUFDN0MsdUJBQXVCO0FBQUEsUUFDdkIsdUJBQXVCO0FBQUEsUUFDdkIsYUFBYTtBQUFBLFFBQ2IsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBLElBQ0g7QUFDQSw4QkFBMEIsU0FBUyxZQUFZLGlCQUFpQixDQUFDO0FBQUEsRUFDbkUsR0FBRyxDQUFDLENBQUM7QUFFTCwrQkFBVSxNQUFNO0FBQ2QsVUFBTSxhQUFhLFlBQVk7QUFDN0IsVUFBSSxDQUFDLFdBQVc7QUFDZCxvQkFBWTtBQUNaO0FBQUEsTUFDRjtBQUVBLFVBQUksY0FBYztBQUNoQixZQUFJLENBQUMsa0JBQWtCO0FBQ3JCLHNCQUFZO0FBQ1o7QUFBQSxRQUNGO0FBRUEsY0FBTSxjQUFjLHVCQUF1QjtBQUMzQyxrQkFBVSxXQUFXO0FBQ3JCLGlCQUFTLENBQUMsQ0FBQztBQUNYLG9CQUFZLENBQUM7QUFDYixxQkFBYSxJQUFJO0FBQ2pCLCtCQUF1QixXQUFXO0FBQ2xDLGtCQUFVLEVBQUU7QUFDWix3QkFBZ0IsRUFBRTtBQUNsQjtBQUFBLE1BQ0Y7QUFFQSxVQUFJLENBQUMsU0FBUztBQUNaLHdCQUFnQixLQUFLLDBCQUEwQiw4QkFBOEIsQ0FBQztBQUM5RSxrQkFBVSxJQUFJO0FBQ2QsaUJBQVMsQ0FBQyxDQUFDO0FBQ1g7QUFBQSxNQUNGO0FBRUEsbUJBQWEsSUFBSTtBQUNqQixzQkFBZ0IsRUFBRTtBQUVsQixVQUFJO0FBQ0YsY0FBTSxXQUFXLE1BQU0sd0JBQXdCLFNBQVM7QUFBQSxVQUN0RCx5QkFBeUI7QUFBQSxRQUMzQixDQUFDO0FBRUQsWUFBSSxVQUFVLFlBQVksT0FBTztBQUMvQiwwQkFBZ0IsVUFBVSxXQUFXLEtBQUssMkJBQTJCLHNDQUFzQyxDQUFDO0FBQzVHLG9CQUFVLElBQUk7QUFDZCxtQkFBUyxDQUFDLENBQUM7QUFDWDtBQUFBLFFBQ0Y7QUFFQSxjQUFNLFNBQVMsTUFBTSxRQUFRLFVBQVUsS0FBSyxJQUFJLFNBQVMsUUFBUSxDQUFDO0FBQ2xFLGNBQU0sZ0JBQ0osT0FBTyxLQUFLLENBQUMsVUFBVSxTQUFTLE9BQU8sWUFBWSxFQUFFLFlBQVksTUFBTSxRQUFRLEtBQUssRUFBRSxZQUFZLENBQUMsS0FBSyxPQUFPLENBQUM7QUFFbEgsWUFBSSxDQUFDLGVBQWU7QUFDbEIsMEJBQWdCLEtBQUssMEJBQTBCLDhCQUE4QixDQUFDO0FBQzlFLG9CQUFVLElBQUk7QUFDZCxtQkFBUyxDQUFDLENBQUM7QUFDWDtBQUFBLFFBQ0Y7QUFFQSxjQUFNLGFBQWEsc0JBQXNCLGFBQWE7QUFDdEQsY0FBTSxhQUFhLE1BQU0sUUFBUSxjQUFjLEtBQUssSUFBSSxjQUFjLFFBQVEsQ0FBQyxHQUFHO0FBQUEsVUFBSSxDQUFDLFVBQ3JGLG9CQUFvQixLQUFLO0FBQUEsUUFDM0I7QUFDQSxrQkFBVSxVQUFVO0FBQ3BCLGlCQUFTLFNBQVM7QUFBQSxNQUNwQixTQUFTLE9BQU87QUFDZCxZQUFJLGlCQUFpQixpQkFBaUIsTUFBTSxXQUFXLEtBQUs7QUFDMUQsc0JBQVk7QUFDWjtBQUFBLFFBQ0Y7QUFFQTtBQUFBLFVBQ0UsaUJBQWlCLFFBQVEsTUFBTSxVQUFVLEtBQUssMkJBQTJCLHNDQUFzQztBQUFBLFFBQ2pIO0FBQ0Esa0JBQVUsSUFBSTtBQUNkLGlCQUFTLENBQUMsQ0FBQztBQUFBLE1BQ2IsVUFBRTtBQUNBLHFCQUFhLEtBQUs7QUFBQSxNQUNwQjtBQUFBLElBQ0Y7QUFFQSxTQUFLLFdBQVc7QUFBQSxFQUNsQixHQUFHLENBQUMsa0JBQWtCLFdBQVcsd0JBQXdCLGNBQWMsYUFBYSxPQUFPLENBQUM7QUFFNUYsK0JBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxVQUFVLFVBQVc7QUFDMUIsMkJBQXVCLE1BQU07QUFBQSxFQUMvQixHQUFHLENBQUMsUUFBUSx3QkFBd0IsU0FBUyxDQUFDO0FBRTlDLCtCQUFVLE1BQU07QUFDZCxRQUFJLENBQUMsVUFBVztBQUNoQixRQUFJLGNBQWM7QUFDbEIsVUFBTSxhQUFhLElBQUksZ0JBQWdCO0FBRXZDLFVBQU0sMEJBQTBCLFlBQVk7QUFDMUMsVUFBSTtBQUNGLGNBQU0sT0FBTyxNQUFNLG1DQUFtQztBQUFBLFVBQ3BELHlCQUF5QjtBQUFBLFVBQ3pCLFFBQVEsV0FBVztBQUFBLFFBQ3JCLENBQUM7QUFDRCxZQUFJLFlBQWE7QUFDakIsK0JBQXVCLFNBQVMsSUFBSSxFQUFFLFlBQVksQ0FBQztBQUFBLE1BQ3JELFNBQVMsT0FBTztBQUNkLFlBQUksaUJBQWlCLGdCQUFnQixNQUFNLFNBQVMsYUFBYztBQUFBLE1BQ3BFO0FBQUEsSUFDRjtBQUVBLFNBQUssd0JBQXdCO0FBQzdCLFdBQU8sTUFBTTtBQUNYLG9CQUFjO0FBQ2QsaUJBQVcsTUFBTTtBQUFBLElBQ25CO0FBQUEsRUFDRixHQUFHLENBQUMsU0FBUyxDQUFDO0FBRWQsUUFBTSx1QkFBbUIsdUJBQVEsTUFBTSxRQUFRLFdBQVcsQ0FBQyxNQUFNLFNBQVMsQ0FBQztBQUMzRSwrQkFBVSxNQUFNO0FBQ2QsOEJBQTBCLGdCQUFnQjtBQUMxQyxXQUFPLE1BQU07QUFDWCxrQ0FBNEI7QUFBQSxJQUM5QjtBQUFBLEVBQ0YsR0FBRyxDQUFDLGdCQUFnQixDQUFDO0FBRXJCLFFBQU0sZUFBZSxTQUFTLFFBQVEsTUFBTTtBQUM1QyxRQUFNLGFBQWEsT0FBTyxRQUFRLHVCQUF1QixXQUFXLE9BQU8scUJBQXFCO0FBQ2hHLFFBQU0sa0JBQWtCLGVBQWU7QUFDdkMsUUFBTSxzQkFBc0IsZUFBZTtBQUMzQyxRQUFNLHVCQUF1QixtQkFBbUIsUUFBUSxPQUFPO0FBQy9ELFFBQU0sY0FBYyx1QkFBdUI7QUFDM0MsUUFBTSxzQkFBc0IsNkJBQTZCO0FBQUEsSUFDdkQ7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLG1CQUFtQixRQUFRO0FBQUEsSUFDM0I7QUFBQSxFQUNGLENBQUM7QUFDRCxRQUFNLG1CQUFlLHVCQUFRLE1BQU07QUFDakMsUUFBSSxjQUFjO0FBQ2hCLGFBQU87QUFBQSxRQUNMLGlCQUFpQjtBQUFBLFFBQ2pCLFNBQVM7QUFBQSxRQUNULGdCQUFnQjtBQUFBLFFBQ2hCLGVBQWUsQ0FBQztBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUVBLFdBQU8sZ0NBQWdDO0FBQUEsTUFDckM7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsUUFBUTtBQUFBLElBQ1YsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLHFCQUFxQixjQUFjLHFCQUFxQixhQUFhLFVBQVUsQ0FBQztBQUNwRixRQUFNLDZCQUE2QixnQkFBaUIsQ0FBQyx1QkFBdUIsYUFBYSxvQkFBb0I7QUFDN0csUUFBTSw4QkFBOEIsQ0FBQyxnQkFBZ0IsYUFBYSxvQkFBb0I7QUFDdEYsUUFBTSxvQkFBcUIsZ0JBQWdCLG9CQUFxQiw4QkFBOEI7QUFDOUYsUUFBTSx5QkFBeUIsQ0FBQyxnQkFBZ0IsYUFBYSxvQkFBb0I7QUFDakYsUUFBTSxnQkFBZ0IsbUJBQW1CO0FBQ3pDLFFBQU0sV0FBVyxNQUFNLFNBQVM7QUFDaEMsUUFBTSxvQkFBb0IseUJBQXlCLFNBQVMsUUFBUSxRQUFRLEdBQUc7QUFBQSxJQUM3RSx1QkFBdUI7QUFBQSxJQUN2Qix1QkFBdUI7QUFBQSxJQUN2QixhQUFhO0FBQUEsSUFDYixVQUFVO0FBQUEsRUFDWixDQUFDO0FBQ0QsUUFBTSx1QkFBbUIsdUJBQVEsTUFBTSx1QkFBdUIsaUJBQWlCLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztBQUNyRyxRQUFNLDhCQUEwQix1QkFBUSxNQUFNLGtCQUFrQixLQUFLLEVBQUUsWUFBWSxHQUFHLENBQUMsaUJBQWlCLENBQUM7QUFDekcsUUFBTSxnQ0FBNEIsdUJBQVEsTUFBTSxTQUFTLG1CQUFtQixFQUFFLFlBQVksR0FBRyxDQUFDLG1CQUFtQixDQUFDO0FBQ2xILFFBQU0sMkJBQTJCLDZCQUE2QjtBQUM5RCxRQUFNLGVBQVcsdUJBQVEsTUFBTTtBQUM3QixRQUFJLE9BQU8sYUFBYSxZQUFhLFFBQU87QUFDNUMsV0FBTyxTQUFTLFNBQVMsaUJBQWlCLElBQUksS0FBSztBQUFBLEVBQ3JELEdBQUcsQ0FBQyxDQUFDO0FBQ0wsUUFBTSx1QkFBbUIsdUJBQVEsTUFBTTtBQUNyQyxVQUFNLGFBQWEsaUJBQWlCLFNBQVMsUUFBUSxXQUFXLENBQUM7QUFDakUsUUFBSSxXQUFZLFFBQU8sVUFBVSxVQUFVO0FBQzNDLFdBQU8sVUFBVSxvQkFBSSxLQUFLLENBQUM7QUFBQSxFQUM3QixHQUFHLENBQUMsUUFBUSxXQUFXLENBQUM7QUFDeEIsUUFBTSx1QkFDSixhQUFhLDhCQUE4Qiw0QkFBNEIsTUFBTSw0QkFBNEI7QUFDM0csUUFBTSxnQ0FDSix3QkFBd0IsQ0FBQyxrQkFBa0IsS0FBSyxJQUM1QztBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsRUFDRixJQUNBO0FBRU4sUUFBTSwwQkFBMEI7QUFDaEMsUUFBTSw4QkFBOEIsYUFBYSw4QkFBOEIsWUFBWTtBQUUzRiwrQkFBVSxNQUFNO0FBQ2QsUUFBSSxjQUFjO0FBQ2xCLFFBQUksZUFBcUQ7QUFDekQsUUFBSSx5QkFBaUQ7QUFFckQsVUFBTSx3QkFBd0IsTUFBTTtBQUNsQyxVQUFJLGNBQWM7QUFDaEIscUJBQWEsWUFBWTtBQUN6Qix1QkFBZTtBQUFBLE1BQ2pCO0FBQ0EsVUFBSSx3QkFBd0I7QUFDMUIsK0JBQXVCLE1BQU07QUFDN0IsaUNBQXlCO0FBQUEsTUFDM0I7QUFBQSxJQUNGO0FBRUEsUUFBSSxDQUFDLGFBQWEsQ0FBQyw4QkFBOEIsNkJBQTZCO0FBQzVFLCtCQUF5QixLQUFLO0FBQzlCLDZCQUF1QixFQUFFO0FBQ3pCLG9DQUE4QixLQUFLO0FBQ25DLG1DQUE2QixFQUFFO0FBQy9CLHNDQUFnQyxFQUFFO0FBQ2xDLGtDQUE0QixFQUFFO0FBQzlCLG9DQUE4QixFQUFFO0FBQ2hDLGFBQU8sTUFBTTtBQUNYLDhCQUFzQjtBQUFBLE1BQ3hCO0FBQUEsSUFDRjtBQUVBLFFBQUksQ0FBQywyQkFBMkIsQ0FBQywwQkFBMEI7QUFDekQsK0JBQXlCLEtBQUs7QUFDOUIsNkJBQXVCLEVBQUU7QUFDekIsb0NBQThCLEtBQUs7QUFDbkMsbUNBQTZCLEVBQUU7QUFDL0Isc0NBQWdDLEVBQUU7QUFDbEMsa0NBQTRCLEVBQUU7QUFDOUIsb0NBQThCLEVBQUU7QUFDaEMsYUFBTyxNQUFNO0FBQ1gsOEJBQXNCO0FBQUEsTUFDeEI7QUFBQSxJQUNGO0FBRUEsUUFBSSw0QkFBNEIsMEJBQTBCO0FBQ3hELDJCQUFxQixpQ0FBaUM7QUFDdEQsbUNBQTZCLGlDQUFpQztBQUM5RCwrQkFBeUIsS0FBSztBQUM5Qiw2QkFBdUIsRUFBRTtBQUN6QixvQ0FBOEIsS0FBSztBQUNuQyxzQ0FBZ0MsRUFBRTtBQUNsQyxrQ0FBNEIsRUFBRTtBQUM5QixvQ0FBOEIsRUFBRTtBQUNoQyxhQUFPLE1BQU07QUFDWCw4QkFBc0I7QUFBQSxNQUN4QjtBQUFBLElBQ0Y7QUFFQSxtQkFBZSxXQUFXLFlBQVk7QUFDcEMsK0JBQXlCLElBQUksZ0JBQWdCO0FBQzdDLCtCQUF5QixJQUFJO0FBQzdCLDZCQUF1QixFQUFFO0FBQ3pCLG9DQUE4QixLQUFLO0FBQ25DLG1DQUE2QixFQUFFO0FBQy9CLHNDQUFnQyxFQUFFO0FBQ2xDLGtDQUE0QixFQUFFO0FBQzlCLG9DQUE4QixFQUFFO0FBRWhDLFVBQUk7QUFDRixjQUFNLFdBQVcsTUFBTTtBQUFBLFVBQ3JCO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsWUFDRSx5QkFBeUI7QUFBQSxZQUN6QixRQUFRLHVCQUF1QjtBQUFBLFVBQ2pDO0FBQUEsUUFDRjtBQUVBLFlBQUksWUFBYTtBQUVqQixZQUFJLENBQUMsU0FBUyxXQUFXLENBQUMsU0FBUyxRQUFRLENBQUMsT0FBTyxTQUFTLE9BQU8sU0FBUyxLQUFLLElBQUksQ0FBQyxHQUFHO0FBQ3ZGLDBDQUFnQyxFQUFFO0FBQ2xDLHNDQUE0QixFQUFFO0FBQzlCLHdDQUE4QixFQUFFO0FBQ2hDO0FBQUEsWUFDRSxTQUFTLFNBQVMsT0FBTyxLQUFLLEtBQUssMENBQTBDLHVDQUF1QztBQUFBLFVBQ3RIO0FBQ0Esd0NBQThCLElBQUk7QUFDbEM7QUFBQSxRQUNGO0FBSUEsY0FBTSwwQkFBMEIsT0FBTyxTQUFTLEtBQUssSUFBSTtBQUN6RCxjQUFNLGlDQUFpQywwQkFBMEI7QUFDakUsY0FBTSx3QkFBd0IsNkJBQTZCLDhCQUE4QjtBQUN6RixjQUFNLHVCQUF1Qiw2QkFBNkIsdUJBQXVCO0FBQ2pGLHFDQUE2QixxQkFBcUI7QUFDbEQsd0NBQWdDLG9CQUFvQjtBQUNwRCw2QkFBcUIscUJBQXFCO0FBRTFDLGNBQU0sb0JBQW9CLFNBQVMsU0FBUyxLQUFLLElBQUksS0FBSztBQUMxRCxjQUFNLFNBQVMsU0FBUyxTQUFTLEtBQUssTUFBTTtBQUM1QyxvQ0FBNEIsaUJBQWlCO0FBQzdDLHNDQUE4QixNQUFNO0FBQ3BDLGNBQU0sZ0JBQWdCLGdDQUFnQyxDQUFDLEtBQUssS0FBSyxrREFBa0QsY0FBYztBQUNqSSxjQUFNLG9CQUFvQix5QkFBeUIsbUJBQW1CLFFBQVEsS0FBSztBQUNuRixjQUFNLDBCQUEwQixTQUFTLEdBQUcsYUFBYSxJQUFJLGlCQUFpQixLQUFLLE1BQU0sTUFBTSxHQUFHLGFBQWEsSUFBSSxpQkFBaUI7QUFDcEksK0JBQXVCLHVCQUF1QixHQUFHLHVCQUF1QixNQUFNLG9CQUFvQixLQUFLLHVCQUF1QjtBQUM5SCxzQ0FBOEIsS0FBSztBQUFBLE1BQ3JDLFNBQVMsT0FBTztBQUNkLFlBQUksWUFBYTtBQUNqQixZQUFJLGlCQUFpQixnQkFBZ0IsTUFBTSxTQUFTLGFBQWM7QUFFbEUsWUFBSSxpQkFBaUIsZUFBZTtBQUNsQyxjQUFJLE1BQU0sV0FBVyxLQUFLO0FBQ3hCLHlDQUE2QixFQUFFO0FBQy9CLDRDQUFnQyxFQUFFO0FBQ2xDLHdDQUE0QixFQUFFO0FBQzlCLDBDQUE4QixFQUFFO0FBQ2hDLG1DQUF1QixLQUFLLHVDQUF1QyxxQ0FBcUMsQ0FBQztBQUN6RywwQ0FBOEIsSUFBSTtBQUNsQztBQUFBLFVBQ0Y7QUFFQSxjQUFJLE1BQU0sV0FBVyxPQUFPLE1BQU0sV0FBVyxLQUFLO0FBQ2hELHlDQUE2QixFQUFFO0FBQy9CLDRDQUFnQyxFQUFFO0FBQ2xDLHdDQUE0QixFQUFFO0FBQzlCLDBDQUE4QixFQUFFO0FBQ2hDO0FBQUEsY0FDRSxTQUFTLE1BQU0sT0FBTyxLQUFLLEtBQUssMENBQTBDLHVDQUF1QztBQUFBLFlBQ25IO0FBQ0EsMENBQThCLElBQUk7QUFDbEM7QUFBQSxVQUNGO0FBRUEsdUNBQTZCLEVBQUU7QUFDL0IsMENBQWdDLEVBQUU7QUFDbEMsc0NBQTRCLEVBQUU7QUFDOUIsd0NBQThCLEVBQUU7QUFDaEM7QUFBQSxZQUNFLFNBQVMsTUFBTSxPQUFPLEtBQUssS0FBSywwQ0FBMEMsdUNBQXVDO0FBQUEsVUFDbkg7QUFDQSx3Q0FBOEIsSUFBSTtBQUNsQztBQUFBLFFBQ0Y7QUFFQSxxQ0FBNkIsRUFBRTtBQUMvQix3Q0FBZ0MsRUFBRTtBQUNsQyxvQ0FBNEIsRUFBRTtBQUM5QixzQ0FBOEIsRUFBRTtBQUNoQywrQkFBdUIsS0FBSywwQ0FBMEMsdUNBQXVDLENBQUM7QUFDOUcsc0NBQThCLElBQUk7QUFBQSxNQUNwQyxVQUFFO0FBQ0EsWUFBSSxDQUFDLGFBQWE7QUFDaEIsbUNBQXlCLEtBQUs7QUFBQSxRQUNoQztBQUFBLE1BQ0Y7QUFBQSxJQUNGLEdBQUcseUJBQXlCO0FBRTVCLFdBQU8sTUFBTTtBQUNYLG9CQUFjO0FBQ2QsNEJBQXNCO0FBQUEsSUFDeEI7QUFBQSxFQUNGLEdBQUc7QUFBQSxJQUNEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sdUJBQW1CLDJCQUFZLE1BQU07QUFDekMsUUFBSSxnQkFBZ0IsYUFBYSxDQUFDLFFBQVE7QUFDeEM7QUFBQSxJQUNGO0FBRUEsUUFBSSxDQUFDLG1CQUFtQjtBQUN0QixrQkFBWTtBQUNaO0FBQUEsSUFDRjtBQUVBLGtCQUFjLEVBQUU7QUFDaEIsaUJBQWEsSUFBSTtBQUNqQiwyQkFBdUIsTUFBTTtBQUM3QixjQUFVLEtBQUssdUNBQXVDLGlCQUFpQixDQUFDO0FBQUEsRUFDMUUsR0FBRyxDQUFDLG1CQUFtQixRQUFRLHdCQUF3QixjQUFjLFdBQVcsV0FBVyxDQUFDO0FBRTVGLFFBQU0sdUJBQW1CLDJCQUFZLE1BQU07QUFDekMsUUFBSSxjQUFjO0FBQ2hCLDJCQUFxQix5QkFBeUI7QUFBQSxRQUM1QyxpQkFBaUI7QUFBQSxNQUNuQixDQUFDO0FBQ0Q7QUFBQSxJQUNGO0FBRUEsUUFBSSxDQUFDLFVBQVc7QUFFaEIsaUJBQWEsS0FBSztBQUNsQixrQkFBYyxFQUFFO0FBQ2hCLDJCQUF1QixNQUFNO0FBQzdCLGNBQVUsS0FBSyxpQkFBaUIsUUFBUSxDQUFDO0FBQUEsRUFDM0MsR0FBRyxDQUFDLFFBQVEsd0JBQXdCLGNBQWMsU0FBUyxDQUFDO0FBRzVELFFBQU0sZ0NBQTRCLDJCQUFZLE1BQU07QUFDbEQsUUFBSSxDQUFDLGtCQUFrQjtBQUNyQixrQkFBWTtBQUNaO0FBQUEsSUFDRjtBQUVBLFFBQUksY0FBYztBQUNoQjtBQUFBLElBQ0Y7QUFFQSx5QkFBcUIsMENBQTBDO0FBQUEsTUFDN0QsaUJBQWlCO0FBQUEsSUFDbkIsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLGtCQUFrQixjQUFjLFdBQVcsV0FBVyxDQUFDO0FBRzNELFFBQU0sK0JBQTJCLDJCQUFZLE1BQU07QUFDakQsUUFBSSxDQUFDLFdBQVcsQ0FBQyx3QkFBd0I7QUFDdkMsa0JBQVk7QUFDWjtBQUFBLElBQ0Y7QUFFQSxRQUFJLGNBQWM7QUFDaEI7QUFBQSxJQUNGO0FBRUEsVUFBTSxZQUFZLCtDQUErQyxtQkFBbUIsT0FBTyxDQUFDO0FBQzVGLHlCQUFxQixXQUFXO0FBQUEsTUFDOUIsaUJBQWlCO0FBQUEsSUFDbkIsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLHdCQUF3QixjQUFjLFdBQVcsYUFBYSxPQUFPLENBQUM7QUFHMUUsUUFBTSwyQkFBdUI7QUFBQSxJQUMzQixDQUFDLFdBQTJCO0FBQzFCLFVBQUksQ0FBQyxXQUFXLENBQUMsd0JBQXdCO0FBQ3ZDLG9CQUFZO0FBQ1o7QUFBQSxNQUNGO0FBRUEsVUFBSSxjQUFjO0FBQ2hCO0FBQUEsTUFDRjtBQUVBLFlBQU0sUUFBUSxJQUFJLGdCQUFnQjtBQUFBLFFBQ2hDO0FBQUEsUUFDQSxjQUFjO0FBQUEsTUFDaEIsQ0FBQztBQUNELDJCQUFxQixtQkFBbUIsTUFBTSxTQUFTLENBQUMsSUFBSTtBQUFBLFFBQzFELGlCQUFpQjtBQUFBLE1BQ25CLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxDQUFDLHdCQUF3QixjQUFjLFdBQVcsYUFBYSxPQUFPO0FBQUEsRUFDeEU7QUFFQSxRQUFNLGlDQUE2QiwyQkFBWSxNQUFNO0FBQ25ELHlCQUFxQixLQUFLO0FBQUEsRUFDNUIsR0FBRyxDQUFDLG9CQUFvQixDQUFDO0FBRXpCLFFBQU0sK0JBQTJCLDJCQUFZLE1BQU07QUFDakQseUJBQXFCLE1BQU07QUFBQSxFQUM3QixHQUFHLENBQUMsb0JBQW9CLENBQUM7QUFFekIsUUFBTSw2QkFBeUIsMkJBQVksQ0FBQyxtQkFBMkI7QUFDckUsVUFBTSxxQkFBcUIsU0FBUyxjQUFjO0FBQ2xELFFBQUksQ0FBQyxtQkFBb0I7QUFFekIsVUFBTSxZQUFZLDJDQUEyQyxtQkFBbUIsa0JBQWtCLENBQUM7QUFDbkcseUJBQXFCLFNBQVM7QUFBQSxFQUNoQyxHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sMkJBQXVCO0FBQUEsSUFDM0IsQ0FDRSxXQUNBLFlBS0c7QUFDSCxZQUFNLGFBQWEsU0FBUyxTQUFTO0FBQ3JDLFlBQU0sY0FBYyxTQUFTLE9BQU87QUFDcEMsVUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFhO0FBRWpDLFlBQU0sV0FBVyxTQUFTLFNBQVMsU0FBUyxTQUFTO0FBQ3JELFlBQU0sWUFBWSwrQ0FBK0MsbUJBQW1CLFdBQVcsQ0FBQyxjQUFjLG1CQUFtQixVQUFVLENBQUMsR0FBRyxXQUFXLFNBQVMsUUFBUSxLQUFLLEVBQUU7QUFDbEwsMkJBQXFCLFdBQVc7QUFBQSxRQUM5QixpQkFBaUIsU0FBUyxtQkFBbUI7QUFBQSxRQUM3QyxpQkFBaUIsU0FBUyxtQkFBbUI7QUFBQSxNQUMvQyxDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsQ0FBQyxPQUFPO0FBQUEsRUFDVjtBQUVBLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsNkJBQTZCO0FBQUEsSUFDN0I7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBSmxvQkUsSUFBQUMsc0JBQUE7QUFqQkYsSUFBTSxrQkFBa0I7QUFDeEIsSUFBTSxvQ0FBb0M7QUFFMUMsSUFBTSxhQUFhLENBQUssT0FBWSxNQUFjLGFBQTBCO0FBQzFFLE1BQUksQ0FBQyxNQUFNLE9BQVEsUUFBTyxDQUFDO0FBQzNCLFFBQU0sV0FBVyxLQUFLLElBQUksR0FBRyxJQUFJO0FBQ2pDLFFBQU0sU0FBUyxXQUFXLEtBQUs7QUFDL0IsU0FBTyxNQUFNLE1BQU0sT0FBTyxRQUFRLFFBQVE7QUFDNUM7QUFHQSxJQUFNLHlCQUF5QixDQUFDLFVBQTRCO0FBQzFELFFBQU0sU0FBUyxPQUFPLEtBQUs7QUFDM0IsU0FBTyxPQUFPLFNBQVMsTUFBTSxLQUFLLFNBQVM7QUFDN0M7QUFFQSxJQUFNLGdCQUFnQixNQUNwQiw4Q0FBQyxTQUFJLFNBQVEsYUFBWSxNQUFLLFFBQU8sUUFBTyxnQkFBZSxhQUFhLEtBQUssZUFBWSxRQUFPLFdBQVUsVUFDeEc7QUFBQSwrQ0FBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsK0hBQThIO0FBQUEsRUFDbkwsNkNBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLHdDQUF1QztBQUFBLEVBQzVGLDZDQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSw2QkFBNEI7QUFBQSxFQUNqRiw2Q0FBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsWUFBVztBQUFBLEVBQ2hFLDZDQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSxZQUFXO0FBQUEsR0FDbEU7QUFHRixJQUFNLGlCQUFpQixNQUNyQiw2Q0FBQyxTQUFJLFNBQVEsYUFBWSxNQUFLLFFBQU8sUUFBTyxnQkFBZSxhQUFhLEtBQUssZUFBWSxRQUFPLFdBQVUsVUFDeEcsdURBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLDZLQUE0SyxHQUNuTztBQUdGLElBQU0sY0FBYyxNQUNsQiw4Q0FBQyxTQUFJLFNBQVEsYUFBWSxNQUFLLFFBQU8sUUFBTyxnQkFBZSxhQUFhLEtBQUssZUFBWSxRQUFPLFdBQVUsVUFDeEc7QUFBQSwrQ0FBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsMEtBQXlLO0FBQUEsRUFDOU4sNkNBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLCtEQUE4RDtBQUFBLEVBQ25ILDZDQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSxXQUFVO0FBQUEsR0FDakU7QUFJSyxJQUFNLDBCQUEwQixNQUFNO0FBQzNDLDBCQUF3QjtBQUFBLElBQ3RCLE9BQU8sU0FBUyxPQUFPLGlCQUFpQjtBQUFBLElBQ3hDLFVBQVUsU0FBUyxPQUFPLGlCQUFpQjtBQUFBLElBQzNDLFNBQVMsU0FBUyxPQUFPLGdCQUFnQjtBQUFBLEVBQzNDLENBQUM7QUFDSDtBQUdPLElBQU0sc0NBQXNDLE1BQU07QUFDdkQsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsSUFBSSxlQUFlO0FBQ25CLFFBQU0sWUFBWSxVQUFVLHFCQUFxQixNQUFNO0FBQ3ZELFFBQU0sbUJBQW1CLFVBQVUscUJBQXFCLEtBQUs7QUFDN0QsUUFBTSxVQUFVLFNBQVMsT0FBTyxvQkFBb0I7QUFDcEQsUUFBTSxZQUFZLFNBQVMsT0FBTyxzQkFBc0IsRUFBRSxZQUFZO0FBQ3RFLFFBQU0sZUFBZSxjQUFjO0FBQ25DLFFBQU0saUNBQWlDLDZCQUE2QjtBQUFBLElBQ2xFO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLG1CQUFtQjtBQUFBLElBQ25CO0FBQUEsRUFDRixDQUFDO0FBQ0QsUUFBTSxxQ0FBcUMsb0JBQW9CLENBQUM7QUFDaEUsUUFBTSx1QkFBbUIsc0JBQThCLElBQUk7QUFDM0QsUUFBTSx3QkFBb0Isc0JBQU8sRUFBRTtBQUNuQyxRQUFNLHFCQUFpQixzQkFBZ0MsSUFBSTtBQUMzRCxRQUFNLHNCQUFrQixzQkFBZ0MsSUFBSTtBQUM1RCxRQUFNLENBQUMsMEJBQTBCLDJCQUEyQixRQUFJLHdCQUFTLEtBQUs7QUFDOUUsUUFBTSxDQUFDLHlCQUF5QiwwQkFBMEIsUUFBSSx3QkFBUyxFQUFFO0FBQ3pFLFFBQU0sQ0FBQyxrQ0FBa0MsbUNBQW1DLFFBQUksd0JBQVMsS0FBSztBQUM5RixRQUFNLGlDQUE2QixzQkFBTyxFQUFFO0FBRTVDLFFBQU0sdUJBQW1CO0FBQUEsSUFDdkIsT0FBTztBQUFBLE1BQ0wsT0FBTyxLQUFLLHNCQUFzQixPQUFPO0FBQUEsTUFDekMsTUFBTSxLQUFLLHFCQUFxQixVQUFVO0FBQUEsTUFDMUMsTUFBTSxLQUFLLHFCQUFxQixNQUFNO0FBQUEsTUFDdEMsTUFBTSxLQUFLLHFCQUFxQixNQUFNO0FBQUEsSUFDeEM7QUFBQSxJQUNBLENBQUM7QUFBQSxFQUNIO0FBRUEsUUFBTSxjQUFjLDJCQUEyQjtBQUFBLElBQzdDO0FBQUEsSUFDQSxrQkFBa0I7QUFBQSxJQUNsQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsYUFBYTtBQUFBLEVBQ2YsQ0FBQztBQUVELFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixJQUFJO0FBRUosUUFBTSxpQ0FBaUMsb0JBQW9CLENBQUM7QUFDNUQsUUFBTSxpQ0FBaUMsYUFBYTtBQUNwRCxRQUFNLHNCQUFzQixhQUFhLGNBQWMsU0FBUztBQUNoRSxRQUFNLGlCQUFpQixhQUFhLG9CQUFvQjtBQUN4RCxRQUFNLG9CQUFvQixPQUFPLFFBQVEsdUJBQXVCLFdBQVcsT0FBTyxxQkFBcUI7QUFDdkcsUUFBTSwwQkFDSixzQkFBc0IscUNBQXFDLENBQUM7QUFDOUQsUUFBTSxtQkFBbUIsQ0FBQyxpQkFBaUIsa0JBQWtCLDJCQUEyQixjQUFjO0FBQ3RHLFFBQU0seUJBQXlCLDZCQUE2QixnQkFBZ0IsQ0FBQyxDQUFDO0FBQzlFLFFBQU0sRUFBRSwrQkFBK0IsSUFBSSw0QkFBNEI7QUFFdkUsUUFBTSxFQUFFLE9BQU8sYUFBYSxjQUFjLGNBQWMsSUFBSSxpQkFBaUI7QUFBQSxJQUMzRSxvQkFBb0IsS0FBSyxlQUFlLElBQUk7QUFBQSxJQUM1QyxtQkFBbUIsS0FBSyxjQUFjLFFBQVE7QUFBQSxFQUNoRCxDQUFDO0FBRUQsUUFBTSxrQ0FBOEIsMkJBQVksTUFBTTtBQUNwRCwrQkFBMkIsVUFBVTtBQUNyQywrQkFBMkIsRUFBRTtBQUM3Qix3Q0FBb0MsS0FBSztBQUFBLEVBQzNDLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSx5QkFBcUIsMkJBQVksTUFBTTtBQUMzQyxnQ0FBNEI7QUFDNUIsaUJBQWE7QUFBQSxFQUNmLEdBQUcsQ0FBQyxjQUFjLDJCQUEyQixDQUFDO0FBRTlDLFFBQU0seUJBQXFCLDJCQUFZLFlBQVk7QUFDakQsa0JBQWMsRUFBRTtBQUNoQixVQUFNLGNBQWM7QUFBQSxNQUNsQjtBQUFBLE1BQ0EsU0FBUyxDQUFDLFFBQVE7QUFDaEIsc0JBQWMsR0FBRztBQUNqQixrQkFBVSxHQUFHO0FBQUEsTUFDZjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLE1BQU0sZUFBZSxlQUFlLFNBQVMsQ0FBQztBQUVsRCxRQUFNLG1CQUFtQixLQUFLLGtCQUFrQixTQUFTO0FBQ3pELFFBQU0sa0JBQWtCLE1BQU0sY0FBYyxLQUFLLGNBQWMsUUFBUTtBQUN2RSxRQUFNLG1CQUFtQixPQUNyQixtQkFDQSxDQUFDLFFBQVEsYUFDUCxLQUFLLGFBQWEsSUFBSSxJQUNyQixNQUFNLGVBQWUsS0FBSyxlQUFlLElBQUk7QUFFcEQsUUFBTSwrQkFBMkIsMkJBQVksTUFBTTtBQUNqRCxRQUFJLENBQUMsUUFBUSxZQUFZO0FBQ3ZCLHlCQUFtQjtBQUNuQjtBQUFBLElBQ0Y7QUFFQSxTQUFLLG1CQUFtQjtBQUFBLEVBQzFCLEdBQUcsQ0FBQyxNQUFNLG9CQUFvQixvQkFBb0IsVUFBVSxDQUFDO0FBRTdELFFBQU0sbUJBQWUsdUJBQVEsTUFBTSxXQUFXLE9BQU8sVUFBVSxlQUFlLEdBQUcsQ0FBQyxVQUFVLEtBQUssQ0FBQztBQUNsRyxRQUFNLGlCQUFpQixLQUFLLE1BQU0sTUFBTSxVQUFVLEtBQUssZUFBZTtBQUN0RSxRQUFNLHNCQUFrQjtBQUFBLElBQ3RCLE1BQU0seUJBQXlCLFFBQVEsZUFBZSxNQUFNLFNBQVMsUUFBUSxZQUFZLENBQUM7QUFBQSxJQUMxRixDQUFDLFFBQVEsY0FBYyxRQUFRLFdBQVc7QUFBQSxFQUM1QztBQUNBLFFBQU0seUJBQXlCLE1BQU0sU0FBUyxLQUFLLHVCQUF1QixRQUFRLFdBQVc7QUFDN0YsUUFBTSwyQkFBMkIsQ0FBQztBQUVsQyxRQUFNLEVBQUUsY0FBYyx3QkFBd0IsYUFBYSxJQUFJLCtCQUErQjtBQUFBLElBQzVGO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBQ2hCO0FBQUEsSUFDQTtBQUFBLElBQ0Esb0JBQW9CLFNBQVMsUUFBUSxZQUFZO0FBQUEsSUFDakQsb0JBQW9CLFNBQVMsUUFBUSxRQUFRO0FBQUEsSUFDN0Msa0JBQWtCO0FBQUEsSUFDbEIsZ0JBQWdCO0FBQUEsSUFDaEIsa0JBQWtCO0FBQUEsSUFDbEIscUJBQXFCO0FBQUEsSUFDckI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSwyQkFBMkIsUUFBUTtBQUFBLElBQ25DLHlCQUF5QixRQUFRO0FBQUEsSUFDakM7QUFBQSxJQUNBLGlCQUFpQixDQUFDLG1CQUFtQjtBQUNuQyx3QkFBa0IsVUFBVSxTQUFTLGNBQWM7QUFBQSxJQUNyRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCxRQUFNLDJCQUF1QjtBQUFBLElBQzNCLE9BQU8sY0FBc0I7QUFDM0IsWUFBTSxhQUFhLFNBQVMsU0FBUztBQUNyQyxVQUFJLENBQUMsY0FBYyxRQUFRLDBCQUEwQjtBQUNuRDtBQUFBLE1BQ0Y7QUFFQSxVQUFJLGFBQWEsNEJBQTRCO0FBQzNDLGNBQU0sS0FBSyxNQUFNLGFBQWE7QUFDOUIsWUFBSSxDQUFDLElBQUk7QUFDUDtBQUFBLFFBQ0Y7QUFFQSw2QkFBcUIsWUFBWTtBQUFBLFVBQy9CLE1BQU07QUFBQSxVQUNOLGlCQUFpQjtBQUFBLFVBQ2pCLGlCQUFpQjtBQUFBLFFBQ25CLENBQUM7QUFDRDtBQUFBLE1BQ0Y7QUFFQSwyQkFBcUIsVUFBVTtBQUFBLElBQ2pDO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsUUFBTSx3QkFBb0IsMkJBQVksTUFBTTtBQUMxQyxRQUFJLGNBQWM7QUFDaEIsWUFBTSxpQkFBaUIsU0FBUyxrQkFBa0IsT0FBTztBQUN6RCxVQUFJLENBQUMsZUFBZ0I7QUFDckIsMkNBQXFDO0FBQUEsUUFDbkMsU0FBUztBQUFBLE1BQ1gsQ0FBQztBQUNELGtDQUE0QixJQUFJO0FBQ2hDLDZCQUF1QixjQUFjO0FBQ3JDO0FBQUEsSUFDRjtBQUVBLHNCQUFrQjtBQUFBLEVBQ3BCLEdBQUcsQ0FBQyxjQUFjLHNCQUFzQixDQUFDO0FBRXpDLFFBQU0sOEJBQTBCO0FBQUEsSUFDOUIsQ0FBQyxXQUF1RTtBQUN0RSxVQUFJLENBQUMsd0JBQXdCO0FBQzNCO0FBQUEsTUFDRjtBQUVBLFlBQU0sY0FBYyxLQUFLLE9BQU8sVUFBVSxPQUFPLFFBQVE7QUFDekQsWUFBTSxxQkFDSixRQUFRLHVCQUF1QixRQUFRLFFBQVEsdUJBQXVCLFNBQ2xFLEtBQUssaUJBQWlCLFNBQVMsSUFDL0Isc0JBQXNCLE9BQU8sa0JBQWtCO0FBQ3JELFlBQU0sa0JBQWtCLHNCQUFzQixPQUFPLFVBQVU7QUFDL0QsWUFBTSxvQkFBb0I7QUFBQSxRQUN4QjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0YsRUFBRSxRQUFRLFFBQVEsSUFBSTtBQUN0QixZQUFNLGlCQUFpQixTQUFTLFFBQVEsaUJBQWlCO0FBQ3pELGlDQUEyQixVQUFVO0FBQ3JDLGlDQUEyQixjQUFjO0FBQ3pDLDBDQUFvQyxJQUFJO0FBRXhDLGtCQUFZO0FBQUEsUUFDVixPQUFPO0FBQUEsUUFDUCxTQUFTO0FBQUEsUUFDVCxhQUFhO0FBQUEsUUFDYixXQUFXLFlBQVk7QUFDckIsZ0JBQU0sS0FBSyxNQUFNO0FBQUEsWUFDZixPQUFPO0FBQUEsWUFDUDtBQUFBLFlBQ0EsMkJBQTJCO0FBQUEsVUFDN0I7QUFDQSxjQUFJLElBQUk7QUFDTiwyQ0FBK0I7QUFDL0Isd0NBQTRCO0FBQzVCLHlCQUFhO0FBQ2IsOEJBQWtCO0FBQUEsVUFDcEI7QUFDQSxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEscUNBQW1DO0FBQUEsSUFDakMsTUFBTSxRQUFRO0FBQUEsSUFDZCxXQUFXLE1BQU07QUFBQSxJQUNqQjtBQUFBLElBQ0E7QUFBQSxJQUNBLFlBQVk7QUFBQSxJQUNaLFVBQVU7QUFBQSxJQUNWLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLElBQ2xCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsZUFBZTtBQUFBLElBQ2YsaUJBQWlCLE1BQU07QUFDckIscUNBQStCO0FBQy9CLDJCQUFxQix1QkFBdUI7QUFBQSxJQUM5QztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSwyQkFBdUIsMkJBQVksQ0FBQyxXQUErQjtBQUN2RSxVQUFNLE9BQU87QUFDYixRQUFJLENBQUMsUUFBUSxPQUFPLEtBQUssWUFBWSxXQUFZLFFBQU87QUFDeEQsVUFBTSxPQUFPLEtBQUssUUFBcUIsMkJBQTJCO0FBQ2xFLFFBQUksQ0FBQyxLQUFNLFFBQU87QUFDbEIsUUFBSSxDQUFDLGlCQUFpQixTQUFTLFNBQVMsSUFBSSxFQUFHLFFBQU87QUFDdEQsV0FBTztBQUFBLEVBQ1QsR0FBRyxDQUFDLENBQUM7QUFFTCx5QkFBdUI7QUFBQSxJQUNyQixjQUFjO0FBQUEsSUFDZDtBQUFBLElBQ0EsT0FBTztBQUFBLElBQ1A7QUFBQSxFQUNGLENBQUM7QUFFRCxRQUFNLGtCQUFrQiwrQkFBK0I7QUFBQSxJQUNyRCxTQUFTLFNBQVMsUUFBUSxnQkFBZ0IsT0FBTztBQUFBLElBQ2pELFdBQVc7QUFBQSxJQUNYLGNBQWMsU0FBUyxRQUFRLFlBQVk7QUFBQSxJQUMzQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsYUFBYTtBQUFBLElBQ2hEO0FBQUEsSUFDQSxlQUFlLENBQUM7QUFBQSxJQUNoQixhQUFhO0FBQUEsSUFDYixhQUFhO0FBQUEsSUFDYixhQUFhLENBQUMsV0FBVztBQUN2QixZQUFNLGdCQUFnQixTQUFTLFFBQVEsTUFBTTtBQUM3QyxVQUFJLENBQUMsZUFBZTtBQUNsQiwwQkFBa0I7QUFDbEI7QUFBQSxNQUNGO0FBRUEsVUFBSSxRQUFRLGtCQUFrQixNQUFNO0FBQ2xDLDBCQUFrQjtBQUNsQjtBQUFBLE1BQ0Y7QUFFQSxZQUFNLGlCQUFpQixTQUFTLFFBQVEsZ0JBQWdCLE9BQU87QUFDL0QsWUFBTSxRQUFRLElBQUksZ0JBQWdCO0FBQUEsUUFDaEMsUUFBUTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sUUFBUTtBQUFBLE1BQ1YsQ0FBQztBQUNELFVBQUksZ0JBQWdCO0FBQ2xCLHVDQUErQjtBQUFBLFVBQzdCLFFBQVE7QUFBQSxVQUNSLFFBQVE7QUFBQSxVQUNSLFNBQVM7QUFBQSxRQUNYLENBQUM7QUFDRCxjQUFNLElBQUksV0FBVyxjQUFjO0FBQUEsTUFDckM7QUFDQSwyQkFBcUIsd0JBQXdCLE1BQU0sU0FBUyxDQUFDLEVBQUU7QUFBQSxJQUNqRTtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sbUJBQWU7QUFBQSxJQUNuQixNQUFNO0FBQUEsTUFDSjtBQUFBLFFBQ0UsSUFBSTtBQUFBLFFBQ0osT0FBTyxLQUFLLCtCQUErQixjQUFjO0FBQUEsUUFDekQsTUFBTSw2Q0FBQyxpQkFBYztBQUFBLFFBQ3JCLFNBQVMsZ0JBQWdCO0FBQUEsTUFDM0I7QUFBQSxNQUNBO0FBQUEsUUFDRSxJQUFJO0FBQUEsUUFDSixPQUFPLEtBQUssZ0NBQWdDLGlCQUFpQjtBQUFBLFFBQzdELE1BQU0sNkNBQUMsa0JBQWU7QUFBQSxRQUN0QixTQUFTO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxRQUNFLElBQUk7QUFBQSxRQUNKLE9BQU8sS0FBSyw2QkFBNkIsYUFBYTtBQUFBLFFBQ3RELE1BQU0sNkNBQUMsZUFBWTtBQUFBLFFBQ25CLFNBQVM7QUFBQSxNQUNYO0FBQUEsSUFDRjtBQUFBLElBQ0EsQ0FBQywwQkFBMEIsMEJBQTBCLGdCQUFnQixnQkFBZ0I7QUFBQSxFQUN2RjtBQUVBLFFBQU0sc0JBQ0osQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsZ0JBQWdCLGFBQWEsY0FBYyxTQUFTO0FBQ25ILFFBQU0sVUFBVSxDQUFDLGdCQUFnQixhQUFhO0FBQzlDLFFBQU0sMEJBQTBCLFNBQVMsUUFBUSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsU0FBUztBQUNwRixRQUFNLG9CQUF1QywwQkFBMEIsU0FBUztBQUNoRixRQUFNLFlBQVksbUNBQ2hCLDhDQUFDLFNBQUksV0FBVSxlQUNiO0FBQUEsaURBQUMsV0FBTSxXQUFVLDRCQUNkLGVBQUsscUNBQXFDLGdCQUFnQixHQUM3RDtBQUFBLElBQ0E7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFdBQVU7QUFBQSxRQUNWLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLFVBQVUsQ0FBQyxVQUFVO0FBQ25CLGdCQUFNLFlBQVksTUFBTSxPQUFPLFNBQVM7QUFDeEMscUNBQTJCLFVBQVU7QUFDckMscUNBQTJCLFNBQVM7QUFBQSxRQUN0QztBQUFBLFFBQ0EsY0FBWSxLQUFLLHFDQUFxQyxnQkFBZ0I7QUFBQTtBQUFBLElBQ3hFO0FBQUEsS0FDRixJQUNFO0FBRUosU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxzQkFBc0I7QUFBQSxJQUN0QjtBQUFBLElBQ0E7QUFBQSxJQUNBLGNBQWM7QUFBQSxFQUNoQjtBQUNGOzs7QVIvYU0sSUFBQUMsc0JBQUE7QUEzSE4sSUFBTSxvQ0FBb0M7QUFDMUMsSUFBTSwwQkFBMEI7QUFFaEMsSUFBTSxnQ0FBZ0MsTUFBTTtBQUMxQyxRQUFNLGFBQWEsb0NBQW9DO0FBQ3ZELFFBQU0sRUFBRSxnQkFBZ0IsSUFBSSxlQUFlO0FBQzNDLFFBQU0sRUFBRSxpQkFBaUIsZ0JBQWdCLElBQUksNEJBQTRCO0FBQ3pFLFFBQU0sMEJBQTBCLGNBQUFDLFFBQU0sT0FBTyxFQUFFO0FBRS9DLGdCQUFBQSxRQUFNLFVBQVUsTUFBTTtBQUNwQixVQUFNLGlCQUFpQix3Q0FBd0MsV0FBVyxPQUFPO0FBQ2pGLDRCQUF3QixVQUFVLGdCQUFnQixXQUFXO0FBQUEsRUFDL0QsR0FBRyxDQUFDLFdBQVcsT0FBTyxDQUFDO0FBRXZCLFFBQU0saUNBQWlDLGNBQUFBLFFBQU0sWUFBWSxNQUFNO0FBQzdELFVBQU0saUJBQWlCLFNBQVMsd0JBQXdCLE9BQU87QUFDL0QsUUFBSSxDQUFDLGVBQWdCLFFBQU87QUFFNUIsVUFBTSxRQUFRLFdBQVcsb0JBQUksS0FBSyxDQUFDO0FBQ25DLFVBQU0sV0FBVyxJQUFJLEtBQUssS0FBSztBQUMvQixhQUFTLFFBQVEsTUFBTSxRQUFRLElBQUksRUFBRTtBQUVyQyxvQkFBZ0I7QUFBQSxNQUNkLFNBQVM7QUFBQSxRQUNQLFVBQVUsVUFBVSxRQUFRO0FBQUEsUUFDNUIsUUFBUSxVQUFVLEtBQUs7QUFBQSxRQUN2QixXQUFXO0FBQUEsUUFDWCxjQUFjO0FBQUEsUUFDZCxjQUFjO0FBQUEsUUFDZCxlQUFlLFNBQVMsZUFBZTtBQUFBLFFBQ3ZDLHFCQUFxQjtBQUFBLFFBQ3JCLGNBQWM7QUFBQSxRQUNkLGtCQUFrQjtBQUFBLFFBQ2xCLFFBQVE7QUFBQSxNQUNWO0FBQUEsTUFDQSxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVCxPQUFPLENBQUM7QUFBQSxNQUNSLE9BQU87QUFBQSxJQUNULENBQUM7QUFFRCw0QkFBd0IsVUFBVTtBQUNsQyxXQUFPO0FBQUEsRUFDVCxHQUFHLENBQUMsaUJBQWlCLGVBQWUsQ0FBQztBQUVyQyxRQUFNLGdDQUFnQyxjQUFBQSxRQUFNLFlBQVksTUFBTTtBQUM1RCxRQUFJLCtCQUErQixHQUFHO0FBQ3BDO0FBQUEsSUFDRjtBQUVBLFVBQU0sY0FBYyxnQkFBZ0I7QUFDcEMsUUFBSSxDQUFDLFlBQWE7QUFDbEIsb0JBQWdCLFdBQVc7QUFBQSxFQUM3QixHQUFHLENBQUMsZ0NBQWdDLGlCQUFpQixlQUFlLENBQUM7QUFFckUsZ0JBQUFBLFFBQU0sVUFBVSxNQUFNO0FBQ3BCLFVBQU0sYUFBYSxTQUFTLGVBQWUsZUFBZTtBQUMxRCxRQUFJLENBQUMsV0FBWTtBQUVqQixlQUFXLGFBQWEsaUJBQWlCLHVCQUF1QjtBQUVoRSxXQUFPLE1BQU07QUFDWCxpQkFBVyxnQkFBZ0IsZUFBZTtBQUFBLElBQzVDO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUVMLGdCQUFBQSxRQUFNLFVBQVUsTUFBTTtBQUNwQixVQUFNLGFBQWEsU0FBUyxlQUFlLGVBQWU7QUFDMUQsUUFBSSxDQUFDLFdBQVk7QUFFakIsVUFBTSx3QkFBd0IsQ0FBQyxVQUFpQjtBQUM5QyxZQUFNLGVBQWU7QUFDckIsWUFBTSxnQkFBZ0I7QUFDdEIsWUFBTSx5QkFBeUI7QUFFL0IsWUFBTSx3QkFBd0IsTUFBTTtBQUNsQyxzQ0FBOEI7QUFDOUIsZUFBTyxpQ0FBaUM7QUFDeEMsZUFBTyxTQUFTLE9BQU87QUFBQSxNQUN6QjtBQUVBLFVBQUksT0FBTyxPQUFPLDJCQUEyQixZQUFZO0FBQ3ZELGVBQU8sdUJBQXVCLHFCQUFxQjtBQUNuRDtBQUFBLE1BQ0Y7QUFFQSw0QkFBc0I7QUFBQSxJQUN4QjtBQUVBLGVBQVcsaUJBQWlCLFNBQVMsdUJBQXVCLElBQUk7QUFDaEUsV0FBTyxNQUFNO0FBQ1gsaUJBQVcsb0JBQW9CLFNBQVMsdUJBQXVCLElBQUk7QUFBQSxJQUNyRTtBQUFBLEVBQ0YsR0FBRyxDQUFDLDZCQUE2QixDQUFDO0FBRWxDLGdCQUFBQSxRQUFNLFVBQVUsTUFBTTtBQUNwQixVQUFNLG1CQUFtQixDQUFDLFVBQVU7QUFDbEMsVUFBSSxPQUFPLFNBQVMsTUFBTSxNQUFNLFlBQVksTUFBTTtBQUNoRDtBQUFBLE1BQ0Y7QUFFQSxZQUFNLHdCQUF3QixNQUFNO0FBQ2xDLHNDQUE4QjtBQUM5QixlQUFPLGlDQUFpQztBQUN4QyxlQUFPLFNBQVMsUUFBUSx1QkFBdUI7QUFBQSxNQUNqRDtBQUVBLFVBQUksT0FBTyxPQUFPLDJCQUEyQixZQUFZO0FBQ3ZELGVBQU8sdUJBQXVCLHFCQUFxQjtBQUNuRDtBQUFBLE1BQ0Y7QUFFQSw0QkFBc0I7QUFBQSxJQUN4QjtBQUVBLFdBQU8saUJBQWlCLFlBQVksZ0JBQWdCO0FBQ3BELFdBQU8sTUFBTTtBQUNYLGFBQU8sb0JBQW9CLFlBQVksZ0JBQWdCO0FBQUEsSUFDekQ7QUFBQSxFQUNGLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQztBQUVsQyxTQUNFLDhDQUFDLFNBQUksV0FBVSxhQUNiO0FBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE9BQU8sV0FBVztBQUFBLFFBQ2xCLFlBQVksV0FBVztBQUFBLFFBQ3ZCLFFBQVEsV0FBVztBQUFBLFFBQ25CLE1BQU0sV0FBVztBQUFBLFFBQ2pCLDBCQUEwQixXQUFXO0FBQUEsUUFDckMsa0JBQWtCLFdBQVc7QUFBQSxRQUM3QixpQkFBaUIsV0FBVztBQUFBLFFBQzVCLGtCQUFrQixXQUFXO0FBQUEsUUFDN0IsV0FBVyxXQUFXO0FBQUEsUUFDdEIsZ0JBQWdCLFdBQVc7QUFBQSxRQUMzQixpQkFBaUIsV0FBVztBQUFBLFFBQzVCLGtCQUFrQixXQUFXLGdCQUFnQjtBQUFBLFFBQzdDLGlCQUFpQixXQUFXLGdCQUFnQjtBQUFBLFFBQzVDLDRCQUE0QixXQUFXLGdCQUFnQjtBQUFBLFFBQ3ZELDJCQUEyQixXQUFXLGdCQUFnQjtBQUFBLFFBQ3RELHNCQUFzQixXQUFXLGdCQUFnQjtBQUFBLFFBQ2pELHlCQUF5QixXQUFXLGdCQUFnQjtBQUFBLFFBQ3BELHNCQUFzQixXQUFXLGdCQUFnQjtBQUFBLFFBQ2pELHNCQUFzQixXQUFXLGdCQUFnQjtBQUFBLFFBQ2pELHVCQUF1QixXQUFXLGdCQUFnQjtBQUFBLFFBQ2xELHlCQUF5QixXQUFXLGdCQUFnQjtBQUFBLFFBQ3BELFdBQVcsV0FBVztBQUFBLFFBQ3RCLFVBQVUsV0FBVztBQUFBLFFBQ3JCLHNCQUFzQixDQUFDLFNBQVM7QUFDOUIsZUFBSyxXQUFXLGdCQUFnQixtQkFBbUIsTUFBTSxRQUFRO0FBQUEsUUFDbkU7QUFBQSxRQUNBLHVCQUF1QixDQUFDLFNBQVM7QUFDL0IsZUFBSyxXQUFXLGdCQUFnQixtQkFBbUIsTUFBTSxTQUFTO0FBQUEsUUFDcEU7QUFBQSxRQUNBLG9CQUFvQixNQUFNO0FBQ3hCLGVBQUssV0FBVyxnQkFBZ0IsaUJBQWlCLFdBQVcsZUFBZSxPQUFPO0FBQUEsUUFDcEY7QUFBQSxRQUNBLHFCQUFxQixNQUFNLFdBQVcsZ0JBQWdCLGtCQUFrQixXQUFXLGdCQUFnQixPQUFPO0FBQUEsUUFDMUcscUJBQXFCLFdBQVcsZ0JBQWdCO0FBQUEsUUFDaEQsc0JBQXNCLE1BQU07QUFDMUIsZUFBSyxXQUFXLGdCQUFnQixtQkFBbUI7QUFBQSxRQUNyRDtBQUFBLFFBQ0EseUJBQXlCLFdBQVcsZ0JBQWdCO0FBQUE7QUFBQSxJQUN0RDtBQUFBLElBRUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFdBQVU7QUFBQSxRQUNWLE9BQU8sRUFBRSxTQUFTLFdBQVcsYUFBYSxXQUFXLDJCQUEyQixTQUFTLE9BQU87QUFBQSxRQUVoRztBQUFBLHVEQUFDLFNBQUksV0FBVSxzQkFBcUIsU0FBUSxhQUFZLE1BQUssVUFBUyxjQUFZLEtBQUssa0JBQWtCLFNBQVMsR0FDaEgsdURBQUMsWUFBTyxXQUFVLHVCQUFzQixJQUFHLE1BQUssSUFBRyxNQUFLLEdBQUUsS0FBSSxhQUFZLEtBQUksR0FDaEY7QUFBQSxVQUNDLEtBQUssa0JBQWtCLFNBQVM7QUFBQTtBQUFBO0FBQUEsSUFDbkM7QUFBQSxJQUVDLFdBQVcsZUFBZSw2Q0FBQyxTQUFJLFdBQVUsZUFBZSxxQkFBVyxjQUFhLElBQVM7QUFBQSxJQUV6RixDQUFDLFdBQVcsYUFBYSxDQUFDLFdBQVcsNEJBQTRCLENBQUMsV0FBVyxnQkFBZ0IsV0FBVyxTQUN2RztBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsTUFBTTtBQUFBLFVBQ0osY0FBYyxXQUFXO0FBQUEsVUFDekIsV0FBVyxXQUFXO0FBQUEsVUFDdEIscUJBQXFCLFdBQVc7QUFBQSxVQUNoQyxtQkFBbUIsV0FBVztBQUFBLFFBQ2hDO0FBQUEsUUFDQSxlQUFlO0FBQUEsVUFDYix5QkFBeUIsV0FBVztBQUFBLFVBQ3BDLDZCQUE2QixXQUFXO0FBQUEsVUFDeEMsa0JBQWtCLFdBQVc7QUFBQSxRQUMvQjtBQUFBLFFBQ0EsUUFBUSxXQUFXO0FBQUEsUUFDbkIsY0FBYyxXQUFXO0FBQUEsUUFDekIseUJBQXlCLFdBQVc7QUFBQSxRQUNwQywwQkFBMEIsV0FBVztBQUFBLFFBQ3JDLDZCQUE2QixXQUFXO0FBQUEsUUFDeEMsbUJBQW1CLFdBQVc7QUFBQSxRQUM5QiwrQkFBK0IsV0FBVztBQUFBLFFBQzFDLGlCQUFpQixXQUFXO0FBQUEsUUFDNUIsa0JBQWtCLFdBQVc7QUFBQSxRQUM3QixnQkFBZ0IsV0FBVztBQUFBLFFBQzNCLG1CQUFtQixXQUFXO0FBQUEsUUFDOUIsbUJBQW1CLFdBQVc7QUFBQSxRQUM5Qiw4QkFBOEIsV0FBVztBQUFBLFFBQ3pDLDBCQUEwQixXQUFXO0FBQUEsUUFDckMsNEJBQTRCLFdBQVc7QUFBQSxRQUN2QywwQkFBMEIsV0FBVztBQUFBLFFBQ3JDLHdCQUF3QixXQUFXO0FBQUEsUUFDbkMsMkJBQTJCLFdBQVc7QUFBQSxRQUN0QywyQkFBMkIsV0FBVztBQUFBO0FBQUEsSUFDeEMsSUFDRTtBQUFBLElBRUgsQ0FBQyxXQUFXLGdCQUFnQixDQUFDLFdBQVcsYUFBYSxDQUFDLFdBQVcsNEJBQTRCLENBQUMsV0FBVyxlQUN4RztBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsY0FBYyxXQUFXO0FBQUEsUUFDekIsY0FBYyxTQUFTLFdBQVcsUUFBUSxZQUFZO0FBQUEsUUFDdEQsZ0JBQWdCLFdBQVc7QUFBQSxRQUMzQixVQUFVLFdBQVc7QUFBQSxRQUNyQixZQUFZLEtBQUssdUJBQXVCLE9BQU87QUFBQSxRQUMvQyxXQUFXLEtBQUsseUJBQXlCLGtDQUFrQztBQUFBLFFBQzNFLGtCQUFrQixXQUFXO0FBQUEsUUFDN0IsY0FBYyxXQUFXO0FBQUEsUUFDekIsa0JBQWtCLFdBQVc7QUFBQSxRQUM3QixZQUFZLFdBQVc7QUFBQTtBQUFBLElBQ3pCLElBQ0U7QUFBQSxJQUVILFdBQVcsc0JBQ1Y7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFNBQVMsV0FBVyxhQUFhO0FBQUEsUUFDakMsTUFBTSxXQUFXLFFBQVEsV0FBVztBQUFBLFFBQ3BDLFVBQVUsV0FBVztBQUFBLFFBQ3JCLGVBQWUsV0FBVztBQUFBO0FBQUEsSUFDNUIsSUFDRTtBQUFBLElBRUgsV0FBVyxVQUNWO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxXQUFXLEtBQUssNkJBQTZCLHFCQUFrQjtBQUFBLFFBQy9ELE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLFFBQVEsV0FBVyxzQkFBc0Isb0NBQW9DO0FBQUEsUUFDN0UsZUFBZSxLQUFLLDZCQUE2QixxQkFBa0I7QUFBQSxRQUNuRSxXQUFXLFdBQVc7QUFBQTtBQUFBLElBQ3hCLElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFHQSxJQUFNLHlCQUF5QixNQUFNO0FBQ25DLFNBQ0UsNkNBQUMsZ0NBQXFCLHlCQUF1QixNQUMzQyx1REFBQyxpQ0FBOEIsR0FDakM7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLDBCQUF3QjtBQUN4QixRQUFNLFNBQVMsU0FBUyxlQUFlLDJCQUEyQjtBQUNsRSxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLDBCQUF1QixDQUFFO0FBQ3JEO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxpQ0FBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAicmVzcG9uc2UiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiXQp9Cg==
