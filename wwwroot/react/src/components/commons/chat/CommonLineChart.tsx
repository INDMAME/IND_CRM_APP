import type { LineChartPayload } from "./chatMessageContract.ts";
import CommonChartFrame from "./CommonChartFrame.tsx";
import {
  CHART_HEIGHT,
  buildCartesianSeries,
  buildNiceTicks,
  formatChartValue,
  resolveXAxisLabelAngle,
  resolveXAxisLabelMaxLength,
  scaleValue,
  shouldUseIndexedXAxisLabels,
  shouldRenderXAxisLabel,
  truncateLabel,
} from "./commonChartUtils.ts";

type CommonLineChartProps = {
  payload: LineChartPayload;
};

const VIEWBOX_WIDTH = 320;
const PADDING = {
  top: 16,
  right: 12,
  bottom: 76,
  left: 48,
};

// Renders a reusable line chart without depending on CSP-sensitive libraries.
const CommonLineChart = ({ payload }: CommonLineChartProps) => {
  const series = buildCartesianSeries(payload.data, payload.xKey, payload.yKey);
  const hasData = series.length > 0;

  const innerWidth = VIEWBOX_WIDTH - PADDING.left - PADDING.right;
  const innerHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;
  const ticks = hasData ? buildNiceTicks(series.map((entry) => entry.value)) : [1, 0];
  const stepX = series.length > 1 ? innerWidth / (series.length - 1) : 0;
  const labelAngle = resolveXAxisLabelAngle(series.length);
  const labelMaxLength = resolveXAxisLabelMaxLength(series.length);
  const useIndexedLabels = shouldUseIndexedXAxisLabels(
    series.map((entry) => entry.label),
    labelMaxLength,
    labelAngle
  );
  const effectiveLabelAngle = useIndexedLabels ? 0 : labelAngle;
  const labelFontSize = series.length >= 8 ? 10 : 11;
  const labelBaseY = CHART_HEIGHT - 16;
  const points = series.map((entry, index) => {
    return {
      ...entry,
      x: PADDING.left + stepX * index,
      y: scaleValue(entry.value, ticks, PADDING.top, innerHeight),
    };
  });

  const polylinePoints = points.map((point) => `${point.x},${point.y}`).join(" ");
  const legend = useIndexedLabels ? (
    <ol className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
      {series.map((entry, index) => (
        <li key={`${entry.label}-${entry.value}-legend`} className="flex items-start gap-2 text-[11px] leading-4 text-slate-600">
          <span className="inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-semibold text-slate-700">
            {index + 1}
          </span>
          <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-[#0369A1]" aria-hidden="true" />
          <span className="min-w-0 break-words">{entry.label}</span>
        </li>
      ))}
    </ol>
  ) : null;

  return (
    <CommonChartFrame
      title={payload.title}
      subtitle={payload.subtitle}
      emptyStateLabel={payload.emptyStateLabel}
      hasData={hasData}
      footer={legend}
    >
      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${CHART_HEIGHT}`}
        className="h-[272px] w-full overflow-visible"
        role="img"
        aria-label={payload.title || "Line chart"}
        preserveAspectRatio="xMidYMid meet"
      >
        {ticks.map((tickValue) => {
          const y = scaleValue(tickValue, ticks, PADDING.top, innerHeight);

          return (
            <g key={`tick-${tickValue}`}>
              <line x1={PADDING.left} y1={y} x2={VIEWBOX_WIDTH - PADDING.right} y2={y} stroke="#E2E8F0" strokeDasharray="3 3" />
              <text x={PADDING.left - 8} y={y + 4} textAnchor="end" fontSize="12" fill="#475569">
                {formatChartValue(tickValue)}
              </text>
            </g>
          );
        })}

        {points.length > 1 ? <polyline fill="none" stroke="#0369A1" strokeWidth="3" points={polylinePoints} /> : null}

        {points.map((point, index) => (
          <g key={`${point.label}-${point.value}`}>
            <circle cx={point.x} cy={point.y} r="4.5" fill="#0369A1" />
            {useIndexedLabels || shouldRenderXAxisLabel(index, points.length) ? (
              <text
                x={point.x}
                y={labelBaseY}
                textAnchor={effectiveLabelAngle === 0 ? "middle" : "end"}
                fontSize={labelFontSize}
                fill="#475569"
                transform={
                  effectiveLabelAngle === 0 ? undefined : `rotate(${effectiveLabelAngle} ${point.x} ${labelBaseY})`
                }
              >
                {useIndexedLabels ? String(index + 1) : truncateLabel(point.label, labelMaxLength)}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
    </CommonChartFrame>
  );
};

export default CommonLineChart;
