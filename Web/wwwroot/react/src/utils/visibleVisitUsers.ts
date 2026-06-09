export type DataVisibilityVisibleUser = {
  alias: string;
  axUserId: string;
  crmUserId?: string;
  name: string;
  source: string;
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
};

const safeText = (value: unknown): string => String(value || "").trim();

const normalizeVisibleUser = (item: RawVisibleUser): DataVisibilityVisibleUser | null => {
  const axUserId = safeText(item.axUserId ?? item.AxUserId);
  if (!axUserId) return null;

  return {
    alias: safeText(item.alias ?? item.Alias),
    axUserId,
    crmUserId: safeText(item.crmUserId ?? item.CrmUserId),
    name: safeText(item.name ?? item.Name) || axUserId,
    source: safeText(item.source ?? item.Source),
  };
};

// Normalizes visible-user API rows and drops entries without an AX user id.
export const normalizeVisibleVisitUsers = (source: unknown): DataVisibilityVisibleUser[] => {
  if (!Array.isArray(source)) return [];

  const seen = new Set<string>();
  return source
    .map((entry) => {
      if (!entry || typeof entry !== "object" || Array.isArray(entry)) return null;
      return normalizeVisibleUser(entry as RawVisibleUser);
    })
    .filter((entry): entry is DataVisibilityVisibleUser => !!entry)
    .filter((entry) => {
      const key = entry.axUserId.toUpperCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
};

// Formats one visible user for compact select options.
export const formatVisibleVisitUserLabel = (user: DataVisibilityVisibleUser): string => {
  const name = safeText(user.name);
  const axUserId = safeText(user.axUserId);
  if (name && axUserId && name.toUpperCase() !== axUserId.toUpperCase()) {
    return `${name} (${axUserId})`;
  }

  return name || axUserId;
};
