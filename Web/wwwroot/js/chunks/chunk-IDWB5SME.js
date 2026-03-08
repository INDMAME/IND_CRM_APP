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
} from "./chunk-LCBK6SHP.js";
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
  const response = await fetchJson("/api/crm/expensesheets/subordinates", {
    ...options,
    method: "GET",
    headers: buildExpenseHeaders(context, options)
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
  const context = await ensureExpenseApiContext(options);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlQXBpUmVzcG9uc2VOb3JtYWxpemVycy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VBcGlNYXBwZXJzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZUFwaS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXHVGRUZGaW1wb3J0IHR5cGUge1xuICBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0byxcbiAgRXhwZW5zZVNoZWV0RGV0YWlsRHRvLFxuICBFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0byxcbiAgRXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvLFxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0byxcbiAgRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8sXG4gIEluZEFwaVJlc3BvbnNlLFxuICBJbmRQYWdlZFJlc3BvbnNlLFxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCwgdG9OdWxsYWJsZUJvb2wsIHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlLCB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZSB9IGZyb20gXCIuL2V4cGVuc2VBcGlUcmFuc2Zvcm1zLnRzXCI7XG5pbXBvcnQgeyBub3JtYWxpemVFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZXMgfSBmcm9tIFwiLi9leHBlbnNlU3Vib3JkaW5hdGVNYXBwZXIudHNcIjtcblxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz5cbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+ID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5yZXNwb25zZSxcbiAgICBJdGVtczogQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXSxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXREZXRhaWxEdG8+XG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldERldGFpbER0bz4gPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLnJlc3BvbnNlLFxuICAgIEl0ZW1zOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUFwaVJlc3BvbnNlID0gPFQ+KHJlc3BvbnNlOiBJbmRBcGlSZXNwb25zZTxUPik6IEluZEFwaVJlc3BvbnNlPFQ+ID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5yZXNwb25zZSxcbiAgICBFcnJvcnM6IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/LkVycm9ycykgPyByZXNwb25zZS5FcnJvcnMgOiByZXNwb25zZT8uRXJyb3JzID8/IG51bGwsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz5cbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+ID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5yZXNwb25zZSxcbiAgICBJdGVtczogQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXSxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTx1bmtub3duPlxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0bz4gPT4ge1xuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBub3JtYWxpemVFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZXMocmVzcG9uc2U/Lkl0ZW1zKTtcblxuICByZXR1cm4ge1xuICAgIC4uLnJlc3BvbnNlLFxuICAgIEl0ZW1zOiBub3JtYWxpemVkSXRlbXMsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2UgPSAoXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvPlxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz4gPT4ge1xuICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XG4gIGNvbnN0IG5vcm1hbGl6ZWRJdGVtcyA9IGl0ZW1zLm1hcCgoaXRlbSkgPT4gKHtcbiAgICAuLi5pdGVtLFxuICAgIFN0YXR1czogdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGUoXG4gICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LlN0YXR1cyA/P1xuICAgICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LnN0YXR1c1xuICAgICksXG4gICAgUHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woXG4gICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8uUHJvY2Vzc2VkQnlBSSA/P1xuICAgICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8ucHJvY2Vzc2VkQnlBSVxuICAgICksXG4gICAgSG9qYUdhc3Rvc0lkRGlzcGxheTogc2FmZVRleHQoXG4gICAgICAoaXRlbSBhcyB7IEhvamFHYXN0b3NJZERpc3BsYXk/OiB1bmtub3duOyBob2phR2FzdG9zSWREaXNwbGF5PzogdW5rbm93biB9KT8uSG9qYUdhc3Rvc0lkRGlzcGxheSA/P1xuICAgICAgICAoaXRlbSBhcyB7IEhvamFHYXN0b3NJZERpc3BsYXk/OiB1bmtub3duOyBob2phR2FzdG9zSWREaXNwbGF5PzogdW5rbm93biB9KT8uaG9qYUdhc3Rvc0lkRGlzcGxheVxuICAgICksXG4gICAgR2FzdG9UeXBlOiB0b051bGxhYmxlR2FzdG9UeXBlQ29kZShcbiAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uR2FzdG9UeXBlID8/XG4gICAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uZ2FzdG9UeXBlXG4gICAgKSxcbiAgfSkpO1xuXG4gIHJldHVybiB7XG4gICAgLi4ucmVzcG9uc2UsXG4gICAgSXRlbXM6IG5vcm1hbGl6ZWRJdGVtcyxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXREZXRhaWxEdG8+XG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldERldGFpbER0bz4gPT4ge1xuICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XG4gIGNvbnN0IG5vcm1hbGl6ZWRJdGVtcyA9IGl0ZW1zLm1hcCgoaXRlbSkgPT4gKHtcbiAgICAuLi5pdGVtLFxuICAgIFN0YXR1czogdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGUoXG4gICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LlN0YXR1cyA/P1xuICAgICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LnN0YXR1c1xuICAgICksXG4gICAgUHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woXG4gICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8uUHJvY2Vzc2VkQnlBSSA/P1xuICAgICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8ucHJvY2Vzc2VkQnlBSVxuICAgICksXG4gICAgSG9qYUdhc3Rvc0lkRGlzcGxheTogc2FmZVRleHQoXG4gICAgICAoaXRlbSBhcyB7IEhvamFHYXN0b3NJZERpc3BsYXk/OiB1bmtub3duOyBob2phR2FzdG9zSWREaXNwbGF5PzogdW5rbm93biB9KT8uSG9qYUdhc3Rvc0lkRGlzcGxheSA/P1xuICAgICAgICAoaXRlbSBhcyB7IEhvamFHYXN0b3NJZERpc3BsYXk/OiB1bmtub3duOyBob2phR2FzdG9zSWREaXNwbGF5PzogdW5rbm93biB9KT8uaG9qYUdhc3Rvc0lkRGlzcGxheVxuICAgICksXG4gICAgR2FzdG9UeXBlOiB0b051bGxhYmxlR2FzdG9UeXBlQ29kZShcbiAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uR2FzdG9UeXBlID8/XG4gICAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uZ2FzdG9UeXBlXG4gICAgKSxcbiAgICBMaW5lczogQXJyYXkuaXNBcnJheShpdGVtPy5MaW5lcykgPyBpdGVtLkxpbmVzIDogW10sXG4gIH0pKTtcblxuICByZXR1cm4ge1xuICAgIC4uLnJlc3BvbnNlLFxuICAgIEl0ZW1zOiBub3JtYWxpemVkSXRlbXMsXG4gIH07XG59O1xyXG4iLCAiXHVGRUZGaW1wb3J0IHR5cGUge1xuICBFeHBlbnNlU2hlZXRDYXJkLFxuICBFeHBlbnNlU2hlZXREZXRhaWxEdG8sXG4gIEV4cGVuc2VTaGVldEhlYWRlcixcbiAgRXhwZW5zZVNoZWV0TGluZSxcbiAgRXhwZW5zZVNoZWV0TGluZUR0byxcbiAgRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8sXG59IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IHNhZmVUZXh0LCB0b051bGxhYmxlQm9vbCwgdG9OdWxsYWJsZU51bWJlciB9IGZyb20gXCIuL2V4cGVuc2VBcGlUcmFuc2Zvcm1zLnRzXCI7XG5cbnR5cGUgRXhwZW5zZVdpbmRvd1J1bnRpbWUgPSB7XG4gIF9fRVhQRU5TRV9HQVNUT19UWVBFU19fPzogQXJyYXk8e1xuICAgIHZhbHVlPzogdW5rbm93bjtcbiAgICBWYWx1ZT86IHVua25vd247XG4gICAgdGV4dD86IHVua25vd247XG4gICAgVGV4dD86IHVua25vd247XG4gIH0+O1xufTtcblxudHlwZSBFeHBlbnNlR2FzdG9UeXBlRW50cnkgPSBOb25OdWxsYWJsZTxFeHBlbnNlV2luZG93UnVudGltZVtcIl9fRVhQRU5TRV9HQVNUT19UWVBFU19fXCJdPltudW1iZXJdO1xuXG5jb25zdCByZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUgPSAoKTogRXhwZW5zZVdpbmRvd1J1bnRpbWUgPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHt9O1xuICByZXR1cm4gd2luZG93IGFzIHVua25vd24gYXMgRXhwZW5zZVdpbmRvd1J1bnRpbWU7XG59O1xuXG5jb25zdCByZXNvbHZlVHlwZUxhYmVsID0gKHR5cGVWYWx1ZUNvZGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGlmICghdHlwZVZhbHVlQ29kZSB8fCB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHR5cGVWYWx1ZUNvZGU7XG4gIH1cblxuICBjb25zdCByYXdDYXRhbG9nU291cmNlID0gcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lKCkuX19FWFBFTlNFX0dBU1RPX1RZUEVTX187XG4gIGNvbnN0IHJhd0NhdGFsb2cgPSBBcnJheS5pc0FycmF5KHJhd0NhdGFsb2dTb3VyY2UpID8gcmF3Q2F0YWxvZ1NvdXJjZSA6IFtdO1xuICBjb25zdCBtYXRjaCA9IHJhd0NhdGFsb2cuZmluZCgoZW50cnk6IEV4cGVuc2VHYXN0b1R5cGVFbnRyeSkgPT4ge1xuICAgIGNvbnN0IGVudHJ5Q29kZSA9IHNhZmVUZXh0KGVudHJ5Py52YWx1ZSB8fCBlbnRyeT8uVmFsdWUpO1xuICAgIHJldHVybiBlbnRyeUNvZGUgPT09IHR5cGVWYWx1ZUNvZGU7XG4gIH0pO1xuXG4gIHJldHVybiBzYWZlVGV4dChtYXRjaD8udGV4dCB8fCBtYXRjaD8uVGV4dCkgfHwgdHlwZVZhbHVlQ29kZTtcbn07XG5cbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9saXN0IGl0ZW0gY29udHJhY3QgdG8gbGlzdCBjYXJkIFVJIG1vZGVsLlxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkID0gKGl0ZW06IEV4cGVuc2VTaGVldExpc3RJdGVtRHRvKTogRXhwZW5zZVNoZWV0Q2FyZCA9PiB7XG4gIHJldHVybiB7XG4gICAgaG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChpdGVtLkhvamFHYXN0b3NJZCksXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KGl0ZW0uRGVzY3JpcHRpb24pLFxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogdG9OdWxsYWJsZU51bWJlcihpdGVtLkV4cGVuc2VTaGVldFN0YXR1cyksXG4gICAgZXN0YWRvQ29tZW50YXJpb3M6IHNhZmVUZXh0KGl0ZW0uRXN0YWRvQ29tZW50YXJpb3MpIHx8IG51bGwsXG4gICAgdXNlcklkOiBzYWZlVGV4dChpdGVtLlVzZXJJZCksXG4gICAgdm91Y2hlcjogc2FmZVRleHQoaXRlbS5Wb3VjaGVyKSxcbiAgICBwcm9qSWQ6IHNhZmVUZXh0KGl0ZW0uUHJvaklkKSxcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGl0ZW0uQ3VycmVuY3lDb2RlKSxcbiAgICB0b3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihpdGVtLlRvdGFsQW1vdW50KSxcbiAgICBleGNoUmF0ZTogdG9OdWxsYWJsZU51bWJlcihpdGVtLkV4Y2hSYXRlKSxcbiAgICBleGNoYW5nZVJhdGVNb2RlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uRXhjaGFuZ2VSYXRlTW9kZSksXG4gICAgY3JlYXRlZERhdGU6IHNhZmVUZXh0KGl0ZW0uQ3JlYXRlZERhdGUpLFxuICB9O1xufTtcblxuLy8gTWFwcyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9IGhlYWRlciBjb250cmFjdCB0byBVSSBtb2RlbC5cbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRIZWFkZXIgPSAoc2hlZXQ6IEV4cGVuc2VTaGVldERldGFpbER0byk6IEV4cGVuc2VTaGVldEhlYWRlciA9PiB7XG4gIHJldHVybiB7XG4gICAgaG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChzaGVldC5Ib2phR2FzdG9zSWQpLFxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChzaGVldC5EZXNjcmlwdGlvbiksXG4gICAgdXNlcklkOiBzYWZlVGV4dChzaGVldC5Vc2VySWQpLFxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogdG9OdWxsYWJsZU51bWJlcihzaGVldC5FeHBlbnNlU2hlZXRTdGF0dXMpLFxuICAgIGVzdGFkb0NvbWVudGFyaW9zOiBzYWZlVGV4dChzaGVldC5Fc3RhZG9Db21lbnRhcmlvcykgfHwgbnVsbCxcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KHNoZWV0LkN1cnJlbmN5Q29kZSksXG4gICAgdG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoc2hlZXQuVG90YWxBbW91bnQpLFxuICAgIGV4Y2hSYXRlOiBzYWZlVGV4dChzaGVldC5FeGNoUmF0ZSksXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogdG9OdWxsYWJsZU51bWJlcihzaGVldC5FeGNoYW5nZVJhdGVNb2RlKSxcbiAgICBwcm9qSWQ6IHNhZmVUZXh0KHNoZWV0LlByb2pJZCksXG4gICAgdm91Y2hlcjogc2FmZVRleHQoc2hlZXQuVm91Y2hlciksXG4gICAgY3JlYXRlZERhdGU6IHNhZmVUZXh0KHNoZWV0LkNyZWF0ZWREYXRlKSxcbiAgfTtcbn07XG5cbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfSBsaW5lIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldExpbmUgPSAobGluZTogRXhwZW5zZVNoZWV0TGluZUR0byk6IEV4cGVuc2VTaGVldExpbmUgPT4ge1xuICBjb25zdCB0eXBlVmFsdWVDb2RlID0gc2FmZVRleHQobGluZS5UeXBlVmFsdWUpO1xuICBjb25zdCBsZWdhY3lQcmljZSA9IChsaW5lIGFzIHsgcHJpY2U/OiB1bmtub3duIH0pLnByaWNlO1xuICBjb25zdCBsZWdhY3lGaWxlSWQgPSAobGluZSBhcyB7IGZpbGVJZD86IHVua25vd24gfSkuZmlsZUlkO1xuXG4gIHJldHVybiB7XG4gICAgbGluZVJlY0lkOiBzYWZlVGV4dChsaW5lLlJlY0lkKSxcbiAgICB0cmFuc0RhdGU6IHNhZmVUZXh0KGxpbmUuVHJhbnNEYXRlKSxcbiAgICB0eXBlVmFsdWVDb2RlLFxuICAgIHR5cGVWYWx1ZTogcmVzb2x2ZVR5cGVMYWJlbCh0eXBlVmFsdWVDb2RlKSxcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQobGluZS5EZXNjcmlwdGlvbiksXG4gICAgaW50ZXJuYWNpb25hbDogdG9OdWxsYWJsZUJvb2wobGluZS5JbnRlcm5hY2lvbmFsKSxcbiAgICBmaWxlSWQ6IHNhZmVUZXh0KGxpbmUuRmlsZUlkID8/IGxlZ2FjeUZpbGVJZCksXG4gICAgdGlja2V0OiB0b051bGxhYmxlQm9vbChsaW5lLlRpY2tldCksXG4gICAgcHJpY2U6IHRvTnVsbGFibGVOdW1iZXIobGluZS5QcmljZSA/PyBsZWdhY3lQcmljZSksXG4gICAgcXR5OiB0b051bGxhYmxlTnVtYmVyKGxpbmUuUXR5KSxcbiAgICBhbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIobGluZS5BbW91bnQpLFxuICAgIHByb2pJZDogc2FmZVRleHQobGluZS5Qcm9qSWQpLFxuICAgIGluZEF0dGFjaEZpbGVzOiBzYWZlVGV4dChsaW5lLkluZEF0dGFjaEZpbGVzKSxcbiAgfTtcbn07XHJcbiIsICJpbXBvcnQgeyBBcGlGZXRjaEVycm9yLCBmZXRjaEpzb24sIGdldENzcmZUb2tlbiwgdHlwZSBBcGlGZXRjaE9wdGlvbnMgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHR5cGUge1xuICBFbnRyYUNvbnRleHREdG8sXG4gIEVudHJhQ29udGV4dFJlcXVlc3QsXG4gIEV4Y2hhbmdlUmF0ZUR0byxcbiAgRnVlbFByaWNlS21EdG8sXG4gIEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvLFxuICBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRDcmVhdGVSZXNwb25zZURhdGEsXG4gIEV4cGVuc2VTaGVldERldGFpbER0byxcbiAgRXhwZW5zZVNoZWV0RHJhZnRSZXNwb25zZSxcbiAgRXhwZW5zZVNoZWV0SGVhZGVyVXBkYXRlUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0TGluZUR0byxcbiAgRXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXNwb25zZURhdGEsXG4gIEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byxcbiAgRXhwZW5zZVNoZWV0VGlja2V0Q3JlYXRlUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvLFxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5lUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8sXG4gIEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldFRpY2tldFVwZGF0ZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvLFxuICBJbmRBcGlSZXNwb25zZSxcbiAgSW5kUGFnZWRSZXNwb25zZSxcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHtcbiAgaXNOb25OZWdhdGl2ZU51bWJlciBhcyBpc05vbk5lZ2F0aXZlTnVtYmVyVHJhbnNmb3JtLFxuICBpc1Bvc2l0aXZlTnVtYmVyIGFzIGlzUG9zaXRpdmVOdW1iZXJUcmFuc2Zvcm0sXG4gIG5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXIgYXMgbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlclRyYW5zZm9ybSxcbiAgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUgYXMgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGVUcmFuc2Zvcm0sXG4gIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSSBhcyBub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUlUcmFuc2Zvcm0sXG4gIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzIGFzIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzVHJhbnNmb3JtLFxuICBub3JtYWxpemVPcHRpb25hbEFwaURhdGUgYXMgbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlVHJhbnNmb3JtLFxuICBub3JtYWxpemVSZXF1aXJlZEFwaURhdGUgYXMgbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlVHJhbnNmb3JtLFxuICBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZSBhcyBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZVRyYW5zZm9ybSxcbiAgbm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZSBhcyBub3JtYWxpemVUaWNrZXRMaXN0R2FzdG9UeXBlVHJhbnNmb3JtLFxuICBzYWZlVGV4dCBhcyBzYWZlVGV4dFRyYW5zZm9ybSxcbiAgdG9GbGFnQm9vbCBhcyB0b0ZsYWdCb29sVHJhbnNmb3JtLFxuICB0b051bGxhYmxlQm9vbCBhcyB0b051bGxhYmxlQm9vbFRyYW5zZm9ybSxcbiAgdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUgYXMgdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGVUcmFuc2Zvcm0sXG4gIHRvTnVsbGFibGVOdW1iZXIgYXMgdG9OdWxsYWJsZU51bWJlclRyYW5zZm9ybSxcbiAgdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGUgYXMgdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGVUcmFuc2Zvcm0sXG59IGZyb20gXCIuL2V4cGVuc2VBcGlUcmFuc2Zvcm1zLnRzXCI7XG5pbXBvcnQge1xuICBub3JtYWxpemVBcGlSZXNwb25zZSBhcyBub3JtYWxpemVBcGlSZXNwb25zZVRyYW5zZm9ybSxcbiAgbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlIGFzIG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcbiAgbm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxuICBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcbiAgbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxuICBub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlIGFzIG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm0sXG4gIG5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlIGFzIG5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxufSBmcm9tIFwiLi9leHBlbnNlQXBpUmVzcG9uc2VOb3JtYWxpemVycy50c1wiO1xuaW1wb3J0IHtcbiAgbWFwRXhwZW5zZVNoZWV0SGVhZGVyIGFzIG1hcEV4cGVuc2VTaGVldEhlYWRlckNvcmUsXG4gIG1hcEV4cGVuc2VTaGVldExpbmUgYXMgbWFwRXhwZW5zZVNoZWV0TGluZUNvcmUsXG4gIG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkIGFzIG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkQ29yZSxcbn0gZnJvbSBcIi4vZXhwZW5zZUFwaU1hcHBlcnMudHNcIjtcbmltcG9ydCB7IEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UgfSBmcm9tIFwiLi9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlIH0gZnJvbSBcIi4vZXhwZW5zZUFjdGluZ1VzZXIudHNcIjtcblxudHlwZSBQcm9qZWN0RHJvcGRvd25SZXNwb25zZSA9IHtcbiAgdG90YWw/OiBudW1iZXI7XG4gIGl0ZW1zPzogQXJyYXk8eyB2YWx1ZT86IHN0cmluZzsgdGV4dD86IHN0cmluZyB9Pjtcbn07XG5cbnR5cGUgTGVnYWN5RXhwZW5zZUxpc3RJdGVtID0ge1xuICBob2phR2FzdG9zSWQ/OiB1bmtub3duO1xuICBkZXNjcmlwdGlvbj86IHVua25vd247XG4gIGVzdGFkb0NvbWVudGFyaW9zPzogdW5rbm93bjtcbiAgdm91Y2hlcj86IHVua25vd247XG4gIHByb2pJZD86IHVua25vd247XG4gIGN1cnJlbmN5Q29kZT86IHVua25vd247XG4gIHRvdGFsQW1vdW50PzogdW5rbm93bjtcbiAgdG90YWxBbW91bnRNU1Q/OiB1bmtub3duO1xuICBleGNoUmF0ZT86IHVua25vd247XG4gIHVzZXJJZD86IHVua25vd247XG4gIGV4Y2hhbmdlUmF0ZU1vZGU/OiB1bmtub3duO1xuICBleHBlbnNlU2hlZXRTdGF0dXM/OiB1bmtub3duO1xuICBjcmVhdGVkRGF0ZT86IHVua25vd247XG59O1xuXG50eXBlIExlZ2FjeUV4cGVuc2VMaXN0UmVzcG9uc2UgPSB7XG4gIHN1Y2Nlc3M/OiBib29sZWFuO1xuICBtZXNzYWdlPzogc3RyaW5nO1xuICB0b3RhbD86IG51bWJlcjtcbiAgcGFnZT86IG51bWJlcjtcbiAgcGFnZVNpemU/OiBudW1iZXI7XG4gIGl0ZW1zPzogTGVnYWN5RXhwZW5zZUxpc3RJdGVtW107XG59O1xuXG50eXBlIEV4cGVuc2VBcGlDb250ZXh0ID0ge1xuICB0b2tlbjogc3RyaW5nO1xuICBjb21wYW55SWQ6IHN0cmluZztcbiAgYXhVc2VySWQ6IHN0cmluZztcbiAgY3JtVXNlcklkOiBzdHJpbmc7XG4gIGRlZmF1bHRDdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCB0eXBlIEV4cGVuc2VBcGlDb250ZXh0U25hcHNob3QgPSB7XG4gIGNvbXBhbnlJZDogc3RyaW5nO1xuICBheFVzZXJJZDogc3RyaW5nO1xuICBjcm1Vc2VySWQ6IHN0cmluZztcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcbn07XG5cbnR5cGUgRXhwZW5zZUFwaUF1dGhTZWVkID0ge1xuICB0b2tlbjogc3RyaW5nO1xuICBlbnRyYU9pZDogc3RyaW5nO1xuICBhcHBDb2RlOiBzdHJpbmc7XG4gIHN0cmljdEFwaVJvdXRlczogYm9vbGVhbjtcbn07XG5cbnR5cGUgRXhwZW5zZVdpbmRvd1J1bnRpbWUgPSB7XG4gIF9fSU5EX0FQSV9UT0tFTl9fPzogc3RyaW5nO1xuICBfX0lORF9FTlRSQV9PSURfXz86IHN0cmluZztcbiAgX19JTkRfQVBQX0NPREVfXz86IHN0cmluZztcbiAgX19JTkRfU0VMRUNURURfQ09NUEFOWV9fPzogc3RyaW5nO1xuICBfX0lORF9FWFBFTlNFX1NUUklDVF9BUElfXz86IGJvb2xlYW4gfCBzdHJpbmc7XG4gIF9fRVhQRU5TRV9HQVNUT19UWVBFU19fPzogQXJyYXk8e1xuICAgIHZhbHVlPzogdW5rbm93bjtcbiAgICBWYWx1ZT86IHVua25vd247XG4gICAgdGV4dD86IHVua25vd247XG4gICAgVGV4dD86IHVua25vd247XG4gIH0+O1xufTtcblxuY29uc3QgREVGQVVMVF9BUFBfQ09ERSA9IFwiQ1JNXCI7XG5jb25zdCBKU09OX0hFQURFUlM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxufTtcblxubGV0IHJ1bnRpbWVBdXRoU2VlZDogUGFydGlhbDxFeHBlbnNlQXBpQXV0aFNlZWQ+ID0ge307XG5sZXQgY2FjaGVkQ29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQgfCBudWxsID0gbnVsbDtcbmxldCBjYWNoZWRDb250ZXh0S2V5ID0gXCJcIjtcbmxldCBjb250ZXh0UHJvbWlzZTogUHJvbWlzZTxFeHBlbnNlQXBpQ29udGV4dD4gfCBudWxsID0gbnVsbDtcbmNvbnN0IGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzID0gbmV3IE1hcDxzdHJpbmcsIEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+PigpO1xuY29uc3QgcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMgPSBuZXcgTWFwPHN0cmluZywgUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj4+KCk7XG5cbmNvbnN0IHNhZmVUZXh0ID0gc2FmZVRleHRUcmFuc2Zvcm07XG5cbmNvbnN0IHRyeVBhcnNlSnNvblJlY29yZCA9IChyYXc6IHN0cmluZyk6IFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgbnVsbCA9PiB7XG4gIGlmICghcmF3IHx8ICFyYXcudHJpbSgpKSByZXR1cm4gbnVsbDtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKHJhdyk7XG4gICAgcmV0dXJuIHBhcnNlZCAmJiB0eXBlb2YgcGFyc2VkID09PSBcIm9iamVjdFwiID8gKHBhcnNlZCBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgOiBudWxsO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuY29uc3QgcmVhZEFwaU1lc3NhZ2UgPSAocmF3OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBwYXlsb2FkID0gdHJ5UGFyc2VKc29uUmVjb3JkKHJhdyk7XG4gIGlmICghcGF5bG9hZCkgcmV0dXJuIFwiXCI7XG5cbiAgY29uc3QgdmFsdWUgPSBwYXlsb2FkLk1lc3NhZ2UgPz8gcGF5bG9hZC5tZXNzYWdlO1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiID8gdmFsdWUudHJpbSgpIDogXCJcIjtcbn07XG5cbmNvbnN0IHRvTnVsbGFibGVOdW1iZXIgPSB0b051bGxhYmxlTnVtYmVyVHJhbnNmb3JtO1xuY29uc3QgaXNOb25OZWdhdGl2ZU51bWJlciA9IGlzTm9uTmVnYXRpdmVOdW1iZXJUcmFuc2Zvcm07XG5jb25zdCBpc1Bvc2l0aXZlTnVtYmVyID0gaXNQb3NpdGl2ZU51bWJlclRyYW5zZm9ybTtcbmNvbnN0IHRvTnVsbGFibGVUaWNrZXRTdGF0dXNDb2RlID0gdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGVUcmFuc2Zvcm07XG5jb25zdCB0b051bGxhYmxlR2FzdG9UeXBlQ29kZSA9IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlVHJhbnNmb3JtO1xuY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUgPSBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZVRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpc3RHYXN0b1R5cGUgPSBub3JtYWxpemVUaWNrZXRMaXN0R2FzdG9UeXBlVHJhbnNmb3JtO1xuY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRTdGF0dXMgPSBub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1c1RyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZVRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZSA9IG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZVRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpc3REYXRlID0gbm9ybWFsaXplVGlja2V0TGlzdERhdGVUcmFuc2Zvcm07XG5jb25zdCB0b051bGxhYmxlQm9vbCA9IHRvTnVsbGFibGVCb29sVHJhbnNmb3JtO1xuY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRQcm9jZXNzZWRCeUFJID0gbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRQcm9jZXNzZWRCeUFJVHJhbnNmb3JtO1xuY29uc3Qgbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlciA9IG5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXJUcmFuc2Zvcm07XG5jb25zdCB0b0ZsYWdCb29sID0gdG9GbGFnQm9vbFRyYW5zZm9ybTtcblxuY29uc3QgcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lID0gKCk6IEV4cGVuc2VXaW5kb3dSdW50aW1lID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiB7fTtcbiAgcmV0dXJuIHdpbmRvdyBhcyB1bmtub3duIGFzIEV4cGVuc2VXaW5kb3dSdW50aW1lO1xufTtcblxuY29uc3Qgc2FuaXRpemVIZWFkZXJzID0gKGhlYWRlcnM6IEhlYWRlcnNJbml0IHwgdW5kZWZpbmVkKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9PiB7XG4gIGlmICghaGVhZGVycykgcmV0dXJuIHt9O1xuXG4gIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgIGNvbnN0IHJlc3VsdDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xuICAgIGhlYWRlcnMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcbiAgICByZXR1cm4gaGVhZGVycy5yZWR1Y2U8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4oKGFjYywgW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICBhY2NbU3RyaW5nKGtleSldID0gU3RyaW5nKHZhbHVlKTtcbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGhlYWRlcnMpLnJlZHVjZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PigoYWNjLCBba2V5LCB2YWx1ZV0pID0+IHtcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuIGFjYztcbiAgICBhY2Nba2V5XSA9IFN0cmluZyh2YWx1ZSk7XG4gICAgcmV0dXJuIGFjYztcbiAgfSwge30pO1xufTtcblxuY29uc3QgZ2V0SGVhZGVyVmFsdWUgPSAoaGVhZGVyczogSGVhZGVyc0luaXQgfCB1bmRlZmluZWQsIGtleTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZEtleSA9IGtleS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHNhbml0aXplSGVhZGVycyhoZWFkZXJzKSk7XG4gIGNvbnN0IG1hdGNoID0gZW50cmllcy5maW5kKChbaGVhZGVyS2V5XSkgPT4gaGVhZGVyS2V5LnRyaW0oKS50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkS2V5KTtcbiAgcmV0dXJuIHNhZmVUZXh0KG1hdGNoPy5bMV0pO1xufTtcblxuY29uc3QgcmVtb3ZlSGVhZGVyVmFsdWUgPSAoaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiwga2V5OiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZEtleSA9IGtleS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgdG9EZWxldGUgPSBPYmplY3Qua2V5cyhoZWFkZXJzKS5maW5kKChoZWFkZXJLZXkpID0+IGhlYWRlcktleS50cmltKCkudG9Mb3dlckNhc2UoKSA9PT0gbm9ybWFsaXplZEtleSk7XG4gIGlmICghdG9EZWxldGUpIHJldHVybjtcbiAgZGVsZXRlIGhlYWRlcnNbdG9EZWxldGVdO1xufTtcblxuY29uc3QgcmVzb2x2ZUJlYXJlclRva2VuID0gKGhlYWRlcnM6IEhlYWRlcnNJbml0IHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcbiAgY29uc3QgYXV0aG9yaXphdGlvbiA9IGdldEhlYWRlclZhbHVlKGhlYWRlcnMsIFwiQXV0aG9yaXphdGlvblwiKTtcbiAgaWYgKCFhdXRob3JpemF0aW9uKSByZXR1cm4gXCJcIjtcblxuICBpZiAoL15iZWFyZXJcXHMrL2kudGVzdChhdXRob3JpemF0aW9uKSkge1xuICAgIHJldHVybiBhdXRob3JpemF0aW9uLnJlcGxhY2UoL15iZWFyZXJcXHMrL2ksIFwiXCIpLnRyaW0oKTtcbiAgfVxuXG4gIHJldHVybiBhdXRob3JpemF0aW9uLnRyaW0oKTtcbn07XG5cbmNvbnN0IHJlYWRXaW5kb3dBdXRoU2VlZCA9ICgpOiBQYXJ0aWFsPEV4cGVuc2VBcGlBdXRoU2VlZD4gPT4ge1xuICBjb25zdCBydW50aW1lV2luZG93ID0gcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lKCk7XG5cbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogc2FmZVRleHQocnVudGltZVdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHJ1bnRpbWVXaW5kb3cuX19JTkRfRU5UUkFfT0lEX18pLFxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHJ1bnRpbWVXaW5kb3cuX19JTkRfQVBQX0NPREVfXyksXG4gICAgc3RyaWN0QXBpUm91dGVzOiB0b0ZsYWdCb29sKHJ1bnRpbWVXaW5kb3cuX19JTkRfRVhQRU5TRV9TVFJJQ1RfQVBJX18pID09PSB0cnVlLFxuICB9O1xufTtcblxuY29uc3QgcmVhZFJ1bnRpbWVTdHJpY3RBcGlGbGFnID0gKCk6IGJvb2xlYW4gPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGZhbHNlO1xuICBjb25zdCBydW50aW1lV2luZG93ID0gcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lKCk7XG5cbiAgY29uc3QgZXhwbGljaXRXaW5kb3dGbGFnID0gdG9GbGFnQm9vbChydW50aW1lV2luZG93Ll9fSU5EX0VYUEVOU0VfU1RSSUNUX0FQSV9fKTtcbiAgcmV0dXJuIGV4cGxpY2l0V2luZG93RmxhZyA9PT0gdHJ1ZTtcbn07XG5cbmNvbnN0IHJlYWRXaW5kb3dTZWxlY3RlZENvbXBhbnkgPSAoKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIHNhZmVUZXh0KHJlYWRFeHBlbnNlV2luZG93UnVudGltZSgpLl9fSU5EX1NFTEVDVEVEX0NPTVBBTllfXykudG9VcHBlckNhc2UoKTtcbn07XG5cbmNvbnN0IGJ1aWxkQ29udGV4dEtleSA9IChzZWVkOiBFeHBlbnNlQXBpQXV0aFNlZWQpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gYCR7c2VlZC50b2tlbn18JHtzZWVkLmVudHJhT2lkfXwke3NlZWQuYXBwQ29kZX18JHtyZWFkV2luZG93U2VsZWN0ZWRDb21wYW55KCl9YDtcbn07XG5cbmNvbnN0IGJ1aWxkRXhwZW5zZUhlYWRlcnMgPSAoXG4gIGNvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zLFxuICBpbmNsdWRlSnNvbiA9IGZhbHNlLFxuICBpbmNsdWRlQXhVc2VySWQgPSB0cnVlXG4pOiBIZWFkZXJzSW5pdCA9PiB7XG4gIGNvbnN0IGJhc2UgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XG4gIGNvbnN0IG1lcmdlZDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHsgLi4uYmFzZSB9O1xuXG4gIGlmIChzYWZlVGV4dChjb250ZXh0LnRva2VuKSkge1xuICAgIG1lcmdlZC5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke2NvbnRleHQudG9rZW59YDtcbiAgfVxuXG4gIGlmIChzYWZlVGV4dChjb250ZXh0LmNvbXBhbnlJZCkpIHtcbiAgICBtZXJnZWRbXCJYLUlORC1Db21wYW55XCJdID0gY29udGV4dC5jb21wYW55SWQ7XG4gIH1cblxuICBpZiAoaW5jbHVkZUF4VXNlcklkKSB7XG4gICAgY29uc3QgcmVxdWVzdEF4VXNlcklkID0gZ2V0SGVhZGVyVmFsdWUob3B0aW9ucz8uaGVhZGVycywgXCJYLUlORC1BeFVzZXJJZFwiKTtcbiAgICBjb25zdCBvdmVycmlkZUF4VXNlcklkID0gZ2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSgpO1xuICAgIGNvbnN0IHJlc29sdmVkQXhVc2VySWQgPSBzYWZlVGV4dChyZXF1ZXN0QXhVc2VySWQgfHwgb3ZlcnJpZGVBeFVzZXJJZCB8fCBjb250ZXh0LmF4VXNlcklkKTtcbiAgICBpZiAocmVzb2x2ZWRBeFVzZXJJZCkge1xuICAgICAgbWVyZ2VkW1wiWC1JTkQtQXhVc2VySWRcIl0gPSByZXNvbHZlZEF4VXNlcklkO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmVIZWFkZXJWYWx1ZShtZXJnZWQsIFwiWC1JTkQtQXhVc2VySWRcIik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJlbW92ZUhlYWRlclZhbHVlKG1lcmdlZCwgXCJYLUlORC1BeFVzZXJJZFwiKTtcbiAgfVxuXG4gIGlmIChpbmNsdWRlSnNvbikge1xuICAgIG1lcmdlZFtcIkNvbnRlbnQtVHlwZVwiXSA9IFwiYXBwbGljYXRpb24vanNvblwiO1xuICB9XG5cbiAgcmV0dXJuIG1lcmdlZDtcbn07XG5cbmNvbnN0IGJ1aWxkRXhwZW5zZUZvcm1IZWFkZXJzID0gKGNvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0LCBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogSGVhZGVyc0luaXQgPT4ge1xuICBjb25zdCBoZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgZmFsc2UpKTtcbiAgcmVtb3ZlSGVhZGVyVmFsdWUoaGVhZGVycywgXCJDb250ZW50LVR5cGVcIik7XG4gIHJldHVybiBoZWFkZXJzO1xufTtcblxuY29uc3QgYnVpbGRDb250ZXh0SGVhZGVycyA9ICh0b2tlbjogc3RyaW5nLCBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogSGVhZGVyc0luaXQgPT4ge1xuICBjb25zdCBiYXNlID0gc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpO1xuICBjb25zdCBtZXJnZWQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgLi4uYmFzZSxcbiAgICAuLi5KU09OX0hFQURFUlMsXG4gIH07XG5cbiAgaWYgKHNhZmVUZXh0KHRva2VuKSkge1xuICAgIG1lcmdlZC5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke3Rva2VufWA7XG4gIH1cblxuICByZXR1cm4gbWVyZ2VkO1xufTtcblxuY29uc3QgcmVzb2x2ZUF1dGhUb2tlbiA9IChvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogc3RyaW5nID0+IHtcbiAgY29uc3QgdG9rZW5Gcm9tSGVhZGVycyA9IHJlc29sdmVCZWFyZXJUb2tlbihvcHRpb25zPy5oZWFkZXJzKTtcbiAgY29uc3Qgd2luZG93U2VlZCA9IHJlYWRXaW5kb3dBdXRoU2VlZCgpO1xuICByZXR1cm4gc2FmZVRleHQodG9rZW5Gcm9tSGVhZGVycyB8fCBydW50aW1lQXV0aFNlZWQudG9rZW4gfHwgd2luZG93U2VlZC50b2tlbik7XG59O1xuXG5jb25zdCByZXNvbHZlQXV0aFNlZWQgPSAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IEV4cGVuc2VBcGlBdXRoU2VlZCA9PiB7XG4gIGNvbnN0IHdpbmRvd1NlZWQgPSByZWFkV2luZG93QXV0aFNlZWQoKTtcbiAgY29uc3QgdG9rZW4gPSByZXNvbHZlQXV0aFRva2VuKG9wdGlvbnMpO1xuICBjb25zdCBlbnRyYU9pZCA9IHNhZmVUZXh0KHJ1bnRpbWVBdXRoU2VlZC5lbnRyYU9pZCB8fCB3aW5kb3dTZWVkLmVudHJhT2lkKTtcbiAgY29uc3QgYXBwQ29kZSA9IHNhZmVUZXh0KHJ1bnRpbWVBdXRoU2VlZC5hcHBDb2RlIHx8IHdpbmRvd1NlZWQuYXBwQ29kZSB8fCBERUZBVUxUX0FQUF9DT0RFKSB8fCBERUZBVUxUX0FQUF9DT0RFO1xuICBjb25zdCBzdHJpY3RBcGlSb3V0ZXMgPVxuICAgIHR5cGVvZiBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzID09PSBcImJvb2xlYW5cIlxuICAgICAgPyBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzXG4gICAgICA6ICh3aW5kb3dTZWVkLnN0cmljdEFwaVJvdXRlcyA9PT0gdHJ1ZSk7XG5cbiAgcmV0dXJuIHtcbiAgICB0b2tlbixcbiAgICBlbnRyYU9pZCxcbiAgICBhcHBDb2RlLFxuICAgIHN0cmljdEFwaVJvdXRlcyxcbiAgfTtcbn07XG5cbnR5cGUgUmF3RW50cmFDb250ZXh0Q29tcGFueSA9IHtcbiAgQ29tcGFueUlkPzogdW5rbm93bjtcbiAgY29tcGFueUlkPzogdW5rbm93bjtcbiAgSXNEZWZhdWx0PzogdW5rbm93bjtcbiAgaXNEZWZhdWx0PzogdW5rbm93bjtcbiAgQWxsb3dTZWxmTWFuYWdlbWVudD86IHVua25vd247XG4gIGFsbG93U2VsZk1hbmFnZW1lbnQ/OiB1bmtub3duO1xuICBDcm1Vc2VySWQ/OiB1bmtub3duO1xuICBjcm1Vc2VySWQ/OiB1bmtub3duO1xufTtcblxudHlwZSBOb3JtYWxpemVkRW50cmFDb250ZXh0Q29tcGFueSA9IHtcbiAgY29tcGFueUlkOiBzdHJpbmc7XG4gIGlzRGVmYXVsdDogYm9vbGVhbjtcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcbiAgY3JtVXNlcklkOiBzdHJpbmc7XG59O1xuXG50eXBlIFJhd0VudHJhQ29udGV4dEhlYWRlciA9IHtcbiAgQXhVc2VySWQ/OiB1bmtub3duO1xuICBheFVzZXJJZD86IHVua25vd247XG4gIERlZmF1bHRDb21wYW55PzogdW5rbm93bjtcbiAgZGVmYXVsdENvbXBhbnk/OiB1bmtub3duO1xuICBEZWZhdWx0Q3VycmVuY3lDb2RlPzogdW5rbm93bjtcbiAgZGVmYXVsdEN1cnJlbmN5Q29kZT86IHVua25vd247XG59O1xuXG50eXBlIFJhd0VudHJhQ29udGV4dEl0ZW0gPSB7XG4gIEhlYWRlcj86IFJhd0VudHJhQ29udGV4dEhlYWRlcjtcbiAgaGVhZGVyPzogUmF3RW50cmFDb250ZXh0SGVhZGVyO1xuICBDb21wYW5pZXM/OiB1bmtub3duO1xuICBjb21wYW5pZXM/OiB1bmtub3duO1xufTtcblxuLy8gTWFwcyBvbmUgRW50cmEgY29tcGFueSBpdGVtIHRvIHRoZSBmcm9udGVuZC1zYWZlIHNoYXBlIHVzZWQgYnkgY29udGV4dCBjb25zdW1lcnMuXG5jb25zdCBtYXBFbnRyYUNvbnRleHRDb21wYW55ID0gKGl0ZW06IHVua25vd24pOiBOb3JtYWxpemVkRW50cmFDb250ZXh0Q29tcGFueSB8IG51bGwgPT4ge1xuICBpZiAoIWl0ZW0gfHwgdHlwZW9mIGl0ZW0gIT09IFwib2JqZWN0XCIpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHJhdyA9IGl0ZW0gYXMgUmF3RW50cmFDb250ZXh0Q29tcGFueTtcbiAgY29uc3QgY29tcGFueUlkID0gc2FmZVRleHQocmF3LkNvbXBhbnlJZCA/PyByYXcuY29tcGFueUlkKTtcbiAgaWYgKCFjb21wYW55SWQpIHJldHVybiBudWxsO1xuXG4gIHJldHVybiB7XG4gICAgY29tcGFueUlkLFxuICAgIGlzRGVmYXVsdDogdG9GbGFnQm9vbChyYXcuSXNEZWZhdWx0ID8/IHJhdy5pc0RlZmF1bHQpID09PSB0cnVlLFxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQ6IHRvRmxhZ0Jvb2wocmF3LkFsbG93U2VsZk1hbmFnZW1lbnQgPz8gcmF3LmFsbG93U2VsZk1hbmFnZW1lbnQpID09PSB0cnVlLFxuICAgIGNybVVzZXJJZDogc2FmZVRleHQocmF3LkNybVVzZXJJZCA/PyByYXcuY3JtVXNlcklkKSxcbiAgfTtcbn07XG5cbmNvbnN0IHZhbGlkYXRlQ29udGV4dFJlc3BvbnNlID0gKHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEVudHJhQ29udGV4dER0bz4pOiBFeHBlbnNlQXBpQ29udGV4dCA9PiB7XG4gIGNvbnN0IHJhd1Jlc3BvbnNlID0gcmVzcG9uc2UgYXMge1xuICAgIFN1Y2Nlc3M/OiB1bmtub3duO1xuICAgIHN1Y2Nlc3M/OiB1bmtub3duO1xuICAgIE1lc3NhZ2U/OiB1bmtub3duO1xuICAgIG1lc3NhZ2U/OiB1bmtub3duO1xuICAgIEl0ZW1zPzogdW5rbm93bjtcbiAgICBpdGVtcz86IHVua25vd247XG4gIH07XG5cbiAgY29uc3QgaXNTdWNjZXNzID0gdG9GbGFnQm9vbChyYXdSZXNwb25zZS5TdWNjZXNzID8/IHJhd1Jlc3BvbnNlLnN1Y2Nlc3MpO1xuICBpZiAoaXNTdWNjZXNzID09PSBmYWxzZSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKHNhZmVUZXh0KHJhd1Jlc3BvbnNlLk1lc3NhZ2UgPz8gcmF3UmVzcG9uc2UubWVzc2FnZSkgfHwgXCJDb3VsZCBub3QgbG9hZCBFbnRyYSBjb250ZXh0LlwiKTtcbiAgfVxuXG4gIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyYXdSZXNwb25zZS5JdGVtcylcbiAgICA/IHJhd1Jlc3BvbnNlLkl0ZW1zXG4gICAgOiAoQXJyYXkuaXNBcnJheShyYXdSZXNwb25zZS5pdGVtcykgPyByYXdSZXNwb25zZS5pdGVtcyA6IFtdKTtcbiAgY29uc3QgZmlyc3QgPSBpdGVtc1swXSBhcyBSYXdFbnRyYUNvbnRleHRJdGVtIHwgdW5kZWZpbmVkO1xuICBjb25zdCBoZWFkZXIgPSBmaXJzdD8uSGVhZGVyID8/IGZpcnN0Py5oZWFkZXI7XG4gIGlmICghZmlyc3QgfHwgIWhlYWRlcikge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiQ291bGQgbm90IGxvYWQgRW50cmEgY29udGV4dC5cIik7XG4gIH1cblxuICBjb25zdCBheFVzZXJJZCA9IHNhZmVUZXh0KGhlYWRlci5BeFVzZXJJZCA/PyBoZWFkZXIuYXhVc2VySWQpO1xuICBjb25zdCBkZWZhdWx0Q29tcGFueSA9IHNhZmVUZXh0KGhlYWRlci5EZWZhdWx0Q29tcGFueSA/PyBoZWFkZXIuZGVmYXVsdENvbXBhbnkpO1xuICBjb25zdCBkZWZhdWx0Q3VycmVuY3lDb2RlID0gc2FmZVRleHQoaGVhZGVyLkRlZmF1bHRDdXJyZW5jeUNvZGUgPz8gaGVhZGVyLmRlZmF1bHRDdXJyZW5jeUNvZGUpO1xuICBjb25zdCBjb21wYW5pZXNSYXcgPSBBcnJheS5pc0FycmF5KGZpcnN0LkNvbXBhbmllcylcbiAgICA/IGZpcnN0LkNvbXBhbmllc1xuICAgIDogKEFycmF5LmlzQXJyYXkoZmlyc3QuY29tcGFuaWVzKSA/IGZpcnN0LmNvbXBhbmllcyA6IFtdKTtcbiAgY29uc3QgY29tcGFuaWVzID0gY29tcGFuaWVzUmF3XG4gICAgLm1hcCgoaXRlbSkgPT4gbWFwRW50cmFDb250ZXh0Q29tcGFueShpdGVtKSlcbiAgICAuZmlsdGVyKChpdGVtKTogaXRlbSBpcyBOb3JtYWxpemVkRW50cmFDb250ZXh0Q29tcGFueSA9PiAhIWl0ZW0pO1xuICBjb25zdCBmYWxsYmFja0NvbXBhbnkgPSBzYWZlVGV4dChjb21wYW5pZXMuZmluZCgoaXRlbSkgPT4gaXRlbS5pc0RlZmF1bHQpPy5jb21wYW55SWQpO1xuICBjb25zdCBjb21wYW55SWQgPSBkZWZhdWx0Q29tcGFueSB8fCBmYWxsYmFja0NvbXBhbnk7XG4gIGNvbnN0IHNlbGVjdGVkQ29tcGFueSA9IGNvbXBhbmllcy5maW5kKChpdGVtKSA9PiBzYWZlVGV4dChpdGVtLmNvbXBhbnlJZCkgPT09IGNvbXBhbnlJZCkgfHwgY29tcGFuaWVzWzBdO1xuICBjb25zdCBhbGxvd1NlbGZNYW5hZ2VtZW50ID0gc2VsZWN0ZWRDb21wYW55Py5hbGxvd1NlbGZNYW5hZ2VtZW50ID09PSB0cnVlO1xuICBjb25zdCBjcm1Vc2VySWQgPSBzYWZlVGV4dChzZWxlY3RlZENvbXBhbnk/LmNybVVzZXJJZCk7XG5cbiAgaWYgKCFheFVzZXJJZCB8fCAhY29tcGFueUlkKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJDb3VsZCBub3QgcmVzb2x2ZSBFbnRyYSBjb21wYW55IGNvbnRleHQuXCIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogXCJcIixcbiAgICBjb21wYW55SWQsXG4gICAgYXhVc2VySWQsXG4gICAgY3JtVXNlcklkLFxuICAgIGRlZmF1bHRDdXJyZW5jeUNvZGUsXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcbiAgfTtcbn07XG5cbmNvbnN0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0ID0gYXN5bmMgKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBQcm9taXNlPEV4cGVuc2VBcGlDb250ZXh0PiA9PiB7XG4gIGNvbnN0IHNlZWQgPSByZXNvbHZlQXV0aFNlZWQob3B0aW9ucyk7XG4gIGNvbnN0IGNvbnRleHRLZXkgPSBidWlsZENvbnRleHRLZXkoc2VlZCk7XG5cbiAgaWYgKGNhY2hlZENvbnRleHQgJiYgY2FjaGVkQ29udGV4dEtleSA9PT0gY29udGV4dEtleSkge1xuICAgIHJldHVybiBjYWNoZWRDb250ZXh0O1xuICB9XG5cbiAgaWYgKGNvbnRleHRQcm9taXNlICYmIGNhY2hlZENvbnRleHRLZXkgPT09IGNvbnRleHRLZXkpIHtcbiAgICByZXR1cm4gY29udGV4dFByb21pc2U7XG4gIH1cblxuICBjb25zdCBmYWxsYmFja0NvbXBhbnlJZCA9IHJlYWRXaW5kb3dTZWxlY3RlZENvbXBhbnkoKTtcbiAgaWYgKCFzYWZlVGV4dChzZWVkLmVudHJhT2lkKSAmJiBmYWxsYmFja0NvbXBhbnlJZCkge1xuICAgIGNvbnN0IGZhbGxiYWNrQ29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQgPSB7XG4gICAgICB0b2tlbjogc2VlZC50b2tlbixcbiAgICAgIGNvbXBhbnlJZDogZmFsbGJhY2tDb21wYW55SWQsXG4gICAgICBheFVzZXJJZDogXCJcIixcbiAgICAgIGNybVVzZXJJZDogXCJcIixcbiAgICAgIGRlZmF1bHRDdXJyZW5jeUNvZGU6IFwiXCIsXG4gICAgICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBnbG9iYWxUaGlzLl9fSU5EX0FMTE9XX1NFTEZfTUFOQUdFTUVOVF9fID09PSB0cnVlLFxuICAgIH07XG5cbiAgICBjYWNoZWRDb250ZXh0ID0gZmFsbGJhY2tDb250ZXh0O1xuICAgIGNhY2hlZENvbnRleHRLZXkgPSBjb250ZXh0S2V5O1xuICAgIHJldHVybiBmYWxsYmFja0NvbnRleHQ7XG4gIH1cblxuICBpZiAoIXNhZmVUZXh0KHNlZWQuZW50cmFPaWQpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJNaXNzaW5nIEVudHJhIE9JRCBmb3IgRW50cmEgY29udGV4dCByZXF1ZXN0LlwiKTtcbiAgfVxuXG4gIGNhY2hlZENvbnRleHRLZXkgPSBjb250ZXh0S2V5O1xuICBjb250ZXh0UHJvbWlzZSA9IChhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgY29udGV4dFBheWxvYWQ6IEVudHJhQ29udGV4dFJlcXVlc3QgPSB7XG4gICAgICBlbnRyYU9pZDogc2VlZC5lbnRyYU9pZCxcbiAgICAgIGFwcENvZGU6IHNlZWQuYXBwQ29kZSxcbiAgICB9O1xuXG4gICAgY29uc3QgY29udGV4dFJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RW50cmFDb250ZXh0RHRvPj4oXCIvYXBpL2F1dGgvZW50cmEvY29udGV4dFwiLCB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkQ29udGV4dEhlYWRlcnMoc2VlZC50b2tlbiwgb3B0aW9ucyksXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjb250ZXh0UGF5bG9hZCksXG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNvbHZlZCA9IHZhbGlkYXRlQ29udGV4dFJlc3BvbnNlKGNvbnRleHRSZXNwb25zZSk7XG4gICAgY29uc3QgbmV4dENvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0ID0ge1xuICAgICAgLi4ucmVzb2x2ZWQsXG4gICAgICB0b2tlbjogc2VlZC50b2tlbixcbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHdpbmRvdy5fX0lORF9BTExPV19TRUxGX01BTkFHRU1FTlRfXyA9IG5leHRDb250ZXh0LmFsbG93U2VsZk1hbmFnZW1lbnQ7XG4gICAgfVxuXG4gICAgY2FjaGVkQ29udGV4dCA9IG5leHRDb250ZXh0O1xuICAgIHJldHVybiBuZXh0Q29udGV4dDtcbiAgfSkoKTtcblxuICB0cnkge1xuICAgIHJldHVybiBhd2FpdCBjb250ZXh0UHJvbWlzZTtcbiAgfSBmaW5hbGx5IHtcbiAgICBjb250ZXh0UHJvbWlzZSA9IG51bGw7XG4gIH1cbn07XG5cbi8vIEV4cG9zZXMgcmVzb2x2ZWQgRW50cmEgY29udGV4dCB2YWx1ZXMgbmVlZGVkIGJ5IEdhc3RvcyBVSSBtYW5hZ2VtZW50IHN0YXRlLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VBcGlDb250ZXh0U25hcHNob3QgPSBhc3luYyAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IFByb21pc2U8RXhwZW5zZUFwaUNvbnRleHRTbmFwc2hvdD4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgY29tcGFueUlkOiBzYWZlVGV4dChjb250ZXh0LmNvbXBhbnlJZCkudG9VcHBlckNhc2UoKSxcbiAgICBheFVzZXJJZDogc2FmZVRleHQoY29udGV4dC5heFVzZXJJZCksXG4gICAgY3JtVXNlcklkOiBzYWZlVGV4dChjb250ZXh0LmNybVVzZXJJZCksXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudDogY29udGV4dC5hbGxvd1NlbGZNYW5hZ2VtZW50ID09PSB0cnVlLFxuICB9O1xufTtcblxuY29uc3Qgbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlVHJhbnNmb3JtO1xuY29uc3Qgbm9ybWFsaXplQXBpUmVzcG9uc2UgPSBub3JtYWxpemVBcGlSZXNwb25zZVRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZVN1Ym9yZGluYXRlc1BhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlVHJhbnNmb3JtO1xuY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlVHJhbnNmb3JtO1xuXG5jb25zdCBsb29rc0xpa2VIdG1sRG9jdW1lbnQgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcbiAgY29uc3QgcmF3ID0gc2FmZVRleHQodmFsdWUpLnRvTG93ZXJDYXNlKCk7XG4gIHJldHVybiByYXcuc3RhcnRzV2l0aChcIjwhZG9jdHlwZSBodG1sXCIpIHx8IHJhdy5zdGFydHNXaXRoKFwiPGh0bWxcIik7XG59O1xuXG5jb25zdCBpc0FwaVJvdXRlVW5hdmFpbGFibGUgPSAoZXJyb3I6IHVua25vd24pOiBlcnJvciBpcyBBcGlGZXRjaEVycm9yID0+IHtcbiAgaWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSkgcmV0dXJuIGZhbHNlO1xuICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDQgfHwgZXJyb3Iuc3RhdHVzID09PSA0MDUpIHJldHVybiB0cnVlO1xuICByZXR1cm4gZXJyb3Iuc3RhdHVzID09PSB1bmRlZmluZWQgJiYgbG9va3NMaWtlSHRtbERvY3VtZW50KGVycm9yLnJlc3BvbnNlQm9keSk7XG59O1xuXG5jb25zdCBpc1N0cmljdEFwaVJvdXRlc0VuYWJsZWQgPSAoKTogYm9vbGVhbiA9PiB7XG4gIGlmICh0eXBlb2YgcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcyA9PT0gXCJib29sZWFuXCIpIHtcbiAgICByZXR1cm4gcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcztcbiAgfVxuXG4gIHJldHVybiByZWFkUnVudGltZVN0cmljdEFwaUZsYWcoKTtcbn07XG5cbmNvbnN0IHNob3VsZFVzZUxlZ2FjeUZhbGxiYWNrID0gKGVycm9yOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XG4gIGlmIChpc1N0cmljdEFwaVJvdXRlc0VuYWJsZWQoKSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gaXNBcGlSb3V0ZVVuYXZhaWxhYmxlKGVycm9yKTtcbn07XG5cbmNvbnN0IHRvTGVnYWN5TGlzdFJlcXVlc3RQYXlsb2FkID0gKHBheWxvYWQ6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0KSA9PiB7XG4gIHJldHVybiB7XG4gICAgZmlsdGVyOiBzYWZlVGV4dChwYXlsb2FkLmZpbHRlciksXG4gICAgaG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChwYXlsb2FkLmZpbHRlciksXG4gICAgYmlsbGVkTW9kZTogcGF5bG9hZC5iaWxsZWRNb2RlID8/IDIsXG4gICAgZnJvbURhdGU6IHNhZmVUZXh0KHBheWxvYWQuY3JlYXRlZERhdGVGcm9tKSxcbiAgICB0b0RhdGU6IHNhZmVUZXh0KHBheWxvYWQuY3JlYXRlZERhdGVUbyksXG4gICAgcHJvamVjdElkOiBzYWZlVGV4dChwYXlsb2FkLnByb2pJZCksXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChwYXlsb2FkLmN1cnJlbmN5Q29kZSksXG4gICAgZXhwZW5zZVNoZWV0U3RhdHVzOiBub3JtYWxpemVFeHBlbnNlU2hlZXRMaXN0U3RhdHVzRmlsdGVyKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzKSxcbiAgICBwYWdlOiBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZC5wYWdlKSAmJiBwYXlsb2FkLnBhZ2UgPiAwID8gcGF5bG9hZC5wYWdlIDogMSxcbiAgICBwYWdlU2l6ZTogTnVtYmVyLmlzRmluaXRlKHBheWxvYWQucGFnZVNpemUpICYmIHBheWxvYWQucGFnZVNpemUgPiAwID8gcGF5bG9hZC5wYWdlU2l6ZSA6IDUwLFxuICB9O1xufTtcblxuY29uc3QgbWFwTGVnYWN5TGlzdEl0ZW1Ub0FwaUxpc3RJdGVtID0gKGl0ZW06IExlZ2FjeUV4cGVuc2VMaXN0SXRlbSk6IEV4cGVuc2VTaGVldExpc3RJdGVtRHRvID0+IHtcbiAgcmV0dXJuIHtcbiAgICBIb2phR2FzdG9zSWQ6IHNhZmVUZXh0KGl0ZW0uaG9qYUdhc3Rvc0lkKSxcbiAgICBEZXNjcmlwdGlvbjogc2FmZVRleHQoaXRlbS5kZXNjcmlwdGlvbiksXG4gICAgRXhwZW5zZVNoZWV0U3RhdHVzOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uZXhwZW5zZVNoZWV0U3RhdHVzKSxcbiAgICBFc3RhZG9Db21lbnRhcmlvczogc2FmZVRleHQoaXRlbS5lc3RhZG9Db21lbnRhcmlvcykgfHwgbnVsbCxcbiAgICBVc2VySWQ6IHNhZmVUZXh0KGl0ZW0udXNlcklkKSB8fCBudWxsLFxuICAgIFZvdWNoZXI6IHNhZmVUZXh0KGl0ZW0udm91Y2hlciksXG4gICAgUHJvaklkOiBzYWZlVGV4dChpdGVtLnByb2pJZCksXG4gICAgQ3VycmVuY3lDb2RlOiBzYWZlVGV4dChpdGVtLmN1cnJlbmN5Q29kZSksXG4gICAgVG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS50b3RhbEFtb3VudCA/PyBpdGVtLnRvdGFsQW1vdW50TVNUKSxcbiAgICBFeGNoUmF0ZTogdG9OdWxsYWJsZU51bWJlcihpdGVtLmV4Y2hSYXRlKSxcbiAgICBFeGNoYW5nZVJhdGVNb2RlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uZXhjaGFuZ2VSYXRlTW9kZSksXG4gICAgQ3JlYXRlZERhdGU6IHNhZmVUZXh0KGl0ZW0uY3JlYXRlZERhdGUpIHx8IG51bGwsXG4gIH07XG59O1xuXG5jb25zdCBtYXBMZWdhY3lMaXN0UmVzcG9uc2UgPSAoXG4gIGxlZ2FjeTogTGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZSxcbiAgZmFsbGJhY2tQYWdlOiBudW1iZXIsXG4gIGZhbGxiYWNrUGFnZVNpemU6IG51bWJlclxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz4gPT4ge1xuICBjb25zdCBsZWdhY3lJdGVtcyA9IEFycmF5LmlzQXJyYXkobGVnYWN5Py5pdGVtcykgPyBsZWdhY3kuaXRlbXMgOiBbXTtcbiAgY29uc3QgbWFwcGVkSXRlbXMgPSBsZWdhY3lJdGVtcy5tYXAoKGVudHJ5KSA9PiBtYXBMZWdhY3lMaXN0SXRlbVRvQXBpTGlzdEl0ZW0oZW50cnkpKTtcblxuICByZXR1cm4ge1xuICAgIFN1Y2Nlc3M6IGxlZ2FjeS5zdWNjZXNzICE9PSBmYWxzZSxcbiAgICBNZXNzYWdlOiBzYWZlVGV4dChsZWdhY3kubWVzc2FnZSkgfHwgXCJPS1wiLFxuICAgIFRvdGFsOiB0b051bGxhYmxlTnVtYmVyKGxlZ2FjeS50b3RhbCkgPz8gbWFwcGVkSXRlbXMubGVuZ3RoLFxuICAgIFBhZ2U6IHRvTnVsbGFibGVOdW1iZXIobGVnYWN5LnBhZ2UpID8/IGZhbGxiYWNrUGFnZSxcbiAgICBQYWdlU2l6ZTogdG9OdWxsYWJsZU51bWJlcihsZWdhY3kucGFnZVNpemUpID8/IGZhbGxiYWNrUGFnZVNpemUsXG4gICAgSXRlbXM6IG1hcHBlZEl0ZW1zLFxuICAgIFRyYWNlSWQ6IHVuZGVmaW5lZCxcbiAgfTtcbn07XG5cbi8vIFNldHMgcnVudGltZSBhdXRoIGlucHV0cyB1c2VkIHRvIHJlc29sdmUgRW50cmEgY29udGV4dCBhbmQgbWFuZGF0b3J5IGV4cGVuc2UgaGVhZGVycy5cbmV4cG9ydCBjb25zdCBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCA9IChzZWVkOiBQYXJ0aWFsPEV4cGVuc2VBcGlBdXRoU2VlZD4pOiB2b2lkID0+IHtcbiAgY29uc3Qgc3RyaWN0RnJvbVNlZWQgPSB0b0ZsYWdCb29sKHNlZWQuc3RyaWN0QXBpUm91dGVzKTtcbiAgY29uc3Qgc3RyaWN0RnJvbVJ1bnRpbWUgPVxuICAgIHR5cGVvZiBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzID09PSBcImJvb2xlYW5cIiA/IHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXMgOiByZWFkUnVudGltZVN0cmljdEFwaUZsYWcoKTtcblxuICBydW50aW1lQXV0aFNlZWQgPSB7XG4gICAgLi4ucnVudGltZUF1dGhTZWVkLFxuICAgIHRva2VuOiBzYWZlVGV4dChzZWVkLnRva2VuIHx8IHJ1bnRpbWVBdXRoU2VlZC50b2tlbiksXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHNlZWQuZW50cmFPaWQgfHwgcnVudGltZUF1dGhTZWVkLmVudHJhT2lkKSxcbiAgICBhcHBDb2RlOiBzYWZlVGV4dChzZWVkLmFwcENvZGUgfHwgcnVudGltZUF1dGhTZWVkLmFwcENvZGUgfHwgREVGQVVMVF9BUFBfQ09ERSksXG4gICAgc3RyaWN0QXBpUm91dGVzOiBzdHJpY3RGcm9tU2VlZCA/PyBzdHJpY3RGcm9tUnVudGltZSxcbiAgfTtcblxuICBjYWNoZWRDb250ZXh0ID0gbnVsbDtcbiAgY2FjaGVkQ29udGV4dEtleSA9IFwiXCI7XG4gIGNvbnRleHRQcm9taXNlID0gbnVsbDtcbiAgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuY2xlYXIoKTtcbiAgcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuY2xlYXIoKTtcbn07XG5cbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9saXN0IGl0ZW0gY29udHJhY3QgdG8gbGlzdCBjYXJkIFVJIG1vZGVsLlxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkID0gbWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmRDb3JlO1xuXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0gaGVhZGVyIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldEhlYWRlciA9IG1hcEV4cGVuc2VTaGVldEhlYWRlckNvcmU7XG5cbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfSBsaW5lIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldExpbmUgPSBtYXBFeHBlbnNlU2hlZXRMaW5lQ29yZTtcblxuLy8gTG9hZHMgdGhlIGV4cGVuc2Ugc2hlZXQgbGlzdCBmcm9tIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvbGlzdC5cbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldExpc3QgPSBhc3luYyAoXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+PiA9PiB7XG4gIGNvbnN0IHJhd0NyZWF0ZWREYXRlRnJvbSA9IHNhZmVUZXh0KHBheWxvYWQ/LmNyZWF0ZWREYXRlRnJvbSk7XG4gIGNvbnN0IHJhd0NyZWF0ZWREYXRlVG8gPSBzYWZlVGV4dChwYXlsb2FkPy5jcmVhdGVkRGF0ZVRvKTtcbiAgY29uc3QgY3JlYXRlZERhdGVGcm9tID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlKHJhd0NyZWF0ZWREYXRlRnJvbSk7XG4gIGNvbnN0IGNyZWF0ZWREYXRlVG8gPSBub3JtYWxpemVPcHRpb25hbEFwaURhdGUocmF3Q3JlYXRlZERhdGVUbyk7XG5cbiAgaWYgKHJhd0NyZWF0ZWREYXRlRnJvbSAmJiAhY3JlYXRlZERhdGVGcm9tKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XG4gIH1cbiAgaWYgKHJhd0NyZWF0ZWREYXRlVG8gJiYgIWNyZWF0ZWREYXRlVG8pIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcbiAgfVxuXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCA9IHtcbiAgICAuLi5wYXlsb2FkLFxuICAgIGNyZWF0ZWREYXRlRnJvbSxcbiAgICBjcmVhdGVkRGF0ZVRvLFxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlcihwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyksXG4gIH07XG5cbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvbGlzdFwiLCB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXG4gICAgfSk7XG5cbiAgICByZXR1cm4gbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmICghc2hvdWxkVXNlTGVnYWN5RmFsbGJhY2soZXJyb3IpKSB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICBjb25zdCBsZWdhY3lSZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxMZWdhY3lFeHBlbnNlTGlzdFJlc3BvbnNlPihcIi9HYXN0b3MvTGlzdEV4cGVuc2VTaGVldHNcIiwge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIC4uLnNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKSxcbiAgICAgICAgLi4uSlNPTl9IRUFERVJTLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHRvTGVnYWN5TGlzdFJlcXVlc3RQYXlsb2FkKHNhZmVQYXlsb2FkKSksXG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXBwZWQgPSBtYXBMZWdhY3lMaXN0UmVzcG9uc2UoXG4gICAgICBsZWdhY3lSZXNwb25zZSxcbiAgICAgIE51bWJlci5pc0Zpbml0ZShzYWZlUGF5bG9hZC5wYWdlKSAmJiBzYWZlUGF5bG9hZC5wYWdlID4gMCA/IHNhZmVQYXlsb2FkLnBhZ2UgOiAxLFxuICAgICAgTnVtYmVyLmlzRmluaXRlKHNhZmVQYXlsb2FkLnBhZ2VTaXplKSAmJiBzYWZlUGF5bG9hZC5wYWdlU2l6ZSA+IDAgPyBzYWZlUGF5bG9hZC5wYWdlU2l6ZSA6IDUwXG4gICAgKTtcblxuICAgIHJldHVybiBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZShtYXBwZWQpO1xuICB9XG59O1xuXG4vLyBMb2FkcyBvbmUgZXhwZW5zZSBzaGVldCBkZXRhaWwgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9LlxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsID0gYXN5bmMgKFxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldERldGFpbER0bz4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlU2hlZXRJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0RGV0YWlsRHRvPj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH1gLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gUmVhZHMgYXZhaWxhYmxlIGN1cnJlbmNpZXMgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2N1cnJlbmNpZXMuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVNoZWV0Q3VycmVuY2llcyA9IGFzeW5jIChcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj4gPT4ge1xuICBsZXQgY29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQgfCBudWxsID0gbnVsbDtcbiAgdHJ5IHtcbiAgICBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSkge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgY29tcGFueUlkID0gc2FmZVRleHQoY29udGV4dD8uY29tcGFueUlkIHx8IHJlYWRXaW5kb3dTZWxlY3RlZENvbXBhbnkoKSkudG9VcHBlckNhc2UoKTtcbiAgY29uc3QgY2FjaGVLZXkgPSBjb21wYW55SWQgfHwgXCItXCI7XG5cbiAgaWYgKGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLmhhcyhjYWNoZUtleSkpIHtcbiAgICByZXR1cm4gY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuZ2V0KGNhY2hlS2V5KSBhcyBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPjtcbiAgfVxuXG4gIGlmIChwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5oYXMoY2FjaGVLZXkpKSB7XG4gICAgcmV0dXJuIHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLmdldChjYWNoZUtleSkgYXMgUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj47XG4gIH1cblxuICBjb25zdCByZXF1ZXN0UHJvbWlzZSA9IChhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIkF1dGhvcml6YXRpb25cIik7XG4gICAgcmVtb3ZlSGVhZGVyVmFsdWUoaGVhZGVycywgXCJYLUlORC1BeFVzZXJJZFwiKTtcblxuICAgIGlmIChjb21wYW55SWQpIHtcbiAgICAgIGhlYWRlcnNbXCJYLUlORC1Db21wYW55XCJdID0gY29tcGFueUlkO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj4oXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL2N1cnJlbmNpZXNcIiwge1xuICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgIGhlYWRlcnMsXG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgbm9ybWFsaXplZFJlc3BvbnNlID0gbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgIGlmIChub3JtYWxpemVkUmVzcG9uc2UuU3VjY2Vzcykge1xuICAgICAgICBjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcy5zZXQoY2FjaGVLZXksIG5vcm1hbGl6ZWRSZXNwb25zZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBub3JtYWxpemVkUmVzcG9uc2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmICghc2hvdWxkVXNlTGVnYWN5RmFsbGJhY2soZXJyb3IpKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBsZWdhY3lMaXN0UmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248TGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZT4oXCIvR2FzdG9zL0xpc3RFeHBlbnNlU2hlZXRzXCIsIHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIC4uLnNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKSxcbiAgICAgICAgICAuLi5KU09OX0hFQURFUlMsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBmaWx0ZXI6IFwiXCIsXG4gICAgICAgICAgaG9qYUdhc3Rvc0lkOiBcIlwiLFxuICAgICAgICAgIGJpbGxlZE1vZGU6IDIsXG4gICAgICAgICAgZnJvbURhdGU6IFwiXCIsXG4gICAgICAgICAgdG9EYXRlOiBcIlwiLFxuICAgICAgICAgIHByb2plY3RJZDogXCJcIixcbiAgICAgICAgICBjdXJyZW5jeUNvZGU6IFwiXCIsXG4gICAgICAgICAgcGFnZTogMSxcbiAgICAgICAgICBwYWdlU2l6ZTogMjAwLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBzZWVuQ29kZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICAgIGNvbnN0IHNvdXJjZUl0ZW1zID0gQXJyYXkuaXNBcnJheShsZWdhY3lMaXN0UmVzcG9uc2UuaXRlbXMpID8gbGVnYWN5TGlzdFJlc3BvbnNlLml0ZW1zIDogW107XG4gICAgICBjb25zdCBmYWxsYmFja0l0ZW1zOiBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0b1tdID0gc291cmNlSXRlbXNcbiAgICAgICAgLm1hcCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5LmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSlcbiAgICAgICAgLmZpbHRlcigoY29kZSkgPT4gISFjb2RlKVxuICAgICAgICAuZmlsdGVyKChjb2RlKSA9PiB7XG4gICAgICAgICAgaWYgKHNlZW5Db2Rlcy5oYXMoY29kZSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICBzZWVuQ29kZXMuYWRkKGNvZGUpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KVxuICAgICAgICAubWFwKChjb2RlKSA9PiAoe1xuICAgICAgICAgIEN1cnJlbmN5Q29kZTogY29kZSxcbiAgICAgICAgICBDdXJyZW5jeUNvZGVJU086IGNvZGUsXG4gICAgICAgIH0pKTtcblxuICAgICAgY29uc3QgZmFsbGJhY2tSZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4gPSB7XG4gICAgICAgIFN1Y2Nlc3M6IGxlZ2FjeUxpc3RSZXNwb25zZS5zdWNjZXNzICE9PSBmYWxzZSxcbiAgICAgICAgTWVzc2FnZTogc2FmZVRleHQobGVnYWN5TGlzdFJlc3BvbnNlLm1lc3NhZ2UpIHx8IFwiT0tcIixcbiAgICAgICAgVG90YWw6IGZhbGxiYWNrSXRlbXMubGVuZ3RoLFxuICAgICAgICBQYWdlOiAxLFxuICAgICAgICBQYWdlU2l6ZTogZmFsbGJhY2tJdGVtcy5sZW5ndGgsXG4gICAgICAgIEl0ZW1zOiBmYWxsYmFja0l0ZW1zLFxuICAgICAgICBUcmFjZUlkOiB1bmRlZmluZWQsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBub3JtYWxpemVkRmFsbGJhY2sgPSBub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2UoZmFsbGJhY2tSZXNwb25zZSk7XG4gICAgICBpZiAobm9ybWFsaXplZEZhbGxiYWNrLlN1Y2Nlc3MpIHtcbiAgICAgICAgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuc2V0KGNhY2hlS2V5LCBub3JtYWxpemVkRmFsbGJhY2spO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbm9ybWFsaXplZEZhbGxiYWNrO1xuICAgIH1cbiAgfSkoKTtcblxuICBwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5zZXQoY2FjaGVLZXksIHJlcXVlc3RQcm9taXNlKTtcbiAgdHJ5IHtcbiAgICByZXR1cm4gYXdhaXQgcmVxdWVzdFByb21pc2U7XG4gIH0gZmluYWxseSB7XG4gICAgcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuZGVsZXRlKGNhY2hlS2V5KTtcbiAgfVxufTtcblxuLy8gUmVhZHMgYXZhaWxhYmxlIHN1Ym9yZGluYXRlcyBmcm9tIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvc3Vib3JkaW5hdGVzLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlcyA9IGFzeW5jIChcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8dW5rbm93bj4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9zdWJvcmRpbmF0ZXNcIiwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIEV4cG9zZXMgdGhlIGRlZmF1bHQgY3VycmVuY3kgcmVzb2x2ZWQgZnJvbSBFbnRyYSBjb250ZXh0IGZvciBpbml0aWFsIHNlbGVjdGlvbnMuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVNoZWV0RGVmYXVsdEN1cnJlbmN5Q29kZSA9IGFzeW5jIChvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gICAgcmV0dXJuIHNhZmVUZXh0KGNvbnRleHQuZGVmYXVsdEN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cbn07XG5cbi8vIFJlYWRzIGV4Y2hhbmdlIHJhdGUgZnJvbSAvYXBpL3N5c3RlbS9leGNoYW5nZS1yYXRlLlxuZXhwb3J0IGNvbnN0IGdldEV4Y2hhbmdlUmF0ZSA9IGFzeW5jIChcbiAgYmFzZUN1cnJlbmN5OiBzdHJpbmcsXG4gIHRhcmdldEN1cnJlbmN5OiBzdHJpbmcsXG4gIGRhdGU/OiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RXhjaGFuZ2VSYXRlRHRvPj4gPT4ge1xuICBjb25zdCB0b2tlbiA9IHJlc29sdmVBdXRoVG9rZW4ob3B0aW9ucyk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kgPSBzYWZlVGV4dChiYXNlQ3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRUYXJnZXRDdXJyZW5jeSA9IHNhZmVUZXh0KHRhcmdldEN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBub3JtYWxpemVkRGF0ZSA9IHNhZmVUZXh0KGRhdGUpO1xuICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcblxuICBxdWVyeS5zZXQoXCJiYXNlQ3VycmVuY3lcIiwgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSk7XG4gIHF1ZXJ5LnNldChcInRhcmdldEN1cnJlbmN5XCIsIG5vcm1hbGl6ZWRUYXJnZXRDdXJyZW5jeSk7XG4gIGlmIChub3JtYWxpemVkRGF0ZSkge1xuICAgIHF1ZXJ5LnNldChcImRhdGVcIiwgbm9ybWFsaXplZERhdGUpO1xuICB9XG5cbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcbiAgaWYgKHRva2VuKSB7XG4gICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke3Rva2VufWA7XG4gIH1cblxuICByZXR1cm4gZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4Y2hhbmdlUmF0ZUR0bz4+KGAvYXBpL3N5c3RlbS9leGNoYW5nZS1yYXRlPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgaGVhZGVycyxcbiAgfSk7XG59O1xuXG4vLyBSZWFkcyBleGNoYW5nZSByYXRlIGZyb20gL2FwaS9zeXN0ZW0vZXhjaGFuZ2UtcmF0ZS9wdWJsaWMtZGlyZWN0LlxuZXhwb3J0IGNvbnN0IGdldEV4Y2hhbmdlUmF0ZVB1YmxpY0RpcmVjdCA9IGFzeW5jIChcbiAgYmFzZUN1cnJlbmN5OiBzdHJpbmcsXG4gIHRhcmdldEN1cnJlbmN5OiBzdHJpbmcsXG4gIGRhdGU/OiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RXhjaGFuZ2VSYXRlRHRvPj4gPT4ge1xuICBjb25zdCB0b2tlbiA9IHJlc29sdmVBdXRoVG9rZW4ob3B0aW9ucyk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kgPSBzYWZlVGV4dChiYXNlQ3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRUYXJnZXRDdXJyZW5jeSA9IHNhZmVUZXh0KHRhcmdldEN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBub3JtYWxpemVkRGF0ZSA9IHNhZmVUZXh0KGRhdGUpO1xuICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcblxuICBxdWVyeS5zZXQoXCJiYXNlQ3VycmVuY3lcIiwgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSk7XG4gIHF1ZXJ5LnNldChcInRhcmdldEN1cnJlbmN5XCIsIG5vcm1hbGl6ZWRUYXJnZXRDdXJyZW5jeSk7XG4gIGlmIChub3JtYWxpemVkRGF0ZSkge1xuICAgIHF1ZXJ5LnNldChcImRhdGVcIiwgbm9ybWFsaXplZERhdGUpO1xuICB9XG5cbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcbiAgaWYgKHRva2VuKSB7XG4gICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke3Rva2VufWA7XG4gIH1cblxuICByZXR1cm4gZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4Y2hhbmdlUmF0ZUR0bz4+KGAvYXBpL3N5c3RlbS9leGNoYW5nZS1yYXRlL3B1YmxpYy1kaXJlY3Q/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICBoZWFkZXJzLFxuICB9KTtcbn07XG5cbi8vIFJlYWRzIGZ1ZWwgcHJpY2UgcGVyIGttIGZyb20gL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9mdWVsLXByaWNlLWttLlxuZXhwb3J0IGNvbnN0IGdldEZ1ZWxQcmljZUttID0gYXN5bmMgKFxuICB0cmFuc0RhdGU6IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxGdWVsUHJpY2VLbUR0bz4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBub3JtYWxpemVkRGF0ZSA9IG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZSh0cmFuc0RhdGUpO1xuICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcblxuICBxdWVyeS5zZXQoXCJ0cmFuc0RhdGVcIiwgbm9ybWFsaXplZERhdGUpO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEZ1ZWxQcmljZUttRHRvPj4oXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvZnVlbC1wcmljZS1rbT8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCxcbiAgICB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIENyZWF0ZXMgYW4gZXhwZW5zZSBzaGVldCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzLlxuZXhwb3J0IGNvbnN0IGNyZWF0ZUV4cGVuc2VTaGVldCA9IGFzeW5jIChcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRDcmVhdGVSZXNwb25zZURhdGE+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3QgbW9kZSA9IHBheWxvYWQubW9kZSA/PyAwO1xuICBjb25zdCBsaW5lcyA9IEFycmF5LmlzQXJyYXkocGF5bG9hZC5saW5lcykgPyBwYXlsb2FkLmxpbmVzIDogW107XG4gIGNvbnN0IG5vcm1hbGl6ZWRMaW5lcyA9IGxpbmVzLm1hcCgobGluZSkgPT4gKHtcbiAgICAuLi5saW5lLFxuICAgIHRyYW5zRGF0ZTogbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlKGxpbmUudHJhbnNEYXRlKSxcbiAgfSkpO1xuICBjb25zdCBoYXNJbnZhbGlkTGluZVBheWxvYWQgPSBub3JtYWxpemVkTGluZXMuc29tZSgobGluZSkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAhc2FmZVRleHQobGluZS50cmFuc0RhdGUpIHx8XG4gICAgICAhTnVtYmVyLmlzSW50ZWdlcihOdW1iZXIobGluZS50eXBlVmFsdWUpKSB8fFxuICAgICAgTnVtYmVyKGxpbmUudHlwZVZhbHVlKSA8PSAwIHx8XG4gICAgICAhaXNQb3NpdGl2ZU51bWJlcihsaW5lLnF0eSkgfHxcbiAgICAgICFpc1Bvc2l0aXZlTnVtYmVyKGxpbmUucHJpY2UpXG4gICAgKTtcbiAgfSk7XG5cbiAgaWYgKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzICE9PSB1bmRlZmluZWQgJiYgIWlzTm9uTmVnYXRpdmVOdW1iZXIocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleHBlbnNlU2hlZXRTdGF0dXMgbXVzdCBiZSBncmVhdGVyIG9yIGVxdWFsIHRvIDAuXCIpO1xuICB9XG5cbiAgaWYgKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSAhPT0gdW5kZWZpbmVkICYmICFpc05vbk5lZ2F0aXZlTnVtYmVyKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSkpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4Y2hhbmdlUmF0ZU1vZGUgbXVzdCBiZSBncmVhdGVyIG9yIGVxdWFsIHRvIDAuXCIpO1xuICB9XG5cbiAgaWYgKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSAhPT0gdW5kZWZpbmVkICYmIHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4Y2hhbmdlUmF0ZU1vZGUgcmVxdWlyZXMgZXhwZW5zZVNoZWV0U3RhdHVzLlwiKTtcbiAgfVxuXG4gIGlmIChoYXNJbnZhbGlkTGluZVBheWxvYWQpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkVhY2ggbGluZSByZXF1aXJlcyB0cmFuc0RhdGUsIHR5cGVWYWx1ZSwgcXR5ID4gMCBhbmQgcHJpY2UgPiAwLlwiKTtcbiAgfVxuXG4gIGlmIChtb2RlID09PSAwKSB7XG4gICAgaWYgKCFzYWZlVGV4dChwYXlsb2FkLmRlc2NyaXB0aW9uKSB8fCAhc2FmZVRleHQocGF5bG9hZC5jdXJyZW5jeUNvZGUpIHx8IGxpbmVzLmxlbmd0aCA8IDEpIHtcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiSW52YWxpZCBjcmVhdGUgcGF5bG9hZCBmb3IgbW9kZSAwLlwiKTtcbiAgICB9XG4gIH1cblxuICBpZiAobW9kZSA9PT0gMSkge1xuICAgIGlmICghc2FmZVRleHQocGF5bG9hZC5kZXNjcmlwdGlvbikgfHwgIXNhZmVUZXh0KHBheWxvYWQuY3VycmVuY3lDb2RlKSkge1xuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJJbnZhbGlkIGNyZWF0ZSBwYXlsb2FkIGZvciBtb2RlIDEuXCIpO1xuICAgIH1cblxuICAgIGlmIChsaW5lcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIk1vZGUgMSByZXF1aXJlcyBsaW5lcyB0byBiZSBudWxsIG9yIGVtcHR5LlwiKTtcbiAgICB9XG4gIH1cblxuICBpZiAobW9kZSA9PT0gMikge1xuICAgIGlmICghc2FmZVRleHQocGF5bG9hZC5leGlzdGluZ0hvamFHYXN0b3NJZCkgfHwgbGluZXMubGVuZ3RoIDwgMSkge1xuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJJbnZhbGlkIGNyZWF0ZSBwYXlsb2FkIGZvciBtb2RlIDIuXCIpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG5vcm1hbGl6ZWRQYXlsb2FkOiBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0ID0ge1xuICAgIC4uLnBheWxvYWQsXG4gICAgbW9kZSxcbiAgICBleGlzdGluZ0hvamFHYXN0b3NJZDogc2FmZVRleHQocGF5bG9hZC5leGlzdGluZ0hvamFHYXN0b3NJZCkgfHwgdW5kZWZpbmVkLFxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChwYXlsb2FkLmRlc2NyaXB0aW9uKSB8fCB1bmRlZmluZWQsXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChwYXlsb2FkLmN1cnJlbmN5Q29kZSkgfHwgdW5kZWZpbmVkLFxuICAgIHByb2pJZDogc2FmZVRleHQocGF5bG9hZC5wcm9qSWQpIHx8IHVuZGVmaW5lZCxcbiAgICBsaW5lczogbW9kZSA9PT0gMSA/IFtdIDogbm9ybWFsaXplZExpbmVzLFxuICB9O1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldENyZWF0ZVJlc3BvbnNlRGF0YT4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0c1wiLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkobm9ybWFsaXplZFBheWxvYWQpLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gVXBkYXRlcyBoZWFkZXIgZmllbGRzIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0uXG5leHBvcnQgY29uc3QgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyID0gYXN5bmMgKFxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0SGVhZGVyVXBkYXRlUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTx7IEhvamFHYXN0b3NJZDogc3RyaW5nIH0+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xuXG4gIGlmIChwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyAhPT0gdW5kZWZpbmVkICYmICFpc05vbk5lZ2F0aXZlTnVtYmVyKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzKSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhwZW5zZVNoZWV0U3RhdHVzIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byAwLlwiKTtcbiAgfVxuXG4gIGlmIChwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUgIT09IHVuZGVmaW5lZCAmJiAhaXNOb25OZWdhdGl2ZU51bWJlcihwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleGNoYW5nZVJhdGVNb2RlIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byAwLlwiKTtcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPHsgSG9qYUdhc3Rvc0lkOiBzdHJpbmcgfT4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9YCwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBEZWxldGVzIGEgZnVsbCBleHBlbnNlIHNoZWV0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0vbGluZXMvMD9kZWxldGVXaG9sZVNoZWV0PXRydWUuXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0ID0gYXN5bmMgKFxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxudWxsPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8bnVsbD4+KFxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9L2xpbmVzLzA/ZGVsZXRlTW9kZT0yJmRlbGV0ZVdob2xlU2hlZXQ9dHJ1ZWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBVcGRhdGVzIG9uZSBleHBlbnNlIGxpbmUgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS9saW5lcy97bGluZVJlY0lkfS5cbmV4cG9ydCBjb25zdCB1cGRhdGVFeHBlbnNlU2hlZXRMaW5lID0gYXN5bmMgKFxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcbiAgbGluZVJlY0lkOiBzdHJpbmcsXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXNwb25zZURhdGE+PiA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc0RhdGUgPSBub3JtYWxpemVSZXF1aXJlZEFwaURhdGUocGF5bG9hZC50cmFuc0RhdGUpO1xuICBpZiAoXG4gICAgIU51bWJlci5pc0ludGVnZXIoTnVtYmVyKHBheWxvYWQudHlwZVZhbHVlKSkgfHxcbiAgICBOdW1iZXIocGF5bG9hZC50eXBlVmFsdWUpIDw9IDAgfHxcbiAgICAhaXNQb3NpdGl2ZU51bWJlcihwYXlsb2FkLnF0eSkgfHxcbiAgICAhaXNQb3NpdGl2ZU51bWJlcihwYXlsb2FkLnByaWNlKVxuICApIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcInRyYW5zRGF0ZSwgdHlwZVZhbHVlLCBxdHkgPiAwIGFuZCBwcmljZSA+IDAgYXJlIHJlcXVpcmVkLlwiKTtcbiAgfVxuXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCBzYWZlTGluZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhsaW5lUmVjSWQgfHwgXCJcIikudHJpbSgpKTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVzcG9uc2VEYXRhPj4oXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH0vbGluZXMvJHtzYWZlTGluZUlkfWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIC4uLnBheWxvYWQsXG4gICAgICAgIHRyYW5zRGF0ZTogbm9ybWFsaXplZFRyYW5zRGF0ZSxcbiAgICAgIH0pLFxuICAgIH1cbiAgKTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gRGVsZXRlcyBvbmUgZXhwZW5zZSBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0vbGluZXMve2xpbmVSZWNJZH0/ZGVsZXRlV2hvbGVTaGVldD1mYWxzZS5cbmV4cG9ydCBjb25zdCBkZWxldGVFeHBlbnNlU2hlZXRMaW5lID0gYXN5bmMgKFxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcbiAgbGluZVJlY0lkOiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlU2hlZXRJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHNhZmVMaW5lSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGxpbmVSZWNJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxudWxsPj4oXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH0vbGluZXMvJHtzYWZlTGluZUlkfT9kZWxldGVNb2RlPTAmZGVsZXRlV2hvbGVTaGVldD1mYWxzZWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBFeHRyYWN0cyBhbiBleHBlbnNlIGRyYWZ0IGZyb20gYSB0aWNrZXQgaW1hZ2UgdXNpbmcgL2FwaS9pYS9zZXJ2aWNlL2V4cGVuc2Vmcm9tdGlja2V0LlxuZXhwb3J0IGNvbnN0IGV4dHJhY3RFeHBlbnNlRnJvbVRpY2tldERyYWZ0ID0gYXN5bmMgKFxuICB0aWNrZXRJbWFnZTogRmlsZSB8IEJsb2IsXG4gIHBlcnNpc3RUaWNrZXQ/OiBib29sZWFuLFxuICB0aWNrZXRVcmxGaWxlPzogc3RyaW5nLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldERyYWZ0UmVzcG9uc2U+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3QgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xuICBjb25zdCBzYWZlVGlja2V0VXJsID0gc2FmZVRleHQodGlja2V0VXJsRmlsZSk7XG5cbiAgaWYgKHRpY2tldEltYWdlIGluc3RhbmNlb2YgRmlsZSkge1xuICAgIGZvcm0uYXBwZW5kKFwidGlja2V0SW1hZ2VcIiwgdGlja2V0SW1hZ2UsIHNhZmVUZXh0KHRpY2tldEltYWdlLm5hbWUpIHx8IFwidGlja2V0LmpwZ1wiKTtcbiAgfSBlbHNlIHtcbiAgICBmb3JtLmFwcGVuZChcInRpY2tldEltYWdlXCIsIHRpY2tldEltYWdlLCBcInRpY2tldC5qcGdcIik7XG4gIH1cblxuICBpZiAodHlwZW9mIHBlcnNpc3RUaWNrZXQgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgZm9ybS5hcHBlbmQoXCJwZXJzaXN0VGlja2V0XCIsIHBlcnNpc3RUaWNrZXQgPyBcInRydWVcIiA6IFwiZmFsc2VcIik7XG4gIH1cblxuICBpZiAoc2FmZVRpY2tldFVybCkge1xuICAgIGZvcm0uYXBwZW5kKFwidGlja2V0VXJsRmlsZVwiLCBzYWZlVGlja2V0VXJsKTtcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldERyYWZ0UmVzcG9uc2U+PihcIi9hcGkvaWEvc2VydmljZS9leHBlbnNlZnJvbXRpY2tldFwiLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUZvcm1IZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxuICAgIGJvZHk6IGZvcm0sXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBDcmVhdGVzIGEgdGlja2V0IGhlYWRlci9saW5lcyB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMuXG5leHBvcnQgY29uc3QgY3JlYXRlRXhwZW5zZVNoZWV0VGlja2V0ID0gYXN5bmMgKFxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRDcmVhdGVSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBtb2RlID0gTnVtYmVyKHBheWxvYWQ/Lm1vZGUpO1xuICBjb25zdCByYXdUcmFuc0RhdGUgPSBzYWZlVGV4dChwYXlsb2FkPy50cmFuc0RhdGUpO1xuICBjb25zdCBub3JtYWxpemVkVHJhbnNEYXRlID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlKHJhd1RyYW5zRGF0ZSk7XG5cbiAgaWYgKHJhd1RyYW5zRGF0ZSAmJiAhbm9ybWFsaXplZFRyYW5zRGF0ZSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xuICB9XG5cbiAgaWYgKChtb2RlID09PSAwIHx8IG1vZGUgPT09IDEpICYmICFub3JtYWxpemVkVHJhbnNEYXRlKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XG4gIH1cblxuICBjb25zdCBzYWZlUGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0Q3JlYXRlUmVxdWVzdCA9IHtcbiAgICAuLi5wYXlsb2FkLFxuICAgIHRyYW5zRGF0ZTogbm9ybWFsaXplZFRyYW5zRGF0ZSB8fCB1bmRlZmluZWQsXG4gICAgZ2FzdG9UeXBlOiBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZShwYXlsb2FkPy5nYXN0b1R5cGUpLFxuICB9O1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0c1wiLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gTG9hZHMgdGlja2V0IGxpc3QgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL2xpc3QuXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdCA9IGFzeW5jIChcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCByYXdDcmVhdGVkRGF0ZUZyb20gPSBzYWZlVGV4dChwYXlsb2FkPy5jcmVhdGVkRGF0ZUZyb20pO1xuICBjb25zdCByYXdDcmVhdGVkRGF0ZVRvID0gc2FmZVRleHQocGF5bG9hZD8uY3JlYXRlZERhdGVUbyk7XG4gIGNvbnN0IGNyZWF0ZWREYXRlRnJvbSA9IG5vcm1hbGl6ZVRpY2tldExpc3REYXRlKHJhd0NyZWF0ZWREYXRlRnJvbSk7XG4gIGNvbnN0IGNyZWF0ZWREYXRlVG8gPSBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZShyYXdDcmVhdGVkRGF0ZVRvKTtcbiAgaWYgKHJhd0NyZWF0ZWREYXRlRnJvbSAmJiAhY3JlYXRlZERhdGVGcm9tKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XG4gIH1cbiAgaWYgKHJhd0NyZWF0ZWREYXRlVG8gJiYgIWNyZWF0ZWREYXRlVG8pIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcbiAgfVxuXG4gIGNvbnN0IHByZWZlcnJlZFNlYXJjaEtleSA9IHNhZmVUZXh0KHBheWxvYWQ/LnNlYXJjaEtleSB8fCBwYXlsb2FkPy5maWx0ZXIpO1xuICBjb25zdCBsZWdhY3lGaWx0ZXIgPSBzYWZlVGV4dChwYXlsb2FkPy5maWx0ZXIgfHwgcHJlZmVycmVkU2VhcmNoS2V5KTtcbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0ID0ge1xuICAgIHBhZ2U6IE51bWJlci5pc0Zpbml0ZShwYXlsb2FkPy5wYWdlKSAmJiBwYXlsb2FkLnBhZ2UgPiAwID8gTWF0aC5mbG9vcihwYXlsb2FkLnBhZ2UpIDogMSxcbiAgICBwYWdlU2l6ZTogTnVtYmVyLmlzRmluaXRlKHBheWxvYWQ/LnBhZ2VTaXplKSAmJiBwYXlsb2FkLnBhZ2VTaXplID4gMCA/IE1hdGguZmxvb3IocGF5bG9hZC5wYWdlU2l6ZSkgOiA1MCxcbiAgICBjcmVhdGVkRGF0ZUZyb206IGNyZWF0ZWREYXRlRnJvbSB8fCB1bmRlZmluZWQsXG4gICAgY3JlYXRlZERhdGVUbzogY3JlYXRlZERhdGVUbyB8fCB1bmRlZmluZWQsXG4gICAgc2VhcmNoS2V5OiBwcmVmZXJyZWRTZWFyY2hLZXkgfHwgdW5kZWZpbmVkLFxuICAgIGZpbHRlcjogbGVnYWN5RmlsdGVyIHx8IHVuZGVmaW5lZCxcbiAgICBzdGF0dXM6IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzKHBheWxvYWQ/LnN0YXR1cyksXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChwYXlsb2FkPy5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCkgfHwgdW5kZWZpbmVkLFxuICAgIGdhc3RvVHlwZTogbm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZShwYXlsb2FkPy5nYXN0b1R5cGUpLFxuICAgIHByb2Nlc3NlZEJ5QUk6IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSShwYXlsb2FkPy5wcm9jZXNzZWRCeUFJKSxcbiAgfTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvPj4oXG4gICAgXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGlzdFwiLFxuICAgIHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIExvYWRzIG9uZSB0aWNrZXQgZGV0YWlsIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS5cbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXREZXRhaWxEdG8+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvPj4oXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9YCxcbiAgICB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gRG93bmxvYWRzIG9uZSB0aWNrZXQgaW1hZ2UgcHJldmlldyBibG9iIHRocm91Z2ggdGhlIGludGVybmFsIHByb3h5IGVuZHBvaW50LlxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0UHJldmlld0Jsb2IgPSBhc3luYyAoXG4gIHVybEZpbGU6IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxCbG9iPiA9PiB7XG4gIGNvbnN0IHNhZmVVcmxGaWxlID0gc2FmZVRleHQodXJsRmlsZSk7XG4gIGlmICghc2FmZVVybEZpbGUpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIk1pc3NpbmcgdGlja2V0IHVybEZpbGUuXCIpO1xuICB9XG5cbiAgY29uc3QgeyBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogX3N1cHByZXNzUGVybWlzc2lvbk1vZGFsLCAuLi5mZXRjaE9wdGlvbnMgfSA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IGNzcmZUb2tlbiA9IGdldENzcmZUb2tlbigpO1xuICBjb25zdCBoZWFkZXJzOiBIZWFkZXJzSW5pdCA9IHtcbiAgICBBY2NlcHQ6IFwiaW1hZ2UvKlwiLFxuICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxuICAgIC4uLihmZXRjaE9wdGlvbnMuaGVhZGVycyB8fCB7fSksXG4gIH07XG5cbiAgaWYgKGNzcmZUb2tlbikge1xuICAgIChoZWFkZXJzIGFzIFJlY29yZDxzdHJpbmcsIHN0cmluZz4pW1wiUmVxdWVzdFZlcmlmaWNhdGlvblRva2VuXCJdID0gY3NyZlRva2VuO1xuICB9XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9wcmV2aWV3XCIsIHtcbiAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxuICAgIC4uLmZldGNoT3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnMsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyB1cmxGaWxlOiBzYWZlVXJsRmlsZSB9KSxcbiAgfSk7XG5cbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIGNvbnN0IHJhdyA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICBjb25zdCBtZXNzYWdlID0gcmVhZEFwaU1lc3NhZ2UocmF3KTtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihtZXNzYWdlIHx8IFwiQ291bGQgbm90IGxvYWQgdGlja2V0IHByZXZpZXcuXCIsIHJlc3BvbnNlLnN0YXR1cywgcmF3KTtcbiAgfVxuXG4gIGNvbnN0IGJsb2IgPSBhd2FpdCByZXNwb25zZS5ibG9iKCk7XG4gIGlmICghYmxvYiB8fCBibG9iLnNpemUgPT09IDApIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkNvdWxkIG5vdCBsb2FkIHRpY2tldCBwcmV2aWV3LlwiKTtcbiAgfVxuXG4gIHJldHVybiBibG9iO1xufTtcblxuLy8gVXBkYXRlcyB0aWNrZXQgaGVhZGVyIG1ldGFkYXRhIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS5cbmV4cG9ydCBjb25zdCB1cGRhdGVFeHBlbnNlU2hlZXRUaWNrZXQgPSBhc3luYyAoXG4gIGZpbGVJZDogc3RyaW5nLFxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3QgcmF3VHJhbnNEYXRlID0gc2FmZVRleHQocGF5bG9hZD8udHJhbnNEYXRlKTtcbiAgY29uc3Qgbm9ybWFsaXplZFRyYW5zRGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdUcmFuc0RhdGUpO1xuXG4gIGlmIChyYXdUcmFuc0RhdGUgJiYgIW5vcm1hbGl6ZWRUcmFuc0RhdGUpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcbiAgfVxuXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0ID0ge1xuICAgIC4uLnBheWxvYWQsXG4gICAgdHJhbnNEYXRlOiBub3JtYWxpemVkVHJhbnNEYXRlIHx8IHVuZGVmaW5lZCxcbiAgICBnYXN0b1R5cGU6IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlKHBheWxvYWQ/Lmdhc3RvVHlwZSksXG4gIH07XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfWAsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIERlbGV0ZXMgb25lIHRpY2tldCBvciBvbmUgdGlja2V0IGxpbmUgdmlhIHF1ZXJ5IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS5cbmV4cG9ydCBjb25zdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXQgPSBhc3luYyAoXG4gIGZpbGVJZDogc3RyaW5nLFxuICBsaW5lUmVjSWQ/OiBudW1iZXIsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gIGlmIChOdW1iZXIuaXNJbnRlZ2VyKE51bWJlcihsaW5lUmVjSWQpKSAmJiBOdW1iZXIobGluZVJlY0lkKSA+IDApIHtcbiAgICBxdWVyeS5zZXQoXCJsaW5lUmVjSWRcIiwgU3RyaW5nKGxpbmVSZWNJZCkpO1xuICB9XG5cbiAgY29uc3Qgc3VmZml4ID0gcXVlcnkudG9TdHJpbmcoKTtcbiAgY29uc3QgdXJsID0gc3VmZml4XG4gICAgPyBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0/JHtzdWZmaXh9YFxuICAgIDogYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9YDtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8bnVsbD4+KHVybCwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBBcHBsaWVzIElBIHBheWxvYWQgb3ZlciBhbiBleGlzdGluZyB0aWNrZXQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9L2lhLlxuZXhwb3J0IGNvbnN0IGFwcGx5RXhwZW5zZVNoZWV0VGlja2V0SWEgPSBhc3luYyAoXG4gIGZpbGVJZDogc3RyaW5nLFxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3QsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCByYXdQYXlsb2FkID0gKHBheWxvYWQgfHwge30pIGFzIEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdDtcbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCA9IHtcbiAgICAuLi5yYXdQYXlsb2FkLFxuICB9O1xuICBjb25zdCBub3JtYWxpemVkVHJhbnNEYXRlID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlKHJhd1BheWxvYWQudHJhbnNEYXRlKTtcbiAgaWYgKCFub3JtYWxpemVkVHJhbnNEYXRlKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XG4gIH1cbiAgc2FmZVBheWxvYWQudHJhbnNEYXRlID0gbm9ybWFsaXplZFRyYW5zRGF0ZTtcblxuICBjb25zdCBnYXN0b1R5cGUgPSBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZShyYXdQYXlsb2FkLmdhc3RvVHlwZSk7XG4gIGlmIChnYXN0b1R5cGUgPT09IHVuZGVmaW5lZCkge1xuICAgIGRlbGV0ZSBzYWZlUGF5bG9hZC5nYXN0b1R5cGU7XG4gIH0gZWxzZSB7XG4gICAgc2FmZVBheWxvYWQuZ2FzdG9UeXBlID0gZ2FzdG9UeXBlO1xuICB9XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2lhYCwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIENyZWF0ZXMgb25lIHRpY2tldCBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9saW5lcy5cbmV4cG9ydCBjb25zdCBjcmVhdGVFeHBlbnNlU2hlZXRUaWNrZXRMaW5lID0gYXN5bmMgKFxuICBmaWxlSWQ6IHN0cmluZyxcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGluZVJlcXVlc3QsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4gPT4ge1xuICBpZiAoIXNhZmVUZXh0KHBheWxvYWQ/LmRlc2NyaXB0aW9uKSB8fCAhaXNQb3NpdGl2ZU51bWJlcihwYXlsb2FkPy5xdHkpIHx8ICFpc1Bvc2l0aXZlTnVtYmVyKHBheWxvYWQ/LnByaWNlKSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZGVzY3JpcHRpb24sIHF0eSA+IDAgYW5kIHByaWNlID4gMCBhcmUgcmVxdWlyZWQuXCIpO1xuICB9XG5cbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2xpbmVzYCwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gVXBkYXRlcyBvbmUgdGlja2V0IGxpbmUgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9L2xpbmVzL3tsaW5lUmVjSWR9LlxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldExpbmUgPSBhc3luYyAoXG4gIGZpbGVJZDogc3RyaW5nLFxuICBsaW5lUmVjSWQ6IHN0cmluZyB8IG51bWJlcixcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGluZVJlcXVlc3QsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4gPT4ge1xuICBpZiAoIXNhZmVUZXh0KHBheWxvYWQ/LmRlc2NyaXB0aW9uKSB8fCAhaXNQb3NpdGl2ZU51bWJlcihwYXlsb2FkPy5xdHkpIHx8ICFpc1Bvc2l0aXZlTnVtYmVyKHBheWxvYWQ/LnByaWNlKSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZGVzY3JpcHRpb24sIHF0eSA+IDAgYW5kIHByaWNlID4gMCBhcmUgcmVxdWlyZWQuXCIpO1xuICB9XG5cbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3Qgc2FmZUxpbmVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcobGluZVJlY0lkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+KFxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9saW5lcy8ke3NhZmVMaW5lSWR9YCxcbiAgICB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxuICAgIH1cbiAgKTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gRGVsZXRlcyBvbmUgdGlja2V0IGxpbmUgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9L2xpbmVzL3tsaW5lUmVjSWR9LlxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldExpbmUgPSBhc3luYyAoXG4gIGZpbGVJZDogc3RyaW5nLFxuICBsaW5lUmVjSWQ6IHN0cmluZyB8IG51bWJlcixcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxudWxsPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCBzYWZlTGluZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhsaW5lUmVjSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8bnVsbD4+KFxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9saW5lcy8ke3NhZmVMaW5lSWR9YCxcbiAgICB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIFVwbG9hZHMvcmVwbGFjZXMgdGlja2V0IGZpbGUgY29udGVudCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vZmlsZS5cbmV4cG9ydCBjb25zdCB1cGxvYWRFeHBlbnNlU2hlZXRUaWNrZXRGaWxlID0gYXN5bmMgKFxuICBmaWxlSWQ6IHN0cmluZyxcbiAgZmlsZTogRmlsZSB8IEJsb2IsXG4gIGV4dGVuc2lvbj86IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHNhZmVFeHRlbnNpb24gPSBzYWZlVGV4dChleHRlbnNpb24pLnJlcGxhY2UoL15cXC4vLCBcIlwiKTtcbiAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gIGlmIChzYWZlRXh0ZW5zaW9uKSB7XG4gICAgcXVlcnkuc2V0KFwiZXh0ZW5zaW9uXCIsIHNhZmVFeHRlbnNpb24pO1xuICB9XG5cbiAgY29uc3Qgc3VmZml4ID0gcXVlcnkudG9TdHJpbmcoKTtcbiAgY29uc3QgdXJsID0gc3VmZml4XG4gICAgPyBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vZmlsZT8ke3N1ZmZpeH1gXG4gICAgOiBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vZmlsZWA7XG4gIGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcbiAgaWYgKGZpbGUgaW5zdGFuY2VvZiBGaWxlKSB7XG4gICAgZm9ybS5hcHBlbmQoXCJmaWxlXCIsIGZpbGUsIHNhZmVUZXh0KGZpbGUubmFtZSkgfHwgYHRpY2tldC4ke3NhZmVFeHRlbnNpb24gfHwgXCJqcGdcIn1gKTtcbiAgfSBlbHNlIHtcbiAgICBmb3JtLmFwcGVuZChcImZpbGVcIiwgZmlsZSwgYHRpY2tldC4ke3NhZmVFeHRlbnNpb24gfHwgXCJqcGdcIn1gKTtcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+KHVybCwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VGb3JtSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcbiAgICBib2R5OiBmb3JtLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gRGVsZXRlcyB0aWNrZXQgZmlsZSBjb250ZW50IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9maWxlLlxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldEZpbGUgPSBhc3luYyAoXG4gIGZpbGVJZDogc3RyaW5nLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG51bGw+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vZmlsZWAsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gU2VhcmNoZXMgcHJvamVjdHMgZm9yIGRyb3Bkb3duIHVzYWdlIGluIGZpbHRlcnMgYW5kIGVkaXQgZm9ybXMuXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlUHJvamVjdHMgPSBhc3luYyAoXG4gIHRlcm06IHN0cmluZyxcbiAgcGFnZTogbnVtYmVyLFxuICBwYWdlU2l6ZTogbnVtYmVyLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPFByb2plY3REcm9wZG93blJlc3BvbnNlPiA9PiB7XG4gIGNvbnN0IHNhZmVUZXJtID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyh0ZXJtIHx8IFwiXCIpKTtcbiAgY29uc3Qgc2FmZVBhZ2UgPSBOdW1iZXIuaXNGaW5pdGUocGFnZSkgJiYgcGFnZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2UpIDogMTtcbiAgY29uc3Qgc2FmZVBhZ2VTaXplID0gTnVtYmVyLmlzRmluaXRlKHBhZ2VTaXplKSAmJiBwYWdlU2l6ZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2VTaXplKSA6IDIwO1xuXG4gIHJldHVybiBmZXRjaEpzb248UHJvamVjdERyb3Bkb3duUmVzcG9uc2U+KFxuICAgIGAvR2FzdG9zL0dldFByb2plY3RzRm9yRHJvcGRvd24/dGVybT0ke3NhZmVUZXJtfSZwYWdlPSR7c2FmZVBhZ2V9JnBhZ2VTaXplPSR7c2FmZVBhZ2VTaXplfWAsXG4gICAge1xuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWFPLElBQU0sNkJBQTZCLENBQ3hDLGFBQzhDO0FBQzlDLFNBQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUNILE9BQU8sTUFBTSxRQUFRLFVBQVUsS0FBSyxJQUFJLFNBQVMsUUFBUSxDQUFDO0FBQUEsRUFDNUQ7QUFDRjtBQUVPLElBQU0sK0JBQStCLENBQzFDLGFBQzRDO0FBQzVDLFNBQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUNILE9BQU8sTUFBTSxRQUFRLFVBQVUsS0FBSyxJQUFJLFNBQVMsUUFBUSxDQUFDO0FBQUEsRUFDNUQ7QUFDRjtBQUVPLElBQU0sdUJBQXVCLENBQUksYUFBbUQ7QUFDekYsU0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBQ0gsUUFBUSxNQUFNLFFBQVEsVUFBVSxNQUFNLElBQUksU0FBUyxTQUFTLFVBQVUsVUFBVTtBQUFBLEVBQ2xGO0FBQ0Y7QUFFTyxJQUFNLGlDQUFpQyxDQUM1QyxhQUM4QztBQUM5QyxTQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxPQUFPLE1BQU0sUUFBUSxVQUFVLEtBQUssSUFBSSxTQUFTLFFBQVEs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bk5lZ2F0aXZlTnVtYmVyIiwgImlzUG9zaXRpdmVOdW1iZXIiLCAibm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUiLCAibm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZSIsICJub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1cyIsICJub3JtYWxpemVPcHRpb25hbEFwaURhdGUiLCAibm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlIiwgIm5vcm1hbGl6ZVRpY2tldExpc3REYXRlIiwgIm5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSSIsICJub3JtYWxpemVFeHBlbnNlU2hlZXRMaXN0U3RhdHVzRmlsdGVyIiwgInRvRmxhZ0Jvb2wiLCAicmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lIiwgInNhZmVUZXh0IiwgIm5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlIiwgIm5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplQXBpUmVzcG9uc2UiLCAibm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlIiwgIm5vcm1hbGl6ZVN1Ym9yZGluYXRlc1BhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZSIsICJ0b051bGxhYmxlTnVtYmVyIiwgIm1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkIiwgIm1hcEV4cGVuc2VTaGVldEhlYWRlciIsICJtYXBFeHBlbnNlU2hlZXRMaW5lIiwgIm5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZSIsICJub3JtYWxpemVSZXF1aXJlZEFwaURhdGUiLCAiaXNQb3NpdGl2ZU51bWJlciIsICJpc05vbk5lZ2F0aXZlTnVtYmVyIiwgIm5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlIiwgIm5vcm1hbGl6ZVRpY2tldExpc3REYXRlIiwgIm5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzIiwgIm5vcm1hbGl6ZVRpY2tldExpc3RHYXN0b1R5cGUiXQp9Cg==
