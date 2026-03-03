import React, { useEffect, useMemo, useRef, useState } from "react";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import { ApiFetchError } from "../../../services/apiService.ts";
import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseSheetCurrencyDto } from "../expenseTypes.ts";
import { getExpenseSheetCurrencies, getExpenseSheetDefaultCurrencyCode } from "../utils/expenseApi.ts";
import type { ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";
import ExpenseCurrencyFlagIcon from "./ExpenseCurrencyFlagIcon.tsx";

type ExpenseCurrencyFilterSelectProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  disabled?: boolean;
  showLabel?: boolean;
  idBase?: string;
  preferDefaultCurrencyFromContext?: boolean;
  dropdownExpandPx?: number;
  dropdownMinWidthPx?: number;
};

const normalizeCurrencyCode = (value: string | number | null | undefined): string => {
  return String(value || "").trim().toUpperCase();
};

const CURRENCY_FLAG_SIZE_CLASS = "h-6 w-6";
const CURRENCY_DROPDOWN_PANEL_CLASS = "visitas-typography ring-[#A9B8CC]/70";
const CURRENCY_DROPDOWN_PANEL_STYLE: React.CSSProperties = {
  backgroundColor: "#DCE3ED",
  border: "1px solid #A9B8CC",
  boxShadow: "0 10px 24px rgba(15, 41, 69, 0.14)",
};
const CURRENCY_OPTION_DEFAULT_CLASS = "text-[#0F2945]";
const CURRENCY_OPTION_ACTIVE_CLASS = "bg-[#C6D2E3] text-[#0F2945]";
const CURRENCY_OPTION_SELECTED_CLASS = "bg-primary text-white";

const readPreferredLocale = (): string => {
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

// Resolves a localized currency display name when Intl.DisplayNames is available.
const resolveCurrencyDisplayName = (currencyCode: string, locale: string): string => {
  const normalizedCode = normalizeCurrencyCode(currencyCode);
  if (!normalizedCode) return "";

  const intlWithDisplayNames = Intl as typeof Intl & {
    DisplayNames?: new (
      locales?: string | string[],
      options?: { type: "currency" }
    ) => { of: (value: string) => string | undefined };
  };

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

const mapCurrencyOptions = (items: ExpenseSheetCurrencyDto[] | undefined, locale: string): ExpenseSelectOption[] => {
  const source = Array.isArray(items) ? items : [];
  const seenCodes = new Set<string>();

  return source
    .map((entry) => {
      const currencyCodeIso = normalizeCurrencyCode(entry?.CurrencyCodeISO);
      const effectiveIsoCode = currencyCodeIso || normalizeCurrencyCode(entry?.CurrencyCode);
      if (!effectiveIsoCode) return null;
      if (seenCodes.has(effectiveIsoCode)) return null;
      seenCodes.add(effectiveIsoCode);

      const displayName = resolveCurrencyDisplayName(effectiveIsoCode, locale);
      const optionLabel = displayName ? `${effectiveIsoCode} ${displayName}` : effectiveIsoCode;

      return {
        value: effectiveIsoCode,
        text: optionLabel,
        icon: <ExpenseCurrencyFlagIcon currencyCode={effectiveIsoCode} sizeClassName={CURRENCY_FLAG_SIZE_CLASS} />,
      } as ExpenseSelectOption;
    })
    .filter((entry): entry is ExpenseSelectOption => entry !== null);
};

// Shared currency combobox backed by /api/crm/expensesheets/currencies.
const ExpenseCurrencyFilterSelect = ({
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
}: ExpenseCurrencyFilterSelectProps) => {
  const locale = useMemo(() => readPreferredLocale(), []);
  const [options, setOptions] = useState<ExpenseSelectOption[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const [loadErrorMessage, setLoadErrorMessage] = useState("");
  const [emptyMessage, setEmptyMessage] = useState("");
  const onChangeRef = useRef(onChange);
  const valueRef = useRef(normalizeCurrencyCode(value));
  const initialDefaultAppliedRef = useRef(false);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    valueRef.current = normalizeCurrencyCode(value);
  }, [value]);

  useEffect(() => {
    let isCancelled = false;
    const controller = new AbortController();

    const loadCurrencies = async () => {
      setIsLoadingOptions(true);
      setLoadErrorMessage("");
      setEmptyMessage("");

      try {
        const response = await getExpenseSheetCurrencies({
          suppressPermissionModal: true,
          signal: controller.signal,
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
        const hasCurrentInList = mappedOptions.some((option) => normalizeCurrencyCode(option.value) === currentValue);
        if (currentValue && hasCurrentInList) {
          return;
        }

        if (!currentValue && preferDefaultCurrencyFromContext && !initialDefaultAppliedRef.current) {
          const defaultCurrencyCode = normalizeCurrencyCode(
            await getExpenseSheetDefaultCurrencyCode({
              suppressPermissionModal: true,
              signal: controller.signal,
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
  }, [locale, preferDefaultCurrencyFromContext]);

  const normalizedValue = useMemo(() => normalizeCurrencyCode(value), [value]);
  const disableBecauseNoData = !isLoadingOptions && !loadErrorMessage && options.length === 0;
  const effectiveDisabled = disabled || disableBecauseNoData;
  const loadingMessage = indT("Common_Loading", "Loading");

  return (
    <div className="space-y-1.5">
      <SelectCombobox
        label={label}
        placeholder={placeholder}
        options={options}
        value={normalizedValue}
        onChange={(nextValue) => onChange(normalizeCurrencyCode(nextValue))}
        readOnly={readOnly}
        disabled={effectiveDisabled}
        allowTextInput
        showSearchButton={false}
        showLabel={showLabel}
        usePortal={false}
        selectedTextMode="value"
        dropdownExpandPx={dropdownExpandPx}
        dropdownMinWidthPx={dropdownMinWidthPx}
        dropdownMaxHeightClass="max-h-96"
        selectedIconClassName={CURRENCY_FLAG_SIZE_CLASS}
        selectedInputPaddingClassName="pl-12"
        clearOnEmptyInput
        optionIconClassName={CURRENCY_FLAG_SIZE_CLASS}
        allowOptionHorizontalScroll
        lockDropdownWidthOnFirstOpen
        disableDefaultOptionPadding
        optionLeftPaddingClassName="pl-1"
        optionDefaultClassName={CURRENCY_OPTION_DEFAULT_CLASS}
        optionActiveClassName={CURRENCY_OPTION_ACTIVE_CLASS}
        optionSelectedClassName={CURRENCY_OPTION_SELECTED_CLASS}
        idBase={idBase}
        portalClassName="visitas-typography"
        panelClassName={CURRENCY_DROPDOWN_PANEL_CLASS}
        panelStyle={CURRENCY_DROPDOWN_PANEL_STYLE}
      />
      {isLoadingOptions ? <p className="text-xs text-slate-500">{loadingMessage}</p> : null}
      {!isLoadingOptions && loadErrorMessage ? <p className="text-xs text-danger">{loadErrorMessage}</p> : null}
      {!isLoadingOptions && !loadErrorMessage && emptyMessage ? <p className="text-xs text-slate-500">{emptyMessage}</p> : null}
    </div>
  );
};

export default ExpenseCurrencyFilterSelect;

