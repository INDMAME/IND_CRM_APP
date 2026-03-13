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
} from "./chunk-KTF6MF2Z.js";
import {
  ApiFetchError,
  fetchJson,
  getCsrfToken,
  handleApiAuthFailure,
  readApiMessageFromRaw
} from "./chunk-IKHTGBEE.js";

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
var normalizeTicketQuickCreateResponse = (response) => {
  const normalized = normalizeApiResponse(response);
  const rawData = normalized?.Data;
  if (!rawData || typeof rawData !== "object") {
    return {
      ...normalized,
      HttpStatus: typeof response?.HttpStatus === "number" ? response.HttpStatus : void 0,
      RetryAfter: safeText(response?.RetryAfter) || null
    };
  }
  const rawStepTraceIds = rawData.StepTraceIds ?? rawData.stepTraceIds;
  const stepTraceIds = rawStepTraceIds && typeof rawStepTraceIds === "object" ? rawStepTraceIds : null;
  return {
    ...normalized,
    HttpStatus: typeof response?.HttpStatus === "number" ? response.HttpStatus : void 0,
    RetryAfter: safeText(response?.RetryAfter) || null,
    Data: {
      FileId: safeText(rawData.FileId ?? rawData.fileId),
      UrlFile: safeText(
        rawData.UrlFile ?? rawData.urlFile
      ),
      FileName: safeText(
        rawData.FileName ?? rawData.fileName
      ),
      ProcessedByAI: toNullableBool(
        rawData.ProcessedByAI ?? rawData.processedByAI
      ),
      LinkedToSheet: toNullableBool(
        rawData.LinkedToSheet ?? rawData.linkedToSheet
      ) === true,
      HojaGastosId: safeText(
        rawData.HojaGastosId ?? rawData.hojaGastosId
      ) || null,
      CompletedStage: safeText(
        rawData.CompletedStage ?? rawData.completedStage
      ),
      StepTraceIds: stepTraceIds ? {
        TicketCreate: safeText(
          stepTraceIds.TicketCreate ?? stepTraceIds.ticketCreate
        ),
        FileUpload: safeText(
          stepTraceIds.FileUpload ?? stepTraceIds.fileUpload
        ),
        DraftExtract: safeText(
          stepTraceIds.DraftExtract ?? stepTraceIds.draftExtract
        ),
        TicketFinalize: safeText(
          stepTraceIds.TicketFinalize ?? stepTraceIds.ticketFinalize
        ),
        SheetLink: safeText(
          stepTraceIds.SheetLink ?? stepTraceIds.sheetLink
        )
      } : null
    }
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
    GastoType: toNullableGastoTypeCode(
      item?.GastoType ?? item?.gastoType
    )
  }));
  return {
    ...response,
    Items: normalizedItems
  };
};
var normalizeTicketLinkListPagedResponse = (response) => {
  const items = Array.isArray(response?.Items) ? response.Items : [];
  const normalizedItems = items.map((item) => ({
    ...item,
    ProcessedByAI: toNullableBool(
      item?.ProcessedByAI ?? item?.processedByAI
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
var normalizeTicketLinkBulkResponse = (response) => {
  const normalized = normalizeApiResponse(response);
  const rawData = normalized?.Data;
  if (!rawData || typeof rawData !== "object") {
    return normalized;
  }
  const toIssueList = (value) => {
    if (!Array.isArray(value)) return [];
    return value.map((entry) => ({
      ticketId: safeText(
        entry?.ticketId ?? entry.TicketId
      ),
      reason: safeText(
        entry?.reason ?? entry.Reason
      )
    }));
  };
  const linkedTicketIdsRaw = rawData.linkedTicketIds ?? rawData.LinkedTicketIds;
  return {
    ...normalized,
    Data: {
      expenseSheetId: safeText(
        rawData.expenseSheetId ?? rawData.ExpenseSheetId
      ),
      requestedCount: toNullableNumber(
        rawData.requestedCount ?? rawData.RequestedCount
      ) ?? 0,
      linkedCount: toNullableNumber(
        rawData.linkedCount ?? rawData.LinkedCount
      ) ?? 0,
      skippedCount: toNullableNumber(
        rawData.skippedCount ?? rawData.SkippedCount
      ) ?? 0,
      failedCount: toNullableNumber(
        rawData.failedCount ?? rawData.FailedCount
      ) ?? 0,
      linkedTicketIds: Array.isArray(linkedTicketIdsRaw) ? linkedTicketIdsRaw.map((entry) => safeText(entry)).filter(Boolean) : [],
      skipped: toIssueList(
        rawData.skipped ?? rawData.Skipped
      ),
      failed: toIssueList(
        rawData.failed ?? rawData.Failed
      )
    }
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
    userName: safeText(item.UserName) || null,
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

// Web/wwwroot/react/src/utils/companySelection.ts
var normalizeCompanyId = (value) => String(value || "").trim().toUpperCase();
var findCompanyMatch = (candidates, requestedCompanyId) => {
  if (!requestedCompanyId) return null;
  for (const candidate of candidates) {
    if (normalizeCompanyId(candidate.companyId) === requestedCompanyId) {
      return candidate;
    }
  }
  return null;
};
var resolveEffectiveCompanyId = (selectedCompanyId, companies, defaultCompanyId) => {
  const normalizedSelectedCompanyId = normalizeCompanyId(selectedCompanyId);
  const normalizedDefaultCompanyId = normalizeCompanyId(defaultCompanyId);
  const normalizedCompanies = Array.isArray(companies) ? companies.filter((candidate) => normalizeCompanyId(candidate.companyId)) : [];
  const selectedMatch = findCompanyMatch(normalizedCompanies, normalizedSelectedCompanyId);
  if (selectedMatch) {
    return selectedMatch.companyId;
  }
  const defaultMatch = findCompanyMatch(normalizedCompanies, normalizedDefaultCompanyId) || normalizedCompanies.find((candidate) => candidate.isDefault === true) || normalizedCompanies[0] || null;
  return defaultMatch?.companyId || "";
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
var tryParseJson = (raw) => {
  if (!raw || !raw.trim()) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
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
var createExpenseAbortError = () => {
  return new DOMException("Aborted", "AbortError");
};
var waitForAbortableExpenseResult = async (promise, signal) => {
  if (!signal) return promise;
  if (signal.aborted) {
    throw createExpenseAbortError();
  }
  return await new Promise((resolve, reject) => {
    const handleAbort = () => {
      signal.removeEventListener("abort", handleAbort);
      reject(createExpenseAbortError());
    };
    signal.addEventListener("abort", handleAbort, { once: true });
    promise.then(
      (value) => {
        signal.removeEventListener("abort", handleAbort);
        resolve(value);
      },
      (error) => {
        signal.removeEventListener("abort", handleAbort);
        reject(error);
      }
    );
  });
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
  const selectedCompanyId = readWindowSelectedCompany();
  const companyId = resolveEffectiveCompanyId(selectedCompanyId, companies, defaultCompany || fallbackCompany);
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
  const { signal, ...baseOptions } = options || {};
  if (cachedContext && cachedContextKey === contextKey) {
    return waitForAbortableExpenseResult(Promise.resolve(cachedContext), signal);
  }
  if (!contextPromise || cachedContextKey !== contextKey) {
    cachedContextKey = contextKey;
    const sharedContextPromise = (async () => {
      const contextPayload = {
        appCode: seed.appCode
      };
      if (safeText2(seed.entraOid)) {
        contextPayload.entraOid = seed.entraOid;
      }
      const contextResponse = await fetchJson("/api/auth/entra/context", {
        ...baseOptions,
        method: "POST",
        headers: buildContextHeaders(seed.token, baseOptions),
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
    contextPromise = sharedContextPromise;
    void sharedContextPromise.finally(() => {
      if (contextPromise === sharedContextPromise) {
        contextPromise = null;
      }
    });
  }
  return await waitForAbortableExpenseResult(contextPromise, signal);
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
var normalizeTicketQuickCreateResponse2 = normalizeTicketQuickCreateResponse;
var normalizeCurrencyPagedResponse2 = normalizeCurrencyPagedResponse;
var normalizeSubordinatesPagedResponse2 = normalizeSubordinatesPagedResponse;
var normalizeTicketListPagedResponse2 = normalizeTicketListPagedResponse;
var normalizeTicketLinkListPagedResponse2 = normalizeTicketLinkListPagedResponse;
var normalizeTicketDetailPagedResponse2 = normalizeTicketDetailPagedResponse;
var normalizeTicketLinkBulkResponse2 = normalizeTicketLinkBulkResponse;
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
    includeSubordinates: payload.includeSubordinates === true,
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
    UserName: safeText2(item.userName) || null,
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
var buildTicketListHeaders = (context, options, axUserIdOverride) => {
  const headers = sanitizeHeaders(buildExpenseHeaders(context, options, true, false));
  const normalizedOverrideAxUserId = normalizeAxUserIdHeader(axUserIdOverride);
  const resolvedAxUserId = safeText2(normalizedOverrideAxUserId || context.axUserId);
  if (resolvedAxUserId) {
    headers["X-IND-AxUserId"] = resolvedAxUserId;
  } else {
    removeHeaderValue(headers, "X-IND-AxUserId");
  }
  return headers;
};
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
    expenseSheetStatus: normalizeExpenseSheetListStatusFilter2(payload.expenseSheetStatus),
    includeSubordinates: payload.includeSubordinates === true
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
var createExpenseSheetTicketQuick = async (payload, options) => {
  if (!payload?.ticketImage) {
    throw new ApiFetchError("ticketImage is required.");
  }
  const { suppressPermissionModal: _suppressPermissionModal, ...fetchOptions } = options || {};
  const context = await ensureExpenseApiContext(fetchOptions);
  const form = new FormData();
  const safeCurrencyCode = safeText2(payload?.currencyCode).toUpperCase();
  const safeDescription = safeText2(payload?.description);
  const safeComentario = safeText2(payload?.comentario);
  const safeSheetId = safeText2(payload?.existingHojaGastosId);
  const safeProjectId = safeText2(payload?.projectId);
  const ticketImage = payload.ticketImage;
  if (ticketImage instanceof File) {
    form.append("ticketImage", ticketImage, safeText2(ticketImage.name) || "ticket.jpg");
  } else {
    form.append("ticketImage", ticketImage, "ticket.jpg");
  }
  if (safeCurrencyCode) {
    form.append("currencyCode", safeCurrencyCode);
  }
  if ("description" in payload) {
    form.append("description", safeDescription);
  }
  if ("comentario" in payload) {
    form.append("comentario", safeComentario);
  }
  if (safeSheetId) {
    form.append("existingHojaGastosId", safeSheetId);
  }
  if (safeSheetId && safeProjectId) {
    form.append("projectId", safeProjectId);
  }
  const csrfToken = getCsrfToken();
  const headers = sanitizeHeaders(buildExpenseFormHeaders(context, fetchOptions));
  if (csrfToken) {
    headers.RequestVerificationToken = csrfToken;
  }
  const response = await fetch("/api/crm/expensesheets/tickets/quick-create", {
    credentials: "same-origin",
    ...fetchOptions,
    method: "POST",
    headers,
    body: form
  });
  const raw = await response.text();
  const retryAfter = safeText2(response.headers.get("Retry-After"));
  if (!response.ok) {
    const reloginResult = await handleApiAuthFailure(
      raw,
      response.status,
      "ticket-quick-create"
    );
    if (reloginResult !== null) {
      return reloginResult;
    }
    if (response.status === 403) {
      throw new ApiFetchError(readApiMessageFromRaw(raw) || "Permission denied.", response.status, raw);
    }
  }
  const parsed = tryParseJson(raw);
  if (!parsed || typeof parsed !== "object") {
    if (!response.ok) {
      throw new ApiFetchError(readApiMessageFromRaw(raw) || "Request failed.", response.status, raw);
    }
    throw new ApiFetchError("Invalid server response.", response.status, raw);
  }
  return normalizeTicketQuickCreateResponse2({
    ...parsed,
    HttpStatus: response.status,
    RetryAfter: retryAfter || null
  });
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
var normalizeTicketFilterCriteriaPayload = (payload) => {
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
  return {
    createdDateFrom: createdDateFrom || void 0,
    createdDateTo: createdDateTo || void 0,
    searchKey: preferredSearchKey || void 0,
    filter: legacyFilter || void 0,
    currencyCode: safeText2(payload?.currencyCode).toUpperCase() || void 0,
    gastoType: normalizeTicketListGastoType2(payload?.gastoType),
    processedByAI: normalizeOptionalTicketProcessedByAI2(payload?.processedByAI)
  };
};
var normalizeTicketListFilterPayload = (payload) => {
  return {
    page: Number.isFinite(payload?.page) && Number(payload.page) > 0 ? Math.floor(Number(payload.page)) : 1,
    pageSize: Number.isFinite(payload?.pageSize) && Number(payload.pageSize) > 0 ? Math.floor(Number(payload.pageSize)) : 50,
    ...normalizeTicketFilterCriteriaPayload(payload)
  };
};
var fetchExpenseSheetTicketsList = async (payload, options) => {
  const { axUserIdOverride, ...baseOptions } = options || {};
  const context = await ensureExpenseApiContext(baseOptions);
  const safePayload = {
    ...normalizeTicketListFilterPayload(payload),
    status: normalizeOptionalTicketStatus2(payload?.status)
  };
  const response = await fetchJson(
    "/api/crm/expensesheets/tickets/list",
    {
      ...baseOptions,
      method: "POST",
      headers: buildTicketListHeaders(context, baseOptions, axUserIdOverride),
      body: JSON.stringify(safePayload)
    }
  );
  return normalizeTicketListPagedResponse2(response);
};
var fetchExpenseSheetTicketLinkList = async (payload, options) => {
  const { axUserIdOverride, ...baseOptions } = options || {};
  const context = await ensureExpenseApiContext(baseOptions);
  const safePayload = {
    ...normalizeTicketListFilterPayload(payload)
  };
  const response = await fetchJson(
    "/api/crm/expensesheets/tickets/link/list",
    {
      ...baseOptions,
      method: "POST",
      headers: buildTicketListHeaders(context, baseOptions, axUserIdOverride),
      body: JSON.stringify(safePayload)
    }
  );
  return normalizeTicketLinkListPagedResponse2(response);
};
var linkExpenseSheetTicketsBulk = async (payload, options) => {
  const { axUserIdOverride, ...baseOptions } = options || {};
  const context = await ensureExpenseApiContext(baseOptions);
  const selectionMode = payload?.selectionMode === "filtered" ? "filtered" : "selected";
  const ticketIds = Array.isArray(payload?.ticketIds) ? payload.ticketIds.map((entry) => safeText2(entry)).filter(Boolean) : [];
  const excludedIds = Array.isArray(payload?.excludedIds) ? payload.excludedIds.map((entry) => safeText2(entry)).filter(Boolean) : [];
  const safePayload = {
    expenseSheetId: safeText2(payload?.expenseSheetId),
    selectionMode,
    ticketIds: selectionMode === "selected" ? ticketIds : void 0,
    filters: selectionMode === "filtered" && payload?.filters ? {
      ...normalizeTicketFilterCriteriaPayload(payload.filters)
    } : void 0,
    excludedIds: selectionMode === "filtered" ? excludedIds : void 0
  };
  const response = await fetchJson(
    "/api/crm/expensesheets/tickets/link/bulk",
    {
      ...baseOptions,
      method: "POST",
      headers: buildTicketListHeaders(context, baseOptions, axUserIdOverride),
      body: JSON.stringify(safePayload)
    }
  );
  return normalizeTicketLinkBulkResponse2(response);
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
var fetchExpenseSheetTicketPreviewBlob = async (fileId, urlFile, options) => {
  const safeFileId = safeText2(fileId);
  const safeUrlFile = safeText2(urlFile);
  if (!safeFileId || !safeUrlFile) {
    throw new ApiFetchError("Missing ticket preview payload.");
  }
  const { suppressPermissionModal: _suppressPermissionModal, ...fetchOptions } = options || {};
  const context = await ensureExpenseApiContext(options);
  const csrfToken = getCsrfToken();
  const headers = sanitizeHeaders(buildExpenseHeaders(context, fetchOptions, true));
  headers.Accept = "image/*";
  const requestHeaders = {
    Accept: "image/*",
    ...headers
  };
  if (csrfToken) {
    requestHeaders["RequestVerificationToken"] = csrfToken;
  }
  const response = await fetch("/api/crm/expensesheets/tickets/preview", {
    credentials: "same-origin",
    ...fetchOptions,
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify({
      fileId: safeFileId,
      urlFile: safeUrlFile
    })
  });
  if (!response.ok) {
    const raw = await response.text();
    const reloginResult = await handleApiAuthFailure(raw, response.status, "ticket-preview");
    if (reloginResult !== null) {
      return reloginResult;
    }
    const message = readApiMessageFromRaw(raw);
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
  createExpenseSheetTicketQuick,
  createExpenseSheetTicket,
  fetchExpenseSheetTicketsList,
  fetchExpenseSheetTicketLinkList,
  linkExpenseSheetTicketsBulk,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlQXBpUmVzcG9uc2VOb3JtYWxpemVycy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VBcGlNYXBwZXJzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy91dGlscy9jb21wYW55U2VsZWN0aW9uLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZUFwaS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHR5cGUge1xuICBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0byxcbiAgRXhwZW5zZVNoZWV0RGV0YWlsRHRvLFxuICBFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0byxcbiAgRXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvLFxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0byxcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RJdGVtRHRvLFxuICBFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlc3VsdCxcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8sXG4gIEV4cGVuc2VTaGVldExpc3RJdGVtRHRvLFxuICBJbmRBcGlSZXNwb25zZSxcbiAgSW5kUGFnZWRSZXNwb25zZSxcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHtcbiAgc2FmZVRleHQsXG4gIHRvTnVsbGFibGVCb29sLFxuICB0b051bGxhYmxlR2FzdG9UeXBlQ29kZSxcbiAgdG9OdWxsYWJsZU51bWJlcixcbiAgdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGUsXG59IGZyb20gXCIuL2V4cGVuc2VBcGlUcmFuc2Zvcm1zLnRzXCI7XG5pbXBvcnQgeyBub3JtYWxpemVFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZXMgfSBmcm9tIFwiLi9leHBlbnNlU3Vib3JkaW5hdGVNYXBwZXIudHNcIjtcblxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz5cbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+ID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5yZXNwb25zZSxcbiAgICBJdGVtczogQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXSxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXREZXRhaWxEdG8+XG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldERldGFpbER0bz4gPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLnJlc3BvbnNlLFxuICAgIEl0ZW1zOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUFwaVJlc3BvbnNlID0gPFQ+KHJlc3BvbnNlOiBJbmRBcGlSZXNwb25zZTxUPik6IEluZEFwaVJlc3BvbnNlPFQ+ID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5yZXNwb25zZSxcbiAgICBFcnJvcnM6IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/LkVycm9ycykgPyByZXNwb25zZS5FcnJvcnMgOiByZXNwb25zZT8uRXJyb3JzID8/IG51bGwsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZSA9IChcbiAgcmVzcG9uc2U6IEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVzdWx0XG4pOiBFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlc3VsdCA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG4gIGNvbnN0IHJhd0RhdGEgPSBub3JtYWxpemVkPy5EYXRhO1xuICBpZiAoIXJhd0RhdGEgfHwgdHlwZW9mIHJhd0RhdGEgIT09IFwib2JqZWN0XCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4ubm9ybWFsaXplZCxcbiAgICAgIEh0dHBTdGF0dXM6IHR5cGVvZiByZXNwb25zZT8uSHR0cFN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IHJlc3BvbnNlLkh0dHBTdGF0dXMgOiB1bmRlZmluZWQsXG4gICAgICBSZXRyeUFmdGVyOiBzYWZlVGV4dChyZXNwb25zZT8uUmV0cnlBZnRlcikgfHwgbnVsbCxcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgcmF3U3RlcFRyYWNlSWRzID1cbiAgICAocmF3RGF0YSBhcyB7IFN0ZXBUcmFjZUlkcz86IHVua25vd247IHN0ZXBUcmFjZUlkcz86IHVua25vd24gfSkuU3RlcFRyYWNlSWRzID8/XG4gICAgKHJhd0RhdGEgYXMgeyBzdGVwVHJhY2VJZHM/OiB1bmtub3duIH0pLnN0ZXBUcmFjZUlkcztcbiAgY29uc3Qgc3RlcFRyYWNlSWRzID0gcmF3U3RlcFRyYWNlSWRzICYmIHR5cGVvZiByYXdTdGVwVHJhY2VJZHMgPT09IFwib2JqZWN0XCIgPyByYXdTdGVwVHJhY2VJZHMgOiBudWxsO1xuXG4gIHJldHVybiB7XG4gICAgLi4ubm9ybWFsaXplZCxcbiAgICBIdHRwU3RhdHVzOiB0eXBlb2YgcmVzcG9uc2U/Lkh0dHBTdGF0dXMgPT09IFwibnVtYmVyXCIgPyByZXNwb25zZS5IdHRwU3RhdHVzIDogdW5kZWZpbmVkLFxuICAgIFJldHJ5QWZ0ZXI6IHNhZmVUZXh0KHJlc3BvbnNlPy5SZXRyeUFmdGVyKSB8fCBudWxsLFxuICAgIERhdGE6IHtcbiAgICAgIEZpbGVJZDogc2FmZVRleHQoKHJhd0RhdGEgYXMgeyBGaWxlSWQ/OiB1bmtub3duOyBmaWxlSWQ/OiB1bmtub3duIH0pLkZpbGVJZCA/PyAocmF3RGF0YSBhcyB7IGZpbGVJZD86IHVua25vd24gfSkuZmlsZUlkKSxcbiAgICAgIFVybEZpbGU6IHNhZmVUZXh0KFxuICAgICAgICAocmF3RGF0YSBhcyB7IFVybEZpbGU/OiB1bmtub3duOyB1cmxGaWxlPzogdW5rbm93biB9KS5VcmxGaWxlID8/IChyYXdEYXRhIGFzIHsgdXJsRmlsZT86IHVua25vd24gfSkudXJsRmlsZVxuICAgICAgKSxcbiAgICAgIEZpbGVOYW1lOiBzYWZlVGV4dChcbiAgICAgICAgKHJhd0RhdGEgYXMgeyBGaWxlTmFtZT86IHVua25vd247IGZpbGVOYW1lPzogdW5rbm93biB9KS5GaWxlTmFtZSA/P1xuICAgICAgICAgIChyYXdEYXRhIGFzIHsgZmlsZU5hbWU/OiB1bmtub3duIH0pLmZpbGVOYW1lXG4gICAgICApLFxuICAgICAgUHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woXG4gICAgICAgIChyYXdEYXRhIGFzIHsgUHJvY2Vzc2VkQnlBST86IHVua25vd247IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pLlByb2Nlc3NlZEJ5QUkgPz9cbiAgICAgICAgICAocmF3RGF0YSBhcyB7IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pLnByb2Nlc3NlZEJ5QUlcbiAgICAgICksXG4gICAgICBMaW5rZWRUb1NoZWV0OlxuICAgICAgICB0b051bGxhYmxlQm9vbChcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IExpbmtlZFRvU2hlZXQ/OiB1bmtub3duOyBsaW5rZWRUb1NoZWV0PzogdW5rbm93biB9KS5MaW5rZWRUb1NoZWV0ID8/XG4gICAgICAgICAgICAocmF3RGF0YSBhcyB7IGxpbmtlZFRvU2hlZXQ/OiB1bmtub3duIH0pLmxpbmtlZFRvU2hlZXRcbiAgICAgICAgKSA9PT0gdHJ1ZSxcbiAgICAgIEhvamFHYXN0b3NJZDpcbiAgICAgICAgc2FmZVRleHQoXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBIb2phR2FzdG9zSWQ/OiB1bmtub3duOyBob2phR2FzdG9zSWQ/OiB1bmtub3duIH0pLkhvamFHYXN0b3NJZCA/P1xuICAgICAgICAgICAgKHJhd0RhdGEgYXMgeyBob2phR2FzdG9zSWQ/OiB1bmtub3duIH0pLmhvamFHYXN0b3NJZFxuICAgICAgICApIHx8IG51bGwsXG4gICAgICBDb21wbGV0ZWRTdGFnZTogc2FmZVRleHQoXG4gICAgICAgIChyYXdEYXRhIGFzIHsgQ29tcGxldGVkU3RhZ2U/OiB1bmtub3duOyBjb21wbGV0ZWRTdGFnZT86IHVua25vd24gfSkuQ29tcGxldGVkU3RhZ2UgPz9cbiAgICAgICAgICAocmF3RGF0YSBhcyB7IGNvbXBsZXRlZFN0YWdlPzogdW5rbm93biB9KS5jb21wbGV0ZWRTdGFnZVxuICAgICAgKSxcbiAgICAgIFN0ZXBUcmFjZUlkczogc3RlcFRyYWNlSWRzXG4gICAgICAgID8ge1xuICAgICAgICAgICAgVGlja2V0Q3JlYXRlOiBzYWZlVGV4dChcbiAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IFRpY2tldENyZWF0ZT86IHVua25vd247IHRpY2tldENyZWF0ZT86IHVua25vd24gfSkuVGlja2V0Q3JlYXRlID8/XG4gICAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IHRpY2tldENyZWF0ZT86IHVua25vd24gfSkudGlja2V0Q3JlYXRlXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgRmlsZVVwbG9hZDogc2FmZVRleHQoXG4gICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyBGaWxlVXBsb2FkPzogdW5rbm93bjsgZmlsZVVwbG9hZD86IHVua25vd24gfSkuRmlsZVVwbG9hZCA/P1xuICAgICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyBmaWxlVXBsb2FkPzogdW5rbm93biB9KS5maWxlVXBsb2FkXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgRHJhZnRFeHRyYWN0OiBzYWZlVGV4dChcbiAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IERyYWZ0RXh0cmFjdD86IHVua25vd247IGRyYWZ0RXh0cmFjdD86IHVua25vd24gfSkuRHJhZnRFeHRyYWN0ID8/XG4gICAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IGRyYWZ0RXh0cmFjdD86IHVua25vd24gfSkuZHJhZnRFeHRyYWN0XG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgVGlja2V0RmluYWxpemU6IHNhZmVUZXh0KFxuICAgICAgICAgICAgICAoc3RlcFRyYWNlSWRzIGFzIHsgVGlja2V0RmluYWxpemU/OiB1bmtub3duOyB0aWNrZXRGaW5hbGl6ZT86IHVua25vd24gfSkuVGlja2V0RmluYWxpemUgPz9cbiAgICAgICAgICAgICAgICAoc3RlcFRyYWNlSWRzIGFzIHsgdGlja2V0RmluYWxpemU/OiB1bmtub3duIH0pLnRpY2tldEZpbmFsaXplXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgU2hlZXRMaW5rOiBzYWZlVGV4dChcbiAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IFNoZWV0TGluaz86IHVua25vd247IHNoZWV0TGluaz86IHVua25vd24gfSkuU2hlZXRMaW5rID8/XG4gICAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IHNoZWV0TGluaz86IHVua25vd24gfSkuc2hlZXRMaW5rXG4gICAgICAgICAgICApLFxuICAgICAgICAgIH1cbiAgICAgICAgOiBudWxsLFxuICAgIH0sXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz5cbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+ID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5yZXNwb25zZSxcbiAgICBJdGVtczogQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXSxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTx1bmtub3duPlxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0bz4gPT4ge1xuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBub3JtYWxpemVFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZXMocmVzcG9uc2U/Lkl0ZW1zKTtcblxuICByZXR1cm4ge1xuICAgIC4uLnJlc3BvbnNlLFxuICAgIEl0ZW1zOiBub3JtYWxpemVkSXRlbXMsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2UgPSAoXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvPlxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz4gPT4ge1xuICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XG4gIGNvbnN0IG5vcm1hbGl6ZWRJdGVtcyA9IGl0ZW1zLm1hcCgoaXRlbSkgPT4gKHtcbiAgICAuLi5pdGVtLFxuICAgIFN0YXR1czogdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGUoXG4gICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LlN0YXR1cyA/P1xuICAgICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LnN0YXR1c1xuICAgICksXG4gICAgUHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woXG4gICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8uUHJvY2Vzc2VkQnlBSSA/P1xuICAgICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8ucHJvY2Vzc2VkQnlBSVxuICAgICksXG4gICAgR2FzdG9UeXBlOiB0b051bGxhYmxlR2FzdG9UeXBlQ29kZShcbiAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uR2FzdG9UeXBlID8/XG4gICAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uZ2FzdG9UeXBlXG4gICAgKSxcbiAgfSkpO1xuXG4gIHJldHVybiB7XG4gICAgLi4ucmVzcG9uc2UsXG4gICAgSXRlbXM6IG5vcm1hbGl6ZWRJdGVtcyxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVUaWNrZXRMaW5rTGlzdFBhZ2VkUmVzcG9uc2UgPSAoXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0bz5cbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RJdGVtRHRvPiA9PiB7XG4gIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcbiAgY29uc3Qgbm9ybWFsaXplZEl0ZW1zID0gaXRlbXMubWFwKChpdGVtKSA9PiAoe1xuICAgIC4uLml0ZW0sXG4gICAgUHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woXG4gICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8uUHJvY2Vzc2VkQnlBSSA/P1xuICAgICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8ucHJvY2Vzc2VkQnlBSVxuICAgICksXG4gICAgR2FzdG9UeXBlOiB0b051bGxhYmxlR2FzdG9UeXBlQ29kZShcbiAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uR2FzdG9UeXBlID8/XG4gICAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uZ2FzdG9UeXBlXG4gICAgKSxcbiAgfSkpO1xuXG4gIHJldHVybiB7XG4gICAgLi4ucmVzcG9uc2UsXG4gICAgSXRlbXM6IG5vcm1hbGl6ZWRJdGVtcyxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlID0gKFxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXREZXRhaWxEdG8+XG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldERldGFpbER0bz4gPT4ge1xuICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XG4gIGNvbnN0IG5vcm1hbGl6ZWRJdGVtcyA9IGl0ZW1zLm1hcCgoaXRlbSkgPT4gKHtcbiAgICAuLi5pdGVtLFxuICAgIFN0YXR1czogdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGUoXG4gICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LlN0YXR1cyA/P1xuICAgICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LnN0YXR1c1xuICAgICksXG4gICAgUHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woXG4gICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8uUHJvY2Vzc2VkQnlBSSA/P1xuICAgICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8ucHJvY2Vzc2VkQnlBSVxuICAgICksXG4gICAgSG9qYUdhc3Rvc0lkRGlzcGxheTogc2FmZVRleHQoXG4gICAgICAoaXRlbSBhcyB7IEhvamFHYXN0b3NJZERpc3BsYXk/OiB1bmtub3duOyBob2phR2FzdG9zSWREaXNwbGF5PzogdW5rbm93biB9KT8uSG9qYUdhc3Rvc0lkRGlzcGxheSA/P1xuICAgICAgICAoaXRlbSBhcyB7IEhvamFHYXN0b3NJZERpc3BsYXk/OiB1bmtub3duOyBob2phR2FzdG9zSWREaXNwbGF5PzogdW5rbm93biB9KT8uaG9qYUdhc3Rvc0lkRGlzcGxheVxuICAgICksXG4gICAgR2FzdG9UeXBlOiB0b051bGxhYmxlR2FzdG9UeXBlQ29kZShcbiAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uR2FzdG9UeXBlID8/XG4gICAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uZ2FzdG9UeXBlXG4gICAgKSxcbiAgICBMaW5lczogQXJyYXkuaXNBcnJheShpdGVtPy5MaW5lcykgPyBpdGVtLkxpbmVzIDogW10sXG4gIH0pKTtcblxuICByZXR1cm4ge1xuICAgIC4uLnJlc3BvbnNlLFxuICAgIEl0ZW1zOiBub3JtYWxpemVkSXRlbXMsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplVGlja2V0TGlua0J1bGtSZXNwb25zZSA9IChcbiAgcmVzcG9uc2U6IEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvPlxuKTogSW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXN1bHREdG8+ID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgY29uc3QgcmF3RGF0YSA9IG5vcm1hbGl6ZWQ/LkRhdGE7XG4gIGlmICghcmF3RGF0YSB8fCB0eXBlb2YgcmF3RGF0YSAhPT0gXCJvYmplY3RcIikge1xuICAgIHJldHVybiBub3JtYWxpemVkO1xuICB9XG5cbiAgY29uc3QgdG9Jc3N1ZUxpc3QgPSAodmFsdWU6IHVua25vd24pID0+IHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gW107XG5cbiAgICByZXR1cm4gdmFsdWUubWFwKChlbnRyeSkgPT4gKHtcbiAgICAgIHRpY2tldElkOiBzYWZlVGV4dChcbiAgICAgICAgKGVudHJ5IGFzIHsgdGlja2V0SWQ/OiB1bmtub3duOyBUaWNrZXRJZD86IHVua25vd24gfSk/LnRpY2tldElkID8/XG4gICAgICAgICAgKGVudHJ5IGFzIHsgVGlja2V0SWQ/OiB1bmtub3duIH0pLlRpY2tldElkXG4gICAgICApLFxuICAgICAgcmVhc29uOiBzYWZlVGV4dChcbiAgICAgICAgKGVudHJ5IGFzIHsgcmVhc29uPzogdW5rbm93bjsgUmVhc29uPzogdW5rbm93biB9KT8ucmVhc29uID8/XG4gICAgICAgICAgKGVudHJ5IGFzIHsgUmVhc29uPzogdW5rbm93biB9KS5SZWFzb25cbiAgICAgICksXG4gICAgfSkpO1xuICB9O1xuXG4gIGNvbnN0IGxpbmtlZFRpY2tldElkc1JhdyA9XG4gICAgKHJhd0RhdGEgYXMgeyBsaW5rZWRUaWNrZXRJZHM/OiB1bmtub3duOyBMaW5rZWRUaWNrZXRJZHM/OiB1bmtub3duIH0pLmxpbmtlZFRpY2tldElkcyA/P1xuICAgIChyYXdEYXRhIGFzIHsgTGlua2VkVGlja2V0SWRzPzogdW5rbm93biB9KS5MaW5rZWRUaWNrZXRJZHM7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5ub3JtYWxpemVkLFxuICAgIERhdGE6IHtcbiAgICAgIGV4cGVuc2VTaGVldElkOiBzYWZlVGV4dChcbiAgICAgICAgKHJhd0RhdGEgYXMgeyBleHBlbnNlU2hlZXRJZD86IHVua25vd247IEV4cGVuc2VTaGVldElkPzogdW5rbm93biB9KS5leHBlbnNlU2hlZXRJZCA/P1xuICAgICAgICAgIChyYXdEYXRhIGFzIHsgRXhwZW5zZVNoZWV0SWQ/OiB1bmtub3duIH0pLkV4cGVuc2VTaGVldElkXG4gICAgICApLFxuICAgICAgcmVxdWVzdGVkQ291bnQ6IHRvTnVsbGFibGVOdW1iZXIoXG4gICAgICAgIChyYXdEYXRhIGFzIHsgcmVxdWVzdGVkQ291bnQ/OiB1bmtub3duOyBSZXF1ZXN0ZWRDb3VudD86IHVua25vd24gfSkucmVxdWVzdGVkQ291bnQgPz9cbiAgICAgICAgICAocmF3RGF0YSBhcyB7IFJlcXVlc3RlZENvdW50PzogdW5rbm93biB9KS5SZXF1ZXN0ZWRDb3VudFxuICAgICAgKSA/PyAwLFxuICAgICAgbGlua2VkQ291bnQ6IHRvTnVsbGFibGVOdW1iZXIoXG4gICAgICAgIChyYXdEYXRhIGFzIHsgbGlua2VkQ291bnQ/OiB1bmtub3duOyBMaW5rZWRDb3VudD86IHVua25vd24gfSkubGlua2VkQ291bnQgPz9cbiAgICAgICAgICAocmF3RGF0YSBhcyB7IExpbmtlZENvdW50PzogdW5rbm93biB9KS5MaW5rZWRDb3VudFxuICAgICAgKSA/PyAwLFxuICAgICAgc2tpcHBlZENvdW50OiB0b051bGxhYmxlTnVtYmVyKFxuICAgICAgICAocmF3RGF0YSBhcyB7IHNraXBwZWRDb3VudD86IHVua25vd247IFNraXBwZWRDb3VudD86IHVua25vd24gfSkuc2tpcHBlZENvdW50ID8/XG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBTa2lwcGVkQ291bnQ/OiB1bmtub3duIH0pLlNraXBwZWRDb3VudFxuICAgICAgKSA/PyAwLFxuICAgICAgZmFpbGVkQ291bnQ6IHRvTnVsbGFibGVOdW1iZXIoXG4gICAgICAgIChyYXdEYXRhIGFzIHsgZmFpbGVkQ291bnQ/OiB1bmtub3duOyBGYWlsZWRDb3VudD86IHVua25vd24gfSkuZmFpbGVkQ291bnQgPz9cbiAgICAgICAgICAocmF3RGF0YSBhcyB7IEZhaWxlZENvdW50PzogdW5rbm93biB9KS5GYWlsZWRDb3VudFxuICAgICAgKSA/PyAwLFxuICAgICAgbGlua2VkVGlja2V0SWRzOiBBcnJheS5pc0FycmF5KGxpbmtlZFRpY2tldElkc1JhdylcbiAgICAgICAgPyBsaW5rZWRUaWNrZXRJZHNSYXcubWFwKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnkpKS5maWx0ZXIoQm9vbGVhbilcbiAgICAgICAgOiBbXSxcbiAgICAgIHNraXBwZWQ6IHRvSXNzdWVMaXN0KFxuICAgICAgICAocmF3RGF0YSBhcyB7IHNraXBwZWQ/OiB1bmtub3duOyBTa2lwcGVkPzogdW5rbm93biB9KS5za2lwcGVkID8/XG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBTa2lwcGVkPzogdW5rbm93biB9KS5Ta2lwcGVkXG4gICAgICApLFxuICAgICAgZmFpbGVkOiB0b0lzc3VlTGlzdChcbiAgICAgICAgKHJhd0RhdGEgYXMgeyBmYWlsZWQ/OiB1bmtub3duOyBGYWlsZWQ/OiB1bmtub3duIH0pLmZhaWxlZCA/P1xuICAgICAgICAgIChyYXdEYXRhIGFzIHsgRmFpbGVkPzogdW5rbm93biB9KS5GYWlsZWRcbiAgICAgICksXG4gICAgfSxcbiAgfTtcbn07XG4iLCAiXHVGRUZGaW1wb3J0IHR5cGUge1xuICBFeHBlbnNlU2hlZXRDYXJkLFxuICBFeHBlbnNlU2hlZXREZXRhaWxEdG8sXG4gIEV4cGVuc2VTaGVldEhlYWRlcixcbiAgRXhwZW5zZVNoZWV0TGluZSxcbiAgRXhwZW5zZVNoZWV0TGluZUR0byxcbiAgRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8sXG59IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7IHNhZmVUZXh0LCB0b051bGxhYmxlQm9vbCwgdG9OdWxsYWJsZU51bWJlciB9IGZyb20gXCIuL2V4cGVuc2VBcGlUcmFuc2Zvcm1zLnRzXCI7XG5cbnR5cGUgRXhwZW5zZVdpbmRvd1J1bnRpbWUgPSB7XG4gIF9fRVhQRU5TRV9HQVNUT19UWVBFU19fPzogQXJyYXk8e1xuICAgIHZhbHVlPzogdW5rbm93bjtcbiAgICBWYWx1ZT86IHVua25vd247XG4gICAgdGV4dD86IHVua25vd247XG4gICAgVGV4dD86IHVua25vd247XG4gIH0+O1xufTtcblxudHlwZSBFeHBlbnNlR2FzdG9UeXBlRW50cnkgPSBOb25OdWxsYWJsZTxFeHBlbnNlV2luZG93UnVudGltZVtcIl9fRVhQRU5TRV9HQVNUT19UWVBFU19fXCJdPltudW1iZXJdO1xuXG5jb25zdCByZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUgPSAoKTogRXhwZW5zZVdpbmRvd1J1bnRpbWUgPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHt9O1xuICByZXR1cm4gd2luZG93IGFzIHVua25vd24gYXMgRXhwZW5zZVdpbmRvd1J1bnRpbWU7XG59O1xuXG5jb25zdCByZXNvbHZlVHlwZUxhYmVsID0gKHR5cGVWYWx1ZUNvZGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGlmICghdHlwZVZhbHVlQ29kZSB8fCB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHR5cGVWYWx1ZUNvZGU7XG4gIH1cblxuICBjb25zdCByYXdDYXRhbG9nU291cmNlID0gcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lKCkuX19FWFBFTlNFX0dBU1RPX1RZUEVTX187XG4gIGNvbnN0IHJhd0NhdGFsb2cgPSBBcnJheS5pc0FycmF5KHJhd0NhdGFsb2dTb3VyY2UpID8gcmF3Q2F0YWxvZ1NvdXJjZSA6IFtdO1xuICBjb25zdCBtYXRjaCA9IHJhd0NhdGFsb2cuZmluZCgoZW50cnk6IEV4cGVuc2VHYXN0b1R5cGVFbnRyeSkgPT4ge1xuICAgIGNvbnN0IGVudHJ5Q29kZSA9IHNhZmVUZXh0KGVudHJ5Py52YWx1ZSB8fCBlbnRyeT8uVmFsdWUpO1xuICAgIHJldHVybiBlbnRyeUNvZGUgPT09IHR5cGVWYWx1ZUNvZGU7XG4gIH0pO1xuXG4gIHJldHVybiBzYWZlVGV4dChtYXRjaD8udGV4dCB8fCBtYXRjaD8uVGV4dCkgfHwgdHlwZVZhbHVlQ29kZTtcbn07XG5cbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9saXN0IGl0ZW0gY29udHJhY3QgdG8gbGlzdCBjYXJkIFVJIG1vZGVsLlxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkID0gKGl0ZW06IEV4cGVuc2VTaGVldExpc3RJdGVtRHRvKTogRXhwZW5zZVNoZWV0Q2FyZCA9PiB7XG4gIHJldHVybiB7XG4gICAgaG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChpdGVtLkhvamFHYXN0b3NJZCksXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KGl0ZW0uRGVzY3JpcHRpb24pLFxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogdG9OdWxsYWJsZU51bWJlcihpdGVtLkV4cGVuc2VTaGVldFN0YXR1cyksXG4gICAgZXN0YWRvQ29tZW50YXJpb3M6IHNhZmVUZXh0KGl0ZW0uRXN0YWRvQ29tZW50YXJpb3MpIHx8IG51bGwsXG4gICAgdXNlcklkOiBzYWZlVGV4dChpdGVtLlVzZXJJZCksXG4gICAgdXNlck5hbWU6IHNhZmVUZXh0KGl0ZW0uVXNlck5hbWUpIHx8IG51bGwsXG4gICAgdm91Y2hlcjogc2FmZVRleHQoaXRlbS5Wb3VjaGVyKSxcbiAgICBwcm9qSWQ6IHNhZmVUZXh0KGl0ZW0uUHJvaklkKSxcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGl0ZW0uQ3VycmVuY3lDb2RlKSxcbiAgICB0b3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihpdGVtLlRvdGFsQW1vdW50KSxcbiAgICBleGNoUmF0ZTogdG9OdWxsYWJsZU51bWJlcihpdGVtLkV4Y2hSYXRlKSxcbiAgICBleGNoYW5nZVJhdGVNb2RlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uRXhjaGFuZ2VSYXRlTW9kZSksXG4gICAgY3JlYXRlZERhdGU6IHNhZmVUZXh0KGl0ZW0uQ3JlYXRlZERhdGUpLFxuICB9O1xufTtcblxuLy8gTWFwcyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9IGhlYWRlciBjb250cmFjdCB0byBVSSBtb2RlbC5cbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRIZWFkZXIgPSAoc2hlZXQ6IEV4cGVuc2VTaGVldERldGFpbER0byk6IEV4cGVuc2VTaGVldEhlYWRlciA9PiB7XG4gIHJldHVybiB7XG4gICAgaG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChzaGVldC5Ib2phR2FzdG9zSWQpLFxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChzaGVldC5EZXNjcmlwdGlvbiksXG4gICAgdXNlcklkOiBzYWZlVGV4dChzaGVldC5Vc2VySWQpLFxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogdG9OdWxsYWJsZU51bWJlcihzaGVldC5FeHBlbnNlU2hlZXRTdGF0dXMpLFxuICAgIGVzdGFkb0NvbWVudGFyaW9zOiBzYWZlVGV4dChzaGVldC5Fc3RhZG9Db21lbnRhcmlvcykgfHwgbnVsbCxcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KHNoZWV0LkN1cnJlbmN5Q29kZSksXG4gICAgdG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoc2hlZXQuVG90YWxBbW91bnQpLFxuICAgIGV4Y2hSYXRlOiBzYWZlVGV4dChzaGVldC5FeGNoUmF0ZSksXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogdG9OdWxsYWJsZU51bWJlcihzaGVldC5FeGNoYW5nZVJhdGVNb2RlKSxcbiAgICBwcm9qSWQ6IHNhZmVUZXh0KHNoZWV0LlByb2pJZCksXG4gICAgdm91Y2hlcjogc2FmZVRleHQoc2hlZXQuVm91Y2hlciksXG4gICAgY3JlYXRlZERhdGU6IHNhZmVUZXh0KHNoZWV0LkNyZWF0ZWREYXRlKSxcbiAgfTtcbn07XG5cbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfSBsaW5lIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldExpbmUgPSAobGluZTogRXhwZW5zZVNoZWV0TGluZUR0byk6IEV4cGVuc2VTaGVldExpbmUgPT4ge1xuICBjb25zdCB0eXBlVmFsdWVDb2RlID0gc2FmZVRleHQobGluZS5UeXBlVmFsdWUpO1xuICBjb25zdCBsZWdhY3lQcmljZSA9IChsaW5lIGFzIHsgcHJpY2U/OiB1bmtub3duIH0pLnByaWNlO1xuICBjb25zdCBsZWdhY3lGaWxlSWQgPSAobGluZSBhcyB7IGZpbGVJZD86IHVua25vd24gfSkuZmlsZUlkO1xuXG4gIHJldHVybiB7XG4gICAgbGluZVJlY0lkOiBzYWZlVGV4dChsaW5lLlJlY0lkKSxcbiAgICB0cmFuc0RhdGU6IHNhZmVUZXh0KGxpbmUuVHJhbnNEYXRlKSxcbiAgICB0eXBlVmFsdWVDb2RlLFxuICAgIHR5cGVWYWx1ZTogcmVzb2x2ZVR5cGVMYWJlbCh0eXBlVmFsdWVDb2RlKSxcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQobGluZS5EZXNjcmlwdGlvbiksXG4gICAgaW50ZXJuYWNpb25hbDogdG9OdWxsYWJsZUJvb2wobGluZS5JbnRlcm5hY2lvbmFsKSxcbiAgICBmaWxlSWQ6IHNhZmVUZXh0KGxpbmUuRmlsZUlkID8/IGxlZ2FjeUZpbGVJZCksXG4gICAgdGlja2V0OiB0b051bGxhYmxlQm9vbChsaW5lLlRpY2tldCksXG4gICAgcHJpY2U6IHRvTnVsbGFibGVOdW1iZXIobGluZS5QcmljZSA/PyBsZWdhY3lQcmljZSksXG4gICAgcXR5OiB0b051bGxhYmxlTnVtYmVyKGxpbmUuUXR5KSxcbiAgICBhbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIobGluZS5BbW91bnQpLFxuICAgIHByb2pJZDogc2FmZVRleHQobGluZS5Qcm9qSWQpLFxuICAgIGluZEF0dGFjaEZpbGVzOiBzYWZlVGV4dChsaW5lLkluZEF0dGFjaEZpbGVzKSxcbiAgfTtcbn07XHJcbiIsICJ0eXBlIENvbXBhbnlTZWxlY3Rpb25DYW5kaWRhdGUgPSB7XG4gIGNvbXBhbnlJZDogc3RyaW5nO1xuICBpc0RlZmF1bHQ/OiBib29sZWFuO1xufTtcblxuY29uc3Qgbm9ybWFsaXplQ29tcGFueUlkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcblxuY29uc3QgZmluZENvbXBhbnlNYXRjaCA9IChcbiAgY2FuZGlkYXRlczogQ29tcGFueVNlbGVjdGlvbkNhbmRpZGF0ZVtdLFxuICByZXF1ZXN0ZWRDb21wYW55SWQ6IHN0cmluZ1xuKTogQ29tcGFueVNlbGVjdGlvbkNhbmRpZGF0ZSB8IG51bGwgPT4ge1xuICBpZiAoIXJlcXVlc3RlZENvbXBhbnlJZCkgcmV0dXJuIG51bGw7XG5cbiAgZm9yIChjb25zdCBjYW5kaWRhdGUgb2YgY2FuZGlkYXRlcykge1xuICAgIGlmIChub3JtYWxpemVDb21wYW55SWQoY2FuZGlkYXRlLmNvbXBhbnlJZCkgPT09IHJlcXVlc3RlZENvbXBhbnlJZCkge1xuICAgICAgcmV0dXJuIGNhbmRpZGF0ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn07XG5cbi8vIFJlc29sdmVzIHRoZSBlZmZlY3RpdmUgY29tcGFueSBmb3IgQVBJIGNhbGxzOiBtYW51YWwgc2VsZWN0aW9uIHdpbnMgb25seSB3aGVuIGl0IGV4aXN0cyBpbiB0aGUgY3VycmVudCBjb250ZXh0LlxuZXhwb3J0IGNvbnN0IHJlc29sdmVFZmZlY3RpdmVDb21wYW55SWQgPSAoXG4gIHNlbGVjdGVkQ29tcGFueUlkOiB1bmtub3duLFxuICBjb21wYW5pZXM6IENvbXBhbnlTZWxlY3Rpb25DYW5kaWRhdGVbXSxcbiAgZGVmYXVsdENvbXBhbnlJZD86IHVua25vd25cbik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRTZWxlY3RlZENvbXBhbnlJZCA9IG5vcm1hbGl6ZUNvbXBhbnlJZChzZWxlY3RlZENvbXBhbnlJZCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWREZWZhdWx0Q29tcGFueUlkID0gbm9ybWFsaXplQ29tcGFueUlkKGRlZmF1bHRDb21wYW55SWQpO1xuICBjb25zdCBub3JtYWxpemVkQ29tcGFuaWVzID0gQXJyYXkuaXNBcnJheShjb21wYW5pZXMpXG4gICAgPyBjb21wYW5pZXMuZmlsdGVyKChjYW5kaWRhdGUpID0+IG5vcm1hbGl6ZUNvbXBhbnlJZChjYW5kaWRhdGUuY29tcGFueUlkKSlcbiAgICA6IFtdO1xuXG4gIGNvbnN0IHNlbGVjdGVkTWF0Y2ggPSBmaW5kQ29tcGFueU1hdGNoKG5vcm1hbGl6ZWRDb21wYW5pZXMsIG5vcm1hbGl6ZWRTZWxlY3RlZENvbXBhbnlJZCk7XG4gIGlmIChzZWxlY3RlZE1hdGNoKSB7XG4gICAgcmV0dXJuIHNlbGVjdGVkTWF0Y2guY29tcGFueUlkO1xuICB9XG5cbiAgY29uc3QgZGVmYXVsdE1hdGNoID1cbiAgICBmaW5kQ29tcGFueU1hdGNoKG5vcm1hbGl6ZWRDb21wYW5pZXMsIG5vcm1hbGl6ZWREZWZhdWx0Q29tcGFueUlkKSB8fFxuICAgIG5vcm1hbGl6ZWRDb21wYW5pZXMuZmluZCgoY2FuZGlkYXRlKSA9PiBjYW5kaWRhdGUuaXNEZWZhdWx0ID09PSB0cnVlKSB8fFxuICAgIG5vcm1hbGl6ZWRDb21wYW5pZXNbMF0gfHxcbiAgICBudWxsO1xuXG4gIHJldHVybiBkZWZhdWx0TWF0Y2g/LmNvbXBhbnlJZCB8fCBcIlwiO1xufTtcbiIsICJpbXBvcnQge1xuICBBcGlGZXRjaEVycm9yLFxuICBmZXRjaEpzb24sXG4gIGdldENzcmZUb2tlbixcbiAgaGFuZGxlQXBpQXV0aEZhaWx1cmUsXG4gIHJlYWRBcGlNZXNzYWdlRnJvbVJhdyxcbiAgdHlwZSBBcGlGZXRjaE9wdGlvbnMsXG59IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgdHlwZSB7XG4gIEVudHJhQ29udGV4dER0byxcbiAgRW50cmFDb250ZXh0UmVxdWVzdCxcbiAgRXhjaGFuZ2VSYXRlRHRvLFxuICBGdWVsUHJpY2VLbUR0byxcbiAgRXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8sXG4gIEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldENyZWF0ZVJlc3BvbnNlRGF0YSxcbiAgRXhwZW5zZVNoZWV0RGV0YWlsRHRvLFxuICBFeHBlbnNlU2hlZXREcmFmdFJlc3BvbnNlLFxuICBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRMaW5lRHRvLFxuICBFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlc3BvbnNlRGF0YSxcbiAgRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldExpc3RJdGVtRHRvLFxuICBFeHBlbnNlU2hlZXRUaWNrZXRDcmVhdGVSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRUaWNrZXREZXRhaWxEdG8sXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXN1bHREdG8sXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0byxcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVzdWx0LFxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5lUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8sXG4gIEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0LFxuICBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldFRpY2tldFVwZGF0ZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvLFxuICBJbmRBcGlSZXNwb25zZSxcbiAgSW5kUGFnZWRSZXNwb25zZSxcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHtcbiAgaXNOb25OZWdhdGl2ZU51bWJlciBhcyBpc05vbk5lZ2F0aXZlTnVtYmVyVHJhbnNmb3JtLFxuICBpc1Bvc2l0aXZlTnVtYmVyIGFzIGlzUG9zaXRpdmVOdW1iZXJUcmFuc2Zvcm0sXG4gIG5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXIgYXMgbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlclRyYW5zZm9ybSxcbiAgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUgYXMgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGVUcmFuc2Zvcm0sXG4gIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSSBhcyBub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUlUcmFuc2Zvcm0sXG4gIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzIGFzIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzVHJhbnNmb3JtLFxuICBub3JtYWxpemVPcHRpb25hbEFwaURhdGUgYXMgbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlVHJhbnNmb3JtLFxuICBub3JtYWxpemVSZXF1aXJlZEFwaURhdGUgYXMgbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlVHJhbnNmb3JtLFxuICBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZSBhcyBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZVRyYW5zZm9ybSxcbiAgbm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZSBhcyBub3JtYWxpemVUaWNrZXRMaXN0R2FzdG9UeXBlVHJhbnNmb3JtLFxuICBzYWZlVGV4dCBhcyBzYWZlVGV4dFRyYW5zZm9ybSxcbiAgdG9GbGFnQm9vbCBhcyB0b0ZsYWdCb29sVHJhbnNmb3JtLFxuICB0b051bGxhYmxlQm9vbCBhcyB0b051bGxhYmxlQm9vbFRyYW5zZm9ybSxcbiAgdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUgYXMgdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGVUcmFuc2Zvcm0sXG4gIHRvTnVsbGFibGVOdW1iZXIgYXMgdG9OdWxsYWJsZU51bWJlclRyYW5zZm9ybSxcbiAgdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGUgYXMgdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGVUcmFuc2Zvcm0sXG59IGZyb20gXCIuL2V4cGVuc2VBcGlUcmFuc2Zvcm1zLnRzXCI7XG5pbXBvcnQge1xuICBub3JtYWxpemVBcGlSZXNwb25zZSBhcyBub3JtYWxpemVBcGlSZXNwb25zZVRyYW5zZm9ybSxcbiAgbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlIGFzIG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcbiAgbm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxuICBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcbiAgbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxuICBub3JtYWxpemVUaWNrZXRMaW5rQnVsa1Jlc3BvbnNlIGFzIG5vcm1hbGl6ZVRpY2tldExpbmtCdWxrUmVzcG9uc2VUcmFuc2Zvcm0sXG4gIG5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVUaWNrZXRMaW5rTGlzdFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm0sXG4gIG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2UgYXMgbm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcbiAgbm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZSBhcyBub3JtYWxpemVUaWNrZXRRdWlja0NyZWF0ZVJlc3BvbnNlVHJhbnNmb3JtLFxuICBub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcbn0gZnJvbSBcIi4vZXhwZW5zZUFwaVJlc3BvbnNlTm9ybWFsaXplcnMudHNcIjtcbmltcG9ydCB7XG4gIG1hcEV4cGVuc2VTaGVldEhlYWRlciBhcyBtYXBFeHBlbnNlU2hlZXRIZWFkZXJDb3JlLFxuICBtYXBFeHBlbnNlU2hlZXRMaW5lIGFzIG1hcEV4cGVuc2VTaGVldExpbmVDb3JlLFxuICBtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZCBhcyBtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZENvcmUsXG59IGZyb20gXCIuL2V4cGVuc2VBcGlNYXBwZXJzLnRzXCI7XG5pbXBvcnQgeyBFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFIH0gZnJvbSBcIi4vZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSB9IGZyb20gXCIuL2V4cGVuc2VBY3RpbmdVc2VyLnRzXCI7XG5pbXBvcnQgeyByZXNvbHZlRWZmZWN0aXZlQ29tcGFueUlkIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NvbXBhbnlTZWxlY3Rpb24udHNcIjtcblxudHlwZSBQcm9qZWN0RHJvcGRvd25SZXNwb25zZSA9IHtcbiAgdG90YWw/OiBudW1iZXI7XG4gIGl0ZW1zPzogQXJyYXk8eyB2YWx1ZT86IHN0cmluZzsgdGV4dD86IHN0cmluZyB9Pjtcbn07XG5cbnR5cGUgTGVnYWN5RXhwZW5zZUxpc3RJdGVtID0ge1xuICBob2phR2FzdG9zSWQ/OiB1bmtub3duO1xuICBkZXNjcmlwdGlvbj86IHVua25vd247XG4gIGVzdGFkb0NvbWVudGFyaW9zPzogdW5rbm93bjtcbiAgdm91Y2hlcj86IHVua25vd247XG4gIHByb2pJZD86IHVua25vd247XG4gIGN1cnJlbmN5Q29kZT86IHVua25vd247XG4gIHRvdGFsQW1vdW50PzogdW5rbm93bjtcbiAgdG90YWxBbW91bnRNU1Q/OiB1bmtub3duO1xuICBleGNoUmF0ZT86IHVua25vd247XG4gIHVzZXJJZD86IHVua25vd247XG4gIHVzZXJOYW1lPzogdW5rbm93bjtcbiAgZXhjaGFuZ2VSYXRlTW9kZT86IHVua25vd247XG4gIGV4cGVuc2VTaGVldFN0YXR1cz86IHVua25vd247XG4gIGNyZWF0ZWREYXRlPzogdW5rbm93bjtcbn07XG5cbnR5cGUgTGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZSA9IHtcbiAgc3VjY2Vzcz86IGJvb2xlYW47XG4gIG1lc3NhZ2U/OiBzdHJpbmc7XG4gIHRvdGFsPzogbnVtYmVyO1xuICBwYWdlPzogbnVtYmVyO1xuICBwYWdlU2l6ZT86IG51bWJlcjtcbiAgaXRlbXM/OiBMZWdhY3lFeHBlbnNlTGlzdEl0ZW1bXTtcbn07XG5cbnR5cGUgRXhwZW5zZUFwaUNvbnRleHQgPSB7XG4gIHRva2VuOiBzdHJpbmc7XG4gIGNvbXBhbnlJZDogc3RyaW5nO1xuICBheFVzZXJJZDogc3RyaW5nO1xuICBjcm1Vc2VySWQ6IHN0cmluZztcbiAgZGVmYXVsdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xufTtcblxuZXhwb3J0IHR5cGUgRXhwZW5zZUFwaUNvbnRleHRTbmFwc2hvdCA9IHtcbiAgY29tcGFueUlkOiBzdHJpbmc7XG4gIGF4VXNlcklkOiBzdHJpbmc7XG4gIGNybVVzZXJJZDogc3RyaW5nO1xuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xufTtcblxudHlwZSBFeHBlbnNlQXBpQXV0aFNlZWQgPSB7XG4gIHRva2VuOiBzdHJpbmc7XG4gIGVudHJhT2lkOiBzdHJpbmc7XG4gIGFwcENvZGU6IHN0cmluZztcbiAgc3RyaWN0QXBpUm91dGVzOiBib29sZWFuO1xufTtcblxudHlwZSBFeHBlbnNlV2luZG93UnVudGltZSA9IHtcbiAgX19JTkRfQVBJX1RPS0VOX18/OiBzdHJpbmc7XG4gIF9fSU5EX0VOVFJBX09JRF9fPzogc3RyaW5nO1xuICBfX0lORF9BUFBfQ09ERV9fPzogc3RyaW5nO1xuICBfX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18/OiBzdHJpbmc7XG4gIF9fSU5EX0VYUEVOU0VfU1RSSUNUX0FQSV9fPzogYm9vbGVhbiB8IHN0cmluZztcbiAgX19FWFBFTlNFX0dBU1RPX1RZUEVTX18/OiBBcnJheTx7XG4gICAgdmFsdWU/OiB1bmtub3duO1xuICAgIFZhbHVlPzogdW5rbm93bjtcbiAgICB0ZXh0PzogdW5rbm93bjtcbiAgICBUZXh0PzogdW5rbm93bjtcbiAgfT47XG59O1xuXG5jb25zdCBERUZBVUxUX0FQUF9DT0RFID0gXCJDUk1cIjtcbmNvbnN0IEpTT05fSEVBREVSUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG59O1xuXG5sZXQgcnVudGltZUF1dGhTZWVkOiBQYXJ0aWFsPEV4cGVuc2VBcGlBdXRoU2VlZD4gPSB7fTtcbmxldCBjYWNoZWRDb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCB8IG51bGwgPSBudWxsO1xubGV0IGNhY2hlZENvbnRleHRLZXkgPSBcIlwiO1xubGV0IGNvbnRleHRQcm9taXNlOiBQcm9taXNlPEV4cGVuc2VBcGlDb250ZXh0PiB8IG51bGwgPSBudWxsO1xuY29uc3QgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMgPSBuZXcgTWFwPHN0cmluZywgSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+KCk7XG5jb25zdCBwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cyA9IG5ldyBNYXA8c3RyaW5nLCBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+Pj4oKTtcblxuY29uc3Qgc2FmZVRleHQgPSBzYWZlVGV4dFRyYW5zZm9ybTtcblxuY29uc3QgdG9OdWxsYWJsZU51bWJlciA9IHRvTnVsbGFibGVOdW1iZXJUcmFuc2Zvcm07XG5jb25zdCBpc05vbk5lZ2F0aXZlTnVtYmVyID0gaXNOb25OZWdhdGl2ZU51bWJlclRyYW5zZm9ybTtcbmNvbnN0IGlzUG9zaXRpdmVOdW1iZXIgPSBpc1Bvc2l0aXZlTnVtYmVyVHJhbnNmb3JtO1xuY29uc3QgdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGUgPSB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZVRyYW5zZm9ybTtcbmNvbnN0IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlID0gdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGVUcmFuc2Zvcm07XG5jb25zdCBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZSA9IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlVHJhbnNmb3JtO1xuY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZSA9IG5vcm1hbGl6ZVRpY2tldExpc3RHYXN0b1R5cGVUcmFuc2Zvcm07XG5jb25zdCBub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1cyA9IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzVHJhbnNmb3JtO1xuY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlVHJhbnNmb3JtO1xuY29uc3Qgbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlID0gbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlVHJhbnNmb3JtO1xuY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdERhdGUgPSBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZVRyYW5zZm9ybTtcbmNvbnN0IHRvTnVsbGFibGVCb29sID0gdG9OdWxsYWJsZUJvb2xUcmFuc2Zvcm07XG5jb25zdCBub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUkgPSBub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUlUcmFuc2Zvcm07XG5jb25zdCBub3JtYWxpemVFeHBlbnNlU2hlZXRMaXN0U3RhdHVzRmlsdGVyID0gbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlclRyYW5zZm9ybTtcbmNvbnN0IHRvRmxhZ0Jvb2wgPSB0b0ZsYWdCb29sVHJhbnNmb3JtO1xuXG5jb25zdCByZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUgPSAoKTogRXhwZW5zZVdpbmRvd1J1bnRpbWUgPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHt9O1xuICByZXR1cm4gd2luZG93IGFzIHVua25vd24gYXMgRXhwZW5zZVdpbmRvd1J1bnRpbWU7XG59O1xuXG5jb25zdCBzYW5pdGl6ZUhlYWRlcnMgPSAoaGVhZGVyczogSGVhZGVyc0luaXQgfCB1bmRlZmluZWQpOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0+IHtcbiAgaWYgKCFoZWFkZXJzKSByZXR1cm4ge307XG5cbiAgaWYgKGhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XG4gICAgY29uc3QgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG4gICAgaGVhZGVycy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShoZWFkZXJzKSkge1xuICAgIHJldHVybiBoZWFkZXJzLnJlZHVjZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PigoYWNjLCBba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgIGFjY1tTdHJpbmcoa2V5KV0gPSBTdHJpbmcodmFsdWUpO1xuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmVudHJpZXMoaGVhZGVycykucmVkdWNlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+KChhY2MsIFtrZXksIHZhbHVlXSkgPT4ge1xuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSByZXR1cm4gYWNjO1xuICAgIGFjY1trZXldID0gU3RyaW5nKHZhbHVlKTtcbiAgICByZXR1cm4gYWNjO1xuICB9LCB7fSk7XG59O1xuXG5jb25zdCBnZXRIZWFkZXJWYWx1ZSA9IChoZWFkZXJzOiBIZWFkZXJzSW5pdCB8IHVuZGVmaW5lZCwga2V5OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBub3JtYWxpemVkS2V5ID0ga2V5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMoc2FuaXRpemVIZWFkZXJzKGhlYWRlcnMpKTtcbiAgY29uc3QgbWF0Y2ggPSBlbnRyaWVzLmZpbmQoKFtoZWFkZXJLZXldKSA9PiBoZWFkZXJLZXkudHJpbSgpLnRvTG93ZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRLZXkpO1xuICByZXR1cm4gc2FmZVRleHQobWF0Y2g/LlsxXSk7XG59O1xuXG5jb25zdCByZW1vdmVIZWFkZXJWYWx1ZSA9IChoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+LCBrZXk6IHN0cmluZyk6IHZvaWQgPT4ge1xuICBjb25zdCBub3JtYWxpemVkS2V5ID0ga2V5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCB0b0RlbGV0ZSA9IE9iamVjdC5rZXlzKGhlYWRlcnMpLmZpbmQoKGhlYWRlcktleSkgPT4gaGVhZGVyS2V5LnRyaW0oKS50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkS2V5KTtcbiAgaWYgKCF0b0RlbGV0ZSkgcmV0dXJuO1xuICBkZWxldGUgaGVhZGVyc1t0b0RlbGV0ZV07XG59O1xuXG5jb25zdCBub3JtYWxpemVBeFVzZXJJZEhlYWRlciA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBzYWZlVGV4dCh2YWx1ZSk7XG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIFwiXCI7XG4gIGNvbnN0IGZpcnN0VG9rZW4gPSBub3JtYWxpemVkLnNwbGl0KFwiLVwiKVswXTtcbiAgcmV0dXJuIHNhZmVUZXh0KGZpcnN0VG9rZW4pO1xufTtcblxuY29uc3QgcmVzb2x2ZUJlYXJlclRva2VuID0gKGhlYWRlcnM6IEhlYWRlcnNJbml0IHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcbiAgY29uc3QgYXV0aG9yaXphdGlvbiA9IGdldEhlYWRlclZhbHVlKGhlYWRlcnMsIFwiQXV0aG9yaXphdGlvblwiKTtcbiAgaWYgKCFhdXRob3JpemF0aW9uKSByZXR1cm4gXCJcIjtcblxuICBpZiAoL15iZWFyZXJcXHMrL2kudGVzdChhdXRob3JpemF0aW9uKSkge1xuICAgIHJldHVybiBhdXRob3JpemF0aW9uLnJlcGxhY2UoL15iZWFyZXJcXHMrL2ksIFwiXCIpLnRyaW0oKTtcbiAgfVxuXG4gIHJldHVybiBhdXRob3JpemF0aW9uLnRyaW0oKTtcbn07XG5cbmNvbnN0IHJlYWRXaW5kb3dBdXRoU2VlZCA9ICgpOiBQYXJ0aWFsPEV4cGVuc2VBcGlBdXRoU2VlZD4gPT4ge1xuICBjb25zdCBydW50aW1lV2luZG93ID0gcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lKCk7XG5cbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogc2FmZVRleHQocnVudGltZVdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHJ1bnRpbWVXaW5kb3cuX19JTkRfRU5UUkFfT0lEX18pLFxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHJ1bnRpbWVXaW5kb3cuX19JTkRfQVBQX0NPREVfXyksXG4gICAgc3RyaWN0QXBpUm91dGVzOiB0b0ZsYWdCb29sKHJ1bnRpbWVXaW5kb3cuX19JTkRfRVhQRU5TRV9TVFJJQ1RfQVBJX18pID09PSB0cnVlLFxuICB9O1xufTtcblxuY29uc3QgdHJ5UGFyc2VKc29uID0gKHJhdzogc3RyaW5nKTogdW5rbm93biB8IG51bGwgPT4ge1xuICBpZiAoIXJhdyB8fCAhcmF3LnRyaW0oKSkgcmV0dXJuIG51bGw7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UocmF3KTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IHJlYWRSdW50aW1lU3RyaWN0QXBpRmxhZyA9ICgpOiBib29sZWFuID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgcnVudGltZVdpbmRvdyA9IHJlYWRFeHBlbnNlV2luZG93UnVudGltZSgpO1xuXG4gIGNvbnN0IGV4cGxpY2l0V2luZG93RmxhZyA9IHRvRmxhZ0Jvb2wocnVudGltZVdpbmRvdy5fX0lORF9FWFBFTlNFX1NUUklDVF9BUElfXyk7XG4gIHJldHVybiBleHBsaWNpdFdpbmRvd0ZsYWcgPT09IHRydWU7XG59O1xuXG5jb25zdCByZWFkV2luZG93U2VsZWN0ZWRDb21wYW55ID0gKCk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBzYWZlVGV4dChyZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUoKS5fX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18pLnRvVXBwZXJDYXNlKCk7XG59O1xuXG4vLyBDcmVhdGVzIG9uZSBzdGFuZGFyZCBhYm9ydCBlcnJvciB3aXRob3V0IGNhbmNlbGxpbmcgdGhlIHNoYXJlZCB1bmRlcmx5aW5nIHJlcXVlc3QuXG5jb25zdCBjcmVhdGVFeHBlbnNlQWJvcnRFcnJvciA9ICgpOiBET01FeGNlcHRpb24gPT4ge1xuICByZXR1cm4gbmV3IERPTUV4Y2VwdGlvbihcIkFib3J0ZWRcIiwgXCJBYm9ydEVycm9yXCIpO1xufTtcblxuLy8gTGV0cyBvbmUgY2FsbGVyIHN0b3Agd2FpdGluZyBvbiBzaGFyZWQgY29udGV4dCByZXNvbHV0aW9uIHdpdGhvdXQgYWJvcnRpbmcgb3RoZXIgY29uc3VtZXJzLlxuY29uc3Qgd2FpdEZvckFib3J0YWJsZUV4cGVuc2VSZXN1bHQgPSBhc3luYyA8VD4ocHJvbWlzZTogUHJvbWlzZTxUPiwgc2lnbmFsPzogQWJvcnRTaWduYWwpOiBQcm9taXNlPFQ+ID0+IHtcbiAgaWYgKCFzaWduYWwpIHJldHVybiBwcm9taXNlO1xuICBpZiAoc2lnbmFsLmFib3J0ZWQpIHtcbiAgICB0aHJvdyBjcmVhdGVFeHBlbnNlQWJvcnRFcnJvcigpO1xuICB9XG5cbiAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBoYW5kbGVBYm9ydCA9ICgpID0+IHtcbiAgICAgIHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgaGFuZGxlQWJvcnQpO1xuICAgICAgcmVqZWN0KGNyZWF0ZUV4cGVuc2VBYm9ydEVycm9yKCkpO1xuICAgIH07XG5cbiAgICBzaWduYWwuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGhhbmRsZUFib3J0LCB7IG9uY2U6IHRydWUgfSk7XG4gICAgcHJvbWlzZS50aGVuKFxuICAgICAgKHZhbHVlKSA9PiB7XG4gICAgICAgIHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgaGFuZGxlQWJvcnQpO1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgIH0sXG4gICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBoYW5kbGVBYm9ydCk7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICB9XG4gICAgKTtcbiAgfSk7XG59O1xuXG5jb25zdCBidWlsZENvbnRleHRLZXkgPSAoc2VlZDogRXhwZW5zZUFwaUF1dGhTZWVkKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGAke3NlZWQudG9rZW59fCR7c2VlZC5lbnRyYU9pZH18JHtzZWVkLmFwcENvZGV9fCR7cmVhZFdpbmRvd1NlbGVjdGVkQ29tcGFueSgpfWA7XG59O1xuXG5jb25zdCBidWlsZEV4cGVuc2VIZWFkZXJzID0gKFxuICBjb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyxcbiAgaW5jbHVkZUpzb24gPSBmYWxzZSxcbiAgaW5jbHVkZUF4VXNlcklkID0gdHJ1ZVxuKTogSGVhZGVyc0luaXQgPT4ge1xuICBjb25zdCBiYXNlID0gc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpO1xuICBjb25zdCBtZXJnZWQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7IC4uLmJhc2UgfTtcblxuICBpZiAoc2FmZVRleHQoY29udGV4dC50b2tlbikpIHtcbiAgICBtZXJnZWQuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHtjb250ZXh0LnRva2VufWA7XG4gIH1cblxuICBpZiAoc2FmZVRleHQoY29udGV4dC5jb21wYW55SWQpKSB7XG4gICAgbWVyZ2VkW1wiWC1JTkQtQ29tcGFueVwiXSA9IGNvbnRleHQuY29tcGFueUlkO1xuICB9XG5cbiAgaWYgKGluY2x1ZGVBeFVzZXJJZCkge1xuICAgIGNvbnN0IHJlcXVlc3RBeFVzZXJJZCA9IGdldEhlYWRlclZhbHVlKG9wdGlvbnM/LmhlYWRlcnMsIFwiWC1JTkQtQXhVc2VySWRcIik7XG4gICAgY29uc3Qgb3ZlcnJpZGVBeFVzZXJJZCA9IGdldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUoKTtcbiAgICBjb25zdCByZXNvbHZlZEF4VXNlcklkID0gc2FmZVRleHQocmVxdWVzdEF4VXNlcklkIHx8IG92ZXJyaWRlQXhVc2VySWQgfHwgY29udGV4dC5heFVzZXJJZCk7XG4gICAgaWYgKHJlc29sdmVkQXhVc2VySWQpIHtcbiAgICAgIG1lcmdlZFtcIlgtSU5ELUF4VXNlcklkXCJdID0gcmVzb2x2ZWRBeFVzZXJJZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlSGVhZGVyVmFsdWUobWVyZ2VkLCBcIlgtSU5ELUF4VXNlcklkXCIpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShtZXJnZWQsIFwiWC1JTkQtQXhVc2VySWRcIik7XG4gIH1cblxuICBpZiAoaW5jbHVkZUpzb24pIHtcbiAgICBtZXJnZWRbXCJDb250ZW50LVR5cGVcIl0gPSBcImFwcGxpY2F0aW9uL2pzb25cIjtcbiAgfVxuXG4gIHJldHVybiBtZXJnZWQ7XG59O1xuXG5jb25zdCBidWlsZEV4cGVuc2VGb3JtSGVhZGVycyA9IChjb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCwgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IEhlYWRlcnNJbml0ID0+IHtcbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIGZhbHNlKSk7XG4gIHJlbW92ZUhlYWRlclZhbHVlKGhlYWRlcnMsIFwiQ29udGVudC1UeXBlXCIpO1xuICByZXR1cm4gaGVhZGVycztcbn07XG5cbmNvbnN0IGJ1aWxkQ29udGV4dEhlYWRlcnMgPSAodG9rZW46IHN0cmluZywgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IEhlYWRlcnNJbml0ID0+IHtcbiAgY29uc3QgYmFzZSA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcbiAgY29uc3QgbWVyZ2VkOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgIC4uLmJhc2UsXG4gICAgLi4uSlNPTl9IRUFERVJTLFxuICB9O1xuXG4gIGlmIChzYWZlVGV4dCh0b2tlbikpIHtcbiAgICBtZXJnZWQuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICB9XG5cbiAgcmV0dXJuIG1lcmdlZDtcbn07XG5cbmNvbnN0IHJlc29sdmVBdXRoVG9rZW4gPSAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHRva2VuRnJvbUhlYWRlcnMgPSByZXNvbHZlQmVhcmVyVG9rZW4ob3B0aW9ucz8uaGVhZGVycyk7XG4gIGNvbnN0IHdpbmRvd1NlZWQgPSByZWFkV2luZG93QXV0aFNlZWQoKTtcbiAgcmV0dXJuIHNhZmVUZXh0KHRva2VuRnJvbUhlYWRlcnMgfHwgcnVudGltZUF1dGhTZWVkLnRva2VuIHx8IHdpbmRvd1NlZWQudG9rZW4pO1xufTtcblxuY29uc3QgcmVzb2x2ZUF1dGhTZWVkID0gKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBFeHBlbnNlQXBpQXV0aFNlZWQgPT4ge1xuICBjb25zdCB3aW5kb3dTZWVkID0gcmVhZFdpbmRvd0F1dGhTZWVkKCk7XG4gIGNvbnN0IHRva2VuID0gcmVzb2x2ZUF1dGhUb2tlbihvcHRpb25zKTtcbiAgY29uc3QgZW50cmFPaWQgPSBzYWZlVGV4dChydW50aW1lQXV0aFNlZWQuZW50cmFPaWQgfHwgd2luZG93U2VlZC5lbnRyYU9pZCk7XG4gIGNvbnN0IGFwcENvZGUgPSBzYWZlVGV4dChydW50aW1lQXV0aFNlZWQuYXBwQ29kZSB8fCB3aW5kb3dTZWVkLmFwcENvZGUgfHwgREVGQVVMVF9BUFBfQ09ERSkgfHwgREVGQVVMVF9BUFBfQ09ERTtcbiAgY29uc3Qgc3RyaWN0QXBpUm91dGVzID1cbiAgICB0eXBlb2YgcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcyA9PT0gXCJib29sZWFuXCJcbiAgICAgID8gcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlc1xuICAgICAgOiAod2luZG93U2VlZC5zdHJpY3RBcGlSb3V0ZXMgPT09IHRydWUpO1xuXG4gIHJldHVybiB7XG4gICAgdG9rZW4sXG4gICAgZW50cmFPaWQsXG4gICAgYXBwQ29kZSxcbiAgICBzdHJpY3RBcGlSb3V0ZXMsXG4gIH07XG59O1xuXG50eXBlIFJhd0VudHJhQ29udGV4dENvbXBhbnkgPSB7XG4gIENvbXBhbnlJZD86IHVua25vd247XG4gIGNvbXBhbnlJZD86IHVua25vd247XG4gIElzRGVmYXVsdD86IHVua25vd247XG4gIGlzRGVmYXVsdD86IHVua25vd247XG4gIEFsbG93U2VsZk1hbmFnZW1lbnQ/OiB1bmtub3duO1xuICBhbGxvd1NlbGZNYW5hZ2VtZW50PzogdW5rbm93bjtcbiAgQ3JtVXNlcklkPzogdW5rbm93bjtcbiAgY3JtVXNlcklkPzogdW5rbm93bjtcbn07XG5cbnR5cGUgTm9ybWFsaXplZEVudHJhQ29udGV4dENvbXBhbnkgPSB7XG4gIGNvbXBhbnlJZDogc3RyaW5nO1xuICBpc0RlZmF1bHQ6IGJvb2xlYW47XG4gIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGJvb2xlYW47XG4gIGNybVVzZXJJZDogc3RyaW5nO1xufTtcblxudHlwZSBSYXdFbnRyYUNvbnRleHRIZWFkZXIgPSB7XG4gIEF4VXNlcklkPzogdW5rbm93bjtcbiAgYXhVc2VySWQ/OiB1bmtub3duO1xuICBEZWZhdWx0Q29tcGFueT86IHVua25vd247XG4gIGRlZmF1bHRDb21wYW55PzogdW5rbm93bjtcbiAgRGVmYXVsdEN1cnJlbmN5Q29kZT86IHVua25vd247XG4gIGRlZmF1bHRDdXJyZW5jeUNvZGU/OiB1bmtub3duO1xufTtcblxudHlwZSBSYXdFbnRyYUNvbnRleHRJdGVtID0ge1xuICBIZWFkZXI/OiBSYXdFbnRyYUNvbnRleHRIZWFkZXI7XG4gIGhlYWRlcj86IFJhd0VudHJhQ29udGV4dEhlYWRlcjtcbiAgQ29tcGFuaWVzPzogdW5rbm93bjtcbiAgY29tcGFuaWVzPzogdW5rbm93bjtcbn07XG5cbi8vIE1hcHMgb25lIEVudHJhIGNvbXBhbnkgaXRlbSB0byB0aGUgZnJvbnRlbmQtc2FmZSBzaGFwZSB1c2VkIGJ5IGNvbnRleHQgY29uc3VtZXJzLlxuY29uc3QgbWFwRW50cmFDb250ZXh0Q29tcGFueSA9IChpdGVtOiB1bmtub3duKTogTm9ybWFsaXplZEVudHJhQ29udGV4dENvbXBhbnkgfCBudWxsID0+IHtcbiAgaWYgKCFpdGVtIHx8IHR5cGVvZiBpdGVtICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCByYXcgPSBpdGVtIGFzIFJhd0VudHJhQ29udGV4dENvbXBhbnk7XG4gIGNvbnN0IGNvbXBhbnlJZCA9IHNhZmVUZXh0KHJhdy5Db21wYW55SWQgPz8gcmF3LmNvbXBhbnlJZCk7XG4gIGlmICghY29tcGFueUlkKSByZXR1cm4gbnVsbDtcblxuICByZXR1cm4ge1xuICAgIGNvbXBhbnlJZCxcbiAgICBpc0RlZmF1bHQ6IHRvRmxhZ0Jvb2wocmF3LklzRGVmYXVsdCA/PyByYXcuaXNEZWZhdWx0KSA9PT0gdHJ1ZSxcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50OiB0b0ZsYWdCb29sKHJhdy5BbGxvd1NlbGZNYW5hZ2VtZW50ID8/IHJhdy5hbGxvd1NlbGZNYW5hZ2VtZW50KSA9PT0gdHJ1ZSxcbiAgICBjcm1Vc2VySWQ6IHNhZmVUZXh0KHJhdy5Dcm1Vc2VySWQgPz8gcmF3LmNybVVzZXJJZCksXG4gIH07XG59O1xuXG5jb25zdCB2YWxpZGF0ZUNvbnRleHRSZXNwb25zZSA9IChyZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFbnRyYUNvbnRleHREdG8+KTogRXhwZW5zZUFwaUNvbnRleHQgPT4ge1xuICBjb25zdCByYXdSZXNwb25zZSA9IHJlc3BvbnNlIGFzIHtcbiAgICBTdWNjZXNzPzogdW5rbm93bjtcbiAgICBzdWNjZXNzPzogdW5rbm93bjtcbiAgICBNZXNzYWdlPzogdW5rbm93bjtcbiAgICBtZXNzYWdlPzogdW5rbm93bjtcbiAgICBJdGVtcz86IHVua25vd247XG4gICAgaXRlbXM/OiB1bmtub3duO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VjY2VzcyA9IHRvRmxhZ0Jvb2wocmF3UmVzcG9uc2UuU3VjY2VzcyA/PyByYXdSZXNwb25zZS5zdWNjZXNzKTtcbiAgaWYgKGlzU3VjY2VzcyA9PT0gZmFsc2UpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihzYWZlVGV4dChyYXdSZXNwb25zZS5NZXNzYWdlID8/IHJhd1Jlc3BvbnNlLm1lc3NhZ2UpIHx8IFwiQ291bGQgbm90IGxvYWQgRW50cmEgY29udGV4dC5cIik7XG4gIH1cblxuICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocmF3UmVzcG9uc2UuSXRlbXMpXG4gICAgPyByYXdSZXNwb25zZS5JdGVtc1xuICAgIDogKEFycmF5LmlzQXJyYXkocmF3UmVzcG9uc2UuaXRlbXMpID8gcmF3UmVzcG9uc2UuaXRlbXMgOiBbXSk7XG4gIGNvbnN0IGZpcnN0ID0gaXRlbXNbMF0gYXMgUmF3RW50cmFDb250ZXh0SXRlbSB8IHVuZGVmaW5lZDtcbiAgY29uc3QgaGVhZGVyID0gZmlyc3Q/LkhlYWRlciA/PyBmaXJzdD8uaGVhZGVyO1xuICBpZiAoIWZpcnN0IHx8ICFoZWFkZXIpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkNvdWxkIG5vdCBsb2FkIEVudHJhIGNvbnRleHQuXCIpO1xuICB9XG5cbiAgY29uc3QgYXhVc2VySWQgPSBzYWZlVGV4dChoZWFkZXIuQXhVc2VySWQgPz8gaGVhZGVyLmF4VXNlcklkKTtcbiAgY29uc3QgZGVmYXVsdENvbXBhbnkgPSBzYWZlVGV4dChoZWFkZXIuRGVmYXVsdENvbXBhbnkgPz8gaGVhZGVyLmRlZmF1bHRDb21wYW55KTtcbiAgY29uc3QgZGVmYXVsdEN1cnJlbmN5Q29kZSA9IHNhZmVUZXh0KGhlYWRlci5EZWZhdWx0Q3VycmVuY3lDb2RlID8/IGhlYWRlci5kZWZhdWx0Q3VycmVuY3lDb2RlKTtcbiAgY29uc3QgY29tcGFuaWVzUmF3ID0gQXJyYXkuaXNBcnJheShmaXJzdC5Db21wYW5pZXMpXG4gICAgPyBmaXJzdC5Db21wYW5pZXNcbiAgICA6IChBcnJheS5pc0FycmF5KGZpcnN0LmNvbXBhbmllcykgPyBmaXJzdC5jb21wYW5pZXMgOiBbXSk7XG4gIGNvbnN0IGNvbXBhbmllcyA9IGNvbXBhbmllc1Jhd1xuICAgIC5tYXAoKGl0ZW0pID0+IG1hcEVudHJhQ29udGV4dENvbXBhbnkoaXRlbSkpXG4gICAgLmZpbHRlcigoaXRlbSk6IGl0ZW0gaXMgTm9ybWFsaXplZEVudHJhQ29udGV4dENvbXBhbnkgPT4gISFpdGVtKTtcbiAgY29uc3QgZmFsbGJhY2tDb21wYW55ID0gc2FmZVRleHQoY29tcGFuaWVzLmZpbmQoKGl0ZW0pID0+IGl0ZW0uaXNEZWZhdWx0KT8uY29tcGFueUlkKTtcbiAgY29uc3Qgc2VsZWN0ZWRDb21wYW55SWQgPSByZWFkV2luZG93U2VsZWN0ZWRDb21wYW55KCk7XG4gIGNvbnN0IGNvbXBhbnlJZCA9IHJlc29sdmVFZmZlY3RpdmVDb21wYW55SWQoc2VsZWN0ZWRDb21wYW55SWQsIGNvbXBhbmllcywgZGVmYXVsdENvbXBhbnkgfHwgZmFsbGJhY2tDb21wYW55KTtcbiAgY29uc3Qgc2VsZWN0ZWRDb21wYW55ID0gY29tcGFuaWVzLmZpbmQoKGl0ZW0pID0+IHNhZmVUZXh0KGl0ZW0uY29tcGFueUlkKSA9PT0gY29tcGFueUlkKSB8fCBjb21wYW5pZXNbMF07XG4gIGNvbnN0IGFsbG93U2VsZk1hbmFnZW1lbnQgPSBzZWxlY3RlZENvbXBhbnk/LmFsbG93U2VsZk1hbmFnZW1lbnQgPT09IHRydWU7XG4gIGNvbnN0IGNybVVzZXJJZCA9IHNhZmVUZXh0KHNlbGVjdGVkQ29tcGFueT8uY3JtVXNlcklkKTtcblxuICBpZiAoIWF4VXNlcklkIHx8ICFjb21wYW55SWQpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkNvdWxkIG5vdCByZXNvbHZlIEVudHJhIGNvbXBhbnkgY29udGV4dC5cIik7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRva2VuOiBcIlwiLFxuICAgIGNvbXBhbnlJZCxcbiAgICBheFVzZXJJZCxcbiAgICBjcm1Vc2VySWQsXG4gICAgZGVmYXVsdEN1cnJlbmN5Q29kZSxcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxuICB9O1xufTtcblxuY29uc3QgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQgPSBhc3luYyAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IFByb21pc2U8RXhwZW5zZUFwaUNvbnRleHQ+ID0+IHtcbiAgY29uc3Qgc2VlZCA9IHJlc29sdmVBdXRoU2VlZChvcHRpb25zKTtcbiAgY29uc3QgY29udGV4dEtleSA9IGJ1aWxkQ29udGV4dEtleShzZWVkKTtcbiAgY29uc3QgeyBzaWduYWwsIC4uLmJhc2VPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xuXG4gIGlmIChjYWNoZWRDb250ZXh0ICYmIGNhY2hlZENvbnRleHRLZXkgPT09IGNvbnRleHRLZXkpIHtcbiAgICByZXR1cm4gd2FpdEZvckFib3J0YWJsZUV4cGVuc2VSZXN1bHQoUHJvbWlzZS5yZXNvbHZlKGNhY2hlZENvbnRleHQpLCBzaWduYWwpO1xuICB9XG5cbiAgaWYgKCFjb250ZXh0UHJvbWlzZSB8fCBjYWNoZWRDb250ZXh0S2V5ICE9PSBjb250ZXh0S2V5KSB7XG4gICAgY2FjaGVkQ29udGV4dEtleSA9IGNvbnRleHRLZXk7XG4gICAgY29uc3Qgc2hhcmVkQ29udGV4dFByb21pc2UgPSAoYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgY29udGV4dFBheWxvYWQ6IEVudHJhQ29udGV4dFJlcXVlc3QgPSB7XG4gICAgICAgIGFwcENvZGU6IHNlZWQuYXBwQ29kZSxcbiAgICAgIH07XG5cbiAgICAgIGlmIChzYWZlVGV4dChzZWVkLmVudHJhT2lkKSkge1xuICAgICAgICBjb250ZXh0UGF5bG9hZC5lbnRyYU9pZCA9IHNlZWQuZW50cmFPaWQ7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbnRleHRSZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEVudHJhQ29udGV4dER0bz4+KFwiL2FwaS9hdXRoL2VudHJhL2NvbnRleHRcIiwge1xuICAgICAgICAuLi5iYXNlT3B0aW9ucyxcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczogYnVpbGRDb250ZXh0SGVhZGVycyhzZWVkLnRva2VuLCBiYXNlT3B0aW9ucyksXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNvbnRleHRQYXlsb2FkKSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCByZXNvbHZlZCA9IHZhbGlkYXRlQ29udGV4dFJlc3BvbnNlKGNvbnRleHRSZXNwb25zZSk7XG4gICAgICBjb25zdCBuZXh0Q29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQgPSB7XG4gICAgICAgIC4uLnJlc29sdmVkLFxuICAgICAgICB0b2tlbjogc2VlZC50b2tlbixcbiAgICAgIH07XG5cbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHdpbmRvdy5fX0lORF9BTExPV19TRUxGX01BTkFHRU1FTlRfXyA9IG5leHRDb250ZXh0LmFsbG93U2VsZk1hbmFnZW1lbnQ7XG4gICAgICB9XG5cbiAgICAgIGNhY2hlZENvbnRleHQgPSBuZXh0Q29udGV4dDtcbiAgICAgIHJldHVybiBuZXh0Q29udGV4dDtcbiAgICB9KSgpO1xuXG4gICAgY29udGV4dFByb21pc2UgPSBzaGFyZWRDb250ZXh0UHJvbWlzZTtcbiAgICB2b2lkIHNoYXJlZENvbnRleHRQcm9taXNlLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgaWYgKGNvbnRleHRQcm9taXNlID09PSBzaGFyZWRDb250ZXh0UHJvbWlzZSkge1xuICAgICAgICBjb250ZXh0UHJvbWlzZSA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gYXdhaXQgd2FpdEZvckFib3J0YWJsZUV4cGVuc2VSZXN1bHQoY29udGV4dFByb21pc2UsIHNpZ25hbCk7XG59O1xuXG4vLyBFeHBvc2VzIHJlc29sdmVkIEVudHJhIGNvbnRleHQgdmFsdWVzIG5lZWRlZCBieSBHYXN0b3MgVUkgbWFuYWdlbWVudCBzdGF0ZS5cbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlQXBpQ29udGV4dFNuYXBzaG90ID0gYXN5bmMgKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBQcm9taXNlPEV4cGVuc2VBcGlDb250ZXh0U25hcHNob3Q+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIGNvbXBhbnlJZDogc2FmZVRleHQoY29udGV4dC5jb21wYW55SWQpLnRvVXBwZXJDYXNlKCksXG4gICAgYXhVc2VySWQ6IHNhZmVUZXh0KGNvbnRleHQuYXhVc2VySWQpLFxuICAgIGNybVVzZXJJZDogc2FmZVRleHQoY29udGV4dC5jcm1Vc2VySWQpLFxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGNvbnRleHQuYWxsb3dTZWxmTWFuYWdlbWVudCA9PT0gdHJ1ZSxcbiAgfTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlID0gbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm07XG5jb25zdCBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlID0gbm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZUFwaVJlc3BvbnNlID0gbm9ybWFsaXplQXBpUmVzcG9uc2VUcmFuc2Zvcm07XG5jb25zdCBub3JtYWxpemVUaWNrZXRRdWlja0NyZWF0ZVJlc3BvbnNlID0gbm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZVRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZVN1Ym9yZGluYXRlc1BhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlVHJhbnNmb3JtO1xuY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlVHJhbnNmb3JtO1xuY29uc3Qgbm9ybWFsaXplVGlja2V0TGlua0J1bGtSZXNwb25zZSA9IG5vcm1hbGl6ZVRpY2tldExpbmtCdWxrUmVzcG9uc2VUcmFuc2Zvcm07XG5cbmNvbnN0IGxvb2tzTGlrZUh0bWxEb2N1bWVudCA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xuICBjb25zdCByYXcgPSBzYWZlVGV4dCh2YWx1ZSkudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIHJhdy5zdGFydHNXaXRoKFwiPCFkb2N0eXBlIGh0bWxcIikgfHwgcmF3LnN0YXJ0c1dpdGgoXCI8aHRtbFwiKTtcbn07XG5cbmNvbnN0IGlzQXBpUm91dGVVbmF2YWlsYWJsZSA9IChlcnJvcjogdW5rbm93bik6IGVycm9yIGlzIEFwaUZldGNoRXJyb3IgPT4ge1xuICBpZiAoIShlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpKSByZXR1cm4gZmFsc2U7XG4gIGlmIChlcnJvci5zdGF0dXMgPT09IDQwNCB8fCBlcnJvci5zdGF0dXMgPT09IDQwNSkgcmV0dXJuIHRydWU7XG4gIHJldHVybiBlcnJvci5zdGF0dXMgPT09IHVuZGVmaW5lZCAmJiBsb29rc0xpa2VIdG1sRG9jdW1lbnQoZXJyb3IucmVzcG9uc2VCb2R5KTtcbn07XG5cbmNvbnN0IGlzU3RyaWN0QXBpUm91dGVzRW5hYmxlZCA9ICgpOiBib29sZWFuID0+IHtcbiAgaWYgKHR5cGVvZiBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzID09PSBcImJvb2xlYW5cIikge1xuICAgIHJldHVybiBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzO1xuICB9XG5cbiAgcmV0dXJuIHJlYWRSdW50aW1lU3RyaWN0QXBpRmxhZygpO1xufTtcblxuY29uc3Qgc2hvdWxkVXNlTGVnYWN5RmFsbGJhY2sgPSAoZXJyb3I6IHVua25vd24pOiBib29sZWFuID0+IHtcbiAgaWYgKGlzU3RyaWN0QXBpUm91dGVzRW5hYmxlZCgpKSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiBpc0FwaVJvdXRlVW5hdmFpbGFibGUoZXJyb3IpO1xufTtcblxuY29uc3QgdG9MZWdhY3lMaXN0UmVxdWVzdFBheWxvYWQgPSAocGF5bG9hZDogRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3QpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmaWx0ZXI6IHNhZmVUZXh0KHBheWxvYWQuZmlsdGVyKSxcbiAgICBob2phR2FzdG9zSWQ6IHNhZmVUZXh0KHBheWxvYWQuZmlsdGVyKSxcbiAgICBiaWxsZWRNb2RlOiBwYXlsb2FkLmJpbGxlZE1vZGUgPz8gMixcbiAgICBmcm9tRGF0ZTogc2FmZVRleHQocGF5bG9hZC5jcmVhdGVkRGF0ZUZyb20pLFxuICAgIHRvRGF0ZTogc2FmZVRleHQocGF5bG9hZC5jcmVhdGVkRGF0ZVRvKSxcbiAgICBwcm9qZWN0SWQ6IHNhZmVUZXh0KHBheWxvYWQucHJvaklkKSxcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KHBheWxvYWQuY3VycmVuY3lDb2RlKSxcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IG5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXIocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMpLFxuICAgIGluY2x1ZGVTdWJvcmRpbmF0ZXM6IHBheWxvYWQuaW5jbHVkZVN1Ym9yZGluYXRlcyA9PT0gdHJ1ZSxcbiAgICBwYWdlOiBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZC5wYWdlKSAmJiBwYXlsb2FkLnBhZ2UgPiAwID8gcGF5bG9hZC5wYWdlIDogMSxcbiAgICBwYWdlU2l6ZTogTnVtYmVyLmlzRmluaXRlKHBheWxvYWQucGFnZVNpemUpICYmIHBheWxvYWQucGFnZVNpemUgPiAwID8gcGF5bG9hZC5wYWdlU2l6ZSA6IDUwLFxuICB9O1xufTtcblxuY29uc3QgbWFwTGVnYWN5TGlzdEl0ZW1Ub0FwaUxpc3RJdGVtID0gKGl0ZW06IExlZ2FjeUV4cGVuc2VMaXN0SXRlbSk6IEV4cGVuc2VTaGVldExpc3RJdGVtRHRvID0+IHtcbiAgcmV0dXJuIHtcbiAgICBIb2phR2FzdG9zSWQ6IHNhZmVUZXh0KGl0ZW0uaG9qYUdhc3Rvc0lkKSxcbiAgICBEZXNjcmlwdGlvbjogc2FmZVRleHQoaXRlbS5kZXNjcmlwdGlvbiksXG4gICAgRXhwZW5zZVNoZWV0U3RhdHVzOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uZXhwZW5zZVNoZWV0U3RhdHVzKSxcbiAgICBFc3RhZG9Db21lbnRhcmlvczogc2FmZVRleHQoaXRlbS5lc3RhZG9Db21lbnRhcmlvcykgfHwgbnVsbCxcbiAgICBVc2VySWQ6IHNhZmVUZXh0KGl0ZW0udXNlcklkKSB8fCBudWxsLFxuICAgIFVzZXJOYW1lOiBzYWZlVGV4dChpdGVtLnVzZXJOYW1lKSB8fCBudWxsLFxuICAgIFZvdWNoZXI6IHNhZmVUZXh0KGl0ZW0udm91Y2hlciksXG4gICAgUHJvaklkOiBzYWZlVGV4dChpdGVtLnByb2pJZCksXG4gICAgQ3VycmVuY3lDb2RlOiBzYWZlVGV4dChpdGVtLmN1cnJlbmN5Q29kZSksXG4gICAgVG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS50b3RhbEFtb3VudCA/PyBpdGVtLnRvdGFsQW1vdW50TVNUKSxcbiAgICBFeGNoUmF0ZTogdG9OdWxsYWJsZU51bWJlcihpdGVtLmV4Y2hSYXRlKSxcbiAgICBFeGNoYW5nZVJhdGVNb2RlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uZXhjaGFuZ2VSYXRlTW9kZSksXG4gICAgQ3JlYXRlZERhdGU6IHNhZmVUZXh0KGl0ZW0uY3JlYXRlZERhdGUpIHx8IG51bGwsXG4gIH07XG59O1xuXG5jb25zdCBtYXBMZWdhY3lMaXN0UmVzcG9uc2UgPSAoXG4gIGxlZ2FjeTogTGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZSxcbiAgZmFsbGJhY2tQYWdlOiBudW1iZXIsXG4gIGZhbGxiYWNrUGFnZVNpemU6IG51bWJlclxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz4gPT4ge1xuICBjb25zdCBsZWdhY3lJdGVtcyA9IEFycmF5LmlzQXJyYXkobGVnYWN5Py5pdGVtcykgPyBsZWdhY3kuaXRlbXMgOiBbXTtcbiAgY29uc3QgbWFwcGVkSXRlbXMgPSBsZWdhY3lJdGVtcy5tYXAoKGVudHJ5KSA9PiBtYXBMZWdhY3lMaXN0SXRlbVRvQXBpTGlzdEl0ZW0oZW50cnkpKTtcblxuICByZXR1cm4ge1xuICAgIFN1Y2Nlc3M6IGxlZ2FjeS5zdWNjZXNzICE9PSBmYWxzZSxcbiAgICBNZXNzYWdlOiBzYWZlVGV4dChsZWdhY3kubWVzc2FnZSkgfHwgXCJPS1wiLFxuICAgIFRvdGFsOiB0b051bGxhYmxlTnVtYmVyKGxlZ2FjeS50b3RhbCkgPz8gbWFwcGVkSXRlbXMubGVuZ3RoLFxuICAgIFBhZ2U6IHRvTnVsbGFibGVOdW1iZXIobGVnYWN5LnBhZ2UpID8/IGZhbGxiYWNrUGFnZSxcbiAgICBQYWdlU2l6ZTogdG9OdWxsYWJsZU51bWJlcihsZWdhY3kucGFnZVNpemUpID8/IGZhbGxiYWNrUGFnZVNpemUsXG4gICAgSXRlbXM6IG1hcHBlZEl0ZW1zLFxuICAgIFRyYWNlSWQ6IHVuZGVmaW5lZCxcbiAgfTtcbn07XG5cbi8vIFNldHMgcnVudGltZSBhdXRoIGlucHV0cyB1c2VkIHRvIHJlc29sdmUgRW50cmEgY29udGV4dCBhbmQgbWFuZGF0b3J5IGV4cGVuc2UgaGVhZGVycy5cbmV4cG9ydCBjb25zdCBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCA9IChzZWVkOiBQYXJ0aWFsPEV4cGVuc2VBcGlBdXRoU2VlZD4pOiB2b2lkID0+IHtcbiAgY29uc3Qgc3RyaWN0RnJvbVNlZWQgPSB0b0ZsYWdCb29sKHNlZWQuc3RyaWN0QXBpUm91dGVzKTtcbiAgY29uc3Qgc3RyaWN0RnJvbVJ1bnRpbWUgPVxuICAgIHR5cGVvZiBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzID09PSBcImJvb2xlYW5cIiA/IHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXMgOiByZWFkUnVudGltZVN0cmljdEFwaUZsYWcoKTtcblxuICBydW50aW1lQXV0aFNlZWQgPSB7XG4gICAgLi4ucnVudGltZUF1dGhTZWVkLFxuICAgIHRva2VuOiBzYWZlVGV4dChzZWVkLnRva2VuIHx8IHJ1bnRpbWVBdXRoU2VlZC50b2tlbiksXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHNlZWQuZW50cmFPaWQgfHwgcnVudGltZUF1dGhTZWVkLmVudHJhT2lkKSxcbiAgICBhcHBDb2RlOiBzYWZlVGV4dChzZWVkLmFwcENvZGUgfHwgcnVudGltZUF1dGhTZWVkLmFwcENvZGUgfHwgREVGQVVMVF9BUFBfQ09ERSksXG4gICAgc3RyaWN0QXBpUm91dGVzOiBzdHJpY3RGcm9tU2VlZCA/PyBzdHJpY3RGcm9tUnVudGltZSxcbiAgfTtcblxuICBjYWNoZWRDb250ZXh0ID0gbnVsbDtcbiAgY2FjaGVkQ29udGV4dEtleSA9IFwiXCI7XG4gIGNvbnRleHRQcm9taXNlID0gbnVsbDtcbiAgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuY2xlYXIoKTtcbiAgcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuY2xlYXIoKTtcbn07XG5cbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9saXN0IGl0ZW0gY29udHJhY3QgdG8gbGlzdCBjYXJkIFVJIG1vZGVsLlxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkID0gbWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmRDb3JlO1xuXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0gaGVhZGVyIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldEhlYWRlciA9IG1hcEV4cGVuc2VTaGVldEhlYWRlckNvcmU7XG5cbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfSBsaW5lIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldExpbmUgPSBtYXBFeHBlbnNlU2hlZXRMaW5lQ29yZTtcblxuZXhwb3J0IHR5cGUgRXhwZW5zZVNoZWV0TGlzdEZldGNoT3B0aW9ucyA9IEFwaUZldGNoT3B0aW9ucyAmIHtcbiAgYXhVc2VySWRPdmVycmlkZT86IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIEV4cGVuc2VUaWNrZXRMaXN0RmV0Y2hPcHRpb25zID0gQXBpRmV0Y2hPcHRpb25zICYge1xuICBheFVzZXJJZE92ZXJyaWRlPzogc3RyaW5nO1xufTtcblxuY29uc3QgYnVpbGRUaWNrZXRMaXN0SGVhZGVycyA9IChcbiAgY29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQsXG4gIG9wdGlvbnM6IEFwaUZldGNoT3B0aW9ucyB8IHVuZGVmaW5lZCxcbiAgYXhVc2VySWRPdmVycmlkZTogc3RyaW5nIHwgdW5kZWZpbmVkXG4pOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0+IHtcbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUsIGZhbHNlKSk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRPdmVycmlkZUF4VXNlcklkID0gbm9ybWFsaXplQXhVc2VySWRIZWFkZXIoYXhVc2VySWRPdmVycmlkZSk7XG4gIGNvbnN0IHJlc29sdmVkQXhVc2VySWQgPSBzYWZlVGV4dChub3JtYWxpemVkT3ZlcnJpZGVBeFVzZXJJZCB8fCBjb250ZXh0LmF4VXNlcklkKTtcbiAgaWYgKHJlc29sdmVkQXhVc2VySWQpIHtcbiAgICBoZWFkZXJzW1wiWC1JTkQtQXhVc2VySWRcIl0gPSByZXNvbHZlZEF4VXNlcklkO1xuICB9IGVsc2Uge1xuICAgIHJlbW92ZUhlYWRlclZhbHVlKGhlYWRlcnMsIFwiWC1JTkQtQXhVc2VySWRcIik7XG4gIH1cbiAgcmV0dXJuIGhlYWRlcnM7XG59O1xuXG4vLyBMb2FkcyB0aGUgZXhwZW5zZSBzaGVldCBsaXN0IGZyb20gL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9saXN0LlxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0TGlzdCA9IGFzeW5jIChcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3QsXG4gIG9wdGlvbnM/OiBFeHBlbnNlU2hlZXRMaXN0RmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+PiA9PiB7XG4gIGNvbnN0IHsgYXhVc2VySWRPdmVycmlkZSwgLi4uYmFzZU9wdGlvbnMgfSA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IHJhd0NyZWF0ZWREYXRlRnJvbSA9IHNhZmVUZXh0KHBheWxvYWQ/LmNyZWF0ZWREYXRlRnJvbSk7XG4gIGNvbnN0IHJhd0NyZWF0ZWREYXRlVG8gPSBzYWZlVGV4dChwYXlsb2FkPy5jcmVhdGVkRGF0ZVRvKTtcbiAgY29uc3QgY3JlYXRlZERhdGVGcm9tID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlKHJhd0NyZWF0ZWREYXRlRnJvbSk7XG4gIGNvbnN0IGNyZWF0ZWREYXRlVG8gPSBub3JtYWxpemVPcHRpb25hbEFwaURhdGUocmF3Q3JlYXRlZERhdGVUbyk7XG5cbiAgaWYgKHJhd0NyZWF0ZWREYXRlRnJvbSAmJiAhY3JlYXRlZERhdGVGcm9tKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XG4gIH1cbiAgaWYgKHJhd0NyZWF0ZWREYXRlVG8gJiYgIWNyZWF0ZWREYXRlVG8pIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcbiAgfVxuXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCA9IHtcbiAgICAuLi5wYXlsb2FkLFxuICAgIGNyZWF0ZWREYXRlRnJvbSxcbiAgICBjcmVhdGVkRGF0ZVRvLFxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlcihwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyksXG4gICAgaW5jbHVkZVN1Ym9yZGluYXRlczogcGF5bG9hZC5pbmNsdWRlU3Vib3JkaW5hdGVzID09PSB0cnVlLFxuICB9O1xuXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChiYXNlT3B0aW9ucyk7XG4gIGNvbnN0IGxpc3RIZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgYmFzZU9wdGlvbnMsIHRydWUsIGZhbHNlKSk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRPdmVycmlkZUF4VXNlcklkID0gbm9ybWFsaXplQXhVc2VySWRIZWFkZXIoYXhVc2VySWRPdmVycmlkZSk7XG4gIGNvbnN0IHJlc29sdmVkQXhVc2VySWQgPSBzYWZlVGV4dChub3JtYWxpemVkT3ZlcnJpZGVBeFVzZXJJZCB8fCBjb250ZXh0LmF4VXNlcklkKTtcbiAgaWYgKHJlc29sdmVkQXhVc2VySWQpIHtcbiAgICBsaXN0SGVhZGVyc1tcIlgtSU5ELUF4VXNlcklkXCJdID0gcmVzb2x2ZWRBeFVzZXJJZDtcbiAgfSBlbHNlIHtcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShsaXN0SGVhZGVycywgXCJYLUlORC1BeFVzZXJJZFwiKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9saXN0XCIsIHtcbiAgICAgIC4uLmJhc2VPcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IGxpc3RIZWFkZXJzLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoIXNob3VsZFVzZUxlZ2FjeUZhbGxiYWNrKGVycm9yKSkge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgY29uc3QgbGVnYWN5UmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248TGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZT4oXCIvR2FzdG9zL0xpc3RFeHBlbnNlU2hlZXRzXCIsIHtcbiAgICAgIC4uLmJhc2VPcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgLi4uc2FuaXRpemVIZWFkZXJzKGJhc2VPcHRpb25zPy5oZWFkZXJzKSxcbiAgICAgICAgLi4uSlNPTl9IRUFERVJTLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHRvTGVnYWN5TGlzdFJlcXVlc3RQYXlsb2FkKHNhZmVQYXlsb2FkKSksXG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXBwZWQgPSBtYXBMZWdhY3lMaXN0UmVzcG9uc2UoXG4gICAgICBsZWdhY3lSZXNwb25zZSxcbiAgICAgIE51bWJlci5pc0Zpbml0ZShzYWZlUGF5bG9hZC5wYWdlKSAmJiBzYWZlUGF5bG9hZC5wYWdlID4gMCA/IHNhZmVQYXlsb2FkLnBhZ2UgOiAxLFxuICAgICAgTnVtYmVyLmlzRmluaXRlKHNhZmVQYXlsb2FkLnBhZ2VTaXplKSAmJiBzYWZlUGF5bG9hZC5wYWdlU2l6ZSA+IDAgPyBzYWZlUGF5bG9hZC5wYWdlU2l6ZSA6IDUwXG4gICAgKTtcblxuICAgIHJldHVybiBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZShtYXBwZWQpO1xuICB9XG59O1xuXG4vLyBMb2FkcyBvbmUgZXhwZW5zZSBzaGVldCBkZXRhaWwgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9LlxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsID0gYXN5bmMgKFxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldERldGFpbER0bz4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlU2hlZXRJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0RGV0YWlsRHRvPj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH1gLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gUmVhZHMgYXZhaWxhYmxlIGN1cnJlbmNpZXMgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2N1cnJlbmNpZXMuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVNoZWV0Q3VycmVuY2llcyA9IGFzeW5jIChcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj4gPT4ge1xuICBsZXQgY29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQgfCBudWxsID0gbnVsbDtcbiAgdHJ5IHtcbiAgICBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSkge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgY29tcGFueUlkID0gc2FmZVRleHQoY29udGV4dD8uY29tcGFueUlkIHx8IHJlYWRXaW5kb3dTZWxlY3RlZENvbXBhbnkoKSkudG9VcHBlckNhc2UoKTtcbiAgY29uc3QgY2FjaGVLZXkgPSBjb21wYW55SWQgfHwgXCItXCI7XG5cbiAgaWYgKGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLmhhcyhjYWNoZUtleSkpIHtcbiAgICByZXR1cm4gY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuZ2V0KGNhY2hlS2V5KSBhcyBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPjtcbiAgfVxuXG4gIGlmIChwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5oYXMoY2FjaGVLZXkpKSB7XG4gICAgcmV0dXJuIHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLmdldChjYWNoZUtleSkgYXMgUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj47XG4gIH1cblxuICBjb25zdCByZXF1ZXN0UHJvbWlzZSA9IChhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIkF1dGhvcml6YXRpb25cIik7XG4gICAgcmVtb3ZlSGVhZGVyVmFsdWUoaGVhZGVycywgXCJYLUlORC1BeFVzZXJJZFwiKTtcblxuICAgIGlmIChjb21wYW55SWQpIHtcbiAgICAgIGhlYWRlcnNbXCJYLUlORC1Db21wYW55XCJdID0gY29tcGFueUlkO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj4oXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL2N1cnJlbmNpZXNcIiwge1xuICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgIGhlYWRlcnMsXG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgbm9ybWFsaXplZFJlc3BvbnNlID0gbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgICAgIGlmIChub3JtYWxpemVkUmVzcG9uc2UuU3VjY2Vzcykge1xuICAgICAgICBjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcy5zZXQoY2FjaGVLZXksIG5vcm1hbGl6ZWRSZXNwb25zZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBub3JtYWxpemVkUmVzcG9uc2U7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmICghc2hvdWxkVXNlTGVnYWN5RmFsbGJhY2soZXJyb3IpKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBsZWdhY3lMaXN0UmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248TGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZT4oXCIvR2FzdG9zL0xpc3RFeHBlbnNlU2hlZXRzXCIsIHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIC4uLnNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKSxcbiAgICAgICAgICAuLi5KU09OX0hFQURFUlMsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBmaWx0ZXI6IFwiXCIsXG4gICAgICAgICAgaG9qYUdhc3Rvc0lkOiBcIlwiLFxuICAgICAgICAgIGJpbGxlZE1vZGU6IDIsXG4gICAgICAgICAgZnJvbURhdGU6IFwiXCIsXG4gICAgICAgICAgdG9EYXRlOiBcIlwiLFxuICAgICAgICAgIHByb2plY3RJZDogXCJcIixcbiAgICAgICAgICBjdXJyZW5jeUNvZGU6IFwiXCIsXG4gICAgICAgICAgcGFnZTogMSxcbiAgICAgICAgICBwYWdlU2l6ZTogMjAwLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBzZWVuQ29kZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICAgIGNvbnN0IHNvdXJjZUl0ZW1zID0gQXJyYXkuaXNBcnJheShsZWdhY3lMaXN0UmVzcG9uc2UuaXRlbXMpID8gbGVnYWN5TGlzdFJlc3BvbnNlLml0ZW1zIDogW107XG4gICAgICBjb25zdCBmYWxsYmFja0l0ZW1zOiBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0b1tdID0gc291cmNlSXRlbXNcbiAgICAgICAgLm1hcCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5LmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSlcbiAgICAgICAgLmZpbHRlcigoY29kZSkgPT4gISFjb2RlKVxuICAgICAgICAuZmlsdGVyKChjb2RlKSA9PiB7XG4gICAgICAgICAgaWYgKHNlZW5Db2Rlcy5oYXMoY29kZSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICBzZWVuQ29kZXMuYWRkKGNvZGUpO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KVxuICAgICAgICAubWFwKChjb2RlKSA9PiAoe1xuICAgICAgICAgIEN1cnJlbmN5Q29kZTogY29kZSxcbiAgICAgICAgICBDdXJyZW5jeUNvZGVJU086IGNvZGUsXG4gICAgICAgIH0pKTtcblxuICAgICAgY29uc3QgZmFsbGJhY2tSZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4gPSB7XG4gICAgICAgIFN1Y2Nlc3M6IGxlZ2FjeUxpc3RSZXNwb25zZS5zdWNjZXNzICE9PSBmYWxzZSxcbiAgICAgICAgTWVzc2FnZTogc2FmZVRleHQobGVnYWN5TGlzdFJlc3BvbnNlLm1lc3NhZ2UpIHx8IFwiT0tcIixcbiAgICAgICAgVG90YWw6IGZhbGxiYWNrSXRlbXMubGVuZ3RoLFxuICAgICAgICBQYWdlOiAxLFxuICAgICAgICBQYWdlU2l6ZTogZmFsbGJhY2tJdGVtcy5sZW5ndGgsXG4gICAgICAgIEl0ZW1zOiBmYWxsYmFja0l0ZW1zLFxuICAgICAgICBUcmFjZUlkOiB1bmRlZmluZWQsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBub3JtYWxpemVkRmFsbGJhY2sgPSBub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2UoZmFsbGJhY2tSZXNwb25zZSk7XG4gICAgICBpZiAobm9ybWFsaXplZEZhbGxiYWNrLlN1Y2Nlc3MpIHtcbiAgICAgICAgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuc2V0KGNhY2hlS2V5LCBub3JtYWxpemVkRmFsbGJhY2spO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbm9ybWFsaXplZEZhbGxiYWNrO1xuICAgIH1cbiAgfSkoKTtcblxuICBwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5zZXQoY2FjaGVLZXksIHJlcXVlc3RQcm9taXNlKTtcbiAgdHJ5IHtcbiAgICByZXR1cm4gYXdhaXQgcmVxdWVzdFByb21pc2U7XG4gIH0gZmluYWxseSB7XG4gICAgcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuZGVsZXRlKGNhY2hlS2V5KTtcbiAgfVxufTtcblxuLy8gUmVhZHMgYXZhaWxhYmxlIHN1Ym9yZGluYXRlcyBmcm9tIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvc3Vib3JkaW5hdGVzLlxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlcyA9IGFzeW5jIChcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIC8vIFN1Ym9yZGluYXRlcyBtdXN0IGFsd2F5cyByZXNvbHZlIGZyb20gdGhlIGxvZ2dlZCBjb250ZXh0IHVzZXIsIG5vdCBmcm9tIGFjdGluZy11c2VyIG92ZXJyaWRlcy5cbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIGZhbHNlLCBmYWxzZSkpO1xuICBjb25zdCBjb250ZXh0QXhVc2VySWQgPSBzYWZlVGV4dChjb250ZXh0LmF4VXNlcklkKTtcbiAgaWYgKGNvbnRleHRBeFVzZXJJZCkge1xuICAgIGhlYWRlcnNbXCJYLUlORC1BeFVzZXJJZFwiXSA9IGNvbnRleHRBeFVzZXJJZDtcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8dW5rbm93bj4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9zdWJvcmRpbmF0ZXNcIiwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIGhlYWRlcnMsXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIEV4cG9zZXMgdGhlIGRlZmF1bHQgY3VycmVuY3kgcmVzb2x2ZWQgZnJvbSBFbnRyYSBjb250ZXh0IGZvciBpbml0aWFsIHNlbGVjdGlvbnMuXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVNoZWV0RGVmYXVsdEN1cnJlbmN5Q29kZSA9IGFzeW5jIChvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gICAgcmV0dXJuIHNhZmVUZXh0KGNvbnRleHQuZGVmYXVsdEN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKTtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cbn07XG5cbi8vIFJlYWRzIGV4Y2hhbmdlIHJhdGUgZnJvbSAvYXBpL3N5c3RlbS9leGNoYW5nZS1yYXRlLlxuZXhwb3J0IGNvbnN0IGdldEV4Y2hhbmdlUmF0ZSA9IGFzeW5jIChcbiAgYmFzZUN1cnJlbmN5OiBzdHJpbmcsXG4gIHRhcmdldEN1cnJlbmN5OiBzdHJpbmcsXG4gIGRhdGU/OiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RXhjaGFuZ2VSYXRlRHRvPj4gPT4ge1xuICBjb25zdCB0b2tlbiA9IHJlc29sdmVBdXRoVG9rZW4ob3B0aW9ucyk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kgPSBzYWZlVGV4dChiYXNlQ3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRUYXJnZXRDdXJyZW5jeSA9IHNhZmVUZXh0KHRhcmdldEN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBub3JtYWxpemVkRGF0ZSA9IHNhZmVUZXh0KGRhdGUpO1xuICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcblxuICBxdWVyeS5zZXQoXCJiYXNlQ3VycmVuY3lcIiwgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSk7XG4gIHF1ZXJ5LnNldChcInRhcmdldEN1cnJlbmN5XCIsIG5vcm1hbGl6ZWRUYXJnZXRDdXJyZW5jeSk7XG4gIGlmIChub3JtYWxpemVkRGF0ZSkge1xuICAgIHF1ZXJ5LnNldChcImRhdGVcIiwgbm9ybWFsaXplZERhdGUpO1xuICB9XG5cbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcbiAgaWYgKHRva2VuKSB7XG4gICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke3Rva2VufWA7XG4gIH1cblxuICByZXR1cm4gZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4Y2hhbmdlUmF0ZUR0bz4+KGAvYXBpL3N5c3RlbS9leGNoYW5nZS1yYXRlPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgaGVhZGVycyxcbiAgfSk7XG59O1xuXG4vLyBSZWFkcyBleGNoYW5nZSByYXRlIGZyb20gL2FwaS9zeXN0ZW0vZXhjaGFuZ2UtcmF0ZS9wdWJsaWMtZGlyZWN0LlxuZXhwb3J0IGNvbnN0IGdldEV4Y2hhbmdlUmF0ZVB1YmxpY0RpcmVjdCA9IGFzeW5jIChcbiAgYmFzZUN1cnJlbmN5OiBzdHJpbmcsXG4gIHRhcmdldEN1cnJlbmN5OiBzdHJpbmcsXG4gIGRhdGU/OiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RXhjaGFuZ2VSYXRlRHRvPj4gPT4ge1xuICBjb25zdCB0b2tlbiA9IHJlc29sdmVBdXRoVG9rZW4ob3B0aW9ucyk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kgPSBzYWZlVGV4dChiYXNlQ3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRUYXJnZXRDdXJyZW5jeSA9IHNhZmVUZXh0KHRhcmdldEN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBub3JtYWxpemVkRGF0ZSA9IHNhZmVUZXh0KGRhdGUpO1xuICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcblxuICBxdWVyeS5zZXQoXCJiYXNlQ3VycmVuY3lcIiwgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSk7XG4gIHF1ZXJ5LnNldChcInRhcmdldEN1cnJlbmN5XCIsIG5vcm1hbGl6ZWRUYXJnZXRDdXJyZW5jeSk7XG4gIGlmIChub3JtYWxpemVkRGF0ZSkge1xuICAgIHF1ZXJ5LnNldChcImRhdGVcIiwgbm9ybWFsaXplZERhdGUpO1xuICB9XG5cbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcbiAgaWYgKHRva2VuKSB7XG4gICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke3Rva2VufWA7XG4gIH1cblxuICByZXR1cm4gZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4Y2hhbmdlUmF0ZUR0bz4+KGAvYXBpL3N5c3RlbS9leGNoYW5nZS1yYXRlL3B1YmxpYy1kaXJlY3Q/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICBoZWFkZXJzLFxuICB9KTtcbn07XG5cbi8vIFJlYWRzIGZ1ZWwgcHJpY2UgcGVyIGttIGZyb20gL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9mdWVsLXByaWNlLWttLlxuZXhwb3J0IGNvbnN0IGdldEZ1ZWxQcmljZUttID0gYXN5bmMgKFxuICB0cmFuc0RhdGU6IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxGdWVsUHJpY2VLbUR0bz4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBub3JtYWxpemVkRGF0ZSA9IG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZSh0cmFuc0RhdGUpO1xuICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcblxuICBxdWVyeS5zZXQoXCJ0cmFuc0RhdGVcIiwgbm9ybWFsaXplZERhdGUpO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEZ1ZWxQcmljZUttRHRvPj4oXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvZnVlbC1wcmljZS1rbT8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCxcbiAgICB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIENyZWF0ZXMgYW4gZXhwZW5zZSBzaGVldCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzLlxuZXhwb3J0IGNvbnN0IGNyZWF0ZUV4cGVuc2VTaGVldCA9IGFzeW5jIChcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRDcmVhdGVSZXNwb25zZURhdGE+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3QgbW9kZSA9IHBheWxvYWQubW9kZSA/PyAwO1xuICBjb25zdCBsaW5lcyA9IEFycmF5LmlzQXJyYXkocGF5bG9hZC5saW5lcykgPyBwYXlsb2FkLmxpbmVzIDogW107XG4gIGNvbnN0IG5vcm1hbGl6ZWRMaW5lcyA9IGxpbmVzLm1hcCgobGluZSkgPT4gKHtcbiAgICAuLi5saW5lLFxuICAgIHRyYW5zRGF0ZTogbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlKGxpbmUudHJhbnNEYXRlKSxcbiAgfSkpO1xuICBjb25zdCBoYXNJbnZhbGlkTGluZVBheWxvYWQgPSBub3JtYWxpemVkTGluZXMuc29tZSgobGluZSkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAhc2FmZVRleHQobGluZS50cmFuc0RhdGUpIHx8XG4gICAgICAhTnVtYmVyLmlzSW50ZWdlcihOdW1iZXIobGluZS50eXBlVmFsdWUpKSB8fFxuICAgICAgTnVtYmVyKGxpbmUudHlwZVZhbHVlKSA8PSAwIHx8XG4gICAgICAhaXNQb3NpdGl2ZU51bWJlcihsaW5lLnF0eSkgfHxcbiAgICAgICFpc1Bvc2l0aXZlTnVtYmVyKGxpbmUucHJpY2UpXG4gICAgKTtcbiAgfSk7XG5cbiAgaWYgKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzICE9PSB1bmRlZmluZWQgJiYgIWlzTm9uTmVnYXRpdmVOdW1iZXIocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleHBlbnNlU2hlZXRTdGF0dXMgbXVzdCBiZSBncmVhdGVyIG9yIGVxdWFsIHRvIDAuXCIpO1xuICB9XG5cbiAgaWYgKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSAhPT0gdW5kZWZpbmVkICYmICFpc05vbk5lZ2F0aXZlTnVtYmVyKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSkpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4Y2hhbmdlUmF0ZU1vZGUgbXVzdCBiZSBncmVhdGVyIG9yIGVxdWFsIHRvIDAuXCIpO1xuICB9XG5cbiAgaWYgKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSAhPT0gdW5kZWZpbmVkICYmIHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4Y2hhbmdlUmF0ZU1vZGUgcmVxdWlyZXMgZXhwZW5zZVNoZWV0U3RhdHVzLlwiKTtcbiAgfVxuXG4gIGlmIChoYXNJbnZhbGlkTGluZVBheWxvYWQpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkVhY2ggbGluZSByZXF1aXJlcyB0cmFuc0RhdGUsIHR5cGVWYWx1ZSwgcXR5ID4gMCBhbmQgcHJpY2UgPiAwLlwiKTtcbiAgfVxuXG4gIGlmIChtb2RlID09PSAwKSB7XG4gICAgaWYgKCFzYWZlVGV4dChwYXlsb2FkLmRlc2NyaXB0aW9uKSB8fCAhc2FmZVRleHQocGF5bG9hZC5jdXJyZW5jeUNvZGUpIHx8IGxpbmVzLmxlbmd0aCA8IDEpIHtcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiSW52YWxpZCBjcmVhdGUgcGF5bG9hZCBmb3IgbW9kZSAwLlwiKTtcbiAgICB9XG4gIH1cblxuICBpZiAobW9kZSA9PT0gMSkge1xuICAgIGlmICghc2FmZVRleHQocGF5bG9hZC5kZXNjcmlwdGlvbikgfHwgIXNhZmVUZXh0KHBheWxvYWQuY3VycmVuY3lDb2RlKSkge1xuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJJbnZhbGlkIGNyZWF0ZSBwYXlsb2FkIGZvciBtb2RlIDEuXCIpO1xuICAgIH1cblxuICAgIGlmIChsaW5lcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIk1vZGUgMSByZXF1aXJlcyBsaW5lcyB0byBiZSBudWxsIG9yIGVtcHR5LlwiKTtcbiAgICB9XG4gIH1cblxuICBpZiAobW9kZSA9PT0gMikge1xuICAgIGlmICghc2FmZVRleHQocGF5bG9hZC5leGlzdGluZ0hvamFHYXN0b3NJZCkgfHwgbGluZXMubGVuZ3RoIDwgMSkge1xuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJJbnZhbGlkIGNyZWF0ZSBwYXlsb2FkIGZvciBtb2RlIDIuXCIpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG5vcm1hbGl6ZWRQYXlsb2FkOiBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0ID0ge1xuICAgIC4uLnBheWxvYWQsXG4gICAgbW9kZSxcbiAgICBleGlzdGluZ0hvamFHYXN0b3NJZDogc2FmZVRleHQocGF5bG9hZC5leGlzdGluZ0hvamFHYXN0b3NJZCkgfHwgdW5kZWZpbmVkLFxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChwYXlsb2FkLmRlc2NyaXB0aW9uKSB8fCB1bmRlZmluZWQsXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChwYXlsb2FkLmN1cnJlbmN5Q29kZSkgfHwgdW5kZWZpbmVkLFxuICAgIHByb2pJZDogc2FmZVRleHQocGF5bG9hZC5wcm9qSWQpIHx8IHVuZGVmaW5lZCxcbiAgICBsaW5lczogbW9kZSA9PT0gMSA/IFtdIDogbm9ybWFsaXplZExpbmVzLFxuICB9O1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldENyZWF0ZVJlc3BvbnNlRGF0YT4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0c1wiLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkobm9ybWFsaXplZFBheWxvYWQpLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gVXBkYXRlcyBoZWFkZXIgZmllbGRzIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0uXG5leHBvcnQgY29uc3QgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyID0gYXN5bmMgKFxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0SGVhZGVyVXBkYXRlUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTx7IEhvamFHYXN0b3NJZDogc3RyaW5nIH0+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xuXG4gIGlmIChwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyAhPT0gdW5kZWZpbmVkICYmICFpc05vbk5lZ2F0aXZlTnVtYmVyKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzKSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhwZW5zZVNoZWV0U3RhdHVzIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byAwLlwiKTtcbiAgfVxuXG4gIGlmIChwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUgIT09IHVuZGVmaW5lZCAmJiAhaXNOb25OZWdhdGl2ZU51bWJlcihwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleGNoYW5nZVJhdGVNb2RlIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byAwLlwiKTtcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPHsgSG9qYUdhc3Rvc0lkOiBzdHJpbmcgfT4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9YCwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBEZWxldGVzIGEgZnVsbCBleHBlbnNlIHNoZWV0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0vbGluZXMvMD9kZWxldGVXaG9sZVNoZWV0PXRydWUuXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0ID0gYXN5bmMgKFxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxudWxsPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8bnVsbD4+KFxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9L2xpbmVzLzA/ZGVsZXRlTW9kZT0yJmRlbGV0ZVdob2xlU2hlZXQ9dHJ1ZWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBVcGRhdGVzIG9uZSBleHBlbnNlIGxpbmUgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS9saW5lcy97bGluZVJlY0lkfS5cbmV4cG9ydCBjb25zdCB1cGRhdGVFeHBlbnNlU2hlZXRMaW5lID0gYXN5bmMgKFxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcbiAgbGluZVJlY0lkOiBzdHJpbmcsXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXNwb25zZURhdGE+PiA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc0RhdGUgPSBub3JtYWxpemVSZXF1aXJlZEFwaURhdGUocGF5bG9hZC50cmFuc0RhdGUpO1xuICBpZiAoXG4gICAgIU51bWJlci5pc0ludGVnZXIoTnVtYmVyKHBheWxvYWQudHlwZVZhbHVlKSkgfHxcbiAgICBOdW1iZXIocGF5bG9hZC50eXBlVmFsdWUpIDw9IDAgfHxcbiAgICAhaXNQb3NpdGl2ZU51bWJlcihwYXlsb2FkLnF0eSkgfHxcbiAgICAhaXNQb3NpdGl2ZU51bWJlcihwYXlsb2FkLnByaWNlKVxuICApIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcInRyYW5zRGF0ZSwgdHlwZVZhbHVlLCBxdHkgPiAwIGFuZCBwcmljZSA+IDAgYXJlIHJlcXVpcmVkLlwiKTtcbiAgfVxuXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCBzYWZlTGluZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhsaW5lUmVjSWQgfHwgXCJcIikudHJpbSgpKTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVzcG9uc2VEYXRhPj4oXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH0vbGluZXMvJHtzYWZlTGluZUlkfWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIC4uLnBheWxvYWQsXG4gICAgICAgIHRyYW5zRGF0ZTogbm9ybWFsaXplZFRyYW5zRGF0ZSxcbiAgICAgIH0pLFxuICAgIH1cbiAgKTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gRGVsZXRlcyBvbmUgZXhwZW5zZSBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0vbGluZXMve2xpbmVSZWNJZH0/ZGVsZXRlV2hvbGVTaGVldD1mYWxzZS5cbmV4cG9ydCBjb25zdCBkZWxldGVFeHBlbnNlU2hlZXRMaW5lID0gYXN5bmMgKFxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcbiAgbGluZVJlY0lkOiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlU2hlZXRJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHNhZmVMaW5lSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGxpbmVSZWNJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxudWxsPj4oXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH0vbGluZXMvJHtzYWZlTGluZUlkfT9kZWxldGVNb2RlPTAmZGVsZXRlV2hvbGVTaGVldD1mYWxzZWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBFeHRyYWN0cyBhbiBleHBlbnNlIGRyYWZ0IGZyb20gYSB0aWNrZXQgaW1hZ2UgdXNpbmcgL2FwaS9pYS9zZXJ2aWNlL2V4cGVuc2Vmcm9tdGlja2V0LlxuZXhwb3J0IGNvbnN0IGV4dHJhY3RFeHBlbnNlRnJvbVRpY2tldERyYWZ0ID0gYXN5bmMgKFxuICB0aWNrZXRJbWFnZTogRmlsZSB8IEJsb2IsXG4gIHBlcnNpc3RUaWNrZXQ/OiBib29sZWFuLFxuICB0aWNrZXRVcmxGaWxlPzogc3RyaW5nLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldERyYWZ0UmVzcG9uc2U+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3QgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xuICBjb25zdCBzYWZlVGlja2V0VXJsID0gc2FmZVRleHQodGlja2V0VXJsRmlsZSk7XG5cbiAgaWYgKHRpY2tldEltYWdlIGluc3RhbmNlb2YgRmlsZSkge1xuICAgIGZvcm0uYXBwZW5kKFwidGlja2V0SW1hZ2VcIiwgdGlja2V0SW1hZ2UsIHNhZmVUZXh0KHRpY2tldEltYWdlLm5hbWUpIHx8IFwidGlja2V0LmpwZ1wiKTtcbiAgfSBlbHNlIHtcbiAgICBmb3JtLmFwcGVuZChcInRpY2tldEltYWdlXCIsIHRpY2tldEltYWdlLCBcInRpY2tldC5qcGdcIik7XG4gIH1cblxuICBpZiAodHlwZW9mIHBlcnNpc3RUaWNrZXQgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgZm9ybS5hcHBlbmQoXCJwZXJzaXN0VGlja2V0XCIsIHBlcnNpc3RUaWNrZXQgPyBcInRydWVcIiA6IFwiZmFsc2VcIik7XG4gIH1cblxuICBpZiAoc2FmZVRpY2tldFVybCkge1xuICAgIGZvcm0uYXBwZW5kKFwidGlja2V0VXJsRmlsZVwiLCBzYWZlVGlja2V0VXJsKTtcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldERyYWZ0UmVzcG9uc2U+PihcIi9hcGkvaWEvc2VydmljZS9leHBlbnNlZnJvbXRpY2tldFwiLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUZvcm1IZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxuICAgIGJvZHk6IGZvcm0sXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBDcmVhdGVzIGFuZCBmaW5hbGl6ZXMgb25lIHRpY2tldCBmcm9tIGEgc2luZ2xlIG11bHRpcGFydCB1cGxvYWQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3F1aWNrLWNyZWF0ZS5cbmV4cG9ydCBjb25zdCBjcmVhdGVFeHBlbnNlU2hlZXRUaWNrZXRRdWljayA9IGFzeW5jIChcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVzdWx0PiA9PiB7XG4gIGlmICghcGF5bG9hZD8udGlja2V0SW1hZ2UpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcInRpY2tldEltYWdlIGlzIHJlcXVpcmVkLlwiKTtcbiAgfVxuXG4gIGNvbnN0IHsgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IF9zdXBwcmVzc1Blcm1pc3Npb25Nb2RhbCwgLi4uZmV0Y2hPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQoZmV0Y2hPcHRpb25zKTtcbiAgY29uc3QgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xuICBjb25zdCBzYWZlQ3VycmVuY3lDb2RlID0gc2FmZVRleHQocGF5bG9hZD8uY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBzYWZlRGVzY3JpcHRpb24gPSBzYWZlVGV4dChwYXlsb2FkPy5kZXNjcmlwdGlvbik7XG4gIGNvbnN0IHNhZmVDb21lbnRhcmlvID0gc2FmZVRleHQocGF5bG9hZD8uY29tZW50YXJpbyk7XG4gIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQocGF5bG9hZD8uZXhpc3RpbmdIb2phR2FzdG9zSWQpO1xuICBjb25zdCBzYWZlUHJvamVjdElkID0gc2FmZVRleHQocGF5bG9hZD8ucHJvamVjdElkKTtcbiAgY29uc3QgdGlja2V0SW1hZ2UgPSBwYXlsb2FkLnRpY2tldEltYWdlO1xuXG4gIGlmICh0aWNrZXRJbWFnZSBpbnN0YW5jZW9mIEZpbGUpIHtcbiAgICBmb3JtLmFwcGVuZChcInRpY2tldEltYWdlXCIsIHRpY2tldEltYWdlLCBzYWZlVGV4dCh0aWNrZXRJbWFnZS5uYW1lKSB8fCBcInRpY2tldC5qcGdcIik7XG4gIH0gZWxzZSB7XG4gICAgZm9ybS5hcHBlbmQoXCJ0aWNrZXRJbWFnZVwiLCB0aWNrZXRJbWFnZSwgXCJ0aWNrZXQuanBnXCIpO1xuICB9XG5cbiAgaWYgKHNhZmVDdXJyZW5jeUNvZGUpIHtcbiAgICBmb3JtLmFwcGVuZChcImN1cnJlbmN5Q29kZVwiLCBzYWZlQ3VycmVuY3lDb2RlKTtcbiAgfVxuXG4gIGlmIChcImRlc2NyaXB0aW9uXCIgaW4gcGF5bG9hZCkge1xuICAgIGZvcm0uYXBwZW5kKFwiZGVzY3JpcHRpb25cIiwgc2FmZURlc2NyaXB0aW9uKTtcbiAgfVxuXG4gIGlmIChcImNvbWVudGFyaW9cIiBpbiBwYXlsb2FkKSB7XG4gICAgZm9ybS5hcHBlbmQoXCJjb21lbnRhcmlvXCIsIHNhZmVDb21lbnRhcmlvKTtcbiAgfVxuXG4gIGlmIChzYWZlU2hlZXRJZCkge1xuICAgIGZvcm0uYXBwZW5kKFwiZXhpc3RpbmdIb2phR2FzdG9zSWRcIiwgc2FmZVNoZWV0SWQpO1xuICB9XG5cbiAgaWYgKHNhZmVTaGVldElkICYmIHNhZmVQcm9qZWN0SWQpIHtcbiAgICBmb3JtLmFwcGVuZChcInByb2plY3RJZFwiLCBzYWZlUHJvamVjdElkKTtcbiAgfVxuXG4gIGNvbnN0IGNzcmZUb2tlbiA9IGdldENzcmZUb2tlbigpO1xuICBjb25zdCBoZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKGJ1aWxkRXhwZW5zZUZvcm1IZWFkZXJzKGNvbnRleHQsIGZldGNoT3B0aW9ucykpO1xuICBpZiAoY3NyZlRva2VuKSB7XG4gICAgaGVhZGVycy5SZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW4gPSBjc3JmVG9rZW47XG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3F1aWNrLWNyZWF0ZVwiLCB7XG4gICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcbiAgICAuLi5mZXRjaE9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzLFxuICAgIGJvZHk6IGZvcm0sXG4gIH0pO1xuXG4gIGNvbnN0IHJhdyA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgY29uc3QgcmV0cnlBZnRlciA9IHNhZmVUZXh0KHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiUmV0cnktQWZ0ZXJcIikpO1xuXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICBjb25zdCByZWxvZ2luUmVzdWx0ID0gYXdhaXQgaGFuZGxlQXBpQXV0aEZhaWx1cmU8RXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQ+KFxuICAgICAgcmF3LFxuICAgICAgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgXCJ0aWNrZXQtcXVpY2stY3JlYXRlXCJcbiAgICApO1xuICAgIGlmIChyZWxvZ2luUmVzdWx0ICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gcmVsb2dpblJlc3VsdDtcbiAgICB9XG5cbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKHJlYWRBcGlNZXNzYWdlRnJvbVJhdyhyYXcpIHx8IFwiUGVybWlzc2lvbiBkZW5pZWQuXCIsIHJlc3BvbnNlLnN0YXR1cywgcmF3KTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBwYXJzZWQgPSB0cnlQYXJzZUpzb24ocmF3KTtcbiAgaWYgKCFwYXJzZWQgfHwgdHlwZW9mIHBhcnNlZCAhPT0gXCJvYmplY3RcIikge1xuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKHJlYWRBcGlNZXNzYWdlRnJvbVJhdyhyYXcpIHx8IFwiUmVxdWVzdCBmYWlsZWQuXCIsIHJlc3BvbnNlLnN0YXR1cywgcmF3KTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJJbnZhbGlkIHNlcnZlciByZXNwb25zZS5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xuICB9XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZVRpY2tldFF1aWNrQ3JlYXRlUmVzcG9uc2Uoe1xuICAgIC4uLihwYXJzZWQgYXMgRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQpLFxuICAgIEh0dHBTdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICBSZXRyeUFmdGVyOiByZXRyeUFmdGVyIHx8IG51bGwsXG4gIH0pO1xufTtcblxuLy8gQ3JlYXRlcyBhIHRpY2tldCBoZWFkZXIvbGluZXMgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLlxuZXhwb3J0IGNvbnN0IGNyZWF0ZUV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0Q3JlYXRlUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3QgbW9kZSA9IE51bWJlcihwYXlsb2FkPy5tb2RlKTtcbiAgY29uc3QgcmF3VHJhbnNEYXRlID0gc2FmZVRleHQocGF5bG9hZD8udHJhbnNEYXRlKTtcbiAgY29uc3Qgbm9ybWFsaXplZFRyYW5zRGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdUcmFuc0RhdGUpO1xuXG4gIGlmIChyYXdUcmFuc0RhdGUgJiYgIW5vcm1hbGl6ZWRUcmFuc0RhdGUpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcbiAgfVxuXG4gIGlmICgobW9kZSA9PT0gMCB8fCBtb2RlID09PSAxKSAmJiAhbm9ybWFsaXplZFRyYW5zRGF0ZSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xuICB9XG5cbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldENyZWF0ZVJlcXVlc3QgPSB7XG4gICAgLi4ucGF5bG9hZCxcbiAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZWRUcmFuc0RhdGUgfHwgdW5kZWZpbmVkLFxuICAgIGdhc3RvVHlwZTogbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUocGF5bG9hZD8uZ2FzdG9UeXBlKSxcbiAgfTtcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4oXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHNcIiwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZVRpY2tldEZpbHRlckNyaXRlcmlhUGF5bG9hZCA9IDxcbiAgVCBleHRlbmRzIHtcbiAgICBjcmVhdGVkRGF0ZUZyb20/OiBzdHJpbmc7XG4gICAgY3JlYXRlZERhdGVUbz86IHN0cmluZztcbiAgICBzZWFyY2hLZXk/OiBzdHJpbmc7XG4gICAgZmlsdGVyPzogc3RyaW5nO1xuICAgIGN1cnJlbmN5Q29kZT86IHN0cmluZztcbiAgICBnYXN0b1R5cGU/OiB1bmtub3duO1xuICAgIHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duO1xuICB9LFxuPihcbiAgcGF5bG9hZDogVFxuKSA9PiB7XG4gIGNvbnN0IHJhd0NyZWF0ZWREYXRlRnJvbSA9IHNhZmVUZXh0KHBheWxvYWQ/LmNyZWF0ZWREYXRlRnJvbSk7XG4gIGNvbnN0IHJhd0NyZWF0ZWREYXRlVG8gPSBzYWZlVGV4dChwYXlsb2FkPy5jcmVhdGVkRGF0ZVRvKTtcbiAgY29uc3QgY3JlYXRlZERhdGVGcm9tID0gbm9ybWFsaXplVGlja2V0TGlzdERhdGUocmF3Q3JlYXRlZERhdGVGcm9tKTtcbiAgY29uc3QgY3JlYXRlZERhdGVUbyA9IG5vcm1hbGl6ZVRpY2tldExpc3REYXRlKHJhd0NyZWF0ZWREYXRlVG8pO1xuICBpZiAocmF3Q3JlYXRlZERhdGVGcm9tICYmICFjcmVhdGVkRGF0ZUZyb20pIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcbiAgfVxuICBpZiAocmF3Q3JlYXRlZERhdGVUbyAmJiAhY3JlYXRlZERhdGVUbykge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xuICB9XG5cbiAgY29uc3QgcHJlZmVycmVkU2VhcmNoS2V5ID0gc2FmZVRleHQocGF5bG9hZD8uc2VhcmNoS2V5IHx8IHBheWxvYWQ/LmZpbHRlcik7XG4gIGNvbnN0IGxlZ2FjeUZpbHRlciA9IHNhZmVUZXh0KHBheWxvYWQ/LmZpbHRlciB8fCBwcmVmZXJyZWRTZWFyY2hLZXkpO1xuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlZERhdGVGcm9tOiBjcmVhdGVkRGF0ZUZyb20gfHwgdW5kZWZpbmVkLFxuICAgIGNyZWF0ZWREYXRlVG86IGNyZWF0ZWREYXRlVG8gfHwgdW5kZWZpbmVkLFxuICAgIHNlYXJjaEtleTogcHJlZmVycmVkU2VhcmNoS2V5IHx8IHVuZGVmaW5lZCxcbiAgICBmaWx0ZXI6IGxlZ2FjeUZpbHRlciB8fCB1bmRlZmluZWQsXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChwYXlsb2FkPy5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCkgfHwgdW5kZWZpbmVkLFxuICAgIGdhc3RvVHlwZTogbm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZShwYXlsb2FkPy5nYXN0b1R5cGUpLFxuICAgIHByb2Nlc3NlZEJ5QUk6IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSShwYXlsb2FkPy5wcm9jZXNzZWRCeUFJKSxcbiAgfTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpc3RGaWx0ZXJQYXlsb2FkID0gPFxuICBUIGV4dGVuZHMge1xuICAgIHBhZ2U/OiBudW1iZXI7XG4gICAgcGFnZVNpemU/OiBudW1iZXI7XG4gICAgY3JlYXRlZERhdGVGcm9tPzogc3RyaW5nO1xuICAgIGNyZWF0ZWREYXRlVG8/OiBzdHJpbmc7XG4gICAgc2VhcmNoS2V5Pzogc3RyaW5nO1xuICAgIGZpbHRlcj86IHN0cmluZztcbiAgICBjdXJyZW5jeUNvZGU/OiBzdHJpbmc7XG4gICAgZ2FzdG9UeXBlPzogdW5rbm93bjtcbiAgICBwcm9jZXNzZWRCeUFJPzogdW5rbm93bjtcbiAgfSxcbj4oXG4gIHBheWxvYWQ6IFRcbikgPT4ge1xuICByZXR1cm4ge1xuICAgIHBhZ2U6IE51bWJlci5pc0Zpbml0ZShwYXlsb2FkPy5wYWdlKSAmJiBOdW1iZXIocGF5bG9hZC5wYWdlKSA+IDAgPyBNYXRoLmZsb29yKE51bWJlcihwYXlsb2FkLnBhZ2UpKSA6IDEsXG4gICAgcGFnZVNpemU6IE51bWJlci5pc0Zpbml0ZShwYXlsb2FkPy5wYWdlU2l6ZSkgJiYgTnVtYmVyKHBheWxvYWQucGFnZVNpemUpID4gMCA/IE1hdGguZmxvb3IoTnVtYmVyKHBheWxvYWQucGFnZVNpemUpKSA6IDUwLFxuICAgIC4uLm5vcm1hbGl6ZVRpY2tldEZpbHRlckNyaXRlcmlhUGF5bG9hZChwYXlsb2FkKSxcbiAgfTtcbn07XG5cbi8vIExvYWRzIHRpY2tldCBsaXN0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saXN0LlxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QgPSBhc3luYyAoXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0LFxuICBvcHRpb25zPzogRXhwZW5zZVRpY2tldExpc3RGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz4+ID0+IHtcbiAgY29uc3QgeyBheFVzZXJJZE92ZXJyaWRlLCAuLi5iYXNlT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KGJhc2VPcHRpb25zKTtcbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0ID0ge1xuICAgIC4uLm5vcm1hbGl6ZVRpY2tldExpc3RGaWx0ZXJQYXlsb2FkKHBheWxvYWQpLFxuICAgIHN0YXR1czogbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRTdGF0dXMocGF5bG9hZD8uc3RhdHVzKSxcbiAgfTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvPj4oXG4gICAgXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGlzdFwiLFxuICAgIHtcbiAgICAgIC4uLmJhc2VPcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkVGlja2V0TGlzdEhlYWRlcnMoY29udGV4dCwgYmFzZU9wdGlvbnMsIGF4VXNlcklkT3ZlcnJpZGUpLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxuICAgIH1cbiAgKTtcblxuICByZXR1cm4gbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gTG9hZHMgbGluay1tb2RlIHRpY2tldCBsaXN0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saW5rL2xpc3QuXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdCA9IGFzeW5jIChcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RSZXF1ZXN0LFxuICBvcHRpb25zPzogRXhwZW5zZVRpY2tldExpc3RGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdEl0ZW1EdG8+PiA9PiB7XG4gIGNvbnN0IHsgYXhVc2VySWRPdmVycmlkZSwgLi4uYmFzZU9wdGlvbnMgfSA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChiYXNlT3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdFJlcXVlc3QgPSB7XG4gICAgLi4ubm9ybWFsaXplVGlja2V0TGlzdEZpbHRlclBheWxvYWQocGF5bG9hZCksXG4gIH07XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdEl0ZW1EdG8+PihcbiAgICBcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saW5rL2xpc3RcIixcbiAgICB7XG4gICAgICAuLi5iYXNlT3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZFRpY2tldExpc3RIZWFkZXJzKGNvbnRleHQsIGJhc2VPcHRpb25zLCBheFVzZXJJZE92ZXJyaWRlKSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBMaW5rcyBzZWxlY3RlZCBvciBmaWx0ZXJlZCB0aWNrZXRzIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saW5rL2J1bGsuXG5leHBvcnQgY29uc3QgbGlua0V4cGVuc2VTaGVldFRpY2tldHNCdWxrID0gYXN5bmMgKFxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1JlcXVlc3QsXG4gIG9wdGlvbnM/OiBFeHBlbnNlVGlja2V0TGlzdEZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0bz4+ID0+IHtcbiAgY29uc3QgeyBheFVzZXJJZE92ZXJyaWRlLCAuLi5iYXNlT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KGJhc2VPcHRpb25zKTtcbiAgY29uc3Qgc2VsZWN0aW9uTW9kZSA9IHBheWxvYWQ/LnNlbGVjdGlvbk1vZGUgPT09IFwiZmlsdGVyZWRcIiA/IFwiZmlsdGVyZWRcIiA6IFwic2VsZWN0ZWRcIjtcbiAgY29uc3QgdGlja2V0SWRzID0gQXJyYXkuaXNBcnJheShwYXlsb2FkPy50aWNrZXRJZHMpXG4gICAgPyBwYXlsb2FkLnRpY2tldElkcy5tYXAoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeSkpLmZpbHRlcihCb29sZWFuKVxuICAgIDogW107XG4gIGNvbnN0IGV4Y2x1ZGVkSWRzID0gQXJyYXkuaXNBcnJheShwYXlsb2FkPy5leGNsdWRlZElkcylcbiAgICA/IHBheWxvYWQuZXhjbHVkZWRJZHMubWFwKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnkpKS5maWx0ZXIoQm9vbGVhbilcbiAgICA6IFtdO1xuXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1JlcXVlc3QgPSB7XG4gICAgZXhwZW5zZVNoZWV0SWQ6IHNhZmVUZXh0KHBheWxvYWQ/LmV4cGVuc2VTaGVldElkKSxcbiAgICBzZWxlY3Rpb25Nb2RlLFxuICAgIHRpY2tldElkczogc2VsZWN0aW9uTW9kZSA9PT0gXCJzZWxlY3RlZFwiID8gdGlja2V0SWRzIDogdW5kZWZpbmVkLFxuICAgIGZpbHRlcnM6XG4gICAgICBzZWxlY3Rpb25Nb2RlID09PSBcImZpbHRlcmVkXCIgJiYgcGF5bG9hZD8uZmlsdGVyc1xuICAgICAgICA/IHtcbiAgICAgICAgICAgIC4uLm5vcm1hbGl6ZVRpY2tldEZpbHRlckNyaXRlcmlhUGF5bG9hZChwYXlsb2FkLmZpbHRlcnMpLFxuICAgICAgICAgIH1cbiAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgZXhjbHVkZWRJZHM6IHNlbGVjdGlvbk1vZGUgPT09IFwiZmlsdGVyZWRcIiA/IGV4Y2x1ZGVkSWRzIDogdW5kZWZpbmVkLFxuICB9O1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvPj4oXG4gICAgXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGluay9idWxrXCIsXG4gICAge1xuICAgICAgLi4uYmFzZU9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczogYnVpbGRUaWNrZXRMaXN0SGVhZGVycyhjb250ZXh0LCBiYXNlT3B0aW9ucywgYXhVc2VySWRPdmVycmlkZSksXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBub3JtYWxpemVUaWNrZXRMaW5rQnVsa1Jlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIExvYWRzIG9uZSB0aWNrZXQgZGV0YWlsIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS5cbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXREZXRhaWxEdG8+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvPj4oXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9YCxcbiAgICB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gRG93bmxvYWRzIG9uZSB0aWNrZXQgaW1hZ2UgcHJldmlldyBibG9iIHRocm91Z2ggdGhlIGludGVybmFsIHByb3h5IGVuZHBvaW50LlxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0UHJldmlld0Jsb2IgPSBhc3luYyAoXG4gIGZpbGVJZDogc3RyaW5nLFxuICB1cmxGaWxlOiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8QmxvYj4gPT4ge1xuICBjb25zdCBzYWZlRmlsZUlkID0gc2FmZVRleHQoZmlsZUlkKTtcbiAgY29uc3Qgc2FmZVVybEZpbGUgPSBzYWZlVGV4dCh1cmxGaWxlKTtcbiAgaWYgKCFzYWZlRmlsZUlkIHx8ICFzYWZlVXJsRmlsZSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiTWlzc2luZyB0aWNrZXQgcHJldmlldyBwYXlsb2FkLlwiKTtcbiAgfVxuXG4gIGNvbnN0IHsgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IF9zdXBwcmVzc1Blcm1pc3Npb25Nb2RhbCwgLi4uZmV0Y2hPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IGNzcmZUb2tlbiA9IGdldENzcmZUb2tlbigpO1xuICBjb25zdCBoZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgZmV0Y2hPcHRpb25zLCB0cnVlKSk7XG4gIGhlYWRlcnMuQWNjZXB0ID0gXCJpbWFnZS8qXCI7XG4gIGNvbnN0IHJlcXVlc3RIZWFkZXJzOiBIZWFkZXJzSW5pdCA9IHtcbiAgICBBY2NlcHQ6IFwiaW1hZ2UvKlwiLFxuICAgIC4uLmhlYWRlcnMsXG4gIH07XG5cbiAgaWYgKGNzcmZUb2tlbikge1xuICAgIChyZXF1ZXN0SGVhZGVycyBhcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KVtcIlJlcXVlc3RWZXJpZmljYXRpb25Ub2tlblwiXSA9IGNzcmZUb2tlbjtcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvcHJldmlld1wiLCB7XG4gICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcbiAgICAuLi5mZXRjaE9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzOiByZXF1ZXN0SGVhZGVycyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBmaWxlSWQ6IHNhZmVGaWxlSWQsXG4gICAgICB1cmxGaWxlOiBzYWZlVXJsRmlsZSxcbiAgICB9KSxcbiAgfSk7XG5cbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIGNvbnN0IHJhdyA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcbiAgICBjb25zdCByZWxvZ2luUmVzdWx0ID0gYXdhaXQgaGFuZGxlQXBpQXV0aEZhaWx1cmU8QmxvYj4ocmF3LCByZXNwb25zZS5zdGF0dXMsIFwidGlja2V0LXByZXZpZXdcIik7XG4gICAgaWYgKHJlbG9naW5SZXN1bHQgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiByZWxvZ2luUmVzdWx0O1xuICAgIH1cbiAgICBjb25zdCBtZXNzYWdlID0gcmVhZEFwaU1lc3NhZ2VGcm9tUmF3KHJhdyk7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IobWVzc2FnZSB8fCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldCBwcmV2aWV3LlwiLCByZXNwb25zZS5zdGF0dXMsIHJhdyk7XG4gIH1cblxuICBjb25zdCBibG9iID0gYXdhaXQgcmVzcG9uc2UuYmxvYigpO1xuICBpZiAoIWJsb2IgfHwgYmxvYi5zaXplID09PSAwKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJDb3VsZCBub3QgbG9hZCB0aWNrZXQgcHJldmlldy5cIik7XG4gIH1cblxuICByZXR1cm4gYmxvYjtcbn07XG5cbi8vIFVwZGF0ZXMgdGlja2V0IGhlYWRlciBtZXRhZGF0YSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0uXG5leHBvcnQgY29uc3QgdXBkYXRlRXhwZW5zZVNoZWV0VGlja2V0ID0gYXN5bmMgKFxuICBmaWxlSWQ6IHN0cmluZyxcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJhd1RyYW5zRGF0ZSA9IHNhZmVUZXh0KHBheWxvYWQ/LnRyYW5zRGF0ZSk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc0RhdGUgPSBub3JtYWxpemVPcHRpb25hbEFwaURhdGUocmF3VHJhbnNEYXRlKTtcblxuICBpZiAocmF3VHJhbnNEYXRlICYmICFub3JtYWxpemVkVHJhbnNEYXRlKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XG4gIH1cblxuICBjb25zdCBzYWZlUGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdCA9IHtcbiAgICAuLi5wYXlsb2FkLFxuICAgIHRyYW5zRGF0ZTogbm9ybWFsaXplZFRyYW5zRGF0ZSB8fCB1bmRlZmluZWQsXG4gICAgZ2FzdG9UeXBlOiBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZShwYXlsb2FkPy5nYXN0b1R5cGUpLFxuICB9O1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH1gLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBEZWxldGVzIG9uZSB0aWNrZXQgb3Igb25lIHRpY2tldCBsaW5lIHZpYSBxdWVyeSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0uXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0ID0gYXN5bmMgKFxuICBmaWxlSWQ6IHN0cmluZyxcbiAgbGluZVJlY0lkPzogbnVtYmVyLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG51bGw+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICBpZiAoTnVtYmVyLmlzSW50ZWdlcihOdW1iZXIobGluZVJlY0lkKSkgJiYgTnVtYmVyKGxpbmVSZWNJZCkgPiAwKSB7XG4gICAgcXVlcnkuc2V0KFwibGluZVJlY0lkXCIsIFN0cmluZyhsaW5lUmVjSWQpKTtcbiAgfVxuXG4gIGNvbnN0IHN1ZmZpeCA9IHF1ZXJ5LnRvU3RyaW5nKCk7XG4gIGNvbnN0IHVybCA9IHN1ZmZpeFxuICAgID8gYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9PyR7c3VmZml4fWBcbiAgICA6IGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfWA7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+Pih1cmwsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxuICB9KTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gQXBwbGllcyBJQSBwYXlsb2FkIG92ZXIgYW4gZXhpc3RpbmcgdGlja2V0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9pYS5cbmV4cG9ydCBjb25zdCBhcHBseUV4cGVuc2VTaGVldFRpY2tldElhID0gYXN5bmMgKFxuICBmaWxlSWQ6IHN0cmluZyxcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3QgcmF3UGF5bG9hZCA9IChwYXlsb2FkIHx8IHt9KSBhcyBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3Q7XG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3QgPSB7XG4gICAgLi4ucmF3UGF5bG9hZCxcbiAgfTtcbiAgY29uc3Qgbm9ybWFsaXplZFRyYW5zRGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdQYXlsb2FkLnRyYW5zRGF0ZSk7XG4gIGlmICghbm9ybWFsaXplZFRyYW5zRGF0ZSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xuICB9XG4gIHNhZmVQYXlsb2FkLnRyYW5zRGF0ZSA9IG5vcm1hbGl6ZWRUcmFuc0RhdGU7XG5cbiAgY29uc3QgZ2FzdG9UeXBlID0gbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUocmF3UGF5bG9hZC5nYXN0b1R5cGUpO1xuICBpZiAoZ2FzdG9UeXBlID09PSB1bmRlZmluZWQpIHtcbiAgICBkZWxldGUgc2FmZVBheWxvYWQuZ2FzdG9UeXBlO1xuICB9IGVsc2Uge1xuICAgIHNhZmVQYXlsb2FkLmdhc3RvVHlwZSA9IGdhc3RvVHlwZTtcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9pYWAsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXG4gIH0pO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBDcmVhdGVzIG9uZSB0aWNrZXQgbGluZSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vbGluZXMuXG5leHBvcnQgY29uc3QgY3JlYXRlRXhwZW5zZVNoZWV0VGlja2V0TGluZSA9IGFzeW5jIChcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmVSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcbiAgaWYgKCFzYWZlVGV4dChwYXlsb2FkPy5kZXNjcmlwdGlvbikgfHwgIWlzUG9zaXRpdmVOdW1iZXIocGF5bG9hZD8ucXR5KSB8fCAhaXNQb3NpdGl2ZU51bWJlcihwYXlsb2FkPy5wcmljZSkpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImRlc2NyaXB0aW9uLCBxdHkgPiAwIGFuZCBwcmljZSA+IDAgYXJlIHJlcXVpcmVkLlwiKTtcbiAgfVxuXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9saW5lc2AsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIFVwZGF0ZXMgb25lIHRpY2tldCBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9saW5lcy97bGluZVJlY0lkfS5cbmV4cG9ydCBjb25zdCB1cGRhdGVFeHBlbnNlU2hlZXRUaWNrZXRMaW5lID0gYXN5bmMgKFxuICBmaWxlSWQ6IHN0cmluZyxcbiAgbGluZVJlY0lkOiBzdHJpbmcgfCBudW1iZXIsXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmVSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcbiAgaWYgKCFzYWZlVGV4dChwYXlsb2FkPy5kZXNjcmlwdGlvbikgfHwgIWlzUG9zaXRpdmVOdW1iZXIocGF5bG9hZD8ucXR5KSB8fCAhaXNQb3NpdGl2ZU51bWJlcihwYXlsb2FkPy5wcmljZSkpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImRlc2NyaXB0aW9uLCBxdHkgPiAwIGFuZCBwcmljZSA+IDAgYXJlIHJlcXVpcmVkLlwiKTtcbiAgfVxuXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHNhZmVMaW5lSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGxpbmVSZWNJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vbGluZXMvJHtzYWZlTGluZUlkfWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIERlbGV0ZXMgb25lIHRpY2tldCBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9saW5lcy97bGluZVJlY0lkfS5cbmV4cG9ydCBjb25zdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRMaW5lID0gYXN5bmMgKFxuICBmaWxlSWQ6IHN0cmluZyxcbiAgbGluZVJlY0lkOiBzdHJpbmcgfCBudW1iZXIsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3Qgc2FmZUxpbmVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcobGluZVJlY0lkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+PihcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vbGluZXMvJHtzYWZlTGluZUlkfWAsXG4gICAge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gICAgfVxuICApO1xuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG4vLyBVcGxvYWRzL3JlcGxhY2VzIHRpY2tldCBmaWxlIGNvbnRlbnQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9L2ZpbGUuXG5leHBvcnQgY29uc3QgdXBsb2FkRXhwZW5zZVNoZWV0VGlja2V0RmlsZSA9IGFzeW5jIChcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIGZpbGU6IEZpbGUgfCBCbG9iLFxuICBleHRlbnNpb24/OiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCBzYWZlRXh0ZW5zaW9uID0gc2FmZVRleHQoZXh0ZW5zaW9uKS5yZXBsYWNlKC9eXFwuLywgXCJcIik7XG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xuICBpZiAoc2FmZUV4dGVuc2lvbikge1xuICAgIHF1ZXJ5LnNldChcImV4dGVuc2lvblwiLCBzYWZlRXh0ZW5zaW9uKTtcbiAgfVxuXG4gIGNvbnN0IHN1ZmZpeCA9IHF1ZXJ5LnRvU3RyaW5nKCk7XG4gIGNvbnN0IHVybCA9IHN1ZmZpeFxuICAgID8gYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2ZpbGU/JHtzdWZmaXh9YFxuICAgIDogYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2ZpbGVgO1xuICBjb25zdCBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XG4gIGlmIChmaWxlIGluc3RhbmNlb2YgRmlsZSkge1xuICAgIGZvcm0uYXBwZW5kKFwiZmlsZVwiLCBmaWxlLCBzYWZlVGV4dChmaWxlLm5hbWUpIHx8IGB0aWNrZXQuJHtzYWZlRXh0ZW5zaW9uIHx8IFwianBnXCJ9YCk7XG4gIH0gZWxzZSB7XG4gICAgZm9ybS5hcHBlbmQoXCJmaWxlXCIsIGZpbGUsIGB0aWNrZXQuJHtzYWZlRXh0ZW5zaW9uIHx8IFwianBnXCJ9YCk7XG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+Pih1cmwsIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlRm9ybUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXG4gICAgYm9keTogZm9ybSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIERlbGV0ZXMgdGlja2V0IGZpbGUgY29udGVudCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vZmlsZS5cbmV4cG9ydCBjb25zdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRGaWxlID0gYXN5bmMgKFxuICBmaWxlSWQ6IHN0cmluZyxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxudWxsPj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxudWxsPj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2ZpbGVgLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiREVMRVRFXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcbiAgfSk7XG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIFNlYXJjaGVzIHByb2plY3RzIGZvciBkcm9wZG93biB1c2FnZSBpbiBmaWx0ZXJzIGFuZCBlZGl0IGZvcm1zLlxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVByb2plY3RzID0gYXN5bmMgKFxuICB0ZXJtOiBzdHJpbmcsXG4gIHBhZ2U6IG51bWJlcixcbiAgcGFnZVNpemU6IG51bWJlcixcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxQcm9qZWN0RHJvcGRvd25SZXNwb25zZT4gPT4ge1xuICBjb25zdCBzYWZlVGVybSA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcodGVybSB8fCBcIlwiKSk7XG4gIGNvbnN0IHNhZmVQYWdlID0gTnVtYmVyLmlzRmluaXRlKHBhZ2UpICYmIHBhZ2UgPiAwID8gTWF0aC5mbG9vcihwYWdlKSA6IDE7XG4gIGNvbnN0IHNhZmVQYWdlU2l6ZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlU2l6ZSkgJiYgcGFnZVNpemUgPiAwID8gTWF0aC5mbG9vcihwYWdlU2l6ZSkgOiAyMDtcblxuICByZXR1cm4gZmV0Y2hKc29uPFByb2plY3REcm9wZG93blJlc3BvbnNlPihcbiAgICBgL0dhc3Rvcy9HZXRQcm9qZWN0c0ZvckRyb3Bkb3duP3Rlcm09JHtzYWZlVGVybX0mcGFnZT0ke3NhZmVQYWdlfSZwYWdlU2l6ZT0ke3NhZmVQYWdlU2l6ZX1gLFxuICAgIHtcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgfVxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCTyxJQUFNLDZCQUE2QixDQUN4QyxhQUM4QztBQUM5QyxTQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxPQUFPLE1BQU0sUUFBUSxVQUFVLEtBQUssSUFBSSxTQUFTLFFBQVEsQ0FBQztBQUFBLEVBQzVEO0FBQ0Y7QUFFTyxJQUFNLCtCQUErQixDQUMxQyxhQUM0QztBQUM1QyxTQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxPQUFPLE1BQU0sUUFBUSxVQUFVLEtBQUssSUFBSSxTQUFTLFFBQVEsQ0FBQztBQUFBLEVBQzVEO0FBQ0Y7QUFFTyxJQUFNLHVCQUF1QixDQUFJLGFBQW1EO0FBQ3pGLFNBQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUNILFFBQVEsTUFBTSxRQUFRLFVBQVUsTUFBTSxJQUFJLFNBQVMsU0FBUyxVQUFVLFVBQVU7QUFBQSxFQUNsRjtBQUNGO0FBRU8sSUFBTSxxQ0FBcUMsQ0FDaEQsYUFDd0M7QUFDeEMsUUFBTSxhQUFhLHFCQUFxQixRQUFRO0FBQ2hELFFBQU0sVUFBVSxZQUFZO0FBQzVCLE1BQUksQ0FBQyxXQUFXLE9BQU8sWUFBWSxVQUFVO0FBQzNDLFdBQU87QUFBQSxNQUNMLEdBQUc7QUFBQSxNQUNILFlBQVksT0FBTyxVQUFVLGVBQWUsV0FBVyxTQUFTLGFBQWE7QUFBQSxNQUM3RSxZQUFZLFNBQVMsVUFBVSxVQUFVLEtBQUs7QUFBQSxJQUNoRDtBQUFBLEVBQ0Y7QUFFQSxRQUFNLGtCQUNILFFBQStELGdCQUMvRCxRQUF1QztBQUMxQyxRQUFNLGVBQWUsbUJBQW1CLE9BQU8sb0JBQW9CLFdBQVcsa0JBQWtCO0FBRWhHLFNBQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUNILFlBQVksT0FBTyxVQUFVLGVBQWUsV0FBVyxTQUFTLGFBQWE7QUFBQSxJQUM3RSxZQUFZLFNBQVMsVUFBVSxVQUFVLEtBQUs7QUFBQSxJQUM5QyxNQUFNO0FBQUEsTUFDSixRQUFRLFNBQVUsUUFBbUQsVUFBVyxRQUFpQyxNQUFNO0FBQUEsTUFDdkgsU0FBUztBQUFBLFFBQ04sUUFBcUQsV0FBWSxRQUFrQztBQUFBLE1BQ3RHO0FBQUEsTUFDQSxVQUFVO0FBQUEsUUFDUCxRQUF1RCxZQUNyRCxRQUFtQztBQUFBLE1BQ3hDO0FBQUEsTUFDQSxlQUFlO0FBQUEsUUFDWixRQUFpRSxpQkFDL0QsUUFBd0M7QUFBQSxNQUM3QztBQUFBLE1BQ0EsZUFDRTtBQUFBLFFBQ0csUUFBaUUsaUJBQy9ELFFBQXdDO0FBQUEsTUFDN0MsTUFBTTtBQUFBLE1BQ1IsY0FDRTtBQUFBLFFBQ0csUUFBK0QsZ0JBQzdELFFBQXVDO0FBQUEsTUFDNUMsS0FBSztBQUFBLE1BQ1AsZ0JBQWdCO0FBQUEsUUFDYixRQUFtRSxrQkFDakUsUUFBeUM7QUFBQSxNQUM5QztBQUFBLE1BQ0EsY0FBYyxlQUNWO0FBQUEsUUFDRSxjQUFjO0FBQUEsVUFDWCxhQUFvRSxnQkFDbEUsYUFBNEM7QUFBQSxRQUNqRDtBQUFBLFFBQ0EsWUFBWTtBQUFBLFVBQ1QsYUFBZ0UsY0FDOUQsYUFBMEM7QUFBQSxRQUMvQztBQUFBLFFBQ0EsY0FBYztBQUFBLFVBQ1gsYUFBb0UsZ0JBQ2xFLGFBQTRDO0FBQUEsUUFDakQ7QUFBQSxRQUNBLGdCQUFnQjtBQUFBLFVBQ2IsYUFBd0Usa0JBQ3RFLGFBQThDO0FBQUEsUUFDbkQ7QUFBQSxRQUNBLFdBQVc7QUFBQSxVQUNSLGFBQThELGFBQzVELGFBQXlDO0FBQUEsUUFDOUM7QUFBQSxNQUNGLElBQ0E7QUFBQSxJQUNOO0FBQUEsRUFDRjtBQUNGO0FBRU8sSUFBTSxpQ0FBaUMsQ0FDNUMsYUFDOEM7QUFDOUMsU0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBQ0gsT0FBTyxNQUFNLFFBQVEsVUFBVSxLQUFLLElBQUksU0FBUyxRQUFRLENBQUM7QUFBQSxFQUM1RDtBQUNGO0FBRU8sSUFBTSxxQ0FBcUMsQ0FDaEQsYUFDaUQ7QUFDakQsUUFBTSxrQkFBa0Isa0NBQWtDLFVBQVUsS0FBSztBQUV6RSxTQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxPQUFPO0FBQUEsRUFDVDtBQUNGO0FBRU8sSUFBTSxtQ0FBbUMsQ0FDOUMsYUFDb0Q7QUFDcEQsUUFBTSxRQUFRLE1BQU0sUUFBUSxVQUFVLEtBQUssSUFBSSxTQUFTLFFBQVEsQ0FBQztBQUNqRSxRQUFNLGtCQUFrQixNQUFNLElBQUksQ0FBQyxVQUFVO0FBQUEsSUFDM0MsR0FBRztBQUFBLElBQ0gsUUFBUTtBQUFBLE1BQ0wsTUFBaUQsVUFDL0MsTUFBaUQ7QUFBQSxJQUN0RDtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ1osTUFBK0QsaUJBQzdELE1BQStEO0FBQUEsSUFDcEU7QUFBQSxJQUNBLFdBQVc7QUFBQSxNQUNSLE1BQXVELGFBQ3JELE1BQXVEO0FBQUEsSUFDNUQ7QUFBQSxFQUNGLEVBQUU7QUFFRixTQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxPQUFPO0FBQUEsRUFDVDtBQUNGO0FBRU8sSUFBTSx1Q0FBdUMsQ0FDbEQsYUFDd0Q7QUFDeEQsUUFBTSxRQUFRLE1BQU0sUUFBUSxVQUFVLEtBQUssSUFBSSxTQUFTLFFBQVEsQ0FBQztBQUNqRSxRQUFNLGtCQUFrQixNQUFNLElBQUksQ0FBQyxVQUFVO0FBQUEsSUFDM0MsR0FBRztBQUFBLElBQ0gsZUFBZTtBQUFBLE1BQ1osTUFBK0QsaUJBQzdELE1BQStEO0FBQUEsSUFDcEU7QUFBQSxJQUNBLFdBQVc7QUFBQSxNQUNSLE1BQXVELGFBQ3JELE1BQXVEO0FBQUEsSUFDNUQ7QUFBQSxFQUNGLEVBQUU7QUFFRixTQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxPQUFPO0FBQUEsRUFDVDtBQUNGO0FBRU8sSUFBTSxxQ0FBcUMsQ0FDaEQsYUFDa0Q7QUFDbEQsUUFBTSxRQUFRLE1BQU0sUUFBUSxVQUFVLEtBQUssSUFBSSxTQUFTLFFBQVEsQ0FBQztBQUNqRSxRQUFNLGtCQUFrQixNQUFNLElBQUksQ0FBQyxVQUFVO0FBQUEsSUFDM0MsR0FBRztBQUFBLElBQ0gsUUFBUTtBQUFBLE1BQ0wsTUFBaUQsVUFDL0MsTUFBaUQ7QUFBQSxJQUN0RDtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ1osTUFBK0QsaUJBQzdELE1BQStEO0FBQUEsSUFDcEU7QUFBQSxJQUNBLHFCQUFxQjtBQUFBLE1BQ2xCLE1BQTJFLHVCQUN6RSxNQUEyRTtBQUFBLElBQ2hGO0FBQUEsSUFDQSxXQUFXO0FBQUEsTUFDUixNQUF1RCxhQUNyRCxNQUF1RDtBQUFBLElBQzVEO0FBQUEsSUFDQSxPQUFPLE1BQU0sUUFBUSxNQUFNLEtBQUssSUFBSSxLQUFLLFFBQVEsQ0FBQztBQUFBLEVBQ3BELEVBQUU7QUFFRixTQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxPQUFPO0FBQUEsRUFDVDtBQUNGO0FBRU8sSUFBTSxrQ0FBa0MsQ0FDN0MsYUFDd0Q7QUFDeEQsUUFBTSxhQUFhLHFCQUFxQixRQUFRO0FBQ2hELFFBQU0sVUFBVSxZQUFZO0FBQzVCLE1BQUksQ0FBQyxXQUFXLE9BQU8sWUFBWSxVQUFVO0FBQzNDLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxjQUFjLENBQUMsVUFBbUI7QUFDdEMsUUFBSSxDQUFDLE1BQU0sUUFBUSxLQUFLLEVBQUcsUUFBTyxDQUFDO0FBRW5DLFdBQU8sTUFBTSxJQUFJLENBQUMsV0FBVztBQUFBLE1BQzNCLFVBQVU7QUFBQSxRQUNQLE9BQXNELFlBQ3BELE1BQWlDO0FBQUEsTUFDdEM7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNMLE9BQWtELFVBQ2hELE1BQStCO0FBQUEsTUFDcEM7QUFBQSxJQUNGLEVBQUU7QUFBQSxFQUNKO0FBRUEsUUFBTSxxQkFDSCxRQUFxRSxtQkFDckUsUUFBMEM7QUFFN0MsU0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBQ0gsTUFBTTtBQUFBLE1BQ0osZ0JBQWdCO0FBQUEsUUFDYixRQUFtRSxrQkFDakUsUUFBeUM7QUFBQSxNQUM5QztBQUFBLE1BQ0EsZ0JBQWdCO0FBQUEsUUFDYixRQUFtRSxrQkFDakUsUUFBeUM7QUFBQSxNQUM5QyxLQUFLO0FBQUEsTUFDTCxhQUFhO0FBQUEsUUFDVixRQUE2RCxlQUMzRCxRQUFzQztBQUFBLE1BQzNDLEtBQUs7QUFBQSxNQUNMLGNBQWM7QUFBQSxRQUNYLFFBQStELGdCQUM3RCxRQUF1QztBQUFBLE1BQzVDLEtBQUs7QUFBQSxNQUNMLGFBQWE7QUFBQSxRQUNWLFFBQTZELGVBQzNELFFBQXNDO0FBQUEsTUFDM0MsS0FBSztBQUFBLE1BQ0wsaUJBQWlCLE1BQU0sUUFBUSxrQkFBa0IsSUFDN0MsbUJBQW1CLElBQUksQ0FBQyxVQUFVLFNBQVMsS0FBSyxDQUFDLEVBQUUsT0FBTyxPQUFPLElBQ2pFLENBQUM7QUFBQSxNQUNMLFNBQVM7QUFBQSxRQUNOLFFBQXFELFdBQ25ELFFBQWtDO0FBQUEsTUFDdkM7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNMLFFBQW1ELFVBQ2pELFFBQWlDO0FBQUEsTUFDdEM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOzs7QUMxUUEsSUFBTSwyQkFBMkIsTUFBNEI7QUFDM0QsTUFBSSxPQUFPLFdBQVcsWUFBYSxRQUFPLENBQUM7QUFDM0MsU0FBTztBQUNUO0FBRUEsSUFBTSxtQkFBbUIsQ0FBQyxrQkFBa0M7QUFDMUQsTUFBSSxDQUFDLGlCQUFpQixPQUFPLFdBQVcsYUFBYTtBQUNuRCxXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sbUJBQW1CLHlCQUF5QixFQUFFO0FBQ3BELFFBQU0sYUFBYSxNQUFNLFFBQVEsZ0JBQWdCLElBQUksbUJBQW1CLENBQUM7QUFDekUsUUFBTSxRQUFRLFdBQVcsS0FBSyxDQUFDLFVBQWlDO0FBQzlELFVBQU0sWUFBWSxTQUFTLE9BQU8sU0FBUyxPQUFPLEtBQUs7QUFDdkQsV0FBTyxjQUFjO0FBQUEsRUFDdkIsQ0FBQztBQUVELFNBQU8sU0FBUyxPQUFPLFFBQVEsT0FBTyxJQUFJLEtBQUs7QUFDakQ7QUFHTyxJQUFNLGdDQUFnQyxDQUFDLFNBQW9EO0FBQ2hHLFNBQU87QUFBQSxJQUNMLGNBQWMsU0FBUyxLQUFLLFlBQVk7QUFBQSxJQUN4QyxhQUFhLFNBQVMsS0FBSyxXQUFXO0FBQUEsSUFDdEMsb0JBQW9CLGlCQUFpQixLQUFLLGtCQUFrQjtBQUFBLElBQzVELG1CQUFtQixTQUFTLEtBQUssaUJBQWlCLEtBQUs7QUFBQSxJQUN2RCxRQUFRLFNBQVMsS0FBSyxNQUFNO0FBQUEsSUFDNUIsVUFBVSxTQUFTLEtBQUssUUFBUSxLQUFLO0FBQUEsSUFDckMsU0FBUyxTQUFTLEtBQUssT0FBTztBQUFBLElBQzlCLFFBQVEsU0FBUyxLQUFLLE1BQU07QUFBQSxJQUM1QixjQUFjLFNBQVMsS0FBSyxZQUFZO0FBQUEsSUFDeEMsYUFBYSxpQkFBaUIsS0FBSyxXQUFXO0FBQUEsSUFDOUMsVUFBVSxpQkFBaUIsS0FBSyxRQUFRO0FBQUEsSUFDeEMsa0JBQWtCLGlCQUFpQixLQUFLLGdCQUFnQjtBQUFBLElBQ3hELGFBQWEsU0FBUyxLQUFLLFdBQVc7QUFBQSxFQUN4QztBQUNGO0FBR08sSUFBTSx3QkFBd0IsQ0FBQyxVQUFxRDtBQUN6RixTQUFPO0FBQUEsSUFDTCxjQUFjLFNBQVMsTUFBTSxZQUFZO0FBQUEsSUFDekMsYUFBYSxTQUFTLE1BQU0sV0FBVztBQUFBLElBQ3ZDLFFBQVEsU0FBUyxNQUFNLE1BQU07QUFBQSxJQUM3QixvQkFBb0IsaUJBQWlCLE1BQU0sa0JBQWtCO0FBQUEsSUFDN0QsbUJBQW1CLFNBQVMsTUFBTSxpQkFBaUIsS0FBSztBQUFBLElBQ3hELGNBQWMsU0FBUyxNQUFNLFlBQVk7QUFBQSxJQUN6QyxhQUFhLGlCQUFpQixNQUFNLFdBQVc7QUFBQSxJQUMvQyxVQUFVLFNBQVMsTUFBTSxRQUFRO0FBQUEsSUFDakMsa0JBQWtCLGlCQUFpQixNQUFNLGdCQUFnQjtBQUFBLElBQ3pELFFBQVEsU0FBUyxNQUFNLE1BQU07QUFBQSxJQUM3QixTQUFTLFNBQVMsTUFBTSxPQUFPO0FBQUEsSUFDL0IsYUFBYSxTQUFTLE1BQU0sV0FBVztBQUFBLEVBQ3pDO0FBQ0Y7QUFHTyxJQUFNLHNCQUFzQixDQUFDLFNBQWdEO0FBQ2xGLFFBQU0sZ0JBQWdCLFNBQVMsS0FBSyxTQUFTO0FBQzdDLFFBQU0sY0FBZSxLQUE2QjtBQUNsRCxRQUFNLGVBQWdCLEtBQThCO0FBRXBELFNBQU87QUFBQSxJQUNMLFdBQVcsU0FBUyxLQUFLLEtBQUs7QUFBQSxJQUM5QixXQUFXLFNBQVMsS0FBSyxTQUFTO0FBQUEsSUFDbEM7QUFBQSxJQUNBLFdBQVcsaUJBQWlCLGFBQWE7QUFBQSxJQUN6QyxhQUFhLFNBQVMsS0FBSyxXQUFXO0FBQUEsSUFDdEMsZUFBZSxlQUFlLEtBQUssYUFBYTtBQUFBLElBQ2hELFFBQVEsU0FBUyxLQUFLLFVBQVUsWUFBWTtBQUFBLElBQzVDLFFBQVEsZUFBZSxLQUFLLE1BQU07QUFBQSxJQUNsQyxPQUFPLGlCQUFpQixLQUFLLFNBQVMsV0FBVztBQUFBLElBQ2pELEtBQUssaUJBQWlCLEtBQUssR0FBRztBQUFBLElBQzlCLFFBQVEsaUJBQWlCLEtBQUssTUFBTTtBQUFBLElBQ3BDLFFBQVEsU0FBUyxLQUFLLE1BQU07QUFBQSxJQUM1QixnQkFBZ0IsU0FBUyxLQUFLLGNBQWM7QUFBQSxFQUM5QztBQUNGOzs7QUM5RkEsSUFBTSxxQkFBcUIsQ0FBQyxVQUEyQixPQUFPLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxZQUFZO0FBRTlGLElBQU0sbUJBQW1CLENBQ3ZCLFlBQ0EsdUJBQ3FDO0FBQ3JDLE1BQUksQ0FBQyxtQkFBb0IsUUFBTztBQUVoQyxhQUFXLGFBQWEsWUFBWTtBQUNsQyxRQUFJLG1CQUFtQixVQUFVLFNBQVMsTUFBTSxvQkFBb0I7QUFDbEUsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUNUO0FBR08sSUFBTSw0QkFBNEIsQ0FDdkMsbUJBQ0EsV0FDQSxxQkFDVztBQUNYLFFBQU0sOEJBQThCLG1CQUFtQixpQkFBaUI7QUFDeEUsUUFBTSw2QkFBNkIsbUJBQW1CLGdCQUFnQjtBQUN0RSxRQUFNLHNCQUFzQixNQUFNLFFBQVEsU0FBUyxJQUMvQyxVQUFVLE9BQU8sQ0FBQyxjQUFjLG1CQUFtQixVQUFVLFNBQVMsQ0FBQyxJQUN2RSxDQUFDO0FBRUwsUUFBTSxnQkFBZ0IsaUJBQWlCLHFCQUFxQiwyQkFBMkI7QUFDdkYsTUFBSSxlQUFlO0FBQ2pCLFdBQU8sY0FBYztBQUFBLEVBQ3ZCO0FBRUEsUUFBTSxlQUNKLGlCQUFpQixxQkFBcUIsMEJBQTBCLEtBQ2hFLG9CQUFvQixLQUFLLENBQUMsY0FBYyxVQUFVLGNBQWMsSUFBSSxLQUNwRSxvQkFBb0IsQ0FBQyxLQUNyQjtBQUVGLFNBQU8sY0FBYyxhQUFhO0FBQ3BDOzs7QUNzR0EsSUFBTSxtQkFBbUI7QUFDekIsSUFBTSxlQUF1QztBQUFBLEVBQzNDLGdCQUFnQjtBQUNsQjtBQUVBLElBQUksa0JBQStDLENBQUM7QUFDcEQsSUFBSSxnQkFBMEM7QUFDOUMsSUFBSSxtQkFBbUI7QUFDdkIsSUFBSSxpQkFBb0Q7QUFDeEQsSUFBTSwwQkFBMEIsb0JBQUksSUFBdUQ7QUFDM0YsSUFBTSwwQkFBMEIsb0JBQUksSUFBZ0U7QUFFcEcsSUFBTUEsWUFBVztBQUVqQixJQUFNQyxvQkFBbUI7QUFDekIsSUFBTUMsdUJBQXNCO0FBQzVCLElBQU1DLG9CQUFtQjtBQUd6QixJQUFNQyxvQ0FBbUM7QUFDekMsSUFBTUMsZ0NBQStCO0FBQ3JDLElBQU1DLGlDQUFnQztBQUN0QyxJQUFNQyw0QkFBMkI7QUFDakMsSUFBTUMsNEJBQTJCO0FBQ2pDLElBQU1DLDJCQUEwQjtBQUVoQyxJQUFNQyx3Q0FBdUM7QUFDN0MsSUFBTUMseUNBQXdDO0FBQzlDLElBQU1DLGNBQWE7QUFFbkIsSUFBTUMsNEJBQTJCLE1BQTRCO0FBQzNELE1BQUksT0FBTyxXQUFXLFlBQWEsUUFBTyxDQUFDO0FBQzNDLFNBQU87QUFDVDtBQUVBLElBQU0sa0JBQWtCLENBQUMsWUFBNkQ7QUFDcEYsTUFBSSxDQUFDLFFBQVMsUUFBTyxDQUFDO0FBRXRCLE1BQUksbUJBQW1CLFNBQVM7QUFDOUIsVUFBTSxTQUFpQyxDQUFDO0FBQ3hDLFlBQVEsUUFBUSxDQUFDLE9BQU8sUUFBUTtBQUM5QixhQUFPLEdBQUcsSUFBSTtBQUFBLElBQ2hCLENBQUM7QUFDRCxXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUksTUFBTSxRQUFRLE9BQU8sR0FBRztBQUMxQixXQUFPLFFBQVEsT0FBK0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLE1BQU07QUFDbkUsVUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLE9BQU8sS0FBSztBQUMvQixhQUFPO0FBQUEsSUFDVCxHQUFHLENBQUMsQ0FBQztBQUFBLEVBQ1A7QUFFQSxTQUFPLE9BQU8sUUFBUSxPQUFPLEVBQUUsT0FBK0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLE1BQU07QUFDbkYsUUFBSSxVQUFVLFVBQWEsVUFBVSxLQUFNLFFBQU87QUFDbEQsUUFBSSxHQUFHLElBQUksT0FBTyxLQUFLO0FBQ3ZCLFdBQU87QUFBQSxFQUNULEdBQUcsQ0FBQyxDQUFDO0FBQ1A7QUFFQSxJQUFNLGlCQUFpQixDQUFDLFNBQWtDLFFBQXdCO0FBQ2hGLFFBQU0sZ0JBQWdCLElBQUksS0FBSyxFQUFFLFlBQVk7QUFDN0MsUUFBTSxVQUFVLE9BQU8sUUFBUSxnQkFBZ0IsT0FBTyxDQUFDO0FBQ3ZELFFBQU0sUUFBUSxRQUFRLEtBQUssQ0FBQyxDQUFDLFNBQVMsTUFBTSxVQUFVLEtBQUssRUFBRSxZQUFZLE1BQU0sYUFBYTtBQUM1RixTQUFPQyxVQUFTLFFBQVEsQ0FBQyxDQUFDO0FBQzVCO0FBRUEsSUFBTSxvQkFBb0IsQ0FBQyxTQUFpQyxRQUFzQjtBQUNoRixRQUFNLGdCQUFnQixJQUFJLEtBQUssRUFBRSxZQUFZO0FBQzdDLFFBQU0sV0FBVyxPQUFPLEtBQUssT0FBTyxFQUFFLEtBQUssQ0FBQyxjQUFjLFVBQVUsS0FBSyxFQUFFLFlBQVksTUFBTSxhQUFhO0FBQzFHLE1BQUksQ0FBQyxTQUFVO0FBQ2YsU0FBTyxRQUFRLFFBQVE7QUFDekI7QUFFQSxJQUFNLDBCQUEwQixDQUFDLFVBQTJCO0FBQzFELFFBQU0sYUFBYUEsVUFBUyxLQUFLO0FBQ2pDLE1BQUksQ0FBQyxXQUFZLFFBQU87QUFDeEIsUUFBTSxhQUFhLFdBQVcsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUMxQyxTQUFPQSxVQUFTLFVBQVU7QUFDNUI7QUFFQSxJQUFNLHFCQUFxQixDQUFDLFlBQTZDO0FBQ3ZFLFFBQU0sZ0JBQWdCLGVBQWUsU0FBUyxlQUFlO0FBQzdELE1BQUksQ0FBQyxjQUFlLFFBQU87QUFFM0IsTUFBSSxjQUFjLEtBQUssYUFBYSxHQUFHO0FBQ3JDLFdBQU8sY0FBYyxRQUFRLGVBQWUsRUFBRSxFQUFFLEtBQUs7QUFBQSxFQUN2RDtBQUVBLFNBQU8sY0FBYyxLQUFLO0FBQzVCO0FBRUEsSUFBTSxxQkFBcUIsTUFBbUM7QUFDNUQsUUFBTSxnQkFBZ0JELDBCQUF5QjtBQUUvQyxTQUFPO0FBQUEsSUFDTCxPQUFPQyxVQUFTLGNBQWMsaUJBQWlCO0FBQUEsSUFDL0MsVUFBVUEsVUFBUyxjQUFjLGlCQUFpQjtBQUFBLElBQ2xELFNBQVNBLFVBQVMsY0FBYyxnQkFBZ0I7QUFBQSxJQUNoRCxpQkFBaUJGLFlBQVcsY0FBYywwQkFBMEIsTUFBTTtBQUFBLEVBQzVFO0FBQ0Y7QUFFQSxJQUFNLGVBQWUsQ0FBQyxRQUFnQztBQUNwRCxNQUFJLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxFQUFHLFFBQU87QUFDaEMsTUFBSTtBQUNGLFdBQU8sS0FBSyxNQUFNLEdBQUc7QUFBQSxFQUN2QixRQUFRO0FBQ04sV0FBTztBQUFBLEVBQ1Q7QUFDRjtBQUVBLElBQU0sMkJBQTJCLE1BQWU7QUFDOUMsTUFBSSxPQUFPLFdBQVcsWUFBYSxRQUFPO0FBQzFDLFFBQU0sZ0JBQWdCQywwQkFBeUI7QUFFL0MsUUFBTSxxQkFBcUJELFlBQVcsY0FBYywwQkFBMEI7QUFDOUUsU0FBTyx1QkFBdUI7QUFDaEM7QUFFQSxJQUFNLDRCQUE0QixNQUFjO0FBQzlDLFNBQU9FLFVBQVNELDBCQUF5QixFQUFFLHdCQUF3QixFQUFFLFlBQVk7QUFDbkY7QUFHQSxJQUFNLDBCQUEwQixNQUFvQjtBQUNsRCxTQUFPLElBQUksYUFBYSxXQUFXLFlBQVk7QUFDakQ7QUFHQSxJQUFNLGdDQUFnQyxPQUFVLFNBQXFCLFdBQXFDO0FBQ3hHLE1BQUksQ0FBQyxPQUFRLFFBQU87QUFDcEIsTUFBSSxPQUFPLFNBQVM7QUFDbEIsVUFBTSx3QkFBd0I7QUFBQSxFQUNoQztBQUVBLFNBQU8sTUFBTSxJQUFJLFFBQVcsQ0FBQyxTQUFTLFdBQVc7QUFDL0MsVUFBTSxjQUFjLE1BQU07QUFDeEIsYUFBTyxvQkFBb0IsU0FBUyxXQUFXO0FBQy9DLGFBQU8sd0JBQXdCLENBQUM7QUFBQSxJQUNsQztBQUVBLFdBQU8saUJBQWlCLFNBQVMsYUFBYSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBQzVELFlBQVE7QUFBQSxNQUNOLENBQUMsVUFBVTtBQUNULGVBQU8sb0JBQW9CLFNBQVMsV0FBVztBQUMvQyxnQkFBUSxLQUFLO0FBQUEsTUFDZjtBQUFBLE1BQ0EsQ0FBQyxVQUFVO0FBQ1QsZUFBTyxvQkFBb0IsU0FBUyxXQUFXO0FBQy9DLGVBQU8sS0FBSztBQUFBLE1BQ2Q7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDO0FBQ0g7QUFFQSxJQUFNLGtCQUFrQixDQUFDLFNBQXFDO0FBQzVELFNBQU8sR0FBRyxLQUFLLEtBQUssSUFBSSxLQUFLLFFBQVEsSUFBSSxLQUFLLE9BQU8sSUFBSSwwQkFBMEIsQ0FBQztBQUN0RjtBQUVBLElBQU0sc0JBQXNCLENBQzFCLFNBQ0EsU0FDQSxjQUFjLE9BQ2Qsa0JBQWtCLFNBQ0Y7QUFDaEIsUUFBTSxPQUFPLGdCQUFnQixTQUFTLE9BQU87QUFDN0MsUUFBTSxTQUFpQyxFQUFFLEdBQUcsS0FBSztBQUVqRCxNQUFJQyxVQUFTLFFBQVEsS0FBSyxHQUFHO0FBQzNCLFdBQU8sZ0JBQWdCLFVBQVUsUUFBUSxLQUFLO0FBQUEsRUFDaEQ7QUFFQSxNQUFJQSxVQUFTLFFBQVEsU0FBUyxHQUFHO0FBQy9CLFdBQU8sZUFBZSxJQUFJLFFBQVE7QUFBQSxFQUNwQztBQUVBLE1BQUksaUJBQWlCO0FBQ25CLFVBQU0sa0JBQWtCLGVBQWUsU0FBUyxTQUFTLGdCQUFnQjtBQUN6RSxVQUFNLG1CQUFtQiw2QkFBNkI7QUFDdEQsVUFBTSxtQkFBbUJBLFVBQVMsbUJBQW1CLG9CQUFvQixRQUFRLFFBQVE7QUFDekYsUUFBSSxrQkFBa0I7QUFDcEIsYUFBTyxnQkFBZ0IsSUFBSTtBQUFBLElBQzdCLE9BQU87QUFDTCx3QkFBa0IsUUFBUSxnQkFBZ0I7QUFBQSxJQUM1QztBQUFBLEVBQ0YsT0FBTztBQUNMLHNCQUFrQixRQUFRLGdCQUFnQjtBQUFBLEVBQzVDO0FBRUEsTUFBSSxhQUFhO0FBQ2YsV0FBTyxjQUFjLElBQUk7QUFBQSxFQUMzQjtBQUVBLFNBQU87QUFDVDtBQUVBLElBQU0sMEJBQTBCLENBQUMsU0FBNEIsWUFBMkM7QUFDdEcsUUFBTSxVQUFVLGdCQUFnQixvQkFBb0IsU0FBUyxTQUFTLEtBQUssQ0FBQztBQUM1RSxvQkFBa0IsU0FBUyxjQUFjO0FBQ3pDLFNBQU87QUFDVDtBQUVBLElBQU0sc0JBQXNCLENBQUMsT0FBZSxZQUEyQztBQUNyRixRQUFNLE9BQU8sZ0JBQWdCLFNBQVMsT0FBTztBQUM3QyxRQUFNLFNBQWlDO0FBQUEsSUFDckMsR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLEVBQ0w7QUFFQSxNQUFJQSxVQUFTLEtBQUssR0FBRztBQUNuQixXQUFPLGdCQUFnQixVQUFVLEtBQUs7QUFBQSxFQUN4QztBQUVBLFNBQU87QUFDVDtBQUVBLElBQU0sbUJBQW1CLENBQUMsWUFBc0M7QUFDOUQsUUFBTSxtQkFBbUIsbUJBQW1CLFNBQVMsT0FBTztBQUM1RCxRQUFNLGFBQWEsbUJBQW1CO0FBQ3RDLFNBQU9BLFVBQVMsb0JBQW9CLGdCQUFnQixTQUFTLFdBQVcsS0FBSztBQUMvRTtBQUVBLElBQU0sa0JBQWtCLENBQUMsWUFBa0Q7QUFDekUsUUFBTSxhQUFhLG1CQUFtQjtBQUN0QyxRQUFNLFFBQVEsaUJBQWlCLE9BQU87QUFDdEMsUUFBTSxXQUFXQSxVQUFTLGdCQUFnQixZQUFZLFdBQVcsUUFBUTtBQUN6RSxRQUFNLFVBQVVBLFVBQVMsZ0JBQWdCLFdBQVcsV0FBVyxXQUFXLGdCQUFnQixLQUFLO0FBQy9GLFFBQU0sa0JBQ0osT0FBTyxnQkFBZ0Isb0JBQW9CLFlBQ3ZDLGdCQUFnQixrQkFDZixXQUFXLG9CQUFvQjtBQUV0QyxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjtBQXFDQSxJQUFNLHlCQUF5QixDQUFDLFNBQXdEO0FBQ3RGLE1BQUksQ0FBQyxRQUFRLE9BQU8sU0FBUyxTQUFVLFFBQU87QUFFOUMsUUFBTSxNQUFNO0FBQ1osUUFBTSxZQUFZQSxVQUFTLElBQUksYUFBYSxJQUFJLFNBQVM7QUFDekQsTUFBSSxDQUFDLFVBQVcsUUFBTztBQUV2QixTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0EsV0FBV0YsWUFBVyxJQUFJLGFBQWEsSUFBSSxTQUFTLE1BQU07QUFBQSxJQUMxRCxxQkFBcUJBLFlBQVcsSUFBSSx1QkFBdUIsSUFBSSxtQkFBbUIsTUFBTTtBQUFBLElBQ3hGLFdBQVdFLFVBQVMsSUFBSSxhQUFhLElBQUksU0FBUztBQUFBLEVBQ3BEO0FBQ0Y7QUFFQSxJQUFNLDBCQUEwQixDQUFDLGFBQW1FO0FBQ2xHLFFBQU0sY0FBYztBQVNwQixRQUFNLFlBQVlGLFlBQVcsWUFBWSxXQUFXLFlBQVksT0FBTztBQUN2RSxNQUFJLGNBQWMsT0FBTztBQUN2QixVQUFNLElBQUksY0FBY0UsVUFBUyxZQUFZLFdBQVcsWUFBWSxPQUFPLEtBQUssK0JBQStCO0FBQUEsRUFDakg7QUFFQSxRQUFNLFFBQVEsTUFBTSxRQUFRLFlBQVksS0FBSyxJQUN6QyxZQUFZLFFBQ1gsTUFBTSxRQUFRLFlBQVksS0FBSyxJQUFJLFlBQVksUUFBUSxDQUFDO0FBQzdELFFBQU0sUUFBUSxNQUFNLENBQUM7QUFDckIsUUFBTSxTQUFTLE9BQU8sVUFBVSxPQUFPO0FBQ3ZDLE1BQUksQ0FBQyxTQUFTLENBQUMsUUFBUTtBQUNyQixVQUFNLElBQUksY0FBYywrQkFBK0I7QUFBQSxFQUN6RDtBQUVBLFFBQU0sV0FBV0EsVUFBUyxPQUFPLFlBQVksT0FBTyxRQUFRO0FBQzVELFFBQU0saUJBQWlCQSxVQUFTLE9BQU8sa0JBQWtCLE9BQU8sY0FBYztBQUM5RSxRQUFNLHNCQUFzQkEsVUFBUyxPQUFPLHVCQUF1QixPQUFPLG1CQUFtQjtBQUM3RixRQUFNLGVBQWUsTUFBTSxRQUFRLE1BQU0sU0FBUyxJQUM5QyxNQUFNLFlBQ0wsTUFBTSxRQUFRLE1BQU0sU0FBUyxJQUFJLE1BQU0sWUFBWSxDQUFDO0FBQ3pELFFBQU0sWUFBWSxhQUNmLElBQUksQ0FBQyxTQUFTLHVCQUF1QixJQUFJLENBQUMsRUFDMUMsT0FBTyxDQUFDLFNBQWdELENBQUMsQ0FBQyxJQUFJO0FBQ2pFLFFBQU0sa0JBQWtCQSxVQUFTLFVBQVUsS0FBSyxDQUFDLFNBQVMsS0FBSyxTQUFTLEdBQUcsU0FBUztBQUNwRixRQUFNLG9CQUFvQiwwQkFBMEI7QUFDcEQsUUFBTSxZQUFZLDBCQUEwQixtQkFBbUIsV0FBVyxrQkFBa0IsZUFBZTtBQUMzRyxRQUFNLGtCQUFrQixVQUFVLEtBQUssQ0FBQyxTQUFTQSxVQUFTLEtBQUssU0FBUyxNQUFNLFNBQVMsS0FBSyxVQUFVLENBQUM7QUFDdkcsUUFBTSxzQkFBc0IsaUJBQWlCLHdCQUF3QjtBQUNyRSxRQUFNLFlBQVlBLFVBQVMsaUJBQWlCLFNBQVM7QUFFckQsTUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXO0FBQzNCLFVBQU0sSUFBSSxjQUFjLDBDQUEwQztBQUFBLEVBQ3BFO0FBRUEsU0FBTztBQUFBLElBQ0wsT0FBTztBQUFBLElBQ1A7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTSwwQkFBMEIsT0FBTyxZQUEwRDtBQUMvRixRQUFNLE9BQU8sZ0JBQWdCLE9BQU87QUFDcEMsUUFBTSxhQUFhLGdCQUFnQixJQUFJO0FBQ3ZDLFFBQU0sRUFBRSxRQUFRLEdBQUcsWUFBWSxJQUFJLFdBQVcsQ0FBQztBQUUvQyxNQUFJLGlCQUFpQixxQkFBcUIsWUFBWTtBQUNwRCxXQUFPLDhCQUE4QixRQUFRLFFBQVEsYUFBYSxHQUFHLE1BQU07QUFBQSxFQUM3RTtBQUVBLE1BQUksQ0FBQyxrQkFBa0IscUJBQXFCLFlBQVk7QUFDdEQsdUJBQW1CO0FBQ25CLFVBQU0sd0JBQXdCLFlBQVk7QUFDeEMsWUFBTSxpQkFBc0M7QUFBQSxRQUMxQyxTQUFTLEtBQUs7QUFBQSxNQUNoQjtBQUVBLFVBQUlBLFVBQVMsS0FBSyxRQUFRLEdBQUc7QUFDM0IsdUJBQWUsV0FBVyxLQUFLO0FBQUEsTUFDakM7QUFFQSxZQUFNLGtCQUFrQixNQUFNLFVBQTZDLDJCQUEyQjtBQUFBLFFBQ3BHLEdBQUc7QUFBQSxRQUNILFFBQVE7QUFBQSxRQUNSLFNBQVMsb0JBQW9CLEtBQUssT0FBTyxXQUFXO0FBQUEsUUFDcEQsTUFBTSxLQUFLLFVBQVUsY0FBYztBQUFBLE1BQ3JDLENBQUM7QUFFRCxZQUFNLFdBQVcsd0JBQXdCLGVBQWU7QUFDeEQsWUFBTSxjQUFpQztBQUFBLFFBQ3JDLEdBQUc7QUFBQSxRQUNILE9BQU8sS0FBSztBQUFBLE1BQ2Q7QUFFQSxVQUFJLE9BQU8sV0FBVyxhQUFhO0FBQ2pDLGVBQU8sZ0NBQWdDLFlBQVk7QUFBQSxNQUNyRDtBQUVBLHNCQUFnQjtBQUNoQixhQUFPO0FBQUEsSUFDVCxHQUFHO0FBRUgscUJBQWlCO0FBQ2pCLFNBQUsscUJBQXFCLFFBQVEsTUFBTTtBQUN0QyxVQUFJLG1CQUFtQixzQkFBc0I7QUFDM0MseUJBQWlCO0FBQUEsTUFDbkI7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBRUEsU0FBTyxNQUFNLDhCQUE4QixnQkFBZ0IsTUFBTTtBQUNuRTtBQUdPLElBQU0sK0JBQStCLE9BQU8sWUFBa0U7QUFDbkgsUUFBTSxVQUFVLE1BQU0sd0JBQXdCLE9BQU87QUFDckQsU0FBTztBQUFBLElBQ0wsV0FBV0EsVUFBUyxRQUFRLFNBQVMsRUFBRSxZQUFZO0FBQUEsSUFDbkQsVUFBVUEsVUFBUyxRQUFRLFFBQVE7QUFBQSxJQUNuQyxXQUFXQSxVQUFTLFFBQVEsU0FBUztBQUFBLElBQ3JDLHFCQUFxQixRQUFRLHdCQUF3QjtBQUFBLEVBQ3ZEO0FBQ0Y7QUFFQSxJQUFNQyw4QkFBNkI7QUFDbkMsSUFBTUMsZ0NBQStCO0FBQ3JDLElBQU1DLHdCQUF1QjtBQUM3QixJQUFNQyxzQ0FBcUM7QUFDM0MsSUFBTUMsa0NBQWlDO0FBQ3ZDLElBQU1DLHNDQUFxQztBQUMzQyxJQUFNQyxvQ0FBbUM7QUFDekMsSUFBTUMsd0NBQXVDO0FBQzdDLElBQU1DLHNDQUFxQztBQUMzQyxJQUFNQyxtQ0FBa0M7QUFFeEMsSUFBTSx3QkFBd0IsQ0FBQyxVQUE0QjtBQUN6RCxRQUFNLE1BQU1WLFVBQVMsS0FBSyxFQUFFLFlBQVk7QUFDeEMsU0FBTyxJQUFJLFdBQVcsZ0JBQWdCLEtBQUssSUFBSSxXQUFXLE9BQU87QUFDbkU7QUFFQSxJQUFNLHdCQUF3QixDQUFDLFVBQTJDO0FBQ3hFLE1BQUksRUFBRSxpQkFBaUIsZUFBZ0IsUUFBTztBQUM5QyxNQUFJLE1BQU0sV0FBVyxPQUFPLE1BQU0sV0FBVyxJQUFLLFFBQU87QUFDekQsU0FBTyxNQUFNLFdBQVcsVUFBYSxzQkFBc0IsTUFBTSxZQUFZO0FBQy9FO0FBRUEsSUFBTSwyQkFBMkIsTUFBZTtBQUM5QyxNQUFJLE9BQU8sZ0JBQWdCLG9CQUFvQixXQUFXO0FBQ3hELFdBQU8sZ0JBQWdCO0FBQUEsRUFDekI7QUFFQSxTQUFPLHlCQUF5QjtBQUNsQztBQUVBLElBQU0sMEJBQTBCLENBQUMsVUFBNEI7QUFDM0QsTUFBSSx5QkFBeUIsRUFBRyxRQUFPO0FBQ3ZDLFNBQU8sc0JBQXNCLEtBQUs7QUFDcEM7QUFFQSxJQUFNLDZCQUE2QixDQUFDLFlBQXdDO0FBQzFFLFNBQU87QUFBQSxJQUNMLFFBQVFBLFVBQVMsUUFBUSxNQUFNO0FBQUEsSUFDL0IsY0FBY0EsVUFBUyxRQUFRLE1BQU07QUFBQSxJQUNyQyxZQUFZLFFBQVEsY0FBYztBQUFBLElBQ2xDLFVBQVVBLFVBQVMsUUFBUSxlQUFlO0FBQUEsSUFDMUMsUUFBUUEsVUFBUyxRQUFRLGFBQWE7QUFBQSxJQUN0QyxXQUFXQSxVQUFTLFFBQVEsTUFBTTtBQUFBLElBQ2xDLGNBQWNBLFVBQVMsUUFBUSxZQUFZO0FBQUEsSUFDM0Msb0JBQW9CSCx1Q0FBc0MsUUFBUSxrQkFBa0I7QUFBQSxJQUNwRixxQkFBcUIsUUFBUSx3QkFBd0I7QUFBQSxJQUNyRCxNQUFNLE9BQU8sU0FBUyxRQUFRLElBQUksS0FBSyxRQUFRLE9BQU8sSUFBSSxRQUFRLE9BQU87QUFBQSxJQUN6RSxVQUFVLE9BQU8sU0FBUyxRQUFRLFFBQVEsS0FBSyxRQUFRLFdBQVcsSUFBSSxRQUFRLFdBQVc7QUFBQSxFQUMzRjtBQUNGO0FBRUEsSUFBTSxpQ0FBaUMsQ0FBQyxTQUF5RDtBQUMvRixTQUFPO0FBQUEsSUFDTCxjQUFjRyxVQUFTLEtBQUssWUFBWTtBQUFBLElBQ3hDLGFBQWFBLFVBQVMsS0FBSyxXQUFXO0FBQUEsSUFDdEMsb0JBQW9CVyxrQkFBaUIsS0FBSyxrQkFBa0I7QUFBQSxJQUM1RCxtQkFBbUJYLFVBQVMsS0FBSyxpQkFBaUIsS0FBSztBQUFBLElBQ3ZELFFBQVFBLFVBQVMsS0FBSyxNQUFNLEtBQUs7QUFBQSxJQUNqQyxVQUFVQSxVQUFTLEtBQUssUUFBUSxLQUFLO0FBQUEsSUFDckMsU0FBU0EsVUFBUyxLQUFLLE9BQU87QUFBQSxJQUM5QixRQUFRQSxVQUFTLEtBQUssTUFBTTtBQUFBLElBQzVCLGNBQWNBLFVBQVMsS0FBSyxZQUFZO0FBQUEsSUFDeEMsYUFBYVcsa0JBQWlCLEtBQUssZUFBZSxLQUFLLGNBQWM7QUFBQSxJQUNyRSxVQUFVQSxrQkFBaUIsS0FBSyxRQUFRO0FBQUEsSUFDeEMsa0JBQWtCQSxrQkFBaUIsS0FBSyxnQkFBZ0I7QUFBQSxJQUN4RCxhQUFhWCxVQUFTLEtBQUssV0FBVyxLQUFLO0FBQUEsRUFDN0M7QUFDRjtBQUVBLElBQU0sd0JBQXdCLENBQzVCLFFBQ0EsY0FDQSxxQkFDOEM7QUFDOUMsUUFBTSxjQUFjLE1BQU0sUUFBUSxRQUFRLEtBQUssSUFBSSxPQUFPLFFBQVEsQ0FBQztBQUNuRSxRQUFNLGNBQWMsWUFBWSxJQUFJLENBQUMsVUFBVSwrQkFBK0IsS0FBSyxDQUFDO0FBRXBGLFNBQU87QUFBQSxJQUNMLFNBQVMsT0FBTyxZQUFZO0FBQUEsSUFDNUIsU0FBU0EsVUFBUyxPQUFPLE9BQU8sS0FBSztBQUFBLElBQ3JDLE9BQU9XLGtCQUFpQixPQUFPLEtBQUssS0FBSyxZQUFZO0FBQUEsSUFDckQsTUFBTUEsa0JBQWlCLE9BQU8sSUFBSSxLQUFLO0FBQUEsSUFDdkMsVUFBVUEsa0JBQWlCLE9BQU8sUUFBUSxLQUFLO0FBQUEsSUFDL0MsT0FBTztBQUFBLElBQ1AsU0FBUztBQUFBLEVBQ1g7QUFDRjtBQUdPLElBQU0sMEJBQTBCLENBQUMsU0FBNEM7QUFDbEYsUUFBTSxpQkFBaUJiLFlBQVcsS0FBSyxlQUFlO0FBQ3RELFFBQU0sb0JBQ0osT0FBTyxnQkFBZ0Isb0JBQW9CLFlBQVksZ0JBQWdCLGtCQUFrQix5QkFBeUI7QUFFcEgsb0JBQWtCO0FBQUEsSUFDaEIsR0FBRztBQUFBLElBQ0gsT0FBT0UsVUFBUyxLQUFLLFNBQVMsZ0JBQWdCLEtBQUs7QUFBQSxJQUNuRCxVQUFVQSxVQUFTLEtBQUssWUFBWSxnQkFBZ0IsUUFBUTtBQUFBLElBQzVELFNBQVNBLFVBQVMsS0FBSyxXQUFXLGdCQUFnQixXQUFXLGdCQUFnQjtBQUFBLElBQzdFLGlCQUFpQixrQkFBa0I7QUFBQSxFQUNyQztBQUVBLGtCQUFnQjtBQUNoQixxQkFBbUI7QUFDbkIsbUJBQWlCO0FBQ2pCLDBCQUF3QixNQUFNO0FBQzlCLDBCQUF3QixNQUFNO0FBQ2hDO0FBR08sSUFBTVksaUNBQWdDO0FBR3RDLElBQU1DLHlCQUF3QjtBQUc5QixJQUFNQyx1QkFBc0I7QUFVbkMsSUFBTSx5QkFBeUIsQ0FDN0IsU0FDQSxTQUNBLHFCQUMyQjtBQUMzQixRQUFNLFVBQVUsZ0JBQWdCLG9CQUFvQixTQUFTLFNBQVMsTUFBTSxLQUFLLENBQUM7QUFDbEYsUUFBTSw2QkFBNkIsd0JBQXdCLGdCQUFnQjtBQUMzRSxRQUFNLG1CQUFtQmQsVUFBUyw4QkFBOEIsUUFBUSxRQUFRO0FBQ2hGLE1BQUksa0JBQWtCO0FBQ3BCLFlBQVEsZ0JBQWdCLElBQUk7QUFBQSxFQUM5QixPQUFPO0FBQ0wsc0JBQWtCLFNBQVMsZ0JBQWdCO0FBQUEsRUFDN0M7QUFDQSxTQUFPO0FBQ1Q7QUFHTyxJQUFNLHdCQUF3QixPQUNuQyxTQUNBLFlBQ3VEO0FBQ3ZELFFBQU0sRUFBRSxrQkFBa0IsR0FBRyxZQUFZLElBQUksV0FBVyxDQUFDO0FBQ3pELFFBQU0scUJBQXFCQSxVQUFTLFNBQVMsZUFBZTtBQUM1RCxRQUFNLG1CQUFtQkEsVUFBUyxTQUFTLGFBQWE7QUFDeEQsUUFBTSxrQkFBa0JlLDBCQUF5QixrQkFBa0I7QUFDbkUsUUFBTSxnQkFBZ0JBLDBCQUF5QixnQkFBZ0I7QUFFL0QsTUFBSSxzQkFBc0IsQ0FBQyxpQkFBaUI7QUFDMUMsVUFBTSxJQUFJLGNBQWMsK0JBQStCO0FBQUEsRUFDekQ7QUFDQSxNQUFJLG9CQUFvQixDQUFDLGVBQWU7QUFDdEMsVUFBTSxJQUFJLGNBQWMsK0JBQStCO0FBQUEsRUFDekQ7QUFFQSxRQUFNLGNBQTBDO0FBQUEsSUFDOUMsR0FBRztBQUFBLElBQ0g7QUFBQSxJQUNBO0FBQUEsSUFDQSxvQkFBb0JsQix1Q0FBc0MsUUFBUSxrQkFBa0I7QUFBQSxJQUNwRixxQkFBcUIsUUFBUSx3QkFBd0I7QUFBQSxFQUN2RDtBQUVBLFFBQU0sVUFBVSxNQUFNLHdCQUF3QixXQUFXO0FBQ3pELFFBQU0sY0FBYyxnQkFBZ0Isb0JBQW9CLFNBQVMsYUFBYSxNQUFNLEtBQUssQ0FBQztBQUMxRixRQUFNLDZCQUE2Qix3QkFBd0IsZ0JBQWdCO0FBQzNFLFFBQU0sbUJBQW1CRyxVQUFTLDhCQUE4QixRQUFRLFFBQVE7QUFDaEYsTUFBSSxrQkFBa0I7QUFDcEIsZ0JBQVksZ0JBQWdCLElBQUk7QUFBQSxFQUNsQyxPQUFPO0FBQ0wsc0JBQWtCLGFBQWEsZ0JBQWdCO0FBQUEsRUFDakQ7QUFFQSxNQUFJO0FBQ0YsVUFBTSxXQUFXLE1BQU0sVUFBcUQsK0JBQStCO0FBQUEsTUFDekcsR0FBRztBQUFBLE1BQ0gsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsTUFBTSxLQUFLLFVBQVUsV0FBVztBQUFBLElBQ2xDLENBQUM7QUFFRCxXQUFPQyw0QkFBMkIsUUFBUTtBQUFBLEVBQzVDLFNBQVMsT0FBTztBQUNkLFFBQUksQ0FBQyx3QkFBd0IsS0FBSyxHQUFHO0FBQ25DLFlBQU07QUFBQSxJQUNSO0FBRUEsVUFBTSxpQkFBaUIsTUFBTSxVQUFxQyw2QkFBNkI7QUFBQSxNQUM3RixHQUFHO0FBQUEsTUFDSCxRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsUUFDUCxHQUFHLGdCQUFnQixhQUFhLE9BQU87QUFBQSxRQUN2QyxHQUFHO0FBQUEsTUFDTDtBQUFBLE1BQ0EsTUFBTSxLQUFLLFVBQVUsMkJBQTJCLFdBQVcsQ0FBQztBQUFBLElBQzlELENBQUM7QUFFRCxVQUFNLFNBQVM7QUFBQSxNQUNiO0FBQUEsTUFDQSxPQUFPLFNBQVMsWUFBWSxJQUFJLEtBQUssWUFBWSxPQUFPLElBQUksWUFBWSxPQUFPO0FBQUEsTUFDL0UsT0FBTyxTQUFTLFlBQVksUUFBUSxLQUFLLFlBQVksV0FBVyxJQUFJLFlBQVksV0FBVztBQUFBLElBQzdGO0FBRUEsV0FBT0EsNEJBQTJCLE1BQU07QUFBQSxFQUMxQztBQUNGO0FBR08sSUFBTSwwQkFBMEIsT0FDckMsY0FDQSxZQUNxRDtBQUNyRCxRQUFNLFVBQVUsTUFBTSx3QkFBd0IsT0FBTztBQUNyRCxRQUFNLGNBQWMsbUJBQW1CLE9BQU8sZ0JBQWdCLEVBQUUsRUFBRSxLQUFLLENBQUM7QUFDeEUsUUFBTSxXQUFXLE1BQU0sVUFBbUQsMEJBQTBCLFdBQVcsSUFBSTtBQUFBLElBQ2pILEdBQUc7QUFBQSxJQUNILFFBQVE7QUFBQSxJQUNSLFNBQVMsb0JBQW9CLFNBQVMsT0FBTztBQUFBLEVBQy9DLENBQUM7QUFFRCxTQUFPQyw4QkFBNkIsUUFBUTtBQUM5QztBQUdPLElBQU0sNEJBQTRCLE9BQ3ZDLFlBQ3VEO0FBQ3ZELE1BQUksVUFBb0M7QUFDeEMsTUFBSTtBQUNGLGNBQVUsTUFBTSx3QkFBd0IsT0FBTztBQUFBLEVBQ2pELFNBQVMsT0FBTztBQUNkLFFBQUksRUFBRSxpQkFBaUIsZ0JBQWdCO0FBQ3JDLFlBQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUVBLFFBQU0sWUFBWUYsVUFBUyxTQUFTLGFBQWEsMEJBQTBCLENBQUMsRUFBRSxZQUFZO0FBQzFGLFFBQU0sV0FBVyxhQUFhO0FBRTlCLE1BQUksd0JBQXdCLElBQUksUUFBUSxHQUFHO0FBQ3pDLFdBQU8sd0JBQXdCLElBQUksUUFBUTtBQUFBLEVBQzdDO0FBRUEsTUFBSSx3QkFBd0IsSUFBSSxRQUFRLEdBQUc7QUFDekMsV0FBTyx3QkFBd0IsSUFBSSxRQUFRO0FBQUEsRUFDN0M7QUFFQSxRQUFNLGtCQUFrQixZQUFZO0FBQ2xDLFVBQU0sVUFBVSxnQkFBZ0IsU0FBUyxPQUFPO0FBQ2hELHNCQUFrQixTQUFTLGVBQWU7QUFDMUMsc0JBQWtCLFNBQVMsZ0JBQWdCO0FBRTNDLFFBQUksV0FBVztBQUNiLGNBQVEsZUFBZSxJQUFJO0FBQUEsSUFDN0I7QUFFQSxRQUFJO0FBQ0YsWUFBTSxXQUFXLE1BQU0sVUFBcUQscUNBQXFDO0FBQUEsUUFDL0csR0FBRztBQUFBLFFBQ0gsUUFBUTtBQUFBLFFBQ1I7QUFBQSxNQUNGLENBQUM7QUFFRCxZQUFNLHFCQUFxQkssZ0NBQStCLFFBQVE7QUFDbEUsVUFBSSxtQkFBbUIsU0FBUztBQUM5QixnQ0FBd0IsSUFBSSxVQUFVLGtCQUFrQjtBQUFBLE1BQzFEO0FBRUEsYUFBTztBQUFBLElBQ1QsU0FBUyxPQUFPO0FBQ2QsVUFBSSxDQUFDLHdCQUF3QixLQUFLLEdBQUc7QUFDbkMsY0FBTTtBQUFBLE1BQ1I7QUFFQSxZQUFNLHFCQUFxQixNQUFNLFVBQXFDLDZCQUE2QjtBQUFBLFFBQ2pHLEdBQUc7QUFBQSxRQUNILFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxVQUNQLEdBQUcsZ0JBQWdCLFNBQVMsT0FBTztBQUFBLFVBQ25DLEdBQUc7QUFBQSxRQUNMO0FBQUEsUUFDQSxNQUFNLEtBQUssVUFBVTtBQUFBLFVBQ25CLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLFlBQVk7QUFBQSxVQUNaLFVBQVU7QUFBQSxVQUNWLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxVQUNYLGNBQWM7QUFBQSxVQUNkLE1BQU07QUFBQSxVQUNOLFVBQVU7QUFBQSxRQUNaLENBQUM7QUFBQSxNQUNILENBQUM7QUFFRCxZQUFNLFlBQVksb0JBQUksSUFBWTtBQUNsQyxZQUFNLGNBQWMsTUFBTSxRQUFRLG1CQUFtQixLQUFLLElBQUksbUJBQW1CLFFBQVEsQ0FBQztBQUMxRixZQUFNLGdCQUEyQyxZQUM5QyxJQUFJLENBQUMsVUFBVUwsVUFBUyxNQUFNLFlBQVksRUFBRSxZQUFZLENBQUMsRUFDekQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFDdkIsT0FBTyxDQUFDLFNBQVM7QUFDaEIsWUFBSSxVQUFVLElBQUksSUFBSSxFQUFHLFFBQU87QUFDaEMsa0JBQVUsSUFBSSxJQUFJO0FBQ2xCLGVBQU87QUFBQSxNQUNULENBQUMsRUFDQSxJQUFJLENBQUMsVUFBVTtBQUFBLFFBQ2QsY0FBYztBQUFBLFFBQ2QsaUJBQWlCO0FBQUEsTUFDbkIsRUFBRTtBQUVKLFlBQU0sbUJBQThEO0FBQUEsUUFDbEUsU0FBUyxtQkFBbUIsWUFBWTtBQUFBLFFBQ3hDLFNBQVNBLFVBQVMsbUJBQW1CLE9BQU8sS0FBSztBQUFBLFFBQ2pELE9BQU8sY0FBYztBQUFBLFFBQ3JCLE1BQU07QUFBQSxRQUNOLFVBQVUsY0FBYztBQUFBLFFBQ3hCLE9BQU87QUFBQSxRQUNQLFNBQVM7QUFBQSxNQUNYO0FBRUEsWUFBTSxxQkFBcUJLLGdDQUErQixnQkFBZ0I7QUFDMUUsVUFBSSxtQkFBbUIsU0FBUztBQUM5QixnQ0FBd0IsSUFBSSxVQUFVLGtCQUFrQjtBQUFBLE1BQzFEO0FBRUEsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGLEdBQUc7QUFFSCwwQkFBd0IsSUFBSSxVQUFVLGNBQWM7QUFDcEQsTUFBSTtBQUNGLFdBQU8sTUFBTTtBQUFBLEVBQ2YsVUFBRTtBQUNBLDRCQUF3QixPQUFPLFFBQVE7QUFBQSxFQUN6QztBQUNGO0FBR08sSUFBTSw4QkFBOEIsT0FDekMsWUFDMEQ7QUFDMUQsUUFBTSxVQUFVLE1BQU0sd0JBQXdCLE9BQU87QUFFckQsUUFBTSxVQUFVLGdCQUFnQixvQkFBb0IsU0FBUyxTQUFTLE9BQU8sS0FBSyxDQUFDO0FBQ25GLFFBQU0sa0JBQWtCTCxVQUFTLFFBQVEsUUFBUTtBQUNqRCxNQUFJLGlCQUFpQjtBQUNuQixZQUFRLGdCQUFnQixJQUFJO0FBQUEsRUFDOUI7QUFFQSxRQUFNLFdBQVcsTUFBTSxVQUFxQyx1Q0FBdUM7QUFBQSxJQUNqRyxHQUFHO0FBQUEsSUFDSCxRQUFRO0FBQUEsSUFDUjtBQUFBLEVBQ0YsQ0FBQztBQUVELFNBQU9NLG9DQUFtQyxRQUFRO0FBQ3BEO0FBR08sSUFBTSxxQ0FBcUMsT0FBTyxZQUErQztBQUN0RyxNQUFJO0FBQ0YsVUFBTSxVQUFVLE1BQU0sd0JBQXdCLE9BQU87QUFDckQsV0FBT04sVUFBUyxRQUFRLG1CQUFtQixFQUFFLFlBQVk7QUFBQSxFQUMzRCxRQUFRO0FBQ04sV0FBTztBQUFBLEVBQ1Q7QUFDRjtBQUdPLElBQU0sa0JBQWtCLE9BQzdCLGNBQ0EsZ0JBQ0EsTUFDQSxZQUM2QztBQUM3QyxRQUFNLFFBQVEsaUJBQWlCLE9BQU87QUFDdEMsUUFBTSx5QkFBeUJBLFVBQVMsWUFBWSxFQUFFLFlBQVk7QUFDbEUsUUFBTSwyQkFBMkJBLFVBQVMsY0FBYyxFQUFFLFlBQVk7QUFDdEUsUUFBTSxpQkFBaUJBLFVBQVMsSUFBSTtBQUNwQyxRQUFNLFFBQVEsSUFBSSxnQkFBZ0I7QUFFbEMsUUFBTSxJQUFJLGdCQUFnQixzQkFBc0I7QUFDaEQsUUFBTSxJQUFJLGtCQUFrQix3QkFBd0I7QUFDcEQsTUFBSSxnQkFBZ0I7QUFDbEIsVUFBTSxJQUFJLFFBQVEsY0FBYztBQUFBLEVBQ2xDO0FBRUEsUUFBTSxVQUFVLGdCQUFnQixTQUFTLE9BQU87QUFDaEQsTUFBSSxPQUFPO0FBQ1QsWUFBUSxnQkFBZ0IsVUFBVSxLQUFLO0FBQUEsRUFDekM7QUFFQSxTQUFPLFVBQTJDLDZCQUE2QixNQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDakcsR0FBRztBQUFBLElBQ0gsUUFBUTtBQUFBLElBQ1I7QUFBQSxFQUNGLENBQUM7QUFDSDtBQUdPLElBQU0sOEJBQThCLE9BQ3pDLGNBQ0EsZ0JBQ0EsTUFDQSxZQUM2QztBQUM3QyxRQUFNLFFBQVEsaUJBQWlCLE9BQU87QUFDdEMsUUFBTSx5QkFBeUJBLFVBQVMsWUFBWSxFQUFFLFlBQVk7QUFDbEUsUUFBTSwyQkFBMkJBLFVBQVMsY0FBYyxFQUFFLFlBQVk7QUFDdEUsUUFBTSxpQkFBaUJBLFVBQVMsSUFBSTtBQUNwQyxRQUFNLFFBQVEsSUFBSSxnQkFBZ0I7QUFFbEMsUUFBTSxJQUFJLGdCQUFnQixzQkFBc0I7QUFDaEQsUUFBTSxJQUFJLGtCQUFrQix3QkFBd0I7QUFDcEQsTUFBSSxnQkFBZ0I7QUFDbEIsVUFBTSxJQUFJLFFBQVEsY0FBYztBQUFBLEVBQ2xDO0FBRUEsUUFBTSxVQUFVLGdCQUFnQixTQUFTLE9BQU87QUFDaEQsTUFBSSxPQUFPO0FBQ1QsWUFBUSxnQkFBZ0IsVUFBVSxLQUFLO0FBQUEsRUFDekM7QUFFQSxTQUFPLFVBQTJDLDJDQUEyQyxNQUFNLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDL0csR0FBRztBQUFBLElBQ0gsUUFBUTtBQUFBLElBQ1I7QUFBQSxFQUNGLENBQUM7QUFDSDtBQUdPLElBQU0saUJBQWlCLE9BQzVCLFdBQ0EsWUFDNEM7QUFDNUMsUUFBTSxVQUFVLE1BQU0sd0JBQXdCLE9BQU87QUFDckQsUUFBTSxpQkFBaUJnQiwwQkFBeUIsU0FBUztBQUN6RCxRQUFNLFFBQVEsSUFBSSxnQkFBZ0I7QUFFbEMsUUFBTSxJQUFJLGFBQWEsY0FBYztBQUVyQyxRQUFNLFdBQVcsTUFBTTtBQUFBLElBQ3JCLHdDQUF3QyxNQUFNLFNBQVMsQ0FBQztBQUFBLElBQ3hEO0FBQUEsTUFDRSxHQUFHO0FBQUEsTUFDSCxRQUFRO0FBQUEsTUFDUixTQUFTLG9CQUFvQixTQUFTLE9BQU87QUFBQSxJQUMvQztBQUFBLEVBQ0Y7QUFFQSxTQUFPYixzQkFBcUIsUUFBUTtBQUN0QztBQUdPLElBQU0scUJBQXFCLE9BQ2hDLFNBQ0EsWUFDNEQ7QUFDNUQsUUFBTSxVQUFVLE1BQU0sd0JBQXdCLE9BQU87QUFDckQsUUFBTSxPQUFPLFFBQVEsUUFBUTtBQUM3QixRQUFNLFFBQVEsTUFBTSxRQUFRLFFBQVEsS0FBSyxJQUFJLFFBQVEsUUFBUSxDQUFDO0FBQzlELFFBQU0sa0JBQWtCLE1BQU0sSUFBSSxDQUFDLFVBQVU7QUFBQSxJQUMzQyxHQUFHO0FBQUEsSUFDSCxXQUFXYSwwQkFBeUIsS0FBSyxTQUFTO0FBQUEsRUFDcEQsRUFBRTtBQUNGLFFBQU0sd0JBQXdCLGdCQUFnQixLQUFLLENBQUMsU0FBUztBQUMzRCxXQUNFLENBQUNoQixVQUFTLEtBQUssU0FBUyxLQUN4QixDQUFDLE9BQU8sVUFBVSxPQUFPLEtBQUssU0FBUyxDQUFDLEtBQ3hDLE9BQU8sS0FBSyxTQUFTLEtBQUssS0FDMUIsQ0FBQ2lCLGtCQUFpQixLQUFLLEdBQUcsS0FDMUIsQ0FBQ0Esa0JBQWlCLEtBQUssS0FBSztBQUFBLEVBRWhDLENBQUM7QUFFRCxNQUFJLFFBQVEsdUJBQXVCLFVBQWEsQ0FBQ0MscUJBQW9CLFFBQVEsa0JBQWtCLEdBQUc7QUFDaEcsVUFBTSxJQUFJLGNBQWMsbURBQW1EO0FBQUEsRUFDN0U7QUFFQSxNQUFJLFFBQVEscUJBQXFCLFVBQWEsQ0FBQ0EscUJBQW9CLFFBQVEsZ0JBQWdCLEdBQUc7QUFDNUYsVUFBTSxJQUFJLGNBQWMsaURBQWlEO0FBQUEsRUFDM0U7QUFFQSxNQUFJLFFBQVEscUJBQXFCLFVBQWEsUUFBUSx1QkFBdUIsUUFBVztBQUN0RixVQUFNLElBQUksY0FBYywrQ0FBK0M7QUFBQSxFQUN6RTtBQUVBLE1BQUksdUJBQXVCO0FBQ3pCLFVBQU0sSUFBSSxjQUFjLGlFQUFpRTtBQUFBLEVBQzNGO0FBRUEsTUFBSSxTQUFTLEdBQUc7QUFDZCxRQUFJLENBQUNsQixVQUFTLFFBQVEsV0FBVyxLQUFLLENBQUNBLFVBQVMsUUFBUSxZQUFZLEtBQUssTUFBTSxTQUFTLEdBQUc7QUFDekYsWUFBTSxJQUFJLGNBQWMsb0NBQW9DO0FBQUEsSUFDOUQ7QUFBQSxFQUNGO0FBRUEsTUFBSSxTQUFTLEdBQUc7QUFDZCxRQUFJLENBQUNBLFVBQVMsUUFBUSxXQUFXLEtBQUssQ0FBQ0EsVUFBUyxRQUFRLFlBQVksR0FBRztBQUNyRSxZQUFNLElBQUksY0FBYyxvQ0FBb0M7QUFBQSxJQUM5RDtBQUVBLFFBQUksTUFBTSxTQUFTLEdBQUc7QUFDcEIsWUFBTSxJQUFJLGNBQWMsNENBQTRDO0FBQUEsSUFDdEU7QUFBQSxFQUNGO0FBRUEsTUFBSSxTQUFTLEdBQUc7QUFDZCxRQUFJLENBQUNBLFVBQVMsUUFBUSxvQkFBb0IsS0FBSyxNQUFNLFNBQVMsR0FBRztBQUMvRCxZQUFNLElBQUksY0FBYyxvQ0FBb0M7QUFBQSxJQUM5RDtBQUFBLEVBQ0Y7QUFFQSxRQUFNLG9CQUErQztBQUFBLElBQ25ELEdBQUc7QUFBQSxJQUNIO0FBQUEsSUFDQSxzQkFBc0JBLFVBQVMsUUFBUSxvQkFBb0IsS0FBSztBQUFBLElBQ2hFLGFBQWFBLFVBQVMsUUFBUSxXQUFXLEtBQUs7QUFBQSxJQUM5QyxjQUFjQSxVQUFTLFFBQVEsWUFBWSxLQUFLO0FBQUEsSUFDaEQsUUFBUUEsVUFBUyxRQUFRLE1BQU0sS0FBSztBQUFBLElBQ3BDLE9BQU8sU0FBUyxJQUFJLENBQUMsSUFBSTtBQUFBLEVBQzNCO0FBRUEsUUFBTSxXQUFXLE1BQU0sVUFBMEQsMEJBQTBCO0FBQUEsSUFDekcsR0FBRztBQUFBLElBQ0gsUUFBUTtBQUFBLElBQ1IsU0FBUyxvQkFBb0IsU0FBUyxTQUFTLElBQUk7QUFBQSxJQUNuRCxNQUFNLEtBQUssVUFBVSxpQkFBaUI7QUFBQSxFQUN4QyxDQUFDO0FBRUQsU0FBT0csc0JBQXFCLFFBQVE7QUFDdEM7QUFHTyxJQUFNLDJCQUEyQixPQUN0QyxjQUNBLFNBQ0EsWUFDc0Q7QUFDdEQsUUFBTSxVQUFVLE1BQU0sd0JBQXdCLE9BQU87QUFDckQsUUFBTSxjQUFjLG1CQUFtQixPQUFPLGdCQUFnQixFQUFFLEVBQUUsS0FBSyxDQUFDO0FBRXhFLE1BQUksUUFBUSx1QkFBdUIsVUFBYSxDQUFDZSxxQkFBb0IsUUFBUSxrQkFBa0IsR0FBRztBQUNoRyxVQUFNLElBQUksY0FBYyxtREFBbUQ7QUFBQSxFQUM3RTtBQUVBLE1BQUksUUFBUSxxQkFBcUIsVUFBYSxDQUFDQSxxQkFBb0IsUUFBUSxnQkFBZ0IsR0FBRztBQUM1RixVQUFNLElBQUksY0FBYyxpREFBaUQ7QUFBQSxFQUMzRTtBQUVBLFFBQU0sV0FBVyxNQUFNLFVBQW9ELDBCQUEwQixXQUFXLElBQUk7QUFBQSxJQUNsSCxHQUFHO0FBQUEsSUFDSCxRQUFRO0FBQUEsSUFDUixTQUFTLG9CQUFvQixTQUFTLFNBQVMsSUFBSTtBQUFBLElBQ25ELE1BQU0sS0FBSyxVQUFVLE9BQU87QUFBQSxFQUM5QixDQUFDO0FBRUQsU0FBT2Ysc0JBQXFCLFFBQVE7QUFDdEM7QUFHTyxJQUFNLHFCQUFxQixPQUNoQyxjQUNBLFlBQ2tDO0FBQ2xDLFFBQU0sVUFBVSxNQUFNLHdCQUF3QixPQUFPO0FBQ3JELFFBQU0sY0FBYyxtQkFBbUIsT0FBTyxnQkFBZ0IsRUFBRSxFQUFFLEtBQUssQ0FBQztBQUN4RSxRQUFNLFdBQVcsTUFBTTtBQUFBLElBQ3JCLDBCQUEwQixXQUFXO0FBQUEsSUFDckM7QUFBQSxNQUNFLEdBQUc7QUFBQSxNQUNILFFBQVE7QUFBQSxNQUNSLFNBQVMsb0JBQW9CLFNBQVMsT0FBTztBQUFBLElBQy9DO0FBQUEsRUFDRjtBQUVBLFNBQU9BLHNCQUFxQixRQUFRO0FBQ3RDO0FBR08sSUFBTSx5QkFBeUIsT0FDcEMsY0FDQSxXQUNBLFNBQ0EsWUFDZ0U7QUFDaEUsUUFBTSxzQkFBc0JhLDBCQUF5QixRQUFRLFNBQVM7QUFDdEUsTUFDRSxDQUFDLE9BQU8sVUFBVSxPQUFPLFFBQVEsU0FBUyxDQUFDLEtBQzNDLE9BQU8sUUFBUSxTQUFTLEtBQUssS0FDN0IsQ0FBQ0Msa0JBQWlCLFFBQVEsR0FBRyxLQUM3QixDQUFDQSxrQkFBaUIsUUFBUSxLQUFLLEdBQy9CO0FBQ0EsVUFBTSxJQUFJLGNBQWMsMkRBQTJEO0FBQUEsRUFDckY7QUFFQSxRQUFNLFVBQVUsTUFBTSx3QkFBd0IsT0FBTztBQUNyRCxRQUFNLGNBQWMsbUJBQW1CLE9BQU8sZ0JBQWdCLEVBQUUsRUFBRSxLQUFLLENBQUM7QUFDeEUsUUFBTSxhQUFhLG1CQUFtQixPQUFPLGFBQWEsRUFBRSxFQUFFLEtBQUssQ0FBQztBQUVwRSxRQUFNLFdBQVcsTUFBTTtBQUFBLElBQ3JCLDBCQUEwQixXQUFXLFVBQVUsVUFBVTtBQUFBLElBQ3pEO0FBQUEsTUFDRSxHQUFHO0FBQUEsTUFDSCxRQUFRO0FBQUEsTUFDUixTQUFTLG9CQUFvQixTQUFTLFNBQVMsSUFBSTtBQUFBLE1BQ25ELE1BQU0sS0FBSyxVQUFVO0FBQUEsUUFDbkIsR0FBRztBQUFBLFFBQ0gsV0FBVztBQUFBLE1BQ2IsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBRUEsU0FBT2Qsc0JBQXFCLFFBQVE7QUFDdEM7QUFHTyxJQUFNLHlCQUF5QixPQUNwQyxjQUNBLFdBQ0EsWUFDa0M7QUFDbEMsUUFBTSxVQUFVLE1BQU0sd0JBQXdCLE9BQU87QUFDckQsUUFBTSxjQUFjLG1CQUFtQixPQUFPLGdCQUFnQixFQUFFLEVBQUUsS0FBSyxDQUFDO0FBQ3hFLFFBQU0sYUFBYSxtQkFBbUIsT0FBTyxhQUFhLEVBQUUsRUFBRSxLQUFLLENBQUM7QUFDcEUsUUFBTSxXQUFXLE1BQU07QUFBQSxJQUNyQiwwQkFBMEIsV0FBVyxVQUFVLFVBQVU7QUFBQSxJQUN6RDtBQUFBLE1BQ0UsR0FBRztBQUFBLE1BQ0gsUUFBUTtBQUFBLE1BQ1IsU0FBUyxvQkFBb0IsU0FBUyxPQUFPO0FBQUEsSUFDL0M7QUFBQSxFQUNGO0FBRUEsU0FBT0Esc0JBQXFCLFFBQVE7QUFDdEM7QUFHTyxJQUFNLGdDQUFnQyxPQUMzQyxhQUNBLGVBQ0EsZUFDQSxZQUN1RDtBQUN2RCxRQUFNLFVBQVUsTUFBTSx3QkFBd0IsT0FBTztBQUNyRCxRQUFNLE9BQU8sSUFBSSxTQUFTO0FBQzFCLFFBQU0sZ0JBQWdCSCxVQUFTLGFBQWE7QUFFNUMsTUFBSSx1QkFBdUIsTUFBTTtBQUMvQixTQUFLLE9BQU8sZUFBZSxhQUFhQSxVQUFTLFlBQVksSUFBSSxLQUFLLFlBQVk7QUFBQSxFQUNwRixPQUFPO0FBQ0wsU0FBSyxPQUFPLGVBQWUsYUFBYSxZQUFZO0FBQUEsRUFDdEQ7QUFFQSxNQUFJLE9BQU8sa0JBQWtCLFdBQVc7QUFDdEMsU0FBSyxPQUFPLGlCQUFpQixnQkFBZ0IsU0FBUyxPQUFPO0FBQUEsRUFDL0Q7QUFFQSxNQUFJLGVBQWU7QUFDakIsU0FBSyxPQUFPLGlCQUFpQixhQUFhO0FBQUEsRUFDNUM7QUFFQSxRQUFNLFdBQVcsTUFBTSxVQUFxRCxxQ0FBcUM7QUFBQSxJQUMvRyxHQUFHO0FBQUEsSUFDSCxRQUFRO0FBQUEsSUFDUixTQUFTLHdCQUF3QixTQUFTLE9BQU87QUFBQSxJQUNqRCxNQUFNO0FBQUEsRUFDUixDQUFDO0FBRUQsU0FBT0csc0JBQXFCLFFBQVE7QUFDdEM7QUFHTyxJQUFNLGdDQUFnQyxPQUMzQyxTQUNBLFlBQ2lEO0FBQ2pELE1BQUksQ0FBQyxTQUFTLGFBQWE7QUFDekIsVUFBTSxJQUFJLGNBQWMsMEJBQTBCO0FBQUEsRUFDcEQ7QUFFQSxRQUFNLEVBQUUseUJBQXlCLDBCQUEwQixHQUFHLGFBQWEsSUFBSSxXQUFXLENBQUM7QUFDM0YsUUFBTSxVQUFVLE1BQU0sd0JBQXdCLFlBQVk7QUFDMUQsUUFBTSxPQUFPLElBQUksU0FBUztBQUMxQixRQUFNLG1CQUFtQkgsVUFBUyxTQUFTLFlBQVksRUFBRSxZQUFZO0FBQ3JFLFFBQU0sa0JBQWtCQSxVQUFTLFNBQVMsV0FBVztBQUNyRCxRQUFNLGlCQUFpQkEsVUFBUyxTQUFTLFVBQVU7QUFDbkQsUUFBTSxjQUFjQSxVQUFTLFNBQVMsb0JBQW9CO0FBQzFELFFBQU0sZ0JBQWdCQSxVQUFTLFNBQVMsU0FBUztBQUNqRCxRQUFNLGNBQWMsUUFBUTtBQUU1QixNQUFJLHVCQUF1QixNQUFNO0FBQy9CLFNBQUssT0FBTyxlQUFlLGFBQWFBLFVBQVMsWUFBWSxJQUFJLEtBQUssWUFBWTtBQUFBLEVBQ3BGLE9BQU87QUFDTCxTQUFLLE9BQU8sZUFBZSxhQUFhLFlBQVk7QUFBQSxFQUN0RDtBQUVBLE1BQUksa0JBQWtCO0FBQ3BCLFNBQUssT0FBTyxnQkFBZ0IsZ0JBQWdCO0FBQUEsRUFDOUM7QUFFQSxNQUFJLGlCQUFpQixTQUFTO0FBQzVCLFNBQUssT0FBTyxlQUFlLGVBQWU7QUFBQSxFQUM1QztBQUVBLE1BQUksZ0JBQWdCLFNBQVM7QUFDM0IsU0FBSyxPQUFPLGNBQWMsY0FBYztBQUFBLEVBQzFDO0FBRUEsTUFBSSxhQUFhO0FBQ2YsU0FBSyxPQUFPLHdCQUF3QixXQUFXO0FBQUEsRUFDakQ7QUFFQSxNQUFJLGVBQWUsZUFBZTtBQUNoQyxTQUFLLE9BQU8sYUFBYSxhQUFhO0FBQUEsRUFDeEM7QUFFQSxRQUFNLFlBQVksYUFBYTtBQUMvQixRQUFNLFVBQVUsZ0JBQWdCLHdCQUF3QixTQUFTLFlBQVksQ0FBQztBQUM5RSxNQUFJLFdBQVc7QUFDYixZQUFRLDJCQUEyQjtBQUFBLEVBQ3JDO0FBRUEsUUFBTSxXQUFXLE1BQU0sTUFBTSwrQ0FBK0M7QUFBQSxJQUMxRSxhQUFhO0FBQUEsSUFDYixHQUFHO0FBQUEsSUFDSCxRQUFRO0FBQUEsSUFDUjtBQUFBLElBQ0EsTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUVELFFBQU0sTUFBTSxNQUFNLFNBQVMsS0FBSztBQUNoQyxRQUFNLGFBQWFBLFVBQVMsU0FBUyxRQUFRLElBQUksYUFBYSxDQUFDO0FBRS9ELE1BQUksQ0FBQyxTQUFTLElBQUk7QUFDaEIsVUFBTSxnQkFBZ0IsTUFBTTtBQUFBLE1BQzFCO0FBQUEsTUFDQSxTQUFTO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFDQSxRQUFJLGtCQUFrQixNQUFNO0FBQzFCLGFBQU87QUFBQSxJQUNUO0FBRUEsUUFBSSxTQUFTLFdBQVcsS0FBSztBQUMzQixZQUFNLElBQUksY0FBYyxzQkFBc0IsR0FBRyxLQUFLLHNCQUFzQixTQUFTLFFBQVEsR0FBRztBQUFBLElBQ2xHO0FBQUEsRUFDRjtBQUVBLFFBQU0sU0FBUyxhQUFhLEdBQUc7QUFDL0IsTUFBSSxDQUFDLFVBQVUsT0FBTyxXQUFXLFVBQVU7QUFDekMsUUFBSSxDQUFDLFNBQVMsSUFBSTtBQUNoQixZQUFNLElBQUksY0FBYyxzQkFBc0IsR0FBRyxLQUFLLG1CQUFtQixTQUFTLFFBQVEsR0FBRztBQUFBLElBQy9GO0FBQ0EsVUFBTSxJQUFJLGNBQWMsNEJBQTRCLFNBQVMsUUFBUSxHQUFHO0FBQUEsRUFDMUU7QUFFQSxTQUFPSSxvQ0FBbUM7QUFBQSxJQUN4QyxHQUFJO0FBQUEsSUFDSixZQUFZLFNBQVM7QUFBQSxJQUNyQixZQUFZLGNBQWM7QUFBQSxFQUM1QixDQUFDO0FBQ0g7QUFHTyxJQUFNLDJCQUEyQixPQUN0QyxTQUNBLFlBQ29DO0FBQ3BDLFFBQU0sVUFBVSxNQUFNLHdCQUF3QixPQUFPO0FBQ3JELFFBQU0sT0FBTyxPQUFPLFNBQVMsSUFBSTtBQUNqQyxRQUFNLGVBQWVKLFVBQVMsU0FBUyxTQUFTO0FBQ2hELFFBQU0sc0JBQXNCZSwwQkFBeUIsWUFBWTtBQUVqRSxNQUFJLGdCQUFnQixDQUFDLHFCQUFxQjtBQUN4QyxVQUFNLElBQUksY0FBYywrQkFBK0I7QUFBQSxFQUN6RDtBQUVBLE9BQUssU0FBUyxLQUFLLFNBQVMsTUFBTSxDQUFDLHFCQUFxQjtBQUN0RCxVQUFNLElBQUksY0FBYywrQkFBK0I7QUFBQSxFQUN6RDtBQUVBLFFBQU0sY0FBK0M7QUFBQSxJQUNuRCxHQUFHO0FBQUEsSUFDSCxXQUFXLHVCQUF1QjtBQUFBLElBQ2xDLFdBQVdJLGtDQUFpQyxTQUFTLFNBQVM7QUFBQSxFQUNoRTtBQUNBLFFBQU0sV0FBVyxNQUFNLFVBQWtDLGtDQUFrQztBQUFBLElBQ3pGLEdBQUc7QUFBQSxJQUNILFFBQVE7QUFBQSxJQUNSLFNBQVMsb0JBQW9CLFNBQVMsU0FBUyxJQUFJO0FBQUEsSUFDbkQsTUFBTSxLQUFLLFVBQVUsV0FBVztBQUFBLEVBQ2xDLENBQUM7QUFFRCxTQUFPaEIsc0JBQXFCLFFBQVE7QUFDdEM7QUFFQSxJQUFNLHVDQUF1QyxDQVczQyxZQUNHO0FBQ0gsUUFBTSxxQkFBcUJILFVBQVMsU0FBUyxlQUFlO0FBQzVELFFBQU0sbUJBQW1CQSxVQUFTLFNBQVMsYUFBYTtBQUN4RCxRQUFNLGtCQUFrQm9CLHlCQUF3QixrQkFBa0I7QUFDbEUsUUFBTSxnQkFBZ0JBLHlCQUF3QixnQkFBZ0I7QUFDOUQsTUFBSSxzQkFBc0IsQ0FBQyxpQkFBaUI7QUFDMUMsVUFBTSxJQUFJLGNBQWMsK0JBQStCO0FBQUEsRUFDekQ7QUFDQSxNQUFJLG9CQUFvQixDQUFDLGVBQWU7QUFDdEMsVUFBTSxJQUFJLGNBQWMsK0JBQStCO0FBQUEsRUFDekQ7QUFFQSxRQUFNLHFCQUFxQnBCLFVBQVMsU0FBUyxhQUFhLFNBQVMsTUFBTTtBQUN6RSxRQUFNLGVBQWVBLFVBQVMsU0FBUyxVQUFVLGtCQUFrQjtBQUVuRSxTQUFPO0FBQUEsSUFDTCxpQkFBaUIsbUJBQW1CO0FBQUEsSUFDcEMsZUFBZSxpQkFBaUI7QUFBQSxJQUNoQyxXQUFXLHNCQUFzQjtBQUFBLElBQ2pDLFFBQVEsZ0JBQWdCO0FBQUEsSUFDeEIsY0FBY0EsVUFBUyxTQUFTLFlBQVksRUFBRSxZQUFZLEtBQUs7QUFBQSxJQUMvRCxXQUFXcUIsOEJBQTZCLFNBQVMsU0FBUztBQUFBLElBQzFELGVBQWV6QixzQ0FBcUMsU0FBUyxhQUFhO0FBQUEsRUFDNUU7QUFDRjtBQUVBLElBQU0sbUNBQW1DLENBYXZDLFlBQ0c7QUFDSCxTQUFPO0FBQUEsSUFDTCxNQUFNLE9BQU8sU0FBUyxTQUFTLElBQUksS0FBSyxPQUFPLFFBQVEsSUFBSSxJQUFJLElBQUksS0FBSyxNQUFNLE9BQU8sUUFBUSxJQUFJLENBQUMsSUFBSTtBQUFBLElBQ3RHLFVBQVUsT0FBTyxTQUFTLFNBQVMsUUFBUSxLQUFLLE9BQU8sUUFBUSxRQUFRLElBQUksSUFBSSxLQUFLLE1BQU0sT0FBTyxRQUFRLFFBQVEsQ0FBQyxJQUFJO0FBQUEsSUFDdEgsR0FBRyxxQ0FBcUMsT0FBTztBQUFBLEVBQ2pEO0FBQ0Y7QUFHTyxJQUFNLCtCQUErQixPQUMxQyxTQUNBLFlBQzZEO0FBQzdELFFBQU0sRUFBRSxrQkFBa0IsR0FBRyxZQUFZLElBQUksV0FBVyxDQUFDO0FBQ3pELFFBQU0sVUFBVSxNQUFNLHdCQUF3QixXQUFXO0FBQ3pELFFBQU0sY0FBNkM7QUFBQSxJQUNqRCxHQUFHLGlDQUFpQyxPQUFPO0FBQUEsSUFDM0MsUUFBUTBCLCtCQUE4QixTQUFTLE1BQU07QUFBQSxFQUN2RDtBQUVBLFFBQU0sV0FBVyxNQUFNO0FBQUEsSUFDckI7QUFBQSxJQUNBO0FBQUEsTUFDRSxHQUFHO0FBQUEsTUFDSCxRQUFRO0FBQUEsTUFDUixTQUFTLHVCQUF1QixTQUFTLGFBQWEsZ0JBQWdCO0FBQUEsTUFDdEUsTUFBTSxLQUFLLFVBQVUsV0FBVztBQUFBLElBQ2xDO0FBQUEsRUFDRjtBQUVBLFNBQU9mLGtDQUFpQyxRQUFRO0FBQ2xEO0FBR08sSUFBTSxrQ0FBa0MsT0FDN0MsU0FDQSxZQUNpRTtBQUNqRSxRQUFNLEVBQUUsa0JBQWtCLEdBQUcsWUFBWSxJQUFJLFdBQVcsQ0FBQztBQUN6RCxRQUFNLFVBQVUsTUFBTSx3QkFBd0IsV0FBVztBQUN6RCxRQUFNLGNBQWlEO0FBQUEsSUFDckQsR0FBRyxpQ0FBaUMsT0FBTztBQUFBLEVBQzdDO0FBRUEsUUFBTSxXQUFXLE1BQU07QUFBQSxJQUNyQjtBQUFBLElBQ0E7QUFBQSxNQUNFLEdBQUc7QUFBQSxNQUNILFFBQVE7QUFBQSxNQUNSLFNBQVMsdUJBQXVCLFNBQVMsYUFBYSxnQkFBZ0I7QUFBQSxNQUN0RSxNQUFNLEtBQUssVUFBVSxXQUFXO0FBQUEsSUFDbEM7QUFBQSxFQUNGO0FBRUEsU0FBT0Msc0NBQXFDLFFBQVE7QUFDdEQ7QUFHTyxJQUFNLDhCQUE4QixPQUN6QyxTQUNBLFlBQ2lFO0FBQ2pFLFFBQU0sRUFBRSxrQkFBa0IsR0FBRyxZQUFZLElBQUksV0FBVyxDQUFDO0FBQ3pELFFBQU0sVUFBVSxNQUFNLHdCQUF3QixXQUFXO0FBQ3pELFFBQU0sZ0JBQWdCLFNBQVMsa0JBQWtCLGFBQWEsYUFBYTtBQUMzRSxRQUFNLFlBQVksTUFBTSxRQUFRLFNBQVMsU0FBUyxJQUM5QyxRQUFRLFVBQVUsSUFBSSxDQUFDLFVBQVVSLFVBQVMsS0FBSyxDQUFDLEVBQUUsT0FBTyxPQUFPLElBQ2hFLENBQUM7QUFDTCxRQUFNLGNBQWMsTUFBTSxRQUFRLFNBQVMsV0FBVyxJQUNsRCxRQUFRLFlBQVksSUFBSSxDQUFDLFVBQVVBLFVBQVMsS0FBSyxDQUFDLEVBQUUsT0FBTyxPQUFPLElBQ2xFLENBQUM7QUFFTCxRQUFNLGNBQWlEO0FBQUEsSUFDckQsZ0JBQWdCQSxVQUFTLFNBQVMsY0FBYztBQUFBLElBQ2hEO0FBQUEsSUFDQSxXQUFXLGtCQUFrQixhQUFhLFlBQVk7QUFBQSxJQUN0RCxTQUNFLGtCQUFrQixjQUFjLFNBQVMsVUFDckM7QUFBQSxNQUNFLEdBQUcscUNBQXFDLFFBQVEsT0FBTztBQUFBLElBQ3pELElBQ0E7QUFBQSxJQUNOLGFBQWEsa0JBQWtCLGFBQWEsY0FBYztBQUFBLEVBQzVEO0FBRUEsUUFBTSxXQUFXLE1BQU07QUFBQSxJQUNyQjtBQUFBLElBQ0E7QUFBQSxNQUNFLEdBQUc7QUFBQSxNQUNILFFBQVE7QUFBQSxNQUNSLFNBQVMsdUJBQXVCLFNBQVMsYUFBYSxnQkFBZ0I7QUFBQSxNQUN0RSxNQUFNLEtBQUssVUFBVSxXQUFXO0FBQUEsSUFDbEM7QUFBQSxFQUNGO0FBRUEsU0FBT1UsaUNBQWdDLFFBQVE7QUFDakQ7QUFHTyxJQUFNLDBCQUEwQixPQUNyQyxRQUNBLFlBQzJEO0FBQzNELFFBQU0sVUFBVSxNQUFNLHdCQUF3QixPQUFPO0FBQ3JELFFBQU0sYUFBYSxtQkFBbUIsT0FBTyxVQUFVLEVBQUUsRUFBRSxLQUFLLENBQUM7QUFDakUsUUFBTSxXQUFXLE1BQU07QUFBQSxJQUNyQixrQ0FBa0MsVUFBVTtBQUFBLElBQzVDO0FBQUEsTUFDRSxHQUFHO0FBQUEsTUFDSCxRQUFRO0FBQUEsTUFDUixTQUFTLG9CQUFvQixTQUFTLE9BQU87QUFBQSxJQUMvQztBQUFBLEVBQ0Y7QUFFQSxTQUFPRCxvQ0FBbUMsUUFBUTtBQUNwRDtBQUdPLElBQU0scUNBQXFDLE9BQ2hELFFBQ0EsU0FDQSxZQUNrQjtBQUNsQixRQUFNLGFBQWFULFVBQVMsTUFBTTtBQUNsQyxRQUFNLGNBQWNBLFVBQVMsT0FBTztBQUNwQyxNQUFJLENBQUMsY0FBYyxDQUFDLGFBQWE7QUFDL0IsVUFBTSxJQUFJLGNBQWMsaUNBQWlDO0FBQUEsRUFDM0Q7QUFFQSxRQUFNLEVBQUUseUJBQXlCLDBCQUEwQixHQUFHLGFBQWEsSUFBSSxXQUFXLENBQUM7QUFDM0YsUUFBTSxVQUFVLE1BQU0sd0JBQXdCLE9BQU87QUFDckQsUUFBTSxZQUFZLGFBQWE7QUFDL0IsUUFBTSxVQUFVLGdCQUFnQixvQkFBb0IsU0FBUyxjQUFjLElBQUksQ0FBQztBQUNoRixVQUFRLFNBQVM7QUFDakIsUUFBTSxpQkFBOEI7QUFBQSxJQUNsQyxRQUFRO0FBQUEsSUFDUixHQUFHO0FBQUEsRUFDTDtBQUVBLE1BQUksV0FBVztBQUNiLElBQUMsZUFBMEMsMEJBQTBCLElBQUk7QUFBQSxFQUMzRTtBQUVBLFFBQU0sV0FBVyxNQUFNLE1BQU0sMENBQTBDO0FBQUEsSUFDckUsYUFBYTtBQUFBLElBQ2IsR0FBRztBQUFBLElBQ0gsUUFBUTtBQUFBLElBQ1IsU0FBUztBQUFBLElBQ1QsTUFBTSxLQUFLLFVBQVU7QUFBQSxNQUNuQixRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsSUFDWCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsTUFBSSxDQUFDLFNBQVMsSUFBSTtBQUNoQixVQUFNLE1BQU0sTUFBTSxTQUFTLEtBQUs7QUFDaEMsVUFBTSxnQkFBZ0IsTUFBTSxxQkFBMkIsS0FBSyxTQUFTLFFBQVEsZ0JBQWdCO0FBQzdGLFFBQUksa0JBQWtCLE1BQU07QUFDMUIsYUFBTztBQUFBLElBQ1Q7QUFDQSxVQUFNLFVBQVUsc0JBQXNCLEdBQUc7QUFDekMsVUFBTSxJQUFJLGNBQWMsV0FBVyxrQ0FBa0MsU0FBUyxRQUFRLEdBQUc7QUFBQSxFQUMzRjtBQUVBLFFBQU0sT0FBTyxNQUFNLFNBQVMsS0FBSztBQUNqQyxNQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsR0FBRztBQUM1QixVQUFNLElBQUksY0FBYyxnQ0FBZ0M7QUFBQSxFQUMxRDtBQUVBLFNBQU87QUFDVDtBQUdPLElBQU0sMkJBQTJCLE9BQ3RDLFFBQ0EsU0FDQSxZQUNvQztBQUNwQyxRQUFNLFVBQVUsTUFBTSx3QkFBd0IsT0FBTztBQUNyRCxRQUFNLGFBQWEsbUJBQW1CLE9BQU8sVUFBVSxFQUFFLEVBQUUsS0FBSyxDQUFDO0FBQ2pFLFFBQU0sZUFBZUEsVUFBUyxTQUFTLFNBQVM7QUFDaEQsUUFBTSxzQkFBc0JlLDBCQUF5QixZQUFZO0FBRWpFLE1BQUksZ0JBQWdCLENBQUMscUJBQXFCO0FBQ3hDLFVBQU0sSUFBSSxjQUFjLCtCQUErQjtBQUFBLEVBQ3pEO0FBRUEsUUFBTSxjQUErQztBQUFBLElBQ25ELEdBQUc7QUFBQSxJQUNILFdBQVcsdUJBQXVCO0FBQUEsSUFDbEMsV0FBV0ksa0NBQWlDLFNBQVMsU0FBUztBQUFBLEVBQ2hFO0FBQ0EsUUFBTSxXQUFXLE1BQU0sVUFBa0Msa0NBQWtDLFVBQVUsSUFBSTtBQUFBLElBQ3ZHLEdBQUc7QUFBQSxJQUNILFFBQVE7QUFBQSxJQUNSLFNBQVMsb0JBQW9CLFNBQVMsU0FBUyxJQUFJO0FBQUEsSUFDbkQsTUFBTSxLQUFLLFVBQVUsV0FBVztBQUFBLEVBQ2xDLENBQUM7QUFFRCxTQUFPaEIsc0JBQXFCLFFBQVE7QUFDdEM7QUFHTyxJQUFNLDJCQUEyQixPQUN0QyxRQUNBLFdBQ0EsWUFDa0M7QUFDbEMsUUFBTSxVQUFVLE1BQU0sd0JBQXdCLE9BQU87QUFDckQsUUFBTSxhQUFhLG1CQUFtQixPQUFPLFVBQVUsRUFBRSxFQUFFLEtBQUssQ0FBQztBQUNqRSxRQUFNLFFBQVEsSUFBSSxnQkFBZ0I7QUFDbEMsTUFBSSxPQUFPLFVBQVUsT0FBTyxTQUFTLENBQUMsS0FBSyxPQUFPLFNBQVMsSUFBSSxHQUFHO0FBQ2hFLFVBQU0sSUFBSSxhQUFhLE9BQU8sU0FBUyxDQUFDO0FBQUEsRUFDMUM7QUFFQSxRQUFNLFNBQVMsTUFBTSxTQUFTO0FBQzlCLFFBQU0sTUFBTSxTQUNSLGtDQUFrQyxVQUFVLElBQUksTUFBTSxLQUN0RCxrQ0FBa0MsVUFBVTtBQUNoRCxRQUFNLFdBQVcsTUFBTSxVQUFnQyxLQUFLO0FBQUEsSUFDMUQsR0FBRztBQUFBLElBQ0gsUUFBUTtBQUFBLElBQ1IsU0FBUyxvQkFBb0IsU0FBUyxPQUFPO0FBQUEsRUFDL0MsQ0FBQztBQUVELFNBQU9BLHNCQUFxQixRQUFRO0FBQ3RDO0FBR08sSUFBTSw0QkFBNEIsT0FDdkMsUUFDQSxTQUNBLFlBQ29DO0FBQ3BDLFFBQU0sVUFBVSxNQUFNLHdCQUF3QixPQUFPO0FBQ3JELFFBQU0sYUFBYSxtQkFBbUIsT0FBTyxVQUFVLEVBQUUsRUFBRSxLQUFLLENBQUM7QUFDakUsUUFBTSxhQUFjLFdBQVcsQ0FBQztBQUNoQyxRQUFNLGNBQTJDO0FBQUEsSUFDL0MsR0FBRztBQUFBLEVBQ0w7QUFDQSxRQUFNLHNCQUFzQlksMEJBQXlCLFdBQVcsU0FBUztBQUN6RSxNQUFJLENBQUMscUJBQXFCO0FBQ3hCLFVBQU0sSUFBSSxjQUFjLCtCQUErQjtBQUFBLEVBQ3pEO0FBQ0EsY0FBWSxZQUFZO0FBRXhCLFFBQU0sWUFBWUksa0NBQWlDLFdBQVcsU0FBUztBQUN2RSxNQUFJLGNBQWMsUUFBVztBQUMzQixXQUFPLFlBQVk7QUFBQSxFQUNyQixPQUFPO0FBQ0wsZ0JBQVksWUFBWTtBQUFBLEVBQzFCO0FBRUEsUUFBTSxXQUFXLE1BQU0sVUFBa0Msa0NBQWtDLFVBQVUsT0FBTztBQUFBLElBQzFHLEdBQUc7QUFBQSxJQUNILFFBQVE7QUFBQSxJQUNSLFNBQVMsb0JBQW9CLFNBQVMsU0FBUyxJQUFJO0FBQUEsSUFDbkQsTUFBTSxLQUFLLFVBQVUsV0FBVztBQUFBLEVBQ2xDLENBQUM7QUFFRCxTQUFPaEIsc0JBQXFCLFFBQVE7QUFDdEM7QUFHTyxJQUFNLCtCQUErQixPQUMxQyxRQUNBLFNBQ0EsWUFDb0M7QUFDcEMsTUFBSSxDQUFDSCxVQUFTLFNBQVMsV0FBVyxLQUFLLENBQUNpQixrQkFBaUIsU0FBUyxHQUFHLEtBQUssQ0FBQ0Esa0JBQWlCLFNBQVMsS0FBSyxHQUFHO0FBQzNHLFVBQU0sSUFBSSxjQUFjLGtEQUFrRDtBQUFBLEVBQzVFO0FBRUEsUUFBTSxVQUFVLE1BQU0sd0JBQXdCLE9BQU87QUFDckQsUUFBTSxhQUFhLG1CQUFtQixPQUFPLFVBQVUsRUFBRSxFQUFFLEtBQUssQ0FBQztBQUNqRSxRQUFNLFdBQVcsTUFBTSxVQUFrQyxrQ0FBa0MsVUFBVSxVQUFVO0FBQUEsSUFDN0csR0FBRztBQUFBLElBQ0gsUUFBUTtBQUFBLElBQ1IsU0FBUyxvQkFBb0IsU0FBUyxTQUFTLElBQUk7QUFBQSxJQUNuRCxNQUFNLEtBQUssVUFBVSxPQUFPO0FBQUEsRUFDOUIsQ0FBQztBQUVELFNBQU9kLHNCQUFxQixRQUFRO0FBQ3RDO0FBR08sSUFBTSwrQkFBK0IsT0FDMUMsUUFDQSxXQUNBLFNBQ0EsWUFDb0M7QUFDcEMsTUFBSSxDQUFDSCxVQUFTLFNBQVMsV0FBVyxLQUFLLENBQUNpQixrQkFBaUIsU0FBUyxHQUFHLEtBQUssQ0FBQ0Esa0JBQWlCLFNBQVMsS0FBSyxHQUFHO0FBQzNHLFVBQU0sSUFBSSxjQUFjLGtEQUFrRDtBQUFBLEVBQzVFO0FBRUEsUUFBTSxVQUFVLE1BQU0sd0JBQXdCLE9BQU87QUFDckQsUUFBTSxhQUFhLG1CQUFtQixPQUFPLFVBQVUsRUFBRSxFQUFFLEtBQUssQ0FBQztBQUNqRSxRQUFNLGFBQWEsbUJBQW1CLE9BQU8sYUFBYSxFQUFFLEVBQUUsS0FBSyxDQUFDO0FBQ3BFLFFBQU0sV0FBVyxNQUFNO0FBQUEsSUFDckIsa0NBQWtDLFVBQVUsVUFBVSxVQUFVO0FBQUEsSUFDaEU7QUFBQSxNQUNFLEdBQUc7QUFBQSxNQUNILFFBQVE7QUFBQSxNQUNSLFNBQVMsb0JBQW9CLFNBQVMsU0FBUyxJQUFJO0FBQUEsTUFDbkQsTUFBTSxLQUFLLFVBQVUsT0FBTztBQUFBLElBQzlCO0FBQUEsRUFDRjtBQUVBLFNBQU9kLHNCQUFxQixRQUFRO0FBQ3RDO0FBR08sSUFBTSwrQkFBK0IsT0FDMUMsUUFDQSxXQUNBLFlBQ2tDO0FBQ2xDLFFBQU0sVUFBVSxNQUFNLHdCQUF3QixPQUFPO0FBQ3JELFFBQU0sYUFBYSxtQkFBbUIsT0FBTyxVQUFVLEVBQUUsRUFBRSxLQUFLLENBQUM7QUFDakUsUUFBTSxhQUFhLG1CQUFtQixPQUFPLGFBQWEsRUFBRSxFQUFFLEtBQUssQ0FBQztBQUNwRSxRQUFNLFdBQVcsTUFBTTtBQUFBLElBQ3JCLGtDQUFrQyxVQUFVLFVBQVUsVUFBVTtBQUFBLElBQ2hFO0FBQUEsTUFDRSxHQUFHO0FBQUEsTUFDSCxRQUFRO0FBQUEsTUFDUixTQUFTLG9CQUFvQixTQUFTLE9BQU87QUFBQSxJQUMvQztBQUFBLEVBQ0Y7QUFFQSxTQUFPQSxzQkFBcUIsUUFBUTtBQUN0QztBQUdPLElBQU0sK0JBQStCLE9BQzFDLFFBQ0EsTUFDQSxXQUNBLFlBQ29DO0FBQ3BDLFFBQU0sVUFBVSxNQUFNLHdCQUF3QixPQUFPO0FBQ3JELFFBQU0sYUFBYSxtQkFBbUIsT0FBTyxVQUFVLEVBQUUsRUFBRSxLQUFLLENBQUM7QUFDakUsUUFBTSxnQkFBZ0JILFVBQVMsU0FBUyxFQUFFLFFBQVEsT0FBTyxFQUFFO0FBQzNELFFBQU0sUUFBUSxJQUFJLGdCQUFnQjtBQUNsQyxNQUFJLGVBQWU7QUFDakIsVUFBTSxJQUFJLGFBQWEsYUFBYTtBQUFBLEVBQ3RDO0FBRUEsUUFBTSxTQUFTLE1BQU0sU0FBUztBQUM5QixRQUFNLE1BQU0sU0FDUixrQ0FBa0MsVUFBVSxTQUFTLE1BQU0sS0FDM0Qsa0NBQWtDLFVBQVU7QUFDaEQsUUFBTSxPQUFPLElBQUksU0FBUztBQUMxQixNQUFJLGdCQUFnQixNQUFNO0FBQ3hCLFNBQUssT0FBTyxRQUFRLE1BQU1BLFVBQVMsS0FBSyxJQUFJLEtBQUssVUFBVSxpQkFBaUIsS0FBSyxFQUFFO0FBQUEsRUFDckYsT0FBTztBQUNMLFNBQUssT0FBTyxRQUFRLE1BQU0sVUFBVSxpQkFBaUIsS0FBSyxFQUFFO0FBQUEsRUFDOUQ7QUFFQSxRQUFNLFdBQVcsTUFBTSxVQUFrQyxLQUFLO0FBQUEsSUFDNUQsR0FBRztBQUFBLElBQ0gsUUFBUTtBQUFBLElBQ1IsU0FBUyx3QkFBd0IsU0FBUyxPQUFPO0FBQUEsSUFDakQsTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUVELFNBQU9HLHNCQUFxQixRQUFRO0FBQ3RDO0FBR08sSUFBTSwrQkFBK0IsT0FDMUMsUUFDQSxZQUNrQztBQUNsQyxRQUFNLFVBQVUsTUFBTSx3QkFBd0IsT0FBTztBQUNyRCxRQUFNLGFBQWEsbUJBQW1CLE9BQU8sVUFBVSxFQUFFLEVBQUUsS0FBSyxDQUFDO0FBQ2pFLFFBQU0sV0FBVyxNQUFNLFVBQWdDLGtDQUFrQyxVQUFVLFNBQVM7QUFBQSxJQUMxRyxHQUFHO0FBQUEsSUFDSCxRQUFRO0FBQUEsSUFDUixTQUFTLG9CQUFvQixTQUFTLE9BQU87QUFBQSxFQUMvQyxDQUFDO0FBRUQsU0FBT0Esc0JBQXFCLFFBQVE7QUFDdEM7QUFHTyxJQUFNLHVCQUF1QixPQUNsQyxNQUNBLE1BQ0EsVUFDQSxZQUNxQztBQUNyQyxRQUFNLFdBQVcsbUJBQW1CLE9BQU8sUUFBUSxFQUFFLENBQUM7QUFDdEQsUUFBTSxXQUFXLE9BQU8sU0FBUyxJQUFJLEtBQUssT0FBTyxJQUFJLEtBQUssTUFBTSxJQUFJLElBQUk7QUFDeEUsUUFBTSxlQUFlLE9BQU8sU0FBUyxRQUFRLEtBQUssV0FBVyxJQUFJLEtBQUssTUFBTSxRQUFRLElBQUk7QUFFeEYsU0FBTztBQUFBLElBQ0wsdUNBQXVDLFFBQVEsU0FBUyxRQUFRLGFBQWEsWUFBWTtBQUFBLElBQ3pGO0FBQUEsTUFDRSxRQUFRO0FBQUEsTUFDUixHQUFHO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFsic2FmZVRleHQiLCAidG9OdWxsYWJsZU51bWJlciIsICJpc05vbk5lZ2F0aXZlTnVtYmVyIiwgImlzUG9zaXRpdmVOdW1iZXIiLCAibm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUiLCAibm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZSIsICJub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1cyIsICJub3JtYWxpemVPcHRpb25hbEFwaURhdGUiLCAibm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlIiwgIm5vcm1hbGl6ZVRpY2tldExpc3REYXRlIiwgIm5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSSIsICJub3JtYWxpemVFeHBlbnNlU2hlZXRMaXN0U3RhdHVzRmlsdGVyIiwgInRvRmxhZ0Jvb2wiLCAicmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lIiwgInNhZmVUZXh0IiwgIm5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlIiwgIm5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplQXBpUmVzcG9uc2UiLCAibm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZSIsICJub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVUaWNrZXRMaW5rTGlzdFBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVUaWNrZXRMaW5rQnVsa1Jlc3BvbnNlIiwgInRvTnVsbGFibGVOdW1iZXIiLCAibWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmQiLCAibWFwRXhwZW5zZVNoZWV0SGVhZGVyIiwgIm1hcEV4cGVuc2VTaGVldExpbmUiLCAibm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlIiwgIm5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZSIsICJpc1Bvc2l0aXZlTnVtYmVyIiwgImlzTm9uTmVnYXRpdmVOdW1iZXIiLCAibm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUiLCAibm9ybWFsaXplVGlja2V0TGlzdERhdGUiLCAibm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZSIsICJub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1cyJdCn0K
