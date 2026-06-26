import {
  useExpenseSheetsFilterCache
} from "./chunks/chunk-6XWUBHOD.js";
import {
  ExpenseQuickTicketProgressOverlay_default,
  PageBottomActionButton,
  PageBottomActions_default,
  TICKET_IMAGE_ACCEPT_ATTRIBUTE,
  useExpenseSheetQuickTicketFlow
} from "./chunks/chunk-OXZCI7DY.js";
import {
  DEFAULT_EXPENSE_STATUS_FILTER,
  getExpenseStatusLabel
} from "./chunks/chunk-CHKLJEF3.js";
import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-5T5QTSJV.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseCurrencyFlagIcon_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-I2ZO6L4G.js";
import "./chunks/chunk-PELXC75R.js";
import {
  CompactPagination_default,
  FloatingActionButton_default,
  useTimelineCardEffects
} from "./chunks/chunk-2YXSM2RQ.js";
import "./chunks/chunk-YMDESVRK.js";
import {
  SelectCombobox_default,
  useOutsideClick
} from "./chunks/chunk-5FRAKTKT.js";
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
} from "./chunks/chunk-RALX73NO.js";
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
} from "./chunks/chunk-L5GTS5QB.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-MFMV3TBB.js";
import {
  getExpenseScopeToken,
  mapWindowEnumOptions,
  setExpenseActingUserOverride
} from "./chunks/chunk-HGU6IHIX.js";
import "./chunks/chunk-ZBKHPZJX.js";
import "./chunks/chunk-DY2B5JHI.js";
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
var normalizePopoverContent = (content) => {
  if (typeof content !== "string") {
    return content;
  }
  return content.replace(/\\r\\n|\\n|\\r/g, "\n");
};
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
  const normalizedContent = normalizePopoverContent(content);
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
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-[12px] text-slate-700 whitespace-pre-line", children: normalizedContent })
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
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("section", { className: "relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-[var(--radius-xl)]", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
    ownerDisplay ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      ExpenseReadOnlyField_default,
      {
        label: indT("ExpenseSheets_Field_OwnerUser", "Owner user"),
        value: ownerDisplay,
        fullWidth: true
      }
    ) : null,
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
      const projectId = safeText(line.projId);
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
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(PageBottomActions_default, { ariaLabel: indT("ExpenseSheets_BottomActions_Toolbar", "Acciones de estado de la hoja de gasto"), children: actions.map((action) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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

// Web/wwwroot/react/src/pages/gastos/detail/ExpenseSheetDetailIcons.tsx
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
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

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetDetailPageController.tsx
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
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
  const ownerDisplay = (0, import_react5.useMemo)(() => {
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
        icon: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(NewTicketIcon, {}),
        onClick: quickTicketFlow.openSourcePicker
      },
      {
        id: "link-ticket",
        label: indT("ExpenseSheets_Fab_LinkTicket", "Vincular Ticket"),
        icon: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(LinkTicketIcon, {}),
        onClick: handleOpenLinkTicketMode
      },
      {
        id: "new-line",
        label: indT("ExpenseSheets_Fab_NewLine", "Nueva Linea"),
        icon: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(NewLineIcon, {}),
        onClick: handleOpenCreateLineMode
      }
    ],
    [handleOpenCreateLineMode, handleOpenLinkTicketMode, quickTicketFlow.openSourcePicker]
  );
  const showStatusActionBar = !isCreateMode && !isLoading && !isRedirectingAfterCreate && !errorMessage && detailPolicy.statusActions.length > 0;
  const showFab = !isCreateMode && detailPolicy.showFab;
  const hasVisibleStatusComment = safeText(header?.estadoComentarios).trim().length > 0;
  const statusCommentMode = hasVisibleStatusComment ? "read" : "hidden";
  const modalBody = showStatusTransitionCommentField ? /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_StatusComment", "Status comment") }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
var import_jsx_runtime9 = __toESM(require_jsx_runtime());
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
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "space-y-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
      "div",
      {
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700",
        style: { display: controller.isLoading || controller.isRedirectingAfterCreate ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("svg", { className: "ind-spinner size-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ]
      }
    ),
    controller.errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "text-danger", children: controller.errorMessage }) : null,
    !controller.isLoading && !controller.isRedirectingAfterCreate && !controller.errorMessage && controller.header ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
    !controller.isCreateMode && !controller.isLoading && !controller.isRedirectingAfterCreate && !controller.errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
    controller.showStatusActionBar ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      ExpenseSheetStatusActionBar_default,
      {
        actions: controller.detailPolicy.statusActions,
        busy: controller.busy || controller.isRedirectingAfterCreate,
        disabled: controller.areStatusActionsDisabled,
        onActionClick: controller.handleStatusActionClick
      }
    ) : null,
    controller.showFab ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(VisitasPageProviders_default, { enableExpenseManagement: true, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ExpenseSheetDetailPageContent, {}) });
};
var mount = () => {
  bootstrapExpenseApiAuth();
  bootstrapExpenseLinkActingUser();
  const rootEl = document.getElementById("expense-sheet-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ExpenseSheetDetailPage, {}));
};
mountWhenDocumentReady(mount);
var ExpenseSheetDetailPage_default = ExpenseSheetDetailPage;
export {
  ExpenseSheetDetailPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvRXhwZW5zZVNoZWV0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvbi50c3giLCAiLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9JbmZvUG9wb3Zlckljb25CdXR0b24udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29uc3RhbnRzL2V4Y2hhbmdlUmF0ZUVudHJ5TW9kZUNhdGFsb2cudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VTaGVldEhlYWRlckZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlTGluZXNUaW1lbGluZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC9FeHBlbnNlU2hlZXREZXRhaWxPdmVybGF5cy50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRyb2xsZXIudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvRXhwZW5zZVNoZWV0RGV0YWlsSWNvbnMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBWaXNpdGFzUGFnZVByb3ZpZGVycyBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1Zpc2l0YXNQYWdlUHJvdmlkZXJzLnRzeFwiO1xyXG5pbXBvcnQgRmxvYXRpbmdBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcclxuaW1wb3J0IHsgdXNlQXV0aENvbnRleHQgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VTaGVldEhlYWRlckZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0SGVhZGVyRm9ybS50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VMaW5lc1RpbWVsaW5lIGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VMaW5lc1RpbWVsaW5lLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyIGZyb20gXCIuL0V4cGVuc2VTaGVldFN0YXR1c0FjdGlvbkJhci50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzIGZyb20gXCIuL0V4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzLnRzeFwiO1xyXG5pbXBvcnQgeyBib290c3RyYXBFeHBlbnNlQXBpQXV0aCwgdXNlRXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRyb2xsZXIgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udHJvbGxlci50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XHJcbmltcG9ydCB7IERFRkFVTFRfRVhQRU5TRV9TVEFUVVNfRklMVEVSIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlU3RhdHVzQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCwgc3RhcnRPZkRheSwgdG9Jc29EYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBjb25zdW1lRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZSB9IGZyb20gXCIuLi9saXN0L3VzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZS50c1wiO1xuaW1wb3J0IHsgc2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQWN0aW5nVXNlci50c1wiO1xuXHJcbmNvbnN0IERFVEFJTF9GQUJfQk9UVE9NX1dJVEhfQUNUSU9OX0JBUiA9IDE3NjtcclxuY29uc3QgRVhQRU5TRV9TSEVFVFNfTElTVF9VUkwgPSBcIi9HYXN0b3MvRXhwZW5zZVNoZWV0c1wiO1xuXG4vLyBBcHBsaWVzIHRoZSBzZXJ2ZXItcmVzb2x2ZWQgYWN0aW5nIHVzZXIgZm9yIGVtYWlsIGRlZXAgbGlua3MgYmVmb3JlIGRldGFpbCBBUEkgY2FsbHMgcnVuLlxuY29uc3QgYm9vdHN0cmFwRXhwZW5zZUxpbmtBY3RpbmdVc2VyID0gKCkgPT4ge1xuICBjb25zdCBhY3RpbmdVc2VySWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX0FDVElOR19VU0VSX0lEX18pO1xuICBpZiAoIWFjdGluZ1VzZXJJZCkgcmV0dXJuO1xuICBzZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKGFjdGluZ1VzZXJJZCk7XG59O1xuXHJcbmNvbnN0IEV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250ZW50ID0gKCkgPT4ge1xyXG4gIGNvbnN0IGNvbnRyb2xsZXIgPSB1c2VFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udHJvbGxlcigpO1xyXG4gIGNvbnN0IHsgY3VycmVudEF4VXNlcklkIH0gPSB1c2VBdXRoQ29udGV4dCgpO1xyXG4gIGNvbnN0IHsgcmVhZENhY2hlZFN0YXRlLCBzYXZlQ2FjaGVkU3RhdGUgfSA9IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZSgpO1xyXG4gIGNvbnN0IGNyZWF0ZWRTaGVldFJldHVybklkUmVmID0gUmVhY3QudXNlUmVmKFwiXCIpO1xyXG5cclxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgY3JlYXRlZENvbnRleHQgPSBjb25zdW1lRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQoY29udHJvbGxlci5zaGVldElkKTtcclxuICAgIGNyZWF0ZWRTaGVldFJldHVybklkUmVmLmN1cnJlbnQgPSBjcmVhdGVkQ29udGV4dD8uc2hlZXRJZCB8fCBcIlwiO1xyXG4gIH0sIFtjb250cm9sbGVyLnNoZWV0SWRdKTtcclxuXHJcbiAgY29uc3QgcHJlcGFyZUNyZWF0ZWRTaGVldFJldHVyblN0YXRlID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgY3JlYXRlZFNoZWV0SWQgPSBzYWZlVGV4dChjcmVhdGVkU2hlZXRSZXR1cm5JZFJlZi5jdXJyZW50KTtcclxuICAgIGlmICghY3JlYXRlZFNoZWV0SWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBjb25zdCB0b2RheSA9IHN0YXJ0T2ZEYXkobmV3IERhdGUoKSk7XHJcbiAgICBjb25zdCBmcm9tRGF0ZSA9IG5ldyBEYXRlKHRvZGF5KTtcclxuICAgIGZyb21EYXRlLnNldERhdGUodG9kYXkuZ2V0RGF0ZSgpIC0gODkpO1xyXG5cclxuICAgIHNhdmVDYWNoZWRTdGF0ZSh7XHJcbiAgICAgIGZpbHRlcnM6IHtcclxuICAgICAgICBmcm9tRGF0ZTogdG9Jc29EYXRlKGZyb21EYXRlKSxcclxuICAgICAgICB0b0RhdGU6IHRvSXNvRGF0ZSh0b2RheSksXHJcbiAgICAgICAgcHJvamVjdElkOiBcIlwiLFxyXG4gICAgICAgIGhvamFHYXN0b3NJZDogY3JlYXRlZFNoZWV0SWQsXHJcbiAgICAgICAgY3VycmVuY3lDb2RlOiBcIlwiLFxyXG4gICAgICAgIG1hbmFnZWRVc2VySWQ6IHNhZmVUZXh0KGN1cnJlbnRBeFVzZXJJZCksXHJcbiAgICAgICAgaW5jbHVkZVN1Ym9yZGluYXRlczogZmFsc2UsXHJcbiAgICAgICAgc3RhdHVzRmlsdGVyOiBERUZBVUxUX0VYUEVOU0VfU1RBVFVTX0ZJTFRFUixcclxuICAgICAgICBleGNoYW5nZVJhdGVNb2RlOiBudWxsLFxyXG4gICAgICAgIGZpbHRlcjogY3JlYXRlZFNoZWV0SWQsXHJcbiAgICAgIH0sXHJcbiAgICAgIHBhZ2U6IDEsXHJcbiAgICAgIHNjcm9sbFk6IDAsXHJcbiAgICAgIGl0ZW1zOiBbXSxcclxuICAgICAgdG90YWw6IDAsXHJcbiAgICB9KTtcclxuXHJcbiAgICBjcmVhdGVkU2hlZXRSZXR1cm5JZFJlZi5jdXJyZW50ID0gXCJcIjtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0sIFtjdXJyZW50QXhVc2VySWQsIHNhdmVDYWNoZWRTdGF0ZV0pO1xyXG5cclxuICBjb25zdCByZWFybUV4cGVuc2VTaGVldHNSZXR1cm5TdGF0ZSA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChwcmVwYXJlQ3JlYXRlZFNoZWV0UmV0dXJuU3RhdGUoKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2FjaGVkU3RhdGUgPSByZWFkQ2FjaGVkU3RhdGUoKTtcclxuICAgIGlmICghY2FjaGVkU3RhdGUpIHJldHVybjtcclxuICAgIHNhdmVDYWNoZWRTdGF0ZShjYWNoZWRTdGF0ZSk7XHJcbiAgfSwgW3ByZXBhcmVDcmVhdGVkU2hlZXRSZXR1cm5TdGF0ZSwgcmVhZENhY2hlZFN0YXRlLCBzYXZlQ2FjaGVkU3RhdGVdKTtcclxuXHJcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGJhY2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsb2JhbEJhY2tCdG5cIik7XHJcbiAgICBpZiAoIWJhY2tCdXR0b24pIHJldHVybjtcclxuXHJcbiAgICBiYWNrQnV0dG9uLnNldEF0dHJpYnV0ZShcImRhdGEtYmFjay11cmxcIiwgRVhQRU5TRV9TSEVFVFNfTElTVF9VUkwpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGJhY2tCdXR0b24ucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1iYWNrLXVybFwiKTtcclxuICAgIH07XHJcbiAgfSwgW10pO1xyXG5cclxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgYmFja0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xvYmFsQmFja0J0blwiKTtcclxuICAgIGlmICghYmFja0J1dHRvbikgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZVRvcGJhckJhY2tDbGljayA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgY29uc3QgZXhlY3V0ZUJhY2tOYXZpZ2F0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgIHJlYXJtRXhwZW5zZVNoZWV0c1JldHVyblN0YXRlKCk7XHJcbiAgICAgICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBFWFBFTlNFX1NIRUVUU19MSVNUX1VSTDtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIHdpbmRvdy5fX2luZFJlcXVlc3ROYXZpZ2F0aW9uKGV4ZWN1dGVCYWNrTmF2aWdhdGlvbik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBleGVjdXRlQmFja05hdmlnYXRpb24oKTtcclxuICAgIH07XHJcblxyXG4gICAgYmFja0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlVG9wYmFyQmFja0NsaWNrLCB0cnVlKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGJhY2tCdXR0b24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVRvcGJhckJhY2tDbGljaywgdHJ1ZSk7XHJcbiAgICB9O1xyXG4gIH0sIFtyZWFybUV4cGVuc2VTaGVldHNSZXR1cm5TdGF0ZV0pO1xyXG5cclxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgaGFuZGxlTmF0aXZlQmFjayA9IChldmVudCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQ/LnN0YXRlICYmIGV2ZW50LnN0YXRlLmluZFRyYXAgPT09IHRydWUpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGV4ZWN1dGVCYWNrTmF2aWdhdGlvbiA9ICgpID0+IHtcclxuICAgICAgICByZWFybUV4cGVuc2VTaGVldHNSZXR1cm5TdGF0ZSgpO1xyXG4gICAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKEVYUEVOU0VfU0hFRVRTX0xJU1RfVVJMKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIHdpbmRvdy5fX2luZFJlcXVlc3ROYXZpZ2F0aW9uKGV4ZWN1dGVCYWNrTmF2aWdhdGlvbik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBleGVjdXRlQmFja05hdmlnYXRpb24oKTtcclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBoYW5kbGVOYXRpdmVCYWNrKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgaGFuZGxlTmF0aXZlQmFjayk7XHJcbiAgICB9O1xyXG4gIH0sIFtyZWFybUV4cGVuc2VTaGVldHNSZXR1cm5TdGF0ZV0pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cclxuICAgICAgPEV4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzXHJcbiAgICAgICAgbW9kYWw9e2NvbnRyb2xsZXIubW9kYWx9XHJcbiAgICAgICAgbW9kYWxFcnJvcj17Y29udHJvbGxlci5tb2RhbEVycm9yfVxyXG4gICAgICAgIHN0YXR1cz17Y29udHJvbGxlci5zdGF0dXN9XHJcbiAgICAgICAgYnVzeT17Y29udHJvbGxlci5idXN5fVxyXG4gICAgICAgIGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZT17Y29udHJvbGxlci5pc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGV9XHJcbiAgICAgICAgbW9kYWxMb2FkaW5nVGV4dD17Y29udHJvbGxlci5tb2RhbExvYWRpbmdUZXh0fVxyXG4gICAgICAgIG1vZGFsQ2FuY2VsVGV4dD17Y29udHJvbGxlci5tb2RhbENhbmNlbFRleHR9XHJcbiAgICAgICAgbW9kYWxDb25maXJtVGV4dD17Y29udHJvbGxlci5tb2RhbENvbmZpcm1UZXh0fVxyXG4gICAgICAgIG1vZGFsQm9keT17Y29udHJvbGxlci5tb2RhbEJvZHl9XHJcbiAgICAgICAgY2FtZXJhSW5wdXRSZWY9e2NvbnRyb2xsZXIuY2FtZXJhSW5wdXRSZWZ9XHJcbiAgICAgICAgZ2FsbGVyeUlucHV0UmVmPXtjb250cm9sbGVyLmdhbGxlcnlJbnB1dFJlZn1cclxuICAgICAgICBzb3VyY2VQaWNrZXJPcGVuPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5zb3VyY2VQaWNrZXJPcGVufVxyXG4gICAgICAgIHF1aWNrVGlja2V0QnVzeT17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuYnVzeX1cclxuICAgICAgICBxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZT17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cucHJvZ3Jlc3NNZXNzYWdlfVxyXG4gICAgICAgIHF1aWNrVGlja2V0UHJvZ3Jlc3NTdGFnZXM9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnByb2dyZXNzU3RhZ2VzfVxyXG4gICAgICAgIHF1aWNrVGlja2V0RWxhcHNlZE1zPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5wcm9ncmVzc0VsYXBzZWRNc31cclxuICAgICAgICBxdWlja1RpY2tldEVycm9yTWVzc2FnZT17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuZXJyb3JNZXNzYWdlfVxyXG4gICAgICAgIHF1aWNrVGlja2V0QXR0ZW1wdElkPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5hdHRlbXB0SWR9XHJcbiAgICAgICAgcXVpY2tUaWNrZXRUcmFjZUxpc3Q9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LnRyYWNlTGlzdH1cclxuICAgICAgICBoYXNQZW5kaW5nVXBsb2FkUmV0cnk9e2NvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93Lmhhc1BlbmRpbmdVcGxvYWRSZXRyeX1cclxuICAgICAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZT17Y29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuaGFzUGFydGlhbFRpY2tldEZhaWx1cmV9XHJcbiAgICAgICAgb25Db25maXJtPXtjb250cm9sbGVyLmhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17Y29udHJvbGxlci5jbG9zZUNvbmZpcm19XHJcbiAgICAgICAgb25TZWxlY3RlZENhbWVyYUZpbGU9eyhmaWxlKSA9PiB7XHJcbiAgICAgICAgICB2b2lkIGNvbnRyb2xsZXIucXVpY2tUaWNrZXRGbG93LmhhbmRsZVNlbGVjdGVkRmlsZShmaWxlLCBcImNhbWVyYVwiKTtcclxuICAgICAgICB9fVxyXG4gICAgICAgIG9uU2VsZWN0ZWRHYWxsZXJ5RmlsZT17KGZpbGUpID0+IHtcclxuICAgICAgICAgIHZvaWQgY29udHJvbGxlci5xdWlja1RpY2tldEZsb3cuaGFuZGxlU2VsZWN0ZWRGaWxlKGZpbGUsIFwiZ2FsbGVyeVwiKTtcclxuICAgICAgICB9fVxyXG4gICAgICAgIG9uU2VsZWN0RnJvbUNhbWVyYT17KCkgPT4ge1xyXG4gICAgICAgICAgdm9pZCBjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5zZWxlY3RGcm9tQ2FtZXJhKGNvbnRyb2xsZXIuY2FtZXJhSW5wdXRSZWYuY3VycmVudCk7XHJcbiAgICAgICAgfX1cclxuICAgICAgICBvblNlbGVjdEZyb21HYWxsZXJ5PXsoKSA9PiBjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5zZWxlY3RGcm9tR2FsbGVyeShjb250cm9sbGVyLmdhbGxlcnlJbnB1dFJlZi5jdXJyZW50KX1cclxuICAgICAgICBvbkNsb3NlU291cmNlUGlja2VyPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5jbG9zZVNvdXJjZVBpY2tlcn1cclxuICAgICAgICBvblJldHJ5UGVuZGluZ1VwbG9hZD17KCkgPT4ge1xuICAgICAgICAgIHZvaWQgY29udHJvbGxlci5xdWlja1RpY2tldEZsb3cucmV0cnlQZW5kaW5nVXBsb2FkKCk7XG4gICAgICAgIH19XG4gICAgICAgIG9uQ2xlYXJRdWlja1RpY2tldEVycm9yPXtjb250cm9sbGVyLnF1aWNrVGlja2V0Rmxvdy5jbGVhckVycm9yfVxuICAgICAgLz5cblxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPVwibG9hZGVyLWJveCBnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCJcclxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBjb250cm9sbGVyLmlzTG9hZGluZyB8fCBjb250cm9sbGVyLmlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgc2l6ZS01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cbiAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cclxuICAgICAgPC9kaXY+XHJcblxyXG4gICAgICB7Y29udHJvbGxlci5lcnJvck1lc3NhZ2UgPyA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2NvbnRyb2xsZXIuZXJyb3JNZXNzYWdlfTwvZGl2PiA6IG51bGx9XHJcblxyXG4gICAgICB7IWNvbnRyb2xsZXIuaXNMb2FkaW5nICYmICFjb250cm9sbGVyLmlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSAmJiAhY29udHJvbGxlci5lcnJvck1lc3NhZ2UgJiYgY29udHJvbGxlci5oZWFkZXIgPyAoXG4gICAgICAgIDxFeHBlbnNlU2hlZXRIZWFkZXJGb3JtXG4gICAgICAgICAgbW9kZT17e1xuICAgICAgICAgICAgaXNDcmVhdGVNb2RlOiBjb250cm9sbGVyLmlzQ3JlYXRlTW9kZSxcbiAgICAgICAgICAgIGlzRWRpdGluZzogY29udHJvbGxlci5pc0VkaXRpbmcsXG4gICAgICAgICAgICBjYW5FZGl0SGVhZGVyRmllbGRzOiBjb250cm9sbGVyLmNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50LFxuICAgICAgICAgICAgc3RhdHVzQ29tbWVudE1vZGU6IGNvbnRyb2xsZXIuc3RhdHVzQ29tbWVudE1vZGUsXG4gICAgICAgICAgfX1cbiAgICAgICAgICBjdXJyZW5jeUxvY2tzPXt7XG4gICAgICAgICAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogY29udHJvbGxlci5pc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcbiAgICAgICAgICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lczogY29udHJvbGxlci5pc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXG4gICAgICAgICAgICBzaG93RXhjaGFuZ2VSYXRlOiBjb250cm9sbGVyLnNob3dFeGNoYW5nZVJhdGUsXG4gICAgICAgICAgfX1cbiAgICAgICAgICBoZWFkZXI9e2NvbnRyb2xsZXIuaGVhZGVyfVxuICAgICAgICAgIG93bmVyRGlzcGxheT17Y29udHJvbGxlci5vd25lckRpc3BsYXl9XG4gICAgICAgICAgcHJvamVjdFZhbHVlPXtjb250cm9sbGVyLnByb2plY3RWYWx1ZX1cbiAgICAgICAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeT17Y29udHJvbGxlci5ub3JtYWxpemVkRHJhZnRDdXJyZW5jeX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k9e2NvbnRyb2xsZXIuZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5fVxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudD17Y29udHJvbGxlci5leGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnR9XG4gICAgICAgICAgZXhjaGFuZ2VSYXRlVmFsdWU9e2NvbnRyb2xsZXIuZXhjaGFuZ2VSYXRlVmFsdWV9XG4gICAgICAgICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2U9e2NvbnRyb2xsZXIuZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2V9XHJcbiAgICAgICAgICB0b3RhbEFtb3VudFRleHQ9e2NvbnRyb2xsZXIudG90YWxBbW91bnRUZXh0fVxyXG4gICAgICAgICAgZHJhZnREZXNjcmlwdGlvbj17Y29udHJvbGxlci5kcmFmdERlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgZHJhZnRQcm9qZWN0SWQ9e2NvbnRyb2xsZXIuZHJhZnRQcm9qZWN0SWR9XHJcbiAgICAgICAgICBkcmFmdEN1cnJlbmN5Q29kZT17Y29udHJvbGxlci5kcmFmdEN1cnJlbmN5Q29kZX1cclxuICAgICAgICAgIGRyYWZ0RXhjaGFuZ2VSYXRlPXtjb250cm9sbGVyLmRyYWZ0RXhjaGFuZ2VSYXRlfVxyXG4gICAgICAgICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZT17Y29udHJvbGxlci5vZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlfVxyXG4gICAgICAgICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlPXtjb250cm9sbGVyLm9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZX1cclxuICAgICAgICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlPXtjb250cm9sbGVyLm9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlfVxyXG4gICAgICAgICAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlPXtjb250cm9sbGVyLnNldERyYWZ0RGVzY3JpcHRpb259XHJcbiAgICAgICAgICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlPXtjb250cm9sbGVyLnNldERyYWZ0UHJvamVjdElkfVxyXG4gICAgICAgICAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZT17Y29udHJvbGxlci5zZXREcmFmdEN1cnJlbmN5Q29kZX1cclxuICAgICAgICAgIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2U9e2NvbnRyb2xsZXIuc2V0RHJhZnRFeGNoYW5nZVJhdGV9XHJcbiAgICAgICAgLz5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICB7IWNvbnRyb2xsZXIuaXNDcmVhdGVNb2RlICYmICFjb250cm9sbGVyLmlzTG9hZGluZyAmJiAhY29udHJvbGxlci5pc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUgJiYgIWNvbnRyb2xsZXIuZXJyb3JNZXNzYWdlID8gKFxyXG4gICAgICAgIDxFeHBlbnNlTGluZXNUaW1lbGluZVxyXG4gICAgICAgICAgdmlzaWJsZUxpbmVzPXtjb250cm9sbGVyLnZpc2libGVMaW5lc31cclxuICAgICAgICAgIGN1cnJlbmN5Q29kZT17c2FmZVRleHQoY29udHJvbGxlci5oZWFkZXI/LmN1cnJlbmN5Q29kZSl9XHJcbiAgICAgICAgICB0b3RhbExpbmVQYWdlcz17Y29udHJvbGxlci50b3RhbExpbmVQYWdlc31cclxuICAgICAgICAgIGxpbmVQYWdlPXtjb250cm9sbGVyLmxpbmVQYWdlfVxyXG4gICAgICAgICAgbGluZXNMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfTGluZXNcIiwgXCJMaW5lc1wiKX1cclxuICAgICAgICAgIGVtcHR5VGV4dD17aW5kVChcIkV4cGVuc2VTaGVldHNfTm9MaW5lc1wiLCBcIk5vIGxpbmVzIGZvciB0aGlzIGV4cGVuc2Ugc2hlZXQuXCIpfVxyXG4gICAgICAgICAgcGFnaW5hdGlvbkxhYmVscz17Y29udHJvbGxlci5wYWdpbmF0aW9uTGFiZWxzfVxyXG4gICAgICAgICAgY29udGFpbmVyUmVmPXtjb250cm9sbGVyLmxpbmVDb250YWluZXJSZWZ9XHJcbiAgICAgICAgICBvbkxpbmVQYWdlQ2hhbmdlPXtjb250cm9sbGVyLnNldExpbmVQYWdlfVxyXG4gICAgICAgICAgb25PcGVuTGluZT17Y29udHJvbGxlci5uYXZpZ2F0ZVRvTGluZURldGFpbH1cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIHtjb250cm9sbGVyLnNob3dTdGF0dXNBY3Rpb25CYXIgPyAoXHJcbiAgICAgICAgPEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbkJhclxyXG4gICAgICAgICAgYWN0aW9ucz17Y29udHJvbGxlci5kZXRhaWxQb2xpY3kuc3RhdHVzQWN0aW9uc31cclxuICAgICAgICAgIGJ1c3k9e2NvbnRyb2xsZXIuYnVzeSB8fCBjb250cm9sbGVyLmlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZX1cclxuICAgICAgICAgIGRpc2FibGVkPXtjb250cm9sbGVyLmFyZVN0YXR1c0FjdGlvbnNEaXNhYmxlZH1cclxuICAgICAgICAgIG9uQWN0aW9uQ2xpY2s9e2NvbnRyb2xsZXIuaGFuZGxlU3RhdHVzQWN0aW9uQ2xpY2t9XHJcbiAgICAgICAgLz5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICB7Y29udHJvbGxlci5zaG93RmFiID8gKFxyXG4gICAgICAgIDxGbG9hdGluZ0FjdGlvbkJ1dHRvblxyXG4gICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfQWN0aW9uc1wiLCBcIkFjY2lvbmVzIHJcdTAwRTFwaWRhc1wiKX1cclxuICAgICAgICAgIHNpemU9ezc2fVxyXG4gICAgICAgICAgcmlnaHQ9ezE2fVxyXG4gICAgICAgICAgYm90dG9tPXtjb250cm9sbGVyLnNob3dTdGF0dXNBY3Rpb25CYXIgPyBERVRBSUxfRkFCX0JPVFRPTV9XSVRIX0FDVElPTl9CQVIgOiAyNH1cclxuICAgICAgICAgIG1lbnVBcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgclx1MDBFMXBpZGFzXCIpfVxyXG4gICAgICAgICAgbWVudUl0ZW1zPXtjb250cm9sbGVyLmZhYk1lbnVJdGVtc31cclxuICAgICAgICAvPlxyXG4gICAgICApIDogbnVsbH1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBNYWluIHBhZ2UgZW50cnkgZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlxyXG5jb25zdCBFeHBlbnNlU2hlZXREZXRhaWxQYWdlID0gKCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8VmlzaXRhc1BhZ2VQcm92aWRlcnMgZW5hYmxlRXhwZW5zZU1hbmFnZW1lbnQ+XHJcbiAgICAgIDxFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udGVudCAvPlxyXG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cclxuICApO1xyXG59O1xyXG5cclxuY29uc3QgbW91bnQgPSAoKSA9PiB7XG4gIGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoKCk7XG4gIGJvb3RzdHJhcEV4cGVuc2VMaW5rQWN0aW5nVXNlcigpO1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cGVuc2Utc2hlZXQtZGV0YWlsLXJvb3RcIik7XG4gIGlmICghcm9vdEVsKSByZXR1cm47XG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVNoZWV0RGV0YWlsUGFnZSAvPik7XG59O1xyXG5cclxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXREZXRhaWxQYWdlO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IEluZm9Qb3BvdmVySWNvbkJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0luZm9Qb3BvdmVySWNvbkJ1dHRvbi50c3hcIjtcclxuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QgZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0LnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uIGZyb20gXCIuL0V4cGVuc2VDdXJyZW5jeUZsYWdJY29uLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VSZWFkT25seUZpZWxkIGZyb20gXCIuL0V4cGVuc2VSZWFkT25seUZpZWxkLnRzeFwiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kgfSBmcm9tIFwiLi4vZXhwZW5zZUZvcm1hdHRlcnMudHNcIjtcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlciB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XG5cclxudHlwZSBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeUludGVyYWN0aW9uID0ge1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGJvb2xlYW47XG59O1xuXG50eXBlIEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U3RhdGUgPSB7XG4gIGlzRm9yZWlnbkN1cnJlbmN5OiBib29sZWFuO1xuICBzaG93RXhjaGFuZ2VSYXRlOiBib29sZWFuO1xuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogYm9vbGVhbjtcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xufTtcblxudHlwZSBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb25Qcm9wcyA9IHtcbiAgaW50ZXJhY3Rpb246IEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5SW50ZXJhY3Rpb247XG4gIGN1cnJlbmN5U3RhdGU6IEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U3RhdGU7XG4gIGV4cGVuc2VDdXJyZW5jeUxhYmVsOiBzdHJpbmc7XG4gIGhlYWRlckN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBiYXNlQ3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRFeGNoYW5nZVJhdGU6IHN0cmluZztcbiAgZXhjaGFuZ2VSYXRlVmFsdWU6IHN0cmluZztcbiAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2U6IHN0cmluZztcbiAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50OiBudW1iZXI7XG4gIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlOiBzdHJpbmc7XG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbn07XG5cbi8vIE93bnMgdGhlIGN1cnJlbmN5IGFuZCBleGNoYW5nZS1yYXRlIFVJIHNvIHRoZSBoZWFkZXIgZm9ybSBzdGF5cyBjb21wYWN0LlxuY29uc3QgRXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lTZWN0aW9uID0gKHtcbiAgaW50ZXJhY3Rpb24sXG4gIGN1cnJlbmN5U3RhdGUsXG4gIGV4cGVuc2VDdXJyZW5jeUxhYmVsLFxuICBoZWFkZXJDdXJyZW5jeUNvZGUsXG4gIGJhc2VDdXJyZW5jeUNvZGUsXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlLFxuICBleGNoYW5nZVJhdGVWYWx1ZSxcbiAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXG4gIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudCxcbiAgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UsXG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2UsXG4gIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2UsXG59OiBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb25Qcm9wcykgPT4ge1xuICBjb25zdCB7IGlzRWRpdGluZywgY2FuRWRpdEhlYWRlckZpZWxkcyB9ID0gaW50ZXJhY3Rpb247XG4gIGNvbnN0IHsgaXNGb3JlaWduQ3VycmVuY3ksIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLCBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsIHNob3dFeGNoYW5nZVJhdGUgfSA9IGN1cnJlbmN5U3RhdGU7XG4gIGNvbnN0IGxvY2FsQ3VycmVuY3lPcHRpb25zID0gUmVhY3QudXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KFxyXG4gICAgKCkgPT4gW1xyXG4gICAgICB7XHJcbiAgICAgICAgdmFsdWU6IGJhc2VDdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgdGV4dDogYmFzZUN1cnJlbmN5Q29kZSxcclxuICAgICAgICBpY29uOiA8RXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gY3VycmVuY3lDb2RlPXtiYXNlQ3VycmVuY3lDb2RlfSBzaXplQ2xhc3NOYW1lPVwiaC02IHctNlwiIC8+LFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICAgIFtiYXNlQ3VycmVuY3lDb2RlXVxyXG4gICk7XHJcbiAgY29uc3QgaGVhZGVyQ3VycmVuY3lPcHRpb25zID0gUmVhY3QudXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KFxyXG4gICAgKCkgPT4gW1xyXG4gICAgICB7XHJcbiAgICAgICAgdmFsdWU6IGhlYWRlckN1cnJlbmN5Q29kZSB8fCBcIi1cIixcclxuICAgICAgICB0ZXh0OiBoZWFkZXJDdXJyZW5jeUNvZGUgfHwgXCItXCIsXHJcbiAgICAgICAgaWNvbjogPEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uIGN1cnJlbmN5Q29kZT17aGVhZGVyQ3VycmVuY3lDb2RlIHx8IFwiLVwifSBzaXplQ2xhc3NOYW1lPVwiaC02IHctNlwiIC8+LFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICAgIFtoZWFkZXJDdXJyZW5jeUNvZGVdXHJcbiAgKTtcclxuXHJcbiAgaWYgKGlzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNtOmNvbC1zcGFuLTIgc3BhY2UteS0zXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BncmlkIGdhcC00ICR7aXNGb3JlaWduQ3VycmVuY3kgPyBcImdyaWQtY29scy0yXCIgOiBcImdyaWQtY29scy0xXCJ9YC50cmltKCl9PlxyXG4gICAgICAgICAge2lzRm9yZWlnbkN1cnJlbmN5ID8gKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57ZXhwZW5zZUN1cnJlbmN5TGFiZWx9PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDxFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RcclxuICAgICAgICAgICAgICAgICAgbGFiZWw9e2V4cGVuc2VDdXJyZW5jeUxhYmVsfVxyXG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5X1BsYWNlaG9sZGVyXCIsIFwiQ3VycmVuY3kgY29kZVwiKX1cclxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0Q3VycmVuY3lDb2RlfVxyXG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZX1cclxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmcgfHwgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXN9XHJcbiAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nIHx8IGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzfVxyXG4gICAgICAgICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxyXG4gICAgICAgICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLWhlYWRlci1jdXJyZW5jeVwiXHJcbiAgICAgICAgICAgICAgICAgIHByZWZlckRlZmF1bHRDdXJyZW5jeUZyb21Db250ZXh0XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgc3BhY2UteS0xLjVcIj5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIHByLTggZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9FeGNoYW5nZVJhdGVcIiwgXCJFeGNoYW5nZSByYXRlXCIpfTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICA8SW5mb1BvcG92ZXJJY29uQnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIGFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX0luZm9Qb3BvdmVyX0FyaWFcIiwgXCJTaG93IGV4Y2hhbmdlIHJhdGUgaW5mb3JtYXRpb25cIil9XHJcbiAgICAgICAgICAgICAgICAgIGNvbnRlbnQ9e2V4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlfVxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSByaWdodC0wIC10b3AtMSB6LTIwXCJcclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb3JtLWNvbnRyb2wgJHtleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSA/IFwiYm9yZGVyLWRhbmdlciByaW5nLTEgcmluZy1kYW5nZXJcIiA6IFwiXCJ9ICR7aXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwiXCJ9YH1cclxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRNb2RlPVwiZGVjaW1hbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0RXhjaGFuZ2VSYXRlfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQmx1cj17KGV2ZW50KSA9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKGV2ZW50LnRhcmdldC52YWx1ZSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogNyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsbGJhY2s6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0V4Y2hhbmdlUmF0ZVwiLCBcIkV4Y2hhbmdlIHJhdGVcIil9XHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0V4Y2hhbmdlUmF0ZVwiLCBcIkV4Y2hhbmdlIHJhdGVcIil9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9e2lzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lc31cclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzfVxyXG4gICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdFxyXG4gICAgICAgICAgICAgIGxhYmVsPXtleHBlbnNlQ3VycmVuY3lMYWJlbH1cclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5X1BsYWNlaG9sZGVyXCIsIFwiQ3VycmVuY3kgY29kZVwiKX1cclxuICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRDdXJyZW5jeUNvZGV9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmcgfHwgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXN9XHJcbiAgICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmcgfHwgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXN9XHJcbiAgICAgICAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS1oZWFkZXItY3VycmVuY3lcIlxyXG4gICAgICAgICAgICAgIHByZWZlckRlZmF1bHRDdXJyZW5jeUZyb21Db250ZXh0XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICB7aXNGb3JlaWduQ3VycmVuY3kgPyAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTRcIj5cclxuICAgICAgICAgICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0xvY2FsQ3VycmVuY3lcIiwgXCJMb2NhbCBjdXJyZW5jeVwiKX1cclxuICAgICAgICAgICAgICBvcHRpb25zPXtsb2NhbEN1cnJlbmN5T3B0aW9uc31cclxuICAgICAgICAgICAgICB2YWx1ZT17YmFzZUN1cnJlbmN5Q29kZX1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KCkgPT4gdW5kZWZpbmVkfVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lfUGxhY2Vob2xkZXJcIiwgXCJDdXJyZW5jeSBjb2RlXCIpfVxyXG4gICAgICAgICAgICAgIHJlYWRPbmx5XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWRcclxuICAgICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XHJcbiAgICAgICAgICAgICAgc2hvd0xhYmVsXHJcbiAgICAgICAgICAgICAgdXNlUG9ydGFsPXtmYWxzZX1cclxuICAgICAgICAgICAgICBzZWxlY3RlZFRleHRNb2RlPVwidmFsdWVcIlxyXG4gICAgICAgICAgICAgIGRyb3Bkb3duTWF4SGVpZ2h0Q2xhc3M9XCJtYXgtaC05NlwiXHJcbiAgICAgICAgICAgICAgc2VsZWN0ZWRJY29uQ2xhc3NOYW1lPVwiaC02IHctNlwiXHJcbiAgICAgICAgICAgICAgb3B0aW9uSWNvbkNsYXNzTmFtZT1cImgtNiB3LTZcIlxyXG4gICAgICAgICAgICAgIHNlbGVjdGVkSW5wdXRQYWRkaW5nQ2xhc3NOYW1lPVwicGwtMTJcIlxyXG4gICAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtaGVhZGVyLWxvY2FsLWN1cnJlbmN5XCJcclxuICAgICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgICAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxyXG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQW1vdW50XCIsIFwiQW1vdW50XCIpfTwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCBpbmQtcmVhZG9ubHktZmllbGRcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3koZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LCBiYXNlQ3VycmVuY3lDb2RlKX1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9BbW91bnRcIiwgXCJBbW91bnRcIil9XG4gICAgICAgICAgICAgICAgcmVhZE9ubHlcbiAgICAgICAgICAgICAgICBkaXNhYmxlZFxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICB7aXNGb3JlaWduQ3VycmVuY3kgJiYgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlciB0ZXh0LXNtXCI+e2V4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlfTwvcD4gOiBudWxsfVxyXG4gICAgICA8L2Rpdj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XHJcbiAgICAgICAgb3B0aW9ucz17aGVhZGVyQ3VycmVuY3lPcHRpb25zfVxyXG4gICAgICAgIHZhbHVlPXtoZWFkZXJDdXJyZW5jeUNvZGUgfHwgXCItXCJ9XHJcbiAgICAgICAgb25DaGFuZ2U9eygpID0+IHVuZGVmaW5lZH1cclxuICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5X1BsYWNlaG9sZGVyXCIsIFwiQ3VycmVuY3kgY29kZVwiKX1cclxuICAgICAgICByZWFkT25seVxyXG4gICAgICAgIGRpc2FibGVkXHJcbiAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxyXG4gICAgICAgIHNob3dTZWFyY2hCdXR0b249e2ZhbHNlfVxyXG4gICAgICAgIHNob3dMYWJlbFxyXG4gICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XHJcbiAgICAgICAgc2VsZWN0ZWRUZXh0TW9kZT1cInZhbHVlXCJcclxuICAgICAgICBkcm9wZG93bk1heEhlaWdodENsYXNzPVwibWF4LWgtOTZcIlxyXG4gICAgICAgIHNlbGVjdGVkSWNvbkNsYXNzTmFtZT1cImgtNiB3LTZcIlxyXG4gICAgICAgIG9wdGlvbkljb25DbGFzc05hbWU9XCJoLTYgdy02XCJcclxuICAgICAgICBzZWxlY3RlZElucHV0UGFkZGluZ0NsYXNzTmFtZT1cInBsLTEyXCJcclxuICAgICAgICBpZEJhc2U9XCJleHBlbnNlLWhlYWRlci1jdXJyZW5jeS1yZWFkb25seVwiXHJcbiAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgIC8+XHJcbiAgICAgIHshaXNFZGl0aW5nICYmIHNob3dFeGNoYW5nZVJhdGUgPyAoXHJcbiAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9FeGNoYW5nZVJhdGVcIiwgXCJFeGNoYW5nZSByYXRlXCIpfSB2YWx1ZT17ZXhjaGFuZ2VSYXRlVmFsdWV9IC8+XHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgPC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldEhlYWRlckN1cnJlbmN5U2VjdGlvbjtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VMYXlvdXRFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSBcInJlYWN0LWRvbVwiO1xyXG5pbXBvcnQgeyB1c2VPdXRzaWRlQ2xpY2sgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlT3V0c2lkZUNsaWNrLnRzXCI7XHJcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xyXG5cclxudHlwZSBJbmZvUG9wb3Zlckljb25CdXR0b25Qcm9wcyA9IHtcbiAgY29udGVudDogUmVhY3QuUmVhY3ROb2RlO1xuICBhcmlhTGFiZWw6IHN0cmluZztcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcbn07XG5cbi8vIENvbnZlcnRzIGVzY2FwZWQgcmVzb3VyY2UgbGluZSBicmVha3MgaW50byB2aXNpYmxlIHBvcG92ZXIgbGluZSBicmVha3MuXG5jb25zdCBub3JtYWxpemVQb3BvdmVyQ29udGVudCA9IChjb250ZW50OiBSZWFjdC5SZWFjdE5vZGUpOiBSZWFjdC5SZWFjdE5vZGUgPT4ge1xuICBpZiAodHlwZW9mIGNvbnRlbnQgIT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIHJldHVybiBjb250ZW50LnJlcGxhY2UoL1xcXFxyXFxcXG58XFxcXG58XFxcXHIvZywgXCJcXG5cIik7XG59O1xuXG4vLyBTaGFyZWQgZHVtYiBwb3BvdmVyIHRyaWdnZXIgdXNlZCB0byBkaXNwbGF5IHNob3J0IGNvbnRleHR1YWwgaW5mby5cbmNvbnN0IEluZm9Qb3BvdmVySWNvbkJ1dHRvbiA9ICh7XG4gIGNvbnRlbnQsXG4gIGFyaWFMYWJlbCxcbiAgY2xhc3NOYW1lID0gXCJcIixcbiAgcGFuZWxDbGFzc05hbWUgPSBcIlwiLFxyXG59OiBJbmZvUG9wb3Zlckljb25CdXR0b25Qcm9wcykgPT4ge1xyXG4gIGNvbnN0IEhPUklaT05UQUxfVklFV1BPUlRfR1VUVEVSX1BYID0gODtcclxuICBjb25zdCBWRVJUSUNBTF9WSUVXUE9SVF9HVVRURVJfUFggPSA4O1xyXG4gIGNvbnN0IFBBTkVMX1RSSUdHRVJfR0FQX1BYID0gNjtcclxuICBjb25zdCBHTE9CQUxfUkFESVVTID0gXCJ2YXIoLS1yYWRpdXMteGwsIDVweClcIjtcclxuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtwYW5lbFN0eWxlLCBzZXRQYW5lbFN0eWxlXSA9IHVzZVN0YXRlPFJlYWN0LkNTU1Byb3BlcnRpZXM+KHtcclxuICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXHJcbiAgICB0b3A6IDAsXHJcbiAgICBsZWZ0OiAwLFxyXG4gICAgdmlzaWJpbGl0eTogXCJoaWRkZW5cIixcclxuICB9KTtcclxuICBjb25zdCBidXR0b25SZWYgPSB1c2VSZWY8SFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBwYW5lbFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG5cclxuICB1c2VPdXRzaWRlQ2xpY2soW2J1dHRvblJlZiwgcGFuZWxSZWZdLCAoKSA9PiBzZXRJc09wZW4oZmFsc2UpKTtcclxuICBjb25zdCB1cGRhdGVQYW5lbFBvc2l0aW9uID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSBidXR0b25SZWYuY3VycmVudDtcclxuICAgIGNvbnN0IHBhbmVsRWxlbWVudCA9IHBhbmVsUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWJ1dHRvbkVsZW1lbnQgfHwgIXBhbmVsRWxlbWVudCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYnV0dG9uUmVjdCA9IGJ1dHRvbkVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCBwYW5lbFJlY3QgPSBwYW5lbEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCB2aWV3cG9ydFdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICBjb25zdCB2aWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgIGNvbnN0IHNhZmVXaWR0aCA9IE1hdGgubWluKHBhbmVsUmVjdC53aWR0aCwgTWF0aC5tYXgoMTgwLCB2aWV3cG9ydFdpZHRoIC0gSE9SSVpPTlRBTF9WSUVXUE9SVF9HVVRURVJfUFggKiAyKSk7XHJcblxyXG4gICAgbGV0IGxlZnQgPSBidXR0b25SZWN0LmxlZnQgKyBidXR0b25SZWN0LndpZHRoIC8gMiAtIHNhZmVXaWR0aCAvIDI7XHJcbiAgICBsZWZ0ID0gTWF0aC5tYXgoSE9SSVpPTlRBTF9WSUVXUE9SVF9HVVRURVJfUFgsIE1hdGgubWluKGxlZnQsIHZpZXdwb3J0V2lkdGggLSBzYWZlV2lkdGggLSBIT1JJWk9OVEFMX1ZJRVdQT1JUX0dVVFRFUl9QWCkpO1xyXG5cclxuICAgIGxldCB0b3AgPSBidXR0b25SZWN0LmJvdHRvbSArIFBBTkVMX1RSSUdHRVJfR0FQX1BYO1xyXG4gICAgY29uc3QgaGFzQm90dG9tT3ZlcmZsb3cgPSB0b3AgKyBwYW5lbFJlY3QuaGVpZ2h0ICsgVkVSVElDQUxfVklFV1BPUlRfR1VUVEVSX1BYID4gdmlld3BvcnRIZWlnaHQ7XHJcbiAgICBpZiAoaGFzQm90dG9tT3ZlcmZsb3cpIHtcclxuICAgICAgY29uc3QgdG9wQWJvdmVUcmlnZ2VyID0gYnV0dG9uUmVjdC50b3AgLSBwYW5lbFJlY3QuaGVpZ2h0IC0gUEFORUxfVFJJR0dFUl9HQVBfUFg7XHJcbiAgICAgIHRvcCA9IHRvcEFib3ZlVHJpZ2dlciA+PSBWRVJUSUNBTF9WSUVXUE9SVF9HVVRURVJfUFhcclxuICAgICAgICA/IHRvcEFib3ZlVHJpZ2dlclxyXG4gICAgICAgIDogTWF0aC5tYXgoVkVSVElDQUxfVklFV1BPUlRfR1VUVEVSX1BYLCB2aWV3cG9ydEhlaWdodCAtIHBhbmVsUmVjdC5oZWlnaHQgLSBWRVJUSUNBTF9WSUVXUE9SVF9HVVRURVJfUFgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFBhbmVsU3R5bGUoe1xyXG4gICAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxyXG4gICAgICB0b3A6IE1hdGgucm91bmQodG9wKSxcclxuICAgICAgbGVmdDogTWF0aC5yb3VuZChsZWZ0KSxcclxuICAgICAgd2lkdGg6IE1hdGgucm91bmQoc2FmZVdpZHRoKSxcclxuICAgICAgdmlzaWJpbGl0eTogXCJ2aXNpYmxlXCIsXHJcbiAgICB9KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWlzT3Blbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB1cGRhdGVQYW5lbFBvc2l0aW9uKCk7XHJcbiAgfSwgW2lzT3BlbiwgY29udGVudCwgdXBkYXRlUGFuZWxQb3NpdGlvbl0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc09wZW4pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaGFuZGxlVmlld3BvcnRDaGFuZ2UgPSAoKSA9PiB1cGRhdGVQYW5lbFBvc2l0aW9uKCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBoYW5kbGVWaWV3cG9ydENoYW5nZSk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVWaWV3cG9ydENoYW5nZSwgdHJ1ZSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBoYW5kbGVWaWV3cG9ydENoYW5nZSk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhhbmRsZVZpZXdwb3J0Q2hhbmdlLCB0cnVlKTtcclxuICAgIH07XHJcbiAgfSwgW2lzT3BlbiwgdXBkYXRlUGFuZWxQb3NpdGlvbl0pO1xuXG4gIGNvbnN0IHBvcnRhbFRhcmdldCA9IHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIiA/IG51bGwgOiBkb2N1bWVudC5ib2R5O1xuICBjb25zdCBub3JtYWxpemVkQ29udGVudCA9IG5vcm1hbGl6ZVBvcG92ZXJDb250ZW50KGNvbnRlbnQpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJpbmxpbmUtZmxleFwiLCBjbGFzc05hbWUpfT5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgIHJlZj17YnV0dG9uUmVmfVxyXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbH1cclxuICAgICAgICBhcmlhLWV4cGFuZGVkPXtpc09wZW59XHJcbiAgICAgICAgYXJpYS1oYXNwb3B1cD1cImRpYWxvZ1wiXHJcbiAgICAgICAgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaC02IHctNiBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci10cmFuc3BhcmVudCBiZy10cmFuc3BhcmVudCBwLTAgdGV4dC1zbGF0ZS01MDAgdHJhbnNpdGlvbiBob3Zlcjp0ZXh0LXByaW1hcnkgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHJpbWFyeS8zMFwiXHJcbiAgICAgICAgc3R5bGU9e3sgYm9yZGVyUmFkaXVzOiBHTE9CQUxfUkFESVVTIH19XHJcbiAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNPcGVuKChwcmV2aW91cykgPT4gIXByZXZpb3VzKX1cclxuICAgICAgPlxyXG4gICAgICAgIDxzdmdcclxuICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICAgICAgd2lkdGg9XCIyMFwiXHJcbiAgICAgICAgICBoZWlnaHQ9XCIyMFwiXHJcbiAgICAgICAgICB2aWV3Qm94PVwiMyAzIDE4IDE4XCJcclxuICAgICAgICAgIGZpbGw9XCJub25lXCJcclxuICAgICAgICAgIHN0cm9rZT1cIiM2NDc0OGJcIlxyXG4gICAgICAgICAgc3Ryb2tlV2lkdGg9XCIxLjc1XCJcclxuICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcclxuICAgICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJibG9ja1wiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHJlY3QgeD1cIjRcIiB5PVwiNFwiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIHJ4PVwiM1wiIHJ5PVwiM1wiIC8+XHJcbiAgICAgICAgICA8cGF0aCBkPVwiTTEyIDloLjAxXCIgLz5cclxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTEgMTJoMXY0aDFcIiAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgIHtpc09wZW4gJiYgcG9ydGFsVGFyZ2V0XHJcbiAgICAgICAgPyBjcmVhdGVQb3J0YWwoXHJcbiAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICByZWY9e3BhbmVsUmVmfVxyXG4gICAgICAgICAgICAgIHJvbGU9XCJkaWFsb2dcIlxyXG4gICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnBhbmVsU3R5bGUsIGJvcmRlclJhZGl1czogR0xPQkFMX1JBRElVUyB9fVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICAgIFwiei0zNjAwMDAgbWluLXctWzIyMHB4XSBtYXgtdy1bY2FsYygxMDB2dy0xcmVtKV0gcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUgcC0zIHNoYWRvdy1sZ1wiLFxyXG4gICAgICAgICAgICAgICAgcGFuZWxDbGFzc05hbWVcclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEycHhdIHRleHQtc2xhdGUtNzAwIHdoaXRlc3BhY2UtcHJlLWxpbmVcIj57bm9ybWFsaXplZENvbnRlbnR9PC9wPlxuICAgICAgICAgICAgPC9kaXY+LFxuICAgICAgICAgICAgcG9ydGFsVGFyZ2V0XG4gICAgICAgICAgKVxuICAgICAgICA6IG51bGx9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSW5mb1BvcG92ZXJJY29uQnV0dG9uO1xyXG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IG1hcFdpbmRvd0VudW1PcHRpb25zLCB0eXBlIEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcblxyXG50eXBlIEV4Y2hhbmdlUmF0ZU1vZGVVaU1ldGEgPSB7XHJcbiAgbGFiZWxLZXk6IHN0cmluZztcclxuICBmYWxsYmFjazogc3RyaW5nO1xyXG59O1xyXG5cclxuY29uc3QgRVhDSEFOR0VfUkFURV9NT0RFX01FVEE6IFBhcnRpYWw8UmVjb3JkPEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ29kZSwgRXhjaGFuZ2VSYXRlTW9kZVVpTWV0YT4+ID0ge1xuICAwOiB7XHJcbiAgICBsYWJlbEtleTogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX09mZmljaWFsXCIsXHJcbiAgICBmYWxsYmFjazogXCJULkMuIE9maWNpYWxcIixcclxuICB9LFxyXG4gIDE6IHtcclxuICAgIGxhYmVsS2V5OiBcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0V4Y2hhbmdlUmF0ZU1vZGVfTWFudWFsXCIsXHJcbiAgICBmYWxsYmFjazogXCJULkMuIE1hbnVhbFwiLFxyXG4gIH0sXHJcbn07XHJcbmNvbnN0IEVYQ0hBTkdFX1JBVEVfTU9ERV9DT0RFUzogRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDb2RlW10gPSBbMCwgMV07XG5cbmNvbnN0IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ2F0YWxvZ09wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcbiAgY29uc3Qgc291cmNlID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBBcnJheS5pc0FycmF5KHdpbmRvdy5fX0VYUEVOU0VfRVhDSEFOR0VfUkFURV9NT0RFU19fKVxuICAgID8gd2luZG93Ll9fRVhQRU5TRV9FWENIQU5HRV9SQVRFX01PREVTX19cbiAgICA6IFtdO1xuXG4gIHJldHVybiBtYXBXaW5kb3dFbnVtT3B0aW9ucyhzb3VyY2UpLmZpbHRlcigob3B0aW9uKSA9PiB7XG4gICAgY29uc3QgcGFyc2VkID0gTnVtYmVyKG9wdGlvbi52YWx1ZSk7XG4gICAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIocGFyc2VkKSAmJiBwYXJzZWQgPj0gMDtcbiAgfSk7XG59O1xuXG5jb25zdCBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNhdGFsb2dMYWJlbCA9ICh2YWx1ZTogRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDb2RlKTogc3RyaW5nID0+IHtcbiAgY29uc3QgbWF0Y2ggPSBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNhdGFsb2dPcHRpb25zKCkuZmluZCgob3B0aW9uKSA9PiBOdW1iZXIob3B0aW9uLnZhbHVlKSA9PT0gdmFsdWUpO1xuICByZXR1cm4gbWF0Y2g/LnRleHQgfHwgXCJcIjtcbn07XG5cbi8vIEtlZXBzIGV4Y2hhbmdlIHJhdGUgbW9kZSB2YWx1ZXMgY29uc3RyYWluZWQgdG8gbm9uLW5lZ2F0aXZlIG51bWVyaWMgZW51bSBjb2Rlcy5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ29kZSB8IG51bGwgPT4ge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCBTdHJpbmcodmFsdWUpLnRyaW0oKSA9PT0gXCJcIikgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgJiYgcGFyc2VkID49IDApIHtcbiAgICByZXR1cm4gcGFyc2VkO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxyXG4vLyBCdWlsZHMgZml4ZWQgb3B0aW9ucyBmb3IgdGhlIGV4Y2hhbmdlIHJhdGUgbW9kZSBmaWx0ZXIuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVPcHRpb25zID0gKCk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XG4gIGNvbnN0IGNhdGFsb2dPcHRpb25zID0gZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDYXRhbG9nT3B0aW9ucygpO1xuICBpZiAoY2F0YWxvZ09wdGlvbnMubGVuZ3RoID4gMCkgcmV0dXJuIGNhdGFsb2dPcHRpb25zO1xuXG4gIHJldHVybiBFWENIQU5HRV9SQVRFX01PREVfQ09ERVNcbiAgICAubWFwKChjb2RlKSA9PiB7XG4gICAgICBjb25zdCBtZXRhID0gRVhDSEFOR0VfUkFURV9NT0RFX01FVEFbY29kZV07XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogU3RyaW5nKGNvZGUpLFxuICAgICAgICB0ZXh0OiBtZXRhID8gaW5kVChtZXRhLmxhYmVsS2V5LCBtZXRhLmZhbGxiYWNrKSA6IFN0cmluZyhjb2RlKSxcbiAgICAgIH07XG4gICAgfSk7XG59O1xuXHJcbi8vIFJldHVybnMgYSBsb2NhbGl6ZWQgbW9kZSBsYWJlbCBvciBlbXB0eSB0ZXh0IGZvciBub24tc2VsZWN0ZWQgdmFsdWVzLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZSh2YWx1ZSk7XG4gIGlmIChub3JtYWxpemVkID09PSBudWxsKSByZXR1cm4gXCJcIjtcbiAgY29uc3QgY2F0YWxvZ0xhYmVsID0gZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDYXRhbG9nTGFiZWwobm9ybWFsaXplZCk7XG4gIGlmIChjYXRhbG9nTGFiZWwpIHJldHVybiBjYXRhbG9nTGFiZWw7XG5cbiAgY29uc3QgbWV0YSA9IEVYQ0hBTkdFX1JBVEVfTU9ERV9NRVRBW25vcm1hbGl6ZWRdO1xuICByZXR1cm4gbWV0YSA/IGluZFQobWV0YS5sYWJlbEtleSwgbWV0YS5mYWxsYmFjaykgOiBTdHJpbmcobm9ybWFsaXplZCk7XG59O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgaW5kRm9ybWF0LCBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRIZWFkZXIgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeVNlY3Rpb24gZnJvbSBcIi4vRXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lTZWN0aW9uLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dCBmcm9tIFwiLi9FeHBlbnNlUHJvamVjdEZpbHRlcklucHV0LnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVJlYWRPbmx5RmllbGQgZnJvbSBcIi4vRXhwZW5zZVJlYWRPbmx5RmllbGQudHN4XCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VTdGF0dXNMYWJlbCB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVN0YXR1c0NhdGFsb2cudHNcIjtcclxuaW1wb3J0IHtcbiAgZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCxcbiAgbm9ybWFsaXplRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGUsXG59IGZyb20gXCIuLi9jb25zdGFudHMvZXhjaGFuZ2VSYXRlRW50cnlNb2RlQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZU51bWJlciwgcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybU1vZGUgPSB7XG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBjYW5FZGl0SGVhZGVyRmllbGRzOiBib29sZWFuO1xuICBzdGF0dXNDb21tZW50TW9kZTogXCJoaWRkZW5cIiB8IFwicmVhZFwiO1xufTtcblxudHlwZSBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeUxvY2tzID0ge1xuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogYm9vbGVhbjtcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xuICBzaG93RXhjaGFuZ2VSYXRlOiBib29sZWFuO1xufTtcblxudHlwZSBFeHBlbnNlU2hlZXRIZWFkZXJGb3JtUHJvcHMgPSB7XG4gIG1vZGU6IEV4cGVuc2VTaGVldEhlYWRlckZvcm1Nb2RlO1xuICBjdXJyZW5jeUxvY2tzOiBFeHBlbnNlU2hlZXRIZWFkZXJDdXJyZW5jeUxvY2tzO1xuICBoZWFkZXI6IEV4cGVuc2VTaGVldEhlYWRlcjtcbiAgb3duZXJEaXNwbGF5Pzogc3RyaW5nO1xuICBwcm9qZWN0VmFsdWU6IHN0cmluZztcbiAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3k6IHN0cmluZztcbiAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5OiBzdHJpbmc7XG4gIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudDogbnVtYmVyO1xuICBleGNoYW5nZVJhdGVWYWx1ZTogc3RyaW5nO1xuICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZTogc3RyaW5nO1xuICB0b3RhbEFtb3VudFRleHQ6IHN0cmluZztcclxuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZHJhZnRQcm9qZWN0SWQ6IHN0cmluZztcclxuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGRyYWZ0RXhjaGFuZ2VSYXRlOiBzdHJpbmc7XHJcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZTogc3RyaW5nO1xyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZTogc3RyaW5nO1xyXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlOiBzdHJpbmc7XHJcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IEVYQ0hBTkdFX1JBVEVfTU9ERV9QUkVGSVhfUEFUVEVSTiA9IC9eVFxcLj9DXFwuP1xccyovaTtcclxuXHJcbi8vIFB1cmUgcHJlc2VudGF0aW9uYWwgaGVhZGVyIGZvcm0gZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsL2NyZWF0ZSBzY3JlZW5zLlxuY29uc3QgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybSA9ICh7XG4gIG1vZGUsXG4gIGN1cnJlbmN5TG9ja3MsXG4gIGhlYWRlcixcbiAgb3duZXJEaXNwbGF5ID0gXCJcIixcbiAgcHJvamVjdFZhbHVlLFxuICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcbiAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxuICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQsXG4gIGV4Y2hhbmdlUmF0ZVZhbHVlLFxuICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSxcbiAgdG90YWxBbW91bnRUZXh0LFxyXG4gIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgZHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSxcclxuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUsXHJcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsXHJcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlLFxyXG4gIG9uRHJhZnRQcm9qZWN0SWRDaGFuZ2UsXHJcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZSxcbiAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZSxcbn06IEV4cGVuc2VTaGVldEhlYWRlckZvcm1Qcm9wcykgPT4ge1xuICBjb25zdCB7IGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nLCBjYW5FZGl0SGVhZGVyRmllbGRzLCBzdGF0dXNDb21tZW50TW9kZSB9ID0gbW9kZTtcbiAgY29uc3QgeyBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcywgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLCBzaG93RXhjaGFuZ2VSYXRlIH0gPSBjdXJyZW5jeUxvY2tzO1xuICBjb25zdCBpc0ZvcmVpZ25DdXJyZW5jeSA9XG4gICAgaXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHMgJiYgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgIT09IFwiXCIgJiYgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgIT09IGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeTtcclxuICBjb25zdCBleHBlbnNlQ3VycmVuY3lMYWJlbCA9IGlzRm9yZWlnbkN1cnJlbmN5XHJcbiAgICA/IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0V4cGVuc2VDdXJyZW5jeVwiLCBcIkV4cGVuc2UgY3VycmVuY3lcIilcclxuICAgIDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQ3VycmVuY3lcIiwgXCJDdXJyZW5jeVwiKTtcclxuICBjb25zdCBzdGF0dXNWYWx1ZSA9XHJcbiAgICBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzID09PSBudWxsIHx8IGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMgPT09IHVuZGVmaW5lZFxyXG4gICAgICA/IFwiLVwiXHJcbiAgICAgIDogZ2V0RXhwZW5zZVN0YXR1c0xhYmVsKGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMpO1xyXG4gIGNvbnN0IGhlYWRlckN1cnJlbmN5Q29kZSA9IHNhZmVUZXh0KGhlYWRlci5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3QgYmFzZUN1cnJlbmN5Q29kZSA9IHNhZmVUZXh0KGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSkudG9VcHBlckNhc2UoKTtcclxuICAvLyBTdGF0dXMgY29tbWVudCBpcyBub3cgZWRpdGVkIG9ubHkgaW4gdGhlIHN0YXR1cyB0cmFuc2l0aW9uIHBvcHVwLlxyXG4gIGNvbnN0IHN0YXR1c0NvbW1lbnRWYWx1ZSA9IHNhZmVUZXh0KGhlYWRlci5lc3RhZG9Db21lbnRhcmlvcyk7XHJcbiAgY29uc3Qgc2hvd1N0YXR1c0NvbW1lbnRGaWVsZCA9ICFpc0NyZWF0ZU1vZGUgJiYgc3RhdHVzQ29tbWVudE1vZGUgIT09IFwiaGlkZGVuXCI7XHJcbiAgY29uc3QgcGFyc2VkRHJhZnRFeGNoYW5nZVJhdGUgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQoZHJhZnRFeGNoYW5nZVJhdGUpO1xyXG4gIGNvbnN0IHBhcnNlZE9mZmljaWFsUmF3UmF0ZSA9IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKTtcclxuICBjb25zdCBiYXNlRXhjaGFuZ2VSYXRlVmFsdWUgPVxyXG4gICAgcGFyc2VkRHJhZnRFeGNoYW5nZVJhdGUgIT0gbnVsbFxyXG4gICAgICA/IHBhcnNlZERyYWZ0RXhjaGFuZ2VSYXRlXHJcbiAgICAgIDogcGFyc2VkT2ZmaWNpYWxSYXdSYXRlICE9IG51bGxcclxuICAgICAgICA/IHBhcnNlZE9mZmljaWFsUmF3UmF0ZSAqIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudFxyXG4gICAgICAgIDogbnVsbDtcclxuICBjb25zdCBleGNoYW5nZVJhdGVJbmZvVmFsdWUgPSBmb3JtYXRFeHBlbnNlTnVtYmVyKFxyXG4gICAgYmFzZUV4Y2hhbmdlUmF0ZVZhbHVlICE9IG51bGwgPyBiYXNlRXhjaGFuZ2VSYXRlVmFsdWUgLyBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQgOiBudWxsLFxyXG4gICAge1xyXG4gICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDcsXHJcbiAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogNyxcclxuICAgICAgdXNlR3JvdXBpbmc6IGZhbHNlLFxyXG4gICAgICBmYWxsYmFjazogXCIwLjAwMDAwMDBcIixcclxuICAgIH1cclxuICApO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSA9IG5vcm1hbGl6ZUV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlKGhlYWRlci5leGNoYW5nZVJhdGVNb2RlKSA/PyAwO1xuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlS2V5ID1cbiAgICBleGNoYW5nZVJhdGVNb2RlVmFsdWUgPT09IDFcbiAgICAgID8gXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX01hbnVhbFwiXG4gICAgICA6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9PZmZpY2lhbFwiO1xuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlRmFsbGJhY2sgPSBleGNoYW5nZVJhdGVNb2RlVmFsdWUgPT09IDEgPyBcIlQuQy4gTWFudWFsXCIgOiBcIlQuQy4gT2ZpY2lhbFwiO1xuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlTGFiZWwgPVxyXG4gICAgKGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlTGFiZWwoZXhjaGFuZ2VSYXRlTW9kZVZhbHVlKSB8fCBpbmRUKGV4Y2hhbmdlUmF0ZU1vZGVLZXksIGV4Y2hhbmdlUmF0ZU1vZGVGYWxsYmFjaykpXHJcbiAgICAgIC5yZXBsYWNlKEVYQ0hBTkdFX1JBVEVfTU9ERV9QUkVGSVhfUEFUVEVSTiwgXCJcIilcclxuICAgICAgLnRyaW0oKVxyXG4gICAgICAudG9Mb3dlckNhc2UoKSB8fCAoZXhjaGFuZ2VSYXRlTW9kZVZhbHVlID09PSAxID8gXCJtYW51YWxcIiA6IFwib2ZpY2lhbFwiKTtcclxuICBjb25zdCBoYXNFbmRwb2ludEV4Y2hhbmdlUmF0ZURhdGEgPVxyXG4gICAgISFzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKSB8fCAhIXNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSkgfHwgISFzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSk7XHJcbiAgY29uc3QgZW5kcG9pbnRFeGNoYW5nZVJhdGVJbmZvRGF0ZSA9IHNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSkgfHwgaW5kVChcIkNvbW1vbl9Ob3RBdmFpbGFibGVcIiwgXCJOL0FcIik7XHJcbiAgY29uc3QgZW5kcG9pbnRFeGNoYW5nZVJhdGVJbmZvU291cmNlID0gc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UpXHJcbiAgICAucmVwbGFjZSgvXFxzKlxcKFteKCldKlxcKVxccyovZywgXCIgXCIpXHJcbiAgICAucmVwbGFjZSgvXFxzezIsfS9nLCBcIiBcIilcclxuICAgIC50cmltKCkgfHwgaW5kVChcIkNvbW1vbl9Ob3RBdmFpbGFibGVcIiwgXCJOL0FcIik7XHJcbiAgY29uc3QgZW5kcG9pbnRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZSA9IGluZEZvcm1hdChcclxuICAgIFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfSW5mb1BvcG92ZXJfRGV0YWlsXCIsXHJcbiAgICBcIlRpcG8gZGUgY2FtYmlvIG9idGVuaWRvIHswfVxcbkZlY2hhOiB7MX1cXG5PcmlnZW46IHsyfVwiLFxyXG4gICAgc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSkgfHwgXCIwLjAwMDAwMDBcIixcclxuICAgIGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb0RhdGUsXHJcbiAgICBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9Tb3VyY2VcclxuICApO1xyXG4gIGNvbnN0IHN0b3JlZEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlID0gaW5kRm9ybWF0KFxyXG4gICAgXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9JbmZvUG9wb3Zlcl9TdG9yZWRcIixcclxuICAgIFwiVGlwbyBkZSBjYW1iaW8gezB9IHsxfVwiLFxyXG4gICAgZXhjaGFuZ2VSYXRlTW9kZUxhYmVsLFxyXG4gICAgZXhjaGFuZ2VSYXRlSW5mb1ZhbHVlXHJcbiAgKTtcclxuICBjb25zdCBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZSA9IGhhc0VuZHBvaW50RXhjaGFuZ2VSYXRlRGF0YSA/IGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UgOiBzdG9yZWRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInJlbGF0aXZlIHNoYWRvdy14cyBnbGFzcy1wYW5lbCBwLTQgc3BhY2UteS00IGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCI+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiPlxuICAgICAgICB7b3duZXJEaXNwbGF5ID8gKFxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX093bmVyVXNlclwiLCBcIk93bmVyIHVzZXJcIil9XG4gICAgICAgICAgICB2YWx1ZT17b3duZXJEaXNwbGF5fVxuICAgICAgICAgICAgZnVsbFdpZHRoXG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHshaXNDcmVhdGVNb2RlID8gKFxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1NoZWV0SWRcIiwgXCJFeHBlbnNlIHNoZWV0IGNvZGVcIil9XHJcbiAgICAgICAgICAgIHZhbHVlPXtzYWZlVGV4dChoZWFkZXIuaG9qYUdhc3Rvc0lkKSB8fCBcIi1cIn1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgeyFpc0NyZWF0ZU1vZGUgPyA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1N0YXR1c1wiLCBcIlN0YXR1c1wiKX0gdmFsdWU9e3N0YXR1c1ZhbHVlfSAvPiA6IG51bGx9XHJcbiAgICAgICAge3Nob3dTdGF0dXNDb21tZW50RmllbGQgPyAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1N0YXR1c0NvbW1lbnRcIiwgXCJTdGF0dXMgY29tbWVudFwiKX1cclxuICAgICAgICAgICAgdmFsdWU9e3N0YXR1c0NvbW1lbnRWYWx1ZSB8fCBcIi1cIn1cclxuICAgICAgICAgICAgZnVsbFdpZHRoXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgIHtpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkcyA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBzcGFjZS15LTEuNVwiPlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCI+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9PC9sYWJlbD5cclxuICAgICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcclxuICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnREZXNjcmlwdGlvbn1cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxyXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkXHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17c2FmZVRleHQoaGVhZGVyLmRlc2NyaXB0aW9uKSB8fCBcIi1cIn1cclxuICAgICAgICAgICAgZnVsbFdpZHRoXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICl9XHJcbiAgICAgICAge2lzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzID8gKFxyXG4gICAgICAgICAgPEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXRcclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1Byb2plY3RfUGxhY2Vob2xkZXJcIiwgXCJQcm9qZWN0IGlkXCIpfVxyXG4gICAgICAgICAgICB2YWx1ZT17ZHJhZnRQcm9qZWN0SWR9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0UHJvamVjdElkQ2hhbmdlfVxyXG4gICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZyB8fCAhY2FuRWRpdEhlYWRlckZpZWxkc31cclxuICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmcgfHwgIWNhbkVkaXRIZWFkZXJGaWVsZHN9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICkgOiBwcm9qZWN0VmFsdWUgPyAoXHJcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfSB2YWx1ZT17cHJvamVjdFZhbHVlfSAvPlxyXG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICA8RXhwZW5zZVNoZWV0SGVhZGVyQ3VycmVuY3lTZWN0aW9uXG4gICAgICAgICAgaW50ZXJhY3Rpb249e3sgaXNFZGl0aW5nLCBjYW5FZGl0SGVhZGVyRmllbGRzIH19XG4gICAgICAgICAgY3VycmVuY3lTdGF0ZT17eyBpc0ZvcmVpZ25DdXJyZW5jeSwgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcywgc2hvd0V4Y2hhbmdlUmF0ZSB9fVxuICAgICAgICAgIGV4cGVuc2VDdXJyZW5jeUxhYmVsPXtleHBlbnNlQ3VycmVuY3lMYWJlbH1cbiAgICAgICAgICBoZWFkZXJDdXJyZW5jeUNvZGU9e2hlYWRlckN1cnJlbmN5Q29kZX1cbiAgICAgICAgICBiYXNlQ3VycmVuY3lDb2RlPXtiYXNlQ3VycmVuY3lDb2RlfVxuICAgICAgICAgIGRyYWZ0Q3VycmVuY3lDb2RlPXtkcmFmdEN1cnJlbmN5Q29kZX1cclxuICAgICAgICAgIGRyYWZ0RXhjaGFuZ2VSYXRlPXtkcmFmdEV4Y2hhbmdlUmF0ZX1cclxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZVZhbHVlPXtleGNoYW5nZVJhdGVWYWx1ZX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZT17ZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2V9XG4gICAgICAgICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50PXtleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnR9XG4gICAgICAgICAgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2U9e2V4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlfVxuICAgICAgICAgIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U9e29uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2V9XG4gICAgICAgICAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZT17b25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZX1cbiAgICAgICAgLz5cclxuICAgICAgICB7IWlzQ3JlYXRlTW9kZSA/IDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVG90YWxBbW91bnRcIiwgXCJUb3RhbCBhbW91bnRcIil9IHZhbHVlPXt0b3RhbEFtb3VudFRleHR9IC8+IDogbnVsbH1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L3NlY3Rpb24+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldEhlYWRlckZvcm07XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQ29tcGFjdFBhZ2luYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3hcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURhdGVQYXJ0cywgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCBFeHBlbnNlU2VjdGlvbkRpdmlkZXIgZnJvbSBcIi4vRXhwZW5zZVNlY3Rpb25EaXZpZGVyLnRzeFwiO1xyXG5pbXBvcnQgRXhwZW5zZVRpbWVsaW5lQ2FyZCBmcm9tIFwiLi9FeHBlbnNlVGltZWxpbmVDYXJkLnRzeFwiO1xyXG5cclxudHlwZSBQYWdpbmF0aW9uTGFiZWxzID0ge1xyXG4gIGZpcnN0OiBzdHJpbmc7XHJcbiAgcHJldjogc3RyaW5nO1xyXG4gIG5leHQ6IHN0cmluZztcclxuICBsYXN0OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VMaW5lc1RpbWVsaW5lUHJvcHMgPSB7XHJcbiAgdmlzaWJsZUxpbmVzOiBFeHBlbnNlU2hlZXRMaW5lW107XHJcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgdG90YWxMaW5lUGFnZXM6IG51bWJlcjtcclxuICBsaW5lUGFnZTogbnVtYmVyO1xyXG4gIGxpbmVzTGFiZWw6IHN0cmluZztcclxuICBlbXB0eVRleHQ6IHN0cmluZztcclxuICBwYWdpbmF0aW9uTGFiZWxzOiBQYWdpbmF0aW9uTGFiZWxzO1xyXG4gIGNvbnRhaW5lclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgb25MaW5lUGFnZUNoYW5nZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcclxuICBvbk9wZW5MaW5lOiAobGluZVJlY0lkOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBEdW1iIHRpbWVsaW5lIGZvciBleHBlbnNlIHNoZWV0IGxpbmVzIHdpdGggc3RhbmRhcmQgY2FyZCBhbmQgcGFnaW5hdGlvbiBsYXlvdXQuXHJcbmNvbnN0IEV4cGVuc2VMaW5lc1RpbWVsaW5lID0gKHtcclxuICB2aXNpYmxlTGluZXMsXHJcbiAgY3VycmVuY3lDb2RlLFxyXG4gIHRvdGFsTGluZVBhZ2VzLFxyXG4gIGxpbmVQYWdlLFxyXG4gIGxpbmVzTGFiZWwsXHJcbiAgZW1wdHlUZXh0LFxyXG4gIHBhZ2luYXRpb25MYWJlbHMsXHJcbiAgY29udGFpbmVyUmVmLFxyXG4gIG9uTGluZVBhZ2VDaGFuZ2UsXHJcbiAgb25PcGVuTGluZSxcbn06IEV4cGVuc2VMaW5lc1RpbWVsaW5lUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzcGFjZS15LTBcIj5cclxuICAgICAgPEV4cGVuc2VTZWN0aW9uRGl2aWRlciBsYWJlbD17bGluZXNMYWJlbH0gY2xhc3NOYW1lPVwiZXhwZW5zZS1zZWN0aW9uLWRpdmlkZXItLXNwYWNlZFwiIC8+XHJcblxyXG4gICAgICB7dmlzaWJsZUxpbmVzLmxlbmd0aCA9PT0gMCA/IChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveCB0aW1lbGluZS1lbXB0eVwiIGRhdGEtZW1wdHktdGV4dD17ZW1wdHlUZXh0fSAvPlxyXG4gICAgICApIDogKFxyXG4gICAgICAgIDxkaXYgcmVmPXtjb250YWluZXJSZWZ9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveFwiPlxyXG4gICAgICAgICAge3Zpc2libGVMaW5lcy5tYXAoKGxpbmUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmVJZCA9IHNhZmVUZXh0KGxpbmUubGluZVJlY0lkKTtcclxuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBzYWZlVGV4dChsaW5lLmRlc2NyaXB0aW9uKTtcclxuICAgICAgICAgICAgY29uc3QgYW1vdW50VGV4dCA9IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeShsaW5lLmFtb3VudCA/PyBudWxsLCBjdXJyZW5jeUNvZGUpO1xuICAgICAgICAgICAgY29uc3QgbGlua2VkVGlja2V0RmlsZUlkID0gc2FmZVRleHQobGluZS5maWxlSWQpO1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdElkID0gc2FmZVRleHQobGluZS5wcm9qSWQpO1xuICAgICAgICAgICAgY29uc3QgZGF0ZVBhcnRzID0gZm9ybWF0RXhwZW5zZURhdGVQYXJ0cyhzYWZlVGV4dChsaW5lLnRyYW5zRGF0ZSksIGRvY3VtZW50Py5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJlcy1FU1wiKTtcbiAgICAgICAgICAgIGNvbnN0IHRpY2tldFN0YXR1c0ljb24gPSBsaW5rZWRUaWNrZXRGaWxlSWQgPyAoXHJcbiAgICAgICAgICAgICAgPHN2Z1xyXG4gICAgICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgICAgICAgICAgICBmaWxsPVwibm9uZVwiXHJcbiAgICAgICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXsxLjV9XHJcbiAgICAgICAgICAgICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic2l6ZS00XCJcbiAgICAgICAgICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICBkPVwiTTEzLjE5IDguNjg4YTQuNSA0LjUgMCAwIDEgMS4yNDIgNy4yNDRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMS02LjM2NC02LjM2NGwxLjc1Ny0xLjc1N20xMy4zNS0uNjIyIDEuNzU3LTEuNzU3YTQuNSA0LjUgMCAwIDAtNi4zNjQtNi4zNjRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMCAxLjI0MiA3LjI0NFwiXHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICApIDogbnVsbDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2xpbmVJZCB8fCBgJHtzYWZlVGV4dChsaW5lLnRyYW5zRGF0ZSl9LSR7ZGVzY3JpcHRpb259LSR7YW1vdW50VGV4dH0tJHtwcm9qZWN0SWR9YH0gY2xhc3NOYW1lPVwidGltZWxpbmUtaXRlbVwiPlxuICAgICAgICAgICAgICAgIDxFeHBlbnNlVGltZWxpbmVDYXJkXHJcbiAgICAgICAgICAgICAgICAgIGRhdGVQYXJ0cz17ZGF0ZVBhcnRzfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9e2Rlc2NyaXB0aW9uIHx8IGxpbmVJZCB8fCBcIi1cIn1cbiAgICAgICAgICAgICAgICAgIGFtb3VudFRleHQ9e2Ftb3VudFRleHR9XG4gICAgICAgICAgICAgICAgICBvbk9wZW49eygpID0+IG9uT3BlbkxpbmUobGluZUlkKX1cbiAgICAgICAgICAgICAgICAgIHRpdGxlQ2xhc3NOYW1lPVwidGltZWxpbmUtbmFtZSBleHBlbnNlLWxpbmUtY2FyZF9fdGl0bGVcIlxuICAgICAgICAgICAgICAgICAgc3VidGl0bGVDbGFzc05hbWU9XCJleHBlbnNlLXNoZWV0LWNhcmRfX3N1YnRpdGxlIGV4cGVuc2UtbGluZS1jYXJkX19tZXRhXCJcbiAgICAgICAgICAgICAgICAgIHN0YXR1c0ljb249e3RpY2tldFN0YXR1c0ljb259XG4gICAgICAgICAgICAgICAgICBzdGF0dXNJY29uQ2xhc3NOYW1lPVwiZXhwZW5zZS1saW5lLWNhcmRfX3RpY2tldC1pY29uXCJcclxuICAgICAgICAgICAgICAgICAgc3RhdHVzTGFiZWw9e2xpbmtlZFRpY2tldEZpbGVJZCB8fCB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICA8Q29tcGFjdFBhZ2luYXRpb25cclxuICAgICAgICB0b3RhbFBhZ2VzPXt0b3RhbExpbmVQYWdlc31cclxuICAgICAgICBjdXJyZW50UGFnZT17bGluZVBhZ2V9XHJcbiAgICAgICAgb25QYWdlQ2hhbmdlPXtvbkxpbmVQYWdlQ2hhbmdlfVxyXG4gICAgICAgIGxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cclxuICAgICAgLz5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUxpbmVzVGltZWxpbmU7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQYWdlQm90dG9tQWN0aW9ucywgeyBQYWdlQm90dG9tQWN0aW9uQnV0dG9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9QYWdlQm90dG9tQWN0aW9ucy50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uIH0gZnJvbSBcIi4vZXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5LnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbkJhclByb3BzID0ge1xyXG4gIGFjdGlvbnM6IEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbltdO1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gIG9uQWN0aW9uQ2xpY2s6IChhY3Rpb246IEV4cGVuc2VTaGVldFN0YXR1c0FjdGlvbikgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIFJlbmRlcnMgdGhlIGJvdHRvbSB0b29sYmFyIGZvciBleHBlbnNlIHNoZWV0IHN0YXR1cyB0cmFuc2l0aW9ucy5cclxuY29uc3QgRXhwZW5zZVNoZWV0U3RhdHVzQWN0aW9uQmFyID0gKHsgYWN0aW9ucywgYnVzeSwgZGlzYWJsZWQgPSBmYWxzZSwgb25BY3Rpb25DbGljayB9OiBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25CYXJQcm9wcykgPT4ge1xyXG4gIGlmIChhY3Rpb25zLmxlbmd0aCA8IDEpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxQYWdlQm90dG9tQWN0aW9ucyBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0JvdHRvbUFjdGlvbnNfVG9vbGJhclwiLCBcIkFjY2lvbmVzIGRlIGVzdGFkbyBkZSBsYSBob2phIGRlIGdhc3RvXCIpfT5cbiAgICAgIHthY3Rpb25zLm1hcCgoYWN0aW9uKSA9PiAoXHJcbiAgICAgICAgPFBhZ2VCb3R0b21BY3Rpb25CdXR0b25cclxuICAgICAgICAgIGtleT17YWN0aW9uLmlkfVxyXG4gICAgICAgICAgbGFiZWw9e2luZFQoYWN0aW9uLmxhYmVsS2V5LCBhY3Rpb24uZmFsbGJhY2spfVxyXG4gICAgICAgICAgZGlzYWJsZWQ9e2J1c3kgfHwgZGlzYWJsZWR9XHJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkFjdGlvbkNsaWNrKGFjdGlvbil9XHJcbiAgICAgICAgLz5cclxuICAgICAgKSl9XHJcbiAgICA8L1BhZ2VCb3R0b21BY3Rpb25zPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlU2hlZXRTdGF0dXNBY3Rpb25CYXI7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4XCI7XHJcbmltcG9ydCBFeHBlbnNlUXVpY2tUaWNrZXRQcm9ncmVzc092ZXJsYXkgZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5LnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgVElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEUgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dDb3JlLnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzUHJvcHMgPSB7XHJcbiAgbW9kYWw6IHtcclxuICAgIG9wZW46IGJvb2xlYW47XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgbWVzc2FnZTogc3RyaW5nO1xyXG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XHJcbiAgICBjYW5jZWxUZXh0Pzogc3RyaW5nO1xyXG4gICAgc2hvd0NhbmNlbD86IGJvb2xlYW47XHJcbiAgICBzaG93Q29uZmlybT86IGJvb2xlYW47XHJcbiAgfTtcclxuICBtb2RhbEVycm9yOiBzdHJpbmc7XHJcbiAgc3RhdHVzOiBzdHJpbmc7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGU6IGJvb2xlYW47XHJcbiAgbW9kYWxMb2FkaW5nVGV4dDogc3RyaW5nO1xyXG4gIG1vZGFsQ2FuY2VsVGV4dDogc3RyaW5nO1xyXG4gIG1vZGFsQ29uZmlybVRleHQ6IHN0cmluZztcclxuICBtb2RhbEJvZHk/OiBSZWFjdC5SZWFjdE5vZGU7XHJcbiAgY2FtZXJhSW5wdXRSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD47XHJcbiAgZ2FsbGVyeUlucHV0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTElucHV0RWxlbWVudCB8IG51bGw+O1xyXG4gIHNvdXJjZVBpY2tlck9wZW46IGJvb2xlYW47XHJcbiAgcXVpY2tUaWNrZXRCdXN5OiBib29sZWFuO1xyXG4gIHF1aWNrVGlja2V0UHJvZ3Jlc3NNZXNzYWdlOiBzdHJpbmc7XHJcbiAgcXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlczogQXJyYXk8e1xyXG4gICAga2V5OiBzdHJpbmc7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICAgIHN0YXRlOiBcImNvbXBsZXRlZFwiIHwgXCJhY3RpdmVcIiB8IFwicGVuZGluZ1wiO1xyXG4gIH0+O1xyXG4gIHF1aWNrVGlja2V0RWxhcHNlZE1zOiBudW1iZXI7XHJcbiAgcXVpY2tUaWNrZXRFcnJvck1lc3NhZ2U6IHN0cmluZztcclxuICBxdWlja1RpY2tldEF0dGVtcHRJZDogc3RyaW5nO1xyXG4gIHF1aWNrVGlja2V0VHJhY2VMaXN0OiBBcnJheTx7IHN0ZXA6IHN0cmluZzsgdHJhY2VJZDogc3RyaW5nOyBhdDogc3RyaW5nIH0+O1xyXG4gIGhhc1BlbmRpbmdVcGxvYWRSZXRyeTogYm9vbGVhbjtcclxuICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZTogYm9vbGVhbjtcclxuICBvbkNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbiAgb25DYW5jZWw6ICgpID0+IHZvaWQ7XHJcbiAgb25TZWxlY3RlZENhbWVyYUZpbGU6IChmaWxlOiBGaWxlIHwgbnVsbCkgPT4gdm9pZDtcclxuICBvblNlbGVjdGVkR2FsbGVyeUZpbGU6IChmaWxlOiBGaWxlIHwgbnVsbCkgPT4gdm9pZDtcclxuICBvblNlbGVjdEZyb21DYW1lcmE6ICgpID0+IHZvaWQ7XHJcbiAgb25TZWxlY3RGcm9tR2FsbGVyeTogKCkgPT4gdm9pZDtcbiAgb25DbG9zZVNvdXJjZVBpY2tlcjogKCkgPT4gdm9pZDtcbiAgb25SZXRyeVBlbmRpbmdVcGxvYWQ6ICgpID0+IHZvaWQ7XG4gIG9uQ2xlYXJRdWlja1RpY2tldEVycm9yOiAoKSA9PiB2b2lkO1xufTtcblxyXG4vLyBSZW5kZXJzIG1vZGFsIGFuZCBxdWljay10aWNrZXQgb3ZlcmxheXMgZm9yIHRoZSBleHBlbnNlIHNoZWV0IGRldGFpbCBwYWdlLlxyXG5jb25zdCBFeHBlbnNlU2hlZXREZXRhaWxPdmVybGF5cyA9ICh7XHJcbiAgbW9kYWwsXHJcbiAgbW9kYWxFcnJvcixcclxuICBzdGF0dXMsXHJcbiAgYnVzeSxcclxuICBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsXHJcbiAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICBtb2RhbENhbmNlbFRleHQsXHJcbiAgbW9kYWxDb25maXJtVGV4dCxcclxuICBtb2RhbEJvZHksXHJcbiAgY2FtZXJhSW5wdXRSZWYsXHJcbiAgZ2FsbGVyeUlucHV0UmVmLFxyXG4gIHNvdXJjZVBpY2tlck9wZW4sXHJcbiAgcXVpY2tUaWNrZXRCdXN5LFxyXG4gIHF1aWNrVGlja2V0UHJvZ3Jlc3NNZXNzYWdlLFxyXG4gIHF1aWNrVGlja2V0UHJvZ3Jlc3NTdGFnZXMsXHJcbiAgcXVpY2tUaWNrZXRFbGFwc2VkTXMsXHJcbiAgcXVpY2tUaWNrZXRFcnJvck1lc3NhZ2UsXHJcbiAgcXVpY2tUaWNrZXRBdHRlbXB0SWQsXHJcbiAgcXVpY2tUaWNrZXRUcmFjZUxpc3QsXHJcbiAgaGFzUGVuZGluZ1VwbG9hZFJldHJ5LFxyXG4gIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlLFxyXG4gIG9uQ29uZmlybSxcclxuICBvbkNhbmNlbCxcclxuICBvblNlbGVjdGVkQ2FtZXJhRmlsZSxcclxuICBvblNlbGVjdGVkR2FsbGVyeUZpbGUsXHJcbiAgb25TZWxlY3RGcm9tQ2FtZXJhLFxyXG4gIG9uU2VsZWN0RnJvbUdhbGxlcnksXG4gIG9uQ2xvc2VTb3VyY2VQaWNrZXIsXG4gIG9uUmV0cnlQZW5kaW5nVXBsb2FkLFxuICBvbkNsZWFyUXVpY2tUaWNrZXRFcnJvcixcbn06IEV4cGVuc2VTaGVldERldGFpbE92ZXJsYXlzUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxDb25maXJtTW9kYWxcclxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxyXG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cclxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxyXG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbENvbmZpcm1UZXh0fVxyXG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cclxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cclxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxyXG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cclxuICAgICAgICBidXN5PXtidXN5IHx8IGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZX1cclxuICAgICAgICBlcnJvcj17bW9kYWxFcnJvcn1cclxuICAgICAgICBzdGF0dXM9e3N0YXR1c31cclxuICAgICAgICBvbkNvbmZpcm09e29uQ29uZmlybX1cclxuICAgICAgICBvbkNhbmNlbD17b25DYW5jZWx9XHJcbiAgICAgID5cclxuICAgICAgICB7bW9kYWxCb2R5fVxyXG4gICAgICA8L0NvbmZpcm1Nb2RhbD5cclxuXHJcbiAgICAgIDxpbnB1dFxyXG4gICAgICAgIHJlZj17Y2FtZXJhSW5wdXRSZWZ9XHJcbiAgICAgICAgdHlwZT1cImZpbGVcIlxyXG4gICAgICAgIGFjY2VwdD17VElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEV9XHJcbiAgICAgICAgY2FwdHVyZT1cImVudmlyb25tZW50XCJcclxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxyXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGZpbGUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmZpbGVzPy5bMF0gfHwgbnVsbDtcclxuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgICAgb25TZWxlY3RlZENhbWVyYUZpbGUoZmlsZSk7XHJcbiAgICAgICAgfX1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIDxpbnB1dFxyXG4gICAgICAgIHJlZj17Z2FsbGVyeUlucHV0UmVmfVxyXG4gICAgICAgIHR5cGU9XCJmaWxlXCJcclxuICAgICAgICBhY2NlcHQ9e1RJQ0tFVF9JTUFHRV9BQ0NFUFRfQVRUUklCVVRFfVxyXG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXHJcbiAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgZmlsZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZmlsZXM/LlswXSB8fCBudWxsO1xyXG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICBvblNlbGVjdGVkR2FsbGVyeUZpbGUoZmlsZSk7XHJcbiAgICAgICAgfX1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIHtzb3VyY2VQaWNrZXJPcGVuID8gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTYwMDAwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1zbGF0ZS05NTAvNDUgcHgtNCBweS02XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtYXgtdy1zbSByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZSBwLTQgc2hhZG93LXhsXCI+XHJcbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LVsxNnB4XSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtODAwXCI+XHJcbiAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfVGl0bGVcIiwgXCJOdWV2byB0aWNrZXRcIil9XHJcbiAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgICAgIHtpbmRUKFxyXG4gICAgICAgICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfQm9keVwiLFxyXG4gICAgICAgICAgICAgICAgXCJTZWxlY2Npb25hIHVuYSBmdWVudGUgcGFyYSBjYXB0dXJhciBvIGVsZWdpciBsYSBpbWFnZW4gZGVsIHRpY2tldC5cIlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDwvcD5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNCBncmlkIGdyaWQtY29scy0xIGdhcC0yXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCIgb25DbGljaz17b25TZWxlY3RGcm9tQ2FtZXJhfT5cclxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX0NhbWVyYVwiLCBcIlVzYXIgY1x1MDBFMW1hcmFcIil9XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCIgb25DbGljaz17b25TZWxlY3RGcm9tR2FsbGVyeX0+XHJcbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9HYWxsZXJ5XCIsIFwiRWxlZ2lyIGltYWdlblwiKX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIiBvbkNsaWNrPXtvbkNsb3NlU291cmNlUGlja2VyfT5cclxuICAgICAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKX1cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICA8RXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5XHJcbiAgICAgICAgb3Blbj17cXVpY2tUaWNrZXRCdXN5fVxyXG4gICAgICAgIHRpdGxlPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUHJvZ3Jlc3NfVGl0bGVcIiwgXCJQcm9jZXNzaW5nIHRpY2tldFwiKX1cclxuICAgICAgICBzdW1tYXJ5PXtxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICAgIGVsYXBzZWRNcz17cXVpY2tUaWNrZXRFbGFwc2VkTXN9XHJcbiAgICAgICAgc3RhZ2VzPXtxdWlja1RpY2tldFByb2dyZXNzU3RhZ2VzfVxyXG4gICAgICAvPlxyXG5cclxuICAgICAge3F1aWNrVGlja2V0RXJyb3JNZXNzYWdlID8gKFxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGNsYXNzTmFtZT17XHJcbiAgICAgICAgICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlXHJcbiAgICAgICAgICAgICAgPyBcImdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIHNwYWNlLXktMiByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLWFtYmVyLTIwMCBiZy1hbWJlci01MCBwLTMgdGV4dC1zbSB0ZXh0LWFtYmVyLTkwMFwiXHJcbiAgICAgICAgICAgICAgOiBcImdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIHNwYWNlLXktMiByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXJvc2UtNTAgcC0zIHRleHQtc20gdGV4dC1yb3NlLTgwMFwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPHA+e3F1aWNrVGlja2V0RXJyb3JNZXNzYWdlfTwvcD5cclxuICAgICAgICAgIHtxdWlja1RpY2tldEF0dGVtcHRJZCA/IChcclxuICAgICAgICAgICAgPHBcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICAgICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmVcclxuICAgICAgICAgICAgICAgICAgPyBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItYW1iZXItMjAwIGJnLXdoaXRlIHB4LTIgcHktMSBmb250LW1vbm8gdGV4dC1bMTFweF0gdGV4dC1hbWJlci05MDAgYnJlYWstYWxsXCJcclxuICAgICAgICAgICAgICAgICAgOiBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctd2hpdGUgcHgtMiBweS0xIGZvbnQtbW9ubyB0ZXh0LVsxMXB4XSB0ZXh0LXJvc2UtODAwIGJyZWFrLWFsbFwiXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge2BhdHRlbXB0SWQ6ICR7cXVpY2tUaWNrZXRBdHRlbXB0SWR9YH1cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICB7cXVpY2tUaWNrZXRUcmFjZUxpc3QubGVuZ3RoID4gMCA/IChcclxuICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17XHJcbiAgICAgICAgICAgICAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZVxyXG4gICAgICAgICAgICAgICAgICA/IFwicm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1hbWJlci0yMDAgYmctd2hpdGUgcC0yIHRleHQteHMgdGV4dC1hbWJlci04MDBcIlxyXG4gICAgICAgICAgICAgICAgICA6IFwicm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy13aGl0ZSBwLTIgdGV4dC14cyB0ZXh0LXJvc2UtNzAwXCJcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7cXVpY2tUaWNrZXRUcmFjZUxpc3QubWFwKChlbnRyeSkgPT4gKFxyXG4gICAgICAgICAgICAgICAgPHAga2V5PXtgJHtlbnRyeS5zdGVwfS0ke2VudHJ5LmF0fWB9PntgJHtlbnRyeS5zdGVwfTogJHtlbnRyeS50cmFjZUlkfWB9PC9wPlxyXG4gICAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTJcIj5cbiAgICAgICAgICAgIHtoYXNQZW5kaW5nVXBsb2FkUmV0cnkgPyAoXG4gICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIiBvbkNsaWNrPXtvblJldHJ5UGVuZGluZ1VwbG9hZH0+XG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9SZXRyeVVwbG9hZFwiLCBcIlJlaW50ZW50YXIgdXBsb2FkXCIpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHB4LTMgcHktMS41IHRleHQteHNcIiBvbkNsaWNrPXtvbkNsZWFyUXVpY2tUaWNrZXRFcnJvcn0+XHJcbiAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fQ2xvc2VcIiwgXCJDbG9zZVwiKX1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSA6IG51bGx9XHJcbiAgICA8Lz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0RGV0YWlsT3ZlcmxheXM7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcclxuaW1wb3J0IHsgdXNlQXV0aENvbnRleHQgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcclxuaW1wb3J0IHsgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUaW1lbGluZUNhcmRFZmZlY3RzLnRzXCI7XHJcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xyXG5pbXBvcnQgeyBjYW5BY2Nlc3MsIHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XG5pbXBvcnQgeyBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VNYW5hZ2VkVXNlclNjb3BlLnRzXCI7XHJcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsLCByZWxvYWRFeHBlbnNlUGFnZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBzYXZlRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQudHNcIjtcclxuaW1wb3J0IHsgc2F2ZUV4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VUaWNrZXRSZXR1cm5Db250ZXh0LnRzXCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VTdGF0dXNMYWJlbCB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZVN0YXR1c0NhdGFsb2cudHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zIH0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zLnRzXCI7XHJcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZSB9IGZyb20gXCIuLi9saXN0L3VzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZS50c1wiO1xuaW1wb3J0IHsgTGlua1RpY2tldEljb24sIE5ld0xpbmVJY29uLCBOZXdUaWNrZXRJY29uIH0gZnJvbSBcIi4vRXhwZW5zZVNoZWV0RGV0YWlsSWNvbnMudHN4XCI7XG5cclxuY29uc3QgTElORVNfUEFHRV9TSVpFID0gNjtcclxuY29uc3QgRVhQRU5TRV9TVEFUVVNfQVBQUk9WQUxfUkVRVUVTVEVEID0gMTtcclxuXHJcbmNvbnN0IHBhZ2VkU2xpY2UgPSA8VCw+KGl0ZW1zOiBUW10sIHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcik6IFRbXSA9PiB7XHJcbiAgaWYgKCFpdGVtcy5sZW5ndGgpIHJldHVybiBbXTtcclxuICBjb25zdCBzYWZlUGFnZSA9IE1hdGgubWF4KDEsIHBhZ2UpO1xyXG4gIGNvbnN0IHN0YXJ0ID0gKHNhZmVQYWdlIC0gMSkgKiBwYWdlU2l6ZTtcclxuICByZXR1cm4gaXRlbXMuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgcGFnZVNpemUpO1xyXG59O1xyXG5cclxuLy8gVHJlYXRzIG9ubHkgcG9zaXRpdmUgbnVtZXJpYyB0b3RhbHMgYXMgYWN0aW9uYWJsZSBzaGVldCBjb250ZW50LlxyXG5jb25zdCBoYXNQb3NpdGl2ZVRvdGFsQW1vdW50ID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcclxuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgJiYgcGFyc2VkID4gMDtcclxufTtcclxuXHJcbi8vIEluaXRpYWxpemVzIGF1dGggc2VlZCBmb3IgZXhwZW5zZSBBUEkgY2FsbHMgYmVmb3JlIGlzbGFuZCBlZmZlY3RzIHJ1bi5cbmV4cG9ydCBjb25zdCBib290c3RyYXBFeHBlbnNlQXBpQXV0aCA9ICgpID0+IHtcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgoe1xyXG4gICAgdG9rZW46IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXHJcbiAgICBlbnRyYU9pZDogc2FmZVRleHQod2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcclxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUFBfQ09ERV9fKSxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIE93bnMgdGhlIGRldGFpbC1wYWdlIG9yY2hlc3RyYXRpb24gYW5kIGtlZXBzIHRoZSB2aWV3IGNvbXBvbmVudCBmb2N1c2VkIG9uIHJlbmRlcmluZy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250cm9sbGVyID0gKCkgPT4ge1xyXG4gIGNvbnN0IHtcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIG1hbmFnZW1lbnRCb290c3RyYXBSZWFkeSxcclxuICB9ID0gdXNlQXV0aENvbnRleHQoKTtcclxuICBjb25zdCBoYXNBY2Nlc3MgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIlZpZXdcIik7XHJcbiAgY29uc3QgY2FuQ3JlYXRlRXhwZW5zZSA9IGNhbkFjY2VzcyhcIkdBU1RPU19IT0pBX0dBU1RPXCIsIFwiQWRkXCIpO1xyXG4gIGNvbnN0IHNoZWV0SWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1NIRUVUX0lEX18pO1xyXG4gIGNvbnN0IHNoZWV0TW9kZSA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfU0hFRVRfTU9ERV9fKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGNvbnN0IGlzQ3JlYXRlTW9kZSA9IHNoZWV0TW9kZSA9PT0gXCJjcmVhdGVcIjtcclxuICBjb25zdCBpc01hbmFnaW5nT3RoZXJVc2VyQnlTZWxlY3Rpb24gPSBpc01hbmFnaW5nT3RoZXJFeHBlbnNlUmVjb3JkKHtcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBzZWxlY3RlZE1hbmFnZWRVc2VySWQsXHJcbiAgICByZWNvcmRPd25lclVzZXJJZDogXCJcIixcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICB9KTtcclxuICBjb25zdCBjYW5DcmVhdGVFeHBlbnNlRm9yU2VsZWN0ZWRDb250ZXh0ID0gY2FuQ3JlYXRlRXhwZW5zZSAmJiAhaXNNYW5hZ2luZ090aGVyVXNlckJ5U2VsZWN0aW9uO1xyXG4gIGNvbnN0IGxpbmVDb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBjcmVhdGVkU2hlZXRJZFJlZiA9IHVzZVJlZihcIlwiKTtcclxuICBjb25zdCBjYW1lcmFJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgZ2FsbGVyeUlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLCBzZXRJc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGVdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtzdGF0dXNUcmFuc2l0aW9uQ29tbWVudCwgc2V0U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3Nob3dTdGF0dXNUcmFuc2l0aW9uQ29tbWVudEZpZWxkLCBzZXRTaG93U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRGaWVsZF0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3Qgc3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRSZWYgPSB1c2VSZWYoXCJcIik7XHJcblxyXG4gIGNvbnN0IHBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gKHtcclxuICAgICAgZmlyc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfRmlyc3RcIiwgXCJGaXJzdFwiKSxcclxuICAgICAgcHJldjogaW5kVChcIkhpc3RvcnlfUGFnZV9QcmV2XCIsIFwiUHJldmlvdXNcIiksXHJcbiAgICAgIG5leHQ6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIiksXHJcbiAgICAgIGxhc3Q6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTGFzdFwiLCBcIkxhc3RcIiksXHJcbiAgICB9KSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgZGV0YWlsU3RhdGUgPSB1c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZSh7XHJcbiAgICBoYXNBY2Nlc3MsXHJcbiAgICBjYW5DcmVhdGVFeHBlbnNlOiBjYW5DcmVhdGVFeHBlbnNlRm9yU2VsZWN0ZWRDb250ZXh0LFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgICBjdXJyZW50QXhVc2VySWQsXHJcbiAgICBjdXJyZW50Q3JtVXNlcklkLFxyXG4gICAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gICAgc2hlZXRJZCxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCB7XHJcbiAgICBoZWFkZXIsXHJcbiAgICBsaW5lcyxcclxuICAgIGxpbmVQYWdlLFxyXG4gICAgaXNMb2FkaW5nLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgYnVzeSxcclxuICAgIHN0YXR1cyxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIG1vZGFsRXJyb3IsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsXHJcbiAgICBwcm9qZWN0VmFsdWUsXHJcbiAgICBkZXRhaWxQb2xpY3ksXHJcbiAgICBpc01hbmFnaW5nT3RoZXJVc2VyLFxyXG4gICAgaXNTaGVldExvY2tlZCxcclxuICAgIGV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gICAgc2hvd0V4Y2hhbmdlUmF0ZSxcclxuICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxyXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LFxyXG4gICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXHJcbiAgICBjYW5FZGl0QW55Q3VycmVudCxcclxuICAgIGNhblVzZUZ1bGxFZGl0RmVhdHVyZXMsXHJcbiAgICBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcclxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxyXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gICAgc2V0TGluZVBhZ2UsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgc2V0TW9kYWxFcnJvcixcclxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBzZXREcmFmdFByb2plY3RJZCxcclxuICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICBzZXREcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUsXHJcbiAgICBoYW5kbGVPcGVuTGlua1RpY2tldE1vZGUsXHJcbiAgICBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0LFxyXG4gICAgbmF2aWdhdGVUb0xpbmVEZXRhaWwsXHJcbiAgfSA9IGRldGFpbFN0YXRlO1xyXG5cclxuICBjb25zdCBjYW5DcmVhdGVFeHBlbnNlRm9yQ3VycmVudFZpZXcgPSBjYW5DcmVhdGVFeHBlbnNlICYmICFpc01hbmFnaW5nT3RoZXJVc2VyO1xyXG4gIGNvbnN0IGNhbkRlbGV0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyA9IGRldGFpbFBvbGljeS5jYW5EZWxldGVTaGVldDtcclxuICBjb25zdCBjYW5UcmFuc2l0aW9uU3RhdHVzID0gZGV0YWlsUG9saWN5LnN0YXR1c0FjdGlvbnMubGVuZ3RoID4gMDtcclxuICBjb25zdCBpc1JlYWRPbmx5TW9kZSA9IGRldGFpbFBvbGljeS5pbnRlcmFjdGlvbk1vZGUgPT09IFwicmVhZF9vbmx5XCI7XHJcbiAgY29uc3QgY3VycmVudFN0YXR1c0NvZGUgPSB0eXBlb2YgaGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMgPT09IFwibnVtYmVyXCIgPyBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzIDogbnVsbDtcclxuICBjb25zdCBoaWRlc0NydWRUb3BiYXJCeVN0YXR1cyA9XHJcbiAgICBjdXJyZW50U3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfQVBQUk9WQUxfUkVRVUVTVEVEICYmICFjYW5FZGl0QW55Q3VycmVudDtcclxuICBjb25zdCB0b3BiYXJBY3Rpb25Nb2RlID0gIWlzQ3JlYXRlTW9kZSAmJiAoaXNSZWFkT25seU1vZGUgfHwgaGlkZXNDcnVkVG9wYmFyQnlTdGF0dXMpID8gXCJ2aWV3X29ubHlcIiA6IFwiZGVmYXVsdFwiO1xyXG4gIGNvbnN0IGRldGFpbFBlcm1pc3Npb25zUmVhZHkgPSBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHkgJiYgKGlzQ3JlYXRlTW9kZSB8fCAhIWhlYWRlcik7XHJcbiAgY29uc3QgeyBpbnZhbGlkYXRlQ2FjaGVkTGlzdEZvclJlZmV0Y2ggfSA9IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZSgpO1xyXG5cclxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcclxuICAgIGRlZmF1bHRDb25maXJtVGV4dDogaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiT0tcIiksXHJcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHJlc2V0U3RhdHVzVHJhbnNpdGlvbkRpYWxvZyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHN0YXR1c1RyYW5zaXRpb25Db21tZW50UmVmLmN1cnJlbnQgPSBcIlwiO1xyXG4gICAgc2V0U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnQoXCJcIik7XHJcbiAgICBzZXRTaG93U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRGaWVsZChmYWxzZSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDbG9zZUNvbmZpcm0gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICByZXNldFN0YXR1c1RyYW5zaXRpb25EaWFsb2coKTtcclxuICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gIH0sIFtjbG9zZUNvbmZpcm0sIHJlc2V0U3RhdHVzVHJhbnNpdGlvbkRpYWxvZ10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbENvbmZpcm0gPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XHJcbiAgICAgICAgc2V0U3RhdHVzKG1zZyk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuICB9LCBbYnVzeSwgaGFuZGxlQ29uZmlybSwgc2V0TW9kYWxFcnJvciwgc2V0U3RhdHVzXSk7XHJcblxyXG4gIGNvbnN0IG1vZGFsTG9hZGluZ1RleHQgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpO1xyXG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIik7XHJcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGJ1c3lcclxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxyXG4gICAgOiAhYnVzeSAmJiBtb2RhbEVycm9yXHJcbiAgICAgID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpXHJcbiAgICAgIDogKG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcclxuICAgICAgaGFuZGxlQ2xvc2VDb25maXJtKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2b2lkIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xyXG4gIH0sIFtidXN5LCBoYW5kbGVDbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybSwgbW9kYWxFcnJvcl0pO1xyXG5cclxuICBjb25zdCB2aXNpYmxlTGluZXMgPSB1c2VNZW1vKCgpID0+IHBhZ2VkU2xpY2UobGluZXMsIGxpbmVQYWdlLCBMSU5FU19QQUdFX1NJWkUpLCBbbGluZVBhZ2UsIGxpbmVzXSk7XHJcbiAgY29uc3QgdG90YWxMaW5lUGFnZXMgPSBNYXRoLmNlaWwoKGxpbmVzLmxlbmd0aCB8fCAwKSAvIExJTkVTX1BBR0VfU0laRSk7XG4gIGNvbnN0IHRvdGFsQW1vdW50VGV4dCA9IHVzZU1lbW8oXG4gICAgKCkgPT4gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGhlYWRlcj8udG90YWxBbW91bnQgPz8gbnVsbCwgc2FmZVRleHQoaGVhZGVyPy5jdXJyZW5jeUNvZGUpKSxcbiAgICBbaGVhZGVyPy5jdXJyZW5jeUNvZGUsIGhlYWRlcj8udG90YWxBbW91bnRdXG4gICk7XG4gIGNvbnN0IGhhc1N0YXR1c0FjdGlvbkNvbnRlbnQgPSBsaW5lcy5sZW5ndGggPiAwIHx8IGhhc1Bvc2l0aXZlVG90YWxBbW91bnQoaGVhZGVyPy50b3RhbEFtb3VudCk7XHJcbiAgY29uc3QgYXJlU3RhdHVzQWN0aW9uc0Rpc2FibGVkID0gIWhhc1N0YXR1c0FjdGlvbkNvbnRlbnQ7XG4gIGNvbnN0IG93bmVyRGlzcGxheSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IG93bmVyVXNlcklkID0gc2FmZVRleHQoaGVhZGVyPy51c2VySWQpO1xuICAgIGNvbnN0IGN1cnJlbnRVc2VySWQgPSBzYWZlVGV4dChjdXJyZW50Q3JtVXNlcklkKTtcbiAgICBpZiAoIW93bmVyVXNlcklkIHx8ICFjdXJyZW50VXNlcklkIHx8IG93bmVyVXNlcklkLnRvVXBwZXJDYXNlKCkgPT09IGN1cnJlbnRVc2VySWQudG9VcHBlckNhc2UoKSkge1xuICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuXG4gICAgY29uc3Qgb3duZXJOYW1lID0gc2FmZVRleHQoaGVhZGVyPy51c2VyTmFtZSk7XG4gICAgcmV0dXJuIG93bmVyTmFtZSA/IGAke293bmVyTmFtZX0gKCR7b3duZXJVc2VySWR9KWAgOiBvd25lclVzZXJJZDtcbiAgfSwgW2N1cnJlbnRDcm1Vc2VySWQsIGhlYWRlcj8udXNlcklkLCBoZWFkZXI/LnVzZXJOYW1lXSk7XG5cbiAgY29uc3QgeyBoYW5kbGVVcGRhdGUsIGhhbmRsZVN0YXR1c1RyYW5zaXRpb24sIGhhbmRsZURlbGV0ZSB9ID0gdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zKHtcbiAgICBidXN5LFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgaXNFZGl0TG9ja2VkOiBpc1JlYWRPbmx5TW9kZSxcclxuICAgIGlzRGVsZXRlTG9ja2VkOiBpc1NoZWV0TG9ja2VkLFxyXG4gICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXHJcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXHJcbiAgICBsb2NrZWRDdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSxcclxuICAgIGxvY2tlZEV4Y2hhbmdlUmF0ZTogc2FmZVRleHQoaGVhZGVyPy5leGNoUmF0ZSksXHJcbiAgICBjYW5DcmVhdGVFeHBlbnNlOiBjYW5DcmVhdGVFeHBlbnNlRm9yQ3VycmVudFZpZXcsXHJcbiAgICBjYW5FZGl0RXhwZW5zZTogY2FuRWRpdEFueUN1cnJlbnQsXHJcbiAgICBjYW5EZWxldGVFeHBlbnNlOiBjYW5EZWxldGVFeHBlbnNlRm9yQ3VycmVudFZpZXcsXHJcbiAgICBjYW5FZGl0SGVhZGVyRmllbGRzOiBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcclxuICAgIGNhblRyYW5zaXRpb25TdGF0dXMsXHJcbiAgICBzaGVldElkLFxyXG4gICAgZHJhZnREZXNjcmlwdGlvbixcclxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgZHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gICAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxyXG4gICAgY3VycmVudEV4cGVuc2VTaGVldFN0YXR1czogaGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMsXHJcbiAgICBjdXJyZW50RXhjaGFuZ2VSYXRlTW9kZTogaGVhZGVyPy5leGNoYW5nZVJhdGVNb2RlLFxyXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gICAgb25DcmVhdGVTdWNjZXNzOiAoY3JlYXRlZFNoZWV0SWQpID0+IHtcclxuICAgICAgY3JlYXRlZFNoZWV0SWRSZWYuY3VycmVudCA9IHNhZmVUZXh0KGNyZWF0ZWRTaGVldElkKTtcclxuICAgIH0sXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzRWRpdGluZyxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFuZGxlT3BlbkxpbmVEZXRhaWwgPSB1c2VDYWxsYmFjayhcclxuICAgIGFzeW5jIChsaW5lUmVjSWQ6IHN0cmluZykgPT4ge1xyXG4gICAgICBjb25zdCBzYWZlTGluZUlkID0gc2FmZVRleHQobGluZVJlY0lkKTtcclxuICAgICAgaWYgKCFzYWZlTGluZUlkIHx8IGJ1c3kgfHwgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50KSB7XHJcbiAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCBoYW5kbGVVcGRhdGUoKTtcclxuICAgICAgICBpZiAoIW9rKSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuYXZpZ2F0ZVRvTGluZURldGFpbChzYWZlTGluZUlkLCB7XHJcbiAgICAgICAgICBtb2RlOiBcImVkaXRcIixcclxuICAgICAgICAgIGFza0NvbmZpcm1hdGlvbjogZmFsc2UsXHJcbiAgICAgICAgICBieXBhc3NHdWFyZE9uY2U6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBuYXZpZ2F0ZVRvTGluZURldGFpbChzYWZlTGluZUlkKTtcclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50LFxyXG4gICAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICAgIGlzRWRpdGluZyxcclxuICAgICAgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLFxyXG4gICAgICBuYXZpZ2F0ZVRvTGluZURldGFpbCxcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVTYXZlU3VjY2VzcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgY29uc3QgY3JlYXRlZFNoZWV0SWQgPSBzYWZlVGV4dChjcmVhdGVkU2hlZXRJZFJlZi5jdXJyZW50KTtcclxuICAgICAgaWYgKCFjcmVhdGVkU2hlZXRJZCkgcmV0dXJuO1xyXG4gICAgICBzYXZlRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQoe1xyXG4gICAgICAgIHNoZWV0SWQ6IGNyZWF0ZWRTaGVldElkLFxyXG4gICAgICB9KTtcclxuICAgICAgc2V0SXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlKHRydWUpO1xyXG4gICAgICBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0KGNyZWF0ZWRTaGVldElkKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbG9hZEV4cGVuc2VQYWdlKCk7XHJcbiAgfSwgW2lzQ3JlYXRlTW9kZSwgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVTdGF0dXNBY3Rpb25DbGljayA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGFjdGlvbjogeyBsYWJlbEtleTogc3RyaW5nOyBmYWxsYmFjazogc3RyaW5nOyBuZXh0U3RhdHVzOiBudW1iZXIgfSkgPT4ge1xyXG4gICAgICBpZiAoIWhhc1N0YXR1c0FjdGlvbkNvbnRlbnQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGFjdGlvbkxhYmVsID0gaW5kVChhY3Rpb24ubGFiZWxLZXksIGFjdGlvbi5mYWxsYmFjayk7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRTdGF0dXNMYWJlbCA9XHJcbiAgICAgICAgaGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMgPT09IG51bGwgfHwgaGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMgPT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgPyBpbmRUKFwiQ29tbW9uX05vRGF0YVwiLCBcIk5vIGRhdGFcIilcclxuICAgICAgICAgIDogZ2V0RXhwZW5zZVN0YXR1c0xhYmVsKGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMpO1xyXG4gICAgICBjb25zdCBuZXh0U3RhdHVzTGFiZWwgPSBnZXRFeHBlbnNlU3RhdHVzTGFiZWwoYWN0aW9uLm5leHRTdGF0dXMpO1xyXG4gICAgICBjb25zdCB0cmFuc2l0aW9uTWVzc2FnZSA9IGluZEZvcm1hdChcclxuICAgICAgICBcIkV4cGVuc2VTaGVldHNfQm90dG9tQWN0aW9uc19Db25maXJtVHJhbnNpdGlvblwiLFxyXG4gICAgICAgIFwiQ3VycmVudCBzdGF0dXM6IHswfVxcbk5ldyBzdGF0dXM6IHsxfVxcblxcbkRvIHlvdSB3YW50IHRvIHVwZGF0ZSB0aGUgZXhwZW5zZSBzaGVldCBzdGF0dXM/XCIsXHJcbiAgICAgICAgY3VycmVudFN0YXR1c0xhYmVsLFxyXG4gICAgICAgIG5leHRTdGF0dXNMYWJlbFxyXG4gICAgICApLnJlcGxhY2UoL1xcXFxuL2csIFwiXFxuXCIpO1xyXG4gICAgICBjb25zdCBpbml0aWFsQ29tbWVudCA9IHNhZmVUZXh0KGhlYWRlcj8uZXN0YWRvQ29tZW50YXJpb3MpO1xyXG4gICAgICBzdGF0dXNUcmFuc2l0aW9uQ29tbWVudFJlZi5jdXJyZW50ID0gaW5pdGlhbENvbW1lbnQ7XHJcbiAgICAgIHNldFN0YXR1c1RyYW5zaXRpb25Db21tZW50KGluaXRpYWxDb21tZW50KTtcclxuICAgICAgc2V0U2hvd1N0YXR1c1RyYW5zaXRpb25Db21tZW50RmllbGQodHJ1ZSk7XHJcblxyXG4gICAgICBvcGVuQ29uZmlybSh7XHJcbiAgICAgICAgdGl0bGU6IGFjdGlvbkxhYmVsLFxyXG4gICAgICAgIG1lc3NhZ2U6IHRyYW5zaXRpb25NZXNzYWdlLFxyXG4gICAgICAgIGNvbmZpcm1UZXh0OiBhY3Rpb25MYWJlbCxcclxuICAgICAgICBvbkNvbmZpcm06IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgaGFuZGxlU3RhdHVzVHJhbnNpdGlvbihcclxuICAgICAgICAgICAgYWN0aW9uLm5leHRTdGF0dXMsXHJcbiAgICAgICAgICAgIGFjdGlvbkxhYmVsLFxyXG4gICAgICAgICAgICBzdGF0dXNUcmFuc2l0aW9uQ29tbWVudFJlZi5jdXJyZW50XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgICAgaWYgKG9rKSB7XHJcbiAgICAgICAgICAgIGludmFsaWRhdGVDYWNoZWRMaXN0Rm9yUmVmZXRjaCgpO1xyXG4gICAgICAgICAgICByZXNldFN0YXR1c1RyYW5zaXRpb25EaWFsb2coKTtcclxuICAgICAgICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgICAgICAgIHJlbG9hZEV4cGVuc2VQYWdlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gb2s7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBjbG9zZUNvbmZpcm0sXHJcbiAgICAgIGhhbmRsZVN0YXR1c1RyYW5zaXRpb24sXHJcbiAgICAgIGhhc1N0YXR1c0FjdGlvbkNvbnRlbnQsXHJcbiAgICAgIGhlYWRlcj8uZXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICAgIGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzLFxyXG4gICAgICBpbnZhbGlkYXRlQ2FjaGVkTGlzdEZvclJlZmV0Y2gsXHJcbiAgICAgIG9wZW5Db25maXJtLFxyXG4gICAgICByZXNldFN0YXR1c1RyYW5zaXRpb25EaWFsb2csXHJcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgdXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9ucyh7XHJcbiAgICBidXN5OiBidXN5IHx8IGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSxcclxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGFjdGlvbk1vZGU6IHRvcGJhckFjdGlvbk1vZGUsXHJcbiAgICBpc0xvY2tlZDogaXNTaGVldExvY2tlZCxcclxuICAgIGlzRWRpdExvY2tlZDogaXNSZWFkT25seU1vZGUsXHJcbiAgICBpc0RlbGV0ZUxvY2tlZDogaXNTaGVldExvY2tlZCxcclxuICAgIHBlcm1pc3Npb25zUmVhZHk6IGRldGFpbFBlcm1pc3Npb25zUmVhZHksXHJcbiAgICBjYW5DcmVhdGVFeHBlbnNlOiBjYW5DcmVhdGVFeHBlbnNlRm9yQ3VycmVudFZpZXcsXHJcbiAgICBjYW5FZGl0RXhwZW5zZTogY2FuRWRpdEFueUN1cnJlbnQsXHJcbiAgICBjYW5EZWxldGVFeHBlbnNlOiBjYW5EZWxldGVFeHBlbnNlRm9yQ3VycmVudFZpZXcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBvblNhdmVTdWNjZXNzOiBoYW5kbGVTYXZlU3VjY2VzcyxcclxuICAgIG9uRGVsZXRlU3VjY2VzczogKCkgPT4ge1xyXG4gICAgICBpbnZhbGlkYXRlQ2FjaGVkTGlzdEZvclJlZmV0Y2goKTtcclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL0V4cGVuc2VTaGVldHNcIik7XHJcbiAgICB9LFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHJlc29sdmVDbGlja2FibGVDYXJkID0gdXNlQ2FsbGJhY2soKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XHJcbiAgICBjb25zdCBub2RlID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcclxuICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xyXG4gICAgY29uc3QgY2FyZCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIpO1xyXG4gICAgaWYgKCFjYXJkKSByZXR1cm4gbnVsbDtcclxuICAgIGlmICghbGluZUNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyhjYXJkKSkgcmV0dXJuIG51bGw7XHJcbiAgICByZXR1cm4gY2FyZDtcclxuICB9LCBbXSk7XHJcblxyXG4gIHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMoe1xyXG4gICAgY29udGFpbmVyUmVmOiBsaW5lQ29udGFpbmVyUmVmLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgaXRlbXM6IHZpc2libGVMaW5lcyxcclxuICAgIHJlc29sdmVDbGlja2FibGVDYXJkLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBxdWlja1RpY2tldEZsb3cgPSB1c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3coe1xyXG4gICAgc2hlZXRJZDogc2FmZVRleHQoaGVhZGVyPy5ob2phR2FzdG9zSWQgfHwgc2hlZXRJZCksXHJcbiAgICBwcm9qZWN0SWQ6IHByb2plY3RWYWx1ZSxcclxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQoaGVhZGVyPy5jdXJyZW5jeUNvZGUpLFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogIWlzQ3JlYXRlTW9kZSAmJiBkZXRhaWxQb2xpY3kuc2hvd0ZhYixcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzU2hlZXRMb2NrZWQ6ICFjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzLFxyXG4gICAgbGlua1RvU2hlZXQ6IGZhbHNlLFxyXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXHJcbiAgICBvbkNvbXBsZXRlZDogKHJlc3VsdCkgPT4ge1xyXG4gICAgICBjb25zdCBjcmVhdGVkRmlsZUlkID0gc2FmZVRleHQocmVzdWx0Py5maWxlSWQpO1xyXG4gICAgICBpZiAoIWNyZWF0ZWRGaWxlSWQpIHtcclxuICAgICAgICByZWxvYWRFeHBlbnNlUGFnZSgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHJlc3VsdD8ubGlua2VkVG9TaGVldCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHJlbG9hZEV4cGVuc2VQYWdlKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjdXJyZW50U2hlZXRJZCA9IHNhZmVUZXh0KGhlYWRlcj8uaG9qYUdhc3Rvc0lkIHx8IHNoZWV0SWQpO1xyXG4gICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xyXG4gICAgICAgIGZpbGVJZDogY3JlYXRlZEZpbGVJZCxcclxuICAgICAgICBtb2RlOiBcImVkaXRcIixcclxuICAgICAgICBvcmlnaW46IFwic2hlZXQtY3JlYXRlXCIsXHJcbiAgICAgIH0pO1xyXG4gICAgICBpZiAoY3VycmVudFNoZWV0SWQpIHtcclxuICAgICAgICBzYXZlRXhwZW5zZVRpY2tldFJldHVybkNvbnRleHQoe1xyXG4gICAgICAgICAgZmlsZUlkOiBjcmVhdGVkRmlsZUlkLFxyXG4gICAgICAgICAgb3JpZ2luOiBcInNoZWV0LWNyZWF0ZVwiLFxyXG4gICAgICAgICAgc2hlZXRJZDogY3VycmVudFNoZWV0SWQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcXVlcnkuc2V0KFwic2hlZXRJZFwiLCBjdXJyZW50U2hlZXRJZCk7XHJcbiAgICAgIH1cclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGZhYk1lbnVJdGVtcyA9IHVzZU1lbW88RmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbVtdPihcclxuICAgICgpID0+IFtcclxuICAgICAge1xyXG4gICAgICAgIGlkOiBcIm5ldy10aWNrZXRcIixcclxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX05ld1RpY2tldFwiLCBcIk51ZXZvIFRpY2tldFwiKSxcclxuICAgICAgICBpY29uOiA8TmV3VGlja2V0SWNvbiAvPixcclxuICAgICAgICBvbkNsaWNrOiBxdWlja1RpY2tldEZsb3cub3BlblNvdXJjZVBpY2tlcixcclxuICAgICAgfSxcclxuICAgICAge1xyXG4gICAgICAgIGlkOiBcImxpbmstdGlja2V0XCIsXHJcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9MaW5rVGlja2V0XCIsIFwiVmluY3VsYXIgVGlja2V0XCIpLFxyXG4gICAgICAgIGljb246IDxMaW5rVGlja2V0SWNvbiAvPixcclxuICAgICAgICBvbkNsaWNrOiBoYW5kbGVPcGVuTGlua1RpY2tldE1vZGUsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogXCJuZXctbGluZVwiLFxyXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfTmV3TGluZVwiLCBcIk51ZXZhIExpbmVhXCIpLFxyXG4gICAgICAgIGljb246IDxOZXdMaW5lSWNvbiAvPixcclxuICAgICAgICBvbkNsaWNrOiBoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUsXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgW2hhbmRsZU9wZW5DcmVhdGVMaW5lTW9kZSwgaGFuZGxlT3BlbkxpbmtUaWNrZXRNb2RlLCBxdWlja1RpY2tldEZsb3cub3BlblNvdXJjZVBpY2tlcl1cclxuICApO1xyXG5cclxuICBjb25zdCBzaG93U3RhdHVzQWN0aW9uQmFyID1cclxuICAgICFpc0NyZWF0ZU1vZGUgJiYgIWlzTG9hZGluZyAmJiAhaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlICYmICFlcnJvck1lc3NhZ2UgJiYgZGV0YWlsUG9saWN5LnN0YXR1c0FjdGlvbnMubGVuZ3RoID4gMDtcclxuICBjb25zdCBzaG93RmFiID0gIWlzQ3JlYXRlTW9kZSAmJiBkZXRhaWxQb2xpY3kuc2hvd0ZhYjtcclxuICBjb25zdCBoYXNWaXNpYmxlU3RhdHVzQ29tbWVudCA9IHNhZmVUZXh0KGhlYWRlcj8uZXN0YWRvQ29tZW50YXJpb3MpLnRyaW0oKS5sZW5ndGggPiAwO1xyXG4gIGNvbnN0IHN0YXR1c0NvbW1lbnRNb2RlOiBcImhpZGRlblwiIHwgXCJyZWFkXCIgPSBoYXNWaXNpYmxlU3RhdHVzQ29tbWVudCA/IFwicmVhZFwiIDogXCJoaWRkZW5cIjtcclxuICBjb25zdCBtb2RhbEJvZHkgPSBzaG93U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnRGaWVsZCA/IChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cclxuICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPlxyXG4gICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TdGF0dXNDb21tZW50XCIsIFwiU3RhdHVzIGNvbW1lbnRcIil9XHJcbiAgICAgIDwvbGFiZWw+XHJcbiAgICAgIDx0ZXh0YXJlYVxyXG4gICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbCByZXNpemUtbm9uZVwiXHJcbiAgICAgICAgcm93cz17M31cclxuICAgICAgICB2YWx1ZT17c3RhdHVzVHJhbnNpdGlvbkNvbW1lbnR9XHJcbiAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgbmV4dFZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCI7XHJcbiAgICAgICAgICBzdGF0dXNUcmFuc2l0aW9uQ29tbWVudFJlZi5jdXJyZW50ID0gbmV4dFZhbHVlO1xyXG4gICAgICAgICAgc2V0U3RhdHVzVHJhbnNpdGlvbkNvbW1lbnQobmV4dFZhbHVlKTtcclxuICAgICAgICB9fVxyXG4gICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1N0YXR1c0NvbW1lbnRcIiwgXCJTdGF0dXMgY29tbWVudFwiKX1cclxuICAgICAgLz5cclxuICAgIDwvZGl2PlxyXG4gICkgOiBudWxsO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgc2hlZXRJZCxcclxuICAgIGhlYWRlcixcclxuICAgIHZpc2libGVMaW5lcyxcclxuICAgIGxpbmVQYWdlLFxyXG4gICAgdG90YWxMaW5lUGFnZXMsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBidXN5LFxyXG4gICAgc3RhdHVzLFxyXG4gICAgbW9kYWxFcnJvcixcclxuICAgIGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSxcclxuICAgIG1vZGFsLFxyXG4gICAgbW9kYWxMb2FkaW5nVGV4dCxcclxuICAgIG1vZGFsQ2FuY2VsVGV4dCxcclxuICAgIG1vZGFsQ29uZmlybVRleHQsXHJcbiAgICBtb2RhbEJvZHksXHJcbiAgICBjYW5DcmVhdGVFeHBlbnNlRm9yQ3VycmVudFZpZXcsXHJcbiAgICBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcclxuICAgIGNhblVzZUZ1bGxFZGl0RmVhdHVyZXMsXHJcbiAgICBzaG93U3RhdHVzQWN0aW9uQmFyLFxyXG4gICAgc2hvd0ZhYixcclxuICAgIGFyZVN0YXR1c0FjdGlvbnNEaXNhYmxlZCxcclxuICAgIGZhYk1lbnVJdGVtcyxcclxuICAgIHBhZ2luYXRpb25MYWJlbHMsXHJcbiAgICB0b3RhbEFtb3VudFRleHQsXHJcbiAgICBzdGF0dXNDb21tZW50TW9kZSxcbiAgICBvd25lckRpc3BsYXksXG4gICAgcHJvamVjdFZhbHVlLFxuICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxyXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LFxyXG4gICAgc2hvd0V4Y2hhbmdlUmF0ZSxcclxuICAgIGV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXHJcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgZHJhZnRQcm9qZWN0SWQsXHJcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSxcclxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxyXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gICAgZGV0YWlsUG9saWN5LFxyXG4gICAgbGluZUNvbnRhaW5lclJlZixcclxuICAgIGNhbWVyYUlucHV0UmVmLFxyXG4gICAgZ2FsbGVyeUlucHV0UmVmLFxyXG4gICAgcXVpY2tUaWNrZXRGbG93LFxyXG4gICAgc2V0TGluZVBhZ2UsXHJcbiAgICBzZXREcmFmdERlc2NyaXB0aW9uLFxyXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXHJcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcclxuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcclxuICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsOiBoYW5kbGVPcGVuTGluZURldGFpbCxcclxuICAgIGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSxcclxuICAgIGhhbmRsZVN0YXR1c0FjdGlvbkNsaWNrLFxyXG4gICAgY2xvc2VDb25maXJtOiBoYW5kbGVDbG9zZUNvbmZpcm0sXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7XHJcbiAgZ2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LFxyXG4gIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnksXHJcbiAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LFxyXG59IGZyb20gXCIuLi8uLi8uLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4vZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgZ2V0RXhwZW5zZVNjb3BlVG9rZW4gfSBmcm9tIFwiLi9leHBlbnNlU2NvcGUudHNcIjtcclxuXHJcbmNvbnN0IEVYUEVOU0VfU0hFRVRfQ1JFQVRFRF9SRVRVUk5fQ09OVEVYVF9LRVlfUFJFRklYID0gXCJleHBlbnNlX3NoZWV0X2NyZWF0ZWRfcmV0dXJuX2NvbnRleHRfdjFcIjtcclxuY29uc3QgRVhQRU5TRV9TSEVFVF9DUkVBVEVEX1JFVFVSTl9DT05URVhUX1RUTF9NUyA9IDIgKiA2MCAqIDYwICogMTAwMDtcclxuXHJcbmV4cG9ydCB0eXBlIEV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0ID0ge1xyXG4gIHNoZWV0SWQ6IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IGdldFNjb3BlZEtleSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBgJHtFWFBFTlNFX1NIRUVUX0NSRUFURURfUkVUVVJOX0NPTlRFWFRfS0VZX1BSRUZJWH1fJHtnZXRFeHBlbnNlU2NvcGVUb2tlbigpfWA7XHJcbn07XHJcblxyXG4vLyBOb3JtYWxpemVzIHRoZSBjcmVhdGVkLXNoZWV0IHJldHVybiBwYXlsb2FkIHVzZWQgYmV0d2VlbiBjcmVhdGUgYW5kIGRldGFpbCBmbG93cy5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0ID0gKFxyXG4gIHZhbHVlOiB1bmtub3duXHJcbik6IEV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0IHwgbnVsbCA9PiB7XHJcbiAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCBwYXlsb2FkID0gdmFsdWUgYXMgUGFydGlhbDxFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dD47XHJcbiAgY29uc3Qgc2hlZXRJZCA9IHNhZmVUZXh0KHBheWxvYWQuc2hlZXRJZCk7XHJcbiAgaWYgKCFzaGVldElkKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNoZWV0SWQsXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIFJlYWRzIHRoZSBzdG9yZWQgY3JlYXRlZC1zaGVldCByZXR1cm4gY29udGV4dCBmb3IgdGhlIGFjdGl2ZSBleHBlbnNlIHNjb3BlLlxyXG5leHBvcnQgY29uc3QgcmVhZEV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0ID0gKFxyXG4gIHNoZWV0SWQ/OiB1bmtub3duXHJcbik6IEV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0IHwgbnVsbCA9PiB7XHJcbiAgY29uc3Qgc3RvcmVkID0gbm9ybWFsaXplRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQoXHJcbiAgICBnZXRTZXNzaW9uSnNvbldpdGhFeHBpcnk8RXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQ+KGdldFNjb3BlZEtleSgpKVxyXG4gICk7XHJcbiAgaWYgKCFzdG9yZWQpIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KHNoZWV0SWQpO1xyXG4gIGlmICghc2FmZVNoZWV0SWQpIHJldHVybiBzdG9yZWQ7XHJcbiAgcmV0dXJuIHN0b3JlZC5zaGVldElkLnRvVXBwZXJDYXNlKCkgPT09IHNhZmVTaGVldElkLnRvVXBwZXJDYXNlKCkgPyBzdG9yZWQgOiBudWxsO1xyXG59O1xyXG5cclxuLy8gQ2xlYXJzIHRoZSBjcmVhdGVkLXNoZWV0IHJldHVybiBjb250ZXh0IGZvciB0aGUgYWN0aXZlIGV4cGVuc2Ugc2NvcGUuXHJcbmV4cG9ydCBjb25zdCBjbGVhckV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0ID0gKCk6IHZvaWQgPT4ge1xyXG4gIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoZ2V0U2NvcGVkS2V5KCkpO1xyXG59O1xyXG5cclxuLy8gUGVyc2lzdHMgdGhlIGNyZWF0ZWQtc2hlZXQgY29udGV4dCBzbyB0aGUgbmV4dCBkZXRhaWwgcGFnZSBjYW4gYXJtIHRoZSBsaXN0IHJldHVybiBzdGF0ZS5cclxuZXhwb3J0IGNvbnN0IHNhdmVFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCA9IChcclxuICB2YWx1ZTogRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQgfCBudWxsIHwgdW5kZWZpbmVkXHJcbik6IEV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0IHwgbnVsbCA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0KHZhbHVlKTtcclxuICBpZiAoIW5vcm1hbGl6ZWQpIHtcclxuICAgIGNsZWFyRXhwZW5zZVNoZWV0Q3JlYXRlZFJldHVybkNvbnRleHQoKTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5KGdldFNjb3BlZEtleSgpLCBub3JtYWxpemVkLCBFWFBFTlNFX1NIRUVUX0NSRUFURURfUkVUVVJOX0NPTlRFWFRfVFRMX01TKTtcclxuICByZXR1cm4gbm9ybWFsaXplZDtcclxufTtcclxuXHJcbi8vIENvbnN1bWVzIHRoZSBjcmVhdGVkLXNoZWV0IGNvbnRleHQgb25jZSB0aGUgbWF0Y2hpbmcgZGV0YWlsIHBhZ2UgaXMgbG9hZGVkLlxyXG5leHBvcnQgY29uc3QgY29uc3VtZUV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0ID0gKFxyXG4gIHNoZWV0SWQ/OiB1bmtub3duXHJcbik6IEV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0IHwgbnVsbCA9PiB7XHJcbiAgY29uc3Qgc3RvcmVkID0gcmVhZEV4cGVuc2VTaGVldENyZWF0ZWRSZXR1cm5Db250ZXh0KHNoZWV0SWQpO1xyXG4gIGlmICghc3RvcmVkKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY2xlYXJFeHBlbnNlU2hlZXRDcmVhdGVkUmV0dXJuQ29udGV4dCgpO1xyXG4gIHJldHVybiBzdG9yZWQ7XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0LCBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0IH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBleGVjdXRlRXhwZW5zZU11dGF0aW9uLCBwYXJzZURlY2ltYWxJbnB1dCB9IGZyb20gXCIuLi9ob29rcy9leHBlbnNlTXV0YXRpb25VdGlscy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGNyZWF0ZUV4cGVuc2VTaGVldCxcclxuICBkZWxldGVFeHBlbnNlU2hlZXQsXHJcbiAgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyLFxyXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcblxyXG5jb25zdCBTQU1FX0NVUlJFTkNZX0VYQ0hBTkdFX1JBVEUgPSAxMDA7XHJcblxyXG50eXBlIFVzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xyXG4gIGlzRWRpdExvY2tlZDogYm9vbGVhbjtcclxuICBpc0RlbGV0ZUxvY2tlZDogYm9vbGVhbjtcclxuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogYm9vbGVhbjtcclxuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XHJcbiAgbG9ja2VkQ3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgbG9ja2VkRXhjaGFuZ2VSYXRlOiBzdHJpbmc7XHJcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcclxuICBjYW5FZGl0RXhwZW5zZTogYm9vbGVhbjtcclxuICBjYW5EZWxldGVFeHBlbnNlOiBib29sZWFuO1xyXG4gIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGJvb2xlYW47XHJcbiAgY2FuVHJhbnNpdGlvblN0YXR1czogYm9vbGVhbjtcclxuICBzaGVldElkOiBzdHJpbmc7XHJcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZHJhZnRFeGNoYW5nZVJhdGU6IHN0cmluZztcclxuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlOiBzdHJpbmc7XHJcbiAgZHJhZnRQcm9qZWN0SWQ6IHN0cmluZztcclxuICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zOiBzdHJpbmc7XHJcbiAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5OiBzdHJpbmc7XHJcbiAgY3VycmVudEV4cGVuc2VTaGVldFN0YXR1cz86IG51bWJlciB8IG51bGw7XHJcbiAgY3VycmVudEV4Y2hhbmdlUmF0ZU1vZGU/OiBudW1iZXIgfCBudWxsO1xyXG4gIG9uQ3JlYXRlU3VjY2VzczogKGNyZWF0ZWRTaGVldElkOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0QnVzeTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG4gIHNldFN0YXR1czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVFeGNoYW5nZVJhdGUgPSAocmF3OiBzdHJpbmcpOiBudW1iZXIgfCBudWxsID0+IHBhcnNlRGVjaW1hbElucHV0KHJhdyk7XHJcbi8vIENvbXBhcmVzIHJhdGVzIHdpdGggdG9sZXJhbmNlIHRvIGF2b2lkIGZsb2F0aW5nIHBvaW50IG1pc21hdGNoIG9uIHBheWxvYWQgbW9kZS5cclxuY29uc3QgYXJlUmF0ZXNFcXVpdmFsZW50ID0gKGxlZnQ6IG51bWJlciB8IG51bGwsIHJpZ2h0OiBudW1iZXIgfCBudWxsKTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKGxlZnQgPT0gbnVsbCB8fCByaWdodCA9PSBudWxsKSByZXR1cm4gZmFsc2U7XHJcbiAgcmV0dXJuIE1hdGguYWJzKGxlZnQgLSByaWdodCkgPCAwLjAwMDAwMDE7XHJcbn07XHJcblxyXG4vLyBFbmNhcHN1bGF0ZXMgdXBkYXRlIGFuZCBkZWxldGUgbXV0YXRpb25zIGZvciBleHBlbnNlIHNoZWV0IGhlYWRlciBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGlzQ3JlYXRlTW9kZSxcclxuICBpc0VkaXRMb2NrZWQsXHJcbiAgaXNEZWxldGVMb2NrZWQsXHJcbiAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXHJcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gIGxvY2tlZEN1cnJlbmN5Q29kZSxcclxuICBsb2NrZWRFeGNoYW5nZVJhdGUsXHJcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcclxuICBjYW5FZGl0RXhwZW5zZSxcclxuICBjYW5EZWxldGVFeHBlbnNlLFxyXG4gIGNhbkVkaXRIZWFkZXJGaWVsZHMsXHJcbiAgY2FuVHJhbnNpdGlvblN0YXR1cyxcclxuICBzaGVldElkLFxyXG4gIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgZHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcclxuICBkcmFmdFByb2plY3RJZCxcclxuICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxyXG4gIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcclxuICBjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzLFxyXG4gIGN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlLFxyXG4gIG9uQ3JlYXRlU3VjY2VzcyxcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIHNldEJ1c3ksXHJcbiAgc2V0U3RhdHVzLFxyXG4gIHNldElzRWRpdGluZyxcclxufTogVXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zQXJncykgPT4ge1xyXG4gIGNvbnN0IGJ1aWxkVXBkYXRlUGF5bG9hZCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKFxyXG4gICAgICBuZXh0U3RhdHVzPzogbnVtYmVyIHwgbnVsbCxcclxuICAgICAgc3RhdHVzQ29tbWVudE92ZXJyaWRlPzogc3RyaW5nIHwgbnVsbFxyXG4gICAgKTogeyBwYXlsb2FkOiBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0IH0gfCB7IGVycm9yOiBzdHJpbmcgfSA9PiB7XHJcbiAgICAgIGNvbnN0IGhhc0V4cGxpY2l0U3RhdHVzQ29tbWVudE92ZXJyaWRlID0gc3RhdHVzQ29tbWVudE92ZXJyaWRlICE9PSB1bmRlZmluZWQ7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW5jeSA9IFN0cmluZyhcclxuICAgICAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyA/IChsb2NrZWRDdXJyZW5jeUNvZGUgfHwgZHJhZnRDdXJyZW5jeUNvZGUgfHwgXCJcIikgOiAoZHJhZnRDdXJyZW5jeUNvZGUgfHwgXCJcIilcclxuICAgICAgKVxyXG4gICAgICAgIC50cmltKClcclxuICAgICAgICAudG9VcHBlckNhc2UoKTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZERlc2NyaXB0aW9uID0gU3RyaW5nKGRyYWZ0RGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkUHJvamVjdElkID0gU3RyaW5nKGRyYWZ0UHJvamVjdElkIHx8IFwiXCIpLnRyaW0oKTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZEVzdGFkb0NvbWVudGFyaW9zID0gU3RyaW5nKFxyXG4gICAgICAgIHN0YXR1c0NvbW1lbnRPdmVycmlkZSA/PyBkcmFmdEVzdGFkb0NvbWVudGFyaW9zID8/IFwiXCJcclxuICAgICAgKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRFeGNoYW5nZVJhdGVSYXcgPSBTdHJpbmcoXHJcbiAgICAgICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzID8gKGxvY2tlZEV4Y2hhbmdlUmF0ZSB8fCBkcmFmdEV4Y2hhbmdlUmF0ZSB8fCBcIlwiKSA6IChkcmFmdEV4Y2hhbmdlUmF0ZSB8fCBcIlwiKVxyXG4gICAgICApO1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkQmFzZUN1cnJlbmN5ID0gU3RyaW5nKGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSB8fCBcIkVVUlwiKS50cmltKCkudG9VcHBlckNhc2UoKSB8fCBcIkVVUlwiO1xyXG4gICAgICBjb25zdCByZXF1aXJlc0V4Y2hhbmdlUmF0ZSA9XHJcbiAgICAgICAgY2FuRWRpdEhlYWRlckZpZWxkcyAmJiBub3JtYWxpemVkQ3VycmVuY3kgIT09IFwiXCIgJiYgbm9ybWFsaXplZEN1cnJlbmN5ICE9PSBub3JtYWxpemVkQmFzZUN1cnJlbmN5O1xyXG4gICAgICBjb25zdCB1c2VzU2FtZUN1cnJlbmN5UmF0ZSA9IGNhbkVkaXRIZWFkZXJGaWVsZHMgJiYgbm9ybWFsaXplZEN1cnJlbmN5ICE9PSBcIlwiICYmICFyZXF1aXJlc0V4Y2hhbmdlUmF0ZTtcclxuICAgICAgY29uc3QgcGFyc2VkRXhjaGFuZ2VSYXRlID0gbm9ybWFsaXplRXhjaGFuZ2VSYXRlKG5vcm1hbGl6ZWRFeGNoYW5nZVJhdGVSYXcpO1xyXG4gICAgICBjb25zdCBvZmZpY2lhbEV4Y2hhbmdlUmF0ZSA9IG5vcm1hbGl6ZUV4Y2hhbmdlUmF0ZShvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKTtcclxuICAgICAgY29uc3Qgb3JpZ2luYWxFeGNoYW5nZVJhdGUgPSBub3JtYWxpemVFeGNoYW5nZVJhdGUobG9ja2VkRXhjaGFuZ2VSYXRlKTtcclxuICAgICAgY29uc3QgcGFyc2VkQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUgPSBOdW1iZXIoY3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUpO1xyXG4gICAgICBjb25zdCBoYXNDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA9IE51bWJlci5pc0ludGVnZXIocGFyc2VkQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUpICYmIHBhcnNlZEN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlID49IDA7XHJcbiAgICAgIGNvbnN0IGhhc1ZhbGlkUmF0ZSA9IHBhcnNlZEV4Y2hhbmdlUmF0ZSAhPSBudWxsICYmIHBhcnNlZEV4Y2hhbmdlUmF0ZSA+IDA7XHJcbiAgICAgIGNvbnN0IGhhc01hbnVhbFJhdGVFZGl0T25VcGRhdGUgPVxyXG4gICAgICAgIGNhbkVkaXRIZWFkZXJGaWVsZHMgJiZcclxuICAgICAgICAhaXNDcmVhdGVNb2RlICYmXHJcbiAgICAgICAgaGFzVmFsaWRSYXRlICYmXHJcbiAgICAgICAgKG9yaWdpbmFsRXhjaGFuZ2VSYXRlID09IG51bGwgfHwgIWFyZVJhdGVzRXF1aXZhbGVudChwYXJzZWRFeGNoYW5nZVJhdGUsIG9yaWdpbmFsRXhjaGFuZ2VSYXRlKSk7XHJcbiAgICAgIC8vIE9ubHkgc2VuZCBleGNoYW5nZVJhdGVNb2RlIHdoZW4gdGhlIHVzZXIgYWN0dWFsbHkgY2hhbmdlZCB0aGUgcmF0ZSBtYW51YWxseS5cclxuICAgICAgY29uc3QgaXNNYW51YWxFeGNoYW5nZVJhdGUgPSAoKCkgPT4ge1xyXG4gICAgICAgIGlmICghY2FuRWRpdEhlYWRlckZpZWxkcykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmICghcmVxdWlyZXNFeGNoYW5nZVJhdGUgfHwgIWhhc1ZhbGlkUmF0ZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoIWlzQ3JlYXRlTW9kZSAmJiAhaGFzTWFudWFsUmF0ZUVkaXRPblVwZGF0ZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmIChvZmZpY2lhbEV4Y2hhbmdlUmF0ZSA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gIWFyZVJhdGVzRXF1aXZhbGVudChwYXJzZWRFeGNoYW5nZVJhdGUsIG9mZmljaWFsRXhjaGFuZ2VSYXRlKTtcclxuICAgICAgfSkoKTtcclxuICAgICAgY29uc3QgcmVzb2x2ZWRFeGNoYW5nZVJhdGVNb2RlID0gY2FuRWRpdEhlYWRlckZpZWxkc1xyXG4gICAgICAgID8gKGlzTWFudWFsRXhjaGFuZ2VSYXRlID8gMSA6IChoYXNDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA/IHBhcnNlZEN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlIDogMCkpXHJcbiAgICAgICAgOiAoaGFzQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUgPyBwYXJzZWRDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA6IHVuZGVmaW5lZCk7XHJcbiAgICAgIGNvbnN0IHJlc29sdmVkRXhwZW5zZVNoZWV0U3RhdHVzID1cclxuICAgICAgICBuZXh0U3RhdHVzID8/IChjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzICE9IG51bGwgPyBOdW1iZXIoY3VycmVudEV4cGVuc2VTaGVldFN0YXR1cykgOiB1bmRlZmluZWQpO1xyXG4gICAgICAvLyBTdGF0dXMvY29tbWVudC1vbmx5IGZsb3dzIHN0aWxsIHN1Ym1pdCB0aGUgZnVsbCBoZWFkZXIgcGF5bG9hZCwgc28ga2VlcCB0aGUgc3RvcmVkIHJhdGUgdW50b3VjaGVkLlxyXG4gICAgICBjb25zdCByZXNvbHZlZEV4Y2hhbmdlUmF0ZSA9IGNhbkVkaXRIZWFkZXJGaWVsZHNcclxuICAgICAgICA/ICh1c2VzU2FtZUN1cnJlbmN5UmF0ZSA/IFNBTUVfQ1VSUkVOQ1lfRVhDSEFOR0VfUkFURSA6IChoYXNWYWxpZFJhdGUgPyBOdW1iZXIocGFyc2VkRXhjaGFuZ2VSYXRlKSA6IDEpKVxyXG4gICAgICAgIDogKG9yaWdpbmFsRXhjaGFuZ2VSYXRlID8/IHBhcnNlZEV4Y2hhbmdlUmF0ZSA/PyAwKTtcclxuXHJcbiAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgICBpZiAoIW5vcm1hbGl6ZWREZXNjcmlwdGlvbikge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZXJyb3I6IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fRGVzY3JpcHRpb25SZXF1aXJlZFwiLCBcIkRlc2NyaXB0aW9uIGlzIHJlcXVpcmVkLlwiKSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIW5vcm1hbGl6ZWRDdXJyZW5jeSkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZXJyb3I6IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fQ3VycmVuY3lSZXF1aXJlZFwiLCBcIkN1cnJlbmN5IGlzIHJlcXVpcmVkLlwiKSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocmVxdWlyZXNFeGNoYW5nZVJhdGUgJiYgIWhhc1ZhbGlkUmF0ZSkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBlcnJvcjogaW5kVChcclxuICAgICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fRXhjaGFuZ2VSYXRlUmVxdWlyZWRcIixcclxuICAgICAgICAgICAgXCJFeGNoYW5nZSByYXRlIGlzIHJlcXVpcmVkIHdoZW4gY3VycmVuY3kgaXMgZGlmZmVyZW50IGZyb20gYmFzZSBjdXJyZW5jeS5cIlxyXG4gICAgICAgICAgKSxcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHBheWxvYWQ6IHtcclxuICAgICAgICAgIGRlc2NyaXB0aW9uOiBub3JtYWxpemVkRGVzY3JpcHRpb24sXHJcbiAgICAgICAgICBjdXJyZW5jeUNvZGU6IG5vcm1hbGl6ZWRDdXJyZW5jeSxcclxuICAgICAgICAgIGV4Y2hSYXRlOiByZXNvbHZlZEV4Y2hhbmdlUmF0ZSxcclxuICAgICAgICAgIHByb2pJZDogbm9ybWFsaXplZFByb2plY3RJZCB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgICBleHBlbnNlU2hlZXRTdGF0dXM6IHJlc29sdmVkRXhwZW5zZVNoZWV0U3RhdHVzLFxyXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlTW9kZTogcmVzb2x2ZWRFeGNoYW5nZVJhdGVNb2RlLFxyXG4gICAgICAgICAgLy8gUHJlc2VydmUgZXhwbGljaXQgZW1wdHkgc3RhdHVzIGNvbW1lbnRzIHNvIHRoZSBiYWNrZW5kIGNhbiBjbGVhciB0aGUgc3RvcmVkIHZhbHVlLlxyXG4gICAgICAgICAgZXN0YWRvQ29tZW50YXJpb3M6IGhhc0V4cGxpY2l0U3RhdHVzQ29tbWVudE92ZXJyaWRlXHJcbiAgICAgICAgICAgID8gbm9ybWFsaXplZEVzdGFkb0NvbWVudGFyaW9zXHJcbiAgICAgICAgICAgIDogKG5vcm1hbGl6ZWRFc3RhZG9Db21lbnRhcmlvcyB8fCB1bmRlZmluZWQpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBjYW5FZGl0SGVhZGVyRmllbGRzLFxyXG4gICAgICBjdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSxcclxuICAgICAgY3VycmVudEV4cGVuc2VTaGVldFN0YXR1cyxcclxuICAgICAgZHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICAgIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxyXG4gICAgICBkcmFmdFByb2plY3RJZCxcclxuICAgICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gICAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxyXG4gICAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXHJcbiAgICAgIGxvY2tlZEN1cnJlbmN5Q29kZSxcclxuICAgICAgbG9ja2VkRXhjaGFuZ2VSYXRlLFxyXG4gICAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVVwZGF0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGlmIChidXN5IHx8ICFpc0VkaXRpbmcpIHJldHVybiBmYWxzZTtcclxuICAgIGlmICghaXNDcmVhdGVNb2RlICYmIGlzRWRpdExvY2tlZCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIGNvbnN0IGNhblByb2NlZWQgPSBpc0NyZWF0ZU1vZGUgPyBjYW5DcmVhdGVFeHBlbnNlIDogY2FuRWRpdEV4cGVuc2U7XHJcbiAgICBpZiAoIWNhblByb2NlZWQpIHtcclxuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGF5bG9hZFJlc3VsdCA9IGJ1aWxkVXBkYXRlUGF5bG9hZCgpO1xyXG4gICAgaWYgKFwiZXJyb3JcIiBpbiBwYXlsb2FkUmVzdWx0KSB7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IocGF5bG9hZFJlc3VsdC5lcnJvcik7XHJcbiAgICAgIHNldFN0YXR1cyhwYXlsb2FkUmVzdWx0LmVycm9yKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xyXG4gICAgICBzdGFydFN0YXR1czogaXNDcmVhdGVNb2RlXHJcbiAgICAgICAgPyBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpXHJcbiAgICAgICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRpbmdcIiwgXCJVcGRhdGluZyBleHBlbnNlIHNoZWV0Li4uXCIpLFxyXG4gICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZUVycm9yXCIsIFwiVXBkYXRlIGVycm9yLlwiKSxcclxuICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgc2V0QnVzeSxcclxuICAgICAgc2V0U3RhdHVzLFxyXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcclxuICAgICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgICAgICBjb25zdCBjcmVhdGVQYXlsb2FkID0gcGF5bG9hZFJlc3VsdC5wYXlsb2FkO1xyXG4gICAgICAgICAgY29uc3QgcGF5bG9hZDogRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCA9IHtcclxuICAgICAgICAgICAgbW9kZTogMSxcclxuICAgICAgICAgICAgZXhpc3RpbmdIb2phR2FzdG9zSWQ6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGNyZWF0ZVBheWxvYWQuZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgIGN1cnJlbmN5Q29kZTogY3JlYXRlUGF5bG9hZC5jdXJyZW5jeUNvZGUsXHJcbiAgICAgICAgICAgIGV4Y2hSYXRlOiBjcmVhdGVQYXlsb2FkLmV4Y2hSYXRlLFxyXG4gICAgICAgICAgICBwcm9qSWQ6IGNyZWF0ZVBheWxvYWQucHJvaklkLFxyXG4gICAgICAgICAgICBleHBlbnNlU2hlZXRTdGF0dXM6IDAsXHJcbiAgICAgICAgICAgIGV4Y2hhbmdlUmF0ZU1vZGU6IGNyZWF0ZVBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSxcclxuICAgICAgICAgICAgbGluZXM6IFtdLFxyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNyZWF0ZUV4cGVuc2VTaGVldChwYXlsb2FkKTtcclxuXHJcbiAgICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBBY2NlcHQgYm90aCBjYXNpbmcgdmFyaWFudHMgZnJvbSBiYWNrZW5kIGVudmVsb3Blcy5cclxuICAgICAgICAgIGNvbnN0IGNyZWF0ZWREYXRhID0gcmVzcG9uc2U/LkRhdGEgYXMgeyBIb2phR2FzdG9zSWQ/OiB1bmtub3duOyBob2phR2FzdG9zSWQ/OiB1bmtub3duIH0gfCBudWxsIHwgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgY29uc3QgY3JlYXRlZFNoZWV0SWQgPSBTdHJpbmcoY3JlYXRlZERhdGE/LkhvamFHYXN0b3NJZCA/PyBjcmVhdGVkRGF0YT8uaG9qYUdhc3Rvc0lkID8/IFwiXCIpLnRyaW0oKTtcclxuICAgICAgICAgIGlmICghY3JlYXRlZFNoZWV0SWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgb25DcmVhdGVTdWNjZXNzKGNyZWF0ZWRTaGVldElkKTtcclxuICAgICAgICAgIHNldFN0YXR1cyhpbmRUKFwiQ29tbW9uX1NhdmVcIiwgXCJTYXZlXCIpKTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB1cGRhdGVFeHBlbnNlU2hlZXRIZWFkZXIoc2hlZXRJZCwgcGF5bG9hZFJlc3VsdC5wYXlsb2FkKTtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVkXCIsIFwiRXhwZW5zZSBzaGVldCB1cGRhdGVkXCIpKTtcclxuICAgICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcclxuICB9LCBbXHJcbiAgICBidXN5LFxyXG4gICAgYnVpbGRVcGRhdGVQYXlsb2FkLFxyXG4gICAgY2FuQ3JlYXRlRXhwZW5zZSxcclxuICAgIGNhbkVkaXRFeHBlbnNlLFxyXG4gICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgaXNFZGl0TG9ja2VkLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgb25DcmVhdGVTdWNjZXNzLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzaGVldElkLFxyXG4gIF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVTdGF0dXNUcmFuc2l0aW9uID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAobmV4dFN0YXR1czogbnVtYmVyLCBzdGFydFN0YXR1czogc3RyaW5nLCBzdGF0dXNDb21tZW50T3ZlcnJpZGU/OiBzdHJpbmcgfCBudWxsKSA9PiB7XHJcbiAgICAgIGlmIChidXN5IHx8IGlzQ3JlYXRlTW9kZSB8fCAhc2hlZXRJZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoIWNhblRyYW5zaXRpb25TdGF0dXMpIHtcclxuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwYXlsb2FkUmVzdWx0ID0gYnVpbGRVcGRhdGVQYXlsb2FkKG5leHRTdGF0dXMsIHN0YXR1c0NvbW1lbnRPdmVycmlkZSk7XHJcbiAgICAgIGlmIChcImVycm9yXCIgaW4gcGF5bG9hZFJlc3VsdCkge1xyXG4gICAgICAgIHNldE1vZGFsRXJyb3IocGF5bG9hZFJlc3VsdC5lcnJvcik7XHJcbiAgICAgICAgc2V0U3RhdHVzKHBheWxvYWRSZXN1bHQuZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbih7XHJcbiAgICAgICAgc3RhcnRTdGF0dXMsXHJcbiAgICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIiksXHJcbiAgICAgICAgc2V0TW9kYWxFcnJvcixcclxuICAgICAgICBzZXRCdXN5LFxyXG4gICAgICAgIHNldFN0YXR1cyxcclxuICAgICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyKHNoZWV0SWQsIHBheWxvYWRSZXN1bHQucGF5bG9hZCk7XHJcblxyXG4gICAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVGYWlsZWRcIiwgXCJVcGRhdGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVkXCIsIFwiRXhwZW5zZSBzaGVldCB1cGRhdGVkXCIpKTtcclxuICAgICAgICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJldHVybiByZXN1bHQub2s7XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBidXN5LFxyXG4gICAgICBidWlsZFVwZGF0ZVBheWxvYWQsXHJcbiAgICAgIGNhblRyYW5zaXRpb25TdGF0dXMsXHJcbiAgICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgICAgc2V0QnVzeSxcclxuICAgICAgc2V0SXNFZGl0aW5nLFxyXG4gICAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgICBzZXRTdGF0dXMsXHJcbiAgICAgIHNoZWV0SWQsXHJcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybiBmYWxzZTtcclxuICAgIGlmIChpc0RlbGV0ZUxvY2tlZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFjYW5EZWxldGVFeHBlbnNlKSB7XHJcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xyXG4gICAgICBzdGFydFN0YXR1czogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0aW5nXCIsIFwiRGVsZXRpbmcgZXhwZW5zZSBzaGVldC4uLlwiKSxcclxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVFcnJvclwiLCBcIkRlbGV0ZSBlcnJvci5cIiksXHJcbiAgICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICAgIHNldEJ1c3ksXHJcbiAgICAgIHNldFN0YXR1cyxcclxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBkZWxldGVFeHBlbnNlU2hlZXQoc2hlZXRJZCk7XHJcblxyXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUZhaWxlZFwiLCBcIkRlbGV0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlZFwiLCBcIkV4cGVuc2Ugc2hlZXQgZGVsZXRlZFwiKSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xyXG4gIH0sIFtidXN5LCBjYW5EZWxldGVFeHBlbnNlLCBpc0RlbGV0ZUxvY2tlZCwgc2V0QnVzeSwgc2V0TW9kYWxFcnJvciwgc2V0U3RhdHVzLCBzaGVldElkXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVTdGF0dXNUcmFuc2l0aW9uLFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zIH0gZnJvbSBcIi4uL2hvb2tzL3VzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucy50c1wiO1xyXG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIG1vZGFsT3BlbjogYm9vbGVhbjtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xyXG4gIGFjdGlvbk1vZGU/OiBcImRlZmF1bHRcIiB8IFwiZGVsZXRlX29ubHlcIiB8IFwidmlld19vbmx5XCI7XHJcbiAgaXNMb2NrZWQ6IGJvb2xlYW47XHJcbiAgaXNFZGl0TG9ja2VkPzogYm9vbGVhbjtcclxuICBpc0RlbGV0ZUxvY2tlZD86IGJvb2xlYW47XHJcbiAgcGVybWlzc2lvbnNSZWFkeT86IGJvb2xlYW47XHJcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XHJcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcclxuICBjYW5EZWxldGVFeHBlbnNlOiBib29sZWFuO1xyXG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGhhbmRsZUVuYWJsZUVkaXQ6ICgpID0+IHZvaWQ7XHJcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcclxuICBoYW5kbGVVcGRhdGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgaGFuZGxlRGVsZXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xyXG4gIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XHJcbiAgb25EZWxldGVTdWNjZXNzPzogKCkgPT4gdm9pZDtcclxuICBvcGVuQ29uZmlybTogKG9wdHM6IHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBjb25maXJtVGV4dD86IHN0cmluZztcclxuICAgIG9uQ29uZmlybT86ICgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQ7XHJcbiAgfSkgPT4gdm9pZDtcclxuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBDb29yZGluYXRlcyB0b3BiYXIgaWNvbiBzdGF0ZSBhbmQgZGlzcGF0Y2ggYWN0aW9ucyBmb3IgZXhwZW5zZSBzaGVldCBkZXRhaWwuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zID0gKHtcclxuICBidXN5LFxyXG4gIG1vZGFsT3BlbixcclxuICBpc0VkaXRpbmcsXHJcbiAgaXNDcmVhdGVNb2RlLFxyXG4gIGFjdGlvbk1vZGUgPSBcImRlZmF1bHRcIixcclxuICBpc0xvY2tlZCxcclxuICBpc0VkaXRMb2NrZWQsXHJcbiAgaXNEZWxldGVMb2NrZWQsXHJcbiAgcGVybWlzc2lvbnNSZWFkeSA9IHRydWUsXHJcbiAgY2FuRWRpdEV4cGVuc2UsXHJcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcclxuICBjYW5EZWxldGVFeHBlbnNlLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gIGhhbmRsZVVwZGF0ZSxcclxuICBoYW5kbGVEZWxldGUsXHJcbiAgb25TYXZlU3VjY2VzcyxcclxuICBvbkRlbGV0ZVN1Y2Nlc3MsXHJcbiAgb3BlbkNvbmZpcm0sXHJcbiAgY2xvc2VDb25maXJtLFxyXG59OiBVc2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zQXJncykgPT4ge1xyXG4gIHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyh7XHJcbiAgICBhY3Rpb25Hcm91cElkOiBcImV4cGVuc2Utc2hlZXQtZGV0YWlsLWFjdGlvbnNcIixcclxuICAgIGlkczoge1xyXG4gICAgICBlZGl0SWNvbklkOiBcImV4cGVuc2VFZGl0SWNvblwiLFxyXG4gICAgICBzYXZlSWNvbklkOiBcImV4cGVuc2VTYXZlSWNvblwiLFxyXG4gICAgICBkZWxldGVCdG5JZDogXCJleHBlbnNlRGVsZXRlQnRuXCIsXHJcbiAgICAgIGNhbmNlbEJ0bklkOiBcImV4cGVuc2VDYW5jZWxCdG5cIixcclxuICAgIH0sXHJcbiAgICBldmVudHM6IHtcclxuICAgICAgZWRpdEV2ZW50OiBcImV4cGVuc2UtZGV0YWlsLWVkaXRcIixcclxuICAgICAgZGVsZXRlRXZlbnQ6IFwiZXhwZW5zZS1kZXRhaWwtZGVsZXRlXCIsXHJcbiAgICAgIGNhbmNlbEV2ZW50OiBcImV4cGVuc2UtZGV0YWlsLWNhbmNlbC1lZGl0XCIsXHJcbiAgICB9LFxyXG4gICAgYnVzeSxcclxuICAgIG1vZGFsT3BlbixcclxuICAgIGlzRWRpdGluZyxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgIGlzTG9ja2VkLFxyXG4gICAgYWN0aW9uTW9kZSxcclxuICAgIGlzRWRpdExvY2tlZCxcclxuICAgIGlzRGVsZXRlTG9ja2VkLFxyXG4gICAgYWxsb3dDcmVhdGVNb2RlQWN0aW9uc1doZW5Mb2NrZWQ6IHRydWUsXHJcbiAgICBwZXJtaXNzaW9uc1JlYWR5LFxyXG4gICAgY2FuQ3JlYXRlOiBjYW5DcmVhdGVFeHBlbnNlLFxyXG4gICAgY2FuRWRpdDogY2FuRWRpdEV4cGVuc2UsXHJcbiAgICBjYW5EZWxldGU6IGNhbkRlbGV0ZUV4cGVuc2UsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBoYW5kbGVTYXZlOiBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBzYXZlQ29uZmlybVRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiwgXCJTYXZlIGNoYW5nZXNcIiksXHJcbiAgICBzYXZlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gc2F2ZSBjaGFuZ2VzP1wiKSxcclxuICAgIHNhdmVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1UaXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZVNoZWV0X1RpdGxlXCIsIFwiRGVsZXRlIGV4cGVuc2Ugc2hlZXRcIiksXHJcbiAgICBkZWxldGVDb25maXJtTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZVNoZWV0X0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBleHBlbnNlIHNoZWV0P1wiKSxcclxuICAgIGRlbGV0ZUNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkRlbGV0ZVwiKSxcclxuICAgIG9uU2F2ZVN1Y2Nlc3MsXHJcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6IG9uRGVsZXRlU3VjY2VzcyB8fCAoKCkgPT4gbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL0V4cGVuc2VTaGVldHNcIikpLFxyXG4gICAgb3BlbkNvbmZpcm0sXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgfSk7XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHtcclxuICBFeHBlbnNlU2hlZXRIZWFkZXIsXHJcbiAgRXhwZW5zZVNoZWV0TGluZSxcclxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwsXHJcbiAgZ2V0RXhjaGFuZ2VSYXRlLFxyXG4gIGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUsXHJcbiAgbWFwRXhwZW5zZVNoZWV0SGVhZGVyLFxyXG4gIG1hcEV4cGVuc2VTaGVldExpbmUsXHJcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHtcclxuICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsXHJcbiAgbmF2aWdhdGVUb0V4cGVuc2VVcmwsXHJcbiAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCxcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcclxuaW1wb3J0IHsgaXNNYW5hZ2luZ090aGVyRXhwZW5zZVJlY29yZCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTWFuYWdlZFVzZXJTY29wZS50c1wiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leGNoYW5nZVJhdGVFbnRyeU1vZGVDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSwgaGFzQXNzaWduZWRWb3VjaGVyLCBwYXJzZUV4cGVuc2VEYXRlLCBzYWZlVGV4dCwgdG9Jc29EYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlciwgcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZUV4cGVuc2VTaGVldERldGFpbFBvbGljeSB9IGZyb20gXCIuL2V4cGVuc2VTaGVldERldGFpbFBvbGljeS50c1wiO1xyXG5cclxuY29uc3QgRVhDSEFOR0VfUkFURV9ERUJPVU5DRV9NUyA9IDQwMDtcclxuY29uc3QgRVhDSEFOR0VfUkFURV9SRUZFUkVOQ0VfQU1PVU5UID0gMTAwO1xyXG5jb25zdCBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTID0gNztcclxuY29uc3QgRVhQRU5TRV9TVEFUVVNfQVBQUk9WRUQgPSAyO1xyXG5jb25zdCBFWFBFTlNFX1NUQVRVU19QQUlEID0gNDtcclxuXHJcbi8vIE5vcm1hbGl6ZXMgZXhjaGFuZ2UtcmF0ZSBudW1iZXJzIGZvciBudW1lcmljIGlucHV0IGNvbnRyb2xzLlxyXG5jb25zdCBmb3JtYXRFeGNoYW5nZVJhdGVJbnB1dFZhbHVlID0gKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIodmFsdWUsIHtcclxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcclxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcclxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gICAgZmFsbGJhY2s6IFwiXCIsXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyBSZXVzZXMgdGhlIGZpeGVkIHNhbWUtY3VycmVuY3kgcmF0ZSBzbyBFVVIgc2hlZXRzIHN0YXkgYWxpZ25lZCB3aXRoIHRoZSAxMDAgcmVmZXJlbmNlIGFtb3VudC5cclxuY29uc3QgU0FNRV9DVVJSRU5DWV9FWENIQU5HRV9SQVRFX0lOUFVUID0gZm9ybWF0RXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZShFWENIQU5HRV9SQVRFX1JFRkVSRU5DRV9BTU9VTlQpO1xyXG5cclxuY29uc3QgYnVpbGRDcmVhdGVIZWFkZXJEcmFmdCA9ICgpOiBFeHBlbnNlU2hlZXRIZWFkZXIgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBob2phR2FzdG9zSWQ6IFwiXCIsXHJcbiAgICBkZXNjcmlwdGlvbjogXCJcIixcclxuICAgIHByb2pJZDogXCJcIixcclxuICAgIGN1cnJlbmN5Q29kZTogXCJcIixcclxuICAgIHRvdGFsQW1vdW50OiBudWxsLFxyXG4gICAgZXhwZW5zZVNoZWV0U3RhdHVzOiAwLFxyXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogMCxcclxuICAgIGNyZWF0ZWREYXRlOiBcIlwiLFxyXG4gICAgZXhjaFJhdGU6IFN0cmluZyhFWENIQU5HRV9SQVRFX1JFRkVSRU5DRV9BTU9VTlQpLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBzaG91bGRTaG93RXhjaGFuZ2VSYXRlID0gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gZmFsc2U7XHJcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KHZhbHVlKTtcclxuICBpZiAocGFyc2VkID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuICByZXR1cm4gTWF0aC5hYnMocGFyc2VkKSA+IDA7XHJcbn07XHJcblxyXG50eXBlIFVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlQXJncyA9IHtcclxuICBoYXNBY2Nlc3M6IGJvb2xlYW47XHJcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xyXG4gIGNhbk1hbmFnZU90aGVyVXNlcnM6IGJvb2xlYW47XHJcbiAgY3VycmVudEF4VXNlcklkOiBzdHJpbmc7XHJcbiAgY3VycmVudENybVVzZXJJZDogc3RyaW5nO1xyXG4gIHNlbGVjdGVkTWFuYWdlZFVzZXJJZDogc3RyaW5nO1xyXG4gIHNoZWV0SWQ6IHN0cmluZztcclxuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XHJcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBPd25zIHN0YXRlIGFuZCBiZWhhdmlvciBmb3IgZXhwZW5zZSBzaGVldCBkZXRhaWwgcGFnZSAocmVhZCwgZWRpdCwgY3JlYXRlKS5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlID0gKHtcclxuICBoYXNBY2Nlc3MsXHJcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gIGNhbk1hbmFnZU90aGVyVXNlcnMsXHJcbiAgY3VycmVudEF4VXNlcklkLFxyXG4gIGN1cnJlbnRDcm1Vc2VySWQsXHJcbiAgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLFxyXG4gIHNoZWV0SWQsXHJcbiAgaXNDcmVhdGVNb2RlLFxyXG4gIG9uRm9yYmlkZGVuLFxyXG59OiBVc2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZUFyZ3MpID0+IHtcclxuICBjb25zdCBbaGVhZGVyLCBzZXRIZWFkZXJdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0SGVhZGVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2xpbmVzLCBzZXRMaW5lc10gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRMaW5lW10+KFtdKTtcclxuICBjb25zdCBbbGluZVBhZ2UsIHNldExpbmVQYWdlXSA9IHVzZVN0YXRlKDEpO1xyXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2lzRWRpdGluZywgc2V0SXNFZGl0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbW9kYWxFcnJvciwgc2V0TW9kYWxFcnJvcl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnREZXNjcmlwdGlvbiwgc2V0RHJhZnREZXNjcmlwdGlvbl0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRQcm9qZWN0SWQsIHNldERyYWZ0UHJvamVjdElkXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtkcmFmdEN1cnJlbmN5Q29kZSwgc2V0RHJhZnRDdXJyZW5jeUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2RyYWZ0RXhjaGFuZ2VSYXRlLCBzZXREcmFmdEV4Y2hhbmdlUmF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZHJhZnRFc3RhZG9Db21lbnRhcmlvcywgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvc10gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZGVmYXVsdEN1cnJlbmN5Q29kZSwgc2V0RGVmYXVsdEN1cnJlbmN5Q29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbaXNFeGNoYW5nZVJhdGVMb2FkaW5nLCBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtleGNoYW5nZVJhdGVNZXNzYWdlLCBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtleGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvciwgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3JdID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLCBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlLCBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUsIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICBjb25zdCBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyID0gdXNlQ2FsbGJhY2soKG5leHRIZWFkZXI6IEV4cGVuc2VTaGVldEhlYWRlciB8IG51bGwpID0+IHtcclxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24oc2FmZVRleHQobmV4dEhlYWRlcj8uZGVzY3JpcHRpb24pKTtcclxuICAgIHNldERyYWZ0UHJvamVjdElkKHNhZmVUZXh0KG5leHRIZWFkZXI/LnByb2pJZCkpO1xyXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUoc2FmZVRleHQobmV4dEhlYWRlcj8uY3VycmVuY3lDb2RlKSk7XHJcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZShcclxuICAgICAgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKG5leHRIZWFkZXI/LmV4Y2hSYXRlLCB7XHJcbiAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxyXG4gICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcclxuICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgICAgICBmYWxsYmFjazogXCJcIixcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgICBzZXREcmFmdEVzdGFkb0NvbWVudGFyaW9zKHNhZmVUZXh0KG5leHRIZWFkZXI/LmVzdGFkb0NvbWVudGFyaW9zKSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgbG9hZERldGFpbCA9IGFzeW5jICgpID0+IHtcclxuICAgICAgaWYgKCFoYXNBY2Nlc3MpIHtcclxuICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSkge1xyXG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGRyYWZ0SGVhZGVyID0gYnVpbGRDcmVhdGVIZWFkZXJEcmFmdCgpO1xyXG4gICAgICAgIHNldEhlYWRlcihkcmFmdEhlYWRlcik7XHJcbiAgICAgICAgc2V0TGluZXMoW10pO1xyXG4gICAgICAgIHNldExpbmVQYWdlKDEpO1xyXG4gICAgICAgIHNldElzRWRpdGluZyh0cnVlKTtcclxuICAgICAgICBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyKGRyYWZ0SGVhZGVyKTtcclxuICAgICAgICBzZXRTdGF0dXMoXCJcIik7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFzaGVldElkKSB7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCB3YXMgbm90IGZvdW5kLlwiKSk7XHJcbiAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcclxuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsKHNoZWV0SWQsIHtcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2U/Lk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBkZXRhaWwuXCIpKTtcclxuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNoZWV0cyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRTaGVldCA9XHJcbiAgICAgICAgICBzaGVldHMuZmluZCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5Py5Ib2phR2FzdG9zSWQpLnRvVXBwZXJDYXNlKCkgPT09IHNoZWV0SWQudHJpbSgpLnRvVXBwZXJDYXNlKCkpIHx8IHNoZWV0c1swXTtcclxuXHJcbiAgICAgICAgaWYgKCFzZWxlY3RlZFNoZWV0KSB7XHJcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICAgIHNldExpbmVzKFtdKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG5leHRIZWFkZXIgPSBtYXBFeHBlbnNlU2hlZXRIZWFkZXIoc2VsZWN0ZWRTaGVldCk7XHJcbiAgICAgICAgY29uc3QgbmV4dExpbmVzID0gKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRTaGVldC5MaW5lcykgPyBzZWxlY3RlZFNoZWV0LkxpbmVzIDogW10pLm1hcCgoZW50cnkpID0+XHJcbiAgICAgICAgICBtYXBFeHBlbnNlU2hlZXRMaW5lKGVudHJ5KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgc2V0SGVhZGVyKG5leHRIZWFkZXIpO1xyXG4gICAgICAgIHNldExpbmVzKG5leHRMaW5lcyk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShcclxuICAgICAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBkZXRhaWwuXCIpXHJcbiAgICAgICAgKTtcclxuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XHJcbiAgICAgICAgc2V0TGluZXMoW10pO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdm9pZCBsb2FkRGV0YWlsKCk7XHJcbiAgfSwgW2NhbkNyZWF0ZUV4cGVuc2UsIGhhc0FjY2VzcywgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNDcmVhdGVNb2RlLCBvbkZvcmJpZGRlbiwgc2hlZXRJZF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFoZWFkZXIgfHwgaXNFZGl0aW5nKSByZXR1cm47XHJcbiAgICBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyKGhlYWRlcik7XHJcbiAgfSwgW2hlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNFZGl0aW5nXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWhhc0FjY2VzcykgcmV0dXJuO1xyXG4gICAgbGV0IGlzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG5cclxuICAgIGNvbnN0IGxvYWREZWZhdWx0Q3VycmVuY3lDb2RlID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGNvZGUgPSBhd2FpdCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlKHtcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcclxuICAgICAgICBzZXREZWZhdWx0Q3VycmVuY3lDb2RlKHNhZmVUZXh0KGNvZGUpLnRvVXBwZXJDYXNlKCkpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSBcIkFib3J0RXJyb3JcIikgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZvaWQgbG9hZERlZmF1bHRDdXJyZW5jeUNvZGUoKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlzQ2FuY2VsbGVkID0gdHJ1ZTtcclxuICAgICAgY29udHJvbGxlci5hYm9ydCgpO1xyXG4gICAgfTtcclxuICB9LCBbaGFzQWNjZXNzXSk7XHJcblxyXG4gIGNvbnN0IGhhc0FjdGl2ZVByb2Nlc3MgPSB1c2VNZW1vKCgpID0+IGJ1c3kgfHwgaXNFZGl0aW5nLCBbYnVzeSwgaXNFZGl0aW5nXSk7XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoaGFzQWN0aXZlUHJvY2Vzcyk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoKTtcclxuICAgIH07XHJcbiAgfSwgW2hhc0FjdGl2ZVByb2Nlc3NdKTtcclxuXHJcbiAgY29uc3QgcHJvamVjdFZhbHVlID0gc2FmZVRleHQoaGVhZGVyPy5wcm9qSWQpO1xyXG4gIGNvbnN0IHN0YXR1c0NvZGUgPSB0eXBlb2YgaGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMgPT09IFwibnVtYmVyXCIgPyBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzIDogbnVsbDtcclxuICBjb25zdCBpc1NoZWV0QXBwcm92ZWQgPSBzdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19BUFBST1ZFRDtcclxuICBjb25zdCBpc1NoZWV0UGFpZEJ5U3RhdHVzID0gc3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfUEFJRDtcclxuICBjb25zdCBpc1NoZWV0UGFpZEJ5Vm91Y2hlciA9IGhhc0Fzc2lnbmVkVm91Y2hlcihoZWFkZXI/LnZvdWNoZXIpO1xyXG4gIGNvbnN0IGlzU2hlZXRQYWlkID0gaXNTaGVldFBhaWRCeVN0YXR1cyB8fCBpc1NoZWV0UGFpZEJ5Vm91Y2hlcjtcclxuICBjb25zdCBpc01hbmFnaW5nT3RoZXJVc2VyID0gaXNNYW5hZ2luZ090aGVyRXhwZW5zZVJlY29yZCh7XHJcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzLFxyXG4gICAgY3VycmVudEF4VXNlcklkLFxyXG4gICAgY3VycmVudENybVVzZXJJZCxcclxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcclxuICAgIHJlY29yZE93bmVyVXNlcklkOiBoZWFkZXI/LnVzZXJJZCxcclxuICAgIGlzQ3JlYXRlTW9kZSxcclxuICB9KTtcclxuICBjb25zdCBkZXRhaWxQb2xpY3kgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpbnRlcmFjdGlvbk1vZGU6IFwiZnVsbF9lZGl0XCIgYXMgY29uc3QsXHJcbiAgICAgICAgc2hvd0ZhYjogZmFsc2UsXHJcbiAgICAgICAgY2FuRGVsZXRlU2hlZXQ6IGZhbHNlLFxyXG4gICAgICAgIHN0YXR1c0FjdGlvbnM6IFtdLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXNvbHZlRXhwZW5zZVNoZWV0RGV0YWlsUG9saWN5KHtcclxuICAgICAgc3RhdHVzQ29kZSxcclxuICAgICAgaXNNYW5hZ2luZ090aGVyVXNlcixcclxuICAgICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICAgICAgaXNQYWlkOiBpc1NoZWV0UGFpZCxcclxuICAgIH0pO1xyXG4gIH0sIFthbGxvd1NlbGZNYW5hZ2VtZW50LCBpc0NyZWF0ZU1vZGUsIGlzTWFuYWdpbmdPdGhlclVzZXIsIGlzU2hlZXRQYWlkLCBzdGF0dXNDb2RlXSk7XHJcbiAgY29uc3QgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQgPSBpc0NyZWF0ZU1vZGUgfHwgKCFpc01hbmFnaW5nT3RoZXJVc2VyICYmIGRldGFpbFBvbGljeS5pbnRlcmFjdGlvbk1vZGUgPT09IFwiZnVsbF9lZGl0XCIpO1xyXG4gIGNvbnN0IGNhbkVkaXRTdGF0dXNDb21tZW50Q3VycmVudCA9ICFpc0NyZWF0ZU1vZGUgJiYgZGV0YWlsUG9saWN5LmludGVyYWN0aW9uTW9kZSA9PT0gXCJjb21tZW50X29ubHlfZWRpdFwiO1xyXG4gIGNvbnN0IGNhbkVkaXRBbnlDdXJyZW50ID0gKGlzQ3JlYXRlTW9kZSAmJiBjYW5DcmVhdGVFeHBlbnNlKSB8fCBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCB8fCBjYW5FZGl0U3RhdHVzQ29tbWVudEN1cnJlbnQ7XHJcbiAgY29uc3QgY2FuVXNlRnVsbEVkaXRGZWF0dXJlcyA9ICFpc0NyZWF0ZU1vZGUgJiYgZGV0YWlsUG9saWN5LmludGVyYWN0aW9uTW9kZSA9PT0gXCJmdWxsX2VkaXRcIjtcclxuICBjb25zdCBpc1NoZWV0TG9ja2VkID0gaXNTaGVldEFwcHJvdmVkIHx8IGlzU2hlZXRQYWlkO1xyXG4gIGNvbnN0IGhhc0xpbmVzID0gbGluZXMubGVuZ3RoID4gMDtcclxuICBjb25zdCBleGNoYW5nZVJhdGVWYWx1ZSA9IGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcihzYWZlVGV4dChoZWFkZXI/LmV4Y2hSYXRlKSwge1xyXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxyXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxyXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICBmYWxsYmFjazogXCJcIixcclxuICB9KTtcclxuICBjb25zdCBzaG93RXhjaGFuZ2VSYXRlID0gdXNlTWVtbygoKSA9PiBzaG91bGRTaG93RXhjaGFuZ2VSYXRlKGV4Y2hhbmdlUmF0ZVZhbHVlKSwgW2V4Y2hhbmdlUmF0ZVZhbHVlXSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgPSB1c2VNZW1vKCgpID0+IGRyYWZ0Q3VycmVuY3lDb2RlLnRyaW0oKS50b1VwcGVyQ2FzZSgpLCBbZHJhZnRDdXJyZW5jeUNvZGVdKTtcclxuICBjb25zdCBub3JtYWxpemVkRGVmYXVsdEN1cnJlbmN5ID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChkZWZhdWx0Q3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpLCBbZGVmYXVsdEN1cnJlbmN5Q29kZV0pO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSA9IG5vcm1hbGl6ZWREZWZhdWx0Q3VycmVuY3kgfHwgXCJFVVJcIjtcclxuICBjb25zdCB1aUxvY2FsZSA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIFwiZXMtRVNcIjtcclxuICAgIHJldHVybiBzYWZlVGV4dChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ/LmxhbmcpIHx8IFwiZXMtRVNcIjtcclxuICB9LCBbXSk7XHJcbiAgY29uc3QgZm9ybUV4Y2hhbmdlRGF0ZSA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgcGFyc2VkRGF0ZSA9IHBhcnNlRXhwZW5zZURhdGUoc2FmZVRleHQoaGVhZGVyPy5jcmVhdGVkRGF0ZSkpO1xyXG4gICAgaWYgKHBhcnNlZERhdGUpIHJldHVybiB0b0lzb0RhdGUocGFyc2VkRGF0ZSk7XHJcbiAgICByZXR1cm4gdG9Jc29EYXRlKG5ldyBEYXRlKCkpO1xyXG4gIH0sIFtoZWFkZXI/LmNyZWF0ZWREYXRlXSk7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlUmVxdWlyZWQgPVxyXG4gICAgaXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50ICYmIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5ICE9PSBcIlwiICYmIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5ICE9PSBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UgPVxyXG4gICAgZXhjaGFuZ2VSYXRlUmVxdWlyZWQgJiYgIWRyYWZ0RXhjaGFuZ2VSYXRlLnRyaW0oKVxyXG4gICAgICA/IGluZFQoXHJcbiAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9FeGNoYW5nZVJhdGVSZXF1aXJlZFwiLFxyXG4gICAgICAgICAgXCJFeGNoYW5nZSByYXRlIGlzIHJlcXVpcmVkIHdoZW4gY3VycmVuY3kgaXMgZGlmZmVyZW50IGZyb20gYmFzZSBjdXJyZW5jeS5cIlxyXG4gICAgICAgIClcclxuICAgICAgOiBcIlwiO1xyXG4gIC8vIEN1cnJlbmN5IHR5cGUgY2FuIGJlIGVkaXRlZCB3aGVuZXZlciB0aGUgc2hlZXQgaXRzZWxmIGlzIGVkaXRhYmxlIChub3QgYXBwcm92ZWQvcGFpZCkuXHJcbiAgY29uc3QgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMgPSBmYWxzZTtcclxuICBjb25zdCBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMgPSBpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQgJiYgaGFzTGluZXMgJiYgc2hvd0V4Y2hhbmdlUmF0ZTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGxldCBpc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgbGV0IHJlcXVlc3RUaW1lcjogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4gfCBudWxsID0gbnVsbDtcclxuICAgIGxldCByZXF1ZXN0QWJvcnRDb250cm9sbGVyOiBBYm9ydENvbnRyb2xsZXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBjb25zdCBjbGVhclJlcXVlc3RBcnRpZmFjdHMgPSAoKSA9PiB7XHJcbiAgICAgIGlmIChyZXF1ZXN0VGltZXIpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQocmVxdWVzdFRpbWVyKTtcclxuICAgICAgICByZXF1ZXN0VGltZXIgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChyZXF1ZXN0QWJvcnRDb250cm9sbGVyKSB7XHJcbiAgICAgICAgcmVxdWVzdEFib3J0Q29udHJvbGxlci5hYm9ydCgpO1xyXG4gICAgICAgIHJlcXVlc3RBYm9ydENvbnRyb2xsZXIgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGlmICghaXNFZGl0aW5nIHx8ICFjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCB8fCBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMpIHtcclxuICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xyXG4gICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGNsZWFyUmVxdWVzdEFydGlmYWN0cygpO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgfHwgIWV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSkge1xyXG4gICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcoZmFsc2UpO1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFwiXCIpO1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XHJcbiAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5ID09PSBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3kpIHtcclxuICAgICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUoU0FNRV9DVVJSRU5DWV9FWENIQU5HRV9SQVRFX0lOUFVUKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShTQU1FX0NVUlJFTkNZX0VYQ0hBTkdFX1JBVEVfSU5QVVQpO1xyXG4gICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcoZmFsc2UpO1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFwiXCIpO1xyXG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcclxuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XHJcbiAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmVxdWVzdFRpbWVyID0gc2V0VGltZW91dChhc3luYyAoKSA9PiB7XHJcbiAgICAgIHJlcXVlc3RBYm9ydENvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcbiAgICAgIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZyh0cnVlKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xyXG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldEV4Y2hhbmdlUmF0ZShcclxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcclxuICAgICAgICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxyXG4gICAgICAgICAgZm9ybUV4Y2hhbmdlRGF0ZSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgIHNpZ25hbDogcmVxdWVzdEFib3J0Q29udHJvbGxlci5zaWduYWwsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2VzcyB8fCAhcmVzcG9uc2UuRGF0YSB8fCAhTnVtYmVyLmlzRmluaXRlKE51bWJlcihyZXNwb25zZS5EYXRhLlJhdGUpKSkge1xyXG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcclxuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xyXG4gICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcclxuICAgICAgICAgICAgc2FmZVRleHQocmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX1VuYXZhaWxhYmxlXCIsIFwiTm8gc2UgcHVkbyBvYnRlbmVyIGVsIHRpcG8gZGUgY2FtYmlvLlwiKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVGhlIGVuZHBvaW50IHJldHVybnMgb25lIGJhc2UtY3VycmVuY3kgdW5pdCBpbiB0aGUgZXhwZW5zZSBjdXJyZW5jeS5cclxuICAgICAgICAvLyBUaGUgVUkgc3RvcmVzIHRoZSBhbW91bnQgZm9yIHRoZSBmaXhlZCBsb2NhbCByZWZlcmVuY2UgYW1vdW50ICgxMDApLlxyXG4gICAgICAgIGNvbnN0IG9mZmljaWFsUmF0ZVBlckJhc2VVbml0ID0gTnVtYmVyKHJlc3BvbnNlLkRhdGEuUmF0ZSk7XHJcbiAgICAgICAgY29uc3Qgb2ZmaWNpYWxSYXRlRm9yUmVmZXJlbmNlQW1vdW50ID0gb2ZmaWNpYWxSYXRlUGVyQmFzZVVuaXQgKiBFWENIQU5HRV9SQVRFX1JFRkVSRU5DRV9BTU9VTlQ7XHJcbiAgICAgICAgY29uc3QgbmV4dEV4Y2hhbmdlUmF0ZVZhbHVlID0gZm9ybWF0RXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZShvZmZpY2lhbFJhdGVGb3JSZWZlcmVuY2VBbW91bnQpO1xyXG4gICAgICAgIGNvbnN0IG9mZmljaWFsUmF0ZVJhd1ZhbHVlID0gZm9ybWF0RXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZShvZmZpY2lhbFJhdGVQZXJCYXNlVW5pdCk7XHJcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShuZXh0RXhjaGFuZ2VSYXRlVmFsdWUpO1xyXG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUob2ZmaWNpYWxSYXRlUmF3VmFsdWUpO1xyXG4gICAgICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlKG5leHRFeGNoYW5nZVJhdGVWYWx1ZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGVmZmVjdGl2ZVJhdGVEYXRlID0gc2FmZVRleHQocmVzcG9uc2UuRGF0YS5EYXRlKSB8fCBmb3JtRXhjaGFuZ2VEYXRlO1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGEuU291cmNlKTtcclxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoZWZmZWN0aXZlUmF0ZURhdGUpO1xyXG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKHNvdXJjZSk7XHJcbiAgICAgICAgY29uc3Qgb2ZmaWNpYWxMYWJlbCA9IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlTGFiZWwoMCkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0V4Y2hhbmdlUmF0ZU1vZGVfT2ZmaWNpYWxcIiwgXCJULkMuIE9maWNpYWxcIik7XHJcbiAgICAgICAgY29uc3QgbG9jYWxpemVkUmF0ZURhdGUgPSBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUoZWZmZWN0aXZlUmF0ZURhdGUsIHVpTG9jYWxlKSB8fCBlZmZlY3RpdmVSYXRlRGF0ZTtcclxuICAgICAgICBjb25zdCBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZSA9IHNvdXJjZSA/IGAke29mZmljaWFsTGFiZWx9ICR7bG9jYWxpemVkUmF0ZURhdGV9ICgke3NvdXJjZX0pYCA6IGAke29mZmljaWFsTGFiZWx9ICR7bG9jYWxpemVkUmF0ZURhdGV9YDtcclxuICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKG9mZmljaWFsUmF0ZVJhd1ZhbHVlID8gYCR7ZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2V9IC0gJHtvZmZpY2lhbFJhdGVSYXdWYWx1ZX1gIDogZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UpO1xyXG4gICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcclxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikge1xyXG4gICAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDA0KSB7XHJcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XHJcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XHJcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcclxuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XHJcbiAgICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX05vdEZvdW5kXCIsIFwiTm8gaGF5IHRpcG8gZGUgY2FtYmlvIHBhcmEgbGEgZmVjaGFcIikpO1xyXG4gICAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQyMiB8fCBlcnJvci5zdGF0dXMgPT09IDUwMCkge1xyXG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XHJcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFxyXG4gICAgICAgICAgICAgIHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9VbmF2YWlsYWJsZVwiLCBcIk5vIHNlIHB1ZG8gb2J0ZW5lciBlbCB0aXBvIGRlIGNhbWJpby5cIilcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xyXG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcclxuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcclxuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xyXG4gICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcclxuICAgICAgICAgICAgc2FmZVRleHQoZXJyb3IubWVzc2FnZSkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX1VuYXZhaWxhYmxlXCIsIFwiTm8gc2UgcHVkbyBvYnRlbmVyIGVsIHRpcG8gZGUgY2FtYmlvLlwiKVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcclxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xyXG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcclxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcclxuICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9VbmF2YWlsYWJsZVwiLCBcIk5vIHNlIHB1ZG8gb2J0ZW5lciBlbCB0aXBvIGRlIGNhbWJpby5cIikpO1xyXG4gICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIGlmICghaXNDYW5jZWxsZWQpIHtcclxuICAgICAgICAgIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LCBFWENIQU5HRV9SQVRFX0RFQk9VTkNFX01TKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpc0NhbmNlbGxlZCA9IHRydWU7XHJcbiAgICAgIGNsZWFyUmVxdWVzdEFydGlmYWN0cygpO1xyXG4gICAgfTtcclxuICB9LCBbXHJcbiAgICBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcclxuICAgIGZvcm1FeGNoYW5nZURhdGUsXHJcbiAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXHJcbiAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcclxuICAgIHVpTG9jYWxlLFxyXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUVuYWJsZUVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoaXNDcmVhdGVNb2RlIHx8IGlzTG9hZGluZyB8fCAhaGVhZGVyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWNhbkVkaXRBbnlDdXJyZW50KSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgc2V0SXNFZGl0aW5nKHRydWUpO1xyXG4gICAgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlcihoZWFkZXIpO1xyXG4gICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9FZGl0aW5nRW5hYmxlZFwiLCBcIkVkaXRpbmcgZW5hYmxlZFwiKSk7XHJcbiAgfSwgW2NhbkVkaXRBbnlDdXJyZW50LCBoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIsIGlzQ3JlYXRlTW9kZSwgaXNMb2FkaW5nLCBvbkZvcmJpZGRlbl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDYW5jZWxFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvRXhwZW5zZVNoZWV0c1wiLCB7XHJcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNFZGl0aW5nKSByZXR1cm47XHJcblxyXG4gICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XHJcbiAgICBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyKGhlYWRlcik7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIikpO1xyXG4gIH0sIFtoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIsIGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nXSk7XHJcblxyXG4gIC8vIE9wZW5zIGV4cGVuc2Ugc2hlZXQgY3JlYXRlIG1vZGUgZnJvbSBsaXN0LWxldmVsIGVudHJ5IHBvaW50cy5cclxuICBjb25zdCBoYW5kbGVPcGVuQ3JlYXRlU2hlZXRNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFjYW5DcmVhdGVFeHBlbnNlKSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP21vZGU9Y3JlYXRlXCIsIHtcclxuICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXHJcbiAgICB9KTtcclxuICB9LCBbY2FuQ3JlYXRlRXhwZW5zZSwgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmcsIG9uRm9yYmlkZGVuXSk7XHJcblxyXG4gIC8vIE9wZW5zIGV4cGVuc2UgbGluZSBjcmVhdGUgbW9kZSBmcm9tIGFuIGV4aXN0aW5nIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlxyXG4gIGNvbnN0IGhhbmRsZU9wZW5DcmVhdGVMaW5lTW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghc2hlZXRJZCB8fCAhY2FuVXNlRnVsbEVkaXRGZWF0dXJlcykge1xyXG4gICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0TGluZURldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2hlZXRJZCl9Jm1vZGU9Y3JlYXRlYDtcclxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCwge1xyXG4gICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcclxuICAgIH0pO1xyXG4gIH0sIFtjYW5Vc2VGdWxsRWRpdEZlYXR1cmVzLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcclxuXHJcbiAgLy8gT3BlbnMgdGlja2V0cyBwYWdlIGZyb20gZXhwZW5zZSBzaGVldCBjb250ZXh0IHRvIGNyZWF0ZSBvciBsaW5rIHRpY2tldHMuXHJcbiAgY29uc3Qgb3BlblRpY2tldHNGcm9tU2hlZXQgPSB1c2VDYWxsYmFjayhcclxuICAgIChhY3Rpb246IFwibmV3XCIgfCBcImxpbmtcIikgPT4ge1xyXG4gICAgICBpZiAoIXNoZWV0SWQgfHwgIWNhblVzZUZ1bGxFZGl0RmVhdHVyZXMpIHtcclxuICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcclxuICAgICAgICBhY3Rpb24sXHJcbiAgICAgICAgaG9qYUdhc3Rvc0lkOiBzaGVldElkLFxyXG4gICAgICB9KTtcclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0cz8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xyXG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogaXNFZGl0aW5nLFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbY2FuVXNlRnVsbEVkaXRGZWF0dXJlcywgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmcsIG9uRm9yYmlkZGVuLCBzaGVldElkXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU9wZW5DcmVhdGVUaWNrZXRNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgb3BlblRpY2tldHNGcm9tU2hlZXQoXCJuZXdcIik7XHJcbiAgfSwgW29wZW5UaWNrZXRzRnJvbVNoZWV0XSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIG9wZW5UaWNrZXRzRnJvbVNoZWV0KFwibGlua1wiKTtcclxuICB9LCBbb3BlblRpY2tldHNGcm9tU2hlZXRdKTtcclxuXHJcbiAgY29uc3QgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldCA9IHVzZUNhbGxiYWNrKChjcmVhdGVkU2hlZXRJZDogc3RyaW5nKSA9PiB7XHJcbiAgICBjb25zdCBzYWZlQ3JlYXRlZFNoZWV0SWQgPSBzYWZlVGV4dChjcmVhdGVkU2hlZXRJZCk7XHJcbiAgICBpZiAoIXNhZmVDcmVhdGVkU2hlZXRJZCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHRhcmdldFVybCA9IGAvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZUNyZWF0ZWRTaGVldElkKX1gO1xyXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwodGFyZ2V0VXJsKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IG5hdmlnYXRlVG9MaW5lRGV0YWlsID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoXHJcbiAgICAgIGxpbmVSZWNJZDogc3RyaW5nLFxyXG4gICAgICBvcHRpb25zPzoge1xyXG4gICAgICAgIG1vZGU/OiBcInZpZXdcIiB8IFwiZWRpdFwiO1xyXG4gICAgICAgIGFza0NvbmZpcm1hdGlvbj86IGJvb2xlYW47XHJcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlPzogYm9vbGVhbjtcclxuICAgICAgfVxyXG4gICAgKSA9PiB7XHJcbiAgICAgIGNvbnN0IHNhZmVMaW5lSWQgPSBzYWZlVGV4dChsaW5lUmVjSWQpO1xyXG4gICAgICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KHNoZWV0SWQpO1xyXG4gICAgICBpZiAoIXNhZmVMaW5lSWQgfHwgIXNhZmVTaGVldElkKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBzYWZlTW9kZSA9IG9wdGlvbnM/Lm1vZGUgPT09IFwiZWRpdFwiID8gXCJlZGl0XCIgOiBcIlwiO1xyXG4gICAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXRMaW5lRGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlU2hlZXRJZCl9JmxpbmVSZWNJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlTGluZUlkKX0ke3NhZmVNb2RlID8gYCZtb2RlPSR7c2FmZU1vZGV9YCA6IFwiXCJ9YDtcclxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwodGFyZ2V0VXJsLCB7XHJcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBvcHRpb25zPy5hc2tDb25maXJtYXRpb24gPz8gdHJ1ZSxcclxuICAgICAgICBieXBhc3NHdWFyZE9uY2U6IG9wdGlvbnM/LmJ5cGFzc0d1YXJkT25jZSA/PyBmYWxzZSxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW3NoZWV0SWRdXHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGhlYWRlcixcclxuICAgIGxpbmVzLFxyXG4gICAgbGluZVBhZ2UsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICBidXN5LFxyXG4gICAgc3RhdHVzLFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgbW9kYWxFcnJvcixcclxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXHJcbiAgICBkcmFmdFByb2plY3RJZCxcclxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxyXG4gICAgZHJhZnRFeGNoYW5nZVJhdGUsXHJcbiAgICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxyXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcclxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUsXHJcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSxcclxuICAgIGlzRXhjaGFuZ2VSYXRlTG9hZGluZyxcclxuICAgIGV4Y2hhbmdlUmF0ZU1lc3NhZ2UsXHJcbiAgICBleGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcixcclxuICAgIHByb2plY3RWYWx1ZSxcclxuICAgIGlzU2hlZXRBcHByb3ZlZCxcclxuICAgIGlzU2hlZXRQYWlkLFxyXG4gICAgaXNTaGVldExvY2tlZCxcclxuICAgIGV4Y2hhbmdlUmF0ZVZhbHVlLFxyXG4gICAgc2hvd0V4Y2hhbmdlUmF0ZSxcclxuICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxyXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxyXG4gICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50OiBFWENIQU5HRV9SQVRFX1JFRkVSRU5DRV9BTU9VTlQsXHJcbiAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSxcclxuICAgIGRldGFpbFBvbGljeSxcclxuICAgIGlzTWFuYWdpbmdPdGhlclVzZXIsXHJcbiAgICBjYW5FZGl0U3RhdHVzQ29tbWVudEN1cnJlbnQsXHJcbiAgICBjYW5FZGl0QW55Q3VycmVudCxcclxuICAgIGNhblVzZUZ1bGxFZGl0RmVhdHVyZXMsXHJcbiAgICBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCxcclxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxyXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxyXG4gICAgc2V0TGluZVBhZ2UsXHJcbiAgICBzZXRMaW5lcyxcclxuICAgIHNldEJ1c3ksXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzZXRJc0VkaXRpbmcsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcclxuICAgIHNldERyYWZ0UHJvamVjdElkLFxyXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXHJcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSxcclxuICAgIHNldERyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXHJcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxyXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICAgIGhhbmRsZU9wZW5DcmVhdGVTaGVldE1vZGUsXHJcbiAgICBoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUsXHJcbiAgICBoYW5kbGVPcGVuQ3JlYXRlVGlja2V0TW9kZSxcclxuICAgIGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSxcclxuICAgIG5hdmlnYXRlVG9DcmVhdGVkU2hlZXQsXHJcbiAgICBuYXZpZ2F0ZVRvTGluZURldGFpbCxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG4vLyBTaGFyZWQgaWNvbiBnbHlwaHMgZm9yIHRoZSBleHBlbnNlIHNoZWV0IGRldGFpbCBhY3Rpb24gbWVudS5cbmV4cG9ydCBjb25zdCBOZXdUaWNrZXRJY29uID0gKCkgPT4gKFxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsxLjV9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzTmFtZT1cInNpemUtNVwiPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTEwIDIwaC01YTIgMiAwIDAgMSAtMiAtMnYtOWEyIDIgMCAwIDEgMiAtMmgxYTIgMiAwIDAgMCAyIC0yYTEgMSAwIDAgMSAxIC0xaDZhMSAxIDAgMCAxIDEgMWEyIDIgMCAwIDAgMiAyaDFhMiAyIDAgMCAxIDIgMnYyXCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNC4zNjIgMTEuMTVhMyAzIDAgMSAwIC00LjE0NCA0LjI2M1wiIC8+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgMjF2LTRhMiAyIDAgMSAxIDQgMHY0XCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAxOWg0XCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0yMSAxNXY2XCIgLz5cbiAgPC9zdmc+XG4pO1xuXG5leHBvcnQgY29uc3QgTGlua1RpY2tldEljb24gPSAoKSA9PiAoXG4gIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9ezEuNX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3NOYW1lPVwic2l6ZS01XCI+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTMuMTkgOC42ODhhNC41IDQuNSAwIDAgMSAxLjI0MiA3LjI0NGwtNC41IDQuNWE0LjUgNC41IDAgMCAxLTYuMzY0LTYuMzY0bDEuNzU3LTEuNzU3bTEzLjM1LS42MjIgMS43NTctMS43NTdhNC41IDQuNSAwIDAgMC02LjM2NC02LjM2NGwtNC41IDQuNWE0LjUgNC41IDAgMCAwIDEuMjQyIDcuMjQ0XCIgLz5cbiAgPC9zdmc+XG4pO1xuXG5leHBvcnQgY29uc3QgTmV3TGluZUljb24gPSAoKSA9PiAoXG4gIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9ezEuNX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3NOYW1lPVwic2l6ZS01XCI+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMyAxOWMzLjMzMyAtMiA1IC00IDUgLTZjMCAtMyAtMSAtMyAtMiAtM3MtMi4wMzIgMS4wODUgLTIgM2MuMDM0IDIuMDQ4IDEuNjU4IDIuODc3IDIuNSA0YzEuNSAyIDIuNSAyLjUgMy41IDFjLjY2NyAtMSAxLjE2NyAtMS44MzMgMS41IC0yLjVjMSAyLjMzMyAyLjMzMyAzLjUgNCAzLjVoMi41XCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0yMCAxN3YtMTJjMCAtMS4xMjEgLS44NzkgLTIgLTIgLTJzLTIgLjg3OSAtMiAydjEybDIgMmwyIC0yXCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNiA3aDRcIiAvPlxuICA8L3N2Zz5cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBa0I7OztBQ0FsQixJQUFBQyxnQkFBa0I7OztBQ0FsQixtQkFBaUY7QUFDakYsdUJBQTZCO0FBbUhyQjtBQXZHUixJQUFNLDBCQUEwQixDQUFDLFlBQThDO0FBQzdFLE1BQUksT0FBTyxZQUFZLFVBQVU7QUFDL0IsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUFPLFFBQVEsUUFBUSxtQkFBbUIsSUFBSTtBQUNoRDtBQUdBLElBQU0sd0JBQXdCLENBQUM7QUFBQSxFQUM3QjtBQUFBLEVBQ0E7QUFBQSxFQUNBLFlBQVk7QUFBQSxFQUNaLGlCQUFpQjtBQUNuQixNQUFrQztBQUNoQyxRQUFNLGdDQUFnQztBQUN0QyxRQUFNLDhCQUE4QjtBQUNwQyxRQUFNLHVCQUF1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O0FBQUEsUUFDL0MsV0FBVyxLQUFLLHlCQUF5QixrQ0FBa0M7QUFBQSxRQUMzRSxrQkFBa0IsV0FBVztBQUFBLFFBQzdCLGNBQWMsV0FBVztBQUFBLFFBQ3pCLGtCQUFrQixXQUFXO0FBQUEsUUFDN0IsWUFBWSxXQUFXO0FBQUE7QUFBQSxJQUN6QixJQUNFO0FBQUEsSUFFSCxXQUFXLHNCQUNWO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxTQUFTLFdBQVcsYUFBYTtBQUFBLFFBQ2pDLE1BQU0sV0FBVyxRQUFRLFdBQVc7QUFBQSxRQUNwQyxVQUFVLFdBQVc7QUFBQSxRQUNyQixlQUFlLFdBQVc7QUFBQTtBQUFBLElBQzVCLElBQ0U7QUFBQSxJQUVILFdBQVcsVUFDVjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsV0FBVyxLQUFLLDZCQUE2QixxQkFBa0I7QUFBQSxRQUMvRCxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxRQUFRLFdBQVcsc0JBQXNCLG9DQUFvQztBQUFBLFFBQzdFLGVBQWUsS0FBSyw2QkFBNkIscUJBQWtCO0FBQUEsUUFDbkUsV0FBVyxXQUFXO0FBQUE7QUFBQSxJQUN4QixJQUNFO0FBQUEsS0FDTjtBQUVKO0FBR0EsSUFBTSx5QkFBeUIsTUFBTTtBQUNuQyxTQUNFLDZDQUFDLGdDQUFxQix5QkFBdUIsTUFDM0MsdURBQUMsaUNBQThCLEdBQ2pDO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsaUNBQStCO0FBQy9CLFFBQU0sU0FBUyxTQUFTLGVBQWUsMkJBQTJCO0FBQ2xFLE1BQUksQ0FBQyxPQUFRO0FBQ2IsbUJBQWlCLFFBQVEsNkNBQUMsMEJBQXVCLENBQUU7QUFDckQ7QUFFQSx1QkFBdUIsS0FBSztBQUU1QixJQUFPLGlDQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJSZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJyZXNwb25zZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiXQp9Cg==
