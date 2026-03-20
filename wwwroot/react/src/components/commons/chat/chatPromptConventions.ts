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
};

const RAW_EXPENSE_SHEET_FIELD_NAMES_RULE =
  "Rename keys: HojaGastosId,Description,ExpenseSheetStatus,EstadoComentarios,UserId,UserName,Voucher,ProjId,CurrencyCode,TotalAmount,ExchRate,ExchangeRateMode,CreatedDate.";

const buildCommonPromptRules = ({
  uiLanguage,
  hasGreetingIntent = false,
  requestedVisualizationType = null,
}: PromptContext): string => {
  const greetingRule = hasGreetingIntent ? "Greet if greeted." : "";

  return [
    "messages[] JSON.",
    `${resolvePromptLanguageName(uiLanguage)}, keep accents.`,
    RAW_EXPENSE_SHEET_FIELD_NAMES_RULE,
    greetingRule,
  ].join(" ");
};

const buildVisualizationPromptRule = (requestedVisualizationType?: VisualizationType | null): string => {
  if (!requestedVisualizationType) {
    return "One markdown msg.";
  }

  if (requestedVisualizationType === "table") {
    return "Valid: md+table. Else: md.";
  }

  if (requestedVisualizationType === "pie") {
    return "Valid: md+chart pie. Else: md.";
  }

  return `Valid: md+chart ${requestedVisualizationType}. Else: md.`;
};

// Builds a compact instruction string that stays inside the upstream field limit.
export const buildStructuredAssistantAnswerInstructions = (
  requestedVisualizationType?: VisualizationType | null,
  uiLanguage?: string | null,
  hasGreetingIntent = false
): string => {
  return trimToMaxLength(
    [
      buildCommonPromptRules({
        uiLanguage,
        hasGreetingIntent: hasGreetingIntent && !requestedVisualizationType,
        requestedVisualizationType,
      }),
      buildVisualizationPromptRule(requestedVisualizationType),
    ].join(" "),
    MAX_ANSWER_INSTRUCTIONS_LENGTH
  );
};

export const CHAT_PROMPT_LIMITS = {
  maxAnswerInstructionsLength: MAX_ANSWER_INSTRUCTIONS_LENGTH,
} as const;
