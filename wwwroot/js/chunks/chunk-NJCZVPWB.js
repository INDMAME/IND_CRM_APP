import {
  SelectCombobox_default
} from "./chunk-S6U6GZC2.js";
import {
  getExpenseSheetCurrencies,
  getExpenseSheetDefaultCurrencyCode,
  normalizeCardTitleText,
  safeText
} from "./chunk-IUMLRTMN.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlQ3VycmVuY3lGbGFnSWNvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlRGF0ZVBhcnRzIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IG5vcm1hbGl6ZUNhcmRUaXRsZVRleHQsIHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VUaW1lbGluZUNhcmRJbnRlcmFjdGlvblByb3BzID0gUGljazxcclxuICBSZWFjdC5CdXR0b25IVE1MQXR0cmlidXRlczxIVE1MQnV0dG9uRWxlbWVudD4sXHJcbiAgfCBcImFyaWEtbGFiZWxcIlxyXG4gIHwgXCJhcmlhLXByZXNzZWRcIlxyXG4gIHwgXCJvbkNsaWNrXCJcclxuICB8IFwib25Db250ZXh0TWVudVwiXHJcbiAgfCBcIm9uS2V5RG93blwiXHJcbiAgfCBcIm9uUG9pbnRlckNhbmNlbFwiXHJcbiAgfCBcIm9uUG9pbnRlckRvd25cIlxyXG4gIHwgXCJvblBvaW50ZXJNb3ZlXCJcclxuICB8IFwib25Qb2ludGVyVXBcIlxyXG4gIHwgXCJyb2xlXCJcclxuICB8IFwidGFiSW5kZXhcIlxyXG4+O1xyXG5cclxudHlwZSBFeHBlbnNlVGltZWxpbmVDYXJkUHJvcHMgPSB7XHJcbiAgZGF0ZVBhcnRzOiBFeHBlbnNlRGF0ZVBhcnRzO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgYW1vdW50VGV4dDogc3RyaW5nO1xyXG4gIG9uT3BlbjogKCkgPT4gdm9pZDtcclxuICB0aXRsZUNsYXNzTmFtZT86IHN0cmluZztcclxuICBhbW91bnRDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgc3RhdHVzQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIHN0YXR1c0xhYmVsPzogc3RyaW5nO1xyXG4gIHN1YnRpdGxlPzogc3RyaW5nO1xyXG4gIHN1YnRpdGxlQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIHN0YXR1c0ljb24/OiBSZWFjdC5SZWFjdE5vZGU7XHJcbiAgc3RhdHVzSWNvbkNsYXNzTmFtZT86IHN0cmluZztcclxuICBkYXRlUGFuZWxDb250ZW50PzogUmVhY3QuUmVhY3ROb2RlO1xyXG4gIGludGVyYWN0aW9uUHJvcHM/OiBFeHBlbnNlVGltZWxpbmVDYXJkSW50ZXJhY3Rpb25Qcm9wcztcclxufTtcclxuXHJcbi8vIFJldXNhYmxlIGNsaWNrYWJsZSB0aW1lbGluZSBjYXJkIGZvciBleHBlbnNlIHNoZWV0cyBhbmQgZXhwZW5zZSBsaW5lcy5cclxuY29uc3QgRXhwZW5zZVRpbWVsaW5lQ2FyZCA9ICh7XHJcbiAgZGF0ZVBhcnRzLFxyXG4gIHRpdGxlLFxyXG4gIGFtb3VudFRleHQsXHJcbiAgb25PcGVuLFxyXG4gIHRpdGxlQ2xhc3NOYW1lID0gXCJ0aW1lbGluZS1uYW1lXCIsXHJcbiAgYW1vdW50Q2xhc3NOYW1lID0gXCJleHBlbnNlLXNoZWV0LWNhcmRfX2Ftb3VudFwiLFxyXG4gIHN0YXR1c0NsYXNzTmFtZSxcclxuICBzdGF0dXNMYWJlbCxcclxuICBzdWJ0aXRsZSA9IFwiXCIsXHJcbiAgc3VidGl0bGVDbGFzc05hbWUgPSBcImV4cGVuc2Utc2hlZXQtY2FyZF9fc3VidGl0bGVcIixcclxuICBzdGF0dXNJY29uLFxyXG4gIHN0YXR1c0ljb25DbGFzc05hbWUgPSBcImV4cGVuc2Utc2hlZXQtY2FyZF9fc3RhdHVzLWljb25cIixcclxuICBkYXRlUGFuZWxDb250ZW50LFxyXG4gIGludGVyYWN0aW9uUHJvcHMsXHJcbn06IEV4cGVuc2VUaW1lbGluZUNhcmRQcm9wcykgPT4ge1xyXG4gIGNvbnN0IHNhZmVUaXRsZSA9IG5vcm1hbGl6ZUNhcmRUaXRsZVRleHQodGl0bGUsIFwiLVwiKTtcclxuICBjb25zdCBzYWZlQW1vdW50ID0gYW1vdW50VGV4dCB8fCBcIi1cIjtcclxuICBjb25zdCBzYWZlU3VidGl0bGUgPSBzYWZlVGV4dChzdWJ0aXRsZSk7XHJcbiAgY29uc3Qge1xyXG4gICAgb25DbGljazogY3VzdG9tT25DbGljayxcclxuICAgIG9uS2V5RG93bjogY3VzdG9tT25LZXlEb3duLFxyXG4gICAgcm9sZTogY3VzdG9tUm9sZSxcclxuICAgIHRhYkluZGV4OiBjdXN0b21UYWJJbmRleCxcclxuICAgIC4uLnJlc3RJbnRlcmFjdGlvblByb3BzXHJcbiAgfSA9IGludGVyYWN0aW9uUHJvcHMgfHwge307XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8YnV0dG9uXHJcbiAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICBjbGFzc05hbWU9XCJ0aW1lbGluZS1jYXJkIHRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZSBleHBlbnNlLXRpbWVsaW5lLWNhcmQgdGV4dC1sZWZ0XCJcclxuICAgICAgcm9sZT17Y3VzdG9tUm9sZX1cclxuICAgICAgdGFiSW5kZXg9e3R5cGVvZiBjdXN0b21UYWJJbmRleCA9PT0gXCJudW1iZXJcIiA/IGN1c3RvbVRhYkluZGV4IDogMH1cclxuICAgICAgb25DbGljaz17Y3VzdG9tT25DbGljayA/PyBvbk9wZW59XHJcbiAgICAgIG9uS2V5RG93bj17Y3VzdG9tT25LZXlEb3dufVxyXG4gICAgICB7Li4ucmVzdEludGVyYWN0aW9uUHJvcHN9XHJcbiAgICA+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtZGF0ZS1wYW5lbCBleHBlbnNlLXRpbWVsaW5lLWNhcmRfX2RhdGUtcGFuZWwgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEgYmctc2xhdGUtNTAgYm9yZGVyLXIgYm9yZGVyLXNsYXRlLTIwMCB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgIHtkYXRlUGFuZWxDb250ZW50ID8gKFxyXG4gICAgICAgICAgZGF0ZVBhbmVsQ29udGVudFxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFja2luZy1bMC4yZW1dIHRleHQtc2xhdGUtNTAwXCI+e2RhdGVQYXJ0cy55ZWFyfTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctWzAuMmVtXSB0ZXh0LXNsYXRlLTUwMFwiPntkYXRlUGFydHMubW9udGh9PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1zZW1pYm9sZCB0ZXh0LXByaW1hcnlcIj57ZGF0ZVBhcnRzLmRheX08L2Rpdj5cclxuICAgICAgICAgIDwvPlxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWNhcmRfX2NvbnRlbnQgZXhwZW5zZS10aW1lbGluZS1jYXJkX19jb250ZW50IGZsZXgtMVwiPlxyXG4gICAgICAgIHtzdGF0dXNDbGFzc05hbWUgPyA8c3BhbiBjbGFzc05hbWU9e3N0YXR1c0NsYXNzTmFtZX0gdGl0bGU9e3N0YXR1c0xhYmVsfSBhcmlhLWxhYmVsPXtzdGF0dXNMYWJlbH0gLz4gOiBudWxsfVxyXG4gICAgICAgIHtzdGF0dXNJY29uID8gKFxyXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtzdGF0dXNJY29uQ2xhc3NOYW1lfSByb2xlPVwiZ3JvdXBcIiBhcmlhLWxhYmVsPXtzdGF0dXNMYWJlbCB8fCB1bmRlZmluZWR9PlxyXG4gICAgICAgICAgICB7c3RhdHVzSWNvbn1cclxuICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgICA8cCBjbGFzc05hbWU9e3RpdGxlQ2xhc3NOYW1lfSBkYXRhLWZ1bGx0ZXh0PXtzYWZlVGl0bGV9PlxyXG4gICAgICAgICAge3NhZmVUaXRsZX1cclxuICAgICAgICA8L3A+XHJcbiAgICAgICAge3NhZmVTdWJ0aXRsZSA/IChcclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT17c3VidGl0bGVDbGFzc05hbWV9IGRhdGEtZnVsbHRleHQ9e3NhZmVTdWJ0aXRsZX0+XHJcbiAgICAgICAgICAgIHtzYWZlU3VidGl0bGV9XHJcbiAgICAgICAgICA8L3A+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXthbW91bnRDbGFzc05hbWV9IGRhdGEtZnVsbHRleHQ9e3NhZmVBbW91bnR9PlxyXG4gICAgICAgICAge3NhZmVBbW91bnR9XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvYnV0dG9uPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGltZWxpbmVDYXJkO1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU2VsZWN0Q29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlU2hlZXRDdXJyZW5jaWVzLCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XHJcbmltcG9ydCBFeHBlbnNlQ3VycmVuY3lGbGFnSWNvbiBmcm9tIFwiLi9FeHBlbnNlQ3VycmVuY3lGbGFnSWNvbi50c3hcIjtcclxuXHJcbnR5cGUgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0UHJvcHMgPSB7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGludmFsaWQ/OiBib29sZWFuO1xyXG4gIGlucHV0UmVmPzogUmVhY3QuUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcclxuICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcclxuICBpZEJhc2U/OiBzdHJpbmc7XHJcbiAgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHQ/OiBib29sZWFuO1xyXG4gIGRyb3Bkb3duRXhwYW5kUHg/OiBudW1iZXI7XHJcbiAgZHJvcGRvd25NaW5XaWR0aFB4PzogbnVtYmVyO1xyXG4gIHNob3dMb2FkaW5nU3RhdGVUZXh0PzogYm9vbGVhbjtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSA9ICh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcclxufTtcclxuXHJcbmNvbnN0IENVUlJFTkNZX0ZMQUdfU0laRV9DTEFTUyA9IFwiaC02IHctNlwiO1xyXG5jb25zdCBDVVJSRU5DWV9EUk9QRE9XTl9QQU5FTF9DTEFTUyA9IFwidmlzaXRhcy10eXBvZ3JhcGh5IHJpbmctWyNBOUI4Q0NdLzcwXCI7XHJcbmNvbnN0IENVUlJFTkNZX0RST1BET1dOX1BBTkVMX1NUWUxFOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0ge1xyXG4gIGJhY2tncm91bmRDb2xvcjogXCIjRENFM0VEXCIsXHJcbiAgYm9yZGVyOiBcIjFweCBzb2xpZCAjQTlCOENDXCIsXHJcbiAgYm94U2hhZG93OiBcIjAgMTBweCAyNHB4IHJnYmEoMTUsIDQxLCA2OSwgMC4xNClcIixcclxufTtcclxuY29uc3QgQ1VSUkVOQ1lfT1BUSU9OX0RFRkFVTFRfQ0xBU1MgPSBcInRleHQtWyMwRjI5NDVdXCI7XHJcbmNvbnN0IENVUlJFTkNZX09QVElPTl9BQ1RJVkVfQ0xBU1MgPSBcImJnLVsjQzZEMkUzXSB0ZXh0LVsjMEYyOTQ1XVwiO1xyXG5jb25zdCBDVVJSRU5DWV9PUFRJT05fU0VMRUNURURfQ0xBU1MgPSBcImJnLXByaW1hcnkgdGV4dC13aGl0ZVwiO1xyXG5cclxuY29uc3QgcmVhZFByZWZlcnJlZExvY2FsZSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIGNvbnN0IGZyb21Eb2N1bWVudCA9IFN0cmluZyhkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ/LmxhbmcgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgaWYgKGZyb21Eb2N1bWVudCkgcmV0dXJuIGZyb21Eb2N1bWVudDtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICBjb25zdCBmcm9tTmF2aWdhdG9yID0gU3RyaW5nKG5hdmlnYXRvci5sYW5ndWFnZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgICBpZiAoZnJvbU5hdmlnYXRvcikgcmV0dXJuIGZyb21OYXZpZ2F0b3I7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gXCJlblwiO1xyXG59O1xyXG5cclxuLy8gUmVzb2x2ZXMgYSBsb2NhbGl6ZWQgY3VycmVuY3kgZGlzcGxheSBuYW1lIHdoZW4gSW50bC5EaXNwbGF5TmFtZXMgaXMgYXZhaWxhYmxlLlxyXG5jb25zdCByZXNvbHZlQ3VycmVuY3lEaXNwbGF5TmFtZSA9IChjdXJyZW5jeUNvZGU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRDb2RlID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKGN1cnJlbmN5Q29kZSk7XHJcbiAgaWYgKCFub3JtYWxpemVkQ29kZSkgcmV0dXJuIFwiXCI7XHJcblxyXG4gIGNvbnN0IGludGxXaXRoRGlzcGxheU5hbWVzID0gSW50bCBhcyB0eXBlb2YgSW50bCAmIHtcclxuICAgIERpc3BsYXlOYW1lcz86IG5ldyAoXHJcbiAgICAgIGxvY2FsZXM/OiBzdHJpbmcgfCBzdHJpbmdbXSxcclxuICAgICAgb3B0aW9ucz86IHsgdHlwZTogXCJjdXJyZW5jeVwiIH1cclxuICAgICkgPT4geyBvZjogKHZhbHVlOiBzdHJpbmcpID0+IHN0cmluZyB8IHVuZGVmaW5lZCB9O1xyXG4gIH07XHJcblxyXG4gIGlmICh0eXBlb2YgaW50bFdpdGhEaXNwbGF5TmFtZXMuRGlzcGxheU5hbWVzICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBcIlwiO1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgZGlzcGxheU5hbWVzID0gbmV3IGludGxXaXRoRGlzcGxheU5hbWVzLkRpc3BsYXlOYW1lcyhbbG9jYWxlLCBcImVuXCJdLCB7IHR5cGU6IFwiY3VycmVuY3lcIiB9KTtcclxuICAgIGNvbnN0IGxvY2FsaXplZE5hbWUgPSBTdHJpbmcoZGlzcGxheU5hbWVzLm9mKG5vcm1hbGl6ZWRDb2RlKSB8fCBcIlwiKS50cmltKCk7XHJcbiAgICBpZiAoIWxvY2FsaXplZE5hbWUpIHJldHVybiBcIlwiO1xyXG5cclxuICAgIGNvbnN0IG5vcm1hbGl6ZWROYW1lID0gbG9jYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZWROYW1lID09PSBub3JtYWxpemVkQ29kZSA/IFwiXCIgOiBsb2NhbGl6ZWROYW1lO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgbWFwQ3VycmVuY3lPcHRpb25zID0gKGl0ZW1zOiBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0b1tdIHwgdW5kZWZpbmVkLCBsb2NhbGU6IHN0cmluZyk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XHJcbiAgY29uc3Qgc291cmNlID0gQXJyYXkuaXNBcnJheShpdGVtcykgPyBpdGVtcyA6IFtdO1xyXG4gIGNvbnN0IHNlZW5Db2RlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xyXG5cclxuICByZXR1cm4gc291cmNlXHJcbiAgICAubWFwKChlbnRyeSkgPT4ge1xyXG4gICAgICBjb25zdCBjdXJyZW5jeUNvZGVJc28gPSBub3JtYWxpemVDdXJyZW5jeUNvZGUoZW50cnk/LkN1cnJlbmN5Q29kZUlTTyk7XHJcbiAgICAgIGNvbnN0IGVmZmVjdGl2ZUlzb0NvZGUgPSBjdXJyZW5jeUNvZGVJc28gfHwgbm9ybWFsaXplQ3VycmVuY3lDb2RlKGVudHJ5Py5DdXJyZW5jeUNvZGUpO1xyXG4gICAgICBpZiAoIWVmZmVjdGl2ZUlzb0NvZGUpIHJldHVybiBudWxsO1xyXG4gICAgICBpZiAoc2VlbkNvZGVzLmhhcyhlZmZlY3RpdmVJc29Db2RlKSkgcmV0dXJuIG51bGw7XHJcbiAgICAgIHNlZW5Db2Rlcy5hZGQoZWZmZWN0aXZlSXNvQ29kZSk7XHJcblxyXG4gICAgICBjb25zdCBkaXNwbGF5TmFtZSA9IHJlc29sdmVDdXJyZW5jeURpc3BsYXlOYW1lKGVmZmVjdGl2ZUlzb0NvZGUsIGxvY2FsZSk7XHJcbiAgICAgIGNvbnN0IG9wdGlvbkxhYmVsID0gZGlzcGxheU5hbWUgPyBgJHtlZmZlY3RpdmVJc29Db2RlfSAke2Rpc3BsYXlOYW1lfWAgOiBlZmZlY3RpdmVJc29Db2RlO1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB2YWx1ZTogZWZmZWN0aXZlSXNvQ29kZSxcclxuICAgICAgICB0ZXh0OiBvcHRpb25MYWJlbCxcclxuICAgICAgICBpY29uOiA8RXhwZW5zZUN1cnJlbmN5RmxhZ0ljb24gY3VycmVuY3lDb2RlPXtlZmZlY3RpdmVJc29Db2RlfSBzaXplQ2xhc3NOYW1lPXtDVVJSRU5DWV9GTEFHX1NJWkVfQ0xBU1N9IC8+LFxyXG4gICAgICB9IGFzIEV4cGVuc2VTZWxlY3RPcHRpb247XHJcbiAgICB9KVxyXG4gICAgLmZpbHRlcigoZW50cnkpOiBlbnRyeSBpcyBFeHBlbnNlU2VsZWN0T3B0aW9uID0+IGVudHJ5ICE9PSBudWxsKTtcclxufTtcclxuXHJcbi8vIFNoYXJlZCBjdXJyZW5jeSBjb21ib2JveCBiYWNrZWQgYnkgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9jdXJyZW5jaWVzLlxyXG5jb25zdCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QgPSAoe1xyXG4gIGxhYmVsLFxyXG4gIHBsYWNlaG9sZGVyLFxyXG4gIHZhbHVlLFxyXG4gIG9uQ2hhbmdlLFxyXG4gIGludmFsaWQgPSBmYWxzZSxcclxuICBpbnB1dFJlZixcclxuICByZWFkT25seSA9IGZhbHNlLFxyXG4gIGRpc2FibGVkID0gZmFsc2UsXHJcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcclxuICBpZEJhc2UgPSBcImV4cGVuc2UtY3VycmVuY3lcIixcclxuICBwcmVmZXJEZWZhdWx0Q3VycmVuY3lGcm9tQ29udGV4dCA9IGZhbHNlLFxyXG4gIGRyb3Bkb3duRXhwYW5kUHggPSAwLFxyXG4gIGRyb3Bkb3duTWluV2lkdGhQeCA9IDMyMCxcclxuICBzaG93TG9hZGluZ1N0YXRlVGV4dCA9IHRydWUsXHJcbn06IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdFByb3BzKSA9PiB7XHJcbiAgY29uc3QgbG9jYWxlID0gdXNlTWVtbygoKSA9PiByZWFkUHJlZmVycmVkTG9jYWxlKCksIFtdKTtcclxuICBjb25zdCBbb3B0aW9ucywgc2V0T3B0aW9uc10gPSB1c2VTdGF0ZTxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KFtdKTtcclxuICBjb25zdCBbaXNMb2FkaW5nT3B0aW9ucywgc2V0SXNMb2FkaW5nT3B0aW9uc10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2xvYWRFcnJvck1lc3NhZ2UsIHNldExvYWRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2VtcHR5TWVzc2FnZSwgc2V0RW1wdHlNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IG9uQ2hhbmdlUmVmID0gdXNlUmVmKG9uQ2hhbmdlKTtcclxuICBjb25zdCB2YWx1ZVJlZiA9IHVzZVJlZihub3JtYWxpemVDdXJyZW5jeUNvZGUodmFsdWUpKTtcclxuICBjb25zdCBpbml0aWFsRGVmYXVsdEFwcGxpZWRSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgb25DaGFuZ2VSZWYuY3VycmVudCA9IG9uQ2hhbmdlO1xyXG4gIH0sIFtvbkNoYW5nZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgdmFsdWVSZWYuY3VycmVudCA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSh2YWx1ZSk7XHJcbiAgfSwgW3ZhbHVlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBsZXQgaXNDYW5jZWxsZWQgPSBmYWxzZTtcclxuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XHJcblxyXG4gICAgY29uc3QgbG9hZEN1cnJlbmNpZXMgPSBhc3luYyAoKSA9PiB7XHJcbiAgICAgIHNldElzTG9hZGluZ09wdGlvbnModHJ1ZSk7XHJcbiAgICAgIHNldExvYWRFcnJvck1lc3NhZ2UoXCJcIik7XHJcbiAgICAgIHNldEVtcHR5TWVzc2FnZShcIlwiKTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBnZXRFeHBlbnNlU2hlZXRDdXJyZW5jaWVzKHtcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgICAgc2V0T3B0aW9ucyhbXSk7XHJcbiAgICAgICAgICBzZXRMb2FkRXJyb3JNZXNzYWdlKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldHMuXCIpKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1hcHBlZE9wdGlvbnMgPSBtYXBDdXJyZW5jeU9wdGlvbnMocmVzcG9uc2UuSXRlbXMsIGxvY2FsZSk7XHJcbiAgICAgICAgc2V0T3B0aW9ucyhtYXBwZWRPcHRpb25zKTtcclxuXHJcbiAgICAgICAgaWYgKCFtYXBwZWRPcHRpb25zLmxlbmd0aCkge1xyXG4gICAgICAgICAgc2V0RW1wdHlNZXNzYWdlKHJlc3BvbnNlLk1lc3NhZ2UgfHwgaW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHZhbHVlUmVmLmN1cnJlbnQ7XHJcbiAgICAgICAgY29uc3QgaGFzQ3VycmVudEluTGlzdCA9IG1hcHBlZE9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiBub3JtYWxpemVDdXJyZW5jeUNvZGUob3B0aW9uLnZhbHVlKSA9PT0gY3VycmVudFZhbHVlKTtcclxuICAgICAgICBpZiAoY3VycmVudFZhbHVlICYmIGhhc0N1cnJlbnRJbkxpc3QpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghY3VycmVudFZhbHVlICYmIHByZWZlckRlZmF1bHRDdXJyZW5jeUZyb21Db250ZXh0ICYmICFpbml0aWFsRGVmYXVsdEFwcGxpZWRSZWYuY3VycmVudCkge1xyXG4gICAgICAgICAgY29uc3QgZGVmYXVsdEN1cnJlbmN5Q29kZSA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShcclxuICAgICAgICAgICAgYXdhaXQgZ2V0RXhwZW5zZVNoZWV0RGVmYXVsdEN1cnJlbmN5Q29kZSh7XHJcbiAgICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgaWYgKGlzQ2FuY2VsbGVkKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgaWYgKGRlZmF1bHRDdXJyZW5jeUNvZGUgJiYgbWFwcGVkT3B0aW9ucy5zb21lKChvcHRpb24pID0+IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShvcHRpb24udmFsdWUpID09PSBkZWZhdWx0Q3VycmVuY3lDb2RlKSkge1xyXG4gICAgICAgICAgICBpbml0aWFsRGVmYXVsdEFwcGxpZWRSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQoZGVmYXVsdEN1cnJlbmN5Q29kZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSBcIkFib3J0RXJyb3JcIikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBmYWxsYmFja0Vycm9yID0gaW5kVChcIkV4cGVuc2VTaGVldHNfTG9hZEVycm9yXCIsIFwiQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldHMuXCIpO1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgPyBlcnJvci5tZXNzYWdlIHx8IGZhbGxiYWNrRXJyb3IgOiBmYWxsYmFja0Vycm9yO1xyXG4gICAgICAgIHNldE9wdGlvbnMoW10pO1xyXG4gICAgICAgIHNldExvYWRFcnJvck1lc3NhZ2UobWVzc2FnZSk7XHJcbiAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgaWYgKCFpc0NhbmNlbGxlZCkge1xyXG4gICAgICAgICAgc2V0SXNMb2FkaW5nT3B0aW9ucyhmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHZvaWQgbG9hZEN1cnJlbmNpZXMoKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBpc0NhbmNlbGxlZCA9IHRydWU7XHJcbiAgICAgIGNvbnRyb2xsZXIuYWJvcnQoKTtcclxuICAgIH07XHJcbiAgfSwgW2xvY2FsZSwgcHJlZmVyRGVmYXVsdEN1cnJlbmN5RnJvbUNvbnRleHRdKTtcclxuXHJcbiAgY29uc3Qgbm9ybWFsaXplZFZhbHVlID0gdXNlTWVtbygoKSA9PiBub3JtYWxpemVDdXJyZW5jeUNvZGUodmFsdWUpLCBbdmFsdWVdKTtcclxuICBjb25zdCBkaXNhYmxlQmVjYXVzZU5vRGF0YSA9ICFpc0xvYWRpbmdPcHRpb25zICYmICFsb2FkRXJyb3JNZXNzYWdlICYmIG9wdGlvbnMubGVuZ3RoID09PSAwO1xyXG4gIGNvbnN0IGVmZmVjdGl2ZURpc2FibGVkID0gZGlzYWJsZWQgfHwgZGlzYWJsZUJlY2F1c2VOb0RhdGE7XHJcbiAgY29uc3QgbG9hZGluZ01lc3NhZ2UgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxyXG4gICAgICA8U2VsZWN0Q29tYm9ib3hcclxuICAgICAgICBsYWJlbD17bGFiZWx9XHJcbiAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG4gICAgICAgIG9wdGlvbnM9e29wdGlvbnN9XHJcbiAgICAgICAgdmFsdWU9e25vcm1hbGl6ZWRWYWx1ZX1cclxuICAgICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4gb25DaGFuZ2Uobm9ybWFsaXplQ3VycmVuY3lDb2RlKG5leHRWYWx1ZSkpfVxyXG4gICAgICAgIGlucHV0UmVmPXtpbnB1dFJlZn1cclxuICAgICAgICBpbnZhbGlkPXtpbnZhbGlkfVxyXG4gICAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cclxuICAgICAgICBkaXNhYmxlZD17ZWZmZWN0aXZlRGlzYWJsZWR9XHJcbiAgICAgICAgYWxsb3dUZXh0SW5wdXRcclxuICAgICAgICBzaG93U2VhcmNoQnV0dG9uPXtmYWxzZX1cclxuICAgICAgICBzaG93TGFiZWw9e3Nob3dMYWJlbH1cclxuICAgICAgICB1c2VQb3J0YWxcclxuICAgICAgICBzZWxlY3RlZFRleHRNb2RlPVwidmFsdWVcIlxyXG4gICAgICAgIGRyb3Bkb3duRXhwYW5kUHg9e2Ryb3Bkb3duRXhwYW5kUHh9XHJcbiAgICAgICAgZHJvcGRvd25NaW5XaWR0aFB4PXtkcm9wZG93bk1pbldpZHRoUHh9XHJcbiAgICAgICAgZHJvcGRvd25NYXhIZWlnaHRDbGFzcz1cIm1heC1oLTk2XCJcclxuICAgICAgICBzZWxlY3RlZEljb25DbGFzc05hbWU9e0NVUlJFTkNZX0ZMQUdfU0laRV9DTEFTU31cclxuICAgICAgICBzZWxlY3RlZElucHV0UGFkZGluZ0NsYXNzTmFtZT1cInBsLTEyXCJcclxuICAgICAgICBjbGVhck9uRW1wdHlJbnB1dFxyXG4gICAgICAgIG9wdGlvbkljb25DbGFzc05hbWU9e0NVUlJFTkNZX0ZMQUdfU0laRV9DTEFTU31cclxuICAgICAgICBhbGxvd09wdGlvbkhvcml6b250YWxTY3JvbGxcclxuICAgICAgICBsb2NrRHJvcGRvd25XaWR0aE9uRmlyc3RPcGVuXHJcbiAgICAgICAgZGlzYWJsZURlZmF1bHRPcHRpb25QYWRkaW5nXHJcbiAgICAgICAgb3B0aW9uTGVmdFBhZGRpbmdDbGFzc05hbWU9XCJwbC0xXCJcclxuICAgICAgICBvcHRpb25EZWZhdWx0Q2xhc3NOYW1lPXtDVVJSRU5DWV9PUFRJT05fREVGQVVMVF9DTEFTU31cclxuICAgICAgICBvcHRpb25BY3RpdmVDbGFzc05hbWU9e0NVUlJFTkNZX09QVElPTl9BQ1RJVkVfQ0xBU1N9XHJcbiAgICAgICAgb3B0aW9uU2VsZWN0ZWRDbGFzc05hbWU9e0NVUlJFTkNZX09QVElPTl9TRUxFQ1RFRF9DTEFTU31cclxuICAgICAgICBpZEJhc2U9e2lkQmFzZX1cclxuICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgIHBhbmVsQ2xhc3NOYW1lPXtDVVJSRU5DWV9EUk9QRE9XTl9QQU5FTF9DTEFTU31cclxuICAgICAgICBwYW5lbFN0eWxlPXtDVVJSRU5DWV9EUk9QRE9XTl9QQU5FTF9TVFlMRX1cclxuICAgICAgLz5cclxuICAgICAge3Nob3dMb2FkaW5nU3RhdGVUZXh0ICYmIGlzTG9hZGluZ09wdGlvbnMgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwXCI+e2xvYWRpbmdNZXNzYWdlfTwvcD4gOiBudWxsfVxyXG4gICAgICB7IWlzTG9hZGluZ09wdGlvbnMgJiYgbG9hZEVycm9yTWVzc2FnZSA/IDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1kYW5nZXJcIj57bG9hZEVycm9yTWVzc2FnZX08L3A+IDogbnVsbH1cclxuICAgICAgeyFpc0xvYWRpbmdPcHRpb25zICYmICFsb2FkRXJyb3JNZXNzYWdlICYmIGVtcHR5TWVzc2FnZSA/IDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS01MDBcIj57ZW1wdHlNZXNzYWdlfTwvcD4gOiBudWxsfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdDtcclxuXHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxyXG50eXBlIEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uUHJvcHMgPSB7XHJcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIHNpemVDbGFzc05hbWU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVDdXJyZW5jeUNvZGUgPSAodmFsdWU6IHN0cmluZyB8IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIGEgY3VycmVuY3kgZmxhZyBmcm9tIGxvY2FsIGFzc2V0cyB3aXRoIGEgc3RhYmxlIGZhbGxiYWNrIGljb24uXHJcbmNvbnN0IEV4cGVuc2VDdXJyZW5jeUZsYWdJY29uID0gKHsgY3VycmVuY3lDb2RlLCBjbGFzc05hbWUgPSBcIlwiLCBzaXplQ2xhc3NOYW1lID0gXCJoLTQgdy00XCIgfTogRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb25Qcm9wcykgPT4ge1xuICBjb25zdCBub3JtYWxpemVkQ29kZSA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShjdXJyZW5jeUNvZGUpO1xuICBjb25zdCBbZmFpbGVkQ29kZSwgc2V0RmFpbGVkQ29kZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgbG9hZEZhaWxlZCA9ICEhbm9ybWFsaXplZENvZGUgJiYgZmFpbGVkQ29kZSA9PT0gbm9ybWFsaXplZENvZGU7XG5cclxuICBpZiAoIW5vcm1hbGl6ZWRDb2RlIHx8IGxvYWRGYWlsZWQpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxzcGFuXHJcbiAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgICAgICBjbGFzc05hbWU9e2BpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gdGV4dC1bMTBweF0gZm9udC1zZW1pYm9sZCBsZWFkaW5nLW5vbmUgdGV4dC1zbGF0ZS01MDAgJHtzaXplQ2xhc3NOYW1lfSAke2NsYXNzTmFtZX1gLnRyaW0oKX1cbiAgICAgID5cclxuICAgICAgICAkXHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGltZ1xyXG4gICAgICBzcmM9e2AvYXNzZXRzL2ZsYWdzLyR7ZW5jb2RlVVJJQ29tcG9uZW50KG5vcm1hbGl6ZWRDb2RlKX0uc3ZnYH1cclxuICAgICAgYWx0PVwiXCJcbiAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICBsb2FkaW5nPVwibGF6eVwiXG4gICAgICBjbGFzc05hbWU9e2Ake3NpemVDbGFzc05hbWV9IHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIG9iamVjdC1jb250YWluICR7Y2xhc3NOYW1lfWAudHJpbSgpfVxuICAgICAgb25FcnJvcj17KCkgPT4gc2V0RmFpbGVkQ29kZShub3JtYWxpemVkQ29kZSl9XG4gICAgLz5cbiAgKTtcbn07XG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUN1cnJlbmN5RmxhZ0ljb247XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4RVU7QUF6Q1YsSUFBTSxzQkFBc0Is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
