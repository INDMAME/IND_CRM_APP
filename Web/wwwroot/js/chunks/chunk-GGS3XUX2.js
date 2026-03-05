import {
  ApiFetchError,
  fetchJson,
  getCsrfToken
} from "./chunk-PU3BESI6.js";

// Web/wwwroot/react/src/pages/gastos/utils/expenseNumberFormat.ts
var EXPENSE_NUMBER_LOCALE = "en-US";
var sanitizeNumericToken = (value) => {
  return value.replace(/[^\d.,+-]/g, "");
};
var isThousandsGroupedInteger = (value, separator) => {
  const parts = value.split(separator);
  if (parts.length <= 1) return false;
  if (parts.some((part) => !/^\d+$/.test(part))) return false;
  if (parts[0].length < 1 || parts[0].length > 3) return false;
  return parts.slice(1).every((part) => part.length === 3);
};
var parseExpenseNumericInput = (raw) => {
  if (raw === null || raw === void 0) return null;
  if (typeof raw === "number") return Number.isFinite(raw) ? raw : null;
  let value = sanitizeNumericToken(String(raw || "").trim().replace(/\s+/g, ""));
  if (!value) return null;
  let sign = "";
  if (value.startsWith("-")) {
    sign = "-";
    value = value.slice(1);
  } else if (value.startsWith("+")) {
    value = value.slice(1);
  }
  value = value.replace(/[+-]/g, "");
  if (!value) return null;
  const hasComma = value.includes(",");
  const hasDot = value.includes(".");
  if (hasComma && !hasDot && isThousandsGroupedInteger(value, ",")) {
    const parsedInteger = Number(`${sign}${value.replace(/,/g, "")}`);
    return Number.isFinite(parsedInteger) ? parsedInteger : null;
  }
  if (hasDot && !hasComma && isThousandsGroupedInteger(value, ".")) {
    const parsedInteger = Number(`${sign}${value.replace(/\./g, "")}`);
    return Number.isFinite(parsedInteger) ? parsedInteger : null;
  }
  const lastComma = value.lastIndexOf(",");
  const lastDot = value.lastIndexOf(".");
  const decimalSeparatorIndex = Math.max(lastComma, lastDot);
  let normalized;
  if (decimalSeparatorIndex >= 0) {
    const integerPart = value.slice(0, decimalSeparatorIndex).replace(/[.,]/g, "");
    const decimalPart = value.slice(decimalSeparatorIndex + 1).replace(/[.,]/g, "");
    normalized = `${sign}${integerPart || "0"}${decimalPart ? `.${decimalPart}` : ""}`;
  } else {
    normalized = `${sign}${value.replace(/[.,]/g, "")}`;
  }
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
};
var formatExpenseNumber = (value, options) => {
  const fallback = options?.fallback ?? "-";
  if (value === null || value === void 0 || Number.isNaN(Number(value))) {
    return fallback;
  }
  return new Intl.NumberFormat(EXPENSE_NUMBER_LOCALE, {
    minimumFractionDigits: options?.minimumFractionDigits ?? 2,
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
    useGrouping: options?.useGrouping ?? true
  }).format(Number(value));
};
var formatExpenseInputNumber = (raw, options) => {
  const parsed = parseExpenseNumericInput(raw);
  if (parsed === null) {
    return options?.fallback ?? "";
  }
  return formatExpenseNumber(parsed, {
    minimumFractionDigits: options?.minimumFractionDigits ?? 2,
    maximumFractionDigits: options?.maximumFractionDigits ?? 2,
    useGrouping: options?.useGrouping ?? true,
    fallback: options?.fallback ?? ""
  });
};

// Web/wwwroot/react/src/pages/gastos/expenseFormatters.ts
var CURRENCY_SYMBOL_MAP = {
  USD: "$",
  EUR: "\u20AC",
  GBP: "\xA3",
  MXN: "MX$",
  BOB: "Bs",
  PEN: "S/",
  BRL: "R$",
  COP: "$",
  CLP: "$",
  ARS: "$"
};
var hasAlphabeticCurrencyCode = (value) => {
  return /[A-Za-z]{3}/.test(value);
};
var formatAmountWithCurrency = (amount, currencyCode, _locale) => {
  if (amount === null || amount === void 0 || Number.isNaN(Number(amount))) {
    return "-";
  }
  const safeCurrency = String(currencyCode || "").trim().toUpperCase();
  const decimalText = formatExpenseNumber(amount, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
    fallback: "-"
  });
  if (safeCurrency) {
    const mappedSymbol = CURRENCY_SYMBOL_MAP[safeCurrency];
    if (mappedSymbol) {
      return `${mappedSymbol}${decimalText}`;
    }
    try {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: safeCurrency,
        currencyDisplay: "symbol",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
      if (!hasAlphabeticCurrencyCode(formatted)) {
        return formatted;
      }
    } catch {
    }
  }
  return safeCurrency ? `${decimalText} ${safeCurrency}` : decimalText;
};

// Web/wwwroot/react/src/pages/gastos/utils/expenseApiDateUtils.ts
var DDMMYYYY_COMPACT_REGEX = /^\d{8}$/;
var DATE_ONLY_DMY_REGEX = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
var DATE_ONLY_YMD_REGEX = /^\d{4}[./-]\d{2}[./-]\d{2}$/;
var EXPENSE_API_DATE_FORMAT_MESSAGE = "Formato requerido: DDMMYYYY o DD.MM.YYYY";
var safeText = (value) => {
  if (value === null || value === void 0) return "";
  return String(value).trim();
};
var buildDate = (year, month, day) => {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
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
var toDdMmYyyyDotted = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${day}.${month}.${year}`;
};
var parseExpenseApiDate = (raw) => {
  if (raw instanceof Date) {
    return Number.isNaN(raw.getTime()) ? null : raw;
  }
  const value = safeText(raw);
  if (!value) return null;
  const dateOnly = value.split("T")[0].split(" ")[0];
  if (DDMMYYYY_COMPACT_REGEX.test(dateOnly)) {
    const dd = Number(dateOnly.slice(0, 2));
    const mm = Number(dateOnly.slice(2, 4));
    const yyyy = Number(dateOnly.slice(4, 8));
    const ddmmyyyy = buildDate(yyyy, mm, dd);
    if (ddmmyyyy) {
      return ddmmyyyy;
    }
    const legacyYear = Number(dateOnly.slice(0, 4));
    const legacyMonth = Number(dateOnly.slice(4, 6));
    const legacyDay = Number(dateOnly.slice(6, 8));
    return buildDate(legacyYear, legacyMonth, legacyDay);
  }
  if (DATE_ONLY_DMY_REGEX.test(dateOnly)) {
    const [dayText, monthText, yearText] = dateOnly.split(/[./-]/);
    return buildDate(Number(yearText), Number(monthText), Number(dayText));
  }
  if (DATE_ONLY_YMD_REGEX.test(dateOnly)) {
    const [yearText, monthText, dayText] = dateOnly.split(/[./-]/);
    return buildDate(Number(yearText), Number(monthText), Number(dayText));
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};
var toExpenseApiDate = (raw) => {
  const parsed = parseExpenseApiDate(raw);
  if (!parsed) return "";
  return toDdMmYyyyDotted(parsed);
};
var toExpenseApiDdMmYyyy = (raw) => {
  return toExpenseApiDate(raw);
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

// Web/wwwroot/react/src/pages/gastos/utils/expenseApiResponseNormalizers.ts
var normalizeListPagedResponse = (response) => {
  return {
    ...response,
    Items: Array.isArray(response?.Items) ? response.Items : []
  };
};
var normalizeDetailPagedResponse = (response) => {
  return {
    ...response,
    Items: Array.isArray(response?.Items) ? response.Items : []
  };
};
var normalizeApiResponse = (response) => {
  return {
    ...response,
    Errors: Array.isArray(response?.Errors) ? response.Errors : response?.Errors ?? null
  };
};
var normalizeCurrencyPagedResponse = (response) => {
  return {
    ...response,
    Items: Array.isArray(response?.Items) ? response.Items : []
  };
};
var normalizeTicketListPagedResponse = (response) => {
  const items = Array.isArray(response?.Items) ? response.Items : [];
  const normalizedItems = items.map((item) => ({
    ...item,
    Status: toNullableTicketStatusCode(
      item?.Status ?? item?.status
    ),
    ProcessedByAI: toNullableBool(
      item?.ProcessedByAI ?? item?.processedByAI
    ),
    HojaGastosIdDisplay: safeText2(
      item?.HojaGastosIdDisplay ?? item?.hojaGastosIdDisplay
    ),
    GastoType: toNullableGastoTypeCode(
      item?.GastoType ?? item?.gastoType
    )
  }));
  return {
    ...response,
    Items: normalizedItems
  };
};
var normalizeTicketDetailPagedResponse = (response) => {
  const items = Array.isArray(response?.Items) ? response.Items : [];
  const normalizedItems = items.map((item) => ({
    ...item,
    Status: toNullableTicketStatusCode(
      item?.Status ?? item?.status
    ),
    ProcessedByAI: toNullableBool(
      item?.ProcessedByAI ?? item?.processedByAI
    ),
    HojaGastosIdDisplay: safeText2(
      item?.HojaGastosIdDisplay ?? item?.hojaGastosIdDisplay
    ),
    GastoType: toNullableGastoTypeCode(
      item?.GastoType ?? item?.gastoType
    ),
    Lines: Array.isArray(item?.Lines) ? item.Lines : []
  }));
  return {
    ...response,
    Items: normalizedItems
  };
};

// Web/wwwroot/react/src/pages/gastos/utils/expenseApiMappers.ts
var readExpenseWindowRuntime = () => {
  if (typeof window === "undefined") return {};
  return window;
};
var resolveTypeLabel = (typeValueCode) => {
  if (!typeValueCode || typeof window === "undefined") {
    return typeValueCode;
  }
  const rawCatalogSource = readExpenseWindowRuntime().__EXPENSE_GASTO_TYPES__;
  const rawCatalog = Array.isArray(rawCatalogSource) ? rawCatalogSource : [];
  const match = rawCatalog.find((entry) => {
    const entryCode = safeText2(entry?.value || entry?.Value);
    return entryCode === typeValueCode;
  });
  return safeText2(match?.text || match?.Text) || typeValueCode;
};
var mapExpenseSheetListItemToCard = (item) => {
  return {
    hojaGastosId: safeText2(item.HojaGastosId),
    description: safeText2(item.Description),
    expenseSheetStatus: toNullableNumber(item.ExpenseSheetStatus),
    estadoComentarios: safeText2(item.EstadoComentarios) || null,
    userId: safeText2(item.UserId),
    voucher: safeText2(item.Voucher),
    projId: safeText2(item.ProjId),
    currencyCode: safeText2(item.CurrencyCode),
    totalAmount: toNullableNumber(item.TotalAmount),
    exchRate: toNullableNumber(item.ExchRate),
    exchangeRateMode: toNullableNumber(item.ExchangeRateMode),
    createdDate: safeText2(item.CreatedDate)
  };
};
var mapExpenseSheetHeader = (sheet) => {
  return {
    hojaGastosId: safeText2(sheet.HojaGastosId),
    description: safeText2(sheet.Description),
    userId: safeText2(sheet.UserId),
    expenseSheetStatus: toNullableNumber(sheet.ExpenseSheetStatus),
    estadoComentarios: safeText2(sheet.EstadoComentarios) || null,
    currencyCode: safeText2(sheet.CurrencyCode),
    totalAmount: toNullableNumber(sheet.TotalAmount),
    exchRate: safeText2(sheet.ExchRate),
    exchangeRateMode: toNullableNumber(sheet.ExchangeRateMode),
    projId: safeText2(sheet.ProjId),
    voucher: safeText2(sheet.Voucher),
    createdDate: safeText2(sheet.CreatedDate)
  };
};
var mapExpenseSheetLine = (line) => {
  const typeValueCode = safeText2(line.TypeValue);
  const legacyPrice = line.price;
  const legacyFileId = line.fileId;
  return {
    lineRecId: safeText2(line.RecId),
    transDate: safeText2(line.TransDate),
    typeValueCode,
    typeValue: resolveTypeLabel(typeValueCode),
    description: safeText2(line.Description),
    internacional: toNullableBool(line.Internacional),
    fileId: safeText2(line.FileId ?? legacyFileId),
    ticket: toNullableBool(line.Ticket),
    price: toNullableNumber(line.Price ?? legacyPrice),
    qty: toNullableNumber(line.Qty),
    amount: toNullableNumber(line.Amount),
    projId: safeText2(line.ProjId),
    indAttachFiles: safeText2(line.IndAttachFiles)
  };
};

// Web/wwwroot/react/src/pages/gastos/utils/expenseApi.ts
var DEFAULT_APP_CODE = "CRM";
var JSON_HEADERS = {
  "Content-Type": "application/json"
};
var runtimeAuthSeed = {};
var cachedContext = null;
var cachedContextKey = "";
var contextPromise = null;
var cachedCurrencyResponses = /* @__PURE__ */ new Map();
var pendingCurrencyRequests = /* @__PURE__ */ new Map();
var safeText3 = safeText2;
var tryParseJsonRecord = (raw) => {
  if (!raw || !raw.trim()) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
};
var readApiMessage = (raw) => {
  const payload = tryParseJsonRecord(raw);
  if (!payload) return "";
  const value = payload.Message ?? payload.message;
  return typeof value === "string" ? value.trim() : "";
};
var toNullableNumber2 = toNullableNumber;
var isNonNegativeNumber2 = isNonNegativeNumber;
var isPositiveNumber2 = isPositiveNumber;
var normalizeOptionalTicketGastoType2 = normalizeOptionalTicketGastoType;
var normalizeTicketListGastoType2 = normalizeTicketListGastoType;
var normalizeOptionalTicketStatus2 = normalizeOptionalTicketStatus;
var normalizeOptionalApiDate2 = normalizeOptionalApiDate;
var normalizeRequiredApiDate2 = normalizeRequiredApiDate;
var normalizeTicketListDate2 = normalizeTicketListDate;
var normalizeOptionalTicketProcessedByAI2 = normalizeOptionalTicketProcessedByAI;
var normalizeExpenseSheetListStatusFilter2 = normalizeExpenseSheetListStatusFilter;
var toFlagBool2 = toFlagBool;
var readExpenseWindowRuntime2 = () => {
  if (typeof window === "undefined") return {};
  return window;
};
var sanitizeHeaders = (headers) => {
  if (!headers) return {};
  if (headers instanceof Headers) {
    const result = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
  if (Array.isArray(headers)) {
    return headers.reduce((acc, [key, value]) => {
      acc[String(key)] = String(value);
      return acc;
    }, {});
  }
  return Object.entries(headers).reduce((acc, [key, value]) => {
    if (value === void 0 || value === null) return acc;
    acc[key] = String(value);
    return acc;
  }, {});
};
var getHeaderValue = (headers, key) => {
  const normalizedKey = key.trim().toLowerCase();
  const entries = Object.entries(sanitizeHeaders(headers));
  const match = entries.find(([headerKey]) => headerKey.trim().toLowerCase() === normalizedKey);
  return safeText3(match?.[1]);
};
var removeHeaderValue = (headers, key) => {
  const normalizedKey = key.trim().toLowerCase();
  const toDelete = Object.keys(headers).find((headerKey) => headerKey.trim().toLowerCase() === normalizedKey);
  if (!toDelete) return;
  delete headers[toDelete];
};
var resolveBearerToken = (headers) => {
  const authorization = getHeaderValue(headers, "Authorization");
  if (!authorization) return "";
  if (/^bearer\s+/i.test(authorization)) {
    return authorization.replace(/^bearer\s+/i, "").trim();
  }
  return authorization.trim();
};
var readWindowAuthSeed = () => {
  const runtimeWindow = readExpenseWindowRuntime2();
  return {
    token: safeText3(runtimeWindow.__IND_API_TOKEN__),
    entraOid: safeText3(runtimeWindow.__IND_ENTRA_OID__),
    appCode: safeText3(runtimeWindow.__IND_APP_CODE__),
    strictApiRoutes: toFlagBool2(runtimeWindow.__IND_EXPENSE_STRICT_API__) === true
  };
};
var readRuntimeStrictApiFlag = () => {
  if (typeof window === "undefined") return false;
  const runtimeWindow = readExpenseWindowRuntime2();
  const explicitWindowFlag = toFlagBool2(runtimeWindow.__IND_EXPENSE_STRICT_API__);
  return explicitWindowFlag === true;
};
var readWindowSelectedCompany = () => {
  return safeText3(readExpenseWindowRuntime2().__IND_SELECTED_COMPANY__).toUpperCase();
};
var buildContextKey = (seed) => {
  return `${seed.token}|${seed.entraOid}|${seed.appCode}|${readWindowSelectedCompany()}`;
};
var buildExpenseHeaders = (context, options, includeJson = false, includeAxUserId = true) => {
  const base = sanitizeHeaders(options?.headers);
  const merged = { ...base };
  if (safeText3(context.token)) {
    merged.Authorization = `Bearer ${context.token}`;
  }
  if (safeText3(context.companyId)) {
    merged["X-IND-Company"] = context.companyId;
  }
  if (includeAxUserId && safeText3(context.axUserId)) {
    merged["X-IND-AxUserId"] = context.axUserId;
  }
  if (includeJson) {
    merged["Content-Type"] = "application/json";
  }
  return merged;
};
var buildExpenseFormHeaders = (context, options) => {
  const headers = sanitizeHeaders(buildExpenseHeaders(context, options, false));
  removeHeaderValue(headers, "Content-Type");
  return headers;
};
var buildContextHeaders = (token, options) => {
  const base = sanitizeHeaders(options?.headers);
  const merged = {
    ...base,
    ...JSON_HEADERS
  };
  if (safeText3(token)) {
    merged.Authorization = `Bearer ${token}`;
  }
  return merged;
};
var resolveAuthToken = (options) => {
  const tokenFromHeaders = resolveBearerToken(options?.headers);
  const windowSeed = readWindowAuthSeed();
  return safeText3(tokenFromHeaders || runtimeAuthSeed.token || windowSeed.token);
};
var resolveAuthSeed = (options) => {
  const windowSeed = readWindowAuthSeed();
  const token = resolveAuthToken(options);
  const entraOid = safeText3(runtimeAuthSeed.entraOid || windowSeed.entraOid);
  const appCode = safeText3(runtimeAuthSeed.appCode || windowSeed.appCode || DEFAULT_APP_CODE) || DEFAULT_APP_CODE;
  const strictApiRoutes = typeof runtimeAuthSeed.strictApiRoutes === "boolean" ? runtimeAuthSeed.strictApiRoutes : windowSeed.strictApiRoutes === true;
  return {
    token,
    entraOid,
    appCode,
    strictApiRoutes
  };
};
var validateContextResponse = (response) => {
  if (!response.Success) {
    throw new ApiFetchError(response.Message || "Could not load Entra context.");
  }
  const first = Array.isArray(response.Items) ? response.Items[0] : null;
  if (!first || !first.Header) {
    throw new ApiFetchError("Could not load Entra context.");
  }
  const axUserId = safeText3(first.Header.AxUserId);
  const defaultCompany = safeText3(first.Header.DefaultCompany);
  const defaultCurrencyCode = safeText3(first.Header.DefaultCurrencyCode);
  const companies = Array.isArray(first.Companies) ? first.Companies : [];
  const fallbackCompany = safeText3(companies.find((item) => item.IsDefault)?.CompanyId);
  const companyId = defaultCompany || fallbackCompany;
  const selectedCompany = companies.find((item) => safeText3(item.CompanyId) === companyId) || companies[0];
  const allowSelfManagement = selectedCompany?.AllowSelfManagement === true;
  if (!axUserId || !companyId) {
    throw new ApiFetchError("Could not resolve Entra company context.");
  }
  return {
    token: "",
    companyId,
    axUserId,
    defaultCurrencyCode,
    allowSelfManagement
  };
};
var ensureExpenseApiContext = async (options) => {
  const seed = resolveAuthSeed(options);
  const contextKey = buildContextKey(seed);
  if (cachedContext && cachedContextKey === contextKey) {
    return cachedContext;
  }
  if (contextPromise && cachedContextKey === contextKey) {
    return contextPromise;
  }
  const fallbackCompanyId = readWindowSelectedCompany();
  if (!safeText3(seed.entraOid) && fallbackCompanyId) {
    const fallbackContext = {
      token: seed.token,
      companyId: fallbackCompanyId,
      axUserId: "",
      defaultCurrencyCode: "",
      allowSelfManagement: globalThis.__IND_ALLOW_SELF_MANAGEMENT__ === true
    };
    cachedContext = fallbackContext;
    cachedContextKey = contextKey;
    return fallbackContext;
  }
  if (!safeText3(seed.entraOid)) {
    throw new ApiFetchError("Missing Entra OID for Entra context request.");
  }
  cachedContextKey = contextKey;
  contextPromise = (async () => {
    const contextPayload = {
      entraOid: seed.entraOid,
      appCode: seed.appCode
    };
    const contextResponse = await fetchJson("/api/auth/entra/context", {
      ...options,
      method: "POST",
      headers: buildContextHeaders(seed.token, options),
      body: JSON.stringify(contextPayload)
    });
    const resolved = validateContextResponse(contextResponse);
    const nextContext = {
      ...resolved,
      token: seed.token
    };
    if (typeof window !== "undefined") {
      window.__IND_ALLOW_SELF_MANAGEMENT__ = nextContext.allowSelfManagement;
    }
    cachedContext = nextContext;
    return nextContext;
  })();
  try {
    return await contextPromise;
  } finally {
    contextPromise = null;
  }
};
var normalizeListPagedResponse2 = normalizeListPagedResponse;
var normalizeDetailPagedResponse2 = normalizeDetailPagedResponse;
var normalizeApiResponse2 = normalizeApiResponse;
var normalizeCurrencyPagedResponse2 = normalizeCurrencyPagedResponse;
var normalizeTicketListPagedResponse2 = normalizeTicketListPagedResponse;
var normalizeTicketDetailPagedResponse2 = normalizeTicketDetailPagedResponse;
var looksLikeHtmlDocument = (value) => {
  const raw = safeText3(value).toLowerCase();
  return raw.startsWith("<!doctype html") || raw.startsWith("<html");
};
var isApiRouteUnavailable = (error) => {
  if (!(error instanceof ApiFetchError)) return false;
  if (error.status === 404 || error.status === 405) return true;
  return error.status === void 0 && looksLikeHtmlDocument(error.responseBody);
};
var isStrictApiRoutesEnabled = () => {
  if (typeof runtimeAuthSeed.strictApiRoutes === "boolean") {
    return runtimeAuthSeed.strictApiRoutes;
  }
  return readRuntimeStrictApiFlag();
};
var shouldUseLegacyFallback = (error) => {
  if (isStrictApiRoutesEnabled()) return false;
  return isApiRouteUnavailable(error);
};
var toLegacyListRequestPayload = (payload) => {
  return {
    filter: safeText3(payload.filter),
    hojaGastosId: safeText3(payload.filter),
    billedMode: payload.billedMode ?? 2,
    fromDate: safeText3(payload.createdDateFrom),
    toDate: safeText3(payload.createdDateTo),
    projectId: safeText3(payload.projId),
    currencyCode: safeText3(payload.currencyCode),
    expenseSheetStatus: normalizeExpenseSheetListStatusFilter2(payload.expenseSheetStatus),
    page: Number.isFinite(payload.page) && payload.page > 0 ? payload.page : 1,
    pageSize: Number.isFinite(payload.pageSize) && payload.pageSize > 0 ? payload.pageSize : 50
  };
};
var mapLegacyListItemToApiListItem = (item) => {
  return {
    HojaGastosId: safeText3(item.hojaGastosId),
    Description: safeText3(item.description),
    ExpenseSheetStatus: toNullableNumber2(item.expenseSheetStatus),
    EstadoComentarios: safeText3(item.estadoComentarios) || null,
    UserId: safeText3(item.userId) || null,
    Voucher: safeText3(item.voucher),
    ProjId: safeText3(item.projId),
    CurrencyCode: safeText3(item.currencyCode),
    TotalAmount: toNullableNumber2(item.totalAmount ?? item.totalAmountMST),
    ExchRate: toNullableNumber2(item.exchRate),
    ExchangeRateMode: toNullableNumber2(item.exchangeRateMode),
    CreatedDate: safeText3(item.createdDate) || null
  };
};
var mapLegacyListResponse = (legacy, fallbackPage, fallbackPageSize) => {
  const legacyItems = Array.isArray(legacy?.items) ? legacy.items : [];
  const mappedItems = legacyItems.map((entry) => mapLegacyListItemToApiListItem(entry));
  return {
    Success: legacy.success !== false,
    Message: safeText3(legacy.message) || "OK",
    Total: toNullableNumber2(legacy.total) ?? mappedItems.length,
    Page: toNullableNumber2(legacy.page) ?? fallbackPage,
    PageSize: toNullableNumber2(legacy.pageSize) ?? fallbackPageSize,
    Items: mappedItems,
    TraceId: void 0
  };
};
var configureExpenseApiAuth = (seed) => {
  const strictFromSeed = toFlagBool2(seed.strictApiRoutes);
  const strictFromRuntime = typeof runtimeAuthSeed.strictApiRoutes === "boolean" ? runtimeAuthSeed.strictApiRoutes : readRuntimeStrictApiFlag();
  runtimeAuthSeed = {
    ...runtimeAuthSeed,
    token: safeText3(seed.token || runtimeAuthSeed.token),
    entraOid: safeText3(seed.entraOid || runtimeAuthSeed.entraOid),
    appCode: safeText3(seed.appCode || runtimeAuthSeed.appCode || DEFAULT_APP_CODE),
    strictApiRoutes: strictFromSeed ?? strictFromRuntime
  };
  cachedContext = null;
  cachedContextKey = "";
  contextPromise = null;
  cachedCurrencyResponses.clear();
  pendingCurrencyRequests.clear();
};
var mapExpenseSheetListItemToCard2 = mapExpenseSheetListItemToCard;
var mapExpenseSheetHeader2 = mapExpenseSheetHeader;
var mapExpenseSheetLine2 = mapExpenseSheetLine;
var fetchExpenseSheetList = async (payload, options) => {
  const rawCreatedDateFrom = safeText3(payload?.createdDateFrom);
  const rawCreatedDateTo = safeText3(payload?.createdDateTo);
  const createdDateFrom = normalizeOptionalApiDate2(rawCreatedDateFrom);
  const createdDateTo = normalizeOptionalApiDate2(rawCreatedDateTo);
  if (rawCreatedDateFrom && !createdDateFrom) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }
  if (rawCreatedDateTo && !createdDateTo) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }
  const safePayload = {
    ...payload,
    createdDateFrom,
    createdDateTo,
    expenseSheetStatus: normalizeExpenseSheetListStatusFilter2(payload.expenseSheetStatus)
  };
  const context = await ensureExpenseApiContext(options);
  try {
    const response = await fetchJson("/api/crm/expensesheets/list", {
      ...options,
      method: "POST",
      headers: buildExpenseHeaders(context, options, true),
      body: JSON.stringify(safePayload)
    });
    return normalizeListPagedResponse2(response);
  } catch (error) {
    if (!shouldUseLegacyFallback(error)) {
      throw error;
    }
    const legacyResponse = await fetchJson("/Gastos/ListExpenseSheets", {
      ...options,
      method: "POST",
      headers: {
        ...sanitizeHeaders(options?.headers),
        ...JSON_HEADERS
      },
      body: JSON.stringify(toLegacyListRequestPayload(safePayload))
    });
    const mapped = mapLegacyListResponse(
      legacyResponse,
      Number.isFinite(safePayload.page) && safePayload.page > 0 ? safePayload.page : 1,
      Number.isFinite(safePayload.pageSize) && safePayload.pageSize > 0 ? safePayload.pageSize : 50
    );
    return normalizeListPagedResponse2(mapped);
  }
};
var fetchExpenseSheetDetail = async (hojaGastosId, options) => {
  const context = await ensureExpenseApiContext(options);
  const safeSheetId = encodeURIComponent(String(hojaGastosId || "").trim());
  const response = await fetchJson(`/api/crm/expensesheets/${safeSheetId}`, {
    ...options,
    method: "GET",
    headers: buildExpenseHeaders(context, options)
  });
  return normalizeDetailPagedResponse2(response);
};
var getExpenseSheetCurrencies = async (options) => {
  let context = null;
  try {
    context = await ensureExpenseApiContext(options);
  } catch (error) {
    if (!(error instanceof ApiFetchError)) {
      throw error;
    }
  }
  const companyId = safeText3(context?.companyId || readWindowSelectedCompany()).toUpperCase();
  const cacheKey = companyId || "-";
  if (cachedCurrencyResponses.has(cacheKey)) {
    return cachedCurrencyResponses.get(cacheKey);
  }
  if (pendingCurrencyRequests.has(cacheKey)) {
    return pendingCurrencyRequests.get(cacheKey);
  }
  const requestPromise = (async () => {
    const headers = sanitizeHeaders(options?.headers);
    removeHeaderValue(headers, "Authorization");
    removeHeaderValue(headers, "X-IND-AxUserId");
    if (companyId) {
      headers["X-IND-Company"] = companyId;
    }
    try {
      const response = await fetchJson("/api/crm/expensesheets/currencies", {
        ...options,
        method: "GET",
        headers
      });
      const normalizedResponse = normalizeCurrencyPagedResponse2(response);
      if (normalizedResponse.Success) {
        cachedCurrencyResponses.set(cacheKey, normalizedResponse);
      }
      return normalizedResponse;
    } catch (error) {
      if (!shouldUseLegacyFallback(error)) {
        throw error;
      }
      const legacyListResponse = await fetchJson("/Gastos/ListExpenseSheets", {
        ...options,
        method: "POST",
        headers: {
          ...sanitizeHeaders(options?.headers),
          ...JSON_HEADERS
        },
        body: JSON.stringify({
          filter: "",
          hojaGastosId: "",
          billedMode: 2,
          fromDate: "",
          toDate: "",
          projectId: "",
          currencyCode: "",
          page: 1,
          pageSize: 200
        })
      });
      const seenCodes = /* @__PURE__ */ new Set();
      const sourceItems = Array.isArray(legacyListResponse.items) ? legacyListResponse.items : [];
      const fallbackItems = sourceItems.map((entry) => safeText3(entry.currencyCode).toUpperCase()).filter((code) => !!code).filter((code) => {
        if (seenCodes.has(code)) return false;
        seenCodes.add(code);
        return true;
      }).map((code) => ({
        CurrencyCode: code,
        CurrencyCodeISO: code
      }));
      const fallbackResponse = {
        Success: legacyListResponse.success !== false,
        Message: safeText3(legacyListResponse.message) || "OK",
        Total: fallbackItems.length,
        Page: 1,
        PageSize: fallbackItems.length,
        Items: fallbackItems,
        TraceId: void 0
      };
      const normalizedFallback = normalizeCurrencyPagedResponse2(fallbackResponse);
      if (normalizedFallback.Success) {
        cachedCurrencyResponses.set(cacheKey, normalizedFallback);
      }
      return normalizedFallback;
    }
  })();
  pendingCurrencyRequests.set(cacheKey, requestPromise);
  try {
    return await requestPromise;
  } finally {
    pendingCurrencyRequests.delete(cacheKey);
  }
};
var getExpenseSheetDefaultCurrencyCode = async (options) => {
  try {
    const context = await ensureExpenseApiContext(options);
    return safeText3(context.defaultCurrencyCode).toUpperCase();
  } catch {
    return "";
  }
};
var getExchangeRate = async (baseCurrency, targetCurrency, date, options) => {
  const token = resolveAuthToken(options);
  const normalizedBaseCurrency = safeText3(baseCurrency).toUpperCase();
  const normalizedTargetCurrency = safeText3(targetCurrency).toUpperCase();
  const normalizedDate = safeText3(date);
  const query = new URLSearchParams();
  query.set("baseCurrency", normalizedBaseCurrency);
  query.set("targetCurrency", normalizedTargetCurrency);
  if (normalizedDate) {
    query.set("date", normalizedDate);
  }
  const headers = sanitizeHeaders(options?.headers);
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return fetchJson(`/api/system/exchange-rate?${query.toString()}`, {
    ...options,
    method: "GET",
    headers
  });
};
var getFuelPriceKm = async (transDate, options) => {
  const context = await ensureExpenseApiContext(options);
  const normalizedDate = normalizeRequiredApiDate2(transDate);
  const query = new URLSearchParams();
  query.set("transDate", normalizedDate);
  const response = await fetchJson(
    `/api/crm/expensesheets/fuel-price-km?${query.toString()}`,
    {
      ...options,
      method: "GET",
      headers: buildExpenseHeaders(context, options)
    }
  );
  return normalizeApiResponse2(response);
};
var createExpenseSheet = async (payload, options) => {
  const context = await ensureExpenseApiContext(options);
  const mode = payload.mode ?? 0;
  const lines = Array.isArray(payload.lines) ? payload.lines : [];
  const normalizedLines = lines.map((line) => ({
    ...line,
    transDate: normalizeRequiredApiDate2(line.transDate)
  }));
  const hasInvalidLinePayload = normalizedLines.some((line) => {
    return !safeText3(line.transDate) || !Number.isInteger(Number(line.typeValue)) || Number(line.typeValue) <= 0 || !isPositiveNumber2(line.qty) || !isPositiveNumber2(line.price);
  });
  if (payload.expenseSheetStatus !== void 0 && !isNonNegativeNumber2(payload.expenseSheetStatus)) {
    throw new ApiFetchError("expenseSheetStatus must be greater or equal to 0.");
  }
  if (payload.exchangeRateMode !== void 0 && !isNonNegativeNumber2(payload.exchangeRateMode)) {
    throw new ApiFetchError("exchangeRateMode must be greater or equal to 0.");
  }
  if (payload.exchangeRateMode !== void 0 && payload.expenseSheetStatus === void 0) {
    throw new ApiFetchError("exchangeRateMode requires expenseSheetStatus.");
  }
  if (hasInvalidLinePayload) {
    throw new ApiFetchError("Each line requires transDate, typeValue, qty > 0 and price > 0.");
  }
  if (mode === 0) {
    if (!safeText3(payload.description) || !safeText3(payload.currencyCode) || lines.length < 1) {
      throw new ApiFetchError("Invalid create payload for mode 0.");
    }
  }
  if (mode === 1) {
    if (!safeText3(payload.description) || !safeText3(payload.currencyCode)) {
      throw new ApiFetchError("Invalid create payload for mode 1.");
    }
    if (lines.length > 0) {
      throw new ApiFetchError("Mode 1 requires lines to be null or empty.");
    }
  }
  if (mode === 2) {
    if (!safeText3(payload.existingHojaGastosId) || lines.length < 1) {
      throw new ApiFetchError("Invalid create payload for mode 2.");
    }
  }
  const normalizedPayload = {
    ...payload,
    mode,
    existingHojaGastosId: safeText3(payload.existingHojaGastosId) || void 0,
    description: safeText3(payload.description) || void 0,
    currencyCode: safeText3(payload.currencyCode) || void 0,
    projId: safeText3(payload.projId) || void 0,
    lines: mode === 1 ? [] : normalizedLines
  };
  const response = await fetchJson("/api/crm/expensesheets", {
    ...options,
    method: "POST",
    headers: buildExpenseHeaders(context, options, true),
    body: JSON.stringify(normalizedPayload)
  });
  return normalizeApiResponse2(response);
};
var updateExpenseSheetHeader = async (hojaGastosId, payload, options) => {
  const context = await ensureExpenseApiContext(options);
  const safeSheetId = encodeURIComponent(String(hojaGastosId || "").trim());
  if (payload.expenseSheetStatus !== void 0 && !isNonNegativeNumber2(payload.expenseSheetStatus)) {
    throw new ApiFetchError("expenseSheetStatus must be greater or equal to 0.");
  }
  if (payload.exchangeRateMode !== void 0 && !isNonNegativeNumber2(payload.exchangeRateMode)) {
    throw new ApiFetchError("exchangeRateMode must be greater or equal to 0.");
  }
  const response = await fetchJson(`/api/crm/expensesheets/${safeSheetId}`, {
    ...options,
    method: "PUT",
    headers: buildExpenseHeaders(context, options, true),
    body: JSON.stringify(payload)
  });
  return normalizeApiResponse2(response);
};
var deleteExpenseSheet = async (hojaGastosId, options) => {
  const context = await ensureExpenseApiContext(options);
  const safeSheetId = encodeURIComponent(String(hojaGastosId || "").trim());
  const response = await fetchJson(
    `/api/crm/expensesheets/${safeSheetId}/lines/0?deleteMode=2&deleteWholeSheet=true`,
    {
      ...options,
      method: "DELETE",
      headers: buildExpenseHeaders(context, options)
    }
  );
  return normalizeApiResponse2(response);
};
var updateExpenseSheetLine = async (hojaGastosId, lineRecId, payload, options) => {
  const normalizedTransDate = normalizeRequiredApiDate2(payload.transDate);
  if (!Number.isInteger(Number(payload.typeValue)) || Number(payload.typeValue) <= 0 || !isPositiveNumber2(payload.qty) || !isPositiveNumber2(payload.price)) {
    throw new ApiFetchError("transDate, typeValue, qty > 0 and price > 0 are required.");
  }
  const context = await ensureExpenseApiContext(options);
  const safeSheetId = encodeURIComponent(String(hojaGastosId || "").trim());
  const safeLineId = encodeURIComponent(String(lineRecId || "").trim());
  const response = await fetchJson(
    `/api/crm/expensesheets/${safeSheetId}/lines/${safeLineId}`,
    {
      ...options,
      method: "PUT",
      headers: buildExpenseHeaders(context, options, true),
      body: JSON.stringify({
        ...payload,
        transDate: normalizedTransDate
      })
    }
  );
  return normalizeApiResponse2(response);
};
var deleteExpenseSheetLine = async (hojaGastosId, lineRecId, options) => {
  const context = await ensureExpenseApiContext(options);
  const safeSheetId = encodeURIComponent(String(hojaGastosId || "").trim());
  const safeLineId = encodeURIComponent(String(lineRecId || "").trim());
  const response = await fetchJson(
    `/api/crm/expensesheets/${safeSheetId}/lines/${safeLineId}?deleteMode=0&deleteWholeSheet=false`,
    {
      ...options,
      method: "DELETE",
      headers: buildExpenseHeaders(context, options)
    }
  );
  return normalizeApiResponse2(response);
};
var extractExpenseFromTicketDraft = async (ticketImage, persistTicket, ticketUrlFile, options) => {
  const context = await ensureExpenseApiContext(options);
  const form = new FormData();
  const safeTicketUrl = safeText3(ticketUrlFile);
  if (ticketImage instanceof File) {
    form.append("ticketImage", ticketImage, safeText3(ticketImage.name) || "ticket.jpg");
  } else {
    form.append("ticketImage", ticketImage, "ticket.jpg");
  }
  if (typeof persistTicket === "boolean") {
    form.append("persistTicket", persistTicket ? "true" : "false");
  }
  if (safeTicketUrl) {
    form.append("ticketUrlFile", safeTicketUrl);
  }
  const response = await fetchJson("/api/ia/service/expensefromticket", {
    ...options,
    method: "POST",
    headers: buildExpenseFormHeaders(context, options),
    body: form
  });
  return normalizeApiResponse2(response);
};
var createExpenseSheetTicket = async (payload, options) => {
  const context = await ensureExpenseApiContext(options);
  const mode = Number(payload?.mode);
  const rawTransDate = safeText3(payload?.transDate);
  const normalizedTransDate = normalizeOptionalApiDate2(rawTransDate);
  if (rawTransDate && !normalizedTransDate) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }
  if ((mode === 0 || mode === 1) && !normalizedTransDate) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }
  const safePayload = {
    ...payload,
    transDate: normalizedTransDate || void 0,
    gastoType: normalizeOptionalTicketGastoType2(payload?.gastoType)
  };
  const response = await fetchJson("/api/crm/expensesheets/tickets", {
    ...options,
    method: "POST",
    headers: buildExpenseHeaders(context, options, true),
    body: JSON.stringify(safePayload)
  });
  return normalizeApiResponse2(response);
};
var fetchExpenseSheetTicketsList = async (payload, options) => {
  const context = await ensureExpenseApiContext(options);
  const rawCreatedDateFrom = safeText3(payload?.createdDateFrom);
  const rawCreatedDateTo = safeText3(payload?.createdDateTo);
  const createdDateFrom = normalizeTicketListDate2(rawCreatedDateFrom);
  const createdDateTo = normalizeTicketListDate2(rawCreatedDateTo);
  if (rawCreatedDateFrom && !createdDateFrom) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }
  if (rawCreatedDateTo && !createdDateTo) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }
  const preferredSearchKey = safeText3(payload?.searchKey || payload?.filter);
  const legacyFilter = safeText3(payload?.filter || preferredSearchKey);
  const safePayload = {
    page: Number.isFinite(payload?.page) && payload.page > 0 ? Math.floor(payload.page) : 1,
    pageSize: Number.isFinite(payload?.pageSize) && payload.pageSize > 0 ? Math.floor(payload.pageSize) : 50,
    createdDateFrom: createdDateFrom || void 0,
    createdDateTo: createdDateTo || void 0,
    searchKey: preferredSearchKey || void 0,
    filter: legacyFilter || void 0,
    status: normalizeOptionalTicketStatus2(payload?.status),
    currencyCode: safeText3(payload?.currencyCode).toUpperCase() || void 0,
    gastoType: normalizeTicketListGastoType2(payload?.gastoType),
    processedByAI: normalizeOptionalTicketProcessedByAI2(payload?.processedByAI)
  };
  const response = await fetchJson(
    "/api/crm/expensesheets/tickets/list",
    {
      ...options,
      method: "POST",
      headers: buildExpenseHeaders(context, options, true),
      body: JSON.stringify(safePayload)
    }
  );
  return normalizeTicketListPagedResponse2(response);
};
var fetchExpenseSheetTicket = async (fileId, options) => {
  const context = await ensureExpenseApiContext(options);
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  const response = await fetchJson(
    `/api/crm/expensesheets/tickets/${safeFileId}`,
    {
      ...options,
      method: "GET",
      headers: buildExpenseHeaders(context, options)
    }
  );
  return normalizeTicketDetailPagedResponse2(response);
};
var fetchExpenseSheetTicketPreviewBlob = async (urlFile, options) => {
  const safeUrlFile = safeText3(urlFile);
  if (!safeUrlFile) {
    throw new ApiFetchError("Missing ticket urlFile.");
  }
  const { suppressPermissionModal: _suppressPermissionModal, ...fetchOptions } = options || {};
  const csrfToken = getCsrfToken();
  const headers = {
    Accept: "image/*",
    "Content-Type": "application/json",
    ...fetchOptions.headers || {}
  };
  if (csrfToken) {
    headers["RequestVerificationToken"] = csrfToken;
  }
  const response = await fetch("/api/crm/expensesheets/tickets/preview", {
    credentials: "same-origin",
    ...fetchOptions,
    method: "POST",
    headers,
    body: JSON.stringify({ urlFile: safeUrlFile })
  });
  if (!response.ok) {
    const raw = await response.text();
    const message = readApiMessage(raw);
    throw new ApiFetchError(message || "Could not load ticket preview.", response.status, raw);
  }
  const blob = await response.blob();
  if (!blob || blob.size === 0) {
    throw new ApiFetchError("Could not load ticket preview.");
  }
  return blob;
};
var updateExpenseSheetTicket = async (fileId, payload, options) => {
  const context = await ensureExpenseApiContext(options);
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  const rawTransDate = safeText3(payload?.transDate);
  const normalizedTransDate = normalizeOptionalApiDate2(rawTransDate);
  if (rawTransDate && !normalizedTransDate) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }
  const safePayload = {
    ...payload,
    transDate: normalizedTransDate || void 0,
    gastoType: normalizeOptionalTicketGastoType2(payload?.gastoType)
  };
  const response = await fetchJson(`/api/crm/expensesheets/tickets/${safeFileId}`, {
    ...options,
    method: "PUT",
    headers: buildExpenseHeaders(context, options, true),
    body: JSON.stringify(safePayload)
  });
  return normalizeApiResponse2(response);
};
var deleteExpenseSheetTicket = async (fileId, lineRecId, options) => {
  const context = await ensureExpenseApiContext(options);
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  const query = new URLSearchParams();
  if (Number.isInteger(Number(lineRecId)) && Number(lineRecId) > 0) {
    query.set("lineRecId", String(lineRecId));
  }
  const suffix = query.toString();
  const url = suffix ? `/api/crm/expensesheets/tickets/${safeFileId}?${suffix}` : `/api/crm/expensesheets/tickets/${safeFileId}`;
  const response = await fetchJson(url, {
    ...options,
    method: "DELETE",
    headers: buildExpenseHeaders(context, options)
  });
  return normalizeApiResponse2(response);
};
var applyExpenseSheetTicketIa = async (fileId, payload, options) => {
  const context = await ensureExpenseApiContext(options);
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  const rawPayload = payload || {};
  const safePayload = {
    ...rawPayload
  };
  const normalizedTransDate = normalizeOptionalApiDate2(rawPayload.transDate);
  if (!normalizedTransDate) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }
  safePayload.transDate = normalizedTransDate;
  const gastoType = normalizeOptionalTicketGastoType2(rawPayload.gastoType);
  if (gastoType === void 0) {
    delete safePayload.gastoType;
  } else {
    safePayload.gastoType = gastoType;
  }
  const response = await fetchJson(`/api/crm/expensesheets/tickets/${safeFileId}/ia`, {
    ...options,
    method: "POST",
    headers: buildExpenseHeaders(context, options, true),
    body: JSON.stringify(safePayload)
  });
  return normalizeApiResponse2(response);
};
var updateExpenseSheetTicketLine = async (fileId, lineRecId, payload, options) => {
  if (!safeText3(payload?.description) || !isPositiveNumber2(payload?.qty) || !isPositiveNumber2(payload?.price)) {
    throw new ApiFetchError("description, qty > 0 and price > 0 are required.");
  }
  const context = await ensureExpenseApiContext(options);
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  const safeLineId = encodeURIComponent(String(lineRecId || "").trim());
  const response = await fetchJson(
    `/api/crm/expensesheets/tickets/${safeFileId}/lines/${safeLineId}`,
    {
      ...options,
      method: "PUT",
      headers: buildExpenseHeaders(context, options, true),
      body: JSON.stringify(payload)
    }
  );
  return normalizeApiResponse2(response);
};
var deleteExpenseSheetTicketLine = async (fileId, lineRecId, options) => {
  const context = await ensureExpenseApiContext(options);
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  const safeLineId = encodeURIComponent(String(lineRecId || "").trim());
  const response = await fetchJson(
    `/api/crm/expensesheets/tickets/${safeFileId}/lines/${safeLineId}`,
    {
      ...options,
      method: "DELETE",
      headers: buildExpenseHeaders(context, options)
    }
  );
  return normalizeApiResponse2(response);
};
var uploadExpenseSheetTicketFile = async (fileId, file, extension, options) => {
  const context = await ensureExpenseApiContext(options);
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  const safeExtension = safeText3(extension).replace(/^\./, "");
  const query = new URLSearchParams();
  if (safeExtension) {
    query.set("extension", safeExtension);
  }
  const suffix = query.toString();
  const url = suffix ? `/api/crm/expensesheets/tickets/${safeFileId}/file?${suffix}` : `/api/crm/expensesheets/tickets/${safeFileId}/file`;
  const form = new FormData();
  if (file instanceof File) {
    form.append("file", file, safeText3(file.name) || `ticket.${safeExtension || "jpg"}`);
  } else {
    form.append("file", file, `ticket.${safeExtension || "jpg"}`);
  }
  const response = await fetchJson(url, {
    ...options,
    method: "POST",
    headers: buildExpenseFormHeaders(context, options),
    body: form
  });
  return normalizeApiResponse2(response);
};
var deleteExpenseSheetTicketFile = async (fileId, options) => {
  const context = await ensureExpenseApiContext(options);
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  const response = await fetchJson(`/api/crm/expensesheets/tickets/${safeFileId}/file`, {
    ...options,
    method: "DELETE",
    headers: buildExpenseHeaders(context, options)
  });
  return normalizeApiResponse2(response);
};
var fetchExpenseProjects = async (term, page, pageSize, options) => {
  const safeTerm = encodeURIComponent(String(term || ""));
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const safePageSize = Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : 20;
  return fetchJson(
    `/Gastos/GetProjectsForDropdown?term=${safeTerm}&page=${safePage}&pageSize=${safePageSize}`,
    {
      method: "GET",
      ...options
    }
  );
};

// Web/wwwroot/react/src/pages/gastos/utils/expenseUiUtils.ts
var BASQUE_MONTHS_SHORT = [
  "urt",
  "ots",
  "mar",
  "api",
  "mai",
  "eka",
  "uzt",
  "abu",
  "ira",
  "urr",
  "aza",
  "abe"
];
var normalizeUiLocale = (locale) => {
  const value = String(locale || "").trim();
  if (!value) return "es-ES";
  if (/^zh-hans/i.test(value)) return "zh-CN";
  return value;
};
var isBasqueLocale = (locale) => /^eu\b/i.test(String(locale || ""));
var safeText4 = (value) => {
  if (value === null || value === void 0) return "";
  return String(value).trim();
};
var normalizeCardTitleText = (value, fallback = "-") => {
  const source = safeText4(value);
  if (!source) return fallback;
  const hasLetters = /[A-Za-zÀ-ÖØ-öø-ÿ]/.test(source);
  if (!hasLetters) return source;
  const isAllUpper = source === source.toUpperCase() && source !== source.toLowerCase();
  const isAllLower = source === source.toLowerCase() && source !== source.toUpperCase();
  if (!isAllUpper && !isAllLower) {
    return source;
  }
  const lower = source.toLowerCase();
  return `${lower.charAt(0).toUpperCase()}${lower.slice(1)}`;
};
var hasAssignedVoucher = (value) => {
  const voucher = safeText4(value).toUpperCase();
  if (!voucher) return false;
  return voucher !== "-" && voucher !== "." && voucher !== "0";
};
var startOfDay = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
var toIsoDate = (date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};
var buildExpenseDate = (year, month, day) => {
  const candidate = new Date(year, month - 1, day);
  if (Number.isNaN(candidate.getTime()) || candidate.getFullYear() !== year || candidate.getMonth() !== month - 1 || candidate.getDate() !== day) {
    return null;
  }
  return candidate;
};
var parseExpenseDate = (raw, options) => {
  if (!raw) return null;
  const value = String(raw).trim();
  if (!value) return null;
  const dateOnly = value.split("T")[0].split(" ")[0];
  if (options?.preferMonthFirstOnSlash && /^\d{2}\/\d{2}\/\d{4}$/.test(dateOnly)) {
    const [firstPart, secondPart, yearPart] = dateOnly.split(/[./-]/);
    const first = Number(firstPart);
    const second = Number(secondPart);
    const year = Number(yearPart);
    const monthFirstDate = buildExpenseDate(year, first, second);
    if (monthFirstDate) {
      return monthFirstDate;
    }
  }
  return parseExpenseApiDate(value);
};
var formatExpenseDisplayDate = (raw, locale = "es-ES", fallback = "-") => {
  const date = parseExpenseDate(raw);
  if (!date) return fallback;
  const safeLocale = normalizeUiLocale(locale);
  if (isBasqueLocale(safeLocale)) {
    return `${date.getDate()} ${BASQUE_MONTHS_SHORT[date.getMonth()]} ${date.getFullYear()}`.toLowerCase();
  }
  return date.toLocaleDateString(safeLocale, {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).replace(/\./g, "").toLowerCase();
};
var formatExpenseDateParts = (raw, locale = "es-ES", options) => {
  const date = parseExpenseDate(raw, options);
  if (!date) {
    return { year: "", month: "", day: "--" };
  }
  return {
    year: String(date.getFullYear()),
    month: date.toLocaleDateString(locale, { month: "short" }).replace(/\./g, "").toUpperCase(),
    day: String(date.getDate()).padStart(2, "0")
  };
};

// Web/wwwroot/react/src/pages/gastos/utils/expenseNavigation.ts
var setExpenseNavigationGuard = (active) => {
  window.__indSetNavigationGuard?.(active);
};
var clearExpenseNavigationGuard = () => {
  window.__indClearNavigationGuard?.();
};
var runGuardedNavigation = (action, options = {}) => {
  const { askConfirmation = false, message } = options;
  if (askConfirmation && typeof window.__indRequestNavigation === "function") {
    window.__indRequestNavigation(action, message);
    return;
  }
  action();
};
var navigateToExpenseUrl = (targetUrl, options = {}) => {
  const safeUrl = String(targetUrl || "").trim();
  if (!safeUrl) return;
  const { bypassGuardOnce = true } = options;
  runGuardedNavigation(() => {
    if (bypassGuardOnce) {
      window.__indBypassNavigationGuardOnce?.();
    }
    window.location.href = safeUrl;
  }, options);
};

export {
  parseExpenseNumericInput,
  formatExpenseNumber,
  formatExpenseInputNumber,
  formatAmountWithCurrency,
  EXPENSE_API_DATE_FORMAT_MESSAGE,
  toExpenseApiDdMmYyyy,
  configureExpenseApiAuth,
  mapExpenseSheetListItemToCard2 as mapExpenseSheetListItemToCard,
  mapExpenseSheetHeader2 as mapExpenseSheetHeader,
  mapExpenseSheetLine2 as mapExpenseSheetLine,
  fetchExpenseSheetList,
  fetchExpenseSheetDetail,
  getExpenseSheetCurrencies,
  getExpenseSheetDefaultCurrencyCode,
  getExchangeRate,
  getFuelPriceKm,
  createExpenseSheet,
  updateExpenseSheetHeader,
  deleteExpenseSheet,
  updateExpenseSheetLine,
  deleteExpenseSheetLine,
  extractExpenseFromTicketDraft,
  createExpenseSheetTicket,
  fetchExpenseSheetTicketsList,
  fetchExpenseSheetTicket,
  fetchExpenseSheetTicketPreviewBlob,
  updateExpenseSheetTicket,
  deleteExpenseSheetTicket,
  applyExpenseSheetTicketIa,
  updateExpenseSheetTicketLine,
  deleteExpenseSheetTicketLine,
  uploadExpenseSheetTicketFile,
  deleteExpenseSheetTicketFile,
  fetchExpenseProjects,
  safeText4 as safeText,
  normalizeCardTitleText,
  hasAssignedVoucher,
  startOfDay,
  toIsoDate,
  parseExpenseDate,
  formatExpenseDisplayDate,
  formatExpenseDateParts,
  setExpenseNavigationGuard,
  clearExpenseNavigationGuard,
  navigateToExpenseUrl
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZXhwZW5zZUZvcm1hdHRlcnMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZUFwaVRyYW5zZm9ybXMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlQXBpUmVzcG9uc2VOb3JtYWxpemVycy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VBcGlNYXBwZXJzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZUFwaS50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZU5hdmlnYXRpb24udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IEVYUEVOU0VfTlVNQkVSX0xPQ0FMRSA9IFwiZW4tVVNcIjtcblxudHlwZSBFeHBlbnNlTnVtYmVyRm9ybWF0T3B0aW9ucyA9IHtcbiAgbWluaW11bUZyYWN0aW9uRGlnaXRzPzogbnVtYmVyO1xuICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM/OiBudW1iZXI7XG4gIHVzZUdyb3VwaW5nPzogYm9vbGVhbjtcbiAgZmFsbGJhY2s/OiBzdHJpbmc7XG59O1xuXG5jb25zdCBzYW5pdGl6ZU51bWVyaWNUb2tlbiA9ICh2YWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1teXFxkLiwrLV0vZywgXCJcIik7XG59O1xuXG5jb25zdCBpc1Rob3VzYW5kc0dyb3VwZWRJbnRlZ2VyID0gKHZhbHVlOiBzdHJpbmcsIHNlcGFyYXRvcjogXCIsXCIgfCBcIi5cIik6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KHNlcGFyYXRvcik7XG4gIGlmIChwYXJ0cy5sZW5ndGggPD0gMSkgcmV0dXJuIGZhbHNlO1xuICBpZiAocGFydHMuc29tZSgocGFydCkgPT4gIS9eXFxkKyQvLnRlc3QocGFydCkpKSByZXR1cm4gZmFsc2U7XG4gIGlmIChwYXJ0c1swXS5sZW5ndGggPCAxIHx8IHBhcnRzWzBdLmxlbmd0aCA+IDMpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHBhcnRzLnNsaWNlKDEpLmV2ZXJ5KChwYXJ0KSA9PiBwYXJ0Lmxlbmd0aCA9PT0gMyk7XG59O1xuXG4vLyBQYXJzZXMgbnVtZXJpYyBpbnB1dCBzdXBwb3J0aW5nIGJvdGggZ3JvdXBlZCBhbmQgZGVjaW1hbCB2YWx1ZXMuXG5leHBvcnQgY29uc3QgcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0ID0gKHJhdzogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IG51bWJlciB8IG51bGwgPT4ge1xuICBpZiAocmF3ID09PSBudWxsIHx8IHJhdyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbDtcbiAgaWYgKHR5cGVvZiByYXcgPT09IFwibnVtYmVyXCIpIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocmF3KSA/IHJhdyA6IG51bGw7XG5cbiAgbGV0IHZhbHVlID0gc2FuaXRpemVOdW1lcmljVG9rZW4oU3RyaW5nKHJhdyB8fCBcIlwiKS50cmltKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSk7XG4gIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xuXG4gIGxldCBzaWduID0gXCJcIjtcbiAgaWYgKHZhbHVlLnN0YXJ0c1dpdGgoXCItXCIpKSB7XG4gICAgc2lnbiA9IFwiLVwiO1xuICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMSk7XG4gIH0gZWxzZSBpZiAodmFsdWUuc3RhcnRzV2l0aChcIitcIikpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDEpO1xuICB9XG5cbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bKy1dL2csIFwiXCIpO1xuICBpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBoYXNDb21tYSA9IHZhbHVlLmluY2x1ZGVzKFwiLFwiKTtcbiAgY29uc3QgaGFzRG90ID0gdmFsdWUuaW5jbHVkZXMoXCIuXCIpO1xuXG4gIGlmIChoYXNDb21tYSAmJiAhaGFzRG90ICYmIGlzVGhvdXNhbmRzR3JvdXBlZEludGVnZXIodmFsdWUsIFwiLFwiKSkge1xuICAgIGNvbnN0IHBhcnNlZEludGVnZXIgPSBOdW1iZXIoYCR7c2lnbn0ke3ZhbHVlLnJlcGxhY2UoLywvZywgXCJcIil9YCk7XG4gICAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWRJbnRlZ2VyKSA/IHBhcnNlZEludGVnZXIgOiBudWxsO1xuICB9XG5cbiAgaWYgKGhhc0RvdCAmJiAhaGFzQ29tbWEgJiYgaXNUaG91c2FuZHNHcm91cGVkSW50ZWdlcih2YWx1ZSwgXCIuXCIpKSB7XG4gICAgY29uc3QgcGFyc2VkSW50ZWdlciA9IE51bWJlcihgJHtzaWdufSR7dmFsdWUucmVwbGFjZSgvXFwuL2csIFwiXCIpfWApO1xuICAgIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkSW50ZWdlcikgPyBwYXJzZWRJbnRlZ2VyIDogbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGxhc3RDb21tYSA9IHZhbHVlLmxhc3RJbmRleE9mKFwiLFwiKTtcbiAgY29uc3QgbGFzdERvdCA9IHZhbHVlLmxhc3RJbmRleE9mKFwiLlwiKTtcbiAgY29uc3QgZGVjaW1hbFNlcGFyYXRvckluZGV4ID0gTWF0aC5tYXgobGFzdENvbW1hLCBsYXN0RG90KTtcblxuICBsZXQgbm9ybWFsaXplZDogc3RyaW5nO1xuICBpZiAoZGVjaW1hbFNlcGFyYXRvckluZGV4ID49IDApIHtcbiAgICBjb25zdCBpbnRlZ2VyUGFydCA9IHZhbHVlLnNsaWNlKDAsIGRlY2ltYWxTZXBhcmF0b3JJbmRleCkucmVwbGFjZSgvWy4sXS9nLCBcIlwiKTtcbiAgICBjb25zdCBkZWNpbWFsUGFydCA9IHZhbHVlLnNsaWNlKGRlY2ltYWxTZXBhcmF0b3JJbmRleCArIDEpLnJlcGxhY2UoL1suLF0vZywgXCJcIik7XG4gICAgbm9ybWFsaXplZCA9IGAke3NpZ259JHtpbnRlZ2VyUGFydCB8fCBcIjBcIn0ke2RlY2ltYWxQYXJ0ID8gYC4ke2RlY2ltYWxQYXJ0fWAgOiBcIlwifWA7XG4gIH0gZWxzZSB7XG4gICAgbm9ybWFsaXplZCA9IGAke3NpZ259JHt2YWx1ZS5yZXBsYWNlKC9bLixdL2csIFwiXCIpfWA7XG4gIH1cblxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIobm9ybWFsaXplZCk7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSA/IHBhcnNlZCA6IG51bGw7XG59O1xuXG4vLyBGb3JtYXRzIG51bWVyaWMgdmFsdWVzIHdpdGggdGhlIGZpeGVkIGV4cGVuc2UgdmlzdWFsIGNvbnRyYWN0OiAjLCMjMC4wMFxuZXhwb3J0IGNvbnN0IGZvcm1hdEV4cGVuc2VOdW1iZXIgPSAoXG4gIHZhbHVlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkLFxuICBvcHRpb25zPzogRXhwZW5zZU51bWJlckZvcm1hdE9wdGlvbnNcbik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGZhbGxiYWNrID0gb3B0aW9ucz8uZmFsbGJhY2sgPz8gXCItXCI7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IE51bWJlci5pc05hTihOdW1iZXIodmFsdWUpKSkge1xuICAgIHJldHVybiBmYWxsYmFjaztcbiAgfVxuXG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoRVhQRU5TRV9OVU1CRVJfTE9DQUxFLCB7XG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBvcHRpb25zPy5taW5pbXVtRnJhY3Rpb25EaWdpdHMgPz8gMixcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IG9wdGlvbnM/Lm1heGltdW1GcmFjdGlvbkRpZ2l0cyA/PyAyLFxuICAgIHVzZUdyb3VwaW5nOiBvcHRpb25zPy51c2VHcm91cGluZyA/PyB0cnVlLFxuICB9KS5mb3JtYXQoTnVtYmVyKHZhbHVlKSk7XG59O1xuXG4vLyBQYXJzZXMgYW5kIGZvcm1hdHMgcmF3IGlucHV0IHZhbHVlcyB0byB0aGUgZml4ZWQgZXhwZW5zZSB2aXN1YWwgY29udHJhY3QuXG5leHBvcnQgY29uc3QgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyID0gKFxuICByYXc6IHN0cmluZyB8IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQsXG4gIG9wdGlvbnM/OiBFeHBlbnNlTnVtYmVyRm9ybWF0T3B0aW9uc1xuKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KHJhdyk7XG4gIGlmIChwYXJzZWQgPT09IG51bGwpIHtcbiAgICByZXR1cm4gb3B0aW9ucz8uZmFsbGJhY2sgPz8gXCJcIjtcbiAgfVxuXG4gIHJldHVybiBmb3JtYXRFeHBlbnNlTnVtYmVyKHBhcnNlZCwge1xuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogb3B0aW9ucz8ubWluaW11bUZyYWN0aW9uRGlnaXRzID8/IDIsXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBvcHRpb25zPy5tYXhpbXVtRnJhY3Rpb25EaWdpdHMgPz8gMixcbiAgICB1c2VHcm91cGluZzogb3B0aW9ucz8udXNlR3JvdXBpbmcgPz8gdHJ1ZSxcbiAgICBmYWxsYmFjazogb3B0aW9ucz8uZmFsbGJhY2sgPz8gXCJcIixcbiAgfSk7XG59O1xuIiwgIlx1RkVGRmltcG9ydCB7IGZvcm1hdEV4cGVuc2VOdW1iZXIgfSBmcm9tIFwiLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XG5cbmNvbnN0IENVUlJFTkNZX1NZTUJPTF9NQVA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIFVTRDogXCIkXCIsXG4gIEVVUjogXCJcXHUyMGFjXCIsXG4gIEdCUDogXCJcXHUwMGEzXCIsXG4gIE1YTjogXCJNWCRcIixcbiAgQk9COiBcIkJzXCIsXG4gIFBFTjogXCJTL1wiLFxuICBCUkw6IFwiUiRcIixcbiAgQ09QOiBcIiRcIixcbiAgQ0xQOiBcIiRcIixcbiAgQVJTOiBcIiRcIixcbn07XG5cbmNvbnN0IGhhc0FscGhhYmV0aWNDdXJyZW5jeUNvZGUgPSAodmFsdWU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gL1tBLVphLXpdezN9Ly50ZXN0KHZhbHVlKTtcbn07XG5cbi8vIEZvcm1hdHMgYSBudW1lcmljIGFtb3VudCB3aXRoIGZpeGVkIFVJIG51bWJlciBzdHlsZSBhbmQgb3B0aW9uYWwgY3VycmVuY3kgY29kZS5cbmV4cG9ydCBjb25zdCBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kgPSAoXG4gIGFtb3VudDogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCxcbiAgY3VycmVuY3lDb2RlPzogc3RyaW5nLFxuICBfbG9jYWxlPzogc3RyaW5nXG4pOiBzdHJpbmcgPT4ge1xuICBpZiAoYW1vdW50ID09PSBudWxsIHx8IGFtb3VudCA9PT0gdW5kZWZpbmVkIHx8IE51bWJlci5pc05hTihOdW1iZXIoYW1vdW50KSkpIHtcbiAgICByZXR1cm4gXCItXCI7XG4gIH1cblxuICBjb25zdCBzYWZlQ3VycmVuY3kgPSBTdHJpbmcoY3VycmVuY3lDb2RlIHx8IFwiXCIpLnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBkZWNpbWFsVGV4dCA9IGZvcm1hdEV4cGVuc2VOdW1iZXIoYW1vdW50LCB7XG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICBmYWxsYmFjazogXCItXCIsXG4gIH0pO1xuXG4gIGlmIChzYWZlQ3VycmVuY3kpIHtcbiAgICBjb25zdCBtYXBwZWRTeW1ib2wgPSBDVVJSRU5DWV9TWU1CT0xfTUFQW3NhZmVDdXJyZW5jeV07XG4gICAgaWYgKG1hcHBlZFN5bWJvbCkge1xuICAgICAgcmV0dXJuIGAke21hcHBlZFN5bWJvbH0ke2RlY2ltYWxUZXh0fWA7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGZvcm1hdHRlZCA9IG5ldyBJbnRsLk51bWJlckZvcm1hdChcImVuLVVTXCIsIHtcbiAgICAgICAgc3R5bGU6IFwiY3VycmVuY3lcIixcbiAgICAgICAgY3VycmVuY3k6IHNhZmVDdXJyZW5jeSxcbiAgICAgICAgY3VycmVuY3lEaXNwbGF5OiBcInN5bWJvbFwiLFxuICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICAgIH0pLmZvcm1hdChhbW91bnQpO1xuXG4gICAgICBpZiAoIWhhc0FscGhhYmV0aWNDdXJyZW5jeUNvZGUoZm9ybWF0dGVkKSkge1xuICAgICAgICByZXR1cm4gZm9ybWF0dGVkO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gRmFsbCBiYWNrIHRvIGRlY2ltYWwgKyBjb2RlIHdoZW4gY3VycmVuY3kgY29kZSBpcyBpbnZhbGlkLlxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzYWZlQ3VycmVuY3kgPyBgJHtkZWNpbWFsVGV4dH0gJHtzYWZlQ3VycmVuY3l9YCA6IGRlY2ltYWxUZXh0O1xufTtcclxuIiwgImNvbnN0IERETU1ZWVlZX0NPTVBBQ1RfUkVHRVggPSAvXlxcZHs4fSQvO1xuY29uc3QgRERNTVlZWVlfRE9UVEVEX1JFR0VYID0gL15cXGR7Mn1cXC5cXGR7Mn1cXC5cXGR7NH0kLztcbmNvbnN0IERBVEVfT05MWV9ETVlfUkVHRVggPSAvXlxcZHsyfVsuLy1dXFxkezJ9Wy4vLV1cXGR7NH0kLztcbmNvbnN0IERBVEVfT05MWV9ZTURfUkVHRVggPSAvXlxcZHs0fVsuLy1dXFxkezJ9Wy4vLV1cXGR7Mn0kLztcblxuZXhwb3J0IGNvbnN0IEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UgPSBcIkZvcm1hdG8gcmVxdWVyaWRvOiBERE1NWVlZWSBvIERELk1NLllZWVlcIjtcblxuY29uc3Qgc2FmZVRleHQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XG4gIHJldHVybiBTdHJpbmcodmFsdWUpLnRyaW0oKTtcbn07XG5cbmNvbnN0IGJ1aWxkRGF0ZSA9ICh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKTogRGF0ZSB8IG51bGwgPT4ge1xuICBpZiAoIU51bWJlci5pc0ludGVnZXIoeWVhcikgfHwgIU51bWJlci5pc0ludGVnZXIobW9udGgpIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKGRheSkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAobW9udGggPCAxIHx8IG1vbnRoID4gMTIgfHwgZGF5IDwgMSB8fCBkYXkgPiAzMSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgY2FuZGlkYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xuICBpZiAoXG4gICAgY2FuZGlkYXRlLmdldEZ1bGxZZWFyKCkgIT09IHllYXIgfHxcbiAgICBjYW5kaWRhdGUuZ2V0TW9udGgoKSAhPT0gbW9udGggLSAxIHx8XG4gICAgY2FuZGlkYXRlLmdldERhdGUoKSAhPT0gZGF5XG4gICkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIGNhbmRpZGF0ZTtcbn07XG5cbmNvbnN0IHRvRGRNbVl5eXlDb21wYWN0ID0gKGRhdGU6IERhdGUpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBkYXkgPSBTdHJpbmcoZGF0ZS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgY29uc3QgbW9udGggPSBTdHJpbmcoZGF0ZS5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICBjb25zdCB5ZWFyID0gU3RyaW5nKGRhdGUuZ2V0RnVsbFllYXIoKSk7XG4gIHJldHVybiBgJHtkYXl9JHttb250aH0ke3llYXJ9YDtcbn07XG5cbmNvbnN0IHRvRGRNbVl5eXlEb3R0ZWQgPSAoZGF0ZTogRGF0ZSk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGRheSA9IFN0cmluZyhkYXRlLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICBjb25zdCBtb250aCA9IFN0cmluZyhkYXRlLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIGNvbnN0IHllYXIgPSBTdHJpbmcoZGF0ZS5nZXRGdWxsWWVhcigpKTtcbiAgcmV0dXJuIGAke2RheX0uJHttb250aH0uJHt5ZWFyfWA7XG59O1xuXG4vLyBQYXJzZXMgZGF0ZSBpbnB1dHMgdXNlZCBieSBmcm9udGVuZC9VSSBhbmQgYmFja2VuZCBjb250cmFjdHMuXG5leHBvcnQgY29uc3QgcGFyc2VFeHBlbnNlQXBpRGF0ZSA9IChyYXc6IHVua25vd24pOiBEYXRlIHwgbnVsbCA9PiB7XG4gIGlmIChyYXcgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgcmV0dXJuIE51bWJlci5pc05hTihyYXcuZ2V0VGltZSgpKSA/IG51bGwgOiByYXc7XG4gIH1cblxuICBjb25zdCB2YWx1ZSA9IHNhZmVUZXh0KHJhdyk7XG4gIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGRhdGVPbmx5ID0gdmFsdWUuc3BsaXQoXCJUXCIpWzBdLnNwbGl0KFwiIFwiKVswXTtcblxuICBpZiAoRERNTVlZWVlfQ09NUEFDVF9SRUdFWC50ZXN0KGRhdGVPbmx5KSkge1xuICAgIGNvbnN0IGRkID0gTnVtYmVyKGRhdGVPbmx5LnNsaWNlKDAsIDIpKTtcbiAgICBjb25zdCBtbSA9IE51bWJlcihkYXRlT25seS5zbGljZSgyLCA0KSk7XG4gICAgY29uc3QgeXl5eSA9IE51bWJlcihkYXRlT25seS5zbGljZSg0LCA4KSk7XG4gICAgY29uc3QgZGRtbXl5eXkgPSBidWlsZERhdGUoeXl5eSwgbW0sIGRkKTtcbiAgICBpZiAoZGRtbXl5eXkpIHtcbiAgICAgIHJldHVybiBkZG1teXl5eTtcbiAgICB9XG5cbiAgICAvLyBLZWVwIGxlZ2FjeSBjb21wYXRpYmlsaXR5IGZvciBjYWNoZWQvc3RhbGUgeXl5eU1NZGQgdmFsdWVzLlxuICAgIGNvbnN0IGxlZ2FjeVllYXIgPSBOdW1iZXIoZGF0ZU9ubHkuc2xpY2UoMCwgNCkpO1xuICAgIGNvbnN0IGxlZ2FjeU1vbnRoID0gTnVtYmVyKGRhdGVPbmx5LnNsaWNlKDQsIDYpKTtcbiAgICBjb25zdCBsZWdhY3lEYXkgPSBOdW1iZXIoZGF0ZU9ubHkuc2xpY2UoNiwgOCkpO1xuICAgIHJldHVybiBidWlsZERhdGUobGVnYWN5WWVhciwgbGVnYWN5TW9udGgsIGxlZ2FjeURheSk7XG4gIH1cblxuICBpZiAoREFURV9PTkxZX0RNWV9SRUdFWC50ZXN0KGRhdGVPbmx5KSkge1xuICAgIGNvbnN0IFtkYXlUZXh0LCBtb250aFRleHQsIHllYXJUZXh0XSA9IGRhdGVPbmx5LnNwbGl0KC9bLi8tXS8pO1xuICAgIHJldHVybiBidWlsZERhdGUoTnVtYmVyKHllYXJUZXh0KSwgTnVtYmVyKG1vbnRoVGV4dCksIE51bWJlcihkYXlUZXh0KSk7XG4gIH1cblxuICBpZiAoREFURV9PTkxZX1lNRF9SRUdFWC50ZXN0KGRhdGVPbmx5KSkge1xuICAgIGNvbnN0IFt5ZWFyVGV4dCwgbW9udGhUZXh0LCBkYXlUZXh0XSA9IGRhdGVPbmx5LnNwbGl0KC9bLi8tXS8pO1xuICAgIHJldHVybiBidWlsZERhdGUoTnVtYmVyKHllYXJUZXh0KSwgTnVtYmVyKG1vbnRoVGV4dCksIE51bWJlcihkYXlUZXh0KSk7XG4gIH1cblxuICBjb25zdCBwYXJzZWQgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gIHJldHVybiBOdW1iZXIuaXNOYU4ocGFyc2VkLmdldFRpbWUoKSkgPyBudWxsIDogcGFyc2VkO1xufTtcblxuLy8gQ29udmVydHMgdW5rbm93biBkYXRlIGlucHV0IGludG8gc3RyaWN0IERELk1NLllZWVkgdXNlZCBieSBiYWNrZW5kIGNvbnRyYWN0cy5cbmV4cG9ydCBjb25zdCB0b0V4cGVuc2VBcGlEYXRlID0gKHJhdzogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlRXhwZW5zZUFwaURhdGUocmF3KTtcbiAgaWYgKCFwYXJzZWQpIHJldHVybiBcIlwiO1xuICByZXR1cm4gdG9EZE1tWXl5eURvdHRlZChwYXJzZWQpO1xufTtcblxuLy8gQmFja3dhcmQtY29tcGF0aWJsZSBhbGlhcyBrZXB0IHRvIGF2b2lkIGJyb2FkIHJlbmFtZXMgaW4gZXhpc3RpbmcgbW9kdWxlcy5cbmV4cG9ydCBjb25zdCB0b0V4cGVuc2VBcGlEZE1tWXl5eSA9IChyYXc6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gdG9FeHBlbnNlQXBpRGF0ZShyYXcpO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzRXhwZW5zZUFwaURkTW1ZeXl5ID0gKHJhdzogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xuICBjb25zdCB2YWx1ZSA9IHNhZmVUZXh0KHJhdyk7XG4gIGNvbnN0IGlzQ29tcGFjdCA9IERETU1ZWVlZX0NPTVBBQ1RfUkVHRVgudGVzdCh2YWx1ZSk7XG4gIGNvbnN0IGlzRG90dGVkID0gRERNTVlZWVlfRE9UVEVEX1JFR0VYLnRlc3QodmFsdWUpO1xuICBpZiAoIWlzQ29tcGFjdCAmJiAhaXNEb3R0ZWQpIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBwYXJzZWQgPSBwYXJzZUV4cGVuc2VBcGlEYXRlKHZhbHVlKTtcbiAgaWYgKCFwYXJzZWQpIHJldHVybiBmYWxzZTtcblxuICBpZiAoaXNDb21wYWN0KSByZXR1cm4gdG9EZE1tWXl5eUNvbXBhY3QocGFyc2VkKSA9PT0gdmFsdWU7XG4gIHJldHVybiB0b0RkTW1ZeXl5RG90dGVkKHBhcnNlZCkgPT09IHZhbHVlO1xufTtcblxuZXhwb3J0IGNvbnN0IHRvRXhwZW5zZUlzb0RhdGUgPSAocmF3OiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VFeHBlbnNlQXBpRGF0ZShyYXcpO1xuICBpZiAoIXBhcnNlZCkgcmV0dXJuIFwiXCI7XG5cbiAgY29uc3QgeWVhciA9IFN0cmluZyhwYXJzZWQuZ2V0RnVsbFllYXIoKSk7XG4gIGNvbnN0IG1vbnRoID0gU3RyaW5nKHBhcnNlZC5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICBjb25zdCBkYXkgPSBTdHJpbmcocGFyc2VkLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpO1xuICByZXR1cm4gYCR7eWVhcn0tJHttb250aH0tJHtkYXl9YDtcbn07XG4iLCAiXHVGRUZGaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VHYXN0b1R5cGVDb2RlLCBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7XG4gIEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UsXG4gIGlzRXhwZW5zZUFwaURkTW1ZeXl5LFxuICB0b0V4cGVuc2VBcGlEZE1tWXl5eSxcbn0gZnJvbSBcIi4vZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xuXG5jb25zdCBBTExPV0VEX0dBU1RPX1RZUEVfQ09ERVMgPSBuZXcgU2V0PG51bWJlcj4oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XG5cbi8vIENvbnZlcnRzIHVua25vd24gdmFsdWVzIHRvIHRyaW1tZWQgdGV4dC5cbmV4cG9ydCBjb25zdCBzYWZlVGV4dCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJcIjtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSkudHJpbSgpO1xufTtcblxuLy8gQ29udmVydHMgdW5rbm93biB2YWx1ZXMgdG8gbnVsbGFibGUgZmluaXRlIG51bWJlcnMuXG5leHBvcnQgY29uc3QgdG9OdWxsYWJsZU51bWJlciA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSA/IHBhcnNlZCA6IG51bGw7XG59O1xuXG5leHBvcnQgY29uc3QgaXNOb25OZWdhdGl2ZU51bWJlciA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBwYXJzZWQgPSB0b051bGxhYmxlTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIHBhcnNlZCAhPT0gbnVsbCAmJiBwYXJzZWQgPj0gMDtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1Bvc2l0aXZlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHRvTnVsbGFibGVOdW1iZXIodmFsdWUpO1xuICByZXR1cm4gcGFyc2VkICE9PSBudWxsICYmIHBhcnNlZCA+IDA7XG59O1xuXG5jb25zdCBpc1ZhbGlkTGlzdEV4cGVuc2VTaGVldFN0YXR1cyA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBwYXJzZWQgPSB0b051bGxhYmxlTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIHBhcnNlZCAhPT0gbnVsbCAmJiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgJiYgcGFyc2VkID49IDAgJiYgcGFyc2VkIDw9IDQ7XG59O1xuXG5leHBvcnQgY29uc3QgdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGUgPSAodmFsdWU6IHVua25vd24pOiAwIHwgMSB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJzZWQgPSB0b051bGxhYmxlTnVtYmVyKHZhbHVlKTtcbiAgaWYgKHBhcnNlZCA9PT0gMCB8fCBwYXJzZWQgPT09IDEpIHtcbiAgICByZXR1cm4gcGFyc2VkO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5leHBvcnQgY29uc3QgdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlR2FzdG9UeXBlQ29kZSB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJzZWQgPSB0b051bGxhYmxlTnVtYmVyKHZhbHVlKTtcbiAgaWYgKHBhcnNlZCA9PT0gbnVsbCB8fCAhTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpIHx8ICFBTExPV0VEX0dBU1RPX1RZUEVfQ09ERVMuaGFzKHBhcnNlZCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBwYXJzZWQgYXMgRXhwZW5zZUdhc3RvVHlwZUNvZGU7XG59O1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlR2FzdG9UeXBlQ29kZSB8IHVuZGVmaW5lZCA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHNhZmVUZXh0KHZhbHVlKSA9PT0gXCJcIikge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBwYXJzZWQgPSB0b051bGxhYmxlR2FzdG9UeXBlQ29kZSh2YWx1ZSk7XG4gIGlmIChwYXJzZWQgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImdhc3RvVHlwZSBtdXN0IGJlIG9uZSBvZjogMCwxLDIsMyw0LDUsNiw3LDgsMTQuXCIpO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVUaWNrZXRMaXN0R2FzdG9UeXBlID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3RbXCJnYXN0b1R5cGVcIl0gPT4ge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCBzYWZlVGV4dCh2YWx1ZSkgPT09IFwiXCIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiB0b051bGxhYmxlR2FzdG9UeXBlQ29kZSh2YWx1ZSk7XG59O1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRTdGF0dXMgPSAodmFsdWU6IHVua25vd24pOiAwIHwgMSB8IG51bGwgPT4ge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCBzYWZlVGV4dCh2YWx1ZSkgPT09IFwiXCIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZSh2YWx1ZSk7XG59O1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdERhdGUgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBjb25zdCByYXcgPSBzYWZlVGV4dCh2YWx1ZSk7XG4gIGlmICghcmF3KSByZXR1cm4gXCJcIjtcblxuICByZXR1cm4gdG9FeHBlbnNlQXBpRGRNbVl5eXkocmF3KTtcbn07XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVPcHRpb25hbEFwaURhdGUgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuICBjb25zdCByYXcgPSBzYWZlVGV4dCh2YWx1ZSk7XG4gIGlmICghcmF3KSByZXR1cm4gdW5kZWZpbmVkO1xuXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSB0b0V4cGVuc2VBcGlEZE1tWXl5eShyYXcpO1xuICByZXR1cm4gbm9ybWFsaXplZCB8fCB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZSh2YWx1ZSk7XG4gIGlmICghbm9ybWFsaXplZCkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xuICB9XG4gIHJldHVybiBub3JtYWxpemVkO1xufTtcblxuZXhwb3J0IGNvbnN0IHZhbGlkYXRlQXBpRGRNbVl5eXlPclRocm93ID0gKHZhbHVlOiB1bmtub3duKTogdm9pZCA9PiB7XG4gIGlmICghaXNFeHBlbnNlQXBpRGRNbVl5eXkodmFsdWUpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCB0b051bGxhYmxlQm9vbCA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gfCBudWxsID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIikgcmV0dXJuIHZhbHVlO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IHZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChub3JtYWxpemVkID09PSBcInRydWVcIiB8fCBub3JtYWxpemVkID09PSBcIjFcIikgcmV0dXJuIHRydWU7XG4gICAgaWYgKG5vcm1hbGl6ZWQgPT09IFwiZmFsc2VcIiB8fCBub3JtYWxpemVkID09PSBcIjBcIikgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICBpZiAodmFsdWUgPT09IDEpIHJldHVybiB0cnVlO1xuICAgIGlmICh2YWx1ZSA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSSA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gfCBudWxsID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgc2FmZVRleHQodmFsdWUpID09PSBcIlwiKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gdG9OdWxsYWJsZUJvb2wodmFsdWUpO1xufTtcblxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcbiAgcmV0dXJuIGlzVmFsaWRMaXN0RXhwZW5zZVNoZWV0U3RhdHVzKHZhbHVlKSA/IE51bWJlcih2YWx1ZSkgOiBudWxsO1xufTtcblxuZXhwb3J0IGNvbnN0IHRvRmxhZ0Jvb2wgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuIHwgbnVsbCA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRCb29sID0gdG9OdWxsYWJsZUJvb2wodmFsdWUpO1xuICBpZiAobm9ybWFsaXplZEJvb2wgIT09IG51bGwpIHJldHVybiBub3JtYWxpemVkQm9vbDtcblxuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSByZXR1cm4gbnVsbDtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IHZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBudWxsO1xuICBpZiAobm9ybWFsaXplZCA9PT0gXCJvblwiIHx8IG5vcm1hbGl6ZWQgPT09IFwieWVzXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJ5XCIpIHJldHVybiB0cnVlO1xuICBpZiAobm9ybWFsaXplZCA9PT0gXCJvZmZcIiB8fCBub3JtYWxpemVkID09PSBcIm5vXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJuXCIpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIG51bGw7XG59O1xuIiwgIlx1RkVGRmltcG9ydCB0eXBlIHtcbiAgRXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8sXG4gIEV4cGVuc2VTaGVldERldGFpbER0byxcbiAgRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG8sXG4gIEV4cGVuc2VTaGVldFRpY2tldERldGFpbER0byxcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8sXG4gIEV4cGVuc2VTaGVldExpc3RJdGVtRHRvLFxuICBJbmRBcGlSZXNwb25zZSxcbiAgSW5kUGFnZWRSZXNwb25zZSxcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgc2FmZVRleHQsIHRvTnVsbGFibGVCb29sLCB0b051bGxhYmxlR2FzdG9UeXBlQ29kZSwgdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGUgfSBmcm9tIFwiLi9leHBlbnNlQXBpVHJhbnNmb3Jtcy50c1wiO1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UgPSAoXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldExpc3RJdGVtRHRvPlxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz4gPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLnJlc3BvbnNlLFxuICAgIEl0ZW1zOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UgPSAoXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldERldGFpbER0bz5cbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0RGV0YWlsRHRvPiA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4ucmVzcG9uc2UsXG4gICAgSXRlbXM6IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW10sXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplQXBpUmVzcG9uc2UgPSA8VD4ocmVzcG9uc2U6IEluZEFwaVJlc3BvbnNlPFQ+KTogSW5kQXBpUmVzcG9uc2U8VD4gPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLnJlc3BvbnNlLFxuICAgIEVycm9yczogQXJyYXkuaXNBcnJheShyZXNwb25zZT8uRXJyb3JzKSA/IHJlc3BvbnNlLkVycm9ycyA6IHJlc3BvbnNlPy5FcnJvcnMgPz8gbnVsbCxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2UgPSAoXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPlxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4gPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLnJlc3BvbnNlLFxuICAgIEl0ZW1zOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVN1Ym9yZGluYXRlc1BhZ2VkUmVzcG9uc2UgPSAoXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvPlxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0bz4gPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLnJlc3BvbnNlLFxuICAgIEl0ZW1zOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz5cbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8+ID0+IHtcbiAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgLi4uaXRlbSxcbiAgICBTdGF0dXM6IHRvTnVsbGFibGVUaWNrZXRTdGF0dXNDb2RlKFxuICAgICAgKGl0ZW0gYXMgeyBTdGF0dXM/OiB1bmtub3duOyBzdGF0dXM/OiB1bmtub3duIH0pPy5TdGF0dXMgPz9cbiAgICAgICAgKGl0ZW0gYXMgeyBTdGF0dXM/OiB1bmtub3duOyBzdGF0dXM/OiB1bmtub3duIH0pPy5zdGF0dXNcbiAgICApLFxuICAgIFByb2Nlc3NlZEJ5QUk6IHRvTnVsbGFibGVCb29sKFxuICAgICAgKGl0ZW0gYXMgeyBQcm9jZXNzZWRCeUFJPzogdW5rbm93bjsgcHJvY2Vzc2VkQnlBST86IHVua25vd24gfSk/LlByb2Nlc3NlZEJ5QUkgPz9cbiAgICAgICAgKGl0ZW0gYXMgeyBQcm9jZXNzZWRCeUFJPzogdW5rbm93bjsgcHJvY2Vzc2VkQnlBST86IHVua25vd24gfSk/LnByb2Nlc3NlZEJ5QUlcbiAgICApLFxuICAgIEhvamFHYXN0b3NJZERpc3BsYXk6IHNhZmVUZXh0KFxuICAgICAgKGl0ZW0gYXMgeyBIb2phR2FzdG9zSWREaXNwbGF5PzogdW5rbm93bjsgaG9qYUdhc3Rvc0lkRGlzcGxheT86IHVua25vd24gfSk/LkhvamFHYXN0b3NJZERpc3BsYXkgPz9cbiAgICAgICAgKGl0ZW0gYXMgeyBIb2phR2FzdG9zSWREaXNwbGF5PzogdW5rbm93bjsgaG9qYUdhc3Rvc0lkRGlzcGxheT86IHVua25vd24gfSk/LmhvamFHYXN0b3NJZERpc3BsYXlcbiAgICApLFxuICAgIEdhc3RvVHlwZTogdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUoXG4gICAgICAoaXRlbSBhcyB7IEdhc3RvVHlwZT86IHVua25vd247IGdhc3RvVHlwZT86IHVua25vd24gfSk/Lkdhc3RvVHlwZSA/P1xuICAgICAgICAoaXRlbSBhcyB7IEdhc3RvVHlwZT86IHVua25vd247IGdhc3RvVHlwZT86IHVua25vd24gfSk/Lmdhc3RvVHlwZVxuICAgICksXG4gIH0pKTtcblxuICByZXR1cm4ge1xuICAgIC4uLnJlc3BvbnNlLFxuICAgIEl0ZW1zOiBub3JtYWxpemVkSXRlbXMsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZSA9IChcbiAgcmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvPlxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXREZXRhaWxEdG8+ID0+IHtcbiAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgLi4uaXRlbSxcbiAgICBTdGF0dXM6IHRvTnVsbGFibGVUaWNrZXRTdGF0dXNDb2RlKFxuICAgICAgKGl0ZW0gYXMgeyBTdGF0dXM/OiB1bmtub3duOyBzdGF0dXM/OiB1bmtub3duIH0pPy5TdGF0dXMgPz9cbiAgICAgICAgKGl0ZW0gYXMgeyBTdGF0dXM/OiB1bmtub3duOyBzdGF0dXM/OiB1bmtub3duIH0pPy5zdGF0dXNcbiAgICApLFxuICAgIFByb2Nlc3NlZEJ5QUk6IHRvTnVsbGFibGVCb29sKFxuICAgICAgKGl0ZW0gYXMgeyBQcm9jZXNzZWRCeUFJPzogdW5rbm93bjsgcHJvY2Vzc2VkQnlBST86IHVua25vd24gfSk/LlByb2Nlc3NlZEJ5QUkgPz9cbiAgICAgICAgKGl0ZW0gYXMgeyBQcm9jZXNzZWRCeUFJPzogdW5rbm93bjsgcHJvY2Vzc2VkQnlBST86IHVua25vd24gfSk/LnByb2Nlc3NlZEJ5QUlcbiAgICApLFxuICAgIEhvamFHYXN0b3NJZERpc3BsYXk6IHNhZmVUZXh0KFxuICAgICAgKGl0ZW0gYXMgeyBIb2phR2FzdG9zSWREaXNwbGF5PzogdW5rbm93bjsgaG9qYUdhc3Rvc0lkRGlzcGxheT86IHVua25vd24gfSk/LkhvamFHYXN0b3NJZERpc3BsYXkgPz9cbiAgICAgICAgKGl0ZW0gYXMgeyBIb2phR2FzdG9zSWREaXNwbGF5PzogdW5rbm93bjsgaG9qYUdhc3Rvc0lkRGlzcGxheT86IHVua25vd24gfSk/LmhvamFHYXN0b3NJZERpc3BsYXlcbiAgICApLFxuICAgIEdhc3RvVHlwZTogdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUoXG4gICAgICAoaXRlbSBhcyB7IEdhc3RvVHlwZT86IHVua25vd247IGdhc3RvVHlwZT86IHVua25vd24gfSk/Lkdhc3RvVHlwZSA/P1xuICAgICAgICAoaXRlbSBhcyB7IEdhc3RvVHlwZT86IHVua25vd247IGdhc3RvVHlwZT86IHVua25vd24gfSk/Lmdhc3RvVHlwZVxuICAgICksXG4gICAgTGluZXM6IEFycmF5LmlzQXJyYXkoaXRlbT8uTGluZXMpID8gaXRlbS5MaW5lcyA6IFtdLFxuICB9KSk7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5yZXNwb25zZSxcbiAgICBJdGVtczogbm9ybWFsaXplZEl0ZW1zLFxuICB9O1xufTtcclxuIiwgIlx1RkVGRmltcG9ydCB0eXBlIHtcbiAgRXhwZW5zZVNoZWV0Q2FyZCxcbiAgRXhwZW5zZVNoZWV0RGV0YWlsRHRvLFxuICBFeHBlbnNlU2hlZXRIZWFkZXIsXG4gIEV4cGVuc2VTaGVldExpbmUsXG4gIEV4cGVuc2VTaGVldExpbmVEdG8sXG4gIEV4cGVuc2VTaGVldExpc3RJdGVtRHRvLFxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCwgdG9OdWxsYWJsZUJvb2wsIHRvTnVsbGFibGVOdW1iZXIgfSBmcm9tIFwiLi9leHBlbnNlQXBpVHJhbnNmb3Jtcy50c1wiO1xuXG50eXBlIEV4cGVuc2VXaW5kb3dSdW50aW1lID0ge1xuICBfX0VYUEVOU0VfR0FTVE9fVFlQRVNfXz86IEFycmF5PHtcbiAgICB2YWx1ZT86IHVua25vd247XG4gICAgVmFsdWU/OiB1bmtub3duO1xuICAgIHRleHQ/OiB1bmtub3duO1xuICAgIFRleHQ/OiB1bmtub3duO1xuICB9Pjtcbn07XG5cbnR5cGUgRXhwZW5zZUdhc3RvVHlwZUVudHJ5ID0gTm9uTnVsbGFibGU8RXhwZW5zZVdpbmRvd1J1bnRpbWVbXCJfX0VYUEVOU0VfR0FTVE9fVFlQRVNfX1wiXT5bbnVtYmVyXTtcblxuY29uc3QgcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lID0gKCk6IEV4cGVuc2VXaW5kb3dSdW50aW1lID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiB7fTtcbiAgcmV0dXJuIHdpbmRvdyBhcyB1bmtub3duIGFzIEV4cGVuc2VXaW5kb3dSdW50aW1lO1xufTtcblxuY29uc3QgcmVzb2x2ZVR5cGVMYWJlbCA9ICh0eXBlVmFsdWVDb2RlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAoIXR5cGVWYWx1ZUNvZGUgfHwgdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB0eXBlVmFsdWVDb2RlO1xuICB9XG5cbiAgY29uc3QgcmF3Q2F0YWxvZ1NvdXJjZSA9IHJlYWRFeHBlbnNlV2luZG93UnVudGltZSgpLl9fRVhQRU5TRV9HQVNUT19UWVBFU19fO1xuICBjb25zdCByYXdDYXRhbG9nID0gQXJyYXkuaXNBcnJheShyYXdDYXRhbG9nU291cmNlKSA/IHJhd0NhdGFsb2dTb3VyY2UgOiBbXTtcbiAgY29uc3QgbWF0Y2ggPSByYXdDYXRhbG9nLmZpbmQoKGVudHJ5OiBFeHBlbnNlR2FzdG9UeXBlRW50cnkpID0+IHtcbiAgICBjb25zdCBlbnRyeUNvZGUgPSBzYWZlVGV4dChlbnRyeT8udmFsdWUgfHwgZW50cnk/LlZhbHVlKTtcbiAgICByZXR1cm4gZW50cnlDb2RlID09PSB0eXBlVmFsdWVDb2RlO1xuICB9KTtcblxuICByZXR1cm4gc2FmZVRleHQobWF0Y2g/LnRleHQgfHwgbWF0Y2g/LlRleHQpIHx8IHR5cGVWYWx1ZUNvZGU7XG59O1xuXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvbGlzdCBpdGVtIGNvbnRyYWN0IHRvIGxpc3QgY2FyZCBVSSBtb2RlbC5cbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZCA9IChpdGVtOiBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byk6IEV4cGVuc2VTaGVldENhcmQgPT4ge1xuICByZXR1cm4ge1xuICAgIGhvamFHYXN0b3NJZDogc2FmZVRleHQoaXRlbS5Ib2phR2FzdG9zSWQpLFxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChpdGVtLkRlc2NyaXB0aW9uKSxcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5FeHBlbnNlU2hlZXRTdGF0dXMpLFxuICAgIGVzdGFkb0NvbWVudGFyaW9zOiBzYWZlVGV4dChpdGVtLkVzdGFkb0NvbWVudGFyaW9zKSB8fCBudWxsLFxuICAgIHVzZXJJZDogc2FmZVRleHQoaXRlbS5Vc2VySWQpLFxuICAgIHZvdWNoZXI6IHNhZmVUZXh0KGl0ZW0uVm91Y2hlciksXG4gICAgcHJvaklkOiBzYWZlVGV4dChpdGVtLlByb2pJZCksXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChpdGVtLkN1cnJlbmN5Q29kZSksXG4gICAgdG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5Ub3RhbEFtb3VudCksXG4gICAgZXhjaFJhdGU6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5FeGNoUmF0ZSksXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogdG9OdWxsYWJsZU51bWJlcihpdGVtLkV4Y2hhbmdlUmF0ZU1vZGUpLFxuICAgIGNyZWF0ZWREYXRlOiBzYWZlVGV4dChpdGVtLkNyZWF0ZWREYXRlKSxcbiAgfTtcbn07XG5cbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfSBoZWFkZXIgY29udHJhY3QgdG8gVUkgbW9kZWwuXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0SGVhZGVyID0gKHNoZWV0OiBFeHBlbnNlU2hlZXREZXRhaWxEdG8pOiBFeHBlbnNlU2hlZXRIZWFkZXIgPT4ge1xuICByZXR1cm4ge1xuICAgIGhvamFHYXN0b3NJZDogc2FmZVRleHQoc2hlZXQuSG9qYUdhc3Rvc0lkKSxcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQoc2hlZXQuRGVzY3JpcHRpb24pLFxuICAgIHVzZXJJZDogc2FmZVRleHQoc2hlZXQuVXNlcklkKSxcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IHRvTnVsbGFibGVOdW1iZXIoc2hlZXQuRXhwZW5zZVNoZWV0U3RhdHVzKSxcbiAgICBlc3RhZG9Db21lbnRhcmlvczogc2FmZVRleHQoc2hlZXQuRXN0YWRvQ29tZW50YXJpb3MpIHx8IG51bGwsXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChzaGVldC5DdXJyZW5jeUNvZGUpLFxuICAgIHRvdGFsQW1vdW50OiB0b051bGxhYmxlTnVtYmVyKHNoZWV0LlRvdGFsQW1vdW50KSxcbiAgICBleGNoUmF0ZTogc2FmZVRleHQoc2hlZXQuRXhjaFJhdGUpLFxuICAgIGV4Y2hhbmdlUmF0ZU1vZGU6IHRvTnVsbGFibGVOdW1iZXIoc2hlZXQuRXhjaGFuZ2VSYXRlTW9kZSksXG4gICAgcHJvaklkOiBzYWZlVGV4dChzaGVldC5Qcm9qSWQpLFxuICAgIHZvdWNoZXI6IHNhZmVUZXh0KHNoZWV0LlZvdWNoZXIpLFxuICAgIGNyZWF0ZWREYXRlOiBzYWZlVGV4dChzaGVldC5DcmVhdGVkRGF0ZSksXG4gIH07XG59O1xuXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0gbGluZSBjb250cmFjdCB0byBVSSBtb2RlbC5cbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRMaW5lID0gKGxpbmU6IEV4cGVuc2VTaGVldExpbmVEdG8pOiBFeHBlbnNlU2hlZXRMaW5lID0+IHtcbiAgY29uc3QgdHlwZVZhbHVlQ29kZSA9IHNhZmVUZXh0KGxpbmUuVHlwZVZhbHVlKTtcbiAgY29uc3QgbGVnYWN5UHJpY2UgPSAobGluZSBhcyB7IHByaWNlPzogdW5rbm93biB9KS5wcmljZTtcbiAgY29uc3QgbGVnYWN5RmlsZUlkID0gKGxpbmUgYXMgeyBmaWxlSWQ/OiB1bmtub3duIH0pLmZpbGVJZDtcblxuICByZXR1cm4ge1xuICAgIGxpbmVSZWNJZDogc2FmZVRleHQobGluZS5SZWNJZCksXG4gICAgdHJhbnNEYXRlOiBzYWZlVGV4dChsaW5lLlRyYW5zRGF0ZSksXG4gICAgdHlwZVZhbHVlQ29kZSxcbiAgICB0eXBlVmFsdWU6IHJlc29sdmVUeXBlTGFiZWwodHlwZVZhbHVlQ29kZSksXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KGxpbmUuRGVzY3JpcHRpb24pLFxuICAgIGludGVybmFjaW9uYWw6IHRvTnVsbGFibGVCb29sKGxpbmUuSW50ZXJuYWNpb25hbCksXG4gICAgZmlsZUlkOiBzYWZlVGV4dChsaW5lLkZpbGVJZCA/PyBsZWdhY3lGaWxlSWQpLFxuICAgIHRpY2tldDogdG9OdWxsYWJsZUJvb2wobGluZS5UaWNrZXQpLFxuICAgIHByaWNlOiB0b051bGxhYmxlTnVtYmVyKGxpbmUuUHJpY2UgPz8gbGVnYWN5UHJpY2UpLFxuICAgIHF0eTogdG9OdWxsYWJsZU51bWJlcihsaW5lLlF0eSksXG4gICAgYW1vdW50OiB0b051bGxhYmxlTnVtYmVyKGxpbmUuQW1vdW50KSxcbiAgICBwcm9qSWQ6IHNhZmVUZXh0KGxpbmUuUHJvaklkKSxcbiAgICBpbmRBdHRhY2hGaWxlczogc2FmZVRleHQobGluZS5JbmRBdHRhY2hGaWxlcyksXG4gIH07XG59O1xyXG4iLCAiaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciwgZmV0Y2hKc29uLCBnZXRDc3JmVG9rZW4sIHR5cGUgQXBpRmV0Y2hPcHRpb25zIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB0eXBlIHtcbiAgRW50cmFDb250ZXh0RHRvLFxuICBFbnRyYUNvbnRleHRSZXF1ZXN0LFxuICBFeGNoYW5nZVJhdGVEdG8sXG4gIEZ1ZWxQcmljZUttRHRvLFxuICBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0byxcbiAgRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0Q3JlYXRlUmVzcG9uc2VEYXRhLFxuICBFeHBlbnNlU2hlZXREZXRhaWxEdG8sXG4gIEV4cGVuc2VTaGVldERyYWZ0UmVzcG9uc2UsXG4gIEV4cGVuc2VTaGVldEhlYWRlclVwZGF0ZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldExpbmVEdG8sXG4gIEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVzcG9uc2VEYXRhLFxuICBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8sXG4gIEV4cGVuc2VTaGVldFRpY2tldENyZWF0ZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldFRpY2tldERldGFpbER0byxcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGluZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvLFxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0byxcbiAgSW5kQXBpUmVzcG9uc2UsXG4gIEluZFBhZ2VkUmVzcG9uc2UsXG59IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7XG4gIGlzTm9uTmVnYXRpdmVOdW1iZXIgYXMgaXNOb25OZWdhdGl2ZU51bWJlclRyYW5zZm9ybSxcbiAgaXNQb3NpdGl2ZU51bWJlciBhcyBpc1Bvc2l0aXZlTnVtYmVyVHJhbnNmb3JtLFxuICBub3JtYWxpemVFeHBlbnNlU2hlZXRMaXN0U3RhdHVzRmlsdGVyIGFzIG5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXJUcmFuc2Zvcm0sXG4gIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlIGFzIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlVHJhbnNmb3JtLFxuICBub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUkgYXMgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRQcm9jZXNzZWRCeUFJVHJhbnNmb3JtLFxuICBub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1cyBhcyBub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1c1RyYW5zZm9ybSxcbiAgbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlIGFzIG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZVRyYW5zZm9ybSxcbiAgbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlIGFzIG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZVRyYW5zZm9ybSxcbiAgbm9ybWFsaXplVGlja2V0TGlzdERhdGUgYXMgbm9ybWFsaXplVGlja2V0TGlzdERhdGVUcmFuc2Zvcm0sXG4gIG5vcm1hbGl6ZVRpY2tldExpc3RHYXN0b1R5cGUgYXMgbm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZVRyYW5zZm9ybSxcbiAgc2FmZVRleHQgYXMgc2FmZVRleHRUcmFuc2Zvcm0sXG4gIHRvRmxhZ0Jvb2wgYXMgdG9GbGFnQm9vbFRyYW5zZm9ybSxcbiAgdG9OdWxsYWJsZUJvb2wgYXMgdG9OdWxsYWJsZUJvb2xUcmFuc2Zvcm0sXG4gIHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlIGFzIHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlVHJhbnNmb3JtLFxuICB0b051bGxhYmxlTnVtYmVyIGFzIHRvTnVsbGFibGVOdW1iZXJUcmFuc2Zvcm0sXG4gIHRvTnVsbGFibGVUaWNrZXRTdGF0dXNDb2RlIGFzIHRvTnVsbGFibGVUaWNrZXRTdGF0dXNDb2RlVHJhbnNmb3JtLFxufSBmcm9tIFwiLi9leHBlbnNlQXBpVHJhbnNmb3Jtcy50c1wiO1xuaW1wb3J0IHtcbiAgbm9ybWFsaXplQXBpUmVzcG9uc2UgYXMgbm9ybWFsaXplQXBpUmVzcG9uc2VUcmFuc2Zvcm0sXG4gIG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm0sXG4gIG5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UgYXMgbm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcbiAgbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UgYXMgbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm0sXG4gIG5vcm1hbGl6ZVN1Ym9yZGluYXRlc1BhZ2VkUmVzcG9uc2UgYXMgbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcbiAgbm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxuICBub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcbn0gZnJvbSBcIi4vZXhwZW5zZUFwaVJlc3BvbnNlTm9ybWFsaXplcnMudHNcIjtcbmltcG9ydCB7XG4gIG1hcEV4cGVuc2VTaGVldEhlYWRlciBhcyBtYXBFeHBlbnNlU2hlZXRIZWFkZXJDb3JlLFxuICBtYXBFeHBlbnNlU2hlZXRMaW5lIGFzIG1hcEV4cGVuc2VTaGVldExpbmVDb3JlLFxuICBtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZCBhcyBtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZENvcmUsXG59IGZyb20gXCIuL2V4cGVuc2VBcGlNYXBwZXJzLnRzXCI7XG5pbXBvcnQgeyBFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFIH0gZnJvbSBcIi4vZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xuXG50eXBlIFByb2plY3REcm9wZG93blJlc3BvbnNlID0ge1xuICB0b3RhbD86IG51bWJlcjtcbiAgaXRlbXM/OiBBcnJheTx7IHZhbHVlPzogc3RyaW5nOyB0ZXh0Pzogc3RyaW5nIH0+O1xufTtcblxudHlwZSBMZWdhY3lFeHBlbnNlTGlzdEl0ZW0gPSB7XG4gIGhvamFHYXN0b3NJZD86IHVua25vd247XG4gIGRlc2NyaXB0aW9uPzogdW5rbm93bjtcbiAgZXN0YWRvQ29tZW50YXJpb3M/OiB1bmtub3duO1xuICB2b3VjaGVyPzogdW5rbm93bjtcbiAgcHJvaklkPzogdW5rbm93bjtcbiAgY3VycmVuY3lDb2RlPzogdW5rbm93bjtcbiAgdG90YWxBbW91bnQ/OiB1bmtub3duO1xuICB0b3RhbEFtb3VudE1TVD86IHVua25vd247XG4gIGV4Y2hSYXRlPzogdW5rbm93bjtcbiAgdXNlcklkPzogdW5rbm93bjtcbiAgZXhjaGFuZ2VSYXRlTW9kZT86IHVua25vd247XG4gIGV4cGVuc2VTaGVldFN0YXR1cz86IHVua25vd247XG4gIGNyZWF0ZWREYXRlPzogdW5rbm93bjtcbn07XG5cbnR5cGUgTGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZSA9IHtcbiAgc3VjY2Vzcz86IGJvb2xlYW47XG4gIG1lc3NhZ2U/OiBzdHJpbmc7XG4gIHRvdGFsPzogbnVtYmVyO1xuICBwYWdlPzogbnVtYmVyO1xuICBwYWdlU2l6ZT86IG51bWJlcjtcbiAgaXRlbXM/OiBMZWdhY3lFeHBlbnNlTGlzdEl0ZW1bXTtcbn07XG5cbnR5cGUgRXhwZW5zZUFwaUNvbnRleHQgPSB7XG4gIHRva2VuOiBzdHJpbmc7XG4gIGNvbXBhbnlJZDogc3RyaW5nO1xuICBheFVzZXJJZDogc3RyaW5nO1xuICBkZWZhdWx0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGJvb2xlYW47XG59O1xuXG50eXBlIEV4cGVuc2VBcGlBdXRoU2VlZCA9IHtcbiAgdG9rZW46IHN0cmluZztcbiAgZW50cmFPaWQ6IHN0cmluZztcbiAgYXBwQ29kZTogc3RyaW5nO1xuICBzdHJpY3RBcGlSb3V0ZXM6IGJvb2xlYW47XG59O1xuXG50eXBlIEV4cGVuc2VXaW5kb3dSdW50aW1lID0ge1xuICBfX0lORF9BUElfVE9LRU5fXz86IHN0cmluZztcbiAgX19JTkRfRU5UUkFfT0lEX18/OiBzdHJpbmc7XG4gIF9fSU5EX0FQUF9DT0RFX18/OiBzdHJpbmc7XG4gIF9fSU5EX1NFTEVDVEVEX0NPTVBBTllfXz86IHN0cmluZztcbiAgX19JTkRfRVhQRU5TRV9TVFJJQ1RfQVBJX18/OiBib29sZWFuIHwgc3RyaW5nO1xuICBfX0VYUEVOU0VfR0FTVE9fVFlQRVNfXz86IEFycmF5PHtcbiAgICB2YWx1ZT86IHVua25vd247XG4gICAgVmFsdWU/OiB1bmtub3duO1xuICAgIHRleHQ/OiB1bmtub3duO1xuICAgIFRleHQ/OiB1bmtub3duO1xuICB9Pjtcbn07XG5cbmNvbnN0IERFRkFVTFRfQVBQX0NPREUgPSBcIkNSTVwiO1xuY29uc3QgSlNPTl9IRUFERVJTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbn07XG5cbmxldCBydW50aW1lQXV0aFNlZWQ6IFBhcnRpYWw8RXhwZW5zZUFwaUF1dGhTZWVkPiA9IHt9O1xubGV0IGNhY2hlZENvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0IHwgbnVsbCA9IG51bGw7XG5sZXQgY2FjaGVkQ29udGV4dEtleSA9IFwiXCI7XG5sZXQgY29udGV4dFByb21pc2U6IFByb21pc2U8RXhwZW5zZUFwaUNvbnRleHQ+IHwgbnVsbCA9IG51bGw7XG5jb25zdCBjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcyA9IG5ldyBNYXA8c3RyaW5nLCBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj4oKTtcbmNvbnN0IHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzID0gbmV3IE1hcDxzdHJpbmcsIFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+PigpO1xuXG5jb25zdCBzYWZlVGV4dCA9IHNhZmVUZXh0VHJhbnNmb3JtO1xuXG5jb25zdCB0cnlQYXJzZUpzb25SZWNvcmQgPSAocmF3OiBzdHJpbmcpOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IG51bGwgPT4ge1xuICBpZiAoIXJhdyB8fCAhcmF3LnRyaW0oKSkgcmV0dXJuIG51bGw7XG4gIHRyeSB7XG4gICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShyYXcpO1xuICAgIHJldHVybiBwYXJzZWQgJiYgdHlwZW9mIHBhcnNlZCA9PT0gXCJvYmplY3RcIiA/IChwYXJzZWQgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pIDogbnVsbDtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IHJlYWRBcGlNZXNzYWdlID0gKHJhdzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcGF5bG9hZCA9IHRyeVBhcnNlSnNvblJlY29yZChyYXcpO1xuICBpZiAoIXBheWxvYWQpIHJldHVybiBcIlwiO1xuXG4gIGNvbnN0IHZhbHVlID0gcGF5bG9hZC5NZXNzYWdlID8/IHBheWxvYWQubWVzc2FnZTtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiA/IHZhbHVlLnRyaW0oKSA6IFwiXCI7XG59O1xuXG5jb25zdCB0b051bGxhYmxlTnVtYmVyID0gdG9OdWxsYWJsZU51bWJlclRyYW5zZm9ybTtcbmNvbnN0IGlzTm9uTmVnYXRpdmVOdW1iZXIgPSBpc05vbk5lZ2F0aXZlTnVtYmVyVHJhbnNmb3JtO1xuY29uc3QgaXNQb3NpdGl2ZU51bWJlciA9IGlzUG9zaXRpdmVOdW1iZXJUcmFuc2Zvcm07XG5jb25zdCB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZSA9IHRvTnVsbGFibGVUaWNrZXRTdGF0dXNDb2RlVHJhbnNmb3JtO1xuY29uc3QgdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUgPSB0b051bGxhYmxlR2FzdG9UeXBlQ29kZVRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlID0gbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGVUcmFuc2Zvcm07XG5jb25zdCBub3JtYWxpemVUaWNrZXRMaXN0R2FzdG9UeXBlID0gbm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZVRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzID0gbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRTdGF0dXNUcmFuc2Zvcm07XG5jb25zdCBub3JtYWxpemVPcHRpb25hbEFwaURhdGUgPSBub3JtYWxpemVPcHRpb25hbEFwaURhdGVUcmFuc2Zvcm07XG5jb25zdCBub3JtYWxpemVSZXF1aXJlZEFwaURhdGUgPSBub3JtYWxpemVSZXF1aXJlZEFwaURhdGVUcmFuc2Zvcm07XG5jb25zdCBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZSA9IG5vcm1hbGl6ZVRpY2tldExpc3REYXRlVHJhbnNmb3JtO1xuY29uc3QgdG9OdWxsYWJsZUJvb2wgPSB0b051bGxhYmxlQm9vbFRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSSA9IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSVRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXIgPSBub3JtYWxpemVFeHBlbnNlU2hlZXRMaXN0U3RhdHVzRmlsdGVyVHJhbnNmb3JtO1xuY29uc3QgdG9GbGFnQm9vbCA9IHRvRmxhZ0Jvb2xUcmFuc2Zvcm07XG5cbmNvbnN0IHJlYWRFeHBlbnNlV2luZG93UnVudGltZSA9ICgpOiBFeHBlbnNlV2luZG93UnVudGltZSA9PiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4ge307XG4gIHJldHVybiB3aW5kb3cgYXMgdW5rbm93biBhcyBFeHBlbnNlV2luZG93UnVudGltZTtcbn07XG5cbmNvbnN0IHNhbml0aXplSGVhZGVycyA9IChoZWFkZXJzOiBIZWFkZXJzSW5pdCB8IHVuZGVmaW5lZCk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPT4ge1xuICBpZiAoIWhlYWRlcnMpIHJldHVybiB7fTtcblxuICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICBjb25zdCByZXN1bHQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcbiAgICBoZWFkZXJzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KGhlYWRlcnMpKSB7XG4gICAgcmV0dXJuIGhlYWRlcnMucmVkdWNlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+KChhY2MsIFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgYWNjW1N0cmluZyhrZXkpXSA9IFN0cmluZyh2YWx1ZSk7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIHJldHVybiBPYmplY3QuZW50cmllcyhoZWFkZXJzKS5yZWR1Y2U8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4oKGFjYywgW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHJldHVybiBhY2M7XG4gICAgYWNjW2tleV0gPSBTdHJpbmcodmFsdWUpO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbn07XG5cbmNvbnN0IGdldEhlYWRlclZhbHVlID0gKGhlYWRlcnM6IEhlYWRlcnNJbml0IHwgdW5kZWZpbmVkLCBrZXk6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRLZXkgPSBrZXkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhzYW5pdGl6ZUhlYWRlcnMoaGVhZGVycykpO1xuICBjb25zdCBtYXRjaCA9IGVudHJpZXMuZmluZCgoW2hlYWRlcktleV0pID0+IGhlYWRlcktleS50cmltKCkudG9Mb3dlckNhc2UoKSA9PT0gbm9ybWFsaXplZEtleSk7XG4gIHJldHVybiBzYWZlVGV4dChtYXRjaD8uWzFdKTtcbn07XG5cbmNvbnN0IHJlbW92ZUhlYWRlclZhbHVlID0gKGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sIGtleTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRLZXkgPSBrZXkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IHRvRGVsZXRlID0gT2JqZWN0LmtleXMoaGVhZGVycykuZmluZCgoaGVhZGVyS2V5KSA9PiBoZWFkZXJLZXkudHJpbSgpLnRvTG93ZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRLZXkpO1xuICBpZiAoIXRvRGVsZXRlKSByZXR1cm47XG4gIGRlbGV0ZSBoZWFkZXJzW3RvRGVsZXRlXTtcbn07XG5cbmNvbnN0IHJlc29sdmVCZWFyZXJUb2tlbiA9IChoZWFkZXJzOiBIZWFkZXJzSW5pdCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGF1dGhvcml6YXRpb24gPSBnZXRIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIkF1dGhvcml6YXRpb25cIik7XG4gIGlmICghYXV0aG9yaXphdGlvbikgcmV0dXJuIFwiXCI7XG5cbiAgaWYgKC9eYmVhcmVyXFxzKy9pLnRlc3QoYXV0aG9yaXphdGlvbikpIHtcbiAgICByZXR1cm4gYXV0aG9yaXphdGlvbi5yZXBsYWNlKC9eYmVhcmVyXFxzKy9pLCBcIlwiKS50cmltKCk7XG4gIH1cblxuICByZXR1cm4gYXV0aG9yaXphdGlvbi50cmltKCk7XG59O1xuXG5jb25zdCByZWFkV2luZG93QXV0aFNlZWQgPSAoKTogUGFydGlhbDxFeHBlbnNlQXBpQXV0aFNlZWQ+ID0+IHtcbiAgY29uc3QgcnVudGltZVdpbmRvdyA9IHJlYWRFeHBlbnNlV2luZG93UnVudGltZSgpO1xuXG4gIHJldHVybiB7XG4gICAgdG9rZW46IHNhZmVUZXh0KHJ1bnRpbWVXaW5kb3cuX19JTkRfQVBJX1RPS0VOX18pLFxuICAgIGVudHJhT2lkOiBzYWZlVGV4dChydW50aW1lV2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcbiAgICBhcHBDb2RlOiBzYWZlVGV4dChydW50aW1lV2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxuICAgIHN0cmljdEFwaVJvdXRlczogdG9GbGFnQm9vbChydW50aW1lV2luZG93Ll9fSU5EX0VYUEVOU0VfU1RSSUNUX0FQSV9fKSA9PT0gdHJ1ZSxcbiAgfTtcbn07XG5cbmNvbnN0IHJlYWRSdW50aW1lU3RyaWN0QXBpRmxhZyA9ICgpOiBib29sZWFuID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgcnVudGltZVdpbmRvdyA9IHJlYWRFeHBlbnNlV2luZG93UnVudGltZSgpO1xuXG4gIGNvbnN0IGV4cGxpY2l0V2luZG93RmxhZyA9IHRvRmxhZ0Jvb2wocnVudGltZVdpbmRvdy5fX0lORF9FWFBFTlNFX1NUUklDVF9BUElfXyk7XG4gIHJldHVybiBleHBsaWNpdFdpbmRvd0ZsYWcgPT09IHRydWU7XG59O1xuXG5jb25zdCByZWFkV2luZG93U2VsZWN0ZWRDb21wYW55ID0gKCk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBzYWZlVGV4dChyZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUoKS5fX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18pLnRvVXBwZXJDYXNlKCk7XG59O1xuXG5jb25zdCBidWlsZENvbnRleHRLZXkgPSAoc2VlZDogRXhwZW5zZUFwaUF1dGhTZWVkKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGAke3NlZWQudG9rZW59fCR7c2VlZC5lbnRyYU9pZH18JHtzZWVkLmFwcENvZGV9fCR7cmVhZFdpbmRvd1NlbGVjdGVkQ29tcGFueSgpfWA7XG59O1xuXG5jb25zdCBidWlsZEV4cGVuc2VIZWFkZXJzID0gKFxuICBjb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyxcbiAgaW5jbHVkZUpzb24gPSBmYWxzZSxcbiAgaW5jbHVkZUF4VXNlcklkID0gdHJ1ZVxuKTogSGVhZGVyc0luaXQgPT4ge1xuICBjb25zdCBiYXNlID0gc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpO1xuICBjb25zdCBtZXJnZWQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7IC4uLmJhc2UgfTtcblxuICBpZiAoc2FmZVRleHQoY29udGV4dC50b2tlbikpIHtcbiAgICBtZXJnZWQuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHtjb250ZXh0LnRva2VufWA7XG4gIH1cblxuICBpZiAoc2FmZVRleHQoY29udGV4dC5jb21wYW55SWQpKSB7XG4gICAgbWVyZ2VkW1wiWC1JTkQtQ29tcGFueVwiXSA9IGNvbnRleHQuY29tcGFueUlkO1xuICB9XG5cbiAgaWYgKGluY2x1ZGVBeFVzZXJJZCAmJiBzYWZlVGV4dChjb250ZXh0LmF4VXNlcklkKSkge1xuICAgIG1lcmdlZFtcIlgtSU5ELUF4VXNlcklkXCJdID0gY29udGV4dC5heFVzZXJJZDtcbiAgfVxuXG4gIGlmIChpbmNsdWRlSnNvbikge1xuICAgIG1lcmdlZFtcIkNvbnRlbnQtVHlwZVwiXSA9IFwiYXBwbGljYXRpb24vanNvblwiO1xuICB9XG5cbiAgcmV0dXJuIG1lcmdlZDtcbn07XG5cbmNvbnN0IGJ1aWxkRXhwZW5zZUZvcm1IZWFkZXJzID0gKGNvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0LCBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogSGVhZGVyc0luaXQgPT4ge1xuICBjb25zdCBoZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgZmFsc2UpKTtcbiAgcmVtb3ZlSGVhZGVyVmFsdWUoaGVhZGVycywgXCJDb250ZW50LVR5cGVcIik7XG4gIHJldHVybiBoZWFkZXJzO1xufTtcblxuY29uc3QgYnVpbGRDb250ZXh0SGVhZGVycyA9ICh0b2tlbjogc3RyaW5nLCBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogSGVhZGVyc0luaXQgPT4ge1xuICBjb25zdCBiYXNlID0gc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpO1xuICBjb25zdCBtZXJnZWQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgLi4uYmFzZSxcbiAgICAuLi5KU09OX0hFQURFUlMsXG4gIH07XG5cbiAgaWYgKHNhZmVUZXh0KHRva2VuKSkge1xuICAgIG1lcmdlZC5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke3Rva2VufWA7XG4gIH1cblxuICByZXR1cm4gbWVyZ2VkO1xufTtcblxuY29uc3QgcmVzb2x2ZUF1dGhUb2tlbiA9IChvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogc3RyaW5nID0+IHtcbiAgY29uc3QgdG9rZW5Gcm9tSGVhZGVycyA9IHJlc29sdmVCZWFyZXJUb2tlbihvcHRpb25zPy5oZWFkZXJzKTtcbiAgY29uc3Qgd2luZG93U2VlZCA9IHJlYWRXaW5kb3dBdXRoU2VlZCgpO1xuICByZXR1cm4gc2FmZVRleHQodG9rZW5Gcm9tSGVhZGVycyB8fCBydW50aW1lQXV0aFNlZWQudG9rZW4gfHwgd2luZG93U2VlZC50b2tlbik7XG59O1xuXG5jb25zdCByZXNvbHZlQXV0aFNlZWQgPSAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IEV4cGVuc2VBcGlBdXRoU2VlZCA9PiB7XG4gIGNvbnN0IHdpbmRvd1NlZWQgPSByZWFkV2luZG93QXV0aFNlZWQoKTtcbiAgY29uc3QgdG9rZW4gPSByZXNvbHZlQXV0aFRva2VuKG9wdGlvbnMpO1xuICBjb25zdCBlbnRyYU9pZCA9IHNhZmVUZXh0KHJ1bnRpbWVBdXRoU2VlZC5lbnRyYU9pZCB8fCB3aW5kb3dTZWVkLmVudHJhT2lkKTtcbiAgY29uc3QgYXBwQ29kZSA9IHNhZmVUZXh0KHJ1bnRpbWVBdXRoU2VlZC5hcHBDb2RlIHx8IHdpbmRvd1NlZWQuYXBwQ29kZSB8fCBERUZBVUxUX0FQUF9DT0RFKSB8fCBERUZBVUxUX0FQUF9DT0RFO1xuICBjb25zdCBzdHJpY3RBcGlSb3V0ZXMgPVxuICAgIHR5cGVvZiBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzID09PSBcImJvb2xlYW5cIlxuICAgICAgPyBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzXG4gICAgICA6ICh3aW5kb3dTZWVkLnN0cmljdEFwaVJvdXRlcyA9PT0gdHJ1ZSk7XG5cbiAgcmV0dXJuIHtcbiAgICB0b2tlbixcbiAgICBlbnRyYU9pZCxcbiAgICBhcHBDb2RlLFxuICAgIHN0cmljdEFwaVJvdXRlcyxcbiAgfTtcbn07XG5cbmNvbnN0IHZhbGlkYXRlQ29udGV4dFJlc3BvbnNlID0gKHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEVudHJhQ29udGV4dER0bz4pOiBFeHBlbnNlQXBpQ29udGV4dCA9PiB7XG4gIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgXCJDb3VsZCBub3QgbG9hZCBFbnRyYSBjb250ZXh0LlwiKTtcbiAgfVxuXG4gIGNvbnN0IGZpcnN0ID0gQXJyYXkuaXNBcnJheShyZXNwb25zZS5JdGVtcykgPyByZXNwb25zZS5JdGVtc1swXSA6IG51bGw7XG4gIGlmICghZmlyc3QgfHwgIWZpcnN0LkhlYWRlcikge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiQ291bGQgbm90IGxvYWQgRW50cmEgY29udGV4dC5cIik7XG4gIH1cblxuICBjb25zdCBheFVzZXJJZCA9IHNhZmVUZXh0KGZpcnN0LkhlYWRlci5BeFVzZXJJZCk7XG4gIGNvbnN0IGRlZmF1bHRDb21wYW55ID0gc2FmZVRleHQoZmlyc3QuSGVhZGVyLkRlZmF1bHRDb21wYW55KTtcbiAgY29uc3QgZGVmYXVsdEN1cnJlbmN5Q29kZSA9IHNhZmVUZXh0KGZpcnN0LkhlYWRlci5EZWZhdWx0Q3VycmVuY3lDb2RlKTtcbiAgY29uc3QgY29tcGFuaWVzID0gQXJyYXkuaXNBcnJheShmaXJzdC5Db21wYW5pZXMpID8gZmlyc3QuQ29tcGFuaWVzIDogW107XG4gIGNvbnN0IGZhbGxiYWNrQ29tcGFueSA9IHNhZmVUZXh0KGNvbXBhbmllcy5maW5kKChpdGVtKSA9PiBpdGVtLklzRGVmYXVsdCk/LkNvbXBhbnlJZCk7XG4gIGNvbnN0IGNvbXBhbnlJZCA9IGRlZmF1bHRDb21wYW55IHx8IGZhbGxiYWNrQ29tcGFueTtcbiAgY29uc3Qgc2VsZWN0ZWRDb21wYW55ID0gY29tcGFuaWVzLmZpbmQoKGl0ZW0pID0+IHNhZmVUZXh0KGl0ZW0uQ29tcGFueUlkKSA9PT0gY29tcGFueUlkKSB8fCBjb21wYW5pZXNbMF07XG4gIGNvbnN0IGFsbG93U2VsZk1hbmFnZW1lbnQgPSBzZWxlY3RlZENvbXBhbnk/LkFsbG93U2VsZk1hbmFnZW1lbnQgPT09IHRydWU7XG5cbiAgaWYgKCFheFVzZXJJZCB8fCAhY29tcGFueUlkKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJDb3VsZCBub3QgcmVzb2x2ZSBFbnRyYSBjb21wYW55IGNvbnRleHQuXCIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogXCJcIixcbiAgICBjb21wYW55SWQsXG4gICAgYXhVc2VySWQsXG4gICAgZGVmYXVsdEN1cnJlbmN5Q29kZSxcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxuICB9O1xufTtcblxuY29uc3QgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQgPSBhc3luYyAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IFByb21pc2U8RXhwZW5zZUFwaUNvbnRleHQ+ID0+IHtcbiAgY29uc3Qgc2VlZCA9IHJlc29sdmVBdXRoU2VlZChvcHRpb25zKTtcbiAgY29uc3QgY29udGV4dEtleSA9IGJ1aWxkQ29udGV4dEtleShzZWVkKTtcblxuICBpZiAoY2FjaGVkQ29udGV4dCAmJiBjYWNoZWRDb250ZXh0S2V5ID09PSBjb250ZXh0S2V5KSB7XG4gICAgcmV0dXJuIGNhY2hlZENvbnRleHQ7XG4gIH1cblxuICBpZiAoY29udGV4dFByb21pc2UgJiYgY2FjaGVkQ29udGV4dEtleSA9PT0gY29udGV4dEtleSkge1xuICAgIHJldHVybiBjb250ZXh0UHJvbWlzZTtcbiAgfVxuXG4gIGNvbnN0IGZhbGxiYWNrQ29tcGFueUlkID0gcmVhZFdpbmRvd1NlbGVjdGVkQ29tcGFueSgpO1xuICBpZiAoIXNhZmVUZXh0KHNlZWQuZW50cmFPaWQpICYmIGZhbGxiYWNrQ29tcGFueUlkKSB7XG4gICAgY29uc3QgZmFsbGJhY2tDb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCA9IHtcbiAgICAgIHRva2VuOiBzZWVkLnRva2VuLFxuICAgICAgY29tcGFueUlkOiBmYWxsYmFja0NvbXBhbnlJZCxcbiAgICAgIGF4VXNlcklkOiBcIlwiLFxuICAgICAgZGVmYXVsdEN1cnJlbmN5Q29kZTogXCJcIixcbiAgICAgIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGdsb2JhbFRoaXMuX19JTkRfQUxMT1dfU0VMRl9NQU5BR0VNRU5UX18gPT09IHRydWUsXG4gICAgfTtcblxuICAgIGNhY2hlZENvbnRleHQgPSBmYWxsYmFja0NvbnRleHQ7XG4gICAgY2FjaGVkQ29udGV4dEtleSA9IGNvbnRleHRLZXk7XG4gICAgcmV0dXJuIGZhbGxiYWNrQ29udGV4dDtcbiAgfVxuXG4gIGlmICghc2FmZVRleHQoc2VlZC5lbnRyYU9pZCkpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIk1pc3NpbmcgRW50cmEgT0lEIGZvciBFbnRyYSBjb250ZXh0IHJlcXVlc3QuXCIpO1xuICB9XG5cbiAgY2FjaGVkQ29udGV4dEtleSA9IGNvbnRleHRLZXk7XG4gIGNvbnRleHRQcm9taXNlID0gKGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBjb250ZXh0UGF5bG9hZDogRW50cmFDb250ZXh0UmVxdWVzdCA9IHtcbiAgICAgIGVudHJhT2lkOiBzZWVkLmVudHJhT2lkLFxuICAgICAgYXBwQ29kZTogc2VlZC5hcHBDb2RlLFxuICAgIH07XG5cbiAgICBjb25zdCBjb250ZXh0UmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFbnRyYUNvbnRleHREdG8+PihcIi9hcGkvYXV0aC9lbnRyYS9jb250ZXh0XCIsIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogYnVpbGRDb250ZXh0SGVhZGVycyhzZWVkLnRva2VuLCBvcHRpb25zKSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNvbnRleHRQYXlsb2FkKSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc29sdmVkID0gdmFsaWRhdGVDb250ZXh0UmVzcG9uc2UoY29udGV4dFJlc3BvbnNlKTtcbiAgICBjb25zdCBuZXh0Q29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQgPSB7XG4gICAgICAuLi5yZXNvbHZlZCxcbiAgICAgIHRva2VuOiBzZWVkLnRva2VuLFxuICAgIH07XG5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgd2luZG93Ll9fSU5EX0FMTE9XX1NFTEZfTUFOQUdFTUVOVF9fID0gbmV4dENvbnRleHQuYWxsb3dTZWxmTWFuYWdlbWVudDtcbiAgICB9XG5cbiAgICBjYWNoZWRDb250ZXh0ID0gbmV4dENvbnRleHQ7XG4gICAgcmV0dXJuIG5leHRDb250ZXh0O1xuICB9KSgpO1xuXG4gIHRyeSB7XG4gICAgcmV0dXJuIGF3YWl0IGNvbnRleHRQcm9taXNlO1xuICB9IGZpbmFsbHkge1xuICAgIGNvbnRleHRQcm9taXNlID0gbnVsbDtcbiAgfVxufTtcblxuY29uc3Qgbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlVHJhbnNmb3JtO1xuY29uc3Qgbm9ybWFsaXplQXBpUmVzcG9uc2UgPSBub3JtYWxpemVBcGlSZXNwb25zZVRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZVN1Ym9yZGluYXRlc1BhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlVHJhbnNmb3JtO1xuY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlVHJhbnNmb3JtO1xuXG5jb25zdCBsb29rc0xpa2VIdG1sRG9jdW1lbnQgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcbiAgY29uc3QgcmF3ID0gc2FmZVRleHQodmFsdWUpLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiByYXcuc3RhcnRzV2l0aChcIjwhZG9jdHlwZSBodG1sXCIpIHx8IHJhdy5zdGFydHNXaXRoKFwiPGh0bWxcIik7XG59O1xuXG5jb25zdCBpc0FwaVJvdXRlVW5hdmFpbGFibGUgPSAoZXJyb3I6IHVua25vd24pOiBlcnJvciBpcyBBcGlGZXRjaEVycm9yID0+IHtcbiAgaWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSkgcmV0dXJuIGZhbHNlO1xuICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDQgfHwgZXJyb3Iuc3RhdHVzID09PSA0MDUpIHJldHVybiB0cnVlO1xuICByZXR1cm4gZXJyb3Iuc3RhdHVzID09PSB1bmRlZmluZWQgJiYgbG9va3NMaWtlSHRtbERvY3VtZW50KGVycm9yLnJlc3BvbnNlQm9keSk7XG59O1xuXG5jb25zdCBpc1N0cmljdEFwaVJvdXRlc0VuYWJsZWQgPSAoKTogYm9vbGVhbiA9PiB7XG4gIGlmICh0eXBlb2YgcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcyA9PT0gXCJib29sZWFuXCIpIHtcbiAgICByZXR1cm4gcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcztcbiAgfVxuXG4gIHJldHVybiByZWFkUnVudGltZVN0cmljdEFwaUZsYWcoKTtcbn07XG5cbmNvbnN0IHNob3VsZFVzZUxlZ2FjeUZhbGxiYWNrID0gKGVycm9yOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XG4gIGlmIChpc1N0cmljdEFwaVJvdXRlc0VuYWJsZWQoKSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gaXNBcGlSb3V0ZVVuYXZhaWxhYmxlKGVycm9yKTtcbn07XG5cbmNvbnN0IHRvTGVnYWN5TGlzdFJlcXVlc3RQYXlsb2FkID0gKHBheWxvYWQ6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZmlsdGVyOiBzYWZlVGV4dChwYXlsb2FkLmZpbHRlciksXG4gICAgaG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChwYXlsb2FkLmZpbHRlciksXG4gICAgYmlsbGVkTW9kZTogcGF5bG9hZC5iaWxsZWRNb2RlID8/IDIsXG4gICAgZnJvbURhdGU6IHNhZmVUZXh0KHBheWxvYWQuY3JlYXRlZERhdGVGcm9tKSxcbiAgICB0b0RhdGU6IHNhZmVUZXh0KHBheWxvYWQuY3JlYXRlZERhdGVUbyksXG4gICAgcHJvamVjdElkOiBzYWZlVGV4dChwYXlsb2FkLnByb2pJZCksXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChwYXlsb2FkLmN1cnJlbmN5Q29kZSksXG4gICAgZXhwZW5zZVNoZWV0U3RhdHVzOiBub3JtYWxpemVFeHBlbnNlU2hlZXRMaXN0U3RhdHVzRmlsdGVyKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzKSxcbiAgICBwYWdlOiBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZC5wYWdlKSAmJiBwYXlsb2FkLnBhZ2UgPiAwID8gcGF5bG9hZC5wYWdlIDogMSxcbiAgICBwYWdlU2l6ZTogTnVtYmVyLmlzRmluaXRlKHBheWxvYWQucGFnZVNpemUpICYmIHBheWxvYWQucGFnZVNpemUgPiAwID8gcGF5bG9hZC5wYWdlU2l6ZSA6IDUwLFxuICB9O1xufTtcblxuY29uc3QgbWFwTGVnYWN5TGlzdEl0ZW1Ub0FwaUxpc3RJdGVtID0gKGl0ZW06IExlZ2FjeUV4cGVuc2VMaXN0SXRlbSk6IEV4cGVuc2VTaGVldExpc3RJdGVtRHRvID0+IHtcbiAgcmV0dXJuIHtcbiAgICBIb2phR2FzdG9zSWQ6IHNhZmVUZXh0KGl0ZW0uaG9qYUdhc3Rvc0lkKSxcbiAgICBEZXNjcmlwdGlvbjogc2FmZVRleHQoaXRlbS5kZXNjcmlwdGlvbiksXG4gICAgRXhwZW5zZVNoZWV0U3RhdHVzOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uZXhwZW5zZVNoZWV0U3RhdHVzKSxcbiAgICBFc3RhZG9Db21lbnRhcmlvczogc2FmZVRleHQoaXRlbS5lc3RhZG9Db21lbnRhcmlvcykgfHwgbnVsbCxcbiAgICBVc2VySWQ6IHNhZmVUZXh0KGl0ZW0udXNlcklkKSB8fCBudWxsLFxuICAgIFZvdWNoZXI6IHNhZmVUZXh0KGl0ZW0udm91Y2hlciksXG4gICAgUHJvaklkOiBzYWZlVGV4dChpdGVtLnByb2pJZCksXG4gICAgQ3VycmVuY3lDb2RlOiBzYWZlVGV4dChpdGVtLmN1cnJlbmN5Q29kZSksXG4gICAgVG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS50b3RhbEFtb3VudCA/PyBpdGVtLnRvdGFsQW1vdW50TVNUKSxcbiAgICBFeGNoUmF0ZTogdG9OdWxsYWJsZU51bWJlcihpdGVtLmV4Y2hSYXRlKSxcbiAgICBFeGNoYW5nZVJhdGVNb2RlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uZXhjaGFuZ2VSYXRlTW9kZSksXG4gICAgQ3JlYXRlZERhdGU6IHNhZmVUZXh0KGl0ZW0uY3JlYXRlZERhdGUpIHx8IG51bGwsXG4gIH07XG59O1xuXG5jb25zdCBtYXBMZWdhY3lMaXN0UmVzcG9uc2UgPSAoXG4gIGxlZ2FjeTogTGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZSxcbiAgZmFsbGJhY2tQYWdlOiBudW1iZXIsXG4gIGZhbGxiYWNrUGFnZVNpemU6IG51bWJlclxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz4gPT4ge1xuICBjb25zdCBsZWdhY3lJdGVtcyA9IEFycmF5LmlzQXJyYXkobGVnYWN5Py5pdGVtcykgPyBsZWdhY3kuaXRlbXMgOiBbXTtcbiAgY29uc3QgbWFwcGVkSXRlbXMgPSBsZWdhY3lJdGVtcy5tYXAoKGVudHJ5KSA9PiBtYXBMZWdhY3lMaXN0SXRlbVRvQXBpTGlzdEl0ZW0oZW50cnkpKTtcblxuICByZXR1cm4ge1xuICAgIFN1Y2Nlc3M6IGxlZ2FjeS5zdWNjZXNzICE9PSBmYWxzZSxcbiAgICBNZXNzYWdlOiBzYWZlVGV4dChsZWdhY3kubWVzc2FnZSkgfHwgXCJPS1wiLFxuICAgIFRvdGFsOiB0b051bGxhYmxlTnVtYmVyKGxlZ2FjeS50b3RhbCkgPz8gbWFwcGVkSXRlbXMubGVuZ3RoLFxuICAgIFBhZ2U6IHRvTnVsbGFibGVOdW1iZXIobGVnYWN5LnBhZ2UpID8/IGZhbGxiYWNrUGFnZSxcbiAgICBQYWdlU2l6ZTogdG9OdWxsYWJsZU51bWJlcihsZWdhY3kucGFnZVNpemUpID8/IGZhbGxiYWNrUGFnZVNpemUsXG4gICAgSXRlbXM6IG1hcHBlZEl0ZW1zLFxuICAgIFRyYWNlSWQ6IHVuZGVmaW5lZCxcbiAgfTtcbn07XG5cbi8vIFNldHMgcnVudGltZSBhdXRoIGlucHV0cyB1c2VkIHRvIHJlc29sdmUgRW50cmEgY29udGV4dCBhbmQgbWFuZGF0b3J5IGV4cGVuc2UgaGVhZGVycy5cbmV4cG9ydCBjb25zdCBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCA9IChzZWVkOiBQYXJ0aWFsPEV4cGVuc2VBcGlBdXRoU2VlZD4pOiB2b2lkID0+IHtcbiAgY29uc3Qgc3RyaWN0RnJvbVNlZWQgPSB0b0ZsYWdCb29sKHNlZWQuc3RyaWN0QXBpUm91dGVzKTtcbiAgY29uc3Qgc3RyaWN0RnJvbVJ1bnRpbWUgPVxuICAgIHR5cGVvZiBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzID09PSBcImJvb2xlYW5cIiA/IHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXMgOiByZWFkUnVudGltZVN0cmljdEFwaUZsYWcoKTtcblxuICBydW50aW1lQXV0aFNlZWQgPSB7XG4gICAgLi4ucnVudGltZUF1dGhTZWVkLFxuICAgIHRva2VuOiBzYWZlVGV4dChzZWVkLnRva2VuIHx8IHJ1bnRpbWVBdXRoU2VlZC50b2tlbiksXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHNlZWQuZW50cmFPaWQgfHwgcnVudGltZUF1dGhTZWVkLmVudHJhT2lkKSxcbiAgICBhcHBDb2RlOiBzYWZlVGV4dChzZWVkLmFwcENvZGUgfHwgcnVudGltZUF1dGhTZWVkLmFwcENvZGUgfHwgREVGQVVMVF9BUFBfQ09ERSksXG4gICAgc3RyaWN0QXBpUm91dGVzOiBzdHJpY3RGcm9tU2VlZCA/PyBzdHJpY3RGcm9tUnVudGltZSxcbiAgfTtcblxuICBjYWNoZWRDb250ZXh0ID0gbnVsbDtcbiAgY2FjaGVkQ29udGV4dEtleSA9IFwiXCI7XG4gIGNvbnRleHRQcm9taXNlID0gbnVsbDtcbiAgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuY2xlYXIoKTtcbiAgcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuY2xlYXIoKTtcbn07XG5cbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9saXN0IGl0ZW0gY29udHJhY3QgdG8gbGlzdCBjYXJkIFVJIG1vZGVsLlxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkID0gbWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmRDb3JlO1xuXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0gaGVhZGVyIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldEhlYWRlciA9IG1hcEV4cGVuc2VTaGVldEhlYWRlckNvcmU7XG5cbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfSBsaW5lIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldExpbmUgPSBtYXBFeHBlbnNlU2hlZXRMaW5lQ29yZTtcblxuLy8gTG9hZHMgdGhlIGV4cGVuc2Ugc2hlZXQgbGlzdCBmcm9tIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvbGlzdC5cbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldExpc3QgPSBhc3luYyAoXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+PiA9PiB7XG4gIGNvbnN0IHJhd0NyZWF0ZWREYXRlRnJvbSA9IHNhZmVUZXh0KHBheWxvYWQ/LmNyZWF0ZWREYXRlRnJvbSk7XG4gIGNvbnN0IHJhd0NyZWF0ZWREYXRlVG8gPSBzYWZlVGV4dChwYXlsb2FkPy5jcmVhdGVkRGF0ZVRvKTtcbiAgY29uc3QgY3JlYXRlZERhdGVGcm9tID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlKHJhd0NyZWF0ZWREYXRlRnJvbSk7XG4gIGNvbnN0IGNyZWF0ZWREYXRlVG8gPSBub3JtYWxpemVPcHRpb25hbEFwaURhdGUocmF3Q3JlYXRlZERhdGVUbyk7XG5cbiAgaWYgKHJhd0NyZWF0ZWREYXRlRnJvbSAmJiAhY3JlYXRlZERhdGVGcm9tKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XG4gIH1cbiAgaWYgKHJhd0NyZWF0ZWREYXRlVG8gJiYgIWNyZWF0ZWREYXRlVG8pIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcbiAgfVxuXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCA9IHtcbiAgICAuLi5wYXlsb2FkLFxuICAgIGNyZWF0ZWREYXRlRnJvbSxcbiAgICBjcmVhdGVkRGF0ZVRvLFxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlcihwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyksXG4gIH07XG5cbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvbGlzdFwiLCB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXG4gICAgfSk7XG5cbiAgICByZXR1cm4gbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmICghc2hvdWxkVXNlTGVnYWN5RmFsbGJhY2soZXJyb3IpKSB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICBjb25zdCBsZWdhY3lSZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxMZWdhY3lFeHBlbnNlTGlzdFJlc3BvbnNlPihcIi9HYXN0b3MvTGlzdEV4cGVuc2VTaGVldHNcIiwge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIC4uLnNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKSxcbiAgICAgICAgLi4uSlNPTl9IRUFERVJTLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHRvTGVnYWN5TGlzdFJlcXVlc3RQYXlsb2FkKHNhZmVQYXlsb2FkKSksXG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXBwZWQgPSBtYXBMZWdhY3lMaXN0UmVzcG9uc2UoXG4gICAgICBsZWdhY3lSZXNwb25zZSxcbiAgICAgIE51bWJlci5pc0Zpbml0ZShzYWZlUGF5bG9hZC5wYWdlKSAmJiBzYWZlUGF5bG9hZC5wYWdlID4gMCA/IHNhZmVQYXlsb2FkLnBhZ2UgOiAxLFxuICAgICAgTnVtYmVyLmlzRmluaXRlKHNhZmVQYXlsb2FkLnBhZ2VTaXplKSAmJiBzYWZlUGF5bG9hZC5wYWdlU2l6ZSA+IDAgPyBzYWZlUGF5bG9hZC5wYWdlU2l6ZSA6IDUwXG4gICAgKTtcblxuICAgIHJldHVybiBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZShtYXBwZWQpO1xuICB9XG59O1xuXG4vLyBMb2FkcyBvbmUgZXhwZW5zZSBzaGVldCBkZXRhaWwgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9LlxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsID0gYXN5bmMgKFxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldERldGFpbER0bz4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlU2hlZXRJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0RGV0YWlsRHRvPj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH1gLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gUmVhZHMgYXZhaWxhYmxlIGN1cnJlbmNpZXMgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2N1cnJlbmNpZXMuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVNoZWV0Q3VycmVuY2llcyA9IGFzeW5jIChcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj4gPT4ge1xuICBsZXQgY29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQgfCBudWxsID0gbnVsbDtcbiAgdHJ5IHtcbiAgICBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSkge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgY29tcGFueUlkID0gc2FmZVRleHQoY29udGV4dD8uY29tcGFueUlkIHx8IHJlYWRXaW5kb3dTZWxlY3RlZENvbXBhbnkoKSkudG9VcHBlckNhc2UoKTtcbiAgY29uc3QgY2FjaGVLZXkgPSBjb21wYW55SWQgfHwgXCItXCI7XG5cbiAgaWYgKGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLmhhcyhjYWNoZUtleSkpIHtcbiAgICByZXR1cm4gY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuZ2V0KGNhY2hlS2V5KSBhcyBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPjtcbiAgfVxuXG4gIGlmIChwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5oYXMoY2FjaGVLZXkpKSB7XG4gICAgcmV0dXJuIHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLmdldChjYWNoZUtleSkgYXMgUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj47XG4gIH1cblxuICBjb25zdCByZXF1ZXN0UHJvbWlzZSA9IChhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIkF1dGhvcml6YXRpb25cIik7XG4gICAgcmVtb3ZlSGVhZGVyVmFsdWUoaGVhZGVycywgXCJYLUlORC1BeFVzZXJJZFwiKTtcblxuICAgIGlmIChjb21wYW55SWQpIHtcbiAgICAgIGhlYWRlcnNbXCJYLUlORC1Db21wYW55XCJdID0gY29tcGFueUlkO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj4oXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL2N1cnJlbmNpZXNcIiwge1xuICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgIGhlYWRlcnMsXG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgbm9ybWFsaXplZFJlc3BvbnNlID0gbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgIGlmIChub3JtYWxpemVkUmVzcG9uc2UuU3VjY2Vzcykge1xuICAgICAgICBjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcy5zZXQoY2FjaGVLZXksIG5vcm1hbGl6ZWRSZXNwb25zZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBub3JtYWxpemVkUmVzcG9uc2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmICghc2hvdWxkVXNlTGVnYWN5RmFsbGJhY2soZXJyb3IpKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBsZWdhY3lMaXN0UmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248TGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZT4oXCIvR2FzdG9zL0xpc3RFeHBlbnNlU2hlZXRzXCIsIHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIC4uLnNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKSxcbiAgICAgICAgICAuLi5KU09OX0hFQURFUlMsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBmaWx0ZXI6IFwiXCIsXG4gICAgICAgICAgaG9qYUdhc3Rvc0lkOiBcIlwiLFxuICAgICAgICAgIGJpbGxlZE1vZGU6IDIsXG4gICAgICAgICAgZnJvbURhdGU6IFwiXCIsXG4gICAgICAgICAgdG9EYXRlOiBcIlwiLFxuICAgICAgICAgIHByb2plY3RJZDogXCJcIixcbiAgICAgICAgICBjdXJyZW5jeUNvZGU6IFwiXCIsXG4gICAgICAgICAgcGFnZTogMSxcbiAgICAgICAgICBwYWdlU2l6ZTogMjAwLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBzZWVuQ29kZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICAgIGNvbnN0IHNvdXJjZUl0ZW1zID0gQXJyYXkuaXNBcnJheShsZWdhY3lMaXN0UmVzcG9uc2UuaXRlbXMpID8gbGVnYWN5TGlzdFJlc3BvbnNlLml0ZW1zIDogW107XG4gICAgICBjb25zdCBmYWxsYmFja0l0ZW1zOiBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0b1tdID0gc291cmNlSXRlbXNcbiAgICAgICAgLm1hcCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5LmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSlcbiAgICAgICAgLmZpbHRlcigoY29kZSkgPT4gISFjb2RlKVxuICAgICAgICAuZmlsdGVyKChjb2RlKSA9PiB7XG4gICAgICAgICAgaWYgKHNlZW5Db2Rlcy5oYXMoY29kZSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICBzZWVuQ29kZXMuYWRkKGNvZGUpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KVxuICAgICAgICAubWFwKChjb2RlKSA9PiAoe1xuICAgICAgICAgIEN1cnJlbmN5Q29kZTogY29kZSxcbiAgICAgICAgICBDdXJyZW5jeUNvZGVJU086IGNvZGUsXG4gICAgICAgIH0pKTtcblxuICAgICAgY29uc3QgZmFsbGJhY2tSZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4gPSB7XG4gICAgICAgIFN1Y2Nlc3M6IGxlZ2FjeUxpc3RSZXNwb25zZS5zdWNjZXNzICE9PSBmYWxzZSxcbiAgICAgICAgTWVzc2FnZTogc2FmZVRleHQobGVnYWN5TGlzdFJlc3BvbnNlLm1lc3NhZ2UpIHx8IFwiT0tcIixcbiAgICAgICAgVG90YWw6IGZhbGxiYWNrSXRlbXMubGVuZ3RoLFxuICAgICAgICBQYWdlOiAxLFxuICAgICAgICBQYWdlU2l6ZTogZmFsbGJhY2tJdGVtcy5sZW5ndGgsXG4gICAgICAgIEl0ZW1zOiBmYWxsYmFja0l0ZW1zLFxuICAgICAgICBUcmFjZUlkOiB1bmRlZmluZWQsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBub3JtYWxpemVkRmFsbGJhY2sgPSBub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2UoZmFsbGJhY2tSZXNwb25zZSk7XG4gICAgICBpZiAobm9ybWFsaXplZEZhbGxiYWNrLlN1Y2Nlc3MpIHtcbiAgICAgICAgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuc2V0KGNhY2hlS2V5LCBub3JtYWxpemVkRmFsbGJhY2spO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbm9ybWFsaXplZEZhbGxiYWNrO1xuICAgIH1cbiAgfSkoKTtcblxuICBwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5zZXQoY2FjaGVLZXksIHJlcXVlc3RQcm9taXNlKTtcbiAgdHJ5IHtcbiAgICByZXR1cm4gYXdhaXQgcmVxdWVzdFByb21pc2U7XG4gIH0gZmluYWxseSB7XG4gICAgcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuZGVsZXRlKGNhY2hlS2V5KTtcbiAgfVxufTtcblxuLy8gUmVhZHMgYXZhaWxhYmxlIHN1Ym9yZGluYXRlcyBmcm9tIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvc3Vib3JkaW5hdGVzLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlcyA9IGFzeW5jIChcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG8+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvc3Vib3JkaW5hdGVzXCIsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBFeHBvc2VzIHRoZSBkZWZhdWx0IGN1cnJlbmN5IHJlc29sdmVkIGZyb20gRW50cmEgY29udGV4dCBmb3IgaW5pdGlhbCBzZWxlY3Rpb25zLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUgPSBhc3luYyAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICAgIHJldHVybiBzYWZlVGV4dChjb250ZXh0LmRlZmF1bHRDdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG59O1xuXG4vLyBSZWFkcyBleGNoYW5nZSByYXRlIGZyb20gL2FwaS9zeXN0ZW0vZXhjaGFuZ2UtcmF0ZS5cbmV4cG9ydCBjb25zdCBnZXRFeGNoYW5nZVJhdGUgPSBhc3luYyAoXG4gIGJhc2VDdXJyZW5jeTogc3RyaW5nLFxuICB0YXJnZXRDdXJyZW5jeTogc3RyaW5nLFxuICBkYXRlPzogc3RyaW5nLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4Y2hhbmdlUmF0ZUR0bz4+ID0+IHtcbiAgY29uc3QgdG9rZW4gPSByZXNvbHZlQXV0aFRva2VuKG9wdGlvbnMpO1xuICBjb25zdCBub3JtYWxpemVkQmFzZUN1cnJlbmN5ID0gc2FmZVRleHQoYmFzZUN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBub3JtYWxpemVkVGFyZ2V0Q3VycmVuY3kgPSBzYWZlVGV4dCh0YXJnZXRDdXJyZW5jeSkudG9VcHBlckNhc2UoKTtcbiAgY29uc3Qgbm9ybWFsaXplZERhdGUgPSBzYWZlVGV4dChkYXRlKTtcbiAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG5cbiAgcXVlcnkuc2V0KFwiYmFzZUN1cnJlbmN5XCIsIG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kpO1xuICBxdWVyeS5zZXQoXCJ0YXJnZXRDdXJyZW5jeVwiLCBub3JtYWxpemVkVGFyZ2V0Q3VycmVuY3kpO1xuICBpZiAobm9ybWFsaXplZERhdGUpIHtcbiAgICBxdWVyeS5zZXQoXCJkYXRlXCIsIG5vcm1hbGl6ZWREYXRlKTtcbiAgfVxuXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XG4gIGlmICh0b2tlbikge1xuICAgIGhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICB9XG5cbiAgcmV0dXJuIGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeGNoYW5nZVJhdGVEdG8+PihgL2FwaS9zeXN0ZW0vZXhjaGFuZ2UtcmF0ZT8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIGhlYWRlcnMsXG4gIH0pO1xufTtcblxuLy8gUmVhZHMgZXhjaGFuZ2UgcmF0ZSBmcm9tIC9hcGkvc3lzdGVtL2V4Y2hhbmdlLXJhdGUvcHVibGljLWRpcmVjdC5cbmV4cG9ydCBjb25zdCBnZXRFeGNoYW5nZVJhdGVQdWJsaWNEaXJlY3QgPSBhc3luYyAoXG4gIGJhc2VDdXJyZW5jeTogc3RyaW5nLFxuICB0YXJnZXRDdXJyZW5jeTogc3RyaW5nLFxuICBkYXRlPzogc3RyaW5nLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4Y2hhbmdlUmF0ZUR0bz4+ID0+IHtcbiAgY29uc3QgdG9rZW4gPSByZXNvbHZlQXV0aFRva2VuKG9wdGlvbnMpO1xuICBjb25zdCBub3JtYWxpemVkQmFzZUN1cnJlbmN5ID0gc2FmZVRleHQoYmFzZUN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBub3JtYWxpemVkVGFyZ2V0Q3VycmVuY3kgPSBzYWZlVGV4dCh0YXJnZXRDdXJyZW5jeSkudG9VcHBlckNhc2UoKTtcbiAgY29uc3Qgbm9ybWFsaXplZERhdGUgPSBzYWZlVGV4dChkYXRlKTtcbiAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG5cbiAgcXVlcnkuc2V0KFwiYmFzZUN1cnJlbmN5XCIsIG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kpO1xuICBxdWVyeS5zZXQoXCJ0YXJnZXRDdXJyZW5jeVwiLCBub3JtYWxpemVkVGFyZ2V0Q3VycmVuY3kpO1xuICBpZiAobm9ybWFsaXplZERhdGUpIHtcbiAgICBxdWVyeS5zZXQoXCJkYXRlXCIsIG5vcm1hbGl6ZWREYXRlKTtcbiAgfVxuXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XG4gIGlmICh0b2tlbikge1xuICAgIGhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICB9XG5cbiAgcmV0dXJuIGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeGNoYW5nZVJhdGVEdG8+PihgL2FwaS9zeXN0ZW0vZXhjaGFuZ2UtcmF0ZS9wdWJsaWMtZGlyZWN0PyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgaGVhZGVycyxcbiAgfSk7XG59O1xuXG4vLyBSZWFkcyBmdWVsIHByaWNlIHBlciBrbSBmcm9tIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvZnVlbC1wcmljZS1rbS5cbmV4cG9ydCBjb25zdCBnZXRGdWVsUHJpY2VLbSA9IGFzeW5jIChcbiAgdHJhbnNEYXRlOiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RnVlbFByaWNlS21EdG8+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgbm9ybWFsaXplZERhdGUgPSBub3JtYWxpemVSZXF1aXJlZEFwaURhdGUodHJhbnNEYXRlKTtcbiAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG5cbiAgcXVlcnkuc2V0KFwidHJhbnNEYXRlXCIsIG5vcm1hbGl6ZWREYXRlKTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxGdWVsUHJpY2VLbUR0bz4+KFxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2Z1ZWwtcHJpY2Uta20/JHtxdWVyeS50b1N0cmluZygpfWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBDcmVhdGVzIGFuIGV4cGVuc2Ugc2hlZXQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy5cbmV4cG9ydCBjb25zdCBjcmVhdGVFeHBlbnNlU2hlZXQgPSBhc3luYyAoXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3JlYXRlUmVzcG9uc2VEYXRhPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IG1vZGUgPSBwYXlsb2FkLm1vZGUgPz8gMDtcbiAgY29uc3QgbGluZXMgPSBBcnJheS5pc0FycmF5KHBheWxvYWQubGluZXMpID8gcGF5bG9hZC5saW5lcyA6IFtdO1xuICBjb25zdCBub3JtYWxpemVkTGluZXMgPSBsaW5lcy5tYXAoKGxpbmUpID0+ICh7XG4gICAgLi4ubGluZSxcbiAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZShsaW5lLnRyYW5zRGF0ZSksXG4gIH0pKTtcbiAgY29uc3QgaGFzSW52YWxpZExpbmVQYXlsb2FkID0gbm9ybWFsaXplZExpbmVzLnNvbWUoKGxpbmUpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgIXNhZmVUZXh0KGxpbmUudHJhbnNEYXRlKSB8fFxuICAgICAgIU51bWJlci5pc0ludGVnZXIoTnVtYmVyKGxpbmUudHlwZVZhbHVlKSkgfHxcbiAgICAgIE51bWJlcihsaW5lLnR5cGVWYWx1ZSkgPD0gMCB8fFxuICAgICAgIWlzUG9zaXRpdmVOdW1iZXIobGluZS5xdHkpIHx8XG4gICAgICAhaXNQb3NpdGl2ZU51bWJlcihsaW5lLnByaWNlKVxuICAgICk7XG4gIH0pO1xuXG4gIGlmIChwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyAhPT0gdW5kZWZpbmVkICYmICFpc05vbk5lZ2F0aXZlTnVtYmVyKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzKSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhwZW5zZVNoZWV0U3RhdHVzIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byAwLlwiKTtcbiAgfVxuXG4gIGlmIChwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUgIT09IHVuZGVmaW5lZCAmJiAhaXNOb25OZWdhdGl2ZU51bWJlcihwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleGNoYW5nZVJhdGVNb2RlIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byAwLlwiKTtcbiAgfVxuXG4gIGlmIChwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUgIT09IHVuZGVmaW5lZCAmJiBwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleGNoYW5nZVJhdGVNb2RlIHJlcXVpcmVzIGV4cGVuc2VTaGVldFN0YXR1cy5cIik7XG4gIH1cblxuICBpZiAoaGFzSW52YWxpZExpbmVQYXlsb2FkKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJFYWNoIGxpbmUgcmVxdWlyZXMgdHJhbnNEYXRlLCB0eXBlVmFsdWUsIHF0eSA+IDAgYW5kIHByaWNlID4gMC5cIik7XG4gIH1cblxuICBpZiAobW9kZSA9PT0gMCkge1xuICAgIGlmICghc2FmZVRleHQocGF5bG9hZC5kZXNjcmlwdGlvbikgfHwgIXNhZmVUZXh0KHBheWxvYWQuY3VycmVuY3lDb2RlKSB8fCBsaW5lcy5sZW5ndGggPCAxKSB7XG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkludmFsaWQgY3JlYXRlIHBheWxvYWQgZm9yIG1vZGUgMC5cIik7XG4gICAgfVxuICB9XG5cbiAgaWYgKG1vZGUgPT09IDEpIHtcbiAgICBpZiAoIXNhZmVUZXh0KHBheWxvYWQuZGVzY3JpcHRpb24pIHx8ICFzYWZlVGV4dChwYXlsb2FkLmN1cnJlbmN5Q29kZSkpIHtcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiSW52YWxpZCBjcmVhdGUgcGF5bG9hZCBmb3IgbW9kZSAxLlwiKTtcbiAgICB9XG5cbiAgICBpZiAobGluZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJNb2RlIDEgcmVxdWlyZXMgbGluZXMgdG8gYmUgbnVsbCBvciBlbXB0eS5cIik7XG4gICAgfVxuICB9XG5cbiAgaWYgKG1vZGUgPT09IDIpIHtcbiAgICBpZiAoIXNhZmVUZXh0KHBheWxvYWQuZXhpc3RpbmdIb2phR2FzdG9zSWQpIHx8IGxpbmVzLmxlbmd0aCA8IDEpIHtcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiSW52YWxpZCBjcmVhdGUgcGF5bG9hZCBmb3IgbW9kZSAyLlwiKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBub3JtYWxpemVkUGF5bG9hZDogRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCA9IHtcbiAgICAuLi5wYXlsb2FkLFxuICAgIG1vZGUsXG4gICAgZXhpc3RpbmdIb2phR2FzdG9zSWQ6IHNhZmVUZXh0KHBheWxvYWQuZXhpc3RpbmdIb2phR2FzdG9zSWQpIHx8IHVuZGVmaW5lZCxcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQocGF5bG9hZC5kZXNjcmlwdGlvbikgfHwgdW5kZWZpbmVkLFxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQocGF5bG9hZC5jdXJyZW5jeUNvZGUpIHx8IHVuZGVmaW5lZCxcbiAgICBwcm9qSWQ6IHNhZmVUZXh0KHBheWxvYWQucHJvaklkKSB8fCB1bmRlZmluZWQsXG4gICAgbGluZXM6IG1vZGUgPT09IDEgPyBbXSA6IG5vcm1hbGl6ZWRMaW5lcyxcbiAgfTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRDcmVhdGVSZXNwb25zZURhdGE+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHNcIiwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5vcm1hbGl6ZWRQYXlsb2FkKSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIFVwZGF0ZXMgaGVhZGVyIGZpZWxkcyB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9LlxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4cGVuc2VTaGVldEhlYWRlciA9IGFzeW5jIChcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldEhlYWRlclVwZGF0ZVJlcXVlc3QsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8eyBIb2phR2FzdG9zSWQ6IHN0cmluZyB9Pj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcblxuICBpZiAocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMgIT09IHVuZGVmaW5lZCAmJiAhaXNOb25OZWdhdGl2ZU51bWJlcihwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cykpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4cGVuc2VTaGVldFN0YXR1cyBtdXN0IGJlIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMC5cIik7XG4gIH1cblxuICBpZiAocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlICE9PSB1bmRlZmluZWQgJiYgIWlzTm9uTmVnYXRpdmVOdW1iZXIocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlKSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhjaGFuZ2VSYXRlTW9kZSBtdXN0IGJlIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMC5cIik7XG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTx7IEhvamFHYXN0b3NJZDogc3RyaW5nIH0+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy8ke3NhZmVTaGVldElkfWAsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gRGVsZXRlcyBhIGZ1bGwgZXhwZW5zZSBzaGVldCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9L2xpbmVzLzA/ZGVsZXRlV2hvbGVTaGVldD10cnVlLlxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VTaGVldCA9IGFzeW5jIChcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlU2hlZXRJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+PihcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy8ke3NhZmVTaGVldElkfS9saW5lcy8wP2RlbGV0ZU1vZGU9MiZkZWxldGVXaG9sZVNoZWV0PXRydWVgLFxuICAgIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxuICAgIH1cbiAgKTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gVXBkYXRlcyBvbmUgZXhwZW5zZSBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0vbGluZXMve2xpbmVSZWNJZH0uXG5leHBvcnQgY29uc3QgdXBkYXRlRXhwZW5zZVNoZWV0TGluZSA9IGFzeW5jIChcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXG4gIGxpbmVSZWNJZDogc3RyaW5nLFxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVzcG9uc2VEYXRhPj4gPT4ge1xuICBjb25zdCBub3JtYWxpemVkVHJhbnNEYXRlID0gbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlKHBheWxvYWQudHJhbnNEYXRlKTtcbiAgaWYgKFxuICAgICFOdW1iZXIuaXNJbnRlZ2VyKE51bWJlcihwYXlsb2FkLnR5cGVWYWx1ZSkpIHx8XG4gICAgTnVtYmVyKHBheWxvYWQudHlwZVZhbHVlKSA8PSAwIHx8XG4gICAgIWlzUG9zaXRpdmVOdW1iZXIocGF5bG9hZC5xdHkpIHx8XG4gICAgIWlzUG9zaXRpdmVOdW1iZXIocGF5bG9hZC5wcmljZSlcbiAgKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJ0cmFuc0RhdGUsIHR5cGVWYWx1ZSwgcXR5ID4gMCBhbmQgcHJpY2UgPiAwIGFyZSByZXF1aXJlZC5cIik7XG4gIH1cblxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3Qgc2FmZUxpbmVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcobGluZVJlY0lkIHx8IFwiXCIpLnRyaW0oKSk7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlc3BvbnNlRGF0YT4+KFxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9L2xpbmVzLyR7c2FmZUxpbmVJZH1gLFxuICAgIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAuLi5wYXlsb2FkLFxuICAgICAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZWRUcmFuc0RhdGUsXG4gICAgICB9KSxcbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIERlbGV0ZXMgb25lIGV4cGVuc2UgbGluZSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9L2xpbmVzL3tsaW5lUmVjSWR9P2RlbGV0ZVdob2xlU2hlZXQ9ZmFsc2UuXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0TGluZSA9IGFzeW5jIChcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXG4gIGxpbmVSZWNJZDogc3RyaW5nLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG51bGw+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCBzYWZlTGluZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhsaW5lUmVjSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8bnVsbD4+KFxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9L2xpbmVzLyR7c2FmZUxpbmVJZH0/ZGVsZXRlTW9kZT0wJmRlbGV0ZVdob2xlU2hlZXQ9ZmFsc2VgLFxuICAgIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxuICAgIH1cbiAgKTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gRXh0cmFjdHMgYW4gZXhwZW5zZSBkcmFmdCBmcm9tIGEgdGlja2V0IGltYWdlIHVzaW5nIC9hcGkvaWEvc2VydmljZS9leHBlbnNlZnJvbXRpY2tldC5cbmV4cG9ydCBjb25zdCBleHRyYWN0RXhwZW5zZUZyb21UaWNrZXREcmFmdCA9IGFzeW5jIChcbiAgdGlja2V0SW1hZ2U6IEZpbGUgfCBCbG9iLFxuICBwZXJzaXN0VGlja2V0PzogYm9vbGVhbixcbiAgdGlja2V0VXJsRmlsZT86IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXREcmFmdFJlc3BvbnNlPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcbiAgY29uc3Qgc2FmZVRpY2tldFVybCA9IHNhZmVUZXh0KHRpY2tldFVybEZpbGUpO1xuXG4gIGlmICh0aWNrZXRJbWFnZSBpbnN0YW5jZW9mIEZpbGUpIHtcbiAgICBmb3JtLmFwcGVuZChcInRpY2tldEltYWdlXCIsIHRpY2tldEltYWdlLCBzYWZlVGV4dCh0aWNrZXRJbWFnZS5uYW1lKSB8fCBcInRpY2tldC5qcGdcIik7XG4gIH0gZWxzZSB7XG4gICAgZm9ybS5hcHBlbmQoXCJ0aWNrZXRJbWFnZVwiLCB0aWNrZXRJbWFnZSwgXCJ0aWNrZXQuanBnXCIpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBwZXJzaXN0VGlja2V0ID09PSBcImJvb2xlYW5cIikge1xuICAgIGZvcm0uYXBwZW5kKFwicGVyc2lzdFRpY2tldFwiLCBwZXJzaXN0VGlja2V0ID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIpO1xuICB9XG5cbiAgaWYgKHNhZmVUaWNrZXRVcmwpIHtcbiAgICBmb3JtLmFwcGVuZChcInRpY2tldFVybEZpbGVcIiwgc2FmZVRpY2tldFVybCk7XG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXREcmFmdFJlc3BvbnNlPj4oXCIvYXBpL2lhL3NlcnZpY2UvZXhwZW5zZWZyb210aWNrZXRcIiwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VGb3JtSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcbiAgICBib2R5OiBmb3JtLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gQ3JlYXRlcyBhIHRpY2tldCBoZWFkZXIvbGluZXMgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLlxuZXhwb3J0IGNvbnN0IGNyZWF0ZUV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0Q3JlYXRlUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3QgbW9kZSA9IE51bWJlcihwYXlsb2FkPy5tb2RlKTtcbiAgY29uc3QgcmF3VHJhbnNEYXRlID0gc2FmZVRleHQocGF5bG9hZD8udHJhbnNEYXRlKTtcbiAgY29uc3Qgbm9ybWFsaXplZFRyYW5zRGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdUcmFuc0RhdGUpO1xuXG4gIGlmIChyYXdUcmFuc0RhdGUgJiYgIW5vcm1hbGl6ZWRUcmFuc0RhdGUpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcbiAgfVxuXG4gIGlmICgobW9kZSA9PT0gMCB8fCBtb2RlID09PSAxKSAmJiAhbm9ybWFsaXplZFRyYW5zRGF0ZSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xuICB9XG5cbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldENyZWF0ZVJlcXVlc3QgPSB7XG4gICAgLi4ucGF5bG9hZCxcbiAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZWRUcmFuc0RhdGUgfHwgdW5kZWZpbmVkLFxuICAgIGdhc3RvVHlwZTogbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUocGF5bG9hZD8uZ2FzdG9UeXBlKSxcbiAgfTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4oXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHNcIiwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIExvYWRzIHRpY2tldCBsaXN0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saXN0LlxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QgPSBhc3luYyAoXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3QgcmF3Q3JlYXRlZERhdGVGcm9tID0gc2FmZVRleHQocGF5bG9hZD8uY3JlYXRlZERhdGVGcm9tKTtcbiAgY29uc3QgcmF3Q3JlYXRlZERhdGVUbyA9IHNhZmVUZXh0KHBheWxvYWQ/LmNyZWF0ZWREYXRlVG8pO1xuICBjb25zdCBjcmVhdGVkRGF0ZUZyb20gPSBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZShyYXdDcmVhdGVkRGF0ZUZyb20pO1xuICBjb25zdCBjcmVhdGVkRGF0ZVRvID0gbm9ybWFsaXplVGlja2V0TGlzdERhdGUocmF3Q3JlYXRlZERhdGVUbyk7XG4gIGlmIChyYXdDcmVhdGVkRGF0ZUZyb20gJiYgIWNyZWF0ZWREYXRlRnJvbSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xuICB9XG4gIGlmIChyYXdDcmVhdGVkRGF0ZVRvICYmICFjcmVhdGVkRGF0ZVRvKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XG4gIH1cblxuICBjb25zdCBwcmVmZXJyZWRTZWFyY2hLZXkgPSBzYWZlVGV4dChwYXlsb2FkPy5zZWFyY2hLZXkgfHwgcGF5bG9hZD8uZmlsdGVyKTtcbiAgY29uc3QgbGVnYWN5RmlsdGVyID0gc2FmZVRleHQocGF5bG9hZD8uZmlsdGVyIHx8IHByZWZlcnJlZFNlYXJjaEtleSk7XG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCA9IHtcbiAgICBwYWdlOiBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZD8ucGFnZSkgJiYgcGF5bG9hZC5wYWdlID4gMCA/IE1hdGguZmxvb3IocGF5bG9hZC5wYWdlKSA6IDEsXG4gICAgcGFnZVNpemU6IE51bWJlci5pc0Zpbml0ZShwYXlsb2FkPy5wYWdlU2l6ZSkgJiYgcGF5bG9hZC5wYWdlU2l6ZSA+IDAgPyBNYXRoLmZsb29yKHBheWxvYWQucGFnZVNpemUpIDogNTAsXG4gICAgY3JlYXRlZERhdGVGcm9tOiBjcmVhdGVkRGF0ZUZyb20gfHwgdW5kZWZpbmVkLFxuICAgIGNyZWF0ZWREYXRlVG86IGNyZWF0ZWREYXRlVG8gfHwgdW5kZWZpbmVkLFxuICAgIHNlYXJjaEtleTogcHJlZmVycmVkU2VhcmNoS2V5IHx8IHVuZGVmaW5lZCxcbiAgICBmaWx0ZXI6IGxlZ2FjeUZpbHRlciB8fCB1bmRlZmluZWQsXG4gICAgc3RhdHVzOiBub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1cyhwYXlsb2FkPy5zdGF0dXMpLFxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQocGF5bG9hZD8uY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpIHx8IHVuZGVmaW5lZCxcbiAgICBnYXN0b1R5cGU6IG5vcm1hbGl6ZVRpY2tldExpc3RHYXN0b1R5cGUocGF5bG9hZD8uZ2FzdG9UeXBlKSxcbiAgICBwcm9jZXNzZWRCeUFJOiBub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUkocGF5bG9hZD8ucHJvY2Vzc2VkQnlBSSksXG4gIH07XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz4+KFxuICAgIFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL2xpc3RcIixcbiAgICB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBMb2FkcyBvbmUgdGlja2V0IGRldGFpbCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0uXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXQgPSBhc3luYyAoXG4gIGZpbGVJZDogc3RyaW5nLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldERldGFpbER0bz4+KFxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIERvd25sb2FkcyBvbmUgdGlja2V0IGltYWdlIHByZXZpZXcgYmxvYiB0aHJvdWdoIHRoZSBpbnRlcm5hbCBwcm94eSBlbmRwb2ludC5cbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldFByZXZpZXdCbG9iID0gYXN5bmMgKFxuICB1cmxGaWxlOiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8QmxvYj4gPT4ge1xuICBjb25zdCBzYWZlVXJsRmlsZSA9IHNhZmVUZXh0KHVybEZpbGUpO1xuICBpZiAoIXNhZmVVcmxGaWxlKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJNaXNzaW5nIHRpY2tldCB1cmxGaWxlLlwiKTtcbiAgfVxuXG4gIGNvbnN0IHsgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IF9zdXBwcmVzc1Blcm1pc3Npb25Nb2RhbCwgLi4uZmV0Y2hPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBjc3JmVG9rZW4gPSBnZXRDc3JmVG9rZW4oKTtcbiAgY29uc3QgaGVhZGVyczogSGVhZGVyc0luaXQgPSB7XG4gICAgQWNjZXB0OiBcImltYWdlLypcIixcbiAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAuLi4oZmV0Y2hPcHRpb25zLmhlYWRlcnMgfHwge30pLFxuICB9O1xuXG4gIGlmIChjc3JmVG9rZW4pIHtcbiAgICAoaGVhZGVycyBhcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KVtcIlJlcXVlc3RWZXJpZmljYXRpb25Ub2tlblwiXSA9IGNzcmZUb2tlbjtcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvcHJldmlld1wiLCB7XG4gICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcbiAgICAuLi5mZXRjaE9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdXJsRmlsZTogc2FmZVVybEZpbGUgfSksXG4gIH0pO1xuXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICBjb25zdCByYXcgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgY29uc3QgbWVzc2FnZSA9IHJlYWRBcGlNZXNzYWdlKHJhdyk7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IobWVzc2FnZSB8fCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldCBwcmV2aWV3LlwiLCByZXNwb25zZS5zdGF0dXMsIHJhdyk7XG4gIH1cblxuICBjb25zdCBibG9iID0gYXdhaXQgcmVzcG9uc2UuYmxvYigpO1xuICBpZiAoIWJsb2IgfHwgYmxvYi5zaXplID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJDb3VsZCBub3QgbG9hZCB0aWNrZXQgcHJldmlldy5cIik7XG4gIH1cblxuICByZXR1cm4gYmxvYjtcbn07XG5cbi8vIFVwZGF0ZXMgdGlja2V0IGhlYWRlciBtZXRhZGF0YSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0uXG5leHBvcnQgY29uc3QgdXBkYXRlRXhwZW5zZVNoZWV0VGlja2V0ID0gYXN5bmMgKFxuICBmaWxlSWQ6IHN0cmluZyxcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJhd1RyYW5zRGF0ZSA9IHNhZmVUZXh0KHBheWxvYWQ/LnRyYW5zRGF0ZSk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc0RhdGUgPSBub3JtYWxpemVPcHRpb25hbEFwaURhdGUocmF3VHJhbnNEYXRlKTtcblxuICBpZiAocmF3VHJhbnNEYXRlICYmICFub3JtYWxpemVkVHJhbnNEYXRlKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XG4gIH1cblxuICBjb25zdCBzYWZlUGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdCA9IHtcbiAgICAuLi5wYXlsb2FkLFxuICAgIHRyYW5zRGF0ZTogbm9ybWFsaXplZFRyYW5zRGF0ZSB8fCB1bmRlZmluZWQsXG4gICAgZ2FzdG9UeXBlOiBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZShwYXlsb2FkPy5nYXN0b1R5cGUpLFxuICB9O1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH1gLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBEZWxldGVzIG9uZSB0aWNrZXQgb3Igb25lIHRpY2tldCBsaW5lIHZpYSBxdWVyeSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0uXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0ID0gYXN5bmMgKFxuICBmaWxlSWQ6IHN0cmluZyxcbiAgbGluZVJlY0lkPzogbnVtYmVyLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG51bGw+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICBpZiAoTnVtYmVyLmlzSW50ZWdlcihOdW1iZXIobGluZVJlY0lkKSkgJiYgTnVtYmVyKGxpbmVSZWNJZCkgPiAwKSB7XG4gICAgcXVlcnkuc2V0KFwibGluZVJlY0lkXCIsIFN0cmluZyhsaW5lUmVjSWQpKTtcbiAgfVxuXG4gIGNvbnN0IHN1ZmZpeCA9IHF1ZXJ5LnRvU3RyaW5nKCk7XG4gIGNvbnN0IHVybCA9IHN1ZmZpeFxuICAgID8gYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9PyR7c3VmZml4fWBcbiAgICA6IGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfWA7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+Pih1cmwsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gQXBwbGllcyBJQSBwYXlsb2FkIG92ZXIgYW4gZXhpc3RpbmcgdGlja2V0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9pYS5cbmV4cG9ydCBjb25zdCBhcHBseUV4cGVuc2VTaGVldFRpY2tldElhID0gYXN5bmMgKFxuICBmaWxlSWQ6IHN0cmluZyxcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3QgcmF3UGF5bG9hZCA9IChwYXlsb2FkIHx8IHt9KSBhcyBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3Q7XG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3QgPSB7XG4gICAgLi4ucmF3UGF5bG9hZCxcbiAgfTtcbiAgY29uc3Qgbm9ybWFsaXplZFRyYW5zRGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdQYXlsb2FkLnRyYW5zRGF0ZSk7XG4gIGlmICghbm9ybWFsaXplZFRyYW5zRGF0ZSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xuICB9XG4gIHNhZmVQYXlsb2FkLnRyYW5zRGF0ZSA9IG5vcm1hbGl6ZWRUcmFuc0RhdGU7XG5cbiAgY29uc3QgZ2FzdG9UeXBlID0gbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUocmF3UGF5bG9hZC5nYXN0b1R5cGUpO1xuICBpZiAoZ2FzdG9UeXBlID09PSB1bmRlZmluZWQpIHtcbiAgICBkZWxldGUgc2FmZVBheWxvYWQuZ2FzdG9UeXBlO1xuICB9IGVsc2Uge1xuICAgIHNhZmVQYXlsb2FkLmdhc3RvVHlwZSA9IGdhc3RvVHlwZTtcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9pYWAsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBDcmVhdGVzIG9uZSB0aWNrZXQgbGluZSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vbGluZXMuXG5leHBvcnQgY29uc3QgY3JlYXRlRXhwZW5zZVNoZWV0VGlja2V0TGluZSA9IGFzeW5jIChcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmVSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcbiAgaWYgKCFzYWZlVGV4dChwYXlsb2FkPy5kZXNjcmlwdGlvbikgfHwgIWlzUG9zaXRpdmVOdW1iZXIocGF5bG9hZD8ucXR5KSB8fCAhaXNQb3NpdGl2ZU51bWJlcihwYXlsb2FkPy5wcmljZSkpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImRlc2NyaXB0aW9uLCBxdHkgPiAwIGFuZCBwcmljZSA+IDAgYXJlIHJlcXVpcmVkLlwiKTtcbiAgfVxuXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9saW5lc2AsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIFVwZGF0ZXMgb25lIHRpY2tldCBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9saW5lcy97bGluZVJlY0lkfS5cbmV4cG9ydCBjb25zdCB1cGRhdGVFeHBlbnNlU2hlZXRUaWNrZXRMaW5lID0gYXN5bmMgKFxuICBmaWxlSWQ6IHN0cmluZyxcbiAgbGluZVJlY0lkOiBzdHJpbmcgfCBudW1iZXIsXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmVSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcbiAgaWYgKCFzYWZlVGV4dChwYXlsb2FkPy5kZXNjcmlwdGlvbikgfHwgIWlzUG9zaXRpdmVOdW1iZXIocGF5bG9hZD8ucXR5KSB8fCAhaXNQb3NpdGl2ZU51bWJlcihwYXlsb2FkPy5wcmljZSkpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImRlc2NyaXB0aW9uLCBxdHkgPiAwIGFuZCBwcmljZSA+IDAgYXJlIHJlcXVpcmVkLlwiKTtcbiAgfVxuXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHNhZmVMaW5lSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGxpbmVSZWNJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vbGluZXMvJHtzYWZlTGluZUlkfWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIERlbGV0ZXMgb25lIHRpY2tldCBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9saW5lcy97bGluZVJlY0lkfS5cbmV4cG9ydCBjb25zdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRMaW5lID0gYXN5bmMgKFxuICBmaWxlSWQ6IHN0cmluZyxcbiAgbGluZVJlY0lkOiBzdHJpbmcgfCBudW1iZXIsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3Qgc2FmZUxpbmVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcobGluZVJlY0lkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+PihcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vbGluZXMvJHtzYWZlTGluZUlkfWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBVcGxvYWRzL3JlcGxhY2VzIHRpY2tldCBmaWxlIGNvbnRlbnQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9L2ZpbGUuXG5leHBvcnQgY29uc3QgdXBsb2FkRXhwZW5zZVNoZWV0VGlja2V0RmlsZSA9IGFzeW5jIChcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIGZpbGU6IEZpbGUgfCBCbG9iLFxuICBleHRlbnNpb24/OiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCBzYWZlRXh0ZW5zaW9uID0gc2FmZVRleHQoZXh0ZW5zaW9uKS5yZXBsYWNlKC9eXFwuLywgXCJcIik7XG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICBpZiAoc2FmZUV4dGVuc2lvbikge1xuICAgIHF1ZXJ5LnNldChcImV4dGVuc2lvblwiLCBzYWZlRXh0ZW5zaW9uKTtcbiAgfVxuXG4gIGNvbnN0IHN1ZmZpeCA9IHF1ZXJ5LnRvU3RyaW5nKCk7XG4gIGNvbnN0IHVybCA9IHN1ZmZpeFxuICAgID8gYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2ZpbGU/JHtzdWZmaXh9YFxuICAgIDogYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2ZpbGVgO1xuICBjb25zdCBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XG4gIGlmIChmaWxlIGluc3RhbmNlb2YgRmlsZSkge1xuICAgIGZvcm0uYXBwZW5kKFwiZmlsZVwiLCBmaWxlLCBzYWZlVGV4dChmaWxlLm5hbWUpIHx8IGB0aWNrZXQuJHtzYWZlRXh0ZW5zaW9uIHx8IFwianBnXCJ9YCk7XG4gIH0gZWxzZSB7XG4gICAgZm9ybS5hcHBlbmQoXCJmaWxlXCIsIGZpbGUsIGB0aWNrZXQuJHtzYWZlRXh0ZW5zaW9uIHx8IFwianBnXCJ9YCk7XG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+Pih1cmwsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlRm9ybUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gICAgYm9keTogZm9ybSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIERlbGV0ZXMgdGlja2V0IGZpbGUgY29udGVudCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vZmlsZS5cbmV4cG9ydCBjb25zdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRGaWxlID0gYXN5bmMgKFxuICBmaWxlSWQ6IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxudWxsPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxudWxsPj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2ZpbGVgLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIFNlYXJjaGVzIHByb2plY3RzIGZvciBkcm9wZG93biB1c2FnZSBpbiBmaWx0ZXJzIGFuZCBlZGl0IGZvcm1zLlxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVByb2plY3RzID0gYXN5bmMgKFxuICB0ZXJtOiBzdHJpbmcsXG4gIHBhZ2U6IG51bWJlcixcbiAgcGFnZVNpemU6IG51bWJlcixcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxQcm9qZWN0RHJvcGRvd25SZXNwb25zZT4gPT4ge1xuICBjb25zdCBzYWZlVGVybSA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcodGVybSB8fCBcIlwiKSk7XG4gIGNvbnN0IHNhZmVQYWdlID0gTnVtYmVyLmlzRmluaXRlKHBhZ2UpICYmIHBhZ2UgPiAwID8gTWF0aC5mbG9vcihwYWdlKSA6IDE7XG4gIGNvbnN0IHNhZmVQYWdlU2l6ZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlU2l6ZSkgJiYgcGFnZVNpemUgPiAwID8gTWF0aC5mbG9vcihwYWdlU2l6ZSkgOiAyMDtcblxuICByZXR1cm4gZmV0Y2hKc29uPFByb2plY3REcm9wZG93blJlc3BvbnNlPihcbiAgICBgL0dhc3Rvcy9HZXRQcm9qZWN0c0ZvckRyb3Bkb3duP3Rlcm09JHtzYWZlVGVybX0mcGFnZT0ke3NhZmVQYWdlfSZwYWdlU2l6ZT0ke3NhZmVQYWdlU2l6ZX1gLFxuICAgIHtcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgfVxuICApO1xufTtcbiIsICJpbXBvcnQgeyBwYXJzZUV4cGVuc2VBcGlEYXRlIH0gZnJvbSBcIi4vZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xuXG5leHBvcnQgdHlwZSBFeHBlbnNlRGF0ZVBhcnRzID0ge1xuICB5ZWFyOiBzdHJpbmc7XG4gIG1vbnRoOiBzdHJpbmc7XG4gIGRheTogc3RyaW5nO1xufTtcblxudHlwZSBQYXJzZUV4cGVuc2VEYXRlT3B0aW9ucyA9IHtcbiAgcHJlZmVyTW9udGhGaXJzdE9uU2xhc2g/OiBib29sZWFuO1xufTtcblxuY29uc3QgQkFTUVVFX01PTlRIU19TSE9SVCA9IFtcbiAgXCJ1cnRcIixcbiAgXCJvdHNcIixcbiAgXCJtYXJcIixcbiAgXCJhcGlcIixcbiAgXCJtYWlcIixcbiAgXCJla2FcIixcbiAgXCJ1enRcIixcbiAgXCJhYnVcIixcbiAgXCJpcmFcIixcbiAgXCJ1cnJcIixcbiAgXCJhemFcIixcbiAgXCJhYmVcIixcbl07XG5cbmNvbnN0IG5vcm1hbGl6ZVVpTG9jYWxlID0gKGxvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcobG9jYWxlIHx8IFwiXCIpLnRyaW0oKTtcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiZXMtRVNcIjtcbiAgaWYgKC9eemgtaGFucy9pLnRlc3QodmFsdWUpKSByZXR1cm4gXCJ6aC1DTlwiO1xuICByZXR1cm4gdmFsdWU7XG59O1xuXG5jb25zdCBpc0Jhc3F1ZUxvY2FsZSA9IChsb2NhbGU6IHN0cmluZyk6IGJvb2xlYW4gPT4gL15ldVxcYi9pLnRlc3QoU3RyaW5nKGxvY2FsZSB8fCBcIlwiKSk7XG5cbi8vIE5vcm1hbGl6ZSB1bmtub3duIHZhbHVlcyB0byBhIHRyaW1tZWQgc3RyaW5nLlxuZXhwb3J0IGNvbnN0IHNhZmVUZXh0ID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xuICByZXR1cm4gU3RyaW5nKHZhbHVlKS50cmltKCk7XG59O1xuXG4vLyBOb3JtYWxpemVzIGNhcmQgdGl0bGUgdGV4dCBvbmx5IHdoZW4gaXQgY29tZXMgaW4gZnVsbCB1cHBlciBvciBmdWxsIGxvd2VyIGNhc2UuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplQ2FyZFRpdGxlVGV4dCA9ICh2YWx1ZTogdW5rbm93biwgZmFsbGJhY2sgPSBcIi1cIik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHNvdXJjZSA9IHNhZmVUZXh0KHZhbHVlKTtcbiAgaWYgKCFzb3VyY2UpIHJldHVybiBmYWxsYmFjaztcblxuICBjb25zdCBoYXNMZXR0ZXJzID0gL1tBLVphLXpcdTAwQzAtXHUwMEQ2XHUwMEQ4LVx1MDBGNlx1MDBGOC1cdTAwRkZdLy50ZXN0KHNvdXJjZSk7XG4gIGlmICghaGFzTGV0dGVycykgcmV0dXJuIHNvdXJjZTtcblxuICBjb25zdCBpc0FsbFVwcGVyID0gc291cmNlID09PSBzb3VyY2UudG9VcHBlckNhc2UoKSAmJiBzb3VyY2UgIT09IHNvdXJjZS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBpc0FsbExvd2VyID0gc291cmNlID09PSBzb3VyY2UudG9Mb3dlckNhc2UoKSAmJiBzb3VyY2UgIT09IHNvdXJjZS50b1VwcGVyQ2FzZSgpO1xuICBpZiAoIWlzQWxsVXBwZXIgJiYgIWlzQWxsTG93ZXIpIHtcbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgY29uc3QgbG93ZXIgPSBzb3VyY2UudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIGAke2xvd2VyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpfSR7bG93ZXIuc2xpY2UoMSl9YDtcbn07XG5cbi8vIFJldHVybnMgdHJ1ZSBvbmx5IHdoZW4gdm91Y2hlciBoYXMgYSBtZWFuaW5nZnVsIGFzc2lnbmVkIHZhbHVlLlxuZXhwb3J0IGNvbnN0IGhhc0Fzc2lnbmVkVm91Y2hlciA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xuICBjb25zdCB2b3VjaGVyID0gc2FmZVRleHQodmFsdWUpLnRvVXBwZXJDYXNlKCk7XG4gIGlmICghdm91Y2hlcikgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gdm91Y2hlciAhPT0gXCItXCIgJiYgdm91Y2hlciAhPT0gXCIuXCIgJiYgdm91Y2hlciAhPT0gXCIwXCI7XG59O1xuXG4vLyBSZXR1cm4gZGF0ZSBhdCBsb2NhbCBkYXkgc3RhcnQuXG5leHBvcnQgY29uc3Qgc3RhcnRPZkRheSA9IChkYXRlOiBEYXRlKTogRGF0ZSA9PiB7XG4gIHJldHVybiBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpO1xufTtcblxuLy8gRm9ybWF0IGxvY2FsIGRhdGUgdG8geXl5eS1NTS1kZC5cbmV4cG9ydCBjb25zdCB0b0lzb0RhdGUgPSAoZGF0ZTogRGF0ZSk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBgJHtkYXRlLmdldEZ1bGxZZWFyKCl9LSR7U3RyaW5nKGRhdGUuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKX0tJHtTdHJpbmcoZGF0ZS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKX1gO1xufTtcblxuY29uc3QgYnVpbGRFeHBlbnNlRGF0ZSA9ICh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKTogRGF0ZSB8IG51bGwgPT4ge1xuICBjb25zdCBjYW5kaWRhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XG4gIGlmIChcbiAgICBOdW1iZXIuaXNOYU4oY2FuZGlkYXRlLmdldFRpbWUoKSkgfHxcbiAgICBjYW5kaWRhdGUuZ2V0RnVsbFllYXIoKSAhPT0geWVhciB8fFxuICAgIGNhbmRpZGF0ZS5nZXRNb250aCgpICE9PSBtb250aCAtIDEgfHxcbiAgICBjYW5kaWRhdGUuZ2V0RGF0ZSgpICE9PSBkYXlcbiAgKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gY2FuZGlkYXRlO1xufTtcblxuLy8gUGFyc2Ugc3VwcG9ydGVkIEFQSSBkYXRlIGZvcm1hdHMuXG5leHBvcnQgY29uc3QgcGFyc2VFeHBlbnNlRGF0ZSA9IChyYXc/OiBzdHJpbmcsIG9wdGlvbnM/OiBQYXJzZUV4cGVuc2VEYXRlT3B0aW9ucyk6IERhdGUgfCBudWxsID0+IHtcbiAgaWYgKCFyYXcpIHJldHVybiBudWxsO1xuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhyYXcpLnRyaW0oKTtcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgZGF0ZU9ubHkgPSB2YWx1ZS5zcGxpdChcIlRcIilbMF0uc3BsaXQoXCIgXCIpWzBdO1xuXG4gIC8vIEtlZXAgb3B0aW9uYWwgbW9udGgtZmlyc3QgY29tcGF0aWJpbGl0eSBmb3IgbGVnYWN5IHNsYXNoIGRhdGVzIGluIGNhcmRzLlxuICBpZiAob3B0aW9ucz8ucHJlZmVyTW9udGhGaXJzdE9uU2xhc2ggJiYgL15cXGR7Mn1cXC9cXGR7Mn1cXC9cXGR7NH0kLy50ZXN0KGRhdGVPbmx5KSkge1xuICAgIGNvbnN0IFtmaXJzdFBhcnQsIHNlY29uZFBhcnQsIHllYXJQYXJ0XSA9IGRhdGVPbmx5LnNwbGl0KC9bLi8tXS8pO1xuICAgIGNvbnN0IGZpcnN0ID0gTnVtYmVyKGZpcnN0UGFydCk7XG4gICAgY29uc3Qgc2Vjb25kID0gTnVtYmVyKHNlY29uZFBhcnQpO1xuICAgIGNvbnN0IHllYXIgPSBOdW1iZXIoeWVhclBhcnQpO1xuICAgIGNvbnN0IG1vbnRoRmlyc3REYXRlID0gYnVpbGRFeHBlbnNlRGF0ZSh5ZWFyLCBmaXJzdCwgc2Vjb25kKTtcbiAgICBpZiAobW9udGhGaXJzdERhdGUpIHtcbiAgICAgIHJldHVybiBtb250aEZpcnN0RGF0ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcGFyc2VFeHBlbnNlQXBpRGF0ZSh2YWx1ZSk7XG59O1xuXG4vLyBGb3JtYXQgYSBkYXRlIGZvciByZWFkLW9ubHkgZmllbGRzIHVzaW5nIHRoZSBzYW1lIG91dHB1dCBzdHlsZSBhcyB2aXNpdHMuXG5leHBvcnQgY29uc3QgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlID0gKHJhdz86IHN0cmluZywgbG9jYWxlID0gXCJlcy1FU1wiLCBmYWxsYmFjayA9IFwiLVwiKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZGF0ZSA9IHBhcnNlRXhwZW5zZURhdGUocmF3KTtcbiAgaWYgKCFkYXRlKSByZXR1cm4gZmFsbGJhY2s7XG5cbiAgY29uc3Qgc2FmZUxvY2FsZSA9IG5vcm1hbGl6ZVVpTG9jYWxlKGxvY2FsZSk7XG4gIGlmIChpc0Jhc3F1ZUxvY2FsZShzYWZlTG9jYWxlKSkge1xuICAgIHJldHVybiBgJHtkYXRlLmdldERhdGUoKX0gJHtCQVNRVUVfTU9OVEhTX1NIT1JUW2RhdGUuZ2V0TW9udGgoKV19ICR7ZGF0ZS5nZXRGdWxsWWVhcigpfWAudG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIHJldHVybiBkYXRlXG4gICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhzYWZlTG9jYWxlLCB7XG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxuICAgICAgbW9udGg6IFwic2hvcnRcIixcbiAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxuICAgIH0pXG4gICAgLnJlcGxhY2UoL1xcLi9nLCBcIlwiKVxuICAgIC50b0xvd2VyQ2FzZSgpO1xufTtcblxuLy8gQnVpbGQgdGltZWxpbmUgZGF0ZSBmcmFnbWVudHMgZm9yIGNhcmQgbGVmdCBwYW5lbC5cbmV4cG9ydCBjb25zdCBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzID0gKHJhdz86IHN0cmluZywgbG9jYWxlID0gXCJlcy1FU1wiLCBvcHRpb25zPzogUGFyc2VFeHBlbnNlRGF0ZU9wdGlvbnMpOiBFeHBlbnNlRGF0ZVBhcnRzID0+IHtcbiAgY29uc3QgZGF0ZSA9IHBhcnNlRXhwZW5zZURhdGUocmF3LCBvcHRpb25zKTtcbiAgaWYgKCFkYXRlKSB7XG4gICAgcmV0dXJuIHsgeWVhcjogXCJcIiwgbW9udGg6IFwiXCIsIGRheTogXCItLVwiIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHllYXI6IFN0cmluZyhkYXRlLmdldEZ1bGxZZWFyKCkpLFxuICAgIG1vbnRoOiBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgbW9udGg6IFwic2hvcnRcIiB9KS5yZXBsYWNlKC9cXC4vZywgXCJcIikudG9VcHBlckNhc2UoKSxcbiAgICBkYXk6IFN0cmluZyhkYXRlLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpLFxuICB9O1xufTtcbiIsICJ0eXBlIE5hdmlnYXRlV2l0aEd1YXJkT3B0aW9ucyA9IHtcbiAgYXNrQ29uZmlybWF0aW9uPzogYm9vbGVhbjtcbiAgYnlwYXNzR3VhcmRPbmNlPzogYm9vbGVhbjtcbiAgbWVzc2FnZT86IHN0cmluZztcbn07XG5cbi8vIFVwZGF0ZXMgdGhlIGdsb2JhbCBuYXZpZ2F0aW9uIGd1YXJkIGxpZmVjeWNsZSBmb3IgYWN0aXZlIGVkaXQgcHJvY2Vzc2VzLlxuZXhwb3J0IGNvbnN0IHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQgPSAoYWN0aXZlOiBib29sZWFuKTogdm9pZCA9PiB7XG4gIHdpbmRvdy5fX2luZFNldE5hdmlnYXRpb25HdWFyZD8uKGFjdGl2ZSk7XG59O1xuXG4vLyBDbGVhcnMgZ2xvYmFsIG5hdmlnYXRpb24gZ3VhcmQgZmxhZ3Mgd2hlbiBjb21wb25lbnQgdW5tb3VudHMuXG5leHBvcnQgY29uc3QgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkID0gKCk6IHZvaWQgPT4ge1xuICB3aW5kb3cuX19pbmRDbGVhck5hdmlnYXRpb25HdWFyZD8uKCk7XG59O1xuXG4vLyBFeGVjdXRlcyBuYXZpZ2F0aW9uIGFjdGlvbiB0aHJvdWdoIHNpdGUgZ3VhcmQgaWYgYXZhaWxhYmxlLlxuZXhwb3J0IGNvbnN0IHJ1bkd1YXJkZWROYXZpZ2F0aW9uID0gKFxuICBhY3Rpb246ICgpID0+IHZvaWQsXG4gIG9wdGlvbnM6IE5hdmlnYXRlV2l0aEd1YXJkT3B0aW9ucyA9IHt9XG4pOiB2b2lkID0+IHtcbiAgY29uc3QgeyBhc2tDb25maXJtYXRpb24gPSBmYWxzZSwgbWVzc2FnZSB9ID0gb3B0aW9ucztcbiAgaWYgKGFza0NvbmZpcm1hdGlvbiAmJiB0eXBlb2Ygd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHdpbmRvdy5fX2luZFJlcXVlc3ROYXZpZ2F0aW9uKGFjdGlvbiwgbWVzc2FnZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYWN0aW9uKCk7XG59O1xuXG4vLyBOYXZpZ2F0ZXMgdG8gdGFyZ2V0IFVSTCBhbmQga2VlcHMgc2l0ZS1sZXZlbCBndWFyZCBiZWhhdmlvciBjb25zaXN0ZW50LlxuZXhwb3J0IGNvbnN0IG5hdmlnYXRlVG9FeHBlbnNlVXJsID0gKFxuICB0YXJnZXRVcmw6IHN0cmluZyxcbiAgb3B0aW9uczogTmF2aWdhdGVXaXRoR3VhcmRPcHRpb25zID0ge31cbik6IHZvaWQgPT4ge1xuICBjb25zdCBzYWZlVXJsID0gU3RyaW5nKHRhcmdldFVybCB8fCBcIlwiKS50cmltKCk7XG4gIGlmICghc2FmZVVybCkgcmV0dXJuO1xuXG4gIGNvbnN0IHsgYnlwYXNzR3VhcmRPbmNlID0gdHJ1ZSB9ID0gb3B0aW9ucztcbiAgcnVuR3VhcmRlZE5hdmlnYXRpb24oKCkgPT4ge1xuICAgIGlmIChieXBhc3NHdWFyZE9uY2UpIHtcbiAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xuICAgIH1cbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHNhZmVVcmw7XG4gIH0sIG9wdGlvbnMpO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7QUFBQSxJQUFNLHdCQUF3QjtBQVM5QixJQUFNLHVCQUF1QixDQUFDLFVBQTBCO0FBQ3RELFNBQU8sTUFBTSxRQUFRLGNBQWMsRUFBRTtBQUN2QztBQUVBLElBQU0sNEJBQTRCLENBQUMsT0FBZSxjQUFrQztBQUNsRixRQUFNLFFBQVEsTUFBTSxNQUFNLFNBQVM7QUFDbkMsTUFBSSxNQUFNLFVBQVUsRUFBRyxRQUFPO0FBQzlCLE1BQUksTUFBTSxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsRUFBRyxRQUFPO0FBQ3RELE1BQUksTUFBTSxDQUFDLEVBQUUsU0FBUyxLQUFLLE1BQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRyxRQUFPO0FBQ3ZELFNBQU8sTUFBTSxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUMsU0FBUyxLQUFLLFdBQVcsQ0FBQztBQUN6RDtBQUdPLElBQU0sMkJBQTJCLENBQUMsUUFBMkQ7QUFDbEcsTUFBSSxRQUFRLFFBQVEsUUFBUSxPQUFXLFFBQU87QUFDOUMsTUFBSSxPQUFPLFFBQVEsU0FBVSxRQUFPLE9BQU8sU0FBUyxHQUFHLElBQUksTUFBTTtBQUVqRSxNQUFJLFFBQVEscUJBQXFCLE9BQU8sT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsUUFBUSxFQUFFLENBQUM7QUFDN0UsTUFBSSxDQUFDLE1BQU8sUUFBTztBQUVuQixNQUFJLE9BQU87QUFDWCxNQUFJLE1BQU0sV0FBVyxHQUFHLEdBQUc7QUFDekIsV0FBTztBQUNQLFlBQVEsTUFBTSxNQUFNLENBQUM7QUFBQSxFQUN2QixXQUFXLE1BQU0sV0FBVyxHQUFHLEdBQUc7QUFDaEMsWUFBUSxNQUFNLE1B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LENBQUMsUUFBUztBQUVkLFFBQU0sRUFBRSxrQkFBa0IsS0FBSyxJQUFJO0FBQ25DLHVCQUFxQixNQUFNO0FBQ3pCLFFBQUksaUJBQWlCO0FBQ25CLGFBQU8saUNBQWlDO0FBQUEsSUFDMUM7QUFDQSxXQUFPLFNBQVMsT0FBTztBQUFBLEVBQ3pCLEdBQUcsT0FBTztBQUNaOyIsCiAgIm5hbWVzIjogWyJzYWZlVGV4dCIsICJzYWZlVGV4dCIsICJzYWZlVGV4dCIsICJzYWZlVGV4dCIsICJzYWZlVGV4dCIsICJ0b051bGxhYmxlTnVtYmVyIiwgImlzTm9uTmVnYXRpdmVOdW1iZXIiLCAiaXNQb3NpdGl2ZU51bWJlciIsICJub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZSIsICJub3JtYWxpemVUaWNrZXRMaXN0R2FzdG9UeXBlIiwgIm5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzIiwgIm5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZSIsICJub3JtYWxpemVSZXF1aXJlZEFwaURhdGUiLCAibm9ybWFsaXplVGlja2V0TGlzdERhdGUiLCAibm9ybWFsaXplT3B0aW9uYWxUaWNrZXRQcm9jZXNzZWRCeUFJIiwgIm5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXIiLCAidG9GbGFnQm9vbCIsICJyZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUiLCAic2FmZVRleHQiLCAibm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVBcGlSZXNwb25zZSIsICJub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZSIsICJzYWZlVGV4dCIsICJub3JtYWxpemVFeHBlbnNlU2hlZXRMaXN0U3RhdHVzRmlsdGVyIiwgInRvTnVsbGFibGVOdW1iZXIiLCAidG9GbGFnQm9vbCIsICJtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZCIsICJtYXBFeHBlbnNlU2hlZXRIZWFkZXIiLCAibWFwRXhwZW5zZVNoZWV0TGluZSIsICJub3JtYWxpemVPcHRpb25hbEFwaURhdGUiLCAibm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2UiLCAic2FmZVRleHQiLCAibm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlIiwgIm5vcm1hbGl6ZUFwaVJlc3BvbnNlIiwgInNhZmVUZXh0IiwgImlzUG9zaXRpdmVOdW1iZXIiLCAiaXNOb25OZWdhdGl2ZU51bWJlciIsICJub3JtYWxpemVPcHRpb25hbEFwaURhdGUiLCAibm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUiLCAibm9ybWFsaXplVGlja2V0TGlzdERhdGUiLCAibm9ybWFsaXplT3B0aW9uYWxUaWNrZXRTdGF0dXMiLCAibm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZSIsICJub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUkiLCAibm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZSIsICJzYWZlVGV4dCIsICJpc1Bvc2l0aXZlTnVtYmVyIiwgIm5vcm1hbGl6ZUFwaVJlc3BvbnNlIiwgInNhZmVUZXh0Il0KfQo=
