import {
  SelectCombobox_default
} from "./chunk-XULPHUDU.js";
import {
  getExpenseSheetCurrencies,
  getExpenseSheetDefaultCurrencyCode
} from "./chunk-BHWLMLZA.js";
import {
  ApiFetchError,
  indT
} from "./chunk-U25S3E2U.js";
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

// Web/wwwroot/react/src/pages/gastos/components/ExpenseCurrencyFlagIcon.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
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
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "span",
      {
        "aria-hidden": "true",
        className: `inline-flex items-center justify-center rounded-lg text-[10px] font-semibold leading-none text-slate-500 ${sizeClassName} ${className}`.trim(),
        children: "$"
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
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
      icon: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExpenseCurrencyFlagIcon_default, { currencyCode: effectiveIsoCode, sizeClassName: CURRENCY_FLAG_SIZE_CLASS })
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
    isLoadingOptions ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-xs text-slate-500", children: loadingMessage }) : null,
    !isLoadingOptions && loadErrorMessage ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-xs text-danger", children: loadErrorMessage }) : null,
    !isLoadingOptions && !loadErrorMessage && emptyMessage ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-xs text-slate-500", children: emptyMessage }) : null
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
  ExpenseCurrencyFilterSelect_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb25zdGFudHMvZXhwZW5zZVN0YXR1c0NhdGFsb2cudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VDdXJyZW5jeUZsYWdJY29uLnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XG5cbnR5cGUgRXhwZW5zZVN0YXR1c1VpTWV0YSA9IHtcbiAgbGFiZWxLZXk6IHN0cmluZztcbiAgZmFsbGJhY2s6IHN0cmluZztcbiAgY29sb3JIZXg6IHN0cmluZztcbiAgYmFkZ2VDbGFzc05hbWU6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0VYUEVOU0VfU1RBVFVTX0ZJTFRFUjogRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGUgPSA1O1xuY29uc3QgRVhQRU5TRV9TVEFUVVNfQ09ERVM6IEV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlW10gPSBbNSwgMCwgMSwgMiwgMywgNF07XG5jb25zdCBFWFBFTlNFX1NIRUVUX1NUQVRVU19DT0RFUzogRXhwZW5zZVN0YXR1c0ZpbHRlckNvZGVbXSA9IFswLCAxLCAyLCAzLCA0XTtcblxuY29uc3QgU1RBVFVTX1VJX0JZX0NPREU6IFJlY29yZDxFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSwgRXhwZW5zZVN0YXR1c1VpTWV0YT4gPSB7XG4gIDA6IHtcbiAgICBsYWJlbEtleTogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TdGF0dXNfRHJhZnRcIixcbiAgICBmYWxsYmFjazogXCJCb3JyYWRvclwiLFxuICAgIGNvbG9ySGV4OiBcIiM5NGEzYjhcIixcbiAgICBiYWRnZUNsYXNzTmFtZTogXCJleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cyBleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cy0tZHJhZnRcIixcbiAgfSxcbiAgMToge1xuICAgIGxhYmVsS2V5OiBcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1N0YXR1c19JblJldmlld1wiLFxuICAgIGZhbGxiYWNrOiBcIkFwcm9iYWNpb24gc29saWNpdGFkYVwiLFxuICAgIGNvbG9ySGV4OiBcIiNmNTllMGJcIixcbiAgICBiYWRnZUNsYXNzTmFtZTogXCJleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cyBleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cy0tcmV2aWV3XCIsXG4gIH0sXG4gIDI6IHtcbiAgICBsYWJlbEtleTogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TdGF0dXNfQXBwcm92ZWRcIixcbiAgICBmYWxsYmFjazogXCJBcHJvYmFkb1wiLFxuICAgIGNvbG9ySGV4OiBcIiMyMmM1NWVcIixcbiAgICBiYWRnZUNsYXNzTmFtZTogXCJleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cyBleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cy0tYXBwcm92ZWRcIixcbiAgfSxcbiAgMzoge1xuICAgIGxhYmVsS2V5OiBcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1N0YXR1c19SZWplY3RlZFwiLFxuICAgIGZhbGxiYWNrOiBcIlJlY2hhemFkb1wiLFxuICAgIGNvbG9ySGV4OiBcIiNlZjQ0NDRcIixcbiAgICBiYWRnZUNsYXNzTmFtZTogXCJleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cyBleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cy0tcmVqZWN0ZWRcIixcbiAgfSxcbiAgNDoge1xuICAgIGxhYmVsS2V5OiBcIkV4cGVuc2VTaGVldHNfRmlsdGVyX1N0YXR1c19QYWlkXCIsXG4gICAgZmFsbGJhY2s6IFwiUGFnYWRvXCIsXG4gICAgY29sb3JIZXg6IFwiIzAwMjk2YlwiLFxuICAgIGJhZGdlQ2xhc3NOYW1lOiBcImV4cGVuc2Utc2hlZXQtY2FyZF9fc3RhdHVzIGV4cGVuc2Utc2hlZXQtY2FyZF9fc3RhdHVzLS1wYWlkXCIsXG4gIH0sXG4gIDU6IHtcbiAgICBsYWJlbEtleTogXCJFeHBlbnNlU2hlZXRzX0ZpbHRlcl9TdGF0dXNfQWxsXCIsXG4gICAgZmFsbGJhY2s6IFwiVG9kb3NcIixcbiAgICBjb2xvckhleDogXCIjNjQ3NDhiXCIsXG4gICAgYmFkZ2VDbGFzc05hbWU6IFwiZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMgZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMtLWFsbFwiLFxuICB9LFxufTtcblxuLy8gTm9ybWFsaXplcyBhbnkgdW5rbm93biBzdGF0dXMgZmlsdGVyIHZhbHVlIHRvIGEgc2FmZSBsaXN0IGZpbHRlciBjb2RlLlxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlID0gKFxuICB2YWx1ZTogdW5rbm93bixcbiAgZmFsbGJhY2s6IEV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlID0gREVGQVVMVF9FWFBFTlNFX1NUQVRVU19GSUxURVJcbik6IEV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlID0+IHtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgaWYgKHBhcnNlZCA+PSAwICYmIHBhcnNlZCA8PSA1KSB7XG4gICAgcmV0dXJuIHBhcnNlZCBhcyBFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZTtcbiAgfVxuICByZXR1cm4gZmFsbGJhY2s7XG59O1xuXG4vLyBCdWlsZHMgZml4ZWQgc3RhdHVzIGZpbHRlciBvcHRpb25zIGZvciB0aGUgZXhwZW5zZSBsaXN0IGZpbHRlciBwYW5lbC5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlU3RhdHVzRmlsdGVyT3B0aW9ucyA9ICgpOiBFeHBlbnNlU2VsZWN0T3B0aW9uW10gPT4ge1xuICByZXR1cm4gRVhQRU5TRV9TVEFUVVNfQ09ERVNcbiAgICAubWFwKChjb2RlKSA9PiB7XG4gICAgICBjb25zdCBtZXRhID0gU1RBVFVTX1VJX0JZX0NPREVbY29kZV07XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogU3RyaW5nKGNvZGUpLFxuICAgICAgICB0ZXh0OiBpbmRUKG1ldGEubGFiZWxLZXksIG1ldGEuZmFsbGJhY2spLFxuICAgICAgfTtcbiAgICB9KTtcbn07XG5cbi8vIEJ1aWxkcyBmaXhlZCBzdGF0dXMgb3B0aW9ucyBmb3IgZXhwZW5zZSBzaGVldCBzdGF0ZSB1cGRhdGVzICh3aXRob3V0IFwiYWxsXCIpLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTaGVldFN0YXR1c09wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcbiAgcmV0dXJuIEVYUEVOU0VfU0hFRVRfU1RBVFVTX0NPREVTLm1hcCgoY29kZSkgPT4ge1xuICAgIGNvbnN0IG1ldGEgPSBTVEFUVVNfVUlfQllfQ09ERVtjb2RlXTtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IFN0cmluZyhjb2RlKSxcbiAgICAgIHRleHQ6IGluZFQobWV0YS5sYWJlbEtleSwgbWV0YS5mYWxsYmFjayksXG4gICAgfTtcbiAgfSk7XG59O1xuXG4vLyBSZXR1cm5zIHRoZSBsb2NhbGl6ZWQgc3RhdHVzIGxhYmVsIGZvciBmaWx0ZXIgc3VtbWFyaWVzIGFuZCBiYWRnZXMuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVN0YXR1c0xhYmVsID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUV4cGVuc2VTdGF0dXNGaWx0ZXJDb2RlKHZhbHVlKTtcbiAgY29uc3QgbWV0YSA9IFNUQVRVU19VSV9CWV9DT0RFW25vcm1hbGl6ZWRdO1xuICByZXR1cm4gaW5kVChtZXRhLmxhYmVsS2V5LCBtZXRhLmZhbGxiYWNrKTtcbn07XG5cbi8vIFJldHVybnMgdGhlIGNvbG9yIHRva2VuIGZvciBVSSBlbGVtZW50cyB0aGF0IHJlcHJlc2VudCBhIHN0YXR1cyBjb2RlLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTdGF0dXNDb2xvckhleCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSh2YWx1ZSk7XG4gIHJldHVybiBTVEFUVVNfVUlfQllfQ09ERVtub3JtYWxpemVkXS5jb2xvckhleDtcbn07XG5cbi8vIFJldHVybnMgdGhlIGRlZmF1bHQgYmFkZ2UgY2xhc3MgbmFtZSB1c2VkIGJ5IHRpbWVsaW5lIGNhcmRzLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTdGF0dXNCYWRnZUNsYXNzTmFtZSA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVFeHBlbnNlU3RhdHVzRmlsdGVyQ29kZSh2YWx1ZSk7XG4gIHJldHVybiBTVEFUVVNfVUlfQllfQ09ERVtub3JtYWxpemVkXS5iYWRnZUNsYXNzTmFtZTtcbn07XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBFeHBlbnNlQ3VycmVuY3lGbGFnSWNvblByb3BzID0ge1xuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBzaXplQ2xhc3NOYW1lPzogc3RyaW5nO1xufTtcblxuY29uc3Qgbm9ybWFsaXplQ3VycmVuY3lDb2RlID0gKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcbn07XG5cbi8vIFJlbmRlcnMgYSBjdXJyZW5jeSBmbGFnIGZyb20gbG9jYWwgYXNzZXRzIHdpdGggYSBzdGFibGUgZmFsbGJhY2sgaWNvbi5cbmNvbnN0IEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uID0gKHsgY3VycmVuY3lDb2RlLCBjbGFzc05hbWUgPSBcIlwiLCBzaXplQ2xhc3NOYW1lID0gXCJoLTQgdy00XCIgfTogRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb25Qcm9wcykgPT4ge1xuICBjb25zdCBub3JtYWxpemVkQ29kZSA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShjdXJyZW5jeUNvZGUpO1xuICBjb25zdCBbbG9hZEZhaWxlZCwgc2V0TG9hZEZhaWxlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRMb2FkRmFpbGVkKGZhbHNlKTtcbiAgfSwgW25vcm1hbGl6ZWRDb2RlXSk7XG5cbiAgaWYgKCFub3JtYWxpemVkQ29kZSB8fCBsb2FkRmFpbGVkKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuXG4gICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgIGNsYXNzTmFtZT17YGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLWxnIHRleHQtWzEwcHhdIGZvbnQtc2VtaWJvbGQgbGVhZGluZy1ub25lIHRleHQtc2xhdGUtNTAwICR7c2l6ZUNsYXNzTmFtZX0gJHtjbGFzc05hbWV9YC50cmltKCl9XG4gICAgICA+XG4gICAgICAgICRcbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8aW1nXG4gICAgICBzcmM9e2AvYXNzZXRzL2ZsYWdzLyR7ZW5jb2RlVVJJQ29tcG9uZW50KG5vcm1hbGl6ZWRDb2RlKX0uc3ZnYH1cbiAgICAgIGFsdD1cIlwiXG4gICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgbG9hZGluZz1cImxhenlcIlxuICAgICAgY2xhc3NOYW1lPXtgJHtzaXplQ2xhc3NOYW1lfSByb3VuZGVkLWxnIG9iamVjdC1jb250YWluICR7Y2xhc3NOYW1lfWAudHJpbSgpfVxuICAgICAgb25FcnJvcj17KCkgPT4gc2V0TG9hZEZhaWxlZCh0cnVlKX1cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb247XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0byB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGdldEV4cGVuc2VTaGVldEN1cnJlbmNpZXMsIGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24udHN4XCI7XG5cbnR5cGUgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG4gIGlkQmFzZT86IHN0cmluZztcbiAgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHQ/OiBib29sZWFuO1xufTtcblxuY29uc3Qgbm9ybWFsaXplQ3VycmVuY3lDb2RlID0gKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcbn07XG5cbmNvbnN0IENVUlJFTkNZX0ZMQUdfU0laRV9DTEFTUyA9IFwiaC02IHctNlwiO1xuY29uc3QgQ1VSUkVOQ1lfRFJPUERPV05fUEFORUxfQ0xBU1MgPSBcInZpc2l0YXMtdHlwb2dyYXBoeSByaW5nLVsjQTlCOENDXS83MFwiO1xuY29uc3QgQ1VSUkVOQ1lfRFJPUERPV05fUEFORUxfU1RZTEU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPSB7XG4gIGJhY2tncm91bmRDb2xvcjogXCIjRENFM0VEXCIsXG4gIGJvcmRlcjogXCIxcHggc29saWQgI0E5QjhDQ1wiLFxuICBib3hTaGFkb3c6IFwiMCAxMHB4IDI0cHggcmdiYSgxNSwgNDEsIDY5LCAwLjE0KVwiLFxufTtcbmNvbnN0IENVUlJFTkNZX09QVElPTl9ERUZBVUxUX0NMQVNTID0gXCJ0ZXh0LVsjMEYyOTQ1XVwiO1xuY29uc3QgQ1VSUkVOQ1lfT1BUSU9OX0FDVElWRV9DTEFTUyA9IFwiYmctWyNDNkQyRTNdIHRleHQtWyMwRjI5NDVdXCI7XG5jb25zdCBDVVJSRU5DWV9PUFRJT05fU0VMRUNURURfQ0xBU1MgPSBcImJnLXByaW1hcnkgdGV4dC13aGl0ZVwiO1xuXG5jb25zdCByZWFkUHJlZmVycmVkTG9jYWxlID0gKCk6IHN0cmluZyA9PiB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjb25zdCBmcm9tRG9jdW1lbnQgPSBTdHJpbmcoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBpZiAoZnJvbURvY3VtZW50KSByZXR1cm4gZnJvbURvY3VtZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjb25zdCBmcm9tTmF2aWdhdG9yID0gU3RyaW5nKG5hdmlnYXRvci5sYW5ndWFnZSB8fCBcIlwiKS50cmltKCk7XG4gICAgaWYgKGZyb21OYXZpZ2F0b3IpIHJldHVybiBmcm9tTmF2aWdhdG9yO1xuICB9XG5cbiAgcmV0dXJuIFwiZW5cIjtcbn07XG5cbi8vIFJlc29sdmVzIGEgbG9jYWxpemVkIGN1cnJlbmN5IGRpc3BsYXkgbmFtZSB3aGVuIEludGwuRGlzcGxheU5hbWVzIGlzIGF2YWlsYWJsZS5cbmNvbnN0IHJlc29sdmVDdXJyZW5jeURpc3BsYXlOYW1lID0gKGN1cnJlbmN5Q29kZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRDb2RlID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKGN1cnJlbmN5Q29kZSk7XG4gIGlmICghbm9ybWFsaXplZENvZGUpIHJldHVybiBcIlwiO1xuXG4gIGNvbnN0IGludGxXaXRoRGlzcGxheU5hbWVzID0gSW50bCBhcyB0eXBlb2YgSW50bCAmIHtcbiAgICBEaXNwbGF5TmFtZXM/OiBuZXcgKFxuICAgICAgbG9jYWxlcz86IHN0cmluZyB8IHN0cmluZ1tdLFxuICAgICAgb3B0aW9ucz86IHsgdHlwZTogXCJjdXJyZW5jeVwiIH1cbiAgICApID0+IHsgb2Y6ICh2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmcgfCB1bmRlZmluZWQgfTtcbiAgfTtcblxuICBpZiAodHlwZW9mIGludGxXaXRoRGlzcGxheU5hbWVzLkRpc3BsYXlOYW1lcyAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gXCJcIjtcblxuICB0cnkge1xuICAgIGNvbnN0IGRpc3BsYXlOYW1lcyA9IG5ldyBpbnRsV2l0aERpc3BsYXlOYW1lcy5EaXNwbGF5TmFtZXMoW2xvY2FsZSwgXCJlblwiXSwgeyB0eXBlOiBcImN1cnJlbmN5XCIgfSk7XG4gICAgY29uc3QgbG9jYWxpemVkTmFtZSA9IFN0cmluZyhkaXNwbGF5TmFtZXMub2Yobm9ybWFsaXplZENvZGUpIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBpZiAoIWxvY2FsaXplZE5hbWUpIHJldHVybiBcIlwiO1xuXG4gICAgY29uc3Qgbm9ybWFsaXplZE5hbWUgPSBsb2NhbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZWROYW1lID09PSBub3JtYWxpemVkQ29kZSA/IFwiXCIgOiBsb2NhbGl6ZWROYW1lO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxufTtcblxuY29uc3QgbWFwQ3VycmVuY3lPcHRpb25zID0gKGl0ZW1zOiBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0b1tdIHwgdW5kZWZpbmVkLCBsb2NhbGU6IHN0cmluZyk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XG4gIGNvbnN0IHNvdXJjZSA9IEFycmF5LmlzQXJyYXkoaXRlbXMpID8gaXRlbXMgOiBbXTtcbiAgY29uc3Qgc2VlbkNvZGVzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgcmV0dXJuIHNvdXJjZVxuICAgIC5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW5jeUNvZGVJc28gPSBub3JtYWxpemVDdXJyZW5jeUNvZGUoZW50cnk/LkN1cnJlbmN5Q29kZUlTTyk7XG4gICAgICBjb25zdCBlZmZlY3RpdmVJc29Db2RlID0gY3VycmVuY3lDb2RlSXNvIHx8IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShlbnRyeT8uQ3VycmVuY3lDb2RlKTtcbiAgICAgIGlmICghZWZmZWN0aXZlSXNvQ29kZSkgcmV0dXJuIG51bGw7XG4gICAgICBpZiAoc2VlbkNvZGVzLmhhcyhlZmZlY3RpdmVJc29Db2RlKSkgcmV0dXJuIG51bGw7XG4gICAgICBzZWVuQ29kZXMuYWRkKGVmZmVjdGl2ZUlzb0NvZGUpO1xuXG4gICAgICBjb25zdCBkaXNwbGF5TmFtZSA9IHJlc29sdmVDdXJyZW5jeURpc3BsYXlOYW1lKGVmZmVjdGl2ZUlzb0NvZGUsIGxvY2FsZSk7XG4gICAgICBjb25zdCBvcHRpb25MYWJlbCA9IGRpc3BsYXlOYW1lID8gYCR7ZWZmZWN0aXZlSXNvQ29kZX0gJHtkaXNwbGF5TmFtZX1gIDogZWZmZWN0aXZlSXNvQ29kZTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IGVmZmVjdGl2ZUlzb0NvZGUsXG4gICAgICAgIHRleHQ6IG9wdGlvbkxhYmVsLFxuICAgICAgICBpY29uOiA8RXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gY3VycmVuY3lDb2RlPXtlZmZlY3RpdmVJc29Db2RlfSBzaXplQ2xhc3NOYW1lPXtDVVJSRU5DWV9GTEFHX1NJWkVfQ0xBU1N9IC8+LFxuICAgICAgfSBhcyBFeHBlbnNlU2VsZWN0T3B0aW9uO1xuICAgIH0pXG4gICAgLmZpbHRlcigoZW50cnkpOiBlbnRyeSBpcyBFeHBlbnNlU2VsZWN0T3B0aW9uID0+IGVudHJ5ICE9PSBudWxsKTtcbn07XG5cbi8vIFNoYXJlZCBjdXJyZW5jeSBjb21ib2JveCBiYWNrZWQgYnkgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9jdXJyZW5jaWVzLlxuY29uc3QgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHNob3dMYWJlbCA9IHRydWUsXG4gIGlkQmFzZSA9IFwiZXhwZW5zZS1jdXJyZW5jeVwiLFxuICBwcmVmZXJEZWZhdWx0Q3VycmVuY3lGcm9tQ29udGV4dCA9IGZhbHNlLFxufTogRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0UHJvcHMpID0+IHtcbiAgY29uc3QgbG9jYWxlID0gdXNlTWVtbygoKSA9PiByZWFkUHJlZmVycmVkTG9jYWxlKCksIFtdKTtcbiAgY29uc3QgW29wdGlvbnMsIHNldE9wdGlvbnNdID0gdXNlU3RhdGU8RXhwZW5zZVNlbGVjdE9wdGlvbltdPihbXSk7XG4gIGNvbnN0IFtpc0xvYWRpbmdPcHRpb25zLCBzZXRJc0xvYWRpbmdPcHRpb25zXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2xvYWRFcnJvck1lc3NhZ2UsIHNldExvYWRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtlbXB0eU1lc3NhZ2UsIHNldEVtcHR5TWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3Qgb25DaGFuZ2VSZWYgPSB1c2VSZWYob25DaGFuZ2UpO1xuICBjb25zdCB2YWx1ZVJlZiA9IHVzZVJlZihub3JtYWxpemVDdXJyZW5jeUNvZGUodmFsdWUpKTtcbiAgY29uc3QgaW5pdGlhbERlZmF1bHRBcHBsaWVkUmVmID0gdXNlUmVmKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQgPSBvbkNoYW5nZTtcbiAgfSwgW29uQ2hhbmdlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB2YWx1ZVJlZi5jdXJyZW50ID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKHZhbHVlKTtcbiAgfSwgW3ZhbHVlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgaXNDYW5jZWxsZWQgPSBmYWxzZTtcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gICAgY29uc3QgbG9hZEN1cnJlbmNpZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgICBzZXRJc0xvYWRpbmdPcHRpb25zKHRydWUpO1xuICAgICAgc2V0TG9hZEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICAgIHNldEVtcHR5TWVzc2FnZShcIlwiKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRFeHBlbnNlU2hlZXRDdXJyZW5jaWVzKHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgICBzZXRPcHRpb25zKFtdKTtcbiAgICAgICAgICBzZXRMb2FkRXJyb3JNZXNzYWdlKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldHMuXCIpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtYXBwZWRPcHRpb25zID0gbWFwQ3VycmVuY3lPcHRpb25zKHJlc3BvbnNlLkl0ZW1zLCBsb2NhbGUpO1xuICAgICAgICBzZXRPcHRpb25zKG1hcHBlZE9wdGlvbnMpO1xuXG4gICAgICAgIGlmICghbWFwcGVkT3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICBzZXRFbXB0eU1lc3NhZ2UocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX05vRGF0YVwiLCBcIk5vIGRhdGFcIikpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHZhbHVlUmVmLmN1cnJlbnQ7XG4gICAgICAgIGNvbnN0IGhhc0N1cnJlbnRJbkxpc3QgPSBtYXBwZWRPcHRpb25zLnNvbWUoKG9wdGlvbikgPT4gbm9ybWFsaXplQ3VycmVuY3lDb2RlKG9wdGlvbi52YWx1ZSkgPT09IGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgJiYgaGFzQ3VycmVudEluTGlzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY3VycmVudFZhbHVlICYmIHByZWZlckRlZmF1bHRDdXJyZW5jeUZyb21Db250ZXh0ICYmICFpbml0aWFsRGVmYXVsdEFwcGxpZWRSZWYuY3VycmVudCkge1xuICAgICAgICAgIGNvbnN0IGRlZmF1bHRDdXJyZW5jeUNvZGUgPSBub3JtYWxpemVDdXJyZW5jeUNvZGUoXG4gICAgICAgICAgICBhd2FpdCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlKHtcbiAgICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcblxuICAgICAgICAgIGlmIChkZWZhdWx0Q3VycmVuY3lDb2RlICYmIG1hcHBlZE9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiBub3JtYWxpemVDdXJyZW5jeUNvZGUob3B0aW9uLnZhbHVlKSA9PT0gZGVmYXVsdEN1cnJlbmN5Q29kZSkpIHtcbiAgICAgICAgICAgIGluaXRpYWxEZWZhdWx0QXBwbGllZFJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQoZGVmYXVsdEN1cnJlbmN5Q29kZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgZmFsbGJhY2tFcnJvciA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXRzLlwiKTtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciA/IGVycm9yLm1lc3NhZ2UgfHwgZmFsbGJhY2tFcnJvciA6IGZhbGxiYWNrRXJyb3I7XG4gICAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgICBzZXRMb2FkRXJyb3JNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKCFpc0NhbmNlbGxlZCkge1xuICAgICAgICAgIHNldElzTG9hZGluZ09wdGlvbnMoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZvaWQgbG9hZEN1cnJlbmNpZXMoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpc0NhbmNlbGxlZCA9IHRydWU7XG4gICAgICBjb250cm9sbGVyLmFib3J0KCk7XG4gICAgfTtcbiAgfSwgW2xvY2FsZSwgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHRdKTtcblxuICBjb25zdCBub3JtYWxpemVkVmFsdWUgPSB1c2VNZW1vKCgpID0+IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSh2YWx1ZSksIFt2YWx1ZV0pO1xuICBjb25zdCBkaXNhYmxlQmVjYXVzZU5vRGF0YSA9ICFpc0xvYWRpbmdPcHRpb25zICYmICFsb2FkRXJyb3JNZXNzYWdlICYmIG9wdGlvbnMubGVuZ3RoID09PSAwO1xuICBjb25zdCBlZmZlY3RpdmVEaXNhYmxlZCA9IGRpc2FibGVkIHx8IGRpc2FibGVCZWNhdXNlTm9EYXRhO1xuICBjb25zdCBsb2FkaW5nTWVzc2FnZSA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XG4gICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgIG9wdGlvbnM9e29wdGlvbnN9XG4gICAgICAgIHZhbHVlPXtub3JtYWxpemVkVmFsdWV9XG4gICAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiBvbkNoYW5nZShub3JtYWxpemVDdXJyZW5jeUNvZGUobmV4dFZhbHVlKSl9XG4gICAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgICAgZGlzYWJsZWQ9e2VmZmVjdGl2ZURpc2FibGVkfVxuICAgICAgICBhbGxvd1RleHRJbnB1dFxuICAgICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cbiAgICAgICAgc2hvd0xhYmVsPXtzaG93TGFiZWx9XG4gICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XG4gICAgICAgIHNlbGVjdGVkVGV4dE1vZGU9XCJ2YWx1ZVwiXG4gICAgICAgIGRyb3Bkb3duTWF4SGVpZ2h0Q2xhc3M9XCJtYXgtaC05NlwiXG4gICAgICAgIHNlbGVjdGVkSWNvbkNsYXNzTmFtZT17Q1VSUkVOQ1lfRkxBR19TSVpFX0NMQVNTfVxuICAgICAgICBzZWxlY3RlZElucHV0UGFkZGluZ0NsYXNzTmFtZT1cInBsLTEyXCJcbiAgICAgICAgY2xlYXJPbkVtcHR5SW5wdXRcbiAgICAgICAgb3B0aW9uSWNvbkNsYXNzTmFtZT17Q1VSUkVOQ1lfRkxBR19TSVpFX0NMQVNTfVxuICAgICAgICBhbGxvd09wdGlvbkhvcml6b250YWxTY3JvbGxcbiAgICAgICAgbG9ja0Ryb3Bkb3duV2lkdGhPbkZpcnN0T3BlblxuICAgICAgICBkaXNhYmxlRGVmYXVsdE9wdGlvblBhZGRpbmdcbiAgICAgICAgb3B0aW9uTGVmdFBhZGRpbmdDbGFzc05hbWU9XCJwbC0xXCJcbiAgICAgICAgb3B0aW9uRGVmYXVsdENsYXNzTmFtZT17Q1VSUkVOQ1lfT1BUSU9OX0RFRkFVTFRfQ0xBU1N9XG4gICAgICAgIG9wdGlvbkFjdGl2ZUNsYXNzTmFtZT17Q1VSUkVOQ1lfT1BUSU9OX0FDVElWRV9DTEFTU31cbiAgICAgICAgb3B0aW9uU2VsZWN0ZWRDbGFzc05hbWU9e0NVUlJFTkNZX09QVElPTl9TRUxFQ1RFRF9DTEFTU31cbiAgICAgICAgaWRCYXNlPXtpZEJhc2V9XG4gICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgICAgIHBhbmVsQ2xhc3NOYW1lPXtDVVJSRU5DWV9EUk9QRE9XTl9QQU5FTF9DTEFTU31cbiAgICAgICAgcGFuZWxTdHlsZT17Q1VSUkVOQ1lfRFJPUERPV05fUEFORUxfU1RZTEV9XG4gICAgICAvPlxuICAgICAge2lzTG9hZGluZ09wdGlvbnMgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwXCI+e2xvYWRpbmdNZXNzYWdlfTwvcD4gOiBudWxsfVxuICAgICAgeyFpc0xvYWRpbmdPcHRpb25zICYmIGxvYWRFcnJvck1lc3NhZ2UgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtZGFuZ2VyXCI+e2xvYWRFcnJvck1lc3NhZ2V9PC9wPiA6IG51bGx9XG4gICAgICB7IWlzTG9hZGluZ09wdGlvbnMgJiYgIWxvYWRFcnJvck1lc3NhZ2UgJiYgZW1wdHlNZXNzYWdlID8gPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMFwiPntlbXB0eU1lc3NhZ2V9PC9wPiA6IG51bGx9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3Q7XG5cclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXTyxJQUFNLGdDQUF5RDtBQUN0RSxJQUFNLHVCQUFrRCxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ3pFLElBQU0sNkJBQXdELENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBRTVFLElBQU0sb0JBQTBFO0FBQUEsRUFDOUUsR0FBRztBQUFBLElBQ0QsVUFBVTtB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
