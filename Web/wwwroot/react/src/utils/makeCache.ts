// Keeps a bounded LRU cache with absolute expiry and optional per-entry lifetime.
export const makeCache = <T>(limit = 10, ttlMs = Number.POSITIVE_INFINITY) => {
  const capacity = Number.isFinite(limit) ? Math.max(0, Math.floor(limit)) : 10;
  const map = new Map<string, { value: T; expiresAt: number }>();

  const readEntry = (key: string) => {
    const entry = map.get(key);
    if (entry && entry.expiresAt <= Date.now()) {
      map.delete(key);
      return undefined;
    }
    return entry;
  };

  return {
    get: (key: string): T | undefined => {
      const entry = readEntry(key);
      if (!entry) return undefined;
      map.delete(key);
      map.set(key, entry);
      return entry.value;
    },
    set: (key: string, value: T, lifetimeMs = ttlMs): void => {
      map.delete(key);
      if (capacity === 0 || !(lifetimeMs > 0)) return;
      for (const existingKey of map.keys()) readEntry(existingKey);
      map.set(key, { value, expiresAt: Date.now() + lifetimeMs });
      while (map.size > capacity) {
        const oldest = map.keys().next();
        if (oldest.done) break;
        map.delete(oldest.value);
      }
    },
    has: (key: string): boolean => readEntry(key) !== undefined,
    delete: (key: string): boolean => map.delete(key),
    clear: (): void => map.clear(),
  };
};
