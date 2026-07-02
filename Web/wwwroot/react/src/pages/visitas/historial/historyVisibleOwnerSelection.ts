import type { ModuleDataVisibilityVisibleUser } from "../../../utils/moduleDataVisibility.ts";
import { normalizeOwnerAxUserId } from "../../../utils/moduleDataVisibility.ts";

export const HISTORY_VISIBLE_OWNER_ALL_VALUE = "__history_visible_owner_all__";

const normalizeUserId = (value: unknown): string => String(value || "").trim();

// Compares visit owner Ax user ids with the same normalization used by record visibility.
export const isSameHistoryVisibleOwner = (left: unknown, right: unknown): boolean => {
  const normalizedLeft = normalizeOwnerAxUserId(left);
  const normalizedRight = normalizeOwnerAxUserId(right);
  return !!normalizedLeft && normalizedLeft === normalizedRight;
};

// Keeps the logged Ax user available when the visibility endpoint only returns subordinates.
export const ensureCurrentHistoryVisibleOwnerInList = (
  users: ModuleDataVisibilityVisibleUser[],
  currentAxUserId: unknown
): ModuleDataVisibilityVisibleUser[] => {
  const normalizedCurrent = normalizeUserId(currentAxUserId);
  const normalizedUsers = Array.isArray(users) ? users : [];
  if (!normalizedCurrent) return normalizedUsers;
  if (normalizedUsers.some((entry) => isSameHistoryVisibleOwner(entry.axUserId, normalizedCurrent))) {
    return normalizedUsers;
  }

  return [
    {
      alias: normalizedCurrent,
      axUserId: normalizedCurrent,
      crmUserId: "",
      name: normalizedCurrent,
      source: "CurrentUserFallback",
      mutationPolicy: "",
      mutationPolicyInt: null,
      mutationPolicyLabel: "",
      canMutate: true,
    },
    ...normalizedUsers,
  ];
};

// Detects whether the current user has at least one visible subordinate owner.
export const hasHistoryVisibleSubordinates = (
  users: ModuleDataVisibilityVisibleUser[],
  currentAxUserId: unknown
): boolean => {
  const normalizedCurrent = normalizeOwnerAxUserId(currentAxUserId);
  if (!normalizedCurrent) return users.length > 1;

  return users.some((entry) => {
    const ownerId = normalizeOwnerAxUserId(entry.axUserId);
    return !!ownerId && ownerId !== normalizedCurrent;
  });
};

// Resolves a concrete owner id from a requested value and the available visit owner list.
export const resolveHistoryVisibleOwnerSelection = (
  requestedOwnerAxUserId: unknown,
  currentAxUserId: unknown,
  users: ModuleDataVisibilityVisibleUser[]
): string => {
  const normalizedRequested = normalizeUserId(requestedOwnerAxUserId);
  const normalizedCurrent = normalizeUserId(currentAxUserId);

  if (normalizedRequested && normalizedRequested !== HISTORY_VISIBLE_OWNER_ALL_VALUE) {
    const exact = users.find((entry) => isSameHistoryVisibleOwner(entry.axUserId, normalizedRequested));
    if (exact) return exact.axUserId;
  }

  if (normalizedCurrent) {
    const self = users.find((entry) => isSameHistoryVisibleOwner(entry.axUserId, normalizedCurrent));
    return self?.axUserId || normalizedCurrent;
  }

  return "";
};

type HistoryVisibleOwnerResolutionArgs = {
  selectedOwnerAxUserId: unknown;
  currentAxUserId: unknown;
  users: ModuleDataVisibilityVisibleUser[];
  canManageVisibleOwners: boolean;
};

// Resolves the value shown by the filter input.
export const resolveHistoryVisibleOwnerSelectValue = ({
  selectedOwnerAxUserId,
  currentAxUserId,
  users,
  canManageVisibleOwners,
}: HistoryVisibleOwnerResolutionArgs): string => {
  if (canManageVisibleOwners) {
    const normalizedSelected = normalizeUserId(selectedOwnerAxUserId);
    if (normalizedSelected && normalizedSelected !== HISTORY_VISIBLE_OWNER_ALL_VALUE) {
      const exact = users.find((entry) => isSameHistoryVisibleOwner(entry.axUserId, normalizedSelected));
      if (exact) return exact.axUserId;
    }

    return HISTORY_VISIBLE_OWNER_ALL_VALUE;
  }

  return resolveHistoryVisibleOwnerSelection(selectedOwnerAxUserId, currentAxUserId, users);
};

// Resolves the owner id that must be sent to the activities API.
export const resolveHistoryEffectiveOwnerAxUserId = ({
  selectedOwnerAxUserId,
  currentAxUserId,
  users,
  canManageVisibleOwners,
}: HistoryVisibleOwnerResolutionArgs): string => {
  if (canManageVisibleOwners) {
    const normalizedSelected = normalizeUserId(selectedOwnerAxUserId);
    if (!normalizedSelected || normalizedSelected === HISTORY_VISIBLE_OWNER_ALL_VALUE) return "";

    const exact = users.find((entry) => isSameHistoryVisibleOwner(entry.axUserId, normalizedSelected));
    return exact?.axUserId || "";
  }

  return resolveHistoryVisibleOwnerSelection(selectedOwnerAxUserId, currentAxUserId, users);
};
