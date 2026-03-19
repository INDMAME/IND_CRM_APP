import React from "react";
import {
  ChartBarIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import AssistantChatShell from "../../../components/commons/chat/AssistantChatShell.tsx";
import { indT } from "../../../utils/indI18n.ts";
import type {
  ExpenseSheetsAssistantContextSnapshot,
  ExpenseSheetsAssistantQuickActionId,
} from "./expenseSheetsAssistantTypes.ts";
import { useExpenseSheetsAssistant } from "./useExpenseSheetsAssistant.ts";

type ExpenseSheetsAssistantProps = {
  context: ExpenseSheetsAssistantContextSnapshot;
  isListLoading: boolean;
};

const BOT_IMAGE_SRC = "/images/kaloria_bot.png";

const QUICK_ACTION_ICON_BY_ID: Record<ExpenseSheetsAssistantQuickActionId, React.ComponentType<{ className?: string }>> = {
  summary: SparklesIcon,
  analytics: ChartBarIcon,
  anomalies: ExclamationTriangleIcon,
};

// Adapts the expense sheet assistant state to the shared assistant chat shell.
const ExpenseSheetsAssistant = ({ context, isListLoading }: ExpenseSheetsAssistantProps) => {
  const {
    isOpen,
    isSending,
    hasContext,
    contextNotice,
    draftQuestion,
    messages,
    quickActions,
    launcherAriaLabel,
    panelTitle,
    closePanel,
    togglePanel,
    setDraftQuestion,
    submitDraftQuestion,
    submitQuickAction,
    retryQuestion,
    selectChartType,
    handleDraftKeyDown,
    messagesContainerRef,
    textareaRef,
  } = useExpenseSheetsAssistant({
    context,
    isListLoading,
  });

  const visualQuickActions = React.useMemo(
    () =>
      quickActions.map((action) => ({
        ...action,
        icon: QUICK_ACTION_ICON_BY_ID[action.id],
      })),
    [quickActions]
  );

  return (
    <AssistantChatShell
      isOpen={isOpen}
      showLauncher={hasContext && !isOpen}
      hasContext={hasContext}
      isSending={isSending}
      title={panelTitle}
      launcherAriaLabel={launcherAriaLabel}
      closeAriaLabel={indT("Common_Close", "Close")}
      sendAriaLabel={indT("ExpenseSheets_Assistant_Send", "Send")}
      sendingLabel={indT("ExpenseSheets_Assistant_Sending", "Sending")}
      retryLabel={indT("ExpenseSheets_Assistant_Retry", "Retry")}
      warningsLabel={indT("ExpenseSheets_Assistant_Warnings", "Warnings")}
      inputPlaceholder={indT("ExpenseSheets_Assistant_Input_Placeholder", "...")}
      emptyStateTitle={indT("ExpenseSheets_Assistant_Empty_Title", "Ask for a business summary")}
      emptyStateBody={indT(
        "ExpenseSheets_Assistant_Empty_Body",
        "Use quick actions or write a question about the expense sheets currently loaded in the list."
      )}
      noContextTitle={indT("ExpenseSheets_Assistant_NoContext_Title", "Load expense sheets first.")}
      noContextBody={indT(
        "ExpenseSheets_Assistant_NoContext_Body",
        "The assistant needs a real expense sheet list response before it can analyze the data."
      )}
      noContextMessage={indT(
        "ExpenseSheets_Assistant_Error_NoContext",
        "Load expense sheets before asking the assistant."
      )}
      botImageSrc={BOT_IMAGE_SRC}
      contextNotice={contextNotice}
      draftValue={draftQuestion}
      messages={messages}
      quickActions={visualQuickActions}
      messagesContainerRef={messagesContainerRef}
      textareaRef={textareaRef}
      onToggle={togglePanel}
      onClose={closePanel}
      onDraftChange={setDraftQuestion}
      onSubmit={() => {
        void submitDraftQuestion();
      }}
      onQuickAction={(question) => {
        void submitQuickAction(question);
      }}
      onRetry={(question) => {
        void retryQuestion(question);
      }}
      onChartTypeSelect={(messageId, chartType) => {
        void selectChartType(messageId, chartType);
      }}
      onDraftKeyDown={handleDraftKeyDown}
    />
  );
};

export default ExpenseSheetsAssistant;
