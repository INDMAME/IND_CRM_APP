export const TEXT_EDITOR_PREFIX = "ind_texteditor_";

export const readAndClearTextEditorValue = (fieldId: string): string | null => {
  const id = String(fieldId || "").trim();
  if (!id) return null;
  const key = `${TEXT_EDITOR_PREFIX}${id}`;
  try {
    const value = sessionStorage.getItem(key);
    if (value === null) return null;
    sessionStorage.removeItem(key);
    return value;
  } catch {
    return null;
  }
};
