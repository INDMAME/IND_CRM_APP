import { formatUserNameWithId } from "./userLabels.ts";

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

export type ModuleOwnerMutationAccessReason =
  | "allowed_current_owner"
  | "allowed_same_as_visibility"
  | "allowed_module_business_rules"
  | "blocked_missing_owner"
  | "blocked_missing_viewer"
  | "blocked_visibility_loading"
  | "blocked_owner_not_visible"
  | "blocked_missing_policy"
  | "blocked_restricted_policy"
  | "blocked_can_mutate_false";

export type ModuleOwnerMutationAccess = {
  canMutate: boolean;
  isCurrentOwner: boolean;
  ready: boolean;
  owner: ModuleDataVisibilityVisibleUser | null;
  reason: ModuleOwnerMutationAccessReason;
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

const normalizePolicyToken = (value: unknown): string => {
  return safeText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
};

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

export const isSameAsVisibilityMutationPolicy = (
  user: ModuleDataVisibilityVisibleUser | null | undefined
): boolean => {
  if (!user) return false;
  if (user.mutationPolicyInt === 1) return true;

  const policy = normalizePolicyToken(user.mutationPolicy);
  const label = normalizePolicyToken(user.mutationPolicyLabel);
  return policy === "sameasvisibility" ||
    policy === "igualquevisibilidad" ||
    policy === "igualvisibilidad" ||
    label === "sameasvisibility" ||
    label === "igualquevisibilidad" ||
    label === "igualvisibilidad";
};

export const isModuleBusinessRulesMutationPolicy = (
  user: ModuleDataVisibilityVisibleUser | null | undefined
): boolean => {
  if (!user) return false;
  if (user.mutationPolicyInt === 2) return true;

  const policy = normalizePolicyToken(user.mutationPolicy);
  const label = normalizePolicyToken(user.mutationPolicyLabel);
  return policy === "modulebusinessrules" ||
    policy === "modulebusinessrule" ||
    policy === "reglasdelmodulo" ||
    policy === "reglasmodulo" ||
    label === "modulebusinessrules" ||
    label === "modulebusinessrule" ||
    label === "reglasdelmodulo" ||
    label === "reglasmodulo";
};

export const isOwnOnlyMutationPolicy = (
  user: ModuleDataVisibilityVisibleUser | null | undefined
): boolean => {
  if (!user) return false;
  if (user.mutationPolicyInt === 0) return true;

  const policy = normalizePolicyToken(user.mutationPolicy);
  const label = normalizePolicyToken(user.mutationPolicyLabel);
  return policy === "ownonly" ||
    policy === "solopropios" ||
    policy === "propios" ||
    label === "ownonly" ||
    label === "solopropios" ||
    label === "propios";
};

// Detects whether the endpoint returned the extended mutation policy fields.
// Without this contract, CanMutate may be false only because older AX did not return the column.
export const hasMutationPolicy = (user: ModuleDataVisibilityVisibleUser | null | undefined): boolean => {
  if (!user) return false;
  return !!safeText(user.mutationPolicy) ||
    user.mutationPolicyInt !== null ||
    !!safeText(user.mutationPolicyLabel);
};

export type ResolveModuleOwnerMutationAccessArgs = {
  usersByOwnerAxUserId: ReadonlyMap<string, ModuleDataVisibilityVisibleUser>;
  ownerAxUserId: unknown;
  viewerAxUserId?: unknown;
  visibleUsersReady?: boolean;
};

// Resolves owner mutation access with a restrictive default.
// Foreign-owner mutation needs a policy that delegates beyond own records plus CanMutate=true.
export const resolveModuleOwnerMutationAccess = ({
  usersByOwnerAxUserId,
  ownerAxUserId,
  viewerAxUserId,
  visibleUsersReady = true,
}: ResolveModuleOwnerMutationAccessArgs): ModuleOwnerMutationAccess => {
  const ownerKey = normalizeOwnerAxUserId(ownerAxUserId);
  const viewerKey = normalizeOwnerAxUserId(viewerAxUserId);

  if (!ownerKey) {
    return {
      canMutate: false,
      isCurrentOwner: false,
      ready: true,
      owner: null,
      reason: "blocked_missing_owner",
    };
  }

  if (!viewerKey) {
    return {
      canMutate: false,
      isCurrentOwner: false,
      ready: true,
      owner: null,
      reason: "blocked_missing_viewer",
    };
  }

  const owner = getVisibleUserForOwner(usersByOwnerAxUserId, ownerAxUserId);
  const isCurrentOwner = ownerKey === viewerKey;
  if (isCurrentOwner) {
    return {
      canMutate: true,
      isCurrentOwner: true,
      ready: true,
      owner,
      reason: "allowed_current_owner",
    };
  }

  if (!visibleUsersReady) {
    return {
      canMutate: false,
      isCurrentOwner: false,
      ready: false,
      owner: null,
      reason: "blocked_visibility_loading",
    };
  }

  if (!owner) {
    return {
      canMutate: false,
      isCurrentOwner: false,
      ready: true,
      owner: null,
      reason: "blocked_owner_not_visible",
    };
  }

  if (!hasMutationPolicy(owner)) {
    return {
      canMutate: false,
      isCurrentOwner: false,
      ready: true,
      owner,
      reason: "blocked_missing_policy",
    };
  }

  const usesSameAsVisibility = isSameAsVisibilityMutationPolicy(owner);
  const usesModuleBusinessRules = isModuleBusinessRulesMutationPolicy(owner);
  if (!usesSameAsVisibility && !usesModuleBusinessRules) {
    return {
      canMutate: false,
      isCurrentOwner: false,
      ready: true,
      owner,
      reason: "blocked_restricted_policy",
    };
  }

  if (owner.canMutate !== true) {
    return {
      canMutate: false,
      isCurrentOwner: false,
      ready: true,
      owner,
      reason: "blocked_can_mutate_false",
    };
  }

  return {
    canMutate: true,
    isCurrentOwner: false,
    ready: true,
    owner,
    reason: usesModuleBusinessRules ? "allowed_module_business_rules" : "allowed_same_as_visibility",
  };
};

// Resolves mutation for the owner using policy fields before trusting CanMutate.
export const canMutateOwner = (
  usersByOwnerAxUserId: ReadonlyMap<string, ModuleDataVisibilityVisibleUser>,
  ownerAxUserId: unknown,
  viewerAxUserId?: unknown
): boolean => {
  return resolveModuleOwnerMutationAccess({
    usersByOwnerAxUserId,
    ownerAxUserId,
    viewerAxUserId,
  }).canMutate;
};

// Formats one visible user for compact select options.
export const formatModuleVisibleUserLabel = (user: ModuleDataVisibilityVisibleUser): string => {
  return formatUserNameWithId(user.name, user.axUserId);
};
