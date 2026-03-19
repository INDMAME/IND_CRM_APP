import type { ChartPayload } from "./chatMessageContract.ts";
import CommonBarChart from "./CommonBarChart.tsx";
import CommonLineChart from "./CommonLineChart.tsx";
import CommonPieChart from "./CommonPieChart.tsx";

type ChatChartRendererProps = {
  payload: ChartPayload;
};

// Chooses the correct dumb chart component once the payload is already validated.
const ChatChartRenderer = ({ payload }: ChatChartRendererProps) => {
  switch (payload.chartType) {
    case "bar":
      return <CommonBarChart payload={payload} />;
    case "line":
      return <CommonLineChart payload={payload} />;
    case "pie":
      return <CommonPieChart payload={payload} />;
    default:
      return null;
  }
};

export default ChatChartRenderer;
