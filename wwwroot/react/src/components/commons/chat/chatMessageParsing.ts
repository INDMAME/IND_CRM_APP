import type {
  ChartDatum,
  ChartPayload,
  ChatMessage,
  ChartTypeChoiceOption,
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
export const formatLegacyAssistantMarkdown = (value: string): string => formatAssistantMarkdown(value);

type AssistantLocale = "es" | "en" | "eu" | "pt" | "it" | "zhHans";

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

const resolveAssistantLocale = (uiLanguage?: string | null): AssistantLocale => {
  const normalizedLanguage = toSafeText(uiLanguage || resolveCurrentUiLanguage()).toLowerCase().replace(/_/g, "-");

  if (normalizedLanguage.startsWith("en")) return "en";
  if (normalizedLanguage.startsWith("eu")) return "eu";
  if (normalizedLanguage.startsWith("pt")) return "pt";
  if (normalizedLanguage.startsWith("it")) return "it";
  if (normalizedLanguage.startsWith("zh")) return "zhHans";
  return "es";
};

const normalizeFieldKeyForLookup = (value: string): string =>
  toSafeText(value)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[^A-Za-z0-9]+/g, "")
    .toLowerCase();

const FRIENDLY_FIELD_LABELS: Record<AssistantLocale, Record<string, string>> = {
  es: {
    hojagastosid: "Hoja de gasto",
    description: "Descripcion",
    expensesheetstatus: "Estado",
    estadocomentarios: "Comentarios",
    userid: "Usuario",
    username: "Nombre",
    voucher: "Voucher",
    projid: "Proyecto",
    currencycode: "Moneda",
    totalamount: "Importe",
    exchrate: "Tipo de cambio",
    exchangeratemode: "Modo de cambio",
    createddate: "Fecha",
    transdate: "Fecha",
    qty: "Cantidad",
    price: "Precio",
    amount: "Importe",
    fileid: "Archivo",
    lineid: "Linea",
  },
  en: {
    hojagastosid: "Expense sheet",
    description: "Description",
    expensesheetstatus: "Status",
    estadocomentarios: "Comments",
    userid: "User",
    username: "Name",
    voucher: "Voucher",
    projid: "Project",
    currencycode: "Currency",
    totalamount: "Amount",
    exchrate: "Exchange rate",
    exchangeratemode: "Exchange mode",
    createddate: "Date",
    transdate: "Date",
    qty: "Quantity",
    price: "Price",
    amount: "Amount",
    fileid: "File",
    lineid: "Line",
  },
  eu: {
    hojagastosid: "Gastu-orria",
    description: "Deskribapena",
    expensesheetstatus: "Egoera",
    estadocomentarios: "Iruzkinak",
    userid: "Erabiltzailea",
    username: "Izena",
    voucher: "Voucher",
    projid: "Proiektua",
    currencycode: "Moneta",
    totalamount: "Zenbatekoa",
    exchrate: "Truke-tasa",
    exchangeratemode: "Truke modua",
    createddate: "Data",
    transdate: "Data",
    qty: "Kantitatea",
    price: "Prezioa",
    amount: "Zenbatekoa",
    fileid: "Fitxategia",
    lineid: "Lerroa",
  },
  pt: {
    hojagastosid: "Folha de despesas",
    description: "Descricao",
    expensesheetstatus: "Estado",
    estadocomentarios: "Comentarios",
    userid: "Utilizador",
    username: "Nome",
    voucher: "Voucher",
    projid: "Projeto",
    currencycode: "Moeda",
    totalamount: "Montante",
    exchrate: "Taxa de cambio",
    exchangeratemode: "Modo de cambio",
    createddate: "Data",
    transdate: "Data",
    qty: "Quantidade",
    price: "Preco",
    amount: "Montante",
    fileid: "Ficheiro",
    lineid: "Linha",
  },
  it: {
    hojagastosid: "Nota spese",
    description: "Descrizione",
    expensesheetstatus: "Stato",
    estadocomentarios: "Commenti",
    userid: "Utente",
    username: "Nome",
    voucher: "Voucher",
    projid: "Progetto",
    currencycode: "Valuta",
    totalamount: "Importo",
    exchrate: "Cambio",
    exchangeratemode: "Modalita cambio",
    createddate: "Data",
    transdate: "Data",
    qty: "Quantita",
    price: "Prezzo",
    amount: "Importo",
    fileid: "File",
    lineid: "Riga",
  },
  zhHans: {
    hojagastosid: "\u8d39\u7528\u5355",
    description: "\u63cf\u8ff0",
    expensesheetstatus: "\u72b6\u6001",
    estadocomentarios: "\u8bc4\u8bba",
    userid: "\u7528\u6237",
    username: "\u540d\u79f0",
    voucher: "Voucher",
    projid: "\u9879\u76ee",
    currencycode: "\u5e01\u79cd",
    totalamount: "\u91d1\u989d",
    exchrate: "\u6c47\u7387",
    exchangeratemode: "\u6c47\u7387\u6a21\u5f0f",
    createddate: "\u65e5\u671f",
    transdate: "\u65e5\u671f",
    qty: "\u6570\u91cf",
    price: "\u4ef7\u683c",
    amount: "\u91d1\u989d",
    fileid: "\u6587\u4ef6",
    lineid: "\u884c",
  },
};

const resolveFriendlyFieldLabel = (key: string, uiLanguage = resolveCurrentUiLanguage()): string => {
  const locale = resolveAssistantLocale(uiLanguage);
  return FRIENDLY_FIELD_LABELS[locale][normalizeFieldKeyForLookup(key)] || "";
};

const escapeRegex = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const replaceKnownFieldLabelsInText = (value: string, uiLanguage = resolveCurrentUiLanguage()): string => {
  const locale = resolveAssistantLocale(uiLanguage);
  const replacements = Object.entries(FRIENDLY_FIELD_LABELS[locale]).sort((left, right) => right[0].length - left[0].length);

  return replacements.reduce((currentText, [rawKey, friendlyLabel]) => {
    const regex = new RegExp(`\\b${escapeRegex(rawKey)}\\b`, "gi");
    return currentText.replace(regex, friendlyLabel);
  }, value);
};

// Normalizes assistant markdown and swaps technical field keys for user-facing labels.
const formatAssistantMarkdown = (value: string, uiLanguage = resolveCurrentUiLanguage()): string => {
  const normalizedText = replaceKnownFieldLabelsInText(sanitizeStructuredText(value), uiLanguage);
  if (!normalizedText) return "";

  return normalizedText
    .replace(/\s*[-\u2022]\s+/g, "\n- ")
    .replace(/;\s+/g, ";\n")
    .replace(/:\s+(?=(?:EUR|USD|AED|GBP|CHF|JPY|CNY|SEK|NOK|DKK|CAD|AUD|MXN|\u20AC|\$)\s*[\d])/g, ":\n")
    .replace(AMOUNT_LINE_BREAK_PATTERN, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
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

const humanizeDatasetKey = (key: string, uiLanguage = resolveCurrentUiLanguage()): string => {
  const normalizedKey = toSafeText(key)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalizedKey) {
    return "Value";
  }

  const friendlyLabel = resolveFriendlyFieldLabel(key, uiLanguage);
  return friendlyLabel || titleCaseWords(normalizedKey);
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

const isPipeTableLine = (value: string): boolean => {
  const trimmed = toSafeText(value);
  return trimmed.startsWith("|") && trimmed.endsWith("|") && trimmed.split("|").length >= 4;
};

const isPipeTableSeparatorLine = (value: string): boolean => /^[\s|:-]+$/.test(toSafeText(value));

const splitPipeTableCells = (value: string): string[] =>
  toSafeText(value)
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((entry) => entry.trim());

const parseLegacyTableCellValue = (value: string): TableRow[string] => {
  const safeValue = toSafeText(value);
  if (!safeValue) {
    return null;
  }

  if (/^0\d+$/.test(safeValue) || /^\d{4}-\d{2}-\d{2}$/.test(safeValue)) {
    return safeValue;
  }

  if (/^-?[\d.,]+$/.test(safeValue)) {
    const numericValue = normalizeNumericToken(safeValue);
    if (numericValue !== null) {
      return numericValue;
    }
  }

  return safeValue;
};

const extractTrailingSectionTitle = (value: string): { body: string; title: string } => {
  const lines = sanitizeStructuredText(value).split("\n");

  for (let index = lines.length - 1; index >= 0; index -= 1) {
    const line = toSafeText(lines[index]);
    if (!line) {
      continue;
    }

    const isSectionTitle = line.endsWith(":") && line.length <= 90 && !line.startsWith("-") && !line.startsWith("*");
    if (!isSectionTitle) {
      break;
    }

    return {
      body: lines.slice(0, index).join("\n").trim(),
      title: line.slice(0, -1).trim(),
    };
  }

  return {
    body: sanitizeStructuredText(value),
    title: "",
  };
};

const extractLegacySeriesRows = (value: string): ChartDatum[] => {
  const seriesPattern = /([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ0-9 _/-]{0,24}|[A-Z]{2,})\s*:\s*([-+]?\d[\d.,]*)/g;
  const rows: ChartDatum[] = [];
  const seenLabels = new Set<string>();
  const normalizedText = sanitizeStructuredText(value);
  let match: RegExpExecArray | null;

  while ((match = seriesPattern.exec(normalizedText)) !== null) {
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
  return Object.entries(value).reduce<ChartDatum[]>((rows, [entryKey, entryValue]) => {
    if (!isFiniteNumber(entryValue)) {
      return rows;
    }

    rows.push({
      label: entryKey,
      value: entryValue,
    });

    return rows;
  }, []);
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
  data: ChartDatum[],
  title?: string | null,
  subtitle?: string | null
): ChatMessage | null => {
  if (requestedVisualizationType === "pie") {
    const payload: ChartPayload = {
      chartType: "pie",
      title: toSafeText(title) || undefined,
      subtitle: toSafeText(subtitle) || undefined,
      data,
      nameKey: resolveCandidateSeriesKey(data) || "label",
      dataKey: resolveCandidateValueKey(data) || "value",
    };

    const renderableMessage = resolveRenderableChatMessage({ type: "chart", payload });
    return renderableMessage.type === "chart" ? renderableMessage : null;
  }

  const payload: ChartPayload = {
    chartType: requestedVisualizationType,
    title: toSafeText(title) || undefined,
    subtitle: toSafeText(subtitle) || undefined,
    data,
    xKey: resolveCandidateSeriesKey(data) || "label",
    yKey: resolveCandidateValueKey(data) || "value",
  };

  const renderableMessage = resolveRenderableChatMessage({ type: "chart", payload });
  return renderableMessage.type === "chart" ? renderableMessage : null;
};

const buildRecoveredTableMessage = (
  rows: TableRow[],
  uiLanguage: string,
  title?: string | null,
  subtitle?: string | null
): ChatMessage | null => {
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
          : humanizeDatasetKey(entryKey, uiLanguage),
    align: typeof firstRow[entryKey] === "number" ? "right" : "left",
  }));

  const renderableMessage = resolveRenderableChatMessage({
    type: "table",
    payload: {
      title: toSafeText(title) || undefined,
      subtitle: toSafeText(subtitle) || undefined,
      columns,
      rows,
    } satisfies TablePayload,
  });

  return renderableMessage.type === "table" ? renderableMessage : null;
};

// Converts raw arrays or plain record payloads into the shared chat table card.
const tryRecoverGenericTableMessages = (value: unknown): ChatMessage[] | null => {
  if (shouldSkipVisualizationRecovery(value)) {
    return null;
  }

  const uiLanguage = resolveCurrentUiLanguage();
  const recoverySource = resolveVisualizationRecoverySource(value);

  if (Array.isArray(recoverySource)) {
    const flatRows = toFlatTableRows(recoverySource);
    if (flatRows.length === 0) {
      return null;
    }

    const recoveredMessage = buildRecoveredTableMessage(flatRows, uiLanguage);
    return recoveredMessage ? [recoveredMessage] : null;
  }

  if (isRecord(recoverySource)) {
    const singleRow = toFlatTableRow(recoverySource);
    if (!singleRow) {
      return null;
    }

    const recoveredMessage = buildRecoveredTableMessage([singleRow], uiLanguage);
    return recoveredMessage ? [recoveredMessage] : null;
  }

  return null;
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

// Rescues legacy pipe-delimited tables so they render as real table cards instead of ASCII blocks.
const tryParseLegacyPipeTableMessages = (value: string): ChatMessage[] | null => {
  const lines = sanitizeStructuredText(value).split("\n");
  const startIndex = lines.findIndex((line) => isPipeTableLine(line));
  if (startIndex < 0) {
    return null;
  }

  let endIndex = startIndex;
  while (endIndex + 1 < lines.length && (isPipeTableLine(lines[endIndex + 1]) || isPipeTableSeparatorLine(lines[endIndex + 1]))) {
    endIndex += 1;
  }

  const tableLines = lines.slice(startIndex, endIndex + 1);
  const headerCells = splitPipeTableCells(tableLines[0]);
  const dataStartIndex = tableLines.length > 1 && isPipeTableSeparatorLine(tableLines[1]) ? 2 : 1;
  const rawRowCells = tableLines
    .slice(dataStartIndex)
    .map((line) => splitPipeTableCells(line))
    .filter((cells) => cells.some((cell) => toSafeText(cell)));

  if (headerCells.length < 2 || rawRowCells.length === 0) {
    return null;
  }

  const columnCount = Math.max(headerCells.length, ...rawRowCells.map((cells) => cells.length));
  const normalizedHeaders = Array.from({ length: columnCount }, (_, index) => headerCells[index] || `column_${index + 1}`);
  const normalizedRows = rawRowCells.map((cells) =>
    Array.from({ length: columnCount }, (_, index) => cells[index] || "")
  );
  const uiLanguage = resolveCurrentUiLanguage();
  const columns: TableColumn[] = normalizedHeaders.map((entry, index) => {
    const values = normalizedRows.map((row) => row[index]);
    const isNumericColumn =
      values.some((entryValue) => toSafeText(entryValue)) &&
      values.every((entryValue) => !toSafeText(entryValue) || typeof parseLegacyTableCellValue(entryValue) === "number");

    return {
      key: `column_${index + 1}`,
      header: humanizeDatasetKey(entry, uiLanguage),
      align: isNumericColumn ? "right" : "left",
    };
  });
  const rows: TableRow[] = normalizedRows.map((cells) =>
    Object.fromEntries(columns.map((column, index) => [column.key, parseLegacyTableCellValue(cells[index])])) as TableRow
  );

  const beforeTable = lines.slice(0, startIndex).join("\n").trim();
  const afterTable = lines.slice(endIndex + 1).join("\n").trim();
  const extractedTitle = extractTrailingSectionTitle(beforeTable);
  const tableMessage = resolveRenderableChatMessage({
    type: "table",
    payload: {
      title: replaceKnownFieldLabelsInText(extractedTitle.title, uiLanguage) || undefined,
      columns,
      rows,
    } satisfies TablePayload,
  });

  if (tableMessage.type !== "table") {
    return null;
  }

  const messages: ChatMessage[] = [];
  if (toSafeText(extractedTitle.body)) {
    messages.push(createMarkdownMessage(formatAssistantMarkdown(extractedTitle.body, uiLanguage)));
  }

  messages.push(tableMessage);

  if (toSafeText(afterTable)) {
    messages.push(createMarkdownMessage(formatAssistantMarkdown(afterTable, uiLanguage)));
  }

  return messages.length > 0 ? messages : null;
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

// Normalizes free-form assistant text so accent or spacing differences do not break chart recovery.
const normalizeLooseLookupText = (value: unknown): string =>
  toSafeText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

// Keeps only object rows because chart renderers expect keyed records, not primitive arrays.
const normalizeChartData = (value: unknown): ChartPayload["data"] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((entry): entry is ChartDatum => isRecord(entry));
};

// Resolves a chart data key from explicit payload hints first and then from known semantic aliases.
const resolveStructuredChartDataKey = (
  data: ChartPayload["data"],
  explicitValue: unknown,
  preferredCandidates: string[],
  fallbackResolver: (rows: ChartDatum[]) => string
): string => {
  const explicitKey = resolveExistingDataKey(data, toSafeText(explicitValue));
  if (explicitKey) {
    return explicitKey;
  }

  const preferredKey = pickExistingDataKey(data, preferredCandidates);
  if (preferredKey) {
    return preferredKey;
  }

  return fallbackResolver(data);
};

// Repairs structured chart payloads so valid data can still render when the model omits required keys.
const repairStructuredChartPayload = (value: Record<string, unknown>): ChartPayload | null => {
  const chartType = normalizeVisualizationType(getRecordValue(value, "chartType", "chart_type"));
  if (!chartType || chartType === "table") {
    return null;
  }

  const data = normalizeChartData(getRecordValue(value, "data", "values", "dataset", "rows"));
  if (data.length === 0) {
    return null;
  }

  const title = toSafeText(getRecordValue(value, "title")) || undefined;
  const subtitle = toSafeText(getRecordValue(value, "subtitle")) || undefined;
  const emptyStateLabel = toSafeText(getRecordValue(value, "emptyStateLabel", "empty_state_label")) || undefined;

  if (chartType === "pie") {
    const nameKey = resolveStructuredChartDataKey(
      data,
      getRecordValue(value, "nameKey", "name_key", "labelKey", "label_key", "categoryKey", "category_key", "xKey", "x_key"),
      ["name", "label", "category", "currency", "currencyCode", "x"],
      resolveCandidateSeriesKey
    );
    const dataKey = resolveStructuredChartDataKey(
      data,
      getRecordValue(value, "dataKey", "data_key", "valueKey", "value_key", "yKey", "y_key"),
      ["value", "total", "amount", "count", "y"],
      resolveCandidateValueKey
    );

    return {
      chartType: "pie",
      data,
      nameKey,
      dataKey,
      title,
      subtitle,
      emptyStateLabel,
    };
  }

  const xKey = resolveStructuredChartDataKey(
    data,
    getRecordValue(value, "xKey", "x_key", "labelKey", "label_key", "categoryKey", "category_key", "nameKey", "name_key"),
    ["x", "name", "label", "category", "month", "date"],
    resolveCandidateSeriesKey
  );
  const yKey = resolveStructuredChartDataKey(
    data,
    getRecordValue(value, "yKey", "y_key", "valueKey", "value_key", "dataKey", "data_key"),
    ["y", "value", "total", "amount", "count"],
    resolveCandidateValueKey
  );

  return {
    chartType,
    data,
    xKey,
    yKey,
    title,
    subtitle,
    emptyStateLabel,
  };
};

const extractLegacyChartType = (value: string): ChartPayload["chartType"] | null => {
  const safeValue = normalizeLooseLookupText(value);

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
  const safeValue = normalizeLooseLookupText(value).replace(/_/g, "-").replace(/\s+/g, "-");
  switch (safeValue) {
    case "bar":
    case "bars":
    case "bar-chart":
    case "bar-graph":
    case "barras":
    case "grafico-de-barras":
      return "bar";
    case "line":
    case "lines":
    case "line-chart":
    case "line-graph":
    case "lineas":
    case "grafico-de-lineas":
      return "line";
    case "pie":
    case "pie-chart":
    case "pie-graph":
    case "pastel":
    case "tarta":
    case "circular":
    case "grafico-de-pie":
    case "grafico-circular":
      return "pie";
    case "table":
    case "tabla":
      return "table";
    default:
      return isVisualizationType(safeValue) ? safeValue : null;
  }
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
      message: createMarkdownMessage(formatAssistantMarkdown(sanitizeStructuredText(getRecordValue(value, "markdown", "text", "content")))),
      errors: [],
    };
  }

  if (type === "chart") {
    const payload = getRecordValue(value, "payload");
    const payloadRecord = isRecord(payload) ? payload : null;
    const repairedPayload = repairStructuredChartPayload(payloadRecord ? { ...value, ...payloadRecord } : value);
    return {
      message: {
        type: "chart",
        payload: repairedPayload || ((payloadRecord || value) as ChartPayload),
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
      ? optionsValue.reduce<ChartTypeChoiceOption[]>((items, entry) => {
          if (!isRecord(entry)) return items;

          const optionValue = normalizeVisualizationType(getRecordValue(entry, "value", "type"));
          if (!optionValue) return items;

          const description = sanitizeStructuredText(getRecordValue(entry, "description"));
          items.push({
            value: optionValue,
            label: sanitizeStructuredText(getRecordValue(entry, "label")),
            ...(description ? { description } : {}),
          });

          return items;
        }, [])
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

const hasRequestedVisualizationMessage = (
  messages: ChatMessage[],
  requestedVisualizationType: VisualizationType | null | undefined
): boolean => {
  if (!requestedVisualizationType) {
    return false;
  }

  return messages.some((message) => {
    if (requestedVisualizationType === "table") {
      return message.type === "table";
    }

    return message.type === "chart" && message.payload.chartType === requestedVisualizationType;
  });
};

const coerceMessagesToRequestedVisualizationType = (
  messages: ChatMessage[],
  requestedVisualizationType: VisualizationType | null | undefined
): ChatMessage[] => {
  if (
    !requestedVisualizationType ||
    messages.length === 0 ||
    hasRequestedVisualizationMessage(messages, requestedVisualizationType)
  ) {
    return messages;
  }

  const uiLanguage = resolveCurrentUiLanguage();
  let converted = false;

  const coercedMessages = messages.map((message) => {
    if (converted) {
      return message;
    }

    if (message.type === "chart" && Array.isArray(message.payload.data) && message.payload.data.length > 0) {
      const replacement =
        requestedVisualizationType === "table"
          ? buildRecoveredTableMessage(
              message.payload.data as TableRow[],
              uiLanguage,
              message.payload.title,
              message.payload.subtitle
            )
          : buildRecoveredChartMessage(
              requestedVisualizationType,
              message.payload.data,
              message.payload.title,
              message.payload.subtitle
            );

      if (replacement) {
        converted = true;
        return replacement;
      }
    }

    if (message.type === "table" && Array.isArray(message.payload.rows) && message.payload.rows.length > 0) {
      if (requestedVisualizationType === "table") {
        return message;
      }

      const replacement = buildRecoveredChartMessage(
        requestedVisualizationType,
        message.payload.rows as ChartDatum[],
        message.payload.title,
        message.payload.subtitle
      );

      if (replacement) {
        converted = true;
        return replacement;
      }
    }

    return message;
  });

  return converted ? coercedMessages : messages;
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

    const rescuedGenericTableMessages = tryRecoverGenericTableMessages(parsedStructuredValue);
    if (rescuedGenericTableMessages && rescuedGenericTableMessages.length > 0) {
      return {
        messages: rescuedGenericTableMessages,
        source: "structured",
        errors: [],
      };
    }

    const structuredMessages = toStructuredMessages(parsedStructuredValue);
    if (structuredMessages.length > 0) {
      return {
        messages: coerceMessagesToRequestedVisualizationType(structuredMessages, options?.requestedVisualizationType),
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

  const rescuedLegacyPipeTableMessages = tryParseLegacyPipeTableMessages(safeAnswer);
  if (rescuedLegacyPipeTableMessages && rescuedLegacyPipeTableMessages.length > 0) {
    return {
      messages: rescuedLegacyPipeTableMessages,
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
