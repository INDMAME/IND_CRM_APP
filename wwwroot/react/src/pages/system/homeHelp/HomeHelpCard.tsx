import React, { type RefObject } from "react";
import { ChatBubbleLeftRightIcon, SparklesIcon } from "@heroicons/react/24/outline";
import HomeHelpBotCallout from "./HomeHelpBotCallout.tsx";

type HomeHelpCardProps = {
  title: string;
  body: string;
  suggestionsLabel: string;
  openAriaLabel: string;
  calloutMessages: string[];
  suggestions: string[];
  chatOpen: boolean;
  botButtonRef: RefObject<HTMLButtonElement | null>;
  onOpen: () => void;
  onSuggestion: (question: string) => void;
};

// Renders the Home-only assistant entry card and its non-generative suggestions.
const HomeHelpCard = ({
  title,
  body,
  suggestionsLabel,
  openAriaLabel,
  calloutMessages,
  suggestions,
  chatOpen,
  botButtonRef,
  onOpen,
  onSuggestion,
}: HomeHelpCardProps) => {
  return (
    <section
      aria-labelledby="home-help-card-title"
      className="overflow-hidden rounded-[var(--radius-xl)] border border-slate-200 bg-white/95 shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
    >
      <div className="grid items-stretch gap-2 md:grid-cols-[minmax(0,1fr)_280px]">
        <div className="flex flex-col justify-center px-5 py-6 sm:px-7">
          <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-xl)] bg-primary/10 text-primary">
            <ChatBubbleLeftRightIcon className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 id="home-help-card-title" className="text-xl font-semibold text-primary">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{body}</p>

          <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-500">
            {suggestionsLabel}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {suggestions.map((question) => (
              <button
                key={question}
                type="button"
                className="inline-flex items-center gap-1.5 rounded-[var(--radius-xl)] border border-primary/15 bg-primary/5 px-3 py-2 text-left text-[12px] font-semibold leading-4 text-primary transition hover:border-primary/30 hover:bg-primary/10 focus:outline-hidden focus:ring-2 focus:ring-primary/25"
                onClick={() => onSuggestion(question)}
              >
                <SparklesIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {question}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 bg-linear-to-br from-sky-50 via-white to-slate-50 px-3 md:border-l md:border-t-0">
          <HomeHelpBotCallout
            ariaLabel={openAriaLabel}
            messages={calloutMessages}
            chatOpen={chatOpen}
            buttonRef={botButtonRef}
            onOpen={onOpen}
          />
        </div>
      </div>
    </section>
  );
};

export default HomeHelpCard;
