import React, { useCallback, useMemo, useState } from "react";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import AssistantChatShell from "../../../components/commons/chat/AssistantChatShell.tsx";
import { indFormat, indT } from "../../../utils/indI18n.ts";
import HomeHelpLocaleSelect from "./HomeHelpLocaleSelect.tsx";
import HomeHelpMessageFooter from "./HomeHelpMessageFooter.tsx";
import HomeHelpTopicBrowser from "./HomeHelpTopicBrowser.tsx";
import {
  HELP_RESPONSE_LOCALES,
  type HelpDraftSeed,
  type HelpResponseLocale,
} from "./helpTypes.ts";
import { useHomeHelpAssistant } from "./useHomeHelpAssistant.ts";

type HomeHelpAssistantProps = {
  isOpen: boolean;
  initialLocale: string;
  draftSeed: HelpDraftSeed;
  onClose: () => void;
};

const BOT_IMAGE_SRC = "/images/kaloria_horno.png";
const noopChartSelection = () => {};

// Resolves the page culture to one supported response locale.
const normalizeResponseLocale = (value: string): HelpResponseLocale => {
  const match = HELP_RESPONSE_LOCALES.find((locale) => locale.toLowerCase() === String(value || "").toLowerCase());
  return match || "es-ES";
};

// Adapts Home help state to the shared assistant shell.
const HomeHelpAssistant = ({ isOpen, initialLocale, draftSeed, onClose }: HomeHelpAssistantProps) => {
  const [responseLocale, setResponseLocale] = useState<HelpResponseLocale>(() => normalizeResponseLocale(initialLocale));
  const [catalogOpen, setCatalogOpen] = useState(false);
  const {
    isSending,
    draftQuestion,
    messages,
    answerDetailsByMessageId,
    catalog,
    catalogLoading,
    catalogError,
    selectedTopic,
    quickActions,
    messagesContainerRef,
    textareaRef,
    dialogRef,
    setDraftQuestion,
    submitDraftQuestion,
    retryQuestion,
    selectCandidate,
    selectTopic,
    clearSelectedTopic,
    handleDraftKeyDown,
  } = useHomeHelpAssistant({ isOpen, responseLocale, draftSeed, onClose });

  const optionLabels = useMemo<Record<HelpResponseLocale, string>>(
    () => ({
      "es-ES": indT("Language_ES_Name", "Spanish"),
      "eu-ES": indT("Language_EU_Name", "Basque"),
      en: indT("Language_EN_Name", "English"),
      pt: indT("Language_PT_Name", "Portuguese"),
      it: indT("Language_IT_Name", "Italian"),
      "zh-Hans": indT("Language_ZH_Name", "Chinese"),
    }),
    []
  );

  const contextNotice = selectedTopic ? (
    <div className="flex items-center justify-between gap-2">
      <span className="min-w-0 truncate">
        {indFormat("HomeHelp_SelectedTopic", "Selected topic: {0}", selectedTopic.title)}
      </span>
      <button
        type="button"
        className="shrink-0 rounded-[var(--radius-xl)] border border-sky-200 bg-white px-2 py-0.5 font-semibold text-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20"
        onClick={clearSelectedTopic}
      >
        {indT("HomeHelp_ClearTopic", "Clear")}
      </button>
    </div>
  ) : catalogError ? (
    <span className="text-amber-900">{catalogError}</span>
  ) : catalog?.knowledgeVersion ? (
    indFormat("HomeHelp_KnowledgeVersion", "Guide version {0}", catalog.knowledgeVersion)
  ) : null;

  const fillDraft = useCallback((question: string) => {
    setDraftQuestion(question);
    window.requestAnimationFrame(() => textareaRef.current?.focus({ preventScroll: true }));
  }, [setDraftQuestion, textareaRef]);

  const handleLocaleChange = useCallback((locale: HelpResponseLocale) => {
    clearSelectedTopic();
    setResponseLocale(locale);
  }, [clearSelectedTopic]);

  const catalogBrowser = catalogLoading ? (
    <p className="text-center text-slate-500" role="status">
      {indT("HomeHelp_CatalogLoading", "Loading topics...")}
    </p>
  ) : (
    <HomeHelpTopicBrowser
      modules={catalog?.modules || []}
      searchLabel={indT("HomeHelp_CatalogSearchLabel", "Search help topics")}
      searchPlaceholder={indT("HomeHelp_CatalogSearchPlaceholder", "Search topics...")}
      emptyLabel={catalogError || indT("HomeHelp_CatalogEmpty", "No matching topics.")}
      readOnly={isSending}
      onSelect={(topic) => {
        selectTopic(topic);
        setCatalogOpen(false);
        window.requestAnimationFrame(() => textareaRef.current?.focus({ preventScroll: true }));
      }}
    />
  );

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
      inputPlaceholder={indT("HomeHelp_InputPlaceholder", "Ask how to use the CRM...")}
      inputNotice={indT(
        "HomeHelp_InputPrivacyNotice",
        "Do not include personal data, customer data, or secrets."
      )}
      inputMaxLength={1200}
      emptyStateTitle={indT("HomeHelp_EmptyTitle", "What do you need help with?")}
      emptyStateBody={indT("HomeHelp_EmptyBody", "Ask a question or choose a documented topic.")}
      noContextTitle={indT("HomeHelp_NoContextTitle", "Help is unavailable")}
      noContextBody={indT("HomeHelp_NoContextBody", "The CRM guide could not be loaded.")}
      noContextMessage={indT("HomeHelp_NoContextMessage", "Reload the page and try again.")}
      botImageSrc={BOT_IMAGE_SRC}
      contextNotice={contextNotice}
      headerActions={
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label={indT("HomeHelp_CatalogToggle", "Browse help topics")}
            aria-expanded={catalogOpen}
            className="rounded-[var(--radius-xl)] border border-slate-200 bg-white p-1.5 text-slate-500 transition hover:text-primary focus:outline-hidden focus:ring-2 focus:ring-primary/25"
            onClick={() => setCatalogOpen((current) => !current)}
          >
            <BookOpenIcon className="h-4 w-4" aria-hidden="true" />
          </button>
          <HomeHelpLocaleSelect
            label={indT("HomeHelp_LanguageLabel", "Response language")}
            value={responseLocale}
            optionLabels={optionLabels}
            readOnly={isSending}
            onChange={handleLocaleChange}
          />
        </div>
      }
      messagesHeaderContent={catalogOpen && messages.length > 0 ? catalogBrowser : null}
      emptyStateContent={
        <div className="mt-4 w-full text-left">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
            {indT("HomeHelp_CatalogTitle", "Help topics")}
          </p>
          {catalogBrowser}
        </div>
      }
      draftValue={draftQuestion}
      messages={messages}
      quickActions={quickActions}
      messagesContainerRef={messagesContainerRef}
      textareaRef={textareaRef}
      dialogRef={dialogRef}
      dialogId="home-help-assistant-dialog"
      ariaModal
      onToggle={onClose}
      onClose={onClose}
      onDraftChange={setDraftQuestion}
      onSubmit={() => void submitDraftQuestion()}
      onQuickAction={fillDraft}
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
