import { resolveActionError, type ActionErrorDetails } from "../utils/actionError.ts";

export type ActionFeedbackRequest = ActionErrorDetails & { title?: string; onDismiss?: () => void };
type Listener = (request: ActionFeedbackRequest) => void;
type FeedbackStore = { pending: ActionFeedbackRequest[]; listener?: Listener };

// Shares one queue across React islands, including errors raised before the host mounts.
const getStore = (): FeedbackStore => {
  const scope = globalThis as typeof globalThis & { __indActionFeedback?: FeedbackStore };
  return scope.__indActionFeedback ??= { pending: [] };
};

// Publishes displayable error metadata without exposing the original HTTP response.
const publish = (error: unknown, options: { title?: string; severity?: "error" | "warning"; onDismiss?: () => void }): void => {
  const details = resolveActionError(error);
  if (!details.message) { options.onDismiss?.(); return; }
  const request = { ...details, ...options };
  const store = getStore();
  if (store.listener) store.listener(request);
  else store.pending.push(request);
};

// Queues ordinary failures without blocking their owning operation.
export const showActionError = (error: unknown, options: { title?: string; severity?: "error" | "warning" } = {}): void =>
  publish(error, options);

// Keeps completed partial operations on screen until their recovery warning is acknowledged.
export const acknowledgeActionError = (error: unknown): Promise<void> =>
  new Promise(resolve => publish(error, { onDismiss: resolve }));

// Deduplicates the same failure without merging different severity levels or correlation IDs.
export const getActionFeedbackKey = (request: ActionFeedbackRequest): string =>
  JSON.stringify([request.message, request.traceId, request.errorCode, request.severity]);

// Delivers queued failures once and unregisters only the subscribing host.
export const subscribeActionErrors = (listener: Listener): (() => void) => {
  const store = getStore();
  store.listener = listener;
  store.pending.splice(0).forEach(listener);
  return () => { if (store.listener === listener) store.listener = undefined; };
};
