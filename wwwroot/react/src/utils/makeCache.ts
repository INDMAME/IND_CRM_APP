export const makeCache = <T>(limit = 10) => {
  const map = new Map<string, T>();
  return {
    get: (k: string) => map.get(k),
    set: (k: string, v: T) => {
      if (map.has(k)) map.delete(k);
      map.set(k, v);
      if (map.size > limit) {
        const first = map.keys().next().value;
        if (first) map.delete(first);
      }
    },
    has: (k: string) => map.has(k),
    clear: () => map.clear(),
  };
};
