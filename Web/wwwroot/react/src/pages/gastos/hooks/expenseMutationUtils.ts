import type React from "react";
import { flashActionMark } from "../../../utils/visitasHistory.ts";
import { parseExpenseNumericInput } from "../utils/expenseNumberFormat.ts";
import { getActionErrorMark, resolveActionError, type ActionError } from "../../../utils/actionError.ts";

type MutationSetters = {
  setModalError: React.Dispatch<React.SetStateAction<ActionError>>;
  setBusy: React.Dispatch<React.SetStateAction<boolean>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
};

type ExecuteExpenseMutationArgs<T> = MutationSetters & {
  startStatus: string;
  fallbackErrorMessage: string;
  action: () => Promise<T>;
  flashOnError?: boolean;
};

// Parses decimal text input supporting grouped and decimal separators.
export const parseDecimalInput = (raw: string): number | null => {
  return parseExpenseNumericInput(raw);
};

// Runs an expense mutation with shared busy/error/status handling.
export const executeExpenseMutation = async <T>({
  startStatus,
  fallbackErrorMessage,
  action,
  flashOnError = true,
  setModalError,
  setBusy,
  setStatus,
}: ExecuteExpenseMutationArgs<T>): Promise<{ ok: true; value: T } | { ok: false }> => {
  setModalError("");
  setBusy(true);
  setStatus(startStatus);

  try {
    const value = await action();
    return { ok: true, value };
  } catch (error) {
    const feedback = resolveActionError(error, fallbackErrorMessage);
    setModalError(feedback);
    setStatus("");
    if (flashOnError) {
      flashActionMark(getActionErrorMark(feedback), 1500);
    }
    return { ok: false };
  } finally {
    setBusy(false);
  }
};
