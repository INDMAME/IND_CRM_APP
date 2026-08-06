import {
  useCallback,
  useEffect,
  useEffectEvent,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type RefObject,
} from "react";
import type { ChatMessage, VisualizationType } from "../../../components/commons/chat/chatMessageContract.ts";
import {
  createChartTypeChoiceMessage,
  createMarkdownMessage,
} from "../../../components/commons/chat/chatMessageFactories.ts";
import {
  detectGreetingIntent,
  detectTechnicalDisclosureIntent,
  detectVisualizationIntent,
} from "../../../components/commons/chat/chatIntentUtils.ts";
import { parseStructuredChatMessages } from "../../../components/commons/chat/chatMessageParsing.ts";
import { buildStructuredAssistantAnswerInstructions } from "../../../components/commons/chat/chatPromptConventions.ts";
import { ApiFetchError } from "../../../services/apiService.ts";
import { indT } from "../../../utils/indI18n.ts";
import { askExpenseSheetsQuestion, fetchExpenseSheetListSourceJson } from "../utils/expenseApi.ts";
import { runExpenseReadRequestWithRetry } from "../utils/expenseRequestRetry.ts";
import type { ExpenseSheetListResponseEnvelope, ExpenseSheetsAskResult, IndValidationError } from "../expenseTypes.ts";
import { safeText, sanitizeAssistantText } from "../utils/expenseUiUtils.ts";
import {
  buildExpenseSheetsVisualizationSelectionMessage,
  resolveExpenseSheetsAssistantCopy,
  type ExpenseSheetsAssistantCopy,
} from "./expenseSheetsAssistantI18n.ts";
import type {
  ExpenseSheetsAssistantContextSnapshot,
  ExpenseSheetsAssistantMessage,
  ExpenseSheetsAssistantQuickAction,
} from "./expenseSheetsAssistantTypes.ts";

type UseExpenseSheetsAssistantArgs = {
  context: ExpenseSheetsAssistantContextSnapshot;
  isListLoading: boolean;
  uiLanguage?: string | null;
};

type UseExpenseSheetsAssistantResult = {
  isOpen: boolean;
  isSending: boolean;
  hasContext: boolean;
  contextNotice: string;
  draftQuestion: string;
  messages: ExpenseSheetsAssistantMessage[];
  quickActions: ExpenseSheetsAssistantQuickAction[];
  launcherAriaLabel: string;
  panelTitle: string;
  openPanel: () => void;
  closePanel: () => void;
  togglePanel: () => void;
  setDraftQuestion: (value: string) => void;
  submitDraftQuestion: () => Promise<void>;
  submitQuickAction: (question: string) => Promise<void>;
  retryQuestion: (question: string) => Promise<void>;
  selectChartType: (messageId: string, value: VisualizationType) => Promise<void>;
  handleDraftKeyDown: (event: ReactKeyboardEvent<HTMLTextAreaElement>) => void;
  messagesContainerRef: RefObject<HTMLDivElement | null>;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
};

const MAX_TEXTAREA_HEIGHT_PX = 168;
const DEFAULT_ASSISTANT_VISUAL_WIDTH_PX = 304;
const DEFAULT_ASSISTANT_VISUAL_HEIGHT_PX = 264;

type ExpenseSheetsAssistantSourceJsonCache = {
  contextVersion: number;
  axUserIdOverride: string;
  response: ExpenseSheetListResponseEnvelope;
};

type SendQuestionOptions = {
  requestedVisualizationType?: VisualizationType | null;
  appendUserQuestion?: boolean;
  userSelectionMessage?: ChatMessage | null;
};

const createMessageId = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `assistant-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const formatValidationErrors = (errors: IndValidationError[] | null | undefined): string => {
  if (!Array.isArray(errors) || errors.length === 0) {
    return "";
  }

  return errors
    .map((entry) => {
      const field = safeText(entry?.Field);
      const message = safeText(entry?.Message);
      if (field && message) return `${field}: ${message}`;
      return message || field;
    })
    .filter(Boolean)
    .join(" | ");
};

const extractTraceIdFromApiError = (error: ApiFetchError): string => {
  const payload = safeText(error.responseBody);
  if (!payload) return "";

  try {
    const parsed = JSON.parse(payload) as Record<string, unknown>;
    return safeText(parsed.TraceId ?? parsed.traceId);
  } catch {
    return "";
  }
};

const ASSISTANT_QUERY_RATE_LIMIT_ERROR_CODE = "ASSISTANT_QUERY_RATE_LIMIT_EXCEEDED";

// Extracts the stable API error code without exposing the raw response body.
const extractErrorCodeFromApiError = (error: ApiFetchError): string => {
  const payload = safeText(error.responseBody);
  if (!payload) return "";

  try {
    const parsed = JSON.parse(payload) as Record<string, unknown>;
    return safeText(parsed.ErrorCode ?? parsed.errorCode);
  } catch {
    return "";
  }
};

const isAssistantQueryRateLimit = (status: number | undefined, errorCode: string): boolean => {
  return status === 429 && errorCode === ASSISTANT_QUERY_RATE_LIMIT_ERROR_CODE;
};

const isRetryableStatus = (status: number | undefined, errorCode: string): boolean => {
  if (isAssistantQueryRateLimit(status, errorCode)) return false;
  return status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
};

const resolveFailedAskMessage = (
  response: ExpenseSheetsAskResult,
  assistantCopy: ExpenseSheetsAssistantCopy
): string => {
  const validationText = formatValidationErrors(response.Errors);
  const responseMessage = sanitizeAssistantText(response.Message);
  if (response.HttpStatus === 422) {
    return validationText || responseMessage || assistantCopy.errorValidation;
  }

  if (isAssistantQueryRateLimit(response.HttpStatus, safeText(response.ErrorCode))) {
    return assistantCopy.errorRateLimit;
  }

  if (response.HttpStatus === 429) {
    return responseMessage || indT("Api_RequestFailed", "Request failed.");
  }

  if (response.HttpStatus === 500) {
    return responseMessage || assistantCopy.errorServer;
  }

  return responseMessage || indT("Api_RequestFailed", "Request failed.");
};

const resolveThrownAskMessage = (
  error: unknown,
  assistantCopy: ExpenseSheetsAssistantCopy
): { message: string; status?: number; traceId: string; errorCode: string } => {
  if (error instanceof ApiFetchError) {
    const errorCode = extractErrorCodeFromApiError(error);
    const validationText = formatValidationErrors(error.validationErrors);
    if (validationText) {
      return {
        message: validationText,
        status: error.status,
        traceId: extractTraceIdFromApiError(error),
        errorCode,
      };
    }

    if (isAssistantQueryRateLimit(error.status, errorCode)) {
      return {
        message: assistantCopy.errorRateLimit,
        status: error.status,
        traceId: extractTraceIdFromApiError(error),
        errorCode,
      };
    }

    if (error.status === 500) {
      return {
        message: assistantCopy.errorServer,
        status: error.status,
        traceId: extractTraceIdFromApiError(error),
        errorCode,
      };
    }

    return {
      message: sanitizeAssistantText(error.message) || indT("Api_RequestFailed", "Request failed."),
      status: error.status,
      traceId: extractTraceIdFromApiError(error),
      errorCode,
    };
  }

  return {
    message: error instanceof Error && sanitizeAssistantText(error.message)
      ? sanitizeAssistantText(error.message)
      : indT("Api_RequestFailed", "Request failed."),
    status: undefined,
    traceId: "",
    errorCode: "",
  };
};

const buildErrorMessage = (
  id: string,
  question: string,
  message: string,
  status: number | undefined,
  traceId: string,
  retryAfter?: string | null,
  errorCode = ""
): ExpenseSheetsAssistantMessage => ({
  id,
  role: "assistant",
  message: createMarkdownMessage(message),
  state: "error",
  retryQuestion: isRetryableStatus(status, errorCode) ? question : null,
  meta: {
    httpStatus: status,
    traceId,
    retryAfter: retryAfter || null,
  },
});

const buildUserMessage = (id: string, message: ChatMessage): ExpenseSheetsAssistantMessage => ({
  id,
  role: "user",
  message,
  state: "done",
});

const buildAssistantMessage = (
  id: string,
  message: ChatMessage,
  state: ExpenseSheetsAssistantMessage["state"],
  meta?: ExpenseSheetsAssistantMessage["meta"]
): ExpenseSheetsAssistantMessage => ({
  id,
  role: "assistant",
  message,
  state,
  meta,
});

const replaceMessageWithEntries = (
  messages: ExpenseSheetsAssistantMessage[],
  targetId: string,
  replacements: ExpenseSheetsAssistantMessage[]
): ExpenseSheetsAssistantMessage[] => {
  return messages.flatMap((entry) => (entry.id === targetId ? replacements : [entry]));
};

const resolveAssistantUiLanguage = (): string => {
  if (typeof document !== "undefined") {
    const languageFromDocument = safeText(document.documentElement.lang);
    if (languageFromDocument) {
      return languageFromDocument;
    }
  }

  if (typeof navigator !== "undefined") {
    const languageFromNavigator = safeText(navigator.language);
    if (languageFromNavigator) {
      return languageFromNavigator;
    }
  }

  return "es-ES";
};

const buildTechnicalQuestionRefusal = (uiLanguage: string): string => {
  const normalizedLanguage = safeText(uiLanguage).toLowerCase();

  if (normalizedLanguage.startsWith("en")) {
    return "I can help with the expense data, but I cannot explain the assistant's technical setup or internal operation.";
  }

  if (normalizedLanguage.startsWith("eu")) {
    return "Gastuen datuekin lagundu dezaket, baina ezin dut azaldu laguntzailearen konfigurazio teknikoa edo barne funtzionamendua.";
  }

  if (normalizedLanguage.startsWith("pt")) {
    return "Posso ajudar com os dados de despesas, mas nao posso explicar a configuracao tecnica nem o funcionamento interno do assistente.";
  }

  if (normalizedLanguage.startsWith("it")) {
    return "Posso aiutarti con i dati delle spese, ma non posso spiegare la configurazione tecnica o il funzionamento interno dell'assistente.";
  }

  if (normalizedLanguage.startsWith("zh")) {
    return "我可以帮助你分析费用数据，但不能说明该助手的技术实现或内部工作方式。";
  }

  return "Puedo ayudarte con los datos de gastos, pero no puedo explicar la configuracion tecnica ni el funcionamiento interno del asistente.";
};

const resolveAssistantVisualizationHints = (container: HTMLDivElement | null): {
  availableWidthPx: number;
  availableHeightPx: number;
} => {
  const containerWidth = container?.clientWidth ?? 0;
  const availableWidthPx = containerWidth > 0
    ? Math.max(220, Math.min(360, Math.round(containerWidth - 8)))
    : DEFAULT_ASSISTANT_VISUAL_WIDTH_PX;

  return {
    availableWidthPx,
    availableHeightPx: DEFAULT_ASSISTANT_VISUAL_HEIGHT_PX,
  };
};

const buildExpenseAnswerInstructions = (
  requestedVisualizationType?: VisualizationType | null,
  uiLanguage?: string,
  hasGreetingIntent = false,
  layoutHints?: {
    availableWidthPx?: number | null;
    availableHeightPx?: number | null;
  }
): string => {
  return buildStructuredAssistantAnswerInstructions(
    requestedVisualizationType,
    uiLanguage,
    hasGreetingIntent,
    layoutHints
  );
};

// Owns the expense sheets chat drawer state and request lifecycle.
export const useExpenseSheetsAssistant = ({
  context,
  isListLoading,
  uiLanguage,
}: UseExpenseSheetsAssistantArgs): UseExpenseSheetsAssistantResult => {
  const resolvedUiLanguage = safeText(uiLanguage) || resolveAssistantUiLanguage();
  const assistantCopy = useMemo(
    () => resolveExpenseSheetsAssistantCopy(resolvedUiLanguage),
    [resolvedUiLanguage]
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [draftQuestion, setDraftQuestion] = useState("");
  const [messages, setMessages] = useState<ExpenseSheetsAssistantMessage[]>([]);
  const [contextNotice, setContextNotice] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const previousContextVersionRef = useRef(context.contextVersion);
  const sourceJsonCacheRef = useRef<ExpenseSheetsAssistantSourceJsonCache | null>(null);

  const hasContext = useMemo(
    () =>
      !!context.lastExpenseSheetsListRequest &&
      !!context.lastExpenseSheetsListResponse &&
      context.lastExpenseSheetsListResponse.Success !== false,
    [context.lastExpenseSheetsListRequest, context.lastExpenseSheetsListResponse]
  );

  const panelTitle = assistantCopy.title;
  const launcherAriaLabel = assistantCopy.launcherAriaLabel;

  const quickActions = useMemo<ExpenseSheetsAssistantQuickAction[]>(
    () => [
      {
        id: "summary",
        label: assistantCopy.quickActions.summary.label,
        question: assistantCopy.quickActions.summary.question,
      },
      {
        id: "analytics",
        label: assistantCopy.quickActions.analytics.label,
        question: assistantCopy.quickActions.analytics.question,
      },
      {
        id: "anomalies",
        label: assistantCopy.quickActions.anomalies.label,
        question: assistantCopy.quickActions.anomalies.question,
      },
    ],
    [assistantCopy]
  );

  const resizeTextarea = useCallback(() => {
    const element = textareaRef.current;
    if (!element) return;

    element.style.height = "auto";
    const nextHeight = Math.min(element.scrollHeight, MAX_TEXTAREA_HEIGHT_PX);
    element.style.height = `${Math.max(44, nextHeight)}px`;
    element.style.overflowY = element.scrollHeight > MAX_TEXTAREA_HEIGHT_PX ? "auto" : "hidden";
  }, []);

  const scrollMessagesToBottom = useCallback((behavior: ScrollBehavior = "auto") => {
    const scroller = messagesContainerRef.current;
    if (!scroller) return;

    scroller.scrollTo({
      top: scroller.scrollHeight,
      behavior,
    });
  }, []);

  // Keeps the mobile keyboard hidden until the user explicitly taps the composer.
  const blurActiveEditableElement = useCallback(() => {
    if (typeof document === "undefined") {
      return;
    }

    const activeElement = document.activeElement;
    if (!(activeElement instanceof HTMLElement)) {
      return;
    }

    const isEditableElement =
      activeElement === textareaRef.current ||
      activeElement.tagName === "INPUT" ||
      activeElement.tagName === "TEXTAREA" ||
      activeElement.isContentEditable;

    if (isEditableElement) {
      activeElement.blur();
    }
  }, []);

  useEffect(() => {
    resizeTextarea();
  }, [draftQuestion, isOpen, resizeTextarea]);

  useEffect(() => {
    if (!isOpen) return;

    blurActiveEditableElement();
    const rafId = window.requestAnimationFrame(() => {
      scrollMessagesToBottom("auto");
    });

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [blurActiveEditableElement, isOpen, scrollMessagesToBottom]);

  useEffect(() => {
    if (!isOpen) return;
    scrollMessagesToBottom("smooth");
  }, [isOpen, messages, scrollMessagesToBottom]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        blurActiveEditableElement();
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [blurActiveEditableElement, isOpen]);

  useEffect(() => {
    if (hasContext) return;
    blurActiveEditableElement();
    setIsOpen(false);
  }, [blurActiveEditableElement, hasContext]);

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    const cachedSourceJson = sourceJsonCacheRef.current;
    if (!cachedSourceJson) return;
    if (cachedSourceJson.contextVersion === context.contextVersion) return;
    sourceJsonCacheRef.current = null;
  }, [context.contextVersion]);

  useEffect(() => {
    if (previousContextVersionRef.current === context.contextVersion) {
      return;
    }

    previousContextVersionRef.current = context.contextVersion;
    if (messages.length === 0) {
      return;
    }

    setContextNotice(
      hasContext
        ? assistantCopy.contextUpdated
        : assistantCopy.noContextMessage
    );
  }, [assistantCopy.contextUpdated, assistantCopy.noContextMessage, context.contextVersion, hasContext, messages.length]);

  const resolveFullSourceJson = useEffectEvent(async (): Promise<ExpenseSheetListResponseEnvelope | null> => {
    if (!context.lastExpenseSheetsListRequest || !context.lastExpenseSheetsListResponse) {
      return null;
    }

    const axUserIdOverride = safeText(context.lastExpenseSheetsListAxUserIdOverride);
    const cachedSourceJson = sourceJsonCacheRef.current;
    if (
      cachedSourceJson &&
      cachedSourceJson.contextVersion === context.contextVersion &&
      cachedSourceJson.axUserIdOverride === axUserIdOverride
    ) {
      return cachedSourceJson.response;
    }

    const fullSourceJson = await runExpenseReadRequestWithRetry(
      () =>
        fetchExpenseSheetListSourceJson(context.lastExpenseSheetsListRequest, {
          suppressPermissionModal: true,
          axUserIdOverride: axUserIdOverride || undefined,
          seedResponse: context.lastExpenseSheetsListResponse,
        }),
      {}
    );

    sourceJsonCacheRef.current = {
      contextVersion: context.contextVersion,
      axUserIdOverride,
      response: fullSourceJson,
    };

    return fullSourceJson;
  });

  const sendQuestion = useCallback(
    async (rawQuestion: string, options?: SendQuestionOptions) => {
      const question = safeText(rawQuestion);
      if (!question || isSending || !context.lastExpenseSheetsListRequest || !context.lastExpenseSheetsListResponse) {
        return;
      }

      const technicalDisclosureIntent = detectTechnicalDisclosureIntent(question);
      const greetingIntent = detectGreetingIntent(question);
      const detectedIntent = detectVisualizationIntent(question);
      const requestedVisualizationType = options?.requestedVisualizationType ?? detectedIntent.requestedType;
      const appendUserQuestion = options?.appendUserQuestion ?? true;
      const userSelectionMessage = options?.userSelectionMessage ?? null;

      if (technicalDisclosureIntent.isDisallowed) {
        const userMessageId = createMessageId();
        const assistantMessageId = createMessageId();

        setContextNotice("");
        setMessages((previous) => {
          const nextMessages = [...previous];

          if (appendUserQuestion) {
            nextMessages.push(buildUserMessage(userMessageId, createMarkdownMessage(question)));
          }

          if (userSelectionMessage) {
            nextMessages.push(buildUserMessage(createMessageId(), userSelectionMessage));
          }

          nextMessages.push(
            buildAssistantMessage(
              assistantMessageId,
              createMarkdownMessage(assistantCopy.technicalRefusal),
              "done"
            )
          );

          return nextMessages;
        });

        if (appendUserQuestion) {
          setDraftQuestion("");
        }

        return;
      }

      if (!requestedVisualizationType && detectedIntent.shouldAskForChartType) {
        const userMessageId = createMessageId();
        const assistantMessageId = createMessageId();

        setContextNotice("");
        setMessages((previous) => [
          ...previous,
          buildUserMessage(userMessageId, createMarkdownMessage(question)),
          buildAssistantMessage(
            assistantMessageId,
            createChartTypeChoiceMessage(question, {
              question: assistantCopy.chooseChartTypeQuestion,
              options: assistantCopy.chartTypeOptions,
            }),
            "done"
          ),
        ]);
        setDraftQuestion("");
        return;
      }

      const userMessageId = createMessageId();
      const assistantMessageId = createMessageId();
      const loadingText = assistantCopy.loading;

      setContextNotice("");
      if (appendUserQuestion) {
        setDraftQuestion(question);
      }

      setMessages((previous) => {
        const nextMessages = [...previous];

        if (appendUserQuestion) {
          nextMessages.push(buildUserMessage(userMessageId, createMarkdownMessage(question)));
        }

        if (userSelectionMessage) {
          nextMessages.push(buildUserMessage(createMessageId(), userSelectionMessage));
        }

        nextMessages.push(buildAssistantMessage(assistantMessageId, createMarkdownMessage(loadingText), "loading"));
        return nextMessages;
      });
      setIsSending(true);

      try {
        const sourceJson = await resolveFullSourceJson();
        if (!sourceJson) {
          throw new ApiFetchError(assistantCopy.noContextMessage);
        }
        const visualizationHints = resolveAssistantVisualizationHints(messagesContainerRef.current);

        const response = await askExpenseSheetsQuestion(
          {
            question,
            answerInstructions: buildExpenseAnswerInstructions(
              requestedVisualizationType,
              resolvedUiLanguage,
              greetingIntent.isGreetingOnly,
              visualizationHints
            ),
            listRequest: context.lastExpenseSheetsListRequest,
            sourceJson,
          },
          {
            suppressPermissionModal: true,
          }
        );

        if (response.Success === false) {
          const failedMessage = buildErrorMessage(
            assistantMessageId,
            question,
            resolveFailedAskMessage(response, assistantCopy),
            response.HttpStatus,
            safeText(response.TraceId),
            response.RetryAfter,
            safeText(response.ErrorCode)
          );
          setMessages((previous) => previous.map((entry) => (entry.id === assistantMessageId ? failedMessage : entry)));
          return;
        }

        const safeAnswer =
          sanitizeAssistantText(response.Data?.Answer) ||
          sanitizeAssistantText(response.Message) ||
          indT("Common_NotAvailable", "N/A");
        const parsedAnswer = parseStructuredChatMessages(safeAnswer, {
          requestedVisualizationType,
        });
        const assistantMeta = {
          totalSourceRecords: response.Data?.TotalSourceRecords ?? null,
          retrievalMode: safeText(response.Data?.RetrievalMode) || null,
          truncated: response.Data?.Truncated ?? null,
          traceId: safeText(response.TraceId),
          warnings: Array.isArray(response.Data?.Warnings) ? response.Data?.Warnings : [],
          httpStatus: response.HttpStatus,
        };
        const parsedMessages = parsedAnswer.messages.map((message, index) =>
          buildAssistantMessage(index === 0 ? assistantMessageId : createMessageId(), message, "done", index === 0 ? assistantMeta : undefined)
        );

        setMessages((previous) => replaceMessageWithEntries(previous, assistantMessageId, parsedMessages));
        if (appendUserQuestion) {
          setDraftQuestion((previous) => (safeText(previous) === question ? "" : previous));
        }
      } catch (error) {
        const thrown = resolveThrownAskMessage(error, assistantCopy);
        const failedMessage = buildErrorMessage(
          assistantMessageId,
          question,
          thrown.message,
          thrown.status,
          thrown.traceId,
          null,
          thrown.errorCode
        );
        setMessages((previous) => previous.map((entry) => (entry.id === assistantMessageId ? failedMessage : entry)));
      } finally {
        setIsSending(false);
      }
    },
    [
      assistantCopy,
      context.lastExpenseSheetsListRequest,
      context.lastExpenseSheetsListResponse,
      isSending,
      resolveFullSourceJson,
      resolvedUiLanguage,
    ]
  );

  const submitDraftQuestion = useCallback(async () => {
    await sendQuestion(draftQuestion);
  }, [draftQuestion, sendQuestion]);

  const submitQuickAction = useCallback(
    async (question: string) => {
      setContextNotice("");
      setDraftQuestion(safeText(question));
    },
    []
  );

  const retryQuestion = useCallback(
    async (question: string) => {
      await sendQuestion(question);
    },
    [sendQuestion]
  );

  const selectChartType = useCallback(
    async (messageId: string, value: VisualizationType) => {
      if (isSending) {
        return;
      }

      const selectedMessage = messages.find((entry) => entry.id === messageId);
      if (!selectedMessage || selectedMessage.message.type !== "question-to-choose-chart-type") {
        return;
      }

      const originalPrompt = safeText(selectedMessage.message.originalPrompt);
      if (!originalPrompt) {
        return;
      }

      setMessages((previous) =>
        previous.map((entry) =>
          entry.id === messageId && entry.message.type === "question-to-choose-chart-type"
            ? {
                ...entry,
                message: {
                  ...entry.message,
                  selectedType: value,
                },
              }
            : entry
        )
      );

      await sendQuestion(originalPrompt, {
        requestedVisualizationType: value,
        appendUserQuestion: false,
        userSelectionMessage: createMarkdownMessage(
          buildExpenseSheetsVisualizationSelectionMessage(value, resolvedUiLanguage)
        ),
      });
    },
    [isSending, messages, resolvedUiLanguage, sendQuestion]
  );

  const handleDraftKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key !== "Enter" || event.shiftKey) {
        return;
      }

      event.preventDefault();
      if (!hasContext || isSending) {
        return;
      }

      void submitDraftQuestion();
    },
    [hasContext, isSending, submitDraftQuestion]
  );

  const openPanel = useCallback(() => {
    blurActiveEditableElement();
    setIsOpen(true);
  }, [blurActiveEditableElement]);

  const closePanel = useCallback(() => {
    blurActiveEditableElement();
    setIsOpen(false);
  }, [blurActiveEditableElement]);

  const togglePanel = useCallback(() => {
    blurActiveEditableElement();
    setIsOpen((previous) => !previous);
  }, [blurActiveEditableElement]);

  useEffect(() => {
    if (!hasContext && !isListLoading && messages.length > 0) {
      setContextNotice(assistantCopy.noContextMessage);
    }
  }, [assistantCopy.noContextMessage, hasContext, isListLoading, messages.length]);

  return {
    isOpen,
    isSending,
    hasContext,
    contextNotice,
    draftQuestion,
    messages,
    quickActions,
    launcherAriaLabel,
    panelTitle,
    openPanel,
    closePanel,
    togglePanel,
    setDraftQuestion,
    submitDraftQuestion,
    submitQuickAction,
    retryQuestion,
    selectChartType,
    handleDraftKeyDown,
    messagesContainerRef,
    textareaRef,
  };
};
