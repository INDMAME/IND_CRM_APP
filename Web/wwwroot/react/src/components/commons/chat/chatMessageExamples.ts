import type {
  BarChartPayload,
  ChartMessage,
  ChartPayload,
  ChartTypeChoiceMessage,
  MarkdownMessage,
  PieChartPayload,
  TableMessage,
  TablePayload,
} from "./chatMessageContract.ts";
import { createChartTypeChoiceMessage, createMarkdownMessage } from "./chatMessageFactories.ts";

export const exampleMarkdownMessage: MarkdownMessage = createMarkdownMessage(
  "## Resumen\n- Total analizado: 12 hojas\n- Importe total: EUR 8,450.00"
);

export const validBarChartPayload: BarChartPayload = {
  chartType: "bar",
  title: "Gasto por usuario",
  subtitle: "Importe total por usuario",
  data: [
    { user: "Ana", amount: 3200 },
    { user: "Luis", amount: 2400 },
  ],
  xKey: "user",
  yKey: "amount",
};

export const validPieChartPayload: PieChartPayload = {
  chartType: "pie",
  title: "Distribucion por estado",
  data: [
    { status: "Aprobada", total: 8 },
    { status: "Pendiente", total: 4 },
  ],
  nameKey: "status",
  dataKey: "total",
};

export const validTablePayload: TablePayload = {
  title: "Comparativa de hojas",
  columns: [
    { key: "sheetId", header: "Hoja" },
    { key: "amount", header: "Importe", align: "right" },
  ],
  rows: [
    { sheetId: "HG-001", amount: 1200 },
    { sheetId: "HG-002", amount: 980 },
  ],
};

export const exampleChartMessage: ChartMessage = {
  type: "chart",
  payload: validBarChartPayload,
};

export const exampleTableMessage: TableMessage = {
  type: "table",
  payload: validTablePayload,
};

export const exampleChartTypeChoiceMessage: ChartTypeChoiceMessage = createChartTypeChoiceMessage(
  "Muestramelo en un grafico"
);

export const invalidBarChartPayloadMissingYKey: ChartPayload = {
  chartType: "bar",
  title: "Payload invalido",
  data: [{ category: "A", total: 10 }],
  xKey: "category",
  yKey: "",
};

export const invalidPieChartPayloadMissingDataKey: ChartPayload = {
  chartType: "pie",
  title: "Payload invalido",
  data: [{ label: "A", total: 10 }],
  nameKey: "label",
  dataKey: "",
};

export const invalidTablePayloadMissingColumns: TablePayload = {
  title: "Tabla invalida",
  columns: [],
  rows: [{ amount: 10 }],
};
