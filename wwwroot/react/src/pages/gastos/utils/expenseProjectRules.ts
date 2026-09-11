import { safeText } from "./expenseUiUtils.ts";

type NewExpenseLineProjectCandidateArgs = {
  defaultLineProjectId?: unknown;
  headerProjectId?: unknown;
  serverDefaultProvided?: boolean;
};

// Detects the additive AX default even when the eligible header project is intentionally blank.
export const hasServerExpenseLineProjectDefault = (sheet: unknown): boolean => {
  if (!sheet || typeof sheet !== "object") return false;
  const source = sheet as { DefaultLineProjId?: unknown; defaultLineProjId?: unknown };
  return source.DefaultLineProjId != null || source.defaultLineProjId != null;
};

// Uses the AX header-derived default and keeps a header-only fallback for legacy responses.
export const resolveNewExpenseLineProjectCandidate = ({
  defaultLineProjectId,
  headerProjectId,
  serverDefaultProvided = false,
}: NewExpenseLineProjectCandidateArgs): string => {
  if (serverDefaultProvided) {
    return safeText(defaultLineProjectId);
  }

  return safeText(headerProjectId);
};
