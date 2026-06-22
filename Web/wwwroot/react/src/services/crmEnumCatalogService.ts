import { fetchJson } from "./apiService.ts";
import type {
  CrmEnumCatalogDto,
  CrmEnumCatalogResponse,
  CrmEnumOptionDto,
  CrmEnumSelectOption,
} from "../types/crmEnumCatalog.ts";

const DEFAULT_APP_CODE = "CRM";

const safeText = (value: unknown): string => String(value ?? "").trim();

const normalizeName = (value: unknown): string => safeText(value).toUpperCase();

const readCatalogItems = (response: CrmEnumCatalogResponse): CrmEnumCatalogDto[] => {
  return response.items ?? response.Items ?? [];
};

const readOptions = (catalog: CrmEnumCatalogDto): CrmEnumOptionDto[] => {
  return catalog.options ?? catalog.Options ?? [];
};

const readFound = (catalog: CrmEnumCatalogDto): boolean => {
  return catalog.found ?? catalog.Found ?? false;
};

const readAxEnumName = (catalog: CrmEnumCatalogDto): string => {
  return safeText(catalog.axEnumName ?? catalog.AxEnumName);
};

const readOptionValue = (option: CrmEnumOptionDto): number | null => {
  const raw = option.value ?? option.Value;
  return typeof raw === "number" && Number.isFinite(raw) ? raw : null;
};

const readOptionSortOrder = (option: CrmEnumOptionDto): number | null => {
  const raw = option.sortOrder ?? option.SortOrder;
  return typeof raw === "number" && Number.isFinite(raw) ? raw : null;
};

const readOptionLabel = (option: CrmEnumOptionDto): string => {
  return safeText(option.label ?? option.Label);
};

const readOptionActive = (option: CrmEnumOptionDto): boolean => {
  return option.active ?? option.Active ?? false;
};

const compareEnumOptions = (left: CrmEnumSelectOption, right: CrmEnumSelectOption): number => {
  const leftSort = readOptionSortOrder(left.option);
  const rightSort = readOptionSortOrder(right.option);
  const leftRank = leftSort === null ? Number.MAX_SAFE_INTEGER : leftSort;
  const rightRank = rightSort === null ? Number.MAX_SAFE_INTEGER : rightSort;
  if (leftRank !== rightRank) return leftRank - rightRank;
  return left.numericValue - right.numericValue;
};

// Fetches the enum catalog by AX enum name through the local MVC proxy.
export const fetchCrmEnumCatalogByName = async (
  axEnumNames: string[] = [],
  appCode = DEFAULT_APP_CODE
): Promise<CrmEnumCatalogDto[]> => {
  const query = new URLSearchParams();
  query.set("appCode", safeText(appCode) || DEFAULT_APP_CODE);
  const names = axEnumNames.map((name) => safeText(name)).filter(Boolean);
  if (names.length > 0) {
    query.set("axEnumNames", names.join(","));
  }

  const response = await fetchJson<CrmEnumCatalogResponse>(`/api/crm/enums/by-name?${query.toString()}`);
  return readCatalogItems(response);
};

// Returns select options for one AX enum using Option.Value and Option.Label.
export const getCrmEnumOptionsByName = (
  catalog: CrmEnumCatalogDto[],
  axEnumName: string,
  fallback: CrmEnumSelectOption[] = []
): CrmEnumSelectOption[] => {
  const targetName = normalizeName(axEnumName);
  if (!targetName || !Array.isArray(catalog)) return fallback;

  const match = catalog.find((item) => normalizeName(readAxEnumName(item)) === targetName);
  if (!match || !readFound(match)) return fallback;

  const options = readOptions(match)
    .map((option) => {
      const numericValue = readOptionValue(option);
      const label = readOptionLabel(option);
      if (numericValue === null || !label || !readOptionActive(option)) return null;

      return {
        value: String(numericValue),
        text: label,
        numericValue,
        option,
      };
    })
    .filter((option): option is CrmEnumSelectOption => option !== null)
    .sort(compareEnumOptions);

  return options.length > 0 ? options : fallback;
};

// Builds a map keyed by AxEnumName for consumers that need several catalogs.
export const getCrmEnumOptionsMap = (
  catalog: CrmEnumCatalogDto[],
  axEnumNames: string[]
): Map<string, CrmEnumSelectOption[]> => {
  const result = new Map<string, CrmEnumSelectOption[]>();
  for (const name of axEnumNames) {
    result.set(name, getCrmEnumOptionsByName(catalog, name));
  }
  return result;
};
