import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type RefObject,
} from "react";
import type { AssistantChatMessage } from "../../../components/commons/chat/assistantChatTypes.ts";
import { createMarkdownMessage } from "../../../components/commons/chat/chatMessageFactories.ts";
import { ApiFetchError } from "../../../services/apiService.ts";
import { indT } from "../../../utils/indI18n.ts";
import { askCrmHelp } from "./helpService.ts";
import {
  buildBoundedHelpHistory,
  resolveReusableHelpTurn,
} from "./helpConversation.ts";
import { getHelpResolutionFallback } from "./helpResponseCopy.ts";
import type {
  HelpAnswerDetails,
  HelpModule,
  HelpResponseLocale,
} from "./helpTypes.ts";

type UseHomeHelpAssistantArgs = {
  isOpen: boolean;
  responseLocale: HelpResponseLocale;
  selectedModule: HelpModule | null;
  onClose: () => void;
};

type UseHomeHelpAssistantResult = {
  isSending: boolean;
  draftQuestion: string;
  messages: AssistantChatMessage[];
  answerDetailsByMessageId: Record<string, HelpAnswerDetails>;
  messagesContainerRef: RefObject<HTMLDivElement | null>;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  dialogRef: RefObject<HTMLElement | null>;
  setDraftQuestion: (value: string) => void;
  submitDraftQuestion: () => Promise<void>;
  retryQuestion: (question: string, assistantMessageId: string) => Promise<void>;
  selectCandidate: (question: string, topicId: string, assistantMessageId: string) => Promise<void>;
  handleDraftKeyDown: (event: ReactKeyboardEvent<HTMLTextAreaElement>) => void;
};

const MAX_QUESTION_LENGTH = 1200;
const MAX_TEXTAREA_HEIGHT_PX = 168;
const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

// Creates a collision-resistant local message id without storing chat state remotely.
const createMessageId = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (token) => {
    const randomValue = Math.floor(Math.random() * 16);
    const value = token === "x" ? randomValue : (randomValue & 0x3) | 0x8;
    return value.toString(16);
  });
};

type SendQuestionOptions = {
  topicIdOverride?: string | null;
  reuseAssistantMessageId?: string;
};

// Resolves a localized safe error without exposing upstream response bodies.
const resolveAskError = (error: unknown): { text: string; retryable: boolean; status?: number } => {
  if (error instanceof ApiFetchError) {
    if (error.status === 429) {
      return {
        text: indT("HomeHelp_ErrorRateLimit", "Too many requests. Please wait and try again."),
        retryable: true,
        status: error.status,
      };
    }

    return {
      text: error.message || indT("HomeHelp_ErrorRequest", "The assistant is not available right now."),
      retryable: Boolean(error.status && [500, 502, 503, 504].includes(error.status)),
      status: error.status,
    };
  }

  return {
    text: indT("HomeHelp_ErrorRequest", "The assistant is not available right now."),
    retryable: true,
  };
};

// Owns the Home help conversation, bounded history, and request lifecycle.
export const useHomeHelpAssistant = ({
  isOpen,
  responseLocale,
  selectedModule,
  onClose,
}: UseHomeHelpAssistantArgs): UseHomeHelpAssistantResult => {
  const [isSending, setIsSending] = useState(false);
  const [draftQuestion, setDraftQuestion] = useState("");
  const [messages, setMessages] = useState<AssistantChatMessage[]>([]);
  const [answerDetailsByMessageId, setAnswerDetailsByMessageId] = useState<Record<string, HelpAnswerDetails>>({});
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const dialogRef = useRef<HTMLElement | null>(null);
  const askControllerRef = useRef<AbortController | null>(null);
  const askInFlightRef = useRef(false);
  const retryTopicByMessageIdRef = useRef(new Map<string, string | null>());

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frameId = window.requestAnimationFrame(() => dialogRef.current?.focus({ preventScroll: true }));
    const handleDialogKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.current;
      if (!dialog) {
        return;
      }

      const focusableElements = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
        .filter((element) => element.getClientRects().length > 0 && element.getAttribute("aria-hidden") !== "true");
      if (focusableElements.length === 0) {
        event.preventDefault();
        dialog.focus({ preventScroll: true });
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;
      if (event.shiftKey && (activeElement === dialog || activeElement === firstElement || !dialog.contains(activeElement))) {
        event.preventDefault();
        lastElement.focus({ preventScroll: true });
      } else if (!event.shiftKey && (activeElement === dialog || activeElement === lastElement || !dialog.contains(activeElement))) {
        event.preventDefault();
        firstElement.focus({ preventScroll: true });
      }
    };
    window.addEventListener("keydown", handleDialogKeyDown);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("keydown", handleDialogKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      return;
    }

    askControllerRef.current?.abort();
  }, [isOpen]);

  useEffect(() => {
    return () => askControllerRef.current?.abort();
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) {
      return;
    }

    textarea.style.height = "auto";
    const nextHeight = Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT_PX);
    textarea.style.height = `${Math.max(44, nextHeight)}px`;
    textarea.style.overflowY = textarea.scrollHeight > MAX_TEXTAREA_HEIGHT_PX ? "auto" : "hidden";
  }, [draftQuestion, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      const container = messagesContainerRef.current;
      if (container) {
        container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
      }
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [isOpen, messages]);

  const sendQuestion = useCallback(
    async (rawQuestion: string, options: SendQuestionOptions = {}) => {
      const question = String(rawQuestion || "").trim().slice(0, MAX_QUESTION_LENGTH);
      const selectedModuleId = String(selectedModule?.id || "").trim();
      if (!question || !selectedModuleId || askInFlightRef.current) {
        return;
      }

      const reuseAssistantMessageId = String(options.reuseAssistantMessageId || "").trim();
      const reusableTurn = reuseAssistantMessageId
        ? resolveReusableHelpTurn(messages, reuseAssistantMessageId, question)
        : null;
      if (reuseAssistantMessageId && !reusableTurn) {
        return;
      }

      const history = reusableTurn?.history ?? buildBoundedHelpHistory(messages);
      const userMessageId = reusableTurn?.userMessageId ?? createMessageId();
      const assistantMessageId = reusableTurn?.assistantMessage.id ?? createMessageId();
      const hasTopicOverride = Object.prototype.hasOwnProperty.call(options, "topicIdOverride");
      const selectedTopicId = String(
        hasTopicOverride ? options.topicIdOverride ?? "" : ""
      ).trim() || null;
      const userMessage: AssistantChatMessage = {
        id: userMessageId,
        role: "user",
        message: createMarkdownMessage(question),
        state: "done",
      };
      const loadingMessage: AssistantChatMessage = {
        id: assistantMessageId,
        role: "assistant",
        message: createMarkdownMessage(indT("HomeHelp_Loading", "Searching the CRM help guide…")),
        state: "loading",
      };

      setMessages((current) => reusableTurn
        ? current.map((message) => message.id === assistantMessageId ? loadingMessage : message)
        : [...current, userMessage, loadingMessage]);
      retryTopicByMessageIdRef.current.set(assistantMessageId, selectedTopicId);
      const controller = new AbortController();
      askControllerRef.current = controller;
      askInFlightRef.current = true;
      setIsSending(true);

      try {
        const response = await askCrmHelp({
          question,
          responseLocale,
          selectedModuleId,
          selectedTopicId,
          history,
          clientInteractionId: createMessageId(),
        }, controller.signal);
        const fallbackAnswer = getHelpResolutionFallback(responseLocale, response.resolution);
        const completedMessage: AssistantChatMessage = {
          id: assistantMessageId,
          role: "assistant",
          message: createMarkdownMessage(String(response.answer || fallbackAnswer)),
          state: "done",
          meta: { traceId: response.interactionId },
        };

        setMessages((current) =>
          current.map((message) => (message.id === assistantMessageId ? completedMessage : message))
        );
        setAnswerDetailsByMessageId((current) => ({
          ...current,
          [assistantMessageId]: { ...response, question },
        }));
        retryTopicByMessageIdRef.current.delete(assistantMessageId);
        setDraftQuestion((current) => (current.trim() === question ? "" : current));
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          setMessages((current) => reusableTurn
            ? current.map((message) =>
                message.id === assistantMessageId ? reusableTurn.assistantMessage : message
              )
            : current.filter((message) => message.id !== userMessageId && message.id !== assistantMessageId));
          if (!reusableTurn) {
            retryTopicByMessageIdRef.current.delete(assistantMessageId);
          }
          return;
        }
        const resolvedError = resolveAskError(error);
        const failedMessage: AssistantChatMessage = {
          id: assistantMessageId,
          role: "assistant",
          message: createMarkdownMessage(resolvedError.text),
          state: "error",
          retryQuestion: resolvedError.retryable ? question : null,
          meta: { httpStatus: resolvedError.status },
        };
        setMessages((current) =>
          current.map((message) => (message.id === assistantMessageId ? failedMessage : message))
        );
      } finally {
        if (askControllerRef.current === controller) {
          askControllerRef.current = null;
        }
        askInFlightRef.current = false;
        setIsSending(false);
      }
    },
    [messages, responseLocale, selectedModule]
  );

  const submitDraftQuestion = useCallback(async () => {
    await sendQuestion(draftQuestion);
  }, [draftQuestion, sendQuestion]);

  const retryQuestion = useCallback(async (question: string, assistantMessageId: string) => {
    const options: SendQuestionOptions = { reuseAssistantMessageId: assistantMessageId };
    if (retryTopicByMessageIdRef.current.has(assistantMessageId)) {
      options.topicIdOverride = retryTopicByMessageIdRef.current.get(assistantMessageId) ?? null;
    }
    await sendQuestion(question, options);
  }, [sendQuestion]);

  const selectCandidate = useCallback(async (
    question: string,
    topicId: string,
    assistantMessageId: string
  ) => {
    await sendQuestion(question, { topicIdOverride: topicId, reuseAssistantMessageId: assistantMessageId });
  }, [sendQuestion]);

  const handleDraftKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key !== "Enter" || event.shiftKey) {
        return;
      }

      event.preventDefault();
      if (!isSending) {
        void submitDraftQuestion();
      }
    },
    [isSending, submitDraftQuestion]
  );

  return {
    isSending,
    draftQuestion,
    messages,
    answerDetailsByMessageId,
    messagesContainerRef,
    textareaRef,
    dialogRef,
    setDraftQuestion,
    submitDraftQuestion,
    retryQuestion,
    selectCandidate,
    handleDraftKeyDown,
  };
};
