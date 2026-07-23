const safeText = (value: unknown): string => String(value ?? "").trim();

const formatDisplayText = (value: string): string => value.toUpperCase();

// Builds a compact display label for a person when both name and AX id are available.
export const formatUserNameWithId = (name: unknown, axUserId: unknown): string => {
  const rawName = safeText(name);
  const normalizedName = formatDisplayText(rawName);
  const normalizedAxUserId = formatDisplayText(safeText(axUserId));
  if (rawName && normalizedAxUserId && rawName.toUpperCase() === normalizedAxUserId.toUpperCase()) {
    return normalizedAxUserId;
  }

  if (
    normalizedName &&
    normalizedAxUserId &&
    normalizedName.toUpperCase() !== normalizedAxUserId.toUpperCase()
  ) {
    return `${normalizedName} (${normalizedAxUserId})`;
  }

  return normalizedName || normalizedAxUserId;
};
