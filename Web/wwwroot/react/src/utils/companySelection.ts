type CompanySelectionCandidate = {
  companyId: string;
  isDefault?: boolean;
};

const normalizeCompanyId = (value: unknown): string => String(value || "").trim().toUpperCase();

const findCompanyMatch = (
  candidates: CompanySelectionCandidate[],
  requestedCompanyId: string
): CompanySelectionCandidate | null => {
  if (!requestedCompanyId) return null;

  for (const candidate of candidates) {
    if (normalizeCompanyId(candidate.companyId) === requestedCompanyId) {
      return candidate;
    }
  }

  return null;
};

// Resolves the effective company for API calls: manual selection wins only when it exists in the current context.
export const resolveEffectiveCompanyId = (
  selectedCompanyId: unknown,
  companies: CompanySelectionCandidate[],
  defaultCompanyId?: unknown
): string => {
  const normalizedSelectedCompanyId = normalizeCompanyId(selectedCompanyId);
  const normalizedDefaultCompanyId = normalizeCompanyId(defaultCompanyId);
  const normalizedCompanies = Array.isArray(companies)
    ? companies.filter((candidate) => normalizeCompanyId(candidate.companyId))
    : [];

  const selectedMatch = findCompanyMatch(normalizedCompanies, normalizedSelectedCompanyId);
  if (selectedMatch) {
    return selectedMatch.companyId;
  }

  const defaultMatch =
    findCompanyMatch(normalizedCompanies, normalizedDefaultCompanyId) ||
    normalizedCompanies.find((candidate) => candidate.isDefault === true) ||
    normalizedCompanies[0] ||
    null;

  return defaultMatch?.companyId || "";
};
