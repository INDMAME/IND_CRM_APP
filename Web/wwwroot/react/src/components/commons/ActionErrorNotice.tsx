import { useEffect } from "react";
import { showActionError } from "../../services/actionFeedback.ts";
import { resolveActionError } from "../../utils/actionError.ts";

type Props = { error?: unknown; severity?: "error" | "warning" };

// Routes standalone feedback to the common popup while leaving source error state intact.
export default function ActionErrorNotice({ error, severity }: Props) {
  const details = resolveActionError(error);
  useEffect(() => {
    if (details.message) showActionError(details, severity ? { severity } : {});
  }, [details.message, details.traceId, details.errorCode, details.severity, severity]);
  return null;
}
