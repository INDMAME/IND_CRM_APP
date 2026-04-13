import type { ChatMessage, VisualizationType } from "./chatMessageContract.ts";
import { resolveRenderableChatMessage } from "./chatMessageValidation.ts";
import ChatChartRenderer from "./ChatChartRenderer.tsx";
import ChatChartTypePicker from "./ChatChartTypePicker.tsx";
import ChatMarkdownMessage from "./ChatMarkdownMessage.tsx";
import ChatTableRenderer from "./ChatTableRenderer.tsx";

type ChatMessageContentProps = {
  message: ChatMessage;
  disabled?: boolean;
  onChartTypeSelect?: (value: VisualizationType) => void;
  markdownTone?: "default" | "inverse";
  markdownLayout?: "default" | "wrapAroundAvatar";
};

// Converts one structured chat message into its presentational component.
const ChatMessageContent = ({
  message,
  disabled = false,
  onChartTypeSelect,
  markdownTone = "default",
  markdownLayout = "default",
}: ChatMessageContentProps) => {
  const safeMessage = resolveRenderableChatMessage(message);

  switch (safeMessage.type) {
    case "markdown":
      return (
        <ChatMarkdownMessage
          markdown={safeMessage.markdown}
          tone={markdownTone}
          avatarWrapped={markdownLayout === "wrapAroundAvatar"}
        />
      );
    case "chart":
      return <ChatChartRenderer payload={safeMessage.payload} />;
    case "table":
      return <ChatTableRenderer payload={safeMessage.payload} />;
    case "question-to-choose-chart-type":
      return (
        <ChatChartTypePicker
          question={safeMessage.question}
          options={safeMessage.options}
          selectedType={safeMessage.selectedType}
          disabled={disabled}
          onSelect={onChartTypeSelect}
        />
      );
    default:
      return null;
  }
};

export default ChatMessageContent;
