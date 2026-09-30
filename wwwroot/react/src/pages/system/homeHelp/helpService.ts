import { ApiFetchError, fetchJson } from "../../../services/apiService.ts";
import { indT } from "../../../utils/indI18n.ts";
import type {
  HelpApiEnvelope,
  HelpAskRequest,
  HelpAskResponseData,
  HelpCatalog,
  HelpFeedbackRequest,
  HelpFeedbackResponseData,
  HelpResponseLocale,
  HelpTopic,
} from "./helpTypes.ts";

const HELP_API_BASE = "/api/help";

// Returns envelope data or raises one standard fetch error for a failed command.
const requireEnvelopeData = <T>(envelope: HelpApiEnvelope<T>): T => {
  if (envelope?.success !== false && envelope?.data) {
    return envelope.data;
  }

  throw new ApiFetchError(
    String(envelope?.message || indT("Api_RequestFailed", "Request failed.")),
    undefined,
    JSON.stringify(envelope || {})
  );
};

// Loads the localized topic catalog used by the Home help menu.
export const fetchHelpCatalog = async (
  responseLocale: HelpResponseLocale,
  signal?: AbortSignal
): Promise<HelpCatalog> => {
  const envelope = await fetchJson<HelpApiEnvelope<HelpCatalog>>(
    `${HELP_API_BASE}/catalog?responseLocale=${encodeURIComponent(responseLocale)}`,
    { method: "GET", signal, suppressPermissionModal: true }
  );
  return requireEnvelopeData(envelope);
};

// Loads one localized topic for source inspection without invoking AI.
export const fetchHelpTopic = async (
  topicId: string,
  responseLocale: HelpResponseLocale,
  signal?: AbortSignal
): Promise<HelpTopic> => {
  const safeTopicId = encodeURIComponent(String(topicId || "").trim());
  const envelope = await fetchJson<HelpApiEnvelope<HelpTopic>>(
    `${HELP_API_BASE}/topics/${safeTopicId}?responseLocale=${encodeURIComponent(responseLocale)}`,
    { method: "GET", signal, suppressPermissionModal: true }
  );
  return requireEnvelopeData(envelope);
};

// Sends one bounded page-local question to the CRM help assistant.
export const askCrmHelp = async (
  request: HelpAskRequest,
  signal?: AbortSignal
): Promise<HelpAskResponseData> => {
  const envelope = await fetchJson<HelpApiEnvelope<HelpAskResponseData>>(`${HELP_API_BASE}/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
    signal,
    suppressPermissionModal: true,
  });
  return requireEnvelopeData(envelope);
};

// Sends one signed rating without retaining it in browser storage.
export const submitCrmHelpFeedback = async (
  request: HelpFeedbackRequest,
  signal?: AbortSignal
): Promise<HelpFeedbackResponseData> => {
  const envelope = await fetchJson<HelpApiEnvelope<HelpFeedbackResponseData>>(`${HELP_API_BASE}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
    signal,
    suppressPermissionModal: true,
  });
  return requireEnvelopeData(envelope);
};
