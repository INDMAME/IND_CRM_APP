import { indT } from "../../../utils/indI18n.ts";
import { mapWindowEnumOptions, type ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";

export type ExpenseTicketStatusCode = number;
export type ExpenseTicketStatusFilterCode = "" | ExpenseTicketStatusCode;

type ExpenseTicketStatusUiMeta = {
  labelKey: string;
  fallback: string;
  badgeClassName: string;
};

const STATUS_META_BY_CODE: Partial<Record<ExpenseTicketStatusCode, ExpenseTicketStatusUiMeta>> = {
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

const getExpenseTicketStatusCatalogOptions = (): ExpenseSelectOption[] => {
  const source = typeof window !== "undefined" && Array.isArray(window.__EXPENSE_TICKET_STATUSES__)
    ? window.__EXPENSE_TICKET_STATUSES__
    : [];

  return mapWindowEnumOptions(source).filter((option) => {
    const parsed = Number(option.value);
    return Number.isInteger(parsed) && parsed >= 0;
  });
};

const getExpenseTicketStatusCatalogLabel = (value: ExpenseTicketStatusCode): string => {
  const match = getExpenseTicketStatusCatalogOptions().find((option) => Number(option.value) === value);
  return match?.text || "";
};

const toNullableExpenseTicketStatusCode = (value: unknown): ExpenseTicketStatusCode | null => {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value === "string" && value.trim() === "") {
    return null;
  }

  const parsed = Number(value);
  if (Number.isInteger(parsed) && parsed >= 0) {
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
  const catalogOptions = getExpenseTicketStatusCatalogOptions();
  if (catalogOptions.length > 0) {
    return [
      {
        value: "",
        text: indT("Tickets_Filter_All", "All"),
      },
      ...catalogOptions,
    ];
  }

  const pendingMeta = STATUS_META_BY_CODE[0];
  const assignedMeta = STATUS_META_BY_CODE[1];

  return [
    {
      value: "",
      text: indT("Tickets_Filter_All", "All"),
    },
    {
      value: "0",
      text: pendingMeta ? indT(pendingMeta.labelKey, pendingMeta.fallback) : "0",
    },
    {
      value: "1",
      text: assignedMeta ? indT(assignedMeta.labelKey, assignedMeta.fallback) : "1",
    },
  ];
};

// Returns localized status label for cards and filter summary.
export const getExpenseTicketStatusLabel = (value: unknown): string => {
  const normalized = toNullableExpenseTicketStatusCode(value);
  if (normalized === null) {
    return indT("Common_NotAvailable", "N/A");
  }

  const catalogLabel = getExpenseTicketStatusCatalogLabel(normalized);
  if (catalogLabel) return catalogLabel;

  const meta = STATUS_META_BY_CODE[normalized];
  return meta ? indT(meta.labelKey, meta.fallback) : String(normalized);
};

// Returns status badge class used by ticket cards.
export const getExpenseTicketStatusBadgeClassName = (value: unknown): string => {
  const normalized = toNullableExpenseTicketStatusCode(value);
  if (normalized === null) {
    return "expense-sheet-card__status expense-sheet-card__status--all";
  }

  return STATUS_META_BY_CODE[normalized]?.badgeClassName || "expense-sheet-card__status expense-sheet-card__status--all";
};
