import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseExchangeRateModeCode } from "../expenseTypes.ts";
import { mapWindowEnumOptions, type ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";

type ExchangeRateModeUiMeta = {
  labelKey: string;
  fallback: string;
};

const EXCHANGE_RATE_MODE_META: Partial<Record<ExpenseExchangeRateModeCode, ExchangeRateModeUiMeta>> = {
  0: {
    labelKey: "ExpenseSheets_Filter_ExchangeRateMode_Official",
    fallback: "T.C. Oficial",
  },
  1: {
    labelKey: "ExpenseSheets_Filter_ExchangeRateMode_Manual",
    fallback: "T.C. Manual",
  },
};
const EXCHANGE_RATE_MODE_CODES: ExpenseExchangeRateModeCode[] = [0, 1];

const getExpenseExchangeRateModeCatalogOptions = (): ExpenseSelectOption[] => {
  const source = typeof window !== "undefined" && Array.isArray(window.__EXPENSE_EXCHANGE_RATE_MODES__)
    ? window.__EXPENSE_EXCHANGE_RATE_MODES__
    : [];

  return mapWindowEnumOptions(source).filter((option) => {
    const parsed = Number(option.value);
    return Number.isInteger(parsed) && parsed >= 0;
  });
};

const getExpenseExchangeRateModeCatalogLabel = (value: ExpenseExchangeRateModeCode): string => {
  const match = getExpenseExchangeRateModeCatalogOptions().find((option) => Number(option.value) === value);
  return match?.text || "";
};

// Keeps exchange rate mode values constrained to non-negative numeric enum codes.
export const normalizeExpenseExchangeRateMode = (value: unknown): ExpenseExchangeRateModeCode | null => {
  if (value === null || value === undefined || String(value).trim() === "") return null;
  const parsed = Number(value);
  if (Number.isInteger(parsed) && parsed >= 0) {
    return parsed;
  }
  return null;
};

// Builds fixed options for the exchange rate mode filter.
export const getExpenseExchangeRateModeOptions = (): ExpenseSelectOption[] => {
  const catalogOptions = getExpenseExchangeRateModeCatalogOptions();
  if (catalogOptions.length > 0) return catalogOptions;

  return EXCHANGE_RATE_MODE_CODES
    .map((code) => {
      const meta = EXCHANGE_RATE_MODE_META[code];
      return {
        value: String(code),
        text: meta ? indT(meta.labelKey, meta.fallback) : String(code),
      };
    });
};

// Returns a localized mode label or empty text for non-selected values.
export const getExpenseExchangeRateModeLabel = (value: unknown): string => {
  const normalized = normalizeExpenseExchangeRateMode(value);
  if (normalized === null) return "";
  const catalogLabel = getExpenseExchangeRateModeCatalogLabel(normalized);
  if (catalogLabel) return catalogLabel;

  const meta = EXCHANGE_RATE_MODE_META[normalized];
  return meta ? indT(meta.labelKey, meta.fallback) : String(normalized);
};
