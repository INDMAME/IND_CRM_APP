import { useCallback } from "react";
import { toExpenseGastoTypeCode } from "../constants/expenseGastoTypeCatalog.ts";
import { normalizeExpenseTicketFilterSnapshot } from "./expenseTicketFilterSnapshot.ts";
import type {
  ExpenseTicketAppliedFilterSnapshot,
  ExpenseTicketCard,
  ExpenseTicketLinkCard,
  ExpenseTicketLinkSelectionMode,
  ExpenseTicketListPageItem,
} from "./expenseTicketListTypes.ts";
import {
  getSessionJsonWithExpiry,
  getSessionValueWithExpiry,
  removeSessionValueWithExpiry,
  setSessionJsonWithExpiry,
  setSessionValueWithExpiry,
} from "../../../utils/sessionExpiry.ts";
import { getExpenseScopeToken } from "../utils/expenseScope.ts";
import { toNullableNumber } from "../utils/expenseApiTransforms.ts";

const EXPENSE_TICKETS_FILTER_KEY_PREFIX = "expense_tickets_filter_v1";
const EXPENSE_TICKETS_RETURN_FLAG_KEY_PREFIX = "expense_tickets_return_v1";
const EXPENSE_TICKETS_RETURN_MODE_KEY_PREFIX = "expense_tickets_return_mode_v1";
const EXPENSE_TICKETS_CACHE_TTL_MS = 12 * 60 * 60 * 1000;

export type ExpenseTicketsReturnMode = "restore" | "reset_filters";

export type ExpenseTicketsCachedState = {
  filters: ExpenseTicketAppliedFilterSnapshot;
  page: number;
  scrollY: number;
  focusFileId: string;
  items: ExpenseTicketListPageItem[];
  selectedTickets: ExpenseTicketLinkCard[];
  total: number;
  linkModeSheetId: string;
  linkModeLineId: string;
  selectionMode: ExpenseTicketLinkSelectionMode;
  excludedIds: string[];
  filteredSelectionFilters: ExpenseTicketAppliedFilterSnapshot | null;
  filteredSelectionTotal: number;
};

const getScopeToken = (): string => {
  return getExpenseScopeToken();
};

const getScopedKeys = () => {
  const scope = getScopeToken();
  return {
    filterKey: `${EXPENSE_TICKETS_FILTER_KEY_PREFIX}_${scope}`,
    returnFlagKey: `${EXPENSE_TICKETS_RETURN_FLAG_KEY_PREFIX}_${scope}`,
    returnModeKey: `${EXPENSE_TICKETS_RETURN_MODE_KEY_PREFIX}_${scope}`,
  };
};

const normalizeProcessedByAi = (value: unknown): boolean | null => {
  if (value === true || value === false) return value;
  if (value === 1 || value === "1" || value === "true") return true;
  if (value === 0 || value === "0" || value === "false") return false;
  return null;
};

const normalizeTicketGastoType = (value: unknown): ExpenseTicketCard["gastoType"] => {
  return toExpenseGastoTypeCode(value) as ExpenseTicketCard["gastoType"];
};

const normalizeStatus = (value: unknown): number | null => {
  const parsed = Number(value);
  if (Number.isInteger(parsed) && parsed >= 0) return parsed;
  return null;
};

const normalizeListItems = (raw: unknown): ExpenseTicketListPageItem[] => {
  if (!Array.isArray(raw)) return [];

  return raw.map((entry) => {
    const item = (entry || {}) as Partial<ExpenseTicketListPageItem> & { status?: unknown; kind?: unknown };
    const normalizedStatus = normalizeStatus(item.status);
    const normalizedKind = String(item.kind || "").trim().toLowerCase();

    const baseItem = {
      fileId: String(item.fileId || "").trim(),
      description: String(item.description || "").trim(),
      processedByAI: normalizeProcessedByAi(item.processedByAI),
      currencyCode: String(item.currencyCode || "").trim(),
      totalAmount: toNullableNumber(item.totalAmount),
      transDate: String(item.transDate || "").trim(),
      fileName: String(item.fileName || "").trim(),
      gastoType: normalizeTicketGastoType(item.gastoType),
    };

    if (normalizedKind === "link" || (normalizedKind !== "general" && normalizedStatus === null)) {
      return {
        ...baseItem,
        kind: "link" as const,
      };
    }

    return {
      ...baseItem,
      kind: "general" as const,
      status: normalizedStatus,
    };
  });
};

const normalizeSelectedLinkItems = (raw: unknown): ExpenseTicketLinkCard[] => {
  const items = normalizeListItems(raw);
  return items.map((item) => ({
    kind: "link",
    fileId: item.fileId,
    description: item.description,
    processedByAI: item.processedByAI,
    currencyCode: item.currencyCode,
    totalAmount: item.totalAmount,
    transDate: item.transDate,
    fileName: item.fileName,
    gastoType: item.gastoType,
  }));
};

const normalizeSelectionMode = (value: unknown): ExpenseTicketLinkSelectionMode => {
  return value === "filtered" ? "filtered" : "selected";
};

const normalizeExcludedIds = (raw: unknown): string[] => {
  if (!Array.isArray(raw)) return [];

  const ids = new Set<string>();
  for (const entry of raw) {
    const fileId = String(entry || "").trim();
    if (!fileId) continue;
    ids.add(fileId);
  }
  return Array.from(ids);
};

const normalizeFilteredSelectionTotal = (value: unknown): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : 0;
};

// Falls back to a lean payload when the full list snapshot cannot be persisted reliably.
const toCompactState = (state: ExpenseTicketsCachedState): ExpenseTicketsCachedState => {
  return {
    ...state,
    items: [],
    total: 0,
  };
};

const normalizeState = (raw: ExpenseTicketsCachedState | null): ExpenseTicketsCachedState | null => {
  if (!raw || typeof raw !== "object") return null;

  const pageRaw = Number(raw.page);
  const page = Number.isFinite(pageRaw) && pageRaw > 0 ? Math.floor(pageRaw) : 1;

  const scrollRaw = Number(raw.scrollY);
  const scrollY = Number.isFinite(scrollRaw) && scrollRaw >= 0 ? Math.floor(scrollRaw) : 0;
  const items = normalizeListItems((raw as { items?: unknown }).items);
  const selectedTickets = normalizeSelectedLinkItems((raw as { selectedTickets?: unknown }).selectedTickets);
  const totalRaw = Number((raw as { total?: unknown }).total);
  const total = Number.isFinite(totalRaw) && totalRaw >= 0 ? totalRaw : items.length;

  return {
    filters: normalizeExpenseTicketFilterSnapshot(raw.filters),
    page,
    scrollY,
    focusFileId: String(raw.focusFileId || "").trim(),
    items,
    selectedTickets,
    total,
    linkModeSheetId: String((raw as { linkModeSheetId?: unknown }).linkModeSheetId || "").trim(),
    linkModeLineId: String((raw as { linkModeLineId?: unknown }).linkModeLineId || "").trim(),
    selectionMode: normalizeSelectionMode((raw as { selectionMode?: unknown }).selectionMode),
    excludedIds: normalizeExcludedIds((raw as { excludedIds?: unknown }).excludedIds),
    filteredSelectionFilters: (raw as { filteredSelectionFilters?: ExpenseTicketAppliedFilterSnapshot | null })
      .filteredSelectionFilters
      ? normalizeExpenseTicketFilterSnapshot(
          (raw as { filteredSelectionFilters?: ExpenseTicketAppliedFilterSnapshot | null }).filteredSelectionFilters
        )
      : null,
    filteredSelectionTotal: normalizeFilteredSelectionTotal(
      (raw as { filteredSelectionTotal?: unknown }).filteredSelectionTotal
    ),
  };
};

// Centralizes cache persistence for returning from ticket detail to list.
export const useExpenseTicketsFilterCache = () => {
  const writeCachedState = useCallback((state: ExpenseTicketsCachedState): void => {
    const normalized = normalizeState(state);
    if (!normalized) return;

    const keys = getScopedKeys();
    setSessionJsonWithExpiry(keys.filterKey, normalized, EXPENSE_TICKETS_CACHE_TTL_MS);
    if (!getSessionJsonWithExpiry<ExpenseTicketsCachedState>(keys.filterKey)) {
      setSessionJsonWithExpiry(keys.filterKey, toCompactState(normalized), EXPENSE_TICKETS_CACHE_TTL_MS);
    }
    setSessionValueWithExpiry(keys.returnFlagKey, "1", EXPENSE_TICKETS_CACHE_TTL_MS);
    setSessionValueWithExpiry(keys.returnModeKey, "restore", EXPENSE_TICKETS_CACHE_TTL_MS);
  }, []);

  const readCachedState = useCallback((): ExpenseTicketsCachedState | null => {
    const keys = getScopedKeys();
    const raw = getSessionJsonWithExpiry<ExpenseTicketsCachedState>(keys.filterKey);
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

  // Distinguishes normal detail returns from flows that must reopen blank filters.
  const consumeReturnMode = useCallback((): ExpenseTicketsReturnMode | null => {
    const keys = getScopedKeys();
    const raw = getSessionValueWithExpiry(keys.returnModeKey);
    removeSessionValueWithExpiry(keys.returnModeKey);

    if (raw === "restore" || raw === "reset_filters") {
      return raw;
    }

    return null;
  }, []);

  const saveCachedState = useCallback((state: ExpenseTicketsCachedState): void => {
    writeCachedState(state);
  }, [writeCachedState]);

  const invalidateCachedListForRefetch = useCallback((): void => {
    const currentState = readCachedState();
    if (!currentState) return;

    writeCachedState({
      ...currentState,
      focusFileId: "",
      items: [],
      total: 0,
    });
  }, [readCachedState, writeCachedState]);

  // Marks one return to the ticket list as a blank-filter reset after delete.
  const markResetFiltersReturn = useCallback((): void => {
    const keys = getScopedKeys();
    removeSessionValueWithExpiry(keys.filterKey);
    setSessionValueWithExpiry(keys.returnFlagKey, "1", EXPENSE_TICKETS_CACHE_TTL_MS);
    setSessionValueWithExpiry(keys.returnModeKey, "reset_filters", EXPENSE_TICKETS_CACHE_TTL_MS);
  }, []);

  const clearCachedState = useCallback(() => {
    const keys = getScopedKeys();
    removeSessionValueWithExpiry(keys.filterKey);
    removeSessionValueWithExpiry(keys.returnFlagKey);
    removeSessionValueWithExpiry(keys.returnModeKey);
  }, []);

  return {
    readCachedState,
    consumeReturnFlag,
    consumeReturnMode,
    saveCachedState,
    invalidateCachedListForRefetch,
    markResetFiltersReturn,
    clearCachedState,
  };
};
