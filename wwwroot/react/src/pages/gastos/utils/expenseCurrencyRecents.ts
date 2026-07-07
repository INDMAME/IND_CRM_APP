import { getExpenseScopeToken } from "./expenseScope.ts";
import type { ExpenseSelectOption } from "./expenseSelectOptions.ts";

const RECENT_CURRENCY_STORAGE_KEY_PREFIX = "expense_recent_currencies_v1";
const MAX_RECENT_CURRENCY_CODES = 6;

const normalizeCurrencyCode = (value: unknown): string => String(value || "").trim().toUpperCase();

const normalizeStorageKeyPart = (value: unknown): string => {
  const normalized = String(value || "").trim();
  return normalized.replace(/[^a-z0-9_-]+/gi, "_").replace(/^_+|_+$/g, "") || "default";
};

const readStorage = (): Storage | null => {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

const buildRecentCurrencyStorageKey = (userScope: string): string => {
  const expenseScope = normalizeStorageKeyPart(getExpenseScopeToken());
  const userKey = normalizeStorageKeyPart(userScope);
  return `${RECENT_CURRENCY_STORAGE_KEY_PREFIX}_${expenseScope}_${userKey}`;
};

const normalizeRecentCurrencyCodes = (source: unknown): string[] => {
  const items = Array.isArray(source) ? source : [];
  const seen = new Set<string>();

  return items
    .map((item) => normalizeCurrencyCode(item))
    .filter((code) => {
      if (!code || seen.has(code)) return false;
      seen.add(code);
      return true;
    })
    .slice(0, MAX_RECENT_CURRENCY_CODES);
};

const compareCurrencyOptions = (locale: string) => (left: ExpenseSelectOption, right: ExpenseSelectOption): number => {
  const textComparison = left.text.localeCompare(right.text, [locale, "en"], { sensitivity: "base" });
  if (textComparison !== 0) return textComparison;
  return left.value.localeCompare(right.value, "en", { sensitivity: "base" });
};

// Reads the recent currency cache for the active Gastos user and company scope.
export const readRecentExpenseCurrencyCodes = (userScope = ""): string[] => {
  const storage = readStorage();
  if (!storage) return [];

  try {
    return normalizeRecentCurrencyCodes(JSON.parse(storage.getItem(buildRecentCurrencyStorageKey(userScope)) || "[]"));
  } catch {
    return [];
  }
};

// Stores one selected currency at the front of the scoped recent list.
export const rememberRecentExpenseCurrencyCode = (currencyCode: string, userScope = ""): string[] => {
  const normalizedCode = normalizeCurrencyCode(currencyCode);
  if (!normalizedCode) return readRecentExpenseCurrencyCodes(userScope);

  const nextCodes = [
    normalizedCode,
    ...readRecentExpenseCurrencyCodes(userScope).filter((code) => code !== normalizedCode),
  ].slice(0, MAX_RECENT_CURRENCY_CODES);
  const storage = readStorage();
  if (!storage) return nextCodes;

  try {
    storage.setItem(buildRecentCurrencyStorageKey(userScope), JSON.stringify(nextCodes));
  } catch {
    // Ignore storage write failures in restricted browser contexts.
  }

  return nextCodes;
};

// Orders currencies with recent valid selections first and the remaining options alphabetically.
export const orderExpenseCurrencyOptionsByRecency = (
  options: ExpenseSelectOption[],
  recentCurrencyCodes: string[],
  locale: string
): ExpenseSelectOption[] => {
  const optionByCode = new Map<string, ExpenseSelectOption>();
  options.forEach((option) => {
    const normalizedCode = normalizeCurrencyCode(option.value);
    if (normalizedCode && !optionByCode.has(normalizedCode)) {
      optionByCode.set(normalizedCode, option);
    }
  });

  const recentOptions = normalizeRecentCurrencyCodes(recentCurrencyCodes)
    .map((code) => optionByCode.get(code))
    .filter((option): option is ExpenseSelectOption => !!option);
  const recentCodeSet = new Set(recentOptions.map((option) => normalizeCurrencyCode(option.value)));
  const alphabeticalOptions = options
    .filter((option) => !recentCodeSet.has(normalizeCurrencyCode(option.value)))
    .slice()
    .sort(compareCurrencyOptions(locale));

  return [...recentOptions, ...alphabeticalOptions];
};
