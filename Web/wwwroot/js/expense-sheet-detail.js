import {
  useExpenseSheetsFilterCache
} from "./chunks/chunk-QHPAIVPL.js";
import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-5WJJWCMI.js";
import {
  ExpenseQuickTicketProgressOverlay_default,
  PageBottomActionButton,
  PageBottomActions_default,
  TICKET_IMAGE_ACCEPT_ATTRIBUTE,
  useExpenseSheetQuickTicketFlow
} from "./chunks/chunk-HKGAKUTI.js";
import {
  DEFAULT_EXPENSE_STATUS_FILTER,
  getExpenseStatusLabel
} from "./chunks/chunk-2BH5SUTF.js";
import "./chunks/chunk-5DDMO5L6.js";
import "./chunks/chunk-YMDESVRK.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseCurrencyFlagIcon_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-RQJBQWKS.js";
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
} from "./chunks/chunk-OD64ASA7.js";
import "./chunks/chunk-4BE3ZFCK.js";
import {
  isManagingOtherExpenseRecord,
  resolveExpenseSheetDetailPolicy,
  saveExpenseTicketReturnContext
} from "./chunks/chunk-OZCLQCPX.js";
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
} from "./chunks/chunk-WIQGJHF6.js";
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
} from "./chunks/chunk-XSHPMUMP.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-XUQXOD2Z.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvRXhwZW5zZVNoZWV0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvbi50c3giLCAiLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9JbmZvUG9wb3Zlckljb25CdXR0b24udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29uc3RhbnRzL2V4Y2hhbmdlUmF0ZUVudHJ5TW9kZUNhdGFsb2cudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VTaGVldEhlYWRlckZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlTGluZXNUaW1lbGluZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC9FeHBlbnNlU2hlZXREZXRhaWxPdmVybGF5cy50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRyb2xsZXIudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XHJcbmltcG9ydCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nQWN0aW9uQnV0dG9uLnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VBdXRoQ29udGV4dCB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlU2hlZXRIZWFkZXJGb3JtLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZUxpbmVzVGltZWxpbmUgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZUxpbmVzVGltZWxpbmUudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25CYXIgZnJvbSBcIi4vRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXMgZnJvbSBcIi4vRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXMudHN4XCI7XHJcbmltcG9ydCB7IGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoLCB1c2VFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udHJvbGxlciB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250cm9sbGVyLnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcclxuaW1wb3J0IHsgREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VTdGF0dXNDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0LCBzdGFydE9mRGF5LCB0b0lzb0RhdGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgY29uc3VtZUV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZSB9IGZyb20gXCIuLi9saXN0L3VzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZS50c1wiO1xyXG5cclxuY29uc3QgREVUQUlMX0ZBQl9CT1RUT01fV0lUSF9BQ1RJT05fQkFSID0gMTc2O1xyXG5jb25zdCBFWFBFTlNFX1NIRUVUU19MSVNUX1VSTCA9IFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXRzXCI7XHJcblxyXG5jb25zdCBFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udGVudCA9ICgpID0+IHtcclxuICBjb25zdCBjb250cm9sbGVyID0gdXNlRXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRyb2xsZXIoKTtcclxuICBjb25zdCB7IGN1cnJlbnRBeFVzZXJJZCB9ID0gdXNlQXV0aENvbnRleHQoKTtcclxuICBjb25zdCB7IHJlYWRDYWNoZWRTdGF0ZSwgc2F2ZUNhY2hlZFN0YXRlIH0gPSB1c2VFeHBlbnNlU2hlZXRzRmlsdGVyQ2FjaGUoKTtcclxuICBjb25zdCBjcmVhdGVkU2hlZXRSZXR1cm5JZFJlZiA9IFJlYWN0LnVzZVJlZihcIlwiKTtcclxuXHJcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGNyZWF0ZWRDb250ZXh0ID0gY29uc3VtZUV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0KGNvbnRyb2xsZXIuc2hlZXRJZCk7XHJcbiAgICBjcmVhdGVkU2hlZXRSZXR1cm5JZFJlZi5jdXJyZW50ID0gY3JlYXRlZENvbnRleHQ/LnNoZWV0SWQgfHwgXCJcIjtcclxuICB9LCBbY29udHJvbGxlci5zaGVldElkXSk7XHJcblxyXG4gIGNvbnN0IHByZXBhcmVDcmVhdGVkU2hlZXRSZXR1cm5TdGF0ZSA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IGNyZWF0ZWRTaGVldElkID0gc2FmZVRleHQoY3JlYXRlZFNoZWV0UmV0dXJuSWRSZWYuY3VycmVudCk7XHJcbiAgICBpZiAoIWNyZWF0ZWRTaGVldElkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xyXG4gICAgY29uc3QgZnJvbURhdGUgPSBuZXcgRGF0ZSh0b2RheSk7XHJcbiAgICBmcm9tRGF0ZS5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDg5KTtcclxuXHJcbiAgICBzYXZlQ2FjaGVkU3RhdGUoe1xyXG4gICAgICBmaWx0ZXJzOiB7XHJcbiAgICAgICAgZnJvbURhdGU6IHRvSXNvRGF0ZShmcm9tRGF0ZSksXHJcbiAgICAgICAgdG9EYXRlOiB0b0lzb0RhdGUodG9kYXkpLFxyXG4gICAgICAgIHByb2plY3RJZDogXCJcIixcclxuICAgICAgICBob2phR2FzdG9zSWQ6IGNyZWF0ZWRTaGVldElkLFxyXG4gICAgICAgIGN1cnJlbmN5Q29kZTogXCJcIixcclxuICAgICAgICBtYW5hZ2VkVXNlcklkOiBzYWZlVGV4dChjdXJyZW50QXhVc2VySWQpLFxyXG4gICAgICAgIGluY2x1ZGVTdWJvcmRpbmF0ZXM6IGZhbHNlLFxyXG4gICAgICAgIHN0YXR1c0ZpbHRlcjogREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVIsXHJcbiAgICAgICAgZXhjaGFuZ2VSYXRlTW9kZTogbnVsbCxcclxuICAgICAgICBmaWx0ZXI6IGNyZWF0ZWRTaGVldElkLFxyXG4gICAgICB9LFxyXG4gICAgICBwYWdlOiAxLFxyXG4gICAgICBzY3JvbGxZOiAwLFxyXG4gICAgICBpdGVtczogW10sXHJcbiAgICAgIHRvdGFsOiAwLFxyXG4gICAgfSk7XHJcblxyXG4gICAgY3JlYXRlZFNoZWV0UmV0dXJuSWRSZWYuY3VycmVudCA9IFwiXCI7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9LCBbY3VycmVudEF4VXNlcklkLCBzYXZlQ2FjaGVkU3RhdGVdKTtcclxuXHJcbiAgY29uc3QgcmVhcm1FeHBlbnNlU2hlZXRzUmV0dXJuU3RhdGUgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAocHJlcGFyZUNyZWF0ZWRTaGVldFJldHVyblN0YXRlKCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNhY2hlZFN0YXRlID0gcmVhZENhY2hlZFN0YXRlKCk7XHJcbiAgICBpZiAoIWNhY2hlZFN0YXRlKSByZXR1cm47XHJcbiAgICBzYXZlQ2FjaGVkU3RhdGUoY2FjaGVkU3RhdGUpO1xyXG4gIH0sIFtwcmVwYXJlQ3JlYXRlZFNoZWV0UmV0dXJuU3RhdGUsIHJlYWRDYWNoZWRTdGF0ZSwgc2F2ZUNhY2hlZFN0YXRlXSk7XHJcblxyXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBiYWNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbG9iYWxCYWNrQnRuXCIpO1xyXG4gICAgaWYgKCFiYWNrQnV0dG9uKSByZXR1cm47XHJcblxyXG4gICAgYmFja0J1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWJhY2stdXJsXCIsIEVYUEVOU0VfU0hFRVRTX0xJU1RfVVJMKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBiYWNrQnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtYmFjay11cmxcIik7XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGJhY2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbEJhY2tCdG5cIik7XHJcbiAgICBpZiAoIWJhY2tCdXR0b24pIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVUb3BiYXJCYWNrQ2xpY2sgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgIGNvbnN0IGV4ZWN1dGVCYWNrTmF2aWdhdGlvbiA9ICgpID0+IHtcclxuICAgICAgICByZWFybUV4cGVuc2VTaGVldHNSZXR1cm5TdGF0ZSgpO1xyXG4gICAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gRVhQRU5TRV9TSEVFVFNfTElTVF9VUkw7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdy5fX2luZFJlcXVlc3ROYXZpZ2F0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICB3aW5kb3cuX19pbmRSZXF1ZXN0TmF2aWdhdGlvbihleGVjdXRlQmFja05hdmlnYXRpb24pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGJhY2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVRvcGJhckJhY2tDbGljaywgdHJ1ZSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBiYWNrQnV0dG9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVUb3BiYXJCYWNrQ2xpY2ssIHRydWUpO1xyXG4gICAgfTtcclxuICB9LCBbcmVhcm1FeHBlbnNlU2hlZXRzUmV0dXJuU3RhdGVdKTtcclxuXHJcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGhhbmRsZU5hdGl2ZUJhY2sgPSAoZXZlbnQpID0+IHtcclxuICAgICAgaWYgKGV2ZW50Py5zdGF0ZSAmJiBldmVudC5zdGF0ZS5pbmRUcmFwID09PSB0cnVlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBleGVjdXRlQmFja05hdmlnYXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgcmVhcm1FeHBlbnNlU2hlZXRzUmV0dXJuU3RhdGUoKTtcclxuICAgICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShFWFBFTlNFX1NIRUVUU19MSVNUX1VSTCk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdy5fX2luZFJlcXVlc3ROYXZpZ2F0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICB3aW5kb3cuX19pbmRSZXF1ZXN0TmF2aWdhdGlvbihleGVjdXRlQmFja05hdmlnYXRpb24pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgaGFuZGxlTmF0aXZlQmFjayk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGhhbmRsZU5hdGl2ZUJhY2spO1xyXG4gICAgfTtcclxuICB9LCBbcmVhcm1FeHBlbnNlU2hlZXRzUmV0dXJuU3RhdGVdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XHJcbiAgICAgIDxFeHBlbnNlU2hlZXREZXRhaWxPdmVybGF5c1xyXG4gICAgICAgIG1vZGFsPXtjb250cm9sbGVyLm1vZGFsfVxyXG4gICAgICAgIG1vZGFsRXJyb3I9e2NvbnRyb2xsZXIubW9kYWxFcnJvcn1cclxuICAgICAgICBzdGF0dXM9e2NvbnRyb2xsZXIuc3RhdHVzfVxyXG4gICAgICAgIGJ1c3k9e2NvbnRyb2xsZXIuYnVzeX1cclxuICAgICAgICBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGU9e2NvbnRyb2xsZXIuaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlfVxyXG4gICAgICAgIG1vZGFsTG9hZGluZ1RleHQ9e2NvbnRyb2xsZXIubW9kYWxMb2FkaW5nVGV4dH1cclxuICAgICAgICBtb2RhbENhbmNlbFRleHQ9e2NvbnRyb2xsZXIubW9kYWxDYW5jZWxUZXh0fVxyXG4gICAgICAgIG1vZGFsQ29uZmlybVRleHQ9e2NvbnRyb2xsZXIubW9kYWxDb25maXJtVGV4dH1cclxuICAgICAgICBtb2RhbEJvZHk9e2NvbnRyb2xsZXIubW9kYWxCb2R5fVxyXG4gICAgICAgIGNhbWVyYUlucHV0UmVmPXtjb250cm9sbGVyLmNhbWVyYUlucHV0UmVmfVxyXG4gICAgICAgIGdhbGxlcnlJbnB1dFJlZj17Y29udHJvbGxlci5nYWxsZXJ5SW5wdXRSZWZ9XHJcbiAgICAgICAgc291cmNlUGlja2VyT3Blbj17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuc291cmNlUGlja2VyT3Blbn1cclxuICAgICAgICBxdWlja1RpY2tldEJ1c3k9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmJ1c3l9XHJcbiAgICAgICAgcXVpY2tUaWNrZXRQcm9ncmVzc01lc3NhZ2U9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnByb2dyZXNzTWVzc2FnZX1cclxuICAgICAgICBxdWlja1RpY2tldFByb2dyZXNzU3RhZ2VzPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5wcm9ncmVzc1N0YWdlc31cclxuICAgICAgICBxdWlja1RpY2tldEVsYXBzZWRNcz17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cucHJvZ3Jlc3NFbGFwc2VkTXN9XHJcbiAgICAgICAgcXVpY2tUaWNrZXRFcnJvck1lc3NhZ2U9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmVycm9yTWVzc2FnZX1cclxuICAgICAgICBxdWlja1RpY2tldEF0dGVtcHRJZD17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuYXR0ZW1wdElkfVxyXG4gICAgICAgIHF1aWNrVGlja2V0VHJhY2VMaXN0PXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy50cmFjZUxpc3R9XHJcbiAgICAgICAgaGFzUGVuZGluZ1VwbG9hZFJldHJ5PXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5oYXNQZW5kaW5nVXBsb2FkUmV0cnl9XHJcbiAgICAgICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmU9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93Lmhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlfVxyXG4gICAgICAgIG9uQ29uZmlybT17Y29udHJvbGxlci5oYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm19XHJcbiAgICAgICAgb25DYW5jZWw9e2NvbnRyb2xsZXIuY2xvc2VDb25maXJtfVxyXG4gICAgICAgIG9uU2VsZWN0ZWRDYW1lcmFGaWxlPXsoZmlsZSkgPT4ge1xyXG4gICAgICAgICAgdm9pZCBjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5oYW5kbGVTZWxlY3RlZEZpbGUoZmlsZSwgXCJjYW1lcmFcIik7XHJcbiAgICAgICAgfX1cclxuICAgICAgICBvblNlbGVjdGVkR2FsbGVyeUZpbGU9eyhmaWxlKSA9PiB7XHJcbiAgICAgICAgICB2b2lkIGNvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmhhbmRsZVNlbGVjdGVkRmlsZShmaWxlLCBcImdhbGxlcnlcIik7XHJcbiAgICAgICAgfX1cclxuICAgICAgICBvblNlbGVjdEZyb21DYW1lcmE9eygpID0+IHtcclxuICAgICAgICAgIHZvaWQgY29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuc2VsZWN0RnJvbUNhbWVyYShjb250cm9sbGVyLmNhbWVyYUlucHV0UmVmLmN1cnJlbnQpO1xyXG4gICAgICAgIH19XHJcbiAgICAgICAgb25TZWxlY3RGcm9tR2FsbGVyeT17KCkgPT4gY29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuc2VsZWN0RnJvbUdhbGxlcnkoY29udHJvbGxlci5nYWxsZXJ5SW5wdXRSZWYuY3VycmVudCl9XHJcbiAgICAgICAgb25DbG9zZVNvdXJjZVBpY2tlcj17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuY2xvc2VTb3VyY2VQaWNrZXJ9XHJcbiAgICAgICAgb25SZXRyeVBlbmRpbmdVcGxvYWQ9eygpID0+IHtcbiAgICAgICAgICB2b2lkIGNvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnJldHJ5UGVuZGluZ1VwbG9hZCgpO1xuICAgICAgICB9fVxuICAgICAgICBvbkNsZWFyUXVpY2tUaWNrZXRFcnJvcj17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuY2xlYXJFcnJvcn1cbiAgICAgIC8+XG5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXHJcbiAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogY29udHJvbGxlci5pc0xvYWRpbmcgfHwgY29udHJvbGxlci5pc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XHJcbiAgICAgID5cclxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIHNpemUtNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAge2NvbnRyb2xsZXIuZXJyb3JNZXNzYWdlID8gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntjb250cm9sbGVyLmVycm9yTWVzc2FnZX08L2Rpdj4gOiBudWxsfVxyXG5cclxuICAgICAgeyFjb250cm9sbGVyLmlzTG9hZGluZyAmJiAhY29udHJvbGxlci5pc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUgJiYgIWNvbnRyb2xsZXIuZXJyb3JNZXNzYWdlICYmIGNvbnRyb2xsZXIuaGVhZGVyID8gKFxuICAgICAgICA8RXhwZW5zZVNoZWV0SGVhZGVyRm9ybVxuICAgICAgICAgIG1vZGU9e3tcbiAgICAgICAgICAgIGlzQ3JlYXRlTW9kZTogY29udHJvbGxlci5pc0NyZWF0ZU1vZGUsXG4gICAgICAgICAgICBpc0VkaXRpbmc6IGNvbnRyb2xsZXIuaXNFZGl0aW5nLFxuICAgICAgICAgICAgY2FuRWRpdEhlYWRlckZpZWxkczogY29udHJvbGxlci5jYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcbiAgICAgICAgICAgIHN0YXR1c0NvbW1lbnRNb2RlOiBjb250cm9sbGVyLnN0YXR1c0NvbW1lbnRNb2RlLFxuICAgICAgICAgIH19XG4gICAgICAgICAgY3VycmVuY3lMb2Nrcz17e1xuICAgICAgICAgICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXM6IGNvbnRyb2xsZXIuaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXG4gICAgICAgICAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXM6IGNvbnRyb2xsZXIuaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxuICAgICAgICAgICAgc2hvd0V4Y2hhbmdlUmF0ZTogY29udHJvbGxlci5zaG93RXhjaGFuZ2VSYXRlLFxuICAgICAgICAgIH19XG4gICAgICAgICAgaGVhZGVyPXtjb250cm9sbGVyLmhlYWRlcn1cbiAgICAgICAgICBwcm9qZWN0VmFsdWU9e2NvbnRyb2xsZXIucHJvamVjdFZhbHVlfVxuICAgICAgICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5PXtjb250cm9sbGVyLm5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5fVxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeT17Y29udHJvbGxlci5leGNoYW5nZVJhdGVCYXNlQ3VycmVuY3l9XG4gICAgICAgICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50PXtjb250cm9sbGVyLmV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudH1cbiAgICAgICAgICBleGNoYW5nZVJhdGVWYWx1ZT17Y29udHJvbGxlci5leGNoYW5nZVJhdGVWYWx1ZX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZT17Y29udHJvbGxlci5leGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZX1cclxuICAgICAgICAgIHRvdGFsQW1vdW50VGV4dD17Y29udHJvbGxlci50b3RhbEFtb3VudFRleHR9XHJcbiAgICAgICAgICBkcmFmdERlc2NyaXB0aW9uPXtjb250cm9sbGVyLmRyYWZ0RGVzY3JpcHRpb259XHJcbiAgICAgICAgICBkcmFmdFByb2plY3RJZD17Y29udHJvbGxlci5kcmFmdFByb2plY3RJZH1cclxuICAgICAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlPXtjb250cm9sbGVyLmRyYWZ0Q3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgZHJhZnRFeGNoYW5nZVJhdGU9e2NvbnRyb2xsZXIuZHJhZnRFeGNoYW5nZVJhdGV9XHJcbiAgICAgICAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlPXtjb250cm9sbGVyLm9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWV9XHJcbiAgICAgICAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGU9e2NvbnRyb2xsZXIub2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlfVxyXG4gICAgICAgICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2U9e2NvbnRyb2xsZXIub2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2V9XHJcbiAgICAgICAgICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U9e2NvbnRyb2xsZXIuc2V0RHJhZnREZXNjcmlwdGlvbn1cclxuICAgICAgICAgIG9uRHJhZnRQcm9qZWN0SWRDaGFuZ2U9e2NvbnRyb2xsZXIuc2V0RHJhZnRQcm9qZWN0SWR9XHJcbiAgICAgICAgICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlPXtjb250cm9sbGVyLnNldERyYWZ0Q3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZT17Y29udHJvbGxlci5zZXREcmFmdEV4Y2hhbmdlUmF0ZX1cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHshY29udHJvbGxlci5pc0NyZWF0ZU1vZGUgJiYgIWNvbnRyb2xsZXIuaXNMb2FkaW5nICYmICFjb250cm9sbGVyLmlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSAmJiAhY29udHJvbGxlci5lcnJvck1lc3NhZ2UgPyAoXHJcbiAgICAgICAgPEV4cGVuc2VMaW5lc1RpbWVsaW5lXHJcbiAgICAgICAgICB2aXNpYmxlTGluZXM9e2NvbnRyb2xsZXIudmlzaWJsZUxpbmVzfVxyXG4gICAgICAgICAgY3VycmVuY3lDb2RlPXtzYWZlVGV4dChjb250cm9sbGVyLmhlYWRlcj8uY3VycmVuY3lDb2RlKX1cclxuICAgICAgICAgIHRvdGFsTGluZVBhZ2VzPXtjb250cm9sbGVyLnRvdGFsTGluZVBhZ2VzfVxyXG4gICAgICAgICAgbGluZVBhZ2U9e2NvbnRyb2xsZXIubGluZVBhZ2V9XHJcbiAgICAgICAgICBsaW5lc0xhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19MaW5lc1wiLCBcIkxpbmVzXCIpfVxyXG4gICAgICAgICAgZW1wdHlUZXh0PXtpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob0xpbmVzXCIsIFwiTm8gbGluZXMgZm9yIHRoaXMgZXhwZW5zZSBzaGVldC5cIil9XHJcbiAgICAgICAgICBwYWdpbmF0aW9uTGFiZWxzPXtjb250cm9sbGVyLnBhZ2luYXRpb25MYWJlbHN9XHJcbiAgICAgICAgICBjb250YWluZXJSZWY9e2NvbnRyb2xsZXIubGluZUNvbnRhaW5lclJlZn1cclxuICAgICAgICAgIG9uTGluZVBhZ2VDaGFuZ2U9e2NvbnRyb2xsZXIuc2V0TGluZVBhZ2V9XHJcbiAgICAgICAgICBvbk9wZW5MaW5lPXtjb250cm9sbGVyLm5hdmlnYXRlVG9MaW5lRGV0YWlsfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAge2NvbnRyb2xsZXIuc2hvd1N0YXR1c0FjdGlvbkJhciA/IChcclxuICAgICAgICA8RXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyXHJcbiAgICAgICAgICBhY3Rpb25zPXtjb250cm9sbGVyLmRldGFpbFBvbGljeS5zdGF0dXNBY3Rpb25zfVxyXG4gICAgICAgICAgYnVzeT17Y29udHJvbGxlci5idXN5IHx8IGNvbnRyb2xsZXIuaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e2NvbnRyb2xsZXIuYXJlU3RhdHVzQWN0aW9uc0Rpc2FibGVkfVxyXG4gICAgICAgICAgb25BY3Rpb25DbGljaz17Y29udHJvbGxlci5oYW5kbGVTdGF0dXNBY3Rpb25DbGlja31cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHtjb250cm9sbGVyLnNob3dGYWIgPyAoXHJcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXHJcbiAgICAgICAgICBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgclx1MDBFMXBpZGFzXCIpfVxyXG4gICAgICAgICAgc2l6ZT17NzZ9XHJcbiAgICAgICAgICByaWdodD17MTZ9XHJcbiAgICAgICAgICBib3R0b209e2NvbnRyb2xsZXIuc2hvd1N0YXR1c0FjdGlvbkJhciA/IERFVEFJTF9GQUJfQk9UVE9NX1dJVEhfQUNUSU9OX0JBUiA6IDI0fVxyXG4gICAgICAgICAgbWVudUFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX0FjdGlvbnNcIiwgXCJBY2Npb25lcyByXHUwMEUxcGlkYXNcIil9XHJcbiAgICAgICAgICBtZW51SXRlbXM9e2NvbnRyb2xsZXIuZmFiTWVudUl0ZW1zfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIE1haW4gcGFnZSBlbnRyeSBmb3IgZXhwZW5zZSBzaGVldCBkZXRhaWwuXHJcbmNvbnN0IEV4cGVuc2VTaGVldERldGFpbFBhZ2UgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycyBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD5cclxuICAgICAgPEV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250ZW50IC8+XHJcbiAgICA8L1Zpc2l0YXNQYWdlUHJvdmlkZXJzPlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcclxuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xyXG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXhwZW5zZS1zaGVldC1kZXRhaWwtcm9vdFwiKTtcclxuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xyXG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVNoZWV0RGV0YWlsUGFnZSAvPik7XHJcbn07XHJcblxyXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldERldGFpbFBhZ2U7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgSW5mb1BvcG92ZXJJY29uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvSW5mb1BvcG92ZXJJY29uQnV0dG9uLnRzeFwiO1xyXG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24udHN4XCI7XG5pbXBvcnQgRXhwZW5zZVJlYWRPbmx5RmllbGQgZnJvbSBcIi4vRXhwZW5zZVJlYWRPbmx5RmllbGQudHN4XCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcblxyXG50eXBlIEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5SW50ZXJhY3Rpb24gPSB7XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgY2FuRWRpdEhlYWRlckZpZWxkczogYm9vbGVhbjtcbn07XG5cbnR5cGUgRXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lTdGF0ZSA9IHtcbiAgaXNGb3JlaWduQ3VycmVuY3k6IGJvb2xlYW47XG4gIHNob3dFeGNoYW5nZVJhdGU6IGJvb2xlYW47XG4gIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XG59O1xuXG50eXBlIEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvblByb3BzID0ge1xuICBpbnRlcmFjdGlvbjogRXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lJbnRlcmFjdGlvbjtcbiAgY3VycmVuY3lTdGF0ZTogRXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lTdGF0ZTtcbiAgZXhwZW5zZUN1cnJlbmN5TGFiZWw6IHN0cmluZztcbiAgaGVhZGVyQ3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGJhc2VDdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBkcmFmdEV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xuICBleGNoYW5nZVJhdGVWYWx1ZTogc3RyaW5nO1xuICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZTogc3RyaW5nO1xuICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQ6IG51bWJlcjtcbiAgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2U6IHN0cmluZztcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xufTtcblxuLy8gT3ducyB0aGUgY3VycmVuY3kgYW5kIGV4Y2hhbmdlLXJhdGUgVUkgc28gdGhlIGhlYWRlciBmb3JtIHN0YXlzIGNvbXBhY3QuXG5jb25zdCBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb24gPSAoe1xuICBpbnRlcmFjdGlvbixcbiAgY3VycmVuY3lTdGF0ZSxcbiAgZXhwZW5zZUN1cnJlbmN5TGFiZWwsXG4gIGhlYWRlckN1cnJlbmN5Q29kZSxcbiAgYmFzZUN1cnJlbmN5Q29kZSxcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgZHJhZnRFeGNoYW5nZVJhdGUsXG4gIGV4Y2hhbmdlUmF0ZVZhbHVlLFxuICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSxcbiAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LFxuICBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZSxcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZSxcbiAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZSxcbn06IEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvblByb3BzKSA9PiB7XG4gIGNvbnN0IHsgaXNFZGl0aW5nLCBjYW5FZGl0SGVhZGVyRmllbGRzIH0gPSBpbnRlcmFjdGlvbjtcbiAgY29uc3QgeyBpc0ZvcmVpZ25DdXJyZW5jeSwgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcywgc2hvd0V4Y2hhbmdlUmF0ZSB9ID0gY3VycmVuY3lTdGF0ZTtcbiAgY29uc3QgbG9jYWxDdXJyZW5jeU9wdGlvbnMgPSBSZWFjdC51c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oXHJcbiAgICAoKSA9PiBbXHJcbiAgICAgIHtcclxuICAgICAgICB2YWx1ZTogYmFzZUN1cnJlbmN5Q29kZSxcclxuICAgICAgICB0ZXh0OiBiYXNlQ3VycmVuY3lDb2RlLFxyXG4gICAgICAgIGljb246IDxFeHBlbnNlQ3VycmVuY3lGbGFnSWNvbiBjdXJyZW5jeUNvZGU9e2Jhc2VDdXJyZW5jeUNvZGV9IHNpemVDbGFzc05hbWU9XCJoLTYgdy02XCIgLz4sXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgW2Jhc2VDdXJyZW5jeUNvZGVdXHJcbiAgKTtcclxuICBjb25zdCBoZWFkZXJDdXJyZW5jeU9wdGlvbnMgPSBSZWFjdC51c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oXHJcbiAgICAoKSA9PiBbXHJcbiAgICAgIHtcclxuICAgICAgICB2YWx1ZTogaGVhZGVyQ3VycmVuY3lDb2RlIHx8IFwiLVwiLFxyXG4gICAgICAgIHRleHQ6IGhlYWRlckN1cnJlbmN5Q29kZSB8fCBcIi1cIixcclxuICAgICAgICBpY29uOiA8RXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gY3VycmVuY3lDb2RlPXtoZWFkZXJDdXJyZW5jeUNvZGUgfHwgXCItXCJ9IHNpemVDbGFzc05hbWU9XCJoLTYgdy02XCIgLz4sXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgW2hlYWRlckN1cnJlbmN5Q29kZV1cclxuICApO1xyXG5cclxuICBpZiAoaXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHMpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBzcGFjZS15LTNcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGdyaWQgZ2FwLTQgJHtpc0ZvcmVpZ25DdXJyZW5jeSA/IFwiZ3JpZC1jb2xzLTJcIiA6IFwiZ3JpZC1jb2xzLTFcIn1gLnRyaW0oKX0+XHJcbiAgICAgICAgICB7aXNGb3JlaWduQ3VycmVuY3kgPyAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntleHBlbnNlQ3VycmVuY3lMYWJlbH08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgPEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdFxyXG4gICAgICAgICAgICAgICAgICBsYWJlbD17ZXhwZW5zZUN1cnJlbmN5TGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lfUGxhY2Vob2xkZXJcIiwgXCJDdXJyZW5jeSBjb2RlXCIpfVxyXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRDdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZyB8fCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cclxuICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmcgfHwgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXN9XHJcbiAgICAgICAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtaGVhZGVyLWN1cnJlbmN5XCJcclxuICAgICAgICAgICAgICAgICAgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHRcclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzcGFjZS15LTEuNVwiPlxyXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgcHItOCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0V4Y2hhbmdlUmF0ZVwiLCBcIkV4Y2hhbmdlIHJhdGVcIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxJbmZvUG9wb3Zlckljb25CdXR0b25cclxuICAgICAgICAgICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfSW5mb1BvcG92ZXJfQXJpYVwiLCBcIlNob3cgZXhjaGFuZ2UgcmF0ZSBpbmZvcm1hdGlvblwiKX1cclxuICAgICAgICAgICAgICAgICAgY29udGVudD17ZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2V9XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHJpZ2h0LTAgLXRvcC0xIHotMjBcIlxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvcm0tY29udHJvbCAke2V4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlID8gXCJib3JkZXItZGFuZ2VyIHJpbmctMSByaW5nLWRhbmdlclwiIDogXCJcIn0gJHtpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJcIn1gfVxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dE1vZGU9XCJkZWNpbWFsXCJcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRFeGNoYW5nZVJhdGV9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XHJcbiAgICAgICAgICAgICAgICAgICAgb25CbHVyPXsoZXZlbnQpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIoZXZlbnQudGFyZ2V0LnZhbHVlLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiA3LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogNyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxsYmFjazogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhjaGFuZ2VSYXRlXCIsIFwiRXhjaGFuZ2UgcmF0ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhjaGFuZ2VSYXRlXCIsIFwiRXhjaGFuZ2UgcmF0ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgICByZWFkT25seT17aXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzfVxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXN9XHJcbiAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8RXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0XHJcbiAgICAgICAgICAgICAgbGFiZWw9e2V4cGVuc2VDdXJyZW5jeUxhYmVsfVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lfUGxhY2Vob2xkZXJcIiwgXCJDdXJyZW5jeSBjb2RlXCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtkcmFmdEN1cnJlbmN5Q29kZX1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZX1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZyB8fCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cclxuICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZyB8fCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cclxuICAgICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLWhlYWRlci1jdXJyZW5jeVwiXHJcbiAgICAgICAgICAgICAgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHRcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgIHtpc0ZvcmVpZ25DdXJyZW5jeSA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtNFwiPlxyXG4gICAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfTG9jYWxDdXJyZW5jeVwiLCBcIkxvY2FsIGN1cnJlbmN5XCIpfVxyXG4gICAgICAgICAgICAgIG9wdGlvbnM9e2xvY2FsQ3VycmVuY3lPcHRpb25zfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtiYXNlQ3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeV9QbGFjZWhvbGRlclwiLCBcIkN1cnJlbmN5IGNvZGVcIil9XHJcbiAgICAgICAgICAgICAgcmVhZE9ubHlcclxuICAgICAgICAgICAgICBkaXNhYmxlZFxyXG4gICAgICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cclxuICAgICAgICAgICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cclxuICAgICAgICAgICAgICBzaG93TGFiZWxcclxuICAgICAgICAgICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxyXG4gICAgICAgICAgICAgIHNlbGVjdGVkVGV4dE1vZGU9XCJ2YWx1ZVwiXHJcbiAgICAgICAgICAgICAgZHJvcGRvd25NYXhIZWlnaHRDbGFzcz1cIm1heC1oLTk2XCJcclxuICAgICAgICAgICAgICBzZWxlY3RlZEljb25DbGFzc05hbWU9XCJoLTYgdy02XCJcclxuICAgICAgICAgICAgICBvcHRpb25JY29uQ2xhc3NOYW1lPVwiaC02IHctNlwiXHJcbiAgICAgICAgICAgICAgc2VsZWN0ZWRJbnB1dFBhZGRpbmdDbGFzc05hbWU9XCJwbC0xMlwiXHJcbiAgICAgICAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS1oZWFkZXItbG9jYWwtY3VycmVuY3lcIlxyXG4gICAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XHJcbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9BbW91bnRcIiwgXCJBbW91bnRcIil9PC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIGluZC1yZWFkb25seS1maWVsZFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQsIGJhc2VDdXJyZW5jeUNvZGUpfVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Ftb3VudFwiLCBcIkFtb3VudFwiKX1cbiAgICAgICAgICAgICAgICByZWFkT25seVxuICAgICAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgIHtpc0ZvcmVpZ25DdXJyZW5jeSAmJiBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSA/IDxwIGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyIHRleHQtc21cIj57ZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2V9PC9wPiA6IG51bGx9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKX1cclxuICAgICAgICBvcHRpb25zPXtoZWFkZXJDdXJyZW5jeU9wdGlvbnN9XHJcbiAgICAgICAgdmFsdWU9e2hlYWRlckN1cnJlbmN5Q29kZSB8fCBcIi1cIn1cclxuICAgICAgICBvbkNoYW5nZT17KCkgPT4gdW5kZWZpbmVkfVxyXG4gICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lfUGxhY2Vob2xkZXJcIiwgXCJDdXJyZW5jeSBjb2RlXCIpfVxyXG4gICAgICAgIHJlYWRPbmx5XHJcbiAgICAgICAgZGlzYWJsZWRcclxuICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XHJcbiAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XHJcbiAgICAgICAgc2hvd0xhYmVsXHJcbiAgICAgICAgdXNlUG9ydGFsPXtmYWxzZX1cclxuICAgICAgICBzZWxlY3RlZFRleHRNb2RlPVwidmFsdWVcIlxyXG4gICAgICAgIGRyb3Bkb3duTWF4SGVpZ2h0Q2xhc3M9XCJtYXgtaC05NlwiXHJcbiAgICAgICAgc2VsZWN0ZWRJY29uQ2xhc3NOYW1lPVwiaC02IHctNlwiXHJcbiAgICAgICAgb3B0aW9uSWNvbkNsYXNzTmFtZT1cImgtNiB3LTZcIlxyXG4gICAgICAgIHNlbGVjdGVkSW5wdXRQYWRkaW5nQ2xhc3NOYW1lPVwicGwtMTJcIlxyXG4gICAgICAgIGlkQmFzZT1cImV4cGVuc2UtaGVhZGVyLWN1cnJlbmN5LXJlYWRvbmx5XCJcclxuICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgLz5cclxuICAgICAgeyFpc0VkaXRpbmcgJiYgc2hvd0V4Y2hhbmdlUmF0ZSA/IChcclxuICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0V4Y2hhbmdlUmF0ZVwiLCBcIkV4Y2hhbmdlIHJhdGVcIil9IHZhbHVlPXtleGNoYW5nZVJhdGVWYWx1ZX0gLz5cclxuICAgICAgKSA6IG51bGx9XHJcbiAgICA8Lz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lTZWN0aW9uO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZUxheW91dEVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tIFwicmVhY3QtZG9tXCI7XHJcbmltcG9ydCB7IHVzZU91dHNpZGVDbGljayB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHNcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcblxyXG50eXBlIEluZm9Qb3BvdmVySWNvbkJ1dHRvblByb3BzID0ge1xyXG4gIGNvbnRlbnQ6IFJlYWN0LlJlYWN0Tm9kZTtcclxuICBhcmlhTGFiZWw6IHN0cmluZztcclxuICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG4vLyBTaGFyZWQgZHVtYiBwb3BvdmVyIHRyaWdnZXIgdXNlZCB0byBkaXNwbGF5IHNob3J0IGNvbnRleHR1YWwgaW5mby5cclxuY29uc3QgSW5mb1BvcG92ZXJJY29uQnV0dG9uID0gKHtcclxuICBjb250ZW50LFxyXG4gIGFyaWFMYWJlbCxcclxuICBjbGFzc05hbWUgPSBcIlwiLFxyXG4gIHBhbmVsQ2xhc3NOYW1lID0gXCJcIixcclxufTogSW5mb1BvcG92ZXJJY29uQnV0dG9uUHJvcHMpID0+IHtcclxuICBjb25zdCBIT1JJWk9OVEFMX1ZJRVdQT1JUX0dVVFRFUl9QWCA9IDg7XHJcbiAgY29uc3QgVkVSVElDQUxfVklFV1BPUlRfR1VUVEVSX1BYID0gODtcclxuICBjb25zdCBQQU5FTF9UUklHR0VSX0dBUF9QWCA9IDY7XHJcbiAgY29uc3QgR0xPQkFMX1JBRElVUyA9IFwidmFyKC0tcmFkaXVzLXhsLCA1cHgpXCI7XHJcbiAgY29uc3QgW2lzT3Blbiwgc2V0SXNPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbcGFuZWxTdHlsZSwgc2V0UGFuZWxTdHlsZV0gPSB1c2VTdGF0ZTxSZWFjdC5DU1NQcm9wZXJ0aWVzPih7XHJcbiAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxyXG4gICAgdG9wOiAwLFxyXG4gICAgbGVmdDogMCxcclxuICAgIHZpc2liaWxpdHk6IFwiaGlkZGVuXCIsXHJcbiAgfSk7XHJcbiAgY29uc3QgYnV0dG9uUmVmID0gdXNlUmVmPEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgcGFuZWxSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuXHJcbiAgdXNlT3V0c2lkZUNsaWNrKFtidXR0b25SZWYsIHBhbmVsUmVmXSwgKCkgPT4gc2V0SXNPcGVuKGZhbHNlKSk7XHJcbiAgY29uc3QgdXBkYXRlUGFuZWxQb3NpdGlvbiA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBidXR0b25FbGVtZW50ID0gYnV0dG9uUmVmLmN1cnJlbnQ7XHJcbiAgICBjb25zdCBwYW5lbEVsZW1lbnQgPSBwYW5lbFJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFidXR0b25FbGVtZW50IHx8ICFwYW5lbEVsZW1lbnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJ1dHRvblJlY3QgPSBidXR0b25FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3QgcGFuZWxSZWN0ID0gcGFuZWxFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3Qgdmlld3BvcnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgY29uc3Qgdmlld3BvcnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICBjb25zdCBzYWZlV2lkdGggPSBNYXRoLm1pbihwYW5lbFJlY3Qud2lkdGgsIE1hdGgubWF4KDE4MCwgdmlld3BvcnRXaWR0aCAtIEhPUklaT05UQUxfVklFV1BPUlRfR1VUVEVSX1BYICogMikpO1xyXG5cclxuICAgIGxldCBsZWZ0ID0gYnV0dG9uUmVjdC5sZWZ0ICsgYnV0dG9uUmVjdC53aWR0aCAvIDIgLSBzYWZlV2lkdGggLyAyO1xyXG4gICAgbGVmdCA9IE1hdGgubWF4KEhPUklaT05UQUxfVklFV1BPUlRfR1VUVEVSX1BYLCBNYXRoLm1pbihsZWZ0LCB2aWV3cG9ydFdpZHRoIC0gc2FmZVdpZHRoIC0gSE9SSVpPTlRBTF9WSUVXUE9SVF9HVVRURVJfUFgpKTtcclxuXHJcbiAgICBsZXQgdG9wID0gYnV0dG9uUmVjdC5ib3R0b20gKyBQQU5FTF9UUklHR0VSX0dBUF9QWDtcclxuICAgIGNvbnN0IGhhc0JvdHRvbU92ZXJmbG93ID0gdG9wICsgcGFuZWxSZWN0LmhlaWdodCArIFZFUlRJQ0FMX1ZJRVdQT1JUX0dVVFRFUl9QWCA+IHZpZXdwb3J0SGVpZ2h0O1xyXG4gICAgaWYgKGhhc0JvdHRvbU92ZXJmbG93KSB7XHJcbiAgICAgIGNvbnN0IHRvcEFib3ZlVHJpZ2dlciA9IGJ1dHRvblJlY3QudG9wIC0gcGFuZWxSZWN0LmhlaWdodCAtIFBBTkVMX1RSSUdHRVJfR0FQX1BYO1xyXG4gICAgICB0b3AgPSB0b3BBYm92ZVRyaWdnZXIgPj0gVkVSVElDQUxfVklFV1BPUlRfR1VUVEVSX1BYXHJcbiAgICAgICAgPyB0b3BBYm92ZVRyaWdnZXJcclxuICAgICAgICA6IE1hdGgubWF4KFZFUlRJQ0FMX1ZJRVdQT1JUX0dVVFRFUl9QWCwgdmlld3BvcnRIZWlnaHQgLSBwYW5lbFJlY3QuaGVpZ2h0IC0gVkVSVElDQUxfVklFV1BPUlRfR1VUVEVSX1BYKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRQYW5lbFN0eWxlKHtcclxuICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcclxuICAgICAgdG9wOiBNYXRoLnJvdW5kKHRvcCksXHJcbiAgICAgIGxlZnQ6IE1hdGgucm91bmQobGVmdCksXHJcbiAgICAgIHdpZHRoOiBNYXRoLnJvdW5kKHNhZmVXaWR0aCksXHJcbiAgICAgIHZpc2liaWxpdHk6IFwidmlzaWJsZVwiLFxyXG4gICAgfSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc09wZW4pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlUGFuZWxQb3NpdGlvbigpO1xyXG4gIH0sIFtpc09wZW4sIGNvbnRlbnQsIHVwZGF0ZVBhbmVsUG9zaXRpb25dKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaXNPcGVuKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGhhbmRsZVZpZXdwb3J0Q2hhbmdlID0gKCkgPT4gdXBkYXRlUGFuZWxQb3NpdGlvbigpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgaGFuZGxlVmlld3BvcnRDaGFuZ2UpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlVmlld3BvcnRDaGFuZ2UsIHRydWUpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgaGFuZGxlVmlld3BvcnRDaGFuZ2UpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVWaWV3cG9ydENoYW5nZSwgdHJ1ZSk7XHJcbiAgICB9O1xyXG4gIH0sIFtpc09wZW4sIHVwZGF0ZVBhbmVsUG9zaXRpb25dKTtcclxuXHJcbiAgY29uc3QgcG9ydGFsVGFyZ2V0ID0gdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiID8gbnVsbCA6IGRvY3VtZW50LmJvZHk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImlubGluZS1mbGV4XCIsIGNsYXNzTmFtZSl9PlxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAgcmVmPXtidXR0b25SZWZ9XHJcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsfVxyXG4gICAgICAgIGFyaWEtZXhwYW5kZWQ9e2lzT3Blbn1cclxuICAgICAgICBhcmlhLWhhc3BvcHVwPVwiZGlhbG9nXCJcclxuICAgICAgICBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBoLTYgdy02IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXRyYW5zcGFyZW50IGJnLXRyYW5zcGFyZW50IHAtMCB0ZXh0LXNsYXRlLTUwMCB0cmFuc2l0aW9uIGhvdmVyOnRleHQtcHJpbWFyeSBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5LzMwXCJcclxuICAgICAgICBzdHlsZT17eyBib3JkZXJSYWRpdXM6IEdMT0JBTF9SQURJVVMgfX1cclxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc09wZW4oKHByZXZpb3VzKSA9PiAhcHJldmlvdXMpfVxyXG4gICAgICA+XHJcbiAgICAgICAgPHN2Z1xyXG4gICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgICAgICB3aWR0aD1cIjIwXCJcclxuICAgICAgICAgIGhlaWdodD1cIjIwXCJcclxuICAgICAgICAgIHZpZXdCb3g9XCIzIDMgMTggMThcIlxyXG4gICAgICAgICAgZmlsbD1cIm5vbmVcIlxyXG4gICAgICAgICAgc3Ryb2tlPVwiIzY0NzQ4YlwiXHJcbiAgICAgICAgICBzdHJva2VXaWR0aD1cIjEuNzVcIlxyXG4gICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcclxuICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxyXG4gICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgICAgICAgIGNsYXNzTmFtZT1cImJsb2NrXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8cmVjdCB4PVwiNFwiIHk9XCI0XCIgd2lkdGg9XCIxNlwiIGhlaWdodD1cIjE2XCIgcng9XCIzXCIgcnk9XCIzXCIgLz5cclxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTIgOWguMDFcIiAvPlxyXG4gICAgICAgICAgPHBhdGggZD1cIk0xMSAxMmgxdjRoMVwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAge2lzT3BlbiAmJiBwb3J0YWxUYXJnZXRcclxuICAgICAgICA/IGNyZWF0ZVBvcnRhbChcclxuICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgIHJlZj17cGFuZWxSZWZ9XHJcbiAgICAgICAgICAgICAgcm9sZT1cImRpYWxvZ1wiXHJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgLi4ucGFuZWxTdHlsZSwgYm9yZGVyUmFkaXVzOiBHTE9CQUxfUkFESVVTIH19XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICAgICAgXCJ6LTM2MDAwMCBtaW4tdy1bMjIwcHhdIG1heC13LVtjYWxjKDEwMHZ3LTFyZW0pXSByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZSBwLTMgc2hhZG93LWxnXCIsXHJcbiAgICAgICAgICAgICAgICBwYW5lbENsYXNzTmFtZVxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMnB4XSB0ZXh0LXNsYXRlLTcwMCB3aGl0ZXNwYWNlLXByZS1saW5lXCI+e2NvbnRlbnR9PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj4sXHJcbiAgICAgICAgICAgIHBvcnRhbFRhcmdldFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgIDogbnVsbH1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBJbmZvUG9wb3Zlckljb25CdXR0b247XHJcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xyXG5cclxudHlwZSBFeGNoYW5nZVJhdGVNb2RlVWlNZXRhID0ge1xyXG4gIGxhYmVsS2V5OiBzdHJpbmc7XHJcbiAgZmFsbGJhY2s6IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IEVYQ0hBTkdFX1JBVEVfTU9ERV9NRVRBOiBSZWNvcmQ8RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDb2RlLCBFeGNoYW5nZVJhdGVNb2RlVWlNZXRhPiA9IHtcclxuICAwOiB7XHJcbiAgICBsYWJlbEtleTogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX09mZmljaWFsXCIsXHJcbiAgICBmYWxsYmFjazogXCJULkMuIE9maWNpYWxcIixcclxuICB9LFxyXG4gIDE6IHtcclxuICAgIGxhYmVsS2V5OiBcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0V4Y2hhbmdlUmF0ZU1vZGVfTWFudWFsXCIsXHJcbiAgICBmYWxsYmFjazogXCJULkMuIE1hbnVhbFwiLFxyXG4gIH0sXHJcbn07XHJcbmNvbnN0IEVYQ0hBTkdFX1JBVEVfTU9ERV9DT0RFUzogRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDb2RlW10gPSBbMCwgMV07XHJcblxyXG4vLyBLZWVwcyBleGNoYW5nZSByYXRlIG1vZGUgdmFsdWVzIGNvbnN0cmFpbmVkIHRvIG51bWVyaWMgMCBvciAxLlxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNvZGUgfCBudWxsID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIGlmIChwYXJzZWQgPT09IDAgfHwgcGFyc2VkID09PSAxKSB7XHJcbiAgICByZXR1cm4gcGFyc2VkO1xyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbi8vIEJ1aWxkcyBmaXhlZCBvcHRpb25zIGZvciB0aGUgZXhjaGFuZ2UgcmF0ZSBtb2RlIGZpbHRlci5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlT3B0aW9ucyA9ICgpOiBFeHBlbnNlU2VsZWN0T3B0aW9uW10gPT4ge1xyXG4gIHJldHVybiBFWENIQU5HRV9SQVRFX01PREVfQ09ERVNcclxuICAgIC5tYXAoKGNvZGUpID0+IHtcclxuICAgICAgY29uc3QgbWV0YSA9IEVYQ0hBTkdFX1JBVEVfTU9ERV9NRVRBW2NvZGVdO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHZhbHVlOiBTdHJpbmcoY29kZSksXHJcbiAgICAgICAgdGV4dDogaW5kVChtZXRhLmxhYmVsS2V5LCBtZXRhLmZhbGxiYWNrKSxcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLy8gUmV0dXJucyBhIGxvY2FsaXplZCBtb2RlIGxhYmVsIG9yIGVtcHR5IHRleHQgZm9yIG5vbi1zZWxlY3RlZCB2YWx1ZXMuXHJcbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGUodmFsdWUpO1xyXG4gIGlmIChub3JtYWxpemVkID09PSBudWxsKSByZXR1cm4gXCJcIjtcclxuICBjb25zdCBtZXRhID0gRVhDSEFOR0VfUkFURV9NT0RFX01FVEFbbm9ybWFsaXplZF07XHJcbiAgcmV0dXJuIGluZFQobWV0YS5sYWJlbEtleSwgbWV0YS5mYWxsYmFjayk7XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0SGVhZGVyIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lTZWN0aW9uIGZyb20gXCIuL0V4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvbi50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQgZnJvbSBcIi4vRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VSZWFkT25seUZpZWxkIGZyb20gXCIuL0V4cGVuc2VSZWFkT25seUZpZWxkLnRzeFwiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlU3RhdHVzTGFiZWwgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VTdGF0dXNDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlTGFiZWwgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4Y2hhbmdlUmF0ZUVudHJ5TW9kZUNhdGFsb2cudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZU51bWJlciwgcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybU1vZGUgPSB7XG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBjYW5FZGl0SGVhZGVyRmllbGRzOiBib29sZWFuO1xuICBzdGF0dXNDb21tZW50TW9kZTogXCJoaWRkZW5cIiB8IFwicmVhZFwiO1xufTtcblxudHlwZSBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeUxvY2tzID0ge1xuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogYm9vbGVhbjtcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xuICBzaG93RXhjaGFuZ2VSYXRlOiBib29sZWFuO1xufTtcblxudHlwZSBFeHBlbnNlU2hlZXRIZWFkZXJGb3JtUHJvcHMgPSB7XG4gIG1vZGU6IEV4cGVuc2VTaGVldEhlYWRlckZvcm1Nb2RlO1xuICBjdXJyZW5jeUxvY2tzOiBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeUxvY2tzO1xuICBoZWFkZXI6IEV4cGVuc2VTaGVldEhlYWRlcjtcbiAgcHJvamVjdFZhbHVlOiBzdHJpbmc7XG4gIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5OiBzdHJpbmc7XG4gIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeTogc3RyaW5nO1xuICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQ6IG51bWJlcjtcbiAgZXhjaGFuZ2VSYXRlVmFsdWU6IHN0cmluZztcbiAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2U6IHN0cmluZztcbiAgdG90YWxBbW91bnRUZXh0OiBzdHJpbmc7XHJcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGRyYWZ0UHJvamVjdElkOiBzdHJpbmc7XHJcbiAgZHJhZnRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBkcmFmdEV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWU6IHN0cmluZztcclxuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGU6IHN0cmluZztcclxuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZTogc3RyaW5nO1xyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdFByb2plY3RJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBFWENIQU5HRV9SQVRFX01PREVfUFJFRklYX1BBVFRFUk4gPSAvXlRcXC4/Q1xcLj9cXHMqL2k7XHJcblxyXG4vLyBQdXJlIHByZXNlbnRhdGlvbmFsIGhlYWRlciBmb3JtIGZvciBleHBlbnNlIHNoZWV0IGRldGFpbC9jcmVhdGUgc2NyZWVucy5cbmNvbnN0IEV4cGVuc2VTaGVldEhlYWRlckZvcm0gPSAoe1xuICBtb2RlLFxuICBjdXJyZW5jeUxvY2tzLFxuICBoZWFkZXIsXG4gIHByb2plY3RWYWx1ZSxcbiAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXG4gIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LFxuICBleGNoYW5nZVJhdGVWYWx1ZSxcbiAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXG4gIHRvdGFsQW1vdW50VGV4dCxcclxuICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gIGRyYWZ0UHJvamVjdElkLFxyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsXHJcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLFxyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlLFxyXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZSxcclxuICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlLFxyXG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2UsXG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2UsXG59OiBFeHBlbnNlU2hlZXRIZWFkZXJGb3JtUHJvcHMpID0+IHtcbiAgY29uc3QgeyBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgY2FuRWRpdEhlYWRlckZpZWxkcywgc3RhdHVzQ29tbWVudE1vZGUgfSA9IG1vZGU7XG4gIGNvbnN0IHsgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcywgc2hvd0V4Y2hhbmdlUmF0ZSB9ID0gY3VycmVuY3lMb2NrcztcbiAgY29uc3QgaXNGb3JlaWduQ3VycmVuY3kgPVxuICAgIGlzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzICYmIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5ICE9PSBcIlwiICYmIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5ICE9PSBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k7XHJcbiAgY29uc3QgZXhwZW5zZUN1cnJlbmN5TGFiZWwgPSBpc0ZvcmVpZ25DdXJyZW5jeVxyXG4gICAgPyBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9FeHBlbnNlQ3VycmVuY3lcIiwgXCJFeHBlbnNlIGN1cnJlbmN5XCIpXHJcbiAgICA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIik7XHJcbiAgY29uc3Qgc3RhdHVzVmFsdWUgPVxyXG4gICAgaGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gbnVsbCB8fCBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzID09PSB1bmRlZmluZWRcclxuICAgICAgPyBcIi1cIlxyXG4gICAgICA6IGdldEV4cGVuc2VTdGF0dXNMYWJlbChoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzKTtcclxuICBjb25zdCBoZWFkZXJDdXJyZW5jeUNvZGUgPSBzYWZlVGV4dChoZWFkZXIuY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpO1xyXG4gIGNvbnN0IGJhc2VDdXJyZW5jeUNvZGUgPSBzYWZlVGV4dChleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XHJcbiAgLy8gU3RhdHVzIGNvbW1lbnQgaXMgbm93IGVkaXRlZCBvbmx5IGluIHRoZSBzdGF0dXMgdHJhbnNpdGlvbiBwb3B1cC5cclxuICBjb25zdCBzdGF0dXNDb21tZW50VmFsdWUgPSBzYWZlVGV4dChoZWFkZXIuZXN0YWRvQ29tZW50YXJpb3MpO1xyXG4gIGNvbnN0IHNob3dTdGF0dXNDb21tZW50RmllbGQgPSAhaXNDcmVhdGVNb2RlICYmIHN0YXR1c0NvbW1lbnRNb2RlICE9PSBcImhpZGRlblwiO1xyXG4gIGNvbnN0IHBhcnNlZERyYWZ0RXhjaGFuZ2VSYXRlID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KGRyYWZ0RXhjaGFuZ2VSYXRlKTtcclxuICBjb25zdCBwYXJzZWRPZmZpY2lhbFJhd1JhdGUgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQob2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSk7XHJcbiAgY29uc3QgYmFzZUV4Y2hhbmdlUmF0ZVZhbHVlID1cclxuICAgIHBhcnNlZERyYWZ0RXhjaGFuZ2VSYXRlICE9IG51bGxcclxuICAgICAgPyBwYXJzZWREcmFmdEV4Y2hhbmdlUmF0ZVxyXG4gICAgICA6IHBhcnNlZE9mZmljaWFsUmF3UmF0ZSAhPSBudWxsXHJcbiAgICAgICAgPyBwYXJzZWRPZmZpY2lhbFJhd1JhdGUgKiBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnRcclxuICAgICAgICA6IG51bGw7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlSW5mb1ZhbHVlID0gZm9ybWF0RXhwZW5zZU51bWJlcihcclxuICAgIGJhc2VFeGNoYW5nZVJhdGVWYWx1ZSAhPSBudWxsID8gYmFzZUV4Y2hhbmdlUmF0ZVZhbHVlIC8gZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50IDogbnVsbCxcclxuICAgIHtcclxuICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiA3LFxyXG4gICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDcsXHJcbiAgICAgIHVzZUdyb3VwaW5nOiBmYWxzZSxcclxuICAgICAgZmFsbGJhY2s6IFwiMC4wMDAwMDAwXCIsXHJcbiAgICB9XHJcbiAgKTtcclxuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlVmFsdWUgPSBOdW1iZXIoaGVhZGVyLmV4Y2hhbmdlUmF0ZU1vZGUpID09PSAxID8gMSA6IDA7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlTW9kZUtleSA9XHJcbiAgICBleGNoYW5nZVJhdGVNb2RlVmFsdWUgPT09IDFcclxuICAgICAgPyBcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0V4Y2hhbmdlUmF0ZU1vZGVfTWFudWFsXCJcclxuICAgICAgOiBcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0V4Y2hhbmdlUmF0ZU1vZGVfT2ZmaWNpYWxcIjtcclxuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlRmFsbGJhY2sgPSBleGNoYW5nZVJhdGVNb2RlVmFsdWUgPT09IDEgPyBcIlQuQy4gTWFudWFsXCIgOiBcIlQuQy4gT2ZpY2lhbFwiO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCA9XHJcbiAgICAoZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVMYWJlbChleGNoYW5nZVJhdGVNb2RlVmFsdWUpIHx8IGluZFQoZXhjaGFuZ2VSYXRlTW9kZUtleSwgZXhjaGFuZ2VSYXRlTW9kZUZhbGxiYWNrKSlcclxuICAgICAgLnJlcGxhY2UoRVhDSEFOR0VfUkFURV9NT0RFX1BSRUZJWF9QQVRURVJOLCBcIlwiKVxyXG4gICAgICAudHJpbSgpXHJcbiAgICAgIC50b0xvd2VyQ2FzZSgpIHx8IChleGNoYW5nZVJhdGVNb2RlVmFsdWUgPT09IDEgPyBcIm1hbnVhbFwiIDogXCJvZmljaWFsXCIpO1xyXG4gIGNvbnN0IGhhc0VuZHBvaW50RXhjaGFuZ2VSYXRlRGF0YSA9XHJcbiAgICAhIXNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUpIHx8ICEhc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKSB8fCAhIXNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKTtcclxuICBjb25zdCBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9EYXRlID0gc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKSB8fCBpbmRUKFwiQ29tbW9uX05vdEF2YWlsYWJsZVwiLCBcIk4vQVwiKTtcclxuICBjb25zdCBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9Tb3VyY2UgPSBzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSlcclxuICAgIC5yZXBsYWNlKC9cXHMqXFwoW14oKV0qXFwpXFxzKi9nLCBcIiBcIilcclxuICAgIC5yZXBsYWNlKC9cXHN7Mix9L2csIFwiIFwiKVxyXG4gICAgLnRyaW0oKSB8fCBpbmRUKFwiQ29tbW9uX05vdEF2YWlsYWJsZVwiLCBcIk4vQVwiKTtcclxuICBjb25zdCBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlID0gaW5kRm9ybWF0KFxyXG4gICAgXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9JbmZvUG9wb3Zlcl9EZXRhaWxcIixcclxuICAgIFwiVGlwbyBkZSBjYW1iaW8gb2J0ZW5pZG8gezB9XFxuRmVjaGE6IHsxfVxcbk9yaWdlbjogezJ9XCIsXHJcbiAgICBzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKSB8fCBcIjAuMDAwMDAwMFwiLFxyXG4gICAgZW5kcG9pbnRFeGNoYW5nZVJhdGVJbmZvRGF0ZSxcclxuICAgIGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb1NvdXJjZVxyXG4gICk7XHJcbiAgY29uc3Qgc3RvcmVkRXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UgPSBpbmRGb3JtYXQoXHJcbiAgICBcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX0luZm9Qb3BvdmVyX1N0b3JlZFwiLFxyXG4gICAgXCJUaXBvIGRlIGNhbWJpbyB7MH0gezF9XCIsXHJcbiAgICBleGNoYW5nZVJhdGVNb2RlTGFiZWwsXHJcbiAgICBleGNoYW5nZVJhdGVJbmZvVmFsdWVcclxuICApO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlID0gaGFzRW5kcG9pbnRFeGNoYW5nZVJhdGVEYXRhID8gZW5kcG9pbnRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZSA6IHN0b3JlZEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicmVsYXRpdmUgc2hhZG93LXhzIGdsYXNzLXBhbmVsIHAtNCBzcGFjZS15LTQgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV1cIj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCI+XHJcbiAgICAgICAgeyFpc0NyZWF0ZU1vZGUgPyAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1NoZWV0SWRcIiwgXCJFeHBlbnNlIHNoZWV0IGNvZGVcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtzYWZlVGV4dChoZWFkZXIuaG9qYUdhc3Rvc0lkKSB8fCBcIi1cIn1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgeyFpc0NyZWF0ZU1vZGUgPyA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1N0YXR1c1wiLCBcIlN0YXR1c1wiKX0gdmFsdWU9e3N0YXR1c1ZhbHVlfSAvPiA6IG51bGx9XHJcbiAgICAgICAge3Nob3dTdGF0dXNDb21tZW50RmllbGQgPyAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1N0YXR1c0NvbW1lbnRcIiwgXCJTdGF0dXMgY29tbWVudFwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e3N0YXR1c0NvbW1lbnRWYWx1ZSB8fCBcIi1cIn1cclxuICAgICAgICAgICAgZnVsbFdpZHRoXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgIHtpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkcyA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBzcGFjZS15LTEuNVwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcclxuICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnREZXNjcmlwdGlvbn1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxyXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17c2FmZVRleHQoaGVhZGVyLmRlc2NyaXB0aW9uKSB8fCBcIi1cIn1cclxuICAgICAgICAgICAgZnVsbFdpZHRoXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICl9XHJcbiAgICAgICAge2lzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzID8gKFxyXG4gICAgICAgICAgPEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1Byb2plY3RfUGxhY2Vob2xkZXJcIiwgXCJQcm9qZWN0IGlkXCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17ZHJhZnRQcm9qZWN0SWR9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0UHJvamVjdElkQ2hhbmdlfVxyXG4gICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZyB8fCAhY2FuRWRpdEhlYWRlckZpZWxkc31cclxuICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmcgfHwgIWNhbkVkaXRIZWFkZXJGaWVsZHN9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICkgOiBwcm9qZWN0VmFsdWUgPyAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfSB2YWx1ZT17cHJvamVjdFZhbHVlfSAvPlxyXG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICA8RXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lTZWN0aW9uXG4gICAgICAgICAgaW50ZXJhY3Rpb249e3sgaXNFZGl0aW5nLCBjYW5FZGl0SGVhZGVyRmllbGRzIH19XG4gICAgICAgICAgY3VycmVuY3lTdGF0ZT17eyBpc0ZvcmVpZ25DdXJyZW5jeSwgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcywgc2hvd0V4Y2hhbmdlUmF0ZSB9fVxuICAgICAgICAgIGV4cGVuc2VDdXJyZW5jeUxhYmVsPXtleHBlbnNlQ3VycmVuY3lMYWJlbH1cbiAgICAgICAgICBoZWFkZXJDdXJyZW5jeUNvZGU9e2hlYWRlckN1cnJlbmN5Q29kZX1cbiAgICAgICAgICBiYXNlQ3VycmVuY3lDb2RlPXtiYXNlQ3VycmVuY3lDb2RlfVxuICAgICAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlPXtkcmFmdEN1cnJlbmN5Q29kZX1cclxuICAgICAgICAgIGRyYWZ0RXhjaGFuZ2VSYXRlPXtkcmFmdEV4Y2hhbmdlUmF0ZX1cclxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZVZhbHVlPXtleGNoYW5nZVJhdGVWYWx1ZX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZT17ZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2V9XG4gICAgICAgICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50PXtleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnR9XG4gICAgICAgICAgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2U9e2V4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlfVxuICAgICAgICAgIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U9e29uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2V9XG4gICAgICAgICAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZT17b25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZX1cbiAgICAgICAgLz5cclxuICAgICAgICB7IWlzQ3JlYXRlTW9kZSA/IDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVG90YWxBbW91bnRcIiwgXCJUb3RhbCBhbW91bnRcIil9IHZhbHVlPXt0b3RhbEFtb3VudFRleHR9IC8+IDogbnVsbH1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldEhlYWRlckZvcm07XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBDb21wYWN0UGFnaW5hdGlvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbXBhY3RQYWdpbmF0aW9uLnRzeFwiO1xyXG5pbXBvcnQgeyBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kgfSBmcm9tIFwiLi4vZXhwZW5zZUZvcm1hdHRlcnMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzLCBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVNlY3Rpb25EaXZpZGVyIGZyb20gXCIuL0V4cGVuc2VTZWN0aW9uRGl2aWRlci50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VUaW1lbGluZUNhcmQgZnJvbSBcIi4vRXhwZW5zZVRpbWVsaW5lQ2FyZC50c3hcIjtcclxuXHJcbnR5cGUgUGFnaW5hdGlvbkxhYmVscyA9IHtcclxuICBmaXJzdDogc3RyaW5nO1xyXG4gIHByZXY6IHN0cmluZztcclxuICBuZXh0OiBzdHJpbmc7XHJcbiAgbGFzdDogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlTGluZXNUaW1lbGluZVByb3BzID0ge1xyXG4gIHZpc2libGVMaW5lczogRXhwZW5zZVNoZWV0TGluZVtdO1xyXG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIHRvdGFsTGluZVBhZ2VzOiBudW1iZXI7XHJcbiAgbGluZVBhZ2U6IG51bWJlcjtcclxuICBsaW5lc0xhYmVsOiBzdHJpbmc7XHJcbiAgZW1wdHlUZXh0OiBzdHJpbmc7XHJcbiAgcGFnaW5hdGlvbkxhYmVsczogUGFnaW5hdGlvbkxhYmVscztcclxuICBjb250YWluZXJSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gIG9uTGluZVBhZ2VDaGFuZ2U6IChwYWdlOiBudW1iZXIpID0+IHZvaWQ7XHJcbiAgb25PcGVuTGluZTogKGxpbmVSZWNJZDogc3RyaW5nKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gRHVtYiB0aW1lbGluZSBmb3IgZXhwZW5zZSBzaGVldCBsaW5lcyB3aXRoIHN0YW5kYXJkIGNhcmQgYW5kIHBhZ2luYXRpb24gbGF5b3V0LlxyXG5jb25zdCBFeHBlbnNlTGluZXNUaW1lbGluZSA9ICh7XHJcbiAgdmlzaWJsZUxpbmVzLFxyXG4gIGN1cnJlbmN5Q29kZSxcclxuICB0b3RhbExpbmVQYWdlcyxcclxuICBsaW5lUGFnZSxcclxuICBsaW5lc0xhYmVsLFxyXG4gIGVtcHR5VGV4dCxcclxuICBwYWdpbmF0aW9uTGFiZWxzLFxyXG4gIGNvbnRhaW5lclJlZixcclxuICBvbkxpbmVQYWdlQ2hhbmdlLFxyXG4gIG9uT3BlbkxpbmUsXHJcbn06IEV4cGVuc2VMaW5lc1RpbWVsaW5lUHJvcHMpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic3BhY2UteS0wXCI+XHJcbiAgICAgIDxFeHBlbnNlU2VjdGlvbkRpdmlkZXIgbGFiZWw9e2xpbmVzTGFiZWx9IGNsYXNzTmFtZT1cImV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyLS1zcGFjZWRcIiAvPlxyXG5cclxuICAgICAge3Zpc2libGVMaW5lcy5sZW5ndGggPT09IDAgPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3ggdGltZWxpbmUtZW1wdHlcIiBkYXRhLWVtcHR5LXRleHQ9e2VtcHR5VGV4dH0gLz5cclxuICAgICAgKSA6IChcclxuICAgICAgICA8ZGl2IHJlZj17Y29udGFpbmVyUmVmfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3hcIj5cclxuICAgICAgICAgIHt2aXNpYmxlTGluZXMubWFwKChsaW5lLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBsaW5lSWQgPSBzYWZlVGV4dChsaW5lLmxpbmVSZWNJZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gc2FmZVRleHQobGluZS5kZXNjcmlwdGlvbik7XHJcbiAgICAgICAgICAgIGNvbnN0IGFtb3VudFRleHQgPSBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kobGluZS5hbW91bnQgPz8gbnVsbCwgY3VycmVuY3lDb2RlKTtcclxuICAgICAgICAgICAgY29uc3QgbGlua2VkVGlja2V0RmlsZUlkID0gc2FmZVRleHQobGluZS5maWxlSWQpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRlUGFydHMgPSBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzKHNhZmVUZXh0KGxpbmUudHJhbnNEYXRlKSwgZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCIpO1xyXG4gICAgICAgICAgICBjb25zdCB0aWNrZXRTdGF0dXNJY29uID0gbGlua2VkVGlja2V0RmlsZUlkID8gKFxyXG4gICAgICAgICAgICAgIDxzdmdcclxuICAgICAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICAgICAgICAgICAgZmlsbD1cIm5vbmVcIlxyXG4gICAgICAgICAgICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXHJcbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD17MS41fVxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtNCB3LTRcIlxyXG4gICAgICAgICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcclxuICAgICAgICAgICAgICAgICAgZD1cIk0xMy4xOSA4LjY4OGE0LjUgNC41IDAgMCAxIDEuMjQyIDcuMjQ0bC00LjUgNC41YTQuNSA0LjUgMCAwIDEtNi4zNjQtNi4zNjRsMS43NTctMS43NTdtMTMuMzUtLjYyMiAxLjc1Ny0xLjc1N2E0LjUgNC41IDAgMCAwLTYuMzY0LTYuMzY0bC00LjUgNC41YTQuNSA0LjUgMCAwIDAgMS4yNDIgNy4yNDRcIlxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgKSA6IG51bGw7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtgJHtsaW5lSWR9LSR7aW5kZXh9YH0gY2xhc3NOYW1lPVwidGltZWxpbmUtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgPEV4cGVuc2VUaW1lbGluZUNhcmRcclxuICAgICAgICAgICAgICAgICAgZGF0ZVBhcnRzPXtkYXRlUGFydHN9XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPXtkZXNjcmlwdGlvbiB8fCBsaW5lSWQgfHwgXCItXCJ9XHJcbiAgICAgICAgICAgICAgICAgIGFtb3VudFRleHQ9e2Ftb3VudFRleHR9XHJcbiAgICAgICAgICAgICAgICAgIG9uT3Blbj17KCkgPT4gb25PcGVuTGluZShsaW5lSWQpfVxyXG4gICAgICAgICAgICAgICAgICB0aXRsZUNsYXNzTmFtZT1cInRpbWVsaW5lLW5hbWUgZXhwZW5zZS1saW5lLWNhcmRfX3RpdGxlXCJcclxuICAgICAgICAgICAgICAgICAgc3RhdHVzSWNvbj17dGlja2V0U3RhdHVzSWNvbn1cclxuICAgICAgICAgICAgICAgICAgc3RhdHVzSWNvbkNsYXNzTmFtZT1cImV4cGVuc2UtbGluZS1jYXJkX190aWNrZXQtaWNvblwiXHJcbiAgICAgICAgICAgICAgICAgIHN0YXR1c0xhYmVsPXtsaW5rZWRUaWNrZXRGaWxlSWQgfHwgdW5kZWZpbmVkfVxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG5cclxuICAgICAgPENvbXBhY3RQYWdpbmF0aW9uXHJcbiAgICAgICAgdG90YWxQYWdlcz17dG90YWxMaW5lUGFnZXN9XHJcbiAgICAgICAgY3VycmVudFBhZ2U9e2xpbmVQYWdlfVxyXG4gICAgICAgIG9uUGFnZUNoYW5nZT17b25MaW5lUGFnZUNoYW5nZX1cclxuICAgICAgICBsYWJlbHM9e3BhZ2luYXRpb25MYWJlbHN9XHJcbiAgICAgIC8+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VMaW5lc1RpbWVsaW5lO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUGFnZUJvdHRvbUFjdGlvbnMsIHsgUGFnZUJvdHRvbUFjdGlvbkJ1dHRvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvUGFnZUJvdHRvbUFjdGlvbnMudHN4XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbiB9IGZyb20gXCIuL2V4cGVuc2VTaGVldERldGFpbFBvbGljeS50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25CYXJQcm9wcyA9IHtcclxuICBhY3Rpb25zOiBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25bXTtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICBvbkFjdGlvbkNsaWNrOiAoYWN0aW9uOiBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb24pID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIHRoZSBib3R0b20gdG9vbGJhciBmb3IgZXhwZW5zZSBzaGVldCBzdGF0dXMgdHJhbnNpdGlvbnMuXHJcbmNvbnN0IEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbkJhciA9ICh7IGFjdGlvbnMsIGJ1c3ksIGRpc2FibGVkID0gZmFsc2UsIG9uQWN0aW9uQ2xpY2sgfTogRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyUHJvcHMpID0+IHtcclxuICBpZiAoYWN0aW9ucy5sZW5ndGggPCAxKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8UGFnZUJvdHRvbUFjdGlvbnMgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19Cb3R0b21BY3Rpb25zX1Rvb2xiYXJcIiwgXCJFeHBlbnNlIHNoZWV0IHN0YXR1cyBhY3Rpb25zXCIpfT5cclxuICAgICAge2FjdGlvbnMubWFwKChhY3Rpb24pID0+IChcclxuICAgICAgICA8UGFnZUJvdHRvbUFjdGlvbkJ1dHRvblxyXG4gICAgICAgICAga2V5PXthY3Rpb24uaWR9XHJcbiAgICAgICAgICBsYWJlbD17aW5kVChhY3Rpb24ubGFiZWxLZXksIGFjdGlvbi5mYWxsYmFjayl9XHJcbiAgICAgICAgICBkaXNhYmxlZD17YnVzeSB8fCBkaXNhYmxlZH1cclxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uQWN0aW9uQ2xpY2soYWN0aW9uKX1cclxuICAgICAgICAvPlxyXG4gICAgICApKX1cclxuICAgIDwvUGFnZUJvdHRvbUFjdGlvbnM+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbkJhcjtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbmZpcm1Nb2RhbC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VRdWlja1RpY2tldFByb2dyZXNzT3ZlcmxheSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlUXVpY2tUaWNrZXRQcm9ncmVzc092ZXJsYXkudHN4XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBUSUNLRVRfSU1BR0VfQUNDRVBUX0FUVFJJQlVURSB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvd0NvcmUudHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXNQcm9wcyA9IHtcclxuICBtb2RhbDoge1xyXG4gICAgb3BlbjogYm9vbGVhbjtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBjb25maXJtVGV4dD86IHN0cmluZztcclxuICAgIGNhbmNlbFRleHQ/OiBzdHJpbmc7XHJcbiAgICBzaG93Q2FuY2VsPzogYm9vbGVhbjtcclxuICAgIHNob3dDb25maXJtPzogYm9vbGVhbjtcclxuICB9O1xyXG4gIG1vZGFsRXJyb3I6IHN0cmluZztcclxuICBzdGF0dXM6IHN0cmluZztcclxuICBidXN5OiBib29sZWFuO1xyXG4gIGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZTogYm9vbGVhbjtcclxuICBtb2RhbExvYWRpbmdUZXh0OiBzdHJpbmc7XHJcbiAgbW9kYWxDYW5jZWxUZXh0OiBzdHJpbmc7XHJcbiAgbW9kYWxDb25maXJtVGV4dDogc3RyaW5nO1xyXG4gIG1vZGFsQm9keT86IFJlYWN0LlJlYWN0Tm9kZTtcclxuICBjYW1lcmFJbnB1dFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPjtcclxuICBnYWxsZXJ5SW5wdXRSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XHJcbiAgc291cmNlUGlja2VyT3BlbjogYm9vbGVhbjtcclxuICBxdWlja1RpY2tldEJ1c3k6IGJvb2xlYW47XHJcbiAgcXVpY2tUaWNrZXRQcm9ncmVzc01lc3NhZ2U6IHN0cmluZztcclxuICBxdWlja1RpY2tldFByb2dyZXNzU3RhZ2VzOiBBcnJheTx7XHJcbiAgICBrZXk6IHN0cmluZztcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gICAgc3RhdGU6IFwiY29tcGxldGVkXCIgfCBcImFjdGl2ZVwiIHwgXCJwZW5kaW5nXCI7XHJcbiAgfT47XHJcbiAgcXVpY2tUaWNrZXRFbGFwc2VkTXM6IG51bWJlcjtcclxuICBxdWlja1RpY2tldEVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG4gIHF1aWNrVGlja2V0QXR0ZW1wdElkOiBzdHJpbmc7XHJcbiAgcXVpY2tUaWNrZXRUcmFjZUxpc3Q6IEFycmF5PHsgc3RlcDogc3RyaW5nOyB0cmFjZUlkOiBzdHJpbmc7IGF0OiBzdHJpbmcgfT47XHJcbiAgaGFzUGVuZGluZ1VwbG9hZFJldHJ5OiBib29sZWFuO1xyXG4gIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlOiBib29sZWFuO1xyXG4gIG9uQ29uZmlybTogKCkgPT4gdm9pZDtcclxuICBvbkNhbmNlbDogKCkgPT4gdm9pZDtcclxuICBvblNlbGVjdGVkQ2FtZXJhRmlsZTogKGZpbGU6IEZpbGUgfCBudWxsKSA9PiB2b2lkO1xyXG4gIG9uU2VsZWN0ZWRHYWxsZXJ5RmlsZTogKGZpbGU6IEZpbGUgfCBudWxsKSA9PiB2b2lkO1xyXG4gIG9uU2VsZWN0RnJvbUNhbWVyYTogKCkgPT4gdm9pZDtcclxuICBvblNlbGVjdEZyb21HYWxsZXJ5OiAoKSA9PiB2b2lkO1xuICBvbkNsb3NlU291cmNlUGlja2VyOiAoKSA9PiB2b2lkO1xuICBvblJldHJ5UGVuZGluZ1VwbG9hZDogKCkgPT4gdm9pZDtcbiAgb25DbGVhclF1aWNrVGlja2V0RXJyb3I6ICgpID0+IHZvaWQ7XG59O1xuXHJcbi8vIFJlbmRlcnMgbW9kYWwgYW5kIHF1aWNrLXRpY2tldCBvdmVybGF5cyBmb3IgdGhlIGV4cGVuc2Ugc2hlZXQgZGV0YWlsIHBhZ2UuXHJcbmNvbnN0IEV4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzID0gKHtcclxuICBtb2RhbCxcclxuICBtb2RhbEVycm9yLFxyXG4gIHN0YXR1cyxcclxuICBidXN5LFxyXG4gIGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSxcclxuICBtb2RhbExvYWRpbmdUZXh0LFxyXG4gIG1vZGFsQ2FuY2VsVGV4dCxcclxuICBtb2RhbENvbmZpcm1UZXh0LFxyXG4gIG1vZGFsQm9keSxcclxuICBjYW1lcmFJbnB1dFJlZixcclxuICBnYWxsZXJ5SW5wdXRSZWYsXHJcbiAgc291cmNlUGlja2VyT3BlbixcclxuICBxdWlja1RpY2tldEJ1c3ksXHJcbiAgcXVpY2tUaWNrZXRQcm9ncmVzc01lc3NhZ2UsXHJcbiAgcXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlcyxcclxuICBxdWlja1RpY2tldEVsYXBzZWRNcyxcclxuICBxdWlja1RpY2tldEVycm9yTWVzc2FnZSxcclxuICBxdWlja1RpY2tldEF0dGVtcHRJZCxcclxuICBxdWlja1RpY2tldFRyYWNlTGlzdCxcclxuICBoYXNQZW5kaW5nVXBsb2FkUmV0cnksXHJcbiAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmUsXHJcbiAgb25Db25maXJtLFxyXG4gIG9uQ2FuY2VsLFxyXG4gIG9uU2VsZWN0ZWRDYW1lcmFGaWxlLFxyXG4gIG9uU2VsZWN0ZWRHYWxsZXJ5RmlsZSxcclxuICBvblNlbGVjdEZyb21DYW1lcmEsXHJcbiAgb25TZWxlY3RGcm9tR2FsbGVyeSxcbiAgb25DbG9zZVNvdXJjZVBpY2tlcixcbiAgb25SZXRyeVBlbmRpbmdVcGxvYWQsXG4gIG9uQ2xlYXJRdWlja1RpY2tldEVycm9yLFxufTogRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXNQcm9wcykgPT4ge1xuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPENvbmZpcm1Nb2RhbFxyXG4gICAgICAgIG9wZW49e21vZGFsLm9wZW59XHJcbiAgICAgICAgdGl0bGU9e21vZGFsLnRpdGxlfVxyXG4gICAgICAgIG1lc3NhZ2U9e21vZGFsLm1lc3NhZ2V9XHJcbiAgICAgICAgY29uZmlybVRleHQ9e21vZGFsQ29uZmlybVRleHR9XHJcbiAgICAgICAgY2FuY2VsVGV4dD17bW9kYWxDYW5jZWxUZXh0fVxyXG4gICAgICAgIGxvYWRpbmdUZXh0PXttb2RhbExvYWRpbmdUZXh0fVxyXG4gICAgICAgIHNob3dDYW5jZWw9e21vZGFsLnNob3dDYW5jZWx9XHJcbiAgICAgICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxyXG4gICAgICAgIGJ1c3k9e2J1c3kgfHwgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlfVxyXG4gICAgICAgIGVycm9yPXttb2RhbEVycm9yfVxyXG4gICAgICAgIHN0YXR1cz17c3RhdHVzfVxyXG4gICAgICAgIG9uQ29uZmlybT17b25Db25maXJtfVxyXG4gICAgICAgIG9uQ2FuY2VsPXtvbkNhbmNlbH1cclxuICAgICAgPlxyXG4gICAgICAgIHttb2RhbEJvZHl9XHJcbiAgICAgIDwvQ29uZmlybU1vZGFsPlxyXG5cclxuICAgICAgPGlucHV0XHJcbiAgICAgICAgcmVmPXtjYW1lcmFJbnB1dFJlZn1cclxuICAgICAgICB0eXBlPVwiZmlsZVwiXHJcbiAgICAgICAgYWNjZXB0PXtUSUNLRVRfSU1BR0VfQUNDRVBUX0FUVFJJQlVURX1cclxuICAgICAgICBjYXB0dXJlPVwiZW52aXJvbm1lbnRcIlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXHJcbiAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZmlsZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZmlsZXM/LlswXSB8fCBudWxsO1xyXG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICBvblNlbGVjdGVkQ2FtZXJhRmlsZShmaWxlKTtcclxuICAgICAgICB9fVxyXG4gICAgICAvPlxyXG5cclxuICAgICAgPGlucHV0XHJcbiAgICAgICAgcmVmPXtnYWxsZXJ5SW5wdXRSZWZ9XHJcbiAgICAgICAgdHlwZT1cImZpbGVcIlxyXG4gICAgICAgIGFjY2VwdD17VElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEV9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcclxuICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBmaWxlID0gZXZlbnQuY3VycmVudFRhcmdldC5maWxlcz8uWzBdIHx8IG51bGw7XHJcbiAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlID0gXCJcIjtcclxuICAgICAgICAgIG9uU2VsZWN0ZWRHYWxsZXJ5RmlsZShmaWxlKTtcclxuICAgICAgICB9fVxyXG4gICAgICAvPlxyXG5cclxuICAgICAge3NvdXJjZVBpY2tlck9wZW4gPyAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNjAwMDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTk1MC80NSBweC00IHB5LTZcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LXNtIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHAtNCBzaGFkb3cteGxcIj5cclxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtWzE2cHhdIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS04MDBcIj5cclxuICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9UaXRsZVwiLCBcIk51ZXZvIHRpY2tldFwiKX1cclxuICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgICAge2luZFQoXHJcbiAgICAgICAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9Cb2R5XCIsXHJcbiAgICAgICAgICAgICAgICBcIlNlbGVjY2lvbmEgdW5hIGZ1ZW50ZSBwYXJhIGNhcHR1cmFyIG8gZWxlZ2lyIGxhIGltYWdlbiBkZWwgdGlja2V0LlwiXHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPC9wPlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IGdyaWQgZ3JpZC1jb2xzLTEgZ2FwLTJcIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIiBvbkNsaWNrPXtvblNlbGVjdEZyb21DYW1lcmF9PlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfQ2FtZXJhXCIsIFwiVXNhciBjXHUwMEUxbWFyYVwiKX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIiBvbkNsaWNrPXtvblNlbGVjdEZyb21HYWxsZXJ5fT5cclxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX0dhbGxlcnlcIiwgXCJFbGVnaXIgaW1hZ2VuXCIpfVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiIG9uQ2xpY2s9e29uQ2xvc2VTb3VyY2VQaWNrZXJ9PlxyXG4gICAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fQ2FuY2VsXCIsIFwiQ2FuY2VsXCIpfVxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIDxFeHBlbnNlUXVpY2tUaWNrZXRQcm9ncmVzc092ZXJsYXlcclxuICAgICAgICBvcGVuPXtxdWlja1RpY2tldEJ1c3l9XHJcbiAgICAgICAgdGl0bGU9e2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19UaXRsZVwiLCBcIlByb2Nlc3NpbmcgdGlja2V0XCIpfVxyXG4gICAgICAgIHN1bW1hcnk9e3F1aWNrVGlja2V0UHJvZ3Jlc3NNZXNzYWdlIHx8IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgICAgZWxhcHNlZE1zPXtxdWlja1RpY2tldEVsYXBzZWRNc31cclxuICAgICAgICBzdGFnZXM9e3F1aWNrVGlja2V0UHJvZ3Jlc3NTdGFnZXN9XHJcbiAgICAgIC8+XHJcblxyXG4gICAgICB7cXVpY2tUaWNrZXRFcnJvck1lc3NhZ2UgPyAoXHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtcclxuICAgICAgICAgICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmVcclxuICAgICAgICAgICAgICA/IFwiZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgc3BhY2UteS0yIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItYW1iZXItMjAwIGJnLWFtYmVyLTUwIHAtMyB0ZXh0LXNtIHRleHQtYW1iZXItOTAwXCJcclxuICAgICAgICAgICAgICA6IFwiZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgc3BhY2UteS0yIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctcm9zZS01MCBwLTMgdGV4dC1zbSB0ZXh0LXJvc2UtODAwXCJcclxuICAgICAgICAgIH1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8cD57cXVpY2tUaWNrZXRFcnJvck1lc3NhZ2V9PC9wPlxyXG4gICAgICAgICAge3F1aWNrVGlja2V0QXR0ZW1wdElkID8gKFxyXG4gICAgICAgICAgICA8cFxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17XHJcbiAgICAgICAgICAgICAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZVxyXG4gICAgICAgICAgICAgICAgICA/IFwicm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1hbWJlci0yMDAgYmctd2hpdGUgcHgtMiBweS0xIGZvbnQtbW9ubyB0ZXh0LVsxMXB4XSB0ZXh0LWFtYmVyLTkwMCBicmVhay1hbGxcIlxyXG4gICAgICAgICAgICAgICAgICA6IFwicm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy13aGl0ZSBweC0yIHB5LTEgZm9udC1tb25vIHRleHQtWzExcHhdIHRleHQtcm9zZS04MDAgYnJlYWstYWxsXCJcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7YGF0dGVtcHRJZDogJHtxdWlja1RpY2tldEF0dGVtcHRJZH1gfVxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgIHtxdWlja1RpY2tldFRyYWNlTGlzdC5sZW5ndGggPiAwID8gKFxyXG4gICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcclxuICAgICAgICAgICAgICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlXHJcbiAgICAgICAgICAgICAgICAgID8gXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLWFtYmVyLTIwMCBiZy13aGl0ZSBwLTIgdGV4dC14cyB0ZXh0LWFtYmVyLTgwMFwiXHJcbiAgICAgICAgICAgICAgICAgIDogXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXdoaXRlIHAtMiB0ZXh0LXhzIHRleHQtcm9zZS03MDBcIlxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtxdWlja1RpY2tldFRyYWNlTGlzdC5tYXAoKGVudHJ5KSA9PiAoXHJcbiAgICAgICAgICAgICAgICA8cCBrZXk9e2Ake2VudHJ5LnN0ZXB9LSR7ZW50cnkuYXR9YH0+e2Ake2VudHJ5LnN0ZXB9OiAke2VudHJ5LnRyYWNlSWR9YH08L3A+XHJcbiAgICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMlwiPlxuICAgICAgICAgICAge2hhc1BlbmRpbmdVcGxvYWRSZXRyeSA/IChcbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gcHgtMyBweS0xLjUgdGV4dC14c1wiIG9uQ2xpY2s9e29uUmV0cnlQZW5kaW5nVXBsb2FkfT5cbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1JldHJ5VXBsb2FkXCIsIFwiUmVpbnRlbnRhciB1cGxvYWRcIil9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gcHgtMyBweS0xLjUgdGV4dC14c1wiIG9uQ2xpY2s9e29uQ2xlYXJRdWlja1RpY2tldEVycm9yfT5cclxuICAgICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9DbG9zZVwiLCBcIkNsb3NlXCIpfVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuICAgIDwvPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXREZXRhaWxPdmVybGF5cztcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW0gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nQWN0aW9uQnV0dG9uLnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VBdXRoQ29udGV4dCB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xyXG5pbXBvcnQgeyB1c2VUaW1lbGluZUNhcmRFZmZlY3RzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRpbWVsaW5lQ2FyZEVmZmVjdHMudHNcIjtcclxuaW1wb3J0IHsgdXNlQ29uZmlybURpYWxvZyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VDb25maXJtRGlhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgaW5kRm9ybWF0LCBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kgfSBmcm9tIFwiLi4vZXhwZW5zZUZvcm1hdHRlcnMudHNcIjtcbmltcG9ydCB7IGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IGlzTWFuYWdpbmdPdGhlckV4cGVuc2VSZWNvcmQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU1hbmFnZWRVc2VyU2NvcGUudHNcIjtcclxuaW1wb3J0IHsgbmF2aWdhdGVUb0V4cGVuc2VVcmwsIHJlbG9hZEV4cGVuc2VQYWdlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XHJcbmltcG9ydCB7IHNhdmVFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dC50c1wiO1xyXG5pbXBvcnQgeyBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQudHNcIjtcclxuaW1wb3J0IHsgZ2V0RXhwZW5zZVN0YXR1c0xhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlU3RhdHVzQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9ucyB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZS50c1wiO1xyXG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlIH0gZnJvbSBcIi4uL2xpc3QvdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlLnRzXCI7XHJcblxyXG5jb25zdCBMSU5FU19QQUdFX1NJWkUgPSA2O1xyXG5jb25zdCBFWFBFTlNFX1NUQVRVU19BUFBST1ZBTF9SRVFVRVNURUQgPSAxO1xyXG5cclxuY29uc3QgcGFnZWRTbGljZSA9IDxULD4oaXRlbXM6IFRbXSwgcGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyKTogVFtdID0+IHtcclxuICBpZiAoIWl0ZW1zLmxlbmd0aCkgcmV0dXJuIFtdO1xyXG4gIGNvbnN0IHNhZmVQYWdlID0gTWF0aC5tYXgoMSwgcGFnZSk7XHJcbiAgY29uc3Qgc3RhcnQgPSAoc2FmZVBhZ2UgLSAxKSAqIHBhZ2VTaXplO1xyXG4gIHJldHVybiBpdGVtcy5zbGljZShzdGFydCwgc3RhcnQgKyBwYWdlU2l6ZSk7XHJcbn07XHJcblxyXG4vLyBUcmVhdHMgb25seSBwb3NpdGl2ZSBudW1lcmljIHRvdGFscyBhcyBhY3Rpb25hYmxlIHNoZWV0IGNvbnRlbnQuXHJcbmNvbnN0IGhhc1Bvc2l0aXZlVG90YWxBbW91bnQgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSAmJiBwYXJzZWQgPiAwO1xyXG59O1xyXG5cclxuY29uc3QgTmV3VGlja2V0SWNvbiA9ICgpID0+IChcclxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsxLjV9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzTmFtZT1cInNpemUtNVwiPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTEwIDIwaC01YTIgMiAwIDAgMSAtMiAtMnYtOWEyIDIgMCAwIDEgMiAtMmgxYTIgMiAwIDAgMCAyIC0yYTEgMSAwIDAgMSAxIC0xaDZhMSAxIDAgMCAxIDEgMWEyIDIgMCAwIDAgMiAyaDFhMiAyIDAgMCAxIDIgMnYyXCIgLz5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0LjM2MiAxMS4xNWEzIDMgMCAxIDAgLTQuMTQ0IDQuMjYzXCIgLz5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDIxdi00YTIgMiAwIDEgMSA0IDB2NFwiIC8+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAxOWg0XCIgLz5cclxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTIxIDE1djZcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgTGlua1RpY2tldEljb24gPSAoKSA9PiAoXHJcbiAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD17MS41fSBhcmlhLWhpZGRlbj1cInRydWVcIiBjbGFzc05hbWU9XCJzaXplLTVcIj5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xMy4xOSA4LjY4OGE0LjUgNC41IDAgMCAxIDEuMjQyIDcuMjQ0bC00LjUgNC41YTQuNSA0LjUgMCAwIDEtNi4zNjQtNi4zNjRsMS43NTctMS43NTdtMTMuMzUtLjYyMiAxLjc1Ny0xLjc1N2E0LjUgNC41IDAgMCAwLTYuMzY0LTYuMzY0bC00LjUgNC41YTQuNSA0LjUgMCAwIDAgMS4yNDIgNy4yNDRcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuY29uc3QgTmV3TGluZUljb24gPSAoKSA9PiAoXHJcbiAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD17MS41fSBhcmlhLWhpZGRlbj1cInRydWVcIiBjbGFzc05hbWU9XCJzaXplLTVcIj5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0zIDE5YzMuMzMzIC0yIDUgLTQgNSAtNmMwIC0zIC0xIC0zIC0yIC0zcy0yLjAzMiAxLjA4NSAtMiAzYy4wMzQgMi4wNDggMS42NTggMi44NzcgMi41IDRjMS41IDIgMi41IDIuNSAzLjUgMWMuNjY3IC0xIDEuMTY3IC0xLjgzMyAxLjUgLTIuNWMxIDIuMzMzIDIuMzMzIDMuNSA0IDMuNWgyLjVcIiAvPlxyXG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMjAgMTd2LTEyYzAgLTEuMTIxIC0uODc5IC0yIC0yIC0ycy0yIC44NzkgLTIgMnYxMmwyIDJsMiAtMlwiIC8+XHJcbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNiA3aDRcIiAvPlxyXG4gIDwvc3ZnPlxyXG4pO1xyXG5cclxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxyXG5leHBvcnQgY29uc3QgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGggPSAoKSA9PiB7XHJcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgoe1xyXG4gICAgdG9rZW46IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXHJcbiAgICBlbnRyYU9pZDogc2FmZVRleHQod2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcclxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUFBfQ09ERV9fKSxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIE93bnMgdGhlIGRldGFpbC1wYWdlIG9yY2hlc3RyYXRpb24gYW5kIGtlZXBzIHRoZSB2aWV3IGNvbXBvbmVudCBmb2N1c2VkIG9uIHJlbmRlcmluZy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250cm9sbGVyID0gKCkgPT4ge1xyXG4gIGNvbnN0IHtcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICB9ID0gdXNlQXV0aENvbnRleHQoKTtcclxuICBjb25zdCBoYXNBY2Nlc3MgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIlZpZXdcIik7XHJcbiAgY29uc3QgY2FuQ3JlYXRlRXhwZW5zZSA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiQWRkXCIpO1xyXG4gIGNvbnN0IHNoZWV0SWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1NIRUVUX0lEX18pO1xyXG4gIGNvbnN0IHNoZWV0TW9kZSA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfU0hFRVRfTU9ERV9fKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGNvbnN0IGlzQ3JlYXRlTW9kZSA9IHNoZWV0TW9kZSA9PT0gXCJjcmVhdGVcIjtcclxuICBjb25zdCBpc01hbmFnaW5nT3RoZXJVc2VyQnlTZWxlY3Rpb24gPSBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkKHtcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICByZWNvcmRPd25lclVzZXJJZDogXCJcIixcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICB9KTtcclxuICBjb25zdCBjYW5DcmVhdGVFeHBlbnNlRm9yU2VsZWN0ZWRDb250ZXh0ID0gY2FuQ3JlYXRlRXhwZW5zZSAmJiAhaXNNYW5hZ2luZ090aGVyVXNlckJ5U2VsZWN0aW9uO1xyXG4gIGNvbnN0IGxpbmVDb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBjcmVhdGVkU2hlZXRJZFJlZiA9IHVzZVJlZihcIlwiKTtcclxuICBjb25zdCBjYW1lcmFJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgZ2FsbGVyeUlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLCBzZXRJc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzdGF0dXNUcmFuc2l0aW9uQ29tbWVudCwgc2V0U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3Nob3dTdGF0dXNUcmFuc2l0aW9uQ29tbWVudEZpZWxkLCBzZXRTaG93U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRGaWVsZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3Qgc3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRSZWYgPSB1c2VSZWYoXCJcIik7XHJcblxyXG4gIGNvbnN0IHBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gKHtcclxuICAgICAgZmlyc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfRmlyc3RcIiwgXCJGaXJzdFwiKSxcclxuICAgICAgcHJldjogaW5kVChcIkhpc3RvcnlfUGFnZV9QcmV2XCIsIFwiUHJldmlvdXNcIiksXHJcbiAgICAgIG5leHQ6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIiksXHJcbiAgICAgIGxhc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTGFzdFwiLCBcIkxhc3RcIiksXHJcbiAgICB9KSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgZGV0YWlsU3RhdGUgPSB1c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZSh7XHJcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBjYW5DcmVhdGVFeHBlbnNlOiBjYW5DcmVhdGVFeHBlbnNlRm9yU2VsZWN0ZWRDb250ZXh0LFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgc2hlZXRJZCxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCB7XHJcbiAgICBoZWFkZXIsXHJcbiAgICBsaW5lcyxcclxuICAgIGxpbmVQYWdlLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgYnVzeSxcclxuICAgIHN0YXR1cyxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIG1vZGFsRXJyb3IsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsXHJcbiAgICBwcm9qZWN0VmFsdWUsXHJcbiAgICBkZXRhaWxQb2xpY3ksXHJcbiAgICBpc01hbmFnaW5nT3RoZXJVc2VyLFxyXG4gICAgaXNTaGVldExvY2tlZCxcclxuICAgIGV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gICAgc2hvd0V4Y2hhbmdlUmF0ZSxcclxuICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxyXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LFxyXG4gICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXHJcbiAgICBjYW5FZGl0QW55Q3VycmVudCxcclxuICAgIGNhblVzZUZ1bGxFZGl0RmVhdHVyZXMsXHJcbiAgICBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcclxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxyXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gICAgc2V0TGluZVBhZ2UsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBzZXREcmFmdFByb2plY3RJZCxcclxuICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICBzZXREcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUsXHJcbiAgICBoYW5kbGVPcGVuTGlua1RpY2tldE1vZGUsXHJcbiAgICBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0LFxyXG4gICAgbmF2aWdhdGVUb0xpbmVEZXRhaWwsXHJcbiAgfSA9IGRldGFpbFN0YXRlO1xyXG5cclxuICBjb25zdCBjYW5DcmVhdGVFeHBlbnNlRm9yQ3VycmVudFZpZXcgPSBjYW5DcmVhdGVFeHBlbnNlICYmICFpc01hbmFnaW5nT3RoZXJVc2VyO1xyXG4gIGNvbnN0IGNhbkRlbGV0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyA9IGRldGFpbFBvbGljeS5jYW5EZWxldGVTaGVldDtcclxuICBjb25zdCBjYW5UcmFuc2l0aW9uU3RhdHVzID0gZGV0YWlsUG9saWN5LnN0YXR1c0FjdGlvbnMubGVuZ3RoID4gMDtcclxuICBjb25zdCBpc1JlYWRPbmx5TW9kZSA9IGRldGFpbFBvbGljeS5pbnRlcmFjdGlvbk1vZGUgPT09IFwicmVhZF9vbmx5XCI7XHJcbiAgY29uc3QgY3VycmVudFN0YXR1c0NvZGUgPSB0eXBlb2YgaGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMgPT09IFwibnVtYmVyXCIgPyBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzIDogbnVsbDtcclxuICBjb25zdCBoaWRlc0NydWRUb3BiYXJCeVN0YXR1cyA9XHJcbiAgICBjdXJyZW50U3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfQVBQUk9WQUxfUkVRVUVTVEVEICYmICFjYW5FZGl0QW55Q3VycmVudDtcclxuICBjb25zdCB0b3BiYXJBY3Rpb25Nb2RlID0gIWlzQ3JlYXRlTW9kZSAmJiAoaXNSZWFkT25seU1vZGUgfHwgaGlkZXNDcnVkVG9wYmFyQnlTdGF0dXMpID8gXCJ2aWV3X29ubHlcIiA6IFwiZGVmYXVsdFwiO1xyXG4gIGNvbnN0IGRldGFpbFBlcm1pc3Npb25zUmVhZHkgPSBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHkgJiYgKGlzQ3JlYXRlTW9kZSB8fCAhIWhlYWRlcik7XHJcbiAgY29uc3QgeyBpbnZhbGlkYXRlQ2FjaGVkTGlzdEZvclJlZmV0Y2ggfSA9IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZSgpO1xyXG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHJlc2V0U3RhdHVzVHJhbnNpdGlvbkRpYWxvZyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHN0YXR1c1RyYW5zaXRpb25Db21tZW50UmVmLmN1cnJlbnQgPSBcIlwiO1xyXG4gICAgc2V0U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnQoXCJcIik7XHJcbiAgICBzZXRTaG93U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRGaWVsZChmYWxzZSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDbG9zZUNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICByZXNldFN0YXR1c1RyYW5zaXRpb25EaWFsb2coKTtcclxuICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gIH0sIFtjbG9zZUNvbmZpcm0sIHJlc2V0U3RhdHVzVHJhbnNpdGlvbkRpYWxvZ10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbENvbmZpcm0gPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XHJcbiAgICAgICAgc2V0U3RhdHVzKG1zZyk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9LCBbYnVzeSwgaGFuZGxlQ29uZmlybSwgc2V0TW9kYWxFcnJvciwgc2V0U3RhdHVzXSk7XHJcblxyXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIik7XHJcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGJ1c3lcclxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxyXG4gICAgOiAhYnVzeSAmJiBtb2RhbEVycm9yXHJcbiAgICAgID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpXHJcbiAgICAgIDogKG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcclxuICAgICAgaGFuZGxlQ2xvc2VDb25maXJtKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2b2lkIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xyXG4gIH0sIFtidXN5LCBoYW5kbGVDbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybSwgbW9kYWxFcnJvcl0pO1xyXG5cclxuICBjb25zdCB2aXNpYmxlTGluZXMgPSB1c2VNZW1vKCgpID0+IHBhZ2VkU2xpY2UobGluZXMsIGxpbmVQYWdlLCBMSU5FU19QQUdFX1NJWkUpLCBbbGluZVBhZ2UsIGxpbmVzXSk7XHJcbiAgY29uc3QgdG90YWxMaW5lUGFnZXMgPSBNYXRoLmNlaWwoKGxpbmVzLmxlbmd0aCB8fCAwKSAvIExJTkVTX1BBR0VfU0laRSk7XG4gIGNvbnN0IHRvdGFsQW1vdW50VGV4dCA9IHVzZU1lbW8oXG4gICAgKCkgPT4gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGhlYWRlcj8udG90YWxBbW91bnQgPz8gbnVsbCwgc2FmZVRleHQoaGVhZGVyPy5jdXJyZW5jeUNvZGUpKSxcbiAgICBbaGVhZGVyPy5jdXJyZW5jeUNvZGUsIGhlYWRlcj8udG90YWxBbW91bnRdXG4gICk7XG4gIGNvbnN0IGhhc1N0YXR1c0FjdGlvbkNvbnRlbnQgPSBsaW5lcy5sZW5ndGggPiAwIHx8IGhhc1Bvc2l0aXZlVG90YWxBbW91bnQoaGVhZGVyPy50b3RhbEFtb3VudCk7XHJcbiAgY29uc3QgYXJlU3RhdHVzQWN0aW9uc0Rpc2FibGVkID0gIWhhc1N0YXR1c0FjdGlvbkNvbnRlbnQ7XHJcblxyXG4gIGNvbnN0IHsgaGFuZGxlVXBkYXRlLCBoYW5kbGVTdGF0dXNUcmFuc2l0aW9uLCBoYW5kbGVEZWxldGUgfSA9IHVzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9ucyh7XHJcbiAgICBidXN5LFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgaXNFZGl0TG9ja2VkOiBpc1JlYWRPbmx5TW9kZSxcclxuICAgIGlzRGVsZXRlTG9ja2VkOiBpc1NoZWV0TG9ja2VkLFxyXG4gICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXHJcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXHJcbiAgICBsb2NrZWRDdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSxcclxuICAgIGxvY2tlZEV4Y2hhbmdlUmF0ZTogc2FmZVRleHQoaGVhZGVyPy5leGNoUmF0ZSksXHJcbiAgICBjYW5DcmVhdGVFeHBlbnNlOiBjYW5DcmVhdGVFeHBlbnNlRm9yQ3VycmVudFZpZXcsXHJcbiAgICBjYW5FZGl0RXhwZW5zZTogY2FuRWRpdEFueUN1cnJlbnQsXHJcbiAgICBjYW5EZWxldGVFeHBlbnNlOiBjYW5EZWxldGVFeHBlbnNlRm9yQ3VycmVudFZpZXcsXHJcbiAgICBjYW5FZGl0SGVhZGVyRmllbGRzOiBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcclxuICAgIGNhblRyYW5zaXRpb25TdGF0dXMsXHJcbiAgICBzaGVldElkLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgZHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gICAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxyXG4gICAgY3VycmVudEV4cGVuc2VTaGVldFN0YXR1czogaGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMsXHJcbiAgICBjdXJyZW50RXhjaGFuZ2VSYXRlTW9kZTogaGVhZGVyPy5leGNoYW5nZVJhdGVNb2RlLFxyXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gICAgb25DcmVhdGVTdWNjZXNzOiAoY3JlYXRlZFNoZWV0SWQpID0+IHtcclxuICAgICAgY3JlYXRlZFNoZWV0SWRSZWYuY3VycmVudCA9IHNhZmVUZXh0KGNyZWF0ZWRTaGVldElkKTtcclxuICAgIH0sXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzRWRpdGluZyxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlT3BlbkxpbmVEZXRhaWwgPSB1c2VDYWxsYmFjayhcclxuICAgIGFzeW5jIChsaW5lUmVjSWQ6IHN0cmluZykgPT4ge1xyXG4gICAgICBjb25zdCBzYWZlTGluZUlkID0gc2FmZVRleHQobGluZVJlY0lkKTtcclxuICAgICAgaWYgKCFzYWZlTGluZUlkIHx8IGJ1c3kgfHwgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50KSB7XHJcbiAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCBoYW5kbGVVcGRhdGUoKTtcclxuICAgICAgICBpZiAoIW9rKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuYXZpZ2F0ZVRvTGluZURldGFpbChzYWZlTGluZUlkLCB7XHJcbiAgICAgICAgICBtb2RlOiBcImVkaXRcIixcclxuICAgICAgICAgIGFza0NvbmZpcm1hdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICBieXBhc3NHdWFyZE9uY2U6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBuYXZpZ2F0ZVRvTGluZURldGFpbChzYWZlTGluZUlkKTtcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50LFxyXG4gICAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICAgIGlzRWRpdGluZyxcclxuICAgICAgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLFxyXG4gICAgICBuYXZpZ2F0ZVRvTGluZURldGFpbCxcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVTYXZlU3VjY2VzcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgY29uc3QgY3JlYXRlZFNoZWV0SWQgPSBzYWZlVGV4dChjcmVhdGVkU2hlZXRJZFJlZi5jdXJyZW50KTtcclxuICAgICAgaWYgKCFjcmVhdGVkU2hlZXRJZCkgcmV0dXJuO1xyXG4gICAgICBzYXZlRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQoe1xyXG4gICAgICAgIHNoZWV0SWQ6IGNyZWF0ZWRTaGVldElkLFxyXG4gICAgICB9KTtcclxuICAgICAgc2V0SXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlKHRydWUpO1xyXG4gICAgICBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0KGNyZWF0ZWRTaGVldElkKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbG9hZEV4cGVuc2VQYWdlKCk7XHJcbiAgfSwgW2lzQ3JlYXRlTW9kZSwgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVTdGF0dXNBY3Rpb25DbGljayA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGFjdGlvbjogeyBsYWJlbEtleTogc3RyaW5nOyBmYWxsYmFjazogc3RyaW5nOyBuZXh0U3RhdHVzOiBudW1iZXIgfSkgPT4ge1xyXG4gICAgICBpZiAoIWhhc1N0YXR1c0FjdGlvbkNvbnRlbnQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGFjdGlvbkxhYmVsID0gaW5kVChhY3Rpb24ubGFiZWxLZXksIGFjdGlvbi5mYWxsYmFjayk7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRTdGF0dXNMYWJlbCA9XHJcbiAgICAgICAgaGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMgPT09IG51bGwgfHwgaGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgPyBpbmRUKFwiQ29tbW9uX05vRGF0YVwiLCBcIk5vIGRhdGFcIilcclxuICAgICAgICAgIDogZ2V0RXhwZW5zZVN0YXR1c0xhYmVsKGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMpO1xyXG4gICAgICBjb25zdCBuZXh0U3RhdHVzTGFiZWwgPSBnZXRFeHBlbnNlU3RhdHVzTGFiZWwoYWN0aW9uLm5leHRTdGF0dXMpO1xyXG4gICAgICBjb25zdCB0cmFuc2l0aW9uTWVzc2FnZSA9IGluZEZvcm1hdChcclxuICAgICAgICBcIkV4cGVuc2VTaGVldHNfQm90dG9tQWN0aW9uc19Db25maXJtVHJhbnNpdGlvblwiLFxyXG4gICAgICAgIFwiQ3VycmVudCBzdGF0dXM6IHswfVxcbk5ldyBzdGF0dXM6IHsxfVxcblxcbkRvIHlvdSB3YW50IHRvIHVwZGF0ZSB0aGUgZXhwZW5zZSBzaGVldCBzdGF0dXM/XCIsXHJcbiAgICAgICAgY3VycmVudFN0YXR1c0xhYmVsLFxyXG4gICAgICAgIG5leHRTdGF0dXNMYWJlbFxyXG4gICAgICApLnJlcGxhY2UoL1xcXFxuL2csIFwiXFxuXCIpO1xyXG4gICAgICBjb25zdCBpbml0aWFsQ29tbWVudCA9IHNhZmVUZXh0KGhlYWRlcj8uZXN0YWRvQ29tZW50YXJpb3MpO1xyXG4gICAgICBzdGF0dXNUcmFuc2l0aW9uQ29tbWVudFJlZi5jdXJyZW50ID0gaW5pdGlhbENvbW1lbnQ7XHJcbiAgICAgIHNldFN0YXR1c1RyYW5zaXRpb25Db21tZW50KGluaXRpYWxDb21tZW50KTtcclxuICAgICAgc2V0U2hvd1N0YXR1c1RyYW5zaXRpb25Db21tZW50RmllbGQodHJ1ZSk7XHJcblxyXG4gICAgICBvcGVuQ29uZmlybSh7XHJcbiAgICAgICAgdGl0bGU6IGFjdGlvbkxhYmVsLFxyXG4gICAgICAgIG1lc3NhZ2U6IHRyYW5zaXRpb25NZXNzYWdlLFxyXG4gICAgICAgIGNvbmZpcm1UZXh0OiBhY3Rpb25MYWJlbCxcclxuICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgaGFuZGxlU3RhdHVzVHJhbnNpdGlvbihcclxuICAgICAgICAgICAgYWN0aW9uLm5leHRTdGF0dXMsXHJcbiAgICAgICAgICAgIGFjdGlvbkxhYmVsLFxyXG4gICAgICAgICAgICBzdGF0dXNUcmFuc2l0aW9uQ29tbWVudFJlZi5jdXJyZW50XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgaWYgKG9rKSB7XHJcbiAgICAgICAgICAgIGludmFsaWRhdGVDYWNoZWRMaXN0Rm9yUmVmZXRjaCgpO1xyXG4gICAgICAgICAgICByZXNldFN0YXR1c1RyYW5zaXRpb25EaWFsb2coKTtcclxuICAgICAgICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgICAgICAgIHJlbG9hZEV4cGVuc2VQYWdlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gb2s7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBjbG9zZUNvbmZpcm0sXHJcbiAgICAgIGhhbmRsZVN0YXR1c1RyYW5zaXRpb24sXHJcbiAgICAgIGhhc1N0YXR1c0FjdGlvbkNvbnRlbnQsXHJcbiAgICAgIGhlYWRlcj8uZXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICAgIGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzLFxyXG4gICAgICBpbnZhbGlkYXRlQ2FjaGVkTGlzdEZvclJlZmV0Y2gsXHJcbiAgICAgIG9wZW5Db25maXJtLFxyXG4gICAgICByZXNldFN0YXR1c1RyYW5zaXRpb25EaWFsb2csXHJcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgdXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9ucyh7XHJcbiAgICBidXN5OiBidXN5IHx8IGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSxcclxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGFjdGlvbk1vZGU6IHRvcGJhckFjdGlvbk1vZGUsXHJcbiAgICBpc0xvY2tlZDogaXNTaGVldExvY2tlZCxcclxuICAgIGlzRWRpdExvY2tlZDogaXNSZWFkT25seU1vZGUsXHJcbiAgICBpc0RlbGV0ZUxvY2tlZDogaXNTaGVldExvY2tlZCxcclxuICAgIHBlcm1pc3Npb25zUmVhZHk6IGRldGFpbFBlcm1pc3Npb25zUmVhZHksXHJcbiAgICBjYW5DcmVhdGVFeHBlbnNlOiBjYW5DcmVhdGVFeHBlbnNlRm9yQ3VycmVudFZpZXcsXHJcbiAgICBjYW5FZGl0RXhwZW5zZTogY2FuRWRpdEFueUN1cnJlbnQsXHJcbiAgICBjYW5EZWxldGVFeHBlbnNlOiBjYW5EZWxldGVFeHBlbnNlRm9yQ3VycmVudFZpZXcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBvblNhdmVTdWNjZXNzOiBoYW5kbGVTYXZlU3VjY2VzcyxcclxuICAgIG9uRGVsZXRlU3VjY2VzczogKCkgPT4ge1xyXG4gICAgICBpbnZhbGlkYXRlQ2FjaGVkTGlzdEZvclJlZmV0Y2goKTtcclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL0V4cGVuc2VTaGVldHNcIik7XHJcbiAgICB9LFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHJlc29sdmVDbGlja2FibGVDYXJkID0gdXNlQ2FsbGJhY2soKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XHJcbiAgICBjb25zdCBub2RlID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcclxuICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xyXG4gICAgY29uc3QgY2FyZCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIpO1xyXG4gICAgaWYgKCFjYXJkKSByZXR1cm4gbnVsbDtcclxuICAgIGlmICghbGluZUNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyhjYXJkKSkgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4gY2FyZDtcclxuICB9LCBbXSk7XHJcblxyXG4gIHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMoe1xyXG4gICAgY29udGFpbmVyUmVmOiBsaW5lQ29udGFpbmVyUmVmLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgaXRlbXM6IHZpc2libGVMaW5lcyxcclxuICAgIHJlc29sdmVDbGlja2FibGVDYXJkLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBxdWlja1RpY2tldEZsb3cgPSB1c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3coe1xyXG4gICAgc2hlZXRJZDogc2FmZVRleHQoaGVhZGVyPy5ob2phR2FzdG9zSWQgfHwgc2hlZXRJZCksXHJcbiAgICBwcm9qZWN0SWQ6IHByb2plY3RWYWx1ZSxcclxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQoaGVhZGVyPy5jdXJyZW5jeUNvZGUpLFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogIWlzQ3JlYXRlTW9kZSAmJiBkZXRhaWxQb2xpY3kuc2hvd0ZhYixcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzU2hlZXRMb2NrZWQ6ICFjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzLFxyXG4gICAgbGlua1RvU2hlZXQ6IGZhbHNlLFxyXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXHJcbiAgICBvbkNvbXBsZXRlZDogKHJlc3VsdCkgPT4ge1xyXG4gICAgICBjb25zdCBjcmVhdGVkRmlsZUlkID0gc2FmZVRleHQocmVzdWx0Py5maWxlSWQpO1xyXG4gICAgICBpZiAoIWNyZWF0ZWRGaWxlSWQpIHtcclxuICAgICAgICByZWxvYWRFeHBlbnNlUGFnZSgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHJlc3VsdD8ubGlua2VkVG9TaGVldCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHJlbG9hZEV4cGVuc2VQYWdlKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjdXJyZW50U2hlZXRJZCA9IHNhZmVUZXh0KGhlYWRlcj8uaG9qYUdhc3Rvc0lkIHx8IHNoZWV0SWQpO1xyXG4gICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xyXG4gICAgICAgIGZpbGVJZDogY3JlYXRlZEZpbGVJZCxcclxuICAgICAgICBtb2RlOiBcImVkaXRcIixcclxuICAgICAgICBvcmlnaW46IFwic2hlZXQtY3JlYXRlXCIsXHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoY3VycmVudFNoZWV0SWQpIHtcclxuICAgICAgICBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoe1xyXG4gICAgICAgICAgZmlsZUlkOiBjcmVhdGVkRmlsZUlkLFxyXG4gICAgICAgICAgb3JpZ2luOiBcInNoZWV0LWNyZWF0ZVwiLFxyXG4gICAgICAgICAgc2hlZXRJZDogY3VycmVudFNoZWV0SWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcXVlcnkuc2V0KFwic2hlZXRJZFwiLCBjdXJyZW50U2hlZXRJZCk7XHJcbiAgICAgIH1cclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGZhYk1lbnVJdGVtcyA9IHVzZU1lbW88RmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbVtdPihcclxuICAgICgpID0+IFtcclxuICAgICAge1xyXG4gICAgICAgIGlkOiBcIm5ldy10aWNrZXRcIixcclxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX05ld1RpY2tldFwiLCBcIk51ZXZvIFRpY2tldFwiKSxcclxuICAgICAgICBpY29uOiA8TmV3VGlja2V0SWNvbiAvPixcclxuICAgICAgICBvbkNsaWNrOiBxdWlja1RpY2tldEZsb3cub3BlblNvdXJjZVBpY2tlcixcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiBcImxpbmstdGlja2V0XCIsXHJcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9MaW5rVGlja2V0XCIsIFwiVmluY3VsYXIgVGlja2V0XCIpLFxyXG4gICAgICAgIGljb246IDxMaW5rVGlja2V0SWNvbiAvPixcclxuICAgICAgICBvbkNsaWNrOiBoYW5kbGVPcGVuTGlua1RpY2tldE1vZGUsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogXCJuZXctbGluZVwiLFxyXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfTmV3TGluZVwiLCBcIk51ZXZhIExpbmVhXCIpLFxyXG4gICAgICAgIGljb246IDxOZXdMaW5lSWNvbiAvPixcclxuICAgICAgICBvbkNsaWNrOiBoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUsXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgW2hhbmRsZU9wZW5DcmVhdGVMaW5lTW9kZSwgaGFuZGxlT3BlbkxpbmtUaWNrZXRNb2RlLCBxdWlja1RpY2tldEZsb3cub3BlblNvdXJjZVBpY2tlcl1cclxuICApO1xyXG5cclxuICBjb25zdCBzaG93U3RhdHVzQWN0aW9uQmFyID1cclxuICAgICFpc0NyZWF0ZU1vZGUgJiYgIWlzTG9hZGluZyAmJiAhaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlICYmICFlcnJvck1lc3NhZ2UgJiYgZGV0YWlsUG9saWN5LnN0YXR1c0FjdGlvbnMubGVuZ3RoID4gMDtcclxuICBjb25zdCBzaG93RmFiID0gIWlzQ3JlYXRlTW9kZSAmJiBkZXRhaWxQb2xpY3kuc2hvd0ZhYjtcclxuICBjb25zdCBoYXNWaXNpYmxlU3RhdHVzQ29tbWVudCA9IHNhZmVUZXh0KGhlYWRlcj8uZXN0YWRvQ29tZW50YXJpb3MpLnRyaW0oKS5sZW5ndGggPiAwO1xyXG4gIGNvbnN0IHN0YXR1c0NvbW1lbnRNb2RlOiBcImhpZGRlblwiIHwgXCJyZWFkXCIgPSBoYXNWaXNpYmxlU3RhdHVzQ29tbWVudCA/IFwicmVhZFwiIDogXCJoaWRkZW5cIjtcclxuICBjb25zdCBtb2RhbEJvZHkgPSBzaG93U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRGaWVsZCA/IChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cclxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPlxyXG4gICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TdGF0dXNDb21tZW50XCIsIFwiU3RhdHVzIGNvbW1lbnRcIil9XHJcbiAgICAgIDwvbGFiZWw+XHJcbiAgICAgIDx0ZXh0YXJlYVxyXG4gICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCByZXNpemUtbm9uZVwiXHJcbiAgICAgICAgcm93cz17M31cclxuICAgICAgICB2YWx1ZT17c3RhdHVzVHJhbnNpdGlvbkNvbW1lbnR9XHJcbiAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgbmV4dFZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCI7XHJcbiAgICAgICAgICBzdGF0dXNUcmFuc2l0aW9uQ29tbWVudFJlZi5jdXJyZW50ID0gbmV4dFZhbHVlO1xyXG4gICAgICAgICAgc2V0U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnQobmV4dFZhbHVlKTtcclxuICAgICAgICB9fVxyXG4gICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1N0YXR1c0NvbW1lbnRcIiwgXCJTdGF0dXMgY29tbWVudFwiKX1cclxuICAgICAgLz5cclxuICAgIDwvZGl2PlxyXG4gICkgOiBudWxsO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc2hlZXRJZCxcclxuICAgIGhlYWRlcixcclxuICAgIHZpc2libGVMaW5lcyxcclxuICAgIGxpbmVQYWdlLFxyXG4gICAgdG90YWxMaW5lUGFnZXMsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBidXN5LFxyXG4gICAgc3RhdHVzLFxyXG4gICAgbW9kYWxFcnJvcixcclxuICAgIGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSxcclxuICAgIG1vZGFsLFxyXG4gICAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICAgIG1vZGFsQ2FuY2VsVGV4dCxcclxuICAgIG1vZGFsQ29uZmlybVRleHQsXHJcbiAgICBtb2RhbEJvZHksXHJcbiAgICBjYW5DcmVhdGVFeHBlbnNlRm9yQ3VycmVudFZpZXcsXHJcbiAgICBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcclxuICAgIGNhblVzZUZ1bGxFZGl0RmVhdHVyZXMsXHJcbiAgICBzaG93U3RhdHVzQWN0aW9uQmFyLFxyXG4gICAgc2hvd0ZhYixcclxuICAgIGFyZVN0YXR1c0FjdGlvbnNEaXNhYmxlZCxcclxuICAgIGZhYk1lbnVJdGVtcyxcclxuICAgIHBhZ2luYXRpb25MYWJlbHMsXHJcbiAgICB0b3RhbEFtb3VudFRleHQsXHJcbiAgICBzdGF0dXNDb21tZW50TW9kZSxcclxuICAgIHByb2plY3RWYWx1ZSxcclxuICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxyXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LFxyXG4gICAgc2hvd0V4Y2hhbmdlUmF0ZSxcclxuICAgIGV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSxcclxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxyXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gICAgZGV0YWlsUG9saWN5LFxyXG4gICAgbGluZUNvbnRhaW5lclJlZixcclxuICAgIGNhbWVyYUlucHV0UmVmLFxyXG4gICAgZ2FsbGVyeUlucHV0UmVmLFxyXG4gICAgcXVpY2tUaWNrZXRGbG93LFxyXG4gICAgc2V0TGluZVBhZ2UsXHJcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXHJcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcclxuICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsOiBoYW5kbGVPcGVuTGluZURldGFpbCxcclxuICAgIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSxcclxuICAgIGhhbmRsZVN0YXR1c0FjdGlvbkNsaWNrLFxyXG4gICAgY2xvc2VDb25maXJtOiBoYW5kbGVDbG9zZUNvbmZpcm0sXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7XHJcbiAgZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LFxyXG4gIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnksXHJcbiAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LFxyXG59IGZyb20gXCIuLi8uLi8uLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4vZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgZ2V0RXhwZW5zZVNjb3BlVG9rZW4gfSBmcm9tIFwiLi9leHBlbnNlU2NvcGUudHNcIjtcclxuXHJcbmNvbnN0IEVYUEVOU0VfU0hFRVRfQ1JFQVRFRF9SRVRVUk5fQ09OVEVYVF9LRVlfUFJFRklYID0gXCJleHBlbnNlX3NoZWV0X2NyZWF0ZWRfcmV0dXJuX2NvbnRleHRfdjFcIjtcclxuY29uc3QgRVhQRU5TRV9TSEVFVF9DUkVBVEVEX1JFVFVSTl9DT05URVhUX1RUTF9NUyA9IDIgKiA2MCAqIDYwICogMTAwMDtcclxuXHJcbmV4cG9ydCB0eXBlIEV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0ID0ge1xyXG4gIHNoZWV0SWQ6IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IGdldFNjb3BlZEtleSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBgJHtFWFBFTlNFX1NIRUVUX0NSRUFURURfUkVUVVJOX0NPTlRFWFRfS0VZX1BSRUZJWH1fJHtnZXRFeHBlbnNlU2NvcGVUb2tlbigpfWA7XHJcbn07XHJcblxyXG4vLyBOb3JtYWxpemVzIHRoZSBjcmVhdGVkLXNoZWV0IHJldHVybiBwYXlsb2FkIHVzZWQgYmV0d2VlbiBjcmVhdGUgYW5kIGRldGFpbCBmbG93cy5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0ID0gKFxyXG4gIHZhbHVlOiB1bmtub3duXHJcbik6IEV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0IHwgbnVsbCA9PiB7XHJcbiAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCBwYXlsb2FkID0gdmFsdWUgYXMgUGFydGlhbDxFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dD47XHJcbiAgY29uc3Qgc2hlZXRJZCA9IHNhZmVUZXh0KHBheWxvYWQuc2hlZXRJZCk7XHJcbiAgaWYgKCFzaGVldElkKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNoZWV0SWQsXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIFJlYWRzIHRoZSBzdG9yZWQgY3JlYXRlZC1zaGVldCByZXR1cm4gY29udGV4dCBmb3IgdGhlIGFjdGl2ZSBleHBlbnNlIHNjb3BlLlxyXG5leHBvcnQgY29uc3QgcmVhZEV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0ID0gKFxyXG4gIHNoZWV0SWQ/OiB1bmtub3duXHJcbik6IEV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0IHwgbnVsbCA9PiB7XHJcbiAgY29uc3Qgc3RvcmVkID0gbm9ybWFsaXplRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQoXHJcbiAgICBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnk8RXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQ+KGdldFNjb3BlZEtleSgpKVxyXG4gICk7XHJcbiAgaWYgKCFzdG9yZWQpIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KHNoZWV0SWQpO1xyXG4gIGlmICghc2FmZVNoZWV0SWQpIHJldHVybiBzdG9yZWQ7XHJcbiAgcmV0dXJuIHN0b3JlZC5zaGVldElkLnRvVXBwZXJDYXNlKCkgPT09IHNhZmVTaGVldElkLnRvVXBwZXJDYXNlKCkgPyBzdG9yZWQgOiBudWxsO1xyXG59O1xyXG5cclxuLy8gQ2xlYXJzIHRoZSBjcmVhdGVkLXNoZWV0IHJldHVybiBjb250ZXh0IGZvciB0aGUgYWN0aXZlIGV4cGVuc2Ugc2NvcGUuXHJcbmV4cG9ydCBjb25zdCBjbGVhckV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0ID0gKCk6IHZvaWQgPT4ge1xyXG4gIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoZ2V0U2NvcGVkS2V5KCkpO1xyXG59O1xyXG5cclxuLy8gUGVyc2lzdHMgdGhlIGNyZWF0ZWQtc2hlZXQgY29udGV4dCBzbyB0aGUgbmV4dCBkZXRhaWwgcGFnZSBjYW4gYXJtIHRoZSBsaXN0IHJldHVybiBzdGF0ZS5cclxuZXhwb3J0IGNvbnN0IHNhdmVFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCA9IChcclxuICB2YWx1ZTogRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQgfCBudWxsIHwgdW5kZWZpbmVkXHJcbik6IEV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0IHwgbnVsbCA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0KHZhbHVlKTtcclxuICBpZiAoIW5vcm1hbGl6ZWQpIHtcclxuICAgIGNsZWFyRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQoKTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5KGdldFNjb3BlZEtleSgpLCBub3JtYWxpemVkLCBFWFBFTlNFX1NIRUVUX0NSRUFURURfUkVUVVJOX0NPTlRFWFRfVFRMX01TKTtcclxuICByZXR1cm4gbm9ybWFsaXplZDtcclxufTtcclxuXHJcbi8vIENvbnN1bWVzIHRoZSBjcmVhdGVkLXNoZWV0IGNvbnRleHQgb25jZSB0aGUgbWF0Y2hpbmcgZGV0YWlsIHBhZ2UgaXMgbG9hZGVkLlxyXG5leHBvcnQgY29uc3QgY29uc3VtZUV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0ID0gKFxyXG4gIHNoZWV0SWQ/OiB1bmtub3duXHJcbik6IEV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0IHwgbnVsbCA9PiB7XHJcbiAgY29uc3Qgc3RvcmVkID0gcmVhZEV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0KHNoZWV0SWQpO1xyXG4gIGlmICghc3RvcmVkKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY2xlYXJFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCgpO1xyXG4gIHJldHVybiBzdG9yZWQ7XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0LCBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0IH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBleGVjdXRlRXhwZW5zZU11dGF0aW9uLCBwYXJzZURlY2ltYWxJbnB1dCB9IGZyb20gXCIuLi9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGNyZWF0ZUV4cGVuc2VTaGVldCxcclxuICBkZWxldGVFeHBlbnNlU2hlZXQsXHJcbiAgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyLFxyXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcblxyXG5jb25zdCBTQU1FX0NVUlJFTkNZX0VYQ0hBTkdFX1JBVEUgPSAxMDA7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xyXG4gIGlzRWRpdExvY2tlZDogYm9vbGVhbjtcclxuICBpc0RlbGV0ZUxvY2tlZDogYm9vbGVhbjtcclxuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogYm9vbGVhbjtcclxuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XHJcbiAgbG9ja2VkQ3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgbG9ja2VkRXhjaGFuZ2VSYXRlOiBzdHJpbmc7XHJcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcclxuICBjYW5FZGl0RXhwZW5zZTogYm9vbGVhbjtcclxuICBjYW5EZWxldGVFeHBlbnNlOiBib29sZWFuO1xyXG4gIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGJvb2xlYW47XHJcbiAgY2FuVHJhbnNpdGlvblN0YXR1czogYm9vbGVhbjtcclxuICBzaGVldElkOiBzdHJpbmc7XHJcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRFeGNoYW5nZVJhdGU6IHN0cmluZztcclxuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlOiBzdHJpbmc7XHJcbiAgZHJhZnRQcm9qZWN0SWQ6IHN0cmluZztcclxuICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zOiBzdHJpbmc7XHJcbiAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5OiBzdHJpbmc7XHJcbiAgY3VycmVudEV4cGVuc2VTaGVldFN0YXR1cz86IG51bWJlciB8IG51bGw7XHJcbiAgY3VycmVudEV4Y2hhbmdlUmF0ZU1vZGU/OiBudW1iZXIgfCBudWxsO1xyXG4gIG9uQ3JlYXRlU3VjY2VzczogKGNyZWF0ZWRTaGVldElkOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0QnVzeTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVFeGNoYW5nZVJhdGUgPSAocmF3OiBzdHJpbmcpOiBudW1iZXIgfCBudWxsID0+IHBhcnNlRGVjaW1hbElucHV0KHJhdyk7XHJcbi8vIENvbXBhcmVzIHJhdGVzIHdpdGggdG9sZXJhbmNlIHRvIGF2b2lkIGZsb2F0aW5nIHBvaW50IG1pc21hdGNoIG9uIHBheWxvYWQgbW9kZS5cclxuY29uc3QgYXJlUmF0ZXNFcXVpdmFsZW50ID0gKGxlZnQ6IG51bWJlciB8IG51bGwsIHJpZ2h0OiBudW1iZXIgfCBudWxsKTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKGxlZnQgPT0gbnVsbCB8fCByaWdodCA9PSBudWxsKSByZXR1cm4gZmFsc2U7XHJcbiAgcmV0dXJuIE1hdGguYWJzKGxlZnQgLSByaWdodCkgPCAwLjAwMDAwMDE7XHJcbn07XHJcblxyXG4vLyBFbmNhcHN1bGF0ZXMgdXBkYXRlIGFuZCBkZWxldGUgbXV0YXRpb25zIGZvciBleHBlbnNlIHNoZWV0IGhlYWRlciBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGlzQ3JlYXRlTW9kZSxcclxuICBpc0VkaXRMb2NrZWQsXHJcbiAgaXNEZWxldGVMb2NrZWQsXHJcbiAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXHJcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gIGxvY2tlZEN1cnJlbmN5Q29kZSxcclxuICBsb2NrZWRFeGNoYW5nZVJhdGUsXHJcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcclxuICBjYW5FZGl0RXhwZW5zZSxcclxuICBjYW5EZWxldGVFeHBlbnNlLFxyXG4gIGNhbkVkaXRIZWFkZXJGaWVsZHMsXHJcbiAgY2FuVHJhbnNpdGlvblN0YXR1cyxcclxuICBzaGVldElkLFxyXG4gIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgZHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcclxuICBkcmFmdFByb2plY3RJZCxcclxuICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxyXG4gIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcclxuICBjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzLFxyXG4gIGN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlLFxyXG4gIG9uQ3JlYXRlU3VjY2VzcyxcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIHNldEJ1c3ksXHJcbiAgc2V0U3RhdHVzLFxyXG4gIHNldElzRWRpdGluZyxcclxufTogVXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zQXJncykgPT4ge1xyXG4gIGNvbnN0IGJ1aWxkVXBkYXRlUGF5bG9hZCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKFxyXG4gICAgICBuZXh0U3RhdHVzPzogbnVtYmVyIHwgbnVsbCxcclxuICAgICAgc3RhdHVzQ29tbWVudE92ZXJyaWRlPzogc3RyaW5nIHwgbnVsbFxyXG4gICAgKTogeyBwYXlsb2FkOiBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0IH0gfCB7IGVycm9yOiBzdHJpbmcgfSA9PiB7XHJcbiAgICAgIGNvbnN0IGhhc0V4cGxpY2l0U3RhdHVzQ29tbWVudE92ZXJyaWRlID0gc3RhdHVzQ29tbWVudE92ZXJyaWRlICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW5jeSA9IFN0cmluZyhcclxuICAgICAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyA/IChsb2NrZWRDdXJyZW5jeUNvZGUgfHwgZHJhZnRDdXJyZW5jeUNvZGUgfHwgXCJcIikgOiAoZHJhZnRDdXJyZW5jeUNvZGUgfHwgXCJcIilcclxuICAgICAgKVxyXG4gICAgICAgIC50cmltKClcclxuICAgICAgICAudG9VcHBlckNhc2UoKTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZERlc2NyaXB0aW9uID0gU3RyaW5nKGRyYWZ0RGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkUHJvamVjdElkID0gU3RyaW5nKGRyYWZ0UHJvamVjdElkIHx8IFwiXCIpLnRyaW0oKTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZEVzdGFkb0NvbWVudGFyaW9zID0gU3RyaW5nKFxyXG4gICAgICAgIHN0YXR1c0NvbW1lbnRPdmVycmlkZSA/PyBkcmFmdEVzdGFkb0NvbWVudGFyaW9zID8/IFwiXCJcclxuICAgICAgKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRFeGNoYW5nZVJhdGVSYXcgPSBTdHJpbmcoXHJcbiAgICAgICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzID8gKGxvY2tlZEV4Y2hhbmdlUmF0ZSB8fCBkcmFmdEV4Y2hhbmdlUmF0ZSB8fCBcIlwiKSA6IChkcmFmdEV4Y2hhbmdlUmF0ZSB8fCBcIlwiKVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkQmFzZUN1cnJlbmN5ID0gU3RyaW5nKGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSB8fCBcIkVVUlwiKS50cmltKCkudG9VcHBlckNhc2UoKSB8fCBcIkVVUlwiO1xyXG4gICAgICBjb25zdCByZXF1aXJlc0V4Y2hhbmdlUmF0ZSA9XHJcbiAgICAgICAgY2FuRWRpdEhlYWRlckZpZWxkcyAmJiBub3JtYWxpemVkQ3VycmVuY3kgIT09IFwiXCIgJiYgbm9ybWFsaXplZEN1cnJlbmN5ICE9PSBub3JtYWxpemVkQmFzZUN1cnJlbmN5O1xyXG4gICAgICBjb25zdCB1c2VzU2FtZUN1cnJlbmN5UmF0ZSA9IGNhbkVkaXRIZWFkZXJGaWVsZHMgJiYgbm9ybWFsaXplZEN1cnJlbmN5ICE9PSBcIlwiICYmICFyZXF1aXJlc0V4Y2hhbmdlUmF0ZTtcclxuICAgICAgY29uc3QgcGFyc2VkRXhjaGFuZ2VSYXRlID0gbm9ybWFsaXplRXhjaGFuZ2VSYXRlKG5vcm1hbGl6ZWRFeGNoYW5nZVJhdGVSYXcpO1xyXG4gICAgICBjb25zdCBvZmZpY2lhbEV4Y2hhbmdlUmF0ZSA9IG5vcm1hbGl6ZUV4Y2hhbmdlUmF0ZShvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKTtcclxuICAgICAgY29uc3Qgb3JpZ2luYWxFeGNoYW5nZVJhdGUgPSBub3JtYWxpemVFeGNoYW5nZVJhdGUobG9ja2VkRXhjaGFuZ2VSYXRlKTtcclxuICAgICAgY29uc3QgcGFyc2VkQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUgPSBOdW1iZXIoY3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUpO1xyXG4gICAgICBjb25zdCBoYXNDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA9IE51bWJlci5pc0ludGVnZXIocGFyc2VkQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUpICYmIHBhcnNlZEN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlID49IDA7XHJcbiAgICAgIGNvbnN0IGhhc1ZhbGlkUmF0ZSA9IHBhcnNlZEV4Y2hhbmdlUmF0ZSAhPSBudWxsICYmIHBhcnNlZEV4Y2hhbmdlUmF0ZSA+IDA7XHJcbiAgICAgIGNvbnN0IGhhc01hbnVhbFJhdGVFZGl0T25VcGRhdGUgPVxyXG4gICAgICAgIGNhbkVkaXRIZWFkZXJGaWVsZHMgJiZcclxuICAgICAgICAhaXNDcmVhdGVNb2RlICYmXHJcbiAgICAgICAgaGFzVmFsaWRSYXRlICYmXHJcbiAgICAgICAgKG9yaWdpbmFsRXhjaGFuZ2VSYXRlID09IG51bGwgfHwgIWFyZVJhdGVzRXF1aXZhbGVudChwYXJzZWRFeGNoYW5nZVJhdGUsIG9yaWdpbmFsRXhjaGFuZ2VSYXRlKSk7XHJcbiAgICAgIC8vIE9ubHkgc2VuZCBleGNoYW5nZVJhdGVNb2RlIHdoZW4gdGhlIHVzZXIgYWN0dWFsbHkgY2hhbmdlZCB0aGUgcmF0ZSBtYW51YWxseS5cclxuICAgICAgY29uc3QgaXNNYW51YWxFeGNoYW5nZVJhdGUgPSAoKCkgPT4ge1xyXG4gICAgICAgIGlmICghY2FuRWRpdEhlYWRlckZpZWxkcykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmICghcmVxdWlyZXNFeGNoYW5nZVJhdGUgfHwgIWhhc1ZhbGlkUmF0ZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoIWlzQ3JlYXRlTW9kZSAmJiAhaGFzTWFudWFsUmF0ZUVkaXRPblVwZGF0ZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChvZmZpY2lhbEV4Y2hhbmdlUmF0ZSA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gIWFyZVJhdGVzRXF1aXZhbGVudChwYXJzZWRFeGNoYW5nZVJhdGUsIG9mZmljaWFsRXhjaGFuZ2VSYXRlKTtcclxuICAgICAgfSkoKTtcclxuICAgICAgY29uc3QgcmVzb2x2ZWRFeGNoYW5nZVJhdGVNb2RlID0gY2FuRWRpdEhlYWRlckZpZWxkc1xyXG4gICAgICAgID8gKGlzTWFudWFsRXhjaGFuZ2VSYXRlID8gMSA6IChoYXNDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA/IHBhcnNlZEN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlIDogMCkpXHJcbiAgICAgICAgOiAoaGFzQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUgPyBwYXJzZWRDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA6IHVuZGVmaW5lZCk7XHJcbiAgICAgIGNvbnN0IHJlc29sdmVkRXhwZW5zZVNoZWV0U3RhdHVzID1cclxuICAgICAgICBuZXh0U3RhdHVzID8/IChjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzICE9IG51bGwgPyBOdW1iZXIoY3VycmVudEV4cGVuc2VTaGVldFN0YXR1cykgOiB1bmRlZmluZWQpO1xyXG4gICAgICAvLyBTdGF0dXMvY29tbWVudC1vbmx5IGZsb3dzIHN0aWxsIHN1Ym1pdCB0aGUgZnVsbCBoZWFkZXIgcGF5bG9hZCwgc28ga2VlcCB0aGUgc3RvcmVkIHJhdGUgdW50b3VjaGVkLlxyXG4gICAgICBjb25zdCByZXNvbHZlZEV4Y2hhbmdlUmF0ZSA9IGNhbkVkaXRIZWFkZXJGaWVsZHNcclxuICAgICAgICA/ICh1c2VzU2FtZUN1cnJlbmN5UmF0ZSA/IFNBTUVfQ1VSUkVOQ1lfRVhDSEFOR0VfUkFURSA6IChoYXNWYWxpZFJhdGUgPyBOdW1iZXIocGFyc2VkRXhjaGFuZ2VSYXRlKSA6IDEpKVxyXG4gICAgICAgIDogKG9yaWdpbmFsRXhjaGFuZ2VSYXRlID8/IHBhcnNlZEV4Y2hhbmdlUmF0ZSA/PyAwKTtcclxuXHJcbiAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgICBpZiAoIW5vcm1hbGl6ZWREZXNjcmlwdGlvbikge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZXJyb3I6IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fRGVzY3JpcHRpb25SZXF1aXJlZFwiLCBcIkRlc2NyaXB0aW9uIGlzIHJlcXVpcmVkLlwiKSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIW5vcm1hbGl6ZWRDdXJyZW5jeSkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZXJyb3I6IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fQ3VycmVuY3lSZXF1aXJlZFwiLCBcIkN1cnJlbmN5IGlzIHJlcXVpcmVkLlwiKSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocmVxdWlyZXNFeGNoYW5nZVJhdGUgJiYgIWhhc1ZhbGlkUmF0ZSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBlcnJvcjogaW5kVChcclxuICAgICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fRXhjaGFuZ2VSYXRlUmVxdWlyZWRcIixcclxuICAgICAgICAgICAgXCJFeGNoYW5nZSByYXRlIGlzIHJlcXVpcmVkIHdoZW4gY3VycmVuY3kgaXMgZGlmZmVyZW50IGZyb20gYmFzZSBjdXJyZW5jeS5cIlxyXG4gICAgICAgICAgKSxcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHBheWxvYWQ6IHtcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBub3JtYWxpemVkRGVzY3JpcHRpb24sXHJcbiAgICAgICAgICBjdXJyZW5jeUNvZGU6IG5vcm1hbGl6ZWRDdXJyZW5jeSxcclxuICAgICAgICAgIGV4Y2hSYXRlOiByZXNvbHZlZEV4Y2hhbmdlUmF0ZSxcclxuICAgICAgICAgIHByb2pJZDogbm9ybWFsaXplZFByb2plY3RJZCB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgICBleHBlbnNlU2hlZXRTdGF0dXM6IHJlc29sdmVkRXhwZW5zZVNoZWV0U3RhdHVzLFxyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlTW9kZTogcmVzb2x2ZWRFeGNoYW5nZVJhdGVNb2RlLFxyXG4gICAgICAgICAgLy8gUHJlc2VydmUgZXhwbGljaXQgZW1wdHkgc3RhdHVzIGNvbW1lbnRzIHNvIHRoZSBiYWNrZW5kIGNhbiBjbGVhciB0aGUgc3RvcmVkIHZhbHVlLlxyXG4gICAgICAgICAgZXN0YWRvQ29tZW50YXJpb3M6IGhhc0V4cGxpY2l0U3RhdHVzQ29tbWVudE92ZXJyaWRlXHJcbiAgICAgICAgICAgID8gbm9ybWFsaXplZEVzdGFkb0NvbWVudGFyaW9zXHJcbiAgICAgICAgICAgIDogKG5vcm1hbGl6ZWRFc3RhZG9Db21lbnRhcmlvcyB8fCB1bmRlZmluZWQpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBjYW5FZGl0SGVhZGVyRmllbGRzLFxyXG4gICAgICBjdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSxcclxuICAgICAgY3VycmVudEV4cGVuc2VTaGVldFN0YXR1cyxcclxuICAgICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICAgIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgICBkcmFmdFByb2plY3RJZCxcclxuICAgICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gICAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxyXG4gICAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXHJcbiAgICAgIGxvY2tlZEN1cnJlbmN5Q29kZSxcclxuICAgICAgbG9ja2VkRXhjaGFuZ2VSYXRlLFxyXG4gICAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVVwZGF0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmIChidXN5IHx8ICFpc0VkaXRpbmcpIHJldHVybiBmYWxzZTtcclxuICAgIGlmICghaXNDcmVhdGVNb2RlICYmIGlzRWRpdExvY2tlZCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IGNhblByb2NlZWQgPSBpc0NyZWF0ZU1vZGUgPyBjYW5DcmVhdGVFeHBlbnNlIDogY2FuRWRpdEV4cGVuc2U7XHJcbiAgICBpZiAoIWNhblByb2NlZWQpIHtcclxuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGF5bG9hZFJlc3VsdCA9IGJ1aWxkVXBkYXRlUGF5bG9hZCgpO1xyXG4gICAgaWYgKFwiZXJyb3JcIiBpbiBwYXlsb2FkUmVzdWx0KSB7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IocGF5bG9hZFJlc3VsdC5lcnJvcik7XHJcbiAgICAgIHNldFN0YXR1cyhwYXlsb2FkUmVzdWx0LmVycm9yKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xyXG4gICAgICBzdGFydFN0YXR1czogaXNDcmVhdGVNb2RlXHJcbiAgICAgICAgPyBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpXHJcbiAgICAgICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRpbmdcIiwgXCJVcGRhdGluZyBleHBlbnNlIHNoZWV0Li4uXCIpLFxyXG4gICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKSxcclxuICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgc2V0QnVzeSxcclxuICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcclxuICAgICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgICAgICBjb25zdCBjcmVhdGVQYXlsb2FkID0gcGF5bG9hZFJlc3VsdC5wYXlsb2FkO1xyXG4gICAgICAgICAgY29uc3QgcGF5bG9hZDogRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCA9IHtcclxuICAgICAgICAgICAgbW9kZTogMSxcclxuICAgICAgICAgICAgZXhpc3RpbmdIb2phR2FzdG9zSWQ6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGNyZWF0ZVBheWxvYWQuZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgIGN1cnJlbmN5Q29kZTogY3JlYXRlUGF5bG9hZC5jdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICAgIGV4Y2hSYXRlOiBjcmVhdGVQYXlsb2FkLmV4Y2hSYXRlLFxyXG4gICAgICAgICAgICBwcm9qSWQ6IGNyZWF0ZVBheWxvYWQucHJvaklkLFxyXG4gICAgICAgICAgICBleHBlbnNlU2hlZXRTdGF0dXM6IDAsXHJcbiAgICAgICAgICAgIGV4Y2hhbmdlUmF0ZU1vZGU6IGNyZWF0ZVBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSxcclxuICAgICAgICAgICAgbGluZXM6IFtdLFxyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNyZWF0ZUV4cGVuc2VTaGVldChwYXlsb2FkKTtcclxuXHJcbiAgICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBBY2NlcHQgYm90aCBjYXNpbmcgdmFyaWFudHMgZnJvbSBiYWNrZW5kIGVudmVsb3Blcy5cclxuICAgICAgICAgIGNvbnN0IGNyZWF0ZWREYXRhID0gcmVzcG9uc2U/LkRhdGEgYXMgeyBIb2phR2FzdG9zSWQ/OiB1bmtub3duOyBob2phR2FzdG9zSWQ/OiB1bmtub3duIH0gfCBudWxsIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgY29uc3QgY3JlYXRlZFNoZWV0SWQgPSBTdHJpbmcoY3JlYXRlZERhdGE/LkhvamFHYXN0b3NJZCA/PyBjcmVhdGVkRGF0YT8uaG9qYUdhc3Rvc0lkID8/IFwiXCIpLnRyaW0oKTtcclxuICAgICAgICAgIGlmICghY3JlYXRlZFNoZWV0SWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgb25DcmVhdGVTdWNjZXNzKGNyZWF0ZWRTaGVldElkKTtcclxuICAgICAgICAgIHNldFN0YXR1cyhpbmRUKFwiQ29tbW9uX1NhdmVcIiwgXCJTYXZlXCIpKTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB1cGRhdGVFeHBlbnNlU2hlZXRIZWFkZXIoc2hlZXRJZCwgcGF5bG9hZFJlc3VsdC5wYXlsb2FkKTtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVkXCIsIFwiRXhwZW5zZSBzaGVldCB1cGRhdGVkXCIpKTtcclxuICAgICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcclxuICB9LCBbXHJcbiAgICBidXN5LFxyXG4gICAgYnVpbGRVcGRhdGVQYXlsb2FkLFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZSxcclxuICAgIGNhbkVkaXRFeHBlbnNlLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgaXNFZGl0TG9ja2VkLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgb25DcmVhdGVTdWNjZXNzLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzaGVldElkLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVTdGF0dXNUcmFuc2l0aW9uID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAobmV4dFN0YXR1czogbnVtYmVyLCBzdGFydFN0YXR1czogc3RyaW5nLCBzdGF0dXNDb21tZW50T3ZlcnJpZGU/OiBzdHJpbmcgfCBudWxsKSA9PiB7XHJcbiAgICAgIGlmIChidXN5IHx8IGlzQ3JlYXRlTW9kZSB8fCAhc2hlZXRJZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoIWNhblRyYW5zaXRpb25TdGF0dXMpIHtcclxuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwYXlsb2FkUmVzdWx0ID0gYnVpbGRVcGRhdGVQYXlsb2FkKG5leHRTdGF0dXMsIHN0YXR1c0NvbW1lbnRPdmVycmlkZSk7XHJcbiAgICAgIGlmIChcImVycm9yXCIgaW4gcGF5bG9hZFJlc3VsdCkge1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IocGF5bG9hZFJlc3VsdC5lcnJvcik7XHJcbiAgICAgICAgc2V0U3RhdHVzKHBheWxvYWRSZXN1bHQuZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XHJcbiAgICAgICAgc3RhcnRTdGF0dXMsXHJcbiAgICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIiksXHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgICBzZXRCdXN5LFxyXG4gICAgICAgIHNldFN0YXR1cyxcclxuICAgICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyKHNoZWV0SWQsIHBheWxvYWRSZXN1bHQucGF5bG9hZCk7XHJcblxyXG4gICAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVGYWlsZWRcIiwgXCJVcGRhdGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVkXCIsIFwiRXhwZW5zZSBzaGVldCB1cGRhdGVkXCIpKTtcclxuICAgICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQub2s7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBidXN5LFxyXG4gICAgICBidWlsZFVwZGF0ZVBheWxvYWQsXHJcbiAgICAgIGNhblRyYW5zaXRpb25TdGF0dXMsXHJcbiAgICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgICAgc2V0QnVzeSxcclxuICAgICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICBzZXRTdGF0dXMsXHJcbiAgICAgIHNoZWV0SWQsXHJcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChpc0RlbGV0ZUxvY2tlZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFjYW5EZWxldGVFeHBlbnNlKSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xyXG4gICAgICBzdGFydFN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0aW5nXCIsIFwiRGVsZXRpbmcgZXhwZW5zZSBzaGVldC4uLlwiKSxcclxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVFcnJvclwiLCBcIkRlbGV0ZSBlcnJvci5cIiksXHJcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldEJ1c3ksXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXQoc2hlZXRJZCk7XHJcblxyXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlZFwiLCBcIkV4cGVuc2Ugc2hlZXQgZGVsZXRlZFwiKSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xyXG4gIH0sIFtidXN5LCBjYW5EZWxldGVFeHBlbnNlLCBpc0RlbGV0ZUxvY2tlZCwgc2V0QnVzeSwgc2V0TW9kYWxFcnJvciwgc2V0U3RhdHVzLCBzaGVldElkXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVTdGF0dXNUcmFuc2l0aW9uLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zIH0gZnJvbSBcIi4uL2hvb2tzL3VzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xyXG4gIGFjdGlvbk1vZGU/OiBcImRlZmF1bHRcIiB8IFwiZGVsZXRlX29ubHlcIiB8IFwidmlld19vbmx5XCI7XHJcbiAgaXNMb2NrZWQ6IGJvb2xlYW47XHJcbiAgaXNFZGl0TG9ja2VkPzogYm9vbGVhbjtcclxuICBpc0RlbGV0ZUxvY2tlZD86IGJvb2xlYW47XHJcbiAgcGVybWlzc2lvbnNSZWFkeT86IGJvb2xlYW47XHJcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XHJcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcclxuICBjYW5EZWxldGVFeHBlbnNlOiBib29sZWFuO1xyXG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUVuYWJsZUVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcclxuICBoYW5kbGVVcGRhdGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgaGFuZGxlRGVsZXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XHJcbiAgb25EZWxldGVTdWNjZXNzPzogKCkgPT4gdm9pZDtcclxuICBvcGVuQ29uZmlybTogKG9wdHM6IHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBjb25maXJtVGV4dD86IHN0cmluZztcclxuICAgIG9uQ29uZmlybT86ICgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQ7XHJcbiAgfSkgPT4gdm9pZDtcclxuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBDb29yZGluYXRlcyB0b3BiYXIgaWNvbiBzdGF0ZSBhbmQgZGlzcGF0Y2ggYWN0aW9ucyBmb3IgZXhwZW5zZSBzaGVldCBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zID0gKHtcclxuICBidXN5LFxyXG4gIG1vZGFsT3BlbixcclxuICBpc0VkaXRpbmcsXHJcbiAgaXNDcmVhdGVNb2RlLFxyXG4gIGFjdGlvbk1vZGUgPSBcImRlZmF1bHRcIixcclxuICBpc0xvY2tlZCxcclxuICBpc0VkaXRMb2NrZWQsXHJcbiAgaXNEZWxldGVMb2NrZWQsXHJcbiAgcGVybWlzc2lvbnNSZWFkeSA9IHRydWUsXHJcbiAgY2FuRWRpdEV4cGVuc2UsXHJcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcclxuICBjYW5EZWxldGVFeHBlbnNlLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gIGhhbmRsZVVwZGF0ZSxcclxuICBoYW5kbGVEZWxldGUsXHJcbiAgb25TYXZlU3VjY2VzcyxcclxuICBvbkRlbGV0ZVN1Y2Nlc3MsXHJcbiAgb3BlbkNvbmZpcm0sXHJcbiAgY2xvc2VDb25maXJtLFxyXG59OiBVc2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zQXJncykgPT4ge1xyXG4gIHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25Hcm91cElkOiBcImV4cGVuc2Utc2hlZXQtZGV0YWlsLWFjdGlvbnNcIixcclxuICAgIGlkczoge1xyXG4gICAgICBlZGl0SWNvbklkOiBcImV4cGVuc2VFZGl0SWNvblwiLFxyXG4gICAgICBzYXZlSWNvbklkOiBcImV4cGVuc2VTYXZlSWNvblwiLFxyXG4gICAgICBkZWxldGVCdG5JZDogXCJleHBlbnNlRGVsZXRlQnRuXCIsXHJcbiAgICAgIGNhbmNlbEJ0bklkOiBcImV4cGVuc2VDYW5jZWxCdG5cIixcclxuICAgIH0sXHJcbiAgICBldmVudHM6IHtcclxuICAgICAgZWRpdEV2ZW50OiBcImV4cGVuc2UtZGV0YWlsLWVkaXRcIixcclxuICAgICAgZGVsZXRlRXZlbnQ6IFwiZXhwZW5zZS1kZXRhaWwtZGVsZXRlXCIsXHJcbiAgICAgIGNhbmNlbEV2ZW50OiBcImV4cGVuc2UtZGV0YWlsLWNhbmNlbC1lZGl0XCIsXHJcbiAgICB9LFxyXG4gICAgYnVzeSxcclxuICAgIG1vZGFsT3BlbixcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzTG9ja2VkLFxyXG4gICAgYWN0aW9uTW9kZSxcclxuICAgIGlzRWRpdExvY2tlZCxcclxuICAgIGlzRGVsZXRlTG9ja2VkLFxyXG4gICAgYWxsb3dDcmVhdGVNb2RlQWN0aW9uc1doZW5Mb2NrZWQ6IHRydWUsXHJcbiAgICBwZXJtaXNzaW9uc1JlYWR5LFxyXG4gICAgY2FuQ3JlYXRlOiBjYW5DcmVhdGVFeHBlbnNlLFxyXG4gICAgY2FuRWRpdDogY2FuRWRpdEV4cGVuc2UsXHJcbiAgICBjYW5EZWxldGU6IGNhbkRlbGV0ZUV4cGVuc2UsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBoYW5kbGVTYXZlOiBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBzYXZlQ29uZmlybVRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiwgXCJTYXZlIGNoYW5nZXNcIiksXHJcbiAgICBzYXZlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gc2F2ZSBjaGFuZ2VzP1wiKSxcclxuICAgIHNhdmVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1UaXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZVNoZWV0X1RpdGxlXCIsIFwiRGVsZXRlIGV4cGVuc2Ugc2hlZXRcIiksXHJcbiAgICBkZWxldGVDb25maXJtTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZVNoZWV0X0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBleHBlbnNlIHNoZWV0P1wiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkRlbGV0ZVwiKSxcclxuICAgIG9uU2F2ZVN1Y2Nlc3MsXHJcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6IG9uRGVsZXRlU3VjY2VzcyB8fCAoKCkgPT4gbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL0V4cGVuc2VTaGVldHNcIikpLFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgfSk7XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHtcclxuICBFeHBlbnNlU2hlZXRIZWFkZXIsXHJcbiAgRXhwZW5zZVNoZWV0TGluZSxcclxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwsXHJcbiAgZ2V0RXhjaGFuZ2VSYXRlLFxyXG4gIGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUsXHJcbiAgbWFwRXhwZW5zZVNoZWV0SGVhZGVyLFxyXG4gIG1hcEV4cGVuc2VTaGVldExpbmUsXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHtcclxuICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsXHJcbiAgbmF2aWdhdGVUb0V4cGVuc2VVcmwsXHJcbiAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCxcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcclxuaW1wb3J0IHsgaXNNYW5hZ2luZ090aGVyRXhwZW5zZVJlY29yZCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTWFuYWdlZFVzZXJTY29wZS50c1wiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leGNoYW5nZVJhdGVFbnRyeU1vZGVDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSwgaGFzQXNzaWduZWRWb3VjaGVyLCBwYXJzZUV4cGVuc2VEYXRlLCBzYWZlVGV4dCwgdG9Jc29EYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlciwgcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZUV4cGVuc2VTaGVldERldGFpbFBvbGljeSB9IGZyb20gXCIuL2V4cGVuc2VTaGVldERldGFpbFBvbGljeS50c1wiO1xyXG5cclxuY29uc3QgRVhDSEFOR0VfUkFURV9ERUJPVU5DRV9NUyA9IDQwMDtcclxuY29uc3QgRVhDSEFOR0VfUkFURV9SRUZFUkVOQ0VfQU1PVU5UID0gMTAwO1xyXG5jb25zdCBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTID0gNztcclxuY29uc3QgRVhQRU5TRV9TVEFUVVNfQVBQUk9WRUQgPSAyO1xyXG5jb25zdCBFWFBFTlNFX1NUQVRVU19QQUlEID0gNDtcclxuXHJcbi8vIE5vcm1hbGl6ZXMgZXhjaGFuZ2UtcmF0ZSBudW1iZXJzIGZvciBudW1lcmljIGlucHV0IGNvbnRyb2xzLlxyXG5jb25zdCBmb3JtYXRFeGNoYW5nZVJhdGVJbnB1dFZhbHVlID0gKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIodmFsdWUsIHtcclxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcclxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcclxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gICAgZmFsbGJhY2s6IFwiXCIsXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyBSZXVzZXMgdGhlIGZpeGVkIHNhbWUtY3VycmVuY3kgcmF0ZSBzbyBFVVIgc2hlZXRzIHN0YXkgYWxpZ25lZCB3aXRoIHRoZSAxMDAgcmVmZXJlbmNlIGFtb3VudC5cclxuY29uc3QgU0FNRV9DVVJSRU5DWV9FWENIQU5HRV9SQVRFX0lOUFVUID0gZm9ybWF0RXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZShFWENIQU5HRV9SQVRFX1JFRkVSRU5DRV9BTU9VTlQpO1xyXG5cclxuY29uc3QgYnVpbGRDcmVhdGVIZWFkZXJEcmFmdCA9ICgpOiBFeHBlbnNlU2hlZXRIZWFkZXIgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBob2phR2FzdG9zSWQ6IFwiXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJcIixcclxuICAgIHByb2pJZDogXCJcIixcclxuICAgIGN1cnJlbmN5Q29kZTogXCJcIixcclxuICAgIHRvdGFsQW1vdW50OiBudWxsLFxyXG4gICAgZXhwZW5zZVNoZWV0U3RhdHVzOiAwLFxyXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogMCxcclxuICAgIGNyZWF0ZWREYXRlOiBcIlwiLFxyXG4gICAgZXhjaFJhdGU6IFN0cmluZyhFWENIQU5HRV9SQVRFX1JFRkVSRU5DRV9BTU9VTlQpLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBzaG91bGRTaG93RXhjaGFuZ2VSYXRlID0gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gZmFsc2U7XHJcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KHZhbHVlKTtcclxuICBpZiAocGFyc2VkID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuICByZXR1cm4gTWF0aC5hYnMocGFyc2VkKSA+IDA7XHJcbn07XHJcblxyXG50eXBlIFVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlQXJncyA9IHtcclxuICBoYXNBY2Nlc3M6IGJvb2xlYW47XHJcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xyXG4gIGNhbk1hbmFnZU90aGVyVXNlcnM6IGJvb2xlYW47XHJcbiAgY3VycmVudEF4VXNlcklkOiBzdHJpbmc7XHJcbiAgY3VycmVudENybVVzZXJJZDogc3RyaW5nO1xyXG4gIHNlbGVjdGVkTWFuYWdlZFVzZXJJZDogc3RyaW5nO1xyXG4gIHNoZWV0SWQ6IHN0cmluZztcclxuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XHJcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBPd25zIHN0YXRlIGFuZCBiZWhhdmlvciBmb3IgZXhwZW5zZSBzaGVldCBkZXRhaWwgcGFnZSAocmVhZCwgZWRpdCwgY3JlYXRlKS5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlID0gKHtcclxuICBoYXNBY2Nlc3MsXHJcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgY3VycmVudEF4VXNlcklkLFxyXG4gIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gIHNoZWV0SWQsXHJcbiAgaXNDcmVhdGVNb2RlLFxyXG4gIG9uRm9yYmlkZGVuLFxyXG59OiBVc2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZUFyZ3MpID0+IHtcclxuICBjb25zdCBbaGVhZGVyLCBzZXRIZWFkZXJdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0SGVhZGVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2xpbmVzLCBzZXRMaW5lc10gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRMaW5lW10+KFtdKTtcclxuICBjb25zdCBbbGluZVBhZ2UsIHNldExpbmVQYWdlXSA9IHVzZVN0YXRlKDEpO1xyXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2lzRWRpdGluZywgc2V0SXNFZGl0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbW9kYWxFcnJvciwgc2V0TW9kYWxFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnREZXNjcmlwdGlvbiwgc2V0RHJhZnREZXNjcmlwdGlvbl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRQcm9qZWN0SWQsIHNldERyYWZ0UHJvamVjdElkXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdEN1cnJlbmN5Q29kZSwgc2V0RHJhZnRDdXJyZW5jeUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0RXhjaGFuZ2VSYXRlLCBzZXREcmFmdEV4Y2hhbmdlUmF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRFc3RhZG9Db21lbnRhcmlvcywgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvc10gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZGVmYXVsdEN1cnJlbmN5Q29kZSwgc2V0RGVmYXVsdEN1cnJlbmN5Q29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbaXNFeGNoYW5nZVJhdGVMb2FkaW5nLCBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtleGNoYW5nZVJhdGVNZXNzYWdlLCBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtleGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvciwgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLCBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlLCBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUsIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICBjb25zdCBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyID0gdXNlQ2FsbGJhY2soKG5leHRIZWFkZXI6IEV4cGVuc2VTaGVldEhlYWRlciB8IG51bGwpID0+IHtcclxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24oc2FmZVRleHQobmV4dEhlYWRlcj8uZGVzY3JpcHRpb24pKTtcclxuICAgIHNldERyYWZ0UHJvamVjdElkKHNhZmVUZXh0KG5leHRIZWFkZXI/LnByb2pJZCkpO1xyXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUoc2FmZVRleHQobmV4dEhlYWRlcj8uY3VycmVuY3lDb2RlKSk7XHJcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZShcclxuICAgICAgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKG5leHRIZWFkZXI/LmV4Y2hSYXRlLCB7XHJcbiAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxyXG4gICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcclxuICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgICAgICBmYWxsYmFjazogXCJcIixcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgICBzZXREcmFmdEVzdGFkb0NvbWVudGFyaW9zKHNhZmVUZXh0KG5leHRIZWFkZXI/LmVzdGFkb0NvbWVudGFyaW9zKSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgbG9hZERldGFpbCA9IGFzeW5jICgpID0+IHtcclxuICAgICAgaWYgKCFoYXNBY2Nlc3MpIHtcclxuICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSkge1xyXG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRyYWZ0SGVhZGVyID0gYnVpbGRDcmVhdGVIZWFkZXJEcmFmdCgpO1xyXG4gICAgICAgIHNldEhlYWRlcihkcmFmdEhlYWRlcik7XHJcbiAgICAgICAgc2V0TGluZXMoW10pO1xyXG4gICAgICAgIHNldExpbmVQYWdlKDEpO1xyXG4gICAgICAgIHNldElzRWRpdGluZyh0cnVlKTtcclxuICAgICAgICBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyKGRyYWZ0SGVhZGVyKTtcclxuICAgICAgICBzZXRTdGF0dXMoXCJcIik7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFzaGVldElkKSB7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCB3YXMgbm90IGZvdW5kLlwiKSk7XHJcbiAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcclxuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsKHNoZWV0SWQsIHtcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2U/Lk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBkZXRhaWwuXCIpKTtcclxuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNoZWV0cyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRTaGVldCA9XHJcbiAgICAgICAgICBzaGVldHMuZmluZCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5Py5Ib2phR2FzdG9zSWQpLnRvVXBwZXJDYXNlKCkgPT09IHNoZWV0SWQudHJpbSgpLnRvVXBwZXJDYXNlKCkpIHx8IHNoZWV0c1swXTtcclxuXHJcbiAgICAgICAgaWYgKCFzZWxlY3RlZFNoZWV0KSB7XHJcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG5leHRIZWFkZXIgPSBtYXBFeHBlbnNlU2hlZXRIZWFkZXIoc2VsZWN0ZWRTaGVldCk7XHJcbiAgICAgICAgY29uc3QgbmV4dExpbmVzID0gKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRTaGVldC5MaW5lcykgPyBzZWxlY3RlZFNoZWV0LkxpbmVzIDogW10pLm1hcCgoZW50cnkpID0+XHJcbiAgICAgICAgICBtYXBFeHBlbnNlU2hlZXRMaW5lKGVudHJ5KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgc2V0SGVhZGVyKG5leHRIZWFkZXIpO1xyXG4gICAgICAgIHNldExpbmVzKG5leHRMaW5lcyk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShcclxuICAgICAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBkZXRhaWwuXCIpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgc2V0TGluZXMoW10pO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdm9pZCBsb2FkRGV0YWlsKCk7XHJcbiAgfSwgW2NhbkNyZWF0ZUV4cGVuc2UsIGhhc0FjY2VzcywgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNDcmVhdGVNb2RlLCBvbkZvcmJpZGRlbiwgc2hlZXRJZF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFoZWFkZXIgfHwgaXNFZGl0aW5nKSByZXR1cm47XHJcbiAgICBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyKGhlYWRlcik7XHJcbiAgfSwgW2hlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNFZGl0aW5nXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWhhc0FjY2VzcykgcmV0dXJuO1xyXG4gICAgbGV0IGlzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG5cclxuICAgIGNvbnN0IGxvYWREZWZhdWx0Q3VycmVuY3lDb2RlID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSBhd2FpdCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlKHtcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcclxuICAgICAgICBzZXREZWZhdWx0Q3VycmVuY3lDb2RlKHNhZmVUZXh0KGNvZGUpLnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSBcIkFib3J0RXJyb3JcIikgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZvaWQgbG9hZERlZmF1bHRDdXJyZW5jeUNvZGUoKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlzQ2FuY2VsbGVkID0gdHJ1ZTtcclxuICAgICAgY29udHJvbGxlci5hYm9ydCgpO1xyXG4gICAgfTtcclxuICB9LCBbaGFzQWNjZXNzXSk7XHJcblxyXG4gIGNvbnN0IGhhc0FjdGl2ZVByb2Nlc3MgPSB1c2VNZW1vKCgpID0+IGJ1c3kgfHwgaXNFZGl0aW5nLCBbYnVzeSwgaXNFZGl0aW5nXSk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoaGFzQWN0aXZlUHJvY2Vzcyk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcclxuICAgIH07XHJcbiAgfSwgW2hhc0FjdGl2ZVByb2Nlc3NdKTtcclxuXHJcbiAgY29uc3QgcHJvamVjdFZhbHVlID0gc2FmZVRleHQoaGVhZGVyPy5wcm9qSWQpO1xyXG4gIGNvbnN0IHN0YXR1c0NvZGUgPSB0eXBlb2YgaGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMgPT09IFwibnVtYmVyXCIgPyBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzIDogbnVsbDtcclxuICBjb25zdCBpc1NoZWV0QXBwcm92ZWQgPSBzdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19BUFBST1ZFRDtcclxuICBjb25zdCBpc1NoZWV0UGFpZEJ5U3RhdHVzID0gc3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfUEFJRDtcclxuICBjb25zdCBpc1NoZWV0UGFpZEJ5Vm91Y2hlciA9IGhhc0Fzc2lnbmVkVm91Y2hlcihoZWFkZXI/LnZvdWNoZXIpO1xyXG4gIGNvbnN0IGlzU2hlZXRQYWlkID0gaXNTaGVldFBhaWRCeVN0YXR1cyB8fCBpc1NoZWV0UGFpZEJ5Vm91Y2hlcjtcclxuICBjb25zdCBpc01hbmFnaW5nT3RoZXJVc2VyID0gaXNNYW5hZ2luZ090aGVyRXhwZW5zZVJlY29yZCh7XHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIHJlY29yZE93bmVyVXNlcklkOiBoZWFkZXI/LnVzZXJJZCxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICB9KTtcclxuICBjb25zdCBkZXRhaWxQb2xpY3kgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpbnRlcmFjdGlvbk1vZGU6IFwiZnVsbF9lZGl0XCIgYXMgY29uc3QsXHJcbiAgICAgICAgc2hvd0ZhYjogZmFsc2UsXHJcbiAgICAgICAgY2FuRGVsZXRlU2hlZXQ6IGZhbHNlLFxyXG4gICAgICAgIHN0YXR1c0FjdGlvbnM6IFtdLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXNvbHZlRXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5KHtcclxuICAgICAgc3RhdHVzQ29kZSxcclxuICAgICAgaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgICAgaXNQYWlkOiBpc1NoZWV0UGFpZCxcclxuICAgIH0pO1xyXG4gIH0sIFthbGxvd1NlbGZNYW5hZ2VtZW50LCBpc0NyZWF0ZU1vZGUsIGlzTWFuYWdpbmdPdGhlclVzZXIsIGlzU2hlZXRQYWlkLCBzdGF0dXNDb2RlXSk7XHJcbiAgY29uc3QgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQgPSBpc0NyZWF0ZU1vZGUgfHwgKCFpc01hbmFnaW5nT3RoZXJVc2VyICYmIGRldGFpbFBvbGljeS5pbnRlcmFjdGlvbk1vZGUgPT09IFwiZnVsbF9lZGl0XCIpO1xyXG4gIGNvbnN0IGNhbkVkaXRTdGF0dXNDb21tZW50Q3VycmVudCA9ICFpc0NyZWF0ZU1vZGUgJiYgZGV0YWlsUG9saWN5LmludGVyYWN0aW9uTW9kZSA9PT0gXCJjb21tZW50X29ubHlfZWRpdFwiO1xyXG4gIGNvbnN0IGNhbkVkaXRBbnlDdXJyZW50ID0gKGlzQ3JlYXRlTW9kZSAmJiBjYW5DcmVhdGVFeHBlbnNlKSB8fCBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCB8fCBjYW5FZGl0U3RhdHVzQ29tbWVudEN1cnJlbnQ7XHJcbiAgY29uc3QgY2FuVXNlRnVsbEVkaXRGZWF0dXJlcyA9ICFpc0NyZWF0ZU1vZGUgJiYgZGV0YWlsUG9saWN5LmludGVyYWN0aW9uTW9kZSA9PT0gXCJmdWxsX2VkaXRcIjtcclxuICBjb25zdCBpc1NoZWV0TG9ja2VkID0gaXNTaGVldEFwcHJvdmVkIHx8IGlzU2hlZXRQYWlkO1xyXG4gIGNvbnN0IGhhc0xpbmVzID0gbGluZXMubGVuZ3RoID4gMDtcclxuICBjb25zdCBleGNoYW5nZVJhdGVWYWx1ZSA9IGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcihzYWZlVGV4dChoZWFkZXI/LmV4Y2hSYXRlKSwge1xyXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxyXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxyXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICBmYWxsYmFjazogXCJcIixcclxuICB9KTtcclxuICBjb25zdCBzaG93RXhjaGFuZ2VSYXRlID0gdXNlTWVtbygoKSA9PiBzaG91bGRTaG93RXhjaGFuZ2VSYXRlKGV4Y2hhbmdlUmF0ZVZhbHVlKSwgW2V4Y2hhbmdlUmF0ZVZhbHVlXSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgPSB1c2VNZW1vKCgpID0+IGRyYWZ0Q3VycmVuY3lDb2RlLnRyaW0oKS50b1VwcGVyQ2FzZSgpLCBbZHJhZnRDdXJyZW5jeUNvZGVdKTtcclxuICBjb25zdCBub3JtYWxpemVkRGVmYXVsdEN1cnJlbmN5ID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChkZWZhdWx0Q3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpLCBbZGVmYXVsdEN1cnJlbmN5Q29kZV0pO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSA9IG5vcm1hbGl6ZWREZWZhdWx0Q3VycmVuY3kgfHwgXCJFVVJcIjtcclxuICBjb25zdCB1aUxvY2FsZSA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIFwiZXMtRVNcIjtcclxuICAgIHJldHVybiBzYWZlVGV4dChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ/LmxhbmcpIHx8IFwiZXMtRVNcIjtcclxuICB9LCBbXSk7XHJcbiAgY29uc3QgZm9ybUV4Y2hhbmdlRGF0ZSA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgcGFyc2VkRGF0ZSA9IHBhcnNlRXhwZW5zZURhdGUoc2FmZVRleHQoaGVhZGVyPy5jcmVhdGVkRGF0ZSkpO1xyXG4gICAgaWYgKHBhcnNlZERhdGUpIHJldHVybiB0b0lzb0RhdGUocGFyc2VkRGF0ZSk7XHJcbiAgICByZXR1cm4gdG9Jc29EYXRlKG5ldyBEYXRlKCkpO1xyXG4gIH0sIFtoZWFkZXI/LmNyZWF0ZWREYXRlXSk7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlUmVxdWlyZWQgPVxyXG4gICAgaXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50ICYmIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5ICE9PSBcIlwiICYmIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5ICE9PSBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UgPVxyXG4gICAgZXhjaGFuZ2VSYXRlUmVxdWlyZWQgJiYgIWRyYWZ0RXhjaGFuZ2VSYXRlLnRyaW0oKVxyXG4gICAgICA/IGluZFQoXHJcbiAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9FeGNoYW5nZVJhdGVSZXF1aXJlZFwiLFxyXG4gICAgICAgICAgXCJFeGNoYW5nZSByYXRlIGlzIHJlcXVpcmVkIHdoZW4gY3VycmVuY3kgaXMgZGlmZmVyZW50IGZyb20gYmFzZSBjdXJyZW5jeS5cIlxyXG4gICAgICAgIClcclxuICAgICAgOiBcIlwiO1xyXG4gIC8vIEN1cnJlbmN5IHR5cGUgY2FuIGJlIGVkaXRlZCB3aGVuZXZlciB0aGUgc2hlZXQgaXRzZWxmIGlzIGVkaXRhYmxlIChub3QgYXBwcm92ZWQvcGFpZCkuXHJcbiAgY29uc3QgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMgPSBmYWxzZTtcclxuICBjb25zdCBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMgPSBpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQgJiYgaGFzTGluZXMgJiYgc2hvd0V4Y2hhbmdlUmF0ZTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGxldCBpc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgbGV0IHJlcXVlc3RUaW1lcjogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4gfCBudWxsID0gbnVsbDtcclxuICAgIGxldCByZXF1ZXN0QWJvcnRDb250cm9sbGVyOiBBYm9ydENvbnRyb2xsZXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBjb25zdCBjbGVhclJlcXVlc3RBcnRpZmFjdHMgPSAoKSA9PiB7XHJcbiAgICAgIGlmIChyZXF1ZXN0VGltZXIpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQocmVxdWVzdFRpbWVyKTtcclxuICAgICAgICByZXF1ZXN0VGltZXIgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChyZXF1ZXN0QWJvcnRDb250cm9sbGVyKSB7XHJcbiAgICAgICAgcmVxdWVzdEFib3J0Q29udHJvbGxlci5hYm9ydCgpO1xyXG4gICAgICAgIHJlcXVlc3RBYm9ydENvbnRyb2xsZXIgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmICghaXNFZGl0aW5nIHx8ICFjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCB8fCBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMpIHtcclxuICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xyXG4gICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGNsZWFyUmVxdWVzdEFydGlmYWN0cygpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgfHwgIWV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSkge1xyXG4gICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcoZmFsc2UpO1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFwiXCIpO1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XHJcbiAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5ID09PSBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3kpIHtcclxuICAgICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUoU0FNRV9DVVJSRU5DWV9FWENIQU5HRV9SQVRFX0lOUFVUKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShTQU1FX0NVUlJFTkNZX0VYQ0hBTkdFX1JBVEVfSU5QVVQpO1xyXG4gICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcoZmFsc2UpO1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFwiXCIpO1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XHJcbiAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdFRpbWVyID0gc2V0VGltZW91dChhc3luYyAoKSA9PiB7XHJcbiAgICAgIHJlcXVlc3RBYm9ydENvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcbiAgICAgIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZyh0cnVlKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldEV4Y2hhbmdlUmF0ZShcclxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcclxuICAgICAgICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxyXG4gICAgICAgICAgZm9ybUV4Y2hhbmdlRGF0ZSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgIHNpZ25hbDogcmVxdWVzdEFib3J0Q29udHJvbGxlci5zaWduYWwsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2VzcyB8fCAhcmVzcG9uc2UuRGF0YSB8fCAhTnVtYmVyLmlzRmluaXRlKE51bWJlcihyZXNwb25zZS5EYXRhLlJhdGUpKSkge1xyXG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcclxuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xyXG4gICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcclxuICAgICAgICAgICAgc2FmZVRleHQocmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX1VuYXZhaWxhYmxlXCIsIFwiTm8gc2UgcHVkbyBvYnRlbmVyIGVsIHRpcG8gZGUgY2FtYmlvLlwiKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhlIGVuZHBvaW50IHJldHVybnMgb25lIGJhc2UtY3VycmVuY3kgdW5pdCBpbiB0aGUgZXhwZW5zZSBjdXJyZW5jeS5cclxuICAgICAgICAvLyBUaGUgVUkgc3RvcmVzIHRoZSBhbW91bnQgZm9yIHRoZSBmaXhlZCBsb2NhbCByZWZlcmVuY2UgYW1vdW50ICgxMDApLlxyXG4gICAgICAgIGNvbnN0IG9mZmljaWFsUmF0ZVBlckJhc2VVbml0ID0gTnVtYmVyKHJlc3BvbnNlLkRhdGEuUmF0ZSk7XHJcbiAgICAgICAgY29uc3Qgb2ZmaWNpYWxSYXRlRm9yUmVmZXJlbmNlQW1vdW50ID0gb2ZmaWNpYWxSYXRlUGVyQmFzZVVuaXQgKiBFWENIQU5HRV9SQVRFX1JFRkVSRU5DRV9BTU9VTlQ7XHJcbiAgICAgICAgY29uc3QgbmV4dEV4Y2hhbmdlUmF0ZVZhbHVlID0gZm9ybWF0RXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZShvZmZpY2lhbFJhdGVGb3JSZWZlcmVuY2VBbW91bnQpO1xyXG4gICAgICAgIGNvbnN0IG9mZmljaWFsUmF0ZVJhd1ZhbHVlID0gZm9ybWF0RXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZShvZmZpY2lhbFJhdGVQZXJCYXNlVW5pdCk7XHJcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShuZXh0RXhjaGFuZ2VSYXRlVmFsdWUpO1xyXG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUob2ZmaWNpYWxSYXRlUmF3VmFsdWUpO1xyXG4gICAgICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlKG5leHRFeGNoYW5nZVJhdGVWYWx1ZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGVmZmVjdGl2ZVJhdGVEYXRlID0gc2FmZVRleHQocmVzcG9uc2UuRGF0YS5EYXRlKSB8fCBmb3JtRXhjaGFuZ2VEYXRlO1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGEuU291cmNlKTtcclxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoZWZmZWN0aXZlUmF0ZURhdGUpO1xyXG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKHNvdXJjZSk7XHJcbiAgICAgICAgY29uc3Qgb2ZmaWNpYWxMYWJlbCA9IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlTGFiZWwoMCkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0V4Y2hhbmdlUmF0ZU1vZGVfT2ZmaWNpYWxcIiwgXCJULkMuIE9maWNpYWxcIik7XHJcbiAgICAgICAgY29uc3QgbG9jYWxpemVkUmF0ZURhdGUgPSBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoZWZmZWN0aXZlUmF0ZURhdGUsIHVpTG9jYWxlKSB8fCBlZmZlY3RpdmVSYXRlRGF0ZTtcclxuICAgICAgICBjb25zdCBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZSA9IHNvdXJjZSA/IGAke29mZmljaWFsTGFiZWx9ICR7bG9jYWxpemVkUmF0ZURhdGV9ICgke3NvdXJjZX0pYCA6IGAke29mZmljaWFsTGFiZWx9ICR7bG9jYWxpemVkUmF0ZURhdGV9YDtcclxuICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKG9mZmljaWFsUmF0ZVJhd1ZhbHVlID8gYCR7ZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2V9IC0gJHtvZmZpY2lhbFJhdGVSYXdWYWx1ZX1gIDogZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UpO1xyXG4gICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcclxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikge1xyXG4gICAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDA0KSB7XHJcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XHJcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XHJcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcclxuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XHJcbiAgICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX05vdEZvdW5kXCIsIFwiTm8gaGF5IHRpcG8gZGUgY2FtYmlvIHBhcmEgbGEgZmVjaGFcIikpO1xyXG4gICAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQyMiB8fCBlcnJvci5zdGF0dXMgPT09IDUwMCkge1xyXG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFxyXG4gICAgICAgICAgICAgIHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9VbmF2YWlsYWJsZVwiLCBcIk5vIHNlIHB1ZG8gb2J0ZW5lciBlbCB0aXBvIGRlIGNhbWJpby5cIilcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xyXG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcclxuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xyXG4gICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcclxuICAgICAgICAgICAgc2FmZVRleHQoZXJyb3IubWVzc2FnZSkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX1VuYXZhaWxhYmxlXCIsIFwiTm8gc2UgcHVkbyBvYnRlbmVyIGVsIHRpcG8gZGUgY2FtYmlvLlwiKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcclxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xyXG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcclxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9VbmF2YWlsYWJsZVwiLCBcIk5vIHNlIHB1ZG8gb2J0ZW5lciBlbCB0aXBvIGRlIGNhbWJpby5cIikpO1xyXG4gICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIGlmICghaXNDYW5jZWxsZWQpIHtcclxuICAgICAgICAgIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LCBFWENIQU5HRV9SQVRFX0RFQk9VTkNFX01TKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpc0NhbmNlbGxlZCA9IHRydWU7XHJcbiAgICAgIGNsZWFyUmVxdWVzdEFydGlmYWN0cygpO1xyXG4gICAgfTtcclxuICB9LCBbXHJcbiAgICBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcclxuICAgIGZvcm1FeGNoYW5nZURhdGUsXHJcbiAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXHJcbiAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcclxuICAgIHVpTG9jYWxlLFxyXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUVuYWJsZUVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoaXNDcmVhdGVNb2RlIHx8IGlzTG9hZGluZyB8fCAhaGVhZGVyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWNhbkVkaXRBbnlDdXJyZW50KSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgc2V0SXNFZGl0aW5nKHRydWUpO1xyXG4gICAgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlcihoZWFkZXIpO1xyXG4gICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9FZGl0aW5nRW5hYmxlZFwiLCBcIkVkaXRpbmcgZW5hYmxlZFwiKSk7XHJcbiAgfSwgW2NhbkVkaXRBbnlDdXJyZW50LCBoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIsIGlzQ3JlYXRlTW9kZSwgaXNMb2FkaW5nLCBvbkZvcmJpZGRlbl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDYW5jZWxFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvRXhwZW5zZVNoZWV0c1wiLCB7XHJcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNFZGl0aW5nKSByZXR1cm47XHJcblxyXG4gICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyKGhlYWRlcik7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIikpO1xyXG4gIH0sIFtoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIsIGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nXSk7XHJcblxyXG4gIC8vIE9wZW5zIGV4cGVuc2Ugc2hlZXQgY3JlYXRlIG1vZGUgZnJvbSBsaXN0LWxldmVsIGVudHJ5IHBvaW50cy5cclxuICBjb25zdCBoYW5kbGVPcGVuQ3JlYXRlU2hlZXRNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFjYW5DcmVhdGVFeHBlbnNlKSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP21vZGU9Y3JlYXRlXCIsIHtcclxuICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXHJcbiAgICB9KTtcclxuICB9LCBbY2FuQ3JlYXRlRXhwZW5zZSwgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmcsIG9uRm9yYmlkZGVuXSk7XHJcblxyXG4gIC8vIE9wZW5zIGV4cGVuc2UgbGluZSBjcmVhdGUgbW9kZSBmcm9tIGFuIGV4aXN0aW5nIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlxyXG4gIGNvbnN0IGhhbmRsZU9wZW5DcmVhdGVMaW5lTW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghc2hlZXRJZCB8fCAhY2FuVXNlRnVsbEVkaXRGZWF0dXJlcykge1xyXG4gICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0TGluZURldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2hlZXRJZCl9Jm1vZGU9Y3JlYXRlYDtcclxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCwge1xyXG4gICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcclxuICAgIH0pO1xyXG4gIH0sIFtjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcclxuXHJcbiAgLy8gT3BlbnMgdGlja2V0cyBwYWdlIGZyb20gZXhwZW5zZSBzaGVldCBjb250ZXh0IHRvIGNyZWF0ZSBvciBsaW5rIHRpY2tldHMuXHJcbiAgY29uc3Qgb3BlblRpY2tldHNGcm9tU2hlZXQgPSB1c2VDYWxsYmFjayhcclxuICAgIChhY3Rpb246IFwibmV3XCIgfCBcImxpbmtcIikgPT4ge1xyXG4gICAgICBpZiAoIXNoZWV0SWQgfHwgIWNhblVzZUZ1bGxFZGl0RmVhdHVyZXMpIHtcclxuICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgICBhY3Rpb24sXHJcbiAgICAgICAgaG9qYUdhc3Rvc0lkOiBzaGVldElkLFxyXG4gICAgICB9KTtcclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0cz8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xyXG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogaXNFZGl0aW5nLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbY2FuVXNlRnVsbEVkaXRGZWF0dXJlcywgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmcsIG9uRm9yYmlkZGVuLCBzaGVldElkXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU9wZW5DcmVhdGVUaWNrZXRNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgb3BlblRpY2tldHNGcm9tU2hlZXQoXCJuZXdcIik7XHJcbiAgfSwgW29wZW5UaWNrZXRzRnJvbVNoZWV0XSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIG9wZW5UaWNrZXRzRnJvbVNoZWV0KFwibGlua1wiKTtcclxuICB9LCBbb3BlblRpY2tldHNGcm9tU2hlZXRdKTtcclxuXHJcbiAgY29uc3QgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldCA9IHVzZUNhbGxiYWNrKChjcmVhdGVkU2hlZXRJZDogc3RyaW5nKSA9PiB7XHJcbiAgICBjb25zdCBzYWZlQ3JlYXRlZFNoZWV0SWQgPSBzYWZlVGV4dChjcmVhdGVkU2hlZXRJZCk7XHJcbiAgICBpZiAoIXNhZmVDcmVhdGVkU2hlZXRJZCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHRhcmdldFVybCA9IGAvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZUNyZWF0ZWRTaGVldElkKX1gO1xyXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwodGFyZ2V0VXJsKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IG5hdmlnYXRlVG9MaW5lRGV0YWlsID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoXHJcbiAgICAgIGxpbmVSZWNJZDogc3RyaW5nLFxyXG4gICAgICBvcHRpb25zPzoge1xyXG4gICAgICAgIG1vZGU/OiBcInZpZXdcIiB8IFwiZWRpdFwiO1xyXG4gICAgICAgIGFza0NvbmZpcm1hdGlvbj86IGJvb2xlYW47XHJcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlPzogYm9vbGVhbjtcclxuICAgICAgfVxyXG4gICAgKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNhZmVMaW5lSWQgPSBzYWZlVGV4dChsaW5lUmVjSWQpO1xyXG4gICAgICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KHNoZWV0SWQpO1xyXG4gICAgICBpZiAoIXNhZmVMaW5lSWQgfHwgIXNhZmVTaGVldElkKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBzYWZlTW9kZSA9IG9wdGlvbnM/Lm1vZGUgPT09IFwiZWRpdFwiID8gXCJlZGl0XCIgOiBcIlwiO1xyXG4gICAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXRMaW5lRGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlU2hlZXRJZCl9JmxpbmVSZWNJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlTGluZUlkKX0ke3NhZmVNb2RlID8gYCZtb2RlPSR7c2FmZU1vZGV9YCA6IFwiXCJ9YDtcclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwodGFyZ2V0VXJsLCB7XHJcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBvcHRpb25zPy5hc2tDb25maXJtYXRpb24gPz8gdHJ1ZSxcclxuICAgICAgICBieXBhc3NHdWFyZE9uY2U6IG9wdGlvbnM/LmJ5cGFzc0d1YXJkT25jZSA/PyBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW3NoZWV0SWRdXHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGhlYWRlcixcclxuICAgIGxpbmVzLFxyXG4gICAgbGluZVBhZ2UsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBidXN5LFxyXG4gICAgc3RhdHVzLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgbW9kYWxFcnJvcixcclxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBkcmFmdFByb2plY3RJZCxcclxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgZHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSxcclxuICAgIGlzRXhjaGFuZ2VSYXRlTG9hZGluZyxcclxuICAgIGV4Y2hhbmdlUmF0ZU1lc3NhZ2UsXHJcbiAgICBleGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcixcclxuICAgIHByb2plY3RWYWx1ZSxcclxuICAgIGlzU2hlZXRBcHByb3ZlZCxcclxuICAgIGlzU2hlZXRQYWlkLFxyXG4gICAgaXNTaGVldExvY2tlZCxcclxuICAgIGV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gICAgc2hvd0V4Y2hhbmdlUmF0ZSxcclxuICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxyXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50OiBFWENIQU5HRV9SQVRFX1JFRkVSRU5DRV9BTU9VTlQsXHJcbiAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSxcclxuICAgIGRldGFpbFBvbGljeSxcclxuICAgIGlzTWFuYWdpbmdPdGhlclVzZXIsXHJcbiAgICBjYW5FZGl0U3RhdHVzQ29tbWVudEN1cnJlbnQsXHJcbiAgICBjYW5FZGl0QW55Q3VycmVudCxcclxuICAgIGNhblVzZUZ1bGxFZGl0RmVhdHVyZXMsXHJcbiAgICBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcclxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxyXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gICAgc2V0TGluZVBhZ2UsXHJcbiAgICBzZXRMaW5lcyxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICAgIHNldERyYWZ0UHJvamVjdElkLFxyXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIHNldERyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICAgIGhhbmRsZU9wZW5DcmVhdGVTaGVldE1vZGUsXHJcbiAgICBoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUsXHJcbiAgICBoYW5kbGVPcGVuQ3JlYXRlVGlja2V0TW9kZSxcclxuICAgIGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSxcclxuICAgIG5hdmlnYXRlVG9DcmVhdGVkU2hlZXQsXHJcbiAgICBuYXZpZ2F0ZVRvTGluZURldGFpbCxcclxuICB9O1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUFrQjs7O0FDQWxCLElBQUFDLGdCQUFrQjs7O0FDQWxCLG1CQUFpRjtBQUNqRix1QkFBNkI7QUF5R3JCO0FBN0ZSLElBQU0sd0JBQXdCLENBQUM7QUFBQSxFQUM3QjtBQUFBLEVBQ0E7QUFBQSxFQUNBLFlBQVk7QUFBQSxFQUNaLGlCQUFpQjtBQUNuQixNQUFrQztBQUNoQyxRQUFNLGdDQUFnQztBQUN0QyxRQUFNLDhCQUE4QjtBQUNwQyxRQUFNLHVCQUF1QjtBQUM3QixRQUFNLGdCQUFnQjtBQUN0QixRQUFNLENBQUMsUUFBUSxTQUFTLFFBQUksdUJBQVMsS0FBSztBQUMxQyxRQUFNLENBQUMsWUFBWSxhQUFhLFFBQUksdUJBQThCO0FBQUEsSUFDaEUsVUFBVTtBQUFBLElBQ1YsS0FBSztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLEVBQ2QsQ0FBQztBQUNELFFBQU0sZ0JBQVkscUJBQWlDLElBQUk7QUFDdkQsUUFBTSxlQUFXLHFCQUE4QixJQUFJO0FBRW5ELGtCQUFnQixDQUFDLFdBQVcsUUFBUSxHQUFHLE1BQU0sVUFBVSxLQUFLLENBQUM7QUFDN0QsUUFBTSwwQkFBc0IsMEJBQVksTUFBTTtBQUM1QyxRQUFJLE9BQU8sV0FBVyxhQUFhO0FBQ2pDO0FBQUEsSUFDRjtBQUVBLFVBQU0sZ0JBQWdCLFVBQVU7QUFDaEMsVUFBTSxlQUFlLFNBQVM7QUFDOUIsUUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWM7QUFDbkM7QUFBQSxJQUNGO0FBRUEsVUFBTSxhQUFhLGNBQWMsc0JBQXNCO0FBQ3ZELFVBQU0sWUFBWSxhQUFhLHNCQUFzQjtBQUNyRCxVQUFNLGdCQUFnQixPQUFPO0FBQzdCLFVBQU0saUJBQWlCLE9BQU87QUFDOUIsVUFBTSxZQUFZLEtBQUssSUFBSSxVQUFVLE9BQU8sS0FBSyxJQUFJLEtBQUssZ0JBQWdCLGdDQUFnQyxDQUFDLENBQUM7QUFFNUcsUUFBSSxPQUFPLFdBQVcsT0FBTyxXQUFXLFFBQVEsSUFBSSxZQUFZO0FBQ2hFLFdBQU8sS0FBSyxJQUFJLCtCQUErQixLQUFLLElBQUksTUFBTSxnQkFBZ0IsWUFBWSw2QkFBNkIsQ0FBQztBQUV4SCxRQUFJLE1BQU0sV0FBVyxTQUFTO0FBQzlCLFVBQU0sb0JBQW9CLE1BQU0sVUFBVSxTQUFTLDhCQUE4QjtBQUNqRixRQUFJLG1CQUFtQjtBQUNyQixZQUFNLGtCQUFrQixXQUFXLE1BQU0sVUFBVSxTQUFTO0FBQzVELFlBQU0sbUJBQW1CLDhCQUNyQixrQkFDQSxLQUFLLElBQUksNkJBQTZCLGlCQUFpQixVQUFVLFNBQVMsMkJBQTJCO0FBQUEsSUFDM0c7QUFFQSxrQkFBYztBQUFBLE1BQ1osVUFBVTtBQUFBLE1BQ1YsS0FBSyxLQUFLLE1BQU0sR0FBRztBQUFBLE1BQ25CLE1BQU0sS0FBSyxNQUFNLElBQUk7QUFBQSxNQUNyQixPQUFPLEtBQUssTUFBTSxTQUFTO0FBQUEsTUFDM0IsWUFBWTtBQUFBLElBQ2QsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLENBQUM7QUFFTCxvQ0FBZ0IsTUFBTTtBQUNwQixRQUFJLENBQUMsUUFBUTtBQUNYO0FBQUEsSUFDRjtBQUNBLHdCQUFvQjtBQUFBLEVBQ3RCLEdBQUcsQ0FBQyxRQUFRLFNBQVMsbUJBQW1CLENBQUM7QUFFekMsOEJBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxRQUFRO0FBQ1g7QUFBQSxJQUNGO0FBQ0EsVUFBTSx1QkFBdUIsTUFBTSxvQkFBb0I7QUFDdkQsV0FBTyxpQkFBaUIsVUFBVSxvQkFBb0I7QUFDdEQsV0FBTyxpQkFBaUIsVUFBVSxzQkFBc0IsSUFBSTtBQUM1RCxXQUFPLE1BQU07QUFDWCxhQUFPLG9CQUFvQixVQUFVLG9CQUFvQjtBQUN6RCxhQUFPLG9CQUFvQixVQUFVLHNCQUFzQixJQUFJO0FBQUEsSUFDakU7QUFBQSxFQUNGLEdBQUcsQ0FBQyxRQUFRLG1CQUFtQixDQUFDO0FBRWhDLFFBQU0sZUFBZSxPQUFPLGFBQWEsY0FBYyxPQUFPLFNBQVM7QUFFdkUsU0FDRSw2Q0FBQyxTQUFJLFdBQVcsV0FBVyxlQUFlLFNBQVMsR0FDakQ7QUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsS0FBSztBQUFBLFFBQ0wsTUFBSztBQUFBLFFBQ0wsY0FBWTtBQUFBLFFBQ1osaUJBQWU7QUFBQSxRQUNmLGlCQUFjO0FBQUEsUUFDZCxXQUFVO0FBQUEsUUFDVixPQUFPLEVBQUUsY0FBYyxjQUFjO0FBQUEsUUFDckMsU0FBUyxNQUFNLFVBQVUsQ0FBQyxhQUFhLENBQUMsUUFBUTtBQUFBLFFBRWhEO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxPQUFNO0FBQUEsWUFDTixPQUFNO0FBQUEsWUFDTixRQUFPO0FBQUEsWUFDUCxTQUFRO0FBQUEsWUFDUixNQUFLO0FBQUEsWUFDTCxRQUFPO0FBQUEsWUFDUCxhQUFZO0FBQUEsWUFDWixlQUFjO0FBQUEsWUFDZCxnQkFBZTtBQUFBLFlBQ2YsZUFBWTtBQUFBLFlBQ1osV0FBVTtBQUFBLFlBRVY7QUFBQSwwREFBQyxVQUFLLEdBQUUsS0FBSSxHQUFFLEtBQUksT0FBTSxNQUFLLFFBQU8sTUFBSyxJQUFHLEtBQUksSUFBRyxLQUFJO0FBQUEsY0FDdkQsNENBQUMsVUFBSyxHQUFFLGFBQVk7QUFBQSxjQUNwQiw0Q0FBQyxVQUFLLEdBQUUsZ0JBQWU7QUFBQTtBQUFBO0FBQUEsUUFDekI7QUFBQTtBQUFBLElBQ0Y7QUFBQSxJQUVDLFVBQVUsbUJBQ1A7QUFBQSxNQUNFO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxLQUFLO0FBQUEsVUFDTCxNQUFLO0FBQUEsVUFDTCxPQUFPLEVBQUUsR0FBRyxZQUFZLGNBQWMsY0FBYztBQUFBLFVBQ3BELFdBQVc7QUFBQSxZQUNUO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxVQUVBLHNEQUFDLE9BQUUsV0FBVSxrREFBa0QsbUJBQVE7QUFBQTtBQUFBLE1BQ3pFO0FBQUEsTUFDQTtBQUFBLElBQ0YsSUFDQTtBQUFBLEtBQ047QUFFSjtBQUVBLElBQU8sZ0NBQVE7OztBRG5GRCxJQUFBQyxzQkFBQTtBQXRCZCxJQUFNLG9DQUFvQyxDQUFDO0FBQUEsRUFDekM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUE4QztBQUM1QyxRQUFNLEVBQUUsV0FBVyxvQkFBb0IsSUFBSTtBQUMzQyxRQUFNLEVBQUUsbUJBQW1CLHlCQUF5Qiw2QkFBNkIsaUJBQWlCLElBQUk7QUFDdEcsUUFBTSx1QkFBdUIsY0FBQUMsUUFBTTtBQUFBLElBQ2pDLE1BQU07QUFBQSxNQUNKO0FBQUEsUUFDRSxPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsUUFDTixNQUFNLDZDQUFDLG1DQUF3QixjQUFjLGtCQUFrQixlQUFjLFdBQVU7QUFBQSxNQUN6RjtBQUFBLElBQ0Y7QUFBQSxJQUNBLENBQUMsZ0JBQWdCO0FBQUEsRUFDbkI7QUFDQSxRQUFNLHdCQUF3QixjQUFBQSxRQUFNO0FBQUEsSUFDbEMsTUFBTTtBQUFBLE1BQ0o7QUFBQSxRQUNFLE9BQU8sc0JBQXNCO0FBQUEsUUFDN0IsTUFBTSxzQkFBc0I7QUFBQSxRQUM1QixNQUFNLDZDQUFDLG1DQUF3QixjQUFjLHNCQUFzQixLQUFLLGVBQWMsV0FBVTtBQUFBLE1BQ2xHO0FBQUEsSUFDRjtBQUFBLElBQ0EsQ0FBQyxrQkFBa0I7QUFBQSxFQUNyQjtBQUVBLE1BQUksYUFBYSxxQkFBcUI7QUFDcEMsV0FDRSw4Q0FBQyxTQUFJLFdBQVUsMkJBQ2I7QUFBQSxtREFBQyxTQUFJLFdBQVcsY0FBYyxvQkFBb0IsZ0JBQWdCLGFBQWEsR0FBRyxLQUFLLEdBQ3BGLDhCQUNDLDhFQUNFO0FBQUEsc0RBQUMsU0FBSSxXQUFVLGVBQ2I7QUFBQSx1REFBQyxXQUFNLFdBQVUsNEJBQTRCLGdDQUFxQjtBQUFBLFVBQ2xFO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxPQUFPO0FBQUEsY0FDUCxhQUFhLEtBQUssNkNBQTZDLGVBQWU7QUFBQSxjQUM5RSxPQUFPO0FBQUEsY0FDUCxVQUFVO0FBQUEsY0FDVixVQUFVLENBQUMsYUFBYTtBQUFBLGNBQ3hCLFVBQVUsQ0FBQyxhQUFhO0FBQUEsY0FDeEIsV0FBVztBQUFBLGNBQ1gsUUFBTztBQUFBLGNBQ1Asa0NBQWdDO0FBQUE7QUFBQSxVQUNsQztBQUFBLFdBQ0Y7QUFBQSxRQUNBLDhDQUFDLFNBQUksV0FBVSx3QkFDYjtBQUFBLHVEQUFDLFdBQU0sV0FBVSxpQ0FBaUMsZUFBSyxvQ0FBb0MsZUFBZSxHQUFFO0FBQUEsVUFDNUc7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFdBQVcsS0FBSywrQ0FBK0MsZ0NBQWdDO0FBQUEsY0FDL0YsU0FBUztBQUFBLGNBQ1QsV0FBVTtBQUFBO0FBQUEsVUFDWjtBQUFBLFVBQ0EsNkNBQUMsU0FDQztBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsV0FBVyxnQkFBZ0IsZ0NBQWdDLHFDQUFxQyxFQUFFLElBQUksOEJBQThCLHVCQUF1QixFQUFFO0FBQUEsY0FDN0osTUFBSztBQUFBLGNBQ0wsV0FBVTtBQUFBLGNBQ1YsT0FBTztBQUFBLGNBQ1AsVUFBVSxDQUFDLFVBQVUsMEJBQTBCLE1BQU0sT0FBTyxTQUFTLEVBQUU7QUFBQSxjQUN2RSxRQUFRLENBQUMsVUFDUDtBQUFBLGdCQUNFLHlCQUF5QixNQUFNLE9BQU8sT0FBTztBQUFBLGtCQUMzQyx1QkFBdUI7QUFBQSxrQkFDdkIsdUJBQXVCO0FBQUEsa0JBQ3ZCLGFBQWE7QUFBQSxrQkFDYixVQUFVO0FBQUEsZ0JBQ1osQ0FBQztBQUFBLGNBQ0g7QUFBQSxjQUVGLGNBQVksS0FBSyxvQ0FBb0MsZUFBZTtBQUFBLGNBQ3BFLGFBQWEsS0FBSyxvQ0FBb0MsZUFBZTtBQUFBLGNBQ3JFLFVBQVU7QUFBQSxjQUNWLFVBQVU7QUFBQTtBQUFBLFVBQ1osR0FDRjtBQUFBLFdBQ0Y7QUFBQSxTQUNGLElBRUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLE9BQU87QUFBQSxVQUNQLGFBQWEsS0FBSyw2Q0FBNkMsZUFBZTtBQUFBLFVBQzlFLE9BQU87QUFBQSxVQUNQLFVBQVU7QUFBQSxVQUNWLFVBQVUsQ0FBQyxhQUFhO0FBQUEsVUFDeEIsVUFBVSxDQUFDLGFBQWE7QUFBQSxVQUN4QixRQUFPO0FBQUEsVUFDUCxrQ0FBZ0M7QUFBQTtBQUFBLE1BQ2xDLEdBRUo7QUFBQSxNQUVDLG9CQUNDLDhDQUFDLFNBQUksV0FBVSwwQkFDYjtBQUFBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxPQUFPLEtBQUsscUNBQXFDLGdCQUFnQjtBQUFBLFlBQ2pFLFNBQVM7QUFBQSxZQUNULE9BQU87QUFBQSxZQUNQLFVBQVUsTUFBTTtBQUFBLFlBQ2hCLGFBQWEsS0FBSyw2Q0FBNkMsZUFBZTtBQUFBLFlBQzlFLFVBQVE7QUFBQSxZQUNSLFVBQVE7QUFBQSxZQUNSLGdCQUFnQjtBQUFBLFlBQ2hCLGtCQUFrQjtBQUFBLFlBQ2xCLFdBQVM7QUFBQSxZQUNULFdBQVc7QUFBQSxZQUNYLGtCQUFpQjtBQUFBLFlBQ2pCLHdCQUF1QjtBQUFBLFlBQ3ZCLHVCQUFzQjtBQUFBLFlBQ3RCLHFCQUFvQjtBQUFBLFlBQ3BCLCtCQUE4QjtBQUFBLFlBQzlCLFFBQU87QUFBQSxZQUNQLGlCQUFnQjtBQUFBLFlBQ2hCLGdCQUFlO0FBQUE7QUFBQSxRQUNqQjtBQUFBLFFBQ0EsOENBQUMsU0FBSSxXQUFVLGVBQ2I7QUFBQSx1REFBQyxXQUFNLFdBQVUsNEJBQTRCLGVBQUssOEJBQThCLFFBQVEsR0FBRTtBQUFBLFVBQzFGO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxXQUFVO0FBQUEsY0FDVixPQUFPLHlCQUF5Qiw2QkFBNkIsZ0JBQWdCO0FBQUEsY0FDN0UsY0FBWSxLQUFLLDhCQUE4QixRQUFRO0FBQUEsY0FDdkQsVUFBUTtBQUFBLGNBQ1IsVUFBUTtBQUFBO0FBQUEsVUFDVjtBQUFBLFdBQ0Y7QUFBQSxTQUNGLElBQ0U7QUFBQSxNQUVILHFCQUFxQixnQ0FBZ0MsNkNBQUMsT0FBRSxXQUFVLHVCQUF1Qix5Q0FBOEIsSUFBTztBQUFBLE9BQ2pJO0FBQUEsRUFFSjtBQUVBLFNBQ0UsOEVBQ0U7QUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsT0FBTyxLQUFLLGdDQUFnQyxVQUFVO0FBQUEsUUFDdEQsU0FBUztBQUFBLFFBQ1QsT0FBTyxzQkFBc0I7QUFBQSxRQUM3QixVQUFVLE1BQU07QUFBQSxRQUNoQixhQUFhLEtBQUssNkNBQTZDLGVBQWU7QUFBQSxRQUM5RSxVQUFRO0FBQUEsUUFDUixVQUFRO0FBQUEsUUFDUixnQkFBZ0I7QUFBQSxRQUNoQixrQkFBa0I7QUFBQSxRQUNsQixXQUFTO0FBQUEsUUFDVCxXQUFXO0FBQUEsUUFDWCxrQkFBaUI7QUFBQSxRQUNqQix3QkFBdUI7QUFBQSxRQUN2Qix1QkFBc0I7QUFBQSxRQUN0QixxQkFBb0I7QUFBQSxRQUNwQiwrQkFBOEI7QUFBQSxRQUM5QixRQUFPO0FBQUEsUUFDUCxpQkFBZ0I7QUFBQSxRQUNoQixnQkFBZTtBQUFBO0FBQUEsSUFDakI7QUFBQSxJQUNDLENBQUMsYUFBYSxtQkFDYiw2Q0FBQyxnQ0FBcUIsT0FBTyxLQUFLLG9DQUFvQyxlQUFlLEdBQUcsT0FBTyxtQkFBbUIsSUFDaEg7QUFBQSxLQUNOO0FBRUo7QUFFQSxJQUFPLDRDQUFROzs7QUU5TWYsSUFBTSwwQkFBdUY7QUFBQSxFQUMzRixHQUFHO0FBQUEsSUFDRCxVQUFVO0FBQUEsSUFDVixVQUFVO0FBQUEsRUFDWjtBQUFBLEVBQ0EsR0FBRztBQUFBLElBQ0QsVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBLEVBQ1o7QUFDRjtBQUlPLElBQU0sbUNBQW1DLENBQUMsVUFBdUQ7QUFDdEcsUUFBTSxTQUFTLE9BQU8sS0FBSztBQUMzQixNQUFJLFdBQVcsS0FBSyxXQUFXLEdBQUc7QUFDaEMsV0FBTztBQUFBLEVBQ1Q7QUFDQSxTQUFPO0FBQ1Q7QUFlTyxJQUFNLGtDQUFrQyxDQUFDLFVBQTJCO0FBQ3pFLFFBQU0sYUFBYSxpQ0FBaUMsS0FBSztBQUN6RCxNQUFJLGVBQWUsS0FBTSxRQUFPO0FBQ2hDLFFBQU0sT0FBTyx3QkFBd0IsVUFBVTtBQUMvQyxTQUFPLEtBQUssS0FBSyxVQUFVLEtBQUssUUFBUTtBQUMxQzs7O0FDZ0dVLElBQUFDLHNCQUFBO0FBaEdWLElBQU0sb0NBQW9DO0FBRzFDLElBQU0seUJBQXlCLENBQUM7QUFBQSxFQUM5QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBbUM7QUFDakMsUUFBTSxFQUFFLGNBQWMsV0FBVyxxQkFBcUIsa0JBQWtCLElBQUk7QUFDNUUsUUFBTSxFQUFFLHlCQUF5Qiw2QkFBNkIsaUJBQWlCLElBQUk7QUFDbkYsUUFBTSxvQkFDSixhQUFhLHVCQUF1Qiw0QkFBNEIsTUFBTSw0QkFBNEI7QUFDcEcsUUFBTSx1QkFBdUIsb0JBQ3pCLEtBQUssdUNBQXVDLGtCQUFrQixJQUM5RCxLQUFLLGdDQUFnQyxVQUFVO0FBQ25ELFFBQU0sY0FDSixPQUFPLHVCQUF1QixRQUFRLE9BQU8sdUJBQXVCLFNBQ2hFLE1BQ0Esc0JBQXNCLE9BQU8sa0JBQWtCO0FBQ3JELFFBQU0scUJBQXFCLFNBQVMsT0FBTyxZQUFZLEVBQUUsWUFBWTtBQUNyRSxRQUFNLG1CQUFtQixTQUFTLHdCQUF3QixFQUFFLFlBQVk7QUFFeEUsUUFBTSxxQkFBcUIsU0FBUyxPQUFPLGlCQUFpQjtBQUM1RCxRQUFNLHlCQUF5QixDQUFDLGdCQUFnQixzQkFBc0I7QUFDdEUsUUFBTSwwQkFBMEIseUJBQXlCLGlCQUFpQjtBQUMxRSxRQUFNLHdCQUF3Qix5QkFBeUIsNEJBQTRCO0FBQ25GLFFBQU0sd0JBQ0osMkJBQTJCLE9BQ3ZCLDBCQUNBLHlCQUF5QixPQUN2Qix3QkFBd0IsOEJBQ3hCO0FBQ1IsUUFBTSx3QkFBd0I7QUFBQSxJQUM1Qix5QkFBeUIsT0FBTyx3QkFBd0IsOEJBQThCO0FBQUEsSUFDdEY7QUFBQSxNQUNFLHVCQUF1QjtBQUFBLE1BQ3ZCLHVCQUF1QjtBQUFBLE1BQ3ZCLGFBQWE7QUFBQSxNQUNiLFVBQVU7QUFBQSxJQUNaO0FBQUEsRUFDRjtBQUNBLFFBQU0sd0JBQXdCLE9BQU8sT0FBTyxnQkFBZ0IsTUFBTSxJQUFJLElBQUk7QUFDMUUsUUFBTSxzQkFDSiwwQkFBMEIsSUFDdEIsaURBQ0E7QUFDTixRQUFNLDJCQUEyQiwwQkFBMEIsSUFBSSxnQkFBZ0I7QUFDL0UsUUFBTSx5QkFDSCxnQ0FBZ0MscUJBQXFCLEtBQUssS0FBSyxxQkFBcUIsd0JBQXdCLEdBQzFHLFFBQVEsbUNBQW1DLEVBQUUsRUFDN0MsS0FBSyxFQUNMLFlBQVksTUFBTSwwQkFBMEIsSUFBSSxXQUFXO0FBQ2hFLFFBQU0sOEJBQ0osQ0FBQyxDQUFDLFNBQVMsNEJBQTRCLEtBQUssQ0FBQyxDQUFDLFNBQVMsd0JBQXdCLEtBQUssQ0FBQyxDQUFDLFNBQVMsMEJBQTBCO0FBQzNILFFBQU0sK0JBQStCLFNBQVMsd0JBQXdCLEtBQUssS0FBSyx1QkFBdUIsS0FBSztBQUM1RyxRQUFNLGlDQUFpQyxTQUFTLDBCQUEwQixFQUN2RSxRQUFRLHFCQUFxQixHQUFHLEVBQ2hDLFFBQVEsV0FBVyxHQUFHLEVBQ3RCLEtBQUssS0FBSyxLQUFLLHVCQUF1QixLQUFLO0FBQzlDLFFBQU0sa0NBQWtDO0FBQUEsSUFDdEM7QUFBQSxJQUNBO0FBQUEsSUFDQSxTQUFTLDRCQUE0QixLQUFLO0FBQUEsSUFDMUM7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNBLFFBQU0sZ0NBQWdDO0FBQUEsSUFDcEM7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0EsUUFBTSwwQkFBMEIsOEJBQThCLGtDQUFrQztBQUVoRyxTQUNFLDZDQUFDLGFBQVEsV0FBVSxtR0FDakIsd0RBQUMsU0FBSSxXQUFVLHlDQUNaO0FBQUEsS0FBQyxlQUNBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFPLEtBQUssK0JBQStCLG9CQUFvQjtBQUFBLFFBQy9ELE9BQU8sU0FBUyxPQUFPLFlBQVksS0FBSztBQUFBO0FBQUEsSUFDMUMsSUFDRTtBQUFBLElBQ0gsQ0FBQyxlQUFlLDZDQUFDLGdDQUFxQixPQUFPLEtBQUssOEJBQThCLFFBQVEsR0FBRyxPQUFPLGFBQWEsSUFBSztBQUFBLElBQ3BILHlCQUNDO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxPQUFPLEtBQUsscUNBQXFDLGdCQUFnQjtBQUFBLFFBQ2pFLE9BQU8sc0JBQXNCO0FBQUEsUUFDN0IsV0FBUztBQUFBO0FBQUEsSUFDWCxJQUNFO0FBQUEsSUFDSCxhQUFhLHNCQUNaLDhDQUFDLFNBQUksV0FBVSw2QkFDYjtBQUFBLG1EQUFDLFdBQU0sV0FBVSw0QkFBNEIsZUFBSyxtQ0FBbUMsYUFBYSxHQUFFO0FBQUEsTUFDcEc7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLFdBQVU7QUFBQSxVQUNWLE9BQU87QUFBQSxVQUNQLFVBQVUsQ0FBQyxVQUFVLHlCQUF5QixNQUFNLE9BQU8sU0FBUyxFQUFFO0FBQUEsVUFDdEUsY0FBWSxLQUFLLG1DQUFtQyxhQUFhO0FBQUE7QUFBQSxNQUNuRTtBQUFBLE9BQ0YsSUFFQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsT0FBTyxLQUFLLG1DQUFtQyxhQUFhO0FBQUEsUUFDNUQsT0FBTyxTQUFTLE9BQU8sV0FBVyxLQUFLO0FBQUEsUUFDdkMsV0FBUztBQUFBO0FBQUEsSUFDWDtBQUFBLElBRUQsYUFBYSxzQkFDWjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsT0FBTyxLQUFLLCtCQUErQixTQUFTO0FBQUEsUUFDcEQsYUFBYSxLQUFLLDRDQUE0QyxZQUFZO0FBQUEsUUFDMUUsT0FBTztBQUFBLFFBQ1AsVUFBVTtBQUFBLFFBQ1YsVUFBVSxDQUFDLGFBQWEsQ0FBQztBQUFBLFFBQ3pCLFVBQVUsQ0FBQyxhQUFhLENBQUM7QUFBQTtBQUFBLElBQzNCLElBQ0UsZUFDRiw2Q0FBQyxnQ0FBcUIsT0FBTyxLQUFLLCtCQUErQixTQUFTLEdBQUcsT0FBTyxjQUFjLElBQ2hHO0FBQUEsSUFDSjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsYUFBYSxFQUFFLFdBQVcsb0JBQW9CO0FBQUEsUUFDOUMsZUFBZSxFQUFFLG1CQUFtQix5QkFBeUIsNkJBQTZCLGlCQUFpQjtBQUFBLFFBQzNHO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBO0FBQUEsSUFDRjtBQUFBLElBQ0MsQ0FBQyxlQUFlLDZDQUFDLGdDQUFxQixPQUFPLEtBQUssbUNBQW1DLGNBQWMsR0FBRyxPQUFPLGlCQUFpQixJQUFLO0FBQUEsS0FDdEksR0FDRjtBQUVKO0FBRUEsSUFBTyxpQ0FBUTs7O0FDcktYLElBQUFDLHNCQUFBO0FBYkosSUFBTSx1QkFBdUIsQ0FBQztBQUFBLEVBQzVCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBaUM7QUFDL0IsU0FDRSw4Q0FBQyxhQUFRLFdBQVUsYUFDakI7QUFBQSxpREFBQyxpQ0FBc0IsT0FBTyxZQUFZLFdBQVUsbUNBQWtDO0FBQUEsSUFFckYsYUFBYSxXQUFXLElBQ3ZCLDZDQUFDLFNBQUksV0FBVSwrQkFBOEIsbUJBQWlCLFdBQVcsSUFFekUsNkNBQUMsU0FBSSxLQUFLLGNBQWMsV0FBVSxnQkFDL0IsdUJBQWEsSUFBSSxDQUFDLE1BQU0sVUFBVTtBQUNqQyxZQUFNLFNBQVMsU0FBUyxLQUFLLFNBQVM7QUFDdEMsWUFBTSxjQUFjLFNBQVMsS0FBSyxXQUFXO0FBQzdDLFlBQU0sYUFBYSx5QkFBeUIsS0FBSyxVQUFVLE1BQU0sWUFBWTtBQUM3RSxZQUFNLHFCQUFxQixTQUFTLEtBQUssTUFBTTtBQUMvQyxZQUFNLFlBQVksdUJBQXVCLFNBQVMsS0FBSyxTQUFTLEdBQUcsVUFBVSxpQkFBaUIsUUFBUSxPQUFPO0FBQzdHLFlBQU0sbUJBQW1CLHFCQUN2QjtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsT0FBTTtBQUFBLFVBQ04sTUFBSztBQUFBLFVBQ0wsU0FBUTtBQUFBLFVBQ1IsYUFBYTtBQUFBLFVBQ2IsUUFBTztBQUFBLFVBQ1AsV0FBVTtBQUFBLFVBQ1YsZUFBWTtBQUFBLFVBRVo7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLGVBQWM7QUFBQSxjQUNkLGdCQUFlO0FBQUEsY0FDZixHQUFFO0FBQUE7QUFBQSxVQUNKO0FBQUE7QUFBQSxNQUNGLElBQ0U7QUFFSixhQUNFLDZDQUFDLFNBQStCLFdBQVUsaUJBQ3hDO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQztBQUFBLFVBQ0EsT0FBTyxlQUFlLFVBQVU7QUFBQSxVQUNoQztBQUFBLFVBQ0EsUUFBUSxNQUFNLFdBQVcsTUFBTTtBQUFBLFVBQy9CLGdCQUFlO0FBQUEsVUFDZixZQUFZO0FBQUEsVUFDWixxQkFBb0I7QUFBQSxVQUNwQixhQUFhLHNCQUFzQjtBQUFBO0FBQUEsTUFDckMsS0FWUSxHQUFHLE1BQU0sSUFBSSxLQUFLLEVBVzVCO0FBQUEsSUFFSixDQUFDLEdBQ0g7QUFBQSxJQUdGO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixjQUFjO0FBQUEsUUFDZCxRQUFRO0FBQUE7QUFBQSxJQUNWO0FBQUEsS0FDRjtBQUVKO0FBRUEsSUFBTywrQkFBUTs7O0FDaEZQLElBQUFDLHNCQUFBO0FBUlIsSUFBTSw4QkFBOEIsQ0FBQyxFQUFFLFNBQVMsTUFBTSxXQUFXLE9BQU8sY0FBYyxNQUF3QztBQUM1SCxNQUFJLFFBQVEsU0FBUyxHQUFHO0FBQ3RCLFdBQU87QUFBQSxFQUNUO0FBRUEsU0FDRSw2Q0FBQyw2QkFBa0IsV0FBVyxLQUFLLHVDQUF1Qyw4QkFBOEIsR0FDckcsa0JBQVEsSUFBSSxDQUFDLFdBQ1o7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUVDLE9BQU8sS0FBSyxPQUFPLFVBQVUsT0FBTyxRQUFRO0FBQUEsTUFDNUMsVUFBVSxRQUFRO0FBQUEsTUFDbEIsU0FBUyxNQUFNLGNBQWMsTUFBTTtBQUFBO0FBQUEsSUFIOUIsT0FBTztBQUFBLEVBSWQsQ0FDRCxHQUNIO0FBRUo7QUFFQSxJQUFPLHNDQUFROzs7QUNzRFgsSUFBQUMsc0JBQUE7QUFqQ0osSUFBTSw2QkFBNkIsQ0FBQztBQUFBLEVBQ2xDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUF1QztBQUNyQyxTQUNFLDhFQUNFO0FBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE1BQU0sTUFBTTtBQUFBLFFBQ1osT0FBTyxNQUFNO0FBQUEsUUFDYixTQUFTLE1BQU07QUFBQSxRQUNmLGFBQWE7QUFBQSxRQUNiLFlBQVk7QUFBQSxRQUNaLGFBQWE7QUFBQSxRQUNiLFlBQVksTUFBTTtBQUFBLFFBQ2xCLGFBQWEsTUFBTTtBQUFBLFFBQ25CLE1BQU0sUUFBUTtBQUFBLFFBQ2QsT0FBTztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBRUM7QUFBQTtBQUFBLElBQ0g7QUFBQSxJQUVBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxLQUFLO0FBQUEsUUFDTCxNQUFLO0FBQUEsUUFDTCxRQUFRO0FBQUEsUUFDUixTQUFRO0FBQUEsUUFDUixXQUFVO0FBQUEsUUFDVixVQUFVLENBQUMsVUFBVTtBQUNuQixnQkFBTSxPQUFPLE1BQU0sY0FBYyxRQUFRLENBQUMsS0FBSztBQUMvQyxnQkFBTSxjQUFjLFFBQVE7QUFDNUIsK0JBQXFCLElBQUk7QUFBQSxRQUMzQjtBQUFBO0FBQUEsSUFDRjtBQUFBLElBRUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLEtBQUs7QUFBQSxRQUNMLE1BQUs7QUFBQSxRQUNMLFFBQVE7QUFBQSxRQUNSLFdBQVU7QUFBQSxRQUNWLFVBQVUsQ0FBQyxVQUFVO0FBQ25CLGdCQUFNLE9BQU8sTUFBTSxjQUFjLFFBQVEsQ0FBQyxLQUFLO0FBQy9DLGdCQUFNLGNBQWMsUUFBUTtBQUM1QixnQ0FBc0IsSUFBSTtBQUFBLFFBQzVCO0FBQUE7QUFBQSxJQUNGO0FBQUEsSUFFQyxtQkFDQyw2Q0FBQyxTQUFJLFdBQVUscUZBQ2Isd0RBQUMsU0FBSSxXQUFVLDZGQUNiO0FBQUEsbURBQUMsUUFBRyxXQUFVLDRDQUNYLGVBQUssd0NBQXdDLGNBQWMsR0FDOUQ7QUFBQSxNQUNBLDZDQUFDLE9BQUUsV0FBVSwrQkFDVjtBQUFBLFFBQ0M7QUFBQSxRQUNBO0FBQUEsTUFDRixHQUNGO0FBQUEsTUFFQSw4Q0FBQyxTQUFJLFdBQVUsK0JBQ2I7QUFBQSxxREFBQyxZQUFPLE1BQUssVUFBUyxXQUFVLDJDQUEwQyxTQUFTLG9CQUNoRixlQUFLLHlDQUF5QyxnQkFBYSxHQUM5RDtBQUFBLFFBQ0EsNkNBQUMsWUFBTyxNQUFLLFVBQVMsV0FBVSwyQ0FBMEMsU0FBUyxxQkFDaEYsZUFBSywwQ0FBMEMsZUFBZSxHQUNqRTtBQUFBLFFBQ0EsNkNBQUMsWUFBTyxNQUFLLFVBQVMsV0FBVSwyQ0FBMEMsU0FBUyxxQkFDaEYsZUFBSyxpQkFBaUIsUUFBUSxHQUNqQztBQUFBLFNBQ0Y7QUFBQSxPQUNGLEdBQ0YsSUFDRTtBQUFBLElBRUo7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE1BQU07QUFBQSxRQUNOLE9BQU8sS0FBSywwQ0FBMEMsbUJBQW1CO0FBQUEsUUFDekUsU0FBUyw4QkFBOEIsS0FBSyxrQkFBa0IsU0FBUztBQUFBLFFBQ3ZFLFdBQVc7QUFBQSxRQUNYLFFBQVE7QUFBQTtBQUFBLElBQ1Y7QUFBQSxJQUVDLDBCQUNDO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxXQUNFLDBCQUNJLGdJQUNBO0FBQUEsUUFHTjtBQUFBLHVEQUFDLE9BQUcsbUNBQXdCO0FBQUEsVUFDM0IsdUJBQ0M7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFdBQ0UsMEJBQ0kseUhBQ0E7QUFBQSxjQUdMLHdCQUFjLG9CQUFvQjtBQUFBO0FBQUEsVUFDckMsSUFDRTtBQUFBLFVBQ0gscUJBQXFCLFNBQVMsSUFDN0I7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFdBQ0UsMEJBQ0ksMkZBQ0E7QUFBQSxjQUdMLCtCQUFxQixJQUFJLENBQUMsVUFDekIsNkNBQUMsT0FBcUMsYUFBRyxNQUFNLElBQUksS0FBSyxNQUFNLE9BQU8sTUFBN0QsR0FBRyxNQUFNLElBQUksSUFBSSxNQUFNLEVBQUUsRUFBdUMsQ0FDekU7QUFBQTtBQUFBLFVBQ0gsSUFDRTtBQUFBLFVBQ0osOENBQUMsU0FBSSxXQUFVLHdCQUNaO0FBQUEsb0NBQ0MsNkNBQUMsWUFBTyxNQUFLLFVBQVMsV0FBVSxzQ0FBcUMsU0FBUyxzQkFDM0UsZUFBSyx1Q0FBdUMsbUJBQW1CLEdBQ2xFLElBQ0U7QUFBQSxZQUNKLDZDQUFDLFlBQU8sTUFBSyxVQUFTLFdBQVUsc0NBQXFDLFNBQVMseUJBQzNFLGVBQUssZ0JBQWdCLE9BQU8sR0FDL0I7QUFBQSxhQUNGO0FBQUE7QUFBQTtBQUFBLElBQ0YsSUFDRTtBQUFBLEtBQ047QUFFSjtBQUVBLElBQU8scUNBQVE7OztBQ3ZOZixJQUFBQyxnQkFBOEQ7OztBQ1E5RCxJQUFNLGtEQUFrRDtBQUN4RCxJQUFNLDhDQUE4QyxJQUFJLEtBQUssS0FBSztBQU1sRSxJQUFNLGVBQWUsTUFBYztBQUNqQyxTQUFPLEdBQUcsK0NBQStDLElBQUkscUJBQXFCLENBQUM7QUFDckY7QUFHTyxJQUFNLDRDQUE0QyxDQUN2RCxVQUM0QztBQUM1QyxNQUFJLENBQUMsU0FBUyxPQUFPLFVBQVUsU0FBVSxRQUFPO0FBRWhELFFBQU0sVUFBVTtBQUNoQixRQUFNLFVBQVUsU0FBUyxRQUFRLE9BQU87QUFDeEMsTUFBSSxDQUFDLFFBQVMsUUFBTztBQUVyQixTQUFPO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFDRjtBQUdPLElBQU0sdUNBQXVDLENBQ2xELFlBQzRDO0FBQzVDLFFBQU0sU0FBUztBQUFBLElBQ2IseUJBQTJELGFBQWEsQ0FBQztBQUFBLEVBQzNFO0FBQ0EsTUFBSSxDQUFDLE9BQVEsUUFBTztBQUVwQixRQUFNLGNBQWMsU0FBUyxPQUFPO0FBQ3BDLE1BQUksQ0FBQyxZQUFhLFFBQU87QUFDekIsU0FBTyxPQUFPLFFBQVEsWUFBWSxNQUFNLFlBQVksWUFBWSxJQUFJLFNBQVM7QUFDL0U7QUFHTyxJQUFNLHdDQUF3QyxNQUFZO0FBQy9ELCtCQUE2QixhQUFhLENBQUM7QUFDN0M7QUFHTyxJQUFNLHVDQUF1QyxDQUNsRCxVQUM0QztBQUM1QyxRQUFNLGFBQWEsMENBQTBDLEtBQUs7QUFDbEUsTUFBSSxDQUFDLFlBQVk7QUFDZiwwQ0FBc0M7QUFDdEMsV0FBTztBQUFBLEVBQ1Q7QUFFQSwyQkFBeUIsYUFBYSxHQUFHLFlBQVksMkNBQTJDO0FBQ2hHLFNBQU87QUFDVDtBQUdPLElBQU0sMENBQTBDLENBQ3JELFlBQzRDO0FBQzVDLFFBQU0sU0FBUyxxQ0FBcUMsT0FBTztBQUMzRCxNQUFJLENBQUMsT0FBUSxRQUFPO0FBRXBCLHdDQUFzQztBQUN0QyxTQUFPO0FBQ1Q7OztBQzVFQSxJQUFBQyxnQkFBbUM7QUFXbkMsSUFBTSw4QkFBOEI7QUFrQ3BDLElBQU0sd0JBQXdCLENBQUMsUUFBK0Isa0JBQWtCLEdBQUc7QUFFbkYsSUFBTSxxQkFBcUIsQ0FBQyxNQUFxQixVQUFrQztBQUNqRixNQUFJLFFBQVEsUUFBUSxTQUFTLEtBQU0sUUFBTztBQUMxQyxTQUFPLEtBQUssSUFBSSxPQUFPLEtBQUssSUFBSTtBQUNsQztBQUdPLElBQU0saUNBQWlDLENBQUM7QUFBQSxFQUM3QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUEwQztBQUN4QyxRQUFNLHlCQUFxQjtBQUFBLElBQ3pCLENBQ0UsWUFDQSwwQkFDcUU7QUFDckUsWUFBTSxtQ0FBbUMsMEJBQTBCO0FBQ25FLFlBQU0scUJBQXFCO0FBQUEsUUFDekIsMEJBQTJCLHNCQUFzQixxQkFBcUIsS0FBTyxxQkFBcUI7QUFBQSxNQUNwRyxFQUNHLEtBQUssRUFDTCxZQUFZO0FBQ2YsWUFBTSx3QkFBd0IsT0FBTyxvQkFBb0IsRUFBRSxFQUFFLEtBQUs7QUFDbEUsWUFBTSxzQkFBc0IsT0FBTyxrQkFBa0IsRUFBRSxFQUFFLEtBQUs7QUFDOUQsWUFBTSw4QkFBOEI7QUFBQSxRQUNsQyx5QkFBeUIsMEJBQTBCO0FBQUEsTUFDckQsRUFBRSxLQUFLO0FBQ1AsWUFBTSw0QkFBNEI7QUFBQSxRQUNoQyw4QkFBK0Isc0JBQXNCLHFCQUFxQixLQUFPLHFCQUFxQjtBQUFBLE1BQ3hHO0FBQ0EsWUFBTSx5QkFBeUIsT0FBTyw0QkFBNEIsS0FBSyxFQUFFLEtBQUssRUFBRSxZQUFZLEtBQUs7QUFDakcsWUFBTSx1QkFDSix1QkFBdUIsdUJBQXVCLE1BQU0sdUJBQXVCO0FBQzdFLFlBQU0sdUJBQXVCLHVCQUF1Qix1QkFBdUIsTUFBTSxDQUFDO0FBQ2xGLFlBQU0scUJBQXFCLHNCQUFzQix5QkFBeUI7QUFDMUUsWUFBTSx1QkFBdUIsc0JBQXNCLHlCQUF5QjtBQUM1RSxZQUFNLHVCQUF1QixzQkFBc0Isa0JBQWtCO0FBQ3JFLFlBQU0sZ0NBQWdDLE9BQU8sdUJBQXVCO0FBQ3BFLFlBQU0sNkJBQTZCLE9BQU8sVUFBVSw2QkFBNkIsS0FBSyxpQ0FBaUM7QUFDdkgsWUFBTSxlQUFlLHNCQUFzQixRQUFRLHFCQUFxQjtBQUN4RSxZQUFNLDRCQUNKLHVCQUNBLENBQUMsZ0JBQ0QsaUJBQ0Msd0JBQXdCLFFBQVEsQ0FBQyxtQkFBbUIsb0JBQW9CLG9CQUFvQjtBQUUvRixZQUFNLHdCQUF3QixNQUFNO0FBQ2xDLFlBQUksQ0FBQyxvQkFBcUIsUUFBTztBQUNqQyxZQUFJLENBQUMsd0JBQXdCLENBQUMsYUFBYyxRQUFPO0FBQ25ELFlBQUksNEJBQTZCLFFBQU87QUFDeEMsWUFBSSxDQUFDLGdCQUFnQixDQUFDLDBCQUEyQixRQUFPO0FBQ3hELFlBQUksd0JBQXdCLEtBQU0sUUFBTztBQUN6QyxlQUFPLENBQUMsbUJBQW1CLG9CQUFvQixvQkFBb0I7QUFBQSxNQUNyRSxHQUFHO0FBQ0gsWUFBTSwyQkFBMkIsc0JBQzVCLHVCQUF1QixJQUFLLDZCQUE2QixnQ0FBZ0MsSUFDekYsNkJBQTZCLGdDQUFnQztBQUNsRSxZQUFNLDZCQUNKLGVBQWUsNkJBQTZCLE9BQU8sT0FBTyx5QkFBeUIsSUFBSTtBQUV6RixZQUFNLHVCQUF1QixzQkFDeEIsdUJBQXVCLDhCQUErQixlQUFlLE9BQU8sa0JBQWtCLElBQUksSUFDbEcsd0JBQXdCLHNCQUFzQjtBQUVuRCxVQUFJLGNBQWM7QUFDaEIsWUFBSSxDQUFDLHVCQUF1QjtBQUMxQixpQkFBTztBQUFBLFlBQ0wsT0FBTyxLQUFLLGdEQUFnRCwwQkFBMEI7QUFBQSxVQUN4RjtBQUFBLFFBQ0Y7QUFFQSxZQUFJLENBQUMsb0JBQW9CO0FBQ3ZCLGlCQUFPO0FBQUEsWUFDTCxPQUFPLEtBQUssNkNBQTZDLHVCQUF1QjtBQUFBLFVBQ2xGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFFQSxVQUFJLHdCQUF3QixDQUFDLGNBQWM7QUFDekMsZUFBTztBQUFBLFVBQ0wsT0FBTztBQUFBLFlBQ0w7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBRUEsYUFBTztBQUFBLFFBQ0wsU0FBUztBQUFBLFVBQ1AsYUFBYTtBQUFBLFVBQ2IsY0FBYztBQUFBLFVBQ2QsVUFBVTtBQUFBLFVBQ1YsUUFBUSx1QkFBdUI7QUFBQSxVQUMvQixvQkFBb0I7QUFBQSxVQUNwQixrQkFBa0I7QUFBQTtBQUFBLFVBRWxCLG1CQUFtQixtQ0FDZiw4QkFDQywrQkFBK0I7QUFBQSxRQUN0QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsUUFBTSxtQkFBZSwyQkFBWSxZQUFZO0FBQzNDLFFBQUksUUFBUSxDQUFDLFVBQVcsUUFBTztBQUMvQixRQUFJLENBQUMsZ0JBQWdCLGFBQWMsUUFBTztBQUUxQyxVQUFNLGFBQWEsZUFBZSxtQkFBbUI7QUFDckQsUUFBSSxDQUFDLFlBQVk7QUFDZiwwQkFBb0I7QUFDcEIsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLGdCQUFnQixtQkFBbUI7QUFDekMsUUFBSSxXQUFXLGVBQWU7QUFDNUIsb0JBQWMsY0FBYyxLQUFLO0FBQ2pDLGdCQUFVLGNBQWMsS0FBSztBQUM3QixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sU0FBUyxNQUFNLHVCQUF1QjtBQUFBLE1BQzFDLGFBQWEsZUFDVCxLQUFLLGtCQUFrQixTQUFTLElBQ2hDLEtBQUssaUNBQWlDLDJCQUEyQjtBQUFBLE1BQ3JFLHNCQUFzQixLQUFLLG9DQUFvQyxlQUFlO0FBQUEsTUFDOUU7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsUUFBUSxZQUFZO0FBQ2xCLFlBQUksY0FBYztBQUNoQixnQkFBTSxnQkFBZ0IsY0FBYztBQUNwQyxnQkFBTSxVQUFxQztBQUFBLFlBQ3pDLE1BQU07QUFBQSxZQUNOLHNCQUFzQjtBQUFBLFlBQ3RCLGFBQWEsY0FBYztBQUFBLFlBQzNCLGNBQWMsY0FBYztBQUFBLFlBQzVCLFVBQVUsY0FBYztBQUFBLFlBQ3hCLFFBQVEsY0FBYztBQUFBLFlBQ3RCLG9CQUFvQjtBQUFBLFlBQ3BCLGtCQUFrQixjQUFjO0FBQUEsWUFDaEMsT0FBTyxDQUFDO0FBQUEsVUFDVjtBQUVBLGdCQUFNQyxZQUFXLE1BQU0sbUJBQW1CLE9BQU87QUFFakQsY0FBSSxDQUFDQSxVQUFTLFNBQVM7QUFDckIsa0JBQU0sSUFBSSxNQUFNQSxVQUFTLFdBQVcsS0FBSyxxQkFBcUIsaUJBQWlCLENBQUM7QUFBQSxVQUNsRjtBQUdBLGdCQUFNLGNBQWNBLFdBQVU7QUFDOUIsZ0JBQU0saUJBQWlCLE9BQU8sYUFBYSxnQkFBZ0IsYUFBYSxnQkFBZ0IsRUFBRSxFQUFFLEtBQUs7QUFDakcsY0FBSSxDQUFDLGdCQUFnQjtBQUNuQixrQkFBTSxJQUFJLE1BQU0sS0FBSyxxQkFBcUIsaUJBQWlCLENBQUM7QUFBQSxVQUM5RDtBQUVBLDBCQUFnQixjQUFjO0FBQzlCLG9CQUFVLEtBQUssZUFBZSxNQUFNLENBQUM7QUFDckMsaUJBQU87QUFBQSxRQUNUO0FBRUEsY0FBTSxXQUFXLE1BQU0seUJBQXlCLFNBQVMsY0FBYyxPQUFPO0FBRTlFLFlBQUksQ0FBQyxTQUFTLFNBQVM7QUFDckIsZ0JBQU0sSUFBSSxNQUFNLFNBQVMsV0FBVyxLQUFLLHFDQUFxQyxnQkFBZ0IsQ0FBQztBQUFBLFFBQ2pHO0FBRUEsa0JBQVUsS0FBSyxnQ0FBZ0MsdUJBQXVCLENBQUM7QUFDdkUscUJBQWEsS0FBSztBQUNsQixlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0YsQ0FBQztBQUVELFdBQU8sT0FBTztBQUFBLEVBQ2hCLEdBQUc7QUFBQSxJQUNEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSw2QkFBeUI7QUFBQSxJQUM3QixPQUFPLFlBQW9CLGFBQXFCLDBCQUEwQztBQUN4RixVQUFJLFFBQVEsZ0JBQWdCLENBQUMsUUFBUyxRQUFPO0FBQzdDLFVBQUksQ0FBQyxxQkFBcUI7QUFDeEIsNEJBQW9CO0FBQ3BCLGVBQU87QUFBQSxNQUNUO0FBRUEsWUFBTSxnQkFBZ0IsbUJBQW1CLFlBQVkscUJBQXFCO0FBQzFFLFVBQUksV0FBVyxlQUFlO0FBQzVCLHNCQUFjLGNBQWMsS0FBSztBQUNqQyxrQkFBVSxjQUFjLEtBQUs7QUFDN0IsZUFBTztBQUFBLE1BQ1Q7QUFFQSxZQUFNLFNBQVMsTUFBTSx1QkFBdUI7QUFBQSxRQUMxQztBQUFBLFFBQ0Esc0JBQXNCLEtBQUssb0NBQW9DLGVBQWU7QUFBQSxRQUM5RTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxRQUFRLFlBQVk7QUFDbEIsZ0JBQU0sV0FBVyxNQUFNLHlCQUF5QixTQUFTLGNBQWMsT0FBTztBQUU5RSxjQUFJLENBQUMsU0FBUyxTQUFTO0FBQ3JCLGtCQUFNLElBQUksTUFBTSxTQUFTLFdBQVcsS0FBSyxxQ0FBcUMsZ0JBQWdCLENBQUM7QUFBQSxVQUNqRztBQUVBLG9CQUFVLEtBQUssZ0NBQWdDLHVCQUF1QixDQUFDO0FBQ3ZFLHVCQUFhLEtBQUs7QUFDbEIsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRixDQUFDO0FBRUQsYUFBTyxPQUFPO0FBQUEsSUFDaEI7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLG1CQUFlLDJCQUFZLFlBQVk7QUFDM0MsUUFBSSxLQUFNLFFBQU87QUFDakIsUUFBSSxlQUFnQixRQUFPO0FBQzNCLFFBQUksQ0FBQyxrQkFBa0I7QUFDckIsMEJBQW9CO0FBQ3BCLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxTQUFTLE1BQU0sdUJBQXVCO0FBQUEsTUFDMUMsYUFBYSxLQUFLLGlDQUFpQywyQkFBMkI7QUFBQSxNQUM5RSxzQkFBc0IsS0FBSyxvQ0FBb0MsZUFBZTtBQUFBLE1BQzlFO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLFFBQVEsWUFBWTtBQUNsQixjQUFNLFdBQVcsTUFBTSxtQkFBbUIsT0FBTztBQUVqRCxZQUFJLENBQUMsU0FBUyxTQUFTO0FBQ3JCLGdCQUFNLElBQUksTUFBTSxTQUFTLFdBQVcsS0FBSyxxQ0FBcUMsZ0JBQWdCLENBQUM7QUFBQSxRQUNqRztBQUVBLGtCQUFVLEtBQUssZ0NBQWdDLHVCQUF1QixDQUFDO0FBQ3ZFLGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRixDQUFDO0FBRUQsV0FBTyxPQUFPO0FBQUEsRUFDaEIsR0FBRyxDQUFDLE1BQU0sa0JBQWtCLGdCQUFnQixTQUFTLGVBQWUsV0FBVyxPQUFPLENBQUM7QUFFdkYsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjs7O0FDMVVPLElBQU0scUNBQXFDLENBQUM7QUFBQSxFQUNqRDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsYUFBYTtBQUFBLEVBQ2I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsbUJBQW1CO0FBQUEsRUFDbkI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQThDO0FBQzVDLDhCQUE0QjtBQUFBLElBQzFCLGVBQWU7QUFBQSxJQUNmLEtBQUs7QUFBQSxNQUNILFlBQVk7QUFBQSxNQUNaLFlBQVk7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixXQUFXO0FBQUEsTUFDWCxhQUFhO0FBQUEsTUFDYixhQUFhO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxrQ0FBa0M7QUFBQSxJQUNsQztBQUFBLElBQ0EsV0FBVztBQUFBLElBQ1gsU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1g7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsWUFBWTtBQUFBLElBQ1o7QUFBQSxJQUNBLGtCQUFrQixLQUFLLDBDQUEwQyxjQUFjO0FBQUEsSUFDL0Usb0JBQW9CLEtBQUsseUNBQXlDLDhCQUE4QjtBQUFBLElBQ2hHLGlCQUFpQixLQUFLLGVBQWUsTUFBTTtBQUFBLElBQzNDLG9CQUFvQixLQUFLLDBDQUEwQyxzQkFBc0I7QUFBQSxJQUN6RixzQkFBc0IsS0FBSyx5Q0FBeUMsMkNBQTJDO0FBQUEsSUFDL0csbUJBQW1CLEtBQUssaUJBQWlCLFFBQVE7QUFBQSxJQUNqRDtBQUFBLElBQ0EsaUJBQWlCLG9CQUFvQixNQUFNLHFCQUFxQix1QkFBdUI7QUFBQSxJQUN2RjtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFDSDs7O0FDbkdBLElBQUFDLGdCQUEwRDtBQXlCMUQsSUFBTSw0QkFBNEI7QUFDbEMsSUFBTSxpQ0FBaUM7QUFDdkMsSUFBTSwrQkFBK0I7QUFDckMsSUFBTSwwQkFBMEI7QUFDaEMsSUFBTSxzQkFBc0I7QUFHNUIsSUFBTSwrQkFBK0IsQ0FBQyxVQUEwQjtBQUM5RCxTQUFPLHlCQUF5QixPQUFPO0FBQUEsSUFDckMsdUJBQXVCO0FBQUEsSUFDdkIsdUJBQXVCO0FBQUEsSUFDdkIsYUFBYTtBQUFBLElBQ2IsVUFBVTtBQUFBLEVBQ1osQ0FBQztBQUNIO0FBR0EsSUFBTSxvQ0FBb0MsNkJBQTZCLDhCQUE4QjtBQUVyRyxJQUFNLHlCQUF5QixNQUEwQjtBQUN2RCxTQUFPO0FBQUEsSUFDTCxjQUFjO0FBQUEsSUFDZCxhQUFhO0FBQUEsSUFDYixRQUFRO0FBQUEsSUFDUixjQUFjO0FBQUEsSUFDZCxhQUFhO0FBQUEsSUFDYixvQkFBb0I7QUFBQSxJQUNwQixrQkFBa0I7QUFBQSxJQUNsQixhQUFhO0FBQUEsSUFDYixVQUFVLE9BQU8sOEJBQThCO0FBQUEsRUFDakQ7QUFDRjtBQUVBLElBQU0seUJBQXlCLENBQUMsVUFBMkI7QUFDekQsTUFBSSxDQUFDLE1BQU8sUUFBTztBQUNuQixRQUFNLFNBQVMseUJBQXlCLEtBQUs7QUFDN0MsTUFBSSxXQUFXLEtBQU0sUUFBTztBQUM1QixTQUFPLEtBQUssSUFBSSxNQUFNLElBQUk7QUFDNUI7QUFnQk8sSUFBTSw2QkFBNkIsQ0FBQztBQUFBLEVBQ3pDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBc0M7QUFDcEMsUUFBTSxDQUFDLFFBQVEsU0FBUyxRQUFJLHdCQUFvQyxJQUFJO0FBQ3BFLFFBQU0sQ0FBQyxPQUFPLFFBQVEsUUFBSSx3QkFBNkIsQ0FBQyxDQUFDO0FBQ3pELFFBQU0sQ0FBQyxVQUFVLFdBQVcsUUFBSSx3QkFBUyxDQUFDO0FBQzFDLFFBQU0sQ0FBQyxXQUFXLFlBQVksUUFBSSx3QkFBUyxLQUFLO0FBQ2hELFFBQU0sQ0FBQyxjQUFjLGVBQWUsUUFBSSx3QkFBUyxFQUFFO0FBQ25ELFFBQU0sQ0FBQyxNQUFNLE9BQU8sUUFBSSx3QkFBUyxLQUFLO0FBQ3RDLFFBQU0sQ0FBQyxRQUFRLFNBQVMsUUFBSSx3QkFBUyxFQUFFO0FBQ3ZDLFFBQU0sQ0FBQyxXQUFXLFlBQVksUUFBSSx3QkFBUyxLQUFLO0FBQ2hELFFBQU0sQ0FBQyxZQUFZLGFBQWEsUUFBSSx3QkFBUyxFQUFFO0FBQy9DLFFBQU0sQ0FBQyxrQkFBa0IsbUJBQW1CLFFBQUksd0JBQVMsRUFBRTtBQUMzRCxRQUFNLENBQUMsZ0JBQWdCLGlCQUFpQixRQUFJLHdCQUFTLEVBQUU7QUFDdkQsUUFBTSxDQUFDLG1CQUFtQixvQkFBb0IsUUFBSSx3QkFBUyxFQUFFO0FBQzdELFFBQU0sQ0FBQyxtQkFBbUIsb0JBQW9CLFFBQUksd0JBQVMsRUFBRTtBQUM3RCxRQUFNLENBQUMsd0JBQXdCLHlCQUF5QixRQUFJLHdCQUFTLEVBQUU7QUFDdkUsUUFBTSxDQUFDLHFCQUFxQixzQkFBc0IsUUFBSSx3QkFBUyxFQUFFO0FBQ2pFLFFBQU0sQ0FBQyx1QkFBdUIsd0JBQXdCLFFBQUksd0JBQVMsS0FBSztBQUN4RSxRQUFNLENBQUMscUJBQXFCLHNCQUFzQixRQUFJLHdCQUFTLEVBQUU7QUFDakUsUUFBTSxDQUFDLDRCQUE0Qiw2QkFBNkIsUUFBSSx3QkFBUyxLQUFLO0FBQ2xGLFFBQU0sQ0FBQywyQkFBMkIsNEJBQTRCLFFBQUksd0JBQVMsRUFBRTtBQUM3RSxRQUFNLENBQUMsOEJBQThCLCtCQUErQixRQUFJLHdCQUFTLEVBQUU7QUFDbkYsUUFBTSxDQUFDLDBCQUEwQiwyQkFBMkIsUUFBSSx3QkFBUyxFQUFFO0FBQzNFLFFBQU0sQ0FBQyw0QkFBNEIsNkJBQTZCLFFBQUksd0JBQVMsRUFBRTtBQUUvRSxRQUFNLDZCQUF5QiwyQkFBWSxDQUFDLGVBQTBDO0FBQ3BGLHdCQUFvQixTQUFTLFlBQVksV0FBVyxDQUFDO0FBQ3JELHNCQUFrQixTQUFTLFlBQVksTUFBTSxDQUFDO0FBQzlDLHlCQUFxQixTQUFTLFlBQVksWUFBWSxDQUFDO0FBQ3ZEO0FBQUEsTUFDRSx5QkFBeUIsWUFBWSxVQUFVO0FBQUEsUUFDN0MsdUJBQXVCO0FBQUEsUUFDdkIsdUJBQXVCO0FBQUEsUUFDdkIsYUFBYTtBQUFBLFFBQ2IsVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBLElBQ0g7QUFDQSw4QkFBMEIsU0FBUyxZQUFZLGlCQUFpQixDQUFDO0FBQUEsRUFDbkUsR0FBRyxDQUFDLENBQUM7QUFFTCwrQkFBVSxNQUFNO0FBQ2QsVUFBTSxhQUFhLFlBQVk7QUFDN0IsVUFBSSxDQUFDLFdBQVc7QUFDZCxvQkFBWTtBQUNaO0FBQUEsTUFDRjtBQUVBLFVBQUksY0FBYztBQUNoQixZQUFJLENBQUMsa0JBQWtCO0FBQ3JCLHNCQUFZO0FBQ1o7QUFBQSxRQUNGO0FBRUEsY0FBTSxjQUFjLHVCQUF1QjtBQUMzQyxrQkFBVSxXQUFXO0FBQ3JCLGlCQUFTLENBQUMsQ0FBQztBQUNYLG9CQUFZLENBQUM7QUFDYixxQkFBYSxJQUFJO0FBQ2pCLCtCQUF1QixXQUFXO0FBQ2xDLGtCQUFVLEVBQUU7QUFDWix3QkFBZ0IsRUFBRTtBQUNsQjtBQUFBLE1BQ0Y7QUFFQSxVQUFJLENBQUMsU0FBUztBQUNaLHdCQUFnQixLQUFLLDBCQUEwQiw4QkFBOEIsQ0FBQztBQUM5RSxrQkFBVSxJQUFJO0FBQ2QsaUJBQVMsQ0FBQyxDQUFDO0FBQ1g7QUFBQSxNQUNGO0FBRUEsbUJBQWEsSUFBSTtBQUNqQixzQkFBZ0IsRUFBRTtBQUVsQixVQUFJO0FBQ0YsY0FBTSxXQUFXLE1BQU0sd0JBQXdCLFNBQVM7QUFBQSxVQUN0RCx5QkFBeUI7QUFBQSxRQUMzQixDQUFDO0FBRUQsWUFBSSxVQUFVLFlBQVksT0FBTztBQUMvQiwwQkFBZ0IsVUFBVSxXQUFXLEtBQUssMkJBQTJCLHNDQUFzQyxDQUFDO0FBQzVHLG9CQUFVLElBQUk7QUFDZCxtQkFBUyxDQUFDLENBQUM7QUFDWDtBQUFBLFFBQ0Y7QUFFQSxjQUFNLFNBQVMsTUFBTSxRQUFRLFVBQVUsS0FBSyxJQUFJLFNBQVMsUUFBUSxDQUFDO0FBQ2xFLGNBQU0sZ0JBQ0osT0FBTyxLQUFLLENBQUMsVUFBVSxTQUFTLE9BQU8sWUFBWSxFQUFFLFlBQVksTUFBTSxRQUFRLEtBQUssRUFBRSxZQUFZLENBQUMsS0FBSyxPQUFPLENBQUM7QUFFbEgsWUFBSSxDQUFDLGVBQWU7QUFDbEIsMEJBQWdCLEtBQUssMEJBQTBCLDhCQUE4QixDQUFDO0FBQzlFLG9CQUFVLElBQUk7QUFDZCxtQkFBUyxDQUFDLENBQUM7QUFDWDtBQUFBLFFBQ0Y7QUFFQSxjQUFNLGFBQWEsc0JBQXNCLGFBQWE7QUFDdEQsY0FBTSxhQUFhLE1BQU0sUUFBUSxjQUFjLEtBQUssSUFBSSxjQUFjLFFBQVEsQ0FBQyxHQUFHO0FBQUEsVUFBSSxDQUFDLFVBQ3JGLG9CQUFvQixLQUFLO0FBQUEsUUFDM0I7QUFDQSxrQkFBVSxVQUFVO0FBQ3BCLGlCQUFTLFNBQVM7QUFBQSxNQUNwQixTQUFTLE9BQU87QUFDZCxZQUFJLGlCQUFpQixpQkFBaUIsTUFBTSxXQUFXLEtBQUs7QUFDMUQsc0JBQVk7QUFDWjtBQUFBLFFBQ0Y7QUFFQTtBQUFBLFVBQ0UsaUJBQWlCLFFBQVEsTUFBTSxVQUFVLEtBQUssMkJBQTJCLHNDQUFzQztBQUFBLFFBQ2pIO0FBQ0Esa0JBQVUsSUFBSTtBQUNkLGlCQUFTLENBQUMsQ0FBQztBQUFBLE1BQ2IsVUFBRTtBQUNBLHFCQUFhLEtBQUs7QUFBQSxNQUNwQjtBQUFBLElBQ0Y7QUFFQSxTQUFLLFdBQVc7QUFBQSxFQUNsQixHQUFHLENBQUMsa0JBQWtCLFdBQVcsd0JBQXdCLGNBQWMsYUFBYSxPQUFPLENBQUM7QUFFNUYsK0JBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxVQUFVLFVBQVc7QUFDMUIsMkJBQXVCLE1BQU07QUFBQSxFQUMvQixHQUFHLENBQUMsUUFBUSx3QkFBd0IsU0FBUyxDQUFDO0FBRTlDLCtCQUFVLE1BQU07QUFDZCxRQUFJLENBQUMsVUFBVztBQUNoQixRQUFJLGNBQWM7QUFDbEIsVUFBTSxhQUFhLElBQUksZ0JBQWdCO0FBRXZDLFVBQU0sMEJBQTBCLFlBQVk7QUFDMUMsVUFBSTtBQUNGLGNBQU0sT0FBTyxNQUFNLG1DQUFtQztBQUFBLFVBQ3BELHlCQUF5QjtBQUFBLFVBQ3pCLFFBQVEsV0FBVztBQUFBLFFBQ3JCLENBQUM7QUFDRCxZQUFJLFlBQWE7QUFDakIsK0JBQXVCLFNBQVMsSUFBSSxFQUFFLFlBQVksQ0FBQztBQUFBLE1BQ3JELFNBQVMsT0FBTztBQUNkLFlBQUksaUJBQWlCLGdCQUFnQixNQUFNLFNBQVMsYUFBYztBQUFBLE1BQ3BFO0FBQUEsSUFDRjtBQUVBLFNBQUssd0JBQXdCO0FBQzdCLFdBQU8sTUFBTTtBQUNYLG9CQUFjO0FBQ2QsaUJBQVcsTUFBTTtBQUFBLElBQ25CO0FBQUEsRUFDRixHQUFHLENBQUMsU0FBUyxDQUFDO0FBRWQsUUFBTSx1QkFBbUIsdUJBQVEsTUFBTSxRQUFRLFdBQVcsQ0FBQyxNQUFNLFNBQVMsQ0FBQztBQUMzRSwrQkFBVSxNQUFNO0FBQ2QsOEJBQTBCLGdCQUFnQjtBQUMxQyxXQUFPLE1BQU07QUFDWCxrQ0FBNEI7QUFBQSxJQUM5QjtBQUFBLEVBQ0YsR0FBRyxDQUFDLGdCQUFnQixDQUFDO0FBRXJCLFFBQU0sZUFBZSxTQUFTLFFBQVEsTUFBTTtBQUM1QyxRQUFNLGFBQWEsT0FBTyxRQUFRLHVCQUF1QixXQUFXLE9BQU8scUJBQXFCO0FBQ2hHLFFBQU0sa0JBQWtCLGVBQWU7QUFDdkMsUUFBTSxzQkFBc0IsZUFBZTtBQUMzQyxRQUFNLHVCQUF1QixtQkFBbUIsUUFBUSxPQUFPO0FBQy9ELFFBQU0sY0FBYyx1QkFBdUI7QUFDM0MsUUFBTSxzQkFBc0IsNkJBQTZCO0FBQUEsSUFDdkQ7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLG1CQUFtQixRQUFRO0FBQUEsSUFDM0I7QUFBQSxFQUNGLENBQUM7QUFDRCxRQUFNLG1CQUFlLHVCQUFRLE1BQU07QUFDakMsUUFBSSxjQUFjO0FBQ2hCLGFBQU87QUFBQSxRQUNMLGlCQUFpQjtBQUFBLFFBQ2pCLFNBQVM7QUFBQSxRQUNULGdCQUFnQjtBQUFBLFFBQ2hCLGVBQWUsQ0FBQztBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUVBLFdBQU8sZ0NBQWdDO0FBQUEsTUFDckM7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsUUFBUTtBQUFBLElBQ1YsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLHFCQUFxQixjQUFjLHFCQUFxQixhQUFhLFVBQVUsQ0FBQztBQUNwRixRQUFNLDZCQUE2QixnQkFBaUIsQ0FBQyx1QkFBdUIsYUFBYSxvQkFBb0I7QUFDN0csUUFBTSw4QkFBOEIsQ0FBQyxnQkFBZ0IsYUFBYSxvQkFBb0I7QUFDdEYsUUFBTSxvQkFBcUIsZ0JBQWdCLG9CQUFxQiw4QkFBOEI7QUFDOUYsUUFBTSx5QkFBeUIsQ0FBQyxnQkFBZ0IsYUFBYSxvQkFBb0I7QUFDakYsUUFBTSxnQkFBZ0IsbUJBQW1CO0FBQ3pDLFFBQU0sV0FBVyxNQUFNLFNBQVM7QUFDaEMsUUFBTSxvQkFBb0IseUJBQXlCLFNBQVMsUUFBUSxRQUFRLEdBQUc7QUFBQSxJQUM3RSx1QkFBdUI7QUFBQSxJQUN2Qix1QkFBdUI7QUFBQSxJQUN2QixhQUFhO0FBQUEsSUFDYixVQUFVO0FBQUEsRUFDWixDQUFDO0FBQ0QsUUFBTSx1QkFBbUIsdUJBQVEsTUFBTSx1QkFBdUIsaUJBQWlCLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztBQUNyRyxRQUFNLDhCQUEwQix1QkFBUSxNQUFNLGtCQUFrQixLQUFLLEVBQUUsWUFBWSxHQUFHLENBQUMsaUJBQWlCLENBQUM7QUFDekcsUUFBTSxnQ0FBNEIsdUJBQVEsTUFBTSxTQUFTLG1CQUFtQixFQUFFLFlBQVksR0FBRyxDQUFDLG1CQUFtQixDQUFDO0FBQ2xILFFBQU0sMkJBQTJCLDZCQUE2QjtBQUM5RCxRQUFNLGVBQVcsdUJBQVEsTUFBTTtBQUM3QixRQUFJLE9BQU8sYUFBYSxZQUFhLFFBQU87QUFDNUMsV0FBTyxTQUFTLFNBQVMsaUJBQWlCLElBQUksS0FBSztBQUFBLEVBQ3JELEdBQUcsQ0FBQyxDQUFDO0FBQ0wsUUFBTSx1QkFBbUIsdUJBQVEsTUFBTTtBQUNyQyxVQUFNLGFBQWEsaUJBQWlCLFNBQVMsUUFBUSxXQUFXLENBQUM7QUFDakUsUUFBSSxXQUFZLFFBQU8sVUFBVSxVQUFVO0FBQzNDLFdBQU8sVUFBVSxvQkFBSSxLQUFLLENBQUM7QUFBQSxFQUM3QixHQUFHLENBQUMsUUFBUSxXQUFXLENBQUM7QUFDeEIsUUFBTSx1QkFDSixhQUFhLDhCQUE4Qiw0QkFBNEIsTUFBTSw0QkFBNEI7QUFDM0csUUFBTSxnQ0FDSix3QkFBd0IsQ0FBQyxrQkFBa0IsS0FBSyxJQUM1QztBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsRUFDRixJQUNBO0FBRU4sUUFBTSwwQkFBMEI7QUFDaEMsUUFBTSw4QkFBOEIsYUFBYSw4QkFBOEIsWUFBWTtBQUUzRiwrQkFBVSxNQUFNO0FBQ2QsUUFBSSxjQUFjO0FBQ2xCLFFBQUksZUFBcUQ7QUFDekQsUUFBSSx5QkFBaUQ7QUFFckQsVUFBTSx3QkFBd0IsTUFBTTtBQUNsQyxVQUFJLGNBQWM7QUFDaEIscUJBQWEsWUFBWTtBQUN6Qix1QkFBZTtBQUFBLE1BQ2pCO0FBQ0EsVUFBSSx3QkFBd0I7QUFDMUIsK0JBQXVCLE1BQU07QUFDN0IsaUNBQXlCO0FBQUEsTUFDM0I7QUFBQSxJQUNGO0FBRUEsUUFBSSxDQUFDLGFBQWEsQ0FBQyw4QkFBOEIsNkJBQTZCO0FBQzVFLCtCQUF5QixLQUFLO0FBQzlCLDZCQUF1QixFQUFFO0FBQ3pCLG9DQUE4QixLQUFLO0FBQ25DLG1DQUE2QixFQUFFO0FBQy9CLHNDQUFnQyxFQUFFO0FBQ2xDLGtDQUE0QixFQUFFO0FBQzlCLG9DQUE4QixFQUFFO0FBQ2hDLGFBQU8sTUFBTTtBQUNYLDhCQUFzQjtBQUFBLE1BQ3hCO0FBQUEsSUFDRjtBQUVBLFFBQUksQ0FBQywyQkFBMkIsQ0FBQywwQkFBMEI7QUFDekQsK0JBQXlCLEtBQUs7QUFDOUIsNkJBQXVCLEVBQUU7QUFDekIsb0NBQThCLEtBQUs7QUFDbkMsbUNBQTZCLEVBQUU7QUFDL0Isc0NBQWdDLEVBQUU7QUFDbEMsa0NBQTRCLEVBQUU7QUFDOUIsb0NBQThCLEVBQUU7QUFDaEMsYUFBTyxNQUFNO0FBQ1gsOEJBQXNCO0FBQUEsTUFDeEI7QUFBQSxJQUNGO0FBRUEsUUFBSSw0QkFBNEIsMEJBQTBCO0FBQ3hELDJCQUFxQixpQ0FBaUM7QUFDdEQsbUNBQTZCLGlDQUFpQztBQUM5RCwrQkFBeUIsS0FBSztBQUM5Qiw2QkFBdUIsRUFBRTtBQUN6QixvQ0FBOEIsS0FBSztBQUNuQyxzQ0FBZ0MsRUFBRTtBQUNsQyxrQ0FBNEIsRUFBRTtBQUM5QixvQ0FBOEIsRUFBRTtBQUNoQyxhQUFPLE1BQU07QUFDWCw4QkFBc0I7QUFBQSxNQUN4QjtBQUFBLElBQ0Y7QUFFQSxtQkFBZSxXQUFXLFlBQVk7QUFDcEMsK0JBQXlCLElBQUksZ0JBQWdCO0FBQzdDLCtCQUF5QixJQUFJO0FBQzdCLDZCQUF1QixFQUFFO0FBQ3pCLG9DQUE4QixLQUFLO0FBQ25DLG1DQUE2QixFQUFFO0FBQy9CLHNDQUFnQyxFQUFFO0FBQ2xDLGtDQUE0QixFQUFFO0FBQzlCLG9DQUE4QixFQUFFO0FBRWhDLFVBQUk7QUFDRixjQUFNLFdBQVcsTUFBTTtBQUFBLFVBQ3JCO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsWUFDRSx5QkFBeUI7QUFBQSxZQUN6QixRQUFRLHVCQUF1QjtBQUFBLFVBQ2pDO0FBQUEsUUFDRjtBQUVBLFlBQUksWUFBYTtBQUVqQixZQUFJLENBQUMsU0FBUyxXQUFXLENBQUMsU0FBUyxRQUFRLENBQUMsT0FBTyxTQUFTLE9BQU8sU0FBUyxLQUFLLElBQUksQ0FBQyxHQUFHO0FBQ3ZGLDBDQUFnQyxFQUFFO0FBQ2xDLHNDQUE0QixFQUFFO0FBQzlCLHdDQUE4QixFQUFFO0FBQ2hDO0FBQUEsWUFDRSxTQUFTLFNBQVMsT0FBTyxLQUFLLEtBQUssMENBQTBDLHVDQUF1QztBQUFBLFVBQ3RIO0FBQ0Esd0NBQThCLElBQUk7QUFDbEM7QUFBQSxRQUNGO0FBSUEsY0FBTSwwQkFBMEIsT0FBTyxTQUFTLEtBQUssSUFBSTtBQUN6RCxjQUFNLGlDQUFpQywwQkFBMEI7QUFDakUsY0FBTSx3QkFBd0IsNkJBQTZCLDhCQUE4QjtBQUN6RixjQUFNLHVCQUF1Qiw2QkFBNkIsdUJBQXVCO0FBQ2pGLHFDQUE2QixxQkFBcUI7QUFDbEQsd0NBQWdDLG9CQUFvQjtBQUNwRCw2QkFBcUIscUJBQXFCO0FBRTFDLGNBQU0sb0JBQW9CLFNBQVMsU0FBUyxLQUFLLElBQUksS0FBSztBQUMxRCxjQUFNLFNBQVMsU0FBUyxTQUFTLEtBQUssTUFBTTtBQUM1QyxvQ0FBNEIsaUJBQWlCO0FBQzdDLHNDQUE4QixNQUFNO0FBQ3BDLGNBQU0sZ0JBQWdCLGdDQUFnQyxDQUFDLEtBQUssS0FBSyxrREFBa0QsY0FBYztBQUNqSSxjQUFNLG9CQUFvQix5QkFBeUIsbUJBQW1CLFFBQVEsS0FBSztBQUNuRixjQUFNLDBCQUEwQixTQUFTLEdBQUcsYUFBYSxJQUFJLGlCQUFpQixLQUFLLE1BQU0sTUFBTSxHQUFHLGFBQWEsSUFBSSxpQkFBaUI7QUFDcEksK0JBQXVCLHVCQUF1QixHQUFHLHVCQUF1QixNQUFNLG9CQUFvQixLQUFLLHVCQUF1QjtBQUM5SCxzQ0FBOEIsS0FBSztBQUFBLE1BQ3JDLFNBQVMsT0FBTztBQUNkLFlBQUksWUFBYTtBQUNqQixZQUFJLGlCQUFpQixnQkFBZ0IsTUFBTSxTQUFTLGFBQWM7QUFFbEUsWUFBSSxpQkFBaUIsZUFBZTtBQUNsQyxjQUFJLE1BQU0sV0FBVyxLQUFLO0FBQ3hCLHlDQUE2QixFQUFFO0FBQy9CLDRDQUFnQyxFQUFFO0FBQ2xDLHdDQUE0QixFQUFFO0FBQzlCLDBDQUE4QixFQUFFO0FBQ2hDLG1DQUF1QixLQUFLLHVDQUF1QyxxQ0FBcUMsQ0FBQztBQUN6RywwQ0FBOEIsSUFBSTtBQUNsQztBQUFBLFVBQ0Y7QUFFQSxjQUFJLE1BQU0sV0FBVyxPQUFPLE1BQU0sV0FBVyxLQUFLO0FBQ2hELHlDQUE2QixFQUFFO0FBQy9CLDRDQUFnQyxFQUFFO0FBQ2xDLHdDQUE0QixFQUFFO0FBQzlCLDBDQUE4QixFQUFFO0FBQ2hDO0FBQUEsY0FDRSxTQUFTLE1BQU0sT0FBTyxLQUFLLEtBQUssMENBQTBDLHVDQUF1QztBQUFBLFlBQ25IO0FBQ0EsMENBQThCLElBQUk7QUFDbEM7QUFBQSxVQUNGO0FBRUEsdUNBQTZCLEVBQUU7QUFDL0IsMENBQWdDLEVBQUU7QUFDbEMsc0NBQTRCLEVBQUU7QUFDOUIsd0NBQThCLEVBQUU7QUFDaEM7QUFBQSxZQUNFLFNBQVMsTUFBTSxPQUFPLEtBQUssS0FBSywwQ0FBMEMsdUNBQXVDO0FBQUEsVUFDbkg7QUFDQSx3Q0FBOEIsSUFBSTtBQUNsQztBQUFBLFFBQ0Y7QUFFQSxxQ0FBNkIsRUFBRTtBQUMvQix3Q0FBZ0MsRUFBRTtBQUNsQyxvQ0FBNEIsRUFBRTtBQUM5QixzQ0FBOEIsRUFBRTtBQUNoQywrQkFBdUIsS0FBSywwQ0FBMEMsdUNBQXVDLENBQUM7QUFDOUcsc0NBQThCLElBQUk7QUFBQSxNQUNwQyxVQUFFO0FBQ0EsWUFBSSxDQUFDLGFBQWE7QUFDaEIsbUNBQXlCLEtBQUs7QUFBQSxRQUNoQztBQUFBLE1BQ0Y7QUFBQSxJQUNGLEdBQUcseUJBQXlCO0FBRTVCLFdBQU8sTUFBTTtBQUNYLG9CQUFjO0FBQ2QsNEJBQXNCO0FBQUEsSUFDeEI7QUFBQSxFQUNGLEdBQUc7QUFBQSxJQUNEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sdUJBQW1CLDJCQUFZLE1BQU07QUFDekMsUUFBSSxnQkFBZ0IsYUFBYSxDQUFDLFFBQVE7QUFDeEM7QUFBQSxJQUNGO0FBRUEsUUFBSSxDQUFDLG1CQUFtQjtBQUN0QixrQkFBWTtBQUNaO0FBQUEsSUFDRjtBQUVBLGtCQUFjLEVBQUU7QUFDaEIsaUJBQWEsSUFBSTtBQUNqQiwyQkFBdUIsTUFBTTtBQUM3QixjQUFVLEtBQUssdUNBQXVDLGlCQUFpQixDQUFDO0FBQUEsRUFDMUUsR0FBRyxDQUFDLG1CQUFtQixRQUFRLHdCQUF3QixjQUFjLFdBQVcsV0FBVyxDQUFDO0FBRTVGLFFBQU0sdUJBQW1CLDJCQUFZLE1BQU07QUFDekMsUUFBSSxjQUFjO0FBQ2hCLDJCQUFxQix5QkFBeUI7QUFBQSxRQUM1QyxpQkFBaUI7QUFBQSxNQUNuQixDQUFDO0FBQ0Q7QUFBQSxJQUNGO0FBRUEsUUFBSSxDQUFDLFVBQVc7QUFFaEIsaUJBQWEsS0FBSztBQUNsQixrQkFBYyxFQUFFO0FBQ2hCLDJCQUF1QixNQUFNO0FBQzdCLGNBQVUsS0FBSyxpQkFBaUIsUUFBUSxDQUFDO0FBQUEsRUFDM0MsR0FBRyxDQUFDLFFBQVEsd0JBQXdCLGNBQWMsU0FBUyxDQUFDO0FBRzVELFFBQU0sZ0NBQTRCLDJCQUFZLE1BQU07QUFDbEQsUUFBSSxDQUFDLGtCQUFrQjtBQUNyQixrQkFBWTtBQUNaO0FBQUEsSUFDRjtBQUVBLFFBQUksY0FBYztBQUNoQjtBQUFBLElBQ0Y7QUFFQSx5QkFBcUIsMENBQTBDO0FBQUEsTUFDN0QsaUJBQWlCO0FBQUEsSUFDbkIsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLGtCQUFrQixjQUFjLFdBQVcsV0FBVyxDQUFDO0FBRzNELFFBQU0sK0JBQTJCLDJCQUFZLE1BQU07QUFDakQsUUFBSSxDQUFDLFdBQVcsQ0FBQyx3QkFBd0I7QUFDdkMsa0JBQVk7QUFDWjtBQUFBLElBQ0Y7QUFFQSxRQUFJLGNBQWM7QUFDaEI7QUFBQSxJQUNGO0FBRUEsVUFBTSxZQUFZLCtDQUErQyxtQkFBbUIsT0FBTyxDQUFDO0FBQzVGLHlCQUFxQixXQUFXO0FBQUEsTUFDOUIsaUJBQWlCO0FBQUEsSUFDbkIsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLHdCQUF3QixjQUFjLFdBQVcsYUFBYSxPQUFPLENBQUM7QUFHMUUsUUFBTSwyQkFBdUI7QUFBQSxJQUMzQixDQUFDLFdBQTJCO0FBQzFCLFVBQUksQ0FBQyxXQUFXLENBQUMsd0JBQXdCO0FBQ3ZDLG9CQUFZO0FBQ1o7QUFBQSxNQUNGO0FBRUEsVUFBSSxjQUFjO0FBQ2hCO0FBQUEsTUFDRjtBQUVBLFlBQU0sUUFBUSxJQUFJLGdCQUFnQjtBQUFBLFFBQ2hDO0FBQUEsUUFDQSxjQUFjO0FBQUEsTUFDaEIsQ0FBQztBQUNELDJCQUFxQixtQkFBbUIsTUFBTSxTQUFTLENBQUMsSUFBSTtBQUFBLFFBQzFELGlCQUFpQjtBQUFBLE1BQ25CLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxDQUFDLHdCQUF3QixjQUFjLFdBQVcsYUFBYSxPQUFPO0FBQUEsRUFDeEU7QUFFQSxRQUFNLGlDQUE2QiwyQkFBWSxNQUFNO0FBQ25ELHlCQUFxQixLQUFLO0FBQUEsRUFDNUIsR0FBRyxDQUFDLG9CQUFvQixDQUFDO0FBRXpCLFFBQU0sK0JBQTJCLDJCQUFZLE1BQU07QUFDakQseUJBQXFCLE1BQU07QUFBQSxFQUM3QixHQUFHLENBQUMsb0JBQW9CLENBQUM7QUFFekIsUUFBTSw2QkFBeUIsMkJBQVksQ0FBQyxtQkFBMkI7QUFDckUsVUFBTSxxQkFBcUIsU0FBUyxjQUFjO0FBQ2xELFFBQUksQ0FBQyxtQkFBb0I7QUFFekIsVUFBTSxZQUFZLDJDQUEyQyxtQkFBbUIsa0JBQWtCLENBQUM7QUFDbkcseUJBQXFCLFNBQVM7QUFBQSxFQUNoQyxHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sMkJBQXVCO0FBQUEsSUFDM0IsQ0FDRSxXQUNBLFlBS0c7QUFDSCxZQUFNLGFBQWEsU0FBUyxTQUFTO0FBQ3JDLFlBQU0sY0FBYyxTQUFTLE9BQU87QUFDcEMsVUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFhO0FBRWpDLFlBQU0sV0FBVyxTQUFTLFNBQVMsU0FBUyxTQUFTO0FBQ3JELFlBQU0sWUFBWSwrQ0FBK0MsbUJBQW1CLFdBQVcsQ0FBQyxjQUFjLG1CQUFtQixVQUFVLENBQUMsR0FBRyxXQUFXLFNBQVMsUUFBUSxLQUFLLEVBQUU7QUFDbEwsMkJBQXFCLFdBQVc7QUFBQSxRQUM5QixpQkFBaUIsU0FBUyxtQkFBbUI7QUFBQSxRQUM3QyxpQkFBaUIsU0FBUyxtQkFBbUI7QUFBQSxNQUMvQyxDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsQ0FBQyxPQUFPO0FBQUEsRUFDVjtBQUVBLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsNkJBQTZCO0FBQUEsSUFDN0I7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBSmxvQkUsSUFBQUMsc0JBQUE7QUFqQkYsSUFBTSxrQkFBa0I7QUFDeEIsSUFBTSxvQ0FBb0M7QUFFMUMsSUFBTSxhQUFhLENBQUssT0FBWSxNQUFjLGFBQTBCO0FBQzFFLE1BQUksQ0FBQyxNQUFNLE9BQVEsUUFBTyxDQUFDO0FBQzNCLFFBQU0sV0FBVyxLQUFLLElBQUksR0FBRyxJQUFJO0FBQ2pDLFFBQU0sU0FBUyxXQUFXLEtBQUs7QUFDL0IsU0FBTyxNQUFNLE1BQU0sT0FBTyxRQUFRLFFBQVE7QUFDNUM7QUFHQSxJQUFNLHlCQUF5QixDQUFDLFVBQTRCO0FBQzFELFFBQU0sU0FBUyxPQUFPLEtBQUs7QUFDM0IsU0FBTyxPQUFPLFNBQVMsTUFBTSxLQUFLLFNBQVM7QUFDN0M7QUFFQSxJQUFNLGdCQUFnQixNQUNwQiw4Q0FBQyxTQUFJLFNBQVEsYUFBWSxNQUFLLFFBQU8sUUFBTyxnQkFBZSxhQUFhLEtBQUssZUFBWSxRQUFPLFdBQVUsVUFDeEc7QUFBQSwrQ0FBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsK0hBQThIO0FBQUEsRUFDbkwsNkNBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLHdDQUF1QztBQUFBLEVBQzVGLDZDQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSw2QkFBNEI7QUFBQSxFQUNqRiw2Q0FBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsWUFBVztBQUFBLEVBQ2hFLDZDQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSxZQUFXO0FBQUEsR0FDbEU7QUFHRixJQUFNLGlCQUFpQixNQUNyQiw2Q0FBQyxTQUFJLFNBQVEsYUFBWSxNQUFLLFFBQU8sUUFBTyxnQkFBZSxhQUFhLEtBQUssZUFBWSxRQUFPLFdBQVUsVUFDeEcsdURBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLDZLQUE0SyxHQUNuTztBQUdGLElBQU0sY0FBYyxNQUNsQiw4Q0FBQyxTQUFJLFNBQVEsYUFBWSxNQUFLLFFBQU8sUUFBTyxnQkFBZSxhQUFhLEtBQUssZUFBWSxRQUFPLFdBQVUsVUFDeEc7QUFBQSwrQ0FBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsMEtBQXlLO0FBQUEsRUFDOU4sNkNBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLCtEQUE4RDtBQUFBLEVBQ25ILDZDQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSxXQUFVO0FBQUEsR0FDakU7QUFJSyxJQUFNLDBCQUEwQixNQUFNO0FBQzNDLDBCQUF3QjtBQUFBLElBQ3RCLE9BQU8sU0FBUyxPQUFPLGlCQUFpQjtBQUFBLElBQ3hDLFVBQVUsU0FBUyxPQUFPLGlCQUFpQjtBQUFBLElBQzNDLFNBQVMsU0FBUyxPQUFPLGdCQUFnQjtBQUFBLEVBQzNDLENBQUM7QUFDSDtBQUdPLElBQU0sc0NBQXNDLE1BQU07QUFDdkQsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsSUFBSSxlQUFlO0FBQ25CLFFBQU0sWUFBWSxVQUFVLHFCQUFxQixNQUFNO0FBQ3ZELFFBQU0sbUJBQW1CLFVBQVUscUJBQXFCLEtBQUs7QUFDN0QsUUFBTSxVQUFVLFNBQVMsT0FBTyxvQkFBb0I7QUFDcEQsUUFBTSxZQUFZLFNBQVMsT0FBTyxzQkFBc0IsRUFBRSxZQUFZO0FBQ3RFLFFBQU0sZUFBZSxjQUFjO0FBQ25DLFFBQU0saUNBQWlDLDZCQUE2QjtBQUFBLElBQ2xFO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLG1CQUFtQjtBQUFBLElBQ25CO0FBQUEsRUFDRixDQUFDO0FBQ0QsUUFBTSxxQ0FBcUMsb0JBQW9CLENBQUM7QUFDaEUsUUFBTSx1QkFBbUIsc0JBQThCLElBQUk7QUFDM0QsUUFBTSx3QkFBb0Isc0JBQU8sRUFBRTtBQUNuQyxRQUFNLHFCQUFpQixzQkFBZ0MsSUFBSTtBQUMzRCxRQUFNLHNCQUFrQixzQkFBZ0MsSUFBSTtBQUM1RCxRQUFNLENBQUMsMEJBQTBCLDJCQUEyQixRQUFJLHdCQUFTLEtBQUs7QUFDOUUsUUFBTSxDQUFDLHlCQUF5QiwwQkFBMEIsUUFBSSx3QkFBUyxFQUFFO0FBQ3pFLFFBQU0sQ0FBQyxrQ0FBa0MsbUNBQW1DLFFBQUksd0JBQVMsS0FBSztBQUM5RixRQUFNLGlDQUE2QixzQkFBTyxFQUFFO0FBRTVDLFFBQU0sdUJBQW1CO0FBQUEsSUFDdkIsT0FBTztBQUFBLE1BQ0wsT0FBTyxLQUFLLHNCQUFzQixPQUFPO0FBQUEsTUFDekMsTUFBTSxLQUFLLHFCQUFxQixVQUFVO0FBQUEsTUFDMUMsTUFBTSxLQUFLLHFCQUFxQixNQUFNO0FBQUEsTUFDdEMsTUFBTSxLQUFLLHFCQUFxQixNQUFNO0FBQUEsSUFDeEM7QUFBQSxJQUNBLENBQUM7QUFBQSxFQUNIO0FBRUEsUUFBTSxjQUFjLDJCQUEyQjtBQUFBLElBQzdDO0FBQUEsSUFDQSxrQkFBa0I7QUFBQSxJQUNsQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsYUFBYTtBQUFBLEVBQ2YsQ0FBQztBQUVELFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixJQUFJO0FBRUosUUFBTSxpQ0FBaUMsb0JBQW9CLENBQUM7QUFDNUQsUUFBTSxpQ0FBaUMsYUFBYTtBQUNwRCxRQUFNLHNCQUFzQixhQUFhLGNBQWMsU0FBUztBQUNoRSxRQUFNLGlCQUFpQixhQUFhLG9CQUFvQjtBQUN4RCxRQUFNLG9CQUFvQixPQUFPLFFBQVEsdUJBQXVCLFdBQVcsT0FBTyxxQkFBcUI7QUFDdkcsUUFBTSwwQkFDSixzQkFBc0IscUNBQXFDLENBQUM7QUFDOUQsUUFBTSxtQkFBbUIsQ0FBQyxpQkFBaUIsa0JBQWtCLDJCQUEyQixjQUFjO0FBQ3RHLFFBQU0seUJBQXlCLDZCQUE2QixnQkFBZ0IsQ0FBQyxDQUFDO0FBQzlFLFFBQU0sRUFBRSwrQkFBK0IsSUFBSSw0QkFBNEI7QUFFdkUsUUFBTSxFQUFFLE9BQU8sYUFBYSxjQUFjLGNBQWMsSUFBSSxpQkFBaUI7QUFBQSxJQUMzRSxvQkFBb0IsS0FBSyxlQUFlLElBQUk7QUFBQSxJQUM1QyxtQkFBbUIsS0FBSyxjQUFjLFFBQVE7QUFBQSxFQUNoRCxDQUFDO0FBRUQsUUFBTSxrQ0FBOEIsMkJBQVksTUFBTTtBQUNwRCwrQkFBMkIsVUFBVTtBQUNyQywrQkFBMkIsRUFBRTtBQUM3Qix3Q0FBb0MsS0FBSztBQUFBLEVBQzNDLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSx5QkFBcUIsMkJBQVksTUFBTTtBQUMzQyxnQ0FBNEI7QUFDNUIsaUJBQWE7QUFBQSxFQUNmLEdBQUcsQ0FBQyxjQUFjLDJCQUEyQixDQUFDO0FBRTlDLFFBQU0seUJBQXFCLDJCQUFZLFlBQVk7QUFDakQsa0JBQWMsRUFBRTtBQUNoQixVQUFNLGNBQWM7QUFBQSxNQUNsQjtBQUFBLE1BQ0EsU0FBUyxDQUFDLFFBQVE7QUFDaEIsc0JBQWMsR0FBRztBQUNqQixrQkFBVSxHQUFHO0FBQUEsTUFDZjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLE1BQU0sZUFBZSxlQUFlLFNBQVMsQ0FBQztBQUVsRCxRQUFNLG1CQUFtQixLQUFLLGtCQUFrQixTQUFTO0FBQ3pELFFBQU0sa0JBQWtCLE1BQU0sY0FBYyxLQUFLLGNBQWMsUUFBUTtBQUN2RSxRQUFNLG1CQUFtQixPQUNyQixtQkFDQSxDQUFDLFFBQVEsYUFDUCxLQUFLLGFBQWEsSUFBSSxJQUNyQixNQUFNLGVBQWUsS0FBSyxlQUFlLElBQUk7QUFFcEQsUUFBTSwrQkFBMkIsMkJBQVksTUFBTTtBQUNqRCxRQUFJLENBQUMsUUFBUSxZQUFZO0FBQ3ZCLHlCQUFtQjtBQUNuQjtBQUFBLElBQ0Y7QUFFQSxTQUFLLG1CQUFtQjtBQUFBLEVBQzFCLEdBQUcsQ0FBQyxNQUFNLG9CQUFvQixvQkFBb0IsVUFBVSxDQUFDO0FBRTdELFFBQU0sbUJBQWUsdUJBQVEsTUFBTSxXQUFXLE9BQU8sVUFBVSxlQUFlLEdBQUcsQ0FBQyxVQUFVLEtBQUssQ0FBQztBQUNsRyxRQUFNLGlCQUFpQixLQUFLLE1BQU0sTUFBTSxVQUFVLEtBQUssZUFBZTtBQUN0RSxRQUFNLHNCQUFrQjtBQUFBLElBQ3RCLE1BQU0seUJBQXlCLFFBQVEsZUFBZSxNQUFNLFNBQVMsUUFBUSxZQUFZLENBQUM7QUFBQSxJQUMxRixDQUFDLFFBQVEsY0FBYyxRQUFRLFdBQVc7QUFBQSxFQUM1QztBQUNBLFFBQU0seUJBQXlCLE1BQU0sU0FBUyxLQUFLLHVCQUF1QixRQUFRLFdBQVc7QUFDN0YsUUFBTSwyQkFBMkIsQ0FBQztBQUVsQyxRQUFNLEVBQUUsY0FBYyx3QkFBd0IsYUFBYSxJQUFJLCtCQUErQjtBQUFBLElBQzVGO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBQ2hCO0FBQUEsSUFDQTtBQUFBLElBQ0Esb0JBQW9CLFNBQVMsUUFBUSxZQUFZO0FBQUEsSUFDakQsb0JBQW9CLFNBQVMsUUFBUSxRQUFRO0FBQUEsSUFDN0Msa0JBQWtCO0FBQUEsSUFDbEIsZ0JBQWdCO0FBQUEsSUFDaEIsa0JBQWtCO0FBQUEsSUFDbEIscUJBQXFCO0FBQUEsSUFDckI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSwyQkFBMkIsUUFBUTtBQUFBLElBQ25DLHlCQUF5QixRQUFRO0FBQUEsSUFDakM7QUFBQSxJQUNBLGlCQUFpQixDQUFDLG1CQUFtQjtBQUNuQyx3QkFBa0IsVUFBVSxTQUFTLGNBQWM7QUFBQSxJQUNyRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCxRQUFNLDJCQUF1QjtBQUFBLElBQzNCLE9BQU8sY0FBc0I7QUFDM0IsWUFBTSxhQUFhLFNBQVMsU0FBUztBQUNyQyxVQUFJLENBQUMsY0FBYyxRQUFRLDBCQUEwQjtBQUNuRDtBQUFBLE1BQ0Y7QUFFQSxVQUFJLGFBQWEsNEJBQTRCO0FBQzNDLGNBQU0sS0FBSyxNQUFNLGFBQWE7QUFDOUIsWUFBSSxDQUFDLElBQUk7QUFDUDtBQUFBLFFBQ0Y7QUFFQSw2QkFBcUIsWUFBWTtBQUFBLFVBQy9CLE1BQU07QUFBQSxVQUNOLGlCQUFpQjtBQUFBLFVBQ2pCLGlCQUFpQjtBQUFBLFFBQ25CLENBQUM7QUFDRDtBQUFBLE1BQ0Y7QUFFQSwyQkFBcUIsVUFBVTtBQUFBLElBQ2pDO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsUUFBTSx3QkFBb0IsMkJBQVksTUFBTTtBQUMxQyxRQUFJLGNBQWM7QUFDaEIsWUFBTSxpQkFBaUIsU0FBUyxrQkFBa0IsT0FBTztBQUN6RCxVQUFJLENBQUMsZUFBZ0I7QUFDckIsMkNBQXFDO0FBQUEsUUFDbkMsU0FBUztBQUFBLE1BQ1gsQ0FBQztBQUNELGtDQUE0QixJQUFJO0FBQ2hDLDZCQUF1QixjQUFjO0FBQ3JDO0FBQUEsSUFDRjtBQUVBLHNCQUFrQjtBQUFBLEVBQ3BCLEdBQUcsQ0FBQyxjQUFjLHNCQUFzQixDQUFDO0FBRXpDLFFBQU0sOEJBQTBCO0FBQUEsSUFDOUIsQ0FBQyxXQUF1RTtBQUN0RSxVQUFJLENBQUMsd0JBQXdCO0FBQzNCO0FBQUEsTUFDRjtBQUVBLFlBQU0sY0FBYyxLQUFLLE9BQU8sVUFBVSxPQUFPLFFBQVE7QUFDekQsWUFBTSxxQkFDSixRQUFRLHVCQUF1QixRQUFRLFFBQVEsdUJBQXVCLFNBQ2xFLEtBQUssaUJBQWlCLFNBQVMsSUFDL0Isc0JBQXNCLE9BQU8sa0JBQWtCO0FBQ3JELFlBQU0sa0JBQWtCLHNCQUFzQixPQUFPLFVBQVU7QUFDL0QsWUFBTSxvQkFBb0I7QUFBQSxRQUN4QjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0YsRUFBRSxRQUFRLFFBQVEsSUFBSTtBQUN0QixZQUFNLGlCQUFpQixTQUFTLFFBQVEsaUJBQWlCO0FBQ3pELGlDQUEyQixVQUFVO0FBQ3JDLGlDQUEyQixjQUFjO0FBQ3pDLDBDQUFvQyxJQUFJO0FBRXhDLGtCQUFZO0FBQUEsUUFDVixPQUFPO0FBQUEsUUFDUCxTQUFTO0FBQUEsUUFDVCxhQUFhO0FBQUEsUUFDYixXQUFXLFlBQVk7QUFDckIsZ0JBQU0sS0FBSyxNQUFNO0FBQUEsWUFDZixPQUFPO0FBQUEsWUFDUDtBQUFBLFlBQ0EsMkJBQTJCO0FBQUEsVUFDN0I7QUFDQSxjQUFJLElBQUk7QUFDTiwyQ0FBK0I7QUFDL0Isd0NBQTRCO0FBQzVCLHlCQUFhO0FBQ2IsOEJBQWtCO0FBQUEsVUFDcEI7QUFDQSxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsUUFBUTtBQUFBLE1BQ1IsUUFBUTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEscUNBQW1DO0FBQUEsSUFDakMsTUFBTSxRQUFRO0FBQUEsSUFDZCxXQUFXLE1BQU07QUFBQSxJQUNqQjtBQUFBLElBQ0E7QUFBQSxJQUNBLFlBQVk7QUFBQSxJQUNaLFVBQVU7QUFBQSxJQUNWLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLGtCQUFrQjtBQUFBLElBQ2xCLGdCQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsZUFBZTtBQUFBLElBQ2YsaUJBQWlCLE1BQU07QUFDckIscUNBQStCO0FBQy9CLDJCQUFxQix1QkFBdUI7QUFBQSxJQUM5QztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsUUFBTSwyQkFBdUIsMkJBQVksQ0FBQyxXQUErQjtBQUN2RSxVQUFNLE9BQU87QUFDYixRQUFJLENBQUMsUUFBUSxPQUFPLEtBQUssWUFBWSxXQUFZLFFBQU87QUFDeEQsVUFBTSxPQUFPLEtBQUssUUFBcUIsMkJBQTJCO0FBQ2xFLFFBQUksQ0FBQyxLQUFNLFFBQU87QUFDbEIsUUFBSSxDQUFDLGlCQUFpQixTQUFTLFNBQVMsSUFBSSxFQUFHLFFBQU87QUFDdEQsV0FBTztBQUFBLEVBQ1QsR0FBRyxDQUFDLENBQUM7QUFFTCx5QkFBdUI7QUFBQSxJQUNyQixjQUFjO0FBQUEsSUFDZDtBQUFBLElBQ0EsT0FBTztBQUFBLElBQ1A7QUFBQSxFQUNGLENBQUM7QUFFRCxRQUFNLGtCQUFrQiwrQkFBK0I7QUFBQSxJQUNyRCxTQUFTLFNBQVMsUUFBUSxnQkFBZ0IsT0FBTztBQUFBLElBQ2pELFdBQVc7QUFBQSxJQUNYLGNBQWMsU0FBUyxRQUFRLFlBQVk7QUFBQSxJQUMzQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsYUFBYTtBQUFBLElBQ2hEO0FBQUEsSUFDQSxlQUFlLENBQUM7QUFBQSxJQUNoQixhQUFhO0FBQUEsSUFDYixhQUFhO0FBQUEsSUFDYixhQUFhLENBQUMsV0FBVztBQUN2QixZQUFNLGdCQUFnQixTQUFTLFFBQVEsTUFBTTtBQUM3QyxVQUFJLENBQUMsZUFBZTtBQUNsQiwwQkFBa0I7QUFDbEI7QUFBQSxNQUNGO0FBRUEsVUFBSSxRQUFRLGtCQUFrQixNQUFNO0FBQ2xDLDBCQUFrQjtBQUNsQjtBQUFBLE1BQ0Y7QUFFQSxZQUFNLGlCQUFpQixTQUFTLFFBQVEsZ0JBQWdCLE9BQU87QUFDL0QsWUFBTSxRQUFRLElBQUksZ0JBQWdCO0FBQUEsUUFDaEMsUUFBUTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sUUFBUTtBQUFBLE1BQ1YsQ0FBQztBQUNELFVBQUksZ0JBQWdCO0FBQ2xCLHVDQUErQjtBQUFBLFVBQzdCLFFBQVE7QUFBQSxVQUNSLFFBQVE7QUFBQSxVQUNSLFNBQVM7QUFBQSxRQUNYLENBQUM7QUFDRCxjQUFNLElBQUksV0FBVyxjQUFjO0FBQUEsTUFDckM7QUFDQSwyQkFBcUIsd0JBQXdCLE1BQU0sU0FBUyxDQUFDLEVBQUU7QUFBQSxJQUNqRTtBQUFBLEVBQ0YsQ0FBQztBQUVELFFBQU0sbUJBQWU7QUFBQSxJQUNuQixNQUFNO0FBQUEsTUFDSjtBQUFBLFFBQ0UsSUFBSTtBQUFBLFFBQ0osT0FBTyxLQUFLLCtCQUErQixjQUFjO0FBQUEsUUFDekQsTUFBTSw2Q0FBQyxpQkFBYztBQUFBLFFBQ3JCLFNBQVMsZ0JBQWdCO0FBQUEsTUFDM0I7QUFBQSxNQUNBO0FBQUEsUUFDRSxJQUFJO0FBQUEsUUFDSixPQUFPLEtBQUssZ0NBQWdDLGlCQUFpQjtBQUFBLFFBQzdELE1BQU0sNkNBQUMsa0JBQWU7QUFBQSxRQUN0QixTQUFTO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxRQUNFLElBQUk7QUFBQSxRQUNKLE9BQU8sS0FBSyw2QkFBNkIsYUFBYTtBQUFBLFFBQ3RELE1BQU0sNkNBQUMsZUFBWTtBQUFBLFFBQ25CLFNBQVM7QUFBQSxNQUNYO0FBQUEsSUFDRjtBQUFBLElBQ0EsQ0FBQywwQkFBMEIsMEJBQTBCLGdCQUFnQixnQkFBZ0I7QUFBQSxFQUN2RjtBQUVBLFFBQU0sc0JBQ0osQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsZ0JBQWdCLGFBQWEsY0FBYyxTQUFTO0FBQ25ILFFBQU0sVUFBVSxDQUFDLGdCQUFnQixhQUFhO0FBQzlDLFFBQU0sMEJBQTBCLFNBQVMsUUFBUSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsU0FBUztBQUNwRixRQUFNLG9CQUF1QywwQkFBMEIsU0FBUztBQUNoRixRQUFNLFlBQVksbUNBQ2hCLDhDQUFDLFNBQUksV0FBVSxlQUNiO0FBQUEsaURBQUMsV0FBTSxXQUFVLDRCQUNkLGVBQUsscUNBQXFDLGdCQUFnQixHQUM3RDtBQUFBLElBQ0E7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFdBQVU7QUFBQSxRQUNWLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLFVBQVUsQ0FBQyxVQUFVO0FBQ25CLGdCQUFNLFlBQVksTUFBTSxPQUFPLFNBQVM7QUFDeEMscUNBQTJCLFVBQVU7QUFDckMscUNBQTJCLFNBQVM7QUFBQSxRQUN0QztBQUFBLFFBQ0EsY0FBWSxLQUFLLHFDQUFxQyxnQkFBZ0I7QUFBQTtBQUFBLElBQ3hFO0FBQUEsS0FDRixJQUNFO0FBRUosU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxzQkFBc0I7QUFBQSxJQUN0QjtBQUFBLElBQ0E7QUFBQSxJQUNBLGNBQWM7QUFBQSxFQUNoQjtBQUNGOzs7QVIvYU0sSUFBQUMsc0JBQUE7QUEzSE4sSUFBTSxvQ0FBb0M7QUFDMUMsSUFBTSwwQkFBMEI7QUFFaEMsSUFBTSxnQ0FBZ0MsTUFBTTtBQUMxQyxRQUFNLGFBQWEsb0NBQW9DO0FBQ3ZELFFBQU0sRUFBRSxnQkFBZ0IsSUFBSSxlQUFlO0FBQzNDLFFBQU0sRUFBRSxpQkFBaUIsZ0JBQWdCLElBQUksNEJBQTRCO0FBQ3pFLFFBQU0sMEJBQTBCLGNBQUFDLFFBQU0sT0FBTyxFQUFFO0FBRS9DLGdCQUFBQSxRQUFNLFVBQVUsTUFBTTtBQUNwQixVQUFNLGlCQUFpQix3Q0FBd0MsV0FBVyxPQUFPO0FBQ2pGLDRCQUF3QixVQUFVLGdCQUFnQixXQUFXO0FBQUEsRUFDL0QsR0FBRyxDQUFDLFdBQVcsT0FBTyxDQUFDO0FBRXZCLFFBQU0saUNBQWlDLGNBQUFBLFFBQU0sWUFBWSxNQUFNO0FBQzdELFVBQU0saUJBQWlCLFNBQVMsd0JBQXdCLE9BQU87QUFDL0QsUUFBSSxDQUFDLGVBQWdCLFFBQU87QUFFNUIsVUFBTSxRQUFRLFdBQVcsb0JBQUksS0FBSyxDQUFDO0FBQ25DLFVBQU0sV0FBVyxJQUFJLEtBQUssS0FBSztBQUMvQixhQUFTLFFBQVEsTUFBTSxRQUFRLElBQUksRUFBRTtBQUVyQyxvQkFBZ0I7QUFBQSxNQUNkLFNBQVM7QUFBQSxRQUNQLFVBQVUsVUFBVSxRQUFRO0FBQUEsUUFDNUIsUUFBUSxVQUFVLEtBQUs7QUFBQSxRQUN2QixXQUFXO0FBQUEsUUFDWCxjQUFjO0FBQUEsUUFDZCxjQUFjO0FBQUEsUUFDZCxlQUFlLFNBQVMsZUFBZTtBQUFBLFFBQ3ZDLHFCQUFxQjtBQUFBLFFBQ3JCLGNBQWM7QUFBQSxRQUNkLGtCQUFrQjtBQUFBLFFBQ2xCLFFBQVE7QUFBQSxNQUNWO0FBQUEsTUFDQSxNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVCxPQUFPLENBQUM7QUFBQSxNQUNSLE9BQU87QUFBQSxJQUNULENBQUM7QUFFRCw0QkFBd0IsVUFBVTtBQUNsQyxXQUFPO0FBQUEsRUFDVCxHQUFHLENBQUMsaUJBQWlCLGVBQWUsQ0FBQztBQUVyQyxRQUFNLGdDQUFnQyxjQUFBQSxRQUFNLFlBQVksTUFBTTtBQUM1RCxRQUFJLCtCQUErQixHQUFHO0FBQ3BDO0FBQUEsSUFDRjtBQUVBLFVBQU0sY0FBYyxnQkFBZ0I7QUFDcEMsUUFBSSxDQUFDLFlBQWE7QUFDbEIsb0JBQWdCLFdBQVc7QUFBQSxFQUM3QixHQUFHLENBQUMsZ0NBQWdDLGlCQUFpQixlQUFlLENBQUM7QUFFckUsZ0JBQUFBLFFBQU0sVUFBVSxNQUFNO0FBQ3BCLFVBQU0sYUFBYSxTQUFTLGVBQWUsZUFBZTtBQUMxRCxRQUFJLENBQUMsV0FBWTtBQUVqQixlQUFXLGFBQWEsaUJBQWlCLHVCQUF1QjtBQUVoRSxXQUFPLE1BQU07QUFDWCxpQkFBVyxnQkFBZ0IsZUFBZTtBQUFBLElBQzVDO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUVMLGdCQUFBQSxRQUFNLFVBQVUsTUFBTTtBQUNwQixVQUFNLGFBQWEsU0FBUyxlQUFlLGVBQWU7QUFDMUQsUUFBSSxDQUFDLFdBQVk7QUFFakIsVUFBTSx3QkFBd0IsQ0FBQyxVQUFpQjtBQUM5QyxZQUFNLGVBQWU7QUFDckIsWUFBTSxnQkFBZ0I7QUFDdEIsWUFBTSx5QkFBeUI7QUFFL0IsWUFBTSx3QkFBd0IsTUFBTTtBQUNsQyxzQ0FBOEI7QUFDOUIsZUFBTyxpQ0FBaUM7QUFDeEMsZUFBTyxTQUFTLE9BQU87QUFBQSxNQUN6QjtBQUVBLFVBQUksT0FBTyxPQUFPLDJCQUEyQixZQUFZO0FBQ3ZELGVBQU8sdUJBQXVCLHFCQUFxQjtBQUNuRDtBQUFBLE1BQ0Y7QUFFQSw0QkFBc0I7QUFBQSxJQUN4QjtBQUVBLGVBQVcsaUJBQWlCLFNBQVMsdUJBQXVCLElBQUk7QUFDaEUsV0FBTyxNQUFNO0FBQ1gsaUJBQVcsb0JBQW9CLFNBQVMsdUJBQXVCLElBQUk7QUFBQSxJQUNyRTtBQUFBLEVBQ0YsR0FBRyxDQUFDLDZCQUE2QixDQUFDO0FBRWxDLGdCQUFBQSxRQUFNLFVBQVUsTUFBTTtBQUNwQixVQUFNLG1CQUFtQixDQUFDLFVBQVU7QUFDbEMsVUFBSSxPQUFPLFNBQVMsTUFBTSxNQUFNLFlBQVksTUFBTTtBQUNoRDtBQUFBLE1BQ0Y7QUFFQSxZQUFNLHdCQUF3QixNQUFNO0FBQ2xDLHNDQUE4QjtBQUM5QixlQUFPLGlDQUFpQztBQUN4QyxlQUFPLFNBQVMsUUFBUSx1QkFBdUI7QUFBQSxNQUNqRDtBQUVBLFVBQUksT0FBTyxPQUFPLDJCQUEyQixZQUFZO0FBQ3ZELGVBQU8sdUJBQXVCLHFCQUFxQjtBQUNuRDtBQUFBLE1BQ0Y7QUFFQSw0QkFBc0I7QUFBQSxJQUN4QjtBQUVBLFdBQU8saUJBQWlCLFlBQVksZ0JBQWdCO0FBQ3BELFdBQU8sTUFBTTtBQUNYLGFBQU8sb0JBQW9CLFlBQVksZ0JBQWdCO0FBQUEsSUFDekQ7QUFBQSxFQUNGLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQztBQUVsQyxTQUNFLDhDQUFDLFNBQUksV0FBVSxhQUNiO0FBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE9BQU8sV0FBVztBQUFBLFFBQ2xCLFlBQVksV0FBVztBQUFBLFFBQ3ZCLFFBQVEsV0FBVztBQUFBLFFBQ25CLE1BQU0sV0FBVztBQUFBLFFBQ2pCLDBCQUEwQixXQUFXO0FBQUEsUUFDckMsa0JBQWtCLFdBQVc7QUFBQSxRQUM3QixpQkFBaUIsV0FBVztBQUFBLFFBQzVCLGtCQUFrQixXQUFXO0FBQUEsUUFDN0IsV0FBVyxXQUFXO0FBQUEsUUFDdEIsZ0JBQWdCLFdBQVc7QUFBQSxRQUMzQixpQkFBaUIsV0FBVztBQUFBLFFBQzVCLGtCQUFrQixXQUFXLGdCQUFnQjtBQUFBLFFBQzdDLGlCQUFpQixXQUFXLGdCQUFnQjtBQUFBLFFBQzVDLDRCQUE0QixXQUFXLGdCQUFnQjtBQUFBLFFBQ3ZELDJCQUEyQixXQUFXLGdCQUFnQjtBQUFBLFFBQ3RELHNCQUFzQixXQUFXLGdCQUFnQjtBQUFBLFFBQ2pELHlCQUF5QixXQUFXLGdCQUFnQjtBQUFBLFFBQ3BELHNCQUFzQixXQUFXLGdCQUFnQjtBQUFBLFFBQ2pELHNCQUFzQixXQUFXLGdCQUFnQjtBQUFBLFFBQ2pELHVCQUF1QixXQUFXLGdCQUFnQjtBQUFBLFFBQ2xELHlCQUF5QixXQUFXLGdCQUFnQjtBQUFBLFFBQ3BELFdBQVcsV0FBVztBQUFBLFFBQ3RCLFVBQVUsV0FBVztBQUFBLFFBQ3JCLHNCQUFzQixDQUFDLFNBQVM7QUFDOUIsZUFBSyxXQUFXLGdCQUFnQixtQkFBbUIsTUFBTSxRQUFRO0FBQUEsUUFDbkU7QUFBQSxRQUNBLHVCQUF1QixDQUFDLFNBQVM7QUFDL0IsZUFBSyxXQUFXLGdCQUFnQixtQkFBbUIsTUFBTSxTQUFTO0FBQUEsUUFDcEU7QUFBQSxRQUNBLG9CQUFvQixNQUFNO0FBQ3hCLGVBQUssV0FBVyxnQkFBZ0IsaUJBQWlCLFdBQVcsZUFBZSxPQUFPO0FBQUEsUUFDcEY7QUFBQSxRQUNBLHFCQUFxQixNQUFNLFdBQVcsZ0JBQWdCLGtCQUFrQixXQUFXLGdCQUFnQixPQUFPO0FBQUEsUUFDMUcscUJBQXFCLFdBQVcsZ0JBQWdCO0FBQUEsUUFDaEQsc0JBQXNCLE1BQU07QUFDMUIsZUFBSyxXQUFXLGdCQUFnQixtQkFBbUI7QUFBQSxRQUNyRDtBQUFBLFFBQ0EseUJBQXlCLFdBQVcsZ0JBQWdCO0FBQUE7QUFBQSxJQUN0RDtBQUFBLElBRUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFdBQVU7QUFBQSxRQUNWLE9BQU8sRUFBRSxTQUFTLFdBQVcsYUFBYSxXQUFXLDJCQUEyQixTQUFTLE9BQU87QUFBQSxRQUVoRztBQUFBLHVEQUFDLFNBQUksV0FBVSxzQkFBcUIsU0FBUSxhQUFZLE1BQUssVUFBUyxjQUFZLEtBQUssa0JBQWtCLFNBQVMsR0FDaEgsdURBQUMsWUFBTyxXQUFVLHVCQUFzQixJQUFHLE1BQUssSUFBRyxNQUFLLEdBQUUsS0FBSSxhQUFZLEtBQUksR0FDaEY7QUFBQSxVQUNDLEtBQUssa0JBQWtCLFNBQVM7QUFBQTtBQUFBO0FBQUEsSUFDbkM7QUFBQSxJQUVDLFdBQVcsZUFBZSw2Q0FBQyxTQUFJLFdBQVUsZUFBZSxxQkFBVyxjQUFhLElBQVM7QUFBQSxJQUV6RixDQUFDLFdBQVcsYUFBYSxDQUFDLFdBQVcsNEJBQTRCLENBQUMsV0FBVyxnQkFBZ0IsV0FBVyxTQUN2RztBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsTUFBTTtBQUFBLFVBQ0osY0FBYyxXQUFXO0FBQUEsVUFDekIsV0FBVyxXQUFXO0FBQUEsVUFDdEIscUJBQXFCLFdBQVc7QUFBQSxVQUNoQyxtQkFBbUIsV0FBVztBQUFBLFFBQ2hDO0FBQUEsUUFDQSxlQUFlO0FBQUEsVUFDYix5QkFBeUIsV0FBVztBQUFBLFVBQ3BDLDZCQUE2QixXQUFXO0FBQUEsVUFDeEMsa0JBQWtCLFdBQVc7QUFBQSxRQUMvQjtBQUFBLFFBQ0EsUUFBUSxXQUFXO0FBQUEsUUFDbkIsY0FBYyxXQUFXO0FBQUEsUUFDekIseUJBQXlCLFdBQVc7QUFBQSxRQUNwQywwQkFBMEIsV0FBVztBQUFBLFFBQ3JDLDZCQUE2QixXQUFXO0FBQUEsUUFDeEMsbUJBQW1CLFdBQVc7QUFBQSxRQUM5QiwrQkFBK0IsV0FBVztBQUFBLFFBQzFDLGlCQUFpQixXQUFXO0FBQUEsUUFDNUIsa0JBQWtCLFdBQVc7QUFBQSxRQUM3QixnQkFBZ0IsV0FBVztBQUFBLFFBQzNCLG1CQUFtQixXQUFXO0FBQUEsUUFDOUIsbUJBQW1CLFdBQVc7QUFBQSxRQUM5Qiw4QkFBOEIsV0FBVztBQUFBLFFBQ3pDLDBCQUEwQixXQUFXO0FBQUEsUUFDckMsNEJBQTRCLFdBQVc7QUFBQSxRQUN2QywwQkFBMEIsV0FBVztBQUFBLFFBQ3JDLHdCQUF3QixXQUFXO0FBQUEsUUFDbkMsMkJBQTJCLFdBQVc7QUFBQSxRQUN0QywyQkFBMkIsV0FBVztBQUFBO0FBQUEsSUFDeEMsSUFDRTtBQUFBLElBRUgsQ0FBQyxXQUFXLGdCQUFnQixDQUFDLFdBQVcsYUFBYSxDQUFDLFdBQVcsNEJBQTRCLENBQUMsV0FBVyxlQUN4RztBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsY0FBYyxXQUFXO0FBQUEsUUFDekIsY0FBYyxTQUFTLFdBQVcsUUFBUSxZQUFZO0FBQUEsUUFDdEQsZ0JBQWdCLFdBQVc7QUFBQSxRQUMzQixVQUFVLFdBQVc7QUFBQSxRQUNyQixZQUFZLEtBQUssdUJBQXVCLE9BQU87QUFBQSxRQUMvQyxXQUFXLEtBQUsseUJBQXlCLGtDQUFrQztBQUFBLFFBQzNFLGtCQUFrQixXQUFXO0FBQUEsUUFDN0IsY0FBYyxXQUFXO0FBQUEsUUFDekIsa0JBQWtCLFdBQVc7QUFBQSxRQUM3QixZQUFZLFdBQVc7QUFBQTtBQUFBLElBQ3pCLElBQ0U7QUFBQSxJQUVILFdBQVcsc0JBQ1Y7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLFNBQVMsV0FBVyxhQUFhO0FBQUEsUUFDakMsTUFBTSxXQUFXLFFBQVEsV0FBVztBQUFBLFFBQ3BDLFVBQVUsV0FBVztBQUFBLFFBQ3JCLGVBQWUsV0FBVztBQUFBO0FBQUEsSUFDNUIsSUFDRTtBQUFBLElBRUgsV0FBVyxVQUNWO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxXQUFXLEtBQUssNkJBQTZCLHFCQUFrQjtBQUFBLFFBQy9ELE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLFFBQVEsV0FBVyxzQkFBc0Isb0NBQW9DO0FBQUEsUUFDN0UsZUFBZSxLQUFLLDZCQUE2QixxQkFBa0I7QUFBQSxRQUNuRSxXQUFXLFdBQVc7QUFBQTtBQUFBLElBQ3hCLElBQ0U7QUFBQSxLQUNOO0FBRUo7QUFHQSxJQUFNLHlCQUF5QixNQUFNO0FBQ25DLFNBQ0UsNkNBQUMsZ0NBQXFCLHlCQUF1QixNQUMzQyx1REFBQyxpQ0FBOEIsR0FDakM7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLDBCQUF3QjtBQUN4QixRQUFNLFNBQVMsU0FBUyxlQUFlLDJCQUEyQjtBQUNsRSxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixRQUFRLDZDQUFDLDBCQUF1QixDQUFFO0FBQ3JEO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxpQ0FBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAicmVzcG9uc2UiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiXQp9Cg==
