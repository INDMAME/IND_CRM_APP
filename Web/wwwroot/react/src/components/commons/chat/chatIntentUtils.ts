import type { VisualizationType } from "./chatMessageContract.ts";

export type VisualizationIntent = {
  wantsVisualization: boolean;
  requestedType: VisualizationType | null;
  shouldAskForChartType: boolean;
  matchedKeywords: string[];
};

export type TechnicalDisclosureIntent = {
  isDisallowed: boolean;
  matchedKeywords: string[];
};

export type GreetingIntent = {
  hasGreeting: boolean;
  isGreetingOnly: boolean;
  matchedKeywords: string[];
};

const EXPLICIT_VISUALIZATION_PATTERNS: Array<{ type: VisualizationType; pattern: RegExp }> = [
  {
    type: "bar",
    pattern: /\b(?:bar\s+(?:chart|graph)|gr(?:a|\u00E1)fic[oa]\s+de\s+barras?)\b/i,
  },
  {
    type: "line",
    pattern: /\b(?:line\s+(?:chart|graph)|gr(?:a|\u00E1)fic[oa]\s+de\s+l(?:i|\u00ED)neas?)\b/i,
  },
  {
    type: "pie",
    pattern: /\b(?:pie\s+chart|gr(?:a|\u00E1)fic[oa]\s+(?:de\s+)?(?:pie|pastel|tarta|circular))\b/i,
  },
  {
    type: "table",
    pattern: /\b(?:tabla|table)\b/i,
  },
];

const AMBIGUOUS_VISUALIZATION_PATTERNS: Array<{ keyword: string; pattern: RegExp }> = [
  {
    keyword: "grafico",
    pattern: /\bgr(?:a|\u00E1)fic[oa]s?\b/i,
  },
  {
    keyword: "chart",
    pattern: /\bcharts?\b/i,
  },
  {
    keyword: "graph",
    pattern: /\bgraphs?\b/i,
  },
  {
    keyword: "visualizacion",
    pattern: /\bvisuali(?:z|s)aci(?:o|\u00F3)n(?:es)?\b/i,
  },
  {
    keyword: "graficamente",
    pattern: /\bgr(?:a|\u00E1)ficamente\b/i,
  },
  {
    keyword: "barras",
    pattern: /\bbarras?\b/i,
  },
  {
    keyword: "lineas",
    pattern: /\bl(?:i|\u00ED)neas?\b/i,
  },
  {
    keyword: "pastel",
    pattern: /\bpastel(?:es)?\b/i,
  },
  {
    keyword: "pie",
    pattern: /\bpie\b/i,
  },
  {
    keyword: "tabla comparativa",
    pattern: /\btabla\s+comparativa\b/i,
  },
];

const BOT_REFERENCE_PATTERNS = [/\b(?:bot|chatbot|assistant|asistente)\b/i, /\b(?:ia|ai)\b/i];

const TECHNICAL_DISCLOSURE_KEYWORD_PATTERNS = [
  /\b(?:prompt|prompts|instructions?|instrucciones?)\b/i,
  /\b(?:model|modelo|llm|gpt|openai)\b/i,
  /\b(?:api|apis|endpoint|endpoints|backend|frontend|arquitectura|architecture|stack|token|rag|retrieval|embedding|vector)\b/i,
];

const DIRECT_INTERNAL_QUESTION_PATTERNS = [
  /\b(?:how|como|c(?:o|\u00F3)mo)\b.{0,32}\b(?:works?|funciona|built|implemented|montado|hecho|construido)\b/i,
  /\b(?:what|which|que|q(?:u|\u00E9)e)\b.{0,24}\b(?:model|modelo|api|prompt|architecture|arquitectura|stack|technology|tecnologia)\b/i,
  /\b(?:explain|explica|muestra|show|reveal)\b.{0,32}\b(?:prompt|instructions?|instrucciones?|api|architecture|arquitectura|modelo|model|internals?)\b/i,
];

const GREETING_PATTERNS: Array<{ keyword: string; pattern: RegExp }> = [
  {
    keyword: "hola",
    pattern: /\b(?:hola|hola\s+bot|hola\s+asistente)\b/i,
  },
  {
    keyword: "buenas",
    pattern: /\b(?:buenos\s+dias|buenas\s+tardes|buenas\s+noches|buenas)\b/i,
  },
  {
    keyword: "hello",
    pattern: /\b(?:hello|hi|hey|good\s+morning|good\s+afternoon|good\s+evening)\b/i,
  },
  {
    keyword: "kaixo",
    pattern: /\b(?:kaixo|egun\s+on|arratsalde\s+on|gabon)\b/i,
  },
  {
    keyword: "ola",
    pattern: /\b(?:bom\s+dia|boa\s+tarde|boa\s+noite|ola|ol[áa])\b/i,
  },
  {
    keyword: "ciao",
    pattern: /\b(?:ciao|salve|buongiorno|buonasera)\b/i,
  },
  {
    keyword: "nihao",
    pattern: /(?:你好|您好|早上好|晚上好)/,
  },
];

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
  const matchedKeywords = AMBIGUOUS_VISUALIZATION_PATTERNS.filter((entry) => entry.pattern.test(safeQuestion)).map(
    (entry) => entry.keyword
  );
  const wantsVisualization = requestedType !== null || matchedKeywords.length > 0;

  return {
    wantsVisualization,
    requestedType,
    shouldAskForChartType: wantsVisualization && requestedType === null,
    matchedKeywords,
  };
};

export const detectTechnicalDisclosureIntent = (question: string): TechnicalDisclosureIntent => {
  const safeQuestion = toSafeText(question);
  if (!safeQuestion) {
    return {
      isDisallowed: false,
      matchedKeywords: [],
    };
  }

  const matchedKeywords = TECHNICAL_DISCLOSURE_KEYWORD_PATTERNS.filter((pattern) => pattern.test(safeQuestion)).map(
    (pattern) => pattern.source
  );
  const hasBotReference = BOT_REFERENCE_PATTERNS.some((pattern) => pattern.test(safeQuestion));
  const hasDirectInternalQuestion = DIRECT_INTERNAL_QUESTION_PATTERNS.some((pattern) => pattern.test(safeQuestion));

  return {
    isDisallowed: hasDirectInternalQuestion || (hasBotReference && matchedKeywords.length > 0),
    matchedKeywords,
  };
};

export const detectGreetingIntent = (question: string): GreetingIntent => {
  const safeQuestion = toSafeText(question);
  if (!safeQuestion) {
    return {
      hasGreeting: false,
      isGreetingOnly: false,
      matchedKeywords: [],
    };
  }

  const matchedKeywords = GREETING_PATTERNS.filter((entry) => entry.pattern.test(safeQuestion)).map((entry) => entry.keyword);
  if (matchedKeywords.length === 0) {
    return {
      hasGreeting: false,
      isGreetingOnly: false,
      matchedKeywords: [],
    };
  }

  const nonGreetingContent = GREETING_PATTERNS.reduce(
    (currentValue, entry) => currentValue.replace(entry.pattern, " "),
    safeQuestion
  )
    .replace(/[!?.;,/\\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return {
    hasGreeting: true,
    isGreetingOnly: nonGreetingContent.length === 0,
    matchedKeywords,
  };
};
