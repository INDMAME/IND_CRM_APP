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
  parseExpenseApiDate,
  safeText,
  toFlagBool,
  toNullableBool,
  toNullableGastoTypeCode,
  toNullableNumber,
  toNullableTicketStatusCode
} from "./chunk-7CXSZQJB.js";
import {
  ApiFetchError,
  fetchJson,
  getCsrfToken,
  handleApiAuthFailure,
  indT,
  readApiMessageFromRaw
} from "./chunk-5TAE4PEJ.js";

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
var sanitizeAssistantText = (value) => {
  const source = safeText2(value);
  if (!source) return "";
  return source.normalize("NFC").replace(/\uFEFF/g, "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").replace(/[\u200B-\u200D\u2060]/g, "").replace(/\r\n?/g, "\n").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
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
var safeText3 = safeText;
var toNullableNumber2 = toNullableNumber;
var isNonNegativeNumber2 = isNonNegativeNumber;
var isPositiveNumber2 = isPositiveNumber;
var normalizeOptionalTicketGastoType2 = normalizeOptionalTicketGastoType;
var normalizeTicketListGastoType2 = normalizeTicketListGastoType;
var normalizeOptionalTicketStatus2 = normalizeOptionalTicketStatus;
var normalizeOptionalApiDate2 = normalizeOptionalApiDate;
var normalizeRequiredApiDate2 = normalizeRequiredApiDate;
var normalizeTicketListDate2 = normalizeTicketListDate;
var toNullableBool2 = toNullableBool;
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
var normalizeAxUserIdHeader = (value) => {
  const normalized = safeText3(value);
  if (!normalized) return "";
  const firstToken = normalized.split("-")[0];
  return safeText3(firstToken);
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
var tryParseJson = (raw) => {
  if (!raw || !raw.trim()) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};
var cloneJsonCompatibleValue = (value) => {
  if (value === void 0 || value === null) {
    return value;
  }
  return JSON.parse(JSON.stringify(value));
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
  if (safeText3(context.token)) {
    merged.Authorization = `Bearer ${context.token}`;
  }
  if (safeText3(context.companyId)) {
    merged["X-IND-Company"] = context.companyId;
  }
  if (includeAxUserId) {
    const requestAxUserId = getHeaderValue(options?.headers, "X-IND-AxUserId");
    const overrideAxUserId = getExpenseActingUserOverride();
    const resolvedAxUserId = safeText3(requestAxUserId || overrideAxUserId || context.axUserId);
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
var mapEntraContextCompany = (item) => {
  if (!item || typeof item !== "object") return null;
  const raw = item;
  const companyId = safeText3(raw.CompanyId ?? raw.companyId);
  if (!companyId) return null;
  return {
    companyId,
    isDefault: toFlagBool2(raw.IsDefault ?? raw.isDefault) === true,
    allowSelfManagement: toFlagBool2(raw.AllowSelfManagement ?? raw.allowSelfManagement) === true,
    crmUserId: safeText3(raw.CrmUserId ?? raw.crmUserId)
  };
};
var validateContextResponse = (response) => {
  const rawResponse = response;
  const isSuccess = toFlagBool2(rawResponse.Success ?? rawResponse.success);
  if (isSuccess === false) {
    throw new ApiFetchError(safeText3(rawResponse.Message ?? rawResponse.message) || "Could not load Entra context.");
  }
  const items = Array.isArray(rawResponse.Items) ? rawResponse.Items : Array.isArray(rawResponse.items) ? rawResponse.items : [];
  const first = items[0];
  const header = first?.Header ?? first?.header;
  if (!first || !header) {
    throw new ApiFetchError("Could not load Entra context.");
  }
  const axUserId = safeText3(header.AxUserId ?? header.axUserId);
  const defaultCompany = safeText3(header.DefaultCompany ?? header.defaultCompany);
  const defaultCurrencyCode = safeText3(header.DefaultCurrencyCode ?? header.defaultCurrencyCode);
  const companiesRaw = Array.isArray(first.Companies) ? first.Companies : Array.isArray(first.companies) ? first.companies : [];
  const companies = companiesRaw.map((item) => mapEntraContextCompany(item)).filter((item) => !!item);
  const selectedCompanyId = readWindowSelectedCompany();
  const selectedCompanyMatch = selectedCompanyId ? companies.find((item) => safeText3(item.companyId).toUpperCase() === selectedCompanyId) : null;
  if (selectedCompanyId && !selectedCompanyMatch) {
    throw new ApiFetchError(
      indT(
        "Expense_Context_SelectedCompanyUnavailable",
        "The selected company is no longer available. Please choose it again from the main menu."
      )
    );
  }
  const fallbackCompany = safeText3(companies.find((item) => item.isDefault)?.companyId);
  const companyId = selectedCompanyMatch?.companyId || resolveEffectiveCompanyId("", companies, defaultCompany || fallbackCompany);
  const selectedCompany = selectedCompanyMatch || companies.find((item) => safeText3(item.companyId) === companyId) || companies[0];
  const allowSelfManagement = selectedCompany?.allowSelfManagement === true;
  const crmUserId = safeText3(selectedCompany?.crmUserId);
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
      if (safeText3(seed.entraOid)) {
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
    companyId: safeText3(context.companyId).toUpperCase(),
    axUserId: safeText3(context.axUserId),
    crmUserId: safeText3(context.crmUserId),
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
    includeSubordinates: payload.includeSubordinates === true,
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
    UserName: safeText3(item.userName) || null,
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
var buildTicketListHeaders = (context, options, axUserIdOverride) => {
  const headers = sanitizeHeaders(buildExpenseHeaders(context, options, true, false));
  const normalizedOverrideAxUserId = normalizeAxUserIdHeader(axUserIdOverride);
  const resolvedAxUserId = safeText3(normalizedOverrideAxUserId || context.axUserId);
  if (resolvedAxUserId) {
    headers["X-IND-AxUserId"] = resolvedAxUserId;
  } else {
    removeHeaderValue(headers, "X-IND-AxUserId");
  }
  return headers;
};
var fetchExpenseSheetList = async (payload, options) => {
  const { axUserIdOverride, onRequestPrepared, onCapture, ...baseOptions } = options || {};
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
    expenseSheetStatus: normalizeExpenseSheetListStatusFilter2(payload.expenseSheetStatus),
    includeSubordinates: payload.includeSubordinates === true
  };
  const serializedPayload = cloneJsonCompatibleValue(safePayload);
  onRequestPrepared?.(serializedPayload);
  const context = await ensureExpenseApiContext(baseOptions);
  const listHeaders = sanitizeHeaders(buildExpenseHeaders(context, baseOptions, true, false));
  const normalizedOverrideAxUserId = normalizeAxUserIdHeader(axUserIdOverride);
  const resolvedAxUserId = safeText3(normalizedOverrideAxUserId || context.axUserId);
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
    onCapture?.({
      request: serializedPayload,
      response: cloneJsonCompatibleValue(response),
      axUserIdOverride: normalizedOverrideAxUserId || null,
      source: "api"
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
    onCapture?.({
      request: serializedPayload,
      response: cloneJsonCompatibleValue(mapped),
      axUserIdOverride: normalizedOverrideAxUserId || null,
      source: "legacy"
    });
    return normalizeListPagedResponse2(mapped);
  }
};
var normalizePositiveInteger = (value, fallbackValue) => {
  const parsedValue = Number(value);
  if (Number.isFinite(parsedValue) && parsedValue > 0) {
    return Math.floor(parsedValue);
  }
  return fallbackValue;
};
var fetchExpenseSheetListSourceJson = async (payload, options) => {
  const { seedResponse, ...baseOptions } = options || {};
  const fallbackPage = normalizePositiveInteger(payload?.page, 1);
  const fallbackPageSize = normalizePositiveInteger(payload?.pageSize, 50);
  const normalizedSeedResponse = seedResponse ? normalizeListPagedResponse2(cloneJsonCompatibleValue(seedResponse)) : null;
  const initialResponse = normalizedSeedResponse ?? await fetchExpenseSheetList(payload, baseOptions);
  const normalizedInitialResponse = normalizeListPagedResponse2(cloneJsonCompatibleValue(initialResponse));
  if (normalizedInitialResponse.Success === false) {
    throw new ApiFetchError(
      safeText3(normalizedInitialResponse.Message) || "Could not load the full expense sheet query."
    );
  }
  const totalRecordsRaw = Number(normalizedInitialResponse.Total);
  const totalRecords = Number.isFinite(totalRecordsRaw) && totalRecordsRaw >= 0 ? Math.floor(totalRecordsRaw) : normalizedInitialResponse.Items.length;
  const effectivePageSize = normalizePositiveInteger(normalizedInitialResponse.PageSize, fallbackPageSize);
  const totalPages = Math.max(1, Math.ceil(totalRecords / Math.max(1, effectivePageSize)));
  const currentPage = Math.min(
    totalPages,
    normalizePositiveInteger(normalizedInitialResponse.Page ?? fallbackPage, fallbackPage)
  );
  if (totalPages <= 1) {
    return {
      ...normalizedInitialResponse,
      Total: totalRecords,
      Page: 1,
      PageSize: effectivePageSize,
      Items: cloneJsonCompatibleValue(normalizedInitialResponse.Items)
    };
  }
  const itemsByPage = /* @__PURE__ */ new Map();
  itemsByPage.set(currentPage, cloneJsonCompatibleValue(normalizedInitialResponse.Items));
  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
    if (pageNumber === currentPage) {
      continue;
    }
    const pageResponse = await fetchExpenseSheetList(
      {
        ...payload,
        page: pageNumber,
        pageSize: effectivePageSize
      },
      baseOptions
    );
    if (pageResponse.Success === false) {
      throw new ApiFetchError(
        safeText3(pageResponse.Message) || `Could not load expense sheet page ${pageNumber}.`
      );
    }
    itemsByPage.set(pageNumber, cloneJsonCompatibleValue(pageResponse.Items));
  }
  const allItems = [];
  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
    const pageItems = itemsByPage.get(pageNumber);
    if (!Array.isArray(pageItems) || pageItems.length === 0) {
      continue;
    }
    allItems.push(...pageItems);
  }
  return {
    ...normalizedInitialResponse,
    Total: totalRecords,
    Page: 1,
    PageSize: effectivePageSize,
    Items: allItems
  };
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
var getExpenseSheetSubordinates = async (options) => {
  const context = await ensureExpenseApiContext(options);
  const headers = sanitizeHeaders(buildExpenseHeaders(context, options, false, false));
  const contextAxUserId = safeText3(context.axUserId);
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
var getExchangeRatePublicDirect = async (baseCurrency, targetCurrency, date, options) => {
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
var normalizeExpenseSheetsAskResponse = (response) => {
  const normalized = normalizeApiResponse2(response);
  const rawData = normalized?.Data;
  if (!rawData || typeof rawData !== "object") {
    return {
      ...normalized,
      Message: sanitizeAssistantText(normalized?.Message),
      HttpStatus: typeof response?.HttpStatus === "number" ? response.HttpStatus : void 0,
      RetryAfter: safeText3(response?.RetryAfter) || null
    };
  }
  const rawWarnings = rawData.Warnings ?? rawData.warnings;
  const rawFiltersApplied = rawData.FiltersApplied ?? rawData.filtersApplied;
  const isIgnorableAssistantWarning = (warning) => {
    const normalizedWarning = sanitizeAssistantText(warning).toLowerCase();
    if (!normalizedWarning) return true;
    return normalizedWarning.includes("sourcejson") && (normalizedWarning.includes("skipped") || normalizedWarning.includes("omit"));
  };
  return {
    ...normalized,
    Message: sanitizeAssistantText(normalized?.Message),
    HttpStatus: typeof response?.HttpStatus === "number" ? response.HttpStatus : void 0,
    RetryAfter: safeText3(response?.RetryAfter) || null,
    Data: {
      Answer: sanitizeAssistantText(
        rawData.Answer ?? rawData.answer
      ),
      Model: sanitizeAssistantText(
        rawData.Model ?? rawData.model
      ),
      SourceKey: sanitizeAssistantText(
        rawData.SourceKey ?? rawData.sourceKey
      ),
      FiltersApplied: rawFiltersApplied && typeof rawFiltersApplied === "object" ? cloneJsonCompatibleValue(rawFiltersApplied) : null,
      TotalSourceRecords: toNullableNumber2(
        rawData.TotalSourceRecords ?? rawData.totalSourceRecords
      ) ?? null,
      RecordsSentToModel: toNullableNumber2(
        rawData.RecordsSentToModel ?? rawData.recordsSentToModel
      ) ?? null,
      RetrievalMode: sanitizeAssistantText(
        rawData.RetrievalMode ?? rawData.retrievalMode
      ) || null,
      Truncated: toNullableBool2(
        rawData.Truncated ?? rawData.truncated
      ),
      Warnings: Array.isArray(rawWarnings) ? rawWarnings.map((entry) => sanitizeAssistantText(entry)).filter((entry) => entry && !isIgnorableAssistantWarning(entry)) : []
    }
  };
};
var askExpenseSheetsQuestion = async (payload, options) => {
  const question = safeText3(payload?.question);
  if (!question) {
    throw new ApiFetchError("question is required.");
  }
  const context = await ensureExpenseApiContext(options);
  const csrfToken = getCsrfToken();
  const headers = sanitizeHeaders(buildExpenseHeaders(context, options, true));
  if (csrfToken) {
    headers.RequestVerificationToken = csrfToken;
  }
  const safePayload = {
    question,
    answerInstructions: safeText3(payload?.answerInstructions) || void 0,
    listRequest: cloneJsonCompatibleValue(payload.listRequest),
    sourceJson: payload?.sourceJson === null || payload?.sourceJson === void 0 ? void 0 : cloneJsonCompatibleValue(payload.sourceJson)
  };
  const response = await fetch("/api/ia/service/expensesheets/ask", {
    credentials: "same-origin",
    ...options,
    method: "POST",
    headers,
    body: JSON.stringify(safePayload)
  });
  const raw = await response.text();
  const retryAfter = safeText3(response.headers.get("Retry-After"));
  if (!response.ok) {
    const reloginResult = await handleApiAuthFailure(raw, response.status, "expense-sheets-ask");
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
  return normalizeExpenseSheetsAskResponse({
    ...parsed,
    HttpStatus: response.status,
    RetryAfter: retryAfter || null
  });
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
var createExpenseSheetTicketQuick = async (payload, options) => {
  if (!payload?.ticketImage) {
    throw new ApiFetchError("ticketImage is required.");
  }
  const { suppressPermissionModal: _suppressPermissionModal, ...fetchOptions } = options || {};
  const context = await ensureExpenseApiContext(fetchOptions);
  const form = new FormData();
  const safeCurrencyCode = safeText3(payload?.currencyCode).toUpperCase();
  const safeDescription = safeText3(payload?.description);
  const safeComentario = safeText3(payload?.comentario);
  const safeSheetId = safeText3(payload?.existingHojaGastosId);
  const safeProjectId = safeText3(payload?.projectId);
  const ticketImage = payload.ticketImage;
  if (ticketImage instanceof File) {
    form.append("ticketImage", ticketImage, safeText3(ticketImage.name) || "ticket.jpg");
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
  const retryAfter = safeText3(response.headers.get("Retry-After"));
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
var normalizeTicketFilterCriteriaPayload = (payload) => {
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
  return {
    createdDateFrom: createdDateFrom || void 0,
    createdDateTo: createdDateTo || void 0,
    searchKey: preferredSearchKey || void 0,
    filter: legacyFilter || void 0,
    currencyCode: safeText3(payload?.currencyCode).toUpperCase() || void 0,
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
  const ticketIds = Array.isArray(payload?.ticketIds) ? payload.ticketIds.map((entry) => safeText3(entry)).filter(Boolean) : [];
  const excludedIds = Array.isArray(payload?.excludedIds) ? payload.excludedIds.map((entry) => safeText3(entry)).filter(Boolean) : [];
  const safePayload = {
    expenseSheetId: safeText3(payload?.expenseSheetId),
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
  const safeFileId = safeText3(fileId);
  const safeUrlFile = safeText3(urlFile);
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
var createExpenseSheetTicketLine = async (fileId, payload, options) => {
  if (!safeText3(payload?.description) || !isPositiveNumber2(payload?.qty) || !isPositiveNumber2(payload?.price)) {
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

export {
  safeText2 as safeText,
  sanitizeAssistantText,
  normalizeCardTitleText,
  hasAssignedVoucher,
  startOfDay,
  toIsoDate,
  parseExpenseDate,
  formatExpenseDisplayDate,
  formatExpenseDateParts,
  getExpenseApiContextSnapshot,
  configureExpenseApiAuth,
  mapExpenseSheetListItemToCard2 as mapExpenseSheetListItemToCard,
  mapExpenseSheetHeader2 as mapExpenseSheetHeader,
  mapExpenseSheetLine2 as mapExpenseSheetLine,
  fetchExpenseSheetList,
  fetchExpenseSheetListSourceJson,
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
  askExpenseSheetsQuestion,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlQXBpUmVzcG9uc2VOb3JtYWxpemVycy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VBcGlNYXBwZXJzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZVVpVXRpbHMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL2NvbXBhbnlTZWxlY3Rpb24udHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlQXBpLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7XHJcbiAgRXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8sXHJcbiAgRXhwZW5zZVNoZWV0RGV0YWlsRHRvLFxyXG4gIEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldERldGFpbER0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdEl0ZW1EdG8sXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8sXHJcbiAgRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8sXHJcbiAgSW5kQXBpUmVzcG9uc2UsXHJcbiAgSW5kUGFnZWRSZXNwb25zZSxcclxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgc2FmZVRleHQsXHJcbiAgdG9OdWxsYWJsZUJvb2wsXHJcbiAgdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUsXHJcbiAgdG9OdWxsYWJsZU51bWJlcixcclxuICB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZSxcclxufSBmcm9tIFwiLi9leHBlbnNlQXBpVHJhbnNmb3Jtcy50c1wiO1xyXG5pbXBvcnQgeyBub3JtYWxpemVFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZXMgfSBmcm9tIFwiLi9leHBlbnNlU3Vib3JkaW5hdGVNYXBwZXIudHNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz5cclxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz4gPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICAuLi5yZXNwb25zZSxcclxuICAgIEl0ZW1zOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXREZXRhaWxEdG8+XHJcbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0RGV0YWlsRHRvPiA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnJlc3BvbnNlLFxyXG4gICAgSXRlbXM6IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW10sXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVBcGlSZXNwb25zZSA9IDxUPihyZXNwb25zZTogSW5kQXBpUmVzcG9uc2U8VD4pOiBJbmRBcGlSZXNwb25zZTxUPiA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnJlc3BvbnNlLFxyXG4gICAgRXJyb3JzOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5FcnJvcnMpID8gcmVzcG9uc2UuRXJyb3JzIDogcmVzcG9uc2U/LkVycm9ycyA/PyBudWxsLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHRcclxuKTogRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgY29uc3QgcmF3RGF0YSA9IG5vcm1hbGl6ZWQ/LkRhdGE7XHJcbiAgaWYgKCFyYXdEYXRhIHx8IHR5cGVvZiByYXdEYXRhICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAuLi5ub3JtYWxpemVkLFxyXG4gICAgICBIdHRwU3RhdHVzOiB0eXBlb2YgcmVzcG9uc2U/Lkh0dHBTdGF0dXMgPT09IFwibnVtYmVyXCIgPyByZXNwb25zZS5IdHRwU3RhdHVzIDogdW5kZWZpbmVkLFxyXG4gICAgICBSZXRyeUFmdGVyOiBzYWZlVGV4dChyZXNwb25zZT8uUmV0cnlBZnRlcikgfHwgbnVsbCxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb25zdCByYXdTdGVwVHJhY2VJZHMgPVxyXG4gICAgKHJhd0RhdGEgYXMgeyBTdGVwVHJhY2VJZHM/OiB1bmtub3duOyBzdGVwVHJhY2VJZHM/OiB1bmtub3duIH0pLlN0ZXBUcmFjZUlkcyA/P1xyXG4gICAgKHJhd0RhdGEgYXMgeyBzdGVwVHJhY2VJZHM/OiB1bmtub3duIH0pLnN0ZXBUcmFjZUlkcztcclxuICBjb25zdCBzdGVwVHJhY2VJZHMgPSByYXdTdGVwVHJhY2VJZHMgJiYgdHlwZW9mIHJhd1N0ZXBUcmFjZUlkcyA9PT0gXCJvYmplY3RcIiA/IHJhd1N0ZXBUcmFjZUlkcyA6IG51bGw7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAuLi5ub3JtYWxpemVkLFxyXG4gICAgSHR0cFN0YXR1czogdHlwZW9mIHJlc3BvbnNlPy5IdHRwU3RhdHVzID09PSBcIm51bWJlclwiID8gcmVzcG9uc2UuSHR0cFN0YXR1cyA6IHVuZGVmaW5lZCxcclxuICAgIFJldHJ5QWZ0ZXI6IHNhZmVUZXh0KHJlc3BvbnNlPy5SZXRyeUFmdGVyKSB8fCBudWxsLFxyXG4gICAgRGF0YToge1xyXG4gICAgICBGaWxlSWQ6IHNhZmVUZXh0KChyYXdEYXRhIGFzIHsgRmlsZUlkPzogdW5rbm93bjsgZmlsZUlkPzogdW5rbm93biB9KS5GaWxlSWQgPz8gKHJhd0RhdGEgYXMgeyBmaWxlSWQ/OiB1bmtub3duIH0pLmZpbGVJZCksXHJcbiAgICAgIFVybEZpbGU6IHNhZmVUZXh0KFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgVXJsRmlsZT86IHVua25vd247IHVybEZpbGU/OiB1bmtub3duIH0pLlVybEZpbGUgPz8gKHJhd0RhdGEgYXMgeyB1cmxGaWxlPzogdW5rbm93biB9KS51cmxGaWxlXHJcbiAgICAgICksXHJcbiAgICAgIEZpbGVOYW1lOiBzYWZlVGV4dChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IEZpbGVOYW1lPzogdW5rbm93bjsgZmlsZU5hbWU/OiB1bmtub3duIH0pLkZpbGVOYW1lID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IGZpbGVOYW1lPzogdW5rbm93biB9KS5maWxlTmFtZVxyXG4gICAgICApLFxyXG4gICAgICBQcm9jZXNzZWRCeUFJOiB0b051bGxhYmxlQm9vbChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KS5Qcm9jZXNzZWRCeUFJID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pLnByb2Nlc3NlZEJ5QUlcclxuICAgICAgKSxcclxuICAgICAgTGlua2VkVG9TaGVldDpcclxuICAgICAgICB0b051bGxhYmxlQm9vbChcclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgTGlua2VkVG9TaGVldD86IHVua25vd247IGxpbmtlZFRvU2hlZXQ/OiB1bmtub3duIH0pLkxpbmtlZFRvU2hlZXQgPz9cclxuICAgICAgICAgICAgKHJhd0RhdGEgYXMgeyBsaW5rZWRUb1NoZWV0PzogdW5rbm93biB9KS5saW5rZWRUb1NoZWV0XHJcbiAgICAgICAgKSA9PT0gdHJ1ZSxcclxuICAgICAgSG9qYUdhc3Rvc0lkOlxyXG4gICAgICAgIHNhZmVUZXh0KFxyXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBIb2phR2FzdG9zSWQ/OiB1bmtub3duOyBob2phR2FzdG9zSWQ/OiB1bmtub3duIH0pLkhvamFHYXN0b3NJZCA/P1xyXG4gICAgICAgICAgICAocmF3RGF0YSBhcyB7IGhvamFHYXN0b3NJZD86IHVua25vd24gfSkuaG9qYUdhc3Rvc0lkXHJcbiAgICAgICAgKSB8fCBudWxsLFxyXG4gICAgICBDb21wbGV0ZWRTdGFnZTogc2FmZVRleHQoXHJcbiAgICAgICAgKHJhd0RhdGEgYXMgeyBDb21wbGV0ZWRTdGFnZT86IHVua25vd247IGNvbXBsZXRlZFN0YWdlPzogdW5rbm93biB9KS5Db21wbGV0ZWRTdGFnZSA/P1xyXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBjb21wbGV0ZWRTdGFnZT86IHVua25vd24gfSkuY29tcGxldGVkU3RhZ2VcclxuICAgICAgKSxcclxuICAgICAgU3RlcFRyYWNlSWRzOiBzdGVwVHJhY2VJZHNcclxuICAgICAgICA/IHtcclxuICAgICAgICAgICAgVGlja2V0Q3JlYXRlOiBzYWZlVGV4dChcclxuICAgICAgICAgICAgICAoc3RlcFRyYWNlSWRzIGFzIHsgVGlja2V0Q3JlYXRlPzogdW5rbm93bjsgdGlja2V0Q3JlYXRlPzogdW5rbm93biB9KS5UaWNrZXRDcmVhdGUgPz9cclxuICAgICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyB0aWNrZXRDcmVhdGU/OiB1bmtub3duIH0pLnRpY2tldENyZWF0ZVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBGaWxlVXBsb2FkOiBzYWZlVGV4dChcclxuICAgICAgICAgICAgICAoc3RlcFRyYWNlSWRzIGFzIHsgRmlsZVVwbG9hZD86IHVua25vd247IGZpbGVVcGxvYWQ/OiB1bmtub3duIH0pLkZpbGVVcGxvYWQgPz9cclxuICAgICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyBmaWxlVXBsb2FkPzogdW5rbm93biB9KS5maWxlVXBsb2FkXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIERyYWZ0RXh0cmFjdDogc2FmZVRleHQoXHJcbiAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IERyYWZ0RXh0cmFjdD86IHVua25vd247IGRyYWZ0RXh0cmFjdD86IHVua25vd24gfSkuRHJhZnRFeHRyYWN0ID8/XHJcbiAgICAgICAgICAgICAgICAoc3RlcFRyYWNlSWRzIGFzIHsgZHJhZnRFeHRyYWN0PzogdW5rbm93biB9KS5kcmFmdEV4dHJhY3RcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgVGlja2V0RmluYWxpemU6IHNhZmVUZXh0KFxyXG4gICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyBUaWNrZXRGaW5hbGl6ZT86IHVua25vd247IHRpY2tldEZpbmFsaXplPzogdW5rbm93biB9KS5UaWNrZXRGaW5hbGl6ZSA/P1xyXG4gICAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IHRpY2tldEZpbmFsaXplPzogdW5rbm93biB9KS50aWNrZXRGaW5hbGl6ZVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBTaGVldExpbms6IHNhZmVUZXh0KFxyXG4gICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyBTaGVldExpbms/OiB1bmtub3duOyBzaGVldExpbms/OiB1bmtub3duIH0pLlNoZWV0TGluayA/P1xyXG4gICAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IHNoZWV0TGluaz86IHVua25vd24gfSkuc2hlZXRMaW5rXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgOiBudWxsLFxyXG4gICAgfSxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz5cclxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4gPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICAuLi5yZXNwb25zZSxcclxuICAgIEl0ZW1zOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTx1bmtub3duPlxyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvPiA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEl0ZW1zID0gbm9ybWFsaXplRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVzKHJlc3BvbnNlPy5JdGVtcyk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAuLi5yZXNwb25zZSxcclxuICAgIEl0ZW1zOiBub3JtYWxpemVkSXRlbXMsXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz5cclxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz4gPT4ge1xyXG4gIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+ICh7XHJcbiAgICAuLi5pdGVtLFxyXG4gICAgU3RhdHVzOiB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZShcclxuICAgICAgKGl0ZW0gYXMgeyBTdGF0dXM/OiB1bmtub3duOyBzdGF0dXM/OiB1bmtub3duIH0pPy5TdGF0dXMgPz9cclxuICAgICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LnN0YXR1c1xyXG4gICAgKSxcclxuICAgIFByb2Nlc3NlZEJ5QUk6IHRvTnVsbGFibGVCb29sKFxyXG4gICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8uUHJvY2Vzc2VkQnlBSSA/P1xyXG4gICAgICAgIChpdGVtIGFzIHsgUHJvY2Vzc2VkQnlBST86IHVua25vd247IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pPy5wcm9jZXNzZWRCeUFJXHJcbiAgICApLFxyXG4gICAgR2FzdG9UeXBlOiB0b051bGxhYmxlR2FzdG9UeXBlQ29kZShcclxuICAgICAgKGl0ZW0gYXMgeyBHYXN0b1R5cGU/OiB1bmtub3duOyBnYXN0b1R5cGU/OiB1bmtub3duIH0pPy5HYXN0b1R5cGUgPz9cclxuICAgICAgICAoaXRlbSBhcyB7IEdhc3RvVHlwZT86IHVua25vd247IGdhc3RvVHlwZT86IHVua25vd24gfSk/Lmdhc3RvVHlwZVxyXG4gICAgKSxcclxuICB9KSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAuLi5yZXNwb25zZSxcclxuICAgIEl0ZW1zOiBub3JtYWxpemVkSXRlbXMsXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVUaWNrZXRMaW5rTGlzdFBhZ2VkUmVzcG9uc2UgPSAoXHJcbiAgcmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RJdGVtRHRvPlxyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0bz4gPT4ge1xyXG4gIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+ICh7XHJcbiAgICAuLi5pdGVtLFxyXG4gICAgUHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woXHJcbiAgICAgIChpdGVtIGFzIHsgUHJvY2Vzc2VkQnlBST86IHVua25vd247IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pPy5Qcm9jZXNzZWRCeUFJID8/XHJcbiAgICAgICAgKGl0ZW0gYXMgeyBQcm9jZXNzZWRCeUFJPzogdW5rbm93bjsgcHJvY2Vzc2VkQnlBST86IHVua25vd24gfSk/LnByb2Nlc3NlZEJ5QUlcclxuICAgICksXHJcbiAgICBHYXN0b1R5cGU6IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlKFxyXG4gICAgICAoaXRlbSBhcyB7IEdhc3RvVHlwZT86IHVua25vd247IGdhc3RvVHlwZT86IHVua25vd24gfSk/Lkdhc3RvVHlwZSA/P1xyXG4gICAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uZ2FzdG9UeXBlXHJcbiAgICApLFxyXG4gIH0pKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnJlc3BvbnNlLFxyXG4gICAgSXRlbXM6IG5vcm1hbGl6ZWRJdGVtcyxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2UgPSAoXHJcbiAgcmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvPlxyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldERldGFpbER0bz4gPT4ge1xyXG4gIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+ICh7XHJcbiAgICAuLi5pdGVtLFxyXG4gICAgU3RhdHVzOiB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZShcclxuICAgICAgKGl0ZW0gYXMgeyBTdGF0dXM/OiB1bmtub3duOyBzdGF0dXM/OiB1bmtub3duIH0pPy5TdGF0dXMgPz9cclxuICAgICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LnN0YXR1c1xyXG4gICAgKSxcclxuICAgIFByb2Nlc3NlZEJ5QUk6IHRvTnVsbGFibGVCb29sKFxyXG4gICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8uUHJvY2Vzc2VkQnlBSSA/P1xyXG4gICAgICAgIChpdGVtIGFzIHsgUHJvY2Vzc2VkQnlBST86IHVua25vd247IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pPy5wcm9jZXNzZWRCeUFJXHJcbiAgICApLFxyXG4gICAgSG9qYUdhc3Rvc0lkRGlzcGxheTogc2FmZVRleHQoXHJcbiAgICAgIChpdGVtIGFzIHsgSG9qYUdhc3Rvc0lkRGlzcGxheT86IHVua25vd247IGhvamFHYXN0b3NJZERpc3BsYXk/OiB1bmtub3duIH0pPy5Ib2phR2FzdG9zSWREaXNwbGF5ID8/XHJcbiAgICAgICAgKGl0ZW0gYXMgeyBIb2phR2FzdG9zSWREaXNwbGF5PzogdW5rbm93bjsgaG9qYUdhc3Rvc0lkRGlzcGxheT86IHVua25vd24gfSk/LmhvamFHYXN0b3NJZERpc3BsYXlcclxuICAgICksXHJcbiAgICBHYXN0b1R5cGU6IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlKFxyXG4gICAgICAoaXRlbSBhcyB7IEdhc3RvVHlwZT86IHVua25vd247IGdhc3RvVHlwZT86IHVua25vd24gfSk/Lkdhc3RvVHlwZSA/P1xyXG4gICAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uZ2FzdG9UeXBlXHJcbiAgICApLFxyXG4gICAgTGluZXM6IEFycmF5LmlzQXJyYXkoaXRlbT8uTGluZXMpID8gaXRlbS5MaW5lcyA6IFtdLFxyXG4gIH0pKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnJlc3BvbnNlLFxyXG4gICAgSXRlbXM6IG5vcm1hbGl6ZWRJdGVtcyxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVRpY2tldExpbmtCdWxrUmVzcG9uc2UgPSAoXHJcbiAgcmVzcG9uc2U6IEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvPlxyXG4pOiBJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0bz4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgY29uc3QgcmF3RGF0YSA9IG5vcm1hbGl6ZWQ/LkRhdGE7XHJcbiAgaWYgKCFyYXdEYXRhIHx8IHR5cGVvZiByYXdEYXRhICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICByZXR1cm4gbm9ybWFsaXplZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHRvSXNzdWVMaXN0ID0gKHZhbHVlOiB1bmtub3duKSA9PiB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gW107XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlLm1hcCgoZW50cnkpID0+ICh7XHJcbiAgICAgIHRpY2tldElkOiBzYWZlVGV4dChcclxuICAgICAgICAoZW50cnkgYXMgeyB0aWNrZXRJZD86IHVua25vd247IFRpY2tldElkPzogdW5rbm93biB9KT8udGlja2V0SWQgPz9cclxuICAgICAgICAgIChlbnRyeSBhcyB7IFRpY2tldElkPzogdW5rbm93biB9KS5UaWNrZXRJZFxyXG4gICAgICApLFxyXG4gICAgICByZWFzb246IHNhZmVUZXh0KFxyXG4gICAgICAgIChlbnRyeSBhcyB7IHJlYXNvbj86IHVua25vd247IFJlYXNvbj86IHVua25vd24gfSk/LnJlYXNvbiA/P1xyXG4gICAgICAgICAgKGVudHJ5IGFzIHsgUmVhc29uPzogdW5rbm93biB9KS5SZWFzb25cclxuICAgICAgKSxcclxuICAgIH0pKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBsaW5rZWRUaWNrZXRJZHNSYXcgPVxyXG4gICAgKHJhd0RhdGEgYXMgeyBsaW5rZWRUaWNrZXRJZHM/OiB1bmtub3duOyBMaW5rZWRUaWNrZXRJZHM/OiB1bmtub3duIH0pLmxpbmtlZFRpY2tldElkcyA/P1xyXG4gICAgKHJhd0RhdGEgYXMgeyBMaW5rZWRUaWNrZXRJZHM/OiB1bmtub3duIH0pLkxpbmtlZFRpY2tldElkcztcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLm5vcm1hbGl6ZWQsXHJcbiAgICBEYXRhOiB7XHJcbiAgICAgIGV4cGVuc2VTaGVldElkOiBzYWZlVGV4dChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IGV4cGVuc2VTaGVldElkPzogdW5rbm93bjsgRXhwZW5zZVNoZWV0SWQ/OiB1bmtub3duIH0pLmV4cGVuc2VTaGVldElkID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IEV4cGVuc2VTaGVldElkPzogdW5rbm93biB9KS5FeHBlbnNlU2hlZXRJZFxyXG4gICAgICApLFxyXG4gICAgICByZXF1ZXN0ZWRDb3VudDogdG9OdWxsYWJsZU51bWJlcihcclxuICAgICAgICAocmF3RGF0YSBhcyB7IHJlcXVlc3RlZENvdW50PzogdW5rbm93bjsgUmVxdWVzdGVkQ291bnQ/OiB1bmtub3duIH0pLnJlcXVlc3RlZENvdW50ID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IFJlcXVlc3RlZENvdW50PzogdW5rbm93biB9KS5SZXF1ZXN0ZWRDb3VudFxyXG4gICAgICApID8/IDAsXHJcbiAgICAgIGxpbmtlZENvdW50OiB0b051bGxhYmxlTnVtYmVyKFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgbGlua2VkQ291bnQ/OiB1bmtub3duOyBMaW5rZWRDb3VudD86IHVua25vd24gfSkubGlua2VkQ291bnQgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgTGlua2VkQ291bnQ/OiB1bmtub3duIH0pLkxpbmtlZENvdW50XHJcbiAgICAgICkgPz8gMCxcclxuICAgICAgc2tpcHBlZENvdW50OiB0b051bGxhYmxlTnVtYmVyKFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgc2tpcHBlZENvdW50PzogdW5rbm93bjsgU2tpcHBlZENvdW50PzogdW5rbm93biB9KS5za2lwcGVkQ291bnQgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgU2tpcHBlZENvdW50PzogdW5rbm93biB9KS5Ta2lwcGVkQ291bnRcclxuICAgICAgKSA/PyAwLFxyXG4gICAgICBmYWlsZWRDb3VudDogdG9OdWxsYWJsZU51bWJlcihcclxuICAgICAgICAocmF3RGF0YSBhcyB7IGZhaWxlZENvdW50PzogdW5rbm93bjsgRmFpbGVkQ291bnQ/OiB1bmtub3duIH0pLmZhaWxlZENvdW50ID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IEZhaWxlZENvdW50PzogdW5rbm93biB9KS5GYWlsZWRDb3VudFxyXG4gICAgICApID8/IDAsXHJcbiAgICAgIGxpbmtlZFRpY2tldElkczogQXJyYXkuaXNBcnJheShsaW5rZWRUaWNrZXRJZHNSYXcpXHJcbiAgICAgICAgPyBsaW5rZWRUaWNrZXRJZHNSYXcubWFwKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnkpKS5maWx0ZXIoQm9vbGVhbilcclxuICAgICAgICA6IFtdLFxyXG4gICAgICBza2lwcGVkOiB0b0lzc3VlTGlzdChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IHNraXBwZWQ/OiB1bmtub3duOyBTa2lwcGVkPzogdW5rbm93biB9KS5za2lwcGVkID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IFNraXBwZWQ/OiB1bmtub3duIH0pLlNraXBwZWRcclxuICAgICAgKSxcclxuICAgICAgZmFpbGVkOiB0b0lzc3VlTGlzdChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IGZhaWxlZD86IHVua25vd247IEZhaWxlZD86IHVua25vd24gfSkuZmFpbGVkID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IEZhaWxlZD86IHVua25vd24gfSkuRmFpbGVkXHJcbiAgICAgICksXHJcbiAgICB9LFxyXG4gIH07XHJcbn07XHJcbiIsICJcdUZFRkZpbXBvcnQgdHlwZSB7XHJcbiAgRXhwZW5zZVNoZWV0Q2FyZCxcclxuICBFeHBlbnNlU2hlZXREZXRhaWxEdG8sXHJcbiAgRXhwZW5zZVNoZWV0SGVhZGVyLFxyXG4gIEV4cGVuc2VTaGVldExpbmUsXHJcbiAgRXhwZW5zZVNoZWV0TGluZUR0byxcclxuICBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byxcclxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0LCB0b051bGxhYmxlQm9vbCwgdG9OdWxsYWJsZU51bWJlciB9IGZyb20gXCIuL2V4cGVuc2VBcGlUcmFuc2Zvcm1zLnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VXaW5kb3dSdW50aW1lID0ge1xyXG4gIF9fRVhQRU5TRV9HQVNUT19UWVBFU19fPzogQXJyYXk8e1xyXG4gICAgdmFsdWU/OiB1bmtub3duO1xyXG4gICAgVmFsdWU/OiB1bmtub3duO1xyXG4gICAgdGV4dD86IHVua25vd247XHJcbiAgICBUZXh0PzogdW5rbm93bjtcclxuICB9PjtcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZUdhc3RvVHlwZUVudHJ5ID0gTm9uTnVsbGFibGU8RXhwZW5zZVdpbmRvd1J1bnRpbWVbXCJfX0VYUEVOU0VfR0FTVE9fVFlQRVNfX1wiXT5bbnVtYmVyXTtcclxuXHJcbmNvbnN0IHJlYWRFeHBlbnNlV2luZG93UnVudGltZSA9ICgpOiBFeHBlbnNlV2luZG93UnVudGltZSA9PiB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiB7fTtcclxuICByZXR1cm4gd2luZG93IGFzIHVua25vd24gYXMgRXhwZW5zZVdpbmRvd1J1bnRpbWU7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlVHlwZUxhYmVsID0gKHR5cGVWYWx1ZUNvZGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKCF0eXBlVmFsdWVDb2RlIHx8IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIHJldHVybiB0eXBlVmFsdWVDb2RlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmF3Q2F0YWxvZ1NvdXJjZSA9IHJlYWRFeHBlbnNlV2luZG93UnVudGltZSgpLl9fRVhQRU5TRV9HQVNUT19UWVBFU19fO1xyXG4gIGNvbnN0IHJhd0NhdGFsb2cgPSBBcnJheS5pc0FycmF5KHJhd0NhdGFsb2dTb3VyY2UpID8gcmF3Q2F0YWxvZ1NvdXJjZSA6IFtdO1xyXG4gIGNvbnN0IG1hdGNoID0gcmF3Q2F0YWxvZy5maW5kKChlbnRyeTogRXhwZW5zZUdhc3RvVHlwZUVudHJ5KSA9PiB7XHJcbiAgICBjb25zdCBlbnRyeUNvZGUgPSBzYWZlVGV4dChlbnRyeT8udmFsdWUgfHwgZW50cnk/LlZhbHVlKTtcclxuICAgIHJldHVybiBlbnRyeUNvZGUgPT09IHR5cGVWYWx1ZUNvZGU7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBzYWZlVGV4dChtYXRjaD8udGV4dCB8fCBtYXRjaD8uVGV4dCkgfHwgdHlwZVZhbHVlQ29kZTtcclxufTtcclxuXHJcbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9saXN0IGl0ZW0gY29udHJhY3QgdG8gbGlzdCBjYXJkIFVJIG1vZGVsLlxyXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmQgPSAoaXRlbTogRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8pOiBFeHBlbnNlU2hlZXRDYXJkID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgaG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChpdGVtLkhvamFHYXN0b3NJZCksXHJcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQoaXRlbS5EZXNjcmlwdGlvbiksXHJcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5FeHBlbnNlU2hlZXRTdGF0dXMpLFxyXG4gICAgZXN0YWRvQ29tZW50YXJpb3M6IHNhZmVUZXh0KGl0ZW0uRXN0YWRvQ29tZW50YXJpb3MpIHx8IG51bGwsXHJcbiAgICB1c2VySWQ6IHNhZmVUZXh0KGl0ZW0uVXNlcklkKSxcclxuICAgIHVzZXJOYW1lOiBzYWZlVGV4dChpdGVtLlVzZXJOYW1lKSB8fCBudWxsLFxyXG4gICAgdm91Y2hlcjogc2FmZVRleHQoaXRlbS5Wb3VjaGVyKSxcclxuICAgIHByb2pJZDogc2FmZVRleHQoaXRlbS5Qcm9qSWQpLFxyXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChpdGVtLkN1cnJlbmN5Q29kZSksXHJcbiAgICB0b3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihpdGVtLlRvdGFsQW1vdW50KSxcclxuICAgIGV4Y2hSYXRlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uRXhjaFJhdGUpLFxyXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogdG9OdWxsYWJsZU51bWJlcihpdGVtLkV4Y2hhbmdlUmF0ZU1vZGUpLFxyXG4gICAgY3JlYXRlZERhdGU6IHNhZmVUZXh0KGl0ZW0uQ3JlYXRlZERhdGUpLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0gaGVhZGVyIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxyXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0SGVhZGVyID0gKHNoZWV0OiBFeHBlbnNlU2hlZXREZXRhaWxEdG8pOiBFeHBlbnNlU2hlZXRIZWFkZXIgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBob2phR2FzdG9zSWQ6IHNhZmVUZXh0KHNoZWV0LkhvamFHYXN0b3NJZCksXHJcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQoc2hlZXQuRGVzY3JpcHRpb24pLFxyXG4gICAgdXNlcklkOiBzYWZlVGV4dChzaGVldC5Vc2VySWQpLFxyXG4gICAgZXhwZW5zZVNoZWV0U3RhdHVzOiB0b051bGxhYmxlTnVtYmVyKHNoZWV0LkV4cGVuc2VTaGVldFN0YXR1cyksXHJcbiAgICBlc3RhZG9Db21lbnRhcmlvczogc2FmZVRleHQoc2hlZXQuRXN0YWRvQ29tZW50YXJpb3MpIHx8IG51bGwsXHJcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KHNoZWV0LkN1cnJlbmN5Q29kZSksXHJcbiAgICB0b3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihzaGVldC5Ub3RhbEFtb3VudCksXHJcbiAgICBleGNoUmF0ZTogc2FmZVRleHQoc2hlZXQuRXhjaFJhdGUpLFxyXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogdG9OdWxsYWJsZU51bWJlcihzaGVldC5FeGNoYW5nZVJhdGVNb2RlKSxcclxuICAgIHByb2pJZDogc2FmZVRleHQoc2hlZXQuUHJvaklkKSxcclxuICAgIHZvdWNoZXI6IHNhZmVUZXh0KHNoZWV0LlZvdWNoZXIpLFxyXG4gICAgY3JlYXRlZERhdGU6IHNhZmVUZXh0KHNoZWV0LkNyZWF0ZWREYXRlKSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gTWFwcyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9IGxpbmUgY29udHJhY3QgdG8gVUkgbW9kZWwuXHJcbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRMaW5lID0gKGxpbmU6IEV4cGVuc2VTaGVldExpbmVEdG8pOiBFeHBlbnNlU2hlZXRMaW5lID0+IHtcclxuICBjb25zdCB0eXBlVmFsdWVDb2RlID0gc2FmZVRleHQobGluZS5UeXBlVmFsdWUpO1xyXG4gIGNvbnN0IGxlZ2FjeVByaWNlID0gKGxpbmUgYXMgeyBwcmljZT86IHVua25vd24gfSkucHJpY2U7XHJcbiAgY29uc3QgbGVnYWN5RmlsZUlkID0gKGxpbmUgYXMgeyBmaWxlSWQ/OiB1bmtub3duIH0pLmZpbGVJZDtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGxpbmVSZWNJZDogc2FmZVRleHQobGluZS5SZWNJZCksXHJcbiAgICB0cmFuc0RhdGU6IHNhZmVUZXh0KGxpbmUuVHJhbnNEYXRlKSxcclxuICAgIHR5cGVWYWx1ZUNvZGUsXHJcbiAgICB0eXBlVmFsdWU6IHJlc29sdmVUeXBlTGFiZWwodHlwZVZhbHVlQ29kZSksXHJcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQobGluZS5EZXNjcmlwdGlvbiksXHJcbiAgICBpbnRlcm5hY2lvbmFsOiB0b051bGxhYmxlQm9vbChsaW5lLkludGVybmFjaW9uYWwpLFxyXG4gICAgZmlsZUlkOiBzYWZlVGV4dChsaW5lLkZpbGVJZCA/PyBsZWdhY3lGaWxlSWQpLFxyXG4gICAgdGlja2V0OiB0b051bGxhYmxlQm9vbChsaW5lLlRpY2tldCksXHJcbiAgICBwcmljZTogdG9OdWxsYWJsZU51bWJlcihsaW5lLlByaWNlID8/IGxlZ2FjeVByaWNlKSxcclxuICAgIHF0eTogdG9OdWxsYWJsZU51bWJlcihsaW5lLlF0eSksXHJcbiAgICBhbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIobGluZS5BbW91bnQpLFxyXG4gICAgcHJvaklkOiBzYWZlVGV4dChsaW5lLlByb2pJZCksXHJcbiAgICBpbmRBdHRhY2hGaWxlczogc2FmZVRleHQobGluZS5JbmRBdHRhY2hGaWxlcyksXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHBhcnNlRXhwZW5zZUFwaURhdGUgfSBmcm9tIFwiLi9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBFeHBlbnNlRGF0ZVBhcnRzID0ge1xyXG4gIHllYXI6IHN0cmluZztcclxuICBtb250aDogc3RyaW5nO1xyXG4gIGRheTogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBQYXJzZUV4cGVuc2VEYXRlT3B0aW9ucyA9IHtcclxuICBwcmVmZXJNb250aEZpcnN0T25TbGFzaD86IGJvb2xlYW47XHJcbn07XHJcblxyXG5jb25zdCBCQVNRVUVfTU9OVEhTX1NIT1JUID0gW1xyXG4gIFwidXJ0XCIsXHJcbiAgXCJvdHNcIixcclxuICBcIm1hclwiLFxyXG4gIFwiYXBpXCIsXHJcbiAgXCJtYWlcIixcclxuICBcImVrYVwiLFxyXG4gIFwidXp0XCIsXHJcbiAgXCJhYnVcIixcclxuICBcImlyYVwiLFxyXG4gIFwidXJyXCIsXHJcbiAgXCJhemFcIixcclxuICBcImFiZVwiLFxyXG5dO1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVWlMb2NhbGUgPSAobG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKGxvY2FsZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiZXMtRVNcIjtcclxuICBpZiAoL156aC1oYW5zL2kudGVzdCh2YWx1ZSkpIHJldHVybiBcInpoLUNOXCI7XHJcbiAgcmV0dXJuIHZhbHVlO1xyXG59O1xyXG5cclxuY29uc3QgaXNCYXNxdWVMb2NhbGUgPSAobG9jYWxlOiBzdHJpbmcpOiBib29sZWFuID0+IC9eZXVcXGIvaS50ZXN0KFN0cmluZyhsb2NhbGUgfHwgXCJcIikpO1xyXG5cclxuLy8gTm9ybWFsaXplIHVua25vd24gdmFsdWVzIHRvIGEgdHJpbW1lZCBzdHJpbmcuXHJcbmV4cG9ydCBjb25zdCBzYWZlVGV4dCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xyXG4gIHJldHVybiBTdHJpbmcodmFsdWUpLnRyaW0oKTtcclxufTtcclxuXHJcbi8vIENsZWFucyBjaGF0IHRleHQgd2hpbGUgcHJlc2VydmluZyBhY2NlbnRzIGFuZCByZWFkYWJsZSBwdW5jdHVhdGlvbi5cclxuZXhwb3J0IGNvbnN0IHNhbml0aXplQXNzaXN0YW50VGV4dCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgc291cmNlID0gc2FmZVRleHQodmFsdWUpO1xyXG4gIGlmICghc291cmNlKSByZXR1cm4gXCJcIjtcclxuXHJcbiAgcmV0dXJuIHNvdXJjZVxyXG4gICAgLm5vcm1hbGl6ZShcIk5GQ1wiKVxyXG4gICAgLnJlcGxhY2UoL1xcdUZFRkYvZywgXCJcIilcclxuICAgIC5yZXBsYWNlKC9bXFx1MDAwMC1cXHUwMDA4XFx1MDAwQlxcdTAwMENcXHUwMDBFLVxcdTAwMUZcXHUwMDdGXS9nLCBcIlwiKVxyXG4gICAgLnJlcGxhY2UoL1tcXHUyMDBCLVxcdTIwMERcXHUyMDYwXS9nLCBcIlwiKVxyXG4gICAgLnJlcGxhY2UoL1xcclxcbj8vZywgXCJcXG5cIilcclxuICAgIC5yZXBsYWNlKC9bIFxcdF0rXFxuL2csIFwiXFxuXCIpXHJcbiAgICAucmVwbGFjZSgvXFxuezMsfS9nLCBcIlxcblxcblwiKVxyXG4gICAgLnRyaW0oKTtcclxufTtcclxuXHJcbi8vIE5vcm1hbGl6ZXMgY2FyZCB0aXRsZSB0ZXh0IG9ubHkgd2hlbiBpdCBjb21lcyBpbiBmdWxsIHVwcGVyIG9yIGZ1bGwgbG93ZXIgY2FzZS5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUNhcmRUaXRsZVRleHQgPSAodmFsdWU6IHVua25vd24sIGZhbGxiYWNrID0gXCItXCIpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHNvdXJjZSA9IHNhZmVUZXh0KHZhbHVlKTtcclxuICBpZiAoIXNvdXJjZSkgcmV0dXJuIGZhbGxiYWNrO1xyXG5cclxuICBjb25zdCBoYXNMZXR0ZXJzID0gL1tBLVphLXpcdTAwQzAtXHUwMEQ2XHUwMEQ4LVx1MDBGNlx1MDBGOC1cdTAwRkZdLy50ZXN0KHNvdXJjZSk7XHJcbiAgaWYgKCFoYXNMZXR0ZXJzKSByZXR1cm4gc291cmNlO1xyXG5cclxuICBjb25zdCBpc0FsbFVwcGVyID0gc291cmNlID09PSBzb3VyY2UudG9VcHBlckNhc2UoKSAmJiBzb3VyY2UgIT09IHNvdXJjZS50b0xvd2VyQ2FzZSgpO1xyXG4gIGNvbnN0IGlzQWxsTG93ZXIgPSBzb3VyY2UgPT09IHNvdXJjZS50b0xvd2VyQ2FzZSgpICYmIHNvdXJjZSAhPT0gc291cmNlLnRvVXBwZXJDYXNlKCk7XHJcbiAgaWYgKCFpc0FsbFVwcGVyICYmICFpc0FsbExvd2VyKSB7XHJcbiAgICByZXR1cm4gc291cmNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbG93ZXIgPSBzb3VyY2UudG9Mb3dlckNhc2UoKTtcclxuICByZXR1cm4gYCR7bG93ZXIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCl9JHtsb3dlci5zbGljZSgxKX1gO1xyXG59O1xyXG5cclxuLy8gUmV0dXJucyB0cnVlIG9ubHkgd2hlbiB2b3VjaGVyIGhhcyBhIG1lYW5pbmdmdWwgYXNzaWduZWQgdmFsdWUuXHJcbmV4cG9ydCBjb25zdCBoYXNBc3NpZ25lZFZvdWNoZXIgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICBjb25zdCB2b3VjaGVyID0gc2FmZVRleHQodmFsdWUpLnRvVXBwZXJDYXNlKCk7XHJcbiAgaWYgKCF2b3VjaGVyKSByZXR1cm4gZmFsc2U7XHJcbiAgcmV0dXJuIHZvdWNoZXIgIT09IFwiLVwiICYmIHZvdWNoZXIgIT09IFwiLlwiICYmIHZvdWNoZXIgIT09IFwiMFwiO1xyXG59O1xyXG5cclxuLy8gUmV0dXJuIGRhdGUgYXQgbG9jYWwgZGF5IHN0YXJ0LlxyXG5leHBvcnQgY29uc3Qgc3RhcnRPZkRheSA9IChkYXRlOiBEYXRlKTogRGF0ZSA9PiB7XHJcbiAgcmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSk7XHJcbn07XHJcblxyXG4vLyBGb3JtYXQgbG9jYWwgZGF0ZSB0byB5eXl5LU1NLWRkLlxyXG5leHBvcnQgY29uc3QgdG9Jc29EYXRlID0gKGRhdGU6IERhdGUpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBgJHtkYXRlLmdldEZ1bGxZZWFyKCl9LSR7U3RyaW5nKGRhdGUuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKX0tJHtTdHJpbmcoZGF0ZS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKX1gO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlRGF0ZSA9ICh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKTogRGF0ZSB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IGNhbmRpZGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcclxuICBpZiAoXHJcbiAgICBOdW1iZXIuaXNOYU4oY2FuZGlkYXRlLmdldFRpbWUoKSkgfHxcclxuICAgIGNhbmRpZGF0ZS5nZXRGdWxsWWVhcigpICE9PSB5ZWFyIHx8XHJcbiAgICBjYW5kaWRhdGUuZ2V0TW9udGgoKSAhPT0gbW9udGggLSAxIHx8XHJcbiAgICBjYW5kaWRhdGUuZ2V0RGF0ZSgpICE9PSBkYXlcclxuICApIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGNhbmRpZGF0ZTtcclxufTtcclxuXHJcbi8vIFBhcnNlIHN1cHBvcnRlZCBBUEkgZGF0ZSBmb3JtYXRzLlxyXG5leHBvcnQgY29uc3QgcGFyc2VFeHBlbnNlRGF0ZSA9IChyYXc/OiBzdHJpbmcsIG9wdGlvbnM/OiBQYXJzZUV4cGVuc2VEYXRlT3B0aW9ucyk6IERhdGUgfCBudWxsID0+IHtcclxuICBpZiAoIXJhdykgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcocmF3KS50cmltKCk7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IGRhdGVPbmx5ID0gdmFsdWUuc3BsaXQoXCJUXCIpWzBdLnNwbGl0KFwiIFwiKVswXTtcclxuXHJcbiAgLy8gS2VlcCBvcHRpb25hbCBtb250aC1maXJzdCBjb21wYXRpYmlsaXR5IGZvciBsZWdhY3kgc2xhc2ggZGF0ZXMgaW4gY2FyZHMuXHJcbiAgaWYgKG9wdGlvbnM/LnByZWZlck1vbnRoRmlyc3RPblNsYXNoICYmIC9eXFxkezJ9XFwvXFxkezJ9XFwvXFxkezR9JC8udGVzdChkYXRlT25seSkpIHtcclxuICAgIGNvbnN0IFtmaXJzdFBhcnQsIHNlY29uZFBhcnQsIHllYXJQYXJ0XSA9IGRhdGVPbmx5LnNwbGl0KC9bLi8tXS8pO1xyXG4gICAgY29uc3QgZmlyc3QgPSBOdW1iZXIoZmlyc3RQYXJ0KTtcclxuICAgIGNvbnN0IHNlY29uZCA9IE51bWJlcihzZWNvbmRQYXJ0KTtcclxuICAgIGNvbnN0IHllYXIgPSBOdW1iZXIoeWVhclBhcnQpO1xyXG4gICAgY29uc3QgbW9udGhGaXJzdERhdGUgPSBidWlsZEV4cGVuc2VEYXRlKHllYXIsIGZpcnN0LCBzZWNvbmQpO1xyXG4gICAgaWYgKG1vbnRoRmlyc3REYXRlKSB7XHJcbiAgICAgIHJldHVybiBtb250aEZpcnN0RGF0ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBwYXJzZUV4cGVuc2VBcGlEYXRlKHZhbHVlKTtcclxufTtcclxuXHJcbi8vIEZvcm1hdCBhIGRhdGUgZm9yIHJlYWQtb25seSBmaWVsZHMgdXNpbmcgdGhlIHNhbWUgb3V0cHV0IHN0eWxlIGFzIHZpc2l0cy5cclxuZXhwb3J0IGNvbnN0IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSA9IChyYXc/OiBzdHJpbmcsIGxvY2FsZSA9IFwiZXMtRVNcIiwgZmFsbGJhY2sgPSBcIi1cIik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgZGF0ZSA9IHBhcnNlRXhwZW5zZURhdGUocmF3KTtcclxuICBpZiAoIWRhdGUpIHJldHVybiBmYWxsYmFjaztcclxuXHJcbiAgY29uc3Qgc2FmZUxvY2FsZSA9IG5vcm1hbGl6ZVVpTG9jYWxlKGxvY2FsZSk7XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKHNhZmVMb2NhbGUpKSB7XHJcbiAgICByZXR1cm4gYCR7ZGF0ZS5nZXREYXRlKCl9ICR7QkFTUVVFX01PTlRIU19TSE9SVFtkYXRlLmdldE1vbnRoKCldfSAke2RhdGUuZ2V0RnVsbFllYXIoKX1gLnRvTG93ZXJDYXNlKCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZGF0ZVxyXG4gICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhzYWZlTG9jYWxlLCB7XHJcbiAgICAgIGRheTogXCJudW1lcmljXCIsXHJcbiAgICAgIG1vbnRoOiBcInNob3J0XCIsXHJcbiAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxyXG4gICAgfSlcclxuICAgIC5yZXBsYWNlKC9cXC4vZywgXCJcIilcclxuICAgIC50b0xvd2VyQ2FzZSgpO1xyXG59O1xyXG5cclxuLy8gQnVpbGQgdGltZWxpbmUgZGF0ZSBmcmFnbWVudHMgZm9yIGNhcmQgbGVmdCBwYW5lbC5cclxuZXhwb3J0IGNvbnN0IGZvcm1hdEV4cGVuc2VEYXRlUGFydHMgPSAocmF3Pzogc3RyaW5nLCBsb2NhbGUgPSBcImVzLUVTXCIsIG9wdGlvbnM/OiBQYXJzZUV4cGVuc2VEYXRlT3B0aW9ucyk6IEV4cGVuc2VEYXRlUGFydHMgPT4ge1xyXG4gIGNvbnN0IGRhdGUgPSBwYXJzZUV4cGVuc2VEYXRlKHJhdywgb3B0aW9ucyk7XHJcbiAgaWYgKCFkYXRlKSB7XHJcbiAgICByZXR1cm4geyB5ZWFyOiBcIlwiLCBtb250aDogXCJcIiwgZGF5OiBcIi0tXCIgfTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB5ZWFyOiBTdHJpbmcoZGF0ZS5nZXRGdWxsWWVhcigpKSxcclxuICAgIG1vbnRoOiBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgbW9udGg6IFwic2hvcnRcIiB9KS5yZXBsYWNlKC9cXC4vZywgXCJcIikudG9VcHBlckNhc2UoKSxcclxuICAgIGRheTogU3RyaW5nKGRhdGUuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIiksXHJcbiAgfTtcclxufTtcclxuIiwgInR5cGUgQ29tcGFueVNlbGVjdGlvbkNhbmRpZGF0ZSA9IHtcclxuICBjb21wYW55SWQ6IHN0cmluZztcclxuICBpc0RlZmF1bHQ/OiBib29sZWFuO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplQ29tcGFueUlkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcclxuXHJcbmNvbnN0IGZpbmRDb21wYW55TWF0Y2ggPSAoXHJcbiAgY2FuZGlkYXRlczogQ29tcGFueVNlbGVjdGlvbkNhbmRpZGF0ZVtdLFxyXG4gIHJlcXVlc3RlZENvbXBhbnlJZDogc3RyaW5nXHJcbik6IENvbXBhbnlTZWxlY3Rpb25DYW5kaWRhdGUgfCBudWxsID0+IHtcclxuICBpZiAoIXJlcXVlc3RlZENvbXBhbnlJZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGZvciAoY29uc3QgY2FuZGlkYXRlIG9mIGNhbmRpZGF0ZXMpIHtcclxuICAgIGlmIChub3JtYWxpemVDb21wYW55SWQoY2FuZGlkYXRlLmNvbXBhbnlJZCkgPT09IHJlcXVlc3RlZENvbXBhbnlJZCkge1xyXG4gICAgICByZXR1cm4gY2FuZGlkYXRlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG4vLyBSZXNvbHZlcyB0aGUgZWZmZWN0aXZlIGNvbXBhbnkgZm9yIEFQSSBjYWxsczogbWFudWFsIHNlbGVjdGlvbiB3aW5zIG9ubHkgd2hlbiBpdCBleGlzdHMgaW4gdGhlIGN1cnJlbnQgY29udGV4dC5cclxuZXhwb3J0IGNvbnN0IHJlc29sdmVFZmZlY3RpdmVDb21wYW55SWQgPSAoXHJcbiAgc2VsZWN0ZWRDb21wYW55SWQ6IHVua25vd24sXHJcbiAgY29tcGFuaWVzOiBDb21wYW55U2VsZWN0aW9uQ2FuZGlkYXRlW10sXHJcbiAgZGVmYXVsdENvbXBhbnlJZD86IHVua25vd25cclxuKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkU2VsZWN0ZWRDb21wYW55SWQgPSBub3JtYWxpemVDb21wYW55SWQoc2VsZWN0ZWRDb21wYW55SWQpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWREZWZhdWx0Q29tcGFueUlkID0gbm9ybWFsaXplQ29tcGFueUlkKGRlZmF1bHRDb21wYW55SWQpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRDb21wYW5pZXMgPSBBcnJheS5pc0FycmF5KGNvbXBhbmllcylcclxuICAgID8gY29tcGFuaWVzLmZpbHRlcigoY2FuZGlkYXRlKSA9PiBub3JtYWxpemVDb21wYW55SWQoY2FuZGlkYXRlLmNvbXBhbnlJZCkpXHJcbiAgICA6IFtdO1xyXG5cclxuICBjb25zdCBzZWxlY3RlZE1hdGNoID0gZmluZENvbXBhbnlNYXRjaChub3JtYWxpemVkQ29tcGFuaWVzLCBub3JtYWxpemVkU2VsZWN0ZWRDb21wYW55SWQpO1xyXG4gIGlmIChzZWxlY3RlZE1hdGNoKSB7XHJcbiAgICByZXR1cm4gc2VsZWN0ZWRNYXRjaC5jb21wYW55SWQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkZWZhdWx0TWF0Y2ggPVxyXG4gICAgZmluZENvbXBhbnlNYXRjaChub3JtYWxpemVkQ29tcGFuaWVzLCBub3JtYWxpemVkRGVmYXVsdENvbXBhbnlJZCkgfHxcclxuICAgIG5vcm1hbGl6ZWRDb21wYW5pZXMuZmluZCgoY2FuZGlkYXRlKSA9PiBjYW5kaWRhdGUuaXNEZWZhdWx0ID09PSB0cnVlKSB8fFxyXG4gICAgbm9ybWFsaXplZENvbXBhbmllc1swXSB8fFxyXG4gICAgbnVsbDtcclxuXHJcbiAgcmV0dXJuIGRlZmF1bHRNYXRjaD8uY29tcGFueUlkIHx8IFwiXCI7XHJcbn07XHJcbiIsICJpbXBvcnQge1xyXG4gIEFwaUZldGNoRXJyb3IsXHJcbiAgZmV0Y2hKc29uLFxyXG4gIGdldENzcmZUb2tlbixcclxuICBoYW5kbGVBcGlBdXRoRmFpbHVyZSxcclxuICByZWFkQXBpTWVzc2FnZUZyb21SYXcsXHJcbiAgdHlwZSBBcGlGZXRjaE9wdGlvbnMsXHJcbn0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHR5cGUge1xyXG4gIEVudHJhQ29udGV4dER0byxcclxuICBFbnRyYUNvbnRleHRSZXF1ZXN0LFxyXG4gIEV4Y2hhbmdlUmF0ZUR0byxcclxuICBGdWVsUHJpY2VLbUR0byxcclxuICBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0byxcclxuICBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldENyZWF0ZVJlc3BvbnNlRGF0YSxcclxuICBFeHBlbnNlU2hlZXREZXRhaWxEdG8sXHJcbiAgRXhwZW5zZVNoZWV0RHJhZnRSZXNwb25zZSxcclxuICBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldExpbmVEdG8sXHJcbiAgRXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlc3BvbnNlRGF0YSxcclxuICBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byxcclxuICBFeHBlbnNlU2hlZXRMaXN0UmVzcG9uc2VFbnZlbG9wZSxcclxuICBFeHBlbnNlU2hlZXRzQXNrUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRzQXNrUmVzcG9uc2VEYXRhLFxyXG4gIEV4cGVuc2VTaGVldHNBc2tSZXN1bHQsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0Q3JlYXRlUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXREZXRhaWxEdG8sXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdFJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVzdWx0LFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmVSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvLFxyXG4gIEluZEFwaVJlc3BvbnNlLFxyXG4gIEluZFBhZ2VkUmVzcG9uc2UsXHJcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGlzTm9uTmVnYXRpdmVOdW1iZXIgYXMgaXNOb25OZWdhdGl2ZU51bWJlclRyYW5zZm9ybSxcclxuICBpc1Bvc2l0aXZlTnVtYmVyIGFzIGlzUG9zaXRpdmVOdW1iZXJUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlciBhcyBub3JtYWxpemVFeHBlbnNlU2hlZXRMaXN0U3RhdHVzRmlsdGVyVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlIGFzIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSSBhcyBub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUlUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRTdGF0dXMgYXMgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRTdGF0dXNUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlIGFzIG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVSZXF1aXJlZEFwaURhdGUgYXMgbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZVRpY2tldExpc3REYXRlIGFzIG5vcm1hbGl6ZVRpY2tldExpc3REYXRlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZVRpY2tldExpc3RHYXN0b1R5cGUgYXMgbm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZVRyYW5zZm9ybSxcclxuICBzYWZlVGV4dCBhcyBzYWZlVGV4dFRyYW5zZm9ybSxcclxuICB0b0ZsYWdCb29sIGFzIHRvRmxhZ0Jvb2xUcmFuc2Zvcm0sXHJcbiAgdG9OdWxsYWJsZUJvb2wgYXMgdG9OdWxsYWJsZUJvb2xUcmFuc2Zvcm0sXHJcbiAgdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUgYXMgdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGVUcmFuc2Zvcm0sXHJcbiAgdG9OdWxsYWJsZU51bWJlciBhcyB0b051bGxhYmxlTnVtYmVyVHJhbnNmb3JtLFxyXG4gIHRvTnVsbGFibGVUaWNrZXRTdGF0dXNDb2RlIGFzIHRvTnVsbGFibGVUaWNrZXRTdGF0dXNDb2RlVHJhbnNmb3JtLFxyXG59IGZyb20gXCIuL2V4cGVuc2VBcGlUcmFuc2Zvcm1zLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgbm9ybWFsaXplQXBpUmVzcG9uc2UgYXMgbm9ybWFsaXplQXBpUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlIGFzIG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlIGFzIG5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UgYXMgbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZVRpY2tldExpbmtCdWxrUmVzcG9uc2UgYXMgbm9ybWFsaXplVGlja2V0TGlua0J1bGtSZXNwb25zZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVUaWNrZXRMaW5rTGlzdFBhZ2VkUmVzcG9uc2UgYXMgbm9ybWFsaXplVGlja2V0TGlua0xpc3RQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2UgYXMgbm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVUaWNrZXRRdWlja0NyZWF0ZVJlc3BvbnNlIGFzIG5vcm1hbGl6ZVRpY2tldFF1aWNrQ3JlYXRlUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2UgYXMgbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbn0gZnJvbSBcIi4vZXhwZW5zZUFwaVJlc3BvbnNlTm9ybWFsaXplcnMudHNcIjtcclxuaW1wb3J0IHtcclxuICBtYXBFeHBlbnNlU2hlZXRIZWFkZXIgYXMgbWFwRXhwZW5zZVNoZWV0SGVhZGVyQ29yZSxcclxuICBtYXBFeHBlbnNlU2hlZXRMaW5lIGFzIG1hcEV4cGVuc2VTaGVldExpbmVDb3JlLFxyXG4gIG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkIGFzIG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkQ29yZSxcclxufSBmcm9tIFwiLi9leHBlbnNlQXBpTWFwcGVycy50c1wiO1xyXG5pbXBvcnQgeyBzYW5pdGl6ZUFzc2lzdGFudFRleHQgfSBmcm9tIFwiLi9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSB9IGZyb20gXCIuL2V4cGVuc2VBcGlEYXRlVXRpbHMudHNcIjtcbmltcG9ydCB7IGdldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUgfSBmcm9tIFwiLi9leHBlbnNlQWN0aW5nVXNlci50c1wiO1xuaW1wb3J0IHsgcmVzb2x2ZUVmZmVjdGl2ZUNvbXBhbnlJZCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jb21wYW55U2VsZWN0aW9uLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcblxyXG50eXBlIFByb2plY3REcm9wZG93blJlc3BvbnNlID0ge1xyXG4gIHRvdGFsPzogbnVtYmVyO1xyXG4gIGl0ZW1zPzogQXJyYXk8eyB2YWx1ZT86IHN0cmluZzsgdGV4dD86IHN0cmluZyB9PjtcclxufTtcclxuXHJcbnR5cGUgTGVnYWN5RXhwZW5zZUxpc3RJdGVtID0ge1xyXG4gIGhvamFHYXN0b3NJZD86IHVua25vd247XHJcbiAgZGVzY3JpcHRpb24/OiB1bmtub3duO1xyXG4gIGVzdGFkb0NvbWVudGFyaW9zPzogdW5rbm93bjtcclxuICB2b3VjaGVyPzogdW5rbm93bjtcclxuICBwcm9qSWQ/OiB1bmtub3duO1xyXG4gIGN1cnJlbmN5Q29kZT86IHVua25vd247XHJcbiAgdG90YWxBbW91bnQ/OiB1bmtub3duO1xyXG4gIHRvdGFsQW1vdW50TVNUPzogdW5rbm93bjtcclxuICBleGNoUmF0ZT86IHVua25vd247XHJcbiAgdXNlcklkPzogdW5rbm93bjtcclxuICB1c2VyTmFtZT86IHVua25vd247XHJcbiAgZXhjaGFuZ2VSYXRlTW9kZT86IHVua25vd247XHJcbiAgZXhwZW5zZVNoZWV0U3RhdHVzPzogdW5rbm93bjtcclxuICBjcmVhdGVkRGF0ZT86IHVua25vd247XHJcbn07XHJcblxyXG50eXBlIExlZ2FjeUV4cGVuc2VMaXN0UmVzcG9uc2UgPSB7XHJcbiAgc3VjY2Vzcz86IGJvb2xlYW47XHJcbiAgbWVzc2FnZT86IHN0cmluZztcclxuICB0b3RhbD86IG51bWJlcjtcclxuICBwYWdlPzogbnVtYmVyO1xyXG4gIHBhZ2VTaXplPzogbnVtYmVyO1xyXG4gIGl0ZW1zPzogTGVnYWN5RXhwZW5zZUxpc3RJdGVtW107XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VBcGlDb250ZXh0ID0ge1xyXG4gIHRva2VuOiBzdHJpbmc7XHJcbiAgY29tcGFueUlkOiBzdHJpbmc7XHJcbiAgYXhVc2VySWQ6IHN0cmluZztcclxuICBjcm1Vc2VySWQ6IHN0cmluZztcclxuICBkZWZhdWx0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEV4cGVuc2VBcGlDb250ZXh0U25hcHNob3QgPSB7XHJcbiAgY29tcGFueUlkOiBzdHJpbmc7XHJcbiAgYXhVc2VySWQ6IHN0cmluZztcclxuICBjcm1Vc2VySWQ6IHN0cmluZztcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlQXBpQXV0aFNlZWQgPSB7XHJcbiAgdG9rZW46IHN0cmluZztcclxuICBlbnRyYU9pZDogc3RyaW5nO1xyXG4gIGFwcENvZGU6IHN0cmluZztcclxuICBzdHJpY3RBcGlSb3V0ZXM6IGJvb2xlYW47XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VXaW5kb3dSdW50aW1lID0ge1xyXG4gIF9fSU5EX0FQSV9UT0tFTl9fPzogc3RyaW5nO1xyXG4gIF9fSU5EX0VOVFJBX09JRF9fPzogc3RyaW5nO1xyXG4gIF9fSU5EX0FQUF9DT0RFX18/OiBzdHJpbmc7XHJcbiAgX19JTkRfU0VMRUNURURfQ09NUEFOWV9fPzogc3RyaW5nO1xyXG4gIF9fSU5EX0VYUEVOU0VfU1RSSUNUX0FQSV9fPzogYm9vbGVhbiB8IHN0cmluZztcclxuICBfX0VYUEVOU0VfR0FTVE9fVFlQRVNfXz86IEFycmF5PHtcclxuICAgIHZhbHVlPzogdW5rbm93bjtcclxuICAgIFZhbHVlPzogdW5rbm93bjtcclxuICAgIHRleHQ/OiB1bmtub3duO1xyXG4gICAgVGV4dD86IHVua25vd247XHJcbiAgfT47XHJcbn07XHJcblxyXG5jb25zdCBERUZBVUxUX0FQUF9DT0RFID0gXCJDUk1cIjtcclxuY29uc3QgSlNPTl9IRUFERVJTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG59O1xyXG5cclxubGV0IHJ1bnRpbWVBdXRoU2VlZDogUGFydGlhbDxFeHBlbnNlQXBpQXV0aFNlZWQ+ID0ge307XHJcbmxldCBjYWNoZWRDb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCB8IG51bGwgPSBudWxsO1xyXG5sZXQgY2FjaGVkQ29udGV4dEtleSA9IFwiXCI7XHJcbmxldCBjb250ZXh0UHJvbWlzZTogUHJvbWlzZTxFeHBlbnNlQXBpQ29udGV4dD4gfCBudWxsID0gbnVsbDtcclxuY29uc3QgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMgPSBuZXcgTWFwPHN0cmluZywgSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+KCk7XHJcbmNvbnN0IHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzID0gbmV3IE1hcDxzdHJpbmcsIFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+PigpO1xyXG5cclxuY29uc3Qgc2FmZVRleHQgPSBzYWZlVGV4dFRyYW5zZm9ybTtcclxuXHJcbmNvbnN0IHRvTnVsbGFibGVOdW1iZXIgPSB0b051bGxhYmxlTnVtYmVyVHJhbnNmb3JtO1xyXG5jb25zdCBpc05vbk5lZ2F0aXZlTnVtYmVyID0gaXNOb25OZWdhdGl2ZU51bWJlclRyYW5zZm9ybTtcclxuY29uc3QgaXNQb3NpdGl2ZU51bWJlciA9IGlzUG9zaXRpdmVOdW1iZXJUcmFuc2Zvcm07XHJcbmNvbnN0IHRvTnVsbGFibGVUaWNrZXRTdGF0dXNDb2RlID0gdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGVUcmFuc2Zvcm07XHJcbmNvbnN0IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlID0gdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGVUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlID0gbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGVUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpc3RHYXN0b1R5cGUgPSBub3JtYWxpemVUaWNrZXRMaXN0R2FzdG9UeXBlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1cyA9IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVPcHRpb25hbEFwaURhdGUgPSBub3JtYWxpemVPcHRpb25hbEFwaURhdGVUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZSA9IG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdERhdGUgPSBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZVRyYW5zZm9ybTtcclxuY29uc3QgdG9OdWxsYWJsZUJvb2wgPSB0b051bGxhYmxlQm9vbFRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRQcm9jZXNzZWRCeUFJID0gbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRQcm9jZXNzZWRCeUFJVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVFeHBlbnNlU2hlZXRMaXN0U3RhdHVzRmlsdGVyID0gbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlclRyYW5zZm9ybTtcclxuY29uc3QgdG9GbGFnQm9vbCA9IHRvRmxhZ0Jvb2xUcmFuc2Zvcm07XHJcblxyXG5jb25zdCByZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUgPSAoKTogRXhwZW5zZVdpbmRvd1J1bnRpbWUgPT4ge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4ge307XHJcbiAgcmV0dXJuIHdpbmRvdyBhcyB1bmtub3duIGFzIEV4cGVuc2VXaW5kb3dSdW50aW1lO1xyXG59O1xyXG5cclxuY29uc3Qgc2FuaXRpemVIZWFkZXJzID0gKGhlYWRlcnM6IEhlYWRlcnNJbml0IHwgdW5kZWZpbmVkKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9PiB7XHJcbiAgaWYgKCFoZWFkZXJzKSByZXR1cm4ge307XHJcblxyXG4gIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xyXG4gICAgY29uc3QgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XHJcbiAgICBoZWFkZXJzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcclxuICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIGlmIChBcnJheS5pc0FycmF5KGhlYWRlcnMpKSB7XHJcbiAgICByZXR1cm4gaGVhZGVycy5yZWR1Y2U8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4oKGFjYywgW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgIGFjY1tTdHJpbmcoa2V5KV0gPSBTdHJpbmcodmFsdWUpO1xyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwge30pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGhlYWRlcnMpLnJlZHVjZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PigoYWNjLCBba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSByZXR1cm4gYWNjO1xyXG4gICAgYWNjW2tleV0gPSBTdHJpbmcodmFsdWUpO1xyXG4gICAgcmV0dXJuIGFjYztcclxuICB9LCB7fSk7XHJcbn07XHJcblxyXG5jb25zdCBnZXRIZWFkZXJWYWx1ZSA9IChoZWFkZXJzOiBIZWFkZXJzSW5pdCB8IHVuZGVmaW5lZCwga2V5OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRLZXkgPSBrZXkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHNhbml0aXplSGVhZGVycyhoZWFkZXJzKSk7XHJcbiAgY29uc3QgbWF0Y2ggPSBlbnRyaWVzLmZpbmQoKFtoZWFkZXJLZXldKSA9PiBoZWFkZXJLZXkudHJpbSgpLnRvTG93ZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRLZXkpO1xyXG4gIHJldHVybiBzYWZlVGV4dChtYXRjaD8uWzFdKTtcclxufTtcclxuXHJcbmNvbnN0IHJlbW92ZUhlYWRlclZhbHVlID0gKGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sIGtleTogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEtleSA9IGtleS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICBjb25zdCB0b0RlbGV0ZSA9IE9iamVjdC5rZXlzKGhlYWRlcnMpLmZpbmQoKGhlYWRlcktleSkgPT4gaGVhZGVyS2V5LnRyaW0oKS50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkS2V5KTtcclxuICBpZiAoIXRvRGVsZXRlKSByZXR1cm47XHJcbiAgZGVsZXRlIGhlYWRlcnNbdG9EZWxldGVdO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplQXhVc2VySWRIZWFkZXIgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBzYWZlVGV4dCh2YWx1ZSk7XHJcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gXCJcIjtcclxuICBjb25zdCBmaXJzdFRva2VuID0gbm9ybWFsaXplZC5zcGxpdChcIi1cIilbMF07XHJcbiAgcmV0dXJuIHNhZmVUZXh0KGZpcnN0VG9rZW4pO1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZUJlYXJlclRva2VuID0gKGhlYWRlcnM6IEhlYWRlcnNJbml0IHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBhdXRob3JpemF0aW9uID0gZ2V0SGVhZGVyVmFsdWUoaGVhZGVycywgXCJBdXRob3JpemF0aW9uXCIpO1xyXG4gIGlmICghYXV0aG9yaXphdGlvbikgcmV0dXJuIFwiXCI7XHJcblxyXG4gIGlmICgvXmJlYXJlclxccysvaS50ZXN0KGF1dGhvcml6YXRpb24pKSB7XHJcbiAgICByZXR1cm4gYXV0aG9yaXphdGlvbi5yZXBsYWNlKC9eYmVhcmVyXFxzKy9pLCBcIlwiKS50cmltKCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYXV0aG9yaXphdGlvbi50cmltKCk7XHJcbn07XHJcblxyXG5jb25zdCByZWFkV2luZG93QXV0aFNlZWQgPSAoKTogUGFydGlhbDxFeHBlbnNlQXBpQXV0aFNlZWQ+ID0+IHtcclxuICBjb25zdCBydW50aW1lV2luZG93ID0gcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lKCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0b2tlbjogc2FmZVRleHQocnVudGltZVdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXHJcbiAgICBlbnRyYU9pZDogc2FmZVRleHQocnVudGltZVdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXHJcbiAgICBhcHBDb2RlOiBzYWZlVGV4dChydW50aW1lV2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxyXG4gICAgc3RyaWN0QXBpUm91dGVzOiB0b0ZsYWdCb29sKHJ1bnRpbWVXaW5kb3cuX19JTkRfRVhQRU5TRV9TVFJJQ1RfQVBJX18pID09PSB0cnVlLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCB0cnlQYXJzZUpzb24gPSAocmF3OiBzdHJpbmcpOiB1bmtub3duIHwgbnVsbCA9PiB7XHJcbiAgaWYgKCFyYXcgfHwgIXJhdy50cmltKCkpIHJldHVybiBudWxsO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShyYXcpO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlID0gPFQ+KHZhbHVlOiBUKTogVCA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHZhbHVlKSkgYXMgVDtcclxufTtcclxuXHJcbmNvbnN0IHJlYWRSdW50aW1lU3RyaWN0QXBpRmxhZyA9ICgpOiBib29sZWFuID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGZhbHNlO1xyXG4gIGNvbnN0IHJ1bnRpbWVXaW5kb3cgPSByZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUoKTtcclxuXHJcbiAgY29uc3QgZXhwbGljaXRXaW5kb3dGbGFnID0gdG9GbGFnQm9vbChydW50aW1lV2luZG93Ll9fSU5EX0VYUEVOU0VfU1RSSUNUX0FQSV9fKTtcclxuICByZXR1cm4gZXhwbGljaXRXaW5kb3dGbGFnID09PSB0cnVlO1xyXG59O1xyXG5cclxuY29uc3QgcmVhZFdpbmRvd1NlbGVjdGVkQ29tcGFueSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBzYWZlVGV4dChyZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUoKS5fX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18pLnRvVXBwZXJDYXNlKCk7XHJcbn07XHJcblxyXG4vLyBDcmVhdGVzIG9uZSBzdGFuZGFyZCBhYm9ydCBlcnJvciB3aXRob3V0IGNhbmNlbGxpbmcgdGhlIHNoYXJlZCB1bmRlcmx5aW5nIHJlcXVlc3QuXHJcbmNvbnN0IGNyZWF0ZUV4cGVuc2VBYm9ydEVycm9yID0gKCk6IERPTUV4Y2VwdGlvbiA9PiB7XHJcbiAgcmV0dXJuIG5ldyBET01FeGNlcHRpb24oXCJBYm9ydGVkXCIsIFwiQWJvcnRFcnJvclwiKTtcclxufTtcclxuXHJcbi8vIExldHMgb25lIGNhbGxlciBzdG9wIHdhaXRpbmcgb24gc2hhcmVkIGNvbnRleHQgcmVzb2x1dGlvbiB3aXRob3V0IGFib3J0aW5nIG90aGVyIGNvbnN1bWVycy5cclxuY29uc3Qgd2FpdEZvckFib3J0YWJsZUV4cGVuc2VSZXN1bHQgPSBhc3luYyA8VD4ocHJvbWlzZTogUHJvbWlzZTxUPiwgc2lnbmFsPzogQWJvcnRTaWduYWwpOiBQcm9taXNlPFQ+ID0+IHtcclxuICBpZiAoIXNpZ25hbCkgcmV0dXJuIHByb21pc2U7XHJcbiAgaWYgKHNpZ25hbC5hYm9ydGVkKSB7XHJcbiAgICB0aHJvdyBjcmVhdGVFeHBlbnNlQWJvcnRFcnJvcigpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGNvbnN0IGhhbmRsZUFib3J0ID0gKCkgPT4ge1xyXG4gICAgICBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGhhbmRsZUFib3J0KTtcclxuICAgICAgcmVqZWN0KGNyZWF0ZUV4cGVuc2VBYm9ydEVycm9yKCkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzaWduYWwuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGhhbmRsZUFib3J0LCB7IG9uY2U6IHRydWUgfSk7XHJcbiAgICBwcm9taXNlLnRoZW4oXHJcbiAgICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgaGFuZGxlQWJvcnQpO1xyXG4gICAgICAgIHJlc29sdmUodmFsdWUpO1xyXG4gICAgICB9LFxyXG4gICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGhhbmRsZUFib3J0KTtcclxuICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRDb250ZXh0S2V5ID0gKHNlZWQ6IEV4cGVuc2VBcGlBdXRoU2VlZCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIGAke3NlZWQudG9rZW59fCR7c2VlZC5lbnRyYU9pZH18JHtzZWVkLmFwcENvZGV9fCR7cmVhZFdpbmRvd1NlbGVjdGVkQ29tcGFueSgpfWA7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZEV4cGVuc2VIZWFkZXJzID0gKFxyXG4gIGNvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMsXHJcbiAgaW5jbHVkZUpzb24gPSBmYWxzZSxcclxuICBpbmNsdWRlQXhVc2VySWQgPSB0cnVlXHJcbik6IEhlYWRlcnNJbml0ID0+IHtcclxuICBjb25zdCBiYXNlID0gc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpO1xyXG4gIGNvbnN0IG1lcmdlZDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHsgLi4uYmFzZSB9O1xyXG5cclxuICBpZiAoc2FmZVRleHQoY29udGV4dC50b2tlbikpIHtcclxuICAgIG1lcmdlZC5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke2NvbnRleHQudG9rZW59YDtcclxuICB9XHJcblxyXG4gIGlmIChzYWZlVGV4dChjb250ZXh0LmNvbXBhbnlJZCkpIHtcclxuICAgIG1lcmdlZFtcIlgtSU5ELUNvbXBhbnlcIl0gPSBjb250ZXh0LmNvbXBhbnlJZDtcclxuICB9XHJcblxyXG4gIGlmIChpbmNsdWRlQXhVc2VySWQpIHtcclxuICAgIGNvbnN0IHJlcXVlc3RBeFVzZXJJZCA9IGdldEhlYWRlclZhbHVlKG9wdGlvbnM/LmhlYWRlcnMsIFwiWC1JTkQtQXhVc2VySWRcIik7XHJcbiAgICBjb25zdCBvdmVycmlkZUF4VXNlcklkID0gZ2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSgpO1xyXG4gICAgY29uc3QgcmVzb2x2ZWRBeFVzZXJJZCA9IHNhZmVUZXh0KHJlcXVlc3RBeFVzZXJJZCB8fCBvdmVycmlkZUF4VXNlcklkIHx8IGNvbnRleHQuYXhVc2VySWQpO1xyXG4gICAgaWYgKHJlc29sdmVkQXhVc2VySWQpIHtcclxuICAgICAgbWVyZ2VkW1wiWC1JTkQtQXhVc2VySWRcIl0gPSByZXNvbHZlZEF4VXNlcklkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVtb3ZlSGVhZGVyVmFsdWUobWVyZ2VkLCBcIlgtSU5ELUF4VXNlcklkXCIpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShtZXJnZWQsIFwiWC1JTkQtQXhVc2VySWRcIik7XHJcbiAgfVxyXG5cclxuICBpZiAoaW5jbHVkZUpzb24pIHtcclxuICAgIG1lcmdlZFtcIkNvbnRlbnQtVHlwZVwiXSA9IFwiYXBwbGljYXRpb24vanNvblwiO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1lcmdlZDtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkRXhwZW5zZUZvcm1IZWFkZXJzID0gKGNvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0LCBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogSGVhZGVyc0luaXQgPT4ge1xyXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMoYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCBmYWxzZSkpO1xyXG4gIHJlbW92ZUhlYWRlclZhbHVlKGhlYWRlcnMsIFwiQ29udGVudC1UeXBlXCIpO1xyXG4gIHJldHVybiBoZWFkZXJzO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRDb250ZXh0SGVhZGVycyA9ICh0b2tlbjogc3RyaW5nLCBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogSGVhZGVyc0luaXQgPT4ge1xyXG4gIGNvbnN0IGJhc2UgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XHJcbiAgY29uc3QgbWVyZ2VkOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICAgLi4uYmFzZSxcclxuICAgIC4uLkpTT05fSEVBREVSUyxcclxuICB9O1xyXG5cclxuICBpZiAoc2FmZVRleHQodG9rZW4pKSB7XHJcbiAgICBtZXJnZWQuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1lcmdlZDtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVBdXRoVG9rZW4gPSAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgdG9rZW5Gcm9tSGVhZGVycyA9IHJlc29sdmVCZWFyZXJUb2tlbihvcHRpb25zPy5oZWFkZXJzKTtcclxuICBjb25zdCB3aW5kb3dTZWVkID0gcmVhZFdpbmRvd0F1dGhTZWVkKCk7XHJcbiAgcmV0dXJuIHNhZmVUZXh0KHRva2VuRnJvbUhlYWRlcnMgfHwgcnVudGltZUF1dGhTZWVkLnRva2VuIHx8IHdpbmRvd1NlZWQudG9rZW4pO1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZUF1dGhTZWVkID0gKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBFeHBlbnNlQXBpQXV0aFNlZWQgPT4ge1xyXG4gIGNvbnN0IHdpbmRvd1NlZWQgPSByZWFkV2luZG93QXV0aFNlZWQoKTtcclxuICBjb25zdCB0b2tlbiA9IHJlc29sdmVBdXRoVG9rZW4ob3B0aW9ucyk7XHJcbiAgY29uc3QgZW50cmFPaWQgPSBzYWZlVGV4dChydW50aW1lQXV0aFNlZWQuZW50cmFPaWQgfHwgd2luZG93U2VlZC5lbnRyYU9pZCk7XHJcbiAgY29uc3QgYXBwQ29kZSA9IHNhZmVUZXh0KHJ1bnRpbWVBdXRoU2VlZC5hcHBDb2RlIHx8IHdpbmRvd1NlZWQuYXBwQ29kZSB8fCBERUZBVUxUX0FQUF9DT0RFKSB8fCBERUZBVUxUX0FQUF9DT0RFO1xyXG4gIGNvbnN0IHN0cmljdEFwaVJvdXRlcyA9XHJcbiAgICB0eXBlb2YgcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcyA9PT0gXCJib29sZWFuXCJcclxuICAgICAgPyBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzXHJcbiAgICAgIDogKHdpbmRvd1NlZWQuc3RyaWN0QXBpUm91dGVzID09PSB0cnVlKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHRva2VuLFxyXG4gICAgZW50cmFPaWQsXHJcbiAgICBhcHBDb2RlLFxyXG4gICAgc3RyaWN0QXBpUm91dGVzLFxyXG4gIH07XHJcbn07XHJcblxyXG50eXBlIFJhd0VudHJhQ29udGV4dENvbXBhbnkgPSB7XHJcbiAgQ29tcGFueUlkPzogdW5rbm93bjtcclxuICBjb21wYW55SWQ/OiB1bmtub3duO1xyXG4gIElzRGVmYXVsdD86IHVua25vd247XHJcbiAgaXNEZWZhdWx0PzogdW5rbm93bjtcclxuICBBbGxvd1NlbGZNYW5hZ2VtZW50PzogdW5rbm93bjtcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50PzogdW5rbm93bjtcclxuICBDcm1Vc2VySWQ/OiB1bmtub3duO1xyXG4gIGNybVVzZXJJZD86IHVua25vd247XHJcbn07XHJcblxyXG50eXBlIE5vcm1hbGl6ZWRFbnRyYUNvbnRleHRDb21wYW55ID0ge1xyXG4gIGNvbXBhbnlJZDogc3RyaW5nO1xyXG4gIGlzRGVmYXVsdDogYm9vbGVhbjtcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xyXG4gIGNybVVzZXJJZDogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBSYXdFbnRyYUNvbnRleHRIZWFkZXIgPSB7XHJcbiAgQXhVc2VySWQ/OiB1bmtub3duO1xyXG4gIGF4VXNlcklkPzogdW5rbm93bjtcclxuICBEZWZhdWx0Q29tcGFueT86IHVua25vd247XHJcbiAgZGVmYXVsdENvbXBhbnk/OiB1bmtub3duO1xyXG4gIERlZmF1bHRDdXJyZW5jeUNvZGU/OiB1bmtub3duO1xyXG4gIGRlZmF1bHRDdXJyZW5jeUNvZGU/OiB1bmtub3duO1xyXG59O1xyXG5cclxudHlwZSBSYXdFbnRyYUNvbnRleHRJdGVtID0ge1xyXG4gIEhlYWRlcj86IFJhd0VudHJhQ29udGV4dEhlYWRlcjtcclxuICBoZWFkZXI/OiBSYXdFbnRyYUNvbnRleHRIZWFkZXI7XHJcbiAgQ29tcGFuaWVzPzogdW5rbm93bjtcclxuICBjb21wYW5pZXM/OiB1bmtub3duO1xyXG59O1xyXG5cclxuLy8gTWFwcyBvbmUgRW50cmEgY29tcGFueSBpdGVtIHRvIHRoZSBmcm9udGVuZC1zYWZlIHNoYXBlIHVzZWQgYnkgY29udGV4dCBjb25zdW1lcnMuXHJcbmNvbnN0IG1hcEVudHJhQ29udGV4dENvbXBhbnkgPSAoaXRlbTogdW5rbm93bik6IE5vcm1hbGl6ZWRFbnRyYUNvbnRleHRDb21wYW55IHwgbnVsbCA9PiB7XHJcbiAgaWYgKCFpdGVtIHx8IHR5cGVvZiBpdGVtICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgcmF3ID0gaXRlbSBhcyBSYXdFbnRyYUNvbnRleHRDb21wYW55O1xyXG4gIGNvbnN0IGNvbXBhbnlJZCA9IHNhZmVUZXh0KHJhdy5Db21wYW55SWQgPz8gcmF3LmNvbXBhbnlJZCk7XHJcbiAgaWYgKCFjb21wYW55SWQpIHJldHVybiBudWxsO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY29tcGFueUlkLFxyXG4gICAgaXNEZWZhdWx0OiB0b0ZsYWdCb29sKHJhdy5Jc0RlZmF1bHQgPz8gcmF3LmlzRGVmYXVsdCkgPT09IHRydWUsXHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50OiB0b0ZsYWdCb29sKHJhdy5BbGxvd1NlbGZNYW5hZ2VtZW50ID8/IHJhdy5hbGxvd1NlbGZNYW5hZ2VtZW50KSA9PT0gdHJ1ZSxcclxuICAgIGNybVVzZXJJZDogc2FmZVRleHQocmF3LkNybVVzZXJJZCA/PyByYXcuY3JtVXNlcklkKSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgdmFsaWRhdGVDb250ZXh0UmVzcG9uc2UgPSAocmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RW50cmFDb250ZXh0RHRvPik6IEV4cGVuc2VBcGlDb250ZXh0ID0+IHtcclxuICBjb25zdCByYXdSZXNwb25zZSA9IHJlc3BvbnNlIGFzIHtcclxuICAgIFN1Y2Nlc3M/OiB1bmtub3duO1xyXG4gICAgc3VjY2Vzcz86IHVua25vd247XHJcbiAgICBNZXNzYWdlPzogdW5rbm93bjtcclxuICAgIG1lc3NhZ2U/OiB1bmtub3duO1xyXG4gICAgSXRlbXM/OiB1bmtub3duO1xyXG4gICAgaXRlbXM/OiB1bmtub3duO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGlzU3VjY2VzcyA9IHRvRmxhZ0Jvb2wocmF3UmVzcG9uc2UuU3VjY2VzcyA/PyByYXdSZXNwb25zZS5zdWNjZXNzKTtcclxuICBpZiAoaXNTdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3Ioc2FmZVRleHQocmF3UmVzcG9uc2UuTWVzc2FnZSA/PyByYXdSZXNwb25zZS5tZXNzYWdlKSB8fCBcIkNvdWxkIG5vdCBsb2FkIEVudHJhIGNvbnRleHQuXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHJhd1Jlc3BvbnNlLkl0ZW1zKVxyXG4gICAgPyByYXdSZXNwb25zZS5JdGVtc1xyXG4gICAgOiAoQXJyYXkuaXNBcnJheShyYXdSZXNwb25zZS5pdGVtcykgPyByYXdSZXNwb25zZS5pdGVtcyA6IFtdKTtcclxuICBjb25zdCBmaXJzdCA9IGl0ZW1zWzBdIGFzIFJhd0VudHJhQ29udGV4dEl0ZW0gfCB1bmRlZmluZWQ7XHJcbiAgY29uc3QgaGVhZGVyID0gZmlyc3Q/LkhlYWRlciA/PyBmaXJzdD8uaGVhZGVyO1xyXG4gIGlmICghZmlyc3QgfHwgIWhlYWRlcikge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJDb3VsZCBub3QgbG9hZCBFbnRyYSBjb250ZXh0LlwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGF4VXNlcklkID0gc2FmZVRleHQoaGVhZGVyLkF4VXNlcklkID8/IGhlYWRlci5heFVzZXJJZCk7XHJcbiAgY29uc3QgZGVmYXVsdENvbXBhbnkgPSBzYWZlVGV4dChoZWFkZXIuRGVmYXVsdENvbXBhbnkgPz8gaGVhZGVyLmRlZmF1bHRDb21wYW55KTtcclxuICBjb25zdCBkZWZhdWx0Q3VycmVuY3lDb2RlID0gc2FmZVRleHQoaGVhZGVyLkRlZmF1bHRDdXJyZW5jeUNvZGUgPz8gaGVhZGVyLmRlZmF1bHRDdXJyZW5jeUNvZGUpO1xyXG4gIGNvbnN0IGNvbXBhbmllc1JhdyA9IEFycmF5LmlzQXJyYXkoZmlyc3QuQ29tcGFuaWVzKVxyXG4gICAgPyBmaXJzdC5Db21wYW5pZXNcclxuICAgIDogKEFycmF5LmlzQXJyYXkoZmlyc3QuY29tcGFuaWVzKSA/IGZpcnN0LmNvbXBhbmllcyA6IFtdKTtcclxuICBjb25zdCBjb21wYW5pZXMgPSBjb21wYW5pZXNSYXdcbiAgICAubWFwKChpdGVtKSA9PiBtYXBFbnRyYUNvbnRleHRDb21wYW55KGl0ZW0pKVxuICAgIC5maWx0ZXIoKGl0ZW0pOiBpdGVtIGlzIE5vcm1hbGl6ZWRFbnRyYUNvbnRleHRDb21wYW55ID0+ICEhaXRlbSk7XG4gIGNvbnN0IHNlbGVjdGVkQ29tcGFueUlkID0gcmVhZFdpbmRvd1NlbGVjdGVkQ29tcGFueSgpO1xuICBjb25zdCBzZWxlY3RlZENvbXBhbnlNYXRjaCA9IHNlbGVjdGVkQ29tcGFueUlkXG4gICAgPyBjb21wYW5pZXMuZmluZCgoaXRlbSkgPT4gc2FmZVRleHQoaXRlbS5jb21wYW55SWQpLnRvVXBwZXJDYXNlKCkgPT09IHNlbGVjdGVkQ29tcGFueUlkKVxuICAgIDogbnVsbDtcblxuICAvLyBOZXZlciBmYWxsIGJhY2sgdG8gYSBkaWZmZXJlbnQgY29tcGFueSB3aGVuIHRoZSB1c2VyIHNlbGVjdGVkIG9uZSBleHBsaWNpdGx5LlxuICBpZiAoc2VsZWN0ZWRDb21wYW55SWQgJiYgIXNlbGVjdGVkQ29tcGFueU1hdGNoKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXG4gICAgICBpbmRUKFxuICAgICAgICBcIkV4cGVuc2VfQ29udGV4dF9TZWxlY3RlZENvbXBhbnlVbmF2YWlsYWJsZVwiLFxuICAgICAgICBcIlRoZSBzZWxlY3RlZCBjb21wYW55IGlzIG5vIGxvbmdlciBhdmFpbGFibGUuIFBsZWFzZSBjaG9vc2UgaXQgYWdhaW4gZnJvbSB0aGUgbWFpbiBtZW51LlwiXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGZhbGxiYWNrQ29tcGFueSA9IHNhZmVUZXh0KGNvbXBhbmllcy5maW5kKChpdGVtKSA9PiBpdGVtLmlzRGVmYXVsdCk/LmNvbXBhbnlJZCk7XG4gIGNvbnN0IGNvbXBhbnlJZCA9XG4gICAgc2VsZWN0ZWRDb21wYW55TWF0Y2g/LmNvbXBhbnlJZCB8fCByZXNvbHZlRWZmZWN0aXZlQ29tcGFueUlkKFwiXCIsIGNvbXBhbmllcywgZGVmYXVsdENvbXBhbnkgfHwgZmFsbGJhY2tDb21wYW55KTtcbiAgY29uc3Qgc2VsZWN0ZWRDb21wYW55ID1cbiAgICBzZWxlY3RlZENvbXBhbnlNYXRjaCB8fCBjb21wYW5pZXMuZmluZCgoaXRlbSkgPT4gc2FmZVRleHQoaXRlbS5jb21wYW55SWQpID09PSBjb21wYW55SWQpIHx8IGNvbXBhbmllc1swXTtcbiAgY29uc3QgYWxsb3dTZWxmTWFuYWdlbWVudCA9IHNlbGVjdGVkQ29tcGFueT8uYWxsb3dTZWxmTWFuYWdlbWVudCA9PT0gdHJ1ZTtcbiAgY29uc3QgY3JtVXNlcklkID0gc2FmZVRleHQoc2VsZWN0ZWRDb21wYW55Py5jcm1Vc2VySWQpO1xuXHJcbiAgaWYgKCFheFVzZXJJZCB8fCAhY29tcGFueUlkKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkNvdWxkIG5vdCByZXNvbHZlIEVudHJhIGNvbXBhbnkgY29udGV4dC5cIik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdG9rZW46IFwiXCIsXHJcbiAgICBjb21wYW55SWQsXHJcbiAgICBheFVzZXJJZCxcclxuICAgIGNybVVzZXJJZCxcclxuICAgIGRlZmF1bHRDdXJyZW5jeUNvZGUsXHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dCA9IGFzeW5jIChvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogUHJvbWlzZTxFeHBlbnNlQXBpQ29udGV4dD4gPT4ge1xyXG4gIGNvbnN0IHNlZWQgPSByZXNvbHZlQXV0aFNlZWQob3B0aW9ucyk7XHJcbiAgY29uc3QgY29udGV4dEtleSA9IGJ1aWxkQ29udGV4dEtleShzZWVkKTtcclxuICBjb25zdCB7IHNpZ25hbCwgLi4uYmFzZU9wdGlvbnMgfSA9IG9wdGlvbnMgfHwge307XHJcblxyXG4gIGlmIChjYWNoZWRDb250ZXh0ICYmIGNhY2hlZENvbnRleHRLZXkgPT09IGNvbnRleHRLZXkpIHtcclxuICAgIHJldHVybiB3YWl0Rm9yQWJvcnRhYmxlRXhwZW5zZVJlc3VsdChQcm9taXNlLnJlc29sdmUoY2FjaGVkQ29udGV4dCksIHNpZ25hbCk7XHJcbiAgfVxyXG5cclxuICBpZiAoIWNvbnRleHRQcm9taXNlIHx8IGNhY2hlZENvbnRleHRLZXkgIT09IGNvbnRleHRLZXkpIHtcclxuICAgIGNhY2hlZENvbnRleHRLZXkgPSBjb250ZXh0S2V5O1xyXG4gICAgY29uc3Qgc2hhcmVkQ29udGV4dFByb21pc2UgPSAoYXN5bmMgKCkgPT4ge1xyXG4gICAgICBjb25zdCBjb250ZXh0UGF5bG9hZDogRW50cmFDb250ZXh0UmVxdWVzdCA9IHtcclxuICAgICAgICBhcHBDb2RlOiBzZWVkLmFwcENvZGUsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAoc2FmZVRleHQoc2VlZC5lbnRyYU9pZCkpIHtcclxuICAgICAgICBjb250ZXh0UGF5bG9hZC5lbnRyYU9pZCA9IHNlZWQuZW50cmFPaWQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGNvbnRleHRSZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEVudHJhQ29udGV4dER0bz4+KFwiL2FwaS9hdXRoL2VudHJhL2NvbnRleHRcIiwge1xyXG4gICAgICAgIC4uLmJhc2VPcHRpb25zLFxyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczogYnVpbGRDb250ZXh0SGVhZGVycyhzZWVkLnRva2VuLCBiYXNlT3B0aW9ucyksXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY29udGV4dFBheWxvYWQpLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IHJlc29sdmVkID0gdmFsaWRhdGVDb250ZXh0UmVzcG9uc2UoY29udGV4dFJlc3BvbnNlKTtcclxuICAgICAgY29uc3QgbmV4dENvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0ID0ge1xyXG4gICAgICAgIC4uLnJlc29sdmVkLFxyXG4gICAgICAgIHRva2VuOiBzZWVkLnRva2VuLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICB3aW5kb3cuX19JTkRfQUxMT1dfU0VMRl9NQU5BR0VNRU5UX18gPSBuZXh0Q29udGV4dC5hbGxvd1NlbGZNYW5hZ2VtZW50O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjYWNoZWRDb250ZXh0ID0gbmV4dENvbnRleHQ7XHJcbiAgICAgIHJldHVybiBuZXh0Q29udGV4dDtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgY29udGV4dFByb21pc2UgPSBzaGFyZWRDb250ZXh0UHJvbWlzZTtcclxuICAgIHZvaWQgc2hhcmVkQ29udGV4dFByb21pc2UuZmluYWxseSgoKSA9PiB7XHJcbiAgICAgIGlmIChjb250ZXh0UHJvbWlzZSA9PT0gc2hhcmVkQ29udGV4dFByb21pc2UpIHtcclxuICAgICAgICBjb250ZXh0UHJvbWlzZSA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGF3YWl0IHdhaXRGb3JBYm9ydGFibGVFeHBlbnNlUmVzdWx0KGNvbnRleHRQcm9taXNlLCBzaWduYWwpO1xyXG59O1xyXG5cclxuLy8gRXhwb3NlcyByZXNvbHZlZCBFbnRyYSBjb250ZXh0IHZhbHVlcyBuZWVkZWQgYnkgR2FzdG9zIFVJIG1hbmFnZW1lbnQgc3RhdGUuXHJcbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlQXBpQ29udGV4dFNuYXBzaG90ID0gYXN5bmMgKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBQcm9taXNlPEV4cGVuc2VBcGlDb250ZXh0U25hcHNob3Q+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgcmV0dXJuIHtcclxuICAgIGNvbXBhbnlJZDogc2FmZVRleHQoY29udGV4dC5jb21wYW55SWQpLnRvVXBwZXJDYXNlKCksXHJcbiAgICBheFVzZXJJZDogc2FmZVRleHQoY29udGV4dC5heFVzZXJJZCksXHJcbiAgICBjcm1Vc2VySWQ6IHNhZmVUZXh0KGNvbnRleHQuY3JtVXNlcklkKSxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGNvbnRleHQuYWxsb3dTZWxmTWFuYWdlbWVudCA9PT0gdHJ1ZSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZUFwaVJlc3BvbnNlID0gbm9ybWFsaXplQXBpUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldFF1aWNrQ3JlYXRlUmVzcG9uc2UgPSBub3JtYWxpemVUaWNrZXRRdWlja0NyZWF0ZVJlc3BvbnNlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVN1Ym9yZGluYXRlc1BhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVUaWNrZXRMaW5rTGlzdFBhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVUaWNrZXRMaW5rTGlzdFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVUaWNrZXRMaW5rQnVsa1Jlc3BvbnNlID0gbm9ybWFsaXplVGlja2V0TGlua0J1bGtSZXNwb25zZVRyYW5zZm9ybTtcclxuXHJcbmNvbnN0IGxvb2tzTGlrZUh0bWxEb2N1bWVudCA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IHJhdyA9IHNhZmVUZXh0KHZhbHVlKS50b0xvd2VyQ2FzZSgpO1xyXG4gIHJldHVybiByYXcuc3RhcnRzV2l0aChcIjwhZG9jdHlwZSBodG1sXCIpIHx8IHJhdy5zdGFydHNXaXRoKFwiPGh0bWxcIik7XHJcbn07XHJcblxyXG5jb25zdCBpc0FwaVJvdXRlVW5hdmFpbGFibGUgPSAoZXJyb3I6IHVua25vd24pOiBlcnJvciBpcyBBcGlGZXRjaEVycm9yID0+IHtcclxuICBpZiAoIShlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpKSByZXR1cm4gZmFsc2U7XHJcbiAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDA0IHx8IGVycm9yLnN0YXR1cyA9PT0gNDA1KSByZXR1cm4gdHJ1ZTtcclxuICByZXR1cm4gZXJyb3Iuc3RhdHVzID09PSB1bmRlZmluZWQgJiYgbG9va3NMaWtlSHRtbERvY3VtZW50KGVycm9yLnJlc3BvbnNlQm9keSk7XHJcbn07XHJcblxyXG5jb25zdCBpc1N0cmljdEFwaVJvdXRlc0VuYWJsZWQgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKHR5cGVvZiBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzID09PSBcImJvb2xlYW5cIikge1xyXG4gICAgcmV0dXJuIHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXM7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVhZFJ1bnRpbWVTdHJpY3RBcGlGbGFnKCk7XHJcbn07XHJcblxyXG5jb25zdCBzaG91bGRVc2VMZWdhY3lGYWxsYmFjayA9IChlcnJvcjogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xyXG4gIGlmIChpc1N0cmljdEFwaVJvdXRlc0VuYWJsZWQoKSkgcmV0dXJuIGZhbHNlO1xyXG4gIHJldHVybiBpc0FwaVJvdXRlVW5hdmFpbGFibGUoZXJyb3IpO1xyXG59O1xyXG5cclxuY29uc3QgdG9MZWdhY3lMaXN0UmVxdWVzdFBheWxvYWQgPSAocGF5bG9hZDogRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3QpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgZmlsdGVyOiBzYWZlVGV4dChwYXlsb2FkLmZpbHRlciksXHJcbiAgICBob2phR2FzdG9zSWQ6IHNhZmVUZXh0KHBheWxvYWQuZmlsdGVyKSxcclxuICAgIGJpbGxlZE1vZGU6IHBheWxvYWQuYmlsbGVkTW9kZSA/PyAyLFxyXG4gICAgZnJvbURhdGU6IHNhZmVUZXh0KHBheWxvYWQuY3JlYXRlZERhdGVGcm9tKSxcclxuICAgIHRvRGF0ZTogc2FmZVRleHQocGF5bG9hZC5jcmVhdGVkRGF0ZVRvKSxcclxuICAgIHByb2plY3RJZDogc2FmZVRleHQocGF5bG9hZC5wcm9qSWQpLFxyXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChwYXlsb2FkLmN1cnJlbmN5Q29kZSksXHJcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IG5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXIocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMpLFxyXG4gICAgaW5jbHVkZVN1Ym9yZGluYXRlczogcGF5bG9hZC5pbmNsdWRlU3Vib3JkaW5hdGVzID09PSB0cnVlLFxyXG4gICAgcGFnZTogTnVtYmVyLmlzRmluaXRlKHBheWxvYWQucGFnZSkgJiYgcGF5bG9hZC5wYWdlID4gMCA/IHBheWxvYWQucGFnZSA6IDEsXHJcbiAgICBwYWdlU2l6ZTogTnVtYmVyLmlzRmluaXRlKHBheWxvYWQucGFnZVNpemUpICYmIHBheWxvYWQucGFnZVNpemUgPiAwID8gcGF5bG9hZC5wYWdlU2l6ZSA6IDUwLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBtYXBMZWdhY3lMaXN0SXRlbVRvQXBpTGlzdEl0ZW0gPSAoaXRlbTogTGVnYWN5RXhwZW5zZUxpc3RJdGVtKTogRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8gPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBIb2phR2FzdG9zSWQ6IHNhZmVUZXh0KGl0ZW0uaG9qYUdhc3Rvc0lkKSxcclxuICAgIERlc2NyaXB0aW9uOiBzYWZlVGV4dChpdGVtLmRlc2NyaXB0aW9uKSxcclxuICAgIEV4cGVuc2VTaGVldFN0YXR1czogdG9OdWxsYWJsZU51bWJlcihpdGVtLmV4cGVuc2VTaGVldFN0YXR1cyksXHJcbiAgICBFc3RhZG9Db21lbnRhcmlvczogc2FmZVRleHQoaXRlbS5lc3RhZG9Db21lbnRhcmlvcykgfHwgbnVsbCxcclxuICAgIFVzZXJJZDogc2FmZVRleHQoaXRlbS51c2VySWQpIHx8IG51bGwsXHJcbiAgICBVc2VyTmFtZTogc2FmZVRleHQoaXRlbS51c2VyTmFtZSkgfHwgbnVsbCxcclxuICAgIFZvdWNoZXI6IHNhZmVUZXh0KGl0ZW0udm91Y2hlciksXHJcbiAgICBQcm9qSWQ6IHNhZmVUZXh0KGl0ZW0ucHJvaklkKSxcclxuICAgIEN1cnJlbmN5Q29kZTogc2FmZVRleHQoaXRlbS5jdXJyZW5jeUNvZGUpLFxyXG4gICAgVG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS50b3RhbEFtb3VudCA/PyBpdGVtLnRvdGFsQW1vdW50TVNUKSxcclxuICAgIEV4Y2hSYXRlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uZXhjaFJhdGUpLFxyXG4gICAgRXhjaGFuZ2VSYXRlTW9kZTogdG9OdWxsYWJsZU51bWJlcihpdGVtLmV4Y2hhbmdlUmF0ZU1vZGUpLFxyXG4gICAgQ3JlYXRlZERhdGU6IHNhZmVUZXh0KGl0ZW0uY3JlYXRlZERhdGUpIHx8IG51bGwsXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IG1hcExlZ2FjeUxpc3RSZXNwb25zZSA9IChcclxuICBsZWdhY3k6IExlZ2FjeUV4cGVuc2VMaXN0UmVzcG9uc2UsXHJcbiAgZmFsbGJhY2tQYWdlOiBudW1iZXIsXHJcbiAgZmFsbGJhY2tQYWdlU2l6ZTogbnVtYmVyXHJcbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+ID0+IHtcclxuICBjb25zdCBsZWdhY3lJdGVtcyA9IEFycmF5LmlzQXJyYXkobGVnYWN5Py5pdGVtcykgPyBsZWdhY3kuaXRlbXMgOiBbXTtcclxuICBjb25zdCBtYXBwZWRJdGVtcyA9IGxlZ2FjeUl0ZW1zLm1hcCgoZW50cnkpID0+IG1hcExlZ2FjeUxpc3RJdGVtVG9BcGlMaXN0SXRlbShlbnRyeSkpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgU3VjY2VzczogbGVnYWN5LnN1Y2Nlc3MgIT09IGZhbHNlLFxyXG4gICAgTWVzc2FnZTogc2FmZVRleHQobGVnYWN5Lm1lc3NhZ2UpIHx8IFwiT0tcIixcclxuICAgIFRvdGFsOiB0b051bGxhYmxlTnVtYmVyKGxlZ2FjeS50b3RhbCkgPz8gbWFwcGVkSXRlbXMubGVuZ3RoLFxyXG4gICAgUGFnZTogdG9OdWxsYWJsZU51bWJlcihsZWdhY3kucGFnZSkgPz8gZmFsbGJhY2tQYWdlLFxyXG4gICAgUGFnZVNpemU6IHRvTnVsbGFibGVOdW1iZXIobGVnYWN5LnBhZ2VTaXplKSA/PyBmYWxsYmFja1BhZ2VTaXplLFxyXG4gICAgSXRlbXM6IG1hcHBlZEl0ZW1zLFxyXG4gICAgVHJhY2VJZDogdW5kZWZpbmVkLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBTZXRzIHJ1bnRpbWUgYXV0aCBpbnB1dHMgdXNlZCB0byByZXNvbHZlIEVudHJhIGNvbnRleHQgYW5kIG1hbmRhdG9yeSBleHBlbnNlIGhlYWRlcnMuXHJcbmV4cG9ydCBjb25zdCBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCA9IChzZWVkOiBQYXJ0aWFsPEV4cGVuc2VBcGlBdXRoU2VlZD4pOiB2b2lkID0+IHtcclxuICBjb25zdCBzdHJpY3RGcm9tU2VlZCA9IHRvRmxhZ0Jvb2woc2VlZC5zdHJpY3RBcGlSb3V0ZXMpO1xyXG4gIGNvbnN0IHN0cmljdEZyb21SdW50aW1lID1cclxuICAgIHR5cGVvZiBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzID09PSBcImJvb2xlYW5cIiA/IHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXMgOiByZWFkUnVudGltZVN0cmljdEFwaUZsYWcoKTtcclxuXHJcbiAgcnVudGltZUF1dGhTZWVkID0ge1xyXG4gICAgLi4ucnVudGltZUF1dGhTZWVkLFxyXG4gICAgdG9rZW46IHNhZmVUZXh0KHNlZWQudG9rZW4gfHwgcnVudGltZUF1dGhTZWVkLnRva2VuKSxcclxuICAgIGVudHJhT2lkOiBzYWZlVGV4dChzZWVkLmVudHJhT2lkIHx8IHJ1bnRpbWVBdXRoU2VlZC5lbnRyYU9pZCksXHJcbiAgICBhcHBDb2RlOiBzYWZlVGV4dChzZWVkLmFwcENvZGUgfHwgcnVudGltZUF1dGhTZWVkLmFwcENvZGUgfHwgREVGQVVMVF9BUFBfQ09ERSksXHJcbiAgICBzdHJpY3RBcGlSb3V0ZXM6IHN0cmljdEZyb21TZWVkID8/IHN0cmljdEZyb21SdW50aW1lLFxyXG4gIH07XHJcblxyXG4gIGNhY2hlZENvbnRleHQgPSBudWxsO1xyXG4gIGNhY2hlZENvbnRleHRLZXkgPSBcIlwiO1xyXG4gIGNvbnRleHRQcm9taXNlID0gbnVsbDtcclxuICBjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcy5jbGVhcigpO1xyXG4gIHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLmNsZWFyKCk7XHJcbn07XHJcblxyXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvbGlzdCBpdGVtIGNvbnRyYWN0IHRvIGxpc3QgY2FyZCBVSSBtb2RlbC5cclxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkID0gbWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmRDb3JlO1xyXG5cclxuLy8gTWFwcyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9IGhlYWRlciBjb250cmFjdCB0byBVSSBtb2RlbC5cclxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldEhlYWRlciA9IG1hcEV4cGVuc2VTaGVldEhlYWRlckNvcmU7XHJcblxyXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0gbGluZSBjb250cmFjdCB0byBVSSBtb2RlbC5cclxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldExpbmUgPSBtYXBFeHBlbnNlU2hlZXRMaW5lQ29yZTtcclxuXHJcbmV4cG9ydCB0eXBlIEV4cGVuc2VTaGVldExpc3RGZXRjaENhcHR1cmUgPSB7XHJcbiAgcmVxdWVzdDogRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3Q7XHJcbiAgcmVzcG9uc2U6IEV4cGVuc2VTaGVldExpc3RSZXNwb25zZUVudmVsb3BlO1xyXG4gIGF4VXNlcklkT3ZlcnJpZGU6IHN0cmluZyB8IG51bGw7XHJcbiAgc291cmNlOiBcImFwaVwiIHwgXCJsZWdhY3lcIjtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEV4cGVuc2VTaGVldExpc3RGZXRjaE9wdGlvbnMgPSBBcGlGZXRjaE9wdGlvbnMgJiB7XHJcbiAgYXhVc2VySWRPdmVycmlkZT86IHN0cmluZztcclxuICBvblJlcXVlc3RQcmVwYXJlZD86IChyZXF1ZXN0OiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCkgPT4gdm9pZDtcclxuICBvbkNhcHR1cmU/OiAoY2FwdHVyZTogRXhwZW5zZVNoZWV0TGlzdEZldGNoQ2FwdHVyZSkgPT4gdm9pZDtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEV4cGVuc2VUaWNrZXRMaXN0RmV0Y2hPcHRpb25zID0gQXBpRmV0Y2hPcHRpb25zICYge1xyXG4gIGF4VXNlcklkT3ZlcnJpZGU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBFeHBlbnNlU2hlZXRMaXN0U291cmNlSnNvbk9wdGlvbnMgPSBBcGlGZXRjaE9wdGlvbnMgJiB7XHJcbiAgYXhVc2VySWRPdmVycmlkZT86IHN0cmluZztcclxuICBzZWVkUmVzcG9uc2U/OiBFeHBlbnNlU2hlZXRMaXN0UmVzcG9uc2VFbnZlbG9wZSB8IG51bGw7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZFRpY2tldExpc3RIZWFkZXJzID0gKFxyXG4gIGNvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0LFxyXG4gIG9wdGlvbnM6IEFwaUZldGNoT3B0aW9ucyB8IHVuZGVmaW5lZCxcclxuICBheFVzZXJJZE92ZXJyaWRlOiBzdHJpbmcgfCB1bmRlZmluZWRcclxuKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9PiB7XHJcbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUsIGZhbHNlKSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZE92ZXJyaWRlQXhVc2VySWQgPSBub3JtYWxpemVBeFVzZXJJZEhlYWRlcihheFVzZXJJZE92ZXJyaWRlKTtcclxuICBjb25zdCByZXNvbHZlZEF4VXNlcklkID0gc2FmZVRleHQobm9ybWFsaXplZE92ZXJyaWRlQXhVc2VySWQgfHwgY29udGV4dC5heFVzZXJJZCk7XHJcbiAgaWYgKHJlc29sdmVkQXhVc2VySWQpIHtcclxuICAgIGhlYWRlcnNbXCJYLUlORC1BeFVzZXJJZFwiXSA9IHJlc29sdmVkQXhVc2VySWQ7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJlbW92ZUhlYWRlclZhbHVlKGhlYWRlcnMsIFwiWC1JTkQtQXhVc2VySWRcIik7XHJcbiAgfVxyXG4gIHJldHVybiBoZWFkZXJzO1xyXG59O1xyXG5cclxuLy8gTG9hZHMgdGhlIGV4cGVuc2Ugc2hlZXQgbGlzdCBmcm9tIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvbGlzdC5cclxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0TGlzdCA9IGFzeW5jIChcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCxcclxuICBvcHRpb25zPzogRXhwZW5zZVNoZWV0TGlzdEZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+PiA9PiB7XHJcbiAgY29uc3QgeyBheFVzZXJJZE92ZXJyaWRlLCBvblJlcXVlc3RQcmVwYXJlZCwgb25DYXB0dXJlLCAuLi5iYXNlT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcclxuICBjb25zdCByYXdDcmVhdGVkRGF0ZUZyb20gPSBzYWZlVGV4dChwYXlsb2FkPy5jcmVhdGVkRGF0ZUZyb20pO1xyXG4gIGNvbnN0IHJhd0NyZWF0ZWREYXRlVG8gPSBzYWZlVGV4dChwYXlsb2FkPy5jcmVhdGVkRGF0ZVRvKTtcclxuICBjb25zdCBjcmVhdGVkRGF0ZUZyb20gPSBub3JtYWxpemVPcHRpb25hbEFwaURhdGUocmF3Q3JlYXRlZERhdGVGcm9tKTtcclxuICBjb25zdCBjcmVhdGVkRGF0ZVRvID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlKHJhd0NyZWF0ZWREYXRlVG8pO1xyXG5cclxuICBpZiAocmF3Q3JlYXRlZERhdGVGcm9tICYmICFjcmVhdGVkRGF0ZUZyb20pIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xyXG4gIH1cclxuICBpZiAocmF3Q3JlYXRlZERhdGVUbyAmJiAhY3JlYXRlZERhdGVUbykge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzYWZlUGF5bG9hZDogRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3QgPSB7XHJcbiAgICAuLi5wYXlsb2FkLFxyXG4gICAgY3JlYXRlZERhdGVGcm9tLFxyXG4gICAgY3JlYXRlZERhdGVUbyxcclxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlcihwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyksXHJcbiAgICBpbmNsdWRlU3Vib3JkaW5hdGVzOiBwYXlsb2FkLmluY2x1ZGVTdWJvcmRpbmF0ZXMgPT09IHRydWUsXHJcbiAgfTtcclxuICBjb25zdCBzZXJpYWxpemVkUGF5bG9hZCA9IGNsb25lSnNvbkNvbXBhdGlibGVWYWx1ZShzYWZlUGF5bG9hZCk7XHJcblxyXG4gIG9uUmVxdWVzdFByZXBhcmVkPy4oc2VyaWFsaXplZFBheWxvYWQpO1xyXG5cclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQoYmFzZU9wdGlvbnMpO1xyXG4gIGNvbnN0IGxpc3RIZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgYmFzZU9wdGlvbnMsIHRydWUsIGZhbHNlKSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZE92ZXJyaWRlQXhVc2VySWQgPSBub3JtYWxpemVBeFVzZXJJZEhlYWRlcihheFVzZXJJZE92ZXJyaWRlKTtcclxuICBjb25zdCByZXNvbHZlZEF4VXNlcklkID0gc2FmZVRleHQobm9ybWFsaXplZE92ZXJyaWRlQXhVc2VySWQgfHwgY29udGV4dC5heFVzZXJJZCk7XHJcbiAgaWYgKHJlc29sdmVkQXhVc2VySWQpIHtcclxuICAgIGxpc3RIZWFkZXJzW1wiWC1JTkQtQXhVc2VySWRcIl0gPSByZXNvbHZlZEF4VXNlcklkO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShsaXN0SGVhZGVycywgXCJYLUlORC1BeFVzZXJJZFwiKTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldExpc3RJdGVtRHRvPj4oXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL2xpc3RcIiwge1xyXG4gICAgICAuLi5iYXNlT3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczogbGlzdEhlYWRlcnMsXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcclxuICAgIH0pO1xyXG5cclxuICAgIG9uQ2FwdHVyZT8uKHtcclxuICAgICAgcmVxdWVzdDogc2VyaWFsaXplZFBheWxvYWQsXHJcbiAgICAgIHJlc3BvbnNlOiBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUocmVzcG9uc2UpLFxyXG4gICAgICBheFVzZXJJZE92ZXJyaWRlOiBub3JtYWxpemVkT3ZlcnJpZGVBeFVzZXJJZCB8fCBudWxsLFxyXG4gICAgICBzb3VyY2U6IFwiYXBpXCIsXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBpZiAoIXNob3VsZFVzZUxlZ2FjeUZhbGxiYWNrKGVycm9yKSkge1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBsZWdhY3lSZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxMZWdhY3lFeHBlbnNlTGlzdFJlc3BvbnNlPihcIi9HYXN0b3MvTGlzdEV4cGVuc2VTaGVldHNcIiwge1xyXG4gICAgICAuLi5iYXNlT3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIC4uLnNhbml0aXplSGVhZGVycyhiYXNlT3B0aW9ucz8uaGVhZGVycyksXHJcbiAgICAgICAgLi4uSlNPTl9IRUFERVJTLFxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh0b0xlZ2FjeUxpc3RSZXF1ZXN0UGF5bG9hZChzYWZlUGF5bG9hZCkpLFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgbWFwcGVkID0gbWFwTGVnYWN5TGlzdFJlc3BvbnNlKFxyXG4gICAgICBsZWdhY3lSZXNwb25zZSxcclxuICAgICAgTnVtYmVyLmlzRmluaXRlKHNhZmVQYXlsb2FkLnBhZ2UpICYmIHNhZmVQYXlsb2FkLnBhZ2UgPiAwID8gc2FmZVBheWxvYWQucGFnZSA6IDEsXHJcbiAgICAgIE51bWJlci5pc0Zpbml0ZShzYWZlUGF5bG9hZC5wYWdlU2l6ZSkgJiYgc2FmZVBheWxvYWQucGFnZVNpemUgPiAwID8gc2FmZVBheWxvYWQucGFnZVNpemUgOiA1MFxyXG4gICAgKTtcclxuXHJcbiAgICBvbkNhcHR1cmU/Lih7XHJcbiAgICAgIHJlcXVlc3Q6IHNlcmlhbGl6ZWRQYXlsb2FkLFxyXG4gICAgICByZXNwb25zZTogY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlKG1hcHBlZCksXHJcbiAgICAgIGF4VXNlcklkT3ZlcnJpZGU6IG5vcm1hbGl6ZWRPdmVycmlkZUF4VXNlcklkIHx8IG51bGwsXHJcbiAgICAgIHNvdXJjZTogXCJsZWdhY3lcIixcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZShtYXBwZWQpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVBvc2l0aXZlSW50ZWdlciA9ICh2YWx1ZTogdW5rbm93biwgZmFsbGJhY2tWYWx1ZTogbnVtYmVyKTogbnVtYmVyID0+IHtcclxuICBjb25zdCBwYXJzZWRWYWx1ZSA9IE51bWJlcih2YWx1ZSk7XHJcbiAgaWYgKE51bWJlci5pc0Zpbml0ZShwYXJzZWRWYWx1ZSkgJiYgcGFyc2VkVmFsdWUgPiAwKSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihwYXJzZWRWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZmFsbGJhY2tWYWx1ZTtcclxufTtcclxuXHJcbi8vIFJlYnVpbGRzIG9uZSBmdWxsIGxpc3QgZW52ZWxvcGUgZm9yIHRoZSBhc3Npc3RhbnQgYnkgbG9hZGluZyBldmVyeSBwYWdlIG9mIHRoZSBhY3RpdmUgcXVlcnkuXHJcbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldExpc3RTb3VyY2VKc29uID0gYXN5bmMgKFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBFeHBlbnNlU2hlZXRMaXN0U291cmNlSnNvbk9wdGlvbnNcclxuKTogUHJvbWlzZTxFeHBlbnNlU2hlZXRMaXN0UmVzcG9uc2VFbnZlbG9wZT4gPT4ge1xyXG4gIGNvbnN0IHsgc2VlZFJlc3BvbnNlLCAuLi5iYXNlT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcclxuICBjb25zdCBmYWxsYmFja1BhZ2UgPSBub3JtYWxpemVQb3NpdGl2ZUludGVnZXIocGF5bG9hZD8ucGFnZSwgMSk7XHJcbiAgY29uc3QgZmFsbGJhY2tQYWdlU2l6ZSA9IG5vcm1hbGl6ZVBvc2l0aXZlSW50ZWdlcihwYXlsb2FkPy5wYWdlU2l6ZSwgNTApO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRTZWVkUmVzcG9uc2UgPSBzZWVkUmVzcG9uc2UgPyBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZShjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUoc2VlZFJlc3BvbnNlKSkgOiBudWxsO1xyXG4gIGNvbnN0IGluaXRpYWxSZXNwb25zZSA9IG5vcm1hbGl6ZWRTZWVkUmVzcG9uc2UgPz8gKGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0TGlzdChwYXlsb2FkLCBiYXNlT3B0aW9ucykpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRJbml0aWFsUmVzcG9uc2UgPSBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZShjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUoaW5pdGlhbFJlc3BvbnNlKSk7XHJcblxyXG4gIGlmIChub3JtYWxpemVkSW5pdGlhbFJlc3BvbnNlLlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcclxuICAgICAgc2FmZVRleHQobm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5NZXNzYWdlKSB8fCBcIkNvdWxkIG5vdCBsb2FkIHRoZSBmdWxsIGV4cGVuc2Ugc2hlZXQgcXVlcnkuXCJcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB0b3RhbFJlY29yZHNSYXcgPSBOdW1iZXIobm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5Ub3RhbCk7XHJcbiAgY29uc3QgdG90YWxSZWNvcmRzID1cclxuICAgIE51bWJlci5pc0Zpbml0ZSh0b3RhbFJlY29yZHNSYXcpICYmIHRvdGFsUmVjb3Jkc1JhdyA+PSAwXHJcbiAgICAgID8gTWF0aC5mbG9vcih0b3RhbFJlY29yZHNSYXcpXHJcbiAgICAgIDogbm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5JdGVtcy5sZW5ndGg7XHJcbiAgY29uc3QgZWZmZWN0aXZlUGFnZVNpemUgPSBub3JtYWxpemVQb3NpdGl2ZUludGVnZXIobm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5QYWdlU2l6ZSwgZmFsbGJhY2tQYWdlU2l6ZSk7XHJcbiAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGgubWF4KDEsIE1hdGguY2VpbCh0b3RhbFJlY29yZHMgLyBNYXRoLm1heCgxLCBlZmZlY3RpdmVQYWdlU2l6ZSkpKTtcclxuICBjb25zdCBjdXJyZW50UGFnZSA9IE1hdGgubWluKFxyXG4gICAgdG90YWxQYWdlcyxcclxuICAgIG5vcm1hbGl6ZVBvc2l0aXZlSW50ZWdlcihub3JtYWxpemVkSW5pdGlhbFJlc3BvbnNlLlBhZ2UgPz8gZmFsbGJhY2tQYWdlLCBmYWxsYmFja1BhZ2UpXHJcbiAgKTtcclxuXHJcbiAgaWYgKHRvdGFsUGFnZXMgPD0gMSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLi4ubm9ybWFsaXplZEluaXRpYWxSZXNwb25zZSxcclxuICAgICAgVG90YWw6IHRvdGFsUmVjb3JkcyxcclxuICAgICAgUGFnZTogMSxcclxuICAgICAgUGFnZVNpemU6IGVmZmVjdGl2ZVBhZ2VTaXplLFxyXG4gICAgICBJdGVtczogY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlKG5vcm1hbGl6ZWRJbml0aWFsUmVzcG9uc2UuSXRlbXMpLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGl0ZW1zQnlQYWdlID0gbmV3IE1hcDxudW1iZXIsIEV4cGVuc2VTaGVldExpc3RJdGVtRHRvW10+KCk7XHJcbiAgaXRlbXNCeVBhZ2Uuc2V0KGN1cnJlbnRQYWdlLCBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUobm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5JdGVtcykpO1xyXG5cclxuICBmb3IgKGxldCBwYWdlTnVtYmVyID0gMTsgcGFnZU51bWJlciA8PSB0b3RhbFBhZ2VzOyBwYWdlTnVtYmVyICs9IDEpIHtcclxuICAgIGlmIChwYWdlTnVtYmVyID09PSBjdXJyZW50UGFnZSkge1xyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYWdlUmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldExpc3QoXHJcbiAgICAgIHtcclxuICAgICAgICAuLi5wYXlsb2FkLFxyXG4gICAgICAgIHBhZ2U6IHBhZ2VOdW1iZXIsXHJcbiAgICAgICAgcGFnZVNpemU6IGVmZmVjdGl2ZVBhZ2VTaXplLFxyXG4gICAgICB9LFxyXG4gICAgICBiYXNlT3B0aW9uc1xyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocGFnZVJlc3BvbnNlLlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFxyXG4gICAgICAgIHNhZmVUZXh0KHBhZ2VSZXNwb25zZS5NZXNzYWdlKSB8fCBgQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBwYWdlICR7cGFnZU51bWJlcn0uYFxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGl0ZW1zQnlQYWdlLnNldChwYWdlTnVtYmVyLCBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUocGFnZVJlc3BvbnNlLkl0ZW1zKSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhbGxJdGVtczogRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG9bXSA9IFtdO1xyXG4gIGZvciAobGV0IHBhZ2VOdW1iZXIgPSAxOyBwYWdlTnVtYmVyIDw9IHRvdGFsUGFnZXM7IHBhZ2VOdW1iZXIgKz0gMSkge1xyXG4gICAgY29uc3QgcGFnZUl0ZW1zID0gaXRlbXNCeVBhZ2UuZ2V0KHBhZ2VOdW1iZXIpO1xyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHBhZ2VJdGVtcykgfHwgcGFnZUl0ZW1zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuXHJcbiAgICBhbGxJdGVtcy5wdXNoKC4uLnBhZ2VJdGVtcyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgLi4ubm9ybWFsaXplZEluaXRpYWxSZXNwb25zZSxcclxuICAgIFRvdGFsOiB0b3RhbFJlY29yZHMsXHJcbiAgICBQYWdlOiAxLFxyXG4gICAgUGFnZVNpemU6IGVmZmVjdGl2ZVBhZ2VTaXplLFxyXG4gICAgSXRlbXM6IGFsbEl0ZW1zLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBMb2FkcyBvbmUgZXhwZW5zZSBzaGVldCBkZXRhaWwgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9LlxyXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwgPSBhc3luYyAoXHJcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0RGV0YWlsRHRvPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlU2hlZXRJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXREZXRhaWxEdG8+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy8ke3NhZmVTaGVldElkfWAsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBSZWFkcyBhdmFpbGFibGUgY3VycmVuY2llcyBmcm9tIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvY3VycmVuY2llcy5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTaGVldEN1cnJlbmNpZXMgPSBhc3luYyAoXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+PiA9PiB7XHJcbiAgbGV0IGNvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0IHwgbnVsbCA9IG51bGw7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgaWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSkge1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGNvbXBhbnlJZCA9IHNhZmVUZXh0KGNvbnRleHQ/LmNvbXBhbnlJZCB8fCByZWFkV2luZG93U2VsZWN0ZWRDb21wYW55KCkpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3QgY2FjaGVLZXkgPSBjb21wYW55SWQgfHwgXCItXCI7XHJcblxyXG4gIGlmIChjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcy5oYXMoY2FjaGVLZXkpKSB7XHJcbiAgICByZXR1cm4gY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuZ2V0KGNhY2hlS2V5KSBhcyBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPjtcclxuICB9XHJcblxyXG4gIGlmIChwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5oYXMoY2FjaGVLZXkpKSB7XHJcbiAgICByZXR1cm4gcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuZ2V0KGNhY2hlS2V5KSBhcyBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+PjtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlcXVlc3RQcm9taXNlID0gKGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XHJcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIkF1dGhvcml6YXRpb25cIik7XHJcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIlgtSU5ELUF4VXNlcklkXCIpO1xyXG5cclxuICAgIGlmIChjb21wYW55SWQpIHtcclxuICAgICAgaGVhZGVyc1tcIlgtSU5ELUNvbXBhbnlcIl0gPSBjb21wYW55SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9jdXJyZW5jaWVzXCIsIHtcclxuICAgICAgICAuLi5vcHRpb25zLFxyXG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICBoZWFkZXJzLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRSZXNwb25zZSA9IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgICAgIGlmIChub3JtYWxpemVkUmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgIGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLnNldChjYWNoZUtleSwgbm9ybWFsaXplZFJlc3BvbnNlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRSZXNwb25zZTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGlmICghc2hvdWxkVXNlTGVnYWN5RmFsbGJhY2soZXJyb3IpKSB7XHJcbiAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGxlZ2FjeUxpc3RSZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxMZWdhY3lFeHBlbnNlTGlzdFJlc3BvbnNlPihcIi9HYXN0b3MvTGlzdEV4cGVuc2VTaGVldHNcIiwge1xyXG4gICAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAuLi5zYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyksXHJcbiAgICAgICAgICAuLi5KU09OX0hFQURFUlMsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICBmaWx0ZXI6IFwiXCIsXHJcbiAgICAgICAgICBob2phR2FzdG9zSWQ6IFwiXCIsXHJcbiAgICAgICAgICBiaWxsZWRNb2RlOiAyLFxyXG4gICAgICAgICAgZnJvbURhdGU6IFwiXCIsXHJcbiAgICAgICAgICB0b0RhdGU6IFwiXCIsXHJcbiAgICAgICAgICBwcm9qZWN0SWQ6IFwiXCIsXHJcbiAgICAgICAgICBjdXJyZW5jeUNvZGU6IFwiXCIsXHJcbiAgICAgICAgICBwYWdlOiAxLFxyXG4gICAgICAgICAgcGFnZVNpemU6IDIwMCxcclxuICAgICAgICB9KSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBzZWVuQ29kZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcclxuICAgICAgY29uc3Qgc291cmNlSXRlbXMgPSBBcnJheS5pc0FycmF5KGxlZ2FjeUxpc3RSZXNwb25zZS5pdGVtcykgPyBsZWdhY3lMaXN0UmVzcG9uc2UuaXRlbXMgOiBbXTtcclxuICAgICAgY29uc3QgZmFsbGJhY2tJdGVtczogRXhwZW5zZVNoZWV0Q3VycmVuY3lEdG9bXSA9IHNvdXJjZUl0ZW1zXHJcbiAgICAgICAgLm1hcCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5LmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSlcclxuICAgICAgICAuZmlsdGVyKChjb2RlKSA9PiAhIWNvZGUpXHJcbiAgICAgICAgLmZpbHRlcigoY29kZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHNlZW5Db2Rlcy5oYXMoY29kZSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIHNlZW5Db2Rlcy5hZGQoY29kZSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5tYXAoKGNvZGUpID0+ICh7XHJcbiAgICAgICAgICBDdXJyZW5jeUNvZGU6IGNvZGUsXHJcbiAgICAgICAgICBDdXJyZW5jeUNvZGVJU086IGNvZGUsXHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgY29uc3QgZmFsbGJhY2tSZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4gPSB7XHJcbiAgICAgICAgU3VjY2VzczogbGVnYWN5TGlzdFJlc3BvbnNlLnN1Y2Nlc3MgIT09IGZhbHNlLFxyXG4gICAgICAgIE1lc3NhZ2U6IHNhZmVUZXh0KGxlZ2FjeUxpc3RSZXNwb25zZS5tZXNzYWdlKSB8fCBcIk9LXCIsXHJcbiAgICAgICAgVG90YWw6IGZhbGxiYWNrSXRlbXMubGVuZ3RoLFxyXG4gICAgICAgIFBhZ2U6IDEsXHJcbiAgICAgICAgUGFnZVNpemU6IGZhbGxiYWNrSXRlbXMubGVuZ3RoLFxyXG4gICAgICAgIEl0ZW1zOiBmYWxsYmFja0l0ZW1zLFxyXG4gICAgICAgIFRyYWNlSWQ6IHVuZGVmaW5lZCxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRGYWxsYmFjayA9IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZShmYWxsYmFja1Jlc3BvbnNlKTtcclxuICAgICAgaWYgKG5vcm1hbGl6ZWRGYWxsYmFjay5TdWNjZXNzKSB7XHJcbiAgICAgICAgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuc2V0KGNhY2hlS2V5LCBub3JtYWxpemVkRmFsbGJhY2spO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbm9ybWFsaXplZEZhbGxiYWNrO1xyXG4gICAgfVxyXG4gIH0pKCk7XHJcblxyXG4gIHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLnNldChjYWNoZUtleSwgcmVxdWVzdFByb21pc2UpO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gYXdhaXQgcmVxdWVzdFByb21pc2U7XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLmRlbGV0ZShjYWNoZUtleSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gUmVhZHMgYXZhaWxhYmxlIHN1Ym9yZGluYXRlcyBmcm9tIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvc3Vib3JkaW5hdGVzLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVzID0gYXN5bmMgKFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICAvLyBTdWJvcmRpbmF0ZXMgbXVzdCBhbHdheXMgcmVzb2x2ZSBmcm9tIHRoZSBsb2dnZWQgY29udGV4dCB1c2VyLCBub3QgZnJvbSBhY3RpbmctdXNlciBvdmVycmlkZXMuXHJcbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIGZhbHNlLCBmYWxzZSkpO1xyXG4gIGNvbnN0IGNvbnRleHRBeFVzZXJJZCA9IHNhZmVUZXh0KGNvbnRleHQuYXhVc2VySWQpO1xyXG4gIGlmIChjb250ZXh0QXhVc2VySWQpIHtcclxuICAgIGhlYWRlcnNbXCJYLUlORC1BeFVzZXJJZFwiXSA9IGNvbnRleHRBeFVzZXJJZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8dW5rbm93bj4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9zdWJvcmRpbmF0ZXNcIiwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgIGhlYWRlcnMsXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIEV4cG9zZXMgdGhlIGRlZmF1bHQgY3VycmVuY3kgcmVzb2x2ZWQgZnJvbSBFbnRyYSBjb250ZXh0IGZvciBpbml0aWFsIHNlbGVjdGlvbnMuXHJcbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlID0gYXN5bmMgKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgICByZXR1cm4gc2FmZVRleHQoY29udGV4dC5kZWZhdWx0Q3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gUmVhZHMgZXhjaGFuZ2UgcmF0ZSBmcm9tIC9hcGkvc3lzdGVtL2V4Y2hhbmdlLXJhdGUuXHJcbmV4cG9ydCBjb25zdCBnZXRFeGNoYW5nZVJhdGUgPSBhc3luYyAoXHJcbiAgYmFzZUN1cnJlbmN5OiBzdHJpbmcsXHJcbiAgdGFyZ2V0Q3VycmVuY3k6IHN0cmluZyxcclxuICBkYXRlPzogc3RyaW5nLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeGNoYW5nZVJhdGVEdG8+PiA9PiB7XHJcbiAgY29uc3QgdG9rZW4gPSByZXNvbHZlQXV0aFRva2VuKG9wdGlvbnMpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kgPSBzYWZlVGV4dChiYXNlQ3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFRhcmdldEN1cnJlbmN5ID0gc2FmZVRleHQodGFyZ2V0Q3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZERhdGUgPSBzYWZlVGV4dChkYXRlKTtcclxuICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcclxuXHJcbiAgcXVlcnkuc2V0KFwiYmFzZUN1cnJlbmN5XCIsIG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kpO1xyXG4gIHF1ZXJ5LnNldChcInRhcmdldEN1cnJlbmN5XCIsIG5vcm1hbGl6ZWRUYXJnZXRDdXJyZW5jeSk7XHJcbiAgaWYgKG5vcm1hbGl6ZWREYXRlKSB7XHJcbiAgICBxdWVyeS5zZXQoXCJkYXRlXCIsIG5vcm1hbGl6ZWREYXRlKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XHJcbiAgaWYgKHRva2VuKSB7XHJcbiAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7dG9rZW59YDtcclxuICB9XHJcblxyXG4gIHJldHVybiBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhjaGFuZ2VSYXRlRHRvPj4oYC9hcGkvc3lzdGVtL2V4Y2hhbmdlLXJhdGU/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICBoZWFkZXJzLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gUmVhZHMgZXhjaGFuZ2UgcmF0ZSBmcm9tIC9hcGkvc3lzdGVtL2V4Y2hhbmdlLXJhdGUvcHVibGljLWRpcmVjdC5cclxuZXhwb3J0IGNvbnN0IGdldEV4Y2hhbmdlUmF0ZVB1YmxpY0RpcmVjdCA9IGFzeW5jIChcclxuICBiYXNlQ3VycmVuY3k6IHN0cmluZyxcclxuICB0YXJnZXRDdXJyZW5jeTogc3RyaW5nLFxyXG4gIGRhdGU/OiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4Y2hhbmdlUmF0ZUR0bz4+ID0+IHtcclxuICBjb25zdCB0b2tlbiA9IHJlc29sdmVBdXRoVG9rZW4ob3B0aW9ucyk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSA9IHNhZmVUZXh0KGJhc2VDdXJyZW5jeSkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBub3JtYWxpemVkVGFyZ2V0Q3VycmVuY3kgPSBzYWZlVGV4dCh0YXJnZXRDdXJyZW5jeSkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBub3JtYWxpemVkRGF0ZSA9IHNhZmVUZXh0KGRhdGUpO1xyXG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xyXG5cclxuICBxdWVyeS5zZXQoXCJiYXNlQ3VycmVuY3lcIiwgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSk7XHJcbiAgcXVlcnkuc2V0KFwidGFyZ2V0Q3VycmVuY3lcIiwgbm9ybWFsaXplZFRhcmdldEN1cnJlbmN5KTtcclxuICBpZiAobm9ybWFsaXplZERhdGUpIHtcclxuICAgIHF1ZXJ5LnNldChcImRhdGVcIiwgbm9ybWFsaXplZERhdGUpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcclxuICBpZiAodG9rZW4pIHtcclxuICAgIGhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeGNoYW5nZVJhdGVEdG8+PihgL2FwaS9zeXN0ZW0vZXhjaGFuZ2UtcmF0ZS9wdWJsaWMtZGlyZWN0PyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgaGVhZGVycyxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIFJlYWRzIGZ1ZWwgcHJpY2UgcGVyIGttIGZyb20gL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9mdWVsLXByaWNlLWttLlxyXG5leHBvcnQgY29uc3QgZ2V0RnVlbFByaWNlS20gPSBhc3luYyAoXHJcbiAgdHJhbnNEYXRlOiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEZ1ZWxQcmljZUttRHRvPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBub3JtYWxpemVkRGF0ZSA9IG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZSh0cmFuc0RhdGUpO1xyXG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xyXG5cclxuICBxdWVyeS5zZXQoXCJ0cmFuc0RhdGVcIiwgbm9ybWFsaXplZERhdGUpO1xyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxGdWVsUHJpY2VLbUR0bz4+KFxyXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvZnVlbC1wcmljZS1rbT8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCxcclxuICAgIHtcclxuICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBDcmVhdGVzIGFuIGV4cGVuc2Ugc2hlZXQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUV4cGVuc2VTaGVldCA9IGFzeW5jIChcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRDcmVhdGVSZXNwb25zZURhdGE+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IG1vZGUgPSBwYXlsb2FkLm1vZGUgPz8gMDtcclxuICBjb25zdCBsaW5lcyA9IEFycmF5LmlzQXJyYXkocGF5bG9hZC5saW5lcykgPyBwYXlsb2FkLmxpbmVzIDogW107XHJcbiAgY29uc3Qgbm9ybWFsaXplZExpbmVzID0gbGluZXMubWFwKChsaW5lKSA9PiAoe1xyXG4gICAgLi4ubGluZSxcclxuICAgIHRyYW5zRGF0ZTogbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlKGxpbmUudHJhbnNEYXRlKSxcclxuICB9KSk7XHJcbiAgY29uc3QgaGFzSW52YWxpZExpbmVQYXlsb2FkID0gbm9ybWFsaXplZExpbmVzLnNvbWUoKGxpbmUpID0+IHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICFzYWZlVGV4dChsaW5lLnRyYW5zRGF0ZSkgfHxcclxuICAgICAgIU51bWJlci5pc0ludGVnZXIoTnVtYmVyKGxpbmUudHlwZVZhbHVlKSkgfHxcclxuICAgICAgTnVtYmVyKGxpbmUudHlwZVZhbHVlKSA8PSAwIHx8XHJcbiAgICAgICFpc1Bvc2l0aXZlTnVtYmVyKGxpbmUucXR5KSB8fFxyXG4gICAgICAhaXNQb3NpdGl2ZU51bWJlcihsaW5lLnByaWNlKVxyXG4gICAgKTtcclxuICB9KTtcclxuXHJcbiAgaWYgKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzICE9PSB1bmRlZmluZWQgJiYgIWlzTm9uTmVnYXRpdmVOdW1iZXIocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMpKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4cGVuc2VTaGVldFN0YXR1cyBtdXN0IGJlIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMC5cIik7XHJcbiAgfVxyXG5cclxuICBpZiAocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlICE9PSB1bmRlZmluZWQgJiYgIWlzTm9uTmVnYXRpdmVOdW1iZXIocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlKSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleGNoYW5nZVJhdGVNb2RlIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byAwLlwiKTtcclxuICB9XHJcblxyXG4gIGlmIChwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUgIT09IHVuZGVmaW5lZCAmJiBwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4Y2hhbmdlUmF0ZU1vZGUgcmVxdWlyZXMgZXhwZW5zZVNoZWV0U3RhdHVzLlwiKTtcclxuICB9XHJcblxyXG4gIGlmIChoYXNJbnZhbGlkTGluZVBheWxvYWQpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiRWFjaCBsaW5lIHJlcXVpcmVzIHRyYW5zRGF0ZSwgdHlwZVZhbHVlLCBxdHkgPiAwIGFuZCBwcmljZSA+IDAuXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKG1vZGUgPT09IDApIHtcclxuICAgIGlmICghc2FmZVRleHQocGF5bG9hZC5kZXNjcmlwdGlvbikgfHwgIXNhZmVUZXh0KHBheWxvYWQuY3VycmVuY3lDb2RlKSB8fCBsaW5lcy5sZW5ndGggPCAxKSB7XHJcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiSW52YWxpZCBjcmVhdGUgcGF5bG9hZCBmb3IgbW9kZSAwLlwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChtb2RlID09PSAxKSB7XHJcbiAgICBpZiAoIXNhZmVUZXh0KHBheWxvYWQuZGVzY3JpcHRpb24pIHx8ICFzYWZlVGV4dChwYXlsb2FkLmN1cnJlbmN5Q29kZSkpIHtcclxuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJJbnZhbGlkIGNyZWF0ZSBwYXlsb2FkIGZvciBtb2RlIDEuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsaW5lcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiTW9kZSAxIHJlcXVpcmVzIGxpbmVzIHRvIGJlIG51bGwgb3IgZW1wdHkuXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKG1vZGUgPT09IDIpIHtcclxuICAgIGlmICghc2FmZVRleHQocGF5bG9hZC5leGlzdGluZ0hvamFHYXN0b3NJZCkgfHwgbGluZXMubGVuZ3RoIDwgMSkge1xyXG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkludmFsaWQgY3JlYXRlIHBheWxvYWQgZm9yIG1vZGUgMi5cIik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBub3JtYWxpemVkUGF5bG9hZDogRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCA9IHtcclxuICAgIC4uLnBheWxvYWQsXHJcbiAgICBtb2RlLFxyXG4gICAgZXhpc3RpbmdIb2phR2FzdG9zSWQ6IHNhZmVUZXh0KHBheWxvYWQuZXhpc3RpbmdIb2phR2FzdG9zSWQpIHx8IHVuZGVmaW5lZCxcclxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChwYXlsb2FkLmRlc2NyaXB0aW9uKSB8fCB1bmRlZmluZWQsXHJcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KHBheWxvYWQuY3VycmVuY3lDb2RlKSB8fCB1bmRlZmluZWQsXHJcbiAgICBwcm9qSWQ6IHNhZmVUZXh0KHBheWxvYWQucHJvaklkKSB8fCB1bmRlZmluZWQsXHJcbiAgICBsaW5lczogbW9kZSA9PT0gMSA/IFtdIDogbm9ybWFsaXplZExpbmVzLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldENyZWF0ZVJlc3BvbnNlRGF0YT4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0c1wiLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShub3JtYWxpemVkUGF5bG9hZCksXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBVcGRhdGVzIGhlYWRlciBmaWVsZHMgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4cGVuc2VTaGVldEhlYWRlciA9IGFzeW5jIChcclxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTx7IEhvamFHYXN0b3NJZDogc3RyaW5nIH0+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcclxuXHJcbiAgaWYgKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzICE9PSB1bmRlZmluZWQgJiYgIWlzTm9uTmVnYXRpdmVOdW1iZXIocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMpKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4cGVuc2VTaGVldFN0YXR1cyBtdXN0IGJlIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMC5cIik7XHJcbiAgfVxyXG5cclxuICBpZiAocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlICE9PSB1bmRlZmluZWQgJiYgIWlzTm9uTmVnYXRpdmVOdW1iZXIocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlKSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleGNoYW5nZVJhdGVNb2RlIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byAwLlwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPHsgSG9qYUdhc3Rvc0lkOiBzdHJpbmcgfT4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9YCwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIERlbGV0ZXMgYSBmdWxsIGV4cGVuc2Ugc2hlZXQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS9saW5lcy8wP2RlbGV0ZVdob2xlU2hlZXQ9dHJ1ZS5cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VTaGVldCA9IGFzeW5jIChcclxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+PihcclxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9L2xpbmVzLzA/ZGVsZXRlTW9kZT0yJmRlbGV0ZVdob2xlU2hlZXQ9dHJ1ZWAsXHJcbiAgICB7XHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gVXBkYXRlcyBvbmUgZXhwZW5zZSBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0vbGluZXMve2xpbmVSZWNJZH0uXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVFeHBlbnNlU2hlZXRMaW5lID0gYXN5bmMgKFxyXG4gIGhvamFHYXN0b3NJZDogc3RyaW5nLFxyXG4gIGxpbmVSZWNJZDogc3RyaW5nLFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVzcG9uc2VEYXRhPj4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc0RhdGUgPSBub3JtYWxpemVSZXF1aXJlZEFwaURhdGUocGF5bG9hZC50cmFuc0RhdGUpO1xyXG4gIGlmIChcclxuICAgICFOdW1iZXIuaXNJbnRlZ2VyKE51bWJlcihwYXlsb2FkLnR5cGVWYWx1ZSkpIHx8XHJcbiAgICBOdW1iZXIocGF5bG9hZC50eXBlVmFsdWUpIDw9IDAgfHxcclxuICAgICFpc1Bvc2l0aXZlTnVtYmVyKHBheWxvYWQucXR5KSB8fFxyXG4gICAgIWlzUG9zaXRpdmVOdW1iZXIocGF5bG9hZC5wcmljZSlcclxuICApIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwidHJhbnNEYXRlLCB0eXBlVmFsdWUsIHF0eSA+IDAgYW5kIHByaWNlID4gMCBhcmUgcmVxdWlyZWQuXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCBzYWZlTGluZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhsaW5lUmVjSWQgfHwgXCJcIikudHJpbSgpKTtcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlc3BvbnNlRGF0YT4+KFxyXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH0vbGluZXMvJHtzYWZlTGluZUlkfWAsXHJcbiAgICB7XHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIC4uLnBheWxvYWQsXHJcbiAgICAgICAgdHJhbnNEYXRlOiBub3JtYWxpemVkVHJhbnNEYXRlLFxyXG4gICAgICB9KSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gRGVsZXRlcyBvbmUgZXhwZW5zZSBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0vbGluZXMve2xpbmVSZWNJZH0/ZGVsZXRlV2hvbGVTaGVldD1mYWxzZS5cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VTaGVldExpbmUgPSBhc3luYyAoXHJcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXHJcbiAgbGluZVJlY0lkOiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG51bGw+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCBzYWZlTGluZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhsaW5lUmVjSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxudWxsPj4oXHJcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy8ke3NhZmVTaGVldElkfS9saW5lcy8ke3NhZmVMaW5lSWR9P2RlbGV0ZU1vZGU9MCZkZWxldGVXaG9sZVNoZWV0PWZhbHNlYCxcclxuICAgIHtcclxuICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxyXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVFeHBlbnNlU2hlZXRzQXNrUmVzcG9uc2UgPSAocmVzcG9uc2U6IEV4cGVuc2VTaGVldHNBc2tSZXN1bHQpOiBFeHBlbnNlU2hlZXRzQXNrUmVzdWx0ID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG4gIGNvbnN0IHJhd0RhdGEgPSBub3JtYWxpemVkPy5EYXRhO1xyXG4gIGlmICghcmF3RGF0YSB8fCB0eXBlb2YgcmF3RGF0YSAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLi4ubm9ybWFsaXplZCxcclxuICAgICAgTWVzc2FnZTogc2FuaXRpemVBc3Npc3RhbnRUZXh0KG5vcm1hbGl6ZWQ/Lk1lc3NhZ2UpLFxyXG4gICAgICBIdHRwU3RhdHVzOiB0eXBlb2YgcmVzcG9uc2U/Lkh0dHBTdGF0dXMgPT09IFwibnVtYmVyXCIgPyByZXNwb25zZS5IdHRwU3RhdHVzIDogdW5kZWZpbmVkLFxyXG4gICAgICBSZXRyeUFmdGVyOiBzYWZlVGV4dChyZXNwb25zZT8uUmV0cnlBZnRlcikgfHwgbnVsbCxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb25zdCByYXdXYXJuaW5ncyA9XHJcbiAgICAocmF3RGF0YSBhcyB7IFdhcm5pbmdzPzogdW5rbm93bjsgd2FybmluZ3M/OiB1bmtub3duIH0pLldhcm5pbmdzID8/XHJcbiAgICAocmF3RGF0YSBhcyB7IHdhcm5pbmdzPzogdW5rbm93biB9KS53YXJuaW5ncztcclxuICBjb25zdCByYXdGaWx0ZXJzQXBwbGllZCA9XHJcbiAgICAocmF3RGF0YSBhcyB7IEZpbHRlcnNBcHBsaWVkPzogdW5rbm93bjsgZmlsdGVyc0FwcGxpZWQ/OiB1bmtub3duIH0pLkZpbHRlcnNBcHBsaWVkID8/XHJcbiAgICAocmF3RGF0YSBhcyB7IGZpbHRlcnNBcHBsaWVkPzogdW5rbm93biB9KS5maWx0ZXJzQXBwbGllZDtcclxuXHJcbiAgY29uc3QgaXNJZ25vcmFibGVBc3Npc3RhbnRXYXJuaW5nID0gKHdhcm5pbmc6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZFdhcm5pbmcgPSBzYW5pdGl6ZUFzc2lzdGFudFRleHQod2FybmluZykudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmICghbm9ybWFsaXplZFdhcm5pbmcpIHJldHVybiB0cnVlO1xyXG5cclxuICAgIHJldHVybiBub3JtYWxpemVkV2FybmluZy5pbmNsdWRlcyhcInNvdXJjZWpzb25cIikgJiZcclxuICAgICAgKG5vcm1hbGl6ZWRXYXJuaW5nLmluY2x1ZGVzKFwic2tpcHBlZFwiKSB8fCBub3JtYWxpemVkV2FybmluZy5pbmNsdWRlcyhcIm9taXRcIikpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAuLi5ub3JtYWxpemVkLFxyXG4gICAgTWVzc2FnZTogc2FuaXRpemVBc3Npc3RhbnRUZXh0KG5vcm1hbGl6ZWQ/Lk1lc3NhZ2UpLFxyXG4gICAgSHR0cFN0YXR1czogdHlwZW9mIHJlc3BvbnNlPy5IdHRwU3RhdHVzID09PSBcIm51bWJlclwiID8gcmVzcG9uc2UuSHR0cFN0YXR1cyA6IHVuZGVmaW5lZCxcclxuICAgIFJldHJ5QWZ0ZXI6IHNhZmVUZXh0KHJlc3BvbnNlPy5SZXRyeUFmdGVyKSB8fCBudWxsLFxyXG4gICAgRGF0YToge1xyXG4gICAgICBBbnN3ZXI6IHNhbml0aXplQXNzaXN0YW50VGV4dChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IEFuc3dlcj86IHVua25vd247IGFuc3dlcj86IHVua25vd24gfSkuQW5zd2VyID8/IChyYXdEYXRhIGFzIHsgYW5zd2VyPzogdW5rbm93biB9KS5hbnN3ZXJcclxuICAgICAgKSxcclxuICAgICAgTW9kZWw6IHNhbml0aXplQXNzaXN0YW50VGV4dChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IE1vZGVsPzogdW5rbm93bjsgbW9kZWw/OiB1bmtub3duIH0pLk1vZGVsID8/IChyYXdEYXRhIGFzIHsgbW9kZWw/OiB1bmtub3duIH0pLm1vZGVsXHJcbiAgICAgICksXHJcbiAgICAgIFNvdXJjZUtleTogc2FuaXRpemVBc3Npc3RhbnRUZXh0KFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgU291cmNlS2V5PzogdW5rbm93bjsgc291cmNlS2V5PzogdW5rbm93biB9KS5Tb3VyY2VLZXkgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgc291cmNlS2V5PzogdW5rbm93biB9KS5zb3VyY2VLZXlcclxuICAgICAgKSxcclxuICAgICAgRmlsdGVyc0FwcGxpZWQ6XHJcbiAgICAgICAgcmF3RmlsdGVyc0FwcGxpZWQgJiYgdHlwZW9mIHJhd0ZpbHRlcnNBcHBsaWVkID09PSBcIm9iamVjdFwiXHJcbiAgICAgICAgICA/IGNsb25lSnNvbkNvbXBhdGlibGVWYWx1ZShyYXdGaWx0ZXJzQXBwbGllZCBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPilcclxuICAgICAgICAgIDogbnVsbCxcclxuICAgICAgVG90YWxTb3VyY2VSZWNvcmRzOlxyXG4gICAgICAgIHRvTnVsbGFibGVOdW1iZXIoXHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IFRvdGFsU291cmNlUmVjb3Jkcz86IHVua25vd247IHRvdGFsU291cmNlUmVjb3Jkcz86IHVua25vd24gfSkuVG90YWxTb3VyY2VSZWNvcmRzID8/XHJcbiAgICAgICAgICAgIChyYXdEYXRhIGFzIHsgdG90YWxTb3VyY2VSZWNvcmRzPzogdW5rbm93biB9KS50b3RhbFNvdXJjZVJlY29yZHNcclxuICAgICAgICApID8/IG51bGwsXHJcbiAgICAgIFJlY29yZHNTZW50VG9Nb2RlbDpcclxuICAgICAgICB0b051bGxhYmxlTnVtYmVyKFxyXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBSZWNvcmRzU2VudFRvTW9kZWw/OiB1bmtub3duOyByZWNvcmRzU2VudFRvTW9kZWw/OiB1bmtub3duIH0pLlJlY29yZHNTZW50VG9Nb2RlbCA/P1xyXG4gICAgICAgICAgICAocmF3RGF0YSBhcyB7IHJlY29yZHNTZW50VG9Nb2RlbD86IHVua25vd24gfSkucmVjb3Jkc1NlbnRUb01vZGVsXHJcbiAgICAgICAgKSA/PyBudWxsLFxyXG4gICAgICBSZXRyaWV2YWxNb2RlOiBzYW5pdGl6ZUFzc2lzdGFudFRleHQoXHJcbiAgICAgICAgKHJhd0RhdGEgYXMgeyBSZXRyaWV2YWxNb2RlPzogdW5rbm93bjsgcmV0cmlldmFsTW9kZT86IHVua25vd24gfSkuUmV0cmlldmFsTW9kZSA/P1xyXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyByZXRyaWV2YWxNb2RlPzogdW5rbm93biB9KS5yZXRyaWV2YWxNb2RlXHJcbiAgICAgICkgfHwgbnVsbCxcclxuICAgICAgVHJ1bmNhdGVkOiB0b051bGxhYmxlQm9vbChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IFRydW5jYXRlZD86IHVua25vd247IHRydW5jYXRlZD86IHVua25vd24gfSkuVHJ1bmNhdGVkID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IHRydW5jYXRlZD86IHVua25vd24gfSkudHJ1bmNhdGVkXHJcbiAgICAgICksXHJcbiAgICAgIFdhcm5pbmdzOiBBcnJheS5pc0FycmF5KHJhd1dhcm5pbmdzKVxyXG4gICAgICAgID8gcmF3V2FybmluZ3NcclxuICAgICAgICAgICAgLm1hcCgoZW50cnkpID0+IHNhbml0aXplQXNzaXN0YW50VGV4dChlbnRyeSkpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeSAmJiAhaXNJZ25vcmFibGVBc3Npc3RhbnRXYXJuaW5nKGVudHJ5KSlcclxuICAgICAgICA6IFtdLFxyXG4gICAgfSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gQXNrcyBidXNpbmVzcyBxdWVzdGlvbnMgYWJvdXQgdGhlIGN1cnJlbnQgZXhwZW5zZSBzaGVldCBsaXN0IHVzaW5nIC9hcGkvaWEvc2VydmljZS9leHBlbnNlc2hlZXRzL2Fzay5cclxuZXhwb3J0IGNvbnN0IGFza0V4cGVuc2VTaGVldHNRdWVzdGlvbiA9IGFzeW5jIChcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRzQXNrUmVxdWVzdCxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8RXhwZW5zZVNoZWV0c0Fza1Jlc3VsdD4gPT4ge1xyXG4gIGNvbnN0IHF1ZXN0aW9uID0gc2FmZVRleHQocGF5bG9hZD8ucXVlc3Rpb24pO1xyXG4gIGlmICghcXVlc3Rpb24pIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwicXVlc3Rpb24gaXMgcmVxdWlyZWQuXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IGNzcmZUb2tlbiA9IGdldENzcmZUb2tlbigpO1xyXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMoYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSk7XHJcbiAgaWYgKGNzcmZUb2tlbikge1xyXG4gICAgaGVhZGVycy5SZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW4gPSBjc3JmVG9rZW47XHJcbiAgfVxyXG5cclxuICBjb25zdCBzYWZlUGF5bG9hZDogRXhwZW5zZVNoZWV0c0Fza1JlcXVlc3QgPSB7XHJcbiAgICBxdWVzdGlvbixcclxuICAgIGFuc3dlckluc3RydWN0aW9uczogc2FmZVRleHQocGF5bG9hZD8uYW5zd2VySW5zdHJ1Y3Rpb25zKSB8fCB1bmRlZmluZWQsXHJcbiAgICBsaXN0UmVxdWVzdDogY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlKHBheWxvYWQubGlzdFJlcXVlc3QpLFxyXG4gICAgc291cmNlSnNvbjpcclxuICAgICAgcGF5bG9hZD8uc291cmNlSnNvbiA9PT0gbnVsbCB8fCBwYXlsb2FkPy5zb3VyY2VKc29uID09PSB1bmRlZmluZWRcclxuICAgICAgICA/IHVuZGVmaW5lZFxyXG4gICAgICAgIDogY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlKHBheWxvYWQuc291cmNlSnNvbiksXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcIi9hcGkvaWEvc2VydmljZS9leHBlbnNlc2hlZXRzL2Fza1wiLCB7XHJcbiAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICBoZWFkZXJzLFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCByYXcgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgY29uc3QgcmV0cnlBZnRlciA9IHNhZmVUZXh0KHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiUmV0cnktQWZ0ZXJcIikpO1xyXG5cclxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICBjb25zdCByZWxvZ2luUmVzdWx0ID0gYXdhaXQgaGFuZGxlQXBpQXV0aEZhaWx1cmU8RXhwZW5zZVNoZWV0c0Fza1Jlc3VsdD4ocmF3LCByZXNwb25zZS5zdGF0dXMsIFwiZXhwZW5zZS1zaGVldHMtYXNrXCIpO1xyXG4gICAgaWYgKHJlbG9naW5SZXN1bHQgIT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIHJlbG9naW5SZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKHJlYWRBcGlNZXNzYWdlRnJvbVJhdyhyYXcpIHx8IFwiUGVybWlzc2lvbiBkZW5pZWQuXCIsIHJlc3BvbnNlLnN0YXR1cywgcmF3KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlZCA9IHRyeVBhcnNlSnNvbihyYXcpO1xyXG4gIGlmICghcGFyc2VkIHx8IHR5cGVvZiBwYXJzZWQgIT09IFwib2JqZWN0XCIpIHtcclxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IocmVhZEFwaU1lc3NhZ2VGcm9tUmF3KHJhdykgfHwgXCJSZXF1ZXN0IGZhaWxlZC5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiSW52YWxpZCBzZXJ2ZXIgcmVzcG9uc2UuXCIsIHJlc3BvbnNlLnN0YXR1cywgcmF3KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVFeHBlbnNlU2hlZXRzQXNrUmVzcG9uc2Uoe1xyXG4gICAgLi4uKHBhcnNlZCBhcyBFeHBlbnNlU2hlZXRzQXNrUmVzdWx0KSxcclxuICAgIEh0dHBTdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcclxuICAgIFJldHJ5QWZ0ZXI6IHJldHJ5QWZ0ZXIgfHwgbnVsbCxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIEV4dHJhY3RzIGFuIGV4cGVuc2UgZHJhZnQgZnJvbSBhIHRpY2tldCBpbWFnZSB1c2luZyAvYXBpL2lhL3NlcnZpY2UvZXhwZW5zZWZyb210aWNrZXQuXHJcbmV4cG9ydCBjb25zdCBleHRyYWN0RXhwZW5zZUZyb21UaWNrZXREcmFmdCA9IGFzeW5jIChcclxuICB0aWNrZXRJbWFnZTogRmlsZSB8IEJsb2IsXHJcbiAgcGVyc2lzdFRpY2tldD86IGJvb2xlYW4sXHJcbiAgdGlja2V0VXJsRmlsZT86IHN0cmluZyxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0RHJhZnRSZXNwb25zZT4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3QgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gIGNvbnN0IHNhZmVUaWNrZXRVcmwgPSBzYWZlVGV4dCh0aWNrZXRVcmxGaWxlKTtcclxuXHJcbiAgaWYgKHRpY2tldEltYWdlIGluc3RhbmNlb2YgRmlsZSkge1xyXG4gICAgZm9ybS5hcHBlbmQoXCJ0aWNrZXRJbWFnZVwiLCB0aWNrZXRJbWFnZSwgc2FmZVRleHQodGlja2V0SW1hZ2UubmFtZSkgfHwgXCJ0aWNrZXQuanBnXCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBmb3JtLmFwcGVuZChcInRpY2tldEltYWdlXCIsIHRpY2tldEltYWdlLCBcInRpY2tldC5qcGdcIik7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIHBlcnNpc3RUaWNrZXQgPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcInBlcnNpc3RUaWNrZXRcIiwgcGVyc2lzdFRpY2tldCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiKTtcclxuICB9XHJcblxyXG4gIGlmIChzYWZlVGlja2V0VXJsKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcInRpY2tldFVybEZpbGVcIiwgc2FmZVRpY2tldFVybCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXREcmFmdFJlc3BvbnNlPj4oXCIvYXBpL2lhL3NlcnZpY2UvZXhwZW5zZWZyb210aWNrZXRcIiwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VGb3JtSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICAgIGJvZHk6IGZvcm0sXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBDcmVhdGVzIGFuZCBmaW5hbGl6ZXMgb25lIHRpY2tldCBmcm9tIGEgc2luZ2xlIG11bHRpcGFydCB1cGxvYWQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3F1aWNrLWNyZWF0ZS5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUV4cGVuc2VTaGVldFRpY2tldFF1aWNrID0gYXN5bmMgKFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVxdWVzdCxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8RXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQ+ID0+IHtcclxuICBpZiAoIXBheWxvYWQ/LnRpY2tldEltYWdlKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcInRpY2tldEltYWdlIGlzIHJlcXVpcmVkLlwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IF9zdXBwcmVzc1Blcm1pc3Npb25Nb2RhbCwgLi4uZmV0Y2hPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChmZXRjaE9wdGlvbnMpO1xyXG4gIGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcclxuICBjb25zdCBzYWZlQ3VycmVuY3lDb2RlID0gc2FmZVRleHQocGF5bG9hZD8uY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpO1xyXG4gIGNvbnN0IHNhZmVEZXNjcmlwdGlvbiA9IHNhZmVUZXh0KHBheWxvYWQ/LmRlc2NyaXB0aW9uKTtcclxuICBjb25zdCBzYWZlQ29tZW50YXJpbyA9IHNhZmVUZXh0KHBheWxvYWQ/LmNvbWVudGFyaW8pO1xyXG4gIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQocGF5bG9hZD8uZXhpc3RpbmdIb2phR2FzdG9zSWQpO1xyXG4gIGNvbnN0IHNhZmVQcm9qZWN0SWQgPSBzYWZlVGV4dChwYXlsb2FkPy5wcm9qZWN0SWQpO1xyXG4gIGNvbnN0IHRpY2tldEltYWdlID0gcGF5bG9hZC50aWNrZXRJbWFnZTtcclxuXHJcbiAgaWYgKHRpY2tldEltYWdlIGluc3RhbmNlb2YgRmlsZSkge1xyXG4gICAgZm9ybS5hcHBlbmQoXCJ0aWNrZXRJbWFnZVwiLCB0aWNrZXRJbWFnZSwgc2FmZVRleHQodGlja2V0SW1hZ2UubmFtZSkgfHwgXCJ0aWNrZXQuanBnXCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBmb3JtLmFwcGVuZChcInRpY2tldEltYWdlXCIsIHRpY2tldEltYWdlLCBcInRpY2tldC5qcGdcIik7XHJcbiAgfVxyXG5cclxuICBpZiAoc2FmZUN1cnJlbmN5Q29kZSkge1xyXG4gICAgZm9ybS5hcHBlbmQoXCJjdXJyZW5jeUNvZGVcIiwgc2FmZUN1cnJlbmN5Q29kZSk7XHJcbiAgfVxyXG5cclxuICBpZiAoXCJkZXNjcmlwdGlvblwiIGluIHBheWxvYWQpIHtcclxuICAgIGZvcm0uYXBwZW5kKFwiZGVzY3JpcHRpb25cIiwgc2FmZURlc2NyaXB0aW9uKTtcclxuICB9XHJcblxyXG4gIGlmIChcImNvbWVudGFyaW9cIiBpbiBwYXlsb2FkKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcImNvbWVudGFyaW9cIiwgc2FmZUNvbWVudGFyaW8pO1xyXG4gIH1cclxuXHJcbiAgaWYgKHNhZmVTaGVldElkKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcImV4aXN0aW5nSG9qYUdhc3Rvc0lkXCIsIHNhZmVTaGVldElkKTtcclxuICB9XHJcblxyXG4gIGlmIChzYWZlU2hlZXRJZCAmJiBzYWZlUHJvamVjdElkKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcInByb2plY3RJZFwiLCBzYWZlUHJvamVjdElkKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNzcmZUb2tlbiA9IGdldENzcmZUb2tlbigpO1xyXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMoYnVpbGRFeHBlbnNlRm9ybUhlYWRlcnMoY29udGV4dCwgZmV0Y2hPcHRpb25zKSk7XHJcbiAgaWYgKGNzcmZUb2tlbikge1xyXG4gICAgaGVhZGVycy5SZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW4gPSBjc3JmVG9rZW47XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3F1aWNrLWNyZWF0ZVwiLCB7XHJcbiAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxyXG4gICAgLi4uZmV0Y2hPcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnMsXHJcbiAgICBib2R5OiBmb3JtLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCByYXcgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgY29uc3QgcmV0cnlBZnRlciA9IHNhZmVUZXh0KHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiUmV0cnktQWZ0ZXJcIikpO1xyXG5cclxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICBjb25zdCByZWxvZ2luUmVzdWx0ID0gYXdhaXQgaGFuZGxlQXBpQXV0aEZhaWx1cmU8RXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQ+KFxyXG4gICAgICByYXcsXHJcbiAgICAgIHJlc3BvbnNlLnN0YXR1cyxcclxuICAgICAgXCJ0aWNrZXQtcXVpY2stY3JlYXRlXCJcclxuICAgICk7XHJcbiAgICBpZiAocmVsb2dpblJlc3VsdCAhPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gcmVsb2dpblJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IocmVhZEFwaU1lc3NhZ2VGcm9tUmF3KHJhdykgfHwgXCJQZXJtaXNzaW9uIGRlbmllZC5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgcGFyc2VkID0gdHJ5UGFyc2VKc29uKHJhdyk7XHJcbiAgaWYgKCFwYXJzZWQgfHwgdHlwZW9mIHBhcnNlZCAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihyZWFkQXBpTWVzc2FnZUZyb21SYXcocmF3KSB8fCBcIlJlcXVlc3QgZmFpbGVkLlwiLCByZXNwb25zZS5zdGF0dXMsIHJhdyk7XHJcbiAgICB9XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkludmFsaWQgc2VydmVyIHJlc3BvbnNlLlwiLCByZXNwb25zZS5zdGF0dXMsIHJhdyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZSh7XHJcbiAgICAuLi4ocGFyc2VkIGFzIEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVzdWx0KSxcclxuICAgIEh0dHBTdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcclxuICAgIFJldHJ5QWZ0ZXI6IHJldHJ5QWZ0ZXIgfHwgbnVsbCxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIENyZWF0ZXMgYSB0aWNrZXQgaGVhZGVyL2xpbmVzIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRDcmVhdGVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IG1vZGUgPSBOdW1iZXIocGF5bG9hZD8ubW9kZSk7XHJcbiAgY29uc3QgcmF3VHJhbnNEYXRlID0gc2FmZVRleHQocGF5bG9hZD8udHJhbnNEYXRlKTtcclxuICBjb25zdCBub3JtYWxpemVkVHJhbnNEYXRlID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlKHJhd1RyYW5zRGF0ZSk7XHJcblxyXG4gIGlmIChyYXdUcmFuc0RhdGUgJiYgIW5vcm1hbGl6ZWRUcmFuc0RhdGUpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xyXG4gIH1cclxuXHJcbiAgaWYgKChtb2RlID09PSAwIHx8IG1vZGUgPT09IDEpICYmICFub3JtYWxpemVkVHJhbnNEYXRlKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRDcmVhdGVSZXF1ZXN0ID0ge1xyXG4gICAgLi4ucGF5bG9hZCxcclxuICAgIHRyYW5zRGF0ZTogbm9ybWFsaXplZFRyYW5zRGF0ZSB8fCB1bmRlZmluZWQsXHJcbiAgICBnYXN0b1R5cGU6IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlKHBheWxvYWQ/Lmdhc3RvVHlwZSksXHJcbiAgfTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0c1wiLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVUaWNrZXRGaWx0ZXJDcml0ZXJpYVBheWxvYWQgPSA8XHJcbiAgVCBleHRlbmRzIHtcclxuICAgIGNyZWF0ZWREYXRlRnJvbT86IHN0cmluZztcclxuICAgIGNyZWF0ZWREYXRlVG8/OiBzdHJpbmc7XHJcbiAgICBzZWFyY2hLZXk/OiBzdHJpbmc7XHJcbiAgICBmaWx0ZXI/OiBzdHJpbmc7XHJcbiAgICBjdXJyZW5jeUNvZGU/OiBzdHJpbmc7XHJcbiAgICBnYXN0b1R5cGU/OiB1bmtub3duO1xyXG4gICAgcHJvY2Vzc2VkQnlBST86IHVua25vd247XHJcbiAgfSxcclxuPihcclxuICBwYXlsb2FkOiBUXHJcbikgPT4ge1xyXG4gIGNvbnN0IHJhd0NyZWF0ZWREYXRlRnJvbSA9IHNhZmVUZXh0KHBheWxvYWQ/LmNyZWF0ZWREYXRlRnJvbSk7XHJcbiAgY29uc3QgcmF3Q3JlYXRlZERhdGVUbyA9IHNhZmVUZXh0KHBheWxvYWQ/LmNyZWF0ZWREYXRlVG8pO1xyXG4gIGNvbnN0IGNyZWF0ZWREYXRlRnJvbSA9IG5vcm1hbGl6ZVRpY2tldExpc3REYXRlKHJhd0NyZWF0ZWREYXRlRnJvbSk7XHJcbiAgY29uc3QgY3JlYXRlZERhdGVUbyA9IG5vcm1hbGl6ZVRpY2tldExpc3REYXRlKHJhd0NyZWF0ZWREYXRlVG8pO1xyXG4gIGlmIChyYXdDcmVhdGVkRGF0ZUZyb20gJiYgIWNyZWF0ZWREYXRlRnJvbSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgfVxyXG4gIGlmIChyYXdDcmVhdGVkRGF0ZVRvICYmICFjcmVhdGVkRGF0ZVRvKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHByZWZlcnJlZFNlYXJjaEtleSA9IHNhZmVUZXh0KHBheWxvYWQ/LnNlYXJjaEtleSB8fCBwYXlsb2FkPy5maWx0ZXIpO1xyXG4gIGNvbnN0IGxlZ2FjeUZpbHRlciA9IHNhZmVUZXh0KHBheWxvYWQ/LmZpbHRlciB8fCBwcmVmZXJyZWRTZWFyY2hLZXkpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY3JlYXRlZERhdGVGcm9tOiBjcmVhdGVkRGF0ZUZyb20gfHwgdW5kZWZpbmVkLFxyXG4gICAgY3JlYXRlZERhdGVUbzogY3JlYXRlZERhdGVUbyB8fCB1bmRlZmluZWQsXHJcbiAgICBzZWFyY2hLZXk6IHByZWZlcnJlZFNlYXJjaEtleSB8fCB1bmRlZmluZWQsXHJcbiAgICBmaWx0ZXI6IGxlZ2FjeUZpbHRlciB8fCB1bmRlZmluZWQsXHJcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KHBheWxvYWQ/LmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSB8fCB1bmRlZmluZWQsXHJcbiAgICBnYXN0b1R5cGU6IG5vcm1hbGl6ZVRpY2tldExpc3RHYXN0b1R5cGUocGF5bG9hZD8uZ2FzdG9UeXBlKSxcclxuICAgIHByb2Nlc3NlZEJ5QUk6IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSShwYXlsb2FkPy5wcm9jZXNzZWRCeUFJKSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdEZpbHRlclBheWxvYWQgPSA8XHJcbiAgVCBleHRlbmRzIHtcclxuICAgIHBhZ2U/OiBudW1iZXI7XHJcbiAgICBwYWdlU2l6ZT86IG51bWJlcjtcclxuICAgIGNyZWF0ZWREYXRlRnJvbT86IHN0cmluZztcclxuICAgIGNyZWF0ZWREYXRlVG8/OiBzdHJpbmc7XHJcbiAgICBzZWFyY2hLZXk/OiBzdHJpbmc7XHJcbiAgICBmaWx0ZXI/OiBzdHJpbmc7XHJcbiAgICBjdXJyZW5jeUNvZGU/OiBzdHJpbmc7XHJcbiAgICBnYXN0b1R5cGU/OiB1bmtub3duO1xyXG4gICAgcHJvY2Vzc2VkQnlBST86IHVua25vd247XHJcbiAgfSxcclxuPihcclxuICBwYXlsb2FkOiBUXHJcbikgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBwYWdlOiBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZD8ucGFnZSkgJiYgTnVtYmVyKHBheWxvYWQucGFnZSkgPiAwID8gTWF0aC5mbG9vcihOdW1iZXIocGF5bG9hZC5wYWdlKSkgOiAxLFxyXG4gICAgcGFnZVNpemU6IE51bWJlci5pc0Zpbml0ZShwYXlsb2FkPy5wYWdlU2l6ZSkgJiYgTnVtYmVyKHBheWxvYWQucGFnZVNpemUpID4gMCA/IE1hdGguZmxvb3IoTnVtYmVyKHBheWxvYWQucGFnZVNpemUpKSA6IDUwLFxyXG4gICAgLi4ubm9ybWFsaXplVGlja2V0RmlsdGVyQ3JpdGVyaWFQYXlsb2FkKHBheWxvYWQpLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBMb2FkcyB0aWNrZXQgbGlzdCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGlzdC5cclxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QgPSBhc3luYyAoXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEV4cGVuc2VUaWNrZXRMaXN0RmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz4+ID0+IHtcclxuICBjb25zdCB7IGF4VXNlcklkT3ZlcnJpZGUsIC4uLmJhc2VPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChiYXNlT3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0ID0ge1xyXG4gICAgLi4ubm9ybWFsaXplVGlja2V0TGlzdEZpbHRlclBheWxvYWQocGF5bG9hZCksXHJcbiAgICBzdGF0dXM6IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzKHBheWxvYWQ/LnN0YXR1cyksXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz4+KFxyXG4gICAgXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGlzdFwiLFxyXG4gICAge1xyXG4gICAgICAuLi5iYXNlT3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRUaWNrZXRMaXN0SGVhZGVycyhjb250ZXh0LCBiYXNlT3B0aW9ucywgYXhVc2VySWRPdmVycmlkZSksXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gTG9hZHMgbGluay1tb2RlIHRpY2tldCBsaXN0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saW5rL2xpc3QuXHJcbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0ID0gYXN5bmMgKFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0UmVxdWVzdCxcclxuICBvcHRpb25zPzogRXhwZW5zZVRpY2tldExpc3RGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0bz4+ID0+IHtcclxuICBjb25zdCB7IGF4VXNlcklkT3ZlcnJpZGUsIC4uLmJhc2VPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChiYXNlT3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0UmVxdWVzdCA9IHtcclxuICAgIC4uLm5vcm1hbGl6ZVRpY2tldExpc3RGaWx0ZXJQYXlsb2FkKHBheWxvYWQpLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RJdGVtRHRvPj4oXHJcbiAgICBcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saW5rL2xpc3RcIixcclxuICAgIHtcclxuICAgICAgLi4uYmFzZU9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkVGlja2V0TGlzdEhlYWRlcnMoY29udGV4dCwgYmFzZU9wdGlvbnMsIGF4VXNlcklkT3ZlcnJpZGUpLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBMaW5rcyBzZWxlY3RlZCBvciBmaWx0ZXJlZCB0aWNrZXRzIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saW5rL2J1bGsuXHJcbmV4cG9ydCBjb25zdCBsaW5rRXhwZW5zZVNoZWV0VGlja2V0c0J1bGsgPSBhc3luYyAoXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBFeHBlbnNlVGlja2V0TGlzdEZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvPj4gPT4ge1xyXG4gIGNvbnN0IHsgYXhVc2VySWRPdmVycmlkZSwgLi4uYmFzZU9wdGlvbnMgfSA9IG9wdGlvbnMgfHwge307XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KGJhc2VPcHRpb25zKTtcclxuICBjb25zdCBzZWxlY3Rpb25Nb2RlID0gcGF5bG9hZD8uc2VsZWN0aW9uTW9kZSA9PT0gXCJmaWx0ZXJlZFwiID8gXCJmaWx0ZXJlZFwiIDogXCJzZWxlY3RlZFwiO1xyXG4gIGNvbnN0IHRpY2tldElkcyA9IEFycmF5LmlzQXJyYXkocGF5bG9hZD8udGlja2V0SWRzKVxyXG4gICAgPyBwYXlsb2FkLnRpY2tldElkcy5tYXAoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeSkpLmZpbHRlcihCb29sZWFuKVxyXG4gICAgOiBbXTtcclxuICBjb25zdCBleGNsdWRlZElkcyA9IEFycmF5LmlzQXJyYXkocGF5bG9hZD8uZXhjbHVkZWRJZHMpXHJcbiAgICA/IHBheWxvYWQuZXhjbHVkZWRJZHMubWFwKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnkpKS5maWx0ZXIoQm9vbGVhbilcclxuICAgIDogW107XHJcblxyXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1JlcXVlc3QgPSB7XHJcbiAgICBleHBlbnNlU2hlZXRJZDogc2FmZVRleHQocGF5bG9hZD8uZXhwZW5zZVNoZWV0SWQpLFxyXG4gICAgc2VsZWN0aW9uTW9kZSxcclxuICAgIHRpY2tldElkczogc2VsZWN0aW9uTW9kZSA9PT0gXCJzZWxlY3RlZFwiID8gdGlja2V0SWRzIDogdW5kZWZpbmVkLFxyXG4gICAgZmlsdGVyczpcclxuICAgICAgc2VsZWN0aW9uTW9kZSA9PT0gXCJmaWx0ZXJlZFwiICYmIHBheWxvYWQ/LmZpbHRlcnNcclxuICAgICAgICA/IHtcclxuICAgICAgICAgICAgLi4ubm9ybWFsaXplVGlja2V0RmlsdGVyQ3JpdGVyaWFQYXlsb2FkKHBheWxvYWQuZmlsdGVycyksXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgOiB1bmRlZmluZWQsXHJcbiAgICBleGNsdWRlZElkczogc2VsZWN0aW9uTW9kZSA9PT0gXCJmaWx0ZXJlZFwiID8gZXhjbHVkZWRJZHMgOiB1bmRlZmluZWQsXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXN1bHREdG8+PihcclxuICAgIFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL2xpbmsvYnVsa1wiLFxyXG4gICAge1xyXG4gICAgICAuLi5iYXNlT3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRUaWNrZXRMaXN0SGVhZGVycyhjb250ZXh0LCBiYXNlT3B0aW9ucywgYXhVc2VySWRPdmVycmlkZSksXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplVGlja2V0TGlua0J1bGtSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBMb2FkcyBvbmUgdGlja2V0IGRldGFpbCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0uXHJcbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXREZXRhaWxEdG8+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvPj4oXHJcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH1gLFxyXG4gICAge1xyXG4gICAgICAuLi5vcHRpb25zLFxyXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gRG93bmxvYWRzIG9uZSB0aWNrZXQgaW1hZ2UgcHJldmlldyBibG9iIHRocm91Z2ggdGhlIGludGVybmFsIHByb3h5IGVuZHBvaW50LlxyXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRQcmV2aWV3QmxvYiA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICB1cmxGaWxlOiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEJsb2I+ID0+IHtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gc2FmZVRleHQoZmlsZUlkKTtcclxuICBjb25zdCBzYWZlVXJsRmlsZSA9IHNhZmVUZXh0KHVybEZpbGUpO1xyXG4gIGlmICghc2FmZUZpbGVJZCB8fCAhc2FmZVVybEZpbGUpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiTWlzc2luZyB0aWNrZXQgcHJldmlldyBwYXlsb2FkLlwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IF9zdXBwcmVzc1Blcm1pc3Npb25Nb2RhbCwgLi4uZmV0Y2hPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBjc3JmVG9rZW4gPSBnZXRDc3JmVG9rZW4oKTtcclxuICBjb25zdCBoZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgZmV0Y2hPcHRpb25zLCB0cnVlKSk7XHJcbiAgaGVhZGVycy5BY2NlcHQgPSBcImltYWdlLypcIjtcclxuICBjb25zdCByZXF1ZXN0SGVhZGVyczogSGVhZGVyc0luaXQgPSB7XHJcbiAgICBBY2NlcHQ6IFwiaW1hZ2UvKlwiLFxyXG4gICAgLi4uaGVhZGVycyxcclxuICB9O1xyXG5cclxuICBpZiAoY3NyZlRva2VuKSB7XHJcbiAgICAocmVxdWVzdEhlYWRlcnMgYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPilbXCJSZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW5cIl0gPSBjc3JmVG9rZW47XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3ByZXZpZXdcIiwge1xyXG4gICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcclxuICAgIC4uLmZldGNoT3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICBoZWFkZXJzOiByZXF1ZXN0SGVhZGVycyxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgZmlsZUlkOiBzYWZlRmlsZUlkLFxyXG4gICAgICB1cmxGaWxlOiBzYWZlVXJsRmlsZSxcclxuICAgIH0pLFxyXG4gIH0pO1xyXG5cclxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICBjb25zdCByYXcgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgICBjb25zdCByZWxvZ2luUmVzdWx0ID0gYXdhaXQgaGFuZGxlQXBpQXV0aEZhaWx1cmU8QmxvYj4ocmF3LCByZXNwb25zZS5zdGF0dXMsIFwidGlja2V0LXByZXZpZXdcIik7XHJcbiAgICBpZiAocmVsb2dpblJlc3VsdCAhPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gcmVsb2dpblJlc3VsdDtcclxuICAgIH1cclxuICAgIGNvbnN0IG1lc3NhZ2UgPSByZWFkQXBpTWVzc2FnZUZyb21SYXcocmF3KTtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKG1lc3NhZ2UgfHwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXQgcHJldmlldy5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYmxvYiA9IGF3YWl0IHJlc3BvbnNlLmJsb2IoKTtcclxuICBpZiAoIWJsb2IgfHwgYmxvYi5zaXplID09PSAwKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkNvdWxkIG5vdCBsb2FkIHRpY2tldCBwcmV2aWV3LlwiKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBibG9iO1xyXG59O1xyXG5cclxuLy8gVXBkYXRlcyB0aWNrZXQgaGVhZGVyIG1ldGFkYXRhIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJhd1RyYW5zRGF0ZSA9IHNhZmVUZXh0KHBheWxvYWQ/LnRyYW5zRGF0ZSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFRyYW5zRGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdUcmFuc0RhdGUpO1xyXG5cclxuICBpZiAocmF3VHJhbnNEYXRlICYmICFub3JtYWxpemVkVHJhbnNEYXRlKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0ID0ge1xyXG4gICAgLi4ucGF5bG9hZCxcclxuICAgIHRyYW5zRGF0ZTogbm9ybWFsaXplZFRyYW5zRGF0ZSB8fCB1bmRlZmluZWQsXHJcbiAgICBnYXN0b1R5cGU6IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlKHBheWxvYWQ/Lmdhc3RvVHlwZSksXHJcbiAgfTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH1gLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIERlbGV0ZXMgb25lIHRpY2tldCBvciBvbmUgdGlja2V0IGxpbmUgdmlhIHF1ZXJ5IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS5cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICBsaW5lUmVjSWQ/OiBudW1iZXIsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG51bGw+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xyXG4gIGlmIChOdW1iZXIuaXNJbnRlZ2VyKE51bWJlcihsaW5lUmVjSWQpKSAmJiBOdW1iZXIobGluZVJlY0lkKSA+IDApIHtcclxuICAgIHF1ZXJ5LnNldChcImxpbmVSZWNJZFwiLCBTdHJpbmcobGluZVJlY0lkKSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzdWZmaXggPSBxdWVyeS50b1N0cmluZygpO1xyXG4gIGNvbnN0IHVybCA9IHN1ZmZpeFxyXG4gICAgPyBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0/JHtzdWZmaXh9YFxyXG4gICAgOiBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH1gO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+Pih1cmwsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gQXBwbGllcyBJQSBwYXlsb2FkIG92ZXIgYW4gZXhpc3RpbmcgdGlja2V0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9pYS5cclxuZXhwb3J0IGNvbnN0IGFwcGx5RXhwZW5zZVNoZWV0VGlja2V0SWEgPSBhc3luYyAoXHJcbiAgZmlsZUlkOiBzdHJpbmcsXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJhd1BheWxvYWQgPSAocGF5bG9hZCB8fCB7fSkgYXMgRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0O1xyXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3QgPSB7XHJcbiAgICAuLi5yYXdQYXlsb2FkLFxyXG4gIH07XHJcbiAgY29uc3Qgbm9ybWFsaXplZFRyYW5zRGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdQYXlsb2FkLnRyYW5zRGF0ZSk7XHJcbiAgaWYgKCFub3JtYWxpemVkVHJhbnNEYXRlKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICB9XHJcbiAgc2FmZVBheWxvYWQudHJhbnNEYXRlID0gbm9ybWFsaXplZFRyYW5zRGF0ZTtcclxuXHJcbiAgY29uc3QgZ2FzdG9UeXBlID0gbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUocmF3UGF5bG9hZC5nYXN0b1R5cGUpO1xyXG4gIGlmIChnYXN0b1R5cGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgZGVsZXRlIHNhZmVQYXlsb2FkLmdhc3RvVHlwZTtcclxuICB9IGVsc2Uge1xyXG4gICAgc2FmZVBheWxvYWQuZ2FzdG9UeXBlID0gZ2FzdG9UeXBlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2lhYCwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gQ3JlYXRlcyBvbmUgdGlja2V0IGxpbmUgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9L2xpbmVzLlxyXG5leHBvcnQgY29uc3QgY3JlYXRlRXhwZW5zZVNoZWV0VGlja2V0TGluZSA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5lUmVxdWVzdCxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4gPT4ge1xyXG4gIGlmICghc2FmZVRleHQocGF5bG9hZD8uZGVzY3JpcHRpb24pIHx8ICFpc1Bvc2l0aXZlTnVtYmVyKHBheWxvYWQ/LnF0eSkgfHwgIWlzUG9zaXRpdmVOdW1iZXIocGF5bG9hZD8ucHJpY2UpKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImRlc2NyaXB0aW9uLCBxdHkgPiAwIGFuZCBwcmljZSA+IDAgYXJlIHJlcXVpcmVkLlwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vbGluZXNgLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIFVwZGF0ZXMgb25lIHRpY2tldCBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9saW5lcy97bGluZVJlY0lkfS5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldExpbmUgPSBhc3luYyAoXHJcbiAgZmlsZUlkOiBzdHJpbmcsXHJcbiAgbGluZVJlY0lkOiBzdHJpbmcgfCBudW1iZXIsXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGluZVJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcclxuICBpZiAoIXNhZmVUZXh0KHBheWxvYWQ/LmRlc2NyaXB0aW9uKSB8fCAhaXNQb3NpdGl2ZU51bWJlcihwYXlsb2FkPy5xdHkpIHx8ICFpc1Bvc2l0aXZlTnVtYmVyKHBheWxvYWQ/LnByaWNlKSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJkZXNjcmlwdGlvbiwgcXR5ID4gMCBhbmQgcHJpY2UgPiAwIGFyZSByZXF1aXJlZC5cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3Qgc2FmZUxpbmVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcobGluZVJlY0lkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4oXHJcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vbGluZXMvJHtzYWZlTGluZUlkfWAsXHJcbiAgICB7XHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIERlbGV0ZXMgb25lIHRpY2tldCBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9saW5lcy97bGluZVJlY0lkfS5cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldExpbmUgPSBhc3luYyAoXHJcbiAgZmlsZUlkOiBzdHJpbmcsXHJcbiAgbGluZVJlY0lkOiBzdHJpbmcgfCBudW1iZXIsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG51bGw+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHNhZmVMaW5lSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGxpbmVSZWNJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+PihcclxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9saW5lcy8ke3NhZmVMaW5lSWR9YCxcclxuICAgIHtcclxuICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxyXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBVcGxvYWRzL3JlcGxhY2VzIHRpY2tldCBmaWxlIGNvbnRlbnQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9L2ZpbGUuXHJcbmV4cG9ydCBjb25zdCB1cGxvYWRFeHBlbnNlU2hlZXRUaWNrZXRGaWxlID0gYXN5bmMgKFxyXG4gIGZpbGVJZDogc3RyaW5nLFxyXG4gIGZpbGU6IEZpbGUgfCBCbG9iLFxyXG4gIGV4dGVuc2lvbj86IHN0cmluZyxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCBzYWZlRXh0ZW5zaW9uID0gc2FmZVRleHQoZXh0ZW5zaW9uKS5yZXBsYWNlKC9eXFwuLywgXCJcIik7XHJcbiAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XHJcbiAgaWYgKHNhZmVFeHRlbnNpb24pIHtcclxuICAgIHF1ZXJ5LnNldChcImV4dGVuc2lvblwiLCBzYWZlRXh0ZW5zaW9uKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHN1ZmZpeCA9IHF1ZXJ5LnRvU3RyaW5nKCk7XHJcbiAgY29uc3QgdXJsID0gc3VmZml4XHJcbiAgICA/IGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9maWxlPyR7c3VmZml4fWBcclxuICAgIDogYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2ZpbGVgO1xyXG4gIGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcclxuICBpZiAoZmlsZSBpbnN0YW5jZW9mIEZpbGUpIHtcclxuICAgIGZvcm0uYXBwZW5kKFwiZmlsZVwiLCBmaWxlLCBzYWZlVGV4dChmaWxlLm5hbWUpIHx8IGB0aWNrZXQuJHtzYWZlRXh0ZW5zaW9uIHx8IFwianBnXCJ9YCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGZvcm0uYXBwZW5kKFwiZmlsZVwiLCBmaWxlLCBgdGlja2V0LiR7c2FmZUV4dGVuc2lvbiB8fCBcImpwZ1wifWApO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4odXJsLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUZvcm1IZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gICAgYm9keTogZm9ybSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIERlbGV0ZXMgdGlja2V0IGZpbGUgY29udGVudCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vZmlsZS5cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldEZpbGUgPSBhc3luYyAoXHJcbiAgZmlsZUlkOiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG51bGw+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vZmlsZWAsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gU2VhcmNoZXMgcHJvamVjdHMgZm9yIGRyb3Bkb3duIHVzYWdlIGluIGZpbHRlcnMgYW5kIGVkaXQgZm9ybXMuXHJcbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VQcm9qZWN0cyA9IGFzeW5jIChcclxuICB0ZXJtOiBzdHJpbmcsXHJcbiAgcGFnZTogbnVtYmVyLFxyXG4gIHBhZ2VTaXplOiBudW1iZXIsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPFByb2plY3REcm9wZG93blJlc3BvbnNlPiA9PiB7XHJcbiAgY29uc3Qgc2FmZVRlcm0gPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKHRlcm0gfHwgXCJcIikpO1xyXG4gIGNvbnN0IHNhZmVQYWdlID0gTnVtYmVyLmlzRmluaXRlKHBhZ2UpICYmIHBhZ2UgPiAwID8gTWF0aC5mbG9vcihwYWdlKSA6IDE7XHJcbiAgY29uc3Qgc2FmZVBhZ2VTaXplID0gTnVtYmVyLmlzRmluaXRlKHBhZ2VTaXplKSAmJiBwYWdlU2l6ZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2VTaXplKSA6IDIwO1xyXG5cclxuICByZXR1cm4gZmV0Y2hKc29uPFByb2plY3REcm9wZG93blJlc3BvbnNlPihcclxuICAgIGAvR2FzdG9zL0dldFByb2plY3RzRm9yRHJvcGRvd24/dGVybT0ke3NhZmVUZXJtfSZwYWdlPSR7c2FmZVBhZ2V9JnBhZ2VTaXplPSR7c2FmZVBhZ2VTaXplfWAsXHJcbiAgICB7XHJcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgLi4ub3B0aW9ucyxcclxuICAgIH1cclxuICApO1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCTyxJQUFNLDZCQUE2QixDQUN4QyxhQUM4QztBQUM5QyxTQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxPQUFPLE1BQU0sUUFBUSxVQUFVLEtBQUssSUFBSSxTQUFTLFFBQVEsQ0FBQztBQUFBLEVBQzVEO0FBQ0Y7QUFFTyxJQUFNLCtCQUErQixDQUMxQyxhQUM0QztBQUM1QyxTQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxPQUFPLE1BQU0sUUFBUSxVQUFVLEtBQUssSUFBSSxTQUFTLFFBQVEsQ0FBQztBQUFBLEVBQzVEO0FBQ0Y7QUFFTyxJQUFNLHVCQUF1QixDQUFJLGFBQW1EO0FBQ3pGLFNBQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUNILFFBQVEsTUFBTSxRQUFRLFVBQVUsTUFBTSxJQUFJLFNBQVMsU0FBUyxVQUFVLFVBQVU7QUFBQSxFQUNsRjtBQUNGO0FBRU8sSUFBTSxxQ0FBcUMsQ0FDaEQsYUFDd0M7QUFDeEMsUUFBTSxhQUFhLHFC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QUEsSUFDTCx1Q0FBdUMsUUFBUSxTQUFTLFFBQVEsYUFBYSxZQUFZO0FBQUEsSUFDekY7QUFBQSxNQUNFLFFBQVE7QUFBQSxNQUNSLEdBQUc7QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogWyJzYWZlVGV4dCIsICJzYWZlVGV4dCIsICJ0b051bGxhYmxlTnVtYmVyIiwgImlzTm9uTmVnYXRpdmVOdW1iZXIiLCAiaXNQb3NpdGl2ZU51bWJlciIsICJub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZSIsICJub3JtYWxpemVUaWNrZXRMaXN0R2FzdG9UeXBlIiwgIm5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzIiwgIm5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZSIsICJub3JtYWxpemVSZXF1aXJlZEFwaURhdGUiLCAibm9ybWFsaXplVGlja2V0TGlzdERhdGUiLCAidG9OdWxsYWJsZUJvb2wiLCAibm9ybWFsaXplT3B0aW9uYWxUaWNrZXRQcm9jZXNzZWRCeUFJIiwgIm5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXIiLCAidG9GbGFnQm9vbCIsICJyZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUiLCAic2FmZVRleHQiLCAibm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVBcGlSZXNwb25zZSIsICJub3JtYWxpemVUaWNrZXRRdWlja0NyZWF0ZVJlc3BvbnNlIiwgIm5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlIiwgIm5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlIiwgIm5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlIiwgIm5vcm1hbGl6ZVRpY2tldExpbmtCdWxrUmVzcG9uc2UiLCAidG9OdWxsYWJsZU51bWJlciIsICJtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZCIsICJtYXBFeHBlbnNlU2hlZXRIZWFkZXIiLCAibWFwRXhwZW5zZVNoZWV0TGluZSIsICJpc1Bvc2l0aXZlTnVtYmVyIiwgImlzTm9uTmVnYXRpdmVOdW1iZXIiXQp9Cg==
