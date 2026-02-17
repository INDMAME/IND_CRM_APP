import {
  getExpenseSheetCurrencies,
  getExpenseSheetDefaultCurrencyCode,
  normalizeCardTitleText
} from "./chunk-3FT3FNFJ.js";
import {
  SelectCombobox_default
} from "./chunk-I765HG2F.js";
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

// Web/wwwroot/react/src/pages/gastos/components/ExpenseCurrencyFilterSelect.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var normalizeCurrencyCode = (value) => {
  return String(value || "").trim().toUpperCase();
};
var mapCurrencyOptions = (items) => {
  const source = Array.isArray(items) ? items : [];
  const seenCodes = /* @__PURE__ */ new Set();
  return source.map((entry) => {
    const currencyCodeIso = normalizeCurrencyCode(entry?.CurrencyCodeISO);
    const effectiveIsoCode = currencyCodeIso || normalizeCurrencyCode(entry?.CurrencyCode);
    if (!effectiveIsoCode) return null;
    if (seenCodes.has(effectiveIsoCode)) return null;
    seenCodes.add(effectiveIsoCode);
    return {
      value: effectiveIsoCode,
      text: effectiveIsoCode
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
  const [options, setOptions] = (0, import_react.useState)([]);
  const [isLoadingOptions, setIsLoadingOptions] = (0, import_react.useState)(false);
  const [loadErrorMessage, setLoadErrorMessage] = (0, import_react.useState)("");
  const [emptyMessage, setEmptyMessage] = (0, import_react.useState)("");
  const onChangeRef = (0, import_react.useRef)(onChange);
  const valueRef = (0, import_react.useRef)(normalizeCurrencyCode(value));
  const initialDefaultAppliedRef = (0, import_react.useRef)(false);
  (0, import_react.useEffect)(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  (0, import_react.useEffect)(() => {
    valueRef.current = normalizeCurrencyCode(value);
  }, [value]);
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
        const mappedOptions = mapCurrencyOptions(response.Items);
        setOptions(mappedOptions);
        if (!mappedOptions.length) {
          setEmptyMessage(response.Message || indT("Common_NoData", "No data"));
          return;
        }
        const currentValue = valueRef.current;
        const hasCurrentInList = mappedOptions.some((option) => normalizeCurrencyCode(option.value) === currentValue);
        if (currentValue && hasCurrentInList) {
          return;
        }
        if (!currentValue && preferDefaultCurrencyFromContext && !initialDefaultAppliedRef.current) {
          const defaultCurrencyCode = normalizeCurrencyCode(
            await getExpenseSheetDefaultCurrencyCode({
              suppressPermissionModal: true,
              signal: controller.signal
            })
          );
          if (isCancelled) return;
          if (defaultCurrencyCode && mappedOptions.some((option) => normalizeCurrencyCode(option.value) === defaultCurrencyCode)) {
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
  }, [preferDefaultCurrencyFromContext]);
  const normalizedValue = (0, import_react.useMemo)(() => normalizeCurrencyCode(value), [value]);
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
        onChange: (nextValue) => onChange(normalizeCurrencyCode(nextValue)),
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
    isLoadingOptions ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-xs text-slate-500", children: loadingMessage }) : null,
    !isLoadingOptions && loadErrorMessage ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-xs text-danger", children: loadErrorMessage }) : null,
    !isLoadingOptions && !loadErrorMessage && emptyMessage ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-xs text-slate-500", children: emptyMessage }) : null
  ] });
};
var ExpenseCurrencyFilterSelect_default = ExpenseCurrencyFilterSelect;

export {
  ExpenseCurrencyFilterSelect_default,
  ExpenseTimelineCard_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VUaW1lbGluZUNhcmQudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VEYXRlUGFydHMgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IG5vcm1hbGl6ZUNhcmRUaXRsZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcblxudHlwZSBFeHBlbnNlVGltZWxpbmVDYXJkUHJvcHMgPSB7XG4gIGRhdGVQYXJ0czogRXhwZW5zZURhdGVQYXJ0cztcbiAgdGl0bGU6IHN0cmluZztcbiAgYW1vdW50VGV4dDogc3RyaW5nO1xuICBvbk9wZW46ICgpID0+IHZvaWQ7XG4gIHRpdGxlQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBhbW91bnRDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHN0YXR1c0NsYXNzTmFtZT86IHN0cmluZztcbiAgc3RhdHVzTGFiZWw/OiBzdHJpbmc7XG59O1xuXG4vLyBSZXVzYWJsZSBjbGlja2FibGUgdGltZWxpbmUgY2FyZCBmb3IgZXhwZW5zZSBzaGVldHMgYW5kIGV4cGVuc2UgbGluZXMuXG5jb25zdCBFeHBlbnNlVGltZWxpbmVDYXJkID0gKHtcbiAgZGF0ZVBhcnRzLFxuICB0aXRsZSxcbiAgYW1vdW50VGV4dCxcbiAgb25PcGVuLFxuICB0aXRsZUNsYXNzTmFtZSA9IFwidGltZWxpbmUtbmFtZVwiLFxuICBhbW91bnRDbGFzc05hbWUgPSBcImV4cGVuc2Utc2hlZXQtY2FyZF9fYW1vdW50XCIsXG4gIHN0YXR1c0NsYXNzTmFtZSxcbiAgc3RhdHVzTGFiZWwsXG59OiBFeHBlbnNlVGltZWxpbmVDYXJkUHJvcHMpID0+IHtcbiAgY29uc3Qgc2FmZVRpdGxlID0gbm9ybWFsaXplQ2FyZFRpdGxlVGV4dCh0aXRsZSwgXCItXCIpO1xuICBjb25zdCBzYWZlQW1vdW50ID0gYW1vdW50VGV4dCB8fCBcIi1cIjtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT1cInRpbWVsaW5lLWNhcmQgdGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCJcbiAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICBvbkNsaWNrPXtvbk9wZW59XG4gICAgICBvbktleURvd249eyhldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIgfHwgZXZlbnQua2V5ID09PSBcIiBcIikge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgb25PcGVuKCk7XG4gICAgICAgIH1cbiAgICAgIH19XG4gICAgPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1kYXRlLXBhbmVsIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xIHB4LTMgcHktMyBiZy1zbGF0ZS01MCBib3JkZXItciBib3JkZXItc2xhdGUtMjAwIHRleHQtc2xhdGUtNjAwXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHRyYWNraW5nLVswLjJlbV0gdGV4dC1zbGF0ZS01MDBcIj57ZGF0ZVBhcnRzLnllYXJ9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHVwcGVyY2FzZSB0cmFja2luZy1bMC4yZW1dIHRleHQtc2xhdGUtNTAwXCI+e2RhdGVQYXJ0cy5tb250aH08L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LXNlbWlib2xkIHRleHQtcHJpbWFyeVwiPntkYXRlUGFydHMuZGF5fTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWNhcmRfX2NvbnRlbnQgZmxleC0xIHB5LTMgcHgtNFwiPlxuICAgICAgICB7c3RhdHVzQ2xhc3NOYW1lID8gPHNwYW4gY2xhc3NOYW1lPXtzdGF0dXNDbGFzc05hbWV9IHRpdGxlPXtzdGF0dXNMYWJlbH0gYXJpYS1sYWJlbD17c3RhdHVzTGFiZWx9IC8+IDogbnVsbH1cbiAgICAgICAgPHAgY2xhc3NOYW1lPXt0aXRsZUNsYXNzTmFtZX0gZGF0YS1mdWxsdGV4dD17c2FmZVRpdGxlfT5cbiAgICAgICAgICB7c2FmZVRpdGxlfVxuICAgICAgICA8L3A+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YW1vdW50Q2xhc3NOYW1lfSBkYXRhLWZ1bGx0ZXh0PXtzYWZlQW1vdW50fT5cbiAgICAgICAgICB7c2FmZUFtb3VudH1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGltZWxpbmVDYXJkO1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBTZWxlY3RDb21ib2JveCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NlbGVjdENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8gfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlU2hlZXRDdXJyZW5jaWVzLCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xuXG50eXBlIEV4cGVuc2VDdXJyZW5jeUZpbHRlclNlbGVjdFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBzaG93TGFiZWw/OiBib29sZWFuO1xuICBpZEJhc2U/OiBzdHJpbmc7XG4gIHByZWZlckRlZmF1bHRDdXJyZW5jeUZyb21Db250ZXh0PzogYm9vbGVhbjtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSA9ICh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XG59O1xuXG5jb25zdCBtYXBDdXJyZW5jeU9wdGlvbnMgPSAoaXRlbXM6IEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvW10gfCB1bmRlZmluZWQpOiBFeHBlbnNlU2VsZWN0T3B0aW9uW10gPT4ge1xuICBjb25zdCBzb3VyY2UgPSBBcnJheS5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zIDogW107XG4gIGNvbnN0IHNlZW5Db2RlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gIHJldHVybiBzb3VyY2VcbiAgICAubWFwKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgY3VycmVuY3lDb2RlSXNvID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKGVudHJ5Py5DdXJyZW5jeUNvZGVJU08pO1xuICAgICAgY29uc3QgZWZmZWN0aXZlSXNvQ29kZSA9IGN1cnJlbmN5Q29kZUlzbyB8fCBub3JtYWxpemVDdXJyZW5jeUNvZGUoZW50cnk/LkN1cnJlbmN5Q29kZSk7XG4gICAgICBpZiAoIWVmZmVjdGl2ZUlzb0NvZGUpIHJldHVybiBudWxsO1xuICAgICAgaWYgKHNlZW5Db2Rlcy5oYXMoZWZmZWN0aXZlSXNvQ29kZSkpIHJldHVybiBudWxsO1xuICAgICAgc2VlbkNvZGVzLmFkZChlZmZlY3RpdmVJc29Db2RlKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IGVmZmVjdGl2ZUlzb0NvZGUsXG4gICAgICAgIHRleHQ6IGVmZmVjdGl2ZUlzb0NvZGUsXG4gICAgICB9IGFzIEV4cGVuc2VTZWxlY3RPcHRpb247XG4gICAgfSlcbiAgICAuZmlsdGVyKChlbnRyeSk6IGVudHJ5IGlzIEV4cGVuc2VTZWxlY3RPcHRpb24gPT4gZW50cnkgIT09IG51bGwpO1xufTtcblxuLy8gU2hhcmVkIGN1cnJlbmN5IGNvbWJvYm94IGJhY2tlZCBieSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2N1cnJlbmNpZXMuXG5jb25zdCBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3QgPSAoe1xuICBsYWJlbCxcbiAgcGxhY2Vob2xkZXIsXG4gIHZhbHVlLFxuICBvbkNoYW5nZSxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcbiAgaWRCYXNlID0gXCJleHBlbnNlLWN1cnJlbmN5XCIsXG4gIHByZWZlckRlZmF1bHRDdXJyZW5jeUZyb21Db250ZXh0ID0gZmFsc2UsXG59OiBFeHBlbnNlQ3VycmVuY3lGaWx0ZXJTZWxlY3RQcm9wcykgPT4ge1xuICBjb25zdCBbb3B0aW9ucywgc2V0T3B0aW9uc10gPSB1c2VTdGF0ZTxFeHBlbnNlU2VsZWN0T3B0aW9uW10+KFtdKTtcbiAgY29uc3QgW2lzTG9hZGluZ09wdGlvbnMsIHNldElzTG9hZGluZ09wdGlvbnNdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbG9hZEVycm9yTWVzc2FnZSwgc2V0TG9hZEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2VtcHR5TWVzc2FnZSwgc2V0RW1wdHlNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBvbkNoYW5nZVJlZiA9IHVzZVJlZihvbkNoYW5nZSk7XG4gIGNvbnN0IHZhbHVlUmVmID0gdXNlUmVmKG5vcm1hbGl6ZUN1cnJlbmN5Q29kZSh2YWx1ZSkpO1xuICBjb25zdCBpbml0aWFsRGVmYXVsdEFwcGxpZWRSZWYgPSB1c2VSZWYoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgb25DaGFuZ2VSZWYuY3VycmVudCA9IG9uQ2hhbmdlO1xuICB9LCBbb25DaGFuZ2VdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHZhbHVlUmVmLmN1cnJlbnQgPSBub3JtYWxpemVDdXJyZW5jeUNvZGUodmFsdWUpO1xuICB9LCBbdmFsdWVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBpc0NhbmNlbGxlZCA9IGZhbHNlO1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG5cbiAgICBjb25zdCBsb2FkQ3VycmVuY2llcyA9IGFzeW5jICgpID0+IHtcbiAgICAgIHNldElzTG9hZGluZ09wdGlvbnModHJ1ZSk7XG4gICAgICBzZXRMb2FkRXJyb3JNZXNzYWdlKFwiXCIpO1xuICAgICAgc2V0RW1wdHlNZXNzYWdlKFwiXCIpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGdldEV4cGVuc2VTaGVldEN1cnJlbmNpZXMoe1xuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpc0NhbmNlbGxlZCkgcmV0dXJuO1xuXG4gICAgICAgIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xuICAgICAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgICAgIHNldExvYWRFcnJvck1lc3NhZ2UocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19Mb2FkRXJyb3JcIiwgXCJDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0cy5cIikpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1hcHBlZE9wdGlvbnMgPSBtYXBDdXJyZW5jeU9wdGlvbnMocmVzcG9uc2UuSXRlbXMpO1xuICAgICAgICBzZXRPcHRpb25zKG1hcHBlZE9wdGlvbnMpO1xuXG4gICAgICAgIGlmICghbWFwcGVkT3B0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICBzZXRFbXB0eU1lc3NhZ2UocmVzcG9uc2UuTWVzc2FnZSB8fCBpbmRUKFwiQ29tbW9uX05vRGF0YVwiLCBcIk5vIGRhdGFcIikpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IHZhbHVlUmVmLmN1cnJlbnQ7XG4gICAgICAgIGNvbnN0IGhhc0N1cnJlbnRJbkxpc3QgPSBtYXBwZWRPcHRpb25zLnNvbWUoKG9wdGlvbikgPT4gbm9ybWFsaXplQ3VycmVuY3lDb2RlKG9wdGlvbi52YWx1ZSkgPT09IGN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgJiYgaGFzQ3VycmVudEluTGlzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY3VycmVudFZhbHVlICYmIHByZWZlckRlZmF1bHRDdXJyZW5jeUZyb21Db250ZXh0ICYmICFpbml0aWFsRGVmYXVsdEFwcGxpZWRSZWYuY3VycmVudCkge1xuICAgICAgICAgIGNvbnN0IGRlZmF1bHRDdXJyZW5jeUNvZGUgPSBub3JtYWxpemVDdXJyZW5jeUNvZGUoXG4gICAgICAgICAgICBhd2FpdCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlKHtcbiAgICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgICAgIHNpZ25hbDogY29udHJvbGxlci5zaWduYWwsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcblxuICAgICAgICAgIGlmIChkZWZhdWx0Q3VycmVuY3lDb2RlICYmIG1hcHBlZE9wdGlvbnMuc29tZSgob3B0aW9uKSA9PiBub3JtYWxpemVDdXJyZW5jeUNvZGUob3B0aW9uLnZhbHVlKSA9PT0gZGVmYXVsdEN1cnJlbmN5Q29kZSkpIHtcbiAgICAgICAgICAgIGluaXRpYWxEZWZhdWx0QXBwbGllZFJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIG9uQ2hhbmdlUmVmLmN1cnJlbnQoZGVmYXVsdEN1cnJlbmN5Q29kZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoaXNDYW5jZWxsZWQpIHJldHVybjtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIGVycm9yLm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgZmFsbGJhY2tFcnJvciA9IGluZFQoXCJFeHBlbnNlU2hlZXRzX0xvYWRFcnJvclwiLCBcIkNvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXRzLlwiKTtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciA/IGVycm9yLm1lc3NhZ2UgfHwgZmFsbGJhY2tFcnJvciA6IGZhbGxiYWNrRXJyb3I7XG4gICAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgICBzZXRMb2FkRXJyb3JNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKCFpc0NhbmNlbGxlZCkge1xuICAgICAgICAgIHNldElzTG9hZGluZ09wdGlvbnMoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZvaWQgbG9hZEN1cnJlbmNpZXMoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpc0NhbmNlbGxlZCA9IHRydWU7XG4gICAgICBjb250cm9sbGVyLmFib3J0KCk7XG4gICAgfTtcbiAgfSwgW3ByZWZlckRlZmF1bHRDdXJyZW5jeUZyb21Db250ZXh0XSk7XG5cbiAgY29uc3Qgbm9ybWFsaXplZFZhbHVlID0gdXNlTWVtbygoKSA9PiBub3JtYWxpemVDdXJyZW5jeUNvZGUodmFsdWUpLCBbdmFsdWVdKTtcbiAgY29uc3QgZGlzYWJsZUJlY2F1c2VOb0RhdGEgPSAhaXNMb2FkaW5nT3B0aW9ucyAmJiAhbG9hZEVycm9yTWVzc2FnZSAmJiBvcHRpb25zLmxlbmd0aCA9PT0gMDtcbiAgY29uc3QgZWZmZWN0aXZlRGlzYWJsZWQgPSBkaXNhYmxlZCB8fCBkaXNhYmxlQmVjYXVzZU5vRGF0YTtcbiAgY29uc3QgbG9hZGluZ01lc3NhZ2UgPSBpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxuICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICBvcHRpb25zPXtvcHRpb25zfVxuICAgICAgICB2YWx1ZT17bm9ybWFsaXplZFZhbHVlfVxuICAgICAgICBvbkNoYW5nZT17KG5leHRWYWx1ZSkgPT4gb25DaGFuZ2Uobm9ybWFsaXplQ3VycmVuY3lDb2RlKG5leHRWYWx1ZSkpfVxuICAgICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICAgIGRpc2FibGVkPXtlZmZlY3RpdmVEaXNhYmxlZH1cbiAgICAgICAgYWxsb3dUZXh0SW5wdXRcbiAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbj17ZmFsc2V9XG4gICAgICAgIHNob3dMYWJlbD17c2hvd0xhYmVsfVxuICAgICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxuICAgICAgICBpZEJhc2U9e2lkQmFzZX1cbiAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgICAgLz5cbiAgICAgIHtpc0xvYWRpbmdPcHRpb25zID8gPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMFwiPntsb2FkaW5nTWVzc2FnZX08L3A+IDogbnVsbH1cbiAgICAgIHshaXNMb2FkaW5nT3B0aW9ucyAmJiBsb2FkRXJyb3JNZXNzYWdlID8gPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWRhbmdlclwiPntsb2FkRXJyb3JNZXNzYWdlfTwvcD4gOiBudWxsfVxuICAgICAgeyFpc0xvYWRpbmdPcHRpb25zICYmICFsb2FkRXJyb3JNZXNzYWdlICYmIGVtcHR5TWVzc2FnZSA/IDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS01MDBcIj57ZW1wdHlNZXNzYWdlfTwvcD4gOiBudWxsfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZUN1cnJlbmN5RmlsdGVyU2VsZWN0O1xuXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTBDTTtBQTFCTixJQUFNLHNCQUFzQixDQUFDO0FBQUEsRUFDM0I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLGlCQUFpQjtBQUFBLEVBQ2pCLGtCQUFrQjtBQUFBLEVBQ2xCO0FBQUEsRUFDQTtBQUNGLE1BQWdDO0FBQzlCLFFBQU0sWUFBWSx1QkFBdUIsT0FB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SSxpQkFBaUIsZ0JBQWdCLE1BQU0sU0FBUyxhQUFjO0FBRWxFLGNBQU0sZ0JBQWdCLEtBQUssMkJBQTJCLGdDQUFnQztBQUN0RixjQUFNLFVBQVUsaUJBQWlCLGdCQUFnQixNQUFNLFdBQVcsZ0JBQWdCO0FBQ2xGLG1CQUFXLENBQUMsQ0FBQztBQUNiLDRCQUFvQixPQUFPO0FBQUEsTUFDN0IsVUFBRTtBQUNBLFlBQUksQ0FBQyxhQUFhO0FBQ2hCLDhCQUFvQixLQUFLO0FBQUEsUUFDM0I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUVBLFNBQUssZUFBZTtBQUVwQixXQUFPLE1BQU07QUFDWCxvQkFBYztBQUNkLGlCQUFXLE1BQU07QUFBQSxJQUNuQjtBQUFBLEVBQ0YsR0FBRyxDQUFDLGdDQUFnQyxDQUFDO0FBRXJDLFFBQU0sc0JBQWtCLHNCQUFRLE1BQU0sc0JBQXNCLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQztBQUMzRSxRQUFNLHVCQUF1QixDQUFDLG9CQUFvQixDQUFDLG9CQUFvQixRQUFRLFdBQVc7QUFDMUYsUUFBTSxvQkFBb0IsWUFBWTtBQUN0QyxRQUFNLGlCQUFpQixLQUFLLGtCQUFrQixTQUFTO0FBRXZELFNBQ0UsOENBQUMsU0FBSSxXQUFVLGVBQ2I7QUFBQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0M7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsT0FBTztBQUFBLFFBQ1AsVUFBVSxDQUFDLGNBQWMsU0FBUyxzQkFBc0IsU0FBUyxDQUFDO0FBQUEsUUFDbEU7QUFBQSxRQUNBLFVBQVU7QUFBQSxRQUNWLGdCQUFjO0FBQUEsUUFDZCxrQkFBa0I7QUFBQSxRQUNsQjtBQUFBLFFBQ0EsV0FBVztBQUFBLFFBQ1g7QUFBQSxRQUNBLGlCQUFnQjtBQUFBLFFBQ2hCLGdCQUFlO0FBQUE7QUFBQSxJQUNqQjtBQUFBLElBQ0MsbUJBQW1CLDZDQUFDLE9BQUUsV0FBVSwwQkFBMEIsMEJBQWUsSUFBTztBQUFBLElBQ2hGLENBQUMsb0JBQW9CLG1CQUFtQiw2Q0FBQyxPQUFFLFdBQVUsdUJBQXVCLDRCQUFpQixJQUFPO0FBQUEsSUFDcEcsQ0FBQyxvQkFBb0IsQ0FBQyxvQkFBb0IsZUFBZSw2Q0FBQyxPQUFFLFdBQVUsMEJBQTBCLHdCQUFhLElBQU87QUFBQSxLQUN2SDtBQUVKO0FBRUEsSUFBTyxzQ0FBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
