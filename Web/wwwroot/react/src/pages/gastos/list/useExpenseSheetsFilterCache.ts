import { useCallback } from "react";
import type { AppliedFilterSnapshot } from "./expenseListTypes.ts";
import { normalizeExpenseFilterSnapshot } from "./expenseFilterSnapshot.ts";
import {
  getSessionJsonWithExpiry,
  getSessionValueWithExpiry,
  removeSessionValueWithExpiry,
  setSessionJsonWithExpiry,
  setSessionValueWithExpiry,
} from "../../../utils/sessionExpiry.ts";

const EXPENSE_SHEETS_FILTER_KEY = "expense_sheets_filter_v1";
const EXPENSE_SHEETS_RETURN_FLAG_KEY = "expense_sheets_return_v1";
const EXPENSE_SHEETS_CACHE_TTL_MS = 12 * 60 * 60 * 1000;

export type ExpenseSheetsCachedState = {
  filters: AppliedFilterSnapshot;
  page: number;
  scrollY: number;
};

const normalizeState = (raw: ExpenseSheetsCachedState | null): ExpenseSheetsCachedState | null => {
  if (!raw || typeof raw !== "object") return null;

  const pageRaw = Number(raw.page);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? Math.floor(pageRaw) : 1;

  const scrollRaw = Number(raw.scrollY);
  const scrollY = Number.isFinite(scrollRaw) && scrollRaw >= 0 ? Math.floor(scrollRaw) : 0;

  return {
    filters: normalizeExpenseFilterSnapshot(raw.filters),
    page,
    scrollY,
  };
};

// Centralizes cache persistence for returning from expense detail to list.
export const useExpenseSheetsFilterCache = () => {
  const readCachedState = useCallback((): ExpenseSheetsCachedState | null => {
    const raw = getSessionJsonWithExpiry<ExpenseSheetsCachedState>(EXPENSE_SHEETS_FILTER_KEY);
    return normalizeState(raw);
  }, []);

  const consumeReturnFlag = useCallback((): boolean => {
    const raw = getSessionValueWithExpiry(EXPENSE_SHEETS_RETURN_FLAG_KEY);
    if (raw === "1") {
      removeSessionValueWithExpiry(EXPENSE_SHEETS_RETURN_FLAG_KEY);
      return true;
    }
    return false;
  }, []);

  const saveCachedState = useCallback((state: ExpenseSheetsCachedState): void => {
    const normalized = normalizeState(state);
    if (!normalized) return;

    setSessionJsonWithExpiry(EXPENSE_SHEETS_FILTER_KEY, normalized, EXPENSE_SHEETS_CACHE_TTL_MS);
    setSessionValueWithExpiry(EXPENSE_SHEETS_RETURN_FLAG_KEY, "1", EXPENSE_SHEETS_CACHE_TTL_MS);
  }, []);

  const clearCachedState = useCallback(() => {
    removeSessionValueWithExpiry(EXPENSE_SHEETS_FILTER_KEY);
    removeSessionValueWithExpiry(EXPENSE_SHEETS_RETURN_FLAG_KEY);
  }, []);

  return {
    readCachedState,
    consumeReturnFlag,
    saveCachedState,
    clearCachedState,
  };
};
