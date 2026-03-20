import { useEffect, useState } from "react";
import type {
  ChartTypeChoiceOption,
  VisualizationType,
} from "../../../components/commons/chat/chatMessageContract.ts";
import { indT } from "../../../utils/indI18n.ts";

type AssistantLocale = "es" | "en" | "eu" | "pt" | "it" | "zhHans";

type AssistantTextEntry = {
  resourceKey: string;
  en: string;
  es: string;
  eu: string;
  pt: string;
  it: string;
  zhHans: string;
};

export type ExpenseSheetsAssistantCopy = {
  title: string;
  launcherAriaLabel: string;
  send: string;
  sending: string;
  retry: string;
  warnings: string;
  inputPlaceholder: string;
  emptyStateTitle: string;
  emptyStateBody: string;
  noContextTitle: string;
  noContextBody: string;
  noContextMessage: string;
  contextUpdated: string;
  quickActions: {
    summary: { label: string; question: string };
    analytics: { label: string; question: string };
    anomalies: { label: string; question: string };
  };
  loading: string;
  chooseChartTypeQuestion: string;
  chartTypeOptions: ChartTypeChoiceOption[];
  errorValidation: string;
  errorServer: string;
  errorRateLimit: string;
  errorRetryAfter: string;
  technicalRefusal: string;
};

const TECHNICAL_REFUSAL_ZH_HANS =
  "\u6211\u53ef\u4ee5\u5e2e\u52a9\u4f60\u5206\u6790\u8d39\u7528\u6570\u636e\uff0c\u4f46\u4e0d\u80fd\u8bf4\u660e\u52a9\u624b\u7684\u6280\u672f\u5b9e\u73b0\u6216\u5185\u90e8\u5de5\u4f5c\u65b9\u5f0f\u3002";

const toSafeText = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  return String(value).trim();
};

const normalizeForComparison = (value: string): string => {
  return toSafeText(value).replace(/\s+/g, " ").toLowerCase();
};

export const resolveAssistantUiLanguage = (): string => {
  if (typeof document !== "undefined") {
    const languageFromDocument = toSafeText(document.documentElement.lang);
    if (languageFromDocument) {
      return languageFromDocument;
    }
  }

  if (typeof navigator !== "undefined") {
    const languageFromNavigator = toSafeText(navigator.language);
    if (languageFromNavigator) {
      return languageFromNavigator;
    }
  }

  return "es-ES";
};

// Tracks the current document language so assistant presets follow language changes in the web shell.
export const useAssistantUiLanguage = (): string => {
  const [uiLanguage, setUiLanguage] = useState<string>(() => resolveAssistantUiLanguage());

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const updateLanguage = () => {
      setUiLanguage(resolveAssistantUiLanguage());
    };

    updateLanguage();

    const observer = new MutationObserver(() => {
      updateLanguage();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });

    if (typeof window !== "undefined") {
      window.addEventListener("languagechange", updateLanguage);
    }

    return () => {
      observer.disconnect();
      if (typeof window !== "undefined") {
        window.removeEventListener("languagechange", updateLanguage);
      }
    };
  }, []);

  return uiLanguage;
};

export const resolveAssistantLocale = (uiLanguage?: string | null): AssistantLocale => {
  const normalizedLanguage = toSafeText(uiLanguage || resolveAssistantUiLanguage()).toLowerCase().replace(/_/g, "-");

  if (normalizedLanguage.startsWith("en")) return "en";
  if (normalizedLanguage.startsWith("eu")) return "eu";
  if (normalizedLanguage.startsWith("pt")) return "pt";
  if (normalizedLanguage.startsWith("it")) return "it";
  if (normalizedLanguage.startsWith("zh")) return "zhHans";
  return "es";
};

const resolveAssistantText = (entry: AssistantTextEntry, uiLanguage?: string | null): string => {
  const locale = resolveAssistantLocale(uiLanguage);
  const localizedText = entry[locale];
  const resolvedText = indT(entry.resourceKey, localizedText);

  if (!toSafeText(resolvedText)) {
    return localizedText;
  }

  if (locale !== "en" && normalizeForComparison(resolvedText) === normalizeForComparison(entry.en)) {
    return localizedText;
  }

  return resolvedText;
};

const ASSISTANT_TEXT = {
  title: {
    resourceKey: "ExpenseSheets_Assistant_Title",
    en: "Expense assistant",
    es: "Asistente de gastos",
    eu: "Gastuen laguntzailea",
    pt: "Assistente de despesas",
    it: "Assistente spese",
    zhHans: "\u8d39\u7528\u52a9\u624b",
  },
  launcherAriaLabel: {
    resourceKey: "ExpenseSheets_Assistant_LauncherLabel",
    en: "Open expense sheet assistant",
    es: "Abrir asistente de gastos",
    eu: "Ireki gastuen laguntzailea",
    pt: "Abrir assistente de despesas",
    it: "Apri assistente spese",
    zhHans: "\u6253\u5f00\u8d39\u7528\u52a9\u624b",
  },
  send: {
    resourceKey: "ExpenseSheets_Assistant_Send",
    en: "Send",
    es: "Enviar",
    eu: "Bidali",
    pt: "Enviar",
    it: "Invia",
    zhHans: "\u53d1\u9001",
  },
  sending: {
    resourceKey: "ExpenseSheets_Assistant_Sending",
    en: "Sending",
    es: "Enviando",
    eu: "Bidaltzen",
    pt: "Enviando",
    it: "Invio in corso",
    zhHans: "\u53d1\u9001\u4e2d",
  },
  retry: {
    resourceKey: "ExpenseSheets_Assistant_Retry",
    en: "Retry",
    es: "Reintentar",
    eu: "Berriro saiatu",
    pt: "Tentar novamente",
    it: "Riprova",
    zhHans: "\u91cd\u8bd5",
  },
  warnings: {
    resourceKey: "ExpenseSheets_Assistant_Warnings",
    en: "Warnings",
    es: "Avisos",
    eu: "Abisuak",
    pt: "Avisos",
    it: "Avvisi",
    zhHans: "\u8b66\u544a",
  },
  inputPlaceholder: {
    resourceKey: "ExpenseSheets_Assistant_Input_Placeholder",
    en: "...",
    es: "...",
    eu: "...",
    pt: "...",
    it: "...",
    zhHans: "...",
  },
  emptyStateTitle: {
    resourceKey: "ExpenseSheets_Assistant_Empty_Title",
    en: "Ask for a business summary",
    es: "Pide un resumen de negocio",
    eu: "Eskatu negozio laburpena",
    pt: "Pea um resumo de negocio",
    it: "Chiedi un riepilogo di business",
    zhHans: "\u53ef\u4ee5\u5148\u8bf7\u6211\u603b\u7ed3\u4e1a\u52a1\u60c5\u51b5",
  },
  emptyStateBody: {
    resourceKey: "ExpenseSheets_Assistant_Empty_Body",
    en: "Use quick actions or write a question about the expense sheets currently loaded in the list.",
    es: "Usa las acciones rapidas o escribe una pregunta sobre las hojas de gasto cargadas actualmente en la lista.",
    eu: "Erabili ekintza azkarrak edo idatzi une honetan zerrendan kargatuta dauden gastu-orriei buruzko galdera bat.",
    pt: "Use as acoes rapidas ou escreva uma pergunta sobre as folhas de despesas atualmente carregadas na lista.",
    it: "Usa le azioni rapide oppure scrivi una domanda sulle note spese attualmente caricate nell'elenco.",
    zhHans:
      "\u4f7f\u7528\u5feb\u6377\u64cd\u4f5c\uff0c\u6216\u76f4\u63a5\u8be2\u95ee\u5f53\u524d\u5217\u8868\u4e2d\u5df2\u52a0\u8f7d\u7684\u8d39\u7528\u5355\u3002",
  },
  noContextTitle: {
    resourceKey: "ExpenseSheets_Assistant_NoContext_Title",
    en: "Load expense sheets first.",
    es: "Carga primero las hojas de gasto.",
    eu: "Kargatu lehenik gastu-orriak.",
    pt: "Carregue primeiro as folhas de despesas.",
    it: "Carica prima le note spese.",
    zhHans: "\u8bf7\u5148\u52a0\u8f7d\u8d39\u7528\u5355\u3002",
  },
  noContextBody: {
    resourceKey: "ExpenseSheets_Assistant_NoContext_Body",
    en: "The assistant needs a real expense sheet list response before it can analyze the data.",
    es: "El asistente necesita una respuesta real de lista de hojas de gasto antes de poder analizar los datos.",
    eu: "Laguntzaileak gastu-orrien zerrendaren benetako erantzuna behar du datuak aztertu aurretik.",
    pt: "O assistente precisa de uma resposta real da lista de folhas de despesas antes de analisar os dados.",
    it: "L'assistente ha bisogno di una risposta reale con l'elenco delle note spese prima di poter analizzare i dati.",
    zhHans:
      "\u52a9\u624b\u9700\u8981\u5148\u62ff\u5230\u771f\u5b9e\u7684\u8d39\u7528\u5355\u5217\u8868\u7ed3\u679c\uff0c\u624d\u80fd\u5bf9\u6570\u636e\u8fdb\u884c\u5206\u6790\u3002",
  },
  noContextMessage: {
    resourceKey: "ExpenseSheets_Assistant_Error_NoContext",
    en: "Load expense sheets before asking the assistant.",
    es: "Carga hojas de gasto antes de preguntar al asistente.",
    eu: "Kargatu gastu-orriak laguntzaileari galdetu aurretik.",
    pt: "Carregue as folhas de despesas antes de perguntar ao assistente.",
    it: "Carica le note spese prima di fare una domanda all'assistente.",
    zhHans: "\u8bf7\u5148\u52a0\u8f7d\u8d39\u7528\u5355\uff0c\u518d\u5411\u52a9\u624b\u63d0\u95ee\u3002",
  },
  contextUpdated: {
    resourceKey: "ExpenseSheets_Assistant_Context_Updated",
    en: "Analysis context updated with the latest loaded list.",
    es: "El contexto de analisis se ha actualizado con la ultima lista cargada.",
    eu: "Analisi-testuingurua kargatutako azken zerrendarekin eguneratu da.",
    pt: "O contexto da analise foi atualizado com a ultima lista carregada.",
    it: "Il contesto di analisi e stato aggiornato con l'ultimo elenco caricato.",
    zhHans: "\u5206\u6790\u4e0a\u4e0b\u6587\u5df2\u66f4\u65b0\u4e3a\u6700\u65b0\u52a0\u8f7d\u7684\u5217\u8868\u3002",
  },
  quickSummaryLabel: {
    resourceKey: "ExpenseSheets_Assistant_Quick_Summary",
    en: "Summary",
    es: "Resumen",
    eu: "Laburpena",
    pt: "Resumo",
    it: "Riepilogo",
    zhHans: "\u6458\u8981",
  },
  quickSummaryQuestion: {
    resourceKey: "ExpenseSheets_Assistant_Question_Summary",
    en: "Summarize the loaded expense sheets. Include overall total, periods and relevant observations.",
    es: "Resume las hojas de gasto cargadas. Indica total global, periodos y observaciones relevantes.",
    eu: "Laburtu kargatutako gastu-orriak. Adierazi guztizko zenbatekoa, epeak eta behaketa garrantzitsuak.",
    pt: "Resuma as folhas de despesas carregadas. Indique total global, periodos e observacoes relevantes.",
    it: "Riassumi le note spese caricate. Indica totale complessivo, periodi e osservazioni rilevanti.",
    zhHans:
      "\u8bf7\u603b\u7ed3\u5df2\u52a0\u8f7d\u7684\u8d39\u7528\u5355\uff0c\u8bf4\u660e\u603b\u989d\u3001\u671f\u95f4\u4ee5\u53ca\u91cd\u8981\u89c2\u5bdf\u7ed3\u679c\u3002",
  },
  quickAnalyticsLabel: {
    resourceKey: "ExpenseSheets_Assistant_Quick_Analytics",
    en: "Analytics",
    es: "Analitica",
    eu: "Analitika",
    pt: "Analitica",
    it: "Analisi",
    zhHans: "\u5206\u6790",
  },
  quickAnalyticsQuestion: {
    resourceKey: "ExpenseSheets_Assistant_Question_Analytics",
    en: "Analyze the loaded expense sheets and extract patterns: total spend, top users, top projects, top currencies and status distribution.",
    es: "Analiza las hojas de gasto cargadas y extrae patrones: gasto total, top usuarios, top proyectos, top monedas y distribucion por estado.",
    eu: "Aztertu kargatutako gastu-orriak eta atera ereduak: gastu osoa, erabiltzaile nagusiak, proiektu nagusiak, moneta nagusiak eta egoeren banaketa.",
    pt: "Analise as folhas de despesas carregadas e extraia padroes: gasto total, principais utilizadores, principais projetos, principais moedas e distribuicao por estado.",
    it: "Analizza le note spese caricate ed estrai i pattern: spesa totale, utenti principali, progetti principali, valute principali e distribuzione per stato.",
    zhHans:
      "\u8bf7\u5206\u6790\u5df2\u52a0\u8f7d\u7684\u8d39\u7528\u5355\uff0c\u63d0\u53d6\u6a21\u5f0f\uff1a\u603b\u652f\u51fa\u3001\u4e3b\u8981\u7528\u6237\u3001\u4e3b\u8981\u9879\u76ee\u3001\u4e3b\u8981\u5e01\u79cd\u4ee5\u53ca\u72b6\u6001\u5206\u5e03\u3002",
  },
  quickAnomaliesLabel: {
    resourceKey: "ExpenseSheets_Assistant_Quick_Anomalies",
    en: "Anomalies",
    es: "Anomalias",
    eu: "Anomaliak",
    pt: "Anomalias",
    it: "Anomalie",
    zhHans: "\u5f02\u5e38",
  },
  quickAnomaliesQuestion: {
    resourceKey: "ExpenseSheets_Assistant_Question_Anomalies",
    en: "Review the loaded expense sheets and detect possible anomalies, inconsistencies or outliers in amounts, dates, users, projects, statuses and expense types.",
    es: "Revisa las hojas de gasto cargadas y detecta posibles anomalias, inconsistencias o valores atipicos en importes, fechas, usuarios, proyectos, estados y tipos de gasto.",
    eu: "Berrikusi kargatutako gastu-orriak eta detektatu zenbateko, data, erabiltzaile, proiektu, egoera eta gastu motetan egon daitezkeen anomaliak, inkongruentziak edo balio atipikoak.",
    pt: "Revise as folhas de despesas carregadas e detete possiveis anomalias, inconsistencias ou valores atipicos em montantes, datas, utilizadores, projetos, estados e tipos de despesa.",
    it: "Esamina le note spese caricate e rileva possibili anomalie, incoerenze o valori anomali in importi, date, utenti, progetti, stati e tipi di spesa.",
    zhHans:
      "\u8bf7\u68c0\u67e5\u5df2\u52a0\u8f7d\u7684\u8d39\u7528\u5355\uff0c\u627e\u51fa\u91d1\u989d\u3001\u65e5\u671f\u3001\u7528\u6237\u3001\u9879\u76ee\u3001\u72b6\u6001\u548c\u8d39\u7528\u7c7b\u578b\u4e2d\u7684\u5f02\u5e38\u3001\u4e0d\u4e00\u81f4\u6216\u79bb\u7fa4\u503c\u3002",
  },
  loading: {
    resourceKey: "ExpenseSheets_Assistant_Message_Loading",
    en: "I'm preparing the answer...",
    es: "Estoy preparando la respuesta...",
    eu: "Erantzuna prestatzen ari naiz...",
    pt: "Estou a preparar a resposta...",
    it: "Sto preparando la risposta...",
    zhHans: "\u6b63\u5728\u51c6\u5907\u56de\u590d...",
  },
  chooseChartTypeQuestion: {
    resourceKey: "ExpenseSheets_Assistant_ChooseChartType_Question",
    en: "What type of visualization do you want?",
    es: "¿Qué tipo de visualización quieres ver?",
    eu: "Zein bistaratze mota nahi duzu?",
    pt: "Que tipo de visualizacao deseja ver?",
    it: "Quale tipo di visualizzazione vuoi vedere?",
    zhHans: "\u4f60\u60f3\u770b\u54ea\u79cd\u53ef\u89c6\u5316\uff1f",
  },
  errorValidation: {
    resourceKey: "ExpenseSheets_Assistant_Error_Validation",
    en: "Check the question and try again.",
    es: "Revisa la pregunta e intentalo de nuevo.",
    eu: "Egiaztatu galdera eta saiatu berriro.",
    pt: "Verifique a pergunta e tente novamente.",
    it: "Controlla la domanda e riprova.",
    zhHans: "\u8bf7\u68c0\u67e5\u95ee\u9898\u540e\u518d\u8bd5\u4e00\u6b21\u3002",
  },
  errorServer: {
    resourceKey: "ExpenseSheets_Assistant_Error_Server",
    en: "The assistant is not available right now.",
    es: "El asistente no esta disponible ahora mismo.",
    eu: "Laguntzailea ez dago erabilgarri une honetan.",
    pt: "O assistente nao esta disponivel neste momento.",
    it: "L'assistente non e disponibile in questo momento.",
    zhHans: "\u52a9\u624b\u76ee\u524d\u4e0d\u53ef\u7528\u3002",
  },
  errorRateLimit: {
    resourceKey: "ExpenseSheets_Assistant_Error_RateLimit",
    en: "Too many assistant requests.",
    es: "Demasiadas solicitudes al asistente.",
    eu: "Laguntzaileari eskaera gehiegi bidali zaizkio.",
    pt: "Demasiados pedidos ao assistente.",
    it: "Troppe richieste all'assistente.",
    zhHans: "\u5bf9\u52a9\u624b\u7684\u8bf7\u6c42\u8fc7\u591a\u3002",
  },
  errorRetryAfter: {
    resourceKey: "ExpenseSheets_Assistant_Error_RetryAfter",
    en: "Retry after {0}.",
    es: "Vuelve a intentarlo despues de {0}.",
    eu: "Saiatu berriro {0} igaro ondoren.",
    pt: "Tente novamente apos {0}.",
    it: "Riprova dopo {0}.",
    zhHans: "\u8bf7\u5728 {0} \u540e\u91cd\u8bd5\u3002",
  },
} satisfies Record<string, AssistantTextEntry>;

const ASSISTANT_CHART_TYPE_OPTIONS: Record<AssistantLocale, ChartTypeChoiceOption[]> = {
  es: [
    { value: "bar", label: "Barras", description: "Compara categorías de forma rápida." },
    { value: "line", label: "Líneas", description: "Muestra cambios o evolución en el tiempo." },
    { value: "pie", label: "Pie", description: "Representa la proporción entre partes." },
    { value: "table", label: "Tabla", description: "Presenta detalle exacto y comparable." },
  ],
  en: [
    { value: "bar", label: "Bar", description: "Compare categories quickly." },
    { value: "line", label: "Line", description: "Show change or evolution over time." },
    { value: "pie", label: "Pie", description: "Show the proportion between parts." },
    { value: "table", label: "Table", description: "Show exact and comparable detail." },
  ],
  eu: [
    { value: "bar", label: "Barrak", description: "Kategoriak azkar alderatzen ditu." },
    { value: "line", label: "Lerroak", description: "Denboran zeharreko aldaketak erakusten ditu." },
    { value: "pie", label: "Sektoreak", description: "Zatien arteko proportzioa erakusten du." },
    { value: "table", label: "Taula", description: "Xehetasun zehatza eta alderagarria erakusten du." },
  ],
  pt: [
    { value: "bar", label: "Barras", description: "Compara categorias rapidamente." },
    { value: "line", label: "Linhas", description: "Mostra mudancas ou evolucao no tempo." },
    { value: "pie", label: "Pizza", description: "Representa a proporcao entre partes." },
    { value: "table", label: "Tabela", description: "Apresenta detalhe exato e comparavel." },
  ],
  it: [
    { value: "bar", label: "Barre", description: "Confronta rapidamente le categorie." },
    { value: "line", label: "Linee", description: "Mostra cambiamenti o evoluzione nel tempo." },
    { value: "pie", label: "Torta", description: "Rappresenta la proporzione tra le parti." },
    { value: "table", label: "Tabella", description: "Mostra un dettaglio preciso e comparabile." },
  ],
  zhHans: [
    { value: "bar", label: "\u67f1\u72b6\u56fe", description: "\u5feb\u901f\u6bd4\u8f83\u5404\u7c7b\u522b\u3002" },
    { value: "line", label: "\u6298\u7ebf\u56fe", description: "\u5c55\u793a\u968f\u65f6\u95f4\u53d8\u5316\u6216\u8d8b\u52bf\u3002" },
    { value: "pie", label: "\u997c\u56fe", description: "\u5c55\u793a\u5404\u90e8\u5206\u7684\u5360\u6bd4\u3002" },
    { value: "table", label: "\u8868\u683c", description: "\u5c55\u793a\u7cbe\u786e\u4e14\u53ef\u6bd4\u7684\u660e\u7ec6\u3002" },
  ],
};

const VISUALIZATION_TYPE_LABELS: Record<AssistantLocale, Record<VisualizationType, string>> = {
  es: {
    bar: "gráfico de barras",
    line: "gráfico de líneas",
    pie: "gráfico pie",
    table: "tabla",
  },
  en: {
    bar: "bar chart",
    line: "line chart",
    pie: "pie chart",
    table: "table",
  },
  eu: {
    bar: "barra grafikoa",
    line: "lerro grafikoa",
    pie: "sektore grafikoa",
    table: "taula",
  },
  pt: {
    bar: "gráfico de barras",
    line: "gráfico de linhas",
    pie: "gráfico de pizza",
    table: "tabela",
  },
  it: {
    bar: "gráfico a barre",
    line: "gráfico a linee",
    pie: "gráfico a torta",
    table: "tabella",
  },
  zhHans: {
    bar: "\u67f1\u72b6\u56fe",
    line: "\u6298\u7ebf\u56fe",
    pie: "\u997c\u56fe",
    table: "\u8868\u683c",
  },
};

const VISUALIZATION_SELECTION_PREFIX: Record<AssistantLocale, string> = {
  es: "Visualización elegida",
  en: "Selected visualization",
  eu: "Hautatutako bistaratzea",
  pt: "Visualização escolhida",
  it: "Visualizzazione scelta",
  zhHans: "\u5df2\u9009\u62e9\u7684\u53ef\u89c6\u5316",
};

const formatTemplate = (template: string, ...args: Array<string | number>): string => {
  return String(template).replace(/\{(\d+)\}/g, (_, index) => String(args[Number(index)] ?? ""));
};

export const getExpenseSheetsVisualizationTypeLabel = (
  value: VisualizationType,
  uiLanguage?: string | null
): string => {
  const locale = resolveAssistantLocale(uiLanguage);
  return VISUALIZATION_TYPE_LABELS[locale][value];
};

export const buildExpenseSheetsVisualizationSelectionMessage = (
  value: VisualizationType,
  uiLanguage?: string | null
): string => {
  const locale = resolveAssistantLocale(uiLanguage);
  return `${VISUALIZATION_SELECTION_PREFIX[locale]}: ${getExpenseSheetsVisualizationTypeLabel(value, uiLanguage)}.`;
};

export const buildTechnicalQuestionRefusal = (uiLanguage?: string | null): string => {
  const locale = resolveAssistantLocale(uiLanguage);

  switch (locale) {
    case "en":
      return "I can help with the expense data, but I cannot explain the assistant's technical setup or internal operation.";
    case "eu":
      return "Gastuen datuekin lagundu dezaket, baina ezin dut azaldu laguntzailearen konfigurazio teknikoa edo barne funtzionamendua.";
    case "pt":
      return "Posso ajudar com os dados de despesas, mas nao posso explicar a configuracao tecnica nem o funcionamento interno do assistente.";
    case "it":
      return "Posso aiutarti con i dati delle spese, ma non posso spiegare la configurazione tecnica o il funzionamento interno dell'assistente.";
    case "zhHans":
      return TECHNICAL_REFUSAL_ZH_HANS;
    default:
      return "Puedo ayudarte con los datos de gastos, pero no puedo explicar la configuracion tecnica ni el funcionamiento interno del asistente.";
  }
};

export const resolveExpenseSheetsAssistantCopy = (uiLanguage?: string | null): ExpenseSheetsAssistantCopy => ({
  title: resolveAssistantText(ASSISTANT_TEXT.title, uiLanguage),
  launcherAriaLabel: resolveAssistantText(ASSISTANT_TEXT.launcherAriaLabel, uiLanguage),
  send: resolveAssistantText(ASSISTANT_TEXT.send, uiLanguage),
  sending: resolveAssistantText(ASSISTANT_TEXT.sending, uiLanguage),
  retry: resolveAssistantText(ASSISTANT_TEXT.retry, uiLanguage),
  warnings: resolveAssistantText(ASSISTANT_TEXT.warnings, uiLanguage),
  inputPlaceholder: resolveAssistantText(ASSISTANT_TEXT.inputPlaceholder, uiLanguage),
  emptyStateTitle: resolveAssistantText(ASSISTANT_TEXT.emptyStateTitle, uiLanguage),
  emptyStateBody: resolveAssistantText(ASSISTANT_TEXT.emptyStateBody, uiLanguage),
  noContextTitle: resolveAssistantText(ASSISTANT_TEXT.noContextTitle, uiLanguage),
  noContextBody: resolveAssistantText(ASSISTANT_TEXT.noContextBody, uiLanguage),
  noContextMessage: resolveAssistantText(ASSISTANT_TEXT.noContextMessage, uiLanguage),
  contextUpdated: resolveAssistantText(ASSISTANT_TEXT.contextUpdated, uiLanguage),
  quickActions: {
    summary: {
      label: resolveAssistantText(ASSISTANT_TEXT.quickSummaryLabel, uiLanguage),
      question: resolveAssistantText(ASSISTANT_TEXT.quickSummaryQuestion, uiLanguage),
    },
    analytics: {
      label: resolveAssistantText(ASSISTANT_TEXT.quickAnalyticsLabel, uiLanguage),
      question: resolveAssistantText(ASSISTANT_TEXT.quickAnalyticsQuestion, uiLanguage),
    },
    anomalies: {
      label: resolveAssistantText(ASSISTANT_TEXT.quickAnomaliesLabel, uiLanguage),
      question: resolveAssistantText(ASSISTANT_TEXT.quickAnomaliesQuestion, uiLanguage),
    },
  },
  loading: resolveAssistantText(ASSISTANT_TEXT.loading, uiLanguage),
  chooseChartTypeQuestion: resolveAssistantText(ASSISTANT_TEXT.chooseChartTypeQuestion, uiLanguage),
  chartTypeOptions: ASSISTANT_CHART_TYPE_OPTIONS[resolveAssistantLocale(uiLanguage)],
  errorValidation: resolveAssistantText(ASSISTANT_TEXT.errorValidation, uiLanguage),
  errorServer: resolveAssistantText(ASSISTANT_TEXT.errorServer, uiLanguage),
  errorRateLimit: resolveAssistantText(ASSISTANT_TEXT.errorRateLimit, uiLanguage),
  errorRetryAfter: resolveAssistantText(ASSISTANT_TEXT.errorRetryAfter, uiLanguage),
  technicalRefusal: buildTechnicalQuestionRefusal(uiLanguage),
});

export const formatExpenseSheetsRetryAfterMessage = (
  retryAfter: string,
  uiLanguage?: string | null
): string => {
  return formatTemplate(resolveAssistantText(ASSISTANT_TEXT.errorRetryAfter, uiLanguage), retryAfter);
};
