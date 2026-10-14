import { createRoot } from "react-dom/client";
import ConfirmModal from "../../components/commons/ConfirmModal.tsx";
import { useActionFeedbackHost } from "../../hooks/useActionFeedbackHost.ts";
import { indT } from "../../utils/indI18n.ts";

// Owns a single popup for failures from independent islands and legacy page helpers.
export const ActionFeedbackHost = () => {
  const { active, close } = useActionFeedbackHost();
  if (!active) return null;
  return <ConfirmModal open title={active.title || indT("Common_Error_Title", "Unable to complete the operation")}
    message="" error={active} errorTitle={active.title} confirmText={indT("Common_Close", "Close")} cancelText="" loadingText=""
    showCancel={false} onConfirm={close} onCancel={close} />;
};

const root = document.getElementById("indActionFeedbackRoot");
if (root) createRoot(root).render(<ActionFeedbackHost />);
