import React, { useCallback, useState } from "react";
import AssistantChatShell from "../../../components/commons/chat/AssistantChatShell.tsx";
import type { AssistantLauncherImageSources } from "../../../components/commons/chat/AssistantLauncherButton.tsx";
import { indFormat, indT } from "../../../utils/indI18n.ts";
import { normalizeHelpResponseLocale } from "./helpLocale.ts";
import HomeHelpMessageFooter from "./HomeHelpMessageFooter.tsx";
import HomeHelpModuleSelector from "./HomeHelpModuleSelector.tsx";
import { useHomeHelpAssistant } from "./useHomeHelpAssistant.ts";
import { useHomeHelpModuleCatalog } from "./useHomeHelpModuleCatalog.ts";

type HomeHelpAssistantProps = {
  isOpen: boolean;
  initialLocale: string;
  launcherImageSources: AssistantLauncherImageSources;
  onClose: () => void;
};

const BOT_IMAGE_SRC = "/images/kaloria_bot.png";
const noopChartSelection = () => {};

// Adapts Home help state to the shared assistant shell.
const HomeHelpAssistant = ({
  isOpen,
  initialLocale,
  launcherImageSources,
  onClose,
}: HomeHelpAssistantProps) => {
  const responseLocale = normalizeHelpResponseLocale(initialLocale);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const {
    modules,
    state: catalogState,
    errorMessage: catalogError,
  } = useHomeHelpModuleCatalog({ enabled: isOpen, responseLocale });
  const selectedModule = modules.find((module) => module.id === selectedModuleId) || null;
  const {
    isSending,
    draftQuestion,
    messages,
    answerDetailsByMessageId,
    messagesContainerRef,
    textareaRef,
    dialogRef,
    setDraftQuestion,
    submitDraftQuestion,
    retryQuestion,
    selectCandidate,
    handleDraftKeyDown,
  } = useHomeHelpAssistant({ isOpen, responseLocale, selectedModule, onClose });
  const conversationStarted = messages.some((message) => message.role === "user");

  const selectModule = useCallback((moduleId: string) => {
    if (conversationStarted) {
      return;
    }
    setSelectedModuleId(moduleId);
    setDraftQuestion("");
  }, [conversationStarted, setDraftQuestion]);

  if (!isOpen) {
    return null;
  }

  return (
    <AssistantChatShell
      isOpen
      showLauncher={false}
      hasContext
      isSending={isSending}
      title={indT("HomeHelp_PanelTitle", "CRM help")}
      launcherAriaLabel={indT("HomeHelp_OpenAria", "Open CRM help")}
      closeAriaLabel={indT("Common_Close", "Close")}
      sendAriaLabel={indT("HomeHelp_Send", "Send question")}
      sendingLabel={indT("HomeHelp_Sending", "Sending")}
      retryLabel={indT("HomeHelp_Retry", "Try again")}
      warningsLabel={indT("HomeHelp_Warnings", "Notices")}
      inputPlaceholder={selectedModule
        ? indT("HomeHelp_InputPlaceholder", "Ask how to use the CRM…")
        : indT("HomeHelp_ModuleSelectionBody", "Select a section to enable the question box.")}
      inputNotice={indT(
        "HomeHelp_InputPrivacyNotice",
        "Do not include personal data, customer data, or secrets."
      )}
      inputMaxLength={1200}
      emptyStateTitle={selectedModule
        ? indT("HomeHelp_EmptyTitle", "Hello! What do you need help with?")
        : indT("HomeHelp_ModuleSelectionTitle", "Which section do you need help with?")}
      emptyStateBody={selectedModule
        ? indT("HomeHelp_EmptyBody", "Ask your question naturally and I will help you with the CRM.")
        : indT("HomeHelp_ModuleSelectionBody", "Select a section to enable the question box.")}
      noContextTitle={indT("HomeHelp_NoContextTitle", "Help is unavailable")}
      noContextBody={indT("HomeHelp_NoContextBody", "The CRM guide could not be loaded.")}
      noContextMessage={indT("HomeHelp_NoContextMessage", "Reload the page and try again.")}
      botImageSrc={BOT_IMAGE_SRC}
      launcherImageSources={launcherImageSources}
      contextNotice={null}
      emptyStateContent={
        <div className="mt-4 w-full text-left">
          <HomeHelpModuleSelector
            variant="choices"
            modules={modules}
            catalogState={catalogState}
            selectedModuleId={selectedModuleId}
            ariaLabel={indT("HomeHelp_ModuleSelectionTitle", "Which section do you need help with?")}
            loadingLabel={indT("HomeHelp_CatalogLoading", "Loading topics…")}
            errorLabel={catalogError || indT("HomeHelp_CatalogError", "The help topics could not be loaded.")}
            emptyLabel={indT("HomeHelp_CatalogEmpty", "No matching topics.")}
            onSelect={selectModule}
          />
        </div>
      }
      messagesHeaderContent={conversationStarted && selectedModule ? (
        <HomeHelpModuleSelector
          variant="summary"
          label={indFormat(
            "HomeHelp_ModuleSelectionLocked",
            "Conversation section: {0}",
            selectedModule.title
          )}
        />
      ) : null}
      composerState={selectedModule ? "enabled" : "blocked"}
      draftValue={draftQuestion}
      messages={messages}
      messagesContainerRef={messagesContainerRef}
      textareaRef={textareaRef}
      dialogRef={dialogRef}
      dialogId="home-help-assistant-dialog"
      ariaModal
      onToggle={onClose}
      onClose={onClose}
      onDraftChange={setDraftQuestion}
      onSubmit={() => void submitDraftQuestion()}
      onRetry={(question, assistantMessageId) => {
        if (assistantMessageId) {
          void retryQuestion(question, assistantMessageId);
        }
      }}
      onChartTypeSelect={noopChartSelection}
      onDraftKeyDown={handleDraftKeyDown}
      renderAssistantMessageFooter={(message) => {
        const details = answerDetailsByMessageId[message.id];
        return details ? (
          <HomeHelpMessageFooter
            details={details}
            responseLocale={responseLocale}
            disabled={isSending}
            onCandidate={(question, topicId) => void selectCandidate(question, topicId, message.id)}
          />
        ) : null;
      }}
    />
  );
};

export default HomeHelpAssistant;
