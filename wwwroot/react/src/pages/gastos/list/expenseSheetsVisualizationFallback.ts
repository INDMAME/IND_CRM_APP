import type { ChatMessage, ChartDatum, ChartPayload, TableColumn, TableRow, VisualizationType } from "../../../components/commons/chat/chatMessageContract.ts";
import { createMarkdownMessage } from "../../../components/commons/chat/chatMessageFactories.ts";
import { resolveRenderableChatMessage } from "../../../components/commons/chat/chatMessageValidation.ts";
import type { ExpenseSheetListItemDto, ExpenseSheetListResponseEnvelope } from "../expenseTypes.ts";
import { safeText } from "../utils/expenseUiUtils.ts";

type ExpenseSheetsVisualizationFallbackArgs = {
  question: string;
  requestedVisualizationType: VisualizationType | null | undefined;
  sourceJson: ExpenseSheetListResponseEnvelope | null | undefined;
  uiLanguage?: string | null;
};

type AssistantLocale = "es" | "en" | "eu" | "pt" | "it" | "zhHans";

type CurrencyTotalsCopy = {
  introChart: string;
  introTable: string;
  title: string;
  subtitle: string;
  currencyHeader: string;
  totalHeader: string;
};

const toSafeText = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  return String(value).trim();
};

const toIntentText = (value: unknown): string => {
  return toSafeText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

const toPositiveOrZeroNumber = (value: unknown): number => {
  const numericValue = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numericValue) ? numericValue : 0;
};

const resolveAssistantLocale = (uiLanguage?: string | null): AssistantLocale => {
  const normalizedLanguage = toSafeText(uiLanguage).toLowerCase().replace(/_/g, "-");

  if (normalizedLanguage.startsWith("en")) return "en";
  if (normalizedLanguage.startsWith("eu")) return "eu";
  if (normalizedLanguage.startsWith("pt")) return "pt";
  if (normalizedLanguage.startsWith("it")) return "it";
  if (normalizedLanguage.startsWith("zh")) return "zhHans";
  return "es";
};

const CURRENCY_TOTALS_COPY: Record<AssistantLocale, CurrencyTotalsCopy> = {
  es: {
    introChart: "Aquí tienes el gráfico con los totales por moneda.",
    introTable: "Aquí tienes la tabla con los totales por moneda.",
    title: "Totales por moneda",
    subtitle: "Importes agregados de las hojas de gasto cargadas.",
    currencyHeader: "Moneda",
    totalHeader: "Total",
  },
  en: {
    introChart: "Here is the chart with totals by currency.",
    introTable: "Here is the table with totals by currency.",
    title: "Totals by currency",
    subtitle: "Amounts aggregated from the loaded expense sheets.",
    currencyHeader: "Currency",
    totalHeader: "Total",
  },
  eu: {
    introChart: "Hemen duzu monetaren araberako guztizkoen grafikoa.",
    introTable: "Hemen duzu monetaren araberako guztizkoen taula.",
    title: "Monetaren araberako guztizkoak",
    subtitle: "Kargatutako gastu-orrien zenbateko metatuak.",
    currencyHeader: "Moneta",
    totalHeader: "Guztizkoa",
  },
  pt: {
    introChart: "Aqui tens o grafico com os totais por moeda.",
    introTable: "Aqui tens a tabela com os totais por moeda.",
    title: "Totais por moeda",
    subtitle: "Montantes agregados das folhas de despesas carregadas.",
    currencyHeader: "Moeda",
    totalHeader: "Total",
  },
  it: {
    introChart: "Ecco il grafico con i totali per valuta.",
    introTable: "Ecco la tabella con i totali per valuta.",
    title: "Totali per valuta",
    subtitle: "Importi aggregati dalle note spese caricate.",
    currencyHeader: "Valuta",
    totalHeader: "Totale",
  },
  zhHans: {
    introChart: "这里是按币种汇总总额的图表。",
    introTable: "这里是按币种汇总总额的表格。",
    title: "按币种汇总的总额",
    subtitle: "基于已加载费用单汇总的金额。",
    currencyHeader: "币种",
    totalHeader: "总额",
  },
};

const CURRENCY_KEYWORDS = [
  "moneda",
  "monedas",
  "divisa",
  "divisas",
  "currency",
  "currencies",
  "currencia",
  "currencias",
  "moeda",
  "moedas",
  "valuta",
  "valute",
  "货币",
  "币种",
];

const TOTAL_KEYWORDS = [
  "total",
  "totales",
  "importe",
  "importes",
  "sum",
  "suma",
  "amount",
  "amounts",
  "spend",
  "spending",
  "montante",
  "montantes",
  "valor",
  "valores",
  "总额",
  "金额",
];

const containsAnyKeyword = (value: string, keywords: string[]): boolean => {
  return keywords.some((keyword) => value.includes(keyword));
};

const wantsTotalsByCurrency = (question: string): boolean => {
  const normalizedQuestion = toIntentText(question);
  if (!normalizedQuestion) {
    return false;
  }

  return containsAnyKeyword(normalizedQuestion, CURRENCY_KEYWORDS) && containsAnyKeyword(normalizedQuestion, TOTAL_KEYWORDS);
};

const buildCurrencyTotalsRows = (items: ExpenseSheetListItemDto[]): ChartDatum[] => {
  const totalsByCurrency = new Map<string, number>();

  items.forEach((item) => {
    const currencyCode = safeText(item?.CurrencyCode).toUpperCase();
    const totalAmount = toPositiveOrZeroNumber(item?.TotalAmount);
    if (!currencyCode || totalAmount === 0) {
      return;
    }

    totalsByCurrency.set(currencyCode, (totalsByCurrency.get(currencyCode) ?? 0) + totalAmount);
  });

  return Array.from(totalsByCurrency.entries())
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .map(([label, value]) => ({ label, value: Number(value.toFixed(2)) }));
};

const buildCurrencyTotalsTableMessage = (rows: ChartDatum[], copy: CurrencyTotalsCopy): ChatMessage | null => {
  const columns: TableColumn[] = [
    {
      key: "label",
      header: copy.currencyHeader,
      align: "left",
    },
    {
      key: "value",
      header: copy.totalHeader,
      align: "right",
    },
  ];

  const renderableMessage = resolveRenderableChatMessage({
    type: "table",
    payload: {
      title: copy.title,
      subtitle: copy.subtitle,
      columns,
      rows: rows as TableRow[],
    },
  });

  return renderableMessage.type === "table" ? renderableMessage : null;
};

const buildCurrencyTotalsChartMessage = (
  requestedVisualizationType: Exclude<VisualizationType, "table">,
  rows: ChartDatum[],
  copy: CurrencyTotalsCopy
): ChatMessage | null => {
  const payload: ChartPayload =
    requestedVisualizationType === "pie"
      ? {
          chartType: "pie",
          title: copy.title,
          subtitle: copy.subtitle,
          data: rows,
          nameKey: "label",
          dataKey: "value",
        }
      : {
          chartType: requestedVisualizationType,
          title: copy.title,
          subtitle: copy.subtitle,
          data: rows,
          xKey: "label",
          yKey: "value",
        };

  const renderableMessage = resolveRenderableChatMessage({
    type: "chart",
    payload,
  });

  return renderableMessage.type === "chart" ? renderableMessage : null;
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

// Builds a deterministic visualization from loaded expense data when the model does not return a usable payload.
export const buildExpenseSheetsVisualizationFallbackMessages = ({
  question,
  requestedVisualizationType,
  sourceJson,
  uiLanguage,
}: ExpenseSheetsVisualizationFallbackArgs): ChatMessage[] | null => {
  if (!requestedVisualizationType || !sourceJson || !Array.isArray(sourceJson.Items) || sourceJson.Items.length === 0) {
    return null;
  }

  if (!wantsTotalsByCurrency(question)) {
    return null;
  }

  const rows = buildCurrencyTotalsRows(sourceJson.Items);
  if (rows.length === 0) {
    return null;
  }

  const copy = CURRENCY_TOTALS_COPY[resolveAssistantLocale(uiLanguage)];
  const visualMessage =
    requestedVisualizationType === "table"
      ? buildCurrencyTotalsTableMessage(rows, copy)
      : buildCurrencyTotalsChartMessage(requestedVisualizationType, rows, copy);

  if (!visualMessage) {
    return null;
  }

  return [createMarkdownMessage(requestedVisualizationType === "table" ? copy.introTable : copy.introChart), visualMessage];
};

export const shouldUseExpenseSheetsVisualizationFallback = (
  messages: ChatMessage[],
  requestedVisualizationType: VisualizationType | null | undefined
): boolean => {
  return !!requestedVisualizationType && !hasRequestedVisualizationMessage(messages, requestedVisualizationType);
};
