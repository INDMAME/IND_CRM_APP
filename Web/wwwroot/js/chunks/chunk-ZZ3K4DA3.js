import {
  ApiFetchError,
  fetchJson
} from "./chunk-U25S3E2U.js";

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
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: safeCurrency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    } catch {
    }
  }
  return safeCurrency ? `${decimalText} ${safeCurrency}` : decimalText;
};

// Web/wwwroot/react/src/pages/gastos/utils/expenseApi.ts
var DEFAULT_APP_CODE = "CRM";
var JSON_HEADERS = {
  "Content-Type": "application/json"
};
var ALLOWED_GASTO_TYPE_CODES = /* @__PURE__ */ new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);
var runtimeAuthSeed = {};
var cachedContext = null;
var cachedContextKey = "";
var contextPromise = null;
var cachedCurrencyResponses = /* @__PURE__ */ new Map();
var pendingCurrencyRequests = /* @__PURE__ */ new Map();
var safeText = (value) => {
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
var toNullableGastoTypeCode = (value) => {
  const parsed = toNullableNumber(value);
  if (parsed === null || !Number.isInteger(parsed) || !ALLOWED_GASTO_TYPE_CODES.has(parsed)) {
    return null;
  }
  return parsed;
};
var normalizeOptionalTicketGastoType = (value) => {
  if (value === null || value === void 0 || safeText(value) === "") {
    return void 0;
  }
  const parsed = toNullableGastoTypeCode(value);
  if (parsed === null) {
    throw new ApiFetchError("gastoType must be one of: 0,1,2,3,4,5,6,7,8,14.");
  }
  return parsed;
};
var normalizeOptionalTicketStatus = (value) => {
  if (value === null || value === void 0 || safeText(value) === "") {
    return void 0;
  }
  const parsed = toNullableNumber(value);
  if (parsed === 0 || parsed === 1) {
    return parsed;
  }
  throw new ApiFetchError("status must be 0 or 1.");
};
var normalizeTicketListDate = (value) => {
  const raw = safeText(value);
  if (!raw) return "";
  const dateOnly = raw.split("T")[0].split(" ")[0];
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateOnly)) {
    return dateOnly;
  }
  if (/^\d{8}$/.test(dateOnly)) {
    const year2 = dateOnly.slice(0, 4);
    const month2 = dateOnly.slice(4, 6);
    const day2 = dateOnly.slice(6, 8);
    return `${year2}-${month2}-${day2}`;
  }
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }
  const year = String(parsed.getFullYear());
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
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
  if (value === null || value === void 0 || safeText(value) === "") {
    return void 0;
  }
  const parsed = toNullableBool(value);
  if (parsed === null) {
    throw new ApiFetchError("processedByAI must be true or false.");
  }
  return parsed;
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
var readExpenseWindowRuntime = () => {
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
  return safeText(match?.[1]);
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
  const runtimeWindow = readExpenseWindowRuntime();
  return {
    token: safeText(runtimeWindow.__IND_API_TOKEN__),
    entraOid: safeText(runtimeWindow.__IND_ENTRA_OID__),
    appCode: safeText(runtimeWindow.__IND_APP_CODE__),
    strictApiRoutes: toFlagBool(runtimeWindow.__IND_EXPENSE_STRICT_API__) === true
  };
};
var readRuntimeStrictApiFlag = () => {
  if (typeof window === "undefined") return false;
  const runtimeWindow = readExpenseWindowRuntime();
  const explicitWindowFlag = toFlagBool(runtimeWindow.__IND_EXPENSE_STRICT_API__);
  return explicitWindowFlag === true;
};
var readWindowSelectedCompany = () => {
  return safeText(readExpenseWindowRuntime().__IND_SELECTED_COMPANY__).toUpperCase();
};
var buildContextKey = (seed) => {
  return `${seed.token}|${seed.entraOid}|${seed.appCode}|${readWindowSelectedCompany()}`;
};
var buildExpenseHeaders = (context, options, includeJson = false, includeAxUserId = true) => {
  const base = sanitizeHeaders(options?.headers);
  const merged = { ...base };
  if (safeText(context.token)) {
    merged.Authorization = `Bearer ${context.token}`;
  }
  if (safeText(context.companyId)) {
    merged["X-IND-Company"] = context.companyId;
  }
  if (includeAxUserId && safeText(context.axUserId)) {
    merged["X-IND-AxUserId"] = context.axUserId;
  }
  if (includeJson) {
    merged["Content-Type"] = "application/json";
  }
  return merged;
};
var buildContextHeaders = (token, options) => {
  const base = sanitizeHeaders(options?.headers);
  const merged = {
    ...base,
    ...JSON_HEADERS
  };
  if (safeText(token)) {
    merged.Authorization = `Bearer ${token}`;
  }
  return merged;
};
var resolveAuthToken = (options) => {
  const tokenFromHeaders = resolveBearerToken(options?.headers);
  const windowSeed = readWindowAuthSeed();
  return safeText(tokenFromHeaders || runtimeAuthSeed.token || windowSeed.token);
};
var resolveAuthSeed = (options) => {
  const windowSeed = readWindowAuthSeed();
  const token = resolveAuthToken(options);
  const entraOid = safeText(runtimeAuthSeed.entraOid || windowSeed.entraOid);
  const appCode = safeText(runtimeAuthSeed.appCode || windowSeed.appCode || DEFAULT_APP_CODE) || DEFAULT_APP_CODE;
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
  const axUserId = safeText(first.Header.AxUserId);
  const defaultCompany = safeText(first.Header.DefaultCompany);
  const defaultCurrencyCode = safeText(first.Header.DefaultCurrencyCode);
  const companies = Array.isArray(first.Companies) ? first.Companies : [];
  const fallbackCompany = safeText(companies.find((item) => item.IsDefault)?.CompanyId);
  const companyId = defaultCompany || fallbackCompany;
  const selectedCompany = companies.find((item) => safeText(item.CompanyId) === companyId) || companies[0];
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
  if (!safeText(seed.entraOid) && fallbackCompanyId) {
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
  if (!safeText(seed.entraOid)) {
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
    HojaGastosIdDisplay: safeText(
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
    HojaGastosIdDisplay: safeText(
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
var looksLikeHtmlDocument = (value) => {
  const raw = safeText(value).toLowerCase();
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
    filter: safeText(payload.filter),
    hojaGastosId: safeText(payload.filter),
    billedMode: payload.billedMode ?? 2,
    fromDate: safeText(payload.createdDateFrom),
    toDate: safeText(payload.createdDateTo),
    projectId: safeText(payload.projId),
    currencyCode: safeText(payload.currencyCode),
    expenseSheetStatus: isValidListExpenseSheetStatus(payload.expenseSheetStatus) ? Number(payload.expenseSheetStatus) : void 0,
    page: Number.isFinite(payload.page) && payload.page > 0 ? payload.page : 1,
    pageSize: Number.isFinite(payload.pageSize) && payload.pageSize > 0 ? payload.pageSize : 50
  };
};
var mapLegacyListItemToApiListItem = (item) => {
  return {
    HojaGastosId: safeText(item.hojaGastosId),
    Description: safeText(item.description),
    ExpenseSheetStatus: toNullableNumber(item.expenseSheetStatus),
    EstadoComentarios: safeText(item.estadoComentarios) || null,
    UserId: safeText(item.userId) || null,
    Voucher: safeText(item.voucher),
    ProjId: safeText(item.projId),
    CurrencyCode: safeText(item.currencyCode),
    TotalAmount: toNullableNumber(item.totalAmount ?? item.totalAmountMST),
    ExchRate: toNullableNumber(item.exchRate),
    ExchangeRateMode: toNullableNumber(item.exchangeRateMode),
    CreatedDate: safeText(item.createdDate) || null
  };
};
var mapLegacyListResponse = (legacy, fallbackPage, fallbackPageSize) => {
  const legacyItems = Array.isArray(legacy?.items) ? legacy.items : [];
  const mappedItems = legacyItems.map((entry) => mapLegacyListItemToApiListItem(entry));
  return {
    Success: legacy.success !== false,
    Message: safeText(legacy.message) || "OK",
    Total: toNullableNumber(legacy.total) ?? mappedItems.length,
    Page: toNullableNumber(legacy.page) ?? fallbackPage,
    PageSize: toNullableNumber(legacy.pageSize) ?? fallbackPageSize,
    Items: mappedItems,
    TraceId: void 0
  };
};
var resolveTypeLabel = (typeValueCode) => {
  if (!typeValueCode || typeof window === "undefined") {
    return typeValueCode;
  }
  const rawCatalogSource = readExpenseWindowRuntime().__EXPENSE_GASTO_TYPES__;
  const rawCatalog = Array.isArray(rawCatalogSource) ? rawCatalogSource : [];
  const match = rawCatalog.find((entry) => {
    const entryCode = safeText(entry?.value || entry?.Value);
    return entryCode === typeValueCode;
  });
  return safeText(match?.text || match?.Text) || typeValueCode;
};
var configureExpenseApiAuth = (seed) => {
  const strictFromSeed = toFlagBool(seed.strictApiRoutes);
  const strictFromRuntime = typeof runtimeAuthSeed.strictApiRoutes === "boolean" ? runtimeAuthSeed.strictApiRoutes : readRuntimeStrictApiFlag();
  runtimeAuthSeed = {
    ...runtimeAuthSeed,
    token: safeText(seed.token || runtimeAuthSeed.token),
    entraOid: safeText(seed.entraOid || runtimeAuthSeed.entraOid),
    appCode: safeText(seed.appCode || runtimeAuthSeed.appCode || DEFAULT_APP_CODE),
    strictApiRoutes: strictFromSeed ?? strictFromRuntime
  };
  cachedContext = null;
  cachedContextKey = "";
  contextPromise = null;
  cachedCurrencyResponses.clear();
  pendingCurrencyRequests.clear();
};
var mapExpenseSheetListItemToCard = (item) => {
  return {
    hojaGastosId: safeText(item.HojaGastosId),
    description: safeText(item.Description),
    expenseSheetStatus: toNullableNumber(item.ExpenseSheetStatus),
    estadoComentarios: safeText(item.EstadoComentarios) || null,
    userId: safeText(item.UserId),
    voucher: safeText(item.Voucher),
    projId: safeText(item.ProjId),
    currencyCode: safeText(item.CurrencyCode),
    totalAmount: toNullableNumber(item.TotalAmount),
    exchRate: toNullableNumber(item.ExchRate),
    exchangeRateMode: toNullableNumber(item.ExchangeRateMode),
    createdDate: safeText(item.CreatedDate)
  };
};
var mapExpenseSheetHeader = (sheet) => {
  return {
    hojaGastosId: safeText(sheet.HojaGastosId),
    description: safeText(sheet.Description),
    userId: safeText(sheet.UserId),
    expenseSheetStatus: toNullableNumber(sheet.ExpenseSheetStatus),
    estadoComentarios: safeText(sheet.EstadoComentarios) || null,
    currencyCode: safeText(sheet.CurrencyCode),
    totalAmount: toNullableNumber(sheet.TotalAmount),
    exchRate: safeText(sheet.ExchRate),
    exchangeRateMode: toNullableNumber(sheet.ExchangeRateMode),
    projId: safeText(sheet.ProjId),
    voucher: safeText(sheet.Voucher),
    createdDate: safeText(sheet.CreatedDate)
  };
};
var mapExpenseSheetLine = (line) => {
  const typeValueCode = safeText(line.TypeValue);
  const legacyPrice = line.price;
  const legacyFileId = line.fileId;
  return {
    lineRecId: safeText(line.RecId),
    transDate: safeText(line.TransDate),
    typeValueCode,
    typeValue: resolveTypeLabel(typeValueCode),
    description: safeText(line.Description),
    internacional: toNullableBool(line.Internacional),
    fileId: safeText(line.FileId ?? legacyFileId),
    ticket: toNullableBool(line.Ticket),
    price: toNullableNumber(line.Price ?? legacyPrice),
    qty: toNullableNumber(line.Qty),
    amount: toNullableNumber(line.Amount),
    projId: safeText(line.ProjId),
    indAttachFiles: safeText(line.IndAttachFiles)
  };
};
var fetchExpenseSheetList = async (payload, options) => {
  if (payload.expenseSheetStatus !== void 0 && !isValidListExpenseSheetStatus(payload.expenseSheetStatus)) {
    throw new ApiFetchError("expenseSheetStatus must be an integer between 0 and 4.");
  }
  const context = await ensureExpenseApiContext(options);
  try {
    const response = await fetchJson("/api/crm/expensesheets/list", {
      ...options,
      method: "POST",
      headers: buildExpenseHeaders(context, options, true),
      body: JSON.stringify(payload)
    });
    return normalizeListPagedResponse(response);
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
      body: JSON.stringify(toLegacyListRequestPayload(payload))
    });
    const mapped = mapLegacyListResponse(
      legacyResponse,
      Number.isFinite(payload.page) && payload.page > 0 ? payload.page : 1,
      Number.isFinite(payload.pageSize) && payload.pageSize > 0 ? payload.pageSize : 50
    );
    return normalizeListPagedResponse(mapped);
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
  return normalizeDetailPagedResponse(response);
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
  const companyId = safeText(context?.companyId || readWindowSelectedCompany()).toUpperCase();
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
      const normalizedResponse = normalizeCurrencyPagedResponse(response);
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
      const fallbackItems = sourceItems.map((entry) => safeText(entry.currencyCode).toUpperCase()).filter((code) => !!code).filter((code) => {
        if (seenCodes.has(code)) return false;
        seenCodes.add(code);
        return true;
      }).map((code) => ({
        CurrencyCode: code,
        CurrencyCodeISO: code
      }));
      const fallbackResponse = {
        Success: legacyListResponse.success !== false,
        Message: safeText(legacyListResponse.message) || "OK",
        Total: fallbackItems.length,
        Page: 1,
        PageSize: fallbackItems.length,
        Items: fallbackItems,
        TraceId: void 0
      };
      const normalizedFallback = normalizeCurrencyPagedResponse(fallbackResponse);
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
    return safeText(context.defaultCurrencyCode).toUpperCase();
  } catch {
    return "";
  }
};
var getExchangeRate = async (baseCurrency, targetCurrency, date, options) => {
  const token = resolveAuthToken(options);
  const normalizedBaseCurrency = safeText(baseCurrency).toUpperCase();
  const normalizedTargetCurrency = safeText(targetCurrency).toUpperCase();
  const normalizedDate = safeText(date);
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
  const normalizedDate = safeText(transDate);
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
  return normalizeApiResponse(response);
};
var createExpenseSheet = async (payload, options) => {
  const context = await ensureExpenseApiContext(options);
  const mode = payload.mode ?? 0;
  const lines = Array.isArray(payload.lines) ? payload.lines : [];
  const hasInvalidLinePayload = lines.some((line) => {
    return !safeText(line.transDate) || !Number.isInteger(Number(line.typeValue)) || Number(line.typeValue) <= 0 || !isPositiveNumber(line.qty) || !isPositiveNumber(line.price);
  });
  if (payload.expenseSheetStatus !== void 0 && !isNonNegativeNumber(payload.expenseSheetStatus)) {
    throw new ApiFetchError("expenseSheetStatus must be greater or equal to 0.");
  }
  if (payload.exchangeRateMode !== void 0 && !isNonNegativeNumber(payload.exchangeRateMode)) {
    throw new ApiFetchError("exchangeRateMode must be greater or equal to 0.");
  }
  if (payload.exchangeRateMode !== void 0 && payload.expenseSheetStatus === void 0) {
    throw new ApiFetchError("exchangeRateMode requires expenseSheetStatus.");
  }
  if (hasInvalidLinePayload) {
    throw new ApiFetchError("Each line requires transDate, typeValue, qty > 0 and price > 0.");
  }
  if (mode === 0) {
    if (!safeText(payload.description) || !safeText(payload.currencyCode) || lines.length < 1) {
      throw new ApiFetchError("Invalid create payload for mode 0.");
    }
  }
  if (mode === 1) {
    if (!safeText(payload.description) || !safeText(payload.currencyCode)) {
      throw new ApiFetchError("Invalid create payload for mode 1.");
    }
    if (lines.length > 0) {
      throw new ApiFetchError("Mode 1 requires lines to be null or empty.");
    }
  }
  if (mode === 2) {
    if (!safeText(payload.existingHojaGastosId) || lines.length < 1) {
      throw new ApiFetchError("Invalid create payload for mode 2.");
    }
  }
  const normalizedPayload = {
    ...payload,
    mode,
    existingHojaGastosId: safeText(payload.existingHojaGastosId) || void 0,
    description: safeText(payload.description) || void 0,
    currencyCode: safeText(payload.currencyCode) || void 0,
    projId: safeText(payload.projId) || void 0,
    lines: mode === 1 ? [] : lines
  };
  const response = await fetchJson("/api/crm/expensesheets", {
    ...options,
    method: "POST",
    headers: buildExpenseHeaders(context, options, true),
    body: JSON.stringify(normalizedPayload)
  });
  return normalizeApiResponse(response);
};
var updateExpenseSheetHeader = async (hojaGastosId, payload, options) => {
  const context = await ensureExpenseApiContext(options);
  const safeSheetId = encodeURIComponent(String(hojaGastosId || "").trim());
  if (payload.expenseSheetStatus !== void 0 && !isNonNegativeNumber(payload.expenseSheetStatus)) {
    throw new ApiFetchError("expenseSheetStatus must be greater or equal to 0.");
  }
  if (payload.exchangeRateMode !== void 0 && !isNonNegativeNumber(payload.exchangeRateMode)) {
    throw new ApiFetchError("exchangeRateMode must be greater or equal to 0.");
  }
  if (payload.exchangeRateMode !== void 0 && payload.expenseSheetStatus === void 0) {
    throw new ApiFetchError("exchangeRateMode requires expenseSheetStatus.");
  }
  if (safeText(payload.estadoComentarios) && (payload.expenseSheetStatus === void 0 || payload.exchangeRateMode === void 0)) {
    throw new ApiFetchError("estadoComentarios requires expenseSheetStatus and exchangeRateMode.");
  }
  const response = await fetchJson(`/api/crm/expensesheets/${safeSheetId}`, {
    ...options,
    method: "PUT",
    headers: buildExpenseHeaders(context, options, true),
    body: JSON.stringify(payload)
  });
  return normalizeApiResponse(response);
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
  return normalizeApiResponse(response);
};
var updateExpenseSheetLine = async (hojaGastosId, lineRecId, payload, options) => {
  if (!safeText(payload.transDate) || !Number.isInteger(Number(payload.typeValue)) || Number(payload.typeValue) <= 0 || !isPositiveNumber(payload.qty) || !isPositiveNumber(payload.price)) {
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
      body: JSON.stringify(payload)
    }
  );
  return normalizeApiResponse(response);
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
  return normalizeApiResponse(response);
};
var fetchExpenseSheetTicketsList = async (payload, options) => {
  const context = await ensureExpenseApiContext(options);
  const rawCreatedDateFrom = safeText(payload?.createdDateFrom);
  const rawCreatedDateTo = safeText(payload?.createdDateTo);
  const createdDateFrom = normalizeTicketListDate(rawCreatedDateFrom);
  const createdDateTo = normalizeTicketListDate(rawCreatedDateTo);
  if (rawCreatedDateFrom && !createdDateFrom) {
    throw new ApiFetchError("createdDateFrom must be in yyyy-MM-dd format.");
  }
  if (rawCreatedDateTo && !createdDateTo) {
    throw new ApiFetchError("createdDateTo must be in yyyy-MM-dd format.");
  }
  const preferredSearchKey = safeText(payload?.searchKey || payload?.filter);
  const legacyFilter = safeText(payload?.filter || preferredSearchKey);
  const safePayload = {
    page: Number.isFinite(payload?.page) && payload.page > 0 ? Math.floor(payload.page) : 1,
    pageSize: Number.isFinite(payload?.pageSize) && payload.pageSize > 0 ? Math.floor(payload.pageSize) : 50,
    createdDateFrom: createdDateFrom || void 0,
    createdDateTo: createdDateTo || void 0,
    searchKey: preferredSearchKey || void 0,
    filter: legacyFilter || void 0,
    status: normalizeOptionalTicketStatus(payload?.status),
    currencyCode: safeText(payload?.currencyCode).toUpperCase() || void 0,
    gastoType: normalizeOptionalTicketGastoType(payload?.gastoType),
    processedByAI: normalizeOptionalTicketProcessedByAI(payload?.processedByAI)
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
  return normalizeTicketListPagedResponse(response);
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
  return normalizeTicketDetailPagedResponse(response);
};
var updateExpenseSheetTicket = async (fileId, payload, options) => {
  const context = await ensureExpenseApiContext(options);
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  const safePayload = {
    ...payload,
    gastoType: normalizeOptionalTicketGastoType(payload?.gastoType)
  };
  const response = await fetchJson(`/api/crm/expensesheets/tickets/${safeFileId}`, {
    ...options,
    method: "PUT",
    headers: buildExpenseHeaders(context, options, true),
    body: JSON.stringify(safePayload)
  });
  return normalizeApiResponse(response);
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
  return normalizeApiResponse(response);
};
var updateExpenseSheetTicketLine = async (fileId, lineRecId, payload, options) => {
  if (!safeText(payload?.description) || !isPositiveNumber(payload?.qty) || !isPositiveNumber(payload?.price)) {
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
  return normalizeApiResponse(response);
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
  return normalizeApiResponse(response);
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
var safeText2 = (value) => {
  if (value === null || value === void 0) return "";
  return String(value).trim();
};
var normalizeCardTitleText = (value, fallback = "-") => {
  const source = safeText2(value);
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
  const voucher = safeText2(value).toUpperCase();
  if (!voucher) return false;
  return voucher !== "-" && voucher !== "." && voucher !== "0";
};
var startOfDay = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};
var toIsoDate = (date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};
var parseExpenseDate = (raw) => {
  if (!raw) return null;
  const value = String(raw).trim();
  if (!value) return null;
  const dateOnly = value.split("T")[0].split(" ")[0];
  if (/^\d{2}[./-]\d{2}[./-]\d{4}$/.test(dateOnly)) {
    const [day, month, year] = dateOnly.split(/[./-]/).map(Number);
    return new Date(year, month - 1, day);
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateOnly)) {
    const [year, month, day] = dateOnly.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
  if (/^\d{4}[./-]\d{2}[./-]\d{2}$/.test(dateOnly)) {
    const [year, month, day] = dateOnly.split(/[./-]/).map(Number);
    return new Date(year, month - 1, day);
  }
  if (/^\d{8}$/.test(dateOnly)) {
    const year = Number(dateOnly.slice(0, 4));
    const month = Number(dateOnly.slice(4, 6));
    const day = Number(dateOnly.slice(6, 8));
    return new Date(year, month - 1, day);
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
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
var formatExpenseDateParts = (raw, locale = "es-ES") => {
  const date = parseExpenseDate(raw);
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
  configureExpenseApiAuth,
  mapExpenseSheetListItemToCard,
  mapExpenseSheetHeader,
  mapExpenseSheetLine,
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
  fetchExpenseSheetTicketsList,
  fetchExpenseSheetTicket,
  updateExpenseSheetTicket,
  deleteExpenseSheetTicket,
  updateExpenseSheetTicketLine,
  deleteExpenseSheetTicketLine,
  fetchExpenseProjects,
  safeText2 as safeText,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZXhwZW5zZUZvcm1hdHRlcnMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlQXBpLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZVVpVXRpbHMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgRVhQRU5TRV9OVU1CRVJfTE9DQUxFID0gXCJlbi1VU1wiO1xuXG50eXBlIEV4cGVuc2VOdW1iZXJGb3JtYXRPcHRpb25zID0ge1xuICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM/OiBudW1iZXI7XG4gIG1heGltdW1GcmFjdGlvbkRpZ2l0cz86IG51bWJlcjtcbiAgdXNlR3JvdXBpbmc/OiBib29sZWFuO1xuICBmYWxsYmFjaz86IHN0cmluZztcbn07XG5cbmNvbnN0IHNhbml0aXplTnVtZXJpY1Rva2VuID0gKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gdmFsdWUucmVwbGFjZSgvW15cXGQuLCstXS9nLCBcIlwiKTtcbn07XG5cbmNvbnN0IGlzVGhvdXNhbmRzR3JvdXBlZEludGVnZXIgPSAodmFsdWU6IHN0cmluZywgc2VwYXJhdG9yOiBcIixcIiB8IFwiLlwiKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IHBhcnRzID0gdmFsdWUuc3BsaXQoc2VwYXJhdG9yKTtcbiAgaWYgKHBhcnRzLmxlbmd0aCA8PSAxKSByZXR1cm4gZmFsc2U7XG4gIGlmIChwYXJ0cy5zb21lKChwYXJ0KSA9PiAhL15cXGQrJC8udGVzdChwYXJ0KSkpIHJldHVybiBmYWxzZTtcbiAgaWYgKHBhcnRzWzBdLmxlbmd0aCA8IDEgfHwgcGFydHNbMF0ubGVuZ3RoID4gMykgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gcGFydHMuc2xpY2UoMSkuZXZlcnkoKHBhcnQpID0+IHBhcnQubGVuZ3RoID09PSAzKTtcbn07XG5cbi8vIFBhcnNlcyBudW1lcmljIGlucHV0IHN1cHBvcnRpbmcgYm90aCBncm91cGVkIGFuZCBkZWNpbWFsIHZhbHVlcy5cbmV4cG9ydCBjb25zdCBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQgPSAocmF3OiBzdHJpbmcgfCBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIGlmIChyYXcgPT09IG51bGwgfHwgcmF3ID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xuICBpZiAodHlwZW9mIHJhdyA9PT0gXCJudW1iZXJcIikgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShyYXcpID8gcmF3IDogbnVsbDtcblxuICBsZXQgdmFsdWUgPSBzYW5pdGl6ZU51bWVyaWNUb2tlbihTdHJpbmcocmF3IHx8IFwiXCIpLnRyaW0oKS5yZXBsYWNlKC9cXHMrL2csIFwiXCIpKTtcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XG5cbiAgbGV0IHNpZ24gPSBcIlwiO1xuICBpZiAodmFsdWUuc3RhcnRzV2l0aChcIi1cIikpIHtcbiAgICBzaWduID0gXCItXCI7XG4gICAgdmFsdWUgPSB2YWx1ZS5zbGljZSgxKTtcbiAgfSBlbHNlIGlmICh2YWx1ZS5zdGFydHNXaXRoKFwiK1wiKSkge1xuICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMSk7XG4gIH1cblxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1srLV0vZywgXCJcIik7XG4gIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGhhc0NvbW1hID0gdmFsdWUuaW5jbHVkZXMoXCIsXCIpO1xuICBjb25zdCBoYXNEb3QgPSB2YWx1ZS5pbmNsdWRlcyhcIi5cIik7XG5cbiAgaWYgKGhhc0NvbW1hICYmICFoYXNEb3QgJiYgaXNUaG91c2FuZHNHcm91cGVkSW50ZWdlcih2YWx1ZSwgXCIsXCIpKSB7XG4gICAgY29uc3QgcGFyc2VkSW50ZWdlciA9IE51bWJlcihgJHtzaWdufSR7dmFsdWUucmVwbGFjZSgvLC9nLCBcIlwiKX1gKTtcbiAgICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZEludGVnZXIpID8gcGFyc2VkSW50ZWdlciA6IG51bGw7XG4gIH1cblxuICBpZiAoaGFzRG90ICYmICFoYXNDb21tYSAmJiBpc1Rob3VzYW5kc0dyb3VwZWRJbnRlZ2VyKHZhbHVlLCBcIi5cIikpIHtcbiAgICBjb25zdCBwYXJzZWRJbnRlZ2VyID0gTnVtYmVyKGAke3NpZ259JHt2YWx1ZS5yZXBsYWNlKC9cXC4vZywgXCJcIil9YCk7XG4gICAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWRJbnRlZ2VyKSA/IHBhcnNlZEludGVnZXIgOiBudWxsO1xuICB9XG5cbiAgY29uc3QgbGFzdENvbW1hID0gdmFsdWUubGFzdEluZGV4T2YoXCIsXCIpO1xuICBjb25zdCBsYXN0RG90ID0gdmFsdWUubGFzdEluZGV4T2YoXCIuXCIpO1xuICBjb25zdCBkZWNpbWFsU2VwYXJhdG9ySW5kZXggPSBNYXRoLm1heChsYXN0Q29tbWEsIGxhc3REb3QpO1xuXG4gIGxldCBub3JtYWxpemVkOiBzdHJpbmc7XG4gIGlmIChkZWNpbWFsU2VwYXJhdG9ySW5kZXggPj0gMCkge1xuICAgIGNvbnN0IGludGVnZXJQYXJ0ID0gdmFsdWUuc2xpY2UoMCwgZGVjaW1hbFNlcGFyYXRvckluZGV4KS5yZXBsYWNlKC9bLixdL2csIFwiXCIpO1xuICAgIGNvbnN0IGRlY2ltYWxQYXJ0ID0gdmFsdWUuc2xpY2UoZGVjaW1hbFNlcGFyYXRvckluZGV4ICsgMSkucmVwbGFjZSgvWy4sXS9nLCBcIlwiKTtcbiAgICBub3JtYWxpemVkID0gYCR7c2lnbn0ke2ludGVnZXJQYXJ0IHx8IFwiMFwifSR7ZGVjaW1hbFBhcnQgPyBgLiR7ZGVjaW1hbFBhcnR9YCA6IFwiXCJ9YDtcbiAgfSBlbHNlIHtcbiAgICBub3JtYWxpemVkID0gYCR7c2lnbn0ke3ZhbHVlLnJlcGxhY2UoL1suLF0vZywgXCJcIil9YDtcbiAgfVxuXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcihub3JtYWxpemVkKTtcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpID8gcGFyc2VkIDogbnVsbDtcbn07XG5cbi8vIEZvcm1hdHMgbnVtZXJpYyB2YWx1ZXMgd2l0aCB0aGUgZml4ZWQgZXhwZW5zZSB2aXN1YWwgY29udHJhY3Q6ICMsIyMwLjAwXG5leHBvcnQgY29uc3QgZm9ybWF0RXhwZW5zZU51bWJlciA9IChcbiAgdmFsdWU6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQsXG4gIG9wdGlvbnM/OiBFeHBlbnNlTnVtYmVyRm9ybWF0T3B0aW9uc1xuKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZmFsbGJhY2sgPSBvcHRpb25zPy5mYWxsYmFjayA/PyBcIi1cIjtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgTnVtYmVyLmlzTmFOKE51bWJlcih2YWx1ZSkpKSB7XG4gICAgcmV0dXJuIGZhbGxiYWNrO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChFWFBFTlNFX05VTUJFUl9MT0NBTEUsIHtcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IG9wdGlvbnM/Lm1pbmltdW1GcmFjdGlvbkRpZ2l0cyA/PyAyLFxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogb3B0aW9ucz8ubWF4aW11bUZyYWN0aW9uRGlnaXRzID8/IDIsXG4gICAgdXNlR3JvdXBpbmc6IG9wdGlvbnM/LnVzZUdyb3VwaW5nID8/IHRydWUsXG4gIH0pLmZvcm1hdChOdW1iZXIodmFsdWUpKTtcbn07XG5cbi8vIFBhcnNlcyBhbmQgZm9ybWF0cyByYXcgaW5wdXQgdmFsdWVzIHRvIHRoZSBmaXhlZCBleHBlbnNlIHZpc3VhbCBjb250cmFjdC5cbmV4cG9ydCBjb25zdCBmb3JtYXRFeHBlbnNlSW5wdXROdW1iZXIgPSAoXG4gIHJhdzogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCxcbiAgb3B0aW9ucz86IEV4cGVuc2VOdW1iZXJGb3JtYXRPcHRpb25zXG4pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZUV4cGVuc2VOdW1lcmljSW5wdXQocmF3KTtcbiAgaWYgKHBhcnNlZCA9PT0gbnVsbCkge1xuICAgIHJldHVybiBvcHRpb25zPy5mYWxsYmFjayA/PyBcIlwiO1xuICB9XG5cbiAgcmV0dXJuIGZvcm1hdEV4cGVuc2VOdW1iZXIocGFyc2VkLCB7XG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBvcHRpb25zPy5taW5pbXVtRnJhY3Rpb25EaWdpdHMgPz8gMixcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IG9wdGlvbnM/Lm1heGltdW1GcmFjdGlvbkRpZ2l0cyA/PyAyLFxuICAgIHVzZUdyb3VwaW5nOiBvcHRpb25zPy51c2VHcm91cGluZyA/PyB0cnVlLFxuICAgIGZhbGxiYWNrOiBvcHRpb25zPy5mYWxsYmFjayA/PyBcIlwiLFxuICB9KTtcbn07XG4iLCAiaW1wb3J0IHsgZm9ybWF0RXhwZW5zZU51bWJlciB9IGZyb20gXCIuL3V0aWxzL2V4cGVuc2VOdW1iZXJGb3JtYXQudHNcIjtcblxuLy8gRm9ybWF0cyBhIG51bWVyaWMgYW1vdW50IHdpdGggZml4ZWQgVUkgbnVtYmVyIHN0eWxlIGFuZCBvcHRpb25hbCBjdXJyZW5jeSBjb2RlLlxuZXhwb3J0IGNvbnN0IGZvcm1hdEFtb3VudFdpdGhDdXJyZW5jeSA9IChcbiAgYW1vdW50OiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkLFxuICBjdXJyZW5jeUNvZGU/OiBzdHJpbmcsXG4gIF9sb2NhbGU/OiBzdHJpbmdcbik6IHN0cmluZyA9PiB7XG4gIGlmIChhbW91bnQgPT09IG51bGwgfHwgYW1vdW50ID09PSB1bmRlZmluZWQgfHwgTnVtYmVyLmlzTmFOKE51bWJlcihhbW91bnQpKSkge1xuICAgIHJldHVybiBcIi1cIjtcbiAgfVxuXG4gIGNvbnN0IHNhZmVDdXJyZW5jeSA9IFN0cmluZyhjdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IGRlY2ltYWxUZXh0ID0gZm9ybWF0RXhwZW5zZU51bWJlcihhbW91bnQsIHtcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgIHVzZUdyb3VwaW5nOiB0cnVlLFxuICAgIGZhbGxiYWNrOiBcIi1cIixcbiAgfSk7XG5cbiAgaWYgKHNhZmVDdXJyZW5jeSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KFwiZW4tVVNcIiwge1xuICAgICAgICBzdHlsZTogXCJjdXJyZW5jeVwiLFxuICAgICAgICBjdXJyZW5jeTogc2FmZUN1cnJlbmN5LFxuICAgICAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICAgIH0pLmZvcm1hdChhbW91bnQpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gRmFsbCBiYWNrIHRvIGRlY2ltYWwgKyBjb2RlIHdoZW4gY3VycmVuY3kgY29kZSBpcyBpbnZhbGlkLlxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzYWZlQ3VycmVuY3kgPyBgJHtkZWNpbWFsVGV4dH0gJHtzYWZlQ3VycmVuY3l9YCA6IGRlY2ltYWxUZXh0O1xufTtcbiIsICJpbXBvcnQgeyBBcGlGZXRjaEVycm9yLCBmZXRjaEpzb24sIHR5cGUgQXBpRmV0Y2hPcHRpb25zIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB0eXBlIHtcbiAgRW50cmFDb250ZXh0RHRvLFxuICBFbnRyYUNvbnRleHRSZXF1ZXN0LFxuICBFeGNoYW5nZVJhdGVEdG8sXG4gIEV4cGVuc2VHYXN0b1R5cGVDb2RlLFxuICBGdWVsUHJpY2VLbUR0byxcbiAgRXhwZW5zZVNoZWV0Q2FyZCxcbiAgRXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8sXG4gIEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldENyZWF0ZVJlc3BvbnNlRGF0YSxcbiAgRXhwZW5zZVNoZWV0RGV0YWlsRHRvLFxuICBFeHBlbnNlU2hlZXREcmFmdFJlc3BvbnNlLFxuICBFeHBlbnNlU2hlZXRIZWFkZXIsXG4gIEV4cGVuc2VTaGVldEhlYWRlclVwZGF0ZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldExpbmUsXG4gIEV4cGVuc2VTaGVldExpbmVEdG8sXG4gIEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVzcG9uc2VEYXRhLFxuICBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8sXG4gIEV4cGVuc2VTaGVldFRpY2tldENyZWF0ZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldFRpY2tldERldGFpbER0byxcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGluZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvLFxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0byxcbiAgSW5kQXBpUmVzcG9uc2UsXG4gIEluZFBhZ2VkUmVzcG9uc2UsXG59IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcblxudHlwZSBQcm9qZWN0RHJvcGRvd25SZXNwb25zZSA9IHtcbiAgdG90YWw/OiBudW1iZXI7XG4gIGl0ZW1zPzogQXJyYXk8eyB2YWx1ZT86IHN0cmluZzsgdGV4dD86IHN0cmluZyB9Pjtcbn07XG5cbnR5cGUgTGVnYWN5RXhwZW5zZUxpc3RJdGVtID0ge1xuICBob2phR2FzdG9zSWQ/OiB1bmtub3duO1xuICBkZXNjcmlwdGlvbj86IHVua25vd247XG4gIGVzdGFkb0NvbWVudGFyaW9zPzogdW5rbm93bjtcbiAgdm91Y2hlcj86IHVua25vd247XG4gIHByb2pJZD86IHVua25vd247XG4gIGN1cnJlbmN5Q29kZT86IHVua25vd247XG4gIHRvdGFsQW1vdW50PzogdW5rbm93bjtcbiAgdG90YWxBbW91bnRNU1Q/OiB1bmtub3duO1xuICBleGNoUmF0ZT86IHVua25vd247XG4gIHVzZXJJZD86IHVua25vd247XG4gIGV4Y2hhbmdlUmF0ZU1vZGU/OiB1bmtub3duO1xuICBleHBlbnNlU2hlZXRTdGF0dXM/OiB1bmtub3duO1xuICBjcmVhdGVkRGF0ZT86IHVua25vd247XG59O1xuXG50eXBlIExlZ2FjeUV4cGVuc2VMaXN0UmVzcG9uc2UgPSB7XG4gIHN1Y2Nlc3M/OiBib29sZWFuO1xuICBtZXNzYWdlPzogc3RyaW5nO1xuICB0b3RhbD86IG51bWJlcjtcbiAgcGFnZT86IG51bWJlcjtcbiAgcGFnZVNpemU/OiBudW1iZXI7XG4gIGl0ZW1zPzogTGVnYWN5RXhwZW5zZUxpc3RJdGVtW107XG59O1xuXG50eXBlIEV4cGVuc2VBcGlDb250ZXh0ID0ge1xuICB0b2tlbjogc3RyaW5nO1xuICBjb21wYW55SWQ6IHN0cmluZztcbiAgYXhVc2VySWQ6IHN0cmluZztcbiAgZGVmYXVsdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xufTtcblxudHlwZSBFeHBlbnNlQXBpQXV0aFNlZWQgPSB7XG4gIHRva2VuOiBzdHJpbmc7XG4gIGVudHJhT2lkOiBzdHJpbmc7XG4gIGFwcENvZGU6IHN0cmluZztcbiAgc3RyaWN0QXBpUm91dGVzOiBib29sZWFuO1xufTtcblxudHlwZSBFeHBlbnNlV2luZG93UnVudGltZSA9IHtcbiAgX19JTkRfQVBJX1RPS0VOX18/OiBzdHJpbmc7XG4gIF9fSU5EX0VOVFJBX09JRF9fPzogc3RyaW5nO1xuICBfX0lORF9BUFBfQ09ERV9fPzogc3RyaW5nO1xuICBfX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18/OiBzdHJpbmc7XG4gIF9fSU5EX0VYUEVOU0VfU1RSSUNUX0FQSV9fPzogYm9vbGVhbiB8IHN0cmluZztcbiAgX19FWFBFTlNFX0dBU1RPX1RZUEVTX18/OiBBcnJheTx7XG4gICAgdmFsdWU/OiB1bmtub3duO1xuICAgIFZhbHVlPzogdW5rbm93bjtcbiAgICB0ZXh0PzogdW5rbm93bjtcbiAgICBUZXh0PzogdW5rbm93bjtcbiAgfT47XG59O1xuXG50eXBlIEV4cGVuc2VHYXN0b1R5cGVFbnRyeSA9IE5vbk51bGxhYmxlPEV4cGVuc2VXaW5kb3dSdW50aW1lW1wiX19FWFBFTlNFX0dBU1RPX1RZUEVTX19cIl0+W251bWJlcl07XG5cbmNvbnN0IERFRkFVTFRfQVBQX0NPREUgPSBcIkNSTVwiO1xuY29uc3QgSlNPTl9IRUFERVJTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbn07XG5jb25zdCBBTExPV0VEX0dBU1RPX1RZUEVfQ09ERVMgPSBuZXcgU2V0PG51bWJlcj4oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XG5cbmxldCBydW50aW1lQXV0aFNlZWQ6IFBhcnRpYWw8RXhwZW5zZUFwaUF1dGhTZWVkPiA9IHt9O1xubGV0IGNhY2hlZENvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0IHwgbnVsbCA9IG51bGw7XG5sZXQgY2FjaGVkQ29udGV4dEtleSA9IFwiXCI7XG5sZXQgY29udGV4dFByb21pc2U6IFByb21pc2U8RXhwZW5zZUFwaUNvbnRleHQ+IHwgbnVsbCA9IG51bGw7XG5jb25zdCBjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcyA9IG5ldyBNYXA8c3RyaW5nLCBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj4oKTtcbmNvbnN0IHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzID0gbmV3IE1hcDxzdHJpbmcsIFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+PigpO1xuXG5jb25zdCBzYWZlVGV4dCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJcIjtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSkudHJpbSgpO1xufTtcblxuY29uc3QgdG9OdWxsYWJsZU51bWJlciA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSA/IHBhcnNlZCA6IG51bGw7XG59O1xuXG5jb25zdCBpc05vbk5lZ2F0aXZlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHRvTnVsbGFibGVOdW1iZXIodmFsdWUpO1xuICByZXR1cm4gcGFyc2VkICE9PSBudWxsICYmIHBhcnNlZCA+PSAwO1xufTtcblxuY29uc3QgaXNQb3NpdGl2ZU51bWJlciA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBwYXJzZWQgPSB0b051bGxhYmxlTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIHBhcnNlZCAhPT0gbnVsbCAmJiBwYXJzZWQgPiAwO1xufTtcblxuY29uc3QgaXNWYWxpZExpc3RFeHBlbnNlU2hlZXRTdGF0dXMgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcbiAgY29uc3QgcGFyc2VkID0gdG9OdWxsYWJsZU51bWJlcih2YWx1ZSk7XG4gIHJldHVybiBwYXJzZWQgIT09IG51bGwgJiYgTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpICYmIHBhcnNlZCA+PSAwICYmIHBhcnNlZCA8PSA0O1xufTtcblxuY29uc3QgdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlR2FzdG9UeXBlQ29kZSB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJzZWQgPSB0b051bGxhYmxlTnVtYmVyKHZhbHVlKTtcbiAgaWYgKHBhcnNlZCA9PT0gbnVsbCB8fCAhTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpIHx8ICFBTExPV0VEX0dBU1RPX1RZUEVfQ09ERVMuaGFzKHBhcnNlZCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBwYXJzZWQgYXMgRXhwZW5zZUdhc3RvVHlwZUNvZGU7XG59O1xuXG5jb25zdCBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZSA9ICh2YWx1ZTogdW5rbm93bik6IEV4cGVuc2VHYXN0b1R5cGVDb2RlIHwgdW5kZWZpbmVkID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgc2FmZVRleHQodmFsdWUpID09PSBcIlwiKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IHBhcnNlZCA9IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlKHZhbHVlKTtcbiAgaWYgKHBhcnNlZCA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZ2FzdG9UeXBlIG11c3QgYmUgb25lIG9mOiAwLDEsMiwzLDQsNSw2LDcsOCwxNC5cIik7XG4gIH1cblxuICByZXR1cm4gcGFyc2VkO1xufTtcblxuY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRTdGF0dXMgPSAodmFsdWU6IHVua25vd24pOiAwIHwgMSB8IHVuZGVmaW5lZCA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHNhZmVUZXh0KHZhbHVlKSA9PT0gXCJcIikge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBwYXJzZWQgPSB0b051bGxhYmxlTnVtYmVyKHZhbHVlKTtcbiAgaWYgKHBhcnNlZCA9PT0gMCB8fCBwYXJzZWQgPT09IDEpIHtcbiAgICByZXR1cm4gcGFyc2VkO1xuICB9XG5cbiAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJzdGF0dXMgbXVzdCBiZSAwIG9yIDEuXCIpO1xufTtcblxuY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdERhdGUgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBjb25zdCByYXcgPSBzYWZlVGV4dCh2YWx1ZSk7XG4gIGlmICghcmF3KSByZXR1cm4gXCJcIjtcblxuICBjb25zdCBkYXRlT25seSA9IHJhdy5zcGxpdChcIlRcIilbMF0uc3BsaXQoXCIgXCIpWzBdO1xuICBpZiAoL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QoZGF0ZU9ubHkpKSB7XG4gICAgcmV0dXJuIGRhdGVPbmx5O1xuICB9XG5cbiAgaWYgKC9eXFxkezh9JC8udGVzdChkYXRlT25seSkpIHtcbiAgICBjb25zdCB5ZWFyID0gZGF0ZU9ubHkuc2xpY2UoMCwgNCk7XG4gICAgY29uc3QgbW9udGggPSBkYXRlT25seS5zbGljZSg0LCA2KTtcbiAgICBjb25zdCBkYXkgPSBkYXRlT25seS5zbGljZSg2LCA4KTtcbiAgICByZXR1cm4gYCR7eWVhcn0tJHttb250aH0tJHtkYXl9YDtcbiAgfVxuXG4gIGNvbnN0IHBhcnNlZCA9IG5ldyBEYXRlKHJhdyk7XG4gIGlmIChOdW1iZXIuaXNOYU4ocGFyc2VkLmdldFRpbWUoKSkpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxuXG4gIGNvbnN0IHllYXIgPSBTdHJpbmcocGFyc2VkLmdldEZ1bGxZZWFyKCkpO1xuICBjb25zdCBtb250aCA9IFN0cmluZyhwYXJzZWQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgY29uc3QgZGF5ID0gU3RyaW5nKHBhcnNlZC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcbiAgcmV0dXJuIGAke3llYXJ9LSR7bW9udGh9LSR7ZGF5fWA7XG59O1xuXG5jb25zdCB0b051bGxhYmxlQm9vbCA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gfCBudWxsID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIikgcmV0dXJuIHZhbHVlO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IHZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChub3JtYWxpemVkID09PSBcInRydWVcIiB8fCBub3JtYWxpemVkID09PSBcIjFcIikgcmV0dXJuIHRydWU7XG4gICAgaWYgKG5vcm1hbGl6ZWQgPT09IFwiZmFsc2VcIiB8fCBub3JtYWxpemVkID09PSBcIjBcIikgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICBpZiAodmFsdWUgPT09IDEpIHJldHVybiB0cnVlO1xuICAgIGlmICh2YWx1ZSA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRQcm9jZXNzZWRCeUFJID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiB8IHVuZGVmaW5lZCA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHNhZmVUZXh0KHZhbHVlKSA9PT0gXCJcIikge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBwYXJzZWQgPSB0b051bGxhYmxlQm9vbCh2YWx1ZSk7XG4gIGlmIChwYXJzZWQgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcInByb2Nlc3NlZEJ5QUkgbXVzdCBiZSB0cnVlIG9yIGZhbHNlLlwiKTtcbiAgfVxuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuXG5jb25zdCB0b0ZsYWdCb29sID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiB8IG51bGwgPT4ge1xuICBjb25zdCBub3JtYWxpemVkQm9vbCA9IHRvTnVsbGFibGVCb29sKHZhbHVlKTtcbiAgaWYgKG5vcm1hbGl6ZWRCb29sICE9PSBudWxsKSByZXR1cm4gbm9ybWFsaXplZEJvb2w7XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIG51bGw7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSB2YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gbnVsbDtcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwib25cIiB8fCBub3JtYWxpemVkID09PSBcInllc1wiIHx8IG5vcm1hbGl6ZWQgPT09IFwieVwiKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwib2ZmXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJub1wiIHx8IG5vcm1hbGl6ZWQgPT09IFwiblwiKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBudWxsO1xufTtcblxuY29uc3QgcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lID0gKCk6IEV4cGVuc2VXaW5kb3dSdW50aW1lID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiB7fTtcbiAgcmV0dXJuIHdpbmRvdyBhcyB1bmtub3duIGFzIEV4cGVuc2VXaW5kb3dSdW50aW1lO1xufTtcblxuY29uc3Qgc2FuaXRpemVIZWFkZXJzID0gKGhlYWRlcnM6IEhlYWRlcnNJbml0IHwgdW5kZWZpbmVkKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9PiB7XG4gIGlmICghaGVhZGVycykgcmV0dXJuIHt9O1xuXG4gIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgIGNvbnN0IHJlc3VsdDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICAgIGhlYWRlcnMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcbiAgICByZXR1cm4gaGVhZGVycy5yZWR1Y2U8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4oKGFjYywgW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICBhY2NbU3RyaW5nKGtleSldID0gU3RyaW5nKHZhbHVlKTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGhlYWRlcnMpLnJlZHVjZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PigoYWNjLCBba2V5LCB2YWx1ZV0pID0+IHtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuIGFjYztcbiAgICBhY2Nba2V5XSA9IFN0cmluZyh2YWx1ZSk7XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xufTtcblxuY29uc3QgZ2V0SGVhZGVyVmFsdWUgPSAoaGVhZGVyczogSGVhZGVyc0luaXQgfCB1bmRlZmluZWQsIGtleTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZEtleSA9IGtleS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHNhbml0aXplSGVhZGVycyhoZWFkZXJzKSk7XG4gIGNvbnN0IG1hdGNoID0gZW50cmllcy5maW5kKChbaGVhZGVyS2V5XSkgPT4gaGVhZGVyS2V5LnRyaW0oKS50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkS2V5KTtcbiAgcmV0dXJuIHNhZmVUZXh0KG1hdGNoPy5bMV0pO1xufTtcblxuY29uc3QgcmVtb3ZlSGVhZGVyVmFsdWUgPSAoaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiwga2V5OiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZEtleSA9IGtleS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgdG9EZWxldGUgPSBPYmplY3Qua2V5cyhoZWFkZXJzKS5maW5kKChoZWFkZXJLZXkpID0+IGhlYWRlcktleS50cmltKCkudG9Mb3dlckNhc2UoKSA9PT0gbm9ybWFsaXplZEtleSk7XG4gIGlmICghdG9EZWxldGUpIHJldHVybjtcbiAgZGVsZXRlIGhlYWRlcnNbdG9EZWxldGVdO1xufTtcblxuY29uc3QgcmVzb2x2ZUJlYXJlclRva2VuID0gKGhlYWRlcnM6IEhlYWRlcnNJbml0IHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcbiAgY29uc3QgYXV0aG9yaXphdGlvbiA9IGdldEhlYWRlclZhbHVlKGhlYWRlcnMsIFwiQXV0aG9yaXphdGlvblwiKTtcbiAgaWYgKCFhdXRob3JpemF0aW9uKSByZXR1cm4gXCJcIjtcblxuICBpZiAoL15iZWFyZXJcXHMrL2kudGVzdChhdXRob3JpemF0aW9uKSkge1xuICAgIHJldHVybiBhdXRob3JpemF0aW9uLnJlcGxhY2UoL15iZWFyZXJcXHMrL2ksIFwiXCIpLnRyaW0oKTtcbiAgfVxuXG4gIHJldHVybiBhdXRob3JpemF0aW9uLnRyaW0oKTtcbn07XG5cbmNvbnN0IHJlYWRXaW5kb3dBdXRoU2VlZCA9ICgpOiBQYXJ0aWFsPEV4cGVuc2VBcGlBdXRoU2VlZD4gPT4ge1xuICBjb25zdCBydW50aW1lV2luZG93ID0gcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lKCk7XG5cbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogc2FmZVRleHQocnVudGltZVdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHJ1bnRpbWVXaW5kb3cuX19JTkRfRU5UUkFfT0lEX18pLFxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHJ1bnRpbWVXaW5kb3cuX19JTkRfQVBQX0NPREVfXyksXG4gICAgc3RyaWN0QXBpUm91dGVzOiB0b0ZsYWdCb29sKHJ1bnRpbWVXaW5kb3cuX19JTkRfRVhQRU5TRV9TVFJJQ1RfQVBJX18pID09PSB0cnVlLFxuICB9O1xufTtcblxuY29uc3QgcmVhZFJ1bnRpbWVTdHJpY3RBcGlGbGFnID0gKCk6IGJvb2xlYW4gPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBydW50aW1lV2luZG93ID0gcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lKCk7XG5cbiAgY29uc3QgZXhwbGljaXRXaW5kb3dGbGFnID0gdG9GbGFnQm9vbChydW50aW1lV2luZG93Ll9fSU5EX0VYUEVOU0VfU1RSSUNUX0FQSV9fKTtcbiAgcmV0dXJuIGV4cGxpY2l0V2luZG93RmxhZyA9PT0gdHJ1ZTtcbn07XG5cbmNvbnN0IHJlYWRXaW5kb3dTZWxlY3RlZENvbXBhbnkgPSAoKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIHNhZmVUZXh0KHJlYWRFeHBlbnNlV2luZG93UnVudGltZSgpLl9fSU5EX1NFTEVDVEVEX0NPTVBBTllfXykudG9VcHBlckNhc2UoKTtcbn07XG5cbmNvbnN0IGJ1aWxkQ29udGV4dEtleSA9IChzZWVkOiBFeHBlbnNlQXBpQXV0aFNlZWQpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gYCR7c2VlZC50b2tlbn18JHtzZWVkLmVudHJhT2lkfXwke3NlZWQuYXBwQ29kZX18JHtyZWFkV2luZG93U2VsZWN0ZWRDb21wYW55KCl9YDtcbn07XG5cbmNvbnN0IGJ1aWxkRXhwZW5zZUhlYWRlcnMgPSAoXG4gIGNvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zLFxuICBpbmNsdWRlSnNvbiA9IGZhbHNlLFxuICBpbmNsdWRlQXhVc2VySWQgPSB0cnVlXG4pOiBIZWFkZXJzSW5pdCA9PiB7XG4gIGNvbnN0IGJhc2UgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XG4gIGNvbnN0IG1lcmdlZDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHsgLi4uYmFzZSB9O1xuXG4gIGlmIChzYWZlVGV4dChjb250ZXh0LnRva2VuKSkge1xuICAgIG1lcmdlZC5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke2NvbnRleHQudG9rZW59YDtcbiAgfVxuXG4gIGlmIChzYWZlVGV4dChjb250ZXh0LmNvbXBhbnlJZCkpIHtcbiAgICBtZXJnZWRbXCJYLUlORC1Db21wYW55XCJdID0gY29udGV4dC5jb21wYW55SWQ7XG4gIH1cblxuICBpZiAoaW5jbHVkZUF4VXNlcklkICYmIHNhZmVUZXh0KGNvbnRleHQuYXhVc2VySWQpKSB7XG4gICAgbWVyZ2VkW1wiWC1JTkQtQXhVc2VySWRcIl0gPSBjb250ZXh0LmF4VXNlcklkO1xuICB9XG5cbiAgaWYgKGluY2x1ZGVKc29uKSB7XG4gICAgbWVyZ2VkW1wiQ29udGVudC1UeXBlXCJdID0gXCJhcHBsaWNhdGlvbi9qc29uXCI7XG4gIH1cblxuICByZXR1cm4gbWVyZ2VkO1xufTtcblxuY29uc3QgYnVpbGRFeHBlbnNlRm9ybUhlYWRlcnMgPSAoY29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQsIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBIZWFkZXJzSW5pdCA9PiB7XG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMoYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCBmYWxzZSkpO1xuICByZW1vdmVIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIkNvbnRlbnQtVHlwZVwiKTtcbiAgcmV0dXJuIGhlYWRlcnM7XG59O1xuXG5jb25zdCBidWlsZENvbnRleHRIZWFkZXJzID0gKHRva2VuOiBzdHJpbmcsIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBIZWFkZXJzSW5pdCA9PiB7XG4gIGNvbnN0IGJhc2UgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XG4gIGNvbnN0IG1lcmdlZDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICAuLi5iYXNlLFxuICAgIC4uLkpTT05fSEVBREVSUyxcbiAgfTtcblxuICBpZiAoc2FmZVRleHQodG9rZW4pKSB7XG4gICAgbWVyZ2VkLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7dG9rZW59YDtcbiAgfVxuXG4gIHJldHVybiBtZXJnZWQ7XG59O1xuXG5jb25zdCByZXNvbHZlQXV0aFRva2VuID0gKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBzdHJpbmcgPT4ge1xuICBjb25zdCB0b2tlbkZyb21IZWFkZXJzID0gcmVzb2x2ZUJlYXJlclRva2VuKG9wdGlvbnM/LmhlYWRlcnMpO1xuICBjb25zdCB3aW5kb3dTZWVkID0gcmVhZFdpbmRvd0F1dGhTZWVkKCk7XG4gIHJldHVybiBzYWZlVGV4dCh0b2tlbkZyb21IZWFkZXJzIHx8IHJ1bnRpbWVBdXRoU2VlZC50b2tlbiB8fCB3aW5kb3dTZWVkLnRva2VuKTtcbn07XG5cbmNvbnN0IHJlc29sdmVBdXRoU2VlZCA9IChvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogRXhwZW5zZUFwaUF1dGhTZWVkID0+IHtcbiAgY29uc3Qgd2luZG93U2VlZCA9IHJlYWRXaW5kb3dBdXRoU2VlZCgpO1xuICBjb25zdCB0b2tlbiA9IHJlc29sdmVBdXRoVG9rZW4ob3B0aW9ucyk7XG4gIGNvbnN0IGVudHJhT2lkID0gc2FmZVRleHQocnVudGltZUF1dGhTZWVkLmVudHJhT2lkIHx8IHdpbmRvd1NlZWQuZW50cmFPaWQpO1xuICBjb25zdCBhcHBDb2RlID0gc2FmZVRleHQocnVudGltZUF1dGhTZWVkLmFwcENvZGUgfHwgd2luZG93U2VlZC5hcHBDb2RlIHx8IERFRkFVTFRfQVBQX0NPREUpIHx8IERFRkFVTFRfQVBQX0NPREU7XG4gIGNvbnN0IHN0cmljdEFwaVJvdXRlcyA9XG4gICAgdHlwZW9mIHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXMgPT09IFwiYm9vbGVhblwiXG4gICAgICA/IHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXNcbiAgICAgIDogKHdpbmRvd1NlZWQuc3RyaWN0QXBpUm91dGVzID09PSB0cnVlKTtcblxuICByZXR1cm4ge1xuICAgIHRva2VuLFxuICAgIGVudHJhT2lkLFxuICAgIGFwcENvZGUsXG4gICAgc3RyaWN0QXBpUm91dGVzLFxuICB9O1xufTtcblxuY29uc3QgdmFsaWRhdGVDb250ZXh0UmVzcG9uc2UgPSAocmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RW50cmFDb250ZXh0RHRvPik6IEV4cGVuc2VBcGlDb250ZXh0ID0+IHtcbiAgaWYgKCFyZXNwb25zZS5TdWNjZXNzKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IocmVzcG9uc2UuTWVzc2FnZSB8fCBcIkNvdWxkIG5vdCBsb2FkIEVudHJhIGNvbnRleHQuXCIpO1xuICB9XG5cbiAgY29uc3QgZmlyc3QgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlLkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zWzBdIDogbnVsbDtcbiAgaWYgKCFmaXJzdCB8fCAhZmlyc3QuSGVhZGVyKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJDb3VsZCBub3QgbG9hZCBFbnRyYSBjb250ZXh0LlwiKTtcbiAgfVxuXG4gIGNvbnN0IGF4VXNlcklkID0gc2FmZVRleHQoZmlyc3QuSGVhZGVyLkF4VXNlcklkKTtcbiAgY29uc3QgZGVmYXVsdENvbXBhbnkgPSBzYWZlVGV4dChmaXJzdC5IZWFkZXIuRGVmYXVsdENvbXBhbnkpO1xuICBjb25zdCBkZWZhdWx0Q3VycmVuY3lDb2RlID0gc2FmZVRleHQoZmlyc3QuSGVhZGVyLkRlZmF1bHRDdXJyZW5jeUNvZGUpO1xuICBjb25zdCBjb21wYW5pZXMgPSBBcnJheS5pc0FycmF5KGZpcnN0LkNvbXBhbmllcykgPyBmaXJzdC5Db21wYW5pZXMgOiBbXTtcbiAgY29uc3QgZmFsbGJhY2tDb21wYW55ID0gc2FmZVRleHQoY29tcGFuaWVzLmZpbmQoKGl0ZW0pID0+IGl0ZW0uSXNEZWZhdWx0KT8uQ29tcGFueUlkKTtcbiAgY29uc3QgY29tcGFueUlkID0gZGVmYXVsdENvbXBhbnkgfHwgZmFsbGJhY2tDb21wYW55O1xuICBjb25zdCBzZWxlY3RlZENvbXBhbnkgPSBjb21wYW5pZXMuZmluZCgoaXRlbSkgPT4gc2FmZVRleHQoaXRlbS5Db21wYW55SWQpID09PSBjb21wYW55SWQpIHx8IGNvbXBhbmllc1swXTtcbiAgY29uc3QgYWxsb3dTZWxmTWFuYWdlbWVudCA9IHNlbGVjdGVkQ29tcGFueT8uQWxsb3dTZWxmTWFuYWdlbWVudCA9PT0gdHJ1ZTtcblxuICBpZiAoIWF4VXNlcklkIHx8ICFjb21wYW55SWQpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkNvdWxkIG5vdCByZXNvbHZlIEVudHJhIGNvbXBhbnkgY29udGV4dC5cIik7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRva2VuOiBcIlwiLFxuICAgIGNvbXBhbnlJZCxcbiAgICBheFVzZXJJZCxcbiAgICBkZWZhdWx0Q3VycmVuY3lDb2RlLFxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXG4gIH07XG59O1xuXG5jb25zdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dCA9IGFzeW5jIChvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogUHJvbWlzZTxFeHBlbnNlQXBpQ29udGV4dD4gPT4ge1xuICBjb25zdCBzZWVkID0gcmVzb2x2ZUF1dGhTZWVkKG9wdGlvbnMpO1xuICBjb25zdCBjb250ZXh0S2V5ID0gYnVpbGRDb250ZXh0S2V5KHNlZWQpO1xuXG4gIGlmIChjYWNoZWRDb250ZXh0ICYmIGNhY2hlZENvbnRleHRLZXkgPT09IGNvbnRleHRLZXkpIHtcbiAgICByZXR1cm4gY2FjaGVkQ29udGV4dDtcbiAgfVxuXG4gIGlmIChjb250ZXh0UHJvbWlzZSAmJiBjYWNoZWRDb250ZXh0S2V5ID09PSBjb250ZXh0S2V5KSB7XG4gICAgcmV0dXJuIGNvbnRleHRQcm9taXNlO1xuICB9XG5cbiAgY29uc3QgZmFsbGJhY2tDb21wYW55SWQgPSByZWFkV2luZG93U2VsZWN0ZWRDb21wYW55KCk7XG4gIGlmICghc2FmZVRleHQoc2VlZC5lbnRyYU9pZCkgJiYgZmFsbGJhY2tDb21wYW55SWQpIHtcbiAgICBjb25zdCBmYWxsYmFja0NvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0ID0ge1xuICAgICAgdG9rZW46IHNlZWQudG9rZW4sXG4gICAgICBjb21wYW55SWQ6IGZhbGxiYWNrQ29tcGFueUlkLFxuICAgICAgYXhVc2VySWQ6IFwiXCIsXG4gICAgICBkZWZhdWx0Q3VycmVuY3lDb2RlOiBcIlwiLFxuICAgICAgYWxsb3dTZWxmTWFuYWdlbWVudDogZ2xvYmFsVGhpcy5fX0lORF9BTExPV19TRUxGX01BTkFHRU1FTlRfXyA9PT0gdHJ1ZSxcbiAgICB9O1xuXG4gICAgY2FjaGVkQ29udGV4dCA9IGZhbGxiYWNrQ29udGV4dDtcbiAgICBjYWNoZWRDb250ZXh0S2V5ID0gY29udGV4dEtleTtcbiAgICByZXR1cm4gZmFsbGJhY2tDb250ZXh0O1xuICB9XG5cbiAgaWYgKCFzYWZlVGV4dChzZWVkLmVudHJhT2lkKSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiTWlzc2luZyBFbnRyYSBPSUQgZm9yIEVudHJhIGNvbnRleHQgcmVxdWVzdC5cIik7XG4gIH1cblxuICBjYWNoZWRDb250ZXh0S2V5ID0gY29udGV4dEtleTtcbiAgY29udGV4dFByb21pc2UgPSAoYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRleHRQYXlsb2FkOiBFbnRyYUNvbnRleHRSZXF1ZXN0ID0ge1xuICAgICAgZW50cmFPaWQ6IHNlZWQuZW50cmFPaWQsXG4gICAgICBhcHBDb2RlOiBzZWVkLmFwcENvZGUsXG4gICAgfTtcblxuICAgIGNvbnN0IGNvbnRleHRSZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEVudHJhQ29udGV4dER0bz4+KFwiL2FwaS9hdXRoL2VudHJhL2NvbnRleHRcIiwge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZENvbnRleHRIZWFkZXJzKHNlZWQudG9rZW4sIG9wdGlvbnMpLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY29udGV4dFBheWxvYWQpLFxuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzb2x2ZWQgPSB2YWxpZGF0ZUNvbnRleHRSZXNwb25zZShjb250ZXh0UmVzcG9uc2UpO1xuICAgIGNvbnN0IG5leHRDb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCA9IHtcbiAgICAgIC4uLnJlc29sdmVkLFxuICAgICAgdG9rZW46IHNlZWQudG9rZW4sXG4gICAgfTtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB3aW5kb3cuX19JTkRfQUxMT1dfU0VMRl9NQU5BR0VNRU5UX18gPSBuZXh0Q29udGV4dC5hbGxvd1NlbGZNYW5hZ2VtZW50O1xuICAgIH1cblxuICAgIGNhY2hlZENvbnRleHQgPSBuZXh0Q29udGV4dDtcbiAgICByZXR1cm4gbmV4dENvbnRleHQ7XG4gIH0pKCk7XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gYXdhaXQgY29udGV4dFByb21pc2U7XG4gIH0gZmluYWxseSB7XG4gICAgY29udGV4dFByb21pc2UgPSBudWxsO1xuICB9XG59O1xuXG5jb25zdCBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZSA9IChcbiAgcmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+XG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldExpc3RJdGVtRHRvPiA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4ucmVzcG9uc2UsXG4gICAgSXRlbXM6IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW10sXG4gIH07XG59O1xuXG5jb25zdCBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXREZXRhaWxEdG8+XG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldERldGFpbER0bz4gPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLnJlc3BvbnNlLFxuICAgIEl0ZW1zOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdLFxuICB9O1xufTtcblxuY29uc3Qgbm9ybWFsaXplQXBpUmVzcG9uc2UgPSA8VD4ocmVzcG9uc2U6IEluZEFwaVJlc3BvbnNlPFQ+KTogSW5kQXBpUmVzcG9uc2U8VD4gPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLnJlc3BvbnNlLFxuICAgIEVycm9yczogQXJyYXkuaXNBcnJheShyZXNwb25zZT8uRXJyb3JzKSA/IHJlc3BvbnNlLkVycm9ycyA6IHJlc3BvbnNlPy5FcnJvcnMgPz8gbnVsbCxcbiAgfTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZSA9IChcbiAgcmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+XG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPiA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4ucmVzcG9uc2UsXG4gICAgSXRlbXM6IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW10sXG4gIH07XG59O1xuXG5jb25zdCBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0bz5cbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG8+ID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5yZXNwb25zZSxcbiAgICBJdGVtczogQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXSxcbiAgfTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz5cbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8+ID0+IHtcbiAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgLi4uaXRlbSxcbiAgICBIb2phR2FzdG9zSWREaXNwbGF5OiBzYWZlVGV4dChcbiAgICAgIChpdGVtIGFzIHsgSG9qYUdhc3Rvc0lkRGlzcGxheT86IHVua25vd247IGhvamFHYXN0b3NJZERpc3BsYXk/OiB1bmtub3duIH0pPy5Ib2phR2FzdG9zSWREaXNwbGF5ID8/XG4gICAgICAgIChpdGVtIGFzIHsgSG9qYUdhc3Rvc0lkRGlzcGxheT86IHVua25vd247IGhvamFHYXN0b3NJZERpc3BsYXk/OiB1bmtub3duIH0pPy5ob2phR2FzdG9zSWREaXNwbGF5XG4gICAgKSxcbiAgICBHYXN0b1R5cGU6IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlKFxuICAgICAgKGl0ZW0gYXMgeyBHYXN0b1R5cGU/OiB1bmtub3duOyBnYXN0b1R5cGU/OiB1bmtub3duIH0pPy5HYXN0b1R5cGUgPz9cbiAgICAgICAgKGl0ZW0gYXMgeyBHYXN0b1R5cGU/OiB1bmtub3duOyBnYXN0b1R5cGU/OiB1bmtub3duIH0pPy5nYXN0b1R5cGVcbiAgICApLFxuICB9KSk7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5yZXNwb25zZSxcbiAgICBJdGVtczogbm9ybWFsaXplZEl0ZW1zLFxuICB9O1xufTtcblxuY29uc3Qgbm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZSA9IChcbiAgcmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvPlxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXREZXRhaWxEdG8+ID0+IHtcbiAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+ICh7XG4gICAgLi4uaXRlbSxcbiAgICBIb2phR2FzdG9zSWREaXNwbGF5OiBzYWZlVGV4dChcbiAgICAgIChpdGVtIGFzIHsgSG9qYUdhc3Rvc0lkRGlzcGxheT86IHVua25vd247IGhvamFHYXN0b3NJZERpc3BsYXk/OiB1bmtub3duIH0pPy5Ib2phR2FzdG9zSWREaXNwbGF5ID8/XG4gICAgICAgIChpdGVtIGFzIHsgSG9qYUdhc3Rvc0lkRGlzcGxheT86IHVua25vd247IGhvamFHYXN0b3NJZERpc3BsYXk/OiB1bmtub3duIH0pPy5ob2phR2FzdG9zSWREaXNwbGF5XG4gICAgKSxcbiAgICBHYXN0b1R5cGU6IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlKFxuICAgICAgKGl0ZW0gYXMgeyBHYXN0b1R5cGU/OiB1bmtub3duOyBnYXN0b1R5cGU/OiB1bmtub3duIH0pPy5HYXN0b1R5cGUgPz9cbiAgICAgICAgKGl0ZW0gYXMgeyBHYXN0b1R5cGU/OiB1bmtub3duOyBnYXN0b1R5cGU/OiB1bmtub3duIH0pPy5nYXN0b1R5cGVcbiAgICApLFxuICAgIExpbmVzOiBBcnJheS5pc0FycmF5KGl0ZW0/LkxpbmVzKSA/IGl0ZW0uTGluZXMgOiBbXSxcbiAgfSkpO1xuXG4gIHJldHVybiB7XG4gICAgLi4ucmVzcG9uc2UsXG4gICAgSXRlbXM6IG5vcm1hbGl6ZWRJdGVtcyxcbiAgfTtcbn07XG5cbmNvbnN0IGxvb2tzTGlrZUh0bWxEb2N1bWVudCA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xuICBjb25zdCByYXcgPSBzYWZlVGV4dCh2YWx1ZSkudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIHJhdy5zdGFydHNXaXRoKFwiPCFkb2N0eXBlIGh0bWxcIikgfHwgcmF3LnN0YXJ0c1dpdGgoXCI8aHRtbFwiKTtcbn07XG5cbmNvbnN0IGlzQXBpUm91dGVVbmF2YWlsYWJsZSA9IChlcnJvcjogdW5rbm93bik6IGVycm9yIGlzIEFwaUZldGNoRXJyb3IgPT4ge1xuICBpZiAoIShlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpKSByZXR1cm4gZmFsc2U7XG4gIGlmIChlcnJvci5zdGF0dXMgPT09IDQwNCB8fCBlcnJvci5zdGF0dXMgPT09IDQwNSkgcmV0dXJuIHRydWU7XG4gIHJldHVybiBlcnJvci5zdGF0dXMgPT09IHVuZGVmaW5lZCAmJiBsb29rc0xpa2VIdG1sRG9jdW1lbnQoZXJyb3IucmVzcG9uc2VCb2R5KTtcbn07XG5cbmNvbnN0IGlzU3RyaWN0QXBpUm91dGVzRW5hYmxlZCA9ICgpOiBib29sZWFuID0+IHtcbiAgaWYgKHR5cGVvZiBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzID09PSBcImJvb2xlYW5cIikge1xuICAgIHJldHVybiBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzO1xuICB9XG5cbiAgcmV0dXJuIHJlYWRSdW50aW1lU3RyaWN0QXBpRmxhZygpO1xufTtcblxuY29uc3Qgc2hvdWxkVXNlTGVnYWN5RmFsbGJhY2sgPSAoZXJyb3I6IHVua25vd24pOiBib29sZWFuID0+IHtcbiAgaWYgKGlzU3RyaWN0QXBpUm91dGVzRW5hYmxlZCgpKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBpc0FwaVJvdXRlVW5hdmFpbGFibGUoZXJyb3IpO1xufTtcblxuY29uc3QgdG9MZWdhY3lMaXN0UmVxdWVzdFBheWxvYWQgPSAocGF5bG9hZDogRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3QpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmaWx0ZXI6IHNhZmVUZXh0KHBheWxvYWQuZmlsdGVyKSxcbiAgICBob2phR2FzdG9zSWQ6IHNhZmVUZXh0KHBheWxvYWQuZmlsdGVyKSxcbiAgICBiaWxsZWRNb2RlOiBwYXlsb2FkLmJpbGxlZE1vZGUgPz8gMixcbiAgICBmcm9tRGF0ZTogc2FmZVRleHQocGF5bG9hZC5jcmVhdGVkRGF0ZUZyb20pLFxuICAgIHRvRGF0ZTogc2FmZVRleHQocGF5bG9hZC5jcmVhdGVkRGF0ZVRvKSxcbiAgICBwcm9qZWN0SWQ6IHNhZmVUZXh0KHBheWxvYWQucHJvaklkKSxcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KHBheWxvYWQuY3VycmVuY3lDb2RlKSxcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IGlzVmFsaWRMaXN0RXhwZW5zZVNoZWV0U3RhdHVzKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzKVxuICAgICAgPyBOdW1iZXIocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMpXG4gICAgICA6IHVuZGVmaW5lZCxcbiAgICBwYWdlOiBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZC5wYWdlKSAmJiBwYXlsb2FkLnBhZ2UgPiAwID8gcGF5bG9hZC5wYWdlIDogMSxcbiAgICBwYWdlU2l6ZTogTnVtYmVyLmlzRmluaXRlKHBheWxvYWQucGFnZVNpemUpICYmIHBheWxvYWQucGFnZVNpemUgPiAwID8gcGF5bG9hZC5wYWdlU2l6ZSA6IDUwLFxuICB9O1xufTtcblxuY29uc3QgbWFwTGVnYWN5TGlzdEl0ZW1Ub0FwaUxpc3RJdGVtID0gKGl0ZW06IExlZ2FjeUV4cGVuc2VMaXN0SXRlbSk6IEV4cGVuc2VTaGVldExpc3RJdGVtRHRvID0+IHtcbiAgcmV0dXJuIHtcbiAgICBIb2phR2FzdG9zSWQ6IHNhZmVUZXh0KGl0ZW0uaG9qYUdhc3Rvc0lkKSxcbiAgICBEZXNjcmlwdGlvbjogc2FmZVRleHQoaXRlbS5kZXNjcmlwdGlvbiksXG4gICAgRXhwZW5zZVNoZWV0U3RhdHVzOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uZXhwZW5zZVNoZWV0U3RhdHVzKSxcbiAgICBFc3RhZG9Db21lbnRhcmlvczogc2FmZVRleHQoaXRlbS5lc3RhZG9Db21lbnRhcmlvcykgfHwgbnVsbCxcbiAgICBVc2VySWQ6IHNhZmVUZXh0KGl0ZW0udXNlcklkKSB8fCBudWxsLFxuICAgIFZvdWNoZXI6IHNhZmVUZXh0KGl0ZW0udm91Y2hlciksXG4gICAgUHJvaklkOiBzYWZlVGV4dChpdGVtLnByb2pJZCksXG4gICAgQ3VycmVuY3lDb2RlOiBzYWZlVGV4dChpdGVtLmN1cnJlbmN5Q29kZSksXG4gICAgVG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS50b3RhbEFtb3VudCA/PyBpdGVtLnRvdGFsQW1vdW50TVNUKSxcbiAgICBFeGNoUmF0ZTogdG9OdWxsYWJsZU51bWJlcihpdGVtLmV4Y2hSYXRlKSxcbiAgICBFeGNoYW5nZVJhdGVNb2RlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uZXhjaGFuZ2VSYXRlTW9kZSksXG4gICAgQ3JlYXRlZERhdGU6IHNhZmVUZXh0KGl0ZW0uY3JlYXRlZERhdGUpIHx8IG51bGwsXG4gIH07XG59O1xuXG5jb25zdCBtYXBMZWdhY3lMaXN0UmVzcG9uc2UgPSAoXG4gIGxlZ2FjeTogTGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZSxcbiAgZmFsbGJhY2tQYWdlOiBudW1iZXIsXG4gIGZhbGxiYWNrUGFnZVNpemU6IG51bWJlclxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz4gPT4ge1xuICBjb25zdCBsZWdhY3lJdGVtcyA9IEFycmF5LmlzQXJyYXkobGVnYWN5Py5pdGVtcykgPyBsZWdhY3kuaXRlbXMgOiBbXTtcbiAgY29uc3QgbWFwcGVkSXRlbXMgPSBsZWdhY3lJdGVtcy5tYXAoKGVudHJ5KSA9PiBtYXBMZWdhY3lMaXN0SXRlbVRvQXBpTGlzdEl0ZW0oZW50cnkpKTtcblxuICByZXR1cm4ge1xuICAgIFN1Y2Nlc3M6IGxlZ2FjeS5zdWNjZXNzICE9PSBmYWxzZSxcbiAgICBNZXNzYWdlOiBzYWZlVGV4dChsZWdhY3kubWVzc2FnZSkgfHwgXCJPS1wiLFxuICAgIFRvdGFsOiB0b051bGxhYmxlTnVtYmVyKGxlZ2FjeS50b3RhbCkgPz8gbWFwcGVkSXRlbXMubGVuZ3RoLFxuICAgIFBhZ2U6IHRvTnVsbGFibGVOdW1iZXIobGVnYWN5LnBhZ2UpID8/IGZhbGxiYWNrUGFnZSxcbiAgICBQYWdlU2l6ZTogdG9OdWxsYWJsZU51bWJlcihsZWdhY3kucGFnZVNpemUpID8/IGZhbGxiYWNrUGFnZVNpemUsXG4gICAgSXRlbXM6IG1hcHBlZEl0ZW1zLFxuICAgIFRyYWNlSWQ6IHVuZGVmaW5lZCxcbiAgfTtcbn07XG5cbmNvbnN0IHJlc29sdmVUeXBlTGFiZWwgPSAodHlwZVZhbHVlQ29kZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgaWYgKCF0eXBlVmFsdWVDb2RlIHx8IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4gdHlwZVZhbHVlQ29kZTtcbiAgfVxuXG4gIGNvbnN0IHJhd0NhdGFsb2dTb3VyY2UgPSByZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUoKS5fX0VYUEVOU0VfR0FTVE9fVFlQRVNfXztcbiAgY29uc3QgcmF3Q2F0YWxvZyA9IEFycmF5LmlzQXJyYXkocmF3Q2F0YWxvZ1NvdXJjZSkgPyByYXdDYXRhbG9nU291cmNlIDogW107XG4gIGNvbnN0IG1hdGNoID0gcmF3Q2F0YWxvZy5maW5kKChlbnRyeTogRXhwZW5zZUdhc3RvVHlwZUVudHJ5KSA9PiB7XG4gICAgY29uc3QgZW50cnlDb2RlID0gc2FmZVRleHQoZW50cnk/LnZhbHVlIHx8IGVudHJ5Py5WYWx1ZSk7XG4gICAgcmV0dXJuIGVudHJ5Q29kZSA9PT0gdHlwZVZhbHVlQ29kZTtcbiAgfSk7XG5cbiAgcmV0dXJuIHNhZmVUZXh0KG1hdGNoPy50ZXh0IHx8IG1hdGNoPy5UZXh0KSB8fCB0eXBlVmFsdWVDb2RlO1xufTtcblxuLy8gU2V0cyBydW50aW1lIGF1dGggaW5wdXRzIHVzZWQgdG8gcmVzb2x2ZSBFbnRyYSBjb250ZXh0IGFuZCBtYW5kYXRvcnkgZXhwZW5zZSBoZWFkZXJzLlxuZXhwb3J0IGNvbnN0IGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoID0gKHNlZWQ6IFBhcnRpYWw8RXhwZW5zZUFwaUF1dGhTZWVkPik6IHZvaWQgPT4ge1xuICBjb25zdCBzdHJpY3RGcm9tU2VlZCA9IHRvRmxhZ0Jvb2woc2VlZC5zdHJpY3RBcGlSb3V0ZXMpO1xuICBjb25zdCBzdHJpY3RGcm9tUnVudGltZSA9XG4gICAgdHlwZW9mIHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXMgPT09IFwiYm9vbGVhblwiID8gcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcyA6IHJlYWRSdW50aW1lU3RyaWN0QXBpRmxhZygpO1xuXG4gIHJ1bnRpbWVBdXRoU2VlZCA9IHtcbiAgICAuLi5ydW50aW1lQXV0aFNlZWQsXG4gICAgdG9rZW46IHNhZmVUZXh0KHNlZWQudG9rZW4gfHwgcnVudGltZUF1dGhTZWVkLnRva2VuKSxcbiAgICBlbnRyYU9pZDogc2FmZVRleHQoc2VlZC5lbnRyYU9pZCB8fCBydW50aW1lQXV0aFNlZWQuZW50cmFPaWQpLFxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHNlZWQuYXBwQ29kZSB8fCBydW50aW1lQXV0aFNlZWQuYXBwQ29kZSB8fCBERUZBVUxUX0FQUF9DT0RFKSxcbiAgICBzdHJpY3RBcGlSb3V0ZXM6IHN0cmljdEZyb21TZWVkID8/IHN0cmljdEZyb21SdW50aW1lLFxuICB9O1xuXG4gIGNhY2hlZENvbnRleHQgPSBudWxsO1xuICBjYWNoZWRDb250ZXh0S2V5ID0gXCJcIjtcbiAgY29udGV4dFByb21pc2UgPSBudWxsO1xuICBjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcy5jbGVhcigpO1xuICBwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5jbGVhcigpO1xufTtcblxuLy8gTWFwcyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2xpc3QgaXRlbSBjb250cmFjdCB0byBsaXN0IGNhcmQgVUkgbW9kZWwuXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmQgPSAoaXRlbTogRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8pOiBFeHBlbnNlU2hlZXRDYXJkID0+IHtcbiAgcmV0dXJuIHtcbiAgICBob2phR2FzdG9zSWQ6IHNhZmVUZXh0KGl0ZW0uSG9qYUdhc3Rvc0lkKSxcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQoaXRlbS5EZXNjcmlwdGlvbiksXG4gICAgZXhwZW5zZVNoZWV0U3RhdHVzOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uRXhwZW5zZVNoZWV0U3RhdHVzKSxcbiAgICBlc3RhZG9Db21lbnRhcmlvczogc2FmZVRleHQoaXRlbS5Fc3RhZG9Db21lbnRhcmlvcykgfHwgbnVsbCxcbiAgICB1c2VySWQ6IHNhZmVUZXh0KGl0ZW0uVXNlcklkKSxcbiAgICB2b3VjaGVyOiBzYWZlVGV4dChpdGVtLlZvdWNoZXIpLFxuICAgIHByb2pJZDogc2FmZVRleHQoaXRlbS5Qcm9qSWQpLFxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQoaXRlbS5DdXJyZW5jeUNvZGUpLFxuICAgIHRvdGFsQW1vdW50OiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uVG90YWxBbW91bnQpLFxuICAgIGV4Y2hSYXRlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uRXhjaFJhdGUpLFxuICAgIGV4Y2hhbmdlUmF0ZU1vZGU6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5FeGNoYW5nZVJhdGVNb2RlKSxcbiAgICBjcmVhdGVkRGF0ZTogc2FmZVRleHQoaXRlbS5DcmVhdGVkRGF0ZSksXG4gIH07XG59O1xuXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0gaGVhZGVyIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldEhlYWRlciA9IChzaGVldDogRXhwZW5zZVNoZWV0RGV0YWlsRHRvKTogRXhwZW5zZVNoZWV0SGVhZGVyID0+IHtcbiAgcmV0dXJuIHtcbiAgICBob2phR2FzdG9zSWQ6IHNhZmVUZXh0KHNoZWV0LkhvamFHYXN0b3NJZCksXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KHNoZWV0LkRlc2NyaXB0aW9uKSxcbiAgICB1c2VySWQ6IHNhZmVUZXh0KHNoZWV0LlVzZXJJZCksXG4gICAgZXhwZW5zZVNoZWV0U3RhdHVzOiB0b051bGxhYmxlTnVtYmVyKHNoZWV0LkV4cGVuc2VTaGVldFN0YXR1cyksXG4gICAgZXN0YWRvQ29tZW50YXJpb3M6IHNhZmVUZXh0KHNoZWV0LkVzdGFkb0NvbWVudGFyaW9zKSB8fCBudWxsLFxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQoc2hlZXQuQ3VycmVuY3lDb2RlKSxcbiAgICB0b3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihzaGVldC5Ub3RhbEFtb3VudCksXG4gICAgZXhjaFJhdGU6IHNhZmVUZXh0KHNoZWV0LkV4Y2hSYXRlKSxcbiAgICBleGNoYW5nZVJhdGVNb2RlOiB0b051bGxhYmxlTnVtYmVyKHNoZWV0LkV4Y2hhbmdlUmF0ZU1vZGUpLFxuICAgIHByb2pJZDogc2FmZVRleHQoc2hlZXQuUHJvaklkKSxcbiAgICB2b3VjaGVyOiBzYWZlVGV4dChzaGVldC5Wb3VjaGVyKSxcbiAgICBjcmVhdGVkRGF0ZTogc2FmZVRleHQoc2hlZXQuQ3JlYXRlZERhdGUpLFxuICB9O1xufTtcblxuLy8gTWFwcyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9IGxpbmUgY29udHJhY3QgdG8gVUkgbW9kZWwuXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0TGluZSA9IChsaW5lOiBFeHBlbnNlU2hlZXRMaW5lRHRvKTogRXhwZW5zZVNoZWV0TGluZSA9PiB7XG4gIGNvbnN0IHR5cGVWYWx1ZUNvZGUgPSBzYWZlVGV4dChsaW5lLlR5cGVWYWx1ZSk7XG4gIGNvbnN0IGxlZ2FjeVByaWNlID0gKGxpbmUgYXMgeyBwcmljZT86IHVua25vd24gfSkucHJpY2U7XG4gIGNvbnN0IGxlZ2FjeUZpbGVJZCA9IChsaW5lIGFzIHsgZmlsZUlkPzogdW5rbm93biB9KS5maWxlSWQ7XG5cbiAgcmV0dXJuIHtcbiAgICBsaW5lUmVjSWQ6IHNhZmVUZXh0KGxpbmUuUmVjSWQpLFxuICAgIHRyYW5zRGF0ZTogc2FmZVRleHQobGluZS5UcmFuc0RhdGUpLFxuICAgIHR5cGVWYWx1ZUNvZGUsXG4gICAgdHlwZVZhbHVlOiByZXNvbHZlVHlwZUxhYmVsKHR5cGVWYWx1ZUNvZGUpLFxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChsaW5lLkRlc2NyaXB0aW9uKSxcbiAgICBpbnRlcm5hY2lvbmFsOiB0b051bGxhYmxlQm9vbChsaW5lLkludGVybmFjaW9uYWwpLFxuICAgIGZpbGVJZDogc2FmZVRleHQobGluZS5GaWxlSWQgPz8gbGVnYWN5RmlsZUlkKSxcbiAgICB0aWNrZXQ6IHRvTnVsbGFibGVCb29sKGxpbmUuVGlja2V0KSxcbiAgICBwcmljZTogdG9OdWxsYWJsZU51bWJlcihsaW5lLlByaWNlID8/IGxlZ2FjeVByaWNlKSxcbiAgICBxdHk6IHRvTnVsbGFibGVOdW1iZXIobGluZS5RdHkpLFxuICAgIGFtb3VudDogdG9OdWxsYWJsZU51bWJlcihsaW5lLkFtb3VudCksXG4gICAgcHJvaklkOiBzYWZlVGV4dChsaW5lLlByb2pJZCksXG4gICAgaW5kQXR0YWNoRmlsZXM6IHNhZmVUZXh0KGxpbmUuSW5kQXR0YWNoRmlsZXMpLFxuICB9O1xufTtcblxuLy8gTG9hZHMgdGhlIGV4cGVuc2Ugc2hlZXQgbGlzdCBmcm9tIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvbGlzdC5cbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldExpc3QgPSBhc3luYyAoXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+PiA9PiB7XG4gIGlmIChwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyAhPT0gdW5kZWZpbmVkICYmICFpc1ZhbGlkTGlzdEV4cGVuc2VTaGVldFN0YXR1cyhwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cykpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4cGVuc2VTaGVldFN0YXR1cyBtdXN0IGJlIGFuIGludGVnZXIgYmV0d2VlbiAwIGFuZCA0LlwiKTtcbiAgfVxuXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldExpc3RJdGVtRHRvPj4oXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL2xpc3RcIiwge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXG4gICAgfSk7XG5cbiAgICByZXR1cm4gbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmICghc2hvdWxkVXNlTGVnYWN5RmFsbGJhY2soZXJyb3IpKSB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICBjb25zdCBsZWdhY3lSZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxMZWdhY3lFeHBlbnNlTGlzdFJlc3BvbnNlPihcIi9HYXN0b3MvTGlzdEV4cGVuc2VTaGVldHNcIiwge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIC4uLnNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKSxcbiAgICAgICAgLi4uSlNPTl9IRUFERVJTLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHRvTGVnYWN5TGlzdFJlcXVlc3RQYXlsb2FkKHBheWxvYWQpKSxcbiAgICB9KTtcblxuICAgIGNvbnN0IG1hcHBlZCA9IG1hcExlZ2FjeUxpc3RSZXNwb25zZShcbiAgICAgIGxlZ2FjeVJlc3BvbnNlLFxuICAgICAgTnVtYmVyLmlzRmluaXRlKHBheWxvYWQucGFnZSkgJiYgcGF5bG9hZC5wYWdlID4gMCA/IHBheWxvYWQucGFnZSA6IDEsXG4gICAgICBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZC5wYWdlU2l6ZSkgJiYgcGF5bG9hZC5wYWdlU2l6ZSA+IDAgPyBwYXlsb2FkLnBhZ2VTaXplIDogNTBcbiAgICApO1xuXG4gICAgcmV0dXJuIG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlKG1hcHBlZCk7XG4gIH1cbn07XG5cbi8vIExvYWRzIG9uZSBleHBlbnNlIHNoZWV0IGRldGFpbCBmcm9tIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0uXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwgPSBhc3luYyAoXG4gIGhvamFHYXN0b3NJZDogc3RyaW5nLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0RGV0YWlsRHRvPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXREZXRhaWxEdG8+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy8ke3NhZmVTaGVldElkfWAsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBSZWFkcyBhdmFpbGFibGUgY3VycmVuY2llcyBmcm9tIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvY3VycmVuY2llcy5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlU2hlZXRDdXJyZW5jaWVzID0gYXN5bmMgKFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+PiA9PiB7XG4gIGxldCBjb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCB8IG51bGwgPSBudWxsO1xuICB0cnkge1xuICAgIGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoIShlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpKSB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cblxuICBjb25zdCBjb21wYW55SWQgPSBzYWZlVGV4dChjb250ZXh0Py5jb21wYW55SWQgfHwgcmVhZFdpbmRvd1NlbGVjdGVkQ29tcGFueSgpKS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBjYWNoZUtleSA9IGNvbXBhbnlJZCB8fCBcIi1cIjtcblxuICBpZiAoY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuaGFzKGNhY2hlS2V5KSkge1xuICAgIHJldHVybiBjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcy5nZXQoY2FjaGVLZXkpIGFzIEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+O1xuICB9XG5cbiAgaWYgKHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLmhhcyhjYWNoZUtleSkpIHtcbiAgICByZXR1cm4gcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuZ2V0KGNhY2hlS2V5KSBhcyBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+PjtcbiAgfVxuXG4gIGNvbnN0IHJlcXVlc3RQcm9taXNlID0gKGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBoZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpO1xuICAgIHJlbW92ZUhlYWRlclZhbHVlKGhlYWRlcnMsIFwiQXV0aG9yaXphdGlvblwiKTtcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIlgtSU5ELUF4VXNlcklkXCIpO1xuXG4gICAgaWYgKGNvbXBhbnlJZCkge1xuICAgICAgaGVhZGVyc1tcIlgtSU5ELUNvbXBhbnlcIl0gPSBjb21wYW55SWQ7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvY3VycmVuY2llc1wiLCB7XG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgaGVhZGVycyxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBub3JtYWxpemVkUmVzcG9uc2UgPSBub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgaWYgKG5vcm1hbGl6ZWRSZXNwb25zZS5TdWNjZXNzKSB7XG4gICAgICAgIGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLnNldChjYWNoZUtleSwgbm9ybWFsaXplZFJlc3BvbnNlKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRSZXNwb25zZTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKCFzaG91bGRVc2VMZWdhY3lGYWxsYmFjayhlcnJvcikpIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxlZ2FjeUxpc3RSZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxMZWdhY3lFeHBlbnNlTGlzdFJlc3BvbnNlPihcIi9HYXN0b3MvTGlzdEV4cGVuc2VTaGVldHNcIiwge1xuICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgLi4uc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpLFxuICAgICAgICAgIC4uLkpTT05fSEVBREVSUyxcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIGZpbHRlcjogXCJcIixcbiAgICAgICAgICBob2phR2FzdG9zSWQ6IFwiXCIsXG4gICAgICAgICAgYmlsbGVkTW9kZTogMixcbiAgICAgICAgICBmcm9tRGF0ZTogXCJcIixcbiAgICAgICAgICB0b0RhdGU6IFwiXCIsXG4gICAgICAgICAgcHJvamVjdElkOiBcIlwiLFxuICAgICAgICAgIGN1cnJlbmN5Q29kZTogXCJcIixcbiAgICAgICAgICBwYWdlOiAxLFxuICAgICAgICAgIHBhZ2VTaXplOiAyMDAsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHNlZW5Db2RlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgICAgY29uc3Qgc291cmNlSXRlbXMgPSBBcnJheS5pc0FycmF5KGxlZ2FjeUxpc3RSZXNwb25zZS5pdGVtcykgPyBsZWdhY3lMaXN0UmVzcG9uc2UuaXRlbXMgOiBbXTtcbiAgICAgIGNvbnN0IGZhbGxiYWNrSXRlbXM6IEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvW10gPSBzb3VyY2VJdGVtc1xuICAgICAgICAubWFwKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnkuY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpKVxuICAgICAgICAuZmlsdGVyKChjb2RlKSA9PiAhIWNvZGUpXG4gICAgICAgIC5maWx0ZXIoKGNvZGUpID0+IHtcbiAgICAgICAgICBpZiAoc2VlbkNvZGVzLmhhcyhjb2RlKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIHNlZW5Db2Rlcy5hZGQoY29kZSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pXG4gICAgICAgIC5tYXAoKGNvZGUpID0+ICh7XG4gICAgICAgICAgQ3VycmVuY3lDb2RlOiBjb2RlLFxuICAgICAgICAgIEN1cnJlbmN5Q29kZUlTTzogY29kZSxcbiAgICAgICAgfSkpO1xuXG4gICAgICBjb25zdCBmYWxsYmFja1Jlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPiA9IHtcbiAgICAgICAgU3VjY2VzczogbGVnYWN5TGlzdFJlc3BvbnNlLnN1Y2Nlc3MgIT09IGZhbHNlLFxuICAgICAgICBNZXNzYWdlOiBzYWZlVGV4dChsZWdhY3lMaXN0UmVzcG9uc2UubWVzc2FnZSkgfHwgXCJPS1wiLFxuICAgICAgICBUb3RhbDogZmFsbGJhY2tJdGVtcy5sZW5ndGgsXG4gICAgICAgIFBhZ2U6IDEsXG4gICAgICAgIFBhZ2VTaXplOiBmYWxsYmFja0l0ZW1zLmxlbmd0aCxcbiAgICAgICAgSXRlbXM6IGZhbGxiYWNrSXRlbXMsXG4gICAgICAgIFRyYWNlSWQ6IHVuZGVmaW5lZCxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRGYWxsYmFjayA9IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZShmYWxsYmFja1Jlc3BvbnNlKTtcbiAgICAgIGlmIChub3JtYWxpemVkRmFsbGJhY2suU3VjY2Vzcykge1xuICAgICAgICBjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcy5zZXQoY2FjaGVLZXksIG5vcm1hbGl6ZWRGYWxsYmFjayk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBub3JtYWxpemVkRmFsbGJhY2s7XG4gICAgfVxuICB9KSgpO1xuXG4gIHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLnNldChjYWNoZUtleSwgcmVxdWVzdFByb21pc2UpO1xuICB0cnkge1xuICAgIHJldHVybiBhd2FpdCByZXF1ZXN0UHJvbWlzZTtcbiAgfSBmaW5hbGx5IHtcbiAgICBwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5kZWxldGUoY2FjaGVLZXkpO1xuICB9XG59O1xuXG4vLyBSZWFkcyBhdmFpbGFibGUgc3Vib3JkaW5hdGVzIGZyb20gL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9zdWJvcmRpbmF0ZXMuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVzID0gYXN5bmMgKFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG8+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0bz4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9zdWJvcmRpbmF0ZXNcIiwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIEV4cG9zZXMgdGhlIGRlZmF1bHQgY3VycmVuY3kgcmVzb2x2ZWQgZnJvbSBFbnRyYSBjb250ZXh0IGZvciBpbml0aWFsIHNlbGVjdGlvbnMuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVNoZWV0RGVmYXVsdEN1cnJlbmN5Q29kZSA9IGFzeW5jIChvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gICAgcmV0dXJuIHNhZmVUZXh0KGNvbnRleHQuZGVmYXVsdEN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cbn07XG5cbi8vIFJlYWRzIGV4Y2hhbmdlIHJhdGUgZnJvbSAvYXBpL3N5c3RlbS9leGNoYW5nZS1yYXRlLlxuZXhwb3J0IGNvbnN0IGdldEV4Y2hhbmdlUmF0ZSA9IGFzeW5jIChcbiAgYmFzZUN1cnJlbmN5OiBzdHJpbmcsXG4gIHRhcmdldEN1cnJlbmN5OiBzdHJpbmcsXG4gIGRhdGU/OiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RXhjaGFuZ2VSYXRlRHRvPj4gPT4ge1xuICBjb25zdCB0b2tlbiA9IHJlc29sdmVBdXRoVG9rZW4ob3B0aW9ucyk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kgPSBzYWZlVGV4dChiYXNlQ3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRUYXJnZXRDdXJyZW5jeSA9IHNhZmVUZXh0KHRhcmdldEN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBub3JtYWxpemVkRGF0ZSA9IHNhZmVUZXh0KGRhdGUpO1xuICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcblxuICBxdWVyeS5zZXQoXCJiYXNlQ3VycmVuY3lcIiwgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSk7XG4gIHF1ZXJ5LnNldChcInRhcmdldEN1cnJlbmN5XCIsIG5vcm1hbGl6ZWRUYXJnZXRDdXJyZW5jeSk7XG4gIGlmIChub3JtYWxpemVkRGF0ZSkge1xuICAgIHF1ZXJ5LnNldChcImRhdGVcIiwgbm9ybWFsaXplZERhdGUpO1xuICB9XG5cbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcbiAgaWYgKHRva2VuKSB7XG4gICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke3Rva2VufWA7XG4gIH1cblxuICByZXR1cm4gZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4Y2hhbmdlUmF0ZUR0bz4+KGAvYXBpL3N5c3RlbS9leGNoYW5nZS1yYXRlPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgaGVhZGVycyxcbiAgfSk7XG59O1xuXG4vLyBSZWFkcyBleGNoYW5nZSByYXRlIGZyb20gL2FwaS9zeXN0ZW0vZXhjaGFuZ2UtcmF0ZS9wdWJsaWMtZGlyZWN0LlxuZXhwb3J0IGNvbnN0IGdldEV4Y2hhbmdlUmF0ZVB1YmxpY0RpcmVjdCA9IGFzeW5jIChcbiAgYmFzZUN1cnJlbmN5OiBzdHJpbmcsXG4gIHRhcmdldEN1cnJlbmN5OiBzdHJpbmcsXG4gIGRhdGU/OiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RXhjaGFuZ2VSYXRlRHRvPj4gPT4ge1xuICBjb25zdCB0b2tlbiA9IHJlc29sdmVBdXRoVG9rZW4ob3B0aW9ucyk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kgPSBzYWZlVGV4dChiYXNlQ3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRUYXJnZXRDdXJyZW5jeSA9IHNhZmVUZXh0KHRhcmdldEN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBub3JtYWxpemVkRGF0ZSA9IHNhZmVUZXh0KGRhdGUpO1xuICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcblxuICBxdWVyeS5zZXQoXCJiYXNlQ3VycmVuY3lcIiwgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSk7XG4gIHF1ZXJ5LnNldChcInRhcmdldEN1cnJlbmN5XCIsIG5vcm1hbGl6ZWRUYXJnZXRDdXJyZW5jeSk7XG4gIGlmIChub3JtYWxpemVkRGF0ZSkge1xuICAgIHF1ZXJ5LnNldChcImRhdGVcIiwgbm9ybWFsaXplZERhdGUpO1xuICB9XG5cbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcbiAgaWYgKHRva2VuKSB7XG4gICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke3Rva2VufWA7XG4gIH1cblxuICByZXR1cm4gZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4Y2hhbmdlUmF0ZUR0bz4+KGAvYXBpL3N5c3RlbS9leGNoYW5nZS1yYXRlL3B1YmxpYy1kaXJlY3Q/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICBoZWFkZXJzLFxuICB9KTtcbn07XG5cbi8vIFJlYWRzIGZ1ZWwgcHJpY2UgcGVyIGttIGZyb20gL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9mdWVsLXByaWNlLWttLlxuZXhwb3J0IGNvbnN0IGdldEZ1ZWxQcmljZUttID0gYXN5bmMgKFxuICB0cmFuc0RhdGU6IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxGdWVsUHJpY2VLbUR0bz4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBub3JtYWxpemVkRGF0ZSA9IHNhZmVUZXh0KHRyYW5zRGF0ZSk7XG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuXG4gIHF1ZXJ5LnNldChcInRyYW5zRGF0ZVwiLCBub3JtYWxpemVkRGF0ZSk7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RnVlbFByaWNlS21EdG8+PihcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9mdWVsLXByaWNlLWttPyR7cXVlcnkudG9TdHJpbmcoKX1gLFxuICAgIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxuICAgIH1cbiAgKTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gQ3JlYXRlcyBhbiBleHBlbnNlIHNoZWV0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMuXG5leHBvcnQgY29uc3QgY3JlYXRlRXhwZW5zZVNoZWV0ID0gYXN5bmMgKFxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldENyZWF0ZVJlc3BvbnNlRGF0YT4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBtb2RlID0gcGF5bG9hZC5tb2RlID8/IDA7XG4gIGNvbnN0IGxpbmVzID0gQXJyYXkuaXNBcnJheShwYXlsb2FkLmxpbmVzKSA/IHBheWxvYWQubGluZXMgOiBbXTtcbiAgY29uc3QgaGFzSW52YWxpZExpbmVQYXlsb2FkID0gbGluZXMuc29tZSgobGluZSkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAhc2FmZVRleHQobGluZS50cmFuc0RhdGUpIHx8XG4gICAgICAhTnVtYmVyLmlzSW50ZWdlcihOdW1iZXIobGluZS50eXBlVmFsdWUpKSB8fFxuICAgICAgTnVtYmVyKGxpbmUudHlwZVZhbHVlKSA8PSAwIHx8XG4gICAgICAhaXNQb3NpdGl2ZU51bWJlcihsaW5lLnF0eSkgfHxcbiAgICAgICFpc1Bvc2l0aXZlTnVtYmVyKGxpbmUucHJpY2UpXG4gICAgKTtcbiAgfSk7XG5cbiAgaWYgKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzICE9PSB1bmRlZmluZWQgJiYgIWlzTm9uTmVnYXRpdmVOdW1iZXIocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleHBlbnNlU2hlZXRTdGF0dXMgbXVzdCBiZSBncmVhdGVyIG9yIGVxdWFsIHRvIDAuXCIpO1xuICB9XG5cbiAgaWYgKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSAhPT0gdW5kZWZpbmVkICYmICFpc05vbk5lZ2F0aXZlTnVtYmVyKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSkpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4Y2hhbmdlUmF0ZU1vZGUgbXVzdCBiZSBncmVhdGVyIG9yIGVxdWFsIHRvIDAuXCIpO1xuICB9XG5cbiAgaWYgKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSAhPT0gdW5kZWZpbmVkICYmIHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4Y2hhbmdlUmF0ZU1vZGUgcmVxdWlyZXMgZXhwZW5zZVNoZWV0U3RhdHVzLlwiKTtcbiAgfVxuXG4gIGlmIChoYXNJbnZhbGlkTGluZVBheWxvYWQpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkVhY2ggbGluZSByZXF1aXJlcyB0cmFuc0RhdGUsIHR5cGVWYWx1ZSwgcXR5ID4gMCBhbmQgcHJpY2UgPiAwLlwiKTtcbiAgfVxuXG4gIGlmIChtb2RlID09PSAwKSB7XG4gICAgaWYgKCFzYWZlVGV4dChwYXlsb2FkLmRlc2NyaXB0aW9uKSB8fCAhc2FmZVRleHQocGF5bG9hZC5jdXJyZW5jeUNvZGUpIHx8IGxpbmVzLmxlbmd0aCA8IDEpIHtcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiSW52YWxpZCBjcmVhdGUgcGF5bG9hZCBmb3IgbW9kZSAwLlwiKTtcbiAgICB9XG4gIH1cblxuICBpZiAobW9kZSA9PT0gMSkge1xuICAgIGlmICghc2FmZVRleHQocGF5bG9hZC5kZXNjcmlwdGlvbikgfHwgIXNhZmVUZXh0KHBheWxvYWQuY3VycmVuY3lDb2RlKSkge1xuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJJbnZhbGlkIGNyZWF0ZSBwYXlsb2FkIGZvciBtb2RlIDEuXCIpO1xuICAgIH1cblxuICAgIGlmIChsaW5lcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIk1vZGUgMSByZXF1aXJlcyBsaW5lcyB0byBiZSBudWxsIG9yIGVtcHR5LlwiKTtcbiAgICB9XG4gIH1cblxuICBpZiAobW9kZSA9PT0gMikge1xuICAgIGlmICghc2FmZVRleHQocGF5bG9hZC5leGlzdGluZ0hvamFHYXN0b3NJZCkgfHwgbGluZXMubGVuZ3RoIDwgMSkge1xuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJJbnZhbGlkIGNyZWF0ZSBwYXlsb2FkIGZvciBtb2RlIDIuXCIpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG5vcm1hbGl6ZWRQYXlsb2FkOiBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0ID0ge1xuICAgIC4uLnBheWxvYWQsXG4gICAgbW9kZSxcbiAgICBleGlzdGluZ0hvamFHYXN0b3NJZDogc2FmZVRleHQocGF5bG9hZC5leGlzdGluZ0hvamFHYXN0b3NJZCkgfHwgdW5kZWZpbmVkLFxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChwYXlsb2FkLmRlc2NyaXB0aW9uKSB8fCB1bmRlZmluZWQsXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChwYXlsb2FkLmN1cnJlbmN5Q29kZSkgfHwgdW5kZWZpbmVkLFxuICAgIHByb2pJZDogc2FmZVRleHQocGF5bG9hZC5wcm9qSWQpIHx8IHVuZGVmaW5lZCxcbiAgICBsaW5lczogbW9kZSA9PT0gMSA/IFtdIDogbGluZXMsXG4gIH07XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3JlYXRlUmVzcG9uc2VEYXRhPj4oXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzXCIsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShub3JtYWxpemVkUGF5bG9hZCksXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBVcGRhdGVzIGhlYWRlciBmaWVsZHMgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS5cbmV4cG9ydCBjb25zdCB1cGRhdGVFeHBlbnNlU2hlZXRIZWFkZXIgPSBhc3luYyAoXG4gIGhvamFHYXN0b3NJZDogc3RyaW5nLFxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPHsgSG9qYUdhc3Rvc0lkOiBzdHJpbmcgfT4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlU2hlZXRJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSk7XG5cbiAgaWYgKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzICE9PSB1bmRlZmluZWQgJiYgIWlzTm9uTmVnYXRpdmVOdW1iZXIocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleHBlbnNlU2hlZXRTdGF0dXMgbXVzdCBiZSBncmVhdGVyIG9yIGVxdWFsIHRvIDAuXCIpO1xuICB9XG5cbiAgaWYgKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSAhPT0gdW5kZWZpbmVkICYmICFpc05vbk5lZ2F0aXZlTnVtYmVyKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSkpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4Y2hhbmdlUmF0ZU1vZGUgbXVzdCBiZSBncmVhdGVyIG9yIGVxdWFsIHRvIDAuXCIpO1xuICB9XG5cbiAgaWYgKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSAhPT0gdW5kZWZpbmVkICYmIHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4Y2hhbmdlUmF0ZU1vZGUgcmVxdWlyZXMgZXhwZW5zZVNoZWV0U3RhdHVzLlwiKTtcbiAgfVxuXG4gIGlmIChzYWZlVGV4dChwYXlsb2FkLmVzdGFkb0NvbWVudGFyaW9zKSAmJiAocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMgPT09IHVuZGVmaW5lZCB8fCBwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUgPT09IHVuZGVmaW5lZCkpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImVzdGFkb0NvbWVudGFyaW9zIHJlcXVpcmVzIGV4cGVuc2VTaGVldFN0YXR1cyBhbmQgZXhjaGFuZ2VSYXRlTW9kZS5cIik7XG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTx7IEhvamFHYXN0b3NJZDogc3RyaW5nIH0+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy8ke3NhZmVTaGVldElkfWAsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gRGVsZXRlcyBhIGZ1bGwgZXhwZW5zZSBzaGVldCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9L2xpbmVzLzA/ZGVsZXRlV2hvbGVTaGVldD10cnVlLlxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VTaGVldCA9IGFzeW5jIChcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlU2hlZXRJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+PihcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy8ke3NhZmVTaGVldElkfS9saW5lcy8wP2RlbGV0ZU1vZGU9MiZkZWxldGVXaG9sZVNoZWV0PXRydWVgLFxuICAgIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxuICAgIH1cbiAgKTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gVXBkYXRlcyBvbmUgZXhwZW5zZSBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0vbGluZXMve2xpbmVSZWNJZH0uXG5leHBvcnQgY29uc3QgdXBkYXRlRXhwZW5zZVNoZWV0TGluZSA9IGFzeW5jIChcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXG4gIGxpbmVSZWNJZDogc3RyaW5nLFxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVzcG9uc2VEYXRhPj4gPT4ge1xuICBpZiAoXG4gICAgIXNhZmVUZXh0KHBheWxvYWQudHJhbnNEYXRlKSB8fFxuICAgICFOdW1iZXIuaXNJbnRlZ2VyKE51bWJlcihwYXlsb2FkLnR5cGVWYWx1ZSkpIHx8XG4gICAgTnVtYmVyKHBheWxvYWQudHlwZVZhbHVlKSA8PSAwIHx8XG4gICAgIWlzUG9zaXRpdmVOdW1iZXIocGF5bG9hZC5xdHkpIHx8XG4gICAgIWlzUG9zaXRpdmVOdW1iZXIocGF5bG9hZC5wcmljZSlcbiAgKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJ0cmFuc0RhdGUsIHR5cGVWYWx1ZSwgcXR5ID4gMCBhbmQgcHJpY2UgPiAwIGFyZSByZXF1aXJlZC5cIik7XG4gIH1cblxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3Qgc2FmZUxpbmVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcobGluZVJlY0lkIHx8IFwiXCIpLnRyaW0oKSk7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlc3BvbnNlRGF0YT4+KFxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9L2xpbmVzLyR7c2FmZUxpbmVJZH1gLFxuICAgIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBEZWxldGVzIG9uZSBleHBlbnNlIGxpbmUgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS9saW5lcy97bGluZVJlY0lkfT9kZWxldGVXaG9sZVNoZWV0PWZhbHNlLlxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VTaGVldExpbmUgPSBhc3luYyAoXG4gIGhvamFHYXN0b3NJZDogc3RyaW5nLFxuICBsaW5lUmVjSWQ6IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxudWxsPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3Qgc2FmZUxpbmVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcobGluZVJlY0lkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+PihcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy8ke3NhZmVTaGVldElkfS9saW5lcy8ke3NhZmVMaW5lSWR9P2RlbGV0ZU1vZGU9MCZkZWxldGVXaG9sZVNoZWV0PWZhbHNlYCxcbiAgICB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIEV4dHJhY3RzIGFuIGV4cGVuc2UgZHJhZnQgZnJvbSBhIHRpY2tldCBpbWFnZSB1c2luZyAvYXBpL2lhL3NlcnZpY2UvZXhwZW5zZWZyb210aWNrZXQuXG5leHBvcnQgY29uc3QgZXh0cmFjdEV4cGVuc2VGcm9tVGlja2V0RHJhZnQgPSBhc3luYyAoXG4gIHRpY2tldEltYWdlOiBGaWxlIHwgQmxvYixcbiAgcGVyc2lzdFRpY2tldD86IGJvb2xlYW4sXG4gIHRpY2tldFVybEZpbGU/OiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0RHJhZnRSZXNwb25zZT4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XG4gIGNvbnN0IHNhZmVUaWNrZXRVcmwgPSBzYWZlVGV4dCh0aWNrZXRVcmxGaWxlKTtcblxuICBpZiAodGlja2V0SW1hZ2UgaW5zdGFuY2VvZiBGaWxlKSB7XG4gICAgZm9ybS5hcHBlbmQoXCJ0aWNrZXRJbWFnZVwiLCB0aWNrZXRJbWFnZSwgc2FmZVRleHQodGlja2V0SW1hZ2UubmFtZSkgfHwgXCJ0aWNrZXQuanBnXCIpO1xuICB9IGVsc2Uge1xuICAgIGZvcm0uYXBwZW5kKFwidGlja2V0SW1hZ2VcIiwgdGlja2V0SW1hZ2UsIFwidGlja2V0LmpwZ1wiKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgcGVyc2lzdFRpY2tldCA9PT0gXCJib29sZWFuXCIpIHtcbiAgICBmb3JtLmFwcGVuZChcInBlcnNpc3RUaWNrZXRcIiwgcGVyc2lzdFRpY2tldCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiKTtcbiAgfVxuXG4gIGlmIChzYWZlVGlja2V0VXJsKSB7XG4gICAgZm9ybS5hcHBlbmQoXCJ0aWNrZXRVcmxGaWxlXCIsIHNhZmVUaWNrZXRVcmwpO1xuICB9XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0RHJhZnRSZXNwb25zZT4+KFwiL2FwaS9pYS9zZXJ2aWNlL2V4cGVuc2Vmcm9tdGlja2V0XCIsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlRm9ybUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gICAgYm9keTogZm9ybSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIENyZWF0ZXMgYSB0aWNrZXQgaGVhZGVyL2xpbmVzIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy5cbmV4cG9ydCBjb25zdCBjcmVhdGVFeHBlbnNlU2hlZXRUaWNrZXQgPSBhc3luYyAoXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldENyZWF0ZVJlcXVlc3QsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRDcmVhdGVSZXF1ZXN0ID0ge1xuICAgIC4uLnBheWxvYWQsXG4gICAgZ2FzdG9UeXBlOiBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZShwYXlsb2FkPy5nYXN0b1R5cGUpLFxuICB9O1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0c1wiLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gTG9hZHMgdGlja2V0IGxpc3QgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL2xpc3QuXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdCA9IGFzeW5jIChcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCByYXdDcmVhdGVkRGF0ZUZyb20gPSBzYWZlVGV4dChwYXlsb2FkPy5jcmVhdGVkRGF0ZUZyb20pO1xuICBjb25zdCByYXdDcmVhdGVkRGF0ZVRvID0gc2FmZVRleHQocGF5bG9hZD8uY3JlYXRlZERhdGVUbyk7XG4gIGNvbnN0IGNyZWF0ZWREYXRlRnJvbSA9IG5vcm1hbGl6ZVRpY2tldExpc3REYXRlKHJhd0NyZWF0ZWREYXRlRnJvbSk7XG4gIGNvbnN0IGNyZWF0ZWREYXRlVG8gPSBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZShyYXdDcmVhdGVkRGF0ZVRvKTtcbiAgaWYgKHJhd0NyZWF0ZWREYXRlRnJvbSAmJiAhY3JlYXRlZERhdGVGcm9tKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJjcmVhdGVkRGF0ZUZyb20gbXVzdCBiZSBpbiB5eXl5LU1NLWRkIGZvcm1hdC5cIik7XG4gIH1cbiAgaWYgKHJhd0NyZWF0ZWREYXRlVG8gJiYgIWNyZWF0ZWREYXRlVG8pIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImNyZWF0ZWREYXRlVG8gbXVzdCBiZSBpbiB5eXl5LU1NLWRkIGZvcm1hdC5cIik7XG4gIH1cblxuICBjb25zdCBwcmVmZXJyZWRTZWFyY2hLZXkgPSBzYWZlVGV4dChwYXlsb2FkPy5zZWFyY2hLZXkgfHwgcGF5bG9hZD8uZmlsdGVyKTtcbiAgY29uc3QgbGVnYWN5RmlsdGVyID0gc2FmZVRleHQocGF5bG9hZD8uZmlsdGVyIHx8IHByZWZlcnJlZFNlYXJjaEtleSk7XG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCA9IHtcbiAgICBwYWdlOiBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZD8ucGFnZSkgJiYgcGF5bG9hZC5wYWdlID4gMCA/IE1hdGguZmxvb3IocGF5bG9hZC5wYWdlKSA6IDEsXG4gICAgcGFnZVNpemU6IE51bWJlci5pc0Zpbml0ZShwYXlsb2FkPy5wYWdlU2l6ZSkgJiYgcGF5bG9hZC5wYWdlU2l6ZSA+IDAgPyBNYXRoLmZsb29yKHBheWxvYWQucGFnZVNpemUpIDogNTAsXG4gICAgY3JlYXRlZERhdGVGcm9tOiBjcmVhdGVkRGF0ZUZyb20gfHwgdW5kZWZpbmVkLFxuICAgIGNyZWF0ZWREYXRlVG86IGNyZWF0ZWREYXRlVG8gfHwgdW5kZWZpbmVkLFxuICAgIHNlYXJjaEtleTogcHJlZmVycmVkU2VhcmNoS2V5IHx8IHVuZGVmaW5lZCxcbiAgICBmaWx0ZXI6IGxlZ2FjeUZpbHRlciB8fCB1bmRlZmluZWQsXG4gICAgc3RhdHVzOiBub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1cyhwYXlsb2FkPy5zdGF0dXMpLFxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQocGF5bG9hZD8uY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpIHx8IHVuZGVmaW5lZCxcbiAgICBnYXN0b1R5cGU6IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlKHBheWxvYWQ/Lmdhc3RvVHlwZSksXG4gICAgcHJvY2Vzc2VkQnlBSTogbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRQcm9jZXNzZWRCeUFJKHBheWxvYWQ/LnByb2Nlc3NlZEJ5QUkpLFxuICB9O1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8+PihcbiAgICBcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saXN0XCIsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxuICAgIH1cbiAgKTtcblxuICByZXR1cm4gbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gTG9hZHMgb25lIHRpY2tldCBkZXRhaWwgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9LlxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0ID0gYXN5bmMgKFxuICBmaWxlSWQ6IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldERldGFpbER0bz4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXREZXRhaWxEdG8+PihcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH1gLFxuICAgIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxuICAgIH1cbiAgKTtcblxuICByZXR1cm4gbm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBVcGRhdGVzIHRpY2tldCBoZWFkZXIgbWV0YWRhdGEgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9LlxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldFVwZGF0ZVJlcXVlc3QsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCBzYWZlUGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdCA9IHtcbiAgICAuLi5wYXlsb2FkLFxuICAgIGdhc3RvVHlwZTogbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUocGF5bG9hZD8uZ2FzdG9UeXBlKSxcbiAgfTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9YCwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gRGVsZXRlcyBvbmUgdGlja2V0IG9yIG9uZSB0aWNrZXQgbGluZSB2aWEgcXVlcnkgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9LlxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIGxpbmVSZWNJZD86IG51bWJlcixcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxudWxsPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgaWYgKE51bWJlci5pc0ludGVnZXIoTnVtYmVyKGxpbmVSZWNJZCkpICYmIE51bWJlcihsaW5lUmVjSWQpID4gMCkge1xuICAgIHF1ZXJ5LnNldChcImxpbmVSZWNJZFwiLCBTdHJpbmcobGluZVJlY0lkKSk7XG4gIH1cblxuICBjb25zdCBzdWZmaXggPSBxdWVyeS50b1N0cmluZygpO1xuICBjb25zdCB1cmwgPSBzdWZmaXhcbiAgICA/IGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfT8ke3N1ZmZpeH1gXG4gICAgOiBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH1gO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxudWxsPj4odXJsLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIEFwcGxpZXMgSUEgcGF5bG9hZCBvdmVyIGFuIGV4aXN0aW5nIHRpY2tldCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vaWEuXG5leHBvcnQgY29uc3QgYXBwbHlFeHBlbnNlU2hlZXRUaWNrZXRJYSA9IGFzeW5jIChcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJhd1BheWxvYWQgPSAocGF5bG9hZCB8fCB7fSkgYXMgRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0O1xuICBjb25zdCBzYWZlUGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0ID0ge1xuICAgIC4uLnJhd1BheWxvYWQsXG4gIH07XG4gIGNvbnN0IGdhc3RvVHlwZSA9IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlKHJhd1BheWxvYWQuZ2FzdG9UeXBlKTtcbiAgaWYgKGdhc3RvVHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZGVsZXRlIHNhZmVQYXlsb2FkLmdhc3RvVHlwZTtcbiAgfSBlbHNlIHtcbiAgICBzYWZlUGF5bG9hZC5nYXN0b1R5cGUgPSBnYXN0b1R5cGU7XG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vaWFgLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gQ3JlYXRlcyBvbmUgdGlja2V0IGxpbmUgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9L2xpbmVzLlxuZXhwb3J0IGNvbnN0IGNyZWF0ZUV4cGVuc2VTaGVldFRpY2tldExpbmUgPSBhc3luYyAoXG4gIGZpbGVJZDogc3RyaW5nLFxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5lUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XG4gIGlmICghc2FmZVRleHQocGF5bG9hZD8uZGVzY3JpcHRpb24pIHx8ICFpc1Bvc2l0aXZlTnVtYmVyKHBheWxvYWQ/LnF0eSkgfHwgIWlzUG9zaXRpdmVOdW1iZXIocGF5bG9hZD8ucHJpY2UpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJkZXNjcmlwdGlvbiwgcXR5ID4gMCBhbmQgcHJpY2UgPiAwIGFyZSByZXF1aXJlZC5cIik7XG4gIH1cblxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vbGluZXNgLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBVcGRhdGVzIG9uZSB0aWNrZXQgbGluZSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vbGluZXMve2xpbmVSZWNJZH0uXG5leHBvcnQgY29uc3QgdXBkYXRlRXhwZW5zZVNoZWV0VGlja2V0TGluZSA9IGFzeW5jIChcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIGxpbmVSZWNJZDogc3RyaW5nIHwgbnVtYmVyLFxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5lUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XG4gIGlmICghc2FmZVRleHQocGF5bG9hZD8uZGVzY3JpcHRpb24pIHx8ICFpc1Bvc2l0aXZlTnVtYmVyKHBheWxvYWQ/LnF0eSkgfHwgIWlzUG9zaXRpdmVOdW1iZXIocGF5bG9hZD8ucHJpY2UpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJkZXNjcmlwdGlvbiwgcXR5ID4gMCBhbmQgcHJpY2UgPiAwIGFyZSByZXF1aXJlZC5cIik7XG4gIH1cblxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCBzYWZlTGluZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhsaW5lUmVjSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4oXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2xpbmVzLyR7c2FmZUxpbmVJZH1gLFxuICAgIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBEZWxldGVzIG9uZSB0aWNrZXQgbGluZSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vbGluZXMve2xpbmVSZWNJZH0uXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0TGluZSA9IGFzeW5jIChcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIGxpbmVSZWNJZDogc3RyaW5nIHwgbnVtYmVyLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG51bGw+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHNhZmVMaW5lSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGxpbmVSZWNJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxudWxsPj4oXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2xpbmVzLyR7c2FmZUxpbmVJZH1gLFxuICAgIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxuICAgIH1cbiAgKTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gVXBsb2Fkcy9yZXBsYWNlcyB0aWNrZXQgZmlsZSBjb250ZW50IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9maWxlLlxuZXhwb3J0IGNvbnN0IHVwbG9hZEV4cGVuc2VTaGVldFRpY2tldEZpbGUgPSBhc3luYyAoXG4gIGZpbGVJZDogc3RyaW5nLFxuICBmaWxlOiBGaWxlIHwgQmxvYixcbiAgZXh0ZW5zaW9uPzogc3RyaW5nLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3Qgc2FmZUV4dGVuc2lvbiA9IHNhZmVUZXh0KGV4dGVuc2lvbikucmVwbGFjZSgvXlxcLi8sIFwiXCIpO1xuICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgaWYgKHNhZmVFeHRlbnNpb24pIHtcbiAgICBxdWVyeS5zZXQoXCJleHRlbnNpb25cIiwgc2FmZUV4dGVuc2lvbik7XG4gIH1cblxuICBjb25zdCBzdWZmaXggPSBxdWVyeS50b1N0cmluZygpO1xuICBjb25zdCB1cmwgPSBzdWZmaXhcbiAgICA/IGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9maWxlPyR7c3VmZml4fWBcbiAgICA6IGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9maWxlYDtcbiAgY29uc3QgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xuICBpZiAoZmlsZSBpbnN0YW5jZW9mIEZpbGUpIHtcbiAgICBmb3JtLmFwcGVuZChcImZpbGVcIiwgZmlsZSwgc2FmZVRleHQoZmlsZS5uYW1lKSB8fCBgdGlja2V0LiR7c2FmZUV4dGVuc2lvbiB8fCBcImpwZ1wifWApO1xuICB9IGVsc2Uge1xuICAgIGZvcm0uYXBwZW5kKFwiZmlsZVwiLCBmaWxlLCBgdGlja2V0LiR7c2FmZUV4dGVuc2lvbiB8fCBcImpwZ1wifWApO1xuICB9XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4odXJsLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUZvcm1IZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxuICAgIGJvZHk6IGZvcm0sXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBEZWxldGVzIHRpY2tldCBmaWxlIGNvbnRlbnQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9L2ZpbGUuXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0RmlsZSA9IGFzeW5jIChcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8bnVsbD4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9maWxlYCwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBTZWFyY2hlcyBwcm9qZWN0cyBmb3IgZHJvcGRvd24gdXNhZ2UgaW4gZmlsdGVycyBhbmQgZWRpdCBmb3Jtcy5cbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VQcm9qZWN0cyA9IGFzeW5jIChcbiAgdGVybTogc3RyaW5nLFxuICBwYWdlOiBudW1iZXIsXG4gIHBhZ2VTaXplOiBudW1iZXIsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8UHJvamVjdERyb3Bkb3duUmVzcG9uc2U+ID0+IHtcbiAgY29uc3Qgc2FmZVRlcm0gPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKHRlcm0gfHwgXCJcIikpO1xuICBjb25zdCBzYWZlUGFnZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlKSAmJiBwYWdlID4gMCA/IE1hdGguZmxvb3IocGFnZSkgOiAxO1xuICBjb25zdCBzYWZlUGFnZVNpemUgPSBOdW1iZXIuaXNGaW5pdGUocGFnZVNpemUpICYmIHBhZ2VTaXplID4gMCA/IE1hdGguZmxvb3IocGFnZVNpemUpIDogMjA7XG5cbiAgcmV0dXJuIGZldGNoSnNvbjxQcm9qZWN0RHJvcGRvd25SZXNwb25zZT4oXG4gICAgYC9HYXN0b3MvR2V0UHJvamVjdHNGb3JEcm9wZG93bj90ZXJtPSR7c2FmZVRlcm19JnBhZ2U9JHtzYWZlUGFnZX0mcGFnZVNpemU9JHtzYWZlUGFnZVNpemV9YCxcbiAgICB7XG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH1cbiAgKTtcbn07XG4iLCAiZXhwb3J0IHR5cGUgRXhwZW5zZURhdGVQYXJ0cyA9IHtcbiAgeWVhcjogc3RyaW5nO1xuICBtb250aDogc3RyaW5nO1xuICBkYXk6IHN0cmluZztcbn07XG5cbmNvbnN0IEJBU1FVRV9NT05USFNfU0hPUlQgPSBbXG4gIFwidXJ0XCIsXG4gIFwib3RzXCIsXG4gIFwibWFyXCIsXG4gIFwiYXBpXCIsXG4gIFwibWFpXCIsXG4gIFwiZWthXCIsXG4gIFwidXp0XCIsXG4gIFwiYWJ1XCIsXG4gIFwiaXJhXCIsXG4gIFwidXJyXCIsXG4gIFwiYXphXCIsXG4gIFwiYWJlXCIsXG5dO1xuXG5jb25zdCBub3JtYWxpemVVaUxvY2FsZSA9IChsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKGxvY2FsZSB8fCBcIlwiKS50cmltKCk7XG4gIGlmICghdmFsdWUpIHJldHVybiBcImVzLUVTXCI7XG4gIGlmICgvXnpoLWhhbnMvaS50ZXN0KHZhbHVlKSkgcmV0dXJuIFwiemgtQ05cIjtcbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuY29uc3QgaXNCYXNxdWVMb2NhbGUgPSAobG9jYWxlOiBzdHJpbmcpOiBib29sZWFuID0+IC9eZXVcXGIvaS50ZXN0KFN0cmluZyhsb2NhbGUgfHwgXCJcIikpO1xuXG4vLyBOb3JtYWxpemUgdW5rbm93biB2YWx1ZXMgdG8gYSB0cmltbWVkIHN0cmluZy5cbmV4cG9ydCBjb25zdCBzYWZlVGV4dCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJcIjtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSkudHJpbSgpO1xufTtcblxuLy8gTm9ybWFsaXplcyBjYXJkIHRpdGxlIHRleHQgb25seSB3aGVuIGl0IGNvbWVzIGluIGZ1bGwgdXBwZXIgb3IgZnVsbCBsb3dlciBjYXNlLlxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUNhcmRUaXRsZVRleHQgPSAodmFsdWU6IHVua25vd24sIGZhbGxiYWNrID0gXCItXCIpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBzb3VyY2UgPSBzYWZlVGV4dCh2YWx1ZSk7XG4gIGlmICghc291cmNlKSByZXR1cm4gZmFsbGJhY2s7XG5cbiAgY29uc3QgaGFzTGV0dGVycyA9IC9bQS1aYS16XHUwMEMwLVx1MDBENlx1MDBEOC1cdTAwRjZcdTAwRjgtXHUwMEZGXS8udGVzdChzb3VyY2UpO1xuICBpZiAoIWhhc0xldHRlcnMpIHJldHVybiBzb3VyY2U7XG5cbiAgY29uc3QgaXNBbGxVcHBlciA9IHNvdXJjZSA9PT0gc291cmNlLnRvVXBwZXJDYXNlKCkgJiYgc291cmNlICE9PSBzb3VyY2UudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgaXNBbGxMb3dlciA9IHNvdXJjZSA9PT0gc291cmNlLnRvTG93ZXJDYXNlKCkgJiYgc291cmNlICE9PSBzb3VyY2UudG9VcHBlckNhc2UoKTtcbiAgaWYgKCFpc0FsbFVwcGVyICYmICFpc0FsbExvd2VyKSB7XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIGNvbnN0IGxvd2VyID0gc291cmNlLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiBgJHtsb3dlci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKX0ke2xvd2VyLnNsaWNlKDEpfWA7XG59O1xuXG4vLyBSZXR1cm5zIHRydWUgb25seSB3aGVuIHZvdWNoZXIgaGFzIGEgbWVhbmluZ2Z1bCBhc3NpZ25lZCB2YWx1ZS5cbmV4cG9ydCBjb25zdCBoYXNBc3NpZ25lZFZvdWNoZXIgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcbiAgY29uc3Qgdm91Y2hlciA9IHNhZmVUZXh0KHZhbHVlKS50b1VwcGVyQ2FzZSgpO1xuICBpZiAoIXZvdWNoZXIpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHZvdWNoZXIgIT09IFwiLVwiICYmIHZvdWNoZXIgIT09IFwiLlwiICYmIHZvdWNoZXIgIT09IFwiMFwiO1xufTtcblxuLy8gUmV0dXJuIGRhdGUgYXQgbG9jYWwgZGF5IHN0YXJ0LlxuZXhwb3J0IGNvbnN0IHN0YXJ0T2ZEYXkgPSAoZGF0ZTogRGF0ZSk6IERhdGUgPT4ge1xuICByZXR1cm4gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKTtcbn07XG5cbi8vIEZvcm1hdCBsb2NhbCBkYXRlIHRvIHl5eXktTU0tZGQuXG5leHBvcnQgY29uc3QgdG9Jc29EYXRlID0gKGRhdGU6IERhdGUpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gYCR7ZGF0ZS5nZXRGdWxsWWVhcigpfS0ke1N0cmluZyhkYXRlLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIil9LSR7U3RyaW5nKGRhdGUuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIil9YDtcbn07XG5cbi8vIFBhcnNlIHN1cHBvcnRlZCBBUEkgZGF0ZSBmb3JtYXRzLlxuZXhwb3J0IGNvbnN0IHBhcnNlRXhwZW5zZURhdGUgPSAocmF3Pzogc3RyaW5nKTogRGF0ZSB8IG51bGwgPT4ge1xuICBpZiAoIXJhdykgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKHJhdykudHJpbSgpO1xuICBpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBkYXRlT25seSA9IHZhbHVlLnNwbGl0KFwiVFwiKVswXS5zcGxpdChcIiBcIilbMF07XG5cbiAgaWYgKC9eXFxkezJ9Wy4vLV1cXGR7Mn1bLi8tXVxcZHs0fSQvLnRlc3QoZGF0ZU9ubHkpKSB7XG4gICAgY29uc3QgW2RheSwgbW9udGgsIHllYXJdID0gZGF0ZU9ubHkuc3BsaXQoL1suLy1dLykubWFwKE51bWJlcik7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcbiAgfVxuXG4gIGlmICgvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdChkYXRlT25seSkpIHtcbiAgICBjb25zdCBbeWVhciwgbW9udGgsIGRheV0gPSBkYXRlT25seS5zcGxpdChcIi1cIikubWFwKE51bWJlcik7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcbiAgfVxuXG4gIGlmICgvXlxcZHs0fVsuLy1dXFxkezJ9Wy4vLV1cXGR7Mn0kLy50ZXN0KGRhdGVPbmx5KSkge1xuICAgIGNvbnN0IFt5ZWFyLCBtb250aCwgZGF5XSA9IGRhdGVPbmx5LnNwbGl0KC9bLi8tXS8pLm1hcChOdW1iZXIpO1xuICAgIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XG4gIH1cblxuICBpZiAoL15cXGR7OH0kLy50ZXN0KGRhdGVPbmx5KSkge1xuICAgIGNvbnN0IHllYXIgPSBOdW1iZXIoZGF0ZU9ubHkuc2xpY2UoMCwgNCkpO1xuICAgIGNvbnN0IG1vbnRoID0gTnVtYmVyKGRhdGVPbmx5LnNsaWNlKDQsIDYpKTtcbiAgICBjb25zdCBkYXkgPSBOdW1iZXIoZGF0ZU9ubHkuc2xpY2UoNiwgOCkpO1xuICAgIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XG4gIH1cblxuICBjb25zdCBwYXJzZWQgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gIHJldHVybiBOdW1iZXIuaXNOYU4ocGFyc2VkLmdldFRpbWUoKSkgPyBudWxsIDogcGFyc2VkO1xufTtcblxuLy8gRm9ybWF0IGEgZGF0ZSBmb3IgcmVhZC1vbmx5IGZpZWxkcyB1c2luZyB0aGUgc2FtZSBvdXRwdXQgc3R5bGUgYXMgdmlzaXRzLlxuZXhwb3J0IGNvbnN0IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSA9IChyYXc/OiBzdHJpbmcsIGxvY2FsZSA9IFwiZXMtRVNcIiwgZmFsbGJhY2sgPSBcIi1cIik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGRhdGUgPSBwYXJzZUV4cGVuc2VEYXRlKHJhdyk7XG4gIGlmICghZGF0ZSkgcmV0dXJuIGZhbGxiYWNrO1xuXG4gIGNvbnN0IHNhZmVMb2NhbGUgPSBub3JtYWxpemVVaUxvY2FsZShsb2NhbGUpO1xuICBpZiAoaXNCYXNxdWVMb2NhbGUoc2FmZUxvY2FsZSkpIHtcbiAgICByZXR1cm4gYCR7ZGF0ZS5nZXREYXRlKCl9ICR7QkFTUVVFX01PTlRIU19TSE9SVFtkYXRlLmdldE1vbnRoKCldfSAke2RhdGUuZ2V0RnVsbFllYXIoKX1gLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICByZXR1cm4gZGF0ZVxuICAgIC50b0xvY2FsZURhdGVTdHJpbmcoc2FmZUxvY2FsZSwge1xuICAgICAgZGF5OiBcIm51bWVyaWNcIixcbiAgICAgIG1vbnRoOiBcInNob3J0XCIsXG4gICAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgICB9KVxuICAgIC5yZXBsYWNlKC9cXC4vZywgXCJcIilcbiAgICAudG9Mb3dlckNhc2UoKTtcbn07XG5cbi8vIEJ1aWxkIHRpbWVsaW5lIGRhdGUgZnJhZ21lbnRzIGZvciBjYXJkIGxlZnQgcGFuZWwuXG5leHBvcnQgY29uc3QgZm9ybWF0RXhwZW5zZURhdGVQYXJ0cyA9IChyYXc/OiBzdHJpbmcsIGxvY2FsZSA9IFwiZXMtRVNcIik6IEV4cGVuc2VEYXRlUGFydHMgPT4ge1xuICBjb25zdCBkYXRlID0gcGFyc2VFeHBlbnNlRGF0ZShyYXcpO1xuICBpZiAoIWRhdGUpIHtcbiAgICByZXR1cm4geyB5ZWFyOiBcIlwiLCBtb250aDogXCJcIiwgZGF5OiBcIi0tXCIgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgeWVhcjogU3RyaW5nKGRhdGUuZ2V0RnVsbFllYXIoKSksXG4gICAgbW9udGg6IGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBtb250aDogXCJzaG9ydFwiIH0pLnJlcGxhY2UoL1xcLi9nLCBcIlwiKS50b1VwcGVyQ2FzZSgpLFxuICAgIGRheTogU3RyaW5nKGRhdGUuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIiksXG4gIH07XG59O1xuIiwgInR5cGUgTmF2aWdhdGVXaXRoR3VhcmRPcHRpb25zID0ge1xuICBhc2tDb25maXJtYXRpb24/OiBib29sZWFuO1xuICBieXBhc3NHdWFyZE9uY2U/OiBib29sZWFuO1xuICBtZXNzYWdlPzogc3RyaW5nO1xufTtcblxuLy8gVXBkYXRlcyB0aGUgZ2xvYmFsIG5hdmlnYXRpb24gZ3VhcmQgbGlmZWN5Y2xlIGZvciBhY3RpdmUgZWRpdCBwcm9jZXNzZXMuXG5leHBvcnQgY29uc3Qgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCA9IChhY3RpdmU6IGJvb2xlYW4pOiB2b2lkID0+IHtcbiAgd2luZG93Ll9faW5kU2V0TmF2aWdhdGlvbkd1YXJkPy4oYWN0aXZlKTtcbn07XG5cbi8vIENsZWFycyBnbG9iYWwgbmF2aWdhdGlvbiBndWFyZCBmbGFncyB3aGVuIGNvbXBvbmVudCB1bm1vdW50cy5cbmV4cG9ydCBjb25zdCBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQgPSAoKTogdm9pZCA9PiB7XG4gIHdpbmRvdy5fX2luZENsZWFyTmF2aWdhdGlvbkd1YXJkPy4oKTtcbn07XG5cbi8vIEV4ZWN1dGVzIG5hdmlnYXRpb24gYWN0aW9uIHRocm91Z2ggc2l0ZSBndWFyZCBpZiBhdmFpbGFibGUuXG5leHBvcnQgY29uc3QgcnVuR3VhcmRlZE5hdmlnYXRpb24gPSAoXG4gIGFjdGlvbjogKCkgPT4gdm9pZCxcbiAgb3B0aW9uczogTmF2aWdhdGVXaXRoR3VhcmRPcHRpb25zID0ge31cbik6IHZvaWQgPT4ge1xuICBjb25zdCB7IGFza0NvbmZpcm1hdGlvbiA9IGZhbHNlLCBtZXNzYWdlIH0gPSBvcHRpb25zO1xuICBpZiAoYXNrQ29uZmlybWF0aW9uICYmIHR5cGVvZiB3aW5kb3cuX19pbmRSZXF1ZXN0TmF2aWdhdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24oYWN0aW9uLCBtZXNzYWdlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBhY3Rpb24oKTtcbn07XG5cbi8vIE5hdmlnYXRlcyB0byB0YXJnZXQgVVJMIGFuZCBrZWVwcyBzaXRlLWxldmVsIGd1YXJkIGJlaGF2aW9yIGNvbnNpc3RlbnQuXG5leHBvcnQgY29uc3QgbmF2aWdhdGVUb0V4cGVuc2VVcmwgPSAoXG4gIHRhcmdldFVybDogc3RyaW5nLFxuICBvcHRpb25zOiBOYXZpZ2F0ZVdpdGhHdWFyZE9wdGlvbnMgPSB7fVxuKTogdm9pZCA9PiB7XG4gIGNvbnN0IHNhZmVVcmwgPSBTdHJpbmcodGFyZ2V0VXJsIHx8IFwiXCIpLnRyaW0oKTtcbiAgaWYgKCFzYWZlVXJsKSByZXR1cm47XG5cbiAgY29uc3QgeyBieXBhc3NHdWFyZE9uY2UgPSB0cnVlIH0gPSBvcHRpb25zO1xuICBydW5HdWFyZGVkTmF2aWdhdGlvbigoKSA9PiB7XG4gICAgaWYgKGJ5cGFzc0d1YXJkT25jZSkge1xuICAgICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XG4gICAgfVxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gc2FmZVVybDtcbiAgfSwgb3B0aW9ucyk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7O0FBQUEsSUFBTSx3QkFBd0I7QUFTOUIsSUFBTSx1QkFBdUIsQ0FBQyxVQUEwQjtBQUN0RCxTQUFPLE1BQU0sUUFBUSxjQUFjLEVBQUU7QUFDdkM7QUFFQSxJQUFNLDRCQUE0QixDQUFDLE9BQWUsY0FBa0M7QUFDbEYsUUFBTSxRQUFRLE1BQU0sTUFBTSxTQUFTO0FBQ25DLE1BQUksTUFBTSxVQUFVLEVBQUcsUUFBTztBQUM5QixNQUFJLE1BQU0sS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLEVBQUcsUUFBTztBQUN0RCxNQUFJLE1BQU0sQ0FBQyxFQUFFLFNBQVMsS0FBSyxNQUFNLENBQUMsRUFBRSxTQUFTLEVBQUcsUUFBTztBQUN2RCxTQUFPLE1BQU0sTUFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDLFNBQVMsS0FBSyxXQUFXLENBQUM7QUFDekQ7QUFHTyxJQUFNLDJCQUEyQixDQUFDLFFBQTJEO0FBQ2xHLE1BQUksUUFBUSxRQUFRLFFBQVEsT0FBVyxRQUFPO0FBQzlDLE1BQUksT0FBTyxRQUFRLFNBQVUsUUFBTyxPQUFPLFNBQVMsR0FBRyxJQUFJLE1BQU07QUFFakUsTUFBSSxRQUFRLHFCQUFxQixPQUFPLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLFFBQVEsRUFBRSxDQUFDO0FBQzdFLE1BQUksQ0FBQyxNQUFPLFFBQU87QUFFbkIsTUFBSSxPQUFPO0FBQ1gsTUFBSSxNQUFNLFdBQVcsR0FBRyxHQUFHO0FBQ3pCLFdBQU87QUFDUCxZQUFRLE1BQU0sTUFBTSxDQUFDO0FBQUEsRUFDdkIsV0FBVyxNQUFNLFdB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QUFHO0FBQzlCLFdBQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxJQUFJLG9CQUFvQixLQUFLLFNBQVMsQ0FBQyxDQUFDLElBQUksS0FBSyxZQUFZLENBQUMsR0FBRyxZQUFZO0FBQUEsRUFDdkc7QUFFQSxTQUFPLEtBQ0osbUJBQW1CLFlBQVk7QUFBQSxJQUM5QixLQUFLO0FBQUEsSUFDTCxPQUFPO0FBQUEsSUFDUCxNQUFNO0FBQUEsRUFDUixDQUFDLEVBQ0EsUUFBUSxPQUFPLEVBQUUsRUFDakIsWUFBWTtBQUNqQjtBQUdPLElBQU0seUJBQXlCLENBQUMsS0FBYyxTQUFTLFlBQThCO0FBQzFGLFFBQU0sT0FBTyxpQkFBaUIsR0FBRztBQUNqQyxNQUFJLENBQUMsTUFBTTtBQUNULFdBQU8sRUFBRSxNQUFNLElBQUksT0FBTyxJQUFJLEtBQUssS0FBSztBQUFBLEVBQzFDO0FBRUEsU0FBTztBQUFBLElBQ0wsTUFBTSxPQUFPLEtBQUssWUFBWSxDQUFDO0FBQUEsSUFDL0IsT0FBTyxLQUFLLG1CQUFtQixRQUFRLEVBQUUsT0FBTyxRQUFRLENBQUMsRUFBRSxRQUFRLE9BQU8sRUFBRSxFQUFFLFlBQVk7QUFBQSxJQUMxRixLQUFLLE9BQU8sS0FBSyxRQUFRLENBQUMsRUFBRSxTQUFTLEdBQUcsR0FBRztBQUFBLEVBQzdDO0FBQ0Y7OztBQ2xJTyxJQUFNLDRCQUE0QixDQUFDLFdBQTBCO0FBQ2xFLFNBQU8sMEJBQTBCLE1BQU07QUFDekM7QUFHTyxJQUFNLDhCQUE4QixNQUFZO0FBQ3JELFNBQU8sNEJBQTRCO0FBQ3JDO0FBR08sSUFBTSx1QkFBdUIsQ0FDbEMsUUFDQSxVQUFvQyxDQUFDLE1BQzVCO0FBQ1QsUUFBTSxFQUFFLGtCQUFrQixPQUFPLFFBQVEsSUFBSTtBQUM3QyxNQUFJLG1CQUFtQixPQUFPLE9BQU8sMkJBQTJCLFlBQVk7QUFDMUUsV0FBTyx1QkFBdUIsUUFBUSxPQUFPO0FBQzdDO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFDVDtBQUdPLElBQU0sdUJBQXVCLENBQ2xDLFdBQ0EsVUFBb0MsQ0FBQyxNQUM1QjtBQUNULFFBQU0sVUFBVSxPQUFPLGFBQWEsRUFBRSxFQUFFLEtBQUs7QUFDN0MsTUFBSSxDQUFDLFFBQVM7QUFFZCxRQUFNLEVBQUUsa0JBQWtCLEtBQUssSUFBSTtBQUNuQyx1QkFBcUIsTUFBTTtBQUN6QixRQUFJLGlCQUFpQjtBQUNuQixhQUFPLGlDQUFpQztBQUFBLElBQzFDO0FBQ0EsV0FBTyxTQUFTLE9BQU87QUFBQSxFQUN6QixHQUFHLE9BQU87QUFDWjsiLAogICJuYW1lcyI6IFsieWVhciIsICJtb250aCIsICJkYXkiLCAic2FmZVRleHQiXQp9Cg==
