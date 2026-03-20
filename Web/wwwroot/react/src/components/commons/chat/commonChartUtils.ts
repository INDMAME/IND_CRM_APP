import type { ChartDatum, ChartDatumValue } from "./chatMessageContract.ts";

export const CHART_HEIGHT = 304;
export const CHART_COLORS = ["#0F766E", "#0369A1", "#D97706", "#7C3AED", "#DC2626", "#059669"];

export type ChartSeriesPoint = {
  label: string;
  value: number;
};

const chartValueFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 2,
});

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const toLabelText = (value: ChartDatumValue): string => {
  if (value === null || value === undefined) return "-";

  const normalizedValue = String(value).trim();
  return normalizedValue || "-";
};

export const truncateLabel = (value: string, maxLength = 12): string => {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, Math.max(1, maxLength - 3))}...`;
};

export const toNumericValue = (value: ChartDatumValue): number | null => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (typeof value !== "string") {
    return null;
  }

  const normalizedValue = value.trim().replace(/\s+/g, "");
  if (!normalizedValue) {
    return null;
  }

  const hasComma = normalizedValue.includes(",");
  const hasDot = normalizedValue.includes(".");
  let numericValue = normalizedValue;

  if (hasComma && hasDot) {
    numericValue =
      normalizedValue.lastIndexOf(",") > normalizedValue.lastIndexOf(".")
        ? normalizedValue.replace(/\./g, "").replace(",", ".")
        : normalizedValue.replace(/,/g, "");
  } else if (hasComma) {
    const commaGroups = normalizedValue.split(",");
    numericValue =
      commaGroups.length === 2 && commaGroups[1].length <= 2
        ? normalizedValue.replace(",", ".")
        : normalizedValue.replace(/,/g, "");
  }

  const parsedValue = Number(numericValue.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsedValue) ? parsedValue : null;
};

export const buildCartesianSeries = (data: ChartDatum[], xKey: string, yKey: string): ChartSeriesPoint[] => {
  return data
    .map((entry) => ({
      label: toLabelText(entry[xKey]),
      value: toNumericValue(entry[yKey]),
    }))
    .filter((entry): entry is ChartSeriesPoint => entry.value !== null);
};

export const buildPieSeries = (data: ChartDatum[], nameKey: string, dataKey: string): ChartSeriesPoint[] => {
  return data
    .map((entry) => ({
      label: toLabelText(entry[nameKey]),
      value: toNumericValue(entry[dataKey]),
    }))
    .filter((entry): entry is ChartSeriesPoint => entry.value !== null && entry.value > 0);
};

export const formatChartValue = (value: number): string => {
  return chartValueFormatter.format(value);
};

export const buildNiceTicks = (values: number[], tickCount = 4): number[] => {
  const rawMin = Math.min(...values, 0);
  const rawMax = Math.max(...values, 0);

  if (rawMin === rawMax) {
    const paddedMax = rawMax === 0 ? 1 : Math.abs(rawMax);
    return Array.from({ length: tickCount + 1 }, (_, index) => (paddedMax / tickCount) * (tickCount - index));
  }

  const range = rawMax - rawMin;
  const magnitude = Math.pow(10, Math.floor(Math.log10(range)));
  const normalizedStep = range / tickCount / magnitude;

  const stepBase = normalizedStep <= 1 ? 1 : normalizedStep <= 2 ? 2 : normalizedStep <= 5 ? 5 : 10;
  const step = stepBase * magnitude;

  const maxTick = Math.ceil(rawMax / step) * step;
  const minTick = Math.floor(rawMin / step) * step;
  const steps = Math.max(1, Math.round((maxTick - minTick) / step));

  return Array.from({ length: steps + 1 }, (_, index) => maxTick - index * step);
};

export const scaleValue = (value: number, ticks: number[], top: number, height: number): number => {
  const minTick = ticks[ticks.length - 1] ?? 0;
  const maxTick = ticks[0] ?? 1;

  if (maxTick === minTick) {
    return top + height / 2;
  }

  return top + ((maxTick - value) / (maxTick - minTick)) * height;
};
