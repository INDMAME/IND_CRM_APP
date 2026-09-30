import { makeCache } from "./makeCache.ts";
import {
  canPersistSensitiveBrowserState,
  captureSensitiveBrowserState,
  getBrowserStorageScopeToken,
} from "./browserStorageScope.ts";

const STORAGE_SCOPE = getBrowserStorageScopeToken() || "scope-unavailable";

export const VISIT_DRAFT_KEY = `visitas_draft_v2_${STORAGE_SCOPE}`;
export const VISIT_CREATE_PROGRESS_KEY = `visitas_create_progress_v2_${STORAGE_SCOPE}`;
export const CONTACTS_STORAGE_KEY = `visitas_contacts_cache_v2_${STORAGE_SCOPE}`;
export const CONTACTS_SELECTION_KEY = `visitas_contacts_selected_v2_${STORAGE_SCOPE}`;
export const CREATE_FRESH_PARAM = "fresh";

export const VISIT_LOOKUP_CACHE_TTL_MS = 5 * 60 * 1000;
const LOOKUP_CACHE_CAPACITY = 10;
const MAX_CACHED_CONTACTS = 200;

export type CachedContacts = {
  items: unknown[];
  lastLoadedPage: number;
  hasMore: boolean;
  expiresAt: number;
};

const clientCache = makeCache<unknown[]>(LOOKUP_CACHE_CAPACITY, VISIT_LOOKUP_CACHE_TTL_MS);
const contactsCache = makeCache<CachedContacts>(LOOKUP_CACHE_CAPACITY, VISIT_LOOKUP_CACHE_TTL_MS);
let memoryStateSnapshot = "";
let lookupGeneration = 0;

// Clears memory when the central identity guard advances its invalidation epoch.
const canUseLookupState = (): boolean => {
  const snapshot = captureSensitiveBrowserState();
  if (snapshot !== memoryStateSnapshot) {
    clientCache.clear();
    contactsCache.clear();
    memoryStateSnapshot = snapshot;
  }
  return !!snapshot && canPersistSensitiveBrowserState() && getBrowserStorageScopeToken() === STORAGE_SCOPE;
};

// Captures both identity changes and explicit lookup clearing around an async request.
export const captureVisitLookupState = (): string => canUseLookupState() ? `${memoryStateSnapshot}:${lookupGeneration}` : "";

// Prevents a late lookup response from restoring state cleared by the user.
export const isVisitLookupStateCurrent = (snapshot: string): boolean => !!snapshot && snapshot === captureVisitLookupState();

const cacheKeyWithScope = (key: string) => `${STORAGE_SCOPE}::${key}`;

const readStorage = (key: string): Record<string, unknown> => {
  if (!canUseLookupState()) return {};
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as Record<string, unknown> : {};
  } catch {
    return {};
  }
};

const writeStorage = (key: string, data: Record<string, unknown>) => {
  if (!canUseLookupState()) return;
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore
  }
};

export const getClientCache = (query: string): unknown[] | null => {
  if (!canUseLookupState()) return null;
  const cacheKey = cacheKeyWithScope(query);
  if (!clientCache.has(cacheKey)) return null;
  return clientCache.get(cacheKey) || null;
};

export const hasClientCache = (query: string): boolean => {
  return canUseLookupState() && clientCache.has(cacheKeyWithScope(query));
};

export const setClientCache = (query: string, items: unknown[]): void => {
  if (!canUseLookupState()) return;
  clientCache.set(cacheKeyWithScope(query), items);
};

// Rejects expired and legacy snapshots whose pagination cannot be restored safely.
const isCurrentContactsEntry = (value: unknown): value is CachedContacts => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const entry = value as CachedContacts;
  return Array.isArray(entry.items) && entry.items.length <= MAX_CACHED_CONTACTS &&
    Number.isInteger(entry.lastLoadedPage) && entry.lastLoadedPage > 0 &&
    typeof entry.hasMore === "boolean" && Number.isFinite(entry.expiresAt) && entry.expiresAt > Date.now();
};

// Keeps only recent, bounded lookup entries without evicting visit drafts or selections.
const readContactsStore = (): Record<string, CachedContacts> => {
  const store = readStorage(CONTACTS_STORAGE_KEY);
  return Object.fromEntries(Object.entries(store)
    .filter((entry): entry is [string, CachedContacts] => isCurrentContactsEntry(entry[1]))
    .sort((left, right) => right[1].expiresAt - left[1].expiresAt)
    .slice(0, LOOKUP_CACHE_CAPACITY));
};

export const getCachedContacts = (account: string): CachedContacts | null => {
  if (!canUseLookupState()) return null;
  const cacheKey = cacheKeyWithScope(account);
  if (contactsCache.has(cacheKey)) return contactsCache.get(cacheKey) || null;
  const store = readContactsStore();
  writeStorage(CONTACTS_STORAGE_KEY, store);
  const cached = store[account];
  if (cached) {
    contactsCache.set(cacheKey, cached, cached.expiresAt - Date.now());
    return cached;
  }
  return null;
};

export const setCachedContacts = (account: string, items: unknown[], lastLoadedPage: number, hasMore: boolean): void => {
  if (!canUseLookupState()) return;
  const store = readContactsStore();
  const cacheKey = cacheKeyWithScope(account);
  delete store[account];
  contactsCache.delete(cacheKey);
  // Large lists stay fully available in the component but are not duplicated in storage.
  if (items.length <= MAX_CACHED_CONTACTS) {
    const entry = { items, lastLoadedPage, hasMore, expiresAt: Date.now() + VISIT_LOOKUP_CACHE_TTL_MS };
    if (isCurrentContactsEntry(entry)) {
      contactsCache.set(cacheKey, entry);
      const remaining = Object.entries(store).slice(0, LOOKUP_CACHE_CAPACITY - 1);
      writeStorage(CONTACTS_STORAGE_KEY, { ...Object.fromEntries(remaining), [account]: entry });
      return;
    }
  }
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
  lookupGeneration += 1;
  clientCache.clear();
  contactsCache.clear();
  try {
    sessionStorage.removeItem(VISIT_DRAFT_KEY);
    sessionStorage.removeItem(VISIT_CREATE_PROGRESS_KEY);
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
