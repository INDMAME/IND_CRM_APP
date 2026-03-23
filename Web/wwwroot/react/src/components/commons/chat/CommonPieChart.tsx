import type { PieChartPayload } from "./chatMessageContract.ts";
import CommonChartFrame from "./CommonChartFrame.tsx";
import { CHART_COLORS, buildPieSeries, formatChartValue } from "./commonChartUtils.ts";

type CommonPieChartProps = {
  payload: PieChartPayload;
};

const SIZE = 176;
const CENTER = SIZE / 2;
const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Renders one reusable donut chart with a small legend and no CSP-sensitive dependencies.
const CommonPieChart = ({ payload }: CommonPieChartProps) => {
  const series = buildPieSeries(payload.data, payload.nameKey, payload.dataKey);
  const hasData = series.length > 0;
  const totalValue = series.reduce((sum, entry) => sum + entry.value, 0);

  let cumulativeLength = 0;

  return (
    <CommonChartFrame
      title={payload.title}
      subtitle={payload.subtitle}
      emptyStateLabel={payload.emptyStateLabel}
      hasData={hasData}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="mx-auto h-[176px] w-[176px] shrink-0" role="img" aria-label={payload.title || "Pie chart"}>
          <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="#E2E8F0" strokeWidth="26" />

          {series.map((entry, index) => {
            const segmentLength = totalValue > 0 ? (entry.value / totalValue) * CIRCUMFERENCE : 0;
            const segmentOffset = cumulativeLength;
            cumulativeLength += segmentLength;

            return (
              <circle
                key={`${entry.label}-${entry.value}`}
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                fill="none"
                stroke={CHART_COLORS[index % CHART_COLORS.length]}
                strokeWidth="26"
                strokeLinecap="butt"
                strokeDasharray={`${segmentLength} ${CIRCUMFERENCE - segmentLength}`}
                strokeDashoffset={-segmentOffset}
                transform={`rotate(-90 ${CENTER} ${CENTER})`}
              />
            );
          })}

          <circle cx={CENTER} cy={CENTER} r="30" fill="#FFFFFF" />
          <text x={CENTER} y={CENTER - 4} textAnchor="middle" fontSize="12" fontWeight="600" fill="#0F172A">
            Total
          </text>
          <text x={CENTER} y={CENTER + 16} textAnchor="middle" fontSize="12" fill="#475569">
            {formatChartValue(totalValue)}
          </text>
        </svg>

        <ul className="grid flex-1 grid-cols-1 gap-2">
          {series.map((entry, index) => {
            const percent = totalValue > 0 ? (entry.value / totalValue) * 100 : 0;

            return (
              <li key={`${entry.label}-legend-${entry.value}`} className="flex items-center justify-between gap-3 rounded-[var(--radius-xl)] border border-slate-200 bg-slate-50 px-3 py-2">
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                    aria-hidden="true"
                  />
                  <span className="truncate text-[12px] leading-5 text-slate-700">{entry.label}</span>
                </div>
                <div className="shrink-0 text-right text-[12px] leading-5 text-slate-700">
                  <div>{formatChartValue(entry.value)}</div>
                  <div className="text-slate-500">{percent.toFixed(1)}%</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </CommonChartFrame>
  );
};

export default CommonPieChart;
