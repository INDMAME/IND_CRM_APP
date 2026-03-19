import type { ChatMessage, ChartPayload, TablePayload, VisualizationType } from "./chatMessageContract.ts";
import {
  createChartTypeChoiceMessage,
  createMarkdownMessage,
  createValidationFallbackMarkdownMessage,
} from "./chatMessageFactories.ts";
import { resolveRenderableChatMessage } from "./chatMessageValidation.ts";

export type ParsedStructuredChatMessages = {
  messages: ChatMessage[];
  source: "structured" | "markdown-fallback";
  errors: string[];
};

const AMOUNT_LINE_BREAK_PATTERN =
  /\s+(?=(?:EUR|USD|AED|GBP|CHF|JPY|CNY|SEK|NOK|DKK|CAD|AUD|MXN|€|\$)\s*[\d])/g;

const toSafeText = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  return String(value).trim();
};

const sanitizeStructuredText = (value: unknown): string => {
  const source = toSafeText(value);
  if (!source) return "";

  return source
    .normalize("NFC")
    .replace(/\uFEFF/g, "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[\u200B-\u200D\u2060]/g, "")
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

// Keeps legacy plain-text answers readable until every prompt returns structured messages.
export const formatLegacyAssistantMarkdown = (value: string): string => {
  const normalizedText = sanitizeStructuredText(value);
  if (!normalizedText) return "";

  return normalizedText
    .replace(/\s*[-•]\s+/g, "\n- ")
    .replace(/;\s+/g, ";\n")
    .replace(/:\s+(?=(?:EUR|USD|AED|GBP|CHF|JPY|CNY|SEK|NOK|DKK|CAD|AUD|MXN|€|\$)\s*[\d])/g, ":\n")
    .replace(AMOUNT_LINE_BREAK_PATTERN, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

const stripJsonFence = (value: string): string => {
  const fencedMatch = value.match(/^```(?:json)?\s*([\s\S]+?)\s*```$/i);
  return fencedMatch?.[1]?.trim() || value.trim();
};

const tryParseJson = (value: string): unknown | null => {
  const candidate = stripJsonFence(value);
  if (!candidate) return null;

  try {
    return JSON.parse(candidate);
  } catch {
    return null;
  }
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return !!value && typeof value === "object" && !Array.isArray(value);
};

const isVisualizationType = (value: unknown): value is VisualizationType => {
  return value === "bar" || value === "line" || value === "pie" || value === "table";
};

const normalizeStructuredMessage = (value: unknown): { message: ChatMessage | null; errors: string[] } => {
  if (!isRecord(value)) {
    return {
      message: null,
      errors: ["Cada mensaje estructurado debe ser un objeto."],
    };
  }

  const type = toSafeText(value.type).toLowerCase();
  if (type === "markdown") {
    return {
      message: createMarkdownMessage(sanitizeStructuredText(value.markdown)),
      errors: [],
    };
  }

  if (type === "chart") {
    return {
      message: {
        type: "chart",
        payload: value.payload as ChartPayload,
      },
      errors: [],
    };
  }

  if (type === "table") {
    return {
      message: {
        type: "table",
        payload: value.payload as TablePayload,
      },
      errors: [],
    };
  }

  if (type === "question-to-choose-chart-type") {
    const options = Array.isArray(value.options)
      ? value.options
          .map((entry) => {
            if (!isRecord(entry) || !isVisualizationType(entry.value)) return null;
            return {
              value: entry.value,
              label: sanitizeStructuredText(entry.label),
              description: sanitizeStructuredText(entry.description) || undefined,
            };
          })
          .filter((entry): entry is NonNullable<typeof entry> => !!entry)
      : [];

    return {
      message: createChartTypeChoiceMessage(sanitizeStructuredText(value.originalPrompt), {
        question: sanitizeStructuredText(value.question) || undefined,
        options,
        selectedType: isVisualizationType(value.selectedType) ? value.selectedType : null,
      }),
      errors: [],
    };
  }

  return {
    message: null,
    errors: [`Tipo de mensaje no soportado: ${type || "unknown"}.`],
  };
};

const toStructuredMessages = (value: unknown): ChatMessage[] => {
  if (Array.isArray(value)) {
    return value
      .flatMap((entry) => {
        const normalized = normalizeStructuredMessage(entry);
        if (normalized.message) {
          return [resolveRenderableChatMessage(normalized.message)];
        }

        if (normalized.errors.length > 0) {
          return [createValidationFallbackMarkdownMessage(normalized.errors)];
        }

        return [];
      })
      .filter(Boolean);
  }

  if (isRecord(value) && Array.isArray(value.messages)) {
    return toStructuredMessages(value.messages);
  }

  if (isRecord(value)) {
    const normalized = normalizeStructuredMessage(value);
    if (normalized.message) {
      return [resolveRenderableChatMessage(normalized.message)];
    }
    if (normalized.errors.length > 0) {
      return [createValidationFallbackMarkdownMessage(normalized.errors)];
    }
  }

  return [];
};

// Parses the AI answer into the exact frontend contract and falls back safely to markdown.
export const parseStructuredChatMessages = (answer: string): ParsedStructuredChatMessages => {
  const safeAnswer = sanitizeStructuredText(answer);
  if (!safeAnswer) {
    return {
      messages: [createMarkdownMessage("Sin respuesta.")],
      source: "markdown-fallback",
      errors: ["La respuesta del asistente estaba vacia."],
    };
  }

  const parsedJson = tryParseJson(safeAnswer);
  if (parsedJson !== null) {
    const structuredMessages = toStructuredMessages(parsedJson);
    if (structuredMessages.length > 0) {
      return {
        messages: structuredMessages,
        source: "structured",
        errors: [],
      };
    }
  }

  return {
    messages: [createMarkdownMessage(formatLegacyAssistantMarkdown(safeAnswer))],
    source: "markdown-fallback",
    errors: parsedJson === null ? ["La respuesta no era JSON estructurado."] : ["No se encontraron mensajes validos."],
  };
};
