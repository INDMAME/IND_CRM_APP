import type { AssistantChatMessage } from "../../../components/commons/chat/assistantChatTypes.ts";
import type { HelpHistoryMessage } from "./helpTypes.ts";

const MAX_HISTORY_ITEMS = 8;
const MAX_HISTORY_CONTENT_LENGTH = 1600;

export type ReusableHelpTurn = {
  assistantMessage: AssistantChatMessage;
  userMessageId: string;
  history: HelpHistoryMessage[];
};

// Keeps only completed markdown messages that fit the API conversation contract.
export const buildBoundedHelpHistory = (messages: AssistantChatMessage[]): HelpHistoryMessage[] => {
  const history: HelpHistoryMessage[] = [];
  for (const message of messages) {
    if (message.state !== "done" || message.message.type !== "markdown") {
      continue;
    }

    const content = message.message.markdown.slice(0, MAX_HISTORY_CONTENT_LENGTH);
    if (content.trim()) {
      history.push({ role: message.role, content });
    }
  }

  return history.slice(-MAX_HISTORY_ITEMS);
};

// Locates the exact user/assistant pair to retry without repeating that question in history.
export const resolveReusableHelpTurn = (
  messages: AssistantChatMessage[],
  assistantMessageId: string,
  rawQuestion: string
): ReusableHelpTurn | null => {
  const assistantIndex = messages.findIndex((message) =>
    message.id === assistantMessageId && message.role === "assistant"
  );
  if (assistantIndex <= 0) {
    return null;
  }

  const userMessage = messages[assistantIndex - 1];
  const question = String(rawQuestion || "").trim();
  if (
    userMessage.role !== "user" ||
    userMessage.message.type !== "markdown" ||
    userMessage.message.markdown.trim() !== question
  ) {
    return null;
  }

  return {
    assistantMessage: messages[assistantIndex],
    userMessageId: userMessage.id,
    history: buildBoundedHelpHistory(messages.slice(0, assistantIndex - 1)),
  };
};
