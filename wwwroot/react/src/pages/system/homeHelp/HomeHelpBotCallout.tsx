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

const FLOATING_BOTTOM_INSET = "calc(24px + env(safe-area-inset-bottom, 0px))";

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
      desktopPlacement="viewport-start"
      bottomInset={FLOATING_BOTTOM_INSET}
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
      <span className="pointer-events-none absolute left-[calc(100%+0.75rem)] top-1/2 z-20 w-max max-w-[calc(100vw-96px)] -translate-y-1/2 rounded-[var(--radius-xl)] border border-sky-100 bg-white px-3 py-2 text-left text-[12px] font-semibold leading-5 text-primary shadow-[0_12px_30px_rgba(15,23,42,0.12)] sm:max-w-[220px]">
        {currentMessage}
        <span
          aria-hidden="true"
          className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 border-b border-l border-sky-100 bg-white"
        />
      </span>
    </AssistantLauncherButton>
  );
};

export default HomeHelpBotCallout;
