import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";

export type ExpenseTicketStatusCode = 0 | 1;
export type ExpenseTicketStatusFilterCode = "" | ExpenseTicketStatusCode;

type ExpenseTicketStatusUiMeta = {
  labelKey: string;
  fallback: string;
  badgeClassName: string;
};

const STATUS_META_BY_CODE: Record<ExpenseTicketStatusCode, ExpenseTicketStatusUiMeta> = {
  0: {
    labelKey: "Tickets_Filter_Status_Pending",
    fallback: "Pending",
    badgeClassName: "expense-sheet-card__status expense-sheet-card__status--review",
  },
  1: {
    labelKey: "Tickets_Filter_Status_Assigned",
    fallback: "Assigned",
    badgeClassName: "expense-sheet-card__status expense-sheet-card__status--approved",
  },
};

const toNullableExpenseTicketStatusCode = (value: unknown): ExpenseTicketStatusCode | null => {
  const parsed = Number(value);
  if (parsed === 0 || parsed === 1) {
    return parsed;
  }

  return null;
};

// Normalizes unknown values to the supported ticket status filter values.
export const normalizeExpenseTicketStatusFilterCode = (
  value: unknown,
  fallback: ExpenseTicketStatusFilterCode = ""
): ExpenseTicketStatusFilterCode => {
  const parsed = toNullableExpenseTicketStatusCode(value);
  if (parsed !== null) {
    return parsed;
  }
  return fallback;
};

// Builds fixed status options for tickets list filters.
export const getExpenseTicketStatusFilterOptions = (): ExpenseSelectOption[] => {
  return [
    {
      value: "",
      text: indT("Tickets_Filter_All", "All"),
    },
    {
      value: "0",
      text: indT(STATUS_META_BY_CODE[0].labelKey, STATUS_META_BY_CODE[0].fallback),
    },
    {
      value: "1",
      text: indT(STATUS_META_BY_CODE[1].labelKey, STATUS_META_BY_CODE[1].fallback),
    },
  ];
};

// Returns localized status label for cards and filter summary.
export const getExpenseTicketStatusLabel = (value: unknown): string => {
  const normalized = toNullableExpenseTicketStatusCode(value);
  if (normalized === null) {
    return indT("Common_NotAvailable", "N/A");
  }

  const meta = STATUS_META_BY_CODE[normalized];
  return indT(meta.labelKey, meta.fallback);
};

// Returns status badge class used by ticket cards.
export const getExpenseTicketStatusBadgeClassName = (value: unknown): string => {
  const normalized = toNullableExpenseTicketStatusCode(value);
  if (normalized === null) {
    return "expense-sheet-card__status expense-sheet-card__status--all";
  }

  return STATUS_META_BY_CODE[normalized].badgeClassName;
};
