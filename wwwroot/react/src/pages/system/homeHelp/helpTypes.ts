export const HELP_RESPONSE_LOCALES = ["es-ES", "eu-ES", "en", "pt", "it", "zh-Hans"] as const;

export type HelpResponseLocale = (typeof HELP_RESPONSE_LOCALES)[number];
export type HelpResolution = "answered" | "needsSelection" | "notDocumented";
export type HelpFeedbackReason = "incorrect" | "outdated" | "unclear" | "incomplete" | "permissions" | "other";

export type HelpTopicSummary = {
  id: string;
  moduleId: string;
  title: string;
  summary: string;
  routeKey: string;
  hasQuickAnswers: boolean;
};

export type HelpModule = {
  id: string;
  title: string;
  description: string;
  order: number;
  topics: HelpTopicSummary[];
};

export type HelpCatalog = {
  knowledgeVersion: string;
  defaultLocale: string;
  responseLocale: string;
  modules: HelpModule[];
};

export type HelpTopicChunk = {
  id: string;
  heading: string;
  body: string;
  imageRefs: string[];
};

export type HelpQuickAnswer = {
  id: string;
  question: string;
  answer: string;
  sourceChunkIds: string[];
};

export type HelpTopic = {
  id: string;
  moduleId: string;
  title: string;
  summary: string;
  routeKey: string;
  prerequisiteTopicIds: string[];
  relatedTopicIds: string[];
  chunks: HelpTopicChunk[];
  quickAnswers: HelpQuickAnswer[];
  knowledgeVersion: string;
  responseLocale: string;
};

export type HelpHistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

export type HelpAskRequest = {
  question: string;
  responseLocale: HelpResponseLocale;
  selectedTopicId: string | null;
  history: HelpHistoryMessage[];
  clientInteractionId: string;
};

export type HelpCandidate = {
  topicId: string;
  title: string;
  summary: string;
  score: number;
};

export type HelpSource = {
  topicId: string;
  topicTitle: string;
  chunkId: string;
  heading: string;
};

export type HelpAction = {
  type: "navigate" | string;
  routeKey: string;
  label: string;
};

export type HelpAskResponseData = {
  interactionId: string;
  resolution: HelpResolution;
  answer: string;
  candidates: HelpCandidate[];
  sources: HelpSource[];
  actions: HelpAction[];
  knowledgeVersion: string;
  responseLocale: string;
  feedbackToken: string;
  quickAnswerUsed: boolean;
  model: string;
};

export type HelpFeedbackRequest = {
  feedbackToken: string;
  helpful: boolean;
  reason: HelpFeedbackReason | null;
  comment: string | null;
};

export type HelpFeedbackResponseData = {
  accepted: boolean;
};

export type HelpApiEnvelope<T> = {
  success: boolean;
  message?: string | null;
  errorCode?: string | null;
  data?: T | null;
  errors?: Array<{ field?: string; message?: string }>;
  traceId?: string | null;
};

export type HelpAnswerDetails = HelpAskResponseData & {
  question: string;
};

export type HelpDraftSeed = {
  value: string;
  sequence: number;
};
