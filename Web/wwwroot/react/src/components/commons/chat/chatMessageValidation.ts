import type {
  ChartMessage,
  ChartPayload,
  ChatMessage,
  ChartTypeChoiceMessage,
  TableMessage,
  TablePayload,
  ValidationResult,
} from "./chatMessageContract.ts";
import {
  createChartTypeChoiceMessage,
  createMarkdownMessage,
  createValidationFallbackMarkdownMessage,
} from "./chatMessageFactories.ts";

const toSafeText = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  return String(value).trim();
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return !!value && typeof value === "object" && !Array.isArray(value);
};

const isNonEmptyArray = (value: unknown): value is unknown[] => Array.isArray(value);

const isNonEmptyKey = (value: unknown): boolean => {
  return toSafeText(value).length > 0;
};

const buildResult = (errors: string[]): ValidationResult => ({
  isValid: errors.length === 0,
  errors,
});

// Applies the small and stable contract required by supported chart payloads.
export const validateChartPayload = (payload: ChartPayload): ValidationResult => {
  const errors: string[] = [];

  if (!isRecord(payload)) {
    return buildResult(["El payload del grafico debe ser un objeto."]);
  }

  if (!isNonEmptyArray(payload.data)) {
    errors.push("El grafico requiere un data array.");
  }

  if (payload.chartType === "bar" || payload.chartType === "line") {
    if (!isNonEmptyKey(payload.xKey)) {
      errors.push(`El grafico ${payload.chartType} requiere xKey.`);
    }
    if (!isNonEmptyKey(payload.yKey)) {
      errors.push(`El grafico ${payload.chartType} requiere yKey.`);
    }
  }

  if (payload.chartType === "pie") {
    if (!isNonEmptyKey(payload.nameKey)) {
      errors.push("El grafico pie requiere nameKey.");
    }
    if (!isNonEmptyKey(payload.dataKey)) {
      errors.push("El grafico pie requiere dataKey.");
    }
  }

  return buildResult(errors);
};

// Validates the reusable table payload independently of any domain meaning.
export const validateTablePayload = (payload: TablePayload): ValidationResult => {
  const errors: string[] = [];

  if (!isRecord(payload)) {
    return buildResult(["El payload de la tabla debe ser un objeto."]);
  }

  if (!Array.isArray(payload.columns) || payload.columns.length === 0) {
    errors.push("La tabla requiere columns.");
  } else {
    payload.columns.forEach((column, index) => {
      if (!isNonEmptyKey(column?.key)) {
        errors.push(`La columna ${index + 1} requiere key.`);
      }
      if (!isNonEmptyKey(column?.header)) {
        errors.push(`La columna ${index + 1} requiere header.`);
      }
    });
  }

  if (!Array.isArray(payload.rows)) {
    errors.push("La tabla requiere rows.");
  }

  return buildResult(errors);
};

export const validateChatMessage = (message: ChatMessage): ValidationResult => {
  switch (message.type) {
    case "markdown":
      return buildResult(toSafeText(message.markdown) ? [] : ["El mensaje markdown requiere contenido."]);
    case "chart":
      return validateChartPayload(message.payload);
    case "table":
      return validateTablePayload(message.payload);
    case "question-to-choose-chart-type": {
      const errors: string[] = [];
      if (!toSafeText(message.question)) {
        errors.push("La pregunta para elegir grafico requiere question.");
      }
      if (!toSafeText(message.originalPrompt)) {
        errors.push("La pregunta para elegir grafico requiere originalPrompt.");
      }
      if (!Array.isArray(message.options) || message.options.length === 0) {
        errors.push("La pregunta para elegir grafico requiere options.");
      }
      return buildResult(errors);
    }
    default:
      return buildResult(["Tipo de mensaje no soportado."]);
  }
};

const toChartFallback = (message: ChartMessage): ChatMessage => {
  const validation = validateChartPayload(message.payload);
  if (validation.isValid) return message;
  return createValidationFallbackMarkdownMessage(validation.errors);
};

const toTableFallback = (message: TableMessage): ChatMessage => {
  const validation = validateTablePayload(message.payload);
  if (validation.isValid) return message;
  return createValidationFallbackMarkdownMessage(validation.errors, "No se pudo renderizar la tabla solicitada.");
};

const toPickerFallback = (message: ChartTypeChoiceMessage): ChatMessage => {
  const validation = validateChatMessage(message);
  if (validation.isValid) return message;
  if (!toSafeText(message.originalPrompt)) {
    return createMarkdownMessage("El selector de tipo de grafico no es valido.");
  }

  return createChartTypeChoiceMessage(message.originalPrompt, {
    question: toSafeText(message.question) || undefined,
    selectedType: message.selectedType ?? null,
  });
};

// Converts unsupported or invalid visual payloads into safe markdown fallbacks.
export const resolveRenderableChatMessage = (message: ChatMessage): ChatMessage => {
  switch (message.type) {
    case "markdown":
      return validateChatMessage(message).isValid ? message : createMarkdownMessage("Sin contenido.");
    case "chart":
      return toChartFallback(message);
    case "table":
      return toTableFallback(message);
    case "question-to-choose-chart-type":
      return toPickerFallback(message);
    default:
      return createMarkdownMessage("Tipo de mensaje no soportado.");
  }
};
