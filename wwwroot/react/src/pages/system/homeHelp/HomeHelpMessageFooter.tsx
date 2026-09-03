import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowTopRightOnSquareIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { indT } from "../../../utils/indI18n.ts";
import { resolveHelpNavigation } from "./helpNavigation.ts";
import { fetchHelpTopic, submitCrmHelpFeedback } from "./helpService.ts";
import type {
  HelpAnswerDetails,
  HelpFeedbackReason,
  HelpResponseLocale,
  HelpSource,
} from "./helpTypes.ts";

type HomeHelpMessageFooterProps = {
  details: HelpAnswerDetails;
  responseLocale: HelpResponseLocale;
  disabled: boolean;
  onCandidate: (question: string, topicId: string) => void;
};

type SourcePreview = {
  heading: string;
  body: string;
  loading: boolean;
  error: string;
};

const FEEDBACK_REASONS: HelpFeedbackReason[] = [
  "incorrect",
  "outdated",
  "unclear",
  "incomplete",
  "permissions",
  "other",
];

const feedbackReasonLabel = (reason: HelpFeedbackReason): string => {
  return indT(`HomeHelp_FeedbackReason_${reason}`, reason);
};

const sourceKey = (source: HelpSource): string => `${source.topicId}:${source.chunkId}`;

// Renders candidates, validated navigation, source inspection, and per-answer feedback.
const HomeHelpMessageFooter = ({
  details,
  responseLocale,
  disabled,
  onCandidate,
}: HomeHelpMessageFooterProps) => {
  const [expandedSourceKey, setExpandedSourceKey] = useState("");
  const [sourcePreviews, setSourcePreviews] = useState<Record<string, SourcePreview>>({});
  const [rating, setRating] = useState<boolean | null>(null);
  const [reason, setReason] = useState<HelpFeedbackReason | "">("");
  const [comment, setComment] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const sourceControllersRef = useRef(new Set<AbortController>());

  const navigationActions = useMemo(
    () => details.actions.map((action) => resolveHelpNavigation(action)).filter((action) => action !== null),
    [details.actions]
  );

  useEffect(() => {
    return () => {
      sourceControllersRef.current.forEach((controller) => controller.abort());
      sourceControllersRef.current.clear();
    };
  }, []);

  const toggleSource = async (source: HelpSource) => {
    const key = sourceKey(source);
    if (expandedSourceKey === key) {
      setExpandedSourceKey("");
      return;
    }

    setExpandedSourceKey(key);
    if (sourcePreviews[key]) {
      return;
    }

    setSourcePreviews((current) => ({
      ...current,
      [key]: { heading: source.heading, body: "", loading: true, error: "" },
    }));
    const controller = new AbortController();
    sourceControllersRef.current.add(controller);

    try {
      const topic = await fetchHelpTopic(source.topicId, responseLocale, controller.signal);
      const chunk = topic.chunks.find((item) => item.id === source.chunkId);
      if (!chunk) {
        throw new Error("SOURCE_NOT_FOUND");
      }
      setSourcePreviews((current) => ({
        ...current,
        [key]: { heading: chunk.heading || source.heading, body: chunk.body, loading: false, error: "" },
      }));
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      setSourcePreviews((current) => ({
        ...current,
        [key]: {
          heading: source.heading,
          body: "",
          loading: false,
          error: indT("HomeHelp_SourceError", "The cited section could not be loaded."),
        },
      }));
    } finally {
      sourceControllersRef.current.delete(controller);
    }
  };

  const sendFeedback = async (helpful: boolean) => {
    if (!details.feedbackToken || feedbackStatus === "sending" || feedbackStatus === "sent") {
      return;
    }
    const selectedReason: HelpFeedbackReason | null = helpful || !reason ? null : reason;
    if (!helpful && !selectedReason) {
      return;
    }

    setFeedbackStatus("sending");
    try {
      await submitCrmHelpFeedback({
        feedbackToken: details.feedbackToken,
        helpful,
        reason: selectedReason,
        comment: comment.trim() || null,
      });
      setRating(helpful);
      setFeedbackStatus("sent");
    } catch {
      setFeedbackStatus("error");
    }
  };

  return (
    <div className="space-y-2 text-[11px] leading-4 text-slate-600">
      {details.candidates.length > 0 ? (
        <div className="rounded-[var(--radius-xl)] border border-sky-100 bg-sky-50/70 p-2">
          <p className="font-semibold text-primary">{indT("HomeHelp_NeedsSelection", "Choose the closest topic.")}</p>
          <div className="mt-1.5 grid gap-1.5">
            {details.candidates.slice(0, 4).map((candidate) => (
              <button
                key={candidate.topicId}
                type="button"
                disabled={disabled}
                className="rounded-[var(--radius-xl)] border border-sky-100 bg-white px-2 py-1.5 text-left font-semibold text-primary transition hover:border-primary/25 focus:outline-hidden focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => onCandidate(details.question, candidate.topicId)}
              >
                <span className="block">{candidate.title}</span>
                {candidate.summary ? <span className="mt-0.5 block font-normal text-slate-500">{candidate.summary}</span> : null}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {details.sources.length > 0 ? (
        <div>
          <p className="mb-1 font-semibold text-slate-500">{indT("HomeHelp_SourcesLabel", "Sources")}</p>
          <div className="space-y-1">
            {details.sources.map((source) => {
              const key = sourceKey(source);
              const preview = sourcePreviews[key];
              const expanded = expandedSourceKey === key;
              return (
                <div key={key} className="rounded-[var(--radius-xl)] border border-slate-200 bg-white">
                  <button
                    type="button"
                    className="flex w-full items-center gap-1.5 px-2 py-1.5 text-left font-semibold text-primary focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-primary/20"
                    aria-expanded={expanded}
                    onClick={() => void toggleSource(source)}
                  >
                    <BookOpenIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span className="min-w-0 flex-1 truncate">{source.heading || source.topicTitle}</span>
                    <ChevronDownIcon className={`h-3.5 w-3.5 shrink-0 transition ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                  {expanded ? (
                    <div className="border-t border-slate-100 px-2 py-2 text-slate-600">
                      {preview?.loading ? indT("HomeHelp_SourceLoading", "Loading source...") : null}
                      {preview?.error ? <p className="text-rose-700">{preview.error}</p> : null}
                      {preview?.body ? (
                        <div>
                          <p className="font-semibold text-slate-700">{preview.heading}</p>
                          <p className="mt-1 whitespace-pre-wrap">{preview.body}</p>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {navigationActions.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
          {navigationActions.map((action) => (
            <a
              key={action.href}
              href={action.href}
              className="inline-flex items-center gap-1 rounded-[var(--radius-xl)] bg-primary px-2.5 py-1.5 font-semibold text-white transition hover:bg-primary/90 focus:outline-hidden focus:ring-2 focus:ring-primary/25"
            >
              {action.label || indT("HomeHelp_Navigate", "Open module")}
              <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ))}
        </div>
      ) : null}

      {details.quickAnswerUsed ? (
        <p className="inline-flex items-center gap-1 text-emerald-700">
          <CheckCircleIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {indT("HomeHelp_QuickAnswer", "Reviewed quick answer")}
        </p>
      ) : null}

      {details.feedbackToken && details.resolution !== "needsSelection" ? (
        <div className="rounded-[var(--radius-xl)] border border-slate-200 bg-slate-50 p-2">
          {feedbackStatus === "sent" ? (
            <p className="inline-flex items-center gap-1 font-semibold text-emerald-700" role="status">
              <CheckCircleIcon className="h-4 w-4" aria-hidden="true" />
              {indT("HomeHelp_FeedbackThanks", "Thank you. Your feedback was saved.")}
            </p>
          ) : (
            <>
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-slate-700">{indT("HomeHelp_FeedbackPrompt", "Was this answer helpful?")}</p>
                <div className="flex gap-1">
                  <button
                    type="button"
                    disabled={disabled || feedbackStatus === "sending"}
                    aria-label={indT("HomeHelp_HelpfulAria", "Mark answer as helpful")}
                    className="rounded-[var(--radius-xl)] border border-slate-200 bg-white p-1.5 text-slate-600 hover:text-emerald-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-200 disabled:opacity-50"
                    onClick={() => void sendFeedback(true)}
                  >
                    <HandThumbUpIcon className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    disabled={disabled || feedbackStatus === "sending"}
                    aria-label={indT("HomeHelp_NotHelpfulAria", "Mark answer as not helpful")}
                    aria-expanded={rating === false}
                    className="rounded-[var(--radius-xl)] border border-slate-200 bg-white p-1.5 text-slate-600 hover:text-rose-700 focus:outline-hidden focus:ring-2 focus:ring-rose-200 disabled:opacity-50"
                    onClick={() => {
                      setRating(false);
                      setFeedbackStatus("idle");
                    }}
                  >
                    <HandThumbDownIcon className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {rating === false ? (
                <div className="mt-2 space-y-2">
                  <label className="block font-semibold text-slate-700">
                    {indT("HomeHelp_FeedbackReasonLabel", "Reason")}
                    <select
                      value={reason}
                      disabled={disabled || feedbackStatus === "sending"}
                      className="ind-native-select-chevron mt-1 block w-full rounded-[var(--radius-xl)] border border-slate-200 bg-white px-2 py-1.5 text-[11px] text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-primary/20"
                      onChange={(event) => setReason(event.target.value as HelpFeedbackReason | "")}
                    >
                      <option value="">{indT("HomeHelp_FeedbackReasonPlaceholder", "Select a reason")}</option>
                      {FEEDBACK_REASONS.map((item) => (
                        <option key={item} value={item}>{feedbackReasonLabel(item)}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block font-semibold text-slate-700">
                    {indT("HomeHelp_FeedbackCommentLabel", "Optional comment")}
                    <textarea
                      value={comment}
                      rows={2}
                      maxLength={500}
                      disabled={disabled || feedbackStatus === "sending"}
                      placeholder={indT("HomeHelp_FeedbackCommentPlaceholder", "Do not include personal or customer data.")}
                      className="mt-1 block w-full resize-y rounded-[var(--radius-xl)] border border-slate-200 bg-white px-2 py-1.5 text-[11px] font-normal text-slate-700 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-primary/20"
                      onChange={(event) => setComment(event.target.value)}
                    />
                  </label>
                  <button
                    type="button"
                    disabled={!reason || disabled || feedbackStatus === "sending"}
                    className="rounded-[var(--radius-xl)] bg-primary px-2.5 py-1.5 font-semibold text-white hover:bg-primary/90 focus:outline-hidden focus:ring-2 focus:ring-primary/25 disabled:cursor-not-allowed disabled:bg-slate-300"
                    onClick={() => void sendFeedback(false)}
                  >
                    {feedbackStatus === "sending"
                      ? indT("HomeHelp_FeedbackSending", "Sending...")
                      : indT("HomeHelp_FeedbackSubmit", "Send feedback")}
                  </button>
                </div>
              ) : null}

              {feedbackStatus === "error" ? (
                <p className="mt-2 text-rose-700" role="alert">
                  {indT("HomeHelp_FeedbackError", "Feedback could not be saved. Please try again.")}
                </p>
              ) : null}
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default HomeHelpMessageFooter;
