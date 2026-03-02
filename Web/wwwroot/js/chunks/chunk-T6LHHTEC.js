import {
  getExpenseSheetCurrencies,
  getExpenseSheetDefaultCurrencyCode,
  normalizeCardTitleText,
  safeText
} from "./chunk-BDACNERN.js";
import {
  SelectCombobox_default
} from "./chunk-DY5H5SRS.js";
import {
  ApiFetchError,
  indT
} from "./chunk-TAYDLPRE.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/gastos/constants/expenseStatusCatalog.ts
var DEFAULT_EXPENSE_STATUS_FILTER = 5;
var EXPENSE_STATUS_CODES = [5, 0, 1, 2, 3, 4];
var EXPENSE_SHEET_STATUS_CODES = [0, 1, 2, 3, 4];
var STATUS_UI_BY_CODE = {
  0: {
    labelKey: "ExpenseSheets_Filter_Status_Draft",
    fallback: "Borrador",
    colorHex: "#94a3b8",
    badgeClassName: "expense-sheet-card__status expense-sheet-card__status--draft"
  },
  1: {
    labelKey: "ExpenseSheets_Filter_Status_InReview",
    fallback: "Aprobacion solicitada",
    colorHex: "#f59e0b",
    badgeClassName: "expense-sheet-card__status expense-sheet-card__status--review"
  },
  2: {
    labelKey: "ExpenseSheets_Filter_Status_Approved",
    fallback: "Aprobado",
    colorHex: "#22c55e",
    badgeClassName: "expense-sheet-card__status expense-sheet-card__status--approved"
  },
  3: {
    labelKey: "ExpenseSheets_Filter_Status_Rejected",
    fallback: "Rechazado",
    colorHex: "#ef4444",
    badgeClassName: "expense-sheet-card__status expense-sheet-card__status--rejected"
  },
  4: {
    labelKey: "ExpenseSheets_Filter_Status_Paid",
    fallback: "Pagado",
    colorHex: "#00296b",
    badgeClassName: "expense-sheet-card__status expense-sheet-card__status--paid"
  },
  5: {
    labelKey: "ExpenseSheets_Filter_Status_All",
    fallback: "Todos",
    colorHex: "#64748b",
    badgeClassName: "expense-sheet-card__status expense-sheet-card__status--all"
  }
};
var normalizeExpenseStatusFilterCode = (value, fallback = DEFAULT_EXPENSE_STATUS_FILTER) => {
  const parsed = Number(value);
  if (parsed >= 0 && parsed <= 5) {
    return parsed;
  }
  return fallback;
};
var getExpenseStatusFilterOptions = () => {
  return EXPENSE_STATUS_CODES.map((code) => {
    const meta = STATUS_UI_BY_CODE[code];
    return {
      value: String(code),
      text: indT(meta.labelKey, meta.fallback)
    };
  });
};
var getExpenseSheetStatusOptions = () => {
  return EXPENSE_SHEET_STATUS_CODES.map((code) => {
    const meta = STATUS_UI_BY_CODE[code];
    return {
      value: String(code),
      text: indT(meta.labelKey, meta.fallback)
    };
  });
};
var getExpenseStatusLabel = (value) => {
  const normalized = normalizeExpenseStatusFilterCode(value);
  const meta = STATUS_UI_BY_CODE[normalized];
  return indT(meta.labelKey, meta.fallback);
};
var getExpenseStatusBadgeClassName = (value) => {
  const normalized = normalizeExpenseStatusFilterCode(value);
  return STATUS_UI_BY_CODE[normalized].badgeClassName;
};

// Web/wwwroot/react/src/pages/gastos/components/ExpenseTimelineCard.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ExpenseTimelineCard = ({
  dateParts,
  title,
  amountText,
  onOpen,
  titleClassName = "timeline-name",
  amountClassName = "expense-sheet-card__amount",
  statusClassName,
  statusLabel,
  subtitle = "",
  subtitleClassName = "expense-sheet-card__subtitle",
  statusIcon,
  statusIconClassName = "expense-sheet-card__status-icon"
}) => {
  const safeTitle = normalizeCardTitleText(title, "-");
  const safeAmount = amountText || "-";
  const safeSubtitle = safeText(subtitle);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: "timeline-card timeline-card--clickable",
      role: "button",
      tabIndex: 0,
      onClick: onOpen,
      onKeyDown: (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "timeline-date-panel flex flex-col items-center justify-center gap-1 px-3 py-3 bg-slate-50 border-r border-slate-200 text-slate-600", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-semibold tracking-[0.2em] text-slate-500", children: dateParts.year }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-slate-500", children: dateParts.month }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-2xl font-semibold text-primary", children: dateParts.day })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "timeline-card__content flex-1 py-3 px-4", children: [
          statusClassName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: statusClassName, title: statusLabel, "aria-label": statusLabel }) : null,
          statusIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: statusIconClassName, title: statusLabel, children: statusIcon }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: titleClassName, "data-fulltext": safeTitle, children: safeTitle }),
          safeSubtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: subtitleClassName, "data-fulltext": safeSubtitle, children: safeSubtitle }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: amountClassName, "data-fulltext": safeAmount, children: safeAmount })
        ] })
      ]
    }
  );
};
var ExpenseTimelineCard_default = ExpenseTimelineCard;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseCurrencyFlagIcon.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var normalizeCurrencyCode = (value) => {
  return String(value || "").trim().toUpperCase();
};
var ExpenseCurrencyFlagIcon = ({ currencyCode, className = "", sizeClassName = "h-4 w-4" }) => {
  const normalizedCode = normalizeCurrencyCode(currencyCode);
  const [loadFailed, setLoadFailed] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    setLoadFailed(false);
  }, [normalizedCode]);
  if (!normalizedCode || loadFailed) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "span",
      {
        "aria-hidden": "true",
        className: `inline-flex items-center justify-center rounded-lg text-[10px] font-semibold leading-none text-slate-500 ${sizeClassName} ${className}`.trim(),
        children: "$"
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "img",
    {
      src: `/assets/flags/${encodeURIComponent(normalizedCode)}.svg`,
      alt: "",
      "aria-hidden": "true",
      loading: "lazy",
      className: `${sizeClassName} rounded-lg object-contain ${className}`.trim(),
      onError: () => setLoadFailed(true)
    }
  );
};
var ExpenseCurrencyFlagIcon_default = ExpenseCurrencyFlagIcon;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseCurrencyFilterSelect.tsx
var import_react2 = __toESM(require_react());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var normalizeCurrencyCode2 = (value) => {
  return String(value || "").trim().toUpperCase();
};
var CURRENCY_FLAG_SIZE_CLASS = "h-6 w-6";
var CURRENCY_DROPDOWN_PANEL_CLASS = "visitas-typography ring-[#A9B8CC]/70";
var CURRENCY_DROPDOWN_PANEL_STYLE = {
  backgroundColor: "#DCE3ED",
  border: "1px solid #A9B8CC",
  boxShadow: "0 10px 24px rgba(15, 41, 69, 0.14)"
};
var CURRENCY_OPTION_DEFAULT_CLASS = "text-[#0F2945]";
var CURRENCY_OPTION_ACTIVE_CLASS = "bg-[#C6D2E3] text-[#0F2945]";
var CURRENCY_OPTION_SELECTED_CLASS = "bg-primary text-white";
var readPreferredLocale = () => {
  if (typeof document !== "undefined") {
    const fromDocument = String(document.documentElement?.lang || "").trim();
    if (fromDocument) return fromDocument;
  }
  if (typeof navigator !== "undefined") {
    const fromNavigator = String(navigator.language || "").trim();
    if (fromNavigator) return fromNavigator;
  }
  return "en";
};
var resolveCurrencyDisplayName = (currencyCode, locale) => {
  const normalizedCode = normalizeCurrencyCode2(currencyCode);
  if (!normalizedCode) return "";
  const intlWithDisplayNames = Intl;
  if (typeof intlWithDisplayNames.DisplayNames !== "function") return "";
  try {
    const displayNames = new intlWithDisplayNames.DisplayNames([locale, "en"], { type: "currency" });
    const localizedName = String(displayNames.of(normalizedCode) || "").trim();
    if (!localizedName) return "";
    const normalizedName = localizedName.toUpperCase();
    return normalizedName === normalizedCode ? "" : localizedName;
  } catch {
    return "";
  }
};
var mapCurrencyOptions = (items, locale) => {
  const source = Array.isArray(items) ? items : [];
  const seenCodes = /* @__PURE__ */ new Set();
  return source.map((entry) => {
    const currencyCodeIso = normalizeCurrencyCode2(entry?.CurrencyCodeISO);
    const effectiveIsoCode = currencyCodeIso || normalizeCurrencyCode2(entry?.CurrencyCode);
    if (!effectiveIsoCode) return null;
    if (seenCodes.has(effectiveIsoCode)) return null;
    seenCodes.add(effectiveIsoCode);
    const displayName = resolveCurrencyDisplayName(effectiveIsoCode, locale);
    const optionLabel = displayName ? `${effectiveIsoCode} ${displayName}` : effectiveIsoCode;
    return {
      value: effectiveIsoCode,
      text: optionLabel,
      icon: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ExpenseCurrencyFlagIcon_default, { currencyCode: effectiveIsoCode, sizeClassName: CURRENCY_FLAG_SIZE_CLASS })
    };
  }).filter((entry) => entry !== null);
};
var ExpenseCurrencyFilterSelect = ({
  label,
  placeholder,
  value,
  onChange,
  readOnly = false,
  disabled = false,
  showLabel = true,
  idBase = "expense-currency",
  preferDefaultCurrencyFromContext = false
}) => {
  const locale = (0, import_react2.useMemo)(() => readPreferredLocale(), []);
  const [options, setOptions] = (0, import_react2.useState)([]);
  const [isLoadingOptions, setIsLoadingOptions] = (0, import_react2.useState)(false);
  const [loadErrorMessage, setLoadErrorMessage] = (0, import_react2.useState)("");
  const [emptyMessage, setEmptyMessage] = (0, import_react2.useState)("");
  const onChangeRef = (0, import_react2.useRef)(onChange);
  const valueRef = (0, import_react2.useRef)(normalizeCurrencyCode2(value));
  const initialDefaultAppliedRef = (0, import_react2.useRef)(false);
  (0, import_react2.useEffect)(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  (0, import_react2.useEffect)(() => {
    valueRef.current = normalizeCurrencyCode2(value);
  }, [value]);
  (0, import_react2.useEffect)(() => {
    let isCancelled = false;
    const controller = new AbortController();
    const loadCurrencies = async () => {
      setIsLoadingOptions(true);
      setLoadErrorMessage("");
      setEmptyMessage("");
      try {
        const response = await getExpenseSheetCurrencies({
          suppressPermissionModal: true,
          signal: controller.signal
        });
        if (isCancelled) return;
        if (!response.Success) {
          setOptions([]);
          setLoadErrorMessage(response.Message || indT("ExpenseSheets_LoadError", "Could not load expense sheets."));
          return;
        }
        const mappedOptions = mapCurrencyOptions(response.Items, locale);
        setOptions(mappedOptions);
        if (!mappedOptions.length) {
          setEmptyMessage(response.Message || indT("Common_NoData", "No data"));
          return;
        }
        const currentValue = valueRef.current;
        const hasCurrentInList = mappedOptions.some((option) => normalizeCurrencyCode2(option.value) === currentValue);
        if (currentValue && hasCurrentInList) {
          return;
        }
        if (!currentValue && preferDefaultCurrencyFromContext && !initialDefaultAppliedRef.current) {
          const defaultCurrencyCode = normalizeCurrencyCode2(
            await getExpenseSheetDefaultCurrencyCode({
              suppressPermissionModal: true,
              signal: controller.signal
            })
          );
          if (isCancelled) return;
          if (defaultCurrencyCode && mappedOptions.some((option) => normalizeCurrencyCode2(option.value) === defaultCurrencyCode)) {
            initialDefaultAppliedRef.current = true;
            onChangeRef.current(defaultCurrencyCode);
          }
        }
      } catch (error) {
        if (isCancelled) return;
        if (error instanceof DOMException && error.name === "AbortError") return;
        const fallbackError = indT("ExpenseSheets_LoadError", "Could not load expense sheets.");
        const message = error instanceof ApiFetchError ? error.message || fallbackError : fallbackError;
        setOptions([]);
        setLoadErrorMessage(message);
      } finally {
        if (!isCancelled) {
          setIsLoadingOptions(false);
        }
      }
    };
    void loadCurrencies();
    return () => {
      isCancelled = true;
      controller.abort();
    };
  }, [locale, preferDefaultCurrencyFromContext]);
  const normalizedValue = (0, import_react2.useMemo)(() => normalizeCurrencyCode2(value), [value]);
  const disableBecauseNoData = !isLoadingOptions && !loadErrorMessage && options.length === 0;
  const effectiveDisabled = disabled || disableBecauseNoData;
  const loadingMessage = indT("Common_Loading", "Loading");
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      SelectCombobox_default,
      {
        label,
        placeholder,
        options,
        value: normalizedValue,
        onChange: (nextValue) => onChange(normalizeCurrencyCode2(nextValue)),
        readOnly,
        disabled: effectiveDisabled,
        allowTextInput: true,
        showSearchButton: false,
        showLabel,
        usePortal: false,
        selectedTextMode: "value",
        dropdownMaxHeightClass: "max-h-96",
        selectedIconClassName: CURRENCY_FLAG_SIZE_CLASS,
        selectedInputPaddingClassName: "pl-12",
        clearOnEmptyInput: true,
        optionIconClassName: CURRENCY_FLAG_SIZE_CLASS,
        allowOptionHorizontalScroll: true,
        lockDropdownWidthOnFirstOpen: true,
        disableDefaultOptionPadding: true,
        optionLeftPaddingClassName: "pl-1",
        optionDefaultClassName: CURRENCY_OPTION_DEFAULT_CLASS,
        optionActiveClassName: CURRENCY_OPTION_ACTIVE_CLASS,
        optionSelectedClassName: CURRENCY_OPTION_SELECTED_CLASS,
        idBase,
        portalClassName: "visitas-typography",
        panelClassName: CURRENCY_DROPDOWN_PANEL_CLASS,
        panelStyle: CURRENCY_DROPDOWN_PANEL_STYLE
      }
    ),
    isLoadingOptions ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-xs text-slate-500", children: loadingMessage }) : null,
    !isLoadingOptions && loadErrorMessage ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-xs text-danger", children: loadErrorMessage }) : null,
    !isLoadingOptions && !loadErrorMessage && emptyMessage ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-xs text-slate-500", children: emptyMessage }) : null
  ] });
};
var ExpenseCurrencyFilterSelect_default = ExpenseCurrencyFilterSelect;

export {
  DEFAULT_EXPENSE_STATUS_FILTER,
  normalizeExpenseStatusFilterCode,
  getExpenseStatusFilterOptions,
  getExpenseSheetStatusOptions,
  getExpenseStatusLabel,
  getExpenseStatusBadgeClassName,
  ExpenseCurrencyFlagIcon_default,
  ExpenseCurrencyFilterSelect_default,
  ExpenseTimelineCard_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb25zdGFudHMvZXhwZW5zZVN0YXR1c0NhdGFsb2cudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlQ3VycmVuY3lGbGFnSWNvbi50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuXG50eXBlIEV4cGVuc2VTdGF0dXNVaU1ldGEgPSB7XG4gIGxhYmVsS2V5OiBzdHJpbmc7XG4gIGZhbGxiYWNrOiBzdHJpbmc7XG4gIGNvbG9ySGV4OiBzdHJpbmc7XG4gIGJhZGdlQ2xhc3NOYW1lOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVI6IEV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlID0gNTtcbmNvbnN0IEVYUEVOU0VfU1RBVFVTX0NPREVTOiBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZVtdID0gWzUsIDAsIDEsIDIsIDMsIDRdO1xuY29uc3QgRVhQRU5TRV9TSEVFVF9TVEFUVVNfQ09ERVM6IEV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlW10gPSBbMCwgMSwgMiwgMywgNF07XG5cbmNvbnN0IFNUQVRVU19VSV9CWV9DT0RFOiBSZWNvcmQ8RXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUsIEV4cGVuc2VTdGF0dXNVaU1ldGE+ID0ge1xuICAwOiB7XG4gICAgbGFiZWxLZXk6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU3RhdHVzX0RyYWZ0XCIsXG4gICAgZmFsbGJhY2s6IFwiQm9ycmFkb3JcIixcbiAgICBjb2xvckhleDogXCIjOTRhM2I4XCIsXG4gICAgYmFkZ2VDbGFzc05hbWU6IFwiZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMgZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMtLWRyYWZ0XCIsXG4gIH0sXG4gIDE6IHtcbiAgICBsYWJlbEtleTogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TdGF0dXNfSW5SZXZpZXdcIixcbiAgICBmYWxsYmFjazogXCJBcHJvYmFjaW9uIHNvbGljaXRhZGFcIixcbiAgICBjb2xvckhleDogXCIjZjU5ZTBiXCIsXG4gICAgYmFkZ2VDbGFzc05hbWU6IFwiZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMgZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMtLXJldmlld1wiLFxuICB9LFxuICAyOiB7XG4gICAgbGFiZWxLZXk6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU3RhdHVzX0FwcHJvdmVkXCIsXG4gICAgZmFsbGJhY2s6IFwiQXByb2JhZG9cIixcbiAgICBjb2xvckhleDogXCIjMjJjNTVlXCIsXG4gICAgYmFkZ2VDbGFzc05hbWU6IFwiZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMgZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMtLWFwcHJvdmVkXCIsXG4gIH0sXG4gIDM6IHtcbiAgICBsYWJlbEtleTogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TdGF0dXNfUmVqZWN0ZWRcIixcbiAgICBmYWxsYmFjazogXCJSZWNoYXphZG9cIixcbiAgICBjb2xvckhleDogXCIjZWY0NDQ0XCIsXG4gICAgYmFkZ2VDbGFzc05hbWU6IFwiZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMgZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMtLXJlamVjdGVkXCIsXG4gIH0sXG4gIDQ6IHtcbiAgICBsYWJlbEtleTogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TdGF0dXNfUGFpZFwiLFxuICAgIGZhbGxiYWNrOiBcIlBhZ2Fkb1wiLFxuICAgIGNvbG9ySGV4OiBcIiMwMDI5NmJcIixcbiAgICBiYWRnZUNsYXNzTmFtZTogXCJleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cyBleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cy0tcGFpZFwiLFxuICB9LFxuICA1OiB7XG4gICAgbGFiZWxLZXk6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU3RhdHVzX0FsbFwiLFxuICAgIGZhbGxiYWNrOiBcIlRvZG9zXCIsXG4gICAgY29sb3JIZXg6IFwiIzY0NzQ4YlwiLFxuICAgIGJhZGdlQ2xhc3NOYW1lOiBcImV4cGVuc2Utc2hlZXQtY2FyZF9fc3RhdHVzIGV4cGVuc2Utc2hlZXQtY2FyZF9fc3RhdHVzLS1hbGxcIixcbiAgfSxcbn07XG5cbi8vIE5vcm1hbGl6ZXMgYW55IHVua25vd24gc3RhdHVzIGZpbHRlciB2YWx1ZSB0byBhIHNhZmUgbGlzdCBmaWx0ZXIgY29kZS5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSA9IChcbiAgdmFsdWU6IHVua25vd24sXG4gIGZhbGxiYWNrOiBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSA9IERFRkFVTFRfRVhQRU5TRV9TVEFUVVNfRklMVEVSXG4pOiBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIGlmIChwYXJzZWQgPj0gMCAmJiBwYXJzZWQgPD0gNSkge1xuICAgIHJldHVybiBwYXJzZWQgYXMgRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGU7XG4gIH1cbiAgcmV0dXJuIGZhbGxiYWNrO1xufTtcblxuLy8gQnVpbGRzIGZpeGVkIHN0YXR1cyBmaWx0ZXIgb3B0aW9ucyBmb3IgdGhlIGV4cGVuc2UgbGlzdCBmaWx0ZXIgcGFuZWwuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVN0YXR1c0ZpbHRlck9wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcbiAgcmV0dXJuIEVYUEVOU0VfU1RBVFVTX0NPREVTXG4gICAgLm1hcCgoY29kZSkgPT4ge1xuICAgICAgY29uc3QgbWV0YSA9IFNUQVRVU19VSV9CWV9DT0RFW2NvZGVdO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IFN0cmluZyhjb2RlKSxcbiAgICAgICAgdGV4dDogaW5kVChtZXRhLmxhYmVsS2V5LCBtZXRhLmZhbGxiYWNrKSxcbiAgICAgIH07XG4gICAgfSk7XG59O1xuXG4vLyBCdWlsZHMgZml4ZWQgc3RhdHVzIG9wdGlvbnMgZm9yIGV4cGVuc2Ugc2hlZXQgc3RhdGUgdXBkYXRlcyAod2l0aG91dCBcImFsbFwiKS5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlU2hlZXRTdGF0dXNPcHRpb25zID0gKCk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XG4gIHJldHVybiBFWFBFTlNFX1NIRUVUX1NUQVRVU19DT0RFUy5tYXAoKGNvZGUpID0+IHtcbiAgICBjb25zdCBtZXRhID0gU1RBVFVTX1VJX0JZX0NPREVbY29kZV07XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiBTdHJpbmcoY29kZSksXG4gICAgICB0ZXh0OiBpbmRUKG1ldGEubGFiZWxLZXksIG1ldGEuZmFsbGJhY2spLFxuICAgIH07XG4gIH0pO1xufTtcblxuLy8gUmV0dXJucyB0aGUgbG9jYWxpemVkIHN0YXR1cyBsYWJlbCBmb3IgZmlsdGVyIHN1bW1hcmllcyBhbmQgYmFkZ2VzLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTdGF0dXNMYWJlbCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSh2YWx1ZSk7XG4gIGNvbnN0IG1ldGEgPSBTVEFUVVNfVUlfQllfQ09ERVtub3JtYWxpemVkXTtcbiAgcmV0dXJuIGluZFQobWV0YS5sYWJlbEtleSwgbWV0YS5mYWxsYmFjayk7XG59O1xuXG4vLyBSZXR1cm5zIHRoZSBjb2xvciB0b2tlbiBmb3IgVUkgZWxlbWVudHMgdGhhdCByZXByZXNlbnQgYSBzdGF0dXMgY29kZS5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlU3RhdHVzQ29sb3JIZXggPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUodmFsdWUpO1xuICByZXR1cm4gU1RBVFVTX1VJX0JZX0NPREVbbm9ybWFsaXplZF0uY29sb3JIZXg7XG59O1xuXG4vLyBSZXR1cm5zIHRoZSBkZWZhdWx0IGJhZGdlIGNsYXNzIG5hbWUgdXNlZCBieSB0aW1lbGluZSBjYXJkcy5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlU3RhdHVzQmFkZ2VDbGFzc05hbWUgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUodmFsdWUpO1xuICByZXR1cm4gU1RBVFVTX1VJX0JZX0NPREVbbm9ybWFsaXplZF0uYmFkZ2VDbGFzc05hbWU7XG59O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZURhdGVQYXJ0cyB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgbm9ybWFsaXplQ2FyZFRpdGxlVGV4dCwgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcblxudHlwZSBFeHBlbnNlVGltZWxpbmVDYXJkUHJvcHMgPSB7XG4gIGRhdGVQYXJ0czogRXhwZW5zZURhdGVQYXJ0cztcbiAgdGl0bGU6IHN0cmluZztcbiAgYW1vdW50VGV4dDogc3RyaW5nO1xuICBvbk9wZW46ICgpID0+IHZvaWQ7XG4gIHRpdGxlQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBhbW91bnRDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHN0YXR1c0NsYXNzTmFtZT86IHN0cmluZztcbiAgc3RhdHVzTGFiZWw/OiBzdHJpbmc7XG4gIHN1YnRpdGxlPzogc3RyaW5nO1xuICBzdWJ0aXRsZUNsYXNzTmFtZT86IHN0cmluZztcbiAgc3RhdHVzSWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcbiAgc3RhdHVzSWNvbkNsYXNzTmFtZT86IHN0cmluZztcbn07XG5cbi8vIFJldXNhYmxlIGNsaWNrYWJsZSB0aW1lbGluZSBjYXJkIGZvciBleHBlbnNlIHNoZWV0cyBhbmQgZXhwZW5zZSBsaW5lcy5cbmNvbnN0IEV4cGVuc2VUaW1lbGluZUNhcmQgPSAoe1xuICBkYXRlUGFydHMsXG4gIHRpdGxlLFxuICBhbW91bnRUZXh0LFxuICBvbk9wZW4sXG4gIHRpdGxlQ2xhc3NOYW1lID0gXCJ0aW1lbGluZS1uYW1lXCIsXG4gIGFtb3VudENsYXNzTmFtZSA9IFwiZXhwZW5zZS1zaGVldC1jYXJkX19hbW91bnRcIixcbiAgc3RhdHVzQ2xhc3NOYW1lLFxuICBzdGF0dXNMYWJlbCxcbiAgc3VidGl0bGUgPSBcIlwiLFxuICBzdWJ0aXRsZUNsYXNzTmFtZSA9IFwiZXhwZW5zZS1zaGVldC1jYXJkX19zdWJ0aXRsZVwiLFxuICBzdGF0dXNJY29uLFxuICBzdGF0dXNJY29uQ2xhc3NOYW1lID0gXCJleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cy1pY29uXCIsXG59OiBFeHBlbnNlVGltZWxpbmVDYXJkUHJvcHMpID0+IHtcbiAgY29uc3Qgc2FmZVRpdGxlID0gbm9ybWFsaXplQ2FyZFRpdGxlVGV4dCh0aXRsZSwgXCItXCIpO1xuICBjb25zdCBzYWZlQW1vdW50ID0gYW1vdW50VGV4dCB8fCBcIi1cIjtcbiAgY29uc3Qgc2FmZVN1YnRpdGxlID0gc2FmZVRleHQoc3VidGl0bGUpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPVwidGltZWxpbmUtY2FyZCB0aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIlxuICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICB0YWJJbmRleD17MH1cbiAgICAgIG9uQ2xpY2s9e29uT3Blbn1cbiAgICAgIG9uS2V5RG93bj17KGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIiB8fCBldmVudC5rZXkgPT09IFwiIFwiKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBvbk9wZW4oKTtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWRhdGUtcGFuZWwgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEgcHgtMyBweS0zIGJnLXNsYXRlLTUwIGJvcmRlci1yIGJvcmRlci1zbGF0ZS0yMDAgdGV4dC1zbGF0ZS02MDBcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdHJhY2tpbmctWzAuMmVtXSB0ZXh0LXNsYXRlLTUwMFwiPntkYXRlUGFydHMueWVhcn08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLVswLjJlbV0gdGV4dC1zbGF0ZS01MDBcIj57ZGF0ZVBhcnRzLm1vbnRofTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtc2VtaWJvbGQgdGV4dC1wcmltYXJ5XCI+e2RhdGVQYXJ0cy5kYXl9PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtY2FyZF9fY29udGVudCBmbGV4LTEgcHktMyBweC00XCI+XG4gICAgICAgIHtzdGF0dXNDbGFzc05hbWUgPyA8c3BhbiBjbGFzc05hbWU9e3N0YXR1c0NsYXNzTmFtZX0gdGl0bGU9e3N0YXR1c0xhYmVsfSBhcmlhLWxhYmVsPXtzdGF0dXNMYWJlbH0gLz4gOiBudWxsfVxuICAgICAgICB7c3RhdHVzSWNvbiA/IDxzcGFuIGNsYXNzTmFtZT17c3RhdHVzSWNvbkNsYXNzTmFtZX0gdGl0bGU9e3N0YXR1c0xhYmVsfT57c3RhdHVzSWNvbn08L3NwYW4+IDogbnVsbH1cbiAgICAgICAgPHAgY2xhc3NOYW1lPXt0aXRsZUNsYXNzTmFtZX0gZGF0YS1mdWxsdGV4dD17c2FmZVRpdGxlfT5cbiAgICAgICAgICB7c2FmZVRpdGxlfVxuICAgICAgICA8L3A+XG4gICAgICAgIHtzYWZlU3VidGl0bGUgPyAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPXtzdWJ0aXRsZUNsYXNzTmFtZX0gZGF0YS1mdWxsdGV4dD17c2FmZVN1YnRpdGxlfT5cbiAgICAgICAgICAgIHtzYWZlU3VidGl0bGV9XG4gICAgICAgICAgPC9wPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXthbW91bnRDbGFzc05hbWV9IGRhdGEtZnVsbHRleHQ9e3NhZmVBbW91bnR9PlxuICAgICAgICAgIHtzYWZlQW1vdW50fVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaW1lbGluZUNhcmQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBFeHBlbnNlQ3VycmVuY3lGbGFnSWNvblByb3BzID0ge1xuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBzaXplQ2xhc3NOYW1lPzogc3RyaW5nO1xufTtcblxuY29uc3Qgbm9ybWFsaXplQ3VycmVuY3lDb2RlID0gKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcbn07XG5cbi8vIFJlbmRlcnMgYSBjdXJyZW5jeSBmbGFnIGZyb20gbG9jYWwgYXNzZXRzIHdpdGggYSBzdGFibGUgZmFsbGJhY2sgaWNvbi5cbmNvbnN0IEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uID0gKHsgY3VycmVuY3lDb2RlLCBjbGFzc05hbWUgPSBcIlwiLCBzaXplQ2xhc3NOYW1lID0gXCJoLTQgdy00XCIgfTogRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb25Qcm9wcykgPT4ge1xuICBjb25zdCBub3JtYWxpemVkQ29kZSA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShjdXJyZW5jeUNvZGUpO1xuICBjb25zdCBbbG9hZEZhaWxlZCwgc2V0TG9hZEZhaWxlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRMb2FkRmFpbGVkKGZhbHNlKTtcbiAgfSwgW25vcm1hbGl6ZWRDb2RlXSk7XG5cbiAgaWYgKCFub3JtYWxpemVkQ29kZSB8fCBsb2FkRmFpbGVkKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuXG4gICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgIGNsYXNzTmFtZT17YGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLWxnIHRleHQtWzEwcHhdIGZvbnQtc2VtaWJvbGQgbGVhZGluZy1ub25lIHRleHQtc2xhdGUtNTAwICR7c2l6ZUNsYXNzTmFtZX0gJHtjbGFzc05hbWV9YC50cmltKCl9XG4gICAgICA+XG4gICAgICAgICRcbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8aW1nXG4gICAgICBzcmM9e2AvYXNzZXRzL2ZsYWdzLyR7ZW5jb2RlVVJJQ29tcG9uZW50KG5vcm1hbGl6ZWRDb2RlKX0uc3ZnYH1cbiAgICAgIGFsdD1cIlwiXG4gICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgbG9hZGluZz1cImxhenlcIlxuICAgICAgY2xhc3NOYW1lPXtgJHtzaXplQ2xhc3NOYW1lfSByb3VuZGVkLWxnIG9iamVjdC1jb250YWluICR7Y2xhc3NOYW1lfWAudHJpbSgpfVxuICAgICAgb25FcnJvcj17KCkgPT4gc2V0TG9hZEZhaWxlZCh0cnVlKX1cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb247XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0byB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGdldEV4cGVuc2VTaGVldEN1cnJlbmNpZXMsIGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24udHN4XCI7XG5cbnR5cGUgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG4gIGlkQmFzZT86IHN0cmluZztcbiAgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHQ/OiBib29sZWFuO1xufTtcblxuY29uc3Qgbm9ybWFsaXplQ3VycmVuY3lDb2RlID0gKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcbn07XG5cbmNvbnN0IENVUlJFTkNZX0ZMQUdfU0laRV9DTEFTUyA9IFwiaC02IHctNlwiO1xuY29uc3QgQ1VSUkVOQ1lfRFJPUERPV05fUEFORUxfQ0xBU1MgPSBcInZpc2l0YXMtdHlwb2dyYXBoeSByaW5nLVsjQTlCOENDXS83MFwiO1xuY29uc3QgQ1VSUkVOQ1lfRFJPUERPV05fUEFORUxfU1RZTEU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPSB7XG4gIGJhY2tncm91bmRDb2xvcjogXCIjRENFM0VEXCIsXG4gIGJvcmRlcjogXCIxcHggc29saWQgI0E5QjhDQ1wiLFxuICBib3hTaGFkb3c6IFwiMCAxMHB4IDI0cHggcmdiYSgxNSwgNDEsIDY5LCAwLjE0KVwiLFxufTtcbmNvbnN0IENVUlJFTkNZX09QVElPTl9ERUZBVUxUX0NMQVNTID0gXCJ0ZXh0LVsjMEYyOTQ1XVwiO1xuY29uc3QgQ1VSUkVOQ1lfT1BUSU9OX0FDVElWRV9DTEFTUyA9IFwiYmctWyNDNkQyRTNdIHRleHQtWyMwRjI5NDVdXCI7XG5jb25zdCBDVVJSRU5DWV9PUFRJT05fU0VMRUNURURfQ0xBU1MgPSBcImJnLXByaW1hcnkgdGV4dC13aGl0ZVwiO1xuXG5jb25zdCByZWFkUHJlZmVycmVkTG9jYWxlID0gKCk6IHN0cmluZyA9PiB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjb25zdCBmcm9tRG9jdW1lbnQgPSBTdHJpbmcoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBpZiAoZnJvbURvY3VtZW50KSByZXR1cm4gZnJvbURvY3VtZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjb25zdCBmcm9tTmF2aWdhdG9yID0gU3RyaW5nKG5hdmlnYXRvci5sYW5ndWFnZSB8fCBcIlwiKS50cmltKCk7XG4gICAgaWYgKGZyb21OYXZpZ2F0b3IpIHJldHVybiBmcm9tTmF2aWdhdG9yO1xuICB9XG5cbiAgcmV0dXJuIFwiZW5cIjtcbn07XG5cbi8vIFJlc29sdmVzIGEgbG9jYWxpemVkIGN1cnJlbmN5IGRpc3BsYXkgbmFtZSB3aGVuIEludGwuRGlzcGxheU5hbWVzIGlzIGF2YWlsYWJsZS5cbmNvbnN0IHJlc29sdmVDdXJyZW5jeURpc3BsYXlOYW1lID0gKGN1cnJlbmN5Q29kZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRDb2RlID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKGN1cnJlbmN5Q29kZSk7XG4gIGlmICghbm9ybWFsaXplZENvZGUpIHJldHVybiBcIlwiO1xuXG4gIGNvbnN0IGludGxXaXRoRGlzcGxheU5hbWVzID0gSW50bCBhcyB0eXBlb2YgSW50bCAmIHtcbiAgICBEaXNwbGF5TmFtZXM/OiBuZXcgKFxuICAgICAgbG9jYWxlcz86IHN0cmluZyB8IHN0cmluZ1tdLFxuICAgICAgb3B0aW9ucz86IHsgdHlwZTogXCJjdXJyZW5jeVwiIH1cbiAgICApID0+IHsgb2Y6ICh2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmcgfCB1bmRlZmluZWQgfTtcbiAgfTtcblxuICBpZiAodHlwZW9mIGludGxXaXRoRGlzcGxheU5hbWVzLkRpc3BsYXlOYW1lcyAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gXCJcIjtcblxuICB0cnkge1xuICAgIGNvbnN0IGRpc3BsYXlOYW1lcyA9IG5ldyBpbnRsV2l0aERpc3BsYXlOYW1lcy5EaXNwbGF5TmFtZXMoW2xvY2FsZSwgXCJlblwiXSwgeyB0eXBlOiBcImN1cnJlbmN5XCIgfSk7XG4gICAgY29uc3QgbG9jYWxpemVkTmFtZSA9IFN0cmluZyhkaXNwbGF5TmFtZXMub2Yobm9ybWFsaXplZENvZGUpIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBpZiAoIWxvY2FsaXplZE5hbWUpIHJldHVybiBcIlwiO1xuXG4gICAgY29uc3Qgbm9ybWFsaXplZE5hbWUgPSBsb2NhbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZWROYW1lID09PSBub3JtYWxpemVkQ29kZSA/IFwiXCIgOiBsb2NhbGl6ZWROYW1lO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxufTtcblxuY29uc3QgbWFwQ3VycmVuY3lPcHRpb25zID0gKGl0ZW1zOiBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0b1tdIHwgdW5kZWZpbmVkLCBsb2NhbGU6IHN0cmluZyk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XG4gIGNvbnN0IHNvdXJjZSA9IEFycmF5LmlzQXJyYXkoaXRlbXMpID8gaXRlbXMgOiBbXTtcbiAgY29uc3Qgc2VlbkNvZGVzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgcmV0dXJuIHNvdXJjZVxuICAgIC5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW5jeUNvZGVJc28gPSBub3JtYWxpemVDdXJyZW5jeUNvZGUoZW50cnk/LkN1cnJlbmN5Q29kZUlTTyk7XG4gICAgICBjb25zdCBlZmZlY3RpdmVJc29Db2RlID0gY3VycmVuY3lDb2RlSXNvIHx8IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShlbnRyeT8uQ3VycmVuY3lDb2RlKTtcbiAgICAgIGlmICghZWZmZWN0aXZlSXNvQ29kZSkgcmV0dXJuIG51bGw7XG4gICAgICBpZiAoc2VlbkNvZGVzLmhhcyhlZmZlY3RpdmVJc29Db2RlKSkgcmV0dXJuIG51bGw7XG4gICAgICBzZWVuQ29kZXMuYWRkKGVmZmVjdGl2ZUlzb0NvZGUpO1xuXG4gICAgICBjb25zdCBkaXNwbGF5TmFtZSA9IHJlc29sdmVDdXJyZW5jeURpc3BsYXlOYW1lKGVmZmVjdGl2ZUlzb0NvZGUsIGxvY2FsZSk7XG4gICAgICBjb25zdCBvcHRpb25MYWJlbCA9IGRpc3BsYXlOYW1lID8gYCR7ZWZmZWN0aXZlSXNvQ29kZX0gJHtkaXNwbGF5TmFtZX1gIDogZWZmZWN0aXZlSXNvQ29kZTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IGVmZmVjdGl2ZUlzb0NvZGUsXG4gICAgICAgIHRleHQ6IG9wdGlvbkxhYmVsLFxuICAgICAgICBpY29uOiA8RXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gY3VycmVuY3lDb2RlPXtlZmZlY3RpdmVJc29Db2RlfSBzaXplQ2xhc3NOYW1lPXtDVVJSRU5DWV9GTEFHX1NJWkVfQ0xBU1N9IC8+LFxuICAgICAgfSBhcyBFeHBlbnNlU2VsZWN0T3B0aW9uO1xuICAgIH0pXG4gICAgLmZpbHRlcigoZW50cnkpOiBlbnRyeSBpcyBFeHBlbnNlU2VsZWN0T3B0aW9uID0+IGVudHJ5ICE9PSBudWxsKTtcbn07XG5cbi8vIFNoYXJlZCBjdXJyZW5jeSBjb21ib2JveCBiYWNrZWQgYnkgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9jdXJyZW5jaWVzLlxuY29uc3QgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHNob3dMYWJlbCA9IHRydWUsXG4gIGlkQmFzZSA9IFwiZXhwZW5zZS1jdXJyZW5jeVwiLFxuICBwcmVmZXJEZWZhdWx0Q3VycmVuY3lGcm9tQ29udGV4dCA9IGZhbHNlLFxufTogRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0UHJvcHMpID0+IHtcbiAgY29uc3QgbG9jYWxlID0gdXNlTWVtbygoKSA9PiByZWFkUHJlZmVycmVkTG9jYWxlKCksIFtdKTtcbiAgY29uc3QgW29wdGlvbnMsIHNldE9wdGlvbnNdID0gdXNlU3RhdGU8RXhwZW5zZVNlbGVjdE9wdGlvbltdPihbXSk7XG4gIGNvbnN0IFtpc0xvYWRpbmdPcHRpb25zLCBzZXRJc0xvYWRpbmdPcHRpb25zXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2xvYWRFcnJvck1lc3NhZ2UsIHNldExvYWRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtlbXB0eU1lc3NhZ2UsIHNldEVtcHR5TWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3Qgb25DaGFuZ2VSZWYgPSB1c2VSZWYob25DaGFuZ2UpO1xuICBjb25zdCB2YWx1ZVJlZiA9IHVzZVJlZihub3JtYWxpemVDdXJyZW5jeUNvZGUodmFsdWUpKTtcbiAgY29uc3QgaW5pdGlhbERlZmF1bHRBcHBsaWVkUmVmID0gdXNlUmVmKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQgPSBvbkNoYW5nZTtcbiAgfSwgW29uQ2hhbmdlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB2YWx1ZVJlZi5jdXJyZW50ID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKHZhbHVlKTtcbiAgfSwgW3ZhbHVlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgaXNDYW5jZWxsZWQgPSBmYWxzZTtcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gICAgY29uc3QgbG9hZEN1cnJlbmNpZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgICBzZXRJc0xvYWRpbmdPcHRpb25zKHRydWUpO1xuICAgICAgc2V0TG9hZEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICAgIHNldEVtcHR5TWVzc2FnZShcIlwiKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRFeHBlbnNlU2hlZXRDdXJyZW5jaWVzKHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgICBzZXRPcHRpb25zKFtdKTtcbiAgICAgICAgICBzZXRMb2FkRXJyb3JNZXNzYWdlKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldHMuXCIpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtYXBwZWRPcHRpb25zID0gbWFwQ3VycmVuY3lPcHRpb25zKHJlc3BvbnNlLkl0ZW1zLCBsb2NhbGUpO1xuICAgICAgICBzZXRPcHRpb25zKG1hcHBlZE9wdGlvbnMpO1xuXG4gICAgICAgIGlmICghbWFwcGVkT3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICBzZXRFbXB0eU1lc3NhZ2UocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX05vRGF0YVwiLCBcIk5vIGRhdGFcIikpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHZhbHVlUmVmLmN1cnJlbnQ7XG4gICAgICAgIGNvbnN0IGhhc0N1cnJlbnRJbkxpc3QgPSBtYXBwZWRPcHRpb25zLnNvbWUoKG9wdGlvbikgPT4gbm9ybWFsaXplQ3VycmVuY3lDb2RlKG9wdGlvbi52YWx1ZSkgPT09IGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgJiYgaGFzQ3VycmVudEluTGlzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY3VycmVudFZhbHVlICYmIHByZWZlckRlZmF1bHRDdXJyZW5jeUZyb21Db250ZXh0ICYmICFpbml0aWFsRGVmYXVsdEFwcGxpZWRSZWYuY3VycmVudCkge1xuICAgICAgICAgIGNvbnN0IGRlZmF1bHRDdXJyZW5jeUNvZGUgPSBub3JtYWxpemVDdXJyZW5jeUNvZGUoXG4gICAgICAgICAgICBhd2FpdCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlKHtcbiAgICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcblxuICAgICAgICAgIGlmIChkZWZhdWx0Q3VycmVuY3lDb2RlICYmIG1hcHBlZE9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiBub3JtYWxpemVDdXJyZW5jeUNvZGUob3B0aW9uLnZhbHVlKSA9PT0gZGVmYXVsdEN1cnJlbmN5Q29kZSkpIHtcbiAgICAgICAgICAgIGluaXRpYWxEZWZhdWx0QXBwbGllZFJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQoZGVmYXVsdEN1cnJlbmN5Q29kZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgZmFsbGJhY2tFcnJvciA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXRzLlwiKTtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciA/IGVycm9yLm1lc3NhZ2UgfHwgZmFsbGJhY2tFcnJvciA6IGZhbGxiYWNrRXJyb3I7XG4gICAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgICBzZXRMb2FkRXJyb3JNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKCFpc0NhbmNlbGxlZCkge1xuICAgICAgICAgIHNldElzTG9hZGluZ09wdGlvbnMoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZvaWQgbG9hZEN1cnJlbmNpZXMoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpc0NhbmNlbGxlZCA9IHRydWU7XG4gICAgICBjb250cm9sbGVyLmFib3J0KCk7XG4gICAgfTtcbiAgfSwgW2xvY2FsZSwgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHRdKTtcblxuICBjb25zdCBub3JtYWxpemVkVmFsdWUgPSB1c2VNZW1vKCgpID0+IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSh2YWx1ZSksIFt2YWx1ZV0pO1xuICBjb25zdCBkaXNhYmxlQmVjYXVzZU5vRGF0YSA9ICFpc0xvYWRpbmdPcHRpb25zICYmICFsb2FkRXJyb3JNZXNzYWdlICYmIG9wdGlvbnMubGVuZ3RoID09PSAwO1xuICBjb25zdCBlZmZlY3RpdmVEaXNhYmxlZCA9IGRpc2FibGVkIHx8IGRpc2FibGVCZWNhdXNlTm9EYXRhO1xuICBjb25zdCBsb2FkaW5nTWVzc2FnZSA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XG4gICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgIG9wdGlvbnM9e29wdGlvbnN9XG4gICAgICAgIHZhbHVlPXtub3JtYWxpemVkVmFsdWV9XG4gICAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiBvbkNoYW5nZShub3JtYWxpemVDdXJyZW5jeUNvZGUobmV4dFZhbHVlKSl9XG4gICAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgICAgZGlzYWJsZWQ9e2VmZmVjdGl2ZURpc2FibGVkfVxuICAgICAgICBhbGxvd1RleHRJbnB1dFxuICAgICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cbiAgICAgICAgc2hvd0xhYmVsPXtzaG93TGFiZWx9XG4gICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XG4gICAgICAgIHNlbGVjdGVkVGV4dE1vZGU9XCJ2YWx1ZVwiXG4gICAgICAgIGRyb3Bkb3duTWF4SGVpZ2h0Q2xhc3M9XCJtYXgtaC05NlwiXG4gICAgICAgIHNlbGVjdGVkSWNvbkNsYXNzTmFtZT17Q1VSUkVOQ1lfRkxBR19TSVpFX0NMQVNTfVxuICAgICAgICBzZWxlY3RlZElucHV0UGFkZGluZ0NsYXNzTmFtZT1cInBsLTEyXCJcbiAgICAgICAgY2xlYXJPbkVtcHR5SW5wdXRcbiAgICAgICAgb3B0aW9uSWNvbkNsYXNzTmFtZT17Q1VSUkVOQ1lfRkxBR19TSVpFX0NMQVNTfVxuICAgICAgICBhbGxvd09wdGlvbkhvcml6b250YWxTY3JvbGxcbiAgICAgICAgbG9ja0Ryb3Bkb3duV2lkdGhPbkZpcnN0T3BlblxuICAgICAgICBkaXNhYmxlRGVmYXVsdE9wdGlvblBhZGRpbmdcbiAgICAgICAgb3B0aW9uTGVmdFBhZGRpbmdDbGFzc05hbWU9XCJwbC0xXCJcbiAgICAgICAgb3B0aW9uRGVmYXVsdENsYXNzTmFtZT17Q1VSUkVOQ1lfT1BUSU9OX0RFRkFVTFRfQ0xBU1N9XG4gICAgICAgIG9wdGlvbkFjdGl2ZUNsYXNzTmFtZT17Q1VSUkVOQ1lfT1BUSU9OX0FDVElWRV9DTEFTU31cbiAgICAgICAgb3B0aW9uU2VsZWN0ZWRDbGFzc05hbWU9e0NVUlJFTkNZX09QVElPTl9TRUxFQ1RFRF9DTEFTU31cbiAgICAgICAgaWRCYXNlPXtpZEJhc2V9XG4gICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgIHBhbmVsQ2xhc3NOYW1lPXtDVVJSRU5DWV9EUk9QRE9XTl9QQU5FTF9DTEFTU31cbiAgICAgICAgcGFuZWxTdHlsZT17Q1VSUkVOQ1lfRFJPUERPV05fUEFORUxfU1RZTEV9XG4gICAgICAvPlxuICAgICAge2lzTG9hZGluZ09wdGlvbnMgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwXCI+e2xvYWRpbmdNZXNzYWdlfTwvcD4gOiBudWxsfVxuICAgICAgeyFpc0xvYWRpbmdPcHRpb25zICYmIGxvYWRFcnJvck1lc3NhZ2UgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtZGFuZ2VyXCI+e2xvYWRFcnJvck1lc3NhZ2V9PC9wPiA6IG51bGx9XG4gICAgICB7IWlzTG9hZGluZ09wdGlvbnMgJiYgIWxvYWRFcnJvck1lc3NhZ2UgJiYgZW1wdHlNZXNzYWdlID8gPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMFwiPntlbXB0eU1lc3NhZ2V9PC9wPiA6IG51bGx9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3Q7XG5cclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVdPLElBQU0sZ0NBQXlEO0FBQ3RFLElBQU0sdUJBQWtELENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENB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QUFFO0FBQ0EsWUFBSSxDQUFDLGFBQWE7QUFDaEIsOEJBQW9CLEtBQUs7QUFBQSxRQUMzQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUEsU0FBSyxlQUFlO0FBRXBCLFdBQU8sTUFBTTtBQUNYLG9CQUFjO0FBQ2QsaUJBQVcsTUFBTTtBQUFBLElBQ25CO0FBQUEsRUFDRixHQUFHLENBQUMsUUFBUSxnQ0FBZ0MsQ0FBQztBQUU3QyxRQUFNLHNCQUFrQix1QkFBUSxNQUFNQSx1QkFBc0IsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDO0FBQzNFLFFBQU0sdUJBQXVCLENBQUMsb0JBQW9CLENBQUMsb0JBQW9CLFFBQVEsV0FBVztBQUMxRixRQUFNLG9CQUFvQixZQUFZO0FBQ3RDLFFBQU0saUJBQWlCLEtBQUssa0JBQWtCLFNBQVM7QUFFdkQsU0FDRSw4Q0FBQyxTQUFJLFdBQVUsZUFDYjtBQUFBO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxPQUFPO0FBQUEsUUFDUCxVQUFVLENBQUMsY0FBYyxTQUFTQSx1QkFBc0IsU0FBUyxDQUFDO0FBQUEsUUFDbEU7QUFBQSxRQUNBLFVBQVU7QUFBQSxRQUNWLGdCQUFjO0FBQUEsUUFDZCxrQkFBa0I7QUFBQSxRQUNsQjtBQUFBLFFBQ0EsV0FBVztBQUFBLFFBQ1gsa0JBQWlCO0FBQUEsUUFDakIsd0JBQXVCO0FBQUEsUUFDdkIsdUJBQXVCO0FBQUEsUUFDdkIsK0JBQThCO0FBQUEsUUFDOUIsbUJBQWlCO0FBQUEsUUFDakIscUJBQXFCO0FBQUEsUUFDckIsNkJBQTJCO0FBQUEsUUFDM0IsOEJBQTRCO0FBQUEsUUFDNUIsNkJBQTJCO0FBQUEsUUFDM0IsNEJBQTJCO0FBQUEsUUFDM0Isd0JBQXdCO0FBQUEsUUFDeEIsdUJBQXVCO0FBQUEsUUFDdkIseUJBQXlCO0FBQUEsUUFDekI7QUFBQSxRQUNBLGlCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLFlBQVk7QUFBQTtBQUFBLElBQ2Q7QUFBQSxJQUNDLG1CQUFtQiw2Q0FBQyxPQUFFLFdBQVUsMEJBQTBCLDBCQUFlLElBQU87QUFBQSxJQUNoRixDQUFDLG9CQUFvQixtQkFBbUIsNkNBQUMsT0FBRSxXQUFVLHVCQUF1Qiw0QkFBaUIsSUFBTztBQUFBLElBQ3BHLENBQUMsb0JBQW9CLENBQUMsb0JBQW9CLGVBQWUsNkNBQUMsT0FBRSxXQUFVLDBCQUEwQix3QkFBYSxJQUFPO0FBQUEsS0FDdkg7QUFFSjtBQUVBLElBQU8sc0NBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgIm5vcm1hbGl6ZUN1cnJlbmN5Q29kZSJdCn0K
