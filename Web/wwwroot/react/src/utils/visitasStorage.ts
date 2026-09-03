import { makeCache } from "./makeCache.ts";
import {
  canPersistSensitiveBrowserState,
  getBrowserStorageScopeToken,
} from "./browserStorageScope.ts";

const STORAGE_SCOPE = getBrowserStorageScopeToken() || "scope-unavailable";

export const VISIT_DRAFT_KEY = `visitas_draft_v2_${STORAGE_SCOPE}`;
export const CONTACTS_STORAGE_KEY = `visitas_contacts_cache_v2_${STORAGE_SCOPE}`;
export const CONTACTS_SELECTION_KEY = `visitas_contacts_selected_v2_${STORAGE_SCOPE}`;
export const CREATE_FRESH_PARAM = "fresh";

const clientCache = makeCache<unknown[]>(10);
const contactsCache = makeCache<unknown[]>(10);

const cacheKeyWithScope = (key: string) => `${STORAGE_SCOPE}::${key}`;

const readStorage = (key: string): Record<string, unknown> => {
  if (!canPersistSensitiveBrowserState()) return {};
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

const writeStorage = (key: string, data: Record<string, unknown>) => {
  if (!canPersistSensitiveBrowserState()) return;
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore
  }
};

export const getClientCache = (query: string): unknown[] | null => {
  if (!canPersistSensitiveBrowserState()) return null;
  const cacheKey = cacheKeyWithScope(query);
  if (!clientCache.has(cacheKey)) return null;
  return clientCache.get(cacheKey) || null;
};

export const hasClientCache = (query: string): boolean => {
  return canPersistSensitiveBrowserState() && clientCache.has(cacheKeyWithScope(query));
};

export const setClientCache = (query: string, items: unknown[]): void => {
  if (!canPersistSensitiveBrowserState()) return;
  clientCache.set(cacheKeyWithScope(query), items);
};

export const getCachedContacts = (account: string): unknown[] | null => {
  if (!canPersistSensitiveBrowserState()) return null;
  const cacheKey = cacheKeyWithScope(account);
  if (contactsCache.has(cacheKey)) return contactsCache.get(cacheKey) || null;
  const store = readStorage(CONTACTS_STORAGE_KEY);
  const cached = store[account];
  if (Array.isArray(cached)) {
    contactsCache.set(cacheKey, cached);
    return cached;
  }
  return null;
};

export const setCachedContacts = (account: string, items: unknown[]): void => {
  if (!canPersistSensitiveBrowserState()) return;
  contactsCache.set(cacheKeyWithScope(account), items);
  const store = readStorage(CONTACTS_STORAGE_KEY);
  store[account] = items;
  writeStorage(CONTACTS_STORAGE_KEY, store);
};

export const getStoredSelection = (account: string): unknown[] => {
  const store = readStorage(CONTACTS_SELECTION_KEY);
  const raw = store[account];
  return Array.isArray(raw) ? raw : [];
};

export const setStoredSelection = (account: string, items: unknown[]): void => {
  const store = readStorage(CONTACTS_SELECTION_KEY);
  store[account] = items;
  writeStorage(CONTACTS_SELECTION_KEY, store);
};

export const clearStoredSelection = (account: string): void => {
  const store = readStorage(CONTACTS_SELECTION_KEY);
  if (store[account]) {
    delete store[account];
    writeStorage(CONTACTS_SELECTION_KEY, store);
  }
};

export const clearCreateSelectionCache = (): void => {
  try {
    sessionStorage.removeItem(VISIT_DRAFT_KEY);
    sessionStorage.removeItem(CONTACTS_STORAGE_KEY);
    sessionStorage.removeItem(CONTACTS_SELECTION_KEY);
  } catch {
    // ignore
  }
};

// Reports whether visit creation has scoped state that can be restored.
export const hasCreateSelectionCache = (): boolean => {
  if (!canPersistSensitiveBrowserState()) return false;
  try {
    return !!(
      sessionStorage.getItem(VISIT_DRAFT_KEY) ||
      sessionStorage.getItem(CONTACTS_STORAGE_KEY) ||
      sessionStorage.getItem(CONTACTS_SELECTION_KEY)
    );
  } catch {
    return false;
  }
};

export const stripFreshParam = (): void => {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    if (!url.searchParams.has(CREATE_FRESH_PARAM)) return;
    url.searchParams.delete(CREATE_FRESH_PARAM);
    const next = `${url.pathname}${url.search}${url.hash}`;
    window.history.replaceState({}, "", next);
  } catch {
    // ignore
  }
};
