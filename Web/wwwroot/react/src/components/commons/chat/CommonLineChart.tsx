import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { LineChartPayload } from "./chatMessageContract.ts";
import CommonChartFrame from "./CommonChartFrame.tsx";

type CommonLineChartProps = {
  payload: LineChartPayload;
};

const AXIS_TICK_STYLE = {
  fill: "#475569",
  fontSize: 12,
};

// Renders a reusable line chart with the shared chat visual language.
const CommonLineChart = ({ payload }: CommonLineChartProps) => {
  const hasData = Array.isArray(payload.data) && payload.data.length > 0;

  return (
    <CommonChartFrame
      title={payload.title}
      subtitle={payload.subtitle}
      emptyStateLabel={payload.emptyStateLabel}
      hasData={hasData}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={payload.data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey={payload.xKey} tick={AXIS_TICK_STYLE} axisLine={false} tickLine={false} />
          <YAxis tick={AXIS_TICK_STYLE} axisLine={false} tickLine={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={payload.yKey}
            stroke="#0369A1"
            strokeWidth={3}
            dot={{ fill: "#0369A1", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </CommonChartFrame>
  );
};

export default CommonLineChart;
