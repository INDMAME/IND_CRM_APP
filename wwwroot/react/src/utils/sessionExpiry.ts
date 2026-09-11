import { canPersistSensitiveBrowserState } from "./browserStorageScope.ts";

const EXPIRY_SUFFIX = "__exp";
const ENVELOPE_PREFIX = "ind-session-v1:";
const PRUNE_INTERVAL_MS = 60 * 1000;
const OWNED_PREFIXES = ["expense_", "visitas_", "ind_texteditor_", "ind_visit_", "module_data_visibility_v3"];
let lastPrunedAt = Number.NEGATIVE_INFINITY;

type SessionEnvelope = { value: string; expiresAt: number | null };

const toExpiryKey = (key: string) => `${key}${EXPIRY_SUFFIX}`;

const safeNow = () => Date.now();

// Decodes only the versioned format owned by this helper.
const readEnvelope = (raw: string): SessionEnvelope | null => {
  if (!raw.startsWith(ENVELOPE_PREFIX)) return null;
  try {
    const parsed = JSON.parse(raw.slice(ENVELOPE_PREFIX.length)) as SessionEnvelope;
    if (typeof parsed?.value !== "string") return null;
    if (parsed.expiresAt !== null && (typeof parsed.expiresAt !== "number" || !Number.isFinite(parsed.expiresAt))) return null;
    return parsed;
  } catch {
    return null;
  }
};

// Reclaims expired CRM entries without evicting valid drafts or another application's state.
export const pruneExpiredSessionValues = (force = false): void => {
  if (!canPersistSensitiveBrowserState()) return;
  const now = safeNow();
  if (!force && now - lastPrunedAt < PRUNE_INTERVAL_MS) return;
  lastPrunedAt = now;
  try {
    const keys: string[] = [];
    for (let index = 0; index < sessionStorage.length; index += 1) {
      const key = sessionStorage.key(index);
      if (key && OWNED_PREFIXES.some((prefix) => key.startsWith(prefix))) keys.push(key);
    }
    for (const key of keys) {
      if (key.endsWith(EXPIRY_SUFFIX)) {
        if (sessionStorage.getItem(key.slice(0, -EXPIRY_SUFFIX.length)) === null) sessionStorage.removeItem(key);
        continue;
      }
      const raw = sessionStorage.getItem(key);
      if (raw === null) continue;
      const entry = readEnvelope(raw);
      const legacyExpiry = sessionStorage.getItem(toExpiryKey(key));
      const expiresAt = entry ? entry.expiresAt : legacyExpiry ? Number(legacyExpiry) : null;
      if (expiresAt !== null && Number.isFinite(expiresAt) && now > expiresAt) {
        removeSessionValueWithExpiry(key);
      }
    }
  } catch {
    // Cleanup remains optional when browser storage is restricted.
  }
};

// Reads atomic entries and retains compatibility with the previous value plus expiry format.
export const getSessionValueWithExpiry = (key: string): string | null => {
  if (!key || !canPersistSensitiveBrowserState()) return null;
  pruneExpiredSessionValues();
  try {
    const raw = sessionStorage.getItem(key);
    if (raw === null) return null;

    if (raw.startsWith(ENVELOPE_PREFIX)) {
      const entry = readEnvelope(raw);
      if (entry && (entry.expiresAt === null || safeNow() <= entry.expiresAt)) return entry.value;
      removeSessionValueWithExpiry(key);
      return null;
    }

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

// Commits value and expiry in one write and reports whether the new value was saved.
export const setSessionValueWithExpiry = (key: string, value: string, ttlMs?: number): boolean => {
  if (!key || typeof value !== "string" || !canPersistSensitiveBrowserState()) return false;
  if (ttlMs !== undefined && !Number.isFinite(ttlMs)) return false;
  pruneExpiredSessionValues();
  const expiresAt = ttlMs && ttlMs > 0 ? safeNow() + ttlMs : null;
  const serialized = ENVELOPE_PREFIX + JSON.stringify({ value, expiresAt } satisfies SessionEnvelope);
  try {
    sessionStorage.setItem(key, serialized);
  } catch {
    // A full browser store may still contain expired data from other CRM screens.
    pruneExpiredSessionValues(true);
    try {
      sessionStorage.setItem(key, serialized);
    } catch {
      return false;
    }
  }
  try {
    sessionStorage.removeItem(toExpiryKey(key));
  } catch {
    // The atomic entry remains authoritative if an obsolete marker cannot be removed.
  }
  return true;
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
export const setSessionJsonWithExpiry = <T>(key: string, value: T, ttlMs?: number): boolean => {
  try {
    return setSessionValueWithExpiry(key, JSON.stringify(value), ttlMs);
  } catch {
    return false;
  }
};
