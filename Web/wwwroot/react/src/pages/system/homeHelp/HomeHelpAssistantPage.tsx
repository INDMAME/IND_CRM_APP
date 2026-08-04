import React, { Suspense, lazy, useCallback, useRef, useState } from "react";
import AppErrorBoundary from "../../../components/commons/AppErrorBoundary.tsx";
import { indT } from "../../../utils/indI18n.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../utils/reactIsland.tsx";
import HomeHelpCard from "./HomeHelpCard.tsx";
import type { HelpDraftSeed } from "./helpTypes.ts";

const HomeHelpAssistant = lazy(() => import("./HomeHelpAssistant.tsx"));

type HomeHelpAssistantPageProps = {
  initialLocale: string;
};

// Composes the visible Home card and lazily loads the chat only after activation.
const HomeHelpAssistantPage = ({ initialLocale }: HomeHelpAssistantPageProps) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [assistantActivated, setAssistantActivated] = useState(false);
  const [draftSeed, setDraftSeed] = useState<HelpDraftSeed>({ value: "", sequence: 0 });
  const botButtonRef = useRef<HTMLButtonElement | null>(null);

  const openWithDraft = useCallback((value: string) => {
    setDraftSeed((current) => ({ value, sequence: current.sequence + 1 }));
    setAssistantActivated(true);
    setChatOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setChatOpen(false);
    window.requestAnimationFrame(() => botButtonRef.current?.focus({ preventScroll: true }));
  }, []);

  const calloutMessages = [
    indT("HomeHelp_Callout1", "Do you need help with the CRM?"),
    indT("HomeHelp_Callout2", "Ask me how a process works."),
    indT("HomeHelp_Callout3", "I can guide you step by step."),
  ];
  const suggestions = [
    indT("HomeHelp_Suggestion1", "How do I create a visit?"),
    indT("HomeHelp_Suggestion2", "How do I create an expense sheet?"),
    indT("HomeHelp_Suggestion3", "How do I manage an expense ticket?"),
  ];

  return (
    <>
      <HomeHelpCard
        title={indT("HomeHelp_CardTitle", "Your CRM help assistant")}
        body={indT("HomeHelp_CardBody", "Ask questions about documented CRM processes and get a guided answer in your preferred language.")}
        suggestionsLabel={indT("HomeHelp_SuggestionsLabel", "Try one of these questions")}
        openAriaLabel={indT("HomeHelp_OpenAria", "Open CRM help")}
        calloutMessages={calloutMessages}
        suggestions={suggestions}
        chatOpen={chatOpen}
        botButtonRef={botButtonRef}
        onOpen={() => openWithDraft("")}
        onSuggestion={openWithDraft}
      />

      {assistantActivated ? (
        <Suspense
          fallback={
            chatOpen ? (
              <div
                className="fixed inset-x-4 bottom-4 z-[2050] mx-auto max-w-sm rounded-[var(--radius-xl)] border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-primary shadow-xl"
                role="status"
              >
                {indT("HomeHelp_ChatLoading", "Opening CRM help...")}
              </div>
            ) : null
          }
        >
          <HomeHelpAssistant
            isOpen={chatOpen}
            initialLocale={initialLocale}
            draftSeed={draftSeed}
            onClose={closeChat}
          />
        </Suspense>
      ) : null}
    </>
  );
};

// Mounts the Home-only help island when the feature flag emitted its host.
const mount = () => {
  const rootElement = document.getElementById("home-help-assistant-root");
  if (!rootElement) {
    return;
  }

  const initialLocale = rootElement.dataset.responseLocale || document.documentElement.lang || "es-ES";
  mountReactIsland(
    rootElement,
    <AppErrorBoundary fallbackMessage={indT("HomeHelp_RenderError", "CRM help could not be displayed.")}>
      <HomeHelpAssistantPage initialLocale={initialLocale} />
    </AppErrorBoundary>
  );
};

mountWhenDocumentReady(mount);
