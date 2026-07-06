import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseGastoTypeCode } from "../expenseTypes.ts";
import { mapWindowEnumOptions, type ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";

type GastoTypeFallbackOption = {
  value: ExpenseGastoTypeCode;
  labelKey: string;
  fallback: string;
};

const VISIBLE_EXPENSE_GASTO_TYPE_CODES: ExpenseGastoTypeCode[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 14, 19, 20];

export const FALLBACK_EXPENSE_GASTO_TYPE_CODES: ExpenseGastoTypeCode[] = [...VISIBLE_EXPENSE_GASTO_TYPE_CODES];

const VISIBLE_EXPENSE_GASTO_TYPE_CODE_SET = new Set<ExpenseGastoTypeCode>(VISIBLE_EXPENSE_GASTO_TYPE_CODES);

const FALLBACK_EXPENSE_GASTO_TYPE_OPTIONS: GastoTypeFallbackOption[] = [
  { value: 0, labelKey: "Enum_None", fallback: "None" },
  { value: 1, labelKey: "Enum_GastoType_Peaje", fallback: "Peajes" },
  { value: 2, labelKey: "Enum_GastoType_Parking", fallback: "Parking" },
  { value: 3, labelKey: "Enum_GastoType_Km", fallback: "Km" },
  { value: 4, labelKey: "Enum_GastoType_Desayuno", fallback: "Desayuno" },
  { value: 5, labelKey: "Enum_GastoType_Comida", fallback: "Comida" },
  { value: 6, labelKey: "Enum_GastoType_Cena", fallback: "Cena" },
  { value: 7, labelKey: "Enum_GastoType_Hotel", fallback: "Hotel" },
  { value: 8, labelKey: "Enum_GastoType_Varios", fallback: "Varios" },
  { value: 9, labelKey: "Enum_GastoType_MontajeNacional", fallback: "Montaje Nacional" },
  { value: 10, labelKey: "Enum_GastoType_MontajeNacionalFestivo", fallback: "Montaje Nacional Festivo" },
  { value: 11, labelKey: "Enum_GastoType_MontajeInternacional", fallback: "Montaje Internacional" },
  { value: 12, labelKey: "Enum_GastoType_MontajeInternacionalFestivo", fallback: "Montaje Internacional Festivo" },
  { value: 13, labelKey: "Enum_GastoType_DiaViajeNacional", fallback: "Dia de Viaje Nacional" },
  { value: 14, labelKey: "Enum_GastoType_Taxi", fallback: "Taxi" },
  { value: 15, labelKey: "Enum_GastoType_DiaViajeFestivoNacional", fallback: "Dia Viaje Festivo Nacional" },
  { value: 16, labelKey: "Enum_GastoType_DiaViajeInternacional", fallback: "Dia Viaje Internacional" },
  { value: 17, labelKey: "Enum_GastoType_DiaViajeFestivoInternacional", fallback: "Dia Viaje Festivo Internacional" },
  { value: 18, labelKey: "Enum_GastoType_Horas", fallback: "Horas" },
  { value: 19, labelKey: "Enum_GastoType_Propinas", fallback: "Propinas" },
  { value: 20, labelKey: "Enum_GastoType_Gasolina", fallback: "Gasolina" },
];

const toIntegerGastoTypeCode = (value: unknown): ExpenseGastoTypeCode | null => {
  if (value === null || value === undefined) return null;
  if (typeof value === "string" && !value.trim()) return null;

  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : null;
};

// Keeps expense type selectors aligned with the visible CRMGastoType business set.
const isVisibleGastoTypeCode = (code: ExpenseGastoTypeCode): boolean => VISIBLE_EXPENSE_GASTO_TYPE_CODE_SET.has(code);

const getCatalogSource = () => {
  if (typeof window === "undefined" || !Array.isArray(window.__EXPENSE_GASTO_TYPES__)) {
    return [];
  }

  return window.__EXPENSE_GASTO_TYPES__;
};

const getCatalogOptions = (): ExpenseSelectOption[] => {
  const seen = new Set<string>();
  const options: ExpenseSelectOption[] = [];
  const sourceOptions = mapWindowEnumOptions(getCatalogSource());

  for (const option of sourceOptions) {
    const code = toIntegerGastoTypeCode(option.value);
    if (code === null) continue;
    if (!isVisibleGastoTypeCode(code)) continue;

    const key = String(code);
    if (seen.has(key)) continue;
    seen.add(key);
    options.push({
      value: key,
      text: option.text.trim(),
    });
  }

  return options;
};

const getFallbackOptions = (): ExpenseSelectOption[] => {
  return FALLBACK_EXPENSE_GASTO_TYPE_OPTIONS
    .filter((option) => isVisibleGastoTypeCode(option.value))
    .map((option) => ({
      value: String(option.value),
      text: indT(option.labelKey, option.fallback),
    }));
};

// Returns catalog options in backend SortOrder order, falling back only when the catalog is unavailable.
export const getExpenseGastoTypeOptions = (): ExpenseSelectOption[] => {
  const catalogOptions = getCatalogOptions();
  return catalogOptions.length > 0 ? catalogOptions : getFallbackOptions();
};

// Builds the active value set used by filters, caches, and request payload guards.
export const getExpenseGastoTypeCodeSet = ({
  includeFallbackIfEmpty = true,
}: {
  includeFallbackIfEmpty?: boolean;
} = {}): Set<ExpenseGastoTypeCode> => {
  const catalogOptions = getCatalogOptions();
  if (catalogOptions.length > 0) {
    return new Set(
      catalogOptions
        .map((option) => toIntegerGastoTypeCode(option.value))
        .filter((code): code is ExpenseGastoTypeCode => code !== null)
    );
  }

  return includeFallbackIfEmpty ? new Set(FALLBACK_EXPENSE_GASTO_TYPE_CODES) : new Set();
};

// Converts unknown input to a valid CRMGastoType value from the active catalog.
export const toExpenseGastoTypeCode = (
  value: unknown,
  {
    allowNone = true,
    includeFallbackIfEmpty = true,
  }: {
    allowNone?: boolean;
    includeFallbackIfEmpty?: boolean;
  } = {}
): ExpenseGastoTypeCode | null => {
  const code = toIntegerGastoTypeCode(value);
  if (code === null) return null;
  if (!allowNone && code === 0) return null;

  return getExpenseGastoTypeCodeSet({ includeFallbackIfEmpty }).has(code) ? code : null;
};

// Checks whether a value can be used as a CRMGastoType business value.
export const isExpenseGastoTypeCode = (
  value: unknown,
  options?: {
    allowNone?: boolean;
    includeFallbackIfEmpty?: boolean;
  }
): boolean => {
  return toExpenseGastoTypeCode(value, options) !== null;
};

// Resolves a positive default category for generated ticket-to-sheet lines.
export const getDefaultExpenseGastoTypeCode = (preferred: ExpenseGastoTypeCode = 8): ExpenseGastoTypeCode => {
  const preferredCode = toExpenseGastoTypeCode(preferred, { allowNone: false });
  if (preferredCode !== null) return preferredCode;

  for (const option of getExpenseGastoTypeOptions()) {
    const code = toExpenseGastoTypeCode(option.value, { allowNone: false });
    if (code !== null) return code;
  }

  return preferred;
};

// Formats a defensive validation message using the active catalog values.
export const formatExpenseGastoTypeAllowedMessage = ({ allowNone = true }: { allowNone?: boolean } = {}): string => {
  const codes = Array.from(getExpenseGastoTypeCodeSet())
    .filter((code) => allowNone || code !== 0)
    .join(",");

  return `gastoType must be one of: ${codes}.`;
};
