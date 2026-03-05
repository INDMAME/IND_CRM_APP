import {
  SelectCombobox_default
} from "./chunk-GIUUNBHM.js";
import {
  getExpenseSheetCurrencies,
  getExpenseSheetDefaultCurrencyCode,
  normalizeCardTitleText,
  safeText
} from "./chunk-GGS3XUX2.js";
import {
  ApiFetchError,
  indT
} from "./chunk-PU3BESI6.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-BWM3JLWG.js";
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
          statusIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: statusIconClassName, role: "group", "aria-label": statusLabel || void 0, children: statusIcon }) : null,
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
        usePortal: true,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlQ3VycmVuY3lGbGFnSWNvbi50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZURhdGVQYXJ0cyB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgbm9ybWFsaXplQ2FyZFRpdGxlVGV4dCwgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcblxudHlwZSBFeHBlbnNlVGltZWxpbmVDYXJkUHJvcHMgPSB7XG4gIGRhdGVQYXJ0czogRXhwZW5zZURhdGVQYXJ0cztcbiAgdGl0bGU6IHN0cmluZztcbiAgYW1vdW50VGV4dDogc3RyaW5nO1xuICBvbk9wZW46ICgpID0+IHZvaWQ7XG4gIHRpdGxlQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBhbW91bnRDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHN0YXR1c0NsYXNzTmFtZT86IHN0cmluZztcbiAgc3RhdHVzTGFiZWw/OiBzdHJpbmc7XG4gIHN1YnRpdGxlPzogc3RyaW5nO1xuICBzdWJ0aXRsZUNsYXNzTmFtZT86IHN0cmluZztcbiAgc3RhdHVzSWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcbiAgc3RhdHVzSWNvbkNsYXNzTmFtZT86IHN0cmluZztcbiAgZGF0ZVBhbmVsQ29udGVudD86IFJlYWN0LlJlYWN0Tm9kZTtcbn07XG5cbi8vIFJldXNhYmxlIGNsaWNrYWJsZSB0aW1lbGluZSBjYXJkIGZvciBleHBlbnNlIHNoZWV0cyBhbmQgZXhwZW5zZSBsaW5lcy5cbmNvbnN0IEV4cGVuc2VUaW1lbGluZUNhcmQgPSAoe1xuICBkYXRlUGFydHMsXG4gIHRpdGxlLFxuICBhbW91bnRUZXh0LFxuICBvbk9wZW4sXG4gIHRpdGxlQ2xhc3NOYW1lID0gXCJ0aW1lbGluZS1uYW1lXCIsXG4gIGFtb3VudENsYXNzTmFtZSA9IFwiZXhwZW5zZS1zaGVldC1jYXJkX19hbW91bnRcIixcbiAgc3RhdHVzQ2xhc3NOYW1lLFxuICBzdGF0dXNMYWJlbCxcbiAgc3VidGl0bGUgPSBcIlwiLFxuICBzdWJ0aXRsZUNsYXNzTmFtZSA9IFwiZXhwZW5zZS1zaGVldC1jYXJkX19zdWJ0aXRsZVwiLFxuICBzdGF0dXNJY29uLFxuICBzdGF0dXNJY29uQ2xhc3NOYW1lID0gXCJleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cy1pY29uXCIsXG4gIGRhdGVQYW5lbENvbnRlbnQsXG59OiBFeHBlbnNlVGltZWxpbmVDYXJkUHJvcHMpID0+IHtcbiAgY29uc3Qgc2FmZVRpdGxlID0gbm9ybWFsaXplQ2FyZFRpdGxlVGV4dCh0aXRsZSwgXCItXCIpO1xuICBjb25zdCBzYWZlQW1vdW50ID0gYW1vdW50VGV4dCB8fCBcIi1cIjtcbiAgY29uc3Qgc2FmZVN1YnRpdGxlID0gc2FmZVRleHQoc3VidGl0bGUpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPVwidGltZWxpbmUtY2FyZCB0aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIlxuICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICB0YWJJbmRleD17MH1cbiAgICAgIG9uQ2xpY2s9e29uT3Blbn1cbiAgICAgIG9uS2V5RG93bj17KGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIiB8fCBldmVudC5rZXkgPT09IFwiIFwiKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBvbk9wZW4oKTtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWRhdGUtcGFuZWwgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEgcHgtMyBweS0zIGJnLXNsYXRlLTUwIGJvcmRlci1yIGJvcmRlci1zbGF0ZS0yMDAgdGV4dC1zbGF0ZS02MDBcIj5cbiAgICAgICAge2RhdGVQYW5lbENvbnRlbnQgPyAoXG4gICAgICAgICAgZGF0ZVBhbmVsQ29udGVudFxuICAgICAgICApIDogKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFja2luZy1bMC4yZW1dIHRleHQtc2xhdGUtNTAwXCI+e2RhdGVQYXJ0cy55ZWFyfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLVswLjJlbV0gdGV4dC1zbGF0ZS01MDBcIj57ZGF0ZVBhcnRzLm1vbnRofTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LXNlbWlib2xkIHRleHQtcHJpbWFyeVwiPntkYXRlUGFydHMuZGF5fTwvZGl2PlxuICAgICAgICAgIDwvPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWNhcmRfX2NvbnRlbnQgZmxleC0xIHB5LTMgcHgtNFwiPlxuICAgICAgICB7c3RhdHVzQ2xhc3NOYW1lID8gPHNwYW4gY2xhc3NOYW1lPXtzdGF0dXNDbGFzc05hbWV9IHRpdGxlPXtzdGF0dXNMYWJlbH0gYXJpYS1sYWJlbD17c3RhdHVzTGFiZWx9IC8+IDogbnVsbH1cbiAgICAgICAge3N0YXR1c0ljb24gPyAoXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdGF0dXNJY29uQ2xhc3NOYW1lfSByb2xlPVwiZ3JvdXBcIiBhcmlhLWxhYmVsPXtzdGF0dXNMYWJlbCB8fCB1bmRlZmluZWR9PlxuICAgICAgICAgICAge3N0YXR1c0ljb259XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPHAgY2xhc3NOYW1lPXt0aXRsZUNsYXNzTmFtZX0gZGF0YS1mdWxsdGV4dD17c2FmZVRpdGxlfT5cbiAgICAgICAgICB7c2FmZVRpdGxlfVxuICAgICAgICA8L3A+XG4gICAgICAgIHtzYWZlU3VidGl0bGUgPyAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPXtzdWJ0aXRsZUNsYXNzTmFtZX0gZGF0YS1mdWxsdGV4dD17c2FmZVN1YnRpdGxlfT5cbiAgICAgICAgICAgIHtzYWZlU3VidGl0bGV9XG4gICAgICAgICAgPC9wPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXthbW91bnRDbGFzc05hbWV9IGRhdGEtZnVsbHRleHQ9e3NhZmVBbW91bnR9PlxuICAgICAgICAgIHtzYWZlQW1vdW50fVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaW1lbGluZUNhcmQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBFeHBlbnNlQ3VycmVuY3lGbGFnSWNvblByb3BzID0ge1xuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBzaXplQ2xhc3NOYW1lPzogc3RyaW5nO1xufTtcblxuY29uc3Qgbm9ybWFsaXplQ3VycmVuY3lDb2RlID0gKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcbn07XG5cbi8vIFJlbmRlcnMgYSBjdXJyZW5jeSBmbGFnIGZyb20gbG9jYWwgYXNzZXRzIHdpdGggYSBzdGFibGUgZmFsbGJhY2sgaWNvbi5cbmNvbnN0IEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uID0gKHsgY3VycmVuY3lDb2RlLCBjbGFzc05hbWUgPSBcIlwiLCBzaXplQ2xhc3NOYW1lID0gXCJoLTQgdy00XCIgfTogRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb25Qcm9wcykgPT4ge1xuICBjb25zdCBub3JtYWxpemVkQ29kZSA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShjdXJyZW5jeUNvZGUpO1xuICBjb25zdCBbbG9hZEZhaWxlZCwgc2V0TG9hZEZhaWxlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRMb2FkRmFpbGVkKGZhbHNlKTtcbiAgfSwgW25vcm1hbGl6ZWRDb2RlXSk7XG5cbiAgaWYgKCFub3JtYWxpemVkQ29kZSB8fCBsb2FkRmFpbGVkKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuXG4gICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgIGNsYXNzTmFtZT17YGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLWxnIHRleHQtWzEwcHhdIGZvbnQtc2VtaWJvbGQgbGVhZGluZy1ub25lIHRleHQtc2xhdGUtNTAwICR7c2l6ZUNsYXNzTmFtZX0gJHtjbGFzc05hbWV9YC50cmltKCl9XG4gICAgICA+XG4gICAgICAgICRcbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8aW1nXG4gICAgICBzcmM9e2AvYXNzZXRzL2ZsYWdzLyR7ZW5jb2RlVVJJQ29tcG9uZW50KG5vcm1hbGl6ZWRDb2RlKX0uc3ZnYH1cbiAgICAgIGFsdD1cIlwiXG4gICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgbG9hZGluZz1cImxhenlcIlxuICAgICAgY2xhc3NOYW1lPXtgJHtzaXplQ2xhc3NOYW1lfSByb3VuZGVkLWxnIG9iamVjdC1jb250YWluICR7Y2xhc3NOYW1lfWAudHJpbSgpfVxuICAgICAgb25FcnJvcj17KCkgPT4gc2V0TG9hZEZhaWxlZCh0cnVlKX1cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb247XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0byB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGdldEV4cGVuc2VTaGVldEN1cnJlbmNpZXMsIGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24udHN4XCI7XG5cbnR5cGUgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG4gIGlkQmFzZT86IHN0cmluZztcbiAgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHQ/OiBib29sZWFuO1xuICBkcm9wZG93bkV4cGFuZFB4PzogbnVtYmVyO1xuICBkcm9wZG93bk1pbldpZHRoUHg/OiBudW1iZXI7XG59O1xuXG5jb25zdCBub3JtYWxpemVDdXJyZW5jeUNvZGUgPSAodmFsdWU6IHN0cmluZyB8IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xufTtcblxuY29uc3QgQ1VSUkVOQ1lfRkxBR19TSVpFX0NMQVNTID0gXCJoLTYgdy02XCI7XG5jb25zdCBDVVJSRU5DWV9EUk9QRE9XTl9QQU5FTF9DTEFTUyA9IFwidmlzaXRhcy10eXBvZ3JhcGh5IHJpbmctWyNBOUI4Q0NdLzcwXCI7XG5jb25zdCBDVVJSRU5DWV9EUk9QRE9XTl9QQU5FTF9TVFlMRTogUmVhY3QuQ1NTUHJvcGVydGllcyA9IHtcbiAgYmFja2dyb3VuZENvbG9yOiBcIiNEQ0UzRURcIixcbiAgYm9yZGVyOiBcIjFweCBzb2xpZCAjQTlCOENDXCIsXG4gIGJveFNoYWRvdzogXCIwIDEwcHggMjRweCByZ2JhKDE1LCA0MSwgNjksIDAuMTQpXCIsXG59O1xuY29uc3QgQ1VSUkVOQ1lfT1BUSU9OX0RFRkFVTFRfQ0xBU1MgPSBcInRleHQtWyMwRjI5NDVdXCI7XG5jb25zdCBDVVJSRU5DWV9PUFRJT05fQUNUSVZFX0NMQVNTID0gXCJiZy1bI0M2RDJFM10gdGV4dC1bIzBGMjk0NV1cIjtcbmNvbnN0IENVUlJFTkNZX09QVElPTl9TRUxFQ1RFRF9DTEFTUyA9IFwiYmctcHJpbWFyeSB0ZXh0LXdoaXRlXCI7XG5cbmNvbnN0IHJlYWRQcmVmZXJyZWRMb2NhbGUgPSAoKTogc3RyaW5nID0+IHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNvbnN0IGZyb21Eb2N1bWVudCA9IFN0cmluZyhkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJcIikudHJpbSgpO1xuICAgIGlmIChmcm9tRG9jdW1lbnQpIHJldHVybiBmcm9tRG9jdW1lbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNvbnN0IGZyb21OYXZpZ2F0b3IgPSBTdHJpbmcobmF2aWdhdG9yLmxhbmd1YWdlIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBpZiAoZnJvbU5hdmlnYXRvcikgcmV0dXJuIGZyb21OYXZpZ2F0b3I7XG4gIH1cblxuICByZXR1cm4gXCJlblwiO1xufTtcblxuLy8gUmVzb2x2ZXMgYSBsb2NhbGl6ZWQgY3VycmVuY3kgZGlzcGxheSBuYW1lIHdoZW4gSW50bC5EaXNwbGF5TmFtZXMgaXMgYXZhaWxhYmxlLlxuY29uc3QgcmVzb2x2ZUN1cnJlbmN5RGlzcGxheU5hbWUgPSAoY3VycmVuY3lDb2RlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZENvZGUgPSBub3JtYWxpemVDdXJyZW5jeUNvZGUoY3VycmVuY3lDb2RlKTtcbiAgaWYgKCFub3JtYWxpemVkQ29kZSkgcmV0dXJuIFwiXCI7XG5cbiAgY29uc3QgaW50bFdpdGhEaXNwbGF5TmFtZXMgPSBJbnRsIGFzIHR5cGVvZiBJbnRsICYge1xuICAgIERpc3BsYXlOYW1lcz86IG5ldyAoXG4gICAgICBsb2NhbGVzPzogc3RyaW5nIHwgc3RyaW5nW10sXG4gICAgICBvcHRpb25zPzogeyB0eXBlOiBcImN1cnJlbmN5XCIgfVxuICAgICkgPT4geyBvZjogKHZhbHVlOiBzdHJpbmcpID0+IHN0cmluZyB8IHVuZGVmaW5lZCB9O1xuICB9O1xuXG4gIGlmICh0eXBlb2YgaW50bFdpdGhEaXNwbGF5TmFtZXMuRGlzcGxheU5hbWVzICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBcIlwiO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgZGlzcGxheU5hbWVzID0gbmV3IGludGxXaXRoRGlzcGxheU5hbWVzLkRpc3BsYXlOYW1lcyhbbG9jYWxlLCBcImVuXCJdLCB7IHR5cGU6IFwiY3VycmVuY3lcIiB9KTtcbiAgICBjb25zdCBsb2NhbGl6ZWROYW1lID0gU3RyaW5nKGRpc3BsYXlOYW1lcy5vZihub3JtYWxpemVkQ29kZSkgfHwgXCJcIikudHJpbSgpO1xuICAgIGlmICghbG9jYWxpemVkTmFtZSkgcmV0dXJuIFwiXCI7XG5cbiAgICBjb25zdCBub3JtYWxpemVkTmFtZSA9IGxvY2FsaXplZE5hbWUudG9VcHBlckNhc2UoKTtcbiAgICByZXR1cm4gbm9ybWFsaXplZE5hbWUgPT09IG5vcm1hbGl6ZWRDb2RlID8gXCJcIiA6IGxvY2FsaXplZE5hbWU7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG59O1xuXG5jb25zdCBtYXBDdXJyZW5jeU9wdGlvbnMgPSAoaXRlbXM6IEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvW10gfCB1bmRlZmluZWQsIGxvY2FsZTogc3RyaW5nKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcbiAgY29uc3Qgc291cmNlID0gQXJyYXkuaXNBcnJheShpdGVtcykgPyBpdGVtcyA6IFtdO1xuICBjb25zdCBzZWVuQ29kZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICByZXR1cm4gc291cmNlXG4gICAgLm1hcCgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbmN5Q29kZUlzbyA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShlbnRyeT8uQ3VycmVuY3lDb2RlSVNPKTtcbiAgICAgIGNvbnN0IGVmZmVjdGl2ZUlzb0NvZGUgPSBjdXJyZW5jeUNvZGVJc28gfHwgbm9ybWFsaXplQ3VycmVuY3lDb2RlKGVudHJ5Py5DdXJyZW5jeUNvZGUpO1xuICAgICAgaWYgKCFlZmZlY3RpdmVJc29Db2RlKSByZXR1cm4gbnVsbDtcbiAgICAgIGlmIChzZWVuQ29kZXMuaGFzKGVmZmVjdGl2ZUlzb0NvZGUpKSByZXR1cm4gbnVsbDtcbiAgICAgIHNlZW5Db2Rlcy5hZGQoZWZmZWN0aXZlSXNvQ29kZSk7XG5cbiAgICAgIGNvbnN0IGRpc3BsYXlOYW1lID0gcmVzb2x2ZUN1cnJlbmN5RGlzcGxheU5hbWUoZWZmZWN0aXZlSXNvQ29kZSwgbG9jYWxlKTtcbiAgICAgIGNvbnN0IG9wdGlvbkxhYmVsID0gZGlzcGxheU5hbWUgPyBgJHtlZmZlY3RpdmVJc29Db2RlfSAke2Rpc3BsYXlOYW1lfWAgOiBlZmZlY3RpdmVJc29Db2RlO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogZWZmZWN0aXZlSXNvQ29kZSxcbiAgICAgICAgdGV4dDogb3B0aW9uTGFiZWwsXG4gICAgICAgIGljb246IDxFeHBlbnNlQ3VycmVuY3lGbGFnSWNvbiBjdXJyZW5jeUNvZGU9e2VmZmVjdGl2ZUlzb0NvZGV9IHNpemVDbGFzc05hbWU9e0NVUlJFTkNZX0ZMQUdfU0laRV9DTEFTU30gLz4sXG4gICAgICB9IGFzIEV4cGVuc2VTZWxlY3RPcHRpb247XG4gICAgfSlcbiAgICAuZmlsdGVyKChlbnRyeSk6IGVudHJ5IGlzIEV4cGVuc2VTZWxlY3RPcHRpb24gPT4gZW50cnkgIT09IG51bGwpO1xufTtcblxuLy8gU2hhcmVkIGN1cnJlbmN5IGNvbWJvYm94IGJhY2tlZCBieSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2N1cnJlbmNpZXMuXG5jb25zdCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QgPSAoe1xuICBsYWJlbCxcbiAgcGxhY2Vob2xkZXIsXG4gIHZhbHVlLFxuICBvbkNoYW5nZSxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcbiAgaWRCYXNlID0gXCJleHBlbnNlLWN1cnJlbmN5XCIsXG4gIHByZWZlckRlZmF1bHRDdXJyZW5jeUZyb21Db250ZXh0ID0gZmFsc2UsXG4gIGRyb3Bkb3duRXhwYW5kUHggPSAwLFxuICBkcm9wZG93bk1pbldpZHRoUHggPSAzMjAsXG59OiBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RQcm9wcykgPT4ge1xuICBjb25zdCBsb2NhbGUgPSB1c2VNZW1vKCgpID0+IHJlYWRQcmVmZXJyZWRMb2NhbGUoKSwgW10pO1xuICBjb25zdCBbb3B0aW9ucywgc2V0T3B0aW9uc10gPSB1c2VTdGF0ZTxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KFtdKTtcbiAgY29uc3QgW2lzTG9hZGluZ09wdGlvbnMsIHNldElzTG9hZGluZ09wdGlvbnNdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbG9hZEVycm9yTWVzc2FnZSwgc2V0TG9hZEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2VtcHR5TWVzc2FnZSwgc2V0RW1wdHlNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBvbkNoYW5nZVJlZiA9IHVzZVJlZihvbkNoYW5nZSk7XG4gIGNvbnN0IHZhbHVlUmVmID0gdXNlUmVmKG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSh2YWx1ZSkpO1xuICBjb25zdCBpbml0aWFsRGVmYXVsdEFwcGxpZWRSZWYgPSB1c2VSZWYoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgb25DaGFuZ2VSZWYuY3VycmVudCA9IG9uQ2hhbmdlO1xuICB9LCBbb25DaGFuZ2VdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHZhbHVlUmVmLmN1cnJlbnQgPSBub3JtYWxpemVDdXJyZW5jeUNvZGUodmFsdWUpO1xuICB9LCBbdmFsdWVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBpc0NhbmNlbGxlZCA9IGZhbHNlO1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cbiAgICBjb25zdCBsb2FkQ3VycmVuY2llcyA9IGFzeW5jICgpID0+IHtcbiAgICAgIHNldElzTG9hZGluZ09wdGlvbnModHJ1ZSk7XG4gICAgICBzZXRMb2FkRXJyb3JNZXNzYWdlKFwiXCIpO1xuICAgICAgc2V0RW1wdHlNZXNzYWdlKFwiXCIpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldEV4cGVuc2VTaGVldEN1cnJlbmNpZXMoe1xuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xuICAgICAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgICAgIHNldExvYWRFcnJvck1lc3NhZ2UocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0cy5cIikpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1hcHBlZE9wdGlvbnMgPSBtYXBDdXJyZW5jeU9wdGlvbnMocmVzcG9uc2UuSXRlbXMsIGxvY2FsZSk7XG4gICAgICAgIHNldE9wdGlvbnMobWFwcGVkT3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKCFtYXBwZWRPcHRpb25zLmxlbmd0aCkge1xuICAgICAgICAgIHNldEVtcHR5TWVzc2FnZShyZXNwb25zZS5NZXNzYWdlIHx8IGluZFQoXCJDb21tb25fTm9EYXRhXCIsIFwiTm8gZGF0YVwiKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gdmFsdWVSZWYuY3VycmVudDtcbiAgICAgICAgY29uc3QgaGFzQ3VycmVudEluTGlzdCA9IG1hcHBlZE9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiBub3JtYWxpemVDdXJyZW5jeUNvZGUob3B0aW9uLnZhbHVlKSA9PT0gY3VycmVudFZhbHVlKTtcbiAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSAmJiBoYXNDdXJyZW50SW5MaXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjdXJyZW50VmFsdWUgJiYgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHQgJiYgIWluaXRpYWxEZWZhdWx0QXBwbGllZFJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgY29uc3QgZGVmYXVsdEN1cnJlbmN5Q29kZSA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShcbiAgICAgICAgICAgIGF3YWl0IGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUoe1xuICAgICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xuXG4gICAgICAgICAgaWYgKGRlZmF1bHRDdXJyZW5jeUNvZGUgJiYgbWFwcGVkT3B0aW9ucy5zb21lKChvcHRpb24pID0+IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShvcHRpb24udmFsdWUpID09PSBkZWZhdWx0Q3VycmVuY3lDb2RlKSkge1xuICAgICAgICAgICAgaW5pdGlhbERlZmF1bHRBcHBsaWVkUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICAgICAgb25DaGFuZ2VSZWYuY3VycmVudChkZWZhdWx0Q3VycmVuY3lDb2RlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gXCJBYm9ydEVycm9yXCIpIHJldHVybjtcblxuICAgICAgICBjb25zdCBmYWxsYmFja0Vycm9yID0gaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldHMuXCIpO1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yID8gZXJyb3IubWVzc2FnZSB8fCBmYWxsYmFja0Vycm9yIDogZmFsbGJhY2tFcnJvcjtcbiAgICAgICAgc2V0T3B0aW9ucyhbXSk7XG4gICAgICAgIHNldExvYWRFcnJvck1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoIWlzQ2FuY2VsbGVkKSB7XG4gICAgICAgICAgc2V0SXNMb2FkaW5nT3B0aW9ucyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdm9pZCBsb2FkQ3VycmVuY2llcygpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlzQ2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgIGNvbnRyb2xsZXIuYWJvcnQoKTtcbiAgICB9O1xuICB9LCBbbG9jYWxlLCBwcmVmZXJEZWZhdWx0Q3VycmVuY3lGcm9tQ29udGV4dF0pO1xuXG4gIGNvbnN0IG5vcm1hbGl6ZWRWYWx1ZSA9IHVzZU1lbW8oKCkgPT4gbm9ybWFsaXplQ3VycmVuY3lDb2RlKHZhbHVlKSwgW3ZhbHVlXSk7XG4gIGNvbnN0IGRpc2FibGVCZWNhdXNlTm9EYXRhID0gIWlzTG9hZGluZ09wdGlvbnMgJiYgIWxvYWRFcnJvck1lc3NhZ2UgJiYgb3B0aW9ucy5sZW5ndGggPT09IDA7XG4gIGNvbnN0IGVmZmVjdGl2ZURpc2FibGVkID0gZGlzYWJsZWQgfHwgZGlzYWJsZUJlY2F1c2VOb0RhdGE7XG4gIGNvbnN0IGxvYWRpbmdNZXNzYWdlID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgIDxTZWxlY3RDb21ib2JveFxuICAgICAgICBsYWJlbD17bGFiZWx9XG4gICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgb3B0aW9ucz17b3B0aW9uc31cbiAgICAgICAgdmFsdWU9e25vcm1hbGl6ZWRWYWx1ZX1cbiAgICAgICAgb25DaGFuZ2U9eyhuZXh0VmFsdWUpID0+IG9uQ2hhbmdlKG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShuZXh0VmFsdWUpKX1cbiAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgICBkaXNhYmxlZD17ZWZmZWN0aXZlRGlzYWJsZWR9XG4gICAgICAgIGFsbG93VGV4dElucHV0XG4gICAgICAgIHNob3dTZWFyY2hCdXR0b249e2ZhbHNlfVxuICAgICAgICBzaG93TGFiZWw9e3Nob3dMYWJlbH1cbiAgICAgICAgdXNlUG9ydGFsXG4gICAgICAgIHNlbGVjdGVkVGV4dE1vZGU9XCJ2YWx1ZVwiXG4gICAgICAgIGRyb3Bkb3duRXhwYW5kUHg9e2Ryb3Bkb3duRXhwYW5kUHh9XG4gICAgICAgIGRyb3Bkb3duTWluV2lkdGhQeD17ZHJvcGRvd25NaW5XaWR0aFB4fVxuICAgICAgICBkcm9wZG93bk1heEhlaWdodENsYXNzPVwibWF4LWgtOTZcIlxuICAgICAgICBzZWxlY3RlZEljb25DbGFzc05hbWU9e0NVUlJFTkNZX0ZMQUdfU0laRV9DTEFTU31cbiAgICAgICAgc2VsZWN0ZWRJbnB1dFBhZGRpbmdDbGFzc05hbWU9XCJwbC0xMlwiXG4gICAgICAgIGNsZWFyT25FbXB0eUlucHV0XG4gICAgICAgIG9wdGlvbkljb25DbGFzc05hbWU9e0NVUlJFTkNZX0ZMQUdfU0laRV9DTEFTU31cbiAgICAgICAgYWxsb3dPcHRpb25Ib3Jpem9udGFsU2Nyb2xsXG4gICAgICAgIGxvY2tEcm9wZG93bldpZHRoT25GaXJzdE9wZW5cbiAgICAgICAgZGlzYWJsZURlZmF1bHRPcHRpb25QYWRkaW5nXG4gICAgICAgIG9wdGlvbkxlZnRQYWRkaW5nQ2xhc3NOYW1lPVwicGwtMVwiXG4gICAgICAgIG9wdGlvbkRlZmF1bHRDbGFzc05hbWU9e0NVUlJFTkNZX09QVElPTl9ERUZBVUxUX0NMQVNTfVxuICAgICAgICBvcHRpb25BY3RpdmVDbGFzc05hbWU9e0NVUlJFTkNZX09QVElPTl9BQ1RJVkVfQ0xBU1N9XG4gICAgICAgIG9wdGlvblNlbGVjdGVkQ2xhc3NOYW1lPXtDVVJSRU5DWV9PUFRJT05fU0VMRUNURURfQ0xBU1N9XG4gICAgICAgIGlkQmFzZT17aWRCYXNlfVxuICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgICBwYW5lbENsYXNzTmFtZT17Q1VSUkVOQ1lfRFJPUERPV05fUEFORUxfQ0xBU1N9XG4gICAgICAgIHBhbmVsU3R5bGU9e0NVUlJFTkNZX0RST1BET1dOX1BBTkVMX1NUWUxFfVxuICAgICAgLz5cbiAgICAgIHtpc0xvYWRpbmdPcHRpb25zID8gPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMFwiPntsb2FkaW5nTWVzc2FnZX08L3A+IDogbnVsbH1cbiAgICAgIHshaXNMb2FkaW5nT3B0aW9ucyAmJiBsb2FkRXJyb3JNZXNzYWdlID8gPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWRhbmdlclwiPntsb2FkRXJyb3JNZXNzYWdlfTwvcD4gOiBudWxsfVxuICAgICAgeyFpc0xvYWRpbmdPcHRpb25zICYmICFsb2FkRXJyb3JNZXNzYWdlICYmIGVtcHR5TWVzc2FnZSA/IDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS01MDBcIj57ZW1wdHlNZXNzYWdlfTwvcD4gOiBudWxsfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0O1xuXHJcbiJdLAogICJtYXBwaW5n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TSxpQkFBaUIsS0FBSyxrQkFBa0IsU0FBUztBQUV2RCxTQUNFLDhDQUFDLFNBQUksV0FBVSxlQUNiO0FBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBLE9BQU87QUFBQSxRQUNQLFVBQVUsQ0FBQyxjQUFjLFNBQVNBLHVCQUFzQixTQUFTLENBQUM7QUFBQSxRQUNsRTtBQUFBLFFBQ0EsVUFBVTtBQUFBLFFBQ1YsZ0JBQWM7QUFBQSxRQUNkLGtCQUFrQjtBQUFBLFFBQ2xCO0FBQUEsUUFDQSxXQUFTO0FBQUEsUUFDVCxrQkFBaUI7QUFBQSxRQUNqQjtBQUFBLFFBQ0E7QUFBQSxRQUNBLHdCQUF1QjtBQUFBLFFBQ3ZCLHVCQUF1QjtBQUFBLFFBQ3ZCLCtCQUE4QjtBQUFBLFFBQzlCLG1CQUFpQjtBQUFBLFFBQ2pCLHFCQUFxQjtBQUFBLFFBQ3JCLDZCQUEyQjtBQUFBLFFBQzNCLDhCQUE0QjtBQUFBLFFBQzVCLDZCQUEyQjtBQUFBLFFBQzNCLDRCQUEyQjtBQUFBLFFBQzNCLHdCQUF3QjtBQUFBLFFBQ3hCLHVCQUF1QjtBQUFBLFFBQ3ZCLHlCQUF5QjtBQUFBLFFBQ3pCO0FBQUEsUUFDQSxpQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixZQUFZO0FBQUE7QUFBQSxJQUNkO0FBQUEsSUFDQyxtQkFBbUIsNkNBQUMsT0FBRSxXQUFVLDBCQUEwQiwwQkFBZSxJQUFPO0FBQUEsSUFDaEYsQ0FBQyxvQkFBb0IsbUJBQW1CLDZDQUFDLE9BQUUsV0FBVSx1QkFBdUIsNEJBQWlCLElBQU87QUFBQSxJQUNwRyxDQUFDLG9CQUFvQixDQUFDLG9CQUFvQixlQUFlLDZDQUFDLE9BQUUsV0FBVSwwQkFBMEIsd0JBQWEsSUFBTztBQUFBLEtBQ3ZIO0FBRUo7QUFFQSxJQUFPLHNDQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJub3JtYWxpemVDdXJyZW5jeUNvZGUiXQp9Cg==
