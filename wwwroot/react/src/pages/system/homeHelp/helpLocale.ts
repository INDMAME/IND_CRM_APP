import { HELP_RESPONSE_LOCALES, type HelpResponseLocale } from "./helpTypes.ts";

// Resolves the global app culture to one response locale accepted by the help API.
export const normalizeHelpResponseLocale = (value: string): HelpResponseLocale => {
  const normalizedValue = String(value || "").trim().toLowerCase();
  const match = HELP_RESPONSE_LOCALES.find((locale) => locale.toLowerCase() === normalizedValue);
  return match || "es-ES";
};
