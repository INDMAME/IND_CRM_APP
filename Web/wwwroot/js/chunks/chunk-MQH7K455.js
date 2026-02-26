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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9leHBlbnNlRm9ybWF0dGVycy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VBcGkudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlVWlVdGlscy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlUHJvamVjdEZpbHRlcklucHV0LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL1JlbW90ZVNlYXJjaENvbWJvYm94LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gRm9ybWF0cyBhIG51bWVyaWMgYW1vdW50IHVzaW5nIHRoZSBwcm92aWRlZCBjdXJyZW5jeSBjb2RlIHdoZW4gcG9zc2libGUuXG5leHBvcnQgY29uc3QgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5ID0gKFxuICBhbW91bnQ6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQsXG4gIGN1cnJlbmN5Q29kZT86IHN0cmluZyxcbiAgbG9jYWxlPzogc3RyaW5nXG4pOiBzdHJpbmcgPT4ge1xuICBpZiAoYW1vdW50ID09PSBudWxsIHx8IGFtb3VudCA9PT0gdW5kZWZpbmVkIHx8IE51bWJlci5pc05hTihOdW1iZXIoYW1vdW50KSkpIHtcbiAgICByZXR1cm4gXCItXCI7XG4gIH1cblxuICBjb25zdCBzYWZlTG9jYWxlID1cbiAgICBsb2NhbGUgfHxcbiAgICAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nXG4gICAgICA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nXG4gICAgICA6IFwiZXMtRVNcIik7XG4gIGNvbnN0IHNhZmVDdXJyZW5jeSA9IFN0cmluZyhjdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XG5cbiAgaWYgKHNhZmVDdXJyZW5jeSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KHNhZmVMb2NhbGUsIHtcbiAgICAgICAgc3R5bGU6IFwiY3VycmVuY3lcIixcbiAgICAgICAgY3VycmVuY3k6IHNhZmVDdXJyZW5jeSxcbiAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgICB9KS5mb3JtYXQoYW1vdW50KTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIEZhbGwgdGhyb3VnaCB0byBkZWNpbWFsIGZhbGxiYWNrIHdoZW4gY3VycmVuY3kgY29kZSBpcyBpbnZhbGlkLlxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRlY2ltYWxUZXh0ID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KHNhZmVMb2NhbGUsIHtcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICB9KS5mb3JtYXQoYW1vdW50KTtcblxuICByZXR1cm4gc2FmZUN1cnJlbmN5ID8gYCR7ZGVjaW1hbFRleHR9ICR7c2FmZUN1cnJlbmN5fWAgOiBkZWNpbWFsVGV4dDtcbn07XG4iLCAiaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciwgZmV0Y2hKc29uLCB0eXBlIEFwaUZldGNoT3B0aW9ucyB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgdHlwZSB7XG4gIEVudHJhQ29udGV4dER0byxcbiAgRW50cmFDb250ZXh0UmVxdWVzdCxcbiAgRXhjaGFuZ2VSYXRlRHRvLFxuICBGdWVsUHJpY2VLbUR0byxcbiAgRXhwZW5zZVNoZWV0Q2FyZCxcbiAgRXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8sXG4gIEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldENyZWF0ZVJlc3BvbnNlRGF0YSxcbiAgRXhwZW5zZVNoZWV0RGV0YWlsRHRvLFxuICBFeHBlbnNlU2hlZXRIZWFkZXIsXG4gIEV4cGVuc2VTaGVldEhlYWRlclVwZGF0ZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldExpbmUsXG4gIEV4cGVuc2VTaGVldExpbmVEdG8sXG4gIEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVzcG9uc2VEYXRhLFxuICBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8sXG4gIEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvLFxuICBJbmRBcGlSZXNwb25zZSxcbiAgSW5kUGFnZWRSZXNwb25zZSxcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuXG50eXBlIFByb2plY3REcm9wZG93blJlc3BvbnNlID0ge1xuICB0b3RhbD86IG51bWJlcjtcbiAgaXRlbXM/OiBBcnJheTx7IHZhbHVlPzogc3RyaW5nOyB0ZXh0Pzogc3RyaW5nIH0+O1xufTtcblxudHlwZSBMZWdhY3lFeHBlbnNlTGlzdEl0ZW0gPSB7XG4gIGhvamFHYXN0b3NJZD86IHVua25vd247XG4gIGRlc2NyaXB0aW9uPzogdW5rbm93bjtcbiAgZXN0YWRvQ29tZW50YXJpb3M/OiB1bmtub3duO1xuICB2b3VjaGVyPzogdW5rbm93bjtcbiAgcHJvaklkPzogdW5rbm93bjtcbiAgY3VycmVuY3lDb2RlPzogdW5rbm93bjtcbiAgdG90YWxBbW91bnQ/OiB1bmtub3duO1xuICB0b3RhbEFtb3VudE1TVD86IHVua25vd247XG4gIGV4Y2hSYXRlPzogdW5rbm93bjtcbiAgdXNlcklkPzogdW5rbm93bjtcbiAgZXhjaGFuZ2VSYXRlTW9kZT86IHVua25vd247XG4gIGV4cGVuc2VTaGVldFN0YXR1cz86IHVua25vd247XG4gIGNyZWF0ZWREYXRlPzogdW5rbm93bjtcbn07XG5cbnR5cGUgTGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZSA9IHtcbiAgc3VjY2Vzcz86IGJvb2xlYW47XG4gIG1lc3NhZ2U/OiBzdHJpbmc7XG4gIHRvdGFsPzogbnVtYmVyO1xuICBwYWdlPzogbnVtYmVyO1xuICBwYWdlU2l6ZT86IG51bWJlcjtcbiAgaXRlbXM/OiBMZWdhY3lFeHBlbnNlTGlzdEl0ZW1bXTtcbn07XG5cbnR5cGUgRXhwZW5zZUFwaUNvbnRleHQgPSB7XG4gIHRva2VuOiBzdHJpbmc7XG4gIGNvbXBhbnlJZDogc3RyaW5nO1xuICBheFVzZXJJZDogc3RyaW5nO1xuICBkZWZhdWx0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGJvb2xlYW47XG59O1xuXG50eXBlIEV4cGVuc2VBcGlBdXRoU2VlZCA9IHtcbiAgdG9rZW46IHN0cmluZztcbiAgZW50cmFPaWQ6IHN0cmluZztcbiAgYXBwQ29kZTogc3RyaW5nO1xuICBzdHJpY3RBcGlSb3V0ZXM6IGJvb2xlYW47XG59O1xuXG50eXBlIEV4cGVuc2VXaW5kb3dSdW50aW1lID0ge1xuICBfX0lORF9BUElfVE9LRU5fXz86IHN0cmluZztcbiAgX19JTkRfRU5UUkFfT0lEX18/OiBzdHJpbmc7XG4gIF9fSU5EX0FQUF9DT0RFX18/OiBzdHJpbmc7XG4gIF9fSU5EX1NFTEVDVEVEX0NPTVBBTllfXz86IHN0cmluZztcbiAgX19JTkRfRVhQRU5TRV9TVFJJQ1RfQVBJX18/OiBib29sZWFuIHwgc3RyaW5nO1xuICBfX0VYUEVOU0VfR0FTVE9fVFlQRVNfXz86IEFycmF5PHtcbiAgICB2YWx1ZT86IHVua25vd247XG4gICAgVmFsdWU/OiB1bmtub3duO1xuICAgIHRleHQ/OiB1bmtub3duO1xuICAgIFRleHQ/OiB1bmtub3duO1xuICB9Pjtcbn07XG5cbnR5cGUgRXhwZW5zZUdhc3RvVHlwZUVudHJ5ID0gTm9uTnVsbGFibGU8RXhwZW5zZVdpbmRvd1J1bnRpbWVbXCJfX0VYUEVOU0VfR0FTVE9fVFlQRVNfX1wiXT5bbnVtYmVyXTtcblxuY29uc3QgREVGQVVMVF9BUFBfQ09ERSA9IFwiQ1JNXCI7XG5jb25zdCBKU09OX0hFQURFUlM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxufTtcblxubGV0IHJ1bnRpbWVBdXRoU2VlZDogUGFydGlhbDxFeHBlbnNlQXBpQXV0aFNlZWQ+ID0ge307XG5sZXQgY2FjaGVkQ29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQgfCBudWxsID0gbnVsbDtcbmxldCBjYWNoZWRDb250ZXh0S2V5ID0gXCJcIjtcbmxldCBjb250ZXh0UHJvbWlzZTogUHJvbWlzZTxFeHBlbnNlQXBpQ29udGV4dD4gfCBudWxsID0gbnVsbDtcbmNvbnN0IGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzID0gbmV3IE1hcDxzdHJpbmcsIEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+PigpO1xuY29uc3QgcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMgPSBuZXcgTWFwPHN0cmluZywgUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj4+KCk7XG5cbmNvbnN0IHNhZmVUZXh0ID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xuICByZXR1cm4gU3RyaW5nKHZhbHVlKS50cmltKCk7XG59O1xuXG5jb25zdCB0b051bGxhYmxlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpID8gcGFyc2VkIDogbnVsbDtcbn07XG5cbmNvbnN0IGlzTm9uTmVnYXRpdmVOdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcbiAgY29uc3QgcGFyc2VkID0gdG9OdWxsYWJsZU51bWJlcih2YWx1ZSk7XG4gIHJldHVybiBwYXJzZWQgIT09IG51bGwgJiYgcGFyc2VkID49IDA7XG59O1xuXG5jb25zdCBpc1Bvc2l0aXZlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHRvTnVsbGFibGVOdW1iZXIodmFsdWUpO1xuICByZXR1cm4gcGFyc2VkICE9PSBudWxsICYmIHBhcnNlZCA+IDA7XG59O1xuXG5jb25zdCBpc1ZhbGlkTGlzdEV4cGVuc2VTaGVldFN0YXR1cyA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBwYXJzZWQgPSB0b051bGxhYmxlTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIHBhcnNlZCAhPT0gbnVsbCAmJiBOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgJiYgcGFyc2VkID49IDAgJiYgcGFyc2VkIDw9IDQ7XG59O1xuXG5jb25zdCB0b051bGxhYmxlQm9vbCA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gfCBudWxsID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcImJvb2xlYW5cIikgcmV0dXJuIHZhbHVlO1xuICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IHZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmIChub3JtYWxpemVkID09PSBcInRydWVcIiB8fCBub3JtYWxpemVkID09PSBcIjFcIikgcmV0dXJuIHRydWU7XG4gICAgaWYgKG5vcm1hbGl6ZWQgPT09IFwiZmFsc2VcIiB8fCBub3JtYWxpemVkID09PSBcIjBcIikgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICBpZiAodmFsdWUgPT09IDEpIHJldHVybiB0cnVlO1xuICAgIGlmICh2YWx1ZSA9PT0gMCkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuY29uc3QgdG9GbGFnQm9vbCA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gfCBudWxsID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZEJvb2wgPSB0b051bGxhYmxlQm9vbCh2YWx1ZSk7XG4gIGlmIChub3JtYWxpemVkQm9vbCAhPT0gbnVsbCkgcmV0dXJuIG5vcm1hbGl6ZWRCb29sO1xuXG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHJldHVybiBudWxsO1xuICBjb25zdCBub3JtYWxpemVkID0gdmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIG51bGw7XG4gIGlmIChub3JtYWxpemVkID09PSBcIm9uXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJ5ZXNcIiB8fCBub3JtYWxpemVkID09PSBcInlcIikgcmV0dXJuIHRydWU7XG4gIGlmIChub3JtYWxpemVkID09PSBcIm9mZlwiIHx8IG5vcm1hbGl6ZWQgPT09IFwibm9cIiB8fCBub3JtYWxpemVkID09PSBcIm5cIikgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IHJlYWRFeHBlbnNlV2luZG93UnVudGltZSA9ICgpOiBFeHBlbnNlV2luZG93UnVudGltZSA9PiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4ge307XG4gIHJldHVybiB3aW5kb3cgYXMgdW5rbm93biBhcyBFeHBlbnNlV2luZG93UnVudGltZTtcbn07XG5cbmNvbnN0IHNhbml0aXplSGVhZGVycyA9IChoZWFkZXJzOiBIZWFkZXJzSW5pdCB8IHVuZGVmaW5lZCk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPT4ge1xuICBpZiAoIWhlYWRlcnMpIHJldHVybiB7fTtcblxuICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICBjb25zdCByZXN1bHQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcbiAgICBoZWFkZXJzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KGhlYWRlcnMpKSB7XG4gICAgcmV0dXJuIGhlYWRlcnMucmVkdWNlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+KChhY2MsIFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgYWNjW1N0cmluZyhrZXkpXSA9IFN0cmluZyh2YWx1ZSk7XG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbiAgfVxuXG4gIHJldHVybiBPYmplY3QuZW50cmllcyhoZWFkZXJzKS5yZWR1Y2U8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4oKGFjYywgW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHJldHVybiBhY2M7XG4gICAgYWNjW2tleV0gPSBTdHJpbmcodmFsdWUpO1xuICAgIHJldHVybiBhY2M7XG4gIH0sIHt9KTtcbn07XG5cbmNvbnN0IGdldEhlYWRlclZhbHVlID0gKGhlYWRlcnM6IEhlYWRlcnNJbml0IHwgdW5kZWZpbmVkLCBrZXk6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRLZXkgPSBrZXkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhzYW5pdGl6ZUhlYWRlcnMoaGVhZGVycykpO1xuICBjb25zdCBtYXRjaCA9IGVudHJpZXMuZmluZCgoW2hlYWRlcktleV0pID0+IGhlYWRlcktleS50cmltKCkudG9Mb3dlckNhc2UoKSA9PT0gbm9ybWFsaXplZEtleSk7XG4gIHJldHVybiBzYWZlVGV4dChtYXRjaD8uWzFdKTtcbn07XG5cbmNvbnN0IHJlbW92ZUhlYWRlclZhbHVlID0gKGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sIGtleTogc3RyaW5nKTogdm9pZCA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRLZXkgPSBrZXkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IHRvRGVsZXRlID0gT2JqZWN0LmtleXMoaGVhZGVycykuZmluZCgoaGVhZGVyS2V5KSA9PiBoZWFkZXJLZXkudHJpbSgpLnRvTG93ZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRLZXkpO1xuICBpZiAoIXRvRGVsZXRlKSByZXR1cm47XG4gIGRlbGV0ZSBoZWFkZXJzW3RvRGVsZXRlXTtcbn07XG5cbmNvbnN0IHJlc29sdmVCZWFyZXJUb2tlbiA9IChoZWFkZXJzOiBIZWFkZXJzSW5pdCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGF1dGhvcml6YXRpb24gPSBnZXRIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIkF1dGhvcml6YXRpb25cIik7XG4gIGlmICghYXV0aG9yaXphdGlvbikgcmV0dXJuIFwiXCI7XG5cbiAgaWYgKC9eYmVhcmVyXFxzKy9pLnRlc3QoYXV0aG9yaXphdGlvbikpIHtcbiAgICByZXR1cm4gYXV0aG9yaXphdGlvbi5yZXBsYWNlKC9eYmVhcmVyXFxzKy9pLCBcIlwiKS50cmltKCk7XG4gIH1cblxuICByZXR1cm4gYXV0aG9yaXphdGlvbi50cmltKCk7XG59O1xuXG5jb25zdCByZWFkV2luZG93QXV0aFNlZWQgPSAoKTogUGFydGlhbDxFeHBlbnNlQXBpQXV0aFNlZWQ+ID0+IHtcbiAgY29uc3QgcnVudGltZVdpbmRvdyA9IHJlYWRFeHBlbnNlV2luZG93UnVudGltZSgpO1xuXG4gIHJldHVybiB7XG4gICAgdG9rZW46IHNhZmVUZXh0KHJ1bnRpbWVXaW5kb3cuX19JTkRfQVBJX1RPS0VOX18pLFxuICAgIGVudHJhT2lkOiBzYWZlVGV4dChydW50aW1lV2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcbiAgICBhcHBDb2RlOiBzYWZlVGV4dChydW50aW1lV2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxuICAgIHN0cmljdEFwaVJvdXRlczogdG9GbGFnQm9vbChydW50aW1lV2luZG93Ll9fSU5EX0VYUEVOU0VfU1RSSUNUX0FQSV9fKSA9PT0gdHJ1ZSxcbiAgfTtcbn07XG5cbmNvbnN0IHJlYWRSdW50aW1lU3RyaWN0QXBpRmxhZyA9ICgpOiBib29sZWFuID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgcnVudGltZVdpbmRvdyA9IHJlYWRFeHBlbnNlV2luZG93UnVudGltZSgpO1xuXG4gIGNvbnN0IGV4cGxpY2l0V2luZG93RmxhZyA9IHRvRmxhZ0Jvb2wocnVudGltZVdpbmRvdy5fX0lORF9FWFBFTlNFX1NUUklDVF9BUElfXyk7XG4gIHJldHVybiBleHBsaWNpdFdpbmRvd0ZsYWcgPT09IHRydWU7XG59O1xuXG5jb25zdCByZWFkV2luZG93U2VsZWN0ZWRDb21wYW55ID0gKCk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBzYWZlVGV4dChyZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUoKS5fX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18pLnRvVXBwZXJDYXNlKCk7XG59O1xuXG5jb25zdCBidWlsZENvbnRleHRLZXkgPSAoc2VlZDogRXhwZW5zZUFwaUF1dGhTZWVkKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGAke3NlZWQudG9rZW59fCR7c2VlZC5lbnRyYU9pZH18JHtzZWVkLmFwcENvZGV9fCR7cmVhZFdpbmRvd1NlbGVjdGVkQ29tcGFueSgpfWA7XG59O1xuXG5jb25zdCBidWlsZEV4cGVuc2VIZWFkZXJzID0gKFxuICBjb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyxcbiAgaW5jbHVkZUpzb24gPSBmYWxzZSxcbiAgaW5jbHVkZUF4VXNlcklkID0gdHJ1ZVxuKTogSGVhZGVyc0luaXQgPT4ge1xuICBjb25zdCBiYXNlID0gc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpO1xuICBjb25zdCBtZXJnZWQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7IC4uLmJhc2UgfTtcblxuICBpZiAoc2FmZVRleHQoY29udGV4dC50b2tlbikpIHtcbiAgICBtZXJnZWQuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHtjb250ZXh0LnRva2VufWA7XG4gIH1cblxuICBpZiAoc2FmZVRleHQoY29udGV4dC5jb21wYW55SWQpKSB7XG4gICAgbWVyZ2VkW1wiWC1JTkQtQ29tcGFueVwiXSA9IGNvbnRleHQuY29tcGFueUlkO1xuICB9XG5cbiAgaWYgKGluY2x1ZGVBeFVzZXJJZCAmJiBzYWZlVGV4dChjb250ZXh0LmF4VXNlcklkKSkge1xuICAgIG1lcmdlZFtcIlgtSU5ELUF4VXNlcklkXCJdID0gY29udGV4dC5heFVzZXJJZDtcbiAgfVxuXG4gIGlmIChpbmNsdWRlSnNvbikge1xuICAgIG1lcmdlZFtcIkNvbnRlbnQtVHlwZVwiXSA9IFwiYXBwbGljYXRpb24vanNvblwiO1xuICB9XG5cbiAgcmV0dXJuIG1lcmdlZDtcbn07XG5cbmNvbnN0IGJ1aWxkQ29udGV4dEhlYWRlcnMgPSAodG9rZW46IHN0cmluZywgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IEhlYWRlcnNJbml0ID0+IHtcbiAgY29uc3QgYmFzZSA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcbiAgY29uc3QgbWVyZ2VkOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgIC4uLmJhc2UsXG4gICAgLi4uSlNPTl9IRUFERVJTLFxuICB9O1xuXG4gIGlmIChzYWZlVGV4dCh0b2tlbikpIHtcbiAgICBtZXJnZWQuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICB9XG5cbiAgcmV0dXJuIG1lcmdlZDtcbn07XG5cbmNvbnN0IHJlc29sdmVBdXRoVG9rZW4gPSAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHRva2VuRnJvbUhlYWRlcnMgPSByZXNvbHZlQmVhcmVyVG9rZW4ob3B0aW9ucz8uaGVhZGVycyk7XG4gIGNvbnN0IHdpbmRvd1NlZWQgPSByZWFkV2luZG93QXV0aFNlZWQoKTtcbiAgcmV0dXJuIHNhZmVUZXh0KHRva2VuRnJvbUhlYWRlcnMgfHwgcnVudGltZUF1dGhTZWVkLnRva2VuIHx8IHdpbmRvd1NlZWQudG9rZW4pO1xufTtcblxuY29uc3QgcmVzb2x2ZUF1dGhTZWVkID0gKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBFeHBlbnNlQXBpQXV0aFNlZWQgPT4ge1xuICBjb25zdCB3aW5kb3dTZWVkID0gcmVhZFdpbmRvd0F1dGhTZWVkKCk7XG4gIGNvbnN0IHRva2VuID0gcmVzb2x2ZUF1dGhUb2tlbihvcHRpb25zKTtcbiAgY29uc3QgZW50cmFPaWQgPSBzYWZlVGV4dChydW50aW1lQXV0aFNlZWQuZW50cmFPaWQgfHwgd2luZG93U2VlZC5lbnRyYU9pZCk7XG4gIGNvbnN0IGFwcENvZGUgPSBzYWZlVGV4dChydW50aW1lQXV0aFNlZWQuYXBwQ29kZSB8fCB3aW5kb3dTZWVkLmFwcENvZGUgfHwgREVGQVVMVF9BUFBfQ09ERSkgfHwgREVGQVVMVF9BUFBfQ09ERTtcbiAgY29uc3Qgc3RyaWN0QXBpUm91dGVzID1cbiAgICB0eXBlb2YgcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcyA9PT0gXCJib29sZWFuXCJcbiAgICAgID8gcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlc1xuICAgICAgOiAod2luZG93U2VlZC5zdHJpY3RBcGlSb3V0ZXMgPT09IHRydWUpO1xuXG4gIHJldHVybiB7XG4gICAgdG9rZW4sXG4gICAgZW50cmFPaWQsXG4gICAgYXBwQ29kZSxcbiAgICBzdHJpY3RBcGlSb3V0ZXMsXG4gIH07XG59O1xuXG5jb25zdCB2YWxpZGF0ZUNvbnRleHRSZXNwb25zZSA9IChyZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFbnRyYUNvbnRleHREdG8+KTogRXhwZW5zZUFwaUNvbnRleHQgPT4ge1xuICBpZiAoIXJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihyZXNwb25zZS5NZXNzYWdlIHx8IFwiQ291bGQgbm90IGxvYWQgRW50cmEgY29udGV4dC5cIik7XG4gIH1cblxuICBjb25zdCBmaXJzdCA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2UuSXRlbXMpID8gcmVzcG9uc2UuSXRlbXNbMF0gOiBudWxsO1xuICBpZiAoIWZpcnN0IHx8ICFmaXJzdC5IZWFkZXIpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkNvdWxkIG5vdCBsb2FkIEVudHJhIGNvbnRleHQuXCIpO1xuICB9XG5cbiAgY29uc3QgYXhVc2VySWQgPSBzYWZlVGV4dChmaXJzdC5IZWFkZXIuQXhVc2VySWQpO1xuICBjb25zdCBkZWZhdWx0Q29tcGFueSA9IHNhZmVUZXh0KGZpcnN0LkhlYWRlci5EZWZhdWx0Q29tcGFueSk7XG4gIGNvbnN0IGRlZmF1bHRDdXJyZW5jeUNvZGUgPSBzYWZlVGV4dChmaXJzdC5IZWFkZXIuRGVmYXVsdEN1cnJlbmN5Q29kZSk7XG4gIGNvbnN0IGNvbXBhbmllcyA9IEFycmF5LmlzQXJyYXkoZmlyc3QuQ29tcGFuaWVzKSA/IGZpcnN0LkNvbXBhbmllcyA6IFtdO1xuICBjb25zdCBmYWxsYmFja0NvbXBhbnkgPSBzYWZlVGV4dChjb21wYW5pZXMuZmluZCgoaXRlbSkgPT4gaXRlbS5Jc0RlZmF1bHQpPy5Db21wYW55SWQpO1xuICBjb25zdCBjb21wYW55SWQgPSBkZWZhdWx0Q29tcGFueSB8fCBmYWxsYmFja0NvbXBhbnk7XG4gIGNvbnN0IHNlbGVjdGVkQ29tcGFueSA9IGNvbXBhbmllcy5maW5kKChpdGVtKSA9PiBzYWZlVGV4dChpdGVtLkNvbXBhbnlJZCkgPT09IGNvbXBhbnlJZCkgfHwgY29tcGFuaWVzWzBdO1xuICBjb25zdCBhbGxvd1NlbGZNYW5hZ2VtZW50ID0gc2VsZWN0ZWRDb21wYW55Py5BbGxvd1NlbGZNYW5hZ2VtZW50ID09PSB0cnVlO1xuXG4gIGlmICghYXhVc2VySWQgfHwgIWNvbXBhbnlJZCkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiQ291bGQgbm90IHJlc29sdmUgRW50cmEgY29tcGFueSBjb250ZXh0LlwiKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG9rZW46IFwiXCIsXG4gICAgY29tcGFueUlkLFxuICAgIGF4VXNlcklkLFxuICAgIGRlZmF1bHRDdXJyZW5jeUNvZGUsXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcbiAgfTtcbn07XG5cbmNvbnN0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0ID0gYXN5bmMgKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBQcm9taXNlPEV4cGVuc2VBcGlDb250ZXh0PiA9PiB7XG4gIGNvbnN0IHNlZWQgPSByZXNvbHZlQXV0aFNlZWQob3B0aW9ucyk7XG4gIGNvbnN0IGNvbnRleHRLZXkgPSBidWlsZENvbnRleHRLZXkoc2VlZCk7XG5cbiAgaWYgKGNhY2hlZENvbnRleHQgJiYgY2FjaGVkQ29udGV4dEtleSA9PT0gY29udGV4dEtleSkge1xuICAgIHJldHVybiBjYWNoZWRDb250ZXh0O1xuICB9XG5cbiAgaWYgKGNvbnRleHRQcm9taXNlICYmIGNhY2hlZENvbnRleHRLZXkgPT09IGNvbnRleHRLZXkpIHtcbiAgICByZXR1cm4gY29udGV4dFByb21pc2U7XG4gIH1cblxuICBjb25zdCBmYWxsYmFja0NvbXBhbnlJZCA9IHJlYWRXaW5kb3dTZWxlY3RlZENvbXBhbnkoKTtcbiAgaWYgKCFzYWZlVGV4dChzZWVkLmVudHJhT2lkKSAmJiBmYWxsYmFja0NvbXBhbnlJZCkge1xuICAgIGNvbnN0IGZhbGxiYWNrQ29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQgPSB7XG4gICAgICB0b2tlbjogc2VlZC50b2tlbixcbiAgICAgIGNvbXBhbnlJZDogZmFsbGJhY2tDb21wYW55SWQsXG4gICAgICBheFVzZXJJZDogXCJcIixcbiAgICAgIGRlZmF1bHRDdXJyZW5jeUNvZGU6IFwiXCIsXG4gICAgICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBnbG9iYWxUaGlzLl9fSU5EX0FMTE9XX1NFTEZfTUFOQUdFTUVOVF9fID09PSB0cnVlLFxuICAgIH07XG5cbiAgICBjYWNoZWRDb250ZXh0ID0gZmFsbGJhY2tDb250ZXh0O1xuICAgIGNhY2hlZENvbnRleHRLZXkgPSBjb250ZXh0S2V5O1xuICAgIHJldHVybiBmYWxsYmFja0NvbnRleHQ7XG4gIH1cblxuICBpZiAoIXNhZmVUZXh0KHNlZWQuZW50cmFPaWQpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJNaXNzaW5nIEVudHJhIE9JRCBmb3IgRW50cmEgY29udGV4dCByZXF1ZXN0LlwiKTtcbiAgfVxuXG4gIGNhY2hlZENvbnRleHRLZXkgPSBjb250ZXh0S2V5O1xuICBjb250ZXh0UHJvbWlzZSA9IChhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgY29udGV4dFBheWxvYWQ6IEVudHJhQ29udGV4dFJlcXVlc3QgPSB7XG4gICAgICBlbnRyYU9pZDogc2VlZC5lbnRyYU9pZCxcbiAgICAgIGFwcENvZGU6IHNlZWQuYXBwQ29kZSxcbiAgICB9O1xuXG4gICAgY29uc3QgY29udGV4dFJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RW50cmFDb250ZXh0RHRvPj4oXCIvYXBpL2F1dGgvZW50cmEvY29udGV4dFwiLCB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkQ29udGV4dEhlYWRlcnMoc2VlZC50b2tlbiwgb3B0aW9ucyksXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjb250ZXh0UGF5bG9hZCksXG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNvbHZlZCA9IHZhbGlkYXRlQ29udGV4dFJlc3BvbnNlKGNvbnRleHRSZXNwb25zZSk7XG4gICAgY29uc3QgbmV4dENvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0ID0ge1xuICAgICAgLi4ucmVzb2x2ZWQsXG4gICAgICB0b2tlbjogc2VlZC50b2tlbixcbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHdpbmRvdy5fX0lORF9BTExPV19TRUxGX01BTkFHRU1FTlRfXyA9IG5leHRDb250ZXh0LmFsbG93U2VsZk1hbmFnZW1lbnQ7XG4gICAgfVxuXG4gICAgY2FjaGVkQ29udGV4dCA9IG5leHRDb250ZXh0O1xuICAgIHJldHVybiBuZXh0Q29udGV4dDtcbiAgfSkoKTtcblxuICB0cnkge1xuICAgIHJldHVybiBhd2FpdCBjb250ZXh0UHJvbWlzZTtcbiAgfSBmaW5hbGx5IHtcbiAgICBjb250ZXh0UHJvbWlzZSA9IG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz5cbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+ID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5yZXNwb25zZSxcbiAgICBJdGVtczogQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXSxcbiAgfTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UgPSAoXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldERldGFpbER0bz5cbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0RGV0YWlsRHRvPiA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4ucmVzcG9uc2UsXG4gICAgSXRlbXM6IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW10sXG4gIH07XG59O1xuXG5jb25zdCBub3JtYWxpemVBcGlSZXNwb25zZSA9IDxUPihyZXNwb25zZTogSW5kQXBpUmVzcG9uc2U8VD4pOiBJbmRBcGlSZXNwb25zZTxUPiA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4ucmVzcG9uc2UsXG4gICAgRXJyb3JzOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5FcnJvcnMpID8gcmVzcG9uc2UuRXJyb3JzIDogcmVzcG9uc2U/LkVycm9ycyA/PyBudWxsLFxuICB9O1xufTtcblxuY29uc3Qgbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz5cbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+ID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5yZXNwb25zZSxcbiAgICBJdGVtczogQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXSxcbiAgfTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZVN1Ym9yZGluYXRlc1BhZ2VkUmVzcG9uc2UgPSAoXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvPlxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0bz4gPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLnJlc3BvbnNlLFxuICAgIEl0ZW1zOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdLFxuICB9O1xufTtcblxuY29uc3QgbG9va3NMaWtlSHRtbERvY3VtZW50ID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IHJhdyA9IHNhZmVUZXh0KHZhbHVlKS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gcmF3LnN0YXJ0c1dpdGgoXCI8IWRvY3R5cGUgaHRtbFwiKSB8fCByYXcuc3RhcnRzV2l0aChcIjxodG1sXCIpO1xufTtcblxuY29uc3QgaXNBcGlSb3V0ZVVuYXZhaWxhYmxlID0gKGVycm9yOiB1bmtub3duKTogZXJyb3IgaXMgQXBpRmV0Y2hFcnJvciA9PiB7XG4gIGlmICghKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikpIHJldHVybiBmYWxzZTtcbiAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDA0IHx8IGVycm9yLnN0YXR1cyA9PT0gNDA1KSByZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIGVycm9yLnN0YXR1cyA9PT0gdW5kZWZpbmVkICYmIGxvb2tzTGlrZUh0bWxEb2N1bWVudChlcnJvci5yZXNwb25zZUJvZHkpO1xufTtcblxuY29uc3QgaXNTdHJpY3RBcGlSb3V0ZXNFbmFibGVkID0gKCk6IGJvb2xlYW4gPT4ge1xuICBpZiAodHlwZW9mIHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXMgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgcmV0dXJuIHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXM7XG4gIH1cblxuICByZXR1cm4gcmVhZFJ1bnRpbWVTdHJpY3RBcGlGbGFnKCk7XG59O1xuXG5jb25zdCBzaG91bGRVc2VMZWdhY3lGYWxsYmFjayA9IChlcnJvcjogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xuICBpZiAoaXNTdHJpY3RBcGlSb3V0ZXNFbmFibGVkKCkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIGlzQXBpUm91dGVVbmF2YWlsYWJsZShlcnJvcik7XG59O1xuXG5jb25zdCB0b0xlZ2FjeUxpc3RSZXF1ZXN0UGF5bG9hZCA9IChwYXlsb2FkOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGZpbHRlcjogc2FmZVRleHQocGF5bG9hZC5maWx0ZXIpLFxuICAgIGhvamFHYXN0b3NJZDogc2FmZVRleHQocGF5bG9hZC5maWx0ZXIpLFxuICAgIGJpbGxlZE1vZGU6IHBheWxvYWQuYmlsbGVkTW9kZSA/PyAyLFxuICAgIGZyb21EYXRlOiBzYWZlVGV4dChwYXlsb2FkLmNyZWF0ZWREYXRlRnJvbSksXG4gICAgdG9EYXRlOiBzYWZlVGV4dChwYXlsb2FkLmNyZWF0ZWREYXRlVG8pLFxuICAgIHByb2plY3RJZDogc2FmZVRleHQocGF5bG9hZC5wcm9qSWQpLFxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQocGF5bG9hZC5jdXJyZW5jeUNvZGUpLFxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogaXNWYWxpZExpc3RFeHBlbnNlU2hlZXRTdGF0dXMocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMpXG4gICAgICA/IE51bWJlcihwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cylcbiAgICAgIDogdW5kZWZpbmVkLFxuICAgIHBhZ2U6IE51bWJlci5pc0Zpbml0ZShwYXlsb2FkLnBhZ2UpICYmIHBheWxvYWQucGFnZSA+IDAgPyBwYXlsb2FkLnBhZ2UgOiAxLFxuICAgIHBhZ2VTaXplOiBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZC5wYWdlU2l6ZSkgJiYgcGF5bG9hZC5wYWdlU2l6ZSA+IDAgPyBwYXlsb2FkLnBhZ2VTaXplIDogNTAsXG4gIH07XG59O1xuXG5jb25zdCBtYXBMZWdhY3lMaXN0SXRlbVRvQXBpTGlzdEl0ZW0gPSAoaXRlbTogTGVnYWN5RXhwZW5zZUxpc3RJdGVtKTogRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8gPT4ge1xuICByZXR1cm4ge1xuICAgIEhvamFHYXN0b3NJZDogc2FmZVRleHQoaXRlbS5ob2phR2FzdG9zSWQpLFxuICAgIERlc2NyaXB0aW9uOiBzYWZlVGV4dChpdGVtLmRlc2NyaXB0aW9uKSxcbiAgICBFeHBlbnNlU2hlZXRTdGF0dXM6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5leHBlbnNlU2hlZXRTdGF0dXMpLFxuICAgIEVzdGFkb0NvbWVudGFyaW9zOiBzYWZlVGV4dChpdGVtLmVzdGFkb0NvbWVudGFyaW9zKSB8fCBudWxsLFxuICAgIFVzZXJJZDogc2FmZVRleHQoaXRlbS51c2VySWQpIHx8IG51bGwsXG4gICAgVm91Y2hlcjogc2FmZVRleHQoaXRlbS52b3VjaGVyKSxcbiAgICBQcm9qSWQ6IHNhZmVUZXh0KGl0ZW0ucHJvaklkKSxcbiAgICBDdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGl0ZW0uY3VycmVuY3lDb2RlKSxcbiAgICBUb3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihpdGVtLnRvdGFsQW1vdW50ID8/IGl0ZW0udG90YWxBbW91bnRNU1QpLFxuICAgIEV4Y2hSYXRlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uZXhjaFJhdGUpLFxuICAgIEV4Y2hhbmdlUmF0ZU1vZGU6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5leGNoYW5nZVJhdGVNb2RlKSxcbiAgICBDcmVhdGVkRGF0ZTogc2FmZVRleHQoaXRlbS5jcmVhdGVkRGF0ZSkgfHwgbnVsbCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcExlZ2FjeUxpc3RSZXNwb25zZSA9IChcbiAgbGVnYWN5OiBMZWdhY3lFeHBlbnNlTGlzdFJlc3BvbnNlLFxuICBmYWxsYmFja1BhZ2U6IG51bWJlcixcbiAgZmFsbGJhY2tQYWdlU2l6ZTogbnVtYmVyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldExpc3RJdGVtRHRvPiA9PiB7XG4gIGNvbnN0IGxlZ2FjeUl0ZW1zID0gQXJyYXkuaXNBcnJheShsZWdhY3k/Lml0ZW1zKSA/IGxlZ2FjeS5pdGVtcyA6IFtdO1xuICBjb25zdCBtYXBwZWRJdGVtcyA9IGxlZ2FjeUl0ZW1zLm1hcCgoZW50cnkpID0+IG1hcExlZ2FjeUxpc3RJdGVtVG9BcGlMaXN0SXRlbShlbnRyeSkpO1xuXG4gIHJldHVybiB7XG4gICAgU3VjY2VzczogbGVnYWN5LnN1Y2Nlc3MgIT09IGZhbHNlLFxuICAgIE1lc3NhZ2U6IHNhZmVUZXh0KGxlZ2FjeS5tZXNzYWdlKSB8fCBcIk9LXCIsXG4gICAgVG90YWw6IHRvTnVsbGFibGVOdW1iZXIobGVnYWN5LnRvdGFsKSA/PyBtYXBwZWRJdGVtcy5sZW5ndGgsXG4gICAgUGFnZTogdG9OdWxsYWJsZU51bWJlcihsZWdhY3kucGFnZSkgPz8gZmFsbGJhY2tQYWdlLFxuICAgIFBhZ2VTaXplOiB0b051bGxhYmxlTnVtYmVyKGxlZ2FjeS5wYWdlU2l6ZSkgPz8gZmFsbGJhY2tQYWdlU2l6ZSxcbiAgICBJdGVtczogbWFwcGVkSXRlbXMsXG4gICAgVHJhY2VJZDogdW5kZWZpbmVkLFxuICB9O1xufTtcblxuY29uc3QgcmVzb2x2ZVR5cGVMYWJlbCA9ICh0eXBlVmFsdWVDb2RlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAoIXR5cGVWYWx1ZUNvZGUgfHwgdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB0eXBlVmFsdWVDb2RlO1xuICB9XG5cbiAgY29uc3QgcmF3Q2F0YWxvZ1NvdXJjZSA9IHJlYWRFeHBlbnNlV2luZG93UnVudGltZSgpLl9fRVhQRU5TRV9HQVNUT19UWVBFU19fO1xuICBjb25zdCByYXdDYXRhbG9nID0gQXJyYXkuaXNBcnJheShyYXdDYXRhbG9nU291cmNlKSA/IHJhd0NhdGFsb2dTb3VyY2UgOiBbXTtcbiAgY29uc3QgbWF0Y2ggPSByYXdDYXRhbG9nLmZpbmQoKGVudHJ5OiBFeHBlbnNlR2FzdG9UeXBlRW50cnkpID0+IHtcbiAgICBjb25zdCBlbnRyeUNvZGUgPSBzYWZlVGV4dChlbnRyeT8udmFsdWUgfHwgZW50cnk/LlZhbHVlKTtcbiAgICByZXR1cm4gZW50cnlDb2RlID09PSB0eXBlVmFsdWVDb2RlO1xuICB9KTtcblxuICByZXR1cm4gc2FmZVRleHQobWF0Y2g/LnRleHQgfHwgbWF0Y2g/LlRleHQpIHx8IHR5cGVWYWx1ZUNvZGU7XG59O1xuXG4vLyBTZXRzIHJ1bnRpbWUgYXV0aCBpbnB1dHMgdXNlZCB0byByZXNvbHZlIEVudHJhIGNvbnRleHQgYW5kIG1hbmRhdG9yeSBleHBlbnNlIGhlYWRlcnMuXG5leHBvcnQgY29uc3QgY29uZmlndXJlRXhwZW5zZUFwaUF1dGggPSAoc2VlZDogUGFydGlhbDxFeHBlbnNlQXBpQXV0aFNlZWQ+KTogdm9pZCA9PiB7XG4gIGNvbnN0IHN0cmljdEZyb21TZWVkID0gdG9GbGFnQm9vbChzZWVkLnN0cmljdEFwaVJvdXRlcyk7XG4gIGNvbnN0IHN0cmljdEZyb21SdW50aW1lID1cbiAgICB0eXBlb2YgcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcyA9PT0gXCJib29sZWFuXCIgPyBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzIDogcmVhZFJ1bnRpbWVTdHJpY3RBcGlGbGFnKCk7XG5cbiAgcnVudGltZUF1dGhTZWVkID0ge1xuICAgIC4uLnJ1bnRpbWVBdXRoU2VlZCxcbiAgICB0b2tlbjogc2FmZVRleHQoc2VlZC50b2tlbiB8fCBydW50aW1lQXV0aFNlZWQudG9rZW4pLFxuICAgIGVudHJhT2lkOiBzYWZlVGV4dChzZWVkLmVudHJhT2lkIHx8IHJ1bnRpbWVBdXRoU2VlZC5lbnRyYU9pZCksXG4gICAgYXBwQ29kZTogc2FmZVRleHQoc2VlZC5hcHBDb2RlIHx8IHJ1bnRpbWVBdXRoU2VlZC5hcHBDb2RlIHx8IERFRkFVTFRfQVBQX0NPREUpLFxuICAgIHN0cmljdEFwaVJvdXRlczogc3RyaWN0RnJvbVNlZWQgPz8gc3RyaWN0RnJvbVJ1bnRpbWUsXG4gIH07XG5cbiAgY2FjaGVkQ29udGV4dCA9IG51bGw7XG4gIGNhY2hlZENvbnRleHRLZXkgPSBcIlwiO1xuICBjb250ZXh0UHJvbWlzZSA9IG51bGw7XG4gIGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLmNsZWFyKCk7XG4gIHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLmNsZWFyKCk7XG59O1xuXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvbGlzdCBpdGVtIGNvbnRyYWN0IHRvIGxpc3QgY2FyZCBVSSBtb2RlbC5cbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZCA9IChpdGVtOiBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byk6IEV4cGVuc2VTaGVldENhcmQgPT4ge1xuICByZXR1cm4ge1xuICAgIGhvamFHYXN0b3NJZDogc2FmZVRleHQoaXRlbS5Ib2phR2FzdG9zSWQpLFxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChpdGVtLkRlc2NyaXB0aW9uKSxcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5FeHBlbnNlU2hlZXRTdGF0dXMpLFxuICAgIGVzdGFkb0NvbWVudGFyaW9zOiBzYWZlVGV4dChpdGVtLkVzdGFkb0NvbWVudGFyaW9zKSB8fCBudWxsLFxuICAgIHVzZXJJZDogc2FmZVRleHQoaXRlbS5Vc2VySWQpLFxuICAgIHZvdWNoZXI6IHNhZmVUZXh0KGl0ZW0uVm91Y2hlciksXG4gICAgcHJvaklkOiBzYWZlVGV4dChpdGVtLlByb2pJZCksXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChpdGVtLkN1cnJlbmN5Q29kZSksXG4gICAgdG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5Ub3RhbEFtb3VudCksXG4gICAgZXhjaFJhdGU6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5FeGNoUmF0ZSksXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogdG9OdWxsYWJsZU51bWJlcihpdGVtLkV4Y2hhbmdlUmF0ZU1vZGUpLFxuICAgIGNyZWF0ZWREYXRlOiBzYWZlVGV4dChpdGVtLkNyZWF0ZWREYXRlKSxcbiAgfTtcbn07XG5cbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfSBoZWFkZXIgY29udHJhY3QgdG8gVUkgbW9kZWwuXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0SGVhZGVyID0gKHNoZWV0OiBFeHBlbnNlU2hlZXREZXRhaWxEdG8pOiBFeHBlbnNlU2hlZXRIZWFkZXIgPT4ge1xuICByZXR1cm4ge1xuICAgIGhvamFHYXN0b3NJZDogc2FmZVRleHQoc2hlZXQuSG9qYUdhc3Rvc0lkKSxcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQoc2hlZXQuRGVzY3JpcHRpb24pLFxuICAgIHVzZXJJZDogc2FmZVRleHQoc2hlZXQuVXNlcklkKSxcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IHRvTnVsbGFibGVOdW1iZXIoc2hlZXQuRXhwZW5zZVNoZWV0U3RhdHVzKSxcbiAgICBlc3RhZG9Db21lbnRhcmlvczogc2FmZVRleHQoc2hlZXQuRXN0YWRvQ29tZW50YXJpb3MpIHx8IG51bGwsXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChzaGVldC5DdXJyZW5jeUNvZGUpLFxuICAgIHRvdGFsQW1vdW50OiB0b051bGxhYmxlTnVtYmVyKHNoZWV0LlRvdGFsQW1vdW50KSxcbiAgICBleGNoUmF0ZTogc2FmZVRleHQoc2hlZXQuRXhjaFJhdGUpLFxuICAgIGV4Y2hhbmdlUmF0ZU1vZGU6IHRvTnVsbGFibGVOdW1iZXIoc2hlZXQuRXhjaGFuZ2VSYXRlTW9kZSksXG4gICAgcHJvaklkOiBzYWZlVGV4dChzaGVldC5Qcm9qSWQpLFxuICAgIHZvdWNoZXI6IHNhZmVUZXh0KHNoZWV0LlZvdWNoZXIpLFxuICAgIGNyZWF0ZWREYXRlOiBzYWZlVGV4dChzaGVldC5DcmVhdGVkRGF0ZSksXG4gIH07XG59O1xuXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0gbGluZSBjb250cmFjdCB0byBVSSBtb2RlbC5cbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRMaW5lID0gKGxpbmU6IEV4cGVuc2VTaGVldExpbmVEdG8pOiBFeHBlbnNlU2hlZXRMaW5lID0+IHtcbiAgY29uc3QgdHlwZVZhbHVlQ29kZSA9IHNhZmVUZXh0KGxpbmUuVHlwZVZhbHVlKTtcbiAgY29uc3QgbGVnYWN5UHJpY2UgPSAobGluZSBhcyB7IHByaWNlPzogdW5rbm93biB9KS5wcmljZTtcblxuICByZXR1cm4ge1xuICAgIGxpbmVSZWNJZDogc2FmZVRleHQobGluZS5SZWNJZCksXG4gICAgdHJhbnNEYXRlOiBzYWZlVGV4dChsaW5lLlRyYW5zRGF0ZSksXG4gICAgdHlwZVZhbHVlQ29kZSxcbiAgICB0eXBlVmFsdWU6IHJlc29sdmVUeXBlTGFiZWwodHlwZVZhbHVlQ29kZSksXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KGxpbmUuRGVzY3JpcHRpb24pLFxuICAgIGludGVybmFjaW9uYWw6IHRvTnVsbGFibGVCb29sKGxpbmUuSW50ZXJuYWNpb25hbCksXG4gICAgdGlja2V0OiB0b051bGxhYmxlQm9vbChsaW5lLlRpY2tldCksXG4gICAgcHJpY2U6IHRvTnVsbGFibGVOdW1iZXIobGluZS5QcmljZSA/PyBsZWdhY3lQcmljZSksXG4gICAgcXR5OiB0b051bGxhYmxlTnVtYmVyKGxpbmUuUXR5KSxcbiAgICBhbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIobGluZS5BbW91bnQpLFxuICAgIHByb2pJZDogc2FmZVRleHQobGluZS5Qcm9qSWQpLFxuICAgIGluZEF0dGFjaEZpbGVzOiBzYWZlVGV4dChsaW5lLkluZEF0dGFjaEZpbGVzKSxcbiAgfTtcbn07XG5cbi8vIExvYWRzIHRoZSBleHBlbnNlIHNoZWV0IGxpc3QgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2xpc3QuXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXRMaXN0ID0gYXN5bmMgKFxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldExpc3RJdGVtRHRvPj4gPT4ge1xuICBpZiAocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMgIT09IHVuZGVmaW5lZCAmJiAhaXNWYWxpZExpc3RFeHBlbnNlU2hlZXRTdGF0dXMocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleHBlbnNlU2hlZXRTdGF0dXMgbXVzdCBiZSBhbiBpbnRlZ2VyIGJldHdlZW4gMCBhbmQgNC5cIik7XG4gIH1cblxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9saXN0XCIsIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoIXNob3VsZFVzZUxlZ2FjeUZhbGxiYWNrKGVycm9yKSkge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgY29uc3QgbGVnYWN5UmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248TGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZT4oXCIvR2FzdG9zL0xpc3RFeHBlbnNlU2hlZXRzXCIsIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAuLi5zYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyksXG4gICAgICAgIC4uLkpTT05fSEVBREVSUyxcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh0b0xlZ2FjeUxpc3RSZXF1ZXN0UGF5bG9hZChwYXlsb2FkKSksXG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXBwZWQgPSBtYXBMZWdhY3lMaXN0UmVzcG9uc2UoXG4gICAgICBsZWdhY3lSZXNwb25zZSxcbiAgICAgIE51bWJlci5pc0Zpbml0ZShwYXlsb2FkLnBhZ2UpICYmIHBheWxvYWQucGFnZSA+IDAgPyBwYXlsb2FkLnBhZ2UgOiAxLFxuICAgICAgTnVtYmVyLmlzRmluaXRlKHBheWxvYWQucGFnZVNpemUpICYmIHBheWxvYWQucGFnZVNpemUgPiAwID8gcGF5bG9hZC5wYWdlU2l6ZSA6IDUwXG4gICAgKTtcblxuICAgIHJldHVybiBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZShtYXBwZWQpO1xuICB9XG59O1xuXG4vLyBMb2FkcyBvbmUgZXhwZW5zZSBzaGVldCBkZXRhaWwgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9LlxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsID0gYXN5bmMgKFxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldERldGFpbER0bz4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlU2hlZXRJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0RGV0YWlsRHRvPj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH1gLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gUmVhZHMgYXZhaWxhYmxlIGN1cnJlbmNpZXMgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2N1cnJlbmNpZXMuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVNoZWV0Q3VycmVuY2llcyA9IGFzeW5jIChcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj4gPT4ge1xuICBsZXQgY29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQgfCBudWxsID0gbnVsbDtcbiAgdHJ5IHtcbiAgICBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSkge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgY29tcGFueUlkID0gc2FmZVRleHQoY29udGV4dD8uY29tcGFueUlkIHx8IHJlYWRXaW5kb3dTZWxlY3RlZENvbXBhbnkoKSkudG9VcHBlckNhc2UoKTtcbiAgY29uc3QgY2FjaGVLZXkgPSBjb21wYW55SWQgfHwgXCItXCI7XG5cbiAgaWYgKGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLmhhcyhjYWNoZUtleSkpIHtcbiAgICByZXR1cm4gY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuZ2V0KGNhY2hlS2V5KSBhcyBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPjtcbiAgfVxuXG4gIGlmIChwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5oYXMoY2FjaGVLZXkpKSB7XG4gICAgcmV0dXJuIHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLmdldChjYWNoZUtleSkgYXMgUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj47XG4gIH1cblxuICBjb25zdCByZXF1ZXN0UHJvbWlzZSA9IChhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIkF1dGhvcml6YXRpb25cIik7XG4gICAgcmVtb3ZlSGVhZGVyVmFsdWUoaGVhZGVycywgXCJYLUlORC1BeFVzZXJJZFwiKTtcblxuICAgIGlmIChjb21wYW55SWQpIHtcbiAgICAgIGhlYWRlcnNbXCJYLUlORC1Db21wYW55XCJdID0gY29tcGFueUlkO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj4oXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL2N1cnJlbmNpZXNcIiwge1xuICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgIGhlYWRlcnMsXG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgbm9ybWFsaXplZFJlc3BvbnNlID0gbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgIGlmIChub3JtYWxpemVkUmVzcG9uc2UuU3VjY2Vzcykge1xuICAgICAgICBjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcy5zZXQoY2FjaGVLZXksIG5vcm1hbGl6ZWRSZXNwb25zZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBub3JtYWxpemVkUmVzcG9uc2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmICghc2hvdWxkVXNlTGVnYWN5RmFsbGJhY2soZXJyb3IpKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBsZWdhY3lMaXN0UmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248TGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZT4oXCIvR2FzdG9zL0xpc3RFeHBlbnNlU2hlZXRzXCIsIHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIC4uLnNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKSxcbiAgICAgICAgICAuLi5KU09OX0hFQURFUlMsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBmaWx0ZXI6IFwiXCIsXG4gICAgICAgICAgaG9qYUdhc3Rvc0lkOiBcIlwiLFxuICAgICAgICAgIGJpbGxlZE1vZGU6IDIsXG4gICAgICAgICAgZnJvbURhdGU6IFwiXCIsXG4gICAgICAgICAgdG9EYXRlOiBcIlwiLFxuICAgICAgICAgIHByb2plY3RJZDogXCJcIixcbiAgICAgICAgICBjdXJyZW5jeUNvZGU6IFwiXCIsXG4gICAgICAgICAgcGFnZTogMSxcbiAgICAgICAgICBwYWdlU2l6ZTogMjAwLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBzZWVuQ29kZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICAgIGNvbnN0IHNvdXJjZUl0ZW1zID0gQXJyYXkuaXNBcnJheShsZWdhY3lMaXN0UmVzcG9uc2UuaXRlbXMpID8gbGVnYWN5TGlzdFJlc3BvbnNlLml0ZW1zIDogW107XG4gICAgICBjb25zdCBmYWxsYmFja0l0ZW1zOiBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0b1tdID0gc291cmNlSXRlbXNcbiAgICAgICAgLm1hcCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5LmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSlcbiAgICAgICAgLmZpbHRlcigoY29kZSkgPT4gISFjb2RlKVxuICAgICAgICAuZmlsdGVyKChjb2RlKSA9PiB7XG4gICAgICAgICAgaWYgKHNlZW5Db2Rlcy5oYXMoY29kZSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICBzZWVuQ29kZXMuYWRkKGNvZGUpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KVxuICAgICAgICAubWFwKChjb2RlKSA9PiAoe1xuICAgICAgICAgIEN1cnJlbmN5Q29kZTogY29kZSxcbiAgICAgICAgICBDdXJyZW5jeUNvZGVJU086IGNvZGUsXG4gICAgICAgIH0pKTtcblxuICAgICAgY29uc3QgZmFsbGJhY2tSZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4gPSB7XG4gICAgICAgIFN1Y2Nlc3M6IGxlZ2FjeUxpc3RSZXNwb25zZS5zdWNjZXNzICE9PSBmYWxzZSxcbiAgICAgICAgTWVzc2FnZTogc2FmZVRleHQobGVnYWN5TGlzdFJlc3BvbnNlLm1lc3NhZ2UpIHx8IFwiT0tcIixcbiAgICAgICAgVG90YWw6IGZhbGxiYWNrSXRlbXMubGVuZ3RoLFxuICAgICAgICBQYWdlOiAxLFxuICAgICAgICBQYWdlU2l6ZTogZmFsbGJhY2tJdGVtcy5sZW5ndGgsXG4gICAgICAgIEl0ZW1zOiBmYWxsYmFja0l0ZW1zLFxuICAgICAgICBUcmFjZUlkOiB1bmRlZmluZWQsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBub3JtYWxpemVkRmFsbGJhY2sgPSBub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2UoZmFsbGJhY2tSZXNwb25zZSk7XG4gICAgICBpZiAobm9ybWFsaXplZEZhbGxiYWNrLlN1Y2Nlc3MpIHtcbiAgICAgICAgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuc2V0KGNhY2hlS2V5LCBub3JtYWxpemVkRmFsbGJhY2spO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbm9ybWFsaXplZEZhbGxiYWNrO1xuICAgIH1cbiAgfSkoKTtcblxuICBwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5zZXQoY2FjaGVLZXksIHJlcXVlc3RQcm9taXNlKTtcbiAgdHJ5IHtcbiAgICByZXR1cm4gYXdhaXQgcmVxdWVzdFByb21pc2U7XG4gIH0gZmluYWxseSB7XG4gICAgcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuZGVsZXRlKGNhY2hlS2V5KTtcbiAgfVxufTtcblxuLy8gUmVhZHMgYXZhaWxhYmxlIHN1Ym9yZGluYXRlcyBmcm9tIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvc3Vib3JkaW5hdGVzLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlcyA9IGFzeW5jIChcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG8+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvc3Vib3JkaW5hdGVzXCIsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBFeHBvc2VzIHRoZSBkZWZhdWx0IGN1cnJlbmN5IHJlc29sdmVkIGZyb20gRW50cmEgY29udGV4dCBmb3IgaW5pdGlhbCBzZWxlY3Rpb25zLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUgPSBhc3luYyAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICAgIHJldHVybiBzYWZlVGV4dChjb250ZXh0LmRlZmF1bHRDdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG59O1xuXG4vLyBSZWFkcyBleGNoYW5nZSByYXRlIGZyb20gL2FwaS9zeXN0ZW0vZXhjaGFuZ2UtcmF0ZS5cbmV4cG9ydCBjb25zdCBnZXRFeGNoYW5nZVJhdGUgPSBhc3luYyAoXG4gIGJhc2VDdXJyZW5jeTogc3RyaW5nLFxuICB0YXJnZXRDdXJyZW5jeTogc3RyaW5nLFxuICBkYXRlPzogc3RyaW5nLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4Y2hhbmdlUmF0ZUR0bz4+ID0+IHtcbiAgY29uc3QgdG9rZW4gPSByZXNvbHZlQXV0aFRva2VuKG9wdGlvbnMpO1xuICBjb25zdCBub3JtYWxpemVkQmFzZUN1cnJlbmN5ID0gc2FmZVRleHQoYmFzZUN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBub3JtYWxpemVkVGFyZ2V0Q3VycmVuY3kgPSBzYWZlVGV4dCh0YXJnZXRDdXJyZW5jeSkudG9VcHBlckNhc2UoKTtcbiAgY29uc3Qgbm9ybWFsaXplZERhdGUgPSBzYWZlVGV4dChkYXRlKTtcbiAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG5cbiAgcXVlcnkuc2V0KFwiYmFzZUN1cnJlbmN5XCIsIG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kpO1xuICBxdWVyeS5zZXQoXCJ0YXJnZXRDdXJyZW5jeVwiLCBub3JtYWxpemVkVGFyZ2V0Q3VycmVuY3kpO1xuICBpZiAobm9ybWFsaXplZERhdGUpIHtcbiAgICBxdWVyeS5zZXQoXCJkYXRlXCIsIG5vcm1hbGl6ZWREYXRlKTtcbiAgfVxuXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XG4gIGlmICh0b2tlbikge1xuICAgIGhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICB9XG5cbiAgcmV0dXJuIGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeGNoYW5nZVJhdGVEdG8+PihgL2FwaS9zeXN0ZW0vZXhjaGFuZ2UtcmF0ZT8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIGhlYWRlcnMsXG4gIH0pO1xufTtcblxuLy8gUmVhZHMgZnVlbCBwcmljZSBwZXIga20gZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2Z1ZWwtcHJpY2Uta20uXG5leHBvcnQgY29uc3QgZ2V0RnVlbFByaWNlS20gPSBhc3luYyAoXG4gIHRyYW5zRGF0ZTogc3RyaW5nLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEZ1ZWxQcmljZUttRHRvPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IG5vcm1hbGl6ZWREYXRlID0gc2FmZVRleHQodHJhbnNEYXRlKTtcbiAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG5cbiAgcXVlcnkuc2V0KFwidHJhbnNEYXRlXCIsIG5vcm1hbGl6ZWREYXRlKTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxGdWVsUHJpY2VLbUR0bz4+KFxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2Z1ZWwtcHJpY2Uta20/JHtxdWVyeS50b1N0cmluZygpfWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBDcmVhdGVzIGFuIGV4cGVuc2Ugc2hlZXQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy5cbmV4cG9ydCBjb25zdCBjcmVhdGVFeHBlbnNlU2hlZXQgPSBhc3luYyAoXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3JlYXRlUmVzcG9uc2VEYXRhPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IG1vZGUgPSBwYXlsb2FkLm1vZGUgPz8gMDtcbiAgY29uc3QgbGluZXMgPSBBcnJheS5pc0FycmF5KHBheWxvYWQubGluZXMpID8gcGF5bG9hZC5saW5lcyA6IFtdO1xuICBjb25zdCBoYXNJbnZhbGlkTGluZVBheWxvYWQgPSBsaW5lcy5zb21lKChsaW5lKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICFzYWZlVGV4dChsaW5lLnRyYW5zRGF0ZSkgfHxcbiAgICAgICFOdW1iZXIuaXNJbnRlZ2VyKE51bWJlcihsaW5lLnR5cGVWYWx1ZSkpIHx8XG4gICAgICBOdW1iZXIobGluZS50eXBlVmFsdWUpIDw9IDAgfHxcbiAgICAgICFpc1Bvc2l0aXZlTnVtYmVyKGxpbmUucXR5KSB8fFxuICAgICAgIWlzUG9zaXRpdmVOdW1iZXIobGluZS5wcmljZSlcbiAgICApO1xuICB9KTtcblxuICBpZiAocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMgIT09IHVuZGVmaW5lZCAmJiAhaXNOb25OZWdhdGl2ZU51bWJlcihwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cykpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4cGVuc2VTaGVldFN0YXR1cyBtdXN0IGJlIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMC5cIik7XG4gIH1cblxuICBpZiAocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlICE9PSB1bmRlZmluZWQgJiYgIWlzTm9uTmVnYXRpdmVOdW1iZXIocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlKSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhjaGFuZ2VSYXRlTW9kZSBtdXN0IGJlIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMC5cIik7XG4gIH1cblxuICBpZiAocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlICE9PSB1bmRlZmluZWQgJiYgcGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhjaGFuZ2VSYXRlTW9kZSByZXF1aXJlcyBleHBlbnNlU2hlZXRTdGF0dXMuXCIpO1xuICB9XG5cbiAgaWYgKGhhc0ludmFsaWRMaW5lUGF5bG9hZCkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiRWFjaCBsaW5lIHJlcXVpcmVzIHRyYW5zRGF0ZSwgdHlwZVZhbHVlLCBxdHkgPiAwIGFuZCBwcmljZSA+IDAuXCIpO1xuICB9XG5cbiAgaWYgKG1vZGUgPT09IDApIHtcbiAgICBpZiAoIXNhZmVUZXh0KHBheWxvYWQuZGVzY3JpcHRpb24pIHx8ICFzYWZlVGV4dChwYXlsb2FkLmN1cnJlbmN5Q29kZSkgfHwgbGluZXMubGVuZ3RoIDwgMSkge1xuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJJbnZhbGlkIGNyZWF0ZSBwYXlsb2FkIGZvciBtb2RlIDAuXCIpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtb2RlID09PSAxKSB7XG4gICAgaWYgKCFzYWZlVGV4dChwYXlsb2FkLmRlc2NyaXB0aW9uKSB8fCAhc2FmZVRleHQocGF5bG9hZC5jdXJyZW5jeUNvZGUpKSB7XG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkludmFsaWQgY3JlYXRlIHBheWxvYWQgZm9yIG1vZGUgMS5cIik7XG4gICAgfVxuXG4gICAgaWYgKGxpbmVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiTW9kZSAxIHJlcXVpcmVzIGxpbmVzIHRvIGJlIG51bGwgb3IgZW1wdHkuXCIpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtb2RlID09PSAyKSB7XG4gICAgaWYgKCFzYWZlVGV4dChwYXlsb2FkLmV4aXN0aW5nSG9qYUdhc3Rvc0lkKSB8fCBsaW5lcy5sZW5ndGggPCAxKSB7XG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkludmFsaWQgY3JlYXRlIHBheWxvYWQgZm9yIG1vZGUgMi5cIik7XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgbm9ybWFsaXplZFBheWxvYWQ6IEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QgPSB7XG4gICAgLi4ucGF5bG9hZCxcbiAgICBtb2RlLFxuICAgIGV4aXN0aW5nSG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChwYXlsb2FkLmV4aXN0aW5nSG9qYUdhc3Rvc0lkKSB8fCB1bmRlZmluZWQsXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KHBheWxvYWQuZGVzY3JpcHRpb24pIHx8IHVuZGVmaW5lZCxcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KHBheWxvYWQuY3VycmVuY3lDb2RlKSB8fCB1bmRlZmluZWQsXG4gICAgcHJvaklkOiBzYWZlVGV4dChwYXlsb2FkLnByb2pJZCkgfHwgdW5kZWZpbmVkLFxuICAgIGxpbmVzOiBtb2RlID09PSAxID8gW10gOiBsaW5lcyxcbiAgfTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRDcmVhdGVSZXNwb25zZURhdGE+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHNcIiwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5vcm1hbGl6ZWRQYXlsb2FkKSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIFVwZGF0ZXMgaGVhZGVyIGZpZWxkcyB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9LlxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4cGVuc2VTaGVldEhlYWRlciA9IGFzeW5jIChcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldEhlYWRlclVwZGF0ZVJlcXVlc3QsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8eyBIb2phR2FzdG9zSWQ6IHN0cmluZyB9Pj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcblxuICBpZiAocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMgIT09IHVuZGVmaW5lZCAmJiAhaXNOb25OZWdhdGl2ZU51bWJlcihwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cykpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4cGVuc2VTaGVldFN0YXR1cyBtdXN0IGJlIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMC5cIik7XG4gIH1cblxuICBpZiAocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlICE9PSB1bmRlZmluZWQgJiYgIWlzTm9uTmVnYXRpdmVOdW1iZXIocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlKSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhjaGFuZ2VSYXRlTW9kZSBtdXN0IGJlIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMC5cIik7XG4gIH1cblxuICBpZiAocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlICE9PSB1bmRlZmluZWQgJiYgcGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhjaGFuZ2VSYXRlTW9kZSByZXF1aXJlcyBleHBlbnNlU2hlZXRTdGF0dXMuXCIpO1xuICB9XG5cbiAgaWYgKHNhZmVUZXh0KHBheWxvYWQuZXN0YWRvQ29tZW50YXJpb3MpICYmIChwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gdW5kZWZpbmVkIHx8IHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSA9PT0gdW5kZWZpbmVkKSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXN0YWRvQ29tZW50YXJpb3MgcmVxdWlyZXMgZXhwZW5zZVNoZWV0U3RhdHVzIGFuZCBleGNoYW5nZVJhdGVNb2RlLlwiKTtcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPHsgSG9qYUdhc3Rvc0lkOiBzdHJpbmcgfT4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9YCwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBEZWxldGVzIGEgZnVsbCBleHBlbnNlIHNoZWV0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0vbGluZXMvMD9kZWxldGVXaG9sZVNoZWV0PXRydWUuXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0ID0gYXN5bmMgKFxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxudWxsPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8bnVsbD4+KFxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9L2xpbmVzLzA/ZGVsZXRlTW9kZT0yJmRlbGV0ZVdob2xlU2hlZXQ9dHJ1ZWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBVcGRhdGVzIG9uZSBleHBlbnNlIGxpbmUgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS9saW5lcy97bGluZVJlY0lkfS5cbmV4cG9ydCBjb25zdCB1cGRhdGVFeHBlbnNlU2hlZXRMaW5lID0gYXN5bmMgKFxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcbiAgbGluZVJlY0lkOiBzdHJpbmcsXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXNwb25zZURhdGE+PiA9PiB7XG4gIGlmIChcbiAgICAhc2FmZVRleHQocGF5bG9hZC50cmFuc0RhdGUpIHx8XG4gICAgIU51bWJlci5pc0ludGVnZXIoTnVtYmVyKHBheWxvYWQudHlwZVZhbHVlKSkgfHxcbiAgICBOdW1iZXIocGF5bG9hZC50eXBlVmFsdWUpIDw9IDAgfHxcbiAgICAhaXNQb3NpdGl2ZU51bWJlcihwYXlsb2FkLnF0eSkgfHxcbiAgICAhaXNQb3NpdGl2ZU51bWJlcihwYXlsb2FkLnByaWNlKVxuICApIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcInRyYW5zRGF0ZSwgdHlwZVZhbHVlLCBxdHkgPiAwIGFuZCBwcmljZSA+IDAgYXJlIHJlcXVpcmVkLlwiKTtcbiAgfVxuXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCBzYWZlTGluZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhsaW5lUmVjSWQgfHwgXCJcIikudHJpbSgpKTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVzcG9uc2VEYXRhPj4oXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH0vbGluZXMvJHtzYWZlTGluZUlkfWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIERlbGV0ZXMgb25lIGV4cGVuc2UgbGluZSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9L2xpbmVzL3tsaW5lUmVjSWR9P2RlbGV0ZVdob2xlU2hlZXQ9ZmFsc2UuXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0TGluZSA9IGFzeW5jIChcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXG4gIGxpbmVSZWNJZDogc3RyaW5nLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG51bGw+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCBzYWZlTGluZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhsaW5lUmVjSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8bnVsbD4+KFxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9L2xpbmVzLyR7c2FmZUxpbmVJZH0/ZGVsZXRlTW9kZT0wJmRlbGV0ZVdob2xlU2hlZXQ9ZmFsc2VgLFxuICAgIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxuICAgIH1cbiAgKTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gU2VhcmNoZXMgcHJvamVjdHMgZm9yIGRyb3Bkb3duIHVzYWdlIGluIGZpbHRlcnMgYW5kIGVkaXQgZm9ybXMuXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlUHJvamVjdHMgPSBhc3luYyAoXG4gIHRlcm06IHN0cmluZyxcbiAgcGFnZTogbnVtYmVyLFxuICBwYWdlU2l6ZTogbnVtYmVyLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPFByb2plY3REcm9wZG93blJlc3BvbnNlPiA9PiB7XG4gIGNvbnN0IHNhZmVUZXJtID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyh0ZXJtIHx8IFwiXCIpKTtcbiAgY29uc3Qgc2FmZVBhZ2UgPSBOdW1iZXIuaXNGaW5pdGUocGFnZSkgJiYgcGFnZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2UpIDogMTtcbiAgY29uc3Qgc2FmZVBhZ2VTaXplID0gTnVtYmVyLmlzRmluaXRlKHBhZ2VTaXplKSAmJiBwYWdlU2l6ZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2VTaXplKSA6IDIwO1xuXG4gIHJldHVybiBmZXRjaEpzb248UHJvamVjdERyb3Bkb3duUmVzcG9uc2U+KFxuICAgIGAvR2FzdG9zL0dldFByb2plY3RzRm9yRHJvcGRvd24/dGVybT0ke3NhZmVUZXJtfSZwYWdlPSR7c2FmZVBhZ2V9JnBhZ2VTaXplPSR7c2FmZVBhZ2VTaXplfWAsXG4gICAge1xuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9XG4gICk7XG59O1xuIiwgImV4cG9ydCB0eXBlIEV4cGVuc2VEYXRlUGFydHMgPSB7XG4gIHllYXI6IHN0cmluZztcbiAgbW9udGg6IHN0cmluZztcbiAgZGF5OiBzdHJpbmc7XG59O1xuXG5jb25zdCBCQVNRVUVfTU9OVEhTX1NIT1JUID0gW1xuICBcInVydFwiLFxuICBcIm90c1wiLFxuICBcIm1hclwiLFxuICBcImFwaVwiLFxuICBcIm1haVwiLFxuICBcImVrYVwiLFxuICBcInV6dFwiLFxuICBcImFidVwiLFxuICBcImlyYVwiLFxuICBcInVyclwiLFxuICBcImF6YVwiLFxuICBcImFiZVwiLFxuXTtcblxuY29uc3Qgbm9ybWFsaXplVWlMb2NhbGUgPSAobG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhsb2NhbGUgfHwgXCJcIikudHJpbSgpO1xuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJlcy1FU1wiO1xuICBpZiAoL156aC1oYW5zL2kudGVzdCh2YWx1ZSkpIHJldHVybiBcInpoLUNOXCI7XG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbmNvbnN0IGlzQmFzcXVlTG9jYWxlID0gKGxvY2FsZTogc3RyaW5nKTogYm9vbGVhbiA9PiAvXmV1XFxiL2kudGVzdChTdHJpbmcobG9jYWxlIHx8IFwiXCIpKTtcblxuLy8gTm9ybWFsaXplIHVua25vd24gdmFsdWVzIHRvIGEgdHJpbW1lZCBzdHJpbmcuXG5leHBvcnQgY29uc3Qgc2FmZVRleHQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XG4gIHJldHVybiBTdHJpbmcodmFsdWUpLnRyaW0oKTtcbn07XG5cbi8vIE5vcm1hbGl6ZXMgY2FyZCB0aXRsZSB0ZXh0IG9ubHkgd2hlbiBpdCBjb21lcyBpbiBmdWxsIHVwcGVyIG9yIGZ1bGwgbG93ZXIgY2FzZS5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVDYXJkVGl0bGVUZXh0ID0gKHZhbHVlOiB1bmtub3duLCBmYWxsYmFjayA9IFwiLVwiKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgc291cmNlID0gc2FmZVRleHQodmFsdWUpO1xuICBpZiAoIXNvdXJjZSkgcmV0dXJuIGZhbGxiYWNrO1xuXG4gIGNvbnN0IGhhc0xldHRlcnMgPSAvW0EtWmEtelx1MDBDMC1cdTAwRDZcdTAwRDgtXHUwMEY2XHUwMEY4LVx1MDBGRl0vLnRlc3Qoc291cmNlKTtcbiAgaWYgKCFoYXNMZXR0ZXJzKSByZXR1cm4gc291cmNlO1xuXG4gIGNvbnN0IGlzQWxsVXBwZXIgPSBzb3VyY2UgPT09IHNvdXJjZS50b1VwcGVyQ2FzZSgpICYmIHNvdXJjZSAhPT0gc291cmNlLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGlzQWxsTG93ZXIgPSBzb3VyY2UgPT09IHNvdXJjZS50b0xvd2VyQ2FzZSgpICYmIHNvdXJjZSAhPT0gc291cmNlLnRvVXBwZXJDYXNlKCk7XG4gIGlmICghaXNBbGxVcHBlciAmJiAhaXNBbGxMb3dlcikge1xuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICBjb25zdCBsb3dlciA9IHNvdXJjZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gYCR7bG93ZXIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCl9JHtsb3dlci5zbGljZSgxKX1gO1xufTtcblxuLy8gUmV0dXJucyB0cnVlIG9ubHkgd2hlbiB2b3VjaGVyIGhhcyBhIG1lYW5pbmdmdWwgYXNzaWduZWQgdmFsdWUuXG5leHBvcnQgY29uc3QgaGFzQXNzaWduZWRWb3VjaGVyID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IHZvdWNoZXIgPSBzYWZlVGV4dCh2YWx1ZSkudG9VcHBlckNhc2UoKTtcbiAgaWYgKCF2b3VjaGVyKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiB2b3VjaGVyICE9PSBcIi1cIiAmJiB2b3VjaGVyICE9PSBcIi5cIiAmJiB2b3VjaGVyICE9PSBcIjBcIjtcbn07XG5cbi8vIFJldHVybiBkYXRlIGF0IGxvY2FsIGRheSBzdGFydC5cbmV4cG9ydCBjb25zdCBzdGFydE9mRGF5ID0gKGRhdGU6IERhdGUpOiBEYXRlID0+IHtcbiAgcmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSk7XG59O1xuXG4vLyBGb3JtYXQgbG9jYWwgZGF0ZSB0byB5eXl5LU1NLWRkLlxuZXhwb3J0IGNvbnN0IHRvSXNvRGF0ZSA9IChkYXRlOiBEYXRlKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGAke2RhdGUuZ2V0RnVsbFllYXIoKX0tJHtTdHJpbmcoZGF0ZS5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpfS0ke1N0cmluZyhkYXRlLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpfWA7XG59O1xuXG4vLyBQYXJzZSBzdXBwb3J0ZWQgQVBJIGRhdGUgZm9ybWF0cy5cbmV4cG9ydCBjb25zdCBwYXJzZUV4cGVuc2VEYXRlID0gKHJhdz86IHN0cmluZyk6IERhdGUgfCBudWxsID0+IHtcbiAgaWYgKCFyYXcpIHJldHVybiBudWxsO1xuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhyYXcpLnRyaW0oKTtcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgZGF0ZU9ubHkgPSB2YWx1ZS5zcGxpdChcIlRcIilbMF0uc3BsaXQoXCIgXCIpWzBdO1xuXG4gIGlmICgvXlxcZHsyfVsuLy1dXFxkezJ9Wy4vLV1cXGR7NH0kLy50ZXN0KGRhdGVPbmx5KSkge1xuICAgIGNvbnN0IFtkYXksIG1vbnRoLCB5ZWFyXSA9IGRhdGVPbmx5LnNwbGl0KC9bLi8tXS8pLm1hcChOdW1iZXIpO1xuICAgIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XG4gIH1cblxuICBpZiAoL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QoZGF0ZU9ubHkpKSB7XG4gICAgY29uc3QgW3llYXIsIG1vbnRoLCBkYXldID0gZGF0ZU9ubHkuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xuICAgIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XG4gIH1cblxuICBpZiAoL15cXGR7NH1bLi8tXVxcZHsyfVsuLy1dXFxkezJ9JC8udGVzdChkYXRlT25seSkpIHtcbiAgICBjb25zdCBbeWVhciwgbW9udGgsIGRheV0gPSBkYXRlT25seS5zcGxpdCgvWy4vLV0vKS5tYXAoTnVtYmVyKTtcbiAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xuICB9XG5cbiAgaWYgKC9eXFxkezh9JC8udGVzdChkYXRlT25seSkpIHtcbiAgICBjb25zdCB5ZWFyID0gTnVtYmVyKGRhdGVPbmx5LnNsaWNlKDAsIDQpKTtcbiAgICBjb25zdCBtb250aCA9IE51bWJlcihkYXRlT25seS5zbGljZSg0LCA2KSk7XG4gICAgY29uc3QgZGF5ID0gTnVtYmVyKGRhdGVPbmx5LnNsaWNlKDYsIDgpKTtcbiAgICByZXR1cm4gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xuICB9XG5cbiAgY29uc3QgcGFyc2VkID0gbmV3IERhdGUodmFsdWUpO1xuICByZXR1cm4gTnVtYmVyLmlzTmFOKHBhcnNlZC5nZXRUaW1lKCkpID8gbnVsbCA6IHBhcnNlZDtcbn07XG5cbi8vIEZvcm1hdCBhIGRhdGUgZm9yIHJlYWQtb25seSBmaWVsZHMgdXNpbmcgdGhlIHNhbWUgb3V0cHV0IHN0eWxlIGFzIHZpc2l0cy5cbmV4cG9ydCBjb25zdCBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUgPSAocmF3Pzogc3RyaW5nLCBsb2NhbGUgPSBcImVzLUVTXCIsIGZhbGxiYWNrID0gXCItXCIpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBkYXRlID0gcGFyc2VFeHBlbnNlRGF0ZShyYXcpO1xuICBpZiAoIWRhdGUpIHJldHVybiBmYWxsYmFjaztcblxuICBjb25zdCBzYWZlTG9jYWxlID0gbm9ybWFsaXplVWlMb2NhbGUobG9jYWxlKTtcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKHNhZmVMb2NhbGUpKSB7XG4gICAgcmV0dXJuIGAke2RhdGUuZ2V0RGF0ZSgpfSAke0JBU1FVRV9NT05USFNfU0hPUlRbZGF0ZS5nZXRNb250aCgpXX0gJHtkYXRlLmdldEZ1bGxZZWFyKCl9YC50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgcmV0dXJuIGRhdGVcbiAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKHNhZmVMb2NhbGUsIHtcbiAgICAgIGRheTogXCJudW1lcmljXCIsXG4gICAgICBtb250aDogXCJzaG9ydFwiLFxuICAgICAgeWVhcjogXCJudW1lcmljXCIsXG4gICAgfSlcbiAgICAucmVwbGFjZSgvXFwuL2csIFwiXCIpXG4gICAgLnRvTG93ZXJDYXNlKCk7XG59O1xuXG4vLyBCdWlsZCB0aW1lbGluZSBkYXRlIGZyYWdtZW50cyBmb3IgY2FyZCBsZWZ0IHBhbmVsLlxuZXhwb3J0IGNvbnN0IGZvcm1hdEV4cGVuc2VEYXRlUGFydHMgPSAocmF3Pzogc3RyaW5nLCBsb2NhbGUgPSBcImVzLUVTXCIpOiBFeHBlbnNlRGF0ZVBhcnRzID0+IHtcbiAgY29uc3QgZGF0ZSA9IHBhcnNlRXhwZW5zZURhdGUocmF3KTtcbiAgaWYgKCFkYXRlKSB7XG4gICAgcmV0dXJuIHsgeWVhcjogXCJcIiwgbW9udGg6IFwiXCIsIGRheTogXCItLVwiIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHllYXI6IFN0cmluZyhkYXRlLmdldEZ1bGxZZWFyKCkpLFxuICAgIG1vbnRoOiBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgbW9udGg6IFwic2hvcnRcIiB9KS5yZXBsYWNlKC9cXC4vZywgXCJcIikudG9VcHBlckNhc2UoKSxcbiAgICBkYXk6IFN0cmluZyhkYXRlLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpLFxuICB9O1xufTtcbiIsICJ0eXBlIE5hdmlnYXRlV2l0aEd1YXJkT3B0aW9ucyA9IHtcbiAgYXNrQ29uZmlybWF0aW9uPzogYm9vbGVhbjtcbiAgYnlwYXNzR3VhcmRPbmNlPzogYm9vbGVhbjtcbiAgbWVzc2FnZT86IHN0cmluZztcbn07XG5cbi8vIFVwZGF0ZXMgdGhlIGdsb2JhbCBuYXZpZ2F0aW9uIGd1YXJkIGxpZmVjeWNsZSBmb3IgYWN0aXZlIGVkaXQgcHJvY2Vzc2VzLlxuZXhwb3J0IGNvbnN0IHNldEV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQgPSAoYWN0aXZlOiBib29sZWFuKTogdm9pZCA9PiB7XG4gIHdpbmRvdy5fX2luZFNldE5hdmlnYXRpb25HdWFyZD8uKGFjdGl2ZSk7XG59O1xuXG4vLyBDbGVhcnMgZ2xvYmFsIG5hdmlnYXRpb24gZ3VhcmQgZmxhZ3Mgd2hlbiBjb21wb25lbnQgdW5tb3VudHMuXG5leHBvcnQgY29uc3QgY2xlYXJFeHBlbnNlTmF2aWdhdGlvbkd1YXJkID0gKCk6IHZvaWQgPT4ge1xuICB3aW5kb3cuX19pbmRDbGVhck5hdmlnYXRpb25HdWFyZD8uKCk7XG59O1xuXG4vLyBFeGVjdXRlcyBuYXZpZ2F0aW9uIGFjdGlvbiB0aHJvdWdoIHNpdGUgZ3VhcmQgaWYgYXZhaWxhYmxlLlxuZXhwb3J0IGNvbnN0IHJ1bkd1YXJkZWROYXZpZ2F0aW9uID0gKFxuICBhY3Rpb246ICgpID0+IHZvaWQsXG4gIG9wdGlvbnM6IE5hdmlnYXRlV2l0aEd1YXJkT3B0aW9ucyA9IHt9XG4pOiB2b2lkID0+IHtcbiAgY29uc3QgeyBhc2tDb25maXJtYXRpb24gPSBmYWxzZSwgbWVzc2FnZSB9ID0gb3B0aW9ucztcbiAgaWYgKGFza0NvbmZpcm1hdGlvbiAmJiB0eXBlb2Ygd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHdpbmRvdy5fX2luZFJlcXVlc3ROYXZpZ2F0aW9uKGFjdGlvbiwgbWVzc2FnZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYWN0aW9uKCk7XG59O1xuXG4vLyBOYXZpZ2F0ZXMgdG8gdGFyZ2V0IFVSTCBhbmQga2VlcHMgc2l0ZS1sZXZlbCBndWFyZCBiZWhhdmlvciBjb25zaXN0ZW50LlxuZXhwb3J0IGNvbnN0IG5hdmlnYXRlVG9FeHBlbnNlVXJsID0gKFxuICB0YXJnZXRVcmw6IHN0cmluZyxcbiAgb3B0aW9uczogTmF2aWdhdGVXaXRoR3VhcmRPcHRpb25zID0ge31cbik6IHZvaWQgPT4ge1xuICBjb25zdCBzYWZlVXJsID0gU3RyaW5nKHRhcmdldFVybCB8fCBcIlwiKS50cmltKCk7XG4gIGlmICghc2FmZVVybCkgcmV0dXJuO1xuXG4gIGNvbnN0IHsgYnlwYXNzR3VhcmRPbmNlID0gdHJ1ZSB9ID0gb3B0aW9ucztcbiAgcnVuR3VhcmRlZE5hdmlnYXRpb24oKCkgPT4ge1xuICAgIGlmIChieXBhc3NHdWFyZE9uY2UpIHtcbiAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xuICAgIH1cbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHNhZmVVcmw7XG4gIH0sIG9wdGlvbnMpO1xufTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZW1vdGVTZWFyY2hDb21ib2JveCwgeyB0eXBlIFJlbW90ZVNlYXJjaE9wdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvUmVtb3RlU2VhcmNoQ29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VQcm9qZWN0cyB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5cbnR5cGUgRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBzaG93TGFiZWw/OiBib29sZWFuO1xufTtcblxuY29uc3QgU0VBUkNIX1BBR0VfU0laRSA9IDIwO1xuXG5jb25zdCBtYXBQcm9qZWN0T3B0aW9ucyA9IChpdGVtczogQXJyYXk8eyB2YWx1ZT86IHN0cmluZzsgdGV4dD86IHN0cmluZyB9PiB8IHVuZGVmaW5lZCk6IFJlbW90ZVNlYXJjaE9wdGlvbltdID0+IHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zIDogW10pXG4gICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgdmFsdWVUZXh0ID0gU3RyaW5nKGl0ZW0/LnZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgIGlmICghdmFsdWVUZXh0KSByZXR1cm4gbnVsbDtcbiAgICAgIGNvbnN0IHN1YnRpdGxlID0gU3RyaW5nKGl0ZW0/LnRleHQgfHwgXCJcIikudHJpbSgpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IHZhbHVlVGV4dCxcbiAgICAgICAgdGl0bGU6IHZhbHVlVGV4dCxcbiAgICAgICAgc3VidGl0bGU6IHN1YnRpdGxlIHx8IFwiLVwiLFxuICAgICAgfSBhcyBSZW1vdGVTZWFyY2hPcHRpb247XG4gICAgfSlcbiAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIFJlbW90ZVNlYXJjaE9wdGlvbltdO1xufTtcblxuLy8gUHJvamVjdCBmaWx0ZXIgaW5wdXQgYmFja2VkIGJ5IHJlbW90ZSBkcm9wZG93biBzdWdnZXN0aW9ucy5cbmNvbnN0IEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQgPSAoe1xuICBsYWJlbCxcbiAgcGxhY2Vob2xkZXIsXG4gIHZhbHVlLFxuICBvbkNoYW5nZSxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcbn06IEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXRQcm9wcykgPT4ge1xuICBjb25zdCBsb2FkT3B0aW9ucyA9IHVzZUNhbGxiYWNrKGFzeW5jICh0ZXJtOiBzdHJpbmcsIHNpZ25hbDogQWJvcnRTaWduYWwpOiBQcm9taXNlPFJlbW90ZVNlYXJjaE9wdGlvbltdPiA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VQcm9qZWN0cyh0ZXJtLCAxLCBTRUFSQ0hfUEFHRV9TSVpFLCB7XG4gICAgICBzaWduYWwsXG4gICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHJldHVybiBtYXBQcm9qZWN0T3B0aW9ucyhyZXNwb25zZT8uaXRlbXMpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgbG9hZE9wdGlvbnNQYWdlID0gdXNlQ2FsbGJhY2soYXN5bmMgKHRlcm06IHN0cmluZywgcGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyLCBzaWduYWw6IEFib3J0U2lnbmFsKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VQcm9qZWN0cyh0ZXJtLCBwYWdlLCBwYWdlU2l6ZSwge1xuICAgICAgc2lnbmFsLFxuICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaXRlbXM6IG1hcFByb2plY3RPcHRpb25zKHJlc3BvbnNlPy5pdGVtcyksXG4gICAgICB0b3RhbDogTnVtYmVyKHJlc3BvbnNlPy50b3RhbCB8fCAwKSxcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8UmVtb3RlU2VhcmNoQ29tYm9ib3hcbiAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgIG9uU2VhcmNoPXtsb2FkT3B0aW9uc31cbiAgICAgIG9uU2VhcmNoUGFnZT17bG9hZE9wdGlvbnNQYWdlfVxuICAgICAgaWRCYXNlPVwiZXhwZW5zZS1wcm9qZWN0LWZpbHRlclwiXG4gICAgICBtaW5TZWFyY2hMZW5ndGg9ezB9XG4gICAgICBwYWdlU2l6ZT17U0VBUkNIX1BBR0VfU0laRX1cbiAgICAgIGFsbG93RW1wdHlTZWFyY2hcbiAgICAgIGxvYWRPbk9wZW5cbiAgICAgIGluZmluaXRlU2Nyb2xsXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICBzaG93TGFiZWw9e3Nob3dMYWJlbH1cbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dDtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEZsb2F0aW5nTGlzdCBmcm9tIFwiLi9GbG9hdGluZ0xpc3QudHN4XCI7XG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi9TcGlubmVyLnRzeFwiO1xuaW1wb3J0IHsgQ2hldnJvbkRvd25TdmcsIENoZXZyb25VcFN2ZyB9IGZyb20gXCIuL2NoZXZyb25zLnRzeFwiO1xuaW1wb3J0IHsgaGFuZGxlQ29tYm9ib3hLZXlEb3duIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZUNvbWJvYm94S2V5Ym9hcmQudHNcIjtcbmltcG9ydCB7IHVzZU91dHNpZGVDbGljayB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHNcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5cbmV4cG9ydCB0eXBlIFJlbW90ZVNlYXJjaE9wdGlvbiA9IHtcbiAgdmFsdWU6IHN0cmluZztcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIHN1YnRpdGxlPzogc3RyaW5nO1xufTtcblxudHlwZSBSZW1vdGVTZWFyY2hDb21ib2JveFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uU2VhcmNoOiAodGVybTogc3RyaW5nLCBzaWduYWw6IEFib3J0U2lnbmFsKSA9PiBQcm9taXNlPFJlbW90ZVNlYXJjaE9wdGlvbltdPjtcbiAgb25TZWFyY2hQYWdlPzogKFxuICAgIHRlcm06IHN0cmluZyxcbiAgICBwYWdlOiBudW1iZXIsXG4gICAgcGFnZVNpemU6IG51bWJlcixcbiAgICBzaWduYWw6IEFib3J0U2lnbmFsXG4gICkgPT4gUHJvbWlzZTx7IGl0ZW1zOiBSZW1vdGVTZWFyY2hPcHRpb25bXTsgdG90YWw/OiBudW1iZXIgfT47XG4gIGlkQmFzZTogc3RyaW5nO1xuICBtaW5TZWFyY2hMZW5ndGg/OiBudW1iZXI7XG4gIHBhZ2VTaXplPzogbnVtYmVyO1xuICBhbGxvd0VtcHR5U2VhcmNoPzogYm9vbGVhbjtcbiAgbG9hZE9uT3Blbj86IGJvb2xlYW47XG4gIGluZmluaXRlU2Nyb2xsPzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICByZWFkT25seT86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG4gIHBhbmVsQ2xhc3NOYW1lPzogc3RyaW5nO1xufTtcblxuY29uc3QgdW5pcXVlQnlWYWx1ZSA9IChpdGVtczogUmVtb3RlU2VhcmNoT3B0aW9uW10pOiBSZW1vdGVTZWFyY2hPcHRpb25bXSA9PiB7XG4gIGNvbnN0IG1hcCA9IG5ldyBNYXA8c3RyaW5nLCBSZW1vdGVTZWFyY2hPcHRpb24+KCk7XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcyB8fCBbXSkge1xuICAgIGNvbnN0IGtleSA9IFN0cmluZyhpdGVtLnZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBpZiAoIWtleSkgY29udGludWU7XG4gICAgaWYgKG1hcC5oYXMoa2V5KSkgY29udGludWU7XG4gICAgbWFwLnNldChrZXksIHtcbiAgICAgIHZhbHVlOiBrZXksXG4gICAgICB0aXRsZTogU3RyaW5nKGl0ZW0udGl0bGUgfHwgXCJcIikudHJpbSgpLFxuICAgICAgc3VidGl0bGU6IFN0cmluZyhpdGVtLnN1YnRpdGxlIHx8IFwiXCIpLnRyaW0oKSxcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gQXJyYXkuZnJvbShtYXAudmFsdWVzKCkpO1xufTtcblxuLy8gR2VuZXJpYyByZW1vdGUtc2VhcmNoIGNvbWJvYm94IHRoYXQgc3VwcG9ydHMgbWFudWFsIHNlYXJjaCBhbmQgb3B0aW9uYWwgcGFnZWQgbG9hZGluZyBvbiBvcGVuLlxuY29uc3QgUmVtb3RlU2VhcmNoQ29tYm9ib3ggPSAoe1xuICBsYWJlbCxcbiAgcGxhY2Vob2xkZXIsXG4gIHZhbHVlLFxuICBvbkNoYW5nZSxcbiAgb25TZWFyY2gsXG4gIG9uU2VhcmNoUGFnZSxcbiAgaWRCYXNlLFxuICBtaW5TZWFyY2hMZW5ndGggPSAyLFxuICBwYWdlU2l6ZSA9IDIwLFxuICBhbGxvd0VtcHR5U2VhcmNoID0gZmFsc2UsXG4gIGxvYWRPbk9wZW4gPSBmYWxzZSxcbiAgaW5maW5pdGVTY3JvbGwgPSBmYWxzZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcbiAgcGFuZWxDbGFzc05hbWUgPSBcInZpc2l0YXMtdHlwb2dyYXBoeVwiLFxufTogUmVtb3RlU2VhcmNoQ29tYm9ib3hQcm9wcykgPT4ge1xuICBjb25zdCByZWFkT25seU1vZGUgPSByZWFkT25seSB8fCBkaXNhYmxlZDtcbiAgY29uc3QgdmFsdWVDb2xvciA9IHJlYWRPbmx5TW9kZSA/IFwiIzY0NzQ4YlwiIDogXCIjMDAyOTZiZTBcIjtcbiAgY29uc3QgW3F1ZXJ5LCBzZXRRdWVyeV0gPSB1c2VTdGF0ZSh2YWx1ZSB8fCBcIlwiKTtcbiAgY29uc3QgW29wdGlvbnMsIHNldE9wdGlvbnNdID0gdXNlU3RhdGU8UmVtb3RlU2VhcmNoT3B0aW9uW10+KFtdKTtcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthY3RpdmVJbmRleCwgc2V0QWN0aXZlSW5kZXhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtsYXN0U2VhcmNoZWRUZXJtLCBzZXRMYXN0U2VhcmNoZWRUZXJtXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbY3VycmVudFBhZ2UsIHNldEN1cnJlbnRQYWdlXSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbaGFzTW9yZSwgc2V0SGFzTW9yZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgYWJvcnRSZWYgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGFwcGVuZFJlcXVlc3RSZWYgPSB1c2VSZWYoZmFsc2UpO1xuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgYm94UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGxpc3RSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICB1c2VPdXRzaWRlQ2xpY2soW2NvbnRhaW5lclJlZiwgbGlzdFJlZl0sICgpID0+IHNldE9wZW4oZmFsc2UpKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldFF1ZXJ5KHZhbHVlIHx8IFwiXCIpO1xuICB9LCBbdmFsdWVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBhYm9ydFJlZi5jdXJyZW50Py5hYm9ydCgpO1xuICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGZpbHRlcmVkID0gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKCFxdWVyeS50cmltKCkpIHJldHVybiBvcHRpb25zO1xuICAgIGNvbnN0IHEgPSBxdWVyeS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gb3B0aW9ucy5maWx0ZXIoKG9wdGlvbikgPT4ge1xuICAgICAgY29uc3QgdmFsdWVUZXh0ID0gb3B0aW9uLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCB0aXRsZVRleHQgPSBTdHJpbmcob3B0aW9uLnRpdGxlIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCBzdWJ0aXRsZVRleHQgPSBTdHJpbmcob3B0aW9uLnN1YnRpdGxlIHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgICByZXR1cm4gdmFsdWVUZXh0LmluY2x1ZGVzKHEpIHx8IHRpdGxlVGV4dC5pbmNsdWRlcyhxKSB8fCBzdWJ0aXRsZVRleHQuaW5jbHVkZXMocSk7XG4gICAgfSk7XG4gIH0sIFtvcHRpb25zLCBxdWVyeV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGFwcGVuZFJlcXVlc3RSZWYuY3VycmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldEFjdGl2ZUluZGV4KDApO1xuICB9LCBbZmlsdGVyZWQubGVuZ3RoLCBxdWVyeV0pO1xuXG4gIGNvbnN0IGNhblNlYXJjaFRlcm0gPSB1c2VDYWxsYmFjayhcbiAgICAodGVybTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gICAgICBjb25zdCB0cmltbWVkID0gdGVybS50cmltKCk7XG4gICAgICBpZiAoIXRyaW1tZWQpIHJldHVybiBhbGxvd0VtcHR5U2VhcmNoO1xuICAgICAgcmV0dXJuIHRyaW1tZWQubGVuZ3RoID49IG1pblNlYXJjaExlbmd0aDtcbiAgICB9LFxuICAgIFthbGxvd0VtcHR5U2VhcmNoLCBtaW5TZWFyY2hMZW5ndGhdXG4gICk7XG5cbiAgY29uc3QgZXhlY3V0ZVNlYXJjaCA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jICh0ZXJtOiBzdHJpbmcsIHBhZ2U6IG51bWJlciwgYXBwZW5kOiBib29sZWFuKSA9PiB7XG4gICAgICBhYm9ydFJlZi5jdXJyZW50Py5hYm9ydCgpO1xuICAgICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQgPSBjb250cm9sbGVyO1xuICAgICAgYXBwZW5kUmVxdWVzdFJlZi5jdXJyZW50ID0gYXBwZW5kO1xuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcblxuICAgICAgY29uc3QgdGVybUtleSA9IHRlcm0udG9Mb3dlckNhc2UoKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChvblNlYXJjaFBhZ2UpIHtcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG9uU2VhcmNoUGFnZSh0ZXJtLCBwYWdlLCBwYWdlU2l6ZSwgY29udHJvbGxlci5zaWduYWwpO1xuICAgICAgICAgIGNvbnN0IHBhZ2VJdGVtcyA9IHVuaXF1ZUJ5VmFsdWUoQXJyYXkuaXNBcnJheShyZXNwb25zZT8uaXRlbXMpID8gcmVzcG9uc2UuaXRlbXMgOiBbXSk7XG4gICAgICAgICAgc2V0T3B0aW9ucygocHJldmlvdXMpID0+IChhcHBlbmQgPyB1bmlxdWVCeVZhbHVlKFsuLi4ocHJldmlvdXMgfHwgW10pLCAuLi5wYWdlSXRlbXNdKSA6IHBhZ2VJdGVtcykpO1xuICAgICAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xuXG4gICAgICAgICAgY29uc3QgYXBpVG90YWwgPSBOdW1iZXIocmVzcG9uc2U/LnRvdGFsKTtcbiAgICAgICAgICBpZiAoTnVtYmVyLmlzRmluaXRlKGFwaVRvdGFsKSAmJiBhcGlUb3RhbCA+IDApIHtcbiAgICAgICAgICAgIHNldEhhc01vcmUocGFnZSAqIHBhZ2VTaXplIDwgYXBpVG90YWwpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXRIYXNNb3JlKHBhZ2VJdGVtcy5sZW5ndGggPj0gcGFnZVNpemUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG9uU2VhcmNoKHRlcm0sIGNvbnRyb2xsZXIuc2lnbmFsKTtcbiAgICAgICAgICBjb25zdCBuZXh0ID0gdW5pcXVlQnlWYWx1ZShyZXNwb25zZSB8fCBbXSk7XG4gICAgICAgICAgc2V0T3B0aW9ucyhuZXh0KTtcbiAgICAgICAgICBzZXRDdXJyZW50UGFnZSgxKTtcbiAgICAgICAgICBzZXRIYXNNb3JlKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldExhc3RTZWFyY2hlZFRlcm0odGVybUtleSk7XG4gICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgaWYgKCFhcHBlbmQpIHtcbiAgICAgICAgICBzZXRPcHRpb25zKFtdKTtcbiAgICAgICAgICBzZXRDdXJyZW50UGFnZSgwKTtcbiAgICAgICAgICBzZXRIYXNNb3JlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRMYXN0U2VhcmNoZWRUZXJtKHRlcm1LZXkpO1xuICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKGFib3J0UmVmLmN1cnJlbnQgPT09IGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBhcHBlbmRSZXF1ZXN0UmVmLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbb25TZWFyY2gsIG9uU2VhcmNoUGFnZSwgcGFnZVNpemVdXG4gICk7XG5cbiAgY29uc3QgcnVuU2VhcmNoID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChyZWFkT25seU1vZGUgfHwgbG9hZGluZykgcmV0dXJuO1xuICAgIGNvbnN0IHRlcm0gPSBxdWVyeS50cmltKCk7XG4gICAgY29uc3QgdGVybUtleSA9IHRlcm0udG9Mb3dlckNhc2UoKTtcblxuICAgIGlmICghY2FuU2VhcmNoVGVybSh0ZXJtKSkge1xuICAgICAgc2V0T3B0aW9ucyhbXSk7XG4gICAgICBzZXRDdXJyZW50UGFnZSgwKTtcbiAgICAgIHNldEhhc01vcmUoZmFsc2UpO1xuICAgICAgc2V0T3BlbihmYWxzZSk7XG4gICAgICBzZXRMYXN0U2VhcmNoZWRUZXJtKFwiXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0ZXJtS2V5ID09PSBsYXN0U2VhcmNoZWRUZXJtICYmIG9wdGlvbnMubGVuZ3RoID4gMCAmJiAhb25TZWFyY2hQYWdlKSB7XG4gICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF3YWl0IGV4ZWN1dGVTZWFyY2godGVybSwgMSwgZmFsc2UpO1xuICB9LCBbY2FuU2VhcmNoVGVybSwgZXhlY3V0ZVNlYXJjaCwgbGFzdFNlYXJjaGVkVGVybSwgbG9hZGluZywgb25TZWFyY2hQYWdlLCBvcHRpb25zLmxlbmd0aCwgcXVlcnksIHJlYWRPbmx5TW9kZV0pO1xuXG4gIGNvbnN0IHJ1bkxvYWRNb3JlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChyZWFkT25seU1vZGUgfHwgbG9hZGluZyB8fCAhb25TZWFyY2hQYWdlIHx8ICFpbmZpbml0ZVNjcm9sbCB8fCAhaGFzTW9yZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRlcm0gPSBxdWVyeS50cmltKCk7XG4gICAgY29uc3QgdGVybUtleSA9IHRlcm0udG9Mb3dlckNhc2UoKTtcbiAgICBpZiAodGVybUtleSAhPT0gbGFzdFNlYXJjaGVkVGVybSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5leHRQYWdlID0gY3VycmVudFBhZ2UgKyAxO1xuICAgIGlmIChuZXh0UGFnZSA8PSAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgZXhlY3V0ZVNlYXJjaCh0ZXJtLCBuZXh0UGFnZSwgdHJ1ZSk7XG4gIH0sIFtjdXJyZW50UGFnZSwgZXhlY3V0ZVNlYXJjaCwgaGFzTW9yZSwgaW5maW5pdGVTY3JvbGwsIGxhc3RTZWFyY2hlZFRlcm0sIGxvYWRpbmcsIG9uU2VhcmNoUGFnZSwgcXVlcnksIHJlYWRPbmx5TW9kZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFvcGVuIHx8ICFvblNlYXJjaFBhZ2UgfHwgIWluZmluaXRlU2Nyb2xsKSByZXR1cm47XG4gICAgY29uc3Qgc2Nyb2xsZXIgPSBsaXN0UmVmLmN1cnJlbnQ/LnBhcmVudEVsZW1lbnQ7XG4gICAgaWYgKCFzY3JvbGxlcikgcmV0dXJuO1xuXG4gICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiB7XG4gICAgICBpZiAobG9hZGluZyB8fCAhaGFzTW9yZSkgcmV0dXJuO1xuICAgICAgY29uc3QgdGhyZXNob2xkID0gNDA7XG4gICAgICBjb25zdCBpc05lYXJCb3R0b20gPSBzY3JvbGxlci5zY3JvbGxUb3AgKyBzY3JvbGxlci5jbGllbnRIZWlnaHQgPj0gc2Nyb2xsZXIuc2Nyb2xsSGVpZ2h0IC0gdGhyZXNob2xkO1xuICAgICAgaWYgKGlzTmVhckJvdHRvbSkge1xuICAgICAgICB2b2lkIHJ1bkxvYWRNb3JlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNjcm9sbGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgc2Nyb2xsZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCk7XG4gICAgfTtcbiAgfSwgW2hhc01vcmUsIGluZmluaXRlU2Nyb2xsLCBsb2FkaW5nLCBvblNlYXJjaFBhZ2UsIG9wZW4sIHJ1bkxvYWRNb3JlXSk7XG5cbiAgY29uc3Qgc2VsZWN0T3B0aW9uID0gKG9wdGlvbjogUmVtb3RlU2VhcmNoT3B0aW9uKSA9PiB7XG4gICAgY29uc3QgbmV4dFZhbHVlID0gU3RyaW5nKG9wdGlvbi52YWx1ZSB8fCBcIlwiKS50cmltKCk7XG4gICAgc2V0UXVlcnkobmV4dFZhbHVlKTtcbiAgICBvbkNoYW5nZShuZXh0VmFsdWUpO1xuICAgIHNldExhc3RTZWFyY2hlZFRlcm0obmV4dFZhbHVlLnRvTG93ZXJDYXNlKCkpO1xuICAgIHNldE9wZW4oZmFsc2UpO1xuICB9O1xuXG4gIGNvbnN0IHF1ZXJ5S2V5ID0gcXVlcnkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IHNob3dTZWFyY2hJY29uID1cbiAgICAhcmVhZE9ubHlNb2RlICYmXG4gICAgIWxvYWRpbmcgJiZcbiAgICBjYW5TZWFyY2hUZXJtKHF1ZXJ5KSAmJlxuICAgIHF1ZXJ5S2V5ICE9PSBsYXN0U2VhcmNoZWRUZXJtO1xuXG4gIGNvbnN0IGxpc3RJZCA9IGAke2lkQmFzZX0tb3B0aW9uc2A7XG4gIGNvbnN0IGFjdGl2ZUlkID0gb3BlbiAmJiBmaWx0ZXJlZFthY3RpdmVJbmRleF0gPyBgJHtpZEJhc2V9LW9wdC0ke2ZpbHRlcmVkW2FjdGl2ZUluZGV4XS52YWx1ZX1gIDogdW5kZWZpbmVkO1xuICBjb25zdCBzaG93TG9hZGluZ09ubHlTdGF0ZSA9IGxvYWRpbmcgJiYgZmlsdGVyZWQubGVuZ3RoID09PSAwO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIiByZWY9e2NvbnRhaW5lclJlZn0+XG4gICAgICB7c2hvd0xhYmVsID8gKFxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIgc3R5bGU9e3sgY29sb3I6IFwiIzAwMjk2YmUwXCIgfX0+XG4gICAgICAgICAge2xhYmVsfVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgKSA6IG51bGx9XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e2JveFJlZn1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICBcInJlbGF0aXZlIHctZnVsbCByb3VuZGVkLXhsIGJnLXdoaXRlIHRleHQtbGVmdCBmb2N1cy13aXRoaW46Ym9yZGVyLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctMiBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLW9mZnNldC13aGl0ZSBzbTp0ZXh0LXNtXCIsXG4gICAgICAgICAgICByZWFkT25seU1vZGUgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJcIlxuICAgICAgICAgICl9XG4gICAgICAgID5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgXCJ3LWZ1bGwgcm91bmRlZC14bCBib3JkZXIgcHgtMyBweS0yIHByLTIwIHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZGlzYWJsZWQ6Ymctc2xhdGUtMTAwIGRpc2FibGVkOnRleHQtc2xhdGUtNTAwIGRpc2FibGVkOmJvcmRlci1zbGF0ZS0yMDAgZGlzYWJsZWQ6Y3Vyc29yLW5vdC1hbGxvd2VkXCIsXG4gICAgICAgICAgICAgIFwiYm9yZGVyLXNsYXRlLTIwMCBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIixcbiAgICAgICAgICAgICAgcmVhZE9ubHlNb2RlID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwidGV4dC1zbGF0ZS05MDBcIlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHN0eWxlPXt7IGNvbG9yOiB2YWx1ZUNvbG9yIH19XG4gICAgICAgICAgICB2YWx1ZT17cXVlcnl9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG5leHRWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgICAgICAgc2V0UXVlcnkobmV4dFZhbHVlKTtcbiAgICAgICAgICAgICAgb25DaGFuZ2UobmV4dFZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKG5leHRWYWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKSAhPT0gbGFzdFNlYXJjaGVkVGVybSkge1xuICAgICAgICAgICAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25Gb2N1cz17KCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoIXJlYWRPbmx5TW9kZSAmJiBmaWx0ZXJlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uS2V5RG93bj17KGV2ZW50KSA9PlxuICAgICAgICAgICAgICBoYW5kbGVDb21ib2JveEtleURvd24oZXZlbnQsIHtcbiAgICAgICAgICAgICAgICBpc09wZW46IG9wZW4sXG4gICAgICAgICAgICAgICAgc2V0T3BlbixcbiAgICAgICAgICAgICAgICBvcHRpb25Db3VudDogZmlsdGVyZWQubGVuZ3RoLFxuICAgICAgICAgICAgICAgIHNldEFjdGl2ZUluZGV4LFxuICAgICAgICAgICAgICAgIG9uRW50ZXJXaGVuT3BlbjogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uKGZpbHRlcmVkW2FjdGl2ZUluZGV4XSA/PyBmaWx0ZXJlZFswXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHZvaWQgcnVuU2VhcmNoKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbkVudGVyV2hlbkNsb3NlZDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdm9pZCBydW5TZWFyY2goKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9wZW5PbkFycm93OiB0cnVlLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWx9XG4gICAgICAgICAgICByb2xlPVwiY29tYm9ib3hcIlxuICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17b3Blbn1cbiAgICAgICAgICAgIGFyaWEtY29udHJvbHM9e2xpc3RJZH1cbiAgICAgICAgICAgIGFyaWEtYWN0aXZlZGVzY2VuZGFudD17YWN0aXZlSWR9XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQteS0wIHJpZ2h0LTAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHItMlwiPlxuICAgICAgICAgICAge2xvYWRpbmcgPyAoXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHB4LTEuNVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTQgdy00XCIgLz5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICAgIHtzaG93U2VhcmNoSWNvbiA/IChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHAtMS41IHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtc2xhdGUtNTAwXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB2b2lkIHJ1blNlYXJjaCgpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9TZWFyY2hcIiwgXCJTZWFyY2hcIil9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3JlYWRPbmx5TW9kZX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZVdpZHRoPXsxLjV9IHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT1cImgtNSB3LTVcIj5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTE1Ljc1IDE1Ljc1LTIuNDg5LTIuNDg5bTAgMGEzLjM3NSAzLjM3NSAwIDEgMC00Ljc3My00Ljc3MyAzLjM3NSAzLjM3NSAwIDAgMCA0Ljc3NCA0Ljc3NFpNMjEgMTJhOSA5IDAgMSAxLTE4IDAgOSA5IDAgMCAxIDE4IDBaXCIgLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcC0xLjUgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS02MDBcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlYWRPbmx5TW9kZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmIChvcGVuKSB7XG4gICAgICAgICAgICAgICAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFxdWVyeS50cmltKCkgJiYgbG9hZE9uT3Blbikge1xuICAgICAgICAgICAgICAgICAgdm9pZCBydW5TZWFyY2goKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e29wZW4gPyBpbmRUKFwiRHJvcGRvd25fSGlkZU9wdGlvbnNcIiwgXCJIaWRlIG9wdGlvbnNcIikgOiBpbmRUKFwiRHJvcGRvd25fU2hvd09wdGlvbnNcIiwgXCJTaG93IG9wdGlvbnNcIil9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtyZWFkT25seU1vZGV9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtvcGVuID8gPENoZXZyb25VcFN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz4gOiA8Q2hldnJvbkRvd25TdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+fVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8RmxvYXRpbmdMaXN0XG4gICAgICAgICAgYW5jaG9yUmVmPXtib3hSZWZ9XG4gICAgICAgICAgb3Blbj17b3Blbn1cbiAgICAgICAgICB6SW5kZXg9ezM2MDAwMH1cbiAgICAgICAgICBtYXhIZWlnaHRDbGFzcz1cIm1heC1oLTcyXCJcbiAgICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgICAgcm91bmRlZENsYXNzPVwicm91bmRlZC14bFwiXG4gICAgICAgICAgcGFuZWxDbGFzc05hbWU9e3BhbmVsQ2xhc3NOYW1lfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBpZD17bGlzdElkfSByZWY9e2xpc3RSZWZ9PlxuICAgICAgICAgICAge3Nob3dMb2FkaW5nT25seVN0YXRlID8gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PC9kaXY+XG4gICAgICAgICAgICApIDogZmlsdGVyZWQubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+e2luZFQoXCJDb21tb25fTm9EYXRhXCIsIFwiTm8gZGF0YVwiKX08L2Rpdj5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAge2ZpbHRlcmVkLm1hcCgob3B0aW9uLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBpbmRleCA9PT0gYWN0aXZlSW5kZXg7XG4gICAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25JZCA9IG9wdGlvbi52YWx1ZSB8fCBgJHtpbmRleH1gO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIGtleT17b3B0aW9uSWR9XG4gICAgICAgICAgICAgICAgICAgICAgaWQ9e2Ake2lkQmFzZX0tb3B0LSR7b3B0aW9uSWR9YH1cbiAgICAgICAgICAgICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBhcmlhLXNlbGVjdGVkPXtpc0FjdGl2ZX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlbGF0aXZlIGZsZXggdy1mdWxsIGN1cnNvci1kZWZhdWx0IHNlbGVjdC1ub25lIGl0ZW1zLXN0YXJ0IHB5LTIgcHgtMyB0ZXh0LWxlZnQgdGV4dC1zbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyBcImJnLXByaW1hcnkgdGV4dC13aGl0ZVwiIDogXCJ0ZXh0LXNsYXRlLTkwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldEFjdGl2ZUluZGV4KGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZWxlY3RPcHRpb24ob3B0aW9uKX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtXCI+e29wdGlvbi50aXRsZSB8fCBvcHRpb24udmFsdWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge29wdGlvbi5zdWJ0aXRsZSA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwidGV4dC14c1wiLCBpc0FjdGl2ZSA/IFwidGV4dC13aGl0ZS85MFwiIDogXCJ0ZXh0LXNsYXRlLTUwMFwiKX0+e29wdGlvbi5zdWJ0aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICB7bG9hZGluZyA/IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQteHMgdGV4dC1zbGF0ZS01MDAgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTEwMFwiPntpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfTwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvRmxvYXRpbmdMaXN0PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBSZW1vdGVTZWFyY2hDb21ib2JveDtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ08sSUFBTSwyQkFBMkIsQ0FDdEMsUUFDQSxjQUNBLFdBQ1c7QUFDWCxNQUFJLFdBQVcsUUFBUSxXQUFXLFVBQWEsT0FBTyxNQUFNLE9BQU8sTUFBTSxDQUFDLEdBQUc7QUFDM0UsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLGFBQ0osV0FDQyxPQUFPLGFBQWEsZUFBZSxTQUFTLGdCQUFnQixPQUN6RCxTQUFTLGdCQUFnQixPQUN6QjtBQUNOLFFBQU0sZUFBZSxPQUFPLGdCQUFnQixFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVk7QUFFbkUsTUFBSSxjQUFjO0FBQ2hCLFFBQUk7QUFDRixhQUFPLElBQUksS0FBSyxhQUFhLFlBQVk7QUFBQSxRQUN2QyxPQUFPO0FBQUEsUUFDUCxVQUFVO0FBQUEsUUFDVix1QkFBdUI7QUFBQSxRQUN2Qix1QkFBdUI7QUFBQSxNQUN6QixDQUFDLEVBQUUsT0FBTyxNQUFNO0FBQUEsSUFDbEIsUUFBUTtBQUFBLElBRVI7QUFBQSxFQUNGO0FBRUEsUUFBTSxjQUFjLElBQUksS0FBSyxhQUFhLFlBQVk7QUFBQSxJQUNwRCx1QkFBdUI7QUFBQSxJQUN2Qix1QkFBdUI7QUFBQSxFQUN6QixDQUFDLEVBQUUsT0FBTyxNQUFNO0FBRWhCLFNBQU8sZUFBZSxHQUFHLFdBQVcsSUFBSSxZQUFZLEtBQUs7QUFDM0Q7OztBQ2lEQSxJQUFNLG1CQUFtQjtBQUN6QixJQUFNLGVBQXVDO0FBQUEsRUFDM0MsZ0JBQWdCO0FBQ2xCO0FBRUEsSUFBSSxrQkFBK0MsQ0FBQztBQUNwRCxJQUFJLGdCQUEwQztBQUM5QyxJQUFJLG1CQUFtQjtBQUN2QixJQUFJLGlCQUFvRDtBQUN4RCxJQUFNLDBCQUEwQixv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LE1BQ3JFO0FBQUEsTUFDQSx5QkFBeUI7QUFBQSxJQUMzQixDQUFDO0FBRUQsV0FBTyxrQkFBa0IsVUFBVSxLQUFLO0FBQUEsRUFDMUMsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLHNCQUFrQiwyQkFBWSxPQUFPLE1BQWMsTUFBYyxVQUFrQixXQUF3QjtBQUMvRyxVQUFNLFdBQVcsTUFBTSxxQkFBcUIsTUFBTSxNQUFNLFVBQVU7QUFBQSxNQUNoRTtBQUFBLE1BQ0EseUJBQXlCO0FBQUEsSUFDM0IsQ0FBQztBQUVELFdBQU87QUFBQSxNQUNMLE9BQU8sa0JBQWtCLFVBQVUsS0FBSztBQUFBLE1BQ3hDLE9BQU8sT0FBTyxVQUFVLFNBQVMsQ0FBQztBQUFBLElBQ3BDO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUVMLFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSxVQUFVO0FBQUEsTUFDVixjQUFjO0FBQUEsTUFDZCxRQUFPO0FBQUEsTUFDUCxpQkFBaUI7QUFBQSxNQUNqQixVQUFVO0FBQUEsTUFDVixrQkFBZ0I7QUFBQSxNQUNoQixZQUFVO0FBQUEsTUFDVixnQkFBYztBQUFBLE1BQ2Q7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsZ0JBQWU7QUFBQTtBQUFBLEVBQ2pCO0FBRUo7QUFFQSxJQUFPLG9DQUFROyIsCiAgIm5hbWVzIjogWyJzYWZlVGV4dCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
