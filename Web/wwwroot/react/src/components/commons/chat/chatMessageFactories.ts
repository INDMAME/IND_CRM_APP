import type {
  ChartTypeChoiceMessage,
  ChartTypeChoiceOption,
  MarkdownMessage,
  VisualizationType,
} from "./chatMessageContract.ts";

const toSafeText = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  return String(value).trim();
};

export const DEFAULT_CHART_TYPE_PICKER_QUESTION = "¿Qué tipo de visualización quieres ver?";

export const DEFAULT_CHART_TYPE_OPTIONS: ChartTypeChoiceOption[] = [
  {
    value: "bar",
    label: "Barras",
    description: "Compara categorías de forma rápida.",
  },
  {
    value: "line",
    label: "Líneas",
    description: "Muestra cambios o evolución en el tiempo.",
  },
  {
    value: "pie",
    label: "Pie",
    description: "Representa la proporción entre partes.",
  },
  {
    value: "table",
    label: "Tabla",
    description: "Presenta detalle exacto y comparable.",
  },
];

// Creates the smallest valid markdown message accepted by the renderer.
export const createMarkdownMessage = (markdown: string): MarkdownMessage => ({
  type: "markdown",
  markdown: toSafeText(markdown),
});

export const createChartTypeChoiceMessage = (
  originalPrompt: string,
  overrides?: Partial<Pick<ChartTypeChoiceMessage, "question" | "options" | "selectedType">>
): ChartTypeChoiceMessage => ({
  type: "question-to-choose-chart-type",
  originalPrompt: toSafeText(originalPrompt),
  question: toSafeText(overrides?.question) || DEFAULT_CHART_TYPE_PICKER_QUESTION,
  options:
    Array.isArray(overrides?.options) && overrides?.options.length > 0
      ? overrides.options
      : DEFAULT_CHART_TYPE_OPTIONS,
  selectedType: overrides?.selectedType ?? null,
});

export const createValidationFallbackMarkdownMessage = (
  errors: string[],
  intro = "No se pudo renderizar la visualización solicitada."
): MarkdownMessage => {
  const safeErrors = Array.isArray(errors)
    ? errors.map((entry) => toSafeText(entry)).filter(Boolean)
    : [];

  if (safeErrors.length === 0) {
    return createMarkdownMessage(intro);
  }

  return createMarkdownMessage([intro, "", ...safeErrors.map((entry) => `- ${entry}`)].join("\n"));
};

export const getVisualizationTypeLabel = (value: VisualizationType): string => {
  switch (value) {
    case "bar":
      return "gráfico de barras";
    case "line":
      return "gráfico de líneas";
    case "pie":
      return "gráfico pie";
    case "table":
      return "tabla";
    default:
      return "visualización";
  }
};
