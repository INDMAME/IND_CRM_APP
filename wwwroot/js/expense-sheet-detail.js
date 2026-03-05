import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-YJQJ6JSM.js";
import {
  useExpenseSheetQuickTicketFlow
} from "./chunks/chunk-G2ZIZZ4I.js";
import {
  getExpenseSheetStatusOptions,
  getExpenseStatusLabel
} from "./chunks/chunk-GFZQR6PA.js";
import "./chunks/chunk-NE4KB4CT.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-CCXORWXW.js";
import "./chunks/chunk-6HMZLOGF.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseCurrencyFlagIcon_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-ZQIQJJOC.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-GIUUNBHM.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-GQ2I6PU5.js";
import {
  useOutsideClick
} from "./chunks/chunk-6YXFJB4W.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-XNARBSRN.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-XXAOM63C.js";
import "./chunks/chunk-K7MECJ5E.js";
import {
  clearExpenseNavigationGuard,
  configureExpenseApiAuth,
  createExpenseSheet,
  deleteExpenseSheet,
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
  updateExpenseSheetHeader
} from "./chunks/chunk-GGS3XUX2.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-EVHUYAZN.js";
import {
  ApiFetchError,
  Spinner_default,
  canAccess,
  classNames,
  indFormat,
  indT,
  showPermissionModal
} from "./chunks/chunk-PU3BESI6.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunks/chunk-BWM3JLWG.js";
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
    canCreateExpense,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvRXhwZW5zZVNoZWV0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VTaGVldEhlYWRlckZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvSW5mb1BvcG92ZXJJY29uQnV0dG9uLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbnN0YW50cy9leGNoYW5nZVJhdGVFbnRyeU1vZGVDYXRhbG9nLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlTGluZXNUaW1lbGluZS50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFZpc2l0YXNQYWdlUHJvdmlkZXJzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvVmlzaXRhc1BhZ2VQcm92aWRlcnMudHN4XCI7XG5pbXBvcnQgQ29uZmlybU1vZGFsIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29uZmlybU1vZGFsLnRzeFwiO1xuaW1wb3J0IEZsb2F0aW5nQWN0aW9uQnV0dG9uLCB7IHR5cGUgRmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbSB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdBY3Rpb25CdXR0b24udHN4XCI7XG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NwaW5uZXIudHN4XCI7XG5pbXBvcnQgeyB1c2VBdXRoQ29udGV4dCB9IGZyb20gXCIuLi8uLi8uLi9jb250ZXh0L0F1dGhDb250ZXh0LnRzeFwiO1xuaW1wb3J0IHsgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUaW1lbGluZUNhcmRFZmZlY3RzLnRzXCI7XG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IEV4cGVuc2VTaGVldEhlYWRlckZvcm0gZnJvbSBcIi4uL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0SGVhZGVyRm9ybS50c3hcIjtcbmltcG9ydCBFeHBlbnNlTGluZXNUaW1lbGluZSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlTGluZXNUaW1lbGluZS50c3hcIjtcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlTnVtYmVyIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcbmltcG9ydCB7IGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cudHNcIjtcblxuY29uc3QgTElORVNfUEFHRV9TSVpFID0gNjtcblxuY29uc3QgcGFnZWRTbGljZSA9IDxULD4oaXRlbXM6IFRbXSwgcGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyKTogVFtdID0+IHtcbiAgaWYgKCFpdGVtcy5sZW5ndGgpIHJldHVybiBbXTtcbiAgY29uc3Qgc2FmZVBhZ2UgPSBNYXRoLm1heCgxLCBwYWdlKTtcbiAgY29uc3Qgc3RhcnQgPSAoc2FmZVBhZ2UgLSAxKSAqIHBhZ2VTaXplO1xuICByZXR1cm4gaXRlbXMuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgcGFnZVNpemUpO1xufTtcblxuLy8gSW5pdGlhbGl6ZXMgYXV0aCBzZWVkIGZvciBleHBlbnNlIEFQSSBjYWxscyBiZWZvcmUgaXNsYW5kIGVmZmVjdHMgcnVuLlxuY29uc3QgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGggPSAoKSA9PiB7XG4gIGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoKHtcbiAgICB0b2tlbjogc2FmZVRleHQod2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcbiAgICBlbnRyYU9pZDogc2FmZVRleHQod2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcbiAgICBhcHBDb2RlOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBQX0NPREVfXyksXG4gIH0pO1xufTtcblxuY29uc3QgTmV3VGlja2V0SWNvbiA9ICgpID0+IChcbiAgPHN2ZyB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD17MS41fSBhcmlhLWhpZGRlbj1cInRydWVcIiBjbGFzc05hbWU9XCJoLTUgdy01XCI+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTAgMjBoLTVhMiAyIDAgMCAxIC0yIC0ydi05YTIgMiAwIDAgMSAyIC0yaDFhMiAyIDAgMCAwIDIgLTJhMSAxIDAgMCAxIDEgLTFoNmExIDEgMCAwIDEgMSAxYTIgMiAwIDAgMCAyIDJoMWEyIDIgMCAwIDEgMiAydjJcIiAvPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0LjM2MiAxMS4xNWEzIDMgMCAxIDAgLTQuMTQ0IDQuMjYzXCIgLz5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNCAyMXYtNGEyIDIgMCAxIDEgNCAwdjRcIiAvPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDE5aDRcIiAvPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTIxIDE1djZcIiAvPlxuICA8L3N2Zz5cbik7XG5cbmNvbnN0IExpbmtUaWNrZXRJY29uID0gKCkgPT4gKFxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsxLjV9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzTmFtZT1cImgtNSB3LTVcIj5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xMy4xOSA4LjY4OGE0LjUgNC41IDAgMCAxIDEuMjQyIDcuMjQ0bC00LjUgNC41YTQuNSA0LjUgMCAwIDEtNi4zNjQtNi4zNjRsMS43NTctMS43NTdtMTMuMzUtLjYyMiAxLjc1Ny0xLjc1N2E0LjUgNC41IDAgMCAwLTYuMzY0LTYuMzY0bC00LjUgNC41YTQuNSA0LjUgMCAwIDAgMS4yNDIgNy4yNDRcIiAvPlxuICA8L3N2Zz5cbik7XG5cbmNvbnN0IE5ld0xpbmVJY29uID0gKCkgPT4gKFxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsxLjV9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzTmFtZT1cImgtNSB3LTVcIj5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0zIDE5YzMuMzMzIC0yIDUgLTQgNSAtNmMwIC0zIC0xIC0zIC0yIC0zcy0yLjAzMiAxLjA4NSAtMiAzYy4wMzQgMi4wNDggMS42NTggMi44NzcgMi41IDRjMS41IDIgMi41IDIuNSAzLjUgMWMuNjY3IC0xIDEuMTY3IC0xLjgzMyAxLjUgLTIuNWMxIDIuMzMzIDIuMzMzIDMuNSA0IDMuNWgyLjVcIiAvPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTIwIDE3di0xMmMwIC0xLjEyMSAtLjg3OSAtMiAtMiAtMnMtMiAuODc5IC0yIDJ2MTJsMiAybDIgLTJcIiAvPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE2IDdoNFwiIC8+XG4gIDwvc3ZnPlxuKTtcblxuY29uc3QgRXhwZW5zZVNoZWV0RGV0YWlsUGFnZUNvbnRlbnQgPSAoKSA9PiB7XG4gIGNvbnN0IHsgYWxsb3dTZWxmTWFuYWdlbWVudCB9ID0gdXNlQXV0aENvbnRleHQoKTtcbiAgY29uc3QgaGFzQWNjZXNzID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJWaWV3XCIpO1xuICBjb25zdCBjYW5FZGl0RXhwZW5zZUJ5TW9kdWxlID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJFZGl0XCIpO1xuICBjb25zdCBjYW5EZWxldGVFeHBlbnNlID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJGdWxsQWNjZXNzXCIpO1xuICBjb25zdCBjYW5DcmVhdGVFeHBlbnNlID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJBZGRcIik7XG4gIGNvbnN0IHNoZWV0SWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1NIRUVUX0lEX18pO1xuICBjb25zdCBzaGVldE1vZGUgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1NIRUVUX01PREVfXykudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgaXNDcmVhdGVNb2RlID0gc2hlZXRNb2RlID09PSBcImNyZWF0ZVwiO1xuICBjb25zdCBjYW5FZGl0RXhwZW5zZVN0YXR1c0J5UGVybWlzc2lvbiA9IGFsbG93U2VsZk1hbmFnZW1lbnQgPT09IHRydWUgJiYgIWlzQ3JlYXRlTW9kZTtcbiAgY29uc3QgY2FuRWRpdEV4cGVuc2UgPSBjYW5FZGl0RXhwZW5zZUJ5TW9kdWxlIHx8IGNhbkVkaXRFeHBlbnNlU3RhdHVzQnlQZXJtaXNzaW9uO1xuICBjb25zdCBsaW5lQ29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGNyZWF0ZWRTaGVldElkUmVmID0gdXNlUmVmKFwiXCIpO1xuICBjb25zdCBjYW1lcmFJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGdhbGxlcnlJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsIHNldElzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZpcnN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIiksXG4gICAgICBwcmV2OiBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKSxcbiAgICAgIG5leHQ6IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIiksXG4gICAgICBsYXN0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpLFxuICAgIH0pLFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3Qge1xuICAgIGhlYWRlcixcbiAgICBsaW5lcyxcbiAgICBsaW5lUGFnZSxcbiAgICBpc0xvYWRpbmcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGJ1c3ksXG4gICAgc3RhdHVzLFxuICAgIGlzRWRpdGluZyxcbiAgICBtb2RhbEVycm9yLFxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgZHJhZnRQcm9qZWN0SWQsXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgZHJhZnRFeGNoYW5nZVJhdGUsXG4gICAgZHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlLFxuICAgIHByb2plY3RWYWx1ZSxcbiAgICB2b3VjaGVyVmFsdWUsXG4gICAgaXNTaGVldFBhaWQsXG4gICAgaXNTaGVldExvY2tlZCxcbiAgICBleGNoYW5nZVJhdGVWYWx1ZSxcbiAgICBzaG93RXhjaGFuZ2VSYXRlLFxuICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQsXG4gICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXG4gICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxuICAgIHNldExpbmVQYWdlLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXG4gICAgc2V0RHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gICAgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlLFxuICAgIGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSxcbiAgICBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0LFxuICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsLFxuICB9ID0gdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUoe1xuICAgIGhhc0FjY2VzcyxcbiAgICBjYW5DcmVhdGVFeHBlbnNlLFxuICAgIGNhbkVkaXRFeHBlbnNlLFxuICAgIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGNhbkVkaXRFeHBlbnNlQnlNb2R1bGUsXG4gICAgc2hlZXRJZCxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gIH0pO1xuXG4gIGNvbnN0IGNhbkVkaXRFeHBlbnNlU3RhdHVzID0gY2FuRWRpdEV4cGVuc2VTdGF0dXNCeVBlcm1pc3Npb24gJiYgIWlzU2hlZXRMb2NrZWQ7XG5cbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXG4gIH0pO1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xuICAgICAgYnVzeSxcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xuICAgICAgICBzZXRTdGF0dXMobXNnKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtXSk7XG5cbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIik7XG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBidXN5XG4gICAgPyBtb2RhbExvYWRpbmdUZXh0XG4gICAgOiAoIWJ1c3kgJiYgbW9kYWxFcnJvciA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJPS1wiKSA6IChtb2RhbC5jb25maXJtVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSkpO1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQnV0dG9uQ29uZmlybSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWJ1c3kgJiYgbW9kYWxFcnJvcikge1xuICAgICAgY2xvc2VDb25maXJtKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xuICB9LCBbYnVzeSwgY2xvc2VDb25maXJtLCBoYW5kbGVNb2RhbENvbmZpcm0sIG1vZGFsRXJyb3JdKTtcblxuICBjb25zdCB2aXNpYmxlTGluZXMgPSB1c2VNZW1vKCgpID0+IHBhZ2VkU2xpY2UobGluZXMsIGxpbmVQYWdlLCBMSU5FU19QQUdFX1NJWkUpLCBbbGluZVBhZ2UsIGxpbmVzXSk7XG4gIGNvbnN0IHRvdGFsTGluZVBhZ2VzID0gTWF0aC5jZWlsKChsaW5lcy5sZW5ndGggfHwgMCkgLyBMSU5FU19QQUdFX1NJWkUpO1xuICBjb25zdCB0b3RhbEFtb3VudFRleHQgPSB1c2VNZW1vKFxuICAgICgpID0+XG4gICAgICBmb3JtYXRFeHBlbnNlTnVtYmVyKGhlYWRlcj8udG90YWxBbW91bnQsIHtcbiAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgICAgICBmYWxsYmFjazogXCItXCIsXG4gICAgICB9KSxcbiAgICBbaGVhZGVyPy50b3RhbEFtb3VudF1cbiAgKTtcblxuICBjb25zdCB7IGhhbmRsZVVwZGF0ZSwgaGFuZGxlRGVsZXRlIH0gPSB1c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMoe1xuICAgIGJ1c3ksXG4gICAgaXNFZGl0aW5nLFxuICAgIGlzQ3JlYXRlTW9kZSxcbiAgICBpc0xvY2tlZDogaXNTaGVldExvY2tlZCxcbiAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXG4gICAgbG9ja2VkQ3VycmVuY3lDb2RlOiBzYWZlVGV4dChoZWFkZXI/LmN1cnJlbmN5Q29kZSksXG4gICAgbG9ja2VkRXhjaGFuZ2VSYXRlOiBzYWZlVGV4dChoZWFkZXI/LmV4Y2hSYXRlKSxcbiAgICBjYW5DcmVhdGVFeHBlbnNlLFxuICAgIGNhbkVkaXRFeHBlbnNlLFxuICAgIGNhbkRlbGV0ZUV4cGVuc2UsXG4gICAgY2FuRWRpdFN0YXR1czogY2FuRWRpdEV4cGVuc2VTdGF0dXMsXG4gICAgc2hlZXRJZCxcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsXG4gICAgZHJhZnRQcm9qZWN0SWQsXG4gICAgZHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcbiAgICBjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzOiBoZWFkZXI/LmV4cGVuc2VTaGVldFN0YXR1cyxcbiAgICBjdXJyZW50RXhjaGFuZ2VSYXRlTW9kZTogaGVhZGVyPy5leGNoYW5nZVJhdGVNb2RlLFxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgICBvbkNyZWF0ZVN1Y2Nlc3M6IChjcmVhdGVkU2hlZXRJZCkgPT4ge1xuICAgICAgY3JlYXRlZFNoZWV0SWRSZWYuY3VycmVudCA9IHNhZmVUZXh0KGNyZWF0ZWRTaGVldElkKTtcbiAgICB9LFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRTdGF0dXMsXG4gICAgc2V0SXNFZGl0aW5nLFxuICB9KTtcblxuICBjb25zdCBoYW5kbGVTYXZlU3VjY2VzcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICBjb25zdCBjcmVhdGVkU2hlZXRJZCA9IHNhZmVUZXh0KGNyZWF0ZWRTaGVldElkUmVmLmN1cnJlbnQpO1xuICAgICAgaWYgKCFjcmVhdGVkU2hlZXRJZCkgcmV0dXJuO1xuICAgICAgc2V0SXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlKHRydWUpO1xuICAgICAgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldChjcmVhdGVkU2hlZXRJZCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9LCBbaXNDcmVhdGVNb2RlLCBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0XSk7XG5cbiAgdXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9ucyh7XG4gICAgYnVzeTogYnVzeSB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUsXG4gICAgbW9kYWxPcGVuOiBtb2RhbC5vcGVuLFxuICAgIGlzRWRpdGluZyxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgaXNMb2NrZWQ6IGlzU2hlZXRMb2NrZWQsXG4gICAgY2FuQ3JlYXRlRXhwZW5zZSxcbiAgICBjYW5FZGl0RXhwZW5zZSxcbiAgICBjYW5EZWxldGVFeHBlbnNlLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxuICAgIGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVEZWxldGUsXG4gICAgb25TYXZlU3VjY2VzczogaGFuZGxlU2F2ZVN1Y2Nlc3MsXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgY2xvc2VDb25maXJtLFxuICB9KTtcblxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGNhcmQgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiKTtcbiAgICBpZiAoIWNhcmQpIHJldHVybiBudWxsO1xuICAgIGlmICghbGluZUNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyhjYXJkKSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNhcmQ7XG4gIH0sIFtdKTtcblxuICB1c2VUaW1lbGluZUNhcmRFZmZlY3RzKHtcbiAgICBjb250YWluZXJSZWY6IGxpbmVDb250YWluZXJSZWYsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGl0ZW1zOiB2aXNpYmxlTGluZXMsXG4gICAgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsXG4gIH0pO1xuXG4gIGNvbnN0IHtcbiAgICBzb3VyY2VQaWNrZXJPcGVuLFxuICAgIGJ1c3k6IHF1aWNrVGlja2V0QnVzeSxcbiAgICBwcm9ncmVzc01lc3NhZ2U6IHF1aWNrVGlja2V0UHJvZ3Jlc3NNZXNzYWdlLFxuICAgIGVycm9yTWVzc2FnZTogcXVpY2tUaWNrZXRFcnJvck1lc3NhZ2UsXG4gICAgaGFzUGVuZGluZ1VwbG9hZFJldHJ5LFxuICAgIHRyYWNlTGlzdDogcXVpY2tUaWNrZXRUcmFjZUxpc3QsXG4gICAgb3BlblNvdXJjZVBpY2tlcixcbiAgICBjbG9zZVNvdXJjZVBpY2tlcixcbiAgICBzZWxlY3RGcm9tQ2FtZXJhLFxuICAgIHNlbGVjdEZyb21HYWxsZXJ5LFxuICAgIGhhbmRsZVNlbGVjdGVkRmlsZSxcbiAgICByZXRyeVBlbmRpbmdVcGxvYWQsXG4gICAgY2xlYXJFcnJvcjogY2xlYXJRdWlja1RpY2tldEVycm9yLFxuICB9ID0gdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93KHtcbiAgICBzaGVldElkOiBzYWZlVGV4dChoZWFkZXI/LmhvamFHYXN0b3NJZCB8fCBzaGVldElkKSxcbiAgICBwcm9qZWN0SWQ6IHByb2plY3RWYWx1ZSxcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSxcbiAgICBjYW5DcmVhdGVFeHBlbnNlLFxuICAgIGlzQ3JlYXRlTW9kZSxcbiAgICBpc1NoZWV0TG9ja2VkLFxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxuICAgIG9uQ29tcGxldGVkOiAocmVzdWx0KSA9PiB7XG4gICAgICBjb25zdCBjcmVhdGVkRmlsZUlkID0gc2FmZVRleHQocmVzdWx0Py5maWxlSWQpO1xuICAgICAgaWYgKCFjcmVhdGVkRmlsZUlkKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgY3VycmVudFNoZWV0SWQgPSBzYWZlVGV4dChoZWFkZXI/LmhvamFHYXN0b3NJZCB8fCBzaGVldElkKTtcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XG4gICAgICAgIGZpbGVJZDogY3JlYXRlZEZpbGVJZCxcbiAgICAgICAgbW9kZTogXCJlZGl0XCIsXG4gICAgICAgIG9yaWdpbjogXCJzaGVldC1jcmVhdGVcIixcbiAgICAgIH0pO1xuICAgICAgaWYgKGN1cnJlbnRTaGVldElkKSB7XG4gICAgICAgIHF1ZXJ5LnNldChcInNoZWV0SWRcIiwgY3VycmVudFNoZWV0SWQpO1xuICAgICAgfVxuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoYC9HYXN0b3MvVGlja2V0RGV0YWlsPyR7cXVlcnkudG9TdHJpbmcoKX1gKTtcbiAgICB9LFxuICB9KTtcblxuICBjb25zdCBmYWJNZW51SXRlbXMgPSB1c2VNZW1vPEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW1bXT4oXG4gICAgKCkgPT4gW1xuICAgICAge1xuICAgICAgICBpZDogXCJuZXctdGlja2V0XCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfTmV3VGlja2V0XCIsIFwiTnVldm8gVGlja2V0XCIpLFxuICAgICAgICBpY29uOiA8TmV3VGlja2V0SWNvbiAvPixcbiAgICAgICAgb25DbGljazogb3BlblNvdXJjZVBpY2tlcixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiBcImxpbmstdGlja2V0XCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfTGlua1RpY2tldFwiLCBcIlZpbmN1bGFyIFRpY2tldFwiKSxcbiAgICAgICAgaWNvbjogPExpbmtUaWNrZXRJY29uIC8+LFxuICAgICAgICBvbkNsaWNrOiBoYW5kbGVPcGVuTGlua1RpY2tldE1vZGUsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogXCJuZXctbGluZVwiLFxuICAgICAgICBsYWJlbDogaW5kVChcIkV4cGVuc2VTaGVldHNfRmFiX05ld0xpbmVcIiwgXCJOdWV2YSBMaW5lYVwiKSxcbiAgICAgICAgaWNvbjogPE5ld0xpbmVJY29uIC8+LFxuICAgICAgICBvbkNsaWNrOiBoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUsXG4gICAgICB9LFxuICAgIF0sXG4gICAgW2hhbmRsZU9wZW5DcmVhdGVMaW5lTW9kZSwgaGFuZGxlT3BlbkxpbmtUaWNrZXRNb2RlLCBvcGVuU291cmNlUGlja2VyXVxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cbiAgICAgIDxDb25maXJtTW9kYWxcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cbiAgICAgICAgdGl0bGU9e21vZGFsLnRpdGxlfVxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cbiAgICAgICAgY2FuY2VsVGV4dD17bW9kYWxDYW5jZWxUZXh0fVxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cbiAgICAgICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxuICAgICAgICBidXN5PXtidXN5IHx8IGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZX1cbiAgICAgICAgZXJyb3I9e21vZGFsRXJyb3J9XG4gICAgICAgIHN0YXR1cz17c3RhdHVzfVxuICAgICAgICBvbkNvbmZpcm09e2hhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cbiAgICAgICAgb25DYW5jZWw9e2Nsb3NlQ29uZmlybX1cbiAgICAgIC8+XG5cbiAgICAgIDxpbnB1dFxuICAgICAgICByZWY9e2NhbWVyYUlucHV0UmVmfVxuICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgIGFjY2VwdD1cImltYWdlL2pwZWcsaW1hZ2UvanBnLGltYWdlL3BuZyxpbWFnZS93ZWJwXCJcbiAgICAgICAgY2FwdHVyZT1cImVudmlyb25tZW50XCJcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZpbGUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmZpbGVzPy5bMF0gfHwgbnVsbDtcbiAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgICB2b2lkIGhhbmRsZVNlbGVjdGVkRmlsZShmaWxlLCBcImNhbWVyYVwiKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgICA8aW5wdXRcbiAgICAgICAgcmVmPXtnYWxsZXJ5SW5wdXRSZWZ9XG4gICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgYWNjZXB0PVwiaW1hZ2UvanBlZyxpbWFnZS9qcGcsaW1hZ2UvcG5nLGltYWdlL3dlYnBcIlxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgZmlsZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZmlsZXM/LlswXSB8fCBudWxsO1xuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgIHZvaWQgaGFuZGxlU2VsZWN0ZWRGaWxlKGZpbGUsIFwiZ2FsbGVyeVwiKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG5cbiAgICAgIHtzb3VyY2VQaWNrZXJPcGVuID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctc2xhdGUtOTUwLzQ1IHB4LTQgcHktNlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LXNtIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHAtNCBzaGFkb3cteGxcIj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LVsxNnB4XSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX1RpdGxlXCIsIFwiTnVldm8gdGlja2V0XCIpfVxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxuICAgICAgICAgICAgICB7aW5kVChcbiAgICAgICAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9Cb2R5XCIsXG4gICAgICAgICAgICAgICAgXCJTZWxlY2Npb25hIHVuYSBmdWVudGUgcGFyYSBjYXB0dXJhciBvIGVsZWdpciBsYSBpbWFnZW4gZGVsIHRpY2tldC5cIlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgZ3JpZCBncmlkLWNvbHMtMSBnYXAtMlwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB2b2lkIHNlbGVjdEZyb21DYW1lcmEoY2FtZXJhSW5wdXRSZWYuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX0NhbWVyYVwiLCBcIlVzYXIgY2FtYXJhXCIpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2VsZWN0RnJvbUdhbGxlcnkoZ2FsbGVyeUlucHV0UmVmLmN1cnJlbnQpfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfR2FsbGVyeVwiLCBcIkVsZWdpciBpbWFnZW5cIil9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbG9zZVNvdXJjZVBpY2tlcn1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cblxuICAgICAge3F1aWNrVGlja2V0QnVzeSA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNjAwMDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTk1MC8zNSBweC00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZS85NSBweC00IHB5LTMgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiPlxuICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNSB3LTVcIiBsYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0gLz5cbiAgICAgICAgICAgIDxzcGFuPntxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cblxuICAgICAge3F1aWNrVGlja2V0RXJyb3JNZXNzYWdlID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIHNwYWNlLXktMiByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXJvc2UtNTAgcC0zIHRleHQtc20gdGV4dC1yb3NlLTgwMFwiPlxuICAgICAgICAgIDxwPntxdWlja1RpY2tldEVycm9yTWVzc2FnZX08L3A+XG4gICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy13aGl0ZSBwLTIgdGV4dC14cyB0ZXh0LXJvc2UtNzAwXCI+XG4gICAgICAgICAgICAgIHtxdWlja1RpY2tldFRyYWNlTGlzdC5tYXAoKGVudHJ5KSA9PiAoXG4gICAgICAgICAgICAgICAgPHAga2V5PXtgJHtlbnRyeS5zdGVwfS0ke2VudHJ5LmF0fWB9PntgJHtlbnRyeS5zdGVwfTogJHtlbnRyeS50cmFjZUlkfWB9PC9wPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTJcIj5cbiAgICAgICAgICAgIHtoYXNQZW5kaW5nVXBsb2FkUmV0cnkgPyAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB2b2lkIHJldHJ5UGVuZGluZ1VwbG9hZCgpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1JldHJ5VXBsb2FkXCIsIFwiUmVpbnRlbnRhciB1cGxvYWRcIil9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCIgb25DbGljaz17Y2xlYXJRdWlja1RpY2tldEVycm9yfT5cbiAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fQ2xvc2VcIiwgXCJDbG9zZVwiKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGlzTG9hZGluZyB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XG4gICAgICA+XG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7ZXJyb3JNZXNzYWdlID8gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntlcnJvck1lc3NhZ2V9PC9kaXY+IDogbnVsbH1cblxuICAgICAgeyFpc0xvYWRpbmcgJiYgIWlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSAmJiAhZXJyb3JNZXNzYWdlICYmIGhlYWRlciA/IChcbiAgICAgICAgPEV4cGVuc2VTaGVldEhlYWRlckZvcm1cbiAgICAgICAgICBpc0NyZWF0ZU1vZGU9e2lzQ3JlYXRlTW9kZX1cbiAgICAgICAgICBpc0VkaXRpbmc9e2lzRWRpdGluZ31cbiAgICAgICAgICBjYW5FZGl0SGVhZGVyRmllbGRzPXtjYW5FZGl0RXhwZW5zZUJ5TW9kdWxlfVxuICAgICAgICAgIGNhbkVkaXRTdGF0dXM9e2NhbkVkaXRFeHBlbnNlU3RhdHVzfVxuICAgICAgICAgIGhlYWRlcj17aGVhZGVyfVxuICAgICAgICAgIHByb2plY3RWYWx1ZT17cHJvamVjdFZhbHVlfVxuICAgICAgICAgIHZvdWNoZXJWYWx1ZT17dm91Y2hlclZhbHVlfVxuICAgICAgICAgIGlzU2hlZXRQYWlkPXtpc1NoZWV0UGFpZH1cbiAgICAgICAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcz17aXNDdXJyZW5jeUxvY2tlZEJ5TGluZXN9XG4gICAgICAgICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzPXtpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXN9XG4gICAgICAgICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3k9e25vcm1hbGl6ZWREcmFmdEN1cnJlbmN5fVxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeT17ZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5fVxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudD17ZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50fVxuICAgICAgICAgIHNob3dFeGNoYW5nZVJhdGU9e3Nob3dFeGNoYW5nZVJhdGV9XG4gICAgICAgICAgZXhjaGFuZ2VSYXRlVmFsdWU9e2V4Y2hhbmdlUmF0ZVZhbHVlfVxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlPXtleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZX1cbiAgICAgICAgICB0b3RhbEFtb3VudFRleHQ9e3RvdGFsQW1vdW50VGV4dH1cbiAgICAgICAgICBkcmFmdERlc2NyaXB0aW9uPXtkcmFmdERlc2NyaXB0aW9ufVxuICAgICAgICAgIGRyYWZ0UHJvamVjdElkPXtkcmFmdFByb2plY3RJZH1cbiAgICAgICAgICBkcmFmdEN1cnJlbmN5Q29kZT17ZHJhZnRDdXJyZW5jeUNvZGV9XG4gICAgICAgICAgZHJhZnRFeGNoYW5nZVJhdGU9e2RyYWZ0RXhjaGFuZ2VSYXRlfVxuICAgICAgICAgIGRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzPXtkcmFmdEV4cGVuc2VTaGVldFN0YXR1c31cbiAgICAgICAgICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zPXtkcmFmdEVzdGFkb0NvbWVudGFyaW9zfVxuICAgICAgICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWU9e29mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWV9XG4gICAgICAgICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlPXtvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGV9XG4gICAgICAgICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2U9e29mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlfVxuICAgICAgICAgIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZT17c2V0RHJhZnREZXNjcmlwdGlvbn1cbiAgICAgICAgICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlPXtzZXREcmFmdFByb2plY3RJZH1cbiAgICAgICAgICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlPXtzZXREcmFmdEN1cnJlbmN5Q29kZX1cbiAgICAgICAgICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlPXtzZXREcmFmdEV4Y2hhbmdlUmF0ZX1cbiAgICAgICAgICBvbkRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzQ2hhbmdlPXtzZXREcmFmdEV4cGVuc2VTaGVldFN0YXR1c31cbiAgICAgICAgICBvbkRyYWZ0RXN0YWRvQ29tZW50YXJpb3NDaGFuZ2U9e3NldERyYWZ0RXN0YWRvQ29tZW50YXJpb3N9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgeyFpc0NyZWF0ZU1vZGUgJiYgIWlzTG9hZGluZyAmJiAhaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlICYmICFlcnJvck1lc3NhZ2UgPyAoXG4gICAgICAgIDxFeHBlbnNlTGluZXNUaW1lbGluZVxuICAgICAgICAgIHZpc2libGVMaW5lcz17dmlzaWJsZUxpbmVzfVxuICAgICAgICAgIGN1cnJlbmN5Q29kZT17c2FmZVRleHQoaGVhZGVyPy5jdXJyZW5jeUNvZGUpfVxuICAgICAgICAgIHRvdGFsTGluZVBhZ2VzPXt0b3RhbExpbmVQYWdlc31cbiAgICAgICAgICBsaW5lUGFnZT17bGluZVBhZ2V9XG4gICAgICAgICAgbGluZXNMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfTGluZXNcIiwgXCJMaW5lc1wiKX1cbiAgICAgICAgICBlbXB0eVRleHQ9e2luZFQoXCJFeHBlbnNlU2hlZXRzX05vTGluZXNcIiwgXCJObyBsaW5lcyBmb3IgdGhpcyBleHBlbnNlIHNoZWV0LlwiKX1cbiAgICAgICAgICBwYWdpbmF0aW9uTGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxuICAgICAgICAgIGNvbnRhaW5lclJlZj17bGluZUNvbnRhaW5lclJlZn1cbiAgICAgICAgICBvbkxpbmVQYWdlQ2hhbmdlPXtzZXRMaW5lUGFnZX1cbiAgICAgICAgICBvbk9wZW5MaW5lPXtuYXZpZ2F0ZVRvTGluZURldGFpbH1cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7Y2FuQ3JlYXRlRXhwZW5zZSAmJiAhaXNDcmVhdGVNb2RlICYmICFpc1NoZWV0TG9ja2VkID8gKFxuICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b25cbiAgICAgICAgICBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgcmFwaWRhc1wiKX1cbiAgICAgICAgICBzaXplPXs3Nn1cbiAgICAgICAgICByaWdodD17MTZ9XG4gICAgICAgICAgYm90dG9tPXsyNH1cbiAgICAgICAgICBtZW51QXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfQWN0aW9uc1wiLCBcIkFjY2lvbmVzIHJhcGlkYXNcIil9XG4gICAgICAgICAgbWVudUl0ZW1zPXtmYWJNZW51SXRlbXN9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbi8vIE1haW4gcGFnZSBlbnRyeSBmb3IgZXhwZW5zZSBzaGVldCBkZXRhaWwuXG5jb25zdCBFeHBlbnNlU2hlZXREZXRhaWxQYWdlID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgICAgIDxFeHBlbnNlU2hlZXREZXRhaWxQYWdlQ29udGVudCAvPlxuICAgIDwvVmlzaXRhc1BhZ2VQcm92aWRlcnM+XG4gICk7XG59O1xuXG5jb25zdCBtb3VudCA9ICgpID0+IHtcbiAgYm9vdHN0cmFwRXhwZW5zZUFwaUF1dGgoKTtcbiAgY29uc3Qgcm9vdEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJleHBlbnNlLXNoZWV0LWRldGFpbC1yb290XCIpO1xuICBpZiAoIXJvb3RFbCkgcmV0dXJuO1xuICBtb3VudFJlYWN0SXNsYW5kKHJvb3RFbCwgPEV4cGVuc2VTaGVldERldGFpbFBhZ2UgLz4pO1xufTtcblxubW91bnRXaGVuRG9jdW1lbnRSZWFkeShtb3VudCk7XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldERldGFpbFBhZ2U7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaW5kRm9ybWF0LCBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0SGVhZGVyIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQgZnJvbSBcIi4vRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dC50c3hcIjtcbmltcG9ydCBFeHBlbnNlUmVhZE9ubHlGaWVsZCBmcm9tIFwiLi9FeHBlbnNlUmVhZE9ubHlGaWVsZC50c3hcIjtcbmltcG9ydCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QgZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0LnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uIGZyb20gXCIuL0V4cGVuc2VDdXJyZW5jeUZsYWdJY29uLnRzeFwiO1xuaW1wb3J0IEluZm9Qb3BvdmVySWNvbkJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0luZm9Qb3BvdmVySWNvbkJ1dHRvbi50c3hcIjtcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZVNoZWV0U3RhdHVzT3B0aW9ucywgZ2V0RXhwZW5zZVN0YXR1c0xhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlU3RhdHVzQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhjaGFuZ2VSYXRlRW50cnlNb2RlQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyLCBmb3JtYXRFeHBlbnNlTnVtYmVyLCBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xuXG50eXBlIEV4cGVuc2VTaGVldEhlYWRlckZvcm1Qcm9wcyA9IHtcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xuICBpc0VkaXRpbmc6IGJvb2xlYW47XG4gIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGJvb2xlYW47XG4gIGNhbkVkaXRTdGF0dXM6IGJvb2xlYW47XG4gIGhlYWRlcjogRXhwZW5zZVNoZWV0SGVhZGVyO1xuICBwcm9qZWN0VmFsdWU6IHN0cmluZztcbiAgdm91Y2hlclZhbHVlOiBzdHJpbmc7XG4gIGlzU2hlZXRQYWlkOiBib29sZWFuO1xuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogYm9vbGVhbjtcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xuICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeTogc3RyaW5nO1xuICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k6IHN0cmluZztcbiAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50OiBudW1iZXI7XG4gIHNob3dFeGNoYW5nZVJhdGU6IGJvb2xlYW47XG4gIGV4Y2hhbmdlUmF0ZVZhbHVlOiBzdHJpbmc7XG4gIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlOiBzdHJpbmc7XG4gIHRvdGFsQW1vdW50VGV4dDogc3RyaW5nO1xuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGRyYWZ0UHJvamVjdElkOiBzdHJpbmc7XG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGRyYWZ0RXhjaGFuZ2VSYXRlOiBzdHJpbmc7XG4gIGRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzOiBudW1iZXI7XG4gIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3M6IHN0cmluZztcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZTogc3RyaW5nO1xuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGU6IHN0cmluZztcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2U6IHN0cmluZztcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdFByb2plY3RJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdEV4cGVuc2VTaGVldFN0YXR1c0NoYW5nZTogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQ7XG4gIG9uRHJhZnRFc3RhZG9Db21lbnRhcmlvc0NoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG59O1xuXG5jb25zdCBFWENIQU5HRV9SQVRFX01PREVfUFJFRklYX1BBVFRFUk4gPSAvXlRcXC4/Q1xcLj9cXHMqL2k7XG5cbi8vIFB1cmUgcHJlc2VudGF0aW9uYWwgaGVhZGVyIGZvcm0gZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsL2NyZWF0ZSBzY3JlZW5zLlxuY29uc3QgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybSA9ICh7XG4gIGlzQ3JlYXRlTW9kZSxcbiAgaXNFZGl0aW5nLFxuICBjYW5FZGl0SGVhZGVyRmllbGRzLFxuICBjYW5FZGl0U3RhdHVzLFxuICBoZWFkZXIsXG4gIHByb2plY3RWYWx1ZSxcbiAgdm91Y2hlclZhbHVlLFxuICBpc1NoZWV0UGFpZCxcbiAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXG4gIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcbiAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXG4gIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LFxuICBzaG93RXhjaGFuZ2VSYXRlLFxuICBleGNoYW5nZVJhdGVWYWx1ZSxcbiAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXG4gIHRvdGFsQW1vdW50VGV4dCxcbiAgZHJhZnREZXNjcmlwdGlvbixcbiAgZHJhZnRQcm9qZWN0SWQsXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICBkcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgZHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSxcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZSxcbiAgb25EcmFmdFByb2plY3RJZENoYW5nZSxcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZSxcbiAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZSxcbiAgb25EcmFmdEV4cGVuc2VTaGVldFN0YXR1c0NoYW5nZSxcbiAgb25EcmFmdEVzdGFkb0NvbWVudGFyaW9zQ2hhbmdlLFxufTogRXhwZW5zZVNoZWV0SGVhZGVyRm9ybVByb3BzKSA9PiB7XG4gIGNvbnN0IGlzRm9yZWlnbkN1cnJlbmN5ID1cbiAgICBpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkcyAmJiBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSAhPT0gXCJcIiAmJiBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSAhPT0gZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5O1xuICBjb25zdCBleHBlbnNlQ3VycmVuY3lMYWJlbCA9IGlzRm9yZWlnbkN1cnJlbmN5XG4gICAgPyBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9FeHBlbnNlQ3VycmVuY3lcIiwgXCJFeHBlbnNlIGN1cnJlbmN5XCIpXG4gICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpO1xuICBjb25zdCBzdGF0dXNWYWx1ZSA9XG4gICAgaGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gbnVsbCB8fCBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzID09PSB1bmRlZmluZWRcbiAgICAgID8gXCItXCJcbiAgICAgIDogZ2V0RXhwZW5zZVN0YXR1c0xhYmVsKGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMpO1xuICBjb25zdCBoZWFkZXJDdXJyZW5jeUNvZGUgPSBzYWZlVGV4dChoZWFkZXIuY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBiYXNlQ3VycmVuY3lDb2RlID0gc2FmZVRleHQoZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBzdGF0dXNPcHRpb25zID0gUmVhY3QudXNlTWVtbygoKSA9PiBnZXRFeHBlbnNlU2hlZXRTdGF0dXNPcHRpb25zKCksIFtdKTtcbiAgY29uc3Qgc3RhdHVzRHJhZnRWYWx1ZSA9IFN0cmluZyhOdW1iZXIuaXNJbnRlZ2VyKGRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzKSA/IGRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzIDogMCk7XG4gIGNvbnN0IHN0YXR1c0NvbW1lbnRWYWx1ZSA9IHNhZmVUZXh0KGhlYWRlci5lc3RhZG9Db21lbnRhcmlvcyk7XG4gIGNvbnN0IHNob3dTdGF0dXNDb21tZW50RmllbGQgPSAhaXNDcmVhdGVNb2RlICYmICgoaXNFZGl0aW5nICYmIGNhbkVkaXRTdGF0dXMpIHx8ICEhc3RhdHVzQ29tbWVudFZhbHVlKTtcbiAgY29uc3QgbG9jYWxDdXJyZW5jeU9wdGlvbnMgPSBSZWFjdC51c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oXG4gICAgKCkgPT4gW1xuICAgICAge1xuICAgICAgICB2YWx1ZTogYmFzZUN1cnJlbmN5Q29kZSxcbiAgICAgICAgdGV4dDogYmFzZUN1cnJlbmN5Q29kZSxcbiAgICAgICAgaWNvbjogPEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uIGN1cnJlbmN5Q29kZT17YmFzZUN1cnJlbmN5Q29kZX0gc2l6ZUNsYXNzTmFtZT1cImgtNiB3LTZcIiAvPixcbiAgICAgIH0sXG4gICAgXSxcbiAgICBbYmFzZUN1cnJlbmN5Q29kZV1cbiAgKTtcbiAgY29uc3QgaGVhZGVyQ3VycmVuY3lPcHRpb25zID0gUmVhY3QudXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KFxuICAgICgpID0+IFtcbiAgICAgIHtcbiAgICAgICAgdmFsdWU6IGhlYWRlckN1cnJlbmN5Q29kZSB8fCBcIi1cIixcbiAgICAgICAgdGV4dDogaGVhZGVyQ3VycmVuY3lDb2RlIHx8IFwiLVwiLFxuICAgICAgICBpY29uOiA8RXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gY3VycmVuY3lDb2RlPXtoZWFkZXJDdXJyZW5jeUNvZGUgfHwgXCItXCJ9IHNpemVDbGFzc05hbWU9XCJoLTYgdy02XCIgLz4sXG4gICAgICB9LFxuICAgIF0sXG4gICAgW2hlYWRlckN1cnJlbmN5Q29kZV1cbiAgKTtcbiAgY29uc3QgcGFyc2VkRHJhZnRFeGNoYW5nZVJhdGUgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQoZHJhZnRFeGNoYW5nZVJhdGUpO1xuICBjb25zdCBwYXJzZWRPZmZpY2lhbFJhd1JhdGUgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQob2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSk7XG4gIGNvbnN0IGJhc2VFeGNoYW5nZVJhdGVWYWx1ZSA9XG4gICAgcGFyc2VkRHJhZnRFeGNoYW5nZVJhdGUgIT0gbnVsbFxuICAgICAgPyBwYXJzZWREcmFmdEV4Y2hhbmdlUmF0ZVxuICAgICAgOiBwYXJzZWRPZmZpY2lhbFJhd1JhdGUgIT0gbnVsbFxuICAgICAgICA/IHBhcnNlZE9mZmljaWFsUmF3UmF0ZSAqIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudFxuICAgICAgICA6IG51bGw7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZUluZm9WYWx1ZSA9IGZvcm1hdEV4cGVuc2VOdW1iZXIoXG4gICAgYmFzZUV4Y2hhbmdlUmF0ZVZhbHVlICE9IG51bGwgPyBiYXNlRXhjaGFuZ2VSYXRlVmFsdWUgLyBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQgOiBudWxsLFxuICAgIHtcbiAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogNyxcbiAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogNyxcbiAgICAgIHVzZUdyb3VwaW5nOiBmYWxzZSxcbiAgICAgIGZhbGxiYWNrOiBcIjAuMDAwMDAwMFwiLFxuICAgIH1cbiAgKTtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlTW9kZVZhbHVlID0gTnVtYmVyKGhlYWRlci5leGNoYW5nZVJhdGVNb2RlKSA9PT0gMSA/IDEgOiAwO1xuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlS2V5ID1cbiAgICBleGNoYW5nZVJhdGVNb2RlVmFsdWUgPT09IDFcbiAgICAgID8gXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX01hbnVhbFwiXG4gICAgICA6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9PZmZpY2lhbFwiO1xuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlRmFsbGJhY2sgPSBleGNoYW5nZVJhdGVNb2RlVmFsdWUgPT09IDEgPyBcIlQuQy4gTWFudWFsXCIgOiBcIlQuQy4gT2ZpY2lhbFwiO1xuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlTGFiZWwgPVxuICAgIChnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsKGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSkgfHwgaW5kVChleGNoYW5nZVJhdGVNb2RlS2V5LCBleGNoYW5nZVJhdGVNb2RlRmFsbGJhY2spKVxuICAgICAgLnJlcGxhY2UoRVhDSEFOR0VfUkFURV9NT0RFX1BSRUZJWF9QQVRURVJOLCBcIlwiKVxuICAgICAgLnRyaW0oKVxuICAgICAgLnRvTG93ZXJDYXNlKCkgfHwgKGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSA9PT0gMSA/IFwibWFudWFsXCIgOiBcIm9maWNpYWxcIik7XG4gIGNvbnN0IGhhc0VuZHBvaW50RXhjaGFuZ2VSYXRlRGF0YSA9XG4gICAgISFzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKSB8fCAhIXNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSkgfHwgISFzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSk7XG4gIGNvbnN0IGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb0RhdGUgPSBzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUpIHx8IGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xuICBjb25zdCBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9Tb3VyY2UgPSBzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSlcbiAgICAucmVwbGFjZSgvXFxzKlxcKFteKCldKlxcKVxccyovZywgXCIgXCIpXG4gICAgLnJlcGxhY2UoL1xcc3syLH0vZywgXCIgXCIpXG4gICAgLnRyaW0oKSB8fCBpbmRUKFwiQ29tbW9uX05vdEF2YWlsYWJsZVwiLCBcIk4vQVwiKTtcbiAgY29uc3QgZW5kcG9pbnRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZSA9IGluZEZvcm1hdChcbiAgICBcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX0luZm9Qb3BvdmVyX0RldGFpbFwiLFxuICAgIFwiVGlwbyBkZSBjYW1iaW8gb2J0ZW5pZG8gezB9XFxuRmVjaGE6IHsxfVxcbk9yaWdlbjogezJ9XCIsXG4gICAgc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSkgfHwgXCIwLjAwMDAwMDBcIixcbiAgICBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9EYXRlLFxuICAgIGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb1NvdXJjZVxuICApO1xuICBjb25zdCBzdG9yZWRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZSA9IGluZEZvcm1hdChcbiAgICBcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX0luZm9Qb3BvdmVyX1N0b3JlZFwiLFxuICAgIFwiVGlwbyBkZSBjYW1iaW8gezB9IHsxfVwiLFxuICAgIGV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCxcbiAgICBleGNoYW5nZVJhdGVJbmZvVmFsdWVcbiAgKTtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UgPSBoYXNFbmRwb2ludEV4Y2hhbmdlUmF0ZURhdGEgPyBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlIDogc3RvcmVkRXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2U7XG5cbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCI+XG4gICAgICAgIHshaXNDcmVhdGVNb2RlID8gKFxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1NoZWV0SWRcIiwgXCJFeHBlbnNlIHNoZWV0IGNvZGVcIil9XG4gICAgICAgICAgICB2YWx1ZT17c2FmZVRleHQoaGVhZGVyLmhvamFHYXN0b3NJZCkgfHwgXCItXCJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHshaXNDcmVhdGVNb2RlID8gKFxuICAgICAgICAgIGlzRWRpdGluZyAmJiBjYW5FZGl0U3RhdHVzID8gKFxuICAgICAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TdGF0dXNcIiwgXCJTdGF0dXNcIil9XG4gICAgICAgICAgICAgIG9wdGlvbnM9e3N0YXR1c09wdGlvbnN9XG4gICAgICAgICAgICAgIHZhbHVlPXtzdGF0dXNEcmFmdFZhbHVlfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IE51bWJlcihuZXh0VmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgJiYgcGFyc2VkID49IDApIHtcbiAgICAgICAgICAgICAgICAgIG9uRHJhZnRFeHBlbnNlU2hlZXRTdGF0dXNDaGFuZ2UocGFyc2VkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TdGF0dXNcIiwgXCJTdGF0dXNcIil9XG4gICAgICAgICAgICAgIGVtaXRPblZhbHVlQ2hhbmdlXG4gICAgICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgICAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS1oZWFkZXItc3RhdHVzXCJcbiAgICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzXCIsIFwiU3RhdHVzXCIpfSB2YWx1ZT17c3RhdHVzVmFsdWV9IC8+XG4gICAgICAgICAgKVxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge3Nob3dTdGF0dXNDb21tZW50RmllbGQgPyAoXG4gICAgICAgICAgaXNFZGl0aW5nICYmIGNhbkVkaXRTdGF0dXMgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1kOmNvbC1zcGFuLTIgc3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TdGF0dXNDb21tZW50XCIsIFwiU3RhdHVzIGNvbW1lbnRcIil9PC9sYWJlbD5cbiAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIHJlc2l6ZS1ub25lXCJcbiAgICAgICAgICAgICAgICByb3dzPXszfVxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdEVzdGFkb0NvbWVudGFyaW9zfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnRFc3RhZG9Db21lbnRhcmlvc0NoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzQ29tbWVudFwiLCBcIlN0YXR1cyBjb21tZW50XCIpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzQ29tbWVudFwiLCBcIlN0YXR1cyBjb21tZW50XCIpfVxuICAgICAgICAgICAgICB2YWx1ZT17c3RhdHVzQ29tbWVudFZhbHVlIHx8IFwiLVwifVxuICAgICAgICAgICAgICBmdWxsV2lkdGhcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKVxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge2lzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfTwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0RGVzY3JpcHRpb259XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XG4gICAgICAgICAgICB2YWx1ZT17c2FmZVRleHQoaGVhZGVyLmRlc2NyaXB0aW9uKSB8fCBcIi1cIn1cbiAgICAgICAgICAgIGZ1bGxXaWR0aFxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIHtpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkcyA/IChcbiAgICAgICAgICA8RXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9Qcm9qZWN0X1BsYWNlaG9sZGVyXCIsIFwiUHJvamVjdCBpZFwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtkcmFmdFByb2plY3RJZH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0UHJvamVjdElkQ2hhbmdlfVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmcgfHwgIWNhbkVkaXRIZWFkZXJGaWVsZHN9XG4gICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZyB8fCAhY2FuRWRpdEhlYWRlckZpZWxkc31cbiAgICAgICAgICAvPlxuICAgICAgICApIDogcHJvamVjdFZhbHVlID8gKFxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9IHZhbHVlPXtwcm9qZWN0VmFsdWV9IC8+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7IWlzRWRpdGluZyAmJiBpc1NoZWV0UGFpZCA/IChcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1ZvdWNoZXJcIiwgXCJWb3VjaGVyXCIpfSB2YWx1ZT17dm91Y2hlclZhbHVlIHx8IFwiLVwifSAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge2lzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZ3JpZCBnYXAtNCAke2lzRm9yZWlnbkN1cnJlbmN5ID8gXCJncmlkLWNvbHMtMlwiIDogXCJncmlkLWNvbHMtMVwifWAudHJpbSgpfT5cbiAgICAgICAgICAgICAge2lzRm9yZWlnbkN1cnJlbmN5ID8gKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57ZXhwZW5zZUN1cnJlbmN5TGFiZWx9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXtleHBlbnNlQ3VycmVuY3lMYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5X1BsYWNlaG9sZGVyXCIsIFwiQ3VycmVuY3kgY29kZVwiKX1cbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRDdXJyZW5jeUNvZGV9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmcgfHwgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXN9XG4gICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmcgfHwgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXN9XG4gICAgICAgICAgICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLWhlYWRlci1jdXJyZW5jeVwiXG4gICAgICAgICAgICAgICAgICAgICAgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHRcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBwci04IGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhjaGFuZ2VSYXRlXCIsIFwiRXhjaGFuZ2UgcmF0ZVwiKX08L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8SW5mb1BvcG92ZXJJY29uQnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfSW5mb1BvcG92ZXJfQXJpYVwiLCBcIlNob3cgZXhjaGFuZ2UgcmF0ZSBpbmZvcm1hdGlvblwiKX1cbiAgICAgICAgICAgICAgICAgICAgICBjb250ZW50PXtleGNoYW5nZVJhdGVJbmZvTWVzc2FnZX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSByaWdodC0wIC10b3AtMSB6LTIwXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvcm0tY29udHJvbCAke2V4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlID8gXCJib3JkZXItZGFuZ2VyIHJpbmctMSByaW5nLWRhbmdlclwiIDogXCJcIn0gJHtpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJcIn1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRNb2RlPVwiZGVjaW1hbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZHJhZnRFeGNoYW5nZVJhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cj17KGV2ZW50KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcihldmVudC50YXJnZXQudmFsdWUsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogNyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogNyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsbGJhY2s6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhjaGFuZ2VSYXRlXCIsIFwiRXhjaGFuZ2UgcmF0ZVwiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9FeGNoYW5nZVJhdGVcIiwgXCJFeGNoYW5nZSByYXRlXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9e2lzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lc31cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXN9XG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8RXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0XG4gICAgICAgICAgICAgICAgICBsYWJlbD17ZXhwZW5zZUN1cnJlbmN5TGFiZWx9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5X1BsYWNlaG9sZGVyXCIsIFwiQ3VycmVuY3kgY29kZVwiKX1cbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdEN1cnJlbmN5Q29kZX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmcgfHwgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXN9XG4gICAgICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZyB8fCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cbiAgICAgICAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtaGVhZGVyLWN1cnJlbmN5XCJcbiAgICAgICAgICAgICAgICAgIHByZWZlckRlZmF1bHRDdXJyZW5jeUZyb21Db250ZXh0XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7aXNGb3JlaWduQ3VycmVuY3kgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtNFwiPlxuICAgICAgICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0xvY2FsQ3VycmVuY3lcIiwgXCJMb2NhbCBjdXJyZW5jeVwiKX1cbiAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e2xvY2FsQ3VycmVuY3lPcHRpb25zfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2Jhc2VDdXJyZW5jeUNvZGV9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KCkgPT4gdW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeV9QbGFjZWhvbGRlclwiLCBcIkN1cnJlbmN5IGNvZGVcIil9XG4gICAgICAgICAgICAgICAgICByZWFkT25seVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWRcbiAgICAgICAgICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgICAgICAgICAgICAgIHNob3dTZWFyY2hCdXR0b249e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgc2hvd0xhYmVsXG4gICAgICAgICAgICAgICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRUZXh0TW9kZT1cInZhbHVlXCJcbiAgICAgICAgICAgICAgICAgIGRyb3Bkb3duTWF4SGVpZ2h0Q2xhc3M9XCJtYXgtaC05NlwiXG4gICAgICAgICAgICAgICAgICBzZWxlY3RlZEljb25DbGFzc05hbWU9XCJoLTYgdy02XCJcbiAgICAgICAgICAgICAgICAgIG9wdGlvbkljb25DbGFzc05hbWU9XCJoLTYgdy02XCJcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSW5wdXRQYWRkaW5nQ2xhc3NOYW1lPVwicGwtMTJcIlxuICAgICAgICAgICAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS1oZWFkZXItbG9jYWwtY3VycmVuY3lcIlxuICAgICAgICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgICAgICAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIj57aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQW1vdW50XCIsIFwiQW1vdW50XCIpfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIGluZC1yZWFkb25seS1maWVsZFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtmb3JtYXRFeHBlbnNlTnVtYmVyKGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudCwge1xuICAgICAgICAgICAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogNyxcbiAgICAgICAgICAgICAgICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDcsXG4gICAgICAgICAgICAgICAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgZmFsbGJhY2s6IFwiLVwiLFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQW1vdW50XCIsIFwiQW1vdW50XCIpfVxuICAgICAgICAgICAgICAgICAgICByZWFkT25seVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZFxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgICAge2lzRm9yZWlnbkN1cnJlbmN5ICYmIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlID8gPHAgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXIgdGV4dC1zbVwiPntleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZX08L3A+IDogbnVsbH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgb3B0aW9ucz17aGVhZGVyQ3VycmVuY3lPcHRpb25zfVxuICAgICAgICAgICAgdmFsdWU9e2hlYWRlckN1cnJlbmN5Q29kZSB8fCBcIi1cIn1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiB1bmRlZmluZWR9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5X1BsYWNlaG9sZGVyXCIsIFwiQ3VycmVuY3kgY29kZVwiKX1cbiAgICAgICAgICAgIHJlYWRPbmx5XG4gICAgICAgICAgICBkaXNhYmxlZFxuICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxuICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XG4gICAgICAgICAgICBzaG93TGFiZWxcbiAgICAgICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XG4gICAgICAgICAgICBzZWxlY3RlZFRleHRNb2RlPVwidmFsdWVcIlxuICAgICAgICAgICAgZHJvcGRvd25NYXhIZWlnaHRDbGFzcz1cIm1heC1oLTk2XCJcbiAgICAgICAgICAgIHNlbGVjdGVkSWNvbkNsYXNzTmFtZT1cImgtNiB3LTZcIlxuICAgICAgICAgICAgb3B0aW9uSWNvbkNsYXNzTmFtZT1cImgtNiB3LTZcIlxuICAgICAgICAgICAgc2VsZWN0ZWRJbnB1dFBhZGRpbmdDbGFzc05hbWU9XCJwbC0xMlwiXG4gICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLWhlYWRlci1jdXJyZW5jeS1yZWFkb25seVwiXG4gICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIHshaXNFZGl0aW5nICYmIHNob3dFeGNoYW5nZVJhdGUgPyAoXG4gICAgICAgICAgPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9FeGNoYW5nZVJhdGVcIiwgXCJFeGNoYW5nZSByYXRlXCIpfSB2YWx1ZT17ZXhjaGFuZ2VSYXRlVmFsdWV9IC8+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7IWlzQ3JlYXRlTW9kZSA/IDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfVG90YWxBbW91bnRcIiwgXCJUb3RhbCBhbW91bnRcIil9IHZhbHVlPXt0b3RhbEFtb3VudFRleHR9IC8+IDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VTaGVldEhlYWRlckZvcm07XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZUxheW91dEVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSBcInJlYWN0LWRvbVwiO1xuaW1wb3J0IHsgdXNlT3V0c2lkZUNsaWNrIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZU91dHNpZGVDbGljay50c1wiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5cbnR5cGUgSW5mb1BvcG92ZXJJY29uQnV0dG9uUHJvcHMgPSB7XG4gIGNvbnRlbnQ6IFJlYWN0LlJlYWN0Tm9kZTtcbiAgYXJpYUxhYmVsOiBzdHJpbmc7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XG59O1xuXG4vLyBTaGFyZWQgZHVtYiBwb3BvdmVyIHRyaWdnZXIgdXNlZCB0byBkaXNwbGF5IHNob3J0IGNvbnRleHR1YWwgaW5mby5cbmNvbnN0IEluZm9Qb3BvdmVySWNvbkJ1dHRvbiA9ICh7XG4gIGNvbnRlbnQsXG4gIGFyaWFMYWJlbCxcbiAgY2xhc3NOYW1lID0gXCJcIixcbiAgcGFuZWxDbGFzc05hbWUgPSBcIlwiLFxufTogSW5mb1BvcG92ZXJJY29uQnV0dG9uUHJvcHMpID0+IHtcbiAgY29uc3QgSE9SSVpPTlRBTF9WSUVXUE9SVF9HVVRURVJfUFggPSA4O1xuICBjb25zdCBWRVJUSUNBTF9WSUVXUE9SVF9HVVRURVJfUFggPSA4O1xuICBjb25zdCBQQU5FTF9UUklHR0VSX0dBUF9QWCA9IDY7XG4gIGNvbnN0IEdMT0JBTF9SQURJVVMgPSBcInZhcigtLXJhZGl1cy14bCwgNXB4KVwiO1xuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcGFuZWxTdHlsZSwgc2V0UGFuZWxTdHlsZV0gPSB1c2VTdGF0ZTxSZWFjdC5DU1NQcm9wZXJ0aWVzPih7XG4gICAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgICB0b3A6IDAsXG4gICAgbGVmdDogMCxcbiAgICB2aXNpYmlsaXR5OiBcImhpZGRlblwiLFxuICB9KTtcbiAgY29uc3QgYnV0dG9uUmVmID0gdXNlUmVmPEhUTUxCdXR0b25FbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHBhbmVsUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgdXNlT3V0c2lkZUNsaWNrKFtidXR0b25SZWYsIHBhbmVsUmVmXSwgKCkgPT4gc2V0SXNPcGVuKGZhbHNlKSk7XG4gIGNvbnN0IHVwZGF0ZVBhbmVsUG9zaXRpb24gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBidXR0b25FbGVtZW50ID0gYnV0dG9uUmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgcGFuZWxFbGVtZW50ID0gcGFuZWxSZWYuY3VycmVudDtcbiAgICBpZiAoIWJ1dHRvbkVsZW1lbnQgfHwgIXBhbmVsRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGJ1dHRvblJlY3QgPSBidXR0b25FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHBhbmVsUmVjdCA9IHBhbmVsRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB2aWV3cG9ydFdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgY29uc3Qgdmlld3BvcnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgY29uc3Qgc2FmZVdpZHRoID0gTWF0aC5taW4ocGFuZWxSZWN0LndpZHRoLCBNYXRoLm1heCgxODAsIHZpZXdwb3J0V2lkdGggLSBIT1JJWk9OVEFMX1ZJRVdQT1JUX0dVVFRFUl9QWCAqIDIpKTtcblxuICAgIGxldCBsZWZ0ID0gYnV0dG9uUmVjdC5sZWZ0ICsgYnV0dG9uUmVjdC53aWR0aCAvIDIgLSBzYWZlV2lkdGggLyAyO1xuICAgIGxlZnQgPSBNYXRoLm1heChIT1JJWk9OVEFMX1ZJRVdQT1JUX0dVVFRFUl9QWCwgTWF0aC5taW4obGVmdCwgdmlld3BvcnRXaWR0aCAtIHNhZmVXaWR0aCAtIEhPUklaT05UQUxfVklFV1BPUlRfR1VUVEVSX1BYKSk7XG5cbiAgICBsZXQgdG9wID0gYnV0dG9uUmVjdC5ib3R0b20gKyBQQU5FTF9UUklHR0VSX0dBUF9QWDtcbiAgICBjb25zdCBoYXNCb3R0b21PdmVyZmxvdyA9IHRvcCArIHBhbmVsUmVjdC5oZWlnaHQgKyBWRVJUSUNBTF9WSUVXUE9SVF9HVVRURVJfUFggPiB2aWV3cG9ydEhlaWdodDtcbiAgICBpZiAoaGFzQm90dG9tT3ZlcmZsb3cpIHtcbiAgICAgIGNvbnN0IHRvcEFib3ZlVHJpZ2dlciA9IGJ1dHRvblJlY3QudG9wIC0gcGFuZWxSZWN0LmhlaWdodCAtIFBBTkVMX1RSSUdHRVJfR0FQX1BYO1xuICAgICAgdG9wID0gdG9wQWJvdmVUcmlnZ2VyID49IFZFUlRJQ0FMX1ZJRVdQT1JUX0dVVFRFUl9QWFxuICAgICAgICA/IHRvcEFib3ZlVHJpZ2dlclxuICAgICAgICA6IE1hdGgubWF4KFZFUlRJQ0FMX1ZJRVdQT1JUX0dVVFRFUl9QWCwgdmlld3BvcnRIZWlnaHQgLSBwYW5lbFJlY3QuaGVpZ2h0IC0gVkVSVElDQUxfVklFV1BPUlRfR1VUVEVSX1BYKTtcbiAgICB9XG5cbiAgICBzZXRQYW5lbFN0eWxlKHtcbiAgICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXG4gICAgICB0b3A6IE1hdGgucm91bmQodG9wKSxcbiAgICAgIGxlZnQ6IE1hdGgucm91bmQobGVmdCksXG4gICAgICB3aWR0aDogTWF0aC5yb3VuZChzYWZlV2lkdGgpLFxuICAgICAgdmlzaWJpbGl0eTogXCJ2aXNpYmxlXCIsXG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNPcGVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHVwZGF0ZVBhbmVsUG9zaXRpb24oKTtcbiAgfSwgW2lzT3BlbiwgY29udGVudCwgdXBkYXRlUGFuZWxQb3NpdGlvbl0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc09wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaGFuZGxlVmlld3BvcnRDaGFuZ2UgPSAoKSA9PiB1cGRhdGVQYW5lbFBvc2l0aW9uKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgaGFuZGxlVmlld3BvcnRDaGFuZ2UpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhhbmRsZVZpZXdwb3J0Q2hhbmdlLCB0cnVlKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgaGFuZGxlVmlld3BvcnRDaGFuZ2UpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlVmlld3BvcnRDaGFuZ2UsIHRydWUpO1xuICAgIH07XG4gIH0sIFtpc09wZW4sIHVwZGF0ZVBhbmVsUG9zaXRpb25dKTtcblxuICBjb25zdCBwb3J0YWxUYXJnZXQgPSB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIgPyBudWxsIDogZG9jdW1lbnQuYm9keTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiaW5saW5lLWZsZXhcIiwgY2xhc3NOYW1lKX0+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHJlZj17YnV0dG9uUmVmfVxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsfVxuICAgICAgICBhcmlhLWV4cGFuZGVkPXtpc09wZW59XG4gICAgICAgIGFyaWEtaGFzcG9wdXA9XCJkaWFsb2dcIlxuICAgICAgICBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBoLTYgdy02IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXRyYW5zcGFyZW50IGJnLXRyYW5zcGFyZW50IHAtMCB0ZXh0LXNsYXRlLTUwMCB0cmFuc2l0aW9uIGhvdmVyOnRleHQtcHJpbWFyeSBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5LzMwXCJcbiAgICAgICAgc3R5bGU9e3sgYm9yZGVyUmFkaXVzOiBHTE9CQUxfUkFESVVTIH19XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzT3BlbigocHJldmlvdXMpID0+ICFwcmV2aW91cyl9XG4gICAgICA+XG4gICAgICAgIDxzdmdcbiAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgICB3aWR0aD1cIjIwXCJcbiAgICAgICAgICBoZWlnaHQ9XCIyMFwiXG4gICAgICAgICAgdmlld0JveD1cIjMgMyAxOCAxOFwiXG4gICAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgIHN0cm9rZT1cIiM2NDc0OGJcIlxuICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMS43NVwiXG4gICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcbiAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcbiAgICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImJsb2NrXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxyZWN0IHg9XCI0XCIgeT1cIjRcIiB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTZcIiByeD1cIjNcIiByeT1cIjNcIiAvPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTIgOWguMDFcIiAvPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNMTEgMTJoMXY0aDFcIiAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvYnV0dG9uPlxuXG4gICAgICB7aXNPcGVuICYmIHBvcnRhbFRhcmdldFxuICAgICAgICA/IGNyZWF0ZVBvcnRhbChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgcmVmPXtwYW5lbFJlZn1cbiAgICAgICAgICAgICAgcm9sZT1cImRpYWxvZ1wiXG4gICAgICAgICAgICAgIHN0eWxlPXt7IC4uLnBhbmVsU3R5bGUsIGJvcmRlclJhZGl1czogR0xPQkFMX1JBRElVUyB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgXCJ6LTM2MDAwMCBtaW4tdy1bMjIwcHhdIG1heC13LVtjYWxjKDEwMHZ3LTFyZW0pXSByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZSBwLTMgc2hhZG93LWxnXCIsXG4gICAgICAgICAgICAgICAgcGFuZWxDbGFzc05hbWVcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTJweF0gdGV4dC1zbGF0ZS03MDAgd2hpdGVzcGFjZS1wcmUtbGluZVwiPntjb250ZW50fTwvcD5cbiAgICAgICAgICAgIDwvZGl2PixcbiAgICAgICAgICAgIHBvcnRhbFRhcmdldFxuICAgICAgICAgIClcbiAgICAgICAgOiBudWxsfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSW5mb1BvcG92ZXJJY29uQnV0dG9uO1xuIiwgImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcblxudHlwZSBFeGNoYW5nZVJhdGVNb2RlVWlNZXRhID0ge1xuICBsYWJlbEtleTogc3RyaW5nO1xuICBmYWxsYmFjazogc3RyaW5nO1xufTtcblxuY29uc3QgRVhDSEFOR0VfUkFURV9NT0RFX01FVEE6IFJlY29yZDxFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNvZGUsIEV4Y2hhbmdlUmF0ZU1vZGVVaU1ldGE+ID0ge1xuICAwOiB7XG4gICAgbGFiZWxLZXk6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9PZmZpY2lhbFwiLFxuICAgIGZhbGxiYWNrOiBcIlQuQy4gT2ZpY2lhbFwiLFxuICB9LFxuICAxOiB7XG4gICAgbGFiZWxLZXk6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9NYW51YWxcIixcbiAgICBmYWxsYmFjazogXCJULkMuIE1hbnVhbFwiLFxuICB9LFxufTtcbmNvbnN0IEVYQ0hBTkdFX1JBVEVfTU9ERV9DT0RFUzogRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVDb2RlW10gPSBbMCwgMV07XG5cbi8vIEtlZXBzIGV4Y2hhbmdlIHJhdGUgbW9kZSB2YWx1ZXMgY29uc3RyYWluZWQgdG8gbnVtZXJpYyAwIG9yIDEuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNvZGUgfCBudWxsID0+IHtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgaWYgKHBhcnNlZCA9PT0gMCB8fCBwYXJzZWQgPT09IDEpIHtcbiAgICByZXR1cm4gcGFyc2VkO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuLy8gQnVpbGRzIGZpeGVkIG9wdGlvbnMgZm9yIHRoZSBleGNoYW5nZSByYXRlIG1vZGUgZmlsdGVyLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlT3B0aW9ucyA9ICgpOiBFeHBlbnNlU2VsZWN0T3B0aW9uW10gPT4ge1xuICByZXR1cm4gRVhDSEFOR0VfUkFURV9NT0RFX0NPREVTXG4gICAgLm1hcCgoY29kZSkgPT4ge1xuICAgICAgY29uc3QgbWV0YSA9IEVYQ0hBTkdFX1JBVEVfTU9ERV9NRVRBW2NvZGVdO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IFN0cmluZyhjb2RlKSxcbiAgICAgICAgdGV4dDogaW5kVChtZXRhLmxhYmVsS2V5LCBtZXRhLmZhbGxiYWNrKSxcbiAgICAgIH07XG4gICAgfSk7XG59O1xuXG4vLyBSZXR1cm5zIGEgbG9jYWxpemVkIG1vZGUgbGFiZWwgb3IgZW1wdHkgdGV4dCBmb3Igbm9uLXNlbGVjdGVkIHZhbHVlcy5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlKHZhbHVlKTtcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IG51bGwpIHJldHVybiBcIlwiO1xuICBjb25zdCBtZXRhID0gRVhDSEFOR0VfUkFURV9NT0RFX01FVEFbbm9ybWFsaXplZF07XG4gIHJldHVybiBpbmRUKG1ldGEubGFiZWxLZXksIG1ldGEuZmFsbGJhY2spO1xufTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQ29tcGFjdFBhZ2luYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3hcIjtcbmltcG9ydCB7IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSB9IGZyb20gXCIuLi9leHBlbnNlRm9ybWF0dGVycy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRMaW5lIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZURhdGVQYXJ0cywgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCBFeHBlbnNlU2VjdGlvbkRpdmlkZXIgZnJvbSBcIi4vRXhwZW5zZVNlY3Rpb25EaXZpZGVyLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VUaW1lbGluZUNhcmQgZnJvbSBcIi4vRXhwZW5zZVRpbWVsaW5lQ2FyZC50c3hcIjtcblxudHlwZSBQYWdpbmF0aW9uTGFiZWxzID0ge1xuICBmaXJzdDogc3RyaW5nO1xuICBwcmV2OiBzdHJpbmc7XG4gIG5leHQ6IHN0cmluZztcbiAgbGFzdDogc3RyaW5nO1xufTtcblxudHlwZSBFeHBlbnNlTGluZXNUaW1lbGluZVByb3BzID0ge1xuICB2aXNpYmxlTGluZXM6IEV4cGVuc2VTaGVldExpbmVbXTtcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIHRvdGFsTGluZVBhZ2VzOiBudW1iZXI7XG4gIGxpbmVQYWdlOiBudW1iZXI7XG4gIGxpbmVzTGFiZWw6IHN0cmluZztcbiAgZW1wdHlUZXh0OiBzdHJpbmc7XG4gIHBhZ2luYXRpb25MYWJlbHM6IFBhZ2luYXRpb25MYWJlbHM7XG4gIGNvbnRhaW5lclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XG4gIG9uTGluZVBhZ2VDaGFuZ2U6IChwYWdlOiBudW1iZXIpID0+IHZvaWQ7XG4gIG9uT3BlbkxpbmU6IChsaW5lUmVjSWQ6IHN0cmluZykgPT4gdm9pZDtcbn07XG5cbi8vIER1bWIgdGltZWxpbmUgZm9yIGV4cGVuc2Ugc2hlZXQgbGluZXMgd2l0aCBzdGFuZGFyZCBjYXJkIGFuZCBwYWdpbmF0aW9uIGxheW91dC5cbmNvbnN0IEV4cGVuc2VMaW5lc1RpbWVsaW5lID0gKHtcbiAgdmlzaWJsZUxpbmVzLFxuICBjdXJyZW5jeUNvZGUsXG4gIHRvdGFsTGluZVBhZ2VzLFxuICBsaW5lUGFnZSxcbiAgbGluZXNMYWJlbCxcbiAgZW1wdHlUZXh0LFxuICBwYWdpbmF0aW9uTGFiZWxzLFxuICBjb250YWluZXJSZWYsXG4gIG9uTGluZVBhZ2VDaGFuZ2UsXG4gIG9uT3BlbkxpbmUsXG59OiBFeHBlbnNlTGluZXNUaW1lbGluZVByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic3BhY2UteS0wXCI+XG4gICAgICA8RXhwZW5zZVNlY3Rpb25EaXZpZGVyIGxhYmVsPXtsaW5lc0xhYmVsfSBjbGFzc05hbWU9XCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlci0tc3BhY2VkXCIgLz5cblxuICAgICAge3Zpc2libGVMaW5lcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtYm94IHRpbWVsaW5lLWVtcHR5XCIgZGF0YS1lbXB0eS10ZXh0PXtlbXB0eVRleHR9IC8+XG4gICAgICApIDogKFxuICAgICAgICA8ZGl2IHJlZj17Y29udGFpbmVyUmVmfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3hcIj5cbiAgICAgICAgICB7dmlzaWJsZUxpbmVzLm1hcCgobGluZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpbmVJZCA9IHNhZmVUZXh0KGxpbmUubGluZVJlY0lkKTtcbiAgICAgICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gc2FmZVRleHQobGluZS5kZXNjcmlwdGlvbik7XG4gICAgICAgICAgICBjb25zdCBhbW91bnRUZXh0ID0gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGxpbmUuYW1vdW50ID8/IG51bGwsIGN1cnJlbmN5Q29kZSk7XG4gICAgICAgICAgICBjb25zdCBsaW5rZWRUaWNrZXRGaWxlSWQgPSBzYWZlVGV4dChsaW5lLmZpbGVJZCk7XG4gICAgICAgICAgICBjb25zdCBkYXRlUGFydHMgPSBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzKHNhZmVUZXh0KGxpbmUudHJhbnNEYXRlKSwgZG9jdW1lbnQ/LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcImVzLUVTXCIpO1xuICAgICAgICAgICAgY29uc3QgdGlja2V0U3RhdHVzSWNvbiA9IGxpbmtlZFRpY2tldEZpbGVJZCA/IChcbiAgICAgICAgICAgICAgPHN2Z1xuICAgICAgICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgICAgICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgICAgICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD17MS41fVxuICAgICAgICAgICAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC00IHctNFwiXG4gICAgICAgICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXG4gICAgICAgICAgICAgICAgICBkPVwiTTEzLjE5IDguNjg4YTQuNSA0LjUgMCAwIDEgMS4yNDIgNy4yNDRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMS02LjM2NC02LjM2NGwxLjc1Ny0xLjc1N20xMy4zNS0uNjIyIDEuNzU3LTEuNzU3YTQuNSA0LjUgMCAwIDAtNi4zNjQtNi4zNjRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMCAxLjI0MiA3LjI0NFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICApIDogbnVsbDtcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2Ake2xpbmVJZH0tJHtpbmRleH1gfSBjbGFzc05hbWU9XCJ0aW1lbGluZS1pdGVtXCI+XG4gICAgICAgICAgICAgICAgPEV4cGVuc2VUaW1lbGluZUNhcmRcbiAgICAgICAgICAgICAgICAgIGRhdGVQYXJ0cz17ZGF0ZVBhcnRzfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9e2Rlc2NyaXB0aW9uIHx8IGxpbmVJZCB8fCBcIi1cIn1cbiAgICAgICAgICAgICAgICAgIGFtb3VudFRleHQ9e2Ftb3VudFRleHR9XG4gICAgICAgICAgICAgICAgICBvbk9wZW49eygpID0+IG9uT3BlbkxpbmUobGluZUlkKX1cbiAgICAgICAgICAgICAgICAgIHRpdGxlQ2xhc3NOYW1lPVwidGltZWxpbmUtbmFtZSBleHBlbnNlLWxpbmUtY2FyZF9fdGl0bGVcIlxuICAgICAgICAgICAgICAgICAgc3RhdHVzSWNvbj17dGlja2V0U3RhdHVzSWNvbn1cbiAgICAgICAgICAgICAgICAgIHN0YXR1c0ljb25DbGFzc05hbWU9XCJleHBlbnNlLWxpbmUtY2FyZF9fdGlja2V0LWljb25cIlxuICAgICAgICAgICAgICAgICAgc3RhdHVzTGFiZWw9e2xpbmtlZFRpY2tldEZpbGVJZCB8fCB1bmRlZmluZWR9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIDxDb21wYWN0UGFnaW5hdGlvblxuICAgICAgICB0b3RhbFBhZ2VzPXt0b3RhbExpbmVQYWdlc31cbiAgICAgICAgY3VycmVudFBhZ2U9e2xpbmVQYWdlfVxuICAgICAgICBvblBhZ2VDaGFuZ2U9e29uTGluZVBhZ2VDaGFuZ2V9XG4gICAgICAgIGxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cbiAgICAgIC8+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUxpbmVzVGltZWxpbmU7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCwgRXhwZW5zZVNoZWV0SGVhZGVyVXBkYXRlUmVxdWVzdCB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24sIHBhcnNlRGVjaW1hbElucHV0IH0gZnJvbSBcIi4uL2hvb2tzL2V4cGVuc2VNdXRhdGlvblV0aWxzLnRzXCI7XG5pbXBvcnQge1xuICBjcmVhdGVFeHBlbnNlU2hlZXQsXG4gIGRlbGV0ZUV4cGVuc2VTaGVldCxcbiAgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyLFxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuXG50eXBlIFVzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9uc0FyZ3MgPSB7XG4gIGJ1c3k6IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xuICBpc0xvY2tlZDogYm9vbGVhbjtcbiAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XG4gIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lczogYm9vbGVhbjtcbiAgbG9ja2VkQ3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGxvY2tlZEV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xuICBjYW5FZGl0RXhwZW5zZTogYm9vbGVhbjtcbiAgY2FuRGVsZXRlRXhwZW5zZTogYm9vbGVhbjtcbiAgY2FuRWRpdFN0YXR1czogYm9vbGVhbjtcbiAgc2hlZXRJZDogc3RyaW5nO1xuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGRyYWZ0RXhjaGFuZ2VSYXRlOiBzdHJpbmc7XG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWU6IHN0cmluZztcbiAgZHJhZnRQcm9qZWN0SWQ6IHN0cmluZztcbiAgZHJhZnRFeHBlbnNlU2hlZXRTdGF0dXM/OiBudW1iZXIgfCBudWxsO1xuICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zOiBzdHJpbmc7XG4gIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeTogc3RyaW5nO1xuICBjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzPzogbnVtYmVyIHwgbnVsbDtcbiAgY3VycmVudEV4Y2hhbmdlUmF0ZU1vZGU/OiBudW1iZXIgfCBudWxsO1xuICBvbkNyZWF0ZVN1Y2Nlc3M6IChjcmVhdGVkU2hlZXRJZDogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRNb2RhbEVycm9yOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0QnVzeTogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xuICBzZXRTdGF0dXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXRJc0VkaXRpbmc6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+Pjtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUV4Y2hhbmdlUmF0ZSA9IChyYXc6IHN0cmluZyk6IG51bWJlciB8IG51bGwgPT4gcGFyc2VEZWNpbWFsSW5wdXQocmF3KTtcbi8vIENvbXBhcmVzIHJhdGVzIHdpdGggdG9sZXJhbmNlIHRvIGF2b2lkIGZsb2F0aW5nIHBvaW50IG1pc21hdGNoIG9uIHBheWxvYWQgbW9kZS5cbmNvbnN0IGFyZVJhdGVzRXF1aXZhbGVudCA9IChsZWZ0OiBudW1iZXIgfCBudWxsLCByaWdodDogbnVtYmVyIHwgbnVsbCk6IGJvb2xlYW4gPT4ge1xuICBpZiAobGVmdCA9PSBudWxsIHx8IHJpZ2h0ID09IG51bGwpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIE1hdGguYWJzKGxlZnQgLSByaWdodCkgPCAwLjAwMDAwMDE7XG59O1xuXG4vLyBFbmNhcHN1bGF0ZXMgdXBkYXRlIGFuZCBkZWxldGUgbXV0YXRpb25zIGZvciBleHBlbnNlIHNoZWV0IGhlYWRlciBkZXRhaWwuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zID0gKHtcbiAgYnVzeSxcbiAgaXNFZGl0aW5nLFxuICBpc0NyZWF0ZU1vZGUsXG4gIGlzTG9ja2VkLFxuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxuICBsb2NrZWRDdXJyZW5jeUNvZGUsXG4gIGxvY2tlZEV4Y2hhbmdlUmF0ZSxcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcbiAgY2FuRWRpdEV4cGVuc2UsXG4gIGNhbkRlbGV0ZUV4cGVuc2UsXG4gIGNhbkVkaXRTdGF0dXMsXG4gIHNoZWV0SWQsXG4gIGRyYWZ0RGVzY3JpcHRpb24sXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICBkcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcbiAgZHJhZnRQcm9qZWN0SWQsXG4gIGRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzLFxuICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxuICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXG4gIGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gIGN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlLFxuICBvbkNyZWF0ZVN1Y2Nlc3MsXG4gIHNldE1vZGFsRXJyb3IsXG4gIHNldEJ1c3ksXG4gIHNldFN0YXR1cyxcbiAgc2V0SXNFZGl0aW5nLFxufTogVXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zQXJncykgPT4ge1xuICBjb25zdCBoYW5kbGVVcGRhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKGJ1c3kgfHwgIWlzRWRpdGluZykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghaXNDcmVhdGVNb2RlICYmIGlzTG9ja2VkKSByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBjYW5Qcm9jZWVkID0gaXNDcmVhdGVNb2RlID8gY2FuQ3JlYXRlRXhwZW5zZSA6IGNhbkVkaXRFeHBlbnNlO1xuICAgIGlmICghY2FuUHJvY2VlZCkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IG5vcm1hbGl6ZWRDdXJyZW5jeSA9IFN0cmluZyhcbiAgICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzID8gKGxvY2tlZEN1cnJlbmN5Q29kZSB8fCBkcmFmdEN1cnJlbmN5Q29kZSB8fCBcIlwiKSA6IChkcmFmdEN1cnJlbmN5Q29kZSB8fCBcIlwiKVxuICAgIClcbiAgICAgIC50cmltKClcbiAgICAgIC50b1VwcGVyQ2FzZSgpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWREZXNjcmlwdGlvbiA9IFN0cmluZyhkcmFmdERlc2NyaXB0aW9uIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBjb25zdCBub3JtYWxpemVkUHJvamVjdElkID0gU3RyaW5nKGRyYWZ0UHJvamVjdElkIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBjb25zdCBub3JtYWxpemVkRXN0YWRvQ29tZW50YXJpb3MgPSBjYW5FZGl0U3RhdHVzID8gU3RyaW5nKGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MgfHwgXCJcIikudHJpbSgpIDogXCJcIjtcbiAgICBjb25zdCBub3JtYWxpemVkRXhjaGFuZ2VSYXRlUmF3ID0gU3RyaW5nKFxuICAgICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzID8gKGxvY2tlZEV4Y2hhbmdlUmF0ZSB8fCBkcmFmdEV4Y2hhbmdlUmF0ZSB8fCBcIlwiKSA6IChkcmFmdEV4Y2hhbmdlUmF0ZSB8fCBcIlwiKVxuICAgICk7XG4gICAgY29uc3Qgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSA9IFN0cmluZyhleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3kgfHwgXCJFVVJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCkgfHwgXCJFVVJcIjtcbiAgICBjb25zdCByZXF1aXJlc0V4Y2hhbmdlUmF0ZSA9IG5vcm1hbGl6ZWRDdXJyZW5jeSAhPT0gXCJcIiAmJiBub3JtYWxpemVkQ3VycmVuY3kgIT09IG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3k7XG4gICAgY29uc3QgcGFyc2VkRXhjaGFuZ2VSYXRlID0gbm9ybWFsaXplRXhjaGFuZ2VSYXRlKG5vcm1hbGl6ZWRFeGNoYW5nZVJhdGVSYXcpO1xuICAgIGNvbnN0IG9mZmljaWFsRXhjaGFuZ2VSYXRlID0gbm9ybWFsaXplRXhjaGFuZ2VSYXRlKG9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUpO1xuICAgIGNvbnN0IG9yaWdpbmFsRXhjaGFuZ2VSYXRlID0gbm9ybWFsaXplRXhjaGFuZ2VSYXRlKGxvY2tlZEV4Y2hhbmdlUmF0ZSk7XG4gICAgY29uc3QgcGFyc2VkQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUgPSBOdW1iZXIoY3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUpO1xuICAgIGNvbnN0IGhhc0N1cnJlbnRFeGNoYW5nZVJhdGVNb2RlID0gTnVtYmVyLmlzSW50ZWdlcihwYXJzZWRDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSkgJiYgcGFyc2VkQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUgPj0gMDtcbiAgICBjb25zdCBoYXNWYWxpZFJhdGUgPSBwYXJzZWRFeGNoYW5nZVJhdGUgIT0gbnVsbCAmJiBwYXJzZWRFeGNoYW5nZVJhdGUgPiAwO1xuICAgIGNvbnN0IHBhcnNlZERyYWZ0U3RhdHVzID0gTnVtYmVyKGRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzKTtcbiAgICBjb25zdCBoYXNEcmFmdFN0YXR1cyA9IE51bWJlci5pc0ludGVnZXIocGFyc2VkRHJhZnRTdGF0dXMpICYmIHBhcnNlZERyYWZ0U3RhdHVzID49IDA7XG4gICAgY29uc3QgaGFzTWFudWFsUmF0ZUVkaXRPblVwZGF0ZSA9XG4gICAgICAhaXNDcmVhdGVNb2RlICYmXG4gICAgICBoYXNWYWxpZFJhdGUgJiZcbiAgICAgIChvcmlnaW5hbEV4Y2hhbmdlUmF0ZSA9PSBudWxsIHx8ICFhcmVSYXRlc0VxdWl2YWxlbnQocGFyc2VkRXhjaGFuZ2VSYXRlLCBvcmlnaW5hbEV4Y2hhbmdlUmF0ZSkpO1xuICAgIC8vIE9ubHkgc2VuZCBleGNoYW5nZVJhdGVNb2RlIHdoZW4gdGhlIHVzZXIgYWN0dWFsbHkgY2hhbmdlZCB0aGUgcmF0ZSBtYW51YWxseS5cbiAgICBjb25zdCBpc01hbnVhbEV4Y2hhbmdlUmF0ZSA9ICgoKSA9PiB7XG4gICAgICBpZiAoIXJlcXVpcmVzRXhjaGFuZ2VSYXRlIHx8ICFoYXNWYWxpZFJhdGUpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmIChpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmICghaXNDcmVhdGVNb2RlICYmICFoYXNNYW51YWxSYXRlRWRpdE9uVXBkYXRlKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAob2ZmaWNpYWxFeGNoYW5nZVJhdGUgPT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gICAgICByZXR1cm4gIWFyZVJhdGVzRXF1aXZhbGVudChwYXJzZWRFeGNoYW5nZVJhdGUsIG9mZmljaWFsRXhjaGFuZ2VSYXRlKTtcbiAgICB9KSgpO1xuICAgIGNvbnN0IHJlc29sdmVkRXhjaGFuZ2VSYXRlTW9kZSA9IGlzTWFudWFsRXhjaGFuZ2VSYXRlXG4gICAgICA/IDFcbiAgICAgIDogKG5vcm1hbGl6ZWRFc3RhZG9Db21lbnRhcmlvcyA/IChoYXNDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA/IHBhcnNlZEN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlIDogMCkgOiB1bmRlZmluZWQpO1xuICAgIGNvbnN0IHJlc29sdmVkRXhwZW5zZVNoZWV0U3RhdHVzID0gaGFzRHJhZnRTdGF0dXMgPyBwYXJzZWREcmFmdFN0YXR1cyA6IChjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzID8/IHVuZGVmaW5lZCk7XG5cbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICBpZiAoIW5vcm1hbGl6ZWREZXNjcmlwdGlvbikge1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uTWVzc2FnZSA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fRGVzY3JpcHRpb25SZXF1aXJlZFwiLCBcIkRlc2NyaXB0aW9uIGlzIHJlcXVpcmVkLlwiKTtcbiAgICAgICAgc2V0TW9kYWxFcnJvcih2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICAgIHNldFN0YXR1cyh2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFub3JtYWxpemVkQ3VycmVuY3kpIHtcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbk1lc3NhZ2UgPSBpbmRUKFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0N1cnJlbmN5UmVxdWlyZWRcIiwgXCJDdXJyZW5jeSBpcyByZXF1aXJlZC5cIik7XG4gICAgICAgIHNldE1vZGFsRXJyb3IodmFsaWRhdGlvbk1lc3NhZ2UpO1xuICAgICAgICBzZXRTdGF0dXModmFsaWRhdGlvbk1lc3NhZ2UpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlcXVpcmVzRXhjaGFuZ2VSYXRlICYmICFoYXNWYWxpZFJhdGUpIHtcbiAgICAgIGNvbnN0IHZhbGlkYXRpb25NZXNzYWdlID0gaW5kVChcbiAgICAgICAgXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fRXhjaGFuZ2VSYXRlUmVxdWlyZWRcIixcbiAgICAgICAgXCJFeGNoYW5nZSByYXRlIGlzIHJlcXVpcmVkIHdoZW4gY3VycmVuY3kgaXMgZGlmZmVyZW50IGZyb20gYmFzZSBjdXJyZW5jeS5cIlxuICAgICAgKTtcbiAgICAgIHNldE1vZGFsRXJyb3IodmFsaWRhdGlvbk1lc3NhZ2UpO1xuICAgICAgc2V0U3RhdHVzKHZhbGlkYXRpb25NZXNzYWdlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcbiAgICAgIHN0YXJ0U3RhdHVzOiBpc0NyZWF0ZU1vZGVcbiAgICAgICAgPyBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpXG4gICAgICAgIDogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0aW5nXCIsIFwiVXBkYXRpbmcgZXhwZW5zZSBzaGVldC4uLlwiKSxcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRXJyb3JcIiwgXCJVcGRhdGUgZXJyb3IuXCIpLFxuICAgICAgc2V0TW9kYWxFcnJvcixcbiAgICAgIHNldEJ1c3ksXG4gICAgICBzZXRTdGF0dXMsXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgICAgIGNvbnN0IHBheWxvYWQ6IEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QgPSB7XG4gICAgICAgICAgICBtb2RlOiAxLFxuICAgICAgICAgICAgZXhpc3RpbmdIb2phR2FzdG9zSWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBub3JtYWxpemVkRGVzY3JpcHRpb24sXG4gICAgICAgICAgICBjdXJyZW5jeUNvZGU6IG5vcm1hbGl6ZWRDdXJyZW5jeSxcbiAgICAgICAgICAgIGV4Y2hSYXRlOiBoYXNWYWxpZFJhdGUgPyBOdW1iZXIocGFyc2VkRXhjaGFuZ2VSYXRlKSA6IDEsXG4gICAgICAgICAgICBwcm9qSWQ6IG5vcm1hbGl6ZWRQcm9qZWN0SWQgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgZXhwZW5zZVNoZWV0U3RhdHVzOiAwLFxuICAgICAgICAgICAgZXhjaGFuZ2VSYXRlTW9kZTogcmVzb2x2ZWRFeGNoYW5nZVJhdGVNb2RlLFxuICAgICAgICAgICAgbGluZXM6IFtdLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNyZWF0ZUV4cGVuc2VTaGVldChwYXlsb2FkKTtcblxuICAgICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBBY2NlcHQgYm90aCBjYXNpbmcgdmFyaWFudHMgZnJvbSBiYWNrZW5kIGVudmVsb3Blcy5cbiAgICAgICAgICBjb25zdCBjcmVhdGVkRGF0YSA9IHJlc3BvbnNlPy5EYXRhIGFzIHsgSG9qYUdhc3Rvc0lkPzogdW5rbm93bjsgaG9qYUdhc3Rvc0lkPzogdW5rbm93biB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAgICAgICBjb25zdCBjcmVhdGVkU2hlZXRJZCA9IFN0cmluZyhjcmVhdGVkRGF0YT8uSG9qYUdhc3Rvc0lkID8/IGNyZWF0ZWREYXRhPy5ob2phR2FzdG9zSWQgPz8gXCJcIikudHJpbSgpO1xuICAgICAgICAgIGlmICghY3JlYXRlZFNoZWV0SWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG9uQ3JlYXRlU3VjY2VzcyhjcmVhdGVkU2hlZXRJZCk7XG4gICAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIikpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGF5bG9hZDogRXhwZW5zZVNoZWV0SGVhZGVyVXBkYXRlUmVxdWVzdCA9IHtcbiAgICAgICAgICBkZXNjcmlwdGlvbjogU3RyaW5nKGRyYWZ0RGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpLFxuICAgICAgICAgIGN1cnJlbmN5Q29kZTogbm9ybWFsaXplZEN1cnJlbmN5LFxuICAgICAgICAgIGV4Y2hSYXRlOiBoYXNWYWxpZFJhdGUgPyBOdW1iZXIocGFyc2VkRXhjaGFuZ2VSYXRlKSA6IDEsXG4gICAgICAgICAgcHJvaklkOiBTdHJpbmcoZHJhZnRQcm9qZWN0SWQgfHwgXCJcIikudHJpbSgpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICBleHBlbnNlU2hlZXRTdGF0dXM6IHJlc29sdmVkRXhwZW5zZVNoZWV0U3RhdHVzLFxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZU1vZGU6IHJlc29sdmVkRXhjaGFuZ2VSYXRlTW9kZSxcbiAgICAgICAgICBlc3RhZG9Db21lbnRhcmlvczogY2FuRWRpdFN0YXR1cyA/IG5vcm1hbGl6ZWRFc3RhZG9Db21lbnRhcmlvcyA6IHVuZGVmaW5lZCxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHVwZGF0ZUV4cGVuc2VTaGVldEhlYWRlcihzaGVldElkLCBwYXlsb2FkKTtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVkXCIsIFwiRXhwZW5zZSBzaGVldCB1cGRhdGVkXCIpKTtcbiAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcbiAgfSwgW1xuICAgIGJ1c3ksXG4gICAgY2FuQ3JlYXRlRXhwZW5zZSxcbiAgICBjYW5FZGl0RXhwZW5zZSxcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxuICAgIGRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzLFxuICAgIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcbiAgICBkcmFmdFByb2plY3RJZCxcbiAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXG4gICAgY3VycmVudEV4cGVuc2VTaGVldFN0YXR1cyxcbiAgICBjdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSxcbiAgICBjYW5FZGl0U3RhdHVzLFxuICAgIGlzQ3JlYXRlTW9kZSxcbiAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXG4gICAgaXNMb2NrZWQsXG4gICAgaXNFZGl0aW5nLFxuICAgIGxvY2tlZEN1cnJlbmN5Q29kZSxcbiAgICBsb2NrZWRFeGNoYW5nZVJhdGUsXG4gICAgb25DcmVhdGVTdWNjZXNzLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0SXNFZGl0aW5nLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0U3RhdHVzLFxuICAgIHNoZWV0SWQsXG4gIF0pO1xuXG4gIGNvbnN0IGhhbmRsZURlbGV0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChpc0xvY2tlZCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghY2FuRGVsZXRlRXhwZW5zZSkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xuICAgICAgc3RhcnRTdGF0dXM6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGluZ1wiLCBcIkRlbGV0aW5nIGV4cGVuc2Ugc2hlZXQuLi5cIiksXG4gICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUVycm9yXCIsIFwiRGVsZXRlIGVycm9yLlwiKSxcbiAgICAgIHNldE1vZGFsRXJyb3IsXG4gICAgICBzZXRCdXN5LFxuICAgICAgc2V0U3RhdHVzLFxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0KHNoZWV0SWQpO1xuXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IGRlbGV0ZWRcIikpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xuICB9LCBbYnVzeSwgY2FuRGVsZXRlRXhwZW5zZSwgaXNMb2NrZWQsIHNldEJ1c3ksIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1cywgc2hlZXRJZF0pO1xuXG4gIHJldHVybiB7XG4gICAgaGFuZGxlVXBkYXRlLFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMgfSBmcm9tIFwiLi4vaG9va3MvdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zLnRzXCI7XG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuXG50eXBlIFVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnNBcmdzID0ge1xuICBidXN5OiBib29sZWFuO1xuICBtb2RhbE9wZW46IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xuICBpc0xvY2tlZDogYm9vbGVhbjtcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XG4gIGNhbkRlbGV0ZUV4cGVuc2U6IGJvb2xlYW47XG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVVcGRhdGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcbiAgb25TYXZlU3VjY2VzczogKCkgPT4gdm9pZDtcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcbiAgfSkgPT4gdm9pZDtcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gQ29vcmRpbmF0ZXMgdG9wYmFyIGljb24gc3RhdGUgYW5kIGRpc3BhdGNoIGFjdGlvbnMgZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMgPSAoe1xuICBidXN5LFxuICBtb2RhbE9wZW4sXG4gIGlzRWRpdGluZyxcbiAgaXNDcmVhdGVNb2RlLFxuICBpc0xvY2tlZCxcbiAgY2FuRWRpdEV4cGVuc2UsXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXG4gIGNhbkRlbGV0ZUV4cGVuc2UsXG4gIHNldE1vZGFsRXJyb3IsXG4gIGhhbmRsZUVuYWJsZUVkaXQsXG4gIGhhbmRsZUNhbmNlbEVkaXQsXG4gIGhhbmRsZVVwZGF0ZSxcbiAgaGFuZGxlRGVsZXRlLFxuICBvblNhdmVTdWNjZXNzLFxuICBvcGVuQ29uZmlybSxcbiAgY2xvc2VDb25maXJtLFxufTogVXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MpID0+IHtcbiAgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zKHtcbiAgICBpZHM6IHtcbiAgICAgIGVkaXRJY29uSWQ6IFwiZXhwZW5zZUVkaXRJY29uXCIsXG4gICAgICBzYXZlSWNvbklkOiBcImV4cGVuc2VTYXZlSWNvblwiLFxuICAgICAgZGVsZXRlQnRuSWQ6IFwiZXhwZW5zZURlbGV0ZUJ0blwiLFxuICAgICAgY2FuY2VsQnRuSWQ6IFwiZXhwZW5zZUNhbmNlbEJ0blwiLFxuICAgIH0sXG4gICAgZXZlbnRzOiB7XG4gICAgICBlZGl0RXZlbnQ6IFwiZXhwZW5zZS1kZXRhaWwtZWRpdFwiLFxuICAgICAgZGVsZXRlRXZlbnQ6IFwiZXhwZW5zZS1kZXRhaWwtZGVsZXRlXCIsXG4gICAgICBjYW5jZWxFdmVudDogXCJleHBlbnNlLWRldGFpbC1jYW5jZWwtZWRpdFwiLFxuICAgIH0sXG4gICAgYnVzeSxcbiAgICBtb2RhbE9wZW4sXG4gICAgaXNFZGl0aW5nLFxuICAgIGlzQ3JlYXRlTW9kZSxcbiAgICBpc0xvY2tlZCxcbiAgICBhbGxvd0NyZWF0ZU1vZGVBY3Rpb25zV2hlbkxvY2tlZDogdHJ1ZSxcbiAgICBjYW5DcmVhdGU6IGNhbkNyZWF0ZUV4cGVuc2UsXG4gICAgY2FuRWRpdDogY2FuRWRpdEV4cGVuc2UsXG4gICAgY2FuRGVsZXRlOiBjYW5EZWxldGVFeHBlbnNlLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxuICAgIGhhbmRsZVNhdmU6IGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVEZWxldGUsXG4gICAgc2F2ZUNvbmZpcm1UaXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIsIFwiU2F2ZSBjaGFuZ2VzXCIpLFxuICAgIHNhdmVDb25maXJtTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBzYXZlIGNoYW5nZXM/XCIpLFxuICAgIHNhdmVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKSxcbiAgICBkZWxldGVDb25maXJtVGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVTaGVldF9UaXRsZVwiLCBcIkRlbGV0ZSBleHBlbnNlIHNoZWV0XCIpLFxuICAgIGRlbGV0ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlU2hlZXRfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGV4cGVuc2Ugc2hlZXQ/XCIpLFxuICAgIGRlbGV0ZUNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkRlbGV0ZVwiKSxcbiAgICBvblNhdmVTdWNjZXNzLFxuICAgIG9uRGVsZXRlU3VjY2VzczogKCkgPT4ge1xuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL0V4cGVuc2VTaGVldHNcIik7XG4gICAgfSxcbiAgICBvcGVuQ29uZmlybSxcbiAgICBjbG9zZUNvbmZpcm0sXG4gIH0pO1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHtcbiAgRXhwZW5zZVNoZWV0SGVhZGVyLFxuICBFeHBlbnNlU2hlZXRMaW5lLFxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQge1xuICBmZXRjaEV4cGVuc2VTaGVldERldGFpbCxcbiAgZ2V0RXhjaGFuZ2VSYXRlLFxuICBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlLFxuICBtYXBFeHBlbnNlU2hlZXRIZWFkZXIsXG4gIG1hcEV4cGVuc2VTaGVldExpbmUsXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQge1xuICBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQsXG4gIG5hdmlnYXRlVG9FeHBlbnNlVXJsLFxuICBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLFxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHNcIjtcbmltcG9ydCB7IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlTGFiZWwgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4Y2hhbmdlUmF0ZUVudHJ5TW9kZUNhdGFsb2cudHNcIjtcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSwgaGFzQXNzaWduZWRWb3VjaGVyLCBwYXJzZUV4cGVuc2VEYXRlLCBzYWZlVGV4dCwgdG9Jc29EYXRlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIsIHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XG5cbmNvbnN0IEVYQ0hBTkdFX1JBVEVfREVCT1VOQ0VfTVMgPSA0MDA7XG5jb25zdCBFWENIQU5HRV9SQVRFX1JFRkVSRU5DRV9BTU9VTlQgPSAxMDA7XG5jb25zdCBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTID0gNztcbmNvbnN0IEVYUEVOU0VfU1RBVFVTX0FQUFJPVkVEID0gMjtcbmNvbnN0IEVYUEVOU0VfU1RBVFVTX1BBSUQgPSA0O1xuXG4vLyBOb3JtYWxpemVzIGV4Y2hhbmdlLXJhdGUgbnVtYmVycyBmb3IgbnVtZXJpYyBpbnB1dCBjb250cm9scy5cbmNvbnN0IGZvcm1hdEV4Y2hhbmdlUmF0ZUlucHV0VmFsdWUgPSAodmFsdWU6IG51bWJlcik6IHN0cmluZyA9PiB7XG4gIHJldHVybiBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIodmFsdWUsIHtcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IEVYQ0hBTkdFX1JBVEVfREVDSU1BTF9ESUdJVFMsXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgIGZhbGxiYWNrOiBcIlwiLFxuICB9KTtcbn07XG5cbmNvbnN0IGJ1aWxkQ3JlYXRlSGVhZGVyRHJhZnQgPSAoKTogRXhwZW5zZVNoZWV0SGVhZGVyID0+IHtcbiAgcmV0dXJuIHtcbiAgICBob2phR2FzdG9zSWQ6IFwiXCIsXG4gICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgcHJvaklkOiBcIlwiLFxuICAgIHZvdWNoZXI6IFwiXCIsXG4gICAgY3VycmVuY3lDb2RlOiBcIlwiLFxuICAgIHRvdGFsQW1vdW50OiBudWxsLFxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogMCxcbiAgICBleGNoYW5nZVJhdGVNb2RlOiAwLFxuICAgIGNyZWF0ZWREYXRlOiBcIlwiLFxuICAgIGV4Y2hSYXRlOiBcIjFcIixcbiAgfTtcbn07XG5cbmNvbnN0IHNob3VsZFNob3dFeGNoYW5nZVJhdGUgPSAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICBpZiAoIXZhbHVlKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dCh2YWx1ZSk7XG4gIGlmIChwYXJzZWQgPT09IG51bGwpIHJldHVybiB0cnVlO1xuICByZXR1cm4gTWF0aC5hYnMocGFyc2VkKSA+IDA7XG59O1xuXG50eXBlIFVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlQXJncyA9IHtcbiAgaGFzQWNjZXNzOiBib29sZWFuO1xuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xuICBjYW5FZGl0RXhwZW5zZTogYm9vbGVhbjtcbiAgY2FuRWRpdEhlYWRlckZpZWxkczogYm9vbGVhbjtcbiAgc2hlZXRJZDogc3RyaW5nO1xuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gT3ducyBzdGF0ZSBhbmQgYmVoYXZpb3IgZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsIHBhZ2UgKHJlYWQsIGVkaXQsIGNyZWF0ZSkuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUgPSAoe1xuICBoYXNBY2Nlc3MsXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXG4gIGNhbkVkaXRFeHBlbnNlLFxuICBjYW5FZGl0SGVhZGVyRmllbGRzLFxuICBzaGVldElkLFxuICBpc0NyZWF0ZU1vZGUsXG4gIG9uRm9yYmlkZGVuLFxufTogVXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGVBcmdzKSA9PiB7XG4gIGNvbnN0IFtoZWFkZXIsIHNldEhlYWRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRIZWFkZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2xpbmVzLCBzZXRMaW5lc10gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRMaW5lW10+KFtdKTtcbiAgY29uc3QgW2xpbmVQYWdlLCBzZXRMaW5lUGFnZV0gPSB1c2VTdGF0ZSgxKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2lzRWRpdGluZywgc2V0SXNFZGl0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW21vZGFsRXJyb3IsIHNldE1vZGFsRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdERlc2NyaXB0aW9uLCBzZXREcmFmdERlc2NyaXB0aW9uXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRQcm9qZWN0SWQsIHNldERyYWZ0UHJvamVjdElkXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRDdXJyZW5jeUNvZGUsIHNldERyYWZ0Q3VycmVuY3lDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRFeGNoYW5nZVJhdGUsIHNldERyYWZ0RXhjaGFuZ2VSYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMsIHNldERyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzXSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbZHJhZnRFc3RhZG9Db21lbnRhcmlvcywgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvc10gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RlZmF1bHRDdXJyZW5jeUNvZGUsIHNldERlZmF1bHRDdXJyZW5jeUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtpc0V4Y2hhbmdlUmF0ZUxvYWRpbmcsIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtleGNoYW5nZVJhdGVNZXNzYWdlLCBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IsIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW29mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlLCBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLCBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSwgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2VdID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgY29uc3QgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciA9IHVzZUNhbGxiYWNrKChuZXh0SGVhZGVyOiBFeHBlbnNlU2hlZXRIZWFkZXIgfCBudWxsKSA9PiB7XG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbihzYWZlVGV4dChuZXh0SGVhZGVyPy5kZXNjcmlwdGlvbikpO1xuICAgIHNldERyYWZ0UHJvamVjdElkKHNhZmVUZXh0KG5leHRIZWFkZXI/LnByb2pJZCkpO1xuICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlKHNhZmVUZXh0KG5leHRIZWFkZXI/LmN1cnJlbmN5Q29kZSkpO1xuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlKFxuICAgICAgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKG5leHRIZWFkZXI/LmV4Y2hSYXRlLCB7XG4gICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcbiAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxuICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICAgICAgZmFsbGJhY2s6IFwiXCIsXG4gICAgICB9KVxuICAgICk7XG4gICAgY29uc3QgbmV4dFN0YXR1cyA9IE51bWJlcihuZXh0SGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMpO1xuICAgIHNldERyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzKE51bWJlci5pc0ludGVnZXIobmV4dFN0YXR1cykgJiYgbmV4dFN0YXR1cyA+PSAwID8gbmV4dFN0YXR1cyA6IDApO1xuICAgIHNldERyYWZ0RXN0YWRvQ29tZW50YXJpb3Moc2FmZVRleHQobmV4dEhlYWRlcj8uZXN0YWRvQ29tZW50YXJpb3MpKTtcbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbG9hZERldGFpbCA9IGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghaGFzQWNjZXNzKSB7XG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgICBpZiAoIWNhbkNyZWF0ZUV4cGVuc2UpIHtcbiAgICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRyYWZ0SGVhZGVyID0gYnVpbGRDcmVhdGVIZWFkZXJEcmFmdCgpO1xuICAgICAgICBzZXRIZWFkZXIoZHJhZnRIZWFkZXIpO1xuICAgICAgICBzZXRMaW5lcyhbXSk7XG4gICAgICAgIHNldExpbmVQYWdlKDEpO1xuICAgICAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XG4gICAgICAgIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIoZHJhZnRIZWFkZXIpO1xuICAgICAgICBzZXRTdGF0dXMoXCJcIik7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXNoZWV0SWQpIHtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCB3YXMgbm90IGZvdW5kLlwiKSk7XG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgc2V0TGluZXMoW10pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldERldGFpbChzaGVldElkLCB7XG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2U/Lk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBkZXRhaWwuXCIpKTtcbiAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgICAgc2V0TGluZXMoW10pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNoZWV0cyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkU2hlZXQgPVxuICAgICAgICAgIHNoZWV0cy5maW5kKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnk/LkhvamFHYXN0b3NJZCkudG9VcHBlckNhc2UoKSA9PT0gc2hlZXRJZC50cmltKCkudG9VcHBlckNhc2UoKSkgfHwgc2hlZXRzWzBdO1xuXG4gICAgICAgIGlmICghc2VsZWN0ZWRTaGVldCkge1xuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob3RGb3VuZFwiLCBcIkV4cGVuc2Ugc2hlZXQgd2FzIG5vdCBmb3VuZC5cIikpO1xuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgICBzZXRMaW5lcyhbXSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV4dEhlYWRlciA9IG1hcEV4cGVuc2VTaGVldEhlYWRlcihzZWxlY3RlZFNoZWV0KTtcbiAgICAgICAgY29uc3QgbmV4dExpbmVzID0gKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRTaGVldC5MaW5lcykgPyBzZWxlY3RlZFNoZWV0LkxpbmVzIDogW10pLm1hcCgoZW50cnkpID0+XG4gICAgICAgICAgbWFwRXhwZW5zZVNoZWV0TGluZShlbnRyeSlcbiAgICAgICAgKTtcbiAgICAgICAgc2V0SGVhZGVyKG5leHRIZWFkZXIpO1xuICAgICAgICBzZXRMaW5lcyhuZXh0TGluZXMpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKFxuICAgICAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBkZXRhaWwuXCIpXG4gICAgICAgICk7XG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgc2V0TGluZXMoW10pO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdm9pZCBsb2FkRGV0YWlsKCk7XG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlLCBoYXNBY2Nlc3MsIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIsIGlzQ3JlYXRlTW9kZSwgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaGVhZGVyIHx8IGlzRWRpdGluZykgcmV0dXJuO1xuICAgIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIoaGVhZGVyKTtcbiAgfSwgW2hlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNFZGl0aW5nXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWhhc0FjY2VzcykgcmV0dXJuO1xuICAgIGxldCBpc0NhbmNlbGxlZCA9IGZhbHNlO1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cbiAgICBjb25zdCBsb2FkRGVmYXVsdEN1cnJlbmN5Q29kZSA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSBhd2FpdCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlKHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XG4gICAgICAgIHNldERlZmF1bHRDdXJyZW5jeUNvZGUoc2FmZVRleHQoY29kZSkudG9VcHBlckNhc2UoKSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHJldHVybjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdm9pZCBsb2FkRGVmYXVsdEN1cnJlbmN5Q29kZSgpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpc0NhbmNlbGxlZCA9IHRydWU7XG4gICAgICBjb250cm9sbGVyLmFib3J0KCk7XG4gICAgfTtcbiAgfSwgW2hhc0FjY2Vzc10pO1xuXG4gIGNvbnN0IGhhc0FjdGl2ZVByb2Nlc3MgPSB1c2VNZW1vKCgpID0+IGJ1c3kgfHwgaXNFZGl0aW5nLCBbYnVzeSwgaXNFZGl0aW5nXSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZChoYXNBY3RpdmVQcm9jZXNzKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKCk7XG4gICAgfTtcbiAgfSwgW2hhc0FjdGl2ZVByb2Nlc3NdKTtcblxuICBjb25zdCBwcm9qZWN0VmFsdWUgPSBzYWZlVGV4dChoZWFkZXI/LnByb2pJZCk7XG4gIGNvbnN0IHZvdWNoZXJWYWx1ZSA9IHNhZmVUZXh0KGhlYWRlcj8udm91Y2hlcik7XG4gIGNvbnN0IHN0YXR1c0NvZGUgPSB0eXBlb2YgaGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMgPT09IFwibnVtYmVyXCIgPyBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzIDogbnVsbDtcbiAgY29uc3QgaXNTaGVldEFwcHJvdmVkID0gc3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfQVBQUk9WRUQ7XG4gIGNvbnN0IGlzU2hlZXRQYWlkQnlTdGF0dXMgPSBzdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19QQUlEO1xuICBjb25zdCBpc1NoZWV0UGFpZEJ5Vm91Y2hlciA9IGhhc0Fzc2lnbmVkVm91Y2hlcih2b3VjaGVyVmFsdWUpO1xuICBjb25zdCBpc1NoZWV0UGFpZCA9IGlzU2hlZXRQYWlkQnlTdGF0dXMgfHwgaXNTaGVldFBhaWRCeVZvdWNoZXI7XG4gIGNvbnN0IGlzU2hlZXRMb2NrZWQgPSBpc1NoZWV0QXBwcm92ZWQgfHwgaXNTaGVldFBhaWQ7XG4gIGNvbnN0IGhhc0xpbmVzID0gbGluZXMubGVuZ3RoID4gMDtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlVmFsdWUgPSBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIoc2FmZVRleHQoaGVhZGVyPy5leGNoUmF0ZSksIHtcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IEVYQ0hBTkdFX1JBVEVfREVDSU1BTF9ESUdJVFMsXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgIGZhbGxiYWNrOiBcIlwiLFxuICB9KTtcbiAgY29uc3Qgc2hvd0V4Y2hhbmdlUmF0ZSA9IHVzZU1lbW8oKCkgPT4gc2hvdWxkU2hvd0V4Y2hhbmdlUmF0ZShleGNoYW5nZVJhdGVWYWx1ZSksIFtleGNoYW5nZVJhdGVWYWx1ZV0pO1xuICBjb25zdCBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSA9IHVzZU1lbW8oKCkgPT4gZHJhZnRDdXJyZW5jeUNvZGUudHJpbSgpLnRvVXBwZXJDYXNlKCksIFtkcmFmdEN1cnJlbmN5Q29kZV0pO1xuICBjb25zdCBub3JtYWxpemVkRGVmYXVsdEN1cnJlbmN5ID0gdXNlTWVtbygoKSA9PiBzYWZlVGV4dChkZWZhdWx0Q3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpLCBbZGVmYXVsdEN1cnJlbmN5Q29kZV0pO1xuICBjb25zdCBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3kgPSBub3JtYWxpemVkRGVmYXVsdEN1cnJlbmN5IHx8IFwiRVVSXCI7XG4gIGNvbnN0IHVpTG9jYWxlID0gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIFwiZXMtRVNcIjtcbiAgICByZXR1cm4gc2FmZVRleHQoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Py5sYW5nKSB8fCBcImVzLUVTXCI7XG4gIH0sIFtdKTtcbiAgY29uc3QgZm9ybUV4Y2hhbmdlRGF0ZSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IHBhcnNlZERhdGUgPSBwYXJzZUV4cGVuc2VEYXRlKHNhZmVUZXh0KGhlYWRlcj8uY3JlYXRlZERhdGUpKTtcbiAgICBpZiAocGFyc2VkRGF0ZSkgcmV0dXJuIHRvSXNvRGF0ZShwYXJzZWREYXRlKTtcbiAgICByZXR1cm4gdG9Jc29EYXRlKG5ldyBEYXRlKCkpO1xuICB9LCBbaGVhZGVyPy5jcmVhdGVkRGF0ZV0pO1xuICBjb25zdCBleGNoYW5nZVJhdGVSZXF1aXJlZCA9XG4gICAgaXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHMgJiYgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgIT09IFwiXCIgJiYgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgIT09IGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeTtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UgPVxuICAgIGV4Y2hhbmdlUmF0ZVJlcXVpcmVkICYmICFkcmFmdEV4Y2hhbmdlUmF0ZS50cmltKClcbiAgICAgID8gaW5kVChcbiAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfVmFsaWRhdGlvbl9FeGNoYW5nZVJhdGVSZXF1aXJlZFwiLFxuICAgICAgICAgIFwiRXhjaGFuZ2UgcmF0ZSBpcyByZXF1aXJlZCB3aGVuIGN1cnJlbmN5IGlzIGRpZmZlcmVudCBmcm9tIGJhc2UgY3VycmVuY3kuXCJcbiAgICAgICAgKVxuICAgICAgOiBcIlwiO1xuICAvLyBDdXJyZW5jeSB0eXBlIGNhbiBiZSBlZGl0ZWQgd2hlbmV2ZXIgdGhlIHNoZWV0IGl0c2VsZiBpcyBlZGl0YWJsZSAobm90IGFwcHJvdmVkL3BhaWQpLlxuICBjb25zdCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyA9IGZhbHNlO1xuICBjb25zdCBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMgPSBpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkcyAmJiBoYXNMaW5lcyAmJiBzaG93RXhjaGFuZ2VSYXRlO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGlzQ2FuY2VsbGVkID0gZmFsc2U7XG4gICAgbGV0IHJlcXVlc3RUaW1lcjogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4gfCBudWxsID0gbnVsbDtcbiAgICBsZXQgcmVxdWVzdEFib3J0Q29udHJvbGxlcjogQWJvcnRDb250cm9sbGVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICBjb25zdCBjbGVhclJlcXVlc3RBcnRpZmFjdHMgPSAoKSA9PiB7XG4gICAgICBpZiAocmVxdWVzdFRpbWVyKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChyZXF1ZXN0VGltZXIpO1xuICAgICAgICByZXF1ZXN0VGltZXIgPSBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKHJlcXVlc3RBYm9ydENvbnRyb2xsZXIpIHtcbiAgICAgICAgcmVxdWVzdEFib3J0Q29udHJvbGxlci5hYm9ydCgpO1xuICAgICAgICByZXF1ZXN0QWJvcnRDb250cm9sbGVyID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKCFpc0VkaXRpbmcgfHwgIWNhbkVkaXRIZWFkZXJGaWVsZHMgfHwgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzKSB7XG4gICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcoZmFsc2UpO1xuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcIlwiKTtcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBjbGVhclJlcXVlc3RBcnRpZmFjdHMoKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKCFub3JtYWxpemVkRHJhZnRDdXJyZW5jeSB8fCAhZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5KSB7XG4gICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcoZmFsc2UpO1xuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcIlwiKTtcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBjbGVhclJlcXVlc3RBcnRpZmFjdHMoKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5ID09PSBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3kpIHtcbiAgICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlKFwiMVwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCIxXCIpO1xuICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKGZhbHNlKTtcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXCJcIik7XG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XG4gICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICBjbGVhclJlcXVlc3RBcnRpZmFjdHMoKTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmVxdWVzdFRpbWVyID0gc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICByZXF1ZXN0QWJvcnRDb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKHRydWUpO1xuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcIlwiKTtcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKGZhbHNlKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZ2V0RXhjaGFuZ2VSYXRlKFxuICAgICAgICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgICAgICAgICBmb3JtRXhjaGFuZ2VEYXRlLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgc2lnbmFsOiByZXF1ZXN0QWJvcnRDb250cm9sbGVyLnNpZ25hbCxcbiAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzIHx8ICFyZXNwb25zZS5EYXRhIHx8ICFOdW1iZXIuaXNGaW5pdGUoTnVtYmVyKHJlc3BvbnNlLkRhdGEuUmF0ZSkpKSB7XG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XG4gICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcbiAgICAgICAgICAgIHNhZmVUZXh0KHJlc3BvbnNlLk1lc3NhZ2UpIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9VbmF2YWlsYWJsZVwiLCBcIk5vIHNlIHB1ZG8gb2J0ZW5lciBlbCB0aXBvIGRlIGNhbWJpby5cIilcbiAgICAgICAgICApO1xuICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9mZmljaWFsUmF0ZVJhdyA9IE51bWJlcihyZXNwb25zZS5EYXRhLlJhdGUpO1xuICAgICAgICBjb25zdCBvZmZpY2lhbFJhdGVGb3JBbW91bnQxMDAgPSBvZmZpY2lhbFJhdGVSYXcgKiBFWENIQU5HRV9SQVRFX1JFRkVSRU5DRV9BTU9VTlQ7XG4gICAgICAgIGNvbnN0IG5leHRFeGNoYW5nZVJhdGVWYWx1ZSA9IGZvcm1hdEV4Y2hhbmdlUmF0ZUlucHV0VmFsdWUob2ZmaWNpYWxSYXRlRm9yQW1vdW50MTAwKTtcbiAgICAgICAgY29uc3Qgb2ZmaWNpYWxSYXRlUmF3VmFsdWUgPSBmb3JtYXRFeGNoYW5nZVJhdGVJbnB1dFZhbHVlKG9mZmljaWFsUmF0ZVJhdyk7XG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUobmV4dEV4Y2hhbmdlUmF0ZVZhbHVlKTtcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShvZmZpY2lhbFJhdGVSYXdWYWx1ZSk7XG4gICAgICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlKG5leHRFeGNoYW5nZVJhdGVWYWx1ZSk7XG5cbiAgICAgICAgY29uc3QgZWZmZWN0aXZlUmF0ZURhdGUgPSBzYWZlVGV4dChyZXNwb25zZS5EYXRhLkRhdGUpIHx8IGZvcm1FeGNoYW5nZURhdGU7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGEuU291cmNlKTtcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKGVmZmVjdGl2ZVJhdGVEYXRlKTtcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2Uoc291cmNlKTtcbiAgICAgICAgY29uc3Qgb2ZmaWNpYWxMYWJlbCA9IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlTGFiZWwoMCkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0V4Y2hhbmdlUmF0ZU1vZGVfT2ZmaWNpYWxcIiwgXCJULkMuIE9maWNpYWxcIik7XG4gICAgICAgIGNvbnN0IGxvY2FsaXplZFJhdGVEYXRlID0gZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlKGVmZmVjdGl2ZVJhdGVEYXRlLCB1aUxvY2FsZSkgfHwgZWZmZWN0aXZlUmF0ZURhdGU7XG4gICAgICAgIGNvbnN0IGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlID0gc291cmNlID8gYCR7b2ZmaWNpYWxMYWJlbH0gJHtsb2NhbGl6ZWRSYXRlRGF0ZX0gKCR7c291cmNlfSlgIDogYCR7b2ZmaWNpYWxMYWJlbH0gJHtsb2NhbGl6ZWRSYXRlRGF0ZX1gO1xuICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKG9mZmljaWFsUmF0ZVJhd1ZhbHVlID8gYCR7ZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2V9IC0gJHtvZmZpY2lhbFJhdGVSYXdWYWx1ZX1gIDogZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UpO1xuICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSByZXR1cm47XG5cbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikge1xuICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcbiAgICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX05vdEZvdW5kXCIsIFwiTm8gaGF5IHRpcG8gZGUgY2FtYmlvIHBhcmEgbGEgZmVjaGFcIikpO1xuICAgICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IodHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDIyIHx8IGVycm9yLnN0YXR1cyA9PT0gNTAwKSB7XG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xuICAgICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcbiAgICAgICAgICAgICAgc2FmZVRleHQoZXJyb3IubWVzc2FnZSkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX1VuYXZhaWxhYmxlXCIsIFwiTm8gc2UgcHVkbyBvYnRlbmVyIGVsIHRpcG8gZGUgY2FtYmlvLlwiKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XG4gICAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShcbiAgICAgICAgICAgIHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9VbmF2YWlsYWJsZVwiLCBcIk5vIHNlIHB1ZG8gb2J0ZW5lciBlbCB0aXBvIGRlIGNhbWJpby5cIilcbiAgICAgICAgICApO1xuICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcbiAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XG4gICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX1VuYXZhaWxhYmxlXCIsIFwiTm8gc2UgcHVkbyBvYnRlbmVyIGVsIHRpcG8gZGUgY2FtYmlvLlwiKSk7XG4gICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKCFpc0NhbmNlbGxlZCkge1xuICAgICAgICAgIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCBFWENIQU5HRV9SQVRFX0RFQk9VTkNFX01TKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpc0NhbmNlbGxlZCA9IHRydWU7XG4gICAgICBjbGVhclJlcXVlc3RBcnRpZmFjdHMoKTtcbiAgICB9O1xuICB9LCBbXG4gICAgY2FuRWRpdEhlYWRlckZpZWxkcyxcbiAgICBmb3JtRXhjaGFuZ2VEYXRlLFxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgICBpc0VkaXRpbmcsXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxuICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxuICAgIHVpTG9jYWxlLFxuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlLFxuICBdKTtcblxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChpc0NyZWF0ZU1vZGUgfHwgaXNMb2FkaW5nIHx8ICFoZWFkZXIgfHwgaXNTaGVldExvY2tlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghY2FuRWRpdEV4cGVuc2UpIHtcbiAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XG4gICAgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlcihoZWFkZXIpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRWRpdGluZ0VuYWJsZWRcIiwgXCJFZGl0aW5nIGVuYWJsZWRcIikpO1xuICB9LCBbY2FuRWRpdEV4cGVuc2UsIGhlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNDcmVhdGVNb2RlLCBpc0xvYWRpbmcsIGlzU2hlZXRMb2NrZWQsIG9uRm9yYmlkZGVuXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2FuY2VsRWRpdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvRXhwZW5zZVNoZWV0c1wiLCB7XG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghaXNFZGl0aW5nKSByZXR1cm47XG5cbiAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xuICAgIHNldE1vZGFsRXJyb3IoXCJcIik7XG4gICAgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlcihoZWFkZXIpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKSk7XG4gIH0sIFtoZWFkZXIsIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIsIGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nXSk7XG5cbiAgLy8gT3BlbnMgZXhwZW5zZSBzaGVldCBjcmVhdGUgbW9kZSBmcm9tIGxpc3QtbGV2ZWwgZW50cnkgcG9pbnRzLlxuICBjb25zdCBoYW5kbGVPcGVuQ3JlYXRlU2hlZXRNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSkge1xuICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9tb2RlPWNyZWF0ZVwiLCB7XG4gICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcbiAgICB9KTtcbiAgfSwgW2NhbkNyZWF0ZUV4cGVuc2UsIGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nLCBvbkZvcmJpZGRlbl0pO1xuXG4gIC8vIE9wZW5zIGV4cGVuc2UgbGluZSBjcmVhdGUgbW9kZSBmcm9tIGFuIGV4aXN0aW5nIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlxuICBjb25zdCBoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFjYW5DcmVhdGVFeHBlbnNlIHx8ICFzaGVldElkIHx8IGlzU2hlZXRMb2NrZWQpIHtcbiAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRhcmdldFVybCA9IGAvR2FzdG9zL0V4cGVuc2VTaGVldExpbmVEZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNoZWV0SWQpfSZtb2RlPWNyZWF0ZWA7XG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwodGFyZ2V0VXJsLCB7XG4gICAgICBhc2tDb25maXJtYXRpb246IGlzRWRpdGluZyxcbiAgICB9KTtcbiAgfSwgW2NhbkNyZWF0ZUV4cGVuc2UsIGlzQ3JlYXRlTW9kZSwgaXNFZGl0aW5nLCBpc1NoZWV0TG9ja2VkLCBvbkZvcmJpZGRlbiwgc2hlZXRJZF0pO1xuXG4gIC8vIE9wZW5zIHRpY2tldHMgcGFnZSBmcm9tIGV4cGVuc2Ugc2hlZXQgY29udGV4dCB0byBjcmVhdGUgb3IgbGluayB0aWNrZXRzLlxuICBjb25zdCBvcGVuVGlja2V0c0Zyb21TaGVldCA9IHVzZUNhbGxiYWNrKFxuICAgIChhY3Rpb246IFwibmV3XCIgfCBcImxpbmtcIikgPT4ge1xuICAgICAgaWYgKCFjYW5DcmVhdGVFeHBlbnNlIHx8ICFzaGVldElkIHx8IGlzU2hlZXRMb2NrZWQpIHtcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcbiAgICAgICAgYWN0aW9uLFxuICAgICAgICBob2phR2FzdG9zSWQ6IHNoZWV0SWQsXG4gICAgICB9KTtcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKGAvR2FzdG9zL1RpY2tldHM/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFtjYW5DcmVhdGVFeHBlbnNlLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgaXNTaGVldExvY2tlZCwgb25Gb3JiaWRkZW4sIHNoZWV0SWRdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlT3BlbkNyZWF0ZVRpY2tldE1vZGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgb3BlblRpY2tldHNGcm9tU2hlZXQoXCJuZXdcIik7XG4gIH0sIFtvcGVuVGlja2V0c0Zyb21TaGVldF0pO1xuXG4gIGNvbnN0IGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBvcGVuVGlja2V0c0Zyb21TaGVldChcImxpbmtcIik7XG4gIH0sIFtvcGVuVGlja2V0c0Zyb21TaGVldF0pO1xuXG4gIGNvbnN0IG5hdmlnYXRlVG9DcmVhdGVkU2hlZXQgPSB1c2VDYWxsYmFjaygoY3JlYXRlZFNoZWV0SWQ6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHNhZmVDcmVhdGVkU2hlZXRJZCA9IHNhZmVUZXh0KGNyZWF0ZWRTaGVldElkKTtcbiAgICBpZiAoIXNhZmVDcmVhdGVkU2hlZXRJZCkgcmV0dXJuO1xuXG4gICAgY29uc3QgdGFyZ2V0VXJsID0gYC9HYXN0b3MvRXhwZW5zZVNoZWV0RGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlQ3JlYXRlZFNoZWV0SWQpfWA7XG4gICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwodGFyZ2V0VXJsKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IG5hdmlnYXRlVG9MaW5lRGV0YWlsID0gdXNlQ2FsbGJhY2soXG4gICAgKGxpbmVSZWNJZDogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBzYWZlTGluZUlkID0gc2FmZVRleHQobGluZVJlY0lkKTtcbiAgICAgIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQoc2hlZXRJZCk7XG4gICAgICBpZiAoIXNhZmVMaW5lSWQgfHwgIXNhZmVTaGVldElkKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IHRhcmdldFVybCA9IGAvR2FzdG9zL0V4cGVuc2VTaGVldExpbmVEZXRhaWw/aG9qYUdhc3Rvc0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVTaGVldElkKX0mbGluZVJlY0lkPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNhZmVMaW5lSWQpfWA7XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCh0YXJnZXRVcmwsIHtcbiAgICAgICAgYXNrQ29uZmlybWF0aW9uOiB0cnVlLFxuICAgICAgICBieXBhc3NHdWFyZE9uY2U6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbc2hlZXRJZF1cbiAgKTtcblxuICByZXR1cm4ge1xuICAgIGhlYWRlcixcbiAgICBsaW5lcyxcbiAgICBsaW5lUGFnZSxcbiAgICBpc0xvYWRpbmcsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGJ1c3ksXG4gICAgc3RhdHVzLFxuICAgIGlzRWRpdGluZyxcbiAgICBtb2RhbEVycm9yLFxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgZHJhZnRQcm9qZWN0SWQsXG4gICAgZHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgZHJhZnRFeGNoYW5nZVJhdGUsXG4gICAgZHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlLFxuICAgIGlzRXhjaGFuZ2VSYXRlTG9hZGluZyxcbiAgICBleGNoYW5nZVJhdGVNZXNzYWdlLFxuICAgIGV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yLFxuICAgIHByb2plY3RWYWx1ZSxcbiAgICB2b3VjaGVyVmFsdWUsXG4gICAgaXNTaGVldFBhaWQsXG4gICAgaXNTaGVldExvY2tlZCxcbiAgICBleGNoYW5nZVJhdGVWYWx1ZSxcbiAgICBzaG93RXhjaGFuZ2VSYXRlLFxuICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQ6IEVYQ0hBTkdFX1JBVEVfUkVGRVJFTkNFX0FNT1VOVCxcbiAgICBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSxcbiAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXG4gICAgc2V0TGluZVBhZ2UsXG4gICAgc2V0TGluZXMsXG4gICAgc2V0QnVzeSxcbiAgICBzZXRTdGF0dXMsXG4gICAgc2V0SXNFZGl0aW5nLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbixcbiAgICBzZXREcmFmdFByb2plY3RJZCxcbiAgICBzZXREcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgICBzZXREcmFmdEV4cGVuc2VTaGVldFN0YXR1cyxcbiAgICBzZXREcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxuICAgIGhhbmRsZUVuYWJsZUVkaXQsXG4gICAgaGFuZGxlQ2FuY2VsRWRpdCxcbiAgICBoYW5kbGVPcGVuQ3JlYXRlU2hlZXRNb2RlLFxuICAgIGhhbmRsZU9wZW5DcmVhdGVMaW5lTW9kZSxcbiAgICBoYW5kbGVPcGVuQ3JlYXRlVGlja2V0TW9kZSxcbiAgICBoYW5kbGVPcGVuTGlua1RpY2tldE1vZGUsXG4gICAgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldCxcbiAgICBuYXZpZ2F0ZVRvTGluZURldGFpbCxcbiAgfTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsZ0JBQThEOzs7QUNBOUQsSUFBQUMsZ0JBQWtCOzs7QUNBbEIsbUJBQWlGO0FBQ2pGLHVCQUE2QjtBQXlHckI7QUE3RlIsSUFBTSx3QkFBd0IsQ0FBQztBQUFBLEVBQzdCO0FBQUEsRUFDQTtBQUFBLEVBQ0EsWUFBWTtBQUFBLEVBQ1osaUJBQWlCO0FBQ25CLE1BQWtDO0FBQ2hDLFFBQU0sZ0NBQWdDO0FBQ3RDLFFBQU0sOEJBQThCO0FBQ3BDLFFBQU0sdUJBQXVCO0FB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Q0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsMEJBQTBCO0FBQUEsUUFDMUIsd0JBQXdCO0FBQUEsUUFDeEIsMkJBQTJCO0FBQUEsUUFDM0IsMkJBQTJCO0FBQUEsUUFDM0IsaUNBQWlDO0FBQUEsUUFDakMsZ0NBQWdDO0FBQUE7QUFBQSxJQUNsQyxJQUNFO0FBQUEsSUFFSCxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQyxlQUM1RDtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUNBLGNBQWMsU0FBUyxRQUFRLFlBQVk7QUFBQSxRQUMzQztBQUFBLFFBQ0E7QUFBQSxRQUNBLFlBQVksS0FBSyx1QkFBdUIsT0FBTztBQUFBLFFBQy9DLFdBQVcsS0FBSyx5QkFBeUIsa0NBQWtDO0FBQUEsUUFDM0U7QUFBQSxRQUNBLGNBQWM7QUFBQSxRQUNkLGtCQUFrQjtBQUFBLFFBQ2xCLFlBQVk7QUFBQTtBQUFBLElBQ2QsSUFDRTtBQUFBLElBRUgsb0JBQW9CLENBQUMsZ0JBQWdCLENBQUMsZ0JBQ3JDO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxXQUFXLEtBQUssNkJBQTZCLGtCQUFrQjtBQUFBLFFBQy9ELE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLFFBQVE7QUFBQSxRQUNSLGVBQWUsS0FBSyw2QkFBNkIsa0JBQWtCO0FBQUEsUUFDbkUsV0FBVztBQUFBO0FBQUEsSUFDYixJQUNFO0FBQUEsS0FDTjtBQUVKO0FBR0EsSUFBTSx5QkFBeUIsTUFBTTtBQUNuQyxTQUNFLDZDQUFDLGdDQUNDLHVEQUFDLGlDQUE4QixHQUNqQztBQUVKO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsMEJBQXdCO0FBQ3hCLFFBQU0sU0FBUyxTQUFTLGVBQWUsMkJBQTJCO0FBQ2xFLE1BQUksQ0FBQyxPQUFRO0FBQ2IsbUJBQWlCLFFBQVEsNkNBQUMsMEJBQXVCLENBQUU7QUFDckQ7QUFFQSx1QkFBdUIsS0FBSztBQUU1QixJQUFPLGlDQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJSZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgInBheWxvYWQiLCAicmVzcG9uc2UiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
