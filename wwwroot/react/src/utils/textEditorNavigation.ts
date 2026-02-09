import { setSessionValueWithExpiry } from "./sessionExpiry.ts";
import { primeTextEditorValue, setTextEditorReturnUrl } from "./textEditor.ts";

type NavigateToTextEditorFieldOptions = {
  fieldId: string;
  fieldLabel: string;
  fieldValue: string;
  allowEdit?: boolean;
  readOnly?: boolean;
  editModeKey?: string;
  editModeReturnTtlMs?: number;
  beforeNavigate?: () => void;
};

// Builds and navigates to the shared text editor route for large text fields.
export const navigateToTextEditorField = ({
  fieldId,
  fieldLabel,
  fieldValue,
  allowEdit = true,
  readOnly,
  editModeKey,
  editModeReturnTtlMs,
  beforeNavigate,
}: NavigateToTextEditorFieldOptions) => {
  const safeId = String(fieldId || "").trim();
  const safeLabel = String(fieldLabel || "").trim();
  if (!safeId || !safeLabel) return false;

  // Prime editor state without putting large payloads in the URL.
  primeTextEditorValue(safeId, String(fieldValue || ""));

  beforeNavigate?.();

  const returnUrl = `${window.location.pathname}${window.location.search || ""}`;
  setTextEditorReturnUrl(safeId, returnUrl);

  const safeEditModeKey = String(editModeKey || "").trim();
  if (safeEditModeKey && editModeReturnTtlMs && editModeReturnTtlMs > 0) {
    setSessionValueWithExpiry(`${safeEditModeKey}_return`, "1", editModeReturnTtlMs);
  }

  const queryParts = [
    `fieldId=${encodeURIComponent(safeId)}`,
    `fieldLabel=${encodeURIComponent(safeLabel)}`,
    `returnUrl=${encodeURIComponent(returnUrl)}`,
    `allowEdit=${allowEdit ? "1" : "0"}`,
  ];

  if (typeof readOnly === "boolean") {
    queryParts.push(`readOnly=${readOnly ? "1" : "0"}`);
  }

  if (safeEditModeKey) {
    queryParts.push(`editModeKey=${encodeURIComponent(safeEditModeKey)}`);
  }

  const url = `/TextEditorReact/EditField?${queryParts.join("&")}`;

  window.__indBypassNavigationGuardOnce?.();
  window.location.href = url;
  return true;
};
