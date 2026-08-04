import React, { useState, type FocusEvent, type RefObject } from "react";
import { useHomeHelpCallout } from "./useHomeHelpCallout.ts";

type HomeHelpBotCalloutProps = {
  ariaLabel: string;
  messages: string[];
  chatOpen: boolean;
  buttonRef: RefObject<HTMLButtonElement | null>;
  onOpen: () => void;
};

const BOT_IMAGE_SRC = "/images/kaloria_horno.png";

// Presents the existing bot artwork with a local, rotating HTML speech bubble.
const HomeHelpBotCallout = ({
  ariaLabel,
  messages,
  chatOpen,
  buttonRef,
  onOpen,
}: HomeHelpBotCalloutProps) => {
  const [interacting, setInteracting] = useState(false);
  const currentMessage = useHomeHelpCallout({ messages, paused: interacting || chatOpen });

  const handleBlur = (event: FocusEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setInteracting(false);
    }
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={ariaLabel}
      aria-haspopup="dialog"
      aria-expanded={chatOpen}
      aria-controls="home-help-assistant-dialog"
      className="group relative flex min-h-[196px] w-full items-end justify-center rounded-[var(--radius-xl)] p-2 focus:outline-hidden focus:ring-4 focus:ring-primary/25 sm:min-h-[214px]"
      onClick={onOpen}
      onPointerEnter={() => setInteracting(true)}
      onPointerLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={handleBlur}
    >
      <span className="absolute right-1 top-1 z-20 max-w-[190px] rounded-[var(--radius-xl)] border border-sky-100 bg-white px-3 py-2 text-left text-[12px] font-semibold leading-5 text-primary shadow-[0_12px_30px_rgba(15,23,42,0.12)] motion-safe:transition motion-safe:duration-300 sm:right-3 sm:max-w-[220px]">
        {currentMessage}
        <span
          aria-hidden="true"
          className="absolute -bottom-2 right-8 h-4 w-4 rotate-45 border-b border-r border-sky-100 bg-white"
        />
      </span>
      <img
        src={BOT_IMAGE_SRC}
        alt=""
        width={180}
        height={180}
        aria-hidden="true"
        className="h-[172px] w-[172px] object-contain drop-shadow-[0_14px_24px_rgba(15,23,42,0.16)] motion-safe:transition motion-safe:duration-200 motion-safe:group-hover:-translate-y-1 motion-safe:group-focus-visible:-translate-y-1 sm:h-[188px] sm:w-[188px]"
      />
    </button>
  );
};

export default HomeHelpBotCallout;
