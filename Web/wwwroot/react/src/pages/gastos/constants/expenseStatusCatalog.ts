import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseStatusFilterCode } from "../expenseTypes.ts";
import type { ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";

type ExpenseStatusUiMeta = {
  labelKey: string;
  fallback: string;
  colorHex: string;
  badgeClassName: string;
};

export const DEFAULT_EXPENSE_STATUS_FILTER: ExpenseStatusFilterCode = 5;
const EXPENSE_STATUS_CODES: ExpenseStatusFilterCode[] = [5, 0, 1, 2, 3, 4];

const STATUS_UI_BY_CODE: Record<ExpenseStatusFilterCode, ExpenseStatusUiMeta> = {
  0: {
    labelKey: "ExpenseSheets_Filter_Status_Draft",
    fallback: "Borrador",
    colorHex: "#94a3b8",
    badgeClassName: "expense-sheet-card__status expense-sheet-card__status--draft",
  },
  1: {
    labelKey: "ExpenseSheets_Filter_Status_InReview",
    fallback: "En revision",
    colorHex: "#f59e0b",
    badgeClassName: "expense-sheet-card__status expense-sheet-card__status--review",
  },
  2: {
    labelKey: "ExpenseSheets_Filter_Status_Approved",
    fallback: "Aprobado",
    colorHex: "#22c55e",
    badgeClassName: "expense-sheet-card__status expense-sheet-card__status--approved",
  },
  3: {
    labelKey: "ExpenseSheets_Filter_Status_Rejected",
    fallback: "Rechazado",
    colorHex: "#ef4444",
    badgeClassName: "expense-sheet-card__status expense-sheet-card__status--rejected",
  },
  4: {
    labelKey: "ExpenseSheets_Filter_Status_Paid",
    fallback: "Pagado",
    colorHex: "#00296b",
    badgeClassName: "expense-sheet-card__status expense-sheet-card__status--paid",
  },
  5: {
    labelKey: "ExpenseSheets_Filter_Status_All",
    fallback: "Todos",
    colorHex: "#64748b",
    badgeClassName: "expense-sheet-card__status expense-sheet-card__status--all",
  },
};

// Normalizes any unknown status filter value to a safe list filter code.
export const normalizeExpenseStatusFilterCode = (
  value: unknown,
  fallback: ExpenseStatusFilterCode = DEFAULT_EXPENSE_STATUS_FILTER
): ExpenseStatusFilterCode => {
  const parsed = Number(value);
  if (parsed >= 0 && parsed <= 5) {
    return parsed as ExpenseStatusFilterCode;
  }
  return fallback;
};

// Builds fixed status filter options for the expense list filter panel.
export const getExpenseStatusFilterOptions = (): ExpenseSelectOption[] => {
  return EXPENSE_STATUS_CODES
    .map((code) => {
      const meta = STATUS_UI_BY_CODE[code];
      return {
        value: String(code),
        text: indT(meta.labelKey, meta.fallback),
      };
    });
};

// Returns the localized status label for filter summaries and badges.
export const getExpenseStatusLabel = (value: unknown): string => {
  const normalized = normalizeExpenseStatusFilterCode(value);
  const meta = STATUS_UI_BY_CODE[normalized];
  return indT(meta.labelKey, meta.fallback);
};

// Returns the color token for UI elements that represent a status code.
export const getExpenseStatusColorHex = (value: unknown): string => {
  const normalized = normalizeExpenseStatusFilterCode(value);
  return STATUS_UI_BY_CODE[normalized].colorHex;
};

// Returns the default badge class name used by timeline cards.
export const getExpenseStatusBadgeClassName = (value: unknown): string => {
  const normalized = normalizeExpenseStatusFilterCode(value);
  return STATUS_UI_BY_CODE[normalized].badgeClassName;
};
