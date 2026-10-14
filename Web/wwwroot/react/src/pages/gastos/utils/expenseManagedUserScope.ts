const normalizeUserId = (value: unknown): string => String(value || "").trim();

// Compares AxUser identifiers with stable trimming and casing.
export const isSameExpenseUser = (left: unknown, right: unknown): boolean => {
  const normalizedLeft = normalizeUserId(left).toUpperCase();
  const normalizedRight = normalizeUserId(right).toUpperCase();
  return !!normalizedLeft && normalizedLeft === normalizedRight;
};

// Resolves the optional AxUser header override for expense sheet list calls.
// All-users mode relies on the current context header so AX returns own plus direct-subordinate sheets.
export const resolveExpenseListAxUserIdOverride = ({
  selectedManagedUserId,
  includeSubordinates,
}: {
  selectedManagedUserId: unknown;
  includeSubordinates: unknown;
}): string => {
  if (includeSubordinates === true) return "";
  return normalizeUserId(selectedManagedUserId);
};

// CRM identities decide ownership when both sides provide them; AX is the typed fallback.
export const isCurrentExpenseOwner = ({
  currentAxUserId,
  currentCrmUserId,
  recordOwnerAxUserId,
  recordOwnerCrmUserId,
}: {
  currentAxUserId: unknown;
  currentCrmUserId?: unknown;
  recordOwnerAxUserId?: unknown;
  recordOwnerCrmUserId?: unknown;
}): boolean => {
  const currentCrm = normalizeUserId(currentCrmUserId);
  const ownerCrm = normalizeUserId(recordOwnerCrmUserId);
  if (currentCrm && ownerCrm) return isSameExpenseUser(currentCrm, ownerCrm);
  return isSameExpenseUser(currentAxUserId, recordOwnerAxUserId);
};

// Resolves whether the current expense context is acting on another user's data.
export const isManagingOtherExpenseUser = ({
  canManageOtherUsers,
  currentAxUserId,
  selectedManagedUserId,
  isCreateMode = false,
}: {
  canManageOtherUsers: boolean;
  currentAxUserId: unknown;
  selectedManagedUserId: unknown;
  isCreateMode?: boolean;
}): boolean => {
  if (isCreateMode || !canManageOtherUsers) return false;

  const normalizedCurrentUserId = normalizeUserId(currentAxUserId);
  const normalizedSelectedManagedUserId = normalizeUserId(selectedManagedUserId);
  if (!normalizedCurrentUserId || !normalizedSelectedManagedUserId) return false;

  return !isSameExpenseUser(normalizedCurrentUserId, normalizedSelectedManagedUserId);
};

// Resolves the effective owner context for one expense record once detail data is available.
export const isManagingOtherExpenseRecord = ({
  currentAxUserId,
  currentCrmUserId,
  recordOwnerAxUserId,
  recordOwnerCrmUserId,
  isCreateMode = false,
}: {
  currentAxUserId: unknown;
  currentCrmUserId?: unknown;
  recordOwnerAxUserId?: unknown;
  recordOwnerCrmUserId?: unknown;
  isCreateMode?: boolean;
}): boolean => {
  if (isCreateMode) return false;
  return !isCurrentExpenseOwner({
    currentAxUserId,
    currentCrmUserId,
    recordOwnerAxUserId,
    recordOwnerCrmUserId,
  });
};
