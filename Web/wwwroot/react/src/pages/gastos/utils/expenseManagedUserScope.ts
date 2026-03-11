const normalizeUserId = (value: unknown): string => String(value || "").trim();

// Compares AxUser identifiers with stable trimming and casing.
export const isSameExpenseUser = (left: unknown, right: unknown): boolean => {
  const normalizedLeft = normalizeUserId(left).toUpperCase();
  const normalizedRight = normalizeUserId(right).toUpperCase();
  return !!normalizedLeft && normalizedLeft === normalizedRight;
};

// Matches one expense owner id against the current user ids exposed by auth context.
const matchesCurrentExpenseIdentity = ({
  currentAxUserId,
  currentCrmUserId,
  recordOwnerUserId,
}: {
  currentAxUserId: unknown;
  currentCrmUserId?: unknown;
  recordOwnerUserId: unknown;
}): boolean => {
  const normalizedOwnerUserId = normalizeUserId(recordOwnerUserId);
  if (!normalizedOwnerUserId) return false;

  return (
    isSameExpenseUser(normalizedOwnerUserId, currentAxUserId) ||
    isSameExpenseUser(normalizedOwnerUserId, currentCrmUserId)
  );
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
  canManageOtherUsers,
  currentAxUserId,
  currentCrmUserId,
  selectedManagedUserId,
  recordOwnerUserId,
  isCreateMode = false,
}: {
  canManageOtherUsers: boolean;
  currentAxUserId: unknown;
  currentCrmUserId?: unknown;
  selectedManagedUserId: unknown;
  recordOwnerUserId: unknown;
  isCreateMode?: boolean;
}): boolean => {
  if (isCreateMode) return false;

  const normalizedCurrentAxUserId = normalizeUserId(currentAxUserId);
  const normalizedCurrentCrmUserId = normalizeUserId(currentCrmUserId);
  const normalizedRecordOwnerUserId = normalizeUserId(recordOwnerUserId);
  if (normalizedRecordOwnerUserId && (normalizedCurrentAxUserId || normalizedCurrentCrmUserId)) {
    return !matchesCurrentExpenseIdentity({
      currentAxUserId: normalizedCurrentAxUserId,
      currentCrmUserId: normalizedCurrentCrmUserId,
      recordOwnerUserId: normalizedRecordOwnerUserId,
    });
  }

  return isManagingOtherExpenseUser({
    canManageOtherUsers,
    currentAxUserId: normalizedCurrentAxUserId,
    selectedManagedUserId,
    isCreateMode,
  });
};
