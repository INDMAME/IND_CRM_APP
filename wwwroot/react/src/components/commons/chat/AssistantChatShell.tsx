import React, { type KeyboardEvent as ReactKeyboardEvent, type RefObject } from "react";
import {
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Spinner from "../Spinner.tsx";
import { classNames } from "../../../utils/classNames.ts";
import AssistantLauncherButton, {
  ASSISTANT_BOTTOM_INSET,
  ASSISTANT_PAGE_INSET,
  type AssistantLauncherDesktopPlacement,
  type AssistantLauncherImageSources,
} from "./AssistantLauncherButton.tsx";
import ChatMessageContent from "./ChatMessageContent.tsx";
import AssistantQuickActions, { type AssistantQuickActionsLayout } from "./AssistantQuickActions.tsx";
import type { AssistantChatMessage, AssistantChatQuickAction, VisualizationType } from "./assistantChatTypes.ts";

type AssistantChatDesktopPlacement = AssistantLauncherDesktopPlacement;
export type AssistantChatComposerState = "enabled" | "blocked";

type AssistantChatShellProps<TActionId extends string = string> = {
  isOpen: boolean;
  showLauncher: boolean;
  hasContext: boolean;
  isSending: boolean;
  title: string;
  launcherAriaLabel: string;
  closeAriaLabel: string;
  sendAriaLabel: string;
  sendingLabel: string;
  retryLabel: string;
  warningsLabel: string;
  inputPlaceholder: string;
  emptyStateTitle: string;
  emptyStateBody: string;
  noContextTitle: string;
  noContextBody: string;
  noContextMessage: string;
  desktopPlacement?: AssistantChatDesktopPlacement;
  bottomInset?: string;
  botImageSrc: string;
  launcherImageSources: AssistantLauncherImageSources;
  contextNotice: React.ReactNode;
  headerActions?: React.ReactNode;
  emptyStateContent?: React.ReactNode;
  messagesHeaderContent?: React.ReactNode;
  inputNotice?: React.ReactNode;
  inputMaxLength?: number;
  composerState?: AssistantChatComposerState;
  draftValue: string;
  messages: AssistantChatMessage[];
  quickActions?: AssistantChatQuickAction<TActionId>[];
  quickActionsLayout?: AssistantQuickActionsLayout;
  messagesContainerRef: RefObject<HTMLDivElement | null>;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  dialogRef?: RefObject<HTMLElement | null>;
  dialogId?: string;
  ariaModal?: boolean;
  onToggle: () => void;
  onClose: () => void;
  onDraftChange: (value: string) => void;
  onSubmit: () => void;
  onQuickAction?: (question: string) => void;
  onRetry: (question: string, assistantMessageId?: string) => void;
  onChartTypeSelect: (messageId: string, value: VisualizationType) => void;
  onDraftKeyDown: (event: ReactKeyboardEvent<HTMLTextAreaElement>) => void;
  renderAssistantMessageFooter?: (message: AssistantChatMessage) => React.ReactNode;
};

const GLOBAL_CHAT_RADIUS_CLASS = "rounded-[var(--radius-xl)]";
const DEFAULT_PANEL_HEIGHT_CLASS =
  "h-[69vh] max-h-[69vh] lg:h-[min(640px,calc(100vh-8rem))] lg:max-h-[640px]";
const EXPANDED_PANEL_HEIGHT_CLASS =
  "h-[84dvh] max-h-[calc(100dvh-1rem)] lg:h-[min(800px,calc(100dvh-4rem))] lg:max-h-[800px]";
const LARGE_CARTESIAN_VISUAL_THRESHOLD = 8;
const LARGE_PIE_VISUAL_THRESHOLD = 6;
const LARGE_TABLE_VISUAL_THRESHOLD = 8;
const LARGE_MARKDOWN_CONTENT_THRESHOLD = 360;
const LARGE_MARKDOWN_LINE_THRESHOLD = 6;
const LARGE_CONVERSATION_MESSAGE_THRESHOLD = 4;

const DESKTOP_PLACEMENT_CLASS_NAMES: Record<
  AssistantChatDesktopPlacement,
  { panel: string; closedPanel: string }
> = {
  "content-frame": {
    panel: "lg:left-auto lg:right-[var(--assistant-page-inset)]",
    closedPanel: "lg:translate-x-[110%]",
  },
  "viewport-start": {
    panel: "lg:left-4 lg:right-auto",
    closedPanel: "lg:-translate-x-[110%]",
  },
};

const toText = (value: unknown): string => {
  return String(value ?? "").trim();
};

// Detects visual answers that need a taller drawer to remain readable.
const shouldUseExpandedVisualLayout = (message: AssistantChatMessage["message"]): boolean => {
  switch (message.type) {
    case "chart":
      if (message.payload.chartType === "pie") {
        return message.payload.data.length >= LARGE_PIE_VISUAL_THRESHOLD;
      }

      return message.payload.data.length >= LARGE_CARTESIAN_VISUAL_THRESHOLD;
    case "table":
      return message.payload.rows.length >= LARGE_TABLE_VISUAL_THRESHOLD;
    default:
      return false;
  }
};

// Expands the drawer when accumulated text, message count, or visual data needs more room.
const shouldUseExpandedContentLayout = (messages: AssistantChatMessage[]): boolean => {
  let markdownCharacterCount = 0;
  let markdownLineCount = 0;
  let settledMessageCount = 0;

  for (const message of messages) {
    if (message.state === "loading") {
      continue;
    }

    settledMessageCount += 1;
    if (shouldUseExpandedVisualLayout(message.message)) {
      return true;
    }

    if (message.message.type === "markdown") {
      const markdown = message.message.markdown.trim();
      markdownCharacterCount += markdown.length;
      markdownLineCount += markdown.split(/\r?\n/u).filter((line) => line.trim().length > 0).length;
    }
  }

  return settledMessageCount >= LARGE_CONVERSATION_MESSAGE_THRESHOLD
    || markdownCharacterCount >= LARGE_MARKDOWN_CONTENT_THRESHOLD
    || markdownLineCount >= LARGE_MARKDOWN_LINE_THRESHOLD;
};

type AssistantChatMessageBubbleProps = {
  botImageSrc: string;
  isSending: boolean;
  message: AssistantChatMessage;
  retryLabel: string;
  warningsLabel: string;
  onRetry: (question: string, assistantMessageId?: string) => void;
  onChartTypeSelect: (messageId: string, value: VisualizationType) => void;
  footer?: React.ReactNode;
};

// Renders one chat bubble capable of hosting markdown, charts, tables, or pickers.
const AssistantChatMessageBubble = ({
  botImageSrc,
  isSending,
  message,
  retryLabel,
  warningsLabel,
  onRetry,
  onChartTypeSelect,
  footer,
}: AssistantChatMessageBubbleProps) => {
  const warnings = Array.isArray(message.meta?.warnings) ? message.meta?.warnings : [];
  const [warningsOpen, setWarningsOpen] = React.useState(false);
  const warningKeyCounts = new Map<string, number>();
  const isFramelessVisualMessage = message.message.type === "chart" || message.message.type === "table";
  const shouldHideAssistantAvatar = false;
  const shouldWrapMarkdownAroundAvatar = !shouldHideAssistantAvatar && message.message.type === "markdown";

  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="relative max-w-[92%]">
          <div
            className={classNames(
              "relative z-10 bg-primary px-2.5 py-2 text-[12px] leading-5 text-white shadow-sm",
              GLOBAL_CHAT_RADIUS_CLASS
            )}
          >
            <ChatMessageContent message={message.message} disabled={isSending} markdownTone="inverse" />
          </div>
          <span
            aria-hidden="true"
            className="absolute right-[-6px] bottom-[7px] h-4 w-4 rotate-45 rounded-[4px] bg-primary"
          />
        </div>
      </div>
    );
  }

  const bubbleClassName =
    message.state === "error"
      ? "border-rose-200 bg-rose-50 text-rose-900"
      : "border-slate-200 bg-white text-slate-700";
  const bubbleTailClassName = message.state === "error" ? "border-rose-200 bg-rose-50" : "border-slate-200 bg-white";

  if (isFramelessVisualMessage) {
    return (
      <div className="flex justify-start">
        <div className="w-full max-w-full">
          <div className="-mx-1.5 w-[calc(100%+0.75rem)] max-w-none text-[12px] leading-5">
            <ChatMessageContent
              message={message.message}
              disabled={isSending}
              onChartTypeSelect={(value) => onChartTypeSelect(message.id, value)}
            />
          </div>

          {message.state === "error" && message.retryQuestion ? (
            <button
              type="button"
              className="mt-2 inline-flex items-center gap-1 rounded-[var(--radius-xl)] border border-rose-200 bg-white px-2.5 py-1.5 text-[12px] font-semibold text-rose-800 transition hover:bg-rose-100 focus:outline-hidden focus:ring-2 focus:ring-rose-300 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSending}
              onClick={() => onRetry(message.retryQuestion || "", message.id)}
            >
              <ArrowPathIcon className="h-3.5 w-3.5" />
              {retryLabel}
            </button>
          ) : null}

          {message.state === "done" && warnings.length > 0 ? (
            <div className="mt-2">
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-[var(--radius-xl)] border border-amber-200 bg-amber-50 px-2 py-1 text-[12px] font-semibold text-amber-900 transition hover:bg-amber-100 focus:outline-hidden focus:ring-2 focus:ring-amber-200"
                onClick={() => setWarningsOpen((previous) => !previous)}
              >
                {warningsLabel} ({warnings.length})
              </button>

              {warningsOpen ? (
                <div className="mt-2 rounded-[var(--radius-xl)] border border-amber-200 bg-amber-50 px-2.5 py-2 text-[12px] leading-[1.15rem] text-amber-900">
                  <ul className="list-disc space-y-1 pl-4">
                    {warnings.map((warning) => {
                      const normalizedWarning = toText(warning) || "warning";
                      const nextOccurrence = (warningKeyCounts.get(normalizedWarning) ?? 0) + 1;
                      warningKeyCounts.set(normalizedWarning, nextOccurrence);

                      return <li key={`${message.id}-warning-${normalizedWarning}-${nextOccurrence}`}>{warning}</li>;
                    })}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}

          {footer ? <div className="mt-2">{footer}</div> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className={classNames("relative w-full", shouldHideAssistantAvatar ? "max-w-full" : "max-w-[96%]")}>
        <div className="relative">
          <div
            className={classNames(
              "relative z-10 border px-2.5 py-2 shadow-[0_10px_24px_rgba(15,23,42,0.06)]",
              bubbleClassName,
              GLOBAL_CHAT_RADIUS_CLASS
            )}
          >
          {shouldHideAssistantAvatar ? (
            <div className="w-full min-w-0 text-[12px] leading-5">
              <ChatMessageContent
                message={message.message}
                disabled={isSending}
                onChartTypeSelect={(value) => onChartTypeSelect(message.id, value)}
              />
            </div>
          ) : shouldWrapMarkdownAroundAvatar ? (
            <div className="min-w-0 text-[12px] leading-[1.15rem]">
              <span className="-ml-2 mr-1.5 mb-1.5 mt-0.5 float-left flex h-8 w-8 items-start justify-center">
                {message.state === "loading" ? (
                  <Spinner size="h-4 w-4" />
                ) : (
                  <img src={botImageSrc} alt="" className="h-8 w-8 object-contain" aria-hidden="true" />
                )}
              </span>
              <ChatMessageContent
                message={message.message}
                disabled={isSending}
                markdownLayout="wrapAroundAvatar"
                onChartTypeSelect={(value) => onChartTypeSelect(message.id, value)}
              />
              <div className="clear-both" />
            </div>
          ) : (
            <div className="flex items-start gap-1.5">
              <span className="-ml-0.5 mt-0.5 flex h-8 w-8 shrink-0 items-start justify-center">
                {message.state === "loading" ? (
                  <Spinner size="h-4 w-4" />
                ) : (
                  <img src={botImageSrc} alt="" className="h-8 w-8 object-contain" aria-hidden="true" />
                )}
              </span>
              <div className="min-w-0 flex-1 text-[12px] leading-[1.15rem]">
                <ChatMessageContent
                  message={message.message}
                  disabled={isSending}
                  onChartTypeSelect={(value) => onChartTypeSelect(message.id, value)}
                />
              </div>
            </div>
          )}

        {message.state === "error" && message.retryQuestion ? (
          <button
            type="button"
            className="mt-2 inline-flex items-center gap-1 rounded-[var(--radius-xl)] border border-rose-200 bg-white px-2.5 py-1.5 text-[12px] font-semibold text-rose-800 transition hover:bg-rose-100 focus:outline-hidden focus:ring-2 focus:ring-rose-300 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSending}
            onClick={() => onRetry(message.retryQuestion || "", message.id)}
          >
            <ArrowPathIcon className="h-3.5 w-3.5" />
            {retryLabel}
          </button>
        ) : null}

        {message.state === "done" && warnings.length > 0 ? (
          <div className="mt-2">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-[var(--radius-xl)] border border-amber-200 bg-amber-50 px-2 py-1 text-[12px] font-semibold text-amber-900 transition hover:bg-amber-100 focus:outline-hidden focus:ring-2 focus:ring-amber-200"
              onClick={() => setWarningsOpen((previous) => !previous)}
            >
              {warningsLabel} ({warnings.length})
            </button>

            {warningsOpen ? (
              <div className="mt-2 rounded-[var(--radius-xl)] border border-amber-200 bg-amber-50 px-2.5 py-2 text-[12px] leading-[1.15rem] text-amber-900">
                <ul className="list-disc space-y-1 pl-4">
                  {warnings.map((warning) => {
                    const normalizedWarning = toText(warning) || "warning";
                    const nextOccurrence = (warningKeyCounts.get(normalizedWarning) ?? 0) + 1;
                    warningKeyCounts.set(normalizedWarning, nextOccurrence);

                    return <li key={`${message.id}-warning-${normalizedWarning}-${nextOccurrence}`}>{warning}</li>;
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}
          </div>
          <span
            aria-hidden="true"
            className={classNames(
              "absolute left-[-6px] bottom-[7px] h-4 w-4 rotate-45 rounded-[4px] border",
              bubbleTailClassName
            )}
          />
        </div>
        {footer ? <div className="relative z-10 mt-2">{footer}</div> : null}
      </div>
    </div>
  );
};

// Provides one standard floating assistant shell that feature pages can control by props.
const AssistantChatShell = <TActionId extends string = string,>({
  isOpen,
  showLauncher,
  hasContext,
  isSending,
  title,
  launcherAriaLabel,
  closeAriaLabel,
  sendAriaLabel,
  sendingLabel,
  retryLabel,
  warningsLabel,
  inputPlaceholder,
  emptyStateTitle,
  emptyStateBody,
  noContextTitle,
  noContextBody,
  noContextMessage,
  desktopPlacement = "content-frame",
  bottomInset = ASSISTANT_BOTTOM_INSET,
  botImageSrc,
  launcherImageSources,
  contextNotice,
  headerActions,
  emptyStateContent,
  messagesHeaderContent,
  inputNotice,
  inputMaxLength,
  composerState = "enabled",
  draftValue,
  messages,
  quickActions,
  quickActionsLayout = "inline",
  messagesContainerRef,
  textareaRef,
  dialogRef,
  dialogId,
  ariaModal = false,
  onToggle,
  onClose,
  onDraftChange,
  onSubmit,
  onQuickAction,
  onRetry,
  onChartTypeSelect,
  onDraftKeyDown,
  renderAssistantMessageFooter,
}: AssistantChatShellProps<TActionId>) => {
  const composerDisabled = !hasContext || isSending || composerState === "blocked";
  const sendDisabled = composerDisabled || !toText(draftValue);
  const hasAssistantResponse = messages.some((message) => message.role === "assistant" && message.state !== "loading");
  const shouldExpandForContent = shouldUseExpandedContentLayout(messages);
  const desktopPlacementClassNames = DESKTOP_PLACEMENT_CLASS_NAMES[desktopPlacement];
  const assistantFloatingStyle = {
    ["--assistant-page-inset" as "--assistant-page-inset"]: ASSISTANT_PAGE_INSET,
    ["--assistant-bottom-inset" as "--assistant-bottom-inset"]: bottomInset,
  } as React.CSSProperties;

  return (
    <>
      {showLauncher ? (
        <AssistantLauncherButton
          aria-label={launcherAriaLabel}
          title={launcherAriaLabel}
          imageSources={launcherImageSources}
          desktopPlacement={desktopPlacement}
          bottomInset={bottomInset}
          onClick={onToggle}
        />
      ) : null}

      <div
        className={classNames(
          "fixed inset-0 z-[2050] transition-opacity duration-200",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        style={assistantFloatingStyle}
      >
        <button
          type="button"
          aria-label={closeAriaLabel}
          className="absolute inset-0 bg-slate-950/16 backdrop-blur-[1px]"
          onClick={onClose}
        />

        <aside
          id={dialogId}
          ref={dialogRef}
          role="dialog"
          aria-modal={ariaModal}
          aria-label={title}
          tabIndex={dialogRef ? -1 : undefined}
          className={classNames(
            "absolute flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-slate-200 bg-white/96 text-[12px] shadow-[0_28px_60px_rgba(15,23,42,0.22)] backdrop-blur-xl transition-transform duration-300 [bottom:var(--assistant-bottom-inset)] [left:var(--assistant-page-inset)] [right:var(--assistant-page-inset)] lg:w-[368px]",
            desktopPlacementClassNames.panel,
            shouldExpandForContent ? EXPANDED_PANEL_HEIGHT_CLASS : DEFAULT_PANEL_HEIGHT_CLASS,
            isOpen
              ? "translate-y-0 lg:translate-x-0"
              : classNames("translate-y-full lg:translate-y-0", desktopPlacementClassNames.closedPanel)
          )}
        >
          <header className="border-b border-slate-200 bg-linear-to-r from-slate-50 via-white to-sky-50/70 px-3 py-1.5">
            <div className="flex items-center gap-2">
              {!hasAssistantResponse ? (
                <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-visible">
                  <img src={botImageSrc} alt="" className="h-7 w-7 object-contain" aria-hidden="true" />
                </span>
              ) : null}
              <div className="min-w-0 flex-1">
                <h2 className="text-[12px] font-semibold leading-4 text-primary">{title}</h2>
              </div>
              {headerActions}
              <button
                type="button"
                className="rounded-[var(--radius-xl)] border border-slate-200 bg-white p-[5px] text-slate-500 transition hover:border-slate-300 hover:text-primary focus:outline-hidden focus:ring-2 focus:ring-primary/30"
                aria-label={closeAriaLabel}
                onClick={onClose}
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          </header>

          {contextNotice ? (
            <div className="border-b border-sky-100 bg-sky-50 px-3 py-1.5 text-[12px] font-medium leading-5 text-sky-900">
              {contextNotice}
            </div>
          ) : null}

          {messagesHeaderContent ? (
            <div className="border-b border-slate-200 bg-slate-50/80 px-3 py-2">
              {messagesHeaderContent}
            </div>
          ) : null}

          <div ref={messagesContainerRef} className="flex-1 space-y-4 overflow-y-auto px-3 py-3 lg:px-3">
            {messages.length === 0 ? (
              <div className="flex min-h-full flex-col items-center justify-start px-3 pt-5 text-center">
                <span className="mb-2 text-primary">
                  {hasContext ? <SparklesIcon className="h-7 w-7" /> : <ChatBubbleLeftRightIcon className="h-7 w-7" />}
                </span>
                <h3 className="text-[12px] font-semibold tracking-[0.01em] text-primary">
                  {hasContext ? emptyStateTitle : noContextTitle}
                </h3>
                <p className="mt-2 max-w-[30ch] text-[12px] leading-5 text-slate-600">
                  {hasContext ? emptyStateBody : noContextBody}
                </p>
                {hasContext ? emptyStateContent : null}
              </div>
            ) : (
              messages.map((message) => (
                <AssistantChatMessageBubble
                  key={message.id}
                  botImageSrc={botImageSrc}
                  isSending={isSending}
                  message={message}
                  retryLabel={retryLabel}
                  warningsLabel={warningsLabel}
                  onRetry={onRetry}
                  onChartTypeSelect={onChartTypeSelect}
                  footer={
                    message.role === "assistant" && message.state === "done"
                      ? renderAssistantMessageFooter?.(message)
                      : null
                  }
                />
              ))
            )}
          </div>

          <div className="border-t border-slate-200 bg-white/90 px-3 py-2.5 lg:px-3">
            {quickActions && quickActions.length > 0 && onQuickAction ? (
              <AssistantQuickActions
                actions={quickActions}
                disabled={composerDisabled}
                layout={quickActionsLayout}
                onSelect={onQuickAction}
              />
            ) : null}

            {inputNotice ? (
              <p className="mb-2 text-[10px] font-medium leading-4 text-amber-800" role="note">
                {inputNotice}
              </p>
            ) : null}

            <div className="glass-panel shadow-card relative rounded-[var(--radius-xl)] border border-slate-200 bg-white/95 px-2.5 py-2">
              {!toText(draftValue) ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-2.5 top-2 select-none animate-pulse text-[30px] font-semibold leading-none tracking-[0.18em] text-slate-300"
                >
                  ...
                </span>
              ) : null}
              <textarea
                ref={textareaRef}
                rows={1}
                maxLength={inputMaxLength}
                className="block min-h-[44px] w-full resize-none bg-transparent px-0 py-0 pr-[56px] text-[12px] leading-5 text-slate-700 placeholder:text-transparent focus:outline-hidden disabled:cursor-not-allowed disabled:text-slate-400"
                value={draftValue}
                disabled={composerDisabled}
                placeholder={inputPlaceholder}
                aria-label={inputPlaceholder}
                onChange={(event) => onDraftChange(event.target.value || "")}
                onKeyDown={onDraftKeyDown}
              />
              <button
                type="button"
                className="absolute bottom-2 right-2 inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-xl)] bg-primary text-white shadow-sm transition hover:bg-primary/90 focus:outline-hidden focus:ring-4 focus:ring-primary/25 disabled:cursor-not-allowed disabled:bg-slate-300"
                disabled={sendDisabled}
                aria-label={sendAriaLabel}
                onClick={onSubmit}
              >
                {isSending ? <Spinner size="h-4 w-4" label={sendingLabel} /> : <PaperAirplaneIcon className="h-4 w-4" />}
              </button>

              {!hasContext ? <p className="mt-2 text-[12px] leading-5 text-amber-900">{noContextMessage}</p> : null}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default AssistantChatShell;
