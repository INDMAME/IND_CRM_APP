export type ExpenseDateParts = {
  year: string;
  month: string;
  day: string;
};

// Normalize unknown values to a trimmed string.
export const safeText = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  return String(value).trim();
};

// Return date at local day start.
export const startOfDay = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

// Format local date to yyyy-MM-dd.
export const toIsoDate = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

// Parse supported API date formats.
export const parseExpenseDate = (raw?: string): Date | null => {
  if (!raw) return null;
  const value = String(raw).trim();
  if (!value) return null;

  const dateOnly = value.split("T")[0].split(" ")[0];
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateOnly)) {
    const [year, month, day] = dateOnly.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  if (/^\d{8}$/.test(dateOnly)) {
    const year = Number(dateOnly.slice(0, 4));
    const month = Number(dateOnly.slice(4, 6));
    const day = Number(dateOnly.slice(6, 8));
    return new Date(year, month - 1, day);
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

// Build timeline date fragments for card left panel.
export const formatExpenseDateParts = (raw?: string, locale = "es-ES"): ExpenseDateParts => {
  const date = parseExpenseDate(raw);
  if (!date) {
    return { year: "", month: "", day: "--" };
  }

  return {
    year: String(date.getFullYear()),
    month: date.toLocaleDateString(locale, { month: "short" }).replace(/\./g, "").toUpperCase(),
    day: String(date.getDate()).padStart(2, "0"),
  };
};
