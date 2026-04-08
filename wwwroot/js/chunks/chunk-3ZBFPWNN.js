import {
  SelectCombobox_default
} from "./chunk-5M5C6OOF.js";
import {
  getExpenseSheetCurrencies,
  getExpenseSheetDefaultCurrencyCode,
  normalizeCardTitleText,
  safeText
} from "./chunk-DLCB5DZF.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-2NKOKBT5.js";
import {
  ApiFetchError,
  indT
} from "./chunk-5TAE4PEJ.js";
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "timeline-date-panel expense-timeline-card__date-panel flex flex-col items-center justify-center gap-1 bg-slate-50 border-r border-slate-200 text-slate-600", children: datePanelContent ? datePanelContent : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-semibold tracking-[0.2em] text-slate-500", children: dateParts.year }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-slate-500", children: dateParts.month }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-2xl font-semibold text-primary", children: dateParts.day })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "timeline-card__content expense-timeline-card__content flex-1", children: [
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlQ3VycmVuY3lGbGFnSWNvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlRGF0ZVBhcnRzIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IG5vcm1hbGl6ZUNhcmRUaXRsZVRleHQsIHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VUaW1lbGluZUNhcmRJbnRlcmFjdGlvblByb3BzID0gUGljazxcclxuICBSZWFjdC5CdXR0b25IVE1MQXR0cmlidXRlczxIVE1MQnV0dG9uRWxlbWVudD4sXHJcbiAgfCBcImFyaWEtbGFiZWxcIlxyXG4gIHwgXCJhcmlhLXByZXNzZWRcIlxyXG4gIHwgXCJvbkNsaWNrXCJcclxuICB8IFwib25Db250ZXh0TWVudVwiXHJcbiAgfCBcIm9uS2V5RG93blwiXHJcbiAgfCBcIm9uUG9pbnRlckNhbmNlbFwiXHJcbiAgfCBcIm9uUG9pbnRlckRvd25cIlxyXG4gIHwgXCJvblBvaW50ZXJNb3ZlXCJcclxuICB8IFwib25Qb2ludGVyVXBcIlxyXG4gIHwgXCJyb2xlXCJcclxuICB8IFwidGFiSW5kZXhcIlxyXG4+O1xyXG5cclxudHlwZSBFeHBlbnNlVGltZWxpbmVDYXJkUHJvcHMgPSB7XHJcbiAgZGF0ZVBhcnRzOiBFeHBlbnNlRGF0ZVBhcnRzO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgYW1vdW50VGV4dDogc3RyaW5nO1xyXG4gIG9uT3BlbjogKCkgPT4gdm9pZDtcclxuICB0aXRsZUNsYXNzTmFtZT86IHN0cmluZztcclxuICBhbW91bnRDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgc3RhdHVzQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIHN0YXR1c0xhYmVsPzogc3RyaW5nO1xyXG4gIHN1YnRpdGxlPzogc3RyaW5nO1xyXG4gIHN1YnRpdGxlQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIHN0YXR1c0ljb24/OiBSZWFjdC5SZWFjdE5vZGU7XHJcbiAgc3RhdHVzSWNvbkNsYXNzTmFtZT86IHN0cmluZztcclxuICBkYXRlUGFuZWxDb250ZW50PzogUmVhY3QuUmVhY3ROb2RlO1xyXG4gIGludGVyYWN0aW9uUHJvcHM/OiBFeHBlbnNlVGltZWxpbmVDYXJkSW50ZXJhY3Rpb25Qcm9wcztcclxufTtcclxuXHJcbi8vIFJldXNhYmxlIGNsaWNrYWJsZSB0aW1lbGluZSBjYXJkIGZvciBleHBlbnNlIHNoZWV0cyBhbmQgZXhwZW5zZSBsaW5lcy5cclxuY29uc3QgRXhwZW5zZVRpbWVsaW5lQ2FyZCA9ICh7XHJcbiAgZGF0ZVBhcnRzLFxyXG4gIHRpdGxlLFxyXG4gIGFtb3VudFRleHQsXHJcbiAgb25PcGVuLFxyXG4gIHRpdGxlQ2xhc3NOYW1lID0gXCJ0aW1lbGluZS1uYW1lXCIsXHJcbiAgYW1vdW50Q2xhc3NOYW1lID0gXCJleHBlbnNlLXNoZWV0LWNhcmRfX2Ftb3VudFwiLFxyXG4gIHN0YXR1c0NsYXNzTmFtZSxcclxuICBzdGF0dXNMYWJlbCxcclxuICBzdWJ0aXRsZSA9IFwiXCIsXHJcbiAgc3VidGl0bGVDbGFzc05hbWUgPSBcImV4cGVuc2Utc2hlZXQtY2FyZF9fc3VidGl0bGVcIixcclxuICBzdGF0dXNJY29uLFxyXG4gIHN0YXR1c0ljb25DbGFzc05hbWUgPSBcImV4cGVuc2Utc2hlZXQtY2FyZF9fc3RhdHVzLWljb25cIixcclxuICBkYXRlUGFuZWxDb250ZW50LFxyXG4gIGludGVyYWN0aW9uUHJvcHMsXHJcbn06IEV4cGVuc2VUaW1lbGluZUNhcmRQcm9wcykgPT4ge1xyXG4gIGNvbnN0IHNhZmVUaXRsZSA9IG5vcm1hbGl6ZUNhcmRUaXRsZVRleHQodGl0bGUsIFwiLVwiKTtcclxuICBjb25zdCBzYWZlQW1vdW50ID0gYW1vdW50VGV4dCB8fCBcIi1cIjtcclxuICBjb25zdCBzYWZlU3VidGl0bGUgPSBzYWZlVGV4dChzdWJ0aXRsZSk7XHJcbiAgY29uc3Qge1xyXG4gICAgb25DbGljazogY3VzdG9tT25DbGljayxcclxuICAgIG9uS2V5RG93bjogY3VzdG9tT25LZXlEb3duLFxyXG4gICAgcm9sZTogY3VzdG9tUm9sZSxcclxuICAgIHRhYkluZGV4OiBjdXN0b21UYWJJbmRleCxcclxuICAgIC4uLnJlc3RJbnRlcmFjdGlvblByb3BzXHJcbiAgfSA9IGludGVyYWN0aW9uUHJvcHMgfHwge307XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8YnV0dG9uXHJcbiAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICBjbGFzc05hbWU9XCJ0aW1lbGluZS1jYXJkIHRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZSBleHBlbnNlLXRpbWVsaW5lLWNhcmQgdGV4dC1sZWZ0XCJcclxuICAgICAgcm9sZT17Y3VzdG9tUm9sZX1cclxuICAgICAgdGFiSW5kZXg9e3R5cGVvZiBjdXN0b21UYWJJbmRleCA9PT0gXCJudW1iZXJcIiA/IGN1c3RvbVRhYkluZGV4IDogMH1cclxuICAgICAgb25DbGljaz17Y3VzdG9tT25DbGljayA/PyBvbk9wZW59XHJcbiAgICAgIG9uS2V5RG93bj17Y3VzdG9tT25LZXlEb3dufVxyXG4gICAgICB7Li4ucmVzdEludGVyYWN0aW9uUHJvcHN9XHJcbiAgICA+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtZGF0ZS1wYW5lbCBleHBlbnNlLXRpbWVsaW5lLWNhcmRfX2RhdGUtcGFuZWwgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEgYmctc2xhdGUtNTAgYm9yZGVyLXIgYm9yZGVyLXNsYXRlLTIwMCB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgIHtkYXRlUGFuZWxDb250ZW50ID8gKFxyXG4gICAgICAgICAgZGF0ZVBhbmVsQ29udGVudFxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFja2luZy1bMC4yZW1dIHRleHQtc2xhdGUtNTAwXCI+e2RhdGVQYXJ0cy55ZWFyfTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctWzAuMmVtXSB0ZXh0LXNsYXRlLTUwMFwiPntkYXRlUGFydHMubW9udGh9PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1zZW1pYm9sZCB0ZXh0LXByaW1hcnlcIj57ZGF0ZVBhcnRzLmRheX08L2Rpdj5cclxuICAgICAgICAgIDwvPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWNhcmRfX2NvbnRlbnQgZXhwZW5zZS10aW1lbGluZS1jYXJkX19jb250ZW50IGZsZXgtMVwiPlxyXG4gICAgICAgIHtzdGF0dXNDbGFzc05hbWUgPyA8c3BhbiBjbGFzc05hbWU9e3N0YXR1c0NsYXNzTmFtZX0gdGl0bGU9e3N0YXR1c0xhYmVsfSBhcmlhLWxhYmVsPXtzdGF0dXNMYWJlbH0gLz4gOiBudWxsfVxyXG4gICAgICAgIHtzdGF0dXNJY29uID8gKFxyXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdGF0dXNJY29uQ2xhc3NOYW1lfSByb2xlPVwiZ3JvdXBcIiBhcmlhLWxhYmVsPXtzdGF0dXNMYWJlbCB8fCB1bmRlZmluZWR9PlxyXG4gICAgICAgICAgICB7c3RhdHVzSWNvbn1cclxuICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgICA8cCBjbGFzc05hbWU9e3RpdGxlQ2xhc3NOYW1lfSBkYXRhLWZ1bGx0ZXh0PXtzYWZlVGl0bGV9PlxyXG4gICAgICAgICAge3NhZmVUaXRsZX1cclxuICAgICAgICA8L3A+XHJcbiAgICAgICAge3NhZmVTdWJ0aXRsZSA/IChcclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT17c3VidGl0bGVDbGFzc05hbWV9IGRhdGEtZnVsbHRleHQ9e3NhZmVTdWJ0aXRsZX0+XHJcbiAgICAgICAgICAgIHtzYWZlU3VidGl0bGV9XHJcbiAgICAgICAgICA8L3A+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXthbW91bnRDbGFzc05hbWV9IGRhdGEtZnVsbHRleHQ9e3NhZmVBbW91bnR9PlxyXG4gICAgICAgICAge3NhZmVBbW91bnR9XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvYnV0dG9uPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGltZWxpbmVDYXJkO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlU2hlZXRDdXJyZW5jaWVzLCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlQ3VycmVuY3lGbGFnSWNvbiBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGbGFnSWNvbi50c3hcIjtcclxuXHJcbnR5cGUgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0UHJvcHMgPSB7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcclxuICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcclxuICBpZEJhc2U/OiBzdHJpbmc7XHJcbiAgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHQ/OiBib29sZWFuO1xyXG4gIGRyb3Bkb3duRXhwYW5kUHg/OiBudW1iZXI7XHJcbiAgZHJvcGRvd25NaW5XaWR0aFB4PzogbnVtYmVyO1xyXG4gIHNob3dMb2FkaW5nU3RhdGVUZXh0PzogYm9vbGVhbjtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSA9ICh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcclxufTtcclxuXHJcbmNvbnN0IENVUlJFTkNZX0ZMQUdfU0laRV9DTEFTUyA9IFwiaC02IHctNlwiO1xyXG5jb25zdCBDVVJSRU5DWV9EUk9QRE9XTl9QQU5FTF9DTEFTUyA9IFwidmlzaXRhcy10eXBvZ3JhcGh5IHJpbmctWyNBOUI4Q0NdLzcwXCI7XHJcbmNvbnN0IENVUlJFTkNZX0RST1BET1dOX1BBTkVMX1NUWUxFOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0ge1xyXG4gIGJhY2tncm91bmRDb2xvcjogXCIjRENFM0VEXCIsXHJcbiAgYm9yZGVyOiBcIjFweCBzb2xpZCAjQTlCOENDXCIsXHJcbiAgYm94U2hhZG93OiBcIjAgMTBweCAyNHB4IHJnYmEoMTUsIDQxLCA2OSwgMC4xNClcIixcclxufTtcclxuY29uc3QgQ1VSUkVOQ1lfT1BUSU9OX0RFRkFVTFRfQ0xBU1MgPSBcInRleHQtWyMwRjI5NDVdXCI7XHJcbmNvbnN0IENVUlJFTkNZX09QVElPTl9BQ1RJVkVfQ0xBU1MgPSBcImJnLVsjQzZEMkUzXSB0ZXh0LVsjMEYyOTQ1XVwiO1xyXG5jb25zdCBDVVJSRU5DWV9PUFRJT05fU0VMRUNURURfQ0xBU1MgPSBcImJnLXByaW1hcnkgdGV4dC13aGl0ZVwiO1xyXG5cclxuY29uc3QgcmVhZFByZWZlcnJlZExvY2FsZSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIGNvbnN0IGZyb21Eb2N1bWVudCA9IFN0cmluZyhkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgaWYgKGZyb21Eb2N1bWVudCkgcmV0dXJuIGZyb21Eb2N1bWVudDtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICBjb25zdCBmcm9tTmF2aWdhdG9yID0gU3RyaW5nKG5hdmlnYXRvci5sYW5ndWFnZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgICBpZiAoZnJvbU5hdmlnYXRvcikgcmV0dXJuIGZyb21OYXZpZ2F0b3I7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gXCJlblwiO1xyXG59O1xyXG5cclxuLy8gUmVzb2x2ZXMgYSBsb2NhbGl6ZWQgY3VycmVuY3kgZGlzcGxheSBuYW1lIHdoZW4gSW50bC5EaXNwbGF5TmFtZXMgaXMgYXZhaWxhYmxlLlxyXG5jb25zdCByZXNvbHZlQ3VycmVuY3lEaXNwbGF5TmFtZSA9IChjdXJyZW5jeUNvZGU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRDb2RlID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKGN1cnJlbmN5Q29kZSk7XHJcbiAgaWYgKCFub3JtYWxpemVkQ29kZSkgcmV0dXJuIFwiXCI7XHJcblxyXG4gIGNvbnN0IGludGxXaXRoRGlzcGxheU5hbWVzID0gSW50bCBhcyB0eXBlb2YgSW50bCAmIHtcclxuICAgIERpc3BsYXlOYW1lcz86IG5ldyAoXHJcbiAgICAgIGxvY2FsZXM/OiBzdHJpbmcgfCBzdHJpbmdbXSxcclxuICAgICAgb3B0aW9ucz86IHsgdHlwZTogXCJjdXJyZW5jeVwiIH1cclxuICAgICkgPT4geyBvZjogKHZhbHVlOiBzdHJpbmcpID0+IHN0cmluZyB8IHVuZGVmaW5lZCB9O1xyXG4gIH07XHJcblxyXG4gIGlmICh0eXBlb2YgaW50bFdpdGhEaXNwbGF5TmFtZXMuRGlzcGxheU5hbWVzICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBcIlwiO1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgZGlzcGxheU5hbWVzID0gbmV3IGludGxXaXRoRGlzcGxheU5hbWVzLkRpc3BsYXlOYW1lcyhbbG9jYWxlLCBcImVuXCJdLCB7IHR5cGU6IFwiY3VycmVuY3lcIiB9KTtcclxuICAgIGNvbnN0IGxvY2FsaXplZE5hbWUgPSBTdHJpbmcoZGlzcGxheU5hbWVzLm9mKG5vcm1hbGl6ZWRDb2RlKSB8fCBcIlwiKS50cmltKCk7XHJcbiAgICBpZiAoIWxvY2FsaXplZE5hbWUpIHJldHVybiBcIlwiO1xyXG5cclxuICAgIGNvbnN0IG5vcm1hbGl6ZWROYW1lID0gbG9jYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZWROYW1lID09PSBub3JtYWxpemVkQ29kZSA/IFwiXCIgOiBsb2NhbGl6ZWROYW1lO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgbWFwQ3VycmVuY3lPcHRpb25zID0gKGl0ZW1zOiBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0b1tdIHwgdW5kZWZpbmVkLCBsb2NhbGU6IHN0cmluZyk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XHJcbiAgY29uc3Qgc291cmNlID0gQXJyYXkuaXNBcnJheShpdGVtcykgPyBpdGVtcyA6IFtdO1xyXG4gIGNvbnN0IHNlZW5Db2RlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xyXG5cclxuICByZXR1cm4gc291cmNlXHJcbiAgICAubWFwKChlbnRyeSkgPT4ge1xyXG4gICAgICBjb25zdCBjdXJyZW5jeUNvZGVJc28gPSBub3JtYWxpemVDdXJyZW5jeUNvZGUoZW50cnk/LkN1cnJlbmN5Q29kZUlTTyk7XHJcbiAgICAgIGNvbnN0IGVmZmVjdGl2ZUlzb0NvZGUgPSBjdXJyZW5jeUNvZGVJc28gfHwgbm9ybWFsaXplQ3VycmVuY3lDb2RlKGVudHJ5Py5DdXJyZW5jeUNvZGUpO1xyXG4gICAgICBpZiAoIWVmZmVjdGl2ZUlzb0NvZGUpIHJldHVybiBudWxsO1xyXG4gICAgICBpZiAoc2VlbkNvZGVzLmhhcyhlZmZlY3RpdmVJc29Db2RlKSkgcmV0dXJuIG51bGw7XHJcbiAgICAgIHNlZW5Db2Rlcy5hZGQoZWZmZWN0aXZlSXNvQ29kZSk7XHJcblxyXG4gICAgICBjb25zdCBkaXNwbGF5TmFtZSA9IHJlc29sdmVDdXJyZW5jeURpc3BsYXlOYW1lKGVmZmVjdGl2ZUlzb0NvZGUsIGxvY2FsZSk7XHJcbiAgICAgIGNvbnN0IG9wdGlvbkxhYmVsID0gZGlzcGxheU5hbWUgPyBgJHtlZmZlY3RpdmVJc29Db2RlfSAke2Rpc3BsYXlOYW1lfWAgOiBlZmZlY3RpdmVJc29Db2RlO1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB2YWx1ZTogZWZmZWN0aXZlSXNvQ29kZSxcclxuICAgICAgICB0ZXh0OiBvcHRpb25MYWJlbCxcclxuICAgICAgICBpY29uOiA8RXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gY3VycmVuY3lDb2RlPXtlZmZlY3RpdmVJc29Db2RlfSBzaXplQ2xhc3NOYW1lPXtDVVJSRU5DWV9GTEFHX1NJWkVfQ0xBU1N9IC8+LFxyXG4gICAgICB9IGFzIEV4cGVuc2VTZWxlY3RPcHRpb247XHJcbiAgICB9KVxyXG4gICAgLmZpbHRlcigoZW50cnkpOiBlbnRyeSBpcyBFeHBlbnNlU2VsZWN0T3B0aW9uID0+IGVudHJ5ICE9PSBudWxsKTtcclxufTtcclxuXHJcbi8vIFNoYXJlZCBjdXJyZW5jeSBjb21ib2JveCBiYWNrZWQgYnkgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9jdXJyZW5jaWVzLlxyXG5jb25zdCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QgPSAoe1xyXG4gIGxhYmVsLFxyXG4gIHBsYWNlaG9sZGVyLFxyXG4gIHZhbHVlLFxyXG4gIG9uQ2hhbmdlLFxyXG4gIHJlYWRPbmx5ID0gZmFsc2UsXHJcbiAgZGlzYWJsZWQgPSBmYWxzZSxcclxuICBzaG93TGFiZWwgPSB0cnVlLFxyXG4gIGlkQmFzZSA9IFwiZXhwZW5zZS1jdXJyZW5jeVwiLFxyXG4gIHByZWZlckRlZmF1bHRDdXJyZW5jeUZyb21Db250ZXh0ID0gZmFsc2UsXHJcbiAgZHJvcGRvd25FeHBhbmRQeCA9IDAsXHJcbiAgZHJvcGRvd25NaW5XaWR0aFB4ID0gMzIwLFxyXG4gIHNob3dMb2FkaW5nU3RhdGVUZXh0ID0gdHJ1ZSxcclxufTogRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0UHJvcHMpID0+IHtcclxuICBjb25zdCBsb2NhbGUgPSB1c2VNZW1vKCgpID0+IHJlYWRQcmVmZXJyZWRMb2NhbGUoKSwgW10pO1xyXG4gIGNvbnN0IFtvcHRpb25zLCBzZXRPcHRpb25zXSA9IHVzZVN0YXRlPEV4cGVuc2VTZWxlY3RPcHRpb25bXT4oW10pO1xyXG4gIGNvbnN0IFtpc0xvYWRpbmdPcHRpb25zLCBzZXRJc0xvYWRpbmdPcHRpb25zXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbG9hZEVycm9yTWVzc2FnZSwgc2V0TG9hZEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbZW1wdHlNZXNzYWdlLCBzZXRFbXB0eU1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3Qgb25DaGFuZ2VSZWYgPSB1c2VSZWYob25DaGFuZ2UpO1xyXG4gIGNvbnN0IHZhbHVlUmVmID0gdXNlUmVmKG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSh2YWx1ZSkpO1xyXG4gIGNvbnN0IGluaXRpYWxEZWZhdWx0QXBwbGllZFJlZiA9IHVzZVJlZihmYWxzZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBvbkNoYW5nZVJlZi5jdXJyZW50ID0gb25DaGFuZ2U7XHJcbiAgfSwgW29uQ2hhbmdlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICB2YWx1ZVJlZi5jdXJyZW50ID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKHZhbHVlKTtcclxuICB9LCBbdmFsdWVdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGxldCBpc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcclxuXHJcbiAgICBjb25zdCBsb2FkQ3VycmVuY2llcyA9IGFzeW5jICgpID0+IHtcclxuICAgICAgc2V0SXNMb2FkaW5nT3B0aW9ucyh0cnVlKTtcclxuICAgICAgc2V0TG9hZEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgICAgc2V0RW1wdHlNZXNzYWdlKFwiXCIpO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldEV4cGVuc2VTaGVldEN1cnJlbmNpZXMoe1xyXG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgICBzZXRPcHRpb25zKFtdKTtcclxuICAgICAgICAgIHNldExvYWRFcnJvck1lc3NhZ2UocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0cy5cIikpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbWFwcGVkT3B0aW9ucyA9IG1hcEN1cnJlbmN5T3B0aW9ucyhyZXNwb25zZS5JdGVtcywgbG9jYWxlKTtcclxuICAgICAgICBzZXRPcHRpb25zKG1hcHBlZE9wdGlvbnMpO1xyXG5cclxuICAgICAgICBpZiAoIW1hcHBlZE9wdGlvbnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICBzZXRFbXB0eU1lc3NhZ2UocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX05vRGF0YVwiLCBcIk5vIGRhdGFcIikpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gdmFsdWVSZWYuY3VycmVudDtcclxuICAgICAgICBjb25zdCBoYXNDdXJyZW50SW5MaXN0ID0gbWFwcGVkT3B0aW9ucy5zb21lKChvcHRpb24pID0+IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShvcHRpb24udmFsdWUpID09PSBjdXJyZW50VmFsdWUpO1xyXG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgJiYgaGFzQ3VycmVudEluTGlzdCkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFjdXJyZW50VmFsdWUgJiYgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHQgJiYgIWluaXRpYWxEZWZhdWx0QXBwbGllZFJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgICBjb25zdCBkZWZhdWx0Q3VycmVuY3lDb2RlID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKFxyXG4gICAgICAgICAgICBhd2FpdCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlKHtcclxuICAgICAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgICAgICAgICBzaWduYWw6IGNvbnRyb2xsZXIuc2lnbmFsLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICBpZiAoZGVmYXVsdEN1cnJlbmN5Q29kZSAmJiBtYXBwZWRPcHRpb25zLnNvbWUoKG9wdGlvbikgPT4gbm9ybWFsaXplQ3VycmVuY3lDb2RlKG9wdGlvbi52YWx1ZSkgPT09IGRlZmF1bHRDdXJyZW5jeUNvZGUpKSB7XHJcbiAgICAgICAgICAgIGluaXRpYWxEZWZhdWx0QXBwbGllZFJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgICAgICAgICAgb25DaGFuZ2VSZWYuY3VycmVudChkZWZhdWx0Q3VycmVuY3lDb2RlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XHJcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGZhbGxiYWNrRXJyb3IgPSBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0cy5cIik7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciA/IGVycm9yLm1lc3NhZ2UgfHwgZmFsbGJhY2tFcnJvciA6IGZhbGxiYWNrRXJyb3I7XHJcbiAgICAgICAgc2V0T3B0aW9ucyhbXSk7XHJcbiAgICAgICAgc2V0TG9hZEVycm9yTWVzc2FnZShtZXNzYWdlKTtcclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICBpZiAoIWlzQ2FuY2VsbGVkKSB7XHJcbiAgICAgICAgICBzZXRJc0xvYWRpbmdPcHRpb25zKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdm9pZCBsb2FkQ3VycmVuY2llcygpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlzQ2FuY2VsbGVkID0gdHJ1ZTtcclxuICAgICAgY29udHJvbGxlci5hYm9ydCgpO1xyXG4gICAgfTtcclxuICB9LCBbbG9jYWxlLCBwcmVmZXJEZWZhdWx0Q3VycmVuY3lGcm9tQ29udGV4dF0pO1xyXG5cclxuICBjb25zdCBub3JtYWxpemVkVmFsdWUgPSB1c2VNZW1vKCgpID0+IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSh2YWx1ZSksIFt2YWx1ZV0pO1xyXG4gIGNvbnN0IGRpc2FibGVCZWNhdXNlTm9EYXRhID0gIWlzTG9hZGluZ09wdGlvbnMgJiYgIWxvYWRFcnJvck1lc3NhZ2UgJiYgb3B0aW9ucy5sZW5ndGggPT09IDA7XHJcbiAgY29uc3QgZWZmZWN0aXZlRGlzYWJsZWQgPSBkaXNhYmxlZCB8fCBkaXNhYmxlQmVjYXVzZU5vRGF0YTtcclxuICBjb25zdCBsb2FkaW5nTWVzc2FnZSA9IGluZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIik7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XHJcbiAgICAgIDxTZWxlY3RDb21ib2JveFxyXG4gICAgICAgIGxhYmVsPXtsYWJlbH1cclxuICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XHJcbiAgICAgICAgb3B0aW9ucz17b3B0aW9uc31cclxuICAgICAgICB2YWx1ZT17bm9ybWFsaXplZFZhbHVlfVxyXG4gICAgICAgIG9uQ2hhbmdlPXsobmV4dFZhbHVlKSA9PiBvbkNoYW5nZShub3JtYWxpemVDdXJyZW5jeUNvZGUobmV4dFZhbHVlKSl9XHJcbiAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxyXG4gICAgICAgIGRpc2FibGVkPXtlZmZlY3RpdmVEaXNhYmxlZH1cclxuICAgICAgICBhbGxvd1RleHRJbnB1dFxyXG4gICAgICAgIHNob3dTZWFyY2hCdXR0b249e2ZhbHNlfVxyXG4gICAgICAgIHNob3dMYWJlbD17c2hvd0xhYmVsfVxyXG4gICAgICAgIHVzZVBvcnRhbFxyXG4gICAgICAgIHNlbGVjdGVkVGV4dE1vZGU9XCJ2YWx1ZVwiXHJcbiAgICAgICAgZHJvcGRvd25FeHBhbmRQeD17ZHJvcGRvd25FeHBhbmRQeH1cclxuICAgICAgICBkcm9wZG93bk1pbldpZHRoUHg9e2Ryb3Bkb3duTWluV2lkdGhQeH1cclxuICAgICAgICBkcm9wZG93bk1heEhlaWdodENsYXNzPVwibWF4LWgtOTZcIlxyXG4gICAgICAgIHNlbGVjdGVkSWNvbkNsYXNzTmFtZT17Q1VSUkVOQ1lfRkxBR19TSVpFX0NMQVNTfVxyXG4gICAgICAgIHNlbGVjdGVkSW5wdXRQYWRkaW5nQ2xhc3NOYW1lPVwicGwtMTJcIlxyXG4gICAgICAgIGNsZWFyT25FbXB0eUlucHV0XHJcbiAgICAgICAgb3B0aW9uSWNvbkNsYXNzTmFtZT17Q1VSUkVOQ1lfRkxBR19TSVpFX0NMQVNTfVxyXG4gICAgICAgIGFsbG93T3B0aW9uSG9yaXpvbnRhbFNjcm9sbFxyXG4gICAgICAgIGxvY2tEcm9wZG93bldpZHRoT25GaXJzdE9wZW5cclxuICAgICAgICBkaXNhYmxlRGVmYXVsdE9wdGlvblBhZGRpbmdcclxuICAgICAgICBvcHRpb25MZWZ0UGFkZGluZ0NsYXNzTmFtZT1cInBsLTFcIlxyXG4gICAgICAgIG9wdGlvbkRlZmF1bHRDbGFzc05hbWU9e0NVUlJFTkNZX09QVElPTl9ERUZBVUxUX0NMQVNTfVxyXG4gICAgICAgIG9wdGlvbkFjdGl2ZUNsYXNzTmFtZT17Q1VSUkVOQ1lfT1BUSU9OX0FDVElWRV9DTEFTU31cclxuICAgICAgICBvcHRpb25TZWxlY3RlZENsYXNzTmFtZT17Q1VSUkVOQ1lfT1BUSU9OX1NFTEVDVEVEX0NMQVNTfVxyXG4gICAgICAgIGlkQmFzZT17aWRCYXNlfVxyXG4gICAgICAgIHBvcnRhbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXHJcbiAgICAgICAgcGFuZWxDbGFzc05hbWU9e0NVUlJFTkNZX0RST1BET1dOX1BBTkVMX0NMQVNTfVxyXG4gICAgICAgIHBhbmVsU3R5bGU9e0NVUlJFTkNZX0RST1BET1dOX1BBTkVMX1NUWUxFfVxyXG4gICAgICAvPlxyXG4gICAgICB7c2hvd0xvYWRpbmdTdGF0ZVRleHQgJiYgaXNMb2FkaW5nT3B0aW9ucyA/IDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS01MDBcIj57bG9hZGluZ01lc3NhZ2V9PC9wPiA6IG51bGx9XHJcbiAgICAgIHshaXNMb2FkaW5nT3B0aW9ucyAmJiBsb2FkRXJyb3JNZXNzYWdlID8gPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWRhbmdlclwiPntsb2FkRXJyb3JNZXNzYWdlfTwvcD4gOiBudWxsfVxyXG4gICAgICB7IWlzTG9hZGluZ09wdGlvbnMgJiYgIWxvYWRFcnJvck1lc3NhZ2UgJiYgZW1wdHlNZXNzYWdlID8gPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMFwiPntlbXB0eU1lc3NhZ2V9PC9wPiA6IG51bGx9XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0O1xyXG5cclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuXHJcbnR5cGUgRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb25Qcm9wcyA9IHtcclxuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgc2l6ZUNsYXNzTmFtZT86IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSA9ICh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcclxufTtcclxuXHJcbi8vIFJlbmRlcnMgYSBjdXJyZW5jeSBmbGFnIGZyb20gbG9jYWwgYXNzZXRzIHdpdGggYSBzdGFibGUgZmFsbGJhY2sgaWNvbi5cclxuY29uc3QgRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gPSAoeyBjdXJyZW5jeUNvZGUsIGNsYXNzTmFtZSA9IFwiXCIsIHNpemVDbGFzc05hbWUgPSBcImgtNCB3LTRcIiB9OiBFeHBlbnNlQ3VycmVuY3lGbGFnSWNvblByb3BzKSA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRDb2RlID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKGN1cnJlbmN5Q29kZSk7XG4gIGNvbnN0IFtmYWlsZWRDb2RlLCBzZXRGYWlsZWRDb2RlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBsb2FkRmFpbGVkID0gISFub3JtYWxpemVkQ29kZSAmJiBmYWlsZWRDb2RlID09PSBub3JtYWxpemVkQ29kZTtcblxyXG4gIGlmICghbm9ybWFsaXplZENvZGUgfHwgbG9hZEZhaWxlZCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHNwYW5cclxuICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gICAgICAgIGNsYXNzTmFtZT17YGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSB0ZXh0LVsxMHB4XSBmb250LXNlbWlib2xkIGxlYWRpbmctbm9uZSB0ZXh0LXNsYXRlLTUwMCAke3NpemVDbGFzc05hbWV9ICR7Y2xhc3NOYW1lfWAudHJpbSgpfVxuICAgICAgPlxyXG4gICAgICAgICRcclxuICAgICAgPC9zcGFuPlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8aW1nXHJcbiAgICAgIHNyYz17YC9hc3NldHMvZmxhZ3MvJHtlbmNvZGVVUklDb21wb25lbnQobm9ybWFsaXplZENvZGUpfS5zdmdgfVxyXG4gICAgICBhbHQ9XCJcIlxuICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgIGxvYWRpbmc9XCJsYXp5XCJcbiAgICAgIGNsYXNzTmFtZT17YCR7c2l6ZUNsYXNzTmFtZX0gcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gb2JqZWN0LWNvbnRhaW4gJHtjbGFzc05hbWV9YC50cmltKCl9XG4gICAgICBvbkVycm9yPXsoKSA9PiBzZXRGYWlsZWRDb2RlKG5vcm1hbGl6ZWRDb2RlKX1cbiAgICAvPlxuICApO1xufTtcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlQ3VycmVuY3lGbGFnSWNvbjtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQThFVTtBQXpDVixJQUFNLHNCQUFzQixDQUFDO0FBQUEsRUFDM0I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLGlCQUFpQjtBQUFBLEVBQ2pCLGtCQUFrQjtBQUFBLEVBQ2xCO0FBQUEsRUFDQTtBQUFBLEVBQ0EsV0FBVztBQUFBLEVBQ1gsb0JBQW9CO0FBQUEsRUFDcEI7QUFBQSxFQUNBLHNCQUFzQjtBQUFBLEVBQ3RCO0FBQUEsRUFDQTtBQUNGLE1BQWdDO0FBQzlCLFFBQU0sWUFBWSx1QkFBdUIsT0FBTyxHQUFHO0FBQ25ELFFBQU0sYUFBYSxjQUFjO0FBQ2pDLFFBQU0sZUFBZSxTQUFTLFFBQVE7QUFDdEMsUUFBTTtBQUFBLElBQ0osU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1gsTUFBTTtBQUFBLElBQ04sVUFBVTtBQUFBLElBQ1YsR0FBRztBQUFBLEVBQ0wsSUFBSSxvQkFBb0IsQ0FBQztBQUV6QixTQUNFO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxNQUFLO0FBQUEsTUFDTCxXQUFVO0FBQUEsTUFDVixNQUFNO0FBQUEsTUFDTixVQUFVLE9BQU8sbUJBQW1CLFdBQVcsaUJBQWlCO0FBQUEsTUFDaEUsU0FBUyxpQkFBaUI7QUFBQSxNQUMxQixXQUFXO0FBQUEsTUFDVixHQUFHO0FBQUEsTUFFSjtBQUFBLG9EQUFDLFNBQUksV0FBVSw4SkFDWiw2QkFDQyxtQkFFQSw0RUFDRTtBQUFBLHNEQUFDLFNBQUksV0FBVSx5REFBeUQsb0JBQVUsTUFBSztBQUFBLFVBQ3ZGLDRDQUFDLFNBQUksV0FBVSxtRUFBbUUsb0JBQVUsT0FBTTtBQUFBLFVBQ2xHLDRDQUFDLFNBQUksV0FBVSx1Q0FBdUMsb0JBQVUsS0FBSTtBQUFBLFdBQ3RFLEdBRUo7QUFBQSxRQUNBLDZDQUFDLFNBQUksV0FBVSxnRUFDWjtBQUFBLDRCQUFrQiw0Q0FBQyxVQUFLLFdBQVcsaUJBQWlCLE9BQU8sYUFBYSxjQUFZLGFBQWEsSUFBSztBQUFBLFVBQ3RHLGFBQ0MsNENBQUMsVUFBSyxXQUFXLHFCQUFxQixNQUFLLFNBQVEsY0FBWSxlQUFlLFFBQzNFLHNCQUNILElBQ0U7QUFBQSxVQUNKLDRDQUFDLE9BQUUsV0FBVyxnQkFBZ0IsaUJBQWUsV0FDMUMscUJBQ0g7QUFBQSxVQUNDLGVBQ0MsNENBQUMsT0FBRSxXQUFXLG1CQUFtQixpQkFBZSxjQUM3Qyx3QkFDSCxJQUNFO0FBQUEsVUFDSiw0Q0FBQyxVQUFLLFdBQVcsaUJBQWlCLGlCQUFlLFlBQzlDLHNCQUNIO0FBQUEsV0FDRjtBQUFBO0FBQUE7QUFBQSxFQUNGO0FBRUo7QUFFQSxJQUFPLDhCQUFROzs7QUM1R2YsSUFBQUEsZ0JBQTREOzs7QUNBNUQsbUJBQWdDO0FBb0IxQixJQUFBQyxzQkFBQTtBQVpOLElBQU0sd0JBQXdCLENBQUMsVUFBc0Q7QUFDbkYsU0FBTyxPQUFPLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZO0FBQ2hEO0FBR0EsSUFBTSwwQkFBMEIsQ0FBQyxFQUFFLGNBQWMsWUFBWSxJQUFJLGdCQUFnQixVQUFVLE1BQW9DO0FBQzdILFFBQU0saUJBQWlCLHNCQUFzQixZQUFZO0FBQ3pELFFBQU0sQ0FBQyxZQUFZLGFBQWEsUUFBSSx1QkFBUyxFQUFFO0FBQy9DLFFBQU0sYUFBYSxDQUFDLENBQUMsa0JBQWtCLGVBQWU7QUFFdEQsTUFBSSxDQUFDLGtCQUFrQixZQUFZO0FBQ2pDLFdBQ0U7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLGVBQVk7QUFBQSxRQUNaLFdBQVcsNEhBQTRILGFBQWEsSUFBSSxTQUFTLEdBQUcsS0FBSztBQUFBLFFBQzFLO0FBQUE7QUFBQSxJQUVEO0FBQUEsRUFFSjtBQUVBLFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDLEtBQUssaUJBQWlCLG1CQUFtQixjQUFjLENBQUM7QUFBQSxNQUN4RCxLQUFJO0FBQUEsTUFDSixlQUFZO0FBQUEsTUFDWixTQUFRO0FBQUEsTUFDUixXQUFXLEdBQUcsYUFBYSw4Q0FBOEMsU0FBUyxHQUFHLEtBQUs7QUFBQSxNQUMxRixTQUFTLE1BQU0sY0FBYyxjQUFjO0FBQUE7QUFBQSxFQUM3QztBQUVKO0FBRUEsSUFBTyxrQ0FBUTs7O0FEd0RELElBQUFDLHNCQUFBO0FBekVkLElBQU1DLHlCQUF3QixDQUFDLFVBQXNEO0FBQ25GLFNBQU8sT0FBTyxTQUFTLEVBQUUsRUFBRSxLQUFLLEVBQUUsWUFBWTtBQUNoRDtBQUVBLElBQU0sMkJBQTJCO0FBQ2pDLElBQU0sZ0NBQWdDO0FBQ3RDLElBQU0sZ0NBQXFEO0FBQUEsRUFDekQsaUJBQWlCO0FBQUEsRUFDakIsUUFBUTtBQUFBLEVBQ1IsV0FBVztBQUNiO0FBQ0EsSUFBTSxnQ0FBZ0M7QUFDdEMsSUFBTSwrQkFBK0I7QUFDckMsSUFBTSxpQ0FBaUM7QUFFdkMsSUFBTSxzQkFBc0IsTUFBYztBQUN4QyxNQUFJLE9BQU8sYUFBYSxhQUFhO0FBQ25DLFVBQU0sZUFBZSxPQUFPLFNBQVMsaUJBQWlCLFFBQVEsRUFBRSxFQUFFLEtBQUs7QUFDdkUsUUFBSSxhQUFjLFFBQU87QUFBQSxFQUMzQjtBQUVBLE1BQUksT0FBTyxjQUFjLGFBQWE7QUFDcEMsVUFBTSxnQkFBZ0IsT0FBTyxVQUFVLFlBQVksRUFBRSxFQUFFLEtBQUs7QUFDNUQsUUFBSSxjQUFlLFFBQU87QUFBQSxFQUM1QjtBQUVBLFNBQU87QUFDVDtBQUdBLElBQU0sNkJBQTZCLENBQUMsY0FBc0IsV0FBMkI7QUFDbkYsUUFBTSxpQkFBaUJBLHVCQUFzQixZQUFZO0FBQ3pELE1BQUksQ0FBQyxlQUFnQixRQUFPO0FBRTVCLFFBQU0sdUJBQXVCO0FBTzdCLE1BQUksT0FBTyxxQkFBcUIsaUJBQWlCLFdBQVksUUFBTztBQUVwRSxNQUFJO0FBQ0YsVUFBTSxlQUFlLElBQUkscUJBQXFCLGFBQWEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQy9GLFVBQU0sZ0JBQWdCLE9BQU8sYUFBYSxHQUFHLGNBQWMsS0FBSyxFQUFFLEVBQUUsS0FBSztBQUN6RSxRQUFJLENBQUMsY0FBZSxRQUFPO0FBRTNCLFVBQU0saUJBQWlCLGNBQWMsWUFBWTtBQUNqRCxXQUFPLG1CQUFtQixpQkFBaUIsS0FBSztBQUFBLEVBQ2xELFFBQVE7QUFDTixXQUFPO0FBQUEsRUFDVDtBQUNGO0FBRUEsSUFBTSxxQkFBcUIsQ0FBQyxPQUE4QyxXQUEwQztBQUNsSCxRQUFNLFNBQVMsTUFBTSxRQUFRLEtBQUssSUFBSSxRQUFRLENBQUM7QUFDL0MsUUFBTSxZQUFZLG9CQUFJLElBQVk7QUFFbEMsU0FBTyxPQUNKLElBQUksQ0FBQyxVQUFVO0FBQ2QsVUFBTSxrQkFBa0JBLHVCQUFzQixPQUFPLGVBQWU7QUFDcEUsVUFBTSxtQkFBbUIsbUJBQW1CQSx1QkFBc0IsT0FBTyxZQUFZO0FBQ3JGLFFBQUksQ0FBQyxpQkFBa0IsUUFBTztBQUM5QixRQUFJLFVBQVUsSUFBSSxnQkFBZ0IsRUFBRyxRQUFPO0FBQzVDLGNBQVUsSUFBSSxnQkFBZ0I7QUFFOUIsVUFBTSxjQUFjLDJCQUEyQixrQkFBa0IsTUFBTTtBQUN2RSxVQUFNLGNBQWMsY0FBYyxHQUFHLGdCQUFnQixJQUFJLFdBQVcsS0FBSztBQUV6RSxXQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixNQUFNLDZDQUFDLG1DQUF3QixjQUFjLGtCQUFrQixlQUFlLDBCQUEwQjtBQUFBLElBQzFHO0FBQUEsRUFDRixDQUFDLEVBQ0EsT0FBTyxDQUFDLFVBQXdDLFVBQVUsSUFBSTtBQUNuRTtBQUdBLElBQU0sOEJBQThCLENBQUM7QUFBQSxFQUNuQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsWUFBWTtBQUFBLEVBQ1osU0FBUztBQUFBLEVBQ1QsbUNBQW1DO0FBQUEsRUFDbkMsbUJBQW1CO0FBQUEsRUFDbkIscUJBQXFCO0FBQUEsRUFDckIsdUJBQXVCO0FBQ3pCLE1BQXdDO0FBQ3RDLFFBQU0sYUFBUyx1QkFBUSxNQUFNLG9CQUFvQixHQUFHLENBQUMsQ0FBQztBQUN0RCxRQUFNLENBQUMsU0FBUyxVQUFVLFFBQUksd0JBQWdDLENBQUMsQ0FBQztBQUNoRSxRQUFNLENBQUMsa0JBQWtCLG1CQUFtQixRQUFJLHdCQUFTLEtBQUs7QUFDOUQsUUFBTSxDQUFDLGtCQUFrQixtQkFBbUIsUUFBSSx3QkFBUyxFQUFFO0FBQzNELFFBQU0sQ0FBQyxjQUFjLGVBQWUsUUFBSSx3QkFBUyxFQUFFO0FBQ25ELFFBQU0sa0JBQWMsc0JBQU8sUUFBUTtBQUNuQyxRQUFNLGVBQVcsc0JBQU9BLHVCQUFzQixLQUFLLENBQUM7QUFDcEQsUUFBTSwrQkFBMkIsc0JBQU8sS0FBSztBQUU3QywrQkFBVSxNQUFNO0FBQ2QsZ0JBQVksVUFBVTtBQUFBLEVBQ3hCLEdBQUcsQ0FBQyxRQUFRLENBQUM7QUFFYiwrQkFBVSxNQUFNO0FBQ2QsYUFBUyxVQUFVQSx1QkFBc0IsS0FBSztBQUFBLEVBQ2hELEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFFViwrQkFBVSxNQUFNO0FBQ2QsUUFBSSxjQUFjO0FBQ2xCLFVBQU0sYUFBYSxJQUFJLGdCQUFnQjtBQUV2QyxVQUFNLGlCQUFpQixZQUFZO0FBQ2pDLDBCQUFvQixJQUFJO0FBQ3hCLDBCQUFvQixFQUFFO0FBQ3RCLHNCQUFnQixFQUFFO0FBRWxCLFVBQUk7QUFDRixjQUFNLFdBQVcsTUFBTSwwQkFBMEI7QUFBQSxVQUMvQyx5QkFBeUI7QUFBQSxVQUN6QixRQUFRLFdBQVc7QUFBQSxRQUNyQixDQUFDO0FBRUQsWUFBSSxZQUFhO0FBRWpCLFlBQUksQ0FBQyxTQUFTLFNBQVM7QUFDckIscUJBQVcsQ0FBQyxDQUFDO0FBQ2IsOEJBQW9CLFNBQVMsV0FBVyxLQUFLLDJCQUEyQixnQ0FBZ0MsQ0FBQztBQUN6RztBQUFBLFFBQ0Y7QUFFQSxjQUFNLGdCQUFnQixtQkFBbUIsU0FBUyxPQUFPLE1BQU07QUFDL0QsbUJBQVcsYUFBYTtBQUV4QixZQUFJLENBQUMsY0FBYyxRQUFRO0FBQ3pCLDBCQUFnQixTQUFTLFdBQVcsS0FBSyxpQkFBaUIsU0FBUyxDQUFDO0FBQ3BFO0FBQUEsUUFDRjtBQUVBLGNBQU0sZUFBZSxTQUFTO0FBQzlCLGNBQU0sbUJBQW1CLGNBQWMsS0FBSyxDQUFDLFdBQVdBLHVCQUFzQixPQUFPLEtBQUssTUFBTSxZQUFZO0FBQzVHLFlBQUksZ0JBQWdCLGtCQUFrQjtBQUNwQztBQUFBLFFBQ0Y7QUFFQSxZQUFJLENBQUMsZ0JBQWdCLG9DQUFvQyxDQUFDLHlCQUF5QixTQUFTO0FBQzFGLGdCQUFNLHNCQUFzQkE7QUFBQSxZQUMxQixNQUFNLG1DQUFtQztBQUFBLGNBQ3ZDLHlCQUF5QjtBQUFBLGNBQ3pCLFFBQVEsV0FBVztBQUFBLFlBQ3JCLENBQUM7QUFBQSxVQUNIO0FBRUEsY0FBSSxZQUFhO0FBRWpCLGNBQUksdUJBQXVCLGNBQWMsS0FBSyxDQUFDLFdBQVdBLHVCQUFzQixPQUFPLEtBQUssTUFBTSxtQkFBbUIsR0FBRztBQUN0SCxxQ0FBeUIsVUFBVTtBQUNuQyx3QkFBWSxRQUFRLG1CQUFtQjtBQUFBLFVBQ3pDO0FBQUEsUUFDRjtBQUFBLE1BQ0YsU0FBUyxPQUFPO0FBQ2QsWUFBSSxZQUFhO0FBQ2pCLFlBQUksaUJBQWlCLGdCQUFnQixNQUFNLFNBQVMsYUFBYztBQUVsRSxjQUFNLGdCQUFnQixLQUFLLDJCQUEyQixnQ0FBZ0M7QUFDdEYsY0FBTSxVQUFVLGlCQUFpQixnQkFBZ0IsTUFBTSxXQUFXLGdCQUFnQjtBQUNsRixtQkFBVyxDQUFDLENBQUM7QUFDYiw0QkFBb0IsT0FBTztBQUFBLE1BQzdCLFVBQUU7QUFDQSxZQUFJLENBQUMsYUFBYTtBQUNoQiw4QkFBb0IsS0FBSztBQUFBLFFBQzNCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxTQUFLLGVBQWU7QUFFcEIsV0FBTyxNQUFNO0FBQ1gsb0JBQWM7QUFDZCxpQkFBVyxNQUFNO0FBQUEsSUFDbkI7QUFBQSxFQUNGLEdBQUcsQ0FBQyxRQUFRLGdDQUFnQyxDQUFDO0FBRTdDLFFBQU0sc0JBQWtCLHVCQUFRLE1BQU1BLHVCQUFzQixLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDM0UsUUFBTSx1QkFBdUIsQ0FBQyxvQkFBb0IsQ0FBQyxvQkFBb0IsUUFBUSxXQUFXO0FBQzFGLFFBQU0sb0JBQW9CLFlBQVk7QUFDdEMsUUFBTSxpQkFBaUIsS0FBSyxrQkFBa0IsU0FBUztBQUV2RCxTQUNFLDhDQUFDLFNBQUksV0FBVSxlQUNiO0FBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBLE9BQU87QUFBQSxRQUNQLFVBQVUsQ0FBQyxjQUFjLFNBQVNBLHVCQUFzQixTQUFTLENBQUM7QUFBQSxRQUNsRTtBQUFBLFFBQ0EsVUFBVTtBQUFBLFFBQ1YsZ0JBQWM7QUFBQSxRQUNkLGtCQUFrQjtBQUFBLFFBQ2xCO0FBQUEsUUFDQSxXQUFTO0FBQUEsUUFDVCxrQkFBaUI7QUFBQSxRQUNqQjtBQUFBLFFBQ0E7QUFBQSxRQUNBLHdCQUF1QjtBQUFBLFFBQ3ZCLHVCQUF1QjtBQUFBLFFBQ3ZCLCtCQUE4QjtBQUFBLFFBQzlCLG1CQUFpQjtBQUFBLFFBQ2pCLHFCQUFxQjtBQUFBLFFBQ3JCLDZCQUEyQjtBQUFBLFFBQzNCLDhCQUE0QjtBQUFBLFFBQzVCLDZCQUEyQjtBQUFBLFFBQzNCLDRCQUEyQjtBQUFBLFFBQzNCLHdCQUF3QjtBQUFBLFFBQ3hCLHVCQUF1QjtBQUFBLFFBQ3ZCLHlCQUF5QjtBQUFBLFFBQ3pCO0FBQUEsUUFDQSxpQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixZQUFZO0FBQUE7QUFBQSxJQUNkO0FBQUEsSUFDQyx3QkFBd0IsbUJBQW1CLDZDQUFDLE9BQUUsV0FBVSwwQkFBMEIsMEJBQWUsSUFBTztBQUFBLElBQ3hHLENBQUMsb0JBQW9CLG1CQUFtQiw2Q0FBQyxPQUFFLFdBQVUsdUJBQXVCLDRCQUFpQixJQUFPO0FBQUEsSUFDcEcsQ0FBQyxvQkFBb0IsQ0FBQyxvQkFBb0IsZUFBZSw2Q0FBQyxPQUFFLFdBQVUsMEJBQTBCLHdCQUFhLElBQU87QUFBQSxLQUN2SDtBQUVKO0FBRUEsSUFBTyxzQ0FBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAibm9ybWFsaXplQ3VycmVuY3lDb2RlIl0KfQo=
