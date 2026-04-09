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

type ExpenseSheetTotalsCopy = {
  introChart: string;
  introTable: string;
  title: string;
  subtitle: string;
  sheetHeader: string;
  descriptionHeader: string;
  currencyHeader: string;
  totalHeader: string;
};

type ExpenseSheetTotalsRow = {
  label: string;
  sheetId: string;
  description: string | null;
  currencyCode: string | null;
  value: number;
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

const toFiniteNumber = (value: unknown): number | null => {
  const numericValue = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
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
    introChart: "Aqui tienes el grafico con los totales por moneda.",
    introTable: "Aqui tienes la tabla con los totales por moneda.",
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

const EXPENSE_SHEET_TOTALS_COPY: Record<AssistantLocale, ExpenseSheetTotalsCopy> = {
  es: {
    introChart: "Aqui tienes el grafico con el total de cada hoja de gasto.",
    introTable: "Aqui tienes la tabla con el total de cada hoja de gasto.",
    title: "Totales por hoja de gasto",
    subtitle: "Totales actuales de las hojas de gasto cargadas.",
    sheetHeader: "Hoja",
    descriptionHeader: "Descripcion",
    currencyHeader: "Moneda",
    totalHeader: "Total",
  },
  en: {
    introChart: "Here is the chart with the total for each expense sheet.",
    introTable: "Here is the table with the total for each expense sheet.",
    title: "Totals by expense sheet",
    subtitle: "Current totals for the loaded expense sheets.",
    sheetHeader: "Sheet",
    descriptionHeader: "Description",
    currencyHeader: "Currency",
    totalHeader: "Total",
  },
  eu: {
    introChart: "Hemen duzu gastu-orri bakoitzaren guztizkoa duen grafikoa.",
    introTable: "Hemen duzu gastu-orri bakoitzaren guztizkoa duen taula.",
    title: "Gastu-orriaren araberako guztizkoak",
    subtitle: "Kargatutako gastu-orrien uneko guztizkoak.",
    sheetHeader: "Orria",
    descriptionHeader: "Deskribapena",
    currencyHeader: "Moneta",
    totalHeader: "Guztizkoa",
  },
  pt: {
    introChart: "Aqui tens o grafico com o total de cada folha de despesas.",
    introTable: "Aqui tens a tabela com o total de cada folha de despesas.",
    title: "Totais por folha de despesas",
    subtitle: "Totais atuais das folhas de despesas carregadas.",
    sheetHeader: "Folha",
    descriptionHeader: "Descricao",
    currencyHeader: "Moeda",
    totalHeader: "Total",
  },
  it: {
    introChart: "Ecco il grafico con il totale di ogni nota spese.",
    introTable: "Ecco la tabella con il totale di ogni nota spese.",
    title: "Totali per nota spese",
    subtitle: "Totali correnti delle note spese caricate.",
    sheetHeader: "Nota",
    descriptionHeader: "Descrizione",
    currencyHeader: "Valuta",
    totalHeader: "Totale",
  },
  zhHans: {
    introChart: "这里是每张费用单总额的图表。",
    introTable: "这里是每张费用单总额的表格。",
    title: "按费用单汇总的总额",
    subtitle: "当前已加载费用单的总额。",
    sheetHeader: "费用单",
    descriptionHeader: "描述",
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

const EXPENSE_SHEET_KEYWORDS = [
  "hoja de gasto",
  "hojas de gasto",
  "hoja gasto",
  "hojas gasto",
  "expense sheet",
  "expense sheets",
  "sheet",
  "sheets",
  "folha de despesas",
  "folhas de despesas",
  "nota spese",
  "note spese",
  "费用单",
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

const wantsTotalsByExpenseSheet = (question: string): boolean => {
  const normalizedQuestion = toIntentText(question);
  if (!normalizedQuestion || wantsTotalsByCurrency(normalizedQuestion)) {
    return false;
  }

  return (
    containsAnyKeyword(normalizedQuestion, EXPENSE_SHEET_KEYWORDS) &&
    containsAnyKeyword(normalizedQuestion, TOTAL_KEYWORDS)
  );
};

const buildCurrencyTotalsRows = (items: ExpenseSheetListItemDto[]): ChartDatum[] => {
  const totalsByCurrency = new Map<string, number>();

  items.forEach((item) => {
    const currencyCode = safeText(item?.CurrencyCode).toUpperCase();
    const totalAmount = toFiniteNumber(item?.TotalAmount);
    if (!currencyCode || totalAmount === null) {
      return;
    }

    totalsByCurrency.set(currencyCode, (totalsByCurrency.get(currencyCode) ?? 0) + totalAmount);
  });

  return Array.from(totalsByCurrency.entries())
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .map(([label, value]) => ({ label, value: Number(value.toFixed(2)) }));
};

const buildExpenseSheetLabel = (item: ExpenseSheetListItemDto): string => {
  const sheetId = safeText(item?.HojaGastosId);
  const description = safeText(item?.Description);

  if (sheetId && description) {
    return `${sheetId} | ${description}`;
  }

  return description || sheetId || "-";
};

const buildExpenseSheetTotalsRows = (items: ExpenseSheetListItemDto[]): ExpenseSheetTotalsRow[] => {
  return items
    .map((item) => {
      const value = toFiniteNumber(item?.TotalAmount);
      if (value === null) {
        return null;
      }

      const sheetId = safeText(item?.HojaGastosId);
      const description = safeText(item?.Description);
      const currencyCode = safeText(item?.CurrencyCode).toUpperCase();

      return {
        label: buildExpenseSheetLabel(item),
        sheetId: sheetId || "-",
        description: description || null,
        currencyCode: currencyCode || null,
        value: Number(value.toFixed(2)),
      };
    })
    .filter((row): row is ExpenseSheetTotalsRow => !!row)
    .sort((left, right) => right.value - left.value || left.sheetId.localeCompare(right.sheetId));
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

const buildExpenseSheetTotalsTableMessage = (
  rows: ExpenseSheetTotalsRow[],
  copy: ExpenseSheetTotalsCopy
): ChatMessage | null => {
  const columns: TableColumn[] = [
    {
      key: "sheetId",
      header: copy.sheetHeader,
      align: "left",
    },
    {
      key: "description",
      header: copy.descriptionHeader,
      align: "left",
    },
    {
      key: "currencyCode",
      header: copy.currencyHeader,
      align: "center",
    },
    {
      key: "value",
      header: copy.totalHeader,
      align: "right",
    },
  ];

  const tableRows: TableRow[] = rows.map((row) => ({
    sheetId: row.sheetId,
    description: row.description,
    currencyCode: row.currencyCode,
    value: row.value,
  }));

  const renderableMessage = resolveRenderableChatMessage({
    type: "table",
    payload: {
      title: copy.title,
      subtitle: copy.subtitle,
      columns,
      rows: tableRows,
    },
  });

  return renderableMessage.type === "table" ? renderableMessage : null;
};

const buildExpenseSheetTotalsChartMessage = (
  requestedVisualizationType: Exclude<VisualizationType, "table">,
  rows: ExpenseSheetTotalsRow[],
  copy: ExpenseSheetTotalsCopy
): ChatMessage | null => {
  const chartRows: ChartDatum[] = rows.map((row) => ({
    label: row.label,
    value: row.value,
  }));

  const payload: ChartPayload =
    requestedVisualizationType === "pie"
      ? {
          chartType: "pie",
          title: copy.title,
          subtitle: copy.subtitle,
          data: chartRows,
          nameKey: "label",
          dataKey: "value",
        }
      : {
          chartType: requestedVisualizationType,
          title: copy.title,
          subtitle: copy.subtitle,
          data: chartRows,
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

const buildCurrencyVisualizationFallbackMessages = (
  requestedVisualizationType: VisualizationType,
  rows: ChartDatum[],
  copy: CurrencyTotalsCopy
): ChatMessage[] | null => {
  const visualMessage =
    requestedVisualizationType === "table"
      ? buildCurrencyTotalsTableMessage(rows, copy)
      : buildCurrencyTotalsChartMessage(requestedVisualizationType, rows, copy);

  if (!visualMessage) {
    return null;
  }

  return [createMarkdownMessage(requestedVisualizationType === "table" ? copy.introTable : copy.introChart), visualMessage];
};

const buildExpenseSheetVisualizationFallbackMessages = (
  requestedVisualizationType: VisualizationType,
  rows: ExpenseSheetTotalsRow[],
  copy: ExpenseSheetTotalsCopy
): ChatMessage[] | null => {
  const visualMessage =
    requestedVisualizationType === "table"
      ? buildExpenseSheetTotalsTableMessage(rows, copy)
      : buildExpenseSheetTotalsChartMessage(requestedVisualizationType, rows, copy);

  if (!visualMessage) {
    return null;
  }

  return [createMarkdownMessage(requestedVisualizationType === "table" ? copy.introTable : copy.introChart), visualMessage];
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

  const locale = resolveAssistantLocale(uiLanguage);

  if (wantsTotalsByCurrency(question)) {
    const currencyRows = buildCurrencyTotalsRows(sourceJson.Items);
    if (currencyRows.length === 0) {
      return null;
    }

    return buildCurrencyVisualizationFallbackMessages(requestedVisualizationType, currencyRows, CURRENCY_TOTALS_COPY[locale]);
  }

  if (wantsTotalsByExpenseSheet(question)) {
    const expenseSheetRows = buildExpenseSheetTotalsRows(sourceJson.Items);
    if (expenseSheetRows.length === 0) {
      return null;
    }

    return buildExpenseSheetVisualizationFallbackMessages(
      requestedVisualizationType,
      expenseSheetRows,
      EXPENSE_SHEET_TOTALS_COPY[locale]
    );
  }

  return null;
};

export const shouldUseExpenseSheetsVisualizationFallback = (
  messages: ChatMessage[],
  requestedVisualizationType: VisualizationType | null | undefined
): boolean => {
  return !!requestedVisualizationType && !hasRequestedVisualizationMessage(messages, requestedVisualizationType);
};
