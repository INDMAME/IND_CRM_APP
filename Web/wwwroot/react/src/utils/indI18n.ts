const getI18n = (): Record<string, string> => {
  return (typeof globalThis !== "undefined" && globalThis.__IND_I18N__) || {};
};

export const indT = (key: string, fallback?: string): string => {
  const dict = getI18n();
  const value = dict[key];
  if (typeof value === "string" && value.trim() && value !== key) return value;
  return fallback || key;
};

export const indFormat = (key: string, fallback: string | undefined, ...args: Array<string | number>) => {
  const template = indT(key, fallback);
  return String(template).replace(/\{(\d+)\}/g, (_, idx) => String(args[Number(idx)] ?? ""));
};
