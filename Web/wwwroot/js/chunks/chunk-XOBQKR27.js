import {
  SelectCombobox_default
} from "./chunk-JQOT2YM5.js";
import {
  getExpenseSheetCurrencies,
  getExpenseSheetDefaultCurrencyCode,
  normalizeCardTitleText,
  safeText
} from "./chunk-RN3YUQHY.js";
import {
  ApiFetchError,
  indT
} from "./chunk-GEXVJWY3.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-KJNAPDCZ.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

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
  statusIconClassName = "expense-sheet-card__status-icon",
  datePanelContent
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "timeline-date-panel flex flex-col items-center justify-center gap-1 px-3 py-3 bg-slate-50 border-r border-slate-200 text-slate-600", children: datePanelContent ? datePanelContent : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-semibold tracking-[0.2em] text-slate-500", children: dateParts.year }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-slate-500", children: dateParts.month }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-2xl font-semibold text-primary", children: dateParts.day })
        ] }) }),
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
  preferDefaultCurrencyFromContext = false,
  dropdownExpandPx = 0,
  dropdownMinWidthPx = 320
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
        dropdownExpandPx,
        dropdownMinWidthPx,
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
  ExpenseCurrencyFlagIcon_default,
  ExpenseCurrencyFilterSelect_default,
  ExpenseTimelineCard_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlQ3VycmVuY3lGbGFnSWNvbi50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZURhdGVQYXJ0cyB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgbm9ybWFsaXplQ2FyZFRpdGxlVGV4dCwgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcblxudHlwZSBFeHBlbnNlVGltZWxpbmVDYXJkUHJvcHMgPSB7XG4gIGRhdGVQYXJ0czogRXhwZW5zZURhdGVQYXJ0cztcbiAgdGl0bGU6IHN0cmluZztcbiAgYW1vdW50VGV4dDogc3RyaW5nO1xuICBvbk9wZW46ICgpID0+IHZvaWQ7XG4gIHRpdGxlQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBhbW91bnRDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHN0YXR1c0NsYXNzTmFtZT86IHN0cmluZztcbiAgc3RhdHVzTGFiZWw/OiBzdHJpbmc7XG4gIHN1YnRpdGxlPzogc3RyaW5nO1xuICBzdWJ0aXRsZUNsYXNzTmFtZT86IHN0cmluZztcbiAgc3RhdHVzSWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcbiAgc3RhdHVzSWNvbkNsYXNzTmFtZT86IHN0cmluZztcbiAgZGF0ZVBhbmVsQ29udGVudD86IFJlYWN0LlJlYWN0Tm9kZTtcbn07XG5cbi8vIFJldXNhYmxlIGNsaWNrYWJsZSB0aW1lbGluZSBjYXJkIGZvciBleHBlbnNlIHNoZWV0cyBhbmQgZXhwZW5zZSBsaW5lcy5cbmNvbnN0IEV4cGVuc2VUaW1lbGluZUNhcmQgPSAoe1xuICBkYXRlUGFydHMsXG4gIHRpdGxlLFxuICBhbW91bnRUZXh0LFxuICBvbk9wZW4sXG4gIHRpdGxlQ2xhc3NOYW1lID0gXCJ0aW1lbGluZS1uYW1lXCIsXG4gIGFtb3VudENsYXNzTmFtZSA9IFwiZXhwZW5zZS1zaGVldC1jYXJkX19hbW91bnRcIixcbiAgc3RhdHVzQ2xhc3NOYW1lLFxuICBzdGF0dXNMYWJlbCxcbiAgc3VidGl0bGUgPSBcIlwiLFxuICBzdWJ0aXRsZUNsYXNzTmFtZSA9IFwiZXhwZW5zZS1zaGVldC1jYXJkX19zdWJ0aXRsZVwiLFxuICBzdGF0dXNJY29uLFxuICBzdGF0dXNJY29uQ2xhc3NOYW1lID0gXCJleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cy1pY29uXCIsXG4gIGRhdGVQYW5lbENvbnRlbnQsXG59OiBFeHBlbnNlVGltZWxpbmVDYXJkUHJvcHMpID0+IHtcbiAgY29uc3Qgc2FmZVRpdGxlID0gbm9ybWFsaXplQ2FyZFRpdGxlVGV4dCh0aXRsZSwgXCItXCIpO1xuICBjb25zdCBzYWZlQW1vdW50ID0gYW1vdW50VGV4dCB8fCBcIi1cIjtcbiAgY29uc3Qgc2FmZVN1YnRpdGxlID0gc2FmZVRleHQoc3VidGl0bGUpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPVwidGltZWxpbmUtY2FyZCB0aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIlxuICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICB0YWJJbmRleD17MH1cbiAgICAgIG9uQ2xpY2s9e29uT3Blbn1cbiAgICAgIG9uS2V5RG93bj17KGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIiB8fCBldmVudC5rZXkgPT09IFwiIFwiKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBvbk9wZW4oKTtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWRhdGUtcGFuZWwgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEgcHgtMyBweS0zIGJnLXNsYXRlLTUwIGJvcmRlci1yIGJvcmRlci1zbGF0ZS0yMDAgdGV4dC1zbGF0ZS02MDBcIj5cbiAgICAgICAge2RhdGVQYW5lbENvbnRlbnQgPyAoXG4gICAgICAgICAgZGF0ZVBhbmVsQ29udGVudFxuICAgICAgICApIDogKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFja2luZy1bMC4yZW1dIHRleHQtc2xhdGUtNTAwXCI+e2RhdGVQYXJ0cy55ZWFyfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLVswLjJlbV0gdGV4dC1zbGF0ZS01MDBcIj57ZGF0ZVBhcnRzLm1vbnRofTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LXNlbWlib2xkIHRleHQtcHJpbWFyeVwiPntkYXRlUGFydHMuZGF5fTwvZGl2PlxuICAgICAgICAgIDwvPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWNhcmRfX2NvbnRlbnQgZmxleC0xIHB5LTMgcHgtNFwiPlxuICAgICAgICB7c3RhdHVzQ2xhc3NOYW1lID8gPHNwYW4gY2xhc3NOYW1lPXtzdGF0dXNDbGFzc05hbWV9IHRpdGxlPXtzdGF0dXNMYWJlbH0gYXJpYS1sYWJlbD17c3RhdHVzTGFiZWx9IC8+IDogbnVsbH1cbiAgICAgICAge3N0YXR1c0ljb24gPyA8c3BhbiBjbGFzc05hbWU9e3N0YXR1c0ljb25DbGFzc05hbWV9IHRpdGxlPXtzdGF0dXNMYWJlbH0+e3N0YXR1c0ljb259PC9zcGFuPiA6IG51bGx9XG4gICAgICAgIDxwIGNsYXNzTmFtZT17dGl0bGVDbGFzc05hbWV9IGRhdGEtZnVsbHRleHQ9e3NhZmVUaXRsZX0+XG4gICAgICAgICAge3NhZmVUaXRsZX1cbiAgICAgICAgPC9wPlxuICAgICAgICB7c2FmZVN1YnRpdGxlID8gKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT17c3VidGl0bGVDbGFzc05hbWV9IGRhdGEtZnVsbHRleHQ9e3NhZmVTdWJ0aXRsZX0+XG4gICAgICAgICAgICB7c2FmZVN1YnRpdGxlfVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YW1vdW50Q2xhc3NOYW1lfSBkYXRhLWZ1bGx0ZXh0PXtzYWZlQW1vdW50fT5cbiAgICAgICAgICB7c2FmZUFtb3VudH1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGltZWxpbmVDYXJkO1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5cbnR5cGUgRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb25Qcm9wcyA9IHtcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgc2l6ZUNsYXNzTmFtZT86IHN0cmluZztcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSA9ICh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XG59O1xuXG4vLyBSZW5kZXJzIGEgY3VycmVuY3kgZmxhZyBmcm9tIGxvY2FsIGFzc2V0cyB3aXRoIGEgc3RhYmxlIGZhbGxiYWNrIGljb24uXG5jb25zdCBFeHBlbnNlQ3VycmVuY3lGbGFnSWNvbiA9ICh7IGN1cnJlbmN5Q29kZSwgY2xhc3NOYW1lID0gXCJcIiwgc2l6ZUNsYXNzTmFtZSA9IFwiaC00IHctNFwiIH06IEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uUHJvcHMpID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZENvZGUgPSBub3JtYWxpemVDdXJyZW5jeUNvZGUoY3VycmVuY3lDb2RlKTtcbiAgY29uc3QgW2xvYWRGYWlsZWQsIHNldExvYWRGYWlsZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0TG9hZEZhaWxlZChmYWxzZSk7XG4gIH0sIFtub3JtYWxpemVkQ29kZV0pO1xuXG4gIGlmICghbm9ybWFsaXplZENvZGUgfHwgbG9hZEZhaWxlZCkge1xuICAgIHJldHVybiAoXG4gICAgICA8c3BhblxuICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgICBjbGFzc05hbWU9e2BpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1sZyB0ZXh0LVsxMHB4XSBmb250LXNlbWlib2xkIGxlYWRpbmctbm9uZSB0ZXh0LXNsYXRlLTUwMCAke3NpemVDbGFzc05hbWV9ICR7Y2xhc3NOYW1lfWAudHJpbSgpfVxuICAgICAgPlxuICAgICAgICAkXG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGltZ1xuICAgICAgc3JjPXtgL2Fzc2V0cy9mbGFncy8ke2VuY29kZVVSSUNvbXBvbmVudChub3JtYWxpemVkQ29kZSl9LnN2Z2B9XG4gICAgICBhbHQ9XCJcIlxuICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgIGxvYWRpbmc9XCJsYXp5XCJcbiAgICAgIGNsYXNzTmFtZT17YCR7c2l6ZUNsYXNzTmFtZX0gcm91bmRlZC1sZyBvYmplY3QtY29udGFpbiAke2NsYXNzTmFtZX1gLnRyaW0oKX1cbiAgICAgIG9uRXJyb3I9eygpID0+IHNldExvYWRGYWlsZWQodHJ1ZSl9XG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uO1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8gfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlU2hlZXRDdXJyZW5jaWVzLCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uIGZyb20gXCIuL0V4cGVuc2VDdXJyZW5jeUZsYWdJY29uLnRzeFwiO1xuXG50eXBlIEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBzaG93TGFiZWw/OiBib29sZWFuO1xuICBpZEJhc2U/OiBzdHJpbmc7XG4gIHByZWZlckRlZmF1bHRDdXJyZW5jeUZyb21Db250ZXh0PzogYm9vbGVhbjtcbiAgZHJvcGRvd25FeHBhbmRQeD86IG51bWJlcjtcbiAgZHJvcGRvd25NaW5XaWR0aFB4PzogbnVtYmVyO1xufTtcblxuY29uc3Qgbm9ybWFsaXplQ3VycmVuY3lDb2RlID0gKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcbn07XG5cbmNvbnN0IENVUlJFTkNZX0ZMQUdfU0laRV9DTEFTUyA9IFwiaC02IHctNlwiO1xuY29uc3QgQ1VSUkVOQ1lfRFJPUERPV05fUEFORUxfQ0xBU1MgPSBcInZpc2l0YXMtdHlwb2dyYXBoeSByaW5nLVsjQTlCOENDXS83MFwiO1xuY29uc3QgQ1VSUkVOQ1lfRFJPUERPV05fUEFORUxfU1RZTEU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPSB7XG4gIGJhY2tncm91bmRDb2xvcjogXCIjRENFM0VEXCIsXG4gIGJvcmRlcjogXCIxcHggc29saWQgI0E5QjhDQ1wiLFxuICBib3hTaGFkb3c6IFwiMCAxMHB4IDI0cHggcmdiYSgxNSwgNDEsIDY5LCAwLjE0KVwiLFxufTtcbmNvbnN0IENVUlJFTkNZX09QVElPTl9ERUZBVUxUX0NMQVNTID0gXCJ0ZXh0LVsjMEYyOTQ1XVwiO1xuY29uc3QgQ1VSUkVOQ1lfT1BUSU9OX0FDVElWRV9DTEFTUyA9IFwiYmctWyNDNkQyRTNdIHRleHQtWyMwRjI5NDVdXCI7XG5jb25zdCBDVVJSRU5DWV9PUFRJT05fU0VMRUNURURfQ0xBU1MgPSBcImJnLXByaW1hcnkgdGV4dC13aGl0ZVwiO1xuXG5jb25zdCByZWFkUHJlZmVycmVkTG9jYWxlID0gKCk6IHN0cmluZyA9PiB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjb25zdCBmcm9tRG9jdW1lbnQgPSBTdHJpbmcoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Py5sYW5nIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBpZiAoZnJvbURvY3VtZW50KSByZXR1cm4gZnJvbURvY3VtZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjb25zdCBmcm9tTmF2aWdhdG9yID0gU3RyaW5nKG5hdmlnYXRvci5sYW5ndWFnZSB8fCBcIlwiKS50cmltKCk7XG4gICAgaWYgKGZyb21OYXZpZ2F0b3IpIHJldHVybiBmcm9tTmF2aWdhdG9yO1xuICB9XG5cbiAgcmV0dXJuIFwiZW5cIjtcbn07XG5cbi8vIFJlc29sdmVzIGEgbG9jYWxpemVkIGN1cnJlbmN5IGRpc3BsYXkgbmFtZSB3aGVuIEludGwuRGlzcGxheU5hbWVzIGlzIGF2YWlsYWJsZS5cbmNvbnN0IHJlc29sdmVDdXJyZW5jeURpc3BsYXlOYW1lID0gKGN1cnJlbmN5Q29kZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRDb2RlID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKGN1cnJlbmN5Q29kZSk7XG4gIGlmICghbm9ybWFsaXplZENvZGUpIHJldHVybiBcIlwiO1xuXG4gIGNvbnN0IGludGxXaXRoRGlzcGxheU5hbWVzID0gSW50bCBhcyB0eXBlb2YgSW50bCAmIHtcbiAgICBEaXNwbGF5TmFtZXM/OiBuZXcgKFxuICAgICAgbG9jYWxlcz86IHN0cmluZyB8IHN0cmluZ1tdLFxuICAgICAgb3B0aW9ucz86IHsgdHlwZTogXCJjdXJyZW5jeVwiIH1cbiAgICApID0+IHsgb2Y6ICh2YWx1ZTogc3RyaW5nKSA9PiBzdHJpbmcgfCB1bmRlZmluZWQgfTtcbiAgfTtcblxuICBpZiAodHlwZW9mIGludGxXaXRoRGlzcGxheU5hbWVzLkRpc3BsYXlOYW1lcyAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gXCJcIjtcblxuICB0cnkge1xuICAgIGNvbnN0IGRpc3BsYXlOYW1lcyA9IG5ldyBpbnRsV2l0aERpc3BsYXlOYW1lcy5EaXNwbGF5TmFtZXMoW2xvY2FsZSwgXCJlblwiXSwgeyB0eXBlOiBcImN1cnJlbmN5XCIgfSk7XG4gICAgY29uc3QgbG9jYWxpemVkTmFtZSA9IFN0cmluZyhkaXNwbGF5TmFtZXMub2Yobm9ybWFsaXplZENvZGUpIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBpZiAoIWxvY2FsaXplZE5hbWUpIHJldHVybiBcIlwiO1xuXG4gICAgY29uc3Qgbm9ybWFsaXplZE5hbWUgPSBsb2NhbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZWROYW1lID09PSBub3JtYWxpemVkQ29kZSA/IFwiXCIgOiBsb2NhbGl6ZWROYW1lO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxufTtcblxuY29uc3QgbWFwQ3VycmVuY3lPcHRpb25zID0gKGl0ZW1zOiBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0b1tdIHwgdW5kZWZpbmVkLCBsb2NhbGU6IHN0cmluZyk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XG4gIGNvbnN0IHNvdXJjZSA9IEFycmF5LmlzQXJyYXkoaXRlbXMpID8gaXRlbXMgOiBbXTtcbiAgY29uc3Qgc2VlbkNvZGVzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgcmV0dXJuIHNvdXJjZVxuICAgIC5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBjdXJyZW5jeUNvZGVJc28gPSBub3JtYWxpemVDdXJyZW5jeUNvZGUoZW50cnk/LkN1cnJlbmN5Q29kZUlTTyk7XG4gICAgICBjb25zdCBlZmZlY3RpdmVJc29Db2RlID0gY3VycmVuY3lDb2RlSXNvIHx8IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShlbnRyeT8uQ3VycmVuY3lDb2RlKTtcbiAgICAgIGlmICghZWZmZWN0aXZlSXNvQ29kZSkgcmV0dXJuIG51bGw7XG4gICAgICBpZiAoc2VlbkNvZGVzLmhhcyhlZmZlY3RpdmVJc29Db2RlKSkgcmV0dXJuIG51bGw7XG4gICAgICBzZWVuQ29kZXMuYWRkKGVmZmVjdGl2ZUlzb0NvZGUpO1xuXG4gICAgICBjb25zdCBkaXNwbGF5TmFtZSA9IHJlc29sdmVDdXJyZW5jeURpc3BsYXlOYW1lKGVmZmVjdGl2ZUlzb0NvZGUsIGxvY2FsZSk7XG4gICAgICBjb25zdCBvcHRpb25MYWJlbCA9IGRpc3BsYXlOYW1lID8gYCR7ZWZmZWN0aXZlSXNvQ29kZX0gJHtkaXNwbGF5TmFtZX1gIDogZWZmZWN0aXZlSXNvQ29kZTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IGVmZmVjdGl2ZUlzb0NvZGUsXG4gICAgICAgIHRleHQ6IG9wdGlvbkxhYmVsLFxuICAgICAgICBpY29uOiA8RXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gY3VycmVuY3lDb2RlPXtlZmZlY3RpdmVJc29Db2RlfSBzaXplQ2xhc3NOYW1lPXtDVVJSRU5DWV9GTEFHX1NJWkVfQ0xBU1N9IC8+LFxuICAgICAgfSBhcyBFeHBlbnNlU2VsZWN0T3B0aW9uO1xuICAgIH0pXG4gICAgLmZpbHRlcigoZW50cnkpOiBlbnRyeSBpcyBFeHBlbnNlU2VsZWN0T3B0aW9uID0+IGVudHJ5ICE9PSBudWxsKTtcbn07XG5cbi8vIFNoYXJlZCBjdXJyZW5jeSBjb21ib2JveCBiYWNrZWQgYnkgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9jdXJyZW5jaWVzLlxuY29uc3QgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHNob3dMYWJlbCA9IHRydWUsXG4gIGlkQmFzZSA9IFwiZXhwZW5zZS1jdXJyZW5jeVwiLFxuICBwcmVmZXJEZWZhdWx0Q3VycmVuY3lGcm9tQ29udGV4dCA9IGZhbHNlLFxuICBkcm9wZG93bkV4cGFuZFB4ID0gMCxcbiAgZHJvcGRvd25NaW5XaWR0aFB4ID0gMzIwLFxufTogRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0UHJvcHMpID0+IHtcbiAgY29uc3QgbG9jYWxlID0gdXNlTWVtbygoKSA9PiByZWFkUHJlZmVycmVkTG9jYWxlKCksIFtdKTtcbiAgY29uc3QgW29wdGlvbnMsIHNldE9wdGlvbnNdID0gdXNlU3RhdGU8RXhwZW5zZVNlbGVjdE9wdGlvbltdPihbXSk7XG4gIGNvbnN0IFtpc0xvYWRpbmdPcHRpb25zLCBzZXRJc0xvYWRpbmdPcHRpb25zXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2xvYWRFcnJvck1lc3NhZ2UsIHNldExvYWRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtlbXB0eU1lc3NhZ2UsIHNldEVtcHR5TWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3Qgb25DaGFuZ2VSZWYgPSB1c2VSZWYob25DaGFuZ2UpO1xuICBjb25zdCB2YWx1ZVJlZiA9IHVzZVJlZihub3JtYWxpemVDdXJyZW5jeUNvZGUodmFsdWUpKTtcbiAgY29uc3QgaW5pdGlhbERlZmF1bHRBcHBsaWVkUmVmID0gdXNlUmVmKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQgPSBvbkNoYW5nZTtcbiAgfSwgW29uQ2hhbmdlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB2YWx1ZVJlZi5jdXJyZW50ID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKHZhbHVlKTtcbiAgfSwgW3ZhbHVlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgaXNDYW5jZWxsZWQgPSBmYWxzZTtcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gICAgY29uc3QgbG9hZEN1cnJlbmNpZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgICBzZXRJc0xvYWRpbmdPcHRpb25zKHRydWUpO1xuICAgICAgc2V0TG9hZEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICAgIHNldEVtcHR5TWVzc2FnZShcIlwiKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRFeHBlbnNlU2hlZXRDdXJyZW5jaWVzKHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgICBzZXRPcHRpb25zKFtdKTtcbiAgICAgICAgICBzZXRMb2FkRXJyb3JNZXNzYWdlKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldHMuXCIpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtYXBwZWRPcHRpb25zID0gbWFwQ3VycmVuY3lPcHRpb25zKHJlc3BvbnNlLkl0ZW1zLCBsb2NhbGUpO1xuICAgICAgICBzZXRPcHRpb25zKG1hcHBlZE9wdGlvbnMpO1xuXG4gICAgICAgIGlmICghbWFwcGVkT3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICBzZXRFbXB0eU1lc3NhZ2UocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX05vRGF0YVwiLCBcIk5vIGRhdGFcIikpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHZhbHVlUmVmLmN1cnJlbnQ7XG4gICAgICAgIGNvbnN0IGhhc0N1cnJlbnRJbkxpc3QgPSBtYXBwZWRPcHRpb25zLnNvbWUoKG9wdGlvbikgPT4gbm9ybWFsaXplQ3VycmVuY3lDb2RlKG9wdGlvbi52YWx1ZSkgPT09IGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgJiYgaGFzQ3VycmVudEluTGlzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY3VycmVudFZhbHVlICYmIHByZWZlckRlZmF1bHRDdXJyZW5jeUZyb21Db250ZXh0ICYmICFpbml0aWFsRGVmYXVsdEFwcGxpZWRSZWYuY3VycmVudCkge1xuICAgICAgICAgIGNvbnN0IGRlZmF1bHRDdXJyZW5jeUNvZGUgPSBub3JtYWxpemVDdXJyZW5jeUNvZGUoXG4gICAgICAgICAgICBhd2FpdCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlKHtcbiAgICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcblxuICAgICAgICAgIGlmIChkZWZhdWx0Q3VycmVuY3lDb2RlICYmIG1hcHBlZE9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiBub3JtYWxpemVDdXJyZW5jeUNvZGUob3B0aW9uLnZhbHVlKSA9PT0gZGVmYXVsdEN1cnJlbmN5Q29kZSkpIHtcbiAgICAgICAgICAgIGluaXRpYWxEZWZhdWx0QXBwbGllZFJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQoZGVmYXVsdEN1cnJlbmN5Q29kZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgZmFsbGJhY2tFcnJvciA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXRzLlwiKTtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciA/IGVycm9yLm1lc3NhZ2UgfHwgZmFsbGJhY2tFcnJvciA6IGZhbGxiYWNrRXJyb3I7XG4gICAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgICBzZXRMb2FkRXJyb3JNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKCFpc0NhbmNlbGxlZCkge1xuICAgICAgICAgIHNldElzTG9hZGluZ09wdGlvbnMoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZvaWQgbG9hZEN1cnJlbmNpZXMoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpc0NhbmNlbGxlZCA9IHRydWU7XG4gICAgICBjb250cm9sbGVyLmFib3J0KCk7XG4gICAgfTtcbiAgfSwgW2xvY2FsZSwgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHRdKTtcblxuICBjb25zdCBub3JtYWxpemVkVmFsdWUgPSB1c2VNZW1vKCgpID0+IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSh2YWx1ZSksIFt2YWx1ZV0pO1xuICBjb25zdCBkaXNhYmxlQmVjYXVzZU5vRGF0YSA9ICFpc0xvYWRpbmdPcHRpb25zICYmICFsb2FkRXJyb3JNZXNzYWdlICYmIG9wdGlvbnMubGVuZ3RoID09PSAwO1xuICBjb25zdCBlZmZlY3RpdmVEaXNhYmxlZCA9IGRpc2FibGVkIHx8IGRpc2FibGVCZWNhdXNlTm9EYXRhO1xuICBjb25zdCBsb2FkaW5nTWVzc2FnZSA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XG4gICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgIG9wdGlvbnM9e29wdGlvbnN9XG4gICAgICAgIHZhbHVlPXtub3JtYWxpemVkVmFsdWV9XG4gICAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiBvbkNoYW5nZShub3JtYWxpemVDdXJyZW5jeUNvZGUobmV4dFZhbHVlKSl9XG4gICAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgICAgZGlzYWJsZWQ9e2VmZmVjdGl2ZURpc2FibGVkfVxuICAgICAgICBhbGxvd1RleHRJbnB1dFxuICAgICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cbiAgICAgICAgc2hvd0xhYmVsPXtzaG93TGFiZWx9XG4gICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XG4gICAgICAgIHNlbGVjdGVkVGV4dE1vZGU9XCJ2YWx1ZVwiXG4gICAgICAgIGRyb3Bkb3duRXhwYW5kUHg9e2Ryb3Bkb3duRXhwYW5kUHh9XG4gICAgICAgIGRyb3Bkb3duTWluV2lkdGhQeD17ZHJvcGRvd25NaW5XaWR0aFB4fVxuICAgICAgICBkcm9wZG93bk1heEhlaWdodENsYXNzPVwibWF4LWgtOTZcIlxuICAgICAgICBzZWxlY3RlZEljb25DbGFzc05hbWU9e0NVUlJFTkNZX0ZMQUdfU0laRV9DTEFTU31cbiAgICAgICAgc2VsZWN0ZWRJbnB1dFBhZGRpbmdDbGFzc05hbWU9XCJwbC0xMlwiXG4gICAgICAgIGNsZWFyT25FbXB0eUlucHV0XG4gICAgICAgIG9wdGlvbkljb25DbGFzc05hbWU9e0NVUlJFTkNZX0ZMQUdfU0laRV9DTEFTU31cbiAgICAgICAgYWxsb3dPcHRpb25Ib3Jpem9udGFsU2Nyb2xsXG4gICAgICAgIGxvY2tEcm9wZG93bldpZHRoT25GaXJzdE9wZW5cbiAgICAgICAgZGlzYWJsZURlZmF1bHRPcHRpb25QYWRkaW5nXG4gICAgICAgIG9wdGlvbkxlZnRQYWRkaW5nQ2xhc3NOYW1lPVwicGwtMVwiXG4gICAgICAgIG9wdGlvbkRlZmF1bHRDbGFzc05hbWU9e0NVUlJFTkNZX09QVElPTl9ERUZBVUxUX0NMQVNTfVxuICAgICAgICBvcHRpb25BY3RpdmVDbGFzc05hbWU9e0NVUlJFTkNZX09QVElPTl9BQ1RJVkVfQ0xBU1N9XG4gICAgICAgIG9wdGlvblNlbGVjdGVkQ2xhc3NOYW1lPXtDVVJSRU5DWV9PUFRJT05fU0VMRUNURURfQ0xBU1N9XG4gICAgICAgIGlkQmFzZT17aWRCYXNlfVxuICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICBwYW5lbENsYXNzTmFtZT17Q1VSUkVOQ1lfRFJPUERPV05fUEFORUxfQ0xBU1N9XG4gICAgICAgIHBhbmVsU3R5bGU9e0NVUlJFTkNZX0RST1BET1dOX1BBTkVMX1NUWUxFfVxuICAgICAgLz5cbiAgICAgIHtpc0xvYWRpbmdPcHRpb25zID8gPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMFwiPntsb2FkaW5nTWVzc2FnZX08L3A+IDogbnVsbH1cbiAgICAgIHshaXNMb2FkaW5nT3B0aW9ucyAmJiBsb2FkRXJyb3JNZXNzYWdlID8gPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWRhbmdlclwiPntsb2FkRXJyb3JNZXNzYWdlfTwvcD4gOiBudWxsfVxuICAgICAgeyFpc0xvYWRpbmdPcHRpb25zICYmICFsb2FkRXJyb3JNZXNzYWdlICYmIGVtcHR5TWVzc2FnZSA/IDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS01MDBcIj57ZW1wdHlNZXNzYWdlfTwvcD4gOiBudWxsfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0O1xuXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF5RFU7QUFwQ1YsSUFBTSxzQkFBc0IsQ0FBQztBQUFBLEVBQzNCO0FBQUEsRUFD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QUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBLE9BQU87QUFBQSxRQUNQLFVBQVUsQ0FBQyxjQUFjLFNBQVNBLHVCQUFzQixTQUFTLENBQUM7QUFBQSxRQUNsRTtBQUFBLFFBQ0EsVUFBVTtBQUFBLFFBQ1YsZ0JBQWM7QUFBQSxRQUNkLGtCQUFrQjtBQUFBLFFBQ2xCO0FBQUEsUUFDQSxXQUFXO0FBQUEsUUFDWCxrQkFBaUI7QUFBQSxRQUNqQjtBQUFBLFFBQ0E7QUFBQSxRQUNBLHdCQUF1QjtBQUFBLFFBQ3ZCLHVCQUF1QjtBQUFBLFFBQ3ZCLCtCQUE4QjtBQUFBLFFBQzlCLG1CQUFpQjtBQUFBLFFBQ2pCLHFCQUFxQjtBQUFBLFFBQ3JCLDZCQUEyQjtBQUFBLFFBQzNCLDhCQUE0QjtBQUFBLFFBQzVCLDZCQUEyQjtBQUFBLFFBQzNCLDRCQUEyQjtBQUFBLFFBQzNCLHdCQUF3QjtBQUFBLFFBQ3hCLHVCQUF1QjtBQUFBLFFBQ3ZCLHlCQUF5QjtBQUFBLFFBQ3pCO0FBQUEsUUFDQSxpQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixZQUFZO0FBQUE7QUFBQSxJQUNkO0FBQUEsSUFDQyxtQkFBbUIsNkNBQUMsT0FBRSxXQUFVLDBCQUEwQiwwQkFBZSxJQUFPO0FBQUEsSUFDaEYsQ0FBQyxvQkFBb0IsbUJBQW1CLDZDQUFDLE9BQUUsV0FBVSx1QkFBdUIsNEJBQWlCLElBQU87QUFBQSxJQUNwRyxDQUFDLG9CQUFvQixDQUFDLG9CQUFvQixlQUFlLDZDQUFDLE9BQUUsV0FBVSwwQkFBMEIsd0JBQWEsSUFBTztBQUFBLEtBQ3ZIO0FBRUo7QUFFQSxJQUFPLHNDQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJub3JtYWxpemVDdXJyZW5jeUNvZGUiXQp9Cg==
