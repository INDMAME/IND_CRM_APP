import {
  useExpenseSheetsFilterCache
} from "./chunks/chunk-6EXPA2EU.js";
import {
  ExpenseProjectFilterInput_default
} from "./chunks/chunk-TBAW2IDR.js";
import {
  useExpenseSheetQuickTicketFlow
} from "./chunks/chunk-CMCUB77M.js";
import {
  getExpenseSheetStatusOptions,
  getExpenseStatusLabel
} from "./chunks/chunk-ZN2XQFXY.js";
import "./chunks/chunk-LBAUQXUT.js";
import {
  FloatingActionButton_default
} from "./chunks/chunk-VE4CKH4K.js";
import "./chunks/chunk-6HMZLOGF.js";
import {
  ExpenseCurrencyFilterSelect_default,
  ExpenseCurrencyFlagIcon_default,
  ExpenseTimelineCard_default
} from "./chunks/chunk-TIY4XDZH.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-AGYAFSYB.js";
import {
  CompactPagination_default,
  useTimelineCardEffects
} from "./chunks/chunk-CKA2QG6P.js";
import {
  useOutsideClick
} from "./chunks/chunk-6YXFJB4W.js";
import {
  ExpenseReadOnlyField_default,
  ExpenseSectionDivider_default,
  executeExpenseMutation,
  isManagingOtherExpenseUser,
  parseDecimalInput,
  useExpenseTopbarCrudActions
} from "./chunks/chunk-TSBMOQWT.js";
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
} from "./chunks/chunk-FUOK7RBM.js";
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
} from "./chunks/chunk-YVGMYSYA.js";
import {
  VisitasPageProviders_default,
  useAuthContext
} from "./chunks/chunk-LADF6TNN.js";
import "./chunks/chunk-QGAYQR5R.js";
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
} from "./chunks/chunk-REMMAK3K.js";
import "./chunks/chunk-7SKLSV7K.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/gastos/detail/ExpenseSheetDetailPage.tsx
var import_react7 = __toESM(require_react());

// Web/wwwroot/react/src/components/commons/PageBottomActions.tsx
var import_react2 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// Web/wwwroot/react/src/hooks/usePageBottomActionsVisibility.ts
var import_react = __toESM(require_react());
var SCROLL_IDLE_DELAY_MS = 180;
var usePageBottomActionsVisibility = () => {
  const wrapperRef = (0, import_react.useRef)(null);
  const animationFrameRef = (0, import_react.useRef)(null);
  const scrollIdleTimeoutRef = (0, import_react.useRef)(null);
  const [isVisible, setIsVisible] = (0, import_react.useState)(true);
  const [reservedHeight, setReservedHeight] = (0, import_react.useState)(0);
  const measureHeight = (0, import_react.useEffectEvent)(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const nextHeight = Math.ceil(wrapper.getBoundingClientRect().height);
    setReservedHeight((previous) => Math.abs(previous - nextHeight) < 1 ? previous : nextHeight);
  });
  const scheduleMeasure = (0, import_react.useEffectEvent)(() => {
    if (typeof window === "undefined") return;
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;
      measureHeight();
    });
  });
  (0, import_react.useLayoutEffect)(() => {
    measureHeight();
    if (typeof ResizeObserver === "undefined") return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const observer = new ResizeObserver(() => {
      scheduleMeasure();
    });
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);
  (0, import_react.useEffect)(() => {
    if (typeof window === "undefined") return;
    const handleMotion = () => {
      setIsVisible(false);
      if (scrollIdleTimeoutRef.current !== null) {
        window.clearTimeout(scrollIdleTimeoutRef.current);
      }
      scrollIdleTimeoutRef.current = window.setTimeout(() => {
        scrollIdleTimeoutRef.current = null;
        scheduleMeasure();
        setIsVisible(true);
      }, SCROLL_IDLE_DELAY_MS);
    };
    const handleResize = () => {
      scheduleMeasure();
    };
    window.addEventListener("scroll", handleMotion, { capture: true, passive: true });
    window.addEventListener("wheel", handleMotion, { passive: true });
    window.addEventListener("touchmove", handleMotion, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("scroll", handleMotion, true);
      window.removeEventListener("wheel", handleMotion);
      window.removeEventListener("touchmove", handleMotion);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (scrollIdleTimeoutRef.current !== null) {
        window.clearTimeout(scrollIdleTimeoutRef.current);
      }
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  return {
    isVisible,
    reservedHeight,
    wrapperRef
  };
};

// Web/wwwroot/react/src/components/commons/PageBottomActions.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var MAX_PAGE_BOTTOM_ACTIONS = 4;
var PageBottomActionButton = ({
  label,
  disabled = false,
  onClick,
  className,
  ariaLabel,
  type = "button",
  tabIndex,
  fullWidth = false
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "button",
    {
      type,
      disabled,
      onClick,
      "aria-label": ariaLabel || label,
      tabIndex,
      className: classNames(
        "relative inline-block w-full overflow-hidden rounded-[5px] disabled:cursor-not-allowed disabled:opacity-60",
        fullWidth ? "col-span-2" : "",
        className || ""
      ),
      style: { padding: "5.3px 0" },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            "aria-hidden": "true",
            className: "absolute bottom-[-11px] right-[-125%] z-0 h-[50%] w-[150%] rounded-md opacity-70 animate-star-movement-bottom",
            style: { background: "radial-gradient(circle, rgba(0, 41, 107, 0.65), transparent 12%)", animationDuration: "2.5s" }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            "aria-hidden": "true",
            className: "absolute top-[-10px] left-[-125%] z-0 h-[50%] w-[150%] rounded-md opacity-70 animate-star-movement-top",
            style: { background: "radial-gradient(circle, rgba(0, 41, 107, 0.65), transparent 12%)", animationDuration: "2.5s" }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "primary-btn relative z-10 flex w-full items-center justify-center rounded-[5px] border border-[#001f4d]/70 bg-gradient-to-b from-[#00296b] to-[#001f4d] px-3 py-[12px] text-center text-[13px] text-white sm:px-4 sm:text-[14px]", children: label })
      ]
    }
  );
};
PageBottomActionButton.displayName = "PageBottomActionButton";
var PageBottomActions = ({ children, ariaLabel, className }) => {
  const actionButtons = import_react2.Children.toArray(children).filter(
    (child) => (0, import_react2.isValidElement)(child) && child.type === PageBottomActionButton
  ).slice(0, MAX_PAGE_BOTTOM_ACTIONS);
  const actionCount = actionButtons.length;
  const { isVisible, reservedHeight, wrapperRef } = usePageBottomActionsVisibility();
  const portalTarget = typeof document === "undefined" ? null : document.body;
  if (actionCount < 1) {
    return null;
  }
  const actionBar = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      ref: wrapperRef,
      "aria-hidden": !isVisible,
      className: classNames(
        "fixed inset-x-0 bottom-0 z-1900 transition-[opacity,transform] duration-200 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto max-w-[1140px] px-4 sm:px-6", style: { paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          role: "toolbar",
          "aria-label": ariaLabel,
          className: classNames("pointer-events-auto rounded-[5px] border border-slate-200/80 bg-white/95 p-2 shadow-2xl backdrop-blur-md", className || ""),
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid grid-cols-2 gap-2", children: actionButtons.map((child, index) => {
            const shouldUseFullWidth = actionCount === 1 || actionCount % 2 === 1 && index === actionCount - 1;
            return (0, import_react2.cloneElement)(child, {
              fullWidth: shouldUseFullWidth,
              tabIndex: isVisible ? child.props.tabIndex : -1,
              key: child.key ?? `page-bottom-action-${index}`
            });
          }) })
        }
      ) })
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "aria-hidden": "true", style: { height: `${reservedHeight}px` } }),
    portalTarget ? (0, import_react_dom.createPortal)(actionBar, portalTarget) : null
  ] });
};
var PageBottomActions_default = PageBottomActions;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseSheetHeaderForm.tsx
var import_react4 = __toESM(require_react());

// Web/wwwroot/react/src/components/commons/InfoPopoverIconButton.tsx
var import_react3 = __toESM(require_react());
var import_react_dom2 = __toESM(require_react_dom());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
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
  const [isOpen, setIsOpen] = (0, import_react3.useState)(false);
  const [panelStyle, setPanelStyle] = (0, import_react3.useState)({
    position: "fixed",
    top: 0,
    left: 0,
    visibility: "hidden"
  });
  const buttonRef = (0, import_react3.useRef)(null);
  const panelRef = (0, import_react3.useRef)(null);
  useOutsideClick([buttonRef, panelRef], () => setIsOpen(false));
  const updatePanelPosition = (0, import_react3.useCallback)(() => {
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
  (0, import_react3.useLayoutEffect)(() => {
    if (!isOpen) {
      return;
    }
    updatePanelPosition();
  }, [isOpen, content, updatePanelPosition]);
  (0, import_react3.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: classNames("inline-flex", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
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
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: "4", y: "4", width: "16", height: "16", rx: "3", ry: "3" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M12 9h.01" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M11 12h1v4h1" })
            ]
          }
        )
      }
    ),
    isOpen && portalTarget ? (0, import_react_dom2.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "div",
        {
          ref: panelRef,
          role: "dialog",
          style: { ...panelStyle, borderRadius: GLOBAL_RADIUS },
          className: classNames(
            "z-360000 min-w-[220px] max-w-[calc(100vw-1rem)] rounded-[var(--radius-xl)] border border-slate-200 bg-white p-3 shadow-lg",
            panelClassName
          ),
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-[12px] text-slate-700 whitespace-pre-line", children: content })
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
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var EXCHANGE_RATE_MODE_PREFIX_PATTERN = /^T\.?C\.?\s*/i;
var ExpenseSheetHeaderForm = ({
  isCreateMode,
  isEditing,
  canEditHeaderFields,
  canEditStatus,
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
  const statusOptions = import_react4.default.useMemo(() => getExpenseSheetStatusOptions(), []);
  const statusDraftValue = String(Number.isInteger(draftExpenseSheetStatus) ? draftExpenseSheetStatus : 0);
  const statusCommentValue = safeText(header.estadoComentarios);
  const showStatusCommentField = !isCreateMode && (isEditing && canEditStatus || !!statusCommentValue);
  const localCurrencyOptions = import_react4.default.useMemo(
    () => [
      {
        value: baseCurrencyCode,
        text: baseCurrencyCode,
        icon: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ExpenseCurrencyFlagIcon_default, { currencyCode: baseCurrencyCode, sizeClassName: "h-6 w-6" })
      }
    ],
    [baseCurrencyCode]
  );
  const headerCurrencyOptions = import_react4.default.useMemo(
    () => [
      {
        value: headerCurrencyCode || "-",
        text: headerCurrencyCode || "-",
        icon: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ExpenseCurrencyFlagIcon_default, { currencyCode: headerCurrencyCode || "-", sizeClassName: "h-6 w-6" })
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
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("section", { className: "relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-2xl", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
    !isCreateMode ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      ExpenseReadOnlyField_default,
      {
        label: indT("ExpenseSheets_Field_SheetId", "Expense sheet code"),
        value: safeText(header.hojaGastosId) || "-"
      }
    ) : null,
    !isCreateMode ? isEditing && canEditStatus ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
    ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_Status", "Status"), value: statusValue }) : null,
    showStatusCommentField ? isEditing && canEditStatus ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "md:col-span-2 space-y-1.5", children: [
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
    isEditing && canEditHeaderFields ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "sm:col-span-2 space-y-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: `grid gap-4 ${isForeignCurrency ? "grid-cols-2" : "grid-cols-1"}`.trim(), children: isForeignCurrency ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "form-label font-semibold", children: expenseCurrencyLabel }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "relative space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "form-label pr-8 font-semibold", children: indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate") }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            InfoPopoverIconButton_default,
            {
              ariaLabel: indT("ExpenseSheets_ExchangeRate_InfoPopover_Aria", "Show exchange rate information"),
              content: exchangeRateInfoMessage,
              className: "absolute right-0 -top-1 z-20"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
      isForeignCurrency ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: "form-label font-semibold", children: indT("ExpenseSheets_Field_Amount", "Amount") }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
      isForeignCurrency && exchangeRateValidationMessage ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-danger text-sm", children: exchangeRateValidationMessage }) : null
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
    !isEditing && showExchangeRate ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ExpenseReadOnlyField_default, { label: indT("ExpenseSheets_Field_ExchangeRate", "Exchange rate"), value: exchangeRateValue }) : null,
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

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetDetailMutations.ts
var import_react5 = __toESM(require_react());
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
  const handleUpdate = (0, import_react5.useCallback)(async () => {
    if (busy || !isEditing) return false;
    if (!isCreateMode && isEditLocked) return false;
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
    isEditLocked,
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
  const handleDelete = (0, import_react5.useCallback)(async () => {
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
var import_react6 = __toESM(require_react());
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
  canEditExpense,
  canEditHeaderFields,
  canEditApprovedStatus,
  sheetId,
  isCreateMode,
  onForbidden
}) => {
  const [header, setHeader] = (0, import_react6.useState)(null);
  const [lines, setLines] = (0, import_react6.useState)([]);
  const [linePage, setLinePage] = (0, import_react6.useState)(1);
  const [isLoading, setIsLoading] = (0, import_react6.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react6.useState)("");
  const [busy, setBusy] = (0, import_react6.useState)(false);
  const [status, setStatus] = (0, import_react6.useState)("");
  const [isEditing, setIsEditing] = (0, import_react6.useState)(false);
  const [modalError, setModalError] = (0, import_react6.useState)("");
  const [draftDescription, setDraftDescription] = (0, import_react6.useState)("");
  const [draftProjectId, setDraftProjectId] = (0, import_react6.useState)("");
  const [draftCurrencyCode, setDraftCurrencyCode] = (0, import_react6.useState)("");
  const [draftExchangeRate, setDraftExchangeRate] = (0, import_react6.useState)("");
  const [draftExpenseSheetStatus, setDraftExpenseSheetStatus] = (0, import_react6.useState)(0);
  const [draftEstadoComentarios, setDraftEstadoComentarios] = (0, import_react6.useState)("");
  const [defaultCurrencyCode, setDefaultCurrencyCode] = (0, import_react6.useState)("");
  const [isExchangeRateLoading, setIsExchangeRateLoading] = (0, import_react6.useState)(false);
  const [exchangeRateMessage, setExchangeRateMessage] = (0, import_react6.useState)("");
  const [exchangeRateMessageIsError, setExchangeRateMessageIsError] = (0, import_react6.useState)(false);
  const [officialExchangeRateValue, setOfficialExchangeRateValue] = (0, import_react6.useState)("");
  const [officialExchangeRateRawValue, setOfficialExchangeRateRawValue] = (0, import_react6.useState)("");
  const [officialExchangeRateDate, setOfficialExchangeRateDate] = (0, import_react6.useState)("");
  const [officialExchangeRateSource, setOfficialExchangeRateSource] = (0, import_react6.useState)("");
  const hydrateDraftFromHeader = (0, import_react6.useCallback)((nextHeader) => {
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
  (0, import_react6.useEffect)(() => {
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
  (0, import_react6.useEffect)(() => {
    if (!header || isEditing) return;
    hydrateDraftFromHeader(header);
  }, [header, hydrateDraftFromHeader, isEditing]);
  (0, import_react6.useEffect)(() => {
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
  const hasActiveProcess = (0, import_react6.useMemo)(() => busy || isEditing, [busy, isEditing]);
  (0, import_react6.useEffect)(() => {
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
  const isSheetLocked = isSheetApproved || isSheetPaid;
  const isSheetEditLocked = isSheetPaid || isSheetApproved && !canEditApprovedStatus;
  const canEditHeaderFieldsCurrent = canEditHeaderFields && !isSheetApproved && !isSheetPaid;
  const hasLines = lines.length > 0;
  const exchangeRateValue = formatExpenseInputNumber(safeText(header?.exchRate), {
    minimumFractionDigits: EXCHANGE_RATE_DECIMAL_DIGITS,
    maximumFractionDigits: EXCHANGE_RATE_DECIMAL_DIGITS,
    useGrouping: true,
    fallback: ""
  });
  const showExchangeRate = (0, import_react6.useMemo)(() => shouldShowExchangeRate(exchangeRateValue), [exchangeRateValue]);
  const normalizedDraftCurrency = (0, import_react6.useMemo)(() => draftCurrencyCode.trim().toUpperCase(), [draftCurrencyCode]);
  const normalizedDefaultCurrency = (0, import_react6.useMemo)(() => safeText(defaultCurrencyCode).toUpperCase(), [defaultCurrencyCode]);
  const exchangeRateBaseCurrency = normalizedDefaultCurrency || "EUR";
  const uiLocale = (0, import_react6.useMemo)(() => {
    if (typeof document === "undefined") return "es-ES";
    return safeText(document.documentElement?.lang) || "es-ES";
  }, []);
  const formExchangeDate = (0, import_react6.useMemo)(() => {
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
  (0, import_react6.useEffect)(() => {
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
  const handleEnableEdit = (0, import_react6.useCallback)(() => {
    if (isCreateMode || isLoading || !header || isSheetEditLocked) {
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
  }, [canEditExpense, header, hydrateDraftFromHeader, isCreateMode, isLoading, isSheetEditLocked, onForbidden]);
  const handleCancelEdit = (0, import_react6.useCallback)(() => {
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
  const handleOpenCreateSheetMode = (0, import_react6.useCallback)(() => {
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
  const handleOpenCreateLineMode = (0, import_react6.useCallback)(() => {
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
  const openTicketsFromSheet = (0, import_react6.useCallback)(
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
  const handleOpenCreateTicketMode = (0, import_react6.useCallback)(() => {
    openTicketsFromSheet("new");
  }, [openTicketsFromSheet]);
  const handleOpenLinkTicketMode = (0, import_react6.useCallback)(() => {
    openTicketsFromSheet("link");
  }, [openTicketsFromSheet]);
  const navigateToCreatedSheet = (0, import_react6.useCallback)((createdSheetId) => {
    const safeCreatedSheetId = safeText(createdSheetId);
    if (!safeCreatedSheetId) return;
    const targetUrl = `/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(safeCreatedSheetId)}`;
    navigateToExpenseUrl(targetUrl);
  }, []);
  const navigateToLineDetail = (0, import_react6.useCallback)(
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
    isSheetApproved,
    isSheetPaid,
    isSheetLocked,
    isSheetEditLocked,
    exchangeRateValue,
    showExchangeRate,
    normalizedDraftCurrency,
    exchangeRateBaseCurrency,
    exchangeRateReferenceAmount: EXCHANGE_RATE_REFERENCE_AMOUNT,
    exchangeRateValidationMessage,
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
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var LINES_PAGE_SIZE = 6;
var DETAIL_FAB_BOTTOM_WITH_ACTION_BAR = 176;
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
var NewTicketIcon = () => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true", className: "h-5 w-5", children: [
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 20h-5a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v2" }),
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14.362 11.15a3 3 0 1 0 -4.144 4.263" }),
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 21v-4a2 2 0 1 1 4 0v4" }),
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M14 19h4" }),
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 15v6" })
] });
var LinkTicketIcon = () => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true", className: "h-5 w-5", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" }) });
var NewLineIcon = () => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, "aria-hidden": "true", className: "h-5 w-5", children: [
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 19c3.333 -2 5 -4 5 -6c0 -3 -1 -3 -2 -3s-2.032 1.085 -2 3c.034 2.048 1.658 2.877 2.5 4c1.5 2 2.5 2.5 3.5 1c.667 -1 1.167 -1.833 1.5 -2.5c1 2.333 2.333 3.5 4 3.5h2.5" }),
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2" }),
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M16 7h4" })
] });
var ExpenseSheetStatusMockupActions = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(PageBottomActions_default, { ariaLabel: indT("ExpenseSheets_BottomActions_Toolbar", "Expense sheet status actions"), children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(PageBottomActionButton, { label: indT("ExpenseSheets_BottomActions_Approve", "Approve") }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(PageBottomActionButton, { label: indT("ExpenseSheets_BottomActions_Reject", "Reject") }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(PageBottomActionButton, { label: indT("ExpenseSheets_BottomActions_UndoApproval", "Undo approval") }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(PageBottomActionButton, { label: indT("ExpenseSheets_BottomActions_UndoRejection", "Undo rejection") })
  ] });
};
var ExpenseSheetDetailPageContent = () => {
  const { allowSelfManagement, canManageOtherUsers, currentAxUserId, selectedManagedUserId, managementBootstrapReady } = useAuthContext();
  const hasAccess = canAccess("GASTOS_HOJA_GASTO", "View");
  const canEditExpenseByModule = canAccess("GASTOS_HOJA_GASTO", "Edit");
  const canDeleteExpense = canAccess("GASTOS_HOJA_GASTO", "FullAccess");
  const canCreateExpense = canAccess("GASTOS_HOJA_GASTO", "Add");
  const sheetId = safeText(window.__EXPENSE_SHEET_ID__);
  const sheetMode = safeText(window.__EXPENSE_SHEET_MODE__).toLowerCase();
  const isCreateMode = sheetMode === "create";
  const isManagingOtherUser = isManagingOtherExpenseUser({
    canManageOtherUsers,
    currentAxUserId,
    selectedManagedUserId,
    isCreateMode
  });
  const canCreateExpenseForCurrentView = canCreateExpense && !isManagingOtherUser;
  const canEditHeaderFields = canEditExpenseByModule && !isManagingOtherUser;
  const canDeleteExpenseForCurrentView = canDeleteExpense && !isManagingOtherUser;
  const canEditExpenseStatusByPermission = !isCreateMode && (allowSelfManagement === true && !isManagingOtherUser || canManageOtherUsers && isManagingOtherUser);
  const canEditExpense = canEditHeaderFields || canEditExpenseStatusByPermission;
  const lineContainerRef = (0, import_react7.useRef)(null);
  const createdSheetIdRef = (0, import_react7.useRef)("");
  const cameraInputRef = (0, import_react7.useRef)(null);
  const galleryInputRef = (0, import_react7.useRef)(null);
  const [isRedirectingAfterCreate, setIsRedirectingAfterCreate] = (0, import_react7.useState)(false);
  const paginationLabels = (0, import_react7.useMemo)(
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
    isSheetPaid,
    isSheetLocked,
    isSheetEditLocked,
    exchangeRateValue,
    showExchangeRate,
    normalizedDraftCurrency,
    exchangeRateBaseCurrency,
    exchangeRateReferenceAmount,
    exchangeRateValidationMessage,
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
    canEditApprovedStatus: canEditExpenseStatusByPermission,
    sheetId,
    isCreateMode,
    onForbidden: showPermissionModal
  });
  const canEditExpenseStatus = canEditExpenseStatusByPermission && !isSheetPaid;
  const { removeCachedSheet } = useExpenseSheetsFilterCache();
  const { modal, openConfirm, closeConfirm, handleConfirm } = useConfirmDialog({
    defaultConfirmText: indT("Confirm_Yes", "OK"),
    defaultCancelText: indT("Confirm_No", "Cancel")
  });
  const handleModalConfirm = (0, import_react7.useCallback)(async () => {
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
  const handleModalButtonConfirm = (0, import_react7.useCallback)(() => {
    if (!busy && modalError) {
      closeConfirm();
      return;
    }
    handleModalConfirm();
  }, [busy, closeConfirm, handleModalConfirm, modalError]);
  const visibleLines = (0, import_react7.useMemo)(() => pagedSlice(lines, linePage, LINES_PAGE_SIZE), [linePage, lines]);
  const totalLinePages = Math.ceil((lines.length || 0) / LINES_PAGE_SIZE);
  const totalAmountText = (0, import_react7.useMemo)(
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
    isEditLocked: isSheetEditLocked,
    isDeleteLocked: isSheetLocked,
    isCurrencyLockedByLines,
    isExchangeRateLockedByLines,
    lockedCurrencyCode: safeText(header?.currencyCode),
    lockedExchangeRate: safeText(header?.exchRate),
    canCreateExpense: canCreateExpenseForCurrentView,
    canEditExpense,
    canDeleteExpense: canDeleteExpenseForCurrentView,
    canEditHeaderFields: canEditHeaderFieldsCurrent,
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
  const handleSaveSuccess = (0, import_react7.useCallback)(() => {
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
    isEditLocked: isSheetEditLocked,
    isDeleteLocked: isSheetLocked,
    permissionsReady: managementBootstrapReady,
    canCreateExpense: canCreateExpenseForCurrentView,
    canEditExpense,
    canDeleteExpense: canDeleteExpenseForCurrentView,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
    handleUpdate,
    handleDelete,
    onSaveSuccess: handleSaveSuccess,
    onDeleteSuccess: () => {
      removeCachedSheet(safeText(header?.hojaGastosId || sheetId));
      navigateToExpenseUrl("/Gastos/ExpenseSheets");
    },
    openConfirm,
    closeConfirm
  });
  const resolveClickableCard = (0, import_react7.useCallback)((target) => {
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
  const fabMenuItems = (0, import_react7.useMemo)(
    () => [
      {
        id: "new-ticket",
        label: indT("ExpenseSheets_Fab_NewTicket", "Nuevo Ticket"),
        icon: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(NewTicketIcon, {}),
        onClick: openSourcePicker
      },
      {
        id: "link-ticket",
        label: indT("ExpenseSheets_Fab_LinkTicket", "Vincular Ticket"),
        icon: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(LinkTicketIcon, {}),
        onClick: handleOpenLinkTicketMode
      },
      {
        id: "new-line",
        label: indT("ExpenseSheets_Fab_NewLine", "Nueva Linea"),
        icon: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(NewLineIcon, {}),
        onClick: handleOpenCreateLineMode
      }
    ],
    [handleOpenCreateLineMode, handleOpenLinkTicketMode, openSourcePicker]
  );
  const showMockupBottomActions = !isCreateMode && !isLoading && !isRedirectingAfterCreate && !errorMessage;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "space-y-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
    sourcePickerOpen ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/45 px-4 py-6", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-xl", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h3", { className: "text-[16px] font-semibold text-slate-800", children: indT("ExpenseSheets_NewTicket_Source_Title", "Nuevo ticket") }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "mt-1 text-sm text-slate-600", children: indT(
        "ExpenseSheets_NewTicket_Source_Body",
        "Selecciona una fuente para capturar o elegir la imagen del ticket."
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "mt-4 grid grid-cols-1 gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "button",
          {
            type: "button",
            className: "ind-action-btn w-full px-3 py-2 text-sm",
            onClick: () => selectFromGallery(galleryInputRef.current),
            children: indT("ExpenseSheets_NewTicket_Source_Gallery", "Elegir imagen")
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
    quickTicketBusy ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/35 px-4", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "glass-panel shadow-card flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-sm text-slate-700", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Spinner_default, { size: "h-5 w-5", label: indT("Common_Loading", "Loading") }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: quickTicketProgressMessage || indT("Common_Loading", "Loading") })
    ] }) }) : null,
    quickTicketErrorMessage ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "glass-panel shadow-card space-y-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: quickTicketErrorMessage }),
      quickTicketTraceList.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "rounded-lg border border-rose-200 bg-white p-2 text-xs text-rose-700", children: quickTicketTraceList.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { children: `${entry.step}: ${entry.traceId}` }, `${entry.step}-${entry.at}`)) }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-wrap gap-2", children: [
        hasPendingUploadRetry ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "ind-action-btn px-3 py-1.5 text-xs", onClick: clearQuickTicketError, children: indT("Common_Close", "Close") })
      ] })
    ] }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
      "div",
      {
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700",
        style: { display: isLoading || isRedirectingAfterCreate ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ]
      }
    ),
    errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "text-danger", children: errorMessage }) : null,
    !isLoading && !isRedirectingAfterCreate && !errorMessage && header ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      ExpenseSheetHeaderForm_default,
      {
        isCreateMode,
        isEditing,
        canEditHeaderFields: canEditHeaderFieldsCurrent,
        canEditStatus: canEditExpenseStatus,
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
    !isCreateMode && !isLoading && !isRedirectingAfterCreate && !errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
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
    showMockupBottomActions ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ExpenseSheetStatusMockupActions, {}) : null,
    canCreateExpenseForCurrentView && !isCreateMode && !isSheetLocked ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      FloatingActionButton_default,
      {
        ariaLabel: indT("ExpenseSheets_Fab_Actions", "Acciones rapidas"),
        size: 76,
        right: 16,
        bottom: showMockupBottomActions ? DETAIL_FAB_BOTTOM_WITH_ACTION_BAR : 24,
        menuAriaLabel: indT("ExpenseSheets_Fab_Actions", "Acciones rapidas"),
        menuItems: fabMenuItems
      }
    ) : null
  ] });
};
var ExpenseSheetDetailPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(VisitasPageProviders_default, { enableExpenseManagement: true, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ExpenseSheetDetailPageContent, {}) });
};
var mount = () => {
  bootstrapExpenseApiAuth();
  const rootEl = document.getElementById("expense-sheet-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ExpenseSheetDetailPage, {}));
};
mountWhenDocumentReady(mount);
var ExpenseSheetDetailPage_default = ExpenseSheetDetailPage;
export {
  ExpenseSheetDetailPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvRXhwZW5zZVNoZWV0RGV0YWlsUGFnZS50c3giLCAiLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9QYWdlQm90dG9tQWN0aW9ucy50c3giLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eS50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVNoZWV0SGVhZGVyRm9ybS50c3giLCAiLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9JbmZvUG9wb3Zlckljb25CdXR0b24udHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29uc3RhbnRzL2V4Y2hhbmdlUmF0ZUVudHJ5TW9kZUNhdGFsb2cudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VMaW5lc1RpbWVsaW5lLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC91c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC91c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcbmltcG9ydCBDb25maXJtTW9kYWwgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db25maXJtTW9kYWwudHN4XCI7XG5pbXBvcnQgRmxvYXRpbmdBY3Rpb25CdXR0b24sIHsgdHlwZSBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcbmltcG9ydCBQYWdlQm90dG9tQWN0aW9ucywgeyBQYWdlQm90dG9tQWN0aW9uQnV0dG9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9QYWdlQm90dG9tQWN0aW9ucy50c3hcIjtcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU3Bpbm5lci50c3hcIjtcbmltcG9ydCB7IHVzZUF1dGhDb250ZXh0IH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRleHQvQXV0aENvbnRleHQudHN4XCI7XG5pbXBvcnQgeyB1c2VUaW1lbGluZUNhcmRFZmZlY3RzIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZVRpbWVsaW5lQ2FyZEVmZmVjdHMudHNcIjtcbmltcG9ydCB7IHVzZUNvbmZpcm1EaWFsb2cgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlQ29uZmlybURpYWxvZy50c1wiO1xuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldExpbmUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9FeHBlbnNlU2hlZXRIZWFkZXJGb3JtLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VMaW5lc1RpbWVsaW5lIGZyb20gXCIuLi9jb21wb25lbnRzL0V4cGVuc2VMaW5lc1RpbWVsaW5lLnRzeFwiO1xuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VOdW1iZXIgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xuaW1wb3J0IHsgY29uZmlndXJlRXhwZW5zZUFwaUF1dGggfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHsgaXNNYW5hZ2luZ090aGVyRXhwZW5zZVVzZXIgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU1hbmFnZWRVc2VyU2NvcGUudHNcIjtcbmltcG9ydCB7IG5hdmlnYXRlVG9FeHBlbnNlVXJsIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxNdXRhdGlvbnMudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXREZXRhaWxUb3BiYXJBY3Rpb25zLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXREZXRhaWxTdGF0ZSB9IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cgfSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cudHNcIjtcbmltcG9ydCB7IHVzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZSB9IGZyb20gXCIuLi9saXN0L3VzZUV4cGVuc2VTaGVldHNGaWx0ZXJDYWNoZS50c1wiO1xuXG5jb25zdCBMSU5FU19QQUdFX1NJWkUgPSA2O1xuY29uc3QgREVUQUlMX0ZBQl9CT1RUT01fV0lUSF9BQ1RJT05fQkFSID0gMTc2O1xuXG5jb25zdCBwYWdlZFNsaWNlID0gPFQsPihpdGVtczogVFtdLCBwYWdlOiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIpOiBUW10gPT4ge1xuICBpZiAoIWl0ZW1zLmxlbmd0aCkgcmV0dXJuIFtdO1xuICBjb25zdCBzYWZlUGFnZSA9IE1hdGgubWF4KDEsIHBhZ2UpO1xuICBjb25zdCBzdGFydCA9IChzYWZlUGFnZSAtIDEpICogcGFnZVNpemU7XG4gIHJldHVybiBpdGVtcy5zbGljZShzdGFydCwgc3RhcnQgKyBwYWdlU2l6ZSk7XG59O1xuXG4vLyBJbml0aWFsaXplcyBhdXRoIHNlZWQgZm9yIGV4cGVuc2UgQVBJIGNhbGxzIGJlZm9yZSBpc2xhbmQgZWZmZWN0cyBydW4uXG5jb25zdCBib290c3RyYXBFeHBlbnNlQXBpQXV0aCA9ICgpID0+IHtcbiAgY29uZmlndXJlRXhwZW5zZUFwaUF1dGgoe1xuICAgIHRva2VuOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfQVBJX1RPS0VOX18pLFxuICAgIGVudHJhT2lkOiBzYWZlVGV4dCh3aW5kb3cuX19JTkRfRU5UUkFfT0lEX18pLFxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHdpbmRvdy5fX0lORF9BUFBfQ09ERV9fKSxcbiAgfSk7XG59O1xuXG5jb25zdCBOZXdUaWNrZXRJY29uID0gKCkgPT4gKFxuICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPXsxLjV9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzTmFtZT1cImgtNSB3LTVcIj5cbiAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xMCAyMGgtNWEyIDIgMCAwIDEgLTIgLTJ2LTlhMiAyIDAgMCAxIDIgLTJoMWEyIDIgMCAwIDAgMiAtMmExIDEgMCAwIDEgMSAtMWg2YTEgMSAwIDAgMSAxIDFhMiAyIDAgMCAwIDIgMmgxYTIgMiAwIDAgMSAyIDJ2MlwiIC8+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQuMzYyIDExLjE1YTMgMyAwIDEgMCAtNC4xNDQgNC4yNjNcIiAvPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE0IDIxdi00YTIgMiAwIDEgMSA0IDB2NFwiIC8+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTQgMTloNFwiIC8+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMjEgMTV2NlwiIC8+XG4gIDwvc3ZnPlxuKTtcblxuY29uc3QgTGlua1RpY2tldEljb24gPSAoKSA9PiAoXG4gIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9ezEuNX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3NOYW1lPVwiaC01IHctNVwiPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTEzLjE5IDguNjg4YTQuNSA0LjUgMCAwIDEgMS4yNDIgNy4yNDRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMS02LjM2NC02LjM2NGwxLjc1Ny0xLjc1N20xMy4zNS0uNjIyIDEuNzU3LTEuNzU3YTQuNSA0LjUgMCAwIDAtNi4zNjQtNi4zNjRsLTQuNSA0LjVhNC41IDQuNSAwIDAgMCAxLjI0MiA3LjI0NFwiIC8+XG4gIDwvc3ZnPlxuKTtcblxuY29uc3QgTmV3TGluZUljb24gPSAoKSA9PiAoXG4gIDxzdmcgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9ezEuNX0gYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3NOYW1lPVwiaC01IHctNVwiPlxuICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTMgMTljMy4zMzMgLTIgNSAtNCA1IC02YzAgLTMgLTEgLTMgLTIgLTNzLTIuMDMyIDEuMDg1IC0yIDNjLjAzNCAyLjA0OCAxLjY1OCAyLjg3NyAyLjUgNGMxLjUgMiAyLjUgMi41IDMuNSAxYy42NjcgLTEgMS4xNjcgLTEuODMzIDEuNSAtMi41YzEgMi4zMzMgMi4zMzMgMy41IDQgMy41aDIuNVwiIC8+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMjAgMTd2LTEyYzAgLTEuMTIxIC0uODc5IC0yIC0yIC0ycy0yIC44NzkgLTIgMnYxMmwyIDJsMiAtMlwiIC8+XG4gICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTYgN2g0XCIgLz5cbiAgPC9zdmc+XG4pO1xuXG4vLyBSZW5kZXJzIHRoZSBzaGFyZWQgYm90dG9tIGFjdGlvbiBiYXIgbW9ja3VwIGZvciBleHBlbnNlIHNoZWV0IHN0YXR1cyBmbG93cy5cbmNvbnN0IEV4cGVuc2VTaGVldFN0YXR1c01vY2t1cEFjdGlvbnMgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFBhZ2VCb3R0b21BY3Rpb25zIGFyaWFMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfQm90dG9tQWN0aW9uc19Ub29sYmFyXCIsIFwiRXhwZW5zZSBzaGVldCBzdGF0dXMgYWN0aW9uc1wiKX0+XG4gICAgICA8UGFnZUJvdHRvbUFjdGlvbkJ1dHRvbiBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfQm90dG9tQWN0aW9uc19BcHByb3ZlXCIsIFwiQXBwcm92ZVwiKX0gLz5cbiAgICAgIDxQYWdlQm90dG9tQWN0aW9uQnV0dG9uIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19Cb3R0b21BY3Rpb25zX1JlamVjdFwiLCBcIlJlamVjdFwiKX0gLz5cbiAgICAgIDxQYWdlQm90dG9tQWN0aW9uQnV0dG9uIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19Cb3R0b21BY3Rpb25zX1VuZG9BcHByb3ZhbFwiLCBcIlVuZG8gYXBwcm92YWxcIil9IC8+XG4gICAgICA8UGFnZUJvdHRvbUFjdGlvbkJ1dHRvbiBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfQm90dG9tQWN0aW9uc19VbmRvUmVqZWN0aW9uXCIsIFwiVW5kbyByZWplY3Rpb25cIil9IC8+XG4gICAgPC9QYWdlQm90dG9tQWN0aW9ucz5cbiAgKTtcbn07XG5cbmNvbnN0IEV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250ZW50ID0gKCkgPT4ge1xuICBjb25zdCB7IGFsbG93U2VsZk1hbmFnZW1lbnQsIGNhbk1hbmFnZU90aGVyVXNlcnMsIGN1cnJlbnRBeFVzZXJJZCwgc2VsZWN0ZWRNYW5hZ2VkVXNlcklkLCBtYW5hZ2VtZW50Qm9vdHN0cmFwUmVhZHkgfSA9XG4gICAgdXNlQXV0aENvbnRleHQoKTtcbiAgY29uc3QgaGFzQWNjZXNzID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJWaWV3XCIpO1xuICBjb25zdCBjYW5FZGl0RXhwZW5zZUJ5TW9kdWxlID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJFZGl0XCIpO1xuICBjb25zdCBjYW5EZWxldGVFeHBlbnNlID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJGdWxsQWNjZXNzXCIpO1xuICBjb25zdCBjYW5DcmVhdGVFeHBlbnNlID0gY2FuQWNjZXNzKFwiR0FTVE9TX0hPSkFfR0FTVE9cIiwgXCJBZGRcIik7XG4gIGNvbnN0IHNoZWV0SWQgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1NIRUVUX0lEX18pO1xuICBjb25zdCBzaGVldE1vZGUgPSBzYWZlVGV4dCh3aW5kb3cuX19FWFBFTlNFX1NIRUVUX01PREVfXykudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgaXNDcmVhdGVNb2RlID0gc2hlZXRNb2RlID09PSBcImNyZWF0ZVwiO1xuICBjb25zdCBpc01hbmFnaW5nT3RoZXJVc2VyID0gaXNNYW5hZ2luZ090aGVyRXhwZW5zZVVzZXIoe1xuICAgIGNhbk1hbmFnZU90aGVyVXNlcnMsXG4gICAgY3VycmVudEF4VXNlcklkLFxuICAgIHNlbGVjdGVkTWFuYWdlZFVzZXJJZCxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gIH0pO1xuICBjb25zdCBjYW5DcmVhdGVFeHBlbnNlRm9yQ3VycmVudFZpZXcgPSBjYW5DcmVhdGVFeHBlbnNlICYmICFpc01hbmFnaW5nT3RoZXJVc2VyO1xuICBjb25zdCBjYW5FZGl0SGVhZGVyRmllbGRzID0gY2FuRWRpdEV4cGVuc2VCeU1vZHVsZSAmJiAhaXNNYW5hZ2luZ090aGVyVXNlcjtcbiAgY29uc3QgY2FuRGVsZXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3ID0gY2FuRGVsZXRlRXhwZW5zZSAmJiAhaXNNYW5hZ2luZ090aGVyVXNlcjtcbiAgY29uc3QgY2FuRWRpdEV4cGVuc2VTdGF0dXNCeVBlcm1pc3Npb24gPVxuICAgICFpc0NyZWF0ZU1vZGUgJiYgKChhbGxvd1NlbGZNYW5hZ2VtZW50ID09PSB0cnVlICYmICFpc01hbmFnaW5nT3RoZXJVc2VyKSB8fCAoY2FuTWFuYWdlT3RoZXJVc2VycyAmJiBpc01hbmFnaW5nT3RoZXJVc2VyKSk7XG4gIGNvbnN0IGNhbkVkaXRFeHBlbnNlID0gY2FuRWRpdEhlYWRlckZpZWxkcyB8fCBjYW5FZGl0RXhwZW5zZVN0YXR1c0J5UGVybWlzc2lvbjtcbiAgY29uc3QgbGluZUNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBjcmVhdGVkU2hlZXRJZFJlZiA9IHVzZVJlZihcIlwiKTtcbiAgY29uc3QgY2FtZXJhSW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBnYWxsZXJ5SW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLCBzZXRJc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IHBhZ2luYXRpb25MYWJlbHMgPSB1c2VNZW1vKFxuICAgICgpID0+ICh7XG4gICAgICBmaXJzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9GaXJzdFwiLCBcIkZpcnN0XCIpLFxuICAgICAgcHJldjogaW5kVChcIkhpc3RvcnlfUGFnZV9QcmV2XCIsIFwiUHJldmlvdXNcIiksXG4gICAgICBuZXh0OiBpbmRUKFwiSGlzdG9yeV9QYWdlX05leHRcIiwgXCJOZXh0XCIpLFxuICAgICAgbGFzdDogaW5kVChcIkhpc3RvcnlfUGFnZV9MYXN0XCIsIFwiTGFzdFwiKSxcbiAgICB9KSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IHtcbiAgICBoZWFkZXIsXG4gICAgbGluZXMsXG4gICAgbGluZVBhZ2UsXG4gICAgaXNMb2FkaW5nLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBidXN5LFxuICAgIHN0YXR1cyxcbiAgICBpc0VkaXRpbmcsXG4gICAgbW9kYWxFcnJvcixcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0UHJvamVjdElkLFxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxuICAgIGRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzLFxuICAgIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSxcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSxcbiAgICBwcm9qZWN0VmFsdWUsXG4gICAgaXNTaGVldFBhaWQsXG4gICAgaXNTaGVldExvY2tlZCxcbiAgICBpc1NoZWV0RWRpdExvY2tlZCxcbiAgICBleGNoYW5nZVJhdGVWYWx1ZSxcbiAgICBzaG93RXhjaGFuZ2VSYXRlLFxuICAgIG5vcm1hbGl6ZWREcmFmdEN1cnJlbmN5LFxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgICBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQsXG4gICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXG4gICAgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXG4gICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxuICAgIHNldExpbmVQYWdlLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXG4gICAgc2V0RHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gICAgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlLFxuICAgIGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSxcbiAgICBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0LFxuICAgIG5hdmlnYXRlVG9MaW5lRGV0YWlsLFxuICB9ID0gdXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGUoe1xuICAgIGhhc0FjY2VzcyxcbiAgICBjYW5DcmVhdGVFeHBlbnNlOiBjYW5DcmVhdGVFeHBlbnNlRm9yQ3VycmVudFZpZXcsXG4gICAgY2FuRWRpdEV4cGVuc2UsXG4gICAgY2FuRWRpdEhlYWRlckZpZWxkcyxcbiAgICBjYW5FZGl0QXBwcm92ZWRTdGF0dXM6IGNhbkVkaXRFeHBlbnNlU3RhdHVzQnlQZXJtaXNzaW9uLFxuICAgIHNoZWV0SWQsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxuICB9KTtcblxuICBjb25zdCBjYW5FZGl0RXhwZW5zZVN0YXR1cyA9IGNhbkVkaXRFeHBlbnNlU3RhdHVzQnlQZXJtaXNzaW9uICYmICFpc1NoZWV0UGFpZDtcbiAgY29uc3QgeyByZW1vdmVDYWNoZWRTaGVldCB9ID0gdXNlRXhwZW5zZVNoZWV0c0ZpbHRlckNhY2hlKCk7XG5cbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XG4gICAgZGVmYXVsdENvbmZpcm1UZXh0OiBpbmRUKFwiQ29uZmlybV9ZZXNcIiwgXCJPS1wiKSxcbiAgICBkZWZhdWx0Q2FuY2VsVGV4dDogaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIiksXG4gIH0pO1xuXG4gIGNvbnN0IGhhbmRsZU1vZGFsQ29uZmlybSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgIGF3YWl0IGhhbmRsZUNvbmZpcm0oe1xuICAgICAgYnVzeSxcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcbiAgICAgICAgc2V0TW9kYWxFcnJvcihtc2cpO1xuICAgICAgICBzZXRTdGF0dXMobXNnKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0sIFtidXN5LCBoYW5kbGVDb25maXJtXSk7XG5cbiAgY29uc3QgbW9kYWxMb2FkaW5nVGV4dCA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XG4gIGNvbnN0IG1vZGFsQ2FuY2VsVGV4dCA9IG1vZGFsLmNhbmNlbFRleHQgfHwgaW5kVChcIkNvbmZpcm1fTm9cIiwgXCJDYW5jZWxcIik7XG4gIGNvbnN0IG1vZGFsQ29uZmlybVRleHQgPSBidXN5ID8gbW9kYWxMb2FkaW5nVGV4dCA6ICghYnVzeSAmJiBtb2RhbEVycm9yID8gaW5kVChcIkNvbW1vbl9PS1wiLCBcIk9LXCIpIDogKG1vZGFsLmNvbmZpcm1UZXh0IHx8IGluZFQoXCJDb25maXJtX1llc1wiLCBcIk9LXCIpKSk7XG5cbiAgY29uc3QgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghYnVzeSAmJiBtb2RhbEVycm9yKSB7IGNsb3NlQ29uZmlybSgpOyByZXR1cm47IH1cbiAgICBoYW5kbGVNb2RhbENvbmZpcm0oKTtcbiAgfSwgW2J1c3ksIGNsb3NlQ29uZmlybSwgaGFuZGxlTW9kYWxDb25maXJtLCBtb2RhbEVycm9yXSk7XG5cbiAgY29uc3QgdmlzaWJsZUxpbmVzID0gdXNlTWVtbygoKSA9PiBwYWdlZFNsaWNlKGxpbmVzLCBsaW5lUGFnZSwgTElORVNfUEFHRV9TSVpFKSwgW2xpbmVQYWdlLCBsaW5lc10pO1xuICBjb25zdCB0b3RhbExpbmVQYWdlcyA9IE1hdGguY2VpbCgobGluZXMubGVuZ3RoIHx8IDApIC8gTElORVNfUEFHRV9TSVpFKTtcbiAgY29uc3QgdG90YWxBbW91bnRUZXh0ID0gdXNlTWVtbyhcbiAgICAoKSA9PlxuICAgICAgZm9ybWF0RXhwZW5zZU51bWJlcihoZWFkZXI/LnRvdGFsQW1vdW50LCB7XG4gICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICAgICAgZmFsbGJhY2s6IFwiLVwiLFxuICAgICAgfSksXG4gICAgW2hlYWRlcj8udG90YWxBbW91bnRdXG4gICk7XG5cbiAgY29uc3QgeyBoYW5kbGVVcGRhdGUsIGhhbmRsZURlbGV0ZSB9ID0gdXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zKHtcbiAgICBidXN5LFxuICAgIGlzRWRpdGluZyxcbiAgICBpc0NyZWF0ZU1vZGUsXG4gICAgaXNFZGl0TG9ja2VkOiBpc1NoZWV0RWRpdExvY2tlZCxcbiAgICBpc0RlbGV0ZUxvY2tlZDogaXNTaGVldExvY2tlZCxcbiAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXG4gICAgbG9ja2VkQ3VycmVuY3lDb2RlOiBzYWZlVGV4dChoZWFkZXI/LmN1cnJlbmN5Q29kZSksXG4gICAgbG9ja2VkRXhjaGFuZ2VSYXRlOiBzYWZlVGV4dChoZWFkZXI/LmV4Y2hSYXRlKSxcbiAgICBjYW5DcmVhdGVFeHBlbnNlOiBjYW5DcmVhdGVFeHBlbnNlRm9yQ3VycmVudFZpZXcsXG4gICAgY2FuRWRpdEV4cGVuc2UsXG4gICAgY2FuRGVsZXRlRXhwZW5zZTogY2FuRGVsZXRlRXhwZW5zZUZvckN1cnJlbnRWaWV3LFxuICAgIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50LFxuICAgIGNhbkVkaXRTdGF0dXM6IGNhbkVkaXRFeHBlbnNlU3RhdHVzLFxuICAgIHNoZWV0SWQsXG4gICAgZHJhZnREZXNjcmlwdGlvbixcbiAgICBkcmFmdEN1cnJlbmN5Q29kZSxcbiAgICBkcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLFxuICAgIGRyYWZ0UHJvamVjdElkLFxuICAgIGRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzLFxuICAgIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXG4gICAgY3VycmVudEV4cGVuc2VTaGVldFN0YXR1czogaGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMsXG4gICAgY3VycmVudEV4Y2hhbmdlUmF0ZU1vZGU6IGhlYWRlcj8uZXhjaGFuZ2VSYXRlTW9kZSxcbiAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXG4gICAgb25DcmVhdGVTdWNjZXNzOiAoY3JlYXRlZFNoZWV0SWQpID0+IHtcbiAgICAgIGNyZWF0ZWRTaGVldElkUmVmLmN1cnJlbnQgPSBzYWZlVGV4dChjcmVhdGVkU2hlZXRJZCk7XG4gICAgfSxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzRWRpdGluZyxcbiAgfSk7XG5cbiAgY29uc3QgaGFuZGxlU2F2ZVN1Y2Nlc3MgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgY29uc3QgY3JlYXRlZFNoZWV0SWQgPSBzYWZlVGV4dChjcmVhdGVkU2hlZXRJZFJlZi5jdXJyZW50KTtcbiAgICAgIGlmICghY3JlYXRlZFNoZWV0SWQpIHJldHVybjtcbiAgICAgIHNldElzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSh0cnVlKTtcbiAgICAgIG5hdmlnYXRlVG9DcmVhdGVkU2hlZXQoY3JlYXRlZFNoZWV0SWQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfSwgW2lzQ3JlYXRlTW9kZSwgbmF2aWdhdGVUb0NyZWF0ZWRTaGVldF0pO1xuXG4gIHVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMoe1xuICAgIGJ1c3k6IGJ1c3kgfHwgaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlLFxuICAgIG1vZGFsT3BlbjogbW9kYWwub3BlbixcbiAgICBpc0VkaXRpbmcsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIGlzTG9ja2VkOiBpc1NoZWV0TG9ja2VkLFxuICAgIGlzRWRpdExvY2tlZDogaXNTaGVldEVkaXRMb2NrZWQsXG4gICAgaXNEZWxldGVMb2NrZWQ6IGlzU2hlZXRMb2NrZWQsXG4gICAgcGVybWlzc2lvbnNSZWFkeTogbWFuYWdlbWVudEJvb3RzdHJhcFJlYWR5LFxuICAgIGNhbkNyZWF0ZUV4cGVuc2U6IGNhbkNyZWF0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyxcbiAgICBjYW5FZGl0RXhwZW5zZSxcbiAgICBjYW5EZWxldGVFeHBlbnNlOiBjYW5EZWxldGVFeHBlbnNlRm9yQ3VycmVudFZpZXcsXG4gICAgc2V0TW9kYWxFcnJvcixcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlVXBkYXRlLFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgICBvblNhdmVTdWNjZXNzOiBoYW5kbGVTYXZlU3VjY2VzcyxcbiAgICBvbkRlbGV0ZVN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgIHJlbW92ZUNhY2hlZFNoZWV0KHNhZmVUZXh0KGhlYWRlcj8uaG9qYUdhc3Rvc0lkIHx8IHNoZWV0SWQpKTtcbiAgICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXRzXCIpO1xuICAgIH0sXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgY2xvc2VDb25maXJtLFxuICB9KTtcblxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGNhcmQgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiKTtcbiAgICBpZiAoIWNhcmQpIHJldHVybiBudWxsO1xuICAgIGlmICghbGluZUNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyhjYXJkKSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNhcmQ7XG4gIH0sIFtdKTtcblxuICB1c2VUaW1lbGluZUNhcmRFZmZlY3RzKHtcbiAgICBjb250YWluZXJSZWY6IGxpbmVDb250YWluZXJSZWYsXG4gICAgZXJyb3JNZXNzYWdlLFxuICAgIGl0ZW1zOiB2aXNpYmxlTGluZXMsXG4gICAgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsXG4gIH0pO1xuXG4gIGNvbnN0IHtcbiAgICBzb3VyY2VQaWNrZXJPcGVuLFxuICAgIGJ1c3k6IHF1aWNrVGlja2V0QnVzeSxcbiAgICBwcm9ncmVzc01lc3NhZ2U6IHF1aWNrVGlja2V0UHJvZ3Jlc3NNZXNzYWdlLFxuICAgIGVycm9yTWVzc2FnZTogcXVpY2tUaWNrZXRFcnJvck1lc3NhZ2UsXG4gICAgaGFzUGVuZGluZ1VwbG9hZFJldHJ5LFxuICAgIHRyYWNlTGlzdDogcXVpY2tUaWNrZXRUcmFjZUxpc3QsXG4gICAgb3BlblNvdXJjZVBpY2tlcixcbiAgICBjbG9zZVNvdXJjZVBpY2tlcixcbiAgICBzZWxlY3RGcm9tQ2FtZXJhLFxuICAgIHNlbGVjdEZyb21HYWxsZXJ5LFxuICAgIGhhbmRsZVNlbGVjdGVkRmlsZSxcbiAgICByZXRyeVBlbmRpbmdVcGxvYWQsXG4gICAgY2xlYXJFcnJvcjogY2xlYXJRdWlja1RpY2tldEVycm9yLFxuICB9ID0gdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93KHtcbiAgICBzaGVldElkOiBzYWZlVGV4dChoZWFkZXI/LmhvamFHYXN0b3NJZCB8fCBzaGVldElkKSxcbiAgICBwcm9qZWN0SWQ6IHByb2plY3RWYWx1ZSxcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGhlYWRlcj8uY3VycmVuY3lDb2RlKSxcbiAgICBjYW5DcmVhdGVFeHBlbnNlOiBjYW5DcmVhdGVFeHBlbnNlRm9yQ3VycmVudFZpZXcsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIGlzU2hlZXRMb2NrZWQsXG4gICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gICAgb25Db21wbGV0ZWQ6IChyZXN1bHQpID0+IHtcbiAgICAgIGNvbnN0IGNyZWF0ZWRGaWxlSWQgPSBzYWZlVGV4dChyZXN1bHQ/LmZpbGVJZCk7XG4gICAgICBpZiAoIWNyZWF0ZWRGaWxlSWQpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBjdXJyZW50U2hlZXRJZCA9IHNhZmVUZXh0KGhlYWRlcj8uaG9qYUdhc3Rvc0lkIHx8IHNoZWV0SWQpO1xuICAgICAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHtcbiAgICAgICAgZmlsZUlkOiBjcmVhdGVkRmlsZUlkLFxuICAgICAgICBtb2RlOiBcImVkaXRcIixcbiAgICAgICAgb3JpZ2luOiBcInNoZWV0LWNyZWF0ZVwiLFxuICAgICAgfSk7XG4gICAgICBpZiAoY3VycmVudFNoZWV0SWQpIHtcbiAgICAgICAgcXVlcnkuc2V0KFwic2hlZXRJZFwiLCBjdXJyZW50U2hlZXRJZCk7XG4gICAgICB9XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXREZXRhaWw/JHtxdWVyeS50b1N0cmluZygpfWApO1xuICAgIH0sXG4gIH0pO1xuXG4gIGNvbnN0IGZhYk1lbnVJdGVtcyA9IHVzZU1lbW88RmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbVtdPihcbiAgICAoKSA9PiBbXG4gICAgICB7XG4gICAgICAgIGlkOiBcIm5ldy10aWNrZXRcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9OZXdUaWNrZXRcIiwgXCJOdWV2byBUaWNrZXRcIiksXG4gICAgICAgIGljb246IDxOZXdUaWNrZXRJY29uIC8+LFxuICAgICAgICBvbkNsaWNrOiBvcGVuU291cmNlUGlja2VyLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6IFwibGluay10aWNrZXRcIixcbiAgICAgICAgbGFiZWw6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9MaW5rVGlja2V0XCIsIFwiVmluY3VsYXIgVGlja2V0XCIpLFxuICAgICAgICBpY29uOiA8TGlua1RpY2tldEljb24gLz4sXG4gICAgICAgIG9uQ2xpY2s6IGhhbmRsZU9wZW5MaW5rVGlja2V0TW9kZSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiBcIm5ldy1saW5lXCIsXG4gICAgICAgIGxhYmVsOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GYWJfTmV3TGluZVwiLCBcIk51ZXZhIExpbmVhXCIpLFxuICAgICAgICBpY29uOiA8TmV3TGluZUljb24gLz4sXG4gICAgICAgIG9uQ2xpY2s6IGhhbmRsZU9wZW5DcmVhdGVMaW5lTW9kZSxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBbaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlLCBoYW5kbGVPcGVuTGlua1RpY2tldE1vZGUsIG9wZW5Tb3VyY2VQaWNrZXJdXG4gICk7XG5cbiAgY29uc3Qgc2hvd01vY2t1cEJvdHRvbUFjdGlvbnMgPSAhaXNDcmVhdGVNb2RlICYmICFpc0xvYWRpbmcgJiYgIWlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSAmJiAhZXJyb3JNZXNzYWdlO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cbiAgICAgIDxDb25maXJtTW9kYWxcbiAgICAgICAgb3Blbj17bW9kYWwub3Blbn1cbiAgICAgICAgdGl0bGU9e21vZGFsLnRpdGxlfVxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxuICAgICAgICBjb25maXJtVGV4dD17bW9kYWxDb25maXJtVGV4dH1cbiAgICAgICAgY2FuY2VsVGV4dD17bW9kYWxDYW5jZWxUZXh0fVxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cbiAgICAgICAgc2hvd0NhbmNlbD17bW9kYWwuc2hvd0NhbmNlbH1cbiAgICAgICAgc2hvd0NvbmZpcm09e21vZGFsLnNob3dDb25maXJtfVxuICAgICAgICBidXN5PXtidXN5IHx8IGlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZX1cbiAgICAgICAgZXJyb3I9e21vZGFsRXJyb3J9XG4gICAgICAgIHN0YXR1cz17c3RhdHVzfVxuICAgICAgICBvbkNvbmZpcm09e2hhbmRsZU1vZGFsQnV0dG9uQ29uZmlybX1cbiAgICAgICAgb25DYW5jZWw9e2Nsb3NlQ29uZmlybX1cbiAgICAgIC8+XG5cbiAgICAgIDxpbnB1dFxuICAgICAgICByZWY9e2NhbWVyYUlucHV0UmVmfVxuICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgIGFjY2VwdD1cImltYWdlL2pwZWcsaW1hZ2UvanBnLGltYWdlL3BuZyxpbWFnZS93ZWJwXCJcbiAgICAgICAgY2FwdHVyZT1cImVudmlyb25tZW50XCJcbiAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZpbGUgPSBldmVudC5jdXJyZW50VGFyZ2V0LmZpbGVzPy5bMF0gfHwgbnVsbDtcbiAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgICB2b2lkIGhhbmRsZVNlbGVjdGVkRmlsZShmaWxlLCBcImNhbWVyYVwiKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgICA8aW5wdXRcbiAgICAgICAgcmVmPXtnYWxsZXJ5SW5wdXRSZWZ9XG4gICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgYWNjZXB0PVwiaW1hZ2UvanBlZyxpbWFnZS9qcGcsaW1hZ2UvcG5nLGltYWdlL3dlYnBcIlxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgZmlsZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZmlsZXM/LlswXSB8fCBudWxsO1xuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUgPSBcIlwiO1xuICAgICAgICAgIHZvaWQgaGFuZGxlU2VsZWN0ZWRGaWxlKGZpbGUsIFwiZ2FsbGVyeVwiKTtcbiAgICAgICAgfX1cbiAgICAgIC8+XG5cbiAgICAgIHtzb3VyY2VQaWNrZXJPcGVuID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctc2xhdGUtOTUwLzQ1IHB4LTQgcHktNlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LXNtIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHAtNCBzaGFkb3cteGxcIj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LVsxNnB4XSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX1RpdGxlXCIsIFwiTnVldm8gdGlja2V0XCIpfVxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxuICAgICAgICAgICAgICB7aW5kVChcbiAgICAgICAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1NvdXJjZV9Cb2R5XCIsXG4gICAgICAgICAgICAgICAgXCJTZWxlY2Npb25hIHVuYSBmdWVudGUgcGFyYSBjYXB0dXJhciBvIGVsZWdpciBsYSBpbWFnZW4gZGVsIHRpY2tldC5cIlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgZ3JpZCBncmlkLWNvbHMtMSBnYXAtMlwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB2b2lkIHNlbGVjdEZyb21DYW1lcmEoY2FtZXJhSW5wdXRSZWYuY3VycmVudCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU291cmNlX0NhbWVyYVwiLCBcIlVzYXIgY2FtYXJhXCIpfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImluZC1hY3Rpb24tYnRuIHctZnVsbCBweC0zIHB5LTIgdGV4dC1zbVwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2VsZWN0RnJvbUdhbGxlcnkoZ2FsbGVyeUlucHV0UmVmLmN1cnJlbnQpfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Tb3VyY2VfR2FsbGVyeVwiLCBcIkVsZWdpciBpbWFnZW5cIil9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5kLWFjdGlvbi1idG4gdy1mdWxsIHB4LTMgcHktMiB0ZXh0LXNtXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtjbG9zZVNvdXJjZVBpY2tlcn1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cblxuICAgICAge3F1aWNrVGlja2V0QnVzeSA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNjAwMDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTk1MC8zNSBweC00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZS85NSBweC00IHB5LTMgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiPlxuICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNSB3LTVcIiBsYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0gLz5cbiAgICAgICAgICAgIDxzcGFuPntxdWlja1RpY2tldFByb2dyZXNzTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cblxuICAgICAge3F1aWNrVGlja2V0RXJyb3JNZXNzYWdlID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIHNwYWNlLXktMiByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXJvc2UtMjAwIGJnLXJvc2UtNTAgcC0zIHRleHQtc20gdGV4dC1yb3NlLTgwMFwiPlxuICAgICAgICAgIDxwPntxdWlja1RpY2tldEVycm9yTWVzc2FnZX08L3A+XG4gICAgICAgICAge3F1aWNrVGlja2V0VHJhY2VMaXN0Lmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1yb3NlLTIwMCBiZy13aGl0ZSBwLTIgdGV4dC14cyB0ZXh0LXJvc2UtNzAwXCI+XG4gICAgICAgICAgICAgIHtxdWlja1RpY2tldFRyYWNlTGlzdC5tYXAoKGVudHJ5KSA9PiAoXG4gICAgICAgICAgICAgICAgPHAga2V5PXtgJHtlbnRyeS5zdGVwfS0ke2VudHJ5LmF0fWB9PntgJHtlbnRyeS5zdGVwfTogJHtlbnRyeS50cmFjZUlkfWB9PC9wPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTJcIj5cbiAgICAgICAgICAgIHtoYXNQZW5kaW5nVXBsb2FkUmV0cnkgPyAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB2b2lkIHJldHJ5UGVuZGluZ1VwbG9hZCgpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1JldHJ5VXBsb2FkXCIsIFwiUmVpbnRlbnRhciB1cGxvYWRcIil9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJpbmQtYWN0aW9uLWJ0biBweC0zIHB5LTEuNSB0ZXh0LXhzXCIgb25DbGljaz17Y2xlYXJRdWlja1RpY2tldEVycm9yfT5cbiAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fQ2xvc2VcIiwgXCJDbG9zZVwiKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGlzTG9hZGluZyB8fCBpc1JlZGlyZWN0aW5nQWZ0ZXJDcmVhdGUgPyBcImZsZXhcIiA6IFwibm9uZVwiIH19XG4gICAgICA+XG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7ZXJyb3JNZXNzYWdlID8gPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntlcnJvck1lc3NhZ2V9PC9kaXY+IDogbnVsbH1cblxuICAgICAgeyFpc0xvYWRpbmcgJiYgIWlzUmVkaXJlY3RpbmdBZnRlckNyZWF0ZSAmJiAhZXJyb3JNZXNzYWdlICYmIGhlYWRlciA/IChcbiAgICAgICAgPEV4cGVuc2VTaGVldEhlYWRlckZvcm1cbiAgICAgICAgICBpc0NyZWF0ZU1vZGU9e2lzQ3JlYXRlTW9kZX1cbiAgICAgICAgICBpc0VkaXRpbmc9e2lzRWRpdGluZ31cbiAgICAgICAgICBjYW5FZGl0SGVhZGVyRmllbGRzPXtjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudH1cbiAgICAgICAgICBjYW5FZGl0U3RhdHVzPXtjYW5FZGl0RXhwZW5zZVN0YXR1c31cbiAgICAgICAgICBoZWFkZXI9e2hlYWRlcn1cbiAgICAgICAgICBwcm9qZWN0VmFsdWU9e3Byb2plY3RWYWx1ZX1cbiAgICAgICAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcz17aXNDdXJyZW5jeUxvY2tlZEJ5TGluZXN9XG4gICAgICAgICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzPXtpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXN9XG4gICAgICAgICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3k9e25vcm1hbGl6ZWREcmFmdEN1cnJlbmN5fVxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeT17ZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5fVxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudD17ZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50fVxuICAgICAgICAgIHNob3dFeGNoYW5nZVJhdGU9e3Nob3dFeGNoYW5nZVJhdGV9XG4gICAgICAgICAgZXhjaGFuZ2VSYXRlVmFsdWU9e2V4Y2hhbmdlUmF0ZVZhbHVlfVxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlPXtleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZX1cbiAgICAgICAgICB0b3RhbEFtb3VudFRleHQ9e3RvdGFsQW1vdW50VGV4dH1cbiAgICAgICAgICBkcmFmdERlc2NyaXB0aW9uPXtkcmFmdERlc2NyaXB0aW9ufVxuICAgICAgICAgIGRyYWZ0UHJvamVjdElkPXtkcmFmdFByb2plY3RJZH1cbiAgICAgICAgICBkcmFmdEN1cnJlbmN5Q29kZT17ZHJhZnRDdXJyZW5jeUNvZGV9XG4gICAgICAgICAgZHJhZnRFeGNoYW5nZVJhdGU9e2RyYWZ0RXhjaGFuZ2VSYXRlfVxuICAgICAgICAgIGRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzPXtkcmFmdEV4cGVuc2VTaGVldFN0YXR1c31cbiAgICAgICAgICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zPXtkcmFmdEVzdGFkb0NvbWVudGFyaW9zfVxuICAgICAgICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWU9e29mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWV9XG4gICAgICAgICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlPXtvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGV9XG4gICAgICAgICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2U9e29mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlfVxuICAgICAgICAgIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZT17c2V0RHJhZnREZXNjcmlwdGlvbn1cbiAgICAgICAgICBvbkRyYWZ0UHJvamVjdElkQ2hhbmdlPXtzZXREcmFmdFByb2plY3RJZH1cbiAgICAgICAgICBvbkRyYWZ0Q3VycmVuY3lDb2RlQ2hhbmdlPXtzZXREcmFmdEN1cnJlbmN5Q29kZX1cbiAgICAgICAgICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlPXtzZXREcmFmdEV4Y2hhbmdlUmF0ZX1cbiAgICAgICAgICBvbkRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzQ2hhbmdlPXtzZXREcmFmdEV4cGVuc2VTaGVldFN0YXR1c31cbiAgICAgICAgICBvbkRyYWZ0RXN0YWRvQ29tZW50YXJpb3NDaGFuZ2U9e3NldERyYWZ0RXN0YWRvQ29tZW50YXJpb3N9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgeyFpc0NyZWF0ZU1vZGUgJiYgIWlzTG9hZGluZyAmJiAhaXNSZWRpcmVjdGluZ0FmdGVyQ3JlYXRlICYmICFlcnJvck1lc3NhZ2UgPyAoXG4gICAgICAgIDxFeHBlbnNlTGluZXNUaW1lbGluZVxuICAgICAgICAgIHZpc2libGVMaW5lcz17dmlzaWJsZUxpbmVzfVxuICAgICAgICAgIGN1cnJlbmN5Q29kZT17c2FmZVRleHQoaGVhZGVyPy5jdXJyZW5jeUNvZGUpfVxuICAgICAgICAgIHRvdGFsTGluZVBhZ2VzPXt0b3RhbExpbmVQYWdlc31cbiAgICAgICAgICBsaW5lUGFnZT17bGluZVBhZ2V9XG4gICAgICAgICAgbGluZXNMYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfTGluZXNcIiwgXCJMaW5lc1wiKX1cbiAgICAgICAgICBlbXB0eVRleHQ9e2luZFQoXCJFeHBlbnNlU2hlZXRzX05vTGluZXNcIiwgXCJObyBsaW5lcyBmb3IgdGhpcyBleHBlbnNlIHNoZWV0LlwiKX1cbiAgICAgICAgICBwYWdpbmF0aW9uTGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxuICAgICAgICAgIGNvbnRhaW5lclJlZj17bGluZUNvbnRhaW5lclJlZn1cbiAgICAgICAgICBvbkxpbmVQYWdlQ2hhbmdlPXtzZXRMaW5lUGFnZX1cbiAgICAgICAgICBvbk9wZW5MaW5lPXtuYXZpZ2F0ZVRvTGluZURldGFpbH1cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuXG4gICAgICB7c2hvd01vY2t1cEJvdHRvbUFjdGlvbnMgPyAoXG4gICAgICAgIDxFeHBlbnNlU2hlZXRTdGF0dXNNb2NrdXBBY3Rpb25zIC8+XG4gICAgICApIDogbnVsbH1cblxuICAgICAge2NhbkNyZWF0ZUV4cGVuc2VGb3JDdXJyZW50VmlldyAmJiAhaXNDcmVhdGVNb2RlICYmICFpc1NoZWV0TG9ja2VkID8gKFxuICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b25cbiAgICAgICAgICBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgcmFwaWRhc1wiKX1cbiAgICAgICAgICBzaXplPXs3Nn1cbiAgICAgICAgICByaWdodD17MTZ9XG4gICAgICAgICAgYm90dG9tPXtzaG93TW9ja3VwQm90dG9tQWN0aW9ucyA/IERFVEFJTF9GQUJfQk9UVE9NX1dJVEhfQUNUSU9OX0JBUiA6IDI0fVxuICAgICAgICAgIG1lbnVBcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZhYl9BY3Rpb25zXCIsIFwiQWNjaW9uZXMgcmFwaWRhc1wiKX1cbiAgICAgICAgICBtZW51SXRlbXM9e2ZhYk1lbnVJdGVtc31cbiAgICAgICAgLz5cbiAgICAgICkgOiBudWxsfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuLy8gTWFpbiBwYWdlIGVudHJ5IGZvciBleHBlbnNlIHNoZWV0IGRldGFpbC5cbmNvbnN0IEV4cGVuc2VTaGVldERldGFpbFBhZ2UgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPFZpc2l0YXNQYWdlUHJvdmlkZXJzIGVuYWJsZUV4cGVuc2VNYW5hZ2VtZW50PlxuICAgICAgPEV4cGVuc2VTaGVldERldGFpbFBhZ2VDb250ZW50IC8+XG4gICAgPC9WaXNpdGFzUGFnZVByb3ZpZGVycz5cbiAgKTtcbn07XG5cbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xuICBib290c3RyYXBFeHBlbnNlQXBpQXV0aCgpO1xuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV4cGVuc2Utc2hlZXQtZGV0YWlsLXJvb3RcIik7XG4gIGlmICghcm9vdEVsKSByZXR1cm47XG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RXhwZW5zZVNoZWV0RGV0YWlsUGFnZSAvPik7XG59O1xuXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0RGV0YWlsUGFnZTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgQ2hpbGRyZW4sIGNsb25lRWxlbWVudCwgaXNWYWxpZEVsZW1lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCB7IHVzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eSB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VQYWdlQm90dG9tQWN0aW9uc1Zpc2liaWxpdHkudHNcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xuXG5jb25zdCBNQVhfUEFHRV9CT1RUT01fQUNUSU9OUyA9IDQ7XG5cbnR5cGUgUGFnZUJvdHRvbUFjdGlvbkJ1dHRvblByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIG9uQ2xpY2s/OiBSZWFjdC5Nb3VzZUV2ZW50SGFuZGxlcjxIVE1MQnV0dG9uRWxlbWVudD47XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgYXJpYUxhYmVsPzogc3RyaW5nO1xuICB0eXBlPzogXCJidXR0b25cIiB8IFwic3VibWl0XCIgfCBcInJlc2V0XCI7XG4gIHRhYkluZGV4PzogbnVtYmVyO1xuICBmdWxsV2lkdGg/OiBib29sZWFuO1xufTtcblxudHlwZSBQYWdlQm90dG9tQWN0aW9uc1Byb3BzID0ge1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xuICBhcmlhTGFiZWw6IHN0cmluZztcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xufTtcblxuLy8gRHVtYiBidXR0b24gdXNlZCBieSB0aGUgc2hhcmVkIGJvdHRvbSBhY3Rpb24gYmFyLlxuZXhwb3J0IGNvbnN0IFBhZ2VCb3R0b21BY3Rpb25CdXR0b24gPSAoe1xuICBsYWJlbCxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgb25DbGljayxcbiAgY2xhc3NOYW1lLFxuICBhcmlhTGFiZWwsXG4gIHR5cGUgPSBcImJ1dHRvblwiLFxuICB0YWJJbmRleCxcbiAgZnVsbFdpZHRoID0gZmFsc2UsXG59OiBQYWdlQm90dG9tQWN0aW9uQnV0dG9uUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8YnV0dG9uXG4gICAgICB0eXBlPXt0eXBlfVxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbCB8fCBsYWJlbH1cbiAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgXCJyZWxhdGl2ZSBpbmxpbmUtYmxvY2sgdy1mdWxsIG92ZXJmbG93LWhpZGRlbiByb3VuZGVkLVs1cHhdIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBkaXNhYmxlZDpvcGFjaXR5LTYwXCIsXG4gICAgICAgIGZ1bGxXaWR0aCA/IFwiY29sLXNwYW4tMlwiIDogXCJcIixcbiAgICAgICAgY2xhc3NOYW1lIHx8IFwiXCJcbiAgICAgICl9XG4gICAgICBzdHlsZT17eyBwYWRkaW5nOiBcIjUuM3B4IDBcIiB9fVxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLVstMTFweF0gcmlnaHQtWy0xMjUlXSB6LTAgaC1bNTAlXSB3LVsxNTAlXSByb3VuZGVkLW1kIG9wYWNpdHktNzAgYW5pbWF0ZS1zdGFyLW1vdmVtZW50LWJvdHRvbVwiXG4gICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwicmFkaWFsLWdyYWRpZW50KGNpcmNsZSwgcmdiYSgwLCA0MSwgMTA3LCAwLjY1KSwgdHJhbnNwYXJlbnQgMTIlKVwiLCBhbmltYXRpb25EdXJhdGlvbjogXCIyLjVzXCIgfX1cbiAgICAgIC8+XG4gICAgICA8ZGl2XG4gICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC1bLTEwcHhdIGxlZnQtWy0xMjUlXSB6LTAgaC1bNTAlXSB3LVsxNTAlXSByb3VuZGVkLW1kIG9wYWNpdHktNzAgYW5pbWF0ZS1zdGFyLW1vdmVtZW50LXRvcFwiXG4gICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmQ6IFwicmFkaWFsLWdyYWRpZW50KGNpcmNsZSwgcmdiYSgwLCA0MSwgMTA3LCAwLjY1KSwgdHJhbnNwYXJlbnQgMTIlKVwiLCBhbmltYXRpb25EdXJhdGlvbjogXCIyLjVzXCIgfX1cbiAgICAgIC8+XG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJwcmltYXJ5LWJ0biByZWxhdGl2ZSB6LTEwIGZsZXggdy1mdWxsIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVs1cHhdIGJvcmRlciBib3JkZXItWyMwMDFmNGRdLzcwIGJnLWdyYWRpZW50LXRvLWIgZnJvbS1bIzAwMjk2Yl0gdG8tWyMwMDFmNGRdIHB4LTMgcHktWzEycHhdIHRleHQtY2VudGVyIHRleHQtWzEzcHhdIHRleHQtd2hpdGUgc206cHgtNCBzbTp0ZXh0LVsxNHB4XVwiPlxuICAgICAgICB7bGFiZWx9XG4gICAgICA8L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICk7XG59O1xuXG5QYWdlQm90dG9tQWN0aW9uQnV0dG9uLmRpc3BsYXlOYW1lID0gXCJQYWdlQm90dG9tQWN0aW9uQnV0dG9uXCI7XG5cbi8vIEZpeGVkIGJvdHRvbSBhY3Rpb24gYmFyIHRoYXQgc3RheXMgdmlzaWJsZSB3aGVuIHRoZSBwYWdlIGlzIGlkbGUuXG5jb25zdCBQYWdlQm90dG9tQWN0aW9ucyA9ICh7IGNoaWxkcmVuLCBhcmlhTGFiZWwsIGNsYXNzTmFtZSB9OiBQYWdlQm90dG9tQWN0aW9uc1Byb3BzKSA9PiB7XG4gIGNvbnN0IGFjdGlvbkJ1dHRvbnMgPSBDaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKVxuICAgIC5maWx0ZXIoXG4gICAgICAoY2hpbGQpOiBjaGlsZCBpcyBSZWFjdC5SZWFjdEVsZW1lbnQ8UGFnZUJvdHRvbUFjdGlvbkJ1dHRvblByb3BzPiA9PlxuICAgICAgICBpc1ZhbGlkRWxlbWVudDxQYWdlQm90dG9tQWN0aW9uQnV0dG9uUHJvcHM+KGNoaWxkKSAmJiBjaGlsZC50eXBlID09PSBQYWdlQm90dG9tQWN0aW9uQnV0dG9uXG4gICAgKVxuICAgIC5zbGljZSgwLCBNQVhfUEFHRV9CT1RUT01fQUNUSU9OUyk7XG5cbiAgY29uc3QgYWN0aW9uQ291bnQgPSBhY3Rpb25CdXR0b25zLmxlbmd0aDtcbiAgY29uc3QgeyBpc1Zpc2libGUsIHJlc2VydmVkSGVpZ2h0LCB3cmFwcGVyUmVmIH0gPSB1c2VQYWdlQm90dG9tQWN0aW9uc1Zpc2liaWxpdHkoKTtcbiAgY29uc3QgcG9ydGFsVGFyZ2V0ID0gdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiID8gbnVsbCA6IGRvY3VtZW50LmJvZHk7XG5cbiAgaWYgKGFjdGlvbkNvdW50IDwgMSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgYWN0aW9uQmFyID0gKFxuICAgIDxkaXZcbiAgICAgIHJlZj17d3JhcHBlclJlZn1cbiAgICAgIGFyaWEtaGlkZGVuPXshaXNWaXNpYmxlfVxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICBcImZpeGVkIGluc2V0LXgtMCBib3R0b20tMCB6LTE5MDAgdHJhbnNpdGlvbi1bb3BhY2l0eSx0cmFuc2Zvcm1dIGR1cmF0aW9uLTIwMCBlYXNlLW91dFwiLFxuICAgICAgICBpc1Zpc2libGUgPyBcInRyYW5zbGF0ZS15LTAgb3BhY2l0eS0xMDBcIiA6IFwicG9pbnRlci1ldmVudHMtbm9uZSB0cmFuc2xhdGUteS02IG9wYWNpdHktMFwiXG4gICAgICApfVxuICAgID5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXgtYXV0byBtYXgtdy1bMTE0MHB4XSBweC00IHNtOnB4LTZcIiBzdHlsZT17eyBwYWRkaW5nQm90dG9tOiBcImNhbGMoMC43NXJlbSArIGVudihzYWZlLWFyZWEtaW5zZXQtYm90dG9tLCAwcHgpKVwiIH19PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcm9sZT1cInRvb2xiYXJcIlxuICAgICAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbH1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJwb2ludGVyLWV2ZW50cy1hdXRvIHJvdW5kZWQtWzVweF0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAvODAgYmctd2hpdGUvOTUgcC0yIHNoYWRvdy0yeGwgYmFja2Ryb3AtYmx1ci1tZFwiLCBjbGFzc05hbWUgfHwgXCJcIil9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTJcIj5cbiAgICAgICAgICAgIHthY3Rpb25CdXR0b25zLm1hcCgoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHNob3VsZFVzZUZ1bGxXaWR0aCA9IGFjdGlvbkNvdW50ID09PSAxIHx8IChhY3Rpb25Db3VudCAlIDIgPT09IDEgJiYgaW5kZXggPT09IGFjdGlvbkNvdW50IC0gMSk7XG4gICAgICAgICAgICAgIHJldHVybiBjbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgICAgICAgICBmdWxsV2lkdGg6IHNob3VsZFVzZUZ1bGxXaWR0aCxcbiAgICAgICAgICAgICAgICB0YWJJbmRleDogaXNWaXNpYmxlID8gY2hpbGQucHJvcHMudGFiSW5kZXggOiAtMSxcbiAgICAgICAgICAgICAgICBrZXk6IGNoaWxkLmtleSA/PyBgcGFnZS1ib3R0b20tYWN0aW9uLSR7aW5kZXh9YCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8ZGl2IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHN0eWxlPXt7IGhlaWdodDogYCR7cmVzZXJ2ZWRIZWlnaHR9cHhgIH19IC8+XG4gICAgICB7cG9ydGFsVGFyZ2V0ID8gY3JlYXRlUG9ydGFsKGFjdGlvbkJhciwgcG9ydGFsVGFyZ2V0KSA6IG51bGx9XG4gICAgPC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBQYWdlQm90dG9tQWN0aW9ucztcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZUVmZmVjdEV2ZW50LCB1c2VMYXlvdXRFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUsIHR5cGUgUmVmT2JqZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5cbmNvbnN0IFNDUk9MTF9JRExFX0RFTEFZX01TID0gMTgwO1xuXG50eXBlIFVzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eVJlc3VsdCA9IHtcbiAgaXNWaXNpYmxlOiBib29sZWFuO1xuICByZXNlcnZlZEhlaWdodDogbnVtYmVyO1xuICB3cmFwcGVyUmVmOiBSZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcbn07XG5cbi8vIFRyYWNrcyB0aGUgYm90dG9tIGFjdGlvbiBiYXIgaGVpZ2h0IGFuZCBoaWRlcyBpdCB3aGlsZSB0aGUgcGFnZSBpcyBtb3ZpbmcuXG5leHBvcnQgY29uc3QgdXNlUGFnZUJvdHRvbUFjdGlvbnNWaXNpYmlsaXR5ID0gKCk6IFVzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eVJlc3VsdCA9PiB7XG4gIGNvbnN0IHdyYXBwZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgYW5pbWF0aW9uRnJhbWVSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHNjcm9sbElkbGVUaW1lb3V0UmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbaXNWaXNpYmxlLCBzZXRJc1Zpc2libGVdID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtyZXNlcnZlZEhlaWdodCwgc2V0UmVzZXJ2ZWRIZWlnaHRdID0gdXNlU3RhdGUoMCk7XG5cbiAgY29uc3QgbWVhc3VyZUhlaWdodCA9IHVzZUVmZmVjdEV2ZW50KCgpID0+IHtcbiAgICBjb25zdCB3cmFwcGVyID0gd3JhcHBlclJlZi5jdXJyZW50O1xuICAgIGlmICghd3JhcHBlcikgcmV0dXJuO1xuXG4gICAgY29uc3QgbmV4dEhlaWdodCA9IE1hdGguY2VpbCh3cmFwcGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCk7XG4gICAgc2V0UmVzZXJ2ZWRIZWlnaHQoKHByZXZpb3VzKSA9PiAoTWF0aC5hYnMocHJldmlvdXMgLSBuZXh0SGVpZ2h0KSA8IDEgPyBwcmV2aW91cyA6IG5leHRIZWlnaHQpKTtcbiAgfSk7XG5cbiAgY29uc3Qgc2NoZWR1bGVNZWFzdXJlID0gdXNlRWZmZWN0RXZlbnQoKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG5cbiAgICBpZiAoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQpO1xuICAgIH1cblxuICAgIGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgbWVhc3VyZUhlaWdodCgpO1xuICAgIH0pO1xuICB9KTtcblxuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgIG1lYXN1cmVIZWlnaHQoKTtcblxuICAgIGlmICh0eXBlb2YgUmVzaXplT2JzZXJ2ZXIgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcbiAgICBjb25zdCB3cmFwcGVyID0gd3JhcHBlclJlZi5jdXJyZW50O1xuICAgIGlmICghd3JhcHBlcikgcmV0dXJuO1xuXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgc2NoZWR1bGVNZWFzdXJlKCk7XG4gICAgfSk7XG5cbiAgICBvYnNlcnZlci5vYnNlcnZlKHdyYXBwZXIpO1xuICAgIHJldHVybiAoKSA9PiBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG5cbiAgICBjb25zdCBoYW5kbGVNb3Rpb24gPSAoKSA9PiB7XG4gICAgICBzZXRJc1Zpc2libGUoZmFsc2UpO1xuXG4gICAgICBpZiAoc2Nyb2xsSWRsZVRpbWVvdXRSZWYuY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHNjcm9sbElkbGVUaW1lb3V0UmVmLmN1cnJlbnQpO1xuICAgICAgfVxuXG4gICAgICBzY3JvbGxJZGxlVGltZW91dFJlZi5jdXJyZW50ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzY3JvbGxJZGxlVGltZW91dFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgc2NoZWR1bGVNZWFzdXJlKCk7XG4gICAgICAgIHNldElzVmlzaWJsZSh0cnVlKTtcbiAgICAgIH0sIFNDUk9MTF9JRExFX0RFTEFZX01TKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlUmVzaXplID0gKCkgPT4ge1xuICAgICAgc2NoZWR1bGVNZWFzdXJlKCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhhbmRsZU1vdGlvbiwgeyBjYXB0dXJlOiB0cnVlLCBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgaGFuZGxlTW90aW9uLCB7IHBhc3NpdmU6IHRydWUgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgaGFuZGxlTW90aW9uLCB7IHBhc3NpdmU6IHRydWUgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgaGFuZGxlUmVzaXplLCB7IHBhc3NpdmU6IHRydWUgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCBoYW5kbGVSZXNpemUpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIGhhbmRsZU1vdGlvbiwgdHJ1ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsIGhhbmRsZU1vdGlvbik7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBoYW5kbGVNb3Rpb24pO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgaGFuZGxlUmVzaXplKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgaGFuZGxlUmVzaXplKTtcblxuICAgICAgaWYgKHNjcm9sbElkbGVUaW1lb3V0UmVmLmN1cnJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChzY3JvbGxJZGxlVGltZW91dFJlZi5jdXJyZW50KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQpO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIGlzVmlzaWJsZSxcbiAgICByZXNlcnZlZEhlaWdodCxcbiAgICB3cmFwcGVyUmVmLFxuICB9O1xufTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBpbmRGb3JtYXQsIGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRIZWFkZXIgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dCBmcm9tIFwiLi9FeHBlbnNlUHJvamVjdEZpbHRlcklucHV0LnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VSZWFkT25seUZpZWxkIGZyb20gXCIuL0V4cGVuc2VSZWFkT25seUZpZWxkLnRzeFwiO1xuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4XCI7XG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24udHN4XCI7XG5pbXBvcnQgSW5mb1BvcG92ZXJJY29uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvSW5mb1BvcG92ZXJJY29uQnV0dG9uLnRzeFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlU2hlZXRTdGF0dXNPcHRpb25zLCBnZXRFeHBlbnNlU3RhdHVzTGFiZWwgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VTdGF0dXNDYXRhbG9nLnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leGNoYW5nZVJhdGVFbnRyeU1vZGVDYXRhbG9nLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIsIGZvcm1hdEV4cGVuc2VOdW1iZXIsIHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XG5cbnR5cGUgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybVByb3BzID0ge1xuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgY2FuRWRpdEhlYWRlckZpZWxkczogYm9vbGVhbjtcbiAgY2FuRWRpdFN0YXR1czogYm9vbGVhbjtcbiAgaGVhZGVyOiBFeHBlbnNlU2hlZXRIZWFkZXI7XG4gIHByb2plY3RWYWx1ZTogc3RyaW5nO1xuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lczogYm9vbGVhbjtcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xuICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeTogc3RyaW5nO1xuICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k6IHN0cmluZztcbiAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50OiBudW1iZXI7XG4gIHNob3dFeGNoYW5nZVJhdGU6IGJvb2xlYW47XG4gIGV4Y2hhbmdlUmF0ZVZhbHVlOiBzdHJpbmc7XG4gIGV4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlOiBzdHJpbmc7XG4gIHRvdGFsQW1vdW50VGV4dDogc3RyaW5nO1xuICBkcmFmdERlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGRyYWZ0UHJvamVjdElkOiBzdHJpbmc7XG4gIGRyYWZ0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGRyYWZ0RXhjaGFuZ2VSYXRlOiBzdHJpbmc7XG4gIGRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzOiBudW1iZXI7XG4gIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3M6IHN0cmluZztcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZTogc3RyaW5nO1xuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGU6IHN0cmluZztcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2U6IHN0cmluZztcbiAgb25EcmFmdERlc2NyaXB0aW9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdFByb2plY3RJZENoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkRyYWZ0RXhjaGFuZ2VSYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25EcmFmdEV4cGVuc2VTaGVldFN0YXR1c0NoYW5nZTogKHZhbHVlOiBudW1iZXIpID0+IHZvaWQ7XG4gIG9uRHJhZnRFc3RhZG9Db21lbnRhcmlvc0NoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG59O1xuXG5jb25zdCBFWENIQU5HRV9SQVRFX01PREVfUFJFRklYX1BBVFRFUk4gPSAvXlRcXC4/Q1xcLj9cXHMqL2k7XG5cbi8vIFB1cmUgcHJlc2VudGF0aW9uYWwgaGVhZGVyIGZvcm0gZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsL2NyZWF0ZSBzY3JlZW5zLlxuY29uc3QgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybSA9ICh7XG4gIGlzQ3JlYXRlTW9kZSxcbiAgaXNFZGl0aW5nLFxuICBjYW5FZGl0SGVhZGVyRmllbGRzLFxuICBjYW5FZGl0U3RhdHVzLFxuICBoZWFkZXIsXG4gIHByb2plY3RWYWx1ZSxcbiAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXG4gIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcbiAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXG4gIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LFxuICBzaG93RXhjaGFuZ2VSYXRlLFxuICBleGNoYW5nZVJhdGVWYWx1ZSxcbiAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXG4gIHRvdGFsQW1vdW50VGV4dCxcbiAgZHJhZnREZXNjcmlwdGlvbixcbiAgZHJhZnRQcm9qZWN0SWQsXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICBkcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgZHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUsXG4gIG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSxcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UsXG4gIG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZSxcbiAgb25EcmFmdFByb2plY3RJZENoYW5nZSxcbiAgb25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZSxcbiAgb25EcmFmdEV4Y2hhbmdlUmF0ZUNoYW5nZSxcbiAgb25EcmFmdEV4cGVuc2VTaGVldFN0YXR1c0NoYW5nZSxcbiAgb25EcmFmdEVzdGFkb0NvbWVudGFyaW9zQ2hhbmdlLFxufTogRXhwZW5zZVNoZWV0SGVhZGVyRm9ybVByb3BzKSA9PiB7XG4gIGNvbnN0IGlzRm9yZWlnbkN1cnJlbmN5ID1cbiAgICBpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkcyAmJiBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSAhPT0gXCJcIiAmJiBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSAhPT0gZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5O1xuICBjb25zdCBleHBlbnNlQ3VycmVuY3lMYWJlbCA9IGlzRm9yZWlnbkN1cnJlbmN5XG4gICAgPyBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9FeHBlbnNlQ3VycmVuY3lcIiwgXCJFeHBlbnNlIGN1cnJlbmN5XCIpXG4gICAgOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9DdXJyZW5jeVwiLCBcIkN1cnJlbmN5XCIpO1xuICBjb25zdCBzdGF0dXNWYWx1ZSA9XG4gICAgaGVhZGVyLmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gbnVsbCB8fCBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzID09PSB1bmRlZmluZWRcbiAgICAgID8gXCItXCJcbiAgICAgIDogZ2V0RXhwZW5zZVN0YXR1c0xhYmVsKGhlYWRlci5leHBlbnNlU2hlZXRTdGF0dXMpO1xuICBjb25zdCBoZWFkZXJDdXJyZW5jeUNvZGUgPSBzYWZlVGV4dChoZWFkZXIuY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBiYXNlQ3VycmVuY3lDb2RlID0gc2FmZVRleHQoZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBzdGF0dXNPcHRpb25zID0gUmVhY3QudXNlTWVtbygoKSA9PiBnZXRFeHBlbnNlU2hlZXRTdGF0dXNPcHRpb25zKCksIFtdKTtcbiAgY29uc3Qgc3RhdHVzRHJhZnRWYWx1ZSA9IFN0cmluZyhOdW1iZXIuaXNJbnRlZ2VyKGRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzKSA/IGRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzIDogMCk7XG4gIGNvbnN0IHN0YXR1c0NvbW1lbnRWYWx1ZSA9IHNhZmVUZXh0KGhlYWRlci5lc3RhZG9Db21lbnRhcmlvcyk7XG4gIGNvbnN0IHNob3dTdGF0dXNDb21tZW50RmllbGQgPSAhaXNDcmVhdGVNb2RlICYmICgoaXNFZGl0aW5nICYmIGNhbkVkaXRTdGF0dXMpIHx8ICEhc3RhdHVzQ29tbWVudFZhbHVlKTtcbiAgY29uc3QgbG9jYWxDdXJyZW5jeU9wdGlvbnMgPSBSZWFjdC51c2VNZW1vPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oXG4gICAgKCkgPT4gW1xuICAgICAge1xuICAgICAgICB2YWx1ZTogYmFzZUN1cnJlbmN5Q29kZSxcbiAgICAgICAgdGV4dDogYmFzZUN1cnJlbmN5Q29kZSxcbiAgICAgICAgaWNvbjogPEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uIGN1cnJlbmN5Q29kZT17YmFzZUN1cnJlbmN5Q29kZX0gc2l6ZUNsYXNzTmFtZT1cImgtNiB3LTZcIiAvPixcbiAgICAgIH0sXG4gICAgXSxcbiAgICBbYmFzZUN1cnJlbmN5Q29kZV1cbiAgKTtcbiAgY29uc3QgaGVhZGVyQ3VycmVuY3lPcHRpb25zID0gUmVhY3QudXNlTWVtbzxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KFxuICAgICgpID0+IFtcbiAgICAgIHtcbiAgICAgICAgdmFsdWU6IGhlYWRlckN1cnJlbmN5Q29kZSB8fCBcIi1cIixcbiAgICAgICAgdGV4dDogaGVhZGVyQ3VycmVuY3lDb2RlIHx8IFwiLVwiLFxuICAgICAgICBpY29uOiA8RXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gY3VycmVuY3lDb2RlPXtoZWFkZXJDdXJyZW5jeUNvZGUgfHwgXCItXCJ9IHNpemVDbGFzc05hbWU9XCJoLTYgdy02XCIgLz4sXG4gICAgICB9LFxuICAgIF0sXG4gICAgW2hlYWRlckN1cnJlbmN5Q29kZV1cbiAgKTtcbiAgY29uc3QgcGFyc2VkRHJhZnRFeGNoYW5nZVJhdGUgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQoZHJhZnRFeGNoYW5nZVJhdGUpO1xuICBjb25zdCBwYXJzZWRPZmZpY2lhbFJhd1JhdGUgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQob2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSk7XG4gIGNvbnN0IGJhc2VFeGNoYW5nZVJhdGVWYWx1ZSA9XG4gICAgcGFyc2VkRHJhZnRFeGNoYW5nZVJhdGUgIT0gbnVsbFxuICAgICAgPyBwYXJzZWREcmFmdEV4Y2hhbmdlUmF0ZVxuICAgICAgOiBwYXJzZWRPZmZpY2lhbFJhd1JhdGUgIT0gbnVsbFxuICAgICAgICA/IHBhcnNlZE9mZmljaWFsUmF3UmF0ZSAqIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZUFtb3VudFxuICAgICAgICA6IG51bGw7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZUluZm9WYWx1ZSA9IGZvcm1hdEV4cGVuc2VOdW1iZXIoXG4gICAgYmFzZUV4Y2hhbmdlUmF0ZVZhbHVlICE9IG51bGwgPyBiYXNlRXhjaGFuZ2VSYXRlVmFsdWUgLyBleGNoYW5nZVJhdGVSZWZlcmVuY2VBbW91bnQgOiBudWxsLFxuICAgIHtcbiAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogNyxcbiAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogNyxcbiAgICAgIHVzZUdyb3VwaW5nOiBmYWxzZSxcbiAgICAgIGZhbGxiYWNrOiBcIjAuMDAwMDAwMFwiLFxuICAgIH1cbiAgKTtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlTW9kZVZhbHVlID0gTnVtYmVyKGhlYWRlci5leGNoYW5nZVJhdGVNb2RlKSA9PT0gMSA/IDEgOiAwO1xuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlS2V5ID1cbiAgICBleGNoYW5nZVJhdGVNb2RlVmFsdWUgPT09IDFcbiAgICAgID8gXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX01hbnVhbFwiXG4gICAgICA6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfRXhjaGFuZ2VSYXRlTW9kZV9PZmZpY2lhbFwiO1xuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlRmFsbGJhY2sgPSBleGNoYW5nZVJhdGVNb2RlVmFsdWUgPT09IDEgPyBcIlQuQy4gTWFudWFsXCIgOiBcIlQuQy4gT2ZpY2lhbFwiO1xuICBjb25zdCBleGNoYW5nZVJhdGVNb2RlTGFiZWwgPVxuICAgIChnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsKGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSkgfHwgaW5kVChleGNoYW5nZVJhdGVNb2RlS2V5LCBleGNoYW5nZVJhdGVNb2RlRmFsbGJhY2spKVxuICAgICAgLnJlcGxhY2UoRVhDSEFOR0VfUkFURV9NT0RFX1BSRUZJWF9QQVRURVJOLCBcIlwiKVxuICAgICAgLnRyaW0oKVxuICAgICAgLnRvTG93ZXJDYXNlKCkgfHwgKGV4Y2hhbmdlUmF0ZU1vZGVWYWx1ZSA9PT0gMSA/IFwibWFudWFsXCIgOiBcIm9maWNpYWxcIik7XG4gIGNvbnN0IGhhc0VuZHBvaW50RXhjaGFuZ2VSYXRlRGF0YSA9XG4gICAgISFzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKSB8fCAhIXNhZmVUZXh0KG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSkgfHwgISFzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSk7XG4gIGNvbnN0IGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb0RhdGUgPSBzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUpIHx8IGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xuICBjb25zdCBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9Tb3VyY2UgPSBzYWZlVGV4dChvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSlcbiAgICAucmVwbGFjZSgvXFxzKlxcKFteKCldKlxcKVxccyovZywgXCIgXCIpXG4gICAgLnJlcGxhY2UoL1xcc3syLH0vZywgXCIgXCIpXG4gICAgLnRyaW0oKSB8fCBpbmRUKFwiQ29tbW9uX05vdEF2YWlsYWJsZVwiLCBcIk4vQVwiKTtcbiAgY29uc3QgZW5kcG9pbnRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZSA9IGluZEZvcm1hdChcbiAgICBcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX0luZm9Qb3BvdmVyX0RldGFpbFwiLFxuICAgIFwiVGlwbyBkZSBjYW1iaW8gb2J0ZW5pZG8gezB9XFxuRmVjaGE6IHsxfVxcbk9yaWdlbjogezJ9XCIsXG4gICAgc2FmZVRleHQob2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZSkgfHwgXCIwLjAwMDAwMDBcIixcbiAgICBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9EYXRlLFxuICAgIGVuZHBvaW50RXhjaGFuZ2VSYXRlSW5mb1NvdXJjZVxuICApO1xuICBjb25zdCBzdG9yZWRFeGNoYW5nZVJhdGVJbmZvTWVzc2FnZSA9IGluZEZvcm1hdChcbiAgICBcIkV4cGVuc2VTaGVldHNfRXhjaGFuZ2VSYXRlX0luZm9Qb3BvdmVyX1N0b3JlZFwiLFxuICAgIFwiVGlwbyBkZSBjYW1iaW8gezB9IHsxfVwiLFxuICAgIGV4Y2hhbmdlUmF0ZU1vZGVMYWJlbCxcbiAgICBleGNoYW5nZVJhdGVJbmZvVmFsdWVcbiAgKTtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UgPSBoYXNFbmRwb2ludEV4Y2hhbmdlUmF0ZURhdGEgPyBlbmRwb2ludEV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlIDogc3RvcmVkRXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2U7XG5cbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByb3VuZGVkLTJ4bFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCI+XG4gICAgICAgIHshaXNDcmVhdGVNb2RlID8gKFxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1NoZWV0SWRcIiwgXCJFeHBlbnNlIHNoZWV0IGNvZGVcIil9XG4gICAgICAgICAgICB2YWx1ZT17c2FmZVRleHQoaGVhZGVyLmhvamFHYXN0b3NJZCkgfHwgXCItXCJ9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHshaXNDcmVhdGVNb2RlID8gKFxuICAgICAgICAgIGlzRWRpdGluZyAmJiBjYW5FZGl0U3RhdHVzID8gKFxuICAgICAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TdGF0dXNcIiwgXCJTdGF0dXNcIil9XG4gICAgICAgICAgICAgIG9wdGlvbnM9e3N0YXR1c09wdGlvbnN9XG4gICAgICAgICAgICAgIHZhbHVlPXtzdGF0dXNEcmFmdFZhbHVlfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IE51bWJlcihuZXh0VmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgJiYgcGFyc2VkID49IDApIHtcbiAgICAgICAgICAgICAgICAgIG9uRHJhZnRFeHBlbnNlU2hlZXRTdGF0dXNDaGFuZ2UocGFyc2VkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TdGF0dXNcIiwgXCJTdGF0dXNcIil9XG4gICAgICAgICAgICAgIGVtaXRPblZhbHVlQ2hhbmdlXG4gICAgICAgICAgICAgIGFsbG93VGV4dElucHV0PXtmYWxzZX1cbiAgICAgICAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS1oZWFkZXItc3RhdHVzXCJcbiAgICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzXCIsIFwiU3RhdHVzXCIpfSB2YWx1ZT17c3RhdHVzVmFsdWV9IC8+XG4gICAgICAgICAgKVxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge3Nob3dTdGF0dXNDb21tZW50RmllbGQgPyAoXG4gICAgICAgICAgaXNFZGl0aW5nICYmIGNhbkVkaXRTdGF0dXMgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1kOmNvbC1zcGFuLTIgc3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9TdGF0dXNDb21tZW50XCIsIFwiU3RhdHVzIGNvbW1lbnRcIil9PC9sYWJlbD5cbiAgICAgICAgICAgICAgPHRleHRhcmVhXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sIHJlc2l6ZS1ub25lXCJcbiAgICAgICAgICAgICAgICByb3dzPXszfVxuICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdEVzdGFkb0NvbWVudGFyaW9zfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnRFc3RhZG9Db21lbnRhcmlvc0NoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzQ29tbWVudFwiLCBcIlN0YXR1cyBjb21tZW50XCIpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfU3RhdHVzQ29tbWVudFwiLCBcIlN0YXR1cyBjb21tZW50XCIpfVxuICAgICAgICAgICAgICB2YWx1ZT17c3RhdHVzQ29tbWVudFZhbHVlIHx8IFwiLVwifVxuICAgICAgICAgICAgICBmdWxsV2lkdGhcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKVxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge2lzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9EZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCIpfTwvbGFiZWw+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0RGVzY3JpcHRpb259XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnREZXNjcmlwdGlvbkNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIil9XG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0Rlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIil9XG4gICAgICAgICAgICB2YWx1ZT17c2FmZVRleHQoaGVhZGVyLmRlc2NyaXB0aW9uKSB8fCBcIi1cIn1cbiAgICAgICAgICAgIGZ1bGxXaWR0aFxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIHtpc0VkaXRpbmcgJiYgY2FuRWRpdEhlYWRlckZpZWxkcyA/IChcbiAgICAgICAgICA8RXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1Byb2plY3RcIiwgXCJQcm9qZWN0XCIpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9Qcm9qZWN0X1BsYWNlaG9sZGVyXCIsIFwiUHJvamVjdCBpZFwiKX1cbiAgICAgICAgICAgIHZhbHVlPXtkcmFmdFByb2plY3RJZH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkRyYWZ0UHJvamVjdElkQ2hhbmdlfVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmcgfHwgIWNhbkVkaXRIZWFkZXJGaWVsZHN9XG4gICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZyB8fCAhY2FuRWRpdEhlYWRlckZpZWxkc31cbiAgICAgICAgICAvPlxuICAgICAgICApIDogcHJvamVjdFZhbHVlID8gKFxuICAgICAgICAgIDxFeHBlbnNlUmVhZE9ubHlGaWVsZCBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfUHJvamVjdFwiLCBcIlByb2plY3RcIil9IHZhbHVlPXtwcm9qZWN0VmFsdWV9IC8+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7aXNFZGl0aW5nICYmIGNhbkVkaXRIZWFkZXJGaWVsZHMgPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbTpjb2wtc3Bhbi0yIHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BncmlkIGdhcC00ICR7aXNGb3JlaWduQ3VycmVuY3kgPyBcImdyaWQtY29scy0yXCIgOiBcImdyaWQtY29scy0xXCJ9YC50cmltKCl9PlxuICAgICAgICAgICAgICB7aXNGb3JlaWduQ3VycmVuY3kgPyAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntleHBlbnNlQ3VycmVuY3lMYWJlbH08L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8RXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw9e2V4cGVuc2VDdXJyZW5jeUxhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lfUGxhY2Vob2xkZXJcIiwgXCJDdXJyZW5jeSBjb2RlXCIpfVxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdEN1cnJlbmN5Q29kZX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17b25EcmFmdEN1cnJlbmN5Q29kZUNoYW5nZX1cbiAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZyB8fCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cbiAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZyB8fCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cbiAgICAgICAgICAgICAgICAgICAgICBzaG93TGFiZWw9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtaGVhZGVyLWN1cnJlbmN5XCJcbiAgICAgICAgICAgICAgICAgICAgICBwcmVmZXJEZWZhdWx0Q3VycmVuY3lGcm9tQ29udGV4dFxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIHByLTggZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9FeGNoYW5nZVJhdGVcIiwgXCJFeGNoYW5nZSByYXRlXCIpfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxJbmZvUG9wb3Zlckljb25CdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBhcmlhTGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9JbmZvUG9wb3Zlcl9BcmlhXCIsIFwiU2hvdyBleGNoYW5nZSByYXRlIGluZm9ybWF0aW9uXCIpfVxuICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ9e2V4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHJpZ2h0LTAgLXRvcC0xIHotMjBcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9ybS1jb250cm9sICR7ZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UgPyBcImJvcmRlci1kYW5nZXIgcmluZy0xIHJpbmctZGFuZ2VyXCIgOiBcIlwifSAke2lzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwifWB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dE1vZGU9XCJkZWNpbWFsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtkcmFmdEV4Y2hhbmdlUmF0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2UoZXZlbnQudGFyZ2V0LnZhbHVlIHx8IFwiXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25CbHVyPXsoZXZlbnQpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uRHJhZnRFeGNoYW5nZVJhdGVDaGFuZ2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKGV2ZW50LnRhcmdldC52YWx1ZSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiA3LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiA3LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlR3JvdXBpbmc6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWxsYmFjazogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9FeGNoYW5nZVJhdGVcIiwgXCJFeGNoYW5nZSByYXRlXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0V4Y2hhbmdlUmF0ZVwiLCBcIkV4Y2hhbmdlIHJhdGVcIil9XG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17aXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lc31cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDxFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RcbiAgICAgICAgICAgICAgICAgIGxhYmVsPXtleHBlbnNlQ3VycmVuY3lMYWJlbH1cbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lfUGxhY2Vob2xkZXJcIiwgXCJDdXJyZW5jeSBjb2RlXCIpfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2RyYWZ0Q3VycmVuY3lDb2RlfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e29uRHJhZnRDdXJyZW5jeUNvZGVDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZyB8fCBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lc31cbiAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nIHx8IGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzfVxuICAgICAgICAgICAgICAgICAgaWRCYXNlPVwiZXhwZW5zZS1oZWFkZXItY3VycmVuY3lcIlxuICAgICAgICAgICAgICAgICAgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHRcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHtpc0ZvcmVpZ25DdXJyZW5jeSA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC00XCI+XG4gICAgICAgICAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgICAgICAgICBsYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfTG9jYWxDdXJyZW5jeVwiLCBcIkxvY2FsIGN1cnJlbmN5XCIpfVxuICAgICAgICAgICAgICAgICAgb3B0aW9ucz17bG9jYWxDdXJyZW5jeU9wdGlvbnN9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17YmFzZUN1cnJlbmN5Q29kZX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiB1bmRlZmluZWR9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17aW5kVChcIkV4cGVuc2VTaGVldHNfRmlsdGVyX0N1cnJlbmN5X1BsYWNlaG9sZGVyXCIsIFwiQ3VycmVuY3kgY29kZVwiKX1cbiAgICAgICAgICAgICAgICAgIHJlYWRPbmx5XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZFxuICAgICAgICAgICAgICAgICAgYWxsb3dUZXh0SW5wdXQ9e2ZhbHNlfVxuICAgICAgICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICBzaG93TGFiZWxcbiAgICAgICAgICAgICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICBzZWxlY3RlZFRleHRNb2RlPVwidmFsdWVcIlxuICAgICAgICAgICAgICAgICAgZHJvcGRvd25NYXhIZWlnaHRDbGFzcz1cIm1heC1oLTk2XCJcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSWNvbkNsYXNzTmFtZT1cImgtNiB3LTZcIlxuICAgICAgICAgICAgICAgICAgb3B0aW9uSWNvbkNsYXNzTmFtZT1cImgtNiB3LTZcIlxuICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJbnB1dFBhZGRpbmdDbGFzc05hbWU9XCJwbC0xMlwiXG4gICAgICAgICAgICAgICAgICBpZEJhc2U9XCJleHBlbnNlLWhlYWRlci1sb2NhbC1jdXJyZW5jeVwiXG4gICAgICAgICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgICAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiPntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9BbW91bnRcIiwgXCJBbW91bnRcIil9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgaW5kLXJlYWRvbmx5LWZpZWxkXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1hdEV4cGVuc2VOdW1iZXIoZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50LCB7XG4gICAgICAgICAgICAgICAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiA3LFxuICAgICAgICAgICAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogNyxcbiAgICAgICAgICAgICAgICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBmYWxsYmFjazogXCItXCIsXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9BbW91bnRcIiwgXCJBbW91bnRcIil9XG4gICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgICAgICB7aXNGb3JlaWduQ3VycmVuY3kgJiYgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlciB0ZXh0LXNtXCI+e2V4Y2hhbmdlUmF0ZVZhbGlkYXRpb25NZXNzYWdlfTwvcD4gOiBudWxsfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0N1cnJlbmN5XCIsIFwiQ3VycmVuY3lcIil9XG4gICAgICAgICAgICBvcHRpb25zPXtoZWFkZXJDdXJyZW5jeU9wdGlvbnN9XG4gICAgICAgICAgICB2YWx1ZT17aGVhZGVyQ3VycmVuY3lDb2RlIHx8IFwiLVwifVxuICAgICAgICAgICAgb25DaGFuZ2U9eygpID0+IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfQ3VycmVuY3lfUGxhY2Vob2xkZXJcIiwgXCJDdXJyZW5jeSBjb2RlXCIpfVxuICAgICAgICAgICAgcmVhZE9ubHlcbiAgICAgICAgICAgIGRpc2FibGVkXG4gICAgICAgICAgICBhbGxvd1RleHRJbnB1dD17ZmFsc2V9XG4gICAgICAgICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cbiAgICAgICAgICAgIHNob3dMYWJlbFxuICAgICAgICAgICAgdXNlUG9ydGFsPXtmYWxzZX1cbiAgICAgICAgICAgIHNlbGVjdGVkVGV4dE1vZGU9XCJ2YWx1ZVwiXG4gICAgICAgICAgICBkcm9wZG93bk1heEhlaWdodENsYXNzPVwibWF4LWgtOTZcIlxuICAgICAgICAgICAgc2VsZWN0ZWRJY29uQ2xhc3NOYW1lPVwiaC02IHctNlwiXG4gICAgICAgICAgICBvcHRpb25JY29uQ2xhc3NOYW1lPVwiaC02IHctNlwiXG4gICAgICAgICAgICBzZWxlY3RlZElucHV0UGFkZGluZ0NsYXNzTmFtZT1cInBsLTEyXCJcbiAgICAgICAgICAgIGlkQmFzZT1cImV4cGVuc2UtaGVhZGVyLWN1cnJlbmN5LXJlYWRvbmx5XCJcbiAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAgeyFpc0VkaXRpbmcgJiYgc2hvd0V4Y2hhbmdlUmF0ZSA/IChcbiAgICAgICAgICA8RXhwZW5zZVJlYWRPbmx5RmllbGQgbGFiZWw9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0V4Y2hhbmdlUmF0ZVwiLCBcIkV4Y2hhbmdlIHJhdGVcIil9IHZhbHVlPXtleGNoYW5nZVJhdGVWYWx1ZX0gLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHshaXNDcmVhdGVNb2RlID8gPEV4cGVuc2VSZWFkT25seUZpZWxkIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9Ub3RhbEFtb3VudFwiLCBcIlRvdGFsIGFtb3VudFwiKX0gdmFsdWU9e3RvdGFsQW1vdW50VGV4dH0gLz4gOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVNoZWV0SGVhZGVyRm9ybTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTGF5b3V0RWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgeyB1c2VPdXRzaWRlQ2xpY2sgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlT3V0c2lkZUNsaWNrLnRzXCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcblxudHlwZSBJbmZvUG9wb3Zlckljb25CdXR0b25Qcm9wcyA9IHtcbiAgY29udGVudDogUmVhY3QuUmVhY3ROb2RlO1xuICBhcmlhTGFiZWw6IHN0cmluZztcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcbn07XG5cbi8vIFNoYXJlZCBkdW1iIHBvcG92ZXIgdHJpZ2dlciB1c2VkIHRvIGRpc3BsYXkgc2hvcnQgY29udGV4dHVhbCBpbmZvLlxuY29uc3QgSW5mb1BvcG92ZXJJY29uQnV0dG9uID0gKHtcbiAgY29udGVudCxcbiAgYXJpYUxhYmVsLFxuICBjbGFzc05hbWUgPSBcIlwiLFxuICBwYW5lbENsYXNzTmFtZSA9IFwiXCIsXG59OiBJbmZvUG9wb3Zlckljb25CdXR0b25Qcm9wcykgPT4ge1xuICBjb25zdCBIT1JJWk9OVEFMX1ZJRVdQT1JUX0dVVFRFUl9QWCA9IDg7XG4gIGNvbnN0IFZFUlRJQ0FMX1ZJRVdQT1JUX0dVVFRFUl9QWCA9IDg7XG4gIGNvbnN0IFBBTkVMX1RSSUdHRVJfR0FQX1BYID0gNjtcbiAgY29uc3QgR0xPQkFMX1JBRElVUyA9IFwidmFyKC0tcmFkaXVzLXhsLCA1cHgpXCI7XG4gIGNvbnN0IFtpc09wZW4sIHNldElzT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtwYW5lbFN0eWxlLCBzZXRQYW5lbFN0eWxlXSA9IHVzZVN0YXRlPFJlYWN0LkNTU1Byb3BlcnRpZXM+KHtcbiAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICAgIHRvcDogMCxcbiAgICBsZWZ0OiAwLFxuICAgIHZpc2liaWxpdHk6IFwiaGlkZGVuXCIsXG4gIH0pO1xuICBjb25zdCBidXR0b25SZWYgPSB1c2VSZWY8SFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcGFuZWxSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICB1c2VPdXRzaWRlQ2xpY2soW2J1dHRvblJlZiwgcGFuZWxSZWZdLCAoKSA9PiBzZXRJc09wZW4oZmFsc2UpKTtcbiAgY29uc3QgdXBkYXRlUGFuZWxQb3NpdGlvbiA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGJ1dHRvbkVsZW1lbnQgPSBidXR0b25SZWYuY3VycmVudDtcbiAgICBjb25zdCBwYW5lbEVsZW1lbnQgPSBwYW5lbFJlZi5jdXJyZW50O1xuICAgIGlmICghYnV0dG9uRWxlbWVudCB8fCAhcGFuZWxFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYnV0dG9uUmVjdCA9IGJ1dHRvbkVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgcGFuZWxSZWN0ID0gcGFuZWxFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHZpZXdwb3J0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBjb25zdCB2aWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBjb25zdCBzYWZlV2lkdGggPSBNYXRoLm1pbihwYW5lbFJlY3Qud2lkdGgsIE1hdGgubWF4KDE4MCwgdmlld3BvcnRXaWR0aCAtIEhPUklaT05UQUxfVklFV1BPUlRfR1VUVEVSX1BYICogMikpO1xuXG4gICAgbGV0IGxlZnQgPSBidXR0b25SZWN0LmxlZnQgKyBidXR0b25SZWN0LndpZHRoIC8gMiAtIHNhZmVXaWR0aCAvIDI7XG4gICAgbGVmdCA9IE1hdGgubWF4KEhPUklaT05UQUxfVklFV1BPUlRfR1VUVEVSX1BYLCBNYXRoLm1pbihsZWZ0LCB2aWV3cG9ydFdpZHRoIC0gc2FmZVdpZHRoIC0gSE9SSVpPTlRBTF9WSUVXUE9SVF9HVVRURVJfUFgpKTtcblxuICAgIGxldCB0b3AgPSBidXR0b25SZWN0LmJvdHRvbSArIFBBTkVMX1RSSUdHRVJfR0FQX1BYO1xuICAgIGNvbnN0IGhhc0JvdHRvbU92ZXJmbG93ID0gdG9wICsgcGFuZWxSZWN0LmhlaWdodCArIFZFUlRJQ0FMX1ZJRVdQT1JUX0dVVFRFUl9QWCA+IHZpZXdwb3J0SGVpZ2h0O1xuICAgIGlmIChoYXNCb3R0b21PdmVyZmxvdykge1xuICAgICAgY29uc3QgdG9wQWJvdmVUcmlnZ2VyID0gYnV0dG9uUmVjdC50b3AgLSBwYW5lbFJlY3QuaGVpZ2h0IC0gUEFORUxfVFJJR0dFUl9HQVBfUFg7XG4gICAgICB0b3AgPSB0b3BBYm92ZVRyaWdnZXIgPj0gVkVSVElDQUxfVklFV1BPUlRfR1VUVEVSX1BYXG4gICAgICAgID8gdG9wQWJvdmVUcmlnZ2VyXG4gICAgICAgIDogTWF0aC5tYXgoVkVSVElDQUxfVklFV1BPUlRfR1VUVEVSX1BYLCB2aWV3cG9ydEhlaWdodCAtIHBhbmVsUmVjdC5oZWlnaHQgLSBWRVJUSUNBTF9WSUVXUE9SVF9HVVRURVJfUFgpO1xuICAgIH1cblxuICAgIHNldFBhbmVsU3R5bGUoe1xuICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgICAgIHRvcDogTWF0aC5yb3VuZCh0b3ApLFxuICAgICAgbGVmdDogTWF0aC5yb3VuZChsZWZ0KSxcbiAgICAgIHdpZHRoOiBNYXRoLnJvdW5kKHNhZmVXaWR0aCksXG4gICAgICB2aXNpYmlsaXR5OiBcInZpc2libGVcIixcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc09wZW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdXBkYXRlUGFuZWxQb3NpdGlvbigpO1xuICB9LCBbaXNPcGVuLCBjb250ZW50LCB1cGRhdGVQYW5lbFBvc2l0aW9uXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzT3Blbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBoYW5kbGVWaWV3cG9ydENoYW5nZSA9ICgpID0+IHVwZGF0ZVBhbmVsUG9zaXRpb24oKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBoYW5kbGVWaWV3cG9ydENoYW5nZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgaGFuZGxlVmlld3BvcnRDaGFuZ2UsIHRydWUpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBoYW5kbGVWaWV3cG9ydENoYW5nZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVWaWV3cG9ydENoYW5nZSwgdHJ1ZSk7XG4gICAgfTtcbiAgfSwgW2lzT3BlbiwgdXBkYXRlUGFuZWxQb3NpdGlvbl0pO1xuXG4gIGNvbnN0IHBvcnRhbFRhcmdldCA9IHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIiA/IG51bGwgOiBkb2N1bWVudC5ib2R5O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJpbmxpbmUtZmxleFwiLCBjbGFzc05hbWUpfT5cbiAgICAgIDxidXR0b25cbiAgICAgICAgcmVmPXtidXR0b25SZWZ9XG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWx9XG4gICAgICAgIGFyaWEtZXhwYW5kZWQ9e2lzT3Blbn1cbiAgICAgICAgYXJpYS1oYXNwb3B1cD1cImRpYWxvZ1wiXG4gICAgICAgIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGgtNiB3LTYgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItdHJhbnNwYXJlbnQgYmctdHJhbnNwYXJlbnQgcC0wIHRleHQtc2xhdGUtNTAwIHRyYW5zaXRpb24gaG92ZXI6dGV4dC1wcmltYXJ5IGZvY3VzOm91dGxpbmUtaGlkZGVuIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXByaW1hcnkvMzBcIlxuICAgICAgICBzdHlsZT17eyBib3JkZXJSYWRpdXM6IEdMT0JBTF9SQURJVVMgfX1cbiAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNPcGVuKChwcmV2aW91cykgPT4gIXByZXZpb3VzKX1cbiAgICAgID5cbiAgICAgICAgPHN2Z1xuICAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgICAgIHdpZHRoPVwiMjBcIlxuICAgICAgICAgIGhlaWdodD1cIjIwXCJcbiAgICAgICAgICB2aWV3Qm94PVwiMyAzIDE4IDE4XCJcbiAgICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgc3Ryb2tlPVwiIzY0NzQ4YlwiXG4gICAgICAgICAgc3Ryb2tlV2lkdGg9XCIxLjc1XCJcbiAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxuICAgICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYmxvY2tcIlxuICAgICAgICA+XG4gICAgICAgICAgPHJlY3QgeD1cIjRcIiB5PVwiNFwiIHdpZHRoPVwiMTZcIiBoZWlnaHQ9XCIxNlwiIHJ4PVwiM1wiIHJ5PVwiM1wiIC8+XG4gICAgICAgICAgPHBhdGggZD1cIk0xMiA5aC4wMVwiIC8+XG4gICAgICAgICAgPHBhdGggZD1cIk0xMSAxMmgxdjRoMVwiIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgPC9idXR0b24+XG5cbiAgICAgIHtpc09wZW4gJiYgcG9ydGFsVGFyZ2V0XG4gICAgICAgID8gY3JlYXRlUG9ydGFsKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICByZWY9e3BhbmVsUmVmfVxuICAgICAgICAgICAgICByb2xlPVwiZGlhbG9nXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgLi4ucGFuZWxTdHlsZSwgYm9yZGVyUmFkaXVzOiBHTE9CQUxfUkFESVVTIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICBcInotMzYwMDAwIG1pbi13LVsyMjBweF0gbWF4LXctW2NhbGMoMTAwdnctMXJlbSldIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHAtMyBzaGFkb3ctbGdcIixcbiAgICAgICAgICAgICAgICBwYW5lbENsYXNzTmFtZVxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMnB4XSB0ZXh0LXNsYXRlLTcwMCB3aGl0ZXNwYWNlLXByZS1saW5lXCI+e2NvbnRlbnR9PC9wPlxuICAgICAgICAgICAgPC9kaXY+LFxuICAgICAgICAgICAgcG9ydGFsVGFyZ2V0XG4gICAgICAgICAgKVxuICAgICAgICA6IG51bGx9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBJbmZvUG9wb3Zlckljb25CdXR0b247XG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuXG50eXBlIEV4Y2hhbmdlUmF0ZU1vZGVVaU1ldGEgPSB7XG4gIGxhYmVsS2V5OiBzdHJpbmc7XG4gIGZhbGxiYWNrOiBzdHJpbmc7XG59O1xuXG5jb25zdCBFWENIQU5HRV9SQVRFX01PREVfTUVUQTogUmVjb3JkPEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ29kZSwgRXhjaGFuZ2VSYXRlTW9kZVVpTWV0YT4gPSB7XG4gIDA6IHtcbiAgICBsYWJlbEtleTogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX09mZmljaWFsXCIsXG4gICAgZmFsbGJhY2s6IFwiVC5DLiBPZmljaWFsXCIsXG4gIH0sXG4gIDE6IHtcbiAgICBsYWJlbEtleTogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX01hbnVhbFwiLFxuICAgIGZhbGxiYWNrOiBcIlQuQy4gTWFudWFsXCIsXG4gIH0sXG59O1xuY29uc3QgRVhDSEFOR0VfUkFURV9NT0RFX0NPREVTOiBFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUNvZGVbXSA9IFswLCAxXTtcblxuLy8gS2VlcHMgZXhjaGFuZ2UgcmF0ZSBtb2RlIHZhbHVlcyBjb25zdHJhaW5lZCB0byBudW1lcmljIDAgb3IgMS5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlQ29kZSB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xuICBpZiAocGFyc2VkID09PSAwIHx8IHBhcnNlZCA9PT0gMSkge1xuICAgIHJldHVybiBwYXJzZWQ7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG4vLyBCdWlsZHMgZml4ZWQgb3B0aW9ucyBmb3IgdGhlIGV4Y2hhbmdlIHJhdGUgbW9kZSBmaWx0ZXIuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGVPcHRpb25zID0gKCk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XG4gIHJldHVybiBFWENIQU5HRV9SQVRFX01PREVfQ09ERVNcbiAgICAubWFwKChjb2RlKSA9PiB7XG4gICAgICBjb25zdCBtZXRhID0gRVhDSEFOR0VfUkFURV9NT0RFX01FVEFbY29kZV07XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogU3RyaW5nKGNvZGUpLFxuICAgICAgICB0ZXh0OiBpbmRUKG1ldGEubGFiZWxLZXksIG1ldGEuZmFsbGJhY2spLFxuICAgICAgfTtcbiAgICB9KTtcbn07XG5cbi8vIFJldHVybnMgYSBsb2NhbGl6ZWQgbW9kZSBsYWJlbCBvciBlbXB0eSB0ZXh0IGZvciBub24tc2VsZWN0ZWQgdmFsdWVzLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VFeGNoYW5nZVJhdGVNb2RlTGFiZWwgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplRXhwZW5zZUV4Y2hhbmdlUmF0ZU1vZGUodmFsdWUpO1xuICBpZiAobm9ybWFsaXplZCA9PT0gbnVsbCkgcmV0dXJuIFwiXCI7XG4gIGNvbnN0IG1ldGEgPSBFWENIQU5HRV9SQVRFX01PREVfTUVUQVtub3JtYWxpemVkXTtcbiAgcmV0dXJuIGluZFQobWV0YS5sYWJlbEtleSwgbWV0YS5mYWxsYmFjayk7XG59O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBDb21wYWN0UGFnaW5hdGlvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbXBhY3RQYWdpbmF0aW9uLnRzeFwiO1xuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldExpbmUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzLCBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IEV4cGVuc2VTZWN0aW9uRGl2aWRlciBmcm9tIFwiLi9FeHBlbnNlU2VjdGlvbkRpdmlkZXIudHN4XCI7XG5pbXBvcnQgRXhwZW5zZVRpbWVsaW5lQ2FyZCBmcm9tIFwiLi9FeHBlbnNlVGltZWxpbmVDYXJkLnRzeFwiO1xuXG50eXBlIFBhZ2luYXRpb25MYWJlbHMgPSB7XG4gIGZpcnN0OiBzdHJpbmc7XG4gIHByZXY6IHN0cmluZztcbiAgbmV4dDogc3RyaW5nO1xuICBsYXN0OiBzdHJpbmc7XG59O1xuXG50eXBlIEV4cGVuc2VMaW5lc1RpbWVsaW5lUHJvcHMgPSB7XG4gIHZpc2libGVMaW5lczogRXhwZW5zZVNoZWV0TGluZVtdO1xuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgdG90YWxMaW5lUGFnZXM6IG51bWJlcjtcbiAgbGluZVBhZ2U6IG51bWJlcjtcbiAgbGluZXNMYWJlbDogc3RyaW5nO1xuICBlbXB0eVRleHQ6IHN0cmluZztcbiAgcGFnaW5hdGlvbkxhYmVsczogUGFnaW5hdGlvbkxhYmVscztcbiAgY29udGFpbmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcbiAgb25MaW5lUGFnZUNoYW5nZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcbiAgb25PcGVuTGluZTogKGxpbmVSZWNJZDogc3RyaW5nKSA9PiB2b2lkO1xufTtcblxuLy8gRHVtYiB0aW1lbGluZSBmb3IgZXhwZW5zZSBzaGVldCBsaW5lcyB3aXRoIHN0YW5kYXJkIGNhcmQgYW5kIHBhZ2luYXRpb24gbGF5b3V0LlxuY29uc3QgRXhwZW5zZUxpbmVzVGltZWxpbmUgPSAoe1xuICB2aXNpYmxlTGluZXMsXG4gIGN1cnJlbmN5Q29kZSxcbiAgdG90YWxMaW5lUGFnZXMsXG4gIGxpbmVQYWdlLFxuICBsaW5lc0xhYmVsLFxuICBlbXB0eVRleHQsXG4gIHBhZ2luYXRpb25MYWJlbHMsXG4gIGNvbnRhaW5lclJlZixcbiAgb25MaW5lUGFnZUNoYW5nZSxcbiAgb25PcGVuTGluZSxcbn06IEV4cGVuc2VMaW5lc1RpbWVsaW5lUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzcGFjZS15LTBcIj5cbiAgICAgIDxFeHBlbnNlU2VjdGlvbkRpdmlkZXIgbGFiZWw9e2xpbmVzTGFiZWx9IGNsYXNzTmFtZT1cImV4cGVuc2Utc2VjdGlvbi1kaXZpZGVyLS1zcGFjZWRcIiAvPlxuXG4gICAgICB7dmlzaWJsZUxpbmVzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1ib3ggdGltZWxpbmUtZW1wdHlcIiBkYXRhLWVtcHR5LXRleHQ9e2VtcHR5VGV4dH0gLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxkaXYgcmVmPXtjb250YWluZXJSZWZ9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWJveFwiPlxuICAgICAgICAgIHt2aXNpYmxlTGluZXMubWFwKChsaW5lLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbGluZUlkID0gc2FmZVRleHQobGluZS5saW5lUmVjSWQpO1xuICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBzYWZlVGV4dChsaW5lLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGNvbnN0IGFtb3VudFRleHQgPSBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kobGluZS5hbW91bnQgPz8gbnVsbCwgY3VycmVuY3lDb2RlKTtcbiAgICAgICAgICAgIGNvbnN0IGxpbmtlZFRpY2tldEZpbGVJZCA9IHNhZmVUZXh0KGxpbmUuZmlsZUlkKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGVQYXJ0cyA9IGZvcm1hdEV4cGVuc2VEYXRlUGFydHMoc2FmZVRleHQobGluZS50cmFuc0RhdGUpLCBkb2N1bWVudD8uZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiZXMtRVNcIik7XG4gICAgICAgICAgICBjb25zdCB0aWNrZXRTdGF0dXNJY29uID0gbGlua2VkVGlja2V0RmlsZUlkID8gKFxuICAgICAgICAgICAgICA8c3ZnXG4gICAgICAgICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgICAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXsxLjV9XG4gICAgICAgICAgICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLTQgdy00XCJcbiAgICAgICAgICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXG4gICAgICAgICAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcbiAgICAgICAgICAgICAgICAgIGQ9XCJNMTMuMTkgOC42ODhhNC41IDQuNSAwIDAgMSAxLjI0MiA3LjI0NGwtNC41IDQuNWE0LjUgNC41IDAgMCAxLTYuMzY0LTYuMzY0bDEuNzU3LTEuNzU3bTEzLjM1LS42MjIgMS43NTctMS43NTdhNC41IDQuNSAwIDAgMC02LjM2NC02LjM2NGwtNC41IDQuNWE0LjUgNC41IDAgMCAwIDEuMjQyIDcuMjQ0XCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICkgOiBudWxsO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17YCR7bGluZUlkfS0ke2luZGV4fWB9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWl0ZW1cIj5cbiAgICAgICAgICAgICAgICA8RXhwZW5zZVRpbWVsaW5lQ2FyZFxuICAgICAgICAgICAgICAgICAgZGF0ZVBhcnRzPXtkYXRlUGFydHN9XG4gICAgICAgICAgICAgICAgICB0aXRsZT17ZGVzY3JpcHRpb24gfHwgbGluZUlkIHx8IFwiLVwifVxuICAgICAgICAgICAgICAgICAgYW1vdW50VGV4dD17YW1vdW50VGV4dH1cbiAgICAgICAgICAgICAgICAgIG9uT3Blbj17KCkgPT4gb25PcGVuTGluZShsaW5lSWQpfVxuICAgICAgICAgICAgICAgICAgdGl0bGVDbGFzc05hbWU9XCJ0aW1lbGluZS1uYW1lIGV4cGVuc2UtbGluZS1jYXJkX190aXRsZVwiXG4gICAgICAgICAgICAgICAgICBzdGF0dXNJY29uPXt0aWNrZXRTdGF0dXNJY29ufVxuICAgICAgICAgICAgICAgICAgc3RhdHVzSWNvbkNsYXNzTmFtZT1cImV4cGVuc2UtbGluZS1jYXJkX190aWNrZXQtaWNvblwiXG4gICAgICAgICAgICAgICAgICBzdGF0dXNMYWJlbD17bGlua2VkVGlja2V0RmlsZUlkIHx8IHVuZGVmaW5lZH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgPENvbXBhY3RQYWdpbmF0aW9uXG4gICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsTGluZVBhZ2VzfVxuICAgICAgICBjdXJyZW50UGFnZT17bGluZVBhZ2V9XG4gICAgICAgIG9uUGFnZUNoYW5nZT17b25MaW5lUGFnZUNoYW5nZX1cbiAgICAgICAgbGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxuICAgICAgLz5cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlTGluZXNUaW1lbGluZTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0LCBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0IH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgZXhlY3V0ZUV4cGVuc2VNdXRhdGlvbiwgcGFyc2VEZWNpbWFsSW5wdXQgfSBmcm9tIFwiLi4vaG9va3MvZXhwZW5zZU11dGF0aW9uVXRpbHMudHNcIjtcbmltcG9ydCB7XG4gIGNyZWF0ZUV4cGVuc2VTaGVldCxcbiAgZGVsZXRlRXhwZW5zZVNoZWV0LFxuICB1cGRhdGVFeHBlbnNlU2hlZXRIZWFkZXIsXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5cbnR5cGUgVXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zQXJncyA9IHtcbiAgYnVzeTogYm9vbGVhbjtcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XG4gIGlzRWRpdExvY2tlZDogYm9vbGVhbjtcbiAgaXNEZWxldGVMb2NrZWQ6IGJvb2xlYW47XG4gIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzOiBib29sZWFuO1xuICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXM6IGJvb2xlYW47XG4gIGxvY2tlZEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBsb2NrZWRFeGNoYW5nZVJhdGU6IHN0cmluZztcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XG4gIGNhbkRlbGV0ZUV4cGVuc2U6IGJvb2xlYW47XG4gIGNhbkVkaXRIZWFkZXJGaWVsZHM6IGJvb2xlYW47XG4gIGNhbkVkaXRTdGF0dXM6IGJvb2xlYW47XG4gIHNoZWV0SWQ6IHN0cmluZztcbiAgZHJhZnREZXNjcmlwdGlvbjogc3RyaW5nO1xuICBkcmFmdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBkcmFmdEV4Y2hhbmdlUmF0ZTogc3RyaW5nO1xuICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlOiBzdHJpbmc7XG4gIGRyYWZ0UHJvamVjdElkOiBzdHJpbmc7XG4gIGRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzPzogbnVtYmVyIHwgbnVsbDtcbiAgZHJhZnRFc3RhZG9Db21lbnRhcmlvczogc3RyaW5nO1xuICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3k6IHN0cmluZztcbiAgY3VycmVudEV4cGVuc2VTaGVldFN0YXR1cz86IG51bWJlciB8IG51bGw7XG4gIGN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlPzogbnVtYmVyIHwgbnVsbDtcbiAgb25DcmVhdGVTdWNjZXNzOiAoY3JlYXRlZFNoZWV0SWQ6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0TW9kYWxFcnJvcjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldEJ1c3k6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcbiAgc2V0U3RhdHVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0SXNFZGl0aW5nOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG59O1xuXG5jb25zdCBub3JtYWxpemVFeGNoYW5nZVJhdGUgPSAocmF3OiBzdHJpbmcpOiBudW1iZXIgfCBudWxsID0+IHBhcnNlRGVjaW1hbElucHV0KHJhdyk7XG4vLyBDb21wYXJlcyByYXRlcyB3aXRoIHRvbGVyYW5jZSB0byBhdm9pZCBmbG9hdGluZyBwb2ludCBtaXNtYXRjaCBvbiBwYXlsb2FkIG1vZGUuXG5jb25zdCBhcmVSYXRlc0VxdWl2YWxlbnQgPSAobGVmdDogbnVtYmVyIHwgbnVsbCwgcmlnaHQ6IG51bWJlciB8IG51bGwpOiBib29sZWFuID0+IHtcbiAgaWYgKGxlZnQgPT0gbnVsbCB8fCByaWdodCA9PSBudWxsKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBNYXRoLmFicyhsZWZ0IC0gcmlnaHQpIDwgMC4wMDAwMDAxO1xufTtcblxuLy8gRW5jYXBzdWxhdGVzIHVwZGF0ZSBhbmQgZGVsZXRlIG11dGF0aW9ucyBmb3IgZXhwZW5zZSBzaGVldCBoZWFkZXIgZGV0YWlsLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldERldGFpbE11dGF0aW9ucyA9ICh7XG4gIGJ1c3ksXG4gIGlzRWRpdGluZyxcbiAgaXNDcmVhdGVNb2RlLFxuICBpc0VkaXRMb2NrZWQsXG4gIGlzRGVsZXRlTG9ja2VkLFxuICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyxcbiAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxuICBsb2NrZWRDdXJyZW5jeUNvZGUsXG4gIGxvY2tlZEV4Y2hhbmdlUmF0ZSxcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcbiAgY2FuRWRpdEV4cGVuc2UsXG4gIGNhbkRlbGV0ZUV4cGVuc2UsXG4gIGNhbkVkaXRIZWFkZXJGaWVsZHMsXG4gIGNhbkVkaXRTdGF0dXMsXG4gIHNoZWV0SWQsXG4gIGRyYWZ0RGVzY3JpcHRpb24sXG4gIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICBkcmFmdEV4Y2hhbmdlUmF0ZSxcbiAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcbiAgZHJhZnRQcm9qZWN0SWQsXG4gIGRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzLFxuICBkcmFmdEVzdGFkb0NvbWVudGFyaW9zLFxuICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXG4gIGN1cnJlbnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gIGN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlLFxuICBvbkNyZWF0ZVN1Y2Nlc3MsXG4gIHNldE1vZGFsRXJyb3IsXG4gIHNldEJ1c3ksXG4gIHNldFN0YXR1cyxcbiAgc2V0SXNFZGl0aW5nLFxufTogVXNlRXhwZW5zZVNoZWV0RGV0YWlsTXV0YXRpb25zQXJncykgPT4ge1xuICBjb25zdCBoYW5kbGVVcGRhdGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKGJ1c3kgfHwgIWlzRWRpdGluZykgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghaXNDcmVhdGVNb2RlICYmIGlzRWRpdExvY2tlZCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgY2FuUHJvY2VlZCA9IGlzQ3JlYXRlTW9kZSA/IGNhbkNyZWF0ZUV4cGVuc2UgOiBjYW5FZGl0RXhwZW5zZTtcbiAgICBpZiAoIWNhblByb2NlZWQpIHtcbiAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBub3JtYWxpemVkQ3VycmVuY3kgPSBTdHJpbmcoXG4gICAgICBpc0N1cnJlbmN5TG9ja2VkQnlMaW5lcyA/IChsb2NrZWRDdXJyZW5jeUNvZGUgfHwgZHJhZnRDdXJyZW5jeUNvZGUgfHwgXCJcIikgOiAoZHJhZnRDdXJyZW5jeUNvZGUgfHwgXCJcIilcbiAgICApXG4gICAgICAudHJpbSgpXG4gICAgICAudG9VcHBlckNhc2UoKTtcbiAgICBjb25zdCBub3JtYWxpemVkRGVzY3JpcHRpb24gPSBTdHJpbmcoZHJhZnREZXNjcmlwdGlvbiB8fCBcIlwiKS50cmltKCk7XG4gICAgY29uc3Qgbm9ybWFsaXplZFByb2plY3RJZCA9IFN0cmluZyhkcmFmdFByb2plY3RJZCB8fCBcIlwiKS50cmltKCk7XG4gICAgY29uc3Qgbm9ybWFsaXplZEVzdGFkb0NvbWVudGFyaW9zID0gY2FuRWRpdFN0YXR1cyA/IFN0cmluZyhkcmFmdEVzdGFkb0NvbWVudGFyaW9zIHx8IFwiXCIpLnRyaW0oKSA6IFwiXCI7XG4gICAgY29uc3Qgbm9ybWFsaXplZEV4Y2hhbmdlUmF0ZVJhdyA9IFN0cmluZyhcbiAgICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyA/IChsb2NrZWRFeGNoYW5nZVJhdGUgfHwgZHJhZnRFeGNoYW5nZVJhdGUgfHwgXCJcIikgOiAoZHJhZnRFeGNoYW5nZVJhdGUgfHwgXCJcIilcbiAgICApO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kgPSBTdHJpbmcoZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5IHx8IFwiRVVSXCIpLnRyaW0oKS50b1VwcGVyQ2FzZSgpIHx8IFwiRVVSXCI7XG4gICAgY29uc3QgcmVxdWlyZXNFeGNoYW5nZVJhdGUgPVxuICAgICAgY2FuRWRpdEhlYWRlckZpZWxkcyAmJiBub3JtYWxpemVkQ3VycmVuY3kgIT09IFwiXCIgJiYgbm9ybWFsaXplZEN1cnJlbmN5ICE9PSBub3JtYWxpemVkQmFzZUN1cnJlbmN5O1xuICAgIGNvbnN0IHBhcnNlZEV4Y2hhbmdlUmF0ZSA9IG5vcm1hbGl6ZUV4Y2hhbmdlUmF0ZShub3JtYWxpemVkRXhjaGFuZ2VSYXRlUmF3KTtcbiAgICBjb25zdCBvZmZpY2lhbEV4Y2hhbmdlUmF0ZSA9IG5vcm1hbGl6ZUV4Y2hhbmdlUmF0ZShvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKTtcbiAgICBjb25zdCBvcmlnaW5hbEV4Y2hhbmdlUmF0ZSA9IG5vcm1hbGl6ZUV4Y2hhbmdlUmF0ZShsb2NrZWRFeGNoYW5nZVJhdGUpO1xuICAgIGNvbnN0IHBhcnNlZEN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlID0gTnVtYmVyKGN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlKTtcbiAgICBjb25zdCBoYXNDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA9IE51bWJlci5pc0ludGVnZXIocGFyc2VkQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUpICYmIHBhcnNlZEN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlID49IDA7XG4gICAgY29uc3QgaGFzVmFsaWRSYXRlID0gcGFyc2VkRXhjaGFuZ2VSYXRlICE9IG51bGwgJiYgcGFyc2VkRXhjaGFuZ2VSYXRlID4gMDtcbiAgICBjb25zdCBwYXJzZWREcmFmdFN0YXR1cyA9IE51bWJlcihkcmFmdEV4cGVuc2VTaGVldFN0YXR1cyk7XG4gICAgY29uc3QgaGFzRHJhZnRTdGF0dXMgPSBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZERyYWZ0U3RhdHVzKSAmJiBwYXJzZWREcmFmdFN0YXR1cyA+PSAwO1xuICAgIGNvbnN0IGhhc01hbnVhbFJhdGVFZGl0T25VcGRhdGUgPVxuICAgICAgY2FuRWRpdEhlYWRlckZpZWxkcyAmJlxuICAgICAgIWlzQ3JlYXRlTW9kZSAmJlxuICAgICAgaGFzVmFsaWRSYXRlICYmXG4gICAgICAob3JpZ2luYWxFeGNoYW5nZVJhdGUgPT0gbnVsbCB8fCAhYXJlUmF0ZXNFcXVpdmFsZW50KHBhcnNlZEV4Y2hhbmdlUmF0ZSwgb3JpZ2luYWxFeGNoYW5nZVJhdGUpKTtcbiAgICAvLyBPbmx5IHNlbmQgZXhjaGFuZ2VSYXRlTW9kZSB3aGVuIHRoZSB1c2VyIGFjdHVhbGx5IGNoYW5nZWQgdGhlIHJhdGUgbWFudWFsbHkuXG4gICAgY29uc3QgaXNNYW51YWxFeGNoYW5nZVJhdGUgPSAoKCkgPT4ge1xuICAgICAgaWYgKCFjYW5FZGl0SGVhZGVyRmllbGRzKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAoIXJlcXVpcmVzRXhjaGFuZ2VSYXRlIHx8ICFoYXNWYWxpZFJhdGUpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmIChpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmICghaXNDcmVhdGVNb2RlICYmICFoYXNNYW51YWxSYXRlRWRpdE9uVXBkYXRlKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAob2ZmaWNpYWxFeGNoYW5nZVJhdGUgPT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gICAgICByZXR1cm4gIWFyZVJhdGVzRXF1aXZhbGVudChwYXJzZWRFeGNoYW5nZVJhdGUsIG9mZmljaWFsRXhjaGFuZ2VSYXRlKTtcbiAgICB9KSgpO1xuICAgIGNvbnN0IHJlc29sdmVkRXhjaGFuZ2VSYXRlTW9kZSA9IGNhbkVkaXRIZWFkZXJGaWVsZHNcbiAgICAgID8gKGlzTWFudWFsRXhjaGFuZ2VSYXRlXG4gICAgICAgID8gMVxuICAgICAgICA6IChub3JtYWxpemVkRXN0YWRvQ29tZW50YXJpb3MgPyAoaGFzQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUgPyBwYXJzZWRDdXJyZW50RXhjaGFuZ2VSYXRlTW9kZSA6IDApIDogdW5kZWZpbmVkKSlcbiAgICAgIDogKGhhc0N1cnJlbnRFeGNoYW5nZVJhdGVNb2RlID8gcGFyc2VkQ3VycmVudEV4Y2hhbmdlUmF0ZU1vZGUgOiB1bmRlZmluZWQpO1xuICAgIGNvbnN0IHJlc29sdmVkRXhwZW5zZVNoZWV0U3RhdHVzID0gaGFzRHJhZnRTdGF0dXMgPyBwYXJzZWREcmFmdFN0YXR1cyA6IChjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzID8/IHVuZGVmaW5lZCk7XG5cbiAgICBpZiAoaXNDcmVhdGVNb2RlKSB7XG4gICAgICBpZiAoIW5vcm1hbGl6ZWREZXNjcmlwdGlvbikge1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uTWVzc2FnZSA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fRGVzY3JpcHRpb25SZXF1aXJlZFwiLCBcIkRlc2NyaXB0aW9uIGlzIHJlcXVpcmVkLlwiKTtcbiAgICAgICAgc2V0TW9kYWxFcnJvcih2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICAgIHNldFN0YXR1cyh2YWxpZGF0aW9uTWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFub3JtYWxpemVkQ3VycmVuY3kpIHtcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbk1lc3NhZ2UgPSBpbmRUKFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0N1cnJlbmN5UmVxdWlyZWRcIiwgXCJDdXJyZW5jeSBpcyByZXF1aXJlZC5cIik7XG4gICAgICAgIHNldE1vZGFsRXJyb3IodmFsaWRhdGlvbk1lc3NhZ2UpO1xuICAgICAgICBzZXRTdGF0dXModmFsaWRhdGlvbk1lc3NhZ2UpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlcXVpcmVzRXhjaGFuZ2VSYXRlICYmICFoYXNWYWxpZFJhdGUpIHtcbiAgICAgIGNvbnN0IHZhbGlkYXRpb25NZXNzYWdlID0gaW5kVChcbiAgICAgICAgXCJFeHBlbnNlU2hlZXRzX1ZhbGlkYXRpb25fRXhjaGFuZ2VSYXRlUmVxdWlyZWRcIixcbiAgICAgICAgXCJFeGNoYW5nZSByYXRlIGlzIHJlcXVpcmVkIHdoZW4gY3VycmVuY3kgaXMgZGlmZmVyZW50IGZyb20gYmFzZSBjdXJyZW5jeS5cIlxuICAgICAgKTtcbiAgICAgIHNldE1vZGFsRXJyb3IodmFsaWRhdGlvbk1lc3NhZ2UpO1xuICAgICAgc2V0U3RhdHVzKHZhbGlkYXRpb25NZXNzYWdlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBleGVjdXRlRXhwZW5zZU11dGF0aW9uKHtcbiAgICAgIHN0YXJ0U3RhdHVzOiBpc0NyZWF0ZU1vZGVcbiAgICAgICAgPyBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpXG4gICAgICAgIDogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1VwZGF0aW5nXCIsIFwiVXBkYXRpbmcgZXhwZW5zZSBzaGVldC4uLlwiKSxcbiAgICAgIGZhbGxiYWNrRXJyb3JNZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRXJyb3JcIiwgXCJVcGRhdGUgZXJyb3IuXCIpLFxuICAgICAgc2V0TW9kYWxFcnJvcixcbiAgICAgIHNldEJ1c3ksXG4gICAgICBzZXRTdGF0dXMsXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgICAgIGNvbnN0IHBheWxvYWQ6IEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QgPSB7XG4gICAgICAgICAgICBtb2RlOiAxLFxuICAgICAgICAgICAgZXhpc3RpbmdIb2phR2FzdG9zSWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBub3JtYWxpemVkRGVzY3JpcHRpb24sXG4gICAgICAgICAgICBjdXJyZW5jeUNvZGU6IG5vcm1hbGl6ZWRDdXJyZW5jeSxcbiAgICAgICAgICAgIGV4Y2hSYXRlOiBoYXNWYWxpZFJhdGUgPyBOdW1iZXIocGFyc2VkRXhjaGFuZ2VSYXRlKSA6IDEsXG4gICAgICAgICAgICBwcm9qSWQ6IG5vcm1hbGl6ZWRQcm9qZWN0SWQgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgZXhwZW5zZVNoZWV0U3RhdHVzOiAwLFxuICAgICAgICAgICAgZXhjaGFuZ2VSYXRlTW9kZTogcmVzb2x2ZWRFeGNoYW5nZVJhdGVNb2RlLFxuICAgICAgICAgICAgbGluZXM6IFtdLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNyZWF0ZUV4cGVuc2VTaGVldChwYXlsb2FkKTtcblxuICAgICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBBY2NlcHQgYm90aCBjYXNpbmcgdmFyaWFudHMgZnJvbSBiYWNrZW5kIGVudmVsb3Blcy5cbiAgICAgICAgICBjb25zdCBjcmVhdGVkRGF0YSA9IHJlc3BvbnNlPy5EYXRhIGFzIHsgSG9qYUdhc3Rvc0lkPzogdW5rbm93bjsgaG9qYUdhc3Rvc0lkPzogdW5rbm93biB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAgICAgICBjb25zdCBjcmVhdGVkU2hlZXRJZCA9IFN0cmluZyhjcmVhdGVkRGF0YT8uSG9qYUdhc3Rvc0lkID8/IGNyZWF0ZWREYXRhPy5ob2phR2FzdG9zSWQgPz8gXCJcIikudHJpbSgpO1xuICAgICAgICAgIGlmICghY3JlYXRlZFNoZWV0SWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG9uQ3JlYXRlU3VjY2VzcyhjcmVhdGVkU2hlZXRJZCk7XG4gICAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIlNhdmVcIikpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGF5bG9hZDogRXhwZW5zZVNoZWV0SGVhZGVyVXBkYXRlUmVxdWVzdCA9IHtcbiAgICAgICAgICBkZXNjcmlwdGlvbjogU3RyaW5nKGRyYWZ0RGVzY3JpcHRpb24gfHwgXCJcIikudHJpbSgpLFxuICAgICAgICAgIGN1cnJlbmN5Q29kZTogbm9ybWFsaXplZEN1cnJlbmN5LFxuICAgICAgICAgIGV4Y2hSYXRlOiBoYXNWYWxpZFJhdGUgPyBOdW1iZXIocGFyc2VkRXhjaGFuZ2VSYXRlKSA6IDEsXG4gICAgICAgICAgcHJvaklkOiBTdHJpbmcoZHJhZnRQcm9qZWN0SWQgfHwgXCJcIikudHJpbSgpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICBleHBlbnNlU2hlZXRTdGF0dXM6IHJlc29sdmVkRXhwZW5zZVNoZWV0U3RhdHVzLFxuICAgICAgICAgIGV4Y2hhbmdlUmF0ZU1vZGU6IHJlc29sdmVkRXhjaGFuZ2VSYXRlTW9kZSxcbiAgICAgICAgICBlc3RhZG9Db21lbnRhcmlvczogY2FuRWRpdFN0YXR1cyA/IG5vcm1hbGl6ZWRFc3RhZG9Db21lbnRhcmlvcyA6IHVuZGVmaW5lZCxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHVwZGF0ZUV4cGVuc2VTaGVldEhlYWRlcihzaGVldElkLCBwYXlsb2FkKTtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfVXBkYXRlRmFpbGVkXCIsIFwiVXBkYXRlIGZhaWxlZC5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0U3RhdHVzKGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9VcGRhdGVkXCIsIFwiRXhwZW5zZSBzaGVldCB1cGRhdGVkXCIpKTtcbiAgICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdC5vaztcbiAgfSwgW1xuICAgIGJ1c3ksXG4gICAgY2FuQ3JlYXRlRXhwZW5zZSxcbiAgICBjYW5FZGl0RXhwZW5zZSxcbiAgICBjYW5FZGl0SGVhZGVyRmllbGRzLFxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIGRyYWZ0RGVzY3JpcHRpb24sXG4gICAgZHJhZnRFeGNoYW5nZVJhdGUsXG4gICAgZHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gICAgZHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlLFxuICAgIGRyYWZ0UHJvamVjdElkLFxuICAgIGV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSxcbiAgICBjdXJyZW50RXhwZW5zZVNoZWV0U3RhdHVzLFxuICAgIGN1cnJlbnRFeGNoYW5nZVJhdGVNb2RlLFxuICAgIGNhbkVkaXRTdGF0dXMsXG4gICAgaXNDcmVhdGVNb2RlLFxuICAgIGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzLFxuICAgIGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyxcbiAgICBpc0VkaXRMb2NrZWQsXG4gICAgaXNFZGl0aW5nLFxuICAgIGxvY2tlZEN1cnJlbmN5Q29kZSxcbiAgICBsb2NrZWRFeGNoYW5nZVJhdGUsXG4gICAgb25DcmVhdGVTdWNjZXNzLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0SXNFZGl0aW5nLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgc2V0U3RhdHVzLFxuICAgIHNoZWV0SWQsXG4gIF0pO1xuXG4gIGNvbnN0IGhhbmRsZURlbGV0ZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoYnVzeSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChpc0RlbGV0ZUxvY2tlZCkgcmV0dXJuIGZhbHNlO1xuICAgIGlmICghY2FuRGVsZXRlRXhwZW5zZSkge1xuICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGV4ZWN1dGVFeHBlbnNlTXV0YXRpb24oe1xuICAgICAgc3RhcnRTdGF0dXM6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGluZ1wiLCBcIkRlbGV0aW5nIGV4cGVuc2Ugc2hlZXQuLi5cIiksXG4gICAgICBmYWxsYmFja0Vycm9yTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZUVycm9yXCIsIFwiRGVsZXRlIGVycm9yLlwiKSxcbiAgICAgIHNldE1vZGFsRXJyb3IsXG4gICAgICBzZXRCdXN5LFxuICAgICAgc2V0U3RhdHVzLFxuICAgICAgYWN0aW9uOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZGVsZXRlRXhwZW5zZVNoZWV0KHNoZWV0SWQpO1xuXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRTdGF0dXMoaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX0RlbGV0ZWRcIiwgXCJFeHBlbnNlIHNoZWV0IGRlbGV0ZWRcIikpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0Lm9rO1xuICB9LCBbYnVzeSwgY2FuRGVsZXRlRXhwZW5zZSwgaXNEZWxldGVMb2NrZWQsIHNldEJ1c3ksIHNldE1vZGFsRXJyb3IsIHNldFN0YXR1cywgc2hlZXRJZF0pO1xuXG4gIHJldHVybiB7XG4gICAgaGFuZGxlVXBkYXRlLFxuICAgIGhhbmRsZURlbGV0ZSxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyB1c2VFeHBlbnNlVG9wYmFyQ3J1ZEFjdGlvbnMgfSBmcm9tIFwiLi4vaG9va3MvdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zLnRzXCI7XG5pbXBvcnQgeyBuYXZpZ2F0ZVRvRXhwZW5zZVVybCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50c1wiO1xuXG50eXBlIFVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnNBcmdzID0ge1xuICBidXN5OiBib29sZWFuO1xuICBtb2RhbE9wZW46IGJvb2xlYW47XG4gIGlzRWRpdGluZzogYm9vbGVhbjtcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xuICBpc0xvY2tlZDogYm9vbGVhbjtcbiAgaXNFZGl0TG9ja2VkPzogYm9vbGVhbjtcbiAgaXNEZWxldGVMb2NrZWQ/OiBib29sZWFuO1xuICBwZXJtaXNzaW9uc1JlYWR5PzogYm9vbGVhbjtcbiAgY2FuRWRpdEV4cGVuc2U6IGJvb2xlYW47XG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XG4gIGNhbkRlbGV0ZUV4cGVuc2U6IGJvb2xlYW47XG4gIHNldE1vZGFsRXJyb3I6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBoYW5kbGVFbmFibGVFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xuICBoYW5kbGVVcGRhdGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIGhhbmRsZURlbGV0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcbiAgb25TYXZlU3VjY2VzczogKCkgPT4gdm9pZDtcbiAgb25EZWxldGVTdWNjZXNzPzogKCkgPT4gdm9pZDtcbiAgb3BlbkNvbmZpcm06IChvcHRzOiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBtZXNzYWdlOiBzdHJpbmc7XG4gICAgY29uZmlybVRleHQ/OiBzdHJpbmc7XG4gICAgb25Db25maXJtPzogKCkgPT4gUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gfCBib29sZWFuIHwgdm9pZDtcbiAgfSkgPT4gdm9pZDtcbiAgY2xvc2VDb25maXJtOiAoKSA9PiB2b2lkO1xufTtcblxuLy8gQ29vcmRpbmF0ZXMgdG9wYmFyIGljb24gc3RhdGUgYW5kIGRpc3BhdGNoIGFjdGlvbnMgZm9yIGV4cGVuc2Ugc2hlZXQgZGV0YWlsLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldERldGFpbFRvcGJhckFjdGlvbnMgPSAoe1xuICBidXN5LFxuICBtb2RhbE9wZW4sXG4gIGlzRWRpdGluZyxcbiAgaXNDcmVhdGVNb2RlLFxuICBpc0xvY2tlZCxcbiAgaXNFZGl0TG9ja2VkLFxuICBpc0RlbGV0ZUxvY2tlZCxcbiAgcGVybWlzc2lvbnNSZWFkeSA9IHRydWUsXG4gIGNhbkVkaXRFeHBlbnNlLFxuICBjYW5DcmVhdGVFeHBlbnNlLFxuICBjYW5EZWxldGVFeHBlbnNlLFxuICBzZXRNb2RhbEVycm9yLFxuICBoYW5kbGVFbmFibGVFZGl0LFxuICBoYW5kbGVDYW5jZWxFZGl0LFxuICBoYW5kbGVVcGRhdGUsXG4gIGhhbmRsZURlbGV0ZSxcbiAgb25TYXZlU3VjY2VzcyxcbiAgb25EZWxldGVTdWNjZXNzLFxuICBvcGVuQ29uZmlybSxcbiAgY2xvc2VDb25maXJtLFxufTogVXNlRXhwZW5zZVNoZWV0RGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MpID0+IHtcbiAgdXNlRXhwZW5zZVRvcGJhckNydWRBY3Rpb25zKHtcbiAgICBhY3Rpb25Hcm91cElkOiBcImV4cGVuc2Utc2hlZXQtZGV0YWlsLWFjdGlvbnNcIixcbiAgICBpZHM6IHtcbiAgICAgIGVkaXRJY29uSWQ6IFwiZXhwZW5zZUVkaXRJY29uXCIsXG4gICAgICBzYXZlSWNvbklkOiBcImV4cGVuc2VTYXZlSWNvblwiLFxuICAgICAgZGVsZXRlQnRuSWQ6IFwiZXhwZW5zZURlbGV0ZUJ0blwiLFxuICAgICAgY2FuY2VsQnRuSWQ6IFwiZXhwZW5zZUNhbmNlbEJ0blwiLFxuICAgIH0sXG4gICAgZXZlbnRzOiB7XG4gICAgICBlZGl0RXZlbnQ6IFwiZXhwZW5zZS1kZXRhaWwtZWRpdFwiLFxuICAgICAgZGVsZXRlRXZlbnQ6IFwiZXhwZW5zZS1kZXRhaWwtZGVsZXRlXCIsXG4gICAgICBjYW5jZWxFdmVudDogXCJleHBlbnNlLWRldGFpbC1jYW5jZWwtZWRpdFwiLFxuICAgIH0sXG4gICAgYnVzeSxcbiAgICBtb2RhbE9wZW4sXG4gICAgaXNFZGl0aW5nLFxuICAgIGlzQ3JlYXRlTW9kZSxcbiAgICBpc0xvY2tlZCxcbiAgICBpc0VkaXRMb2NrZWQsXG4gICAgaXNEZWxldGVMb2NrZWQsXG4gICAgYWxsb3dDcmVhdGVNb2RlQWN0aW9uc1doZW5Mb2NrZWQ6IHRydWUsXG4gICAgcGVybWlzc2lvbnNSZWFkeSxcbiAgICBjYW5DcmVhdGU6IGNhbkNyZWF0ZUV4cGVuc2UsXG4gICAgY2FuRWRpdDogY2FuRWRpdEV4cGVuc2UsXG4gICAgY2FuRGVsZXRlOiBjYW5EZWxldGVFeHBlbnNlLFxuICAgIHNldE1vZGFsRXJyb3IsXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxuICAgIGhhbmRsZVNhdmU6IGhhbmRsZVVwZGF0ZSxcbiAgICBoYW5kbGVEZWxldGUsXG4gICAgc2F2ZUNvbmZpcm1UaXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX1RpdGxlXCIsIFwiU2F2ZSBjaGFuZ2VzXCIpLFxuICAgIHNhdmVDb25maXJtTWVzc2FnZTogaW5kVChcIkV4cGVuc2VTaGVldHNfRGV0YWlsX1NhdmVDaGFuZ2VzX0JvZHlcIiwgXCJEbyB5b3Ugd2FudCB0byBzYXZlIGNoYW5nZXM/XCIpLFxuICAgIHNhdmVDb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9TYXZlXCIsIFwiU2F2ZVwiKSxcbiAgICBkZWxldGVDb25maXJtVGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX0RldGFpbF9EZWxldGVTaGVldF9UaXRsZVwiLCBcIkRlbGV0ZSBleHBlbnNlIHNoZWV0XCIpLFxuICAgIGRlbGV0ZUNvbmZpcm1NZXNzYWdlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRGVsZXRlU2hlZXRfQm9keVwiLCBcIkRvIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIGV4cGVuc2Ugc2hlZXQ/XCIpLFxuICAgIGRlbGV0ZUNvbmZpcm1UZXh0OiBpbmRUKFwiQ29tbW9uX0RlbGV0ZVwiLCBcIkRlbGV0ZVwiKSxcbiAgICBvblNhdmVTdWNjZXNzLFxuICAgIG9uRGVsZXRlU3VjY2Vzczogb25EZWxldGVTdWNjZXNzIHx8ICgoKSA9PiBuYXZpZ2F0ZVRvRXhwZW5zZVVybChcIi9HYXN0b3MvRXhwZW5zZVNoZWV0c1wiKSksXG4gICAgb3BlbkNvbmZpcm0sXG4gICAgY2xvc2VDb25maXJtLFxuICB9KTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7XG4gIEV4cGVuc2VTaGVldEhlYWRlcixcbiAgRXhwZW5zZVNoZWV0TGluZSxcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHtcbiAgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwsXG4gIGdldEV4Y2hhbmdlUmF0ZSxcbiAgZ2V0RXhwZW5zZVNoZWV0RGVmYXVsdEN1cnJlbmN5Q29kZSxcbiAgbWFwRXhwZW5zZVNoZWV0SGVhZGVyLFxuICBtYXBFeHBlbnNlU2hlZXRMaW5lLFxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHtcbiAgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkLFxuICBuYXZpZ2F0ZVRvRXhwZW5zZVVybCxcbiAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCxcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsIH0gZnJvbSBcIi4uL2NvbnN0YW50cy9leGNoYW5nZVJhdGVFbnRyeU1vZGVDYXRhbG9nLnRzXCI7XG5pbXBvcnQgeyBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUsIGhhc0Fzc2lnbmVkVm91Y2hlciwgcGFyc2VFeHBlbnNlRGF0ZSwgc2FmZVRleHQsIHRvSXNvRGF0ZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyLCBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xuXG5jb25zdCBFWENIQU5HRV9SQVRFX0RFQk9VTkNFX01TID0gNDAwO1xuY29uc3QgRVhDSEFOR0VfUkFURV9SRUZFUkVOQ0VfQU1PVU5UID0gMTAwO1xuY29uc3QgRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyA9IDc7XG5jb25zdCBFWFBFTlNFX1NUQVRVU19BUFBST1ZFRCA9IDI7XG5jb25zdCBFWFBFTlNFX1NUQVRVU19QQUlEID0gNDtcblxuLy8gTm9ybWFsaXplcyBleGNoYW5nZS1yYXRlIG51bWJlcnMgZm9yIG51bWVyaWMgaW5wdXQgY29udHJvbHMuXG5jb25zdCBmb3JtYXRFeGNoYW5nZVJhdGVJbnB1dFZhbHVlID0gKHZhbHVlOiBudW1iZXIpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKHZhbHVlLCB7XG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICBmYWxsYmFjazogXCJcIixcbiAgfSk7XG59O1xuXG5jb25zdCBidWlsZENyZWF0ZUhlYWRlckRyYWZ0ID0gKCk6IEV4cGVuc2VTaGVldEhlYWRlciA9PiB7XG4gIHJldHVybiB7XG4gICAgaG9qYUdhc3Rvc0lkOiBcIlwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlwiLFxuICAgIHByb2pJZDogXCJcIixcbiAgICBjdXJyZW5jeUNvZGU6IFwiXCIsXG4gICAgdG90YWxBbW91bnQ6IG51bGwsXG4gICAgZXhwZW5zZVNoZWV0U3RhdHVzOiAwLFxuICAgIGV4Y2hhbmdlUmF0ZU1vZGU6IDAsXG4gICAgY3JlYXRlZERhdGU6IFwiXCIsXG4gICAgZXhjaFJhdGU6IFwiMVwiLFxuICB9O1xufTtcblxuY29uc3Qgc2hvdWxkU2hvd0V4Y2hhbmdlUmF0ZSA9ICh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIGlmICghdmFsdWUpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KHZhbHVlKTtcbiAgaWYgKHBhcnNlZCA9PT0gbnVsbCkgcmV0dXJuIHRydWU7XG4gIHJldHVybiBNYXRoLmFicyhwYXJzZWQpID4gMDtcbn07XG5cbnR5cGUgVXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGVBcmdzID0ge1xuICBoYXNBY2Nlc3M6IGJvb2xlYW47XG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XG4gIGNhbkVkaXRFeHBlbnNlOiBib29sZWFuO1xuICBjYW5FZGl0SGVhZGVyRmllbGRzOiBib29sZWFuO1xuICBjYW5FZGl0QXBwcm92ZWRTdGF0dXM6IGJvb2xlYW47XG4gIHNoZWV0SWQ6IHN0cmluZztcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcbn07XG5cbi8vIE93bnMgc3RhdGUgYW5kIGJlaGF2aW9yIGZvciBleHBlbnNlIHNoZWV0IGRldGFpbCBwYWdlIChyZWFkLCBlZGl0LCBjcmVhdGUpLlxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldERldGFpbFN0YXRlID0gKHtcbiAgaGFzQWNjZXNzLFxuICBjYW5DcmVhdGVFeHBlbnNlLFxuICBjYW5FZGl0RXhwZW5zZSxcbiAgY2FuRWRpdEhlYWRlckZpZWxkcyxcbiAgY2FuRWRpdEFwcHJvdmVkU3RhdHVzLFxuICBzaGVldElkLFxuICBpc0NyZWF0ZU1vZGUsXG4gIG9uRm9yYmlkZGVuLFxufTogVXNlRXhwZW5zZVNoZWV0RGV0YWlsU3RhdGVBcmdzKSA9PiB7XG4gIGNvbnN0IFtoZWFkZXIsIHNldEhlYWRlcl0gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRIZWFkZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2xpbmVzLCBzZXRMaW5lc10gPSB1c2VTdGF0ZTxFeHBlbnNlU2hlZXRMaW5lW10+KFtdKTtcbiAgY29uc3QgW2xpbmVQYWdlLCBzZXRMaW5lUGFnZV0gPSB1c2VTdGF0ZSgxKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzdGF0dXMsIHNldFN0YXR1c10gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2lzRWRpdGluZywgc2V0SXNFZGl0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW21vZGFsRXJyb3IsIHNldE1vZGFsRXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtkcmFmdERlc2NyaXB0aW9uLCBzZXREcmFmdERlc2NyaXB0aW9uXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRQcm9qZWN0SWQsIHNldERyYWZ0UHJvamVjdElkXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRDdXJyZW5jeUNvZGUsIHNldERyYWZ0Q3VycmVuY3lDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRFeGNoYW5nZVJhdGUsIHNldERyYWZ0RXhjaGFuZ2VSYXRlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMsIHNldERyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzXSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbZHJhZnRFc3RhZG9Db21lbnRhcmlvcywgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvc10gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2RlZmF1bHRDdXJyZW5jeUNvZGUsIHNldERlZmF1bHRDdXJyZW5jeUNvZGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtpc0V4Y2hhbmdlUmF0ZUxvYWRpbmcsIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtleGNoYW5nZVJhdGVNZXNzYWdlLCBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IsIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW29mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUsIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlLCBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbb2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlLCBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGVdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSwgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2VdID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgY29uc3QgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciA9IHVzZUNhbGxiYWNrKChuZXh0SGVhZGVyOiBFeHBlbnNlU2hlZXRIZWFkZXIgfCBudWxsKSA9PiB7XG4gICAgc2V0RHJhZnREZXNjcmlwdGlvbihzYWZlVGV4dChuZXh0SGVhZGVyPy5kZXNjcmlwdGlvbikpO1xuICAgIHNldERyYWZ0UHJvamVjdElkKHNhZmVUZXh0KG5leHRIZWFkZXI/LnByb2pJZCkpO1xuICAgIHNldERyYWZ0Q3VycmVuY3lDb2RlKHNhZmVUZXh0KG5leHRIZWFkZXI/LmN1cnJlbmN5Q29kZSkpO1xuICAgIHNldERyYWZ0RXhjaGFuZ2VSYXRlKFxuICAgICAgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKG5leHRIZWFkZXI/LmV4Y2hSYXRlLCB7XG4gICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcbiAgICAgICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxuICAgICAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICAgICAgZmFsbGJhY2s6IFwiXCIsXG4gICAgICB9KVxuICAgICk7XG4gICAgY29uc3QgbmV4dFN0YXR1cyA9IE51bWJlcihuZXh0SGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMpO1xuICAgIHNldERyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzKE51bWJlci5pc0ludGVnZXIobmV4dFN0YXR1cykgJiYgbmV4dFN0YXR1cyA+PSAwID8gbmV4dFN0YXR1cyA6IDApO1xuICAgIHNldERyYWZ0RXN0YWRvQ29tZW50YXJpb3Moc2FmZVRleHQobmV4dEhlYWRlcj8uZXN0YWRvQ29tZW50YXJpb3MpKTtcbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbG9hZERldGFpbCA9IGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghaGFzQWNjZXNzKSB7XG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgICBpZiAoIWNhbkNyZWF0ZUV4cGVuc2UpIHtcbiAgICAgICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRyYWZ0SGVhZGVyID0gYnVpbGRDcmVhdGVIZWFkZXJEcmFmdCgpO1xuICAgICAgICBzZXRIZWFkZXIoZHJhZnRIZWFkZXIpO1xuICAgICAgICBzZXRMaW5lcyhbXSk7XG4gICAgICAgIHNldExpbmVQYWdlKDEpO1xuICAgICAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XG4gICAgICAgIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIoZHJhZnRIZWFkZXIpO1xuICAgICAgICBzZXRTdGF0dXMoXCJcIik7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXNoZWV0SWQpIHtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05vdEZvdW5kXCIsIFwiRXhwZW5zZSBzaGVldCB3YXMgbm90IGZvdW5kLlwiKSk7XG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgc2V0TGluZXMoW10pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldERldGFpbChzaGVldElkLCB7XG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChyZXNwb25zZT8uU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzcG9uc2U/Lk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBkZXRhaWwuXCIpKTtcbiAgICAgICAgICBzZXRIZWFkZXIobnVsbCk7XG4gICAgICAgICAgc2V0TGluZXMoW10pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNoZWV0cyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkU2hlZXQgPVxuICAgICAgICAgIHNoZWV0cy5maW5kKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnk/LkhvamFHYXN0b3NJZCkudG9VcHBlckNhc2UoKSA9PT0gc2hlZXRJZC50cmltKCkudG9VcHBlckNhc2UoKSkgfHwgc2hlZXRzWzBdO1xuXG4gICAgICAgIGlmICghc2VsZWN0ZWRTaGVldCkge1xuICAgICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19Ob3RGb3VuZFwiLCBcIkV4cGVuc2Ugc2hlZXQgd2FzIG5vdCBmb3VuZC5cIikpO1xuICAgICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgICBzZXRMaW5lcyhbXSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV4dEhlYWRlciA9IG1hcEV4cGVuc2VTaGVldEhlYWRlcihzZWxlY3RlZFNoZWV0KTtcbiAgICAgICAgY29uc3QgbmV4dExpbmVzID0gKEFycmF5LmlzQXJyYXkoc2VsZWN0ZWRTaGVldC5MaW5lcykgPyBzZWxlY3RlZFNoZWV0LkxpbmVzIDogW10pLm1hcCgoZW50cnkpID0+XG4gICAgICAgICAgbWFwRXhwZW5zZVNoZWV0TGluZShlbnRyeSlcbiAgICAgICAgKTtcbiAgICAgICAgc2V0SGVhZGVyKG5leHRIZWFkZXIpO1xuICAgICAgICBzZXRMaW5lcyhuZXh0TGluZXMpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciAmJiBlcnJvci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKFxuICAgICAgICAgIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBkZXRhaWwuXCIpXG4gICAgICAgICk7XG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcbiAgICAgICAgc2V0TGluZXMoW10pO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdm9pZCBsb2FkRGV0YWlsKCk7XG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlLCBoYXNBY2Nlc3MsIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIsIGlzQ3JlYXRlTW9kZSwgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaGVhZGVyIHx8IGlzRWRpdGluZykgcmV0dXJuO1xuICAgIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIoaGVhZGVyKTtcbiAgfSwgW2hlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNFZGl0aW5nXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWhhc0FjY2VzcykgcmV0dXJuO1xuICAgIGxldCBpc0NhbmNlbGxlZCA9IGZhbHNlO1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cbiAgICBjb25zdCBsb2FkRGVmYXVsdEN1cnJlbmN5Q29kZSA9IGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSBhd2FpdCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlKHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XG4gICAgICAgIHNldERlZmF1bHRDdXJyZW5jeUNvZGUoc2FmZVRleHQoY29kZSkudG9VcHBlckNhc2UoKSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHJldHVybjtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdm9pZCBsb2FkRGVmYXVsdEN1cnJlbmN5Q29kZSgpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpc0NhbmNlbGxlZCA9IHRydWU7XG4gICAgICBjb250cm9sbGVyLmFib3J0KCk7XG4gICAgfTtcbiAgfSwgW2hhc0FjY2Vzc10pO1xuXG4gIGNvbnN0IGhhc0FjdGl2ZVByb2Nlc3MgPSB1c2VNZW1vKCgpID0+IGJ1c3kgfHwgaXNFZGl0aW5nLCBbYnVzeSwgaXNFZGl0aW5nXSk7XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZChoYXNBY3RpdmVQcm9jZXNzKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkKCk7XG4gICAgfTtcbiAgfSwgW2hhc0FjdGl2ZVByb2Nlc3NdKTtcblxuICBjb25zdCBwcm9qZWN0VmFsdWUgPSBzYWZlVGV4dChoZWFkZXI/LnByb2pJZCk7XG4gIGNvbnN0IHN0YXR1c0NvZGUgPSB0eXBlb2YgaGVhZGVyPy5leHBlbnNlU2hlZXRTdGF0dXMgPT09IFwibnVtYmVyXCIgPyBoZWFkZXIuZXhwZW5zZVNoZWV0U3RhdHVzIDogbnVsbDtcbiAgY29uc3QgaXNTaGVldEFwcHJvdmVkID0gc3RhdHVzQ29kZSA9PT0gRVhQRU5TRV9TVEFUVVNfQVBQUk9WRUQ7XG4gIGNvbnN0IGlzU2hlZXRQYWlkQnlTdGF0dXMgPSBzdGF0dXNDb2RlID09PSBFWFBFTlNFX1NUQVRVU19QQUlEO1xuICBjb25zdCBpc1NoZWV0UGFpZEJ5Vm91Y2hlciA9IGhhc0Fzc2lnbmVkVm91Y2hlcihoZWFkZXI/LnZvdWNoZXIpO1xuICBjb25zdCBpc1NoZWV0UGFpZCA9IGlzU2hlZXRQYWlkQnlTdGF0dXMgfHwgaXNTaGVldFBhaWRCeVZvdWNoZXI7XG4gIGNvbnN0IGlzU2hlZXRMb2NrZWQgPSBpc1NoZWV0QXBwcm92ZWQgfHwgaXNTaGVldFBhaWQ7XG4gIGNvbnN0IGlzU2hlZXRFZGl0TG9ja2VkID0gaXNTaGVldFBhaWQgfHwgKGlzU2hlZXRBcHByb3ZlZCAmJiAhY2FuRWRpdEFwcHJvdmVkU3RhdHVzKTtcbiAgY29uc3QgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQgPSBjYW5FZGl0SGVhZGVyRmllbGRzICYmICFpc1NoZWV0QXBwcm92ZWQgJiYgIWlzU2hlZXRQYWlkO1xuICBjb25zdCBoYXNMaW5lcyA9IGxpbmVzLmxlbmd0aCA+IDA7XG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZVZhbHVlID0gZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKHNhZmVUZXh0KGhlYWRlcj8uZXhjaFJhdGUpLCB7XG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBFWENIQU5HRV9SQVRFX0RFQ0lNQUxfRElHSVRTLFxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogRVhDSEFOR0VfUkFURV9ERUNJTUFMX0RJR0lUUyxcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICBmYWxsYmFjazogXCJcIixcbiAgfSk7XG4gIGNvbnN0IHNob3dFeGNoYW5nZVJhdGUgPSB1c2VNZW1vKCgpID0+IHNob3VsZFNob3dFeGNoYW5nZVJhdGUoZXhjaGFuZ2VSYXRlVmFsdWUpLCBbZXhjaGFuZ2VSYXRlVmFsdWVdKTtcbiAgY29uc3Qgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgPSB1c2VNZW1vKCgpID0+IGRyYWZ0Q3VycmVuY3lDb2RlLnRyaW0oKS50b1VwcGVyQ2FzZSgpLCBbZHJhZnRDdXJyZW5jeUNvZGVdKTtcbiAgY29uc3Qgbm9ybWFsaXplZERlZmF1bHRDdXJyZW5jeSA9IHVzZU1lbW8oKCkgPT4gc2FmZVRleHQoZGVmYXVsdEN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSwgW2RlZmF1bHRDdXJyZW5jeUNvZGVdKTtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5ID0gbm9ybWFsaXplZERlZmF1bHRDdXJyZW5jeSB8fCBcIkVVUlwiO1xuICBjb25zdCB1aUxvY2FsZSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBcImVzLUVTXCI7XG4gICAgcmV0dXJuIHNhZmVUZXh0KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudD8ubGFuZykgfHwgXCJlcy1FU1wiO1xuICB9LCBbXSk7XG4gIGNvbnN0IGZvcm1FeGNoYW5nZURhdGUgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBwYXJzZWREYXRlID0gcGFyc2VFeHBlbnNlRGF0ZShzYWZlVGV4dChoZWFkZXI/LmNyZWF0ZWREYXRlKSk7XG4gICAgaWYgKHBhcnNlZERhdGUpIHJldHVybiB0b0lzb0RhdGUocGFyc2VkRGF0ZSk7XG4gICAgcmV0dXJuIHRvSXNvRGF0ZShuZXcgRGF0ZSgpKTtcbiAgfSwgW2hlYWRlcj8uY3JlYXRlZERhdGVdKTtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlUmVxdWlyZWQgPVxuICAgIGlzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCAmJiBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSAhPT0gXCJcIiAmJiBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSAhPT0gZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5O1xuICBjb25zdCBleGNoYW5nZVJhdGVWYWxpZGF0aW9uTWVzc2FnZSA9XG4gICAgZXhjaGFuZ2VSYXRlUmVxdWlyZWQgJiYgIWRyYWZ0RXhjaGFuZ2VSYXRlLnRyaW0oKVxuICAgICAgPyBpbmRUKFxuICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19WYWxpZGF0aW9uX0V4Y2hhbmdlUmF0ZVJlcXVpcmVkXCIsXG4gICAgICAgICAgXCJFeGNoYW5nZSByYXRlIGlzIHJlcXVpcmVkIHdoZW4gY3VycmVuY3kgaXMgZGlmZmVyZW50IGZyb20gYmFzZSBjdXJyZW5jeS5cIlxuICAgICAgICApXG4gICAgICA6IFwiXCI7XG4gIC8vIEN1cnJlbmN5IHR5cGUgY2FuIGJlIGVkaXRlZCB3aGVuZXZlciB0aGUgc2hlZXQgaXRzZWxmIGlzIGVkaXRhYmxlIChub3QgYXBwcm92ZWQvcGFpZCkuXG4gIGNvbnN0IGlzQ3VycmVuY3lMb2NrZWRCeUxpbmVzID0gZmFsc2U7XG4gIGNvbnN0IGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcyA9IGlzRWRpdGluZyAmJiBjYW5FZGl0SGVhZGVyRmllbGRzQ3VycmVudCAmJiBoYXNMaW5lcyAmJiBzaG93RXhjaGFuZ2VSYXRlO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGlzQ2FuY2VsbGVkID0gZmFsc2U7XG4gICAgbGV0IHJlcXVlc3RUaW1lcjogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4gfCBudWxsID0gbnVsbDtcbiAgICBsZXQgcmVxdWVzdEFib3J0Q29udHJvbGxlcjogQWJvcnRDb250cm9sbGVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICBjb25zdCBjbGVhclJlcXVlc3RBcnRpZmFjdHMgPSAoKSA9PiB7XG4gICAgICBpZiAocmVxdWVzdFRpbWVyKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChyZXF1ZXN0VGltZXIpO1xuICAgICAgICByZXF1ZXN0VGltZXIgPSBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKHJlcXVlc3RBYm9ydENvbnRyb2xsZXIpIHtcbiAgICAgICAgcmVxdWVzdEFib3J0Q29udHJvbGxlci5hYm9ydCgpO1xuICAgICAgICByZXF1ZXN0QWJvcnRDb250cm9sbGVyID0gbnVsbDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKCFpc0VkaXRpbmcgfHwgIWNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50IHx8IGlzRXhjaGFuZ2VSYXRlTG9ja2VkQnlMaW5lcykge1xuICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKGZhbHNlKTtcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXCJcIik7XG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmICghbm9ybWFsaXplZERyYWZ0Q3VycmVuY3kgfHwgIWV4Y2hhbmdlUmF0ZUJhc2VDdXJyZW5jeSkge1xuICAgICAgc2V0SXNFeGNoYW5nZVJhdGVMb2FkaW5nKGZhbHNlKTtcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXCJcIik7XG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChub3JtYWxpemVkRHJhZnRDdXJyZW5jeSA9PT0gZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5KSB7XG4gICAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZShcIjFcIik7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiMVwiKTtcbiAgICAgIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZyhmYWxzZSk7XG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKFwiXCIpO1xuICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIHJlcXVlc3RUaW1lciA9IHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgcmVxdWVzdEFib3J0Q29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgIHNldElzRXhjaGFuZ2VSYXRlTG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXCJcIik7XG4gICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcihmYWxzZSk7XG4gICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xuICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVSYXdWYWx1ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShcIlwiKTtcbiAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldEV4Y2hhbmdlUmF0ZShcbiAgICAgICAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcbiAgICAgICAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXG4gICAgICAgICAgZm9ybUV4Y2hhbmdlRGF0ZSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgIHNpZ25hbDogcmVxdWVzdEFib3J0Q29udHJvbGxlci5zaWduYWwsXG4gICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2VzcyB8fCAhcmVzcG9uc2UuRGF0YSB8fCAhTnVtYmVyLmlzRmluaXRlKE51bWJlcihyZXNwb25zZS5EYXRhLlJhdGUpKSkge1xuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xuICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXG4gICAgICAgICAgICBzYWZlVGV4dChyZXNwb25zZS5NZXNzYWdlKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBvZmZpY2lhbFJhdGVSYXcgPSBOdW1iZXIocmVzcG9uc2UuRGF0YS5SYXRlKTtcbiAgICAgICAgY29uc3Qgb2ZmaWNpYWxSYXRlRm9yQW1vdW50MTAwID0gb2ZmaWNpYWxSYXRlUmF3ICogRVhDSEFOR0VfUkFURV9SRUZFUkVOQ0VfQU1PVU5UO1xuICAgICAgICBjb25zdCBuZXh0RXhjaGFuZ2VSYXRlVmFsdWUgPSBmb3JtYXRFeGNoYW5nZVJhdGVJbnB1dFZhbHVlKG9mZmljaWFsUmF0ZUZvckFtb3VudDEwMCk7XG4gICAgICAgIGNvbnN0IG9mZmljaWFsUmF0ZVJhd1ZhbHVlID0gZm9ybWF0RXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZShvZmZpY2lhbFJhdGVSYXcpO1xuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKG5leHRFeGNoYW5nZVJhdGVWYWx1ZSk7XG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUob2ZmaWNpYWxSYXRlUmF3VmFsdWUpO1xuICAgICAgICBzZXREcmFmdEV4Y2hhbmdlUmF0ZShuZXh0RXhjaGFuZ2VSYXRlVmFsdWUpO1xuXG4gICAgICAgIGNvbnN0IGVmZmVjdGl2ZVJhdGVEYXRlID0gc2FmZVRleHQocmVzcG9uc2UuRGF0YS5EYXRlKSB8fCBmb3JtRXhjaGFuZ2VEYXRlO1xuICAgICAgICBjb25zdCBzb3VyY2UgPSBzYWZlVGV4dChyZXNwb25zZS5EYXRhLlNvdXJjZSk7XG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZShlZmZlY3RpdmVSYXRlRGF0ZSk7XG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKHNvdXJjZSk7XG4gICAgICAgIGNvbnN0IG9mZmljaWFsTGFiZWwgPSBnZXRFeHBlbnNlRXhjaGFuZ2VSYXRlTW9kZUxhYmVsKDApIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9FeGNoYW5nZVJhdGVNb2RlX09mZmljaWFsXCIsIFwiVC5DLiBPZmljaWFsXCIpO1xuICAgICAgICBjb25zdCBsb2NhbGl6ZWRSYXRlRGF0ZSA9IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZShlZmZlY3RpdmVSYXRlRGF0ZSwgdWlMb2NhbGUpIHx8IGVmZmVjdGl2ZVJhdGVEYXRlO1xuICAgICAgICBjb25zdCBleGNoYW5nZVJhdGVJbmZvTWVzc2FnZSA9IHNvdXJjZSA/IGAke29mZmljaWFsTGFiZWx9ICR7bG9jYWxpemVkUmF0ZURhdGV9ICgke3NvdXJjZX0pYCA6IGAke29mZmljaWFsTGFiZWx9ICR7bG9jYWxpemVkUmF0ZURhdGV9YDtcbiAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZShvZmZpY2lhbFJhdGVSYXdWYWx1ZSA/IGAke2V4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlfSAtICR7b2ZmaWNpYWxSYXRlUmF3VmFsdWV9YCA6IGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlKTtcbiAgICAgICAgc2V0RXhjaGFuZ2VSYXRlTWVzc2FnZUlzRXJyb3IoZmFsc2UpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSBcIkFib3J0RXJyb3JcIikgcmV0dXJuO1xuXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHtcbiAgICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlVmFsdWUoXCJcIik7XG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVTb3VyY2UoXCJcIik7XG4gICAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9Ob3RGb3VuZFwiLCBcIk5vIGhheSB0aXBvIGRlIGNhbWJpbyBwYXJhIGxhIGZlY2hhXCIpKTtcbiAgICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2VJc0Vycm9yKHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQyMiB8fCBlcnJvci5zdGF0dXMgPT09IDUwMCkge1xuICAgICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZShcIlwiKTtcbiAgICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XG4gICAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZShcIlwiKTtcbiAgICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXG4gICAgICAgICAgICAgIHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9VbmF2YWlsYWJsZVwiLCBcIk5vIHNlIHB1ZG8gb2J0ZW5lciBlbCB0aXBvIGRlIGNhbWJpby5cIilcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXCJcIik7XG4gICAgICAgICAgc2V0T2ZmaWNpYWxFeGNoYW5nZVJhdGVEYXRlKFwiXCIpO1xuICAgICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xuICAgICAgICAgIHNldEV4Y2hhbmdlUmF0ZU1lc3NhZ2UoXG4gICAgICAgICAgICBzYWZlVGV4dChlcnJvci5tZXNzYWdlKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfVW5hdmFpbGFibGVcIiwgXCJObyBzZSBwdWRvIG9idGVuZXIgZWwgdGlwbyBkZSBjYW1iaW8uXCIpXG4gICAgICAgICAgKTtcbiAgICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVZhbHVlKFwiXCIpO1xuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKFwiXCIpO1xuICAgICAgICBzZXRPZmZpY2lhbEV4Y2hhbmdlUmF0ZURhdGUoXCJcIik7XG4gICAgICAgIHNldE9mZmljaWFsRXhjaGFuZ2VSYXRlU291cmNlKFwiXCIpO1xuICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9VbmF2YWlsYWJsZVwiLCBcIk5vIHNlIHB1ZG8gb2J0ZW5lciBlbCB0aXBvIGRlIGNhbWJpby5cIikpO1xuICAgICAgICBzZXRFeGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcih0cnVlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmICghaXNDYW5jZWxsZWQpIHtcbiAgICAgICAgICBzZXRJc0V4Y2hhbmdlUmF0ZUxvYWRpbmcoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgRVhDSEFOR0VfUkFURV9ERUJPVU5DRV9NUyk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaXNDYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgY2xlYXJSZXF1ZXN0QXJ0aWZhY3RzKCk7XG4gICAgfTtcbiAgfSwgW1xuICAgIGNhbkVkaXRIZWFkZXJGaWVsZHNDdXJyZW50LFxuICAgIGZvcm1FeGNoYW5nZURhdGUsXG4gICAgZXhjaGFuZ2VSYXRlQmFzZUN1cnJlbmN5LFxuICAgIGlzRWRpdGluZyxcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvY2tlZEJ5TGluZXMsXG4gICAgbm9ybWFsaXplZERyYWZ0Q3VycmVuY3ksXG4gICAgdWlMb2NhbGUsXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXG4gIF0pO1xuXG4gIGNvbnN0IGhhbmRsZUVuYWJsZUVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGlzQ3JlYXRlTW9kZSB8fCBpc0xvYWRpbmcgfHwgIWhlYWRlciB8fCBpc1NoZWV0RWRpdExvY2tlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghY2FuRWRpdEV4cGVuc2UpIHtcbiAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcbiAgICBzZXRJc0VkaXRpbmcodHJ1ZSk7XG4gICAgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlcihoZWFkZXIpO1xuICAgIHNldFN0YXR1cyhpbmRUKFwiRXhwZW5zZVNoZWV0c19EZXRhaWxfRWRpdGluZ0VuYWJsZWRcIiwgXCJFZGl0aW5nIGVuYWJsZWRcIikpO1xuICB9LCBbY2FuRWRpdEV4cGVuc2UsIGhlYWRlciwgaHlkcmF0ZURyYWZ0RnJvbUhlYWRlciwgaXNDcmVhdGVNb2RlLCBpc0xvYWRpbmcsIGlzU2hlZXRFZGl0TG9ja2VkLCBvbkZvcmJpZGRlbl0pO1xuXG4gIGNvbnN0IGhhbmRsZUNhbmNlbEVkaXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwoXCIvR2FzdG9zL0V4cGVuc2VTaGVldHNcIiwge1xuICAgICAgICBhc2tDb25maXJtYXRpb246IHRydWUsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWlzRWRpdGluZykgcmV0dXJuO1xuXG4gICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xuICAgIGh5ZHJhdGVEcmFmdEZyb21IZWFkZXIoaGVhZGVyKTtcbiAgICBzZXRTdGF0dXMoaW5kVChcIkNvbW1vbl9DYW5jZWxcIiwgXCJDYW5jZWxcIikpO1xuICB9LCBbaGVhZGVyLCBoeWRyYXRlRHJhZnRGcm9tSGVhZGVyLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZ10pO1xuXG4gIC8vIE9wZW5zIGV4cGVuc2Ugc2hlZXQgY3JlYXRlIG1vZGUgZnJvbSBsaXN0LWxldmVsIGVudHJ5IHBvaW50cy5cbiAgY29uc3QgaGFuZGxlT3BlbkNyZWF0ZVNoZWV0TW9kZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWNhbkNyZWF0ZUV4cGVuc2UpIHtcbiAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKFwiL0dhc3Rvcy9FeHBlbnNlU2hlZXREZXRhaWw/bW9kZT1jcmVhdGVcIiwge1xuICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXG4gICAgfSk7XG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgb25Gb3JiaWRkZW5dKTtcblxuICAvLyBPcGVucyBleHBlbnNlIGxpbmUgY3JlYXRlIG1vZGUgZnJvbSBhbiBleGlzdGluZyBleHBlbnNlIHNoZWV0IGRldGFpbC5cbiAgY29uc3QgaGFuZGxlT3BlbkNyZWF0ZUxpbmVNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSB8fCAhc2hlZXRJZCB8fCBpc1NoZWV0TG9ja2VkKSB7XG4gICAgICBvbkZvcmJpZGRlbigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc0NyZWF0ZU1vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXRMaW5lRGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzaGVldElkKX0mbW9kZT1jcmVhdGVgO1xuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCwge1xuICAgICAgYXNrQ29uZmlybWF0aW9uOiBpc0VkaXRpbmcsXG4gICAgfSk7XG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlLCBpc0NyZWF0ZU1vZGUsIGlzRWRpdGluZywgaXNTaGVldExvY2tlZCwgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcblxuICAvLyBPcGVucyB0aWNrZXRzIHBhZ2UgZnJvbSBleHBlbnNlIHNoZWV0IGNvbnRleHQgdG8gY3JlYXRlIG9yIGxpbmsgdGlja2V0cy5cbiAgY29uc3Qgb3BlblRpY2tldHNGcm9tU2hlZXQgPSB1c2VDYWxsYmFjayhcbiAgICAoYWN0aW9uOiBcIm5ld1wiIHwgXCJsaW5rXCIpID0+IHtcbiAgICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSB8fCAhc2hlZXRJZCB8fCBpc1NoZWV0TG9ja2VkKSB7XG4gICAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzQ3JlYXRlTW9kZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XG4gICAgICAgIGFjdGlvbixcbiAgICAgICAgaG9qYUdhc3Rvc0lkOiBzaGVldElkLFxuICAgICAgfSk7XG4gICAgICBuYXZpZ2F0ZVRvRXhwZW5zZVVybChgL0dhc3Rvcy9UaWNrZXRzPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogaXNFZGl0aW5nLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbY2FuQ3JlYXRlRXhwZW5zZSwgaXNDcmVhdGVNb2RlLCBpc0VkaXRpbmcsIGlzU2hlZXRMb2NrZWQsIG9uRm9yYmlkZGVuLCBzaGVldElkXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZU9wZW5DcmVhdGVUaWNrZXRNb2RlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIG9wZW5UaWNrZXRzRnJvbVNoZWV0KFwibmV3XCIpO1xuICB9LCBbb3BlblRpY2tldHNGcm9tU2hlZXRdKTtcblxuICBjb25zdCBoYW5kbGVPcGVuTGlua1RpY2tldE1vZGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgb3BlblRpY2tldHNGcm9tU2hlZXQoXCJsaW5rXCIpO1xuICB9LCBbb3BlblRpY2tldHNGcm9tU2hlZXRdKTtcblxuICBjb25zdCBuYXZpZ2F0ZVRvQ3JlYXRlZFNoZWV0ID0gdXNlQ2FsbGJhY2soKGNyZWF0ZWRTaGVldElkOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBzYWZlQ3JlYXRlZFNoZWV0SWQgPSBzYWZlVGV4dChjcmVhdGVkU2hlZXRJZCk7XG4gICAgaWYgKCFzYWZlQ3JlYXRlZFNoZWV0SWQpIHJldHVybjtcblxuICAgIGNvbnN0IHRhcmdldFVybCA9IGAvR2FzdG9zL0V4cGVuc2VTaGVldERldGFpbD9ob2phR2FzdG9zSWQ9JHtlbmNvZGVVUklDb21wb25lbnQoc2FmZUNyZWF0ZWRTaGVldElkKX1gO1xuICAgIG5hdmlnYXRlVG9FeHBlbnNlVXJsKHRhcmdldFVybCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBuYXZpZ2F0ZVRvTGluZURldGFpbCA9IHVzZUNhbGxiYWNrKFxuICAgIChsaW5lUmVjSWQ6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3Qgc2FmZUxpbmVJZCA9IHNhZmVUZXh0KGxpbmVSZWNJZCk7XG4gICAgICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KHNoZWV0SWQpO1xuICAgICAgaWYgKCFzYWZlTGluZUlkIHx8ICFzYWZlU2hlZXRJZCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCB0YXJnZXRVcmwgPSBgL0dhc3Rvcy9FeHBlbnNlU2hlZXRMaW5lRGV0YWlsP2hvamFHYXN0b3NJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlU2hlZXRJZCl9JmxpbmVSZWNJZD0ke2VuY29kZVVSSUNvbXBvbmVudChzYWZlTGluZUlkKX1gO1xuICAgICAgbmF2aWdhdGVUb0V4cGVuc2VVcmwodGFyZ2V0VXJsLCB7XG4gICAgICAgIGFza0NvbmZpcm1hdGlvbjogdHJ1ZSxcbiAgICAgICAgYnlwYXNzR3VhcmRPbmNlOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW3NoZWV0SWRdXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBoZWFkZXIsXG4gICAgbGluZXMsXG4gICAgbGluZVBhZ2UsXG4gICAgaXNMb2FkaW5nLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBidXN5LFxuICAgIHN0YXR1cyxcbiAgICBpc0VkaXRpbmcsXG4gICAgbW9kYWxFcnJvcixcbiAgICBkcmFmdERlc2NyaXB0aW9uLFxuICAgIGRyYWZ0UHJvamVjdElkLFxuICAgIGRyYWZ0Q3VycmVuY3lDb2RlLFxuICAgIGRyYWZ0RXhjaGFuZ2VSYXRlLFxuICAgIGRyYWZ0RXhwZW5zZVNoZWV0U3RhdHVzLFxuICAgIGRyYWZ0RXN0YWRvQ29tZW50YXJpb3MsXG4gICAgb2ZmaWNpYWxFeGNoYW5nZVJhdGVWYWx1ZSxcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVJhd1ZhbHVlLFxuICAgIG9mZmljaWFsRXhjaGFuZ2VSYXRlRGF0ZSxcbiAgICBvZmZpY2lhbEV4Y2hhbmdlUmF0ZVNvdXJjZSxcbiAgICBpc0V4Y2hhbmdlUmF0ZUxvYWRpbmcsXG4gICAgZXhjaGFuZ2VSYXRlTWVzc2FnZSxcbiAgICBleGNoYW5nZVJhdGVNZXNzYWdlSXNFcnJvcixcbiAgICBwcm9qZWN0VmFsdWUsXG4gICAgaXNTaGVldEFwcHJvdmVkLFxuICAgIGlzU2hlZXRQYWlkLFxuICAgIGlzU2hlZXRMb2NrZWQsXG4gICAgaXNTaGVldEVkaXRMb2NrZWQsXG4gICAgZXhjaGFuZ2VSYXRlVmFsdWUsXG4gICAgc2hvd0V4Y2hhbmdlUmF0ZSxcbiAgICBub3JtYWxpemVkRHJhZnRDdXJyZW5jeSxcbiAgICBleGNoYW5nZVJhdGVCYXNlQ3VycmVuY3ksXG4gICAgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlQW1vdW50OiBFWENIQU5HRV9SQVRFX1JFRkVSRU5DRV9BTU9VTlQsXG4gICAgZXhjaGFuZ2VSYXRlVmFsaWRhdGlvbk1lc3NhZ2UsXG4gICAgY2FuRWRpdEhlYWRlckZpZWxkc0N1cnJlbnQsXG4gICAgaXNDdXJyZW5jeUxvY2tlZEJ5TGluZXMsXG4gICAgaXNFeGNoYW5nZVJhdGVMb2NrZWRCeUxpbmVzLFxuICAgIHNldExpbmVQYWdlLFxuICAgIHNldExpbmVzLFxuICAgIHNldEJ1c3ksXG4gICAgc2V0U3RhdHVzLFxuICAgIHNldElzRWRpdGluZyxcbiAgICBzZXRNb2RhbEVycm9yLFxuICAgIHNldERyYWZ0RGVzY3JpcHRpb24sXG4gICAgc2V0RHJhZnRQcm9qZWN0SWQsXG4gICAgc2V0RHJhZnRDdXJyZW5jeUNvZGUsXG4gICAgc2V0RHJhZnRFeGNoYW5nZVJhdGUsXG4gICAgc2V0RHJhZnRFeHBlbnNlU2hlZXRTdGF0dXMsXG4gICAgc2V0RHJhZnRFc3RhZG9Db21lbnRhcmlvcyxcbiAgICBoYW5kbGVFbmFibGVFZGl0LFxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXG4gICAgaGFuZGxlT3BlbkNyZWF0ZVNoZWV0TW9kZSxcbiAgICBoYW5kbGVPcGVuQ3JlYXRlTGluZU1vZGUsXG4gICAgaGFuZGxlT3BlbkNyZWF0ZVRpY2tldE1vZGUsXG4gICAgaGFuZGxlT3BlbkxpbmtUaWNrZXRNb2RlLFxuICAgIG5hdmlnYXRlVG9DcmVhdGVkU2hlZXQsXG4gICAgbmF2aWdhdGVUb0xpbmVEZXRhaWwsXG4gIH07XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUE4RDs7O0FDQTlELElBQUFDLGdCQUE4RDtBQUM5RCx1QkFBNkI7OztBQ0Q3QixtQkFBNkY7QUFFN0YsSUFBTSx1QkFBdUI7QUFTdEIsSUFBTSxpQ0FBaUMsTUFBNEM7QUFDeEYsUUFBTSxpQkFBYSxxQkFBOEIsSUFBSTtBQUNyRCxRQUFNLHdCQUFvQixxQkFBc0IsSUFBSTtBQUNwRCxRQUFNLDJCQUF1QixxQkFBc0IsSUFBSTtBQUN2RCxRQUFNLENBQUMsV0FBVyxZQUFZLFFBQUksdUJBQVMsSUFBSTtBQUMvQyxRQUFNLENBQUMsZ0JBQWdCLGlCQUFpQixRQUFJLHVCQUFTLENBQUM7QUFFdEQsUUFBTSxvQkFBZ0IsNkJBQWUsTUFBTTtBQUN6QyxVQUFNLFVBQVUsV0FBVztBQUMzQixRQUFJLENBQUMsUUFBUztBQUVkLFVBQU0sYUFBYSxLQUFLLEtBQUssUUFBUSxzQkFBc0IsRUFBRSxNQUFNO0FBQ25FLHNCQUFrQixDQUFDLGFBQWMsS0FBSyxJQUFJLFdBQVcsVUFBVSxJQUFJLElBQUksV0FB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QUFBLFFBQ0E7QUFBQSxRQUNBLDBCQUEwQjtBQUFBLFFBQzFCLHdCQUF3QjtBQUFBLFFBQ3hCLDJCQUEyQjtBQUFBLFFBQzNCLDJCQUEyQjtBQUFBLFFBQzNCLGlDQUFpQztBQUFBLFFBQ2pDLGdDQUFnQztBQUFBO0FBQUEsSUFDbEMsSUFDRTtBQUFBLElBRUgsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsZUFDNUQ7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDO0FBQUEsUUFDQSxjQUFjLFNBQVMsUUFBUSxZQUFZO0FBQUEsUUFDM0M7QUFBQSxRQUNBO0FBQUEsUUFDQSxZQUFZLEtBQUssdUJBQXVCLE9BQU87QUFBQSxRQUMvQyxXQUFXLEtBQUsseUJBQXlCLGtDQUFrQztBQUFBLFFBQzNFO0FBQUEsUUFDQSxjQUFjO0FBQUEsUUFDZCxrQkFBa0I7QUFBQSxRQUNsQixZQUFZO0FBQUE7QUFBQSxJQUNkLElBQ0U7QUFBQSxJQUVILDBCQUNDLDZDQUFDLG1DQUFnQyxJQUMvQjtBQUFBLElBRUgsa0NBQWtDLENBQUMsZ0JBQWdCLENBQUMsZ0JBQ25EO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxXQUFXLEtBQUssNkJBQTZCLGtCQUFrQjtBQUFBLFFBQy9ELE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLFFBQVEsMEJBQTBCLG9DQUFvQztBQUFBLFFBQ3RFLGVBQWUsS0FBSyw2QkFBNkIsa0JBQWtCO0FBQUEsUUFDbkUsV0FBVztBQUFBO0FBQUEsSUFDYixJQUNFO0FBQUEsS0FDTjtBQUVKO0FBR0EsSUFBTSx5QkFBeUIsTUFBTTtBQUNuQyxTQUNFLDZDQUFDLGdDQUFxQix5QkFBdUIsTUFDM0MsdURBQUMsaUNBQThCLEdBQ2pDO0FBRUo7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQiwwQkFBd0I7QUFDeEIsUUFBTSxTQUFTLFNBQVMsZUFBZSwyQkFBMkI7QUFDbEUsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsUUFBUSw2Q0FBQywwQkFBdUIsQ0FBRTtBQUNyRDtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8saUNBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3RfZG9tIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiUmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJwYXlsb2FkIiwgInJlc3BvbnNlIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
