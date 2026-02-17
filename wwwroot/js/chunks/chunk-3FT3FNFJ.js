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
  if (!axUserId || !companyId) {
    throw new ApiFetchError("Could not resolve Entra company context.");
  }
  return {
    token: "",
    companyId,
    axUserId,
    defaultCurrencyCode
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
      defaultCurrencyCode: ""
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
    billedMode: payload.billedMode ?? 0,
    fromDate: safeText(payload.createdDateFrom),
    toDate: safeText(payload.createdDateTo),
    projectId: safeText(payload.projId),
    currencyCode: safeText(payload.currencyCode),
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
  return {
    lineRecId: safeText(line.RecId),
    transDate: safeText(line.TransDate),
    typeValueCode,
    typeValue: resolveTypeLabel(typeValueCode),
    description: safeText(line.Description),
    internacional: toNullableBool(line.Internacional),
    ticket: toNullableBool(line.Ticket),
    qty: toNullableNumber(line.Qty),
    amount: toNullableNumber(line.Amount),
    projId: safeText(line.ProjId),
    indAttachFiles: safeText(line.IndAttachFiles)
  };
};
var fetchExpenseSheetList = async (payload, options) => {
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
var createExpenseSheet = async (payload, options) => {
  const context = await ensureExpenseApiContext(options);
  const mode = payload.mode ?? 0;
  const lines = Array.isArray(payload.lines) ? payload.lines : [];
  if (payload.expenseSheetStatus !== void 0 && !isNonNegativeNumber(payload.expenseSheetStatus)) {
    throw new ApiFetchError("expenseSheetStatus must be greater or equal to 0.");
  }
  if (payload.exchangeRateMode !== void 0 && !isNonNegativeNumber(payload.exchangeRateMode)) {
    throw new ApiFetchError("exchangeRateMode must be greater or equal to 0.");
  }
  if (payload.exchangeRateMode !== void 0 && payload.expenseSheetStatus === void 0) {
    throw new ApiFetchError("exchangeRateMode requires expenseSheetStatus.");
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
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { id: listId, ref: listRef, children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Common_Loading", "Loading") }) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Common_NoData", "No data") }) : filtered.map((option, index) => {
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
          }) })
        }
      )
    ] })
  ] });
};
var RemoteSearchCombobox_default = RemoteSearchCombobox;

// Web/wwwroot/react/src/pages/gastos/components/ExpenseProjectFilterInput.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var SEARCH_PAGE_SIZE = 10;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9leHBlbnNlRm9ybWF0dGVycy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VBcGkudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlVWlVdGlscy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VOYXZpZ2F0aW9uLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvY29tcG9uZW50cy9FeHBlbnNlUHJvamVjdEZpbHRlcklucHV0LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL1JlbW90ZVNlYXJjaENvbWJvYm94LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gRm9ybWF0cyBhIG51bWVyaWMgYW1vdW50IHVzaW5nIHRoZSBwcm92aWRlZCBjdXJyZW5jeSBjb2RlIHdoZW4gcG9zc2libGUuXG5leHBvcnQgY29uc3QgZm9ybWF0QW1vdW50V2l0aEN1cnJlbmN5ID0gKFxuICBhbW91bnQ6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQsXG4gIGN1cnJlbmN5Q29kZT86IHN0cmluZyxcbiAgbG9jYWxlPzogc3RyaW5nXG4pOiBzdHJpbmcgPT4ge1xuICBpZiAoYW1vdW50ID09PSBudWxsIHx8IGFtb3VudCA9PT0gdW5kZWZpbmVkIHx8IE51bWJlci5pc05hTihOdW1iZXIoYW1vdW50KSkpIHtcbiAgICByZXR1cm4gXCItXCI7XG4gIH1cblxuICBjb25zdCBzYWZlTG9jYWxlID1cbiAgICBsb2NhbGUgfHxcbiAgICAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nXG4gICAgICA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nXG4gICAgICA6IFwiZXMtRVNcIik7XG4gIGNvbnN0IHNhZmVDdXJyZW5jeSA9IFN0cmluZyhjdXJyZW5jeUNvZGUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XG5cbiAgaWYgKHNhZmVDdXJyZW5jeSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gbmV3IEludGwuTnVtYmVyRm9ybWF0KHNhZmVMb2NhbGUsIHtcbiAgICAgICAgc3R5bGU6IFwiY3VycmVuY3lcIixcbiAgICAgICAgY3VycmVuY3k6IHNhZmVDdXJyZW5jeSxcbiAgICAgICAgbWluaW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICAgICAgICBtYXhpbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgICB9KS5mb3JtYXQoYW1vdW50KTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIEZhbGwgdGhyb3VnaCB0byBkZWNpbWFsIGZhbGxiYWNrIHdoZW4gY3VycmVuY3kgY29kZSBpcyBpbnZhbGlkLlxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRlY2ltYWxUZXh0ID0gbmV3IEludGwuTnVtYmVyRm9ybWF0KHNhZmVMb2NhbGUsIHtcbiAgICBtaW5pbXVtRnJhY3Rpb25EaWdpdHM6IDIsXG4gICAgbWF4aW11bUZyYWN0aW9uRGlnaXRzOiAyLFxuICB9KS5mb3JtYXQoYW1vdW50KTtcblxuICByZXR1cm4gc2FmZUN1cnJlbmN5ID8gYCR7ZGVjaW1hbFRleHR9ICR7c2FmZUN1cnJlbmN5fWAgOiBkZWNpbWFsVGV4dDtcbn07XG4iLCAiaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciwgZmV0Y2hKc29uLCB0eXBlIEFwaUZldGNoT3B0aW9ucyB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgdHlwZSB7XG4gIEVudHJhQ29udGV4dER0byxcbiAgRW50cmFDb250ZXh0UmVxdWVzdCxcbiAgRXhjaGFuZ2VSYXRlRHRvLFxuICBFeHBlbnNlU2hlZXRDYXJkLFxuICBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0byxcbiAgRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0Q3JlYXRlUmVzcG9uc2VEYXRhLFxuICBFeHBlbnNlU2hlZXREZXRhaWxEdG8sXG4gIEV4cGVuc2VTaGVldEhlYWRlcixcbiAgRXhwZW5zZVNoZWV0SGVhZGVyVXBkYXRlUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0TGluZSxcbiAgRXhwZW5zZVNoZWV0TGluZUR0byxcbiAgRXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXNwb25zZURhdGEsXG4gIEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byxcbiAgSW5kQXBpUmVzcG9uc2UsXG4gIEluZFBhZ2VkUmVzcG9uc2UsXG59IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcblxudHlwZSBQcm9qZWN0RHJvcGRvd25SZXNwb25zZSA9IHtcbiAgdG90YWw/OiBudW1iZXI7XG4gIGl0ZW1zPzogQXJyYXk8eyB2YWx1ZT86IHN0cmluZzsgdGV4dD86IHN0cmluZyB9Pjtcbn07XG5cbnR5cGUgTGVnYWN5RXhwZW5zZUxpc3RJdGVtID0ge1xuICBob2phR2FzdG9zSWQ/OiB1bmtub3duO1xuICBkZXNjcmlwdGlvbj86IHVua25vd247XG4gIHZvdWNoZXI/OiB1bmtub3duO1xuICBwcm9qSWQ/OiB1bmtub3duO1xuICBjdXJyZW5jeUNvZGU/OiB1bmtub3duO1xuICB0b3RhbEFtb3VudD86IHVua25vd247XG4gIHRvdGFsQW1vdW50TVNUPzogdW5rbm93bjtcbiAgZXhjaFJhdGU/OiB1bmtub3duO1xuICB1c2VySWQ/OiB1bmtub3duO1xuICBleGNoYW5nZVJhdGVNb2RlPzogdW5rbm93bjtcbiAgZXhwZW5zZVNoZWV0U3RhdHVzPzogdW5rbm93bjtcbiAgY3JlYXRlZERhdGU/OiB1bmtub3duO1xufTtcblxudHlwZSBMZWdhY3lFeHBlbnNlTGlzdFJlc3BvbnNlID0ge1xuICBzdWNjZXNzPzogYm9vbGVhbjtcbiAgbWVzc2FnZT86IHN0cmluZztcbiAgdG90YWw/OiBudW1iZXI7XG4gIHBhZ2U/OiBudW1iZXI7XG4gIHBhZ2VTaXplPzogbnVtYmVyO1xuICBpdGVtcz86IExlZ2FjeUV4cGVuc2VMaXN0SXRlbVtdO1xufTtcblxudHlwZSBFeHBlbnNlQXBpQ29udGV4dCA9IHtcbiAgdG9rZW46IHN0cmluZztcbiAgY29tcGFueUlkOiBzdHJpbmc7XG4gIGF4VXNlcklkOiBzdHJpbmc7XG4gIGRlZmF1bHRDdXJyZW5jeUNvZGU6IHN0cmluZztcbn07XG5cbnR5cGUgRXhwZW5zZUFwaUF1dGhTZWVkID0ge1xuICB0b2tlbjogc3RyaW5nO1xuICBlbnRyYU9pZDogc3RyaW5nO1xuICBhcHBDb2RlOiBzdHJpbmc7XG4gIHN0cmljdEFwaVJvdXRlczogYm9vbGVhbjtcbn07XG5cbnR5cGUgRXhwZW5zZVdpbmRvd1J1bnRpbWUgPSB7XG4gIF9fSU5EX0FQSV9UT0tFTl9fPzogc3RyaW5nO1xuICBfX0lORF9FTlRSQV9PSURfXz86IHN0cmluZztcbiAgX19JTkRfQVBQX0NPREVfXz86IHN0cmluZztcbiAgX19JTkRfU0VMRUNURURfQ09NUEFOWV9fPzogc3RyaW5nO1xuICBfX0lORF9FWFBFTlNFX1NUUklDVF9BUElfXz86IGJvb2xlYW4gfCBzdHJpbmc7XG4gIF9fRVhQRU5TRV9HQVNUT19UWVBFU19fPzogQXJyYXk8e1xuICAgIHZhbHVlPzogdW5rbm93bjtcbiAgICBWYWx1ZT86IHVua25vd247XG4gICAgdGV4dD86IHVua25vd247XG4gICAgVGV4dD86IHVua25vd247XG4gIH0+O1xufTtcblxudHlwZSBFeHBlbnNlR2FzdG9UeXBlRW50cnkgPSBOb25OdWxsYWJsZTxFeHBlbnNlV2luZG93UnVudGltZVtcIl9fRVhQRU5TRV9HQVNUT19UWVBFU19fXCJdPltudW1iZXJdO1xuXG5jb25zdCBERUZBVUxUX0FQUF9DT0RFID0gXCJDUk1cIjtcbmNvbnN0IEpTT05fSEVBREVSUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG59O1xuXG5sZXQgcnVudGltZUF1dGhTZWVkOiBQYXJ0aWFsPEV4cGVuc2VBcGlBdXRoU2VlZD4gPSB7fTtcbmxldCBjYWNoZWRDb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCB8IG51bGwgPSBudWxsO1xubGV0IGNhY2hlZENvbnRleHRLZXkgPSBcIlwiO1xubGV0IGNvbnRleHRQcm9taXNlOiBQcm9taXNlPEV4cGVuc2VBcGlDb250ZXh0PiB8IG51bGwgPSBudWxsO1xuY29uc3QgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMgPSBuZXcgTWFwPHN0cmluZywgSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+KCk7XG5jb25zdCBwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cyA9IG5ldyBNYXA8c3RyaW5nLCBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+Pj4oKTtcblxuY29uc3Qgc2FmZVRleHQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XG4gIHJldHVybiBTdHJpbmcodmFsdWUpLnRyaW0oKTtcbn07XG5cbmNvbnN0IHRvTnVsbGFibGVOdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgPyBwYXJzZWQgOiBudWxsO1xufTtcblxuY29uc3QgaXNOb25OZWdhdGl2ZU51bWJlciA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBwYXJzZWQgPSB0b051bGxhYmxlTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIHBhcnNlZCAhPT0gbnVsbCAmJiBwYXJzZWQgPj0gMDtcbn07XG5cbmNvbnN0IHRvTnVsbGFibGVCb29sID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiB8IG51bGwgPT4ge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGw7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSByZXR1cm4gdmFsdWU7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICBjb25zdCBub3JtYWxpemVkID0gdmFsdWUudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKG5vcm1hbGl6ZWQgPT09IFwidHJ1ZVwiIHx8IG5vcm1hbGl6ZWQgPT09IFwiMVwiKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAobm9ybWFsaXplZCA9PT0gXCJmYWxzZVwiIHx8IG5vcm1hbGl6ZWQgPT09IFwiMFwiKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikge1xuICAgIGlmICh2YWx1ZSA9PT0gMSkgcmV0dXJuIHRydWU7XG4gICAgaWYgKHZhbHVlID09PSAwKSByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59O1xuXG5jb25zdCB0b0ZsYWdCb29sID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiB8IG51bGwgPT4ge1xuICBjb25zdCBub3JtYWxpemVkQm9vbCA9IHRvTnVsbGFibGVCb29sKHZhbHVlKTtcbiAgaWYgKG5vcm1hbGl6ZWRCb29sICE9PSBudWxsKSByZXR1cm4gbm9ybWFsaXplZEJvb2w7XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikgcmV0dXJuIG51bGw7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSB2YWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gbnVsbDtcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwib25cIiB8fCBub3JtYWxpemVkID09PSBcInllc1wiIHx8IG5vcm1hbGl6ZWQgPT09IFwieVwiKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwib2ZmXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJub1wiIHx8IG5vcm1hbGl6ZWQgPT09IFwiblwiKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBudWxsO1xufTtcblxuY29uc3QgcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lID0gKCk6IEV4cGVuc2VXaW5kb3dSdW50aW1lID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiB7fTtcbiAgcmV0dXJuIHdpbmRvdyBhcyB1bmtub3duIGFzIEV4cGVuc2VXaW5kb3dSdW50aW1lO1xufTtcblxuY29uc3Qgc2FuaXRpemVIZWFkZXJzID0gKGhlYWRlcnM6IEhlYWRlcnNJbml0IHwgdW5kZWZpbmVkKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9PiB7XG4gIGlmICghaGVhZGVycykgcmV0dXJuIHt9O1xuXG4gIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgIGNvbnN0IHJlc3VsdDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICAgIGhlYWRlcnMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcbiAgICByZXR1cm4gaGVhZGVycy5yZWR1Y2U8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4oKGFjYywgW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICBhY2NbU3RyaW5nKGtleSldID0gU3RyaW5nKHZhbHVlKTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGhlYWRlcnMpLnJlZHVjZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PigoYWNjLCBba2V5LCB2YWx1ZV0pID0+IHtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuIGFjYztcbiAgICBhY2Nba2V5XSA9IFN0cmluZyh2YWx1ZSk7XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xufTtcblxuY29uc3QgZ2V0SGVhZGVyVmFsdWUgPSAoaGVhZGVyczogSGVhZGVyc0luaXQgfCB1bmRlZmluZWQsIGtleTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZEtleSA9IGtleS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHNhbml0aXplSGVhZGVycyhoZWFkZXJzKSk7XG4gIGNvbnN0IG1hdGNoID0gZW50cmllcy5maW5kKChbaGVhZGVyS2V5XSkgPT4gaGVhZGVyS2V5LnRyaW0oKS50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkS2V5KTtcbiAgcmV0dXJuIHNhZmVUZXh0KG1hdGNoPy5bMV0pO1xufTtcblxuY29uc3QgcmVtb3ZlSGVhZGVyVmFsdWUgPSAoaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiwga2V5OiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZEtleSA9IGtleS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgdG9EZWxldGUgPSBPYmplY3Qua2V5cyhoZWFkZXJzKS5maW5kKChoZWFkZXJLZXkpID0+IGhlYWRlcktleS50cmltKCkudG9Mb3dlckNhc2UoKSA9PT0gbm9ybWFsaXplZEtleSk7XG4gIGlmICghdG9EZWxldGUpIHJldHVybjtcbiAgZGVsZXRlIGhlYWRlcnNbdG9EZWxldGVdO1xufTtcblxuY29uc3QgcmVzb2x2ZUJlYXJlclRva2VuID0gKGhlYWRlcnM6IEhlYWRlcnNJbml0IHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcbiAgY29uc3QgYXV0aG9yaXphdGlvbiA9IGdldEhlYWRlclZhbHVlKGhlYWRlcnMsIFwiQXV0aG9yaXphdGlvblwiKTtcbiAgaWYgKCFhdXRob3JpemF0aW9uKSByZXR1cm4gXCJcIjtcblxuICBpZiAoL15iZWFyZXJcXHMrL2kudGVzdChhdXRob3JpemF0aW9uKSkge1xuICAgIHJldHVybiBhdXRob3JpemF0aW9uLnJlcGxhY2UoL15iZWFyZXJcXHMrL2ksIFwiXCIpLnRyaW0oKTtcbiAgfVxuXG4gIHJldHVybiBhdXRob3JpemF0aW9uLnRyaW0oKTtcbn07XG5cbmNvbnN0IHJlYWRXaW5kb3dBdXRoU2VlZCA9ICgpOiBQYXJ0aWFsPEV4cGVuc2VBcGlBdXRoU2VlZD4gPT4ge1xuICBjb25zdCBydW50aW1lV2luZG93ID0gcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lKCk7XG5cbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogc2FmZVRleHQocnVudGltZVdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHJ1bnRpbWVXaW5kb3cuX19JTkRfRU5UUkFfT0lEX18pLFxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHJ1bnRpbWVXaW5kb3cuX19JTkRfQVBQX0NPREVfXyksXG4gICAgc3RyaWN0QXBpUm91dGVzOiB0b0ZsYWdCb29sKHJ1bnRpbWVXaW5kb3cuX19JTkRfRVhQRU5TRV9TVFJJQ1RfQVBJX18pID09PSB0cnVlLFxuICB9O1xufTtcblxuY29uc3QgcmVhZFJ1bnRpbWVTdHJpY3RBcGlGbGFnID0gKCk6IGJvb2xlYW4gPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBydW50aW1lV2luZG93ID0gcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lKCk7XG5cbiAgY29uc3QgZXhwbGljaXRXaW5kb3dGbGFnID0gdG9GbGFnQm9vbChydW50aW1lV2luZG93Ll9fSU5EX0VYUEVOU0VfU1RSSUNUX0FQSV9fKTtcbiAgcmV0dXJuIGV4cGxpY2l0V2luZG93RmxhZyA9PT0gdHJ1ZTtcbn07XG5cbmNvbnN0IHJlYWRXaW5kb3dTZWxlY3RlZENvbXBhbnkgPSAoKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIHNhZmVUZXh0KHJlYWRFeHBlbnNlV2luZG93UnVudGltZSgpLl9fSU5EX1NFTEVDVEVEX0NPTVBBTllfXykudG9VcHBlckNhc2UoKTtcbn07XG5cbmNvbnN0IGJ1aWxkQ29udGV4dEtleSA9IChzZWVkOiBFeHBlbnNlQXBpQXV0aFNlZWQpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gYCR7c2VlZC50b2tlbn18JHtzZWVkLmVudHJhT2lkfXwke3NlZWQuYXBwQ29kZX18JHtyZWFkV2luZG93U2VsZWN0ZWRDb21wYW55KCl9YDtcbn07XG5cbmNvbnN0IGJ1aWxkRXhwZW5zZUhlYWRlcnMgPSAoXG4gIGNvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zLFxuICBpbmNsdWRlSnNvbiA9IGZhbHNlLFxuICBpbmNsdWRlQXhVc2VySWQgPSB0cnVlXG4pOiBIZWFkZXJzSW5pdCA9PiB7XG4gIGNvbnN0IGJhc2UgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XG4gIGNvbnN0IG1lcmdlZDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHsgLi4uYmFzZSB9O1xuXG4gIGlmIChzYWZlVGV4dChjb250ZXh0LnRva2VuKSkge1xuICAgIG1lcmdlZC5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke2NvbnRleHQudG9rZW59YDtcbiAgfVxuXG4gIGlmIChzYWZlVGV4dChjb250ZXh0LmNvbXBhbnlJZCkpIHtcbiAgICBtZXJnZWRbXCJYLUlORC1Db21wYW55XCJdID0gY29udGV4dC5jb21wYW55SWQ7XG4gIH1cblxuICBpZiAoaW5jbHVkZUF4VXNlcklkICYmIHNhZmVUZXh0KGNvbnRleHQuYXhVc2VySWQpKSB7XG4gICAgbWVyZ2VkW1wiWC1JTkQtQXhVc2VySWRcIl0gPSBjb250ZXh0LmF4VXNlcklkO1xuICB9XG5cbiAgaWYgKGluY2x1ZGVKc29uKSB7XG4gICAgbWVyZ2VkW1wiQ29udGVudC1UeXBlXCJdID0gXCJhcHBsaWNhdGlvbi9qc29uXCI7XG4gIH1cblxuICByZXR1cm4gbWVyZ2VkO1xufTtcblxuY29uc3QgYnVpbGRDb250ZXh0SGVhZGVycyA9ICh0b2tlbjogc3RyaW5nLCBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogSGVhZGVyc0luaXQgPT4ge1xuICBjb25zdCBiYXNlID0gc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpO1xuICBjb25zdCBtZXJnZWQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgLi4uYmFzZSxcbiAgICAuLi5KU09OX0hFQURFUlMsXG4gIH07XG5cbiAgaWYgKHNhZmVUZXh0KHRva2VuKSkge1xuICAgIG1lcmdlZC5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke3Rva2VufWA7XG4gIH1cblxuICByZXR1cm4gbWVyZ2VkO1xufTtcblxuY29uc3QgcmVzb2x2ZUF1dGhUb2tlbiA9IChvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogc3RyaW5nID0+IHtcbiAgY29uc3QgdG9rZW5Gcm9tSGVhZGVycyA9IHJlc29sdmVCZWFyZXJUb2tlbihvcHRpb25zPy5oZWFkZXJzKTtcbiAgY29uc3Qgd2luZG93U2VlZCA9IHJlYWRXaW5kb3dBdXRoU2VlZCgpO1xuICByZXR1cm4gc2FmZVRleHQodG9rZW5Gcm9tSGVhZGVycyB8fCBydW50aW1lQXV0aFNlZWQudG9rZW4gfHwgd2luZG93U2VlZC50b2tlbik7XG59O1xuXG5jb25zdCByZXNvbHZlQXV0aFNlZWQgPSAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IEV4cGVuc2VBcGlBdXRoU2VlZCA9PiB7XG4gIGNvbnN0IHdpbmRvd1NlZWQgPSByZWFkV2luZG93QXV0aFNlZWQoKTtcbiAgY29uc3QgdG9rZW4gPSByZXNvbHZlQXV0aFRva2VuKG9wdGlvbnMpO1xuICBjb25zdCBlbnRyYU9pZCA9IHNhZmVUZXh0KHJ1bnRpbWVBdXRoU2VlZC5lbnRyYU9pZCB8fCB3aW5kb3dTZWVkLmVudHJhT2lkKTtcbiAgY29uc3QgYXBwQ29kZSA9IHNhZmVUZXh0KHJ1bnRpbWVBdXRoU2VlZC5hcHBDb2RlIHx8IHdpbmRvd1NlZWQuYXBwQ29kZSB8fCBERUZBVUxUX0FQUF9DT0RFKSB8fCBERUZBVUxUX0FQUF9DT0RFO1xuICBjb25zdCBzdHJpY3RBcGlSb3V0ZXMgPVxuICAgIHR5cGVvZiBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzID09PSBcImJvb2xlYW5cIlxuICAgICAgPyBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzXG4gICAgICA6ICh3aW5kb3dTZWVkLnN0cmljdEFwaVJvdXRlcyA9PT0gdHJ1ZSk7XG5cbiAgcmV0dXJuIHtcbiAgICB0b2tlbixcbiAgICBlbnRyYU9pZCxcbiAgICBhcHBDb2RlLFxuICAgIHN0cmljdEFwaVJvdXRlcyxcbiAgfTtcbn07XG5cbmNvbnN0IHZhbGlkYXRlQ29udGV4dFJlc3BvbnNlID0gKHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEVudHJhQ29udGV4dER0bz4pOiBFeHBlbnNlQXBpQ29udGV4dCA9PiB7XG4gIGlmICghcmVzcG9uc2UuU3VjY2Vzcykge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKHJlc3BvbnNlLk1lc3NhZ2UgfHwgXCJDb3VsZCBub3QgbG9hZCBFbnRyYSBjb250ZXh0LlwiKTtcbiAgfVxuXG4gIGNvbnN0IGZpcnN0ID0gQXJyYXkuaXNBcnJheShyZXNwb25zZS5JdGVtcykgPyByZXNwb25zZS5JdGVtc1swXSA6IG51bGw7XG4gIGlmICghZmlyc3QgfHwgIWZpcnN0LkhlYWRlcikge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiQ291bGQgbm90IGxvYWQgRW50cmEgY29udGV4dC5cIik7XG4gIH1cblxuICBjb25zdCBheFVzZXJJZCA9IHNhZmVUZXh0KGZpcnN0LkhlYWRlci5BeFVzZXJJZCk7XG4gIGNvbnN0IGRlZmF1bHRDb21wYW55ID0gc2FmZVRleHQoZmlyc3QuSGVhZGVyLkRlZmF1bHRDb21wYW55KTtcbiAgY29uc3QgZGVmYXVsdEN1cnJlbmN5Q29kZSA9IHNhZmVUZXh0KGZpcnN0LkhlYWRlci5EZWZhdWx0Q3VycmVuY3lDb2RlKTtcbiAgY29uc3QgY29tcGFuaWVzID0gQXJyYXkuaXNBcnJheShmaXJzdC5Db21wYW5pZXMpID8gZmlyc3QuQ29tcGFuaWVzIDogW107XG4gIGNvbnN0IGZhbGxiYWNrQ29tcGFueSA9IHNhZmVUZXh0KGNvbXBhbmllcy5maW5kKChpdGVtKSA9PiBpdGVtLklzRGVmYXVsdCk/LkNvbXBhbnlJZCk7XG4gIGNvbnN0IGNvbXBhbnlJZCA9IGRlZmF1bHRDb21wYW55IHx8IGZhbGxiYWNrQ29tcGFueTtcblxuICBpZiAoIWF4VXNlcklkIHx8ICFjb21wYW55SWQpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkNvdWxkIG5vdCByZXNvbHZlIEVudHJhIGNvbXBhbnkgY29udGV4dC5cIik7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRva2VuOiBcIlwiLFxuICAgIGNvbXBhbnlJZCxcbiAgICBheFVzZXJJZCxcbiAgICBkZWZhdWx0Q3VycmVuY3lDb2RlLFxuICB9O1xufTtcblxuY29uc3QgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQgPSBhc3luYyAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IFByb21pc2U8RXhwZW5zZUFwaUNvbnRleHQ+ID0+IHtcbiAgY29uc3Qgc2VlZCA9IHJlc29sdmVBdXRoU2VlZChvcHRpb25zKTtcbiAgY29uc3QgY29udGV4dEtleSA9IGJ1aWxkQ29udGV4dEtleShzZWVkKTtcblxuICBpZiAoY2FjaGVkQ29udGV4dCAmJiBjYWNoZWRDb250ZXh0S2V5ID09PSBjb250ZXh0S2V5KSB7XG4gICAgcmV0dXJuIGNhY2hlZENvbnRleHQ7XG4gIH1cblxuICBpZiAoY29udGV4dFByb21pc2UgJiYgY2FjaGVkQ29udGV4dEtleSA9PT0gY29udGV4dEtleSkge1xuICAgIHJldHVybiBjb250ZXh0UHJvbWlzZTtcbiAgfVxuXG4gIGNvbnN0IGZhbGxiYWNrQ29tcGFueUlkID0gcmVhZFdpbmRvd1NlbGVjdGVkQ29tcGFueSgpO1xuICBpZiAoIXNhZmVUZXh0KHNlZWQuZW50cmFPaWQpICYmIGZhbGxiYWNrQ29tcGFueUlkKSB7XG4gICAgY29uc3QgZmFsbGJhY2tDb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCA9IHtcbiAgICAgIHRva2VuOiBzZWVkLnRva2VuLFxuICAgICAgY29tcGFueUlkOiBmYWxsYmFja0NvbXBhbnlJZCxcbiAgICAgIGF4VXNlcklkOiBcIlwiLFxuICAgICAgZGVmYXVsdEN1cnJlbmN5Q29kZTogXCJcIixcbiAgICB9O1xuXG4gICAgY2FjaGVkQ29udGV4dCA9IGZhbGxiYWNrQ29udGV4dDtcbiAgICBjYWNoZWRDb250ZXh0S2V5ID0gY29udGV4dEtleTtcbiAgICByZXR1cm4gZmFsbGJhY2tDb250ZXh0O1xuICB9XG5cbiAgaWYgKCFzYWZlVGV4dChzZWVkLmVudHJhT2lkKSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiTWlzc2luZyBFbnRyYSBPSUQgZm9yIEVudHJhIGNvbnRleHQgcmVxdWVzdC5cIik7XG4gIH1cblxuICBjYWNoZWRDb250ZXh0S2V5ID0gY29udGV4dEtleTtcbiAgY29udGV4dFByb21pc2UgPSAoYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRleHRQYXlsb2FkOiBFbnRyYUNvbnRleHRSZXF1ZXN0ID0ge1xuICAgICAgZW50cmFPaWQ6IHNlZWQuZW50cmFPaWQsXG4gICAgICBhcHBDb2RlOiBzZWVkLmFwcENvZGUsXG4gICAgfTtcblxuICAgIGNvbnN0IGNvbnRleHRSZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEVudHJhQ29udGV4dER0bz4+KFwiL2FwaS9hdXRoL2VudHJhL2NvbnRleHRcIiwge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZENvbnRleHRIZWFkZXJzKHNlZWQudG9rZW4sIG9wdGlvbnMpLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY29udGV4dFBheWxvYWQpLFxuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzb2x2ZWQgPSB2YWxpZGF0ZUNvbnRleHRSZXNwb25zZShjb250ZXh0UmVzcG9uc2UpO1xuICAgIGNvbnN0IG5leHRDb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCA9IHtcbiAgICAgIC4uLnJlc29sdmVkLFxuICAgICAgdG9rZW46IHNlZWQudG9rZW4sXG4gICAgfTtcblxuICAgIGNhY2hlZENvbnRleHQgPSBuZXh0Q29udGV4dDtcbiAgICByZXR1cm4gbmV4dENvbnRleHQ7XG4gIH0pKCk7XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gYXdhaXQgY29udGV4dFByb21pc2U7XG4gIH0gZmluYWxseSB7XG4gICAgY29udGV4dFByb21pc2UgPSBudWxsO1xuICB9XG59O1xuXG5jb25zdCBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZSA9IChcbiAgcmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+XG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldExpc3RJdGVtRHRvPiA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4ucmVzcG9uc2UsXG4gICAgSXRlbXM6IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW10sXG4gIH07XG59O1xuXG5jb25zdCBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXREZXRhaWxEdG8+XG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldERldGFpbER0bz4gPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLnJlc3BvbnNlLFxuICAgIEl0ZW1zOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdLFxuICB9O1xufTtcblxuY29uc3Qgbm9ybWFsaXplQXBpUmVzcG9uc2UgPSA8VD4ocmVzcG9uc2U6IEluZEFwaVJlc3BvbnNlPFQ+KTogSW5kQXBpUmVzcG9uc2U8VD4gPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLnJlc3BvbnNlLFxuICAgIEVycm9yczogQXJyYXkuaXNBcnJheShyZXNwb25zZT8uRXJyb3JzKSA/IHJlc3BvbnNlLkVycm9ycyA6IHJlc3BvbnNlPy5FcnJvcnMgPz8gbnVsbCxcbiAgfTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZSA9IChcbiAgcmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+XG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPiA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4ucmVzcG9uc2UsXG4gICAgSXRlbXM6IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW10sXG4gIH07XG59O1xuXG5jb25zdCBsb29rc0xpa2VIdG1sRG9jdW1lbnQgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcbiAgY29uc3QgcmF3ID0gc2FmZVRleHQodmFsdWUpLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiByYXcuc3RhcnRzV2l0aChcIjwhZG9jdHlwZSBodG1sXCIpIHx8IHJhdy5zdGFydHNXaXRoKFwiPGh0bWxcIik7XG59O1xuXG5jb25zdCBpc0FwaVJvdXRlVW5hdmFpbGFibGUgPSAoZXJyb3I6IHVua25vd24pOiBlcnJvciBpcyBBcGlGZXRjaEVycm9yID0+IHtcbiAgaWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSkgcmV0dXJuIGZhbHNlO1xuICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDQgfHwgZXJyb3Iuc3RhdHVzID09PSA0MDUpIHJldHVybiB0cnVlO1xuICByZXR1cm4gZXJyb3Iuc3RhdHVzID09PSB1bmRlZmluZWQgJiYgbG9va3NMaWtlSHRtbERvY3VtZW50KGVycm9yLnJlc3BvbnNlQm9keSk7XG59O1xuXG5jb25zdCBpc1N0cmljdEFwaVJvdXRlc0VuYWJsZWQgPSAoKTogYm9vbGVhbiA9PiB7XG4gIGlmICh0eXBlb2YgcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcyA9PT0gXCJib29sZWFuXCIpIHtcbiAgICByZXR1cm4gcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcztcbiAgfVxuXG4gIHJldHVybiByZWFkUnVudGltZVN0cmljdEFwaUZsYWcoKTtcbn07XG5cbmNvbnN0IHNob3VsZFVzZUxlZ2FjeUZhbGxiYWNrID0gKGVycm9yOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XG4gIGlmIChpc1N0cmljdEFwaVJvdXRlc0VuYWJsZWQoKSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gaXNBcGlSb3V0ZVVuYXZhaWxhYmxlKGVycm9yKTtcbn07XG5cbmNvbnN0IHRvTGVnYWN5TGlzdFJlcXVlc3RQYXlsb2FkID0gKHBheWxvYWQ6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZmlsdGVyOiBzYWZlVGV4dChwYXlsb2FkLmZpbHRlciksXG4gICAgaG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChwYXlsb2FkLmZpbHRlciksXG4gICAgYmlsbGVkTW9kZTogcGF5bG9hZC5iaWxsZWRNb2RlID8/IDAsXG4gICAgZnJvbURhdGU6IHNhZmVUZXh0KHBheWxvYWQuY3JlYXRlZERhdGVGcm9tKSxcbiAgICB0b0RhdGU6IHNhZmVUZXh0KHBheWxvYWQuY3JlYXRlZERhdGVUbyksXG4gICAgcHJvamVjdElkOiBzYWZlVGV4dChwYXlsb2FkLnByb2pJZCksXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChwYXlsb2FkLmN1cnJlbmN5Q29kZSksXG4gICAgcGFnZTogTnVtYmVyLmlzRmluaXRlKHBheWxvYWQucGFnZSkgJiYgcGF5bG9hZC5wYWdlID4gMCA/IHBheWxvYWQucGFnZSA6IDEsXG4gICAgcGFnZVNpemU6IE51bWJlci5pc0Zpbml0ZShwYXlsb2FkLnBhZ2VTaXplKSAmJiBwYXlsb2FkLnBhZ2VTaXplID4gMCA/IHBheWxvYWQucGFnZVNpemUgOiA1MCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcExlZ2FjeUxpc3RJdGVtVG9BcGlMaXN0SXRlbSA9IChpdGVtOiBMZWdhY3lFeHBlbnNlTGlzdEl0ZW0pOiBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byA9PiB7XG4gIHJldHVybiB7XG4gICAgSG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChpdGVtLmhvamFHYXN0b3NJZCksXG4gICAgRGVzY3JpcHRpb246IHNhZmVUZXh0KGl0ZW0uZGVzY3JpcHRpb24pLFxuICAgIEV4cGVuc2VTaGVldFN0YXR1czogdG9OdWxsYWJsZU51bWJlcihpdGVtLmV4cGVuc2VTaGVldFN0YXR1cyksXG4gICAgVXNlcklkOiBzYWZlVGV4dChpdGVtLnVzZXJJZCkgfHwgbnVsbCxcbiAgICBWb3VjaGVyOiBzYWZlVGV4dChpdGVtLnZvdWNoZXIpLFxuICAgIFByb2pJZDogc2FmZVRleHQoaXRlbS5wcm9qSWQpLFxuICAgIEN1cnJlbmN5Q29kZTogc2FmZVRleHQoaXRlbS5jdXJyZW5jeUNvZGUpLFxuICAgIFRvdGFsQW1vdW50OiB0b051bGxhYmxlTnVtYmVyKGl0ZW0udG90YWxBbW91bnQgPz8gaXRlbS50b3RhbEFtb3VudE1TVCksXG4gICAgRXhjaFJhdGU6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5leGNoUmF0ZSksXG4gICAgRXhjaGFuZ2VSYXRlTW9kZTogdG9OdWxsYWJsZU51bWJlcihpdGVtLmV4Y2hhbmdlUmF0ZU1vZGUpLFxuICAgIENyZWF0ZWREYXRlOiBzYWZlVGV4dChpdGVtLmNyZWF0ZWREYXRlKSB8fCBudWxsLFxuICB9O1xufTtcblxuY29uc3QgbWFwTGVnYWN5TGlzdFJlc3BvbnNlID0gKFxuICBsZWdhY3k6IExlZ2FjeUV4cGVuc2VMaXN0UmVzcG9uc2UsXG4gIGZhbGxiYWNrUGFnZTogbnVtYmVyLFxuICBmYWxsYmFja1BhZ2VTaXplOiBudW1iZXJcbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+ID0+IHtcbiAgY29uc3QgbGVnYWN5SXRlbXMgPSBBcnJheS5pc0FycmF5KGxlZ2FjeT8uaXRlbXMpID8gbGVnYWN5Lml0ZW1zIDogW107XG4gIGNvbnN0IG1hcHBlZEl0ZW1zID0gbGVnYWN5SXRlbXMubWFwKChlbnRyeSkgPT4gbWFwTGVnYWN5TGlzdEl0ZW1Ub0FwaUxpc3RJdGVtKGVudHJ5KSk7XG5cbiAgcmV0dXJuIHtcbiAgICBTdWNjZXNzOiBsZWdhY3kuc3VjY2VzcyAhPT0gZmFsc2UsXG4gICAgTWVzc2FnZTogc2FmZVRleHQobGVnYWN5Lm1lc3NhZ2UpIHx8IFwiT0tcIixcbiAgICBUb3RhbDogdG9OdWxsYWJsZU51bWJlcihsZWdhY3kudG90YWwpID8/IG1hcHBlZEl0ZW1zLmxlbmd0aCxcbiAgICBQYWdlOiB0b051bGxhYmxlTnVtYmVyKGxlZ2FjeS5wYWdlKSA/PyBmYWxsYmFja1BhZ2UsXG4gICAgUGFnZVNpemU6IHRvTnVsbGFibGVOdW1iZXIobGVnYWN5LnBhZ2VTaXplKSA/PyBmYWxsYmFja1BhZ2VTaXplLFxuICAgIEl0ZW1zOiBtYXBwZWRJdGVtcyxcbiAgICBUcmFjZUlkOiB1bmRlZmluZWQsXG4gIH07XG59O1xuXG5jb25zdCByZXNvbHZlVHlwZUxhYmVsID0gKHR5cGVWYWx1ZUNvZGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGlmICghdHlwZVZhbHVlQ29kZSB8fCB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHR5cGVWYWx1ZUNvZGU7XG4gIH1cblxuICBjb25zdCByYXdDYXRhbG9nU291cmNlID0gcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lKCkuX19FWFBFTlNFX0dBU1RPX1RZUEVTX187XG4gIGNvbnN0IHJhd0NhdGFsb2cgPSBBcnJheS5pc0FycmF5KHJhd0NhdGFsb2dTb3VyY2UpID8gcmF3Q2F0YWxvZ1NvdXJjZSA6IFtdO1xuICBjb25zdCBtYXRjaCA9IHJhd0NhdGFsb2cuZmluZCgoZW50cnk6IEV4cGVuc2VHYXN0b1R5cGVFbnRyeSkgPT4ge1xuICAgIGNvbnN0IGVudHJ5Q29kZSA9IHNhZmVUZXh0KGVudHJ5Py52YWx1ZSB8fCBlbnRyeT8uVmFsdWUpO1xuICAgIHJldHVybiBlbnRyeUNvZGUgPT09IHR5cGVWYWx1ZUNvZGU7XG4gIH0pO1xuXG4gIHJldHVybiBzYWZlVGV4dChtYXRjaD8udGV4dCB8fCBtYXRjaD8uVGV4dCkgfHwgdHlwZVZhbHVlQ29kZTtcbn07XG5cbi8vIFNldHMgcnVudGltZSBhdXRoIGlucHV0cyB1c2VkIHRvIHJlc29sdmUgRW50cmEgY29udGV4dCBhbmQgbWFuZGF0b3J5IGV4cGVuc2UgaGVhZGVycy5cbmV4cG9ydCBjb25zdCBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCA9IChzZWVkOiBQYXJ0aWFsPEV4cGVuc2VBcGlBdXRoU2VlZD4pOiB2b2lkID0+IHtcbiAgY29uc3Qgc3RyaWN0RnJvbVNlZWQgPSB0b0ZsYWdCb29sKHNlZWQuc3RyaWN0QXBpUm91dGVzKTtcbiAgY29uc3Qgc3RyaWN0RnJvbVJ1bnRpbWUgPVxuICAgIHR5cGVvZiBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzID09PSBcImJvb2xlYW5cIiA/IHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXMgOiByZWFkUnVudGltZVN0cmljdEFwaUZsYWcoKTtcblxuICBydW50aW1lQXV0aFNlZWQgPSB7XG4gICAgLi4ucnVudGltZUF1dGhTZWVkLFxuICAgIHRva2VuOiBzYWZlVGV4dChzZWVkLnRva2VuIHx8IHJ1bnRpbWVBdXRoU2VlZC50b2tlbiksXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHNlZWQuZW50cmFPaWQgfHwgcnVudGltZUF1dGhTZWVkLmVudHJhT2lkKSxcbiAgICBhcHBDb2RlOiBzYWZlVGV4dChzZWVkLmFwcENvZGUgfHwgcnVudGltZUF1dGhTZWVkLmFwcENvZGUgfHwgREVGQVVMVF9BUFBfQ09ERSksXG4gICAgc3RyaWN0QXBpUm91dGVzOiBzdHJpY3RGcm9tU2VlZCA/PyBzdHJpY3RGcm9tUnVudGltZSxcbiAgfTtcblxuICBjYWNoZWRDb250ZXh0ID0gbnVsbDtcbiAgY2FjaGVkQ29udGV4dEtleSA9IFwiXCI7XG4gIGNvbnRleHRQcm9taXNlID0gbnVsbDtcbiAgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuY2xlYXIoKTtcbiAgcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuY2xlYXIoKTtcbn07XG5cbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9saXN0IGl0ZW0gY29udHJhY3QgdG8gbGlzdCBjYXJkIFVJIG1vZGVsLlxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkID0gKGl0ZW06IEV4cGVuc2VTaGVldExpc3RJdGVtRHRvKTogRXhwZW5zZVNoZWV0Q2FyZCA9PiB7XG4gIHJldHVybiB7XG4gICAgaG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChpdGVtLkhvamFHYXN0b3NJZCksXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KGl0ZW0uRGVzY3JpcHRpb24pLFxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogdG9OdWxsYWJsZU51bWJlcihpdGVtLkV4cGVuc2VTaGVldFN0YXR1cyksXG4gICAgdXNlcklkOiBzYWZlVGV4dChpdGVtLlVzZXJJZCksXG4gICAgdm91Y2hlcjogc2FmZVRleHQoaXRlbS5Wb3VjaGVyKSxcbiAgICBwcm9qSWQ6IHNhZmVUZXh0KGl0ZW0uUHJvaklkKSxcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGl0ZW0uQ3VycmVuY3lDb2RlKSxcbiAgICB0b3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihpdGVtLlRvdGFsQW1vdW50KSxcbiAgICBleGNoUmF0ZTogdG9OdWxsYWJsZU51bWJlcihpdGVtLkV4Y2hSYXRlKSxcbiAgICBleGNoYW5nZVJhdGVNb2RlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uRXhjaGFuZ2VSYXRlTW9kZSksXG4gICAgY3JlYXRlZERhdGU6IHNhZmVUZXh0KGl0ZW0uQ3JlYXRlZERhdGUpLFxuICB9O1xufTtcblxuLy8gTWFwcyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9IGhlYWRlciBjb250cmFjdCB0byBVSSBtb2RlbC5cbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRIZWFkZXIgPSAoc2hlZXQ6IEV4cGVuc2VTaGVldERldGFpbER0byk6IEV4cGVuc2VTaGVldEhlYWRlciA9PiB7XG4gIHJldHVybiB7XG4gICAgaG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChzaGVldC5Ib2phR2FzdG9zSWQpLFxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChzaGVldC5EZXNjcmlwdGlvbiksXG4gICAgdXNlcklkOiBzYWZlVGV4dChzaGVldC5Vc2VySWQpLFxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogdG9OdWxsYWJsZU51bWJlcihzaGVldC5FeHBlbnNlU2hlZXRTdGF0dXMpLFxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQoc2hlZXQuQ3VycmVuY3lDb2RlKSxcbiAgICB0b3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihzaGVldC5Ub3RhbEFtb3VudCksXG4gICAgZXhjaFJhdGU6IHNhZmVUZXh0KHNoZWV0LkV4Y2hSYXRlKSxcbiAgICBleGNoYW5nZVJhdGVNb2RlOiB0b051bGxhYmxlTnVtYmVyKHNoZWV0LkV4Y2hhbmdlUmF0ZU1vZGUpLFxuICAgIHByb2pJZDogc2FmZVRleHQoc2hlZXQuUHJvaklkKSxcbiAgICB2b3VjaGVyOiBzYWZlVGV4dChzaGVldC5Wb3VjaGVyKSxcbiAgICBjcmVhdGVkRGF0ZTogc2FmZVRleHQoc2hlZXQuQ3JlYXRlZERhdGUpLFxuICB9O1xufTtcblxuLy8gTWFwcyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9IGxpbmUgY29udHJhY3QgdG8gVUkgbW9kZWwuXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0TGluZSA9IChsaW5lOiBFeHBlbnNlU2hlZXRMaW5lRHRvKTogRXhwZW5zZVNoZWV0TGluZSA9PiB7XG4gIGNvbnN0IHR5cGVWYWx1ZUNvZGUgPSBzYWZlVGV4dChsaW5lLlR5cGVWYWx1ZSk7XG5cbiAgcmV0dXJuIHtcbiAgICBsaW5lUmVjSWQ6IHNhZmVUZXh0KGxpbmUuUmVjSWQpLFxuICAgIHRyYW5zRGF0ZTogc2FmZVRleHQobGluZS5UcmFuc0RhdGUpLFxuICAgIHR5cGVWYWx1ZUNvZGUsXG4gICAgdHlwZVZhbHVlOiByZXNvbHZlVHlwZUxhYmVsKHR5cGVWYWx1ZUNvZGUpLFxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChsaW5lLkRlc2NyaXB0aW9uKSxcbiAgICBpbnRlcm5hY2lvbmFsOiB0b051bGxhYmxlQm9vbChsaW5lLkludGVybmFjaW9uYWwpLFxuICAgIHRpY2tldDogdG9OdWxsYWJsZUJvb2wobGluZS5UaWNrZXQpLFxuICAgIHF0eTogdG9OdWxsYWJsZU51bWJlcihsaW5lLlF0eSksXG4gICAgYW1vdW50OiB0b051bGxhYmxlTnVtYmVyKGxpbmUuQW1vdW50KSxcbiAgICBwcm9qSWQ6IHNhZmVUZXh0KGxpbmUuUHJvaklkKSxcbiAgICBpbmRBdHRhY2hGaWxlczogc2FmZVRleHQobGluZS5JbmRBdHRhY2hGaWxlcyksXG4gIH07XG59O1xuXG4vLyBMb2FkcyB0aGUgZXhwZW5zZSBzaGVldCBsaXN0IGZyb20gL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9saXN0LlxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0TGlzdCA9IGFzeW5jIChcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3QsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvbGlzdFwiLCB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgICB9KTtcblxuICAgIHJldHVybiBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZShyZXNwb25zZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKCFzaG91bGRVc2VMZWdhY3lGYWxsYmFjayhlcnJvcikpIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cblxuICAgIGNvbnN0IGxlZ2FjeVJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPExlZ2FjeUV4cGVuc2VMaXN0UmVzcG9uc2U+KFwiL0dhc3Rvcy9MaXN0RXhwZW5zZVNoZWV0c1wiLCB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgLi4uc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpLFxuICAgICAgICAuLi5KU09OX0hFQURFUlMsXG4gICAgICB9LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodG9MZWdhY3lMaXN0UmVxdWVzdFBheWxvYWQocGF5bG9hZCkpLFxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFwcGVkID0gbWFwTGVnYWN5TGlzdFJlc3BvbnNlKFxuICAgICAgbGVnYWN5UmVzcG9uc2UsXG4gICAgICBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZC5wYWdlKSAmJiBwYXlsb2FkLnBhZ2UgPiAwID8gcGF5bG9hZC5wYWdlIDogMSxcbiAgICAgIE51bWJlci5pc0Zpbml0ZShwYXlsb2FkLnBhZ2VTaXplKSAmJiBwYXlsb2FkLnBhZ2VTaXplID4gMCA/IHBheWxvYWQucGFnZVNpemUgOiA1MFxuICAgICk7XG5cbiAgICByZXR1cm4gbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UobWFwcGVkKTtcbiAgfVxufTtcblxuLy8gTG9hZHMgb25lIGV4cGVuc2Ugc2hlZXQgZGV0YWlsIGZyb20gL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS5cbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldERldGFpbCA9IGFzeW5jIChcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXREZXRhaWxEdG8+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldERldGFpbER0bz4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9YCwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIFJlYWRzIGF2YWlsYWJsZSBjdXJyZW5jaWVzIGZyb20gL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9jdXJyZW5jaWVzLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTaGVldEN1cnJlbmNpZXMgPSBhc3luYyAoXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+ID0+IHtcbiAgbGV0IGNvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0IHwgbnVsbCA9IG51bGw7XG4gIHRyeSB7XG4gICAgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmICghKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikpIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNvbXBhbnlJZCA9IHNhZmVUZXh0KGNvbnRleHQ/LmNvbXBhbnlJZCB8fCByZWFkV2luZG93U2VsZWN0ZWRDb21wYW55KCkpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IGNhY2hlS2V5ID0gY29tcGFueUlkIHx8IFwiLVwiO1xuXG4gIGlmIChjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcy5oYXMoY2FjaGVLZXkpKSB7XG4gICAgcmV0dXJuIGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLmdldChjYWNoZUtleSkgYXMgSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz47XG4gIH1cblxuICBpZiAocGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuaGFzKGNhY2hlS2V5KSkge1xuICAgIHJldHVybiBwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5nZXQoY2FjaGVLZXkpIGFzIFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+O1xuICB9XG5cbiAgY29uc3QgcmVxdWVzdFByb21pc2UgPSAoYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XG4gICAgcmVtb3ZlSGVhZGVyVmFsdWUoaGVhZGVycywgXCJBdXRob3JpemF0aW9uXCIpO1xuICAgIHJlbW92ZUhlYWRlclZhbHVlKGhlYWRlcnMsIFwiWC1JTkQtQXhVc2VySWRcIik7XG5cbiAgICBpZiAoY29tcGFueUlkKSB7XG4gICAgICBoZWFkZXJzW1wiWC1JTkQtQ29tcGFueVwiXSA9IGNvbXBhbnlJZDtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9jdXJyZW5jaWVzXCIsIHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICBoZWFkZXJzLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRSZXNwb25zZSA9IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICBpZiAobm9ybWFsaXplZFJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuc2V0KGNhY2hlS2V5LCBub3JtYWxpemVkUmVzcG9uc2UpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbm9ybWFsaXplZFJlc3BvbnNlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoIXNob3VsZFVzZUxlZ2FjeUZhbGxiYWNrKGVycm9yKSkge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbGVnYWN5TGlzdFJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPExlZ2FjeUV4cGVuc2VMaXN0UmVzcG9uc2U+KFwiL0dhc3Rvcy9MaXN0RXhwZW5zZVNoZWV0c1wiLCB7XG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAuLi5zYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyksXG4gICAgICAgICAgLi4uSlNPTl9IRUFERVJTLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgZmlsdGVyOiBcIlwiLFxuICAgICAgICAgIGhvamFHYXN0b3NJZDogXCJcIixcbiAgICAgICAgICBiaWxsZWRNb2RlOiAyLFxuICAgICAgICAgIGZyb21EYXRlOiBcIlwiLFxuICAgICAgICAgIHRvRGF0ZTogXCJcIixcbiAgICAgICAgICBwcm9qZWN0SWQ6IFwiXCIsXG4gICAgICAgICAgY3VycmVuY3lDb2RlOiBcIlwiLFxuICAgICAgICAgIHBhZ2U6IDEsXG4gICAgICAgICAgcGFnZVNpemU6IDIwMCxcbiAgICAgICAgfSksXG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgc2VlbkNvZGVzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgICBjb25zdCBzb3VyY2VJdGVtcyA9IEFycmF5LmlzQXJyYXkobGVnYWN5TGlzdFJlc3BvbnNlLml0ZW1zKSA/IGxlZ2FjeUxpc3RSZXNwb25zZS5pdGVtcyA6IFtdO1xuICAgICAgY29uc3QgZmFsbGJhY2tJdGVtczogRXhwZW5zZVNoZWV0Q3VycmVuY3lEdG9bXSA9IHNvdXJjZUl0ZW1zXG4gICAgICAgIC5tYXAoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeS5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCkpXG4gICAgICAgIC5maWx0ZXIoKGNvZGUpID0+ICEhY29kZSlcbiAgICAgICAgLmZpbHRlcigoY29kZSkgPT4ge1xuICAgICAgICAgIGlmIChzZWVuQ29kZXMuaGFzKGNvZGUpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgc2VlbkNvZGVzLmFkZChjb2RlKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSlcbiAgICAgICAgLm1hcCgoY29kZSkgPT4gKHtcbiAgICAgICAgICBDdXJyZW5jeUNvZGU6IGNvZGUsXG4gICAgICAgICAgQ3VycmVuY3lDb2RlSVNPOiBjb2RlLFxuICAgICAgICB9KSk7XG5cbiAgICAgIGNvbnN0IGZhbGxiYWNrUmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+ID0ge1xuICAgICAgICBTdWNjZXNzOiBsZWdhY3lMaXN0UmVzcG9uc2Uuc3VjY2VzcyAhPT0gZmFsc2UsXG4gICAgICAgIE1lc3NhZ2U6IHNhZmVUZXh0KGxlZ2FjeUxpc3RSZXNwb25zZS5tZXNzYWdlKSB8fCBcIk9LXCIsXG4gICAgICAgIFRvdGFsOiBmYWxsYmFja0l0ZW1zLmxlbmd0aCxcbiAgICAgICAgUGFnZTogMSxcbiAgICAgICAgUGFnZVNpemU6IGZhbGxiYWNrSXRlbXMubGVuZ3RoLFxuICAgICAgICBJdGVtczogZmFsbGJhY2tJdGVtcyxcbiAgICAgICAgVHJhY2VJZDogdW5kZWZpbmVkLFxuICAgICAgfTtcblxuICAgICAgY29uc3Qgbm9ybWFsaXplZEZhbGxiYWNrID0gbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlKGZhbGxiYWNrUmVzcG9uc2UpO1xuICAgICAgaWYgKG5vcm1hbGl6ZWRGYWxsYmFjay5TdWNjZXNzKSB7XG4gICAgICAgIGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLnNldChjYWNoZUtleSwgbm9ybWFsaXplZEZhbGxiYWNrKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRGYWxsYmFjaztcbiAgICB9XG4gIH0pKCk7XG5cbiAgcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuc2V0KGNhY2hlS2V5LCByZXF1ZXN0UHJvbWlzZSk7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGF3YWl0IHJlcXVlc3RQcm9taXNlO1xuICB9IGZpbmFsbHkge1xuICAgIHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLmRlbGV0ZShjYWNoZUtleSk7XG4gIH1cbn07XG5cbi8vIEV4cG9zZXMgdGhlIGRlZmF1bHQgY3VycmVuY3kgcmVzb2x2ZWQgZnJvbSBFbnRyYSBjb250ZXh0IGZvciBpbml0aWFsIHNlbGVjdGlvbnMuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVNoZWV0RGVmYXVsdEN1cnJlbmN5Q29kZSA9IGFzeW5jIChvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gICAgcmV0dXJuIHNhZmVUZXh0KGNvbnRleHQuZGVmYXVsdEN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cbn07XG5cbi8vIFJlYWRzIGV4Y2hhbmdlIHJhdGUgZnJvbSAvYXBpL3N5c3RlbS9leGNoYW5nZS1yYXRlLlxuZXhwb3J0IGNvbnN0IGdldEV4Y2hhbmdlUmF0ZSA9IGFzeW5jIChcbiAgYmFzZUN1cnJlbmN5OiBzdHJpbmcsXG4gIHRhcmdldEN1cnJlbmN5OiBzdHJpbmcsXG4gIGRhdGU/OiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RXhjaGFuZ2VSYXRlRHRvPj4gPT4ge1xuICBjb25zdCB0b2tlbiA9IHJlc29sdmVBdXRoVG9rZW4ob3B0aW9ucyk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kgPSBzYWZlVGV4dChiYXNlQ3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRUYXJnZXRDdXJyZW5jeSA9IHNhZmVUZXh0KHRhcmdldEN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBub3JtYWxpemVkRGF0ZSA9IHNhZmVUZXh0KGRhdGUpO1xuICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcblxuICBxdWVyeS5zZXQoXCJiYXNlQ3VycmVuY3lcIiwgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSk7XG4gIHF1ZXJ5LnNldChcInRhcmdldEN1cnJlbmN5XCIsIG5vcm1hbGl6ZWRUYXJnZXRDdXJyZW5jeSk7XG4gIGlmIChub3JtYWxpemVkRGF0ZSkge1xuICAgIHF1ZXJ5LnNldChcImRhdGVcIiwgbm9ybWFsaXplZERhdGUpO1xuICB9XG5cbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcbiAgaWYgKHRva2VuKSB7XG4gICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke3Rva2VufWA7XG4gIH1cblxuICByZXR1cm4gZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4Y2hhbmdlUmF0ZUR0bz4+KGAvYXBpL3N5c3RlbS9leGNoYW5nZS1yYXRlPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgaGVhZGVycyxcbiAgfSk7XG59O1xuXG4vLyBDcmVhdGVzIGFuIGV4cGVuc2Ugc2hlZXQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy5cbmV4cG9ydCBjb25zdCBjcmVhdGVFeHBlbnNlU2hlZXQgPSBhc3luYyAoXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3JlYXRlUmVzcG9uc2VEYXRhPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IG1vZGUgPSBwYXlsb2FkLm1vZGUgPz8gMDtcbiAgY29uc3QgbGluZXMgPSBBcnJheS5pc0FycmF5KHBheWxvYWQubGluZXMpID8gcGF5bG9hZC5saW5lcyA6IFtdO1xuXG4gIGlmIChwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyAhPT0gdW5kZWZpbmVkICYmICFpc05vbk5lZ2F0aXZlTnVtYmVyKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzKSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhwZW5zZVNoZWV0U3RhdHVzIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byAwLlwiKTtcbiAgfVxuXG4gIGlmIChwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUgIT09IHVuZGVmaW5lZCAmJiAhaXNOb25OZWdhdGl2ZU51bWJlcihwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleGNoYW5nZVJhdGVNb2RlIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byAwLlwiKTtcbiAgfVxuXG4gIGlmIChwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUgIT09IHVuZGVmaW5lZCAmJiBwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleGNoYW5nZVJhdGVNb2RlIHJlcXVpcmVzIGV4cGVuc2VTaGVldFN0YXR1cy5cIik7XG4gIH1cblxuICBpZiAobW9kZSA9PT0gMCkge1xuICAgIGlmICghc2FmZVRleHQocGF5bG9hZC5kZXNjcmlwdGlvbikgfHwgIXNhZmVUZXh0KHBheWxvYWQuY3VycmVuY3lDb2RlKSB8fCBsaW5lcy5sZW5ndGggPCAxKSB7XG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkludmFsaWQgY3JlYXRlIHBheWxvYWQgZm9yIG1vZGUgMC5cIik7XG4gICAgfVxuICB9XG5cbiAgaWYgKG1vZGUgPT09IDEpIHtcbiAgICBpZiAoIXNhZmVUZXh0KHBheWxvYWQuZGVzY3JpcHRpb24pIHx8ICFzYWZlVGV4dChwYXlsb2FkLmN1cnJlbmN5Q29kZSkpIHtcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiSW52YWxpZCBjcmVhdGUgcGF5bG9hZCBmb3IgbW9kZSAxLlwiKTtcbiAgICB9XG5cbiAgICBpZiAobGluZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJNb2RlIDEgcmVxdWlyZXMgbGluZXMgdG8gYmUgbnVsbCBvciBlbXB0eS5cIik7XG4gICAgfVxuICB9XG5cbiAgaWYgKG1vZGUgPT09IDIpIHtcbiAgICBpZiAoIXNhZmVUZXh0KHBheWxvYWQuZXhpc3RpbmdIb2phR2FzdG9zSWQpIHx8IGxpbmVzLmxlbmd0aCA8IDEpIHtcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiSW52YWxpZCBjcmVhdGUgcGF5bG9hZCBmb3IgbW9kZSAyLlwiKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBub3JtYWxpemVkUGF5bG9hZDogRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCA9IHtcbiAgICAuLi5wYXlsb2FkLFxuICAgIG1vZGUsXG4gICAgZXhpc3RpbmdIb2phR2FzdG9zSWQ6IHNhZmVUZXh0KHBheWxvYWQuZXhpc3RpbmdIb2phR2FzdG9zSWQpIHx8IHVuZGVmaW5lZCxcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQocGF5bG9hZC5kZXNjcmlwdGlvbikgfHwgdW5kZWZpbmVkLFxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQocGF5bG9hZC5jdXJyZW5jeUNvZGUpIHx8IHVuZGVmaW5lZCxcbiAgICBwcm9qSWQ6IHNhZmVUZXh0KHBheWxvYWQucHJvaklkKSB8fCB1bmRlZmluZWQsXG4gICAgbGluZXM6IG1vZGUgPT09IDEgPyBbXSA6IGxpbmVzLFxuICB9O1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldENyZWF0ZVJlc3BvbnNlRGF0YT4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0c1wiLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkobm9ybWFsaXplZFBheWxvYWQpLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gVXBkYXRlcyBoZWFkZXIgZmllbGRzIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0uXG5leHBvcnQgY29uc3QgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyID0gYXN5bmMgKFxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0SGVhZGVyVXBkYXRlUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTx7IEhvamFHYXN0b3NJZDogc3RyaW5nIH0+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xuXG4gIGlmIChwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyAhPT0gdW5kZWZpbmVkICYmICFpc05vbk5lZ2F0aXZlTnVtYmVyKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzKSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhwZW5zZVNoZWV0U3RhdHVzIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byAwLlwiKTtcbiAgfVxuXG4gIGlmIChwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUgIT09IHVuZGVmaW5lZCAmJiAhaXNOb25OZWdhdGl2ZU51bWJlcihwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleGNoYW5nZVJhdGVNb2RlIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byAwLlwiKTtcbiAgfVxuXG4gIGlmIChwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUgIT09IHVuZGVmaW5lZCAmJiBwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleGNoYW5nZVJhdGVNb2RlIHJlcXVpcmVzIGV4cGVuc2VTaGVldFN0YXR1cy5cIik7XG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTx7IEhvamFHYXN0b3NJZDogc3RyaW5nIH0+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy8ke3NhZmVTaGVldElkfWAsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gRGVsZXRlcyBhIGZ1bGwgZXhwZW5zZSBzaGVldCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9L2xpbmVzLzA/ZGVsZXRlV2hvbGVTaGVldD10cnVlLlxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VTaGVldCA9IGFzeW5jIChcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlU2hlZXRJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+PihcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy8ke3NhZmVTaGVldElkfS9saW5lcy8wP2RlbGV0ZVdob2xlU2hlZXQ9dHJ1ZWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBVcGRhdGVzIG9uZSBleHBlbnNlIGxpbmUgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS9saW5lcy97bGluZVJlY0lkfS5cbmV4cG9ydCBjb25zdCB1cGRhdGVFeHBlbnNlU2hlZXRMaW5lID0gYXN5bmMgKFxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcbiAgbGluZVJlY0lkOiBzdHJpbmcsXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXNwb25zZURhdGE+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCBzYWZlTGluZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhsaW5lUmVjSWQgfHwgXCJcIikudHJpbSgpKTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVzcG9uc2VEYXRhPj4oXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH0vbGluZXMvJHtzYWZlTGluZUlkfWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIERlbGV0ZXMgb25lIGV4cGVuc2UgbGluZSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9L2xpbmVzL3tsaW5lUmVjSWR9P2RlbGV0ZVdob2xlU2hlZXQ9ZmFsc2UuXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0TGluZSA9IGFzeW5jIChcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXG4gIGxpbmVSZWNJZDogc3RyaW5nLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG51bGw+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCBzYWZlTGluZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhsaW5lUmVjSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8bnVsbD4+KFxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9L2xpbmVzLyR7c2FmZUxpbmVJZH0/ZGVsZXRlV2hvbGVTaGVldD1mYWxzZWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBTZWFyY2hlcyBwcm9qZWN0cyBmb3IgZHJvcGRvd24gdXNhZ2UgaW4gZmlsdGVycyBhbmQgZWRpdCBmb3Jtcy5cbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VQcm9qZWN0cyA9IGFzeW5jIChcbiAgdGVybTogc3RyaW5nLFxuICBwYWdlOiBudW1iZXIsXG4gIHBhZ2VTaXplOiBudW1iZXIsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8UHJvamVjdERyb3Bkb3duUmVzcG9uc2U+ID0+IHtcbiAgY29uc3Qgc2FmZVRlcm0gPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKHRlcm0gfHwgXCJcIikpO1xuICBjb25zdCBzYWZlUGFnZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlKSAmJiBwYWdlID4gMCA/IE1hdGguZmxvb3IocGFnZSkgOiAxO1xuICBjb25zdCBzYWZlUGFnZVNpemUgPSBOdW1iZXIuaXNGaW5pdGUocGFnZVNpemUpICYmIHBhZ2VTaXplID4gMCA/IE1hdGguZmxvb3IocGFnZVNpemUpIDogMjA7XG5cbiAgcmV0dXJuIGZldGNoSnNvbjxQcm9qZWN0RHJvcGRvd25SZXNwb25zZT4oXG4gICAgYC9HYXN0b3MvR2V0UHJvamVjdHNGb3JEcm9wZG93bj90ZXJtPSR7c2FmZVRlcm19JnBhZ2U9JHtzYWZlUGFnZX0mcGFnZVNpemU9JHtzYWZlUGFnZVNpemV9YCxcbiAgICB7XG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH1cbiAgKTtcbn07XG4iLCAiZXhwb3J0IHR5cGUgRXhwZW5zZURhdGVQYXJ0cyA9IHtcbiAgeWVhcjogc3RyaW5nO1xuICBtb250aDogc3RyaW5nO1xuICBkYXk6IHN0cmluZztcbn07XG5cbmNvbnN0IEJBU1FVRV9NT05USFNfU0hPUlQgPSBbXG4gIFwidXJ0XCIsXG4gIFwib3RzXCIsXG4gIFwibWFyXCIsXG4gIFwiYXBpXCIsXG4gIFwibWFpXCIsXG4gIFwiZWthXCIsXG4gIFwidXp0XCIsXG4gIFwiYWJ1XCIsXG4gIFwiaXJhXCIsXG4gIFwidXJyXCIsXG4gIFwiYXphXCIsXG4gIFwiYWJlXCIsXG5dO1xuXG5jb25zdCBub3JtYWxpemVVaUxvY2FsZSA9IChsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKGxvY2FsZSB8fCBcIlwiKS50cmltKCk7XG4gIGlmICghdmFsdWUpIHJldHVybiBcImVzLUVTXCI7XG4gIGlmICgvXnpoLWhhbnMvaS50ZXN0KHZhbHVlKSkgcmV0dXJuIFwiemgtQ05cIjtcbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuY29uc3QgaXNCYXNxdWVMb2NhbGUgPSAobG9jYWxlOiBzdHJpbmcpOiBib29sZWFuID0+IC9eZXVcXGIvaS50ZXN0KFN0cmluZyhsb2NhbGUgfHwgXCJcIikpO1xuXG4vLyBOb3JtYWxpemUgdW5rbm93biB2YWx1ZXMgdG8gYSB0cmltbWVkIHN0cmluZy5cbmV4cG9ydCBjb25zdCBzYWZlVGV4dCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gXCJcIjtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSkudHJpbSgpO1xufTtcblxuLy8gTm9ybWFsaXplcyBjYXJkIHRpdGxlIHRleHQgb25seSB3aGVuIGl0IGNvbWVzIGluIGZ1bGwgdXBwZXIgb3IgZnVsbCBsb3dlciBjYXNlLlxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUNhcmRUaXRsZVRleHQgPSAodmFsdWU6IHVua25vd24sIGZhbGxiYWNrID0gXCItXCIpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBzb3VyY2UgPSBzYWZlVGV4dCh2YWx1ZSk7XG4gIGlmICghc291cmNlKSByZXR1cm4gZmFsbGJhY2s7XG5cbiAgY29uc3QgaGFzTGV0dGVycyA9IC9bQS1aYS16XHUwMEMwLVx1MDBENlx1MDBEOC1cdTAwRjZcdTAwRjgtXHUwMEZGXS8udGVzdChzb3VyY2UpO1xuICBpZiAoIWhhc0xldHRlcnMpIHJldHVybiBzb3VyY2U7XG5cbiAgY29uc3QgaXNBbGxVcHBlciA9IHNvdXJjZSA9PT0gc291cmNlLnRvVXBwZXJDYXNlKCkgJiYgc291cmNlICE9PSBzb3VyY2UudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgaXNBbGxMb3dlciA9IHNvdXJjZSA9PT0gc291cmNlLnRvTG93ZXJDYXNlKCkgJiYgc291cmNlICE9PSBzb3VyY2UudG9VcHBlckNhc2UoKTtcbiAgaWYgKCFpc0FsbFVwcGVyICYmICFpc0FsbExvd2VyKSB7XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIGNvbnN0IGxvd2VyID0gc291cmNlLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiBgJHtsb3dlci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKX0ke2xvd2VyLnNsaWNlKDEpfWA7XG59O1xuXG4vLyBSZXR1cm5zIHRydWUgb25seSB3aGVuIHZvdWNoZXIgaGFzIGEgbWVhbmluZ2Z1bCBhc3NpZ25lZCB2YWx1ZS5cbmV4cG9ydCBjb25zdCBoYXNBc3NpZ25lZFZvdWNoZXIgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcbiAgY29uc3Qgdm91Y2hlciA9IHNhZmVUZXh0KHZhbHVlKS50b1VwcGVyQ2FzZSgpO1xuICBpZiAoIXZvdWNoZXIpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHZvdWNoZXIgIT09IFwiLVwiICYmIHZvdWNoZXIgIT09IFwiLlwiICYmIHZvdWNoZXIgIT09IFwiMFwiO1xufTtcblxuLy8gUmV0dXJuIGRhdGUgYXQgbG9jYWwgZGF5IHN0YXJ0LlxuZXhwb3J0IGNvbnN0IHN0YXJ0T2ZEYXkgPSAoZGF0ZTogRGF0ZSk6IERhdGUgPT4ge1xuICByZXR1cm4gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKTtcbn07XG5cbi8vIEZvcm1hdCBsb2NhbCBkYXRlIHRvIHl5eXktTU0tZGQuXG5leHBvcnQgY29uc3QgdG9Jc29EYXRlID0gKGRhdGU6IERhdGUpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gYCR7ZGF0ZS5nZXRGdWxsWWVhcigpfS0ke1N0cmluZyhkYXRlLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIil9LSR7U3RyaW5nKGRhdGUuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIil9YDtcbn07XG5cbi8vIFBhcnNlIHN1cHBvcnRlZCBBUEkgZGF0ZSBmb3JtYXRzLlxuZXhwb3J0IGNvbnN0IHBhcnNlRXhwZW5zZURhdGUgPSAocmF3Pzogc3RyaW5nKTogRGF0ZSB8IG51bGwgPT4ge1xuICBpZiAoIXJhdykgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKHJhdykudHJpbSgpO1xuICBpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBkYXRlT25seSA9IHZhbHVlLnNwbGl0KFwiVFwiKVswXS5zcGxpdChcIiBcIilbMF07XG5cbiAgaWYgKC9eXFxkezJ9Wy4vLV1cXGR7Mn1bLi8tXVxcZHs0fSQvLnRlc3QoZGF0ZU9ubHkpKSB7XG4gICAgY29uc3QgW2RheSwgbW9udGgsIHllYXJdID0gZGF0ZU9ubHkuc3BsaXQoL1suLy1dLykubWFwKE51bWJlcik7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcbiAgfVxuXG4gIGlmICgvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdChkYXRlT25seSkpIHtcbiAgICBjb25zdCBbeWVhciwgbW9udGgsIGRheV0gPSBkYXRlT25seS5zcGxpdChcIi1cIikubWFwKE51bWJlcik7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcbiAgfVxuXG4gIGlmICgvXlxcZHs0fVsuLy1dXFxkezJ9Wy4vLV1cXGR7Mn0kLy50ZXN0KGRhdGVPbmx5KSkge1xuICAgIGNvbnN0IFt5ZWFyLCBtb250aCwgZGF5XSA9IGRhdGVPbmx5LnNwbGl0KC9bLi8tXS8pLm1hcChOdW1iZXIpO1xuICAgIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XG4gIH1cblxuICBpZiAoL15cXGR7OH0kLy50ZXN0KGRhdGVPbmx5KSkge1xuICAgIGNvbnN0IHllYXIgPSBOdW1iZXIoZGF0ZU9ubHkuc2xpY2UoMCwgNCkpO1xuICAgIGNvbnN0IG1vbnRoID0gTnVtYmVyKGRhdGVPbmx5LnNsaWNlKDQsIDYpKTtcbiAgICBjb25zdCBkYXkgPSBOdW1iZXIoZGF0ZU9ubHkuc2xpY2UoNiwgOCkpO1xuICAgIHJldHVybiBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XG4gIH1cblxuICBjb25zdCBwYXJzZWQgPSBuZXcgRGF0ZSh2YWx1ZSk7XG4gIHJldHVybiBOdW1iZXIuaXNOYU4ocGFyc2VkLmdldFRpbWUoKSkgPyBudWxsIDogcGFyc2VkO1xufTtcblxuLy8gRm9ybWF0IGEgZGF0ZSBmb3IgcmVhZC1vbmx5IGZpZWxkcyB1c2luZyB0aGUgc2FtZSBvdXRwdXQgc3R5bGUgYXMgdmlzaXRzLlxuZXhwb3J0IGNvbnN0IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSA9IChyYXc/OiBzdHJpbmcsIGxvY2FsZSA9IFwiZXMtRVNcIiwgZmFsbGJhY2sgPSBcIi1cIik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGRhdGUgPSBwYXJzZUV4cGVuc2VEYXRlKHJhdyk7XG4gIGlmICghZGF0ZSkgcmV0dXJuIGZhbGxiYWNrO1xuXG4gIGNvbnN0IHNhZmVMb2NhbGUgPSBub3JtYWxpemVVaUxvY2FsZShsb2NhbGUpO1xuICBpZiAoaXNCYXNxdWVMb2NhbGUoc2FmZUxvY2FsZSkpIHtcbiAgICByZXR1cm4gYCR7ZGF0ZS5nZXREYXRlKCl9ICR7QkFTUVVFX01PTlRIU19TSE9SVFtkYXRlLmdldE1vbnRoKCldfSAke2RhdGUuZ2V0RnVsbFllYXIoKX1gLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICByZXR1cm4gZGF0ZVxuICAgIC50b0xvY2FsZURhdGVTdHJpbmcoc2FmZUxvY2FsZSwge1xuICAgICAgZGF5OiBcIm51bWVyaWNcIixcbiAgICAgIG1vbnRoOiBcInNob3J0XCIsXG4gICAgICB5ZWFyOiBcIm51bWVyaWNcIixcbiAgICB9KVxuICAgIC5yZXBsYWNlKC9cXC4vZywgXCJcIilcbiAgICAudG9Mb3dlckNhc2UoKTtcbn07XG5cbi8vIEJ1aWxkIHRpbWVsaW5lIGRhdGUgZnJhZ21lbnRzIGZvciBjYXJkIGxlZnQgcGFuZWwuXG5leHBvcnQgY29uc3QgZm9ybWF0RXhwZW5zZURhdGVQYXJ0cyA9IChyYXc/OiBzdHJpbmcsIGxvY2FsZSA9IFwiZXMtRVNcIik6IEV4cGVuc2VEYXRlUGFydHMgPT4ge1xuICBjb25zdCBkYXRlID0gcGFyc2VFeHBlbnNlRGF0ZShyYXcpO1xuICBpZiAoIWRhdGUpIHtcbiAgICByZXR1cm4geyB5ZWFyOiBcIlwiLCBtb250aDogXCJcIiwgZGF5OiBcIi0tXCIgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgeWVhcjogU3RyaW5nKGRhdGUuZ2V0RnVsbFllYXIoKSksXG4gICAgbW9udGg6IGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBtb250aDogXCJzaG9ydFwiIH0pLnJlcGxhY2UoL1xcLi9nLCBcIlwiKS50b1VwcGVyQ2FzZSgpLFxuICAgIGRheTogU3RyaW5nKGRhdGUuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIiksXG4gIH07XG59O1xuIiwgInR5cGUgTmF2aWdhdGVXaXRoR3VhcmRPcHRpb25zID0ge1xuICBhc2tDb25maXJtYXRpb24/OiBib29sZWFuO1xuICBieXBhc3NHdWFyZE9uY2U/OiBib29sZWFuO1xuICBtZXNzYWdlPzogc3RyaW5nO1xufTtcblxuLy8gVXBkYXRlcyB0aGUgZ2xvYmFsIG5hdmlnYXRpb24gZ3VhcmQgbGlmZWN5Y2xlIGZvciBhY3RpdmUgZWRpdCBwcm9jZXNzZXMuXG5leHBvcnQgY29uc3Qgc2V0RXhwZW5zZU5hdmlnYXRpb25HdWFyZCA9IChhY3RpdmU6IGJvb2xlYW4pOiB2b2lkID0+IHtcbiAgd2luZG93Ll9faW5kU2V0TmF2aWdhdGlvbkd1YXJkPy4oYWN0aXZlKTtcbn07XG5cbi8vIENsZWFycyBnbG9iYWwgbmF2aWdhdGlvbiBndWFyZCBmbGFncyB3aGVuIGNvbXBvbmVudCB1bm1vdW50cy5cbmV4cG9ydCBjb25zdCBjbGVhckV4cGVuc2VOYXZpZ2F0aW9uR3VhcmQgPSAoKTogdm9pZCA9PiB7XG4gIHdpbmRvdy5fX2luZENsZWFyTmF2aWdhdGlvbkd1YXJkPy4oKTtcbn07XG5cbi8vIEV4ZWN1dGVzIG5hdmlnYXRpb24gYWN0aW9uIHRocm91Z2ggc2l0ZSBndWFyZCBpZiBhdmFpbGFibGUuXG5leHBvcnQgY29uc3QgcnVuR3VhcmRlZE5hdmlnYXRpb24gPSAoXG4gIGFjdGlvbjogKCkgPT4gdm9pZCxcbiAgb3B0aW9uczogTmF2aWdhdGVXaXRoR3VhcmRPcHRpb25zID0ge31cbik6IHZvaWQgPT4ge1xuICBjb25zdCB7IGFza0NvbmZpcm1hdGlvbiA9IGZhbHNlLCBtZXNzYWdlIH0gPSBvcHRpb25zO1xuICBpZiAoYXNrQ29uZmlybWF0aW9uICYmIHR5cGVvZiB3aW5kb3cuX19pbmRSZXF1ZXN0TmF2aWdhdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgd2luZG93Ll9faW5kUmVxdWVzdE5hdmlnYXRpb24oYWN0aW9uLCBtZXNzYWdlKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBhY3Rpb24oKTtcbn07XG5cbi8vIE5hdmlnYXRlcyB0byB0YXJnZXQgVVJMIGFuZCBrZWVwcyBzaXRlLWxldmVsIGd1YXJkIGJlaGF2aW9yIGNvbnNpc3RlbnQuXG5leHBvcnQgY29uc3QgbmF2aWdhdGVUb0V4cGVuc2VVcmwgPSAoXG4gIHRhcmdldFVybDogc3RyaW5nLFxuICBvcHRpb25zOiBOYXZpZ2F0ZVdpdGhHdWFyZE9wdGlvbnMgPSB7fVxuKTogdm9pZCA9PiB7XG4gIGNvbnN0IHNhZmVVcmwgPSBTdHJpbmcodGFyZ2V0VXJsIHx8IFwiXCIpLnRyaW0oKTtcbiAgaWYgKCFzYWZlVXJsKSByZXR1cm47XG5cbiAgY29uc3QgeyBieXBhc3NHdWFyZE9uY2UgPSB0cnVlIH0gPSBvcHRpb25zO1xuICBydW5HdWFyZGVkTmF2aWdhdGlvbigoKSA9PiB7XG4gICAgaWYgKGJ5cGFzc0d1YXJkT25jZSkge1xuICAgICAgd2luZG93Ll9faW5kQnlwYXNzTmF2aWdhdGlvbkd1YXJkT25jZT8uKCk7XG4gICAgfVxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gc2FmZVVybDtcbiAgfSwgb3B0aW9ucyk7XG59O1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlbW90ZVNlYXJjaENvbWJvYm94LCB7IHR5cGUgUmVtb3RlU2VhcmNoT3B0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9SZW1vdGVTZWFyY2hDb21ib2JveC50c3hcIjtcbmltcG9ydCB7IGZldGNoRXhwZW5zZVByb2plY3RzIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcblxudHlwZSBFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHNob3dMYWJlbD86IGJvb2xlYW47XG59O1xuXG5jb25zdCBTRUFSQ0hfUEFHRV9TSVpFID0gMTA7XG5cbmNvbnN0IG1hcFByb2plY3RPcHRpb25zID0gKGl0ZW1zOiBBcnJheTx7IHZhbHVlPzogc3RyaW5nOyB0ZXh0Pzogc3RyaW5nIH0+IHwgdW5kZWZpbmVkKTogUmVtb3RlU2VhcmNoT3B0aW9uW10gPT4ge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkoaXRlbXMpID8gaXRlbXMgOiBbXSlcbiAgICAubWFwKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZVRleHQgPSBTdHJpbmcoaXRlbT8udmFsdWUgfHwgXCJcIikudHJpbSgpO1xuICAgICAgaWYgKCF2YWx1ZVRleHQpIHJldHVybiBudWxsO1xuICAgICAgY29uc3Qgc3VidGl0bGUgPSBTdHJpbmcoaXRlbT8udGV4dCB8fCBcIlwiKS50cmltKCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogdmFsdWVUZXh0LFxuICAgICAgICB0aXRsZTogdmFsdWVUZXh0LFxuICAgICAgICBzdWJ0aXRsZTogc3VidGl0bGUgfHwgXCItXCIsXG4gICAgICB9IGFzIFJlbW90ZVNlYXJjaE9wdGlvbjtcbiAgICB9KVxuICAgIC5maWx0ZXIoQm9vbGVhbikgYXMgUmVtb3RlU2VhcmNoT3B0aW9uW107XG59O1xuXG4vLyBQcm9qZWN0IGZpbHRlciBpbnB1dCBiYWNrZWQgYnkgcmVtb3RlIGRyb3Bkb3duIHN1Z2dlc3Rpb25zLlxuY29uc3QgRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dCA9ICh7XG4gIGxhYmVsLFxuICBwbGFjZWhvbGRlcixcbiAgdmFsdWUsXG4gIG9uQ2hhbmdlLFxuICByZWFkT25seSA9IGZhbHNlLFxuICBkaXNhYmxlZCA9IGZhbHNlLFxuICBzaG93TGFiZWwgPSB0cnVlLFxufTogRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dFByb3BzKSA9PiB7XG4gIGNvbnN0IGxvYWRPcHRpb25zID0gdXNlQ2FsbGJhY2soYXN5bmMgKHRlcm06IHN0cmluZywgc2lnbmFsOiBBYm9ydFNpZ25hbCk6IFByb21pc2U8UmVtb3RlU2VhcmNoT3B0aW9uW10+ID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVByb2plY3RzKHRlcm0sIDEsIFNFQVJDSF9QQUdFX1NJWkUsIHtcbiAgICAgIHNpZ25hbCxcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1hcFByb2plY3RPcHRpb25zKHJlc3BvbnNlPy5pdGVtcyk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBsb2FkT3B0aW9uc1BhZ2UgPSB1c2VDYWxsYmFjayhhc3luYyAodGVybTogc3RyaW5nLCBwYWdlOiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIsIHNpZ25hbDogQWJvcnRTaWduYWwpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVByb2plY3RzKHRlcm0sIHBhZ2UsIHBhZ2VTaXplLCB7XG4gICAgICBzaWduYWwsXG4gICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICBpdGVtczogbWFwUHJvamVjdE9wdGlvbnMocmVzcG9uc2U/Lml0ZW1zKSxcbiAgICAgIHRvdGFsOiBOdW1iZXIocmVzcG9uc2U/LnRvdGFsIHx8IDApLFxuICAgIH07XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxSZW1vdGVTZWFyY2hDb21ib2JveFxuICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgdmFsdWU9e3ZhbHVlfVxuICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlfVxuICAgICAgb25TZWFyY2g9e2xvYWRPcHRpb25zfVxuICAgICAgb25TZWFyY2hQYWdlPXtsb2FkT3B0aW9uc1BhZ2V9XG4gICAgICBpZEJhc2U9XCJleHBlbnNlLXByb2plY3QtZmlsdGVyXCJcbiAgICAgIG1pblNlYXJjaExlbmd0aD17MH1cbiAgICAgIHBhZ2VTaXplPXtTRUFSQ0hfUEFHRV9TSVpFfVxuICAgICAgYWxsb3dFbXB0eVNlYXJjaFxuICAgICAgbG9hZE9uT3BlblxuICAgICAgaW5maW5pdGVTY3JvbGxcbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cbiAgICAgIHNob3dMYWJlbD17c2hvd0xhYmVsfVxuICAgICAgcGFuZWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0O1xuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgRmxvYXRpbmdMaXN0IGZyb20gXCIuL0Zsb2F0aW5nTGlzdC50c3hcIjtcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuL1NwaW5uZXIudHN4XCI7XG5pbXBvcnQgeyBDaGV2cm9uRG93blN2ZywgQ2hldnJvblVwU3ZnIH0gZnJvbSBcIi4vY2hldnJvbnMudHN4XCI7XG5pbXBvcnQgeyBoYW5kbGVDb21ib2JveEtleURvd24gfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlQ29tYm9ib3hLZXlib2FyZC50c1wiO1xuaW1wb3J0IHsgdXNlT3V0c2lkZUNsaWNrIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZU91dHNpZGVDbGljay50c1wiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcblxuZXhwb3J0IHR5cGUgUmVtb3RlU2VhcmNoT3B0aW9uID0ge1xuICB2YWx1ZTogc3RyaW5nO1xuICB0aXRsZT86IHN0cmluZztcbiAgc3VidGl0bGU/OiBzdHJpbmc7XG59O1xuXG50eXBlIFJlbW90ZVNlYXJjaENvbWJvYm94UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25TZWFyY2g6ICh0ZXJtOiBzdHJpbmcsIHNpZ25hbDogQWJvcnRTaWduYWwpID0+IFByb21pc2U8UmVtb3RlU2VhcmNoT3B0aW9uW10+O1xuICBvblNlYXJjaFBhZ2U/OiAoXG4gICAgdGVybTogc3RyaW5nLFxuICAgIHBhZ2U6IG51bWJlcixcbiAgICBwYWdlU2l6ZTogbnVtYmVyLFxuICAgIHNpZ25hbDogQWJvcnRTaWduYWxcbiAgKSA9PiBQcm9taXNlPHsgaXRlbXM6IFJlbW90ZVNlYXJjaE9wdGlvbltdOyB0b3RhbD86IG51bWJlciB9PjtcbiAgaWRCYXNlOiBzdHJpbmc7XG4gIG1pblNlYXJjaExlbmd0aD86IG51bWJlcjtcbiAgcGFnZVNpemU/OiBudW1iZXI7XG4gIGFsbG93RW1wdHlTZWFyY2g/OiBib29sZWFuO1xuICBsb2FkT25PcGVuPzogYm9vbGVhbjtcbiAgaW5maW5pdGVTY3JvbGw/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XG59O1xuXG5jb25zdCB1bmlxdWVCeVZhbHVlID0gKGl0ZW1zOiBSZW1vdGVTZWFyY2hPcHRpb25bXSk6IFJlbW90ZVNlYXJjaE9wdGlvbltdID0+IHtcbiAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIFJlbW90ZVNlYXJjaE9wdGlvbj4oKTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zIHx8IFtdKSB7XG4gICAgY29uc3Qga2V5ID0gU3RyaW5nKGl0ZW0udmFsdWUgfHwgXCJcIikudHJpbSgpO1xuICAgIGlmICgha2V5KSBjb250aW51ZTtcbiAgICBpZiAobWFwLmhhcyhrZXkpKSBjb250aW51ZTtcbiAgICBtYXAuc2V0KGtleSwge1xuICAgICAgdmFsdWU6IGtleSxcbiAgICAgIHRpdGxlOiBTdHJpbmcoaXRlbS50aXRsZSB8fCBcIlwiKS50cmltKCksXG4gICAgICBzdWJ0aXRsZTogU3RyaW5nKGl0ZW0uc3VidGl0bGUgfHwgXCJcIikudHJpbSgpLFxuICAgIH0pO1xuICB9XG4gIHJldHVybiBBcnJheS5mcm9tKG1hcC52YWx1ZXMoKSk7XG59O1xuXG4vLyBHZW5lcmljIHJlbW90ZS1zZWFyY2ggY29tYm9ib3ggdGhhdCBzdXBwb3J0cyBtYW51YWwgc2VhcmNoIGFuZCBvcHRpb25hbCBwYWdlZCBsb2FkaW5nIG9uIG9wZW4uXG5jb25zdCBSZW1vdGVTZWFyY2hDb21ib2JveCA9ICh7XG4gIGxhYmVsLFxuICBwbGFjZWhvbGRlcixcbiAgdmFsdWUsXG4gIG9uQ2hhbmdlLFxuICBvblNlYXJjaCxcbiAgb25TZWFyY2hQYWdlLFxuICBpZEJhc2UsXG4gIG1pblNlYXJjaExlbmd0aCA9IDIsXG4gIHBhZ2VTaXplID0gMjAsXG4gIGFsbG93RW1wdHlTZWFyY2ggPSBmYWxzZSxcbiAgbG9hZE9uT3BlbiA9IGZhbHNlLFxuICBpbmZpbml0ZVNjcm9sbCA9IGZhbHNlLFxuICBkaXNhYmxlZCA9IGZhbHNlLFxuICByZWFkT25seSA9IGZhbHNlLFxuICBzaG93TGFiZWwgPSB0cnVlLFxuICBwYW5lbENsYXNzTmFtZSA9IFwidmlzaXRhcy10eXBvZ3JhcGh5XCIsXG59OiBSZW1vdGVTZWFyY2hDb21ib2JveFByb3BzKSA9PiB7XG4gIGNvbnN0IHJlYWRPbmx5TW9kZSA9IHJlYWRPbmx5IHx8IGRpc2FibGVkO1xuICBjb25zdCB2YWx1ZUNvbG9yID0gcmVhZE9ubHlNb2RlID8gXCIjNjQ3NDhiXCIgOiBcIiMwMDI5NmJlMFwiO1xuICBjb25zdCBbcXVlcnksIHNldFF1ZXJ5XSA9IHVzZVN0YXRlKHZhbHVlIHx8IFwiXCIpO1xuICBjb25zdCBbb3B0aW9ucywgc2V0T3B0aW9uc10gPSB1c2VTdGF0ZTxSZW1vdGVTZWFyY2hPcHRpb25bXT4oW10pO1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2FjdGl2ZUluZGV4LCBzZXRBY3RpdmVJbmRleF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2xhc3RTZWFyY2hlZFRlcm0sIHNldExhc3RTZWFyY2hlZFRlcm1dID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtjdXJyZW50UGFnZSwgc2V0Q3VycmVudFBhZ2VdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtoYXNNb3JlLCBzZXRIYXNNb3JlXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBhYm9ydFJlZiA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGJveFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgdXNlT3V0c2lkZUNsaWNrKFtjb250YWluZXJSZWYsIGxpc3RSZWZdLCAoKSA9PiBzZXRPcGVuKGZhbHNlKSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXRRdWVyeSh2YWx1ZSB8fCBcIlwiKTtcbiAgfSwgW3ZhbHVlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgYWJvcnRSZWYuY3VycmVudD8uYWJvcnQoKTtcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICBjb25zdCBmaWx0ZXJlZCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmICghcXVlcnkudHJpbSgpKSByZXR1cm4gb3B0aW9ucztcbiAgICBjb25zdCBxID0gcXVlcnkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIG9wdGlvbnMuZmlsdGVyKChvcHRpb24pID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlVGV4dCA9IG9wdGlvbi52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgdGl0bGVUZXh0ID0gU3RyaW5nKG9wdGlvbi50aXRsZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3Qgc3VidGl0bGVUZXh0ID0gU3RyaW5nKG9wdGlvbi5zdWJ0aXRsZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgcmV0dXJuIHZhbHVlVGV4dC5pbmNsdWRlcyhxKSB8fCB0aXRsZVRleHQuaW5jbHVkZXMocSkgfHwgc3VidGl0bGVUZXh0LmluY2x1ZGVzKHEpO1xuICAgIH0pO1xuICB9LCBbb3B0aW9ucywgcXVlcnldKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldEFjdGl2ZUluZGV4KDApO1xuICB9LCBbZmlsdGVyZWQubGVuZ3RoLCBxdWVyeV0pO1xuXG4gIGNvbnN0IGNhblNlYXJjaFRlcm0gPSB1c2VDYWxsYmFjayhcbiAgICAodGVybTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gICAgICBjb25zdCB0cmltbWVkID0gdGVybS50cmltKCk7XG4gICAgICBpZiAoIXRyaW1tZWQpIHJldHVybiBhbGxvd0VtcHR5U2VhcmNoO1xuICAgICAgcmV0dXJuIHRyaW1tZWQubGVuZ3RoID49IG1pblNlYXJjaExlbmd0aDtcbiAgICB9LFxuICAgIFthbGxvd0VtcHR5U2VhcmNoLCBtaW5TZWFyY2hMZW5ndGhdXG4gICk7XG5cbiAgY29uc3QgZXhlY3V0ZVNlYXJjaCA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jICh0ZXJtOiBzdHJpbmcsIHBhZ2U6IG51bWJlciwgYXBwZW5kOiBib29sZWFuKSA9PiB7XG4gICAgICBhYm9ydFJlZi5jdXJyZW50Py5hYm9ydCgpO1xuICAgICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQgPSBjb250cm9sbGVyO1xuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcblxuICAgICAgY29uc3QgdGVybUtleSA9IHRlcm0udG9Mb3dlckNhc2UoKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChvblNlYXJjaFBhZ2UpIHtcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG9uU2VhcmNoUGFnZSh0ZXJtLCBwYWdlLCBwYWdlU2l6ZSwgY29udHJvbGxlci5zaWduYWwpO1xuICAgICAgICAgIGNvbnN0IHBhZ2VJdGVtcyA9IHVuaXF1ZUJ5VmFsdWUoQXJyYXkuaXNBcnJheShyZXNwb25zZT8uaXRlbXMpID8gcmVzcG9uc2UuaXRlbXMgOiBbXSk7XG4gICAgICAgICAgc2V0T3B0aW9ucygocHJldmlvdXMpID0+IChhcHBlbmQgPyB1bmlxdWVCeVZhbHVlKFsuLi4ocHJldmlvdXMgfHwgW10pLCAuLi5wYWdlSXRlbXNdKSA6IHBhZ2VJdGVtcykpO1xuICAgICAgICAgIHNldEN1cnJlbnRQYWdlKHBhZ2UpO1xuXG4gICAgICAgICAgY29uc3QgYXBpVG90YWwgPSBOdW1iZXIocmVzcG9uc2U/LnRvdGFsKTtcbiAgICAgICAgICBpZiAoTnVtYmVyLmlzRmluaXRlKGFwaVRvdGFsKSAmJiBhcGlUb3RhbCA+IDApIHtcbiAgICAgICAgICAgIHNldEhhc01vcmUocGFnZSAqIHBhZ2VTaXplIDwgYXBpVG90YWwpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXRIYXNNb3JlKHBhZ2VJdGVtcy5sZW5ndGggPj0gcGFnZVNpemUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG9uU2VhcmNoKHRlcm0sIGNvbnRyb2xsZXIuc2lnbmFsKTtcbiAgICAgICAgICBjb25zdCBuZXh0ID0gdW5pcXVlQnlWYWx1ZShyZXNwb25zZSB8fCBbXSk7XG4gICAgICAgICAgc2V0T3B0aW9ucyhuZXh0KTtcbiAgICAgICAgICBzZXRDdXJyZW50UGFnZSgxKTtcbiAgICAgICAgICBzZXRIYXNNb3JlKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldExhc3RTZWFyY2hlZFRlcm0odGVybUtleSk7XG4gICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgaWYgKCFhcHBlbmQpIHtcbiAgICAgICAgICBzZXRPcHRpb25zKFtdKTtcbiAgICAgICAgICBzZXRDdXJyZW50UGFnZSgwKTtcbiAgICAgICAgICBzZXRIYXNNb3JlKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRMYXN0U2VhcmNoZWRUZXJtKHRlcm1LZXkpO1xuICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKGFib3J0UmVmLmN1cnJlbnQgPT09IGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtvblNlYXJjaCwgb25TZWFyY2hQYWdlLCBwYWdlU2l6ZV1cbiAgKTtcblxuICBjb25zdCBydW5TZWFyY2ggPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKHJlYWRPbmx5TW9kZSB8fCBsb2FkaW5nKSByZXR1cm47XG4gICAgY29uc3QgdGVybSA9IHF1ZXJ5LnRyaW0oKTtcbiAgICBjb25zdCB0ZXJtS2V5ID0gdGVybS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKCFjYW5TZWFyY2hUZXJtKHRlcm0pKSB7XG4gICAgICBzZXRPcHRpb25zKFtdKTtcbiAgICAgIHNldEN1cnJlbnRQYWdlKDApO1xuICAgICAgc2V0SGFzTW9yZShmYWxzZSk7XG4gICAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICAgIHNldExhc3RTZWFyY2hlZFRlcm0oXCJcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRlcm1LZXkgPT09IGxhc3RTZWFyY2hlZFRlcm0gJiYgb3B0aW9ucy5sZW5ndGggPiAwICYmICFvblNlYXJjaFBhZ2UpIHtcbiAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgZXhlY3V0ZVNlYXJjaCh0ZXJtLCAxLCBmYWxzZSk7XG4gIH0sIFtjYW5TZWFyY2hUZXJtLCBleGVjdXRlU2VhcmNoLCBsYXN0U2VhcmNoZWRUZXJtLCBsb2FkaW5nLCBvblNlYXJjaFBhZ2UsIG9wdGlvbnMubGVuZ3RoLCBxdWVyeSwgcmVhZE9ubHlNb2RlXSk7XG5cbiAgY29uc3QgcnVuTG9hZE1vcmUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKHJlYWRPbmx5TW9kZSB8fCBsb2FkaW5nIHx8ICFvblNlYXJjaFBhZ2UgfHwgIWluZmluaXRlU2Nyb2xsIHx8ICFoYXNNb3JlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdGVybSA9IHF1ZXJ5LnRyaW0oKTtcbiAgICBjb25zdCB0ZXJtS2V5ID0gdGVybS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICh0ZXJtS2V5ICE9PSBsYXN0U2VhcmNoZWRUZXJtKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFBhZ2UgPSBjdXJyZW50UGFnZSArIDE7XG4gICAgaWYgKG5leHRQYWdlIDw9IDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCBleGVjdXRlU2VhcmNoKHRlcm0sIG5leHRQYWdlLCB0cnVlKTtcbiAgfSwgW2N1cnJlbnRQYWdlLCBleGVjdXRlU2VhcmNoLCBoYXNNb3JlLCBpbmZpbml0ZVNjcm9sbCwgbGFzdFNlYXJjaGVkVGVybSwgbG9hZGluZywgb25TZWFyY2hQYWdlLCBxdWVyeSwgcmVhZE9ubHlNb2RlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIW9wZW4gfHwgIW9uU2VhcmNoUGFnZSB8fCAhaW5maW5pdGVTY3JvbGwpIHJldHVybjtcbiAgICBjb25zdCBzY3JvbGxlciA9IGxpc3RSZWYuY3VycmVudD8ucGFyZW50RWxlbWVudDtcbiAgICBpZiAoIXNjcm9sbGVyKSByZXR1cm47XG5cbiAgICBjb25zdCBvblNjcm9sbCA9ICgpID0+IHtcbiAgICAgIGlmIChsb2FkaW5nIHx8ICFoYXNNb3JlKSByZXR1cm47XG4gICAgICBjb25zdCB0aHJlc2hvbGQgPSA0MDtcbiAgICAgIGNvbnN0IGlzTmVhckJvdHRvbSA9IHNjcm9sbGVyLnNjcm9sbFRvcCArIHNjcm9sbGVyLmNsaWVudEhlaWdodCA+PSBzY3JvbGxlci5zY3JvbGxIZWlnaHQgLSB0aHJlc2hvbGQ7XG4gICAgICBpZiAoaXNOZWFyQm90dG9tKSB7XG4gICAgICAgIHZvaWQgcnVuTG9hZE1vcmUoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2Nyb2xsZXIuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBzY3JvbGxlci5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsKTtcbiAgICB9O1xuICB9LCBbaGFzTW9yZSwgaW5maW5pdGVTY3JvbGwsIGxvYWRpbmcsIG9uU2VhcmNoUGFnZSwgb3BlbiwgcnVuTG9hZE1vcmVdKTtcblxuICBjb25zdCBzZWxlY3RPcHRpb24gPSAob3B0aW9uOiBSZW1vdGVTZWFyY2hPcHRpb24pID0+IHtcbiAgICBjb25zdCBuZXh0VmFsdWUgPSBTdHJpbmcob3B0aW9uLnZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBzZXRRdWVyeShuZXh0VmFsdWUpO1xuICAgIG9uQ2hhbmdlKG5leHRWYWx1ZSk7XG4gICAgc2V0TGFzdFNlYXJjaGVkVGVybShuZXh0VmFsdWUudG9Mb3dlckNhc2UoKSk7XG4gICAgc2V0T3BlbihmYWxzZSk7XG4gIH07XG5cbiAgY29uc3QgcXVlcnlLZXkgPSBxdWVyeS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3Qgc2hvd1NlYXJjaEljb24gPVxuICAgICFyZWFkT25seU1vZGUgJiZcbiAgICAhbG9hZGluZyAmJlxuICAgIGNhblNlYXJjaFRlcm0ocXVlcnkpICYmXG4gICAgcXVlcnlLZXkgIT09IGxhc3RTZWFyY2hlZFRlcm07XG5cbiAgY29uc3QgbGlzdElkID0gYCR7aWRCYXNlfS1vcHRpb25zYDtcbiAgY29uc3QgYWN0aXZlSWQgPSBvcGVuICYmIGZpbHRlcmVkW2FjdGl2ZUluZGV4XSA/IGAke2lkQmFzZX0tb3B0LSR7ZmlsdGVyZWRbYWN0aXZlSW5kZXhdLnZhbHVlfWAgOiB1bmRlZmluZWQ7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiIHJlZj17Y29udGFpbmVyUmVmfT5cbiAgICAgIHtzaG93TGFiZWwgPyAoXG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIiBzdHlsZT17eyBjb2xvcjogXCIjMDAyOTZiZTBcIiB9fT5cbiAgICAgICAgICB7bGFiZWx9XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICApIDogbnVsbH1cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJlZj17Ym94UmVmfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgIFwicmVsYXRpdmUgdy1mdWxsIHJvdW5kZWQteGwgYmctd2hpdGUgdGV4dC1sZWZ0IGZvY3VzLXdpdGhpbjpib3JkZXItcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy0yIGZvY3VzLXdpdGhpbjpyaW5nLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctb2Zmc2V0LXdoaXRlIHNtOnRleHQtc21cIixcbiAgICAgICAgICAgIHJlYWRPbmx5TW9kZSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiXG4gICAgICAgICAgKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICBcInctZnVsbCByb3VuZGVkLXhsIGJvcmRlciBweC0zIHB5LTIgcHItMjAgdGV4dC1zbSBzbTp0ZXh0LWJhc2UgbGVhZGluZy01IGZvY3VzOm91dGxpbmUtaGlkZGVuIGZvY3VzOnJpbmctMiBkaXNhYmxlZDpiZy1zbGF0ZS0xMDAgZGlzYWJsZWQ6dGV4dC1zbGF0ZS01MDAgZGlzYWJsZWQ6Ym9yZGVyLXNsYXRlLTIwMCBkaXNhYmxlZDpjdXJzb3Itbm90LWFsbG93ZWRcIixcbiAgICAgICAgICAgICAgXCJib3JkZXItc2xhdGUtMjAwIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiLFxuICAgICAgICAgICAgICByZWFkT25seU1vZGUgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJ0ZXh0LXNsYXRlLTkwMFwiXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6IHZhbHVlQ29sb3IgfX1cbiAgICAgICAgICAgIHZhbHVlPXtxdWVyeX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgbmV4dFZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICBzZXRRdWVyeShuZXh0VmFsdWUpO1xuICAgICAgICAgICAgICBvbkNoYW5nZShuZXh0VmFsdWUpO1xuICAgICAgICAgICAgICBpZiAobmV4dFZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpICE9PSBsYXN0U2VhcmNoZWRUZXJtKSB7XG4gICAgICAgICAgICAgICAgc2V0T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkZvY3VzPXsoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghcmVhZE9ubHlNb2RlICYmIGZpbHRlcmVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25LZXlEb3duPXsoZXZlbnQpID0+XG4gICAgICAgICAgICAgIGhhbmRsZUNvbWJvYm94S2V5RG93bihldmVudCwge1xuICAgICAgICAgICAgICAgIGlzT3Blbjogb3BlbixcbiAgICAgICAgICAgICAgICBzZXRPcGVuLFxuICAgICAgICAgICAgICAgIG9wdGlvbkNvdW50OiBmaWx0ZXJlZC5sZW5ndGgsXG4gICAgICAgICAgICAgICAgc2V0QWN0aXZlSW5kZXgsXG4gICAgICAgICAgICAgICAgb25FbnRlcldoZW5PcGVuOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb24oZmlsdGVyZWRbYWN0aXZlSW5kZXhdID8/IGZpbHRlcmVkWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgdm9pZCBydW5TZWFyY2goKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uRW50ZXJXaGVuQ2xvc2VkOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB2b2lkIHJ1blNlYXJjaCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3Blbk9uQXJyb3c6IHRydWUsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbH1cbiAgICAgICAgICAgIHJvbGU9XCJjb21ib2JveFwiXG4gICAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtvcGVufVxuICAgICAgICAgICAgYXJpYS1jb250cm9scz17bGlzdElkfVxuICAgICAgICAgICAgYXJpYS1hY3RpdmVkZXNjZW5kYW50PXthY3RpdmVJZH1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBwci0yXCI+XG4gICAgICAgICAgICB7bG9hZGluZyA/IChcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcHgtMS41XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNCB3LTRcIiAvPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgICAge3Nob3dTZWFyY2hJY29uID8gKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcC0xLjUgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS01MDBcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIHZvaWQgcnVuU2VhcmNoKCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX1NlYXJjaFwiLCBcIlNlYXJjaFwiKX1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17cmVhZE9ubHlNb2RlfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9ezEuNX0gc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgY2xhc3NOYW1lPVwiaC01IHctNVwiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtMTUuNzUgMTUuNzUtMi40ODktMi40ODltMCAwYTMuMzc1IDMuMzc1IDAgMSAwLTQuNzczLTQuNzczIDMuMzc1IDMuMzc1IDAgMCAwIDQuNzc0IDQuNzc0Wk0yMSAxMmE5IDkgMCAxIDEtMTggMCA5IDkgMCAwIDEgMTggMFpcIiAvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBwLTEuNSB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTYwMFwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVhZE9ubHlNb2RlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKG9wZW4pIHtcbiAgICAgICAgICAgICAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXF1ZXJ5LnRyaW0oKSAmJiBsb2FkT25PcGVuKSB7XG4gICAgICAgICAgICAgICAgICB2b2lkIHJ1blNlYXJjaCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17b3BlbiA/IGluZFQoXCJEcm9wZG93bl9IaWRlT3B0aW9uc1wiLCBcIkhpZGUgb3B0aW9uc1wiKSA6IGluZFQoXCJEcm9wZG93bl9TaG93T3B0aW9uc1wiLCBcIlNob3cgb3B0aW9uc1wiKX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e3JlYWRPbmx5TW9kZX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge29wZW4gPyA8Q2hldnJvblVwU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPiA6IDxDaGV2cm9uRG93blN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz59XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxGbG9hdGluZ0xpc3RcbiAgICAgICAgICBhbmNob3JSZWY9e2JveFJlZn1cbiAgICAgICAgICBvcGVuPXtvcGVufVxuICAgICAgICAgIHpJbmRleD17MzYwMDAwfVxuICAgICAgICAgIG1heEhlaWdodENsYXNzPVwibWF4LWgtNzJcIlxuICAgICAgICAgIHJvbGU9XCJsaXN0Ym94XCJcbiAgICAgICAgICByb3VuZGVkQ2xhc3M9XCJyb3VuZGVkLXhsXCJcbiAgICAgICAgICBwYW5lbENsYXNzTmFtZT17cGFuZWxDbGFzc05hbWV9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGlkPXtsaXN0SWR9IHJlZj17bGlzdFJlZn0+XG4gICAgICAgICAgICB7bG9hZGluZyA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPntpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfTwvZGl2PlxuICAgICAgICAgICAgKSA6IGZpbHRlcmVkLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPntpbmRUKFwiQ29tbW9uX05vRGF0YVwiLCBcIk5vIGRhdGFcIil9PC9kaXY+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICBmaWx0ZXJlZC5tYXAoKG9wdGlvbiwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGluZGV4ID09PSBhY3RpdmVJbmRleDtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25JZCA9IG9wdGlvbi52YWx1ZSB8fCBgJHtpbmRleH1gO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBrZXk9e29wdGlvbklkfVxuICAgICAgICAgICAgICAgICAgICBpZD17YCR7aWRCYXNlfS1vcHQtJHtvcHRpb25JZH1gfVxuICAgICAgICAgICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17aXNBY3RpdmV9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICAgICAgICBcInJlbGF0aXZlIGZsZXggdy1mdWxsIGN1cnNvci1kZWZhdWx0IHNlbGVjdC1ub25lIGl0ZW1zLXN0YXJ0IHB5LTIgcHgtMyB0ZXh0LWxlZnQgdGV4dC1zbVwiLFxuICAgICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID8gXCJiZy1wcmltYXJ5IHRleHQtd2hpdGVcIiA6IFwidGV4dC1zbGF0ZS05MDBcIlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldEFjdGl2ZUluZGV4KGluZGV4KX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2VsZWN0T3B0aW9uKG9wdGlvbil9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1lZGl1bVwiPntvcHRpb24udGl0bGUgfHwgb3B0aW9uLnZhbHVlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICB7b3B0aW9uLnN1YnRpdGxlID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwidGV4dC14c1wiLCBpc0FjdGl2ZSA/IFwidGV4dC13aGl0ZS85MFwiIDogXCJ0ZXh0LXNsYXRlLTUwMFwiKX0+e29wdGlvbi5zdWJ0aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0Zsb2F0aW5nTGlzdD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVtb3RlU2VhcmNoQ29tYm9ib3g7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNPLElBQU0sMkJB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aEJLO0FBQUEsWUFpQlA7QUFBQSxVQUVKLENBQUMsR0FFTDtBQUFBO0FBQUEsTUFDRjtBQUFBLE9BQ0Y7QUFBQSxLQUNGO0FBRUo7QUFFQSxJQUFPLCtCQUFROzs7QURqV1gsSUFBQUMsc0JBQUE7QUFqREosSUFBTSxtQkFBbUI7QUFFekIsSUFBTSxvQkFBb0IsQ0FBQyxVQUFzRjtBQUMvRyxVQUFRLE1BQU0sUUFBUSxLQUFLLElBQUksUUFBUSxDQUFDLEdBQ3JDLElBQUksQ0FBQyxTQUFTO0FBQ2IsVUFBTSxZQUFZLE9BQU8sTUFBTSxTQUFTLEVBQUUsRUFBRSxLQUFLO0FBQ2pELFFBQUksQ0FBQyxVQUFXLFFBQU87QUFDdkIsVUFBTSxXQUFXLE9BQU8sTUFBTSxRQUFRLEVBQUUsRUFBRSxLQUFLO0FBQy9DLFdBQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLFVBQVUsWUFBWTtBQUFBLElBQ3hCO0FBQUEsRUFDRixDQUFDLEVBQ0EsT0FBTyxPQUFPO0FBQ25CO0FBR0EsSUFBTSw0QkFBNEIsQ0FBQztBQUFBLEVBQ2pDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQ2QsTUFBc0M7QUFDcEMsUUFBTSxrQkFBYywyQkFBWSxPQUFPLE1BQWMsV0FBdUQ7QUFDMUcsVUFBTSxXQUFXLE1BQU0scUJBQXFCLE1BQU0sR0FBRyxrQkFBa0I7QUFBQSxNQUNyRTtBQUFBLE1BQ0EseUJBQXlCO0FBQUEsSUFDM0IsQ0FBQztBQUVELFdBQU8sa0JBQWtCLFVBQVUsS0FBSztBQUFBLEVBQzFDLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSxzQkFBa0IsMkJBQVksT0FBTyxNQUFjLE1BQWMsVUFBa0IsV0FBd0I7QUFDL0csVUFBTSxXQUFXLE1BQU0scUJBQXFCLE1BQU0sTUFBTSxVQUFVO0FBQUEsTUFDaEU7QUFBQSxNQUNBLHlCQUF5QjtBQUFBLElBQzNCLENBQUM7QUFFRCxXQUFPO0FBQUEsTUFDTCxPQUFPLGtCQUFrQixVQUFVLEtBQUs7QUFBQSxNQUN4QyxPQUFPLE9BQU8sVUFBVSxTQUFTLENBQUM7QUFBQSxJQUNwQztBQUFBLEVBQ0YsR0FBRyxDQUFDLENBQUM7QUFFTCxTQUNFO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQztBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsVUFBVTtBQUFBLE1BQ1YsY0FBYztBQUFBLE1BQ2QsUUFBTztBQUFBLE1BQ1AsaUJBQWlCO0FBQUEsTUFDakIsVUFBVTtBQUFBLE1BQ1Ysa0JBQWdCO0FBQUEsTUFDaEIsWUFBVTtBQUFBLE1BQ1YsZ0JBQWM7QUFBQSxNQUNkO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLGdCQUFlO0FBQUE7QUFBQSxFQUNqQjtBQUVKO0FBRUEsSUFBTyxvQ0FBUTsiLAogICJuYW1lcyI6IFsic2FmZVRleHQiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
