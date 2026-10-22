export type ApiErrorFeedback = {
  message: string;
  errorCode?: string;
  traceId?: string;
  details?: Array<{ label: string; value: string }>;
  onClose?: () => void;
};

let currentError: ApiErrorFeedback | null = null;
const listeners = new Set<() => void>();

// Keep the latest failure available even when the shared popup mounts later.
export const showApiError = (error: ApiErrorFeedback): void => {
  currentError = error;
  listeners.forEach((listener) => listener());
};

// Clear the popup before notifying its owning workflow.
export const closeApiError = (): void => {
  const onClose = currentError?.onClose;
  currentError = null;
  listeners.forEach((listener) => listener());
  onClose?.();
};

// Subscribe once per mounted host and release the listener on unmount.
export const subscribeApiErrors = (listener: () => void): (() => void) => {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
};

// Return a stable snapshot for React's external store subscription.
export const getApiError = (): ApiErrorFeedback | null => currentError;

// Read only public diagnostic identifiers from either supported envelope casing.
export const readApiErrorIdentifiers = (payload: unknown): Pick<ApiErrorFeedback, "errorCode" | "traceId"> => {
  if (!payload || typeof payload !== "object") return {};
  const record = payload as Record<string, unknown>;
  const errorCode = record.ErrorCode ?? record.errorCode;
  const traceId = record.TraceId ?? record.traceId;
  return {
    errorCode: typeof errorCode === "string" ? errorCode.trim() : undefined,
    traceId: typeof traceId === "string" ? traceId.trim() : undefined,
  };
};
