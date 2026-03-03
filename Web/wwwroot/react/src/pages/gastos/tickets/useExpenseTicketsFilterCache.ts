import { useCallback } from "react";
import { normalizeExpenseTicketFilterSnapshot } from "./expenseTicketFilterSnapshot.ts";
import type { ExpenseTicketAppliedFilterSnapshot } from "./expenseTicketListTypes.ts";
import {
  getSessionJsonWithExpiry,
  getSessionValueWithExpiry,
  removeSessionValueWithExpiry,
  setSessionJsonWithExpiry,
  setSessionValueWithExpiry,
} from "../../../utils/sessionExpiry.ts";

const EXPENSE_TICKETS_FILTER_KEY = "expense_tickets_filter_v1";
const EXPENSE_TICKETS_RETURN_FLAG_KEY = "expense_tickets_return_v1";
const EXPENSE_TICKETS_CACHE_TTL_MS = 12 * 60 * 60 * 1000;

export type ExpenseTicketsCachedState = {
  filters: ExpenseTicketAppliedFilterSnapshot;
  page: number;
  scrollY: number;
  focusFileId: string;
};

const normalizeState = (raw: ExpenseTicketsCachedState | null): ExpenseTicketsCachedState | null => {
  if (!raw || typeof raw !== "object") return null;

  const pageRaw = Number(raw.page);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? Math.floor(pageRaw) : 1;

  const scrollRaw = Number(raw.scrollY);
  const scrollY = Number.isFinite(scrollRaw) && scrollRaw >= 0 ? Math.floor(scrollRaw) : 0;

  return {
    filters: normalizeExpenseTicketFilterSnapshot(raw.filters),
    page,
    scrollY,
    focusFileId: String(raw.focusFileId || "").trim(),
  };
};

// Centralizes cache persistence for returning from ticket detail to list.
export const useExpenseTicketsFilterCache = () => {
  const readCachedState = useCallback((): ExpenseTicketsCachedState | null => {
    const raw = getSessionJsonWithExpiry<ExpenseTicketsCachedState>(EXPENSE_TICKETS_FILTER_KEY);
    return normalizeState(raw);
  }, []);

  const consumeReturnFlag = useCallback((): boolean => {
    const raw = getSessionValueWithExpiry(EXPENSE_TICKETS_RETURN_FLAG_KEY);
    if (raw === "1") {
      removeSessionValueWithExpiry(EXPENSE_TICKETS_RETURN_FLAG_KEY);
      return true;
    }
    return false;
  }, []);

  const saveCachedState = useCallback((state: ExpenseTicketsCachedState): void => {
    const normalized = normalizeState(state);
    if (!normalized) return;

    setSessionJsonWithExpiry(EXPENSE_TICKETS_FILTER_KEY, normalized, EXPENSE_TICKETS_CACHE_TTL_MS);
    setSessionValueWithExpiry(EXPENSE_TICKETS_RETURN_FLAG_KEY, "1", EXPENSE_TICKETS_CACHE_TTL_MS);
  }, []);

  const clearCachedState = useCallback(() => {
    removeSessionValueWithExpiry(EXPENSE_TICKETS_FILTER_KEY);
    removeSessionValueWithExpiry(EXPENSE_TICKETS_RETURN_FLAG_KEY);
  }, []);

  return {
    readCachedState,
    consumeReturnFlag,
    saveCachedState,
    clearCachedState,
  };
};
