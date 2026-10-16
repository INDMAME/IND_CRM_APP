import { useEffect } from "react";
import { showActionError } from "../../services/actionFeedback.ts";
import { resolveActionError } from "../../utils/actionError.ts";
import { indT } from "../../utils/indI18n.ts";
import { useFloatingLayerActive } from "./FloatingLayerContext.ts";

type Props = { error?: unknown; severity?: "error" | "warning" };

// Keeps modal feedback inside its active dialog and preserves page-level popups.
export default function ActionErrorNotice({ error, severity }: Props) {
  const withinDialog = useFloatingLayerActive();
  const details = resolveActionError(error);
  useEffect(() => {
    if (!withinDialog && details.message) showActionError(details, severity ? { severity } : {});
  }, [withinDialog, details.message, details.traceId, details.errorCode, details.severity, severity]);
  if (withinDialog && details.message) {
    return <div className="history-filter-dialog__error" role="alert">
      <div>{details.message}</div>
      {details.traceId && <div className="mt-1 text-xs">
        {indT("Common_TraceId", "Trace ID")}: <code className="select-text break-all">{details.traceId}</code>
      </div>}
    </div>;
  }
  return null;
}
