import type { ChatMessage, ChartDatum, ChartPayload, TableColumn, TableRow, VisualizationType } from "../../../components/commons/chat/chatMessageContract.ts";
import { createMarkdownMessage } from "../../../components/commons/chat/chatMessageFactories.ts";
import { resolveRenderableChatMessage } from "../../../components/commons/chat/chatMessageValidation.ts";
import { getExpenseStatusLabel } from "../constants/expenseStatusCatalog.ts";
import { formatAmountWithCurrency } from "../expenseFormatters.ts";
import type { ExpenseSheetListItemDto, ExpenseSheetListResponseEnvelope } from "../expenseTypes.ts";
import { safeText } from "../utils/expenseUiUtils.ts";

type ExpenseSheetsVisualizationFallbackArgs = {
  question: string;
  requestedVisualizationType: VisualizationType | null | undefined;
  sourceJson: ExpenseSheetListResponseEnvelope | null | undefined;
  uiLanguage?: string | null;
  parsedMessages?: ChatMessage[] | null;
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

type StatusDistributionCopy = {
  introChart: string;
  introTable: string;
  title: string;
  subtitle: string;
  statusHeader: string;
  countHeader: string;
};

type ExpenseSheetTotalsRow = {
  label: string;
  sheetId: string;
  description: string | null;
  currencyCode: string | null;
  value: number;
};

type ExpenseSheetChartCurrencyPlan = {
  rows: ExpenseSheetTotalsRow[];
  introText: string;
  subtitleSuffix: string;
  recommendationMarkdown: string | null;
};

type VisualizationProposal = {
  title: string;
  insight: string;
  examplePrompt: string;
};

const MAX_EXPENSE_SHEET_CHART_ROWS = 6;
const DOMINANT_CURRENCY_RATIO_THRESHOLD = 0.7;

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

const STATUS_DISTRIBUTION_COPY: Record<AssistantLocale, StatusDistributionCopy> = {
  es: {
    introChart: "Aqui tienes el grafico con el numero de hojas por estado.",
    introTable: "Aqui tienes la tabla con el numero de hojas por estado.",
    title: "Distribucion por estado",
    subtitle: "Numero de hojas de gasto agrupadas por estado.",
    statusHeader: "Estado",
    countHeader: "Hojas",
  },
  en: {
    introChart: "Here is the chart with the number of sheets by status.",
    introTable: "Here is the table with the number of sheets by status.",
    title: "Distribution by status",
    subtitle: "Number of expense sheets grouped by status.",
    statusHeader: "Status",
    countHeader: "Sheets",
  },
  eu: {
    introChart: "Hemen duzu egoeraren arabera orri kopurua duen grafikoa.",
    introTable: "Hemen duzu egoeraren arabera orri kopurua duen taula.",
    title: "Egoeraren araberako banaketa",
    subtitle: "Gastu-orri kopurua egoeraren arabera multzokatuta.",
    statusHeader: "Egoera",
    countHeader: "Orriak",
  },
  pt: {
    introChart: "Aqui tens o grafico com o numero de folhas por estado.",
    introTable: "Aqui tens a tabela com o numero de folhas por estado.",
    title: "Distribuicao por estado",
    subtitle: "Numero de folhas de despesas agrupadas por estado.",
    statusHeader: "Estado",
    countHeader: "Folhas",
  },
  it: {
    introChart: "Ecco il grafico con il numero di note per stato.",
    introTable: "Ecco la tabella con il numero di note per stato.",
    title: "Distribuzione per stato",
    subtitle: "Numero di note spese raggruppate per stato.",
    statusHeader: "Stato",
    countHeader: "Note",
  },
  zhHans: {
    introChart: "Here is the chart with the number of sheets by status.",
    introTable: "Here is the table with the number of sheets by status.",
    title: "Distribution by status",
    subtitle: "Number of expense sheets grouped by status.",
    statusHeader: "Status",
    countHeader: "Sheets",
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

const STATUS_KEYWORDS = [
  "estado",
  "estados",
  "status",
  "statuses",
  "state",
  "states",
  "situacion",
  "situaciones",
  "situacao",
  "situacoes",
  "stato",
  "stati",
  "状态",
];

const USER_KEYWORDS = [
  "usuario",
  "usuarios",
  "user",
  "users",
  "empleado",
  "empleados",
  "persona",
  "personas",
  "utilizador",
  "utilizadores",
  "utente",
  "utenti",
  "用户",
];

const PROJECT_KEYWORDS = [
  "proyecto",
  "proyectos",
  "project",
  "projects",
  "projid",
  "projeto",
  "projetos",
  "progetto",
  "progetti",
  "项目",
];

const DATE_KEYWORDS = [
  "fecha",
  "fechas",
  "date",
  "dates",
  "dia",
  "dias",
  "day",
  "days",
  "periodo",
  "periodos",
  "period",
  "periods",
  "created",
  "creacion",
  "creadas",
  "datas",
  "giorno",
  "giorni",
  "日期",
];

const EXPENSE_SHEET_BREAKDOWN_KEYWORDS = [
  "todas",
  "todos",
  "cada",
  "detalle",
  "detallado",
  "detallada",
  "completo",
  "completa",
  "all",
  "every",
  "each",
  "detail",
  "detailed",
  "full",
  "entire",
  "todas as",
  "todos os",
  "cada uma",
  "dettaglio",
  "dettagliato",
  "tutte",
  "ogni",
  "全部",
  "所有",
  "每张",
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

const wantsExpenseSheetBreakdown = (question: string): boolean => {
  if (wantsTotalsByExpenseSheet(question)) {
    return true;
  }

  const normalizedQuestion = toIntentText(question);
  if (!normalizedQuestion || wantsTotalsByCurrency(normalizedQuestion)) {
    return false;
  }

  return (
    containsAnyKeyword(normalizedQuestion, EXPENSE_SHEET_KEYWORDS) &&
    (containsAnyKeyword(normalizedQuestion, TOTAL_KEYWORDS) ||
      containsAnyKeyword(normalizedQuestion, EXPENSE_SHEET_BREAKDOWN_KEYWORDS))
  );
};

const wantsStatusDistribution = (question: string): boolean => {
  const normalizedQuestion = toIntentText(question);
  if (!normalizedQuestion) {
    return false;
  }

  return containsAnyKeyword(normalizedQuestion, STATUS_KEYWORDS);
};

const shouldOfferExpenseSheetsVisualizationProposalsForQuestion = (question: string): boolean => {
  const normalizedQuestion = toIntentText(question);
  if (!normalizedQuestion) {
    return false;
  }

  return !(
    wantsTotalsByCurrency(question) ||
    wantsExpenseSheetBreakdown(question) ||
    wantsStatusDistribution(question) ||
    containsAnyKeyword(normalizedQuestion, USER_KEYWORDS) ||
    containsAnyKeyword(normalizedQuestion, PROJECT_KEYWORDS) ||
    containsAnyKeyword(normalizedQuestion, DATE_KEYWORDS)
  );
};

const buildGroupedCountRows = (
  items: ExpenseSheetListItemDto[],
  resolveLabel: (item: ExpenseSheetListItemDto) => string
): ChartDatum[] => {
  const countsByLabel = new Map<string, number>();

  items.forEach((item) => {
    const label = toSafeText(resolveLabel(item));
    if (!label) {
      return;
    }

    countsByLabel.set(label, (countsByLabel.get(label) ?? 0) + 1);
  });

  return Array.from(countsByLabel.entries())
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .map(([label, value]) => ({ label, value }));
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

const buildStatusCountRows = (items: ExpenseSheetListItemDto[]): ChartDatum[] => {
  return buildGroupedCountRows(items, (item) => getExpenseStatusLabel(item?.ExpenseSheetStatus));
};

const buildUserCountRows = (items: ExpenseSheetListItemDto[]): ChartDatum[] => {
  return buildGroupedCountRows(items, (item) => safeText(item?.UserName) || safeText(item?.UserId));
};

const buildProjectCountRows = (items: ExpenseSheetListItemDto[]): ChartDatum[] => {
  return buildGroupedCountRows(items, (item) => safeText(item?.ProjId));
};

const buildCreatedDateCountRows = (items: ExpenseSheetListItemDto[]): ChartDatum[] => {
  return buildGroupedCountRows(items, (item) => safeText(item?.CreatedDate));
};

const buildExpenseSheetChartLabel = (sheetId: string, currencyCode: string): string => {
  if (sheetId && currencyCode) {
    return `${sheetId} (${currencyCode})`;
  }

  return sheetId || currencyCode || "-";
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
        label: buildExpenseSheetChartLabel(sheetId, currencyCode),
        sheetId: sheetId || "-",
        description: description || null,
        currencyCode: currencyCode || null,
        value: Number(value.toFixed(2)),
      };
    })
    .filter((row): row is ExpenseSheetTotalsRow => !!row)
    .sort((left, right) => right.value - left.value || left.sheetId.localeCompare(right.sheetId));
};

const buildExpenseSheetCurrencyGroups = (
  rows: ExpenseSheetTotalsRow[]
): Array<{ currencyCode: string; rows: ExpenseSheetTotalsRow[] }> => {
  const groups = new Map<string, ExpenseSheetTotalsRow[]>();

  rows.forEach((row) => {
    const currencyCode = row.currencyCode || "-";
    const existingRows = groups.get(currencyCode) ?? [];
    existingRows.push(row);
    groups.set(currencyCode, existingRows);
  });

  return Array.from(groups.entries())
    .map(([currencyCode, groupedRows]) => ({
      currencyCode,
      rows: groupedRows,
    }))
    .sort((left, right) => right.rows.length - left.rows.length || left.currencyCode.localeCompare(right.currencyCode));
};

const buildExpenseSheetChartIntro = (
  locale: AssistantLocale,
  currencyCode: string,
  omittedCount: number
): string => {
  switch (locale) {
    case "en":
      return omittedCount > 0
        ? `Here is the chart with the top expense sheets in ${currencyCode}. I skipped ${omittedCount} sheets in other currencies to avoid mixing scales.`
        : `Here is the chart with the top expense sheets in ${currencyCode}.`;
    case "eu":
      return omittedCount > 0
        ? `Hemen duzu ${currencyCode} monetako gastu-orrien grafikoa. Beste monetetako ${omittedCount} orri kanpo utzi ditut eskalak ez nahasteko.`
        : `Hemen duzu ${currencyCode} monetako gastu-orrien grafikoa.`;
    case "pt":
      return omittedCount > 0
        ? `Aqui tens o grafico com as folhas de despesas em ${currencyCode}. Omiti ${omittedCount} folhas noutras moedas para nao misturar escalas.`
        : `Aqui tens o grafico com as folhas de despesas em ${currencyCode}.`;
    case "it":
      return omittedCount > 0
        ? `Ecco il grafico con le note spese in ${currencyCode}. Ho escluso ${omittedCount} note in altre valute per non mescolare le scale.`
        : `Ecco il grafico con le note spese in ${currencyCode}.`;
    case "zhHans":
      return omittedCount > 0
        ? `Here is the chart with the expense sheets in ${currencyCode}. I skipped ${omittedCount} sheets in other currencies to avoid mixing scales.`
        : `Here is the chart with the expense sheets in ${currencyCode}.`;
    case "es":
    default:
      return omittedCount > 0
        ? `Aqui tienes el grafico con las hojas de gasto en ${currencyCode}. Omiti ${omittedCount} hojas en otras monedas para no mezclar escalas.`
        : `Aqui tienes el grafico con las hojas de gasto en ${currencyCode}.`;
  }
};

const buildExpenseSheetChartSubtitleSuffix = (
  locale: AssistantLocale,
  displayedCount: number,
  comparableCount: number,
  totalCount: number,
  currencyCode: string,
  omittedCount: number
): string => {
  switch (locale) {
    case "en":
      return omittedCount > 0
        ? `Top ${displayedCount} of ${comparableCount} sheets by amount in ${currencyCode}. ${omittedCount} sheets in other currencies were skipped.`
        : `Top ${displayedCount} of ${Math.max(comparableCount, totalCount)} sheets by amount in ${currencyCode}.`;
    case "eu":
      return omittedCount > 0
        ? `${currencyCode} monetan zenbateko handiena duten ${displayedCount}/${comparableCount} orriak. Beste monetetako ${omittedCount} orri kanpo utzi dira.`
        : `${currencyCode} monetan zenbateko handiena duten ${displayedCount}/${Math.max(comparableCount, totalCount)} orriak.`;
    case "pt":
      return omittedCount > 0
        ? `Top ${displayedCount} de ${comparableCount} folhas por montante em ${currencyCode}. ${omittedCount} folhas noutras moedas foram omitidas.`
        : `Top ${displayedCount} de ${Math.max(comparableCount, totalCount)} folhas por montante em ${currencyCode}.`;
    case "it":
      return omittedCount > 0
        ? `Top ${displayedCount} di ${comparableCount} note per importo in ${currencyCode}. ${omittedCount} note in altre valute sono state escluse.`
        : `Top ${displayedCount} di ${Math.max(comparableCount, totalCount)} note per importo in ${currencyCode}.`;
    case "zhHans":
      return omittedCount > 0
        ? `Top ${displayedCount} of ${comparableCount} sheets by amount in ${currencyCode}. ${omittedCount} sheets in other currencies were skipped.`
        : `Top ${displayedCount} of ${Math.max(comparableCount, totalCount)} sheets by amount in ${currencyCode}.`;
    case "es":
    default:
      return omittedCount > 0
        ? `Top ${displayedCount} de ${comparableCount} hojas por importe en ${currencyCode}. Se omitieron ${omittedCount} hojas en otras monedas.`
        : `Top ${displayedCount} de ${Math.max(comparableCount, totalCount)} hojas por importe en ${currencyCode}.`;
  }
};

const buildMixedCurrencyProposalMarkdown = (
  locale: AssistantLocale,
  groups: Array<{ currencyCode: string; rows: ExpenseSheetTotalsRow[] }>
): string => {
  const currenciesSummary = groups.map((group) => `${group.currencyCode} (${group.rows.length})`).join(", ");
  const dominantCurrency = groups[0]?.currencyCode || "-";

  switch (locale) {
    case "en":
      return [
        "I did not force a single chart by expense sheet because the list mixes amounts from different currencies.",
        `Detected currencies: ${currenciesSummary}.`,
        "",
        "Safer options:",
        "- Ask for a chart by currency with totals and sheet counts.",
        `- Ask for a chart with the highest-amount sheets in ${dominantCurrency}.`,
        "- Ask for a full table with sheet, description, currency, and amount.",
      ].join("\n");
    case "eu":
      return [
        "Ez dut gastu-orri bakoitzeko grafiko bakarra sortu, zerrendak moneta desberdinetako zenbatekoak nahasten dituelako.",
        `Atzemandako monetak: ${currenciesSummary}.`,
        "",
        "Aukera fidagarriagoak:",
        "- Eskatu moneta bakoitzeko grafiko bat guztizkoekin eta orri kopuruarekin.",
        `- Eskatu ${dominantCurrency} monetako zenbateko handieneko orrien grafikoa.`,
        "- Eskatu taula osoa: orria, deskribapena, moneta eta zenbatekoa.",
      ].join("\n");
    case "pt":
      return [
        "Nao forcei um unico grafico por folha porque a lista mistura montantes de moedas diferentes.",
        `Moedas detetadas: ${currenciesSummary}.`,
        "",
        "Opcoes mais fiaveis:",
        "- Pede um grafico por moeda com totais e numero de folhas.",
        `- Pede um grafico com as folhas de maior montante em ${dominantCurrency}.`,
        "- Pede uma tabela completa com folha, descricao, moeda e montante.",
      ].join("\n");
    case "it":
      return [
        "Non forzo un unico grafico per nota spese perche la lista mescola importi di valute diverse.",
        `Valute rilevate: ${currenciesSummary}.`,
        "",
        "Opzioni piu affidabili:",
        "- Chiedi un grafico per valuta con totali e numero di note.",
        `- Chiedi un grafico con le note di importo piu alto in ${dominantCurrency}.`,
        "- Chiedi una tabella completa con nota, descrizione, valuta e importo.",
      ].join("\n");
    case "zhHans":
      return [
        "I did not force a single chart by expense sheet because the list mixes amounts from different currencies.",
        `Detected currencies: ${currenciesSummary}.`,
        "",
        "Safer options:",
        "- Ask for a chart by currency with totals and sheet counts.",
        `- Ask for a chart with the highest-amount sheets in ${dominantCurrency}.`,
        "- Ask for a full table with sheet, description, currency, and amount.",
      ].join("\n");
    case "es":
    default:
      return [
        "No genero un unico grafico por hoja porque la lista mezcla importes de varias monedas en una sola escala.",
        `Monedas detectadas: ${currenciesSummary}.`,
        "",
        "Opciones mas fiables:",
        "- Pide un grafico por moneda con totales y numero de hojas.",
        `- Pide un grafico con las hojas de ${dominantCurrency} de mayor importe.`,
        "- Pide una tabla completa con hoja, descripcion, moneda e importe.",
      ].join("\n");
  }
};

const resolveExpenseSheetChartCurrencyPlan = (
  rows: ExpenseSheetTotalsRow[],
  locale: AssistantLocale
): ExpenseSheetChartCurrencyPlan => {
  const currencyGroups = buildExpenseSheetCurrencyGroups(rows);
  if (currencyGroups.length <= 1) {
    const comparableRows = rows.slice(0, MAX_EXPENSE_SHEET_CHART_ROWS);
    const comparableCurrency = currencyGroups[0]?.currencyCode || rows[0]?.currencyCode || "-";
    return {
      rows: comparableRows,
      introText: buildExpenseSheetChartIntro(locale, comparableCurrency, 0),
      subtitleSuffix: buildExpenseSheetChartSubtitleSuffix(
        locale,
        comparableRows.length,
        rows.length,
        rows.length,
        comparableCurrency,
        0
      ),
      recommendationMarkdown: null,
    };
  }

  const dominantGroup = currencyGroups[0];
  const dominantRatio = dominantGroup.rows.length / rows.length;
  if (dominantRatio >= DOMINANT_CURRENCY_RATIO_THRESHOLD) {
    const comparableRows = dominantGroup.rows.slice(0, MAX_EXPENSE_SHEET_CHART_ROWS);
    const omittedCount = rows.length - dominantGroup.rows.length;
    return {
      rows: comparableRows,
      introText: buildExpenseSheetChartIntro(locale, dominantGroup.currencyCode, omittedCount),
      subtitleSuffix: buildExpenseSheetChartSubtitleSuffix(
        locale,
        comparableRows.length,
        dominantGroup.rows.length,
        rows.length,
        dominantGroup.currencyCode,
        omittedCount
      ),
      recommendationMarkdown: null,
    };
  }

  return {
    rows: [],
    introText: "",
    subtitleSuffix: "",
    recommendationMarkdown: buildMixedCurrencyProposalMarkdown(locale, currencyGroups),
  };
};

const buildCurrencyTotalsTableMessage = (rows: ChartDatum[], copy: CurrencyTotalsCopy): ChatMessage | null => {
  const tableRows: TableRow[] = rows.map((row) => {
    const currencyCode = safeText(row.label).toUpperCase();
    return {
      label: currencyCode || "-",
      value: formatAmountWithCurrency(toFiniteNumber(row.value), currencyCode),
    };
  });
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
      rows: tableRows,
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
    value: formatAmountWithCurrency(row.value, row.currencyCode || ""),
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
  copy: ExpenseSheetTotalsCopy,
  subtitleOverride?: string
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
          subtitle: subtitleOverride || copy.subtitle,
          data: chartRows,
          nameKey: "label",
          dataKey: "value",
        }
      : {
          chartType: requestedVisualizationType,
          title: copy.title,
          subtitle: subtitleOverride || copy.subtitle,
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

const buildStatusDistributionTableMessage = (
  rows: ChartDatum[],
  copy: StatusDistributionCopy
): ChatMessage | null => {
  const columns: TableColumn[] = [
    {
      key: "label",
      header: copy.statusHeader,
      align: "left",
    },
    {
      key: "value",
      header: copy.countHeader,
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

const buildStatusDistributionChartMessage = (
  requestedVisualizationType: Exclude<VisualizationType, "table">,
  rows: ChartDatum[],
  copy: StatusDistributionCopy
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

const buildStatusVisualizationFallbackMessages = (
  requestedVisualizationType: VisualizationType,
  rows: ChartDatum[],
  copy: StatusDistributionCopy
): ChatMessage[] | null => {
  const visualMessage =
    requestedVisualizationType === "table"
      ? buildStatusDistributionTableMessage(rows, copy)
      : buildStatusDistributionChartMessage(requestedVisualizationType, rows, copy);

  if (!visualMessage) {
    return null;
  }

  return [createMarkdownMessage(requestedVisualizationType === "table" ? copy.introTable : copy.introChart), visualMessage];
};

const buildVisualizationProposalIntro = (
  locale: AssistantLocale,
  requestedVisualizationType: VisualizationType | null | undefined
): string => {
  switch (locale) {
    case "en":
      return requestedVisualizationType
        ? "To keep that visualization useful with the loaded data, I suggest one of these approaches:"
        : "With the loaded data, these are the most useful chart options I can prepare:";
    case "eu":
      return requestedVisualizationType
        ? "Bistaratzea kargatutako datuekin erabilgarria izan dadin, aukera hauetako bat gomendatzen dizut:"
        : "Kargatutako datuekin, hauek dira presta ditzakedan bistaratze erabilgarrienak:";
    case "pt":
      return requestedVisualizationType
        ? "Para que essa visualizacao seja util com os dados carregados, sugiro uma destas abordagens:"
        : "Com os dados carregados, estas sao as visualizacoes mais uteis que posso preparar:";
    case "it":
      return requestedVisualizationType
        ? "Per rendere utile questa visualizzazione con i dati caricati, ti suggerisco uno di questi approcci:"
        : "Con i dati caricati, queste sono le visualizzazioni piu utili che posso preparare:";
    case "zhHans":
      return requestedVisualizationType
        ? "To keep that visualization useful with the loaded data, I suggest one of these approaches:"
        : "With the loaded data, these are the most useful chart options I can prepare:";
    case "es":
    default:
      return requestedVisualizationType
        ? "Para que ese grafico sea util con los datos cargados, te propongo uno de estos enfoques:"
        : "Con los datos cargados, estas son las visualizaciones mas utiles que puedo prepararte:";
  }
};

const buildVisualizationProposalFooter = (locale: AssistantLocale): string => {
  switch (locale) {
    case "en":
      return 'If you prefer, I can also return a detailed table instead of a chart.';
    case "eu":
      return "Nahi baduzu, grafikoaren ordez xehetasunezko taula ere eman dezaket.";
    case "pt":
      return "Se preferires, tambem posso devolver uma tabela detalhada em vez de um grafico.";
    case "it":
      return "Se preferisci, posso anche restituire una tabella dettagliata invece di un grafico.";
    case "zhHans":
      return "If you prefer, I can also return a detailed table instead of a chart.";
    case "es":
    default:
      return "Si prefieres, tambien puedo devolverte una tabla detallada en lugar de un grafico.";
  }
};

const buildVisualizationProposalLine = (locale: AssistantLocale, proposal: VisualizationProposal): string => {
  const exampleLabel =
    locale === "en" || locale === "zhHans"
      ? "Example"
      : locale === "eu"
        ? "Adibidea"
        : locale === "pt"
          ? "Exemplo"
          : locale === "it"
            ? "Esempio"
            : "Ejemplo";

  return `- **${proposal.title}**: ${proposal.insight}. ${exampleLabel}: "${proposal.examplePrompt}".`;
};

const buildExpenseSheetAmountProposal = (
  locale: AssistantLocale,
  rows: ExpenseSheetTotalsRow[]
): VisualizationProposal | null => {
  const chartPlan = resolveExpenseSheetChartCurrencyPlan(rows, locale);
  if (chartPlan.recommendationMarkdown || chartPlan.rows.length === 0) {
    return null;
  }

  const currencyCode = chartPlan.rows[0]?.currencyCode || "-";
  switch (locale) {
    case "en":
      return {
        title: "Top sheets by amount",
        insight: `compare the ${chartPlan.rows.length} highest-amount sheets in ${currencyCode} without mixing currencies`,
        examplePrompt: `Build a bar chart with the top expense sheets by amount in ${currencyCode}`,
      };
    case "eu":
      return {
        title: "Zenbateko handieneko orriak",
        insight: `${currencyCode} monetako zenbateko handieneko ${chartPlan.rows.length} orriak alderatzeko`,
        examplePrompt: `Sortu barra grafiko bat ${currencyCode} monetako zenbateko handieneko gastu-orriekin`,
      };
    case "pt":
      return {
        title: "Folhas com maior montante",
        insight: `comparar as ${chartPlan.rows.length} folhas de maior montante em ${currencyCode} sem misturar moedas`,
        examplePrompt: `Cria um grafico de barras com as folhas de despesas de maior montante em ${currencyCode}`,
      };
    case "it":
      return {
        title: "Note con importo piu alto",
        insight: `confrontare le ${chartPlan.rows.length} note di importo piu alto in ${currencyCode} senza mescolare valute`,
        examplePrompt: `Crea un grafico a barre con le note spese di importo piu alto in ${currencyCode}`,
      };
    case "zhHans":
      return {
        title: "Top sheets by amount",
        insight: `compare the ${chartPlan.rows.length} highest-amount sheets in ${currencyCode} without mixing currencies`,
        examplePrompt: `Build a bar chart with the top expense sheets by amount in ${currencyCode}`,
      };
    case "es":
    default:
      return {
        title: "Top por hoja",
        insight: `comparar las ${chartPlan.rows.length} hojas de mayor importe en ${currencyCode} sin mezclar monedas`,
        examplePrompt: `Haz un grafico de barras con las hojas de gasto de mayor importe en ${currencyCode}`,
      };
  }
};

const buildStatusProposal = (locale: AssistantLocale, statusRows: ChartDatum[]): VisualizationProposal | null => {
  if (statusRows.length <= 1) {
    return null;
  }

  switch (locale) {
    case "en":
      return {
        title: "By status",
        insight: `${statusRows.length} statuses detected to compare sheet counts without mixing amounts`,
        examplePrompt: "Build a bar chart by status with number of sheets",
      };
    case "eu":
      return {
        title: "Egoeraren arabera",
        insight: `${statusRows.length} egoera atzeman dira orri kopurua alderatzeko zenbatekoak nahastu gabe`,
        examplePrompt: "Sortu barra grafiko bat egoeraren arabera orri kopuruarekin",
      };
    case "pt":
      return {
        title: "Por estado",
        insight: `${statusRows.length} estados detetados para comparar numero de folhas sem misturar montantes`,
        examplePrompt: "Cria um grafico de barras por estado com numero de folhas",
      };
    case "it":
      return {
        title: "Per stato",
        insight: `${statusRows.length} stati rilevati per confrontare il numero di note senza mescolare importi`,
        examplePrompt: "Crea un grafico a barre per stato con numero di note",
      };
    case "zhHans":
      return {
        title: "By status",
        insight: `${statusRows.length} statuses detected to compare sheet counts without mixing amounts`,
        examplePrompt: "Build a bar chart by status with number of sheets",
      };
    case "es":
    default:
      return {
        title: "Por estado",
        insight: `${statusRows.length} estados detectados para comparar numero de hojas sin mezclar importes`,
        examplePrompt: "Haz un grafico de barras por estado con numero de hojas",
      };
  }
};

const buildCurrencyProposal = (locale: AssistantLocale, currencyRows: ChartDatum[]): VisualizationProposal | null => {
  if (currencyRows.length <= 1) {
    return null;
  }

  switch (locale) {
    case "en":
      return {
        title: "By currency",
        insight: `${currencyRows.length} currencies detected to compare totals on a safe scale`,
        examplePrompt: "Build a pie chart by currency with total amount",
      };
    case "eu":
      return {
        title: "Monetaren arabera",
        insight: `${currencyRows.length} moneta atzeman dira guztizkoak eskala seguruan alderatzeko`,
        examplePrompt: "Sortu sektore grafiko bat monetaren arabera guztizko zenbatekoarekin",
      };
    case "pt":
      return {
        title: "Por moeda",
        insight: `${currencyRows.length} moedas detetadas para comparar totais numa escala segura`,
        examplePrompt: "Cria um grafico de pizza por moeda com montante total",
      };
    case "it":
      return {
        title: "Per valuta",
        insight: `${currencyRows.length} valute rilevate per confrontare i totali su una scala sicura`,
        examplePrompt: "Crea un grafico a torta per valuta con importo totale",
      };
    case "zhHans":
      return {
        title: "By currency",
        insight: `${currencyRows.length} currencies detected to compare totals on a safe scale`,
        examplePrompt: "Build a pie chart by currency with total amount",
      };
    case "es":
    default:
      return {
        title: "Por moneda",
        insight: `${currencyRows.length} monedas detectadas para comparar totales en una escala segura`,
        examplePrompt: "Haz un grafico pie por moneda con importe total",
      };
  }
};

const buildUserProposal = (locale: AssistantLocale, userRows: ChartDatum[]): VisualizationProposal | null => {
  if (userRows.length <= 1) {
    return null;
  }

  switch (locale) {
    case "en":
      return {
        title: "By user",
        insight: `${userRows.length} users with loaded sheets to compare concentration by count`,
        examplePrompt: "Build a bar chart by user with number of sheets",
      };
    case "eu":
      return {
        title: "Erabiltzailearen arabera",
        insight: `${userRows.length} erabiltzaile daude kargatutako orriekin kopuruaren araberako kontzentrazioa ikusteko`,
        examplePrompt: "Sortu barra grafiko bat erabiltzailearen arabera orri kopuruarekin",
      };
    case "pt":
      return {
        title: "Por utilizador",
        insight: `${userRows.length} utilizadores com folhas carregadas para comparar concentracao por numero de folhas`,
        examplePrompt: "Cria um grafico de barras por utilizador com numero de folhas",
      };
    case "it":
      return {
        title: "Per utente",
        insight: `${userRows.length} utenti con note caricate per confrontare la concentrazione per numero di note`,
        examplePrompt: "Crea un grafico a barre per utente con numero di note",
      };
    case "zhHans":
      return {
        title: "By user",
        insight: `${userRows.length} users with loaded sheets to compare concentration by count`,
        examplePrompt: "Build a bar chart by user with number of sheets",
      };
    case "es":
    default:
      return {
        title: "Por usuario",
        insight: `${userRows.length} usuarios con hojas cargadas para comparar concentracion por numero de hojas`,
        examplePrompt: "Haz un grafico de barras por usuario con numero de hojas",
      };
  }
};

const buildProjectProposal = (locale: AssistantLocale, projectRows: ChartDatum[]): VisualizationProposal | null => {
  if (projectRows.length <= 1) {
    return null;
  }

  switch (locale) {
    case "en":
      return {
        title: "By project",
        insight: `${projectRows.length} projects detected to compare workload by number of sheets`,
        examplePrompt: "Build a bar chart by project with number of sheets",
      };
    case "eu":
      return {
        title: "Proiektuaren arabera",
        insight: `${projectRows.length} proiektu atzeman dira lan bolumena orri kopuruarekin alderatzeko`,
        examplePrompt: "Sortu barra grafiko bat proiektuaren arabera orri kopuruarekin",
      };
    case "pt":
      return {
        title: "Por projeto",
        insight: `${projectRows.length} projetos detetados para comparar volume pelo numero de folhas`,
        examplePrompt: "Cria um grafico de barras por projeto com numero de folhas",
      };
    case "it":
      return {
        title: "Per progetto",
        insight: `${projectRows.length} progetti rilevati per confrontare il volume per numero di note`,
        examplePrompt: "Crea un grafico a barre per progetto con numero di note",
      };
    case "zhHans":
      return {
        title: "By project",
        insight: `${projectRows.length} projects detected to compare workload by number of sheets`,
        examplePrompt: "Build a bar chart by project with number of sheets",
      };
    case "es":
    default:
      return {
        title: "Por proyecto",
        insight: `${projectRows.length} proyectos detectados para comparar volumen por numero de hojas`,
        examplePrompt: "Haz un grafico de barras por proyecto con numero de hojas",
      };
  }
};

const buildCreatedDateProposal = (locale: AssistantLocale, dateRows: ChartDatum[]): VisualizationProposal | null => {
  if (dateRows.length <= 1) {
    return null;
  }

  switch (locale) {
    case "en":
      return {
        title: "By created date",
        insight: `${dateRows.length} dates with activity to see the trend of loaded sheets`,
        examplePrompt: "Build a line chart by created date with number of sheets",
      };
    case "eu":
      return {
        title: "Sorrera dataren arabera",
        insight: `${dateRows.length} jarduera-data daude kargatutako orrien joera ikusteko`,
        examplePrompt: "Sortu lerro grafiko bat sorrera dataren arabera orri kopuruarekin",
      };
    case "pt":
      return {
        title: "Por data de criacao",
        insight: `${dateRows.length} datas com atividade para ver a evolucao das folhas carregadas`,
        examplePrompt: "Cria um grafico de linhas por data de criacao com numero de folhas",
      };
    case "it":
      return {
        title: "Per data di creazione",
        insight: `${dateRows.length} date con attivita per vedere l'andamento delle note caricate`,
        examplePrompt: "Crea un grafico a linee per data di creazione con numero di note",
      };
    case "zhHans":
      return {
        title: "By created date",
        insight: `${dateRows.length} dates with activity to see the trend of loaded sheets`,
        examplePrompt: "Build a line chart by created date with number of sheets",
      };
    case "es":
    default:
      return {
        title: "Por fecha de creacion",
        insight: `${dateRows.length} fechas con actividad para ver la evolucion de las hojas cargadas`,
        examplePrompt: "Haz un grafico de lineas por fecha de creacion con numero de hojas",
      };
  }
};

const buildSingleSheetProposalMarkdown = (locale: AssistantLocale): string => {
  switch (locale) {
    case "en":
      return [
        "There is only one loaded expense sheet right now.",
        "",
        "- Ask for a detailed table by sheet.",
        "- Ask for a business summary with key observations.",
      ].join("\n");
    case "eu":
      return [
        "Une honetan gastu-orri bakarra dago kargatuta.",
        "",
        "- Eskatu orriaren araberako taula zehatza.",
        "- Eskatu negozio laburpena behaketa nagusiekin.",
      ].join("\n");
    case "pt":
      return [
        "Neste momento ha apenas uma folha de despesas carregada.",
        "",
        "- Pede uma tabela detalhada por folha.",
        "- Pede um resumo de negocio com observacoes principais.",
      ].join("\n");
    case "it":
      return [
        "In questo momento c'e una sola nota spese caricata.",
        "",
        "- Chiedi una tabella dettagliata per nota.",
        "- Chiedi un riepilogo di business con le osservazioni principali.",
      ].join("\n");
    case "zhHans":
      return [
        "There is only one loaded expense sheet right now.",
        "",
        "- Ask for a detailed table by sheet.",
        "- Ask for a business summary with key observations.",
      ].join("\n");
    case "es":
    default:
      return [
        "Ahora mismo solo hay una hoja de gasto cargada.",
        "",
        "- Pide una tabla detallada por hoja.",
        "- Pide un resumen de negocio con observaciones clave.",
      ].join("\n");
  }
};

export const shouldOfferExpenseSheetsVisualizationProposals = (question: string): boolean => {
  return shouldOfferExpenseSheetsVisualizationProposalsForQuestion(question);
};

export const buildExpenseSheetsVisualizationProposalMessages = ({
  question: _question,
  requestedVisualizationType,
  sourceJson,
  uiLanguage,
}: Omit<ExpenseSheetsVisualizationFallbackArgs, "parsedMessages">): ChatMessage[] | null => {
  if (!sourceJson || !Array.isArray(sourceJson.Items) || sourceJson.Items.length === 0) {
    return null;
  }

  const locale = resolveAssistantLocale(uiLanguage);
  if (sourceJson.Items.length < 2) {
    return [createMarkdownMessage(buildSingleSheetProposalMarkdown(locale))];
  }

  const statusRows = buildStatusCountRows(sourceJson.Items);
  const currencyRows = buildCurrencyTotalsRows(sourceJson.Items);
  const userRows = buildUserCountRows(sourceJson.Items);
  const projectRows = buildProjectCountRows(sourceJson.Items);
  const dateRows = buildCreatedDateCountRows(sourceJson.Items);
  const expenseSheetRows = buildExpenseSheetTotalsRows(sourceJson.Items);

  const proposals = [
    buildExpenseSheetAmountProposal(locale, expenseSheetRows),
    buildStatusProposal(locale, statusRows),
    buildCurrencyProposal(locale, currencyRows),
    buildUserProposal(locale, userRows),
    buildProjectProposal(locale, projectRows),
    buildCreatedDateProposal(locale, dateRows),
  ].filter((proposal): proposal is VisualizationProposal => !!proposal);

  if (proposals.length === 0) {
    return [createMarkdownMessage(buildSingleSheetProposalMarkdown(locale))];
  }

  const markdown = [
    buildVisualizationProposalIntro(locale, requestedVisualizationType),
    "",
    ...proposals.slice(0, 4).map((proposal) => buildVisualizationProposalLine(locale, proposal)),
    "",
    buildVisualizationProposalFooter(locale),
  ].join("\n");

  return [createMarkdownMessage(markdown)];
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

const findRequestedVisualizationMessage = (
  messages: ChatMessage[],
  requestedVisualizationType: VisualizationType | null | undefined
): ChatMessage | null => {
  if (!requestedVisualizationType) {
    return null;
  }

  return (
    messages.find((message) => {
      if (requestedVisualizationType === "table") {
        return message.type === "table";
      }

      return message.type === "chart" && message.payload.chartType === requestedVisualizationType;
    }) || null
  );
};

const extractVisualizationLabels = (message: ChatMessage | null): string[] => {
  if (!message) {
    return [];
  }

  if (message.type === "chart") {
    const labelKey = message.payload.chartType === "pie" ? message.payload.nameKey : message.payload.xKey;
    return message.payload.data.map((row) => toSafeText(row[labelKey])).filter(Boolean);
  }

  return [];
};

const isNumericLikeLabel = (value: string): boolean => /^-?\d+(?:[.,]\d+)?$/.test(toSafeText(value));

const isWeakExpenseSheetBreakdownVisualization = ({
  messages,
  requestedVisualizationType,
  question,
  sourceJson,
}: {
  messages: ChatMessage[];
  requestedVisualizationType: VisualizationType | null | undefined;
  question: string;
  sourceJson: ExpenseSheetListResponseEnvelope | null | undefined;
}): boolean => {
  if (
    !requestedVisualizationType ||
    requestedVisualizationType === "table" ||
    !sourceJson ||
    !Array.isArray(sourceJson.Items) ||
    sourceJson.Items.length === 0 ||
    !wantsExpenseSheetBreakdown(question)
  ) {
    return false;
  }

  const requestedMessage = findRequestedVisualizationMessage(messages, requestedVisualizationType);
  if (!requestedMessage || requestedMessage.type !== "chart") {
    return false;
  }

  const labels = extractVisualizationLabels(requestedMessage);
  if (labels.length === 0) {
    return true;
  }

  const numericLabelCount = labels.filter(isNumericLikeLabel).length;
  if (numericLabelCount >= Math.max(2, Math.ceil(labels.length * 0.5))) {
    return true;
  }

  return sourceJson.Items.length >= 5 && requestedMessage.payload.data.length <= 3;
};

const isWeakStatusDistributionVisualization = ({
  messages,
  requestedVisualizationType,
  question,
}: {
  messages: ChatMessage[];
  requestedVisualizationType: VisualizationType | null | undefined;
  question: string;
}): boolean => {
  if (!requestedVisualizationType || requestedVisualizationType === "table" || !wantsStatusDistribution(question)) {
    return false;
  }

  const requestedMessage = findRequestedVisualizationMessage(messages, requestedVisualizationType);
  if (!requestedMessage || requestedMessage.type !== "chart") {
    return false;
  }

  const labels = extractVisualizationLabels(requestedMessage);
  if (labels.length === 0) {
    return true;
  }

  const numericLabelCount = labels.filter(isNumericLikeLabel).length;
  return numericLabelCount >= Math.max(1, Math.ceil(labels.length * 0.5));
};

const isWeakVisualizationFallbackCandidate = ({
  messages,
  requestedVisualizationType,
  question,
  sourceJson,
}: {
  messages: ChatMessage[];
  requestedVisualizationType: VisualizationType | null | undefined;
  question: string;
  sourceJson: ExpenseSheetListResponseEnvelope | null | undefined;
}): boolean => {
  return (
    isWeakExpenseSheetBreakdownVisualization({
      messages,
      requestedVisualizationType,
      question,
      sourceJson,
    }) ||
    isWeakStatusDistributionVisualization({
      messages,
      requestedVisualizationType,
      question,
    })
  );
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
  copy: ExpenseSheetTotalsCopy,
  locale: AssistantLocale
): ChatMessage[] | null => {
  if (requestedVisualizationType === "table") {
    const visualMessage = buildExpenseSheetTotalsTableMessage(rows, copy);
    if (!visualMessage) {
      return null;
    }

    return [createMarkdownMessage(copy.introTable), visualMessage];
  }

  const chartPlan = resolveExpenseSheetChartCurrencyPlan(rows, locale);
  if (chartPlan.recommendationMarkdown) {
    return [createMarkdownMessage(chartPlan.recommendationMarkdown)];
  }

  const subtitle = [copy.subtitle, chartPlan.subtitleSuffix].filter(Boolean).join(" ");
  const visualMessage = buildExpenseSheetTotalsChartMessage(
    requestedVisualizationType,
    chartPlan.rows,
    copy,
    subtitle
  );

  if (!visualMessage) {
    return null;
  }

  return [createMarkdownMessage(chartPlan.introText || copy.introChart), visualMessage];
};

// Builds a deterministic visualization from loaded expense data when the model does not return a usable payload.
export const buildExpenseSheetsVisualizationFallbackMessages = ({
  question,
  requestedVisualizationType,
  sourceJson,
  uiLanguage,
  parsedMessages,
}: ExpenseSheetsVisualizationFallbackArgs): ChatMessage[] | null => {
  if (!requestedVisualizationType || !sourceJson || !Array.isArray(sourceJson.Items) || sourceJson.Items.length === 0) {
    return null;
  }

  const locale = resolveAssistantLocale(uiLanguage);
  const shouldReplaceWeakVisualization =
    Array.isArray(parsedMessages) &&
    hasRequestedVisualizationMessage(parsedMessages, requestedVisualizationType) &&
    isWeakVisualizationFallbackCandidate({
      messages: parsedMessages,
      requestedVisualizationType,
      question,
      sourceJson,
    });

  if (wantsTotalsByCurrency(question)) {
    const currencyRows = buildCurrencyTotalsRows(sourceJson.Items);
    if (currencyRows.length === 0) {
      return null;
    }

    return buildCurrencyVisualizationFallbackMessages(requestedVisualizationType, currencyRows, CURRENCY_TOTALS_COPY[locale]);
  }

  if (wantsStatusDistribution(question)) {
    const statusRows = buildStatusCountRows(sourceJson.Items);
    if (statusRows.length === 0) {
      return null;
    }

    return buildStatusVisualizationFallbackMessages(requestedVisualizationType, statusRows, STATUS_DISTRIBUTION_COPY[locale]);
  }

  if (wantsExpenseSheetBreakdown(question) && (!parsedMessages || shouldReplaceWeakVisualization || !hasRequestedVisualizationMessage(parsedMessages, requestedVisualizationType))) {
    const expenseSheetRows = buildExpenseSheetTotalsRows(sourceJson.Items);
    if (expenseSheetRows.length === 0) {
      return null;
    }

    return buildExpenseSheetVisualizationFallbackMessages(
      requestedVisualizationType,
      expenseSheetRows,
      EXPENSE_SHEET_TOTALS_COPY[locale],
      locale
    );
  }

  return null;
};

export const shouldUseExpenseSheetsVisualizationFallback = (
  messages: ChatMessage[],
  requestedVisualizationType: VisualizationType | null | undefined,
  question: string,
  sourceJson: ExpenseSheetListResponseEnvelope | null | undefined
): boolean => {
  return (
    !!requestedVisualizationType &&
    (!hasRequestedVisualizationMessage(messages, requestedVisualizationType) ||
      isWeakVisualizationFallbackCandidate({
        messages,
        requestedVisualizationType,
        question,
        sourceJson,
      }))
  );
};
