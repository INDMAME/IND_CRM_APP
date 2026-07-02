import { indFormat, indT } from "../../../utils/indI18n.ts";
import type { ExchangeRateDto } from "../expenseTypes.ts";
import { getExchangeRate } from "./expenseApi.ts";
import { EXPENSE_LINE_EXCHANGE_RATE_REFERENCE_AMOUNT, normalizeExpenseLineCurrencyCode } from "./expenseLineCurrency.ts";
import { formatExpenseInputNumber, parseExpenseNumericInput } from "./expenseNumberFormat.ts";
import { safeText } from "./expenseUiUtils.ts";

type RawExchangeRateDto = ExchangeRateDto & {
  rate?: unknown;
  date?: unknown;
  source?: unknown;
};

export type ExpenseOfficialExchangeRate = {
  exchangeRate: number;
  rawRate: number;
  date: string;
  source: string;
};

const toPositiveNumber = (value: unknown): number | null => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

export const formatExpenseExchangeRateInputValue = (value: number | string | null | undefined): string => {
  return formatExpenseInputNumber(value, {
    minimumFractionDigits: 7,
    maximumFractionDigits: 7,
    useGrouping: true,
    fallback: "",
  });
};

export const formatExpenseExchangeRateRawValue = (value: number | string | null | undefined): string => {
  return formatExpenseInputNumber(value, {
    minimumFractionDigits: 7,
    maximumFractionDigits: 7,
    useGrouping: false,
    fallback: "",
  });
};

// Loads the official currency rate and converts it to the AX reference-100 exchange rate.
export const fetchExpenseOfficialExchangeRate = async ({
  localCurrencyCode,
  expenseCurrencyCode,
  date,
  signal,
}: {
  localCurrencyCode: string;
  expenseCurrencyCode: string;
  date?: string;
  signal?: AbortSignal;
}): Promise<ExpenseOfficialExchangeRate | null> => {
  const localCurrency = normalizeExpenseLineCurrencyCode(localCurrencyCode);
  const expenseCurrency = normalizeExpenseLineCurrencyCode(expenseCurrencyCode);
  const exchangeDate = safeText(date);
  if (!localCurrency || !expenseCurrency) {
    return null;
  }

  if (localCurrency === expenseCurrency) {
    return {
      exchangeRate: EXPENSE_LINE_EXCHANGE_RATE_REFERENCE_AMOUNT,
      rawRate: 1,
      date: exchangeDate,
      source: "",
    };
  }

  const response = await getExchangeRate(localCurrency, expenseCurrency, exchangeDate, {
    suppressPermissionModal: true,
    signal,
  });
  const data = response.Data as RawExchangeRateDto | null | undefined;
  const rawRate = toPositiveNumber(data?.Rate ?? data?.rate);
  if (!response.Success || !data || rawRate === null) {
    throw new Error(
      safeText(response.Message) ||
        indT("ExpenseSheets_ExchangeRate_Unavailable", "No se pudo obtener el tipo de cambio.")
    );
  }

  return {
    exchangeRate: rawRate * EXPENSE_LINE_EXCHANGE_RATE_REFERENCE_AMOUNT,
    rawRate,
    date: safeText(data.Date ?? data.date) || exchangeDate,
    source: safeText(data.Source ?? data.source),
  };
};

export const buildExpenseExchangeRateInfoMessage = ({
  rawRate,
  exchangeRate,
  date,
  source,
}: {
  rawRate?: number | string | null;
  exchangeRate?: number | string | null;
  date?: string;
  source?: string;
}): string => {
  const rawRateText = formatExpenseExchangeRateRawValue(rawRate);
  const parsedExchangeRate = parseExpenseNumericInput(exchangeRate);
  if (rawRateText) {
    return indFormat(
      "ExpenseSheets_ExchangeRate_InfoPopover_Detail",
      "Tipo de cambio obtenido {0}\nFecha: {1}\nOrigen: {2}",
      rawRateText,
      safeText(date) || indT("Common_NotAvailable", "N/A"),
      safeText(source) || indT("Common_NotAvailable", "N/A")
    );
  }

  return indFormat(
    "ExpenseSheets_ExchangeRate_InfoPopover_Stored",
    "Tipo de cambio {0} {1}",
    "manual",
    formatExpenseExchangeRateRawValue(
      parsedExchangeRate != null ? parsedExchangeRate / EXPENSE_LINE_EXCHANGE_RATE_REFERENCE_AMOUNT : null
    ) || formatExpenseExchangeRateInputValue(exchangeRate) || "-"
  );
};
