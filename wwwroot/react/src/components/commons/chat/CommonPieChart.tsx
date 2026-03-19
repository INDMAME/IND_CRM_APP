import { Cell, Legend, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { PieChartPayload } from "./chatMessageContract.ts";
import CommonChartFrame from "./CommonChartFrame.tsx";

type CommonPieChartProps = {
  payload: PieChartPayload;
};

const PIE_COLORS = ["#0F766E", "#0369A1", "#D97706", "#7C3AED", "#DC2626", "#059669"];

// Renders one reusable pie chart for proportional datasets.
const CommonPieChart = ({ payload }: CommonPieChartProps) => {
  const hasData = Array.isArray(payload.data) && payload.data.length > 0;

  return (
    <CommonChartFrame
      title={payload.title}
      subtitle={payload.subtitle}
      emptyStateLabel={payload.emptyStateLabel}
      hasData={hasData}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={payload.data}
            nameKey={payload.nameKey}
            dataKey={payload.dataKey}
            innerRadius={46}
            outerRadius={84}
            paddingAngle={2}
          >
            {payload.data.map((entry, index) => (
              <Cell key={`${entry[payload.nameKey]}-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </RechartsPieChart>
      </ResponsiveContainer>
    </CommonChartFrame>
  );
};

export default CommonPieChart;
