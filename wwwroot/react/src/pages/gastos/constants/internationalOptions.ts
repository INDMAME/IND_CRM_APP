import { indT } from "../../../utils/indI18n.ts";

export type ExpenseInternationalOption = {
  value: boolean;
  text: string;
};

// Fixed enum for "Internacional" field in expense sheet lines.
export const getExpenseInternationalOptions = (): ExpenseInternationalOption[] => [
  { value: true, text: indT("ExpenseSheets_International_Yes", "Sí") },
  { value: false, text: indT("ExpenseSheets_International_No", "No") },
];

// Maps nullable boolean values to fixed enum labels for read-only rendering.
export const getExpenseInternationalLabel = (value: boolean | null | undefined): string => {
  if (value === true) {
    return indT("ExpenseSheets_International_Yes", "Sí");
  }

  if (value === false) {
    return indT("ExpenseSheets_International_No", "No");
  }

  return "-";
};

// Parses user input back to nullable boolean for future edit mode.
export const parseExpenseInternationalValue = (raw: string | boolean | null | undefined): boolean | null => {
  if (raw === true || raw === false) {
    return raw;
  }

  const value = String(raw || "").trim().toLowerCase();
  if (!value) {
    return null;
  }

  if (value === "true" || value === "1") {
    return true;
  }

  if (value === "false" || value === "0") {
    return false;
  }

  return null;
};
