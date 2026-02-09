import { getSessionValueWithExpiry, removeSessionValueWithExpiry, setSessionValueWithExpiry } from "./sessionExpiry.ts";

export const TEXT_EDITOR_PREFIX = "ind_texteditor_";
const TEXT_EDITOR_VALUE_TTL_MS = 12 * 60 * 60 * 1000;
const TEXT_EDITOR_RETURN_URL_TTL_MS = 2 * 60 * 60 * 1000;

const toFieldStorageKey = (fieldId: string) => `${TEXT_EDITOR_PREFIX}${fieldId}`;
const toReturnUrlKey = (fieldId: string) => `${TEXT_EDITOR_PREFIX}${fieldId}_returnUrl`;

const normalizeFieldId = (fieldId: string): string => String(fieldId || "").trim();

export const readTextEditorValue = (fieldId: string): string | null => {
  const id = normalizeFieldId(fieldId);
  if (!id) return null;
  return getSessionValueWithExpiry(toFieldStorageKey(id));
};

export const writeTextEditorValue = (fieldId: string, value: string): void => {
  const id = normalizeFieldId(fieldId);
  if (!id) return;
  setSessionValueWithExpiry(toFieldStorageKey(id), String(value || ""), TEXT_EDITOR_VALUE_TTL_MS);
};

export const primeTextEditorValue = (fieldId: string, value: string): void => {
  const id = normalizeFieldId(fieldId);
  if (!id) return;
  const key = toFieldStorageKey(id);
  const existing = getSessionValueWithExpiry(key);
  if (existing !== null) return;
  setSessionValueWithExpiry(key, String(value || ""), TEXT_EDITOR_VALUE_TTL_MS);
};

export const clearTextEditorValue = (fieldId: string): void => {
  const id = normalizeFieldId(fieldId);
  if (!id) return;
  removeSessionValueWithExpiry(toFieldStorageKey(id));
};

export const setTextEditorReturnUrl = (fieldId: string, returnUrl: string): void => {
  const id = normalizeFieldId(fieldId);
  const url = String(returnUrl || "").trim();
  if (!id || !url) return;
  setSessionValueWithExpiry(toReturnUrlKey(id), url, TEXT_EDITOR_RETURN_URL_TTL_MS);
};

export const getTextEditorReturnUrl = (fieldId: string): string => {
  const id = normalizeFieldId(fieldId);
  if (!id) return "";
  return getSessionValueWithExpiry(toReturnUrlKey(id)) || "";
};

export const clearTextEditorReturnUrl = (fieldId: string): void => {
  const id = normalizeFieldId(fieldId);
  if (!id) return;
  removeSessionValueWithExpiry(toReturnUrlKey(id));
};

export const readAndClearTextEditorValue = (fieldId: string): string | null => {
  const id = normalizeFieldId(fieldId);
  if (!id) return null;
  const value = getSessionValueWithExpiry(toFieldStorageKey(id));
  if (value === null) return null;
  removeSessionValueWithExpiry(toFieldStorageKey(id));
  return value;
};
