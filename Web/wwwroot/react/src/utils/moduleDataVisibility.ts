// Shared row returned by /api/crm/data-visibility/visible-users for owner visibility and mutation checks.
export type ModuleDataVisibilityVisibleUser = {
  alias: string;
  axUserId: string;
  crmUserId: string;
  name: string;
  source: string;
  mutationPolicy: string;
  mutationPolicyInt: number | null;
  mutationPolicyLabel: string;
  canMutate: boolean;
};

type RawVisibleUser = {
  alias?: unknown;
  Alias?: unknown;
  axUserId?: unknown;
  AxUserId?: unknown;
  crmUserId?: unknown;
  CrmUserId?: unknown;
  name?: unknown;
  Name?: unknown;
  source?: unknown;
  Source?: unknown;
  mutationPolicy?: unknown;
  MutationPolicy?: unknown;
  mutationPolicyInt?: unknown;
  MutationPolicyInt?: unknown;
  mutationPolicyLabel?: unknown;
  MutationPolicyLabel?: unknown;
  canMutate?: unknown;
  CanMutate?: unknown;
};

const safeText = (value: unknown): string => String(value ?? "").trim();

const parseMutationPolicyInt = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const parsed = Number(safeText(value));
  return Number.isFinite(parsed) ? parsed : null;
};

const parseCanMutate = (value: unknown): boolean => {
  if (typeof value === "boolean") return value;
  const normalized = safeText(value).toLowerCase();
  return normalized === "true" || normalized === "1";
};

export const normalizeOwnerAxUserId = (ownerAxUserId: unknown): string => safeText(ownerAxUserId).toUpperCase();

const normalizeVisibleUser = (item: RawVisibleUser): ModuleDataVisibilityVisibleUser | null => {
  const axUserId = safeText(item.axUserId ?? item.AxUserId);
  if (!axUserId) return null;

  return {
    alias: safeText(item.alias ?? item.Alias),
    axUserId,
    crmUserId: safeText(item.crmUserId ?? item.CrmUserId),
    name: safeText(item.name ?? item.Name) || axUserId,
    source: safeText(item.source ?? item.Source),
    mutationPolicy: safeText(item.mutationPolicy ?? item.MutationPolicy),
    mutationPolicyInt: parseMutationPolicyInt(item.mutationPolicyInt ?? item.MutationPolicyInt),
    mutationPolicyLabel: safeText(item.mutationPolicyLabel ?? item.MutationPolicyLabel),
    canMutate: parseCanMutate(item.canMutate ?? item.CanMutate),
  };
};

// Normalizes data-visibility rows and drops entries without an AX user id.
// Record-level checks must key ownership by the functional AX user, not by display text.
export const normalizeModuleDataVisibilityUsers = (source: unknown): ModuleDataVisibilityVisibleUser[] => {
  if (!Array.isArray(source)) return [];

  const seen = new Set<string>();
  return source
    .map((entry) => {
      if (!entry || typeof entry !== "object" || Array.isArray(entry)) return null;
      return normalizeVisibleUser(entry as RawVisibleUser);
    })
    .filter((entry): entry is ModuleDataVisibilityVisibleUser => !!entry)
    .filter((entry) => {
      const key = normalizeOwnerAxUserId(entry.axUserId);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
};

// Builds a case-insensitive owner lookup for visibility and mutation checks.
export const buildVisibleUserByOwnerMap = (
  users: ModuleDataVisibilityVisibleUser[]
): ReadonlyMap<string, ModuleDataVisibilityVisibleUser> => {
  const result = new Map<string, ModuleDataVisibilityVisibleUser>();
  for (const user of users) {
    const key = normalizeOwnerAxUserId(user.axUserId);
    if (key && !result.has(key)) {
      result.set(key, user);
    }
  }

  return result;
};

// Resolves the visible-user row that owns a record.
// Pass the record detail owner field here, preferably OwnerAxUserId from the API/AX contract.
export const getVisibleUserForOwner = (
  usersByOwnerAxUserId: ReadonlyMap<string, ModuleDataVisibilityVisibleUser>,
  ownerAxUserId: unknown
): ModuleDataVisibilityVisibleUser | null => {
  const key = normalizeOwnerAxUserId(ownerAxUserId);
  return key ? usersByOwnerAxUserId.get(key) || null : null;
};

// Uses the API-provided CanMutate flag for a record owner.
// Call this only after hasMutationPolicy(owner) is true so old contracts do not overblock the UI.
export const canMutateOwner = (
  usersByOwnerAxUserId: ReadonlyMap<string, ModuleDataVisibilityVisibleUser>,
  ownerAxUserId: unknown
): boolean => {
  return getVisibleUserForOwner(usersByOwnerAxUserId, ownerAxUserId)?.canMutate === true;
};

// Detects whether the endpoint returned the extended mutation policy fields.
// Without this contract, CanMutate may be false only because older AX did not return the column.
export const hasMutationPolicy = (user: ModuleDataVisibilityVisibleUser | null | undefined): boolean => {
  if (!user) return false;
  return !!safeText(user.mutationPolicy) ||
    user.mutationPolicyInt !== null ||
    !!safeText(user.mutationPolicyLabel);
};

// Formats one visible user for compact select options.
export const formatModuleVisibleUserLabel = (user: ModuleDataVisibilityVisibleUser): string => {
  const name = safeText(user.name);
  const axUserId = safeText(user.axUserId);
  if (name && axUserId && name.toUpperCase() !== axUserId.toUpperCase()) {
    return `${name} (${axUserId})`;
  }

  return name || axUserId;
};
