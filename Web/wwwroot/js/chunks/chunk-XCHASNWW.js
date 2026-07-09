import {
  ExpenseCurrencyFilterSelect_default
} from "./chunk-NQ4U2E7D.js";
import {
  EXPENSE_LINE_EXCHANGE_RATE_REFERENCE_AMOUNT,
  mapExpenseTicketDetailHeader,
  mapExpenseTicketDetailLine,
  normalizeExpenseLineCurrencyCode
} from "./chunk-P4AXZIYH.js";
import {
  ExpenseSectionDivider_default,
  InfoPopoverIconButton_default
} from "./chunk-YAWCN7JA.js";
import {
  ExpenseTimelineCard_default
} from "./chunk-KLQHZ5CJ.js";
import {
  CompactPagination_default
} from "./chunk-GLDIL3AG.js";
import {
  formatAmountWithCurrency,
  formatExpenseInputNumber,
  formatExpenseNumber,
  parseExpenseNumericInput
} from "./chunk-DDCTTA2H.js";
import {
  fetchExpenseSheetTicket,
  fetchExpenseSheetTicketPreviewBlob,
  getExchangeRate,
  safeText
} from "./chunk-63PNSQ5Z.js";
import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-2NKOKBT5.js";
import {
  ApiFetchError,
  indFormat,
  indT
} from "./chunk-PNIKV5DC.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/pages/gastos/utils/expenseExchangeRate.ts
var toPositiveNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};
var formatExpenseExchangeRateInputValue = (value) => {
  return formatExpenseInputNumber(value, {
    minimumFractionDigits: 7,
    maximumFractionDigits: 7,
    useGrouping: true,
    fallback: ""
  });
};
var formatExpenseExchangeRateRawValue = (value) => {
  return formatExpenseInputNumber(value, {
    minimumFractionDigits: 7,
    maximumFractionDigits: 7,
    useGrouping: false,
    fallback: ""
  });
};
var fetchExpenseOfficialExchangeRate = async ({
  localCurrencyCode,
  expenseCurrencyCode,
  date,
  signal
}) => {
  const localCurrency = normalizeExpenseLineCurrencyCode(localCurrencyCode);
  const expenseCurrency = normalizeExpenseLineCurrencyCode(expenseCurrencyCode);
  const exchangeDate = safeText(date);
  if (!localCurrency || !expenseCurrency) {
    return null;
  }
  if (localCurrency === expenseCurrency) {
    return {
      exchangeRate: EXPENSE_LINE_EXCHANGE_RATE_REFERENCE_AMOUNT,
      rawRate: 1,
      date: exchangeDate,
      source: ""
    };
  }
  const response = await getExchangeRate(localCurrency, expenseCurrency, exchangeDate, {
    suppressPermissionModal: true,
    signal
  });
  const data = response.Data;
  const rawRate = toPositiveNumber(data?.Rate ?? data?.rate);
  if (!response.Success || !data || rawRate === null) {
    throw new Error(
      safeText(response.Message) || indT("ExpenseSheets_ExchangeRate_Unavailable", "No se pudo obtener el tipo de cambio.")
    );
  }
  return {
    exchangeRate: rawRate * EXPENSE_LINE_EXCHANGE_RATE_REFERENCE_AMOUNT,
    rawRate,
    date: safeText(data.Date ?? data.date) || exchangeDate,
    source: safeText(data.Source ?? data.source)
  };
};
var buildExpenseExchangeRateInfoMessage = ({
  rawRate,
  exchangeRate,
  date,
  source
}) => {
  const rawRateText = formatExpenseExchangeRateRawValue(rawRate);
  const parsedExchangeRate = parseExpenseNumericInput(exchangeRate);
  if (rawRateText) {
    return indFormat(
      "ExpenseSheets_ExchangeRate_InfoPopover_Detail",
      "Tipo de cambio obtenido {0}\nFecha: {1}\nOrigen: {2}",
      rawRateText,
      safeText(date) || indT("Common_NotAvailable", "N/A"),
      safeText(source) || indT("Common_NotAvailable", "N/A")
    );
  }
  return indFormat(
    "ExpenseSheets_ExchangeRate_InfoPopover_Stored",
    "Tipo de cambio {0} {1}",
    "manual",
    formatExpenseExchangeRateRawValue(
      parsedExchangeRate != null ? parsedExchangeRate / EXPENSE_LINE_EXCHANGE_RATE_REFERENCE_AMOUNT : null
    ) || formatExpenseExchangeRateInputValue(exchangeRate) || "-"
  );
};

// Web/wwwroot/react/src/pages/gastos/tickets/detail/useExpenseTicketDetailState.ts
var import_react = __toESM(require_react());
var useExpenseTicketDetailState = ({ hasAccess, fileId, onForbidden, enabled = true }) => {
  const [header, setHeader] = (0, import_react.useState)(null);
  const [lines, setLines] = (0, import_react.useState)([]);
  const [isLoading, setIsLoading] = (0, import_react.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react.useState)("");
  const reloadDetail = (0, import_react.useCallback)(async () => {
    if (!enabled) {
      setHeader(null);
      setLines([]);
      setErrorMessage("");
      setIsLoading(false);
      return;
    }
    if (!hasAccess) {
      onForbidden();
      return;
    }
    const safeFileId = safeText(fileId);
    if (!safeFileId) {
      setErrorMessage(indT("Tickets_Detail_NotFound", "Ticket was not found."));
      setHeader(null);
      setLines([]);
      return;
    }
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await fetchExpenseSheetTicket(safeFileId, {
        suppressPermissionModal: true
      });
      if (response?.Success === false) {
        setErrorMessage(response?.Message || indT("Tickets_Detail_LoadError", "Could not load ticket detail."));
        setHeader(null);
        setLines([]);
        return;
      }
      const items = Array.isArray(response?.Items) ? response.Items : [];
      const selected = items.find((entry) => safeText(entry?.FileId).toUpperCase() === safeFileId.toUpperCase()) || items[0] || null;
      if (!selected) {
        setErrorMessage(indT("Tickets_Detail_NotFound", "Ticket was not found."));
        setHeader(null);
        setLines([]);
        return;
      }
      const mappedHeader = mapExpenseTicketDetailHeader(selected);
      const mappedLines = (Array.isArray(selected.Lines) ? selected.Lines : []).map(
        (line) => mapExpenseTicketDetailLine(line)
      );
      setHeader(mappedHeader);
      setLines(mappedLines);
    } catch (error) {
      if (error instanceof ApiFetchError && error.status === 403) {
        onForbidden();
        return;
      }
      setErrorMessage(error instanceof Error ? error.message : indT("Tickets_Detail_LoadError", "Could not load ticket detail."));
      setHeader(null);
      setLines([]);
    } finally {
      setIsLoading(false);
    }
  }, [enabled, fileId, hasAccess, onForbidden]);
  (0, import_react.useEffect)(() => {
    void reloadDetail();
  }, [reloadDetail]);
  return {
    header,
    lines,
    isLoading,
    errorMessage,
    reloadDetail
  };
};

// Web/wwwroot/react/src/pages/gastos/components/ExpenseTicketLinesList.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var formatQtyValue = (value) => {
  return formatExpenseNumber(value, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
    fallback: "-"
  });
};
var EMPTY_DATE_PARTS = {
  year: "--",
  month: "--",
  day: "--"
};
var TICKET_LINE_DATE_PANEL_ICON = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: "size-10 text-[#00296be0]",
    "aria-hidden": "true",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 3v4a1 1 0 0 0 1 1h4" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 7l1 0" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 13l6 0" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13 17l2 0" })
    ]
  }
);
var ExpenseTicketLinesList = ({
  visibleLines,
  totalLinePages,
  linePage,
  currencyCode,
  paginationLabels,
  containerRef,
  onLinePageChange,
  onOpenLine
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "space-y-0", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseSectionDivider_default, { label: indT("Tickets_Detail_Lines", "Lines"), className: "expense-section-divider--spaced" }),
    visibleLines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "timeline-box timeline-empty", "data-empty-text": indT("Tickets_Detail_NoLines", "No lines for this ticket.") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: containerRef, className: "timeline-box", children: visibleLines.map((line) => {
      const amountText = formatAmountWithCurrency(line.totalAmount, currencyCode);
      const qtyText = formatQtyValue(line.qty);
      const title = line.description || line.recId || "-";
      const subtitle = `${indT("ExpenseSheets_Field_Qty", "Quantity")}: ${qtyText}`;
      const lineKey = String(line.recId || "").trim() || [line.description, line.totalAmount, line.price, line.qty].map((value) => String(value || "").trim()).join("|");
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "timeline-item", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ExpenseTimelineCard_default,
        {
          dateParts: EMPTY_DATE_PARTS,
          datePanelContent: TICKET_LINE_DATE_PANEL_ICON,
          title,
          subtitle,
          subtitleClassName: "expense-sheet-card__subtitle expense-line-card__meta text-left",
          amountText,
          onOpen: () => onOpenLine(line.recId),
          titleClassName: "timeline-name expense-line-card__title text-left"
        }
      ) }, lineKey);
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var ExpenseTicketLinesList_default = ExpenseTicketLinesList;

// Web/wwwroot/react/src/pages/gastos/tickets/detail/expenseTicketPreviewUtils.ts
var IMAGE_EXTENSIONS = /* @__PURE__ */ new Set(["jpg", "jpeg", "png", "webp", "gif", "bmp", "heic", "heif", "avif"]);
var getFileExtensionFromPath = (value) => {
  const source = safeText(value).toLowerCase();
  if (!source) return "";
  const withoutQuery = source.split("?")[0].split("#")[0];
  const parts = withoutQuery.split(".");
  if (parts.length < 2) return "";
  const rawExt = safeText(parts[parts.length - 1]).replace(/[^a-z0-9]/g, "");
  return rawExt === "jpeg" ? "jpg" : rawExt;
};
var hasExpenseTicketImagePreviewSource = (urlValue) => {
  const normalizedUrl = safeText(urlValue);
  if (!normalizedUrl) return false;
  if (normalizedUrl.toLowerCase().startsWith("data:image/")) return true;
  const extension = getFileExtensionFromPath(normalizedUrl);
  if (extension && IMAGE_EXTENSIONS.has(extension)) return true;
  const normalizedLower = normalizedUrl.toLowerCase();
  if (normalizedLower.includes("blob.core.windows.net") && normalizedLower.includes("image")) return true;
  return false;
};

// Web/wwwroot/react/src/pages/gastos/components/ExpenseCurrencySettlementFields.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var MONEY_INPUT_FORMAT = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: true,
  fallback: ""
};
var EXCHANGE_RATE_INPUT_FORMAT = {
  minimumFractionDigits: 7,
  maximumFractionDigits: 7,
  useGrouping: true,
  fallback: ""
};
var buildInputClassName = (invalid, readOnly = false) => {
  return [
    "form-control",
    "text-right tabular-nums",
    readOnly ? "ind-readonly-field" : "",
    invalid ? "border-rose-400 bg-rose-50 focus:border-rose-400 focus:ring-rose-200" : ""
  ].filter(Boolean).join(" ");
};
var formatMoneyInput = (value) => formatExpenseInputNumber(value, MONEY_INPUT_FORMAT);
var formatExchangeRateInput = (value) => formatExpenseInputNumber(value, EXCHANGE_RATE_INPUT_FORMAT);
var fieldContainerClassName = "space-y-1.5";
var fieldLabelClassName = "form-label font-semibold leading-tight min-h-6 flex items-center";
var ExpenseCurrencySettlementFields = ({
  isEditing,
  expenseCurrencyCode,
  expenseCurrencyInvalid = false,
  expenseCurrencyInputRef,
  localCurrencyCode,
  exchangeRate,
  exchangeRateInvalid = false,
  exchangeRateInputRef,
  exchangeRateInfoMessage,
  amountCurrency,
  amountCurrencyMode,
  amountCurrencyInvalid = false,
  amountCurrencyInputRef,
  reimbursementAmount,
  reimbursementAmountInvalid = false,
  reimbursementAmountInputRef,
  onExpenseCurrencyChange,
  onExchangeRateChange,
  onExchangeRateCommit,
  onAmountCurrencyChange,
  onReimbursementAmountChange
}) => {
  const normalizedExpenseCurrencyCode = safeText(expenseCurrencyCode).toUpperCase();
  const normalizedLocalCurrencyCode = safeText(localCurrencyCode).toUpperCase();
  const sameCurrencySettlement = !!normalizedExpenseCurrencyCode && !!normalizedLocalCurrencyCode && normalizedExpenseCurrencyCode === normalizedLocalCurrencyCode;
  const exchangeRateReadOnly = !isEditing || sameCurrencySettlement;
  const effectiveExchangeRate = sameCurrencySettlement ? formatExchangeRateInput("100") : safeText(exchangeRate);
  const effectiveExchangeRateInvalid = exchangeRateInvalid;
  const reimbursementCurrencyLabel = normalizedLocalCurrencyCode || indT("Common_NotAvailable", "N/A");
  const reimbursementLabel = indFormat(
    "ExpenseSheets_Field_ReimbursementAmount_WithCurrency",
    "Imp. reemb. ({0})",
    reimbursementCurrencyLabel
  );
  const expenseCurrencyLabel = normalizedExpenseCurrencyCode || indT("Common_NotAvailable", "N/A");
  const exchangeRateReferenceValue = formatExpenseInputNumber(effectiveExchangeRate, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
    fallback: "-"
  });
  const exchangeRateReferenceMessage = indFormat(
    "ExpenseSheets_ExchangeRate_InfoPopover_Reference",
    "100 {0} = {1} {2}\nEl tipo de cambio indica cu\xE1ntas unidades de la divisa del gasto equivalen a 100 unidades de la divisa de reembolso.",
    reimbursementCurrencyLabel,
    exchangeRateReferenceValue,
    expenseCurrencyLabel
  );
  const exchangeRateInfoPopoverContent = safeText(exchangeRateInfoMessage) ? `${exchangeRateReferenceMessage}

${safeText(exchangeRateInfoMessage)}` : exchangeRateReferenceMessage;
  const amountCurrencyReadOnly = !isEditing || amountCurrencyMode === "readonly";
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "md:col-span-2 grid grid-cols-2 gap-x-4 gap-y-3 items-start", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: fieldContainerClassName, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: fieldLabelClassName, children: indT("ExpenseSheets_Field_AmountCurrency", "Imp. divisa") }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "input",
        {
          ref: amountCurrencyInputRef,
          className: buildInputClassName(amountCurrencyInvalid, amountCurrencyReadOnly),
          type: "text",
          inputMode: "decimal",
          value: amountCurrency || "",
          onChange: !amountCurrencyReadOnly && onAmountCurrencyChange ? (event) => onAmountCurrencyChange(event.target.value || "") : void 0,
          onBlur: !amountCurrencyReadOnly && onAmountCurrencyChange ? (event) => onAmountCurrencyChange(formatMoneyInput(event.target.value)) : void 0,
          readOnly: amountCurrencyReadOnly,
          "aria-invalid": amountCurrencyInvalid ? "true" : "false",
          "aria-label": indT("ExpenseSheets_Field_AmountCurrency", "Imp. divisa")
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: fieldContainerClassName, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: fieldLabelClassName, children: reimbursementLabel }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "input",
        {
          ref: reimbursementAmountInputRef,
          className: buildInputClassName(reimbursementAmountInvalid, !isEditing),
          type: "text",
          inputMode: "decimal",
          value: reimbursementAmount || "",
          onChange: isEditing ? (event) => onReimbursementAmountChange(event.target.value || "") : void 0,
          onBlur: isEditing ? (event) => onReimbursementAmountChange(formatMoneyInput(event.target.value)) : void 0,
          readOnly: !isEditing,
          "aria-invalid": reimbursementAmountInvalid ? "true" : "false",
          "aria-label": reimbursementLabel
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      ExpenseCurrencyFilterSelect_default,
      {
        label: indT("ExpenseSheets_Field_ExpenseCurrency", "Divisa gasto"),
        placeholder: indT("ExpenseSheets_Filter_Currency_Placeholder", "Currency code"),
        value: normalizedExpenseCurrencyCode,
        onChange: onExpenseCurrencyChange,
        invalid: expenseCurrencyInvalid,
        inputRef: expenseCurrencyInputRef,
        readOnly: !isEditing,
        containerClassName: fieldContainerClassName,
        labelClassName: fieldLabelClassName,
        idBase: "expense-currency-settlement-expense-currency",
        dropdownMinWidthPx: 260
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: fieldContainerClassName, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex min-h-6 items-center justify-between gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: fieldLabelClassName, children: indT("ExpenseSheets_Field_ExchangeRate", "Tipo cambio") }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          InfoPopoverIconButton_default,
          {
            content: exchangeRateInfoPopoverContent,
            ariaLabel: indT("ExpenseSheets_ExchangeRate_InfoPopover_Aria", "Exchange rate information"),
            className: "shrink-0"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "input",
        {
          ref: exchangeRateInputRef,
          className: buildInputClassName(effectiveExchangeRateInvalid, exchangeRateReadOnly),
          type: "text",
          inputMode: "decimal",
          value: effectiveExchangeRate,
          onChange: !exchangeRateReadOnly ? (event) => onExchangeRateChange(event.target.value || "") : void 0,
          onBlur: !exchangeRateReadOnly ? (event) => {
            const nextValue = formatExchangeRateInput(event.target.value);
            (onExchangeRateCommit || onExchangeRateChange)(nextValue);
          } : void 0,
          readOnly: exchangeRateReadOnly,
          "aria-readonly": exchangeRateReadOnly ? "true" : "false",
          "aria-invalid": effectiveExchangeRateInvalid ? "true" : "false",
          "aria-label": indT("ExpenseSheets_Field_ExchangeRate", "Tipo cambio")
        }
      )
    ] })
  ] });
};
var ExpenseCurrencySettlementFields_default = ExpenseCurrencySettlementFields;

// Web/wwwroot/react/src/pages/gastos/tickets/detail/ExpenseTicketPreviewModal.tsx
var import_react_dom = __toESM(require_react_dom());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var ExpenseTicketPreviewModal = ({
  open,
  busy,
  error,
  imageUrl,
  imageAlt,
  scale,
  translate,
  surfaceRef,
  onClose,
  onPointerDown,
  onPointerMove,
  onPointerEnd
}) => {
  if (!open) return null;
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center overscroll-contain bg-slate-950/45 px-4 py-6 backdrop-blur-md", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "button",
        {
          type: "button",
          "aria-label": indT("Common_Close", "Close"),
          className: "absolute inset-0",
          onClick: onClose
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "button",
        {
          type: "button",
          "aria-label": indT("Common_Close", "Close"),
          className: "fixed right-4 top-[calc(1rem+env(safe-area-inset-top,0px))] z-[600020] inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-xl)] border border-slate-200/60 bg-slate-900/78 text-slate-100 shadow-lg transition hover:bg-slate-900/88 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-200/80",
          onClick: onClose,
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "path",
            {
              d: "M6 6L18 18M18 6L6 18",
              stroke: "currentColor",
              strokeWidth: "1.75",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ) })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "relative flex max-h-[92vh] max-w-[92vw] items-center justify-center overscroll-contain", children: busy ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center gap-2 text-sm text-slate-100", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
        indT("Common_Loading", "Loading")
      ] }) : error ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-sm text-rose-200", children: error }) : imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "div",
        {
          ref: surfaceRef,
          className: "relative max-h-[90vh] max-w-[92vw] overflow-hidden rounded-[var(--radius-xl)] touch-none overscroll-contain",
          role: "presentation",
          style: { touchAction: "none" },
          onPointerDown,
          onPointerMove,
          onPointerUp: onPointerEnd,
          onPointerCancel: onPointerEnd,
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "img",
            {
              src: imageUrl,
              alt: imageAlt || indT("Tickets_Field_FileId", "Ticket"),
              className: "pointer-events-none max-h-[90vh] w-auto max-w-[92vw] select-none rounded-[var(--radius-xl)] object-contain shadow-2xl",
              style: {
                transform: `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${scale})`,
                transformOrigin: "center center",
                transition: scale <= 1 ? "transform 140ms ease-out" : "none"
              },
              draggable: false
            }
          )
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-sm text-slate-100", children: indT("Common_NotAvailable", "N/A") }) })
    ] }),
    document.body
  );
};
var ExpenseTicketPreviewModal_default = ExpenseTicketPreviewModal;

// Web/wwwroot/react/src/pages/gastos/tickets/detail/ExpenseTicketStickyPreview.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var ExpenseTicketStickyPreview = ({
  busy,
  error,
  imageUrl,
  imageAlt,
  fileName,
  onOpen
}) => {
  const previewLabel = indT("Tickets_Detail_ViewAttachment", "Ver adjunto");
  const ticketLabel = indT("Tickets_Field_FileId", "Ticket");
  const safeFileName = safeText(fileName) || safeText(imageAlt) || ticketLabel;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "sticky top-[72px] z-[1400] min-w-0 max-w-full lg:top-20", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    "button",
    {
      type: "button",
      className: "group block min-w-0 w-full max-w-full touch-manipulation text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2",
      "aria-label": `${previewLabel}: ${safeFileName}`,
      onClick: onOpen,
      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "overflow-hidden rounded-[var(--radius-xl)] border border-slate-200 bg-white shadow-xs transition-[transform,box-shadow,border-color] duration-200 group-hover:-translate-y-[1px] group-hover:border-primary/25 group-hover:shadow-md", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "relative h-36 overflow-hidden bg-linear-to-br from-slate-100 via-white to-slate-200 sm:h-40 lg:h-[380px]", children: [
        imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "img",
          {
            src: imageUrl,
            alt: imageAlt || ticketLabel,
            width: 640,
            height: 960,
            className: "h-full w-full rounded-[var(--radius-xl)] object-cover object-center transition-transform duration-300 group-hover:scale-[1.015] lg:object-contain lg:object-center lg:p-3"
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex h-full min-w-0 items-center justify-center px-4", children: busy ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-2 text-sm text-slate-700", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex min-w-0 w-full max-w-full items-center gap-3 text-slate-700", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-xl)] bg-primary/8 text-primary", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "path",
              {
                d: "M7 3.75h6.25L18.25 8.75V19.5a.75.75 0 0 1-.75.75H7a.75.75 0 0 1-.75-.75v-15A.75.75 0 0 1 7 3.75Z",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "path",
              {
                d: "M13 3.75V8.5h4.75",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            )
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "truncate text-sm font-semibold text-slate-900", children: safeFileName }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "line-clamp-2 text-xs text-slate-500", children: error || previewLabel })
          ] })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-slate-950/26 via-slate-900/8 to-transparent lg:h-20" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-[var(--radius-xl)] bg-primary/92 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { className: "h-3.5 w-3.5", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "path",
            {
              d: "M15 3h6v6M21 3l-7 7M9 21H3v-6M3 21l7-7",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ) }),
          previewLabel
        ] })
      ] }) })
    }
  ) });
};
var ExpenseTicketStickyPreview_default = ExpenseTicketStickyPreview;

// Web/wwwroot/react/src/pages/gastos/tickets/detail/useExpenseTicketImagePreview.ts
var import_react2 = __toESM(require_react());
var PREVIEW_MAX_SCALE = 4;
var PREVIEW_SCALE_STEP = 0.25;
var clampPreviewScale = (value) => {
  if (!Number.isFinite(value)) return 1;
  return Math.min(PREVIEW_MAX_SCALE, Math.max(1, value));
};
var getPreviewPointDistance = (left, right) => {
  const deltaX = right.x - left.x;
  const deltaY = right.y - left.y;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
};
var getPreviewPointCenter = (left, right) => ({
  x: (left.x + right.x) / 2,
  y: (left.y + right.y) / 2
});
var useExpenseTicketImagePreview = ({ fileId, sourceUrl, enabled = true }) => {
  const [previewOpen, setPreviewOpen] = (0, import_react2.useState)(false);
  const [previewBusy, setPreviewBusy] = (0, import_react2.useState)(false);
  const [previewError, setPreviewError] = (0, import_react2.useState)("");
  const [previewImageUrl, setPreviewImageUrl] = (0, import_react2.useState)("");
  const [previewScale, setPreviewScale] = (0, import_react2.useState)(1);
  const [previewTranslate, setPreviewTranslate] = (0, import_react2.useState)({ x: 0, y: 0 });
  const previewScaleRef = (0, import_react2.useRef)(1);
  const previewImageUrlRef = (0, import_react2.useRef)("");
  const previewRequestKeyRef = (0, import_react2.useRef)("");
  const previewLoadPromiseRef = (0, import_react2.useRef)(null);
  const previewSurfaceRef = (0, import_react2.useRef)(null);
  const previewTranslateRef = (0, import_react2.useRef)({ x: 0, y: 0 });
  const previewPointersRef = (0, import_react2.useRef)(/* @__PURE__ */ new Map());
  const previewPanPointerRef = (0, import_react2.useRef)(null);
  const previewPanLastPointRef = (0, import_react2.useRef)(null);
  const previewPinchSnapshotRef = (0, import_react2.useRef)(null);
  const applyPreviewTransform = (0, import_react2.useCallback)((nextScale, nextTranslate) => {
    const normalizedScale = clampPreviewScale(nextScale);
    const normalizedTranslate = normalizedScale <= 1 ? { x: 0, y: 0 } : nextTranslate;
    previewScaleRef.current = normalizedScale;
    previewTranslateRef.current = normalizedTranslate;
    setPreviewScale(normalizedScale);
    setPreviewTranslate(normalizedTranslate);
  }, []);
  const resetPreviewGesture = (0, import_react2.useCallback)(() => {
    previewPointersRef.current.clear();
    previewPanPointerRef.current = null;
    previewPanLastPointRef.current = null;
    previewPinchSnapshotRef.current = null;
    applyPreviewTransform(1, { x: 0, y: 0 });
  }, [applyPreviewTransform]);
  const rebuildPinchSnapshot = (0, import_react2.useCallback)(() => {
    const pointerPoints = Array.from(previewPointersRef.current.values());
    if (pointerPoints.length < 2) {
      previewPinchSnapshotRef.current = null;
      return;
    }
    const [left, right] = pointerPoints;
    previewPinchSnapshotRef.current = {
      distance: Math.max(1, getPreviewPointDistance(left, right)),
      scale: previewScaleRef.current,
      center: getPreviewPointCenter(left, right),
      translate: previewTranslateRef.current
    };
  }, []);
  const replacePreviewImageUrl = (0, import_react2.useCallback)((nextUrl) => {
    setPreviewImageUrl((previous) => {
      if (previous && previous !== nextUrl) {
        URL.revokeObjectURL(previous);
      }
      previewImageUrlRef.current = nextUrl;
      return nextUrl;
    });
  }, []);
  const clearPreviewImage = (0, import_react2.useCallback)(() => {
    previewLoadPromiseRef.current = null;
    setPreviewImageUrl((previous) => {
      if (previous) {
        URL.revokeObjectURL(previous);
      }
      previewImageUrlRef.current = "";
      return "";
    });
  }, []);
  const loadPreviewImage = (0, import_react2.useCallback)(async () => {
    const currentFileId = safeText(fileId);
    const currentUrl = safeText(sourceUrl);
    if (!enabled || !currentFileId || !currentUrl) {
      setPreviewBusy(false);
      setPreviewError("");
      return "";
    }
    if (previewImageUrlRef.current) {
      return previewImageUrlRef.current;
    }
    if (previewLoadPromiseRef.current) {
      return previewLoadPromiseRef.current;
    }
    const requestKey = `${currentFileId}__${currentUrl}`;
    previewRequestKeyRef.current = requestKey;
    setPreviewBusy(true);
    setPreviewError("");
    const nextPromise = (async () => {
      try {
        const blob = await fetchExpenseSheetTicketPreviewBlob(currentFileId, currentUrl, {
          suppressPermissionModal: true
        });
        const objectUrl = URL.createObjectURL(blob);
        if (previewRequestKeyRef.current !== requestKey) {
          URL.revokeObjectURL(objectUrl);
          return "";
        }
        replacePreviewImageUrl(objectUrl);
        return objectUrl;
      } catch (error) {
        if (previewRequestKeyRef.current === requestKey) {
          setPreviewError(error instanceof Error ? error.message : indT("Api_RequestFailed", "Request failed."));
        }
        return "";
      } finally {
        if (previewRequestKeyRef.current === requestKey) {
          setPreviewBusy(false);
        }
        previewLoadPromiseRef.current = null;
      }
    })();
    previewLoadPromiseRef.current = nextPromise;
    return nextPromise;
  }, [enabled, fileId, replacePreviewImageUrl, sourceUrl]);
  const closePreview = (0, import_react2.useCallback)(() => {
    setPreviewOpen(false);
    setPreviewBusy(false);
    setPreviewError("");
    resetPreviewGesture();
  }, [resetPreviewGesture]);
  (0, import_react2.useEffect)(() => {
    return () => {
      clearPreviewImage();
    };
  }, [clearPreviewImage]);
  (0, import_react2.useEffect)(() => {
    previewRequestKeyRef.current = `${safeText(fileId)}__${safeText(sourceUrl)}`;
    setPreviewOpen(false);
    setPreviewBusy(false);
    setPreviewError("");
    resetPreviewGesture();
    clearPreviewImage();
    if (enabled && safeText(fileId) && safeText(sourceUrl)) {
      void loadPreviewImage();
    }
  }, [clearPreviewImage, enabled, fileId, loadPreviewImage, resetPreviewGesture, sourceUrl]);
  (0, import_react2.useEffect)(() => {
    if (!previewOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closePreview();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previewOpen, closePreview]);
  (0, import_react2.useEffect)(() => {
    if (!previewOpen) return;
    const surface = previewSurfaceRef.current;
    if (!surface) return;
    const preventGestureDefault = (event) => {
      event.preventDefault();
    };
    const preventTouchViewportZoom = (event) => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };
    const handleNativeWheelZoom = (event) => {
      if (!previewImageUrlRef.current || previewBusy) return;
      event.preventDefault();
      const direction = event.deltaY < 0 ? 1 : -1;
      const nextScale = clampPreviewScale(previewScaleRef.current + direction * PREVIEW_SCALE_STEP);
      applyPreviewTransform(nextScale, previewTranslateRef.current);
    };
    surface.addEventListener("gesturestart", preventGestureDefault, { passive: false });
    surface.addEventListener("gesturechange", preventGestureDefault, { passive: false });
    surface.addEventListener("gestureend", preventGestureDefault, { passive: false });
    surface.addEventListener("touchmove", preventTouchViewportZoom, { passive: false });
    surface.addEventListener("wheel", handleNativeWheelZoom, { passive: false });
    return () => {
      surface.removeEventListener("gesturestart", preventGestureDefault);
      surface.removeEventListener("gesturechange", preventGestureDefault);
      surface.removeEventListener("gestureend", preventGestureDefault);
      surface.removeEventListener("touchmove", preventTouchViewportZoom);
      surface.removeEventListener("wheel", handleNativeWheelZoom);
    };
  }, [applyPreviewTransform, previewBusy, previewOpen]);
  const handlePreviewPointerDown = (0, import_react2.useCallback)(
    (event) => {
      if (!previewImageUrl || previewBusy) return;
      const point = { x: event.clientX, y: event.clientY };
      previewPointersRef.current.set(event.pointerId, point);
      if (typeof event.currentTarget.setPointerCapture === "function") {
        try {
          event.currentTarget.setPointerCapture(event.pointerId);
        } catch {
        }
      }
      if (previewPointersRef.current.size === 1) {
        previewPanPointerRef.current = event.pointerId;
        previewPanLastPointRef.current = point;
        previewPinchSnapshotRef.current = null;
        return;
      }
      previewPanPointerRef.current = null;
      previewPanLastPointRef.current = null;
      rebuildPinchSnapshot();
    },
    [previewBusy, previewImageUrl, rebuildPinchSnapshot]
  );
  const handlePreviewPointerMove = (0, import_react2.useCallback)(
    (event) => {
      if (!previewPointersRef.current.has(event.pointerId)) return;
      const point = { x: event.clientX, y: event.clientY };
      previewPointersRef.current.set(event.pointerId, point);
      const pointerEntries = Array.from(previewPointersRef.current.entries());
      const pointerPoints = pointerEntries.map((entry) => entry[1]);
      if (pointerPoints.length >= 2) {
        if (!previewPinchSnapshotRef.current) {
          rebuildPinchSnapshot();
        }
        const snapshot = previewPinchSnapshotRef.current;
        if (!snapshot) return;
        const [left, right] = pointerPoints;
        const distance = Math.max(1, getPreviewPointDistance(left, right));
        const ratio = distance / Math.max(1, snapshot.distance);
        const nextScale = clampPreviewScale(snapshot.scale * ratio);
        const center = getPreviewPointCenter(left, right);
        const nextTranslate2 = {
          x: snapshot.translate.x + (center.x - snapshot.center.x),
          y: snapshot.translate.y + (center.y - snapshot.center.y)
        };
        applyPreviewTransform(nextScale, nextTranslate2);
        return;
      }
      if (pointerPoints.length !== 1 || previewScaleRef.current <= 1 || previewPanPointerRef.current !== event.pointerId) {
        return;
      }
      const lastPoint = previewPanLastPointRef.current;
      previewPanLastPointRef.current = point;
      if (!lastPoint) return;
      const nextTranslate = {
        x: previewTranslateRef.current.x + (point.x - lastPoint.x),
        y: previewTranslateRef.current.y + (point.y - lastPoint.y)
      };
      applyPreviewTransform(previewScaleRef.current, nextTranslate);
    },
    [applyPreviewTransform, rebuildPinchSnapshot]
  );
  const handlePreviewPointerEnd = (0, import_react2.useCallback)(
    (event) => {
      if (!previewPointersRef.current.has(event.pointerId)) return;
      previewPointersRef.current.delete(event.pointerId);
      if (typeof event.currentTarget.hasPointerCapture === "function" && event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      const pointerEntries = Array.from(previewPointersRef.current.entries());
      if (pointerEntries.length >= 2) {
        previewPanPointerRef.current = null;
        previewPanLastPointRef.current = null;
        rebuildPinchSnapshot();
        return;
      }
      if (pointerEntries.length === 1) {
        const [pointerId, pointerPoint] = pointerEntries[0];
        previewPanPointerRef.current = pointerId;
        previewPanLastPointRef.current = pointerPoint;
        previewPinchSnapshotRef.current = null;
        return;
      }
      previewPanPointerRef.current = null;
      previewPanLastPointRef.current = null;
      previewPinchSnapshotRef.current = null;
      if (previewScaleRef.current <= 1) {
        applyPreviewTransform(1, { x: 0, y: 0 });
      }
    },
    [applyPreviewTransform, rebuildPinchSnapshot]
  );
  const openPreview = (0, import_react2.useCallback)(async () => {
    const currentFileId = safeText(fileId);
    const currentUrl = safeText(sourceUrl);
    if (!enabled || !currentFileId || !currentUrl) return;
    resetPreviewGesture();
    setPreviewOpen(true);
    setPreviewError("");
    await loadPreviewImage();
  }, [enabled, fileId, loadPreviewImage, resetPreviewGesture, sourceUrl]);
  return {
    previewOpen,
    previewBusy,
    previewError,
    previewImageUrl,
    previewScale,
    previewTranslate,
    previewSurfaceRef,
    openPreview,
    closePreview,
    handlePreviewPointerDown,
    handlePreviewPointerMove,
    handlePreviewPointerEnd
  };
};

export {
  formatExpenseExchangeRateInputValue,
  fetchExpenseOfficialExchangeRate,
  buildExpenseExchangeRateInfoMessage,
  useExpenseTicketDetailState,
  hasExpenseTicketImagePreviewSource,
  ExpenseCurrencySettlementFields_default,
  ExpenseTicketLinesList_default,
  ExpenseTicketPreviewModal_default,
  ExpenseTicketStickyPreview_default,
  useExpenseTicketImagePreview
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlRXhjaGFuZ2VSYXRlLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvdXNlRXhwZW5zZVRpY2tldERldGFpbFN0YXRlLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlVGlja2V0TGluZXNMaXN0LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3RpY2tldHMvZGV0YWlsL2V4cGVuc2VUaWNrZXRQcmV2aWV3VXRpbHMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VDdXJyZW5jeVNldHRsZW1lbnRGaWVsZHMudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbC50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0U3RpY2t5UHJldmlldy50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBpbmRGb3JtYXQsIGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4Y2hhbmdlUmF0ZUR0byB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgZ2V0RXhjaGFuZ2VSYXRlIH0gZnJvbSBcIi4vZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQgeyBFWFBFTlNFX0xJTkVfRVhDSEFOR0VfUkFURV9SRUZFUkVOQ0VfQU1PVU5ULCBub3JtYWxpemVFeHBlbnNlTGluZUN1cnJlbmN5Q29kZSB9IGZyb20gXCIuL2V4cGVuc2VMaW5lQ3VycmVuY3kudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyLCBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQgfSBmcm9tIFwiLi9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4vZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuXHJcbnR5cGUgUmF3RXhjaGFuZ2VSYXRlRHRvID0gRXhjaGFuZ2VSYXRlRHRvICYge1xyXG4gIHJhdGU/OiB1bmtub3duO1xyXG4gIGRhdGU/OiB1bmtub3duO1xyXG4gIHNvdXJjZT86IHVua25vd247XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBFeHBlbnNlT2ZmaWNpYWxFeGNoYW5nZVJhdGUgPSB7XHJcbiAgZXhjaGFuZ2VSYXRlOiBudW1iZXI7XHJcbiAgcmF3UmF0ZTogbnVtYmVyO1xyXG4gIGRhdGU6IHN0cmluZztcclxuICBzb3VyY2U6IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IHRvUG9zaXRpdmVOdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSAmJiBwYXJzZWQgPiAwID8gcGFyc2VkIDogbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBmb3JtYXRFeHBlbnNlRXhjaGFuZ2VSYXRlSW5wdXRWYWx1ZSA9ICh2YWx1ZTogbnVtYmVyIHwgc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIGZvcm1hdEV4cGVuc2VJbnB1dE51bWJlcih2YWx1ZSwge1xyXG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiA3LFxyXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiA3LFxyXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICBmYWxsYmFjazogXCJcIixcclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBmb3JtYXRFeHBlbnNlRXhjaGFuZ2VSYXRlUmF3VmFsdWUgPSAodmFsdWU6IG51bWJlciB8IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIodmFsdWUsIHtcclxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogNyxcclxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogNyxcclxuICAgIHVzZUdyb3VwaW5nOiBmYWxzZSxcclxuICAgIGZhbGxiYWNrOiBcIlwiLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gTG9hZHMgdGhlIG9mZmljaWFsIGN1cnJlbmN5IHJhdGUgYW5kIGNvbnZlcnRzIGl0IHRvIHRoZSBBWCByZWZlcmVuY2UtMTAwIGV4Y2hhbmdlIHJhdGUuXHJcbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VPZmZpY2lhbEV4Y2hhbmdlUmF0ZSA9IGFzeW5jICh7XHJcbiAgbG9jYWxDdXJyZW5jeUNvZGUsXHJcbiAgZXhwZW5zZUN1cnJlbmN5Q29kZSxcclxuICBkYXRlLFxyXG4gIHNpZ25hbCxcclxufToge1xyXG4gIGxvY2FsQ3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZXhwZW5zZUN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGRhdGU/OiBzdHJpbmc7XHJcbiAgc2lnbmFsPzogQWJvcnRTaWduYWw7XHJcbn0pOiBQcm9taXNlPEV4cGVuc2VPZmZpY2lhbEV4Y2hhbmdlUmF0ZSB8IG51bGw+ID0+IHtcclxuICBjb25zdCBsb2NhbEN1cnJlbmN5ID0gbm9ybWFsaXplRXhwZW5zZUxpbmVDdXJyZW5jeUNvZGUobG9jYWxDdXJyZW5jeUNvZGUpO1xyXG4gIGNvbnN0IGV4cGVuc2VDdXJyZW5jeSA9IG5vcm1hbGl6ZUV4cGVuc2VMaW5lQ3VycmVuY3lDb2RlKGV4cGVuc2VDdXJyZW5jeUNvZGUpO1xyXG4gIGNvbnN0IGV4Y2hhbmdlRGF0ZSA9IHNhZmVUZXh0KGRhdGUpO1xyXG4gIGlmICghbG9jYWxDdXJyZW5jeSB8fCAhZXhwZW5zZUN1cnJlbmN5KSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGlmIChsb2NhbEN1cnJlbmN5ID09PSBleHBlbnNlQ3VycmVuY3kpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGV4Y2hhbmdlUmF0ZTogRVhQRU5TRV9MSU5FX0VYQ0hBTkdFX1JBVEVfUkVGRVJFTkNFX0FNT1VOVCxcclxuICAgICAgcmF3UmF0ZTogMSxcclxuICAgICAgZGF0ZTogZXhjaGFuZ2VEYXRlLFxyXG4gICAgICBzb3VyY2U6IFwiXCIsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRFeGNoYW5nZVJhdGUobG9jYWxDdXJyZW5jeSwgZXhwZW5zZUN1cnJlbmN5LCBleGNoYW5nZURhdGUsIHtcclxuICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgc2lnbmFsLFxyXG4gIH0pO1xyXG4gIGNvbnN0IGRhdGEgPSByZXNwb25zZS5EYXRhIGFzIFJhd0V4Y2hhbmdlUmF0ZUR0byB8IG51bGwgfCB1bmRlZmluZWQ7XHJcbiAgY29uc3QgcmF3UmF0ZSA9IHRvUG9zaXRpdmVOdW1iZXIoZGF0YT8uUmF0ZSA/PyBkYXRhPy5yYXRlKTtcclxuICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MgfHwgIWRhdGEgfHwgcmF3UmF0ZSA9PT0gbnVsbCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICBzYWZlVGV4dChyZXNwb25zZS5NZXNzYWdlKSB8fFxyXG4gICAgICAgIGluZFQoXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9VbmF2YWlsYWJsZVwiLCBcIk5vIHNlIHB1ZG8gb2J0ZW5lciBlbCB0aXBvIGRlIGNhbWJpby5cIilcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZXhjaGFuZ2VSYXRlOiByYXdSYXRlICogRVhQRU5TRV9MSU5FX0VYQ0hBTkdFX1JBVEVfUkVGRVJFTkNFX0FNT1VOVCxcclxuICAgIHJhd1JhdGUsXHJcbiAgICBkYXRlOiBzYWZlVGV4dChkYXRhLkRhdGUgPz8gZGF0YS5kYXRlKSB8fCBleGNoYW5nZURhdGUsXHJcbiAgICBzb3VyY2U6IHNhZmVUZXh0KGRhdGEuU291cmNlID8/IGRhdGEuc291cmNlKSxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGJ1aWxkRXhwZW5zZUV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlID0gKHtcclxuICByYXdSYXRlLFxyXG4gIGV4Y2hhbmdlUmF0ZSxcclxuICBkYXRlLFxyXG4gIHNvdXJjZSxcclxufToge1xyXG4gIHJhd1JhdGU/OiBudW1iZXIgfCBzdHJpbmcgfCBudWxsO1xyXG4gIGV4Y2hhbmdlUmF0ZT86IG51bWJlciB8IHN0cmluZyB8IG51bGw7XHJcbiAgZGF0ZT86IHN0cmluZztcclxuICBzb3VyY2U/OiBzdHJpbmc7XHJcbn0pOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHJhd1JhdGVUZXh0ID0gZm9ybWF0RXhwZW5zZUV4Y2hhbmdlUmF0ZVJhd1ZhbHVlKHJhd1JhdGUpO1xyXG4gIGNvbnN0IHBhcnNlZEV4Y2hhbmdlUmF0ZSA9IHBhcnNlRXhwZW5zZU51bWVyaWNJbnB1dChleGNoYW5nZVJhdGUpO1xyXG4gIGlmIChyYXdSYXRlVGV4dCkge1xyXG4gICAgcmV0dXJuIGluZEZvcm1hdChcclxuICAgICAgXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9JbmZvUG9wb3Zlcl9EZXRhaWxcIixcclxuICAgICAgXCJUaXBvIGRlIGNhbWJpbyBvYnRlbmlkbyB7MH1cXG5GZWNoYTogezF9XFxuT3JpZ2VuOiB7Mn1cIixcclxuICAgICAgcmF3UmF0ZVRleHQsXHJcbiAgICAgIHNhZmVUZXh0KGRhdGUpIHx8IGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpLFxyXG4gICAgICBzYWZlVGV4dChzb3VyY2UpIHx8IGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGluZEZvcm1hdChcclxuICAgIFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfSW5mb1BvcG92ZXJfU3RvcmVkXCIsXHJcbiAgICBcIlRpcG8gZGUgY2FtYmlvIHswfSB7MX1cIixcclxuICAgIFwibWFudWFsXCIsXHJcbiAgICBmb3JtYXRFeHBlbnNlRXhjaGFuZ2VSYXRlUmF3VmFsdWUoXHJcbiAgICAgIHBhcnNlZEV4Y2hhbmdlUmF0ZSAhPSBudWxsID8gcGFyc2VkRXhjaGFuZ2VSYXRlIC8gRVhQRU5TRV9MSU5FX0VYQ0hBTkdFX1JBVEVfUkVGRVJFTkNFX0FNT1VOVCA6IG51bGxcclxuICAgICkgfHwgZm9ybWF0RXhwZW5zZUV4Y2hhbmdlUmF0ZUlucHV0VmFsdWUoZXhjaGFuZ2VSYXRlKSB8fCBcIi1cIlxyXG4gICk7XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyLCBFeHBlbnNlVGlja2V0RGV0YWlsTGluZSB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBtYXBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyLCBtYXBFeHBlbnNlVGlja2V0RGV0YWlsTGluZSB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGVBcmdzID0ge1xyXG4gIGhhc0FjY2VzczogYm9vbGVhbjtcclxuICBmaWxlSWQ6IHN0cmluZztcclxuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcclxuICBlbmFibGVkPzogYm9vbGVhbjtcclxufTtcclxuXHJcbi8vIE93bnMgcmVhZCBzdGF0ZSBhbmQgQVBJIGxvYWRpbmcgYmVoYXZpb3IgZm9yIHRoZSB0aWNrZXQgZGV0YWlsIHBhZ2UuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0RGV0YWlsU3RhdGUgPSAoeyBoYXNBY2Nlc3MsIGZpbGVJZCwgb25Gb3JiaWRkZW4sIGVuYWJsZWQgPSB0cnVlIH06IFVzZUV4cGVuc2VUaWNrZXREZXRhaWxTdGF0ZUFyZ3MpID0+IHtcclxuICBjb25zdCBbaGVhZGVyLCBzZXRIZWFkZXJdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldERldGFpbEhlYWRlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtsaW5lcywgc2V0TGluZXNdID0gdXNlU3RhdGU8RXhwZW5zZVRpY2tldERldGFpbExpbmVbXT4oW10pO1xyXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG5cclxuICBjb25zdCByZWxvYWREZXRhaWwgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoIWVuYWJsZWQpIHtcclxuICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaGFzQWNjZXNzKSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzYWZlRmlsZUlkID0gc2FmZVRleHQoZmlsZUlkKTtcclxuICAgIGlmICghc2FmZUZpbGVJZCkge1xyXG4gICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIlRpY2tldHNfRGV0YWlsX05vdEZvdW5kXCIsIFwiVGlja2V0IHdhcyBub3QgZm91bmQuXCIpKTtcclxuICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XHJcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldChzYWZlRmlsZUlkLCB7XHJcbiAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHJlc3BvbnNlPy5TdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNwb25zZT8uTWVzc2FnZSB8fCBpbmRUKFwiVGlja2V0c19EZXRhaWxfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgdGlja2V0IGRldGFpbC5cIikpO1xyXG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XHJcbiAgICAgIGNvbnN0IHNlbGVjdGVkID1cclxuICAgICAgICBpdGVtcy5maW5kKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnk/LkZpbGVJZCkudG9VcHBlckNhc2UoKSA9PT0gc2FmZUZpbGVJZC50b1VwcGVyQ2FzZSgpKSB8fCBpdGVtc1swXSB8fCBudWxsO1xyXG5cclxuICAgICAgaWYgKCFzZWxlY3RlZCkge1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiVGlja2V0c19EZXRhaWxfTm90Rm91bmRcIiwgXCJUaWNrZXQgd2FzIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgICAgIHNldEhlYWRlcihudWxsKTtcclxuICAgICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBtYXBwZWRIZWFkZXIgPSBtYXBFeHBlbnNlVGlja2V0RGV0YWlsSGVhZGVyKHNlbGVjdGVkKTtcclxuICAgICAgY29uc3QgbWFwcGVkTGluZXMgPSAoQXJyYXkuaXNBcnJheShzZWxlY3RlZC5MaW5lcykgPyBzZWxlY3RlZC5MaW5lcyA6IFtdKS5tYXAoKGxpbmUpID0+XHJcbiAgICAgICAgbWFwRXhwZW5zZVRpY2tldERldGFpbExpbmUobGluZSlcclxuICAgICAgKTtcclxuICAgICAgc2V0SGVhZGVyKG1hcHBlZEhlYWRlcik7XHJcbiAgICAgIHNldExpbmVzKG1hcHBlZExpbmVzKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgJiYgZXJyb3Iuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0RXJyb3JNZXNzYWdlKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIlRpY2tldHNfRGV0YWlsX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldCBkZXRhaWwuXCIpKTtcclxuICAgICAgc2V0SGVhZGVyKG51bGwpO1xyXG4gICAgICBzZXRMaW5lcyhbXSk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFtlbmFibGVkLCBmaWxlSWQsIGhhc0FjY2Vzcywgb25Gb3JiaWRkZW5dKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHZvaWQgcmVsb2FkRGV0YWlsKCk7XHJcbiAgfSwgW3JlbG9hZERldGFpbF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaGVhZGVyLFxyXG4gICAgbGluZXMsXHJcbiAgICBpc0xvYWRpbmcsXHJcbiAgICBlcnJvck1lc3NhZ2UsXHJcbiAgICByZWxvYWREZXRhaWwsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IENvbXBhY3RQYWdpbmF0aW9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQ29tcGFjdFBhZ2luYXRpb24udHN4XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VEYXRlUGFydHMgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5IH0gZnJvbSBcIi4uL2V4cGVuc2VGb3JtYXR0ZXJzLnRzXCI7XHJcbmltcG9ydCB7IGZvcm1hdEV4cGVuc2VOdW1iZXIgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZU51bWJlckZvcm1hdC50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VUaWNrZXREZXRhaWxMaW5lIH0gZnJvbSBcIi4uL3RpY2tldHMvZGV0YWlsL2V4cGVuc2VUaWNrZXREZXRhaWxUeXBlcy50c1wiO1xyXG5pbXBvcnQgRXhwZW5zZVNlY3Rpb25EaXZpZGVyIGZyb20gXCIuL0V4cGVuc2VTZWN0aW9uRGl2aWRlci50c3hcIjtcclxuaW1wb3J0IEV4cGVuc2VUaW1lbGluZUNhcmQgZnJvbSBcIi4vRXhwZW5zZVRpbWVsaW5lQ2FyZC50c3hcIjtcclxuXHJcbnR5cGUgUGFnaW5hdGlvbkxhYmVscyA9IHtcclxuICBmaXJzdDogc3RyaW5nO1xyXG4gIHByZXY6IHN0cmluZztcclxuICBuZXh0OiBzdHJpbmc7XHJcbiAgbGFzdDogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0TGluZXNMaXN0UHJvcHMgPSB7XHJcbiAgdmlzaWJsZUxpbmVzOiBFeHBlbnNlVGlja2V0RGV0YWlsTGluZVtdO1xyXG4gIHRvdGFsTGluZVBhZ2VzOiBudW1iZXI7XHJcbiAgbGluZVBhZ2U6IG51bWJlcjtcclxuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBwYWdpbmF0aW9uTGFiZWxzOiBQYWdpbmF0aW9uTGFiZWxzO1xyXG4gIGNvbnRhaW5lclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgb25MaW5lUGFnZUNoYW5nZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcclxuICBvbk9wZW5MaW5lOiAobGluZVJlY0lkOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXRRdHlWYWx1ZSA9ICh2YWx1ZTogbnVtYmVyIHwgbnVsbCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIGZvcm1hdEV4cGVuc2VOdW1iZXIodmFsdWUsIHtcclxuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gICAgZmFsbGJhY2s6IFwiLVwiLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgRU1QVFlfREFURV9QQVJUUzogRXhwZW5zZURhdGVQYXJ0cyA9IHtcclxuICB5ZWFyOiBcIi0tXCIsXHJcbiAgbW9udGg6IFwiLS1cIixcclxuICBkYXk6IFwiLS1cIixcclxufTtcclxuXHJcbmNvbnN0IFRJQ0tFVF9MSU5FX0RBVEVfUEFORUxfSUNPTiA9IChcclxuICA8c3ZnXHJcbiAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxyXG4gICAgZmlsbD1cIm5vbmVcIlxyXG4gICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgIHN0cm9rZVdpZHRoPVwiMVwiXHJcbiAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxyXG4gICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXHJcbiAgICBjbGFzc05hbWU9XCJzaXplLTEwIHRleHQtWyMwMDI5NmJlMF1cIlxyXG4gICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICA+XHJcbiAgICA8cGF0aCBzdHJva2U9XCJub25lXCIgZD1cIk0wIDBoMjR2MjRIMHpcIiBmaWxsPVwibm9uZVwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTE0IDN2NGExIDEgMCAwIDAgMSAxaDRcIiAvPlxyXG4gICAgPHBhdGggZD1cIk0xNyAyMWgtMTBhMiAyIDAgMCAxIC0yIC0ydi0xNGEyIDIgMCAwIDEgMiAtMmg3bDUgNXYxMWEyIDIgMCAwIDEgLTIgMlwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTkgN2wxIDBcIiAvPlxyXG4gICAgPHBhdGggZD1cIk05IDEzbDYgMFwiIC8+XHJcbiAgICA8cGF0aCBkPVwiTTEzIDE3bDIgMFwiIC8+XHJcbiAgPC9zdmc+XHJcbik7XHJcblxyXG4vLyBUaWNrZXQgbGluZXMgc2VjdGlvbiByZW5kZXJlZCB3aXRoIHRpbWVsaW5lIGNhcmRzIGFuZCBwYWdpbmcgY29udHJvbHMuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXRMaW5lc0xpc3QgPSAoe1xyXG4gIHZpc2libGVMaW5lcyxcclxuICB0b3RhbExpbmVQYWdlcyxcclxuICBsaW5lUGFnZSxcclxuICBjdXJyZW5jeUNvZGUsXHJcbiAgcGFnaW5hdGlvbkxhYmVscyxcclxuICBjb250YWluZXJSZWYsXHJcbiAgb25MaW5lUGFnZUNoYW5nZSxcclxuICBvbk9wZW5MaW5lLFxyXG59OiBFeHBlbnNlVGlja2V0TGluZXNMaXN0UHJvcHMpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwic3BhY2UteS0wXCI+XHJcbiAgICAgIDxFeHBlbnNlU2VjdGlvbkRpdmlkZXIgbGFiZWw9e2luZFQoXCJUaWNrZXRzX0RldGFpbF9MaW5lc1wiLCBcIkxpbmVzXCIpfSBjbGFzc05hbWU9XCJleHBlbnNlLXNlY3Rpb24tZGl2aWRlci0tc3BhY2VkXCIgLz5cclxuXHJcbiAgICAgIHt2aXNpYmxlTGluZXMubGVuZ3RoID09PSAwID8gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtYm94IHRpbWVsaW5lLWVtcHR5XCIgZGF0YS1lbXB0eS10ZXh0PXtpbmRUKFwiVGlja2V0c19EZXRhaWxfTm9MaW5lc1wiLCBcIk5vIGxpbmVzIGZvciB0aGlzIHRpY2tldC5cIil9IC8+XHJcbiAgICAgICkgOiAoXHJcbiAgICAgICAgPGRpdiByZWY9e2NvbnRhaW5lclJlZn0gY2xhc3NOYW1lPVwidGltZWxpbmUtYm94XCI+XHJcbiAgICAgICAgICB7dmlzaWJsZUxpbmVzLm1hcCgobGluZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBhbW91bnRUZXh0ID0gZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5KGxpbmUudG90YWxBbW91bnQsIGN1cnJlbmN5Q29kZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHF0eVRleHQgPSBmb3JtYXRRdHlWYWx1ZShsaW5lLnF0eSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpdGxlID0gbGluZS5kZXNjcmlwdGlvbiB8fCBsaW5lLnJlY0lkIHx8IFwiLVwiO1xyXG4gICAgICAgICAgICBjb25zdCBzdWJ0aXRsZSA9IGAke2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX1F0eVwiLCBcIlF1YW50aXR5XCIpfTogJHtxdHlUZXh0fWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpbmVLZXkgPVxyXG4gICAgICAgICAgICAgIFN0cmluZyhsaW5lLnJlY0lkIHx8IFwiXCIpLnRyaW0oKSB8fFxyXG4gICAgICAgICAgICAgIFtsaW5lLmRlc2NyaXB0aW9uLCBsaW5lLnRvdGFsQW1vdW50LCBsaW5lLnByaWNlLCBsaW5lLnF0eV1cclxuICAgICAgICAgICAgICAgIC5tYXAoKHZhbHVlKSA9PiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpKVxyXG4gICAgICAgICAgICAgICAgLmpvaW4oXCJ8XCIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICA8ZGl2IGtleT17bGluZUtleX0gY2xhc3NOYW1lPVwidGltZWxpbmUtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgPEV4cGVuc2VUaW1lbGluZUNhcmRcclxuICAgICAgICAgICAgICAgICAgZGF0ZVBhcnRzPXtFTVBUWV9EQVRFX1BBUlRTfVxyXG4gICAgICAgICAgICAgICAgICBkYXRlUGFuZWxDb250ZW50PXtUSUNLRVRfTElORV9EQVRFX1BBTkVMX0lDT059XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0aXRsZX1cclxuICAgICAgICAgICAgICAgICAgc3VidGl0bGU9e3N1YnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICBzdWJ0aXRsZUNsYXNzTmFtZT1cImV4cGVuc2Utc2hlZXQtY2FyZF9fc3VidGl0bGUgZXhwZW5zZS1saW5lLWNhcmRfX21ldGEgdGV4dC1sZWZ0XCJcclxuICAgICAgICAgICAgICAgICAgYW1vdW50VGV4dD17YW1vdW50VGV4dH1cclxuICAgICAgICAgICAgICAgICAgb25PcGVuPXsoKSA9PiBvbk9wZW5MaW5lKGxpbmUucmVjSWQpfVxyXG4gICAgICAgICAgICAgICAgICB0aXRsZUNsYXNzTmFtZT1cInRpbWVsaW5lLW5hbWUgZXhwZW5zZS1saW5lLWNhcmRfX3RpdGxlIHRleHQtbGVmdFwiXHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgfSl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICA8Q29tcGFjdFBhZ2luYXRpb25cclxuICAgICAgICB0b3RhbFBhZ2VzPXt0b3RhbExpbmVQYWdlc31cclxuICAgICAgICBjdXJyZW50UGFnZT17bGluZVBhZ2V9XHJcbiAgICAgICAgb25QYWdlQ2hhbmdlPXtvbkxpbmVQYWdlQ2hhbmdlfVxyXG4gICAgICAgIGxhYmVscz17cGFnaW5hdGlvbkxhYmVsc31cclxuICAgICAgLz5cclxuICAgIDwvc2VjdGlvbj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldExpbmVzTGlzdDtcclxuIiwgImltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG5jb25zdCBJTUFHRV9FWFRFTlNJT05TID0gbmV3IFNldDxzdHJpbmc+KFtcImpwZ1wiLCBcImpwZWdcIiwgXCJwbmdcIiwgXCJ3ZWJwXCIsIFwiZ2lmXCIsIFwiYm1wXCIsIFwiaGVpY1wiLCBcImhlaWZcIiwgXCJhdmlmXCJdKTtcclxuXHJcbmNvbnN0IGdldEZpbGVFeHRlbnNpb25Gcm9tUGF0aCA9ICh2YWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBzb3VyY2UgPSBzYWZlVGV4dCh2YWx1ZSkudG9Mb3dlckNhc2UoKTtcclxuICBpZiAoIXNvdXJjZSkgcmV0dXJuIFwiXCI7XHJcblxyXG4gIGNvbnN0IHdpdGhvdXRRdWVyeSA9IHNvdXJjZS5zcGxpdChcIj9cIilbMF0uc3BsaXQoXCIjXCIpWzBdO1xyXG4gIGNvbnN0IHBhcnRzID0gd2l0aG91dFF1ZXJ5LnNwbGl0KFwiLlwiKTtcclxuICBpZiAocGFydHMubGVuZ3RoIDwgMikgcmV0dXJuIFwiXCI7XHJcblxyXG4gIGNvbnN0IHJhd0V4dCA9IHNhZmVUZXh0KHBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdKS5yZXBsYWNlKC9bXmEtejAtOV0vZywgXCJcIik7XHJcbiAgcmV0dXJuIHJhd0V4dCA9PT0gXCJqcGVnXCIgPyBcImpwZ1wiIDogcmF3RXh0O1xyXG59O1xyXG5cclxuLy8gRGV0ZWN0cyB3aGV0aGVyIG9uZSB0aWNrZXQgc291cmNlIGNhbiByZW5kZXIgYXMgYW4gaW5saW5lIGltYWdlIHByZXZpZXcuXHJcbmV4cG9ydCBjb25zdCBoYXNFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3U291cmNlID0gKHVybFZhbHVlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkVXJsID0gc2FmZVRleHQodXJsVmFsdWUpO1xyXG4gIGlmICghbm9ybWFsaXplZFVybCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBpZiAobm9ybWFsaXplZFVybC50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoXCJkYXRhOmltYWdlL1wiKSkgcmV0dXJuIHRydWU7XHJcblxyXG4gIGNvbnN0IGV4dGVuc2lvbiA9IGdldEZpbGVFeHRlbnNpb25Gcm9tUGF0aChub3JtYWxpemVkVXJsKTtcclxuICBpZiAoZXh0ZW5zaW9uICYmIElNQUdFX0VYVEVOU0lPTlMuaGFzKGV4dGVuc2lvbikpIHJldHVybiB0cnVlO1xyXG5cclxuICBjb25zdCBub3JtYWxpemVkTG93ZXIgPSBub3JtYWxpemVkVXJsLnRvTG93ZXJDYXNlKCk7XHJcbiAgaWYgKG5vcm1hbGl6ZWRMb3dlci5pbmNsdWRlcyhcImJsb2IuY29yZS53aW5kb3dzLm5ldFwiKSAmJiBub3JtYWxpemVkTG93ZXIuaW5jbHVkZXMoXCJpbWFnZVwiKSkgcmV0dXJuIHRydWU7XHJcblxyXG4gIHJldHVybiBmYWxzZTtcclxufTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IEluZm9Qb3BvdmVySWNvbkJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0luZm9Qb3BvdmVySWNvbkJ1dHRvbi50c3hcIjtcclxuaW1wb3J0IHsgaW5kRm9ybWF0LCBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4XCI7XHJcblxyXG50eXBlIEV4cGVuc2VDdXJyZW5jeVNldHRsZW1lbnRGaWVsZHNQcm9wcyA9IHtcclxuICBpc0VkaXRpbmc6IGJvb2xlYW47XHJcbiAgZXhwZW5zZUN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGV4cGVuc2VDdXJyZW5jeUludmFsaWQ/OiBib29sZWFuO1xyXG4gIGV4cGVuc2VDdXJyZW5jeUlucHV0UmVmPzogUmVhY3QuUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIGxvY2FsQ3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgZXhjaGFuZ2VSYXRlOiBzdHJpbmc7XHJcbiAgZXhjaGFuZ2VSYXRlSW52YWxpZD86IGJvb2xlYW47XHJcbiAgZXhjaGFuZ2VSYXRlSW5wdXRSZWY/OiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgYW1vdW50Q3VycmVuY3k6IHN0cmluZztcclxuICBhbW91bnRDdXJyZW5jeU1vZGU6IFwiZWRpdGFibGVcIiB8IFwicmVhZG9ubHlcIjtcclxuICBhbW91bnRDdXJyZW5jeUludmFsaWQ/OiBib29sZWFuO1xyXG4gIGFtb3VudEN1cnJlbmN5SW5wdXRSZWY/OiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgcmVpbWJ1cnNlbWVudEFtb3VudDogc3RyaW5nO1xyXG4gIHJlaW1idXJzZW1lbnRBbW91bnRJbnZhbGlkPzogYm9vbGVhbjtcclxuICByZWltYnVyc2VtZW50QW1vdW50SW5wdXRSZWY/OiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgb25FeHBlbnNlQ3VycmVuY3lDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uRXhjaGFuZ2VSYXRlQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvbkV4Y2hhbmdlUmF0ZUNvbW1pdD86ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uQW1vdW50Q3VycmVuY3lDaGFuZ2U/OiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBvblJlaW1idXJzZW1lbnRBbW91bnRDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuY29uc3QgTU9ORVlfSU5QVVRfRk9STUFUID0ge1xyXG4gIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogMixcclxuICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgZmFsbGJhY2s6IFwiXCIsXHJcbn07XHJcblxyXG5jb25zdCBFWENIQU5HRV9SQVRFX0lOUFVUX0ZPUk1BVCA9IHtcclxuICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDcsXHJcbiAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiA3LFxyXG4gIHVzZUdyb3VwaW5nOiB0cnVlLFxyXG4gIGZhbGxiYWNrOiBcIlwiLFxyXG59O1xyXG5cclxuY29uc3QgYnVpbGRJbnB1dENsYXNzTmFtZSA9IChpbnZhbGlkOiBib29sZWFuLCByZWFkT25seSA9IGZhbHNlKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gW1xyXG4gICAgXCJmb3JtLWNvbnRyb2xcIixcclxuICAgIFwidGV4dC1yaWdodCB0YWJ1bGFyLW51bXNcIixcclxuICAgIHJlYWRPbmx5ID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwiXCIsXHJcbiAgICBpbnZhbGlkID8gXCJib3JkZXItcm9zZS00MDAgYmctcm9zZS01MCBmb2N1czpib3JkZXItcm9zZS00MDAgZm9jdXM6cmluZy1yb3NlLTIwMFwiIDogXCJcIixcclxuICBdXHJcbiAgICAuZmlsdGVyKEJvb2xlYW4pXHJcbiAgICAuam9pbihcIiBcIik7XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXRNb25leUlucHV0ID0gKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcgPT4gZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyKHZhbHVlLCBNT05FWV9JTlBVVF9GT1JNQVQpO1xyXG5cclxuY29uc3QgZm9ybWF0RXhjaGFuZ2VSYXRlSW5wdXQgPSAodmFsdWU6IHN0cmluZyk6IHN0cmluZyA9PiBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIodmFsdWUsIEVYQ0hBTkdFX1JBVEVfSU5QVVRfRk9STUFUKTtcclxuXHJcbmNvbnN0IGZpZWxkQ29udGFpbmVyQ2xhc3NOYW1lID0gXCJzcGFjZS15LTEuNVwiO1xyXG5jb25zdCBmaWVsZExhYmVsQ2xhc3NOYW1lID0gXCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGQgbGVhZGluZy10aWdodCBtaW4taC02IGZsZXggaXRlbXMtY2VudGVyXCI7XHJcblxyXG4vLyBTaGFyZWQgZm91ci1maWVsZCBjdXJyZW5jeSBzZXR0bGVtZW50IGJsb2NrIHVzZWQgYnkgZXhwZW5zZSBsaW5lcyBhbmQgdGlja2V0IGhlYWRlcnMuXHJcbmNvbnN0IEV4cGVuc2VDdXJyZW5jeVNldHRsZW1lbnRGaWVsZHMgPSAoe1xyXG4gIGlzRWRpdGluZyxcclxuICBleHBlbnNlQ3VycmVuY3lDb2RlLFxyXG4gIGV4cGVuc2VDdXJyZW5jeUludmFsaWQgPSBmYWxzZSxcclxuICBleHBlbnNlQ3VycmVuY3lJbnB1dFJlZixcclxuICBsb2NhbEN1cnJlbmN5Q29kZSxcclxuICBleGNoYW5nZVJhdGUsXHJcbiAgZXhjaGFuZ2VSYXRlSW52YWxpZCA9IGZhbHNlLFxyXG4gIGV4Y2hhbmdlUmF0ZUlucHV0UmVmLFxyXG4gIGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlLFxyXG4gIGFtb3VudEN1cnJlbmN5LFxyXG4gIGFtb3VudEN1cnJlbmN5TW9kZSxcclxuICBhbW91bnRDdXJyZW5jeUludmFsaWQgPSBmYWxzZSxcclxuICBhbW91bnRDdXJyZW5jeUlucHV0UmVmLFxyXG4gIHJlaW1idXJzZW1lbnRBbW91bnQsXHJcbiAgcmVpbWJ1cnNlbWVudEFtb3VudEludmFsaWQgPSBmYWxzZSxcclxuICByZWltYnVyc2VtZW50QW1vdW50SW5wdXRSZWYsXHJcbiAgb25FeHBlbnNlQ3VycmVuY3lDaGFuZ2UsXHJcbiAgb25FeGNoYW5nZVJhdGVDaGFuZ2UsXHJcbiAgb25FeGNoYW5nZVJhdGVDb21taXQsXHJcbiAgb25BbW91bnRDdXJyZW5jeUNoYW5nZSxcclxuICBvblJlaW1idXJzZW1lbnRBbW91bnRDaGFuZ2UsXHJcbn06IEV4cGVuc2VDdXJyZW5jeVNldHRsZW1lbnRGaWVsZHNQcm9wcykgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRFeHBlbnNlQ3VycmVuY3lDb2RlID0gc2FmZVRleHQoZXhwZW5zZUN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBub3JtYWxpemVkTG9jYWxDdXJyZW5jeUNvZGUgPSBzYWZlVGV4dChsb2NhbEN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBzYW1lQ3VycmVuY3lTZXR0bGVtZW50ID1cclxuICAgICEhbm9ybWFsaXplZEV4cGVuc2VDdXJyZW5jeUNvZGUgJiZcclxuICAgICEhbm9ybWFsaXplZExvY2FsQ3VycmVuY3lDb2RlICYmXHJcbiAgICBub3JtYWxpemVkRXhwZW5zZUN1cnJlbmN5Q29kZSA9PT0gbm9ybWFsaXplZExvY2FsQ3VycmVuY3lDb2RlO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZVJlYWRPbmx5ID0gIWlzRWRpdGluZyB8fCBzYW1lQ3VycmVuY3lTZXR0bGVtZW50O1xyXG4gIGNvbnN0IGVmZmVjdGl2ZUV4Y2hhbmdlUmF0ZSA9XHJcbiAgICBzYW1lQ3VycmVuY3lTZXR0bGVtZW50ID8gZm9ybWF0RXhjaGFuZ2VSYXRlSW5wdXQoXCIxMDBcIikgOiBzYWZlVGV4dChleGNoYW5nZVJhdGUpO1xyXG4gIGNvbnN0IGVmZmVjdGl2ZUV4Y2hhbmdlUmF0ZUludmFsaWQgPSBleGNoYW5nZVJhdGVJbnZhbGlkO1xyXG4gIGNvbnN0IHJlaW1idXJzZW1lbnRDdXJyZW5jeUxhYmVsID0gbm9ybWFsaXplZExvY2FsQ3VycmVuY3lDb2RlIHx8IGluZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpO1xyXG4gIGNvbnN0IHJlaW1idXJzZW1lbnRMYWJlbCA9IGluZEZvcm1hdChcclxuICAgIFwiRXhwZW5zZVNoZWV0c19GaWVsZF9SZWltYnVyc2VtZW50QW1vdW50X1dpdGhDdXJyZW5jeVwiLFxyXG4gICAgXCJJbXAuIHJlZW1iLiAoezB9KVwiLFxyXG4gICAgcmVpbWJ1cnNlbWVudEN1cnJlbmN5TGFiZWxcclxuICApO1xyXG4gIGNvbnN0IGV4cGVuc2VDdXJyZW5jeUxhYmVsID0gbm9ybWFsaXplZEV4cGVuc2VDdXJyZW5jeUNvZGUgfHwgaW5kVChcIkNvbW1vbl9Ob3RBdmFpbGFibGVcIiwgXCJOL0FcIik7XHJcbiAgY29uc3QgZXhjaGFuZ2VSYXRlUmVmZXJlbmNlVmFsdWUgPSBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIoZWZmZWN0aXZlRXhjaGFuZ2VSYXRlLCB7XHJcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXHJcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcclxuICAgIGZhbGxiYWNrOiBcIi1cIixcclxuICB9KTtcclxuICBjb25zdCBleGNoYW5nZVJhdGVSZWZlcmVuY2VNZXNzYWdlID0gaW5kRm9ybWF0KFxyXG4gICAgXCJFeHBlbnNlU2hlZXRzX0V4Y2hhbmdlUmF0ZV9JbmZvUG9wb3Zlcl9SZWZlcmVuY2VcIixcclxuICAgIFwiMTAwIHswfSA9IHsxfSB7Mn1cXG5FbCB0aXBvIGRlIGNhbWJpbyBpbmRpY2EgY3VcdTAwRTFudGFzIHVuaWRhZGVzIGRlIGxhIGRpdmlzYSBkZWwgZ2FzdG8gZXF1aXZhbGVuIGEgMTAwIHVuaWRhZGVzIGRlIGxhIGRpdmlzYSBkZSByZWVtYm9sc28uXCIsXHJcbiAgICByZWltYnVyc2VtZW50Q3VycmVuY3lMYWJlbCxcclxuICAgIGV4Y2hhbmdlUmF0ZVJlZmVyZW5jZVZhbHVlLFxyXG4gICAgZXhwZW5zZUN1cnJlbmN5TGFiZWxcclxuICApO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZUluZm9Qb3BvdmVyQ29udGVudCA9IHNhZmVUZXh0KGV4Y2hhbmdlUmF0ZUluZm9NZXNzYWdlKVxyXG4gICAgPyBgJHtleGNoYW5nZVJhdGVSZWZlcmVuY2VNZXNzYWdlfVxcblxcbiR7c2FmZVRleHQoZXhjaGFuZ2VSYXRlSW5mb01lc3NhZ2UpfWBcclxuICAgIDogZXhjaGFuZ2VSYXRlUmVmZXJlbmNlTWVzc2FnZTtcclxuICBjb25zdCBhbW91bnRDdXJyZW5jeVJlYWRPbmx5ID0gIWlzRWRpdGluZyB8fCBhbW91bnRDdXJyZW5jeU1vZGUgPT09IFwicmVhZG9ubHlcIjtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWQ6Y29sLXNwYW4tMiBncmlkIGdyaWQtY29scy0yIGdhcC14LTQgZ2FwLXktMyBpdGVtcy1zdGFydFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17ZmllbGRDb250YWluZXJDbGFzc05hbWV9PlxyXG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9e2ZpZWxkTGFiZWxDbGFzc05hbWV9PntpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9BbW91bnRDdXJyZW5jeVwiLCBcIkltcC4gZGl2aXNhXCIpfTwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICByZWY9e2Ftb3VudEN1cnJlbmN5SW5wdXRSZWZ9XHJcbiAgICAgICAgICBjbGFzc05hbWU9e2J1aWxkSW5wdXRDbGFzc05hbWUoYW1vdW50Q3VycmVuY3lJbnZhbGlkLCBhbW91bnRDdXJyZW5jeVJlYWRPbmx5KX1cclxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgIGlucHV0TW9kZT1cImRlY2ltYWxcIlxyXG4gICAgICAgICAgdmFsdWU9e2Ftb3VudEN1cnJlbmN5IHx8IFwiXCJ9XHJcbiAgICAgICAgICBvbkNoYW5nZT17XHJcbiAgICAgICAgICAgICFhbW91bnRDdXJyZW5jeVJlYWRPbmx5ICYmIG9uQW1vdW50Q3VycmVuY3lDaGFuZ2VcclxuICAgICAgICAgICAgICA/IChldmVudCkgPT4gb25BbW91bnRDdXJyZW5jeUNoYW5nZShldmVudC50YXJnZXQudmFsdWUgfHwgXCJcIilcclxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgb25CbHVyPXtcclxuICAgICAgICAgICAgIWFtb3VudEN1cnJlbmN5UmVhZE9ubHkgJiYgb25BbW91bnRDdXJyZW5jeUNoYW5nZVxyXG4gICAgICAgICAgICAgID8gKGV2ZW50KSA9PiBvbkFtb3VudEN1cnJlbmN5Q2hhbmdlKGZvcm1hdE1vbmV5SW5wdXQoZXZlbnQudGFyZ2V0LnZhbHVlKSlcclxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmVhZE9ubHk9e2Ftb3VudEN1cnJlbmN5UmVhZE9ubHl9XHJcbiAgICAgICAgICBhcmlhLWludmFsaWQ9e2Ftb3VudEN1cnJlbmN5SW52YWxpZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwifVxyXG4gICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfQW1vdW50Q3VycmVuY3lcIiwgXCJJbXAuIGRpdmlzYVwiKX1cclxuICAgICAgICAvPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtmaWVsZENvbnRhaW5lckNsYXNzTmFtZX0+XHJcbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT17ZmllbGRMYWJlbENsYXNzTmFtZX0+e3JlaW1idXJzZW1lbnRMYWJlbH08L2xhYmVsPlxyXG4gICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgcmVmPXtyZWltYnVyc2VtZW50QW1vdW50SW5wdXRSZWZ9XHJcbiAgICAgICAgICBjbGFzc05hbWU9e2J1aWxkSW5wdXRDbGFzc05hbWUocmVpbWJ1cnNlbWVudEFtb3VudEludmFsaWQsICFpc0VkaXRpbmcpfVxyXG4gICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgaW5wdXRNb2RlPVwiZGVjaW1hbFwiXHJcbiAgICAgICAgICB2YWx1ZT17cmVpbWJ1cnNlbWVudEFtb3VudCB8fCBcIlwifVxyXG4gICAgICAgICAgb25DaGFuZ2U9e2lzRWRpdGluZyA/IChldmVudCkgPT4gb25SZWltYnVyc2VtZW50QW1vdW50Q2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKSA6IHVuZGVmaW5lZH1cclxuICAgICAgICAgIG9uQmx1cj17aXNFZGl0aW5nID8gKGV2ZW50KSA9PiBvblJlaW1idXJzZW1lbnRBbW91bnRDaGFuZ2UoZm9ybWF0TW9uZXlJbnB1dChldmVudC50YXJnZXQudmFsdWUpKSA6IHVuZGVmaW5lZH1cclxuICAgICAgICAgIHJlYWRPbmx5PXshaXNFZGl0aW5nfVxyXG4gICAgICAgICAgYXJpYS1pbnZhbGlkPXtyZWltYnVyc2VtZW50QW1vdW50SW52YWxpZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwifVxyXG4gICAgICAgICAgYXJpYS1sYWJlbD17cmVpbWJ1cnNlbWVudExhYmVsfVxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgPEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdFxyXG4gICAgICAgIGxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19GaWVsZF9FeHBlbnNlQ3VycmVuY3lcIiwgXCJEaXZpc2EgZ2FzdG9cIil9XHJcbiAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9DdXJyZW5jeV9QbGFjZWhvbGRlclwiLCBcIkN1cnJlbmN5IGNvZGVcIil9XHJcbiAgICAgICAgdmFsdWU9e25vcm1hbGl6ZWRFeHBlbnNlQ3VycmVuY3lDb2RlfVxyXG4gICAgICAgIG9uQ2hhbmdlPXtvbkV4cGVuc2VDdXJyZW5jeUNoYW5nZX1cclxuICAgICAgICBpbnZhbGlkPXtleHBlbnNlQ3VycmVuY3lJbnZhbGlkfVxyXG4gICAgICAgIGlucHV0UmVmPXtleHBlbnNlQ3VycmVuY3lJbnB1dFJlZn1cclxuICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cclxuICAgICAgICBjb250YWluZXJDbGFzc05hbWU9e2ZpZWxkQ29udGFpbmVyQ2xhc3NOYW1lfVxyXG4gICAgICAgIGxhYmVsQ2xhc3NOYW1lPXtmaWVsZExhYmVsQ2xhc3NOYW1lfVxyXG4gICAgICAgIGlkQmFzZT1cImV4cGVuc2UtY3VycmVuY3ktc2V0dGxlbWVudC1leHBlbnNlLWN1cnJlbmN5XCJcclxuICAgICAgICBkcm9wZG93bk1pbldpZHRoUHg9ezI2MH1cclxuICAgICAgLz5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtmaWVsZENvbnRhaW5lckNsYXNzTmFtZX0+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IG1pbi1oLTYgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMlwiPlxyXG4gICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT17ZmllbGRMYWJlbENsYXNzTmFtZX0+e2luZFQoXCJFeHBlbnNlU2hlZXRzX0ZpZWxkX0V4Y2hhbmdlUmF0ZVwiLCBcIlRpcG8gY2FtYmlvXCIpfTwvbGFiZWw+XHJcbiAgICAgICAgICA8SW5mb1BvcG92ZXJJY29uQnV0dG9uXHJcbiAgICAgICAgICAgIGNvbnRlbnQ9e2V4Y2hhbmdlUmF0ZUluZm9Qb3BvdmVyQ29udGVudH1cclxuICAgICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiRXhwZW5zZVNoZWV0c19FeGNoYW5nZVJhdGVfSW5mb1BvcG92ZXJfQXJpYVwiLCBcIkV4Y2hhbmdlIHJhdGUgaW5mb3JtYXRpb25cIil9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInNocmluay0wXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICByZWY9e2V4Y2hhbmdlUmF0ZUlucHV0UmVmfVxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtidWlsZElucHV0Q2xhc3NOYW1lKGVmZmVjdGl2ZUV4Y2hhbmdlUmF0ZUludmFsaWQsIGV4Y2hhbmdlUmF0ZVJlYWRPbmx5KX1cclxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgIGlucHV0TW9kZT1cImRlY2ltYWxcIlxyXG4gICAgICAgICAgdmFsdWU9e2VmZmVjdGl2ZUV4Y2hhbmdlUmF0ZX1cclxuICAgICAgICAgIG9uQ2hhbmdlPXshZXhjaGFuZ2VSYXRlUmVhZE9ubHkgPyAoZXZlbnQpID0+IG9uRXhjaGFuZ2VSYXRlQ2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSB8fCBcIlwiKSA6IHVuZGVmaW5lZH1cclxuICAgICAgICAgIG9uQmx1cj17XHJcbiAgICAgICAgICAgICFleGNoYW5nZVJhdGVSZWFkT25seVxyXG4gICAgICAgICAgICAgID8gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRWYWx1ZSA9IGZvcm1hdEV4Y2hhbmdlUmF0ZUlucHV0KGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgIChvbkV4Y2hhbmdlUmF0ZUNvbW1pdCB8fCBvbkV4Y2hhbmdlUmF0ZUNoYW5nZSkobmV4dFZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmVhZE9ubHk9e2V4Y2hhbmdlUmF0ZVJlYWRPbmx5fVxyXG4gICAgICAgICAgYXJpYS1yZWFkb25seT17ZXhjaGFuZ2VSYXRlUmVhZE9ubHkgPyBcInRydWVcIiA6IFwiZmFsc2VcIn1cclxuICAgICAgICAgIGFyaWEtaW52YWxpZD17ZWZmZWN0aXZlRXhjaGFuZ2VSYXRlSW52YWxpZCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwifVxyXG4gICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkV4cGVuc2VTaGVldHNfRmllbGRfRXhjaGFuZ2VSYXRlXCIsIFwiVGlwbyBjYW1iaW9cIil9XHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUN1cnJlbmN5U2V0dGxlbWVudEZpZWxkcztcclxuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSBcInJlYWN0LWRvbVwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBUaWNrZXRQcmV2aWV3UG9pbnQgfSBmcm9tIFwiLi91c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3LnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWxQcm9wcyA9IHtcclxuICBvcGVuOiBib29sZWFuO1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgZXJyb3I6IHN0cmluZztcclxuICBpbWFnZVVybDogc3RyaW5nO1xyXG4gIGltYWdlQWx0OiBzdHJpbmc7XHJcbiAgc2NhbGU6IG51bWJlcjtcclxuICB0cmFuc2xhdGU6IFRpY2tldFByZXZpZXdQb2ludDtcclxuICBzdXJmYWNlUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xyXG4gIG9uUG9pbnRlckRvd246IChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4gdm9pZDtcclxuICBvblBvaW50ZXJNb3ZlOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgb25Qb2ludGVyRW5kOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIHRoZSB0aWNrZXQgaW1hZ2UgcHJldmlldyBvdmVybGF5IHdpdGggem9vbSBhbmQgcGFuIGdlc3R1cmVzLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0UHJldmlld01vZGFsID0gKHtcclxuICBvcGVuLFxyXG4gIGJ1c3ksXHJcbiAgZXJyb3IsXHJcbiAgaW1hZ2VVcmwsXHJcbiAgaW1hZ2VBbHQsXHJcbiAgc2NhbGUsXHJcbiAgdHJhbnNsYXRlLFxyXG4gIHN1cmZhY2VSZWYsXHJcbiAgb25DbG9zZSxcclxuICBvblBvaW50ZXJEb3duLFxyXG4gIG9uUG9pbnRlck1vdmUsXHJcbiAgb25Qb2ludGVyRW5kLFxyXG59OiBFeHBlbnNlVGlja2V0UHJldmlld01vZGFsUHJvcHMpID0+IHtcclxuICBpZiAoIW9wZW4pIHJldHVybiBudWxsO1xyXG5cclxuICByZXR1cm4gY3JlYXRlUG9ydGFsKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNjAwMDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG92ZXJzY3JvbGwtY29udGFpbiBiZy1zbGF0ZS05NTAvNDUgcHgtNCBweS02IGJhY2tkcm9wLWJsdXItbWRcIj5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fQ2xvc2VcIiwgXCJDbG9zZVwiKX1cclxuICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wXCJcclxuICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxyXG4gICAgICAvPlxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9DbG9zZVwiLCBcIkNsb3NlXCIpfVxyXG4gICAgICAgIGNsYXNzTmFtZT1cImZpeGVkIHJpZ2h0LTQgdG9wLVtjYWxjKDFyZW0rZW52KHNhZmUtYXJlYS1pbnNldC10b3AsMHB4KSldIHotWzYwMDAyMF0gaW5saW5lLWZsZXggaC0xMCB3LTEwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMC82MCBiZy1zbGF0ZS05MDAvNzggdGV4dC1zbGF0ZS0xMDAgc2hhZG93LWxnIHRyYW5zaXRpb24gaG92ZXI6Ymctc2xhdGUtOTAwLzg4IGZvY3VzLXZpc2libGU6b3V0bGluZS1oaWRkZW4gZm9jdXMtdmlzaWJsZTpyaW5nLTIgZm9jdXMtdmlzaWJsZTpyaW5nLXNsYXRlLTIwMC84MFwiXHJcbiAgICAgICAgb25DbGljaz17b25DbG9zZX1cclxuICAgICAgPlxyXG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgZD1cIk02IDZMMTggMThNMTggNkw2IDE4XCJcclxuICAgICAgICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg9XCIxLjc1XCJcclxuICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcclxuICAgICAgICAgICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgZmxleCBtYXgtaC1bOTJ2aF0gbWF4LXctWzkydnddIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBvdmVyc2Nyb2xsLWNvbnRhaW5cIj5cclxuICAgICAgICB7YnVzeSA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTEwMFwiPlxyXG4gICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxyXG4gICAgICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogZXJyb3IgPyAoXHJcbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtcm9zZS0yMDBcIj57ZXJyb3J9PC9wPlxyXG4gICAgICAgICkgOiBpbWFnZVVybCA/IChcclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgcmVmPXtzdXJmYWNlUmVmfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZSBtYXgtaC1bOTB2aF0gbWF4LXctWzkydnddIG92ZXJmbG93LWhpZGRlbiByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSB0b3VjaC1ub25lIG92ZXJzY3JvbGwtY29udGFpblwiXHJcbiAgICAgICAgICAgIHJvbGU9XCJwcmVzZW50YXRpb25cIlxyXG4gICAgICAgICAgICBzdHlsZT17eyB0b3VjaEFjdGlvbjogXCJub25lXCIgfX1cclxuICAgICAgICAgICAgb25Qb2ludGVyRG93bj17b25Qb2ludGVyRG93bn1cclxuICAgICAgICAgICAgb25Qb2ludGVyTW92ZT17b25Qb2ludGVyTW92ZX1cclxuICAgICAgICAgICAgb25Qb2ludGVyVXA9e29uUG9pbnRlckVuZH1cclxuICAgICAgICAgICAgb25Qb2ludGVyQ2FuY2VsPXtvblBvaW50ZXJFbmR9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICBzcmM9e2ltYWdlVXJsfVxyXG4gICAgICAgICAgICAgIGFsdD17aW1hZ2VBbHQgfHwgaW5kVChcIlRpY2tldHNfRmllbGRfRmlsZUlkXCIsIFwiVGlja2V0XCIpfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInBvaW50ZXItZXZlbnRzLW5vbmUgbWF4LWgtWzkwdmhdIHctYXV0byBtYXgtdy1bOTJ2d10gc2VsZWN0LW5vbmUgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gb2JqZWN0LWNvbnRhaW4gc2hhZG93LTJ4bFwiXHJcbiAgICAgICAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCR7dHJhbnNsYXRlLnh9cHgsICR7dHJhbnNsYXRlLnl9cHgsIDApIHNjYWxlKCR7c2NhbGV9KWAsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46IFwiY2VudGVyIGNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogc2NhbGUgPD0gMSA/IFwidHJhbnNmb3JtIDE0MG1zIGVhc2Utb3V0XCIgOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIGRyYWdnYWJsZT17ZmFsc2V9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXNsYXRlLTEwMFwiPntpbmRUKFwiQ29tbW9uX05vdEF2YWlsYWJsZVwiLCBcIk4vQVwiKX08L3A+XHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj4sXHJcbiAgICBkb2N1bWVudC5ib2R5XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWw7XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0U3RpY2t5UHJldmlld1Byb3BzID0ge1xyXG4gIGJ1c3k6IGJvb2xlYW47XHJcbiAgZXJyb3I6IHN0cmluZztcclxuICBpbWFnZVVybDogc3RyaW5nO1xyXG4gIGltYWdlQWx0OiBzdHJpbmc7XHJcbiAgZmlsZU5hbWU6IHN0cmluZztcclxuICBvbk9wZW46ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIG9uZSBjb21wYWN0IHRpY2tldCBwcmV2aWV3IHRoYXQgc3RheXMgdmlzaWJsZSB3aGlsZSBkZXRhaWwgY29udGVudCBzY3JvbGxzLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0U3RpY2t5UHJldmlldyA9ICh7XHJcbiAgYnVzeSxcclxuICBlcnJvcixcclxuICBpbWFnZVVybCxcclxuICBpbWFnZUFsdCxcclxuICBmaWxlTmFtZSxcclxuICBvbk9wZW4sXHJcbn06IEV4cGVuc2VUaWNrZXRTdGlja3lQcmV2aWV3UHJvcHMpID0+IHtcclxuICBjb25zdCBwcmV2aWV3TGFiZWwgPSBpbmRUKFwiVGlja2V0c19EZXRhaWxfVmlld0F0dGFjaG1lbnRcIiwgXCJWZXIgYWRqdW50b1wiKTtcclxuICBjb25zdCB0aWNrZXRMYWJlbCA9IGluZFQoXCJUaWNrZXRzX0ZpZWxkX0ZpbGVJZFwiLCBcIlRpY2tldFwiKTtcclxuICBjb25zdCBzYWZlRmlsZU5hbWUgPSBzYWZlVGV4dChmaWxlTmFtZSkgfHwgc2FmZVRleHQoaW1hZ2VBbHQpIHx8IHRpY2tldExhYmVsO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzdGlja3kgdG9wLVs3MnB4XSB6LVsxNDAwXSBtaW4tdy0wIG1heC13LWZ1bGwgbGc6dG9wLTIwXCI+XHJcbiAgICAgIDxidXR0b25cclxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICBjbGFzc05hbWU9XCJncm91cCBibG9jayBtaW4tdy0wIHctZnVsbCBtYXgtdy1mdWxsIHRvdWNoLW1hbmlwdWxhdGlvbiB0ZXh0LWxlZnQgZm9jdXMtdmlzaWJsZTpvdXRsaW5lLWhpZGRlbiBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctcHJpbWFyeS8zNSBmb2N1cy12aXNpYmxlOnJpbmctb2Zmc2V0LTJcIlxyXG4gICAgICAgIGFyaWEtbGFiZWw9e2Ake3ByZXZpZXdMYWJlbH06ICR7c2FmZUZpbGVOYW1lfWB9XHJcbiAgICAgICAgb25DbGljaz17b25PcGVufVxyXG4gICAgICA+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdmVyZmxvdy1oaWRkZW4gcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUgc2hhZG93LXhzIHRyYW5zaXRpb24tW3RyYW5zZm9ybSxib3gtc2hhZG93LGJvcmRlci1jb2xvcl0gZHVyYXRpb24tMjAwIGdyb3VwLWhvdmVyOi10cmFuc2xhdGUteS1bMXB4XSBncm91cC1ob3Zlcjpib3JkZXItcHJpbWFyeS8yNSBncm91cC1ob3ZlcjpzaGFkb3ctbWRcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgaC0zNiBvdmVyZmxvdy1oaWRkZW4gYmctbGluZWFyLXRvLWJyIGZyb20tc2xhdGUtMTAwIHZpYS13aGl0ZSB0by1zbGF0ZS0yMDAgc206aC00MCBsZzpoLVszODBweF1cIj5cclxuICAgICAgICAgICAge2ltYWdlVXJsID8gKFxyXG4gICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgIHNyYz17aW1hZ2VVcmx9XHJcbiAgICAgICAgICAgICAgICBhbHQ9e2ltYWdlQWx0IHx8IHRpY2tldExhYmVsfVxyXG4gICAgICAgICAgICAgICAgd2lkdGg9ezY0MH1cclxuICAgICAgICAgICAgICAgIGhlaWdodD17OTYwfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC1mdWxsIHctZnVsbCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBvYmplY3QtY292ZXIgb2JqZWN0LWNlbnRlciB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0zMDAgZ3JvdXAtaG92ZXI6c2NhbGUtWzEuMDE1XSBsZzpvYmplY3QtY29udGFpbiBsZzpvYmplY3QtY2VudGVyIGxnOnAtM1wiXHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaC1mdWxsIG1pbi13LTAgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHB4LTRcIj5cclxuICAgICAgICAgICAgICAgIHtidXN5ID8gKFxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IG1pbi13LTAgdy1mdWxsIG1heC13LWZ1bGwgaXRlbXMtY2VudGVyIGdhcC0zIHRleHQtc2xhdGUtNzAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGgtMTEgdy0xMSBzaHJpbmstMCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYmctcHJpbWFyeS84IHRleHQtcHJpbWFyeVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk03IDMuNzVoNi4yNUwxOC4yNSA4Ljc1VjE5LjVhLjc1Ljc1IDAgMCAxLS43NS43NUg3YS43NS43NSAwIDAgMS0uNzUtLjc1di0xNUEuNzUuNzUgMCAwIDEgNyAzLjc1WlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD1cIjEuNVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkPVwiTTEzIDMuNzVWOC41aDQuNzVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9XCIxLjVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi13LTAgZmxleC0xXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0cnVuY2F0ZSB0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDBcIj57c2FmZUZpbGVOYW1lfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImxpbmUtY2xhbXAtMiB0ZXh0LXhzIHRleHQtc2xhdGUtNTAwXCI+e2Vycm9yIHx8IHByZXZpZXdMYWJlbH08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtbm9uZSBhYnNvbHV0ZSBpbnNldC14LTAgdG9wLTAgaC0xNiBiZy1saW5lYXItdG8tYiBmcm9tLXNsYXRlLTk1MC8yNiB2aWEtc2xhdGUtOTAwLzggdG8tdHJhbnNwYXJlbnQgbGc6aC0yMFwiIC8+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtbm9uZSBhYnNvbHV0ZSByaWdodC0zIHRvcC0zIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBiZy1wcmltYXJ5LzkyIHB4LTMgcHktMS41IHRleHQtWzExcHhdIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSBzaGFkb3ctc21cIj5cclxuICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImgtMy41IHctMy41XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgICAgICBkPVwiTTE1IDNoNnY2TTIxIDNsLTcgN005IDIxSDN2LTZNMyAyMWw3LTdcIlxyXG4gICAgICAgICAgICAgICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD1cIjEuNVwiXHJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICB7cHJldmlld0xhYmVsfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0U3RpY2t5UHJldmlldztcclxuIiwgIlx1RkVGRmltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldFByZXZpZXdCbG9iIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuXHJcbmNvbnN0IFBSRVZJRVdfTUFYX1NDQUxFID0gNDtcclxuY29uc3QgUFJFVklFV19TQ0FMRV9TVEVQID0gMC4yNTtcclxuXHJcbmV4cG9ydCB0eXBlIFRpY2tldFByZXZpZXdQb2ludCA9IHtcclxuICB4OiBudW1iZXI7XHJcbiAgeTogbnVtYmVyO1xyXG59O1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3QXJncyA9IHtcclxuICBmaWxlSWQ6IHN0cmluZztcclxuICBzb3VyY2VVcmw6IHN0cmluZztcclxuICBlbmFibGVkPzogYm9vbGVhbjtcclxufTtcclxuXHJcbmNvbnN0IGNsYW1wUHJldmlld1NjYWxlID0gKHZhbHVlOiBudW1iZXIpOiBudW1iZXIgPT4ge1xyXG4gIGlmICghTnVtYmVyLmlzRmluaXRlKHZhbHVlKSkgcmV0dXJuIDE7XHJcbiAgcmV0dXJuIE1hdGgubWluKFBSRVZJRVdfTUFYX1NDQUxFLCBNYXRoLm1heCgxLCB2YWx1ZSkpO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0UHJldmlld1BvaW50RGlzdGFuY2UgPSAobGVmdDogVGlja2V0UHJldmlld1BvaW50LCByaWdodDogVGlja2V0UHJldmlld1BvaW50KTogbnVtYmVyID0+IHtcclxuICBjb25zdCBkZWx0YVggPSByaWdodC54IC0gbGVmdC54O1xyXG4gIGNvbnN0IGRlbHRhWSA9IHJpZ2h0LnkgLSBsZWZ0Lnk7XHJcbiAgcmV0dXJuIE1hdGguc3FydChkZWx0YVggKiBkZWx0YVggKyBkZWx0YVkgKiBkZWx0YVkpO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0UHJldmlld1BvaW50Q2VudGVyID0gKGxlZnQ6IFRpY2tldFByZXZpZXdQb2ludCwgcmlnaHQ6IFRpY2tldFByZXZpZXdQb2ludCk6IFRpY2tldFByZXZpZXdQb2ludCA9PiAoe1xyXG4gIHg6IChsZWZ0LnggKyByaWdodC54KSAvIDIsXHJcbiAgeTogKGxlZnQueSArIHJpZ2h0LnkpIC8gMixcclxufSk7XHJcblxyXG4vLyBNYW5hZ2VzIHRpY2tldCBpbWFnZSBwcmV2aWV3IHN0YXRlIGFuZCB6b29tL3BhbiBnZXN0dXJlcy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcgPSAoeyBmaWxlSWQsIHNvdXJjZVVybCwgZW5hYmxlZCA9IHRydWUgfTogVXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlld0FyZ3MpID0+IHtcclxuICBjb25zdCBbcHJldmlld09wZW4sIHNldFByZXZpZXdPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbcHJldmlld0J1c3ksIHNldFByZXZpZXdCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbcHJldmlld0Vycm9yLCBzZXRQcmV2aWV3RXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3ByZXZpZXdJbWFnZVVybCwgc2V0UHJldmlld0ltYWdlVXJsXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtwcmV2aWV3U2NhbGUsIHNldFByZXZpZXdTY2FsZV0gPSB1c2VTdGF0ZSgxKTtcclxuICBjb25zdCBbcHJldmlld1RyYW5zbGF0ZSwgc2V0UHJldmlld1RyYW5zbGF0ZV0gPSB1c2VTdGF0ZTxUaWNrZXRQcmV2aWV3UG9pbnQ+KHsgeDogMCwgeTogMCB9KTtcclxuXHJcbiAgY29uc3QgcHJldmlld1NjYWxlUmVmID0gdXNlUmVmKDEpO1xyXG4gIGNvbnN0IHByZXZpZXdJbWFnZVVybFJlZiA9IHVzZVJlZihcIlwiKTtcclxuICBjb25zdCBwcmV2aWV3UmVxdWVzdEtleVJlZiA9IHVzZVJlZihcIlwiKTtcclxuICBjb25zdCBwcmV2aWV3TG9hZFByb21pc2VSZWYgPSB1c2VSZWY8UHJvbWlzZTxzdHJpbmc+IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgcHJldmlld1N1cmZhY2VSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBwcmV2aWV3VHJhbnNsYXRlUmVmID0gdXNlUmVmPFRpY2tldFByZXZpZXdQb2ludD4oeyB4OiAwLCB5OiAwIH0pO1xyXG4gIGNvbnN0IHByZXZpZXdQb2ludGVyc1JlZiA9IHVzZVJlZjxNYXA8bnVtYmVyLCBUaWNrZXRQcmV2aWV3UG9pbnQ+PihuZXcgTWFwKCkpO1xyXG4gIGNvbnN0IHByZXZpZXdQYW5Qb2ludGVyUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHByZXZpZXdQYW5MYXN0UG9pbnRSZWYgPSB1c2VSZWY8VGlja2V0UHJldmlld1BvaW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgcHJldmlld1BpbmNoU25hcHNob3RSZWYgPSB1c2VSZWY8e1xyXG4gICAgZGlzdGFuY2U6IG51bWJlcjtcclxuICAgIHNjYWxlOiBudW1iZXI7XHJcbiAgICBjZW50ZXI6IFRpY2tldFByZXZpZXdQb2ludDtcclxuICAgIHRyYW5zbGF0ZTogVGlja2V0UHJldmlld1BvaW50O1xyXG4gIH0gfCBudWxsPihudWxsKTtcclxuXHJcbiAgY29uc3QgYXBwbHlQcmV2aWV3VHJhbnNmb3JtID0gdXNlQ2FsbGJhY2soKG5leHRTY2FsZTogbnVtYmVyLCBuZXh0VHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQpID0+IHtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRTY2FsZSA9IGNsYW1wUHJldmlld1NjYWxlKG5leHRTY2FsZSk7XHJcbiAgICBjb25zdCBub3JtYWxpemVkVHJhbnNsYXRlID0gbm9ybWFsaXplZFNjYWxlIDw9IDEgPyB7IHg6IDAsIHk6IDAgfSA6IG5leHRUcmFuc2xhdGU7XHJcblxyXG4gICAgcHJldmlld1NjYWxlUmVmLmN1cnJlbnQgPSBub3JtYWxpemVkU2NhbGU7XHJcbiAgICBwcmV2aWV3VHJhbnNsYXRlUmVmLmN1cnJlbnQgPSBub3JtYWxpemVkVHJhbnNsYXRlO1xyXG4gICAgc2V0UHJldmlld1NjYWxlKG5vcm1hbGl6ZWRTY2FsZSk7XHJcbiAgICBzZXRQcmV2aWV3VHJhbnNsYXRlKG5vcm1hbGl6ZWRUcmFuc2xhdGUpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgcmVzZXRQcmV2aWV3R2VzdHVyZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LmNsZWFyKCk7XHJcbiAgICBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIGFwcGx5UHJldmlld1RyYW5zZm9ybSgxLCB7IHg6IDAsIHk6IDAgfSk7XHJcbiAgfSwgW2FwcGx5UHJldmlld1RyYW5zZm9ybV0pO1xyXG5cclxuICBjb25zdCByZWJ1aWxkUGluY2hTbmFwc2hvdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IHBvaW50ZXJQb2ludHMgPSBBcnJheS5mcm9tKHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LnZhbHVlcygpKTtcclxuICAgIGlmIChwb2ludGVyUG9pbnRzLmxlbmd0aCA8IDIpIHtcclxuICAgICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBbbGVmdCwgcmlnaHRdID0gcG9pbnRlclBvaW50cztcclxuICAgIHByZXZpZXdQaW5jaFNuYXBzaG90UmVmLmN1cnJlbnQgPSB7XHJcbiAgICAgIGRpc3RhbmNlOiBNYXRoLm1heCgxLCBnZXRQcmV2aWV3UG9pbnREaXN0YW5jZShsZWZ0LCByaWdodCkpLFxyXG4gICAgICBzY2FsZTogcHJldmlld1NjYWxlUmVmLmN1cnJlbnQsXHJcbiAgICAgIGNlbnRlcjogZ2V0UHJldmlld1BvaW50Q2VudGVyKGxlZnQsIHJpZ2h0KSxcclxuICAgICAgdHJhbnNsYXRlOiBwcmV2aWV3VHJhbnNsYXRlUmVmLmN1cnJlbnQsXHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgcmVwbGFjZVByZXZpZXdJbWFnZVVybCA9IHVzZUNhbGxiYWNrKChuZXh0VXJsOiBzdHJpbmcpID0+IHtcclxuICAgIHNldFByZXZpZXdJbWFnZVVybCgocHJldmlvdXMpID0+IHtcclxuICAgICAgaWYgKHByZXZpb3VzICYmIHByZXZpb3VzICE9PSBuZXh0VXJsKSB7XHJcbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChwcmV2aW91cyk7XHJcbiAgICAgIH1cclxuICAgICAgcHJldmlld0ltYWdlVXJsUmVmLmN1cnJlbnQgPSBuZXh0VXJsO1xyXG4gICAgICByZXR1cm4gbmV4dFVybDtcclxuICAgIH0pO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgY2xlYXJQcmV2aWV3SW1hZ2UgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBwcmV2aWV3TG9hZFByb21pc2VSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBzZXRQcmV2aWV3SW1hZ2VVcmwoKHByZXZpb3VzKSA9PiB7XHJcbiAgICAgIGlmIChwcmV2aW91cykge1xyXG4gICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwocHJldmlvdXMpO1xyXG4gICAgICB9XHJcbiAgICAgIHByZXZpZXdJbWFnZVVybFJlZi5jdXJyZW50ID0gXCJcIjtcclxuICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGxvYWRQcmV2aWV3SW1hZ2UgPSB1c2VDYWxsYmFjayhhc3luYyAoKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcclxuICAgIGNvbnN0IGN1cnJlbnRGaWxlSWQgPSBzYWZlVGV4dChmaWxlSWQpO1xyXG4gICAgY29uc3QgY3VycmVudFVybCA9IHNhZmVUZXh0KHNvdXJjZVVybCk7XHJcbiAgICBpZiAoIWVuYWJsZWQgfHwgIWN1cnJlbnRGaWxlSWQgfHwgIWN1cnJlbnRVcmwpIHtcclxuICAgICAgc2V0UHJldmlld0J1c3koZmFsc2UpO1xyXG4gICAgICBzZXRQcmV2aWV3RXJyb3IoXCJcIik7XHJcbiAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcmV2aWV3SW1hZ2VVcmxSZWYuY3VycmVudCkge1xyXG4gICAgICByZXR1cm4gcHJldmlld0ltYWdlVXJsUmVmLmN1cnJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByZXZpZXdMb2FkUHJvbWlzZVJlZi5jdXJyZW50KSB7XHJcbiAgICAgIHJldHVybiBwcmV2aWV3TG9hZFByb21pc2VSZWYuY3VycmVudDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXF1ZXN0S2V5ID0gYCR7Y3VycmVudEZpbGVJZH1fXyR7Y3VycmVudFVybH1gO1xyXG4gICAgcHJldmlld1JlcXVlc3RLZXlSZWYuY3VycmVudCA9IHJlcXVlc3RLZXk7XHJcbiAgICBzZXRQcmV2aWV3QnVzeSh0cnVlKTtcclxuICAgIHNldFByZXZpZXdFcnJvcihcIlwiKTtcclxuXHJcbiAgICBjb25zdCBuZXh0UHJvbWlzZSA9IChhc3luYyAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgYmxvYiA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0UHJldmlld0Jsb2IoY3VycmVudEZpbGVJZCwgY3VycmVudFVybCwge1xyXG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3Qgb2JqZWN0VXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuICAgICAgICBpZiAocHJldmlld1JlcXVlc3RLZXlSZWYuY3VycmVudCAhPT0gcmVxdWVzdEtleSkge1xyXG4gICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChvYmplY3RVcmwpO1xyXG4gICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXBsYWNlUHJldmlld0ltYWdlVXJsKG9iamVjdFVybCk7XHJcbiAgICAgICAgcmV0dXJuIG9iamVjdFVybDtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAocHJldmlld1JlcXVlc3RLZXlSZWYuY3VycmVudCA9PT0gcmVxdWVzdEtleSkge1xyXG4gICAgICAgICAgc2V0UHJldmlld0Vycm9yKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgaWYgKHByZXZpZXdSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPT09IHJlcXVlc3RLZXkpIHtcclxuICAgICAgICAgIHNldFByZXZpZXdCdXN5KGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJldmlld0xvYWRQcm9taXNlUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIHByZXZpZXdMb2FkUHJvbWlzZVJlZi5jdXJyZW50ID0gbmV4dFByb21pc2U7XHJcbiAgICByZXR1cm4gbmV4dFByb21pc2U7XHJcbiAgfSwgW2VuYWJsZWQsIGZpbGVJZCwgcmVwbGFjZVByZXZpZXdJbWFnZVVybCwgc291cmNlVXJsXSk7XHJcblxyXG4gIGNvbnN0IGNsb3NlUHJldmlldyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFByZXZpZXdPcGVuKGZhbHNlKTtcclxuICAgIHNldFByZXZpZXdCdXN5KGZhbHNlKTtcclxuICAgIHNldFByZXZpZXdFcnJvcihcIlwiKTtcclxuICAgIHJlc2V0UHJldmlld0dlc3R1cmUoKTtcclxuICB9LCBbcmVzZXRQcmV2aWV3R2VzdHVyZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgY2xlYXJQcmV2aWV3SW1hZ2UoKTtcclxuICAgIH07XHJcbiAgfSwgW2NsZWFyUHJldmlld0ltYWdlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBwcmV2aWV3UmVxdWVzdEtleVJlZi5jdXJyZW50ID0gYCR7c2FmZVRleHQoZmlsZUlkKX1fXyR7c2FmZVRleHQoc291cmNlVXJsKX1gO1xyXG4gICAgc2V0UHJldmlld09wZW4oZmFsc2UpO1xyXG4gICAgc2V0UHJldmlld0J1c3koZmFsc2UpO1xyXG4gICAgc2V0UHJldmlld0Vycm9yKFwiXCIpO1xyXG4gICAgcmVzZXRQcmV2aWV3R2VzdHVyZSgpO1xyXG4gICAgY2xlYXJQcmV2aWV3SW1hZ2UoKTtcclxuXHJcbiAgICBpZiAoZW5hYmxlZCAmJiBzYWZlVGV4dChmaWxlSWQpICYmIHNhZmVUZXh0KHNvdXJjZVVybCkpIHtcclxuICAgICAgdm9pZCBsb2FkUHJldmlld0ltYWdlKCk7XHJcbiAgICB9XHJcbiAgfSwgW2NsZWFyUHJldmlld0ltYWdlLCBlbmFibGVkLCBmaWxlSWQsIGxvYWRQcmV2aWV3SW1hZ2UsIHJlc2V0UHJldmlld0dlc3R1cmUsIHNvdXJjZVVybF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFwcmV2aWV3T3BlbikgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG9uS2V5RG93biA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgICAgY2xvc2VQcmV2aWV3KCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5RG93bik7XHJcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5RG93bik7XHJcbiAgfSwgW3ByZXZpZXdPcGVuLCBjbG9zZVByZXZpZXddKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghcHJldmlld09wZW4pIHJldHVybjtcclxuICAgIGNvbnN0IHN1cmZhY2UgPSBwcmV2aWV3U3VyZmFjZVJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFzdXJmYWNlKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcHJldmVudEdlc3R1cmVEZWZhdWx0ID0gKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBwcmV2ZW50VG91Y2hWaWV3cG9ydFpvb20gPSAoZXZlbnQ6IFRvdWNoRXZlbnQpID0+IHtcclxuICAgICAgaWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlTmF0aXZlV2hlZWxab29tID0gKGV2ZW50OiBXaGVlbEV2ZW50KSA9PiB7XHJcbiAgICAgIGlmICghcHJldmlld0ltYWdlVXJsUmVmLmN1cnJlbnQgfHwgcHJldmlld0J1c3kpIHJldHVybjtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IGV2ZW50LmRlbHRhWSA8IDAgPyAxIDogLTE7XHJcbiAgICAgIGNvbnN0IG5leHRTY2FsZSA9IGNsYW1wUHJldmlld1NjYWxlKHByZXZpZXdTY2FsZVJlZi5jdXJyZW50ICsgZGlyZWN0aW9uICogUFJFVklFV19TQ0FMRV9TVEVQKTtcclxuICAgICAgYXBwbHlQcmV2aWV3VHJhbnNmb3JtKG5leHRTY2FsZSwgcHJldmlld1RyYW5zbGF0ZVJlZi5jdXJyZW50KTtcclxuICAgIH07XHJcblxyXG4gICAgc3VyZmFjZS5hZGRFdmVudExpc3RlbmVyKFwiZ2VzdHVyZXN0YXJ0XCIsIHByZXZlbnRHZXN0dXJlRGVmYXVsdCwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcclxuICAgIHN1cmZhY2UuYWRkRXZlbnRMaXN0ZW5lcihcImdlc3R1cmVjaGFuZ2VcIiwgcHJldmVudEdlc3R1cmVEZWZhdWx0LCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xyXG4gICAgc3VyZmFjZS5hZGRFdmVudExpc3RlbmVyKFwiZ2VzdHVyZWVuZFwiLCBwcmV2ZW50R2VzdHVyZURlZmF1bHQsIHsgcGFzc2l2ZTogZmFsc2UgfSk7XHJcbiAgICBzdXJmYWNlLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgcHJldmVudFRvdWNoVmlld3BvcnRab29tLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xyXG4gICAgc3VyZmFjZS5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgaGFuZGxlTmF0aXZlV2hlZWxab29tLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHN1cmZhY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImdlc3R1cmVzdGFydFwiLCBwcmV2ZW50R2VzdHVyZURlZmF1bHQpO1xyXG4gICAgICBzdXJmYWNlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJnZXN0dXJlY2hhbmdlXCIsIHByZXZlbnRHZXN0dXJlRGVmYXVsdCk7XHJcbiAgICAgIHN1cmZhY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImdlc3R1cmVlbmRcIiwgcHJldmVudEdlc3R1cmVEZWZhdWx0KTtcclxuICAgICAgc3VyZmFjZS5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHByZXZlbnRUb3VjaFZpZXdwb3J0Wm9vbSk7XHJcbiAgICAgIHN1cmZhY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsIGhhbmRsZU5hdGl2ZVdoZWVsWm9vbSk7XHJcbiAgICB9O1xyXG4gIH0sIFthcHBseVByZXZpZXdUcmFuc2Zvcm0sIHByZXZpZXdCdXN5LCBwcmV2aWV3T3Blbl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVQcmV2aWV3UG9pbnRlckRvd24gPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xyXG4gICAgICBpZiAoIXByZXZpZXdJbWFnZVVybCB8fCBwcmV2aWV3QnVzeSkgcmV0dXJuO1xyXG4gICAgICBjb25zdCBwb2ludDogVGlja2V0UHJldmlld1BvaW50ID0geyB4OiBldmVudC5jbGllbnRYLCB5OiBldmVudC5jbGllbnRZIH07XHJcbiAgICAgIHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LnNldChldmVudC5wb2ludGVySWQsIHBvaW50KTtcclxuICAgICAgaWYgKHR5cGVvZiBldmVudC5jdXJyZW50VGFyZ2V0LnNldFBvaW50ZXJDYXB0dXJlID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5zZXRQb2ludGVyQ2FwdHVyZShldmVudC5wb2ludGVySWQpO1xyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgLy8gSWdub3JlIGNhcHR1cmUgZmFpbHVyZXMgb24gYnJvd3NlcnMgdGhhdCBkbyBub3QgZnVsbHkgc3VwcG9ydCBwb2ludGVyIGNhcHR1cmUuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuc2l6ZSA9PT0gMSkge1xyXG4gICAgICAgIHByZXZpZXdQYW5Qb2ludGVyUmVmLmN1cnJlbnQgPSBldmVudC5wb2ludGVySWQ7XHJcbiAgICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gcG9pbnQ7XHJcbiAgICAgICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgcmVidWlsZFBpbmNoU25hcHNob3QoKTtcclxuICAgIH0sXHJcbiAgICBbcHJldmlld0J1c3ksIHByZXZpZXdJbWFnZVVybCwgcmVidWlsZFBpbmNoU25hcHNob3RdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcclxuICAgICAgaWYgKCFwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5oYXMoZXZlbnQucG9pbnRlcklkKSkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3QgcG9pbnQ6IFRpY2tldFByZXZpZXdQb2ludCA9IHsgeDogZXZlbnQuY2xpZW50WCwgeTogZXZlbnQuY2xpZW50WSB9O1xyXG4gICAgICBwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5zZXQoZXZlbnQucG9pbnRlcklkLCBwb2ludCk7XHJcblxyXG4gICAgICBjb25zdCBwb2ludGVyRW50cmllcyA9IEFycmF5LmZyb20ocHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuZW50cmllcygpKTtcclxuICAgICAgY29uc3QgcG9pbnRlclBvaW50cyA9IHBvaW50ZXJFbnRyaWVzLm1hcCgoZW50cnkpID0+IGVudHJ5WzFdKTtcclxuXHJcbiAgICAgIGlmIChwb2ludGVyUG9pbnRzLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgaWYgKCFwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgICByZWJ1aWxkUGluY2hTbmFwc2hvdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc25hcHNob3QgPSBwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50O1xyXG4gICAgICAgIGlmICghc25hcHNob3QpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgW2xlZnQsIHJpZ2h0XSA9IHBvaW50ZXJQb2ludHM7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLm1heCgxLCBnZXRQcmV2aWV3UG9pbnREaXN0YW5jZShsZWZ0LCByaWdodCkpO1xyXG4gICAgICAgIGNvbnN0IHJhdGlvID0gZGlzdGFuY2UgLyBNYXRoLm1heCgxLCBzbmFwc2hvdC5kaXN0YW5jZSk7XHJcbiAgICAgICAgY29uc3QgbmV4dFNjYWxlID0gY2xhbXBQcmV2aWV3U2NhbGUoc25hcHNob3Quc2NhbGUgKiByYXRpbyk7XHJcbiAgICAgICAgY29uc3QgY2VudGVyID0gZ2V0UHJldmlld1BvaW50Q2VudGVyKGxlZnQsIHJpZ2h0KTtcclxuICAgICAgICBjb25zdCBuZXh0VHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQgPSB7XHJcbiAgICAgICAgICB4OiBzbmFwc2hvdC50cmFuc2xhdGUueCArIChjZW50ZXIueCAtIHNuYXBzaG90LmNlbnRlci54KSxcclxuICAgICAgICAgIHk6IHNuYXBzaG90LnRyYW5zbGF0ZS55ICsgKGNlbnRlci55IC0gc25hcHNob3QuY2VudGVyLnkpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgYXBwbHlQcmV2aWV3VHJhbnNmb3JtKG5leHRTY2FsZSwgbmV4dFRyYW5zbGF0ZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocG9pbnRlclBvaW50cy5sZW5ndGggIT09IDEgfHwgcHJldmlld1NjYWxlUmVmLmN1cnJlbnQgPD0gMSB8fCBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ICE9PSBldmVudC5wb2ludGVySWQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGxhc3RQb2ludCA9IHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudDtcclxuICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gcG9pbnQ7XHJcbiAgICAgIGlmICghbGFzdFBvaW50KSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBuZXh0VHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQgPSB7XHJcbiAgICAgICAgeDogcHJldmlld1RyYW5zbGF0ZVJlZi5jdXJyZW50LnggKyAocG9pbnQueCAtIGxhc3RQb2ludC54KSxcclxuICAgICAgICB5OiBwcmV2aWV3VHJhbnNsYXRlUmVmLmN1cnJlbnQueSArIChwb2ludC55IC0gbGFzdFBvaW50LnkpLFxyXG4gICAgICB9O1xyXG4gICAgICBhcHBseVByZXZpZXdUcmFuc2Zvcm0ocHJldmlld1NjYWxlUmVmLmN1cnJlbnQsIG5leHRUcmFuc2xhdGUpO1xyXG4gICAgfSxcclxuICAgIFthcHBseVByZXZpZXdUcmFuc2Zvcm0sIHJlYnVpbGRQaW5jaFNuYXBzaG90XVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVByZXZpZXdQb2ludGVyRW5kID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcclxuICAgICAgaWYgKCFwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5oYXMoZXZlbnQucG9pbnRlcklkKSkgcmV0dXJuO1xyXG4gICAgICBwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5kZWxldGUoZXZlbnQucG9pbnRlcklkKTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHR5cGVvZiBldmVudC5jdXJyZW50VGFyZ2V0Lmhhc1BvaW50ZXJDYXB0dXJlID09PSBcImZ1bmN0aW9uXCIgJiZcclxuICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0Lmhhc1BvaW50ZXJDYXB0dXJlKGV2ZW50LnBvaW50ZXJJZClcclxuICAgICAgKSB7XHJcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5yZWxlYXNlUG9pbnRlckNhcHR1cmUoZXZlbnQucG9pbnRlcklkKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcG9pbnRlckVudHJpZXMgPSBBcnJheS5mcm9tKHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LmVudHJpZXMoKSk7XHJcbiAgICAgIGlmIChwb2ludGVyRW50cmllcy5sZW5ndGggPj0gMikge1xyXG4gICAgICAgIHByZXZpZXdQYW5Qb2ludGVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgcmVidWlsZFBpbmNoU25hcHNob3QoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwb2ludGVyRW50cmllcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICBjb25zdCBbcG9pbnRlcklkLCBwb2ludGVyUG9pbnRdID0gcG9pbnRlckVudHJpZXNbMF07XHJcbiAgICAgICAgcHJldmlld1BhblBvaW50ZXJSZWYuY3VycmVudCA9IHBvaW50ZXJJZDtcclxuICAgICAgICBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQgPSBwb2ludGVyUG9pbnQ7XHJcbiAgICAgICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIGlmIChwcmV2aWV3U2NhbGVSZWYuY3VycmVudCA8PSAxKSB7XHJcbiAgICAgICAgYXBwbHlQcmV2aWV3VHJhbnNmb3JtKDEsIHsgeDogMCwgeTogMCB9KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFthcHBseVByZXZpZXdUcmFuc2Zvcm0sIHJlYnVpbGRQaW5jaFNuYXBzaG90XVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG9wZW5QcmV2aWV3ID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgY3VycmVudEZpbGVJZCA9IHNhZmVUZXh0KGZpbGVJZCk7XHJcbiAgICBjb25zdCBjdXJyZW50VXJsID0gc2FmZVRleHQoc291cmNlVXJsKTtcclxuICAgIGlmICghZW5hYmxlZCB8fCAhY3VycmVudEZpbGVJZCB8fCAhY3VycmVudFVybCkgcmV0dXJuO1xyXG5cclxuICAgIHJlc2V0UHJldmlld0dlc3R1cmUoKTtcclxuICAgIHNldFByZXZpZXdPcGVuKHRydWUpO1xyXG4gICAgc2V0UHJldmlld0Vycm9yKFwiXCIpO1xyXG5cclxuICAgIGF3YWl0IGxvYWRQcmV2aWV3SW1hZ2UoKTtcclxuICB9LCBbZW5hYmxlZCwgZmlsZUlkLCBsb2FkUHJldmlld0ltYWdlLCByZXNldFByZXZpZXdHZXN0dXJlLCBzb3VyY2VVcmxdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHByZXZpZXdPcGVuLFxyXG4gICAgcHJldmlld0J1c3ksXHJcbiAgICBwcmV2aWV3RXJyb3IsXHJcbiAgICBwcmV2aWV3SW1hZ2VVcmwsXHJcbiAgICBwcmV2aWV3U2NhbGUsXHJcbiAgICBwcmV2aWV3VHJhbnNsYXRlLFxyXG4gICAgcHJldmlld1N1cmZhY2VSZWYsXHJcbiAgICBvcGVuUHJldmlldyxcclxuICAgIGNsb3NlUHJldmlldyxcclxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRG93bixcclxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyTW92ZSxcclxuICAgIGhhbmRsZVByZXZpZXdQb2ludGVyRW5kLFxyXG4gIH07XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsSUFBTSxtQkFBbUIsQ0FBQyxVQUFrQztBQUMxRCxRQUFNLFNBQVMsT0FBTyxLQUFLO0FBQzNCLFNBQU8sT0FBTyxTQUFTLE1BQU0sS0FBSyxTQUFTLElBQUksU0FBUztBQUMxRDtBQUVPLElBQU0sc0NBQXNDLENBQUMsVUFBc0Q7QUFDeEcsU0FBTyx5QkFBeUIsT0FBTztBQUFBLElBQ3JDLHVCQUF1QjtBQUFBLElBQ3ZCLHVCQUF1QjtBQUFBLElBQ3ZCLGFBQWE7QUFBQSxJQUNiLFVBQVU7QUFBQSxFQUNaLENBQUM7QUFDSDtBQUVPLElBQU0sb0NBQW9DLENBQUMsVUFBc0Q7QUFDdEcsU0FBTyx5QkFBeUIsT0FBTztBQUFBLElBQ3JDLHVCQUF1QjtBQUFBLElBQ3ZCLHVCQUF1QjtBQUFBLElBQ3ZCLGFBQWE7QUFBQSxJQUNiLFVBQVU7QUFBQSxFQUNaLENBQUM7QUFDSDtBQUdPLElBQU0sbUNBQW1DLE9BQU87QUFBQSxF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QUMsVUFBOEM7QUFDN0MsVUFBSSxDQUFDLG1CQUFtQixRQUFRLElBQUksTUFBTSxTQUFTLEVBQUc7QUFDdEQseUJBQW1CLFFBQVEsT0FBTyxNQUFNLFNBQVM7QUFDakQsVUFDRSxPQUFPLE1BQU0sY0FBYyxzQkFBc0IsY0FDakQsTUFBTSxjQUFjLGtCQUFrQixNQUFNLFNBQVMsR0FDckQ7QUFDQSxjQUFNLGNBQWMsc0JBQXNCLE1BQU0sU0FBUztBQUFBLE1BQzNEO0FBRUEsWUFBTSxpQkFBaUIsTUFBTSxLQUFLLG1CQUFtQixRQUFRLFFBQVEsQ0FBQztBQUN0RSxVQUFJLGVBQWUsVUFBVSxHQUFHO0FBQzlCLDZCQUFxQixVQUFVO0FBQy9CLCtCQUF1QixVQUFVO0FBQ2pDLDZCQUFxQjtBQUNyQjtBQUFBLE1BQ0Y7QUFFQSxVQUFJLGVBQWUsV0FBVyxHQUFHO0FBQy9CLGNBQU0sQ0FBQyxXQUFXLFlBQVksSUFBSSxlQUFlLENBQUM7QUFDbEQsNkJBQXFCLFVBQVU7QUFDL0IsK0JBQXVCLFVBQVU7QUFDakMsZ0NBQXdCLFVBQVU7QUFDbEM7QUFBQSxNQUNGO0FBRUEsMkJBQXFCLFVBQVU7QUFDL0IsNkJBQXVCLFVBQVU7QUFDakMsOEJBQXdCLFVBQVU7QUFDbEMsVUFBSSxnQkFBZ0IsV0FBVyxHQUFHO0FBQ2hDLDhCQUFzQixHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQUEsTUFDekM7QUFBQSxJQUNGO0FBQUEsSUFDQSxDQUFDLHVCQUF1QixvQkFBb0I7QUFBQSxFQUM5QztBQUVBLFFBQU0sa0JBQWMsMkJBQVksWUFBWTtBQUMxQyxVQUFNLGdCQUFnQixTQUFTLE1BQU07QUFDckMsVUFBTSxhQUFhLFNBQVMsU0FBUztBQUNyQyxRQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLFdBQVk7QUFFL0Msd0JBQW9CO0FBQ3BCLG1CQUFlLElBQUk7QUFDbkIsb0JBQWdCLEVBQUU7QUFFbEIsVUFBTSxpQkFBaUI7QUFBQSxFQUN6QixHQUFHLENBQUMsU0FBUyxRQUFRLGtCQUFrQixxQkFBcUIsU0FBUyxDQUFDO0FBRXRFLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7IiwKICAibmFtZXMiOiBbImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJuZXh0VHJhbnNsYXRlIl0KfQo=
