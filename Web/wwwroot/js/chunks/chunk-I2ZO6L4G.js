import {
  SelectCombobox_default
} from "./chunk-5FRAKTKT.js";
import {
  getExpenseSheetCurrencies,
  getExpenseSheetDefaultCurrencyCode,
  normalizeCardTitleText,
  safeText
} from "./chunk-L5GTS5QB.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-2NKOKBT5.js";
import {
  ApiFetchError,
  indT
} from "./chunk-63VW7TTG.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

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
  subtitleContent,
  subtitleClassName = "expense-sheet-card__subtitle",
  statusIcon,
  statusIconClassName = "expense-sheet-card__status-icon",
  datePanelContent,
  interactionProps
}) => {
  const safeTitle = normalizeCardTitleText(title, "-");
  const safeAmount = amountText || "-";
  const safeSubtitle = safeText(subtitle);
  const {
    onClick: customOnClick,
    onKeyDown: customOnKeyDown,
    role: customRole,
    tabIndex: customTabIndex,
    ...restInteractionProps
  } = interactionProps || {};
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "button",
    {
      type: "button",
      className: "timeline-card timeline-card--clickable expense-timeline-card text-left",
      role: customRole,
      tabIndex: typeof customTabIndex === "number" ? customTabIndex : 0,
      onClick: customOnClick ?? onOpen,
      onKeyDown: customOnKeyDown,
      ...restInteractionProps,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "timeline-date-panel expense-timeline-card__date-panel flex flex-col items-center justify-center gap-1 border-r border-[#e2e8f0] bg-[#f8fafc] text-[#00296be0]", children: datePanelContent ? datePanelContent : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-semibold tracking-[0.2em] text-[#00296bb8]", children: dateParts.year }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-[#00296bb8]", children: dateParts.month }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-2xl font-semibold text-primary", children: dateParts.day })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "timeline-card__content expense-timeline-card__content flex-1", children: [
          statusClassName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: statusClassName, title: statusLabel, "aria-label": statusLabel }) : null,
          statusIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: statusIconClassName, role: "group", "aria-label": statusLabel || void 0, children: statusIcon }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: titleClassName, "data-fulltext": safeTitle, children: safeTitle }),
          subtitleContent || safeSubtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: subtitleClassName, "data-fulltext": safeSubtitle, children: subtitleContent || safeSubtitle }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: amountClassName, "data-fulltext": safeAmount, children: safeAmount })
        ] })
      ]
    }
  );
};
var ExpenseTimelineCard_default = ExpenseTimelineCard;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseCurrencyFilterSelect.tsx
var import_react2 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/components/ExpenseCurrencyFlagIcon.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var normalizeCurrencyCode = (value) => {
  return String(value || "").trim().toUpperCase();
};
var ExpenseCurrencyFlagIcon = ({ currencyCode, className = "", sizeClassName = "h-4 w-4" }) => {
  const normalizedCode = normalizeCurrencyCode(currencyCode);
  const [failedCode, setFailedCode] = (0, import_react.useState)("");
  const loadFailed = !!normalizedCode && failedCode === normalizedCode;
  if (!normalizedCode || loadFailed) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "span",
      {
        "aria-hidden": "true",
        className: `inline-flex items-center justify-center rounded-[var(--radius-xl)] text-[10px] font-semibold leading-none text-slate-500 ${sizeClassName} ${className}`.trim(),
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
      className: `${sizeClassName} rounded-[var(--radius-xl)] object-contain ${className}`.trim(),
      onError: () => setFailedCode(normalizedCode)
    }
  );
};
var ExpenseCurrencyFlagIcon_default = ExpenseCurrencyFlagIcon;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseCurrencyFilterSelect.tsx
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
  invalid = false,
  inputRef,
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
        inputRef,
        invalid,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlQ3VycmVuY3lGbGFnSWNvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlRGF0ZVBhcnRzIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IG5vcm1hbGl6ZUNhcmRUaXRsZVRleHQsIHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VUaW1lbGluZUNhcmRJbnRlcmFjdGlvblByb3BzID0gUGljazxcclxuICBSZWFjdC5CdXR0b25IVE1MQXR0cmlidXRlczxIVE1MQnV0dG9uRWxlbWVudD4sXHJcbiAgfCBcImFyaWEtbGFiZWxcIlxyXG4gIHwgXCJhcmlhLXByZXNzZWRcIlxyXG4gIHwgXCJvbkNsaWNrXCJcclxuICB8IFwib25Db250ZXh0TWVudVwiXHJcbiAgfCBcIm9uS2V5RG93blwiXHJcbiAgfCBcIm9uUG9pbnRlckNhbmNlbFwiXHJcbiAgfCBcIm9uUG9pbnRlckRvd25cIlxyXG4gIHwgXCJvblBvaW50ZXJNb3ZlXCJcclxuICB8IFwib25Qb2ludGVyVXBcIlxyXG4gIHwgXCJyb2xlXCJcclxuICB8IFwidGFiSW5kZXhcIlxyXG4+O1xyXG5cclxudHlwZSBFeHBlbnNlVGltZWxpbmVDYXJkUHJvcHMgPSB7XHJcbiAgZGF0ZVBhcnRzOiBFeHBlbnNlRGF0ZVBhcnRzO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgYW1vdW50VGV4dDogc3RyaW5nO1xyXG4gIG9uT3BlbjogKCkgPT4gdm9pZDtcclxuICB0aXRsZUNsYXNzTmFtZT86IHN0cmluZztcclxuICBhbW91bnRDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgc3RhdHVzQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIHN0YXR1c0xhYmVsPzogc3RyaW5nO1xuICBzdWJ0aXRsZT86IHN0cmluZztcbiAgc3VidGl0bGVDb250ZW50PzogUmVhY3QuUmVhY3ROb2RlO1xuICBzdWJ0aXRsZUNsYXNzTmFtZT86IHN0cmluZztcbiAgc3RhdHVzSWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcbiAgc3RhdHVzSWNvbkNsYXNzTmFtZT86IHN0cmluZztcbiAgZGF0ZVBhbmVsQ29udGVudD86IFJlYWN0LlJlYWN0Tm9kZTtcclxuICBpbnRlcmFjdGlvblByb3BzPzogRXhwZW5zZVRpbWVsaW5lQ2FyZEludGVyYWN0aW9uUHJvcHM7XHJcbn07XHJcblxyXG4vLyBSZXVzYWJsZSBjbGlja2FibGUgdGltZWxpbmUgY2FyZCBmb3IgZXhwZW5zZSBzaGVldHMgYW5kIGV4cGVuc2UgbGluZXMuXHJcbmNvbnN0IEV4cGVuc2VUaW1lbGluZUNhcmQgPSAoe1xyXG4gIGRhdGVQYXJ0cyxcclxuICB0aXRsZSxcclxuICBhbW91bnRUZXh0LFxyXG4gIG9uT3BlbixcclxuICB0aXRsZUNsYXNzTmFtZSA9IFwidGltZWxpbmUtbmFtZVwiLFxyXG4gIGFtb3VudENsYXNzTmFtZSA9IFwiZXhwZW5zZS1zaGVldC1jYXJkX19hbW91bnRcIixcclxuICBzdGF0dXNDbGFzc05hbWUsXG4gIHN0YXR1c0xhYmVsLFxuICBzdWJ0aXRsZSA9IFwiXCIsXG4gIHN1YnRpdGxlQ29udGVudCxcbiAgc3VidGl0bGVDbGFzc05hbWUgPSBcImV4cGVuc2Utc2hlZXQtY2FyZF9fc3VidGl0bGVcIixcbiAgc3RhdHVzSWNvbixcbiAgc3RhdHVzSWNvbkNsYXNzTmFtZSA9IFwiZXhwZW5zZS1zaGVldC1jYXJkX19zdGF0dXMtaWNvblwiLFxyXG4gIGRhdGVQYW5lbENvbnRlbnQsXHJcbiAgaW50ZXJhY3Rpb25Qcm9wcyxcclxufTogRXhwZW5zZVRpbWVsaW5lQ2FyZFByb3BzKSA9PiB7XHJcbiAgY29uc3Qgc2FmZVRpdGxlID0gbm9ybWFsaXplQ2FyZFRpdGxlVGV4dCh0aXRsZSwgXCItXCIpO1xyXG4gIGNvbnN0IHNhZmVBbW91bnQgPSBhbW91bnRUZXh0IHx8IFwiLVwiO1xyXG4gIGNvbnN0IHNhZmVTdWJ0aXRsZSA9IHNhZmVUZXh0KHN1YnRpdGxlKTtcclxuICBjb25zdCB7XHJcbiAgICBvbkNsaWNrOiBjdXN0b21PbkNsaWNrLFxyXG4gICAgb25LZXlEb3duOiBjdXN0b21PbktleURvd24sXHJcbiAgICByb2xlOiBjdXN0b21Sb2xlLFxyXG4gICAgdGFiSW5kZXg6IGN1c3RvbVRhYkluZGV4LFxyXG4gICAgLi4ucmVzdEludGVyYWN0aW9uUHJvcHNcclxuICB9ID0gaW50ZXJhY3Rpb25Qcm9wcyB8fCB7fTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxidXR0b25cclxuICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgIGNsYXNzTmFtZT1cInRpbWVsaW5lLWNhcmQgdGltZWxpbmUtY2FyZC0tY2xpY2thYmxlIGV4cGVuc2UtdGltZWxpbmUtY2FyZCB0ZXh0LWxlZnRcIlxyXG4gICAgICByb2xlPXtjdXN0b21Sb2xlfVxyXG4gICAgICB0YWJJbmRleD17dHlwZW9mIGN1c3RvbVRhYkluZGV4ID09PSBcIm51bWJlclwiID8gY3VzdG9tVGFiSW5kZXggOiAwfVxyXG4gICAgICBvbkNsaWNrPXtjdXN0b21PbkNsaWNrID8/IG9uT3Blbn1cclxuICAgICAgb25LZXlEb3duPXtjdXN0b21PbktleURvd259XHJcbiAgICAgIHsuLi5yZXN0SW50ZXJhY3Rpb25Qcm9wc31cclxuICAgID5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1kYXRlLXBhbmVsIGV4cGVuc2UtdGltZWxpbmUtY2FyZF9fZGF0ZS1wYW5lbCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMSBib3JkZXItciBib3JkZXItWyNlMmU4ZjBdIGJnLVsjZjhmYWZjXSB0ZXh0LVsjMDAyOTZiZTBdXCI+XG4gICAgICAgIHtkYXRlUGFuZWxDb250ZW50ID8gKFxuICAgICAgICAgIGRhdGVQYW5lbENvbnRlbnRcbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdHJhY2tpbmctWzAuMmVtXSB0ZXh0LVsjMDAyOTZiYjhdXCI+e2RhdGVQYXJ0cy55ZWFyfTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLVswLjJlbV0gdGV4dC1bIzAwMjk2YmI4XVwiPntkYXRlUGFydHMubW9udGh9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtc2VtaWJvbGQgdGV4dC1wcmltYXJ5XCI+e2RhdGVQYXJ0cy5kYXl9PC9kaXY+XG4gICAgICAgICAgPC8+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1jYXJkX19jb250ZW50IGV4cGVuc2UtdGltZWxpbmUtY2FyZF9fY29udGVudCBmbGV4LTFcIj5cclxuICAgICAgICB7c3RhdHVzQ2xhc3NOYW1lID8gPHNwYW4gY2xhc3NOYW1lPXtzdGF0dXNDbGFzc05hbWV9IHRpdGxlPXtzdGF0dXNMYWJlbH0gYXJpYS1sYWJlbD17c3RhdHVzTGFiZWx9IC8+IDogbnVsbH1cclxuICAgICAgICB7c3RhdHVzSWNvbiA/IChcclxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17c3RhdHVzSWNvbkNsYXNzTmFtZX0gcm9sZT1cImdyb3VwXCIgYXJpYS1sYWJlbD17c3RhdHVzTGFiZWwgfHwgdW5kZWZpbmVkfT5cclxuICAgICAgICAgICAge3N0YXR1c0ljb259XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgPHAgY2xhc3NOYW1lPXt0aXRsZUNsYXNzTmFtZX0gZGF0YS1mdWxsdGV4dD17c2FmZVRpdGxlfT5cclxuICAgICAgICAgIHtzYWZlVGl0bGV9XHJcbiAgICAgICAgPC9wPlxyXG4gICAgICAgIHtzdWJ0aXRsZUNvbnRlbnQgfHwgc2FmZVN1YnRpdGxlID8gKFxuICAgICAgICAgIDxwIGNsYXNzTmFtZT17c3VidGl0bGVDbGFzc05hbWV9IGRhdGEtZnVsbHRleHQ9e3NhZmVTdWJ0aXRsZX0+XG4gICAgICAgICAgICB7c3VidGl0bGVDb250ZW50IHx8IHNhZmVTdWJ0aXRsZX1cbiAgICAgICAgICA8L3A+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2Ftb3VudENsYXNzTmFtZX0gZGF0YS1mdWxsdGV4dD17c2FmZUFtb3VudH0+XHJcbiAgICAgICAgICB7c2FmZUFtb3VudH1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9idXR0b24+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VUaW1lbGluZUNhcmQ7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8gfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VTaGVldEN1cnJlbmNpZXMsIGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTZWxlY3RPcHRpb24gfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVNlbGVjdE9wdGlvbnMudHNcIjtcclxuaW1wb3J0IEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uIGZyb20gXCIuL0V4cGVuc2VDdXJyZW5jeUZsYWdJY29uLnRzeFwiO1xyXG5cclxudHlwZSBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RQcm9wcyA9IHtcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XHJcbiAgdmFsdWU6IHN0cmluZztcclxuICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgaW52YWxpZD86IGJvb2xlYW47XHJcbiAgaW5wdXRSZWY/OiBSZWFjdC5SZWY8SFRNTElucHV0RWxlbWVudD47XHJcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICBzaG93TGFiZWw/OiBib29sZWFuO1xyXG4gIGlkQmFzZT86IHN0cmluZztcclxuICBwcmVmZXJEZWZhdWx0Q3VycmVuY3lGcm9tQ29udGV4dD86IGJvb2xlYW47XHJcbiAgZHJvcGRvd25FeHBhbmRQeD86IG51bWJlcjtcclxuICBkcm9wZG93bk1pbldpZHRoUHg/OiBudW1iZXI7XHJcbiAgc2hvd0xvYWRpbmdTdGF0ZVRleHQ/OiBib29sZWFuO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplQ3VycmVuY3lDb2RlID0gKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xyXG59O1xyXG5cclxuY29uc3QgQ1VSUkVOQ1lfRkxBR19TSVpFX0NMQVNTID0gXCJoLTYgdy02XCI7XHJcbmNvbnN0IENVUlJFTkNZX0RST1BET1dOX1BBTkVMX0NMQVNTID0gXCJ2aXNpdGFzLXR5cG9ncmFwaHkgcmluZy1bI0E5QjhDQ10vNzBcIjtcclxuY29uc3QgQ1VSUkVOQ1lfRFJPUERPV05fUEFORUxfU1RZTEU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPSB7XHJcbiAgYmFja2dyb3VuZENvbG9yOiBcIiNEQ0UzRURcIixcclxuICBib3JkZXI6IFwiMXB4IHNvbGlkICNBOUI4Q0NcIixcclxuICBib3hTaGFkb3c6IFwiMCAxMHB4IDI0cHggcmdiYSgxNSwgNDEsIDY5LCAwLjE0KVwiLFxyXG59O1xyXG5jb25zdCBDVVJSRU5DWV9PUFRJT05fREVGQVVMVF9DTEFTUyA9IFwidGV4dC1bIzBGMjk0NV1cIjtcclxuY29uc3QgQ1VSUkVOQ1lfT1BUSU9OX0FDVElWRV9DTEFTUyA9IFwiYmctWyNDNkQyRTNdIHRleHQtWyMwRjI5NDVdXCI7XHJcbmNvbnN0IENVUlJFTkNZX09QVElPTl9TRUxFQ1RFRF9DTEFTUyA9IFwiYmctcHJpbWFyeSB0ZXh0LXdoaXRlXCI7XHJcblxyXG5jb25zdCByZWFkUHJlZmVycmVkTG9jYWxlID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgY29uc3QgZnJvbURvY3VtZW50ID0gU3RyaW5nKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudD8ubGFuZyB8fCBcIlwiKS50cmltKCk7XHJcbiAgICBpZiAoZnJvbURvY3VtZW50KSByZXR1cm4gZnJvbURvY3VtZW50O1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIGNvbnN0IGZyb21OYXZpZ2F0b3IgPSBTdHJpbmcobmF2aWdhdG9yLmxhbmd1YWdlIHx8IFwiXCIpLnRyaW0oKTtcclxuICAgIGlmIChmcm9tTmF2aWdhdG9yKSByZXR1cm4gZnJvbU5hdmlnYXRvcjtcclxuICB9XHJcblxyXG4gIHJldHVybiBcImVuXCI7XHJcbn07XHJcblxyXG4vLyBSZXNvbHZlcyBhIGxvY2FsaXplZCBjdXJyZW5jeSBkaXNwbGF5IG5hbWUgd2hlbiBJbnRsLkRpc3BsYXlOYW1lcyBpcyBhdmFpbGFibGUuXHJcbmNvbnN0IHJlc29sdmVDdXJyZW5jeURpc3BsYXlOYW1lID0gKGN1cnJlbmN5Q29kZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZENvZGUgPSBub3JtYWxpemVDdXJyZW5jeUNvZGUoY3VycmVuY3lDb2RlKTtcclxuICBpZiAoIW5vcm1hbGl6ZWRDb2RlKSByZXR1cm4gXCJcIjtcclxuXHJcbiAgY29uc3QgaW50bFdpdGhEaXNwbGF5TmFtZXMgPSBJbnRsIGFzIHR5cGVvZiBJbnRsICYge1xyXG4gICAgRGlzcGxheU5hbWVzPzogbmV3IChcclxuICAgICAgbG9jYWxlcz86IHN0cmluZyB8IHN0cmluZ1tdLFxyXG4gICAgICBvcHRpb25zPzogeyB0eXBlOiBcImN1cnJlbmN5XCIgfVxyXG4gICAgKSA9PiB7IG9mOiAodmFsdWU6IHN0cmluZykgPT4gc3RyaW5nIHwgdW5kZWZpbmVkIH07XHJcbiAgfTtcclxuXHJcbiAgaWYgKHR5cGVvZiBpbnRsV2l0aERpc3BsYXlOYW1lcy5EaXNwbGF5TmFtZXMgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFwiXCI7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBkaXNwbGF5TmFtZXMgPSBuZXcgaW50bFdpdGhEaXNwbGF5TmFtZXMuRGlzcGxheU5hbWVzKFtsb2NhbGUsIFwiZW5cIl0sIHsgdHlwZTogXCJjdXJyZW5jeVwiIH0pO1xyXG4gICAgY29uc3QgbG9jYWxpemVkTmFtZSA9IFN0cmluZyhkaXNwbGF5TmFtZXMub2Yobm9ybWFsaXplZENvZGUpIHx8IFwiXCIpLnRyaW0oKTtcclxuICAgIGlmICghbG9jYWxpemVkTmFtZSkgcmV0dXJuIFwiXCI7XHJcblxyXG4gICAgY29uc3Qgbm9ybWFsaXplZE5hbWUgPSBsb2NhbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCk7XHJcbiAgICByZXR1cm4gbm9ybWFsaXplZE5hbWUgPT09IG5vcm1hbGl6ZWRDb2RlID8gXCJcIiA6IGxvY2FsaXplZE5hbWU7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBtYXBDdXJyZW5jeU9wdGlvbnMgPSAoaXRlbXM6IEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvW10gfCB1bmRlZmluZWQsIGxvY2FsZTogc3RyaW5nKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcclxuICBjb25zdCBzb3VyY2UgPSBBcnJheS5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zIDogW107XHJcbiAgY29uc3Qgc2VlbkNvZGVzID0gbmV3IFNldDxzdHJpbmc+KCk7XHJcblxyXG4gIHJldHVybiBzb3VyY2VcclxuICAgIC5tYXAoKGVudHJ5KSA9PiB7XHJcbiAgICAgIGNvbnN0IGN1cnJlbmN5Q29kZUlzbyA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShlbnRyeT8uQ3VycmVuY3lDb2RlSVNPKTtcclxuICAgICAgY29uc3QgZWZmZWN0aXZlSXNvQ29kZSA9IGN1cnJlbmN5Q29kZUlzbyB8fCBub3JtYWxpemVDdXJyZW5jeUNvZGUoZW50cnk/LkN1cnJlbmN5Q29kZSk7XHJcbiAgICAgIGlmICghZWZmZWN0aXZlSXNvQ29kZSkgcmV0dXJuIG51bGw7XHJcbiAgICAgIGlmIChzZWVuQ29kZXMuaGFzKGVmZmVjdGl2ZUlzb0NvZGUpKSByZXR1cm4gbnVsbDtcclxuICAgICAgc2VlbkNvZGVzLmFkZChlZmZlY3RpdmVJc29Db2RlKTtcclxuXHJcbiAgICAgIGNvbnN0IGRpc3BsYXlOYW1lID0gcmVzb2x2ZUN1cnJlbmN5RGlzcGxheU5hbWUoZWZmZWN0aXZlSXNvQ29kZSwgbG9jYWxlKTtcclxuICAgICAgY29uc3Qgb3B0aW9uTGFiZWwgPSBkaXNwbGF5TmFtZSA/IGAke2VmZmVjdGl2ZUlzb0NvZGV9ICR7ZGlzcGxheU5hbWV9YCA6IGVmZmVjdGl2ZUlzb0NvZGU7XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHZhbHVlOiBlZmZlY3RpdmVJc29Db2RlLFxyXG4gICAgICAgIHRleHQ6IG9wdGlvbkxhYmVsLFxyXG4gICAgICAgIGljb246IDxFeHBlbnNlQ3VycmVuY3lGbGFnSWNvbiBjdXJyZW5jeUNvZGU9e2VmZmVjdGl2ZUlzb0NvZGV9IHNpemVDbGFzc05hbWU9e0NVUlJFTkNZX0ZMQUdfU0laRV9DTEFTU30gLz4sXHJcbiAgICAgIH0gYXMgRXhwZW5zZVNlbGVjdE9wdGlvbjtcclxuICAgIH0pXHJcbiAgICAuZmlsdGVyKChlbnRyeSk6IGVudHJ5IGlzIEV4cGVuc2VTZWxlY3RPcHRpb24gPT4gZW50cnkgIT09IG51bGwpO1xyXG59O1xyXG5cclxuLy8gU2hhcmVkIGN1cnJlbmN5IGNvbWJvYm94IGJhY2tlZCBieSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2N1cnJlbmNpZXMuXHJcbmNvbnN0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdCA9ICh7XHJcbiAgbGFiZWwsXHJcbiAgcGxhY2Vob2xkZXIsXHJcbiAgdmFsdWUsXHJcbiAgb25DaGFuZ2UsXHJcbiAgaW52YWxpZCA9IGZhbHNlLFxyXG4gIGlucHV0UmVmLFxyXG4gIHJlYWRPbmx5ID0gZmFsc2UsXHJcbiAgZGlzYWJsZWQgPSBmYWxzZSxcclxuICBzaG93TGFiZWwgPSB0cnVlLFxyXG4gIGlkQmFzZSA9IFwiZXhwZW5zZS1jdXJyZW5jeVwiLFxyXG4gIHByZWZlckRlZmF1bHRDdXJyZW5jeUZyb21Db250ZXh0ID0gZmFsc2UsXHJcbiAgZHJvcGRvd25FeHBhbmRQeCA9IDAsXHJcbiAgZHJvcGRvd25NaW5XaWR0aFB4ID0gMzIwLFxyXG4gIHNob3dMb2FkaW5nU3RhdGVUZXh0ID0gdHJ1ZSxcclxufTogRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0UHJvcHMpID0+IHtcclxuICBjb25zdCBsb2NhbGUgPSB1c2VNZW1vKCgpID0+IHJlYWRQcmVmZXJyZWRMb2NhbGUoKSwgW10pO1xyXG4gIGNvbnN0IFtvcHRpb25zLCBzZXRPcHRpb25zXSA9IHVzZVN0YXRlPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oW10pO1xyXG4gIGNvbnN0IFtpc0xvYWRpbmdPcHRpb25zLCBzZXRJc0xvYWRpbmdPcHRpb25zXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbG9hZEVycm9yTWVzc2FnZSwgc2V0TG9hZEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZW1wdHlNZXNzYWdlLCBzZXRFbXB0eU1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3Qgb25DaGFuZ2VSZWYgPSB1c2VSZWYob25DaGFuZ2UpO1xyXG4gIGNvbnN0IHZhbHVlUmVmID0gdXNlUmVmKG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSh2YWx1ZSkpO1xyXG4gIGNvbnN0IGluaXRpYWxEZWZhdWx0QXBwbGllZFJlZiA9IHVzZVJlZihmYWxzZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBvbkNoYW5nZVJlZi5jdXJyZW50ID0gb25DaGFuZ2U7XHJcbiAgfSwgW29uQ2hhbmdlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICB2YWx1ZVJlZi5jdXJyZW50ID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKHZhbHVlKTtcclxuICB9LCBbdmFsdWVdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGxldCBpc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcclxuXHJcbiAgICBjb25zdCBsb2FkQ3VycmVuY2llcyA9IGFzeW5jICgpID0+IHtcclxuICAgICAgc2V0SXNMb2FkaW5nT3B0aW9ucyh0cnVlKTtcclxuICAgICAgc2V0TG9hZEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0RW1wdHlNZXNzYWdlKFwiXCIpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldEV4cGVuc2VTaGVldEN1cnJlbmNpZXMoe1xyXG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICBzZXRPcHRpb25zKFtdKTtcclxuICAgICAgICAgIHNldExvYWRFcnJvck1lc3NhZ2UocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0cy5cIikpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbWFwcGVkT3B0aW9ucyA9IG1hcEN1cnJlbmN5T3B0aW9ucyhyZXNwb25zZS5JdGVtcywgbG9jYWxlKTtcclxuICAgICAgICBzZXRPcHRpb25zKG1hcHBlZE9wdGlvbnMpO1xyXG5cclxuICAgICAgICBpZiAoIW1hcHBlZE9wdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICBzZXRFbXB0eU1lc3NhZ2UocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX05vRGF0YVwiLCBcIk5vIGRhdGFcIikpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gdmFsdWVSZWYuY3VycmVudDtcclxuICAgICAgICBjb25zdCBoYXNDdXJyZW50SW5MaXN0ID0gbWFwcGVkT3B0aW9ucy5zb21lKChvcHRpb24pID0+IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShvcHRpb24udmFsdWUpID09PSBjdXJyZW50VmFsdWUpO1xyXG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgJiYgaGFzQ3VycmVudEluTGlzdCkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFjdXJyZW50VmFsdWUgJiYgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHQgJiYgIWluaXRpYWxEZWZhdWx0QXBwbGllZFJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgICBjb25zdCBkZWZhdWx0Q3VycmVuY3lDb2RlID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKFxyXG4gICAgICAgICAgICBhd2FpdCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlKHtcclxuICAgICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICBpZiAoZGVmYXVsdEN1cnJlbmN5Q29kZSAmJiBtYXBwZWRPcHRpb25zLnNvbWUoKG9wdGlvbikgPT4gbm9ybWFsaXplQ3VycmVuY3lDb2RlKG9wdGlvbi52YWx1ZSkgPT09IGRlZmF1bHRDdXJyZW5jeUNvZGUpKSB7XHJcbiAgICAgICAgICAgIGluaXRpYWxEZWZhdWx0QXBwbGllZFJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgb25DaGFuZ2VSZWYuY3VycmVudChkZWZhdWx0Q3VycmVuY3lDb2RlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XHJcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGZhbGxiYWNrRXJyb3IgPSBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0cy5cIik7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciA/IGVycm9yLm1lc3NhZ2UgfHwgZmFsbGJhY2tFcnJvciA6IGZhbGxiYWNrRXJyb3I7XHJcbiAgICAgICAgc2V0T3B0aW9ucyhbXSk7XHJcbiAgICAgICAgc2V0TG9hZEVycm9yTWVzc2FnZShtZXNzYWdlKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICBpZiAoIWlzQ2FuY2VsbGVkKSB7XHJcbiAgICAgICAgICBzZXRJc0xvYWRpbmdPcHRpb25zKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdm9pZCBsb2FkQ3VycmVuY2llcygpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlzQ2FuY2VsbGVkID0gdHJ1ZTtcclxuICAgICAgY29udHJvbGxlci5hYm9ydCgpO1xyXG4gICAgfTtcclxuICB9LCBbbG9jYWxlLCBwcmVmZXJEZWZhdWx0Q3VycmVuY3lGcm9tQ29udGV4dF0pO1xyXG5cclxuICBjb25zdCBub3JtYWxpemVkVmFsdWUgPSB1c2VNZW1vKCgpID0+IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSh2YWx1ZSksIFt2YWx1ZV0pO1xyXG4gIGNvbnN0IGRpc2FibGVCZWNhdXNlTm9EYXRhID0gIWlzTG9hZGluZ09wdGlvbnMgJiYgIWxvYWRFcnJvck1lc3NhZ2UgJiYgb3B0aW9ucy5sZW5ndGggPT09IDA7XHJcbiAgY29uc3QgZWZmZWN0aXZlRGlzYWJsZWQgPSBkaXNhYmxlZCB8fCBkaXNhYmxlQmVjYXVzZU5vRGF0YTtcclxuICBjb25zdCBsb2FkaW5nTWVzc2FnZSA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XHJcbiAgICAgIDxTZWxlY3RDb21ib2JveFxyXG4gICAgICAgIGxhYmVsPXtsYWJlbH1cclxuICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XHJcbiAgICAgICAgb3B0aW9ucz17b3B0aW9uc31cclxuICAgICAgICB2YWx1ZT17bm9ybWFsaXplZFZhbHVlfVxyXG4gICAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiBvbkNoYW5nZShub3JtYWxpemVDdXJyZW5jeUNvZGUobmV4dFZhbHVlKSl9XHJcbiAgICAgICAgaW5wdXRSZWY9e2lucHV0UmVmfVxyXG4gICAgICAgIGludmFsaWQ9e2ludmFsaWR9XHJcbiAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxyXG4gICAgICAgIGRpc2FibGVkPXtlZmZlY3RpdmVEaXNhYmxlZH1cclxuICAgICAgICBhbGxvd1RleHRJbnB1dFxyXG4gICAgICAgIHNob3dTZWFyY2hCdXR0b249e2ZhbHNlfVxyXG4gICAgICAgIHNob3dMYWJlbD17c2hvd0xhYmVsfVxyXG4gICAgICAgIHVzZVBvcnRhbFxyXG4gICAgICAgIHNlbGVjdGVkVGV4dE1vZGU9XCJ2YWx1ZVwiXHJcbiAgICAgICAgZHJvcGRvd25FeHBhbmRQeD17ZHJvcGRvd25FeHBhbmRQeH1cclxuICAgICAgICBkcm9wZG93bk1pbldpZHRoUHg9e2Ryb3Bkb3duTWluV2lkdGhQeH1cclxuICAgICAgICBkcm9wZG93bk1heEhlaWdodENsYXNzPVwibWF4LWgtOTZcIlxyXG4gICAgICAgIHNlbGVjdGVkSWNvbkNsYXNzTmFtZT17Q1VSUkVOQ1lfRkxBR19TSVpFX0NMQVNTfVxyXG4gICAgICAgIHNlbGVjdGVkSW5wdXRQYWRkaW5nQ2xhc3NOYW1lPVwicGwtMTJcIlxyXG4gICAgICAgIGNsZWFyT25FbXB0eUlucHV0XHJcbiAgICAgICAgb3B0aW9uSWNvbkNsYXNzTmFtZT17Q1VSUkVOQ1lfRkxBR19TSVpFX0NMQVNTfVxyXG4gICAgICAgIGFsbG93T3B0aW9uSG9yaXpvbnRhbFNjcm9sbFxyXG4gICAgICAgIGxvY2tEcm9wZG93bldpZHRoT25GaXJzdE9wZW5cclxuICAgICAgICBkaXNhYmxlRGVmYXVsdE9wdGlvblBhZGRpbmdcclxuICAgICAgICBvcHRpb25MZWZ0UGFkZGluZ0NsYXNzTmFtZT1cInBsLTFcIlxyXG4gICAgICAgIG9wdGlvbkRlZmF1bHRDbGFzc05hbWU9e0NVUlJFTkNZX09QVElPTl9ERUZBVUxUX0NMQVNTfVxyXG4gICAgICAgIG9wdGlvbkFjdGl2ZUNsYXNzTmFtZT17Q1VSUkVOQ1lfT1BUSU9OX0FDVElWRV9DTEFTU31cclxuICAgICAgICBvcHRpb25TZWxlY3RlZENsYXNzTmFtZT17Q1VSUkVOQ1lfT1BUSU9OX1NFTEVDVEVEX0NMQVNTfVxyXG4gICAgICAgIGlkQmFzZT17aWRCYXNlfVxyXG4gICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgICAgcGFuZWxDbGFzc05hbWU9e0NVUlJFTkNZX0RST1BET1dOX1BBTkVMX0NMQVNTfVxyXG4gICAgICAgIHBhbmVsU3R5bGU9e0NVUlJFTkNZX0RST1BET1dOX1BBTkVMX1NUWUxFfVxyXG4gICAgICAvPlxyXG4gICAgICB7c2hvd0xvYWRpbmdTdGF0ZVRleHQgJiYgaXNMb2FkaW5nT3B0aW9ucyA/IDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS01MDBcIj57bG9hZGluZ01lc3NhZ2V9PC9wPiA6IG51bGx9XHJcbiAgICAgIHshaXNMb2FkaW5nT3B0aW9ucyAmJiBsb2FkRXJyb3JNZXNzYWdlID8gPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWRhbmdlclwiPntsb2FkRXJyb3JNZXNzYWdlfTwvcD4gOiBudWxsfVxyXG4gICAgICB7IWlzTG9hZGluZ09wdGlvbnMgJiYgIWxvYWRFcnJvck1lc3NhZ2UgJiYgZW1wdHlNZXNzYWdlID8gPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMFwiPntlbXB0eU1lc3NhZ2V9PC9wPiA6IG51bGx9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0O1xyXG5cclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxudHlwZSBFeHBlbnNlQ3VycmVuY3lGbGFnSWNvblByb3BzID0ge1xyXG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGNsYXNzTmFtZT86IHN0cmluZztcclxuICBzaXplQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplQ3VycmVuY3lDb2RlID0gKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xyXG59O1xyXG5cclxuLy8gUmVuZGVycyBhIGN1cnJlbmN5IGZsYWcgZnJvbSBsb2NhbCBhc3NldHMgd2l0aCBhIHN0YWJsZSBmYWxsYmFjayBpY29uLlxyXG5jb25zdCBFeHBlbnNlQ3VycmVuY3lGbGFnSWNvbiA9ICh7IGN1cnJlbmN5Q29kZSwgY2xhc3NOYW1lID0gXCJcIiwgc2l6ZUNsYXNzTmFtZSA9IFwiaC00IHctNFwiIH06IEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uUHJvcHMpID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkQ29kZSA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShjdXJyZW5jeUNvZGUpO1xyXG4gIGNvbnN0IFtmYWlsZWRDb2RlLCBzZXRGYWlsZWRDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IGxvYWRGYWlsZWQgPSAhIW5vcm1hbGl6ZWRDb2RlICYmIGZhaWxlZENvZGUgPT09IG5vcm1hbGl6ZWRDb2RlO1xyXG5cclxuICBpZiAoIW5vcm1hbGl6ZWRDb2RlIHx8IGxvYWRGYWlsZWQpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxzcGFuXHJcbiAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgICAgICBjbGFzc05hbWU9e2BpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gdGV4dC1bMTBweF0gZm9udC1zZW1pYm9sZCBsZWFkaW5nLW5vbmUgdGV4dC1zbGF0ZS01MDAgJHtzaXplQ2xhc3NOYW1lfSAke2NsYXNzTmFtZX1gLnRyaW0oKX1cclxuICAgICAgPlxyXG4gICAgICAgICRcclxuICAgICAgPC9zcGFuPlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8aW1nXHJcbiAgICAgIHNyYz17YC9hc3NldHMvZmxhZ3MvJHtlbmNvZGVVUklDb21wb25lbnQobm9ybWFsaXplZENvZGUpfS5zdmdgfVxyXG4gICAgICBhbHQ9XCJcIlxyXG4gICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gICAgICBsb2FkaW5nPVwibGF6eVwiXHJcbiAgICAgIGNsYXNzTmFtZT17YCR7c2l6ZUNsYXNzTmFtZX0gcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gb2JqZWN0LWNvbnRhaW4gJHtjbGFzc05hbWV9YC50cmltKCl9XHJcbiAgICAgIG9uRXJyb3I9eygpID0+IHNldEZhaWxlZENvZGUobm9ybWFsaXplZENvZGUpfVxyXG4gICAgLz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUN1cnJl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LGdDQUFnQyxDQUFDO0FBRTdDLFFBQU0sc0JBQWtCLHVCQUFRLE1BQU1BLHVCQUFzQixLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDM0UsUUFBTSx1QkFBdUIsQ0FBQyxvQkFBb0IsQ0FBQyxvQkFBb0IsUUFBUSxXQUFXO0FBQzFGLFFBQU0sb0JBQW9CLFlBQVk7QUFDdEMsUUFBTSxpQkFBaUIsS0FBSyxrQkFBa0IsU0FBUztBQUV2RCxTQUNFLDhDQUFDLFNBQUksV0FBVSxlQUNiO0FBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBLE9BQU87QUFBQSxRQUNQLFVBQVUsQ0FBQyxjQUFjLFNBQVNBLHVCQUFzQixTQUFTLENBQUM7QUFBQSxRQUNsRTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxVQUFVO0FBQUEsUUFDVixnQkFBYztBQUFBLFFBQ2Qsa0JBQWtCO0FBQUEsUUFDbEI7QUFBQSxRQUNBLFdBQVM7QUFBQSxRQUNULGtCQUFpQjtBQUFBLFFBQ2pCO0FBQUEsUUFDQTtBQUFBLFFBQ0Esd0JBQXVCO0FBQUEsUUFDdkIsdUJBQXVCO0FBQUEsUUFDdkIsK0JBQThCO0FBQUEsUUFDOUIsbUJBQWlCO0FBQUEsUUFDakIscUJBQXFCO0FBQUEsUUFDckIsNkJBQTJCO0FBQUEsUUFDM0IsOEJBQTRCO0FBQUEsUUFDNUIsNkJBQTJCO0FBQUEsUUFDM0IsNEJBQTJCO0FBQUEsUUFDM0Isd0JBQXdCO0FBQUEsUUFDeEIsdUJBQXVCO0FBQUEsUUFDdkIseUJBQXlCO0FBQUEsUUFDekI7QUFBQSxRQUNBLGlCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLFlBQVk7QUFBQTtBQUFBLElBQ2Q7QUFBQSxJQUNDLHdCQUF3QixtQkFBbUIsNkNBQUMsT0FBRSxXQUFVLDBCQUEwQiwwQkFBZSxJQUFPO0FBQUEsSUFDeEcsQ0FBQyxvQkFBb0IsbUJBQW1CLDZDQUFDLE9BQUUsV0FBVSx1QkFBdUIsNEJBQWlCLElBQU87QUFBQSxJQUNwRyxDQUFDLG9CQUFvQixDQUFDLG9CQUFvQixlQUFlLDZDQUFDLE9BQUUsV0FBVSwwQkFBMEIsd0JBQWEsSUFBTztBQUFBLEtBQ3ZIO0FBRUo7QUFFQSxJQUFPLHNDQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJub3JtYWxpemVDdXJyZW5jeUNvZGUiXQp9Cg==
