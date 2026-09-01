import { canPersistSensitiveBrowserState } from "./browserStorageScope.ts";

const EXPIRY_SUFFIX = "__exp";

const toExpiryKey = (key: string) => `${key}${EXPIRY_SUFFIX}`;

const safeNow = () => Date.now();

// Reads a session value and enforces expiry when an expiry marker exists.
export const getSessionValueWithExpiry = (key: string): string | null => {
  if (!key || !canPersistSensitiveBrowserState()) return null;
  try {
    const raw = sessionStorage.getItem(key);
    if (raw === null) return null;

    const expiryRaw = sessionStorage.getItem(toExpiryKey(key));
    if (!expiryRaw) return raw;

    const expiry = Number(expiryRaw);
    if (!Number.isFinite(expiry)) {
      sessionStorage.removeItem(toExpiryKey(key));
      return raw;
    }

    if (safeNow() <= expiry) return raw;

    sessionStorage.removeItem(key);
    sessionStorage.removeItem(toExpiryKey(key));
    return null;
  } catch {
    return null;
  }
};

// Writes a session value and stores an optional expiry marker.
export const setSessionValueWithExpiry = (key: string, value: string, ttlMs?: number): void => {
  if (!key || !canPersistSensitiveBrowserState()) return;
  try {
    sessionStorage.setItem(key, value);
    if (!ttlMs || ttlMs <= 0) {
      sessionStorage.removeItem(toExpiryKey(key));
      return;
    }
    const expiresAt = safeNow() + ttlMs;
    sessionStorage.setItem(toExpiryKey(key), String(expiresAt));
  } catch {
    // Ignore storage access errors.
  }
};

// Removes a session value and its expiry marker.
export const removeSessionValueWithExpiry = (key: string): void => {
  if (!key) return;
  try {
    sessionStorage.removeItem(key);
    sessionStorage.removeItem(toExpiryKey(key));
  } catch {
    // Ignore storage access errors.
  }
};

// Reads a JSON session value with expiry and clears malformed payloads.
export const getSessionJsonWithExpiry = <T>(key: string): T | null => {
  const raw = getSessionValueWithExpiry(key);
  if (raw === null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    removeSessionValueWithExpiry(key);
    return null;
  }
};

// Writes a JSON session value with expiry.
export const setSessionJsonWithExpiry = <T>(key: string, value: T, ttlMs?: number): void => {
  try {
    setSessionValueWithExpiry(key, JSON.stringify(value), ttlMs);
  } catch {
    // Ignore serialization/storage errors.
  }
};
