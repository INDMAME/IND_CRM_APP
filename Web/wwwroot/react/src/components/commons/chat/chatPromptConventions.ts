import type { VisualizationType } from "./chatMessageContract.ts";

const BASE_CONTRACT_RULES = [
  "Return raw JSON only.",
  "Do not wrap the JSON in markdown fences.",
  'Use the root shape {"messages":[...]} exactly.',
  'Allowed message types: "markdown", "chart", "table".',
  'Never return HTML, JSX, code blocks, or chart markup inside markdown.',
  'Markdown messages must use the field "markdown".',
  'Chart messages must use the field "payload" and include "chartType".',
  'Supported chartType values are only: "bar", "line", "pie".',
  'For bar and line charts include: data, xKey, yKey.',
  'For pie charts include: data, nameKey, dataKey.',
  'For table messages include: columns and rows.',
  "If the data is not sufficient for a valid visualization, return only one markdown message explaining why.",
  "Do not invent missing numeric values or categories.",
];

const BASE_BUSINESS_TONE_RULES = [
  "Answer in the same language as the question.",
  "Keep the answer very short and executive.",
  "Prefer 3 to 4 short bullets or one short paragraph when returning markdown.",
  "Prioritize totals, rankings, anomalies, and direct conclusions.",
  "Avoid filler, introductions, repetition, and technical explanations.",
  "Never expose raw API or property names from the source JSON.",
  "Rewrite technical field names as natural business labels in the same language as the question.",
];

const NORMAL_RESPONSE_EXAMPLE = `{"messages":[{"type":"markdown","markdown":"## Resumen\\n- Total analizado: 12 hojas\\n- Monto total: EUR 8,450.00"}]}`;

const BAR_RESPONSE_EXAMPLE =
  '{"messages":[{"type":"markdown","markdown":"## Top usuarios\\nLos tres usuarios principales concentran la mayor parte del gasto."},{"type":"chart","payload":{"chartType":"bar","title":"Gasto por usuario","subtitle":"Importe total por usuario","data":[{"user":"Ana","amount":3200},{"user":"Luis","amount":2400}],"xKey":"user","yKey":"amount"}}]}';

const TABLE_RESPONSE_EXAMPLE =
  '{"messages":[{"type":"markdown","markdown":"## Comparativa\\nEsta tabla resume los importes mas altos."},{"type":"table","payload":{"title":"Comparativa de hojas","columns":[{"key":"sheetId","header":"Hoja"},{"key":"amount","header":"Importe","align":"right"}],"rows":[{"sheetId":"HG-001","amount":1200},{"sheetId":"HG-002","amount":980}]}}]}';

export const CHAT_VISUAL_PROMPT_CONVENTION = [
  ...BASE_BUSINESS_TONE_RULES,
  ...BASE_CONTRACT_RULES,
  `Normal response example: ${NORMAL_RESPONSE_EXAMPLE}`,
  `Bar chart response example: ${BAR_RESPONSE_EXAMPLE}`,
  `Table response example: ${TABLE_RESPONSE_EXAMPLE}`,
].join(" ");

// Builds the exact answer instructions expected by the frontend parser.
export const buildStructuredAssistantAnswerInstructions = (
  requestedVisualizationType?: VisualizationType | null
): string => {
  const visualizationRule = requestedVisualizationType
    ? requestedVisualizationType === "table"
      ? 'The user explicitly chose "table". Return exactly two messages when data is enough: first "markdown", then "table".'
      : `The user explicitly chose "${requestedVisualizationType}". Return exactly two messages when data is enough: first "markdown", then one "chart" with payload.chartType="${requestedVisualizationType}".`
    : 'If the question does not explicitly request a supported visualization type, return exactly one "markdown" message.';

  return [CHAT_VISUAL_PROMPT_CONVENTION, visualizationRule].join(" ");
};
