import {
  EXPENSE_API_DATE_FORMAT_MESSAGE,
  getExpenseActingUserOverride,
  isNonNegativeNumber,
  isPositiveNumber,
  normalizeExpenseSheetListStatusFilter,
  normalizeExpenseSheetSubordinates,
  normalizeOptionalApiDate,
  normalizeOptionalTicketGastoType,
  normalizeOptionalTicketProcessedByAI,
  normalizeOptionalTicketStatus,
  normalizeRequiredApiDate,
  normalizeTicketListDate,
  normalizeTicketListGastoType,
  safeText,
  toFlagBool,
  toNullableBool,
  toNullableGastoTypeCode,
  toNullableNumber,
  toNullableTicketStatusCode
} from "./chunk-QGAYQR5R.js";
import {
  ApiFetchError,
  fetchJson,
  getCsrfToken
} from "./chunk-REMMAK3K.js";

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
var normalizeSubordinatesPagedResponse = (response) => {
  const normalizedItems = normalizeExpenseSheetSubordinates(response?.Items);
  return {
    ...response,
    Items: normalizedItems
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
    Status: toNullableTicketStatusCode(
      item?.Status ?? item?.status
    ),
    ProcessedByAI: toNullableBool(
      item?.ProcessedByAI ?? item?.processedByAI
    ),
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
    const entryCode = safeText(entry?.value || entry?.Value);
    return entryCode === typeValueCode;
  });
  return safeText(match?.text || match?.Text) || typeValueCode;
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
var safeText2 = safeText;
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
  return safeText2(match?.[1]);
};
var removeHeaderValue = (headers, key) => {
  const normalizedKey = key.trim().toLowerCase();
  const toDelete = Object.keys(headers).find((headerKey) => headerKey.trim().toLowerCase() === normalizedKey);
  if (!toDelete) return;
  delete headers[toDelete];
};
var normalizeAxUserIdHeader = (value) => {
  const normalized = safeText2(value);
  if (!normalized) return "";
  const firstToken = normalized.split("-")[0];
  return safeText2(firstToken);
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
    token: safeText2(runtimeWindow.__IND_API_TOKEN__),
    entraOid: safeText2(runtimeWindow.__IND_ENTRA_OID__),
    appCode: safeText2(runtimeWindow.__IND_APP_CODE__),
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
  return safeText2(readExpenseWindowRuntime2().__IND_SELECTED_COMPANY__).toUpperCase();
};
var buildContextKey = (seed) => {
  return `${seed.token}|${seed.entraOid}|${seed.appCode}|${readWindowSelectedCompany()}`;
};
var buildExpenseHeaders = (context, options, includeJson = false, includeAxUserId = true) => {
  const base = sanitizeHeaders(options?.headers);
  const merged = { ...base };
  if (safeText2(context.token)) {
    merged.Authorization = `Bearer ${context.token}`;
  }
  if (safeText2(context.companyId)) {
    merged["X-IND-Company"] = context.companyId;
  }
  if (includeAxUserId) {
    const requestAxUserId = getHeaderValue(options?.headers, "X-IND-AxUserId");
    const overrideAxUserId = getExpenseActingUserOverride();
    const resolvedAxUserId = safeText2(requestAxUserId || overrideAxUserId || context.axUserId);
    if (resolvedAxUserId) {
      merged["X-IND-AxUserId"] = resolvedAxUserId;
    } else {
      removeHeaderValue(merged, "X-IND-AxUserId");
    }
  } else {
    removeHeaderValue(merged, "X-IND-AxUserId");
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
  if (safeText2(token)) {
    merged.Authorization = `Bearer ${token}`;
  }
  return merged;
};
var resolveAuthToken = (options) => {
  const tokenFromHeaders = resolveBearerToken(options?.headers);
  const windowSeed = readWindowAuthSeed();
  return safeText2(tokenFromHeaders || runtimeAuthSeed.token || windowSeed.token);
};
var resolveAuthSeed = (options) => {
  const windowSeed = readWindowAuthSeed();
  const token = resolveAuthToken(options);
  const entraOid = safeText2(runtimeAuthSeed.entraOid || windowSeed.entraOid);
  const appCode = safeText2(runtimeAuthSeed.appCode || windowSeed.appCode || DEFAULT_APP_CODE) || DEFAULT_APP_CODE;
  const strictApiRoutes = typeof runtimeAuthSeed.strictApiRoutes === "boolean" ? runtimeAuthSeed.strictApiRoutes : windowSeed.strictApiRoutes === true;
  return {
    token,
    entraOid,
    appCode,
    strictApiRoutes
  };
};
var mapEntraContextCompany = (item) => {
  if (!item || typeof item !== "object") return null;
  const raw = item;
  const companyId = safeText2(raw.CompanyId ?? raw.companyId);
  if (!companyId) return null;
  return {
    companyId,
    isDefault: toFlagBool2(raw.IsDefault ?? raw.isDefault) === true,
    allowSelfManagement: toFlagBool2(raw.AllowSelfManagement ?? raw.allowSelfManagement) === true,
    crmUserId: safeText2(raw.CrmUserId ?? raw.crmUserId)
  };
};
var validateContextResponse = (response) => {
  const rawResponse = response;
  const isSuccess = toFlagBool2(rawResponse.Success ?? rawResponse.success);
  if (isSuccess === false) {
    throw new ApiFetchError(safeText2(rawResponse.Message ?? rawResponse.message) || "Could not load Entra context.");
  }
  const items = Array.isArray(rawResponse.Items) ? rawResponse.Items : Array.isArray(rawResponse.items) ? rawResponse.items : [];
  const first = items[0];
  const header = first?.Header ?? first?.header;
  if (!first || !header) {
    throw new ApiFetchError("Could not load Entra context.");
  }
  const axUserId = safeText2(header.AxUserId ?? header.axUserId);
  const defaultCompany = safeText2(header.DefaultCompany ?? header.defaultCompany);
  const defaultCurrencyCode = safeText2(header.DefaultCurrencyCode ?? header.defaultCurrencyCode);
  const companiesRaw = Array.isArray(first.Companies) ? first.Companies : Array.isArray(first.companies) ? first.companies : [];
  const companies = companiesRaw.map((item) => mapEntraContextCompany(item)).filter((item) => !!item);
  const fallbackCompany = safeText2(companies.find((item) => item.isDefault)?.companyId);
  const companyId = defaultCompany || fallbackCompany;
  const selectedCompany = companies.find((item) => safeText2(item.companyId) === companyId) || companies[0];
  const allowSelfManagement = selectedCompany?.allowSelfManagement === true;
  const crmUserId = safeText2(selectedCompany?.crmUserId);
  if (!axUserId || !companyId) {
    throw new ApiFetchError("Could not resolve Entra company context.");
  }
  return {
    token: "",
    companyId,
    axUserId,
    crmUserId,
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
  if (!safeText2(seed.entraOid) && fallbackCompanyId) {
    const fallbackContext = {
      token: seed.token,
      companyId: fallbackCompanyId,
      axUserId: "",
      crmUserId: "",
      defaultCurrencyCode: "",
      allowSelfManagement: globalThis.__IND_ALLOW_SELF_MANAGEMENT__ === true
    };
    cachedContext = fallbackContext;
    cachedContextKey = contextKey;
    return fallbackContext;
  }
  if (!safeText2(seed.entraOid)) {
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
var getExpenseApiContextSnapshot = async (options) => {
  const context = await ensureExpenseApiContext(options);
  return {
    companyId: safeText2(context.companyId).toUpperCase(),
    axUserId: safeText2(context.axUserId),
    crmUserId: safeText2(context.crmUserId),
    allowSelfManagement: context.allowSelfManagement === true
  };
};
var normalizeListPagedResponse2 = normalizeListPagedResponse;
var normalizeDetailPagedResponse2 = normalizeDetailPagedResponse;
var normalizeApiResponse2 = normalizeApiResponse;
var normalizeCurrencyPagedResponse2 = normalizeCurrencyPagedResponse;
var normalizeSubordinatesPagedResponse2 = normalizeSubordinatesPagedResponse;
var normalizeTicketListPagedResponse2 = normalizeTicketListPagedResponse;
var normalizeTicketDetailPagedResponse2 = normalizeTicketDetailPagedResponse;
var looksLikeHtmlDocument = (value) => {
  const raw = safeText2(value).toLowerCase();
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
    filter: safeText2(payload.filter),
    hojaGastosId: safeText2(payload.filter),
    billedMode: payload.billedMode ?? 2,
    fromDate: safeText2(payload.createdDateFrom),
    toDate: safeText2(payload.createdDateTo),
    projectId: safeText2(payload.projId),
    currencyCode: safeText2(payload.currencyCode),
    expenseSheetStatus: normalizeExpenseSheetListStatusFilter2(payload.expenseSheetStatus),
    page: Number.isFinite(payload.page) && payload.page > 0 ? payload.page : 1,
    pageSize: Number.isFinite(payload.pageSize) && payload.pageSize > 0 ? payload.pageSize : 50
  };
};
var mapLegacyListItemToApiListItem = (item) => {
  return {
    HojaGastosId: safeText2(item.hojaGastosId),
    Description: safeText2(item.description),
    ExpenseSheetStatus: toNullableNumber2(item.expenseSheetStatus),
    EstadoComentarios: safeText2(item.estadoComentarios) || null,
    UserId: safeText2(item.userId) || null,
    Voucher: safeText2(item.voucher),
    ProjId: safeText2(item.projId),
    CurrencyCode: safeText2(item.currencyCode),
    TotalAmount: toNullableNumber2(item.totalAmount ?? item.totalAmountMST),
    ExchRate: toNullableNumber2(item.exchRate),
    ExchangeRateMode: toNullableNumber2(item.exchangeRateMode),
    CreatedDate: safeText2(item.createdDate) || null
  };
};
var mapLegacyListResponse = (legacy, fallbackPage, fallbackPageSize) => {
  const legacyItems = Array.isArray(legacy?.items) ? legacy.items : [];
  const mappedItems = legacyItems.map((entry) => mapLegacyListItemToApiListItem(entry));
  return {
    Success: legacy.success !== false,
    Message: safeText2(legacy.message) || "OK",
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
    token: safeText2(seed.token || runtimeAuthSeed.token),
    entraOid: safeText2(seed.entraOid || runtimeAuthSeed.entraOid),
    appCode: safeText2(seed.appCode || runtimeAuthSeed.appCode || DEFAULT_APP_CODE),
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
  const { axUserIdOverride, ...baseOptions } = options || {};
  const rawCreatedDateFrom = safeText2(payload?.createdDateFrom);
  const rawCreatedDateTo = safeText2(payload?.createdDateTo);
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
  const context = await ensureExpenseApiContext(baseOptions);
  const listHeaders = sanitizeHeaders(buildExpenseHeaders(context, baseOptions, true, false));
  const normalizedOverrideAxUserId = normalizeAxUserIdHeader(axUserIdOverride);
  const resolvedAxUserId = safeText2(normalizedOverrideAxUserId || context.axUserId);
  if (resolvedAxUserId) {
    listHeaders["X-IND-AxUserId"] = resolvedAxUserId;
  } else {
    removeHeaderValue(listHeaders, "X-IND-AxUserId");
  }
  try {
    const response = await fetchJson("/api/crm/expensesheets/list", {
      ...baseOptions,
      method: "POST",
      headers: listHeaders,
      body: JSON.stringify(safePayload)
    });
    return normalizeListPagedResponse2(response);
  } catch (error) {
    if (!shouldUseLegacyFallback(error)) {
      throw error;
    }
    const legacyResponse = await fetchJson("/Gastos/ListExpenseSheets", {
      ...baseOptions,
      method: "POST",
      headers: {
        ...sanitizeHeaders(baseOptions?.headers),
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
  const companyId = safeText2(context?.companyId || readWindowSelectedCompany()).toUpperCase();
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
      const fallbackItems = sourceItems.map((entry) => safeText2(entry.currencyCode).toUpperCase()).filter((code) => !!code).filter((code) => {
        if (seenCodes.has(code)) return false;
        seenCodes.add(code);
        return true;
      }).map((code) => ({
        CurrencyCode: code,
        CurrencyCodeISO: code
      }));
      const fallbackResponse = {
        Success: legacyListResponse.success !== false,
        Message: safeText2(legacyListResponse.message) || "OK",
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
var getExpenseSheetSubordinates = async (options) => {
  const context = await ensureExpenseApiContext(options);
  const headers = sanitizeHeaders(buildExpenseHeaders(context, options, false, false));
  const contextAxUserId = safeText2(context.axUserId);
  if (contextAxUserId) {
    headers["X-IND-AxUserId"] = contextAxUserId;
  }
  const response = await fetchJson("/api/crm/expensesheets/subordinates", {
    ...options,
    method: "GET",
    headers
  });
  return normalizeSubordinatesPagedResponse2(response);
};
var getExpenseSheetDefaultCurrencyCode = async (options) => {
  try {
    const context = await ensureExpenseApiContext(options);
    return safeText2(context.defaultCurrencyCode).toUpperCase();
  } catch {
    return "";
  }
};
var getExchangeRate = async (baseCurrency, targetCurrency, date, options) => {
  const token = resolveAuthToken(options);
  const normalizedBaseCurrency = safeText2(baseCurrency).toUpperCase();
  const normalizedTargetCurrency = safeText2(targetCurrency).toUpperCase();
  const normalizedDate = safeText2(date);
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
var getExchangeRatePublicDirect = async (baseCurrency, targetCurrency, date, options) => {
  const token = resolveAuthToken(options);
  const normalizedBaseCurrency = safeText2(baseCurrency).toUpperCase();
  const normalizedTargetCurrency = safeText2(targetCurrency).toUpperCase();
  const normalizedDate = safeText2(date);
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
  return fetchJson(`/api/system/exchange-rate/public-direct?${query.toString()}`, {
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
    return !safeText2(line.transDate) || !Number.isInteger(Number(line.typeValue)) || Number(line.typeValue) <= 0 || !isPositiveNumber2(line.qty) || !isPositiveNumber2(line.price);
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
    if (!safeText2(payload.description) || !safeText2(payload.currencyCode) || lines.length < 1) {
      throw new ApiFetchError("Invalid create payload for mode 0.");
    }
  }
  if (mode === 1) {
    if (!safeText2(payload.description) || !safeText2(payload.currencyCode)) {
      throw new ApiFetchError("Invalid create payload for mode 1.");
    }
    if (lines.length > 0) {
      throw new ApiFetchError("Mode 1 requires lines to be null or empty.");
    }
  }
  if (mode === 2) {
    if (!safeText2(payload.existingHojaGastosId) || lines.length < 1) {
      throw new ApiFetchError("Invalid create payload for mode 2.");
    }
  }
  const normalizedPayload = {
    ...payload,
    mode,
    existingHojaGastosId: safeText2(payload.existingHojaGastosId) || void 0,
    description: safeText2(payload.description) || void 0,
    currencyCode: safeText2(payload.currencyCode) || void 0,
    projId: safeText2(payload.projId) || void 0,
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
  const safeTicketUrl = safeText2(ticketUrlFile);
  if (ticketImage instanceof File) {
    form.append("ticketImage", ticketImage, safeText2(ticketImage.name) || "ticket.jpg");
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
  const rawTransDate = safeText2(payload?.transDate);
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
  const { axUserIdOverride, ...baseOptions } = options || {};
  const context = await ensureExpenseApiContext(baseOptions);
  const rawCreatedDateFrom = safeText2(payload?.createdDateFrom);
  const rawCreatedDateTo = safeText2(payload?.createdDateTo);
  const createdDateFrom = normalizeTicketListDate2(rawCreatedDateFrom);
  const createdDateTo = normalizeTicketListDate2(rawCreatedDateTo);
  if (rawCreatedDateFrom && !createdDateFrom) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }
  if (rawCreatedDateTo && !createdDateTo) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }
  const preferredSearchKey = safeText2(payload?.searchKey || payload?.filter);
  const legacyFilter = safeText2(payload?.filter || preferredSearchKey);
  const safePayload = {
    page: Number.isFinite(payload?.page) && payload.page > 0 ? Math.floor(payload.page) : 1,
    pageSize: Number.isFinite(payload?.pageSize) && payload.pageSize > 0 ? Math.floor(payload.pageSize) : 50,
    createdDateFrom: createdDateFrom || void 0,
    createdDateTo: createdDateTo || void 0,
    searchKey: preferredSearchKey || void 0,
    filter: legacyFilter || void 0,
    status: normalizeOptionalTicketStatus2(payload?.status),
    currencyCode: safeText2(payload?.currencyCode).toUpperCase() || void 0,
    gastoType: normalizeTicketListGastoType2(payload?.gastoType),
    processedByAI: normalizeOptionalTicketProcessedByAI2(payload?.processedByAI)
  };
  const response = await fetchJson(
    "/api/crm/expensesheets/tickets/list",
    {
      ...baseOptions,
      method: "POST",
      headers: (() => {
        const headers = sanitizeHeaders(buildExpenseHeaders(context, baseOptions, true, false));
        const normalizedOverrideAxUserId = normalizeAxUserIdHeader(axUserIdOverride);
        const resolvedAxUserId = safeText2(normalizedOverrideAxUserId || context.axUserId);
        if (resolvedAxUserId) {
          headers["X-IND-AxUserId"] = resolvedAxUserId;
        } else {
          removeHeaderValue(headers, "X-IND-AxUserId");
        }
        return headers;
      })(),
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
  const safeUrlFile = safeText2(urlFile);
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
  const rawTransDate = safeText2(payload?.transDate);
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
var createExpenseSheetTicketLine = async (fileId, payload, options) => {
  if (!safeText2(payload?.description) || !isPositiveNumber2(payload?.qty) || !isPositiveNumber2(payload?.price)) {
    throw new ApiFetchError("description, qty > 0 and price > 0 are required.");
  }
  const context = await ensureExpenseApiContext(options);
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  const response = await fetchJson(`/api/crm/expensesheets/tickets/${safeFileId}/lines`, {
    ...options,
    method: "POST",
    headers: buildExpenseHeaders(context, options, true),
    body: JSON.stringify(payload)
  });
  return normalizeApiResponse2(response);
};
var updateExpenseSheetTicketLine = async (fileId, lineRecId, payload, options) => {
  if (!safeText2(payload?.description) || !isPositiveNumber2(payload?.qty) || !isPositiveNumber2(payload?.price)) {
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
  const safeExtension = safeText2(extension).replace(/^\./, "");
  const query = new URLSearchParams();
  if (safeExtension) {
    query.set("extension", safeExtension);
  }
  const suffix = query.toString();
  const url = suffix ? `/api/crm/expensesheets/tickets/${safeFileId}/file?${suffix}` : `/api/crm/expensesheets/tickets/${safeFileId}/file`;
  const form = new FormData();
  if (file instanceof File) {
    form.append("file", file, safeText2(file.name) || `ticket.${safeExtension || "jpg"}`);
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

export {
  getExpenseApiContextSnapshot,
  configureExpenseApiAuth,
  mapExpenseSheetListItemToCard2 as mapExpenseSheetListItemToCard,
  mapExpenseSheetHeader2 as mapExpenseSheetHeader,
  mapExpenseSheetLine2 as mapExpenseSheetLine,
  fetchExpenseSheetList,
  fetchExpenseSheetDetail,
  getExpenseSheetCurrencies,
  getExpenseSheetSubordinates,
  getExpenseSheetDefaultCurrencyCode,
  getExchangeRate,
  getExchangeRatePublicDirect,
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
  createExpenseSheetTicketLine,
  updateExpenseSheetTicketLine,
  deleteExpenseSheetTicketLine,
  uploadExpenseSheetTicketFile,
  deleteExpenseSheetTicketFile,
  fetchExpenseProjects
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlQXBpUmVzcG9uc2VOb3JtYWxpemVycy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VBcGlNYXBwZXJzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZUFwaS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXHVGRUZGaW1wb3J0IHR5cGUge1xuICBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0byxcbiAgRXhwZW5zZVNoZWV0RGV0YWlsRHRvLFxuICBFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0byxcbiAgRXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvLFxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0byxcbiAgRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8sXG4gIEluZEFwaVJlc3BvbnNlLFxuICBJbmRQYWdlZFJlc3BvbnNlLFxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCwgdG9OdWxsYWJsZUJvb2wsIHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlLCB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZSB9IGZyb20gXCIuL2V4cGVuc2VBcGlUcmFuc2Zvcm1zLnRzXCI7XG5pbXBvcnQgeyBub3JtYWxpemVFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZXMgfSBmcm9tIFwiLi9leHBlbnNlU3Vib3JkaW5hdGVNYXBwZXIudHNcIjtcblxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz5cbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+ID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5yZXNwb25zZSxcbiAgICBJdGVtczogQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXSxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXREZXRhaWxEdG8+XG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldERldGFpbER0bz4gPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLnJlc3BvbnNlLFxuICAgIEl0ZW1zOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUFwaVJlc3BvbnNlID0gPFQ+KHJlc3BvbnNlOiBJbmRBcGlSZXNwb25zZTxUPik6IEluZEFwaVJlc3BvbnNlPFQ+ID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5yZXNwb25zZSxcbiAgICBFcnJvcnM6IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/LkVycm9ycykgPyByZXNwb25zZS5FcnJvcnMgOiByZXNwb25zZT8uRXJyb3JzID8/IG51bGwsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz5cbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+ID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5yZXNwb25zZSxcbiAgICBJdGVtczogQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXSxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTx1bmtub3duPlxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0bz4gPT4ge1xuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBub3JtYWxpemVFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZXMocmVzcG9uc2U/Lkl0ZW1zKTtcblxuICByZXR1cm4ge1xuICAgIC4uLnJlc3BvbnNlLFxuICAgIEl0ZW1zOiBub3JtYWxpemVkSXRlbXMsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2UgPSAoXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvPlxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz4gPT4ge1xuICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XG4gIGNvbnN0IG5vcm1hbGl6ZWRJdGVtcyA9IGl0ZW1zLm1hcCgoaXRlbSkgPT4gKHtcbiAgICAuLi5pdGVtLFxuICAgIFN0YXR1czogdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGUoXG4gICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LlN0YXR1cyA/P1xuICAgICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LnN0YXR1c1xuICAgICksXG4gICAgUHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woXG4gICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8uUHJvY2Vzc2VkQnlBSSA/P1xuICAgICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8ucHJvY2Vzc2VkQnlBSVxuICAgICksXG4gICAgSG9qYUdhc3Rvc0lkRGlzcGxheTogc2FmZVRleHQoXG4gICAgICAoaXRlbSBhcyB7IEhvamFHYXN0b3NJZERpc3BsYXk/OiB1bmtub3duOyBob2phR2FzdG9zSWREaXNwbGF5PzogdW5rbm93biB9KT8uSG9qYUdhc3Rvc0lkRGlzcGxheSA/P1xuICAgICAgICAoaXRlbSBhcyB7IEhvamFHYXN0b3NJZERpc3BsYXk/OiB1bmtub3duOyBob2phR2FzdG9zSWREaXNwbGF5PzogdW5rbm93biB9KT8uaG9qYUdhc3Rvc0lkRGlzcGxheVxuICAgICksXG4gICAgR2FzdG9UeXBlOiB0b051bGxhYmxlR2FzdG9UeXBlQ29kZShcbiAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uR2FzdG9UeXBlID8/XG4gICAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uZ2FzdG9UeXBlXG4gICAgKSxcbiAgfSkpO1xuXG4gIHJldHVybiB7XG4gICAgLi4ucmVzcG9uc2UsXG4gICAgSXRlbXM6IG5vcm1hbGl6ZWRJdGVtcyxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXREZXRhaWxEdG8+XG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldERldGFpbER0bz4gPT4ge1xuICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XG4gIGNvbnN0IG5vcm1hbGl6ZWRJdGVtcyA9IGl0ZW1zLm1hcCgoaXRlbSkgPT4gKHtcbiAgICAuLi5pdGVtLFxuICAgIFN0YXR1czogdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGUoXG4gICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LlN0YXR1cyA/P1xuICAgICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LnN0YXR1c1xuICAgICksXG4gICAgUHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woXG4gICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8uUHJvY2Vzc2VkQnlBSSA/P1xuICAgICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8ucHJvY2Vzc2VkQnlBSVxuICAgICksXG4gICAgSG9qYUdhc3Rvc0lkRGlzcGxheTogc2FmZVRleHQoXG4gICAgICAoaXRlbSBhcyB7IEhvamFHYXN0b3NJZERpc3BsYXk/OiB1bmtub3duOyBob2phR2FzdG9zSWREaXNwbGF5PzogdW5rbm93biB9KT8uSG9qYUdhc3Rvc0lkRGlzcGxheSA/P1xuICAgICAgICAoaXRlbSBhcyB7IEhvamFHYXN0b3NJZERpc3BsYXk/OiB1bmtub3duOyBob2phR2FzdG9zSWREaXNwbGF5PzogdW5rbm93biB9KT8uaG9qYUdhc3Rvc0lkRGlzcGxheVxuICAgICksXG4gICAgR2FzdG9UeXBlOiB0b051bGxhYmxlR2FzdG9UeXBlQ29kZShcbiAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uR2FzdG9UeXBlID8/XG4gICAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uZ2FzdG9UeXBlXG4gICAgKSxcbiAgICBMaW5lczogQXJyYXkuaXNBcnJheShpdGVtPy5MaW5lcykgPyBpdGVtLkxpbmVzIDogW10sXG4gIH0pKTtcblxuICByZXR1cm4ge1xuICAgIC4uLnJlc3BvbnNlLFxuICAgIEl0ZW1zOiBub3JtYWxpemVkSXRlbXMsXG4gIH07XG59O1xyXG4iLCAiXHVGRUZGaW1wb3J0IHR5cGUge1xuICBFeHBlbnNlU2hlZXRDYXJkLFxuICBFeHBlbnNlU2hlZXREZXRhaWxEdG8sXG4gIEV4cGVuc2VTaGVldEhlYWRlcixcbiAgRXhwZW5zZVNoZWV0TGluZSxcbiAgRXhwZW5zZVNoZWV0TGluZUR0byxcbiAgRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8sXG59IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IHNhZmVUZXh0LCB0b051bGxhYmxlQm9vbCwgdG9OdWxsYWJsZU51bWJlciB9IGZyb20gXCIuL2V4cGVuc2VBcGlUcmFuc2Zvcm1zLnRzXCI7XG5cbnR5cGUgRXhwZW5zZVdpbmRvd1J1bnRpbWUgPSB7XG4gIF9fRVhQRU5TRV9HQVNUT19UWVBFU19fPzogQXJyYXk8e1xuICAgIHZhbHVlPzogdW5rbm93bjtcbiAgICBWYWx1ZT86IHVua25vd247XG4gICAgdGV4dD86IHVua25vd247XG4gICAgVGV4dD86IHVua25vd247XG4gIH0+O1xufTtcblxudHlwZSBFeHBlbnNlR2FzdG9UeXBlRW50cnkgPSBOb25OdWxsYWJsZTxFeHBlbnNlV2luZG93UnVudGltZVtcIl9fRVhQRU5TRV9HQVNUT19UWVBFU19fXCJdPltudW1iZXJdO1xuXG5jb25zdCByZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUgPSAoKTogRXhwZW5zZVdpbmRvd1J1bnRpbWUgPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHt9O1xuICByZXR1cm4gd2luZG93IGFzIHVua25vd24gYXMgRXhwZW5zZVdpbmRvd1J1bnRpbWU7XG59O1xuXG5jb25zdCByZXNvbHZlVHlwZUxhYmVsID0gKHR5cGVWYWx1ZUNvZGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGlmICghdHlwZVZhbHVlQ29kZSB8fCB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHR5cGVWYWx1ZUNvZGU7XG4gIH1cblxuICBjb25zdCByYXdDYXRhbG9nU291cmNlID0gcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lKCkuX19FWFBFTlNFX0dBU1RPX1RZUEVTX187XG4gIGNvbnN0IHJhd0NhdGFsb2cgPSBBcnJheS5pc0FycmF5KHJhd0NhdGFsb2dTb3VyY2UpID8gcmF3Q2F0YWxvZ1NvdXJjZSA6IFtdO1xuICBjb25zdCBtYXRjaCA9IHJhd0NhdGFsb2cuZmluZCgoZW50cnk6IEV4cGVuc2VHYXN0b1R5cGVFbnRyeSkgPT4ge1xuICAgIGNvbnN0IGVudHJ5Q29kZSA9IHNhZmVUZXh0KGVudHJ5Py52YWx1ZSB8fCBlbnRyeT8uVmFsdWUpO1xuICAgIHJldHVybiBlbnRyeUNvZGUgPT09IHR5cGVWYWx1ZUNvZGU7XG4gIH0pO1xuXG4gIHJldHVybiBzYWZlVGV4dChtYXRjaD8udGV4dCB8fCBtYXRjaD8uVGV4dCkgfHwgdHlwZVZhbHVlQ29kZTtcbn07XG5cbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9saXN0IGl0ZW0gY29udHJhY3QgdG8gbGlzdCBjYXJkIFVJIG1vZGVsLlxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkID0gKGl0ZW06IEV4cGVuc2VTaGVldExpc3RJdGVtRHRvKTogRXhwZW5zZVNoZWV0Q2FyZCA9PiB7XG4gIHJldHVybiB7XG4gICAgaG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChpdGVtLkhvamFHYXN0b3NJZCksXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KGl0ZW0uRGVzY3JpcHRpb24pLFxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogdG9OdWxsYWJsZU51bWJlcihpdGVtLkV4cGVuc2VTaGVldFN0YXR1cyksXG4gICAgZXN0YWRvQ29tZW50YXJpb3M6IHNhZmVUZXh0KGl0ZW0uRXN0YWRvQ29tZW50YXJpb3MpIHx8IG51bGwsXG4gICAgdXNlcklkOiBzYWZlVGV4dChpdGVtLlVzZXJJZCksXG4gICAgdm91Y2hlcjogc2FmZVRleHQoaXRlbS5Wb3VjaGVyKSxcbiAgICBwcm9qSWQ6IHNhZmVUZXh0KGl0ZW0uUHJvaklkKSxcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGl0ZW0uQ3VycmVuY3lDb2RlKSxcbiAgICB0b3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihpdGVtLlRvdGFsQW1vdW50KSxcbiAgICBleGNoUmF0ZTogdG9OdWxsYWJsZU51bWJlcihpdGVtLkV4Y2hSYXRlKSxcbiAgICBleGNoYW5nZVJhdGVNb2RlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uRXhjaGFuZ2VSYXRlTW9kZSksXG4gICAgY3JlYXRlZERhdGU6IHNhZmVUZXh0KGl0ZW0uQ3JlYXRlZERhdGUpLFxuICB9O1xufTtcblxuLy8gTWFwcyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9IGhlYWRlciBjb250cmFjdCB0byBVSSBtb2RlbC5cbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRIZWFkZXIgPSAoc2hlZXQ6IEV4cGVuc2VTaGVldERldGFpbER0byk6IEV4cGVuc2VTaGVldEhlYWRlciA9PiB7XG4gIHJldHVybiB7XG4gICAgaG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChzaGVldC5Ib2phR2FzdG9zSWQpLFxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChzaGVldC5EZXNjcmlwdGlvbiksXG4gICAgdXNlcklkOiBzYWZlVGV4dChzaGVldC5Vc2VySWQpLFxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogdG9OdWxsYWJsZU51bWJlcihzaGVldC5FeHBlbnNlU2hlZXRTdGF0dXMpLFxuICAgIGVzdGFkb0NvbWVudGFyaW9zOiBzYWZlVGV4dChzaGVldC5Fc3RhZG9Db21lbnRhcmlvcykgfHwgbnVsbCxcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KHNoZWV0LkN1cnJlbmN5Q29kZSksXG4gICAgdG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoc2hlZXQuVG90YWxBbW91bnQpLFxuICAgIGV4Y2hSYXRlOiBzYWZlVGV4dChzaGVldC5FeGNoUmF0ZSksXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogdG9OdWxsYWJsZU51bWJlcihzaGVldC5FeGNoYW5nZVJhdGVNb2RlKSxcbiAgICBwcm9qSWQ6IHNhZmVUZXh0KHNoZWV0LlByb2pJZCksXG4gICAgdm91Y2hlcjogc2FmZVRleHQoc2hlZXQuVm91Y2hlciksXG4gICAgY3JlYXRlZERhdGU6IHNhZmVUZXh0KHNoZWV0LkNyZWF0ZWREYXRlKSxcbiAgfTtcbn07XG5cbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfSBsaW5lIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldExpbmUgPSAobGluZTogRXhwZW5zZVNoZWV0TGluZUR0byk6IEV4cGVuc2VTaGVldExpbmUgPT4ge1xuICBjb25zdCB0eXBlVmFsdWVDb2RlID0gc2FmZVRleHQobGluZS5UeXBlVmFsdWUpO1xuICBjb25zdCBsZWdhY3lQcmljZSA9IChsaW5lIGFzIHsgcHJpY2U/OiB1bmtub3duIH0pLnByaWNlO1xuICBjb25zdCBsZWdhY3lGaWxlSWQgPSAobGluZSBhcyB7IGZpbGVJZD86IHVua25vd24gfSkuZmlsZUlkO1xuXG4gIHJldHVybiB7XG4gICAgbGluZVJlY0lkOiBzYWZlVGV4dChsaW5lLlJlY0lkKSxcbiAgICB0cmFuc0RhdGU6IHNhZmVUZXh0KGxpbmUuVHJhbnNEYXRlKSxcbiAgICB0eXBlVmFsdWVDb2RlLFxuICAgIHR5cGVWYWx1ZTogcmVzb2x2ZVR5cGVMYWJlbCh0eXBlVmFsdWVDb2RlKSxcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQobGluZS5EZXNjcmlwdGlvbiksXG4gICAgaW50ZXJuYWNpb25hbDogdG9OdWxsYWJsZUJvb2wobGluZS5JbnRlcm5hY2lvbmFsKSxcbiAgICBmaWxlSWQ6IHNhZmVUZXh0KGxpbmUuRmlsZUlkID8/IGxlZ2FjeUZpbGVJZCksXG4gICAgdGlja2V0OiB0b051bGxhYmxlQm9vbChsaW5lLlRpY2tldCksXG4gICAgcHJpY2U6IHRvTnVsbGFibGVOdW1iZXIobGluZS5QcmljZSA/PyBsZWdhY3lQcmljZSksXG4gICAgcXR5OiB0b051bGxhYmxlTnVtYmVyKGxpbmUuUXR5KSxcbiAgICBhbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIobGluZS5BbW91bnQpLFxuICAgIHByb2pJZDogc2FmZVRleHQobGluZS5Qcm9qSWQpLFxuICAgIGluZEF0dGFjaEZpbGVzOiBzYWZlVGV4dChsaW5lLkluZEF0dGFjaEZpbGVzKSxcbiAgfTtcbn07XHJcbiIsICJpbXBvcnQgeyBBcGlGZXRjaEVycm9yLCBmZXRjaEpzb24sIGdldENzcmZUb2tlbiwgdHlwZSBBcGlGZXRjaE9wdGlvbnMgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHR5cGUge1xuICBFbnRyYUNvbnRleHREdG8sXG4gIEVudHJhQ29udGV4dFJlcXVlc3QsXG4gIEV4Y2hhbmdlUmF0ZUR0byxcbiAgRnVlbFByaWNlS21EdG8sXG4gIEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvLFxuICBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRDcmVhdGVSZXNwb25zZURhdGEsXG4gIEV4cGVuc2VTaGVldERldGFpbER0byxcbiAgRXhwZW5zZVNoZWV0RHJhZnRSZXNwb25zZSxcbiAgRXhwZW5zZVNoZWV0SGVhZGVyVXBkYXRlUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0TGluZUR0byxcbiAgRXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXNwb25zZURhdGEsXG4gIEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byxcbiAgRXhwZW5zZVNoZWV0VGlja2V0Q3JlYXRlUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvLFxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5lUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8sXG4gIEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldFRpY2tldFVwZGF0ZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvLFxuICBJbmRBcGlSZXNwb25zZSxcbiAgSW5kUGFnZWRSZXNwb25zZSxcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHtcbiAgaXNOb25OZWdhdGl2ZU51bWJlciBhcyBpc05vbk5lZ2F0aXZlTnVtYmVyVHJhbnNmb3JtLFxuICBpc1Bvc2l0aXZlTnVtYmVyIGFzIGlzUG9zaXRpdmVOdW1iZXJUcmFuc2Zvcm0sXG4gIG5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXIgYXMgbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlclRyYW5zZm9ybSxcbiAgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUgYXMgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGVUcmFuc2Zvcm0sXG4gIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSSBhcyBub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUlUcmFuc2Zvcm0sXG4gIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzIGFzIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzVHJhbnNmb3JtLFxuICBub3JtYWxpemVPcHRpb25hbEFwaURhdGUgYXMgbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlVHJhbnNmb3JtLFxuICBub3JtYWxpemVSZXF1aXJlZEFwaURhdGUgYXMgbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlVHJhbnNmb3JtLFxuICBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZSBhcyBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZVRyYW5zZm9ybSxcbiAgbm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZSBhcyBub3JtYWxpemVUaWNrZXRMaXN0R2FzdG9UeXBlVHJhbnNmb3JtLFxuICBzYWZlVGV4dCBhcyBzYWZlVGV4dFRyYW5zZm9ybSxcbiAgdG9GbGFnQm9vbCBhcyB0b0ZsYWdCb29sVHJhbnNmb3JtLFxuICB0b051bGxhYmxlQm9vbCBhcyB0b051bGxhYmxlQm9vbFRyYW5zZm9ybSxcbiAgdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUgYXMgdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGVUcmFuc2Zvcm0sXG4gIHRvTnVsbGFibGVOdW1iZXIgYXMgdG9OdWxsYWJsZU51bWJlclRyYW5zZm9ybSxcbiAgdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGUgYXMgdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGVUcmFuc2Zvcm0sXG59IGZyb20gXCIuL2V4cGVuc2VBcGlUcmFuc2Zvcm1zLnRzXCI7XG5pbXBvcnQge1xuICBub3JtYWxpemVBcGlSZXNwb25zZSBhcyBub3JtYWxpemVBcGlSZXNwb25zZVRyYW5zZm9ybSxcbiAgbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlIGFzIG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcbiAgbm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxuICBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcbiAgbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxuICBub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlIGFzIG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm0sXG4gIG5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlIGFzIG5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxufSBmcm9tIFwiLi9leHBlbnNlQXBpUmVzcG9uc2VOb3JtYWxpemVycy50c1wiO1xuaW1wb3J0IHtcbiAgbWFwRXhwZW5zZVNoZWV0SGVhZGVyIGFzIG1hcEV4cGVuc2VTaGVldEhlYWRlckNvcmUsXG4gIG1hcEV4cGVuc2VTaGVldExpbmUgYXMgbWFwRXhwZW5zZVNoZWV0TGluZUNvcmUsXG4gIG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkIGFzIG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkQ29yZSxcbn0gZnJvbSBcIi4vZXhwZW5zZUFwaU1hcHBlcnMudHNcIjtcbmltcG9ydCB7IEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UgfSBmcm9tIFwiLi9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlIH0gZnJvbSBcIi4vZXhwZW5zZUFjdGluZ1VzZXIudHNcIjtcblxudHlwZSBQcm9qZWN0RHJvcGRvd25SZXNwb25zZSA9IHtcbiAgdG90YWw/OiBudW1iZXI7XG4gIGl0ZW1zPzogQXJyYXk8eyB2YWx1ZT86IHN0cmluZzsgdGV4dD86IHN0cmluZyB9Pjtcbn07XG5cbnR5cGUgTGVnYWN5RXhwZW5zZUxpc3RJdGVtID0ge1xuICBob2phR2FzdG9zSWQ/OiB1bmtub3duO1xuICBkZXNjcmlwdGlvbj86IHVua25vd247XG4gIGVzdGFkb0NvbWVudGFyaW9zPzogdW5rbm93bjtcbiAgdm91Y2hlcj86IHVua25vd247XG4gIHByb2pJZD86IHVua25vd247XG4gIGN1cnJlbmN5Q29kZT86IHVua25vd247XG4gIHRvdGFsQW1vdW50PzogdW5rbm93bjtcbiAgdG90YWxBbW91bnRNU1Q/OiB1bmtub3duO1xuICBleGNoUmF0ZT86IHVua25vd247XG4gIHVzZXJJZD86IHVua25vd247XG4gIGV4Y2hhbmdlUmF0ZU1vZGU/OiB1bmtub3duO1xuICBleHBlbnNlU2hlZXRTdGF0dXM/OiB1bmtub3duO1xuICBjcmVhdGVkRGF0ZT86IHVua25vd247XG59O1xuXG50eXBlIExlZ2FjeUV4cGVuc2VMaXN0UmVzcG9uc2UgPSB7XG4gIHN1Y2Nlc3M/OiBib29sZWFuO1xuICBtZXNzYWdlPzogc3RyaW5nO1xuICB0b3RhbD86IG51bWJlcjtcbiAgcGFnZT86IG51bWJlcjtcbiAgcGFnZVNpemU/OiBudW1iZXI7XG4gIGl0ZW1zPzogTGVnYWN5RXhwZW5zZUxpc3RJdGVtW107XG59O1xuXG50eXBlIEV4cGVuc2VBcGlDb250ZXh0ID0ge1xuICB0b2tlbjogc3RyaW5nO1xuICBjb21wYW55SWQ6IHN0cmluZztcbiAgYXhVc2VySWQ6IHN0cmluZztcbiAgY3JtVXNlcklkOiBzdHJpbmc7XG4gIGRlZmF1bHRDdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCB0eXBlIEV4cGVuc2VBcGlDb250ZXh0U25hcHNob3QgPSB7XG4gIGNvbXBhbnlJZDogc3RyaW5nO1xuICBheFVzZXJJZDogc3RyaW5nO1xuICBjcm1Vc2VySWQ6IHN0cmluZztcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcbn07XG5cbnR5cGUgRXhwZW5zZUFwaUF1dGhTZWVkID0ge1xuICB0b2tlbjogc3RyaW5nO1xuICBlbnRyYU9pZDogc3RyaW5nO1xuICBhcHBDb2RlOiBzdHJpbmc7XG4gIHN0cmljdEFwaVJvdXRlczogYm9vbGVhbjtcbn07XG5cbnR5cGUgRXhwZW5zZVdpbmRvd1J1bnRpbWUgPSB7XG4gIF9fSU5EX0FQSV9UT0tFTl9fPzogc3RyaW5nO1xuICBfX0lORF9FTlRSQV9PSURfXz86IHN0cmluZztcbiAgX19JTkRfQVBQX0NPREVfXz86IHN0cmluZztcbiAgX19JTkRfU0VMRUNURURfQ09NUEFOWV9fPzogc3RyaW5nO1xuICBfX0lORF9FWFBFTlNFX1NUUklDVF9BUElfXz86IGJvb2xlYW4gfCBzdHJpbmc7XG4gIF9fRVhQRU5TRV9HQVNUT19UWVBFU19fPzogQXJyYXk8e1xuICAgIHZhbHVlPzogdW5rbm93bjtcbiAgICBWYWx1ZT86IHVua25vd247XG4gICAgdGV4dD86IHVua25vd247XG4gICAgVGV4dD86IHVua25vd247XG4gIH0+O1xufTtcblxuY29uc3QgREVGQVVMVF9BUFBfQ09ERSA9IFwiQ1JNXCI7XG5jb25zdCBKU09OX0hFQURFUlM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxufTtcblxubGV0IHJ1bnRpbWVBdXRoU2VlZDogUGFydGlhbDxFeHBlbnNlQXBpQXV0aFNlZWQ+ID0ge307XG5sZXQgY2FjaGVkQ29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQgfCBudWxsID0gbnVsbDtcbmxldCBjYWNoZWRDb250ZXh0S2V5ID0gXCJcIjtcbmxldCBjb250ZXh0UHJvbWlzZTogUHJvbWlzZTxFeHBlbnNlQXBpQ29udGV4dD4gfCBudWxsID0gbnVsbDtcbmNvbnN0IGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzID0gbmV3IE1hcDxzdHJpbmcsIEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+PigpO1xuY29uc3QgcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMgPSBuZXcgTWFwPHN0cmluZywgUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj4+KCk7XG5cbmNvbnN0IHNhZmVUZXh0ID0gc2FmZVRleHRUcmFuc2Zvcm07XG5cbmNvbnN0IHRyeVBhcnNlSnNvblJlY29yZCA9IChyYXc6IHN0cmluZyk6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgbnVsbCA9PiB7XG4gIGlmICghcmF3IHx8ICFyYXcudHJpbSgpKSByZXR1cm4gbnVsbDtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKHJhdyk7XG4gICAgcmV0dXJuIHBhcnNlZCAmJiB0eXBlb2YgcGFyc2VkID09PSBcIm9iamVjdFwiID8gKHBhcnNlZCBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgOiBudWxsO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuY29uc3QgcmVhZEFwaU1lc3NhZ2UgPSAocmF3OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBwYXlsb2FkID0gdHJ5UGFyc2VKc29uUmVjb3JkKHJhdyk7XG4gIGlmICghcGF5bG9hZCkgcmV0dXJuIFwiXCI7XG5cbiAgY29uc3QgdmFsdWUgPSBwYXlsb2FkLk1lc3NhZ2UgPz8gcGF5bG9hZC5tZXNzYWdlO1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiID8gdmFsdWUudHJpbSgpIDogXCJcIjtcbn07XG5cbmNvbnN0IHRvTnVsbGFibGVOdW1iZXIgPSB0b051bGxhYmxlTnVtYmVyVHJhbnNmb3JtO1xuY29uc3QgaXNOb25OZWdhdGl2ZU51bWJlciA9IGlzTm9uTmVnYXRpdmVOdW1iZXJUcmFuc2Zvcm07XG5jb25zdCBpc1Bvc2l0aXZlTnVtYmVyID0gaXNQb3NpdGl2ZU51bWJlclRyYW5zZm9ybTtcbmNvbnN0IHRvTnVsbGFibGVUaWNrZXRTdGF0dXNDb2RlID0gdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGVUcmFuc2Zvcm07XG5jb25zdCB0b051bGxhYmxlR2FzdG9UeXBlQ29kZSA9IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlVHJhbnNmb3JtO1xuY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUgPSBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZVRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpc3RHYXN0b1R5cGUgPSBub3JtYWxpemVUaWNrZXRMaXN0R2FzdG9UeXBlVHJhbnNmb3JtO1xuY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRTdGF0dXMgPSBub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1c1RyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZVRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZSA9IG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZVRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpc3REYXRlID0gbm9ybWFsaXplVGlja2V0TGlzdERhdGVUcmFuc2Zvcm07XG5jb25zdCB0b051bGxhYmxlQm9vbCA9IHRvTnVsbGFibGVCb29sVHJhbnNmb3JtO1xuY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRQcm9jZXNzZWRCeUFJID0gbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRQcm9jZXNzZWRCeUFJVHJhbnNmb3JtO1xuY29uc3Qgbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlciA9IG5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXJUcmFuc2Zvcm07XG5jb25zdCB0b0ZsYWdCb29sID0gdG9GbGFnQm9vbFRyYW5zZm9ybTtcblxuY29uc3QgcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lID0gKCk6IEV4cGVuc2VXaW5kb3dSdW50aW1lID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiB7fTtcbiAgcmV0dXJuIHdpbmRvdyBhcyB1bmtub3duIGFzIEV4cGVuc2VXaW5kb3dSdW50aW1lO1xufTtcblxuY29uc3Qgc2FuaXRpemVIZWFkZXJzID0gKGhlYWRlcnM6IEhlYWRlcnNJbml0IHwgdW5kZWZpbmVkKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9PiB7XG4gIGlmICghaGVhZGVycykgcmV0dXJuIHt9O1xuXG4gIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgIGNvbnN0IHJlc3VsdDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICAgIGhlYWRlcnMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcbiAgICByZXR1cm4gaGVhZGVycy5yZWR1Y2U8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4oKGFjYywgW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICBhY2NbU3RyaW5nKGtleSldID0gU3RyaW5nKHZhbHVlKTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGhlYWRlcnMpLnJlZHVjZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PigoYWNjLCBba2V5LCB2YWx1ZV0pID0+IHtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuIGFjYztcbiAgICBhY2Nba2V5XSA9IFN0cmluZyh2YWx1ZSk7XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xufTtcblxuY29uc3QgZ2V0SGVhZGVyVmFsdWUgPSAoaGVhZGVyczogSGVhZGVyc0luaXQgfCB1bmRlZmluZWQsIGtleTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZEtleSA9IGtleS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHNhbml0aXplSGVhZGVycyhoZWFkZXJzKSk7XG4gIGNvbnN0IG1hdGNoID0gZW50cmllcy5maW5kKChbaGVhZGVyS2V5XSkgPT4gaGVhZGVyS2V5LnRyaW0oKS50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkS2V5KTtcbiAgcmV0dXJuIHNhZmVUZXh0KG1hdGNoPy5bMV0pO1xufTtcblxuY29uc3QgcmVtb3ZlSGVhZGVyVmFsdWUgPSAoaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiwga2V5OiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZEtleSA9IGtleS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgdG9EZWxldGUgPSBPYmplY3Qua2V5cyhoZWFkZXJzKS5maW5kKChoZWFkZXJLZXkpID0+IGhlYWRlcktleS50cmltKCkudG9Mb3dlckNhc2UoKSA9PT0gbm9ybWFsaXplZEtleSk7XG4gIGlmICghdG9EZWxldGUpIHJldHVybjtcbiAgZGVsZXRlIGhlYWRlcnNbdG9EZWxldGVdO1xufTtcblxuY29uc3Qgbm9ybWFsaXplQXhVc2VySWRIZWFkZXIgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBub3JtYWxpemVkID0gc2FmZVRleHQodmFsdWUpO1xuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBcIlwiO1xuICBjb25zdCBmaXJzdFRva2VuID0gbm9ybWFsaXplZC5zcGxpdChcIi1cIilbMF07XG4gIHJldHVybiBzYWZlVGV4dChmaXJzdFRva2VuKTtcbn07XG5cbmNvbnN0IHJlc29sdmVCZWFyZXJUb2tlbiA9IChoZWFkZXJzOiBIZWFkZXJzSW5pdCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGF1dGhvcml6YXRpb24gPSBnZXRIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIkF1dGhvcml6YXRpb25cIik7XG4gIGlmICghYXV0aG9yaXphdGlvbikgcmV0dXJuIFwiXCI7XG5cbiAgaWYgKC9eYmVhcmVyXFxzKy9pLnRlc3QoYXV0aG9yaXphdGlvbikpIHtcbiAgICByZXR1cm4gYXV0aG9yaXphdGlvbi5yZXBsYWNlKC9eYmVhcmVyXFxzKy9pLCBcIlwiKS50cmltKCk7XG4gIH1cblxuICByZXR1cm4gYXV0aG9yaXphdGlvbi50cmltKCk7XG59O1xuXG5jb25zdCByZWFkV2luZG93QXV0aFNlZWQgPSAoKTogUGFydGlhbDxFeHBlbnNlQXBpQXV0aFNlZWQ+ID0+IHtcbiAgY29uc3QgcnVudGltZVdpbmRvdyA9IHJlYWRFeHBlbnNlV2luZG93UnVudGltZSgpO1xuXG4gIHJldHVybiB7XG4gICAgdG9rZW46IHNhZmVUZXh0KHJ1bnRpbWVXaW5kb3cuX19JTkRfQVBJX1RPS0VOX18pLFxuICAgIGVudHJhT2lkOiBzYWZlVGV4dChydW50aW1lV2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcbiAgICBhcHBDb2RlOiBzYWZlVGV4dChydW50aW1lV2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxuICAgIHN0cmljdEFwaVJvdXRlczogdG9GbGFnQm9vbChydW50aW1lV2luZG93Ll9fSU5EX0VYUEVOU0VfU1RSSUNUX0FQSV9fKSA9PT0gdHJ1ZSxcbiAgfTtcbn07XG5cbmNvbnN0IHJlYWRSdW50aW1lU3RyaWN0QXBpRmxhZyA9ICgpOiBib29sZWFuID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgcnVudGltZVdpbmRvdyA9IHJlYWRFeHBlbnNlV2luZG93UnVudGltZSgpO1xuXG4gIGNvbnN0IGV4cGxpY2l0V2luZG93RmxhZyA9IHRvRmxhZ0Jvb2wocnVudGltZVdpbmRvdy5fX0lORF9FWFBFTlNFX1NUUklDVF9BUElfXyk7XG4gIHJldHVybiBleHBsaWNpdFdpbmRvd0ZsYWcgPT09IHRydWU7XG59O1xuXG5jb25zdCByZWFkV2luZG93U2VsZWN0ZWRDb21wYW55ID0gKCk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBzYWZlVGV4dChyZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUoKS5fX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18pLnRvVXBwZXJDYXNlKCk7XG59O1xuXG5jb25zdCBidWlsZENvbnRleHRLZXkgPSAoc2VlZDogRXhwZW5zZUFwaUF1dGhTZWVkKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGAke3NlZWQudG9rZW59fCR7c2VlZC5lbnRyYU9pZH18JHtzZWVkLmFwcENvZGV9fCR7cmVhZFdpbmRvd1NlbGVjdGVkQ29tcGFueSgpfWA7XG59O1xuXG5jb25zdCBidWlsZEV4cGVuc2VIZWFkZXJzID0gKFxuICBjb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyxcbiAgaW5jbHVkZUpzb24gPSBmYWxzZSxcbiAgaW5jbHVkZUF4VXNlcklkID0gdHJ1ZVxuKTogSGVhZGVyc0luaXQgPT4ge1xuICBjb25zdCBiYXNlID0gc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpO1xuICBjb25zdCBtZXJnZWQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7IC4uLmJhc2UgfTtcblxuICBpZiAoc2FmZVRleHQoY29udGV4dC50b2tlbikpIHtcbiAgICBtZXJnZWQuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHtjb250ZXh0LnRva2VufWA7XG4gIH1cblxuICBpZiAoc2FmZVRleHQoY29udGV4dC5jb21wYW55SWQpKSB7XG4gICAgbWVyZ2VkW1wiWC1JTkQtQ29tcGFueVwiXSA9IGNvbnRleHQuY29tcGFueUlkO1xuICB9XG5cbiAgaWYgKGluY2x1ZGVBeFVzZXJJZCkge1xuICAgIGNvbnN0IHJlcXVlc3RBeFVzZXJJZCA9IGdldEhlYWRlclZhbHVlKG9wdGlvbnM/LmhlYWRlcnMsIFwiWC1JTkQtQXhVc2VySWRcIik7XG4gICAgY29uc3Qgb3ZlcnJpZGVBeFVzZXJJZCA9IGdldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUoKTtcbiAgICBjb25zdCByZXNvbHZlZEF4VXNlcklkID0gc2FmZVRleHQocmVxdWVzdEF4VXNlcklkIHx8IG92ZXJyaWRlQXhVc2VySWQgfHwgY29udGV4dC5heFVzZXJJZCk7XG4gICAgaWYgKHJlc29sdmVkQXhVc2VySWQpIHtcbiAgICAgIG1lcmdlZFtcIlgtSU5ELUF4VXNlcklkXCJdID0gcmVzb2x2ZWRBeFVzZXJJZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlSGVhZGVyVmFsdWUobWVyZ2VkLCBcIlgtSU5ELUF4VXNlcklkXCIpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShtZXJnZWQsIFwiWC1JTkQtQXhVc2VySWRcIik7XG4gIH1cblxuICBpZiAoaW5jbHVkZUpzb24pIHtcbiAgICBtZXJnZWRbXCJDb250ZW50LVR5cGVcIl0gPSBcImFwcGxpY2F0aW9uL2pzb25cIjtcbiAgfVxuXG4gIHJldHVybiBtZXJnZWQ7XG59O1xuXG5jb25zdCBidWlsZEV4cGVuc2VGb3JtSGVhZGVycyA9IChjb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCwgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IEhlYWRlcnNJbml0ID0+IHtcbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIGZhbHNlKSk7XG4gIHJlbW92ZUhlYWRlclZhbHVlKGhlYWRlcnMsIFwiQ29udGVudC1UeXBlXCIpO1xuICByZXR1cm4gaGVhZGVycztcbn07XG5cbmNvbnN0IGJ1aWxkQ29udGV4dEhlYWRlcnMgPSAodG9rZW46IHN0cmluZywgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IEhlYWRlcnNJbml0ID0+IHtcbiAgY29uc3QgYmFzZSA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcbiAgY29uc3QgbWVyZ2VkOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgIC4uLmJhc2UsXG4gICAgLi4uSlNPTl9IRUFERVJTLFxuICB9O1xuXG4gIGlmIChzYWZlVGV4dCh0b2tlbikpIHtcbiAgICBtZXJnZWQuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICB9XG5cbiAgcmV0dXJuIG1lcmdlZDtcbn07XG5cbmNvbnN0IHJlc29sdmVBdXRoVG9rZW4gPSAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHRva2VuRnJvbUhlYWRlcnMgPSByZXNvbHZlQmVhcmVyVG9rZW4ob3B0aW9ucz8uaGVhZGVycyk7XG4gIGNvbnN0IHdpbmRvd1NlZWQgPSByZWFkV2luZG93QXV0aFNlZWQoKTtcbiAgcmV0dXJuIHNhZmVUZXh0KHRva2VuRnJvbUhlYWRlcnMgfHwgcnVudGltZUF1dGhTZWVkLnRva2VuIHx8IHdpbmRvd1NlZWQudG9rZW4pO1xufTtcblxuY29uc3QgcmVzb2x2ZUF1dGhTZWVkID0gKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBFeHBlbnNlQXBpQXV0aFNlZWQgPT4ge1xuICBjb25zdCB3aW5kb3dTZWVkID0gcmVhZFdpbmRvd0F1dGhTZWVkKCk7XG4gIGNvbnN0IHRva2VuID0gcmVzb2x2ZUF1dGhUb2tlbihvcHRpb25zKTtcbiAgY29uc3QgZW50cmFPaWQgPSBzYWZlVGV4dChydW50aW1lQXV0aFNlZWQuZW50cmFPaWQgfHwgd2luZG93U2VlZC5lbnRyYU9pZCk7XG4gIGNvbnN0IGFwcENvZGUgPSBzYWZlVGV4dChydW50aW1lQXV0aFNlZWQuYXBwQ29kZSB8fCB3aW5kb3dTZWVkLmFwcENvZGUgfHwgREVGQVVMVF9BUFBfQ09ERSkgfHwgREVGQVVMVF9BUFBfQ09ERTtcbiAgY29uc3Qgc3RyaWN0QXBpUm91dGVzID1cbiAgICB0eXBlb2YgcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcyA9PT0gXCJib29sZWFuXCJcbiAgICAgID8gcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlc1xuICAgICAgOiAod2luZG93U2VlZC5zdHJpY3RBcGlSb3V0ZXMgPT09IHRydWUpO1xuXG4gIHJldHVybiB7XG4gICAgdG9rZW4sXG4gICAgZW50cmFPaWQsXG4gICAgYXBwQ29kZSxcbiAgICBzdHJpY3RBcGlSb3V0ZXMsXG4gIH07XG59O1xuXG50eXBlIFJhd0VudHJhQ29udGV4dENvbXBhbnkgPSB7XG4gIENvbXBhbnlJZD86IHVua25vd247XG4gIGNvbXBhbnlJZD86IHVua25vd247XG4gIElzRGVmYXVsdD86IHVua25vd247XG4gIGlzRGVmYXVsdD86IHVua25vd247XG4gIEFsbG93U2VsZk1hbmFnZW1lbnQ/OiB1bmtub3duO1xuICBhbGxvd1NlbGZNYW5hZ2VtZW50PzogdW5rbm93bjtcbiAgQ3JtVXNlcklkPzogdW5rbm93bjtcbiAgY3JtVXNlcklkPzogdW5rbm93bjtcbn07XG5cbnR5cGUgTm9ybWFsaXplZEVudHJhQ29udGV4dENvbXBhbnkgPSB7XG4gIGNvbXBhbnlJZDogc3RyaW5nO1xuICBpc0RlZmF1bHQ6IGJvb2xlYW47XG4gIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGJvb2xlYW47XG4gIGNybVVzZXJJZDogc3RyaW5nO1xufTtcblxudHlwZSBSYXdFbnRyYUNvbnRleHRIZWFkZXIgPSB7XG4gIEF4VXNlcklkPzogdW5rbm93bjtcbiAgYXhVc2VySWQ/OiB1bmtub3duO1xuICBEZWZhdWx0Q29tcGFueT86IHVua25vd247XG4gIGRlZmF1bHRDb21wYW55PzogdW5rbm93bjtcbiAgRGVmYXVsdEN1cnJlbmN5Q29kZT86IHVua25vd247XG4gIGRlZmF1bHRDdXJyZW5jeUNvZGU/OiB1bmtub3duO1xufTtcblxudHlwZSBSYXdFbnRyYUNvbnRleHRJdGVtID0ge1xuICBIZWFkZXI/OiBSYXdFbnRyYUNvbnRleHRIZWFkZXI7XG4gIGhlYWRlcj86IFJhd0VudHJhQ29udGV4dEhlYWRlcjtcbiAgQ29tcGFuaWVzPzogdW5rbm93bjtcbiAgY29tcGFuaWVzPzogdW5rbm93bjtcbn07XG5cbi8vIE1hcHMgb25lIEVudHJhIGNvbXBhbnkgaXRlbSB0byB0aGUgZnJvbnRlbmQtc2FmZSBzaGFwZSB1c2VkIGJ5IGNvbnRleHQgY29uc3VtZXJzLlxuY29uc3QgbWFwRW50cmFDb250ZXh0Q29tcGFueSA9IChpdGVtOiB1bmtub3duKTogTm9ybWFsaXplZEVudHJhQ29udGV4dENvbXBhbnkgfCBudWxsID0+IHtcbiAgaWYgKCFpdGVtIHx8IHR5cGVvZiBpdGVtICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCByYXcgPSBpdGVtIGFzIFJhd0VudHJhQ29udGV4dENvbXBhbnk7XG4gIGNvbnN0IGNvbXBhbnlJZCA9IHNhZmVUZXh0KHJhdy5Db21wYW55SWQgPz8gcmF3LmNvbXBhbnlJZCk7XG4gIGlmICghY29tcGFueUlkKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4ge1xuICAgIGNvbXBhbnlJZCxcbiAgICBpc0RlZmF1bHQ6IHRvRmxhZ0Jvb2wocmF3LklzRGVmYXVsdCA/PyByYXcuaXNEZWZhdWx0KSA9PT0gdHJ1ZSxcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50OiB0b0ZsYWdCb29sKHJhdy5BbGxvd1NlbGZNYW5hZ2VtZW50ID8/IHJhdy5hbGxvd1NlbGZNYW5hZ2VtZW50KSA9PT0gdHJ1ZSxcbiAgICBjcm1Vc2VySWQ6IHNhZmVUZXh0KHJhdy5Dcm1Vc2VySWQgPz8gcmF3LmNybVVzZXJJZCksXG4gIH07XG59O1xuXG5jb25zdCB2YWxpZGF0ZUNvbnRleHRSZXNwb25zZSA9IChyZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFbnRyYUNvbnRleHREdG8+KTogRXhwZW5zZUFwaUNvbnRleHQgPT4ge1xuICBjb25zdCByYXdSZXNwb25zZSA9IHJlc3BvbnNlIGFzIHtcbiAgICBTdWNjZXNzPzogdW5rbm93bjtcbiAgICBzdWNjZXNzPzogdW5rbm93bjtcbiAgICBNZXNzYWdlPzogdW5rbm93bjtcbiAgICBtZXNzYWdlPzogdW5rbm93bjtcbiAgICBJdGVtcz86IHVua25vd247XG4gICAgaXRlbXM/OiB1bmtub3duO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VjY2VzcyA9IHRvRmxhZ0Jvb2wocmF3UmVzcG9uc2UuU3VjY2VzcyA/PyByYXdSZXNwb25zZS5zdWNjZXNzKTtcbiAgaWYgKGlzU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihzYWZlVGV4dChyYXdSZXNwb25zZS5NZXNzYWdlID8/IHJhd1Jlc3BvbnNlLm1lc3NhZ2UpIHx8IFwiQ291bGQgbm90IGxvYWQgRW50cmEgY29udGV4dC5cIik7XG4gIH1cblxuICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocmF3UmVzcG9uc2UuSXRlbXMpXG4gICAgPyByYXdSZXNwb25zZS5JdGVtc1xuICAgIDogKEFycmF5LmlzQXJyYXkocmF3UmVzcG9uc2UuaXRlbXMpID8gcmF3UmVzcG9uc2UuaXRlbXMgOiBbXSk7XG4gIGNvbnN0IGZpcnN0ID0gaXRlbXNbMF0gYXMgUmF3RW50cmFDb250ZXh0SXRlbSB8IHVuZGVmaW5lZDtcbiAgY29uc3QgaGVhZGVyID0gZmlyc3Q/LkhlYWRlciA/PyBmaXJzdD8uaGVhZGVyO1xuICBpZiAoIWZpcnN0IHx8ICFoZWFkZXIpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkNvdWxkIG5vdCBsb2FkIEVudHJhIGNvbnRleHQuXCIpO1xuICB9XG5cbiAgY29uc3QgYXhVc2VySWQgPSBzYWZlVGV4dChoZWFkZXIuQXhVc2VySWQgPz8gaGVhZGVyLmF4VXNlcklkKTtcbiAgY29uc3QgZGVmYXVsdENvbXBhbnkgPSBzYWZlVGV4dChoZWFkZXIuRGVmYXVsdENvbXBhbnkgPz8gaGVhZGVyLmRlZmF1bHRDb21wYW55KTtcbiAgY29uc3QgZGVmYXVsdEN1cnJlbmN5Q29kZSA9IHNhZmVUZXh0KGhlYWRlci5EZWZhdWx0Q3VycmVuY3lDb2RlID8/IGhlYWRlci5kZWZhdWx0Q3VycmVuY3lDb2RlKTtcbiAgY29uc3QgY29tcGFuaWVzUmF3ID0gQXJyYXkuaXNBcnJheShmaXJzdC5Db21wYW5pZXMpXG4gICAgPyBmaXJzdC5Db21wYW5pZXNcbiAgICA6IChBcnJheS5pc0FycmF5KGZpcnN0LmNvbXBhbmllcykgPyBmaXJzdC5jb21wYW5pZXMgOiBbXSk7XG4gIGNvbnN0IGNvbXBhbmllcyA9IGNvbXBhbmllc1Jhd1xuICAgIC5tYXAoKGl0ZW0pID0+IG1hcEVudHJhQ29udGV4dENvbXBhbnkoaXRlbSkpXG4gICAgLmZpbHRlcigoaXRlbSk6IGl0ZW0gaXMgTm9ybWFsaXplZEVudHJhQ29udGV4dENvbXBhbnkgPT4gISFpdGVtKTtcbiAgY29uc3QgZmFsbGJhY2tDb21wYW55ID0gc2FmZVRleHQoY29tcGFuaWVzLmZpbmQoKGl0ZW0pID0+IGl0ZW0uaXNEZWZhdWx0KT8uY29tcGFueUlkKTtcbiAgY29uc3QgY29tcGFueUlkID0gZGVmYXVsdENvbXBhbnkgfHwgZmFsbGJhY2tDb21wYW55O1xuICBjb25zdCBzZWxlY3RlZENvbXBhbnkgPSBjb21wYW5pZXMuZmluZCgoaXRlbSkgPT4gc2FmZVRleHQoaXRlbS5jb21wYW55SWQpID09PSBjb21wYW55SWQpIHx8IGNvbXBhbmllc1swXTtcbiAgY29uc3QgYWxsb3dTZWxmTWFuYWdlbWVudCA9IHNlbGVjdGVkQ29tcGFueT8uYWxsb3dTZWxmTWFuYWdlbWVudCA9PT0gdHJ1ZTtcbiAgY29uc3QgY3JtVXNlcklkID0gc2FmZVRleHQoc2VsZWN0ZWRDb21wYW55Py5jcm1Vc2VySWQpO1xuXG4gIGlmICghYXhVc2VySWQgfHwgIWNvbXBhbnlJZCkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiQ291bGQgbm90IHJlc29sdmUgRW50cmEgY29tcGFueSBjb250ZXh0LlwiKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdG9rZW46IFwiXCIsXG4gICAgY29tcGFueUlkLFxuICAgIGF4VXNlcklkLFxuICAgIGNybVVzZXJJZCxcbiAgICBkZWZhdWx0Q3VycmVuY3lDb2RlLFxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXG4gIH07XG59O1xuXG5jb25zdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dCA9IGFzeW5jIChvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogUHJvbWlzZTxFeHBlbnNlQXBpQ29udGV4dD4gPT4ge1xuICBjb25zdCBzZWVkID0gcmVzb2x2ZUF1dGhTZWVkKG9wdGlvbnMpO1xuICBjb25zdCBjb250ZXh0S2V5ID0gYnVpbGRDb250ZXh0S2V5KHNlZWQpO1xuXG4gIGlmIChjYWNoZWRDb250ZXh0ICYmIGNhY2hlZENvbnRleHRLZXkgPT09IGNvbnRleHRLZXkpIHtcbiAgICByZXR1cm4gY2FjaGVkQ29udGV4dDtcbiAgfVxuXG4gIGlmIChjb250ZXh0UHJvbWlzZSAmJiBjYWNoZWRDb250ZXh0S2V5ID09PSBjb250ZXh0S2V5KSB7XG4gICAgcmV0dXJuIGNvbnRleHRQcm9taXNlO1xuICB9XG5cbiAgY29uc3QgZmFsbGJhY2tDb21wYW55SWQgPSByZWFkV2luZG93U2VsZWN0ZWRDb21wYW55KCk7XG4gIGlmICghc2FmZVRleHQoc2VlZC5lbnRyYU9pZCkgJiYgZmFsbGJhY2tDb21wYW55SWQpIHtcbiAgICBjb25zdCBmYWxsYmFja0NvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0ID0ge1xuICAgICAgdG9rZW46IHNlZWQudG9rZW4sXG4gICAgICBjb21wYW55SWQ6IGZhbGxiYWNrQ29tcGFueUlkLFxuICAgICAgYXhVc2VySWQ6IFwiXCIsXG4gICAgICBjcm1Vc2VySWQ6IFwiXCIsXG4gICAgICBkZWZhdWx0Q3VycmVuY3lDb2RlOiBcIlwiLFxuICAgICAgYWxsb3dTZWxmTWFuYWdlbWVudDogZ2xvYmFsVGhpcy5fX0lORF9BTExPV19TRUxGX01BTkFHRU1FTlRfXyA9PT0gdHJ1ZSxcbiAgICB9O1xuXG4gICAgY2FjaGVkQ29udGV4dCA9IGZhbGxiYWNrQ29udGV4dDtcbiAgICBjYWNoZWRDb250ZXh0S2V5ID0gY29udGV4dEtleTtcbiAgICByZXR1cm4gZmFsbGJhY2tDb250ZXh0O1xuICB9XG5cbiAgaWYgKCFzYWZlVGV4dChzZWVkLmVudHJhT2lkKSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiTWlzc2luZyBFbnRyYSBPSUQgZm9yIEVudHJhIGNvbnRleHQgcmVxdWVzdC5cIik7XG4gIH1cblxuICBjYWNoZWRDb250ZXh0S2V5ID0gY29udGV4dEtleTtcbiAgY29udGV4dFByb21pc2UgPSAoYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRleHRQYXlsb2FkOiBFbnRyYUNvbnRleHRSZXF1ZXN0ID0ge1xuICAgICAgZW50cmFPaWQ6IHNlZWQuZW50cmFPaWQsXG4gICAgICBhcHBDb2RlOiBzZWVkLmFwcENvZGUsXG4gICAgfTtcblxuICAgIGNvbnN0IGNvbnRleHRSZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEVudHJhQ29udGV4dER0bz4+KFwiL2FwaS9hdXRoL2VudHJhL2NvbnRleHRcIiwge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZENvbnRleHRIZWFkZXJzKHNlZWQudG9rZW4sIG9wdGlvbnMpLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY29udGV4dFBheWxvYWQpLFxuICAgIH0pO1xuXG4gICAgY29uc3QgcmVzb2x2ZWQgPSB2YWxpZGF0ZUNvbnRleHRSZXNwb25zZShjb250ZXh0UmVzcG9uc2UpO1xuICAgIGNvbnN0IG5leHRDb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCA9IHtcbiAgICAgIC4uLnJlc29sdmVkLFxuICAgICAgdG9rZW46IHNlZWQudG9rZW4sXG4gICAgfTtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB3aW5kb3cuX19JTkRfQUxMT1dfU0VMRl9NQU5BR0VNRU5UX18gPSBuZXh0Q29udGV4dC5hbGxvd1NlbGZNYW5hZ2VtZW50O1xuICAgIH1cblxuICAgIGNhY2hlZENvbnRleHQgPSBuZXh0Q29udGV4dDtcbiAgICByZXR1cm4gbmV4dENvbnRleHQ7XG4gIH0pKCk7XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gYXdhaXQgY29udGV4dFByb21pc2U7XG4gIH0gZmluYWxseSB7XG4gICAgY29udGV4dFByb21pc2UgPSBudWxsO1xuICB9XG59O1xuXG4vLyBFeHBvc2VzIHJlc29sdmVkIEVudHJhIGNvbnRleHQgdmFsdWVzIG5lZWRlZCBieSBHYXN0b3MgVUkgbWFuYWdlbWVudCBzdGF0ZS5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlQXBpQ29udGV4dFNuYXBzaG90ID0gYXN5bmMgKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBQcm9taXNlPEV4cGVuc2VBcGlDb250ZXh0U25hcHNob3Q+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIGNvbXBhbnlJZDogc2FmZVRleHQoY29udGV4dC5jb21wYW55SWQpLnRvVXBwZXJDYXNlKCksXG4gICAgYXhVc2VySWQ6IHNhZmVUZXh0KGNvbnRleHQuYXhVc2VySWQpLFxuICAgIGNybVVzZXJJZDogc2FmZVRleHQoY29udGV4dC5jcm1Vc2VySWQpLFxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGNvbnRleHQuYWxsb3dTZWxmTWFuYWdlbWVudCA9PT0gdHJ1ZSxcbiAgfTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlID0gbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm07XG5jb25zdCBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlID0gbm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZUFwaVJlc3BvbnNlID0gbm9ybWFsaXplQXBpUmVzcG9uc2VUcmFuc2Zvcm07XG5jb25zdCBub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm07XG5jb25zdCBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlID0gbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlID0gbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm07XG5jb25zdCBub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlID0gbm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcblxuY29uc3QgbG9va3NMaWtlSHRtbERvY3VtZW50ID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IHJhdyA9IHNhZmVUZXh0KHZhbHVlKS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gcmF3LnN0YXJ0c1dpdGgoXCI8IWRvY3R5cGUgaHRtbFwiKSB8fCByYXcuc3RhcnRzV2l0aChcIjxodG1sXCIpO1xufTtcblxuY29uc3QgaXNBcGlSb3V0ZVVuYXZhaWxhYmxlID0gKGVycm9yOiB1bmtub3duKTogZXJyb3IgaXMgQXBpRmV0Y2hFcnJvciA9PiB7XG4gIGlmICghKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikpIHJldHVybiBmYWxzZTtcbiAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDA0IHx8IGVycm9yLnN0YXR1cyA9PT0gNDA1KSByZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuIGVycm9yLnN0YXR1cyA9PT0gdW5kZWZpbmVkICYmIGxvb2tzTGlrZUh0bWxEb2N1bWVudChlcnJvci5yZXNwb25zZUJvZHkpO1xufTtcblxuY29uc3QgaXNTdHJpY3RBcGlSb3V0ZXNFbmFibGVkID0gKCk6IGJvb2xlYW4gPT4ge1xuICBpZiAodHlwZW9mIHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXMgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgcmV0dXJuIHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXM7XG4gIH1cblxuICByZXR1cm4gcmVhZFJ1bnRpbWVTdHJpY3RBcGlGbGFnKCk7XG59O1xuXG5jb25zdCBzaG91bGRVc2VMZWdhY3lGYWxsYmFjayA9IChlcnJvcjogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xuICBpZiAoaXNTdHJpY3RBcGlSb3V0ZXNFbmFibGVkKCkpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIGlzQXBpUm91dGVVbmF2YWlsYWJsZShlcnJvcik7XG59O1xuXG5jb25zdCB0b0xlZ2FjeUxpc3RSZXF1ZXN0UGF5bG9hZCA9IChwYXlsb2FkOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGZpbHRlcjogc2FmZVRleHQocGF5bG9hZC5maWx0ZXIpLFxuICAgIGhvamFHYXN0b3NJZDogc2FmZVRleHQocGF5bG9hZC5maWx0ZXIpLFxuICAgIGJpbGxlZE1vZGU6IHBheWxvYWQuYmlsbGVkTW9kZSA/PyAyLFxuICAgIGZyb21EYXRlOiBzYWZlVGV4dChwYXlsb2FkLmNyZWF0ZWREYXRlRnJvbSksXG4gICAgdG9EYXRlOiBzYWZlVGV4dChwYXlsb2FkLmNyZWF0ZWREYXRlVG8pLFxuICAgIHByb2plY3RJZDogc2FmZVRleHQocGF5bG9hZC5wcm9qSWQpLFxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQocGF5bG9hZC5jdXJyZW5jeUNvZGUpLFxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlcihwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyksXG4gICAgcGFnZTogTnVtYmVyLmlzRmluaXRlKHBheWxvYWQucGFnZSkgJiYgcGF5bG9hZC5wYWdlID4gMCA/IHBheWxvYWQucGFnZSA6IDEsXG4gICAgcGFnZVNpemU6IE51bWJlci5pc0Zpbml0ZShwYXlsb2FkLnBhZ2VTaXplKSAmJiBwYXlsb2FkLnBhZ2VTaXplID4gMCA/IHBheWxvYWQucGFnZVNpemUgOiA1MCxcbiAgfTtcbn07XG5cbmNvbnN0IG1hcExlZ2FjeUxpc3RJdGVtVG9BcGlMaXN0SXRlbSA9IChpdGVtOiBMZWdhY3lFeHBlbnNlTGlzdEl0ZW0pOiBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byA9PiB7XG4gIHJldHVybiB7XG4gICAgSG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChpdGVtLmhvamFHYXN0b3NJZCksXG4gICAgRGVzY3JpcHRpb246IHNhZmVUZXh0KGl0ZW0uZGVzY3JpcHRpb24pLFxuICAgIEV4cGVuc2VTaGVldFN0YXR1czogdG9OdWxsYWJsZU51bWJlcihpdGVtLmV4cGVuc2VTaGVldFN0YXR1cyksXG4gICAgRXN0YWRvQ29tZW50YXJpb3M6IHNhZmVUZXh0KGl0ZW0uZXN0YWRvQ29tZW50YXJpb3MpIHx8IG51bGwsXG4gICAgVXNlcklkOiBzYWZlVGV4dChpdGVtLnVzZXJJZCkgfHwgbnVsbCxcbiAgICBWb3VjaGVyOiBzYWZlVGV4dChpdGVtLnZvdWNoZXIpLFxuICAgIFByb2pJZDogc2FmZVRleHQoaXRlbS5wcm9qSWQpLFxuICAgIEN1cnJlbmN5Q29kZTogc2FmZVRleHQoaXRlbS5jdXJyZW5jeUNvZGUpLFxuICAgIFRvdGFsQW1vdW50OiB0b051bGxhYmxlTnVtYmVyKGl0ZW0udG90YWxBbW91bnQgPz8gaXRlbS50b3RhbEFtb3VudE1TVCksXG4gICAgRXhjaFJhdGU6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5leGNoUmF0ZSksXG4gICAgRXhjaGFuZ2VSYXRlTW9kZTogdG9OdWxsYWJsZU51bWJlcihpdGVtLmV4Y2hhbmdlUmF0ZU1vZGUpLFxuICAgIENyZWF0ZWREYXRlOiBzYWZlVGV4dChpdGVtLmNyZWF0ZWREYXRlKSB8fCBudWxsLFxuICB9O1xufTtcblxuY29uc3QgbWFwTGVnYWN5TGlzdFJlc3BvbnNlID0gKFxuICBsZWdhY3k6IExlZ2FjeUV4cGVuc2VMaXN0UmVzcG9uc2UsXG4gIGZhbGxiYWNrUGFnZTogbnVtYmVyLFxuICBmYWxsYmFja1BhZ2VTaXplOiBudW1iZXJcbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+ID0+IHtcbiAgY29uc3QgbGVnYWN5SXRlbXMgPSBBcnJheS5pc0FycmF5KGxlZ2FjeT8uaXRlbXMpID8gbGVnYWN5Lml0ZW1zIDogW107XG4gIGNvbnN0IG1hcHBlZEl0ZW1zID0gbGVnYWN5SXRlbXMubWFwKChlbnRyeSkgPT4gbWFwTGVnYWN5TGlzdEl0ZW1Ub0FwaUxpc3RJdGVtKGVudHJ5KSk7XG5cbiAgcmV0dXJuIHtcbiAgICBTdWNjZXNzOiBsZWdhY3kuc3VjY2VzcyAhPT0gZmFsc2UsXG4gICAgTWVzc2FnZTogc2FmZVRleHQobGVnYWN5Lm1lc3NhZ2UpIHx8IFwiT0tcIixcbiAgICBUb3RhbDogdG9OdWxsYWJsZU51bWJlcihsZWdhY3kudG90YWwpID8/IG1hcHBlZEl0ZW1zLmxlbmd0aCxcbiAgICBQYWdlOiB0b051bGxhYmxlTnVtYmVyKGxlZ2FjeS5wYWdlKSA/PyBmYWxsYmFja1BhZ2UsXG4gICAgUGFnZVNpemU6IHRvTnVsbGFibGVOdW1iZXIobGVnYWN5LnBhZ2VTaXplKSA/PyBmYWxsYmFja1BhZ2VTaXplLFxuICAgIEl0ZW1zOiBtYXBwZWRJdGVtcyxcbiAgICBUcmFjZUlkOiB1bmRlZmluZWQsXG4gIH07XG59O1xuXG4vLyBTZXRzIHJ1bnRpbWUgYXV0aCBpbnB1dHMgdXNlZCB0byByZXNvbHZlIEVudHJhIGNvbnRleHQgYW5kIG1hbmRhdG9yeSBleHBlbnNlIGhlYWRlcnMuXG5leHBvcnQgY29uc3QgY29uZmlndXJlRXhwZW5zZUFwaUF1dGggPSAoc2VlZDogUGFydGlhbDxFeHBlbnNlQXBpQXV0aFNlZWQ+KTogdm9pZCA9PiB7XG4gIGNvbnN0IHN0cmljdEZyb21TZWVkID0gdG9GbGFnQm9vbChzZWVkLnN0cmljdEFwaVJvdXRlcyk7XG4gIGNvbnN0IHN0cmljdEZyb21SdW50aW1lID1cbiAgICB0eXBlb2YgcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcyA9PT0gXCJib29sZWFuXCIgPyBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzIDogcmVhZFJ1bnRpbWVTdHJpY3RBcGlGbGFnKCk7XG5cbiAgcnVudGltZUF1dGhTZWVkID0ge1xuICAgIC4uLnJ1bnRpbWVBdXRoU2VlZCxcbiAgICB0b2tlbjogc2FmZVRleHQoc2VlZC50b2tlbiB8fCBydW50aW1lQXV0aFNlZWQudG9rZW4pLFxuICAgIGVudHJhT2lkOiBzYWZlVGV4dChzZWVkLmVudHJhT2lkIHx8IHJ1bnRpbWVBdXRoU2VlZC5lbnRyYU9pZCksXG4gICAgYXBwQ29kZTogc2FmZVRleHQoc2VlZC5hcHBDb2RlIHx8IHJ1bnRpbWVBdXRoU2VlZC5hcHBDb2RlIHx8IERFRkFVTFRfQVBQX0NPREUpLFxuICAgIHN0cmljdEFwaVJvdXRlczogc3RyaWN0RnJvbVNlZWQgPz8gc3RyaWN0RnJvbVJ1bnRpbWUsXG4gIH07XG5cbiAgY2FjaGVkQ29udGV4dCA9IG51bGw7XG4gIGNhY2hlZENvbnRleHRLZXkgPSBcIlwiO1xuICBjb250ZXh0UHJvbWlzZSA9IG51bGw7XG4gIGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLmNsZWFyKCk7XG4gIHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLmNsZWFyKCk7XG59O1xuXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvbGlzdCBpdGVtIGNvbnRyYWN0IHRvIGxpc3QgY2FyZCBVSSBtb2RlbC5cbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZCA9IG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkQ29yZTtcblxuLy8gTWFwcyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9IGhlYWRlciBjb250cmFjdCB0byBVSSBtb2RlbC5cbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRIZWFkZXIgPSBtYXBFeHBlbnNlU2hlZXRIZWFkZXJDb3JlO1xuXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0gbGluZSBjb250cmFjdCB0byBVSSBtb2RlbC5cbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRMaW5lID0gbWFwRXhwZW5zZVNoZWV0TGluZUNvcmU7XG5cbmV4cG9ydCB0eXBlIEV4cGVuc2VTaGVldExpc3RGZXRjaE9wdGlvbnMgPSBBcGlGZXRjaE9wdGlvbnMgJiB7XG4gIGF4VXNlcklkT3ZlcnJpZGU/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBFeHBlbnNlVGlja2V0TGlzdEZldGNoT3B0aW9ucyA9IEFwaUZldGNoT3B0aW9ucyAmIHtcbiAgYXhVc2VySWRPdmVycmlkZT86IHN0cmluZztcbn07XG5cbi8vIExvYWRzIHRoZSBleHBlbnNlIHNoZWV0IGxpc3QgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2xpc3QuXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXRMaXN0ID0gYXN5bmMgKFxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCxcbiAgb3B0aW9ucz86IEV4cGVuc2VTaGVldExpc3RGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz4+ID0+IHtcbiAgY29uc3QgeyBheFVzZXJJZE92ZXJyaWRlLCAuLi5iYXNlT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3QgcmF3Q3JlYXRlZERhdGVGcm9tID0gc2FmZVRleHQocGF5bG9hZD8uY3JlYXRlZERhdGVGcm9tKTtcbiAgY29uc3QgcmF3Q3JlYXRlZERhdGVUbyA9IHNhZmVUZXh0KHBheWxvYWQ/LmNyZWF0ZWREYXRlVG8pO1xuICBjb25zdCBjcmVhdGVkRGF0ZUZyb20gPSBub3JtYWxpemVPcHRpb25hbEFwaURhdGUocmF3Q3JlYXRlZERhdGVGcm9tKTtcbiAgY29uc3QgY3JlYXRlZERhdGVUbyA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdDcmVhdGVkRGF0ZVRvKTtcblxuICBpZiAocmF3Q3JlYXRlZERhdGVGcm9tICYmICFjcmVhdGVkRGF0ZUZyb20pIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcbiAgfVxuICBpZiAocmF3Q3JlYXRlZERhdGVUbyAmJiAhY3JlYXRlZERhdGVUbykge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xuICB9XG5cbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0ID0ge1xuICAgIC4uLnBheWxvYWQsXG4gICAgY3JlYXRlZERhdGVGcm9tLFxuICAgIGNyZWF0ZWREYXRlVG8sXG4gICAgZXhwZW5zZVNoZWV0U3RhdHVzOiBub3JtYWxpemVFeHBlbnNlU2hlZXRMaXN0U3RhdHVzRmlsdGVyKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzKSxcbiAgfTtcblxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQoYmFzZU9wdGlvbnMpO1xuICBjb25zdCBsaXN0SGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIGJhc2VPcHRpb25zLCB0cnVlLCBmYWxzZSkpO1xuICBjb25zdCBub3JtYWxpemVkT3ZlcnJpZGVBeFVzZXJJZCA9IG5vcm1hbGl6ZUF4VXNlcklkSGVhZGVyKGF4VXNlcklkT3ZlcnJpZGUpO1xuICBjb25zdCByZXNvbHZlZEF4VXNlcklkID0gc2FmZVRleHQobm9ybWFsaXplZE92ZXJyaWRlQXhVc2VySWQgfHwgY29udGV4dC5heFVzZXJJZCk7XG4gIGlmIChyZXNvbHZlZEF4VXNlcklkKSB7XG4gICAgbGlzdEhlYWRlcnNbXCJYLUlORC1BeFVzZXJJZFwiXSA9IHJlc29sdmVkQXhVc2VySWQ7XG4gIH0gZWxzZSB7XG4gICAgcmVtb3ZlSGVhZGVyVmFsdWUobGlzdEhlYWRlcnMsIFwiWC1JTkQtQXhVc2VySWRcIik7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvbGlzdFwiLCB7XG4gICAgICAuLi5iYXNlT3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiBsaXN0SGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcbiAgICB9KTtcblxuICAgIHJldHVybiBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZShyZXNwb25zZSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKCFzaG91bGRVc2VMZWdhY3lGYWxsYmFjayhlcnJvcikpIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cblxuICAgIGNvbnN0IGxlZ2FjeVJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPExlZ2FjeUV4cGVuc2VMaXN0UmVzcG9uc2U+KFwiL0dhc3Rvcy9MaXN0RXhwZW5zZVNoZWV0c1wiLCB7XG4gICAgICAuLi5iYXNlT3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIC4uLnNhbml0aXplSGVhZGVycyhiYXNlT3B0aW9ucz8uaGVhZGVycyksXG4gICAgICAgIC4uLkpTT05fSEVBREVSUyxcbiAgICAgIH0sXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh0b0xlZ2FjeUxpc3RSZXF1ZXN0UGF5bG9hZChzYWZlUGF5bG9hZCkpLFxuICAgIH0pO1xuXG4gICAgY29uc3QgbWFwcGVkID0gbWFwTGVnYWN5TGlzdFJlc3BvbnNlKFxuICAgICAgbGVnYWN5UmVzcG9uc2UsXG4gICAgICBOdW1iZXIuaXNGaW5pdGUoc2FmZVBheWxvYWQucGFnZSkgJiYgc2FmZVBheWxvYWQucGFnZSA+IDAgPyBzYWZlUGF5bG9hZC5wYWdlIDogMSxcbiAgICAgIE51bWJlci5pc0Zpbml0ZShzYWZlUGF5bG9hZC5wYWdlU2l6ZSkgJiYgc2FmZVBheWxvYWQucGFnZVNpemUgPiAwID8gc2FmZVBheWxvYWQucGFnZVNpemUgOiA1MFxuICAgICk7XG5cbiAgICByZXR1cm4gbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UobWFwcGVkKTtcbiAgfVxufTtcblxuLy8gTG9hZHMgb25lIGV4cGVuc2Ugc2hlZXQgZGV0YWlsIGZyb20gL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS5cbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldERldGFpbCA9IGFzeW5jIChcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXREZXRhaWxEdG8+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldERldGFpbER0bz4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9YCwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIFJlYWRzIGF2YWlsYWJsZSBjdXJyZW5jaWVzIGZyb20gL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9jdXJyZW5jaWVzLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTaGVldEN1cnJlbmNpZXMgPSBhc3luYyAoXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+ID0+IHtcbiAgbGV0IGNvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0IHwgbnVsbCA9IG51bGw7XG4gIHRyeSB7XG4gICAgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmICghKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikpIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNvbXBhbnlJZCA9IHNhZmVUZXh0KGNvbnRleHQ/LmNvbXBhbnlJZCB8fCByZWFkV2luZG93U2VsZWN0ZWRDb21wYW55KCkpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IGNhY2hlS2V5ID0gY29tcGFueUlkIHx8IFwiLVwiO1xuXG4gIGlmIChjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcy5oYXMoY2FjaGVLZXkpKSB7XG4gICAgcmV0dXJuIGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLmdldChjYWNoZUtleSkgYXMgSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz47XG4gIH1cblxuICBpZiAocGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuaGFzKGNhY2hlS2V5KSkge1xuICAgIHJldHVybiBwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5nZXQoY2FjaGVLZXkpIGFzIFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+O1xuICB9XG5cbiAgY29uc3QgcmVxdWVzdFByb21pc2UgPSAoYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XG4gICAgcmVtb3ZlSGVhZGVyVmFsdWUoaGVhZGVycywgXCJBdXRob3JpemF0aW9uXCIpO1xuICAgIHJlbW92ZUhlYWRlclZhbHVlKGhlYWRlcnMsIFwiWC1JTkQtQXhVc2VySWRcIik7XG5cbiAgICBpZiAoY29tcGFueUlkKSB7XG4gICAgICBoZWFkZXJzW1wiWC1JTkQtQ29tcGFueVwiXSA9IGNvbXBhbnlJZDtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9jdXJyZW5jaWVzXCIsIHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgICBoZWFkZXJzLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRSZXNwb25zZSA9IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZShyZXNwb25zZSk7XG4gICAgICBpZiAobm9ybWFsaXplZFJlc3BvbnNlLlN1Y2Nlc3MpIHtcbiAgICAgICAgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuc2V0KGNhY2hlS2V5LCBub3JtYWxpemVkUmVzcG9uc2UpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbm9ybWFsaXplZFJlc3BvbnNlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoIXNob3VsZFVzZUxlZ2FjeUZhbGxiYWNrKGVycm9yKSkge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbGVnYWN5TGlzdFJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPExlZ2FjeUV4cGVuc2VMaXN0UmVzcG9uc2U+KFwiL0dhc3Rvcy9MaXN0RXhwZW5zZVNoZWV0c1wiLCB7XG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAuLi5zYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyksXG4gICAgICAgICAgLi4uSlNPTl9IRUFERVJTLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgZmlsdGVyOiBcIlwiLFxuICAgICAgICAgIGhvamFHYXN0b3NJZDogXCJcIixcbiAgICAgICAgICBiaWxsZWRNb2RlOiAyLFxuICAgICAgICAgIGZyb21EYXRlOiBcIlwiLFxuICAgICAgICAgIHRvRGF0ZTogXCJcIixcbiAgICAgICAgICBwcm9qZWN0SWQ6IFwiXCIsXG4gICAgICAgICAgY3VycmVuY3lDb2RlOiBcIlwiLFxuICAgICAgICAgIHBhZ2U6IDEsXG4gICAgICAgICAgcGFnZVNpemU6IDIwMCxcbiAgICAgICAgfSksXG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgc2VlbkNvZGVzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgICBjb25zdCBzb3VyY2VJdGVtcyA9IEFycmF5LmlzQXJyYXkobGVnYWN5TGlzdFJlc3BvbnNlLml0ZW1zKSA/IGxlZ2FjeUxpc3RSZXNwb25zZS5pdGVtcyA6IFtdO1xuICAgICAgY29uc3QgZmFsbGJhY2tJdGVtczogRXhwZW5zZVNoZWV0Q3VycmVuY3lEdG9bXSA9IHNvdXJjZUl0ZW1zXG4gICAgICAgIC5tYXAoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeS5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCkpXG4gICAgICAgIC5maWx0ZXIoKGNvZGUpID0+ICEhY29kZSlcbiAgICAgICAgLmZpbHRlcigoY29kZSkgPT4ge1xuICAgICAgICAgIGlmIChzZWVuQ29kZXMuaGFzKGNvZGUpKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgc2VlbkNvZGVzLmFkZChjb2RlKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSlcbiAgICAgICAgLm1hcCgoY29kZSkgPT4gKHtcbiAgICAgICAgICBDdXJyZW5jeUNvZGU6IGNvZGUsXG4gICAgICAgICAgQ3VycmVuY3lDb2RlSVNPOiBjb2RlLFxuICAgICAgICB9KSk7XG5cbiAgICAgIGNvbnN0IGZhbGxiYWNrUmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+ID0ge1xuICAgICAgICBTdWNjZXNzOiBsZWdhY3lMaXN0UmVzcG9uc2Uuc3VjY2VzcyAhPT0gZmFsc2UsXG4gICAgICAgIE1lc3NhZ2U6IHNhZmVUZXh0KGxlZ2FjeUxpc3RSZXNwb25zZS5tZXNzYWdlKSB8fCBcIk9LXCIsXG4gICAgICAgIFRvdGFsOiBmYWxsYmFja0l0ZW1zLmxlbmd0aCxcbiAgICAgICAgUGFnZTogMSxcbiAgICAgICAgUGFnZVNpemU6IGZhbGxiYWNrSXRlbXMubGVuZ3RoLFxuICAgICAgICBJdGVtczogZmFsbGJhY2tJdGVtcyxcbiAgICAgICAgVHJhY2VJZDogdW5kZWZpbmVkLFxuICAgICAgfTtcblxuICAgICAgY29uc3Qgbm9ybWFsaXplZEZhbGxiYWNrID0gbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlKGZhbGxiYWNrUmVzcG9uc2UpO1xuICAgICAgaWYgKG5vcm1hbGl6ZWRGYWxsYmFjay5TdWNjZXNzKSB7XG4gICAgICAgIGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLnNldChjYWNoZUtleSwgbm9ybWFsaXplZEZhbGxiYWNrKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRGYWxsYmFjaztcbiAgICB9XG4gIH0pKCk7XG5cbiAgcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuc2V0KGNhY2hlS2V5LCByZXF1ZXN0UHJvbWlzZSk7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGF3YWl0IHJlcXVlc3RQcm9taXNlO1xuICB9IGZpbmFsbHkge1xuICAgIHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLmRlbGV0ZShjYWNoZUtleSk7XG4gIH1cbn07XG5cbi8vIFJlYWRzIGF2YWlsYWJsZSBzdWJvcmRpbmF0ZXMgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3N1Ym9yZGluYXRlcy5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZXMgPSBhc3luYyAoXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0bz4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICAvLyBTdWJvcmRpbmF0ZXMgbXVzdCBhbHdheXMgcmVzb2x2ZSBmcm9tIHRoZSBsb2dnZWQgY29udGV4dCB1c2VyLCBub3QgZnJvbSBhY3RpbmctdXNlciBvdmVycmlkZXMuXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMoYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCBmYWxzZSwgZmFsc2UpKTtcbiAgY29uc3QgY29udGV4dEF4VXNlcklkID0gc2FmZVRleHQoY29udGV4dC5heFVzZXJJZCk7XG4gIGlmIChjb250ZXh0QXhVc2VySWQpIHtcbiAgICBoZWFkZXJzW1wiWC1JTkQtQXhVc2VySWRcIl0gPSBjb250ZXh0QXhVc2VySWQ7XG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPHVua25vd24+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvc3Vib3JkaW5hdGVzXCIsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICBoZWFkZXJzLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBFeHBvc2VzIHRoZSBkZWZhdWx0IGN1cnJlbmN5IHJlc29sdmVkIGZyb20gRW50cmEgY29udGV4dCBmb3IgaW5pdGlhbCBzZWxlY3Rpb25zLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUgPSBhc3luYyAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICAgIHJldHVybiBzYWZlVGV4dChjb250ZXh0LmRlZmF1bHRDdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCk7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG59O1xuXG4vLyBSZWFkcyBleGNoYW5nZSByYXRlIGZyb20gL2FwaS9zeXN0ZW0vZXhjaGFuZ2UtcmF0ZS5cbmV4cG9ydCBjb25zdCBnZXRFeGNoYW5nZVJhdGUgPSBhc3luYyAoXG4gIGJhc2VDdXJyZW5jeTogc3RyaW5nLFxuICB0YXJnZXRDdXJyZW5jeTogc3RyaW5nLFxuICBkYXRlPzogc3RyaW5nLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4Y2hhbmdlUmF0ZUR0bz4+ID0+IHtcbiAgY29uc3QgdG9rZW4gPSByZXNvbHZlQXV0aFRva2VuKG9wdGlvbnMpO1xuICBjb25zdCBub3JtYWxpemVkQmFzZUN1cnJlbmN5ID0gc2FmZVRleHQoYmFzZUN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBub3JtYWxpemVkVGFyZ2V0Q3VycmVuY3kgPSBzYWZlVGV4dCh0YXJnZXRDdXJyZW5jeSkudG9VcHBlckNhc2UoKTtcbiAgY29uc3Qgbm9ybWFsaXplZERhdGUgPSBzYWZlVGV4dChkYXRlKTtcbiAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG5cbiAgcXVlcnkuc2V0KFwiYmFzZUN1cnJlbmN5XCIsIG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kpO1xuICBxdWVyeS5zZXQoXCJ0YXJnZXRDdXJyZW5jeVwiLCBub3JtYWxpemVkVGFyZ2V0Q3VycmVuY3kpO1xuICBpZiAobm9ybWFsaXplZERhdGUpIHtcbiAgICBxdWVyeS5zZXQoXCJkYXRlXCIsIG5vcm1hbGl6ZWREYXRlKTtcbiAgfVxuXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XG4gIGlmICh0b2tlbikge1xuICAgIGhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICB9XG5cbiAgcmV0dXJuIGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeGNoYW5nZVJhdGVEdG8+PihgL2FwaS9zeXN0ZW0vZXhjaGFuZ2UtcmF0ZT8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIGhlYWRlcnMsXG4gIH0pO1xufTtcblxuLy8gUmVhZHMgZXhjaGFuZ2UgcmF0ZSBmcm9tIC9hcGkvc3lzdGVtL2V4Y2hhbmdlLXJhdGUvcHVibGljLWRpcmVjdC5cbmV4cG9ydCBjb25zdCBnZXRFeGNoYW5nZVJhdGVQdWJsaWNEaXJlY3QgPSBhc3luYyAoXG4gIGJhc2VDdXJyZW5jeTogc3RyaW5nLFxuICB0YXJnZXRDdXJyZW5jeTogc3RyaW5nLFxuICBkYXRlPzogc3RyaW5nLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4Y2hhbmdlUmF0ZUR0bz4+ID0+IHtcbiAgY29uc3QgdG9rZW4gPSByZXNvbHZlQXV0aFRva2VuKG9wdGlvbnMpO1xuICBjb25zdCBub3JtYWxpemVkQmFzZUN1cnJlbmN5ID0gc2FmZVRleHQoYmFzZUN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBub3JtYWxpemVkVGFyZ2V0Q3VycmVuY3kgPSBzYWZlVGV4dCh0YXJnZXRDdXJyZW5jeSkudG9VcHBlckNhc2UoKTtcbiAgY29uc3Qgbm9ybWFsaXplZERhdGUgPSBzYWZlVGV4dChkYXRlKTtcbiAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG5cbiAgcXVlcnkuc2V0KFwiYmFzZUN1cnJlbmN5XCIsIG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kpO1xuICBxdWVyeS5zZXQoXCJ0YXJnZXRDdXJyZW5jeVwiLCBub3JtYWxpemVkVGFyZ2V0Q3VycmVuY3kpO1xuICBpZiAobm9ybWFsaXplZERhdGUpIHtcbiAgICBxdWVyeS5zZXQoXCJkYXRlXCIsIG5vcm1hbGl6ZWREYXRlKTtcbiAgfVxuXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XG4gIGlmICh0b2tlbikge1xuICAgIGhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICB9XG5cbiAgcmV0dXJuIGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeGNoYW5nZVJhdGVEdG8+PihgL2FwaS9zeXN0ZW0vZXhjaGFuZ2UtcmF0ZS9wdWJsaWMtZGlyZWN0PyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgaGVhZGVycyxcbiAgfSk7XG59O1xuXG4vLyBSZWFkcyBmdWVsIHByaWNlIHBlciBrbSBmcm9tIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvZnVlbC1wcmljZS1rbS5cbmV4cG9ydCBjb25zdCBnZXRGdWVsUHJpY2VLbSA9IGFzeW5jIChcbiAgdHJhbnNEYXRlOiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RnVlbFByaWNlS21EdG8+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgbm9ybWFsaXplZERhdGUgPSBub3JtYWxpemVSZXF1aXJlZEFwaURhdGUodHJhbnNEYXRlKTtcbiAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG5cbiAgcXVlcnkuc2V0KFwidHJhbnNEYXRlXCIsIG5vcm1hbGl6ZWREYXRlKTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxGdWVsUHJpY2VLbUR0bz4+KFxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2Z1ZWwtcHJpY2Uta20/JHtxdWVyeS50b1N0cmluZygpfWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBDcmVhdGVzIGFuIGV4cGVuc2Ugc2hlZXQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy5cbmV4cG9ydCBjb25zdCBjcmVhdGVFeHBlbnNlU2hlZXQgPSBhc3luYyAoXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3JlYXRlUmVzcG9uc2VEYXRhPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IG1vZGUgPSBwYXlsb2FkLm1vZGUgPz8gMDtcbiAgY29uc3QgbGluZXMgPSBBcnJheS5pc0FycmF5KHBheWxvYWQubGluZXMpID8gcGF5bG9hZC5saW5lcyA6IFtdO1xuICBjb25zdCBub3JtYWxpemVkTGluZXMgPSBsaW5lcy5tYXAoKGxpbmUpID0+ICh7XG4gICAgLi4ubGluZSxcbiAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZShsaW5lLnRyYW5zRGF0ZSksXG4gIH0pKTtcbiAgY29uc3QgaGFzSW52YWxpZExpbmVQYXlsb2FkID0gbm9ybWFsaXplZExpbmVzLnNvbWUoKGxpbmUpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgIXNhZmVUZXh0KGxpbmUudHJhbnNEYXRlKSB8fFxuICAgICAgIU51bWJlci5pc0ludGVnZXIoTnVtYmVyKGxpbmUudHlwZVZhbHVlKSkgfHxcbiAgICAgIE51bWJlcihsaW5lLnR5cGVWYWx1ZSkgPD0gMCB8fFxuICAgICAgIWlzUG9zaXRpdmVOdW1iZXIobGluZS5xdHkpIHx8XG4gICAgICAhaXNQb3NpdGl2ZU51bWJlcihsaW5lLnByaWNlKVxuICAgICk7XG4gIH0pO1xuXG4gIGlmIChwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyAhPT0gdW5kZWZpbmVkICYmICFpc05vbk5lZ2F0aXZlTnVtYmVyKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzKSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhwZW5zZVNoZWV0U3RhdHVzIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byAwLlwiKTtcbiAgfVxuXG4gIGlmIChwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUgIT09IHVuZGVmaW5lZCAmJiAhaXNOb25OZWdhdGl2ZU51bWJlcihwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleGNoYW5nZVJhdGVNb2RlIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byAwLlwiKTtcbiAgfVxuXG4gIGlmIChwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUgIT09IHVuZGVmaW5lZCAmJiBwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleGNoYW5nZVJhdGVNb2RlIHJlcXVpcmVzIGV4cGVuc2VTaGVldFN0YXR1cy5cIik7XG4gIH1cblxuICBpZiAoaGFzSW52YWxpZExpbmVQYXlsb2FkKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJFYWNoIGxpbmUgcmVxdWlyZXMgdHJhbnNEYXRlLCB0eXBlVmFsdWUsIHF0eSA+IDAgYW5kIHByaWNlID4gMC5cIik7XG4gIH1cblxuICBpZiAobW9kZSA9PT0gMCkge1xuICAgIGlmICghc2FmZVRleHQocGF5bG9hZC5kZXNjcmlwdGlvbikgfHwgIXNhZmVUZXh0KHBheWxvYWQuY3VycmVuY3lDb2RlKSB8fCBsaW5lcy5sZW5ndGggPCAxKSB7XG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkludmFsaWQgY3JlYXRlIHBheWxvYWQgZm9yIG1vZGUgMC5cIik7XG4gICAgfVxuICB9XG5cbiAgaWYgKG1vZGUgPT09IDEpIHtcbiAgICBpZiAoIXNhZmVUZXh0KHBheWxvYWQuZGVzY3JpcHRpb24pIHx8ICFzYWZlVGV4dChwYXlsb2FkLmN1cnJlbmN5Q29kZSkpIHtcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiSW52YWxpZCBjcmVhdGUgcGF5bG9hZCBmb3IgbW9kZSAxLlwiKTtcbiAgICB9XG5cbiAgICBpZiAobGluZXMubGVuZ3RoID4gMCkge1xuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJNb2RlIDEgcmVxdWlyZXMgbGluZXMgdG8gYmUgbnVsbCBvciBlbXB0eS5cIik7XG4gICAgfVxuICB9XG5cbiAgaWYgKG1vZGUgPT09IDIpIHtcbiAgICBpZiAoIXNhZmVUZXh0KHBheWxvYWQuZXhpc3RpbmdIb2phR2FzdG9zSWQpIHx8IGxpbmVzLmxlbmd0aCA8IDEpIHtcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiSW52YWxpZCBjcmVhdGUgcGF5bG9hZCBmb3IgbW9kZSAyLlwiKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBub3JtYWxpemVkUGF5bG9hZDogRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCA9IHtcbiAgICAuLi5wYXlsb2FkLFxuICAgIG1vZGUsXG4gICAgZXhpc3RpbmdIb2phR2FzdG9zSWQ6IHNhZmVUZXh0KHBheWxvYWQuZXhpc3RpbmdIb2phR2FzdG9zSWQpIHx8IHVuZGVmaW5lZCxcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQocGF5bG9hZC5kZXNjcmlwdGlvbikgfHwgdW5kZWZpbmVkLFxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQocGF5bG9hZC5jdXJyZW5jeUNvZGUpIHx8IHVuZGVmaW5lZCxcbiAgICBwcm9qSWQ6IHNhZmVUZXh0KHBheWxvYWQucHJvaklkKSB8fCB1bmRlZmluZWQsXG4gICAgbGluZXM6IG1vZGUgPT09IDEgPyBbXSA6IG5vcm1hbGl6ZWRMaW5lcyxcbiAgfTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRDcmVhdGVSZXNwb25zZURhdGE+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHNcIiwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5vcm1hbGl6ZWRQYXlsb2FkKSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIFVwZGF0ZXMgaGVhZGVyIGZpZWxkcyB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9LlxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4cGVuc2VTaGVldEhlYWRlciA9IGFzeW5jIChcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldEhlYWRlclVwZGF0ZVJlcXVlc3QsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8eyBIb2phR2FzdG9zSWQ6IHN0cmluZyB9Pj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcblxuICBpZiAocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMgIT09IHVuZGVmaW5lZCAmJiAhaXNOb25OZWdhdGl2ZU51bWJlcihwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cykpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4cGVuc2VTaGVldFN0YXR1cyBtdXN0IGJlIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMC5cIik7XG4gIH1cblxuICBpZiAocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlICE9PSB1bmRlZmluZWQgJiYgIWlzTm9uTmVnYXRpdmVOdW1iZXIocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlKSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhjaGFuZ2VSYXRlTW9kZSBtdXN0IGJlIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMC5cIik7XG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTx7IEhvamFHYXN0b3NJZDogc3RyaW5nIH0+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy8ke3NhZmVTaGVldElkfWAsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gRGVsZXRlcyBhIGZ1bGwgZXhwZW5zZSBzaGVldCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9L2xpbmVzLzA/ZGVsZXRlV2hvbGVTaGVldD10cnVlLlxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VTaGVldCA9IGFzeW5jIChcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlU2hlZXRJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+PihcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy8ke3NhZmVTaGVldElkfS9saW5lcy8wP2RlbGV0ZU1vZGU9MiZkZWxldGVXaG9sZVNoZWV0PXRydWVgLFxuICAgIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxuICAgIH1cbiAgKTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gVXBkYXRlcyBvbmUgZXhwZW5zZSBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0vbGluZXMve2xpbmVSZWNJZH0uXG5leHBvcnQgY29uc3QgdXBkYXRlRXhwZW5zZVNoZWV0TGluZSA9IGFzeW5jIChcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXG4gIGxpbmVSZWNJZDogc3RyaW5nLFxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVzcG9uc2VEYXRhPj4gPT4ge1xuICBjb25zdCBub3JtYWxpemVkVHJhbnNEYXRlID0gbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlKHBheWxvYWQudHJhbnNEYXRlKTtcbiAgaWYgKFxuICAgICFOdW1iZXIuaXNJbnRlZ2VyKE51bWJlcihwYXlsb2FkLnR5cGVWYWx1ZSkpIHx8XG4gICAgTnVtYmVyKHBheWxvYWQudHlwZVZhbHVlKSA8PSAwIHx8XG4gICAgIWlzUG9zaXRpdmVOdW1iZXIocGF5bG9hZC5xdHkpIHx8XG4gICAgIWlzUG9zaXRpdmVOdW1iZXIocGF5bG9hZC5wcmljZSlcbiAgKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJ0cmFuc0RhdGUsIHR5cGVWYWx1ZSwgcXR5ID4gMCBhbmQgcHJpY2UgPiAwIGFyZSByZXF1aXJlZC5cIik7XG4gIH1cblxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3Qgc2FmZUxpbmVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcobGluZVJlY0lkIHx8IFwiXCIpLnRyaW0oKSk7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlc3BvbnNlRGF0YT4+KFxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9L2xpbmVzLyR7c2FmZUxpbmVJZH1gLFxuICAgIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAuLi5wYXlsb2FkLFxuICAgICAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZWRUcmFuc0RhdGUsXG4gICAgICB9KSxcbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIERlbGV0ZXMgb25lIGV4cGVuc2UgbGluZSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9L2xpbmVzL3tsaW5lUmVjSWR9P2RlbGV0ZVdob2xlU2hlZXQ9ZmFsc2UuXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0TGluZSA9IGFzeW5jIChcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXG4gIGxpbmVSZWNJZDogc3RyaW5nLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG51bGw+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCBzYWZlTGluZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhsaW5lUmVjSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8bnVsbD4+KFxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9L2xpbmVzLyR7c2FmZUxpbmVJZH0/ZGVsZXRlTW9kZT0wJmRlbGV0ZVdob2xlU2hlZXQ9ZmFsc2VgLFxuICAgIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxuICAgIH1cbiAgKTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gRXh0cmFjdHMgYW4gZXhwZW5zZSBkcmFmdCBmcm9tIGEgdGlja2V0IGltYWdlIHVzaW5nIC9hcGkvaWEvc2VydmljZS9leHBlbnNlZnJvbXRpY2tldC5cbmV4cG9ydCBjb25zdCBleHRyYWN0RXhwZW5zZUZyb21UaWNrZXREcmFmdCA9IGFzeW5jIChcbiAgdGlja2V0SW1hZ2U6IEZpbGUgfCBCbG9iLFxuICBwZXJzaXN0VGlja2V0PzogYm9vbGVhbixcbiAgdGlja2V0VXJsRmlsZT86IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXREcmFmdFJlc3BvbnNlPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcbiAgY29uc3Qgc2FmZVRpY2tldFVybCA9IHNhZmVUZXh0KHRpY2tldFVybEZpbGUpO1xuXG4gIGlmICh0aWNrZXRJbWFnZSBpbnN0YW5jZW9mIEZpbGUpIHtcbiAgICBmb3JtLmFwcGVuZChcInRpY2tldEltYWdlXCIsIHRpY2tldEltYWdlLCBzYWZlVGV4dCh0aWNrZXRJbWFnZS5uYW1lKSB8fCBcInRpY2tldC5qcGdcIik7XG4gIH0gZWxzZSB7XG4gICAgZm9ybS5hcHBlbmQoXCJ0aWNrZXRJbWFnZVwiLCB0aWNrZXRJbWFnZSwgXCJ0aWNrZXQuanBnXCIpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBwZXJzaXN0VGlja2V0ID09PSBcImJvb2xlYW5cIikge1xuICAgIGZvcm0uYXBwZW5kKFwicGVyc2lzdFRpY2tldFwiLCBwZXJzaXN0VGlja2V0ID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIpO1xuICB9XG5cbiAgaWYgKHNhZmVUaWNrZXRVcmwpIHtcbiAgICBmb3JtLmFwcGVuZChcInRpY2tldFVybEZpbGVcIiwgc2FmZVRpY2tldFVybCk7XG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXREcmFmdFJlc3BvbnNlPj4oXCIvYXBpL2lhL3NlcnZpY2UvZXhwZW5zZWZyb210aWNrZXRcIiwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VGb3JtSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcbiAgICBib2R5OiBmb3JtLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gQ3JlYXRlcyBhIHRpY2tldCBoZWFkZXIvbGluZXMgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLlxuZXhwb3J0IGNvbnN0IGNyZWF0ZUV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0Q3JlYXRlUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3QgbW9kZSA9IE51bWJlcihwYXlsb2FkPy5tb2RlKTtcbiAgY29uc3QgcmF3VHJhbnNEYXRlID0gc2FmZVRleHQocGF5bG9hZD8udHJhbnNEYXRlKTtcbiAgY29uc3Qgbm9ybWFsaXplZFRyYW5zRGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdUcmFuc0RhdGUpO1xuXG4gIGlmIChyYXdUcmFuc0RhdGUgJiYgIW5vcm1hbGl6ZWRUcmFuc0RhdGUpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcbiAgfVxuXG4gIGlmICgobW9kZSA9PT0gMCB8fCBtb2RlID09PSAxKSAmJiAhbm9ybWFsaXplZFRyYW5zRGF0ZSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xuICB9XG5cbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldENyZWF0ZVJlcXVlc3QgPSB7XG4gICAgLi4ucGF5bG9hZCxcbiAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZWRUcmFuc0RhdGUgfHwgdW5kZWZpbmVkLFxuICAgIGdhc3RvVHlwZTogbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUocGF5bG9hZD8uZ2FzdG9UeXBlKSxcbiAgfTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4oXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHNcIiwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIExvYWRzIHRpY2tldCBsaXN0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saXN0LlxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QgPSBhc3luYyAoXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0LFxuICBvcHRpb25zPzogRXhwZW5zZVRpY2tldExpc3RGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz4+ID0+IHtcbiAgY29uc3QgeyBheFVzZXJJZE92ZXJyaWRlLCAuLi5iYXNlT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KGJhc2VPcHRpb25zKTtcbiAgY29uc3QgcmF3Q3JlYXRlZERhdGVGcm9tID0gc2FmZVRleHQocGF5bG9hZD8uY3JlYXRlZERhdGVGcm9tKTtcbiAgY29uc3QgcmF3Q3JlYXRlZERhdGVUbyA9IHNhZmVUZXh0KHBheWxvYWQ/LmNyZWF0ZWREYXRlVG8pO1xuICBjb25zdCBjcmVhdGVkRGF0ZUZyb20gPSBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZShyYXdDcmVhdGVkRGF0ZUZyb20pO1xuICBjb25zdCBjcmVhdGVkRGF0ZVRvID0gbm9ybWFsaXplVGlja2V0TGlzdERhdGUocmF3Q3JlYXRlZERhdGVUbyk7XG4gIGlmIChyYXdDcmVhdGVkRGF0ZUZyb20gJiYgIWNyZWF0ZWREYXRlRnJvbSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xuICB9XG4gIGlmIChyYXdDcmVhdGVkRGF0ZVRvICYmICFjcmVhdGVkRGF0ZVRvKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XG4gIH1cblxuICBjb25zdCBwcmVmZXJyZWRTZWFyY2hLZXkgPSBzYWZlVGV4dChwYXlsb2FkPy5zZWFyY2hLZXkgfHwgcGF5bG9hZD8uZmlsdGVyKTtcbiAgY29uc3QgbGVnYWN5RmlsdGVyID0gc2FmZVRleHQocGF5bG9hZD8uZmlsdGVyIHx8IHByZWZlcnJlZFNlYXJjaEtleSk7XG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCA9IHtcbiAgICBwYWdlOiBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZD8ucGFnZSkgJiYgcGF5bG9hZC5wYWdlID4gMCA/IE1hdGguZmxvb3IocGF5bG9hZC5wYWdlKSA6IDEsXG4gICAgcGFnZVNpemU6IE51bWJlci5pc0Zpbml0ZShwYXlsb2FkPy5wYWdlU2l6ZSkgJiYgcGF5bG9hZC5wYWdlU2l6ZSA+IDAgPyBNYXRoLmZsb29yKHBheWxvYWQucGFnZVNpemUpIDogNTAsXG4gICAgY3JlYXRlZERhdGVGcm9tOiBjcmVhdGVkRGF0ZUZyb20gfHwgdW5kZWZpbmVkLFxuICAgIGNyZWF0ZWREYXRlVG86IGNyZWF0ZWREYXRlVG8gfHwgdW5kZWZpbmVkLFxuICAgIHNlYXJjaEtleTogcHJlZmVycmVkU2VhcmNoS2V5IHx8IHVuZGVmaW5lZCxcbiAgICBmaWx0ZXI6IGxlZ2FjeUZpbHRlciB8fCB1bmRlZmluZWQsXG4gICAgc3RhdHVzOiBub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1cyhwYXlsb2FkPy5zdGF0dXMpLFxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQocGF5bG9hZD8uY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpIHx8IHVuZGVmaW5lZCxcbiAgICBnYXN0b1R5cGU6IG5vcm1hbGl6ZVRpY2tldExpc3RHYXN0b1R5cGUocGF5bG9hZD8uZ2FzdG9UeXBlKSxcbiAgICBwcm9jZXNzZWRCeUFJOiBub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUkocGF5bG9hZD8ucHJvY2Vzc2VkQnlBSSksXG4gIH07XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz4+KFxuICAgIFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL2xpc3RcIixcbiAgICB7XG4gICAgICAuLi5iYXNlT3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiAoKCkgPT4ge1xuICAgICAgICBjb25zdCBoZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgYmFzZU9wdGlvbnMsIHRydWUsIGZhbHNlKSk7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRPdmVycmlkZUF4VXNlcklkID0gbm9ybWFsaXplQXhVc2VySWRIZWFkZXIoYXhVc2VySWRPdmVycmlkZSk7XG4gICAgICAgIGNvbnN0IHJlc29sdmVkQXhVc2VySWQgPSBzYWZlVGV4dChub3JtYWxpemVkT3ZlcnJpZGVBeFVzZXJJZCB8fCBjb250ZXh0LmF4VXNlcklkKTtcbiAgICAgICAgaWYgKHJlc29sdmVkQXhVc2VySWQpIHtcbiAgICAgICAgICBoZWFkZXJzW1wiWC1JTkQtQXhVc2VySWRcIl0gPSByZXNvbHZlZEF4VXNlcklkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlbW92ZUhlYWRlclZhbHVlKGhlYWRlcnMsIFwiWC1JTkQtQXhVc2VySWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICAgICB9KSgpLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxuICAgIH1cbiAgKTtcblxuICByZXR1cm4gbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gTG9hZHMgb25lIHRpY2tldCBkZXRhaWwgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9LlxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0ID0gYXN5bmMgKFxuICBmaWxlSWQ6IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldERldGFpbER0bz4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXREZXRhaWxEdG8+PihcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH1gLFxuICAgIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxuICAgIH1cbiAgKTtcblxuICByZXR1cm4gbm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBEb3dubG9hZHMgb25lIHRpY2tldCBpbWFnZSBwcmV2aWV3IGJsb2IgdGhyb3VnaCB0aGUgaW50ZXJuYWwgcHJveHkgZW5kcG9pbnQuXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRQcmV2aWV3QmxvYiA9IGFzeW5jIChcbiAgdXJsRmlsZTogc3RyaW5nLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEJsb2I+ID0+IHtcbiAgY29uc3Qgc2FmZVVybEZpbGUgPSBzYWZlVGV4dCh1cmxGaWxlKTtcbiAgaWYgKCFzYWZlVXJsRmlsZSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiTWlzc2luZyB0aWNrZXQgdXJsRmlsZS5cIik7XG4gIH1cblxuICBjb25zdCB7IHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiBfc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWwsIC4uLmZldGNoT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3QgY3NyZlRva2VuID0gZ2V0Q3NyZlRva2VuKCk7XG4gIGNvbnN0IGhlYWRlcnM6IEhlYWRlcnNJbml0ID0ge1xuICAgIEFjY2VwdDogXCJpbWFnZS8qXCIsXG4gICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgLi4uKGZldGNoT3B0aW9ucy5oZWFkZXJzIHx8IHt9KSxcbiAgfTtcblxuICBpZiAoY3NyZlRva2VuKSB7XG4gICAgKGhlYWRlcnMgYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPilbXCJSZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW5cIl0gPSBjc3JmVG9rZW47XG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3ByZXZpZXdcIiwge1xuICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgLi4uZmV0Y2hPcHRpb25zLFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVycyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHVybEZpbGU6IHNhZmVVcmxGaWxlIH0pLFxuICB9KTtcblxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgY29uc3QgcmF3ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSByZWFkQXBpTWVzc2FnZShyYXcpO1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKG1lc3NhZ2UgfHwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXQgcHJldmlldy5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xuICB9XG5cbiAgY29uc3QgYmxvYiA9IGF3YWl0IHJlc3BvbnNlLmJsb2IoKTtcbiAgaWYgKCFibG9iIHx8IGJsb2Iuc2l6ZSA9PT0gMCkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiQ291bGQgbm90IGxvYWQgdGlja2V0IHByZXZpZXcuXCIpO1xuICB9XG5cbiAgcmV0dXJuIGJsb2I7XG59O1xuXG4vLyBVcGRhdGVzIHRpY2tldCBoZWFkZXIgbWV0YWRhdGEgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9LlxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldFVwZGF0ZVJlcXVlc3QsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCByYXdUcmFuc0RhdGUgPSBzYWZlVGV4dChwYXlsb2FkPy50cmFuc0RhdGUpO1xuICBjb25zdCBub3JtYWxpemVkVHJhbnNEYXRlID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlKHJhd1RyYW5zRGF0ZSk7XG5cbiAgaWYgKHJhd1RyYW5zRGF0ZSAmJiAhbm9ybWFsaXplZFRyYW5zRGF0ZSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xuICB9XG5cbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldFVwZGF0ZVJlcXVlc3QgPSB7XG4gICAgLi4ucGF5bG9hZCxcbiAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZWRUcmFuc0RhdGUgfHwgdW5kZWZpbmVkLFxuICAgIGdhc3RvVHlwZTogbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUocGF5bG9hZD8uZ2FzdG9UeXBlKSxcbiAgfTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9YCwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gRGVsZXRlcyBvbmUgdGlja2V0IG9yIG9uZSB0aWNrZXQgbGluZSB2aWEgcXVlcnkgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9LlxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIGxpbmVSZWNJZD86IG51bWJlcixcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxudWxsPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgaWYgKE51bWJlci5pc0ludGVnZXIoTnVtYmVyKGxpbmVSZWNJZCkpICYmIE51bWJlcihsaW5lUmVjSWQpID4gMCkge1xuICAgIHF1ZXJ5LnNldChcImxpbmVSZWNJZFwiLCBTdHJpbmcobGluZVJlY0lkKSk7XG4gIH1cblxuICBjb25zdCBzdWZmaXggPSBxdWVyeS50b1N0cmluZygpO1xuICBjb25zdCB1cmwgPSBzdWZmaXhcbiAgICA/IGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfT8ke3N1ZmZpeH1gXG4gICAgOiBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH1gO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxudWxsPj4odXJsLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIEFwcGxpZXMgSUEgcGF5bG9hZCBvdmVyIGFuIGV4aXN0aW5nIHRpY2tldCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vaWEuXG5leHBvcnQgY29uc3QgYXBwbHlFeHBlbnNlU2hlZXRUaWNrZXRJYSA9IGFzeW5jIChcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJhd1BheWxvYWQgPSAocGF5bG9hZCB8fCB7fSkgYXMgRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0O1xuICBjb25zdCBzYWZlUGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0ID0ge1xuICAgIC4uLnJhd1BheWxvYWQsXG4gIH07XG4gIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc0RhdGUgPSBub3JtYWxpemVPcHRpb25hbEFwaURhdGUocmF3UGF5bG9hZC50cmFuc0RhdGUpO1xuICBpZiAoIW5vcm1hbGl6ZWRUcmFuc0RhdGUpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcbiAgfVxuICBzYWZlUGF5bG9hZC50cmFuc0RhdGUgPSBub3JtYWxpemVkVHJhbnNEYXRlO1xuXG4gIGNvbnN0IGdhc3RvVHlwZSA9IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlKHJhd1BheWxvYWQuZ2FzdG9UeXBlKTtcbiAgaWYgKGdhc3RvVHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZGVsZXRlIHNhZmVQYXlsb2FkLmdhc3RvVHlwZTtcbiAgfSBlbHNlIHtcbiAgICBzYWZlUGF5bG9hZC5nYXN0b1R5cGUgPSBnYXN0b1R5cGU7XG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vaWFgLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gQ3JlYXRlcyBvbmUgdGlja2V0IGxpbmUgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9L2xpbmVzLlxuZXhwb3J0IGNvbnN0IGNyZWF0ZUV4cGVuc2VTaGVldFRpY2tldExpbmUgPSBhc3luYyAoXG4gIGZpbGVJZDogc3RyaW5nLFxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5lUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XG4gIGlmICghc2FmZVRleHQocGF5bG9hZD8uZGVzY3JpcHRpb24pIHx8ICFpc1Bvc2l0aXZlTnVtYmVyKHBheWxvYWQ/LnF0eSkgfHwgIWlzUG9zaXRpdmVOdW1iZXIocGF5bG9hZD8ucHJpY2UpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJkZXNjcmlwdGlvbiwgcXR5ID4gMCBhbmQgcHJpY2UgPiAwIGFyZSByZXF1aXJlZC5cIik7XG4gIH1cblxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vbGluZXNgLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBVcGRhdGVzIG9uZSB0aWNrZXQgbGluZSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vbGluZXMve2xpbmVSZWNJZH0uXG5leHBvcnQgY29uc3QgdXBkYXRlRXhwZW5zZVNoZWV0VGlja2V0TGluZSA9IGFzeW5jIChcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIGxpbmVSZWNJZDogc3RyaW5nIHwgbnVtYmVyLFxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5lUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XG4gIGlmICghc2FmZVRleHQocGF5bG9hZD8uZGVzY3JpcHRpb24pIHx8ICFpc1Bvc2l0aXZlTnVtYmVyKHBheWxvYWQ/LnF0eSkgfHwgIWlzUG9zaXRpdmVOdW1iZXIocGF5bG9hZD8ucHJpY2UpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJkZXNjcmlwdGlvbiwgcXR5ID4gMCBhbmQgcHJpY2UgPiAwIGFyZSByZXF1aXJlZC5cIik7XG4gIH1cblxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCBzYWZlTGluZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhsaW5lUmVjSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4oXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2xpbmVzLyR7c2FmZUxpbmVJZH1gLFxuICAgIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBEZWxldGVzIG9uZSB0aWNrZXQgbGluZSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vbGluZXMve2xpbmVSZWNJZH0uXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0TGluZSA9IGFzeW5jIChcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIGxpbmVSZWNJZDogc3RyaW5nIHwgbnVtYmVyLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG51bGw+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHNhZmVMaW5lSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGxpbmVSZWNJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxudWxsPj4oXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2xpbmVzLyR7c2FmZUxpbmVJZH1gLFxuICAgIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxuICAgIH1cbiAgKTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gVXBsb2Fkcy9yZXBsYWNlcyB0aWNrZXQgZmlsZSBjb250ZW50IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9maWxlLlxuZXhwb3J0IGNvbnN0IHVwbG9hZEV4cGVuc2VTaGVldFRpY2tldEZpbGUgPSBhc3luYyAoXG4gIGZpbGVJZDogc3RyaW5nLFxuICBmaWxlOiBGaWxlIHwgQmxvYixcbiAgZXh0ZW5zaW9uPzogc3RyaW5nLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3Qgc2FmZUV4dGVuc2lvbiA9IHNhZmVUZXh0KGV4dGVuc2lvbikucmVwbGFjZSgvXlxcLi8sIFwiXCIpO1xuICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgaWYgKHNhZmVFeHRlbnNpb24pIHtcbiAgICBxdWVyeS5zZXQoXCJleHRlbnNpb25cIiwgc2FmZUV4dGVuc2lvbik7XG4gIH1cblxuICBjb25zdCBzdWZmaXggPSBxdWVyeS50b1N0cmluZygpO1xuICBjb25zdCB1cmwgPSBzdWZmaXhcbiAgICA/IGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9maWxlPyR7c3VmZml4fWBcbiAgICA6IGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9maWxlYDtcbiAgY29uc3QgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xuICBpZiAoZmlsZSBpbnN0YW5jZW9mIEZpbGUpIHtcbiAgICBmb3JtLmFwcGVuZChcImZpbGVcIiwgZmlsZSwgc2FmZVRleHQoZmlsZS5uYW1lKSB8fCBgdGlja2V0LiR7c2FmZUV4dGVuc2lvbiB8fCBcImpwZ1wifWApO1xuICB9IGVsc2Uge1xuICAgIGZvcm0uYXBwZW5kKFwiZmlsZVwiLCBmaWxlLCBgdGlja2V0LiR7c2FmZUV4dGVuc2lvbiB8fCBcImpwZ1wifWApO1xuICB9XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4odXJsLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUZvcm1IZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxuICAgIGJvZHk6IGZvcm0sXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBEZWxldGVzIHRpY2tldCBmaWxlIGNvbnRlbnQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9L2ZpbGUuXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0RmlsZSA9IGFzeW5jIChcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8bnVsbD4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9maWxlYCwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBTZWFyY2hlcyBwcm9qZWN0cyBmb3IgZHJvcGRvd24gdXNhZ2UgaW4gZmlsdGVycyBhbmQgZWRpdCBmb3Jtcy5cbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VQcm9qZWN0cyA9IGFzeW5jIChcbiAgdGVybTogc3RyaW5nLFxuICBwYWdlOiBudW1iZXIsXG4gIHBhZ2VTaXplOiBudW1iZXIsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8UHJvamVjdERyb3Bkb3duUmVzcG9uc2U+ID0+IHtcbiAgY29uc3Qgc2FmZVRlcm0gPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKHRlcm0gfHwgXCJcIikpO1xuICBjb25zdCBzYWZlUGFnZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlKSAmJiBwYWdlID4gMCA/IE1hdGguZmxvb3IocGFnZSkgOiAxO1xuICBjb25zdCBzYWZlUGFnZVNpemUgPSBOdW1iZXIuaXNGaW5pdGUocGFnZVNpemUpICYmIHBhZ2VTaXplID4gMCA/IE1hdGguZmxvb3IocGFnZVNpemUpIDogMjA7XG5cbiAgcmV0dXJuIGZldGNoSnNvbjxQcm9qZWN0RHJvcGRvd25SZXNwb25zZT4oXG4gICAgYC9HYXN0b3MvR2V0UHJvamVjdHNGb3JEcm9wZG93bj90ZXJtPSR7c2FmZVRlcm19JnBhZ2U9JHtzYWZlUGFnZX0mcGFnZVNpemU9JHtzYWZlUGFnZVNpemV9YCxcbiAgICB7XG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH1cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBYU8sSUFBTSw2QkFBNkIsQ0FDeEMsYUFDOEM7QUFDOUMsU0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBQ0gsT0FBTyxNQUFNLFFBQVEsVUFBVSxLQUFLLElBQUksU0FBUyxRQUFRLENBQUM7QUFBQSxFQUM1RDtBQUNGO0FBRU8sSUFBTSwrQkFBK0IsQ0FDMUMsYUFDNEM7QUFDNUMsU0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBQ0gsT0FBTyxNQUFNLFFBQVEsVUFBVSxLQUFLLElBQUksU0FBUyxRQUFRLENBQUM7QUFBQSxFQUM1RDtBQUNGO0FBRU8sSUFBTSx1QkFBdUIsQ0FBSSxhQUFtRDtBQUN6RixTQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxRQUFRLE1BQU0sUUFBUSxVQUFVLE1BQU0sSUFBSSxTQUFTLFNBQVMsVUFBVSxVQUFVO0FBQUEsRUFDbEY7QUFDRjtBQUVPLElBQU0saUNBQWlDLENBQzVDLGFBQzhDO0FBQzlDLFNBQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUNILE9BQU8sTUFBTSxRQUFRLFVBQVUsS0FBSyxJQUFJLFNBQVMsUUFBUSxDQUFDO0FBQUEsRUFDNUQ7QUFDRjtBQUVPLElBQU0scUNBQXFDLENBQ2hELGFBQ2lEO0FBQ2pELFFB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UyxPQUFPO0FBQUEsSUFDakQsTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUVELFNBQU9HLHNCQUFxQixRQUFRO0FBQ3RDO0FBR08sSUFBTSwrQkFBK0IsT0FDMUMsUUFDQSxZQUNrQztBQUNsQyxRQUFNLFVBQVUsTUFBTSx3QkFBd0IsT0FBTztBQUNyRCxRQUFNLGFBQWEsbUJBQW1CLE9BQU8sVUFBVSxFQUFFLEVBQUUsS0FBSyxDQUFDO0FBQ2pFLFFBQU0sV0FBVyxNQUFNLFVBQWdDLGtDQUFrQyxVQUFVLFNBQVM7QUFBQSxJQUMxRyxHQUFHO0FBQUEsSUFDSCxRQUFRO0FBQUEsSUFDUixTQUFTLG9CQUFvQixTQUFTLE9BQU87QUFBQSxFQUMvQyxDQUFDO0FBRUQsU0FBT0Esc0JBQXFCLFFBQVE7QUFDdEM7QUFHTyxJQUFNLHVCQUF1QixPQUNsQyxNQUNBLE1BQ0EsVUFDQSxZQUNxQztBQUNyQyxRQUFNLFdBQVcsbUJBQW1CLE9BQU8sUUFBUSxFQUFFLENBQUM7QUFDdEQsUUFBTSxXQUFXLE9BQU8sU0FBUyxJQUFJLEtBQUssT0FBTyxJQUFJLEtBQUssTUFBTSxJQUFJLElBQUk7QUFDeEUsUUFBTSxlQUFlLE9BQU8sU0FBUyxRQUFRLEtBQUssV0FBVyxJQUFJLEtBQUssTUFBTSxRQUFRLElBQUk7QUFFeEYsU0FBTztBQUFBLElBQ0wsdUNBQXVDLFFBQVEsU0FBUyxRQUFRLGFBQWEsWUFBWTtBQUFBLElBQ3pGO0FBQUEsTUFDRSxRQUFRO0FBQUEsTUFDUixHQUFHO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFsic2FmZVRleHQiLCAidG9OdWxsYWJsZU51bWJlciIsICJpc05vbk5lZ2F0aXZlTnVtYmVyIiwgImlzUG9zaXRpdmVOdW1iZXIiLCAibm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUiLCAibm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZSIsICJub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1cyIsICJub3JtYWxpemVPcHRpb25hbEFwaURhdGUiLCAibm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlIiwgIm5vcm1hbGl6ZVRpY2tldExpc3REYXRlIiwgIm5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSSIsICJub3JtYWxpemVFeHBlbnNlU2hlZXRMaXN0U3RhdHVzRmlsdGVyIiwgInRvRmxhZ0Jvb2wiLCAicmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lIiwgInNhZmVUZXh0IiwgIm5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlIiwgIm5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplQXBpUmVzcG9uc2UiLCAibm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlIiwgIm5vcm1hbGl6ZVN1Ym9yZGluYXRlc1BhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZSIsICJ0b051bGxhYmxlTnVtYmVyIiwgIm1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkIiwgIm1hcEV4cGVuc2VTaGVldEhlYWRlciIsICJtYXBFeHBlbnNlU2hlZXRMaW5lIiwgIm5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZSIsICJub3JtYWxpemVSZXF1aXJlZEFwaURhdGUiLCAiaXNQb3NpdGl2ZU51bWJlciIsICJpc05vbk5lZ2F0aXZlTnVtYmVyIiwgIm5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlIiwgIm5vcm1hbGl6ZVRpY2tldExpc3REYXRlIiwgIm5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzIiwgIm5vcm1hbGl6ZVRpY2tldExpc3RHYXN0b1R5cGUiXQp9Cg==
