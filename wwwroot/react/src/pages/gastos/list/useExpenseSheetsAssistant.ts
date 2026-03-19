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
  getVisualizationTypeLabel,
} from "../../../components/commons/chat/chatMessageFactories.ts";
import { detectVisualizationIntent } from "../../../components/commons/chat/chatIntentUtils.ts";
import { parseStructuredChatMessages } from "../../../components/commons/chat/chatMessageParsing.ts";
import { buildStructuredAssistantAnswerInstructions } from "../../../components/commons/chat/chatPromptConventions.ts";
import { ApiFetchError } from "../../../services/apiService.ts";
import { indFormat, indT } from "../../../utils/indI18n.ts";
import { askExpenseSheetsQuestion, fetchExpenseSheetListSourceJson } from "../utils/expenseApi.ts";
import { runExpenseReadRequestWithRetry } from "../utils/expenseRequestRetry.ts";
import type { ExpenseSheetListResponseEnvelope, ExpenseSheetsAskResult, IndValidationError } from "../expenseTypes.ts";
import { safeText, sanitizeAssistantText } from "../utils/expenseUiUtils.ts";
import type {
  ExpenseSheetsAssistantContextSnapshot,
  ExpenseSheetsAssistantMessage,
  ExpenseSheetsAssistantQuickAction,
} from "./expenseSheetsAssistantTypes.ts";

type UseExpenseSheetsAssistantArgs = {
  context: ExpenseSheetsAssistantContextSnapshot;
  isListLoading: boolean;
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

const FIELD_NAME_MAPPING_INSTRUCTIONS =
  "Example mappings in Spanish: ProjId -> Proyecto, TotalAmount -> Monto total, CurrencyCode -> Moneda, UserId or UserName -> Usuario, CreatedDate -> Fecha, ExpenseSheetStatus -> Estado, HojaGastosId -> Hoja de gasto. When monetary amounts are important, show each relevant amount on its own line or bullet so they are easy to scan. Use only the provided expense sheet data and mention missing data in one short sentence if needed.";
const MAX_TEXTAREA_HEIGHT_PX = 168;

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

const isRetryableStatus = (status: number | undefined): boolean => {
  return status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
};

const resolveFailedAskMessage = (response: ExpenseSheetsAskResult): string => {
  const validationText = formatValidationErrors(response.Errors);
  const responseMessage = sanitizeAssistantText(response.Message);
  const retryAfter = safeText(response.RetryAfter);

  if (response.HttpStatus === 422) {
    return validationText || responseMessage || indT("ExpenseSheets_Assistant_Error_Validation", "Check the question and try again.");
  }

  if (response.HttpStatus === 429) {
    const parts = [responseMessage || indT("ExpenseSheets_Assistant_Error_RateLimit", "Too many assistant requests.")];
    if (retryAfter) {
      parts.push(indFormat("ExpenseSheets_Assistant_Error_RetryAfter", "Retry after {0}.", retryAfter));
    }
    return parts.filter(Boolean).join(" ");
  }

  if (response.HttpStatus === 500) {
    return responseMessage || indT("ExpenseSheets_Assistant_Error_Server", "The assistant is not available right now.");
  }

  return responseMessage || indT("Api_RequestFailed", "Request failed.");
};

const resolveThrownAskMessage = (error: unknown): { message: string; status?: number; traceId: string } => {
  if (error instanceof ApiFetchError) {
    const validationText = formatValidationErrors(error.validationErrors);
    if (validationText) {
      return {
        message: validationText,
        status: error.status,
        traceId: extractTraceIdFromApiError(error),
      };
    }

    if (error.status === 429) {
      return {
        message:
          sanitizeAssistantText(error.message) ||
          indT("ExpenseSheets_Assistant_Error_RateLimit", "Too many assistant requests."),
        status: error.status,
        traceId: extractTraceIdFromApiError(error),
      };
    }

    if (error.status === 500) {
      return {
        message: indT("ExpenseSheets_Assistant_Error_Server", "The assistant is not available right now."),
        status: error.status,
        traceId: extractTraceIdFromApiError(error),
      };
    }

    return {
      message: sanitizeAssistantText(error.message) || indT("Api_RequestFailed", "Request failed."),
      status: error.status,
      traceId: extractTraceIdFromApiError(error),
    };
  }

  return {
    message: error instanceof Error && sanitizeAssistantText(error.message)
      ? sanitizeAssistantText(error.message)
      : indT("Api_RequestFailed", "Request failed."),
    status: undefined,
    traceId: "",
  };
};

const buildErrorMessage = (
  id: string,
  question: string,
  message: string,
  status: number | undefined,
  traceId: string,
  retryAfter?: string | null
): ExpenseSheetsAssistantMessage => ({
  id,
  role: "assistant",
  message: createMarkdownMessage(message),
  state: "error",
  retryQuestion: isRetryableStatus(status) ? question : null,
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

const buildExpenseAnswerInstructions = (requestedVisualizationType?: VisualizationType | null): string => {
  return [buildStructuredAssistantAnswerInstructions(requestedVisualizationType), FIELD_NAME_MAPPING_INSTRUCTIONS].join(
    " "
  );
};

// Owns the expense sheets chat drawer state and request lifecycle.
export const useExpenseSheetsAssistant = ({
  context,
  isListLoading,
}: UseExpenseSheetsAssistantArgs): UseExpenseSheetsAssistantResult => {
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

  const panelTitle = indT("ExpenseSheets_Assistant_Title", "Expense assistant");
  const launcherAriaLabel = indT(
    "ExpenseSheets_Assistant_LauncherLabel",
    "Open expense sheet assistant"
  );

  const quickActions = useMemo<ExpenseSheetsAssistantQuickAction[]>(
    () => [
      {
        id: "summary",
        label: indT("ExpenseSheets_Assistant_Quick_Summary", "Resumen"),
        question: indT(
          "ExpenseSheets_Assistant_Question_Summary",
          "Resume las hojas de gasto cargadas. Indica total global, usuarios principales, periodos y observaciones relevantes."
        ),
      },
      {
        id: "analytics",
        label: indT("ExpenseSheets_Assistant_Quick_Analytics", "Analítica"),
        question: indT(
          "ExpenseSheets_Assistant_Question_Analytics",
          "Analiza las hojas de gasto cargadas y extrae patrones: gasto total, top usuarios, top proyectos, top monedas y distribución por estado."
        ),
      },
      {
        id: "anomalies",
        label: indT("ExpenseSheets_Assistant_Quick_Anomalies", "Anomalías"),
        question: indT(
          "ExpenseSheets_Assistant_Question_Anomalies",
          "Revisa las hojas de gasto cargadas y detecta posibles anomalías, inconsistencias o valores atípicos en importes, fechas, usuarios, proyectos, estados y tipos de gasto."
        ),
      },
    ],
    []
  );

  const resizeTextarea = useEffectEvent(() => {
    const element = textareaRef.current;
    if (!element) return;

    element.style.height = "auto";
    const nextHeight = Math.min(element.scrollHeight, MAX_TEXTAREA_HEIGHT_PX);
    element.style.height = `${Math.max(44, nextHeight)}px`;
    element.style.overflowY = element.scrollHeight > MAX_TEXTAREA_HEIGHT_PX ? "auto" : "hidden";
  });

  const scrollMessagesToBottom = useEffectEvent((behavior: ScrollBehavior = "auto") => {
    const scroller = messagesContainerRef.current;
    if (!scroller) return;

    scroller.scrollTo({
      top: scroller.scrollHeight,
      behavior,
    });
  });

  const focusComposer = useEffectEvent(() => {
    const element = textareaRef.current;
    if (!element) return;
    element.focus();
  });

  useEffect(() => {
    resizeTextarea();
  }, [draftQuestion, isOpen, resizeTextarea]);

  useEffect(() => {
    if (!isOpen) return;

    const rafId = window.requestAnimationFrame(() => {
      focusComposer();
      scrollMessagesToBottom(messages.length > 0 ? "smooth" : "auto");
    });

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [focusComposer, isOpen, messages.length, scrollMessagesToBottom]);

  useEffect(() => {
    if (!isOpen) return;
    scrollMessagesToBottom("smooth");
  }, [isOpen, messages, scrollMessagesToBottom]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (hasContext) return;
    setIsOpen(false);
  }, [hasContext]);

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
        ? indT("ExpenseSheets_Assistant_Context_Updated", "Analysis context updated with the latest loaded list.")
        : indT("ExpenseSheets_Assistant_Error_NoContext", "Load expense sheets before asking the assistant.")
    );
  }, [context.contextVersion, hasContext, messages.length]);

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

      const detectedIntent = detectVisualizationIntent(question);
      const requestedVisualizationType = options?.requestedVisualizationType ?? detectedIntent.requestedType;
      const appendUserQuestion = options?.appendUserQuestion ?? true;
      const userSelectionMessage = options?.userSelectionMessage ?? null;

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
              question: indT(
                "ExpenseSheets_Assistant_ChooseChartType_Question",
                "What type of visualization do you want?"
              ),
            }),
            "done"
          ),
        ]);
        setDraftQuestion("");
        return;
      }

      const userMessageId = createMessageId();
      const assistantMessageId = createMessageId();
      const loadingText = indT("ExpenseSheets_Assistant_Message_Loading", "Analyzing the loaded expense sheets...");

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
          throw new ApiFetchError(
            indT("ExpenseSheets_Assistant_Error_NoContext", "Load expense sheets before asking the assistant.")
          );
        }

        const response = await askExpenseSheetsQuestion(
          {
            question,
            answerInstructions: buildExpenseAnswerInstructions(requestedVisualizationType),
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
            resolveFailedAskMessage(response),
            response.HttpStatus,
            safeText(response.TraceId),
            response.RetryAfter
          );
          setMessages((previous) => previous.map((entry) => (entry.id === assistantMessageId ? failedMessage : entry)));
          return;
        }

        const safeAnswer =
          sanitizeAssistantText(response.Data?.Answer) ||
          sanitizeAssistantText(response.Message) ||
          indT("Common_NotAvailable", "N/A");
        const parsedAnswer = parseStructuredChatMessages(safeAnswer);
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
        const thrown = resolveThrownAskMessage(error);
        const failedMessage = buildErrorMessage(
          assistantMessageId,
          question,
          thrown.message,
          thrown.status,
          thrown.traceId
        );
        setMessages((previous) => previous.map((entry) => (entry.id === assistantMessageId ? failedMessage : entry)));
      } finally {
        setIsSending(false);
      }
    },
    [context.lastExpenseSheetsListRequest, context.lastExpenseSheetsListResponse, isSending, resolveFullSourceJson]
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
        userSelectionMessage: createMarkdownMessage(`Visualizacion elegida: ${getVisualizationTypeLabel(value)}.`),
      });
    },
    [isSending, messages, sendQuestion]
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
    setIsOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    setIsOpen(false);
  }, []);

  const togglePanel = useCallback(() => {
    setIsOpen((previous) => !previous);
  }, []);

  useEffect(() => {
    if (!hasContext && !isListLoading && messages.length > 0) {
      setContextNotice(indT("ExpenseSheets_Assistant_Error_NoContext", "Load expense sheets before asking the assistant."));
    }
  }, [hasContext, isListLoading, messages.length]);

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
