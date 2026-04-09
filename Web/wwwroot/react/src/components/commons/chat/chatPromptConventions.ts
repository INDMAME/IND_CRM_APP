import type { VisualizationType } from "./chatMessageContract.ts";

const MAX_ANSWER_INSTRUCTIONS_LENGTH = 260;

const toSafeText = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  return String(value).replace(/\s+/g, " ").trim();
};

const trimToMaxLength = (value: string, maxLength: number): string => {
  const normalized = toSafeText(value);
  if (normalized.length <= maxLength) {
    return normalized;
  }

  const clipped = normalized.slice(0, maxLength);
  const lastSpaceIndex = clipped.lastIndexOf(" ");
  if (lastSpaceIndex > Math.floor(maxLength * 0.6)) {
    return clipped.slice(0, lastSpaceIndex).trim();
  }

  return clipped.trim();
};

const resolvePromptLanguageName = (uiLanguage?: string | null): string => {
  const normalizedLanguage = toSafeText(uiLanguage).toLowerCase().replace(/_/g, "-");
  if (!normalizedLanguage) return "the user's language";
  if (normalizedLanguage.startsWith("en")) return "English";
  if (normalizedLanguage.startsWith("eu")) return "Basque";
  if (normalizedLanguage.startsWith("pt")) return "Portuguese";
  if (normalizedLanguage.startsWith("it")) return "Italian";
  if (normalizedLanguage.startsWith("zh")) return "Simplified Chinese";
  return "Spanish";
};

type PromptContext = {
  uiLanguage?: string | null;
  hasGreetingIntent?: boolean;
  requestedVisualizationType?: VisualizationType | null;
  availableWidthPx?: number | null;
  availableHeightPx?: number | null;
};

const FRIENDLY_FIELD_NAMES_RULE =
  "Use labels: hoja, estado, comentarios, usuario, nombre, proyecto, moneda, importe, fecha.";

const clampLayoutHint = (value: number | null | undefined, fallbackValue: number): number => {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallbackValue;
  }

  return Math.max(180, Math.round(value));
};

const buildCommonPromptRules = ({
  uiLanguage,
  hasGreetingIntent = false,
  availableWidthPx,
  availableHeightPx,
}: PromptContext): string => {
  const greetingRule = hasGreetingIntent ? "Greet if greeted." : "";
  const widthPx = clampLayoutHint(availableWidthPx, 304);
  const heightPx = clampLayoutHint(availableHeightPx, 264);
  const compactLayoutRule = `Fit about ${widthPx}x${heightPx}px.`;

  return [
    "messages[] JSON.",
    `${resolvePromptLanguageName(uiLanguage)}.`,
    FRIENDLY_FIELD_NAMES_RULE,
    compactLayoutRule,
    greetingRule,
  ].join(" ");
};

const buildVisualizationPromptRule = (requestedVisualizationType?: VisualizationType | null): string => {
  if (!requestedVisualizationType) {
    return "One compact markdown msg. Tight bullets, short paras, no blank lines, no ASCII/pipe tables.";
  }

  if (requestedVisualizationType === "table") {
    return "Valid: md+real table payload. Never markdown/ascii tables or faux charts. Else: compact md.";
  }

  if (requestedVisualizationType === "pie") {
    return "Valid: md+chart pie. Max 6 categories, short labels, avoid overlap. Never raw JSON. Else: compact md.";
  }

  return `Valid: md+chart ${requestedVisualizationType}. Max 6 categories, short labels, avoid overlap. Never raw JSON. Else: compact md.`;
};

// Builds a compact instruction string that stays inside the upstream field limit.
export const buildStructuredAssistantAnswerInstructions = (
  requestedVisualizationType?: VisualizationType | null,
  uiLanguage?: string | null,
  hasGreetingIntent = false,
  layoutHints?: {
    availableWidthPx?: number | null;
    availableHeightPx?: number | null;
  }
): string => {
  return trimToMaxLength(
    [
      buildCommonPromptRules({
        uiLanguage,
        hasGreetingIntent: hasGreetingIntent && !requestedVisualizationType,
        requestedVisualizationType,
        availableWidthPx: layoutHints?.availableWidthPx,
        availableHeightPx: layoutHints?.availableHeightPx,
      }),
      buildVisualizationPromptRule(requestedVisualizationType),
    ].join(" "),
    MAX_ANSWER_INSTRUCTIONS_LENGTH
  );
};

export const CHAT_PROMPT_LIMITS = {
  maxAnswerInstructionsLength: MAX_ANSWER_INSTRUCTIONS_LENGTH,
} as const;
