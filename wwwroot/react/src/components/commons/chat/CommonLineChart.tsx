import type { LineChartPayload } from "./chatMessageContract.ts";
import CommonChartFrame from "./CommonChartFrame.tsx";
import { CHART_HEIGHT, buildCartesianSeries, buildNiceTicks, formatChartValue, scaleValue, truncateLabel } from "./commonChartUtils.ts";

type CommonLineChartProps = {
  payload: LineChartPayload;
};

const VIEWBOX_WIDTH = 320;
const PADDING = {
  top: 16,
  right: 12,
  bottom: 48,
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
  const points = series.map((entry, index) => {
    return {
      ...entry,
      x: PADDING.left + stepX * index,
      y: scaleValue(entry.value, ticks, PADDING.top, innerHeight),
    };
  });

  const polylinePoints = points.map((point) => `${point.x},${point.y}`).join(" ");

  return (
    <CommonChartFrame
      title={payload.title}
      subtitle={payload.subtitle}
      emptyStateLabel={payload.emptyStateLabel}
      hasData={hasData}
    >
      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${CHART_HEIGHT}`}
        className="h-[304px] w-full overflow-visible"
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

        {points.map((point) => (
          <g key={`${point.label}-${point.value}`}>
            <circle cx={point.x} cy={point.y} r="4.5" fill="#0369A1" />
            <text x={point.x} y={CHART_HEIGHT - 20} textAnchor="middle" fontSize="12" fill="#475569">
              {truncateLabel(point.label)}
            </text>
          </g>
        ))}
      </svg>
    </CommonChartFrame>
  );
};

export default CommonLineChart;
