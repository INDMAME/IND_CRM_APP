export type ExpenseProjectOptionLike = {
  value?: string;
  Value?: string;
  projId?: string;
  ProjId?: string;
};

export type ExpenseProjectCatalogPage = {
  total?: number;
  Total?: number;
  items?: ExpenseProjectOptionLike[];
  Items?: ExpenseProjectOptionLike[];
};

const normalizeProjectId = (value: unknown): string => String(value ?? "").trim();

// Returns the canonical option id only when the requested project exists in the catalog.
export const resolveExistingExpenseProjectId = (
  requestedProjectId: unknown,
  options: ExpenseProjectOptionLike[] | null | undefined
): string => {
  const requested = normalizeProjectId(requestedProjectId);
  if (!requested || !Array.isArray(options)) return "";

  const normalizedRequested = requested.toUpperCase();
  for (const option of options) {
    const candidate = normalizeProjectId(option?.value ?? option?.Value ?? option?.projId ?? option?.ProjId);
    if (candidate && candidate.toUpperCase() === normalizedRequested) {
      return candidate;
    }
  }

  return "";
};

// Searches every reported catalog page and fails closed when validation is unavailable.
export const resolveExistingExpenseProjectIdFromPages = async (
  requestedProjectId: unknown,
  loadPage: (page: number, pageSize: number) => Promise<ExpenseProjectCatalogPage>,
  pageSize = 50
): Promise<string> => {
  const requested = normalizeProjectId(requestedProjectId);
  if (!requested) return "";

  let page = 1;
  let totalPages = 1;
  try {
    do {
      const response = await loadPage(page, pageSize);
      const resolvedProjectId = resolveExistingExpenseProjectId(
        requested,
        response?.items || response?.Items
      );
      if (resolvedProjectId) return resolvedProjectId;

      const total = Number(response?.total || response?.Total || 0);
      totalPages = total > 0 ? Math.max(1, Math.ceil(total / pageSize)) : 1;
      page += 1;
    } while (page <= totalPages);
  } catch {
    return "";
  }

  return "";
};
