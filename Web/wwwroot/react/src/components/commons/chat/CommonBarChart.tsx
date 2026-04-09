import type { BarChartPayload } from "./chatMessageContract.ts";
import CommonChartFrame from "./CommonChartFrame.tsx";
import {
  CHART_HEIGHT,
  buildCartesianSeries,
  buildNiceTicks,
  clamp,
  formatChartValue,
  resolveXAxisLabelAngle,
  resolveXAxisLabelMaxLength,
  scaleValue,
  shouldUseIndexedXAxisLabels,
  shouldRenderXAxisLabel,
  truncateLabel,
} from "./commonChartUtils.ts";

type CommonBarChartProps = {
  payload: BarChartPayload;
};

const VIEWBOX_WIDTH = 320;
const PADDING = {
  top: 16,
  right: 12,
  bottom: 76,
  left: 48,
};

// Renders a reusable bar chart without pulling CSP-sensitive chart libraries.
const CommonBarChart = ({ payload }: CommonBarChartProps) => {
  const series = buildCartesianSeries(payload.data, payload.xKey, payload.yKey);
  const hasData = series.length > 0;

  const innerWidth = VIEWBOX_WIDTH - PADDING.left - PADDING.right;
  const innerHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;
  const ticks = hasData ? buildNiceTicks(series.map((entry) => entry.value)) : [1, 0];
  const baselineY = scaleValue(0, ticks, PADDING.top, innerHeight);
  const slotWidth = hasData ? innerWidth / series.length : innerWidth;
  const barWidth = clamp(slotWidth * 0.56, 16, 40);
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
  const legend = useIndexedLabels ? (
    <ol className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
      {series.map((entry, index) => (
        <li key={`${entry.label}-${entry.value}-legend`} className="flex items-start gap-2 text-[11px] leading-4 text-slate-600">
          <span className="inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-semibold text-slate-700">
            {index + 1}
          </span>
          <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-[#0F766E]" aria-hidden="true" />
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
        aria-label={payload.title || "Bar chart"}
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

        <line
          x1={PADDING.left}
          y1={baselineY}
          x2={VIEWBOX_WIDTH - PADDING.right}
          y2={baselineY}
          stroke="#CBD5E1"
        />

        {series.map((entry, index) => {
          const x = PADDING.left + slotWidth * index + (slotWidth - barWidth) / 2;
          const valueY = scaleValue(entry.value, ticks, PADDING.top, innerHeight);
          const y = entry.value >= 0 ? valueY : baselineY;
          const height = Math.max(2, Math.abs(baselineY - valueY));
          const labelX = x + barWidth / 2;

          return (
            <g key={`${entry.label}-${entry.value}`}>
              <rect x={x} y={y} width={barWidth} height={height} rx={8} fill="#0F766E" />
              {useIndexedLabels || shouldRenderXAxisLabel(index, series.length) ? (
                <text
                  x={labelX}
                  y={labelBaseY}
                  textAnchor={effectiveLabelAngle === 0 ? "middle" : "end"}
                  fontSize={labelFontSize}
                  fill="#475569"
                  transform={
                    effectiveLabelAngle === 0 ? undefined : `rotate(${effectiveLabelAngle} ${labelX} ${labelBaseY})`
                  }
                >
                  {useIndexedLabels ? String(index + 1) : truncateLabel(entry.label, labelMaxLength)}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </CommonChartFrame>
  );
};

export default CommonBarChart;
