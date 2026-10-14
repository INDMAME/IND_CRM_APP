import React, { useState, type FocusEvent, type RefObject } from "react";
import AssistantLauncherButton, {
  type AssistantLauncherImageSources,
} from "../../../components/commons/chat/AssistantLauncherButton.tsx";
import { useHomeHelpCallout } from "./useHomeHelpCallout.ts";

type HomeHelpBotCalloutProps = {
  ariaLabel: string;
  messages: string[];
  chatOpen: boolean;
  buttonRef: RefObject<HTMLButtonElement | null>;
  launcherImageSources: AssistantLauncherImageSources;
  onOpen: () => void;
};

// Presents the existing bot artwork with a local, rotating HTML speech bubble.
const HomeHelpBotCallout = ({
  ariaLabel,
  messages,
  chatOpen,
  buttonRef,
  launcherImageSources,
  onOpen,
}: HomeHelpBotCalloutProps) => {
  const [interacting, setInteracting] = useState(false);
  const currentMessage = useHomeHelpCallout({ messages, paused: interacting || chatOpen });

  const handleBlur = (event: FocusEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setInteracting(false);
    }
  };

  if (chatOpen) {
    return null;
  }

  return (
    <AssistantLauncherButton
      buttonRef={buttonRef}
      imageSources={launcherImageSources}
      layoutVariant="inline"
      className="flex-col"
      aria-label={ariaLabel}
      aria-haspopup="dialog"
      aria-expanded={chatOpen}
      aria-controls="home-help-assistant-dialog"
      onClick={onOpen}
      onPointerEnter={() => setInteracting(true)}
      onPointerLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={handleBlur}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none relative order-first inline-flex max-w-[min(18rem,calc(100vw-4rem))]"
      >
        <span className="relative z-10 inline-flex max-w-[min(18rem,calc(100vw-4rem))] items-center justify-center whitespace-normal break-words rounded-[var(--radius-xl)] border border-sky-100 bg-white px-3 py-2 text-center text-[12px] font-semibold leading-4 text-primary shadow-[0_12px_30px_rgba(15,23,42,0.12)]">
          {currentMessage}
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-[-6px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 rounded-[4px] border border-sky-100 bg-white"
        />
      </span>
    </AssistantLauncherButton>
  );
};

export default HomeHelpBotCallout;
