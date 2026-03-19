import type { ComponentType } from "react";
import type { ChatMessage } from "./chatMessageContract.ts";

export type AssistantChatQuickAction<TActionId extends string = string> = {
  id: TActionId;
  label: string;
  question: string;
  icon?: ComponentType<{ className?: string }>;
};

export type AssistantChatMessageState = "done" | "loading" | "error";

export type AssistantChatMessageMeta = {
  totalSourceRecords?: number | null;
  retrievalMode?: string | null;
  truncated?: boolean | null;
  traceId?: string;
  warnings?: string[];
  retryAfter?: string | null;
  httpStatus?: number;
};

export type AssistantChatMessage = {
  id: string;
  role: "user" | "assistant";
  message: ChatMessage;
  state: AssistantChatMessageState;
  meta?: AssistantChatMessageMeta;
  retryQuestion?: string | null;
};

export type {
  ChatMessage,
  ChartMessage,
  ChartPayload,
  ChartType,
  ChartTypeChoiceMessage,
  MarkdownMessage,
  TableMessage,
  TablePayload,
  ValidationResult,
  VisualizationType,
} from "./chatMessageContract.ts";
