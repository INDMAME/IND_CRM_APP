const safeText = (value: unknown): string => String(value ?? "").trim();

// Builds a compact display label for a person when both name and AX id are available.
export const formatUserNameWithId = (name: unknown, axUserId: unknown): string => {
  const normalizedName = safeText(name);
  const normalizedAxUserId = safeText(axUserId);
  if (
    normalizedName &&
    normalizedAxUserId &&
    normalizedName.toUpperCase() !== normalizedAxUserId.toUpperCase()
  ) {
    return `${normalizedName} (${normalizedAxUserId})`;
  }

  return normalizedName || normalizedAxUserId;
};
