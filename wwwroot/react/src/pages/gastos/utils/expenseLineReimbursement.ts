import {
  LINE_REIMBURSABLE_EXPENSE_NO_VALUE,
  LINE_REIMBURSABLE_EXPENSE_YES_VALUE,
  normalizeExpenseLineReimbursableExpense,
} from "../constants/expenseReimbursableExpenseCatalog.ts";

const toFiniteAmount = (value: unknown): number | null => {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

// Mirrors the AX Yes/No reimbursement rule for an immediate edit preview only.
export const resolveExpenseLineReimbursableAmountPreview = (
  reimbursableExpense: unknown,
  amountMST: unknown,
  persistedAmount: unknown = null
): number | null => {
  const normalizedStatus = normalizeExpenseLineReimbursableExpense(reimbursableExpense);
  if (normalizedStatus === LINE_REIMBURSABLE_EXPENSE_NO_VALUE) return 0;
  if (normalizedStatus === LINE_REIMBURSABLE_EXPENSE_YES_VALUE) return toFiniteAmount(amountMST);
  return toFiniteAmount(persistedAmount);
};
