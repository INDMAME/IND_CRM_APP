import type {
  ChartDatum,
  ChartPayload,
  ChatMessage,
  TableColumn,
  TablePayload,
  TableRow,
  VisualizationType,
} from "./chatMessageContract.ts";
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

export type ParseStructuredChatMessagesOptions = {
  requestedVisualizationType?: VisualizationType | null;
};

const AMOUNT_LINE_BREAK_PATTERN =
  /\s+(?=(?:EUR|USD|AED|GBP|CHF|JPY|CNY|SEK|NOK|DKK|CAD|AUD|MXN|\u20AC|\$)\s*[\d])/g;

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
    .replace(/\s*[-\u2022]\s+/g, "\n- ")
    .replace(/;\s+/g, ";\n")
    .replace(/:\s+(?=(?:EUR|USD|AED|GBP|CHF|JPY|CNY|SEK|NOK|DKK|CAD|AUD|MXN|\u20AC|\$)\s*[\d])/g, ":\n")
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

const isFiniteNumber = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);

const isPrimitiveCellValue = (value: unknown): value is string | number | boolean | null =>
  value === null || typeof value === "string" || typeof value === "number" || typeof value === "boolean";

const resolveCurrentUiLanguage = (): string => {
  if (typeof document !== "undefined") {
    const documentLanguage = toSafeText(document.documentElement.lang);
    if (documentLanguage) {
      return documentLanguage;
    }
  }

  if (typeof navigator !== "undefined") {
    const navigatorLanguage = toSafeText(navigator.language);
    if (navigatorLanguage) {
      return navigatorLanguage;
    }
  }

  return "es-ES";
};

const resolveLocalizedVisualizationLabel = (chartType: VisualizationType, uiLanguage: string): string => {
  const normalizedLanguage = uiLanguage.toLowerCase();

  if (normalizedLanguage.startsWith("en")) {
    return chartType === "table" ? "table" : `${chartType} chart`;
  }

  if (normalizedLanguage.startsWith("eu")) {
    if (chartType === "table") return "taula";
    if (chartType === "bar") return "barra grafikoa";
    if (chartType === "line") return "lerro grafikoa";
    return "sektore grafikoa";
  }

  if (normalizedLanguage.startsWith("pt")) {
    if (chartType === "table") return "tabela";
    if (chartType === "bar") return "gráfico de barras";
    if (chartType === "line") return "gráfico de linhas";
    return "gráfico de pizza";
  }

  if (normalizedLanguage.startsWith("it")) {
    if (chartType === "table") return "tabella";
    if (chartType === "bar") return "gráfico a barre";
    if (chartType === "line") return "gráfico a linee";
    return "gráfico a torta";
  }

  if (normalizedLanguage.startsWith("zh")) {
    if (chartType === "table") return "\u8868\u683c";
    if (chartType === "bar") return "\u67f1\u72b6\u56fe";
    if (chartType === "line") return "\u6298\u7ebf\u56fe";
    return "\u997c\u56fe";
  }

  if (chartType === "table") return "tabla";
  if (chartType === "bar") return "gráfico de barras";
  if (chartType === "line") return "gráfico de líneas";
  return "gráfico pie";
};

const buildRecoveredVisualizationMarkdown = (chartType: VisualizationType): string => {
  const uiLanguage = resolveCurrentUiLanguage();
  const normalizedLanguage = uiLanguage.toLowerCase();
  const localizedLabel = resolveLocalizedVisualizationLabel(chartType, uiLanguage);

  if (normalizedLanguage.startsWith("en")) {
    return `Here is the requested ${localizedLabel}.`;
  }

  if (normalizedLanguage.startsWith("eu")) {
    return `Hemen duzu eskatutako ${localizedLabel}.`;
  }

  if (normalizedLanguage.startsWith("pt")) {
    return `Aqui tens o ${localizedLabel} solicitado.`;
  }

  if (normalizedLanguage.startsWith("it")) {
    return `Ecco il ${localizedLabel} richiesto.`;
  }

  if (normalizedLanguage.startsWith("zh")) {
    return `\u8fd9\u91cc\u662f\u4f60\u8981\u7684${localizedLabel}\u3002`;
  }

  return `Aquí tienes la visualización solicitada: ${localizedLabel}.`;
};

const hasStructuredShape = (value: unknown): boolean => {
  if (Array.isArray(value)) {
    return value.some((entry) => isRecord(entry) && !!getRecordValue(entry, "type", "messageType", "kind", "payload"));
  }

  if (!isRecord(value)) {
    return false;
  }

  return (
    !!getRecordValue(value, "type", "messageType", "kind", "payload", "messages", "items", "chartType", "chart_type") ||
    Array.isArray(getRecordValue(value, "columns")) ||
    Array.isArray(getRecordValue(value, "rows"))
  );
};

const toFlatTableRow = (value: Record<string, unknown>): TableRow | null => {
  const entries = Object.entries(value).filter(([, entryValue]) => isPrimitiveCellValue(entryValue));
  if (entries.length === 0) {
    return null;
  }

  return Object.fromEntries(entries) as TableRow;
};

const titleCaseWords = (value: string): string =>
  value
    .split(" ")
    .filter(Boolean)
    .map((entry) => entry.charAt(0).toUpperCase() + entry.slice(1).toLowerCase())
    .join(" ");

const humanizeDatasetKey = (key: string): string => {
  const normalizedKey = toSafeText(key)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalizedKey) {
    return "Value";
  }

  const aliasMap: Record<string, string> = {
    "currency code": "Currency",
    "total amount": "Total amount",
    "expense sheet status": "Status",
    "user name": "User",
    "user id": "User",
    "created date": "Created date",
    "proj id": "Project",
    "hoja gastos id": "Expense sheet",
  };

  const loweredKey = normalizedKey.toLowerCase();
  return aliasMap[loweredKey] || titleCaseWords(normalizedKey);
};

const getLocalizedCategoryHeader = (uiLanguage: string): string => {
  const normalizedLanguage = uiLanguage.toLowerCase();

  if (normalizedLanguage.startsWith("en")) return "Category";
  if (normalizedLanguage.startsWith("eu")) return "Kategoria";
  if (normalizedLanguage.startsWith("pt")) return "Categoria";
  if (normalizedLanguage.startsWith("it")) return "Categoria";
  if (normalizedLanguage.startsWith("zh")) return "类别";
  return "Categoria";
};

const getLocalizedValueHeader = (uiLanguage: string): string => {
  const normalizedLanguage = uiLanguage.toLowerCase();

  if (normalizedLanguage.startsWith("en")) return "Value";
  if (normalizedLanguage.startsWith("eu")) return "Balioa";
  if (normalizedLanguage.startsWith("pt")) return "Valor";
  if (normalizedLanguage.startsWith("it")) return "Valore";
  if (normalizedLanguage.startsWith("zh")) return "数值";
  return "Valor";
};

const normalizeNumericToken = (value: string): number | null => {
  let normalizedValue = toSafeText(value).replace(/\s+/g, "");
  if (!normalizedValue) {
    return null;
  }

  const lastCommaIndex = normalizedValue.lastIndexOf(",");
  const lastDotIndex = normalizedValue.lastIndexOf(".");

  if (lastCommaIndex >= 0 && lastDotIndex >= 0) {
    if (lastCommaIndex > lastDotIndex) {
      normalizedValue = normalizedValue.replace(/\./g, "").replace(",", ".");
    } else {
      normalizedValue = normalizedValue.replace(/,/g, "");
    }
  } else if (lastCommaIndex >= 0) {
    const decimalLength = normalizedValue.length - lastCommaIndex - 1;
    normalizedValue =
      decimalLength > 0 && decimalLength <= 2
        ? normalizedValue.replace(/\./g, "").replace(",", ".")
        : normalizedValue.replace(/,/g, "");
  } else {
    normalizedValue = normalizedValue.replace(/,/g, "");
  }

  const parsedValue = Number(normalizedValue);
  return Number.isFinite(parsedValue) ? parsedValue : null;
};

const extractLegacySeriesRows = (value: string): ChartDatum[] => {
  const seriesPattern = /([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ0-9 _/-]{0,24}|[A-Z]{2,})\s*:\s*([-+]?\d[\d.,]*)/g;
  const rows: ChartDatum[] = [];
  const seenLabels = new Set<string>();

  for (const match of sanitizeStructuredText(value).matchAll(seriesPattern)) {
    const label = toSafeText(match[1]);
    const numericValue = normalizeNumericToken(match[2] || "");
    if (!label || numericValue === null) {
      continue;
    }

    const normalizedLabel = label.toLowerCase();
    if (seenLabels.has(normalizedLabel)) {
      continue;
    }

    seenLabels.add(normalizedLabel);
    rows.push({
      label,
      value: numericValue,
    });
  }

  return rows;
};

const toCategoryValueRows = (value: Record<string, unknown>): ChartDatum[] => {
  return Object.entries(value)
    .filter(([, entryValue]) => isFiniteNumber(entryValue))
    .map(([entryKey, entryValue]) => ({
      label: entryKey,
      value: entryValue,
    }));
};

const toFlatTableRows = (value: unknown): TableRow[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((entry) => (isRecord(entry) ? toFlatTableRow(entry) : null))
    .filter((entry): entry is TableRow => !!entry);
};

const resolveCandidateSeriesKey = (rows: ChartDatum[]): string => {
  const firstRow = rows.find((entry) => isRecord(entry));
  if (!firstRow) return "";

  for (const [entryKey, entryValue] of Object.entries(firstRow)) {
    if (typeof entryValue === "string" && toSafeText(entryValue)) {
      return entryKey;
    }
  }

  return "";
};

const resolveCandidateValueKey = (rows: ChartDatum[]): string => {
  const firstRow = rows.find((entry) => isRecord(entry));
  if (!firstRow) return "";

  for (const [entryKey, entryValue] of Object.entries(firstRow)) {
    if (isFiniteNumber(entryValue)) {
      return entryKey;
    }
  }

  return "";
};

const buildRecoveredChartMessage = (
  requestedVisualizationType: Exclude<VisualizationType, "table">,
  data: ChartDatum[]
): ChatMessage | null => {
  if (requestedVisualizationType === "pie") {
    const payload: ChartPayload = {
      chartType: "pie",
      data,
      nameKey: resolveCandidateSeriesKey(data) || "label",
      dataKey: resolveCandidateValueKey(data) || "value",
    };

    const renderableMessage = resolveRenderableChatMessage({ type: "chart", payload });
    return renderableMessage.type === "chart" ? renderableMessage : null;
  }

  const payload: ChartPayload = {
    chartType: requestedVisualizationType,
    data,
    xKey: resolveCandidateSeriesKey(data) || "label",
    yKey: resolveCandidateValueKey(data) || "value",
  };

  const renderableMessage = resolveRenderableChatMessage({ type: "chart", payload });
  return renderableMessage.type === "chart" ? renderableMessage : null;
};

const buildRecoveredTableMessage = (rows: TableRow[], uiLanguage: string): ChatMessage | null => {
  if (rows.length === 0) {
    return null;
  }

  const firstRow = rows[0];
  const columns: TableColumn[] = Object.keys(firstRow).map((entryKey) => ({
    key: entryKey,
    header:
      entryKey === "label"
        ? getLocalizedCategoryHeader(uiLanguage)
        : entryKey === "value"
          ? getLocalizedValueHeader(uiLanguage)
          : humanizeDatasetKey(entryKey),
    align: typeof firstRow[entryKey] === "number" ? "right" : "left",
  }));

  const renderableMessage = resolveRenderableChatMessage({
    type: "table",
    payload: {
      columns,
      rows,
    } satisfies TablePayload,
  });

  return renderableMessage.type === "table" ? renderableMessage : null;
};

const tryRecoverRequestedVisualizationMessages = (
  value: unknown,
  requestedVisualizationType: VisualizationType
): ChatMessage[] | null => {
  if (shouldSkipVisualizationRecovery(value)) {
    return null;
  }

  const uiLanguage = resolveCurrentUiLanguage();
  const introMessage = createMarkdownMessage(
    buildRecoveredVisualizationMarkdown(requestedVisualizationType === "table" ? "table" : requestedVisualizationType)
  );
  const recoverySource = resolveVisualizationRecoverySource(value);

  if (isRecord(recoverySource)) {
    const categoryValueRows = toCategoryValueRows(recoverySource);
    if (categoryValueRows.length > 0) {
      const recoveredMessage =
        requestedVisualizationType === "table"
          ? buildRecoveredTableMessage(categoryValueRows as TableRow[], uiLanguage)
          : buildRecoveredChartMessage(requestedVisualizationType, categoryValueRows);

      return recoveredMessage ? [introMessage, recoveredMessage] : null;
    }

    const singleRow = toFlatTableRow(recoverySource);
    if (singleRow && requestedVisualizationType === "table") {
      const recoveredMessage = buildRecoveredTableMessage([singleRow], uiLanguage);
      return recoveredMessage ? [introMessage, recoveredMessage] : null;
    }
  }

  if (Array.isArray(recoverySource)) {
    const flatRows = toFlatTableRows(recoverySource);
    if (flatRows.length === 0) {
      return null;
    }

    if (requestedVisualizationType === "table") {
      const recoveredMessage = buildRecoveredTableMessage(flatRows, uiLanguage);
      return recoveredMessage ? [introMessage, recoveredMessage] : null;
    }

    const chartRows = flatRows as ChartDatum[];
    const recoveredMessage = buildRecoveredChartMessage(requestedVisualizationType, chartRows);
    return recoveredMessage ? [introMessage, recoveredMessage] : null;
  }

  return null;
};

const tryRecoverRequestedVisualizationMessagesFromText = (
  value: string,
  requestedVisualizationType: VisualizationType
): ChatMessage[] | null => {
  const rows = extractLegacySeriesRows(value);
  if (rows.length === 0) {
    return null;
  }

  const uiLanguage = resolveCurrentUiLanguage();
  const introMessage = createMarkdownMessage(
    buildRecoveredVisualizationMarkdown(requestedVisualizationType === "table" ? "table" : requestedVisualizationType)
  );

  const recoveredMessage =
    requestedVisualizationType === "table"
      ? buildRecoveredTableMessage(rows as TableRow[], uiLanguage)
      : buildRecoveredChartMessage(requestedVisualizationType, rows);

  return recoveredMessage ? [introMessage, recoveredMessage] : null;
};

const extractBalancedJsonSegment = (value: string, openingCharacter: "{" | "["): string | null => {
  const startIndex = value.indexOf(openingCharacter);
  if (startIndex < 0) return null;

  const stack: string[] = [];
  let inString = false;
  let isEscaped = false;

  for (let index = startIndex; index < value.length; index += 1) {
    const character = value[index];

    if (inString) {
      if (isEscaped) {
        isEscaped = false;
        continue;
      }

      if (character === "\\") {
        isEscaped = true;
        continue;
      }

      if (character === '"') {
        inString = false;
      }
      continue;
    }

    if (character === '"') {
      inString = true;
      continue;
    }

    if (character === "{" || character === "[") {
      stack.push(character === "{" ? "}" : "]");
      continue;
    }

    const expectedClosingCharacter = stack[stack.length - 1];
    if (character === expectedClosingCharacter) {
      stack.pop();
      if (stack.length === 0) {
        return value.slice(startIndex, index + 1);
      }
    }
  }

  return null;
};

const extractJsonArray = (value: string): string | null => extractBalancedJsonSegment(value, "[");

const extractJsonObject = (value: string): string | null => extractBalancedJsonSegment(value, "{");

const tryParseEmbeddedJson = (value: string): unknown | null => {
  const arrayStartIndex = value.indexOf("[");
  const objectStartIndex = value.indexOf("{");
  const shouldTryArrayFirst =
    arrayStartIndex >= 0 && (objectStartIndex < 0 || arrayStartIndex < objectStartIndex);

  if (shouldTryArrayFirst) {
    const embeddedArray = extractJsonArray(value);
    const parsedArray = embeddedArray ? tryParseJson(embeddedArray) : null;
    if (parsedArray !== null) {
      return parsedArray;
    }
  }

  const embeddedObject = extractJsonObject(value);
  const parsedObject = embeddedObject ? tryParseJson(embeddedObject) : null;
  if (parsedObject !== null) {
    return parsedObject;
  }

  const embeddedArray = extractJsonArray(value);
  return embeddedArray ? tryParseJson(embeddedArray) : null;
};

const extractNamedParameter = (value: string, parameterName: string): string => {
  const safeParameterName = parameterName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = value.match(new RegExp(`${safeParameterName}\\s*[:=]\\s*["']?([\\w.-]+)["']?`, "i"));
  return toSafeText(match?.[1]);
};

const resolveFirstRecord = (value: ChartPayload["data"]): Record<string, unknown> | null => {
  const firstRecord = value.find((entry) => isRecord(entry));
  return firstRecord || null;
};

const resolveExistingDataKey = (data: ChartPayload["data"], candidate: string): string => {
  const firstRecord = resolveFirstRecord(data);
  if (!firstRecord || !candidate) return "";

  const loweredCandidate = candidate.toLowerCase();
  const matchingKey = Object.keys(firstRecord).find((entryKey) => entryKey.toLowerCase() === loweredCandidate);
  return matchingKey || "";
};

const pickExistingDataKey = (data: ChartPayload["data"], candidates: string[]): string => {
  for (const candidate of candidates) {
    const resolvedKey = resolveExistingDataKey(data, candidate);
    if (resolvedKey) {
      return resolvedKey;
    }
  }

  return "";
};

const extractLegacyChartType = (value: string): ChartPayload["chartType"] | null => {
  const safeValue = toSafeText(value).toLowerCase();

  if (/\b(?:pie\s+chart|chart\s+pie|graph\s+pie|graf(?:ico|ica)\s+(?:de\s+)?(?:pie|pastel|circular))\b/i.test(safeValue)) {
    return "pie";
  }

  if (/\b(?:bar\s+chart|chart\s+bar|graph\s+bar|graf(?:ico|ica)\s+de\s+barras?)\b/i.test(safeValue)) {
    return "bar";
  }

  if (/\b(?:line\s+chart|chart\s+line|graph\s+line|graf(?:ico|ica)\s+de\s+lineas?)\b/i.test(safeValue)) {
    return "line";
  }

  return null;
};

const cleanLegacyVisualizationIntro = (value: string, chartType: ChartPayload["chartType"]): string => {
  const normalizedValue = sanitizeStructuredText(value)
    .replace(/^markdown\s*[,;:-]?\s*/i, "")
    .replace(new RegExp(`(?:chart|graph)\\s+${chartType}\\s+with\\s+data\\s*[,;:-]?\\s*$`, "i"), "")
    .replace(new RegExp(`${chartType}\\s+(?:chart|graph)\\s*[,;:-]?\\s*$`, "i"), "")
    .replace(/[,:; -]+$/g, "")
    .trim();

  return normalizedValue;
};

const tryParseLegacyChartMessages = (value: string): ChatMessage[] | null => {
  const chartType = extractLegacyChartType(value);
  if (!chartType) {
    return null;
  }

  const arrayPayload = extractJsonArray(value);
  if (!arrayPayload) {
    return null;
  }

  const parsedArray = tryParseJson(arrayPayload);
  if (!Array.isArray(parsedArray) || parsedArray.length === 0 || !parsedArray.every((entry) => isRecord(entry))) {
    return null;
  }

  const data = parsedArray as ChartPayload["data"];
  const arrayStartIndex = value.indexOf(arrayPayload);
  const introText = cleanLegacyVisualizationIntro(value.slice(0, arrayStartIndex), chartType);
  const markdownText = introText || buildRecoveredVisualizationMarkdown(chartType);

  if (chartType === "pie") {
    const explicitNameKey = resolveExistingDataKey(data, extractNamedParameter(value, "nameKey"));
    const explicitDataKey = resolveExistingDataKey(data, extractNamedParameter(value, "dataKey"));
    const payload: ChartPayload = {
      chartType: "pie",
      data,
      nameKey: explicitNameKey || pickExistingDataKey(data, ["name", "label", "category", "currency", "currencyCode"]),
      dataKey: explicitDataKey || pickExistingDataKey(data, ["value", "total", "amount", "count", "y"]),
    };

    if (resolveRenderableChatMessage({ type: "chart", payload }).type !== "chart") {
      return null;
    }

    return [createMarkdownMessage(markdownText), { type: "chart", payload }];
  }

  const explicitXKey = resolveExistingDataKey(data, extractNamedParameter(value, "xKey"));
  const explicitYKey = resolveExistingDataKey(data, extractNamedParameter(value, "yKey"));
  const payload: ChartPayload = {
    chartType,
    data,
    xKey: explicitXKey || pickExistingDataKey(data, ["x", "name", "label", "category", "month", "date"]),
    yKey: explicitYKey || pickExistingDataKey(data, ["y", "value", "total", "amount", "count"]),
  };

  if (resolveRenderableChatMessage({ type: "chart", payload }).type !== "chart") {
    return null;
  }

  return [createMarkdownMessage(markdownText), { type: "chart", payload }];
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return !!value && typeof value === "object" && !Array.isArray(value);
};

const getRecordValue = (record: Record<string, unknown>, ...keys: string[]): unknown => {
  const loweredKeys = keys.map((key) => key.toLowerCase());
  for (const [entryKey, entryValue] of Object.entries(record)) {
    if (loweredKeys.includes(entryKey.toLowerCase())) {
      return entryValue;
    }
  }

  return undefined;
};

const isVisualizationType = (value: unknown): value is VisualizationType => {
  return value === "bar" || value === "line" || value === "pie" || value === "table";
};

const normalizeVisualizationType = (value: unknown): VisualizationType | null => {
  const safeValue = toSafeText(value).toLowerCase().replace(/_/g, "-");
  return isVisualizationType(safeValue) ? safeValue : null;
};

const normalizeMessageType = (value: unknown): ChatMessage["type"] | null => {
  const safeValue = toSafeText(value).toLowerCase().replace(/_/g, "-");

  switch (safeValue) {
    case "markdown":
    case "text":
      return "markdown";
    case "chart":
    case "graph":
      return "chart";
    case "table":
      return "table";
    case "question-to-choose-chart-type":
    case "chart-type-choice":
    case "chart-type-picker":
    case "choose-chart-type":
      return "question-to-choose-chart-type";
    default:
      return null;
  }
};

const inferMessageType = (value: Record<string, unknown>): ChatMessage["type"] | null => {
  const explicitType = normalizeMessageType(getRecordValue(value, "type", "messageType", "kind"));
  if (explicitType) {
    return explicitType;
  }

  const payloadCandidate = getRecordValue(value, "payload");
  const normalizedPayload = isRecord(payloadCandidate) ? payloadCandidate : value;
  const inferredVisualizationType = normalizeVisualizationType(
    getRecordValue(normalizedPayload, "chartType", "chart_type")
  );
  if (inferredVisualizationType && inferredVisualizationType !== "table") {
    return "chart";
  }

  const hasColumns = Array.isArray(getRecordValue(normalizedPayload, "columns"));
  const hasRows = Array.isArray(getRecordValue(normalizedPayload, "rows"));
  if (inferredVisualizationType === "table" || (hasColumns && hasRows)) {
    return "table";
  }

  if (toSafeText(getRecordValue(value, "markdown", "text", "content"))) {
    return "markdown";
  }

  if (
    toSafeText(getRecordValue(value, "originalPrompt", "original_prompt")) ||
    Array.isArray(getRecordValue(value, "options"))
  ) {
    return "question-to-choose-chart-type";
  }

  return null;
};

const shouldSkipVisualizationRecovery = (value: unknown): boolean => {
  if (Array.isArray(value)) {
    return value.some((entry) => isRecord(entry) && inferMessageType(entry) !== null);
  }

  if (!isRecord(value)) {
    return false;
  }

  if (Array.isArray(getRecordValue(value, "messages", "items", "mensajes"))) {
    return true;
  }

  return inferMessageType(value) !== null;
};

// Allows recovery when the model wraps raw data in an unsupported pseudo-structured envelope.
const resolveVisualizationRecoverySource = (value: unknown): unknown => {
  if (!isRecord(value)) {
    return value;
  }

  const nestedPayload = getRecordValue(value, "payload", "data", "dataset", "result", "values");
  if (isRecord(nestedPayload) || Array.isArray(nestedPayload)) {
    return nestedPayload;
  }

  return value;
};

const normalizeStructuredMessage = (value: unknown): { message: ChatMessage | null; errors: string[] } => {
  if (!isRecord(value)) {
    return {
      message: null,
      errors: ["Cada mensaje estructurado debe ser un objeto."],
    };
  }

  const rawType = toSafeText(getRecordValue(value, "type", "messageType", "kind"));
  const type = inferMessageType(value);

  if (type === "markdown") {
    return {
      message: createMarkdownMessage(sanitizeStructuredText(getRecordValue(value, "markdown", "text", "content"))),
      errors: [],
    };
  }

  if (type === "chart") {
    const payload = getRecordValue(value, "payload");
    return {
      message: {
        type: "chart",
        payload: (isRecord(payload) ? payload : value) as ChartPayload,
      },
      errors: [],
    };
  }

  if (type === "table") {
    const payload = getRecordValue(value, "payload");
    return {
      message: {
        type: "table",
        payload: (isRecord(payload) ? payload : value) as TablePayload,
      },
      errors: [],
    };
  }

  if (type === "question-to-choose-chart-type") {
    const optionsValue = getRecordValue(value, "options");
    const options = Array.isArray(optionsValue)
      ? optionsValue
          .map((entry) => {
            if (!isRecord(entry)) return null;

            const optionValue = normalizeVisualizationType(getRecordValue(entry, "value", "type"));
            if (!optionValue) return null;

            return {
              value: optionValue,
              label: sanitizeStructuredText(getRecordValue(entry, "label")),
              description: sanitizeStructuredText(getRecordValue(entry, "description")) || undefined,
            };
          })
          .filter(
            (entry): entry is { value: VisualizationType; label: string; description?: string } =>
              !!entry && isVisualizationType(entry.value)
          )
      : [];

    return {
      message: createChartTypeChoiceMessage(sanitizeStructuredText(getRecordValue(value, "originalPrompt", "original_prompt")), {
        question: sanitizeStructuredText(getRecordValue(value, "question")) || undefined,
        options,
        selectedType: normalizeVisualizationType(getRecordValue(value, "selectedType", "selected_type")),
      }),
      errors: [],
    };
  }

  return {
    message: null,
    errors: [`Tipo de mensaje no soportado: ${rawType || "unknown"}.`],
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

  if (isRecord(value)) {
    const nestedMessages = getRecordValue(value, "messages", "items", "mensajes");
    if (Array.isArray(nestedMessages)) {
      return toStructuredMessages(nestedMessages);
    }

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
export const parseStructuredChatMessages = (
  answer: string,
  options?: ParseStructuredChatMessagesOptions
): ParsedStructuredChatMessages => {
  const safeAnswer = sanitizeStructuredText(answer);
  if (!safeAnswer) {
    return {
      messages: [createMarkdownMessage("Sin respuesta.")],
      source: "markdown-fallback",
      errors: ["La respuesta del asistente estaba vacia."],
    };
  }

  const parsedJson = tryParseJson(safeAnswer);
  const parsedStructuredValue = parsedJson ?? tryParseEmbeddedJson(safeAnswer);
  if (parsedStructuredValue !== null) {
    const rescuedRequestedVisualizationMessages =
      options?.requestedVisualizationType &&
      tryRecoverRequestedVisualizationMessages(parsedStructuredValue, options.requestedVisualizationType);
    if (rescuedRequestedVisualizationMessages && rescuedRequestedVisualizationMessages.length > 0) {
      return {
        messages: rescuedRequestedVisualizationMessages,
        source: "structured",
        errors: [],
      };
    }

    const structuredMessages = toStructuredMessages(parsedStructuredValue);
    if (structuredMessages.length > 0) {
      return {
        messages: structuredMessages,
        source: "structured",
        errors: [],
      };
    }
  }

  const rescuedLegacyChartMessages = tryParseLegacyChartMessages(safeAnswer);
  if (rescuedLegacyChartMessages && rescuedLegacyChartMessages.length > 0) {
    return {
      messages: rescuedLegacyChartMessages,
      source: "structured",
      errors: [],
    };
  }

  const rescuedRequestedVisualizationMessagesFromText =
    options?.requestedVisualizationType &&
    tryRecoverRequestedVisualizationMessagesFromText(safeAnswer, options.requestedVisualizationType);
  if (rescuedRequestedVisualizationMessagesFromText && rescuedRequestedVisualizationMessagesFromText.length > 0) {
    return {
      messages: rescuedRequestedVisualizationMessagesFromText,
      source: "structured",
      errors: [],
    };
  }

  return {
    messages: [createMarkdownMessage(formatLegacyAssistantMarkdown(safeAnswer))],
    source: "markdown-fallback",
    errors: parsedStructuredValue === null ? ["La respuesta no era JSON estructurado."] : ["No se encontraron mensajes validos."],
  };
};
