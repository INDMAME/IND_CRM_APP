export const EXPENSE_LINE_EXCHANGE_RATE_REFERENCE_AMOUNT = 100;
export const EXPENSE_LINE_DEFAULT_SAME_CURRENCY_EXCHANGE_RATE = EXPENSE_LINE_EXCHANGE_RATE_REFERENCE_AMOUNT;

// Normalizes currency input before comparing or sending line currency values.
export const normalizeExpenseLineCurrencyCode = (value: unknown): string => {
  return String(value || "").trim().toUpperCase();
};

const toPositiveExpenseLineNumber = (value: unknown): number | null => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

// Rounds line currency calculations to the cents expected by the expense UI.
export const roundExpenseLineMoney = (value: number): number => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

// Compares expense currency with the reimbursement currency owned by the sheet.
export const isExpenseLineSameReimbursementCurrency = (
  currencyCode: unknown,
  reimbursementCurrencyCode: unknown
): boolean => {
  const normalizedCurrencyCode = normalizeExpenseLineCurrencyCode(currencyCode);
  const normalizedReimbursementCurrencyCode = normalizeExpenseLineCurrencyCode(reimbursementCurrencyCode);
  return (
    !!normalizedCurrencyCode &&
    !!normalizedReimbursementCurrencyCode &&
    normalizedCurrencyCode === normalizedReimbursementCurrencyCode
  );
};

// Identifies foreign-currency settlement against the sheet reimbursement currency.
export const isExpenseLineForeignCurrency = (currencyCode: unknown, reimbursementCurrencyCode: unknown): boolean => {
  const normalizedCurrencyCode = normalizeExpenseLineCurrencyCode(currencyCode);
  const normalizedReimbursementCurrencyCode = normalizeExpenseLineCurrencyCode(reimbursementCurrencyCode);
  return (
    !!normalizedCurrencyCode &&
    !!normalizedReimbursementCurrencyCode &&
    normalizedCurrencyCode !== normalizedReimbursementCurrencyCode
  );
};

// Keeps the current rate for same-currency lines, defaulting to AX reference 100 when it is empty.
export const resolveExpenseLineExchangeRateForCurrency = (
  currencyCode: unknown,
  reimbursementCurrencyCode: unknown,
  exchangeRate: unknown
): number | null => {
  const parsedExchangeRate = toPositiveExpenseLineNumber(exchangeRate);
  if (isExpenseLineSameReimbursementCurrency(currencyCode, reimbursementCurrencyCode)) {
    return parsedExchangeRate ?? EXPENSE_LINE_DEFAULT_SAME_CURRENCY_EXCHANGE_RATE;
  }

  return parsedExchangeRate;
};

// Calculates reimbursement amount from the AX exchange-rate reference 100.
export const calculateExpenseLineAmountMST = (amount: number, exchangeRate: number): number | null => {
  if (!Number.isFinite(amount) || amount <= 0 || !Number.isFinite(exchangeRate) || exchangeRate <= 0) {
    return null;
  }

  return roundExpenseLineMoney((amount * EXPENSE_LINE_EXCHANGE_RATE_REFERENCE_AMOUNT) / exchangeRate);
};

// Calculates reimbursement amount while honoring same-currency manual settlement rules.
export const calculateExpenseLineAmountMSTForCurrency = (
  amount: number,
  exchangeRate: number | null,
  currencyCode: unknown,
  reimbursementCurrencyCode: unknown
): number | null => {
  if (!Number.isFinite(amount) || amount < 0) {
    return null;
  }

  if (isExpenseLineSameReimbursementCurrency(currencyCode, reimbursementCurrencyCode)) {
    return roundExpenseLineMoney(amount);
  }

  return exchangeRate != null ? calculateExpenseLineAmountMST(amount, exchangeRate) : null;
};

// Calculates AX exchange rate from amount and reimbursement amount.
export const calculateExpenseLineExchangeRate = (amount: number, amountMST: number): number | null => {
  if (!Number.isFinite(amount) || amount <= 0 || !Number.isFinite(amountMST) || amountMST <= 0) {
    return null;
  }

  return (amount * EXPENSE_LINE_EXCHANGE_RATE_REFERENCE_AMOUNT) / amountMST;
};

// Calculates the inverse rate only for foreign currencies; same-currency lines keep their current rate.
export const calculateExpenseLineExchangeRateForCurrency = (
  amount: number,
  amountMST: number,
  currencyCode: unknown,
  reimbursementCurrencyCode: unknown,
  currentExchangeRate: unknown
): number | null => {
  if (isExpenseLineSameReimbursementCurrency(currencyCode, reimbursementCurrencyCode)) {
    return resolveExpenseLineExchangeRateForCurrency(currencyCode, reimbursementCurrencyCode, currentExchangeRate);
  }

  return calculateExpenseLineExchangeRate(amount, amountMST);
};

// Resolves AmountMST for write payloads without overwriting an explicit manual same-currency amount.
export const resolveExpenseLineAmountMSTForCurrencyPayload = (
  amount: number | null,
  amountMST: number | null,
  currencyCode: unknown,
  reimbursementCurrencyCode: unknown
): number | null => {
  if (Number.isFinite(amountMST)) {
    return amountMST;
  }

  if (isExpenseLineSameReimbursementCurrency(currencyCode, reimbursementCurrencyCode) && Number.isFinite(amount)) {
    return roundExpenseLineMoney(Number(amount));
  }

  return null;
};
