export type ChartType = "bar" | "line" | "pie";

export type VisualizationType = ChartType | "table";

export type ChatMessageType = "markdown" | "chart" | "table" | "question-to-choose-chart-type";

export type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

export type MarkdownMessage = {
  type: "markdown";
  markdown: string;
};

export type ChartDatumValue = string | number | null;

export type ChartDatum = Record<string, ChartDatumValue>;

type BaseChartPayload = {
  title?: string;
  subtitle?: string;
  data: ChartDatum[];
  emptyStateLabel?: string;
};

export type BarChartPayload = BaseChartPayload & {
  chartType: "bar";
  xKey: string;
  yKey: string;
};

export type LineChartPayload = BaseChartPayload & {
  chartType: "line";
  xKey: string;
  yKey: string;
};

export type PieChartPayload = BaseChartPayload & {
  chartType: "pie";
  nameKey: string;
  dataKey: string;
};

export type ChartPayload = BarChartPayload | LineChartPayload | PieChartPayload;

export type ChartMessage = {
  type: "chart";
  payload: ChartPayload;
};

export type TableCellValue = string | number | boolean | null;

export type TableRow = Record<string, TableCellValue>;

export type TableColumn = {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
};

export type TablePayload = {
  title?: string;
  subtitle?: string;
  columns: TableColumn[];
  rows: TableRow[];
  emptyStateLabel?: string;
};

export type TableMessage = {
  type: "table";
  payload: TablePayload;
};

export type ChartTypeChoiceOption = {
  value: VisualizationType;
  label: string;
  description?: string;
};

export type ChartTypeChoiceMessage = {
  type: "question-to-choose-chart-type";
  question: string;
  originalPrompt: string;
  options: ChartTypeChoiceOption[];
  selectedType?: VisualizationType | null;
};

export type ChatMessage = MarkdownMessage | ChartMessage | TableMessage | ChartTypeChoiceMessage;
