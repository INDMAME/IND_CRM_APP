import type { AuthManagedUser } from "../../../context/AuthContext.tsx";

export const EXPENSE_SHEETS_ALL_USERS_VALUE = "__expense_sheets_all_users__";

const normalizeUserId = (value: unknown): string => String(value || "").trim();

// Compares Ax user ids with stable trimming and casing.
export const isSameExpenseManagedUser = (left: unknown, right: unknown): boolean => {
  const normalizedLeft = normalizeUserId(left).toUpperCase();
  const normalizedRight = normalizeUserId(right).toUpperCase();
  return !!normalizedLeft && normalizedLeft === normalizedRight;
};

// Ensures the current user remains selectable together with direct subordinates.
export const ensureCurrentExpenseManagedUserInList = (
  users: AuthManagedUser[],
  currentAxUserId: unknown
): AuthManagedUser[] => {
  const normalizedCurrent = normalizeUserId(currentAxUserId);
  const normalizedUsers = Array.isArray(users) ? users : [];
  if (!normalizedCurrent) return normalizedUsers;
  if (normalizedUsers.some((entry) => isSameExpenseManagedUser(entry.axUserId, normalizedCurrent))) {
    return normalizedUsers;
  }

  return [
    {
      crmUserId: normalizedCurrent,
      axUserId: normalizedCurrent,
      name: normalizedCurrent,
    },
    ...normalizedUsers,
  ];
};

// Resolves a valid user selection from the available user list and current context.
export const resolveExpenseManagedUserSelection = (
  requestedUserId: unknown,
  currentAxUserId: unknown,
  users: AuthManagedUser[]
): string => {
  const normalizedRequested = normalizeUserId(requestedUserId);
  const normalizedCurrent = normalizeUserId(currentAxUserId);

  if (normalizedRequested) {
    const exact = users.find((entry) => isSameExpenseManagedUser(entry.axUserId, normalizedRequested));
    if (exact) return exact.axUserId;
  }

  if (normalizedCurrent) {
    const self = users.find((entry) => isSameExpenseManagedUser(entry.axUserId, normalizedCurrent));
    return self?.axUserId || normalizedCurrent;
  }

  return "";
};

type NormalizeExpenseManagedUserFilterStateArgs = {
  managedUserId: unknown;
  includeSubordinates: unknown;
  currentAxUserId: unknown;
  users: AuthManagedUser[];
  canManageOtherUsers: boolean;
};

// Keeps user filter state aligned with current context and subordinate access.
export const normalizeExpenseManagedUserFilterState = ({
  managedUserId,
  includeSubordinates,
  currentAxUserId,
  users,
  canManageOtherUsers,
}: NormalizeExpenseManagedUserFilterStateArgs): { managedUserId: string; includeSubordinates: boolean } => {
  const normalizedUsers = ensureCurrentExpenseManagedUserInList(users, currentAxUserId);
  const resolvedManagedUserId = resolveExpenseManagedUserSelection(managedUserId, currentAxUserId, normalizedUsers);

  return {
    managedUserId: resolvedManagedUserId,
    includeSubordinates: canManageOtherUsers && includeSubordinates === true,
  };
};

type NormalizeExpenseManagedUserFilterChangeArgs = {
  requestedValue: unknown;
  currentAxUserId: unknown;
  users: AuthManagedUser[];
  canManageOtherUsers: boolean;
};

// Converts the user filter UI selection into request state.
export const normalizeExpenseManagedUserFilterChange = ({
  requestedValue,
  currentAxUserId,
  users,
  canManageOtherUsers,
}: NormalizeExpenseManagedUserFilterChangeArgs): { managedUserId: string; includeSubordinates: boolean } => {
  const normalizedRequested = normalizeUserId(requestedValue);
  if (canManageOtherUsers && normalizedRequested === EXPENSE_SHEETS_ALL_USERS_VALUE) {
    const normalizedUsers = ensureCurrentExpenseManagedUserInList(users, currentAxUserId);
    const currentManagedUserId = resolveExpenseManagedUserSelection(currentAxUserId, currentAxUserId, normalizedUsers);
    return {
      managedUserId: currentManagedUserId,
      includeSubordinates: true,
    };
  }

  return normalizeExpenseManagedUserFilterState({
    managedUserId: normalizedRequested,
    includeSubordinates: false,
    currentAxUserId,
    users,
    canManageOtherUsers,
  });
};

// Resolves the visible selector value for the current request state.
export const resolveExpenseManagedUserSelectValue = ({
  managedUserId,
  includeSubordinates,
  currentAxUserId,
  users,
  canManageOtherUsers,
}: NormalizeExpenseManagedUserFilterStateArgs): string => {
  const normalized = normalizeExpenseManagedUserFilterState({
    managedUserId,
    includeSubordinates,
    currentAxUserId,
    users,
    canManageOtherUsers,
  });

  return normalized.includeSubordinates ? EXPENSE_SHEETS_ALL_USERS_VALUE : normalized.managedUserId;
};

// Hides the user filter summary when the list is showing the current user's own sheets.
export const shouldShowExpenseManagedUserSummary = ({
  managedUserId,
  includeSubordinates,
  currentAxUserId,
}: {
  managedUserId: unknown;
  includeSubordinates: boolean;
  currentAxUserId: unknown;
}): boolean => {
  if (includeSubordinates) return true;
  const normalizedManagedUserId = normalizeUserId(managedUserId);
  const normalizedCurrent = normalizeUserId(currentAxUserId);
  if (!normalizedManagedUserId) return false;
  if (!normalizedCurrent) return true;
  return !isSameExpenseManagedUser(normalizedManagedUserId, normalizedCurrent);
};
