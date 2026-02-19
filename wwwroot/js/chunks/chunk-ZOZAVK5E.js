import {
  getExpenseSheetCurrencies,
  getExpenseSheetDefaultCurrencyCode,
  normalizeCardTitleText
} from "./chunk-2CQI6C7W.js";
import {
  SelectCombobox_default
} from "./chunk-XJBPFDRJ.js";
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
    fallback: "En revision",
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
var ExpenseCurrencyFlagIcon = ({ currencyCode, className = "" }) => {
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
        className: `inline-flex h-4 w-4 items-center justify-center rounded-[3px] border border-slate-200 bg-slate-100 text-[9px] font-semibold text-slate-500 ${className}`.trim(),
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
      className: `h-4 w-4 rounded-[3px] border border-slate-200 bg-white object-contain ${className}`.trim(),
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
      icon: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ExpenseCurrencyFlagIcon_default, { currencyCode: effectiveIsoCode })
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb25zdGFudHMvZXhwZW5zZVN0YXR1c0NhdGFsb2cudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlQ3VycmVuY3lGbGFnSWNvbi50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuXG50eXBlIEV4cGVuc2VTdGF0dXNVaU1ldGEgPSB7XG4gIGxhYmVsS2V5OiBzdHJpbmc7XG4gIGZhbGxiYWNrOiBzdHJpbmc7XG4gIGNvbG9ySGV4OiBzdHJpbmc7XG4gIGJhZGdlQ2xhc3NOYW1lOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVI6IEV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlID0gNTtcbmNvbnN0IEVYUEVOU0VfU1RBVFVTX0NPREVTOiBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZVtdID0gWzUsIDAsIDEsIDIsIDMsIDRdO1xuY29uc3QgRVhQRU5TRV9TSEVFVF9TVEFUVVNfQ09ERVM6IEV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlW10gPSBbMCwgMSwgMiwgMywgNF07XG5cbmNvbnN0IFNUQVRVU19VSV9CWV9DT0RFOiBSZWNvcmQ8RXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUsIEV4cGVuc2VTdGF0dXNVaU1ldGE+ID0ge1xuICAwOiB7XG4gICAgbGFiZWxLZXk6IFwiRXhwZW5zZVNoZWV0c19GaWx0ZXJfU3RhdHVzX0RyYWZ0XCIsXG4gICAgZmFsbGJhY2s6IFwiQm9ycmFkb3JcIixcbiAgICBjb2xvckhleDogXCIjOTRhM2I4XCIsXG4gICAgYmFkZ2VDbGFzc05hbWU6IFwiZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMgZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMtLWRyYWZ0XCIsXG4gIH0sXG4gIDE6IHtcbiAgICBsYWJlbEtleTogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TdGF0dXNfSW5SZXZpZXdcIixcbiAgICBmYWxsYmFjazogXCJFbiByZXZpc2lvblwiLFxuICAgIGNvbG9ySGV4OiBcIiNmNTllMGJcIixcbiAgICBiYWRnZUNsYXNzTmFtZTogXCJleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cyBleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cy0tcmV2aWV3XCIsXG4gIH0sXG4gIDI6IHtcbiAgICBsYWJlbEtleTogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TdGF0dXNfQXBwcm92ZWRcIixcbiAgICBmYWxsYmFjazogXCJBcHJvYmFkb1wiLFxuICAgIGNvbG9ySGV4OiBcIiMyMmM1NWVcIixcbiAgICBiYWRnZUNsYXNzTmFtZTogXCJleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cyBleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cy0tYXBwcm92ZWRcIixcbiAgfSxcbiAgMzoge1xuICAgIGxhYmVsS2V5OiBcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1N0YXR1c19SZWplY3RlZFwiLFxuICAgIGZhbGxiYWNrOiBcIlJlY2hhemFkb1wiLFxuICAgIGNvbG9ySGV4OiBcIiNlZjQ0NDRcIixcbiAgICBiYWRnZUNsYXNzTmFtZTogXCJleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cyBleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cy0tcmVqZWN0ZWRcIixcbiAgfSxcbiAgNDoge1xuICAgIGxhYmVsS2V5OiBcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1N0YXR1c19QYWlkXCIsXG4gICAgZmFsbGJhY2s6IFwiUGFnYWRvXCIsXG4gICAgY29sb3JIZXg6IFwiIzAwMjk2YlwiLFxuICAgIGJhZGdlQ2xhc3NOYW1lOiBcImV4cGVuc2Utc2hlZXQtY2FyZF9fc3RhdHVzIGV4cGVuc2Utc2hlZXQtY2FyZF9fc3RhdHVzLS1wYWlkXCIsXG4gIH0sXG4gIDU6IHtcbiAgICBsYWJlbEtleTogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TdGF0dXNfQWxsXCIsXG4gICAgZmFsbGJhY2s6IFwiVG9kb3NcIixcbiAgICBjb2xvckhleDogXCIjNjQ3NDhiXCIsXG4gICAgYmFkZ2VDbGFzc05hbWU6IFwiZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMgZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMtLWFsbFwiLFxuICB9LFxufTtcblxuLy8gTm9ybWFsaXplcyBhbnkgdW5rbm93biBzdGF0dXMgZmlsdGVyIHZhbHVlIHRvIGEgc2FmZSBsaXN0IGZpbHRlciBjb2RlLlxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlID0gKFxuICB2YWx1ZTogdW5rbm93bixcbiAgZmFsbGJhY2s6IEV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlID0gREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVJcbik6IEV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlID0+IHtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgaWYgKHBhcnNlZCA+PSAwICYmIHBhcnNlZCA8PSA1KSB7XG4gICAgcmV0dXJuIHBhcnNlZCBhcyBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZTtcbiAgfVxuICByZXR1cm4gZmFsbGJhY2s7XG59O1xuXG4vLyBCdWlsZHMgZml4ZWQgc3RhdHVzIGZpbHRlciBvcHRpb25zIGZvciB0aGUgZXhwZW5zZSBsaXN0IGZpbHRlciBwYW5lbC5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlU3RhdHVzRmlsdGVyT3B0aW9ucyA9ICgpOiBFeHBlbnNlU2VsZWN0T3B0aW9uW10gPT4ge1xuICByZXR1cm4gRVhQRU5TRV9TVEFUVVNfQ09ERVNcbiAgICAubWFwKChjb2RlKSA9PiB7XG4gICAgICBjb25zdCBtZXRhID0gU1RBVFVTX1VJX0JZX0NPREVbY29kZV07XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogU3RyaW5nKGNvZGUpLFxuICAgICAgICB0ZXh0OiBpbmRUKG1ldGEubGFiZWxLZXksIG1ldGEuZmFsbGJhY2spLFxuICAgICAgfTtcbiAgICB9KTtcbn07XG5cbi8vIEJ1aWxkcyBmaXhlZCBzdGF0dXMgb3B0aW9ucyBmb3IgZXhwZW5zZSBzaGVldCBzdGF0ZSB1cGRhdGVzICh3aXRob3V0IFwiYWxsXCIpLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTaGVldFN0YXR1c09wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcbiAgcmV0dXJuIEVYUEVOU0VfU0hFRVRfU1RBVFVTX0NPREVTLm1hcCgoY29kZSkgPT4ge1xuICAgIGNvbnN0IG1ldGEgPSBTVEFUVVNfVUlfQllfQ09ERVtjb2RlXTtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IFN0cmluZyhjb2RlKSxcbiAgICAgIHRleHQ6IGluZFQobWV0YS5sYWJlbEtleSwgbWV0YS5mYWxsYmFjayksXG4gICAgfTtcbiAgfSk7XG59O1xuXG4vLyBSZXR1cm5zIHRoZSBsb2NhbGl6ZWQgc3RhdHVzIGxhYmVsIGZvciBmaWx0ZXIgc3VtbWFyaWVzIGFuZCBiYWRnZXMuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVN0YXR1c0xhYmVsID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlKHZhbHVlKTtcbiAgY29uc3QgbWV0YSA9IFNUQVRVU19VSV9CWV9DT0RFW25vcm1hbGl6ZWRdO1xuICByZXR1cm4gaW5kVChtZXRhLmxhYmVsS2V5LCBtZXRhLmZhbGxiYWNrKTtcbn07XG5cbi8vIFJldHVybnMgdGhlIGNvbG9yIHRva2VuIGZvciBVSSBlbGVtZW50cyB0aGF0IHJlcHJlc2VudCBhIHN0YXR1cyBjb2RlLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTdGF0dXNDb2xvckhleCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSh2YWx1ZSk7XG4gIHJldHVybiBTVEFUVVNfVUlfQllfQ09ERVtub3JtYWxpemVkXS5jb2xvckhleDtcbn07XG5cbi8vIFJldHVybnMgdGhlIGRlZmF1bHQgYmFkZ2UgY2xhc3MgbmFtZSB1c2VkIGJ5IHRpbWVsaW5lIGNhcmRzLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTdGF0dXNCYWRnZUNsYXNzTmFtZSA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSh2YWx1ZSk7XG4gIHJldHVybiBTVEFUVVNfVUlfQllfQ09ERVtub3JtYWxpemVkXS5iYWRnZUNsYXNzTmFtZTtcbn07XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlRGF0ZVBhcnRzIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBub3JtYWxpemVDYXJkVGl0bGVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5cbnR5cGUgRXhwZW5zZVRpbWVsaW5lQ2FyZFByb3BzID0ge1xuICBkYXRlUGFydHM6IEV4cGVuc2VEYXRlUGFydHM7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGFtb3VudFRleHQ6IHN0cmluZztcbiAgb25PcGVuOiAoKSA9PiB2b2lkO1xuICB0aXRsZUNsYXNzTmFtZT86IHN0cmluZztcbiAgYW1vdW50Q2xhc3NOYW1lPzogc3RyaW5nO1xuICBzdGF0dXNDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHN0YXR1c0xhYmVsPzogc3RyaW5nO1xufTtcblxuLy8gUmV1c2FibGUgY2xpY2thYmxlIHRpbWVsaW5lIGNhcmQgZm9yIGV4cGVuc2Ugc2hlZXRzIGFuZCBleHBlbnNlIGxpbmVzLlxuY29uc3QgRXhwZW5zZVRpbWVsaW5lQ2FyZCA9ICh7XG4gIGRhdGVQYXJ0cyxcbiAgdGl0bGUsXG4gIGFtb3VudFRleHQsXG4gIG9uT3BlbixcbiAgdGl0bGVDbGFzc05hbWUgPSBcInRpbWVsaW5lLW5hbWVcIixcbiAgYW1vdW50Q2xhc3NOYW1lID0gXCJleHBlbnNlLXNoZWV0LWNhcmRfX2Ftb3VudFwiLFxuICBzdGF0dXNDbGFzc05hbWUsXG4gIHN0YXR1c0xhYmVsLFxufTogRXhwZW5zZVRpbWVsaW5lQ2FyZFByb3BzKSA9PiB7XG4gIGNvbnN0IHNhZmVUaXRsZSA9IG5vcm1hbGl6ZUNhcmRUaXRsZVRleHQodGl0bGUsIFwiLVwiKTtcbiAgY29uc3Qgc2FmZUFtb3VudCA9IGFtb3VudFRleHQgfHwgXCItXCI7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9XCJ0aW1lbGluZS1jYXJkIHRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiXG4gICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgIHRhYkluZGV4PXswfVxuICAgICAgb25DbGljaz17b25PcGVufVxuICAgICAgb25LZXlEb3duPXsoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiIHx8IGV2ZW50LmtleSA9PT0gXCIgXCIpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIG9uT3BlbigpO1xuICAgICAgICB9XG4gICAgICB9fVxuICAgID5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtZGF0ZS1wYW5lbCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMSBweC0zIHB5LTMgYmctc2xhdGUtNTAgYm9yZGVyLXIgYm9yZGVyLXNsYXRlLTIwMCB0ZXh0LXNsYXRlLTYwMFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFja2luZy1bMC4yZW1dIHRleHQtc2xhdGUtNTAwXCI+e2RhdGVQYXJ0cy55ZWFyfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctWzAuMmVtXSB0ZXh0LXNsYXRlLTUwMFwiPntkYXRlUGFydHMubW9udGh9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1zZW1pYm9sZCB0ZXh0LXByaW1hcnlcIj57ZGF0ZVBhcnRzLmRheX08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1jYXJkX19jb250ZW50IGZsZXgtMSBweS0zIHB4LTRcIj5cbiAgICAgICAge3N0YXR1c0NsYXNzTmFtZSA/IDxzcGFuIGNsYXNzTmFtZT17c3RhdHVzQ2xhc3NOYW1lfSB0aXRsZT17c3RhdHVzTGFiZWx9IGFyaWEtbGFiZWw9e3N0YXR1c0xhYmVsfSAvPiA6IG51bGx9XG4gICAgICAgIDxwIGNsYXNzTmFtZT17dGl0bGVDbGFzc05hbWV9IGRhdGEtZnVsbHRleHQ9e3NhZmVUaXRsZX0+XG4gICAgICAgICAge3NhZmVUaXRsZX1cbiAgICAgICAgPC9wPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2Ftb3VudENsYXNzTmFtZX0gZGF0YS1mdWxsdGV4dD17c2FmZUFtb3VudH0+XG4gICAgICAgICAge3NhZmVBbW91bnR9XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpbWVsaW5lQ2FyZDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuXG50eXBlIEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uUHJvcHMgPSB7XG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG59O1xuXG5jb25zdCBub3JtYWxpemVDdXJyZW5jeUNvZGUgPSAodmFsdWU6IHN0cmluZyB8IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xufTtcblxuLy8gUmVuZGVycyBhIGN1cnJlbmN5IGZsYWcgZnJvbSBsb2NhbCBhc3NldHMgd2l0aCBhIHN0YWJsZSBmYWxsYmFjayBpY29uLlxuY29uc3QgRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gPSAoeyBjdXJyZW5jeUNvZGUsIGNsYXNzTmFtZSA9IFwiXCIgfTogRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb25Qcm9wcykgPT4ge1xuICBjb25zdCBub3JtYWxpemVkQ29kZSA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShjdXJyZW5jeUNvZGUpO1xuICBjb25zdCBbbG9hZEZhaWxlZCwgc2V0TG9hZEZhaWxlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRMb2FkRmFpbGVkKGZhbHNlKTtcbiAgfSwgW25vcm1hbGl6ZWRDb2RlXSk7XG5cbiAgaWYgKCFub3JtYWxpemVkQ29kZSB8fCBsb2FkRmFpbGVkKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuXG4gICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgIGNsYXNzTmFtZT17YGlubGluZS1mbGV4IGgtNCB3LTQgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtWzNweF0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctc2xhdGUtMTAwIHRleHQtWzlweF0gZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTUwMCAke2NsYXNzTmFtZX1gLnRyaW0oKX1cbiAgICAgID5cbiAgICAgICAgJFxuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxpbWdcbiAgICAgIHNyYz17YC9hc3NldHMvZmxhZ3MvJHtlbmNvZGVVUklDb21wb25lbnQobm9ybWFsaXplZENvZGUpfS5zdmdgfVxuICAgICAgYWx0PVwiXCJcbiAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICBsb2FkaW5nPVwibGF6eVwiXG4gICAgICBjbGFzc05hbWU9e2BoLTQgdy00IHJvdW5kZWQtWzNweF0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUgb2JqZWN0LWNvbnRhaW4gJHtjbGFzc05hbWV9YC50cmltKCl9XG4gICAgICBvbkVycm9yPXsoKSA9PiBzZXRMb2FkRmFpbGVkKHRydWUpfVxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlQ3VycmVuY3lGbGFnSWNvbjtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZVNoZWV0Q3VycmVuY2llcywgZ2V0RXhwZW5zZVNoZWV0RGVmYXVsdEN1cnJlbmN5Q29kZSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcbmltcG9ydCBFeHBlbnNlQ3VycmVuY3lGbGFnSWNvbiBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGbGFnSWNvbi50c3hcIjtcblxudHlwZSBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICByZWFkT25seT86IGJvb2xlYW47XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcbiAgaWRCYXNlPzogc3RyaW5nO1xuICBwcmVmZXJEZWZhdWx0Q3VycmVuY3lGcm9tQ29udGV4dD86IGJvb2xlYW47XG59O1xuXG5jb25zdCBub3JtYWxpemVDdXJyZW5jeUNvZGUgPSAodmFsdWU6IHN0cmluZyB8IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xufTtcblxuY29uc3QgcmVhZFByZWZlcnJlZExvY2FsZSA9ICgpOiBzdHJpbmcgPT4ge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY29uc3QgZnJvbURvY3VtZW50ID0gU3RyaW5nKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcIlwiKS50cmltKCk7XG4gICAgaWYgKGZyb21Eb2N1bWVudCkgcmV0dXJuIGZyb21Eb2N1bWVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY29uc3QgZnJvbU5hdmlnYXRvciA9IFN0cmluZyhuYXZpZ2F0b3IubGFuZ3VhZ2UgfHwgXCJcIikudHJpbSgpO1xuICAgIGlmIChmcm9tTmF2aWdhdG9yKSByZXR1cm4gZnJvbU5hdmlnYXRvcjtcbiAgfVxuXG4gIHJldHVybiBcImVuXCI7XG59O1xuXG4vLyBSZXNvbHZlcyBhIGxvY2FsaXplZCBjdXJyZW5jeSBkaXNwbGF5IG5hbWUgd2hlbiBJbnRsLkRpc3BsYXlOYW1lcyBpcyBhdmFpbGFibGUuXG5jb25zdCByZXNvbHZlQ3VycmVuY3lEaXNwbGF5TmFtZSA9IChjdXJyZW5jeUNvZGU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBub3JtYWxpemVkQ29kZSA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShjdXJyZW5jeUNvZGUpO1xuICBpZiAoIW5vcm1hbGl6ZWRDb2RlKSByZXR1cm4gXCJcIjtcblxuICBjb25zdCBpbnRsV2l0aERpc3BsYXlOYW1lcyA9IEludGwgYXMgdHlwZW9mIEludGwgJiB7XG4gICAgRGlzcGxheU5hbWVzPzogbmV3IChcbiAgICAgIGxvY2FsZXM/OiBzdHJpbmcgfCBzdHJpbmdbXSxcbiAgICAgIG9wdGlvbnM/OiB7IHR5cGU6IFwiY3VycmVuY3lcIiB9XG4gICAgKSA9PiB7IG9mOiAodmFsdWU6IHN0cmluZykgPT4gc3RyaW5nIHwgdW5kZWZpbmVkIH07XG4gIH07XG5cbiAgaWYgKHR5cGVvZiBpbnRsV2l0aERpc3BsYXlOYW1lcy5EaXNwbGF5TmFtZXMgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFwiXCI7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBkaXNwbGF5TmFtZXMgPSBuZXcgaW50bFdpdGhEaXNwbGF5TmFtZXMuRGlzcGxheU5hbWVzKFtsb2NhbGUsIFwiZW5cIl0sIHsgdHlwZTogXCJjdXJyZW5jeVwiIH0pO1xuICAgIGNvbnN0IGxvY2FsaXplZE5hbWUgPSBTdHJpbmcoZGlzcGxheU5hbWVzLm9mKG5vcm1hbGl6ZWRDb2RlKSB8fCBcIlwiKS50cmltKCk7XG4gICAgaWYgKCFsb2NhbGl6ZWROYW1lKSByZXR1cm4gXCJcIjtcblxuICAgIGNvbnN0IG5vcm1hbGl6ZWROYW1lID0gbG9jYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgIHJldHVybiBub3JtYWxpemVkTmFtZSA9PT0gbm9ybWFsaXplZENvZGUgPyBcIlwiIDogbG9jYWxpemVkTmFtZTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cbn07XG5cbmNvbnN0IG1hcEN1cnJlbmN5T3B0aW9ucyA9IChpdGVtczogRXhwZW5zZVNoZWV0Q3VycmVuY3lEdG9bXSB8IHVuZGVmaW5lZCwgbG9jYWxlOiBzdHJpbmcpOiBFeHBlbnNlU2VsZWN0T3B0aW9uW10gPT4ge1xuICBjb25zdCBzb3VyY2UgPSBBcnJheS5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zIDogW107XG4gIGNvbnN0IHNlZW5Db2RlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gIHJldHVybiBzb3VyY2VcbiAgICAubWFwKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgY3VycmVuY3lDb2RlSXNvID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKGVudHJ5Py5DdXJyZW5jeUNvZGVJU08pO1xuICAgICAgY29uc3QgZWZmZWN0aXZlSXNvQ29kZSA9IGN1cnJlbmN5Q29kZUlzbyB8fCBub3JtYWxpemVDdXJyZW5jeUNvZGUoZW50cnk/LkN1cnJlbmN5Q29kZSk7XG4gICAgICBpZiAoIWVmZmVjdGl2ZUlzb0NvZGUpIHJldHVybiBudWxsO1xuICAgICAgaWYgKHNlZW5Db2Rlcy5oYXMoZWZmZWN0aXZlSXNvQ29kZSkpIHJldHVybiBudWxsO1xuICAgICAgc2VlbkNvZGVzLmFkZChlZmZlY3RpdmVJc29Db2RlKTtcblxuICAgICAgY29uc3QgZGlzcGxheU5hbWUgPSByZXNvbHZlQ3VycmVuY3lEaXNwbGF5TmFtZShlZmZlY3RpdmVJc29Db2RlLCBsb2NhbGUpO1xuICAgICAgY29uc3Qgb3B0aW9uTGFiZWwgPSBkaXNwbGF5TmFtZSA/IGAke2VmZmVjdGl2ZUlzb0NvZGV9ICR7ZGlzcGxheU5hbWV9YCA6IGVmZmVjdGl2ZUlzb0NvZGU7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiBlZmZlY3RpdmVJc29Db2RlLFxuICAgICAgICB0ZXh0OiBvcHRpb25MYWJlbCxcbiAgICAgICAgaWNvbjogPEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uIGN1cnJlbmN5Q29kZT17ZWZmZWN0aXZlSXNvQ29kZX0gLz4sXG4gICAgICB9IGFzIEV4cGVuc2VTZWxlY3RPcHRpb247XG4gICAgfSlcbiAgICAuZmlsdGVyKChlbnRyeSk6IGVudHJ5IGlzIEV4cGVuc2VTZWxlY3RPcHRpb24gPT4gZW50cnkgIT09IG51bGwpO1xufTtcblxuLy8gU2hhcmVkIGN1cnJlbmN5IGNvbWJvYm94IGJhY2tlZCBieSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2N1cnJlbmNpZXMuXG5jb25zdCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QgPSAoe1xuICBsYWJlbCxcbiAgcGxhY2Vob2xkZXIsXG4gIHZhbHVlLFxuICBvbkNoYW5nZSxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcbiAgaWRCYXNlID0gXCJleHBlbnNlLWN1cnJlbmN5XCIsXG4gIHByZWZlckRlZmF1bHRDdXJyZW5jeUZyb21Db250ZXh0ID0gZmFsc2UsXG59OiBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RQcm9wcykgPT4ge1xuICBjb25zdCBsb2NhbGUgPSB1c2VNZW1vKCgpID0+IHJlYWRQcmVmZXJyZWRMb2NhbGUoKSwgW10pO1xuICBjb25zdCBbb3B0aW9ucywgc2V0T3B0aW9uc10gPSB1c2VTdGF0ZTxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KFtdKTtcbiAgY29uc3QgW2lzTG9hZGluZ09wdGlvbnMsIHNldElzTG9hZGluZ09wdGlvbnNdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbG9hZEVycm9yTWVzc2FnZSwgc2V0TG9hZEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2VtcHR5TWVzc2FnZSwgc2V0RW1wdHlNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBvbkNoYW5nZVJlZiA9IHVzZVJlZihvbkNoYW5nZSk7XG4gIGNvbnN0IHZhbHVlUmVmID0gdXNlUmVmKG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSh2YWx1ZSkpO1xuICBjb25zdCBpbml0aWFsRGVmYXVsdEFwcGxpZWRSZWYgPSB1c2VSZWYoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgb25DaGFuZ2VSZWYuY3VycmVudCA9IG9uQ2hhbmdlO1xuICB9LCBbb25DaGFuZ2VdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHZhbHVlUmVmLmN1cnJlbnQgPSBub3JtYWxpemVDdXJyZW5jeUNvZGUodmFsdWUpO1xuICB9LCBbdmFsdWVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBpc0NhbmNlbGxlZCA9IGZhbHNlO1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cbiAgICBjb25zdCBsb2FkQ3VycmVuY2llcyA9IGFzeW5jICgpID0+IHtcbiAgICAgIHNldElzTG9hZGluZ09wdGlvbnModHJ1ZSk7XG4gICAgICBzZXRMb2FkRXJyb3JNZXNzYWdlKFwiXCIpO1xuICAgICAgc2V0RW1wdHlNZXNzYWdlKFwiXCIpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldEV4cGVuc2VTaGVldEN1cnJlbmNpZXMoe1xuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xuICAgICAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgICAgIHNldExvYWRFcnJvck1lc3NhZ2UocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0cy5cIikpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1hcHBlZE9wdGlvbnMgPSBtYXBDdXJyZW5jeU9wdGlvbnMocmVzcG9uc2UuSXRlbXMsIGxvY2FsZSk7XG4gICAgICAgIHNldE9wdGlvbnMobWFwcGVkT3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKCFtYXBwZWRPcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgIHNldEVtcHR5TWVzc2FnZShyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJDb21tb25fTm9EYXRhXCIsIFwiTm8gZGF0YVwiKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gdmFsdWVSZWYuY3VycmVudDtcbiAgICAgICAgY29uc3QgaGFzQ3VycmVudEluTGlzdCA9IG1hcHBlZE9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiBub3JtYWxpemVDdXJyZW5jeUNvZGUob3B0aW9uLnZhbHVlKSA9PT0gY3VycmVudFZhbHVlKTtcbiAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSAmJiBoYXNDdXJyZW50SW5MaXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjdXJyZW50VmFsdWUgJiYgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHQgJiYgIWluaXRpYWxEZWZhdWx0QXBwbGllZFJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgY29uc3QgZGVmYXVsdEN1cnJlbmN5Q29kZSA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShcbiAgICAgICAgICAgIGF3YWl0IGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUoe1xuICAgICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xuXG4gICAgICAgICAgaWYgKGRlZmF1bHRDdXJyZW5jeUNvZGUgJiYgbWFwcGVkT3B0aW9ucy5zb21lKChvcHRpb24pID0+IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShvcHRpb24udmFsdWUpID09PSBkZWZhdWx0Q3VycmVuY3lDb2RlKSkge1xuICAgICAgICAgICAgaW5pdGlhbERlZmF1bHRBcHBsaWVkUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICAgICAgb25DaGFuZ2VSZWYuY3VycmVudChkZWZhdWx0Q3VycmVuY3lDb2RlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHJldHVybjtcblxuICAgICAgICBjb25zdCBmYWxsYmFja0Vycm9yID0gaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldHMuXCIpO1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yID8gZXJyb3IubWVzc2FnZSB8fCBmYWxsYmFja0Vycm9yIDogZmFsbGJhY2tFcnJvcjtcbiAgICAgICAgc2V0T3B0aW9ucyhbXSk7XG4gICAgICAgIHNldExvYWRFcnJvck1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoIWlzQ2FuY2VsbGVkKSB7XG4gICAgICAgICAgc2V0SXNMb2FkaW5nT3B0aW9ucyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdm9pZCBsb2FkQ3VycmVuY2llcygpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlzQ2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgIGNvbnRyb2xsZXIuYWJvcnQoKTtcbiAgICB9O1xuICB9LCBbbG9jYWxlLCBwcmVmZXJEZWZhdWx0Q3VycmVuY3lGcm9tQ29udGV4dF0pO1xuXG4gIGNvbnN0IG5vcm1hbGl6ZWRWYWx1ZSA9IHVzZU1lbW8oKCkgPT4gbm9ybWFsaXplQ3VycmVuY3lDb2RlKHZhbHVlKSwgW3ZhbHVlXSk7XG4gIGNvbnN0IGRpc2FibGVCZWNhdXNlTm9EYXRhID0gIWlzTG9hZGluZ09wdGlvbnMgJiYgIWxvYWRFcnJvck1lc3NhZ2UgJiYgb3B0aW9ucy5sZW5ndGggPT09IDA7XG4gIGNvbnN0IGVmZmVjdGl2ZURpc2FibGVkID0gZGlzYWJsZWQgfHwgZGlzYWJsZUJlY2F1c2VOb0RhdGE7XG4gIGNvbnN0IGxvYWRpbmdNZXNzYWdlID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgICBsYWJlbD17bGFiZWx9XG4gICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgb3B0aW9ucz17b3B0aW9uc31cbiAgICAgICAgdmFsdWU9e25vcm1hbGl6ZWRWYWx1ZX1cbiAgICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IG9uQ2hhbmdlKG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShuZXh0VmFsdWUpKX1cbiAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgICBkaXNhYmxlZD17ZWZmZWN0aXZlRGlzYWJsZWR9XG4gICAgICAgIGFsbG93VGV4dElucHV0XG4gICAgICAgIHNob3dTZWFyY2hCdXR0b249e2ZhbHNlfVxuICAgICAgICBzaG93TGFiZWw9e3Nob3dMYWJlbH1cbiAgICAgICAgdXNlUG9ydGFsPXtmYWxzZX1cbiAgICAgICAgaWRCYXNlPXtpZEJhc2V9XG4gICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgIC8+XG4gICAgICB7aXNMb2FkaW5nT3B0aW9ucyA/IDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS01MDBcIj57bG9hZGluZ01lc3NhZ2V9PC9wPiA6IG51bGx9XG4gICAgICB7IWlzTG9hZGluZ09wdGlvbnMgJiYgbG9hZEVycm9yTWVzc2FnZSA/IDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1kYW5nZXJcIj57bG9hZEVycm9yTWVzc2FnZX08L3A+IDogbnVsbH1cbiAgICAgIHshaXNMb2FkaW5nT3B0aW9ucyAmJiAhbG9hZEVycm9yTWVzc2FnZSAmJiBlbXB0eU1lc3NhZ2UgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwXCI+e2VtcHR5TWVzc2FnZX08L3A+IDogbnVsbH1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdDtcblxyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXTyxJQUFNLGdDQUF5RDtBQUN0RSxJQUFNLHVCQUFrRCxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ3pFLElBQU0sNkJBQXdELENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBRTVFLElBQU0sb0JBQTBFO0FBQUEsRUFDOUUsR0FBRztBQUFBLElBQ0QsVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBLElBQ1YsZ0JBQWdCO0FBQUEsRUFDbEI7QUFBQSxFQUNBLEdBQUc7QUFBQSxJQUNELFVBQVU7QUFBQSxJQUNWLFVBQVU7QUFBQSxJQUNWLFVBQVU7QUFBQSxJQUNWLGdCQUFnQjtBQUFBLEVBQ2xCO0FBQUEsRUFDQSxHQUFHO0FBQUEsSUFDRCxVQUFVO0FBQUEsSUFDVixVQUFVO0FBQUEsSUFDVixVQUFVO0FBQUEsSUFDVixnQkFBZ0I7QUFBQSxFQUNsQjtBQUFBLEVBQ0EsR0FBRztBQUFBLElBQ0QsVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBLElBQ1YsZ0JBQWdCO0FBQUEsRUFDbEI7QUFBQSxFQUNBLEdBQUc7QUFBQSxJQUNELFVBQVU7QUFBQSxJQUNWLFVBQVU7QUFBQSxJQUNWLFVBQVU7QUFBQSxJQUNWLGdCQUFnQjtBQUFBLEVBQ2xCO0FBQUEsRUFDQSxHQUFHO0FBQUEsSUFDRCxVQUFVO0FBQUEsSUFDVixVQUFVO0FBQUEsSUFDVixVQUFVO0FBQUEsSUFDVixnQkFBZ0I7QUFBQSxFQUNsQjtBQUNGO0FBR08sSUFBTSxtQ0FBbUMsQ0FDOUMsT0FDQSxXQUFvQyxrQ0FDUjtBQUM1QixRQUFNLFNBQVMsT0FBTyxLQUFLO0FBQzNCLE1BQUksVUFBVSxLQUFLLFVBQVUsR0FBRztBQUM5QixXQUFPO0FBQUEsRUFDVDtBQUNBLFNBQU87QUFDVDtBQUdPLElBQU0sZ0NBQWdDLE1BQTZCO0FBQ3hFLFNBQU8scUJBQ0osSUFBSSxDQUFDLFNBQVM7QUFDYixVQUFNLE9BQU8sa0JBQWtCLElBQUk7QUFDbkMsV0FBTztBQUFBLE1BQ0wsT0FBTyxPQUFPLElBQUk7QUFBQSxNQUNsQixNQUFNLEtBQUssS0FBSyxVQUFVLEtBQUssUUFBUTtBQUFBLElBQ3pDO0FBQUEsRUFDRixDQUFDO0FBQ0w7QUFHTyxJQUFNLCtCQUErQixNQUE2QjtBQUN2RSxTQUFPLDJCQUEyQixJQUFJLENBQUMsU0FBUztBQUM5QyxVQUFNLE9BQU8sa0JBQWtCLElBQUk7QUFDbkMsV0FBTztBQUFBLE1BQ0wsT0FBTyxPQUFPLElBQUk7QUFBQSxNQUNsQixNQUFNLEtBQUssS0FBSyxVQUFVLEtBQUssUUFBUTtBQUFBLElBQ3pDO0FBQUEsRUFDRixDQUFDO0FBQ0g7QUFHTyxJQUFNLHdCQUF3QixDQUFDLFVBQTJCO0FBQy9ELFFBQU0sYUFBYSxpQ0FBaUMsS0FBSztBQUN6RCxRQUFNLE9BQU8sa0JBQWtCLFVBQVU7QUFDekMsU0FBTyxLQUFLLEtBQUssVUFBVSxLQUFLLFFBQVE7QUFDMUM7QUFTTyxJQUFNLGlDQUFpQyxDQUFDLFVBQTJCO0FBQ3hFLFFBQU0sYUFBYSxpQ0FBaUMsS0FBSztBQUN6RCxTQUFPLGtCQUFrQixVQUFVLEVBQUU7QUFDdkM7OztBQ2hFTTtBQTFCTixJQUFNLHNCQUFzQixDQUFDO0FBQUEsRUFDM0I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLGlCQUFpQjtBQUFBLEVBQ2pCLGtCQUFrQjtBQUFBLEVBQ2xCO0FBQUEsRUFDQTtBQUNGLE1BQWdDO0FBQzlCLFFBQU0sWUFBWSx1QkFBdUIsT0FBTyxHQUFHO0FBQ25ELFFBQU0sYUFBYSxjQUFjO0FBRWpDLFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDLFdBQVU7QUFBQSxNQUNWLE1BQUs7QUFBQSxNQUNMLFVBQVU7QUFBQSxNQUNWLFNBQVM7QUFBQSxNQUNULFdBQVcsQ0FBQyxVQUFVO0FBQ3BCLFlBQUksTUFBTSxRQUFRLFdBQVcsTUFBTSxRQUFRLEtBQUs7QUFDOUMsZ0JBQU0sZUFBZTtBQUNyQixpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsTUFFQTtBQUFBLHFEQUFDLFNBQUksV0FBVSxzSUFDYjtBQUFBLHNEQUFDLFNBQUksV0FBVSx5REFBeUQsb0JBQVUsTUFBSztBQUFBLFVBQ3ZGLDRDQUFDLFNBQUksV0FBVSxtRUFBbUUsb0JBQVUsT0FBTTtBQUFBLFVBQ2xHLDRDQUFDLFNBQUksV0FBVSx1Q0FBdUMsb0JBQVUsS0FBSTtBQUFBLFdBQ3RFO0FBQUEsUUFDQSw2Q0FBQyxTQUFJLFdBQVUsMkNBQ1o7QUFBQSw0QkFBa0IsNENBQUMsVUFBSyxXQUFXLGlCQUFpQixPQUFPLGFBQWEsY0FBWSxhQUFhLElBQUs7QUFBQSxVQUN2Ryw0Q0FBQyxPQUFFLFdBQVcsZ0JBQWdCLGlCQUFlLFdBQzFDLHFCQUNIO0FBQUEsVUFDQSw0Q0FBQyxVQUFLLFdBQVcsaUJBQWlCLGlCQUFlLFlBQzlDLHNCQUNIO0FBQUEsV0FDRjtBQUFBO0FBQUE7QUFBQSxFQUNGO0FBRUo7QUFFQSxJQUFPLDhCQUFROzs7QUM1RGYsbUJBQTJDO0FBc0JyQyxJQUFBQSxzQkFBQTtBQWZOLElBQU0sd0JBQXdCLENBQUMsVUFBc0Q7QUFDbkYsU0FBTyxPQUFPLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZO0FBQ2hEO0FBR0EsSUFBTSwwQkFBMEIsQ0FBQyxFQUFFLGNBQWMsWUFBWSxHQUFHLE1BQW9DO0FBQ2xHLFFBQU0saUJBQWlCLHNCQUFzQixZQUFZO0FBQ3pELFFBQU0sQ0FBQyxZQUFZLGFBQWEsUUFBSSx1QkFBUyxLQUFLO0FBRWxELDhCQUFVLE1BQU07QUFDZCxrQkFBYyxLQUFLO0FBQUEsRUFDckIsR0FBRyxDQUFDLGNBQWMsQ0FBQztBQUVuQixNQUFJLENBQUMsa0JBQWtCLFlBQVk7QUFDakMsV0FDRTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsZUFBWTtBQUFBLFFBQ1osV0FBVyw4SUFBOEksU0FBUyxHQUFHLEtBQUs7QUFBQSxRQUMzSztBQUFBO0FBQUEsSUFFRDtBQUFBLEVBRUo7QUFFQSxTQUNFO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxLQUFLLGlCQUFpQixtQkFBbUIsY0FBYyxDQUFDO0FBQUEsTUFDeEQsS0FBSTtBQUFBLE1BQ0osZUFBWTtBQUFBLE1BQ1osU0FBUTtBQUFBLE1BQ1IsV0FBVyx5RUFBeUUsU0FBUyxHQUFHLEtBQUs7QUFBQSxNQUNyRyxTQUFTLE1BQU0sY0FBYyxJQUFJO0FBQUE7QUFBQSxFQUNuQztBQUVKO0FBRUEsSUFBTyxrQ0FBUTs7O0FDM0NmLElBQUFDLGdCQUE0RDtBQW1GOUMsSUFBQUMsc0JBQUE7QUE5RGQsSUFBTUMseUJBQXdCLENBQUMsVUFBc0Q7QUFDbkYsU0FBTyxPQUFPLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZO0FBQ2hEO0FBRUEsSUFBTSxzQkFBc0IsTUFBYztBQUN4QyxNQUFJLE9BQU8sYUFBYSxhQUFhO0FBQ25DLFVBQU0sZUFBZSxPQUFPLFNBQVMsaUJBQWlCLFFBQVEsRUFBRSxFQUFFLEtBQUs7QUFDdkUsUUFBSSxhQUFjLFFBQU87QUFBQSxFQUMzQjtBQUVBLE1BQUksT0FBTyxjQUFjLGFBQWE7QUFDcEMsVUFBTSxnQkFBZ0IsT0FBTyxVQUFVLFlBQVksRUFBRSxFQUFFLEtBQUs7QUFDNUQsUUFBSSxjQUFlLFFBQU87QUFBQSxFQUM1QjtBQUVBLFNBQU87QUFDVDtBQUdBLElBQU0sNkJBQTZCLENBQUMsY0FBc0IsV0FBMkI7QUFDbkYsUUFBTSxpQkFBaUJBLHVCQUFzQixZQUFZO0FBQ3pELE1BQUksQ0FBQyxlQUFnQixRQUFPO0FBRTVCLFFBQU0sdUJBQXVCO0FBTzdCLE1BQUksT0FBTyxxQkFBcUIsaUJBQWlCLFdBQVksUUFBTztBQUVwRSxNQUFJO0FBQ0YsVUFBTSxlQUFlLElBQUkscUJBQXFCLGFBQWEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQy9GLFVBQU0sZ0JBQWdCLE9BQU8sYUFBYSxHQUFHLGNBQWMsS0FBSyxFQUFFLEVBQUUsS0FBSztBQUN6RSxRQUFJLENBQUMsY0FBZSxRQUFPO0FBRTNCLFVBQU0saUJBQWlCLGNBQWMsWUFBWTtBQUNqRCxXQUFPLG1CQUFtQixpQkFBaUIsS0FBSztBQUFBLEVBQ2xELFFBQVE7QUFDTixXQUFPO0FBQUEsRUFDVDtBQUNGO0FBRUEsSUFBTSxxQkFBcUIsQ0FBQyxPQUE4QyxXQUEwQztBQUNsSCxRQUFNLFNBQVMsTUFBTSxRQUFRLEtBQUssSUFBSSxRQUFRLENBQUM7QUFDL0MsUUFBTSxZQUFZLG9CQUFJLElBQVk7QUFFbEMsU0FBTyxPQUNKLElBQUksQ0FBQyxVQUFVO0FBQ2QsVUFBTSxrQkFBa0JBLHVCQUFzQixPQUFPLGVBQWU7QUFDcEUsVUFBTSxtQkFBbUIsbUJBQW1CQSx1QkFBc0IsT0FBTyxZQUFZO0FBQ3JGLFFBQUksQ0FBQyxpQkFBa0IsUUFBTztBQUM5QixRQUFJLFVBQVUsSUFBSSxnQkFBZ0IsRUFBRyxRQUFPO0FBQzVDLGNBQVUsSUFBSSxnQkFBZ0I7QUFFOUIsVUFBTSxjQUFjLDJCQUEyQixrQkFBa0IsTUFBTTtBQUN2RSxVQUFNLGNBQWMsY0FBYyxHQUFHLGdCQUFnQixJQUFJLFdBQVcsS0FBSztBQUV6RSxXQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixNQUFNLDZDQUFDLG1DQUF3QixjQUFjLGtCQUFrQjtBQUFBLElBQ2pFO0FBQUEsRUFDRixDQUFDLEVBQ0EsT0FBTyxDQUFDLFVBQXdDLFVBQVUsSUFBSTtBQUNuRTtBQUdBLElBQU0sOEJBQThCLENBQUM7QUFBQSxFQUNuQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsWUFBWTtBQUFBLEVBQ1osU0FBUztBQUFBLEVBQ1QsbUNBQW1DO0FBQ3JDLE1BQXdDO0FBQ3RDLFFBQU0sYUFBUyx1QkFBUSxNQUFNLG9CQUFvQixHQUFHLENBQUMsQ0FBQztBQUN0RCxRQUFNLENBQUMsU0FBUyxVQUFVLFFBQUksd0JBQWdDLENBQUMsQ0FBQztBQUNoRSxRQUFNLENBQUMsa0JBQWtCLG1CQUFtQixRQUFJLHdCQUFTLEtBQUs7QUFDOUQsUUFBTSxDQUFDLGtCQUFrQixtQkFBbUIsUUFBSSx3QkFBUyxFQUFFO0FBQzNELFFBQU0sQ0FBQyxjQUFjLGVBQWUsUUFBSSx3QkFBUyxFQUFFO0FBQ25ELFFBQU0sa0JBQWMsc0JBQU8sUUFBUTtBQUNuQyxRQUFNLGVBQVcsc0JBQU9BLHVCQUFzQixLQUFLLENBQUM7QUFDcEQsUUFBTSwrQkFBMkIsc0JBQU8sS0FBSztBQUU3QywrQkFBVSxNQUFNO0FBQ2QsZ0JBQVksVUFBVTtBQUFBLEVBQ3hCLEdBQUcsQ0FBQyxRQUFRLENBQUM7QUFFYiwrQkFBVSxNQUFNO0FBQ2QsYUFBUyxVQUFVQSx1QkFBc0IsS0FBSztBQUFBLEVBQ2hELEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFFViwrQkFBVSxNQUFNO0FBQ2QsUUFBSSxjQUFjO0FBQ2xCLFVBQU0sYUFBYSxJQUFJLGdCQUFnQjtBQUV2QyxVQUFNLGlCQUFpQixZQUFZO0FBQ2pDLDBCQUFvQixJQUFJO0FBQ3hCLDBCQUFvQixFQUFFO0FBQ3RCLHNCQUFnQixFQUFFO0FBRWxCLFVBQUk7QUFDRixjQUFNLFdBQVcsTUFBTSwwQkFBMEI7QUFBQSxVQUMvQyx5QkFBeUI7QUFBQSxVQUN6QixRQUFRLFdBQVc7QUFBQSxRQUNyQixDQUFDO0FBRUQsWUFBSSxZQUFhO0FBRWpCLFlBQUksQ0FBQyxTQUFTLFNBQVM7QUFDckIscUJBQVcsQ0FBQyxDQUFDO0FBQ2IsOEJBQW9CLFNBQVMsV0FBVyxLQUFLLDJCQUEyQixnQ0FBZ0MsQ0FBQztBQUN6RztBQUFBLFFBQ0Y7QUFFQSxjQUFNLGdCQUFnQixtQkFBbUIsU0FBUyxPQUFPLE1BQU07QUFDL0QsbUJBQVcsYUFBYTtBQUV4QixZQUFJLENBQUMsY0FBYyxRQUFRO0FBQ3pCLDBCQUFnQixTQUFTLFdBQVcsS0FBSyxpQkFBaUIsU0FBUyxDQUFDO0FBQ3BFO0FBQUEsUUFDRjtBQUVBLGNBQU0sZUFBZSxTQUFTO0FBQzlCLGNBQU0sbUJBQW1CLGNBQWMsS0FBSyxDQUFDLFdBQVdBLHVCQUFzQixPQUFPLEtBQUssTUFBTSxZQUFZO0FBQzVHLFlBQUksZ0JBQWdCLGtCQUFrQjtBQUNwQztBQUFBLFFBQ0Y7QUFFQSxZQUFJLENBQUMsZ0JBQWdCLG9DQUFvQyxDQUFDLHlCQUF5QixTQUFTO0FBQzFGLGdCQUFNLHNCQUFzQkE7QUFBQSxZQUMxQixNQUFNLG1DQUFtQztBQUFBLGNBQ3ZDLHlCQUF5QjtBQUFBLGNBQ3pCLFFBQVEsV0FBVztBQUFBLFlBQ3JCLENBQUM7QUFBQSxVQUNIO0FBRUEsY0FBSSxZQUFhO0FBRWpCLGNBQUksdUJBQXVCLGNBQWMsS0FBSyxDQUFDLFdBQVdBLHVCQUFzQixPQUFPLEtBQUssTUFBTSxtQkFBbUIsR0FBRztBQUN0SCxxQ0FBeUIsVUFBVTtBQUNuQyx3QkFBWSxRQUFRLG1CQUFtQjtBQUFBLFVBQ3pDO0FBQUEsUUFDRjtBQUFBLE1BQ0YsU0FBUyxPQUFPO0FBQ2QsWUFBSSxZQUFhO0FBQ2pCLFlBQUksaUJBQWlCLGdCQUFnQixNQUFNLFNBQVMsYUFBYztBQUVsRSxjQUFNLGdCQUFnQixLQUFLLDJCQUEyQixnQ0FBZ0M7QUFDdEYsY0FBTSxVQUFVLGlCQUFpQixnQkFBZ0IsTUFBTSxXQUFXLGdCQUFnQjtBQUNsRixtQkFBVyxDQUFDLENBQUM7QUFDYiw0QkFBb0IsT0FBTztBQUFBLE1BQzdCLFVBQUU7QUFDQSxZQUFJLENBQUMsYUFBYTtBQUNoQiw4QkFBb0IsS0FBSztBQUFBLFFBQzNCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxTQUFLLGVBQWU7QUFFcEIsV0FBTyxNQUFNO0FBQ1gsb0JBQWM7QUFDZCxpQkFBVyxNQUFNO0FBQUEsSUFDbkI7QUFBQSxFQUNGLEdBQUcsQ0FBQyxRQUFRLGdDQUFnQyxDQUFDO0FBRTdDLFFBQU0sc0JBQWtCLHVCQUFRLE1BQU1BLHVCQUFzQixLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDM0UsUUFBTSx1QkFBdUIsQ0FBQyxvQkFBb0IsQ0FBQyxvQkFBb0IsUUFBUSxXQUFXO0FBQzFGLFFBQU0sb0JBQW9CLFlBQVk7QUFDdEMsUUFBTSxpQkFBaUIsS0FBSyxrQkFBa0IsU0FBUztBQUV2RCxTQUNFLDhDQUFDLFNBQUksV0FBVSxlQUNiO0FBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBLE9BQU87QUFBQSxRQUNQLFVBQVUsQ0FBQyxjQUFjLFNBQVNBLHVCQUFzQixTQUFTLENBQUM7QUFBQSxRQUNsRTtBQUFBLFFBQ0EsVUFBVTtBQUFBLFFBQ1YsZ0JBQWM7QUFBQSxRQUNkLGtCQUFrQjtBQUFBLFFBQ2xCO0FBQUEsUUFDQSxXQUFXO0FBQUEsUUFDWDtBQUFBLFFBQ0EsaUJBQWdCO0FBQUEsUUFDaEIsZ0JBQWU7QUFBQTtBQUFBLElBQ2pCO0FBQUEsSUFDQyxtQkFBbUIsNkNBQUMsT0FBRSxXQUFVLDBCQUEwQiwwQkFBZSxJQUFPO0FBQUEsSUFDaEYsQ0FBQyxvQkFBb0IsbUJBQW1CLDZDQUFDLE9BQUUsV0FBVSx1QkFBdUIsNEJBQWlCLElBQU87QUFBQSxJQUNwRyxDQUFDLG9CQUFvQixDQUFDLG9CQUFvQixlQUFlLDZDQUFDLE9BQUUsV0FBVSwwQkFBMEIsd0JBQWEsSUFBTztBQUFBLEtBQ3ZIO0FBRUo7QUFFQSxJQUFPLHNDQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJub3JtYWxpemVDdXJyZW5jeUNvZGUiXQp9Cg==
