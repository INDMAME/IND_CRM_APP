import type { AssistantChatMessage } from "../../../components/commons/chat/assistantChatTypes.ts";
import type { HelpHistoryMessage } from "./helpTypes.ts";

const MAX_HISTORY_ITEMS = 8;
const MAX_HISTORY_CONTENT_LENGTH = 1600;

export type ReusableHelpTurn = {
  assistantMessage: AssistantChatMessage;
  userMessageId: string;
  history: HelpHistoryMessage[];
};

// Keeps only complete user/assistant turns that fit the API conversation contract.
export const buildBoundedHelpHistory = (messages: AssistantChatMessage[]): HelpHistoryMessage[] => {
  const history: HelpHistoryMessage[] = [];
  let pendingUserMessage: AssistantChatMessage | null = null;

  for (const message of messages) {
    if (message.role === "user") {
      pendingUserMessage = message.state === "done" && message.message.type === "markdown"
        ? message
        : null;
      continue;
    }

    if (
      !pendingUserMessage
      || message.state !== "done"
      || message.message.type !== "markdown"
      || message.meta?.includeInHistory === false
    ) {
      pendingUserMessage = null;
      continue;
    }

    const userContent = pendingUserMessage.message.type === "markdown"
      ? pendingUserMessage.message.markdown.slice(0, MAX_HISTORY_CONTENT_LENGTH)
      : "";
    const assistantContent = message.message.markdown.slice(0, MAX_HISTORY_CONTENT_LENGTH);
    if (userContent.trim() && assistantContent.trim()) {
      history.push(
        { role: "user", content: userContent },
        { role: "assistant", content: assistantContent }
      );
    }
    pendingUserMessage = null;
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

// Reuses the latest failed or undocumented turn when the same question is submitted again.
export const resolveLatestRepeatableHelpTurn = (
  messages: AssistantChatMessage[],
  rawQuestion: string
): ReusableHelpTurn | null => {
  const latestMessage = messages[messages.length - 1];
  const canReuse = latestMessage?.role === "assistant"
    && (latestMessage.state === "error" || latestMessage.meta?.includeInHistory === false);

  return canReuse
    ? resolveReusableHelpTurn(messages, latestMessage.id, rawQuestion)
    : null;
};
