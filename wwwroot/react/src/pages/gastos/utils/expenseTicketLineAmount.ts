import { toNullableNumber } from "./expenseApiTransforms.ts";

type TicketLineAmountInput = {
  qty?: unknown;
  price?: unknown;
  totalAmount?: unknown;
};

// Resolves the signed ticket line amount, preserving zero-quantity discount lines.
export const resolveTicketLineAmount = (line: TicketLineAmountInput | null | undefined): number | null => {
  if (!line) return null;

  const explicitTotal = toNullableNumber(line.totalAmount);
  if (explicitTotal !== null) {
    return explicitTotal;
  }

  const qty = toNullableNumber(line.qty);
  const price = toNullableNumber(line.price);
  if (qty === null || price === null) {
    return null;
  }

  if (qty === 0 && price < 0) {
    return price;
  }

  return qty * price;
};

// Validates ticket line amounts while allowing qty=0 only for negative discounts.
export const isValidTicketLineAmount = (line: TicketLineAmountInput | null | undefined): boolean => {
  const qty = toNullableNumber(line?.qty);
  const price = toNullableNumber(line?.price);
  if (qty === null || price === null || qty < 0 || price === 0) {
    return false;
  }

  if (qty > 0) {
    return true;
  }

  const lineAmount = resolveTicketLineAmount(line);
  return lineAmount !== null && lineAmount < 0;
};
