import React, { type ReactNode } from "react";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export type HomeHelpTechnicalInfo = {
  environmentLabel: string;
  environmentName: string;
  companyName: string;
  isDev: boolean;
};

type HomeHelpCardProps = {
  title: string;
  body: string;
  technicalInfo: HomeHelpTechnicalInfo;
  chatOpen: boolean;
  children?: ReactNode;
};

// Renders the Home assistant card with its environment-aware technical footer.
const HomeHelpCard = ({
  title,
  body,
  technicalInfo,
  chatOpen,
  children,
}: HomeHelpCardProps) => {
  const contentVisibilityClassName = chatOpen ? "invisible" : "visible";

  return (
    <section
      aria-labelledby="home-help-card-title"
      aria-hidden={chatOpen}
      className="relative flex min-h-0 w-full flex-1 flex-col overflow-x-hidden overflow-y-auto rounded-[var(--radius-xl)] border border-slate-200 bg-white/95 shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
    >
      {technicalInfo.isDev ? (
        <div
          className={`pointer-events-none absolute inset-0 z-0 flex items-center justify-center ${contentVisibilityClassName}`}
          role="status"
          aria-label={`${technicalInfo.environmentLabel}: DEV`}
        >
          <span
            className="select-none text-[8.5rem] font-black uppercase leading-none tracking-normal text-slate-100 sm:text-[11rem] md:text-[15rem]"
            translate="no"
            aria-hidden="true"
          >
            DEV
          </span>
        </div>
      ) : null}

      <div className={`relative z-10 flex flex-1 ${contentVisibilityClassName}`}>
        <div className="flex w-full flex-col justify-center px-5 py-6 sm:px-7">
          <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-xl)] bg-primary/10 text-primary">
            <ChatBubbleLeftRightIcon className="h-6 w-6" aria-hidden="true" />
          </span>
          <h1 id="home-help-card-title" className="text-xl font-semibold text-primary">
            {title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{body}</p>
          {children ? <div className="mt-10 flex w-full justify-center sm:mt-12">{children}</div> : null}
        </div>
      </div>

      {!chatOpen ? (
        <footer className="tech-info relative z-10 shrink-0 space-y-1 border-t border-slate-100 px-5 py-4 text-center leading-tight">
          {!technicalInfo.isDev ? (
            <div>{technicalInfo.environmentLabel}: {technicalInfo.environmentName}</div>
          ) : null}
          <div>Microsoft Navision Axapta 3.0</div>
          <div><strong>{technicalInfo.companyName}</strong></div>
        </footer>
      ) : null}
    </section>
  );
};

export default HomeHelpCard;
