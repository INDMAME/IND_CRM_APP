import { useCallback, useEffect } from "react";
import { readAndClearTextEditorValue } from "../utils/textEditor.ts";

type FieldBinding = {
  fieldId: string;
  applyValue: (value: string) => void;
};

type Options = {
  applyOnMount?: boolean;
  listenPageShow?: boolean;
  enabled?: boolean;
};

// Synchronizes field values that return from the full-screen text editor.
export const useTextEditorFields = (fields: FieldBinding[], options?: Options) => {
  const applyOnMount = options?.applyOnMount !== false;
  const listenPageShow = options?.listenPageShow !== false;
  const enabled = options?.enabled !== false;

  const applyValues = useCallback(() => {
    if (!enabled) return;

    fields.forEach((field) => {
      const value = readAndClearTextEditorValue(field.fieldId);
      if (value !== null) {
        field.applyValue(value);
      }
    });
  }, [enabled, fields]);

  useEffect(() => {
    if (applyOnMount) {
      applyValues();
    }

    if (!listenPageShow) return undefined;

    const onPageShow = () => applyValues();
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [applyOnMount, applyValues, listenPageShow]);

  return {
    applyValues,
  };
};
