import type {
  ExpenseSheetLineReimbursableExpense,
  ExpenseSheetReimbursableExpense,
} from "../expenseTypes.ts";

export type ExpenseSheetTotalsSource = {
  TotalGrossAmountMST?: number | null;
  TotalReimbursableAmount?: number | null;
  TotalAmountMST?: number | null;
};

export type ExpenseSheetOriginalAmountSource = {
  amount?: number | null;
  currencyCode?: string | null;
};

export type ExpenseSheetOriginalCurrencyTotal = {
  currencyCode: string;
  amount: number;
};

// Resolves server-owned header totals without reconstructing the gross amount.
export const resolveExpenseSheetTotals = (source: ExpenseSheetTotalsSource) => ({
  grossCompany: source.TotalGrossAmountMST ?? null,
  reimbursable: source.TotalReimbursableAmount ?? source.TotalAmountMST ?? null,
});

// Keeps header enum values within the public AX contract.
export const toExpenseSheetReimbursableExpense = (
  value: unknown
): ExpenseSheetReimbursableExpense | null => {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return parsed === 0 || parsed === 1 || parsed === 2
    ? (parsed as ExpenseSheetReimbursableExpense)
    : null;
};

// Keeps line enum values within the public AX contract and rejects Both.
export const toExpenseSheetLineReimbursableExpense = (
  value: unknown
): ExpenseSheetLineReimbursableExpense | null => {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return parsed === 0 || parsed === 1
    ? (parsed as ExpenseSheetLineReimbursableExpense)
    : null;
};

// Groups original line amounts only within the same currency for display.
export const groupExpenseSheetOriginalAmounts = (
  lines: ExpenseSheetOriginalAmountSource[]
): ExpenseSheetOriginalCurrencyTotal[] => {
  const totalsByCurrency = new Map<string, number>();

  lines.forEach((line) => {
    const currencyCode = String(line.currencyCode ?? "").trim().toUpperCase();
    const amount = line.amount;
    if (!currencyCode || amount === null || amount === undefined || !Number.isFinite(amount)) {
      return;
    }

    totalsByCurrency.set(currencyCode, (totalsByCurrency.get(currencyCode) ?? 0) + amount);
  });

  return Array.from(totalsByCurrency, ([currencyCode, amount]) => ({ currencyCode, amount }))
    .sort((left, right) => left.currencyCode.localeCompare(right.currencyCode));
};
