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
} from "./chunk-OO4T3BDP.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/gastos/expenseFormatters.ts
var formatAmountWithCurrency = (amount, currencyCode, locale) => {
  if (amount === null || amount === void 0 || Number.isNaN(Number(amount))) {
    return "-";
  }
  const safeLocale = locale || (typeof document !== "undefined" && document.documentElement.lang ? document.documentElement.lang : "es-ES");
  const safeCurrency = String(currencyCode || "").trim().toUpperCase();
  if (safeCurrency) {
    try {
      return new Intl.NumberFormat(safeLocale, {
        style: "currency",
        currency: safeCurrency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    } catch {
    }
  }
  const decimalText = new Intl.NumberFormat(safeLocale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
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
  return {
    lineRecId: safeText(line.RecId),
    transDate: safeText(line.TransDate),
    typeValueCode,
    typeValue: resolveTypeLabel(typeValueCode),
    description: safeText(line.Description),
    internacional: toNullableBool(line.Internacional),
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
    `/api/crm/expensesheets/${safeSheetId}/lines/0?deleteWholeSheet=true`,
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
    `/api/crm/expensesheets/${safeSheetId}/lines/${safeLineId}?deleteWholeSheet=false`,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9leHBlbnNlRm9ybWF0dGVycy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VBcGkudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlVWlVdGlscy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlUHJvamVjdEZpbHRlcklucHV0LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL1JlbW90ZVNlYXJjaENvbWJvYm94LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gRm9ybWF0cyBhIG51bWVyaWMgYW1vdW50IHVzaW5nIHRoZSBwcm92aWRlZCBjdXJyZW5jeSBjb2RlIHdoZW4gcG9zc2libGUuXG5leHBvcnQgY29uc3QgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5ID0gKFxuICBhbW91bnQ6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQsXG4gIGN1cnJlbmN5Q29kZT86IHN0cmluZyxcbiAgbG9jYWxlPzogc3RyaW5nXG4pOiBzdHJpbmcgPT4ge1xuICBpZiAoYW1vdW50ID09PSBudWxsIHx8IGFtb3VudCA9PT0gdW5kZWZpbmVkIHx8IE51bWJlci5pc05hTihOdW1iZXIoYW1vdW50KSkpIHtcbiAgICByZXR1cm4gXCItXCI7XG4gIH1cblxuICBjb25zdCBzYWZlTG9jYWxlID1cbiAgICBsb2NhbGUgfHxcbiAgICAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nXG4gICAgICA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nXG4gICAgICA6IFwiZXMtRVNcIik7XG4gIGNvbnN0IHNhZmVDdXJyZW5jeSA9IFN0cmluZyhjdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XG5cbiAgaWYgKHNhZmVDdXJyZW5jeSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KHNhZmVMb2NhbGUsIHtcbiAgICAgICAgc3R5bGU6IFwiY3VycmVuY3lcIixcbiAgICAgICAgY3VycmVuY3k6IHNhZmVDdXJyZW5jeSxcbiAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgICB9KS5mb3JtYXQoYW1vdW50KTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIEZhbGwgdGhyb3VnaCB0byBkZWNpbWFsIGZhbGxiYWNrIHdoZW4gY3VycmVuY3kgY29kZSBpcyBpbnZhbGlkLlxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRlY2ltYWxUZXh0ID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KHNhZmVMb2NhbGUsIHtcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICB9KS5mb3JtYXQoYW1vdW50KTtcblxuICByZXR1cm4gc2FmZUN1cnJlbmN5ID8gYCR7ZGVjaW1hbFRleHR9ICR7c2FmZUN1cnJlbmN5fWAgOiBkZWNpbWFsVGV4dDtcbn07XG4iLCAiaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciwgZmV0Y2hKc29uLCB0eXBlIEFwaUZldGNoT3B0aW9ucyB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgdHlwZSB7XG4gIEVudHJhQ29udGV4dER0byxcbiAgRW50cmFDb250ZXh0UmVxdWVzdCxcbiAgRXhjaGFuZ2VSYXRlRHRvLFxuICBGdWVsUHJpY2VLbUR0byxcbiAgRXhwZW5zZVNoZWV0Q2FyZCxcbiAgRXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8sXG4gIEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldENyZWF0ZVJlc3BvbnNlRGF0YSxcbiAgRXhwZW5zZVNoZWV0RGV0YWlsRHRvLFxuICBFeHBlbnNlU2hlZXRIZWFkZXIsXG4gIEV4cGVuc2VTaGVldEhlYWRlclVwZGF0ZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldExpbmUsXG4gIEV4cGVuc2VTaGVldExpbmVEdG8sXG4gIEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVzcG9uc2VEYXRhLFxuICBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8sXG4gIEluZEFwaVJlc3BvbnNlLFxuICBJbmRQYWdlZFJlc3BvbnNlLFxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5cbnR5cGUgUHJvamVjdERyb3Bkb3duUmVzcG9uc2UgPSB7XG4gIHRvdGFsPzogbnVtYmVyO1xuICBpdGVtcz86IEFycmF5PHsgdmFsdWU/OiBzdHJpbmc7IHRleHQ/OiBzdHJpbmcgfT47XG59O1xuXG50eXBlIExlZ2FjeUV4cGVuc2VMaXN0SXRlbSA9IHtcbiAgaG9qYUdhc3Rvc0lkPzogdW5rbm93bjtcbiAgZGVzY3JpcHRpb24/OiB1bmtub3duO1xuICB2b3VjaGVyPzogdW5rbm93bjtcbiAgcHJvaklkPzogdW5rbm93bjtcbiAgY3VycmVuY3lDb2RlPzogdW5rbm93bjtcbiAgdG90YWxBbW91bnQ/OiB1bmtub3duO1xuICB0b3RhbEFtb3VudE1TVD86IHVua25vd247XG4gIGV4Y2hSYXRlPzogdW5rbm93bjtcbiAgdXNlcklkPzogdW5rbm93bjtcbiAgZXhjaGFuZ2VSYXRlTW9kZT86IHVua25vd247XG4gIGV4cGVuc2VTaGVldFN0YXR1cz86IHVua25vd247XG4gIGNyZWF0ZWREYXRlPzogdW5rbm93bjtcbn07XG5cbnR5cGUgTGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZSA9IHtcbiAgc3VjY2Vzcz86IGJvb2xlYW47XG4gIG1lc3NhZ2U/OiBzdHJpbmc7XG4gIHRvdGFsPzogbnVtYmVyO1xuICBwYWdlPzogbnVtYmVyO1xuICBwYWdlU2l6ZT86IG51bWJlcjtcbiAgaXRlbXM/OiBMZWdhY3lFeHBlbnNlTGlzdEl0ZW1bXTtcbn07XG5cbnR5cGUgRXhwZW5zZUFwaUNvbnRleHQgPSB7XG4gIHRva2VuOiBzdHJpbmc7XG4gIGNvbXBhbnlJZDogc3RyaW5nO1xuICBheFVzZXJJZDogc3RyaW5nO1xuICBkZWZhdWx0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGJvb2xlYW47XG59O1xuXG50eXBlIEV4cGVuc2VBcGlBdXRoU2VlZCA9IHtcbiAgdG9rZW46IHN0cmluZztcbiAgZW50cmFPaWQ6IHN0cmluZztcbiAgYXBwQ29kZTogc3RyaW5nO1xuICBzdHJpY3RBcGlSb3V0ZXM6IGJvb2xlYW47XG59O1xuXG50eXBlIEV4cGVuc2VXaW5kb3dSdW50aW1lID0ge1xuICBfX0lORF9BUElfVE9LRU5fXz86IHN0cmluZztcbiAgX19JTkRfRU5UUkFfT0lEX18/OiBzdHJpbmc7XG4gIF9fSU5EX0FQUF9DT0RFX18/OiBzdHJpbmc7XG4gIF9fSU5EX1NFTEVDVEVEX0NPTVBBTllfXz86IHN0cmluZztcbiAgX19JTkRfRVhQRU5TRV9TVFJJQ1RfQVBJX18/OiBib29sZWFuIHwgc3RyaW5nO1xuICBfX0VYUEVOU0VfR0FTVE9fVFlQRVNfXz86IEFycmF5PHtcbiAgICB2YWx1ZT86IHVua25vd247XG4gICAgVmFsdWU/OiB1bmtub3duO1xuICAgIHRleHQ/OiB1bmtub3duO1xuICAgIFRleHQ/OiB1bmtub3duO1xuICB9Pjtcbn07XG5cbnR5cGUgRXhwZW5zZUdhc3RvVHlwZUVudHJ5ID0gTm9uTnVsbGFibGU8RXhwZW5zZVdpbmRvd1J1bnRpbWVbXCJfX0VYUEVOU0VfR0FTVE9fVFlQRVNfX1wiXT5bbnVtYmVyXTtcblxuY29uc3QgREVGQVVMVF9BUFBfQ09ERSA9IFwiQ1JNXCI7XG5jb25zdCBKU09OX0hFQURFUlM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxufTtcblxubGV0IHJ1bnRpbWVBdXRoU2VlZDogUGFydGlhbDxFeHBlbnNlQXBpQXV0aFNlZWQ+ID0ge307XG5sZXQgY2FjaGVkQ29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQgfCBudWxsID0gbnVsbDtcbmxldCBjYWNoZWRDb250ZXh0S2V5ID0gXCJcIjtcbmxldCBjb250ZXh0UHJvbWlzZTogUHJvbWlzZTxFeHBlbnNlQXBpQ29udGV4dD4gfCBudWxsID0gbnVsbDtcbmNvbnN0IGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzID0gbmV3IE1hcDxzdHJpbmcsIEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+PigpO1xuY29uc3QgcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMgPSBuZXcgTWFwPHN0cmluZywgUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj4+KCk7XG5cbmNvbnN0IHNhZmVUZXh0ID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xuICByZXR1cm4gU3RyaW5nKHZhbHVlKS50cmltKCk7XG59O1xuXG5jb25zdCB0b051bGxhYmxlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpID8gcGFyc2VkIDogbnVsbDtcbn07XG5cbmNvbnN0IGlzTm9uTmVnYXRpdmVOdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcbiAgY29uc3QgcGFyc2VkID0gdG9OdWxsYWJsZU51bWJlcih2YWx1ZSk7XG4gIHJldHVybiBwYXJzZWQgIT09IG51bGwgJiYgcGFyc2VkID49IDA7XG59O1xuXG5jb25zdCBpc1Bvc2l0aXZlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHRvTnVsbGFibGVOdW1iZXIodmFsdWUpO1xuICByZXR1cm4gcGFyc2VkICE9PSBudWxsICYmIHBhcnNlZCA+IDA7XG59O1xuXG5jb25zdCBpc1ZhbGlkTGlzdEV4cGVuc2VTaGVldFN0YXR1cyA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBwYXJzZWQgPSB0b051bGxhYmxlTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIHBhcnNlZCAhPT0gbnVsbCAmJiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgJiYgcGFyc2VkID49IDAgJiYgcGFyc2VkIDw9IDQ7XG59O1xuXG5jb25zdCB0b051bGxhYmxlQm9vbCA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gfCBudWxsID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIikgcmV0dXJuIHZhbHVlO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IHZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChub3JtYWxpemVkID09PSBcInRydWVcIiB8fCBub3JtYWxpemVkID09PSBcIjFcIikgcmV0dXJuIHRydWU7XG4gICAgaWYgKG5vcm1hbGl6ZWQgPT09IFwiZmFsc2VcIiB8fCBub3JtYWxpemVkID09PSBcIjBcIikgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICBpZiAodmFsdWUgPT09IDEpIHJldHVybiB0cnVlO1xuICAgIGlmICh2YWx1ZSA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuY29uc3QgdG9GbGFnQm9vbCA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gfCBudWxsID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZEJvb2wgPSB0b051bGxhYmxlQm9vbCh2YWx1ZSk7XG4gIGlmIChub3JtYWxpemVkQm9vbCAhPT0gbnVsbCkgcmV0dXJuIG5vcm1hbGl6ZWRCb29sO1xuXG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHJldHVybiBudWxsO1xuICBjb25zdCBub3JtYWxpemVkID0gdmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIG51bGw7XG4gIGlmIChub3JtYWxpemVkID09PSBcIm9uXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJ5ZXNcIiB8fCBub3JtYWxpemVkID09PSBcInlcIikgcmV0dXJuIHRydWU7XG4gIGlmIChub3JtYWxpemVkID09PSBcIm9mZlwiIHx8IG5vcm1hbGl6ZWQgPT09IFwibm9cIiB8fCBub3JtYWxpemVkID09PSBcIm5cIikgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IHJlYWRFeHBlbnNlV2luZG93UnVudGltZSA9ICgpOiBFeHBlbnNlV2luZG93UnVudGltZSA9PiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4ge307XG4gIHJldHVybiB3aW5kb3cgYXMgdW5rbm93biBhcyBFeHBlbnNlV2luZG93UnVudGltZTtcbn07XG5cbmNvbnN0IHNhbml0aXplSGVhZGVycyA9IChoZWFkZXJzOiBIZWFkZXJzSW5pdCB8IHVuZGVmaW5lZCk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPT4ge1xuICBpZiAoIWhlYWRlcnMpIHJldHVybiB7fTtcblxuICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICBjb25zdCByZXN1bHQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcbiAgICBoZWFkZXJzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KGhlYWRlcnMpKSB7XG4gICAgcmV0dXJuIGhlYWRlcnMucmVkdWNlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+KChhY2MsIFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgYWNjW1N0cmluZyhrZXkpXSA9IFN0cmluZyh2YWx1ZSk7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIHJldHVybiBPYmplY3QuZW50cmllcyhoZWFkZXJzKS5yZWR1Y2U8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4oKGFjYywgW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHJldHVybiBhY2M7XG4gICAgYWNjW2tleV0gPSBTdHJpbmcodmFsdWUpO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbn07XG5cbmNvbnN0IGdldEhlYWRlclZhbHVlID0gKGhlYWRlcnM6IEhlYWRlcnNJbml0IHwgdW5kZWZpbmVkLCBrZXk6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRLZXkgPSBrZXkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhzYW5pdGl6ZUhlYWRlcnMoaGVhZGVycykpO1xuICBjb25zdCBtYXRjaCA9IGVudHJpZXMuZmluZCgoW2hlYWRlcktleV0pID0+IGhlYWRlcktleS50cmltKCkudG9Mb3dlckNhc2UoKSA9PT0gbm9ybWFsaXplZEtleSk7XG4gIHJldHVybiBzYWZlVGV4dChtYXRjaD8uWzFdKTtcbn07XG5cbmNvbnN0IHJlbW92ZUhlYWRlclZhbHVlID0gKGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sIGtleTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRLZXkgPSBrZXkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IHRvRGVsZXRlID0gT2JqZWN0LmtleXMoaGVhZGVycykuZmluZCgoaGVhZGVyS2V5KSA9PiBoZWFkZXJLZXkudHJpbSgpLnRvTG93ZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRLZXkpO1xuICBpZiAoIXRvRGVsZXRlKSByZXR1cm47XG4gIGRlbGV0ZSBoZWFkZXJzW3RvRGVsZXRlXTtcbn07XG5cbmNvbnN0IHJlc29sdmVCZWFyZXJUb2tlbiA9IChoZWFkZXJzOiBIZWFkZXJzSW5pdCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGF1dGhvcml6YXRpb24gPSBnZXRIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIkF1dGhvcml6YXRpb25cIik7XG4gIGlmICghYXV0aG9yaXphdGlvbikgcmV0dXJuIFwiXCI7XG5cbiAgaWYgKC9eYmVhcmVyXFxzKy9pLnRlc3QoYXV0aG9yaXphdGlvbikpIHtcbiAgICByZXR1cm4gYXV0aG9yaXphdGlvbi5yZXBsYWNlKC9eYmVhcmVyXFxzKy9pLCBcIlwiKS50cmltKCk7XG4gIH1cblxuICByZXR1cm4gYXV0aG9yaXphdGlvbi50cmltKCk7XG59O1xuXG5jb25zdCByZWFkV2luZG93QXV0aFNlZWQgPSAoKTogUGFydGlhbDxFeHBlbnNlQXBpQXV0aFNlZWQ+ID0+IHtcbiAgY29uc3QgcnVudGltZVdpbmRvdyA9IHJlYWRFeHBlbnNlV2luZG93UnVudGltZSgpO1xuXG4gIHJldHVybiB7XG4gICAgdG9rZW46IHNhZmVUZXh0KHJ1bnRpbWVXaW5kb3cuX19JTkRfQVBJX1RPS0VOX18pLFxuICAgIGVudHJhT2lkOiBzYWZlVGV4dChydW50aW1lV2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcbiAgICBhcHBDb2RlOiBzYWZlVGV4dChydW50aW1lV2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxuICAgIHN0cmljdEFwaVJvdXRlczogdG9GbGFnQm9vbChydW50aW1lV2luZG93Ll9fSU5EX0VYUEVOU0VfU1RSSUNUX0FQSV9fKSA9PT0gdHJ1ZSxcbiAgfTtcbn07XG5cbmNvbnN0IHJlYWRSdW50aW1lU3RyaWN0QXBpRmxhZyA9ICgpOiBib29sZWFuID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgcnVudGltZVdpbmRvdyA9IHJlYWRFeHBlbnNlV2luZG93UnVudGltZSgpO1xuXG4gIGNvbnN0IGV4cGxpY2l0V2luZG93RmxhZyA9IHRvRmxhZ0Jvb2wocnVudGltZVdpbmRvdy5fX0lORF9FWFBFTlNFX1NUUklDVF9BUElfXyk7XG4gIHJldHVybiBleHBsaWNpdFdpbmRvd0ZsYWcgPT09IHRydWU7XG59O1xuXG5jb25zdCByZWFkV2luZG93U2VsZWN0ZWRDb21wYW55ID0gKCk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBzYWZlVGV4dChyZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUoKS5fX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18pLnRvVXBwZXJDYXNlKCk7XG59O1xuXG5jb25zdCBidWlsZENvbnRleHRLZXkgPSAoc2VlZDogRXhwZW5zZUFwaUF1dGhTZWVkKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGAke3NlZWQudG9rZW59fCR7c2VlZC5lbnRyYU9pZH18JHtzZWVkLmFwcENvZGV9fCR7cmVhZFdpbmRvd1NlbGVjdGVkQ29tcGFueSgpfWA7XG59O1xuXG5jb25zdCBidWlsZEV4cGVuc2VIZWFkZXJzID0gKFxuICBjb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyxcbiAgaW5jbHVkZUpzb24gPSBmYWxzZSxcbiAgaW5jbHVkZUF4VXNlcklkID0gdHJ1ZVxuKTogSGVhZGVyc0luaXQgPT4ge1xuICBjb25zdCBiYXNlID0gc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpO1xuICBjb25zdCBtZXJnZWQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7IC4uLmJhc2UgfTtcblxuICBpZiAoc2FmZVRleHQoY29udGV4dC50b2tlbikpIHtcbiAgICBtZXJnZWQuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHtjb250ZXh0LnRva2VufWA7XG4gIH1cblxuICBpZiAoc2FmZVRleHQoY29udGV4dC5jb21wYW55SWQpKSB7XG4gICAgbWVyZ2VkW1wiWC1JTkQtQ29tcGFueVwiXSA9IGNvbnRleHQuY29tcGFueUlkO1xuICB9XG5cbiAgaWYgKGluY2x1ZGVBeFVzZXJJZCAmJiBzYWZlVGV4dChjb250ZXh0LmF4VXNlcklkKSkge1xuICAgIG1lcmdlZFtcIlgtSU5ELUF4VXNlcklkXCJdID0gY29udGV4dC5heFVzZXJJZDtcbiAgfVxuXG4gIGlmIChpbmNsdWRlSnNvbikge1xuICAgIG1lcmdlZFtcIkNvbnRlbnQtVHlwZVwiXSA9IFwiYXBwbGljYXRpb24vanNvblwiO1xuICB9XG5cbiAgcmV0dXJuIG1lcmdlZDtcbn07XG5cbmNvbnN0IGJ1aWxkQ29udGV4dEhlYWRlcnMgPSAodG9rZW46IHN0cmluZywgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IEhlYWRlcnNJbml0ID0+IHtcbiAgY29uc3QgYmFzZSA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcbiAgY29uc3QgbWVyZ2VkOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgIC4uLmJhc2UsXG4gICAgLi4uSlNPTl9IRUFERVJTLFxuICB9O1xuXG4gIGlmIChzYWZlVGV4dCh0b2tlbikpIHtcbiAgICBtZXJnZWQuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICB9XG5cbiAgcmV0dXJuIG1lcmdlZDtcbn07XG5cbmNvbnN0IHJlc29sdmVBdXRoVG9rZW4gPSAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHRva2VuRnJvbUhlYWRlcnMgPSByZXNvbHZlQmVhcmVyVG9rZW4ob3B0aW9ucz8uaGVhZGVycyk7XG4gIGNvbnN0IHdpbmRvd1NlZWQgPSByZWFkV2luZG93QXV0aFNlZWQoKTtcbiAgcmV0dXJuIHNhZmVUZXh0KHRva2VuRnJvbUhlYWRlcnMgfHwgcnVudGltZUF1dGhTZWVkLnRva2VuIHx8IHdpbmRvd1NlZWQudG9rZW4pO1xufTtcblxuY29uc3QgcmVzb2x2ZUF1dGhTZWVkID0gKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBFeHBlbnNlQXBpQXV0aFNlZWQgPT4ge1xuICBjb25zdCB3aW5kb3dTZWVkID0gcmVhZFdpbmRvd0F1dGhTZWVkKCk7XG4gIGNvbnN0IHRva2VuID0gcmVzb2x2ZUF1dGhUb2tlbihvcHRpb25zKTtcbiAgY29uc3QgZW50cmFPaWQgPSBzYWZlVGV4dChydW50aW1lQXV0aFNlZWQuZW50cmFPaWQgfHwgd2luZG93U2VlZC5lbnRyYU9pZCk7XG4gIGNvbnN0IGFwcENvZGUgPSBzYWZlVGV4dChydW50aW1lQXV0aFNlZWQuYXBwQ29kZSB8fCB3aW5kb3dTZWVkLmFwcENvZGUgfHwgREVGQVVMVF9BUFBfQ09ERSkgfHwgREVGQVVMVF9BUFBfQ09ERTtcbiAgY29uc3Qgc3RyaWN0QXBpUm91dGVzID1cbiAgICB0eXBlb2YgcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcyA9PT0gXCJib29sZWFuXCJcbiAgICAgID8gcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlc1xuICAgICAgOiAod2luZG93U2VlZC5zdHJpY3RBcGlSb3V0ZXMgPT09IHRydWUpO1xuXG4gIHJldHVybiB7XG4gICAgdG9rZW4sXG4gICAgZW50cmFPaWQsXG4gICAgYXBwQ29kZSxcbiAgICBzdHJpY3RBcGlSb3V0ZXMsXG4gIH07XG59O1xuXG5jb25zdCB2YWxpZGF0ZUNvbnRleHRSZXNwb25zZSA9IChyZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFbnRyYUNvbnRleHREdG8+KTogRXhwZW5zZUFwaUNvbnRleHQgPT4ge1xuICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IFwiQ291bGQgbm90IGxvYWQgRW50cmEgY29udGV4dC5cIik7XG4gIH1cblxuICBjb25zdCBmaXJzdCA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2UuSXRlbXMpID8gcmVzcG9uc2UuSXRlbXNbMF0gOiBudWxsO1xuICBpZiAoIWZpcnN0IHx8ICFmaXJzdC5IZWFkZXIpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkNvdWxkIG5vdCBsb2FkIEVudHJhIGNvbnRleHQuXCIpO1xuICB9XG5cbiAgY29uc3QgYXhVc2VySWQgPSBzYWZlVGV4dChmaXJzdC5IZWFkZXIuQXhVc2VySWQpO1xuICBjb25zdCBkZWZhdWx0Q29tcGFueSA9IHNhZmVUZXh0KGZpcnN0LkhlYWRlci5EZWZhdWx0Q29tcGFueSk7XG4gIGNvbnN0IGRlZmF1bHRDdXJyZW5jeUNvZGUgPSBzYWZlVGV4dChmaXJzdC5IZWFkZXIuRGVmYXVsdEN1cnJlbmN5Q29kZSk7XG4gIGNvbnN0IGNvbXBhbmllcyA9IEFycmF5LmlzQXJyYXkoZmlyc3QuQ29tcGFuaWVzKSA/IGZpcnN0LkNvbXBhbmllcyA6IFtdO1xuICBjb25zdCBmYWxsYmFja0NvbXBhbnkgPSBzYWZlVGV4dChjb21wYW5pZXMuZmluZCgoaXRlbSkgPT4gaXRlbS5Jc0RlZmF1bHQpPy5Db21wYW55SWQpO1xuICBjb25zdCBjb21wYW55SWQgPSBkZWZhdWx0Q29tcGFueSB8fCBmYWxsYmFja0NvbXBhbnk7XG4gIGNvbnN0IHNlbGVjdGVkQ29tcGFueSA9IGNvbXBhbmllcy5maW5kKChpdGVtKSA9PiBzYWZlVGV4dChpdGVtLkNvbXBhbnlJZCkgPT09IGNvbXBhbnlJZCkgfHwgY29tcGFuaWVzWzBdO1xuICBjb25zdCBhbGxvd1NlbGZNYW5hZ2VtZW50ID0gc2VsZWN0ZWRDb21wYW55Py5BbGxvd1NlbGZNYW5hZ2VtZW50ID09PSB0cnVlO1xuXG4gIGlmICghYXhVc2VySWQgfHwgIWNvbXBhbnlJZCkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiQ291bGQgbm90IHJlc29sdmUgRW50cmEgY29tcGFueSBjb250ZXh0LlwiKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG9rZW46IFwiXCIsXG4gICAgY29tcGFueUlkLFxuICAgIGF4VXNlcklkLFxuICAgIGRlZmF1bHRDdXJyZW5jeUNvZGUsXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcbiAgfTtcbn07XG5cbmNvbnN0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0ID0gYXN5bmMgKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBQcm9taXNlPEV4cGVuc2VBcGlDb250ZXh0PiA9PiB7XG4gIGNvbnN0IHNlZWQgPSByZXNvbHZlQXV0aFNlZWQob3B0aW9ucyk7XG4gIGNvbnN0IGNvbnRleHRLZXkgPSBidWlsZENvbnRleHRLZXkoc2VlZCk7XG5cbiAgaWYgKGNhY2hlZENvbnRleHQgJiYgY2FjaGVkQ29udGV4dEtleSA9PT0gY29udGV4dEtleSkge1xuICAgIHJldHVybiBjYWNoZWRDb250ZXh0O1xuICB9XG5cbiAgaWYgKGNvbnRleHRQcm9taXNlICYmIGNhY2hlZENvbnRleHRLZXkgPT09IGNvbnRleHRLZXkpIHtcbiAgICByZXR1cm4gY29udGV4dFByb21pc2U7XG4gIH1cblxuICBjb25zdCBmYWxsYmFja0NvbXBhbnlJZCA9IHJlYWRXaW5kb3dTZWxlY3RlZENvbXBhbnkoKTtcbiAgaWYgKCFzYWZlVGV4dChzZWVkLmVudHJhT2lkKSAmJiBmYWxsYmFja0NvbXBhbnlJZCkge1xuICAgIGNvbnN0IGZhbGxiYWNrQ29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQgPSB7XG4gICAgICB0b2tlbjogc2VlZC50b2tlbixcbiAgICAgIGNvbXBhbnlJZDogZmFsbGJhY2tDb21wYW55SWQsXG4gICAgICBheFVzZXJJZDogXCJcIixcbiAgICAgIGRlZmF1bHRDdXJyZW5jeUNvZGU6IFwiXCIsXG4gICAgICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBnbG9iYWxUaGlzLl9fSU5EX0FMTE9XX1NFTEZfTUFOQUdFTUVOVF9fID09PSB0cnVlLFxuICAgIH07XG5cbiAgICBjYWNoZWRDb250ZXh0ID0gZmFsbGJhY2tDb250ZXh0O1xuICAgIGNhY2hlZENvbnRleHRLZXkgPSBjb250ZXh0S2V5O1xuICAgIHJldHVybiBmYWxsYmFja0NvbnRleHQ7XG4gIH1cblxuICBpZiAoIXNhZmVUZXh0KHNlZWQuZW50cmFPaWQpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJNaXNzaW5nIEVudHJhIE9JRCBmb3IgRW50cmEgY29udGV4dCByZXF1ZXN0LlwiKTtcbiAgfVxuXG4gIGNhY2hlZENvbnRleHRLZXkgPSBjb250ZXh0S2V5O1xuICBjb250ZXh0UHJvbWlzZSA9IChhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgY29udGV4dFBheWxvYWQ6IEVudHJhQ29udGV4dFJlcXVlc3QgPSB7XG4gICAgICBlbnRyYU9pZDogc2VlZC5lbnRyYU9pZCxcbiAgICAgIGFwcENvZGU6IHNlZWQuYXBwQ29kZSxcbiAgICB9O1xuXG4gICAgY29uc3QgY29udGV4dFJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RW50cmFDb250ZXh0RHRvPj4oXCIvYXBpL2F1dGgvZW50cmEvY29udGV4dFwiLCB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkQ29udGV4dEhlYWRlcnMoc2VlZC50b2tlbiwgb3B0aW9ucyksXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjb250ZXh0UGF5bG9hZCksXG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNvbHZlZCA9IHZhbGlkYXRlQ29udGV4dFJlc3BvbnNlKGNvbnRleHRSZXNwb25zZSk7XG4gICAgY29uc3QgbmV4dENvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0ID0ge1xuICAgICAgLi4ucmVzb2x2ZWQsXG4gICAgICB0b2tlbjogc2VlZC50b2tlbixcbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHdpbmRvdy5fX0lORF9BTExPV19TRUxGX01BTkFHRU1FTlRfXyA9IG5leHRDb250ZXh0LmFsbG93U2VsZk1hbmFnZW1lbnQ7XG4gICAgfVxuXG4gICAgY2FjaGVkQ29udGV4dCA9IG5leHRDb250ZXh0O1xuICAgIHJldHVybiBuZXh0Q29udGV4dDtcbiAgfSkoKTtcblxuICB0cnkge1xuICAgIHJldHVybiBhd2FpdCBjb250ZXh0UHJvbWlzZTtcbiAgfSBmaW5hbGx5IHtcbiAgICBjb250ZXh0UHJvbWlzZSA9IG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz5cbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+ID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5yZXNwb25zZSxcbiAgICBJdGVtczogQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXSxcbiAgfTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UgPSAoXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldERldGFpbER0bz5cbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0RGV0YWlsRHRvPiA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4ucmVzcG9uc2UsXG4gICAgSXRlbXM6IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW10sXG4gIH07XG59O1xuXG5jb25zdCBub3JtYWxpemVBcGlSZXNwb25zZSA9IDxUPihyZXNwb25zZTogSW5kQXBpUmVzcG9uc2U8VD4pOiBJbmRBcGlSZXNwb25zZTxUPiA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4ucmVzcG9uc2UsXG4gICAgRXJyb3JzOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5FcnJvcnMpID8gcmVzcG9uc2UuRXJyb3JzIDogcmVzcG9uc2U/LkVycm9ycyA/PyBudWxsLFxuICB9O1xufTtcblxuY29uc3Qgbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz5cbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+ID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5yZXNwb25zZSxcbiAgICBJdGVtczogQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXSxcbiAgfTtcbn07XG5cbmNvbnN0IGxvb2tzTGlrZUh0bWxEb2N1bWVudCA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xuICBjb25zdCByYXcgPSBzYWZlVGV4dCh2YWx1ZSkudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIHJhdy5zdGFydHNXaXRoKFwiPCFkb2N0eXBlIGh0bWxcIikgfHwgcmF3LnN0YXJ0c1dpdGgoXCI8aHRtbFwiKTtcbn07XG5cbmNvbnN0IGlzQXBpUm91dGVVbmF2YWlsYWJsZSA9IChlcnJvcjogdW5rbm93bik6IGVycm9yIGlzIEFwaUZldGNoRXJyb3IgPT4ge1xuICBpZiAoIShlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpKSByZXR1cm4gZmFsc2U7XG4gIGlmIChlcnJvci5zdGF0dXMgPT09IDQwNCB8fCBlcnJvci5zdGF0dXMgPT09IDQwNSkgcmV0dXJuIHRydWU7XG4gIHJldHVybiBlcnJvci5zdGF0dXMgPT09IHVuZGVmaW5lZCAmJiBsb29rc0xpa2VIdG1sRG9jdW1lbnQoZXJyb3IucmVzcG9uc2VCb2R5KTtcbn07XG5cbmNvbnN0IGlzU3RyaWN0QXBpUm91dGVzRW5hYmxlZCA9ICgpOiBib29sZWFuID0+IHtcbiAgaWYgKHR5cGVvZiBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzID09PSBcImJvb2xlYW5cIikge1xuICAgIHJldHVybiBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzO1xuICB9XG5cbiAgcmV0dXJuIHJlYWRSdW50aW1lU3RyaWN0QXBpRmxhZygpO1xufTtcblxuY29uc3Qgc2hvdWxkVXNlTGVnYWN5RmFsbGJhY2sgPSAoZXJyb3I6IHVua25vd24pOiBib29sZWFuID0+IHtcbiAgaWYgKGlzU3RyaWN0QXBpUm91dGVzRW5hYmxlZCgpKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBpc0FwaVJvdXRlVW5hdmFpbGFibGUoZXJyb3IpO1xufTtcblxuY29uc3QgdG9MZWdhY3lMaXN0UmVxdWVzdFBheWxvYWQgPSAocGF5bG9hZDogRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3QpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmaWx0ZXI6IHNhZmVUZXh0KHBheWxvYWQuZmlsdGVyKSxcbiAgICBob2phR2FzdG9zSWQ6IHNhZmVUZXh0KHBheWxvYWQuZmlsdGVyKSxcbiAgICBiaWxsZWRNb2RlOiBwYXlsb2FkLmJpbGxlZE1vZGUgPz8gMixcbiAgICBmcm9tRGF0ZTogc2FmZVRleHQocGF5bG9hZC5jcmVhdGVkRGF0ZUZyb20pLFxuICAgIHRvRGF0ZTogc2FmZVRleHQocGF5bG9hZC5jcmVhdGVkRGF0ZVRvKSxcbiAgICBwcm9qZWN0SWQ6IHNhZmVUZXh0KHBheWxvYWQucHJvaklkKSxcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KHBheWxvYWQuY3VycmVuY3lDb2RlKSxcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IGlzVmFsaWRMaXN0RXhwZW5zZVNoZWV0U3RhdHVzKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzKVxuICAgICAgPyBOdW1iZXIocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMpXG4gICAgICA6IHVuZGVmaW5lZCxcbiAgICBwYWdlOiBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZC5wYWdlKSAmJiBwYXlsb2FkLnBhZ2UgPiAwID8gcGF5bG9hZC5wYWdlIDogMSxcbiAgICBwYWdlU2l6ZTogTnVtYmVyLmlzRmluaXRlKHBheWxvYWQucGFnZVNpemUpICYmIHBheWxvYWQucGFnZVNpemUgPiAwID8gcGF5bG9hZC5wYWdlU2l6ZSA6IDUwLFxuICB9O1xufTtcblxuY29uc3QgbWFwTGVnYWN5TGlzdEl0ZW1Ub0FwaUxpc3RJdGVtID0gKGl0ZW06IExlZ2FjeUV4cGVuc2VMaXN0SXRlbSk6IEV4cGVuc2VTaGVldExpc3RJdGVtRHRvID0+IHtcbiAgcmV0dXJuIHtcbiAgICBIb2phR2FzdG9zSWQ6IHNhZmVUZXh0KGl0ZW0uaG9qYUdhc3Rvc0lkKSxcbiAgICBEZXNjcmlwdGlvbjogc2FmZVRleHQoaXRlbS5kZXNjcmlwdGlvbiksXG4gICAgRXhwZW5zZVNoZWV0U3RhdHVzOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uZXhwZW5zZVNoZWV0U3RhdHVzKSxcbiAgICBVc2VySWQ6IHNhZmVUZXh0KGl0ZW0udXNlcklkKSB8fCBudWxsLFxuICAgIFZvdWNoZXI6IHNhZmVUZXh0KGl0ZW0udm91Y2hlciksXG4gICAgUHJvaklkOiBzYWZlVGV4dChpdGVtLnByb2pJZCksXG4gICAgQ3VycmVuY3lDb2RlOiBzYWZlVGV4dChpdGVtLmN1cnJlbmN5Q29kZSksXG4gICAgVG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS50b3RhbEFtb3VudCA/PyBpdGVtLnRvdGFsQW1vdW50TVNUKSxcbiAgICBFeGNoUmF0ZTogdG9OdWxsYWJsZU51bWJlcihpdGVtLmV4Y2hSYXRlKSxcbiAgICBFeGNoYW5nZVJhdGVNb2RlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uZXhjaGFuZ2VSYXRlTW9kZSksXG4gICAgQ3JlYXRlZERhdGU6IHNhZmVUZXh0KGl0ZW0uY3JlYXRlZERhdGUpIHx8IG51bGwsXG4gIH07XG59O1xuXG5jb25zdCBtYXBMZWdhY3lMaXN0UmVzcG9uc2UgPSAoXG4gIGxlZ2FjeTogTGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZSxcbiAgZmFsbGJhY2tQYWdlOiBudW1iZXIsXG4gIGZhbGxiYWNrUGFnZVNpemU6IG51bWJlclxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz4gPT4ge1xuICBjb25zdCBsZWdhY3lJdGVtcyA9IEFycmF5LmlzQXJyYXkobGVnYWN5Py5pdGVtcykgPyBsZWdhY3kuaXRlbXMgOiBbXTtcbiAgY29uc3QgbWFwcGVkSXRlbXMgPSBsZWdhY3lJdGVtcy5tYXAoKGVudHJ5KSA9PiBtYXBMZWdhY3lMaXN0SXRlbVRvQXBpTGlzdEl0ZW0oZW50cnkpKTtcblxuICByZXR1cm4ge1xuICAgIFN1Y2Nlc3M6IGxlZ2FjeS5zdWNjZXNzICE9PSBmYWxzZSxcbiAgICBNZXNzYWdlOiBzYWZlVGV4dChsZWdhY3kubWVzc2FnZSkgfHwgXCJPS1wiLFxuICAgIFRvdGFsOiB0b051bGxhYmxlTnVtYmVyKGxlZ2FjeS50b3RhbCkgPz8gbWFwcGVkSXRlbXMubGVuZ3RoLFxuICAgIFBhZ2U6IHRvTnVsbGFibGVOdW1iZXIobGVnYWN5LnBhZ2UpID8/IGZhbGxiYWNrUGFnZSxcbiAgICBQYWdlU2l6ZTogdG9OdWxsYWJsZU51bWJlcihsZWdhY3kucGFnZVNpemUpID8/IGZhbGxiYWNrUGFnZVNpemUsXG4gICAgSXRlbXM6IG1hcHBlZEl0ZW1zLFxuICAgIFRyYWNlSWQ6IHVuZGVmaW5lZCxcbiAgfTtcbn07XG5cbmNvbnN0IHJlc29sdmVUeXBlTGFiZWwgPSAodHlwZVZhbHVlQ29kZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgaWYgKCF0eXBlVmFsdWVDb2RlIHx8IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4gdHlwZVZhbHVlQ29kZTtcbiAgfVxuXG4gIGNvbnN0IHJhd0NhdGFsb2dTb3VyY2UgPSByZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUoKS5fX0VYUEVOU0VfR0FTVE9fVFlQRVNfXztcbiAgY29uc3QgcmF3Q2F0YWxvZyA9IEFycmF5LmlzQXJyYXkocmF3Q2F0YWxvZ1NvdXJjZSkgPyByYXdDYXRhbG9nU291cmNlIDogW107XG4gIGNvbnN0IG1hdGNoID0gcmF3Q2F0YWxvZy5maW5kKChlbnRyeTogRXhwZW5zZUdhc3RvVHlwZUVudHJ5KSA9PiB7XG4gICAgY29uc3QgZW50cnlDb2RlID0gc2FmZVRleHQoZW50cnk/LnZhbHVlIHx8IGVudHJ5Py5WYWx1ZSk7XG4gICAgcmV0dXJuIGVudHJ5Q29kZSA9PT0gdHlwZVZhbHVlQ29kZTtcbiAgfSk7XG5cbiAgcmV0dXJuIHNhZmVUZXh0KG1hdGNoPy50ZXh0IHx8IG1hdGNoPy5UZXh0KSB8fCB0eXBlVmFsdWVDb2RlO1xufTtcblxuLy8gU2V0cyBydW50aW1lIGF1dGggaW5wdXRzIHVzZWQgdG8gcmVzb2x2ZSBFbnRyYSBjb250ZXh0IGFuZCBtYW5kYXRvcnkgZXhwZW5zZSBoZWFkZXJzLlxuZXhwb3J0IGNvbnN0IGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoID0gKHNlZWQ6IFBhcnRpYWw8RXhwZW5zZUFwaUF1dGhTZWVkPik6IHZvaWQgPT4ge1xuICBjb25zdCBzdHJpY3RGcm9tU2VlZCA9IHRvRmxhZ0Jvb2woc2VlZC5zdHJpY3RBcGlSb3V0ZXMpO1xuICBjb25zdCBzdHJpY3RGcm9tUnVudGltZSA9XG4gICAgdHlwZW9mIHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXMgPT09IFwiYm9vbGVhblwiID8gcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcyA6IHJlYWRSdW50aW1lU3RyaWN0QXBpRmxhZygpO1xuXG4gIHJ1bnRpbWVBdXRoU2VlZCA9IHtcbiAgICAuLi5ydW50aW1lQXV0aFNlZWQsXG4gICAgdG9rZW46IHNhZmVUZXh0KHNlZWQudG9rZW4gfHwgcnVudGltZUF1dGhTZWVkLnRva2VuKSxcbiAgICBlbnRyYU9pZDogc2FmZVRleHQoc2VlZC5lbnRyYU9pZCB8fCBydW50aW1lQXV0aFNlZWQuZW50cmFPaWQpLFxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHNlZWQuYXBwQ29kZSB8fCBydW50aW1lQXV0aFNlZWQuYXBwQ29kZSB8fCBERUZBVUxUX0FQUF9DT0RFKSxcbiAgICBzdHJpY3RBcGlSb3V0ZXM6IHN0cmljdEZyb21TZWVkID8/IHN0cmljdEZyb21SdW50aW1lLFxuICB9O1xuXG4gIGNhY2hlZENvbnRleHQgPSBudWxsO1xuICBjYWNoZWRDb250ZXh0S2V5ID0gXCJcIjtcbiAgY29udGV4dFByb21pc2UgPSBudWxsO1xuICBjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcy5jbGVhcigpO1xuICBwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5jbGVhcigpO1xufTtcblxuLy8gTWFwcyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2xpc3QgaXRlbSBjb250cmFjdCB0byBsaXN0IGNhcmQgVUkgbW9kZWwuXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmQgPSAoaXRlbTogRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8pOiBFeHBlbnNlU2hlZXRDYXJkID0+IHtcbiAgcmV0dXJuIHtcbiAgICBob2phR2FzdG9zSWQ6IHNhZmVUZXh0KGl0ZW0uSG9qYUdhc3Rvc0lkKSxcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQoaXRlbS5EZXNjcmlwdGlvbiksXG4gICAgZXhwZW5zZVNoZWV0U3RhdHVzOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uRXhwZW5zZVNoZWV0U3RhdHVzKSxcbiAgICB1c2VySWQ6IHNhZmVUZXh0KGl0ZW0uVXNlcklkKSxcbiAgICB2b3VjaGVyOiBzYWZlVGV4dChpdGVtLlZvdWNoZXIpLFxuICAgIHByb2pJZDogc2FmZVRleHQoaXRlbS5Qcm9qSWQpLFxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQoaXRlbS5DdXJyZW5jeUNvZGUpLFxuICAgIHRvdGFsQW1vdW50OiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uVG90YWxBbW91bnQpLFxuICAgIGV4Y2hSYXRlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uRXhjaFJhdGUpLFxuICAgIGV4Y2hhbmdlUmF0ZU1vZGU6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5FeGNoYW5nZVJhdGVNb2RlKSxcbiAgICBjcmVhdGVkRGF0ZTogc2FmZVRleHQoaXRlbS5DcmVhdGVkRGF0ZSksXG4gIH07XG59O1xuXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0gaGVhZGVyIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldEhlYWRlciA9IChzaGVldDogRXhwZW5zZVNoZWV0RGV0YWlsRHRvKTogRXhwZW5zZVNoZWV0SGVhZGVyID0+IHtcbiAgcmV0dXJuIHtcbiAgICBob2phR2FzdG9zSWQ6IHNhZmVUZXh0KHNoZWV0LkhvamFHYXN0b3NJZCksXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KHNoZWV0LkRlc2NyaXB0aW9uKSxcbiAgICB1c2VySWQ6IHNhZmVUZXh0KHNoZWV0LlVzZXJJZCksXG4gICAgZXhwZW5zZVNoZWV0U3RhdHVzOiB0b051bGxhYmxlTnVtYmVyKHNoZWV0LkV4cGVuc2VTaGVldFN0YXR1cyksXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChzaGVldC5DdXJyZW5jeUNvZGUpLFxuICAgIHRvdGFsQW1vdW50OiB0b051bGxhYmxlTnVtYmVyKHNoZWV0LlRvdGFsQW1vdW50KSxcbiAgICBleGNoUmF0ZTogc2FmZVRleHQoc2hlZXQuRXhjaFJhdGUpLFxuICAgIGV4Y2hhbmdlUmF0ZU1vZGU6IHRvTnVsbGFibGVOdW1iZXIoc2hlZXQuRXhjaGFuZ2VSYXRlTW9kZSksXG4gICAgcHJvaklkOiBzYWZlVGV4dChzaGVldC5Qcm9qSWQpLFxuICAgIHZvdWNoZXI6IHNhZmVUZXh0KHNoZWV0LlZvdWNoZXIpLFxuICAgIGNyZWF0ZWREYXRlOiBzYWZlVGV4dChzaGVldC5DcmVhdGVkRGF0ZSksXG4gIH07XG59O1xuXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0gbGluZSBjb250cmFjdCB0byBVSSBtb2RlbC5cbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRMaW5lID0gKGxpbmU6IEV4cGVuc2VTaGVldExpbmVEdG8pOiBFeHBlbnNlU2hlZXRMaW5lID0+IHtcbiAgY29uc3QgdHlwZVZhbHVlQ29kZSA9IHNhZmVUZXh0KGxpbmUuVHlwZVZhbHVlKTtcbiAgY29uc3QgbGVnYWN5UHJpY2UgPSAobGluZSBhcyB7IHByaWNlPzogdW5rbm93biB9KS5wcmljZTtcblxuICByZXR1cm4ge1xuICAgIGxpbmVSZWNJZDogc2FmZVRleHQobGluZS5SZWNJZCksXG4gICAgdHJhbnNEYXRlOiBzYWZlVGV4dChsaW5lLlRyYW5zRGF0ZSksXG4gICAgdHlwZVZhbHVlQ29kZSxcbiAgICB0eXBlVmFsdWU6IHJlc29sdmVUeXBlTGFiZWwodHlwZVZhbHVlQ29kZSksXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KGxpbmUuRGVzY3JpcHRpb24pLFxuICAgIGludGVybmFjaW9uYWw6IHRvTnVsbGFibGVCb29sKGxpbmUuSW50ZXJuYWNpb25hbCksXG4gICAgdGlja2V0OiB0b051bGxhYmxlQm9vbChsaW5lLlRpY2tldCksXG4gICAgcHJpY2U6IHRvTnVsbGFibGVOdW1iZXIobGluZS5QcmljZSA/PyBsZWdhY3lQcmljZSksXG4gICAgcXR5OiB0b051bGxhYmxlTnVtYmVyKGxpbmUuUXR5KSxcbiAgICBhbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIobGluZS5BbW91bnQpLFxuICAgIHByb2pJZDogc2FmZVRleHQobGluZS5Qcm9qSWQpLFxuICAgIGluZEF0dGFjaEZpbGVzOiBzYWZlVGV4dChsaW5lLkluZEF0dGFjaEZpbGVzKSxcbiAgfTtcbn07XG5cbi8vIExvYWRzIHRoZSBleHBlbnNlIHNoZWV0IGxpc3QgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2xpc3QuXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXRMaXN0ID0gYXN5bmMgKFxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldExpc3RJdGVtRHRvPj4gPT4ge1xuICBpZiAocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMgIT09IHVuZGVmaW5lZCAmJiAhaXNWYWxpZExpc3RFeHBlbnNlU2hlZXRTdGF0dXMocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleHBlbnNlU2hlZXRTdGF0dXMgbXVzdCBiZSBhbiBpbnRlZ2VyIGJldHdlZW4gMCBhbmQgNC5cIik7XG4gIH1cblxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9saXN0XCIsIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoIXNob3VsZFVzZUxlZ2FjeUZhbGxiYWNrKGVycm9yKSkge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgY29uc3QgbGVnYWN5UmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248TGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZT4oXCIvR2FzdG9zL0xpc3RFeHBlbnNlU2hlZXRzXCIsIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAuLi5zYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyksXG4gICAgICAgIC4uLkpTT05fSEVBREVSUyxcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh0b0xlZ2FjeUxpc3RSZXF1ZXN0UGF5bG9hZChwYXlsb2FkKSksXG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXBwZWQgPSBtYXBMZWdhY3lMaXN0UmVzcG9uc2UoXG4gICAgICBsZWdhY3lSZXNwb25zZSxcbiAgICAgIE51bWJlci5pc0Zpbml0ZShwYXlsb2FkLnBhZ2UpICYmIHBheWxvYWQucGFnZSA+IDAgPyBwYXlsb2FkLnBhZ2UgOiAxLFxuICAgICAgTnVtYmVyLmlzRmluaXRlKHBheWxvYWQucGFnZVNpemUpICYmIHBheWxvYWQucGFnZVNpemUgPiAwID8gcGF5bG9hZC5wYWdlU2l6ZSA6IDUwXG4gICAgKTtcblxuICAgIHJldHVybiBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZShtYXBwZWQpO1xuICB9XG59O1xuXG4vLyBMb2FkcyBvbmUgZXhwZW5zZSBzaGVldCBkZXRhaWwgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9LlxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsID0gYXN5bmMgKFxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldERldGFpbER0bz4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlU2hlZXRJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0RGV0YWlsRHRvPj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH1gLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gUmVhZHMgYXZhaWxhYmxlIGN1cnJlbmNpZXMgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2N1cnJlbmNpZXMuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVNoZWV0Q3VycmVuY2llcyA9IGFzeW5jIChcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj4gPT4ge1xuICBsZXQgY29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQgfCBudWxsID0gbnVsbDtcbiAgdHJ5IHtcbiAgICBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSkge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgY29tcGFueUlkID0gc2FmZVRleHQoY29udGV4dD8uY29tcGFueUlkIHx8IHJlYWRXaW5kb3dTZWxlY3RlZENvbXBhbnkoKSkudG9VcHBlckNhc2UoKTtcbiAgY29uc3QgY2FjaGVLZXkgPSBjb21wYW55SWQgfHwgXCItXCI7XG5cbiAgaWYgKGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLmhhcyhjYWNoZUtleSkpIHtcbiAgICByZXR1cm4gY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuZ2V0KGNhY2hlS2V5KSBhcyBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPjtcbiAgfVxuXG4gIGlmIChwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5oYXMoY2FjaGVLZXkpKSB7XG4gICAgcmV0dXJuIHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLmdldChjYWNoZUtleSkgYXMgUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj47XG4gIH1cblxuICBjb25zdCByZXF1ZXN0UHJvbWlzZSA9IChhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIkF1dGhvcml6YXRpb25cIik7XG4gICAgcmVtb3ZlSGVhZGVyVmFsdWUoaGVhZGVycywgXCJYLUlORC1BeFVzZXJJZFwiKTtcblxuICAgIGlmIChjb21wYW55SWQpIHtcbiAgICAgIGhlYWRlcnNbXCJYLUlORC1Db21wYW55XCJdID0gY29tcGFueUlkO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj4oXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL2N1cnJlbmNpZXNcIiwge1xuICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgIGhlYWRlcnMsXG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgbm9ybWFsaXplZFJlc3BvbnNlID0gbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgIGlmIChub3JtYWxpemVkUmVzcG9uc2UuU3VjY2Vzcykge1xuICAgICAgICBjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcy5zZXQoY2FjaGVLZXksIG5vcm1hbGl6ZWRSZXNwb25zZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBub3JtYWxpemVkUmVzcG9uc2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmICghc2hvdWxkVXNlTGVnYWN5RmFsbGJhY2soZXJyb3IpKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBsZWdhY3lMaXN0UmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248TGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZT4oXCIvR2FzdG9zL0xpc3RFeHBlbnNlU2hlZXRzXCIsIHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIC4uLnNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKSxcbiAgICAgICAgICAuLi5KU09OX0hFQURFUlMsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBmaWx0ZXI6IFwiXCIsXG4gICAgICAgICAgaG9qYUdhc3Rvc0lkOiBcIlwiLFxuICAgICAgICAgIGJpbGxlZE1vZGU6IDIsXG4gICAgICAgICAgZnJvbURhdGU6IFwiXCIsXG4gICAgICAgICAgdG9EYXRlOiBcIlwiLFxuICAgICAgICAgIHByb2plY3RJZDogXCJcIixcbiAgICAgICAgICBjdXJyZW5jeUNvZGU6IFwiXCIsXG4gICAgICAgICAgcGFnZTogMSxcbiAgICAgICAgICBwYWdlU2l6ZTogMjAwLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBzZWVuQ29kZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICAgIGNvbnN0IHNvdXJjZUl0ZW1zID0gQXJyYXkuaXNBcnJheShsZWdhY3lMaXN0UmVzcG9uc2UuaXRlbXMpID8gbGVnYWN5TGlzdFJlc3BvbnNlLml0ZW1zIDogW107XG4gICAgICBjb25zdCBmYWxsYmFja0l0ZW1zOiBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0b1tdID0gc291cmNlSXRlbXNcbiAgICAgICAgLm1hcCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5LmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSlcbiAgICAgICAgLmZpbHRlcigoY29kZSkgPT4gISFjb2RlKVxuICAgICAgICAuZmlsdGVyKChjb2RlKSA9PiB7XG4gICAgICAgICAgaWYgKHNlZW5Db2Rlcy5oYXMoY29kZSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICBzZWVuQ29kZXMuYWRkKGNvZGUpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KVxuICAgICAgICAubWFwKChjb2RlKSA9PiAoe1xuICAgICAgICAgIEN1cnJlbmN5Q29kZTogY29kZSxcbiAgICAgICAgICBDdXJyZW5jeUNvZGVJU086IGNvZGUsXG4gICAgICAgIH0pKTtcblxuICAgICAgY29uc3QgZmFsbGJhY2tSZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4gPSB7XG4gICAgICAgIFN1Y2Nlc3M6IGxlZ2FjeUxpc3RSZXNwb25zZS5zdWNjZXNzICE9PSBmYWxzZSxcbiAgICAgICAgTWVzc2FnZTogc2FmZVRleHQobGVnYWN5TGlzdFJlc3BvbnNlLm1lc3NhZ2UpIHx8IFwiT0tcIixcbiAgICAgICAgVG90YWw6IGZhbGxiYWNrSXRlbXMubGVuZ3RoLFxuICAgICAgICBQYWdlOiAxLFxuICAgICAgICBQYWdlU2l6ZTogZmFsbGJhY2tJdGVtcy5sZW5ndGgsXG4gICAgICAgIEl0ZW1zOiBmYWxsYmFja0l0ZW1zLFxuICAgICAgICBUcmFjZUlkOiB1bmRlZmluZWQsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBub3JtYWxpemVkRmFsbGJhY2sgPSBub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2UoZmFsbGJhY2tSZXNwb25zZSk7XG4gICAgICBpZiAobm9ybWFsaXplZEZhbGxiYWNrLlN1Y2Nlc3MpIHtcbiAgICAgICAgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuc2V0KGNhY2hlS2V5LCBub3JtYWxpemVkRmFsbGJhY2spO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbm9ybWFsaXplZEZhbGxiYWNrO1xuICAgIH1cbiAgfSkoKTtcblxuICBwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5zZXQoY2FjaGVLZXksIHJlcXVlc3RQcm9taXNlKTtcbiAgdHJ5IHtcbiAgICByZXR1cm4gYXdhaXQgcmVxdWVzdFByb21pc2U7XG4gIH0gZmluYWxseSB7XG4gICAgcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuZGVsZXRlKGNhY2hlS2V5KTtcbiAgfVxufTtcblxuLy8gRXhwb3NlcyB0aGUgZGVmYXVsdCBjdXJyZW5jeSByZXNvbHZlZCBmcm9tIEVudHJhIGNvbnRleHQgZm9yIGluaXRpYWwgc2VsZWN0aW9ucy5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlID0gYXN5bmMgKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgICByZXR1cm4gc2FmZVRleHQoY29udGV4dC5kZWZhdWx0Q3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfVxufTtcblxuLy8gUmVhZHMgZXhjaGFuZ2UgcmF0ZSBmcm9tIC9hcGkvc3lzdGVtL2V4Y2hhbmdlLXJhdGUuXG5leHBvcnQgY29uc3QgZ2V0RXhjaGFuZ2VSYXRlID0gYXN5bmMgKFxuICBiYXNlQ3VycmVuY3k6IHN0cmluZyxcbiAgdGFyZ2V0Q3VycmVuY3k6IHN0cmluZyxcbiAgZGF0ZT86IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeGNoYW5nZVJhdGVEdG8+PiA9PiB7XG4gIGNvbnN0IHRva2VuID0gcmVzb2x2ZUF1dGhUb2tlbihvcHRpb25zKTtcbiAgY29uc3Qgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSA9IHNhZmVUZXh0KGJhc2VDdXJyZW5jeSkudG9VcHBlckNhc2UoKTtcbiAgY29uc3Qgbm9ybWFsaXplZFRhcmdldEN1cnJlbmN5ID0gc2FmZVRleHQodGFyZ2V0Q3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWREYXRlID0gc2FmZVRleHQoZGF0ZSk7XG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuXG4gIHF1ZXJ5LnNldChcImJhc2VDdXJyZW5jeVwiLCBub3JtYWxpemVkQmFzZUN1cnJlbmN5KTtcbiAgcXVlcnkuc2V0KFwidGFyZ2V0Q3VycmVuY3lcIiwgbm9ybWFsaXplZFRhcmdldEN1cnJlbmN5KTtcbiAgaWYgKG5vcm1hbGl6ZWREYXRlKSB7XG4gICAgcXVlcnkuc2V0KFwiZGF0ZVwiLCBub3JtYWxpemVkRGF0ZSk7XG4gIH1cblxuICBjb25zdCBoZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpO1xuICBpZiAodG9rZW4pIHtcbiAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7dG9rZW59YDtcbiAgfVxuXG4gIHJldHVybiBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhjaGFuZ2VSYXRlRHRvPj4oYC9hcGkvc3lzdGVtL2V4Y2hhbmdlLXJhdGU/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICBoZWFkZXJzLFxuICB9KTtcbn07XG5cbi8vIFJlYWRzIGZ1ZWwgcHJpY2UgcGVyIGttIGZyb20gL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9mdWVsLXByaWNlLWttLlxuZXhwb3J0IGNvbnN0IGdldEZ1ZWxQcmljZUttID0gYXN5bmMgKFxuICB0cmFuc0RhdGU6IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxGdWVsUHJpY2VLbUR0bz4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBub3JtYWxpemVkRGF0ZSA9IHNhZmVUZXh0KHRyYW5zRGF0ZSk7XG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuXG4gIHF1ZXJ5LnNldChcInRyYW5zRGF0ZVwiLCBub3JtYWxpemVkRGF0ZSk7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RnVlbFByaWNlS21EdG8+PihcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9mdWVsLXByaWNlLWttPyR7cXVlcnkudG9TdHJpbmcoKX1gLFxuICAgIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxuICAgIH1cbiAgKTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gQ3JlYXRlcyBhbiBleHBlbnNlIHNoZWV0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMuXG5leHBvcnQgY29uc3QgY3JlYXRlRXhwZW5zZVNoZWV0ID0gYXN5bmMgKFxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldENyZWF0ZVJlc3BvbnNlRGF0YT4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBtb2RlID0gcGF5bG9hZC5tb2RlID8/IDA7XG4gIGNvbnN0IGxpbmVzID0gQXJyYXkuaXNBcnJheShwYXlsb2FkLmxpbmVzKSA/IHBheWxvYWQubGluZXMgOiBbXTtcbiAgY29uc3QgaGFzSW52YWxpZExpbmVQYXlsb2FkID0gbGluZXMuc29tZSgobGluZSkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAhc2FmZVRleHQobGluZS50cmFuc0RhdGUpIHx8XG4gICAgICAhTnVtYmVyLmlzSW50ZWdlcihOdW1iZXIobGluZS50eXBlVmFsdWUpKSB8fFxuICAgICAgTnVtYmVyKGxpbmUudHlwZVZhbHVlKSA8PSAwIHx8XG4gICAgICAhaXNQb3NpdGl2ZU51bWJlcihsaW5lLnF0eSkgfHxcbiAgICAgICFpc1Bvc2l0aXZlTnVtYmVyKGxpbmUucHJpY2UpXG4gICAgKTtcbiAgfSk7XG5cbiAgaWYgKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzICE9PSB1bmRlZmluZWQgJiYgIWlzTm9uTmVnYXRpdmVOdW1iZXIocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleHBlbnNlU2hlZXRTdGF0dXMgbXVzdCBiZSBncmVhdGVyIG9yIGVxdWFsIHRvIDAuXCIpO1xuICB9XG5cbiAgaWYgKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSAhPT0gdW5kZWZpbmVkICYmICFpc05vbk5lZ2F0aXZlTnVtYmVyKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSkpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4Y2hhbmdlUmF0ZU1vZGUgbXVzdCBiZSBncmVhdGVyIG9yIGVxdWFsIHRvIDAuXCIpO1xuICB9XG5cbiAgaWYgKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSAhPT0gdW5kZWZpbmVkICYmIHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4Y2hhbmdlUmF0ZU1vZGUgcmVxdWlyZXMgZXhwZW5zZVNoZWV0U3RhdHVzLlwiKTtcbiAgfVxuXG4gIGlmIChoYXNJbnZhbGlkTGluZVBheWxvYWQpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkVhY2ggbGluZSByZXF1aXJlcyB0cmFuc0RhdGUsIHR5cGVWYWx1ZSwgcXR5ID4gMCBhbmQgcHJpY2UgPiAwLlwiKTtcbiAgfVxuXG4gIGlmIChtb2RlID09PSAwKSB7XG4gICAgaWYgKCFzYWZlVGV4dChwYXlsb2FkLmRlc2NyaXB0aW9uKSB8fCAhc2FmZVRleHQocGF5bG9hZC5jdXJyZW5jeUNvZGUpIHx8IGxpbmVzLmxlbmd0aCA8IDEpIHtcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiSW52YWxpZCBjcmVhdGUgcGF5bG9hZCBmb3IgbW9kZSAwLlwiKTtcbiAgICB9XG4gIH1cblxuICBpZiAobW9kZSA9PT0gMSkge1xuICAgIGlmICghc2FmZVRleHQocGF5bG9hZC5kZXNjcmlwdGlvbikgfHwgIXNhZmVUZXh0KHBheWxvYWQuY3VycmVuY3lDb2RlKSkge1xuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJJbnZhbGlkIGNyZWF0ZSBwYXlsb2FkIGZvciBtb2RlIDEuXCIpO1xuICAgIH1cblxuICAgIGlmIChsaW5lcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIk1vZGUgMSByZXF1aXJlcyBsaW5lcyB0byBiZSBudWxsIG9yIGVtcHR5LlwiKTtcbiAgICB9XG4gIH1cblxuICBpZiAobW9kZSA9PT0gMikge1xuICAgIGlmICghc2FmZVRleHQocGF5bG9hZC5leGlzdGluZ0hvamFHYXN0b3NJZCkgfHwgbGluZXMubGVuZ3RoIDwgMSkge1xuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJJbnZhbGlkIGNyZWF0ZSBwYXlsb2FkIGZvciBtb2RlIDIuXCIpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG5vcm1hbGl6ZWRQYXlsb2FkOiBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0ID0ge1xuICAgIC4uLnBheWxvYWQsXG4gICAgbW9kZSxcbiAgICBleGlzdGluZ0hvamFHYXN0b3NJZDogc2FmZVRleHQocGF5bG9hZC5leGlzdGluZ0hvamFHYXN0b3NJZCkgfHwgdW5kZWZpbmVkLFxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChwYXlsb2FkLmRlc2NyaXB0aW9uKSB8fCB1bmRlZmluZWQsXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChwYXlsb2FkLmN1cnJlbmN5Q29kZSkgfHwgdW5kZWZpbmVkLFxuICAgIHByb2pJZDogc2FmZVRleHQocGF5bG9hZC5wcm9qSWQpIHx8IHVuZGVmaW5lZCxcbiAgICBsaW5lczogbW9kZSA9PT0gMSA/IFtdIDogbGluZXMsXG4gIH07XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3JlYXRlUmVzcG9uc2VEYXRhPj4oXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzXCIsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShub3JtYWxpemVkUGF5bG9hZCksXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBVcGRhdGVzIGhlYWRlciBmaWVsZHMgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS5cbmV4cG9ydCBjb25zdCB1cGRhdGVFeHBlbnNlU2hlZXRIZWFkZXIgPSBhc3luYyAoXG4gIGhvamFHYXN0b3NJZDogc3RyaW5nLFxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPHsgSG9qYUdhc3Rvc0lkOiBzdHJpbmcgfT4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlU2hlZXRJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSk7XG5cbiAgaWYgKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzICE9PSB1bmRlZmluZWQgJiYgIWlzTm9uTmVnYXRpdmVOdW1iZXIocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleHBlbnNlU2hlZXRTdGF0dXMgbXVzdCBiZSBncmVhdGVyIG9yIGVxdWFsIHRvIDAuXCIpO1xuICB9XG5cbiAgaWYgKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSAhPT0gdW5kZWZpbmVkICYmICFpc05vbk5lZ2F0aXZlTnVtYmVyKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSkpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4Y2hhbmdlUmF0ZU1vZGUgbXVzdCBiZSBncmVhdGVyIG9yIGVxdWFsIHRvIDAuXCIpO1xuICB9XG5cbiAgaWYgKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSAhPT0gdW5kZWZpbmVkICYmIHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4Y2hhbmdlUmF0ZU1vZGUgcmVxdWlyZXMgZXhwZW5zZVNoZWV0U3RhdHVzLlwiKTtcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPHsgSG9qYUdhc3Rvc0lkOiBzdHJpbmcgfT4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9YCwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBEZWxldGVzIGEgZnVsbCBleHBlbnNlIHNoZWV0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0vbGluZXMvMD9kZWxldGVXaG9sZVNoZWV0PXRydWUuXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0ID0gYXN5bmMgKFxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxudWxsPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8bnVsbD4+KFxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9L2xpbmVzLzA/ZGVsZXRlV2hvbGVTaGVldD10cnVlYCxcbiAgICB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIFVwZGF0ZXMgb25lIGV4cGVuc2UgbGluZSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9L2xpbmVzL3tsaW5lUmVjSWR9LlxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4cGVuc2VTaGVldExpbmUgPSBhc3luYyAoXG4gIGhvamFHYXN0b3NJZDogc3RyaW5nLFxuICBsaW5lUmVjSWQ6IHN0cmluZyxcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlcXVlc3QsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlc3BvbnNlRGF0YT4+ID0+IHtcbiAgaWYgKFxuICAgICFzYWZlVGV4dChwYXlsb2FkLnRyYW5zRGF0ZSkgfHxcbiAgICAhTnVtYmVyLmlzSW50ZWdlcihOdW1iZXIocGF5bG9hZC50eXBlVmFsdWUpKSB8fFxuICAgIE51bWJlcihwYXlsb2FkLnR5cGVWYWx1ZSkgPD0gMCB8fFxuICAgICFpc1Bvc2l0aXZlTnVtYmVyKHBheWxvYWQucXR5KSB8fFxuICAgICFpc1Bvc2l0aXZlTnVtYmVyKHBheWxvYWQucHJpY2UpXG4gICkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwidHJhbnNEYXRlLCB0eXBlVmFsdWUsIHF0eSA+IDAgYW5kIHByaWNlID4gMCBhcmUgcmVxdWlyZWQuXCIpO1xuICB9XG5cbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlU2hlZXRJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHNhZmVMaW5lSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGxpbmVSZWNJZCB8fCBcIlwiKS50cmltKCkpO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXNwb25zZURhdGE+PihcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy8ke3NhZmVTaGVldElkfS9saW5lcy8ke3NhZmVMaW5lSWR9YCxcbiAgICB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxuICAgIH1cbiAgKTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gRGVsZXRlcyBvbmUgZXhwZW5zZSBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0vbGluZXMve2xpbmVSZWNJZH0/ZGVsZXRlV2hvbGVTaGVldD1mYWxzZS5cbmV4cG9ydCBjb25zdCBkZWxldGVFeHBlbnNlU2hlZXRMaW5lID0gYXN5bmMgKFxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcbiAgbGluZVJlY0lkOiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlU2hlZXRJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHNhZmVMaW5lSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGxpbmVSZWNJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxudWxsPj4oXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH0vbGluZXMvJHtzYWZlTGluZUlkfT9kZWxldGVXaG9sZVNoZWV0PWZhbHNlYCxcbiAgICB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIFNlYXJjaGVzIHByb2plY3RzIGZvciBkcm9wZG93biB1c2FnZSBpbiBmaWx0ZXJzIGFuZCBlZGl0IGZvcm1zLlxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVByb2plY3RzID0gYXN5bmMgKFxuICB0ZXJtOiBzdHJpbmcsXG4gIHBhZ2U6IG51bWJlcixcbiAgcGFnZVNpemU6IG51bWJlcixcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxQcm9qZWN0RHJvcGRvd25SZXNwb25zZT4gPT4ge1xuICBjb25zdCBzYWZlVGVybSA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcodGVybSB8fCBcIlwiKSk7XG4gIGNvbnN0IHNhZmVQYWdlID0gTnVtYmVyLmlzRmluaXRlKHBhZ2UpICYmIHBhZ2UgPiAwID8gTWF0aC5mbG9vcihwYWdlKSA6IDE7XG4gIGNvbnN0IHNhZmVQYWdlU2l6ZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlU2l6ZSkgJiYgcGFnZVNpemUgPiAwID8gTWF0aC5mbG9vcihwYWdlU2l6ZSkgOiAyMDtcblxuICByZXR1cm4gZmV0Y2hKc29uPFByb2plY3REcm9wZG93blJlc3BvbnNlPihcbiAgICBgL0dhc3Rvcy9HZXRQcm9qZWN0c0ZvckRyb3Bkb3duP3Rlcm09JHtzYWZlVGVybX0mcGFnZT0ke3NhZmVQYWdlfSZwYWdlU2l6ZT0ke3NhZmVQYWdlU2l6ZX1gLFxuICAgIHtcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgfVxuICApO1xufTtcbiIsICJleHBvcnQgdHlwZSBFeHBlbnNlRGF0ZVBhcnRzID0ge1xuICB5ZWFyOiBzdHJpbmc7XG4gIG1vbnRoOiBzdHJpbmc7XG4gIGRheTogc3RyaW5nO1xufTtcblxuY29uc3QgQkFTUVVFX01PTlRIU19TSE9SVCA9IFtcbiAgXCJ1cnRcIixcbiAgXCJvdHNcIixcbiAgXCJtYXJcIixcbiAgXCJhcGlcIixcbiAgXCJtYWlcIixcbiAgXCJla2FcIixcbiAgXCJ1enRcIixcbiAgXCJhYnVcIixcbiAgXCJpcmFcIixcbiAgXCJ1cnJcIixcbiAgXCJhemFcIixcbiAgXCJhYmVcIixcbl07XG5cbmNvbnN0IG5vcm1hbGl6ZVVpTG9jYWxlID0gKGxvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcobG9jYWxlIHx8IFwiXCIpLnRyaW0oKTtcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiZXMtRVNcIjtcbiAgaWYgKC9eemgtaGFucy9pLnRlc3QodmFsdWUpKSByZXR1cm4gXCJ6aC1DTlwiO1xuICByZXR1cm4gdmFsdWU7XG59O1xuXG5jb25zdCBpc0Jhc3F1ZUxvY2FsZSA9IChsb2NhbGU6IHN0cmluZyk6IGJvb2xlYW4gPT4gL15ldVxcYi9pLnRlc3QoU3RyaW5nKGxvY2FsZSB8fCBcIlwiKSk7XG5cbi8vIE5vcm1hbGl6ZSB1bmtub3duIHZhbHVlcyB0byBhIHRyaW1tZWQgc3RyaW5nLlxuZXhwb3J0IGNvbnN0IHNhZmVUZXh0ID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xuICByZXR1cm4gU3RyaW5nKHZhbHVlKS50cmltKCk7XG59O1xuXG4vLyBOb3JtYWxpemVzIGNhcmQgdGl0bGUgdGV4dCBvbmx5IHdoZW4gaXQgY29tZXMgaW4gZnVsbCB1cHBlciBvciBmdWxsIGxvd2VyIGNhc2UuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplQ2FyZFRpdGxlVGV4dCA9ICh2YWx1ZTogdW5rbm93biwgZmFsbGJhY2sgPSBcIi1cIik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHNvdXJjZSA9IHNhZmVUZXh0KHZhbHVlKTtcbiAgaWYgKCFzb3VyY2UpIHJldHVybiBmYWxsYmFjaztcblxuICBjb25zdCBoYXNMZXR0ZXJzID0gL1tBLVphLXpcdTAwQzAtXHUwMEQ2XHUwMEQ4LVx1MDBGNlx1MDBGOC1cdTAwRkZdLy50ZXN0KHNvdXJjZSk7XG4gIGlmICghaGFzTGV0dGVycykgcmV0dXJuIHNvdXJjZTtcblxuICBjb25zdCBpc0FsbFVwcGVyID0gc291cmNlID09PSBzb3VyY2UudG9VcHBlckNhc2UoKSAmJiBzb3VyY2UgIT09IHNvdXJjZS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBpc0FsbExvd2VyID0gc291cmNlID09PSBzb3VyY2UudG9Mb3dlckNhc2UoKSAmJiBzb3VyY2UgIT09IHNvdXJjZS50b1VwcGVyQ2FzZSgpO1xuICBpZiAoIWlzQWxsVXBwZXIgJiYgIWlzQWxsTG93ZXIpIHtcbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgY29uc3QgbG93ZXIgPSBzb3VyY2UudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIGAke2xvd2VyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpfSR7bG93ZXIuc2xpY2UoMSl9YDtcbn07XG5cbi8vIFJldHVybnMgdHJ1ZSBvbmx5IHdoZW4gdm91Y2hlciBoYXMgYSBtZWFuaW5nZnVsIGFzc2lnbmVkIHZhbHVlLlxuZXhwb3J0IGNvbnN0IGhhc0Fzc2lnbmVkVm91Y2hlciA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xuICBjb25zdCB2b3VjaGVyID0gc2FmZVRleHQodmFsdWUpLnRvVXBwZXJDYXNlKCk7XG4gIGlmICghdm91Y2hlcikgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gdm91Y2hlciAhPT0gXCItXCIgJiYgdm91Y2hlciAhPT0gXCIuXCIgJiYgdm91Y2hlciAhPT0gXCIwXCI7XG59O1xuXG4vLyBSZXR1cm4gZGF0ZSBhdCBsb2NhbCBkYXkgc3RhcnQuXG5leHBvcnQgY29uc3Qgc3RhcnRPZkRheSA9IChkYXRlOiBEYXRlKTogRGF0ZSA9PiB7XG4gIHJldHVybiBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpO1xufTtcblxuLy8gRm9ybWF0IGxvY2FsIGRhdGUgdG8geXl5eS1NTS1kZC5cbmV4cG9ydCBjb25zdCB0b0lzb0RhdGUgPSAoZGF0ZTogRGF0ZSk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBgJHtkYXRlLmdldEZ1bGxZZWFyKCl9LSR7U3RyaW5nKGRhdGUuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKX0tJHtTdHJpbmcoZGF0ZS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKX1gO1xufTtcblxuLy8gUGFyc2Ugc3VwcG9ydGVkIEFQSSBkYXRlIGZvcm1hdHMuXG5leHBvcnQgY29uc3QgcGFyc2VFeHBlbnNlRGF0ZSA9IChyYXc/OiBzdHJpbmcpOiBEYXRlIHwgbnVsbCA9PiB7XG4gIGlmICghcmF3KSByZXR1cm4gbnVsbDtcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcocmF3KS50cmltKCk7XG4gIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGRhdGVPbmx5ID0gdmFsdWUuc3BsaXQoXCJUXCIpWzBdLnNwbGl0KFwiIFwiKVswXTtcblxuICBpZiAoL15cXGR7Mn1bLi8tXVxcZHsyfVsuLy1dXFxkezR9JC8udGVzdChkYXRlT25seSkpIHtcbiAgICBjb25zdCBbZGF5LCBtb250aCwgeWVhcl0gPSBkYXRlT25seS5zcGxpdCgvWy4vLV0vKS5tYXAoTnVtYmVyKTtcbiAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xuICB9XG5cbiAgaWYgKC9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KGRhdGVPbmx5KSkge1xuICAgIGNvbnN0IFt5ZWFyLCBtb250aCwgZGF5XSA9IGRhdGVPbmx5LnNwbGl0KFwiLVwiKS5tYXAoTnVtYmVyKTtcbiAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xuICB9XG5cbiAgaWYgKC9eXFxkezR9Wy4vLV1cXGR7Mn1bLi8tXVxcZHsyfSQvLnRlc3QoZGF0ZU9ubHkpKSB7XG4gICAgY29uc3QgW3llYXIsIG1vbnRoLCBkYXldID0gZGF0ZU9ubHkuc3BsaXQoL1suLy1dLykubWFwKE51bWJlcik7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcbiAgfVxuXG4gIGlmICgvXlxcZHs4fSQvLnRlc3QoZGF0ZU9ubHkpKSB7XG4gICAgY29uc3QgeWVhciA9IE51bWJlcihkYXRlT25seS5zbGljZSgwLCA0KSk7XG4gICAgY29uc3QgbW9udGggPSBOdW1iZXIoZGF0ZU9ubHkuc2xpY2UoNCwgNikpO1xuICAgIGNvbnN0IGRheSA9IE51bWJlcihkYXRlT25seS5zbGljZSg2LCA4KSk7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcbiAgfVxuXG4gIGNvbnN0IHBhcnNlZCA9IG5ldyBEYXRlKHZhbHVlKTtcbiAgcmV0dXJuIE51bWJlci5pc05hTihwYXJzZWQuZ2V0VGltZSgpKSA/IG51bGwgOiBwYXJzZWQ7XG59O1xuXG4vLyBGb3JtYXQgYSBkYXRlIGZvciByZWFkLW9ubHkgZmllbGRzIHVzaW5nIHRoZSBzYW1lIG91dHB1dCBzdHlsZSBhcyB2aXNpdHMuXG5leHBvcnQgY29uc3QgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlID0gKHJhdz86IHN0cmluZywgbG9jYWxlID0gXCJlcy1FU1wiLCBmYWxsYmFjayA9IFwiLVwiKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZGF0ZSA9IHBhcnNlRXhwZW5zZURhdGUocmF3KTtcbiAgaWYgKCFkYXRlKSByZXR1cm4gZmFsbGJhY2s7XG5cbiAgY29uc3Qgc2FmZUxvY2FsZSA9IG5vcm1hbGl6ZVVpTG9jYWxlKGxvY2FsZSk7XG4gIGlmIChpc0Jhc3F1ZUxvY2FsZShzYWZlTG9jYWxlKSkge1xuICAgIHJldHVybiBgJHtkYXRlLmdldERhdGUoKX0gJHtCQVNRVUVfTU9OVEhTX1NIT1JUW2RhdGUuZ2V0TW9udGgoKV19ICR7ZGF0ZS5nZXRGdWxsWWVhcigpfWAudG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIHJldHVybiBkYXRlXG4gICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhzYWZlTG9jYWxlLCB7XG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxuICAgICAgbW9udGg6IFwic2hvcnRcIixcbiAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxuICAgIH0pXG4gICAgLnJlcGxhY2UoL1xcLi9nLCBcIlwiKVxuICAgIC50b0xvd2VyQ2FzZSgpO1xufTtcblxuLy8gQnVpbGQgdGltZWxpbmUgZGF0ZSBmcmFnbWVudHMgZm9yIGNhcmQgbGVmdCBwYW5lbC5cbmV4cG9ydCBjb25zdCBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzID0gKHJhdz86IHN0cmluZywgbG9jYWxlID0gXCJlcy1FU1wiKTogRXhwZW5zZURhdGVQYXJ0cyA9PiB7XG4gIGNvbnN0IGRhdGUgPSBwYXJzZUV4cGVuc2VEYXRlKHJhdyk7XG4gIGlmICghZGF0ZSkge1xuICAgIHJldHVybiB7IHllYXI6IFwiXCIsIG1vbnRoOiBcIlwiLCBkYXk6IFwiLS1cIiB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB5ZWFyOiBTdHJpbmcoZGF0ZS5nZXRGdWxsWWVhcigpKSxcbiAgICBtb250aDogZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7IG1vbnRoOiBcInNob3J0XCIgfSkucmVwbGFjZSgvXFwuL2csIFwiXCIpLnRvVXBwZXJDYXNlKCksXG4gICAgZGF5OiBTdHJpbmcoZGF0ZS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKSxcbiAgfTtcbn07XG4iLCAidHlwZSBOYXZpZ2F0ZVdpdGhHdWFyZE9wdGlvbnMgPSB7XG4gIGFza0NvbmZpcm1hdGlvbj86IGJvb2xlYW47XG4gIGJ5cGFzc0d1YXJkT25jZT86IGJvb2xlYW47XG4gIG1lc3NhZ2U/OiBzdHJpbmc7XG59O1xuXG4vLyBVcGRhdGVzIHRoZSBnbG9iYWwgbmF2aWdhdGlvbiBndWFyZCBsaWZlY3ljbGUgZm9yIGFjdGl2ZSBlZGl0IHByb2Nlc3Nlcy5cbmV4cG9ydCBjb25zdCBzZXRFeHBlbnNlTmF2aWdhdGlvbkd1YXJkID0gKGFjdGl2ZTogYm9vbGVhbik6IHZvaWQgPT4ge1xuICB3aW5kb3cuX19pbmRTZXROYXZpZ2F0aW9uR3VhcmQ/LihhY3RpdmUpO1xufTtcblxuLy8gQ2xlYXJzIGdsb2JhbCBuYXZpZ2F0aW9uIGd1YXJkIGZsYWdzIHdoZW4gY29tcG9uZW50IHVubW91bnRzLlxuZXhwb3J0IGNvbnN0IGNsZWFyRXhwZW5zZU5hdmlnYXRpb25HdWFyZCA9ICgpOiB2b2lkID0+IHtcbiAgd2luZG93Ll9faW5kQ2xlYXJOYXZpZ2F0aW9uR3VhcmQ/LigpO1xufTtcblxuLy8gRXhlY3V0ZXMgbmF2aWdhdGlvbiBhY3Rpb24gdGhyb3VnaCBzaXRlIGd1YXJkIGlmIGF2YWlsYWJsZS5cbmV4cG9ydCBjb25zdCBydW5HdWFyZGVkTmF2aWdhdGlvbiA9IChcbiAgYWN0aW9uOiAoKSA9PiB2b2lkLFxuICBvcHRpb25zOiBOYXZpZ2F0ZVdpdGhHdWFyZE9wdGlvbnMgPSB7fVxuKTogdm9pZCA9PiB7XG4gIGNvbnN0IHsgYXNrQ29uZmlybWF0aW9uID0gZmFsc2UsIG1lc3NhZ2UgfSA9IG9wdGlvbnM7XG4gIGlmIChhc2tDb25maXJtYXRpb24gJiYgdHlwZW9mIHdpbmRvdy5fX2luZFJlcXVlc3ROYXZpZ2F0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB3aW5kb3cuX19pbmRSZXF1ZXN0TmF2aWdhdGlvbihhY3Rpb24sIG1lc3NhZ2UpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGFjdGlvbigpO1xufTtcblxuLy8gTmF2aWdhdGVzIHRvIHRhcmdldCBVUkwgYW5kIGtlZXBzIHNpdGUtbGV2ZWwgZ3VhcmQgYmVoYXZpb3IgY29uc2lzdGVudC5cbmV4cG9ydCBjb25zdCBuYXZpZ2F0ZVRvRXhwZW5zZVVybCA9IChcbiAgdGFyZ2V0VXJsOiBzdHJpbmcsXG4gIG9wdGlvbnM6IE5hdmlnYXRlV2l0aEd1YXJkT3B0aW9ucyA9IHt9XG4pOiB2b2lkID0+IHtcbiAgY29uc3Qgc2FmZVVybCA9IFN0cmluZyh0YXJnZXRVcmwgfHwgXCJcIikudHJpbSgpO1xuICBpZiAoIXNhZmVVcmwpIHJldHVybjtcblxuICBjb25zdCB7IGJ5cGFzc0d1YXJkT25jZSA9IHRydWUgfSA9IG9wdGlvbnM7XG4gIHJ1bkd1YXJkZWROYXZpZ2F0aW9uKCgpID0+IHtcbiAgICBpZiAoYnlwYXNzR3VhcmRPbmNlKSB7XG4gICAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcbiAgICB9XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBzYWZlVXJsO1xuICB9LCBvcHRpb25zKTtcbn07XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgUmVtb3RlU2VhcmNoQ29tYm9ib3gsIHsgdHlwZSBSZW1vdGVTZWFyY2hPcHRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1JlbW90ZVNlYXJjaENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlUHJvamVjdHMgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xuXG50eXBlIEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXRQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICByZWFkT25seT86IGJvb2xlYW47XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcbn07XG5cbmNvbnN0IFNFQVJDSF9QQUdFX1NJWkUgPSAyMDtcblxuY29uc3QgbWFwUHJvamVjdE9wdGlvbnMgPSAoaXRlbXM6IEFycmF5PHsgdmFsdWU/OiBzdHJpbmc7IHRleHQ/OiBzdHJpbmcgfT4gfCB1bmRlZmluZWQpOiBSZW1vdGVTZWFyY2hPcHRpb25bXSA9PiB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheShpdGVtcykgPyBpdGVtcyA6IFtdKVxuICAgIC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlVGV4dCA9IFN0cmluZyhpdGVtPy52YWx1ZSB8fCBcIlwiKS50cmltKCk7XG4gICAgICBpZiAoIXZhbHVlVGV4dCkgcmV0dXJuIG51bGw7XG4gICAgICBjb25zdCBzdWJ0aXRsZSA9IFN0cmluZyhpdGVtPy50ZXh0IHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZVRleHQsXG4gICAgICAgIHRpdGxlOiB2YWx1ZVRleHQsXG4gICAgICAgIHN1YnRpdGxlOiBzdWJ0aXRsZSB8fCBcIi1cIixcbiAgICAgIH0gYXMgUmVtb3RlU2VhcmNoT3B0aW9uO1xuICAgIH0pXG4gICAgLmZpbHRlcihCb29sZWFuKSBhcyBSZW1vdGVTZWFyY2hPcHRpb25bXTtcbn07XG5cbi8vIFByb2plY3QgZmlsdGVyIGlucHV0IGJhY2tlZCBieSByZW1vdGUgZHJvcGRvd24gc3VnZ2VzdGlvbnMuXG5jb25zdCBFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHNob3dMYWJlbCA9IHRydWUsXG59OiBFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0UHJvcHMpID0+IHtcbiAgY29uc3QgbG9hZE9wdGlvbnMgPSB1c2VDYWxsYmFjayhhc3luYyAodGVybTogc3RyaW5nLCBzaWduYWw6IEFib3J0U2lnbmFsKTogUHJvbWlzZTxSZW1vdGVTZWFyY2hPcHRpb25bXT4gPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlUHJvamVjdHModGVybSwgMSwgU0VBUkNIX1BBR0VfU0laRSwge1xuICAgICAgc2lnbmFsLFxuICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWFwUHJvamVjdE9wdGlvbnMocmVzcG9uc2U/Lml0ZW1zKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGxvYWRPcHRpb25zUGFnZSA9IHVzZUNhbGxiYWNrKGFzeW5jICh0ZXJtOiBzdHJpbmcsIHBhZ2U6IG51bWJlciwgcGFnZVNpemU6IG51bWJlciwgc2lnbmFsOiBBYm9ydFNpZ25hbCkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlUHJvamVjdHModGVybSwgcGFnZSwgcGFnZVNpemUsIHtcbiAgICAgIHNpZ25hbCxcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW1zOiBtYXBQcm9qZWN0T3B0aW9ucyhyZXNwb25zZT8uaXRlbXMpLFxuICAgICAgdG90YWw6IE51bWJlcihyZXNwb25zZT8udG90YWwgfHwgMCksXG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPFJlbW90ZVNlYXJjaENvbWJvYm94XG4gICAgICBsYWJlbD17bGFiZWx9XG4gICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XG4gICAgICBvblNlYXJjaD17bG9hZE9wdGlvbnN9XG4gICAgICBvblNlYXJjaFBhZ2U9e2xvYWRPcHRpb25zUGFnZX1cbiAgICAgIGlkQmFzZT1cImV4cGVuc2UtcHJvamVjdC1maWx0ZXJcIlxuICAgICAgbWluU2VhcmNoTGVuZ3RoPXswfVxuICAgICAgcGFnZVNpemU9e1NFQVJDSF9QQUdFX1NJWkV9XG4gICAgICBhbGxvd0VtcHR5U2VhcmNoXG4gICAgICBsb2FkT25PcGVuXG4gICAgICBpbmZpbml0ZVNjcm9sbFxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgc2hvd0xhYmVsPXtzaG93TGFiZWx9XG4gICAgICBwYW5lbENsYXNzTmFtZT1cInZpc2l0YXMtdHlwb2dyYXBoeVwiXG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQ7XG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBGbG9hdGluZ0xpc3QgZnJvbSBcIi4vRmxvYXRpbmdMaXN0LnRzeFwiO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSBcIi4vU3Bpbm5lci50c3hcIjtcbmltcG9ydCB7IENoZXZyb25Eb3duU3ZnLCBDaGV2cm9uVXBTdmcgfSBmcm9tIFwiLi9jaGV2cm9ucy50c3hcIjtcbmltcG9ydCB7IGhhbmRsZUNvbWJvYm94S2V5RG93biB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VDb21ib2JveEtleWJvYXJkLnRzXCI7XG5pbXBvcnQgeyB1c2VPdXRzaWRlQ2xpY2sgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlT3V0c2lkZUNsaWNrLnRzXCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuXG5leHBvcnQgdHlwZSBSZW1vdGVTZWFyY2hPcHRpb24gPSB7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIHRpdGxlPzogc3RyaW5nO1xuICBzdWJ0aXRsZT86IHN0cmluZztcbn07XG5cbnR5cGUgUmVtb3RlU2VhcmNoQ29tYm9ib3hQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBvblNlYXJjaDogKHRlcm06IHN0cmluZywgc2lnbmFsOiBBYm9ydFNpZ25hbCkgPT4gUHJvbWlzZTxSZW1vdGVTZWFyY2hPcHRpb25bXT47XG4gIG9uU2VhcmNoUGFnZT86IChcbiAgICB0ZXJtOiBzdHJpbmcsXG4gICAgcGFnZTogbnVtYmVyLFxuICAgIHBhZ2VTaXplOiBudW1iZXIsXG4gICAgc2lnbmFsOiBBYm9ydFNpZ25hbFxuICApID0+IFByb21pc2U8eyBpdGVtczogUmVtb3RlU2VhcmNoT3B0aW9uW107IHRvdGFsPzogbnVtYmVyIH0+O1xuICBpZEJhc2U6IHN0cmluZztcbiAgbWluU2VhcmNoTGVuZ3RoPzogbnVtYmVyO1xuICBwYWdlU2l6ZT86IG51bWJlcjtcbiAgYWxsb3dFbXB0eVNlYXJjaD86IGJvb2xlYW47XG4gIGxvYWRPbk9wZW4/OiBib29sZWFuO1xuICBpbmZpbml0ZVNjcm9sbD86IGJvb2xlYW47XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBzaG93TGFiZWw/OiBib29sZWFuO1xuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcbn07XG5cbmNvbnN0IHVuaXF1ZUJ5VmFsdWUgPSAoaXRlbXM6IFJlbW90ZVNlYXJjaE9wdGlvbltdKTogUmVtb3RlU2VhcmNoT3B0aW9uW10gPT4ge1xuICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgUmVtb3RlU2VhcmNoT3B0aW9uPigpO1xuICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMgfHwgW10pIHtcbiAgICBjb25zdCBrZXkgPSBTdHJpbmcoaXRlbS52YWx1ZSB8fCBcIlwiKS50cmltKCk7XG4gICAgaWYgKCFrZXkpIGNvbnRpbnVlO1xuICAgIGlmIChtYXAuaGFzKGtleSkpIGNvbnRpbnVlO1xuICAgIG1hcC5zZXQoa2V5LCB7XG4gICAgICB2YWx1ZToga2V5LFxuICAgICAgdGl0bGU6IFN0cmluZyhpdGVtLnRpdGxlIHx8IFwiXCIpLnRyaW0oKSxcbiAgICAgIHN1YnRpdGxlOiBTdHJpbmcoaXRlbS5zdWJ0aXRsZSB8fCBcIlwiKS50cmltKCksXG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIEFycmF5LmZyb20obWFwLnZhbHVlcygpKTtcbn07XG5cbi8vIEdlbmVyaWMgcmVtb3RlLXNlYXJjaCBjb21ib2JveCB0aGF0IHN1cHBvcnRzIG1hbnVhbCBzZWFyY2ggYW5kIG9wdGlvbmFsIHBhZ2VkIGxvYWRpbmcgb24gb3Blbi5cbmNvbnN0IFJlbW90ZVNlYXJjaENvbWJvYm94ID0gKHtcbiAgbGFiZWwsXG4gIHBsYWNlaG9sZGVyLFxuICB2YWx1ZSxcbiAgb25DaGFuZ2UsXG4gIG9uU2VhcmNoLFxuICBvblNlYXJjaFBhZ2UsXG4gIGlkQmFzZSxcbiAgbWluU2VhcmNoTGVuZ3RoID0gMixcbiAgcGFnZVNpemUgPSAyMCxcbiAgYWxsb3dFbXB0eVNlYXJjaCA9IGZhbHNlLFxuICBsb2FkT25PcGVuID0gZmFsc2UsXG4gIGluZmluaXRlU2Nyb2xsID0gZmFsc2UsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIHJlYWRPbmx5ID0gZmFsc2UsXG4gIHNob3dMYWJlbCA9IHRydWUsXG4gIHBhbmVsQ2xhc3NOYW1lID0gXCJ2aXNpdGFzLXR5cG9ncmFwaHlcIixcbn06IFJlbW90ZVNlYXJjaENvbWJvYm94UHJvcHMpID0+IHtcbiAgY29uc3QgcmVhZE9ubHlNb2RlID0gcmVhZE9ubHkgfHwgZGlzYWJsZWQ7XG4gIGNvbnN0IHZhbHVlQ29sb3IgPSByZWFkT25seU1vZGUgPyBcIiM2NDc0OGJcIiA6IFwiIzAwMjk2YmUwXCI7XG4gIGNvbnN0IFtxdWVyeSwgc2V0UXVlcnldID0gdXNlU3RhdGUodmFsdWUgfHwgXCJcIik7XG4gIGNvbnN0IFtvcHRpb25zLCBzZXRPcHRpb25zXSA9IHVzZVN0YXRlPFJlbW90ZVNlYXJjaE9wdGlvbltdPihbXSk7XG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYWN0aXZlSW5kZXgsIHNldEFjdGl2ZUluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbbGFzdFNlYXJjaGVkVGVybSwgc2V0TGFzdFNlYXJjaGVkVGVybV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2N1cnJlbnRQYWdlLCBzZXRDdXJyZW50UGFnZV0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2hhc01vcmUsIHNldEhhc01vcmVdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGFib3J0UmVmID0gdXNlUmVmPEFib3J0Q29udHJvbGxlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBhcHBlbmRSZXF1ZXN0UmVmID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGJveFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgdXNlT3V0c2lkZUNsaWNrKFtjb250YWluZXJSZWYsIGxpc3RSZWZdLCAoKSA9PiBzZXRPcGVuKGZhbHNlKSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRRdWVyeSh2YWx1ZSB8fCBcIlwiKTtcbiAgfSwgW3ZhbHVlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgYWJvcnRSZWYuY3VycmVudD8uYWJvcnQoKTtcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICBjb25zdCBmaWx0ZXJlZCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmICghcXVlcnkudHJpbSgpKSByZXR1cm4gb3B0aW9ucztcbiAgICBjb25zdCBxID0gcXVlcnkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIG9wdGlvbnMuZmlsdGVyKChvcHRpb24pID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlVGV4dCA9IG9wdGlvbi52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgdGl0bGVUZXh0ID0gU3RyaW5nKG9wdGlvbi50aXRsZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3Qgc3VidGl0bGVUZXh0ID0gU3RyaW5nKG9wdGlvbi5zdWJ0aXRsZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgcmV0dXJuIHZhbHVlVGV4dC5pbmNsdWRlcyhxKSB8fCB0aXRsZVRleHQuaW5jbHVkZXMocSkgfHwgc3VidGl0bGVUZXh0LmluY2x1ZGVzKHEpO1xuICAgIH0pO1xuICB9LCBbb3B0aW9ucywgcXVlcnldKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChhcHBlbmRSZXF1ZXN0UmVmLmN1cnJlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRBY3RpdmVJbmRleCgwKTtcbiAgfSwgW2ZpbHRlcmVkLmxlbmd0aCwgcXVlcnldKTtcblxuICBjb25zdCBjYW5TZWFyY2hUZXJtID0gdXNlQ2FsbGJhY2soXG4gICAgKHRlcm06IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgICAgY29uc3QgdHJpbW1lZCA9IHRlcm0udHJpbSgpO1xuICAgICAgaWYgKCF0cmltbWVkKSByZXR1cm4gYWxsb3dFbXB0eVNlYXJjaDtcbiAgICAgIHJldHVybiB0cmltbWVkLmxlbmd0aCA+PSBtaW5TZWFyY2hMZW5ndGg7XG4gICAgfSxcbiAgICBbYWxsb3dFbXB0eVNlYXJjaCwgbWluU2VhcmNoTGVuZ3RoXVxuICApO1xuXG4gIGNvbnN0IGV4ZWN1dGVTZWFyY2ggPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAodGVybTogc3RyaW5nLCBwYWdlOiBudW1iZXIsIGFwcGVuZDogYm9vbGVhbikgPT4ge1xuICAgICAgYWJvcnRSZWYuY3VycmVudD8uYWJvcnQoKTtcbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcbiAgICAgIGFwcGVuZFJlcXVlc3RSZWYuY3VycmVudCA9IGFwcGVuZDtcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG5cbiAgICAgIGNvbnN0IHRlcm1LZXkgPSB0ZXJtLnRvTG93ZXJDYXNlKCk7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAob25TZWFyY2hQYWdlKSB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBvblNlYXJjaFBhZ2UodGVybSwgcGFnZSwgcGFnZVNpemUsIGNvbnRyb2xsZXIuc2lnbmFsKTtcbiAgICAgICAgICBjb25zdCBwYWdlSXRlbXMgPSB1bmlxdWVCeVZhbHVlKEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lml0ZW1zKSA/IHJlc3BvbnNlLml0ZW1zIDogW10pO1xuICAgICAgICAgIHNldE9wdGlvbnMoKHByZXZpb3VzKSA9PiAoYXBwZW5kID8gdW5pcXVlQnlWYWx1ZShbLi4uKHByZXZpb3VzIHx8IFtdKSwgLi4ucGFnZUl0ZW1zXSkgOiBwYWdlSXRlbXMpKTtcbiAgICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcblxuICAgICAgICAgIGNvbnN0IGFwaVRvdGFsID0gTnVtYmVyKHJlc3BvbnNlPy50b3RhbCk7XG4gICAgICAgICAgaWYgKE51bWJlci5pc0Zpbml0ZShhcGlUb3RhbCkgJiYgYXBpVG90YWwgPiAwKSB7XG4gICAgICAgICAgICBzZXRIYXNNb3JlKHBhZ2UgKiBwYWdlU2l6ZSA8IGFwaVRvdGFsKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0SGFzTW9yZShwYWdlSXRlbXMubGVuZ3RoID49IHBhZ2VTaXplKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBvblNlYXJjaCh0ZXJtLCBjb250cm9sbGVyLnNpZ25hbCk7XG4gICAgICAgICAgY29uc3QgbmV4dCA9IHVuaXF1ZUJ5VmFsdWUocmVzcG9uc2UgfHwgW10pO1xuICAgICAgICAgIHNldE9wdGlvbnMobmV4dCk7XG4gICAgICAgICAgc2V0Q3VycmVudFBhZ2UoMSk7XG4gICAgICAgICAgc2V0SGFzTW9yZShmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRMYXN0U2VhcmNoZWRUZXJtKHRlcm1LZXkpO1xuICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIGlmICghYXBwZW5kKSB7XG4gICAgICAgICAgc2V0T3B0aW9ucyhbXSk7XG4gICAgICAgICAgc2V0Q3VycmVudFBhZ2UoMCk7XG4gICAgICAgICAgc2V0SGFzTW9yZShmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0TGFzdFNlYXJjaGVkVGVybSh0ZXJtS2V5KTtcbiAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChhYm9ydFJlZi5jdXJyZW50ID09PSBjb250cm9sbGVyKSB7XG4gICAgICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgYXBwZW5kUmVxdWVzdFJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW29uU2VhcmNoLCBvblNlYXJjaFBhZ2UsIHBhZ2VTaXplXVxuICApO1xuXG4gIGNvbnN0IHJ1blNlYXJjaCA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAocmVhZE9ubHlNb2RlIHx8IGxvYWRpbmcpIHJldHVybjtcbiAgICBjb25zdCB0ZXJtID0gcXVlcnkudHJpbSgpO1xuICAgIGNvbnN0IHRlcm1LZXkgPSB0ZXJtLnRvTG93ZXJDYXNlKCk7XG5cbiAgICBpZiAoIWNhblNlYXJjaFRlcm0odGVybSkpIHtcbiAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgc2V0Q3VycmVudFBhZ2UoMCk7XG4gICAgICBzZXRIYXNNb3JlKGZhbHNlKTtcbiAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgc2V0TGFzdFNlYXJjaGVkVGVybShcIlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGVybUtleSA9PT0gbGFzdFNlYXJjaGVkVGVybSAmJiBvcHRpb25zLmxlbmd0aCA+IDAgJiYgIW9uU2VhcmNoUGFnZSkge1xuICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCBleGVjdXRlU2VhcmNoKHRlcm0sIDEsIGZhbHNlKTtcbiAgfSwgW2NhblNlYXJjaFRlcm0sIGV4ZWN1dGVTZWFyY2gsIGxhc3RTZWFyY2hlZFRlcm0sIGxvYWRpbmcsIG9uU2VhcmNoUGFnZSwgb3B0aW9ucy5sZW5ndGgsIHF1ZXJ5LCByZWFkT25seU1vZGVdKTtcblxuICBjb25zdCBydW5Mb2FkTW9yZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAocmVhZE9ubHlNb2RlIHx8IGxvYWRpbmcgfHwgIW9uU2VhcmNoUGFnZSB8fCAhaW5maW5pdGVTY3JvbGwgfHwgIWhhc01vcmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0ZXJtID0gcXVlcnkudHJpbSgpO1xuICAgIGNvbnN0IHRlcm1LZXkgPSB0ZXJtLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHRlcm1LZXkgIT09IGxhc3RTZWFyY2hlZFRlcm0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZXh0UGFnZSA9IGN1cnJlbnRQYWdlICsgMTtcbiAgICBpZiAobmV4dFBhZ2UgPD0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF3YWl0IGV4ZWN1dGVTZWFyY2godGVybSwgbmV4dFBhZ2UsIHRydWUpO1xuICB9LCBbY3VycmVudFBhZ2UsIGV4ZWN1dGVTZWFyY2gsIGhhc01vcmUsIGluZmluaXRlU2Nyb2xsLCBsYXN0U2VhcmNoZWRUZXJtLCBsb2FkaW5nLCBvblNlYXJjaFBhZ2UsIHF1ZXJ5LCByZWFkT25seU1vZGVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghb3BlbiB8fCAhb25TZWFyY2hQYWdlIHx8ICFpbmZpbml0ZVNjcm9sbCkgcmV0dXJuO1xuICAgIGNvbnN0IHNjcm9sbGVyID0gbGlzdFJlZi5jdXJyZW50Py5wYXJlbnRFbGVtZW50O1xuICAgIGlmICghc2Nyb2xsZXIpIHJldHVybjtcblxuICAgIGNvbnN0IG9uU2Nyb2xsID0gKCkgPT4ge1xuICAgICAgaWYgKGxvYWRpbmcgfHwgIWhhc01vcmUpIHJldHVybjtcbiAgICAgIGNvbnN0IHRocmVzaG9sZCA9IDQwO1xuICAgICAgY29uc3QgaXNOZWFyQm90dG9tID0gc2Nyb2xsZXIuc2Nyb2xsVG9wICsgc2Nyb2xsZXIuY2xpZW50SGVpZ2h0ID49IHNjcm9sbGVyLnNjcm9sbEhlaWdodCAtIHRocmVzaG9sZDtcbiAgICAgIGlmIChpc05lYXJCb3R0b20pIHtcbiAgICAgICAgdm9pZCBydW5Mb2FkTW9yZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBzY3JvbGxlci5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsLCB7IHBhc3NpdmU6IHRydWUgfSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHNjcm9sbGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwpO1xuICAgIH07XG4gIH0sIFtoYXNNb3JlLCBpbmZpbml0ZVNjcm9sbCwgbG9hZGluZywgb25TZWFyY2hQYWdlLCBvcGVuLCBydW5Mb2FkTW9yZV0pO1xuXG4gIGNvbnN0IHNlbGVjdE9wdGlvbiA9IChvcHRpb246IFJlbW90ZVNlYXJjaE9wdGlvbikgPT4ge1xuICAgIGNvbnN0IG5leHRWYWx1ZSA9IFN0cmluZyhvcHRpb24udmFsdWUgfHwgXCJcIikudHJpbSgpO1xuICAgIHNldFF1ZXJ5KG5leHRWYWx1ZSk7XG4gICAgb25DaGFuZ2UobmV4dFZhbHVlKTtcbiAgICBzZXRMYXN0U2VhcmNoZWRUZXJtKG5leHRWYWx1ZS50b0xvd2VyQ2FzZSgpKTtcbiAgICBzZXRPcGVuKGZhbHNlKTtcbiAgfTtcblxuICBjb25zdCBxdWVyeUtleSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBzaG93U2VhcmNoSWNvbiA9XG4gICAgIXJlYWRPbmx5TW9kZSAmJlxuICAgICFsb2FkaW5nICYmXG4gICAgY2FuU2VhcmNoVGVybShxdWVyeSkgJiZcbiAgICBxdWVyeUtleSAhPT0gbGFzdFNlYXJjaGVkVGVybTtcblxuICBjb25zdCBsaXN0SWQgPSBgJHtpZEJhc2V9LW9wdGlvbnNgO1xuICBjb25zdCBhY3RpdmVJZCA9IG9wZW4gJiYgZmlsdGVyZWRbYWN0aXZlSW5kZXhdID8gYCR7aWRCYXNlfS1vcHQtJHtmaWx0ZXJlZFthY3RpdmVJbmRleF0udmFsdWV9YCA6IHVuZGVmaW5lZDtcbiAgY29uc3Qgc2hvd0xvYWRpbmdPbmx5U3RhdGUgPSBsb2FkaW5nICYmIGZpbHRlcmVkLmxlbmd0aCA9PT0gMDtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCIgcmVmPXtjb250YWluZXJSZWZ9PlxuICAgICAge3Nob3dMYWJlbCA/IChcbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiIHN0eWxlPXt7IGNvbG9yOiBcIiMwMDI5NmJlMFwiIH19PlxuICAgICAgICAgIHtsYWJlbH1cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICkgOiBudWxsfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXtib3hSZWZ9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgXCJyZWxhdGl2ZSB3LWZ1bGwgcm91bmRlZC14bCBiZy13aGl0ZSB0ZXh0LWxlZnQgZm9jdXMtd2l0aGluOmJvcmRlci1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLTIgZm9jdXMtd2l0aGluOnJpbmctcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy1vZmZzZXQtd2hpdGUgc206dGV4dC1zbVwiLFxuICAgICAgICAgICAgcmVhZE9ubHlNb2RlID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwiXCJcbiAgICAgICAgICApfVxuICAgICAgICA+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgIFwidy1mdWxsIHJvdW5kZWQteGwgYm9yZGVyIHB4LTMgcHktMiBwci0yMCB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGRpc2FibGVkOmJnLXNsYXRlLTEwMCBkaXNhYmxlZDp0ZXh0LXNsYXRlLTUwMCBkaXNhYmxlZDpib3JkZXItc2xhdGUtMjAwIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZFwiLFxuICAgICAgICAgICAgICBcImJvcmRlci1zbGF0ZS0yMDAgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCIsXG4gICAgICAgICAgICAgIHJlYWRPbmx5TW9kZSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcInRleHQtc2xhdGUtOTAwXCJcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICBzdHlsZT17eyBjb2xvcjogdmFsdWVDb2xvciB9fVxuICAgICAgICAgICAgdmFsdWU9e3F1ZXJ5fVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBuZXh0VmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgIHNldFF1ZXJ5KG5leHRWYWx1ZSk7XG4gICAgICAgICAgICAgIG9uQ2hhbmdlKG5leHRWYWx1ZSk7XG4gICAgICAgICAgICAgIGlmIChuZXh0VmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCkgIT09IGxhc3RTZWFyY2hlZFRlcm0pIHtcbiAgICAgICAgICAgICAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uRm9jdXM9eygpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFyZWFkT25seU1vZGUgJiYgZmlsdGVyZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbktleURvd249eyhldmVudCkgPT5cbiAgICAgICAgICAgICAgaGFuZGxlQ29tYm9ib3hLZXlEb3duKGV2ZW50LCB7XG4gICAgICAgICAgICAgICAgaXNPcGVuOiBvcGVuLFxuICAgICAgICAgICAgICAgIHNldE9wZW4sXG4gICAgICAgICAgICAgICAgb3B0aW9uQ291bnQ6IGZpbHRlcmVkLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBzZXRBY3RpdmVJbmRleCxcbiAgICAgICAgICAgICAgICBvbkVudGVyV2hlbk9wZW46ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbihmaWx0ZXJlZFthY3RpdmVJbmRleF0gPz8gZmlsdGVyZWRbMF0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB2b2lkIHJ1blNlYXJjaCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25FbnRlcldoZW5DbG9zZWQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHZvaWQgcnVuU2VhcmNoKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvcGVuT25BcnJvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgICAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVsfVxuICAgICAgICAgICAgcm9sZT1cImNvbWJvYm94XCJcbiAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e29wZW59XG4gICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtsaXN0SWR9XG4gICAgICAgICAgICBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9e2FjdGl2ZUlkfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCByaWdodC0wIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHByLTJcIj5cbiAgICAgICAgICAgIHtsb2FkaW5nID8gKFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBweC0xLjVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cbiAgICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIC8+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgICAgICB7c2hvd1NlYXJjaEljb24gPyAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBwLTEuNSB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNsYXRlLTUwMFwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdm9pZCBydW5TZWFyY2goKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fU2VhcmNoXCIsIFwiU2VhcmNoXCIpfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtyZWFkT25seU1vZGV9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBzdHJva2VXaWR0aD17MS41fSBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBjbGFzc05hbWU9XCJoLTUgdy01XCI+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm0xNS43NSAxNS43NS0yLjQ4OS0yLjQ4OW0wIDBhMy4zNzUgMy4zNzUgMCAxIDAtNC43NzMtNC43NzMgMy4zNzUgMy4zNzUgMCAwIDAgNC43NzQgNC43NzRaTTIxIDEyYTkgOSAwIDEgMS0xOCAwIDkgOSAwIDAgMSAxOCAwWlwiIC8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHAtMS41IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtc2xhdGUtNjAwXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZWFkT25seU1vZGUpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAob3Blbikge1xuICAgICAgICAgICAgICAgICAgc2V0T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghcXVlcnkudHJpbSgpICYmIGxvYWRPbk9wZW4pIHtcbiAgICAgICAgICAgICAgICAgIHZvaWQgcnVuU2VhcmNoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtvcGVuID8gaW5kVChcIkRyb3Bkb3duX0hpZGVPcHRpb25zXCIsIFwiSGlkZSBvcHRpb25zXCIpIDogaW5kVChcIkRyb3Bkb3duX1Nob3dPcHRpb25zXCIsIFwiU2hvdyBvcHRpb25zXCIpfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17cmVhZE9ubHlNb2RlfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7b3BlbiA/IDxDaGV2cm9uVXBTdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+IDogPENoZXZyb25Eb3duU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPn1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPEZsb2F0aW5nTGlzdFxuICAgICAgICAgIGFuY2hvclJlZj17Ym94UmVmfVxuICAgICAgICAgIG9wZW49e29wZW59XG4gICAgICAgICAgekluZGV4PXszNjAwMDB9XG4gICAgICAgICAgbWF4SGVpZ2h0Q2xhc3M9XCJtYXgtaC03MlwiXG4gICAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxuICAgICAgICAgIHJvdW5kZWRDbGFzcz1cInJvdW5kZWQteGxcIlxuICAgICAgICAgIHBhbmVsQ2xhc3NOYW1lPXtwYW5lbENsYXNzTmFtZX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgaWQ9e2xpc3RJZH0gcmVmPXtsaXN0UmVmfT5cbiAgICAgICAgICAgIHtzaG93TG9hZGluZ09ubHlTdGF0ZSA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPntpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfTwvZGl2PlxuICAgICAgICAgICAgKSA6IGZpbHRlcmVkLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPntpbmRUKFwiQ29tbW9uX05vRGF0YVwiLCBcIk5vIGRhdGFcIil9PC9kaXY+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIHtmaWx0ZXJlZC5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gaW5kZXggPT09IGFjdGl2ZUluZGV4O1xuICAgICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uSWQgPSBvcHRpb24udmFsdWUgfHwgYCR7aW5kZXh9YDtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e29wdGlvbklkfVxuICAgICAgICAgICAgICAgICAgICAgIGlkPXtgJHtpZEJhc2V9LW9wdC0ke29wdGlvbklkfWB9XG4gICAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17aXNBY3RpdmV9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWxhdGl2ZSBmbGV4IHctZnVsbCBjdXJzb3ItZGVmYXVsdCBzZWxlY3Qtbm9uZSBpdGVtcy1zdGFydCBweS0yIHB4LTMgdGV4dC1sZWZ0IHRleHQtc21cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID8gXCJiZy1wcmltYXJ5IHRleHQtd2hpdGVcIiA6IFwidGV4dC1zbGF0ZS05MDBcIlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRBY3RpdmVJbmRleChpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2VsZWN0T3B0aW9uKG9wdGlvbil9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1lZGl1bVwiPntvcHRpb24udGl0bGUgfHwgb3B0aW9uLnZhbHVlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtvcHRpb24uc3VidGl0bGUgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInRleHQteHNcIiwgaXNBY3RpdmUgPyBcInRleHQtd2hpdGUvOTBcIiA6IFwidGV4dC1zbGF0ZS01MDBcIil9PntvcHRpb24uc3VidGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAge2xvYWRpbmcgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIGJvcmRlci10IGJvcmRlci1zbGF0ZS0xMDBcIj57aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L2Rpdj5cbiAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0Zsb2F0aW5nTGlzdD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVtb3RlU2VhcmNoQ29tYm9ib3g7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNPLElBQU0sMkJBQTJCLENBQ3RDLFFBQ0EsY0FDQSxXQUNXO0FBQ1gsTUFBSSxXQUFXLFFBQVEsV0FBVyxVQUFhLE9BQU8sTUFBTSxPQUFPLE1BQU0sQ0FBQyxHQUFHO0FBQzNFLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxhQUNKLFdBQ0MsT0FBTyxhQUFhLGVBQWUsU0FBUyxnQkFBZ0IsT0FDekQsU0FBUyxnQkFBZ0IsT0FDekI7QUFDTixRQUFNLGVBQWUsT0FBTyxnQkFBZ0IsRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZO0FBRW5FLE1BQUksY0FBYztBQUNoQixRQUFJO0FBQ0YsYUFBTyxJQUFJLEtBQUssYUFBYSxZQUFZO0FBQUEsUUFDdkMsT0FBTztBQUFBLFFBQ1AsVUFBVTtBQUFBLFFBQ1YsdUJBQXVCO0FBQUEsUUFDdkIsdUJBQXVCO0FBQUEsTUFDekIsQ0FBQyxFQUFFLE9BQU8sTUFBTTtBQUFBLElBQ2xCLFFBQVE7QUFBQSxJQUVSO0FBQUEsRUFDRjtBQUVBLFFBQU0sY0FBYyxJQUFJLEtBQUssYUFBYSxZQUFZO0FBQUEsSUFDcEQsdUJBQXVCO0FBQUEsSUFDdkIsdUJBQXVCO0FBQUEsRUFDekIsQ0FBQyxFQUFFLE9BQU8sTUFBTTtBQUVoQixTQUFPLGVBQWUsR0FBRyxXQUFXLElBQUksWUFBWSxLQUFLO0FBQzNEOzs7QUMrQ0EsSUFBTSxtQkFBbUI7QUFDekIsSUFBTSxlQUF1QztBQUFBLEVBQzNDLGdCQUFnQjtBQUNsQjtBQUVBLElBQUksa0JBQStDLENBQUM7QUFDcEQsSUFBSSxnQkFBMEM7QUFDOUMsSUFBSSxtQkFBbUI7QUFDdkIsSUFBSSxpQkFBb0Q7QUFDeEQsSUFBTSwwQkFBMEIsb0JBQUksSUFBdUQ7QUFDM0YsSUFBTSwwQkFBMEIsb0JBQUksSUFBZ0U7QUFFcEcsSUFBTSxXQUFXLENBQUMsVUFBMkI7QUFDM0MsTUFBSSxVQUFVLFFBQVEsVUFBVSxPQUFXLFFBQU87QUFDbEQsU0FBTyxPQUFPLEtBQUssRUFBRSxLQUFLO0FBQzVCO0FBRUEsSUFBTSxtQkFBbUIsQ0FBQyxVQUFrQztBQUMxRCxNQUFJLFVBQVUsUUFBUSxVQUFVLE9BQVcsUUFBTztBQUNsRCxRQUFNLFNBQVMsT0FBTyxLQUFLO0FBQzNCLFNBQU8sT0FBTyxTQUFTLE1BQU0sSUFBSSxTQUFTO0FBQzVDO0FBRUEsSUFBTSxzQkFBc0IsQ0FBQyxVQUE0QjtBQUN2RCxRQUFNLFNBQVMsaUJBQWlCLEtBQUs7QUFDckMsU0FBTyxXQUFXLFFBQVEsVUFBVTtBQUN0QztBQUVBLElBQU0sbUJBQW1CLENBQUMsVUFBNEI7QUFDcEQsUUFBTSxTQUFTLGlCQUFpQixLQUFLO0FBQ3JDLFNBQU8sV0FBVyxRQUFRLFNBQVM7QUFDckM7QUFFQSxJQUFNLGdDQUFnQyxDQUFDLFVBQTRCO0FBQ2pFLFFBQU0sU0FBUyxpQkFBaUIsS0FBSztBQUNyQyxTQUFPLFdBQVcsUUFBUSxPQUFPLFVBQVUsTUFBTSxLQUFLLFVBQVUsS0FBSyxVQUFVO0FBQ2pGO0FBRUEsSUFBTSxpQkFBaUIsQ0FBQyxVQUFtQztBQUN6RCxNQUFJLFVBQVUsUUFBUSxVQUFVLE9BQVcsUUFBTztBQUNsRCxNQUFJLE9BQU8sVUFBVSxVQUFXLFFBQU87QUFDdkMsTUFBSSxPQUFPLFVBQVUsVUFBVTtBQUM3QixVQUFNLGFBQWEsTUFBTSxLQUFLLEVBQUUsWUFBWTtBQUM1QyxRQUFJLGVBQWUsVUFBVSxlQUFlLElBQUssUUFBTztBQUN4RCxRQUFJLGVBQWUsV0FBVyxlQUFlLElBQUssUUFBTztBQUFBLEVBQzNEO0FBQ0EsTUFBSSxPQUFPLFVBQVUsVUFBVTtBQUM3QixRQUFJLFVBQVUsRUFBRyxRQUFPO0FBQ3hCLFFBQUksVUFBVSxFQUFHLFFBQU87QUFBQSxFQUMxQjtBQUNBLFNBQU87QUFDVDtBQUVBLElBQU0sYUFBYSxDQUFDLFVBQW1DO0FBQ3JELFFBQU0saUJBQWlCLGVBQWUsS0FBSztBQUMzQyxNQUFJLG1CQUFtQixLQUFNLFFBQU87QUFFcEMsTUFBSSxPQUFPLFVBQVUsU0FBVSxRQUFPO0FBQ3RDLFFBQU0sYUFBYSxNQUFNLEtBQUssRUFBRSxZQUFZO0FBQzVDLE1BQUksQ0FBQyxXQUFZLFFBQU87QUFDeEIsTUFBSSxlQUFlLFFBQVEsZUFBZSxTQUFTLGVBQWUsSUFBSyxRQUFPO0FBQzlFLE1BQUksZUFBZSxTQUFTLGVBQWUsUUFBUSxlQUFlLElBQUssUUFBTztBQUM5RSxTQUFPO0FBQ1Q7QUFFQSxJQUFNLDJCQUEyQixNQUE0QjtBQUMzRCxNQUFJLE9BQU8sV0FBVyxZQUFhLFFBQU8sQ0FBQztBQUMzQyxTQUFPO0FBQ1Q7QUFFQSxJQUFNLGtCQUFrQixDQUFDLFlBQTZEO0FBQ3BGLE1BQUksQ0FBQyxRQUFTLFFBQU8sQ0FBQztBQUV0QixNQUFJLG1CQUFtQixTQUFTO0FBQzlCLFVBQU0sU0FBaUMsQ0FBQztBQUN4QyxZQUFRLFFBQVEsQ0FBQyxPQUFPLFFBQVE7QUFDOUIsYUFBTyxHQUFHLElBQUk7QUFBQSxJQUNoQixDQUFDO0FBQ0QsV0FBTztBQUFBLEVBQ1Q7QUFFQSxNQUFJLE1BQU0sUUFBUSxPQUFPLEdBQUc7QUFDMUIsV0FBTyxRQUFRLE9BQStCLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxNQUFNO0FBQ25FLFVBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxPQUFPLEtBQUs7QUFDL0IsYUFBTztBQUFBLElBQ1QsR0FBRyxDQUFDLENBQUM7QUFBQSxFQUNQO0FBRUEsU0FBTyxPQUFPLFFBQVEsT0FBTyxFQUFFLE9BQStCLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxNQUFNO0FBQ25GLFFBQUksVUFBVSxVQUFhLFVBQVUsS0FBTSxRQUFPO0FBQ2xELFFBQUksR0FBRyxJQUFJLE9BQU8sS0FBSztBQUN2QixXQUFPO0FBQUEsRUFDVCxHQUFHLENBQUMsQ0FBQztBQUNQO0FBRUEsSUFBTSxpQkFBaUIsQ0FBQyxTQUFrQyxRQUF3QjtBQUNoRixRQUFNLGdCQUFnQixJQUFJLEtBQUssRUFBRSxZQUFZO0FBQzdDLFFBQU0sVUFBVSxPQUFPLFFBQVEsZ0JBQWdCLE9BQU8sQ0FBQztBQUN2RCxRQUFNLFFBQVEsUUFBUSxLQUFLLENBQUMsQ0FBQyxTQUFTLE1BQU0sVUFBVSxLQUFLLEVBQUUsWUFBWSxNQUFNLGFBQWE7QUFDNUYsU0FBTyxTQUFTLFFBQVEsQ0FBQyxDQUFDO0FBQzVCO0FBRUEsSUFBTSxvQkFBb0IsQ0FBQyxTQUFpQyxRQUFzQjtBQUNoRixRQUFNLGdCQUFnQixJQUFJLEtBQUssRUFBRSxZQUFZO0FBQzdDLFFBQU0sV0FBVyxPQUFPLEtBQUssT0FBTyxFQUFFLEtBQUssQ0FBQyxjQUFjLFVBQVUsS0FBSyxFQUFFLFlBQVksTUFBTSxhQUFhO0FBQzFHLE1BQUksQ0FBQyxTQUFVO0FBQ2YsU0FBTyxRQUFRLFFBQVE7QUFDekI7QUFFQSxJQUFNLHFCQUFxQixDQUFDLFlBQTZDO0FBQ3ZFLFFBQU0sZ0JBQWdCLGVBQWUsU0FBUyxlQUFlO0FBQzdELE1BQUksQ0FBQyxjQUFlLFFBQU87QUFFM0IsTUFBSSxjQUFjLEtBQUssYUFBYSxHQUFHO0FBQ3JDLFdBQU8sY0FBYyxRQUFRLGVBQWUsRUFBRSxFQUFFLEtBQUs7QUFBQSxFQUN2RDtBQUVBLFNBQU8sY0FBYyxLQUFLO0FBQzVCO0FBRUEsSUFBTSxxQkFBcUIsTUFBbUM7QUFDNUQsUUFBTSxnQkFBZ0IseUJBQXlCO0FBRS9DLFNBQU87QUFBQSxJQUNMLE9BQU8sU0FBUyxjQUFjLGlCQUFpQjtBQUFBLElBQy9DLFVBQVUsU0FBUyxjQUFjLGlCQUFpQjtBQUFBLElBQ2xELFNBQVMsU0FBUyxjQUFjLGdCQUFnQjtBQUFBLElBQ2hELGlCQUFpQixXQUFXLGNBQWMsMEJBQTBCLE1BQU07QUFBQSxFQUM1RTtBQUNGO0FBRUEsSUFBTSwyQkFBMkIsTUFBZTtBQUM5QyxNQUFJLE9BQU8sV0FBVyxZQUFhLFFBQU87QUFDMUMsUUFBTSxnQkFBZ0IseUJBQXlCO0FBRS9DLFFBQU0scUJBQXFCLFdBQVcsY0FBYywwQkFBMEI7QUFDOUUsU0FBTyx1QkFBdUI7QUFDaEM7QUFFQSxJQUFNLDRCQUE0QixNQUFjO0FBQzlDLFNBQU8sU0FBUyx5QkFBeUIsRUFBRSx3QkFBd0IsRUFBRSxZQUFZO0FBQ25GO0FBRUEsSUFBTSxrQkFBa0IsQ0FBQyxTQUFxQztBQUM1RCxTQUFPLEdBQUcsS0FBSyxLQUFLLElBQUksS0FBSyxRQUFRLElBQUksS0FBSyxPQUFPLElBQUksMEJBQTBCLENBQUM7QUFDdEY7QUFFQSxJQUFNLHNCQUFzQixDQUMxQixTQUNBLFNBQ0EsY0FBYyxPQUNkLGtCQUFrQixTQUNGO0FBQ2hCLFFBQU0sT0FBTyxnQkFBZ0IsU0FBUyxPQUFPO0FBQzdDLFFBQU0sU0FBaUMsRUFBRSxHQUFHLEtBQUs7QUFFakQsTUFBSSxTQUFTLFFBQVEsS0FBSyxHQUFHO0FBQzNCLFdBQU8sZ0JBQWdCLFVBQVUsUUFBUSxLQUFLO0FBQUEsRUFDaEQ7QUFFQSxNQUFJLFNBQVMsUUFBUSxTQUFTLEdBQUc7QUFDL0IsV0FBTyxlQUFlLElBQUksUUFBUTtBQUFBLEVBQ3BDO0FBRUEsTUFBSSxtQkFBbUIsU0FBUyxRQUFRLFFBQVEsR0FBRztBQUNqRCxXQUFPLGdCQUFnQixJQUFJLFFBQVE7QUFBQSxFQUNyQztBQUVBLE1BQUksYUFBYTtBQUNmLFdBQU8sY0FBYyxJQUFJO0FBQUEsRUFDM0I7QUFFQSxTQUFPO0FBQ1Q7QUFFQSxJQUFNLHNCQUFzQixDQUFDLE9BQWUsWUFBMkM7QUFDckYsUUFBTSxPQUFPLGdCQUFnQixTQUFTLE9BQU87QUFDN0MsUUFBTSxTQUFpQztBQUFBLElBQ3JDLEdBQUc7QUFBQSxJQUNILEdBQUc7QUFBQSxFQUNMO0FBRUEsTUFBSSxTQUFTLEtBQUssR0FBRztBQUNuQixXQUFPLGdCQUFnQixVQUFVLEtBQUs7QUFBQSxFQUN4QztBQUVBLFNBQU87QUFDVDtBQUVBLElBQU0sbUJBQW1CLENBQUMsWUFBc0M7QUFDOUQsUUFBTSxtQkFBbUIsbUJBQW1CLFNBQVMsT0FBTztBQUM1RCxRQUFNLGFBQWEsbUJBQW1CO0FBQ3RDLFNBQU8sU0FBUyxvQkFBb0IsZ0JBQWdCLFNBQVMsV0FBVyxLQUFLO0FBQy9FO0FBRUEsSUFBTSxrQkFBa0IsQ0FBQyxZQUFrRDtBQUN6RSxRQUFNLGFBQWEsbUJBQW1CO0FBQ3RDLFFBQU0sUUFBUSxpQkFBaUIsT0FBTztBQUN0QyxRQUFNLFdBQVcsU0FBUyxnQkFBZ0IsWUFBWSxXQUFXLFFBQVE7QUFDekUsUUFBTSxVQUFVLFNBQVMsZ0JBQWdCLFdBQVcsV0FBVyxXQUFXLGdCQUFnQixLQUFLO0FBQy9GLFFBQU0sa0JBQ0osT0FBTyxnQkFBZ0Isb0JBQW9CLFlBQ3ZDLGdCQUFnQixrQkFDZixXQUFXLG9CQUFvQjtBQUV0QyxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQU0sMEJBQTBCLENBQUMsYUFBbUU7QUFDbEcsTUFBSSxDQUFDLFNBQVMsU0FBUztBQUNyQixVQUFNLElBQUksY0FBYyxTQUFTLFdBQVcsK0JBQStCO0FBQUEsRUFDN0U7QUFFQSxRQUFNLFFBQVEsTUFBTSxRQUFRLFNBQVMsS0FBSyxJQUFJLFNBQVMsTUFBTSxDQUFDLElBQUk7QUFDbEUsTUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLFFBQVE7QUFDM0IsVUFBTSxJQUFJLGNBQWMsK0JBQStCO0FBQUEsRUFDekQ7QUFFQSxRQUFNLFdBQVcsU0FBUyxNQUFNLE9BQU8sUUFBUTtBQUMvQyxRQUFNLGlCQUFpQixTQUFTLE1BQU0sT0FBTyxjQUFjO0FBQzNELFFBQU0sc0JBQXNCLFNBQVMsTUFBTSxPQUFPLG1CQUFtQjtBQUNyRSxRQUFNLFlBQVksTUFBTSxRQUFRLE1BQU0sU0FBUyxJQUFJLE1BQU0sWUFBWSxDQUFDO0FBQ3RFLFFBQU0sa0JBQWtCLFNBQVMsVUFBVSxLQUFLLENBQUMsU0FBUyxLQUFLLFNBQVMsR0FBRyxTQUFTO0FBQ3BGLFFBQU0sWUFBWSxrQkFBa0I7QUFDcEMsUUFBTSxrQkFBa0IsVUFBVSxLQUFLLENBQUMsU0FBUyxTQUFTLEtBQUssU0FBUyxNQUFNLFNBQVMsS0FBSyxVQUFVLENBQUM7QUFDdkcsUUFBTSxzQkFBc0IsaUJBQWlCLHdCQUF3QjtBQUVyRSxNQUFJLENBQUMsWUFBWSxDQUFDLFdBQVc7QUFDM0IsVUFBTSxJQUFJLGNBQWMsMENBQTBDO0FBQUEsRUFDcEU7QUFFQSxTQUFPO0FBQUEsSUFDTCxPQUFPO0FBQUEsSUFDUDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQU0sMEJBQTBCLE9BQU8sWUFBMEQ7QUFDL0YsUUFBTSxPQUFPLGdCQUFnQixPQUFPO0FBQ3BDLFFBQU0sYUFBYSxnQkFBZ0IsSUFBSTtBQUV2QyxNQUFJLGlCQUFpQixxQkFBcUIsWUFBWTtBQUNwRCxXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUksa0JBQWtCLHFCQUFxQixZQUFZO0FBQ3JELFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxvQkFBb0IsMEJBQTBCO0FBQ3BELE1BQUksQ0FBQyxTQUFTLEtBQUssUUFBUSxLQUFLLG1CQUFtQjtBQUNqRCxVQUFNLGtCQUFxQztBQUFBLE1BQ3pDLE9BQU8sS0FBSztBQUFBLE1BQ1osV0FBVztBQUFBLE1BQ1gsVUFBVTtBQUFBLE1BQ1YscUJBQXFCO0FBQUEsTUFDckIscUJBQXFCLFdBQVcsa0NBQWtDO0FBQUEsSUFDcEU7QUFFQSxvQkFBZ0I7QUFDaEIsdUJBQW1CO0FBQ25CLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSxDQUFDLFNBQVMsS0FBSyxRQUFRLEdBQUc7QUFDNUIsVUFBTSxJQUFJLGNBQWMsOENBQThDO0FBQUEsRUFDeEU7QUFFQSxxQkFBbUI7QUFDbkIsb0JBQWtCLFlBQVk7QUFDNUIsVUFBTSxpQkFBc0M7QUFBQSxNQUMxQyxVQUFVLEtBQUs7QUFBQSxNQUNmLFNBQVMsS0FBSztBQUFBLElBQ2hCO0FBRUEsVUFBTSxrQkFBa0IsTUFBTSxVQUE2QywyQkFBMkI7QUFBQSxNQUNwRyxHQUFHO0FBQUEsTUFDSCxRQUFRO0FBQUEsTUFDUixTQUFTLG9CQUFvQixLQUFLLE9BQU8sT0FBTztBQUFBLE1BQ2hELE1BQU0sS0FBSyxVQUFVLGNBQWM7QUFBQSxJQUNyQyxDQUFDO0FBRUQsVUFBTSxXQUFXLHdCQUF3QixlQUFlO0FBQ3hELFVBQU0sY0FBaUM7QUFBQSxNQUNyQyxHQUFHO0FBQUEsTUFDSCxPQUFPLEtBQUs7QUFBQSxJQUNkO0FBRUEsUUFBSSxPQUFPLFdBQVcsYUFBYTtBQUNqQyxhQUFPLGdDQUFnQyxZQUFZO0FBQUEsSUFDckQ7QUFFQSxvQkFBZ0I7QUFDaEIsV0FBTztBQUFBLEVBQ1QsR0FBRztBQUVILE1BQUk7QUFDRixXQUFPLE1BQU07QUFBQSxFQUNmLFVBQUU7QUFDQSxxQkFBaUI7QUFBQSxFQUNuQjtBQUNGO0FBRUEsSUFBTSw2QkFBNkIsQ0FDakMsYUFDOEM7QUFDOUMsU0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBQ0gsT0FBTyxNQUFNLFFBQVEsVUFBVSxLQUFLLElBQUksU0FBUyxRQUFRLENBQUM7QUFBQSxFQUM1RDtBQUNGO0FBRUEsSUFBTSwrQkFBK0IsQ0FDbkMsYUFDNEM7QUFDNUMsU0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBQ0gsT0FBTyxNQUFNLFFBQVEsVUFBVSxLQUFLLElBQUksU0FBUyxRQUFRLENBQUM7QUFBQSxFQUM1RDtBQUNGO0FBRUEsSUFBTSx1QkFBdUIsQ0FBSSxhQUFtRDtBQUNsRixTQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxRQUFRLE1BQU0sUUFBUSxVQUFVLE1BQU0sSUFBSSxTQUFTLFNBQVMsVUFBVSxVQUFVO0FBQUEsRUFDbEY7QUFDRjtBQUVBLElBQU0saUNBQWlDLENBQ3JDLGFBQzhDO0FBQzlDLFNBQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUNILE9BQU8sTUFBTSxRQUFRLFVBQVUsS0FBSyxJQUFJLFNBQVMsUUFBUSxDQUFDO0FBQUEsRUFDNUQ7QUFDRjtBQUVBLElBQU0sd0JBQXdCLENBQUMsVUFBNEI7QUFDekQsUUFBTSxNQUFNLFNBQVMsS0FBSyxFQUFFLFlBQVk7QUFDeEMsU0FBTyxJQUFJLFdBQVcsZ0JBQWdCLEtBQUssSUFBSSxXQUFXLE9BQU87QUFDbkU7QUFFQSxJQUFNLHdCQUF3QixDQUFDLFVBQTJDO0FBQ3hFLE1BQUksRUFBRSxpQkFBaUIsZUFBZ0IsUUFBTztBQUM5QyxNQUFJLE1BQU0sV0FBVyxPQUFPLE1BQU0sV0FBVyxJQUFLLFFBQU87QUFDekQsU0FBTyxNQUFNLFdBQVcsVUFBYSxzQkFBc0IsTUFBTSxZQUFZO0FBQy9FO0FBRUEsSUFBTSwyQkFBMkIsTUFBZTtBQUM5QyxNQUFJLE9BQU8sZ0JBQWdCLG9CQUFvQixXQUFXO0FBQ3hELFdBQU8sZ0JBQWdCO0FBQUEsRUFDekI7QUFFQSxTQUFPLHlCQUF5QjtBQUNsQztBQUVBLElBQU0sMEJBQTBCLENBQUMsVUFBNEI7QUFDM0QsTUFBSSx5QkFBeUIsRUFBRyxRQUFPO0FBQ3ZDLFNBQU8sc0JBQXNCLEtBQUs7QUFDcEM7QUFFQSxJQUFNLDZCQUE2QixDQUFDLFlBQXdDO0FBQzFFLFNBQU87QUFBQSxJQUNMLFFBQVEsU0FBUyxRQUFRLE1BQU07QUFBQSxJQUMvQixjQUFjLFNBQVMsUUFBUSxNQUFNO0FBQUEsSUFDckMsWUFBWSxRQUFRLGNBQWM7QUFBQSxJQUNsQyxVQUFVLFNBQVMsUUFBUSxlQUFlO0FBQUEsSUFDMUMsUUFBUSxTQUFTLFFBQVEsYUFBYTtBQUFBLElBQ3RDLFdBQVcsU0FBUyxRQUFRLE1BQU07QUFBQSxJQUNsQyxjQUFjLFNBQVMsUUFBUSxZQUFZO0FBQUEsSUFDM0Msb0JBQW9CLDhCQUE4QixRQUFRLGtCQUFrQixJQUN4RSxPQUFPLFFBQVEsa0JBQWtCLElBQ2pDO0FBQUEsSUFDSixNQUFNLE9BQU8sU0FBUyxRQUFRLElBQUksS0FBSyxRQUFRLE9BQU8sSUFBSSxRQUFRLE9BQU87QUFBQSxJQUN6RSxVQUFVLE9BQU8sU0FBUyxRQUFRLFFBQVEsS0FBSyxRQUFRLFdBQVcsSUFBSSxRQUFRLFdBQVc7QUFBQSxFQUMzRjtBQUNGO0FBRUEsSUFBTSxpQ0FBaUMsQ0FBQyxTQUF5RDtBQUMvRixTQUFPO0FBQUEsSUFDTCxjQUFjLFNBQVMsS0FBSyxZQUFZO0FBQUEsSUFDeEMsYUFBYSxTQUFTLEtBQUssV0FBVztBQUFBLElBQ3RDLG9CQUFvQixpQkFBaUIsS0FBSyxrQkFBa0I7QUFBQSxJQUM1RCxRQUFRLFNBQVMsS0FBSyxNQUFNLEtBQUs7QUFBQSxJQUNqQyxTQUFTLFNBQVMsS0FBSyxPQUFPO0FBQUEsSUFDOUIsUUFBUSxTQUFTLEtBQUssTUFBTTtBQUFBLElBQzVCLGNBQWMsU0FBUyxLQUFLLFlBQVk7QUFBQSxJQUN4QyxhQUFhLGlCQUFpQixLQUFLLGVBQWUsS0FBSyxjQUFjO0FBQUEsSUFDckUsVUFBVSxpQkFBaUIsS0FBSyxRQUFRO0FBQUEsSUFDeEMsa0JBQWtCLGlCQUFpQixLQUFLLGdCQUFnQjtBQUFBLElBQ3hELGFBQWEsU0FBUyxLQUFLLFdBQVcsS0FBSztBQUFBLEVBQzdDO0FBQ0Y7QUFFQSxJQUFNLHdCQUF3QixDQUM1QixRQUNBLGNBQ0EscUJBQzhDO0FBQzlDLFFBQU0sY0FBYyxNQUFNLFFBQVEsUUFBUSxLQUFLLElBQUksT0FBTyxRQUFRLENBQUM7QUFDbkUsUUFBTSxjQUFjLFlBQVksSUFBSSxDQUFDLFVBQVUsK0JBQStCLEtBQUssQ0FBQztBQUVwRixTQUFPO0FBQUEsSUFDTCxTQUFTLE9BQU8sWUFBWTtBQUFBLElBQzVCLFNBQVMsU0FBUyxPQUFPLE9BQU8sS0FBSztBQUFBLElBQ3JDLE9BQU8saUJBQWlCLE9BQU8sS0FBSyxLQUFLLFlBQVk7QUFBQSxJQUNyRCxNQUFNLGlCQUFpQixPQUFPLElBQUksS0FBSztBQUFBLElBQ3ZDLFVBQVUsaUJBQWlCLE9BQU8sUUFBUSxLQUFLO0FBQUEsSUFDL0MsT0FBTztBQUFBLElBQ1AsU0FBUztBQUFBLEVBQ1g7QUFDRjtBQUVBLElBQU0sbUJBQW1CLENBQUMsa0JBQWtDO0FBQzFELE1BQUksQ0FBQyxpQkFBaUIsT0FBTyxXQUFXLGFBQWE7QUFDbkQsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLG1CQUFtQix5QkFBeUIsRUFBRTtBQUNwRCxRQUFNLGFBQWEsTUFBTSxRQUFRLGdCQUFnQixJQUFJLG1CQUFtQixDQUFDO0FBQ3pFLFFBQU0sUUFBUSxXQUFXLEtBQUssQ0FBQyxVQUFpQztBQUM5RCxVQUFNLFlBQVksU0FBUyxPQUFPLFNBQVMsT0FBTyxLQUFLO0FBQ3ZELFdBQU8sY0FBYztBQUFBLEVBQ3ZCLENBQUM7QUFFRCxTQUFPLFNBQVMsT0FBTyxRQUFRLE9BQU8sSUFBSSxLQUFLO0FBQ2pEO0FBR08sSUFBTSwwQkFBMEIsQ0FBQyxTQUE0QztBQUNsRixRQUFNLGlCQUFpQixXQUFXLEtBQUssZUFBZTtBQUN0RCxRQUFNLG9CQUNKLE9BQU8sZ0JBQWdCLG9CQUFvQixZQUFZLGdCQUFnQixrQkFBa0IseUJBQXlCO0FBRXBILG9CQUFrQjtBQUFBLElBQ2hCLEdBQUc7QUFBQSxJQUNILE9BQU8sU0FBUyxLQUFLLFNBQVMsZ0JBQWdCLEtBQUs7QUFBQSxJQUNuRCxVQUFVLFNBQVMsS0FBSyxZQUFZLGdCQUFnQixRQUFRO0FBQUEsSUFDNUQsU0FBUyxTQUFTLEtBQUssV0FBVyxnQkFBZ0IsV0FBVyxnQkFBZ0I7QUFBQSxJQUM3RSxpQkFBaUIsa0JBQWtCO0FBQUEsRUFDckM7QUFFQSxrQkFBZ0I7QUFDaEIscUJBQW1CO0FBQ25CLG1CQUFpQjtBQUNqQiwwQkFBd0IsTUFBTTtBQUM5QiwwQkFBd0IsTUFBTTtBQUNoQztBQUdPLElBQU0sZ0NBQWdDLENBQUMsU0FBb0Q7QUFDaEcsU0FBTztBQUFBLElBQ0wsY0FBYyxTQUFTLEtBQUssWUFBWTtBQUFBLElBQ3hDLGFBQWEsU0FBUyxLQUFLLFdBQVc7QUFBQSxJQUN0QyxvQkFBb0IsaUJBQWlCLEtBQUssa0JBQWtCO0FBQUEsSUFDNUQsUUFBUSxTQUFTLEtBQUssTUFBTTtBQUFBLElBQzVCLFNBQVMsU0FBUyxLQUFLLE9BQU87QUFBQSxJQUM5QixRQUFRLFNBQVMsS0FBSyxNQUFNO0FBQUEsSUFDNUIsY0FBYyxTQUFTLEtBQUssWUFBWTtBQUFBLElBQ3hDLGFBQWEsaUJBQWlCLEtBQUssV0FBVztBQUFBLElBQzlDLFVBQVUsaUJBQWlCLEtBQUssUUFBUTtBQUFBLElBQ3hDLGtCQUFrQixpQkFBaUIsS0FBSyxnQkFBZ0I7QUFBQSxJQUN4RCxhQUFhLFNBQVMsS0FBSyxXQUFXO0FBQUEsRUFDeEM7QUFDRjtBQUdPLElBQU0sd0JBQXdCLENBQUMsVUFBcUQ7QUFDekYsU0FBTztBQUFBLElBQ0wsY0FBYyxTQUFTLE1BQU0sWUFBWTtBQUFBLElBQ3pDLGFBQWEsU0FBUyxNQUFNLFdBQVc7QUFBQSxJQUN2QyxRQUFRLFNBQVMsTUFBTSxNQUFNO0FBQUEsSUFDN0Isb0JBQW9CLGlCQUFpQixNQUFNLGtCQUFrQjtBQUFBLElBQzdELGNBQWMsU0FBUyxNQUFNLFlBQVk7QUFBQSxJQUN6QyxhQUFhLGlCQUFpQixNQUFNLFdBQVc7QUFBQSxJQUMvQyxVQUFVLFNBQVMsTUFBTSxRQUFRO0FBQUEsSUFDakMsa0JBQWtCLGlCQUFpQixNQUFNLGdCQUFnQjtBQUFBLElBQ3pELFFBQVEsU0FBUyxNQUFNLE1BQU07QUFBQSxJQUM3QixTQUFTLFNBQVMsTUFBTSxPQUFPO0FBQUEsSUFDL0IsYUFBYSxTQUFTLE1BQU0sV0FBVztBQUFBLEVBQ3pDO0FBQ0Y7QUFHTyxJQUFNLHNCQUFzQixDQUFDLFNBQWdEO0FBQ2xGLFFBQU0sZ0JBQWdCLFNBQVMsS0FBSyxTQUFTO0FBQzdDLFFBQU0sY0FBZSxLQUE2QjtBQUVsRCxTQUFPO0FBQUEsSUFDTCxXQUFXLFNBQVMsS0FBSyxLQUFLO0FBQUEsSUFDOUIsV0FBVyxTQUFTLEtBQUssU0FBUztBQUFBLElBQ2xDO0FBQUEsSUFDQSxXQUFXLGlCQUFpQixhQUFhO0FBQUEsSUFDekMsYUFBYSxTQUFTLEtBQUssV0FBVztBQUFBLElBQ3RDLGVBQWUsZUFBZSxLQUFLLGFBQWE7QUFBQSxJQUNoRCxRQUFRLGVBQWUsS0FBSyxNQUFNO0FBQUEsSUFDbEMsT0FBTyxpQkFBaUIsS0FBSyxTQUFTLFdBQVc7QUFBQSxJQUNqRCxLQUFLLGlCQUFpQixLQUFLLEdBQUc7QUFBQSxJQUM5QixRQUFRLGlCQUFpQixLQUFLLE1BQU07QUFBQSxJQUNwQyxRQUFRLFNBQVMsS0FBSyxNQUFNO0FBQUEsSUFDNUIsZ0JBQWdCLFNBQVMsS0FBSyxjQUFjO0FBQUEsRUFDOUM7QUFDRjtBQUdPLElBQU0sd0JBQXdCLE9BQ25DLFNBQ0EsWUFDdUQ7QUFDdkQsTUFBSSxRQUFRLHVCQUF1QixVQUFhLENBQUMsOEJBQThCLFFBQVEsa0JBQWtCLEdBQUc7QUFDMUcsVUFBTSxJQUFJLGNBQWMsd0RBQXdEO0FBQUEsRUFDbEY7QUFFQSxRQUFNLFVBQVUsTUFBTSx3QkFBd0IsT0FBTztBQUNyRCxNQUFJO0FBQ0YsVUFBTSxXQUFXLE1BQU0sVUFBcUQsK0JBQStCO0FBQUEsTUFDekcsR0FBRztBQUFBLE1BQ0gsUUFBUTtBQUFBLE1BQ1IsU0FBUyxvQkFBb0IsU0FBUyxTQUFTLElBQUk7QUFBQSxNQUNuRCxNQUFNLEtBQUssVUFBVSxPQUFPO0FBQUEsSUFDOUIsQ0FBQztBQUVELFdBQU8sMkJBQTJCLFFBQVE7QUFBQSxFQUM1QyxTQUFTLE9BQU87QUFDZCxRQUFJLENBQUMsd0JBQXdCLEtBQUssR0FBRztBQUNuQyxZQUFNO0FBQUEsSUFDUjtBQUVBLFVBQU0saUJBQWlCLE1BQU0sVUFBcUMsNkJBQTZCO0FBQUEsTUFDN0YsR0FBRztBQUFBLE1BQ0gsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLFFBQ1AsR0FBRyxnQkFBZ0IsU0FBUyxPQUFPO0FBQUEsUUFDbkMsR0FBRztBQUFBLE1BQ0w7QUFBQSxNQUNBLE1BQU0sS0FBSyxVQUFVLDJCQUEyQixPQUFPLENBQUM7QUFBQSxJQUMxRCxDQUFDO0FBRUQsVUFBTSxTQUFTO0FBQUEsTUFDYjtBQUFBLE1BQ0EsT0FBTyxTQUFTLFFBQVEsSUFBSSxLQUFLLFFBQVEsT0FBTyxJQUFJLFFBQVEsT0FBTztBQUFBLE1BQ25FLE9BQU8sU0FBUyxRQUFRLFFBQVEsS0FBSyxRQUFRLFdBQVcsSUFBSSxRQUFRLFdBQVc7QUFBQSxJQUNqRjtBQUVBLFdBQU8sMkJBQTJCLE1BQU07QUFBQSxFQUMxQztBQUNGO0FBR08sSUFBTSwwQkFBMEIsT0FDckMsY0FDQSxZQUNxRDtBQUNyRCxRQUFNLFVBQVUsTUFBTSx3QkFBd0IsT0FBTztBQUNyRCxRQUFNLGNBQWMsbUJBQW1CLE9BQU8sZ0JBQWdCLEVBQUUsRUFBRSxLQUFLLENBQUM7QUFDeEUsUUFBTSxXQUFXLE1BQU0sVUFBbUQsMEJBQTBCLFdBQVcsSUFBSTtBQUFBLElBQ2pILEdBQUc7QUFBQSxJQUNILFFBQVE7QUFBQSxJQUNSLFNBQVMsb0JBQW9CLFNBQVMsT0FBTztBQUFBLEVBQy9DLENBQUM7QUFFRCxTQUFPLDZCQUE2QixRQUFRO0FBQzlDO0FBR08sSUFBTSw0QkFBNEIsT0FDdkMsWUFDdUQ7QUFDdkQsTUFBSSxVQUFvQztBQUN4QyxNQUFJO0FBQ0YsY0FBVSxNQUFNLHdCQUF3QixPQUFPO0FBQUEsRUFDakQsU0FBUyxPQUFPO0FBQ2QsUUFBSSxFQUFFLGlCQUFpQixnQkFBZ0I7QUFDckMsWUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBRUEsUUFBTSxZQUFZLFNBQVMsU0FBUyxhQUFhLDBCQUEwQixDQUFDLEVBQUUsWUFBWTtBQUMxRixRQUFNLFdBQVcsYUFBYTtBQUU5QixNQUFJLHdCQUF3QixJQUFJLFFBQVEsR0FBRztBQUN6QyxXQUFPLHdCQUF3QixJQUFJLFFBQVE7QUFBQSxFQUM3QztBQUVBLE1BQUksd0JBQXdCLElBQUksUUFBUSxHQUFHO0FBQ3pDLFdBQU8sd0JBQXdCLElBQUksUUFBUTtBQUFBLEVBQzdDO0FBRUEsUUFBTSxrQkFBa0IsWUFBWTtBQUNsQyxVQUFNLFVBQVUsZ0JBQWdCLFNBQVMsT0FBTztBQUNoRCxzQkFBa0IsU0FBUyxlQUFlO0FBQzFDLHNCQUFrQixTQUFTLGdCQUFnQjtBQUUzQyxRQUFJLFdBQVc7QUFDYixjQUFRLGVBQWUsSUFBSTtBQUFBLElBQzdCO0FBRUEsUUFBSTtBQUNGLFlBQU0sV0FBVyxNQUFNLFVBQXFELHFDQUFxQztBQUFBLFFBQy9HLEdBQUc7QUFBQSxRQUNILFFBQVE7QUFBQSxRQUNSO0FBQUEsTUFDRixDQUFDO0FBRUQsWUFBTSxxQkFBcUIsK0JBQStCLFFBQVE7QUFDbEUsVUFBSSxtQkFBbUIsU0FBUztBQUM5QixnQ0FBd0IsSUFBSSxVQUFVLGtCQUFrQjtBQUFBLE1BQzFEO0FBRUEsYUFBTztBQUFBLElBQ1QsU0FBUyxPQUFPO0FBQ2QsVUFBSSxDQUFDLHdCQUF3QixLQUFLLEdBQUc7QUFDbkMsY0FBTTtBQUFBLE1BQ1I7QUFFQSxZQUFNLHFCQUFxQixNQUFNLFVBQXFDLDZCQUE2QjtBQUFBLFFBQ2pHLEdBQUc7QUFBQSxRQUNILFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxVQUNQLEdBQUcsZ0JBQWdCLFNBQVMsT0FBTztBQUFBLFVBQ25DLEdBQUc7QUFBQSxRQUNMO0FBQUEsUUFDQSxNQUFNLEtBQUssVUFBVTtBQUFBLFVBQ25CLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLFlBQVk7QUFBQSxVQUNaLFVBQVU7QUFBQSxVQUNWLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxVQUNYLGNBQWM7QUFBQSxVQUNkLE1BQU07QUFBQSxVQUNOLFVBQVU7QUFBQSxRQUNaLENBQUM7QUFBQSxNQUNILENBQUM7QUFFRCxZQUFNLFlBQVksb0JBQUksSUFBWTtBQUNsQyxZQUFNLGNBQWMsTUFBTSxRQUFRLG1CQUFtQixLQUFLLElBQUksbUJBQW1CLFFBQVEsQ0FBQztBQUMxRixZQUFNLGdCQUEyQyxZQUM5QyxJQUFJLENBQUMsVUFBVSxTQUFTLE1BQU0sWUFBWSxFQUFFLFlBQVksQ0FBQyxFQUN6RCxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUN2QixPQUFPLENBQUMsU0FBUztBQUNoQixZQUFJLFVBQVUsSUFBSSxJQUFJLEVBQUcsUUFBTztBQUNoQyxrQkFBVSxJQUFJLElBQUk7QUFDbEIsZUFBTztBQUFBLE1BQ1QsQ0FBQyxFQUNBLElBQUksQ0FBQyxVQUFVO0FBQUEsUUFDZCxjQUFjO0FBQUEsUUFDZCxpQkFBaUI7QUFBQSxNQUNuQixFQUFFO0FBRUosWUFBTSxtQkFBOEQ7QUFBQSxRQUNsRSxTQUFTLG1CQUFtQixZQUFZO0FBQUEsUUFDeEMsU0FBUyxTQUFTLG1CQUFtQixPQUFPLEtBQUs7QUFBQSxRQUNqRCxPQUFPLGNBQWM7QUFBQSxRQUNyQixNQUFNO0FBQUEsUUFDTixVQUFVLGNBQWM7QUFBQSxRQUN4QixPQUFPO0FBQUEsUUFDUCxTQUFTO0FBQUEsTUFDWDtBQUVBLFlBQU0scUJBQXFCLCtCQUErQixnQkFBZ0I7QUFDMUUsVUFBSSxtQkFBbUIsU0FBUztBQUM5QixnQ0FBd0IsSUFBSSxVQUFVLGtCQUFrQjtBQUFBLE1BQzFEO0FBRUEsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGLEdBQUc7QUFFSCwwQkFBd0IsSUFBSSxVQUFVLGNBQWM7QUFDcEQsTUFBSTtBQUNGLFdBQU8sTUFBTTtBQUFBLEVBQ2YsVUFBRTtBQUNBLDRCQUF3QixPQUFPLFFBQVE7QUFBQSxFQUN6QztBQUNGO0FBR08sSUFBTSxxQ0FBcUMsT0FBTyxZQUErQztBQUN0RyxNQUFJO0FBQ0YsVUFBTSxVQUFVLE1BQU0sd0JBQXdCLE9BQU87QUFDckQsV0FBTyxTQUFTLFFBQVEsbUJBQW1CLEVBQUUsWUFBWTtBQUFBLEVBQzNELFFBQVE7QUFDTixXQUFPO0FBQUEsRUFDVDtBQUNGO0FBR08sSUFBTSxrQkFBa0IsT0FDN0IsY0FDQSxnQkFDQSxNQUNBLFlBQzZDO0FBQzdDLFFBQU0sUUFBUSxpQkFBaUIsT0FBTztBQUN0QyxRQUFNLHlCQUF5QixTQUFTLFlBQVksRUFBRSxZQUFZO0FBQ2xFLFFBQU0sMkJBQTJCLFNBQVMsY0FBYyxFQUFFLFlBQVk7QUFDdEUsUUFBTSxpQkFBaUIsU0FBUyxJQUFJO0FBQ3BDLFFBQU0sUUFBUSxJQUFJLGdCQUFnQjtBQUVsQyxRQUFNLElBQUksZ0JBQWdCLHNCQUFzQjtBQUNoRCxRQUFNLElBQUksa0JBQWtCLHdCQUF3QjtBQUNwRCxNQUFJLGdCQUFnQjtBQUNsQixVQUFNLElBQUksUUFBUSxjQUFjO0FBQUEsRUFDbEM7QUFFQSxRQUFNLFVBQVUsZ0JBQWdCLFNBQVMsT0FBTztBQUNoRCxNQUFJLE9BQU87QUFDVCxZQUFRLGdCQUFnQixVQUFVLEtBQUs7QUFBQSxFQUN6QztBQUVBLFNBQU8sVUFBMkMsNkJBQTZCLE1BQU0sU0FBUyxDQUFDLElBQUk7QUFBQSxJQUNqRyxHQUFHO0FBQUEsSUFDSCxRQUFRO0FBQUEsSUFDUjtBQUFBLEVBQ0YsQ0FBQztBQUNIO0FBR08sSUFBTSxpQkFBaUIsT0FDNUIsV0FDQSxZQUM0QztBQUM1QyxRQUFNLFVBQVUsTUFBTSx3QkFBd0IsT0FBTztBQUNyRCxRQUFNLGlCQUFpQixTQUFTLFNBQVM7QUFDekMsUUFBTSxRQUFRLElBQUksZ0JBQWdCO0FBRWxDLFFBQU0sSUFBSSxhQUFhLGNBQWM7QUFFckMsUUFBTSxXQUFXLE1BQU07QUFBQSxJQUNyQix3Q0FBd0MsTUFBTSxTQUFTLENBQUM7QUFBQSxJQUN4RDtBQUFBLE1BQ0UsR0FBRztBQUFBLE1BQ0gsUUFBUTtBQUFBLE1BQ1IsU0FBUyxvQkFBb0IsU0FBUyxPQUFPO0FBQUEsSUFDL0M7QUFBQSxFQUNGO0FBRUEsU0FBTyxxQkFBcUIsUUFBUTtBQUN0QztBQUdPLElBQU0scUJBQXFCLE9BQ2hDLFNBQ0EsWUFDNEQ7QUFDNUQsUUFBTSxVQUFVLE1BQU0sd0JBQXdCLE9BQU87QUFDckQsUUFBTSxPQUFPLFFBQVEsUUFBUTtBQUM3QixRQUFNLFFBQVEsTUFBTSxRQUFRLFFBQVEsS0FBSyxJQUFJLFFBQVEsUUFBUSxDQUFDO0FBQzlELFFBQU0sd0JBQXdCLE1BQU0sS0FBSyxDQUFDLFNBQVM7QUFDakQsV0FDRSxDQUFDLFNBQVMsS0FBSyxTQUFTLEtBQ3hCLENBQUMsT0FBTyxVQUFVLE9BQU8sS0FBSyxTQUFTLENBQUMsS0FDeEMsT0FBTyxLQUFLLFNBQVMsS0FBSyxLQUMxQixDQUFDLGlCQUFpQixLQUFLLEdBQUcsS0FDMUIsQ0FBQyxpQkFBaUIsS0FBSyxLQUFLO0FBQUEsRUFFaEMsQ0FBQztBQUVELE1BQUksUUFBUSx1QkFBdUIsVUFBYSxDQUFDLG9CQUFvQixRQUFRLGtCQUFrQixHQUFHO0FBQ2hHLFVBQU0sSUFBSSxjQUFjLG1EQUFtRDtBQUFBLEVBQzdFO0FBRUEsTUFBSSxRQUFRLHFCQUFxQixVQUFhLENBQUMsb0JBQW9CLFFBQVEsZ0JBQWdCLEdBQUc7QUFDNUYsVUFBTSxJQUFJLGNBQWMsaURBQWlEO0FBQUEsRUFDM0U7QUFFQSxNQUFJLFFBQVEscUJBQXFCLFVBQWEsUUFBUSx1QkFBdUIsUUFBVztBQUN0RixVQUFNLElBQUksY0FBYywrQ0FBK0M7QUFBQSxFQUN6RTtBQUVBLE1BQUksdUJBQXVCO0FBQ3pCLFVBQU0sSUFBSSxjQUFjLGlFQUFpRTtBQUFBLEVBQzNGO0FBRUEsTUFBSSxTQUFTLEdBQUc7QUFDZCxRQUFJLENBQUMsU0FBUyxRQUFRLFdBQVcsS0FBSyxDQUFDLFNBQVMsUUFBUSxZQUFZLEtBQUssTUFBTSxTQUFTLEdBQUc7QUFDekYsWUFBTSxJQUFJLGNBQWMsb0NBQW9DO0FBQUEsSUFDOUQ7QUFBQSxFQUNGO0FBRUEsTUFBSSxTQUFTLEdBQUc7QUFDZCxRQUFJLENBQUMsU0FBUyxRQUFRLFdBQVcsS0FBSyxDQUFDLFNBQVMsUUFBUSxZQUFZLEdBQUc7QUFDckUsWUFBTSxJQUFJLGNBQWMsb0NBQW9DO0FBQUEsSUFDOUQ7QUFFQSxRQUFJLE1BQU0sU0FBUyxHQUFHO0FBQ3BCLFlBQU0sSUFBSSxjQUFjLDRDQUE0QztBQUFBLElBQ3RFO0FBQUEsRUFDRjtBQUVBLE1BQUksU0FBUyxHQUFHO0FBQ2QsUUFBSSxDQUFDLFNBQVMsUUFBUSxvQkFBb0IsS0FBSyxNQUFNLFNBQVMsR0FBRztBQUMvRCxZQUFNLElBQUksY0FBYyxvQ0FBb0M7QUFBQSxJQUM5RDtBQUFBLEVBQ0Y7QUFFQSxRQUFNLG9CQUErQztBQUFBLElBQ25ELEdBQUc7QUFBQSxJQUNIO0FBQUEsSUFDQSxzQkFBc0IsU0FBUyxRQUFRLG9CQUFvQixLQUFLO0FBQUEsSUFDaEUsYUFBYSxTQUFTLFFBQVEsV0FBVyxLQUFLO0FBQUEsSUFDOUMsY0FBYyxTQUFTLFFBQVEsWUFBWSxLQUFLO0FBQUEsSUFDaEQsUUFBUSxTQUFTLFFBQVEsTUFBTSxLQUFLO0FBQUEsSUFDcEMsT0FBTyxTQUFTLElBQUksQ0FBQyxJQUFJO0FBQUEsRUFDM0I7QUFFQSxRQUFNLFdBQVcsTUFBTSxVQUEwRCwwQkFBMEI7QUFBQSxJQUN6RyxHQUFHO0FBQUEsSUFDSCxRQUFRO0FBQUEsSUFDUixTQUFTLG9CQUFvQixTQUFTLFNBQVMsSUFBSTtBQUFBLElBQ25ELE1BQU0sS0FBSyxVQUFVLGlCQUFpQjtBQUFBLEVBQ3hDLENBQUM7QUFFRCxTQUFPLHFCQUFxQixRQUFRO0FBQ3RDO0FBR08sSUFBTSwyQkFBMkIsT0FDdEMsY0FDQSxTQUNBLFlBQ3NEO0FBQ3RELFFBQU0sVUFBVSxNQUFNLHdCQUF3QixPQUFPO0FBQ3JELFFBQU0sY0FBYyxtQkFBbUIsT0FBTyxnQkFBZ0IsRUFBRSxFQUFFLEtBQUssQ0FBQztBQUV4RSxNQUFJLFFBQVEsdUJBQXVCLFVBQWEsQ0FBQyxvQkFBb0IsUUFBUSxrQkFBa0IsR0FBRztBQUNoRyxVQUFNLElBQUksY0FBYyxtREFBbUQ7QUFBQSxFQUM3RTtBQUVBLE1BQUksUUFBUSxxQkFBcUIsVUFBYSxDQUFDLG9CQUFvQixRQUFRLGdCQUFnQixHQUFHO0FBQzVGLFVBQU0sSUFBSSxjQUFjLGlEQUFpRDtBQUFBLEVBQzNFO0FBRUEsTUFBSSxRQUFRLHFCQUFxQixVQUFhLFFBQVEsdUJBQXVCLFFBQVc7QUFDdEYsVUFBTSxJQUFJLGNBQWMsK0NBQStDO0FBQUEsRUFDekU7QUFFQSxRQUFNLFdBQVcsTUFBTSxVQUFvRCwwQkFBMEIsV0FBVyxJQUFJO0FBQUEsSUFDbEgsR0FBRztBQUFBLElBQ0gsUUFBUTtBQUFBLElBQ1IsU0FBUyxvQkFBb0IsU0FBUyxTQUFTLElBQUk7QUFBQSxJQUNuRCxNQUFNLEtBQUssVUFBVSxPQUFPO0FBQUEsRUFDOUIsQ0FBQztBQUVELFNBQU8scUJBQXFCLFFBQVE7QUFDdEM7QUFHTyxJQUFNLHFCQUFxQixPQUNoQyxjQUNBLFlBQ2tDO0FBQ2xDLFFBQU0sVUFBVSxNQUFNLHdCQUF3QixPQUFPO0FBQ3JELFFBQU0sY0FBYyxtQkFBbUIsT0FBTyxnQkFBZ0IsRUFBRSxFQUFFLEtBQUssQ0FBQztBQUN4RSxRQUFNLFdBQVcsTUFBTTtBQUFBLElBQ3JCLDBCQUEwQixXQUFXO0FBQUEsSUFDckM7QUFBQSxNQUNFLEdBQUc7QUFBQSxNQUNILFFBQVE7QUFBQSxNQUNSLFNBQVMsb0JBQW9CLFNBQVMsT0FBTztBQUFBLElBQy9DO0FBQUEsRUFDRjtBQUVBLFNBQU8scUJBQXFCLFFBQVE7QUFDdEM7QUFHTyxJQUFNLHlCQUF5QixPQUNwQyxjQUNBLFdBQ0EsU0FDQSxZQUNnRTtBQUNoRSxNQUNFLENBQUMsU0FBUyxRQUFRLFNBQVMsS0FDM0IsQ0FBQyxPQUFPLFVBQVUsT0FBTyxRQUFRLFNBQVMsQ0FBQyxLQUMzQyxPQUFPLFFBQVEsU0FBUyxLQUFLLEtBQzdCLENBQUMsaUJBQWlCLFFBQVEsR0FBRyxLQUM3QixDQUFDLGlCQUFpQixRQUFRLEtBQUssR0FDL0I7QUFDQSxVQUFNLElBQUksY0FBYywyREFBMkQ7QUFBQSxFQUNyRjtBQUVBLFFBQU0sVUFBVSxNQUFNLHdCQUF3QixPQUFPO0FBQ3JELFFBQU0sY0FBYyxtQkFBbUIsT0FBTyxnQkFBZ0IsRUFBRSxFQUFFLEtBQUssQ0FBQztBQUN4RSxRQUFNLGFBQWEsbUJBQW1CLE9BQU8sYUFBYSxFQUFFLEVBQUUsS0FBSyxDQUFDO0FBRXBFLFFBQU0sV0FBVyxNQUFNO0FBQUEsSUFDckIsMEJBQTBCLFdBQVcsVUFBVSxVQUFVO0FBQUEsSUFDekQ7QUFBQSxNQUNFLEdBQUc7QUFBQSxNQUNILFFBQVE7QUFBQSxNQUNSLFNBQVMsb0JBQW9CLFNBQVMsU0FBUyxJQUFJO0FBQUEsTUFDbkQsTUFBTSxLQUFLLFVBQVUsT0FBTztBQUFBLElBQzlCO0FBQUEsRUFDRjtBQUVBLFNBQU8scUJBQXFCLFFBQVE7QUFDdEM7QUFHTyxJQUFNLHlCQUF5QixPQUNwQyxjQUNBLFdBQ0EsWUFDa0M7QUFDbEMsUUFBTSxVQUFVLE1BQU0sd0JBQXdCLE9BQU87QUFDckQsUUFBTSxjQUFjLG1CQUFtQixPQUFPLGdCQUFnQixFQUFFLEVBQUUsS0FBSyxDQUFDO0FBQ3hFLFFBQU0sYUFBYSxtQkFBbUIsT0FBTyxhQUFhLEVBQUUsRUFBRSxLQUFLLENBQUM7QUFDcEUsUUFBTSxXQUFXLE1BQU07QUFBQSxJQUNyQiwwQkFBMEIsV0FBVyxVQUFVLFVBQVU7QUFBQSxJQUN6RDtBQUFBLE1BQ0UsR0FBRztBQUFBLE1BQ0gsUUFBUTtBQUFBLE1BQ1IsU0FBUyxvQkFBb0IsU0FBUyxPQUFPO0FBQUEsSUFDL0M7QUFBQSxFQUNGO0FBRUEsU0FBTyxxQkFBcUIsUUFBUTtBQUN0QztBQUdPLElBQU0sdUJBQXVCLE9BQ2xDLE1BQ0EsTUFDQSxVQUNBLFlBQ3FDO0FBQ3JDLFFBQU0sV0FBVyxtQkFBbUIsT0FBTyxRQUFRLEVBQUUsQ0FBQztBQUN0RCxRQUFNLFdBQVcsT0FBTyxTQUFTLElBQUksS0FBSyxPQUFPLElBQUksS0FBSyxNQUFNLElBQUksSUFBSTtBQUN4RSxRQUFNLGVBQWUsT0FBTyxTQUFTLFFBQVEsS0FBSyxXQUFXLElBQUksS0FBSyxNQUFNLFFBQVEsSUFBSTtBQUV4RixTQUFPO0FBQUEsSUFDTCx1Q0FBdUMsUUFBUSxTQUFTLFFBQVEsYUFBYSxZQUFZO0FBQUEsSUFDekY7QUFBQSxNQUNFLFFBQVE7QUFBQSxNQUNSLEdBQUc7QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUNGOzs7QUNqZ0NBLElBQU0sc0JBQXNCO0FBQUEsRUFDMUI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGO0FBRUEsSUFBTSxvQkFBb0IsQ0FBQyxXQUEyQjtBQUNwRCxRQUFNLFFBQVEsT0FBTyxVQUFVLEVBQUUsRUFBRSxLQUFLO0FBQ3hDLE1BQUksQ0FBQyxNQUFPLFFBQU87QUFDbkIsTUFBSSxZQUFZLEtBQUssS0FBSyxFQUFHLFFBQU87QUFDcEMsU0FBTztBQUNUO0FBRUEsSUFBTSxpQkFBaUIsQ0FBQyxXQUE0QixTQUFTLEtBQUssT0FBTyxVQUFVLEVBQUUsQ0FBQztBQUcvRSxJQUFNQSxZQUFXLENBQUMsVUFBMkI7QUFDbEQsTUFBSSxVQUFVLFFBQVEsVUFBVSxPQUFXLFFBQU87QUFDbEQsU0FBTyxPQUFPLEtBQUssRUFBRSxLQUFLO0FBQzVCO0FBR08sSUFBTSx5QkFBeUIsQ0FBQyxPQUFnQixXQUFXLFFBQWdCO0FBQ2hGLFFBQU0sU0FBU0EsVUFBUyxLQUFLO0FBQzdCLE1BQUksQ0FBQyxPQUFRLFFBQU87QUFFcEIsUUFBTSxhQUFhLG9CQUFvQixLQUFLLE1BQU07QUFDbEQsTUFBSSxDQUFDLFdBQVksUUFBTztBQUV4QixRQUFNLGFBQWEsV0FBVyxPQUFPLFlBQVksS0FBSyxXQUFXLE9BQU8sWUFBWTtBQUNwRixRQUFNLGFBQWEsV0FBVyxPQUFPLFlBQVksS0FBSyxXQUFXLE9BQU8sWUFBWTtBQUNwRixNQUFJLENBQUMsY0FBYyxDQUFDLFlBQVk7QUFDOUIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLFFBQVEsT0FBTyxZQUFZO0FBQ2pDLFNBQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQyxFQUFFLFlBQVksQ0FBQyxHQUFHLE1BQU0sTUFBTSxDQUFDLENBQUM7QUFDMUQ7QUFHTyxJQUFNLHFCQUFxQixDQUFDLFVBQTRCO0FBQzdELFFBQU0sVUFBVUEsVUFBUyxLQUFLLEVBQUUsWUFBWTtBQUM1QyxNQUFJLENBQUMsUUFBUyxRQUFPO0FBQ3JCLFNBQU8sWUFBWSxPQUFPLFlBQVksT0FBTyxZQUFZO0FBQzNEO0FBR08sSUFBTSxhQUFhLENBQUMsU0FBcUI7QUFDOUMsU0FBTyxJQUFJLEtBQUssS0FBSyxZQUFZLEdBQUcsS0FBSyxTQUFTLEdBQUcsS0FBSyxRQUFRLENBQUM7QUFDckU7QUFHTyxJQUFNLFlBQVksQ0FBQyxTQUF1QjtBQUMvQyxTQUFPLEdBQUcsS0FBSyxZQUFZLENBQUMsSUFBSSxPQUFPLEtBQUssU0FBUyxJQUFJLENBQUMsRUFBRSxTQUFTLEdBQUcsR0FBRyxDQUFDLElBQUksT0FBTyxLQUFLLFFBQVEsQ0FBQyxFQUFFLFNBQVMsR0FBRyxHQUFHLENBQUM7QUFDekg7QUFHTyxJQUFNLG1CQUFtQixDQUFDLFFBQThCO0FBQzdELE1BQUksQ0FBQyxJQUFLLFFBQU87QUFDakIsUUFBTSxRQUFRLE9BQU8sR0FBRyxFQUFFLEtBQUs7QUFDL0IsTUFBSSxDQUFDLE1BQU8sUUFBTztBQUVuQixRQUFNLFdBQVcsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUVqRCxNQUFJLDhCQUE4QixLQUFLLFFBQVEsR0FBRztBQUNoRCxVQUFNLENBQUMsS0FBSyxPQUFPLElBQUksSUFBSSxTQUFTLE1BQU0sT0FBTyxFQUFFLElBQUksTUFBTTtBQUM3RCxXQUFPLElBQUksS0FBSyxNQUFNLFFBQVEsR0FBRyxHQUFHO0FBQUEsRUFDdEM7QUFFQSxNQUFJLHNCQUFzQixLQUFLLFFBQVEsR0FBRztBQUN4QyxVQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxTQUFTLE1BQU0sR0FBRyxFQUFFLElBQUksTUFBTTtBQUN6RCxXQUFPLElBQUksS0FBSyxNQUFNLFFBQVEsR0FBRyxHQUFHO0FBQUEsRUFDdEM7QUFFQSxNQUFJLDhCQUE4QixLQUFLLFFBQVEsR0FBRztBQUNoRCxVQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxTQUFTLE1BQU0sT0FBTyxFQUFFLElBQUksTUFBTTtBQUM3RCxXQUFPLElBQUksS0FBSyxNQUFNLFFBQVEsR0FBRyxHQUFHO0FBQUEsRUFDdEM7QUFFQSxNQUFJLFVBQVUsS0FBSyxRQUFRLEdBQUc7QUFDNUIsVUFBTSxPQUFPLE9BQU8sU0FBUyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ3hDLFVBQU0sUUFBUSxPQUFPLFNBQVMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUN6QyxVQUFNLE1BQU0sT0FBTyxTQUFTLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDdkMsV0FBTyxJQUFJLEtBQUssTUFBTSxRQUFRLEdBQUcsR0FBRztBQUFBLEVBQ3RDO0FBRUEsUUFBTSxTQUFTLElBQUksS0FBSyxLQUFLO0FBQzdCLFNBQU8sT0FBTyxNQUFNLE9BQU8sUUFBUSxDQUFDLElBQUksT0FBTztBQUNqRDtBQUdPLElBQU0sMkJBQTJCLENBQUMsS0FBYyxTQUFTLFNBQVMsV0FBVyxRQUFnQjtBQUNsRyxRQUFNLE9BQU8saUJBQWlCLEdBQUc7QUFDakMsTUFBSSxDQUFDLEtBQU0sUUFBTztBQUVsQixRQUFNLGFBQWEsa0JBQWtCLE1BQU07QUFDM0MsTUFBSSxlQUFlLFVBQVUsR0FBRztBQUM5QixXQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsSUFBSSxvQkFBb0IsS0FBSyxTQUFTLENBQUMsQ0FBQyxJQUFJLEtBQUssWUFBWSxDQUFDLEdBQUcsWUFBWTtBQUFBLEVBQ3ZHO0FBRUEsU0FBTyxLQUNKLG1CQUFtQixZQUFZO0FBQUEsSUFDOUIsS0FBSztBQUFBLElBQ0wsT0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLEVBQ1IsQ0FBQyxFQUNBLFFBQVEsT0FBTyxFQUFFLEVBQ2pCLFlBQVk7QUFDakI7QUFHTyxJQUFNLHlCQUF5QixDQUFDLEtBQWMsU0FBUyxZQUE4QjtBQUMxRixRQUFNLE9BQU8saUJBQWlCLEdBQUc7QUFDakMsTUFBSSxDQUFDLE1BQU07QUFDVCxXQUFPLEVBQUUsTUFBTSxJQUFJLE9BQU8sSUFBSSxLQUFLLEtBQUs7QUFBQSxFQUMxQztBQUVBLFNBQU87QUFBQSxJQUNMLE1BQU0sT0FBTyxLQUFLLFlBQVksQ0FBQztBQUFBLElBQy9CLE9BQU8sS0FBSyxtQkFBbUIsUUFBUSxFQUFFLE9BQU8sUUFBUSxDQUFDLEVBQUUsUUFBUSxPQUFPLEVBQUUsRUFBRSxZQUFZO0FBQUEsSUFDMUYsS0FBSyxPQUFPLEtBQUssUUFBUSxDQUFDLEVBQUUsU0FBUyxHQUFHLEdBQUc7QUFBQSxFQUM3QztBQUNGOzs7QUNsSU8sSUFBTSw0QkFBNEIsQ0FBQyxXQUEwQjtBQUNsRSxTQUFPLDBCQUEwQixNQUFNO0FBQ3pDO0FBR08sSUFBTSw4QkFBOEIsTUFBWTtBQUNyRCxTQUFPLDRCQUE0QjtBQUNyQztBQUdPLElBQU0sdUJBQXVCLENBQ2xDLFFBQ0EsVUFBb0MsQ0FBQyxNQUM1QjtBQUNULFFBQU0sRUFBRSxrQkFBa0IsT0FBTyxRQUFRLElBQUk7QUFDN0MsTUFBSSxtQkFBbUIsT0FBTyxPQUFPLDJCQUEyQixZQUFZO0FBQzFFLFdBQU8sdUJBQXVCLFFBQVEsT0FBTztBQUM3QztBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1Q7QUFHTyxJQUFNLHVCQUF1QixDQUNsQyxXQUNBLFVBQW9DLENBQUMsTUFDNUI7QUFDVCxRQUFNLFVBQVUsT0FBTyxhQUFhLEVBQUUsRUFBRSxLQUFLO0FBQzdDLE1BQUksQ0FBQyxRQUFTO0FBRWQsUUFBTSxFQUFFLGtCQUFrQixLQUFLLElBQUk7QUFDbkMsdUJBQXFCLE1BQU07QUFDekIsUUFBSSxpQkFBaUI7QUFDbkIsYUFBTyxpQ0FBaUM7QUFBQSxJQUMxQztBQUNBLFdBQU8sU0FBUyxPQUFPO0FBQUEsRUFDekIsR0FBRyxPQUFPO0FBQ1o7OztBQzdDQSxJQUFBQyxnQkFBbUM7OztBQ0FuQyxtQkFBeUU7QUF5UWpFO0FBbE9SLElBQU0sZ0JBQWdCLENBQUMsVUFBc0Q7QUFDM0UsUUFBTSxNQUFNLG9CQUFJLElBQWdDO0FBQ2hELGFBQVcsUUFBUSxTQUFTLENBQUMsR0FBRztBQUM5QixVQUFNLE1BQU0sT0FBTyxLQUFLLFNBQVMsRUFBRSxFQUFFLEtBQUs7QUFDMUMsUUFBSSxDQUFDLElBQUs7QUFDVixRQUFJLElBQUksSUFBSSxHQUFHLEVBQUc7QUFDbEIsUUFBSSxJQUFJLEtBQUs7QUFBQSxNQUNYLE9BQU87QUFBQSxNQUNQLE9BQU8sT0FBTyxLQUFLLFNBQVMsRUFBRSxFQUFFLEtBQUs7QUFBQSxNQUNyQyxVQUFVLE9BQU8sS0FBSyxZQUFZLEVBQUUsRUFBRSxLQUFLO0FBQUEsSUFDN0MsQ0FBQztBQUFBLEVBQ0g7QUFDQSxTQUFPLE1BQU0sS0FBSyxJQUFJLE9BQU8sQ0FBQztBQUNoQztBQUdBLElBQU0sdUJBQXVCLENBQUM7QUFBQSxFQUM1QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0Esa0JBQWtCO0FBQUEsRUFDbEIsV0FBVztBQUFBLEVBQ1gsbUJBQW1CO0FBQUEsRUFDbkIsYUFBYTtBQUFBLEVBQ2IsaUJBQWlCO0FBQUEsRUFDakIsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsWUFBWTtBQUFBLEVBQ1osaUJBQWlCO0FBQ25CLE1BQWlDO0FBQy9CLFFBQU0sZUFBZSxZQUFZO0FBQ2pDLFFBQU0sYUFBYSxlQUFlLFlBQVk7QUFDOUMsUUFBTSxDQUFDLE9BQU8sUUFBUSxRQUFJLHVCQUFTLFNBQVMsRUFBRTtBQUM5QyxRQUFNLENBQUMsU0FBUyxVQUFVLFFBQUksdUJBQStCLENBQUMsQ0FBQztBQUMvRCxRQUFNLENBQUMsTUFBTSxPQUFPLFFBQUksdUJBQVMsS0FBSztBQUN0QyxRQUFNLENBQUMsU0FBUyxVQUFVLFFBQUksdUJBQVMsS0FBSztBQUM1QyxRQUFNLENBQUMsYUFBYSxjQUFjLFFBQUksdUJBQVMsQ0FBQztBQUNoRCxRQUFNLENBQUMsa0JBQWtCLG1CQUFtQixRQUFJLHVCQUFTLEVBQUU7QUFDM0QsUUFBTSxDQUFDLGFBQWEsY0FBYyxRQUFJLHVCQUFTLENBQUM7QUFDaEQsUUFBTSxDQUFDLFNBQVMsVUFBVSxRQUFJLHVCQUFTLEtBQUs7QUFFNUMsUUFBTSxlQUFXLHFCQUErQixJQUFJO0FBQ3BELFFBQU0sdUJBQW1CLHFCQUFPLEtBQUs7QUFDckMsUUFBTSxtQkFBZSxxQkFBOEIsSUFBSTtBQUN2RCxRQUFNLGFBQVMscUJBQThCLElBQUk7QUFDakQsUUFBTSxjQUFVLHFCQUE4QixJQUFJO0FBRWxELGtCQUFnQixDQUFDLGNBQWMsT0FBTyxHQUFHLE1BQU0sUUFBUSxLQUFLLENBQUM7QUFFN0QsOEJBQVUsTUFBTTtBQUNkLGFBQVMsU0FBUyxFQUFFO0FBQUEsRUFDdEIsR0FBRyxDQUFDLEtBQUssQ0FBQztBQUVWLDhCQUFVLE1BQU07QUFDZCxXQUFPLE1BQU07QUFDWCxlQUFTLFNBQVMsTUFBTTtBQUN4QixlQUFTLFVBQVU7QUFBQSxJQUNyQjtBQUFBLEVBQ0YsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLGVBQVcsc0JBQVEsTUFBTTtBQUM3QixRQUFJLENBQUMsTUFBTSxLQUFLLEVBQUcsUUFBTztBQUMxQixVQUFNLElBQUksTUFBTSxLQUFLLEVBQUUsWUFBWTtBQUNuQyxXQUFPLFFBQVEsT0FBTyxDQUFDLFdBQVc7QUFDaEMsWUFBTSxZQUFZLE9BQU8sTUFBTSxZQUFZO0FBQzNDLFlBQU0sWUFBWSxPQUFPLE9BQU8sU0FBUyxFQUFFLEVBQUUsWUFBWTtBQUN6RCxZQUFNLGVBQWUsT0FBTyxPQUFPLFlBQVksRUFBRSxFQUFFLFlBQVk7QUFDL0QsYUFBTyxVQUFVLFNBQVMsQ0FBQyxLQUFLLFVBQVUsU0FBUyxDQUFDLEtBQUssYUFBYSxTQUFTLENBQUM7QUFBQSxJQUNsRixDQUFDO0FBQUEsRUFDSCxHQUFHLENBQUMsU0FBUyxLQUFLLENBQUM7QUFFbkIsOEJBQVUsTUFBTTtBQUNkLFFBQUksaUJBQWlCLFNBQVM7QUFDNUI7QUFBQSxJQUNGO0FBRUEsbUJBQWUsQ0FBQztBQUFBLEVBQ2xCLEdBQUcsQ0FBQyxTQUFTLFFBQVEsS0FBSyxDQUFDO0FBRTNCLFFBQU0sb0JBQWdCO0FBQUEsSUFDcEIsQ0FBQyxTQUEwQjtBQUN6QixZQUFNLFVBQVUsS0FBSyxLQUFLO0FBQzFCLFVBQUksQ0FBQyxRQUFTLFFBQU87QUFDckIsYUFBTyxRQUFRLFVBQVU7QUFBQSxJQUMzQjtBQUFBLElBQ0EsQ0FBQyxrQkFBa0IsZUFBZTtBQUFBLEVBQ3BDO0FBRUEsUUFBTSxvQkFBZ0I7QUFBQSxJQUNwQixPQUFPLE1BQWMsTUFBYyxXQUFvQjtBQUNyRCxlQUFTLFNBQVMsTUFBTTtBQUN4QixZQUFNLGFBQWEsSUFBSSxnQkFBZ0I7QUFDdkMsZUFBUyxVQUFVO0FBQ25CLHVCQUFpQixVQUFVO0FBQzNCLGlCQUFXLElBQUk7QUFFZixZQUFNLFVBQVUsS0FBSyxZQUFZO0FBQ2pDLFVBQUk7QUFDRixZQUFJLGNBQWM7QUFDaEIsZ0JBQU0sV0FBVyxNQUFNLGFBQWEsTUFBTSxNQUFNLFVBQVUsV0FBVyxNQUFNO0FBQzNFLGdCQUFNLFlBQVksY0FBYyxNQUFNLFFBQVEsVUFBVSxLQUFLLElBQUksU0FBUyxRQUFRLENBQUMsQ0FBQztBQUNwRixxQkFBVyxDQUFDLGFBQWMsU0FBUyxjQUFjLENBQUMsR0FBSSxZQUFZLENBQUMsR0FBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLFNBQVU7QUFDbEcseUJBQWUsSUFBSTtBQUVuQixnQkFBTSxXQUFXLE9BQU8sVUFBVSxLQUFLO0FBQ3ZDLGNBQUksT0FBTyxTQUFTLFFBQVEsS0FBSyxXQUFXLEdBQUc7QUFDN0MsdUJBQVcsT0FBTyxXQUFXLFFBQVE7QUFBQSxVQUN2QyxPQUFPO0FBQ0wsdUJBQVcsVUFBVSxVQUFVLFFBQVE7QUFBQSxVQUN6QztBQUFBLFFBQ0YsT0FBTztBQUNMLGdCQUFNLFdBQVcsTUFBTSxTQUFTLE1BQU0sV0FBVyxNQUFNO0FBQ3ZELGdCQUFNLE9BQU8sY0FBYyxZQUFZLENBQUMsQ0FBQztBQUN6QyxxQkFBVyxJQUFJO0FBQ2YseUJBQWUsQ0FBQztBQUNoQixxQkFBVyxLQUFLO0FBQUEsUUFDbEI7QUFFQSw0QkFBb0IsT0FBTztBQUMzQixnQkFBUSxJQUFJO0FBQUEsTUFDZCxRQUFRO0FBQ04sWUFBSSxDQUFDLFFBQVE7QUFDWCxxQkFBVyxDQUFDLENBQUM7QUFDYix5QkFBZSxDQUFDO0FBQ2hCLHFCQUFXLEtBQUs7QUFBQSxRQUNsQjtBQUNBLDRCQUFvQixPQUFPO0FBQzNCLGdCQUFRLElBQUk7QUFBQSxNQUNkLFVBQUU7QUFDQSxZQUFJLFNBQVMsWUFBWSxZQUFZO0FBQ25DLG1CQUFTLFVBQVU7QUFBQSxRQUNyQjtBQUNBLHlCQUFpQixVQUFVO0FBQzNCLG1CQUFXLEtBQUs7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLENBQUMsVUFBVSxjQUFjLFFBQVE7QUFBQSxFQUNuQztBQUVBLFFBQU0sZ0JBQVksMEJBQVksWUFBWTtBQUN4QyxRQUFJLGdCQUFnQixRQUFTO0FBQzdCLFVBQU0sT0FBTyxNQUFNLEtBQUs7QUFDeEIsVUFBTSxVQUFVLEtBQUssWUFBWTtBQUVqQyxRQUFJLENBQUMsY0FBYyxJQUFJLEdBQUc7QUFDeEIsaUJBQVcsQ0FBQyxDQUFDO0FBQ2IscUJBQWUsQ0FBQztBQUNoQixpQkFBVyxLQUFLO0FBQ2hCLGNBQVEsS0FBSztBQUNiLDBCQUFvQixFQUFFO0FBQ3RCO0FBQUEsSUFDRjtBQUVBLFFBQUksWUFBWSxvQkFBb0IsUUFBUSxTQUFTLEtBQUssQ0FBQyxjQUFjO0FBQ3ZFLGNBQVEsSUFBSTtBQUNaO0FBQUEsSUFDRjtBQUVBLFVBQU0sY0FBYyxNQUFNLEdBQUcsS0FBSztBQUFBLEVBQ3BDLEdBQUcsQ0FBQyxlQUFlLGVBQWUsa0JBQWtCLFNBQVMsY0FBYyxRQUFRLFFBQVEsT0FBTyxZQUFZLENBQUM7QUFFL0csUUFBTSxrQkFBYywwQkFBWSxZQUFZO0FBQzFDLFFBQUksZ0JBQWdCLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTO0FBQzNFO0FBQUEsSUFDRjtBQUVBLFVBQU0sT0FBTyxNQUFNLEtBQUs7QUFDeEIsVUFBTSxVQUFVLEtBQUssWUFBWTtBQUNqQyxRQUFJLFlBQVksa0JBQWtCO0FBQ2hDO0FBQUEsSUFDRjtBQUVBLFVBQU0sV0FBVyxjQUFjO0FBQy9CLFFBQUksWUFBWSxHQUFHO0FBQ2pCO0FBQUEsSUFDRjtBQUVBLFVBQU0sY0FBYyxNQUFNLFVBQVUsSUFBSTtBQUFBLEVBQzFDLEdBQUcsQ0FBQyxhQUFhLGVBQWUsU0FBUyxnQkFBZ0Isa0JBQWtCLFNBQVMsY0FBYyxPQUFPLFlBQVksQ0FBQztBQUV0SCw4QkFBVSxNQUFNO0FBQ2QsUUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFnQjtBQUMvQyxVQUFNLFdBQVcsUUFBUSxTQUFTO0FBQ2xDLFFBQUksQ0FBQyxTQUFVO0FBRWYsVUFBTSxXQUFXLE1BQU07QUFDckIsVUFBSSxXQUFXLENBQUMsUUFBUztBQUN6QixZQUFNLFlBQVk7QUFDbEIsWUFBTSxlQUFlLFNBQVMsWUFBWSxTQUFTLGdCQUFnQixTQUFTLGVBQWU7QUFDM0YsVUFBSSxjQUFjO0FBQ2hCLGFBQUssWUFBWTtBQUFBLE1BQ25CO0FBQUEsSUFDRjtBQUVBLGFBQVMsaUJBQWlCLFVBQVUsVUFBVSxFQUFFLFNBQVMsS0FBSyxDQUFDO0FBQy9ELFdBQU8sTUFBTTtBQUNYLGVBQVMsb0JBQW9CLFVBQVUsUUFBUTtBQUFBLElBQ2pEO0FBQUEsRUFDRixHQUFHLENBQUMsU0FBUyxnQkFBZ0IsU0FBUyxjQUFjLE1BQU0sV0FBVyxDQUFDO0FBRXRFLFFBQU0sZUFBZSxDQUFDLFdBQStCO0FBQ25ELFVBQU0sWUFBWSxPQUFPLE9BQU8sU0FBUyxFQUFFLEVBQUUsS0FBSztBQUNsRCxhQUFTLFNBQVM7QUFDbEIsYUFBUyxTQUFTO0FBQ2xCLHdCQUFvQixVQUFVLFlBQVksQ0FBQztBQUMzQyxZQUFRLEtBQUs7QUFBQSxFQUNmO0FBRUEsUUFBTSxXQUFXLE1BQU0sS0FBSyxFQUFFLFlBQVk7QUFDMUMsUUFBTSxpQkFDSixDQUFDLGdCQUNELENBQUMsV0FDRCxjQUFjLEtBQUssS0FDbkIsYUFBYTtBQUVmLFFBQU0sU0FBUyxHQUFHLE1BQU07QUFDeEIsUUFBTSxXQUFXLFFBQVEsU0FBUyxXQUFXLElBQUksR0FBRyxNQUFNLFFBQVEsU0FBUyxXQUFXLEVBQUUsS0FBSyxLQUFLO0FBQ2xHLFFBQU0sdUJBQXVCLFdBQVcsU0FBUyxXQUFXO0FBRTVELFNBQ0UsNkNBQUMsU0FBSSxXQUFVLGFBQVksS0FBSyxjQUM3QjtBQUFBLGdCQUNDLDRDQUFDLFdBQU0sV0FBVSw0QkFBMkIsT0FBTyxFQUFFLE9BQU8sWUFBWSxHQUNyRSxpQkFDSCxJQUNFO0FBQUEsSUFDSiw2Q0FBQyxTQUFJLFdBQVUsWUFDYjtBQUFBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxLQUFLO0FBQUEsVUFDTCxXQUFXO0FBQUEsWUFDVDtBQUFBLFlBQ0EsZUFBZSx1QkFBdUI7QUFBQSxVQUN4QztBQUFBLFVBRUE7QUFBQTtBQUFBLGNBQUM7QUFBQTtBQUFBLGdCQUNDLFdBQVc7QUFBQSxrQkFDVDtBQUFBLGtCQUNBO0FBQUEsa0JBQ0EsZUFBZSx1QkFBdUI7QUFBQSxnQkFDeEM7QUFBQSxnQkFDQSxPQUFPLEVBQUUsT0FBTyxXQUFXO0FBQUEsZ0JBQzNCLE9BQU87QUFBQSxnQkFDUCxVQUFVLENBQUMsVUFBVTtBQUNuQix3QkFBTSxZQUFZLE1BQU0sT0FBTztBQUMvQiwyQkFBUyxTQUFTO0FBQ2xCLDJCQUFTLFNBQVM7QUFDbEIsc0JBQUksVUFBVSxLQUFLLEVBQUUsWUFBWSxNQUFNLGtCQUFrQjtBQUN2RCw0QkFBUSxLQUFLO0FBQUEsa0JBQ2Y7QUFBQSxnQkFDRjtBQUFBLGdCQUNBLFNBQVMsTUFBTTtBQUNiLHNCQUFJLENBQUMsZ0JBQWdCLFNBQVMsU0FBUyxHQUFHO0FBQ3hDLDRCQUFRLElBQUk7QUFBQSxrQkFDZDtBQUFBLGdCQUNGO0FBQUEsZ0JBQ0EsV0FBVyxDQUFDLFVBQ1Ysc0JBQXNCLE9BQU87QUFBQSxrQkFDM0IsUUFBUTtBQUFBLGtCQUNSO0FBQUEsa0JBQ0EsYUFBYSxTQUFTO0FBQUEsa0JBQ3RCO0FBQUEsa0JBQ0EsaUJBQWlCLE1BQU07QUFDckIsd0JBQUksU0FBUyxTQUFTLEdBQUc7QUFDdkIsbUNBQWEsU0FBUyxXQUFXLEtBQUssU0FBUyxDQUFDLENBQUM7QUFDakQ7QUFBQSxvQkFDRjtBQUNBLHlCQUFLLFVBQVU7QUFBQSxrQkFDakI7QUFBQSxrQkFDQSxtQkFBbUIsTUFBTTtBQUN2Qix5QkFBSyxVQUFVO0FBQUEsa0JBQ2pCO0FBQUEsa0JBQ0EsYUFBYTtBQUFBLGdCQUNmLENBQUM7QUFBQSxnQkFFSDtBQUFBLGdCQUNBO0FBQUEsZ0JBQ0E7QUFBQSxnQkFDQSxjQUFZO0FBQUEsZ0JBQ1osTUFBSztBQUFBLGdCQUNMLGlCQUFlO0FBQUEsZ0JBQ2YsaUJBQWU7QUFBQSxnQkFDZix5QkFBdUI7QUFBQTtBQUFBLFlBQ3pCO0FBQUEsWUFFQSw2Q0FBQyxTQUFJLFdBQVUsMkRBQ1o7QUFBQSx3QkFDQyw0Q0FBQyxVQUFLLFdBQVUsNEJBQTJCLGVBQVksUUFDckQsc0RBQUMsbUJBQVEsTUFBSyxXQUFVLEdBQzFCLElBQ0U7QUFBQSxjQUVILGlCQUNDO0FBQUEsZ0JBQUM7QUFBQTtBQUFBLGtCQUNDLE1BQUs7QUFBQSxrQkFDTCxXQUFVO0FBQUEsa0JBQ1YsU0FBUyxNQUFNO0FBQ2IseUJBQUssVUFBVTtBQUFBLGtCQUNqQjtBQUFBLGtCQUNBLGNBQVksS0FBSyxpQkFBaUIsUUFBUTtBQUFBLGtCQUMxQyxVQUFVO0FBQUEsa0JBRVYsc0RBQUMsU0FBSSxPQUFNLDhCQUE2QixNQUFLLFFBQU8sU0FBUSxhQUFZLGFBQWEsS0FBSyxRQUFPLGdCQUFlLFdBQVUsV0FDeEgsc0RBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLGtJQUFpSSxHQUN4TDtBQUFBO0FBQUEsY0FDRixJQUNFO0FBQUEsY0FFSjtBQUFBLGdCQUFDO0FBQUE7QUFBQSxrQkFDQyxNQUFLO0FBQUEsa0JBQ0wsV0FBVTtBQUFBLGtCQUNWLFNBQVMsTUFBTTtBQUNiLHdCQUFJLGFBQWM7QUFDbEIsd0JBQUksTUFBTTtBQUNSLDhCQUFRLEtBQUs7QUFDYjtBQUFBLG9CQUNGO0FBQ0Esd0JBQUksU0FBUyxTQUFTLEdBQUc7QUFDdkIsOEJBQVEsSUFBSTtBQUNaO0FBQUEsb0JBQ0Y7QUFFQSx3QkFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLFlBQVk7QUFDL0IsMkJBQUssVUFBVTtBQUFBLG9CQUNqQjtBQUFBLGtCQUNGO0FBQUEsa0JBQ0EsY0FBWSxPQUFPLEtBQUssd0JBQXdCLGNBQWMsSUFBSSxLQUFLLHdCQUF3QixjQUFjO0FBQUEsa0JBQzdHLFVBQVU7QUFBQSxrQkFFVCxpQkFBTyw0Q0FBQyxnQkFBYSxXQUFVLFdBQVUsSUFBSyw0Q0FBQyxrQkFBZSxXQUFVLFdBQVU7QUFBQTtBQUFBLGNBQ3JGO0FBQUEsZUFDRjtBQUFBO0FBQUE7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsV0FBVztBQUFBLFVBQ1g7QUFBQSxVQUNBLFFBQVE7QUFBQSxVQUNSLGdCQUFlO0FBQUEsVUFDZixNQUFLO0FBQUEsVUFDTCxjQUFhO0FBQUEsVUFDYjtBQUFBLFVBRUEsc0RBQUMsU0FBSSxJQUFJLFFBQVEsS0FBSyxTQUNuQixpQ0FDQyw0Q0FBQyxTQUFJLFdBQVUsb0NBQW9DLGVBQUssa0JBQWtCLFNBQVMsR0FBRSxJQUNuRixTQUFTLFdBQVcsSUFDdEIsNENBQUMsU0FBSSxXQUFVLG9DQUFvQyxlQUFLLGlCQUFpQixTQUFTLEdBQUUsSUFFcEYsNEVBQ0c7QUFBQSxxQkFBUyxJQUFJLENBQUMsUUFBUSxVQUFVO0FBQy9CLG9CQUFNLFdBQVcsVUFBVTtBQUMzQixvQkFBTSxXQUFXLE9BQU8sU0FBUyxHQUFHLEtBQUs7QUFDekMscUJBQ0U7QUFBQSxnQkFBQztBQUFBO0FBQUEsa0JBQ0MsTUFBSztBQUFBLGtCQUVMLElBQUksR0FBRyxNQUFNLFFBQVEsUUFBUTtBQUFBLGtCQUM3QixNQUFLO0FBQUEsa0JBQ0wsaUJBQWU7QUFBQSxrQkFDZixXQUFXO0FBQUEsb0JBQ1Q7QUFBQSxvQkFDQSxXQUFXLDBCQUEwQjtBQUFBLGtCQUN2QztBQUFBLGtCQUNBLGNBQWMsTUFBTSxlQUFlLEtBQUs7QUFBQSxrQkFDeEMsU0FBUyxNQUFNLGFBQWEsTUFBTTtBQUFBLGtCQUVsQyx1REFBQyxVQUFLLFdBQVUsaUJBQ2Q7QUFBQSxnRUFBQyxVQUFLLFdBQVUsZUFBZSxpQkFBTyxTQUFTLE9BQU8sT0FBTTtBQUFBLG9CQUMzRCxPQUFPLFdBQ04sNENBQUMsVUFBSyxXQUFXLFdBQVcsV0FBVyxXQUFXLGtCQUFrQixnQkFBZ0IsR0FBSSxpQkFBTyxVQUFTLElBQ3RHO0FBQUEscUJBQ047QUFBQTtBQUFBLGdCQWhCSztBQUFBLGNBaUJQO0FBQUEsWUFFSixDQUFDO0FBQUEsWUFDQSxVQUNDLDRDQUFDLFNBQUksV0FBVSw4REFBOEQsZUFBSyxrQkFBa0IsU0FBUyxHQUFFLElBQzdHO0FBQUEsYUFDTixHQUVKO0FBQUE7QUFBQSxNQUNGO0FBQUEsT0FDRjtBQUFBLEtBQ0Y7QUFFSjtBQUVBLElBQU8sK0JBQVE7OztBRDlXWCxJQUFBQyxzQkFBQTtBQWpESixJQUFNLG1CQUFtQjtBQUV6QixJQUFNLG9CQUFvQixDQUFDLFVBQXNGO0FBQy9HLFVBQVEsTUFBTSxRQUFRLEtBQUssSUFBSSxRQUFRLENBQUMsR0FDckMsSUFBSSxDQUFDLFNBQVM7QUFDYixVQUFNLFlBQVksT0FBTyxNQUFNLFNBQVMsRUFBRSxFQUFFLEtBQUs7QUFDakQsUUFBSSxDQUFDLFVBQVcsUUFBTztBQUN2QixVQUFNLFdBQVcsT0FBTyxNQUFNLFFBQVEsRUFBRSxFQUFFLEtBQUs7QUFDL0MsV0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsVUFBVSxZQUFZO0FBQUEsSUFDeEI7QUFBQSxFQUNGLENBQUMsRUFDQSxPQUFPLE9BQU87QUFDbkI7QUFHQSxJQUFNLDRCQUE0QixDQUFDO0FBQUEsRUFDakM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLFdBQVc7QUFBQSxFQUNYLFdBQVc7QUFBQSxFQUNYLFlBQVk7QUFDZCxNQUFzQztBQUNwQyxRQUFNLGtCQUFjLDJCQUFZLE9BQU8sTUFBYyxXQUF1RDtBQUMxRyxVQUFNLFdBQVcsTUFBTSxxQkFBcUIsTUFBTSxHQUFHLGtCQUFrQjtBQUFBLE1BQ3JFO0FBQUEsTUFDQSx5QkFBeUI7QUFBQSxJQUMzQixDQUFDO0FBRUQsV0FBTyxrQkFBa0IsVUFBVSxLQUFLO0FBQUEsRUFDMUMsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLHNCQUFrQiwyQkFBWSxPQUFPLE1BQWMsTUFBYyxVQUFrQixXQUF3QjtBQUMvRyxVQUFNLFdBQVcsTUFBTSxxQkFBcUIsTUFBTSxNQUFNLFVBQVU7QUFBQSxNQUNoRTtBQUFBLE1BQ0EseUJBQXlCO0FBQUEsSUFDM0IsQ0FBQztBQUVELFdBQU87QUFBQSxNQUNMLE9BQU8sa0JBQWtCLFVBQVUsS0FBSztBQUFBLE1BQ3hDLE9BQU8sT0FBTyxVQUFVLFNBQVMsQ0FBQztBQUFBLElBQ3BDO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUVMLFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSxVQUFVO0FBQUEsTUFDVixjQUFjO0FBQUEsTUFDZCxRQUFPO0FBQUEsTUFDUCxpQkFBaUI7QUFBQSxNQUNqQixVQUFVO0FBQUEsTUFDVixrQkFBZ0I7QUFBQSxNQUNoQixZQUFVO0FBQUEsTUFDVixnQkFBYztBQUFBLE1BQ2Q7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsZ0JBQWU7QUFBQTtBQUFBLEVBQ2pCO0FBRUo7QUFFQSxJQUFPLG9DQUFROyIsCiAgIm5hbWVzIjogWyJzYWZlVGV4dCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
