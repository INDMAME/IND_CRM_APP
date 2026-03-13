import {
  ApiFetchError
} from "./chunk-IKHTGBEE.js";
import {
  getSessionValueWithExpiry,
  removeSessionValueWithExpiry,
  setSessionValueWithExpiry
} from "./chunk-7SKLSV7K.js";

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
var ALLOWED_GASTO_TYPE_CODES = /* @__PURE__ */ new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);
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
  return parsed !== null && Number.isInteger(parsed) && parsed >= 0 && parsed <= 4;
};
var toNullableTicketStatusCode = (value) => {
  const parsed = toNullableNumber(value);
  if (parsed === 0 || parsed === 1) {
    return parsed;
  }
  return null;
};
var toNullableGastoTypeCode = (value) => {
  const parsed = toNullableNumber(value);
  if (parsed === null || !Number.isInteger(parsed) || !ALLOWED_GASTO_TYPE_CODES.has(parsed)) {
    return null;
  }
  return parsed;
};
var normalizeOptionalTicketGastoType = (value) => {
  if (value === null || value === void 0 || safeText2(value) === "") {
    return void 0;
  }
  const parsed = toNullableGastoTypeCode(value);
  if (parsed === null) {
    throw new ApiFetchError("gastoType must be one of: 0,1,2,3,4,5,6,7,8,14.");
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZUFwaVRyYW5zZm9ybXMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlU2NvcGUudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlQWN0aW5nVXNlci50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VTdWJvcmRpbmF0ZU1hcHBlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgRERNTVlZWVlfQ09NUEFDVF9SRUdFWCA9IC9eXFxkezh9JC87XG5jb25zdCBERE1NWVlfQ09NUEFDVF9SRUdFWCA9IC9eXFxkezZ9JC87XG5jb25zdCBERE1NWVlZWV9ET1RURURfUkVHRVggPSAvXlxcZHsyfVxcLlxcZHsyfVxcLlxcZHs0fSQvO1xuY29uc3QgREFURV9PTkxZX0RNWV9SRUdFWCA9IC9eXFxkezJ9Wy4vLV1cXGR7Mn1bLi8tXVxcZHs0fSQvO1xuY29uc3QgREFURV9PTkxZX0RNWV9TSE9SVF9ZRUFSX1JFR0VYID0gL15cXGR7Mn1bLi8tXVxcZHsyfVsuLy1dXFxkezJ9JC87XG5jb25zdCBEQVRFX09OTFlfWU1EX1JFR0VYID0gL15cXGR7NH1bLi8tXVxcZHsyfVsuLy1dXFxkezJ9JC87XG5jb25zdCBNSU5fU1VQUE9SVEVEX0VYUEVOU0VfWUVBUiA9IDE5MDA7XG5jb25zdCBNQVhfU1VQUE9SVEVEX0VYUEVOU0VfWUVBUiA9IDIxMDA7XG5jb25zdCBUV09fRElHSVRfWUVBUl9QSVZPVCA9IDUwO1xuXG5leHBvcnQgY29uc3QgRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSA9IFwiRm9ybWF0byByZXF1ZXJpZG86IERETU1ZWVlZIG8gREQuTU0uWVlZWVwiO1xuXG5jb25zdCBzYWZlVGV4dCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJcIjtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSkudHJpbSgpO1xufTtcblxuY29uc3QgaXNTdXBwb3J0ZWRFeHBlbnNlWWVhciA9ICh5ZWFyOiBudW1iZXIpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIoeWVhcikgJiYgeWVhciA+PSBNSU5fU1VQUE9SVEVEX0VYUEVOU0VfWUVBUiAmJiB5ZWFyIDw9IE1BWF9TVVBQT1JURURfRVhQRU5TRV9ZRUFSO1xufTtcblxuY29uc3QgZXhwYW5kVHdvRGlnaXRFeHBlbnNlWWVhciA9ICh5ZWFyOiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICBjb25zdCBub3JtYWxpemVkID0gTWF0aC5hYnMoTnVtYmVyKHllYXIpKSAlIDEwMDtcbiAgcmV0dXJuIG5vcm1hbGl6ZWQgPj0gVFdPX0RJR0lUX1lFQVJfUElWT1QgPyAxOTAwICsgbm9ybWFsaXplZCA6IDIwMDAgKyBub3JtYWxpemVkO1xufTtcblxuY29uc3QgYnVpbGREYXRlID0gKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF5OiBudW1iZXIpOiBEYXRlIHwgbnVsbCA9PiB7XG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcih5ZWFyKSB8fCAhTnVtYmVyLmlzSW50ZWdlcihtb250aCkgfHwgIU51bWJlci5pc0ludGVnZXIoZGF5KSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmICghaXNTdXBwb3J0ZWRFeHBlbnNlWWVhcih5ZWFyKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmIChtb250aCA8IDEgfHwgbW9udGggPiAxMiB8fCBkYXkgPCAxIHx8IGRheSA+IDMxKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBjYW5kaWRhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XG4gIGlmIChcbiAgICBjYW5kaWRhdGUuZ2V0RnVsbFllYXIoKSAhPT0geWVhciB8fFxuICAgIGNhbmRpZGF0ZS5nZXRNb250aCgpICE9PSBtb250aCAtIDEgfHxcbiAgICBjYW5kaWRhdGUuZ2V0RGF0ZSgpICE9PSBkYXlcbiAgKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gY2FuZGlkYXRlO1xufTtcblxuLy8gS2VlcHMgT0NSIGRhdGVzIGxpa2UgMDkuMDcuMTIyMCB1c2FibGUgYnkgZmFsbGluZyBiYWNrIHRvIHRoZSBpbXBsaWVkIHR3by1kaWdpdCB5ZWFyICgyMDIwKS5cbmNvbnN0IGJ1aWxkU2FmZURheUZpcnN0RGF0ZSA9ICh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKTogRGF0ZSB8IG51bGwgPT4ge1xuICBjb25zdCBleHBsaWNpdFllYXIgPSBidWlsZERhdGUoeWVhciwgbW9udGgsIGRheSk7XG4gIGlmIChleHBsaWNpdFllYXIpIHtcbiAgICByZXR1cm4gZXhwbGljaXRZZWFyO1xuICB9XG5cbiAgcmV0dXJuIGJ1aWxkRGF0ZShleHBhbmRUd29EaWdpdEV4cGVuc2VZZWFyKHllYXIpLCBtb250aCwgZGF5KTtcbn07XG5cbmNvbnN0IHRvRGRNbVl5eXlDb21wYWN0ID0gKGRhdGU6IERhdGUpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBkYXkgPSBTdHJpbmcoZGF0ZS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgY29uc3QgbW9udGggPSBTdHJpbmcoZGF0ZS5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICBjb25zdCB5ZWFyID0gU3RyaW5nKGRhdGUuZ2V0RnVsbFllYXIoKSk7XG4gIHJldHVybiBgJHtkYXl9JHttb250aH0ke3llYXJ9YDtcbn07XG5cbmNvbnN0IHRvRGRNbVl5eXlEb3R0ZWQgPSAoZGF0ZTogRGF0ZSk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGRheSA9IFN0cmluZyhkYXRlLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICBjb25zdCBtb250aCA9IFN0cmluZyhkYXRlLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIGNvbnN0IHllYXIgPSBTdHJpbmcoZGF0ZS5nZXRGdWxsWWVhcigpKTtcbiAgcmV0dXJuIGAke2RheX0uJHttb250aH0uJHt5ZWFyfWA7XG59O1xuXG4vLyBQYXJzZXMgZGF0ZSBpbnB1dHMgdXNlZCBieSBmcm9udGVuZC9VSSBhbmQgYmFja2VuZCBjb250cmFjdHMuXG5leHBvcnQgY29uc3QgcGFyc2VFeHBlbnNlQXBpRGF0ZSA9IChyYXc6IHVua25vd24pOiBEYXRlIHwgbnVsbCA9PiB7XG4gIGlmIChyYXcgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIE51bWJlci5pc05hTihyYXcuZ2V0VGltZSgpKSB8fCAhaXNTdXBwb3J0ZWRFeHBlbnNlWWVhcihyYXcuZ2V0RnVsbFllYXIoKSkgPyBudWxsIDogcmF3O1xuICB9XG5cbiAgY29uc3QgdmFsdWUgPSBzYWZlVGV4dChyYXcpO1xuICBpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBkYXRlT25seSA9IHZhbHVlLnNwbGl0KFwiVFwiKVswXS5zcGxpdChcIiBcIilbMF07XG5cbiAgaWYgKERETU1ZWVlZX0NPTVBBQ1RfUkVHRVgudGVzdChkYXRlT25seSkpIHtcbiAgICBjb25zdCBkZCA9IE51bWJlcihkYXRlT25seS5zbGljZSgwLCAyKSk7XG4gICAgY29uc3QgbW0gPSBOdW1iZXIoZGF0ZU9ubHkuc2xpY2UoMiwgNCkpO1xuICAgIGNvbnN0IHl5eXkgPSBOdW1iZXIoZGF0ZU9ubHkuc2xpY2UoNCwgOCkpO1xuICAgIGNvbnN0IGRkbW15eXl5ID0gYnVpbGRTYWZlRGF5Rmlyc3REYXRlKHl5eXksIG1tLCBkZCk7XG4gICAgaWYgKGRkbW15eXl5KSB7XG4gICAgICByZXR1cm4gZGRtbXl5eXk7XG4gICAgfVxuXG4gICAgLy8gS2VlcCBsZWdhY3kgY29tcGF0aWJpbGl0eSBmb3IgY2FjaGVkL3N0YWxlIHl5eXlNTWRkIHZhbHVlcy5cbiAgICBjb25zdCBsZWdhY3lZZWFyID0gTnVtYmVyKGRhdGVPbmx5LnNsaWNlKDAsIDQpKTtcbiAgICBjb25zdCBsZWdhY3lNb250aCA9IE51bWJlcihkYXRlT25seS5zbGljZSg0LCA2KSk7XG4gICAgY29uc3QgbGVnYWN5RGF5ID0gTnVtYmVyKGRhdGVPbmx5LnNsaWNlKDYsIDgpKTtcbiAgICByZXR1cm4gYnVpbGREYXRlKGxlZ2FjeVllYXIsIGxlZ2FjeU1vbnRoLCBsZWdhY3lEYXkpO1xuICB9XG5cbiAgaWYgKERETU1ZWV9DT01QQUNUX1JFR0VYLnRlc3QoZGF0ZU9ubHkpKSB7XG4gICAgY29uc3QgZGQgPSBOdW1iZXIoZGF0ZU9ubHkuc2xpY2UoMCwgMikpO1xuICAgIGNvbnN0IG1tID0gTnVtYmVyKGRhdGVPbmx5LnNsaWNlKDIsIDQpKTtcbiAgICBjb25zdCB5eSA9IE51bWJlcihkYXRlT25seS5zbGljZSg0LCA2KSk7XG4gICAgcmV0dXJuIGJ1aWxkRGF0ZShleHBhbmRUd29EaWdpdEV4cGVuc2VZZWFyKHl5KSwgbW0sIGRkKTtcbiAgfVxuXG4gIGlmIChEQVRFX09OTFlfRE1ZX1JFR0VYLnRlc3QoZGF0ZU9ubHkpKSB7XG4gICAgY29uc3QgW2RheVRleHQsIG1vbnRoVGV4dCwgeWVhclRleHRdID0gZGF0ZU9ubHkuc3BsaXQoL1suLy1dLyk7XG4gICAgcmV0dXJuIGJ1aWxkU2FmZURheUZpcnN0RGF0ZShOdW1iZXIoeWVhclRleHQpLCBOdW1iZXIobW9udGhUZXh0KSwgTnVtYmVyKGRheVRleHQpKTtcbiAgfVxuXG4gIGlmIChEQVRFX09OTFlfRE1ZX1NIT1JUX1lFQVJfUkVHRVgudGVzdChkYXRlT25seSkpIHtcbiAgICBjb25zdCBbZGF5VGV4dCwgbW9udGhUZXh0LCB5ZWFyVGV4dF0gPSBkYXRlT25seS5zcGxpdCgvWy4vLV0vKTtcbiAgICByZXR1cm4gYnVpbGREYXRlKGV4cGFuZFR3b0RpZ2l0RXhwZW5zZVllYXIoTnVtYmVyKHllYXJUZXh0KSksIE51bWJlcihtb250aFRleHQpLCBOdW1iZXIoZGF5VGV4dCkpO1xuICB9XG5cbiAgaWYgKERBVEVfT05MWV9ZTURfUkVHRVgudGVzdChkYXRlT25seSkpIHtcbiAgICBjb25zdCBbeWVhclRleHQsIG1vbnRoVGV4dCwgZGF5VGV4dF0gPSBkYXRlT25seS5zcGxpdCgvWy4vLV0vKTtcbiAgICBjb25zdCBwYXJzZWRZZWFyID0gTnVtYmVyKHllYXJUZXh0KTtcbiAgICByZXR1cm4gYnVpbGREYXRlKHBhcnNlZFllYXIsIE51bWJlcihtb250aFRleHQpLCBOdW1iZXIoZGF5VGV4dCkpID8/XG4gICAgICBidWlsZERhdGUoZXhwYW5kVHdvRGlnaXRFeHBlbnNlWWVhcihwYXJzZWRZZWFyKSwgTnVtYmVyKG1vbnRoVGV4dCksIE51bWJlcihkYXlUZXh0KSk7XG4gIH1cblxuICBjb25zdCBwYXJzZWQgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gIHJldHVybiBOdW1iZXIuaXNOYU4ocGFyc2VkLmdldFRpbWUoKSkgfHwgIWlzU3VwcG9ydGVkRXhwZW5zZVllYXIocGFyc2VkLmdldEZ1bGxZZWFyKCkpID8gbnVsbCA6IHBhcnNlZDtcbn07XG5cbi8vIENvbnZlcnRzIHVua25vd24gZGF0ZSBpbnB1dCBpbnRvIHN0cmljdCBERC5NTS5ZWVlZIHVzZWQgYnkgYmFja2VuZCBjb250cmFjdHMuXG5leHBvcnQgY29uc3QgdG9FeHBlbnNlQXBpRGF0ZSA9IChyYXc6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZUV4cGVuc2VBcGlEYXRlKHJhdyk7XG4gIGlmICghcGFyc2VkKSByZXR1cm4gXCJcIjtcbiAgcmV0dXJuIHRvRGRNbVl5eXlEb3R0ZWQocGFyc2VkKTtcbn07XG5cbi8vIEJhY2t3YXJkLWNvbXBhdGlibGUgYWxpYXMga2VwdCB0byBhdm9pZCBicm9hZCByZW5hbWVzIGluIGV4aXN0aW5nIG1vZHVsZXMuXG5leHBvcnQgY29uc3QgdG9FeHBlbnNlQXBpRGRNbVl5eXkgPSAocmF3OiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIHRvRXhwZW5zZUFwaURhdGUocmF3KTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0V4cGVuc2VBcGlEZE1tWXl5eSA9IChyYXc6IHVua25vd24pOiBib29sZWFuID0+IHtcbiAgY29uc3QgdmFsdWUgPSBzYWZlVGV4dChyYXcpO1xuICBjb25zdCBpc0NvbXBhY3QgPSBERE1NWVlZWV9DT01QQUNUX1JFR0VYLnRlc3QodmFsdWUpO1xuICBjb25zdCBpc0RvdHRlZCA9IERETU1ZWVlZX0RPVFRFRF9SRUdFWC50ZXN0KHZhbHVlKTtcbiAgaWYgKCFpc0NvbXBhY3QgJiYgIWlzRG90dGVkKSByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3QgcGFyc2VkID0gcGFyc2VFeHBlbnNlQXBpRGF0ZSh2YWx1ZSk7XG4gIGlmICghcGFyc2VkKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzQ29tcGFjdCkgcmV0dXJuIHRvRGRNbVl5eXlDb21wYWN0KHBhcnNlZCkgPT09IHZhbHVlO1xuICByZXR1cm4gdG9EZE1tWXl5eURvdHRlZChwYXJzZWQpID09PSB2YWx1ZTtcbn07XG5cbmV4cG9ydCBjb25zdCB0b0V4cGVuc2VJc29EYXRlID0gKHJhdzogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlRXhwZW5zZUFwaURhdGUocmF3KTtcbiAgaWYgKCFwYXJzZWQpIHJldHVybiBcIlwiO1xuXG4gIGNvbnN0IHllYXIgPSBTdHJpbmcocGFyc2VkLmdldEZ1bGxZZWFyKCkpO1xuICBjb25zdCBtb250aCA9IFN0cmluZyhwYXJzZWQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgY29uc3QgZGF5ID0gU3RyaW5nKHBhcnNlZC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgcmV0dXJuIGAke3llYXJ9LSR7bW9udGh9LSR7ZGF5fWA7XG59O1xuIiwgIlx1RkVGRmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHR5cGUgeyBFeHBlbnNlR2FzdG9UeXBlQ29kZSwgRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQge1xuICBFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFLFxuICBpc0V4cGVuc2VBcGlEZE1tWXl5eSxcbiAgdG9FeHBlbnNlQXBpRGRNbVl5eXksXG59IGZyb20gXCIuL2V4cGVuc2VBcGlEYXRlVXRpbHMudHNcIjtcblxuY29uc3QgQUxMT1dFRF9HQVNUT19UWVBFX0NPREVTID0gbmV3IFNldDxudW1iZXI+KFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxNF0pO1xuXG4vLyBDb252ZXJ0cyB1bmtub3duIHZhbHVlcyB0byB0cmltbWVkIHRleHQuXG5leHBvcnQgY29uc3Qgc2FmZVRleHQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XG4gIHJldHVybiBTdHJpbmcodmFsdWUpLnRyaW0oKTtcbn07XG5cbi8vIENvbnZlcnRzIHVua25vd24gdmFsdWVzIHRvIG51bGxhYmxlIGZpbml0ZSBudW1iZXJzLlxuZXhwb3J0IGNvbnN0IHRvTnVsbGFibGVOdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgPyBwYXJzZWQgOiBudWxsO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzTm9uTmVnYXRpdmVOdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcbiAgY29uc3QgcGFyc2VkID0gdG9OdWxsYWJsZU51bWJlcih2YWx1ZSk7XG4gIHJldHVybiBwYXJzZWQgIT09IG51bGwgJiYgcGFyc2VkID49IDA7XG59O1xuXG5leHBvcnQgY29uc3QgaXNQb3NpdGl2ZU51bWJlciA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBwYXJzZWQgPSB0b051bGxhYmxlTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIHBhcnNlZCAhPT0gbnVsbCAmJiBwYXJzZWQgPiAwO1xufTtcblxuY29uc3QgaXNWYWxpZExpc3RFeHBlbnNlU2hlZXRTdGF0dXMgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcbiAgY29uc3QgcGFyc2VkID0gdG9OdWxsYWJsZU51bWJlcih2YWx1ZSk7XG4gIHJldHVybiBwYXJzZWQgIT09IG51bGwgJiYgTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpICYmIHBhcnNlZCA+PSAwICYmIHBhcnNlZCA8PSA0O1xufTtcblxuZXhwb3J0IGNvbnN0IHRvTnVsbGFibGVUaWNrZXRTdGF0dXNDb2RlID0gKHZhbHVlOiB1bmtub3duKTogMCB8IDEgfCBudWxsID0+IHtcbiAgY29uc3QgcGFyc2VkID0gdG9OdWxsYWJsZU51bWJlcih2YWx1ZSk7XG4gIGlmIChwYXJzZWQgPT09IDAgfHwgcGFyc2VkID09PSAxKSB7XG4gICAgcmV0dXJuIHBhcnNlZDtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0IGNvbnN0IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZUdhc3RvVHlwZUNvZGUgfCBudWxsID0+IHtcbiAgY29uc3QgcGFyc2VkID0gdG9OdWxsYWJsZU51bWJlcih2YWx1ZSk7XG4gIGlmIChwYXJzZWQgPT09IG51bGwgfHwgIU51bWJlci5pc0ludGVnZXIocGFyc2VkKSB8fCAhQUxMT1dFRF9HQVNUT19UWVBFX0NPREVTLmhhcyhwYXJzZWQpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gcGFyc2VkIGFzIEV4cGVuc2VHYXN0b1R5cGVDb2RlO1xufTtcblxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZUdhc3RvVHlwZUNvZGUgfCB1bmRlZmluZWQgPT4ge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCBzYWZlVGV4dCh2YWx1ZSkgPT09IFwiXCIpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3QgcGFyc2VkID0gdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUodmFsdWUpO1xuICBpZiAocGFyc2VkID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJnYXN0b1R5cGUgbXVzdCBiZSBvbmUgb2Y6IDAsMSwyLDMsNCw1LDYsNyw4LDE0LlwiKTtcbiAgfVxuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0W1wiZ2FzdG9UeXBlXCJdID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgc2FmZVRleHQodmFsdWUpID09PSBcIlwiKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUodmFsdWUpO1xufTtcblxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzID0gKHZhbHVlOiB1bmtub3duKTogMCB8IDEgfCBudWxsID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgc2FmZVRleHQodmFsdWUpID09PSBcIlwiKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGUodmFsdWUpO1xufTtcblxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVRpY2tldExpc3REYXRlID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcmF3ID0gc2FmZVRleHQodmFsdWUpO1xuICBpZiAoIXJhdykgcmV0dXJuIFwiXCI7XG5cbiAgcmV0dXJuIHRvRXhwZW5zZUFwaURkTW1ZeXl5KHJhdyk7XG59O1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nIHwgdW5kZWZpbmVkID0+IHtcbiAgY29uc3QgcmF3ID0gc2FmZVRleHQodmFsdWUpO1xuICBpZiAoIXJhdykgcmV0dXJuIHVuZGVmaW5lZDtcblxuICBjb25zdCBub3JtYWxpemVkID0gdG9FeHBlbnNlQXBpRGRNbVl5eXkocmF3KTtcbiAgcmV0dXJuIG5vcm1hbGl6ZWQgfHwgdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZSA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVPcHRpb25hbEFwaURhdGUodmFsdWUpO1xuICBpZiAoIW5vcm1hbGl6ZWQpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcbiAgfVxuICByZXR1cm4gbm9ybWFsaXplZDtcbn07XG5cbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUFwaURkTW1ZeXl5T3JUaHJvdyA9ICh2YWx1ZTogdW5rbm93bik6IHZvaWQgPT4ge1xuICBpZiAoIWlzRXhwZW5zZUFwaURkTW1ZeXl5KHZhbHVlKSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgdG9OdWxsYWJsZUJvb2wgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuIHwgbnVsbCA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbDtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpIHJldHVybiB2YWx1ZTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSB2YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAobm9ybWFsaXplZCA9PT0gXCJ0cnVlXCIgfHwgbm9ybWFsaXplZCA9PT0gXCIxXCIpIHJldHVybiB0cnVlO1xuICAgIGlmIChub3JtYWxpemVkID09PSBcImZhbHNlXCIgfHwgbm9ybWFsaXplZCA9PT0gXCIwXCIpIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSB7XG4gICAgaWYgKHZhbHVlID09PSAxKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAodmFsdWUgPT09IDApIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUkgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuIHwgbnVsbCA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHNhZmVUZXh0KHZhbHVlKSA9PT0gXCJcIikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHRvTnVsbGFibGVCb29sKHZhbHVlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlU2hlZXRMaXN0U3RhdHVzRmlsdGVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIHJldHVybiBpc1ZhbGlkTGlzdEV4cGVuc2VTaGVldFN0YXR1cyh2YWx1ZSkgPyBOdW1iZXIodmFsdWUpIDogbnVsbDtcbn07XG5cbmV4cG9ydCBjb25zdCB0b0ZsYWdCb29sID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiB8IG51bGwgPT4ge1xuICBjb25zdCBub3JtYWxpemVkQm9vbCA9IHRvTnVsbGFibGVCb29sKHZhbHVlKTtcbiAgaWYgKG5vcm1hbGl6ZWRCb29sICE9PSBudWxsKSByZXR1cm4gbm9ybWFsaXplZEJvb2w7XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIG51bGw7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSB2YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gbnVsbDtcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwib25cIiB8fCBub3JtYWxpemVkID09PSBcInllc1wiIHx8IG5vcm1hbGl6ZWQgPT09IFwieVwiKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwib2ZmXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJub1wiIHx8IG5vcm1hbGl6ZWQgPT09IFwiblwiKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBudWxsO1xufTtcbiIsICJ0eXBlIEV4cGVuc2VTY29wZVdpbmRvdyA9IHtcbiAgX19JTkRfRU5UUkFfT0lEX18/OiB1bmtub3duO1xuICBfX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18/OiB1bmtub3duO1xuICBfX0lORF9DT01QQU5ZX18/OiB1bmtub3duO1xufTtcblxuY29uc3Qgbm9ybWFsaXplU2NvcGVQYXJ0ID0gKHZhbHVlOiB1bmtub3duLCB1cHBlcmNhc2UgPSBmYWxzZSk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBcIlwiO1xuICByZXR1cm4gdXBwZXJjYXNlID8gbm9ybWFsaXplZC50b1VwcGVyQ2FzZSgpIDogbm9ybWFsaXplZC50b0xvd2VyQ2FzZSgpO1xufTtcblxuLy8gUmVhZHMgdGhlIGN1cnJlbnQgc2Vzc2lvbiBzY29wZSB2YWx1ZXMgdXNlZCBieSBHYXN0b3MgY2FjaGVzLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTY29wZVZhbHVlcyA9ICgpID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZW50cmFPaWQ6IFwiXCIsXG4gICAgICBjb21wYW55SWQ6IFwiXCIsXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IHJ1bnRpbWVXaW5kb3cgPSB3aW5kb3cgYXMgRXhwZW5zZVNjb3BlV2luZG93O1xuICBjb25zdCBlbnRyYU9pZCA9IG5vcm1hbGl6ZVNjb3BlUGFydChydW50aW1lV2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKTtcbiAgY29uc3QgY29tcGFueUlkID0gbm9ybWFsaXplU2NvcGVQYXJ0KHJ1bnRpbWVXaW5kb3cuX19JTkRfU0VMRUNURURfQ09NUEFOWV9fIHx8IHJ1bnRpbWVXaW5kb3cuX19JTkRfQ09NUEFOWV9fLCB0cnVlKTtcblxuICByZXR1cm4ge1xuICAgIGVudHJhT2lkLFxuICAgIGNvbXBhbnlJZCxcbiAgfTtcbn07XG5cbi8vIEJ1aWxkcyB0aGUgc3RhbmRhcmQgR2FzdG9zIGNhY2hlIHNjb3BlIGtleSAoZW50cmFPaWQgKyBjb21wYW55SWQpLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTY29wZVRva2VuID0gKCk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHsgZW50cmFPaWQsIGNvbXBhbnlJZCB9ID0gZ2V0RXhwZW5zZVNjb3BlVmFsdWVzKCk7XG4gIGNvbnN0IHNjb3BlID0gYCR7ZW50cmFPaWR9X18ke2NvbXBhbnlJZH1gLnJlcGxhY2UoL15fK3xfKyQvZywgXCJcIik7XG4gIHJldHVybiBzY29wZSB8fCBcInNlc3Npb25cIjtcbn07XG4iLCAiaW1wb3J0IHsgZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlU2NvcGVUb2tlbiB9IGZyb20gXCIuL2V4cGVuc2VTY29wZS50c1wiO1xuXG5jb25zdCBub3JtYWxpemVVc2VySWQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcbmNvbnN0IEVYUEVOU0VfQUNUSU5HX1VTRVJfS0VZX1BSRUZJWCA9IFwiZXhwZW5zZV9hY3RpbmdfdXNlcl92MVwiO1xuY29uc3QgRVhQRU5TRV9BQ1RJTkdfVVNFUl9UVExfTVMgPSAxMiAqIDYwICogNjAgKiAxMDAwO1xuXG5jb25zdCBnZXRTY29wZWRLZXkgPSAoKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGAke0VYUEVOU0VfQUNUSU5HX1VTRVJfS0VZX1BSRUZJWH1fJHtnZXRFeHBlbnNlU2NvcGVUb2tlbigpfWA7XG59O1xuXG4vLyBSZXR1cm5zIHRoZSBhY3RpdmUgQXhVc2VySWQgb3ZlcnJpZGUgdXNlZCBieSBHYXN0b3MgQVBJIGNhbGxzLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUgPSAoKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIG5vcm1hbGl6ZVVzZXJJZChnZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGdldFNjb3BlZEtleSgpKSk7XG59O1xuXG4vLyBTZXRzIHRoZSBhY3RpdmUgQXhVc2VySWQgb3ZlcnJpZGUgdXNlZCBieSBHYXN0b3MgQVBJIGNhbGxzLlxuZXhwb3J0IGNvbnN0IHNldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUgPSAodXNlcklkOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZVVzZXJJZCh1c2VySWQpO1xuICBpZiAoIW5vcm1hbGl6ZWQpIHtcbiAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGdldFNjb3BlZEtleSgpKTtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuICBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGdldFNjb3BlZEtleSgpLCBub3JtYWxpemVkLCBFWFBFTlNFX0FDVElOR19VU0VSX1RUTF9NUyk7XG4gIHJldHVybiBub3JtYWxpemVkO1xufTtcblxuLy8gQ2xlYXJzIHRoZSBhY3RpdmUgQXhVc2VySWQgb3ZlcnJpZGUuXG5leHBvcnQgY29uc3QgY2xlYXJFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlID0gKCk6IHZvaWQgPT4ge1xuICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGdldFNjb3BlZEtleSgpKTtcbn07XG4iLCAiaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0byB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4vZXhwZW5zZUFwaVRyYW5zZm9ybXMudHNcIjtcblxudHlwZSBSYXdFeHBlbnNlU3Vib3JkaW5hdGUgPSB7XG4gIGNybVVzZXJJZD86IHVua25vd247XG4gIENybVVzZXJJZD86IHVua25vd247XG4gIGF4VXNlcklkPzogdW5rbm93bjtcbiAgQXhVc2VySWQ/OiB1bmtub3duO1xuICB1c2VySWQ/OiB1bmtub3duO1xuICBVc2VySWQ/OiB1bmtub3duO1xuICBuYW1lPzogdW5rbm93bjtcbiAgTmFtZT86IHVua25vd247XG59O1xuXG5jb25zdCByZXNvbHZlU3Vib3JkaW5hdGVPYmplY3QgPSAoaXRlbTogUmF3RXhwZW5zZVN1Ym9yZGluYXRlKTogRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG8gfCBudWxsID0+IHtcbiAgY29uc3QgbGVnYWN5VXNlcklkID0gc2FmZVRleHQoaXRlbS51c2VySWQgPz8gaXRlbS5Vc2VySWQpO1xuICBjb25zdCBjcm1Vc2VySWQgPSBzYWZlVGV4dChpdGVtLmNybVVzZXJJZCA/PyBpdGVtLkNybVVzZXJJZCA/PyBsZWdhY3lVc2VySWQpO1xuICBjb25zdCBheFVzZXJJZCA9IHNhZmVUZXh0KGl0ZW0uYXhVc2VySWQgPz8gaXRlbS5BeFVzZXJJZCA/PyBsZWdhY3lVc2VySWQpO1xuICBjb25zdCByZXNvbHZlZENybVVzZXJJZCA9IGNybVVzZXJJZCB8fCBheFVzZXJJZDtcbiAgY29uc3QgcmVzb2x2ZWRBeFVzZXJJZCA9IGF4VXNlcklkIHx8IGNybVVzZXJJZDtcblxuICBpZiAoIXJlc29sdmVkQ3JtVXNlcklkIHx8ICFyZXNvbHZlZEF4VXNlcklkKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBuYW1lID0gc2FmZVRleHQoaXRlbS5uYW1lID8/IGl0ZW0uTmFtZSkgfHwgcmVzb2x2ZWRBeFVzZXJJZDtcbiAgcmV0dXJuIHtcbiAgICBjcm1Vc2VySWQ6IHJlc29sdmVkQ3JtVXNlcklkLFxuICAgIGF4VXNlcklkOiByZXNvbHZlZEF4VXNlcklkLFxuICAgIG5hbWUsXG4gIH07XG59O1xuXG5jb25zdCByZXNvbHZlU3Vib3JkaW5hdGVBcnJheSA9IChpdGVtOiB1bmtub3duW10pOiBFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0byB8IG51bGwgPT4ge1xuICAvLyBMZWdhY3kgQVggcGF5bG9hZCBzaGFwZTogW3VzZXJJZCwgbmFtZV1cbiAgaWYgKGl0ZW0ubGVuZ3RoIDwgMykge1xuICAgIGNvbnN0IGxlZ2FjeVVzZXJJZCA9IHNhZmVUZXh0KGl0ZW1bMF0pO1xuICAgIGlmICghbGVnYWN5VXNlcklkKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBsZWdhY3lOYW1lID0gc2FmZVRleHQoaXRlbVsxXSkgfHwgbGVnYWN5VXNlcklkO1xuICAgIHJldHVybiB7XG4gICAgICBjcm1Vc2VySWQ6IGxlZ2FjeVVzZXJJZCxcbiAgICAgIGF4VXNlcklkOiBsZWdhY3lVc2VySWQsXG4gICAgICBuYW1lOiBsZWdhY3lOYW1lLFxuICAgIH07XG4gIH1cblxuICAvLyBDdXJyZW50IEFYIHBheWxvYWQgc2hhcGU6IFtjcm1Vc2VySWQsIGF4VXNlcklkLCBuYW1lXVxuICBjb25zdCBjcm1Vc2VySWQgPSBzYWZlVGV4dChpdGVtWzBdKTtcbiAgY29uc3QgYXhVc2VySWQgPSBzYWZlVGV4dChpdGVtWzFdKTtcbiAgY29uc3QgZmFsbGJhY2tJZCA9IHNhZmVUZXh0KGl0ZW1bMF0gPz8gaXRlbVsxXSk7XG4gIGNvbnN0IHJlc29sdmVkQ3JtVXNlcklkID0gY3JtVXNlcklkIHx8IGZhbGxiYWNrSWQ7XG4gIGNvbnN0IHJlc29sdmVkQXhVc2VySWQgPSBheFVzZXJJZCB8fCBmYWxsYmFja0lkO1xuXG4gIGlmICghcmVzb2x2ZWRDcm1Vc2VySWQgfHwgIXJlc29sdmVkQXhVc2VySWQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IG5hbWUgPSBzYWZlVGV4dChpdGVtWzJdKSB8fCByZXNvbHZlZEF4VXNlcklkO1xuICByZXR1cm4ge1xuICAgIGNybVVzZXJJZDogcmVzb2x2ZWRDcm1Vc2VySWQsXG4gICAgYXhVc2VySWQ6IHJlc29sdmVkQXhVc2VySWQsXG4gICAgbmFtZSxcbiAgfTtcbn07XG5cbi8vIE1hcHMgb25lIHJhdyBzdWJvcmRpbmF0ZSBpdGVtIGZyb20gbGVnYWN5IG9yIG5ldyBBUEkgc2hhcGUuXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGUgPSAoaXRlbTogdW5rbm93bik6IEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvIHwgbnVsbCA9PiB7XG4gIGlmICghaXRlbSkgcmV0dXJuIG51bGw7XG4gIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgcmV0dXJuIHJlc29sdmVTdWJvcmRpbmF0ZUFycmF5KGl0ZW0pO1xuICB9XG4gIGlmICh0eXBlb2YgaXRlbSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIG51bGw7XG4gIHJldHVybiByZXNvbHZlU3Vib3JkaW5hdGVPYmplY3QoaXRlbSBhcyBSYXdFeHBlbnNlU3Vib3JkaW5hdGUpO1xufTtcblxuLy8gTm9ybWFsaXplcyByYXcgc3Vib3JkaW5hdGUgYXJyYXlzIGFuZCBkcm9wcyBtYWxmb3JtZWQgZW50cmllcy5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZXMgPSAoc291cmNlOiB1bmtub3duKTogRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG9bXSA9PiB7XG4gIGlmICghQXJyYXkuaXNBcnJheShzb3VyY2UpKSByZXR1cm4gW107XG5cbiAgcmV0dXJuIHNvdXJjZVxuICAgIC5tYXAoKGVudHJ5KSA9PiBtYXBFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZShlbnRyeSkpXG4gICAgLmZpbHRlcigoZW50cnkpOiBlbnRyeSBpcyBFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0byA9PiAhIWVudHJ5KTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O0FBQUEsSUFBTSx5QkFBeUI7QUFDL0IsSUFBTSx1QkFBdUI7QUFFN0IsSUFBTSxzQkFBc0I7QUFDNUIsSUFBTSxpQ0FBaUM7QUFDdkMsSUFBTSxzQkFBc0I7QUFDNUIsSUFBTSw2QkFBNkI7QUFDbkMsSUFBTSw2QkFBNkI7QUFDbkMsSUFBTSx1QkFBdUI7QUFFdEIsSUFBTSxrQ0FBa0M7QUFFL0MsSUFBTSxXQUFXLENBQUMsVUFBMkI7QUFDM0MsTUFBSSxVQUFVLFFBQVEsVUFBVSxPQUFXLFFBQU87QUFDbEQsU0FBTyxPQUFPLEtBQUssRUFBRSxLQUFLO0FBQzVCO0FBRUEsSUFBTSx5QkFBeUIsQ0FBQyxTQUEwQjtBQUN4RCxTQUFPLE9BQU8sVUFBVSxJQUFJLEtBQUssUUFBUSw4QkFBOEIsUUFBUTtBQUNqRjtBQUVBLElBQU0sNEJBQTRCLENBQUMsU0FBeUI7QUFDMUQsUUFBTSxhQUFhLEtBQUssSUFBSSxPQUFPLElBQUksQ0FBQyxJQUFJO0FBQzVD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OUMsUUFBTSxvQkFBb0IsYUFBYTtBQUN2QyxRQUFNLG1CQUFtQixZQUFZO0FBRXJDLE1BQUksQ0FBQyxxQkFBcUIsQ0FBQyxrQkFBa0I7QUFDM0MsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLE9BQU9BLFVBQVMsS0FBSyxDQUFDLENBQUMsS0FBSztBQUNsQyxTQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUEsSUFDWCxVQUFVO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFDRjtBQUdPLElBQU0sNkJBQTZCLENBQUMsU0FBcUQ7QUFDOUYsTUFBSSxDQUFDLEtBQU0sUUFBTztBQUNsQixNQUFJLE1BQU0sUUFBUSxJQUFJLEdBQUc7QUFDdkIsV0FBTyx3QkFBd0IsSUFBSTtBQUFBLEVBQ3JDO0FBQ0EsTUFBSSxPQUFPLFNBQVMsU0FBVSxRQUFPO0FBQ3JDLFNBQU8seUJBQXlCLElBQTZCO0FBQy9EO0FBR08sSUFBTSxvQ0FBb0MsQ0FBQyxXQUFrRDtBQUNsRyxNQUFJLENBQUMsTUFBTSxRQUFRLE1BQU0sRUFBRyxRQUFPLENBQUM7QUFFcEMsU0FBTyxPQUNKLElBQUksQ0FBQyxVQUFVLDJCQUEyQixLQUFLLENBQUMsRUFDaEQsT0FBTyxDQUFDLFVBQStDLENBQUMsQ0FBQyxLQUFLO0FBQ25FOyIsCiAgIm5hbWVzIjogWyJzYWZlVGV4dCIsICJzYWZlVGV4dCIsICJzYWZlVGV4dCJdCn0K
