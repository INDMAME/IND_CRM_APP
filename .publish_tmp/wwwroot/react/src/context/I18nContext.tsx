import React, { createContext, useContext, useMemo } from "react";

type I18nDict = Record<string, string>;

type I18nValue = {
  dictionary: I18nDict;
  t: (key: string, fallback?: string) => string;
  format: (key: string, fallback: string | undefined, ...args: Array<string | number>) => string;
};

const defaultDict: I18nDict = {};

const defaultValue: I18nValue = {
  dictionary: defaultDict,
  t: (key, fallback) => fallback || key,
  format: (key, fallback, ...args) => {
    const template = fallback || key;
    return String(template).replace(/\{(\d+)\}/g, (_, idx) => String(args[Number(idx)] ?? ""));
  },
};

const I18nContext = createContext<I18nValue>(defaultValue);

type ProviderProps = {
  children: React.ReactNode;
  dictionary?: I18nDict;
};

export const I18nProvider = ({ children, dictionary }: ProviderProps) => {
  const dict = dictionary || (globalThis.__IND_I18N__ || {});

  const value = useMemo<I18nValue>(() => {
    const t = (key: string, fallback?: string) => {
      const value = dict[key];
      if (typeof value === "string" && value.trim()) return value;
      return fallback || key;
    };
    const format = (key: string, fallback: string | undefined, ...args: Array<string | number>) => {
      const template = t(key, fallback);
      return String(template).replace(/\{(\d+)\}/g, (_, idx) => String(args[Number(idx)] ?? ""));
    };
    return { dictionary: dict, t, format };
  }, [dict]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);
