import type { TablePayload } from "./chatMessageContract.ts";
import CommonDataTable from "./CommonDataTable.tsx";

type ChatTableRendererProps = {
  payload: TablePayload;
};

// Bridges a validated table payload into the shared table component.
const ChatTableRenderer = ({ payload }: ChatTableRendererProps) => {
  return <CommonDataTable payload={payload} />;
};

export default ChatTableRenderer;
