const normalizeUserId = (value: unknown): string => String(value || "").trim();

// Compares AxUser identifiers with stable trimming and casing.
export const isSameExpenseUser = (left: unknown, right: unknown): boolean => {
  const normalizedLeft = normalizeUserId(left).toUpperCase();
  const normalizedRight = normalizeUserId(right).toUpperCase();
  return !!normalizedLeft && normalizedLeft === normalizedRight;
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
