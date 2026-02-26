import {
  getExpenseSheetCurrencies,
  getExpenseSheetDefaultCurrencyCode,
  normalizeCardTitleText
} from "./chunk-MQH7K455.js";
import {
  SelectCombobox_default
} from "./chunk-UJZXAY7R.js";
import {
  ApiFetchError,
  indT
} from "./chunk-OO4T3BDP.js";
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
  statusLabel
}) => {
  const safeTitle = normalizeCardTitleText(title, "-");
  const safeAmount = amountText || "-";
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
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: titleClassName, "data-fulltext": safeTitle, children: safeTitle }),
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
        className: `inline-flex items-center justify-center rounded-[3px] border border-slate-200 bg-slate-100 text-[9px] font-semibold text-slate-500 ${sizeClassName} ${className}`.trim(),
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
      className: `${sizeClassName} rounded-[3px] border border-slate-200 bg-white object-contain ${className}`.trim(),
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
var CURRENCY_FLAG_SIZE_CLASS = "h-5 w-5";
var CURRENCY_DROPDOWN_EXPAND_PX = 84;
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
        dropdownExpandPx: CURRENCY_DROPDOWN_EXPAND_PX,
        dropdownMaxHeightClass: "max-h-96",
        selectedIconClassName: CURRENCY_FLAG_SIZE_CLASS,
        optionIconClassName: CURRENCY_FLAG_SIZE_CLASS,
        idBase,
        portalClassName: "visitas-typography",
        panelClassName: "visitas-typography"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb25zdGFudHMvZXhwZW5zZVN0YXR1c0NhdGFsb2cudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlQ3VycmVuY3lGbGFnSWNvbi50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuXG50eXBlIEV4cGVuc2VTdGF0dXNVaU1ldGEgPSB7XG4gIGxhYmVsS2V5OiBzdHJpbmc7XG4gIGZhbGxiYWNrOiBzdHJpbmc7XG4gIGNvbG9ySGV4OiBzdHJpbmc7XG4gIGJhZGdlQ2xhc3NOYW1lOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVI6IEV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlID0gNTtcbmNvbnN0IEVYUEVOU0VfU1RBVFVTX0NPREVTOiBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZVtdID0gWzUsIDAsIDEsIDIsIDMsIDRdO1xuY29uc3QgRVhQRU5TRV9TSEVFVF9TVEFUVVNfQ09ERVM6IEV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlW10gPSBbMCwgMSwgMiwgMywgNF07XG5cbmNvbnN0IFNUQVRVU19VSV9CWV9DT0RFOiBSZWNvcmQ8RXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUsIEV4cGVuc2VTdGF0dXNVaU1ldGE+ID0ge1xuICAwOiB7XG4gICAgbGFiZWxLZXk6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU3RhdHVzX0RyYWZ0XCIsXG4gICAgZmFsbGJhY2s6IFwiQm9ycmFkb3JcIixcbiAgICBjb2xvckhleDogXCIjOTRhM2I4XCIsXG4gICAgYmFkZ2VDbGFzc05hbWU6IFwiZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMgZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMtLWRyYWZ0XCIsXG4gIH0sXG4gIDE6IHtcbiAgICBsYWJlbEtleTogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TdGF0dXNfSW5SZXZpZXdcIixcbiAgICBmYWxsYmFjazogXCJBcHJvYmFjaW9uIHNvbGljaXRhZGFcIixcbiAgICBjb2xvckhleDogXCIjZjU5ZTBiXCIsXG4gICAgYmFkZ2VDbGFzc05hbWU6IFwiZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMgZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMtLXJldmlld1wiLFxuICB9LFxuICAyOiB7XG4gICAgbGFiZWxLZXk6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU3RhdHVzX0FwcHJvdmVkXCIsXG4gICAgZmFsbGJhY2s6IFwiQXByb2JhZG9cIixcbiAgICBjb2xvckhleDogXCIjMjJjNTVlXCIsXG4gICAgYmFkZ2VDbGFzc05hbWU6IFwiZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMgZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMtLWFwcHJvdmVkXCIsXG4gIH0sXG4gIDM6IHtcbiAgICBsYWJlbEtleTogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TdGF0dXNfUmVqZWN0ZWRcIixcbiAgICBmYWxsYmFjazogXCJSZWNoYXphZG9cIixcbiAgICBjb2xvckhleDogXCIjZWY0NDQ0XCIsXG4gICAgYmFkZ2VDbGFzc05hbWU6IFwiZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMgZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMtLXJlamVjdGVkXCIsXG4gIH0sXG4gIDQ6IHtcbiAgICBsYWJlbEtleTogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TdGF0dXNfUGFpZFwiLFxuICAgIGZhbGxiYWNrOiBcIlBhZ2Fkb1wiLFxuICAgIGNvbG9ySGV4OiBcIiMwMDI5NmJcIixcbiAgICBiYWRnZUNsYXNzTmFtZTogXCJleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cyBleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cy0tcGFpZFwiLFxuICB9LFxuICA1OiB7XG4gICAgbGFiZWxLZXk6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU3RhdHVzX0FsbFwiLFxuICAgIGZhbGxiYWNrOiBcIlRvZG9zXCIsXG4gICAgY29sb3JIZXg6IFwiIzY0NzQ4YlwiLFxuICAgIGJhZGdlQ2xhc3NOYW1lOiBcImV4cGVuc2Utc2hlZXQtY2FyZF9fc3RhdHVzIGV4cGVuc2Utc2hlZXQtY2FyZF9fc3RhdHVzLS1hbGxcIixcbiAgfSxcbn07XG5cbi8vIE5vcm1hbGl6ZXMgYW55IHVua25vd24gc3RhdHVzIGZpbHRlciB2YWx1ZSB0byBhIHNhZmUgbGlzdCBmaWx0ZXIgY29kZS5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSA9IChcbiAgdmFsdWU6IHVua25vd24sXG4gIGZhbGxiYWNrOiBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSA9IERFRkFVTFRfRVhQRU5TRV9TVEFUVVNfRklMVEVSXG4pOiBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIGlmIChwYXJzZWQgPj0gMCAmJiBwYXJzZWQgPD0gNSkge1xuICAgIHJldHVybiBwYXJzZWQgYXMgRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGU7XG4gIH1cbiAgcmV0dXJuIGZhbGxiYWNrO1xufTtcblxuLy8gQnVpbGRzIGZpeGVkIHN0YXR1cyBmaWx0ZXIgb3B0aW9ucyBmb3IgdGhlIGV4cGVuc2UgbGlzdCBmaWx0ZXIgcGFuZWwuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVN0YXR1c0ZpbHRlck9wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcbiAgcmV0dXJuIEVYUEVOU0VfU1RBVFVTX0NPREVTXG4gICAgLm1hcCgoY29kZSkgPT4ge1xuICAgICAgY29uc3QgbWV0YSA9IFNUQVRVU19VSV9CWV9DT0RFW2NvZGVdO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IFN0cmluZyhjb2RlKSxcbiAgICAgICAgdGV4dDogaW5kVChtZXRhLmxhYmVsS2V5LCBtZXRhLmZhbGxiYWNrKSxcbiAgICAgIH07XG4gICAgfSk7XG59O1xuXG4vLyBCdWlsZHMgZml4ZWQgc3RhdHVzIG9wdGlvbnMgZm9yIGV4cGVuc2Ugc2hlZXQgc3RhdGUgdXBkYXRlcyAod2l0aG91dCBcImFsbFwiKS5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlU2hlZXRTdGF0dXNPcHRpb25zID0gKCk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XG4gIHJldHVybiBFWFBFTlNFX1NIRUVUX1NUQVRVU19DT0RFUy5tYXAoKGNvZGUpID0+IHtcbiAgICBjb25zdCBtZXRhID0gU1RBVFVTX1VJX0JZX0NPREVbY29kZV07XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiBTdHJpbmcoY29kZSksXG4gICAgICB0ZXh0OiBpbmRUKG1ldGEubGFiZWxLZXksIG1ldGEuZmFsbGJhY2spLFxuICAgIH07XG4gIH0pO1xufTtcblxuLy8gUmV0dXJucyB0aGUgbG9jYWxpemVkIHN0YXR1cyBsYWJlbCBmb3IgZmlsdGVyIHN1bW1hcmllcyBhbmQgYmFkZ2VzLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTdGF0dXNMYWJlbCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSh2YWx1ZSk7XG4gIGNvbnN0IG1ldGEgPSBTVEFUVVNfVUlfQllfQ09ERVtub3JtYWxpemVkXTtcbiAgcmV0dXJuIGluZFQobWV0YS5sYWJlbEtleSwgbWV0YS5mYWxsYmFjayk7XG59O1xuXG4vLyBSZXR1cm5zIHRoZSBjb2xvciB0b2tlbiBmb3IgVUkgZWxlbWVudHMgdGhhdCByZXByZXNlbnQgYSBzdGF0dXMgY29kZS5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlU3RhdHVzQ29sb3JIZXggPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUodmFsdWUpO1xuICByZXR1cm4gU1RBVFVTX1VJX0JZX0NPREVbbm9ybWFsaXplZF0uY29sb3JIZXg7XG59O1xuXG4vLyBSZXR1cm5zIHRoZSBkZWZhdWx0IGJhZGdlIGNsYXNzIG5hbWUgdXNlZCBieSB0aW1lbGluZSBjYXJkcy5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlU3RhdHVzQmFkZ2VDbGFzc05hbWUgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUodmFsdWUpO1xuICByZXR1cm4gU1RBVFVTX1VJX0JZX0NPREVbbm9ybWFsaXplZF0uYmFkZ2VDbGFzc05hbWU7XG59O1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZURhdGVQYXJ0cyB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgbm9ybWFsaXplQ2FyZFRpdGxlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuXG50eXBlIEV4cGVuc2VUaW1lbGluZUNhcmRQcm9wcyA9IHtcbiAgZGF0ZVBhcnRzOiBFeHBlbnNlRGF0ZVBhcnRzO1xuICB0aXRsZTogc3RyaW5nO1xuICBhbW91bnRUZXh0OiBzdHJpbmc7XG4gIG9uT3BlbjogKCkgPT4gdm9pZDtcbiAgdGl0bGVDbGFzc05hbWU/OiBzdHJpbmc7XG4gIGFtb3VudENsYXNzTmFtZT86IHN0cmluZztcbiAgc3RhdHVzQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBzdGF0dXNMYWJlbD86IHN0cmluZztcbn07XG5cbi8vIFJldXNhYmxlIGNsaWNrYWJsZSB0aW1lbGluZSBjYXJkIGZvciBleHBlbnNlIHNoZWV0cyBhbmQgZXhwZW5zZSBsaW5lcy5cbmNvbnN0IEV4cGVuc2VUaW1lbGluZUNhcmQgPSAoe1xuICBkYXRlUGFydHMsXG4gIHRpdGxlLFxuICBhbW91bnRUZXh0LFxuICBvbk9wZW4sXG4gIHRpdGxlQ2xhc3NOYW1lID0gXCJ0aW1lbGluZS1uYW1lXCIsXG4gIGFtb3VudENsYXNzTmFtZSA9IFwiZXhwZW5zZS1zaGVldC1jYXJkX19hbW91bnRcIixcbiAgc3RhdHVzQ2xhc3NOYW1lLFxuICBzdGF0dXNMYWJlbCxcbn06IEV4cGVuc2VUaW1lbGluZUNhcmRQcm9wcykgPT4ge1xuICBjb25zdCBzYWZlVGl0bGUgPSBub3JtYWxpemVDYXJkVGl0bGVUZXh0KHRpdGxlLCBcIi1cIik7XG4gIGNvbnN0IHNhZmVBbW91bnQgPSBhbW91bnRUZXh0IHx8IFwiLVwiO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPVwidGltZWxpbmUtY2FyZCB0aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIlxuICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICB0YWJJbmRleD17MH1cbiAgICAgIG9uQ2xpY2s9e29uT3Blbn1cbiAgICAgIG9uS2V5RG93bj17KGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIiB8fCBldmVudC5rZXkgPT09IFwiIFwiKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBvbk9wZW4oKTtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWRhdGUtcGFuZWwgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEgcHgtMyBweS0zIGJnLXNsYXRlLTUwIGJvcmRlci1yIGJvcmRlci1zbGF0ZS0yMDAgdGV4dC1zbGF0ZS02MDBcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdHJhY2tpbmctWzAuMmVtXSB0ZXh0LXNsYXRlLTUwMFwiPntkYXRlUGFydHMueWVhcn08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLVswLjJlbV0gdGV4dC1zbGF0ZS01MDBcIj57ZGF0ZVBhcnRzLm1vbnRofTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtc2VtaWJvbGQgdGV4dC1wcmltYXJ5XCI+e2RhdGVQYXJ0cy5kYXl9PC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtY2FyZF9fY29udGVudCBmbGV4LTEgcHktMyBweC00XCI+XG4gICAgICAgIHtzdGF0dXNDbGFzc05hbWUgPyA8c3BhbiBjbGFzc05hbWU9e3N0YXR1c0NsYXNzTmFtZX0gdGl0bGU9e3N0YXR1c0xhYmVsfSBhcmlhLWxhYmVsPXtzdGF0dXNMYWJlbH0gLz4gOiBudWxsfVxuICAgICAgICA8cCBjbGFzc05hbWU9e3RpdGxlQ2xhc3NOYW1lfSBkYXRhLWZ1bGx0ZXh0PXtzYWZlVGl0bGV9PlxuICAgICAgICAgIHtzYWZlVGl0bGV9XG4gICAgICAgIDwvcD5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXthbW91bnRDbGFzc05hbWV9IGRhdGEtZnVsbHRleHQ9e3NhZmVBbW91bnR9PlxuICAgICAgICAgIHtzYWZlQW1vdW50fVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaW1lbGluZUNhcmQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBFeHBlbnNlQ3VycmVuY3lGbGFnSWNvblByb3BzID0ge1xuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBzaXplQ2xhc3NOYW1lPzogc3RyaW5nO1xufTtcblxuY29uc3Qgbm9ybWFsaXplQ3VycmVuY3lDb2RlID0gKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcbn07XG5cbi8vIFJlbmRlcnMgYSBjdXJyZW5jeSBmbGFnIGZyb20gbG9jYWwgYXNzZXRzIHdpdGggYSBzdGFibGUgZmFsbGJhY2sgaWNvbi5cbmNvbnN0IEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uID0gKHsgY3VycmVuY3lDb2RlLCBjbGFzc05hbWUgPSBcIlwiLCBzaXplQ2xhc3NOYW1lID0gXCJoLTQgdy00XCIgfTogRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb25Qcm9wcykgPT4ge1xuICBjb25zdCBub3JtYWxpemVkQ29kZSA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShjdXJyZW5jeUNvZGUpO1xuICBjb25zdCBbbG9hZEZhaWxlZCwgc2V0TG9hZEZhaWxlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRMb2FkRmFpbGVkKGZhbHNlKTtcbiAgfSwgW25vcm1hbGl6ZWRDb2RlXSk7XG5cbiAgaWYgKCFub3JtYWxpemVkQ29kZSB8fCBsb2FkRmFpbGVkKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuXG4gICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgIGNsYXNzTmFtZT17YGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVszcHhdIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXNsYXRlLTEwMCB0ZXh0LVs5cHhdIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS01MDAgJHtzaXplQ2xhc3NOYW1lfSAke2NsYXNzTmFtZX1gLnRyaW0oKX1cbiAgICAgID5cbiAgICAgICAgJFxuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxpbWdcbiAgICAgIHNyYz17YC9hc3NldHMvZmxhZ3MvJHtlbmNvZGVVUklDb21wb25lbnQobm9ybWFsaXplZENvZGUpfS5zdmdgfVxuICAgICAgYWx0PVwiXCJcbiAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICBsb2FkaW5nPVwibGF6eVwiXG4gICAgICBjbGFzc05hbWU9e2Ake3NpemVDbGFzc05hbWV9IHJvdW5kZWQtWzNweF0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUgb2JqZWN0LWNvbnRhaW4gJHtjbGFzc05hbWV9YC50cmltKCl9XG4gICAgICBvbkVycm9yPXsoKSA9PiBzZXRMb2FkRmFpbGVkKHRydWUpfVxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlQ3VycmVuY3lGbGFnSWNvbjtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZVNoZWV0Q3VycmVuY2llcywgZ2V0RXhwZW5zZVNoZWV0RGVmYXVsdEN1cnJlbmN5Q29kZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcbmltcG9ydCBFeHBlbnNlQ3VycmVuY3lGbGFnSWNvbiBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGbGFnSWNvbi50c3hcIjtcblxudHlwZSBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICByZWFkT25seT86IGJvb2xlYW47XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcbiAgaWRCYXNlPzogc3RyaW5nO1xuICBwcmVmZXJEZWZhdWx0Q3VycmVuY3lGcm9tQ29udGV4dD86IGJvb2xlYW47XG59O1xuXG5jb25zdCBub3JtYWxpemVDdXJyZW5jeUNvZGUgPSAodmFsdWU6IHN0cmluZyB8IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xufTtcblxuY29uc3QgQ1VSUkVOQ1lfRkxBR19TSVpFX0NMQVNTID0gXCJoLTUgdy01XCI7XG5jb25zdCBDVVJSRU5DWV9EUk9QRE9XTl9FWFBBTkRfUFggPSA4NDtcblxuY29uc3QgcmVhZFByZWZlcnJlZExvY2FsZSA9ICgpOiBzdHJpbmcgPT4ge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY29uc3QgZnJvbURvY3VtZW50ID0gU3RyaW5nKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcIlwiKS50cmltKCk7XG4gICAgaWYgKGZyb21Eb2N1bWVudCkgcmV0dXJuIGZyb21Eb2N1bWVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY29uc3QgZnJvbU5hdmlnYXRvciA9IFN0cmluZyhuYXZpZ2F0b3IubGFuZ3VhZ2UgfHwgXCJcIikudHJpbSgpO1xuICAgIGlmIChmcm9tTmF2aWdhdG9yKSByZXR1cm4gZnJvbU5hdmlnYXRvcjtcbiAgfVxuXG4gIHJldHVybiBcImVuXCI7XG59O1xuXG4vLyBSZXNvbHZlcyBhIGxvY2FsaXplZCBjdXJyZW5jeSBkaXNwbGF5IG5hbWUgd2hlbiBJbnRsLkRpc3BsYXlOYW1lcyBpcyBhdmFpbGFibGUuXG5jb25zdCByZXNvbHZlQ3VycmVuY3lEaXNwbGF5TmFtZSA9IChjdXJyZW5jeUNvZGU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBub3JtYWxpemVkQ29kZSA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShjdXJyZW5jeUNvZGUpO1xuICBpZiAoIW5vcm1hbGl6ZWRDb2RlKSByZXR1cm4gXCJcIjtcblxuICBjb25zdCBpbnRsV2l0aERpc3BsYXlOYW1lcyA9IEludGwgYXMgdHlwZW9mIEludGwgJiB7XG4gICAgRGlzcGxheU5hbWVzPzogbmV3IChcbiAgICAgIGxvY2FsZXM/OiBzdHJpbmcgfCBzdHJpbmdbXSxcbiAgICAgIG9wdGlvbnM/OiB7IHR5cGU6IFwiY3VycmVuY3lcIiB9XG4gICAgKSA9PiB7IG9mOiAodmFsdWU6IHN0cmluZykgPT4gc3RyaW5nIHwgdW5kZWZpbmVkIH07XG4gIH07XG5cbiAgaWYgKHR5cGVvZiBpbnRsV2l0aERpc3BsYXlOYW1lcy5EaXNwbGF5TmFtZXMgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFwiXCI7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBkaXNwbGF5TmFtZXMgPSBuZXcgaW50bFdpdGhEaXNwbGF5TmFtZXMuRGlzcGxheU5hbWVzKFtsb2NhbGUsIFwiZW5cIl0sIHsgdHlwZTogXCJjdXJyZW5jeVwiIH0pO1xuICAgIGNvbnN0IGxvY2FsaXplZE5hbWUgPSBTdHJpbmcoZGlzcGxheU5hbWVzLm9mKG5vcm1hbGl6ZWRDb2RlKSB8fCBcIlwiKS50cmltKCk7XG4gICAgaWYgKCFsb2NhbGl6ZWROYW1lKSByZXR1cm4gXCJcIjtcblxuICAgIGNvbnN0IG5vcm1hbGl6ZWROYW1lID0gbG9jYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgIHJldHVybiBub3JtYWxpemVkTmFtZSA9PT0gbm9ybWFsaXplZENvZGUgPyBcIlwiIDogbG9jYWxpemVkTmFtZTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cbn07XG5cbmNvbnN0IG1hcEN1cnJlbmN5T3B0aW9ucyA9IChpdGVtczogRXhwZW5zZVNoZWV0Q3VycmVuY3lEdG9bXSB8IHVuZGVmaW5lZCwgbG9jYWxlOiBzdHJpbmcpOiBFeHBlbnNlU2VsZWN0T3B0aW9uW10gPT4ge1xuICBjb25zdCBzb3VyY2UgPSBBcnJheS5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zIDogW107XG4gIGNvbnN0IHNlZW5Db2RlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gIHJldHVybiBzb3VyY2VcbiAgICAubWFwKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgY3VycmVuY3lDb2RlSXNvID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKGVudHJ5Py5DdXJyZW5jeUNvZGVJU08pO1xuICAgICAgY29uc3QgZWZmZWN0aXZlSXNvQ29kZSA9IGN1cnJlbmN5Q29kZUlzbyB8fCBub3JtYWxpemVDdXJyZW5jeUNvZGUoZW50cnk/LkN1cnJlbmN5Q29kZSk7XG4gICAgICBpZiAoIWVmZmVjdGl2ZUlzb0NvZGUpIHJldHVybiBudWxsO1xuICAgICAgaWYgKHNlZW5Db2Rlcy5oYXMoZWZmZWN0aXZlSXNvQ29kZSkpIHJldHVybiBudWxsO1xuICAgICAgc2VlbkNvZGVzLmFkZChlZmZlY3RpdmVJc29Db2RlKTtcblxuICAgICAgY29uc3QgZGlzcGxheU5hbWUgPSByZXNvbHZlQ3VycmVuY3lEaXNwbGF5TmFtZShlZmZlY3RpdmVJc29Db2RlLCBsb2NhbGUpO1xuICAgICAgY29uc3Qgb3B0aW9uTGFiZWwgPSBkaXNwbGF5TmFtZSA/IGAke2VmZmVjdGl2ZUlzb0NvZGV9ICR7ZGlzcGxheU5hbWV9YCA6IGVmZmVjdGl2ZUlzb0NvZGU7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiBlZmZlY3RpdmVJc29Db2RlLFxuICAgICAgICB0ZXh0OiBvcHRpb25MYWJlbCxcbiAgICAgICAgaWNvbjogPEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uIGN1cnJlbmN5Q29kZT17ZWZmZWN0aXZlSXNvQ29kZX0gc2l6ZUNsYXNzTmFtZT17Q1VSUkVOQ1lfRkxBR19TSVpFX0NMQVNTfSAvPixcbiAgICAgIH0gYXMgRXhwZW5zZVNlbGVjdE9wdGlvbjtcbiAgICB9KVxuICAgIC5maWx0ZXIoKGVudHJ5KTogZW50cnkgaXMgRXhwZW5zZVNlbGVjdE9wdGlvbiA9PiBlbnRyeSAhPT0gbnVsbCk7XG59O1xuXG4vLyBTaGFyZWQgY3VycmVuY3kgY29tYm9ib3ggYmFja2VkIGJ5IC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvY3VycmVuY2llcy5cbmNvbnN0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCA9ICh7XG4gIGxhYmVsLFxuICBwbGFjZWhvbGRlcixcbiAgdmFsdWUsXG4gIG9uQ2hhbmdlLFxuICByZWFkT25seSA9IGZhbHNlLFxuICBkaXNhYmxlZCA9IGZhbHNlLFxuICBzaG93TGFiZWwgPSB0cnVlLFxuICBpZEJhc2UgPSBcImV4cGVuc2UtY3VycmVuY3lcIixcbiAgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHQgPSBmYWxzZSxcbn06IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdFByb3BzKSA9PiB7XG4gIGNvbnN0IGxvY2FsZSA9IHVzZU1lbW8oKCkgPT4gcmVhZFByZWZlcnJlZExvY2FsZSgpLCBbXSk7XG4gIGNvbnN0IFtvcHRpb25zLCBzZXRPcHRpb25zXSA9IHVzZVN0YXRlPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oW10pO1xuICBjb25zdCBbaXNMb2FkaW5nT3B0aW9ucywgc2V0SXNMb2FkaW5nT3B0aW9uc10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtsb2FkRXJyb3JNZXNzYWdlLCBzZXRMb2FkRXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbZW1wdHlNZXNzYWdlLCBzZXRFbXB0eU1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IG9uQ2hhbmdlUmVmID0gdXNlUmVmKG9uQ2hhbmdlKTtcbiAgY29uc3QgdmFsdWVSZWYgPSB1c2VSZWYobm9ybWFsaXplQ3VycmVuY3lDb2RlKHZhbHVlKSk7XG4gIGNvbnN0IGluaXRpYWxEZWZhdWx0QXBwbGllZFJlZiA9IHVzZVJlZihmYWxzZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBvbkNoYW5nZVJlZi5jdXJyZW50ID0gb25DaGFuZ2U7XG4gIH0sIFtvbkNoYW5nZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgdmFsdWVSZWYuY3VycmVudCA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSh2YWx1ZSk7XG4gIH0sIFt2YWx1ZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGlzQ2FuY2VsbGVkID0gZmFsc2U7XG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICAgIGNvbnN0IGxvYWRDdXJyZW5jaWVzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgc2V0SXNMb2FkaW5nT3B0aW9ucyh0cnVlKTtcbiAgICAgIHNldExvYWRFcnJvck1lc3NhZ2UoXCJcIik7XG4gICAgICBzZXRFbXB0eU1lc3NhZ2UoXCJcIik7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZ2V0RXhwZW5zZVNoZWV0Q3VycmVuY2llcyh7XG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XG4gICAgICAgICAgc2V0T3B0aW9ucyhbXSk7XG4gICAgICAgICAgc2V0TG9hZEVycm9yTWVzc2FnZShyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXRzLlwiKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWFwcGVkT3B0aW9ucyA9IG1hcEN1cnJlbmN5T3B0aW9ucyhyZXNwb25zZS5JdGVtcywgbG9jYWxlKTtcbiAgICAgICAgc2V0T3B0aW9ucyhtYXBwZWRPcHRpb25zKTtcblxuICAgICAgICBpZiAoIW1hcHBlZE9wdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgc2V0RW1wdHlNZXNzYWdlKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB2YWx1ZVJlZi5jdXJyZW50O1xuICAgICAgICBjb25zdCBoYXNDdXJyZW50SW5MaXN0ID0gbWFwcGVkT3B0aW9ucy5zb21lKChvcHRpb24pID0+IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShvcHRpb24udmFsdWUpID09PSBjdXJyZW50VmFsdWUpO1xuICAgICAgICBpZiAoY3VycmVudFZhbHVlICYmIGhhc0N1cnJlbnRJbkxpc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWN1cnJlbnRWYWx1ZSAmJiBwcmVmZXJEZWZhdWx0Q3VycmVuY3lGcm9tQ29udGV4dCAmJiAhaW5pdGlhbERlZmF1bHRBcHBsaWVkUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICBjb25zdCBkZWZhdWx0Q3VycmVuY3lDb2RlID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKFxuICAgICAgICAgICAgYXdhaXQgZ2V0RXhwZW5zZVNoZWV0RGVmYXVsdEN1cnJlbmN5Q29kZSh7XG4gICAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XG5cbiAgICAgICAgICBpZiAoZGVmYXVsdEN1cnJlbmN5Q29kZSAmJiBtYXBwZWRPcHRpb25zLnNvbWUoKG9wdGlvbikgPT4gbm9ybWFsaXplQ3VycmVuY3lDb2RlKG9wdGlvbi52YWx1ZSkgPT09IGRlZmF1bHRDdXJyZW5jeUNvZGUpKSB7XG4gICAgICAgICAgICBpbml0aWFsRGVmYXVsdEFwcGxpZWRSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICAgICAgICBvbkNoYW5nZVJlZi5jdXJyZW50KGRlZmF1bHRDdXJyZW5jeUNvZGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSBcIkFib3J0RXJyb3JcIikgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IGZhbGxiYWNrRXJyb3IgPSBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0cy5cIik7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgPyBlcnJvci5tZXNzYWdlIHx8IGZhbGxiYWNrRXJyb3IgOiBmYWxsYmFja0Vycm9yO1xuICAgICAgICBzZXRPcHRpb25zKFtdKTtcbiAgICAgICAgc2V0TG9hZEVycm9yTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmICghaXNDYW5jZWxsZWQpIHtcbiAgICAgICAgICBzZXRJc0xvYWRpbmdPcHRpb25zKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB2b2lkIGxvYWRDdXJyZW5jaWVzKCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaXNDYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgY29udHJvbGxlci5hYm9ydCgpO1xuICAgIH07XG4gIH0sIFtsb2NhbGUsIHByZWZlckRlZmF1bHRDdXJyZW5jeUZyb21Db250ZXh0XSk7XG5cbiAgY29uc3Qgbm9ybWFsaXplZFZhbHVlID0gdXNlTWVtbygoKSA9PiBub3JtYWxpemVDdXJyZW5jeUNvZGUodmFsdWUpLCBbdmFsdWVdKTtcbiAgY29uc3QgZGlzYWJsZUJlY2F1c2VOb0RhdGEgPSAhaXNMb2FkaW5nT3B0aW9ucyAmJiAhbG9hZEVycm9yTWVzc2FnZSAmJiBvcHRpb25zLmxlbmd0aCA9PT0gMDtcbiAgY29uc3QgZWZmZWN0aXZlRGlzYWJsZWQgPSBkaXNhYmxlZCB8fCBkaXNhYmxlQmVjYXVzZU5vRGF0YTtcbiAgY29uc3QgbG9hZGluZ01lc3NhZ2UgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxuICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICBvcHRpb25zPXtvcHRpb25zfVxuICAgICAgICB2YWx1ZT17bm9ybWFsaXplZFZhbHVlfVxuICAgICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4gb25DaGFuZ2Uobm9ybWFsaXplQ3VycmVuY3lDb2RlKG5leHRWYWx1ZSkpfVxuICAgICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICAgIGRpc2FibGVkPXtlZmZlY3RpdmVEaXNhYmxlZH1cbiAgICAgICAgYWxsb3dUZXh0SW5wdXRcbiAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XG4gICAgICAgIHNob3dMYWJlbD17c2hvd0xhYmVsfVxuICAgICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxuICAgICAgICBzZWxlY3RlZFRleHRNb2RlPVwidmFsdWVcIlxuICAgICAgICBkcm9wZG93bkV4cGFuZFB4PXtDVVJSRU5DWV9EUk9QRE9XTl9FWFBBTkRfUFh9XG4gICAgICAgIGRyb3Bkb3duTWF4SGVpZ2h0Q2xhc3M9XCJtYXgtaC05NlwiXG4gICAgICAgIHNlbGVjdGVkSWNvbkNsYXNzTmFtZT17Q1VSUkVOQ1lfRkxBR19TSVpFX0NMQVNTfVxuICAgICAgICBvcHRpb25JY29uQ2xhc3NOYW1lPXtDVVJSRU5DWV9GTEFHX1NJWkVfQ0xBU1N9XG4gICAgICAgIGlkQmFzZT17aWRCYXNlfVxuICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAvPlxuICAgICAge2lzTG9hZGluZ09wdGlvbnMgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwXCI+e2xvYWRpbmdNZXNzYWdlfTwvcD4gOiBudWxsfVxuICAgICAgeyFpc0xvYWRpbmdPcHRpb25zICYmIGxvYWRFcnJvck1lc3NhZ2UgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtZGFuZ2VyXCI+e2xvYWRFcnJvck1lc3NhZ2V9PC9wPiA6IG51bGx9XG4gICAgICB7IWlzTG9hZGluZ09wdGlvbnMgJiYgIWxvYWRFcnJvck1lc3NhZ2UgJiYgZW1wdHlNZXNzYWdlID8gPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMFwiPntlbXB0eU1lc3NhZ2V9PC9wPiA6IG51bGx9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3Q7XG5cclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBV08sSUFBTSxnQ0FBeUQ7QUFDdEUsSUFBTSx1QkFBa0QsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUN6RSxJQUFNLDZCQUF3RCxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUU1RSxJQUFNLG9CQUEwRTtBQUFBLEVBQzlFLEdBQUc7QUFBQSxJQUNELFVBQVU7QUFBQSxJQUNWLFVBQVU7QUFBQSxJQUNWLFVBQVU7QUFBQSxJQUNWLGdCQUFnQjtBQUFBLEVBQ2xCO0FBQUEsRUFDQSxHQUFHO0FBQUEsSUFDRCxVQUFVO0FBQUEsSUFDVixVQUFVO0FBQUEsSUFDVixVQUFVO0FBQUEsSUFDVixnQkFBZ0I7QUFBQSxFQUNsQjtBQUFBLEVBQ0EsR0FBRztBQUFBLElBQ0QsVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBLElBQ1YsZ0JBQWdCO0FBQUEsRUFDbEI7QUFBQSxFQUNBLEdBQUc7QUFBQSxJQUNELFVBQVU7QUFBQSxJQUNWLFVBQVU7QUFBQSxJQUNWLFVBQVU7QUFBQSxJQUNWLGdCQUFnQjtBQUFBLEVBQ2xCO0FBQUEsRUFDQSxHQUFHO0FBQUEsSUFDRCxVQUFVO0FBQUEsSUFDVixVQUFVO0FBQUEsSUFDVixVQUFVO0FBQUEsSUFDVixn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QkFBZ0IsTUFBTSxXQUFXLGdCQUFnQjtBQUNsRixtQkFBVyxDQUFDLENBQUM7QUFDYiw0QkFBb0IsT0FBTztBQUFBLE1BQzdCLFVBQUU7QUFDQSxZQUFJLENBQUMsYUFBYTtBQUNoQiw4QkFBb0IsS0FBSztBQUFBLFFBQzNCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxTQUFLLGVBQWU7QUFFcEIsV0FBTyxNQUFNO0FBQ1gsb0JBQWM7QUFDZCxpQkFBVyxNQUFNO0FBQUEsSUFDbkI7QUFBQSxFQUNGLEdBQUcsQ0FBQyxRQUFRLGdDQUFnQyxDQUFDO0FBRTdDLFFBQU0sc0JBQWtCLHVCQUFRLE1BQU1BLHVCQUFzQixLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDM0UsUUFBTSx1QkFBdUIsQ0FBQyxvQkFBb0IsQ0FBQyxvQkFBb0IsUUFBUSxXQUFXO0FBQzFGLFFBQU0sb0JBQW9CLFlBQVk7QUFDdEMsUUFBTSxpQkFBaUIsS0FBSyxrQkFBa0IsU0FBUztBQUV2RCxTQUNFLDhDQUFDLFNBQUksV0FBVSxlQUNiO0FBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBLE9BQU87QUFBQSxRQUNQLFVBQVUsQ0FBQyxjQUFjLFNBQVNBLHVCQUFzQixTQUFTLENBQUM7QUFBQSxRQUNsRTtBQUFBLFFBQ0EsVUFBVTtBQUFBLFFBQ1YsZ0JBQWM7QUFBQSxRQUNkLGtCQUFrQjtBQUFBLFFBQ2xCO0FBQUEsUUFDQSxXQUFXO0FBQUEsUUFDWCxrQkFBaUI7QUFBQSxRQUNqQixrQkFBa0I7QUFBQSxRQUNsQix3QkFBdUI7QUFBQSxRQUN2Qix1QkFBdUI7QUFBQSxRQUN2QixxQkFBcUI7QUFBQSxRQUNyQjtBQUFBLFFBQ0EsaUJBQWdCO0FBQUEsUUFDaEIsZ0JBQWU7QUFBQTtBQUFBLElBQ2pCO0FBQUEsSUFDQyxtQkFBbUIsNkNBQUMsT0FBRSxXQUFVLDBCQUEwQiwwQkFBZSxJQUFPO0FBQUEsSUFDaEYsQ0FBQyxvQkFBb0IsbUJBQW1CLDZDQUFDLE9BQUUsV0FBVSx1QkFBdUIsNEJBQWlCLElBQU87QUFBQSxJQUNwRyxDQUFDLG9CQUFvQixDQUFDLG9CQUFvQixlQUFlLDZDQUFDLE9BQUUsV0FBVSwwQkFBMEIsd0JBQWEsSUFBTztBQUFBLEtBQ3ZIO0FBRUo7QUFFQSxJQUFPLHNDQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJub3JtYWxpemVDdXJyZW5jeUNvZGUiXQp9Cg==
