import ConfirmModal from "../../../components/commons/ConfirmModal.tsx";
import type { ActionError } from "../../../utils/actionError.ts";
import { indT } from "../../../utils/indI18n.ts";

type Props = { error: ActionError; onClose: () => void; onRetry?: () => void };

// Uses the same confirmation popup for ticket failures while preserving partial-upload recovery.
export default function ExpenseTicketErrorModal({ error, onClose, onRetry }: Props) {
  return <ConfirmModal
    open={!!error}
    title={indT("Common_Error_Title", "Unable to complete the operation")}
    message=""
    error={error}
    confirmText={onRetry ? indT("ExpenseSheets_NewTicket_RetryUpload", "Retry upload") : indT("Common_Close", "Close")}
    cancelText={indT("Common_Close", "Close")}
    loadingText={indT("Common_Loading", "Loading")}
    showCancel={!!onRetry}
    onConfirm={onRetry || onClose}
    onCancel={onClose}
  />;
}
