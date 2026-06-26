import {
  ApiFetchError,
  indT
} from "./chunk-63VW7TTG.js";
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
var FALLBACK_EXPENSE_GASTO_TYPE_CODES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 14, 20, 21];
var FALLBACK_EXPENSE_GASTO_TYPE_OPTIONS = [
  { value: 0, labelKey: "Enum_None", fallback: "None" },
  { value: 1, labelKey: "Enum_GastoType_Peaje", fallback: "Peaje" },
  { value: 2, labelKey: "Enum_GastoType_Parking", fallback: "Parking" },
  { value: 3, labelKey: "Enum_GastoType_Km", fallback: "Km" },
  { value: 4, labelKey: "Enum_GastoType_Desayuno", fallback: "Desayuno" },
  { value: 5, labelKey: "Enum_GastoType_Comida", fallback: "Comida" },
  { value: 6, labelKey: "Enum_GastoType_Cena", fallback: "Cena" },
  { value: 7, labelKey: "Enum_GastoType_Hotel", fallback: "Hotel" },
  { value: 8, labelKey: "Enum_GastoType_Varios", fallback: "Varios" },
  { value: 14, labelKey: "Enum_GastoType_Taxi", fallback: "Taxi" },
  { value: 20, labelKey: "Enum_GastoType_Gasolina", fallback: "Gasolina" },
  { value: 21, labelKey: "Enum_GastoType_AdjustmentAmount", fallback: "AdjustmentAmount" }
];
var toIntegerGastoTypeCode = (value) => {
  if (value === null || value === void 0) return null;
  if (typeof value === "string" && !value.trim()) return null;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : null;
};
var getCatalogSource = () => {
  if (typeof window === "undefined" || !Array.isArray(window.__EXPENSE_GASTO_TYPES__)) {
    return [];
  }
  return window.__EXPENSE_GASTO_TYPES__;
};
var getCatalogOptions = () => {
  const seen = /* @__PURE__ */ new Set();
  const options = [];
  for (const option of mapWindowEnumOptions(getCatalogSource())) {
    const code = toIntegerGastoTypeCode(option.value);
    if (code === null) continue;
    const key = String(code);
    if (seen.has(key)) continue;
    seen.add(key);
    options.push({
      value: key,
      text: option.text
    });
  }
  return options;
};
var getFallbackOptions = () => {
  return FALLBACK_EXPENSE_GASTO_TYPE_OPTIONS.map((option) => ({
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
  const name = safeText2(item.name ?? item.Name) || resolvedAxUserId;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlU2VsZWN0T3B0aW9ucy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbnN0YW50cy9leHBlbnNlR2FzdG9UeXBlQ2F0YWxvZy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VBcGlEYXRlVXRpbHMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlQXBpVHJhbnNmb3Jtcy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VTY29wZS50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VBY3RpbmdVc2VyLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZVN1Ym9yZGluYXRlTWFwcGVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7IFJlYWN0Tm9kZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgRXhwZW5zZVNlbGVjdE9wdGlvbiA9IHtcclxuICB2YWx1ZTogc3RyaW5nO1xyXG4gIHRleHQ6IHN0cmluZztcclxuICBpY29uPzogUmVhY3ROb2RlO1xyXG59O1xyXG5cclxudHlwZSBXaW5kb3dFbnVtSXRlbSA9IHtcclxuICB2YWx1ZT86IHVua25vd247XHJcbiAgVmFsdWU/OiB1bmtub3duO1xyXG4gIHRleHQ/OiB1bmtub3duO1xyXG4gIFRleHQ/OiB1bmtub3duO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUV4cGVuc2VPcHRpb25WYWx1ZSA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSA/PyBcIlwiKS50cmltKCk7XHJcbn07XHJcblxyXG4vLyBNYXBzIG1peGVkLWNhc2UgZW51bSBwYXlsb2FkcyAoVmFsdWUvdmFsdWUgKyBUZXh0L3RleHQpIGludG8gb25lIG5vcm1hbGl6ZWQgbGlzdC5cclxuZXhwb3J0IGNvbnN0IG1hcFdpbmRvd0VudW1PcHRpb25zID0gKHNvdXJjZTogV2luZG93RW51bUl0ZW1bXSk6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9PiB7XHJcbiAgcmV0dXJuIHNvdXJjZVxyXG4gICAgLm1hcCgoaXRlbSkgPT4gKHtcclxuICAgICAgdmFsdWU6IG5vcm1hbGl6ZUV4cGVuc2VPcHRpb25WYWx1ZShpdGVtPy52YWx1ZSA/PyBpdGVtPy5WYWx1ZSksXHJcbiAgICAgIHRleHQ6IG5vcm1hbGl6ZUV4cGVuc2VPcHRpb25WYWx1ZShpdGVtPy50ZXh0ID8/IGl0ZW0/LlRleHQpLFxyXG4gICAgfSkpXHJcbiAgICAuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnZhbHVlICYmIGl0ZW0udGV4dCk7XHJcbn07XHJcblxyXG4vLyBDb252ZXJ0cyBib29sZWFuIGVudW1zIHRvIHNlbGVjdCBvcHRpb25zIHdpdGggc3RyaW5nIGJvb2xlYW4gdmFsdWVzLlxyXG5leHBvcnQgY29uc3QgbWFwQm9vbGVhbkVudW1PcHRpb25zID0gKHNvdXJjZTogQXJyYXk8eyB2YWx1ZTogYm9vbGVhbjsgdGV4dDogc3RyaW5nIH0+KTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcclxuICByZXR1cm4gc291cmNlLm1hcCgoaXRlbSkgPT4gKHtcclxuICAgIHZhbHVlOiBpdGVtLnZhbHVlID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIsXHJcbiAgICB0ZXh0OiBub3JtYWxpemVFeHBlbnNlT3B0aW9uVmFsdWUoaXRlbS50ZXh0KSxcclxuICB9KSk7XHJcbn07XHJcbiIsICJpbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZUdhc3RvVHlwZUNvZGUgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBtYXBXaW5kb3dFbnVtT3B0aW9ucywgdHlwZSBFeHBlbnNlU2VsZWN0T3B0aW9uIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VTZWxlY3RPcHRpb25zLnRzXCI7XG5cbnR5cGUgR2FzdG9UeXBlRmFsbGJhY2tPcHRpb24gPSB7XG4gIHZhbHVlOiBFeHBlbnNlR2FzdG9UeXBlQ29kZTtcbiAgbGFiZWxLZXk6IHN0cmluZztcbiAgZmFsbGJhY2s6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBGQUxMQkFDS19FWFBFTlNFX0dBU1RPX1RZUEVfQ09ERVM6IEV4cGVuc2VHYXN0b1R5cGVDb2RlW10gPSBbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMTQsIDIwLCAyMV07XG5cbmNvbnN0IEZBTExCQUNLX0VYUEVOU0VfR0FTVE9fVFlQRV9PUFRJT05TOiBHYXN0b1R5cGVGYWxsYmFja09wdGlvbltdID0gW1xuICB7IHZhbHVlOiAwLCBsYWJlbEtleTogXCJFbnVtX05vbmVcIiwgZmFsbGJhY2s6IFwiTm9uZVwiIH0sXG4gIHsgdmFsdWU6IDEsIGxhYmVsS2V5OiBcIkVudW1fR2FzdG9UeXBlX1BlYWplXCIsIGZhbGxiYWNrOiBcIlBlYWplXCIgfSxcbiAgeyB2YWx1ZTogMiwgbGFiZWxLZXk6IFwiRW51bV9HYXN0b1R5cGVfUGFya2luZ1wiLCBmYWxsYmFjazogXCJQYXJraW5nXCIgfSxcbiAgeyB2YWx1ZTogMywgbGFiZWxLZXk6IFwiRW51bV9HYXN0b1R5cGVfS21cIiwgZmFsbGJhY2s6IFwiS21cIiB9LFxuICB7IHZhbHVlOiA0LCBsYWJlbEtleTogXCJFbnVtX0dhc3RvVHlwZV9EZXNheXVub1wiLCBmYWxsYmFjazogXCJEZXNheXVub1wiIH0sXG4gIHsgdmFsdWU6IDUsIGxhYmVsS2V5OiBcIkVudW1fR2FzdG9UeXBlX0NvbWlkYVwiLCBmYWxsYmFjazogXCJDb21pZGFcIiB9LFxuICB7IHZhbHVlOiA2LCBsYWJlbEtleTogXCJFbnVtX0dhc3RvVHlwZV9DZW5hXCIsIGZhbGxiYWNrOiBcIkNlbmFcIiB9LFxuICB7IHZhbHVlOiA3LCBsYWJlbEtleTogXCJFbnVtX0dhc3RvVHlwZV9Ib3RlbFwiLCBmYWxsYmFjazogXCJIb3RlbFwiIH0sXG4gIHsgdmFsdWU6IDgsIGxhYmVsS2V5OiBcIkVudW1fR2FzdG9UeXBlX1Zhcmlvc1wiLCBmYWxsYmFjazogXCJWYXJpb3NcIiB9LFxuICB7IHZhbHVlOiAxNCwgbGFiZWxLZXk6IFwiRW51bV9HYXN0b1R5cGVfVGF4aVwiLCBmYWxsYmFjazogXCJUYXhpXCIgfSxcbiAgeyB2YWx1ZTogMjAsIGxhYmVsS2V5OiBcIkVudW1fR2FzdG9UeXBlX0dhc29saW5hXCIsIGZhbGxiYWNrOiBcIkdhc29saW5hXCIgfSxcbiAgeyB2YWx1ZTogMjEsIGxhYmVsS2V5OiBcIkVudW1fR2FzdG9UeXBlX0FkanVzdG1lbnRBbW91bnRcIiwgZmFsbGJhY2s6IFwiQWRqdXN0bWVudEFtb3VudFwiIH0sXG5dO1xuXG5jb25zdCB0b0ludGVnZXJHYXN0b1R5cGVDb2RlID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZUdhc3RvVHlwZUNvZGUgfCBudWxsID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmICF2YWx1ZS50cmltKCkpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIHJldHVybiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgJiYgcGFyc2VkID49IDAgPyBwYXJzZWQgOiBudWxsO1xufTtcblxuY29uc3QgZ2V0Q2F0YWxvZ1NvdXJjZSA9ICgpID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgIUFycmF5LmlzQXJyYXkod2luZG93Ll9fRVhQRU5TRV9HQVNUT19UWVBFU19fKSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHJldHVybiB3aW5kb3cuX19FWFBFTlNFX0dBU1RPX1RZUEVTX187XG59O1xuXG5jb25zdCBnZXRDYXRhbG9nT3B0aW9ucyA9ICgpOiBFeHBlbnNlU2VsZWN0T3B0aW9uW10gPT4ge1xuICBjb25zdCBzZWVuID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIGNvbnN0IG9wdGlvbnM6IEV4cGVuc2VTZWxlY3RPcHRpb25bXSA9IFtdO1xuXG4gIGZvciAoY29uc3Qgb3B0aW9uIG9mIG1hcFdpbmRvd0VudW1PcHRpb25zKGdldENhdGFsb2dTb3VyY2UoKSkpIHtcbiAgICBjb25zdCBjb2RlID0gdG9JbnRlZ2VyR2FzdG9UeXBlQ29kZShvcHRpb24udmFsdWUpO1xuICAgIGlmIChjb2RlID09PSBudWxsKSBjb250aW51ZTtcblxuICAgIGNvbnN0IGtleSA9IFN0cmluZyhjb2RlKTtcbiAgICBpZiAoc2Vlbi5oYXMoa2V5KSkgY29udGludWU7XG4gICAgc2Vlbi5hZGQoa2V5KTtcbiAgICBvcHRpb25zLnB1c2goe1xuICAgICAgdmFsdWU6IGtleSxcbiAgICAgIHRleHQ6IG9wdGlvbi50ZXh0LFxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIG9wdGlvbnM7XG59O1xuXG5jb25zdCBnZXRGYWxsYmFja09wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcbiAgcmV0dXJuIEZBTExCQUNLX0VYUEVOU0VfR0FTVE9fVFlQRV9PUFRJT05TLm1hcCgob3B0aW9uKSA9PiAoe1xuICAgIHZhbHVlOiBTdHJpbmcob3B0aW9uLnZhbHVlKSxcbiAgICB0ZXh0OiBpbmRUKG9wdGlvbi5sYWJlbEtleSwgb3B0aW9uLmZhbGxiYWNrKSxcbiAgfSkpO1xufTtcblxuLy8gUmV0dXJucyBjYXRhbG9nIG9wdGlvbnMgaW4gYmFja2VuZCBTb3J0T3JkZXIgb3JkZXIsIGZhbGxpbmcgYmFjayBvbmx5IHdoZW4gdGhlIGNhdGFsb2cgaXMgdW5hdmFpbGFibGUuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZUdhc3RvVHlwZU9wdGlvbnMgPSAoKTogRXhwZW5zZVNlbGVjdE9wdGlvbltdID0+IHtcbiAgY29uc3QgY2F0YWxvZ09wdGlvbnMgPSBnZXRDYXRhbG9nT3B0aW9ucygpO1xuICByZXR1cm4gY2F0YWxvZ09wdGlvbnMubGVuZ3RoID4gMCA/IGNhdGFsb2dPcHRpb25zIDogZ2V0RmFsbGJhY2tPcHRpb25zKCk7XG59O1xuXG4vLyBCdWlsZHMgdGhlIGFjdGl2ZSB2YWx1ZSBzZXQgdXNlZCBieSBmaWx0ZXJzLCBjYWNoZXMsIGFuZCByZXF1ZXN0IHBheWxvYWQgZ3VhcmRzLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VHYXN0b1R5cGVDb2RlU2V0ID0gKHtcbiAgaW5jbHVkZUZhbGxiYWNrSWZFbXB0eSA9IHRydWUsXG59OiB7XG4gIGluY2x1ZGVGYWxsYmFja0lmRW1wdHk/OiBib29sZWFuO1xufSA9IHt9KTogU2V0PEV4cGVuc2VHYXN0b1R5cGVDb2RlPiA9PiB7XG4gIGNvbnN0IGNhdGFsb2dPcHRpb25zID0gZ2V0Q2F0YWxvZ09wdGlvbnMoKTtcbiAgaWYgKGNhdGFsb2dPcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gbmV3IFNldChcbiAgICAgIGNhdGFsb2dPcHRpb25zXG4gICAgICAgIC5tYXAoKG9wdGlvbikgPT4gdG9JbnRlZ2VyR2FzdG9UeXBlQ29kZShvcHRpb24udmFsdWUpKVxuICAgICAgICAuZmlsdGVyKChjb2RlKTogY29kZSBpcyBFeHBlbnNlR2FzdG9UeXBlQ29kZSA9PiBjb2RlICE9PSBudWxsKVxuICAgICk7XG4gIH1cblxuICByZXR1cm4gaW5jbHVkZUZhbGxiYWNrSWZFbXB0eSA/IG5ldyBTZXQoRkFMTEJBQ0tfRVhQRU5TRV9HQVNUT19UWVBFX0NPREVTKSA6IG5ldyBTZXQoKTtcbn07XG5cbi8vIENvbnZlcnRzIHVua25vd24gaW5wdXQgdG8gYSB2YWxpZCBDUk1HYXN0b1R5cGUgdmFsdWUgZnJvbSB0aGUgYWN0aXZlIGNhdGFsb2cuXG5leHBvcnQgY29uc3QgdG9FeHBlbnNlR2FzdG9UeXBlQ29kZSA9IChcbiAgdmFsdWU6IHVua25vd24sXG4gIHtcbiAgICBhbGxvd05vbmUgPSB0cnVlLFxuICAgIGluY2x1ZGVGYWxsYmFja0lmRW1wdHkgPSB0cnVlLFxuICB9OiB7XG4gICAgYWxsb3dOb25lPzogYm9vbGVhbjtcbiAgICBpbmNsdWRlRmFsbGJhY2tJZkVtcHR5PzogYm9vbGVhbjtcbiAgfSA9IHt9XG4pOiBFeHBlbnNlR2FzdG9UeXBlQ29kZSB8IG51bGwgPT4ge1xuICBjb25zdCBjb2RlID0gdG9JbnRlZ2VyR2FzdG9UeXBlQ29kZSh2YWx1ZSk7XG4gIGlmIChjb2RlID09PSBudWxsKSByZXR1cm4gbnVsbDtcbiAgaWYgKCFhbGxvd05vbmUgJiYgY29kZSA9PT0gMCkgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIGdldEV4cGVuc2VHYXN0b1R5cGVDb2RlU2V0KHsgaW5jbHVkZUZhbGxiYWNrSWZFbXB0eSB9KS5oYXMoY29kZSkgPyBjb2RlIDogbnVsbDtcbn07XG5cbi8vIENoZWNrcyB3aGV0aGVyIGEgdmFsdWUgY2FuIGJlIHVzZWQgYXMgYSBDUk1HYXN0b1R5cGUgYnVzaW5lc3MgdmFsdWUuXG5leHBvcnQgY29uc3QgaXNFeHBlbnNlR2FzdG9UeXBlQ29kZSA9IChcbiAgdmFsdWU6IHVua25vd24sXG4gIG9wdGlvbnM/OiB7XG4gICAgYWxsb3dOb25lPzogYm9vbGVhbjtcbiAgICBpbmNsdWRlRmFsbGJhY2tJZkVtcHR5PzogYm9vbGVhbjtcbiAgfVxuKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiB0b0V4cGVuc2VHYXN0b1R5cGVDb2RlKHZhbHVlLCBvcHRpb25zKSAhPT0gbnVsbDtcbn07XG5cbi8vIFJlc29sdmVzIGEgcG9zaXRpdmUgZGVmYXVsdCBjYXRlZ29yeSBmb3IgZ2VuZXJhdGVkIHRpY2tldC10by1zaGVldCBsaW5lcy5cbmV4cG9ydCBjb25zdCBnZXREZWZhdWx0RXhwZW5zZUdhc3RvVHlwZUNvZGUgPSAocHJlZmVycmVkOiBFeHBlbnNlR2FzdG9UeXBlQ29kZSA9IDgpOiBFeHBlbnNlR2FzdG9UeXBlQ29kZSA9PiB7XG4gIGNvbnN0IHByZWZlcnJlZENvZGUgPSB0b0V4cGVuc2VHYXN0b1R5cGVDb2RlKHByZWZlcnJlZCwgeyBhbGxvd05vbmU6IGZhbHNlIH0pO1xuICBpZiAocHJlZmVycmVkQ29kZSAhPT0gbnVsbCkgcmV0dXJuIHByZWZlcnJlZENvZGU7XG5cbiAgZm9yIChjb25zdCBvcHRpb24gb2YgZ2V0RXhwZW5zZUdhc3RvVHlwZU9wdGlvbnMoKSkge1xuICAgIGNvbnN0IGNvZGUgPSB0b0V4cGVuc2VHYXN0b1R5cGVDb2RlKG9wdGlvbi52YWx1ZSwgeyBhbGxvd05vbmU6IGZhbHNlIH0pO1xuICAgIGlmIChjb2RlICE9PSBudWxsKSByZXR1cm4gY29kZTtcbiAgfVxuXG4gIHJldHVybiBwcmVmZXJyZWQ7XG59O1xuXG4vLyBGb3JtYXRzIGEgZGVmZW5zaXZlIHZhbGlkYXRpb24gbWVzc2FnZSB1c2luZyB0aGUgYWN0aXZlIGNhdGFsb2cgdmFsdWVzLlxuZXhwb3J0IGNvbnN0IGZvcm1hdEV4cGVuc2VHYXN0b1R5cGVBbGxvd2VkTWVzc2FnZSA9ICh7IGFsbG93Tm9uZSA9IHRydWUgfTogeyBhbGxvd05vbmU/OiBib29sZWFuIH0gPSB7fSk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGNvZGVzID0gQXJyYXkuZnJvbShnZXRFeHBlbnNlR2FzdG9UeXBlQ29kZVNldCgpKVxuICAgIC5maWx0ZXIoKGNvZGUpID0+IGFsbG93Tm9uZSB8fCBjb2RlICE9PSAwKVxuICAgIC5qb2luKFwiLFwiKTtcblxuICByZXR1cm4gYGdhc3RvVHlwZSBtdXN0IGJlIG9uZSBvZjogJHtjb2Rlc30uYDtcbn07XG4iLCAiY29uc3QgRERNTVlZWVlfQ09NUEFDVF9SRUdFWCA9IC9eXFxkezh9JC87XHJcbmNvbnN0IERETU1ZWV9DT01QQUNUX1JFR0VYID0gL15cXGR7Nn0kLztcclxuY29uc3QgRERNTVlZWVlfRE9UVEVEX1JFR0VYID0gL15cXGR7Mn1cXC5cXGR7Mn1cXC5cXGR7NH0kLztcclxuY29uc3QgREFURV9PTkxZX0RNWV9SRUdFWCA9IC9eXFxkezJ9Wy4vLV1cXGR7Mn1bLi8tXVxcZHs0fSQvO1xyXG5jb25zdCBEQVRFX09OTFlfRE1ZX1NIT1JUX1lFQVJfUkVHRVggPSAvXlxcZHsyfVsuLy1dXFxkezJ9Wy4vLV1cXGR7Mn0kLztcclxuY29uc3QgREFURV9PTkxZX1lNRF9SRUdFWCA9IC9eXFxkezR9Wy4vLV1cXGR7Mn1bLi8tXVxcZHsyfSQvO1xyXG5jb25zdCBNSU5fU1VQUE9SVEVEX0VYUEVOU0VfWUVBUiA9IDE5MDA7XHJcbmNvbnN0IE1BWF9TVVBQT1JURURfRVhQRU5TRV9ZRUFSID0gMjEwMDtcclxuY29uc3QgVFdPX0RJR0lUX1lFQVJfUElWT1QgPSA1MDtcclxuXHJcbmV4cG9ydCBjb25zdCBFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFID0gXCJGb3JtYXRvIHJlcXVlcmlkbzogRERNTVlZWVkgbyBERC5NTS5ZWVlZXCI7XHJcblxyXG5jb25zdCBzYWZlVGV4dCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xyXG4gIHJldHVybiBTdHJpbmcodmFsdWUpLnRyaW0oKTtcclxufTtcclxuXHJcbmNvbnN0IGlzU3VwcG9ydGVkRXhwZW5zZVllYXIgPSAoeWVhcjogbnVtYmVyKTogYm9vbGVhbiA9PiB7XHJcbiAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIoeWVhcikgJiYgeWVhciA+PSBNSU5fU1VQUE9SVEVEX0VYUEVOU0VfWUVBUiAmJiB5ZWFyIDw9IE1BWF9TVVBQT1JURURfRVhQRU5TRV9ZRUFSO1xyXG59O1xyXG5cclxuY29uc3QgZXhwYW5kVHdvRGlnaXRFeHBlbnNlWWVhciA9ICh5ZWFyOiBudW1iZXIpOiBudW1iZXIgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBNYXRoLmFicyhOdW1iZXIoeWVhcikpICUgMTAwO1xyXG4gIHJldHVybiBub3JtYWxpemVkID49IFRXT19ESUdJVF9ZRUFSX1BJVk9UID8gMTkwMCArIG5vcm1hbGl6ZWQgOiAyMDAwICsgbm9ybWFsaXplZDtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkRGF0ZSA9ICh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKTogRGF0ZSB8IG51bGwgPT4ge1xyXG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcih5ZWFyKSB8fCAhTnVtYmVyLmlzSW50ZWdlcihtb250aCkgfHwgIU51bWJlci5pc0ludGVnZXIoZGF5KSkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIGlmICghaXNTdXBwb3J0ZWRFeHBlbnNlWWVhcih5ZWFyKSkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIGlmIChtb250aCA8IDEgfHwgbW9udGggPiAxMiB8fCBkYXkgPCAxIHx8IGRheSA+IDMxKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNhbmRpZGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcclxuICBpZiAoXHJcbiAgICBjYW5kaWRhdGUuZ2V0RnVsbFllYXIoKSAhPT0geWVhciB8fFxyXG4gICAgY2FuZGlkYXRlLmdldE1vbnRoKCkgIT09IG1vbnRoIC0gMSB8fFxyXG4gICAgY2FuZGlkYXRlLmdldERhdGUoKSAhPT0gZGF5XHJcbiAgKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiBjYW5kaWRhdGU7XHJcbn07XHJcblxyXG4vLyBLZWVwcyBPQ1IgZGF0ZXMgbGlrZSAwOS4wNy4xMjIwIHVzYWJsZSBieSBmYWxsaW5nIGJhY2sgdG8gdGhlIGltcGxpZWQgdHdvLWRpZ2l0IHllYXIgKDIwMjApLlxyXG5jb25zdCBidWlsZFNhZmVEYXlGaXJzdERhdGUgPSAoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXk6IG51bWJlcik6IERhdGUgfCBudWxsID0+IHtcclxuICBjb25zdCBleHBsaWNpdFllYXIgPSBidWlsZERhdGUoeWVhciwgbW9udGgsIGRheSk7XHJcbiAgaWYgKGV4cGxpY2l0WWVhcikge1xyXG4gICAgcmV0dXJuIGV4cGxpY2l0WWVhcjtcclxuICB9XHJcblxyXG4gIHJldHVybiBidWlsZERhdGUoZXhwYW5kVHdvRGlnaXRFeHBlbnNlWWVhcih5ZWFyKSwgbW9udGgsIGRheSk7XHJcbn07XHJcblxyXG5jb25zdCB0b0RkTW1ZeXl5Q29tcGFjdCA9IChkYXRlOiBEYXRlKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBkYXkgPSBTdHJpbmcoZGF0ZS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICBjb25zdCBtb250aCA9IFN0cmluZyhkYXRlLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgY29uc3QgeWVhciA9IFN0cmluZyhkYXRlLmdldEZ1bGxZZWFyKCkpO1xyXG4gIHJldHVybiBgJHtkYXl9JHttb250aH0ke3llYXJ9YDtcclxufTtcclxuXHJcbmNvbnN0IHRvRGRNbVl5eXlEb3R0ZWQgPSAoZGF0ZTogRGF0ZSk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgZGF5ID0gU3RyaW5nKGRhdGUuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgY29uc3QgbW9udGggPSBTdHJpbmcoZGF0ZS5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gIGNvbnN0IHllYXIgPSBTdHJpbmcoZGF0ZS5nZXRGdWxsWWVhcigpKTtcclxuICByZXR1cm4gYCR7ZGF5fS4ke21vbnRofS4ke3llYXJ9YDtcclxufTtcclxuXHJcbi8vIFBhcnNlcyBkYXRlIGlucHV0cyB1c2VkIGJ5IGZyb250ZW5kL1VJIGFuZCBiYWNrZW5kIGNvbnRyYWN0cy5cclxuZXhwb3J0IGNvbnN0IHBhcnNlRXhwZW5zZUFwaURhdGUgPSAocmF3OiB1bmtub3duKTogRGF0ZSB8IG51bGwgPT4ge1xyXG4gIGlmIChyYXcgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICByZXR1cm4gTnVtYmVyLmlzTmFOKHJhdy5nZXRUaW1lKCkpIHx8ICFpc1N1cHBvcnRlZEV4cGVuc2VZZWFyKHJhdy5nZXRGdWxsWWVhcigpKSA/IG51bGwgOiByYXc7XHJcbiAgfVxyXG5cclxuICBjb25zdCB2YWx1ZSA9IHNhZmVUZXh0KHJhdyk7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IGRhdGVPbmx5ID0gdmFsdWUuc3BsaXQoXCJUXCIpWzBdLnNwbGl0KFwiIFwiKVswXTtcclxuXHJcbiAgaWYgKERETU1ZWVlZX0NPTVBBQ1RfUkVHRVgudGVzdChkYXRlT25seSkpIHtcclxuICAgIGNvbnN0IGRkID0gTnVtYmVyKGRhdGVPbmx5LnNsaWNlKDAsIDIpKTtcclxuICAgIGNvbnN0IG1tID0gTnVtYmVyKGRhdGVPbmx5LnNsaWNlKDIsIDQpKTtcclxuICAgIGNvbnN0IHl5eXkgPSBOdW1iZXIoZGF0ZU9ubHkuc2xpY2UoNCwgOCkpO1xyXG4gICAgY29uc3QgZGRtbXl5eXkgPSBidWlsZFNhZmVEYXlGaXJzdERhdGUoeXl5eSwgbW0sIGRkKTtcclxuICAgIGlmIChkZG1teXl5eSkge1xyXG4gICAgICByZXR1cm4gZGRtbXl5eXk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gS2VlcCBsZWdhY3kgY29tcGF0aWJpbGl0eSBmb3IgY2FjaGVkL3N0YWxlIHl5eXlNTWRkIHZhbHVlcy5cclxuICAgIGNvbnN0IGxlZ2FjeVllYXIgPSBOdW1iZXIoZGF0ZU9ubHkuc2xpY2UoMCwgNCkpO1xyXG4gICAgY29uc3QgbGVnYWN5TW9udGggPSBOdW1iZXIoZGF0ZU9ubHkuc2xpY2UoNCwgNikpO1xyXG4gICAgY29uc3QgbGVnYWN5RGF5ID0gTnVtYmVyKGRhdGVPbmx5LnNsaWNlKDYsIDgpKTtcclxuICAgIHJldHVybiBidWlsZERhdGUobGVnYWN5WWVhciwgbGVnYWN5TW9udGgsIGxlZ2FjeURheSk7XHJcbiAgfVxyXG5cclxuICBpZiAoRERNTVlZX0NPTVBBQ1RfUkVHRVgudGVzdChkYXRlT25seSkpIHtcclxuICAgIGNvbnN0IGRkID0gTnVtYmVyKGRhdGVPbmx5LnNsaWNlKDAsIDIpKTtcclxuICAgIGNvbnN0IG1tID0gTnVtYmVyKGRhdGVPbmx5LnNsaWNlKDIsIDQpKTtcclxuICAgIGNvbnN0IHl5ID0gTnVtYmVyKGRhdGVPbmx5LnNsaWNlKDQsIDYpKTtcclxuICAgIHJldHVybiBidWlsZERhdGUoZXhwYW5kVHdvRGlnaXRFeHBlbnNlWWVhcih5eSksIG1tLCBkZCk7XHJcbiAgfVxyXG5cclxuICBpZiAoREFURV9PTkxZX0RNWV9SRUdFWC50ZXN0KGRhdGVPbmx5KSkge1xyXG4gICAgY29uc3QgW2RheVRleHQsIG1vbnRoVGV4dCwgeWVhclRleHRdID0gZGF0ZU9ubHkuc3BsaXQoL1suLy1dLyk7XHJcbiAgICByZXR1cm4gYnVpbGRTYWZlRGF5Rmlyc3REYXRlKE51bWJlcih5ZWFyVGV4dCksIE51bWJlcihtb250aFRleHQpLCBOdW1iZXIoZGF5VGV4dCkpO1xyXG4gIH1cclxuXHJcbiAgaWYgKERBVEVfT05MWV9ETVlfU0hPUlRfWUVBUl9SRUdFWC50ZXN0KGRhdGVPbmx5KSkge1xyXG4gICAgY29uc3QgW2RheVRleHQsIG1vbnRoVGV4dCwgeWVhclRleHRdID0gZGF0ZU9ubHkuc3BsaXQoL1suLy1dLyk7XHJcbiAgICByZXR1cm4gYnVpbGREYXRlKGV4cGFuZFR3b0RpZ2l0RXhwZW5zZVllYXIoTnVtYmVyKHllYXJUZXh0KSksIE51bWJlcihtb250aFRleHQpLCBOdW1iZXIoZGF5VGV4dCkpO1xyXG4gIH1cclxuXHJcbiAgaWYgKERBVEVfT05MWV9ZTURfUkVHRVgudGVzdChkYXRlT25seSkpIHtcclxuICAgIGNvbnN0IFt5ZWFyVGV4dCwgbW9udGhUZXh0LCBkYXlUZXh0XSA9IGRhdGVPbmx5LnNwbGl0KC9bLi8tXS8pO1xyXG4gICAgY29uc3QgcGFyc2VkWWVhciA9IE51bWJlcih5ZWFyVGV4dCk7XHJcbiAgICByZXR1cm4gYnVpbGREYXRlKHBhcnNlZFllYXIsIE51bWJlcihtb250aFRleHQpLCBOdW1iZXIoZGF5VGV4dCkpID8/XHJcbiAgICAgIGJ1aWxkRGF0ZShleHBhbmRUd29EaWdpdEV4cGVuc2VZZWFyKHBhcnNlZFllYXIpLCBOdW1iZXIobW9udGhUZXh0KSwgTnVtYmVyKGRheVRleHQpKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlZCA9IG5ldyBEYXRlKHZhbHVlKTtcclxuICByZXR1cm4gTnVtYmVyLmlzTmFOKHBhcnNlZC5nZXRUaW1lKCkpIHx8ICFpc1N1cHBvcnRlZEV4cGVuc2VZZWFyKHBhcnNlZC5nZXRGdWxsWWVhcigpKSA/IG51bGwgOiBwYXJzZWQ7XHJcbn07XHJcblxyXG4vLyBDb252ZXJ0cyB1bmtub3duIGRhdGUgaW5wdXQgaW50byBzdHJpY3QgREQuTU0uWVlZWSB1c2VkIGJ5IGJhY2tlbmQgY29udHJhY3RzLlxyXG5leHBvcnQgY29uc3QgdG9FeHBlbnNlQXBpRGF0ZSA9IChyYXc6IHVua25vd24pOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlRXhwZW5zZUFwaURhdGUocmF3KTtcclxuICBpZiAoIXBhcnNlZCkgcmV0dXJuIFwiXCI7XHJcbiAgcmV0dXJuIHRvRGRNbVl5eXlEb3R0ZWQocGFyc2VkKTtcclxufTtcclxuXHJcbi8vIEJhY2t3YXJkLWNvbXBhdGlibGUgYWxpYXMga2VwdCB0byBhdm9pZCBicm9hZCByZW5hbWVzIGluIGV4aXN0aW5nIG1vZHVsZXMuXHJcbmV4cG9ydCBjb25zdCB0b0V4cGVuc2VBcGlEZE1tWXl5eSA9IChyYXc6IHVua25vd24pOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiB0b0V4cGVuc2VBcGlEYXRlKHJhdyk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaXNFeHBlbnNlQXBpRGRNbVl5eXkgPSAocmF3OiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgdmFsdWUgPSBzYWZlVGV4dChyYXcpO1xyXG4gIGNvbnN0IGlzQ29tcGFjdCA9IERETU1ZWVlZX0NPTVBBQ1RfUkVHRVgudGVzdCh2YWx1ZSk7XHJcbiAgY29uc3QgaXNEb3R0ZWQgPSBERE1NWVlZWV9ET1RURURfUkVHRVgudGVzdCh2YWx1ZSk7XHJcbiAgaWYgKCFpc0NvbXBhY3QgJiYgIWlzRG90dGVkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlRXhwZW5zZUFwaURhdGUodmFsdWUpO1xyXG4gIGlmICghcGFyc2VkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGlmIChpc0NvbXBhY3QpIHJldHVybiB0b0RkTW1ZeXl5Q29tcGFjdChwYXJzZWQpID09PSB2YWx1ZTtcclxuICByZXR1cm4gdG9EZE1tWXl5eURvdHRlZChwYXJzZWQpID09PSB2YWx1ZTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB0b0V4cGVuc2VJc29EYXRlID0gKHJhdzogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VFeHBlbnNlQXBpRGF0ZShyYXcpO1xyXG4gIGlmICghcGFyc2VkKSByZXR1cm4gXCJcIjtcclxuXHJcbiAgY29uc3QgeWVhciA9IFN0cmluZyhwYXJzZWQuZ2V0RnVsbFllYXIoKSk7XHJcbiAgY29uc3QgbW9udGggPSBTdHJpbmcocGFyc2VkLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgY29uc3QgZGF5ID0gU3RyaW5nKHBhcnNlZC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICByZXR1cm4gYCR7eWVhcn0tJHttb250aH0tJHtkYXl9YDtcclxufTtcclxuIiwgIlx1RkVGRmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VHYXN0b1R5cGVDb2RlLCBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7XG4gIGZvcm1hdEV4cGVuc2VHYXN0b1R5cGVBbGxvd2VkTWVzc2FnZSxcbiAgdG9FeHBlbnNlR2FzdG9UeXBlQ29kZSxcbn0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlR2FzdG9UeXBlQ2F0YWxvZy50c1wiO1xuaW1wb3J0IHtcclxuICBFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFLFxuICBpc0V4cGVuc2VBcGlEZE1tWXl5eSxcclxuICB0b0V4cGVuc2VBcGlEZE1tWXl5eSxcclxufSBmcm9tIFwiLi9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XHJcblxyXG4vLyBDb252ZXJ0cyB1bmtub3duIHZhbHVlcyB0byB0cmltbWVkIHRleHQuXG5leHBvcnQgY29uc3Qgc2FmZVRleHQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XHJcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG59O1xyXG5cclxuLy8gQ29udmVydHMgdW5rbm93biB2YWx1ZXMgdG8gbnVsbGFibGUgZmluaXRlIG51bWJlcnMuXHJcbmV4cG9ydCBjb25zdCB0b051bGxhYmxlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XHJcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpID8gcGFyc2VkIDogbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc05vbk5lZ2F0aXZlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gdG9OdWxsYWJsZU51bWJlcih2YWx1ZSk7XHJcbiAgcmV0dXJuIHBhcnNlZCAhPT0gbnVsbCAmJiBwYXJzZWQgPj0gMDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc1Bvc2l0aXZlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gdG9OdWxsYWJsZU51bWJlcih2YWx1ZSk7XHJcbiAgcmV0dXJuIHBhcnNlZCAhPT0gbnVsbCAmJiBwYXJzZWQgPiAwO1xyXG59O1xyXG5cclxuY29uc3QgaXNWYWxpZExpc3RFeHBlbnNlU2hlZXRTdGF0dXMgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcbiAgY29uc3QgcGFyc2VkID0gdG9OdWxsYWJsZU51bWJlcih2YWx1ZSk7XG4gIHJldHVybiBwYXJzZWQgIT09IG51bGwgJiYgTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpICYmIHBhcnNlZCA+PSAwO1xufTtcblxyXG5leHBvcnQgY29uc3QgdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGUgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcbiAgY29uc3QgcGFyc2VkID0gdG9OdWxsYWJsZU51bWJlcih2YWx1ZSk7XG4gIGlmIChwYXJzZWQgIT09IG51bGwgJiYgTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpICYmIHBhcnNlZCA+PSAwKSB7XG4gICAgcmV0dXJuIHBhcnNlZDtcbiAgfVxuXHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlR2FzdG9UeXBlQ29kZSB8IG51bGwgPT4ge1xuICByZXR1cm4gdG9FeHBlbnNlR2FzdG9UeXBlQ29kZSh2YWx1ZSk7XG59O1xuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VHYXN0b1R5cGVDb2RlIHwgdW5kZWZpbmVkID0+IHtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCBzYWZlVGV4dCh2YWx1ZSkgPT09IFwiXCIpIHtcclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwYXJzZWQgPSB0b051bGxhYmxlR2FzdG9UeXBlQ29kZSh2YWx1ZSk7XG4gIGlmIChwYXJzZWQgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihmb3JtYXRFeHBlbnNlR2FzdG9UeXBlQWxsb3dlZE1lc3NhZ2UoKSk7XG4gIH1cblxyXG4gIHJldHVybiBwYXJzZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0W1wiZ2FzdG9UeXBlXCJdID0+IHtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCBzYWZlVGV4dCh2YWx1ZSkgPT09IFwiXCIpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlKHZhbHVlKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1cyA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCBzYWZlVGV4dCh2YWx1ZSkgPT09IFwiXCIpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRvTnVsbGFibGVUaWNrZXRTdGF0dXNDb2RlKHZhbHVlKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZSA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgcmF3ID0gc2FmZVRleHQodmFsdWUpO1xyXG4gIGlmICghcmF3KSByZXR1cm4gXCJcIjtcclxuXHJcbiAgcmV0dXJuIHRvRXhwZW5zZUFwaURkTW1ZeXl5KHJhdyk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nIHwgdW5kZWZpbmVkID0+IHtcclxuICBjb25zdCByYXcgPSBzYWZlVGV4dCh2YWx1ZSk7XHJcbiAgaWYgKCFyYXcpIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSB0b0V4cGVuc2VBcGlEZE1tWXl5eShyYXcpO1xyXG4gIHJldHVybiBub3JtYWxpemVkIHx8IHVuZGVmaW5lZDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVSZXF1aXJlZEFwaURhdGUgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVPcHRpb25hbEFwaURhdGUodmFsdWUpO1xyXG4gIGlmICghbm9ybWFsaXplZCkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgfVxyXG4gIHJldHVybiBub3JtYWxpemVkO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlQXBpRGRNbVl5eXlPclRocm93ID0gKHZhbHVlOiB1bmtub3duKTogdm9pZCA9PiB7XHJcbiAgaWYgKCFpc0V4cGVuc2VBcGlEZE1tWXl5eSh2YWx1ZSkpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB0b051bGxhYmxlQm9vbCA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gfCBudWxsID0+IHtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGw7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpIHJldHVybiB2YWx1ZTtcclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICBjb25zdCBub3JtYWxpemVkID0gdmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBpZiAobm9ybWFsaXplZCA9PT0gXCJ0cnVlXCIgfHwgbm9ybWFsaXplZCA9PT0gXCIxXCIpIHJldHVybiB0cnVlO1xyXG4gICAgaWYgKG5vcm1hbGl6ZWQgPT09IFwiZmFsc2VcIiB8fCBub3JtYWxpemVkID09PSBcIjBcIikgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSB7XHJcbiAgICBpZiAodmFsdWUgPT09IDEpIHJldHVybiB0cnVlO1xyXG4gICAgaWYgKHZhbHVlID09PSAwKSByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG4gIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSSA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gfCBudWxsID0+IHtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCBzYWZlVGV4dCh2YWx1ZSkgPT09IFwiXCIpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRvTnVsbGFibGVCb29sKHZhbHVlKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlU2hlZXRMaXN0U3RhdHVzRmlsdGVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgcmV0dXJuIGlzVmFsaWRMaXN0RXhwZW5zZVNoZWV0U3RhdHVzKHZhbHVlKSA/IE51bWJlcih2YWx1ZSkgOiBudWxsO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHRvRmxhZ0Jvb2wgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuIHwgbnVsbCA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEJvb2wgPSB0b051bGxhYmxlQm9vbCh2YWx1ZSk7XHJcbiAgaWYgKG5vcm1hbGl6ZWRCb29sICE9PSBudWxsKSByZXR1cm4gbm9ybWFsaXplZEJvb2w7XHJcblxyXG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSB2YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBudWxsO1xyXG4gIGlmIChub3JtYWxpemVkID09PSBcIm9uXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJ5ZXNcIiB8fCBub3JtYWxpemVkID09PSBcInlcIikgcmV0dXJuIHRydWU7XHJcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwib2ZmXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJub1wiIHx8IG5vcm1hbGl6ZWQgPT09IFwiblwiKSByZXR1cm4gZmFsc2U7XHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcbiIsICJ0eXBlIEV4cGVuc2VTY29wZVdpbmRvdyA9IHtcclxuICBfX0lORF9FTlRSQV9PSURfXz86IHVua25vd247XHJcbiAgX19JTkRfU0VMRUNURURfQ09NUEFOWV9fPzogdW5rbm93bjtcclxuICBfX0lORF9DT01QQU5ZX18/OiB1bmtub3duO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplU2NvcGVQYXJ0ID0gKHZhbHVlOiB1bmtub3duLCB1cHBlcmNhc2UgPSBmYWxzZSk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gXCJcIjtcclxuICByZXR1cm4gdXBwZXJjYXNlID8gbm9ybWFsaXplZC50b1VwcGVyQ2FzZSgpIDogbm9ybWFsaXplZC50b0xvd2VyQ2FzZSgpO1xyXG59O1xyXG5cclxuLy8gUmVhZHMgdGhlIGN1cnJlbnQgc2Vzc2lvbiBzY29wZSB2YWx1ZXMgdXNlZCBieSBHYXN0b3MgY2FjaGVzLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVNjb3BlVmFsdWVzID0gKCkgPT4ge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBlbnRyYU9pZDogXCJcIixcclxuICAgICAgY29tcGFueUlkOiBcIlwiLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJ1bnRpbWVXaW5kb3cgPSB3aW5kb3cgYXMgRXhwZW5zZVNjb3BlV2luZG93O1xyXG4gIGNvbnN0IGVudHJhT2lkID0gbm9ybWFsaXplU2NvcGVQYXJ0KHJ1bnRpbWVXaW5kb3cuX19JTkRfRU5UUkFfT0lEX18pO1xyXG4gIGNvbnN0IGNvbXBhbnlJZCA9IG5vcm1hbGl6ZVNjb3BlUGFydChydW50aW1lV2luZG93Ll9fSU5EX1NFTEVDVEVEX0NPTVBBTllfXyB8fCBydW50aW1lV2luZG93Ll9fSU5EX0NPTVBBTllfXywgdHJ1ZSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBlbnRyYU9pZCxcclxuICAgIGNvbXBhbnlJZCxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gQnVpbGRzIHRoZSBzdGFuZGFyZCBHYXN0b3MgY2FjaGUgc2NvcGUga2V5IChlbnRyYU9pZCArIGNvbXBhbnlJZCkuXHJcbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlU2NvcGVUb2tlbiA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHsgZW50cmFPaWQsIGNvbXBhbnlJZCB9ID0gZ2V0RXhwZW5zZVNjb3BlVmFsdWVzKCk7XHJcbiAgY29uc3Qgc2NvcGUgPSBgJHtlbnRyYU9pZH1fXyR7Y29tcGFueUlkfWAucmVwbGFjZSgvXl8rfF8rJC9nLCBcIlwiKTtcclxuICByZXR1cm4gc2NvcGUgfHwgXCJzZXNzaW9uXCI7XHJcbn07XHJcbiIsICJpbXBvcnQgeyBnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LCByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LCBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Nlc3Npb25FeHBpcnkudHNcIjtcclxuaW1wb3J0IHsgZ2V0RXhwZW5zZVNjb3BlVG9rZW4gfSBmcm9tIFwiLi9leHBlbnNlU2NvcGUudHNcIjtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVVzZXJJZCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xyXG5jb25zdCBFWFBFTlNFX0FDVElOR19VU0VSX0tFWV9QUkVGSVggPSBcImV4cGVuc2VfYWN0aW5nX3VzZXJfdjFcIjtcclxuY29uc3QgRVhQRU5TRV9BQ1RJTkdfVVNFUl9UVExfTVMgPSAxMiAqIDYwICogNjAgKiAxMDAwO1xyXG5cclxuY29uc3QgZ2V0U2NvcGVkS2V5ID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIGAke0VYUEVOU0VfQUNUSU5HX1VTRVJfS0VZX1BSRUZJWH1fJHtnZXRFeHBlbnNlU2NvcGVUb2tlbigpfWA7XHJcbn07XHJcblxyXG4vLyBSZXR1cm5zIHRoZSBhY3RpdmUgQXhVc2VySWQgb3ZlcnJpZGUgdXNlZCBieSBHYXN0b3MgQVBJIGNhbGxzLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBub3JtYWxpemVVc2VySWQoZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShnZXRTY29wZWRLZXkoKSkpO1xyXG59O1xyXG5cclxuLy8gU2V0cyB0aGUgYWN0aXZlIEF4VXNlcklkIG92ZXJyaWRlIHVzZWQgYnkgR2FzdG9zIEFQSSBjYWxscy5cclxuZXhwb3J0IGNvbnN0IHNldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUgPSAodXNlcklkOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplVXNlcklkKHVzZXJJZCk7XHJcbiAgaWYgKCFub3JtYWxpemVkKSB7XHJcbiAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGdldFNjb3BlZEtleSgpKTtcclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH1cclxuICBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGdldFNjb3BlZEtleSgpLCBub3JtYWxpemVkLCBFWFBFTlNFX0FDVElOR19VU0VSX1RUTF9NUyk7XHJcbiAgcmV0dXJuIG5vcm1hbGl6ZWQ7XHJcbn07XHJcblxyXG4vLyBDbGVhcnMgdGhlIGFjdGl2ZSBBeFVzZXJJZCBvdmVycmlkZS5cclxuZXhwb3J0IGNvbnN0IGNsZWFyRXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSA9ICgpOiB2b2lkID0+IHtcclxuICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGdldFNjb3BlZEtleSgpKTtcclxufTtcclxuIiwgImltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG8gfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4vZXhwZW5zZUFwaVRyYW5zZm9ybXMudHNcIjtcclxuXHJcbnR5cGUgUmF3RXhwZW5zZVN1Ym9yZGluYXRlID0ge1xyXG4gIGNybVVzZXJJZD86IHVua25vd247XHJcbiAgQ3JtVXNlcklkPzogdW5rbm93bjtcclxuICBheFVzZXJJZD86IHVua25vd247XHJcbiAgQXhVc2VySWQ/OiB1bmtub3duO1xyXG4gIHVzZXJJZD86IHVua25vd247XHJcbiAgVXNlcklkPzogdW5rbm93bjtcclxuICBuYW1lPzogdW5rbm93bjtcclxuICBOYW1lPzogdW5rbm93bjtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVTdWJvcmRpbmF0ZU9iamVjdCA9IChpdGVtOiBSYXdFeHBlbnNlU3Vib3JkaW5hdGUpOiBFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0byB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IGxlZ2FjeVVzZXJJZCA9IHNhZmVUZXh0KGl0ZW0udXNlcklkID8/IGl0ZW0uVXNlcklkKTtcclxuICBjb25zdCBjcm1Vc2VySWQgPSBzYWZlVGV4dChpdGVtLmNybVVzZXJJZCA/PyBpdGVtLkNybVVzZXJJZCA/PyBsZWdhY3lVc2VySWQpO1xyXG4gIGNvbnN0IGF4VXNlcklkID0gc2FmZVRleHQoaXRlbS5heFVzZXJJZCA/PyBpdGVtLkF4VXNlcklkID8/IGxlZ2FjeVVzZXJJZCk7XHJcbiAgY29uc3QgcmVzb2x2ZWRDcm1Vc2VySWQgPSBjcm1Vc2VySWQgfHwgYXhVc2VySWQ7XHJcbiAgY29uc3QgcmVzb2x2ZWRBeFVzZXJJZCA9IGF4VXNlcklkIHx8IGNybVVzZXJJZDtcclxuXHJcbiAgaWYgKCFyZXNvbHZlZENybVVzZXJJZCB8fCAhcmVzb2x2ZWRBeFVzZXJJZCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdCBuYW1lID0gc2FmZVRleHQoaXRlbS5uYW1lID8/IGl0ZW0uTmFtZSkgfHwgcmVzb2x2ZWRBeFVzZXJJZDtcclxuICByZXR1cm4ge1xyXG4gICAgY3JtVXNlcklkOiByZXNvbHZlZENybVVzZXJJZCxcclxuICAgIGF4VXNlcklkOiByZXNvbHZlZEF4VXNlcklkLFxyXG4gICAgbmFtZSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZVN1Ym9yZGluYXRlQXJyYXkgPSAoaXRlbTogdW5rbm93bltdKTogRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG8gfCBudWxsID0+IHtcclxuICAvLyBMZWdhY3kgQVggcGF5bG9hZCBzaGFwZTogW3VzZXJJZCwgbmFtZV1cclxuICBpZiAoaXRlbS5sZW5ndGggPCAzKSB7XHJcbiAgICBjb25zdCBsZWdhY3lVc2VySWQgPSBzYWZlVGV4dChpdGVtWzBdKTtcclxuICAgIGlmICghbGVnYWN5VXNlcklkKSByZXR1cm4gbnVsbDtcclxuICAgIGNvbnN0IGxlZ2FjeU5hbWUgPSBzYWZlVGV4dChpdGVtWzFdKSB8fCBsZWdhY3lVc2VySWQ7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjcm1Vc2VySWQ6IGxlZ2FjeVVzZXJJZCxcclxuICAgICAgYXhVc2VySWQ6IGxlZ2FjeVVzZXJJZCxcclxuICAgICAgbmFtZTogbGVnYWN5TmFtZSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvLyBDdXJyZW50IEFYIHBheWxvYWQgc2hhcGU6IFtjcm1Vc2VySWQsIGF4VXNlcklkLCBuYW1lXVxyXG4gIGNvbnN0IGNybVVzZXJJZCA9IHNhZmVUZXh0KGl0ZW1bMF0pO1xyXG4gIGNvbnN0IGF4VXNlcklkID0gc2FmZVRleHQoaXRlbVsxXSk7XHJcbiAgY29uc3QgZmFsbGJhY2tJZCA9IHNhZmVUZXh0KGl0ZW1bMF0gPz8gaXRlbVsxXSk7XHJcbiAgY29uc3QgcmVzb2x2ZWRDcm1Vc2VySWQgPSBjcm1Vc2VySWQgfHwgZmFsbGJhY2tJZDtcclxuICBjb25zdCByZXNvbHZlZEF4VXNlcklkID0gYXhVc2VySWQgfHwgZmFsbGJhY2tJZDtcclxuXHJcbiAgaWYgKCFyZXNvbHZlZENybVVzZXJJZCB8fCAhcmVzb2x2ZWRBeFVzZXJJZCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdCBuYW1lID0gc2FmZVRleHQoaXRlbVsyXSkgfHwgcmVzb2x2ZWRBeFVzZXJJZDtcclxuICByZXR1cm4ge1xyXG4gICAgY3JtVXNlcklkOiByZXNvbHZlZENybVVzZXJJZCxcclxuICAgIGF4VXNlcklkOiByZXNvbHZlZEF4VXNlcklkLFxyXG4gICAgbmFtZSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gTWFwcyBvbmUgcmF3IHN1Ym9yZGluYXRlIGl0ZW0gZnJvbSBsZWdhY3kgb3IgbmV3IEFQSSBzaGFwZS5cclxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlID0gKGl0ZW06IHVua25vd24pOiBFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0byB8IG51bGwgPT4ge1xyXG4gIGlmICghaXRlbSkgcmV0dXJuIG51bGw7XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcclxuICAgIHJldHVybiByZXNvbHZlU3Vib3JkaW5hdGVBcnJheShpdGVtKTtcclxuICB9XHJcbiAgaWYgKHR5cGVvZiBpdGVtICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcclxuICByZXR1cm4gcmVzb2x2ZVN1Ym9yZGluYXRlT2JqZWN0KGl0ZW0gYXMgUmF3RXhwZW5zZVN1Ym9yZGluYXRlKTtcclxufTtcclxuXHJcbi8vIE5vcm1hbGl6ZXMgcmF3IHN1Ym9yZGluYXRlIGFycmF5cyBhbmQgZHJvcHMgbWFsZm9ybWVkIGVudHJpZXMuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZXMgPSAoc291cmNlOiB1bmtub3duKTogRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG9bXSA9PiB7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KHNvdXJjZSkpIHJldHVybiBbXTtcclxuXHJcbiAgcmV0dXJuIHNvdXJjZVxyXG4gICAgLm1hcCgoZW50cnkpID0+IG1hcEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlKGVudHJ5KSlcclxuICAgIC5maWx0ZXIoKGVudHJ5KTogZW50cnkgaXMgRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG8gPT4gISFlbnRyeSk7XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7O0FBZU8sSUFBTSw4QkFBOEIsQ0FBQyxVQUEyQjtBQUNyRSxTQUFPLE9BQU8sU0FBUyxFQUFFLEVBQUUsS0FBSztBQUNsQztBQUdPLElBQU0sdUJBQXVCLENBQUMsV0FBb0Q7QUFDdkYsU0FBTyxPQUNKLElBQUksQ0FBQyxVQUFVO0FBQUEsSUFDZCxPQUFPLDRCQUE0QixNQUFNLFNB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
