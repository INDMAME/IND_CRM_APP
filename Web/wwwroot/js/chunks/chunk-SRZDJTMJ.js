import {
  ApiFetchError
} from "./chunk-63VW7TTG.js";
import {
  getSessionValueWithExpiry,
  removeSessionValueWithExpiry,
  setSessionValueWithExpiry
} from "./chunk-6HGCHSZG.js";

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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZUFwaVRyYW5zZm9ybXMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlU2NvcGUudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlQWN0aW5nVXNlci50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VTdWJvcmRpbmF0ZU1hcHBlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgRERNTVlZWVlfQ09NUEFDVF9SRUdFWCA9IC9eXFxkezh9JC87XHJcbmNvbnN0IERETU1ZWV9DT01QQUNUX1JFR0VYID0gL15cXGR7Nn0kLztcclxuY29uc3QgRERNTVlZWVlfRE9UVEVEX1JFR0VYID0gL15cXGR7Mn1cXC5cXGR7Mn1cXC5cXGR7NH0kLztcclxuY29uc3QgREFURV9PTkxZX0RNWV9SRUdFWCA9IC9eXFxkezJ9Wy4vLV1cXGR7Mn1bLi8tXVxcZHs0fSQvO1xyXG5jb25zdCBEQVRFX09OTFlfRE1ZX1NIT1JUX1lFQVJfUkVHRVggPSAvXlxcZHsyfVsuLy1dXFxkezJ9Wy4vLV1cXGR7Mn0kLztcclxuY29uc3QgREFURV9PTkxZX1lNRF9SRUdFWCA9IC9eXFxkezR9Wy4vLV1cXGR7Mn1bLi8tXVxcZHsyfSQvO1xyXG5jb25zdCBNSU5fU1VQUE9SVEVEX0VYUEVOU0VfWUVBUiA9IDE5MDA7XHJcbmNvbnN0IE1BWF9TVVBQT1JURURfRVhQRU5TRV9ZRUFSID0gMjEwMDtcclxuY29uc3QgVFdPX0RJR0lUX1lFQVJfUElWT1QgPSA1MDtcclxuXHJcbmV4cG9ydCBjb25zdCBFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFID0gXCJGb3JtYXRvIHJlcXVlcmlkbzogRERNTVlZWVkgbyBERC5NTS5ZWVlZXCI7XHJcblxyXG5jb25zdCBzYWZlVGV4dCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xyXG4gIHJldHVybiBTdHJpbmcodmFsdWUpLnRyaW0oKTtcclxufTtcclxuXHJcbmNvbnN0IGlzU3VwcG9ydGVkRXhwZW5zZVllYXIgPSAoeWVhcjogbnVtYmVyKTogYm9vbGVhbiA9PiB7XHJcbiAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIoeWVhcikgJiYgeWVhciA+PSBNSU5fU1VQUE9SVEVEX0VYUEVOU0VfWUVBUiAmJiB5ZWFyIDw9IE1BWF9TVVBQT1JURURfRVhQRU5TRV9ZRUFSO1xyXG59O1xyXG5cclxuY29uc3QgZXhwYW5kVHdvRGlnaXRFeHBlbnNlWWVhciA9ICh5ZWFyOiBudW1iZXIpOiBudW1iZXIgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBNYXRoLmFicyhOdW1iZXIoeWVhcikpICUgMTAwO1xyXG4gIHJldHVybiBub3JtYWxpemVkID49IFRXT19ESUdJVF9ZRUFSX1BJVk9UID8gMTkwMCArIG5vcm1hbGl6ZWQgOiAyMDAwICsgbm9ybWFsaXplZDtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkRGF0ZSA9ICh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKTogRGF0ZSB8IG51bGwgPT4ge1xyXG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcih5ZWFyKSB8fCAhTnVtYmVyLmlzSW50ZWdlcihtb250aCkgfHwgIU51bWJlci5pc0ludGVnZXIoZGF5KSkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIGlmICghaXNTdXBwb3J0ZWRFeHBlbnNlWWVhcih5ZWFyKSkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIGlmIChtb250aCA8IDEgfHwgbW9udGggPiAxMiB8fCBkYXkgPCAxIHx8IGRheSA+IDMxKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNhbmRpZGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcclxuICBpZiAoXHJcbiAgICBjYW5kaWRhdGUuZ2V0RnVsbFllYXIoKSAhPT0geWVhciB8fFxyXG4gICAgY2FuZGlkYXRlLmdldE1vbnRoKCkgIT09IG1vbnRoIC0gMSB8fFxyXG4gICAgY2FuZGlkYXRlLmdldERhdGUoKSAhPT0gZGF5XHJcbiAgKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiBjYW5kaWRhdGU7XHJcbn07XHJcblxyXG4vLyBLZWVwcyBPQ1IgZGF0ZXMgbGlrZSAwOS4wNy4xMjIwIHVzYWJsZSBieSBmYWxsaW5nIGJhY2sgdG8gdGhlIGltcGxpZWQgdHdvLWRpZ2l0IHllYXIgKDIwMjApLlxyXG5jb25zdCBidWlsZFNhZmVEYXlGaXJzdERhdGUgPSAoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXk6IG51bWJlcik6IERhdGUgfCBudWxsID0+IHtcclxuICBjb25zdCBleHBsaWNpdFllYXIgPSBidWlsZERhdGUoeWVhciwgbW9udGgsIGRheSk7XHJcbiAgaWYgKGV4cGxpY2l0WWVhcikge1xyXG4gICAgcmV0dXJuIGV4cGxpY2l0WWVhcjtcclxuICB9XHJcblxyXG4gIHJldHVybiBidWlsZERhdGUoZXhwYW5kVHdvRGlnaXRFeHBlbnNlWWVhcih5ZWFyKSwgbW9udGgsIGRheSk7XHJcbn07XHJcblxyXG5jb25zdCB0b0RkTW1ZeXl5Q29tcGFjdCA9IChkYXRlOiBEYXRlKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBkYXkgPSBTdHJpbmcoZGF0ZS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICBjb25zdCBtb250aCA9IFN0cmluZyhkYXRlLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgY29uc3QgeWVhciA9IFN0cmluZyhkYXRlLmdldEZ1bGxZZWFyKCkpO1xyXG4gIHJldHVybiBgJHtkYXl9JHttb250aH0ke3llYXJ9YDtcclxufTtcclxuXHJcbmNvbnN0IHRvRGRNbVl5eXlEb3R0ZWQgPSAoZGF0ZTogRGF0ZSk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgZGF5ID0gU3RyaW5nKGRhdGUuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgY29uc3QgbW9udGggPSBTdHJpbmcoZGF0ZS5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG4gIGNvbnN0IHllYXIgPSBTdHJpbmcoZGF0ZS5nZXRGdWxsWWVhcigpKTtcclxuICByZXR1cm4gYCR7ZGF5fS4ke21vbnRofS4ke3llYXJ9YDtcclxufTtcclxuXHJcbi8vIFBhcnNlcyBkYXRlIGlucHV0cyB1c2VkIGJ5IGZyb250ZW5kL1VJIGFuZCBiYWNrZW5kIGNvbnRyYWN0cy5cclxuZXhwb3J0IGNvbnN0IHBhcnNlRXhwZW5zZUFwaURhdGUgPSAocmF3OiB1bmtub3duKTogRGF0ZSB8IG51bGwgPT4ge1xyXG4gIGlmIChyYXcgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICByZXR1cm4gTnVtYmVyLmlzTmFOKHJhdy5nZXRUaW1lKCkpIHx8ICFpc1N1cHBvcnRlZEV4cGVuc2VZZWFyKHJhdy5nZXRGdWxsWWVhcigpKSA/IG51bGwgOiByYXc7XHJcbiAgfVxyXG5cclxuICBjb25zdCB2YWx1ZSA9IHNhZmVUZXh0KHJhdyk7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IGRhdGVPbmx5ID0gdmFsdWUuc3BsaXQoXCJUXCIpWzBdLnNwbGl0KFwiIFwiKVswXTtcclxuXHJcbiAgaWYgKERETU1ZWVlZX0NPTVBBQ1RfUkVHRVgudGVzdChkYXRlT25seSkpIHtcclxuICAgIGNvbnN0IGRkID0gTnVtYmVyKGRhdGVPbmx5LnNsaWNlKDAsIDIpKTtcclxuICAgIGNvbnN0IG1tID0gTnVtYmVyKGRhdGVPbmx5LnNsaWNlKDIsIDQpKTtcclxuICAgIGNvbnN0IHl5eXkgPSBOdW1iZXIoZGF0ZU9ubHkuc2xpY2UoNCwgOCkpO1xyXG4gICAgY29uc3QgZGRtbXl5eXkgPSBidWlsZFNhZmVEYXlGaXJzdERhdGUoeXl5eSwgbW0sIGRkKTtcclxuICAgIGlmIChkZG1teXl5eSkge1xyXG4gICAgICByZXR1cm4gZGRtbXl5eXk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gS2VlcCBsZWdhY3kgY29tcGF0aWJpbGl0eSBmb3IgY2FjaGVkL3N0YWxlIHl5eXlNTWRkIHZhbHVlcy5cclxuICAgIGNvbnN0IGxlZ2FjeVllYXIgPSBOdW1iZXIoZGF0ZU9ubHkuc2xpY2UoMCwgNCkpO1xyXG4gICAgY29uc3QgbGVnYWN5TW9udGggPSBOdW1iZXIoZGF0ZU9ubHkuc2xpY2UoNCwgNikpO1xyXG4gICAgY29uc3QgbGVnYWN5RGF5ID0gTnVtYmVyKGRhdGVPbmx5LnNsaWNlKDYsIDgpKTtcclxuICAgIHJldHVybiBidWlsZERhdGUobGVnYWN5WWVhciwgbGVnYWN5TW9udGgsIGxlZ2FjeURheSk7XHJcbiAgfVxyXG5cclxuICBpZiAoRERNTVlZX0NPTVBBQ1RfUkVHRVgudGVzdChkYXRlT25seSkpIHtcclxuICAgIGNvbnN0IGRkID0gTnVtYmVyKGRhdGVPbmx5LnNsaWNlKDAsIDIpKTtcclxuICAgIGNvbnN0IG1tID0gTnVtYmVyKGRhdGVPbmx5LnNsaWNlKDIsIDQpKTtcclxuICAgIGNvbnN0IHl5ID0gTnVtYmVyKGRhdGVPbmx5LnNsaWNlKDQsIDYpKTtcclxuICAgIHJldHVybiBidWlsZERhdGUoZXhwYW5kVHdvRGlnaXRFeHBlbnNlWWVhcih5eSksIG1tLCBkZCk7XHJcbiAgfVxyXG5cclxuICBpZiAoREFURV9PTkxZX0RNWV9SRUdFWC50ZXN0KGRhdGVPbmx5KSkge1xyXG4gICAgY29uc3QgW2RheVRleHQsIG1vbnRoVGV4dCwgeWVhclRleHRdID0gZGF0ZU9ubHkuc3BsaXQoL1suLy1dLyk7XHJcbiAgICByZXR1cm4gYnVpbGRTYWZlRGF5Rmlyc3REYXRlKE51bWJlcih5ZWFyVGV4dCksIE51bWJlcihtb250aFRleHQpLCBOdW1iZXIoZGF5VGV4dCkpO1xyXG4gIH1cclxuXHJcbiAgaWYgKERBVEVfT05MWV9ETVlfU0hPUlRfWUVBUl9SRUdFWC50ZXN0KGRhdGVPbmx5KSkge1xyXG4gICAgY29uc3QgW2RheVRleHQsIG1vbnRoVGV4dCwgeWVhclRleHRdID0gZGF0ZU9ubHkuc3BsaXQoL1suLy1dLyk7XHJcbiAgICByZXR1cm4gYnVpbGREYXRlKGV4cGFuZFR3b0RpZ2l0RXhwZW5zZVllYXIoTnVtYmVyKHllYXJUZXh0KSksIE51bWJlcihtb250aFRleHQpLCBOdW1iZXIoZGF5VGV4dCkpO1xyXG4gIH1cclxuXHJcbiAgaWYgKERBVEVfT05MWV9ZTURfUkVHRVgudGVzdChkYXRlT25seSkpIHtcclxuICAgIGNvbnN0IFt5ZWFyVGV4dCwgbW9udGhUZXh0LCBkYXlUZXh0XSA9IGRhdGVPbmx5LnNwbGl0KC9bLi8tXS8pO1xyXG4gICAgY29uc3QgcGFyc2VkWWVhciA9IE51bWJlcih5ZWFyVGV4dCk7XHJcbiAgICByZXR1cm4gYnVpbGREYXRlKHBhcnNlZFllYXIsIE51bWJlcihtb250aFRleHQpLCBOdW1iZXIoZGF5VGV4dCkpID8/XHJcbiAgICAgIGJ1aWxkRGF0ZShleHBhbmRUd29EaWdpdEV4cGVuc2VZZWFyKHBhcnNlZFllYXIpLCBOdW1iZXIobW9udGhUZXh0KSwgTnVtYmVyKGRheVRleHQpKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlZCA9IG5ldyBEYXRlKHZhbHVlKTtcclxuICByZXR1cm4gTnVtYmVyLmlzTmFOKHBhcnNlZC5nZXRUaW1lKCkpIHx8ICFpc1N1cHBvcnRlZEV4cGVuc2VZZWFyKHBhcnNlZC5nZXRGdWxsWWVhcigpKSA/IG51bGwgOiBwYXJzZWQ7XHJcbn07XHJcblxyXG4vLyBDb252ZXJ0cyB1bmtub3duIGRhdGUgaW5wdXQgaW50byBzdHJpY3QgREQuTU0uWVlZWSB1c2VkIGJ5IGJhY2tlbmQgY29udHJhY3RzLlxyXG5leHBvcnQgY29uc3QgdG9FeHBlbnNlQXBpRGF0ZSA9IChyYXc6IHVua25vd24pOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlRXhwZW5zZUFwaURhdGUocmF3KTtcclxuICBpZiAoIXBhcnNlZCkgcmV0dXJuIFwiXCI7XHJcbiAgcmV0dXJuIHRvRGRNbVl5eXlEb3R0ZWQocGFyc2VkKTtcclxufTtcclxuXHJcbi8vIEJhY2t3YXJkLWNvbXBhdGlibGUgYWxpYXMga2VwdCB0byBhdm9pZCBicm9hZCByZW5hbWVzIGluIGV4aXN0aW5nIG1vZHVsZXMuXHJcbmV4cG9ydCBjb25zdCB0b0V4cGVuc2VBcGlEZE1tWXl5eSA9IChyYXc6IHVua25vd24pOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiB0b0V4cGVuc2VBcGlEYXRlKHJhdyk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaXNFeHBlbnNlQXBpRGRNbVl5eXkgPSAocmF3OiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgdmFsdWUgPSBzYWZlVGV4dChyYXcpO1xyXG4gIGNvbnN0IGlzQ29tcGFjdCA9IERETU1ZWVlZX0NPTVBBQ1RfUkVHRVgudGVzdCh2YWx1ZSk7XHJcbiAgY29uc3QgaXNEb3R0ZWQgPSBERE1NWVlZWV9ET1RURURfUkVHRVgudGVzdCh2YWx1ZSk7XHJcbiAgaWYgKCFpc0NvbXBhY3QgJiYgIWlzRG90dGVkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlRXhwZW5zZUFwaURhdGUodmFsdWUpO1xyXG4gIGlmICghcGFyc2VkKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGlmIChpc0NvbXBhY3QpIHJldHVybiB0b0RkTW1ZeXl5Q29tcGFjdChwYXJzZWQpID09PSB2YWx1ZTtcclxuICByZXR1cm4gdG9EZE1tWXl5eURvdHRlZChwYXJzZWQpID09PSB2YWx1ZTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB0b0V4cGVuc2VJc29EYXRlID0gKHJhdzogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VFeHBlbnNlQXBpRGF0ZShyYXcpO1xyXG4gIGlmICghcGFyc2VkKSByZXR1cm4gXCJcIjtcclxuXHJcbiAgY29uc3QgeWVhciA9IFN0cmluZyhwYXJzZWQuZ2V0RnVsbFllYXIoKSk7XHJcbiAgY29uc3QgbW9udGggPSBTdHJpbmcocGFyc2VkLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgY29uc3QgZGF5ID0gU3RyaW5nKHBhcnNlZC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICByZXR1cm4gYCR7eWVhcn0tJHttb250aH0tJHtkYXl9YDtcclxufTtcclxuIiwgIlx1RkVGRmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VHYXN0b1R5cGVDb2RlLCBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHtcclxuICBFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFLFxyXG4gIGlzRXhwZW5zZUFwaURkTW1ZeXl5LFxyXG4gIHRvRXhwZW5zZUFwaURkTW1ZeXl5LFxyXG59IGZyb20gXCIuL2V4cGVuc2VBcGlEYXRlVXRpbHMudHNcIjtcclxuXHJcbmNvbnN0IEFMTE9XRURfR0FTVE9fVFlQRV9DT0RFUyA9IG5ldyBTZXQ8bnVtYmVyPihbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMTRdKTtcclxuXHJcbi8vIENvbnZlcnRzIHVua25vd24gdmFsdWVzIHRvIHRyaW1tZWQgdGV4dC5cclxuZXhwb3J0IGNvbnN0IHNhZmVUZXh0ID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XHJcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG59O1xyXG5cclxuLy8gQ29udmVydHMgdW5rbm93biB2YWx1ZXMgdG8gbnVsbGFibGUgZmluaXRlIG51bWJlcnMuXHJcbmV4cG9ydCBjb25zdCB0b051bGxhYmxlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XHJcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpID8gcGFyc2VkIDogbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc05vbk5lZ2F0aXZlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gdG9OdWxsYWJsZU51bWJlcih2YWx1ZSk7XHJcbiAgcmV0dXJuIHBhcnNlZCAhPT0gbnVsbCAmJiBwYXJzZWQgPj0gMDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc1Bvc2l0aXZlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gdG9OdWxsYWJsZU51bWJlcih2YWx1ZSk7XHJcbiAgcmV0dXJuIHBhcnNlZCAhPT0gbnVsbCAmJiBwYXJzZWQgPiAwO1xyXG59O1xyXG5cclxuY29uc3QgaXNWYWxpZExpc3RFeHBlbnNlU2hlZXRTdGF0dXMgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSB0b051bGxhYmxlTnVtYmVyKHZhbHVlKTtcclxuICByZXR1cm4gcGFyc2VkICE9PSBudWxsICYmIE51bWJlci5pc0ludGVnZXIocGFyc2VkKSAmJiBwYXJzZWQgPj0gMCAmJiBwYXJzZWQgPD0gNDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZSA9ICh2YWx1ZTogdW5rbm93bik6IDAgfCAxIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gdG9OdWxsYWJsZU51bWJlcih2YWx1ZSk7XHJcbiAgaWYgKHBhcnNlZCA9PT0gMCB8fCBwYXJzZWQgPT09IDEpIHtcclxuICAgIHJldHVybiBwYXJzZWQ7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB0b051bGxhYmxlR2FzdG9UeXBlQ29kZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VHYXN0b1R5cGVDb2RlIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gdG9OdWxsYWJsZU51bWJlcih2YWx1ZSk7XHJcbiAgaWYgKHBhcnNlZCA9PT0gbnVsbCB8fCAhTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpIHx8ICFBTExPV0VEX0dBU1RPX1RZUEVfQ09ERVMuaGFzKHBhcnNlZCkpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHBhcnNlZCBhcyBFeHBlbnNlR2FzdG9UeXBlQ29kZTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VHYXN0b1R5cGVDb2RlIHwgdW5kZWZpbmVkID0+IHtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCBzYWZlVGV4dCh2YWx1ZSkgPT09IFwiXCIpIHtcclxuICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwYXJzZWQgPSB0b051bGxhYmxlR2FzdG9UeXBlQ29kZSh2YWx1ZSk7XHJcbiAgaWYgKHBhcnNlZCA9PT0gbnVsbCkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJnYXN0b1R5cGUgbXVzdCBiZSBvbmUgb2Y6IDAsMSwyLDMsNCw1LDYsNyw4LDE0LlwiKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBwYXJzZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0W1wiZ2FzdG9UeXBlXCJdID0+IHtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCBzYWZlVGV4dCh2YWx1ZSkgPT09IFwiXCIpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlKHZhbHVlKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1cyA9ICh2YWx1ZTogdW5rbm93bik6IDAgfCAxIHwgbnVsbCA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgc2FmZVRleHQodmFsdWUpID09PSBcIlwiKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZSh2YWx1ZSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdERhdGUgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHJhdyA9IHNhZmVUZXh0KHZhbHVlKTtcclxuICBpZiAoIXJhdykgcmV0dXJuIFwiXCI7XHJcblxyXG4gIHJldHVybiB0b0V4cGVuc2VBcGlEZE1tWXl5eShyYXcpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZSA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XHJcbiAgY29uc3QgcmF3ID0gc2FmZVRleHQodmFsdWUpO1xyXG4gIGlmICghcmF3KSByZXR1cm4gdW5kZWZpbmVkO1xyXG5cclxuICBjb25zdCBub3JtYWxpemVkID0gdG9FeHBlbnNlQXBpRGRNbVl5eXkocmF3KTtcclxuICByZXR1cm4gbm9ybWFsaXplZCB8fCB1bmRlZmluZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlKHZhbHVlKTtcclxuICBpZiAoIW5vcm1hbGl6ZWQpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xyXG4gIH1cclxuICByZXR1cm4gbm9ybWFsaXplZDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB2YWxpZGF0ZUFwaURkTW1ZeXl5T3JUaHJvdyA9ICh2YWx1ZTogdW5rbm93bik6IHZvaWQgPT4ge1xyXG4gIGlmICghaXNFeHBlbnNlQXBpRGRNbVl5eXkodmFsdWUpKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdG9OdWxsYWJsZUJvb2wgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuIHwgbnVsbCA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xyXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSByZXR1cm4gdmFsdWU7XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IHZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKG5vcm1hbGl6ZWQgPT09IFwidHJ1ZVwiIHx8IG5vcm1hbGl6ZWQgPT09IFwiMVwiKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmIChub3JtYWxpemVkID09PSBcImZhbHNlXCIgfHwgbm9ybWFsaXplZCA9PT0gXCIwXCIpIHJldHVybiBmYWxzZTtcclxuICB9XHJcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgaWYgKHZhbHVlID09PSAxKSByZXR1cm4gdHJ1ZTtcclxuICAgIGlmICh2YWx1ZSA9PT0gMCkgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUkgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuIHwgbnVsbCA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgc2FmZVRleHQodmFsdWUpID09PSBcIlwiKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiB0b051bGxhYmxlQm9vbCh2YWx1ZSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlciA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xyXG4gIHJldHVybiBpc1ZhbGlkTGlzdEV4cGVuc2VTaGVldFN0YXR1cyh2YWx1ZSkgPyBOdW1iZXIodmFsdWUpIDogbnVsbDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB0b0ZsYWdCb29sID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRCb29sID0gdG9OdWxsYWJsZUJvb2wodmFsdWUpO1xyXG4gIGlmIChub3JtYWxpemVkQm9vbCAhPT0gbnVsbCkgcmV0dXJuIG5vcm1hbGl6ZWRCb29sO1xyXG5cclxuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBub3JtYWxpemVkID0gdmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gbnVsbDtcclxuICBpZiAobm9ybWFsaXplZCA9PT0gXCJvblwiIHx8IG5vcm1hbGl6ZWQgPT09IFwieWVzXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJ5XCIpIHJldHVybiB0cnVlO1xyXG4gIGlmIChub3JtYWxpemVkID09PSBcIm9mZlwiIHx8IG5vcm1hbGl6ZWQgPT09IFwibm9cIiB8fCBub3JtYWxpemVkID09PSBcIm5cIikgcmV0dXJuIGZhbHNlO1xyXG4gIHJldHVybiBudWxsO1xyXG59O1xyXG4iLCAidHlwZSBFeHBlbnNlU2NvcGVXaW5kb3cgPSB7XHJcbiAgX19JTkRfRU5UUkFfT0lEX18/OiB1bmtub3duO1xyXG4gIF9fSU5EX1NFTEVDVEVEX0NPTVBBTllfXz86IHVua25vd247XHJcbiAgX19JTkRfQ09NUEFOWV9fPzogdW5rbm93bjtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVNjb3BlUGFydCA9ICh2YWx1ZTogdW5rbm93biwgdXBwZXJjYXNlID0gZmFsc2UpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpO1xyXG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIFwiXCI7XHJcbiAgcmV0dXJuIHVwcGVyY2FzZSA/IG5vcm1hbGl6ZWQudG9VcHBlckNhc2UoKSA6IG5vcm1hbGl6ZWQudG9Mb3dlckNhc2UoKTtcclxufTtcclxuXHJcbi8vIFJlYWRzIHRoZSBjdXJyZW50IHNlc3Npb24gc2NvcGUgdmFsdWVzIHVzZWQgYnkgR2FzdG9zIGNhY2hlcy5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTY29wZVZhbHVlcyA9ICgpID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZW50cmFPaWQ6IFwiXCIsXHJcbiAgICAgIGNvbXBhbnlJZDogXCJcIixcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb25zdCBydW50aW1lV2luZG93ID0gd2luZG93IGFzIEV4cGVuc2VTY29wZVdpbmRvdztcclxuICBjb25zdCBlbnRyYU9pZCA9IG5vcm1hbGl6ZVNjb3BlUGFydChydW50aW1lV2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKTtcclxuICBjb25zdCBjb21wYW55SWQgPSBub3JtYWxpemVTY29wZVBhcnQocnVudGltZVdpbmRvdy5fX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18gfHwgcnVudGltZVdpbmRvdy5fX0lORF9DT01QQU5ZX18sIHRydWUpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZW50cmFPaWQsXHJcbiAgICBjb21wYW55SWQsXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIEJ1aWxkcyB0aGUgc3RhbmRhcmQgR2FzdG9zIGNhY2hlIHNjb3BlIGtleSAoZW50cmFPaWQgKyBjb21wYW55SWQpLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVNjb3BlVG9rZW4gPSAoKTogc3RyaW5nID0+IHtcclxuICBjb25zdCB7IGVudHJhT2lkLCBjb21wYW55SWQgfSA9IGdldEV4cGVuc2VTY29wZVZhbHVlcygpO1xyXG4gIGNvbnN0IHNjb3BlID0gYCR7ZW50cmFPaWR9X18ke2NvbXBhbnlJZH1gLnJlcGxhY2UoL15fK3xfKyQvZywgXCJcIik7XHJcbiAgcmV0dXJuIHNjb3BlIHx8IFwic2Vzc2lvblwiO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeSwgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9zZXNzaW9uRXhwaXJ5LnRzXCI7XHJcbmltcG9ydCB7IGdldEV4cGVuc2VTY29wZVRva2VuIH0gZnJvbSBcIi4vZXhwZW5zZVNjb3BlLnRzXCI7XHJcblxyXG5jb25zdCBub3JtYWxpemVVc2VySWQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4gU3RyaW5nKHZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcclxuY29uc3QgRVhQRU5TRV9BQ1RJTkdfVVNFUl9LRVlfUFJFRklYID0gXCJleHBlbnNlX2FjdGluZ191c2VyX3YxXCI7XHJcbmNvbnN0IEVYUEVOU0VfQUNUSU5HX1VTRVJfVFRMX01TID0gMTIgKiA2MCAqIDYwICogMTAwMDtcclxuXHJcbmNvbnN0IGdldFNjb3BlZEtleSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBgJHtFWFBFTlNFX0FDVElOR19VU0VSX0tFWV9QUkVGSVh9XyR7Z2V0RXhwZW5zZVNjb3BlVG9rZW4oKX1gO1xyXG59O1xyXG5cclxuLy8gUmV0dXJucyB0aGUgYWN0aXZlIEF4VXNlcklkIG92ZXJyaWRlIHVzZWQgYnkgR2FzdG9zIEFQSSBjYWxscy5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUgPSAoKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gbm9ybWFsaXplVXNlcklkKGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoZ2V0U2NvcGVkS2V5KCkpKTtcclxufTtcclxuXHJcbi8vIFNldHMgdGhlIGFjdGl2ZSBBeFVzZXJJZCBvdmVycmlkZSB1c2VkIGJ5IEdhc3RvcyBBUEkgY2FsbHMuXHJcbmV4cG9ydCBjb25zdCBzZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlID0gKHVzZXJJZDogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZVVzZXJJZCh1c2VySWQpO1xyXG4gIGlmICghbm9ybWFsaXplZCkge1xyXG4gICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShnZXRTY29wZWRLZXkoKSk7XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9XHJcbiAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShnZXRTY29wZWRLZXkoKSwgbm9ybWFsaXplZCwgRVhQRU5TRV9BQ1RJTkdfVVNFUl9UVExfTVMpO1xyXG4gIHJldHVybiBub3JtYWxpemVkO1xyXG59O1xyXG5cclxuLy8gQ2xlYXJzIHRoZSBhY3RpdmUgQXhVc2VySWQgb3ZlcnJpZGUuXHJcbmV4cG9ydCBjb25zdCBjbGVhckV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUgPSAoKTogdm9pZCA9PiB7XHJcbiAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShnZXRTY29wZWRLZXkoKSk7XHJcbn07XHJcbiIsICJpbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvIH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuL2V4cGVuc2VBcGlUcmFuc2Zvcm1zLnRzXCI7XHJcblxyXG50eXBlIFJhd0V4cGVuc2VTdWJvcmRpbmF0ZSA9IHtcclxuICBjcm1Vc2VySWQ/OiB1bmtub3duO1xyXG4gIENybVVzZXJJZD86IHVua25vd247XHJcbiAgYXhVc2VySWQ/OiB1bmtub3duO1xyXG4gIEF4VXNlcklkPzogdW5rbm93bjtcclxuICB1c2VySWQ/OiB1bmtub3duO1xyXG4gIFVzZXJJZD86IHVua25vd247XHJcbiAgbmFtZT86IHVua25vd247XHJcbiAgTmFtZT86IHVua25vd247XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlU3Vib3JkaW5hdGVPYmplY3QgPSAoaXRlbTogUmF3RXhwZW5zZVN1Ym9yZGluYXRlKTogRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG8gfCBudWxsID0+IHtcclxuICBjb25zdCBsZWdhY3lVc2VySWQgPSBzYWZlVGV4dChpdGVtLnVzZXJJZCA/PyBpdGVtLlVzZXJJZCk7XHJcbiAgY29uc3QgY3JtVXNlcklkID0gc2FmZVRleHQoaXRlbS5jcm1Vc2VySWQgPz8gaXRlbS5Dcm1Vc2VySWQgPz8gbGVnYWN5VXNlcklkKTtcclxuICBjb25zdCBheFVzZXJJZCA9IHNhZmVUZXh0KGl0ZW0uYXhVc2VySWQgPz8gaXRlbS5BeFVzZXJJZCA/PyBsZWdhY3lVc2VySWQpO1xyXG4gIGNvbnN0IHJlc29sdmVkQ3JtVXNlcklkID0gY3JtVXNlcklkIHx8IGF4VXNlcklkO1xyXG4gIGNvbnN0IHJlc29sdmVkQXhVc2VySWQgPSBheFVzZXJJZCB8fCBjcm1Vc2VySWQ7XHJcblxyXG4gIGlmICghcmVzb2x2ZWRDcm1Vc2VySWQgfHwgIXJlc29sdmVkQXhVc2VySWQpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbmFtZSA9IHNhZmVUZXh0KGl0ZW0ubmFtZSA/PyBpdGVtLk5hbWUpIHx8IHJlc29sdmVkQXhVc2VySWQ7XHJcbiAgcmV0dXJuIHtcclxuICAgIGNybVVzZXJJZDogcmVzb2x2ZWRDcm1Vc2VySWQsXHJcbiAgICBheFVzZXJJZDogcmVzb2x2ZWRBeFVzZXJJZCxcclxuICAgIG5hbWUsXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVTdWJvcmRpbmF0ZUFycmF5ID0gKGl0ZW06IHVua25vd25bXSk6IEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvIHwgbnVsbCA9PiB7XHJcbiAgLy8gTGVnYWN5IEFYIHBheWxvYWQgc2hhcGU6IFt1c2VySWQsIG5hbWVdXHJcbiAgaWYgKGl0ZW0ubGVuZ3RoIDwgMykge1xyXG4gICAgY29uc3QgbGVnYWN5VXNlcklkID0gc2FmZVRleHQoaXRlbVswXSk7XHJcbiAgICBpZiAoIWxlZ2FjeVVzZXJJZCkgcmV0dXJuIG51bGw7XHJcbiAgICBjb25zdCBsZWdhY3lOYW1lID0gc2FmZVRleHQoaXRlbVsxXSkgfHwgbGVnYWN5VXNlcklkO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY3JtVXNlcklkOiBsZWdhY3lVc2VySWQsXHJcbiAgICAgIGF4VXNlcklkOiBsZWdhY3lVc2VySWQsXHJcbiAgICAgIG5hbWU6IGxlZ2FjeU5hbWUsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy8gQ3VycmVudCBBWCBwYXlsb2FkIHNoYXBlOiBbY3JtVXNlcklkLCBheFVzZXJJZCwgbmFtZV1cclxuICBjb25zdCBjcm1Vc2VySWQgPSBzYWZlVGV4dChpdGVtWzBdKTtcclxuICBjb25zdCBheFVzZXJJZCA9IHNhZmVUZXh0KGl0ZW1bMV0pO1xyXG4gIGNvbnN0IGZhbGxiYWNrSWQgPSBzYWZlVGV4dChpdGVtWzBdID8/IGl0ZW1bMV0pO1xyXG4gIGNvbnN0IHJlc29sdmVkQ3JtVXNlcklkID0gY3JtVXNlcklkIHx8IGZhbGxiYWNrSWQ7XHJcbiAgY29uc3QgcmVzb2x2ZWRBeFVzZXJJZCA9IGF4VXNlcklkIHx8IGZhbGxiYWNrSWQ7XHJcblxyXG4gIGlmICghcmVzb2x2ZWRDcm1Vc2VySWQgfHwgIXJlc29sdmVkQXhVc2VySWQpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbmFtZSA9IHNhZmVUZXh0KGl0ZW1bMl0pIHx8IHJlc29sdmVkQXhVc2VySWQ7XHJcbiAgcmV0dXJuIHtcclxuICAgIGNybVVzZXJJZDogcmVzb2x2ZWRDcm1Vc2VySWQsXHJcbiAgICBheFVzZXJJZDogcmVzb2x2ZWRBeFVzZXJJZCxcclxuICAgIG5hbWUsXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIE1hcHMgb25lIHJhdyBzdWJvcmRpbmF0ZSBpdGVtIGZyb20gbGVnYWN5IG9yIG5ldyBBUEkgc2hhcGUuXHJcbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZSA9IChpdGVtOiB1bmtub3duKTogRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG8gfCBudWxsID0+IHtcclxuICBpZiAoIWl0ZW0pIHJldHVybiBudWxsO1xyXG4gIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XHJcbiAgICByZXR1cm4gcmVzb2x2ZVN1Ym9yZGluYXRlQXJyYXkoaXRlbSk7XHJcbiAgfVxyXG4gIGlmICh0eXBlb2YgaXRlbSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIHJlc29sdmVTdWJvcmRpbmF0ZU9iamVjdChpdGVtIGFzIFJhd0V4cGVuc2VTdWJvcmRpbmF0ZSk7XHJcbn07XHJcblxyXG4vLyBOb3JtYWxpemVzIHJhdyBzdWJvcmRpbmF0ZSBhcnJheXMgYW5kIGRyb3BzIG1hbGZvcm1lZCBlbnRyaWVzLlxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVzID0gKHNvdXJjZTogdW5rbm93bik6IEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvW10gPT4ge1xyXG4gIGlmICghQXJyYXkuaXNBcnJheShzb3VyY2UpKSByZXR1cm4gW107XHJcblxyXG4gIHJldHVybiBzb3VyY2VcclxuICAgIC5tYXAoKGVudHJ5KSA9PiBtYXBFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZShlbnRyeSkpXHJcbiAgICAuZmlsdGVyKChlbnRyeSk6IGVudHJ5IGlzIEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvID0+ICEhZW50cnkpO1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O0FBQUEsSUFBTSx5QkFBeUI7QUFDL0IsSUFBTSx1QkFBdUI7QUFFN0IsSUFBTSxzQkFBc0I7QUFDNUIsSUFBTSxpQ0FBaUM7QUFDdkMsSUFBTSxzQkFBc0I7QUFDNUIsSUFBTSw2QkFBNkI7QUFDbkMsSUFBTSw2QkFBNkI7QUFDbkMsSUFBTSx1QkFBdUI7QUFFdEIsSUFBTSxrQ0FBa0M7QUFFL0MsSUFBTSxXQUFXLENBQUMsVUFBMkI7QUFDM0MsTUFBSSxVQUFVLFFBQVEsVUFBVSxPQUFXLFFBQU87QUFDbEQsU0FBTyxPQUFPLEtBQUssRUFBRSxLQUFLO0FBQzVCO0FBRUEsSUFBTSx5QkFBeUIsQ0FBQyxTQUEwQjtBQUN4RCxTQUFPLE9BQU8sVUFBVSxJQUFJLEtBQUssUUFBUSw4QkFBOEIsUUFBUTtBQUNqRjtBQUVBLElBQU0sNEJBQTRCLENBQUMsU0FBeUI7QUFDMUQsUUFBTSxhQUFhLEtBQUss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
