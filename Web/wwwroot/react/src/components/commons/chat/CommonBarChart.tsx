import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { BarChartPayload } from "./chatMessageContract.ts";
import CommonChartFrame from "./CommonChartFrame.tsx";

type CommonBarChartProps = {
  payload: BarChartPayload;
};

const AXIS_TICK_STYLE = {
  fill: "#475569",
  fontSize: 12,
};

// Renders a reusable bar chart with no business-specific assumptions.
const CommonBarChart = ({ payload }: CommonBarChartProps) => {
  const hasData = Array.isArray(payload.data) && payload.data.length > 0;

  return (
    <CommonChartFrame
      title={payload.title}
      subtitle={payload.subtitle}
      emptyStateLabel={payload.emptyStateLabel}
      hasData={hasData}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={payload.data} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey={payload.xKey} tick={AXIS_TICK_STYLE} axisLine={false} tickLine={false} />
          <YAxis tick={AXIS_TICK_STYLE} axisLine={false} tickLine={false} />
          <Tooltip cursor={{ fill: "#E2E8F033" }} />
          <Bar dataKey={payload.yKey} fill="#0F766E" radius={[8, 8, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </CommonChartFrame>
  );
};

export default CommonBarChart;
