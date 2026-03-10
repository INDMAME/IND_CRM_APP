import { useCallback } from "react";
import type { AppliedFilterSnapshot } from "./expenseListTypes.ts";
import { normalizeExpenseFilterSnapshot } from "./expenseFilterSnapshot.ts";
import type { ExpenseSheetCard } from "../expenseTypes.ts";
import {
  getSessionJsonWithExpiry,
  getSessionValueWithExpiry,
  removeSessionValueWithExpiry,
  setSessionJsonWithExpiry,
  setSessionValueWithExpiry,
} from "../../../utils/sessionExpiry.ts";
import { getExpenseScopeToken } from "../utils/expenseScope.ts";

const EXPENSE_SHEETS_FILTER_KEY_PREFIX = "expense_sheets_filter_v1";
const EXPENSE_SHEETS_RETURN_FLAG_KEY_PREFIX = "expense_sheets_return_v1";
const EXPENSE_SHEETS_CACHE_TTL_MS = 12 * 60 * 60 * 1000;

export type ExpenseSheetsCachedState = {
  filters: AppliedFilterSnapshot;
  page: number;
  scrollY: number;
  items: ExpenseSheetCard[];
  total: number;
};

const getScopeToken = (): string => {
  return getExpenseScopeToken();
};

const getScopedKeys = () => {
  const scope = getScopeToken();
  return {
    filterKey: `${EXPENSE_SHEETS_FILTER_KEY_PREFIX}_${scope}`,
    returnFlagKey: `${EXPENSE_SHEETS_RETURN_FLAG_KEY_PREFIX}_${scope}`,
  };
};

const toNullableNumber = (value: unknown): number | null => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const normalizeItems = (raw: unknown): ExpenseSheetCard[] => {
  if (!Array.isArray(raw)) return [];

  return raw.map((entry) => {
    const item = (entry || {}) as Partial<ExpenseSheetCard>;
    return {
      hojaGastosId: String(item.hojaGastosId || "").trim(),
      description: typeof item.description === "string" ? item.description.trim() : undefined,
      expenseSheetStatus: toNullableNumber(item.expenseSheetStatus),
      estadoComentarios: typeof item.estadoComentarios === "string" ? item.estadoComentarios.trim() : null,
      userId: typeof item.userId === "string" ? item.userId.trim() : undefined,
      userName: typeof item.userName === "string" ? item.userName.trim() : null,
      voucher: typeof item.voucher === "string" ? item.voucher.trim() : undefined,
      projId: typeof item.projId === "string" ? item.projId.trim() : undefined,
      currencyCode: typeof item.currencyCode === "string" ? item.currencyCode.trim() : undefined,
      totalAmount: toNullableNumber(item.totalAmount),
      exchRate: toNullableNumber(item.exchRate),
      exchangeRateMode: toNullableNumber(item.exchangeRateMode),
      createdDate: typeof item.createdDate === "string" ? item.createdDate.trim() : undefined,
    };
  });
};

const normalizeState = (raw: ExpenseSheetsCachedState | null): ExpenseSheetsCachedState | null => {
  if (!raw || typeof raw !== "object") return null;

  const pageRaw = Number(raw.page);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? Math.floor(pageRaw) : 1;

  const scrollRaw = Number(raw.scrollY);
  const scrollY = Number.isFinite(scrollRaw) && scrollRaw >= 0 ? Math.floor(scrollRaw) : 0;
  const items = normalizeItems((raw as { items?: unknown }).items);
  const totalRaw = Number((raw as { total?: unknown }).total);
  const total = Number.isFinite(totalRaw) && totalRaw >= 0 ? totalRaw : items.length;

  return {
    filters: normalizeExpenseFilterSnapshot(raw.filters),
    page,
    scrollY,
    items,
    total,
  };
};

// Centralizes cache persistence for returning from expense detail to list.
export const useExpenseSheetsFilterCache = () => {
  const writeCachedState = useCallback((state: ExpenseSheetsCachedState): void => {
    const normalized = normalizeState(state);
    if (!normalized) return;

    const keys = getScopedKeys();
    setSessionJsonWithExpiry(keys.filterKey, normalized, EXPENSE_SHEETS_CACHE_TTL_MS);
    setSessionValueWithExpiry(keys.returnFlagKey, "1", EXPENSE_SHEETS_CACHE_TTL_MS);
  }, []);

  const readCachedState = useCallback((): ExpenseSheetsCachedState | null => {
    const keys = getScopedKeys();
    const raw = getSessionJsonWithExpiry<ExpenseSheetsCachedState>(keys.filterKey);
    return normalizeState(raw);
  }, []);

  const consumeReturnFlag = useCallback((): boolean => {
    const keys = getScopedKeys();
    const raw = getSessionValueWithExpiry(keys.returnFlagKey);
    if (raw === "1") {
      removeSessionValueWithExpiry(keys.returnFlagKey);
      return true;
    }
    return false;
  }, []);

  const saveCachedState = useCallback((state: ExpenseSheetsCachedState): void => {
    writeCachedState(state);
  }, [writeCachedState]);

  const invalidateCachedListForRefetch = useCallback((): void => {
    const currentState = readCachedState();
    if (!currentState) return;

    writeCachedState({
      ...currentState,
      items: [],
      total: 0,
    });
  }, [readCachedState, writeCachedState]);

  const clearCachedState = useCallback(() => {
    const keys = getScopedKeys();
    removeSessionValueWithExpiry(keys.filterKey);
    removeSessionValueWithExpiry(keys.returnFlagKey);
  }, []);

  return {
    readCachedState,
    consumeReturnFlag,
    saveCachedState,
    invalidateCachedListForRefetch,
    clearCachedState,
  };
};
