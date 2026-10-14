import React from "react";
import {
  ChartBarIcon,
  ExclamationTriangleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import AssistantChatShell from "../../../components/commons/chat/AssistantChatShell.tsx";
import type { AssistantLauncherImageSources } from "../../../components/commons/chat/AssistantLauncherButton.tsx";
import { indT } from "../../../utils/indI18n.ts";
import {
  resolveExpenseSheetsAssistantCopy,
  useAssistantUiLanguage,
} from "./expenseSheetsAssistantI18n.ts";
import type {
  ExpenseSheetsAssistantContextSnapshot,
  ExpenseSheetsAssistantQuickActionId,
} from "./expenseSheetsAssistantTypes.ts";
import { useExpenseSheetsAssistant } from "./useExpenseSheetsAssistant.ts";

type ExpenseSheetsAssistantProps = {
  botImageSrc: string;
  context: ExpenseSheetsAssistantContextSnapshot;
  isListLoading: boolean;
  launcherImageSources: AssistantLauncherImageSources;
};

const FLOATING_BOTTOM_INSET = "calc(24px + env(safe-area-inset-bottom, 0px))";

const QUICK_ACTION_ICON_BY_ID: Record<ExpenseSheetsAssistantQuickActionId, React.ComponentType<{ className?: string }>> = {
  summary: SparklesIcon,
  analytics: ChartBarIcon,
  anomalies: ExclamationTriangleIcon,
};

// Adapts the expense sheet assistant state to the shared assistant chat shell.
const ExpenseSheetsAssistant = ({
  botImageSrc,
  context,
  isListLoading,
  launcherImageSources,
}: ExpenseSheetsAssistantProps) => {
  const uiLanguage = useAssistantUiLanguage();
  const assistantCopy = React.useMemo(
    () => resolveExpenseSheetsAssistantCopy(uiLanguage),
    [uiLanguage]
  );
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
    uiLanguage,
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
      sendAriaLabel={assistantCopy.send}
      sendingLabel={assistantCopy.sending}
      retryLabel={assistantCopy.retry}
      warningsLabel={assistantCopy.warnings}
      inputPlaceholder={assistantCopy.inputPlaceholder}
      emptyStateTitle={assistantCopy.emptyStateTitle}
      emptyStateBody={assistantCopy.emptyStateBody}
      noContextTitle={assistantCopy.noContextTitle}
      noContextBody={assistantCopy.noContextBody}
      noContextMessage={assistantCopy.noContextMessage}
      desktopPlacement="viewport-start"
      bottomInset={FLOATING_BOTTOM_INSET}
      botImageSrc={botImageSrc}
      launcherImageSources={launcherImageSources}
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
