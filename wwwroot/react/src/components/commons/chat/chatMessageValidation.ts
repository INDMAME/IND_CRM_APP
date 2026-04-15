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

const isFiniteNumber = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);

const hasOwnKey = (value: Record<string, unknown>, key: string): boolean =>
  Object.prototype.hasOwnProperty.call(value, key);

const FIXED_PICKER_OPTION_VALUES = ["bar", "line", "pie", "table"] as const;

const validateChartDataRows = (
  data: unknown[],
  requiredKeys: string[],
  valueKey: string | null,
  errors: string[],
  chartType: ChartPayload["chartType"]
): void => {
  data.forEach((entry, index) => {
    if (!isRecord(entry)) {
      errors.push(`La fila ${index + 1} del grafico ${chartType} debe ser un objeto.`);
      return;
    }

    requiredKeys.forEach((requiredKey) => {
      if (!hasOwnKey(entry, requiredKey)) {
        errors.push(`La fila ${index + 1} del grafico ${chartType} requiere la clave ${requiredKey}.`);
      }
    });

    if (valueKey && hasOwnKey(entry, valueKey) && !isFiniteNumber(entry[valueKey])) {
      errors.push(`La fila ${index + 1} del grafico ${chartType} requiere ${valueKey} numerico.`);
      return;
    }

    if (chartType === "pie" && valueKey && hasOwnKey(entry, valueKey) && isFiniteNumber(entry[valueKey]) && entry[valueKey] < 0) {
      errors.push("El grafico pie no admite valores negativos.");
    }
  });
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

    if (isNonEmptyArray(payload.data) && isNonEmptyKey(payload.xKey) && isNonEmptyKey(payload.yKey)) {
      validateChartDataRows(payload.data, [payload.xKey, payload.yKey], payload.yKey, errors, payload.chartType);
    }
  }

  if (payload.chartType === "pie") {
    if (!isNonEmptyKey(payload.nameKey)) {
      errors.push("El grafico pie requiere nameKey.");
    }
    if (!isNonEmptyKey(payload.dataKey)) {
      errors.push("El grafico pie requiere dataKey.");
    }

    if (isNonEmptyArray(payload.data) && payload.data.length > 6) {
      errors.push("El grafico pie admite un maximo de 6 categorias.");
    }

    if (isNonEmptyArray(payload.data) && isNonEmptyKey(payload.nameKey) && isNonEmptyKey(payload.dataKey)) {
      validateChartDataRows(payload.data, [payload.nameKey, payload.dataKey], payload.dataKey, errors, payload.chartType);
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
  } else {
    payload.columns?.forEach((column) => {
      if (!column?.key) return;
      if (!payload.rows.some((row) => isRecord(row) && hasOwnKey(row, column.key))) {
        errors.push(`La tabla requiere rows con la clave ${column.key}.`);
      }
    });
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
      if (!Array.isArray(message.options) || message.options.length !== FIXED_PICKER_OPTION_VALUES.length) {
        errors.push("La pregunta para elegir grafico requiere las 4 opciones fijas.");
      } else {
        const seenValues = new Set<string>();
        message.options.forEach((option, index) => {
          const optionValue = toSafeText(option?.value).toLowerCase();
          const expectedValue = FIXED_PICKER_OPTION_VALUES[index];

          if (!toSafeText(option?.label)) {
            errors.push(`La opcion ${index + 1} del selector requiere label.`);
          }

          if (!FIXED_PICKER_OPTION_VALUES.includes(optionValue as (typeof FIXED_PICKER_OPTION_VALUES)[number])) {
            errors.push(`La opcion ${index + 1} del selector no es valida.`);
            return;
          }

          if (seenValues.has(optionValue)) {
            errors.push("Las opciones del selector deben ser unicas.");
          }
          seenValues.add(optionValue);

          if (optionValue !== expectedValue) {
            errors.push("Las opciones del selector deben mantener el orden fijo bar, line, pie, table.");
          }
        });
      }

      if (
        message.selectedType !== undefined &&
        message.selectedType !== null &&
        !FIXED_PICKER_OPTION_VALUES.includes(message.selectedType)
      ) {
        errors.push("selectedType no es valido.");
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
