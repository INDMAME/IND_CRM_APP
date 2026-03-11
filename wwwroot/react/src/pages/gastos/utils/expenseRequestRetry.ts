import { ApiFetchError } from "../../../services/apiService.ts";

const ABORT_ERROR_MESSAGE_HINTS = [
  "signal is aborted",
  "aborted without reason",
  "the operation was aborted",
  "the user aborted a request",
  "user aborted a request",
];
const RETRYABLE_ERROR_MESSAGE_HINTS = [
  "failed to fetch",
  "networkerror",
  "network request failed",
  "load failed",
  "timeout",
  "temporarily unavailable",
];
const RETRYABLE_STATUS_CODES = new Set([408, 429, 500, 502, 503, 504]);
const DEFAULT_MAX_ATTEMPTS = 2;
const DEFAULT_RETRY_DELAY_MS = 250;

export type ExpenseReadRetryOptions = {
  maxAttempts?: number;
  retryDelayMs?: number;
  signal?: AbortSignal;
};

const normalizeErrorText = (value: unknown): string => {
  return String(value || "").trim().toLowerCase();
};

export const isExpenseAbortLikeError = (error: unknown, signal?: AbortSignal): boolean => {
  if (signal?.aborted) return true;
  if (error instanceof DOMException && error.name === "AbortError") return true;
  if (!(error instanceof Error)) return false;

  const normalizedName = normalizeErrorText(error.name);
  const normalizedMessage = normalizeErrorText(error.message);
  if (normalizedName === "aborterror") return true;

  return ABORT_ERROR_MESSAGE_HINTS.some((hint) => normalizedMessage.includes(hint));
};

const isRetryableExpenseReadError = (error: unknown, signal?: AbortSignal): boolean => {
  if (isExpenseAbortLikeError(error, signal)) return false;

  if (error instanceof ApiFetchError) {
    const status = Number(error.status);
    return RETRYABLE_STATUS_CODES.has(status);
  }

  if (error instanceof TypeError) {
    return true;
  }

  if (!(error instanceof Error)) return false;

  const normalizedMessage = normalizeErrorText(error.message);
  return RETRYABLE_ERROR_MESSAGE_HINTS.some((hint) => normalizedMessage.includes(hint));
};

const waitForRetryDelay = async (delayMs: number, signal?: AbortSignal): Promise<void> => {
  if (delayMs <= 0) return;
  if (signal?.aborted) {
    throw new DOMException("Aborted", "AbortError");
  }

  await new Promise<void>((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      if (signal) {
        signal.removeEventListener("abort", handleAbort);
      }
      resolve();
    }, delayMs);

    const handleAbort = () => {
      window.clearTimeout(timeoutId);
      signal?.removeEventListener("abort", handleAbort);
      reject(new DOMException("Aborted", "AbortError"));
    };

    signal?.addEventListener("abort", handleAbort, { once: true });
  });
};

// Retries idempotent expense read requests once after transient failures.
export const runExpenseReadRequestWithRetry = async <T>(
  request: () => Promise<T>,
  options?: ExpenseReadRetryOptions
): Promise<T> => {
  const maxAttemptsRaw = Number(options?.maxAttempts ?? DEFAULT_MAX_ATTEMPTS);
  const maxAttempts = Number.isFinite(maxAttemptsRaw) && maxAttemptsRaw > 0 ? Math.floor(maxAttemptsRaw) : DEFAULT_MAX_ATTEMPTS;
  const retryDelayRaw = Number(options?.retryDelayMs ?? DEFAULT_RETRY_DELAY_MS);
  const retryDelayMs = Number.isFinite(retryDelayRaw) && retryDelayRaw >= 0 ? retryDelayRaw : DEFAULT_RETRY_DELAY_MS;
  const signal = options?.signal;

  let lastError: unknown = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await request();
    } catch (error) {
      lastError = error;
      if (!isRetryableExpenseReadError(error, signal) || attempt >= maxAttempts) {
        throw error;
      }

      await waitForRetryDelay(retryDelayMs * attempt, signal);
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Expense read request failed.");
};
