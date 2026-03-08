import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-NYJJSKPB.js";
import {
  useExpenseSheetQuickTicketFlow
} from "./chunks/chunk-GGLWCDII.js";
import {
  getExpenseSheetStatusOptions,
  getExpenseStatusLabel
} from "./chunks/chunk-ZN2XQFXY.js";
import "./chunks/chunk-LBAUQXUT.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-CCXORWXW.js";
import "./chunks/chunk-6HMZLOGF.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseCurrencyFlagIcon_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-OQYUG3ZL.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-AGYAFSYB.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-BZQM6LH3.js";
import {
  useOutsideClick
} from "./chunks/chunk-6YXFJB4W.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-MHFNPMJW.js";
import "./chunks/chunk-KJ3UA2J6.js";
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
  safeText,
  setExpenseNavigationGuard,
  toIsoDate
} from "./chunks/chunk-TWBQPWHO.js";
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
} from "./chunks/chunk-IDWB5SME.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-FQJSMENJ.js";
import "./chunks/chunk-LCBK6SHP.js";
import {
  Spinner_default,
  canAccess,
  classNames,
  indFormat,
  indT,
  showPermissionModal
} from "./chunks/chunk-BYICIYT4.js";
import "./chunks/chunk-7SKLSV7K.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunks/chunk-BWM3JLWG.js";
import {
  ApiFetchError
} from "./chunks/chunk-REMMAK3K.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/gastos/detail/ExpenseSheetDetailPage.tsx
var import_react5 = __toESM(require_react());

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
      const linkedTicketFileId = safeText(line.fileId);
      const dateParts = formatExpenseDateParts(safeText(line.transDate), document?.documentElement?.lang || "es-ES");
      const ticketStatusIcon = linkedTicketFileId ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          strokeWidth: 1.5,
          stroke: "currentColor",
          className: "h-4 w-4",
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
          statusIcon: ticketStatusIcon,
          statusIconClassName: "expense-line-card__ticket-icon",
          statusLabel: linkedTicketFileId || void 0
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
  canEditHeaderFields,
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
    const requiresExchangeRate = canEditHeaderFields && normalizedCurrency !== "" && normalizedCurrency !== normalizedBaseCurrency;
    const parsedExchangeRate = normalizeExchangeRate(normalizedExchangeRateRaw);
    const officialExchangeRate = normalizeExchangeRate(officialExchangeRateValue);
    const originalExchangeRate = normalizeExchangeRate(lockedExchangeRate);
    const parsedCurrentExchangeRateMode = Number(currentExchangeRateMode);
    const hasCurrentExchangeRateMode = Number.isInteger(parsedCurrentExchangeRateMode) && parsedCurrentExchangeRateMode >= 0;
    const hasValidRate = parsedExchangeRate != null && parsedExchangeRate > 0;
    const parsedDraftStatus = Number(draftExpenseSheetStatus);
    const hasDraftStatus = Number.isInteger(parsedDraftStatus) && parsedDraftStatus >= 0;
    const hasManualRateEditOnUpdate = canEditHeaderFields && !isCreateMode && hasValidRate && (originalExchangeRate == null || !areRatesEquivalent(parsedExchangeRate, originalExchangeRate));
    const isManualExchangeRate = (() => {
      if (!canEditHeaderFields) return false;
      if (!requiresExchangeRate || !hasValidRate) return false;
      if (isExchangeRateLockedByLines) return false;
      if (!isCreateMode && !hasManualRateEditOnUpdate) return false;
      if (officialExchangeRate == null) return true;
      return !areRatesEquivalent(parsedExchangeRate, officialExchangeRate);
    })();
    const resolvedExchangeRateMode = canEditHeaderFields ? isManualExchangeRate ? 1 : normalizedEstadoComentarios ? hasCurrentExchangeRateMode ? parsedCurrentExchangeRateMode : 0 : void 0 : hasCurrentExchangeRateMode ? parsedCurrentExchangeRateMode : void 0;
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
    canEditHeaderFields,
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

// Web/wwwroot/react/src/pages/gastos/detail/ExpenseSheetDetailPage.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var LINES_PAGE_SIZE = 6;
var normalizeUserId = (value) => String(value || "").trim();
var isSameUser = (left, right) => {
  const normalizedLeft = normalizeUserId(left).toUpperCase();
  const normalizedRight = normalizeUserId(right).toUpperCase();
  return !!normalizedLeft && normalizedLeft === normalizedRight;
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
  const { allowSelfManagement, canManageOtherUsers, currentAxUserId, selectedManagedUserId } = useAuthContext();
  const hasAccess = canAccess("GASTOS_HOJA_GASTO", "View");
  const canEditExpenseByModule = canAccess("GASTOS_HOJA_GASTO", "Edit");
  const canDeleteExpense = canAccess("GASTOS_HOJA_GASTO", "FullAccess");
  const canCreateExpense = canAccess("GASTOS_HOJA_GASTO", "Add");
  const sheetId = safeText(window.__EXPENSE_SHEET_ID__);
  const sheetMode = safeText(window.__EXPENSE_SHEET_MODE__).toLowerCase();
  const isCreateMode = sheetMode === "create";
  const isManagingOtherUser = !isCreateMode && canManageOtherUsers && !!normalizeUserId(currentAxUserId) && !!normalizeUserId(selectedManagedUserId) && !isSameUser(selectedManagedUserId, currentAxUserId);
  const canCreateExpenseForCurrentView = canCreateExpense && !isManagingOtherUser;
  const canEditHeaderFields = canEditExpenseByModule && !isManagingOtherUser;
  const canEditExpenseStatusByPermission = !isCreateMode && (allowSelfManagement === true && !isManagingOtherUser || canManageOtherUsers && isManagingOtherUser);
  const canEditExpense = canEditHeaderFields || canEditExpenseStatusByPermission;
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
    canCreateExpense: canCreateExpenseForCurrentView,
    canEditExpense,
    canEditHeaderFields,
    sheetId,
    isCreateMode,
    onForbidden: showPermissionModal
  });
  const canEditExpenseStatus = canEditExpenseStatusByPermission && !isSheetLocked;
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
  }, [busy, handleConfirm]);
  const modalLoadingText = indT("Common_Loading", "Loading");
  const modalCancelText = modal.cancelText || indT("Confirm_No", "Cancel");
  const modalConfirmText = busy ? modalLoadingText : !busy && modalError ? indT("Common_OK", "OK") : modal.confirmText || indT("Confirm_Yes", "OK");
  const handleModalButtonConfirm = (0, import_react5.useCallback)(() => {
    if (!busy && modalError) {
      closeConfirm();
      return;
    }
    handleModalConfirm();
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
  const { handleUpdate, handleDelete } = useExpenseSheetDetailMutations({
    busy,
    isEditing,
    isCreateMode,
    isLocked: isSheetLocked,
    isCurrencyLockedByLines,
    isExchangeRateLockedByLines,
    lockedCurrencyCode: safeText(header?.currencyCode),
    lockedExchangeRate: safeText(header?.exchRate),
    canCreateExpense: canCreateExpenseForCurrentView,
    canEditExpense,
    canDeleteExpense,
    canEditHeaderFields,
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
  const handleSaveSuccess = (0, import_react5.useCallback)(() => {
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
    canCreateExpense: canCreateExpenseForCurrentView,
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
    canCreateExpense: canCreateExpenseForCurrentView,
    isCreateMode,
    isSheetLocked,
    onForbidden: showPermissionModal,
    onCompleted: (result) => {
      const createdFileId = safeText(result?.fileId);
      if (!createdFileId) {
        window.location.reload();
        return;
      }
      const currentSheetId = safeText(header?.hojaGastosId || sheetId);
      const query = new URLSearchParams({
        fileId: createdFileId,
        mode: "edit",
        origin: "sheet-create"
      });
      if (currentSheetId) {
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
        accept: "image/jpeg,image/jpg,image/png,image/webp",
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
        accept: "image/jpeg,image/jpg,image/png,image/webp",
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
        canEditHeaderFields,
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
    canCreateExpenseForCurrentView && !isCreateMode && !isSheetLocked ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(VisitasPageProviders_default, { enableExpenseManagement: true, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ExpenseSheetDetailPageContent, {}) });
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvRXhwZW5zZVNoZWV0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VTaGVldEhlYWRlckZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvSW5mb1BvcG92ZXJJY29uQnV0dG9uLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbnN0YW50cy9leGNoYW5nZVJhdGVFbnRyeU1vZGVDYXRhbG9nLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlTGluZXNUaW1lbGluZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xuaW1wb3J0IEZsb2F0aW5nQWN0aW9uQnV0dG9uLCB7IHR5cGUgRmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbSB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdBY3Rpb25CdXR0b24udHN4XCI7XG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NwaW5uZXIudHN4XCI7XG5pbXBvcnQgeyB1c2VBdXRoQ29udGV4dCB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xuaW1wb3J0IHsgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUaW1lbGluZUNhcmRFZmZlY3RzLnRzXCI7XG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IEV4cGVuc2VTaGVldEhlYWRlckZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0SGVhZGVyRm9ybS50c3hcIjtcbmltcG9ydCBFeHBlbnNlTGluZXNUaW1lbGluZSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlTGluZXNUaW1lbGluZS50c3hcIjtcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlTnVtYmVyIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcbmltcG9ydCB7IGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cudHNcIjtcblxuY29uc3QgTElORVNfUEFHRV9TSVpFID0gNjtcblxuY29uc3Qgbm9ybWFsaXplVXNlcklkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCk7XG5cbmNvbnN0IGlzU2FtZVVzZXIgPSAobGVmdDogc3RyaW5nLCByaWdodDogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRMZWZ0ID0gbm9ybWFsaXplVXNlcklkKGxlZnQpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRSaWdodCA9IG5vcm1hbGl6ZVVzZXJJZChyaWdodCkudG9VcHBlckNhc2UoKTtcbiAgcmV0dXJuICEhbm9ybWFsaXplZExlZnQgJiYgbm9ybWFsaXplZExlZnQgPT09IG5vcm1hbGl6ZWRSaWdodDtcbn07XG5cbmNvbnN0IHBhZ2VkU2xpY2UgPSA8VCw+KGl0ZW1zOiBUW10sIHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlcik6IFRbXSA9PiB7XG4gIGlmICghaXRlbXMubGVuZ3RoKSByZXR1cm4gW107XG4gIGNvbnN0IHNhZmVQYWdlID0gTWF0aC5tYXgoMSwgcGFnZSk7XG4gIGNvbnN0IHN0YXJ0ID0gKHNhZmVQYWdlIC0gMSkgKiBwYWdlU2l6ZTtcbiAgcmV0dXJuIGl0ZW1zLnNsaWNlKHN0YXJ0LCBzdGFydCArIHBhZ2VTaXplKTtcbn07XG5cbi8vIEluaXRpYWxpemVzIGF1dGggc2VlZCBmb3IgZXhwZW5zZSBBUEkgY2FsbHMgYmVmb3JlIGlzbGFuZCBlZmZlY3RzIHJ1bi5cbmNvbnN0IGJvb3RzdHJhcEV4cGVuc2VBcGlBdXRoID0gKCkgPT4ge1xuICBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCh7XG4gICAgdG9rZW46IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXG4gICAgYXBwQ29kZTogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxuICB9KTtcbn07XG5cbmNvbnN0IE5ld1RpY2tldEljb24gPSAoKSA9PiAoXG4gIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9ezEuNX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3NOYW1lPVwiaC01IHctNVwiPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTEwIDIwaC01YTIgMiAwIDAgMSAtMiAtMnYtOWEyIDIgMCAwIDEgMiAtMmgxYTIgMiAwIDAgMCAyIC0yYTEgMSAwIDAgMSAxIC0xaDZhMSAxIDAgMCAxIDEgMWEyIDIgMCAwIDAgMiAyaDFhMiAyIDAgMCAxIDIgMnYyXCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNC4zNjIgMTEuMTVhMyAzIDAgMSAwIC00LjE0NCA0LjI2M1wiIC8+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgMjF2LTRhMiAyIDAgMSAxIDQgMHY0XCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAxOWg0XCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0yMSAxNXY2XCIgLz5cbiAgPC9zdmc+XG4pO1xuXG5jb25zdCBMaW5rVGlja2V0SWNvbiA9ICgpID0+IChcbiAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD17MS41fSBhcmlhLWhpZGRlbj1cInRydWVcIiBjbGFzc05hbWU9XCJoLTUgdy01XCI+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTMuMTkgOC42ODhhNC41IDQuNSAwIDAgMSAxLjI0MiA3LjI0NGwtNC41IDQuNWE0LjUgNC41IDAgMCAxLTYuMzY0LTYuMzY0bDEuNzU3LTEuNzU3bTEzLjM1LS42MjIgMS43NTctMS43NTdhNC41IDQuNSAwIDAgMC02LjM2NC02LjM2NGwtNC41IDQuNWE0LjUgNC41IDAgMCAwIDEuMjQyIDcuMjQ0XCIgLz5cbiAgPC9zdmc+XG4pO1xuXG5jb25zdCBOZXdMaW5lSWNvbiA9ICgpID0+IChcbiAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD17MS41fSBhcmlhLWhpZGRlbj1cInRydWVcIiBjbGFzc05hbWU9XCJoLTUgdy01XCI+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMyAxOWMzLjMzMyAtMiA1IC00IDUgLTZjMCAtMyAtMSAtMyAtMiAtM3MtMi4wMzIgMS4wODUgLTIgM2MuMDM0IDIuMDQ4IDEuNjU4IDIuODc3IDIuNSA0YzEuNSAyIDIuNSAyLjUgMy41IDFjLjY2NyAtMSAxLjE2NyAtMS44MzMgMS41IC0yLjVjMSAyLjMzMyAyLjMzMyAzLjUgNCAzLjVoMi41XCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0yMCAxN3YtMTJjMCAtMS4xMjEgLS44NzkgLTIgLTIgLTJzLTIgLjg3OSAtMiAydjEybDIgMmwyIC0yXCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNiA3aDRcIiAvPlxuICA8L3N2Zz5cbik7XG5cbmNvbnN0IEV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250ZW50ID0gKCkgPT4ge1xuICBjb25zdCB7IGFsbG93U2VsZk1hbmFnZW1lbnQsIGNhbk1hbmFnZU90aGVyVXNlcnMsIGN1cnJlbnRBeFVzZXJJZCwgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkIH0gPSB1c2VBdXRoQ29udGV4dCgpO1xuICBjb25zdCBoYXNBY2Nlc3MgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIlZpZXdcIik7XG4gIGNvbnN0IGNhbkVkaXRFeHBlbnNlQnlNb2R1bGUgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIkVkaXRcIik7XG4gIGNvbnN0IGNhbkRlbGV0ZUV4cGVuc2UgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIkZ1bGxBY2Nlc3NcIik7XG4gIGNvbnN0IGNhbkNyZWF0ZUV4cGVuc2UgPSBjYW5BY2Nlc3MoXCJHQVNUT1NfSE9KQV9HQVNUT1wiLCBcIkFkZFwiKTtcbiAgY29uc3Qgc2hlZXRJZCA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfU0hFRVRfSURfXyk7XG4gIGNvbnN0IHNoZWV0TW9kZSA9IHNhZmVUZXh0KHdpbmRvdy5fX0VYUEVOU0VfU0hFRVRfTU9ERV9fKS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBpc0NyZWF0ZU1vZGUgPSBzaGVldE1vZGUgPT09IFwiY3JlYXRlXCI7XG4gIGNvbnN0IGlzTWFuYWdpbmdPdGhlclVzZXIgPVxuICAgICFpc0NyZWF0ZU1vZGUgJiZcbiAgICBjYW5NYW5hZ2VPdGhlclVzZXJzICYmXG4gICAgISFub3JtYWxpemVVc2VySWQoY3VycmVudEF4VXNlcklkKSAmJlxuICAgICEhbm9ybWFsaXplVXNlcklkKHNlbGVjdGVkTWFuYWdlZFVzZXJJZCkgJiZcbiAgICAhaXNTYW1lVXNlcihzZWxlY3RlZE1hbmFnZWRVc2VySWQsIGN1cnJlbnRBeFVzZXJJZCk7XG4gIGNvbnN0IGNhbkNyZWF0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyA9IGNhbkNyZWF0ZUV4cGVuc2UgJiYgIWlzTWFuYWdpbmdPdGhlclVzZXI7XG4gIGNvbnN0IGNhbkVkaXRIZWFkZXJGaWVsZHMgPSBjYW5FZGl0RXhwZW5zZUJ5TW9kdWxlICYmICFpc01hbmFnaW5nT3RoZXJVc2VyO1xuICBjb25zdCBjYW5FZGl0RXhwZW5zZVN0YXR1c0J5UGVybWlzc2lvbiA9XG4gICAgIWlzQ3JlYXRlTW9kZSAmJiAoKGFsbG93U2VsZk1hbmFnZW1lbnQgPT09IHRydWUgJiYgIWlzTWFuYWdpbmdPdGhlclVzZXIpIHx8IChjYW5NYW5hZ2VPdGhlclVzZXJzICYmIGlzTWFuYWdpbmdPdGhlclVzZXIpKTtcbiAgY29uc3QgY2FuRWRpdEV4cGVuc2UgPSBjYW5FZGl0SGVhZGVyRmllbGRzIHx8IGNhbkVkaXRFeHBlbnNlU3RhdHVzQnlQZXJtaXNzaW9uO1xuICBjb25zdCBsaW5lQ29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGNyZWF0ZWRTaGVldElkUmVmID0gdXNlUmVmKFwiXCIpO1xuICBjb25zdCBjYW1lcmFJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGdhbGxlcnlJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsIHNldElzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZpcnN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIiksXG4gICAgICBwcmV2OiBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKSxcbiAgICAgIG5leHQ6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIiksXG4gICAgICBsYXN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpLFxuICAgIH0pLFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3Qge1xuICAgIGhlYWRlcixcbiAgICBsaW5lcyxcbiAgICBsaW5lUGFnZSxcbiAgICBpc0xvYWRpbmcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGJ1c3ksXG4gICAgc3RhdHVzLFxuICAgIGlzRWRpdGluZyxcbiAgICBtb2RhbEVycm9yLFxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgZHJhZnRQcm9qZWN0SWQsXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgZHJhZnRFeGNoYW5nZVJhdGUsXG4gICAgZHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlLFxuICAgIHByb2plY3RWYWx1ZSxcbiAgICB2b3VjaGVyVmFsdWUsXG4gICAgaXNTaGVldFBhaWQsXG4gICAgaXNTaGVldExvY2tlZCxcbiAgICBleGNoYW5nZVJhdGVWYWx1ZSxcbiAgICBzaG93RXhjaGFuZ2VSYXRlLFxuICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQsXG4gICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXG4gICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxuICAgIHNldExpbmVQYWdlLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXG4gICAgc2V0RHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gICAgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlLFxuICAgIGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSxcbiAgICBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0LFxuICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsLFxuICB9ID0gdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUoe1xuICAgIGhhc0FjY2VzcyxcbiAgICBjYW5DcmVhdGVFeHBlbnNlOiBjYW5DcmVhdGVFeHBlbnNlRm9yQ3VycmVudFZpZXcsXG4gICAgY2FuRWRpdEV4cGVuc2UsXG4gICAgY2FuRWRpdEhlYWRlckZpZWxkcyxcbiAgICBzaGVldElkLFxuICAgIGlzQ3JlYXRlTW9kZSxcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcbiAgfSk7XG5cbiAgY29uc3QgY2FuRWRpdEV4cGVuc2VTdGF0dXMgPSBjYW5FZGl0RXhwZW5zZVN0YXR1c0J5UGVybWlzc2lvbiAmJiAhaXNTaGVldExvY2tlZDtcblxuICBjb25zdCB7IG1vZGFsLCBvcGVuQ29uZmlybSwgY2xvc2VDb25maXJtLCBoYW5kbGVDb25maXJtIH0gPSB1c2VDb25maXJtRGlhbG9nKHtcbiAgICBkZWZhdWx0Q29uZmlybVRleHQ6IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpLFxuICAgIGRlZmF1bHRDYW5jZWxUZXh0OiBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKSxcbiAgfSk7XG5cbiAgY29uc3QgaGFuZGxlTW9kYWxDb25maXJtID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XG4gICAgICBidXN5LFxuICAgICAgb25FcnJvcjogKG1zZykgPT4ge1xuICAgICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XG4gICAgICAgIHNldFN0YXR1cyhtc2cpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfSwgW2J1c3ksIGhhbmRsZUNvbmZpcm1dKTtcblxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNhbmNlbFwiKTtcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGJ1c3lcbiAgICA/IG1vZGFsTG9hZGluZ1RleHRcbiAgICA6ICghYnVzeSAmJiBtb2RhbEVycm9yID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpIDogKG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpKSk7XG5cbiAgY29uc3QgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghYnVzeSAmJiBtb2RhbEVycm9yKSB7XG4gICAgICBjbG9zZUNvbmZpcm0oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaGFuZGxlTW9kYWxDb25maXJtKCk7XG4gIH0sIFtidXN5LCBjbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybSwgbW9kYWxFcnJvcl0pO1xuXG4gIGNvbnN0IHZpc2libGVMaW5lcyA9IHVzZU1lbW8oKCkgPT4gcGFnZWRTbGljZShsaW5lcywgbGluZVBhZ2UsIExJTkVTX1BBR0VfU0laRSksIFtsaW5lUGFnZSwgbGluZXNdKTtcbiAgY29uc3QgdG90YWxMaW5lUGFnZXMgPSBNYXRoLmNlaWwoKGxpbmVzLmxlbmd0aCB8fCAwKSAvIExJTkVTX1BBR0VfU0laRSk7XG4gIGNvbnN0IHRvdGFsQW1vdW50VGV4dCA9IHVzZU1lbW8oXG4gICAgKCkgPT5cbiAgICAgIGZvcm1hdEV4cGVuc2VOdW1iZXIoaGVhZGVyPy50b3RhbEFtb3VudCwge1xuICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgICAgIGZhbGxiYWNrOiBcIi1cIixcbiAgICAgIH0pLFxuICAgIFtoZWFkZXI/LnRvdGFsQW1vdW50XVxuICApO1xuXG4gIGNvbnN0IHsgaGFuZGxlVXBkYXRlLCBoYW5kbGVEZWxldGUgfSA9IHVzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9ucyh7XG4gICAgYnVzeSxcbiAgICBpc0VkaXRpbmcsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIGlzTG9ja2VkOiBpc1NoZWV0TG9ja2VkLFxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcbiAgICBsb2NrZWRDdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSxcbiAgICBsb2NrZWRFeGNoYW5nZVJhdGU6IHNhZmVUZXh0KGhlYWRlcj8uZXhjaFJhdGUpLFxuICAgIGNhbkNyZWF0ZUV4cGVuc2U6IGNhbkNyZWF0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyxcbiAgICBjYW5FZGl0RXhwZW5zZSxcbiAgICBjYW5EZWxldGVFeHBlbnNlLFxuICAgIGNhbkVkaXRIZWFkZXJGaWVsZHMsXG4gICAgY2FuRWRpdFN0YXR1czogY2FuRWRpdEV4cGVuc2VTdGF0dXMsXG4gICAgc2hlZXRJZCxcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsXG4gICAgZHJhZnRQcm9qZWN0SWQsXG4gICAgZHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcbiAgICBjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzOiBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyxcbiAgICBjdXJyZW50RXhjaGFuZ2VSYXRlTW9kZTogaGVhZGVyPy5leGNoYW5nZVJhdGVNb2RlLFxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgICBvbkNyZWF0ZVN1Y2Nlc3M6IChjcmVhdGVkU2hlZXRJZCkgPT4ge1xuICAgICAgY3JlYXRlZFNoZWV0SWRSZWYuY3VycmVudCA9IHNhZmVUZXh0KGNyZWF0ZWRTaGVldElkKTtcbiAgICB9LFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRTdGF0dXMsXG4gICAgc2V0SXNFZGl0aW5nLFxuICB9KTtcblxuICBjb25zdCBoYW5kbGVTYXZlU3VjY2VzcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICBjb25zdCBjcmVhdGVkU2hlZXRJZCA9IHNhZmVUZXh0KGNyZWF0ZWRTaGVldElkUmVmLmN1cnJlbnQpO1xuICAgICAgaWYgKCFjcmVhdGVkU2hlZXRJZCkgcmV0dXJuO1xuICAgICAgc2V0SXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlKHRydWUpO1xuICAgICAgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldChjcmVhdGVkU2hlZXRJZCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9LCBbaXNDcmVhdGVNb2RlLCBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0XSk7XG5cbiAgdXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9ucyh7XG4gICAgYnVzeTogYnVzeSB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsXG4gICAgbW9kYWxPcGVuOiBtb2RhbC5vcGVuLFxuICAgIGlzRWRpdGluZyxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgaXNMb2NrZWQ6IGlzU2hlZXRMb2NrZWQsXG4gICAgY2FuQ3JlYXRlRXhwZW5zZTogY2FuQ3JlYXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxuICAgIGNhbkVkaXRFeHBlbnNlLFxuICAgIGNhbkRlbGV0ZUV4cGVuc2UsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlVXBkYXRlLFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgICBvblNhdmVTdWNjZXNzOiBoYW5kbGVTYXZlU3VjY2VzcyxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBjbG9zZUNvbmZpcm0sXG4gIH0pO1xuXG4gIGNvbnN0IHJlc29sdmVDbGlja2FibGVDYXJkID0gdXNlQ2FsbGJhY2soKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XG4gICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG4gICAgaWYgKCFub2RlIHx8IHR5cGVvZiBub2RlLmNsb3Nlc3QgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgY2FyZCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIpO1xuICAgIGlmICghY2FyZCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCFsaW5lQ29udGFpbmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKGNhcmQpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY2FyZDtcbiAgfSwgW10pO1xuXG4gIHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMoe1xuICAgIGNvbnRhaW5lclJlZjogbGluZUNvbnRhaW5lclJlZixcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgaXRlbXM6IHZpc2libGVMaW5lcyxcbiAgICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcbiAgfSk7XG5cbiAgY29uc3Qge1xuICAgIHNvdXJjZVBpY2tlck9wZW4sXG4gICAgYnVzeTogcXVpY2tUaWNrZXRCdXN5LFxuICAgIHByb2dyZXNzTWVzc2FnZTogcXVpY2tUaWNrZXRQcm9ncmVzc01lc3NhZ2UsXG4gICAgZXJyb3JNZXNzYWdlOiBxdWlja1RpY2tldEVycm9yTWVzc2FnZSxcbiAgICBoYXNQZW5kaW5nVXBsb2FkUmV0cnksXG4gICAgdHJhY2VMaXN0OiBxdWlja1RpY2tldFRyYWNlTGlzdCxcbiAgICBvcGVuU291cmNlUGlja2VyLFxuICAgIGNsb3NlU291cmNlUGlja2VyLFxuICAgIHNlbGVjdEZyb21DYW1lcmEsXG4gICAgc2VsZWN0RnJvbUdhbGxlcnksXG4gICAgaGFuZGxlU2VsZWN0ZWRGaWxlLFxuICAgIHJldHJ5UGVuZGluZ1VwbG9hZCxcbiAgICBjbGVhckVycm9yOiBjbGVhclF1aWNrVGlja2V0RXJyb3IsXG4gIH0gPSB1c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3coe1xuICAgIHNoZWV0SWQ6IHNhZmVUZXh0KGhlYWRlcj8uaG9qYUdhc3Rvc0lkIHx8IHNoZWV0SWQpLFxuICAgIHByb2plY3RJZDogcHJvamVjdFZhbHVlLFxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQoaGVhZGVyPy5jdXJyZW5jeUNvZGUpLFxuICAgIGNhbkNyZWF0ZUV4cGVuc2U6IGNhbkNyZWF0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgaXNTaGVldExvY2tlZCxcbiAgICBvbkZvcmJpZGRlbjogc2hvd1Blcm1pc3Npb25Nb2RhbCxcbiAgICBvbkNvbXBsZXRlZDogKHJlc3VsdCkgPT4ge1xuICAgICAgY29uc3QgY3JlYXRlZEZpbGVJZCA9IHNhZmVUZXh0KHJlc3VsdD8uZmlsZUlkKTtcbiAgICAgIGlmICghY3JlYXRlZEZpbGVJZCkge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGN1cnJlbnRTaGVldElkID0gc2FmZVRleHQoaGVhZGVyPy5ob2phR2FzdG9zSWQgfHwgc2hlZXRJZCk7XG4gICAgICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoe1xuICAgICAgICBmaWxlSWQ6IGNyZWF0ZWRGaWxlSWQsXG4gICAgICAgIG1vZGU6IFwiZWRpdFwiLFxuICAgICAgICBvcmlnaW46IFwic2hlZXQtY3JlYXRlXCIsXG4gICAgICB9KTtcbiAgICAgIGlmIChjdXJyZW50U2hlZXRJZCkge1xuICAgICAgICBxdWVyeS5zZXQoXCJzaGVldElkXCIsIGN1cnJlbnRTaGVldElkKTtcbiAgICAgIH1cbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldERldGFpbD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCk7XG4gICAgfSxcbiAgfSk7XG5cbiAgY29uc3QgZmFiTWVudUl0ZW1zID0gdXNlTWVtbzxGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtW10+KFxuICAgICgpID0+IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6IFwibmV3LXRpY2tldFwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX05ld1RpY2tldFwiLCBcIk51ZXZvIFRpY2tldFwiKSxcbiAgICAgICAgaWNvbjogPE5ld1RpY2tldEljb24gLz4sXG4gICAgICAgIG9uQ2xpY2s6IG9wZW5Tb3VyY2VQaWNrZXIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogXCJsaW5rLXRpY2tldFwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX0xpbmtUaWNrZXRcIiwgXCJWaW5jdWxhciBUaWNrZXRcIiksXG4gICAgICAgIGljb246IDxMaW5rVGlja2V0SWNvbiAvPixcbiAgICAgICAgb25DbGljazogaGFuZGxlT3BlbkxpbmtUaWNrZXRNb2RlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6IFwibmV3LWxpbmVcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9OZXdMaW5lXCIsIFwiTnVldmEgTGluZWFcIiksXG4gICAgICAgIGljb246IDxOZXdMaW5lSWNvbiAvPixcbiAgICAgICAgb25DbGljazogaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlLFxuICAgICAgfSxcbiAgICBdLFxuICAgIFtoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUsIGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSwgb3BlblNvdXJjZVBpY2tlcl1cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICA8Q29uZmlybU1vZGFsXG4gICAgICAgIG9wZW49e21vZGFsLm9wZW59XG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cbiAgICAgICAgbWVzc2FnZT17bW9kYWwubWVzc2FnZX1cbiAgICAgICAgY29uZmlybVRleHQ9e21vZGFsQ29uZmlybVRleHR9XG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cbiAgICAgICAgbG9hZGluZ1RleHQ9e21vZGFsTG9hZGluZ1RleHR9XG4gICAgICAgIHNob3dDYW5jZWw9e21vZGFsLnNob3dDYW5jZWx9XG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cbiAgICAgICAgYnVzeT17YnVzeSB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGV9XG4gICAgICAgIGVycm9yPXttb2RhbEVycm9yfVxuICAgICAgICBzdGF0dXM9e3N0YXR1c31cbiAgICAgICAgb25Db25maXJtPXtoYW5kbGVNb2RhbEJ1dHRvbkNvbmZpcm19XG4gICAgICAgIG9uQ2FuY2VsPXtjbG9zZUNvbmZpcm19XG4gICAgICAvPlxuXG4gICAgICA8aW5wdXRcbiAgICAgICAgcmVmPXtjYW1lcmFJbnB1dFJlZn1cbiAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICBhY2NlcHQ9XCJpbWFnZS9qcGVnLGltYWdlL2pwZyxpbWFnZS9wbmcsaW1hZ2Uvd2VicFwiXG4gICAgICAgIGNhcHR1cmU9XCJlbnZpcm9ubWVudFwiXG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICBjb25zdCBmaWxlID0gZXZlbnQuY3VycmVudFRhcmdldC5maWxlcz8uWzBdIHx8IG51bGw7XG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgdm9pZCBoYW5kbGVTZWxlY3RlZEZpbGUoZmlsZSwgXCJjYW1lcmFcIik7XG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICAgPGlucHV0XG4gICAgICAgIHJlZj17Z2FsbGVyeUlucHV0UmVmfVxuICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgIGFjY2VwdD1cImltYWdlL2pwZWcsaW1hZ2UvanBnLGltYWdlL3BuZyxpbWFnZS93ZWJwXCJcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZpbGUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmZpbGVzPy5bMF0gfHwgbnVsbDtcbiAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgICB2b2lkIGhhbmRsZVNlbGVjdGVkRmlsZShmaWxlLCBcImdhbGxlcnlcIik7XG4gICAgICAgIH19XG4gICAgICAvPlxuXG4gICAgICB7c291cmNlUGlja2VyT3BlbiA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNjAwMDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTk1MC80NSBweC00IHB5LTZcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtYXgtdy1zbSByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZSBwLTQgc2hhZG93LXhsXCI+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1bMTZweF0gZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9UaXRsZVwiLCBcIk51ZXZvIHRpY2tldFwiKX1cbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0xIHRleHQtc20gdGV4dC1zbGF0ZS02MDBcIj5cbiAgICAgICAgICAgICAge2luZFQoXG4gICAgICAgICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfQm9keVwiLFxuICAgICAgICAgICAgICAgIFwiU2VsZWNjaW9uYSB1bmEgZnVlbnRlIHBhcmEgY2FwdHVyYXIgbyBlbGVnaXIgbGEgaW1hZ2VuIGRlbCB0aWNrZXQuXCJcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IGdyaWQgZ3JpZC1jb2xzLTEgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdm9pZCBzZWxlY3RGcm9tQ2FtZXJhKGNhbWVyYUlucHV0UmVmLmN1cnJlbnQpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9DYW1lcmFcIiwgXCJVc2FyIGNhbWFyYVwiKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biB3LWZ1bGwgcHgtMyBweS0yIHRleHQtc21cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNlbGVjdEZyb21HYWxsZXJ5KGdhbGxlcnlJbnB1dFJlZi5jdXJyZW50KX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX0dhbGxlcnlcIiwgXCJFbGVnaXIgaW1hZ2VuXCIpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17Y2xvc2VTb3VyY2VQaWNrZXJ9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIil9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIHtxdWlja1RpY2tldEJ1c3kgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTYwMDAwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1zbGF0ZS05NTAvMzUgcHgtNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUvOTUgcHgtNCBweS0zIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIj5cbiAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTUgdy01XCIgbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9IC8+XG4gICAgICAgICAgICA8c3Bhbj57cXVpY2tUaWNrZXRQcm9ncmVzc01lc3NhZ2UgfHwgaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIHtxdWlja1RpY2tldEVycm9yTWVzc2FnZSA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBzcGFjZS15LTIgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy1yb3NlLTUwIHAtMyB0ZXh0LXNtIHRleHQtcm9zZS04MDBcIj5cbiAgICAgICAgICA8cD57cXVpY2tUaWNrZXRFcnJvck1lc3NhZ2V9PC9wPlxuICAgICAgICAgIHtxdWlja1RpY2tldFRyYWNlTGlzdC5sZW5ndGggPiAwID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3VuZGVkLWxnIGJvcmRlciBib3JkZXItcm9zZS0yMDAgYmctd2hpdGUgcC0yIHRleHQteHMgdGV4dC1yb3NlLTcwMFwiPlxuICAgICAgICAgICAgICB7cXVpY2tUaWNrZXRUcmFjZUxpc3QubWFwKChlbnRyeSkgPT4gKFxuICAgICAgICAgICAgICAgIDxwIGtleT17YCR7ZW50cnkuc3RlcH0tJHtlbnRyeS5hdH1gfT57YCR7ZW50cnkuc3RlcH06ICR7ZW50cnkudHJhY2VJZH1gfTwvcD5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGdhcC0yXCI+XG4gICAgICAgICAgICB7aGFzUGVuZGluZ1VwbG9hZFJldHJ5ID8gKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gcHgtMyBweS0xLjUgdGV4dC14c1wiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdm9pZCByZXRyeVBlbmRpbmdVcGxvYWQoKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9SZXRyeVVwbG9hZFwiLCBcIlJlaW50ZW50YXIgdXBsb2FkXCIpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gcHgtMyBweS0xLjUgdGV4dC14c1wiIG9uQ2xpY2s9e2NsZWFyUXVpY2tUaWNrZXRFcnJvcn0+XG4gICAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0Nsb3NlXCIsIFwiQ2xvc2VcIil9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIlxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBpc0xvYWRpbmcgfHwgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9fVxuICAgICAgPlxuICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxuICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XG4gICAgICA8L2Rpdj5cblxuICAgICAge2Vycm9yTWVzc2FnZSA/IDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57ZXJyb3JNZXNzYWdlfTwvZGl2PiA6IG51bGx9XG5cbiAgICAgIHshaXNMb2FkaW5nICYmICFpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUgJiYgIWVycm9yTWVzc2FnZSAmJiBoZWFkZXIgPyAoXG4gICAgICAgIDxFeHBlbnNlU2hlZXRIZWFkZXJGb3JtXG4gICAgICAgICAgaXNDcmVhdGVNb2RlPXtpc0NyZWF0ZU1vZGV9XG4gICAgICAgICAgaXNFZGl0aW5nPXtpc0VkaXRpbmd9XG4gICAgICAgICAgY2FuRWRpdEhlYWRlckZpZWxkcz17Y2FuRWRpdEhlYWRlckZpZWxkc31cbiAgICAgICAgICBjYW5FZGl0U3RhdHVzPXtjYW5FZGl0RXhwZW5zZVN0YXR1c31cbiAgICAgICAgICBoZWFkZXI9e2hlYWRlcn1cbiAgICAgICAgICBwcm9qZWN0VmFsdWU9e3Byb2plY3RWYWx1ZX1cbiAgICAgICAgICB2b3VjaGVyVmFsdWU9e3ZvdWNoZXJWYWx1ZX1cbiAgICAgICAgICBpc1NoZWV0UGFpZD17aXNTaGVldFBhaWR9XG4gICAgICAgICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXM9e2lzQ3VycmVuY3lMb2NrZWRCeUxpbmVzfVxuICAgICAgICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcz17aXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzfVxuICAgICAgICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5PXtub3JtYWxpemVkRHJhZnRDdXJyZW5jeX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k9e2V4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQ9e2V4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudH1cbiAgICAgICAgICBzaG93RXhjaGFuZ2VSYXRlPXtzaG93RXhjaGFuZ2VSYXRlfVxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZVZhbHVlPXtleGNoYW5nZVJhdGVWYWx1ZX1cbiAgICAgICAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZT17ZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2V9XG4gICAgICAgICAgdG90YWxBbW91bnRUZXh0PXt0b3RhbEFtb3VudFRleHR9XG4gICAgICAgICAgZHJhZnREZXNjcmlwdGlvbj17ZHJhZnREZXNjcmlwdGlvbn1cbiAgICAgICAgICBkcmFmdFByb2plY3RJZD17ZHJhZnRQcm9qZWN0SWR9XG4gICAgICAgICAgZHJhZnRDdXJyZW5jeUNvZGU9e2RyYWZ0Q3VycmVuY3lDb2RlfVxuICAgICAgICAgIGRyYWZ0RXhjaGFuZ2VSYXRlPXtkcmFmdEV4Y2hhbmdlUmF0ZX1cbiAgICAgICAgICBkcmFmdEV4cGVuc2VTaGVldFN0YXR1cz17ZHJhZnRFeHBlbnNlU2hlZXRTdGF0dXN9XG4gICAgICAgICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcz17ZHJhZnRFc3RhZG9Db21lbnRhcmlvc31cbiAgICAgICAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlPXtvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlfVxuICAgICAgICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZT17b2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlfVxuICAgICAgICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlPXtvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZX1cbiAgICAgICAgICBvbkRyYWZ0RGVzY3JpcHRpb25DaGFuZ2U9e3NldERyYWZ0RGVzY3JpcHRpb259XG4gICAgICAgICAgb25EcmFmdFByb2plY3RJZENoYW5nZT17c2V0RHJhZnRQcm9qZWN0SWR9XG4gICAgICAgICAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZT17c2V0RHJhZnRDdXJyZW5jeUNvZGV9XG4gICAgICAgICAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZT17c2V0RHJhZnRFeGNoYW5nZVJhdGV9XG4gICAgICAgICAgb25EcmFmdEV4cGVuc2VTaGVldFN0YXR1c0NoYW5nZT17c2V0RHJhZnRFeHBlbnNlU2hlZXRTdGF0dXN9XG4gICAgICAgICAgb25EcmFmdEVzdGFkb0NvbWVudGFyaW9zQ2hhbmdlPXtzZXREcmFmdEVzdGFkb0NvbWVudGFyaW9zfVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIHshaXNDcmVhdGVNb2RlICYmICFpc0xvYWRpbmcgJiYgIWlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSAmJiAhZXJyb3JNZXNzYWdlID8gKFxuICAgICAgICA8RXhwZW5zZUxpbmVzVGltZWxpbmVcbiAgICAgICAgICB2aXNpYmxlTGluZXM9e3Zpc2libGVMaW5lc31cbiAgICAgICAgICBjdXJyZW5jeUNvZGU9e3NhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKX1cbiAgICAgICAgICB0b3RhbExpbmVQYWdlcz17dG90YWxMaW5lUGFnZXN9XG4gICAgICAgICAgbGluZVBhZ2U9e2xpbmVQYWdlfVxuICAgICAgICAgIGxpbmVzTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0xpbmVzXCIsIFwiTGluZXNcIil9XG4gICAgICAgICAgZW1wdHlUZXh0PXtpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob0xpbmVzXCIsIFwiTm8gbGluZXMgZm9yIHRoaXMgZXhwZW5zZSBzaGVldC5cIil9XG4gICAgICAgICAgcGFnaW5hdGlvbkxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cbiAgICAgICAgICBjb250YWluZXJSZWY9e2xpbmVDb250YWluZXJSZWZ9XG4gICAgICAgICAgb25MaW5lUGFnZUNoYW5nZT17c2V0TGluZVBhZ2V9XG4gICAgICAgICAgb25PcGVuTGluZT17bmF2aWdhdGVUb0xpbmVEZXRhaWx9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cblxuICAgICAge2NhbkNyZWF0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyAmJiAhaXNDcmVhdGVNb2RlICYmICFpc1NoZWV0TG9ja2VkID8gKFxuICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b25cbiAgICAgICAgICBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgcmFwaWRhc1wiKX1cbiAgICAgICAgICBzaXplPXs3Nn1cbiAgICAgICAgICByaWdodD17MTZ9XG4gICAgICAgICAgYm90dG9tPXsyNH1cbiAgICAgICAgICBtZW51QXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfQWN0aW9uc1wiLCBcIkFjY2lvbmVzIHJhcGlkYXNcIil9XG4gICAgICAgICAgbWVudUl0ZW1zPXtmYWJNZW51SXRlbXN9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbi8vIE1haW4gcGFnZSBlbnRyeSBmb3IgZXhwZW5zZSBzaGVldCBkZXRhaWwuXG5jb25zdCBFeHBlbnNlU2hlZXREZXRhaWxQYWdlID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycyBlbmFibGVFeHBlbnNlTWFuYWdlbWVudD5cbiAgICAgIDxFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udGVudCAvPlxuICAgIDwvVmlzaXRhc1BhZ2VQcm92aWRlcnM+XG4gICk7XG59O1xuXG5jb25zdCBtb3VudCA9ICgpID0+IHtcbiAgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGgoKTtcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJleHBlbnNlLXNoZWV0LWRldGFpbC1yb290XCIpO1xuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPEV4cGVuc2VTaGVldERldGFpbFBhZ2UgLz4pO1xufTtcblxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldERldGFpbFBhZ2U7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaW5kRm9ybWF0LCBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0SGVhZGVyIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQgZnJvbSBcIi4vRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dC50c3hcIjtcbmltcG9ydCBFeHBlbnNlUmVhZE9ubHlGaWVsZCBmcm9tIFwiLi9FeHBlbnNlUmVhZE9ubHlGaWVsZC50c3hcIjtcbmltcG9ydCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QgZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0LnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uIGZyb20gXCIuL0V4cGVuc2VDdXJyZW5jeUZsYWdJY29uLnRzeFwiO1xuaW1wb3J0IEluZm9Qb3BvdmVySWNvbkJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0luZm9Qb3BvdmVySWNvbkJ1dHRvbi50c3hcIjtcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZVNoZWV0U3RhdHVzT3B0aW9ucywgZ2V0RXhwZW5zZVN0YXR1c0xhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlU3RhdHVzQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhjaGFuZ2VSYXRlRW50cnlNb2RlQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyLCBmb3JtYXRFeHBlbnNlTnVtYmVyLCBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xuXG50eXBlIEV4cGVuc2VTaGVldEhlYWRlckZvcm1Qcm9wcyA9IHtcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGJvb2xlYW47XG4gIGNhbkVkaXRTdGF0dXM6IGJvb2xlYW47XG4gIGhlYWRlcjogRXhwZW5zZVNoZWV0SGVhZGVyO1xuICBwcm9qZWN0VmFsdWU6IHN0cmluZztcbiAgdm91Y2hlclZhbHVlOiBzdHJpbmc7XG4gIGlzU2hlZXRQYWlkOiBib29sZWFuO1xuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogYm9vbGVhbjtcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xuICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeTogc3RyaW5nO1xuICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k6IHN0cmluZztcbiAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50OiBudW1iZXI7XG4gIHNob3dFeGNoYW5nZVJhdGU6IGJvb2xlYW47XG4gIGV4Y2hhbmdlUmF0ZVZhbHVlOiBzdHJpbmc7XG4gIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlOiBzdHJpbmc7XG4gIHRvdGFsQW1vdW50VGV4dDogc3RyaW5nO1xuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGRyYWZ0UHJvamVjdElkOiBzdHJpbmc7XG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGRyYWZ0RXhjaGFuZ2VSYXRlOiBzdHJpbmc7XG4gIGRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzOiBudW1iZXI7XG4gIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3M6IHN0cmluZztcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZTogc3RyaW5nO1xuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGU6IHN0cmluZztcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2U6IHN0cmluZztcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdFByb2plY3RJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdEV4cGVuc2VTaGVldFN0YXR1c0NoYW5nZTogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQ7XG4gIG9uRHJhZnRFc3RhZG9Db21lbnRhcmlvc0NoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG59O1xuXG5jb25zdCBFWENIQU5HRV9SQVRFX01PREVfUFJFRklYX1BBVFRFUk4gPSAvXlRcXC4/Q1xcLj9cXHMqL2k7XG5cbi8vIFB1cmUgcHJlc2VudGF0aW9uYWwgaGVhZGVyIGZvcm0gZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsL2NyZWF0ZSBzY3JlZW5zLlxuY29uc3QgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybSA9ICh7XG4gIGlzQ3JlYXRlTW9kZSxcbiAgaXNFZGl0aW5nLFxuICBjYW5FZGl0SGVhZGVyRmllbGRzLFxuICBjYW5FZGl0U3RhdHVzLFxuICBoZWFkZXIsXG4gIHByb2plY3RWYWx1ZSxcbiAgdm91Y2hlclZhbHVlLFxuICBpc1NoZWV0UGFpZCxcbiAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXG4gIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcbiAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXG4gIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LFxuICBzaG93RXhjaGFuZ2VSYXRlLFxuICBleGNoYW5nZVJhdGVWYWx1ZSxcbiAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXG4gIHRvdGFsQW1vdW50VGV4dCxcbiAgZHJhZnREZXNjcmlwdGlvbixcbiAgZHJhZnRQcm9qZWN0SWQsXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICBkcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgZHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSxcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZSxcbiAgb25EcmFmdFByb2plY3RJZENoYW5nZSxcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZSxcbiAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZSxcbiAgb25EcmFmdEV4cGVuc2VTaGVldFN0YXR1c0NoYW5nZSxcbiAgb25EcmFmdEVzdGFkb0NvbWVudGFyaW9zQ2hhbmdlLFxufTogRXhwZW5zZVNoZWV0SGVhZGVyRm9ybVByb3BzKSA9PiB7XG4gIGNvbnN0IGlzRm9yZWlnbkN1cnJlbmN5ID1cbiAgICBpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkcyAmJiBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSAhPT0gXCJcIiAmJiBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSAhPT0gZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5O1xuICBjb25zdCBleHBlbnNlQ3VycmVuY3lMYWJlbCA9IGlzRm9yZWlnbkN1cnJlbmN5XG4gICAgPyBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9FeHBlbnNlQ3VycmVuY3lcIiwgXCJFeHBlbnNlIGN1cnJlbmN5XCIpXG4gICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpO1xuICBjb25zdCBzdGF0dXNWYWx1ZSA9XG4gICAgaGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gbnVsbCB8fCBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzID09PSB1bmRlZmluZWRcbiAgICAgID8gXCItXCJcbiAgICAgIDogZ2V0RXhwZW5zZVN0YXR1c0xhYmVsKGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMpO1xuICBjb25zdCBoZWFkZXJDdXJyZW5jeUNvZGUgPSBzYWZlVGV4dChoZWFkZXIuY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBiYXNlQ3VycmVuY3lDb2RlID0gc2FmZVRleHQoZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBzdGF0dXNPcHRpb25zID0gUmVhY3QudXNlTWVtbygoKSA9PiBnZXRFeHBlbnNlU2hlZXRTdGF0dXNPcHRpb25zKCksIFtdKTtcbiAgY29uc3Qgc3RhdHVzRHJhZnRWYWx1ZSA9IFN0cmluZyhOdW1iZXIuaXNJbnRlZ2VyKGRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzKSA/IGRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzIDogMCk7XG4gIGNvbnN0IHN0YXR1c0NvbW1lbnRWYWx1ZSA9IHNhZmVUZXh0KGhlYWRlci5lc3RhZG9Db21lbnRhcmlvcyk7XG4gIGNvbnN0IHNob3dTdGF0dXNDb21tZW50RmllbGQgPSAhaXNDcmVhdGVNb2RlICYmICgoaXNFZGl0aW5nICYmIGNhbkVkaXRTdGF0dXMpIHx8ICEhc3RhdHVzQ29tbWVudFZhbHVlKTtcbiAgY29uc3QgbG9jYWxDdXJyZW5jeU9wdGlvbnMgPSBSZWFjdC51c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oXG4gICAgKCkgPT4gW1xuICAgICAge1xuICAgICAgICB2YWx1ZTogYmFzZUN1cnJlbmN5Q29kZSxcbiAgICAgICAgdGV4dDogYmFzZUN1cnJlbmN5Q29kZSxcbiAgICAgICAgaWNvbjogPEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uIGN1cnJlbmN5Q29kZT17YmFzZUN1cnJlbmN5Q29kZX0gc2l6ZUNsYXNzTmFtZT1cImgtNiB3LTZcIiAvPixcbiAgICAgIH0sXG4gICAgXSxcbiAgICBbYmFzZUN1cnJlbmN5Q29kZV1cbiAgKTtcbiAgY29uc3QgaGVhZGVyQ3VycmVuY3lPcHRpb25zID0gUmVhY3QudXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KFxuICAgICgpID0+IFtcbiAgICAgIHtcbiAgICAgICAgdmFsdWU6IGhlYWRlckN1cnJlbmN5Q29kZSB8fCBcIi1cIixcbiAgICAgICAgdGV4dDogaGVhZGVyQ3VycmVuY3lDb2RlIHx8IFwiLVwiLFxuICAgICAgICBpY29uOiA8RXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gY3VycmVuY3lDb2RlPXtoZWFkZXJDdXJyZW5jeUNvZGUgfHwgXCItXCJ9IHNpemVDbGFzc05hbWU9XCJoLTYgdy02XCIgLz4sXG4gICAgICB9LFxuICAgIF0sXG4gICAgW2hlYWRlckN1cnJlbmN5Q29kZV1cbiAgKTtcbiAgY29uc3QgcGFyc2VkRHJhZnRFeGNoYW5nZVJhdGUgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQoZHJhZnRFeGNoYW5nZVJhdGUpO1xuICBjb25zdCBwYXJzZWRPZmZpY2lhbFJhd1JhdGUgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQob2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSk7XG4gIGNvbnN0IGJhc2VFeGNoYW5nZVJhdGVWYWx1ZSA9XG4gICAgcGFyc2VkRHJhZnRFeGNoYW5nZVJhdGUgIT0gbnVsbFxuICAgICAgPyBwYXJzZWREcmFmdEV4Y2hhbmdlUmF0ZVxuICAgICAgOiBwYXJzZWRPZmZpY2lhbFJhd1JhdGUgIT0gbnVsbFxuICAgICAgICA/IHBhcnNlZE9mZmljaWFsUmF3UmF0ZSAqIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudFxuICAgICAgICA6IG51bGw7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZUluZm9WYWx1ZSA9IGZvcm1hdEV4cGVuc2VOdW1iZXIoXG4gICAgYmFzZUV4Y2hhbmdlUmF0ZVZhbHVlICE9IG51bGwgPyBiYXNlRXhjaGFuZ2VSYXRlVmFsdWUgLyBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQgOiBudWxsLFxuICAgIHtcbiAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogNyxcbiAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogNyxcbiAgICAgIHVzZUdyb3VwaW5nOiBmYWxzZSxcbiAgICAgIGZhbGxiYWNrOiBcIjAuMDAwMDAwMFwiLFxuICAgIH1cbiAgKTtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlTW9kZVZhbHVlID0gTnVtYmVyKGhlYWRlci5leGNoYW5nZVJhdGVNb2RlKSA9PT0gMSA/IDEgOiAwO1xuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlS2V5ID1cbiAgICBleGNoYW5nZVJhdGVNb2RlVmFsdWUgPT09IDFcbiAgICAgID8gXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX01hbnVhbFwiXG4gICAgICA6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9PZmZpY2lhbFwiO1xuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlRmFsbGJhY2sgPSBleGNoYW5nZVJhdGVNb2RlVmFsdWUgPT09IDEgPyBcIlQuQy4gTWFudWFsXCIgOiBcIlQuQy4gT2ZpY2lhbFwiO1xuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlTGFiZWwgPVxuICAgIChnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsKGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSkgfHwgaW5kVChleGNoYW5nZVJhdGVNb2RlS2V5LCBleGNoYW5nZVJhdGVNb2RlRmFsbGJhY2spKVxuICAgICAgLnJlcGxhY2UoRVhDSEFOR0VfUkFURV9NT0RFX1BSRUZJWF9QQVRURVJOLCBcIlwiKVxuICAgICAgLnRyaW0oKVxuICAgICAgLnRvTG93ZXJDYXNlKCkgfHwgKGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSA9PT0gMSA/IFwibWFudWFsXCIgOiBcIm9maWNpYWxcIik7XG4gIGNvbnN0IGhhc0VuZHBvaW50RXhjaGFuZ2VSYXRlRGF0YSA9XG4gICAgISFzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKSB8fCAhIXNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSkgfHwgISFzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSk7XG4gIGNvbnN0IGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb0RhdGUgPSBzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUpIHx8IGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xuICBjb25zdCBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9Tb3VyY2UgPSBzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSlcbiAgICAucmVwbGFjZSgvXFxzKlxcKFteKCldKlxcKVxccyovZywgXCIgXCIpXG4gICAgLnJlcGxhY2UoL1xcc3syLH0vZywgXCIgXCIpXG4gICAgLnRyaW0oKSB8fCBpbmRUKFwiQ29tbW9uX05vdEF2YWlsYWJsZVwiLCBcIk4vQVwiKTtcbiAgY29uc3QgZW5kcG9pbnRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZSA9IGluZEZvcm1hdChcbiAgICBcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX0luZm9Qb3BvdmVyX0RldGFpbFwiLFxuICAgIFwiVGlwbyBkZSBjYW1iaW8gb2J0ZW5pZG8gezB9XFxuRmVjaGE6IHsxfVxcbk9yaWdlbjogezJ9XCIsXG4gICAgc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSkgfHwgXCIwLjAwMDAwMDBcIixcbiAgICBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9EYXRlLFxuICAgIGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb1NvdXJjZVxuICApO1xuICBjb25zdCBzdG9yZWRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZSA9IGluZEZvcm1hdChcbiAgICBcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX0luZm9Qb3BvdmVyX1N0b3JlZFwiLFxuICAgIFwiVGlwbyBkZSBjYW1iaW8gezB9IHsxfVwiLFxuICAgIGV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCxcbiAgICBleGNoYW5nZVJhdGVJbmZvVmFsdWVcbiAgKTtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UgPSBoYXNFbmRwb2ludEV4Y2hhbmdlUmF0ZURhdGEgPyBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlIDogc3RvcmVkRXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2U7XG5cbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCI+XG4gICAgICAgIHshaXNDcmVhdGVNb2RlID8gKFxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1NoZWV0SWRcIiwgXCJFeHBlbnNlIHNoZWV0IGNvZGVcIil9XG4gICAgICAgICAgICB2YWx1ZT17c2FmZVRleHQoaGVhZGVyLmhvamFHYXN0b3NJZCkgfHwgXCItXCJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHshaXNDcmVhdGVNb2RlID8gKFxuICAgICAgICAgIGlzRWRpdGluZyAmJiBjYW5FZGl0U3RhdHVzID8gKFxuICAgICAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TdGF0dXNcIiwgXCJTdGF0dXNcIil9XG4gICAgICAgICAgICAgIG9wdGlvbnM9e3N0YXR1c09wdGlvbnN9XG4gICAgICAgICAgICAgIHZhbHVlPXtzdGF0dXNEcmFmdFZhbHVlfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IE51bWJlcihuZXh0VmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgJiYgcGFyc2VkID49IDApIHtcbiAgICAgICAgICAgICAgICAgIG9uRHJhZnRFeHBlbnNlU2hlZXRTdGF0dXNDaGFuZ2UocGFyc2VkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TdGF0dXNcIiwgXCJTdGF0dXNcIil9XG4gICAgICAgICAgICAgIGVtaXRPblZhbHVlQ2hhbmdlXG4gICAgICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgICAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS1oZWFkZXItc3RhdHVzXCJcbiAgICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzXCIsIFwiU3RhdHVzXCIpfSB2YWx1ZT17c3RhdHVzVmFsdWV9IC8+XG4gICAgICAgICAgKVxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge3Nob3dTdGF0dXNDb21tZW50RmllbGQgPyAoXG4gICAgICAgICAgaXNFZGl0aW5nICYmIGNhbkVkaXRTdGF0dXMgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1kOmNvbC1zcGFuLTIgc3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TdGF0dXNDb21tZW50XCIsIFwiU3RhdHVzIGNvbW1lbnRcIil9PC9sYWJlbD5cbiAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIHJlc2l6ZS1ub25lXCJcbiAgICAgICAgICAgICAgICByb3dzPXszfVxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdEVzdGFkb0NvbWVudGFyaW9zfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnRFc3RhZG9Db21lbnRhcmlvc0NoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzQ29tbWVudFwiLCBcIlN0YXR1cyBjb21tZW50XCIpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzQ29tbWVudFwiLCBcIlN0YXR1cyBjb21tZW50XCIpfVxuICAgICAgICAgICAgICB2YWx1ZT17c3RhdHVzQ29tbWVudFZhbHVlIHx8IFwiLVwifVxuICAgICAgICAgICAgICBmdWxsV2lkdGhcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKVxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge2lzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfTwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0RGVzY3JpcHRpb259XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XG4gICAgICAgICAgICB2YWx1ZT17c2FmZVRleHQoaGVhZGVyLmRlc2NyaXB0aW9uKSB8fCBcIi1cIn1cbiAgICAgICAgICAgIGZ1bGxXaWR0aFxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIHtpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkcyA/IChcbiAgICAgICAgICA8RXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9Qcm9qZWN0X1BsYWNlaG9sZGVyXCIsIFwiUHJvamVjdCBpZFwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtkcmFmdFByb2plY3RJZH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0UHJvamVjdElkQ2hhbmdlfVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmcgfHwgIWNhbkVkaXRIZWFkZXJGaWVsZHN9XG4gICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZyB8fCAhY2FuRWRpdEhlYWRlckZpZWxkc31cbiAgICAgICAgICAvPlxuICAgICAgICApIDogcHJvamVjdFZhbHVlID8gKFxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9IHZhbHVlPXtwcm9qZWN0VmFsdWV9IC8+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7IWlzRWRpdGluZyAmJiBpc1NoZWV0UGFpZCA/IChcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1ZvdWNoZXJcIiwgXCJWb3VjaGVyXCIpfSB2YWx1ZT17dm91Y2hlclZhbHVlIHx8IFwiLVwifSAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge2lzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZ3JpZCBnYXAtNCAke2lzRm9yZWlnbkN1cnJlbmN5ID8gXCJncmlkLWNvbHMtMlwiIDogXCJncmlkLWNvbHMtMVwifWAudHJpbSgpfT5cbiAgICAgICAgICAgICAge2lzRm9yZWlnbkN1cnJlbmN5ID8gKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57ZXhwZW5zZUN1cnJlbmN5TGFiZWx9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXtleHBlbnNlQ3VycmVuY3lMYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5X1BsYWNlaG9sZGVyXCIsIFwiQ3VycmVuY3kgY29kZVwiKX1cbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRDdXJyZW5jeUNvZGV9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmcgfHwgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXN9XG4gICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmcgfHwgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXN9XG4gICAgICAgICAgICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLWhlYWRlci1jdXJyZW5jeVwiXG4gICAgICAgICAgICAgICAgICAgICAgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBwci04IGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhjaGFuZ2VSYXRlXCIsIFwiRXhjaGFuZ2UgcmF0ZVwiKX08L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8SW5mb1BvcG92ZXJJY29uQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfSW5mb1BvcG92ZXJfQXJpYVwiLCBcIlNob3cgZXhjaGFuZ2UgcmF0ZSBpbmZvcm1hdGlvblwiKX1cbiAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PXtleGNoYW5nZVJhdGVJbmZvTWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSByaWdodC0wIC10b3AtMSB6LTIwXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvcm0tY29udHJvbCAke2V4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlID8gXCJib3JkZXItZGFuZ2VyIHJpbmctMSByaW5nLWRhbmdlclwiIDogXCJcIn0gJHtpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJcIn1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRNb2RlPVwiZGVjaW1hbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRFeGNoYW5nZVJhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cj17KGV2ZW50KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcihldmVudC50YXJnZXQudmFsdWUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogNyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogNyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsbGJhY2s6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhjaGFuZ2VSYXRlXCIsIFwiRXhjaGFuZ2UgcmF0ZVwiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9FeGNoYW5nZVJhdGVcIiwgXCJFeGNoYW5nZSByYXRlXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9e2lzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lc31cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXN9XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8RXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0XG4gICAgICAgICAgICAgICAgICBsYWJlbD17ZXhwZW5zZUN1cnJlbmN5TGFiZWx9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5X1BsYWNlaG9sZGVyXCIsIFwiQ3VycmVuY3kgY29kZVwiKX1cbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdEN1cnJlbmN5Q29kZX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmcgfHwgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXN9XG4gICAgICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZyB8fCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cbiAgICAgICAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtaGVhZGVyLWN1cnJlbmN5XCJcbiAgICAgICAgICAgICAgICAgIHByZWZlckRlZmF1bHRDdXJyZW5jeUZyb21Db250ZXh0XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7aXNGb3JlaWduQ3VycmVuY3kgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtNFwiPlxuICAgICAgICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0xvY2FsQ3VycmVuY3lcIiwgXCJMb2NhbCBjdXJyZW5jeVwiKX1cbiAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e2xvY2FsQ3VycmVuY3lPcHRpb25zfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2Jhc2VDdXJyZW5jeUNvZGV9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KCkgPT4gdW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeV9QbGFjZWhvbGRlclwiLCBcIkN1cnJlbmN5IGNvZGVcIil9XG4gICAgICAgICAgICAgICAgICByZWFkT25seVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWRcbiAgICAgICAgICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgIHNob3dTZWFyY2hCdXR0b249e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgc2hvd0xhYmVsXG4gICAgICAgICAgICAgICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRUZXh0TW9kZT1cInZhbHVlXCJcbiAgICAgICAgICAgICAgICAgIGRyb3Bkb3duTWF4SGVpZ2h0Q2xhc3M9XCJtYXgtaC05NlwiXG4gICAgICAgICAgICAgICAgICBzZWxlY3RlZEljb25DbGFzc05hbWU9XCJoLTYgdy02XCJcbiAgICAgICAgICAgICAgICAgIG9wdGlvbkljb25DbGFzc05hbWU9XCJoLTYgdy02XCJcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSW5wdXRQYWRkaW5nQ2xhc3NOYW1lPVwicGwtMTJcIlxuICAgICAgICAgICAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS1oZWFkZXItbG9jYWwtY3VycmVuY3lcIlxuICAgICAgICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgICAgICAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQW1vdW50XCIsIFwiQW1vdW50XCIpfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIGluZC1yZWFkb25seS1maWVsZFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtmb3JtYXRFeHBlbnNlTnVtYmVyKGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudCwge1xuICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogNyxcbiAgICAgICAgICAgICAgICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDcsXG4gICAgICAgICAgICAgICAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgZmFsbGJhY2s6IFwiLVwiLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQW1vdW50XCIsIFwiQW1vdW50XCIpfVxuICAgICAgICAgICAgICAgICAgICByZWFkT25seVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZFxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgICAge2lzRm9yZWlnbkN1cnJlbmN5ICYmIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlID8gPHAgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXIgdGV4dC1zbVwiPntleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZX08L3A+IDogbnVsbH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgb3B0aW9ucz17aGVhZGVyQ3VycmVuY3lPcHRpb25zfVxuICAgICAgICAgICAgdmFsdWU9e2hlYWRlckN1cnJlbmN5Q29kZSB8fCBcIi1cIn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiB1bmRlZmluZWR9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5X1BsYWNlaG9sZGVyXCIsIFwiQ3VycmVuY3kgY29kZVwiKX1cbiAgICAgICAgICAgIHJlYWRPbmx5XG4gICAgICAgICAgICBkaXNhYmxlZFxuICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxuICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XG4gICAgICAgICAgICBzaG93TGFiZWxcbiAgICAgICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XG4gICAgICAgICAgICBzZWxlY3RlZFRleHRNb2RlPVwidmFsdWVcIlxuICAgICAgICAgICAgZHJvcGRvd25NYXhIZWlnaHRDbGFzcz1cIm1heC1oLTk2XCJcbiAgICAgICAgICAgIHNlbGVjdGVkSWNvbkNsYXNzTmFtZT1cImgtNiB3LTZcIlxuICAgICAgICAgICAgb3B0aW9uSWNvbkNsYXNzTmFtZT1cImgtNiB3LTZcIlxuICAgICAgICAgICAgc2VsZWN0ZWRJbnB1dFBhZGRpbmdDbGFzc05hbWU9XCJwbC0xMlwiXG4gICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLWhlYWRlci1jdXJyZW5jeS1yZWFkb25seVwiXG4gICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIHshaXNFZGl0aW5nICYmIHNob3dFeGNoYW5nZVJhdGUgPyAoXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9FeGNoYW5nZVJhdGVcIiwgXCJFeGNoYW5nZSByYXRlXCIpfSB2YWx1ZT17ZXhjaGFuZ2VSYXRlVmFsdWV9IC8+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7IWlzQ3JlYXRlTW9kZSA/IDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVG90YWxBbW91bnRcIiwgXCJUb3RhbCBhbW91bnRcIil9IHZhbHVlPXt0b3RhbEFtb3VudFRleHR9IC8+IDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldEhlYWRlckZvcm07XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZUxheW91dEVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0IHsgdXNlT3V0c2lkZUNsaWNrIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZU91dHNpZGVDbGljay50c1wiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5cbnR5cGUgSW5mb1BvcG92ZXJJY29uQnV0dG9uUHJvcHMgPSB7XG4gIGNvbnRlbnQ6IFJlYWN0LlJlYWN0Tm9kZTtcbiAgYXJpYUxhYmVsOiBzdHJpbmc7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XG59O1xuXG4vLyBTaGFyZWQgZHVtYiBwb3BvdmVyIHRyaWdnZXIgdXNlZCB0byBkaXNwbGF5IHNob3J0IGNvbnRleHR1YWwgaW5mby5cbmNvbnN0IEluZm9Qb3BvdmVySWNvbkJ1dHRvbiA9ICh7XG4gIGNvbnRlbnQsXG4gIGFyaWFMYWJlbCxcbiAgY2xhc3NOYW1lID0gXCJcIixcbiAgcGFuZWxDbGFzc05hbWUgPSBcIlwiLFxufTogSW5mb1BvcG92ZXJJY29uQnV0dG9uUHJvcHMpID0+IHtcbiAgY29uc3QgSE9SSVpPTlRBTF9WSUVXUE9SVF9HVVRURVJfUFggPSA4O1xuICBjb25zdCBWRVJUSUNBTF9WSUVXUE9SVF9HVVRURVJfUFggPSA4O1xuICBjb25zdCBQQU5FTF9UUklHR0VSX0dBUF9QWCA9IDY7XG4gIGNvbnN0IEdMT0JBTF9SQURJVVMgPSBcInZhcigtLXJhZGl1cy14bCwgNXB4KVwiO1xuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcGFuZWxTdHlsZSwgc2V0UGFuZWxTdHlsZV0gPSB1c2VTdGF0ZTxSZWFjdC5DU1NQcm9wZXJ0aWVzPih7XG4gICAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgICB0b3A6IDAsXG4gICAgbGVmdDogMCxcbiAgICB2aXNpYmlsaXR5OiBcImhpZGRlblwiLFxuICB9KTtcbiAgY29uc3QgYnV0dG9uUmVmID0gdXNlUmVmPEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHBhbmVsUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgdXNlT3V0c2lkZUNsaWNrKFtidXR0b25SZWYsIHBhbmVsUmVmXSwgKCkgPT4gc2V0SXNPcGVuKGZhbHNlKSk7XG4gIGNvbnN0IHVwZGF0ZVBhbmVsUG9zaXRpb24gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBidXR0b25FbGVtZW50ID0gYnV0dG9uUmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgcGFuZWxFbGVtZW50ID0gcGFuZWxSZWYuY3VycmVudDtcbiAgICBpZiAoIWJ1dHRvbkVsZW1lbnQgfHwgIXBhbmVsRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGJ1dHRvblJlY3QgPSBidXR0b25FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHBhbmVsUmVjdCA9IHBhbmVsRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB2aWV3cG9ydFdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgY29uc3Qgdmlld3BvcnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgY29uc3Qgc2FmZVdpZHRoID0gTWF0aC5taW4ocGFuZWxSZWN0LndpZHRoLCBNYXRoLm1heCgxODAsIHZpZXdwb3J0V2lkdGggLSBIT1JJWk9OVEFMX1ZJRVdQT1JUX0dVVFRFUl9QWCAqIDIpKTtcblxuICAgIGxldCBsZWZ0ID0gYnV0dG9uUmVjdC5sZWZ0ICsgYnV0dG9uUmVjdC53aWR0aCAvIDIgLSBzYWZlV2lkdGggLyAyO1xuICAgIGxlZnQgPSBNYXRoLm1heChIT1JJWk9OVEFMX1ZJRVdQT1JUX0dVVFRFUl9QWCwgTWF0aC5taW4obGVmdCwgdmlld3BvcnRXaWR0aCAtIHNhZmVXaWR0aCAtIEhPUklaT05UQUxfVklFV1BPUlRfR1VUVEVSX1BYKSk7XG5cbiAgICBsZXQgdG9wID0gYnV0dG9uUmVjdC5ib3R0b20gKyBQQU5FTF9UUklHR0VSX0dBUF9QWDtcbiAgICBjb25zdCBoYXNCb3R0b21PdmVyZmxvdyA9IHRvcCArIHBhbmVsUmVjdC5oZWlnaHQgKyBWRVJUSUNBTF9WSUVXUE9SVF9HVVRURVJfUFggPiB2aWV3cG9ydEhlaWdodDtcbiAgICBpZiAoaGFzQm90dG9tT3ZlcmZsb3cpIHtcbiAgICAgIGNvbnN0IHRvcEFib3ZlVHJpZ2dlciA9IGJ1dHRvblJlY3QudG9wIC0gcGFuZWxSZWN0LmhlaWdodCAtIFBBTkVMX1RSSUdHRVJfR0FQX1BYO1xuICAgICAgdG9wID0gdG9wQWJvdmVUcmlnZ2VyID49IFZFUlRJQ0FMX1ZJRVdQT1JUX0dVVFRFUl9QWFxuICAgICAgICA/IHRvcEFib3ZlVHJpZ2dlclxuICAgICAgICA6IE1hdGgubWF4KFZFUlRJQ0FMX1ZJRVdQT1JUX0dVVFRFUl9QWCwgdmlld3BvcnRIZWlnaHQgLSBwYW5lbFJlY3QuaGVpZ2h0IC0gVkVSVElDQUxfVklFV1BPUlRfR1VUVEVSX1BYKTtcbiAgICB9XG5cbiAgICBzZXRQYW5lbFN0eWxlKHtcbiAgICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXG4gICAgICB0b3A6IE1hdGgucm91bmQodG9wKSxcbiAgICAgIGxlZnQ6IE1hdGgucm91bmQobGVmdCksXG4gICAgICB3aWR0aDogTWF0aC5yb3VuZChzYWZlV2lkdGgpLFxuICAgICAgdmlzaWJpbGl0eTogXCJ2aXNpYmxlXCIsXG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNPcGVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHVwZGF0ZVBhbmVsUG9zaXRpb24oKTtcbiAgfSwgW2lzT3BlbiwgY29udGVudCwgdXBkYXRlUGFuZWxQb3NpdGlvbl0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc09wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaGFuZGxlVmlld3BvcnRDaGFuZ2UgPSAoKSA9PiB1cGRhdGVQYW5lbFBvc2l0aW9uKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgaGFuZGxlVmlld3BvcnRDaGFuZ2UpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhhbmRsZVZpZXdwb3J0Q2hhbmdlLCB0cnVlKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgaGFuZGxlVmlld3BvcnRDaGFuZ2UpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlVmlld3BvcnRDaGFuZ2UsIHRydWUpO1xuICAgIH07XG4gIH0sIFtpc09wZW4sIHVwZGF0ZVBhbmVsUG9zaXRpb25dKTtcblxuICBjb25zdCBwb3J0YWxUYXJnZXQgPSB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIgPyBudWxsIDogZG9jdW1lbnQuYm9keTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiaW5saW5lLWZsZXhcIiwgY2xhc3NOYW1lKX0+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHJlZj17YnV0dG9uUmVmfVxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsfVxuICAgICAgICBhcmlhLWV4cGFuZGVkPXtpc09wZW59XG4gICAgICAgIGFyaWEtaGFzcG9wdXA9XCJkaWFsb2dcIlxuICAgICAgICBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBoLTYgdy02IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXRyYW5zcGFyZW50IGJnLXRyYW5zcGFyZW50IHAtMCB0ZXh0LXNsYXRlLTUwMCB0cmFuc2l0aW9uIGhvdmVyOnRleHQtcHJpbWFyeSBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5LzMwXCJcbiAgICAgICAgc3R5bGU9e3sgYm9yZGVyUmFkaXVzOiBHTE9CQUxfUkFESVVTIH19XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzT3BlbigocHJldmlvdXMpID0+ICFwcmV2aW91cyl9XG4gICAgICA+XG4gICAgICAgIDxzdmdcbiAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgICB3aWR0aD1cIjIwXCJcbiAgICAgICAgICBoZWlnaHQ9XCIyMFwiXG4gICAgICAgICAgdmlld0JveD1cIjMgMyAxOCAxOFwiXG4gICAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgIHN0cm9rZT1cIiM2NDc0OGJcIlxuICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMS43NVwiXG4gICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcbiAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcbiAgICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImJsb2NrXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxyZWN0IHg9XCI0XCIgeT1cIjRcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiByeD1cIjNcIiByeT1cIjNcIiAvPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTIgOWguMDFcIiAvPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTEgMTJoMXY0aDFcIiAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvYnV0dG9uPlxuXG4gICAgICB7aXNPcGVuICYmIHBvcnRhbFRhcmdldFxuICAgICAgICA/IGNyZWF0ZVBvcnRhbChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgcmVmPXtwYW5lbFJlZn1cbiAgICAgICAgICAgICAgcm9sZT1cImRpYWxvZ1wiXG4gICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnBhbmVsU3R5bGUsIGJvcmRlclJhZGl1czogR0xPQkFMX1JBRElVUyB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgXCJ6LTM2MDAwMCBtaW4tdy1bMjIwcHhdIG1heC13LVtjYWxjKDEwMHZ3LTFyZW0pXSByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZSBwLTMgc2hhZG93LWxnXCIsXG4gICAgICAgICAgICAgICAgcGFuZWxDbGFzc05hbWVcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTJweF0gdGV4dC1zbGF0ZS03MDAgd2hpdGVzcGFjZS1wcmUtbGluZVwiPntjb250ZW50fTwvcD5cbiAgICAgICAgICAgIDwvZGl2PixcbiAgICAgICAgICAgIHBvcnRhbFRhcmdldFxuICAgICAgICAgIClcbiAgICAgICAgOiBudWxsfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSW5mb1BvcG92ZXJJY29uQnV0dG9uO1xuIiwgImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcblxudHlwZSBFeGNoYW5nZVJhdGVNb2RlVWlNZXRhID0ge1xuICBsYWJlbEtleTogc3RyaW5nO1xuICBmYWxsYmFjazogc3RyaW5nO1xufTtcblxuY29uc3QgRVhDSEFOR0VfUkFURV9NT0RFX01FVEE6IFJlY29yZDxFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNvZGUsIEV4Y2hhbmdlUmF0ZU1vZGVVaU1ldGE+ID0ge1xuICAwOiB7XG4gICAgbGFiZWxLZXk6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9PZmZpY2lhbFwiLFxuICAgIGZhbGxiYWNrOiBcIlQuQy4gT2ZpY2lhbFwiLFxuICB9LFxuICAxOiB7XG4gICAgbGFiZWxLZXk6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9NYW51YWxcIixcbiAgICBmYWxsYmFjazogXCJULkMuIE1hbnVhbFwiLFxuICB9LFxufTtcbmNvbnN0IEVYQ0hBTkdFX1JBVEVfTU9ERV9DT0RFUzogRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDb2RlW10gPSBbMCwgMV07XG5cbi8vIEtlZXBzIGV4Y2hhbmdlIHJhdGUgbW9kZSB2YWx1ZXMgY29uc3RyYWluZWQgdG8gbnVtZXJpYyAwIG9yIDEuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNvZGUgfCBudWxsID0+IHtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgaWYgKHBhcnNlZCA9PT0gMCB8fCBwYXJzZWQgPT09IDEpIHtcbiAgICByZXR1cm4gcGFyc2VkO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuLy8gQnVpbGRzIGZpeGVkIG9wdGlvbnMgZm9yIHRoZSBleGNoYW5nZSByYXRlIG1vZGUgZmlsdGVyLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlT3B0aW9ucyA9ICgpOiBFeHBlbnNlU2VsZWN0T3B0aW9uW10gPT4ge1xuICByZXR1cm4gRVhDSEFOR0VfUkFURV9NT0RFX0NPREVTXG4gICAgLm1hcCgoY29kZSkgPT4ge1xuICAgICAgY29uc3QgbWV0YSA9IEVYQ0hBTkdFX1JBVEVfTU9ERV9NRVRBW2NvZGVdO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IFN0cmluZyhjb2RlKSxcbiAgICAgICAgdGV4dDogaW5kVChtZXRhLmxhYmVsS2V5LCBtZXRhLmZhbGxiYWNrKSxcbiAgICAgIH07XG4gICAgfSk7XG59O1xuXG4vLyBSZXR1cm5zIGEgbG9jYWxpemVkIG1vZGUgbGFiZWwgb3IgZW1wdHkgdGV4dCBmb3Igbm9uLXNlbGVjdGVkIHZhbHVlcy5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlKHZhbHVlKTtcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IG51bGwpIHJldHVybiBcIlwiO1xuICBjb25zdCBtZXRhID0gRVhDSEFOR0VfUkFURV9NT0RFX01FVEFbbm9ybWFsaXplZF07XG4gIHJldHVybiBpbmRUKG1ldGEubGFiZWxLZXksIG1ldGEuZmFsbGJhY2spO1xufTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQ29tcGFjdFBhZ2luYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3hcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURhdGVQYXJ0cywgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCBFeHBlbnNlU2VjdGlvbkRpdmlkZXIgZnJvbSBcIi4vRXhwZW5zZVNlY3Rpb25EaXZpZGVyLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VUaW1lbGluZUNhcmQgZnJvbSBcIi4vRXhwZW5zZVRpbWVsaW5lQ2FyZC50c3hcIjtcblxudHlwZSBQYWdpbmF0aW9uTGFiZWxzID0ge1xuICBmaXJzdDogc3RyaW5nO1xuICBwcmV2OiBzdHJpbmc7XG4gIG5leHQ6IHN0cmluZztcbiAgbGFzdDogc3RyaW5nO1xufTtcblxudHlwZSBFeHBlbnNlTGluZXNUaW1lbGluZVByb3BzID0ge1xuICB2aXNpYmxlTGluZXM6IEV4cGVuc2VTaGVldExpbmVbXTtcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIHRvdGFsTGluZVBhZ2VzOiBudW1iZXI7XG4gIGxpbmVQYWdlOiBudW1iZXI7XG4gIGxpbmVzTGFiZWw6IHN0cmluZztcbiAgZW1wdHlUZXh0OiBzdHJpbmc7XG4gIHBhZ2luYXRpb25MYWJlbHM6IFBhZ2luYXRpb25MYWJlbHM7XG4gIGNvbnRhaW5lclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XG4gIG9uTGluZVBhZ2VDaGFuZ2U6IChwYWdlOiBudW1iZXIpID0+IHZvaWQ7XG4gIG9uT3BlbkxpbmU6IChsaW5lUmVjSWQ6IHN0cmluZykgPT4gdm9pZDtcbn07XG5cbi8vIER1bWIgdGltZWxpbmUgZm9yIGV4cGVuc2Ugc2hlZXQgbGluZXMgd2l0aCBzdGFuZGFyZCBjYXJkIGFuZCBwYWdpbmF0aW9uIGxheW91dC5cbmNvbnN0IEV4cGVuc2VMaW5lc1RpbWVsaW5lID0gKHtcbiAgdmlzaWJsZUxpbmVzLFxuICBjdXJyZW5jeUNvZGUsXG4gIHRvdGFsTGluZVBhZ2VzLFxuICBsaW5lUGFnZSxcbiAgbGluZXNMYWJlbCxcbiAgZW1wdHlUZXh0LFxuICBwYWdpbmF0aW9uTGFiZWxzLFxuICBjb250YWluZXJSZWYsXG4gIG9uTGluZVBhZ2VDaGFuZ2UsXG4gIG9uT3BlbkxpbmUsXG59OiBFeHBlbnNlTGluZXNUaW1lbGluZVByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic3BhY2UteS0wXCI+XG4gICAgICA8RXhwZW5zZVNlY3Rpb25EaXZpZGVyIGxhYmVsPXtsaW5lc0xhYmVsfSBjbGFzc05hbWU9XCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlci0tc3BhY2VkXCIgLz5cblxuICAgICAge3Zpc2libGVMaW5lcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtYm94IHRpbWVsaW5lLWVtcHR5XCIgZGF0YS1lbXB0eS10ZXh0PXtlbXB0eVRleHR9IC8+XG4gICAgICApIDogKFxuICAgICAgICA8ZGl2IHJlZj17Y29udGFpbmVyUmVmfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3hcIj5cbiAgICAgICAgICB7dmlzaWJsZUxpbmVzLm1hcCgobGluZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmVJZCA9IHNhZmVUZXh0KGxpbmUubGluZVJlY0lkKTtcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gc2FmZVRleHQobGluZS5kZXNjcmlwdGlvbik7XG4gICAgICAgICAgICBjb25zdCBhbW91bnRUZXh0ID0gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGxpbmUuYW1vdW50ID8/IG51bGwsIGN1cnJlbmN5Q29kZSk7XG4gICAgICAgICAgICBjb25zdCBsaW5rZWRUaWNrZXRGaWxlSWQgPSBzYWZlVGV4dChsaW5lLmZpbGVJZCk7XG4gICAgICAgICAgICBjb25zdCBkYXRlUGFydHMgPSBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzKHNhZmVUZXh0KGxpbmUudHJhbnNEYXRlKSwgZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCIpO1xuICAgICAgICAgICAgY29uc3QgdGlja2V0U3RhdHVzSWNvbiA9IGxpbmtlZFRpY2tldEZpbGVJZCA/IChcbiAgICAgICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgICAgICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD17MS41fVxuICAgICAgICAgICAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC00IHctNFwiXG4gICAgICAgICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXG4gICAgICAgICAgICAgICAgICBkPVwiTTEzLjE5IDguNjg4YTQuNSA0LjUgMCAwIDEgMS4yNDIgNy4yNDRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMS02LjM2NC02LjM2NGwxLjc1Ny0xLjc1N20xMy4zNS0uNjIyIDEuNzU3LTEuNzU3YTQuNSA0LjUgMCAwIDAtNi4zNjQtNi4zNjRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMCAxLjI0MiA3LjI0NFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICApIDogbnVsbDtcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2Ake2xpbmVJZH0tJHtpbmRleH1gfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgPEV4cGVuc2VUaW1lbGluZUNhcmRcbiAgICAgICAgICAgICAgICAgIGRhdGVQYXJ0cz17ZGF0ZVBhcnRzfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9e2Rlc2NyaXB0aW9uIHx8IGxpbmVJZCB8fCBcIi1cIn1cbiAgICAgICAgICAgICAgICAgIGFtb3VudFRleHQ9e2Ftb3VudFRleHR9XG4gICAgICAgICAgICAgICAgICBvbk9wZW49eygpID0+IG9uT3BlbkxpbmUobGluZUlkKX1cbiAgICAgICAgICAgICAgICAgIHRpdGxlQ2xhc3NOYW1lPVwidGltZWxpbmUtbmFtZSBleHBlbnNlLWxpbmUtY2FyZF9fdGl0bGVcIlxuICAgICAgICAgICAgICAgICAgc3RhdHVzSWNvbj17dGlja2V0U3RhdHVzSWNvbn1cbiAgICAgICAgICAgICAgICAgIHN0YXR1c0ljb25DbGFzc05hbWU9XCJleHBlbnNlLWxpbmUtY2FyZF9fdGlja2V0LWljb25cIlxuICAgICAgICAgICAgICAgICAgc3RhdHVzTGFiZWw9e2xpbmtlZFRpY2tldEZpbGVJZCB8fCB1bmRlZmluZWR9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIDxDb21wYWN0UGFnaW5hdGlvblxuICAgICAgICB0b3RhbFBhZ2VzPXt0b3RhbExpbmVQYWdlc31cbiAgICAgICAgY3VycmVudFBhZ2U9e2xpbmVQYWdlfVxuICAgICAgICBvblBhZ2VDaGFuZ2U9e29uTGluZVBhZ2VDaGFuZ2V9XG4gICAgICAgIGxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cbiAgICAgIC8+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUxpbmVzVGltZWxpbmU7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCwgRXhwZW5zZVNoZWV0SGVhZGVyVXBkYXRlUmVxdWVzdCB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24sIHBhcnNlRGVjaW1hbElucHV0IH0gZnJvbSBcIi4uL2hvb2tzL2V4cGVuc2VNdXRhdGlvblV0aWxzLnRzXCI7XG5pbXBvcnQge1xuICBjcmVhdGVFeHBlbnNlU2hlZXQsXG4gIGRlbGV0ZUV4cGVuc2VTaGVldCxcbiAgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyLFxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuXG50eXBlIFVzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9uc0FyZ3MgPSB7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xuICBpc0xvY2tlZDogYm9vbGVhbjtcbiAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XG4gIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lczogYm9vbGVhbjtcbiAgbG9ja2VkQ3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGxvY2tlZEV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xuICBjYW5FZGl0RXhwZW5zZTogYm9vbGVhbjtcbiAgY2FuRGVsZXRlRXhwZW5zZTogYm9vbGVhbjtcbiAgY2FuRWRpdEhlYWRlckZpZWxkczogYm9vbGVhbjtcbiAgY2FuRWRpdFN0YXR1czogYm9vbGVhbjtcbiAgc2hlZXRJZDogc3RyaW5nO1xuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGRyYWZ0RXhjaGFuZ2VSYXRlOiBzdHJpbmc7XG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWU6IHN0cmluZztcbiAgZHJhZnRQcm9qZWN0SWQ6IHN0cmluZztcbiAgZHJhZnRFeHBlbnNlU2hlZXRTdGF0dXM/OiBudW1iZXIgfCBudWxsO1xuICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zOiBzdHJpbmc7XG4gIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeTogc3RyaW5nO1xuICBjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzPzogbnVtYmVyIHwgbnVsbDtcbiAgY3VycmVudEV4Y2hhbmdlUmF0ZU1vZGU/OiBudW1iZXIgfCBudWxsO1xuICBvbkNyZWF0ZVN1Y2Nlc3M6IChjcmVhdGVkU2hlZXRJZDogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRNb2RhbEVycm9yOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0QnVzeTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xuICBzZXRTdGF0dXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRJc0VkaXRpbmc6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+Pjtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUV4Y2hhbmdlUmF0ZSA9IChyYXc6IHN0cmluZyk6IG51bWJlciB8IG51bGwgPT4gcGFyc2VEZWNpbWFsSW5wdXQocmF3KTtcbi8vIENvbXBhcmVzIHJhdGVzIHdpdGggdG9sZXJhbmNlIHRvIGF2b2lkIGZsb2F0aW5nIHBvaW50IG1pc21hdGNoIG9uIHBheWxvYWQgbW9kZS5cbmNvbnN0IGFyZVJhdGVzRXF1aXZhbGVudCA9IChsZWZ0OiBudW1iZXIgfCBudWxsLCByaWdodDogbnVtYmVyIHwgbnVsbCk6IGJvb2xlYW4gPT4ge1xuICBpZiAobGVmdCA9PSBudWxsIHx8IHJpZ2h0ID09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIE1hdGguYWJzKGxlZnQgLSByaWdodCkgPCAwLjAwMDAwMDE7XG59O1xuXG4vLyBFbmNhcHN1bGF0ZXMgdXBkYXRlIGFuZCBkZWxldGUgbXV0YXRpb25zIGZvciBleHBlbnNlIHNoZWV0IGhlYWRlciBkZXRhaWwuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zID0gKHtcbiAgYnVzeSxcbiAgaXNFZGl0aW5nLFxuICBpc0NyZWF0ZU1vZGUsXG4gIGlzTG9ja2VkLFxuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxuICBsb2NrZWRDdXJyZW5jeUNvZGUsXG4gIGxvY2tlZEV4Y2hhbmdlUmF0ZSxcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcbiAgY2FuRWRpdEV4cGVuc2UsXG4gIGNhbkRlbGV0ZUV4cGVuc2UsXG4gIGNhbkVkaXRIZWFkZXJGaWVsZHMsXG4gIGNhbkVkaXRTdGF0dXMsXG4gIHNoZWV0SWQsXG4gIGRyYWZ0RGVzY3JpcHRpb24sXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICBkcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcbiAgZHJhZnRQcm9qZWN0SWQsXG4gIGRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzLFxuICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxuICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXG4gIGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gIGN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlLFxuICBvbkNyZWF0ZVN1Y2Nlc3MsXG4gIHNldE1vZGFsRXJyb3IsXG4gIHNldEJ1c3ksXG4gIHNldFN0YXR1cyxcbiAgc2V0SXNFZGl0aW5nLFxufTogVXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zQXJncykgPT4ge1xuICBjb25zdCBoYW5kbGVVcGRhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKGJ1c3kgfHwgIWlzRWRpdGluZykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghaXNDcmVhdGVNb2RlICYmIGlzTG9ja2VkKSByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBjYW5Qcm9jZWVkID0gaXNDcmVhdGVNb2RlID8gY2FuQ3JlYXRlRXhwZW5zZSA6IGNhbkVkaXRFeHBlbnNlO1xuICAgIGlmICghY2FuUHJvY2VlZCkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW5jeSA9IFN0cmluZyhcbiAgICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzID8gKGxvY2tlZEN1cnJlbmN5Q29kZSB8fCBkcmFmdEN1cnJlbmN5Q29kZSB8fCBcIlwiKSA6IChkcmFmdEN1cnJlbmN5Q29kZSB8fCBcIlwiKVxuICAgIClcbiAgICAgIC50cmltKClcbiAgICAgIC50b1VwcGVyQ2FzZSgpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWREZXNjcmlwdGlvbiA9IFN0cmluZyhkcmFmdERlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBjb25zdCBub3JtYWxpemVkUHJvamVjdElkID0gU3RyaW5nKGRyYWZ0UHJvamVjdElkIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBjb25zdCBub3JtYWxpemVkRXN0YWRvQ29tZW50YXJpb3MgPSBjYW5FZGl0U3RhdHVzID8gU3RyaW5nKGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MgfHwgXCJcIikudHJpbSgpIDogXCJcIjtcbiAgICBjb25zdCBub3JtYWxpemVkRXhjaGFuZ2VSYXRlUmF3ID0gU3RyaW5nKFxuICAgICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzID8gKGxvY2tlZEV4Y2hhbmdlUmF0ZSB8fCBkcmFmdEV4Y2hhbmdlUmF0ZSB8fCBcIlwiKSA6IChkcmFmdEV4Y2hhbmdlUmF0ZSB8fCBcIlwiKVxuICAgICk7XG4gICAgY29uc3Qgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSA9IFN0cmluZyhleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3kgfHwgXCJFVVJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCkgfHwgXCJFVVJcIjtcbiAgICBjb25zdCByZXF1aXJlc0V4Y2hhbmdlUmF0ZSA9XG4gICAgICBjYW5FZGl0SGVhZGVyRmllbGRzICYmIG5vcm1hbGl6ZWRDdXJyZW5jeSAhPT0gXCJcIiAmJiBub3JtYWxpemVkQ3VycmVuY3kgIT09IG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3k7XG4gICAgY29uc3QgcGFyc2VkRXhjaGFuZ2VSYXRlID0gbm9ybWFsaXplRXhjaGFuZ2VSYXRlKG5vcm1hbGl6ZWRFeGNoYW5nZVJhdGVSYXcpO1xuICAgIGNvbnN0IG9mZmljaWFsRXhjaGFuZ2VSYXRlID0gbm9ybWFsaXplRXhjaGFuZ2VSYXRlKG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUpO1xuICAgIGNvbnN0IG9yaWdpbmFsRXhjaGFuZ2VSYXRlID0gbm9ybWFsaXplRXhjaGFuZ2VSYXRlKGxvY2tlZEV4Y2hhbmdlUmF0ZSk7XG4gICAgY29uc3QgcGFyc2VkQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUgPSBOdW1iZXIoY3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUpO1xuICAgIGNvbnN0IGhhc0N1cnJlbnRFeGNoYW5nZVJhdGVNb2RlID0gTnVtYmVyLmlzSW50ZWdlcihwYXJzZWRDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSkgJiYgcGFyc2VkQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUgPj0gMDtcbiAgICBjb25zdCBoYXNWYWxpZFJhdGUgPSBwYXJzZWRFeGNoYW5nZVJhdGUgIT0gbnVsbCAmJiBwYXJzZWRFeGNoYW5nZVJhdGUgPiAwO1xuICAgIGNvbnN0IHBhcnNlZERyYWZ0U3RhdHVzID0gTnVtYmVyKGRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzKTtcbiAgICBjb25zdCBoYXNEcmFmdFN0YXR1cyA9IE51bWJlci5pc0ludGVnZXIocGFyc2VkRHJhZnRTdGF0dXMpICYmIHBhcnNlZERyYWZ0U3RhdHVzID49IDA7XG4gICAgY29uc3QgaGFzTWFudWFsUmF0ZUVkaXRPblVwZGF0ZSA9XG4gICAgICBjYW5FZGl0SGVhZGVyRmllbGRzICYmXG4gICAgICAhaXNDcmVhdGVNb2RlICYmXG4gICAgICBoYXNWYWxpZFJhdGUgJiZcbiAgICAgIChvcmlnaW5hbEV4Y2hhbmdlUmF0ZSA9PSBudWxsIHx8ICFhcmVSYXRlc0VxdWl2YWxlbnQocGFyc2VkRXhjaGFuZ2VSYXRlLCBvcmlnaW5hbEV4Y2hhbmdlUmF0ZSkpO1xuICAgIC8vIE9ubHkgc2VuZCBleGNoYW5nZVJhdGVNb2RlIHdoZW4gdGhlIHVzZXIgYWN0dWFsbHkgY2hhbmdlZCB0aGUgcmF0ZSBtYW51YWxseS5cbiAgICBjb25zdCBpc01hbnVhbEV4Y2hhbmdlUmF0ZSA9ICgoKSA9PiB7XG4gICAgICBpZiAoIWNhbkVkaXRIZWFkZXJGaWVsZHMpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmICghcmVxdWlyZXNFeGNoYW5nZVJhdGUgfHwgIWhhc1ZhbGlkUmF0ZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcykgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKCFpc0NyZWF0ZU1vZGUgJiYgIWhhc01hbnVhbFJhdGVFZGl0T25VcGRhdGUpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmIChvZmZpY2lhbEV4Y2hhbmdlUmF0ZSA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgICAgIHJldHVybiAhYXJlUmF0ZXNFcXVpdmFsZW50KHBhcnNlZEV4Y2hhbmdlUmF0ZSwgb2ZmaWNpYWxFeGNoYW5nZVJhdGUpO1xuICAgIH0pKCk7XG4gICAgY29uc3QgcmVzb2x2ZWRFeGNoYW5nZVJhdGVNb2RlID0gY2FuRWRpdEhlYWRlckZpZWxkc1xuICAgICAgPyAoaXNNYW51YWxFeGNoYW5nZVJhdGVcbiAgICAgICAgPyAxXG4gICAgICAgIDogKG5vcm1hbGl6ZWRFc3RhZG9Db21lbnRhcmlvcyA/IChoYXNDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA/IHBhcnNlZEN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlIDogMCkgOiB1bmRlZmluZWQpKVxuICAgICAgOiAoaGFzQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUgPyBwYXJzZWRDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA6IHVuZGVmaW5lZCk7XG4gICAgY29uc3QgcmVzb2x2ZWRFeHBlbnNlU2hlZXRTdGF0dXMgPSBoYXNEcmFmdFN0YXR1cyA/IHBhcnNlZERyYWZ0U3RhdHVzIDogKGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXMgPz8gdW5kZWZpbmVkKTtcblxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgIGlmICghbm9ybWFsaXplZERlc2NyaXB0aW9uKSB7XG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25NZXNzYWdlID0gaW5kVChcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9EZXNjcmlwdGlvblJlcXVpcmVkXCIsIFwiRGVzY3JpcHRpb24gaXMgcmVxdWlyZWQuXCIpO1xuICAgICAgICBzZXRNb2RhbEVycm9yKHZhbGlkYXRpb25NZXNzYWdlKTtcbiAgICAgICAgc2V0U3RhdHVzKHZhbGlkYXRpb25NZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW5vcm1hbGl6ZWRDdXJyZW5jeSkge1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uTWVzc2FnZSA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fQ3VycmVuY3lSZXF1aXJlZFwiLCBcIkN1cnJlbmN5IGlzIHJlcXVpcmVkLlwiKTtcbiAgICAgICAgc2V0TW9kYWxFcnJvcih2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICAgIHNldFN0YXR1cyh2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVxdWlyZXNFeGNoYW5nZVJhdGUgJiYgIWhhc1ZhbGlkUmF0ZSkge1xuICAgICAgY29uc3QgdmFsaWRhdGlvbk1lc3NhZ2UgPSBpbmRUKFxuICAgICAgICBcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9FeGNoYW5nZVJhdGVSZXF1aXJlZFwiLFxuICAgICAgICBcIkV4Y2hhbmdlIHJhdGUgaXMgcmVxdWlyZWQgd2hlbiBjdXJyZW5jeSBpcyBkaWZmZXJlbnQgZnJvbSBiYXNlIGN1cnJlbmN5LlwiXG4gICAgICApO1xuICAgICAgc2V0TW9kYWxFcnJvcih2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICBzZXRTdGF0dXModmFsaWRhdGlvbk1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xuICAgICAgc3RhcnRTdGF0dXM6IGlzQ3JlYXRlTW9kZVxuICAgICAgICA/IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIilcbiAgICAgICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRpbmdcIiwgXCJVcGRhdGluZyBleHBlbnNlIHNoZWV0Li4uXCIpLFxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIiksXG4gICAgICBzZXRNb2RhbEVycm9yLFxuICAgICAgc2V0QnVzeSxcbiAgICAgIHNldFN0YXR1cyxcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xuICAgICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICAgICAgY29uc3QgcGF5bG9hZDogRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCA9IHtcbiAgICAgICAgICAgIG1vZGU6IDEsXG4gICAgICAgICAgICBleGlzdGluZ0hvamFHYXN0b3NJZDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IG5vcm1hbGl6ZWREZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGN1cnJlbmN5Q29kZTogbm9ybWFsaXplZEN1cnJlbmN5LFxuICAgICAgICAgICAgZXhjaFJhdGU6IGhhc1ZhbGlkUmF0ZSA/IE51bWJlcihwYXJzZWRFeGNoYW5nZVJhdGUpIDogMSxcbiAgICAgICAgICAgIHByb2pJZDogbm9ybWFsaXplZFByb2plY3RJZCB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICBleHBlbnNlU2hlZXRTdGF0dXM6IDAsXG4gICAgICAgICAgICBleGNoYW5nZVJhdGVNb2RlOiByZXNvbHZlZEV4Y2hhbmdlUmF0ZU1vZGUsXG4gICAgICAgICAgICBsaW5lczogW10sXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY3JlYXRlRXhwZW5zZVNoZWV0KHBheWxvYWQpO1xuXG4gICAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIEFjY2VwdCBib3RoIGNhc2luZyB2YXJpYW50cyBmcm9tIGJhY2tlbmQgZW52ZWxvcGVzLlxuICAgICAgICAgIGNvbnN0IGNyZWF0ZWREYXRhID0gcmVzcG9uc2U/LkRhdGEgYXMgeyBIb2phR2FzdG9zSWQ/OiB1bmtub3duOyBob2phR2FzdG9zSWQ/OiB1bmtub3duIH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgICAgICAgIGNvbnN0IGNyZWF0ZWRTaGVldElkID0gU3RyaW5nKGNyZWF0ZWREYXRhPy5Ib2phR2FzdG9zSWQgPz8gY3JlYXRlZERhdGE/LmhvamFHYXN0b3NJZCA/PyBcIlwiKS50cmltKCk7XG4gICAgICAgICAgaWYgKCFjcmVhdGVkU2hlZXRJZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgb25DcmVhdGVTdWNjZXNzKGNyZWF0ZWRTaGVldElkKTtcbiAgICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXlsb2FkOiBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0ID0ge1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiBTdHJpbmcoZHJhZnREZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCksXG4gICAgICAgICAgY3VycmVuY3lDb2RlOiBub3JtYWxpemVkQ3VycmVuY3ksXG4gICAgICAgICAgZXhjaFJhdGU6IGhhc1ZhbGlkUmF0ZSA/IE51bWJlcihwYXJzZWRFeGNoYW5nZVJhdGUpIDogMSxcbiAgICAgICAgICBwcm9qSWQ6IFN0cmluZyhkcmFmdFByb2plY3RJZCB8fCBcIlwiKS50cmltKCkgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgIGV4cGVuc2VTaGVldFN0YXR1czogcmVzb2x2ZWRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gICAgICAgICAgZXhjaGFuZ2VSYXRlTW9kZTogcmVzb2x2ZWRFeGNoYW5nZVJhdGVNb2RlLFxuICAgICAgICAgIGVzdGFkb0NvbWVudGFyaW9zOiBjYW5FZGl0U3RhdHVzID8gbm9ybWFsaXplZEVzdGFkb0NvbWVudGFyaW9zIDogdW5kZWZpbmVkLFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyKHNoZWV0SWQsIHBheWxvYWQpO1xuXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVGYWlsZWRcIiwgXCJVcGRhdGUgZmFpbGVkLlwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IHVwZGF0ZWRcIikpO1xuICAgICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xuICB9LCBbXG4gICAgYnVzeSxcbiAgICBjYW5DcmVhdGVFeHBlbnNlLFxuICAgIGNhbkVkaXRFeHBlbnNlLFxuICAgIGNhbkVkaXRIZWFkZXJGaWVsZHMsXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgZHJhZnREZXNjcmlwdGlvbixcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgICBkcmFmdEV4cGVuc2VTaGVldFN0YXR1cyxcbiAgICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsXG4gICAgZHJhZnRQcm9qZWN0SWQsXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxuICAgIGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gICAgY3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUsXG4gICAgY2FuRWRpdFN0YXR1cyxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxuICAgIGlzTG9ja2VkLFxuICAgIGlzRWRpdGluZyxcbiAgICBsb2NrZWRDdXJyZW5jeUNvZGUsXG4gICAgbG9ja2VkRXhjaGFuZ2VSYXRlLFxuICAgIG9uQ3JlYXRlU3VjY2VzcyxcbiAgICBzZXRCdXN5LFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldFN0YXR1cyxcbiAgICBzaGVldElkLFxuICBdKTtcblxuICBjb25zdCBoYW5kbGVEZWxldGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKGJ1c3kpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoaXNMb2NrZWQpIHJldHVybiBmYWxzZTtcbiAgICBpZiAoIWNhbkRlbGV0ZUV4cGVuc2UpIHtcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcbiAgICAgIHN0YXJ0U3RhdHVzOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRpbmdcIiwgXCJEZWxldGluZyBleHBlbnNlIHNoZWV0Li4uXCIpLFxuICAgICAgZmFsbGJhY2tFcnJvck1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVFcnJvclwiLCBcIkRlbGV0ZSBlcnJvci5cIiksXG4gICAgICBzZXRNb2RhbEVycm9yLFxuICAgICAgc2V0QnVzeSxcbiAgICAgIHNldFN0YXR1cyxcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGRlbGV0ZUV4cGVuc2VTaGVldChzaGVldElkKTtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlRmFpbGVkXCIsIFwiRGVsZXRlIGZhaWxlZC5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVkXCIsIFwiRXhwZW5zZSBzaGVldCBkZWxldGVkXCIpKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcbiAgfSwgW2J1c3ksIGNhbkRlbGV0ZUV4cGVuc2UsIGlzTG9ja2VkLCBzZXRCdXN5LCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXMsIHNoZWV0SWRdKTtcblxuICByZXR1cm4ge1xuICAgIGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVEZWxldGUsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zIH0gZnJvbSBcIi4uL2hvb2tzL3VzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucy50c1wiO1xuaW1wb3J0IHsgbmF2aWdhdGVUb0V4cGVuc2VVcmwgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcblxudHlwZSBVc2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zQXJncyA9IHtcbiAgYnVzeTogYm9vbGVhbjtcbiAgbW9kYWxPcGVuOiBib29sZWFuO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcbiAgaXNMb2NrZWQ6IGJvb2xlYW47XG4gIGNhbkVkaXRFeHBlbnNlOiBib29sZWFuO1xuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xuICBjYW5EZWxldGVFeHBlbnNlOiBib29sZWFuO1xuICBzZXRNb2RhbEVycm9yOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcbiAgaGFuZGxlQ2FuY2VsRWRpdDogKCkgPT4gdm9pZDtcbiAgaGFuZGxlVXBkYXRlOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuICBoYW5kbGVEZWxldGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIG9uU2F2ZVN1Y2Nlc3M6ICgpID0+IHZvaWQ7XG4gIG9wZW5Db25maXJtOiAob3B0czoge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgbWVzc2FnZTogc3RyaW5nO1xuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nO1xuICAgIG9uQ29uZmlybT86ICgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQ7XG4gIH0pID0+IHZvaWQ7XG4gIGNsb3NlQ29uZmlybTogKCkgPT4gdm9pZDtcbn07XG5cbi8vIENvb3JkaW5hdGVzIHRvcGJhciBpY29uIHN0YXRlIGFuZCBkaXNwYXRjaCBhY3Rpb25zIGZvciBleHBlbnNlIHNoZWV0IGRldGFpbC5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zID0gKHtcbiAgYnVzeSxcbiAgbW9kYWxPcGVuLFxuICBpc0VkaXRpbmcsXG4gIGlzQ3JlYXRlTW9kZSxcbiAgaXNMb2NrZWQsXG4gIGNhbkVkaXRFeHBlbnNlLFxuICBjYW5DcmVhdGVFeHBlbnNlLFxuICBjYW5EZWxldGVFeHBlbnNlLFxuICBzZXRNb2RhbEVycm9yLFxuICBoYW5kbGVFbmFibGVFZGl0LFxuICBoYW5kbGVDYW5jZWxFZGl0LFxuICBoYW5kbGVVcGRhdGUsXG4gIGhhbmRsZURlbGV0ZSxcbiAgb25TYXZlU3VjY2VzcyxcbiAgb3BlbkNvbmZpcm0sXG4gIGNsb3NlQ29uZmlybSxcbn06IFVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnNBcmdzKSA9PiB7XG4gIHVzZUV4cGVuc2VUb3BiYXJDcnVkQWN0aW9ucyh7XG4gICAgaWRzOiB7XG4gICAgICBlZGl0SWNvbklkOiBcImV4cGVuc2VFZGl0SWNvblwiLFxuICAgICAgc2F2ZUljb25JZDogXCJleHBlbnNlU2F2ZUljb25cIixcbiAgICAgIGRlbGV0ZUJ0bklkOiBcImV4cGVuc2VEZWxldGVCdG5cIixcbiAgICAgIGNhbmNlbEJ0bklkOiBcImV4cGVuc2VDYW5jZWxCdG5cIixcbiAgICB9LFxuICAgIGV2ZW50czoge1xuICAgICAgZWRpdEV2ZW50OiBcImV4cGVuc2UtZGV0YWlsLWVkaXRcIixcbiAgICAgIGRlbGV0ZUV2ZW50OiBcImV4cGVuc2UtZGV0YWlsLWRlbGV0ZVwiLFxuICAgICAgY2FuY2VsRXZlbnQ6IFwiZXhwZW5zZS1kZXRhaWwtY2FuY2VsLWVkaXRcIixcbiAgICB9LFxuICAgIGJ1c3ksXG4gICAgbW9kYWxPcGVuLFxuICAgIGlzRWRpdGluZyxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgaXNMb2NrZWQsXG4gICAgYWxsb3dDcmVhdGVNb2RlQWN0aW9uc1doZW5Mb2NrZWQ6IHRydWUsXG4gICAgY2FuQ3JlYXRlOiBjYW5DcmVhdGVFeHBlbnNlLFxuICAgIGNhbkVkaXQ6IGNhbkVkaXRFeHBlbnNlLFxuICAgIGNhbkRlbGV0ZTogY2FuRGVsZXRlRXhwZW5zZSxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVTYXZlOiBoYW5kbGVVcGRhdGUsXG4gICAgaGFuZGxlRGVsZXRlLFxuICAgIHNhdmVDb25maXJtVGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19UaXRsZVwiLCBcIlNhdmUgY2hhbmdlc1wiKSxcbiAgICBzYXZlQ29uZmlybU1lc3NhZ2U6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9TYXZlQ2hhbmdlc19Cb2R5XCIsIFwiRG8geW91IHdhbnQgdG8gc2F2ZSBjaGFuZ2VzP1wiKSxcbiAgICBzYXZlQ29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIiksXG4gICAgZGVsZXRlQ29uZmlybVRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlU2hlZXRfVGl0bGVcIiwgXCJEZWxldGUgZXhwZW5zZSBzaGVldFwiKSxcbiAgICBkZWxldGVDb25maXJtTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZVNoZWV0X0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyBleHBlbnNlIHNoZWV0P1wiKSxcbiAgICBkZWxldGVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJEZWxldGVcIiksXG4gICAgb25TYXZlU3VjY2VzcyxcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXRzXCIpO1xuICAgIH0sXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgY2xvc2VDb25maXJtLFxuICB9KTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7XG4gIEV4cGVuc2VTaGVldEhlYWRlcixcbiAgRXhwZW5zZVNoZWV0TGluZSxcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHtcbiAgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwsXG4gIGdldEV4Y2hhbmdlUmF0ZSxcbiAgZ2V0RXhwZW5zZVNoZWV0RGVmYXVsdEN1cnJlbmN5Q29kZSxcbiAgbWFwRXhwZW5zZVNoZWV0SGVhZGVyLFxuICBtYXBFeHBlbnNlU2hlZXRMaW5lLFxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHtcbiAgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLFxuICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCxcbiAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCxcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leGNoYW5nZVJhdGVFbnRyeU1vZGVDYXRhbG9nLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIGhhc0Fzc2lnbmVkVm91Y2hlciwgcGFyc2VFeHBlbnNlRGF0ZSwgc2FmZVRleHQsIHRvSXNvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyLCBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xuXG5jb25zdCBFWENIQU5HRV9SQVRFX0RFQk9VTkNFX01TID0gNDAwO1xuY29uc3QgRVhDSEFOR0VfUkFURV9SRUZFUkVOQ0VfQU1PVU5UID0gMTAwO1xuY29uc3QgRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyA9IDc7XG5jb25zdCBFWFBFTlNFX1NUQVRVU19BUFBST1ZFRCA9IDI7XG5jb25zdCBFWFBFTlNFX1NUQVRVU19QQUlEID0gNDtcblxuLy8gTm9ybWFsaXplcyBleGNoYW5nZS1yYXRlIG51bWJlcnMgZm9yIG51bWVyaWMgaW5wdXQgY29udHJvbHMuXG5jb25zdCBmb3JtYXRFeGNoYW5nZVJhdGVJbnB1dFZhbHVlID0gKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKHZhbHVlLCB7XG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICBmYWxsYmFjazogXCJcIixcbiAgfSk7XG59O1xuXG5jb25zdCBidWlsZENyZWF0ZUhlYWRlckRyYWZ0ID0gKCk6IEV4cGVuc2VTaGVldEhlYWRlciA9PiB7XG4gIHJldHVybiB7XG4gICAgaG9qYUdhc3Rvc0lkOiBcIlwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgIHByb2pJZDogXCJcIixcbiAgICB2b3VjaGVyOiBcIlwiLFxuICAgIGN1cnJlbmN5Q29kZTogXCJcIixcbiAgICB0b3RhbEFtb3VudDogbnVsbCxcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IDAsXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogMCxcbiAgICBjcmVhdGVkRGF0ZTogXCJcIixcbiAgICBleGNoUmF0ZTogXCIxXCIsXG4gIH07XG59O1xuXG5jb25zdCBzaG91bGRTaG93RXhjaGFuZ2VSYXRlID0gKHZhbHVlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQodmFsdWUpO1xuICBpZiAocGFyc2VkID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIE1hdGguYWJzKHBhcnNlZCkgPiAwO1xufTtcblxudHlwZSBVc2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZUFyZ3MgPSB7XG4gIGhhc0FjY2VzczogYm9vbGVhbjtcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XG4gIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGJvb2xlYW47XG4gIHNoZWV0SWQ6IHN0cmluZztcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcbn07XG5cbi8vIE93bnMgc3RhdGUgYW5kIGJlaGF2aW9yIGZvciBleHBlbnNlIHNoZWV0IGRldGFpbCBwYWdlIChyZWFkLCBlZGl0LCBjcmVhdGUpLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlID0gKHtcbiAgaGFzQWNjZXNzLFxuICBjYW5DcmVhdGVFeHBlbnNlLFxuICBjYW5FZGl0RXhwZW5zZSxcbiAgY2FuRWRpdEhlYWRlckZpZWxkcyxcbiAgc2hlZXRJZCxcbiAgaXNDcmVhdGVNb2RlLFxuICBvbkZvcmJpZGRlbixcbn06IFVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlQXJncykgPT4ge1xuICBjb25zdCBbaGVhZGVyLCBzZXRIZWFkZXJdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0SGVhZGVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtsaW5lcywgc2V0TGluZXNdID0gdXNlU3RhdGU8RXhwZW5zZVNoZWV0TGluZVtdPihbXSk7XG4gIGNvbnN0IFtsaW5lUGFnZSwgc2V0TGluZVBhZ2VdID0gdXNlU3RhdGUoMSk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtpc0VkaXRpbmcsIHNldElzRWRpdGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFttb2RhbEVycm9yLCBzZXRNb2RhbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnREZXNjcmlwdGlvbiwgc2V0RHJhZnREZXNjcmlwdGlvbl0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0UHJvamVjdElkLCBzZXREcmFmdFByb2plY3RJZF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0Q3VycmVuY3lDb2RlLCBzZXREcmFmdEN1cnJlbmN5Q29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0RXhjaGFuZ2VSYXRlLCBzZXREcmFmdEV4Y2hhbmdlUmF0ZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzLCBzZXREcmFmdEV4cGVuc2VTaGVldFN0YXR1c10gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2RyYWZ0RXN0YWRvQ29tZW50YXJpb3MsIHNldERyYWZ0RXN0YWRvQ29tZW50YXJpb3NdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkZWZhdWx0Q3VycmVuY3lDb2RlLCBzZXREZWZhdWx0Q3VycmVuY3lDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbaXNFeGNoYW5nZVJhdGVMb2FkaW5nLCBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXhjaGFuZ2VSYXRlTWVzc2FnZSwgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2V4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yLCBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLCBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSwgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW29mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSwgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIGNvbnN0IGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIgPSB1c2VDYWxsYmFjaygobmV4dEhlYWRlcjogRXhwZW5zZVNoZWV0SGVhZGVyIHwgbnVsbCkgPT4ge1xuICAgIHNldERyYWZ0RGVzY3JpcHRpb24oc2FmZVRleHQobmV4dEhlYWRlcj8uZGVzY3JpcHRpb24pKTtcbiAgICBzZXREcmFmdFByb2plY3RJZChzYWZlVGV4dChuZXh0SGVhZGVyPy5wcm9qSWQpKTtcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZShzYWZlVGV4dChuZXh0SGVhZGVyPy5jdXJyZW5jeUNvZGUpKTtcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZShcbiAgICAgIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcihuZXh0SGVhZGVyPy5leGNoUmF0ZSwge1xuICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IEVYQ0hBTkdFX1JBVEVfREVDSU1BTF9ESUdJVFMsXG4gICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcbiAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgICAgIGZhbGxiYWNrOiBcIlwiLFxuICAgICAgfSlcbiAgICApO1xuICAgIGNvbnN0IG5leHRTdGF0dXMgPSBOdW1iZXIobmV4dEhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzKTtcbiAgICBzZXREcmFmdEV4cGVuc2VTaGVldFN0YXR1cyhOdW1iZXIuaXNJbnRlZ2VyKG5leHRTdGF0dXMpICYmIG5leHRTdGF0dXMgPj0gMCA/IG5leHRTdGF0dXMgOiAwKTtcbiAgICBzZXREcmFmdEVzdGFkb0NvbWVudGFyaW9zKHNhZmVUZXh0KG5leHRIZWFkZXI/LmVzdGFkb0NvbWVudGFyaW9zKSk7XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGxvYWREZXRhaWwgPSBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoIWhhc0FjY2Vzcykge1xuICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgICAgaWYgKCFjYW5DcmVhdGVFeHBlbnNlKSB7XG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkcmFmdEhlYWRlciA9IGJ1aWxkQ3JlYXRlSGVhZGVyRHJhZnQoKTtcbiAgICAgICAgc2V0SGVhZGVyKGRyYWZ0SGVhZGVyKTtcbiAgICAgICAgc2V0TGluZXMoW10pO1xuICAgICAgICBzZXRMaW5lUGFnZSgxKTtcbiAgICAgICAgc2V0SXNFZGl0aW5nKHRydWUpO1xuICAgICAgICBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyKGRyYWZ0SGVhZGVyKTtcbiAgICAgICAgc2V0U3RhdHVzKFwiXCIpO1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzaGVldElkKSB7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob3RGb3VuZFwiLCBcIkV4cGVuc2Ugc2hlZXQgd2FzIG5vdCBmb3VuZC5cIikpO1xuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgIHNldExpbmVzKFtdKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwoc2hlZXRJZCwge1xuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocmVzcG9uc2U/LlN1Y2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc3BvbnNlPy5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlwiKSk7XG4gICAgICAgICAgc2V0SGVhZGVyKG51bGwpO1xuICAgICAgICAgIHNldExpbmVzKFtdKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzaGVldHMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xuICAgICAgICBjb25zdCBzZWxlY3RlZFNoZWV0ID1cbiAgICAgICAgICBzaGVldHMuZmluZCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5Py5Ib2phR2FzdG9zSWQpLnRvVXBwZXJDYXNlKCkgPT09IHNoZWV0SWQudHJpbSgpLnRvVXBwZXJDYXNlKCkpIHx8IHNoZWV0c1swXTtcblxuICAgICAgICBpZiAoIXNlbGVjdGVkU2hlZXQpIHtcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTm90Rm91bmRcIiwgXCJFeHBlbnNlIHNoZWV0IHdhcyBub3QgZm91bmQuXCIpKTtcbiAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgICAgc2V0TGluZXMoW10pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5leHRIZWFkZXIgPSBtYXBFeHBlbnNlU2hlZXRIZWFkZXIoc2VsZWN0ZWRTaGVldCk7XG4gICAgICAgIGNvbnN0IG5leHRMaW5lcyA9IChBcnJheS5pc0FycmF5KHNlbGVjdGVkU2hlZXQuTGluZXMpID8gc2VsZWN0ZWRTaGVldC5MaW5lcyA6IFtdKS5tYXAoKGVudHJ5KSA9PlxuICAgICAgICAgIG1hcEV4cGVuc2VTaGVldExpbmUoZW50cnkpXG4gICAgICAgICk7XG4gICAgICAgIHNldEhlYWRlcihuZXh0SGVhZGVyKTtcbiAgICAgICAgc2V0TGluZXMobmV4dExpbmVzKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShcbiAgICAgICAgICBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlwiKVxuICAgICAgICApO1xuICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgIHNldExpbmVzKFtdKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZvaWQgbG9hZERldGFpbCgpO1xuICB9LCBbY2FuQ3JlYXRlRXhwZW5zZSwgaGFzQWNjZXNzLCBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyLCBpc0NyZWF0ZU1vZGUsIG9uRm9yYmlkZGVuLCBzaGVldElkXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWhlYWRlciB8fCBpc0VkaXRpbmcpIHJldHVybjtcbiAgICBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyKGhlYWRlcik7XG4gIH0sIFtoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIsIGlzRWRpdGluZ10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFoYXNBY2Nlc3MpIHJldHVybjtcbiAgICBsZXQgaXNDYW5jZWxsZWQgPSBmYWxzZTtcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gICAgY29uc3QgbG9hZERlZmF1bHRDdXJyZW5jeUNvZGUgPSBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBjb2RlID0gYXdhaXQgZ2V0RXhwZW5zZVNoZWV0RGVmYXVsdEN1cnJlbmN5Q29kZSh7XG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICBzZXREZWZhdWx0Q3VycmVuY3lDb2RlKHNhZmVUZXh0KGNvZGUpLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSByZXR1cm47XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZvaWQgbG9hZERlZmF1bHRDdXJyZW5jeUNvZGUoKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaXNDYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgY29udHJvbGxlci5hYm9ydCgpO1xuICAgIH07XG4gIH0sIFtoYXNBY2Nlc3NdKTtcblxuICBjb25zdCBoYXNBY3RpdmVQcm9jZXNzID0gdXNlTWVtbygoKSA9PiBidXN5IHx8IGlzRWRpdGluZywgW2J1c3ksIGlzRWRpdGluZ10pO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQoaGFzQWN0aXZlUHJvY2Vzcyk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCgpO1xuICAgIH07XG4gIH0sIFtoYXNBY3RpdmVQcm9jZXNzXSk7XG5cbiAgY29uc3QgcHJvamVjdFZhbHVlID0gc2FmZVRleHQoaGVhZGVyPy5wcm9qSWQpO1xuICBjb25zdCB2b3VjaGVyVmFsdWUgPSBzYWZlVGV4dChoZWFkZXI/LnZvdWNoZXIpO1xuICBjb25zdCBzdGF0dXNDb2RlID0gdHlwZW9mIGhlYWRlcj8uZXhwZW5zZVNoZWV0U3RhdHVzID09PSBcIm51bWJlclwiID8gaGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA6IG51bGw7XG4gIGNvbnN0IGlzU2hlZXRBcHByb3ZlZCA9IHN0YXR1c0NvZGUgPT09IEVYUEVOU0VfU1RBVFVTX0FQUFJPVkVEO1xuICBjb25zdCBpc1NoZWV0UGFpZEJ5U3RhdHVzID0gc3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfUEFJRDtcbiAgY29uc3QgaXNTaGVldFBhaWRCeVZvdWNoZXIgPSBoYXNBc3NpZ25lZFZvdWNoZXIodm91Y2hlclZhbHVlKTtcbiAgY29uc3QgaXNTaGVldFBhaWQgPSBpc1NoZWV0UGFpZEJ5U3RhdHVzIHx8IGlzU2hlZXRQYWlkQnlWb3VjaGVyO1xuICBjb25zdCBpc1NoZWV0TG9ja2VkID0gaXNTaGVldEFwcHJvdmVkIHx8IGlzU2hlZXRQYWlkO1xuICBjb25zdCBoYXNMaW5lcyA9IGxpbmVzLmxlbmd0aCA+IDA7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZVZhbHVlID0gZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKHNhZmVUZXh0KGhlYWRlcj8uZXhjaFJhdGUpLCB7XG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICBmYWxsYmFjazogXCJcIixcbiAgfSk7XG4gIGNvbnN0IHNob3dFeGNoYW5nZVJhdGUgPSB1c2VNZW1vKCgpID0+IHNob3VsZFNob3dFeGNoYW5nZVJhdGUoZXhjaGFuZ2VSYXRlVmFsdWUpLCBbZXhjaGFuZ2VSYXRlVmFsdWVdKTtcbiAgY29uc3Qgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgPSB1c2VNZW1vKCgpID0+IGRyYWZ0Q3VycmVuY3lDb2RlLnRyaW0oKS50b1VwcGVyQ2FzZSgpLCBbZHJhZnRDdXJyZW5jeUNvZGVdKTtcbiAgY29uc3Qgbm9ybWFsaXplZERlZmF1bHRDdXJyZW5jeSA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQoZGVmYXVsdEN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSwgW2RlZmF1bHRDdXJyZW5jeUNvZGVdKTtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5ID0gbm9ybWFsaXplZERlZmF1bHRDdXJyZW5jeSB8fCBcIkVVUlwiO1xuICBjb25zdCB1aUxvY2FsZSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBcImVzLUVTXCI7XG4gICAgcmV0dXJuIHNhZmVUZXh0KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudD8ubGFuZykgfHwgXCJlcy1FU1wiO1xuICB9LCBbXSk7XG4gIGNvbnN0IGZvcm1FeGNoYW5nZURhdGUgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBwYXJzZWREYXRlID0gcGFyc2VFeHBlbnNlRGF0ZShzYWZlVGV4dChoZWFkZXI/LmNyZWF0ZWREYXRlKSk7XG4gICAgaWYgKHBhcnNlZERhdGUpIHJldHVybiB0b0lzb0RhdGUocGFyc2VkRGF0ZSk7XG4gICAgcmV0dXJuIHRvSXNvRGF0ZShuZXcgRGF0ZSgpKTtcbiAgfSwgW2hlYWRlcj8uY3JlYXRlZERhdGVdKTtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlUmVxdWlyZWQgPVxuICAgIGlzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzICYmIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5ICE9PSBcIlwiICYmIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5ICE9PSBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlID1cbiAgICBleGNoYW5nZVJhdGVSZXF1aXJlZCAmJiAhZHJhZnRFeGNoYW5nZVJhdGUudHJpbSgpXG4gICAgICA/IGluZFQoXG4gICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fRXhjaGFuZ2VSYXRlUmVxdWlyZWRcIixcbiAgICAgICAgICBcIkV4Y2hhbmdlIHJhdGUgaXMgcmVxdWlyZWQgd2hlbiBjdXJyZW5jeSBpcyBkaWZmZXJlbnQgZnJvbSBiYXNlIGN1cnJlbmN5LlwiXG4gICAgICAgIClcbiAgICAgIDogXCJcIjtcbiAgLy8gQ3VycmVuY3kgdHlwZSBjYW4gYmUgZWRpdGVkIHdoZW5ldmVyIHRoZSBzaGVldCBpdHNlbGYgaXMgZWRpdGFibGUgKG5vdCBhcHByb3ZlZC9wYWlkKS5cbiAgY29uc3QgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMgPSBmYWxzZTtcbiAgY29uc3QgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzID0gaXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHMgJiYgaGFzTGluZXMgJiYgc2hvd0V4Y2hhbmdlUmF0ZTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBpc0NhbmNlbGxlZCA9IGZhbHNlO1xuICAgIGxldCByZXF1ZXN0VGltZXI6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IHJlcXVlc3RBYm9ydENvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlciB8IG51bGwgPSBudWxsO1xuXG4gICAgY29uc3QgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzID0gKCkgPT4ge1xuICAgICAgaWYgKHJlcXVlc3RUaW1lcikge1xuICAgICAgICBjbGVhclRpbWVvdXQocmVxdWVzdFRpbWVyKTtcbiAgICAgICAgcmVxdWVzdFRpbWVyID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmIChyZXF1ZXN0QWJvcnRDb250cm9sbGVyKSB7XG4gICAgICAgIHJlcXVlc3RBYm9ydENvbnRyb2xsZXIuYWJvcnQoKTtcbiAgICAgICAgcmVxdWVzdEFib3J0Q29udHJvbGxlciA9IG51bGw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICghaXNFZGl0aW5nIHx8ICFjYW5FZGl0SGVhZGVyRmllbGRzIHx8IGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcykge1xuICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKGZhbHNlKTtcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXCJcIik7XG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICghbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgfHwgIWV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSkge1xuICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKGZhbHNlKTtcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXCJcIik7XG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChub3JtYWxpemVkRHJhZnRDdXJyZW5jeSA9PT0gZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5KSB7XG4gICAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZShcIjFcIik7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiMVwiKTtcbiAgICAgIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZyhmYWxzZSk7XG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFwiXCIpO1xuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJlcXVlc3RUaW1lciA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgcmVxdWVzdEFib3J0Q29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXCJcIik7XG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldEV4Y2hhbmdlUmF0ZShcbiAgICAgICAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcbiAgICAgICAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXG4gICAgICAgICAgZm9ybUV4Y2hhbmdlRGF0ZSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHNpZ25hbDogcmVxdWVzdEFib3J0Q29udHJvbGxlci5zaWduYWwsXG4gICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2VzcyB8fCAhcmVzcG9uc2UuRGF0YSB8fCAhTnVtYmVyLmlzRmluaXRlKE51bWJlcihyZXNwb25zZS5EYXRhLlJhdGUpKSkge1xuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xuICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXG4gICAgICAgICAgICBzYWZlVGV4dChyZXNwb25zZS5NZXNzYWdlKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvZmZpY2lhbFJhdGVSYXcgPSBOdW1iZXIocmVzcG9uc2UuRGF0YS5SYXRlKTtcbiAgICAgICAgY29uc3Qgb2ZmaWNpYWxSYXRlRm9yQW1vdW50MTAwID0gb2ZmaWNpYWxSYXRlUmF3ICogRVhDSEFOR0VfUkFURV9SRUZFUkVOQ0VfQU1PVU5UO1xuICAgICAgICBjb25zdCBuZXh0RXhjaGFuZ2VSYXRlVmFsdWUgPSBmb3JtYXRFeGNoYW5nZVJhdGVJbnB1dFZhbHVlKG9mZmljaWFsUmF0ZUZvckFtb3VudDEwMCk7XG4gICAgICAgIGNvbnN0IG9mZmljaWFsUmF0ZVJhd1ZhbHVlID0gZm9ybWF0RXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZShvZmZpY2lhbFJhdGVSYXcpO1xuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKG5leHRFeGNoYW5nZVJhdGVWYWx1ZSk7XG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUob2ZmaWNpYWxSYXRlUmF3VmFsdWUpO1xuICAgICAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZShuZXh0RXhjaGFuZ2VSYXRlVmFsdWUpO1xuXG4gICAgICAgIGNvbnN0IGVmZmVjdGl2ZVJhdGVEYXRlID0gc2FmZVRleHQocmVzcG9uc2UuRGF0YS5EYXRlKSB8fCBmb3JtRXhjaGFuZ2VEYXRlO1xuICAgICAgICBjb25zdCBzb3VyY2UgPSBzYWZlVGV4dChyZXNwb25zZS5EYXRhLlNvdXJjZSk7XG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShlZmZlY3RpdmVSYXRlRGF0ZSk7XG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKHNvdXJjZSk7XG4gICAgICAgIGNvbnN0IG9mZmljaWFsTGFiZWwgPSBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsKDApIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX09mZmljaWFsXCIsIFwiVC5DLiBPZmljaWFsXCIpO1xuICAgICAgICBjb25zdCBsb2NhbGl6ZWRSYXRlRGF0ZSA9IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShlZmZlY3RpdmVSYXRlRGF0ZSwgdWlMb2NhbGUpIHx8IGVmZmVjdGl2ZVJhdGVEYXRlO1xuICAgICAgICBjb25zdCBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZSA9IHNvdXJjZSA/IGAke29mZmljaWFsTGFiZWx9ICR7bG9jYWxpemVkUmF0ZURhdGV9ICgke3NvdXJjZX0pYCA6IGAke29mZmljaWFsTGFiZWx9ICR7bG9jYWxpemVkUmF0ZURhdGV9YDtcbiAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShvZmZpY2lhbFJhdGVSYXdWYWx1ZSA/IGAke2V4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlfSAtICR7b2ZmaWNpYWxSYXRlUmF3VmFsdWV9YCA6IGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlKTtcbiAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSBcIkFib3J0RXJyb3JcIikgcmV0dXJuO1xuXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XG4gICAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9Ob3RGb3VuZFwiLCBcIk5vIGhheSB0aXBvIGRlIGNhbWJpbyBwYXJhIGxhIGZlY2hhXCIpKTtcbiAgICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQyMiB8fCBlcnJvci5zdGF0dXMgPT09IDUwMCkge1xuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcbiAgICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXG4gICAgICAgICAgICAgIHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9VbmF2YWlsYWJsZVwiLCBcIk5vIHNlIHB1ZG8gb2J0ZW5lciBlbCB0aXBvIGRlIGNhbWJpby5cIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xuICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXG4gICAgICAgICAgICBzYWZlVGV4dChlcnJvci5tZXNzYWdlKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xuICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9VbmF2YWlsYWJsZVwiLCBcIk5vIHNlIHB1ZG8gb2J0ZW5lciBlbCB0aXBvIGRlIGNhbWJpby5cIikpO1xuICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmICghaXNDYW5jZWxsZWQpIHtcbiAgICAgICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgRVhDSEFOR0VfUkFURV9ERUJPVU5DRV9NUyk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaXNDYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XG4gICAgfTtcbiAgfSwgW1xuICAgIGNhbkVkaXRIZWFkZXJGaWVsZHMsXG4gICAgZm9ybUV4Y2hhbmdlRGF0ZSxcbiAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXG4gICAgaXNFZGl0aW5nLFxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcbiAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcbiAgICB1aUxvY2FsZSxcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgXSk7XG5cbiAgY29uc3QgaGFuZGxlRW5hYmxlRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoaXNDcmVhdGVNb2RlIHx8IGlzTG9hZGluZyB8fCAhaGVhZGVyIHx8IGlzU2hlZXRMb2NrZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWNhbkVkaXRFeHBlbnNlKSB7XG4gICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgc2V0SXNFZGl0aW5nKHRydWUpO1xuICAgIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIoaGVhZGVyKTtcbiAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0VkaXRpbmdFbmFibGVkXCIsIFwiRWRpdGluZyBlbmFibGVkXCIpKTtcbiAgfSwgW2NhbkVkaXRFeHBlbnNlLCBoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIsIGlzQ3JlYXRlTW9kZSwgaXNMb2FkaW5nLCBpc1NoZWV0TG9ja2VkLCBvbkZvcmJpZGRlbl0pO1xuXG4gIGNvbnN0IGhhbmRsZUNhbmNlbEVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL0V4cGVuc2VTaGVldHNcIiwge1xuICAgICAgICBhc2tDb25maXJtYXRpb246IHRydWUsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWlzRWRpdGluZykgcmV0dXJuO1xuXG4gICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIoaGVhZGVyKTtcbiAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIikpO1xuICB9LCBbaGVhZGVyLCBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZ10pO1xuXG4gIC8vIE9wZW5zIGV4cGVuc2Ugc2hlZXQgY3JlYXRlIG1vZGUgZnJvbSBsaXN0LWxldmVsIGVudHJ5IHBvaW50cy5cbiAgY29uc3QgaGFuZGxlT3BlbkNyZWF0ZVNoZWV0TW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWNhbkNyZWF0ZUV4cGVuc2UpIHtcbiAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/bW9kZT1jcmVhdGVcIiwge1xuICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXG4gICAgfSk7XG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgb25Gb3JiaWRkZW5dKTtcblxuICAvLyBPcGVucyBleHBlbnNlIGxpbmUgY3JlYXRlIG1vZGUgZnJvbSBhbiBleGlzdGluZyBleHBlbnNlIHNoZWV0IGRldGFpbC5cbiAgY29uc3QgaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSB8fCAhc2hlZXRJZCB8fCBpc1NoZWV0TG9ja2VkKSB7XG4gICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXRMaW5lRGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzaGVldElkKX0mbW9kZT1jcmVhdGVgO1xuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCwge1xuICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXG4gICAgfSk7XG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgaXNTaGVldExvY2tlZCwgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcblxuICAvLyBPcGVucyB0aWNrZXRzIHBhZ2UgZnJvbSBleHBlbnNlIHNoZWV0IGNvbnRleHQgdG8gY3JlYXRlIG9yIGxpbmsgdGlja2V0cy5cbiAgY29uc3Qgb3BlblRpY2tldHNGcm9tU2hlZXQgPSB1c2VDYWxsYmFjayhcbiAgICAoYWN0aW9uOiBcIm5ld1wiIHwgXCJsaW5rXCIpID0+IHtcbiAgICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSB8fCAhc2hlZXRJZCB8fCBpc1NoZWV0TG9ja2VkKSB7XG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XG4gICAgICAgIGFjdGlvbixcbiAgICAgICAgaG9qYUdhc3Rvc0lkOiBzaGVldElkLFxuICAgICAgfSk7XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXRzPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogaXNFZGl0aW5nLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbY2FuQ3JlYXRlRXhwZW5zZSwgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmcsIGlzU2hlZXRMb2NrZWQsIG9uRm9yYmlkZGVuLCBzaGVldElkXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZU9wZW5DcmVhdGVUaWNrZXRNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIG9wZW5UaWNrZXRzRnJvbVNoZWV0KFwibmV3XCIpO1xuICB9LCBbb3BlblRpY2tldHNGcm9tU2hlZXRdKTtcblxuICBjb25zdCBoYW5kbGVPcGVuTGlua1RpY2tldE1vZGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgb3BlblRpY2tldHNGcm9tU2hlZXQoXCJsaW5rXCIpO1xuICB9LCBbb3BlblRpY2tldHNGcm9tU2hlZXRdKTtcblxuICBjb25zdCBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0ID0gdXNlQ2FsbGJhY2soKGNyZWF0ZWRTaGVldElkOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBzYWZlQ3JlYXRlZFNoZWV0SWQgPSBzYWZlVGV4dChjcmVhdGVkU2hlZXRJZCk7XG4gICAgaWYgKCFzYWZlQ3JlYXRlZFNoZWV0SWQpIHJldHVybjtcblxuICAgIGNvbnN0IHRhcmdldFVybCA9IGAvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZUNyZWF0ZWRTaGVldElkKX1gO1xuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBuYXZpZ2F0ZVRvTGluZURldGFpbCA9IHVzZUNhbGxiYWNrKFxuICAgIChsaW5lUmVjSWQ6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3Qgc2FmZUxpbmVJZCA9IHNhZmVUZXh0KGxpbmVSZWNJZCk7XG4gICAgICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KHNoZWV0SWQpO1xuICAgICAgaWYgKCFzYWZlTGluZUlkIHx8ICFzYWZlU2hlZXRJZCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXRMaW5lRGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlU2hlZXRJZCl9JmxpbmVSZWNJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlTGluZUlkKX1gO1xuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwodGFyZ2V0VXJsLCB7XG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogdHJ1ZSxcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW3NoZWV0SWRdXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBoZWFkZXIsXG4gICAgbGluZXMsXG4gICAgbGluZVBhZ2UsXG4gICAgaXNMb2FkaW5nLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBidXN5LFxuICAgIHN0YXR1cyxcbiAgICBpc0VkaXRpbmcsXG4gICAgbW9kYWxFcnJvcixcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0UHJvamVjdElkLFxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxuICAgIGRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzLFxuICAgIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSxcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSxcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvYWRpbmcsXG4gICAgZXhjaGFuZ2VSYXRlTWVzc2FnZSxcbiAgICBleGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcixcbiAgICBwcm9qZWN0VmFsdWUsXG4gICAgdm91Y2hlclZhbHVlLFxuICAgIGlzU2hlZXRQYWlkLFxuICAgIGlzU2hlZXRMb2NrZWQsXG4gICAgZXhjaGFuZ2VSYXRlVmFsdWUsXG4gICAgc2hvd0V4Y2hhbmdlUmF0ZSxcbiAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcbiAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXG4gICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50OiBFWENIQU5HRV9SQVRFX1JFRkVSRU5DRV9BTU9VTlQsXG4gICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXG4gICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxuICAgIHNldExpbmVQYWdlLFxuICAgIHNldExpbmVzLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXG4gICAgc2V0RHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gICAgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlT3BlbkNyZWF0ZVNoZWV0TW9kZSxcbiAgICBoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUsXG4gICAgaGFuZGxlT3BlbkNyZWF0ZVRpY2tldE1vZGUsXG4gICAgaGFuZGxlT3BlbkxpbmtUaWNrZXRNb2RlLFxuICAgIG5hdmlnYXRlVG9DcmVhdGVkU2hlZXQsXG4gICAgbmF2aWdhdGVUb0xpbmVEZXRhaWwsXG4gIH07XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBOEQ7OztBQ0E5RCxJQUFBQyxnQkFBa0I7OztBQ0FsQixtQkFBaUY7QUFDakYsdUJBQTZCO0FBeUdyQjtBQTdGUixJQUFNLHdCQUF3QixDQUFDO0FBQUEsRUFDN0I7QUFBQSxFQUNBO0FBQUEsRUFDQSxZQUFZO0FBQUEsRUFDWixpQkFBaUI7QUFDbkIsTUFBa0M7QUFDaEMsUUFBTSxnQ0FBZ0M7QUFDdEMsUUFBTSw4QkFBOEI7QUFDcEMsUUFBTSx1QkFBdUI7QUFDN0IsUUFBTSxnQkFBZ0I7QUFDdEIsUUFBTSxDQUFDLFFBQVEsU0FBUyxRQUFJLHVCQUFTLEtBQUs7QUFDMUMsUUFBTSxDQUFDLFlBQVksYUFBYSxRQUFJLHVCQUE4QjtBQUFBLElBQ2hFLFVBQVU7QUFBQSxJQUNWLEtBQUs7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxFQUNkLENBQUM7QUFDRCxRQUFNLGdCQUFZLHFCQUFpQyxJQUFJO0FBQ3ZELFFBQU0sZUFBVyxxQkFBOEIsSUFBSTtBQUVuRCxrQkFBZ0IsQ0FBQyxXQUFXLFFBQVEsR0FBRyxNQUFNLFVBQVUsS0FBSyxDQUFDO0FBQzdELFFBQU0sMEJBQXNCLDBCQUFZLE1BQU07QUFDNUMsUUFBSSxPQUFPLFdBQVcsYUFBYTtBQUNqQztBQUFBLElBQ0Y7QUFFQSxVQUFNLGdCQUFnQixVQUFVO0FBQ2hDLFVBQU0sZUFBZSxTQUFTO0FBQzlCLFFBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjO0FBQ25DO0FBQUEs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QUEsSUFDYixJQUNFO0FBQUEsS0FDTjtBQUVKO0FBR0EsSUFBTSx5QkFBeUIsTUFBTTtBQUNuQyxTQUNFLDZDQUFDLGdDQUFxQix5QkFBdUIsTUFDM0MsdURBQUMsaUNBQThCLEdBQ2pDO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsUUFBTSxTQUFTLFNBQVMsZUFBZSwyQkFBMkI7QUFDbEUsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQywwQkFBdUIsQ0FBRTtBQUNyRDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8saUNBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIlJlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAicGF5bG9hZCIsICJyZXNwb25zZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
