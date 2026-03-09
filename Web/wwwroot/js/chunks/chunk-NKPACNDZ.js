import {
  SelectCombobox_default
} from "./chunk-AGYAFSYB.js";
import {
  normalizeCardTitleText,
  safeText
} from "./chunk-FUOK7RBM.js";
import {
  getExpenseSheetCurrencies,
  getExpenseSheetDefaultCurrencyCode
} from "./chunk-SAOIE2GK.js";
import {
  indT
} from "./chunk-BYICIYT4.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-BWM3JLWG.js";
import {
  ApiFetchError
} from "./chunk-REMMAK3K.js";
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
  dropdownMinWidthPx = 320,
  showLoadingStateText = true
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
    showLoadingStateText && isLoadingOptions ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-xs text-slate-500", children: loadingMessage }) : null,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlQ3VycmVuY3lGbGFnSWNvbi50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZURhdGVQYXJ0cyB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgbm9ybWFsaXplQ2FyZFRpdGxlVGV4dCwgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcblxudHlwZSBFeHBlbnNlVGltZWxpbmVDYXJkUHJvcHMgPSB7XG4gIGRhdGVQYXJ0czogRXhwZW5zZURhdGVQYXJ0cztcbiAgdGl0bGU6IHN0cmluZztcbiAgYW1vdW50VGV4dDogc3RyaW5nO1xuICBvbk9wZW46ICgpID0+IHZvaWQ7XG4gIHRpdGxlQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBhbW91bnRDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHN0YXR1c0NsYXNzTmFtZT86IHN0cmluZztcbiAgc3RhdHVzTGFiZWw/OiBzdHJpbmc7XG4gIHN1YnRpdGxlPzogc3RyaW5nO1xuICBzdWJ0aXRsZUNsYXNzTmFtZT86IHN0cmluZztcbiAgc3RhdHVzSWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcbiAgc3RhdHVzSWNvbkNsYXNzTmFtZT86IHN0cmluZztcbiAgZGF0ZVBhbmVsQ29udGVudD86IFJlYWN0LlJlYWN0Tm9kZTtcbn07XG5cbi8vIFJldXNhYmxlIGNsaWNrYWJsZSB0aW1lbGluZSBjYXJkIGZvciBleHBlbnNlIHNoZWV0cyBhbmQgZXhwZW5zZSBsaW5lcy5cbmNvbnN0IEV4cGVuc2VUaW1lbGluZUNhcmQgPSAoe1xuICBkYXRlUGFydHMsXG4gIHRpdGxlLFxuICBhbW91bnRUZXh0LFxuICBvbk9wZW4sXG4gIHRpdGxlQ2xhc3NOYW1lID0gXCJ0aW1lbGluZS1uYW1lXCIsXG4gIGFtb3VudENsYXNzTmFtZSA9IFwiZXhwZW5zZS1zaGVldC1jYXJkX19hbW91bnRcIixcbiAgc3RhdHVzQ2xhc3NOYW1lLFxuICBzdGF0dXNMYWJlbCxcbiAgc3VidGl0bGUgPSBcIlwiLFxuICBzdWJ0aXRsZUNsYXNzTmFtZSA9IFwiZXhwZW5zZS1zaGVldC1jYXJkX19zdWJ0aXRsZVwiLFxuICBzdGF0dXNJY29uLFxuICBzdGF0dXNJY29uQ2xhc3NOYW1lID0gXCJleHBlbnNlLXNoZWV0LWNhcmRfX3N0YXR1cy1pY29uXCIsXG4gIGRhdGVQYW5lbENvbnRlbnQsXG59OiBFeHBlbnNlVGltZWxpbmVDYXJkUHJvcHMpID0+IHtcbiAgY29uc3Qgc2FmZVRpdGxlID0gbm9ybWFsaXplQ2FyZFRpdGxlVGV4dCh0aXRsZSwgXCItXCIpO1xuICBjb25zdCBzYWZlQW1vdW50ID0gYW1vdW50VGV4dCB8fCBcIi1cIjtcbiAgY29uc3Qgc2FmZVN1YnRpdGxlID0gc2FmZVRleHQoc3VidGl0bGUpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPVwidGltZWxpbmUtY2FyZCB0aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIlxuICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICB0YWJJbmRleD17MH1cbiAgICAgIG9uQ2xpY2s9e29uT3Blbn1cbiAgICAgIG9uS2V5RG93bj17KGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIiB8fCBldmVudC5rZXkgPT09IFwiIFwiKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBvbk9wZW4oKTtcbiAgICAgICAgfVxuICAgICAgfX1cbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWRhdGUtcGFuZWwgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEgcHgtMyBweS0zIGJnLXNsYXRlLTUwIGJvcmRlci1yIGJvcmRlci1zbGF0ZS0yMDAgdGV4dC1zbGF0ZS02MDBcIj5cbiAgICAgICAge2RhdGVQYW5lbENvbnRlbnQgPyAoXG4gICAgICAgICAgZGF0ZVBhbmVsQ29udGVudFxuICAgICAgICApIDogKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFja2luZy1bMC4yZW1dIHRleHQtc2xhdGUtNTAwXCI+e2RhdGVQYXJ0cy55ZWFyfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLVswLjJlbV0gdGV4dC1zbGF0ZS01MDBcIj57ZGF0ZVBhcnRzLm1vbnRofTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LXNlbWlib2xkIHRleHQtcHJpbWFyeVwiPntkYXRlUGFydHMuZGF5fTwvZGl2PlxuICAgICAgICAgIDwvPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWNhcmRfX2NvbnRlbnQgZmxleC0xIHB5LTMgcHgtNFwiPlxuICAgICAgICB7c3RhdHVzQ2xhc3NOYW1lID8gPHNwYW4gY2xhc3NOYW1lPXtzdGF0dXNDbGFzc05hbWV9IHRpdGxlPXtzdGF0dXNMYWJlbH0gYXJpYS1sYWJlbD17c3RhdHVzTGFiZWx9IC8+IDogbnVsbH1cbiAgICAgICAge3N0YXR1c0ljb24gPyAoXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdGF0dXNJY29uQ2xhc3NOYW1lfSByb2xlPVwiZ3JvdXBcIiBhcmlhLWxhYmVsPXtzdGF0dXNMYWJlbCB8fCB1bmRlZmluZWR9PlxuICAgICAgICAgICAge3N0YXR1c0ljb259XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPHAgY2xhc3NOYW1lPXt0aXRsZUNsYXNzTmFtZX0gZGF0YS1mdWxsdGV4dD17c2FmZVRpdGxlfT5cbiAgICAgICAgICB7c2FmZVRpdGxlfVxuICAgICAgICA8L3A+XG4gICAgICAgIHtzYWZlU3VidGl0bGUgPyAoXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPXtzdWJ0aXRsZUNsYXNzTmFtZX0gZGF0YS1mdWxsdGV4dD17c2FmZVN1YnRpdGxlfT5cbiAgICAgICAgICAgIHtzYWZlU3VidGl0bGV9XG4gICAgICAgICAgPC9wPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXthbW91bnRDbGFzc05hbWV9IGRhdGEtZnVsbHRleHQ9e3NhZmVBbW91bnR9PlxuICAgICAgICAgIHtzYWZlQW1vdW50fVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaW1lbGluZUNhcmQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBFeHBlbnNlQ3VycmVuY3lGbGFnSWNvblByb3BzID0ge1xuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBzaXplQ2xhc3NOYW1lPzogc3RyaW5nO1xufTtcblxuY29uc3Qgbm9ybWFsaXplQ3VycmVuY3lDb2RlID0gKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcbn07XG5cbi8vIFJlbmRlcnMgYSBjdXJyZW5jeSBmbGFnIGZyb20gbG9jYWwgYXNzZXRzIHdpdGggYSBzdGFibGUgZmFsbGJhY2sgaWNvbi5cbmNvbnN0IEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uID0gKHsgY3VycmVuY3lDb2RlLCBjbGFzc05hbWUgPSBcIlwiLCBzaXplQ2xhc3NOYW1lID0gXCJoLTQgdy00XCIgfTogRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb25Qcm9wcykgPT4ge1xuICBjb25zdCBub3JtYWxpemVkQ29kZSA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShjdXJyZW5jeUNvZGUpO1xuICBjb25zdCBbbG9hZEZhaWxlZCwgc2V0TG9hZEZhaWxlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRMb2FkRmFpbGVkKGZhbHNlKTtcbiAgfSwgW25vcm1hbGl6ZWRDb2RlXSk7XG5cbiAgaWYgKCFub3JtYWxpemVkQ29kZSB8fCBsb2FkRmFpbGVkKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuXG4gICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgIGNsYXNzTmFtZT17YGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLWxnIHRleHQtWzEwcHhdIGZvbnQtc2VtaWJvbGQgbGVhZGluZy1ub25lIHRleHQtc2xhdGUtNTAwICR7c2l6ZUNsYXNzTmFtZX0gJHtjbGFzc05hbWV9YC50cmltKCl9XG4gICAgICA+XG4gICAgICAgICRcbiAgICAgIDwvc3Bhbj5cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8aW1nXG4gICAgICBzcmM9e2AvYXNzZXRzL2ZsYWdzLyR7ZW5jb2RlVVJJQ29tcG9uZW50KG5vcm1hbGl6ZWRDb2RlKX0uc3ZnYH1cbiAgICAgIGFsdD1cIlwiXG4gICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgbG9hZGluZz1cImxhenlcIlxuICAgICAgY2xhc3NOYW1lPXtgJHtzaXplQ2xhc3NOYW1lfSByb3VuZGVkLWxnIG9iamVjdC1jb250YWluICR7Y2xhc3NOYW1lfWAudHJpbSgpfVxuICAgICAgb25FcnJvcj17KCkgPT4gc2V0TG9hZEZhaWxlZCh0cnVlKX1cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb247XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0byB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IGdldEV4cGVuc2VTaGVldEN1cnJlbmNpZXMsIGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XG5pbXBvcnQgRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gZnJvbSBcIi4vRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24udHN4XCI7XG5cbnR5cGUgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG4gIGlkQmFzZT86IHN0cmluZztcbiAgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHQ/OiBib29sZWFuO1xuICBkcm9wZG93bkV4cGFuZFB4PzogbnVtYmVyO1xuICBkcm9wZG93bk1pbldpZHRoUHg/OiBudW1iZXI7XG4gIHNob3dMb2FkaW5nU3RhdGVUZXh0PzogYm9vbGVhbjtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSA9ICh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XG59O1xuXG5jb25zdCBDVVJSRU5DWV9GTEFHX1NJWkVfQ0xBU1MgPSBcImgtNiB3LTZcIjtcbmNvbnN0IENVUlJFTkNZX0RST1BET1dOX1BBTkVMX0NMQVNTID0gXCJ2aXNpdGFzLXR5cG9ncmFwaHkgcmluZy1bI0E5QjhDQ10vNzBcIjtcbmNvbnN0IENVUlJFTkNZX0RST1BET1dOX1BBTkVMX1NUWUxFOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0ge1xuICBiYWNrZ3JvdW5kQ29sb3I6IFwiI0RDRTNFRFwiLFxuICBib3JkZXI6IFwiMXB4IHNvbGlkICNBOUI4Q0NcIixcbiAgYm94U2hhZG93OiBcIjAgMTBweCAyNHB4IHJnYmEoMTUsIDQxLCA2OSwgMC4xNClcIixcbn07XG5jb25zdCBDVVJSRU5DWV9PUFRJT05fREVGQVVMVF9DTEFTUyA9IFwidGV4dC1bIzBGMjk0NV1cIjtcbmNvbnN0IENVUlJFTkNZX09QVElPTl9BQ1RJVkVfQ0xBU1MgPSBcImJnLVsjQzZEMkUzXSB0ZXh0LVsjMEYyOTQ1XVwiO1xuY29uc3QgQ1VSUkVOQ1lfT1BUSU9OX1NFTEVDVEVEX0NMQVNTID0gXCJiZy1wcmltYXJ5IHRleHQtd2hpdGVcIjtcblxuY29uc3QgcmVhZFByZWZlcnJlZExvY2FsZSA9ICgpOiBzdHJpbmcgPT4ge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY29uc3QgZnJvbURvY3VtZW50ID0gU3RyaW5nKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcIlwiKS50cmltKCk7XG4gICAgaWYgKGZyb21Eb2N1bWVudCkgcmV0dXJuIGZyb21Eb2N1bWVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY29uc3QgZnJvbU5hdmlnYXRvciA9IFN0cmluZyhuYXZpZ2F0b3IubGFuZ3VhZ2UgfHwgXCJcIikudHJpbSgpO1xuICAgIGlmIChmcm9tTmF2aWdhdG9yKSByZXR1cm4gZnJvbU5hdmlnYXRvcjtcbiAgfVxuXG4gIHJldHVybiBcImVuXCI7XG59O1xuXG4vLyBSZXNvbHZlcyBhIGxvY2FsaXplZCBjdXJyZW5jeSBkaXNwbGF5IG5hbWUgd2hlbiBJbnRsLkRpc3BsYXlOYW1lcyBpcyBhdmFpbGFibGUuXG5jb25zdCByZXNvbHZlQ3VycmVuY3lEaXNwbGF5TmFtZSA9IChjdXJyZW5jeUNvZGU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBub3JtYWxpemVkQ29kZSA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShjdXJyZW5jeUNvZGUpO1xuICBpZiAoIW5vcm1hbGl6ZWRDb2RlKSByZXR1cm4gXCJcIjtcblxuICBjb25zdCBpbnRsV2l0aERpc3BsYXlOYW1lcyA9IEludGwgYXMgdHlwZW9mIEludGwgJiB7XG4gICAgRGlzcGxheU5hbWVzPzogbmV3IChcbiAgICAgIGxvY2FsZXM/OiBzdHJpbmcgfCBzdHJpbmdbXSxcbiAgICAgIG9wdGlvbnM/OiB7IHR5cGU6IFwiY3VycmVuY3lcIiB9XG4gICAgKSA9PiB7IG9mOiAodmFsdWU6IHN0cmluZykgPT4gc3RyaW5nIHwgdW5kZWZpbmVkIH07XG4gIH07XG5cbiAgaWYgKHR5cGVvZiBpbnRsV2l0aERpc3BsYXlOYW1lcy5EaXNwbGF5TmFtZXMgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFwiXCI7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBkaXNwbGF5TmFtZXMgPSBuZXcgaW50bFdpdGhEaXNwbGF5TmFtZXMuRGlzcGxheU5hbWVzKFtsb2NhbGUsIFwiZW5cIl0sIHsgdHlwZTogXCJjdXJyZW5jeVwiIH0pO1xuICAgIGNvbnN0IGxvY2FsaXplZE5hbWUgPSBTdHJpbmcoZGlzcGxheU5hbWVzLm9mKG5vcm1hbGl6ZWRDb2RlKSB8fCBcIlwiKS50cmltKCk7XG4gICAgaWYgKCFsb2NhbGl6ZWROYW1lKSByZXR1cm4gXCJcIjtcblxuICAgIGNvbnN0IG5vcm1hbGl6ZWROYW1lID0gbG9jYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgIHJldHVybiBub3JtYWxpemVkTmFtZSA9PT0gbm9ybWFsaXplZENvZGUgPyBcIlwiIDogbG9jYWxpemVkTmFtZTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cbn07XG5cbmNvbnN0IG1hcEN1cnJlbmN5T3B0aW9ucyA9IChpdGVtczogRXhwZW5zZVNoZWV0Q3VycmVuY3lEdG9bXSB8IHVuZGVmaW5lZCwgbG9jYWxlOiBzdHJpbmcpOiBFeHBlbnNlU2VsZWN0T3B0aW9uW10gPT4ge1xuICBjb25zdCBzb3VyY2UgPSBBcnJheS5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zIDogW107XG4gIGNvbnN0IHNlZW5Db2RlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gIHJldHVybiBzb3VyY2VcbiAgICAubWFwKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgY3VycmVuY3lDb2RlSXNvID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKGVudHJ5Py5DdXJyZW5jeUNvZGVJU08pO1xuICAgICAgY29uc3QgZWZmZWN0aXZlSXNvQ29kZSA9IGN1cnJlbmN5Q29kZUlzbyB8fCBub3JtYWxpemVDdXJyZW5jeUNvZGUoZW50cnk/LkN1cnJlbmN5Q29kZSk7XG4gICAgICBpZiAoIWVmZmVjdGl2ZUlzb0NvZGUpIHJldHVybiBudWxsO1xuICAgICAgaWYgKHNlZW5Db2Rlcy5oYXMoZWZmZWN0aXZlSXNvQ29kZSkpIHJldHVybiBudWxsO1xuICAgICAgc2VlbkNvZGVzLmFkZChlZmZlY3RpdmVJc29Db2RlKTtcblxuICAgICAgY29uc3QgZGlzcGxheU5hbWUgPSByZXNvbHZlQ3VycmVuY3lEaXNwbGF5TmFtZShlZmZlY3RpdmVJc29Db2RlLCBsb2NhbGUpO1xuICAgICAgY29uc3Qgb3B0aW9uTGFiZWwgPSBkaXNwbGF5TmFtZSA/IGAke2VmZmVjdGl2ZUlzb0NvZGV9ICR7ZGlzcGxheU5hbWV9YCA6IGVmZmVjdGl2ZUlzb0NvZGU7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiBlZmZlY3RpdmVJc29Db2RlLFxuICAgICAgICB0ZXh0OiBvcHRpb25MYWJlbCxcbiAgICAgICAgaWNvbjogPEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uIGN1cnJlbmN5Q29kZT17ZWZmZWN0aXZlSXNvQ29kZX0gc2l6ZUNsYXNzTmFtZT17Q1VSUkVOQ1lfRkxBR19TSVpFX0NMQVNTfSAvPixcbiAgICAgIH0gYXMgRXhwZW5zZVNlbGVjdE9wdGlvbjtcbiAgICB9KVxuICAgIC5maWx0ZXIoKGVudHJ5KTogZW50cnkgaXMgRXhwZW5zZVNlbGVjdE9wdGlvbiA9PiBlbnRyeSAhPT0gbnVsbCk7XG59O1xuXG4vLyBTaGFyZWQgY3VycmVuY3kgY29tYm9ib3ggYmFja2VkIGJ5IC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvY3VycmVuY2llcy5cbmNvbnN0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCA9ICh7XG4gIGxhYmVsLFxuICBwbGFjZWhvbGRlcixcbiAgdmFsdWUsXG4gIG9uQ2hhbmdlLFxuICByZWFkT25seSA9IGZhbHNlLFxuICBkaXNhYmxlZCA9IGZhbHNlLFxuICBzaG93TGFiZWwgPSB0cnVlLFxuICBpZEJhc2UgPSBcImV4cGVuc2UtY3VycmVuY3lcIixcbiAgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHQgPSBmYWxzZSxcbiAgZHJvcGRvd25FeHBhbmRQeCA9IDAsXG4gIGRyb3Bkb3duTWluV2lkdGhQeCA9IDMyMCxcbiAgc2hvd0xvYWRpbmdTdGF0ZVRleHQgPSB0cnVlLFxufTogRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0UHJvcHMpID0+IHtcbiAgY29uc3QgbG9jYWxlID0gdXNlTWVtbygoKSA9PiByZWFkUHJlZmVycmVkTG9jYWxlKCksIFtdKTtcbiAgY29uc3QgW29wdGlvbnMsIHNldE9wdGlvbnNdID0gdXNlU3RhdGU8RXhwZW5zZVNlbGVjdE9wdGlvbltdPihbXSk7XG4gIGNvbnN0IFtpc0xvYWRpbmdPcHRpb25zLCBzZXRJc0xvYWRpbmdPcHRpb25zXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2xvYWRFcnJvck1lc3NhZ2UsIHNldExvYWRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtlbXB0eU1lc3NhZ2UsIHNldEVtcHR5TWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3Qgb25DaGFuZ2VSZWYgPSB1c2VSZWYob25DaGFuZ2UpO1xuICBjb25zdCB2YWx1ZVJlZiA9IHVzZVJlZihub3JtYWxpemVDdXJyZW5jeUNvZGUodmFsdWUpKTtcbiAgY29uc3QgaW5pdGlhbERlZmF1bHRBcHBsaWVkUmVmID0gdXNlUmVmKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQgPSBvbkNoYW5nZTtcbiAgfSwgW29uQ2hhbmdlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB2YWx1ZVJlZi5jdXJyZW50ID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKHZhbHVlKTtcbiAgfSwgW3ZhbHVlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgaXNDYW5jZWxsZWQgPSBmYWxzZTtcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuXG4gICAgY29uc3QgbG9hZEN1cnJlbmNpZXMgPSBhc3luYyAoKSA9PiB7XG4gICAgICBzZXRJc0xvYWRpbmdPcHRpb25zKHRydWUpO1xuICAgICAgc2V0TG9hZEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICAgIHNldEVtcHR5TWVzc2FnZShcIlwiKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRFeHBlbnNlU2hlZXRDdXJyZW5jaWVzKHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgICBzZXRPcHRpb25zKFtdKTtcbiAgICAgICAgICBzZXRMb2FkRXJyb3JNZXNzYWdlKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldHMuXCIpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtYXBwZWRPcHRpb25zID0gbWFwQ3VycmVuY3lPcHRpb25zKHJlc3BvbnNlLkl0ZW1zLCBsb2NhbGUpO1xuICAgICAgICBzZXRPcHRpb25zKG1hcHBlZE9wdGlvbnMpO1xuXG4gICAgICAgIGlmICghbWFwcGVkT3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICBzZXRFbXB0eU1lc3NhZ2UocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX05vRGF0YVwiLCBcIk5vIGRhdGFcIikpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHZhbHVlUmVmLmN1cnJlbnQ7XG4gICAgICAgIGNvbnN0IGhhc0N1cnJlbnRJbkxpc3QgPSBtYXBwZWRPcHRpb25zLnNvbWUoKG9wdGlvbikgPT4gbm9ybWFsaXplQ3VycmVuY3lDb2RlKG9wdGlvbi52YWx1ZSkgPT09IGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgJiYgaGFzQ3VycmVudEluTGlzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY3VycmVudFZhbHVlICYmIHByZWZlckRlZmF1bHRDdXJyZW5jeUZyb21Db250ZXh0ICYmICFpbml0aWFsRGVmYXVsdEFwcGxpZWRSZWYuY3VycmVudCkge1xuICAgICAgICAgIGNvbnN0IGRlZmF1bHRDdXJyZW5jeUNvZGUgPSBub3JtYWxpemVDdXJyZW5jeUNvZGUoXG4gICAgICAgICAgICBhd2FpdCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlKHtcbiAgICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcblxuICAgICAgICAgIGlmIChkZWZhdWx0Q3VycmVuY3lDb2RlICYmIG1hcHBlZE9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiBub3JtYWxpemVDdXJyZW5jeUNvZGUob3B0aW9uLnZhbHVlKSA9PT0gZGVmYXVsdEN1cnJlbmN5Q29kZSkpIHtcbiAgICAgICAgICAgIGluaXRpYWxEZWZhdWx0QXBwbGllZFJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQoZGVmYXVsdEN1cnJlbmN5Q29kZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgZmFsbGJhY2tFcnJvciA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXRzLlwiKTtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciA/IGVycm9yLm1lc3NhZ2UgfHwgZmFsbGJhY2tFcnJvciA6IGZhbGxiYWNrRXJyb3I7XG4gICAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgICBzZXRMb2FkRXJyb3JNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKCFpc0NhbmNlbGxlZCkge1xuICAgICAgICAgIHNldElzTG9hZGluZ09wdGlvbnMoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZvaWQgbG9hZEN1cnJlbmNpZXMoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpc0NhbmNlbGxlZCA9IHRydWU7XG4gICAgICBjb250cm9sbGVyLmFib3J0KCk7XG4gICAgfTtcbiAgfSwgW2xvY2FsZSwgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHRdKTtcblxuICBjb25zdCBub3JtYWxpemVkVmFsdWUgPSB1c2VNZW1vKCgpID0+IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSh2YWx1ZSksIFt2YWx1ZV0pO1xuICBjb25zdCBkaXNhYmxlQmVjYXVzZU5vRGF0YSA9ICFpc0xvYWRpbmdPcHRpb25zICYmICFsb2FkRXJyb3JNZXNzYWdlICYmIG9wdGlvbnMubGVuZ3RoID09PSAwO1xuICBjb25zdCBlZmZlY3RpdmVEaXNhYmxlZCA9IGRpc2FibGVkIHx8IGRpc2FibGVCZWNhdXNlTm9EYXRhO1xuICBjb25zdCBsb2FkaW5nTWVzc2FnZSA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XG4gICAgICA8U2VsZWN0Q29tYm9ib3hcbiAgICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgIG9wdGlvbnM9e29wdGlvbnN9XG4gICAgICAgIHZhbHVlPXtub3JtYWxpemVkVmFsdWV9XG4gICAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiBvbkNoYW5nZShub3JtYWxpemVDdXJyZW5jeUNvZGUobmV4dFZhbHVlKSl9XG4gICAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgICAgZGlzYWJsZWQ9e2VmZmVjdGl2ZURpc2FibGVkfVxuICAgICAgICBhbGxvd1RleHRJbnB1dFxuICAgICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cbiAgICAgICAgc2hvd0xhYmVsPXtzaG93TGFiZWx9XG4gICAgICAgIHVzZVBvcnRhbFxuICAgICAgICBzZWxlY3RlZFRleHRNb2RlPVwidmFsdWVcIlxuICAgICAgICBkcm9wZG93bkV4cGFuZFB4PXtkcm9wZG93bkV4cGFuZFB4fVxuICAgICAgICBkcm9wZG93bk1pbldpZHRoUHg9e2Ryb3Bkb3duTWluV2lkdGhQeH1cbiAgICAgICAgZHJvcGRvd25NYXhIZWlnaHRDbGFzcz1cIm1heC1oLTk2XCJcbiAgICAgICAgc2VsZWN0ZWRJY29uQ2xhc3NOYW1lPXtDVVJSRU5DWV9GTEFHX1NJWkVfQ0xBU1N9XG4gICAgICAgIHNlbGVjdGVkSW5wdXRQYWRkaW5nQ2xhc3NOYW1lPVwicGwtMTJcIlxuICAgICAgICBjbGVhck9uRW1wdHlJbnB1dFxuICAgICAgICBvcHRpb25JY29uQ2xhc3NOYW1lPXtDVVJSRU5DWV9GTEFHX1NJWkVfQ0xBU1N9XG4gICAgICAgIGFsbG93T3B0aW9uSG9yaXpvbnRhbFNjcm9sbFxuICAgICAgICBsb2NrRHJvcGRvd25XaWR0aE9uRmlyc3RPcGVuXG4gICAgICAgIGRpc2FibGVEZWZhdWx0T3B0aW9uUGFkZGluZ1xuICAgICAgICBvcHRpb25MZWZ0UGFkZGluZ0NsYXNzTmFtZT1cInBsLTFcIlxuICAgICAgICBvcHRpb25EZWZhdWx0Q2xhc3NOYW1lPXtDVVJSRU5DWV9PUFRJT05fREVGQVVMVF9DTEFTU31cbiAgICAgICAgb3B0aW9uQWN0aXZlQ2xhc3NOYW1lPXtDVVJSRU5DWV9PUFRJT05fQUNUSVZFX0NMQVNTfVxuICAgICAgICBvcHRpb25TZWxlY3RlZENsYXNzTmFtZT17Q1VSUkVOQ1lfT1BUSU9OX1NFTEVDVEVEX0NMQVNTfVxuICAgICAgICBpZEJhc2U9e2lkQmFzZX1cbiAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgcGFuZWxDbGFzc05hbWU9e0NVUlJFTkNZX0RST1BET1dOX1BBTkVMX0NMQVNTfVxuICAgICAgICBwYW5lbFN0eWxlPXtDVVJSRU5DWV9EUk9QRE9XTl9QQU5FTF9TVFlMRX1cbiAgICAgIC8+XG4gICAgICB7c2hvd0xvYWRpbmdTdGF0ZVRleHQgJiYgaXNMb2FkaW5nT3B0aW9ucyA/IDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS01MDBcIj57bG9hZGluZ01lc3NhZ2V9PC9wPiA6IG51bGx9XG4gICAgICB7IWlzTG9hZGluZ09wdGlvbnMgJiYgbG9hZEVycm9yTWVzc2FnZSA/IDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1kYW5nZXJcIj57bG9hZEVycm9yTWVzc2FnZX08L3A+IDogbnVsbH1cbiAgICAgIHshaXNMb2FkaW5nT3B0aW9ucyAmJiAhbG9hZEVycm9yTWVzc2FnZSAmJiBlbXB0eU1lc3NhZ2UgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwXCI+e2VtcHR5TWVzc2FnZX08L3A+IDogbnVsbH1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdDtcblxyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlEVTtBQXBDVixJQUFNLHNCQUFzQixDQUFDO0FBQUEsRUFDM0I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLGlCQUFpQjtBQUFBLEVBQ2pCLGtCQUFrQjtBQUFBLEVBQ2xCO0FBQUEsRUFDQTtBQUFBLEVBQ0EsV0FBVztBQUFBLEVBQ1gsb0JBQW9CO0FBQUEsRUFDcEI7QUFBQSxFQUNBLHNCQUFzQjtBQUFBLEVBQ3RCO0FBQ0YsTUFBZ0M7QUFDOUIsUUFBTSxZQUFZLHVCQUF1QixPQUFPLEdBQUc7QUFDbkQsUUFBTSxhQUFhLGNBQWM7QUFDakMsUUFBTSxlQUFlLFNBQVMsUUFBUTtBQUV0QyxTQUNFO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxXQUFVO0FBQUEsTUFDVixNQUFLO0FBQUEsTUFDTCxVQUFVO0FBQUEsTUFDVixTQUFTO0FBQUEsTUFDVCxXQUFXLENBQUMsVUFBVTtBQUNwQixZQUFJLE1BQU0sUUFBUSxXQUFXLE1BQU0sUUFBUSxLQUFLO0FBQzlDLGdCQUFNLGVBQWU7QUFDckIsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLE1BRUE7QUFBQSxvREFBQyxTQUFJLFdBQVUsc0lBQ1osNkJBQ0MsbUJBRUEsNEVBQ0U7QUFBQSxzREFBQyxTQUFJLFdBQVUseURBQXlELG9CQUFVLE1BQUs7QUFBQSxVQUN2Riw0Q0FBQyxTQUFJLFdBQVUsbUVBQW1FLG9CQUFVLE9BQU07QUFBQSxVQUNsRyw0Q0FBQyxTQUFJLFdBQVUsdUNBQXVDLG9CQUFVLEtBQUk7QUFBQSxXQUN0RSxHQUVKO0FBQUEsUUFDQSw2Q0FBQyxTQUFJLFdBQVUsMkNBQ1o7QUFBQSw0QkFBa0IsNENBQUMsVUFBSyxXQUFXLGlCQUFpQixPQUFPLGFBQWEsY0FBWSxhQUFhLElB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
