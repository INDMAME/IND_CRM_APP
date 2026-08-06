import React, { Suspense, lazy, useCallback, useRef, useState } from "react";
import AppErrorBoundary from "../../../components/commons/AppErrorBoundary.tsx";
import type { AssistantLauncherImageSources } from "../../../components/commons/chat/AssistantLauncherButton.tsx";
import { indT } from "../../../utils/indI18n.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../utils/reactIsland.tsx";
import HomeHelpCard, { type HomeHelpTechnicalInfo } from "./HomeHelpCard.tsx";
import HomeHelpBotCallout from "./HomeHelpBotCallout.tsx";

const HomeHelpAssistant = lazy(() => import("./HomeHelpAssistant.tsx"));
const HOME_HELP_CALLOUT_MESSAGES = [
  indT("HomeHelp_Callout1", "Do you need help with the CRM?"),
  indT("HomeHelp_Callout2", "Ask me how a process works."),
  indT("HomeHelp_Callout3", "I can guide you step by step."),
];

type HomeHelpAssistantPageProps = {
  initialLocale: string;
  launcherImageSources: AssistantLauncherImageSources;
  technicalInfo: HomeHelpTechnicalInfo;
};

// Composes the visible Home card and lazily loads the chat only after activation.
const HomeHelpAssistantPage = ({
  initialLocale,
  launcherImageSources,
  technicalInfo,
}: HomeHelpAssistantPageProps) => {
  const [chatOpen, setChatOpen] = useState(false);
  const [assistantActivated, setAssistantActivated] = useState(false);
  const botButtonRef = useRef<HTMLButtonElement | null>(null);

  const openChat = useCallback(() => {
    setAssistantActivated(true);
    setChatOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setChatOpen(false);
    window.requestAnimationFrame(() => botButtonRef.current?.focus({ preventScroll: true }));
  }, []);

  return (
    <>
      <HomeHelpCard
        title={indT("HomeHelp_CardTitle", "Your CRM help assistant")}
        body={indT("HomeHelp_CardBody", "Do you have questions about how to use the CRM? Ask the chatbot and receive clear, simple help about how the web application works.")}
        technicalInfo={technicalInfo}
        chatOpen={chatOpen}
      />

      <HomeHelpBotCallout
        ariaLabel={indT("HomeHelp_OpenAria", "Open CRM help")}
        messages={HOME_HELP_CALLOUT_MESSAGES}
        chatOpen={chatOpen}
        buttonRef={botButtonRef}
        launcherImageSources={launcherImageSources}
        onOpen={openChat}
      />

      {assistantActivated ? (
        <Suspense
          fallback={
            chatOpen ? (
              <div
                className="fixed inset-x-4 bottom-4 z-[2050] mx-auto max-w-sm rounded-[var(--radius-xl)] border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-primary shadow-xl"
                role="status"
              >
                {indT("HomeHelp_ChatLoading", "Opening CRM help…")}
              </div>
            ) : null
          }
        >
          <HomeHelpAssistant
            isOpen={chatOpen}
            initialLocale={initialLocale}
            launcherImageSources={launcherImageSources}
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
  const launcherImageSources: AssistantLauncherImageSources = {
    animatedWebp: rootElement.dataset.assistantLauncherAnimatedWebp || "",
    animatedGif: rootElement.dataset.assistantLauncherAnimatedGif || "",
    reducedMotionPng: rootElement.dataset.assistantLauncherReducedMotionPng || "",
  };
  const technicalInfo = {
    environmentLabel: rootElement.dataset.environmentLabel || "",
    environmentName: rootElement.dataset.environmentName || "",
    companyName: rootElement.dataset.companyName || "",
    isDev: rootElement.dataset.isDev === "true",
  };
  mountReactIsland(
    rootElement,
    <AppErrorBoundary fallbackMessage={indT("HomeHelp_RenderError", "CRM help could not be displayed.")}>
      <HomeHelpAssistantPage
        initialLocale={initialLocale}
        launcherImageSources={launcherImageSources}
        technicalInfo={technicalInfo}
      />
    </AppErrorBoundary>
  );
};

mountWhenDocumentReady(mount);
