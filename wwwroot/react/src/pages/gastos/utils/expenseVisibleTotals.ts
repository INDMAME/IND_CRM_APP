// Selects the reimbursable amount that should be visible in expense summaries.
export function getVisibleReimbursableTotal(row: {
  TotalAmountMST?: number | null;
  AmountMST?: number | null;
  TotalAmountCurrency?: number | null;
  TotalAmount?: number | null;
  Amount?: number | null;
}) {
  return row.TotalAmountMST
    ?? row.AmountMST
    ?? row.TotalAmountCurrency
    ?? row.TotalAmount
    ?? row.Amount
    ?? null;
}
