import {
  handleComboboxKeyDown
} from "./chunk-6HMZLOGF.js";
import {
  ApiFetchError,
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  Spinner_default,
  classNames,
  fetchJson,
  indT,
  useOutsideClick
} from "./chunk-CEAHDJRV.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

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

// Web/wwwroot/react/src/pages/gastos/components/ExpenseProjectFilterInput.tsx
var import_react2 = __toESM(require_react());

// Web/wwwroot/react/src/components/commons/RemoteSearchCombobox.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var uniqueByValue = (items) => {
  const map = /* @__PURE__ */ new Map();
  for (const item of items || []) {
    const key = String(item.value || "").trim();
    if (!key) continue;
    if (map.has(key)) continue;
    map.set(key, {
      value: key,
      title: String(item.title || "").trim(),
      subtitle: String(item.subtitle || "").trim()
    });
  }
  return Array.from(map.values());
};
var RemoteSearchCombobox = ({
  label,
  placeholder,
  value,
  onChange,
  onSearch,
  onSearchPage,
  idBase,
  minSearchLength = 2,
  pageSize = 20,
  allowEmptySearch = false,
  loadOnOpen = false,
  infiniteScroll = false,
  disabled = false,
  readOnly = false,
  showLabel = true,
  panelClassName = "visitas-typography"
}) => {
  const readOnlyMode = readOnly || disabled;
  const valueColor = readOnlyMode ? "#64748b" : "#00296be0";
  const [query, setQuery] = (0, import_react.useState)(value || "");
  const [options, setOptions] = (0, import_react.useState)([]);
  const [open, setOpen] = (0, import_react.useState)(false);
  const [loading, setLoading] = (0, import_react.useState)(false);
  const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
  const [lastSearchedTerm, setLastSearchedTerm] = (0, import_react.useState)("");
  const [currentPage, setCurrentPage] = (0, import_react.useState)(0);
  const [hasMore, setHasMore] = (0, import_react.useState)(false);
  const abortRef = (0, import_react.useRef)(null);
  const appendRequestRef = (0, import_react.useRef)(false);
  const containerRef = (0, import_react.useRef)(null);
  const boxRef = (0, import_react.useRef)(null);
  const listRef = (0, import_react.useRef)(null);
  useOutsideClick([containerRef, listRef], () => setOpen(false));
  (0, import_react.useEffect)(() => {
    setQuery(value || "");
  }, [value]);
  (0, import_react.useEffect)(() => {
    return () => {
      abortRef.current?.abort();
      abortRef.current = null;
    };
  }, []);
  const filtered = (0, import_react.useMemo)(() => {
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter((option) => {
      const valueText = option.value.toLowerCase();
      const titleText = String(option.title || "").toLowerCase();
      const subtitleText = String(option.subtitle || "").toLowerCase();
      return valueText.includes(q) || titleText.includes(q) || subtitleText.includes(q);
    });
  }, [options, query]);
  (0, import_react.useEffect)(() => {
    if (appendRequestRef.current) {
      return;
    }
    setActiveIndex(0);
  }, [filtered.length, query]);
  const canSearchTerm = (0, import_react.useCallback)(
    (term) => {
      const trimmed = term.trim();
      if (!trimmed) return allowEmptySearch;
      return trimmed.length >= minSearchLength;
    },
    [allowEmptySearch, minSearchLength]
  );
  const executeSearch = (0, import_react.useCallback)(
    async (term, page, append) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      appendRequestRef.current = append;
      setLoading(true);
      const termKey = term.toLowerCase();
      try {
        if (onSearchPage) {
          const response = await onSearchPage(term, page, pageSize, controller.signal);
          const pageItems = uniqueByValue(Array.isArray(response?.items) ? response.items : []);
          setOptions((previous) => append ? uniqueByValue([...previous || [], ...pageItems]) : pageItems);
          setCurrentPage(page);
          const apiTotal = Number(response?.total);
          if (Number.isFinite(apiTotal) && apiTotal > 0) {
            setHasMore(page * pageSize < apiTotal);
          } else {
            setHasMore(pageItems.length >= pageSize);
          }
        } else {
          const response = await onSearch(term, controller.signal);
          const next = uniqueByValue(response || []);
          setOptions(next);
          setCurrentPage(1);
          setHasMore(false);
        }
        setLastSearchedTerm(termKey);
        setOpen(true);
      } catch {
        if (!append) {
          setOptions([]);
          setCurrentPage(0);
          setHasMore(false);
        }
        setLastSearchedTerm(termKey);
        setOpen(true);
      } finally {
        if (abortRef.current === controller) {
          abortRef.current = null;
        }
        appendRequestRef.current = false;
        setLoading(false);
      }
    },
    [onSearch, onSearchPage, pageSize]
  );
  const runSearch = (0, import_react.useCallback)(async () => {
    if (readOnlyMode || loading) return;
    const term = query.trim();
    const termKey = term.toLowerCase();
    if (!canSearchTerm(term)) {
      setOptions([]);
      setCurrentPage(0);
      setHasMore(false);
      setOpen(false);
      setLastSearchedTerm("");
      return;
    }
    if (termKey === lastSearchedTerm && options.length > 0 && !onSearchPage) {
      setOpen(true);
      return;
    }
    await executeSearch(term, 1, false);
  }, [canSearchTerm, executeSearch, lastSearchedTerm, loading, onSearchPage, options.length, query, readOnlyMode]);
  const runLoadMore = (0, import_react.useCallback)(async () => {
    if (readOnlyMode || loading || !onSearchPage || !infiniteScroll || !hasMore) {
      return;
    }
    const term = query.trim();
    const termKey = term.toLowerCase();
    if (termKey !== lastSearchedTerm) {
      return;
    }
    const nextPage = currentPage + 1;
    if (nextPage <= 1) {
      return;
    }
    await executeSearch(term, nextPage, true);
  }, [currentPage, executeSearch, hasMore, infiniteScroll, lastSearchedTerm, loading, onSearchPage, query, readOnlyMode]);
  (0, import_react.useEffect)(() => {
    if (!open || !onSearchPage || !infiniteScroll) return;
    const scroller = listRef.current?.parentElement;
    if (!scroller) return;
    const onScroll = () => {
      if (loading || !hasMore) return;
      const threshold = 40;
      const isNearBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - threshold;
      if (isNearBottom) {
        void runLoadMore();
      }
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
    };
  }, [hasMore, infiniteScroll, loading, onSearchPage, open, runLoadMore]);
  const selectOption = (option) => {
    const nextValue = String(option.value || "").trim();
    setQuery(nextValue);
    onChange(nextValue);
    setLastSearchedTerm(nextValue.toLowerCase());
    setOpen(false);
  };
  const queryKey = query.trim().toLowerCase();
  const showSearchIcon = !readOnlyMode && !loading && canSearchTerm(query) && queryKey !== lastSearchedTerm;
  const listId = `${idBase}-options`;
  const activeId = open && filtered[activeIndex] ? `${idBase}-opt-${filtered[activeIndex].value}` : void 0;
  const showLoadingOnlyState = loading && filtered.length === 0;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-2", ref: containerRef, children: [
    showLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", style: { color: "#00296be0" }, children: label }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "div",
        {
          ref: boxRef,
          className: classNames(
            "relative w-full rounded-xl bg-white text-left focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-white sm:text-sm",
            readOnlyMode ? "ind-readonly-field" : ""
          ),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                className: classNames(
                  "w-full rounded-xl border px-3 py-2 pr-20 text-sm sm:text-base leading-5 focus:outline-hidden focus:ring-2 disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:cursor-not-allowed",
                  "border-slate-200 focus:ring-primary focus:border-primary",
                  readOnlyMode ? "ind-readonly-field" : "text-slate-900"
                ),
                style: { color: valueColor },
                value: query,
                onChange: (event) => {
                  const nextValue = event.target.value;
                  setQuery(nextValue);
                  onChange(nextValue);
                  if (nextValue.trim().toLowerCase() !== lastSearchedTerm) {
                    setOpen(false);
                  }
                },
                onFocus: () => {
                  if (!readOnlyMode && filtered.length > 0) {
                    setOpen(true);
                  }
                },
                onKeyDown: (event) => handleComboboxKeyDown(event, {
                  isOpen: open,
                  setOpen,
                  optionCount: filtered.length,
                  setActiveIndex,
                  onEnterWhenOpen: () => {
                    if (filtered.length > 0) {
                      selectOption(filtered[activeIndex] ?? filtered[0]);
                      return;
                    }
                    void runSearch();
                  },
                  onEnterWhenClosed: () => {
                    void runSearch();
                  },
                  openOnArrow: true
                }),
                placeholder,
                readOnly,
                disabled,
                "aria-label": label,
                role: "combobox",
                "aria-expanded": open,
                "aria-controls": listId,
                "aria-activedescendant": activeId
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "absolute inset-y-0 right-0 flex items-center gap-1 pr-2", children: [
              loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex items-center px-1.5", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner_default, { size: "h-4 w-4" }) }) : null,
              showSearchIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  type: "button",
                  className: "flex items-center p-1.5 text-slate-400 hover:text-slate-500",
                  onClick: () => {
                    void runSearch();
                  },
                  "aria-label": indT("Common_Search", "Search"),
                  disabled: readOnlyMode,
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "h-5 w-5", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" }) })
                }
              ) : null,
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  type: "button",
                  className: "flex items-center p-1.5 text-slate-500 hover:text-slate-600",
                  onClick: () => {
                    if (readOnlyMode) return;
                    if (open) {
                      setOpen(false);
                      return;
                    }
                    if (filtered.length > 0) {
                      setOpen(true);
                      return;
                    }
                    if (!query.trim() && loadOnOpen) {
                      void runSearch();
                    }
                  },
                  "aria-label": open ? indT("Dropdown_HideOptions", "Hide options") : indT("Dropdown_ShowOptions", "Show options"),
                  disabled: readOnlyMode,
                  children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUpSvg, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDownSvg, { className: "h-5 w-5" })
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        FloatingList_default,
        {
          anchorRef: boxRef,
          open,
          zIndex: 36e4,
          maxHeightClass: "max-h-72",
          role: "listbox",
          roundedClass: "rounded-xl",
          panelClassName,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { id: listId, ref: listRef, children: showLoadingOnlyState ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Common_Loading", "Loading") }) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Common_NoData", "No data") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            filtered.map((option, index) => {
              const isActive = index === activeIndex;
              const optionId = option.value || `${index}`;
              return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  type: "button",
                  id: `${idBase}-opt-${optionId}`,
                  role: "option",
                  "aria-selected": isActive,
                  className: classNames(
                    "relative flex w-full cursor-default select-none items-start py-2 px-3 text-left text-sm",
                    isActive ? "bg-primary text-white" : "text-slate-900"
                  ),
                  onMouseEnter: () => setActiveIndex(index),
                  onClick: () => selectOption(option),
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex flex-col", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-medium", children: option.title || option.value }),
                    option.subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: classNames("text-xs", isActive ? "text-white/90" : "text-slate-500"), children: option.subtitle }) : null
                  ] })
                },
                optionId
              );
            }),
            loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-4 py-2 text-xs text-slate-500 border-t border-slate-100", children: indT("Common_Loading", "Loading") }) : null
          ] }) })
        }
      )
    ] })
  ] });
};
var RemoteSearchCombobox_default = RemoteSearchCombobox;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseProjectFilterInput.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var SEARCH_PAGE_SIZE = 20;
var mapProjectOptions = (items) => {
  return (Array.isArray(items) ? items : []).map((item) => {
    const valueText = String(item?.value || "").trim();
    if (!valueText) return null;
    const subtitle = String(item?.text || "").trim();
    return {
      value: valueText,
      title: valueText,
      subtitle: subtitle || "-"
    };
  }).filter(Boolean);
};
var ExpenseProjectFilterInput = ({
  label,
  placeholder,
  value,
  onChange,
  readOnly = false,
  disabled = false,
  showLabel = true
}) => {
  const loadOptions = (0, import_react2.useCallback)(async (term, signal) => {
    const response = await fetchExpenseProjects(term, 1, SEARCH_PAGE_SIZE, {
      signal,
      suppressPermissionModal: true
    });
    return mapProjectOptions(response?.items);
  }, []);
  const loadOptionsPage = (0, import_react2.useCallback)(async (term, page, pageSize, signal) => {
    const response = await fetchExpenseProjects(term, page, pageSize, {
      signal,
      suppressPermissionModal: true
    });
    return {
      items: mapProjectOptions(response?.items),
      total: Number(response?.total || 0)
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    RemoteSearchCombobox_default,
    {
      label,
      placeholder,
      value,
      onChange,
      onSearch: loadOptions,
      onSearchPage: loadOptionsPage,
      idBase: "expense-project-filter",
      minSearchLength: 0,
      pageSize: SEARCH_PAGE_SIZE,
      allowEmptySearch: true,
      loadOnOpen: true,
      infiniteScroll: true,
      disabled,
      readOnly,
      showLabel,
      panelClassName: "visitas-typography"
    }
  );
};
var ExpenseProjectFilterInput_default = ExpenseProjectFilterInput;

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
  RemoteSearchCombobox_default,
  ExpenseProjectFilterInput_default,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZXhwZW5zZUZvcm1hdHRlcnMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlQXBpLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZVVpVXRpbHMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlTmF2aWdhdGlvbi50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dC50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9SZW1vdGVTZWFyY2hDb21ib2JveC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IEVYUEVOU0VfTlVNQkVSX0xPQ0FMRSA9IFwiZW4tVVNcIjtcblxudHlwZSBFeHBlbnNlTnVtYmVyRm9ybWF0T3B0aW9ucyA9IHtcbiAgbWluaW11bUZyYWN0aW9uRGlnaXRzPzogbnVtYmVyO1xuICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM/OiBudW1iZXI7XG4gIHVzZUdyb3VwaW5nPzogYm9vbGVhbjtcbiAgZmFsbGJhY2s/OiBzdHJpbmc7XG59O1xuXG5jb25zdCBzYW5pdGl6ZU51bWVyaWNUb2tlbiA9ICh2YWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIHZhbHVlLnJlcGxhY2UoL1teXFxkLiwrLV0vZywgXCJcIik7XG59O1xuXG5jb25zdCBpc1Rob3VzYW5kc0dyb3VwZWRJbnRlZ2VyID0gKHZhbHVlOiBzdHJpbmcsIHNlcGFyYXRvcjogXCIsXCIgfCBcIi5cIik6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBwYXJ0cyA9IHZhbHVlLnNwbGl0KHNlcGFyYXRvcik7XG4gIGlmIChwYXJ0cy5sZW5ndGggPD0gMSkgcmV0dXJuIGZhbHNlO1xuICBpZiAocGFydHMuc29tZSgocGFydCkgPT4gIS9eXFxkKyQvLnRlc3QocGFydCkpKSByZXR1cm4gZmFsc2U7XG4gIGlmIChwYXJ0c1swXS5sZW5ndGggPCAxIHx8IHBhcnRzWzBdLmxlbmd0aCA+IDMpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHBhcnRzLnNsaWNlKDEpLmV2ZXJ5KChwYXJ0KSA9PiBwYXJ0Lmxlbmd0aCA9PT0gMyk7XG59O1xuXG4vLyBQYXJzZXMgbnVtZXJpYyBpbnB1dCBzdXBwb3J0aW5nIGJvdGggZ3JvdXBlZCBhbmQgZGVjaW1hbCB2YWx1ZXMuXG5leHBvcnQgY29uc3QgcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0ID0gKHJhdzogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IG51bWJlciB8IG51bGwgPT4ge1xuICBpZiAocmF3ID09PSBudWxsIHx8IHJhdyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbDtcbiAgaWYgKHR5cGVvZiByYXcgPT09IFwibnVtYmVyXCIpIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocmF3KSA/IHJhdyA6IG51bGw7XG5cbiAgbGV0IHZhbHVlID0gc2FuaXRpemVOdW1lcmljVG9rZW4oU3RyaW5nKHJhdyB8fCBcIlwiKS50cmltKCkucmVwbGFjZSgvXFxzKy9nLCBcIlwiKSk7XG4gIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xuXG4gIGxldCBzaWduID0gXCJcIjtcbiAgaWYgKHZhbHVlLnN0YXJ0c1dpdGgoXCItXCIpKSB7XG4gICAgc2lnbiA9IFwiLVwiO1xuICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMSk7XG4gIH0gZWxzZSBpZiAodmFsdWUuc3RhcnRzV2l0aChcIitcIikpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDEpO1xuICB9XG5cbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bKy1dL2csIFwiXCIpO1xuICBpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBoYXNDb21tYSA9IHZhbHVlLmluY2x1ZGVzKFwiLFwiKTtcbiAgY29uc3QgaGFzRG90ID0gdmFsdWUuaW5jbHVkZXMoXCIuXCIpO1xuXG4gIGlmIChoYXNDb21tYSAmJiAhaGFzRG90ICYmIGlzVGhvdXNhbmRzR3JvdXBlZEludGVnZXIodmFsdWUsIFwiLFwiKSkge1xuICAgIGNvbnN0IHBhcnNlZEludGVnZXIgPSBOdW1iZXIoYCR7c2lnbn0ke3ZhbHVlLnJlcGxhY2UoLywvZywgXCJcIil9YCk7XG4gICAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWRJbnRlZ2VyKSA/IHBhcnNlZEludGVnZXIgOiBudWxsO1xuICB9XG5cbiAgaWYgKGhhc0RvdCAmJiAhaGFzQ29tbWEgJiYgaXNUaG91c2FuZHNHcm91cGVkSW50ZWdlcih2YWx1ZSwgXCIuXCIpKSB7XG4gICAgY29uc3QgcGFyc2VkSW50ZWdlciA9IE51bWJlcihgJHtzaWdufSR7dmFsdWUucmVwbGFjZSgvXFwuL2csIFwiXCIpfWApO1xuICAgIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkSW50ZWdlcikgPyBwYXJzZWRJbnRlZ2VyIDogbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGxhc3RDb21tYSA9IHZhbHVlLmxhc3RJbmRleE9mKFwiLFwiKTtcbiAgY29uc3QgbGFzdERvdCA9IHZhbHVlLmxhc3RJbmRleE9mKFwiLlwiKTtcbiAgY29uc3QgZGVjaW1hbFNlcGFyYXRvckluZGV4ID0gTWF0aC5tYXgobGFzdENvbW1hLCBsYXN0RG90KTtcblxuICBsZXQgbm9ybWFsaXplZDogc3RyaW5nO1xuICBpZiAoZGVjaW1hbFNlcGFyYXRvckluZGV4ID49IDApIHtcbiAgICBjb25zdCBpbnRlZ2VyUGFydCA9IHZhbHVlLnNsaWNlKDAsIGRlY2ltYWxTZXBhcmF0b3JJbmRleCkucmVwbGFjZSgvWy4sXS9nLCBcIlwiKTtcbiAgICBjb25zdCBkZWNpbWFsUGFydCA9IHZhbHVlLnNsaWNlKGRlY2ltYWxTZXBhcmF0b3JJbmRleCArIDEpLnJlcGxhY2UoL1suLF0vZywgXCJcIik7XG4gICAgbm9ybWFsaXplZCA9IGAke3NpZ259JHtpbnRlZ2VyUGFydCB8fCBcIjBcIn0ke2RlY2ltYWxQYXJ0ID8gYC4ke2RlY2ltYWxQYXJ0fWAgOiBcIlwifWA7XG4gIH0gZWxzZSB7XG4gICAgbm9ybWFsaXplZCA9IGAke3NpZ259JHt2YWx1ZS5yZXBsYWNlKC9bLixdL2csIFwiXCIpfWA7XG4gIH1cblxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIobm9ybWFsaXplZCk7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSA/IHBhcnNlZCA6IG51bGw7XG59O1xuXG4vLyBGb3JtYXRzIG51bWVyaWMgdmFsdWVzIHdpdGggdGhlIGZpeGVkIGV4cGVuc2UgdmlzdWFsIGNvbnRyYWN0OiAjLCMjMC4wMFxuZXhwb3J0IGNvbnN0IGZvcm1hdEV4cGVuc2VOdW1iZXIgPSAoXG4gIHZhbHVlOiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkLFxuICBvcHRpb25zPzogRXhwZW5zZU51bWJlckZvcm1hdE9wdGlvbnNcbik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGZhbGxiYWNrID0gb3B0aW9ucz8uZmFsbGJhY2sgPz8gXCItXCI7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IE51bWJlci5pc05hTihOdW1iZXIodmFsdWUpKSkge1xuICAgIHJldHVybiBmYWxsYmFjaztcbiAgfVxuXG4gIHJldHVybiBuZXcgSW50bC5OdW1iZXJGb3JtYXQoRVhQRU5TRV9OVU1CRVJfTE9DQUxFLCB7XG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiBvcHRpb25zPy5taW5pbXVtRnJhY3Rpb25EaWdpdHMgPz8gMixcbiAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IG9wdGlvbnM/Lm1heGltdW1GcmFjdGlvbkRpZ2l0cyA/PyAyLFxuICAgIHVzZUdyb3VwaW5nOiBvcHRpb25zPy51c2VHcm91cGluZyA/PyB0cnVlLFxuICB9KS5mb3JtYXQoTnVtYmVyKHZhbHVlKSk7XG59O1xuXG4vLyBQYXJzZXMgYW5kIGZvcm1hdHMgcmF3IGlucHV0IHZhbHVlcyB0byB0aGUgZml4ZWQgZXhwZW5zZSB2aXN1YWwgY29udHJhY3QuXG5leHBvcnQgY29uc3QgZm9ybWF0RXhwZW5zZUlucHV0TnVtYmVyID0gKFxuICByYXc6IHN0cmluZyB8IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQsXG4gIG9wdGlvbnM/OiBFeHBlbnNlTnVtYmVyRm9ybWF0T3B0aW9uc1xuKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VFeHBlbnNlTnVtZXJpY0lucHV0KHJhdyk7XG4gIGlmIChwYXJzZWQgPT09IG51bGwpIHtcbiAgICByZXR1cm4gb3B0aW9ucz8uZmFsbGJhY2sgPz8gXCJcIjtcbiAgfVxuXG4gIHJldHVybiBmb3JtYXRFeHBlbnNlTnVtYmVyKHBhcnNlZCwge1xuICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogb3B0aW9ucz8ubWluaW11bUZyYWN0aW9uRGlnaXRzID8/IDIsXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiBvcHRpb25zPy5tYXhpbXVtRnJhY3Rpb25EaWdpdHMgPz8gMixcbiAgICB1c2VHcm91cGluZzogb3B0aW9ucz8udXNlR3JvdXBpbmcgPz8gdHJ1ZSxcbiAgICBmYWxsYmFjazogb3B0aW9ucz8uZmFsbGJhY2sgPz8gXCJcIixcbiAgfSk7XG59O1xuIiwgImltcG9ydCB7IGZvcm1hdEV4cGVuc2VOdW1iZXIgfSBmcm9tIFwiLi91dGlscy9leHBlbnNlTnVtYmVyRm9ybWF0LnRzXCI7XG5cbi8vIEZvcm1hdHMgYSBudW1lcmljIGFtb3VudCB3aXRoIGZpeGVkIFVJIG51bWJlciBzdHlsZSBhbmQgb3B0aW9uYWwgY3VycmVuY3kgY29kZS5cbmV4cG9ydCBjb25zdCBmb3JtYXRBbW91bnRXaXRoQ3VycmVuY3kgPSAoXG4gIGFtb3VudDogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCxcbiAgY3VycmVuY3lDb2RlPzogc3RyaW5nLFxuICBfbG9jYWxlPzogc3RyaW5nXG4pOiBzdHJpbmcgPT4ge1xuICBpZiAoYW1vdW50ID09PSBudWxsIHx8IGFtb3VudCA9PT0gdW5kZWZpbmVkIHx8IE51bWJlci5pc05hTihOdW1iZXIoYW1vdW50KSkpIHtcbiAgICByZXR1cm4gXCItXCI7XG4gIH1cblxuICBjb25zdCBzYWZlQ3VycmVuY3kgPSBTdHJpbmcoY3VycmVuY3lDb2RlIHx8IFwiXCIpLnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBkZWNpbWFsVGV4dCA9IGZvcm1hdEV4cGVuc2VOdW1iZXIoYW1vdW50LCB7XG4gICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogMixcbiAgICB1c2VHcm91cGluZzogdHJ1ZSxcbiAgICBmYWxsYmFjazogXCItXCIsXG4gIH0pO1xuXG4gIGlmIChzYWZlQ3VycmVuY3kpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIG5ldyBJbnRsLk51bWJlckZvcm1hdChcImVuLVVTXCIsIHtcbiAgICAgICAgc3R5bGU6IFwiY3VycmVuY3lcIixcbiAgICAgICAgY3VycmVuY3k6IHNhZmVDdXJyZW5jeSxcbiAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgICB9KS5mb3JtYXQoYW1vdW50KTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIEZhbGwgYmFjayB0byBkZWNpbWFsICsgY29kZSB3aGVuIGN1cnJlbmN5IGNvZGUgaXMgaW52YWxpZC5cbiAgICB9XG4gIH1cblxuICByZXR1cm4gc2FmZUN1cnJlbmN5ID8gYCR7ZGVjaW1hbFRleHR9ICR7c2FmZUN1cnJlbmN5fWAgOiBkZWNpbWFsVGV4dDtcbn07XG4iLCAiaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciwgZmV0Y2hKc29uLCB0eXBlIEFwaUZldGNoT3B0aW9ucyB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgdHlwZSB7XG4gIEVudHJhQ29udGV4dER0byxcbiAgRW50cmFDb250ZXh0UmVxdWVzdCxcbiAgRXhjaGFuZ2VSYXRlRHRvLFxuICBFeHBlbnNlR2FzdG9UeXBlQ29kZSxcbiAgRnVlbFByaWNlS21EdG8sXG4gIEV4cGVuc2VTaGVldENhcmQsXG4gIEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvLFxuICBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRDcmVhdGVSZXNwb25zZURhdGEsXG4gIEV4cGVuc2VTaGVldERldGFpbER0byxcbiAgRXhwZW5zZVNoZWV0RHJhZnRSZXNwb25zZSxcbiAgRXhwZW5zZVNoZWV0SGVhZGVyLFxuICBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRMaW5lLFxuICBFeHBlbnNlU2hlZXRMaW5lRHRvLFxuICBFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlc3BvbnNlRGF0YSxcbiAgRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldExpc3RJdGVtRHRvLFxuICBFeHBlbnNlU2hlZXRUaWNrZXRDcmVhdGVSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRUaWNrZXREZXRhaWxEdG8sXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmVSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0byxcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG8sXG4gIEluZEFwaVJlc3BvbnNlLFxuICBJbmRQYWdlZFJlc3BvbnNlLFxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5cbnR5cGUgUHJvamVjdERyb3Bkb3duUmVzcG9uc2UgPSB7XG4gIHRvdGFsPzogbnVtYmVyO1xuICBpdGVtcz86IEFycmF5PHsgdmFsdWU/OiBzdHJpbmc7IHRleHQ/OiBzdHJpbmcgfT47XG59O1xuXG50eXBlIExlZ2FjeUV4cGVuc2VMaXN0SXRlbSA9IHtcbiAgaG9qYUdhc3Rvc0lkPzogdW5rbm93bjtcbiAgZGVzY3JpcHRpb24/OiB1bmtub3duO1xuICBlc3RhZG9Db21lbnRhcmlvcz86IHVua25vd247XG4gIHZvdWNoZXI/OiB1bmtub3duO1xuICBwcm9qSWQ/OiB1bmtub3duO1xuICBjdXJyZW5jeUNvZGU/OiB1bmtub3duO1xuICB0b3RhbEFtb3VudD86IHVua25vd247XG4gIHRvdGFsQW1vdW50TVNUPzogdW5rbm93bjtcbiAgZXhjaFJhdGU/OiB1bmtub3duO1xuICB1c2VySWQ/OiB1bmtub3duO1xuICBleGNoYW5nZVJhdGVNb2RlPzogdW5rbm93bjtcbiAgZXhwZW5zZVNoZWV0U3RhdHVzPzogdW5rbm93bjtcbiAgY3JlYXRlZERhdGU/OiB1bmtub3duO1xufTtcblxudHlwZSBMZWdhY3lFeHBlbnNlTGlzdFJlc3BvbnNlID0ge1xuICBzdWNjZXNzPzogYm9vbGVhbjtcbiAgbWVzc2FnZT86IHN0cmluZztcbiAgdG90YWw/OiBudW1iZXI7XG4gIHBhZ2U/OiBudW1iZXI7XG4gIHBhZ2VTaXplPzogbnVtYmVyO1xuICBpdGVtcz86IExlZ2FjeUV4cGVuc2VMaXN0SXRlbVtdO1xufTtcblxudHlwZSBFeHBlbnNlQXBpQ29udGV4dCA9IHtcbiAgdG9rZW46IHN0cmluZztcbiAgY29tcGFueUlkOiBzdHJpbmc7XG4gIGF4VXNlcklkOiBzdHJpbmc7XG4gIGRlZmF1bHRDdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcbn07XG5cbnR5cGUgRXhwZW5zZUFwaUF1dGhTZWVkID0ge1xuICB0b2tlbjogc3RyaW5nO1xuICBlbnRyYU9pZDogc3RyaW5nO1xuICBhcHBDb2RlOiBzdHJpbmc7XG4gIHN0cmljdEFwaVJvdXRlczogYm9vbGVhbjtcbn07XG5cbnR5cGUgRXhwZW5zZVdpbmRvd1J1bnRpbWUgPSB7XG4gIF9fSU5EX0FQSV9UT0tFTl9fPzogc3RyaW5nO1xuICBfX0lORF9FTlRSQV9PSURfXz86IHN0cmluZztcbiAgX19JTkRfQVBQX0NPREVfXz86IHN0cmluZztcbiAgX19JTkRfU0VMRUNURURfQ09NUEFOWV9fPzogc3RyaW5nO1xuICBfX0lORF9FWFBFTlNFX1NUUklDVF9BUElfXz86IGJvb2xlYW4gfCBzdHJpbmc7XG4gIF9fRVhQRU5TRV9HQVNUT19UWVBFU19fPzogQXJyYXk8e1xuICAgIHZhbHVlPzogdW5rbm93bjtcbiAgICBWYWx1ZT86IHVua25vd247XG4gICAgdGV4dD86IHVua25vd247XG4gICAgVGV4dD86IHVua25vd247XG4gIH0+O1xufTtcblxudHlwZSBFeHBlbnNlR2FzdG9UeXBlRW50cnkgPSBOb25OdWxsYWJsZTxFeHBlbnNlV2luZG93UnVudGltZVtcIl9fRVhQRU5TRV9HQVNUT19UWVBFU19fXCJdPltudW1iZXJdO1xuXG5jb25zdCBERUZBVUxUX0FQUF9DT0RFID0gXCJDUk1cIjtcbmNvbnN0IEpTT05fSEVBREVSUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG59O1xuY29uc3QgQUxMT1dFRF9HQVNUT19UWVBFX0NPREVTID0gbmV3IFNldDxudW1iZXI+KFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxNF0pO1xuXG5sZXQgcnVudGltZUF1dGhTZWVkOiBQYXJ0aWFsPEV4cGVuc2VBcGlBdXRoU2VlZD4gPSB7fTtcbmxldCBjYWNoZWRDb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCB8IG51bGwgPSBudWxsO1xubGV0IGNhY2hlZENvbnRleHRLZXkgPSBcIlwiO1xubGV0IGNvbnRleHRQcm9taXNlOiBQcm9taXNlPEV4cGVuc2VBcGlDb250ZXh0PiB8IG51bGwgPSBudWxsO1xuY29uc3QgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMgPSBuZXcgTWFwPHN0cmluZywgSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+KCk7XG5jb25zdCBwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cyA9IG5ldyBNYXA8c3RyaW5nLCBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+Pj4oKTtcblxuY29uc3Qgc2FmZVRleHQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XG4gIHJldHVybiBTdHJpbmcodmFsdWUpLnRyaW0oKTtcbn07XG5cbmNvbnN0IHRvTnVsbGFibGVOdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgPyBwYXJzZWQgOiBudWxsO1xufTtcblxuY29uc3QgaXNOb25OZWdhdGl2ZU51bWJlciA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBwYXJzZWQgPSB0b051bGxhYmxlTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIHBhcnNlZCAhPT0gbnVsbCAmJiBwYXJzZWQgPj0gMDtcbn07XG5cbmNvbnN0IGlzUG9zaXRpdmVOdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcbiAgY29uc3QgcGFyc2VkID0gdG9OdWxsYWJsZU51bWJlcih2YWx1ZSk7XG4gIHJldHVybiBwYXJzZWQgIT09IG51bGwgJiYgcGFyc2VkID4gMDtcbn07XG5cbmNvbnN0IGlzVmFsaWRMaXN0RXhwZW5zZVNoZWV0U3RhdHVzID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHRvTnVsbGFibGVOdW1iZXIodmFsdWUpO1xuICByZXR1cm4gcGFyc2VkICE9PSBudWxsICYmIE51bWJlci5pc0ludGVnZXIocGFyc2VkKSAmJiBwYXJzZWQgPj0gMCAmJiBwYXJzZWQgPD0gNDtcbn07XG5cbmNvbnN0IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlID0gKHZhbHVlOiB1bmtub3duKTogRXhwZW5zZUdhc3RvVHlwZUNvZGUgfCBudWxsID0+IHtcbiAgY29uc3QgcGFyc2VkID0gdG9OdWxsYWJsZU51bWJlcih2YWx1ZSk7XG4gIGlmIChwYXJzZWQgPT09IG51bGwgfHwgIU51bWJlci5pc0ludGVnZXIocGFyc2VkKSB8fCAhQUxMT1dFRF9HQVNUT19UWVBFX0NPREVTLmhhcyhwYXJzZWQpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gcGFyc2VkIGFzIEV4cGVuc2VHYXN0b1R5cGVDb2RlO1xufTtcblxuY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUgPSAodmFsdWU6IHVua25vd24pOiBFeHBlbnNlR2FzdG9UeXBlQ29kZSB8IHVuZGVmaW5lZCA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHNhZmVUZXh0KHZhbHVlKSA9PT0gXCJcIikge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBwYXJzZWQgPSB0b051bGxhYmxlR2FzdG9UeXBlQ29kZSh2YWx1ZSk7XG4gIGlmIChwYXJzZWQgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImdhc3RvVHlwZSBtdXN0IGJlIG9uZSBvZjogMCwxLDIsMyw0LDUsNiw3LDgsMTQuXCIpO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzID0gKHZhbHVlOiB1bmtub3duKTogMCB8IDEgfCB1bmRlZmluZWQgPT4ge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCBzYWZlVGV4dCh2YWx1ZSkgPT09IFwiXCIpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3QgcGFyc2VkID0gdG9OdWxsYWJsZU51bWJlcih2YWx1ZSk7XG4gIGlmIChwYXJzZWQgPT09IDAgfHwgcGFyc2VkID09PSAxKSB7XG4gICAgcmV0dXJuIHBhcnNlZDtcbiAgfVxuXG4gIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwic3RhdHVzIG11c3QgYmUgMCBvciAxLlwiKTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpc3REYXRlID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcmF3ID0gc2FmZVRleHQodmFsdWUpO1xuICBpZiAoIXJhdykgcmV0dXJuIFwiXCI7XG5cbiAgY29uc3QgZGF0ZU9ubHkgPSByYXcuc3BsaXQoXCJUXCIpWzBdLnNwbGl0KFwiIFwiKVswXTtcbiAgaWYgKC9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KGRhdGVPbmx5KSkge1xuICAgIHJldHVybiBkYXRlT25seTtcbiAgfVxuXG4gIGlmICgvXlxcZHs4fSQvLnRlc3QoZGF0ZU9ubHkpKSB7XG4gICAgY29uc3QgeWVhciA9IGRhdGVPbmx5LnNsaWNlKDAsIDQpO1xuICAgIGNvbnN0IG1vbnRoID0gZGF0ZU9ubHkuc2xpY2UoNCwgNik7XG4gICAgY29uc3QgZGF5ID0gZGF0ZU9ubHkuc2xpY2UoNiwgOCk7XG4gICAgcmV0dXJuIGAke3llYXJ9LSR7bW9udGh9LSR7ZGF5fWA7XG4gIH1cblxuICBjb25zdCBwYXJzZWQgPSBuZXcgRGF0ZShyYXcpO1xuICBpZiAoTnVtYmVyLmlzTmFOKHBhcnNlZC5nZXRUaW1lKCkpKSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICBjb25zdCB5ZWFyID0gU3RyaW5nKHBhcnNlZC5nZXRGdWxsWWVhcigpKTtcbiAgY29uc3QgbW9udGggPSBTdHJpbmcocGFyc2VkLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIGNvbnN0IGRheSA9IFN0cmluZyhwYXJzZWQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XG4gIHJldHVybiBgJHt5ZWFyfS0ke21vbnRofS0ke2RheX1gO1xufTtcblxuY29uc3QgdG9OdWxsYWJsZUJvb2wgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuIHwgbnVsbCA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbDtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpIHJldHVybiB2YWx1ZTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSB2YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAobm9ybWFsaXplZCA9PT0gXCJ0cnVlXCIgfHwgbm9ybWFsaXplZCA9PT0gXCIxXCIpIHJldHVybiB0cnVlO1xuICAgIGlmIChub3JtYWxpemVkID09PSBcImZhbHNlXCIgfHwgbm9ybWFsaXplZCA9PT0gXCIwXCIpIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKSB7XG4gICAgaWYgKHZhbHVlID09PSAxKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAodmFsdWUgPT09IDApIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IHRvRmxhZ0Jvb2wgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuIHwgbnVsbCA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRCb29sID0gdG9OdWxsYWJsZUJvb2wodmFsdWUpO1xuICBpZiAobm9ybWFsaXplZEJvb2wgIT09IG51bGwpIHJldHVybiBub3JtYWxpemVkQm9vbDtcblxuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcInN0cmluZ1wiKSByZXR1cm4gbnVsbDtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IHZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBudWxsO1xuICBpZiAobm9ybWFsaXplZCA9PT0gXCJvblwiIHx8IG5vcm1hbGl6ZWQgPT09IFwieWVzXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJ5XCIpIHJldHVybiB0cnVlO1xuICBpZiAobm9ybWFsaXplZCA9PT0gXCJvZmZcIiB8fCBub3JtYWxpemVkID09PSBcIm5vXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJuXCIpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCByZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUgPSAoKTogRXhwZW5zZVdpbmRvd1J1bnRpbWUgPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHt9O1xuICByZXR1cm4gd2luZG93IGFzIHVua25vd24gYXMgRXhwZW5zZVdpbmRvd1J1bnRpbWU7XG59O1xuXG5jb25zdCBzYW5pdGl6ZUhlYWRlcnMgPSAoaGVhZGVyczogSGVhZGVyc0luaXQgfCB1bmRlZmluZWQpOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0+IHtcbiAgaWYgKCFoZWFkZXJzKSByZXR1cm4ge307XG5cbiAgaWYgKGhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XG4gICAgY29uc3QgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG4gICAgaGVhZGVycy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShoZWFkZXJzKSkge1xuICAgIHJldHVybiBoZWFkZXJzLnJlZHVjZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PigoYWNjLCBba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgIGFjY1tTdHJpbmcoa2V5KV0gPSBTdHJpbmcodmFsdWUpO1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmVudHJpZXMoaGVhZGVycykucmVkdWNlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+KChhY2MsIFtrZXksIHZhbHVlXSkgPT4ge1xuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSByZXR1cm4gYWNjO1xuICAgIGFjY1trZXldID0gU3RyaW5nKHZhbHVlKTtcbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG59O1xuXG5jb25zdCBnZXRIZWFkZXJWYWx1ZSA9IChoZWFkZXJzOiBIZWFkZXJzSW5pdCB8IHVuZGVmaW5lZCwga2V5OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBub3JtYWxpemVkS2V5ID0ga2V5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMoc2FuaXRpemVIZWFkZXJzKGhlYWRlcnMpKTtcbiAgY29uc3QgbWF0Y2ggPSBlbnRyaWVzLmZpbmQoKFtoZWFkZXJLZXldKSA9PiBoZWFkZXJLZXkudHJpbSgpLnRvTG93ZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRLZXkpO1xuICByZXR1cm4gc2FmZVRleHQobWF0Y2g/LlsxXSk7XG59O1xuXG5jb25zdCByZW1vdmVIZWFkZXJWYWx1ZSA9IChoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+LCBrZXk6IHN0cmluZyk6IHZvaWQgPT4ge1xuICBjb25zdCBub3JtYWxpemVkS2V5ID0ga2V5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCB0b0RlbGV0ZSA9IE9iamVjdC5rZXlzKGhlYWRlcnMpLmZpbmQoKGhlYWRlcktleSkgPT4gaGVhZGVyS2V5LnRyaW0oKS50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkS2V5KTtcbiAgaWYgKCF0b0RlbGV0ZSkgcmV0dXJuO1xuICBkZWxldGUgaGVhZGVyc1t0b0RlbGV0ZV07XG59O1xuXG5jb25zdCByZXNvbHZlQmVhcmVyVG9rZW4gPSAoaGVhZGVyczogSGVhZGVyc0luaXQgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBhdXRob3JpemF0aW9uID0gZ2V0SGVhZGVyVmFsdWUoaGVhZGVycywgXCJBdXRob3JpemF0aW9uXCIpO1xuICBpZiAoIWF1dGhvcml6YXRpb24pIHJldHVybiBcIlwiO1xuXG4gIGlmICgvXmJlYXJlclxccysvaS50ZXN0KGF1dGhvcml6YXRpb24pKSB7XG4gICAgcmV0dXJuIGF1dGhvcml6YXRpb24ucmVwbGFjZSgvXmJlYXJlclxccysvaSwgXCJcIikudHJpbSgpO1xuICB9XG5cbiAgcmV0dXJuIGF1dGhvcml6YXRpb24udHJpbSgpO1xufTtcblxuY29uc3QgcmVhZFdpbmRvd0F1dGhTZWVkID0gKCk6IFBhcnRpYWw8RXhwZW5zZUFwaUF1dGhTZWVkPiA9PiB7XG4gIGNvbnN0IHJ1bnRpbWVXaW5kb3cgPSByZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUoKTtcblxuICByZXR1cm4ge1xuICAgIHRva2VuOiBzYWZlVGV4dChydW50aW1lV2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcbiAgICBlbnRyYU9pZDogc2FmZVRleHQocnVudGltZVdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXG4gICAgYXBwQ29kZTogc2FmZVRleHQocnVudGltZVdpbmRvdy5fX0lORF9BUFBfQ09ERV9fKSxcbiAgICBzdHJpY3RBcGlSb3V0ZXM6IHRvRmxhZ0Jvb2wocnVudGltZVdpbmRvdy5fX0lORF9FWFBFTlNFX1NUUklDVF9BUElfXykgPT09IHRydWUsXG4gIH07XG59O1xuXG5jb25zdCByZWFkUnVudGltZVN0cmljdEFwaUZsYWcgPSAoKTogYm9vbGVhbiA9PiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gZmFsc2U7XG4gIGNvbnN0IHJ1bnRpbWVXaW5kb3cgPSByZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUoKTtcblxuICBjb25zdCBleHBsaWNpdFdpbmRvd0ZsYWcgPSB0b0ZsYWdCb29sKHJ1bnRpbWVXaW5kb3cuX19JTkRfRVhQRU5TRV9TVFJJQ1RfQVBJX18pO1xuICByZXR1cm4gZXhwbGljaXRXaW5kb3dGbGFnID09PSB0cnVlO1xufTtcblxuY29uc3QgcmVhZFdpbmRvd1NlbGVjdGVkQ29tcGFueSA9ICgpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gc2FmZVRleHQocmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lKCkuX19JTkRfU0VMRUNURURfQ09NUEFOWV9fKS50b1VwcGVyQ2FzZSgpO1xufTtcblxuY29uc3QgYnVpbGRDb250ZXh0S2V5ID0gKHNlZWQ6IEV4cGVuc2VBcGlBdXRoU2VlZCk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBgJHtzZWVkLnRva2VufXwke3NlZWQuZW50cmFPaWR9fCR7c2VlZC5hcHBDb2RlfXwke3JlYWRXaW5kb3dTZWxlY3RlZENvbXBhbnkoKX1gO1xufTtcblxuY29uc3QgYnVpbGRFeHBlbnNlSGVhZGVycyA9IChcbiAgY29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMsXG4gIGluY2x1ZGVKc29uID0gZmFsc2UsXG4gIGluY2x1ZGVBeFVzZXJJZCA9IHRydWVcbik6IEhlYWRlcnNJbml0ID0+IHtcbiAgY29uc3QgYmFzZSA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcbiAgY29uc3QgbWVyZ2VkOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0geyAuLi5iYXNlIH07XG5cbiAgaWYgKHNhZmVUZXh0KGNvbnRleHQudG9rZW4pKSB7XG4gICAgbWVyZ2VkLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7Y29udGV4dC50b2tlbn1gO1xuICB9XG5cbiAgaWYgKHNhZmVUZXh0KGNvbnRleHQuY29tcGFueUlkKSkge1xuICAgIG1lcmdlZFtcIlgtSU5ELUNvbXBhbnlcIl0gPSBjb250ZXh0LmNvbXBhbnlJZDtcbiAgfVxuXG4gIGlmIChpbmNsdWRlQXhVc2VySWQgJiYgc2FmZVRleHQoY29udGV4dC5heFVzZXJJZCkpIHtcbiAgICBtZXJnZWRbXCJYLUlORC1BeFVzZXJJZFwiXSA9IGNvbnRleHQuYXhVc2VySWQ7XG4gIH1cblxuICBpZiAoaW5jbHVkZUpzb24pIHtcbiAgICBtZXJnZWRbXCJDb250ZW50LVR5cGVcIl0gPSBcImFwcGxpY2F0aW9uL2pzb25cIjtcbiAgfVxuXG4gIHJldHVybiBtZXJnZWQ7XG59O1xuXG5jb25zdCBidWlsZEV4cGVuc2VGb3JtSGVhZGVycyA9IChjb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCwgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IEhlYWRlcnNJbml0ID0+IHtcbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIGZhbHNlKSk7XG4gIHJlbW92ZUhlYWRlclZhbHVlKGhlYWRlcnMsIFwiQ29udGVudC1UeXBlXCIpO1xuICByZXR1cm4gaGVhZGVycztcbn07XG5cbmNvbnN0IGJ1aWxkQ29udGV4dEhlYWRlcnMgPSAodG9rZW46IHN0cmluZywgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IEhlYWRlcnNJbml0ID0+IHtcbiAgY29uc3QgYmFzZSA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcbiAgY29uc3QgbWVyZ2VkOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgIC4uLmJhc2UsXG4gICAgLi4uSlNPTl9IRUFERVJTLFxuICB9O1xuXG4gIGlmIChzYWZlVGV4dCh0b2tlbikpIHtcbiAgICBtZXJnZWQuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICB9XG5cbiAgcmV0dXJuIG1lcmdlZDtcbn07XG5cbmNvbnN0IHJlc29sdmVBdXRoVG9rZW4gPSAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHRva2VuRnJvbUhlYWRlcnMgPSByZXNvbHZlQmVhcmVyVG9rZW4ob3B0aW9ucz8uaGVhZGVycyk7XG4gIGNvbnN0IHdpbmRvd1NlZWQgPSByZWFkV2luZG93QXV0aFNlZWQoKTtcbiAgcmV0dXJuIHNhZmVUZXh0KHRva2VuRnJvbUhlYWRlcnMgfHwgcnVudGltZUF1dGhTZWVkLnRva2VuIHx8IHdpbmRvd1NlZWQudG9rZW4pO1xufTtcblxuY29uc3QgcmVzb2x2ZUF1dGhTZWVkID0gKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBFeHBlbnNlQXBpQXV0aFNlZWQgPT4ge1xuICBjb25zdCB3aW5kb3dTZWVkID0gcmVhZFdpbmRvd0F1dGhTZWVkKCk7XG4gIGNvbnN0IHRva2VuID0gcmVzb2x2ZUF1dGhUb2tlbihvcHRpb25zKTtcbiAgY29uc3QgZW50cmFPaWQgPSBzYWZlVGV4dChydW50aW1lQXV0aFNlZWQuZW50cmFPaWQgfHwgd2luZG93U2VlZC5lbnRyYU9pZCk7XG4gIGNvbnN0IGFwcENvZGUgPSBzYWZlVGV4dChydW50aW1lQXV0aFNlZWQuYXBwQ29kZSB8fCB3aW5kb3dTZWVkLmFwcENvZGUgfHwgREVGQVVMVF9BUFBfQ09ERSkgfHwgREVGQVVMVF9BUFBfQ09ERTtcbiAgY29uc3Qgc3RyaWN0QXBpUm91dGVzID1cbiAgICB0eXBlb2YgcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcyA9PT0gXCJib29sZWFuXCJcbiAgICAgID8gcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlc1xuICAgICAgOiAod2luZG93U2VlZC5zdHJpY3RBcGlSb3V0ZXMgPT09IHRydWUpO1xuXG4gIHJldHVybiB7XG4gICAgdG9rZW4sXG4gICAgZW50cmFPaWQsXG4gICAgYXBwQ29kZSxcbiAgICBzdHJpY3RBcGlSb3V0ZXMsXG4gIH07XG59O1xuXG5jb25zdCB2YWxpZGF0ZUNvbnRleHRSZXNwb25zZSA9IChyZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFbnRyYUNvbnRleHREdG8+KTogRXhwZW5zZUFwaUNvbnRleHQgPT4ge1xuICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IFwiQ291bGQgbm90IGxvYWQgRW50cmEgY29udGV4dC5cIik7XG4gIH1cblxuICBjb25zdCBmaXJzdCA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2UuSXRlbXMpID8gcmVzcG9uc2UuSXRlbXNbMF0gOiBudWxsO1xuICBpZiAoIWZpcnN0IHx8ICFmaXJzdC5IZWFkZXIpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkNvdWxkIG5vdCBsb2FkIEVudHJhIGNvbnRleHQuXCIpO1xuICB9XG5cbiAgY29uc3QgYXhVc2VySWQgPSBzYWZlVGV4dChmaXJzdC5IZWFkZXIuQXhVc2VySWQpO1xuICBjb25zdCBkZWZhdWx0Q29tcGFueSA9IHNhZmVUZXh0KGZpcnN0LkhlYWRlci5EZWZhdWx0Q29tcGFueSk7XG4gIGNvbnN0IGRlZmF1bHRDdXJyZW5jeUNvZGUgPSBzYWZlVGV4dChmaXJzdC5IZWFkZXIuRGVmYXVsdEN1cnJlbmN5Q29kZSk7XG4gIGNvbnN0IGNvbXBhbmllcyA9IEFycmF5LmlzQXJyYXkoZmlyc3QuQ29tcGFuaWVzKSA/IGZpcnN0LkNvbXBhbmllcyA6IFtdO1xuICBjb25zdCBmYWxsYmFja0NvbXBhbnkgPSBzYWZlVGV4dChjb21wYW5pZXMuZmluZCgoaXRlbSkgPT4gaXRlbS5Jc0RlZmF1bHQpPy5Db21wYW55SWQpO1xuICBjb25zdCBjb21wYW55SWQgPSBkZWZhdWx0Q29tcGFueSB8fCBmYWxsYmFja0NvbXBhbnk7XG4gIGNvbnN0IHNlbGVjdGVkQ29tcGFueSA9IGNvbXBhbmllcy5maW5kKChpdGVtKSA9PiBzYWZlVGV4dChpdGVtLkNvbXBhbnlJZCkgPT09IGNvbXBhbnlJZCkgfHwgY29tcGFuaWVzWzBdO1xuICBjb25zdCBhbGxvd1NlbGZNYW5hZ2VtZW50ID0gc2VsZWN0ZWRDb21wYW55Py5BbGxvd1NlbGZNYW5hZ2VtZW50ID09PSB0cnVlO1xuXG4gIGlmICghYXhVc2VySWQgfHwgIWNvbXBhbnlJZCkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiQ291bGQgbm90IHJlc29sdmUgRW50cmEgY29tcGFueSBjb250ZXh0LlwiKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG9rZW46IFwiXCIsXG4gICAgY29tcGFueUlkLFxuICAgIGF4VXNlcklkLFxuICAgIGRlZmF1bHRDdXJyZW5jeUNvZGUsXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcbiAgfTtcbn07XG5cbmNvbnN0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0ID0gYXN5bmMgKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBQcm9taXNlPEV4cGVuc2VBcGlDb250ZXh0PiA9PiB7XG4gIGNvbnN0IHNlZWQgPSByZXNvbHZlQXV0aFNlZWQob3B0aW9ucyk7XG4gIGNvbnN0IGNvbnRleHRLZXkgPSBidWlsZENvbnRleHRLZXkoc2VlZCk7XG5cbiAgaWYgKGNhY2hlZENvbnRleHQgJiYgY2FjaGVkQ29udGV4dEtleSA9PT0gY29udGV4dEtleSkge1xuICAgIHJldHVybiBjYWNoZWRDb250ZXh0O1xuICB9XG5cbiAgaWYgKGNvbnRleHRQcm9taXNlICYmIGNhY2hlZENvbnRleHRLZXkgPT09IGNvbnRleHRLZXkpIHtcbiAgICByZXR1cm4gY29udGV4dFByb21pc2U7XG4gIH1cblxuICBjb25zdCBmYWxsYmFja0NvbXBhbnlJZCA9IHJlYWRXaW5kb3dTZWxlY3RlZENvbXBhbnkoKTtcbiAgaWYgKCFzYWZlVGV4dChzZWVkLmVudHJhT2lkKSAmJiBmYWxsYmFja0NvbXBhbnlJZCkge1xuICAgIGNvbnN0IGZhbGxiYWNrQ29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQgPSB7XG4gICAgICB0b2tlbjogc2VlZC50b2tlbixcbiAgICAgIGNvbXBhbnlJZDogZmFsbGJhY2tDb21wYW55SWQsXG4gICAgICBheFVzZXJJZDogXCJcIixcbiAgICAgIGRlZmF1bHRDdXJyZW5jeUNvZGU6IFwiXCIsXG4gICAgICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBnbG9iYWxUaGlzLl9fSU5EX0FMTE9XX1NFTEZfTUFOQUdFTUVOVF9fID09PSB0cnVlLFxuICAgIH07XG5cbiAgICBjYWNoZWRDb250ZXh0ID0gZmFsbGJhY2tDb250ZXh0O1xuICAgIGNhY2hlZENvbnRleHRLZXkgPSBjb250ZXh0S2V5O1xuICAgIHJldHVybiBmYWxsYmFja0NvbnRleHQ7XG4gIH1cblxuICBpZiAoIXNhZmVUZXh0KHNlZWQuZW50cmFPaWQpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJNaXNzaW5nIEVudHJhIE9JRCBmb3IgRW50cmEgY29udGV4dCByZXF1ZXN0LlwiKTtcbiAgfVxuXG4gIGNhY2hlZENvbnRleHRLZXkgPSBjb250ZXh0S2V5O1xuICBjb250ZXh0UHJvbWlzZSA9IChhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgY29udGV4dFBheWxvYWQ6IEVudHJhQ29udGV4dFJlcXVlc3QgPSB7XG4gICAgICBlbnRyYU9pZDogc2VlZC5lbnRyYU9pZCxcbiAgICAgIGFwcENvZGU6IHNlZWQuYXBwQ29kZSxcbiAgICB9O1xuXG4gICAgY29uc3QgY29udGV4dFJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RW50cmFDb250ZXh0RHRvPj4oXCIvYXBpL2F1dGgvZW50cmEvY29udGV4dFwiLCB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkQ29udGV4dEhlYWRlcnMoc2VlZC50b2tlbiwgb3B0aW9ucyksXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjb250ZXh0UGF5bG9hZCksXG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNvbHZlZCA9IHZhbGlkYXRlQ29udGV4dFJlc3BvbnNlKGNvbnRleHRSZXNwb25zZSk7XG4gICAgY29uc3QgbmV4dENvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0ID0ge1xuICAgICAgLi4ucmVzb2x2ZWQsXG4gICAgICB0b2tlbjogc2VlZC50b2tlbixcbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHdpbmRvdy5fX0lORF9BTExPV19TRUxGX01BTkFHRU1FTlRfXyA9IG5leHRDb250ZXh0LmFsbG93U2VsZk1hbmFnZW1lbnQ7XG4gICAgfVxuXG4gICAgY2FjaGVkQ29udGV4dCA9IG5leHRDb250ZXh0O1xuICAgIHJldHVybiBuZXh0Q29udGV4dDtcbiAgfSkoKTtcblxuICB0cnkge1xuICAgIHJldHVybiBhd2FpdCBjb250ZXh0UHJvbWlzZTtcbiAgfSBmaW5hbGx5IHtcbiAgICBjb250ZXh0UHJvbWlzZSA9IG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz5cbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+ID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5yZXNwb25zZSxcbiAgICBJdGVtczogQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXSxcbiAgfTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UgPSAoXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldERldGFpbER0bz5cbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0RGV0YWlsRHRvPiA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4ucmVzcG9uc2UsXG4gICAgSXRlbXM6IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW10sXG4gIH07XG59O1xuXG5jb25zdCBub3JtYWxpemVBcGlSZXNwb25zZSA9IDxUPihyZXNwb25zZTogSW5kQXBpUmVzcG9uc2U8VD4pOiBJbmRBcGlSZXNwb25zZTxUPiA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4ucmVzcG9uc2UsXG4gICAgRXJyb3JzOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5FcnJvcnMpID8gcmVzcG9uc2UuRXJyb3JzIDogcmVzcG9uc2U/LkVycm9ycyA/PyBudWxsLFxuICB9O1xufTtcblxuY29uc3Qgbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz5cbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+ID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5yZXNwb25zZSxcbiAgICBJdGVtczogQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXSxcbiAgfTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZVN1Ym9yZGluYXRlc1BhZ2VkUmVzcG9uc2UgPSAoXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvPlxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0bz4gPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLnJlc3BvbnNlLFxuICAgIEl0ZW1zOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdLFxuICB9O1xufTtcblxuY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2UgPSAoXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvPlxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz4gPT4ge1xuICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XG4gIGNvbnN0IG5vcm1hbGl6ZWRJdGVtcyA9IGl0ZW1zLm1hcCgoaXRlbSkgPT4gKHtcbiAgICAuLi5pdGVtLFxuICAgIEdhc3RvVHlwZTogdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUoXG4gICAgICAoaXRlbSBhcyB7IEdhc3RvVHlwZT86IHVua25vd247IGdhc3RvVHlwZT86IHVua25vd24gfSk/Lkdhc3RvVHlwZSA/P1xuICAgICAgICAoaXRlbSBhcyB7IEdhc3RvVHlwZT86IHVua25vd247IGdhc3RvVHlwZT86IHVua25vd24gfSk/Lmdhc3RvVHlwZVxuICAgICksXG4gIH0pKTtcblxuICByZXR1cm4ge1xuICAgIC4uLnJlc3BvbnNlLFxuICAgIEl0ZW1zOiBub3JtYWxpemVkSXRlbXMsXG4gIH07XG59O1xuXG5jb25zdCBub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXREZXRhaWxEdG8+XG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldERldGFpbER0bz4gPT4ge1xuICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XG4gIGNvbnN0IG5vcm1hbGl6ZWRJdGVtcyA9IGl0ZW1zLm1hcCgoaXRlbSkgPT4gKHtcbiAgICAuLi5pdGVtLFxuICAgIEdhc3RvVHlwZTogdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUoXG4gICAgICAoaXRlbSBhcyB7IEdhc3RvVHlwZT86IHVua25vd247IGdhc3RvVHlwZT86IHVua25vd24gfSk/Lkdhc3RvVHlwZSA/P1xuICAgICAgICAoaXRlbSBhcyB7IEdhc3RvVHlwZT86IHVua25vd247IGdhc3RvVHlwZT86IHVua25vd24gfSk/Lmdhc3RvVHlwZVxuICAgICksXG4gICAgTGluZXM6IEFycmF5LmlzQXJyYXkoaXRlbT8uTGluZXMpID8gaXRlbS5MaW5lcyA6IFtdLFxuICB9KSk7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5yZXNwb25zZSxcbiAgICBJdGVtczogbm9ybWFsaXplZEl0ZW1zLFxuICB9O1xufTtcblxuY29uc3QgbG9va3NMaWtlSHRtbERvY3VtZW50ID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IHJhdyA9IHNhZmVUZXh0KHZhbHVlKS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gcmF3LnN0YXJ0c1dpdGgoXCI8IWRvY3R5cGUgaHRtbFwiKSB8fCByYXcuc3RhcnRzV2l0aChcIjxodG1sXCIpO1xufTtcblxuY29uc3QgaXNBcGlSb3V0ZVVuYXZhaWxhYmxlID0gKGVycm9yOiB1bmtub3duKTogZXJyb3IgaXMgQXBpRmV0Y2hFcnJvciA9PiB7XG4gIGlmICghKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikpIHJldHVybiBmYWxzZTtcbiAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDA0IHx8IGVycm9yLnN0YXR1cyA9PT0gNDA1KSByZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIGVycm9yLnN0YXR1cyA9PT0gdW5kZWZpbmVkICYmIGxvb2tzTGlrZUh0bWxEb2N1bWVudChlcnJvci5yZXNwb25zZUJvZHkpO1xufTtcblxuY29uc3QgaXNTdHJpY3RBcGlSb3V0ZXNFbmFibGVkID0gKCk6IGJvb2xlYW4gPT4ge1xuICBpZiAodHlwZW9mIHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXMgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgcmV0dXJuIHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXM7XG4gIH1cblxuICByZXR1cm4gcmVhZFJ1bnRpbWVTdHJpY3RBcGlGbGFnKCk7XG59O1xuXG5jb25zdCBzaG91bGRVc2VMZWdhY3lGYWxsYmFjayA9IChlcnJvcjogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xuICBpZiAoaXNTdHJpY3RBcGlSb3V0ZXNFbmFibGVkKCkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIGlzQXBpUm91dGVVbmF2YWlsYWJsZShlcnJvcik7XG59O1xuXG5jb25zdCB0b0xlZ2FjeUxpc3RSZXF1ZXN0UGF5bG9hZCA9IChwYXlsb2FkOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGZpbHRlcjogc2FmZVRleHQocGF5bG9hZC5maWx0ZXIpLFxuICAgIGhvamFHYXN0b3NJZDogc2FmZVRleHQocGF5bG9hZC5maWx0ZXIpLFxuICAgIGJpbGxlZE1vZGU6IHBheWxvYWQuYmlsbGVkTW9kZSA/PyAyLFxuICAgIGZyb21EYXRlOiBzYWZlVGV4dChwYXlsb2FkLmNyZWF0ZWREYXRlRnJvbSksXG4gICAgdG9EYXRlOiBzYWZlVGV4dChwYXlsb2FkLmNyZWF0ZWREYXRlVG8pLFxuICAgIHByb2plY3RJZDogc2FmZVRleHQocGF5bG9hZC5wcm9qSWQpLFxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQocGF5bG9hZC5jdXJyZW5jeUNvZGUpLFxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogaXNWYWxpZExpc3RFeHBlbnNlU2hlZXRTdGF0dXMocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMpXG4gICAgICA/IE51bWJlcihwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cylcbiAgICAgIDogdW5kZWZpbmVkLFxuICAgIHBhZ2U6IE51bWJlci5pc0Zpbml0ZShwYXlsb2FkLnBhZ2UpICYmIHBheWxvYWQucGFnZSA+IDAgPyBwYXlsb2FkLnBhZ2UgOiAxLFxuICAgIHBhZ2VTaXplOiBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZC5wYWdlU2l6ZSkgJiYgcGF5bG9hZC5wYWdlU2l6ZSA+IDAgPyBwYXlsb2FkLnBhZ2VTaXplIDogNTAsXG4gIH07XG59O1xuXG5jb25zdCBtYXBMZWdhY3lMaXN0SXRlbVRvQXBpTGlzdEl0ZW0gPSAoaXRlbTogTGVnYWN5RXhwZW5zZUxpc3RJdGVtKTogRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8gPT4ge1xuICByZXR1cm4ge1xuICAgIEhvamFHYXN0b3NJZDogc2FmZVRleHQoaXRlbS5ob2phR2FzdG9zSWQpLFxuICAgIERlc2NyaXB0aW9uOiBzYWZlVGV4dChpdGVtLmRlc2NyaXB0aW9uKSxcbiAgICBFeHBlbnNlU2hlZXRTdGF0dXM6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5leHBlbnNlU2hlZXRTdGF0dXMpLFxuICAgIEVzdGFkb0NvbWVudGFyaW9zOiBzYWZlVGV4dChpdGVtLmVzdGFkb0NvbWVudGFyaW9zKSB8fCBudWxsLFxuICAgIFVzZXJJZDogc2FmZVRleHQoaXRlbS51c2VySWQpIHx8IG51bGwsXG4gICAgVm91Y2hlcjogc2FmZVRleHQoaXRlbS52b3VjaGVyKSxcbiAgICBQcm9qSWQ6IHNhZmVUZXh0KGl0ZW0ucHJvaklkKSxcbiAgICBDdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGl0ZW0uY3VycmVuY3lDb2RlKSxcbiAgICBUb3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihpdGVtLnRvdGFsQW1vdW50ID8/IGl0ZW0udG90YWxBbW91bnRNU1QpLFxuICAgIEV4Y2hSYXRlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uZXhjaFJhdGUpLFxuICAgIEV4Y2hhbmdlUmF0ZU1vZGU6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5leGNoYW5nZVJhdGVNb2RlKSxcbiAgICBDcmVhdGVkRGF0ZTogc2FmZVRleHQoaXRlbS5jcmVhdGVkRGF0ZSkgfHwgbnVsbCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcExlZ2FjeUxpc3RSZXNwb25zZSA9IChcbiAgbGVnYWN5OiBMZWdhY3lFeHBlbnNlTGlzdFJlc3BvbnNlLFxuICBmYWxsYmFja1BhZ2U6IG51bWJlcixcbiAgZmFsbGJhY2tQYWdlU2l6ZTogbnVtYmVyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldExpc3RJdGVtRHRvPiA9PiB7XG4gIGNvbnN0IGxlZ2FjeUl0ZW1zID0gQXJyYXkuaXNBcnJheShsZWdhY3k/Lml0ZW1zKSA/IGxlZ2FjeS5pdGVtcyA6IFtdO1xuICBjb25zdCBtYXBwZWRJdGVtcyA9IGxlZ2FjeUl0ZW1zLm1hcCgoZW50cnkpID0+IG1hcExlZ2FjeUxpc3RJdGVtVG9BcGlMaXN0SXRlbShlbnRyeSkpO1xuXG4gIHJldHVybiB7XG4gICAgU3VjY2VzczogbGVnYWN5LnN1Y2Nlc3MgIT09IGZhbHNlLFxuICAgIE1lc3NhZ2U6IHNhZmVUZXh0KGxlZ2FjeS5tZXNzYWdlKSB8fCBcIk9LXCIsXG4gICAgVG90YWw6IHRvTnVsbGFibGVOdW1iZXIobGVnYWN5LnRvdGFsKSA/PyBtYXBwZWRJdGVtcy5sZW5ndGgsXG4gICAgUGFnZTogdG9OdWxsYWJsZU51bWJlcihsZWdhY3kucGFnZSkgPz8gZmFsbGJhY2tQYWdlLFxuICAgIFBhZ2VTaXplOiB0b051bGxhYmxlTnVtYmVyKGxlZ2FjeS5wYWdlU2l6ZSkgPz8gZmFsbGJhY2tQYWdlU2l6ZSxcbiAgICBJdGVtczogbWFwcGVkSXRlbXMsXG4gICAgVHJhY2VJZDogdW5kZWZpbmVkLFxuICB9O1xufTtcblxuY29uc3QgcmVzb2x2ZVR5cGVMYWJlbCA9ICh0eXBlVmFsdWVDb2RlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAoIXR5cGVWYWx1ZUNvZGUgfHwgdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB0eXBlVmFsdWVDb2RlO1xuICB9XG5cbiAgY29uc3QgcmF3Q2F0YWxvZ1NvdXJjZSA9IHJlYWRFeHBlbnNlV2luZG93UnVudGltZSgpLl9fRVhQRU5TRV9HQVNUT19UWVBFU19fO1xuICBjb25zdCByYXdDYXRhbG9nID0gQXJyYXkuaXNBcnJheShyYXdDYXRhbG9nU291cmNlKSA/IHJhd0NhdGFsb2dTb3VyY2UgOiBbXTtcbiAgY29uc3QgbWF0Y2ggPSByYXdDYXRhbG9nLmZpbmQoKGVudHJ5OiBFeHBlbnNlR2FzdG9UeXBlRW50cnkpID0+IHtcbiAgICBjb25zdCBlbnRyeUNvZGUgPSBzYWZlVGV4dChlbnRyeT8udmFsdWUgfHwgZW50cnk/LlZhbHVlKTtcbiAgICByZXR1cm4gZW50cnlDb2RlID09PSB0eXBlVmFsdWVDb2RlO1xuICB9KTtcblxuICByZXR1cm4gc2FmZVRleHQobWF0Y2g/LnRleHQgfHwgbWF0Y2g/LlRleHQpIHx8IHR5cGVWYWx1ZUNvZGU7XG59O1xuXG4vLyBTZXRzIHJ1bnRpbWUgYXV0aCBpbnB1dHMgdXNlZCB0byByZXNvbHZlIEVudHJhIGNvbnRleHQgYW5kIG1hbmRhdG9yeSBleHBlbnNlIGhlYWRlcnMuXG5leHBvcnQgY29uc3QgY29uZmlndXJlRXhwZW5zZUFwaUF1dGggPSAoc2VlZDogUGFydGlhbDxFeHBlbnNlQXBpQXV0aFNlZWQ+KTogdm9pZCA9PiB7XG4gIGNvbnN0IHN0cmljdEZyb21TZWVkID0gdG9GbGFnQm9vbChzZWVkLnN0cmljdEFwaVJvdXRlcyk7XG4gIGNvbnN0IHN0cmljdEZyb21SdW50aW1lID1cbiAgICB0eXBlb2YgcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcyA9PT0gXCJib29sZWFuXCIgPyBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzIDogcmVhZFJ1bnRpbWVTdHJpY3RBcGlGbGFnKCk7XG5cbiAgcnVudGltZUF1dGhTZWVkID0ge1xuICAgIC4uLnJ1bnRpbWVBdXRoU2VlZCxcbiAgICB0b2tlbjogc2FmZVRleHQoc2VlZC50b2tlbiB8fCBydW50aW1lQXV0aFNlZWQudG9rZW4pLFxuICAgIGVudHJhT2lkOiBzYWZlVGV4dChzZWVkLmVudHJhT2lkIHx8IHJ1bnRpbWVBdXRoU2VlZC5lbnRyYU9pZCksXG4gICAgYXBwQ29kZTogc2FmZVRleHQoc2VlZC5hcHBDb2RlIHx8IHJ1bnRpbWVBdXRoU2VlZC5hcHBDb2RlIHx8IERFRkFVTFRfQVBQX0NPREUpLFxuICAgIHN0cmljdEFwaVJvdXRlczogc3RyaWN0RnJvbVNlZWQgPz8gc3RyaWN0RnJvbVJ1bnRpbWUsXG4gIH07XG5cbiAgY2FjaGVkQ29udGV4dCA9IG51bGw7XG4gIGNhY2hlZENvbnRleHRLZXkgPSBcIlwiO1xuICBjb250ZXh0UHJvbWlzZSA9IG51bGw7XG4gIGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLmNsZWFyKCk7XG4gIHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLmNsZWFyKCk7XG59O1xuXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvbGlzdCBpdGVtIGNvbnRyYWN0IHRvIGxpc3QgY2FyZCBVSSBtb2RlbC5cbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZCA9IChpdGVtOiBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byk6IEV4cGVuc2VTaGVldENhcmQgPT4ge1xuICByZXR1cm4ge1xuICAgIGhvamFHYXN0b3NJZDogc2FmZVRleHQoaXRlbS5Ib2phR2FzdG9zSWQpLFxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChpdGVtLkRlc2NyaXB0aW9uKSxcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5FeHBlbnNlU2hlZXRTdGF0dXMpLFxuICAgIGVzdGFkb0NvbWVudGFyaW9zOiBzYWZlVGV4dChpdGVtLkVzdGFkb0NvbWVudGFyaW9zKSB8fCBudWxsLFxuICAgIHVzZXJJZDogc2FmZVRleHQoaXRlbS5Vc2VySWQpLFxuICAgIHZvdWNoZXI6IHNhZmVUZXh0KGl0ZW0uVm91Y2hlciksXG4gICAgcHJvaklkOiBzYWZlVGV4dChpdGVtLlByb2pJZCksXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChpdGVtLkN1cnJlbmN5Q29kZSksXG4gICAgdG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5Ub3RhbEFtb3VudCksXG4gICAgZXhjaFJhdGU6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5FeGNoUmF0ZSksXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogdG9OdWxsYWJsZU51bWJlcihpdGVtLkV4Y2hhbmdlUmF0ZU1vZGUpLFxuICAgIGNyZWF0ZWREYXRlOiBzYWZlVGV4dChpdGVtLkNyZWF0ZWREYXRlKSxcbiAgfTtcbn07XG5cbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfSBoZWFkZXIgY29udHJhY3QgdG8gVUkgbW9kZWwuXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0SGVhZGVyID0gKHNoZWV0OiBFeHBlbnNlU2hlZXREZXRhaWxEdG8pOiBFeHBlbnNlU2hlZXRIZWFkZXIgPT4ge1xuICByZXR1cm4ge1xuICAgIGhvamFHYXN0b3NJZDogc2FmZVRleHQoc2hlZXQuSG9qYUdhc3Rvc0lkKSxcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQoc2hlZXQuRGVzY3JpcHRpb24pLFxuICAgIHVzZXJJZDogc2FmZVRleHQoc2hlZXQuVXNlcklkKSxcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IHRvTnVsbGFibGVOdW1iZXIoc2hlZXQuRXhwZW5zZVNoZWV0U3RhdHVzKSxcbiAgICBlc3RhZG9Db21lbnRhcmlvczogc2FmZVRleHQoc2hlZXQuRXN0YWRvQ29tZW50YXJpb3MpIHx8IG51bGwsXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChzaGVldC5DdXJyZW5jeUNvZGUpLFxuICAgIHRvdGFsQW1vdW50OiB0b051bGxhYmxlTnVtYmVyKHNoZWV0LlRvdGFsQW1vdW50KSxcbiAgICBleGNoUmF0ZTogc2FmZVRleHQoc2hlZXQuRXhjaFJhdGUpLFxuICAgIGV4Y2hhbmdlUmF0ZU1vZGU6IHRvTnVsbGFibGVOdW1iZXIoc2hlZXQuRXhjaGFuZ2VSYXRlTW9kZSksXG4gICAgcHJvaklkOiBzYWZlVGV4dChzaGVldC5Qcm9qSWQpLFxuICAgIHZvdWNoZXI6IHNhZmVUZXh0KHNoZWV0LlZvdWNoZXIpLFxuICAgIGNyZWF0ZWREYXRlOiBzYWZlVGV4dChzaGVldC5DcmVhdGVkRGF0ZSksXG4gIH07XG59O1xuXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0gbGluZSBjb250cmFjdCB0byBVSSBtb2RlbC5cbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRMaW5lID0gKGxpbmU6IEV4cGVuc2VTaGVldExpbmVEdG8pOiBFeHBlbnNlU2hlZXRMaW5lID0+IHtcbiAgY29uc3QgdHlwZVZhbHVlQ29kZSA9IHNhZmVUZXh0KGxpbmUuVHlwZVZhbHVlKTtcbiAgY29uc3QgbGVnYWN5UHJpY2UgPSAobGluZSBhcyB7IHByaWNlPzogdW5rbm93biB9KS5wcmljZTtcbiAgY29uc3QgbGVnYWN5RmlsZUlkID0gKGxpbmUgYXMgeyBmaWxlSWQ/OiB1bmtub3duIH0pLmZpbGVJZDtcblxuICByZXR1cm4ge1xuICAgIGxpbmVSZWNJZDogc2FmZVRleHQobGluZS5SZWNJZCksXG4gICAgdHJhbnNEYXRlOiBzYWZlVGV4dChsaW5lLlRyYW5zRGF0ZSksXG4gICAgdHlwZVZhbHVlQ29kZSxcbiAgICB0eXBlVmFsdWU6IHJlc29sdmVUeXBlTGFiZWwodHlwZVZhbHVlQ29kZSksXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KGxpbmUuRGVzY3JpcHRpb24pLFxuICAgIGludGVybmFjaW9uYWw6IHRvTnVsbGFibGVCb29sKGxpbmUuSW50ZXJuYWNpb25hbCksXG4gICAgZmlsZUlkOiBzYWZlVGV4dChsaW5lLkZpbGVJZCA/PyBsZWdhY3lGaWxlSWQpLFxuICAgIHRpY2tldDogdG9OdWxsYWJsZUJvb2wobGluZS5UaWNrZXQpLFxuICAgIHByaWNlOiB0b051bGxhYmxlTnVtYmVyKGxpbmUuUHJpY2UgPz8gbGVnYWN5UHJpY2UpLFxuICAgIHF0eTogdG9OdWxsYWJsZU51bWJlcihsaW5lLlF0eSksXG4gICAgYW1vdW50OiB0b051bGxhYmxlTnVtYmVyKGxpbmUuQW1vdW50KSxcbiAgICBwcm9qSWQ6IHNhZmVUZXh0KGxpbmUuUHJvaklkKSxcbiAgICBpbmRBdHRhY2hGaWxlczogc2FmZVRleHQobGluZS5JbmRBdHRhY2hGaWxlcyksXG4gIH07XG59O1xuXG4vLyBMb2FkcyB0aGUgZXhwZW5zZSBzaGVldCBsaXN0IGZyb20gL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9saXN0LlxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0TGlzdCA9IGFzeW5jIChcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3QsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz4+ID0+IHtcbiAgaWYgKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzICE9PSB1bmRlZmluZWQgJiYgIWlzVmFsaWRMaXN0RXhwZW5zZVNoZWV0U3RhdHVzKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzKSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhwZW5zZVNoZWV0U3RhdHVzIG11c3QgYmUgYW4gaW50ZWdlciBiZXR3ZWVuIDAgYW5kIDQuXCIpO1xuICB9XG5cbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvbGlzdFwiLCB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgICB9KTtcblxuICAgIHJldHVybiBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZShyZXNwb25zZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKCFzaG91bGRVc2VMZWdhY3lGYWxsYmFjayhlcnJvcikpIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cblxuICAgIGNvbnN0IGxlZ2FjeVJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPExlZ2FjeUV4cGVuc2VMaXN0UmVzcG9uc2U+KFwiL0dhc3Rvcy9MaXN0RXhwZW5zZVNoZWV0c1wiLCB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgLi4uc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpLFxuICAgICAgICAuLi5KU09OX0hFQURFUlMsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodG9MZWdhY3lMaXN0UmVxdWVzdFBheWxvYWQocGF5bG9hZCkpLFxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFwcGVkID0gbWFwTGVnYWN5TGlzdFJlc3BvbnNlKFxuICAgICAgbGVnYWN5UmVzcG9uc2UsXG4gICAgICBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZC5wYWdlKSAmJiBwYXlsb2FkLnBhZ2UgPiAwID8gcGF5bG9hZC5wYWdlIDogMSxcbiAgICAgIE51bWJlci5pc0Zpbml0ZShwYXlsb2FkLnBhZ2VTaXplKSAmJiBwYXlsb2FkLnBhZ2VTaXplID4gMCA/IHBheWxvYWQucGFnZVNpemUgOiA1MFxuICAgICk7XG5cbiAgICByZXR1cm4gbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UobWFwcGVkKTtcbiAgfVxufTtcblxuLy8gTG9hZHMgb25lIGV4cGVuc2Ugc2hlZXQgZGV0YWlsIGZyb20gL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS5cbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldERldGFpbCA9IGFzeW5jIChcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXREZXRhaWxEdG8+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldERldGFpbER0bz4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9YCwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIFJlYWRzIGF2YWlsYWJsZSBjdXJyZW5jaWVzIGZyb20gL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9jdXJyZW5jaWVzLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTaGVldEN1cnJlbmNpZXMgPSBhc3luYyAoXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+ID0+IHtcbiAgbGV0IGNvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0IHwgbnVsbCA9IG51bGw7XG4gIHRyeSB7XG4gICAgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmICghKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikpIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNvbXBhbnlJZCA9IHNhZmVUZXh0KGNvbnRleHQ/LmNvbXBhbnlJZCB8fCByZWFkV2luZG93U2VsZWN0ZWRDb21wYW55KCkpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IGNhY2hlS2V5ID0gY29tcGFueUlkIHx8IFwiLVwiO1xuXG4gIGlmIChjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcy5oYXMoY2FjaGVLZXkpKSB7XG4gICAgcmV0dXJuIGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLmdldChjYWNoZUtleSkgYXMgSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz47XG4gIH1cblxuICBpZiAocGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuaGFzKGNhY2hlS2V5KSkge1xuICAgIHJldHVybiBwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5nZXQoY2FjaGVLZXkpIGFzIFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+O1xuICB9XG5cbiAgY29uc3QgcmVxdWVzdFByb21pc2UgPSAoYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XG4gICAgcmVtb3ZlSGVhZGVyVmFsdWUoaGVhZGVycywgXCJBdXRob3JpemF0aW9uXCIpO1xuICAgIHJlbW92ZUhlYWRlclZhbHVlKGhlYWRlcnMsIFwiWC1JTkQtQXhVc2VySWRcIik7XG5cbiAgICBpZiAoY29tcGFueUlkKSB7XG4gICAgICBoZWFkZXJzW1wiWC1JTkQtQ29tcGFueVwiXSA9IGNvbXBhbnlJZDtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9jdXJyZW5jaWVzXCIsIHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICBoZWFkZXJzLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRSZXNwb25zZSA9IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICBpZiAobm9ybWFsaXplZFJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuc2V0KGNhY2hlS2V5LCBub3JtYWxpemVkUmVzcG9uc2UpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbm9ybWFsaXplZFJlc3BvbnNlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoIXNob3VsZFVzZUxlZ2FjeUZhbGxiYWNrKGVycm9yKSkge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbGVnYWN5TGlzdFJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPExlZ2FjeUV4cGVuc2VMaXN0UmVzcG9uc2U+KFwiL0dhc3Rvcy9MaXN0RXhwZW5zZVNoZWV0c1wiLCB7XG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAuLi5zYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyksXG4gICAgICAgICAgLi4uSlNPTl9IRUFERVJTLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgZmlsdGVyOiBcIlwiLFxuICAgICAgICAgIGhvamFHYXN0b3NJZDogXCJcIixcbiAgICAgICAgICBiaWxsZWRNb2RlOiAyLFxuICAgICAgICAgIGZyb21EYXRlOiBcIlwiLFxuICAgICAgICAgIHRvRGF0ZTogXCJcIixcbiAgICAgICAgICBwcm9qZWN0SWQ6IFwiXCIsXG4gICAgICAgICAgY3VycmVuY3lDb2RlOiBcIlwiLFxuICAgICAgICAgIHBhZ2U6IDEsXG4gICAgICAgICAgcGFnZVNpemU6IDIwMCxcbiAgICAgICAgfSksXG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgc2VlbkNvZGVzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgICBjb25zdCBzb3VyY2VJdGVtcyA9IEFycmF5LmlzQXJyYXkobGVnYWN5TGlzdFJlc3BvbnNlLml0ZW1zKSA/IGxlZ2FjeUxpc3RSZXNwb25zZS5pdGVtcyA6IFtdO1xuICAgICAgY29uc3QgZmFsbGJhY2tJdGVtczogRXhwZW5zZVNoZWV0Q3VycmVuY3lEdG9bXSA9IHNvdXJjZUl0ZW1zXG4gICAgICAgIC5tYXAoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeS5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCkpXG4gICAgICAgIC5maWx0ZXIoKGNvZGUpID0+ICEhY29kZSlcbiAgICAgICAgLmZpbHRlcigoY29kZSkgPT4ge1xuICAgICAgICAgIGlmIChzZWVuQ29kZXMuaGFzKGNvZGUpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgc2VlbkNvZGVzLmFkZChjb2RlKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSlcbiAgICAgICAgLm1hcCgoY29kZSkgPT4gKHtcbiAgICAgICAgICBDdXJyZW5jeUNvZGU6IGNvZGUsXG4gICAgICAgICAgQ3VycmVuY3lDb2RlSVNPOiBjb2RlLFxuICAgICAgICB9KSk7XG5cbiAgICAgIGNvbnN0IGZhbGxiYWNrUmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+ID0ge1xuICAgICAgICBTdWNjZXNzOiBsZWdhY3lMaXN0UmVzcG9uc2Uuc3VjY2VzcyAhPT0gZmFsc2UsXG4gICAgICAgIE1lc3NhZ2U6IHNhZmVUZXh0KGxlZ2FjeUxpc3RSZXNwb25zZS5tZXNzYWdlKSB8fCBcIk9LXCIsXG4gICAgICAgIFRvdGFsOiBmYWxsYmFja0l0ZW1zLmxlbmd0aCxcbiAgICAgICAgUGFnZTogMSxcbiAgICAgICAgUGFnZVNpemU6IGZhbGxiYWNrSXRlbXMubGVuZ3RoLFxuICAgICAgICBJdGVtczogZmFsbGJhY2tJdGVtcyxcbiAgICAgICAgVHJhY2VJZDogdW5kZWZpbmVkLFxuICAgICAgfTtcblxuICAgICAgY29uc3Qgbm9ybWFsaXplZEZhbGxiYWNrID0gbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlKGZhbGxiYWNrUmVzcG9uc2UpO1xuICAgICAgaWYgKG5vcm1hbGl6ZWRGYWxsYmFjay5TdWNjZXNzKSB7XG4gICAgICAgIGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLnNldChjYWNoZUtleSwgbm9ybWFsaXplZEZhbGxiYWNrKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRGYWxsYmFjaztcbiAgICB9XG4gIH0pKCk7XG5cbiAgcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuc2V0KGNhY2hlS2V5LCByZXF1ZXN0UHJvbWlzZSk7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGF3YWl0IHJlcXVlc3RQcm9taXNlO1xuICB9IGZpbmFsbHkge1xuICAgIHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLmRlbGV0ZShjYWNoZUtleSk7XG4gIH1cbn07XG5cbi8vIFJlYWRzIGF2YWlsYWJsZSBzdWJvcmRpbmF0ZXMgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3N1Ym9yZGluYXRlcy5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZXMgPSBhc3luYyAoXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0bz4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvPj4oXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL3N1Ym9yZGluYXRlc1wiLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZVN1Ym9yZGluYXRlc1BhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gRXhwb3NlcyB0aGUgZGVmYXVsdCBjdXJyZW5jeSByZXNvbHZlZCBmcm9tIEVudHJhIGNvbnRleHQgZm9yIGluaXRpYWwgc2VsZWN0aW9ucy5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlID0gYXN5bmMgKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgICByZXR1cm4gc2FmZVRleHQoY29udGV4dC5kZWZhdWx0Q3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxufTtcblxuLy8gUmVhZHMgZXhjaGFuZ2UgcmF0ZSBmcm9tIC9hcGkvc3lzdGVtL2V4Y2hhbmdlLXJhdGUuXG5leHBvcnQgY29uc3QgZ2V0RXhjaGFuZ2VSYXRlID0gYXN5bmMgKFxuICBiYXNlQ3VycmVuY3k6IHN0cmluZyxcbiAgdGFyZ2V0Q3VycmVuY3k6IHN0cmluZyxcbiAgZGF0ZT86IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeGNoYW5nZVJhdGVEdG8+PiA9PiB7XG4gIGNvbnN0IHRva2VuID0gcmVzb2x2ZUF1dGhUb2tlbihvcHRpb25zKTtcbiAgY29uc3Qgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSA9IHNhZmVUZXh0KGJhc2VDdXJyZW5jeSkudG9VcHBlckNhc2UoKTtcbiAgY29uc3Qgbm9ybWFsaXplZFRhcmdldEN1cnJlbmN5ID0gc2FmZVRleHQodGFyZ2V0Q3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWREYXRlID0gc2FmZVRleHQoZGF0ZSk7XG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuXG4gIHF1ZXJ5LnNldChcImJhc2VDdXJyZW5jeVwiLCBub3JtYWxpemVkQmFzZUN1cnJlbmN5KTtcbiAgcXVlcnkuc2V0KFwidGFyZ2V0Q3VycmVuY3lcIiwgbm9ybWFsaXplZFRhcmdldEN1cnJlbmN5KTtcbiAgaWYgKG5vcm1hbGl6ZWREYXRlKSB7XG4gICAgcXVlcnkuc2V0KFwiZGF0ZVwiLCBub3JtYWxpemVkRGF0ZSk7XG4gIH1cblxuICBjb25zdCBoZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpO1xuICBpZiAodG9rZW4pIHtcbiAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7dG9rZW59YDtcbiAgfVxuXG4gIHJldHVybiBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhjaGFuZ2VSYXRlRHRvPj4oYC9hcGkvc3lzdGVtL2V4Y2hhbmdlLXJhdGU/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICBoZWFkZXJzLFxuICB9KTtcbn07XG5cbi8vIFJlYWRzIGV4Y2hhbmdlIHJhdGUgZnJvbSAvYXBpL3N5c3RlbS9leGNoYW5nZS1yYXRlL3B1YmxpYy1kaXJlY3QuXG5leHBvcnQgY29uc3QgZ2V0RXhjaGFuZ2VSYXRlUHVibGljRGlyZWN0ID0gYXN5bmMgKFxuICBiYXNlQ3VycmVuY3k6IHN0cmluZyxcbiAgdGFyZ2V0Q3VycmVuY3k6IHN0cmluZyxcbiAgZGF0ZT86IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeGNoYW5nZVJhdGVEdG8+PiA9PiB7XG4gIGNvbnN0IHRva2VuID0gcmVzb2x2ZUF1dGhUb2tlbihvcHRpb25zKTtcbiAgY29uc3Qgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSA9IHNhZmVUZXh0KGJhc2VDdXJyZW5jeSkudG9VcHBlckNhc2UoKTtcbiAgY29uc3Qgbm9ybWFsaXplZFRhcmdldEN1cnJlbmN5ID0gc2FmZVRleHQodGFyZ2V0Q3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWREYXRlID0gc2FmZVRleHQoZGF0ZSk7XG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuXG4gIHF1ZXJ5LnNldChcImJhc2VDdXJyZW5jeVwiLCBub3JtYWxpemVkQmFzZUN1cnJlbmN5KTtcbiAgcXVlcnkuc2V0KFwidGFyZ2V0Q3VycmVuY3lcIiwgbm9ybWFsaXplZFRhcmdldEN1cnJlbmN5KTtcbiAgaWYgKG5vcm1hbGl6ZWREYXRlKSB7XG4gICAgcXVlcnkuc2V0KFwiZGF0ZVwiLCBub3JtYWxpemVkRGF0ZSk7XG4gIH1cblxuICBjb25zdCBoZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpO1xuICBpZiAodG9rZW4pIHtcbiAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7dG9rZW59YDtcbiAgfVxuXG4gIHJldHVybiBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhjaGFuZ2VSYXRlRHRvPj4oYC9hcGkvc3lzdGVtL2V4Y2hhbmdlLXJhdGUvcHVibGljLWRpcmVjdD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIGhlYWRlcnMsXG4gIH0pO1xufTtcblxuLy8gUmVhZHMgZnVlbCBwcmljZSBwZXIga20gZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2Z1ZWwtcHJpY2Uta20uXG5leHBvcnQgY29uc3QgZ2V0RnVlbFByaWNlS20gPSBhc3luYyAoXG4gIHRyYW5zRGF0ZTogc3RyaW5nLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEZ1ZWxQcmljZUttRHRvPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IG5vcm1hbGl6ZWREYXRlID0gc2FmZVRleHQodHJhbnNEYXRlKTtcbiAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG5cbiAgcXVlcnkuc2V0KFwidHJhbnNEYXRlXCIsIG5vcm1hbGl6ZWREYXRlKTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxGdWVsUHJpY2VLbUR0bz4+KFxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2Z1ZWwtcHJpY2Uta20/JHtxdWVyeS50b1N0cmluZygpfWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBDcmVhdGVzIGFuIGV4cGVuc2Ugc2hlZXQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy5cbmV4cG9ydCBjb25zdCBjcmVhdGVFeHBlbnNlU2hlZXQgPSBhc3luYyAoXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3JlYXRlUmVzcG9uc2VEYXRhPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IG1vZGUgPSBwYXlsb2FkLm1vZGUgPz8gMDtcbiAgY29uc3QgbGluZXMgPSBBcnJheS5pc0FycmF5KHBheWxvYWQubGluZXMpID8gcGF5bG9hZC5saW5lcyA6IFtdO1xuICBjb25zdCBoYXNJbnZhbGlkTGluZVBheWxvYWQgPSBsaW5lcy5zb21lKChsaW5lKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICFzYWZlVGV4dChsaW5lLnRyYW5zRGF0ZSkgfHxcbiAgICAgICFOdW1iZXIuaXNJbnRlZ2VyKE51bWJlcihsaW5lLnR5cGVWYWx1ZSkpIHx8XG4gICAgICBOdW1iZXIobGluZS50eXBlVmFsdWUpIDw9IDAgfHxcbiAgICAgICFpc1Bvc2l0aXZlTnVtYmVyKGxpbmUucXR5KSB8fFxuICAgICAgIWlzUG9zaXRpdmVOdW1iZXIobGluZS5wcmljZSlcbiAgICApO1xuICB9KTtcblxuICBpZiAocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMgIT09IHVuZGVmaW5lZCAmJiAhaXNOb25OZWdhdGl2ZU51bWJlcihwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cykpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4cGVuc2VTaGVldFN0YXR1cyBtdXN0IGJlIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMC5cIik7XG4gIH1cblxuICBpZiAocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlICE9PSB1bmRlZmluZWQgJiYgIWlzTm9uTmVnYXRpdmVOdW1iZXIocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlKSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhjaGFuZ2VSYXRlTW9kZSBtdXN0IGJlIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMC5cIik7XG4gIH1cblxuICBpZiAocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlICE9PSB1bmRlZmluZWQgJiYgcGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhjaGFuZ2VSYXRlTW9kZSByZXF1aXJlcyBleHBlbnNlU2hlZXRTdGF0dXMuXCIpO1xuICB9XG5cbiAgaWYgKGhhc0ludmFsaWRMaW5lUGF5bG9hZCkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiRWFjaCBsaW5lIHJlcXVpcmVzIHRyYW5zRGF0ZSwgdHlwZVZhbHVlLCBxdHkgPiAwIGFuZCBwcmljZSA+IDAuXCIpO1xuICB9XG5cbiAgaWYgKG1vZGUgPT09IDApIHtcbiAgICBpZiAoIXNhZmVUZXh0KHBheWxvYWQuZGVzY3JpcHRpb24pIHx8ICFzYWZlVGV4dChwYXlsb2FkLmN1cnJlbmN5Q29kZSkgfHwgbGluZXMubGVuZ3RoIDwgMSkge1xuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJJbnZhbGlkIGNyZWF0ZSBwYXlsb2FkIGZvciBtb2RlIDAuXCIpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtb2RlID09PSAxKSB7XG4gICAgaWYgKCFzYWZlVGV4dChwYXlsb2FkLmRlc2NyaXB0aW9uKSB8fCAhc2FmZVRleHQocGF5bG9hZC5jdXJyZW5jeUNvZGUpKSB7XG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkludmFsaWQgY3JlYXRlIHBheWxvYWQgZm9yIG1vZGUgMS5cIik7XG4gICAgfVxuXG4gICAgaWYgKGxpbmVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiTW9kZSAxIHJlcXVpcmVzIGxpbmVzIHRvIGJlIG51bGwgb3IgZW1wdHkuXCIpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtb2RlID09PSAyKSB7XG4gICAgaWYgKCFzYWZlVGV4dChwYXlsb2FkLmV4aXN0aW5nSG9qYUdhc3Rvc0lkKSB8fCBsaW5lcy5sZW5ndGggPCAxKSB7XG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkludmFsaWQgY3JlYXRlIHBheWxvYWQgZm9yIG1vZGUgMi5cIik7XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgbm9ybWFsaXplZFBheWxvYWQ6IEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QgPSB7XG4gICAgLi4ucGF5bG9hZCxcbiAgICBtb2RlLFxuICAgIGV4aXN0aW5nSG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChwYXlsb2FkLmV4aXN0aW5nSG9qYUdhc3Rvc0lkKSB8fCB1bmRlZmluZWQsXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KHBheWxvYWQuZGVzY3JpcHRpb24pIHx8IHVuZGVmaW5lZCxcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KHBheWxvYWQuY3VycmVuY3lDb2RlKSB8fCB1bmRlZmluZWQsXG4gICAgcHJvaklkOiBzYWZlVGV4dChwYXlsb2FkLnByb2pJZCkgfHwgdW5kZWZpbmVkLFxuICAgIGxpbmVzOiBtb2RlID09PSAxID8gW10gOiBsaW5lcyxcbiAgfTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRDcmVhdGVSZXNwb25zZURhdGE+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHNcIiwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5vcm1hbGl6ZWRQYXlsb2FkKSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIFVwZGF0ZXMgaGVhZGVyIGZpZWxkcyB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9LlxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4cGVuc2VTaGVldEhlYWRlciA9IGFzeW5jIChcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldEhlYWRlclVwZGF0ZVJlcXVlc3QsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8eyBIb2phR2FzdG9zSWQ6IHN0cmluZyB9Pj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcblxuICBpZiAocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMgIT09IHVuZGVmaW5lZCAmJiAhaXNOb25OZWdhdGl2ZU51bWJlcihwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cykpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4cGVuc2VTaGVldFN0YXR1cyBtdXN0IGJlIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMC5cIik7XG4gIH1cblxuICBpZiAocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlICE9PSB1bmRlZmluZWQgJiYgIWlzTm9uTmVnYXRpdmVOdW1iZXIocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlKSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhjaGFuZ2VSYXRlTW9kZSBtdXN0IGJlIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMC5cIik7XG4gIH1cblxuICBpZiAocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlICE9PSB1bmRlZmluZWQgJiYgcGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhjaGFuZ2VSYXRlTW9kZSByZXF1aXJlcyBleHBlbnNlU2hlZXRTdGF0dXMuXCIpO1xuICB9XG5cbiAgaWYgKHNhZmVUZXh0KHBheWxvYWQuZXN0YWRvQ29tZW50YXJpb3MpICYmIChwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gdW5kZWZpbmVkIHx8IHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSA9PT0gdW5kZWZpbmVkKSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXN0YWRvQ29tZW50YXJpb3MgcmVxdWlyZXMgZXhwZW5zZVNoZWV0U3RhdHVzIGFuZCBleGNoYW5nZVJhdGVNb2RlLlwiKTtcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPHsgSG9qYUdhc3Rvc0lkOiBzdHJpbmcgfT4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9YCwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBEZWxldGVzIGEgZnVsbCBleHBlbnNlIHNoZWV0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0vbGluZXMvMD9kZWxldGVXaG9sZVNoZWV0PXRydWUuXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0ID0gYXN5bmMgKFxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxudWxsPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8bnVsbD4+KFxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9L2xpbmVzLzA/ZGVsZXRlTW9kZT0yJmRlbGV0ZVdob2xlU2hlZXQ9dHJ1ZWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBVcGRhdGVzIG9uZSBleHBlbnNlIGxpbmUgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS9saW5lcy97bGluZVJlY0lkfS5cbmV4cG9ydCBjb25zdCB1cGRhdGVFeHBlbnNlU2hlZXRMaW5lID0gYXN5bmMgKFxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcbiAgbGluZVJlY0lkOiBzdHJpbmcsXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXNwb25zZURhdGE+PiA9PiB7XG4gIGlmIChcbiAgICAhc2FmZVRleHQocGF5bG9hZC50cmFuc0RhdGUpIHx8XG4gICAgIU51bWJlci5pc0ludGVnZXIoTnVtYmVyKHBheWxvYWQudHlwZVZhbHVlKSkgfHxcbiAgICBOdW1iZXIocGF5bG9hZC50eXBlVmFsdWUpIDw9IDAgfHxcbiAgICAhaXNQb3NpdGl2ZU51bWJlcihwYXlsb2FkLnF0eSkgfHxcbiAgICAhaXNQb3NpdGl2ZU51bWJlcihwYXlsb2FkLnByaWNlKVxuICApIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcInRyYW5zRGF0ZSwgdHlwZVZhbHVlLCBxdHkgPiAwIGFuZCBwcmljZSA+IDAgYXJlIHJlcXVpcmVkLlwiKTtcbiAgfVxuXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCBzYWZlTGluZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhsaW5lUmVjSWQgfHwgXCJcIikudHJpbSgpKTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVzcG9uc2VEYXRhPj4oXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH0vbGluZXMvJHtzYWZlTGluZUlkfWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIERlbGV0ZXMgb25lIGV4cGVuc2UgbGluZSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9L2xpbmVzL3tsaW5lUmVjSWR9P2RlbGV0ZVdob2xlU2hlZXQ9ZmFsc2UuXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0TGluZSA9IGFzeW5jIChcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXG4gIGxpbmVSZWNJZDogc3RyaW5nLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG51bGw+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCBzYWZlTGluZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhsaW5lUmVjSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8bnVsbD4+KFxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9L2xpbmVzLyR7c2FmZUxpbmVJZH0/ZGVsZXRlTW9kZT0wJmRlbGV0ZVdob2xlU2hlZXQ9ZmFsc2VgLFxuICAgIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxuICAgIH1cbiAgKTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gRXh0cmFjdHMgYW4gZXhwZW5zZSBkcmFmdCBmcm9tIGEgdGlja2V0IGltYWdlIHVzaW5nIC9hcGkvaWEvc2VydmljZS9leHBlbnNlZnJvbXRpY2tldC5cbmV4cG9ydCBjb25zdCBleHRyYWN0RXhwZW5zZUZyb21UaWNrZXREcmFmdCA9IGFzeW5jIChcbiAgdGlja2V0SW1hZ2U6IEZpbGUgfCBCbG9iLFxuICBwZXJzaXN0VGlja2V0PzogYm9vbGVhbixcbiAgdGlja2V0VXJsRmlsZT86IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXREcmFmdFJlc3BvbnNlPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcbiAgY29uc3Qgc2FmZVRpY2tldFVybCA9IHNhZmVUZXh0KHRpY2tldFVybEZpbGUpO1xuXG4gIGlmICh0aWNrZXRJbWFnZSBpbnN0YW5jZW9mIEZpbGUpIHtcbiAgICBmb3JtLmFwcGVuZChcInRpY2tldEltYWdlXCIsIHRpY2tldEltYWdlLCBzYWZlVGV4dCh0aWNrZXRJbWFnZS5uYW1lKSB8fCBcInRpY2tldC5qcGdcIik7XG4gIH0gZWxzZSB7XG4gICAgZm9ybS5hcHBlbmQoXCJ0aWNrZXRJbWFnZVwiLCB0aWNrZXRJbWFnZSwgXCJ0aWNrZXQuanBnXCIpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBwZXJzaXN0VGlja2V0ID09PSBcImJvb2xlYW5cIikge1xuICAgIGZvcm0uYXBwZW5kKFwicGVyc2lzdFRpY2tldFwiLCBwZXJzaXN0VGlja2V0ID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIpO1xuICB9XG5cbiAgaWYgKHNhZmVUaWNrZXRVcmwpIHtcbiAgICBmb3JtLmFwcGVuZChcInRpY2tldFVybEZpbGVcIiwgc2FmZVRpY2tldFVybCk7XG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXREcmFmdFJlc3BvbnNlPj4oXCIvYXBpL2lhL3NlcnZpY2UvZXhwZW5zZWZyb210aWNrZXRcIiwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VGb3JtSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcbiAgICBib2R5OiBmb3JtLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gQ3JlYXRlcyBhIHRpY2tldCBoZWFkZXIvbGluZXMgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLlxuZXhwb3J0IGNvbnN0IGNyZWF0ZUV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0Q3JlYXRlUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldENyZWF0ZVJlcXVlc3QgPSB7XG4gICAgLi4ucGF5bG9hZCxcbiAgICBnYXN0b1R5cGU6IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlKHBheWxvYWQ/Lmdhc3RvVHlwZSksXG4gIH07XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzXCIsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBMb2FkcyB0aWNrZXQgbGlzdCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGlzdC5cbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0ID0gYXN5bmMgKFxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IGNyZWF0ZWREYXRlRnJvbSA9IG5vcm1hbGl6ZVRpY2tldExpc3REYXRlKHBheWxvYWQ/LmNyZWF0ZWREYXRlRnJvbSk7XG4gIGNvbnN0IGNyZWF0ZWREYXRlVG8gPSBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZShwYXlsb2FkPy5jcmVhdGVkRGF0ZVRvKTtcbiAgaWYgKCFjcmVhdGVkRGF0ZUZyb20gfHwgIWNyZWF0ZWREYXRlVG8pIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImNyZWF0ZWREYXRlRnJvbSBhbmQgY3JlYXRlZERhdGVUbyBhcmUgcmVxdWlyZWQgaW4geXl5eS1NTS1kZCBmb3JtYXQuXCIpO1xuICB9XG5cbiAgY29uc3QgcHJlZmVycmVkU2VhcmNoS2V5ID0gc2FmZVRleHQocGF5bG9hZD8uc2VhcmNoS2V5IHx8IHBheWxvYWQ/LmZpbHRlcik7XG4gIGNvbnN0IGxlZ2FjeUZpbHRlciA9IHNhZmVUZXh0KHBheWxvYWQ/LmZpbHRlciB8fCBwcmVmZXJyZWRTZWFyY2hLZXkpO1xuICBjb25zdCBzYWZlUGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QgPSB7XG4gICAgcGFnZTogTnVtYmVyLmlzRmluaXRlKHBheWxvYWQ/LnBhZ2UpICYmIHBheWxvYWQucGFnZSA+IDAgPyBNYXRoLmZsb29yKHBheWxvYWQucGFnZSkgOiAxLFxuICAgIHBhZ2VTaXplOiBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZD8ucGFnZVNpemUpICYmIHBheWxvYWQucGFnZVNpemUgPiAwID8gTWF0aC5mbG9vcihwYXlsb2FkLnBhZ2VTaXplKSA6IDUwLFxuICAgIGNyZWF0ZWREYXRlRnJvbSxcbiAgICBjcmVhdGVkRGF0ZVRvLFxuICAgIHNlYXJjaEtleTogcHJlZmVycmVkU2VhcmNoS2V5IHx8IHVuZGVmaW5lZCxcbiAgICBmaWx0ZXI6IGxlZ2FjeUZpbHRlciB8fCB1bmRlZmluZWQsXG4gICAgc3RhdHVzOiBub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1cyhwYXlsb2FkPy5zdGF0dXMpLFxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQocGF5bG9hZD8uY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpIHx8IHVuZGVmaW5lZCxcbiAgICBnYXN0b1R5cGU6IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlKHBheWxvYWQ/Lmdhc3RvVHlwZSksXG4gIH07XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz4+KFxuICAgIFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL2xpc3RcIixcbiAgICB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBMb2FkcyBvbmUgdGlja2V0IGRldGFpbCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0uXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXQgPSBhc3luYyAoXG4gIGZpbGVJZDogc3RyaW5nLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldERldGFpbER0bz4+KFxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIFVwZGF0ZXMgdGlja2V0IGhlYWRlciBtZXRhZGF0YSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0uXG5leHBvcnQgY29uc3QgdXBkYXRlRXhwZW5zZVNoZWV0VGlja2V0ID0gYXN5bmMgKFxuICBmaWxlSWQ6IHN0cmluZyxcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0ID0ge1xuICAgIC4uLnBheWxvYWQsXG4gICAgZ2FzdG9UeXBlOiBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZShwYXlsb2FkPy5nYXN0b1R5cGUpLFxuICB9O1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH1gLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBEZWxldGVzIG9uZSB0aWNrZXQgb3Igb25lIHRpY2tldCBsaW5lIHZpYSBxdWVyeSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0uXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0ID0gYXN5bmMgKFxuICBmaWxlSWQ6IHN0cmluZyxcbiAgbGluZVJlY0lkPzogbnVtYmVyLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG51bGw+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICBpZiAoTnVtYmVyLmlzSW50ZWdlcihOdW1iZXIobGluZVJlY0lkKSkgJiYgTnVtYmVyKGxpbmVSZWNJZCkgPiAwKSB7XG4gICAgcXVlcnkuc2V0KFwibGluZVJlY0lkXCIsIFN0cmluZyhsaW5lUmVjSWQpKTtcbiAgfVxuXG4gIGNvbnN0IHN1ZmZpeCA9IHF1ZXJ5LnRvU3RyaW5nKCk7XG4gIGNvbnN0IHVybCA9IHN1ZmZpeFxuICAgID8gYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9PyR7c3VmZml4fWBcbiAgICA6IGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfWA7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+Pih1cmwsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gQXBwbGllcyBJQSBwYXlsb2FkIG92ZXIgYW4gZXhpc3RpbmcgdGlja2V0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9pYS5cbmV4cG9ydCBjb25zdCBhcHBseUV4cGVuc2VTaGVldFRpY2tldElhID0gYXN5bmMgKFxuICBmaWxlSWQ6IHN0cmluZyxcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3QgcmF3UGF5bG9hZCA9IChwYXlsb2FkIHx8IHt9KSBhcyBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3Q7XG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3QgPSB7XG4gICAgLi4ucmF3UGF5bG9hZCxcbiAgfTtcbiAgY29uc3QgZ2FzdG9UeXBlID0gbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUocmF3UGF5bG9hZC5nYXN0b1R5cGUpO1xuICBpZiAoZ2FzdG9UeXBlID09PSB1bmRlZmluZWQpIHtcbiAgICBkZWxldGUgc2FmZVBheWxvYWQuZ2FzdG9UeXBlO1xuICB9IGVsc2Uge1xuICAgIHNhZmVQYXlsb2FkLmdhc3RvVHlwZSA9IGdhc3RvVHlwZTtcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9pYWAsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBDcmVhdGVzIG9uZSB0aWNrZXQgbGluZSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vbGluZXMuXG5leHBvcnQgY29uc3QgY3JlYXRlRXhwZW5zZVNoZWV0VGlja2V0TGluZSA9IGFzeW5jIChcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmVSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcbiAgaWYgKCFzYWZlVGV4dChwYXlsb2FkPy5kZXNjcmlwdGlvbikgfHwgIWlzUG9zaXRpdmVOdW1iZXIocGF5bG9hZD8ucXR5KSB8fCAhaXNQb3NpdGl2ZU51bWJlcihwYXlsb2FkPy5wcmljZSkpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImRlc2NyaXB0aW9uLCBxdHkgPiAwIGFuZCBwcmljZSA+IDAgYXJlIHJlcXVpcmVkLlwiKTtcbiAgfVxuXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9saW5lc2AsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIFVwZGF0ZXMgb25lIHRpY2tldCBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9saW5lcy97bGluZVJlY0lkfS5cbmV4cG9ydCBjb25zdCB1cGRhdGVFeHBlbnNlU2hlZXRUaWNrZXRMaW5lID0gYXN5bmMgKFxuICBmaWxlSWQ6IHN0cmluZyxcbiAgbGluZVJlY0lkOiBzdHJpbmcgfCBudW1iZXIsXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmVSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcbiAgaWYgKCFzYWZlVGV4dChwYXlsb2FkPy5kZXNjcmlwdGlvbikgfHwgIWlzUG9zaXRpdmVOdW1iZXIocGF5bG9hZD8ucXR5KSB8fCAhaXNQb3NpdGl2ZU51bWJlcihwYXlsb2FkPy5wcmljZSkpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImRlc2NyaXB0aW9uLCBxdHkgPiAwIGFuZCBwcmljZSA+IDAgYXJlIHJlcXVpcmVkLlwiKTtcbiAgfVxuXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHNhZmVMaW5lSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGxpbmVSZWNJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vbGluZXMvJHtzYWZlTGluZUlkfWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIERlbGV0ZXMgb25lIHRpY2tldCBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9saW5lcy97bGluZVJlY0lkfS5cbmV4cG9ydCBjb25zdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRMaW5lID0gYXN5bmMgKFxuICBmaWxlSWQ6IHN0cmluZyxcbiAgbGluZVJlY0lkOiBzdHJpbmcgfCBudW1iZXIsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3Qgc2FmZUxpbmVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcobGluZVJlY0lkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+PihcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vbGluZXMvJHtzYWZlTGluZUlkfWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBVcGxvYWRzL3JlcGxhY2VzIHRpY2tldCBmaWxlIGNvbnRlbnQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9L2ZpbGUuXG5leHBvcnQgY29uc3QgdXBsb2FkRXhwZW5zZVNoZWV0VGlja2V0RmlsZSA9IGFzeW5jIChcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIGZpbGU6IEZpbGUgfCBCbG9iLFxuICBleHRlbnNpb24/OiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCBzYWZlRXh0ZW5zaW9uID0gc2FmZVRleHQoZXh0ZW5zaW9uKS5yZXBsYWNlKC9eXFwuLywgXCJcIik7XG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICBpZiAoc2FmZUV4dGVuc2lvbikge1xuICAgIHF1ZXJ5LnNldChcImV4dGVuc2lvblwiLCBzYWZlRXh0ZW5zaW9uKTtcbiAgfVxuXG4gIGNvbnN0IHN1ZmZpeCA9IHF1ZXJ5LnRvU3RyaW5nKCk7XG4gIGNvbnN0IHVybCA9IHN1ZmZpeFxuICAgID8gYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2ZpbGU/JHtzdWZmaXh9YFxuICAgIDogYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2ZpbGVgO1xuICBjb25zdCBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XG4gIGlmIChmaWxlIGluc3RhbmNlb2YgRmlsZSkge1xuICAgIGZvcm0uYXBwZW5kKFwiZmlsZVwiLCBmaWxlLCBzYWZlVGV4dChmaWxlLm5hbWUpIHx8IGB0aWNrZXQuJHtzYWZlRXh0ZW5zaW9uIHx8IFwianBnXCJ9YCk7XG4gIH0gZWxzZSB7XG4gICAgZm9ybS5hcHBlbmQoXCJmaWxlXCIsIGZpbGUsIGB0aWNrZXQuJHtzYWZlRXh0ZW5zaW9uIHx8IFwianBnXCJ9YCk7XG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+Pih1cmwsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlRm9ybUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gICAgYm9keTogZm9ybSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIERlbGV0ZXMgdGlja2V0IGZpbGUgY29udGVudCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vZmlsZS5cbmV4cG9ydCBjb25zdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRGaWxlID0gYXN5bmMgKFxuICBmaWxlSWQ6IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxudWxsPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxudWxsPj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2ZpbGVgLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIFNlYXJjaGVzIHByb2plY3RzIGZvciBkcm9wZG93biB1c2FnZSBpbiBmaWx0ZXJzIGFuZCBlZGl0IGZvcm1zLlxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVByb2plY3RzID0gYXN5bmMgKFxuICB0ZXJtOiBzdHJpbmcsXG4gIHBhZ2U6IG51bWJlcixcbiAgcGFnZVNpemU6IG51bWJlcixcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxQcm9qZWN0RHJvcGRvd25SZXNwb25zZT4gPT4ge1xuICBjb25zdCBzYWZlVGVybSA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcodGVybSB8fCBcIlwiKSk7XG4gIGNvbnN0IHNhZmVQYWdlID0gTnVtYmVyLmlzRmluaXRlKHBhZ2UpICYmIHBhZ2UgPiAwID8gTWF0aC5mbG9vcihwYWdlKSA6IDE7XG4gIGNvbnN0IHNhZmVQYWdlU2l6ZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlU2l6ZSkgJiYgcGFnZVNpemUgPiAwID8gTWF0aC5mbG9vcihwYWdlU2l6ZSkgOiAyMDtcblxuICByZXR1cm4gZmV0Y2hKc29uPFByb2plY3REcm9wZG93blJlc3BvbnNlPihcbiAgICBgL0dhc3Rvcy9HZXRQcm9qZWN0c0ZvckRyb3Bkb3duP3Rlcm09JHtzYWZlVGVybX0mcGFnZT0ke3NhZmVQYWdlfSZwYWdlU2l6ZT0ke3NhZmVQYWdlU2l6ZX1gLFxuICAgIHtcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgfVxuICApO1xufTtcbiIsICJleHBvcnQgdHlwZSBFeHBlbnNlRGF0ZVBhcnRzID0ge1xuICB5ZWFyOiBzdHJpbmc7XG4gIG1vbnRoOiBzdHJpbmc7XG4gIGRheTogc3RyaW5nO1xufTtcblxuY29uc3QgQkFTUVVFX01PTlRIU19TSE9SVCA9IFtcbiAgXCJ1cnRcIixcbiAgXCJvdHNcIixcbiAgXCJtYXJcIixcbiAgXCJhcGlcIixcbiAgXCJtYWlcIixcbiAgXCJla2FcIixcbiAgXCJ1enRcIixcbiAgXCJhYnVcIixcbiAgXCJpcmFcIixcbiAgXCJ1cnJcIixcbiAgXCJhemFcIixcbiAgXCJhYmVcIixcbl07XG5cbmNvbnN0IG5vcm1hbGl6ZVVpTG9jYWxlID0gKGxvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcobG9jYWxlIHx8IFwiXCIpLnRyaW0oKTtcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiZXMtRVNcIjtcbiAgaWYgKC9eemgtaGFucy9pLnRlc3QodmFsdWUpKSByZXR1cm4gXCJ6aC1DTlwiO1xuICByZXR1cm4gdmFsdWU7XG59O1xuXG5jb25zdCBpc0Jhc3F1ZUxvY2FsZSA9IChsb2NhbGU6IHN0cmluZyk6IGJvb2xlYW4gPT4gL15ldVxcYi9pLnRlc3QoU3RyaW5nKGxvY2FsZSB8fCBcIlwiKSk7XG5cbi8vIE5vcm1hbGl6ZSB1bmtub3duIHZhbHVlcyB0byBhIHRyaW1tZWQgc3RyaW5nLlxuZXhwb3J0IGNvbnN0IHNhZmVUZXh0ID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xuICByZXR1cm4gU3RyaW5nKHZhbHVlKS50cmltKCk7XG59O1xuXG4vLyBOb3JtYWxpemVzIGNhcmQgdGl0bGUgdGV4dCBvbmx5IHdoZW4gaXQgY29tZXMgaW4gZnVsbCB1cHBlciBvciBmdWxsIGxvd2VyIGNhc2UuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplQ2FyZFRpdGxlVGV4dCA9ICh2YWx1ZTogdW5rbm93biwgZmFsbGJhY2sgPSBcIi1cIik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHNvdXJjZSA9IHNhZmVUZXh0KHZhbHVlKTtcbiAgaWYgKCFzb3VyY2UpIHJldHVybiBmYWxsYmFjaztcblxuICBjb25zdCBoYXNMZXR0ZXJzID0gL1tBLVphLXpcdTAwQzAtXHUwMEQ2XHUwMEQ4LVx1MDBGNlx1MDBGOC1cdTAwRkZdLy50ZXN0KHNvdXJjZSk7XG4gIGlmICghaGFzTGV0dGVycykgcmV0dXJuIHNvdXJjZTtcblxuICBjb25zdCBpc0FsbFVwcGVyID0gc291cmNlID09PSBzb3VyY2UudG9VcHBlckNhc2UoKSAmJiBzb3VyY2UgIT09IHNvdXJjZS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBpc0FsbExvd2VyID0gc291cmNlID09PSBzb3VyY2UudG9Mb3dlckNhc2UoKSAmJiBzb3VyY2UgIT09IHNvdXJjZS50b1VwcGVyQ2FzZSgpO1xuICBpZiAoIWlzQWxsVXBwZXIgJiYgIWlzQWxsTG93ZXIpIHtcbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgY29uc3QgbG93ZXIgPSBzb3VyY2UudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIGAke2xvd2VyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpfSR7bG93ZXIuc2xpY2UoMSl9YDtcbn07XG5cbi8vIFJldHVybnMgdHJ1ZSBvbmx5IHdoZW4gdm91Y2hlciBoYXMgYSBtZWFuaW5nZnVsIGFzc2lnbmVkIHZhbHVlLlxuZXhwb3J0IGNvbnN0IGhhc0Fzc2lnbmVkVm91Y2hlciA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xuICBjb25zdCB2b3VjaGVyID0gc2FmZVRleHQodmFsdWUpLnRvVXBwZXJDYXNlKCk7XG4gIGlmICghdm91Y2hlcikgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gdm91Y2hlciAhPT0gXCItXCIgJiYgdm91Y2hlciAhPT0gXCIuXCIgJiYgdm91Y2hlciAhPT0gXCIwXCI7XG59O1xuXG4vLyBSZXR1cm4gZGF0ZSBhdCBsb2NhbCBkYXkgc3RhcnQuXG5leHBvcnQgY29uc3Qgc3RhcnRPZkRheSA9IChkYXRlOiBEYXRlKTogRGF0ZSA9PiB7XG4gIHJldHVybiBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpO1xufTtcblxuLy8gRm9ybWF0IGxvY2FsIGRhdGUgdG8geXl5eS1NTS1kZC5cbmV4cG9ydCBjb25zdCB0b0lzb0RhdGUgPSAoZGF0ZTogRGF0ZSk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBgJHtkYXRlLmdldEZ1bGxZZWFyKCl9LSR7U3RyaW5nKGRhdGUuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKX0tJHtTdHJpbmcoZGF0ZS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKX1gO1xufTtcblxuLy8gUGFyc2Ugc3VwcG9ydGVkIEFQSSBkYXRlIGZvcm1hdHMuXG5leHBvcnQgY29uc3QgcGFyc2VFeHBlbnNlRGF0ZSA9IChyYXc/OiBzdHJpbmcpOiBEYXRlIHwgbnVsbCA9PiB7XG4gIGlmICghcmF3KSByZXR1cm4gbnVsbDtcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcocmF3KS50cmltKCk7XG4gIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGRhdGVPbmx5ID0gdmFsdWUuc3BsaXQoXCJUXCIpWzBdLnNwbGl0KFwiIFwiKVswXTtcblxuICBpZiAoL15cXGR7Mn1bLi8tXVxcZHsyfVsuLy1dXFxkezR9JC8udGVzdChkYXRlT25seSkpIHtcbiAgICBjb25zdCBbZGF5LCBtb250aCwgeWVhcl0gPSBkYXRlT25seS5zcGxpdCgvWy4vLV0vKS5tYXAoTnVtYmVyKTtcbiAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xuICB9XG5cbiAgaWYgKC9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KGRhdGVPbmx5KSkge1xuICAgIGNvbnN0IFt5ZWFyLCBtb250aCwgZGF5XSA9IGRhdGVPbmx5LnNwbGl0KFwiLVwiKS5tYXAoTnVtYmVyKTtcbiAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xuICB9XG5cbiAgaWYgKC9eXFxkezR9Wy4vLV1cXGR7Mn1bLi8tXVxcZHsyfSQvLnRlc3QoZGF0ZU9ubHkpKSB7XG4gICAgY29uc3QgW3llYXIsIG1vbnRoLCBkYXldID0gZGF0ZU9ubHkuc3BsaXQoL1suLy1dLykubWFwKE51bWJlcik7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcbiAgfVxuXG4gIGlmICgvXlxcZHs4fSQvLnRlc3QoZGF0ZU9ubHkpKSB7XG4gICAgY29uc3QgeWVhciA9IE51bWJlcihkYXRlT25seS5zbGljZSgwLCA0KSk7XG4gICAgY29uc3QgbW9udGggPSBOdW1iZXIoZGF0ZU9ubHkuc2xpY2UoNCwgNikpO1xuICAgIGNvbnN0IGRheSA9IE51bWJlcihkYXRlT25seS5zbGljZSg2LCA4KSk7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcbiAgfVxuXG4gIGNvbnN0IHBhcnNlZCA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgcmV0dXJuIE51bWJlci5pc05hTihwYXJzZWQuZ2V0VGltZSgpKSA/IG51bGwgOiBwYXJzZWQ7XG59O1xuXG4vLyBGb3JtYXQgYSBkYXRlIGZvciByZWFkLW9ubHkgZmllbGRzIHVzaW5nIHRoZSBzYW1lIG91dHB1dCBzdHlsZSBhcyB2aXNpdHMuXG5leHBvcnQgY29uc3QgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlID0gKHJhdz86IHN0cmluZywgbG9jYWxlID0gXCJlcy1FU1wiLCBmYWxsYmFjayA9IFwiLVwiKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZGF0ZSA9IHBhcnNlRXhwZW5zZURhdGUocmF3KTtcbiAgaWYgKCFkYXRlKSByZXR1cm4gZmFsbGJhY2s7XG5cbiAgY29uc3Qgc2FmZUxvY2FsZSA9IG5vcm1hbGl6ZVVpTG9jYWxlKGxvY2FsZSk7XG4gIGlmIChpc0Jhc3F1ZUxvY2FsZShzYWZlTG9jYWxlKSkge1xuICAgIHJldHVybiBgJHtkYXRlLmdldERhdGUoKX0gJHtCQVNRVUVfTU9OVEhTX1NIT1JUW2RhdGUuZ2V0TW9udGgoKV19ICR7ZGF0ZS5nZXRGdWxsWWVhcigpfWAudG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIHJldHVybiBkYXRlXG4gICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhzYWZlTG9jYWxlLCB7XG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxuICAgICAgbW9udGg6IFwic2hvcnRcIixcbiAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxuICAgIH0pXG4gICAgLnJlcGxhY2UoL1xcLi9nLCBcIlwiKVxuICAgIC50b0xvd2VyQ2FzZSgpO1xufTtcblxuLy8gQnVpbGQgdGltZWxpbmUgZGF0ZSBmcmFnbWVudHMgZm9yIGNhcmQgbGVmdCBwYW5lbC5cbmV4cG9ydCBjb25zdCBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzID0gKHJhdz86IHN0cmluZywgbG9jYWxlID0gXCJlcy1FU1wiKTogRXhwZW5zZURhdGVQYXJ0cyA9PiB7XG4gIGNvbnN0IGRhdGUgPSBwYXJzZUV4cGVuc2VEYXRlKHJhdyk7XG4gIGlmICghZGF0ZSkge1xuICAgIHJldHVybiB7IHllYXI6IFwiXCIsIG1vbnRoOiBcIlwiLCBkYXk6IFwiLS1cIiB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB5ZWFyOiBTdHJpbmcoZGF0ZS5nZXRGdWxsWWVhcigpKSxcbiAgICBtb250aDogZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7IG1vbnRoOiBcInNob3J0XCIgfSkucmVwbGFjZSgvXFwuL2csIFwiXCIpLnRvVXBwZXJDYXNlKCksXG4gICAgZGF5OiBTdHJpbmcoZGF0ZS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKSxcbiAgfTtcbn07XG4iLCAidHlwZSBOYXZpZ2F0ZVdpdGhHdWFyZE9wdGlvbnMgPSB7XG4gIGFza0NvbmZpcm1hdGlvbj86IGJvb2xlYW47XG4gIGJ5cGFzc0d1YXJkT25jZT86IGJvb2xlYW47XG4gIG1lc3NhZ2U/OiBzdHJpbmc7XG59O1xuXG4vLyBVcGRhdGVzIHRoZSBnbG9iYWwgbmF2aWdhdGlvbiBndWFyZCBsaWZlY3ljbGUgZm9yIGFjdGl2ZSBlZGl0IHByb2Nlc3Nlcy5cbmV4cG9ydCBjb25zdCBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkID0gKGFjdGl2ZTogYm9vbGVhbik6IHZvaWQgPT4ge1xuICB3aW5kb3cuX19pbmRTZXROYXZpZ2F0aW9uR3VhcmQ/LihhY3RpdmUpO1xufTtcblxuLy8gQ2xlYXJzIGdsb2JhbCBuYXZpZ2F0aW9uIGd1YXJkIGZsYWdzIHdoZW4gY29tcG9uZW50IHVubW91bnRzLlxuZXhwb3J0IGNvbnN0IGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCA9ICgpOiB2b2lkID0+IHtcbiAgd2luZG93Ll9faW5kQ2xlYXJOYXZpZ2F0aW9uR3VhcmQ/LigpO1xufTtcblxuLy8gRXhlY3V0ZXMgbmF2aWdhdGlvbiBhY3Rpb24gdGhyb3VnaCBzaXRlIGd1YXJkIGlmIGF2YWlsYWJsZS5cbmV4cG9ydCBjb25zdCBydW5HdWFyZGVkTmF2aWdhdGlvbiA9IChcbiAgYWN0aW9uOiAoKSA9PiB2b2lkLFxuICBvcHRpb25zOiBOYXZpZ2F0ZVdpdGhHdWFyZE9wdGlvbnMgPSB7fVxuKTogdm9pZCA9PiB7XG4gIGNvbnN0IHsgYXNrQ29uZmlybWF0aW9uID0gZmFsc2UsIG1lc3NhZ2UgfSA9IG9wdGlvbnM7XG4gIGlmIChhc2tDb25maXJtYXRpb24gJiYgdHlwZW9mIHdpbmRvdy5fX2luZFJlcXVlc3ROYXZpZ2F0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB3aW5kb3cuX19pbmRSZXF1ZXN0TmF2aWdhdGlvbihhY3Rpb24sIG1lc3NhZ2UpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGFjdGlvbigpO1xufTtcblxuLy8gTmF2aWdhdGVzIHRvIHRhcmdldCBVUkwgYW5kIGtlZXBzIHNpdGUtbGV2ZWwgZ3VhcmQgYmVoYXZpb3IgY29uc2lzdGVudC5cbmV4cG9ydCBjb25zdCBuYXZpZ2F0ZVRvRXhwZW5zZVVybCA9IChcbiAgdGFyZ2V0VXJsOiBzdHJpbmcsXG4gIG9wdGlvbnM6IE5hdmlnYXRlV2l0aEd1YXJkT3B0aW9ucyA9IHt9XG4pOiB2b2lkID0+IHtcbiAgY29uc3Qgc2FmZVVybCA9IFN0cmluZyh0YXJnZXRVcmwgfHwgXCJcIikudHJpbSgpO1xuICBpZiAoIXNhZmVVcmwpIHJldHVybjtcblxuICBjb25zdCB7IGJ5cGFzc0d1YXJkT25jZSA9IHRydWUgfSA9IG9wdGlvbnM7XG4gIHJ1bkd1YXJkZWROYXZpZ2F0aW9uKCgpID0+IHtcbiAgICBpZiAoYnlwYXNzR3VhcmRPbmNlKSB7XG4gICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcbiAgICB9XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBzYWZlVXJsO1xuICB9LCBvcHRpb25zKTtcbn07XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUmVtb3RlU2VhcmNoQ29tYm9ib3gsIHsgdHlwZSBSZW1vdGVTZWFyY2hPcHRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1JlbW90ZVNlYXJjaENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlUHJvamVjdHMgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuXG50eXBlIEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXRQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICByZWFkT25seT86IGJvb2xlYW47XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcbn07XG5cbmNvbnN0IFNFQVJDSF9QQUdFX1NJWkUgPSAyMDtcblxuY29uc3QgbWFwUHJvamVjdE9wdGlvbnMgPSAoaXRlbXM6IEFycmF5PHsgdmFsdWU/OiBzdHJpbmc7IHRleHQ/OiBzdHJpbmcgfT4gfCB1bmRlZmluZWQpOiBSZW1vdGVTZWFyY2hPcHRpb25bXSA9PiB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheShpdGVtcykgPyBpdGVtcyA6IFtdKVxuICAgIC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlVGV4dCA9IFN0cmluZyhpdGVtPy52YWx1ZSB8fCBcIlwiKS50cmltKCk7XG4gICAgICBpZiAoIXZhbHVlVGV4dCkgcmV0dXJuIG51bGw7XG4gICAgICBjb25zdCBzdWJ0aXRsZSA9IFN0cmluZyhpdGVtPy50ZXh0IHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZVRleHQsXG4gICAgICAgIHRpdGxlOiB2YWx1ZVRleHQsXG4gICAgICAgIHN1YnRpdGxlOiBzdWJ0aXRsZSB8fCBcIi1cIixcbiAgICAgIH0gYXMgUmVtb3RlU2VhcmNoT3B0aW9uO1xuICAgIH0pXG4gICAgLmZpbHRlcihCb29sZWFuKSBhcyBSZW1vdGVTZWFyY2hPcHRpb25bXTtcbn07XG5cbi8vIFByb2plY3QgZmlsdGVyIGlucHV0IGJhY2tlZCBieSByZW1vdGUgZHJvcGRvd24gc3VnZ2VzdGlvbnMuXG5jb25zdCBFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHNob3dMYWJlbCA9IHRydWUsXG59OiBFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0UHJvcHMpID0+IHtcbiAgY29uc3QgbG9hZE9wdGlvbnMgPSB1c2VDYWxsYmFjayhhc3luYyAodGVybTogc3RyaW5nLCBzaWduYWw6IEFib3J0U2lnbmFsKTogUHJvbWlzZTxSZW1vdGVTZWFyY2hPcHRpb25bXT4gPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlUHJvamVjdHModGVybSwgMSwgU0VBUkNIX1BBR0VfU0laRSwge1xuICAgICAgc2lnbmFsLFxuICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWFwUHJvamVjdE9wdGlvbnMocmVzcG9uc2U/Lml0ZW1zKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGxvYWRPcHRpb25zUGFnZSA9IHVzZUNhbGxiYWNrKGFzeW5jICh0ZXJtOiBzdHJpbmcsIHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlciwgc2lnbmFsOiBBYm9ydFNpZ25hbCkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlUHJvamVjdHModGVybSwgcGFnZSwgcGFnZVNpemUsIHtcbiAgICAgIHNpZ25hbCxcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW1zOiBtYXBQcm9qZWN0T3B0aW9ucyhyZXNwb25zZT8uaXRlbXMpLFxuICAgICAgdG90YWw6IE51bWJlcihyZXNwb25zZT8udG90YWwgfHwgMCksXG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPFJlbW90ZVNlYXJjaENvbWJvYm94XG4gICAgICBsYWJlbD17bGFiZWx9XG4gICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICBvblNlYXJjaD17bG9hZE9wdGlvbnN9XG4gICAgICBvblNlYXJjaFBhZ2U9e2xvYWRPcHRpb25zUGFnZX1cbiAgICAgIGlkQmFzZT1cImV4cGVuc2UtcHJvamVjdC1maWx0ZXJcIlxuICAgICAgbWluU2VhcmNoTGVuZ3RoPXswfVxuICAgICAgcGFnZVNpemU9e1NFQVJDSF9QQUdFX1NJWkV9XG4gICAgICBhbGxvd0VtcHR5U2VhcmNoXG4gICAgICBsb2FkT25PcGVuXG4gICAgICBpbmZpbml0ZVNjcm9sbFxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgc2hvd0xhYmVsPXtzaG93TGFiZWx9XG4gICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBGbG9hdGluZ0xpc3QgZnJvbSBcIi4vRmxvYXRpbmdMaXN0LnRzeFwiO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSBcIi4vU3Bpbm5lci50c3hcIjtcbmltcG9ydCB7IENoZXZyb25Eb3duU3ZnLCBDaGV2cm9uVXBTdmcgfSBmcm9tIFwiLi9jaGV2cm9ucy50c3hcIjtcbmltcG9ydCB7IGhhbmRsZUNvbWJvYm94S2V5RG93biB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VDb21ib2JveEtleWJvYXJkLnRzXCI7XG5pbXBvcnQgeyB1c2VPdXRzaWRlQ2xpY2sgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlT3V0c2lkZUNsaWNrLnRzXCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuXG5leHBvcnQgdHlwZSBSZW1vdGVTZWFyY2hPcHRpb24gPSB7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIHRpdGxlPzogc3RyaW5nO1xuICBzdWJ0aXRsZT86IHN0cmluZztcbn07XG5cbnR5cGUgUmVtb3RlU2VhcmNoQ29tYm9ib3hQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvblNlYXJjaDogKHRlcm06IHN0cmluZywgc2lnbmFsOiBBYm9ydFNpZ25hbCkgPT4gUHJvbWlzZTxSZW1vdGVTZWFyY2hPcHRpb25bXT47XG4gIG9uU2VhcmNoUGFnZT86IChcbiAgICB0ZXJtOiBzdHJpbmcsXG4gICAgcGFnZTogbnVtYmVyLFxuICAgIHBhZ2VTaXplOiBudW1iZXIsXG4gICAgc2lnbmFsOiBBYm9ydFNpZ25hbFxuICApID0+IFByb21pc2U8eyBpdGVtczogUmVtb3RlU2VhcmNoT3B0aW9uW107IHRvdGFsPzogbnVtYmVyIH0+O1xuICBpZEJhc2U6IHN0cmluZztcbiAgbWluU2VhcmNoTGVuZ3RoPzogbnVtYmVyO1xuICBwYWdlU2l6ZT86IG51bWJlcjtcbiAgYWxsb3dFbXB0eVNlYXJjaD86IGJvb2xlYW47XG4gIGxvYWRPbk9wZW4/OiBib29sZWFuO1xuICBpbmZpbml0ZVNjcm9sbD86IGJvb2xlYW47XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBzaG93TGFiZWw/OiBib29sZWFuO1xuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcbn07XG5cbmNvbnN0IHVuaXF1ZUJ5VmFsdWUgPSAoaXRlbXM6IFJlbW90ZVNlYXJjaE9wdGlvbltdKTogUmVtb3RlU2VhcmNoT3B0aW9uW10gPT4ge1xuICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgUmVtb3RlU2VhcmNoT3B0aW9uPigpO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMgfHwgW10pIHtcbiAgICBjb25zdCBrZXkgPSBTdHJpbmcoaXRlbS52YWx1ZSB8fCBcIlwiKS50cmltKCk7XG4gICAgaWYgKCFrZXkpIGNvbnRpbnVlO1xuICAgIGlmIChtYXAuaGFzKGtleSkpIGNvbnRpbnVlO1xuICAgIG1hcC5zZXQoa2V5LCB7XG4gICAgICB2YWx1ZToga2V5LFxuICAgICAgdGl0bGU6IFN0cmluZyhpdGVtLnRpdGxlIHx8IFwiXCIpLnRyaW0oKSxcbiAgICAgIHN1YnRpdGxlOiBTdHJpbmcoaXRlbS5zdWJ0aXRsZSB8fCBcIlwiKS50cmltKCksXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIEFycmF5LmZyb20obWFwLnZhbHVlcygpKTtcbn07XG5cbi8vIEdlbmVyaWMgcmVtb3RlLXNlYXJjaCBjb21ib2JveCB0aGF0IHN1cHBvcnRzIG1hbnVhbCBzZWFyY2ggYW5kIG9wdGlvbmFsIHBhZ2VkIGxvYWRpbmcgb24gb3Blbi5cbmNvbnN0IFJlbW90ZVNlYXJjaENvbWJvYm94ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIG9uU2VhcmNoLFxuICBvblNlYXJjaFBhZ2UsXG4gIGlkQmFzZSxcbiAgbWluU2VhcmNoTGVuZ3RoID0gMixcbiAgcGFnZVNpemUgPSAyMCxcbiAgYWxsb3dFbXB0eVNlYXJjaCA9IGZhbHNlLFxuICBsb2FkT25PcGVuID0gZmFsc2UsXG4gIGluZmluaXRlU2Nyb2xsID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIHNob3dMYWJlbCA9IHRydWUsXG4gIHBhbmVsQ2xhc3NOYW1lID0gXCJ2aXNpdGFzLXR5cG9ncmFwaHlcIixcbn06IFJlbW90ZVNlYXJjaENvbWJvYm94UHJvcHMpID0+IHtcbiAgY29uc3QgcmVhZE9ubHlNb2RlID0gcmVhZE9ubHkgfHwgZGlzYWJsZWQ7XG4gIGNvbnN0IHZhbHVlQ29sb3IgPSByZWFkT25seU1vZGUgPyBcIiM2NDc0OGJcIiA6IFwiIzAwMjk2YmUwXCI7XG4gIGNvbnN0IFtxdWVyeSwgc2V0UXVlcnldID0gdXNlU3RhdGUodmFsdWUgfHwgXCJcIik7XG4gIGNvbnN0IFtvcHRpb25zLCBzZXRPcHRpb25zXSA9IHVzZVN0YXRlPFJlbW90ZVNlYXJjaE9wdGlvbltdPihbXSk7XG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYWN0aXZlSW5kZXgsIHNldEFjdGl2ZUluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbbGFzdFNlYXJjaGVkVGVybSwgc2V0TGFzdFNlYXJjaGVkVGVybV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2N1cnJlbnRQYWdlLCBzZXRDdXJyZW50UGFnZV0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2hhc01vcmUsIHNldEhhc01vcmVdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGFib3J0UmVmID0gdXNlUmVmPEFib3J0Q29udHJvbGxlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBhcHBlbmRSZXF1ZXN0UmVmID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGJveFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgdXNlT3V0c2lkZUNsaWNrKFtjb250YWluZXJSZWYsIGxpc3RSZWZdLCAoKSA9PiBzZXRPcGVuKGZhbHNlKSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRRdWVyeSh2YWx1ZSB8fCBcIlwiKTtcbiAgfSwgW3ZhbHVlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgYWJvcnRSZWYuY3VycmVudD8uYWJvcnQoKTtcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICBjb25zdCBmaWx0ZXJlZCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmICghcXVlcnkudHJpbSgpKSByZXR1cm4gb3B0aW9ucztcbiAgICBjb25zdCBxID0gcXVlcnkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIG9wdGlvbnMuZmlsdGVyKChvcHRpb24pID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlVGV4dCA9IG9wdGlvbi52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgdGl0bGVUZXh0ID0gU3RyaW5nKG9wdGlvbi50aXRsZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3Qgc3VidGl0bGVUZXh0ID0gU3RyaW5nKG9wdGlvbi5zdWJ0aXRsZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgcmV0dXJuIHZhbHVlVGV4dC5pbmNsdWRlcyhxKSB8fCB0aXRsZVRleHQuaW5jbHVkZXMocSkgfHwgc3VidGl0bGVUZXh0LmluY2x1ZGVzKHEpO1xuICAgIH0pO1xuICB9LCBbb3B0aW9ucywgcXVlcnldKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChhcHBlbmRSZXF1ZXN0UmVmLmN1cnJlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVJbmRleCgwKTtcbiAgfSwgW2ZpbHRlcmVkLmxlbmd0aCwgcXVlcnldKTtcblxuICBjb25zdCBjYW5TZWFyY2hUZXJtID0gdXNlQ2FsbGJhY2soXG4gICAgKHRlcm06IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgICAgY29uc3QgdHJpbW1lZCA9IHRlcm0udHJpbSgpO1xuICAgICAgaWYgKCF0cmltbWVkKSByZXR1cm4gYWxsb3dFbXB0eVNlYXJjaDtcbiAgICAgIHJldHVybiB0cmltbWVkLmxlbmd0aCA+PSBtaW5TZWFyY2hMZW5ndGg7XG4gICAgfSxcbiAgICBbYWxsb3dFbXB0eVNlYXJjaCwgbWluU2VhcmNoTGVuZ3RoXVxuICApO1xuXG4gIGNvbnN0IGV4ZWN1dGVTZWFyY2ggPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAodGVybTogc3RyaW5nLCBwYWdlOiBudW1iZXIsIGFwcGVuZDogYm9vbGVhbikgPT4ge1xuICAgICAgYWJvcnRSZWYuY3VycmVudD8uYWJvcnQoKTtcbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcbiAgICAgIGFwcGVuZFJlcXVlc3RSZWYuY3VycmVudCA9IGFwcGVuZDtcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG5cbiAgICAgIGNvbnN0IHRlcm1LZXkgPSB0ZXJtLnRvTG93ZXJDYXNlKCk7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAob25TZWFyY2hQYWdlKSB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBvblNlYXJjaFBhZ2UodGVybSwgcGFnZSwgcGFnZVNpemUsIGNvbnRyb2xsZXIuc2lnbmFsKTtcbiAgICAgICAgICBjb25zdCBwYWdlSXRlbXMgPSB1bmlxdWVCeVZhbHVlKEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lml0ZW1zKSA/IHJlc3BvbnNlLml0ZW1zIDogW10pO1xuICAgICAgICAgIHNldE9wdGlvbnMoKHByZXZpb3VzKSA9PiAoYXBwZW5kID8gdW5pcXVlQnlWYWx1ZShbLi4uKHByZXZpb3VzIHx8IFtdKSwgLi4ucGFnZUl0ZW1zXSkgOiBwYWdlSXRlbXMpKTtcbiAgICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcblxuICAgICAgICAgIGNvbnN0IGFwaVRvdGFsID0gTnVtYmVyKHJlc3BvbnNlPy50b3RhbCk7XG4gICAgICAgICAgaWYgKE51bWJlci5pc0Zpbml0ZShhcGlUb3RhbCkgJiYgYXBpVG90YWwgPiAwKSB7XG4gICAgICAgICAgICBzZXRIYXNNb3JlKHBhZ2UgKiBwYWdlU2l6ZSA8IGFwaVRvdGFsKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0SGFzTW9yZShwYWdlSXRlbXMubGVuZ3RoID49IHBhZ2VTaXplKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBvblNlYXJjaCh0ZXJtLCBjb250cm9sbGVyLnNpZ25hbCk7XG4gICAgICAgICAgY29uc3QgbmV4dCA9IHVuaXF1ZUJ5VmFsdWUocmVzcG9uc2UgfHwgW10pO1xuICAgICAgICAgIHNldE9wdGlvbnMobmV4dCk7XG4gICAgICAgICAgc2V0Q3VycmVudFBhZ2UoMSk7XG4gICAgICAgICAgc2V0SGFzTW9yZShmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRMYXN0U2VhcmNoZWRUZXJtKHRlcm1LZXkpO1xuICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIGlmICghYXBwZW5kKSB7XG4gICAgICAgICAgc2V0T3B0aW9ucyhbXSk7XG4gICAgICAgICAgc2V0Q3VycmVudFBhZ2UoMCk7XG4gICAgICAgICAgc2V0SGFzTW9yZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0TGFzdFNlYXJjaGVkVGVybSh0ZXJtS2V5KTtcbiAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChhYm9ydFJlZi5jdXJyZW50ID09PSBjb250cm9sbGVyKSB7XG4gICAgICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgYXBwZW5kUmVxdWVzdFJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW29uU2VhcmNoLCBvblNlYXJjaFBhZ2UsIHBhZ2VTaXplXVxuICApO1xuXG4gIGNvbnN0IHJ1blNlYXJjaCA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAocmVhZE9ubHlNb2RlIHx8IGxvYWRpbmcpIHJldHVybjtcbiAgICBjb25zdCB0ZXJtID0gcXVlcnkudHJpbSgpO1xuICAgIGNvbnN0IHRlcm1LZXkgPSB0ZXJtLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBpZiAoIWNhblNlYXJjaFRlcm0odGVybSkpIHtcbiAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgc2V0Q3VycmVudFBhZ2UoMCk7XG4gICAgICBzZXRIYXNNb3JlKGZhbHNlKTtcbiAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgc2V0TGFzdFNlYXJjaGVkVGVybShcIlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGVybUtleSA9PT0gbGFzdFNlYXJjaGVkVGVybSAmJiBvcHRpb25zLmxlbmd0aCA+IDAgJiYgIW9uU2VhcmNoUGFnZSkge1xuICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCBleGVjdXRlU2VhcmNoKHRlcm0sIDEsIGZhbHNlKTtcbiAgfSwgW2NhblNlYXJjaFRlcm0sIGV4ZWN1dGVTZWFyY2gsIGxhc3RTZWFyY2hlZFRlcm0sIGxvYWRpbmcsIG9uU2VhcmNoUGFnZSwgb3B0aW9ucy5sZW5ndGgsIHF1ZXJ5LCByZWFkT25seU1vZGVdKTtcblxuICBjb25zdCBydW5Mb2FkTW9yZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAocmVhZE9ubHlNb2RlIHx8IGxvYWRpbmcgfHwgIW9uU2VhcmNoUGFnZSB8fCAhaW5maW5pdGVTY3JvbGwgfHwgIWhhc01vcmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0ZXJtID0gcXVlcnkudHJpbSgpO1xuICAgIGNvbnN0IHRlcm1LZXkgPSB0ZXJtLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHRlcm1LZXkgIT09IGxhc3RTZWFyY2hlZFRlcm0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0UGFnZSA9IGN1cnJlbnRQYWdlICsgMTtcbiAgICBpZiAobmV4dFBhZ2UgPD0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF3YWl0IGV4ZWN1dGVTZWFyY2godGVybSwgbmV4dFBhZ2UsIHRydWUpO1xuICB9LCBbY3VycmVudFBhZ2UsIGV4ZWN1dGVTZWFyY2gsIGhhc01vcmUsIGluZmluaXRlU2Nyb2xsLCBsYXN0U2VhcmNoZWRUZXJtLCBsb2FkaW5nLCBvblNlYXJjaFBhZ2UsIHF1ZXJ5LCByZWFkT25seU1vZGVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghb3BlbiB8fCAhb25TZWFyY2hQYWdlIHx8ICFpbmZpbml0ZVNjcm9sbCkgcmV0dXJuO1xuICAgIGNvbnN0IHNjcm9sbGVyID0gbGlzdFJlZi5jdXJyZW50Py5wYXJlbnRFbGVtZW50O1xuICAgIGlmICghc2Nyb2xsZXIpIHJldHVybjtcblxuICAgIGNvbnN0IG9uU2Nyb2xsID0gKCkgPT4ge1xuICAgICAgaWYgKGxvYWRpbmcgfHwgIWhhc01vcmUpIHJldHVybjtcbiAgICAgIGNvbnN0IHRocmVzaG9sZCA9IDQwO1xuICAgICAgY29uc3QgaXNOZWFyQm90dG9tID0gc2Nyb2xsZXIuc2Nyb2xsVG9wICsgc2Nyb2xsZXIuY2xpZW50SGVpZ2h0ID49IHNjcm9sbGVyLnNjcm9sbEhlaWdodCAtIHRocmVzaG9sZDtcbiAgICAgIGlmIChpc05lYXJCb3R0b20pIHtcbiAgICAgICAgdm9pZCBydW5Mb2FkTW9yZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBzY3JvbGxlci5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsLCB7IHBhc3NpdmU6IHRydWUgfSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHNjcm9sbGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwpO1xuICAgIH07XG4gIH0sIFtoYXNNb3JlLCBpbmZpbml0ZVNjcm9sbCwgbG9hZGluZywgb25TZWFyY2hQYWdlLCBvcGVuLCBydW5Mb2FkTW9yZV0pO1xuXG4gIGNvbnN0IHNlbGVjdE9wdGlvbiA9IChvcHRpb246IFJlbW90ZVNlYXJjaE9wdGlvbikgPT4ge1xuICAgIGNvbnN0IG5leHRWYWx1ZSA9IFN0cmluZyhvcHRpb24udmFsdWUgfHwgXCJcIikudHJpbSgpO1xuICAgIHNldFF1ZXJ5KG5leHRWYWx1ZSk7XG4gICAgb25DaGFuZ2UobmV4dFZhbHVlKTtcbiAgICBzZXRMYXN0U2VhcmNoZWRUZXJtKG5leHRWYWx1ZS50b0xvd2VyQ2FzZSgpKTtcbiAgICBzZXRPcGVuKGZhbHNlKTtcbiAgfTtcblxuICBjb25zdCBxdWVyeUtleSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBzaG93U2VhcmNoSWNvbiA9XG4gICAgIXJlYWRPbmx5TW9kZSAmJlxuICAgICFsb2FkaW5nICYmXG4gICAgY2FuU2VhcmNoVGVybShxdWVyeSkgJiZcbiAgICBxdWVyeUtleSAhPT0gbGFzdFNlYXJjaGVkVGVybTtcblxuICBjb25zdCBsaXN0SWQgPSBgJHtpZEJhc2V9LW9wdGlvbnNgO1xuICBjb25zdCBhY3RpdmVJZCA9IG9wZW4gJiYgZmlsdGVyZWRbYWN0aXZlSW5kZXhdID8gYCR7aWRCYXNlfS1vcHQtJHtmaWx0ZXJlZFthY3RpdmVJbmRleF0udmFsdWV9YCA6IHVuZGVmaW5lZDtcbiAgY29uc3Qgc2hvd0xvYWRpbmdPbmx5U3RhdGUgPSBsb2FkaW5nICYmIGZpbHRlcmVkLmxlbmd0aCA9PT0gMDtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCIgcmVmPXtjb250YWluZXJSZWZ9PlxuICAgICAge3Nob3dMYWJlbCA/IChcbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiIHN0eWxlPXt7IGNvbG9yOiBcIiMwMDI5NmJlMFwiIH19PlxuICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICkgOiBudWxsfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXtib3hSZWZ9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgXCJyZWxhdGl2ZSB3LWZ1bGwgcm91bmRlZC14bCBiZy13aGl0ZSB0ZXh0LWxlZnQgZm9jdXMtd2l0aGluOmJvcmRlci1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLTIgZm9jdXMtd2l0aGluOnJpbmctcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy1vZmZzZXQtd2hpdGUgc206dGV4dC1zbVwiLFxuICAgICAgICAgICAgcmVhZE9ubHlNb2RlID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwiXCJcbiAgICAgICAgICApfVxuICAgICAgICA+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgIFwidy1mdWxsIHJvdW5kZWQteGwgYm9yZGVyIHB4LTMgcHktMiBwci0yMCB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGRpc2FibGVkOmJnLXNsYXRlLTEwMCBkaXNhYmxlZDp0ZXh0LXNsYXRlLTUwMCBkaXNhYmxlZDpib3JkZXItc2xhdGUtMjAwIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZFwiLFxuICAgICAgICAgICAgICBcImJvcmRlci1zbGF0ZS0yMDAgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCIsXG4gICAgICAgICAgICAgIHJlYWRPbmx5TW9kZSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcInRleHQtc2xhdGUtOTAwXCJcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICBzdHlsZT17eyBjb2xvcjogdmFsdWVDb2xvciB9fVxuICAgICAgICAgICAgdmFsdWU9e3F1ZXJ5fVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBuZXh0VmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgIHNldFF1ZXJ5KG5leHRWYWx1ZSk7XG4gICAgICAgICAgICAgIG9uQ2hhbmdlKG5leHRWYWx1ZSk7XG4gICAgICAgICAgICAgIGlmIChuZXh0VmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCkgIT09IGxhc3RTZWFyY2hlZFRlcm0pIHtcbiAgICAgICAgICAgICAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uRm9jdXM9eygpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFyZWFkT25seU1vZGUgJiYgZmlsdGVyZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbktleURvd249eyhldmVudCkgPT5cbiAgICAgICAgICAgICAgaGFuZGxlQ29tYm9ib3hLZXlEb3duKGV2ZW50LCB7XG4gICAgICAgICAgICAgICAgaXNPcGVuOiBvcGVuLFxuICAgICAgICAgICAgICAgIHNldE9wZW4sXG4gICAgICAgICAgICAgICAgb3B0aW9uQ291bnQ6IGZpbHRlcmVkLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBzZXRBY3RpdmVJbmRleCxcbiAgICAgICAgICAgICAgICBvbkVudGVyV2hlbk9wZW46ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbihmaWx0ZXJlZFthY3RpdmVJbmRleF0gPz8gZmlsdGVyZWRbMF0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB2b2lkIHJ1blNlYXJjaCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25FbnRlcldoZW5DbG9zZWQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHZvaWQgcnVuU2VhcmNoKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcGVuT25BcnJvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVsfVxuICAgICAgICAgICAgcm9sZT1cImNvbWJvYm94XCJcbiAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e29wZW59XG4gICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtsaXN0SWR9XG4gICAgICAgICAgICBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9e2FjdGl2ZUlkfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCByaWdodC0wIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHByLTJcIj5cbiAgICAgICAgICAgIHtsb2FkaW5nID8gKFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBweC0xLjVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIC8+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgICAgICB7c2hvd1NlYXJjaEljb24gPyAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBwLTEuNSB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNsYXRlLTUwMFwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdm9pZCBydW5TZWFyY2goKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fU2VhcmNoXCIsIFwiU2VhcmNoXCIpfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtyZWFkT25seU1vZGV9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MS41fSBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJoLTUgdy01XCI+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm0xNS43NSAxNS43NS0yLjQ4OS0yLjQ4OW0wIDBhMy4zNzUgMy4zNzUgMCAxIDAtNC43NzMtNC43NzMgMy4zNzUgMy4zNzUgMCAwIDAgNC43NzQgNC43NzRaTTIxIDEyYTkgOSAwIDEgMS0xOCAwIDkgOSAwIDAgMSAxOCAwWlwiIC8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHAtMS41IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtc2xhdGUtNjAwXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZWFkT25seU1vZGUpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAob3Blbikge1xuICAgICAgICAgICAgICAgICAgc2V0T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghcXVlcnkudHJpbSgpICYmIGxvYWRPbk9wZW4pIHtcbiAgICAgICAgICAgICAgICAgIHZvaWQgcnVuU2VhcmNoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtvcGVuID8gaW5kVChcIkRyb3Bkb3duX0hpZGVPcHRpb25zXCIsIFwiSGlkZSBvcHRpb25zXCIpIDogaW5kVChcIkRyb3Bkb3duX1Nob3dPcHRpb25zXCIsIFwiU2hvdyBvcHRpb25zXCIpfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17cmVhZE9ubHlNb2RlfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7b3BlbiA/IDxDaGV2cm9uVXBTdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+IDogPENoZXZyb25Eb3duU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPn1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEZsb2F0aW5nTGlzdFxuICAgICAgICAgIGFuY2hvclJlZj17Ym94UmVmfVxuICAgICAgICAgIG9wZW49e29wZW59XG4gICAgICAgICAgekluZGV4PXszNjAwMDB9XG4gICAgICAgICAgbWF4SGVpZ2h0Q2xhc3M9XCJtYXgtaC03MlwiXG4gICAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgICAgIHJvdW5kZWRDbGFzcz1cInJvdW5kZWQteGxcIlxuICAgICAgICAgIHBhbmVsQ2xhc3NOYW1lPXtwYW5lbENsYXNzTmFtZX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgaWQ9e2xpc3RJZH0gcmVmPXtsaXN0UmVmfT5cbiAgICAgICAgICAgIHtzaG93TG9hZGluZ09ubHlTdGF0ZSA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPntpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfTwvZGl2PlxuICAgICAgICAgICAgKSA6IGZpbHRlcmVkLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPntpbmRUKFwiQ29tbW9uX05vRGF0YVwiLCBcIk5vIGRhdGFcIil9PC9kaXY+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIHtmaWx0ZXJlZC5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gaW5kZXggPT09IGFjdGl2ZUluZGV4O1xuICAgICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uSWQgPSBvcHRpb24udmFsdWUgfHwgYCR7aW5kZXh9YDtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e29wdGlvbklkfVxuICAgICAgICAgICAgICAgICAgICAgIGlkPXtgJHtpZEJhc2V9LW9wdC0ke29wdGlvbklkfWB9XG4gICAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17aXNBY3RpdmV9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWxhdGl2ZSBmbGV4IHctZnVsbCBjdXJzb3ItZGVmYXVsdCBzZWxlY3Qtbm9uZSBpdGVtcy1zdGFydCBweS0yIHB4LTMgdGV4dC1sZWZ0IHRleHQtc21cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID8gXCJiZy1wcmltYXJ5IHRleHQtd2hpdGVcIiA6IFwidGV4dC1zbGF0ZS05MDBcIlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRBY3RpdmVJbmRleChpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2VsZWN0T3B0aW9uKG9wdGlvbil9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1lZGl1bVwiPntvcHRpb24udGl0bGUgfHwgb3B0aW9uLnZhbHVlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtvcHRpb24uc3VidGl0bGUgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInRleHQteHNcIiwgaXNBY3RpdmUgPyBcInRleHQtd2hpdGUvOTBcIiA6IFwidGV4dC1zbGF0ZS01MDBcIil9PntvcHRpb24uc3VidGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAge2xvYWRpbmcgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIGJvcmRlci10IGJvcmRlci1zbGF0ZS0xMDBcIj57aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L2Rpdj5cbiAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0Zsb2F0aW5nTGlzdD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVtb3RlU2VhcmNoQ29tYm9ib3g7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU0sd0JBQXdCO0FBUzlCLElBQU0sdUJBQXVC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
