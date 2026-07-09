import {
  ApiFetchError,
  indT
} from "./chunk-PNIKV5DC.js";
import {
  getSessionValueWithExpiry,
  removeSessionValueWithExpiry,
  setSessionValueWithExpiry
} from "./chunk-6HGCHSZG.js";

// Web/wwwroot/react/src/pages/gastos/utils/expenseSelectOptions.ts
var normalizeExpenseOptionValue = (value) => {
  return String(value ?? "").trim();
};
var mapWindowEnumOptions = (source) => {
  return source.map((item) => ({
    value: normalizeExpenseOptionValue(item?.value ?? item?.Value),
    text: normalizeExpenseOptionValue(item?.text ?? item?.Text)
  })).filter((item) => item.value && item.text);
};
var mapBooleanEnumOptions = (source) => {
  return source.map((item) => ({
    value: item.value ? "true" : "false",
    text: normalizeExpenseOptionValue(item.text)
  }));
};

// Web/wwwroot/react/src/pages/gastos/constants/expenseGastoTypeCatalog.ts
var VISIBLE_EXPENSE_GASTO_TYPE_CODES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 14, 19, 20];
var FALLBACK_EXPENSE_GASTO_TYPE_CODES = [...VISIBLE_EXPENSE_GASTO_TYPE_CODES];
var VISIBLE_EXPENSE_GASTO_TYPE_CODE_SET = new Set(VISIBLE_EXPENSE_GASTO_TYPE_CODES);
var FALLBACK_EXPENSE_GASTO_TYPE_OPTIONS = [
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
  { value: 20, labelKey: "Enum_GastoType_Gasolina", fallback: "Gasolina" }
];
var toIntegerGastoTypeCode = (value) => {
  if (value === null || value === void 0) return null;
  if (typeof value === "string" && !value.trim()) return null;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : null;
};
var isVisibleGastoTypeCode = (code) => VISIBLE_EXPENSE_GASTO_TYPE_CODE_SET.has(code);
var getCatalogSource = () => {
  if (typeof window === "undefined" || !Array.isArray(window.__EXPENSE_GASTO_TYPES__)) {
    return [];
  }
  return window.__EXPENSE_GASTO_TYPES__;
};
var getCatalogOptions = () => {
  const seen = /* @__PURE__ */ new Set();
  const options = [];
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
      text: option.text.trim()
    });
  }
  return options;
};
var getFallbackOptions = () => {
  return FALLBACK_EXPENSE_GASTO_TYPE_OPTIONS.filter((option) => isVisibleGastoTypeCode(option.value)).map((option) => ({
    value: String(option.value),
    text: indT(option.labelKey, option.fallback)
  }));
};
var getExpenseGastoTypeOptions = () => {
  const catalogOptions = getCatalogOptions();
  return catalogOptions.length > 0 ? catalogOptions : getFallbackOptions();
};
var getExpenseGastoTypeCodeSet = ({
  includeFallbackIfEmpty = true
} = {}) => {
  const catalogOptions = getCatalogOptions();
  if (catalogOptions.length > 0) {
    return new Set(
      catalogOptions.map((option) => toIntegerGastoTypeCode(option.value)).filter((code) => code !== null)
    );
  }
  return includeFallbackIfEmpty ? new Set(FALLBACK_EXPENSE_GASTO_TYPE_CODES) : /* @__PURE__ */ new Set();
};
var toExpenseGastoTypeCode = (value, {
  allowNone = true,
  includeFallbackIfEmpty = true
} = {}) => {
  const code = toIntegerGastoTypeCode(value);
  if (code === null) return null;
  if (!allowNone && code === 0) return null;
  return getExpenseGastoTypeCodeSet({ includeFallbackIfEmpty }).has(code) ? code : null;
};
var getDefaultExpenseGastoTypeCode = (preferred = 8) => {
  const preferredCode = toExpenseGastoTypeCode(preferred, { allowNone: false });
  if (preferredCode !== null) return preferredCode;
  for (const option of getExpenseGastoTypeOptions()) {
    const code = toExpenseGastoTypeCode(option.value, { allowNone: false });
    if (code !== null) return code;
  }
  return preferred;
};
var formatExpenseGastoTypeAllowedMessage = ({ allowNone = true } = {}) => {
  const codes = Array.from(getExpenseGastoTypeCodeSet()).filter((code) => allowNone || code !== 0).join(",");
  return `gastoType must be one of: ${codes}.`;
};

// Web/wwwroot/react/src/pages/gastos/utils/expenseApiDateUtils.ts
var DDMMYYYY_COMPACT_REGEX = /^\d{8}$/;
var DDMMYY_COMPACT_REGEX = /^\d{6}$/;
var DATE_ONLY_DMY_REGEX = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
var DATE_ONLY_DMY_SHORT_YEAR_REGEX = /^\d{2}[./-]\d{2}[./-]\d{2}$/;
var DATE_ONLY_YMD_REGEX = /^\d{4}[./-]\d{2}[./-]\d{2}$/;
var MIN_SUPPORTED_EXPENSE_YEAR = 1900;
var MAX_SUPPORTED_EXPENSE_YEAR = 2100;
var TWO_DIGIT_YEAR_PIVOT = 50;
var EXPENSE_API_DATE_FORMAT_MESSAGE = "Formato requerido: DDMMYYYY o DD.MM.YYYY";
var safeText = (value) => {
  if (value === null || value === void 0) return "";
  return String(value).trim();
};
var isSupportedExpenseYear = (year) => {
  return Number.isInteger(year) && year >= MIN_SUPPORTED_EXPENSE_YEAR && year <= MAX_SUPPORTED_EXPENSE_YEAR;
};
var expandTwoDigitExpenseYear = (year) => {
  const normalized = Math.abs(Number(year)) % 100;
  return normalized >= TWO_DIGIT_YEAR_PIVOT ? 1900 + normalized : 2e3 + normalized;
};
var buildDate = (year, month, day) => {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return null;
  }
  if (!isSupportedExpenseYear(year)) {
    return null;
  }
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }
  const candidate = new Date(year, month - 1, day);
  if (candidate.getFullYear() !== year || candidate.getMonth() !== month - 1 || candidate.getDate() !== day) {
    return null;
  }
  return candidate;
};
var buildSafeDayFirstDate = (year, month, day) => {
  const explicitYear = buildDate(year, month, day);
  if (explicitYear) {
    return explicitYear;
  }
  return buildDate(expandTwoDigitExpenseYear(year), month, day);
};
var toDdMmYyyyDotted = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${day}.${month}.${year}`;
};
var parseExpenseApiDate = (raw) => {
  if (raw instanceof Date) {
    return Number.isNaN(raw.getTime()) || !isSupportedExpenseYear(raw.getFullYear()) ? null : raw;
  }
  const value = safeText(raw);
  if (!value) return null;
  const dateOnly = value.split("T")[0].split(" ")[0];
  if (DDMMYYYY_COMPACT_REGEX.test(dateOnly)) {
    const dd = Number(dateOnly.slice(0, 2));
    const mm = Number(dateOnly.slice(2, 4));
    const yyyy = Number(dateOnly.slice(4, 8));
    const ddmmyyyy = buildSafeDayFirstDate(yyyy, mm, dd);
    if (ddmmyyyy) {
      return ddmmyyyy;
    }
    const legacyYear = Number(dateOnly.slice(0, 4));
    const legacyMonth = Number(dateOnly.slice(4, 6));
    const legacyDay = Number(dateOnly.slice(6, 8));
    return buildDate(legacyYear, legacyMonth, legacyDay);
  }
  if (DDMMYY_COMPACT_REGEX.test(dateOnly)) {
    const dd = Number(dateOnly.slice(0, 2));
    const mm = Number(dateOnly.slice(2, 4));
    const yy = Number(dateOnly.slice(4, 6));
    return buildDate(expandTwoDigitExpenseYear(yy), mm, dd);
  }
  if (DATE_ONLY_DMY_REGEX.test(dateOnly)) {
    const [dayText, monthText, yearText] = dateOnly.split(/[./-]/);
    return buildSafeDayFirstDate(Number(yearText), Number(monthText), Number(dayText));
  }
  if (DATE_ONLY_DMY_SHORT_YEAR_REGEX.test(dateOnly)) {
    const [dayText, monthText, yearText] = dateOnly.split(/[./-]/);
    return buildDate(expandTwoDigitExpenseYear(Number(yearText)), Number(monthText), Number(dayText));
  }
  if (DATE_ONLY_YMD_REGEX.test(dateOnly)) {
    const [yearText, monthText, dayText] = dateOnly.split(/[./-]/);
    const parsedYear = Number(yearText);
    return buildDate(parsedYear, Number(monthText), Number(dayText)) ?? buildDate(expandTwoDigitExpenseYear(parsedYear), Number(monthText), Number(dayText));
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) || !isSupportedExpenseYear(parsed.getFullYear()) ? null : parsed;
};
var toExpenseApiDate = (raw) => {
  const parsed = parseExpenseApiDate(raw);
  if (!parsed) return "";
  return toDdMmYyyyDotted(parsed);
};
var toExpenseApiDdMmYyyy = (raw) => {
  return toExpenseApiDate(raw);
};
var toExpenseIsoDate = (raw) => {
  const parsed = parseExpenseApiDate(raw);
  if (!parsed) return "";
  const year = String(parsed.getFullYear());
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Web/wwwroot/react/src/pages/gastos/utils/expenseApiTransforms.ts
var safeText2 = (value) => {
  if (value === null || value === void 0) return "";
  return String(value).trim();
};
var toNullableNumber = (value) => {
  if (value === null || value === void 0) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};
var isNonNegativeNumber = (value) => {
  const parsed = toNullableNumber(value);
  return parsed !== null && parsed >= 0;
};
var isPositiveNumber = (value) => {
  const parsed = toNullableNumber(value);
  return parsed !== null && parsed > 0;
};
var isValidListExpenseSheetStatus = (value) => {
  const parsed = toNullableNumber(value);
  return parsed !== null && Number.isInteger(parsed) && parsed >= 0;
};
var toNullableTicketStatusCode = (value) => {
  const parsed = toNullableNumber(value);
  if (parsed !== null && Number.isInteger(parsed) && parsed >= 0) {
    return parsed;
  }
  return null;
};
var toNullableGastoTypeCode = (value) => {
  return toExpenseGastoTypeCode(value);
};
var normalizeOptionalTicketGastoType = (value) => {
  if (value === null || value === void 0 || safeText2(value) === "") {
    return void 0;
  }
  const parsed = toNullableGastoTypeCode(value);
  if (parsed === null) {
    throw new ApiFetchError(formatExpenseGastoTypeAllowedMessage());
  }
  return parsed;
};
var normalizeTicketListGastoType = (value) => {
  if (value === null || value === void 0 || safeText2(value) === "") {
    return null;
  }
  return toNullableGastoTypeCode(value);
};
var normalizeOptionalTicketStatus = (value) => {
  if (value === null || value === void 0 || safeText2(value) === "") {
    return null;
  }
  return toNullableTicketStatusCode(value);
};
var normalizeTicketListDate = (value) => {
  const raw = safeText2(value);
  if (!raw) return "";
  return toExpenseApiDdMmYyyy(raw);
};
var normalizeOptionalApiDate = (value) => {
  const raw = safeText2(value);
  if (!raw) return void 0;
  const normalized = toExpenseApiDdMmYyyy(raw);
  return normalized || void 0;
};
var normalizeRequiredApiDate = (value) => {
  const normalized = normalizeOptionalApiDate(value);
  if (!normalized) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }
  return normalized;
};
var toNullableBool = (value) => {
  if (value === null || value === void 0) return null;
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true" || normalized === "1") return true;
    if (normalized === "false" || normalized === "0") return false;
  }
  if (typeof value === "number") {
    if (value === 1) return true;
    if (value === 0) return false;
  }
  return null;
};
var normalizeOptionalTicketProcessedByAI = (value) => {
  if (value === null || value === void 0 || safeText2(value) === "") {
    return null;
  }
  return toNullableBool(value);
};
var normalizeExpenseSheetListStatusFilter = (value) => {
  return isValidListExpenseSheetStatus(value) ? Number(value) : null;
};
var toFlagBool = (value) => {
  const normalizedBool = toNullableBool(value);
  if (normalizedBool !== null) return normalizedBool;
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return null;
  if (normalized === "on" || normalized === "yes" || normalized === "y") return true;
  if (normalized === "off" || normalized === "no" || normalized === "n") return false;
  return null;
};

// Web/wwwroot/react/src/pages/gastos/utils/expenseScope.ts
var normalizeScopePart = (value, uppercase = false) => {
  const normalized = String(value || "").trim();
  if (!normalized) return "";
  return uppercase ? normalized.toUpperCase() : normalized.toLowerCase();
};
var getExpenseScopeValues = () => {
  if (typeof window === "undefined") {
    return {
      entraOid: "",
      companyId: ""
    };
  }
  const runtimeWindow = window;
  const entraOid = normalizeScopePart(runtimeWindow.__IND_ENTRA_OID__);
  const companyId = normalizeScopePart(runtimeWindow.__IND_SELECTED_COMPANY__ || runtimeWindow.__IND_COMPANY__, true);
  return {
    entraOid,
    companyId
  };
};
var getExpenseScopeToken = () => {
  const { entraOid, companyId } = getExpenseScopeValues();
  const scope = `${entraOid}__${companyId}`.replace(/^_+|_+$/g, "");
  return scope || "session";
};

// Web/wwwroot/react/src/pages/gastos/utils/expenseActingUser.ts
var normalizeUserId = (value) => String(value || "").trim();
var EXPENSE_ACTING_USER_KEY_PREFIX = "expense_acting_user_v1";
var EXPENSE_ACTING_USER_TTL_MS = 12 * 60 * 60 * 1e3;
var getScopedKey = () => {
  return `${EXPENSE_ACTING_USER_KEY_PREFIX}_${getExpenseScopeToken()}`;
};
var getExpenseActingUserOverride = () => {
  return normalizeUserId(getSessionValueWithExpiry(getScopedKey()));
};
var setExpenseActingUserOverride = (userId) => {
  const normalized = normalizeUserId(userId);
  if (!normalized) {
    removeSessionValueWithExpiry(getScopedKey());
    return "";
  }
  setSessionValueWithExpiry(getScopedKey(), normalized, EXPENSE_ACTING_USER_TTL_MS);
  return normalized;
};
var clearExpenseActingUserOverride = () => {
  removeSessionValueWithExpiry(getScopedKey());
};

// Web/wwwroot/react/src/pages/gastos/utils/expenseSubordinateMapper.ts
var resolveSubordinateObject = (item) => {
  const legacyUserId = safeText2(item.userId ?? item.UserId);
  const crmUserId = safeText2(item.crmUserId ?? item.CrmUserId ?? legacyUserId);
  const axUserId = safeText2(item.axUserId ?? item.AxUserId ?? legacyUserId);
  const resolvedCrmUserId = crmUserId || axUserId;
  const resolvedAxUserId = axUserId || crmUserId;
  if (!resolvedCrmUserId || !resolvedAxUserId) {
    return null;
  }
  const name = safeText2(item.name ?? item.Name ?? item.userName ?? item.UserName) || resolvedAxUserId;
  return {
    crmUserId: resolvedCrmUserId,
    axUserId: resolvedAxUserId,
    name
  };
};
var resolveSubordinateArray = (item) => {
  if (item.length < 3) {
    const legacyUserId = safeText2(item[0]);
    if (!legacyUserId) return null;
    const legacyName = safeText2(item[1]) || legacyUserId;
    return {
      crmUserId: legacyUserId,
      axUserId: legacyUserId,
      name: legacyName
    };
  }
  const crmUserId = safeText2(item[0]);
  const axUserId = safeText2(item[1]);
  const fallbackId = safeText2(item[0] ?? item[1]);
  const resolvedCrmUserId = crmUserId || fallbackId;
  const resolvedAxUserId = axUserId || fallbackId;
  if (!resolvedCrmUserId || !resolvedAxUserId) {
    return null;
  }
  const name = safeText2(item[2]) || resolvedAxUserId;
  return {
    crmUserId: resolvedCrmUserId,
    axUserId: resolvedAxUserId,
    name
  };
};
var mapExpenseSheetSubordinate = (item) => {
  if (!item) return null;
  if (Array.isArray(item)) {
    return resolveSubordinateArray(item);
  }
  if (typeof item !== "object") return null;
  return resolveSubordinateObject(item);
};
var normalizeExpenseSheetSubordinates = (source) => {
  if (!Array.isArray(source)) return [];
  return source.map((entry) => mapExpenseSheetSubordinate(entry)).filter((entry) => !!entry);
};

export {
  getExpenseScopeToken,
  mapWindowEnumOptions,
  mapBooleanEnumOptions,
  getExpenseGastoTypeOptions,
  toExpenseGastoTypeCode,
  getDefaultExpenseGastoTypeCode,
  EXPENSE_API_DATE_FORMAT_MESSAGE,
  parseExpenseApiDate,
  toExpenseApiDdMmYyyy,
  toExpenseIsoDate,
  safeText2 as safeText,
  toNullableNumber,
  isNonNegativeNumber,
  isPositiveNumber,
  toNullableTicketStatusCode,
  toNullableGastoTypeCode,
  normalizeOptionalTicketGastoType,
  normalizeTicketListGastoType,
  normalizeOptionalTicketStatus,
  normalizeTicketListDate,
  normalizeOptionalApiDate,
  normalizeRequiredApiDate,
  toNullableBool,
  normalizeOptionalTicketProcessedByAI,
  normalizeExpenseSheetListStatusFilter,
  toFlagBool,
  normalizeExpenseSheetSubordinates,
  getExpenseActingUserOverride,
  setExpenseActingUserOverride,
  clearExpenseActingUserOverride
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbnN0YW50cy9leHBlbnNlR2FzdG9UeXBlQ2F0YWxvZy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VBcGlEYXRlVXRpbHMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlQXBpVHJhbnNmb3Jtcy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VTY29wZS50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VBY3RpbmdVc2VyLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZVN1Ym9yZGluYXRlTWFwcGVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7IFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgRXhwZW5zZVNlbGVjdE9wdGlvbiA9IHtcclxuICB2YWx1ZTogc3RyaW5nO1xyXG4gIHRleHQ6IHN0cmluZztcclxuICBpY29uPzogUmVhY3ROb2RlO1xyXG59O1xyXG5cclxudHlwZSBXaW5kb3dFbnVtSXRlbSA9IHtcclxuICB2YWx1ZT86IHVua25vd247XHJcbiAgVmFsdWU/OiB1bmtub3duO1xyXG4gIHRleHQ/OiB1bmtub3duO1xyXG4gIFRleHQ/OiB1bmtub3duO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUV4cGVuc2VPcHRpb25WYWx1ZSA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSA/PyBcIlwiKS50cmltKCk7XHJcbn07XHJcblxyXG4vLyBNYXBzIG1peGVkLWNhc2UgZW51bSBwYXlsb2FkcyAoVmFsdWUvdmFsdWUgKyBUZXh0L3RleHQpIGludG8gb25lIG5vcm1hbGl6ZWQgbGlzdC5cclxuZXhwb3J0IGNvbnN0IG1hcFdpbmRvd0VudW1PcHRpb25zID0gKHNvdXJjZTogV2luZG93RW51bUl0ZW1bXSk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XHJcbiAgcmV0dXJuIHNvdXJjZVxyXG4gICAgLm1hcCgoaXRlbSkgPT4gKHtcclxuICAgICAgdmFsdWU6IG5vcm1hbGl6ZUV4cGVuc2VPcHRpb25WYWx1ZShpdGVtPy52YWx1ZSA/PyBpdGVtPy5WYWx1ZSksXHJcbiAgICAgIHRleHQ6IG5vcm1hbGl6ZUV4cGVuc2VPcHRpb25WYWx1ZShpdGVtPy50ZXh0ID8/IGl0ZW0/LlRleHQpLFxyXG4gICAgfSkpXHJcbiAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnZhbHVlICYmIGl0ZW0udGV4dCk7XHJcbn07XHJcblxyXG4vLyBDb252ZXJ0cyBib29sZWFuIGVudW1zIHRvIHNlbGVjdCBvcHRpb25zIHdpdGggc3RyaW5nIGJvb2xlYW4gdmFsdWVzLlxyXG5leHBvcnQgY29uc3QgbWFwQm9vbGVhbkVudW1PcHRpb25zID0gKHNvdXJjZTogQXJyYXk8eyB2YWx1ZTogYm9vbGVhbjsgdGV4dDogc3RyaW5nIH0+KTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcclxuICByZXR1cm4gc291cmNlLm1hcCgoaXRlbSkgPT4gKHtcclxuICAgIHZhbHVlOiBpdGVtLnZhbHVlID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIsXHJcbiAgICB0ZXh0OiBub3JtYWxpemVFeHBlbnNlT3B0aW9uVmFsdWUoaXRlbS50ZXh0KSxcclxuICB9KSk7XHJcbn07XHJcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlR2FzdG9UeXBlQ29kZSB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgbWFwV2luZG93RW51bU9wdGlvbnMsIHR5cGUgRXhwZW5zZVNlbGVjdE9wdGlvbiB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50c1wiO1xyXG5cclxudHlwZSBHYXN0b1R5cGVGYWxsYmFja09wdGlvbiA9IHtcclxuICB2YWx1ZTogRXhwZW5zZUdhc3RvVHlwZUNvZGU7XHJcbiAgbGFiZWxLZXk6IHN0cmluZztcclxuICBmYWxsYmFjazogc3RyaW5nO1xyXG59O1xyXG5cclxuY29uc3QgVklTSUJMRV9FWFBFTlNFX0dBU1RPX1RZUEVfQ09ERVM6IEV4cGVuc2VHYXN0b1R5cGVDb2RlW10gPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMTQsIDE5LCAyMF07XHJcblxyXG5leHBvcnQgY29uc3QgRkFMTEJBQ0tfRVhQRU5TRV9HQVNUT19UWVBFX0NPREVTOiBFeHBlbnNlR2FzdG9UeXBlQ29kZVtdID0gWy4uLlZJU0lCTEVfRVhQRU5TRV9HQVNUT19UWVBFX0NPREVTXTtcclxuXHJcbmNvbnN0IFZJU0lCTEVfRVhQRU5TRV9HQVNUT19UWVBFX0NPREVfU0VUID0gbmV3IFNldDxFeHBlbnNlR2FzdG9UeXBlQ29kZT4oVklTSUJMRV9FWFBFTlNFX0dBU1RPX1RZUEVfQ09ERVMpO1xyXG5cclxuY29uc3QgRkFMTEJBQ0tfRVhQRU5TRV9HQVNUT19UWVBFX09QVElPTlM6IEdhc3RvVHlwZUZhbGxiYWNrT3B0aW9uW10gPSBbXHJcbiAgeyB2YWx1ZTogMCwgbGFiZWxLZXk6IFwiRW51bV9Ob25lXCIsIGZhbGxiYWNrOiBcIk5vbmVcIiB9LFxyXG4gIHsgdmFsdWU6IDEsIGxhYmVsS2V5OiBcIkVudW1fR2FzdG9UeXBlX1BlYWplXCIsIGZhbGxiYWNrOiBcIlBlYWplc1wiIH0sXHJcbiAgeyB2YWx1ZTogMiwgbGFiZWxLZXk6IFwiRW51bV9HYXN0b1R5cGVfUGFya2luZ1wiLCBmYWxsYmFjazogXCJQYXJraW5nXCIgfSxcclxuICB7IHZhbHVlOiAzLCBsYWJlbEtleTogXCJFbnVtX0dhc3RvVHlwZV9LbVwiLCBmYWxsYmFjazogXCJLbVwiIH0sXHJcbiAgeyB2YWx1ZTogNCwgbGFiZWxLZXk6IFwiRW51bV9HYXN0b1R5cGVfRGVzYXl1bm9cIiwgZmFsbGJhY2s6IFwiRGVzYXl1bm9cIiB9LFxyXG4gIHsgdmFsdWU6IDUsIGxhYmVsS2V5OiBcIkVudW1fR2FzdG9UeXBlX0NvbWlkYVwiLCBmYWxsYmFjazogXCJDb21pZGFcIiB9LFxyXG4gIHsgdmFsdWU6IDYsIGxhYmVsS2V5OiBcIkVudW1fR2FzdG9UeXBlX0NlbmFcIiwgZmFsbGJhY2s6IFwiQ2VuYVwiIH0sXHJcbiAgeyB2YWx1ZTogNywgbGFiZWxLZXk6IFwiRW51bV9HYXN0b1R5cGVfSG90ZWxcIiwgZmFsbGJhY2s6IFwiSG90ZWxcIiB9LFxyXG4gIHsgdmFsdWU6IDgsIGxhYmVsS2V5OiBcIkVudW1fR2FzdG9UeXBlX1Zhcmlvc1wiLCBmYWxsYmFjazogXCJWYXJpb3NcIiB9LFxyXG4gIHsgdmFsdWU6IDksIGxhYmVsS2V5OiBcIkVudW1fR2FzdG9UeXBlX01vbnRhamVOYWNpb25hbFwiLCBmYWxsYmFjazogXCJNb250YWplIE5hY2lvbmFsXCIgfSxcclxuICB7IHZhbHVlOiAxMCwgbGFiZWxLZXk6IFwiRW51bV9HYXN0b1R5cGVfTW9udGFqZU5hY2lvbmFsRmVzdGl2b1wiLCBmYWxsYmFjazogXCJNb250YWplIE5hY2lvbmFsIEZlc3Rpdm9cIiB9LFxyXG4gIHsgdmFsdWU6IDExLCBsYWJlbEtleTogXCJFbnVtX0dhc3RvVHlwZV9Nb250YWplSW50ZXJuYWNpb25hbFwiLCBmYWxsYmFjazogXCJNb250YWplIEludGVybmFjaW9uYWxcIiB9LFxyXG4gIHsgdmFsdWU6IDEyLCBsYWJlbEtleTogXCJFbnVtX0dhc3RvVHlwZV9Nb250YWplSW50ZXJuYWNpb25hbEZlc3Rpdm9cIiwgZmFsbGJhY2s6IFwiTW9udGFqZSBJbnRlcm5hY2lvbmFsIEZlc3Rpdm9cIiB9LFxyXG4gIHsgdmFsdWU6IDEzLCBsYWJlbEtleTogXCJFbnVtX0dhc3RvVHlwZV9EaWFWaWFqZU5hY2lvbmFsXCIsIGZhbGxiYWNrOiBcIkRpYSBkZSBWaWFqZSBOYWNpb25hbFwiIH0sXHJcbiAgeyB2YWx1ZTogMTQsIGxhYmVsS2V5OiBcIkVudW1fR2FzdG9UeXBlX1RheGlcIiwgZmFsbGJhY2s6IFwiVGF4aVwiIH0sXHJcbiAgeyB2YWx1ZTogMTUsIGxhYmVsS2V5OiBcIkVudW1fR2FzdG9UeXBlX0RpYVZpYWplRmVzdGl2b05hY2lvbmFsXCIsIGZhbGxiYWNrOiBcIkRpYSBWaWFqZSBGZXN0aXZvIE5hY2lvbmFsXCIgfSxcclxuICB7IHZhbHVlOiAxNiwgbGFiZWxLZXk6IFwiRW51bV9HYXN0b1R5cGVfRGlhVmlhamVJbnRlcm5hY2lvbmFsXCIsIGZhbGxiYWNrOiBcIkRpYSBWaWFqZSBJbnRlcm5hY2lvbmFsXCIgfSxcclxuICB7IHZhbHVlOiAxNywgbGFiZWxLZXk6IFwiRW51bV9HYXN0b1R5cGVfRGlhVmlhamVGZXN0aXZvSW50ZXJuYWNpb25hbFwiLCBmYWxsYmFjazogXCJEaWEgVmlhamUgRmVzdGl2byBJbnRlcm5hY2lvbmFsXCIgfSxcclxuICB7IHZhbHVlOiAxOCwgbGFiZWxLZXk6IFwiRW51bV9HYXN0b1R5cGVfSG9yYXNcIiwgZmFsbGJhY2s6IFwiSG9yYXNcIiB9LFxyXG4gIHsgdmFsdWU6IDE5LCBsYWJlbEtleTogXCJFbnVtX0dhc3RvVHlwZV9Qcm9waW5hc1wiLCBmYWxsYmFjazogXCJQcm9waW5hc1wiIH0sXHJcbiAgeyB2YWx1ZTogMjAsIGxhYmVsS2V5OiBcIkVudW1fR2FzdG9UeXBlX0dhc29saW5hXCIsIGZhbGxiYWNrOiBcIkdhc29saW5hXCIgfSxcclxuXTtcclxuXHJcbmNvbnN0IHRvSW50ZWdlckdhc3RvVHlwZUNvZGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlR2FzdG9UeXBlQ29kZSB8IG51bGwgPT4ge1xyXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbDtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmICF2YWx1ZS50cmltKCkpIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgJiYgcGFyc2VkID49IDAgPyBwYXJzZWQgOiBudWxsO1xyXG59O1xyXG5cclxuLy8gS2VlcHMgZXhwZW5zZSB0eXBlIHNlbGVjdG9ycyBhbGlnbmVkIHdpdGggdGhlIHZpc2libGUgQ1JNR2FzdG9UeXBlIGJ1c2luZXNzIHNldC5cclxuY29uc3QgaXNWaXNpYmxlR2FzdG9UeXBlQ29kZSA9IChjb2RlOiBFeHBlbnNlR2FzdG9UeXBlQ29kZSk6IGJvb2xlYW4gPT4gVklTSUJMRV9FWFBFTlNFX0dBU1RPX1RZUEVfQ09ERV9TRVQuaGFzKGNvZGUpO1xyXG5cclxuY29uc3QgZ2V0Q2F0YWxvZ1NvdXJjZSA9ICgpID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhQXJyYXkuaXNBcnJheSh3aW5kb3cuX19FWFBFTlNFX0dBU1RPX1RZUEVTX18pKSB7XHJcbiAgICByZXR1cm4gW107XHJcbiAgfVxyXG5cclxuICByZXR1cm4gd2luZG93Ll9fRVhQRU5TRV9HQVNUT19UWVBFU19fO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0Q2F0YWxvZ09wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcclxuICBjb25zdCBzZWVuID0gbmV3IFNldDxzdHJpbmc+KCk7XHJcbiAgY29uc3Qgb3B0aW9uczogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0gW107XHJcbiAgY29uc3Qgc291cmNlT3B0aW9ucyA9IG1hcFdpbmRvd0VudW1PcHRpb25zKGdldENhdGFsb2dTb3VyY2UoKSk7XHJcblxyXG4gIGZvciAoY29uc3Qgb3B0aW9uIG9mIHNvdXJjZU9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGNvZGUgPSB0b0ludGVnZXJHYXN0b1R5cGVDb2RlKG9wdGlvbi52YWx1ZSk7XHJcbiAgICBpZiAoY29kZSA9PT0gbnVsbCkgY29udGludWU7XHJcbiAgICBpZiAoIWlzVmlzaWJsZUdhc3RvVHlwZUNvZGUoY29kZSkpIGNvbnRpbnVlO1xyXG5cclxuICAgIGNvbnN0IGtleSA9IFN0cmluZyhjb2RlKTtcclxuICAgIGlmIChzZWVuLmhhcyhrZXkpKSBjb250aW51ZTtcclxuICAgIHNlZW4uYWRkKGtleSk7XHJcbiAgICBvcHRpb25zLnB1c2goe1xyXG4gICAgICB2YWx1ZToga2V5LFxyXG4gICAgICB0ZXh0OiBvcHRpb24udGV4dC50cmltKCksXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBvcHRpb25zO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0RmFsbGJhY2tPcHRpb25zID0gKCk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XHJcbiAgcmV0dXJuIEZBTExCQUNLX0VYUEVOU0VfR0FTVE9fVFlQRV9PUFRJT05TXHJcbiAgICAuZmlsdGVyKChvcHRpb24pID0+IGlzVmlzaWJsZUdhc3RvVHlwZUNvZGUob3B0aW9uLnZhbHVlKSlcclxuICAgIC5tYXAoKG9wdGlvbikgPT4gKHtcclxuICAgICAgdmFsdWU6IFN0cmluZyhvcHRpb24udmFsdWUpLFxyXG4gICAgICB0ZXh0OiBpbmRUKG9wdGlvbi5sYWJlbEtleSwgb3B0aW9uLmZhbGxiYWNrKSxcclxuICAgIH0pKTtcclxufTtcclxuXHJcbi8vIFJldHVybnMgY2F0YWxvZyBvcHRpb25zIGluIGJhY2tlbmQgU29ydE9yZGVyIG9yZGVyLCBmYWxsaW5nIGJhY2sgb25seSB3aGVuIHRoZSBjYXRhbG9nIGlzIHVuYXZhaWxhYmxlLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZUdhc3RvVHlwZU9wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcclxuICBjb25zdCBjYXRhbG9nT3B0aW9ucyA9IGdldENhdGFsb2dPcHRpb25zKCk7XHJcbiAgcmV0dXJuIGNhdGFsb2dPcHRpb25zLmxlbmd0aCA+IDAgPyBjYXRhbG9nT3B0aW9ucyA6IGdldEZhbGxiYWNrT3B0aW9ucygpO1xyXG59O1xyXG5cclxuLy8gQnVpbGRzIHRoZSBhY3RpdmUgdmFsdWUgc2V0IHVzZWQgYnkgZmlsdGVycywgY2FjaGVzLCBhbmQgcmVxdWVzdCBwYXlsb2FkIGd1YXJkcy5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VHYXN0b1R5cGVDb2RlU2V0ID0gKHtcclxuICBpbmNsdWRlRmFsbGJhY2tJZkVtcHR5ID0gdHJ1ZSxcclxufToge1xyXG4gIGluY2x1ZGVGYWxsYmFja0lmRW1wdHk/OiBib29sZWFuO1xyXG59ID0ge30pOiBTZXQ8RXhwZW5zZUdhc3RvVHlwZUNvZGU+ID0+IHtcclxuICBjb25zdCBjYXRhbG9nT3B0aW9ucyA9IGdldENhdGFsb2dPcHRpb25zKCk7XHJcbiAgaWYgKGNhdGFsb2dPcHRpb25zLmxlbmd0aCA+IDApIHtcclxuICAgIHJldHVybiBuZXcgU2V0KFxyXG4gICAgICBjYXRhbG9nT3B0aW9uc1xyXG4gICAgICAgIC5tYXAoKG9wdGlvbikgPT4gdG9JbnRlZ2VyR2FzdG9UeXBlQ29kZShvcHRpb24udmFsdWUpKVxyXG4gICAgICAgIC5maWx0ZXIoKGNvZGUpOiBjb2RlIGlzIEV4cGVuc2VHYXN0b1R5cGVDb2RlID0+IGNvZGUgIT09IG51bGwpXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGluY2x1ZGVGYWxsYmFja0lmRW1wdHkgPyBuZXcgU2V0KEZBTExCQUNLX0VYUEVOU0VfR0FTVE9fVFlQRV9DT0RFUykgOiBuZXcgU2V0KCk7XHJcbn07XHJcblxyXG4vLyBDb252ZXJ0cyB1bmtub3duIGlucHV0IHRvIGEgdmFsaWQgQ1JNR2FzdG9UeXBlIHZhbHVlIGZyb20gdGhlIGFjdGl2ZSBjYXRhbG9nLlxyXG5leHBvcnQgY29uc3QgdG9FeHBlbnNlR2FzdG9UeXBlQ29kZSA9IChcclxuICB2YWx1ZTogdW5rbm93bixcclxuICB7XHJcbiAgICBhbGxvd05vbmUgPSB0cnVlLFxyXG4gICAgaW5jbHVkZUZhbGxiYWNrSWZFbXB0eSA9IHRydWUsXHJcbiAgfToge1xyXG4gICAgYWxsb3dOb25lPzogYm9vbGVhbjtcclxuICAgIGluY2x1ZGVGYWxsYmFja0lmRW1wdHk/OiBib29sZWFuO1xyXG4gIH0gPSB7fVxyXG4pOiBFeHBlbnNlR2FzdG9UeXBlQ29kZSB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IGNvZGUgPSB0b0ludGVnZXJHYXN0b1R5cGVDb2RlKHZhbHVlKTtcclxuICBpZiAoY29kZSA9PT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcbiAgaWYgKCFhbGxvd05vbmUgJiYgY29kZSA9PT0gMCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIHJldHVybiBnZXRFeHBlbnNlR2FzdG9UeXBlQ29kZVNldCh7IGluY2x1ZGVGYWxsYmFja0lmRW1wdHkgfSkuaGFzKGNvZGUpID8gY29kZSA6IG51bGw7XHJcbn07XHJcblxyXG4vLyBDaGVja3Mgd2hldGhlciBhIHZhbHVlIGNhbiBiZSB1c2VkIGFzIGEgQ1JNR2FzdG9UeXBlIGJ1c2luZXNzIHZhbHVlLlxyXG5leHBvcnQgY29uc3QgaXNFeHBlbnNlR2FzdG9UeXBlQ29kZSA9IChcclxuICB2YWx1ZTogdW5rbm93bixcclxuICBvcHRpb25zPzoge1xyXG4gICAgYWxsb3dOb25lPzogYm9vbGVhbjtcclxuICAgIGluY2x1ZGVGYWxsYmFja0lmRW1wdHk/OiBib29sZWFuO1xyXG4gIH1cclxuKTogYm9vbGVhbiA9PiB7XHJcbiAgcmV0dXJuIHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUodmFsdWUsIG9wdGlvbnMpICE9PSBudWxsO1xyXG59O1xyXG5cclxuLy8gUmVzb2x2ZXMgYSBwb3NpdGl2ZSBkZWZhdWx0IGNhdGVnb3J5IGZvciBnZW5lcmF0ZWQgdGlja2V0LXRvLXNoZWV0IGxpbmVzLlxyXG5leHBvcnQgY29uc3QgZ2V0RGVmYXVsdEV4cGVuc2VHYXN0b1R5cGVDb2RlID0gKHByZWZlcnJlZDogRXhwZW5zZUdhc3RvVHlwZUNvZGUgPSA4KTogRXhwZW5zZUdhc3RvVHlwZUNvZGUgPT4ge1xyXG4gIGNvbnN0IHByZWZlcnJlZENvZGUgPSB0b0V4cGVuc2VHYXN0b1R5cGVDb2RlKHByZWZlcnJlZCwgeyBhbGxvd05vbmU6IGZhbHNlIH0pO1xyXG4gIGlmIChwcmVmZXJyZWRDb2RlICE9PSBudWxsKSByZXR1cm4gcHJlZmVycmVkQ29kZTtcclxuXHJcbiAgZm9yIChjb25zdCBvcHRpb24gb2YgZ2V0RXhwZW5zZUdhc3RvVHlwZU9wdGlvbnMoKSkge1xyXG4gICAgY29uc3QgY29kZSA9IHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUob3B0aW9uLnZhbHVlLCB7IGFsbG93Tm9uZTogZmFsc2UgfSk7XHJcbiAgICBpZiAoY29kZSAhPT0gbnVsbCkgcmV0dXJuIGNvZGU7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcHJlZmVycmVkO1xyXG59O1xyXG5cclxuLy8gRm9ybWF0cyBhIGRlZmVuc2l2ZSB2YWxpZGF0aW9uIG1lc3NhZ2UgdXNpbmcgdGhlIGFjdGl2ZSBjYXRhbG9nIHZhbHVlcy5cclxuZXhwb3J0IGNvbnN0IGZvcm1hdEV4cGVuc2VHYXN0b1R5cGVBbGxvd2VkTWVzc2FnZSA9ICh7IGFsbG93Tm9uZSA9IHRydWUgfTogeyBhbGxvd05vbmU/OiBib29sZWFuIH0gPSB7fSk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgY29kZXMgPSBBcnJheS5mcm9tKGdldEV4cGVuc2VHYXN0b1R5cGVDb2RlU2V0KCkpXHJcbiAgICAuZmlsdGVyKChjb2RlKSA9PiBhbGxvd05vbmUgfHwgY29kZSAhPT0gMClcclxuICAgIC5qb2luKFwiLFwiKTtcclxuXHJcbiAgcmV0dXJuIGBnYXN0b1R5cGUgbXVzdCBiZSBvbmUgb2Y6ICR7Y29kZXN9LmA7XHJcbn07XHJcbiIsICJjb25zdCBERE1NWVlZWV9DT01QQUNUX1JFR0VYID0gL15cXGR7OH0kLztcclxuY29uc3QgRERNTVlZX0NPTVBBQ1RfUkVHRVggPSAvXlxcZHs2fSQvO1xyXG5jb25zdCBERE1NWVlZWV9ET1RURURfUkVHRVggPSAvXlxcZHsyfVxcLlxcZHsyfVxcLlxcZHs0fSQvO1xyXG5jb25zdCBEQVRFX09OTFlfRE1ZX1JFR0VYID0gL15cXGR7Mn1bLi8tXVxcZHsyfVsuLy1dXFxkezR9JC87XHJcbmNvbnN0IERBVEVfT05MWV9ETVlfU0hPUlRfWUVBUl9SRUdFWCA9IC9eXFxkezJ9Wy4vLV1cXGR7Mn1bLi8tXVxcZHsyfSQvO1xyXG5jb25zdCBEQVRFX09OTFlfWU1EX1JFR0VYID0gL15cXGR7NH1bLi8tXVxcZHsyfVsuLy1dXFxkezJ9JC87XHJcbmNvbnN0IE1JTl9TVVBQT1JURURfRVhQRU5TRV9ZRUFSID0gMTkwMDtcclxuY29uc3QgTUFYX1NVUFBPUlRFRF9FWFBFTlNFX1lFQVIgPSAyMTAwO1xyXG5jb25zdCBUV09fRElHSVRfWUVBUl9QSVZPVCA9IDUwO1xyXG5cclxuZXhwb3J0IGNvbnN0IEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UgPSBcIkZvcm1hdG8gcmVxdWVyaWRvOiBERE1NWVlZWSBvIERELk1NLllZWVlcIjtcclxuXHJcbmNvbnN0IHNhZmVUZXh0ID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XHJcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG59O1xyXG5cclxuY29uc3QgaXNTdXBwb3J0ZWRFeHBlbnNlWWVhciA9ICh5ZWFyOiBudW1iZXIpOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gTnVtYmVyLmlzSW50ZWdlcih5ZWFyKSAmJiB5ZWFyID49IE1JTl9TVVBQT1JURURfRVhQRU5TRV9ZRUFSICYmIHllYXIgPD0gTUFYX1NVUFBPUlRFRF9FWFBFTlNFX1lFQVI7XHJcbn07XHJcblxyXG5jb25zdCBleHBhbmRUd29EaWdpdEV4cGVuc2VZZWFyID0gKHllYXI6IG51bWJlcik6IG51bWJlciA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IE1hdGguYWJzKE51bWJlcih5ZWFyKSkgJSAxMDA7XHJcbiAgcmV0dXJuIG5vcm1hbGl6ZWQgPj0gVFdPX0RJR0lUX1lFQVJfUElWT1QgPyAxOTAwICsgbm9ybWFsaXplZCA6IDIwMDAgKyBub3JtYWxpemVkO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGREYXRlID0gKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF5OiBudW1iZXIpOiBEYXRlIHwgbnVsbCA9PiB7XHJcbiAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKHllYXIpIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKG1vbnRoKSB8fCAhTnVtYmVyLmlzSW50ZWdlcihkYXkpKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgaWYgKCFpc1N1cHBvcnRlZEV4cGVuc2VZZWFyKHllYXIpKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgaWYgKG1vbnRoIDwgMSB8fCBtb250aCA+IDEyIHx8IGRheSA8IDEgfHwgZGF5ID4gMzEpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY2FuZGlkYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xyXG4gIGlmIChcclxuICAgIGNhbmRpZGF0ZS5nZXRGdWxsWWVhcigpICE9PSB5ZWFyIHx8XHJcbiAgICBjYW5kaWRhdGUuZ2V0TW9udGgoKSAhPT0gbW9udGggLSAxIHx8XHJcbiAgICBjYW5kaWRhdGUuZ2V0RGF0ZSgpICE9PSBkYXlcclxuICApIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGNhbmRpZGF0ZTtcclxufTtcclxuXHJcbi8vIEtlZXBzIE9DUiBkYXRlcyBsaWtlIDA5LjA3LjEyMjAgdXNhYmxlIGJ5IGZhbGxpbmcgYmFjayB0byB0aGUgaW1wbGllZCB0d28tZGlnaXQgeWVhciAoMjAyMCkuXHJcbmNvbnN0IGJ1aWxkU2FmZURheUZpcnN0RGF0ZSA9ICh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKTogRGF0ZSB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IGV4cGxpY2l0WWVhciA9IGJ1aWxkRGF0ZSh5ZWFyLCBtb250aCwgZGF5KTtcclxuICBpZiAoZXhwbGljaXRZZWFyKSB7XHJcbiAgICByZXR1cm4gZXhwbGljaXRZZWFyO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGJ1aWxkRGF0ZShleHBhbmRUd29EaWdpdEV4cGVuc2VZZWFyKHllYXIpLCBtb250aCwgZGF5KTtcclxufTtcclxuXHJcbmNvbnN0IHRvRGRNbVl5eXlDb21wYWN0ID0gKGRhdGU6IERhdGUpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGRheSA9IFN0cmluZyhkYXRlLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gIGNvbnN0IG1vbnRoID0gU3RyaW5nKGRhdGUuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICBjb25zdCB5ZWFyID0gU3RyaW5nKGRhdGUuZ2V0RnVsbFllYXIoKSk7XHJcbiAgcmV0dXJuIGAke2RheX0ke21vbnRofSR7eWVhcn1gO1xyXG59O1xyXG5cclxuY29uc3QgdG9EZE1tWXl5eURvdHRlZCA9IChkYXRlOiBEYXRlKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBkYXkgPSBTdHJpbmcoZGF0ZS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICBjb25zdCBtb250aCA9IFN0cmluZyhkYXRlLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgY29uc3QgeWVhciA9IFN0cmluZyhkYXRlLmdldEZ1bGxZZWFyKCkpO1xyXG4gIHJldHVybiBgJHtkYXl9LiR7bW9udGh9LiR7eWVhcn1gO1xyXG59O1xyXG5cclxuLy8gUGFyc2VzIGRhdGUgaW5wdXRzIHVzZWQgYnkgZnJvbnRlbmQvVUkgYW5kIGJhY2tlbmQgY29udHJhY3RzLlxyXG5leHBvcnQgY29uc3QgcGFyc2VFeHBlbnNlQXBpRGF0ZSA9IChyYXc6IHVua25vd24pOiBEYXRlIHwgbnVsbCA9PiB7XHJcbiAgaWYgKHJhdyBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgIHJldHVybiBOdW1iZXIuaXNOYU4ocmF3LmdldFRpbWUoKSkgfHwgIWlzU3VwcG9ydGVkRXhwZW5zZVllYXIocmF3LmdldEZ1bGxZZWFyKCkpID8gbnVsbCA6IHJhdztcclxuICB9XHJcblxyXG4gIGNvbnN0IHZhbHVlID0gc2FmZVRleHQocmF3KTtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgZGF0ZU9ubHkgPSB2YWx1ZS5zcGxpdChcIlRcIilbMF0uc3BsaXQoXCIgXCIpWzBdO1xyXG5cclxuICBpZiAoRERNTVlZWVlfQ09NUEFDVF9SRUdFWC50ZXN0KGRhdGVPbmx5KSkge1xyXG4gICAgY29uc3QgZGQgPSBOdW1iZXIoZGF0ZU9ubHkuc2xpY2UoMCwgMikpO1xyXG4gICAgY29uc3QgbW0gPSBOdW1iZXIoZGF0ZU9ubHkuc2xpY2UoMiwgNCkpO1xyXG4gICAgY29uc3QgeXl5eSA9IE51bWJlcihkYXRlT25seS5zbGljZSg0LCA4KSk7XHJcbiAgICBjb25zdCBkZG1teXl5eSA9IGJ1aWxkU2FmZURheUZpcnN0RGF0ZSh5eXl5LCBtbSwgZGQpO1xyXG4gICAgaWYgKGRkbW15eXl5KSB7XHJcbiAgICAgIHJldHVybiBkZG1teXl5eTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBLZWVwIGxlZ2FjeSBjb21wYXRpYmlsaXR5IGZvciBjYWNoZWQvc3RhbGUgeXl5eU1NZGQgdmFsdWVzLlxyXG4gICAgY29uc3QgbGVnYWN5WWVhciA9IE51bWJlcihkYXRlT25seS5zbGljZSgwLCA0KSk7XHJcbiAgICBjb25zdCBsZWdhY3lNb250aCA9IE51bWJlcihkYXRlT25seS5zbGljZSg0LCA2KSk7XHJcbiAgICBjb25zdCBsZWdhY3lEYXkgPSBOdW1iZXIoZGF0ZU9ubHkuc2xpY2UoNiwgOCkpO1xyXG4gICAgcmV0dXJuIGJ1aWxkRGF0ZShsZWdhY3lZZWFyLCBsZWdhY3lNb250aCwgbGVnYWN5RGF5KTtcclxuICB9XHJcblxyXG4gIGlmIChERE1NWVlfQ09NUEFDVF9SRUdFWC50ZXN0KGRhdGVPbmx5KSkge1xyXG4gICAgY29uc3QgZGQgPSBOdW1iZXIoZGF0ZU9ubHkuc2xpY2UoMCwgMikpO1xyXG4gICAgY29uc3QgbW0gPSBOdW1iZXIoZGF0ZU9ubHkuc2xpY2UoMiwgNCkpO1xyXG4gICAgY29uc3QgeXkgPSBOdW1iZXIoZGF0ZU9ubHkuc2xpY2UoNCwgNikpO1xyXG4gICAgcmV0dXJuIGJ1aWxkRGF0ZShleHBhbmRUd29EaWdpdEV4cGVuc2VZZWFyKHl5KSwgbW0sIGRkKTtcclxuICB9XHJcblxyXG4gIGlmIChEQVRFX09OTFlfRE1ZX1JFR0VYLnRlc3QoZGF0ZU9ubHkpKSB7XHJcbiAgICBjb25zdCBbZGF5VGV4dCwgbW9udGhUZXh0LCB5ZWFyVGV4dF0gPSBkYXRlT25seS5zcGxpdCgvWy4vLV0vKTtcclxuICAgIHJldHVybiBidWlsZFNhZmVEYXlGaXJzdERhdGUoTnVtYmVyKHllYXJUZXh0KSwgTnVtYmVyKG1vbnRoVGV4dCksIE51bWJlcihkYXlUZXh0KSk7XHJcbiAgfVxyXG5cclxuICBpZiAoREFURV9PTkxZX0RNWV9TSE9SVF9ZRUFSX1JFR0VYLnRlc3QoZGF0ZU9ubHkpKSB7XHJcbiAgICBjb25zdCBbZGF5VGV4dCwgbW9udGhUZXh0LCB5ZWFyVGV4dF0gPSBkYXRlT25seS5zcGxpdCgvWy4vLV0vKTtcclxuICAgIHJldHVybiBidWlsZERhdGUoZXhwYW5kVHdvRGlnaXRFeHBlbnNlWWVhcihOdW1iZXIoeWVhclRleHQpKSwgTnVtYmVyKG1vbnRoVGV4dCksIE51bWJlcihkYXlUZXh0KSk7XHJcbiAgfVxyXG5cclxuICBpZiAoREFURV9PTkxZX1lNRF9SRUdFWC50ZXN0KGRhdGVPbmx5KSkge1xyXG4gICAgY29uc3QgW3llYXJUZXh0LCBtb250aFRleHQsIGRheVRleHRdID0gZGF0ZU9ubHkuc3BsaXQoL1suLy1dLyk7XHJcbiAgICBjb25zdCBwYXJzZWRZZWFyID0gTnVtYmVyKHllYXJUZXh0KTtcclxuICAgIHJldHVybiBidWlsZERhdGUocGFyc2VkWWVhciwgTnVtYmVyKG1vbnRoVGV4dCksIE51bWJlcihkYXlUZXh0KSkgPz9cclxuICAgICAgYnVpbGREYXRlKGV4cGFuZFR3b0RpZ2l0RXhwZW5zZVllYXIocGFyc2VkWWVhciksIE51bWJlcihtb250aFRleHQpLCBOdW1iZXIoZGF5VGV4dCkpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcGFyc2VkID0gbmV3IERhdGUodmFsdWUpO1xyXG4gIHJldHVybiBOdW1iZXIuaXNOYU4ocGFyc2VkLmdldFRpbWUoKSkgfHwgIWlzU3VwcG9ydGVkRXhwZW5zZVllYXIocGFyc2VkLmdldEZ1bGxZZWFyKCkpID8gbnVsbCA6IHBhcnNlZDtcclxufTtcclxuXHJcbi8vIENvbnZlcnRzIHVua25vd24gZGF0ZSBpbnB1dCBpbnRvIHN0cmljdCBERC5NTS5ZWVlZIHVzZWQgYnkgYmFja2VuZCBjb250cmFjdHMuXHJcbmV4cG9ydCBjb25zdCB0b0V4cGVuc2VBcGlEYXRlID0gKHJhdzogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VFeHBlbnNlQXBpRGF0ZShyYXcpO1xyXG4gIGlmICghcGFyc2VkKSByZXR1cm4gXCJcIjtcclxuICByZXR1cm4gdG9EZE1tWXl5eURvdHRlZChwYXJzZWQpO1xyXG59O1xyXG5cclxuLy8gQmFja3dhcmQtY29tcGF0aWJsZSBhbGlhcyBrZXB0IHRvIGF2b2lkIGJyb2FkIHJlbmFtZXMgaW4gZXhpc3RpbmcgbW9kdWxlcy5cclxuZXhwb3J0IGNvbnN0IHRvRXhwZW5zZUFwaURkTW1ZeXl5ID0gKHJhdzogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIHRvRXhwZW5zZUFwaURhdGUocmF3KTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc0V4cGVuc2VBcGlEZE1tWXl5eSA9IChyYXc6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICBjb25zdCB2YWx1ZSA9IHNhZmVUZXh0KHJhdyk7XHJcbiAgY29uc3QgaXNDb21wYWN0ID0gRERNTVlZWVlfQ09NUEFDVF9SRUdFWC50ZXN0KHZhbHVlKTtcclxuICBjb25zdCBpc0RvdHRlZCA9IERETU1ZWVlZX0RPVFRFRF9SRUdFWC50ZXN0KHZhbHVlKTtcclxuICBpZiAoIWlzQ29tcGFjdCAmJiAhaXNEb3R0ZWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VFeHBlbnNlQXBpRGF0ZSh2YWx1ZSk7XHJcbiAgaWYgKCFwYXJzZWQpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKGlzQ29tcGFjdCkgcmV0dXJuIHRvRGRNbVl5eXlDb21wYWN0KHBhcnNlZCkgPT09IHZhbHVlO1xyXG4gIHJldHVybiB0b0RkTW1ZeXl5RG90dGVkKHBhcnNlZCkgPT09IHZhbHVlO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHRvRXhwZW5zZUlzb0RhdGUgPSAocmF3OiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSBwYXJzZUV4cGVuc2VBcGlEYXRlKHJhdyk7XHJcbiAgaWYgKCFwYXJzZWQpIHJldHVybiBcIlwiO1xyXG5cclxuICBjb25zdCB5ZWFyID0gU3RyaW5nKHBhcnNlZC5nZXRGdWxsWWVhcigpKTtcclxuICBjb25zdCBtb250aCA9IFN0cmluZyhwYXJzZWQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICBjb25zdCBkYXkgPSBTdHJpbmcocGFyc2VkLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gIHJldHVybiBgJHt5ZWFyfS0ke21vbnRofS0ke2RheX1gO1xyXG59O1xyXG4iLCAiXHVGRUZGaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZUdhc3RvVHlwZUNvZGUsIEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0IH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGZvcm1hdEV4cGVuc2VHYXN0b1R5cGVBbGxvd2VkTWVzc2FnZSxcclxuICB0b0V4cGVuc2VHYXN0b1R5cGVDb2RlLFxyXG59IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZUdhc3RvVHlwZUNhdGFsb2cudHNcIjtcclxuaW1wb3J0IHtcclxuICBFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFLFxyXG4gIGlzRXhwZW5zZUFwaURkTW1ZeXl5LFxyXG4gIHRvRXhwZW5zZUFwaURkTW1ZeXl5LFxyXG59IGZyb20gXCIuL2V4cGVuc2VBcGlEYXRlVXRpbHMudHNcIjtcclxuXHJcbi8vIENvbnZlcnRzIHVua25vd24gdmFsdWVzIHRvIHRyaW1tZWQgdGV4dC5cclxuZXhwb3J0IGNvbnN0IHNhZmVUZXh0ID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XHJcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG59O1xyXG5cclxuLy8gQ29udmVydHMgdW5rbm93biB2YWx1ZXMgdG8gbnVsbGFibGUgZmluaXRlIG51bWJlcnMuXHJcbmV4cG9ydCBjb25zdCB0b051bGxhYmxlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XHJcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpID8gcGFyc2VkIDogbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc05vbk5lZ2F0aXZlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gdG9OdWxsYWJsZU51bWJlcih2YWx1ZSk7XHJcbiAgcmV0dXJuIHBhcnNlZCAhPT0gbnVsbCAmJiBwYXJzZWQgPj0gMDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc1Bvc2l0aXZlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gdG9OdWxsYWJsZU51bWJlcih2YWx1ZSk7XHJcbiAgcmV0dXJuIHBhcnNlZCAhPT0gbnVsbCAmJiBwYXJzZWQgPiAwO1xyXG59O1xyXG5cclxuY29uc3QgaXNWYWxpZExpc3RFeHBlbnNlU2hlZXRTdGF0dXMgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSB0b051bGxhYmxlTnVtYmVyKHZhbHVlKTtcclxuICByZXR1cm4gcGFyc2VkICE9PSBudWxsICYmIE51bWJlci5pc0ludGVnZXIocGFyc2VkKSAmJiBwYXJzZWQgPj0gMDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZSA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IHBhcnNlZCA9IHRvTnVsbGFibGVOdW1iZXIodmFsdWUpO1xyXG4gIGlmIChwYXJzZWQgIT09IG51bGwgJiYgTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpICYmIHBhcnNlZCA+PSAwKSB7XHJcbiAgICByZXR1cm4gcGFyc2VkO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlR2FzdG9UeXBlQ29kZSB8IG51bGwgPT4ge1xyXG4gIHJldHVybiB0b0V4cGVuc2VHYXN0b1R5cGVDb2RlKHZhbHVlKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VHYXN0b1R5cGVDb2RlIHwgdW5kZWZpbmVkID0+IHtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCBzYWZlVGV4dCh2YWx1ZSkgPT09IFwiXCIpIHtcclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwYXJzZWQgPSB0b051bGxhYmxlR2FzdG9UeXBlQ29kZSh2YWx1ZSk7XHJcbiAgaWYgKHBhcnNlZCA9PT0gbnVsbCkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoZm9ybWF0RXhwZW5zZUdhc3RvVHlwZUFsbG93ZWRNZXNzYWdlKCkpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHBhcnNlZDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVUaWNrZXRMaXN0R2FzdG9UeXBlID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3RbXCJnYXN0b1R5cGVcIl0gPT4ge1xyXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHNhZmVUZXh0KHZhbHVlKSA9PT0gXCJcIikge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUodmFsdWUpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgc2FmZVRleHQodmFsdWUpID09PSBcIlwiKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZSh2YWx1ZSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdERhdGUgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHJhdyA9IHNhZmVUZXh0KHZhbHVlKTtcclxuICBpZiAoIXJhdykgcmV0dXJuIFwiXCI7XHJcblxyXG4gIHJldHVybiB0b0V4cGVuc2VBcGlEZE1tWXl5eShyYXcpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZSA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XHJcbiAgY29uc3QgcmF3ID0gc2FmZVRleHQodmFsdWUpO1xyXG4gIGlmICghcmF3KSByZXR1cm4gdW5kZWZpbmVkO1xyXG5cclxuICBjb25zdCBub3JtYWxpemVkID0gdG9FeHBlbnNlQXBpRGRNbVl5eXkocmF3KTtcclxuICByZXR1cm4gbm9ybWFsaXplZCB8fCB1bmRlZmluZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlKHZhbHVlKTtcclxuICBpZiAoIW5vcm1hbGl6ZWQpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xyXG4gIH1cclxuICByZXR1cm4gbm9ybWFsaXplZDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUFwaURkTW1ZeXl5T3JUaHJvdyA9ICh2YWx1ZTogdW5rbm93bik6IHZvaWQgPT4ge1xyXG4gIGlmICghaXNFeHBlbnNlQXBpRGRNbVl5eXkodmFsdWUpKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdG9OdWxsYWJsZUJvb2wgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuIHwgbnVsbCA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSByZXR1cm4gdmFsdWU7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IHZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKG5vcm1hbGl6ZWQgPT09IFwidHJ1ZVwiIHx8IG5vcm1hbGl6ZWQgPT09IFwiMVwiKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmIChub3JtYWxpemVkID09PSBcImZhbHNlXCIgfHwgbm9ybWFsaXplZCA9PT0gXCIwXCIpIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgaWYgKHZhbHVlID09PSAxKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmICh2YWx1ZSA9PT0gMCkgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUkgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuIHwgbnVsbCA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgc2FmZVRleHQodmFsdWUpID09PSBcIlwiKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiB0b051bGxhYmxlQm9vbCh2YWx1ZSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlciA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xyXG4gIHJldHVybiBpc1ZhbGlkTGlzdEV4cGVuc2VTaGVldFN0YXR1cyh2YWx1ZSkgPyBOdW1iZXIodmFsdWUpIDogbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB0b0ZsYWdCb29sID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRCb29sID0gdG9OdWxsYWJsZUJvb2wodmFsdWUpO1xyXG4gIGlmIChub3JtYWxpemVkQm9vbCAhPT0gbnVsbCkgcmV0dXJuIG5vcm1hbGl6ZWRCb29sO1xyXG5cclxuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBub3JtYWxpemVkID0gdmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gbnVsbDtcclxuICBpZiAobm9ybWFsaXplZCA9PT0gXCJvblwiIHx8IG5vcm1hbGl6ZWQgPT09IFwieWVzXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJ5XCIpIHJldHVybiB0cnVlO1xyXG4gIGlmIChub3JtYWxpemVkID09PSBcIm9mZlwiIHx8IG5vcm1hbGl6ZWQgPT09IFwibm9cIiB8fCBub3JtYWxpemVkID09PSBcIm5cIikgcmV0dXJuIGZhbHNlO1xyXG4gIHJldHVybiBudWxsO1xyXG59O1xyXG4iLCAidHlwZSBFeHBlbnNlU2NvcGVXaW5kb3cgPSB7XHJcbiAgX19JTkRfRU5UUkFfT0lEX18/OiB1bmtub3duO1xyXG4gIF9fSU5EX1NFTEVDVEVEX0NPTVBBTllfXz86IHVua25vd247XHJcbiAgX19JTkRfQ09NUEFOWV9fPzogdW5rbm93bjtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVNjb3BlUGFydCA9ICh2YWx1ZTogdW5rbm93biwgdXBwZXJjYXNlID0gZmFsc2UpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xyXG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIFwiXCI7XHJcbiAgcmV0dXJuIHVwcGVyY2FzZSA/IG5vcm1hbGl6ZWQudG9VcHBlckNhc2UoKSA6IG5vcm1hbGl6ZWQudG9Mb3dlckNhc2UoKTtcclxufTtcclxuXHJcbi8vIFJlYWRzIHRoZSBjdXJyZW50IHNlc3Npb24gc2NvcGUgdmFsdWVzIHVzZWQgYnkgR2FzdG9zIGNhY2hlcy5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTY29wZVZhbHVlcyA9ICgpID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZW50cmFPaWQ6IFwiXCIsXHJcbiAgICAgIGNvbXBhbnlJZDogXCJcIixcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb25zdCBydW50aW1lV2luZG93ID0gd2luZG93IGFzIEV4cGVuc2VTY29wZVdpbmRvdztcclxuICBjb25zdCBlbnRyYU9pZCA9IG5vcm1hbGl6ZVNjb3BlUGFydChydW50aW1lV2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKTtcclxuICBjb25zdCBjb21wYW55SWQgPSBub3JtYWxpemVTY29wZVBhcnQocnVudGltZVdpbmRvdy5fX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18gfHwgcnVudGltZVdpbmRvdy5fX0lORF9DT01QQU5ZX18sIHRydWUpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZW50cmFPaWQsXHJcbiAgICBjb21wYW55SWQsXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIEJ1aWxkcyB0aGUgc3RhbmRhcmQgR2FzdG9zIGNhY2hlIHNjb3BlIGtleSAoZW50cmFPaWQgKyBjb21wYW55SWQpLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVNjb3BlVG9rZW4gPSAoKTogc3RyaW5nID0+IHtcclxuICBjb25zdCB7IGVudHJhT2lkLCBjb21wYW55SWQgfSA9IGdldEV4cGVuc2VTY29wZVZhbHVlcygpO1xyXG4gIGNvbnN0IHNjb3BlID0gYCR7ZW50cmFPaWR9X18ke2NvbXBhbnlJZH1gLnJlcGxhY2UoL15fK3xfKyQvZywgXCJcIik7XHJcbiAgcmV0dXJuIHNjb3BlIHx8IFwic2Vzc2lvblwiO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VTY29wZVRva2VuIH0gZnJvbSBcIi4vZXhwZW5zZVNjb3BlLnRzXCI7XHJcblxyXG5jb25zdCBub3JtYWxpemVVc2VySWQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcclxuY29uc3QgRVhQRU5TRV9BQ1RJTkdfVVNFUl9LRVlfUFJFRklYID0gXCJleHBlbnNlX2FjdGluZ191c2VyX3YxXCI7XHJcbmNvbnN0IEVYUEVOU0VfQUNUSU5HX1VTRVJfVFRMX01TID0gMTIgKiA2MCAqIDYwICogMTAwMDtcclxuXHJcbmNvbnN0IGdldFNjb3BlZEtleSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBgJHtFWFBFTlNFX0FDVElOR19VU0VSX0tFWV9QUkVGSVh9XyR7Z2V0RXhwZW5zZVNjb3BlVG9rZW4oKX1gO1xyXG59O1xyXG5cclxuLy8gUmV0dXJucyB0aGUgYWN0aXZlIEF4VXNlcklkIG92ZXJyaWRlIHVzZWQgYnkgR2FzdG9zIEFQSSBjYWxscy5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUgPSAoKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gbm9ybWFsaXplVXNlcklkKGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoZ2V0U2NvcGVkS2V5KCkpKTtcclxufTtcclxuXHJcbi8vIFNldHMgdGhlIGFjdGl2ZSBBeFVzZXJJZCBvdmVycmlkZSB1c2VkIGJ5IEdhc3RvcyBBUEkgY2FsbHMuXHJcbmV4cG9ydCBjb25zdCBzZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlID0gKHVzZXJJZDogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZVVzZXJJZCh1c2VySWQpO1xyXG4gIGlmICghbm9ybWFsaXplZCkge1xyXG4gICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShnZXRTY29wZWRLZXkoKSk7XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9XHJcbiAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShnZXRTY29wZWRLZXkoKSwgbm9ybWFsaXplZCwgRVhQRU5TRV9BQ1RJTkdfVVNFUl9UVExfTVMpO1xyXG4gIHJldHVybiBub3JtYWxpemVkO1xyXG59O1xyXG5cclxuLy8gQ2xlYXJzIHRoZSBhY3RpdmUgQXhVc2VySWQgb3ZlcnJpZGUuXHJcbmV4cG9ydCBjb25zdCBjbGVhckV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUgPSAoKTogdm9pZCA9PiB7XHJcbiAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShnZXRTY29wZWRLZXkoKSk7XHJcbn07XHJcbiIsICJpbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuL2V4cGVuc2VBcGlUcmFuc2Zvcm1zLnRzXCI7XHJcblxyXG50eXBlIFJhd0V4cGVuc2VTdWJvcmRpbmF0ZSA9IHtcclxuICBjcm1Vc2VySWQ/OiB1bmtub3duO1xyXG4gIENybVVzZXJJZD86IHVua25vd247XHJcbiAgYXhVc2VySWQ/OiB1bmtub3duO1xyXG4gIEF4VXNlcklkPzogdW5rbm93bjtcclxuICB1c2VySWQ/OiB1bmtub3duO1xuICBVc2VySWQ/OiB1bmtub3duO1xuICB1c2VyTmFtZT86IHVua25vd247XG4gIFVzZXJOYW1lPzogdW5rbm93bjtcbiAgbmFtZT86IHVua25vd247XG4gIE5hbWU/OiB1bmtub3duO1xufTtcblxyXG5jb25zdCByZXNvbHZlU3Vib3JkaW5hdGVPYmplY3QgPSAoaXRlbTogUmF3RXhwZW5zZVN1Ym9yZGluYXRlKTogRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG8gfCBudWxsID0+IHtcclxuICBjb25zdCBsZWdhY3lVc2VySWQgPSBzYWZlVGV4dChpdGVtLnVzZXJJZCA/PyBpdGVtLlVzZXJJZCk7XHJcbiAgY29uc3QgY3JtVXNlcklkID0gc2FmZVRleHQoaXRlbS5jcm1Vc2VySWQgPz8gaXRlbS5Dcm1Vc2VySWQgPz8gbGVnYWN5VXNlcklkKTtcclxuICBjb25zdCBheFVzZXJJZCA9IHNhZmVUZXh0KGl0ZW0uYXhVc2VySWQgPz8gaXRlbS5BeFVzZXJJZCA/PyBsZWdhY3lVc2VySWQpO1xyXG4gIGNvbnN0IHJlc29sdmVkQ3JtVXNlcklkID0gY3JtVXNlcklkIHx8IGF4VXNlcklkO1xyXG4gIGNvbnN0IHJlc29sdmVkQXhVc2VySWQgPSBheFVzZXJJZCB8fCBjcm1Vc2VySWQ7XHJcblxyXG4gIGlmICghcmVzb2x2ZWRDcm1Vc2VySWQgfHwgIXJlc29sdmVkQXhVc2VySWQpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbmFtZSA9IHNhZmVUZXh0KGl0ZW0ubmFtZSA/PyBpdGVtLk5hbWUgPz8gaXRlbS51c2VyTmFtZSA/PyBpdGVtLlVzZXJOYW1lKSB8fCByZXNvbHZlZEF4VXNlcklkO1xuICByZXR1cm4ge1xyXG4gICAgY3JtVXNlcklkOiByZXNvbHZlZENybVVzZXJJZCxcclxuICAgIGF4VXNlcklkOiByZXNvbHZlZEF4VXNlcklkLFxyXG4gICAgbmFtZSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZVN1Ym9yZGluYXRlQXJyYXkgPSAoaXRlbTogdW5rbm93bltdKTogRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG8gfCBudWxsID0+IHtcclxuICAvLyBMZWdhY3kgQVggcGF5bG9hZCBzaGFwZTogW3VzZXJJZCwgbmFtZV1cclxuICBpZiAoaXRlbS5sZW5ndGggPCAzKSB7XHJcbiAgICBjb25zdCBsZWdhY3lVc2VySWQgPSBzYWZlVGV4dChpdGVtWzBdKTtcclxuICAgIGlmICghbGVnYWN5VXNlcklkKSByZXR1cm4gbnVsbDtcclxuICAgIGNvbnN0IGxlZ2FjeU5hbWUgPSBzYWZlVGV4dChpdGVtWzFdKSB8fCBsZWdhY3lVc2VySWQ7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjcm1Vc2VySWQ6IGxlZ2FjeVVzZXJJZCxcclxuICAgICAgYXhVc2VySWQ6IGxlZ2FjeVVzZXJJZCxcclxuICAgICAgbmFtZTogbGVnYWN5TmFtZSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvLyBDdXJyZW50IEFYIHBheWxvYWQgc2hhcGU6IFtjcm1Vc2VySWQsIGF4VXNlcklkLCBuYW1lXVxyXG4gIGNvbnN0IGNybVVzZXJJZCA9IHNhZmVUZXh0KGl0ZW1bMF0pO1xyXG4gIGNvbnN0IGF4VXNlcklkID0gc2FmZVRleHQoaXRlbVsxXSk7XHJcbiAgY29uc3QgZmFsbGJhY2tJZCA9IHNhZmVUZXh0KGl0ZW1bMF0gPz8gaXRlbVsxXSk7XHJcbiAgY29uc3QgcmVzb2x2ZWRDcm1Vc2VySWQgPSBjcm1Vc2VySWQgfHwgZmFsbGJhY2tJZDtcclxuICBjb25zdCByZXNvbHZlZEF4VXNlcklkID0gYXhVc2VySWQgfHwgZmFsbGJhY2tJZDtcclxuXHJcbiAgaWYgKCFyZXNvbHZlZENybVVzZXJJZCB8fCAhcmVzb2x2ZWRBeFVzZXJJZCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdCBuYW1lID0gc2FmZVRleHQoaXRlbVsyXSkgfHwgcmVzb2x2ZWRBeFVzZXJJZDtcclxuICByZXR1cm4ge1xyXG4gICAgY3JtVXNlcklkOiByZXNvbHZlZENybVVzZXJJZCxcclxuICAgIGF4VXNlcklkOiByZXNvbHZlZEF4VXNlcklkLFxyXG4gICAgbmFtZSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gTWFwcyBvbmUgcmF3IHN1Ym9yZGluYXRlIGl0ZW0gZnJvbSBsZWdhY3kgb3IgbmV3IEFQSSBzaGFwZS5cclxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlID0gKGl0ZW06IHVua25vd24pOiBFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0byB8IG51bGwgPT4ge1xyXG4gIGlmICghaXRlbSkgcmV0dXJuIG51bGw7XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcclxuICAgIHJldHVybiByZXNvbHZlU3Vib3JkaW5hdGVBcnJheShpdGVtKTtcclxuICB9XHJcbiAgaWYgKHR5cGVvZiBpdGVtICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcclxuICByZXR1cm4gcmVzb2x2ZVN1Ym9yZGluYXRlT2JqZWN0KGl0ZW0gYXMgUmF3RXhwZW5zZVN1Ym9yZGluYXRlKTtcclxufTtcclxuXHJcbi8vIE5vcm1hbGl6ZXMgcmF3IHN1Ym9yZGluYXRlIGFycmF5cyBhbmQgZHJvcHMgbWFsZm9ybWVkIGVudHJpZXMuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZXMgPSAoc291cmNlOiB1bmtub3duKTogRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG9bXSA9PiB7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KHNvdXJjZSkpIHJldHVybiBbXTtcclxuXHJcbiAgcmV0dXJuIHNvdXJjZVxyXG4gICAgLm1hcCgoZW50cnkpID0+IG1hcEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlKGVudHJ5KSlcclxuICAgIC5maWx0ZXIoKGVudHJ5KTogZW50cnkgaXMgRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG8gPT4gISFlbnRyeSk7XHJcbn07XHJcbiJd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
