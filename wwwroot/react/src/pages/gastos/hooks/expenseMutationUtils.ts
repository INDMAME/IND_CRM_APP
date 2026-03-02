import type React from "react";
import { flashActionMark } from "../../../utils/visitasHistory.ts";
import { parseExpenseNumericInput } from "../utils/expenseNumberFormat.ts";

type MutationSetters = {
  setModalError: React.Dispatch<React.SetStateAction<string>>;
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
    const message =
      error instanceof Error && error.message
        ? error.message
        : fallbackErrorMessage;
    setModalError(message);
    setStatus(message);
    if (flashOnError) {
      flashActionMark("errorProcess", 1500);
    }
    return { ok: false };
  } finally {
    setBusy(false);
  }
};
