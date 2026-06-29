export const EXPENSE_LINE_EXCHANGE_RATE_REFERENCE_AMOUNT = 100;

// Normalizes currency input before comparing or sending line currency values.
export const normalizeExpenseLineCurrencyCode = (value: unknown): string => {
  return String(value || "").trim().toUpperCase();
};

// Rounds line currency calculations to the cents expected by the expense UI.
export const roundExpenseLineMoney = (value: number): number => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

// Calculates reimbursement amount from the AX exchange-rate reference 100.
export const calculateExpenseLineAmountMST = (amount: number, exchangeRate: number): number | null => {
  if (!Number.isFinite(amount) || amount <= 0 || !Number.isFinite(exchangeRate) || exchangeRate <= 0) {
    return null;
  }

  return roundExpenseLineMoney((amount * EXPENSE_LINE_EXCHANGE_RATE_REFERENCE_AMOUNT) / exchangeRate);
};

// Calculates AX exchange rate from amount and reimbursement amount.
export const calculateExpenseLineExchangeRate = (amount: number, amountMST: number): number | null => {
  if (!Number.isFinite(amount) || amount <= 0 || !Number.isFinite(amountMST) || amountMST <= 0) {
    return null;
  }

  return (amount * EXPENSE_LINE_EXCHANGE_RATE_REFERENCE_AMOUNT) / amountMST;
};
