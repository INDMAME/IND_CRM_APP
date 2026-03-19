import type { VisualizationType } from "./chatMessageContract.ts";

export type VisualizationIntent = {
  wantsVisualization: boolean;
  requestedType: VisualizationType | null;
  shouldAskForChartType: boolean;
  matchedKeywords: string[];
};

const EXPLICIT_VISUALIZATION_PATTERNS: Array<{ type: VisualizationType; pattern: RegExp }> = [
  {
    type: "bar",
    pattern: /\b(?:bar\s+(?:chart|graph)|gr[áa]fic[oa]\s+de\s+barras?)\b/i,
  },
  {
    type: "line",
    pattern: /\b(?:line\s+(?:chart|graph)|gr[áa]fic[oa]\s+de\s+l[íi]neas?)\b/i,
  },
  {
    type: "pie",
    pattern: /\b(?:pie\s+chart|gr[áa]fic[oa]\s+(?:de\s+)?(?:pie|pastel|tarta|circular))\b/i,
  },
  {
    type: "table",
    pattern: /\b(?:tabla|table)\b/i,
  },
];

const AMBIGUOUS_VISUALIZATION_KEYWORDS = [
  "grafico",
  "gráfico",
  "grafica",
  "gráfica",
  "chart",
  "graph",
  "visualizacion",
  "visualización",
  "barras",
  "lineas",
  "líneas",
  "pastel",
  "pie",
  "tabla comparativa",
];

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const toSafeText = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  return String(value).trim();
};

export const detectExplicitVisualizationType = (question: string): VisualizationType | null => {
  const safeQuestion = toSafeText(question);
  if (!safeQuestion) return null;

  const match = EXPLICIT_VISUALIZATION_PATTERNS.find((entry) => entry.pattern.test(safeQuestion));
  return match?.type ?? null;
};

export const detectVisualizationIntent = (question: string): VisualizationIntent => {
  const safeQuestion = toSafeText(question);
  if (!safeQuestion) {
    return {
      wantsVisualization: false,
      requestedType: null,
      shouldAskForChartType: false,
      matchedKeywords: [],
    };
  }

  const requestedType = detectExplicitVisualizationType(safeQuestion);
  const matchedKeywords = AMBIGUOUS_VISUALIZATION_KEYWORDS.filter((keyword) =>
    new RegExp(`\\b${escapeRegExp(keyword)}\\b`, "i").test(safeQuestion)
  );
  const wantsVisualization = requestedType !== null || matchedKeywords.length > 0;

  return {
    wantsVisualization,
    requestedType,
    shouldAskForChartType: wantsVisualization && requestedType === null,
    matchedKeywords,
  };
};
