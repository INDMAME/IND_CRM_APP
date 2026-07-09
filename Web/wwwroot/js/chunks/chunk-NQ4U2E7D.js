import {
  ExpenseCurrencyFlagIcon_default
} from "./chunk-KLQHZ5CJ.js";
import {
  SelectCombobox_default
} from "./chunk-SSILOGLX.js";
import {
  getExpenseSheetCurrencies,
  getExpenseSheetDefaultCurrencyCode
} from "./chunk-63PNSQ5Z.js";
import {
  useAuthContext
} from "./chunk-4B23OARV.js";
import {
  getExpenseScopeToken
} from "./chunk-UYN2TXUI.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-2NKOKBT5.js";
import {
  ApiFetchError,
  indT
} from "./chunk-PNIKV5DC.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/pages/gastos/components/ExpenseCurrencyFilterSelect.tsx
var import_react = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/utils/expenseCurrencyRecents.ts
var RECENT_CURRENCY_STORAGE_KEY_PREFIX = "expense_recent_currencies_v1";
var MAX_RECENT_CURRENCY_CODES = 6;
var normalizeCurrencyCode = (value) => String(value || "").trim().toUpperCase();
var normalizeStorageKeyPart = (value) => {
  const normalized = String(value || "").trim();
  return normalized.replace(/[^a-z0-9_-]+/gi, "_").replace(/^_+|_+$/g, "") || "default";
};
var readStorage = () => {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
};
var buildRecentCurrencyStorageKey = (userScope) => {
  const expenseScope = normalizeStorageKeyPart(getExpenseScopeToken());
  const userKey = normalizeStorageKeyPart(userScope);
  return `${RECENT_CURRENCY_STORAGE_KEY_PREFIX}_${expenseScope}_${userKey}`;
};
var normalizeRecentCurrencyCodes = (source) => {
  const items = Array.isArray(source) ? source : [];
  const seen = /* @__PURE__ */ new Set();
  return items.map((item) => normalizeCurrencyCode(item)).filter((code) => {
    if (!code || seen.has(code)) return false;
    seen.add(code);
    return true;
  }).slice(0, MAX_RECENT_CURRENCY_CODES);
};
var compareCurrencyOptions = (locale) => (left, right) => {
  const textComparison = left.text.localeCompare(right.text, [locale, "en"], { sensitivity: "base" });
  if (textComparison !== 0) return textComparison;
  return left.value.localeCompare(right.value, "en", { sensitivity: "base" });
};
var readRecentExpenseCurrencyCodes = (userScope = "") => {
  const storage = readStorage();
  if (!storage) return [];
  try {
    return normalizeRecentCurrencyCodes(JSON.parse(storage.getItem(buildRecentCurrencyStorageKey(userScope)) || "[]"));
  } catch {
    return [];
  }
};
var rememberRecentExpenseCurrencyCode = (currencyCode, userScope = "") => {
  const normalizedCode = normalizeCurrencyCode(currencyCode);
  if (!normalizedCode) return readRecentExpenseCurrencyCodes(userScope);
  const nextCodes = [
    normalizedCode,
    ...readRecentExpenseCurrencyCodes(userScope).filter((code) => code !== normalizedCode)
  ].slice(0, MAX_RECENT_CURRENCY_CODES);
  const storage = readStorage();
  if (!storage) return nextCodes;
  try {
    storage.setItem(buildRecentCurrencyStorageKey(userScope), JSON.stringify(nextCodes));
  } catch {
  }
  return nextCodes;
};
var orderExpenseCurrencyOptionsByRecency = (options, recentCurrencyCodes, locale) => {
  const optionByCode = /* @__PURE__ */ new Map();
  options.forEach((option) => {
    const normalizedCode = normalizeCurrencyCode(option.value);
    if (normalizedCode && !optionByCode.has(normalizedCode)) {
      optionByCode.set(normalizedCode, option);
    }
  });
  const recentOptions = normalizeRecentCurrencyCodes(recentCurrencyCodes).map((code) => optionByCode.get(code)).filter((option) => !!option);
  const recentCodeSet = new Set(recentOptions.map((option) => normalizeCurrencyCode(option.value)));
  const alphabeticalOptions = options.filter((option) => !recentCodeSet.has(normalizeCurrencyCode(option.value))).slice().sort(compareCurrencyOptions(locale));
  return [...recentOptions, ...alphabeticalOptions];
};

// Web/wwwroot/react/src/pages/gastos/components/ExpenseCurrencyFilterSelect.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
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
var CURRENCY_OPTION_SELECTED_CLASS = "text-primary";
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
      icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseCurrencyFlagIcon_default, { currencyCode: effectiveIsoCode, sizeClassName: CURRENCY_FLAG_SIZE_CLASS })
    };
  }).filter((entry) => entry !== null);
};
var ExpenseCurrencyFilterSelect = ({
  label,
  placeholder,
  value,
  onChange,
  invalid = false,
  inputRef,
  readOnly = false,
  disabled = false,
  showLabel = true,
  containerClassName,
  labelClassName,
  idBase = "expense-currency",
  preferDefaultCurrencyFromContext = false,
  dropdownExpandPx = 0,
  dropdownMinWidthPx = 320,
  dropdownUseAvailableWidth = true,
  showLoadingStateText = true
}) => {
  const locale = (0, import_react.useMemo)(() => readPreferredLocale(), []);
  const { currentAxUserId, currentCrmUserId } = useAuthContext();
  const recentCurrencyUserScope = [currentAxUserId, currentCrmUserId].map((item) => String(item || "").trim()).filter(Boolean).join("|");
  const [options, setOptions] = (0, import_react.useState)([]);
  const [recentCurrencyCache, setRecentCurrencyCache] = (0, import_react.useState)(() => ({
    userScope: recentCurrencyUserScope,
    codes: readRecentExpenseCurrencyCodes(recentCurrencyUserScope)
  }));
  const [isLoadingOptions, setIsLoadingOptions] = (0, import_react.useState)(false);
  const [loadErrorMessage, setLoadErrorMessage] = (0, import_react.useState)("");
  const [emptyMessage, setEmptyMessage] = (0, import_react.useState)("");
  const onChangeRef = (0, import_react.useRef)(onChange);
  const valueRef = (0, import_react.useRef)(normalizeCurrencyCode2(value));
  const initialDefaultAppliedRef = (0, import_react.useRef)(false);
  (0, import_react.useEffect)(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  (0, import_react.useEffect)(() => {
    valueRef.current = normalizeCurrencyCode2(value);
  }, [value]);
  if (recentCurrencyCache.userScope !== recentCurrencyUserScope) {
    setRecentCurrencyCache({
      userScope: recentCurrencyUserScope,
      codes: readRecentExpenseCurrencyCodes(recentCurrencyUserScope)
    });
  }
  (0, import_react.useEffect)(() => {
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
  const normalizedValue = (0, import_react.useMemo)(() => normalizeCurrencyCode2(value), [value]);
  const orderedOptions = (0, import_react.useMemo)(
    () => orderExpenseCurrencyOptionsByRecency(options, recentCurrencyCache.codes, locale),
    [locale, options, recentCurrencyCache.codes]
  );
  const validCurrencyCodes = (0, import_react.useMemo)(
    () => new Set(
      options.flatMap((option) => {
        const code = normalizeCurrencyCode2(option.value);
        return code ? [code] : [];
      })
    ),
    [options]
  );
  const handleCurrencyChange = (0, import_react.useCallback)(
    (nextValue) => {
      const normalizedNextValue = normalizeCurrencyCode2(nextValue);
      if (normalizedNextValue && validCurrencyCodes.has(normalizedNextValue)) {
        setRecentCurrencyCache({
          userScope: recentCurrencyUserScope,
          codes: rememberRecentExpenseCurrencyCode(normalizedNextValue, recentCurrencyUserScope)
        });
      }
      onChange(normalizedNextValue);
    },
    [onChange, recentCurrencyUserScope, validCurrencyCodes]
  );
  const disableBecauseNoData = !isLoadingOptions && !loadErrorMessage && options.length === 0;
  const effectiveDisabled = disabled || disableBecauseNoData;
  const loadingMessage = indT("Common_Loading", "Loading");
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      SelectCombobox_default,
      {
        label,
        placeholder,
        options: orderedOptions,
        value: normalizedValue,
        onChange: handleCurrencyChange,
        inputRef,
        invalid,
        readOnly,
        disabled: effectiveDisabled,
        allowTextInput: true,
        showSearchButton: false,
        showLabel,
        containerClassName,
        labelClassName,
        usePortal: true,
        selectedTextMode: "value",
        dropdownExpandPx,
        dropdownMinWidthPx,
        dropdownUseAvailableWidth,
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
    showLoadingStateText && isLoadingOptions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xs text-slate-500", children: loadingMessage }) : null,
    !isLoadingOptions && loadErrorMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xs text-danger", children: loadErrorMessage }) : null,
    !isLoadingOptions && !loadErrorMessage && emptyMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xs text-slate-500", children: emptyMessage }) : null
  ] });
};
var ExpenseCurrencyFilterSelect_default = ExpenseCurrencyFilterSelect;

export {
  ExpenseCurrencyFilterSelect_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdC50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlQ3VycmVuY3lSZWNlbnRzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IHsgdXNlQXV0aENvbnRleHQgfSBmcm9tIFwiLi4vLi4vLi4vY29udGV4dC9BdXRoQ29udGV4dC50c3hcIjtcclxuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlU2hlZXRDdXJyZW5jaWVzLCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHtcclxuICBvcmRlckV4cGVuc2VDdXJyZW5jeU9wdGlvbnNCeVJlY2VuY3ksXHJcbiAgcmVhZFJlY2VudEV4cGVuc2VDdXJyZW5jeUNvZGVzLFxyXG4gIHJlbWVtYmVyUmVjZW50RXhwZW5zZUN1cnJlbmN5Q29kZSxcclxufSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUN1cnJlbmN5UmVjZW50cy50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uIGZyb20gXCIuL0V4cGVuc2VDdXJyZW5jeUZsYWdJY29uLnRzeFwiO1xyXG5cclxudHlwZSBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RQcm9wcyA9IHtcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgaW52YWxpZD86IGJvb2xlYW47XHJcbiAgaW5wdXRSZWY/OiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICBzaG93TGFiZWw/OiBib29sZWFuO1xyXG4gIGNvbnRhaW5lckNsYXNzTmFtZT86IHN0cmluZztcclxuICBsYWJlbENsYXNzTmFtZT86IHN0cmluZztcclxuICBpZEJhc2U/OiBzdHJpbmc7XHJcbiAgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHQ/OiBib29sZWFuO1xyXG4gIGRyb3Bkb3duRXhwYW5kUHg/OiBudW1iZXI7XHJcbiAgZHJvcGRvd25NaW5XaWR0aFB4PzogbnVtYmVyO1xyXG4gIGRyb3Bkb3duVXNlQXZhaWxhYmxlV2lkdGg/OiBib29sZWFuO1xyXG4gIHNob3dMb2FkaW5nU3RhdGVUZXh0PzogYm9vbGVhbjtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSA9ICh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcclxufTtcclxuXHJcbmNvbnN0IENVUlJFTkNZX0ZMQUdfU0laRV9DTEFTUyA9IFwiaC02IHctNlwiO1xyXG5jb25zdCBDVVJSRU5DWV9EUk9QRE9XTl9QQU5FTF9DTEFTUyA9IFwidmlzaXRhcy10eXBvZ3JhcGh5IHJpbmctWyNBOUI4Q0NdLzcwXCI7XHJcbmNvbnN0IENVUlJFTkNZX0RST1BET1dOX1BBTkVMX1NUWUxFOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0ge1xyXG4gIGJhY2tncm91bmRDb2xvcjogXCIjRENFM0VEXCIsXHJcbiAgYm9yZGVyOiBcIjFweCBzb2xpZCAjQTlCOENDXCIsXHJcbiAgYm94U2hhZG93OiBcIjAgMTBweCAyNHB4IHJnYmEoMTUsIDQxLCA2OSwgMC4xNClcIixcclxufTtcclxuY29uc3QgQ1VSUkVOQ1lfT1BUSU9OX0RFRkFVTFRfQ0xBU1MgPSBcInRleHQtWyMwRjI5NDVdXCI7XHJcbmNvbnN0IENVUlJFTkNZX09QVElPTl9BQ1RJVkVfQ0xBU1MgPSBcImJnLVsjQzZEMkUzXSB0ZXh0LVsjMEYyOTQ1XVwiO1xyXG5jb25zdCBDVVJSRU5DWV9PUFRJT05fU0VMRUNURURfQ0xBU1MgPSBcInRleHQtcHJpbWFyeVwiO1xyXG5cclxuY29uc3QgcmVhZFByZWZlcnJlZExvY2FsZSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIGNvbnN0IGZyb21Eb2N1bWVudCA9IFN0cmluZyhkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgaWYgKGZyb21Eb2N1bWVudCkgcmV0dXJuIGZyb21Eb2N1bWVudDtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICBjb25zdCBmcm9tTmF2aWdhdG9yID0gU3RyaW5nKG5hdmlnYXRvci5sYW5ndWFnZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgICBpZiAoZnJvbU5hdmlnYXRvcikgcmV0dXJuIGZyb21OYXZpZ2F0b3I7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gXCJlblwiO1xyXG59O1xyXG5cclxuLy8gUmVzb2x2ZXMgYSBsb2NhbGl6ZWQgY3VycmVuY3kgZGlzcGxheSBuYW1lIHdoZW4gSW50bC5EaXNwbGF5TmFtZXMgaXMgYXZhaWxhYmxlLlxyXG5jb25zdCByZXNvbHZlQ3VycmVuY3lEaXNwbGF5TmFtZSA9IChjdXJyZW5jeUNvZGU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRDb2RlID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKGN1cnJlbmN5Q29kZSk7XHJcbiAgaWYgKCFub3JtYWxpemVkQ29kZSkgcmV0dXJuIFwiXCI7XHJcblxyXG4gIGNvbnN0IGludGxXaXRoRGlzcGxheU5hbWVzID0gSW50bCBhcyB0eXBlb2YgSW50bCAmIHtcclxuICAgIERpc3BsYXlOYW1lcz86IG5ldyAoXHJcbiAgICAgIGxvY2FsZXM/OiBzdHJpbmcgfCBzdHJpbmdbXSxcclxuICAgICAgb3B0aW9ucz86IHsgdHlwZTogXCJjdXJyZW5jeVwiIH1cclxuICAgICkgPT4geyBvZjogKHZhbHVlOiBzdHJpbmcpID0+IHN0cmluZyB8IHVuZGVmaW5lZCB9O1xyXG4gIH07XHJcblxyXG4gIGlmICh0eXBlb2YgaW50bFdpdGhEaXNwbGF5TmFtZXMuRGlzcGxheU5hbWVzICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBcIlwiO1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgZGlzcGxheU5hbWVzID0gbmV3IGludGxXaXRoRGlzcGxheU5hbWVzLkRpc3BsYXlOYW1lcyhbbG9jYWxlLCBcImVuXCJdLCB7IHR5cGU6IFwiY3VycmVuY3lcIiB9KTtcclxuICAgIGNvbnN0IGxvY2FsaXplZE5hbWUgPSBTdHJpbmcoZGlzcGxheU5hbWVzLm9mKG5vcm1hbGl6ZWRDb2RlKSB8fCBcIlwiKS50cmltKCk7XHJcbiAgICBpZiAoIWxvY2FsaXplZE5hbWUpIHJldHVybiBcIlwiO1xyXG5cclxuICAgIGNvbnN0IG5vcm1hbGl6ZWROYW1lID0gbG9jYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZWROYW1lID09PSBub3JtYWxpemVkQ29kZSA/IFwiXCIgOiBsb2NhbGl6ZWROYW1lO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgbWFwQ3VycmVuY3lPcHRpb25zID0gKGl0ZW1zOiBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0b1tdIHwgdW5kZWZpbmVkLCBsb2NhbGU6IHN0cmluZyk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XHJcbiAgY29uc3Qgc291cmNlID0gQXJyYXkuaXNBcnJheShpdGVtcykgPyBpdGVtcyA6IFtdO1xyXG4gIGNvbnN0IHNlZW5Db2RlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xyXG5cclxuICByZXR1cm4gc291cmNlXHJcbiAgICAubWFwKChlbnRyeSkgPT4ge1xyXG4gICAgICBjb25zdCBjdXJyZW5jeUNvZGVJc28gPSBub3JtYWxpemVDdXJyZW5jeUNvZGUoZW50cnk/LkN1cnJlbmN5Q29kZUlTTyk7XHJcbiAgICAgIGNvbnN0IGVmZmVjdGl2ZUlzb0NvZGUgPSBjdXJyZW5jeUNvZGVJc28gfHwgbm9ybWFsaXplQ3VycmVuY3lDb2RlKGVudHJ5Py5DdXJyZW5jeUNvZGUpO1xyXG4gICAgICBpZiAoIWVmZmVjdGl2ZUlzb0NvZGUpIHJldHVybiBudWxsO1xyXG4gICAgICBpZiAoc2VlbkNvZGVzLmhhcyhlZmZlY3RpdmVJc29Db2RlKSkgcmV0dXJuIG51bGw7XHJcbiAgICAgIHNlZW5Db2Rlcy5hZGQoZWZmZWN0aXZlSXNvQ29kZSk7XHJcblxyXG4gICAgICBjb25zdCBkaXNwbGF5TmFtZSA9IHJlc29sdmVDdXJyZW5jeURpc3BsYXlOYW1lKGVmZmVjdGl2ZUlzb0NvZGUsIGxvY2FsZSk7XHJcbiAgICAgIGNvbnN0IG9wdGlvbkxhYmVsID0gZGlzcGxheU5hbWUgPyBgJHtlZmZlY3RpdmVJc29Db2RlfSAke2Rpc3BsYXlOYW1lfWAgOiBlZmZlY3RpdmVJc29Db2RlO1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB2YWx1ZTogZWZmZWN0aXZlSXNvQ29kZSxcclxuICAgICAgICB0ZXh0OiBvcHRpb25MYWJlbCxcclxuICAgICAgICBpY29uOiA8RXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gY3VycmVuY3lDb2RlPXtlZmZlY3RpdmVJc29Db2RlfSBzaXplQ2xhc3NOYW1lPXtDVVJSRU5DWV9GTEFHX1NJWkVfQ0xBU1N9IC8+LFxyXG4gICAgICB9IGFzIEV4cGVuc2VTZWxlY3RPcHRpb247XHJcbiAgICB9KVxyXG4gICAgLmZpbHRlcigoZW50cnkpOiBlbnRyeSBpcyBFeHBlbnNlU2VsZWN0T3B0aW9uID0+IGVudHJ5ICE9PSBudWxsKTtcclxufTtcclxuXHJcbi8vIFNoYXJlZCBjdXJyZW5jeSBjb21ib2JveCBiYWNrZWQgYnkgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9jdXJyZW5jaWVzLlxyXG5jb25zdCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QgPSAoe1xyXG4gIGxhYmVsLFxyXG4gIHBsYWNlaG9sZGVyLFxyXG4gIHZhbHVlLFxyXG4gIG9uQ2hhbmdlLFxyXG4gIGludmFsaWQgPSBmYWxzZSxcclxuICBpbnB1dFJlZixcclxuICByZWFkT25seSA9IGZhbHNlLFxyXG4gIGRpc2FibGVkID0gZmFsc2UsXHJcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcclxuICBjb250YWluZXJDbGFzc05hbWUsXHJcbiAgbGFiZWxDbGFzc05hbWUsXHJcbiAgaWRCYXNlID0gXCJleHBlbnNlLWN1cnJlbmN5XCIsXHJcbiAgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHQgPSBmYWxzZSxcclxuICBkcm9wZG93bkV4cGFuZFB4ID0gMCxcclxuICBkcm9wZG93bk1pbldpZHRoUHggPSAzMjAsXHJcbiAgZHJvcGRvd25Vc2VBdmFpbGFibGVXaWR0aCA9IHRydWUsXHJcbiAgc2hvd0xvYWRpbmdTdGF0ZVRleHQgPSB0cnVlLFxyXG59OiBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGxvY2FsZSA9IHVzZU1lbW8oKCkgPT4gcmVhZFByZWZlcnJlZExvY2FsZSgpLCBbXSk7XHJcbiAgY29uc3QgeyBjdXJyZW50QXhVc2VySWQsIGN1cnJlbnRDcm1Vc2VySWQgfSA9IHVzZUF1dGhDb250ZXh0KCk7XHJcbiAgY29uc3QgcmVjZW50Q3VycmVuY3lVc2VyU2NvcGUgPSBbY3VycmVudEF4VXNlcklkLCBjdXJyZW50Q3JtVXNlcklkXVxyXG4gICAgLm1hcCgoaXRlbSkgPT4gU3RyaW5nKGl0ZW0gfHwgXCJcIikudHJpbSgpKVxyXG4gICAgLmZpbHRlcihCb29sZWFuKVxyXG4gICAgLmpvaW4oXCJ8XCIpO1xyXG4gIGNvbnN0IFtvcHRpb25zLCBzZXRPcHRpb25zXSA9IHVzZVN0YXRlPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oW10pO1xyXG4gIGNvbnN0IFtyZWNlbnRDdXJyZW5jeUNhY2hlLCBzZXRSZWNlbnRDdXJyZW5jeUNhY2hlXSA9IHVzZVN0YXRlKCgpID0+ICh7XHJcbiAgICB1c2VyU2NvcGU6IHJlY2VudEN1cnJlbmN5VXNlclNjb3BlLFxyXG4gICAgY29kZXM6IHJlYWRSZWNlbnRFeHBlbnNlQ3VycmVuY3lDb2RlcyhyZWNlbnRDdXJyZW5jeVVzZXJTY29wZSksXHJcbiAgfSkpO1xyXG4gIGNvbnN0IFtpc0xvYWRpbmdPcHRpb25zLCBzZXRJc0xvYWRpbmdPcHRpb25zXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbG9hZEVycm9yTWVzc2FnZSwgc2V0TG9hZEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZW1wdHlNZXNzYWdlLCBzZXRFbXB0eU1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3Qgb25DaGFuZ2VSZWYgPSB1c2VSZWYob25DaGFuZ2UpO1xyXG4gIGNvbnN0IHZhbHVlUmVmID0gdXNlUmVmKG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSh2YWx1ZSkpO1xyXG4gIGNvbnN0IGluaXRpYWxEZWZhdWx0QXBwbGllZFJlZiA9IHVzZVJlZihmYWxzZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBvbkNoYW5nZVJlZi5jdXJyZW50ID0gb25DaGFuZ2U7XHJcbiAgfSwgW29uQ2hhbmdlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICB2YWx1ZVJlZi5jdXJyZW50ID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKHZhbHVlKTtcclxuICB9LCBbdmFsdWVdKTtcclxuXHJcbiAgaWYgKHJlY2VudEN1cnJlbmN5Q2FjaGUudXNlclNjb3BlICE9PSByZWNlbnRDdXJyZW5jeVVzZXJTY29wZSkge1xyXG4gICAgc2V0UmVjZW50Q3VycmVuY3lDYWNoZSh7XHJcbiAgICAgIHVzZXJTY29wZTogcmVjZW50Q3VycmVuY3lVc2VyU2NvcGUsXHJcbiAgICAgIGNvZGVzOiByZWFkUmVjZW50RXhwZW5zZUN1cnJlbmN5Q29kZXMocmVjZW50Q3VycmVuY3lVc2VyU2NvcGUpLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgbGV0IGlzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG5cclxuICAgIGNvbnN0IGxvYWRDdXJyZW5jaWVzID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICBzZXRJc0xvYWRpbmdPcHRpb25zKHRydWUpO1xyXG4gICAgICBzZXRMb2FkRXJyb3JNZXNzYWdlKFwiXCIpO1xyXG4gICAgICBzZXRFbXB0eU1lc3NhZ2UoXCJcIik7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZ2V0RXhwZW5zZVNoZWV0Q3VycmVuY2llcyh7XHJcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICAgIHNldE9wdGlvbnMoW10pO1xyXG4gICAgICAgICAgc2V0TG9hZEVycm9yTWVzc2FnZShyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXRzLlwiKSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBtYXBwZWRPcHRpb25zID0gbWFwQ3VycmVuY3lPcHRpb25zKHJlc3BvbnNlLkl0ZW1zLCBsb2NhbGUpO1xyXG4gICAgICAgIHNldE9wdGlvbnMobWFwcGVkT3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmICghbWFwcGVkT3B0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgICAgIHNldEVtcHR5TWVzc2FnZShyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJDb21tb25fTm9EYXRhXCIsIFwiTm8gZGF0YVwiKSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB2YWx1ZVJlZi5jdXJyZW50O1xyXG4gICAgICAgIGNvbnN0IGhhc0N1cnJlbnRJbkxpc3QgPSBtYXBwZWRPcHRpb25zLnNvbWUoKG9wdGlvbikgPT4gbm9ybWFsaXplQ3VycmVuY3lDb2RlKG9wdGlvbi52YWx1ZSkgPT09IGN1cnJlbnRWYWx1ZSk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSAmJiBoYXNDdXJyZW50SW5MaXN0KSB7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWN1cnJlbnRWYWx1ZSAmJiBwcmVmZXJEZWZhdWx0Q3VycmVuY3lGcm9tQ29udGV4dCAmJiAhaW5pdGlhbERlZmF1bHRBcHBsaWVkUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICAgIGNvbnN0IGRlZmF1bHRDdXJyZW5jeUNvZGUgPSBub3JtYWxpemVDdXJyZW5jeUNvZGUoXHJcbiAgICAgICAgICAgIGF3YWl0IGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUoe1xyXG4gICAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgIGlmIChkZWZhdWx0Q3VycmVuY3lDb2RlICYmIG1hcHBlZE9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiBub3JtYWxpemVDdXJyZW5jeUNvZGUob3B0aW9uLnZhbHVlKSA9PT0gZGVmYXVsdEN1cnJlbmN5Q29kZSkpIHtcclxuICAgICAgICAgICAgaW5pdGlhbERlZmF1bHRBcHBsaWVkUmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICBvbkNoYW5nZVJlZi5jdXJyZW50KGRlZmF1bHRDdXJyZW5jeUNvZGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcclxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgZmFsbGJhY2tFcnJvciA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXRzLlwiKTtcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yID8gZXJyb3IubWVzc2FnZSB8fCBmYWxsYmFja0Vycm9yIDogZmFsbGJhY2tFcnJvcjtcclxuICAgICAgICBzZXRPcHRpb25zKFtdKTtcclxuICAgICAgICBzZXRMb2FkRXJyb3JNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIGlmICghaXNDYW5jZWxsZWQpIHtcclxuICAgICAgICAgIHNldElzTG9hZGluZ09wdGlvbnMoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2b2lkIGxvYWRDdXJyZW5jaWVzKCk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgaXNDYW5jZWxsZWQgPSB0cnVlO1xyXG4gICAgICBjb250cm9sbGVyLmFib3J0KCk7XHJcbiAgICB9O1xyXG4gIH0sIFtsb2NhbGUsIHByZWZlckRlZmF1bHRDdXJyZW5jeUZyb21Db250ZXh0XSk7XHJcblxyXG4gIGNvbnN0IG5vcm1hbGl6ZWRWYWx1ZSA9IHVzZU1lbW8oKCkgPT4gbm9ybWFsaXplQ3VycmVuY3lDb2RlKHZhbHVlKSwgW3ZhbHVlXSk7XHJcbiAgY29uc3Qgb3JkZXJlZE9wdGlvbnMgPSB1c2VNZW1vKFxyXG4gICAgKCkgPT4gb3JkZXJFeHBlbnNlQ3VycmVuY3lPcHRpb25zQnlSZWNlbmN5KG9wdGlvbnMsIHJlY2VudEN1cnJlbmN5Q2FjaGUuY29kZXMsIGxvY2FsZSksXHJcbiAgICBbbG9jYWxlLCBvcHRpb25zLCByZWNlbnRDdXJyZW5jeUNhY2hlLmNvZGVzXVxyXG4gICk7XHJcbiAgY29uc3QgdmFsaWRDdXJyZW5jeUNvZGVzID0gdXNlTWVtbyhcclxuICAgICgpID0+XHJcbiAgICAgIG5ldyBTZXQoXHJcbiAgICAgICAgb3B0aW9ucy5mbGF0TWFwKChvcHRpb24pID0+IHtcclxuICAgICAgICAgIGNvbnN0IGNvZGUgPSBub3JtYWxpemVDdXJyZW5jeUNvZGUob3B0aW9uLnZhbHVlKTtcclxuICAgICAgICAgIHJldHVybiBjb2RlID8gW2NvZGVdIDogW107XHJcbiAgICAgICAgfSlcclxuICAgICAgKSxcclxuICAgIFtvcHRpb25zXVxyXG4gICk7XHJcbiAgY29uc3QgaGFuZGxlQ3VycmVuY3lDaGFuZ2UgPSB1c2VDYWxsYmFjayhcclxuICAgIChuZXh0VmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgICBjb25zdCBub3JtYWxpemVkTmV4dFZhbHVlID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKG5leHRWYWx1ZSk7XHJcbiAgICAgIGlmIChub3JtYWxpemVkTmV4dFZhbHVlICYmIHZhbGlkQ3VycmVuY3lDb2Rlcy5oYXMobm9ybWFsaXplZE5leHRWYWx1ZSkpIHtcclxuICAgICAgICBzZXRSZWNlbnRDdXJyZW5jeUNhY2hlKHtcclxuICAgICAgICAgIHVzZXJTY29wZTogcmVjZW50Q3VycmVuY3lVc2VyU2NvcGUsXHJcbiAgICAgICAgICBjb2RlczogcmVtZW1iZXJSZWNlbnRFeHBlbnNlQ3VycmVuY3lDb2RlKG5vcm1hbGl6ZWROZXh0VmFsdWUsIHJlY2VudEN1cnJlbmN5VXNlclNjb3BlKSxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICBvbkNoYW5nZShub3JtYWxpemVkTmV4dFZhbHVlKTtcclxuICAgIH0sXHJcbiAgICBbb25DaGFuZ2UsIHJlY2VudEN1cnJlbmN5VXNlclNjb3BlLCB2YWxpZEN1cnJlbmN5Q29kZXNdXHJcbiAgKTtcclxuICBjb25zdCBkaXNhYmxlQmVjYXVzZU5vRGF0YSA9ICFpc0xvYWRpbmdPcHRpb25zICYmICFsb2FkRXJyb3JNZXNzYWdlICYmIG9wdGlvbnMubGVuZ3RoID09PSAwO1xyXG4gIGNvbnN0IGVmZmVjdGl2ZURpc2FibGVkID0gZGlzYWJsZWQgfHwgZGlzYWJsZUJlY2F1c2VOb0RhdGE7XHJcbiAgY29uc3QgbG9hZGluZ01lc3NhZ2UgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxyXG4gICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICBsYWJlbD17bGFiZWx9XHJcbiAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG4gICAgICAgIG9wdGlvbnM9e29yZGVyZWRPcHRpb25zfVxyXG4gICAgICAgIHZhbHVlPXtub3JtYWxpemVkVmFsdWV9XHJcbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUN1cnJlbmN5Q2hhbmdlfVxyXG4gICAgICAgIGlucHV0UmVmPXtpbnB1dFJlZn1cclxuICAgICAgICBpbnZhbGlkPXtpbnZhbGlkfVxyXG4gICAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cclxuICAgICAgICBkaXNhYmxlZD17ZWZmZWN0aXZlRGlzYWJsZWR9XHJcbiAgICAgICAgYWxsb3dUZXh0SW5wdXRcclxuICAgICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cclxuICAgICAgICBzaG93TGFiZWw9e3Nob3dMYWJlbH1cclxuICAgICAgICBjb250YWluZXJDbGFzc05hbWU9e2NvbnRhaW5lckNsYXNzTmFtZX1cclxuICAgICAgICBsYWJlbENsYXNzTmFtZT17bGFiZWxDbGFzc05hbWV9XHJcbiAgICAgICAgdXNlUG9ydGFsXHJcbiAgICAgICAgc2VsZWN0ZWRUZXh0TW9kZT1cInZhbHVlXCJcclxuICAgICAgICBkcm9wZG93bkV4cGFuZFB4PXtkcm9wZG93bkV4cGFuZFB4fVxyXG4gICAgICAgIGRyb3Bkb3duTWluV2lkdGhQeD17ZHJvcGRvd25NaW5XaWR0aFB4fVxyXG4gICAgICAgIGRyb3Bkb3duVXNlQXZhaWxhYmxlV2lkdGg9e2Ryb3Bkb3duVXNlQXZhaWxhYmxlV2lkdGh9XHJcbiAgICAgICAgZHJvcGRvd25NYXhIZWlnaHRDbGFzcz1cIm1heC1oLTk2XCJcclxuICAgICAgICBzZWxlY3RlZEljb25DbGFzc05hbWU9e0NVUlJFTkNZX0ZMQUdfU0laRV9DTEFTU31cclxuICAgICAgICBzZWxlY3RlZElucHV0UGFkZGluZ0NsYXNzTmFtZT1cInBsLTEyXCJcclxuICAgICAgICBjbGVhck9uRW1wdHlJbnB1dFxyXG4gICAgICAgIG9wdGlvbkljb25DbGFzc05hbWU9e0NVUlJFTkNZX0ZMQUdfU0laRV9DTEFTU31cclxuICAgICAgICBhbGxvd09wdGlvbkhvcml6b250YWxTY3JvbGxcclxuICAgICAgICBsb2NrRHJvcGRvd25XaWR0aE9uRmlyc3RPcGVuXHJcbiAgICAgICAgZGlzYWJsZURlZmF1bHRPcHRpb25QYWRkaW5nXHJcbiAgICAgICAgb3B0aW9uTGVmdFBhZGRpbmdDbGFzc05hbWU9XCJwbC0xXCJcclxuICAgICAgICBvcHRpb25EZWZhdWx0Q2xhc3NOYW1lPXtDVVJSRU5DWV9PUFRJT05fREVGQVVMVF9DTEFTU31cclxuICAgICAgICBvcHRpb25BY3RpdmVDbGFzc05hbWU9e0NVUlJFTkNZX09QVElPTl9BQ1RJVkVfQ0xBU1N9XHJcbiAgICAgICAgb3B0aW9uU2VsZWN0ZWRDbGFzc05hbWU9e0NVUlJFTkNZX09QVElPTl9TRUxFQ1RFRF9DTEFTU31cclxuICAgICAgICBpZEJhc2U9e2lkQmFzZX1cclxuICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgIHBhbmVsQ2xhc3NOYW1lPXtDVVJSRU5DWV9EUk9QRE9XTl9QQU5FTF9DTEFTU31cclxuICAgICAgICBwYW5lbFN0eWxlPXtDVVJSRU5DWV9EUk9QRE9XTl9QQU5FTF9TVFlMRX1cclxuICAgICAgLz5cclxuICAgICAge3Nob3dMb2FkaW5nU3RhdGVUZXh0ICYmIGlzTG9hZGluZ09wdGlvbnMgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwXCI+e2xvYWRpbmdNZXNzYWdlfTwvcD4gOiBudWxsfVxyXG4gICAgICB7IWlzTG9hZGluZ09wdGlvbnMgJiYgbG9hZEVycm9yTWVzc2FnZSA/IDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1kYW5nZXJcIj57bG9hZEVycm9yTWVzc2FnZX08L3A+IDogbnVsbH1cclxuICAgICAgeyFpc0xvYWRpbmdPcHRpb25zICYmICFsb2FkRXJyb3JNZXNzYWdlICYmIGVtcHR5TWVzc2FnZSA/IDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS01MDBcIj57ZW1wdHlNZXNzYWdlfTwvcD4gOiBudWxsfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdDtcclxuXHJcbiIsICJpbXBvcnQgeyBnZXRFeHBlbnNlU2NvcGVUb2tlbiB9IGZyb20gXCIuL2V4cGVuc2VTY29wZS50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xyXG5cclxuY29uc3QgUkVDRU5UX0NVUlJFTkNZX1NUT1JBR0VfS0VZX1BSRUZJWCA9IFwiZXhwZW5zZV9yZWNlbnRfY3VycmVuY2llc192MVwiO1xyXG5jb25zdCBNQVhfUkVDRU5UX0NVUlJFTkNZX0NPREVTID0gNjtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XHJcblxyXG5jb25zdCBub3JtYWxpemVTdG9yYWdlS2V5UGFydCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgcmV0dXJuIG5vcm1hbGl6ZWQucmVwbGFjZSgvW15hLXowLTlfLV0rL2dpLCBcIl9cIikucmVwbGFjZSgvXl8rfF8rJC9nLCBcIlwiKSB8fCBcImRlZmF1bHRcIjtcclxufTtcclxuXHJcbmNvbnN0IHJlYWRTdG9yYWdlID0gKCk6IFN0b3JhZ2UgfCBudWxsID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG51bGw7XHJcblxyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZTtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkUmVjZW50Q3VycmVuY3lTdG9yYWdlS2V5ID0gKHVzZXJTY29wZTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBleHBlbnNlU2NvcGUgPSBub3JtYWxpemVTdG9yYWdlS2V5UGFydChnZXRFeHBlbnNlU2NvcGVUb2tlbigpKTtcclxuICBjb25zdCB1c2VyS2V5ID0gbm9ybWFsaXplU3RvcmFnZUtleVBhcnQodXNlclNjb3BlKTtcclxuICByZXR1cm4gYCR7UkVDRU5UX0NVUlJFTkNZX1NUT1JBR0VfS0VZX1BSRUZJWH1fJHtleHBlbnNlU2NvcGV9XyR7dXNlcktleX1gO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplUmVjZW50Q3VycmVuY3lDb2RlcyA9IChzb3VyY2U6IHVua25vd24pOiBzdHJpbmdbXSA9PiB7XHJcbiAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHNvdXJjZSkgPyBzb3VyY2UgOiBbXTtcclxuICBjb25zdCBzZWVuID0gbmV3IFNldDxzdHJpbmc+KCk7XHJcblxyXG4gIHJldHVybiBpdGVtc1xyXG4gICAgLm1hcCgoaXRlbSkgPT4gbm9ybWFsaXplQ3VycmVuY3lDb2RlKGl0ZW0pKVxyXG4gICAgLmZpbHRlcigoY29kZSkgPT4ge1xyXG4gICAgICBpZiAoIWNvZGUgfHwgc2Vlbi5oYXMoY29kZSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgc2Vlbi5hZGQoY29kZSk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSlcclxuICAgIC5zbGljZSgwLCBNQVhfUkVDRU5UX0NVUlJFTkNZX0NPREVTKTtcclxufTtcclxuXHJcbmNvbnN0IGNvbXBhcmVDdXJyZW5jeU9wdGlvbnMgPSAobG9jYWxlOiBzdHJpbmcpID0+IChsZWZ0OiBFeHBlbnNlU2VsZWN0T3B0aW9uLCByaWdodDogRXhwZW5zZVNlbGVjdE9wdGlvbik6IG51bWJlciA9PiB7XHJcbiAgY29uc3QgdGV4dENvbXBhcmlzb24gPSBsZWZ0LnRleHQubG9jYWxlQ29tcGFyZShyaWdodC50ZXh0LCBbbG9jYWxlLCBcImVuXCJdLCB7IHNlbnNpdGl2aXR5OiBcImJhc2VcIiB9KTtcclxuICBpZiAodGV4dENvbXBhcmlzb24gIT09IDApIHJldHVybiB0ZXh0Q29tcGFyaXNvbjtcclxuICByZXR1cm4gbGVmdC52YWx1ZS5sb2NhbGVDb21wYXJlKHJpZ2h0LnZhbHVlLCBcImVuXCIsIHsgc2Vuc2l0aXZpdHk6IFwiYmFzZVwiIH0pO1xyXG59O1xyXG5cclxuLy8gUmVhZHMgdGhlIHJlY2VudCBjdXJyZW5jeSBjYWNoZSBmb3IgdGhlIGFjdGl2ZSBHYXN0b3MgdXNlciBhbmQgY29tcGFueSBzY29wZS5cclxuZXhwb3J0IGNvbnN0IHJlYWRSZWNlbnRFeHBlbnNlQ3VycmVuY3lDb2RlcyA9ICh1c2VyU2NvcGUgPSBcIlwiKTogc3RyaW5nW10gPT4ge1xyXG4gIGNvbnN0IHN0b3JhZ2UgPSByZWFkU3RvcmFnZSgpO1xyXG4gIGlmICghc3RvcmFnZSkgcmV0dXJuIFtdO1xyXG5cclxuICB0cnkge1xyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZVJlY2VudEN1cnJlbmN5Q29kZXMoSlNPTi5wYXJzZShzdG9yYWdlLmdldEl0ZW0oYnVpbGRSZWNlbnRDdXJyZW5jeVN0b3JhZ2VLZXkodXNlclNjb3BlKSkgfHwgXCJbXVwiKSk7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gW107XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gU3RvcmVzIG9uZSBzZWxlY3RlZCBjdXJyZW5jeSBhdCB0aGUgZnJvbnQgb2YgdGhlIHNjb3BlZCByZWNlbnQgbGlzdC5cclxuZXhwb3J0IGNvbnN0IHJlbWVtYmVyUmVjZW50RXhwZW5zZUN1cnJlbmN5Q29kZSA9IChjdXJyZW5jeUNvZGU6IHN0cmluZywgdXNlclNjb3BlID0gXCJcIik6IHN0cmluZ1tdID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkQ29kZSA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShjdXJyZW5jeUNvZGUpO1xyXG4gIGlmICghbm9ybWFsaXplZENvZGUpIHJldHVybiByZWFkUmVjZW50RXhwZW5zZUN1cnJlbmN5Q29kZXModXNlclNjb3BlKTtcclxuXHJcbiAgY29uc3QgbmV4dENvZGVzID0gW1xyXG4gICAgbm9ybWFsaXplZENvZGUsXHJcbiAgICAuLi5yZWFkUmVjZW50RXhwZW5zZUN1cnJlbmN5Q29kZXModXNlclNjb3BlKS5maWx0ZXIoKGNvZGUpID0+IGNvZGUgIT09IG5vcm1hbGl6ZWRDb2RlKSxcclxuICBdLnNsaWNlKDAsIE1BWF9SRUNFTlRfQ1VSUkVOQ1lfQ09ERVMpO1xyXG4gIGNvbnN0IHN0b3JhZ2UgPSByZWFkU3RvcmFnZSgpO1xyXG4gIGlmICghc3RvcmFnZSkgcmV0dXJuIG5leHRDb2RlcztcclxuXHJcbiAgdHJ5IHtcclxuICAgIHN0b3JhZ2Uuc2V0SXRlbShidWlsZFJlY2VudEN1cnJlbmN5U3RvcmFnZUtleSh1c2VyU2NvcGUpLCBKU09OLnN0cmluZ2lmeShuZXh0Q29kZXMpKTtcclxuICB9IGNhdGNoIHtcclxuICAgIC8vIElnbm9yZSBzdG9yYWdlIHdyaXRlIGZhaWx1cmVzIGluIHJlc3RyaWN0ZWQgYnJvd3NlciBjb250ZXh0cy5cclxuICB9XHJcblxyXG4gIHJldHVybiBuZXh0Q29kZXM7XHJcbn07XHJcblxyXG4vLyBPcmRlcnMgY3VycmVuY2llcyB3aXRoIHJlY2VudCB2YWxpZCBzZWxlY3Rpb25zIGZpcnN0IGFuZCB0aGUgcmVtYWluaW5nIG9wdGlvbnMgYWxwaGFiZXRpY2FsbHkuXHJcbmV4cG9ydCBjb25zdCBvcmRlckV4cGVuc2VDdXJyZW5jeU9wdGlvbnNCeVJlY2VuY3kgPSAoXHJcbiAgb3B0aW9uczogRXhwZW5zZVNlbGVjdE9wdGlvbltdLFxyXG4gIHJlY2VudEN1cnJlbmN5Q29kZXM6IHN0cmluZ1tdLFxyXG4gIGxvY2FsZTogc3RyaW5nXHJcbik6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XHJcbiAgY29uc3Qgb3B0aW9uQnlDb2RlID0gbmV3IE1hcDxzdHJpbmcsIEV4cGVuc2VTZWxlY3RPcHRpb24+KCk7XHJcbiAgb3B0aW9ucy5mb3JFYWNoKChvcHRpb24pID0+IHtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRDb2RlID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKG9wdGlvbi52YWx1ZSk7XHJcbiAgICBpZiAobm9ybWFsaXplZENvZGUgJiYgIW9wdGlvbkJ5Q29kZS5oYXMobm9ybWFsaXplZENvZGUpKSB7XHJcbiAgICAgIG9wdGlvbkJ5Q29kZS5zZXQobm9ybWFsaXplZENvZGUsIG9wdGlvbik7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHJlY2VudE9wdGlvbnMgPSBub3JtYWxpemVSZWNlbnRDdXJyZW5jeUNvZGVzKHJlY2VudEN1cnJlbmN5Q29kZXMpXHJcbiAgICAubWFwKChjb2RlKSA9PiBvcHRpb25CeUNvZGUuZ2V0KGNvZGUpKVxyXG4gICAgLmZpbHRlcigob3B0aW9uKTogb3B0aW9uIGlzIEV4cGVuc2VTZWxlY3RPcHRpb24gPT4gISFvcHRpb24pO1xyXG4gIGNvbnN0IHJlY2VudENvZGVTZXQgPSBuZXcgU2V0KHJlY2VudE9wdGlvbnMubWFwKChvcHRpb24pID0+IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShvcHRpb24udmFsdWUpKSk7XHJcbiAgY29uc3QgYWxwaGFiZXRpY2FsT3B0aW9ucyA9IG9wdGlvbnNcclxuICAgIC5maWx0ZXIoKG9wdGlvbikgPT4gIXJlY2VudENvZGVTZXQuaGFzKG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShvcHRpb24udmFsdWUpKSlcclxuICAgIC5zbGljZSgpXHJcbiAgICAuc29ydChjb21wYXJlQ3VycmVuY3lPcHRpb25zKGxvY2FsZSkpO1xyXG5cclxuICByZXR1cm4gWy4uLnJlY2VudE9wdGlvbnMsIC4uLmFscGhhYmV0aWNhbE9wdGlvbnNdO1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1CQUF5RTs7O0FDR3pFLElBQU0scUNBQXFDO0FBQzNDLElBQU0sNEJBQTRCO0FBRWxDLElBQU0sd0JBQXdCLENBQUMsVUFBMkIsT0FBTyxTQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWTtBQUVqRyxJQUFNLDBCQUEwQixDQUFDLFVBQTJCO0FBQzFELFFBQU0sYUFBYSxPQUFPLFNBQVMsRUFBRSxFQUFFLEtBQUs7QUFDNUMsU0FBTyxXQUFXLFFBQVEsa0JBQWtCLEdBQUcsRUFBRSxRQUFRLFlBQVksRUFBRSxLQUFLO0FBQzlFO0FBRUEsSUFBTSxjQUFjLE1BQXNCO0FBQ3hDLE1BQUksT0FBTyxXQUFXLFlBQWEsUUFBTztBQUUxQyxNQUFJO0FBQ0YsV0FBTyxPQUFPO0FBQUEsRUFDaEIsUUFBUTtBQUNOLFdBQU87QUFBQSxFQUNUO0FBQ0Y7QUFFQSxJQUFNLGdDQUFnQyxDQUFDLGNBQThCO0FBQ25FLFFBQU0sZUFBZSx3QkFBd0IscUJBQXFCLENBQUM7QUFDbkUsUUFBTSxVQUFVLHdCQUF3QixTQUFTO0FBQ2pELFNBQU8sR0FBRyxrQ0FBa0MsSUFBSSxZQUFZLElBQUksT0FBTztBQUN6RTtBQUVBLElBQU0sK0JBQStCLENBQUMsV0FBOEI7QUFDbEUsUUFBTSxRQUFRLE1BQU0sUUFBUSxNQUFNLElBQUksU0FBUyxDQUFDO0FBQ2hELFFBQU0sT0FBTyxvQkFBSSxJQUFZO0FBRTdCLFNBQU8sTUFDSixJQUFJLENBQUMsU0FBUyxzQkFBc0IsSUFBSSxDQUFDLEVBQ3pDLE9BQU8sQ0FBQyxT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
