import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseExchangeRateModeCode } from "../expenseTypes.ts";
import type { ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";

type ExchangeRateModeUiMeta = {
  labelKey: string;
  fallback: string;
};

const EXCHANGE_RATE_MODE_META: Record<ExpenseExchangeRateModeCode, ExchangeRateModeUiMeta> = {
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

// Keeps exchange rate mode values constrained to numeric 0 or 1.
export const normalizeExpenseExchangeRateMode = (value: unknown): ExpenseExchangeRateModeCode | null => {
  const parsed = Number(value);
  if (parsed === 0 || parsed === 1) {
    return parsed;
  }
  return null;
};

// Builds fixed options for the exchange rate mode filter.
export const getExpenseExchangeRateModeOptions = (): ExpenseSelectOption[] => {
  return EXCHANGE_RATE_MODE_CODES
    .map((code) => {
      const meta = EXCHANGE_RATE_MODE_META[code];
      return {
        value: String(code),
        text: indT(meta.labelKey, meta.fallback),
      };
    });
};

// Returns a localized mode label or empty text for non-selected values.
export const getExpenseExchangeRateModeLabel = (value: unknown): string => {
  const normalized = normalizeExpenseExchangeRateMode(value);
  if (normalized === null) return "";
  const meta = EXCHANGE_RATE_MODE_META[normalized];
  return indT(meta.labelKey, meta.fallback);
};
