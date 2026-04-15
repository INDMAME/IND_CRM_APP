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

const FRIENDLY_FIELD_NAMES_RULE = "Use friendly field labels.";

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
  const compactLayoutRule = `Fit ${widthPx}x${heightPx}px.`;

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
    return "md+real table only. If vague or incomplete, brief md asking for one grouping field and one metric. Keep fixed bar/line/pie/table choices. No charts, raw JSON, or ASCII tables.";
  }

  if (requestedVisualizationType === "pie") {
    return 'md+pie only. chartType,data,nameKey,dataKey. Max 6 cats. Business labels, not bare 0/1/2. If vague, mixed currencies, or weak, brief md asking for one grouping field and one metric. Keep fixed bar/line/pie/table choices. No raw JSON.';
  }

  return `md+${requestedVisualizationType} only. chartType,data,xKey,yKey. Max 6 cats. Business labels, not bare 0/1/2. If vague, mixed currencies, or weak, brief md asking for one grouping field and one metric. Keep fixed bar/line/pie/table choices. No raw JSON.`;
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
      buildVisualizationPromptRule(requestedVisualizationType),
      buildCommonPromptRules({
        uiLanguage,
        hasGreetingIntent: hasGreetingIntent && !requestedVisualizationType,
        requestedVisualizationType,
        availableWidthPx: layoutHints?.availableWidthPx,
        availableHeightPx: layoutHints?.availableHeightPx,
      }),
    ].join(" "),
    MAX_ANSWER_INSTRUCTIONS_LENGTH
  );
};

export const CHAT_PROMPT_LIMITS = {
  maxAnswerInstructionsLength: MAX_ANSWER_INSTRUCTIONS_LENGTH,
} as const;
