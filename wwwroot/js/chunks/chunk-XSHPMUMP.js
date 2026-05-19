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
} from "./chunk-SRZDJTMJ.js";
import {
  ApiFetchError,
  fetchJson,
  getCsrfToken,
  handleApiAuthFailure,
  indT,
  readApiMessageFromRaw
} from "./chunk-63VW7TTG.js";

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
  const explicitLineRecId = safeText(
    line.LineRecId ?? line.lineRecId
  );
  return {
    lineRecId: explicitLineRecId || safeText(line.RecId),
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

// Web/wwwroot/react/src/pages/gastos/utils/expenseTicketLineAmount.ts
var resolveTicketLineAmount = (line) => {
  if (!line) return null;
  const explicitTotal = toNullableNumber(line.totalAmount);
  if (explicitTotal !== null) {
    return explicitTotal;
  }
  const qty = toNullableNumber(line.qty);
  const price = toNullableNumber(line.price);
  if (qty === null || price === null) {
    return null;
  }
  if (qty === 0 && price < 0) {
    return price;
  }
  return qty * price;
};
var isValidTicketLineAmount = (line) => {
  const qty = toNullableNumber(line?.qty);
  const price = toNullableNumber(line?.price);
  if (qty === null || price === null || qty < 0 || price === 0) {
    return false;
  }
  if (qty > 0) {
    return true;
  }
  const lineAmount = resolveTicketLineAmount(line);
  return lineAmount !== null && lineAmount < 0;
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
  if (/^-\d+$/.test(normalized)) {
    return normalized;
  }
  const labelSeparator = normalized.indexOf(" - ");
  if (labelSeparator > 0) {
    return safeText3(normalized.slice(0, labelSeparator));
  }
  return normalized;
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
  const includeAxUserOverride = mode === 2;
  const response = await fetchJson("/api/crm/expensesheets", {
    ...options,
    method: "POST",
    // Header create flows must always run in the signed-in user context.
    headers: buildExpenseHeaders(context, options, true, includeAxUserOverride),
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
  const rawTicketDate = safeText3(payload?.ticketDate);
  const normalizedTransDate = normalizeOptionalApiDate2(rawTransDate);
  const normalizedTicketDate = normalizeOptionalApiDate2(rawTicketDate);
  if (rawTransDate && !normalizedTransDate) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }
  if (rawTicketDate && !normalizedTicketDate) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }
  if ((mode === 0 || mode === 1) && !normalizedTransDate) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }
  const safePayload = {
    ...payload,
    transDate: normalizedTransDate || void 0,
    ticketDate: normalizedTicketDate || void 0,
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
  const rawTicketDate = safeText3(payload?.ticketDate);
  const normalizedTransDate = normalizeOptionalApiDate2(rawTransDate);
  const normalizedTicketDate = normalizeOptionalApiDate2(rawTicketDate);
  if (rawTransDate && !normalizedTransDate) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }
  if (rawTicketDate && !normalizedTicketDate) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }
  const safePayload = {
    ...payload,
    transDate: normalizedTransDate || void 0,
    ticketDate: normalizedTicketDate || void 0,
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
  if (!safeText3(payload?.description) || !isValidTicketLineAmount(payload)) {
    throw new ApiFetchError("description and a valid signed ticket line amount are required.");
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
  if (!safeText3(payload?.description) || !isValidTicketLineAmount(payload)) {
    throw new ApiFetchError("description and a valid signed ticket line amount are required.");
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
  resolveTicketLineAmount,
  isValidTicketLineAmount,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlQXBpUmVzcG9uc2VOb3JtYWxpemVycy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VBcGlNYXBwZXJzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZVVpVXRpbHMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlVGlja2V0TGluZUFtb3VudC50cyIsICIuLi8uLi9yZWFjdC9zcmMvdXRpbHMvY29tcGFueVNlbGVjdGlvbi50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VBcGkudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB0eXBlIHtcclxuICBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0byxcclxuICBFeHBlbnNlU2hlZXREZXRhaWxEdG8sXHJcbiAgRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG8sXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlc3VsdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0byxcclxuICBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byxcclxuICBJbmRBcGlSZXNwb25zZSxcclxuICBJbmRQYWdlZFJlc3BvbnNlLFxyXG59IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHtcclxuICBzYWZlVGV4dCxcclxuICB0b051bGxhYmxlQm9vbCxcclxuICB0b051bGxhYmxlR2FzdG9UeXBlQ29kZSxcclxuICB0b051bGxhYmxlTnVtYmVyLFxyXG4gIHRvTnVsbGFibGVUaWNrZXRTdGF0dXNDb2RlLFxyXG59IGZyb20gXCIuL2V4cGVuc2VBcGlUcmFuc2Zvcm1zLnRzXCI7XHJcbmltcG9ydCB7IG5vcm1hbGl6ZUV4cGVuc2VTaGVldFN1Ym9yZGluYXRlcyB9IGZyb20gXCIuL2V4cGVuc2VTdWJvcmRpbmF0ZU1hcHBlci50c1wiO1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlID0gKFxyXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldExpc3RJdGVtRHRvPlxyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldExpc3RJdGVtRHRvPiA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnJlc3BvbnNlLFxyXG4gICAgSXRlbXM6IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW10sXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlID0gKFxyXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldERldGFpbER0bz5cclxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXREZXRhaWxEdG8+ID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgLi4ucmVzcG9uc2UsXHJcbiAgICBJdGVtczogQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXSxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUFwaVJlc3BvbnNlID0gPFQ+KHJlc3BvbnNlOiBJbmRBcGlSZXNwb25zZTxUPik6IEluZEFwaVJlc3BvbnNlPFQ+ID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgLi4ucmVzcG9uc2UsXHJcbiAgICBFcnJvcnM6IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/LkVycm9ycykgPyByZXNwb25zZS5FcnJvcnMgOiByZXNwb25zZT8uRXJyb3JzID8/IG51bGwsXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVUaWNrZXRRdWlja0NyZWF0ZVJlc3BvbnNlID0gKFxyXG4gIHJlc3BvbnNlOiBFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlc3VsdFxyXG4pOiBFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlc3VsdCA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxuICBjb25zdCByYXdEYXRhID0gbm9ybWFsaXplZD8uRGF0YTtcclxuICBpZiAoIXJhd0RhdGEgfHwgdHlwZW9mIHJhd0RhdGEgIT09IFwib2JqZWN0XCIpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIC4uLm5vcm1hbGl6ZWQsXHJcbiAgICAgIEh0dHBTdGF0dXM6IHR5cGVvZiByZXNwb25zZT8uSHR0cFN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IHJlc3BvbnNlLkh0dHBTdGF0dXMgOiB1bmRlZmluZWQsXHJcbiAgICAgIFJldHJ5QWZ0ZXI6IHNhZmVUZXh0KHJlc3BvbnNlPy5SZXRyeUFmdGVyKSB8fCBudWxsLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJhd1N0ZXBUcmFjZUlkcyA9XHJcbiAgICAocmF3RGF0YSBhcyB7IFN0ZXBUcmFjZUlkcz86IHVua25vd247IHN0ZXBUcmFjZUlkcz86IHVua25vd24gfSkuU3RlcFRyYWNlSWRzID8/XHJcbiAgICAocmF3RGF0YSBhcyB7IHN0ZXBUcmFjZUlkcz86IHVua25vd24gfSkuc3RlcFRyYWNlSWRzO1xyXG4gIGNvbnN0IHN0ZXBUcmFjZUlkcyA9IHJhd1N0ZXBUcmFjZUlkcyAmJiB0eXBlb2YgcmF3U3RlcFRyYWNlSWRzID09PSBcIm9iamVjdFwiID8gcmF3U3RlcFRyYWNlSWRzIDogbnVsbDtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLm5vcm1hbGl6ZWQsXHJcbiAgICBIdHRwU3RhdHVzOiB0eXBlb2YgcmVzcG9uc2U/Lkh0dHBTdGF0dXMgPT09IFwibnVtYmVyXCIgPyByZXNwb25zZS5IdHRwU3RhdHVzIDogdW5kZWZpbmVkLFxyXG4gICAgUmV0cnlBZnRlcjogc2FmZVRleHQocmVzcG9uc2U/LlJldHJ5QWZ0ZXIpIHx8IG51bGwsXHJcbiAgICBEYXRhOiB7XHJcbiAgICAgIEZpbGVJZDogc2FmZVRleHQoKHJhd0RhdGEgYXMgeyBGaWxlSWQ/OiB1bmtub3duOyBmaWxlSWQ/OiB1bmtub3duIH0pLkZpbGVJZCA/PyAocmF3RGF0YSBhcyB7IGZpbGVJZD86IHVua25vd24gfSkuZmlsZUlkKSxcclxuICAgICAgVXJsRmlsZTogc2FmZVRleHQoXHJcbiAgICAgICAgKHJhd0RhdGEgYXMgeyBVcmxGaWxlPzogdW5rbm93bjsgdXJsRmlsZT86IHVua25vd24gfSkuVXJsRmlsZSA/PyAocmF3RGF0YSBhcyB7IHVybEZpbGU/OiB1bmtub3duIH0pLnVybEZpbGVcclxuICAgICAgKSxcclxuICAgICAgRmlsZU5hbWU6IHNhZmVUZXh0KFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgRmlsZU5hbWU/OiB1bmtub3duOyBmaWxlTmFtZT86IHVua25vd24gfSkuRmlsZU5hbWUgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgZmlsZU5hbWU/OiB1bmtub3duIH0pLmZpbGVOYW1lXHJcbiAgICAgICksXHJcbiAgICAgIFByb2Nlc3NlZEJ5QUk6IHRvTnVsbGFibGVCb29sKFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgUHJvY2Vzc2VkQnlBST86IHVua25vd247IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pLlByb2Nlc3NlZEJ5QUkgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgcHJvY2Vzc2VkQnlBST86IHVua25vd24gfSkucHJvY2Vzc2VkQnlBSVxyXG4gICAgICApLFxyXG4gICAgICBMaW5rZWRUb1NoZWV0OlxyXG4gICAgICAgIHRvTnVsbGFibGVCb29sKFxyXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBMaW5rZWRUb1NoZWV0PzogdW5rbm93bjsgbGlua2VkVG9TaGVldD86IHVua25vd24gfSkuTGlua2VkVG9TaGVldCA/P1xyXG4gICAgICAgICAgICAocmF3RGF0YSBhcyB7IGxpbmtlZFRvU2hlZXQ/OiB1bmtub3duIH0pLmxpbmtlZFRvU2hlZXRcclxuICAgICAgICApID09PSB0cnVlLFxyXG4gICAgICBIb2phR2FzdG9zSWQ6XHJcbiAgICAgICAgc2FmZVRleHQoXHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IEhvamFHYXN0b3NJZD86IHVua25vd247IGhvamFHYXN0b3NJZD86IHVua25vd24gfSkuSG9qYUdhc3Rvc0lkID8/XHJcbiAgICAgICAgICAgIChyYXdEYXRhIGFzIHsgaG9qYUdhc3Rvc0lkPzogdW5rbm93biB9KS5ob2phR2FzdG9zSWRcclxuICAgICAgICApIHx8IG51bGwsXHJcbiAgICAgIENvbXBsZXRlZFN0YWdlOiBzYWZlVGV4dChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IENvbXBsZXRlZFN0YWdlPzogdW5rbm93bjsgY29tcGxldGVkU3RhZ2U/OiB1bmtub3duIH0pLkNvbXBsZXRlZFN0YWdlID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IGNvbXBsZXRlZFN0YWdlPzogdW5rbm93biB9KS5jb21wbGV0ZWRTdGFnZVxyXG4gICAgICApLFxyXG4gICAgICBTdGVwVHJhY2VJZHM6IHN0ZXBUcmFjZUlkc1xyXG4gICAgICAgID8ge1xyXG4gICAgICAgICAgICBUaWNrZXRDcmVhdGU6IHNhZmVUZXh0KFxyXG4gICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyBUaWNrZXRDcmVhdGU/OiB1bmtub3duOyB0aWNrZXRDcmVhdGU/OiB1bmtub3duIH0pLlRpY2tldENyZWF0ZSA/P1xyXG4gICAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IHRpY2tldENyZWF0ZT86IHVua25vd24gfSkudGlja2V0Q3JlYXRlXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIEZpbGVVcGxvYWQ6IHNhZmVUZXh0KFxyXG4gICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyBGaWxlVXBsb2FkPzogdW5rbm93bjsgZmlsZVVwbG9hZD86IHVua25vd24gfSkuRmlsZVVwbG9hZCA/P1xyXG4gICAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IGZpbGVVcGxvYWQ/OiB1bmtub3duIH0pLmZpbGVVcGxvYWRcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgRHJhZnRFeHRyYWN0OiBzYWZlVGV4dChcclxuICAgICAgICAgICAgICAoc3RlcFRyYWNlSWRzIGFzIHsgRHJhZnRFeHRyYWN0PzogdW5rbm93bjsgZHJhZnRFeHRyYWN0PzogdW5rbm93biB9KS5EcmFmdEV4dHJhY3QgPz9cclxuICAgICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyBkcmFmdEV4dHJhY3Q/OiB1bmtub3duIH0pLmRyYWZ0RXh0cmFjdFxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBUaWNrZXRGaW5hbGl6ZTogc2FmZVRleHQoXHJcbiAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IFRpY2tldEZpbmFsaXplPzogdW5rbm93bjsgdGlja2V0RmluYWxpemU/OiB1bmtub3duIH0pLlRpY2tldEZpbmFsaXplID8/XHJcbiAgICAgICAgICAgICAgICAoc3RlcFRyYWNlSWRzIGFzIHsgdGlja2V0RmluYWxpemU/OiB1bmtub3duIH0pLnRpY2tldEZpbmFsaXplXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIFNoZWV0TGluazogc2FmZVRleHQoXHJcbiAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IFNoZWV0TGluaz86IHVua25vd247IHNoZWV0TGluaz86IHVua25vd24gfSkuU2hlZXRMaW5rID8/XHJcbiAgICAgICAgICAgICAgICAoc3RlcFRyYWNlSWRzIGFzIHsgc2hlZXRMaW5rPzogdW5rbm93biB9KS5zaGVldExpbmtcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgIH1cclxuICAgICAgICA6IG51bGwsXHJcbiAgICB9LFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlID0gKFxyXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPlxyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPiA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnJlc3BvbnNlLFxyXG4gICAgSXRlbXM6IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW10sXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlID0gKFxyXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPHVua25vd24+XHJcbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG8+ID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBub3JtYWxpemVFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZXMocmVzcG9uc2U/Lkl0ZW1zKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnJlc3BvbnNlLFxyXG4gICAgSXRlbXM6IG5vcm1hbGl6ZWRJdGVtcyxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlID0gKFxyXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvPlxyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvPiA9PiB7XHJcbiAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRJdGVtcyA9IGl0ZW1zLm1hcCgoaXRlbSkgPT4gKHtcclxuICAgIC4uLml0ZW0sXHJcbiAgICBTdGF0dXM6IHRvTnVsbGFibGVUaWNrZXRTdGF0dXNDb2RlKFxyXG4gICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LlN0YXR1cyA/P1xyXG4gICAgICAgIChpdGVtIGFzIHsgU3RhdHVzPzogdW5rbm93bjsgc3RhdHVzPzogdW5rbm93biB9KT8uc3RhdHVzXHJcbiAgICApLFxyXG4gICAgUHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woXHJcbiAgICAgIChpdGVtIGFzIHsgUHJvY2Vzc2VkQnlBST86IHVua25vd247IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pPy5Qcm9jZXNzZWRCeUFJID8/XHJcbiAgICAgICAgKGl0ZW0gYXMgeyBQcm9jZXNzZWRCeUFJPzogdW5rbm93bjsgcHJvY2Vzc2VkQnlBST86IHVua25vd24gfSk/LnByb2Nlc3NlZEJ5QUlcclxuICAgICksXHJcbiAgICBHYXN0b1R5cGU6IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlKFxyXG4gICAgICAoaXRlbSBhcyB7IEdhc3RvVHlwZT86IHVua25vd247IGdhc3RvVHlwZT86IHVua25vd24gfSk/Lkdhc3RvVHlwZSA/P1xyXG4gICAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uZ2FzdG9UeXBlXHJcbiAgICApLFxyXG4gIH0pKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnJlc3BvbnNlLFxyXG4gICAgSXRlbXM6IG5vcm1hbGl6ZWRJdGVtcyxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdEl0ZW1EdG8+XHJcbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RJdGVtRHRvPiA9PiB7XHJcbiAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRJdGVtcyA9IGl0ZW1zLm1hcCgoaXRlbSkgPT4gKHtcclxuICAgIC4uLml0ZW0sXHJcbiAgICBQcm9jZXNzZWRCeUFJOiB0b051bGxhYmxlQm9vbChcclxuICAgICAgKGl0ZW0gYXMgeyBQcm9jZXNzZWRCeUFJPzogdW5rbm93bjsgcHJvY2Vzc2VkQnlBST86IHVua25vd24gfSk/LlByb2Nlc3NlZEJ5QUkgPz9cclxuICAgICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8ucHJvY2Vzc2VkQnlBSVxyXG4gICAgKSxcclxuICAgIEdhc3RvVHlwZTogdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUoXHJcbiAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uR2FzdG9UeXBlID8/XHJcbiAgICAgICAgKGl0ZW0gYXMgeyBHYXN0b1R5cGU/OiB1bmtub3duOyBnYXN0b1R5cGU/OiB1bmtub3duIH0pPy5nYXN0b1R5cGVcclxuICAgICksXHJcbiAgfSkpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgLi4ucmVzcG9uc2UsXHJcbiAgICBJdGVtczogbm9ybWFsaXplZEl0ZW1zLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXREZXRhaWxEdG8+XHJcbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvPiA9PiB7XHJcbiAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRJdGVtcyA9IGl0ZW1zLm1hcCgoaXRlbSkgPT4gKHtcclxuICAgIC4uLml0ZW0sXHJcbiAgICBTdGF0dXM6IHRvTnVsbGFibGVUaWNrZXRTdGF0dXNDb2RlKFxyXG4gICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LlN0YXR1cyA/P1xyXG4gICAgICAgIChpdGVtIGFzIHsgU3RhdHVzPzogdW5rbm93bjsgc3RhdHVzPzogdW5rbm93biB9KT8uc3RhdHVzXHJcbiAgICApLFxyXG4gICAgUHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woXHJcbiAgICAgIChpdGVtIGFzIHsgUHJvY2Vzc2VkQnlBST86IHVua25vd247IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pPy5Qcm9jZXNzZWRCeUFJID8/XHJcbiAgICAgICAgKGl0ZW0gYXMgeyBQcm9jZXNzZWRCeUFJPzogdW5rbm93bjsgcHJvY2Vzc2VkQnlBST86IHVua25vd24gfSk/LnByb2Nlc3NlZEJ5QUlcclxuICAgICksXHJcbiAgICBIb2phR2FzdG9zSWREaXNwbGF5OiBzYWZlVGV4dChcclxuICAgICAgKGl0ZW0gYXMgeyBIb2phR2FzdG9zSWREaXNwbGF5PzogdW5rbm93bjsgaG9qYUdhc3Rvc0lkRGlzcGxheT86IHVua25vd24gfSk/LkhvamFHYXN0b3NJZERpc3BsYXkgPz9cclxuICAgICAgICAoaXRlbSBhcyB7IEhvamFHYXN0b3NJZERpc3BsYXk/OiB1bmtub3duOyBob2phR2FzdG9zSWREaXNwbGF5PzogdW5rbm93biB9KT8uaG9qYUdhc3Rvc0lkRGlzcGxheVxyXG4gICAgKSxcclxuICAgIEdhc3RvVHlwZTogdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUoXHJcbiAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uR2FzdG9UeXBlID8/XHJcbiAgICAgICAgKGl0ZW0gYXMgeyBHYXN0b1R5cGU/OiB1bmtub3duOyBnYXN0b1R5cGU/OiB1bmtub3duIH0pPy5nYXN0b1R5cGVcclxuICAgICksXHJcbiAgICBMaW5lczogQXJyYXkuaXNBcnJheShpdGVtPy5MaW5lcykgPyBpdGVtLkxpbmVzIDogW10sXHJcbiAgfSkpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgLi4ucmVzcG9uc2UsXHJcbiAgICBJdGVtczogbm9ybWFsaXplZEl0ZW1zLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplVGlja2V0TGlua0J1bGtSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogSW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXN1bHREdG8+XHJcbik6IEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvPiA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxuICBjb25zdCByYXdEYXRhID0gbm9ybWFsaXplZD8uRGF0YTtcclxuICBpZiAoIXJhd0RhdGEgfHwgdHlwZW9mIHJhd0RhdGEgIT09IFwib2JqZWN0XCIpIHtcclxuICAgIHJldHVybiBub3JtYWxpemVkO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdG9Jc3N1ZUxpc3QgPSAodmFsdWU6IHVua25vd24pID0+IHtcclxuICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHJldHVybiBbXTtcclxuXHJcbiAgICByZXR1cm4gdmFsdWUubWFwKChlbnRyeSkgPT4gKHtcclxuICAgICAgdGlja2V0SWQ6IHNhZmVUZXh0KFxyXG4gICAgICAgIChlbnRyeSBhcyB7IHRpY2tldElkPzogdW5rbm93bjsgVGlja2V0SWQ/OiB1bmtub3duIH0pPy50aWNrZXRJZCA/P1xyXG4gICAgICAgICAgKGVudHJ5IGFzIHsgVGlja2V0SWQ/OiB1bmtub3duIH0pLlRpY2tldElkXHJcbiAgICAgICksXHJcbiAgICAgIHJlYXNvbjogc2FmZVRleHQoXHJcbiAgICAgICAgKGVudHJ5IGFzIHsgcmVhc29uPzogdW5rbm93bjsgUmVhc29uPzogdW5rbm93biB9KT8ucmVhc29uID8/XHJcbiAgICAgICAgICAoZW50cnkgYXMgeyBSZWFzb24/OiB1bmtub3duIH0pLlJlYXNvblxyXG4gICAgICApLFxyXG4gICAgfSkpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGxpbmtlZFRpY2tldElkc1JhdyA9XHJcbiAgICAocmF3RGF0YSBhcyB7IGxpbmtlZFRpY2tldElkcz86IHVua25vd247IExpbmtlZFRpY2tldElkcz86IHVua25vd24gfSkubGlua2VkVGlja2V0SWRzID8/XHJcbiAgICAocmF3RGF0YSBhcyB7IExpbmtlZFRpY2tldElkcz86IHVua25vd24gfSkuTGlua2VkVGlja2V0SWRzO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgLi4ubm9ybWFsaXplZCxcclxuICAgIERhdGE6IHtcclxuICAgICAgZXhwZW5zZVNoZWV0SWQ6IHNhZmVUZXh0KFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgZXhwZW5zZVNoZWV0SWQ/OiB1bmtub3duOyBFeHBlbnNlU2hlZXRJZD86IHVua25vd24gfSkuZXhwZW5zZVNoZWV0SWQgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgRXhwZW5zZVNoZWV0SWQ/OiB1bmtub3duIH0pLkV4cGVuc2VTaGVldElkXHJcbiAgICAgICksXHJcbiAgICAgIHJlcXVlc3RlZENvdW50OiB0b051bGxhYmxlTnVtYmVyKFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgcmVxdWVzdGVkQ291bnQ/OiB1bmtub3duOyBSZXF1ZXN0ZWRDb3VudD86IHVua25vd24gfSkucmVxdWVzdGVkQ291bnQgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgUmVxdWVzdGVkQ291bnQ/OiB1bmtub3duIH0pLlJlcXVlc3RlZENvdW50XHJcbiAgICAgICkgPz8gMCxcclxuICAgICAgbGlua2VkQ291bnQ6IHRvTnVsbGFibGVOdW1iZXIoXHJcbiAgICAgICAgKHJhd0RhdGEgYXMgeyBsaW5rZWRDb3VudD86IHVua25vd247IExpbmtlZENvdW50PzogdW5rbm93biB9KS5saW5rZWRDb3VudCA/P1xyXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBMaW5rZWRDb3VudD86IHVua25vd24gfSkuTGlua2VkQ291bnRcclxuICAgICAgKSA/PyAwLFxyXG4gICAgICBza2lwcGVkQ291bnQ6IHRvTnVsbGFibGVOdW1iZXIoXHJcbiAgICAgICAgKHJhd0RhdGEgYXMgeyBza2lwcGVkQ291bnQ/OiB1bmtub3duOyBTa2lwcGVkQ291bnQ/OiB1bmtub3duIH0pLnNraXBwZWRDb3VudCA/P1xyXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBTa2lwcGVkQ291bnQ/OiB1bmtub3duIH0pLlNraXBwZWRDb3VudFxyXG4gICAgICApID8/IDAsXHJcbiAgICAgIGZhaWxlZENvdW50OiB0b051bGxhYmxlTnVtYmVyKFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgZmFpbGVkQ291bnQ/OiB1bmtub3duOyBGYWlsZWRDb3VudD86IHVua25vd24gfSkuZmFpbGVkQ291bnQgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgRmFpbGVkQ291bnQ/OiB1bmtub3duIH0pLkZhaWxlZENvdW50XHJcbiAgICAgICkgPz8gMCxcclxuICAgICAgbGlua2VkVGlja2V0SWRzOiBBcnJheS5pc0FycmF5KGxpbmtlZFRpY2tldElkc1JhdylcclxuICAgICAgICA/IGxpbmtlZFRpY2tldElkc1Jhdy5tYXAoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeSkpLmZpbHRlcihCb29sZWFuKVxyXG4gICAgICAgIDogW10sXHJcbiAgICAgIHNraXBwZWQ6IHRvSXNzdWVMaXN0KFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgc2tpcHBlZD86IHVua25vd247IFNraXBwZWQ/OiB1bmtub3duIH0pLnNraXBwZWQgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgU2tpcHBlZD86IHVua25vd24gfSkuU2tpcHBlZFxyXG4gICAgICApLFxyXG4gICAgICBmYWlsZWQ6IHRvSXNzdWVMaXN0KFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgZmFpbGVkPzogdW5rbm93bjsgRmFpbGVkPzogdW5rbm93biB9KS5mYWlsZWQgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgRmFpbGVkPzogdW5rbm93biB9KS5GYWlsZWRcclxuICAgICAgKSxcclxuICAgIH0sXHJcbiAgfTtcclxufTtcclxuIiwgIlx1RkVGRmltcG9ydCB0eXBlIHtcclxuICBFeHBlbnNlU2hlZXRDYXJkLFxyXG4gIEV4cGVuc2VTaGVldERldGFpbER0byxcclxuICBFeHBlbnNlU2hlZXRIZWFkZXIsXHJcbiAgRXhwZW5zZVNoZWV0TGluZSxcclxuICBFeHBlbnNlU2hlZXRMaW5lRHRvLFxyXG4gIEV4cGVuc2VTaGVldExpc3RJdGVtRHRvLFxyXG59IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQsIHRvTnVsbGFibGVCb29sLCB0b051bGxhYmxlTnVtYmVyIH0gZnJvbSBcIi4vZXhwZW5zZUFwaVRyYW5zZm9ybXMudHNcIjtcclxuXHJcbnR5cGUgRXhwZW5zZVdpbmRvd1J1bnRpbWUgPSB7XHJcbiAgX19FWFBFTlNFX0dBU1RPX1RZUEVTX18/OiBBcnJheTx7XHJcbiAgICB2YWx1ZT86IHVua25vd247XHJcbiAgICBWYWx1ZT86IHVua25vd247XHJcbiAgICB0ZXh0PzogdW5rbm93bjtcclxuICAgIFRleHQ/OiB1bmtub3duO1xyXG4gIH0+O1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlR2FzdG9UeXBlRW50cnkgPSBOb25OdWxsYWJsZTxFeHBlbnNlV2luZG93UnVudGltZVtcIl9fRVhQRU5TRV9HQVNUT19UWVBFU19fXCJdPltudW1iZXJdO1xyXG5cclxuY29uc3QgcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lID0gKCk6IEV4cGVuc2VXaW5kb3dSdW50aW1lID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHt9O1xyXG4gIHJldHVybiB3aW5kb3cgYXMgdW5rbm93biBhcyBFeHBlbnNlV2luZG93UnVudGltZTtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVUeXBlTGFiZWwgPSAodHlwZVZhbHVlQ29kZTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBpZiAoIXR5cGVWYWx1ZUNvZGUgfHwgdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgcmV0dXJuIHR5cGVWYWx1ZUNvZGU7XHJcbiAgfVxyXG5cclxuICBjb25zdCByYXdDYXRhbG9nU291cmNlID0gcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lKCkuX19FWFBFTlNFX0dBU1RPX1RZUEVTX187XHJcbiAgY29uc3QgcmF3Q2F0YWxvZyA9IEFycmF5LmlzQXJyYXkocmF3Q2F0YWxvZ1NvdXJjZSkgPyByYXdDYXRhbG9nU291cmNlIDogW107XHJcbiAgY29uc3QgbWF0Y2ggPSByYXdDYXRhbG9nLmZpbmQoKGVudHJ5OiBFeHBlbnNlR2FzdG9UeXBlRW50cnkpID0+IHtcclxuICAgIGNvbnN0IGVudHJ5Q29kZSA9IHNhZmVUZXh0KGVudHJ5Py52YWx1ZSB8fCBlbnRyeT8uVmFsdWUpO1xyXG4gICAgcmV0dXJuIGVudHJ5Q29kZSA9PT0gdHlwZVZhbHVlQ29kZTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHNhZmVUZXh0KG1hdGNoPy50ZXh0IHx8IG1hdGNoPy5UZXh0KSB8fCB0eXBlVmFsdWVDb2RlO1xyXG59O1xyXG5cclxuLy8gTWFwcyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2xpc3QgaXRlbSBjb250cmFjdCB0byBsaXN0IGNhcmQgVUkgbW9kZWwuXHJcbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZCA9IChpdGVtOiBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byk6IEV4cGVuc2VTaGVldENhcmQgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBob2phR2FzdG9zSWQ6IHNhZmVUZXh0KGl0ZW0uSG9qYUdhc3Rvc0lkKSxcclxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChpdGVtLkRlc2NyaXB0aW9uKSxcclxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogdG9OdWxsYWJsZU51bWJlcihpdGVtLkV4cGVuc2VTaGVldFN0YXR1cyksXHJcbiAgICBlc3RhZG9Db21lbnRhcmlvczogc2FmZVRleHQoaXRlbS5Fc3RhZG9Db21lbnRhcmlvcykgfHwgbnVsbCxcclxuICAgIHVzZXJJZDogc2FmZVRleHQoaXRlbS5Vc2VySWQpLFxyXG4gICAgdXNlck5hbWU6IHNhZmVUZXh0KGl0ZW0uVXNlck5hbWUpIHx8IG51bGwsXHJcbiAgICB2b3VjaGVyOiBzYWZlVGV4dChpdGVtLlZvdWNoZXIpLFxyXG4gICAgcHJvaklkOiBzYWZlVGV4dChpdGVtLlByb2pJZCksXHJcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGl0ZW0uQ3VycmVuY3lDb2RlKSxcclxuICAgIHRvdGFsQW1vdW50OiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uVG90YWxBbW91bnQpLFxyXG4gICAgZXhjaFJhdGU6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5FeGNoUmF0ZSksXHJcbiAgICBleGNoYW5nZVJhdGVNb2RlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uRXhjaGFuZ2VSYXRlTW9kZSksXHJcbiAgICBjcmVhdGVkRGF0ZTogc2FmZVRleHQoaXRlbS5DcmVhdGVkRGF0ZSksXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfSBoZWFkZXIgY29udHJhY3QgdG8gVUkgbW9kZWwuXHJcbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRIZWFkZXIgPSAoc2hlZXQ6IEV4cGVuc2VTaGVldERldGFpbER0byk6IEV4cGVuc2VTaGVldEhlYWRlciA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGhvamFHYXN0b3NJZDogc2FmZVRleHQoc2hlZXQuSG9qYUdhc3Rvc0lkKSxcclxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChzaGVldC5EZXNjcmlwdGlvbiksXHJcbiAgICB1c2VySWQ6IHNhZmVUZXh0KHNoZWV0LlVzZXJJZCksXHJcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IHRvTnVsbGFibGVOdW1iZXIoc2hlZXQuRXhwZW5zZVNoZWV0U3RhdHVzKSxcclxuICAgIGVzdGFkb0NvbWVudGFyaW9zOiBzYWZlVGV4dChzaGVldC5Fc3RhZG9Db21lbnRhcmlvcykgfHwgbnVsbCxcclxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQoc2hlZXQuQ3VycmVuY3lDb2RlKSxcclxuICAgIHRvdGFsQW1vdW50OiB0b051bGxhYmxlTnVtYmVyKHNoZWV0LlRvdGFsQW1vdW50KSxcclxuICAgIGV4Y2hSYXRlOiBzYWZlVGV4dChzaGVldC5FeGNoUmF0ZSksXHJcbiAgICBleGNoYW5nZVJhdGVNb2RlOiB0b051bGxhYmxlTnVtYmVyKHNoZWV0LkV4Y2hhbmdlUmF0ZU1vZGUpLFxyXG4gICAgcHJvaklkOiBzYWZlVGV4dChzaGVldC5Qcm9qSWQpLFxyXG4gICAgdm91Y2hlcjogc2FmZVRleHQoc2hlZXQuVm91Y2hlciksXHJcbiAgICBjcmVhdGVkRGF0ZTogc2FmZVRleHQoc2hlZXQuQ3JlYXRlZERhdGUpLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0gbGluZSBjb250cmFjdCB0byBVSSBtb2RlbC5cclxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldExpbmUgPSAobGluZTogRXhwZW5zZVNoZWV0TGluZUR0byk6IEV4cGVuc2VTaGVldExpbmUgPT4ge1xyXG4gIGNvbnN0IHR5cGVWYWx1ZUNvZGUgPSBzYWZlVGV4dChsaW5lLlR5cGVWYWx1ZSk7XHJcbiAgY29uc3QgbGVnYWN5UHJpY2UgPSAobGluZSBhcyB7IHByaWNlPzogdW5rbm93biB9KS5wcmljZTtcclxuICBjb25zdCBsZWdhY3lGaWxlSWQgPSAobGluZSBhcyB7IGZpbGVJZD86IHVua25vd24gfSkuZmlsZUlkO1xyXG4gIGNvbnN0IGV4cGxpY2l0TGluZVJlY0lkID0gc2FmZVRleHQoXHJcbiAgICAobGluZSBhcyB7IExpbmVSZWNJZD86IHVua25vd247IGxpbmVSZWNJZD86IHVua25vd24gfSkuTGluZVJlY0lkID8/XHJcbiAgICAgIChsaW5lIGFzIHsgbGluZVJlY0lkPzogdW5rbm93biB9KS5saW5lUmVjSWRcclxuICApO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbGluZVJlY0lkOiBleHBsaWNpdExpbmVSZWNJZCB8fCBzYWZlVGV4dChsaW5lLlJlY0lkKSxcclxuICAgIHRyYW5zRGF0ZTogc2FmZVRleHQobGluZS5UcmFuc0RhdGUpLFxyXG4gICAgdHlwZVZhbHVlQ29kZSxcclxuICAgIHR5cGVWYWx1ZTogcmVzb2x2ZVR5cGVMYWJlbCh0eXBlVmFsdWVDb2RlKSxcclxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChsaW5lLkRlc2NyaXB0aW9uKSxcclxuICAgIGludGVybmFjaW9uYWw6IHRvTnVsbGFibGVCb29sKGxpbmUuSW50ZXJuYWNpb25hbCksXHJcbiAgICBmaWxlSWQ6IHNhZmVUZXh0KGxpbmUuRmlsZUlkID8/IGxlZ2FjeUZpbGVJZCksXHJcbiAgICB0aWNrZXQ6IHRvTnVsbGFibGVCb29sKGxpbmUuVGlja2V0KSxcclxuICAgIHByaWNlOiB0b051bGxhYmxlTnVtYmVyKGxpbmUuUHJpY2UgPz8gbGVnYWN5UHJpY2UpLFxyXG4gICAgcXR5OiB0b051bGxhYmxlTnVtYmVyKGxpbmUuUXR5KSxcclxuICAgIGFtb3VudDogdG9OdWxsYWJsZU51bWJlcihsaW5lLkFtb3VudCksXHJcbiAgICBwcm9qSWQ6IHNhZmVUZXh0KGxpbmUuUHJvaklkKSxcclxuICAgIGluZEF0dGFjaEZpbGVzOiBzYWZlVGV4dChsaW5lLkluZEF0dGFjaEZpbGVzKSxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgcGFyc2VFeHBlbnNlQXBpRGF0ZSB9IGZyb20gXCIuL2V4cGVuc2VBcGlEYXRlVXRpbHMudHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIEV4cGVuc2VEYXRlUGFydHMgPSB7XHJcbiAgeWVhcjogc3RyaW5nO1xyXG4gIG1vbnRoOiBzdHJpbmc7XHJcbiAgZGF5OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIFBhcnNlRXhwZW5zZURhdGVPcHRpb25zID0ge1xyXG4gIHByZWZlck1vbnRoRmlyc3RPblNsYXNoPzogYm9vbGVhbjtcclxufTtcclxuXHJcbmNvbnN0IEJBU1FVRV9NT05USFNfU0hPUlQgPSBbXHJcbiAgXCJ1cnRcIixcclxuICBcIm90c1wiLFxyXG4gIFwibWFyXCIsXHJcbiAgXCJhcGlcIixcclxuICBcIm1haVwiLFxyXG4gIFwiZWthXCIsXHJcbiAgXCJ1enRcIixcclxuICBcImFidVwiLFxyXG4gIFwiaXJhXCIsXHJcbiAgXCJ1cnJcIixcclxuICBcImF6YVwiLFxyXG4gIFwiYWJlXCIsXHJcbl07XHJcblxyXG5jb25zdCBub3JtYWxpemVVaUxvY2FsZSA9IChsb2NhbGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcobG9jYWxlIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJlcy1FU1wiO1xyXG4gIGlmICgvXnpoLWhhbnMvaS50ZXN0KHZhbHVlKSkgcmV0dXJuIFwiemgtQ05cIjtcclxuICByZXR1cm4gdmFsdWU7XHJcbn07XHJcblxyXG5jb25zdCBpc0Jhc3F1ZUxvY2FsZSA9IChsb2NhbGU6IHN0cmluZyk6IGJvb2xlYW4gPT4gL15ldVxcYi9pLnRlc3QoU3RyaW5nKGxvY2FsZSB8fCBcIlwiKSk7XHJcblxyXG4vLyBOb3JtYWxpemUgdW5rbm93biB2YWx1ZXMgdG8gYSB0cmltbWVkIHN0cmluZy5cclxuZXhwb3J0IGNvbnN0IHNhZmVUZXh0ID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XHJcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG59O1xyXG5cclxuLy8gQ2xlYW5zIGNoYXQgdGV4dCB3aGlsZSBwcmVzZXJ2aW5nIGFjY2VudHMgYW5kIHJlYWRhYmxlIHB1bmN0dWF0aW9uLlxyXG5leHBvcnQgY29uc3Qgc2FuaXRpemVBc3Npc3RhbnRUZXh0ID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBzb3VyY2UgPSBzYWZlVGV4dCh2YWx1ZSk7XHJcbiAgaWYgKCFzb3VyY2UpIHJldHVybiBcIlwiO1xyXG5cclxuICByZXR1cm4gc291cmNlXHJcbiAgICAubm9ybWFsaXplKFwiTkZDXCIpXHJcbiAgICAucmVwbGFjZSgvXFx1RkVGRi9nLCBcIlwiKVxyXG4gICAgLnJlcGxhY2UoL1tcXHUwMDAwLVxcdTAwMDhcXHUwMDBCXFx1MDAwQ1xcdTAwMEUtXFx1MDAxRlxcdTAwN0ZdL2csIFwiXCIpXHJcbiAgICAucmVwbGFjZSgvW1xcdTIwMEItXFx1MjAwRFxcdTIwNjBdL2csIFwiXCIpXHJcbiAgICAucmVwbGFjZSgvXFxyXFxuPy9nLCBcIlxcblwiKVxyXG4gICAgLnJlcGxhY2UoL1sgXFx0XStcXG4vZywgXCJcXG5cIilcclxuICAgIC5yZXBsYWNlKC9cXG57Myx9L2csIFwiXFxuXFxuXCIpXHJcbiAgICAudHJpbSgpO1xyXG59O1xyXG5cclxuLy8gTm9ybWFsaXplcyBjYXJkIHRpdGxlIHRleHQgb25seSB3aGVuIGl0IGNvbWVzIGluIGZ1bGwgdXBwZXIgb3IgZnVsbCBsb3dlciBjYXNlLlxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplQ2FyZFRpdGxlVGV4dCA9ICh2YWx1ZTogdW5rbm93biwgZmFsbGJhY2sgPSBcIi1cIik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgc291cmNlID0gc2FmZVRleHQodmFsdWUpO1xyXG4gIGlmICghc291cmNlKSByZXR1cm4gZmFsbGJhY2s7XHJcblxyXG4gIGNvbnN0IGhhc0xldHRlcnMgPSAvW0EtWmEtelx1MDBDMC1cdTAwRDZcdTAwRDgtXHUwMEY2XHUwMEY4LVx1MDBGRl0vLnRlc3Qoc291cmNlKTtcclxuICBpZiAoIWhhc0xldHRlcnMpIHJldHVybiBzb3VyY2U7XHJcblxyXG4gIGNvbnN0IGlzQWxsVXBwZXIgPSBzb3VyY2UgPT09IHNvdXJjZS50b1VwcGVyQ2FzZSgpICYmIHNvdXJjZSAhPT0gc291cmNlLnRvTG93ZXJDYXNlKCk7XHJcbiAgY29uc3QgaXNBbGxMb3dlciA9IHNvdXJjZSA9PT0gc291cmNlLnRvTG93ZXJDYXNlKCkgJiYgc291cmNlICE9PSBzb3VyY2UudG9VcHBlckNhc2UoKTtcclxuICBpZiAoIWlzQWxsVXBwZXIgJiYgIWlzQWxsTG93ZXIpIHtcclxuICAgIHJldHVybiBzb3VyY2U7XHJcbiAgfVxyXG5cclxuICBjb25zdCBsb3dlciA9IHNvdXJjZS50b0xvd2VyQ2FzZSgpO1xyXG4gIHJldHVybiBgJHtsb3dlci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKX0ke2xvd2VyLnNsaWNlKDEpfWA7XHJcbn07XHJcblxyXG4vLyBSZXR1cm5zIHRydWUgb25seSB3aGVuIHZvdWNoZXIgaGFzIGEgbWVhbmluZ2Z1bCBhc3NpZ25lZCB2YWx1ZS5cclxuZXhwb3J0IGNvbnN0IGhhc0Fzc2lnbmVkVm91Y2hlciA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IHZvdWNoZXIgPSBzYWZlVGV4dCh2YWx1ZSkudG9VcHBlckNhc2UoKTtcclxuICBpZiAoIXZvdWNoZXIpIHJldHVybiBmYWxzZTtcclxuICByZXR1cm4gdm91Y2hlciAhPT0gXCItXCIgJiYgdm91Y2hlciAhPT0gXCIuXCIgJiYgdm91Y2hlciAhPT0gXCIwXCI7XHJcbn07XHJcblxyXG4vLyBSZXR1cm4gZGF0ZSBhdCBsb2NhbCBkYXkgc3RhcnQuXHJcbmV4cG9ydCBjb25zdCBzdGFydE9mRGF5ID0gKGRhdGU6IERhdGUpOiBEYXRlID0+IHtcclxuICByZXR1cm4gbmV3IERhdGUoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpKTtcclxufTtcclxuXHJcbi8vIEZvcm1hdCBsb2NhbCBkYXRlIHRvIHl5eXktTU0tZGQuXHJcbmV4cG9ydCBjb25zdCB0b0lzb0RhdGUgPSAoZGF0ZTogRGF0ZSk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIGAke2RhdGUuZ2V0RnVsbFllYXIoKX0tJHtTdHJpbmcoZGF0ZS5nZXRNb250aCgpICsgMSkucGFkU3RhcnQoMiwgXCIwXCIpfS0ke1N0cmluZyhkYXRlLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpfWA7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZEV4cGVuc2VEYXRlID0gKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF5OiBudW1iZXIpOiBEYXRlIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgY2FuZGlkYXRlID0gbmV3IERhdGUoeWVhciwgbW9udGggLSAxLCBkYXkpO1xyXG4gIGlmIChcclxuICAgIE51bWJlci5pc05hTihjYW5kaWRhdGUuZ2V0VGltZSgpKSB8fFxyXG4gICAgY2FuZGlkYXRlLmdldEZ1bGxZZWFyKCkgIT09IHllYXIgfHxcclxuICAgIGNhbmRpZGF0ZS5nZXRNb250aCgpICE9PSBtb250aCAtIDEgfHxcclxuICAgIGNhbmRpZGF0ZS5nZXREYXRlKCkgIT09IGRheVxyXG4gICkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gY2FuZGlkYXRlO1xyXG59O1xyXG5cclxuLy8gUGFyc2Ugc3VwcG9ydGVkIEFQSSBkYXRlIGZvcm1hdHMuXHJcbmV4cG9ydCBjb25zdCBwYXJzZUV4cGVuc2VEYXRlID0gKHJhdz86IHN0cmluZywgb3B0aW9ucz86IFBhcnNlRXhwZW5zZURhdGVPcHRpb25zKTogRGF0ZSB8IG51bGwgPT4ge1xyXG4gIGlmICghcmF3KSByZXR1cm4gbnVsbDtcclxuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhyYXcpLnRyaW0oKTtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgZGF0ZU9ubHkgPSB2YWx1ZS5zcGxpdChcIlRcIilbMF0uc3BsaXQoXCIgXCIpWzBdO1xyXG5cclxuICAvLyBLZWVwIG9wdGlvbmFsIG1vbnRoLWZpcnN0IGNvbXBhdGliaWxpdHkgZm9yIGxlZ2FjeSBzbGFzaCBkYXRlcyBpbiBjYXJkcy5cclxuICBpZiAob3B0aW9ucz8ucHJlZmVyTW9udGhGaXJzdE9uU2xhc2ggJiYgL15cXGR7Mn1cXC9cXGR7Mn1cXC9cXGR7NH0kLy50ZXN0KGRhdGVPbmx5KSkge1xyXG4gICAgY29uc3QgW2ZpcnN0UGFydCwgc2Vjb25kUGFydCwgeWVhclBhcnRdID0gZGF0ZU9ubHkuc3BsaXQoL1suLy1dLyk7XHJcbiAgICBjb25zdCBmaXJzdCA9IE51bWJlcihmaXJzdFBhcnQpO1xyXG4gICAgY29uc3Qgc2Vjb25kID0gTnVtYmVyKHNlY29uZFBhcnQpO1xyXG4gICAgY29uc3QgeWVhciA9IE51bWJlcih5ZWFyUGFydCk7XHJcbiAgICBjb25zdCBtb250aEZpcnN0RGF0ZSA9IGJ1aWxkRXhwZW5zZURhdGUoeWVhciwgZmlyc3QsIHNlY29uZCk7XHJcbiAgICBpZiAobW9udGhGaXJzdERhdGUpIHtcclxuICAgICAgcmV0dXJuIG1vbnRoRmlyc3REYXRlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHBhcnNlRXhwZW5zZUFwaURhdGUodmFsdWUpO1xyXG59O1xyXG5cclxuLy8gRm9ybWF0IGEgZGF0ZSBmb3IgcmVhZC1vbmx5IGZpZWxkcyB1c2luZyB0aGUgc2FtZSBvdXRwdXQgc3R5bGUgYXMgdmlzaXRzLlxyXG5leHBvcnQgY29uc3QgZm9ybWF0RXhwZW5zZURpc3BsYXlEYXRlID0gKHJhdz86IHN0cmluZywgbG9jYWxlID0gXCJlcy1FU1wiLCBmYWxsYmFjayA9IFwiLVwiKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBkYXRlID0gcGFyc2VFeHBlbnNlRGF0ZShyYXcpO1xyXG4gIGlmICghZGF0ZSkgcmV0dXJuIGZhbGxiYWNrO1xyXG5cclxuICBjb25zdCBzYWZlTG9jYWxlID0gbm9ybWFsaXplVWlMb2NhbGUobG9jYWxlKTtcclxuICBpZiAoaXNCYXNxdWVMb2NhbGUoc2FmZUxvY2FsZSkpIHtcclxuICAgIHJldHVybiBgJHtkYXRlLmdldERhdGUoKX0gJHtCQVNRVUVfTU9OVEhTX1NIT1JUW2RhdGUuZ2V0TW9udGgoKV19ICR7ZGF0ZS5nZXRGdWxsWWVhcigpfWAudG9Mb3dlckNhc2UoKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBkYXRlXHJcbiAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKHNhZmVMb2NhbGUsIHtcclxuICAgICAgZGF5OiBcIm51bWVyaWNcIixcclxuICAgICAgbW9udGg6IFwic2hvcnRcIixcclxuICAgICAgeWVhcjogXCJudW1lcmljXCIsXHJcbiAgICB9KVxyXG4gICAgLnJlcGxhY2UoL1xcLi9nLCBcIlwiKVxyXG4gICAgLnRvTG93ZXJDYXNlKCk7XHJcbn07XHJcblxyXG4vLyBCdWlsZCB0aW1lbGluZSBkYXRlIGZyYWdtZW50cyBmb3IgY2FyZCBsZWZ0IHBhbmVsLlxyXG5leHBvcnQgY29uc3QgZm9ybWF0RXhwZW5zZURhdGVQYXJ0cyA9IChyYXc/OiBzdHJpbmcsIGxvY2FsZSA9IFwiZXMtRVNcIiwgb3B0aW9ucz86IFBhcnNlRXhwZW5zZURhdGVPcHRpb25zKTogRXhwZW5zZURhdGVQYXJ0cyA9PiB7XHJcbiAgY29uc3QgZGF0ZSA9IHBhcnNlRXhwZW5zZURhdGUocmF3LCBvcHRpb25zKTtcclxuICBpZiAoIWRhdGUpIHtcclxuICAgIHJldHVybiB7IHllYXI6IFwiXCIsIG1vbnRoOiBcIlwiLCBkYXk6IFwiLS1cIiB9O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHllYXI6IFN0cmluZyhkYXRlLmdldEZ1bGxZZWFyKCkpLFxyXG4gICAgbW9udGg6IGRhdGUudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBtb250aDogXCJzaG9ydFwiIH0pLnJlcGxhY2UoL1xcLi9nLCBcIlwiKS50b1VwcGVyQ2FzZSgpLFxyXG4gICAgZGF5OiBTdHJpbmcoZGF0ZS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKSxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdG9OdWxsYWJsZU51bWJlciB9IGZyb20gXCIuL2V4cGVuc2VBcGlUcmFuc2Zvcm1zLnRzXCI7XG5cbnR5cGUgVGlja2V0TGluZUFtb3VudElucHV0ID0ge1xuICBxdHk/OiB1bmtub3duO1xuICBwcmljZT86IHVua25vd247XG4gIHRvdGFsQW1vdW50PzogdW5rbm93bjtcbn07XG5cbi8vIFJlc29sdmVzIHRoZSBzaWduZWQgdGlja2V0IGxpbmUgYW1vdW50LCBwcmVzZXJ2aW5nIHplcm8tcXVhbnRpdHkgZGlzY291bnQgbGluZXMuXG5leHBvcnQgY29uc3QgcmVzb2x2ZVRpY2tldExpbmVBbW91bnQgPSAobGluZTogVGlja2V0TGluZUFtb3VudElucHV0IHwgbnVsbCB8IHVuZGVmaW5lZCk6IG51bWJlciB8IG51bGwgPT4ge1xuICBpZiAoIWxpbmUpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGV4cGxpY2l0VG90YWwgPSB0b051bGxhYmxlTnVtYmVyKGxpbmUudG90YWxBbW91bnQpO1xuICBpZiAoZXhwbGljaXRUb3RhbCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBleHBsaWNpdFRvdGFsO1xuICB9XG5cbiAgY29uc3QgcXR5ID0gdG9OdWxsYWJsZU51bWJlcihsaW5lLnF0eSk7XG4gIGNvbnN0IHByaWNlID0gdG9OdWxsYWJsZU51bWJlcihsaW5lLnByaWNlKTtcbiAgaWYgKHF0eSA9PT0gbnVsbCB8fCBwcmljZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKHF0eSA9PT0gMCAmJiBwcmljZSA8IDApIHtcbiAgICByZXR1cm4gcHJpY2U7XG4gIH1cblxuICByZXR1cm4gcXR5ICogcHJpY2U7XG59O1xuXG4vLyBWYWxpZGF0ZXMgdGlja2V0IGxpbmUgYW1vdW50cyB3aGlsZSBhbGxvd2luZyBxdHk9MCBvbmx5IGZvciBuZWdhdGl2ZSBkaXNjb3VudHMuXG5leHBvcnQgY29uc3QgaXNWYWxpZFRpY2tldExpbmVBbW91bnQgPSAobGluZTogVGlja2V0TGluZUFtb3VudElucHV0IHwgbnVsbCB8IHVuZGVmaW5lZCk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBxdHkgPSB0b051bGxhYmxlTnVtYmVyKGxpbmU/LnF0eSk7XG4gIGNvbnN0IHByaWNlID0gdG9OdWxsYWJsZU51bWJlcihsaW5lPy5wcmljZSk7XG4gIGlmIChxdHkgPT09IG51bGwgfHwgcHJpY2UgPT09IG51bGwgfHwgcXR5IDwgMCB8fCBwcmljZSA9PT0gMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChxdHkgPiAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjb25zdCBsaW5lQW1vdW50ID0gcmVzb2x2ZVRpY2tldExpbmVBbW91bnQobGluZSk7XG4gIHJldHVybiBsaW5lQW1vdW50ICE9PSBudWxsICYmIGxpbmVBbW91bnQgPCAwO1xufTtcbiIsICJ0eXBlIENvbXBhbnlTZWxlY3Rpb25DYW5kaWRhdGUgPSB7XHJcbiAgY29tcGFueUlkOiBzdHJpbmc7XHJcbiAgaXNEZWZhdWx0PzogYm9vbGVhbjtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUNvbXBhbnlJZCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpLnRvVXBwZXJDYXNlKCk7XHJcblxyXG5jb25zdCBmaW5kQ29tcGFueU1hdGNoID0gKFxyXG4gIGNhbmRpZGF0ZXM6IENvbXBhbnlTZWxlY3Rpb25DYW5kaWRhdGVbXSxcclxuICByZXF1ZXN0ZWRDb21wYW55SWQ6IHN0cmluZ1xyXG4pOiBDb21wYW55U2VsZWN0aW9uQ2FuZGlkYXRlIHwgbnVsbCA9PiB7XHJcbiAgaWYgKCFyZXF1ZXN0ZWRDb21wYW55SWQpIHJldHVybiBudWxsO1xyXG5cclxuICBmb3IgKGNvbnN0IGNhbmRpZGF0ZSBvZiBjYW5kaWRhdGVzKSB7XHJcbiAgICBpZiAobm9ybWFsaXplQ29tcGFueUlkKGNhbmRpZGF0ZS5jb21wYW55SWQpID09PSByZXF1ZXN0ZWRDb21wYW55SWQpIHtcclxuICAgICAgcmV0dXJuIGNhbmRpZGF0ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuLy8gUmVzb2x2ZXMgdGhlIGVmZmVjdGl2ZSBjb21wYW55IGZvciBBUEkgY2FsbHM6IG1hbnVhbCBzZWxlY3Rpb24gd2lucyBvbmx5IHdoZW4gaXQgZXhpc3RzIGluIHRoZSBjdXJyZW50IGNvbnRleHQuXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlRWZmZWN0aXZlQ29tcGFueUlkID0gKFxyXG4gIHNlbGVjdGVkQ29tcGFueUlkOiB1bmtub3duLFxyXG4gIGNvbXBhbmllczogQ29tcGFueVNlbGVjdGlvbkNhbmRpZGF0ZVtdLFxyXG4gIGRlZmF1bHRDb21wYW55SWQ/OiB1bmtub3duXHJcbik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFNlbGVjdGVkQ29tcGFueUlkID0gbm9ybWFsaXplQ29tcGFueUlkKHNlbGVjdGVkQ29tcGFueUlkKTtcclxuICBjb25zdCBub3JtYWxpemVkRGVmYXVsdENvbXBhbnlJZCA9IG5vcm1hbGl6ZUNvbXBhbnlJZChkZWZhdWx0Q29tcGFueUlkKTtcclxuICBjb25zdCBub3JtYWxpemVkQ29tcGFuaWVzID0gQXJyYXkuaXNBcnJheShjb21wYW5pZXMpXHJcbiAgICA/IGNvbXBhbmllcy5maWx0ZXIoKGNhbmRpZGF0ZSkgPT4gbm9ybWFsaXplQ29tcGFueUlkKGNhbmRpZGF0ZS5jb21wYW55SWQpKVxyXG4gICAgOiBbXTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0ZWRNYXRjaCA9IGZpbmRDb21wYW55TWF0Y2gobm9ybWFsaXplZENvbXBhbmllcywgbm9ybWFsaXplZFNlbGVjdGVkQ29tcGFueUlkKTtcclxuICBpZiAoc2VsZWN0ZWRNYXRjaCkge1xyXG4gICAgcmV0dXJuIHNlbGVjdGVkTWF0Y2guY29tcGFueUlkO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZGVmYXVsdE1hdGNoID1cclxuICAgIGZpbmRDb21wYW55TWF0Y2gobm9ybWFsaXplZENvbXBhbmllcywgbm9ybWFsaXplZERlZmF1bHRDb21wYW55SWQpIHx8XHJcbiAgICBub3JtYWxpemVkQ29tcGFuaWVzLmZpbmQoKGNhbmRpZGF0ZSkgPT4gY2FuZGlkYXRlLmlzRGVmYXVsdCA9PT0gdHJ1ZSkgfHxcclxuICAgIG5vcm1hbGl6ZWRDb21wYW5pZXNbMF0gfHxcclxuICAgIG51bGw7XHJcblxyXG4gIHJldHVybiBkZWZhdWx0TWF0Y2g/LmNvbXBhbnlJZCB8fCBcIlwiO1xyXG59O1xyXG4iLCAiaW1wb3J0IHtcclxuICBBcGlGZXRjaEVycm9yLFxyXG4gIGZldGNoSnNvbixcclxuICBnZXRDc3JmVG9rZW4sXHJcbiAgaGFuZGxlQXBpQXV0aEZhaWx1cmUsXHJcbiAgcmVhZEFwaU1lc3NhZ2VGcm9tUmF3LFxyXG4gIHR5cGUgQXBpRmV0Y2hPcHRpb25zLFxyXG59IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB0eXBlIHtcclxuICBFbnRyYUNvbnRleHREdG8sXHJcbiAgRW50cmFDb250ZXh0UmVxdWVzdCxcclxuICBFeGNoYW5nZVJhdGVEdG8sXHJcbiAgRnVlbFByaWNlS21EdG8sXHJcbiAgRXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8sXHJcbiAgRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRDcmVhdGVSZXNwb25zZURhdGEsXHJcbiAgRXhwZW5zZVNoZWV0RGV0YWlsRHRvLFxyXG4gIEV4cGVuc2VTaGVldERyYWZ0UmVzcG9uc2UsXHJcbiAgRXhwZW5zZVNoZWV0SGVhZGVyVXBkYXRlUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRMaW5lRHRvLFxyXG4gIEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXNwb25zZURhdGEsXHJcbiAgRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8sXHJcbiAgRXhwZW5zZVNoZWV0TGlzdFJlc3BvbnNlRW52ZWxvcGUsXHJcbiAgRXhwZW5zZVNoZWV0c0Fza1JlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0c0Fza1Jlc3BvbnNlRGF0YSxcclxuICBFeHBlbnNlU2hlZXRzQXNrUmVzdWx0LFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldENyZWF0ZVJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdEl0ZW1EdG8sXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlc3VsdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5lUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0byxcclxuICBJbmRBcGlSZXNwb25zZSxcclxuICBJbmRQYWdlZFJlc3BvbnNlLFxyXG59IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHtcclxuICBpc05vbk5lZ2F0aXZlTnVtYmVyIGFzIGlzTm9uTmVnYXRpdmVOdW1iZXJUcmFuc2Zvcm0sXHJcbiAgaXNQb3NpdGl2ZU51bWJlciBhcyBpc1Bvc2l0aXZlTnVtYmVyVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXIgYXMgbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlclRyYW5zZm9ybSxcclxuICBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZSBhcyBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUkgYXMgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRQcm9jZXNzZWRCeUFJVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzIGFzIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZSBhcyBub3JtYWxpemVPcHRpb25hbEFwaURhdGVUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlIGFzIG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZSBhcyBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVUaWNrZXRMaXN0R2FzdG9UeXBlIGFzIG5vcm1hbGl6ZVRpY2tldExpc3RHYXN0b1R5cGVUcmFuc2Zvcm0sXHJcbiAgc2FmZVRleHQgYXMgc2FmZVRleHRUcmFuc2Zvcm0sXHJcbiAgdG9GbGFnQm9vbCBhcyB0b0ZsYWdCb29sVHJhbnNmb3JtLFxyXG4gIHRvTnVsbGFibGVCb29sIGFzIHRvTnVsbGFibGVCb29sVHJhbnNmb3JtLFxyXG4gIHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlIGFzIHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlVHJhbnNmb3JtLFxyXG4gIHRvTnVsbGFibGVOdW1iZXIgYXMgdG9OdWxsYWJsZU51bWJlclRyYW5zZm9ybSxcclxuICB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZSBhcyB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZVRyYW5zZm9ybSxcclxufSBmcm9tIFwiLi9leHBlbnNlQXBpVHJhbnNmb3Jtcy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIG5vcm1hbGl6ZUFwaVJlc3BvbnNlIGFzIG5vcm1hbGl6ZUFwaVJlc3BvbnNlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlIGFzIG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZVN1Ym9yZGluYXRlc1BhZ2VkUmVzcG9uc2UgYXMgbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVUaWNrZXRMaW5rQnVsa1Jlc3BvbnNlIGFzIG5vcm1hbGl6ZVRpY2tldExpbmtCdWxrUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplVGlja2V0TGlua0xpc3RQYWdlZFJlc3BvbnNlIGFzIG5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlIGFzIG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZSBhcyBub3JtYWxpemVUaWNrZXRRdWlja0NyZWF0ZVJlc3BvbnNlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlIGFzIG5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxyXG59IGZyb20gXCIuL2V4cGVuc2VBcGlSZXNwb25zZU5vcm1hbGl6ZXJzLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgbWFwRXhwZW5zZVNoZWV0SGVhZGVyIGFzIG1hcEV4cGVuc2VTaGVldEhlYWRlckNvcmUsXHJcbiAgbWFwRXhwZW5zZVNoZWV0TGluZSBhcyBtYXBFeHBlbnNlU2hlZXRMaW5lQ29yZSxcclxuICBtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZCBhcyBtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZENvcmUsXHJcbn0gZnJvbSBcIi4vZXhwZW5zZUFwaU1hcHBlcnMudHNcIjtcclxuaW1wb3J0IHsgc2FuaXRpemVBc3Npc3RhbnRUZXh0IH0gZnJvbSBcIi4vZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UgfSBmcm9tIFwiLi9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBpc1ZhbGlkVGlja2V0TGluZUFtb3VudCB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaW5lQW1vdW50LnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlIH0gZnJvbSBcIi4vZXhwZW5zZUFjdGluZ1VzZXIudHNcIjtcbmltcG9ydCB7IHJlc29sdmVFZmZlY3RpdmVDb21wYW55SWQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY29tcGFueVNlbGVjdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuXHJcbnR5cGUgUHJvamVjdERyb3Bkb3duUmVzcG9uc2UgPSB7XHJcbiAgdG90YWw/OiBudW1iZXI7XHJcbiAgaXRlbXM/OiBBcnJheTx7IHZhbHVlPzogc3RyaW5nOyB0ZXh0Pzogc3RyaW5nIH0+O1xyXG59O1xyXG5cclxudHlwZSBMZWdhY3lFeHBlbnNlTGlzdEl0ZW0gPSB7XHJcbiAgaG9qYUdhc3Rvc0lkPzogdW5rbm93bjtcclxuICBkZXNjcmlwdGlvbj86IHVua25vd247XHJcbiAgZXN0YWRvQ29tZW50YXJpb3M/OiB1bmtub3duO1xyXG4gIHZvdWNoZXI/OiB1bmtub3duO1xyXG4gIHByb2pJZD86IHVua25vd247XHJcbiAgY3VycmVuY3lDb2RlPzogdW5rbm93bjtcclxuICB0b3RhbEFtb3VudD86IHVua25vd247XHJcbiAgdG90YWxBbW91bnRNU1Q/OiB1bmtub3duO1xyXG4gIGV4Y2hSYXRlPzogdW5rbm93bjtcclxuICB1c2VySWQ/OiB1bmtub3duO1xyXG4gIHVzZXJOYW1lPzogdW5rbm93bjtcclxuICBleGNoYW5nZVJhdGVNb2RlPzogdW5rbm93bjtcclxuICBleHBlbnNlU2hlZXRTdGF0dXM/OiB1bmtub3duO1xyXG4gIGNyZWF0ZWREYXRlPzogdW5rbm93bjtcclxufTtcclxuXHJcbnR5cGUgTGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZSA9IHtcclxuICBzdWNjZXNzPzogYm9vbGVhbjtcclxuICBtZXNzYWdlPzogc3RyaW5nO1xyXG4gIHRvdGFsPzogbnVtYmVyO1xyXG4gIHBhZ2U/OiBudW1iZXI7XHJcbiAgcGFnZVNpemU/OiBudW1iZXI7XHJcbiAgaXRlbXM/OiBMZWdhY3lFeHBlbnNlTGlzdEl0ZW1bXTtcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZUFwaUNvbnRleHQgPSB7XHJcbiAgdG9rZW46IHN0cmluZztcclxuICBjb21wYW55SWQ6IHN0cmluZztcclxuICBheFVzZXJJZDogc3RyaW5nO1xyXG4gIGNybVVzZXJJZDogc3RyaW5nO1xyXG4gIGRlZmF1bHRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgRXhwZW5zZUFwaUNvbnRleHRTbmFwc2hvdCA9IHtcclxuICBjb21wYW55SWQ6IHN0cmluZztcclxuICBheFVzZXJJZDogc3RyaW5nO1xyXG4gIGNybVVzZXJJZDogc3RyaW5nO1xyXG4gIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGJvb2xlYW47XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VBcGlBdXRoU2VlZCA9IHtcclxuICB0b2tlbjogc3RyaW5nO1xyXG4gIGVudHJhT2lkOiBzdHJpbmc7XHJcbiAgYXBwQ29kZTogc3RyaW5nO1xyXG4gIHN0cmljdEFwaVJvdXRlczogYm9vbGVhbjtcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZVdpbmRvd1J1bnRpbWUgPSB7XHJcbiAgX19JTkRfQVBJX1RPS0VOX18/OiBzdHJpbmc7XHJcbiAgX19JTkRfRU5UUkFfT0lEX18/OiBzdHJpbmc7XHJcbiAgX19JTkRfQVBQX0NPREVfXz86IHN0cmluZztcclxuICBfX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18/OiBzdHJpbmc7XHJcbiAgX19JTkRfRVhQRU5TRV9TVFJJQ1RfQVBJX18/OiBib29sZWFuIHwgc3RyaW5nO1xyXG4gIF9fRVhQRU5TRV9HQVNUT19UWVBFU19fPzogQXJyYXk8e1xyXG4gICAgdmFsdWU/OiB1bmtub3duO1xyXG4gICAgVmFsdWU/OiB1bmtub3duO1xyXG4gICAgdGV4dD86IHVua25vd247XHJcbiAgICBUZXh0PzogdW5rbm93bjtcclxuICB9PjtcclxufTtcclxuXHJcbmNvbnN0IERFRkFVTFRfQVBQX0NPREUgPSBcIkNSTVwiO1xyXG5jb25zdCBKU09OX0hFQURFUlM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbn07XHJcblxyXG5sZXQgcnVudGltZUF1dGhTZWVkOiBQYXJ0aWFsPEV4cGVuc2VBcGlBdXRoU2VlZD4gPSB7fTtcclxubGV0IGNhY2hlZENvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0IHwgbnVsbCA9IG51bGw7XHJcbmxldCBjYWNoZWRDb250ZXh0S2V5ID0gXCJcIjtcclxubGV0IGNvbnRleHRQcm9taXNlOiBQcm9taXNlPEV4cGVuc2VBcGlDb250ZXh0PiB8IG51bGwgPSBudWxsO1xyXG5jb25zdCBjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcyA9IG5ldyBNYXA8c3RyaW5nLCBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj4oKTtcclxuY29uc3QgcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMgPSBuZXcgTWFwPHN0cmluZywgUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj4+KCk7XHJcblxyXG5jb25zdCBzYWZlVGV4dCA9IHNhZmVUZXh0VHJhbnNmb3JtO1xyXG5cclxuY29uc3QgdG9OdWxsYWJsZU51bWJlciA9IHRvTnVsbGFibGVOdW1iZXJUcmFuc2Zvcm07XG5jb25zdCBpc05vbk5lZ2F0aXZlTnVtYmVyID0gaXNOb25OZWdhdGl2ZU51bWJlclRyYW5zZm9ybTtcbmNvbnN0IGlzUG9zaXRpdmVOdW1iZXIgPSBpc1Bvc2l0aXZlTnVtYmVyVHJhbnNmb3JtO1xuY29uc3QgdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGUgPSB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZVRyYW5zZm9ybTtcbmNvbnN0IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlID0gdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGVUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlID0gbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGVUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpc3RHYXN0b1R5cGUgPSBub3JtYWxpemVUaWNrZXRMaXN0R2FzdG9UeXBlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1cyA9IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVPcHRpb25hbEFwaURhdGUgPSBub3JtYWxpemVPcHRpb25hbEFwaURhdGVUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZSA9IG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdERhdGUgPSBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZVRyYW5zZm9ybTtcclxuY29uc3QgdG9OdWxsYWJsZUJvb2wgPSB0b051bGxhYmxlQm9vbFRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRQcm9jZXNzZWRCeUFJID0gbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRQcm9jZXNzZWRCeUFJVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVFeHBlbnNlU2hlZXRMaXN0U3RhdHVzRmlsdGVyID0gbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlclRyYW5zZm9ybTtcclxuY29uc3QgdG9GbGFnQm9vbCA9IHRvRmxhZ0Jvb2xUcmFuc2Zvcm07XHJcblxyXG5jb25zdCByZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUgPSAoKTogRXhwZW5zZVdpbmRvd1J1bnRpbWUgPT4ge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4ge307XHJcbiAgcmV0dXJuIHdpbmRvdyBhcyB1bmtub3duIGFzIEV4cGVuc2VXaW5kb3dSdW50aW1lO1xyXG59O1xyXG5cclxuY29uc3Qgc2FuaXRpemVIZWFkZXJzID0gKGhlYWRlcnM6IEhlYWRlcnNJbml0IHwgdW5kZWZpbmVkKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9PiB7XHJcbiAgaWYgKCFoZWFkZXJzKSByZXR1cm4ge307XHJcblxyXG4gIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xyXG4gICAgY29uc3QgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XHJcbiAgICBoZWFkZXJzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcclxuICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIGlmIChBcnJheS5pc0FycmF5KGhlYWRlcnMpKSB7XHJcbiAgICByZXR1cm4gaGVhZGVycy5yZWR1Y2U8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4oKGFjYywgW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgIGFjY1tTdHJpbmcoa2V5KV0gPSBTdHJpbmcodmFsdWUpO1xyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwge30pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGhlYWRlcnMpLnJlZHVjZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PigoYWNjLCBba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSByZXR1cm4gYWNjO1xyXG4gICAgYWNjW2tleV0gPSBTdHJpbmcodmFsdWUpO1xyXG4gICAgcmV0dXJuIGFjYztcclxuICB9LCB7fSk7XHJcbn07XHJcblxyXG5jb25zdCBnZXRIZWFkZXJWYWx1ZSA9IChoZWFkZXJzOiBIZWFkZXJzSW5pdCB8IHVuZGVmaW5lZCwga2V5OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRLZXkgPSBrZXkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHNhbml0aXplSGVhZGVycyhoZWFkZXJzKSk7XHJcbiAgY29uc3QgbWF0Y2ggPSBlbnRyaWVzLmZpbmQoKFtoZWFkZXJLZXldKSA9PiBoZWFkZXJLZXkudHJpbSgpLnRvTG93ZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRLZXkpO1xyXG4gIHJldHVybiBzYWZlVGV4dChtYXRjaD8uWzFdKTtcclxufTtcclxuXHJcbmNvbnN0IHJlbW92ZUhlYWRlclZhbHVlID0gKGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sIGtleTogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEtleSA9IGtleS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICBjb25zdCB0b0RlbGV0ZSA9IE9iamVjdC5rZXlzKGhlYWRlcnMpLmZpbmQoKGhlYWRlcktleSkgPT4gaGVhZGVyS2V5LnRyaW0oKS50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkS2V5KTtcclxuICBpZiAoIXRvRGVsZXRlKSByZXR1cm47XHJcbiAgZGVsZXRlIGhlYWRlcnNbdG9EZWxldGVdO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplQXhVc2VySWRIZWFkZXIgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBzYWZlVGV4dCh2YWx1ZSk7XHJcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gXCJcIjtcclxuICBpZiAoL14tXFxkKyQvLnRlc3Qobm9ybWFsaXplZCkpIHtcclxuICAgIHJldHVybiBub3JtYWxpemVkO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbGFiZWxTZXBhcmF0b3IgPSBub3JtYWxpemVkLmluZGV4T2YoXCIgLSBcIik7XHJcbiAgaWYgKGxhYmVsU2VwYXJhdG9yID4gMCkge1xyXG4gICAgcmV0dXJuIHNhZmVUZXh0KG5vcm1hbGl6ZWQuc2xpY2UoMCwgbGFiZWxTZXBhcmF0b3IpKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVkO1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZUJlYXJlclRva2VuID0gKGhlYWRlcnM6IEhlYWRlcnNJbml0IHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBhdXRob3JpemF0aW9uID0gZ2V0SGVhZGVyVmFsdWUoaGVhZGVycywgXCJBdXRob3JpemF0aW9uXCIpO1xyXG4gIGlmICghYXV0aG9yaXphdGlvbikgcmV0dXJuIFwiXCI7XHJcblxyXG4gIGlmICgvXmJlYXJlclxccysvaS50ZXN0KGF1dGhvcml6YXRpb24pKSB7XHJcbiAgICByZXR1cm4gYXV0aG9yaXphdGlvbi5yZXBsYWNlKC9eYmVhcmVyXFxzKy9pLCBcIlwiKS50cmltKCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYXV0aG9yaXphdGlvbi50cmltKCk7XHJcbn07XHJcblxyXG5jb25zdCByZWFkV2luZG93QXV0aFNlZWQgPSAoKTogUGFydGlhbDxFeHBlbnNlQXBpQXV0aFNlZWQ+ID0+IHtcclxuICBjb25zdCBydW50aW1lV2luZG93ID0gcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lKCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0b2tlbjogc2FmZVRleHQocnVudGltZVdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXHJcbiAgICBlbnRyYU9pZDogc2FmZVRleHQocnVudGltZVdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXHJcbiAgICBhcHBDb2RlOiBzYWZlVGV4dChydW50aW1lV2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxyXG4gICAgc3RyaWN0QXBpUm91dGVzOiB0b0ZsYWdCb29sKHJ1bnRpbWVXaW5kb3cuX19JTkRfRVhQRU5TRV9TVFJJQ1RfQVBJX18pID09PSB0cnVlLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCB0cnlQYXJzZUpzb24gPSAocmF3OiBzdHJpbmcpOiB1bmtub3duIHwgbnVsbCA9PiB7XHJcbiAgaWYgKCFyYXcgfHwgIXJhdy50cmltKCkpIHJldHVybiBudWxsO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShyYXcpO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlID0gPFQ+KHZhbHVlOiBUKTogVCA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHZhbHVlKSkgYXMgVDtcclxufTtcclxuXHJcbmNvbnN0IHJlYWRSdW50aW1lU3RyaWN0QXBpRmxhZyA9ICgpOiBib29sZWFuID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGZhbHNlO1xyXG4gIGNvbnN0IHJ1bnRpbWVXaW5kb3cgPSByZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUoKTtcclxuXHJcbiAgY29uc3QgZXhwbGljaXRXaW5kb3dGbGFnID0gdG9GbGFnQm9vbChydW50aW1lV2luZG93Ll9fSU5EX0VYUEVOU0VfU1RSSUNUX0FQSV9fKTtcclxuICByZXR1cm4gZXhwbGljaXRXaW5kb3dGbGFnID09PSB0cnVlO1xyXG59O1xyXG5cclxuY29uc3QgcmVhZFdpbmRvd1NlbGVjdGVkQ29tcGFueSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBzYWZlVGV4dChyZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUoKS5fX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18pLnRvVXBwZXJDYXNlKCk7XHJcbn07XHJcblxyXG4vLyBDcmVhdGVzIG9uZSBzdGFuZGFyZCBhYm9ydCBlcnJvciB3aXRob3V0IGNhbmNlbGxpbmcgdGhlIHNoYXJlZCB1bmRlcmx5aW5nIHJlcXVlc3QuXHJcbmNvbnN0IGNyZWF0ZUV4cGVuc2VBYm9ydEVycm9yID0gKCk6IERPTUV4Y2VwdGlvbiA9PiB7XHJcbiAgcmV0dXJuIG5ldyBET01FeGNlcHRpb24oXCJBYm9ydGVkXCIsIFwiQWJvcnRFcnJvclwiKTtcclxufTtcclxuXHJcbi8vIExldHMgb25lIGNhbGxlciBzdG9wIHdhaXRpbmcgb24gc2hhcmVkIGNvbnRleHQgcmVzb2x1dGlvbiB3aXRob3V0IGFib3J0aW5nIG90aGVyIGNvbnN1bWVycy5cclxuY29uc3Qgd2FpdEZvckFib3J0YWJsZUV4cGVuc2VSZXN1bHQgPSBhc3luYyA8VD4ocHJvbWlzZTogUHJvbWlzZTxUPiwgc2lnbmFsPzogQWJvcnRTaWduYWwpOiBQcm9taXNlPFQ+ID0+IHtcclxuICBpZiAoIXNpZ25hbCkgcmV0dXJuIHByb21pc2U7XHJcbiAgaWYgKHNpZ25hbC5hYm9ydGVkKSB7XHJcbiAgICB0aHJvdyBjcmVhdGVFeHBlbnNlQWJvcnRFcnJvcigpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGNvbnN0IGhhbmRsZUFib3J0ID0gKCkgPT4ge1xyXG4gICAgICBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGhhbmRsZUFib3J0KTtcclxuICAgICAgcmVqZWN0KGNyZWF0ZUV4cGVuc2VBYm9ydEVycm9yKCkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzaWduYWwuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGhhbmRsZUFib3J0LCB7IG9uY2U6IHRydWUgfSk7XHJcbiAgICBwcm9taXNlLnRoZW4oXHJcbiAgICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgaGFuZGxlQWJvcnQpO1xyXG4gICAgICAgIHJlc29sdmUodmFsdWUpO1xyXG4gICAgICB9LFxyXG4gICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGhhbmRsZUFib3J0KTtcclxuICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRDb250ZXh0S2V5ID0gKHNlZWQ6IEV4cGVuc2VBcGlBdXRoU2VlZCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIGAke3NlZWQudG9rZW59fCR7c2VlZC5lbnRyYU9pZH18JHtzZWVkLmFwcENvZGV9fCR7cmVhZFdpbmRvd1NlbGVjdGVkQ29tcGFueSgpfWA7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZEV4cGVuc2VIZWFkZXJzID0gKFxyXG4gIGNvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMsXHJcbiAgaW5jbHVkZUpzb24gPSBmYWxzZSxcclxuICBpbmNsdWRlQXhVc2VySWQgPSB0cnVlXHJcbik6IEhlYWRlcnNJbml0ID0+IHtcclxuICBjb25zdCBiYXNlID0gc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpO1xyXG4gIGNvbnN0IG1lcmdlZDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHsgLi4uYmFzZSB9O1xyXG5cclxuICBpZiAoc2FmZVRleHQoY29udGV4dC50b2tlbikpIHtcclxuICAgIG1lcmdlZC5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke2NvbnRleHQudG9rZW59YDtcclxuICB9XHJcblxyXG4gIGlmIChzYWZlVGV4dChjb250ZXh0LmNvbXBhbnlJZCkpIHtcclxuICAgIG1lcmdlZFtcIlgtSU5ELUNvbXBhbnlcIl0gPSBjb250ZXh0LmNvbXBhbnlJZDtcclxuICB9XHJcblxyXG4gIGlmIChpbmNsdWRlQXhVc2VySWQpIHtcclxuICAgIGNvbnN0IHJlcXVlc3RBeFVzZXJJZCA9IGdldEhlYWRlclZhbHVlKG9wdGlvbnM/LmhlYWRlcnMsIFwiWC1JTkQtQXhVc2VySWRcIik7XHJcbiAgICBjb25zdCBvdmVycmlkZUF4VXNlcklkID0gZ2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSgpO1xyXG4gICAgY29uc3QgcmVzb2x2ZWRBeFVzZXJJZCA9IHNhZmVUZXh0KHJlcXVlc3RBeFVzZXJJZCB8fCBvdmVycmlkZUF4VXNlcklkIHx8IGNvbnRleHQuYXhVc2VySWQpO1xyXG4gICAgaWYgKHJlc29sdmVkQXhVc2VySWQpIHtcclxuICAgICAgbWVyZ2VkW1wiWC1JTkQtQXhVc2VySWRcIl0gPSByZXNvbHZlZEF4VXNlcklkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVtb3ZlSGVhZGVyVmFsdWUobWVyZ2VkLCBcIlgtSU5ELUF4VXNlcklkXCIpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShtZXJnZWQsIFwiWC1JTkQtQXhVc2VySWRcIik7XHJcbiAgfVxyXG5cclxuICBpZiAoaW5jbHVkZUpzb24pIHtcclxuICAgIG1lcmdlZFtcIkNvbnRlbnQtVHlwZVwiXSA9IFwiYXBwbGljYXRpb24vanNvblwiO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1lcmdlZDtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkRXhwZW5zZUZvcm1IZWFkZXJzID0gKGNvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0LCBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogSGVhZGVyc0luaXQgPT4ge1xyXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMoYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCBmYWxzZSkpO1xyXG4gIHJlbW92ZUhlYWRlclZhbHVlKGhlYWRlcnMsIFwiQ29udGVudC1UeXBlXCIpO1xyXG4gIHJldHVybiBoZWFkZXJzO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRDb250ZXh0SGVhZGVycyA9ICh0b2tlbjogc3RyaW5nLCBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogSGVhZGVyc0luaXQgPT4ge1xyXG4gIGNvbnN0IGJhc2UgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XHJcbiAgY29uc3QgbWVyZ2VkOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICAgLi4uYmFzZSxcclxuICAgIC4uLkpTT05fSEVBREVSUyxcclxuICB9O1xyXG5cclxuICBpZiAoc2FmZVRleHQodG9rZW4pKSB7XHJcbiAgICBtZXJnZWQuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1lcmdlZDtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVBdXRoVG9rZW4gPSAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgdG9rZW5Gcm9tSGVhZGVycyA9IHJlc29sdmVCZWFyZXJUb2tlbihvcHRpb25zPy5oZWFkZXJzKTtcclxuICBjb25zdCB3aW5kb3dTZWVkID0gcmVhZFdpbmRvd0F1dGhTZWVkKCk7XHJcbiAgcmV0dXJuIHNhZmVUZXh0KHRva2VuRnJvbUhlYWRlcnMgfHwgcnVudGltZUF1dGhTZWVkLnRva2VuIHx8IHdpbmRvd1NlZWQudG9rZW4pO1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZUF1dGhTZWVkID0gKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBFeHBlbnNlQXBpQXV0aFNlZWQgPT4ge1xyXG4gIGNvbnN0IHdpbmRvd1NlZWQgPSByZWFkV2luZG93QXV0aFNlZWQoKTtcclxuICBjb25zdCB0b2tlbiA9IHJlc29sdmVBdXRoVG9rZW4ob3B0aW9ucyk7XHJcbiAgY29uc3QgZW50cmFPaWQgPSBzYWZlVGV4dChydW50aW1lQXV0aFNlZWQuZW50cmFPaWQgfHwgd2luZG93U2VlZC5lbnRyYU9pZCk7XHJcbiAgY29uc3QgYXBwQ29kZSA9IHNhZmVUZXh0KHJ1bnRpbWVBdXRoU2VlZC5hcHBDb2RlIHx8IHdpbmRvd1NlZWQuYXBwQ29kZSB8fCBERUZBVUxUX0FQUF9DT0RFKSB8fCBERUZBVUxUX0FQUF9DT0RFO1xyXG4gIGNvbnN0IHN0cmljdEFwaVJvdXRlcyA9XHJcbiAgICB0eXBlb2YgcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcyA9PT0gXCJib29sZWFuXCJcclxuICAgICAgPyBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzXHJcbiAgICAgIDogKHdpbmRvd1NlZWQuc3RyaWN0QXBpUm91dGVzID09PSB0cnVlKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHRva2VuLFxyXG4gICAgZW50cmFPaWQsXHJcbiAgICBhcHBDb2RlLFxyXG4gICAgc3RyaWN0QXBpUm91dGVzLFxyXG4gIH07XHJcbn07XHJcblxyXG50eXBlIFJhd0VudHJhQ29udGV4dENvbXBhbnkgPSB7XHJcbiAgQ29tcGFueUlkPzogdW5rbm93bjtcclxuICBjb21wYW55SWQ/OiB1bmtub3duO1xyXG4gIElzRGVmYXVsdD86IHVua25vd247XHJcbiAgaXNEZWZhdWx0PzogdW5rbm93bjtcclxuICBBbGxvd1NlbGZNYW5hZ2VtZW50PzogdW5rbm93bjtcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50PzogdW5rbm93bjtcclxuICBDcm1Vc2VySWQ/OiB1bmtub3duO1xyXG4gIGNybVVzZXJJZD86IHVua25vd247XHJcbn07XHJcblxyXG50eXBlIE5vcm1hbGl6ZWRFbnRyYUNvbnRleHRDb21wYW55ID0ge1xyXG4gIGNvbXBhbnlJZDogc3RyaW5nO1xyXG4gIGlzRGVmYXVsdDogYm9vbGVhbjtcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xyXG4gIGNybVVzZXJJZDogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBSYXdFbnRyYUNvbnRleHRIZWFkZXIgPSB7XHJcbiAgQXhVc2VySWQ/OiB1bmtub3duO1xyXG4gIGF4VXNlcklkPzogdW5rbm93bjtcclxuICBEZWZhdWx0Q29tcGFueT86IHVua25vd247XHJcbiAgZGVmYXVsdENvbXBhbnk/OiB1bmtub3duO1xyXG4gIERlZmF1bHRDdXJyZW5jeUNvZGU/OiB1bmtub3duO1xyXG4gIGRlZmF1bHRDdXJyZW5jeUNvZGU/OiB1bmtub3duO1xyXG59O1xyXG5cclxudHlwZSBSYXdFbnRyYUNvbnRleHRJdGVtID0ge1xyXG4gIEhlYWRlcj86IFJhd0VudHJhQ29udGV4dEhlYWRlcjtcclxuICBoZWFkZXI/OiBSYXdFbnRyYUNvbnRleHRIZWFkZXI7XHJcbiAgQ29tcGFuaWVzPzogdW5rbm93bjtcclxuICBjb21wYW5pZXM/OiB1bmtub3duO1xyXG59O1xyXG5cclxuLy8gTWFwcyBvbmUgRW50cmEgY29tcGFueSBpdGVtIHRvIHRoZSBmcm9udGVuZC1zYWZlIHNoYXBlIHVzZWQgYnkgY29udGV4dCBjb25zdW1lcnMuXHJcbmNvbnN0IG1hcEVudHJhQ29udGV4dENvbXBhbnkgPSAoaXRlbTogdW5rbm93bik6IE5vcm1hbGl6ZWRFbnRyYUNvbnRleHRDb21wYW55IHwgbnVsbCA9PiB7XHJcbiAgaWYgKCFpdGVtIHx8IHR5cGVvZiBpdGVtICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgcmF3ID0gaXRlbSBhcyBSYXdFbnRyYUNvbnRleHRDb21wYW55O1xyXG4gIGNvbnN0IGNvbXBhbnlJZCA9IHNhZmVUZXh0KHJhdy5Db21wYW55SWQgPz8gcmF3LmNvbXBhbnlJZCk7XHJcbiAgaWYgKCFjb21wYW55SWQpIHJldHVybiBudWxsO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY29tcGFueUlkLFxyXG4gICAgaXNEZWZhdWx0OiB0b0ZsYWdCb29sKHJhdy5Jc0RlZmF1bHQgPz8gcmF3LmlzRGVmYXVsdCkgPT09IHRydWUsXHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50OiB0b0ZsYWdCb29sKHJhdy5BbGxvd1NlbGZNYW5hZ2VtZW50ID8/IHJhdy5hbGxvd1NlbGZNYW5hZ2VtZW50KSA9PT0gdHJ1ZSxcclxuICAgIGNybVVzZXJJZDogc2FmZVRleHQocmF3LkNybVVzZXJJZCA/PyByYXcuY3JtVXNlcklkKSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgdmFsaWRhdGVDb250ZXh0UmVzcG9uc2UgPSAocmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RW50cmFDb250ZXh0RHRvPik6IEV4cGVuc2VBcGlDb250ZXh0ID0+IHtcclxuICBjb25zdCByYXdSZXNwb25zZSA9IHJlc3BvbnNlIGFzIHtcclxuICAgIFN1Y2Nlc3M/OiB1bmtub3duO1xyXG4gICAgc3VjY2Vzcz86IHVua25vd247XHJcbiAgICBNZXNzYWdlPzogdW5rbm93bjtcclxuICAgIG1lc3NhZ2U/OiB1bmtub3duO1xyXG4gICAgSXRlbXM/OiB1bmtub3duO1xyXG4gICAgaXRlbXM/OiB1bmtub3duO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGlzU3VjY2VzcyA9IHRvRmxhZ0Jvb2wocmF3UmVzcG9uc2UuU3VjY2VzcyA/PyByYXdSZXNwb25zZS5zdWNjZXNzKTtcclxuICBpZiAoaXNTdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3Ioc2FmZVRleHQocmF3UmVzcG9uc2UuTWVzc2FnZSA/PyByYXdSZXNwb25zZS5tZXNzYWdlKSB8fCBcIkNvdWxkIG5vdCBsb2FkIEVudHJhIGNvbnRleHQuXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHJhd1Jlc3BvbnNlLkl0ZW1zKVxyXG4gICAgPyByYXdSZXNwb25zZS5JdGVtc1xyXG4gICAgOiAoQXJyYXkuaXNBcnJheShyYXdSZXNwb25zZS5pdGVtcykgPyByYXdSZXNwb25zZS5pdGVtcyA6IFtdKTtcclxuICBjb25zdCBmaXJzdCA9IGl0ZW1zWzBdIGFzIFJhd0VudHJhQ29udGV4dEl0ZW0gfCB1bmRlZmluZWQ7XHJcbiAgY29uc3QgaGVhZGVyID0gZmlyc3Q/LkhlYWRlciA/PyBmaXJzdD8uaGVhZGVyO1xyXG4gIGlmICghZmlyc3QgfHwgIWhlYWRlcikge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJDb3VsZCBub3QgbG9hZCBFbnRyYSBjb250ZXh0LlwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGF4VXNlcklkID0gc2FmZVRleHQoaGVhZGVyLkF4VXNlcklkID8/IGhlYWRlci5heFVzZXJJZCk7XHJcbiAgY29uc3QgZGVmYXVsdENvbXBhbnkgPSBzYWZlVGV4dChoZWFkZXIuRGVmYXVsdENvbXBhbnkgPz8gaGVhZGVyLmRlZmF1bHRDb21wYW55KTtcclxuICBjb25zdCBkZWZhdWx0Q3VycmVuY3lDb2RlID0gc2FmZVRleHQoaGVhZGVyLkRlZmF1bHRDdXJyZW5jeUNvZGUgPz8gaGVhZGVyLmRlZmF1bHRDdXJyZW5jeUNvZGUpO1xyXG4gIGNvbnN0IGNvbXBhbmllc1JhdyA9IEFycmF5LmlzQXJyYXkoZmlyc3QuQ29tcGFuaWVzKVxyXG4gICAgPyBmaXJzdC5Db21wYW5pZXNcclxuICAgIDogKEFycmF5LmlzQXJyYXkoZmlyc3QuY29tcGFuaWVzKSA/IGZpcnN0LmNvbXBhbmllcyA6IFtdKTtcclxuICBjb25zdCBjb21wYW5pZXMgPSBjb21wYW5pZXNSYXdcclxuICAgIC5tYXAoKGl0ZW0pID0+IG1hcEVudHJhQ29udGV4dENvbXBhbnkoaXRlbSkpXHJcbiAgICAuZmlsdGVyKChpdGVtKTogaXRlbSBpcyBOb3JtYWxpemVkRW50cmFDb250ZXh0Q29tcGFueSA9PiAhIWl0ZW0pO1xyXG4gIGNvbnN0IHNlbGVjdGVkQ29tcGFueUlkID0gcmVhZFdpbmRvd1NlbGVjdGVkQ29tcGFueSgpO1xyXG4gIGNvbnN0IHNlbGVjdGVkQ29tcGFueU1hdGNoID0gc2VsZWN0ZWRDb21wYW55SWRcclxuICAgID8gY29tcGFuaWVzLmZpbmQoKGl0ZW0pID0+IHNhZmVUZXh0KGl0ZW0uY29tcGFueUlkKS50b1VwcGVyQ2FzZSgpID09PSBzZWxlY3RlZENvbXBhbnlJZClcclxuICAgIDogbnVsbDtcclxuXHJcbiAgLy8gTmV2ZXIgZmFsbCBiYWNrIHRvIGEgZGlmZmVyZW50IGNvbXBhbnkgd2hlbiB0aGUgdXNlciBzZWxlY3RlZCBvbmUgZXhwbGljaXRseS5cclxuICBpZiAoc2VsZWN0ZWRDb21wYW55SWQgJiYgIXNlbGVjdGVkQ29tcGFueU1hdGNoKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcclxuICAgICAgaW5kVChcclxuICAgICAgICBcIkV4cGVuc2VfQ29udGV4dF9TZWxlY3RlZENvbXBhbnlVbmF2YWlsYWJsZVwiLFxyXG4gICAgICAgIFwiVGhlIHNlbGVjdGVkIGNvbXBhbnkgaXMgbm8gbG9uZ2VyIGF2YWlsYWJsZS4gUGxlYXNlIGNob29zZSBpdCBhZ2FpbiBmcm9tIHRoZSBtYWluIG1lbnUuXCJcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGZhbGxiYWNrQ29tcGFueSA9IHNhZmVUZXh0KGNvbXBhbmllcy5maW5kKChpdGVtKSA9PiBpdGVtLmlzRGVmYXVsdCk/LmNvbXBhbnlJZCk7XHJcbiAgY29uc3QgY29tcGFueUlkID1cclxuICAgIHNlbGVjdGVkQ29tcGFueU1hdGNoPy5jb21wYW55SWQgfHwgcmVzb2x2ZUVmZmVjdGl2ZUNvbXBhbnlJZChcIlwiLCBjb21wYW5pZXMsIGRlZmF1bHRDb21wYW55IHx8IGZhbGxiYWNrQ29tcGFueSk7XHJcbiAgY29uc3Qgc2VsZWN0ZWRDb21wYW55ID1cclxuICAgIHNlbGVjdGVkQ29tcGFueU1hdGNoIHx8IGNvbXBhbmllcy5maW5kKChpdGVtKSA9PiBzYWZlVGV4dChpdGVtLmNvbXBhbnlJZCkgPT09IGNvbXBhbnlJZCkgfHwgY29tcGFuaWVzWzBdO1xyXG4gIGNvbnN0IGFsbG93U2VsZk1hbmFnZW1lbnQgPSBzZWxlY3RlZENvbXBhbnk/LmFsbG93U2VsZk1hbmFnZW1lbnQgPT09IHRydWU7XHJcbiAgY29uc3QgY3JtVXNlcklkID0gc2FmZVRleHQoc2VsZWN0ZWRDb21wYW55Py5jcm1Vc2VySWQpO1xyXG5cclxuICBpZiAoIWF4VXNlcklkIHx8ICFjb21wYW55SWQpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiQ291bGQgbm90IHJlc29sdmUgRW50cmEgY29tcGFueSBjb250ZXh0LlwiKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0b2tlbjogXCJcIixcclxuICAgIGNvbXBhbnlJZCxcclxuICAgIGF4VXNlcklkLFxyXG4gICAgY3JtVXNlcklkLFxyXG4gICAgZGVmYXVsdEN1cnJlbmN5Q29kZSxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0ID0gYXN5bmMgKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBQcm9taXNlPEV4cGVuc2VBcGlDb250ZXh0PiA9PiB7XHJcbiAgY29uc3Qgc2VlZCA9IHJlc29sdmVBdXRoU2VlZChvcHRpb25zKTtcclxuICBjb25zdCBjb250ZXh0S2V5ID0gYnVpbGRDb250ZXh0S2V5KHNlZWQpO1xyXG4gIGNvbnN0IHsgc2lnbmFsLCAuLi5iYXNlT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgaWYgKGNhY2hlZENvbnRleHQgJiYgY2FjaGVkQ29udGV4dEtleSA9PT0gY29udGV4dEtleSkge1xyXG4gICAgcmV0dXJuIHdhaXRGb3JBYm9ydGFibGVFeHBlbnNlUmVzdWx0KFByb21pc2UucmVzb2x2ZShjYWNoZWRDb250ZXh0KSwgc2lnbmFsKTtcclxuICB9XHJcblxyXG4gIGlmICghY29udGV4dFByb21pc2UgfHwgY2FjaGVkQ29udGV4dEtleSAhPT0gY29udGV4dEtleSkge1xyXG4gICAgY2FjaGVkQ29udGV4dEtleSA9IGNvbnRleHRLZXk7XHJcbiAgICBjb25zdCBzaGFyZWRDb250ZXh0UHJvbWlzZSA9IChhc3luYyAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbnRleHRQYXlsb2FkOiBFbnRyYUNvbnRleHRSZXF1ZXN0ID0ge1xyXG4gICAgICAgIGFwcENvZGU6IHNlZWQuYXBwQ29kZSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChzYWZlVGV4dChzZWVkLmVudHJhT2lkKSkge1xyXG4gICAgICAgIGNvbnRleHRQYXlsb2FkLmVudHJhT2lkID0gc2VlZC5lbnRyYU9pZDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY29udGV4dFJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RW50cmFDb250ZXh0RHRvPj4oXCIvYXBpL2F1dGgvZW50cmEvY29udGV4dFwiLCB7XHJcbiAgICAgICAgLi4uYmFzZU9wdGlvbnMsXHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiBidWlsZENvbnRleHRIZWFkZXJzKHNlZWQudG9rZW4sIGJhc2VPcHRpb25zKSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjb250ZXh0UGF5bG9hZCksXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgcmVzb2x2ZWQgPSB2YWxpZGF0ZUNvbnRleHRSZXNwb25zZShjb250ZXh0UmVzcG9uc2UpO1xyXG4gICAgICBjb25zdCBuZXh0Q29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQgPSB7XHJcbiAgICAgICAgLi4ucmVzb2x2ZWQsXHJcbiAgICAgICAgdG9rZW46IHNlZWQudG9rZW4sXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIHdpbmRvdy5fX0lORF9BTExPV19TRUxGX01BTkFHRU1FTlRfXyA9IG5leHRDb250ZXh0LmFsbG93U2VsZk1hbmFnZW1lbnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNhY2hlZENvbnRleHQgPSBuZXh0Q29udGV4dDtcclxuICAgICAgcmV0dXJuIG5leHRDb250ZXh0O1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICBjb250ZXh0UHJvbWlzZSA9IHNoYXJlZENvbnRleHRQcm9taXNlO1xyXG4gICAgdm9pZCBzaGFyZWRDb250ZXh0UHJvbWlzZS5maW5hbGx5KCgpID0+IHtcclxuICAgICAgaWYgKGNvbnRleHRQcm9taXNlID09PSBzaGFyZWRDb250ZXh0UHJvbWlzZSkge1xyXG4gICAgICAgIGNvbnRleHRQcm9taXNlID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYXdhaXQgd2FpdEZvckFib3J0YWJsZUV4cGVuc2VSZXN1bHQoY29udGV4dFByb21pc2UsIHNpZ25hbCk7XHJcbn07XHJcblxyXG4vLyBFeHBvc2VzIHJlc29sdmVkIEVudHJhIGNvbnRleHQgdmFsdWVzIG5lZWRlZCBieSBHYXN0b3MgVUkgbWFuYWdlbWVudCBzdGF0ZS5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VBcGlDb250ZXh0U25hcHNob3QgPSBhc3luYyAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IFByb21pc2U8RXhwZW5zZUFwaUNvbnRleHRTbmFwc2hvdD4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICByZXR1cm4ge1xyXG4gICAgY29tcGFueUlkOiBzYWZlVGV4dChjb250ZXh0LmNvbXBhbnlJZCkudG9VcHBlckNhc2UoKSxcclxuICAgIGF4VXNlcklkOiBzYWZlVGV4dChjb250ZXh0LmF4VXNlcklkKSxcclxuICAgIGNybVVzZXJJZDogc2FmZVRleHQoY29udGV4dC5jcm1Vc2VySWQpLFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudDogY29udGV4dC5hbGxvd1NlbGZNYW5hZ2VtZW50ID09PSB0cnVlLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlID0gbm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplQXBpUmVzcG9uc2UgPSBub3JtYWxpemVBcGlSZXNwb25zZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZSA9IG5vcm1hbGl6ZVRpY2tldFF1aWNrQ3JlYXRlUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZVN1Ym9yZGluYXRlc1BhZ2VkUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlID0gbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpbmtCdWxrUmVzcG9uc2UgPSBub3JtYWxpemVUaWNrZXRMaW5rQnVsa1Jlc3BvbnNlVHJhbnNmb3JtO1xyXG5cclxuY29uc3QgbG9va3NMaWtlSHRtbERvY3VtZW50ID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgcmF3ID0gc2FmZVRleHQodmFsdWUpLnRvTG93ZXJDYXNlKCk7XHJcbiAgcmV0dXJuIHJhdy5zdGFydHNXaXRoKFwiPCFkb2N0eXBlIGh0bWxcIikgfHwgcmF3LnN0YXJ0c1dpdGgoXCI8aHRtbFwiKTtcclxufTtcclxuXHJcbmNvbnN0IGlzQXBpUm91dGVVbmF2YWlsYWJsZSA9IChlcnJvcjogdW5rbm93bik6IGVycm9yIGlzIEFwaUZldGNoRXJyb3IgPT4ge1xyXG4gIGlmICghKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikpIHJldHVybiBmYWxzZTtcclxuICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDQgfHwgZXJyb3Iuc3RhdHVzID09PSA0MDUpIHJldHVybiB0cnVlO1xyXG4gIHJldHVybiBlcnJvci5zdGF0dXMgPT09IHVuZGVmaW5lZCAmJiBsb29rc0xpa2VIdG1sRG9jdW1lbnQoZXJyb3IucmVzcG9uc2VCb2R5KTtcclxufTtcclxuXHJcbmNvbnN0IGlzU3RyaWN0QXBpUm91dGVzRW5hYmxlZCA9ICgpOiBib29sZWFuID0+IHtcclxuICBpZiAodHlwZW9mIHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXMgPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICByZXR1cm4gcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcztcclxuICB9XHJcblxyXG4gIHJldHVybiByZWFkUnVudGltZVN0cmljdEFwaUZsYWcoKTtcclxufTtcclxuXHJcbmNvbnN0IHNob3VsZFVzZUxlZ2FjeUZhbGxiYWNrID0gKGVycm9yOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKGlzU3RyaWN0QXBpUm91dGVzRW5hYmxlZCgpKSByZXR1cm4gZmFsc2U7XHJcbiAgcmV0dXJuIGlzQXBpUm91dGVVbmF2YWlsYWJsZShlcnJvcik7XHJcbn07XHJcblxyXG5jb25zdCB0b0xlZ2FjeUxpc3RSZXF1ZXN0UGF5bG9hZCA9IChwYXlsb2FkOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBmaWx0ZXI6IHNhZmVUZXh0KHBheWxvYWQuZmlsdGVyKSxcclxuICAgIGhvamFHYXN0b3NJZDogc2FmZVRleHQocGF5bG9hZC5maWx0ZXIpLFxyXG4gICAgYmlsbGVkTW9kZTogcGF5bG9hZC5iaWxsZWRNb2RlID8/IDIsXHJcbiAgICBmcm9tRGF0ZTogc2FmZVRleHQocGF5bG9hZC5jcmVhdGVkRGF0ZUZyb20pLFxyXG4gICAgdG9EYXRlOiBzYWZlVGV4dChwYXlsb2FkLmNyZWF0ZWREYXRlVG8pLFxyXG4gICAgcHJvamVjdElkOiBzYWZlVGV4dChwYXlsb2FkLnByb2pJZCksXHJcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KHBheWxvYWQuY3VycmVuY3lDb2RlKSxcclxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlcihwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyksXHJcbiAgICBpbmNsdWRlU3Vib3JkaW5hdGVzOiBwYXlsb2FkLmluY2x1ZGVTdWJvcmRpbmF0ZXMgPT09IHRydWUsXHJcbiAgICBwYWdlOiBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZC5wYWdlKSAmJiBwYXlsb2FkLnBhZ2UgPiAwID8gcGF5bG9hZC5wYWdlIDogMSxcclxuICAgIHBhZ2VTaXplOiBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZC5wYWdlU2l6ZSkgJiYgcGF5bG9hZC5wYWdlU2l6ZSA+IDAgPyBwYXlsb2FkLnBhZ2VTaXplIDogNTAsXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IG1hcExlZ2FjeUxpc3RJdGVtVG9BcGlMaXN0SXRlbSA9IChpdGVtOiBMZWdhY3lFeHBlbnNlTGlzdEl0ZW0pOiBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIEhvamFHYXN0b3NJZDogc2FmZVRleHQoaXRlbS5ob2phR2FzdG9zSWQpLFxyXG4gICAgRGVzY3JpcHRpb246IHNhZmVUZXh0KGl0ZW0uZGVzY3JpcHRpb24pLFxyXG4gICAgRXhwZW5zZVNoZWV0U3RhdHVzOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uZXhwZW5zZVNoZWV0U3RhdHVzKSxcclxuICAgIEVzdGFkb0NvbWVudGFyaW9zOiBzYWZlVGV4dChpdGVtLmVzdGFkb0NvbWVudGFyaW9zKSB8fCBudWxsLFxyXG4gICAgVXNlcklkOiBzYWZlVGV4dChpdGVtLnVzZXJJZCkgfHwgbnVsbCxcclxuICAgIFVzZXJOYW1lOiBzYWZlVGV4dChpdGVtLnVzZXJOYW1lKSB8fCBudWxsLFxyXG4gICAgVm91Y2hlcjogc2FmZVRleHQoaXRlbS52b3VjaGVyKSxcclxuICAgIFByb2pJZDogc2FmZVRleHQoaXRlbS5wcm9qSWQpLFxyXG4gICAgQ3VycmVuY3lDb2RlOiBzYWZlVGV4dChpdGVtLmN1cnJlbmN5Q29kZSksXHJcbiAgICBUb3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihpdGVtLnRvdGFsQW1vdW50ID8/IGl0ZW0udG90YWxBbW91bnRNU1QpLFxyXG4gICAgRXhjaFJhdGU6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5leGNoUmF0ZSksXHJcbiAgICBFeGNoYW5nZVJhdGVNb2RlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uZXhjaGFuZ2VSYXRlTW9kZSksXHJcbiAgICBDcmVhdGVkRGF0ZTogc2FmZVRleHQoaXRlbS5jcmVhdGVkRGF0ZSkgfHwgbnVsbCxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgbWFwTGVnYWN5TGlzdFJlc3BvbnNlID0gKFxyXG4gIGxlZ2FjeTogTGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZSxcclxuICBmYWxsYmFja1BhZ2U6IG51bWJlcixcclxuICBmYWxsYmFja1BhZ2VTaXplOiBudW1iZXJcclxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz4gPT4ge1xyXG4gIGNvbnN0IGxlZ2FjeUl0ZW1zID0gQXJyYXkuaXNBcnJheShsZWdhY3k/Lml0ZW1zKSA/IGxlZ2FjeS5pdGVtcyA6IFtdO1xyXG4gIGNvbnN0IG1hcHBlZEl0ZW1zID0gbGVnYWN5SXRlbXMubWFwKChlbnRyeSkgPT4gbWFwTGVnYWN5TGlzdEl0ZW1Ub0FwaUxpc3RJdGVtKGVudHJ5KSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBTdWNjZXNzOiBsZWdhY3kuc3VjY2VzcyAhPT0gZmFsc2UsXHJcbiAgICBNZXNzYWdlOiBzYWZlVGV4dChsZWdhY3kubWVzc2FnZSkgfHwgXCJPS1wiLFxyXG4gICAgVG90YWw6IHRvTnVsbGFibGVOdW1iZXIobGVnYWN5LnRvdGFsKSA/PyBtYXBwZWRJdGVtcy5sZW5ndGgsXHJcbiAgICBQYWdlOiB0b051bGxhYmxlTnVtYmVyKGxlZ2FjeS5wYWdlKSA/PyBmYWxsYmFja1BhZ2UsXHJcbiAgICBQYWdlU2l6ZTogdG9OdWxsYWJsZU51bWJlcihsZWdhY3kucGFnZVNpemUpID8/IGZhbGxiYWNrUGFnZVNpemUsXHJcbiAgICBJdGVtczogbWFwcGVkSXRlbXMsXHJcbiAgICBUcmFjZUlkOiB1bmRlZmluZWQsXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIFNldHMgcnVudGltZSBhdXRoIGlucHV0cyB1c2VkIHRvIHJlc29sdmUgRW50cmEgY29udGV4dCBhbmQgbWFuZGF0b3J5IGV4cGVuc2UgaGVhZGVycy5cclxuZXhwb3J0IGNvbnN0IGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoID0gKHNlZWQ6IFBhcnRpYWw8RXhwZW5zZUFwaUF1dGhTZWVkPik6IHZvaWQgPT4ge1xyXG4gIGNvbnN0IHN0cmljdEZyb21TZWVkID0gdG9GbGFnQm9vbChzZWVkLnN0cmljdEFwaVJvdXRlcyk7XHJcbiAgY29uc3Qgc3RyaWN0RnJvbVJ1bnRpbWUgPVxyXG4gICAgdHlwZW9mIHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXMgPT09IFwiYm9vbGVhblwiID8gcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcyA6IHJlYWRSdW50aW1lU3RyaWN0QXBpRmxhZygpO1xyXG5cclxuICBydW50aW1lQXV0aFNlZWQgPSB7XHJcbiAgICAuLi5ydW50aW1lQXV0aFNlZWQsXHJcbiAgICB0b2tlbjogc2FmZVRleHQoc2VlZC50b2tlbiB8fCBydW50aW1lQXV0aFNlZWQudG9rZW4pLFxyXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHNlZWQuZW50cmFPaWQgfHwgcnVudGltZUF1dGhTZWVkLmVudHJhT2lkKSxcclxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHNlZWQuYXBwQ29kZSB8fCBydW50aW1lQXV0aFNlZWQuYXBwQ29kZSB8fCBERUZBVUxUX0FQUF9DT0RFKSxcclxuICAgIHN0cmljdEFwaVJvdXRlczogc3RyaWN0RnJvbVNlZWQgPz8gc3RyaWN0RnJvbVJ1bnRpbWUsXHJcbiAgfTtcclxuXHJcbiAgY2FjaGVkQ29udGV4dCA9IG51bGw7XHJcbiAgY2FjaGVkQ29udGV4dEtleSA9IFwiXCI7XHJcbiAgY29udGV4dFByb21pc2UgPSBudWxsO1xyXG4gIGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLmNsZWFyKCk7XHJcbiAgcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuY2xlYXIoKTtcclxufTtcclxuXHJcbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9saXN0IGl0ZW0gY29udHJhY3QgdG8gbGlzdCBjYXJkIFVJIG1vZGVsLlxyXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmQgPSBtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZENvcmU7XHJcblxyXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0gaGVhZGVyIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxyXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0SGVhZGVyID0gbWFwRXhwZW5zZVNoZWV0SGVhZGVyQ29yZTtcclxuXHJcbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfSBsaW5lIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxyXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0TGluZSA9IG1hcEV4cGVuc2VTaGVldExpbmVDb3JlO1xyXG5cclxuZXhwb3J0IHR5cGUgRXhwZW5zZVNoZWV0TGlzdEZldGNoQ2FwdHVyZSA9IHtcclxuICByZXF1ZXN0OiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdDtcclxuICByZXNwb25zZTogRXhwZW5zZVNoZWV0TGlzdFJlc3BvbnNlRW52ZWxvcGU7XHJcbiAgYXhVc2VySWRPdmVycmlkZTogc3RyaW5nIHwgbnVsbDtcclxuICBzb3VyY2U6IFwiYXBpXCIgfCBcImxlZ2FjeVwiO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgRXhwZW5zZVNoZWV0TGlzdEZldGNoT3B0aW9ucyA9IEFwaUZldGNoT3B0aW9ucyAmIHtcclxuICBheFVzZXJJZE92ZXJyaWRlPzogc3RyaW5nO1xyXG4gIG9uUmVxdWVzdFByZXBhcmVkPzogKHJlcXVlc3Q6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0KSA9PiB2b2lkO1xyXG4gIG9uQ2FwdHVyZT86IChjYXB0dXJlOiBFeHBlbnNlU2hlZXRMaXN0RmV0Y2hDYXB0dXJlKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgRXhwZW5zZVRpY2tldExpc3RGZXRjaE9wdGlvbnMgPSBBcGlGZXRjaE9wdGlvbnMgJiB7XHJcbiAgYXhVc2VySWRPdmVycmlkZT86IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEV4cGVuc2VTaGVldExpc3RTb3VyY2VKc29uT3B0aW9ucyA9IEFwaUZldGNoT3B0aW9ucyAmIHtcclxuICBheFVzZXJJZE92ZXJyaWRlPzogc3RyaW5nO1xyXG4gIHNlZWRSZXNwb25zZT86IEV4cGVuc2VTaGVldExpc3RSZXNwb25zZUVudmVsb3BlIHwgbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkVGlja2V0TGlzdEhlYWRlcnMgPSAoXHJcbiAgY29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQsXHJcbiAgb3B0aW9uczogQXBpRmV0Y2hPcHRpb25zIHwgdW5kZWZpbmVkLFxyXG4gIGF4VXNlcklkT3ZlcnJpZGU6IHN0cmluZyB8IHVuZGVmaW5lZFxyXG4pOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0+IHtcclxuICBjb25zdCBoZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSwgZmFsc2UpKTtcclxuICBjb25zdCBub3JtYWxpemVkT3ZlcnJpZGVBeFVzZXJJZCA9IG5vcm1hbGl6ZUF4VXNlcklkSGVhZGVyKGF4VXNlcklkT3ZlcnJpZGUpO1xyXG4gIGNvbnN0IHJlc29sdmVkQXhVc2VySWQgPSBzYWZlVGV4dChub3JtYWxpemVkT3ZlcnJpZGVBeFVzZXJJZCB8fCBjb250ZXh0LmF4VXNlcklkKTtcclxuICBpZiAocmVzb2x2ZWRBeFVzZXJJZCkge1xyXG4gICAgaGVhZGVyc1tcIlgtSU5ELUF4VXNlcklkXCJdID0gcmVzb2x2ZWRBeFVzZXJJZDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmVtb3ZlSGVhZGVyVmFsdWUoaGVhZGVycywgXCJYLUlORC1BeFVzZXJJZFwiKTtcclxuICB9XHJcbiAgcmV0dXJuIGhlYWRlcnM7XHJcbn07XHJcblxyXG4vLyBMb2FkcyB0aGUgZXhwZW5zZSBzaGVldCBsaXN0IGZyb20gL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9saXN0LlxyXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXRMaXN0ID0gYXN5bmMgKFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBFeHBlbnNlU2hlZXRMaXN0RmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz4+ID0+IHtcclxuICBjb25zdCB7IGF4VXNlcklkT3ZlcnJpZGUsIG9uUmVxdWVzdFByZXBhcmVkLCBvbkNhcHR1cmUsIC4uLmJhc2VPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xyXG4gIGNvbnN0IHJhd0NyZWF0ZWREYXRlRnJvbSA9IHNhZmVUZXh0KHBheWxvYWQ/LmNyZWF0ZWREYXRlRnJvbSk7XHJcbiAgY29uc3QgcmF3Q3JlYXRlZERhdGVUbyA9IHNhZmVUZXh0KHBheWxvYWQ/LmNyZWF0ZWREYXRlVG8pO1xyXG4gIGNvbnN0IGNyZWF0ZWREYXRlRnJvbSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdDcmVhdGVkRGF0ZUZyb20pO1xyXG4gIGNvbnN0IGNyZWF0ZWREYXRlVG8gPSBub3JtYWxpemVPcHRpb25hbEFwaURhdGUocmF3Q3JlYXRlZERhdGVUbyk7XHJcblxyXG4gIGlmIChyYXdDcmVhdGVkRGF0ZUZyb20gJiYgIWNyZWF0ZWREYXRlRnJvbSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgfVxyXG4gIGlmIChyYXdDcmVhdGVkRGF0ZVRvICYmICFjcmVhdGVkRGF0ZVRvKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCA9IHtcclxuICAgIC4uLnBheWxvYWQsXHJcbiAgICBjcmVhdGVkRGF0ZUZyb20sXHJcbiAgICBjcmVhdGVkRGF0ZVRvLFxyXG4gICAgZXhwZW5zZVNoZWV0U3RhdHVzOiBub3JtYWxpemVFeHBlbnNlU2hlZXRMaXN0U3RhdHVzRmlsdGVyKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzKSxcclxuICAgIGluY2x1ZGVTdWJvcmRpbmF0ZXM6IHBheWxvYWQuaW5jbHVkZVN1Ym9yZGluYXRlcyA9PT0gdHJ1ZSxcclxuICB9O1xyXG4gIGNvbnN0IHNlcmlhbGl6ZWRQYXlsb2FkID0gY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlKHNhZmVQYXlsb2FkKTtcclxuXHJcbiAgb25SZXF1ZXN0UHJlcGFyZWQ/LihzZXJpYWxpemVkUGF5bG9hZCk7XHJcblxyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChiYXNlT3B0aW9ucyk7XHJcbiAgY29uc3QgbGlzdEhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMoYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBiYXNlT3B0aW9ucywgdHJ1ZSwgZmFsc2UpKTtcclxuICBjb25zdCBub3JtYWxpemVkT3ZlcnJpZGVBeFVzZXJJZCA9IG5vcm1hbGl6ZUF4VXNlcklkSGVhZGVyKGF4VXNlcklkT3ZlcnJpZGUpO1xyXG4gIGNvbnN0IHJlc29sdmVkQXhVc2VySWQgPSBzYWZlVGV4dChub3JtYWxpemVkT3ZlcnJpZGVBeFVzZXJJZCB8fCBjb250ZXh0LmF4VXNlcklkKTtcclxuICBpZiAocmVzb2x2ZWRBeFVzZXJJZCkge1xyXG4gICAgbGlzdEhlYWRlcnNbXCJYLUlORC1BeFVzZXJJZFwiXSA9IHJlc29sdmVkQXhVc2VySWQ7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJlbW92ZUhlYWRlclZhbHVlKGxpc3RIZWFkZXJzLCBcIlgtSU5ELUF4VXNlcklkXCIpO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvbGlzdFwiLCB7XHJcbiAgICAgIC4uLmJhc2VPcHRpb25zLFxyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBoZWFkZXJzOiBsaXN0SGVhZGVycyxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxyXG4gICAgfSk7XHJcblxyXG4gICAgb25DYXB0dXJlPy4oe1xyXG4gICAgICByZXF1ZXN0OiBzZXJpYWxpemVkUGF5bG9hZCxcclxuICAgICAgcmVzcG9uc2U6IGNsb25lSnNvbkNvbXBhdGlibGVWYWx1ZShyZXNwb25zZSksXHJcbiAgICAgIGF4VXNlcklkT3ZlcnJpZGU6IG5vcm1hbGl6ZWRPdmVycmlkZUF4VXNlcklkIHx8IG51bGwsXHJcbiAgICAgIHNvdXJjZTogXCJhcGlcIixcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGlmICghc2hvdWxkVXNlTGVnYWN5RmFsbGJhY2soZXJyb3IpKSB7XHJcbiAgICAgIHRocm93IGVycm9yO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxlZ2FjeVJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPExlZ2FjeUV4cGVuc2VMaXN0UmVzcG9uc2U+KFwiL0dhc3Rvcy9MaXN0RXhwZW5zZVNoZWV0c1wiLCB7XHJcbiAgICAgIC4uLmJhc2VPcHRpb25zLFxyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgLi4uc2FuaXRpemVIZWFkZXJzKGJhc2VPcHRpb25zPy5oZWFkZXJzKSxcclxuICAgICAgICAuLi5KU09OX0hFQURFUlMsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHRvTGVnYWN5TGlzdFJlcXVlc3RQYXlsb2FkKHNhZmVQYXlsb2FkKSksXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBtYXBwZWQgPSBtYXBMZWdhY3lMaXN0UmVzcG9uc2UoXHJcbiAgICAgIGxlZ2FjeVJlc3BvbnNlLFxyXG4gICAgICBOdW1iZXIuaXNGaW5pdGUoc2FmZVBheWxvYWQucGFnZSkgJiYgc2FmZVBheWxvYWQucGFnZSA+IDAgPyBzYWZlUGF5bG9hZC5wYWdlIDogMSxcclxuICAgICAgTnVtYmVyLmlzRmluaXRlKHNhZmVQYXlsb2FkLnBhZ2VTaXplKSAmJiBzYWZlUGF5bG9hZC5wYWdlU2l6ZSA+IDAgPyBzYWZlUGF5bG9hZC5wYWdlU2l6ZSA6IDUwXHJcbiAgICApO1xyXG5cclxuICAgIG9uQ2FwdHVyZT8uKHtcclxuICAgICAgcmVxdWVzdDogc2VyaWFsaXplZFBheWxvYWQsXHJcbiAgICAgIHJlc3BvbnNlOiBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUobWFwcGVkKSxcclxuICAgICAgYXhVc2VySWRPdmVycmlkZTogbm9ybWFsaXplZE92ZXJyaWRlQXhVc2VySWQgfHwgbnVsbCxcclxuICAgICAgc291cmNlOiBcImxlZ2FjeVwiLFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlKG1hcHBlZCk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplUG9zaXRpdmVJbnRlZ2VyID0gKHZhbHVlOiB1bmtub3duLCBmYWxsYmFja1ZhbHVlOiBudW1iZXIpOiBudW1iZXIgPT4ge1xyXG4gIGNvbnN0IHBhcnNlZFZhbHVlID0gTnVtYmVyKHZhbHVlKTtcclxuICBpZiAoTnVtYmVyLmlzRmluaXRlKHBhcnNlZFZhbHVlKSAmJiBwYXJzZWRWYWx1ZSA+IDApIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKHBhcnNlZFZhbHVlKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBmYWxsYmFja1ZhbHVlO1xyXG59O1xyXG5cclxuLy8gUmVidWlsZHMgb25lIGZ1bGwgbGlzdCBlbnZlbG9wZSBmb3IgdGhlIGFzc2lzdGFudCBieSBsb2FkaW5nIGV2ZXJ5IHBhZ2Ugb2YgdGhlIGFjdGl2ZSBxdWVyeS5cclxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0TGlzdFNvdXJjZUpzb24gPSBhc3luYyAoXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEV4cGVuc2VTaGVldExpc3RTb3VyY2VKc29uT3B0aW9uc1xyXG4pOiBQcm9taXNlPEV4cGVuc2VTaGVldExpc3RSZXNwb25zZUVudmVsb3BlPiA9PiB7XHJcbiAgY29uc3QgeyBzZWVkUmVzcG9uc2UsIC4uLmJhc2VPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xyXG4gIGNvbnN0IGZhbGxiYWNrUGFnZSA9IG5vcm1hbGl6ZVBvc2l0aXZlSW50ZWdlcihwYXlsb2FkPy5wYWdlLCAxKTtcclxuICBjb25zdCBmYWxsYmFja1BhZ2VTaXplID0gbm9ybWFsaXplUG9zaXRpdmVJbnRlZ2VyKHBheWxvYWQ/LnBhZ2VTaXplLCA1MCk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFNlZWRSZXNwb25zZSA9IHNlZWRSZXNwb25zZSA/IG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlKGNsb25lSnNvbkNvbXBhdGlibGVWYWx1ZShzZWVkUmVzcG9uc2UpKSA6IG51bGw7XHJcbiAgY29uc3QgaW5pdGlhbFJlc3BvbnNlID0gbm9ybWFsaXplZFNlZWRSZXNwb25zZSA/PyAoYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRMaXN0KHBheWxvYWQsIGJhc2VPcHRpb25zKSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEluaXRpYWxSZXNwb25zZSA9IG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlKGNsb25lSnNvbkNvbXBhdGlibGVWYWx1ZShpbml0aWFsUmVzcG9uc2UpKTtcclxuXHJcbiAgaWYgKG5vcm1hbGl6ZWRJbml0aWFsUmVzcG9uc2UuU3VjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFxyXG4gICAgICBzYWZlVGV4dChub3JtYWxpemVkSW5pdGlhbFJlc3BvbnNlLk1lc3NhZ2UpIHx8IFwiQ291bGQgbm90IGxvYWQgdGhlIGZ1bGwgZXhwZW5zZSBzaGVldCBxdWVyeS5cIlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHRvdGFsUmVjb3Jkc1JhdyA9IE51bWJlcihub3JtYWxpemVkSW5pdGlhbFJlc3BvbnNlLlRvdGFsKTtcclxuICBjb25zdCB0b3RhbFJlY29yZHMgPVxyXG4gICAgTnVtYmVyLmlzRmluaXRlKHRvdGFsUmVjb3Jkc1JhdykgJiYgdG90YWxSZWNvcmRzUmF3ID49IDBcclxuICAgICAgPyBNYXRoLmZsb29yKHRvdGFsUmVjb3Jkc1JhdylcclxuICAgICAgOiBub3JtYWxpemVkSW5pdGlhbFJlc3BvbnNlLkl0ZW1zLmxlbmd0aDtcclxuICBjb25zdCBlZmZlY3RpdmVQYWdlU2l6ZSA9IG5vcm1hbGl6ZVBvc2l0aXZlSW50ZWdlcihub3JtYWxpemVkSW5pdGlhbFJlc3BvbnNlLlBhZ2VTaXplLCBmYWxsYmFja1BhZ2VTaXplKTtcclxuICBjb25zdCB0b3RhbFBhZ2VzID0gTWF0aC5tYXgoMSwgTWF0aC5jZWlsKHRvdGFsUmVjb3JkcyAvIE1hdGgubWF4KDEsIGVmZmVjdGl2ZVBhZ2VTaXplKSkpO1xyXG4gIGNvbnN0IGN1cnJlbnRQYWdlID0gTWF0aC5taW4oXHJcbiAgICB0b3RhbFBhZ2VzLFxyXG4gICAgbm9ybWFsaXplUG9zaXRpdmVJbnRlZ2VyKG5vcm1hbGl6ZWRJbml0aWFsUmVzcG9uc2UuUGFnZSA/PyBmYWxsYmFja1BhZ2UsIGZhbGxiYWNrUGFnZSlcclxuICApO1xyXG5cclxuICBpZiAodG90YWxQYWdlcyA8PSAxKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAuLi5ub3JtYWxpemVkSW5pdGlhbFJlc3BvbnNlLFxyXG4gICAgICBUb3RhbDogdG90YWxSZWNvcmRzLFxyXG4gICAgICBQYWdlOiAxLFxyXG4gICAgICBQYWdlU2l6ZTogZWZmZWN0aXZlUGFnZVNpemUsXHJcbiAgICAgIEl0ZW1zOiBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUobm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5JdGVtcyksXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaXRlbXNCeVBhZ2UgPSBuZXcgTWFwPG51bWJlciwgRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG9bXT4oKTtcclxuICBpdGVtc0J5UGFnZS5zZXQoY3VycmVudFBhZ2UsIGNsb25lSnNvbkNvbXBhdGlibGVWYWx1ZShub3JtYWxpemVkSW5pdGlhbFJlc3BvbnNlLkl0ZW1zKSk7XHJcblxyXG4gIGZvciAobGV0IHBhZ2VOdW1iZXIgPSAxOyBwYWdlTnVtYmVyIDw9IHRvdGFsUGFnZXM7IHBhZ2VOdW1iZXIgKz0gMSkge1xyXG4gICAgaWYgKHBhZ2VOdW1iZXIgPT09IGN1cnJlbnRQYWdlKSB7XHJcbiAgICAgIGNvbnRpbnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBhZ2VSZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0TGlzdChcclxuICAgICAge1xyXG4gICAgICAgIC4uLnBheWxvYWQsXHJcbiAgICAgICAgcGFnZTogcGFnZU51bWJlcixcclxuICAgICAgICBwYWdlU2l6ZTogZWZmZWN0aXZlUGFnZVNpemUsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJhc2VPcHRpb25zXHJcbiAgICApO1xyXG5cclxuICAgIGlmIChwYWdlUmVzcG9uc2UuU3VjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXHJcbiAgICAgICAgc2FmZVRleHQocGFnZVJlc3BvbnNlLk1lc3NhZ2UpIHx8IGBDb3VsZCBub3QgbG9hZCBleHBlbnNlIHNoZWV0IHBhZ2UgJHtwYWdlTnVtYmVyfS5gXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgaXRlbXNCeVBhZ2Uuc2V0KHBhZ2VOdW1iZXIsIGNsb25lSnNvbkNvbXBhdGlibGVWYWx1ZShwYWdlUmVzcG9uc2UuSXRlbXMpKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGFsbEl0ZW1zOiBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0b1tdID0gW107XHJcbiAgZm9yIChsZXQgcGFnZU51bWJlciA9IDE7IHBhZ2VOdW1iZXIgPD0gdG90YWxQYWdlczsgcGFnZU51bWJlciArPSAxKSB7XHJcbiAgICBjb25zdCBwYWdlSXRlbXMgPSBpdGVtc0J5UGFnZS5nZXQocGFnZU51bWJlcik7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocGFnZUl0ZW1zKSB8fCBwYWdlSXRlbXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGNvbnRpbnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGFsbEl0ZW1zLnB1c2goLi4ucGFnZUl0ZW1zKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAuLi5ub3JtYWxpemVkSW5pdGlhbFJlc3BvbnNlLFxyXG4gICAgVG90YWw6IHRvdGFsUmVjb3JkcyxcclxuICAgIFBhZ2U6IDEsXHJcbiAgICBQYWdlU2l6ZTogZWZmZWN0aXZlUGFnZVNpemUsXHJcbiAgICBJdGVtczogYWxsSXRlbXMsXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIExvYWRzIG9uZSBleHBlbnNlIHNoZWV0IGRldGFpbCBmcm9tIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0uXHJcbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldERldGFpbCA9IGFzeW5jIChcclxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXREZXRhaWxEdG8+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldERldGFpbER0bz4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9YCwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIFJlYWRzIGF2YWlsYWJsZSBjdXJyZW5jaWVzIGZyb20gL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9jdXJyZW5jaWVzLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVNoZWV0Q3VycmVuY2llcyA9IGFzeW5jIChcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+ID0+IHtcclxuICBsZXQgY29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQgfCBudWxsID0gbnVsbDtcclxuICB0cnkge1xyXG4gICAgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBpZiAoIShlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpKSB7XHJcbiAgICAgIHRocm93IGVycm9yO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgY29tcGFueUlkID0gc2FmZVRleHQoY29udGV4dD8uY29tcGFueUlkIHx8IHJlYWRXaW5kb3dTZWxlY3RlZENvbXBhbnkoKSkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBjYWNoZUtleSA9IGNvbXBhbnlJZCB8fCBcIi1cIjtcclxuXHJcbiAgaWYgKGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLmhhcyhjYWNoZUtleSkpIHtcclxuICAgIHJldHVybiBjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcy5nZXQoY2FjaGVLZXkpIGFzIEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+O1xyXG4gIH1cclxuXHJcbiAgaWYgKHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLmhhcyhjYWNoZUtleSkpIHtcclxuICAgIHJldHVybiBwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5nZXQoY2FjaGVLZXkpIGFzIFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+O1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVxdWVzdFByb21pc2UgPSAoYXN5bmMgKCkgPT4ge1xyXG4gICAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcclxuICAgIHJlbW92ZUhlYWRlclZhbHVlKGhlYWRlcnMsIFwiQXV0aG9yaXphdGlvblwiKTtcclxuICAgIHJlbW92ZUhlYWRlclZhbHVlKGhlYWRlcnMsIFwiWC1JTkQtQXhVc2VySWRcIik7XHJcblxyXG4gICAgaWYgKGNvbXBhbnlJZCkge1xyXG4gICAgICBoZWFkZXJzW1wiWC1JTkQtQ29tcGFueVwiXSA9IGNvbXBhbnlJZDtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj4oXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL2N1cnJlbmNpZXNcIiwge1xyXG4gICAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICAgIGhlYWRlcnMsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3Qgbm9ybWFsaXplZFJlc3BvbnNlID0gbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcclxuICAgICAgaWYgKG5vcm1hbGl6ZWRSZXNwb25zZS5TdWNjZXNzKSB7XHJcbiAgICAgICAgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuc2V0KGNhY2hlS2V5LCBub3JtYWxpemVkUmVzcG9uc2UpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbm9ybWFsaXplZFJlc3BvbnNlO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgaWYgKCFzaG91bGRVc2VMZWdhY3lGYWxsYmFjayhlcnJvcikpIHtcclxuICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgbGVnYWN5TGlzdFJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPExlZ2FjeUV4cGVuc2VMaXN0UmVzcG9uc2U+KFwiL0dhc3Rvcy9MaXN0RXhwZW5zZVNoZWV0c1wiLCB7XHJcbiAgICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgIC4uLnNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKSxcclxuICAgICAgICAgIC4uLkpTT05fSEVBREVSUyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgIGZpbHRlcjogXCJcIixcclxuICAgICAgICAgIGhvamFHYXN0b3NJZDogXCJcIixcclxuICAgICAgICAgIGJpbGxlZE1vZGU6IDIsXHJcbiAgICAgICAgICBmcm9tRGF0ZTogXCJcIixcclxuICAgICAgICAgIHRvRGF0ZTogXCJcIixcclxuICAgICAgICAgIHByb2plY3RJZDogXCJcIixcclxuICAgICAgICAgIGN1cnJlbmN5Q29kZTogXCJcIixcclxuICAgICAgICAgIHBhZ2U6IDEsXHJcbiAgICAgICAgICBwYWdlU2l6ZTogMjAwLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IHNlZW5Db2RlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xyXG4gICAgICBjb25zdCBzb3VyY2VJdGVtcyA9IEFycmF5LmlzQXJyYXkobGVnYWN5TGlzdFJlc3BvbnNlLml0ZW1zKSA/IGxlZ2FjeUxpc3RSZXNwb25zZS5pdGVtcyA6IFtdO1xyXG4gICAgICBjb25zdCBmYWxsYmFja0l0ZW1zOiBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0b1tdID0gc291cmNlSXRlbXNcclxuICAgICAgICAubWFwKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnkuY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpKVxyXG4gICAgICAgIC5maWx0ZXIoKGNvZGUpID0+ICEhY29kZSlcclxuICAgICAgICAuZmlsdGVyKChjb2RlKSA9PiB7XHJcbiAgICAgICAgICBpZiAoc2VlbkNvZGVzLmhhcyhjb2RlKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgc2VlbkNvZGVzLmFkZChjb2RlKTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLm1hcCgoY29kZSkgPT4gKHtcclxuICAgICAgICAgIEN1cnJlbmN5Q29kZTogY29kZSxcclxuICAgICAgICAgIEN1cnJlbmN5Q29kZUlTTzogY29kZSxcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICBjb25zdCBmYWxsYmFja1Jlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPiA9IHtcclxuICAgICAgICBTdWNjZXNzOiBsZWdhY3lMaXN0UmVzcG9uc2Uuc3VjY2VzcyAhPT0gZmFsc2UsXHJcbiAgICAgICAgTWVzc2FnZTogc2FmZVRleHQobGVnYWN5TGlzdFJlc3BvbnNlLm1lc3NhZ2UpIHx8IFwiT0tcIixcclxuICAgICAgICBUb3RhbDogZmFsbGJhY2tJdGVtcy5sZW5ndGgsXHJcbiAgICAgICAgUGFnZTogMSxcclxuICAgICAgICBQYWdlU2l6ZTogZmFsbGJhY2tJdGVtcy5sZW5ndGgsXHJcbiAgICAgICAgSXRlbXM6IGZhbGxiYWNrSXRlbXMsXHJcbiAgICAgICAgVHJhY2VJZDogdW5kZWZpbmVkLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgY29uc3Qgbm9ybWFsaXplZEZhbGxiYWNrID0gbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlKGZhbGxiYWNrUmVzcG9uc2UpO1xyXG4gICAgICBpZiAobm9ybWFsaXplZEZhbGxiYWNrLlN1Y2Nlc3MpIHtcclxuICAgICAgICBjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcy5zZXQoY2FjaGVLZXksIG5vcm1hbGl6ZWRGYWxsYmFjayk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBub3JtYWxpemVkRmFsbGJhY2s7XHJcbiAgICB9XHJcbiAgfSkoKTtcclxuXHJcbiAgcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuc2V0KGNhY2hlS2V5LCByZXF1ZXN0UHJvbWlzZSk7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBhd2FpdCByZXF1ZXN0UHJvbWlzZTtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuZGVsZXRlKGNhY2hlS2V5KTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBSZWFkcyBhdmFpbGFibGUgc3Vib3JkaW5hdGVzIGZyb20gL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9zdWJvcmRpbmF0ZXMuXHJcbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZXMgPSBhc3luYyAoXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG8+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIC8vIFN1Ym9yZGluYXRlcyBtdXN0IGFsd2F5cyByZXNvbHZlIGZyb20gdGhlIGxvZ2dlZCBjb250ZXh0IHVzZXIsIG5vdCBmcm9tIGFjdGluZy11c2VyIG92ZXJyaWRlcy5cclxuICBjb25zdCBoZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgZmFsc2UsIGZhbHNlKSk7XHJcbiAgY29uc3QgY29udGV4dEF4VXNlcklkID0gc2FmZVRleHQoY29udGV4dC5heFVzZXJJZCk7XHJcbiAgaWYgKGNvbnRleHRBeFVzZXJJZCkge1xyXG4gICAgaGVhZGVyc1tcIlgtSU5ELUF4VXNlcklkXCJdID0gY29udGV4dEF4VXNlcklkO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTx1bmtub3duPj4oXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL3N1Ym9yZGluYXRlc1wiLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgaGVhZGVycyxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZVN1Ym9yZGluYXRlc1BhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gRXhwb3NlcyB0aGUgZGVmYXVsdCBjdXJyZW5jeSByZXNvbHZlZCBmcm9tIEVudHJhIGNvbnRleHQgZm9yIGluaXRpYWwgc2VsZWN0aW9ucy5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTaGVldERlZmF1bHRDdXJyZW5jeUNvZGUgPSBhc3luYyAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IFByb21pc2U8c3RyaW5nPiA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICAgIHJldHVybiBzYWZlVGV4dChjb250ZXh0LmRlZmF1bHRDdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCk7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9XHJcbn07XHJcblxyXG4vLyBSZWFkcyBleGNoYW5nZSByYXRlIGZyb20gL2FwaS9zeXN0ZW0vZXhjaGFuZ2UtcmF0ZS5cclxuZXhwb3J0IGNvbnN0IGdldEV4Y2hhbmdlUmF0ZSA9IGFzeW5jIChcclxuICBiYXNlQ3VycmVuY3k6IHN0cmluZyxcclxuICB0YXJnZXRDdXJyZW5jeTogc3RyaW5nLFxyXG4gIGRhdGU/OiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4Y2hhbmdlUmF0ZUR0bz4+ID0+IHtcclxuICBjb25zdCB0b2tlbiA9IHJlc29sdmVBdXRoVG9rZW4ob3B0aW9ucyk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSA9IHNhZmVUZXh0KGJhc2VDdXJyZW5jeSkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBub3JtYWxpemVkVGFyZ2V0Q3VycmVuY3kgPSBzYWZlVGV4dCh0YXJnZXRDdXJyZW5jeSkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBub3JtYWxpemVkRGF0ZSA9IHNhZmVUZXh0KGRhdGUpO1xyXG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xyXG5cclxuICBxdWVyeS5zZXQoXCJiYXNlQ3VycmVuY3lcIiwgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSk7XHJcbiAgcXVlcnkuc2V0KFwidGFyZ2V0Q3VycmVuY3lcIiwgbm9ybWFsaXplZFRhcmdldEN1cnJlbmN5KTtcclxuICBpZiAobm9ybWFsaXplZERhdGUpIHtcclxuICAgIHF1ZXJ5LnNldChcImRhdGVcIiwgbm9ybWFsaXplZERhdGUpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcclxuICBpZiAodG9rZW4pIHtcclxuICAgIGhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeGNoYW5nZVJhdGVEdG8+PihgL2FwaS9zeXN0ZW0vZXhjaGFuZ2UtcmF0ZT8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgIGhlYWRlcnMsXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyBSZWFkcyBleGNoYW5nZSByYXRlIGZyb20gL2FwaS9zeXN0ZW0vZXhjaGFuZ2UtcmF0ZS9wdWJsaWMtZGlyZWN0LlxyXG5leHBvcnQgY29uc3QgZ2V0RXhjaGFuZ2VSYXRlUHVibGljRGlyZWN0ID0gYXN5bmMgKFxyXG4gIGJhc2VDdXJyZW5jeTogc3RyaW5nLFxyXG4gIHRhcmdldEN1cnJlbmN5OiBzdHJpbmcsXHJcbiAgZGF0ZT86IHN0cmluZyxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RXhjaGFuZ2VSYXRlRHRvPj4gPT4ge1xyXG4gIGNvbnN0IHRva2VuID0gcmVzb2x2ZUF1dGhUb2tlbihvcHRpb25zKTtcclxuICBjb25zdCBub3JtYWxpemVkQmFzZUN1cnJlbmN5ID0gc2FmZVRleHQoYmFzZUN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRUYXJnZXRDdXJyZW5jeSA9IHNhZmVUZXh0KHRhcmdldEN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWREYXRlID0gc2FmZVRleHQoZGF0ZSk7XHJcbiAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XHJcblxyXG4gIHF1ZXJ5LnNldChcImJhc2VDdXJyZW5jeVwiLCBub3JtYWxpemVkQmFzZUN1cnJlbmN5KTtcclxuICBxdWVyeS5zZXQoXCJ0YXJnZXRDdXJyZW5jeVwiLCBub3JtYWxpemVkVGFyZ2V0Q3VycmVuY3kpO1xyXG4gIGlmIChub3JtYWxpemVkRGF0ZSkge1xyXG4gICAgcXVlcnkuc2V0KFwiZGF0ZVwiLCBub3JtYWxpemVkRGF0ZSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBoZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpO1xyXG4gIGlmICh0b2tlbikge1xyXG4gICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke3Rva2VufWA7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4Y2hhbmdlUmF0ZUR0bz4+KGAvYXBpL3N5c3RlbS9leGNoYW5nZS1yYXRlL3B1YmxpYy1kaXJlY3Q/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICBoZWFkZXJzLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gUmVhZHMgZnVlbCBwcmljZSBwZXIga20gZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2Z1ZWwtcHJpY2Uta20uXHJcbmV4cG9ydCBjb25zdCBnZXRGdWVsUHJpY2VLbSA9IGFzeW5jIChcclxuICB0cmFuc0RhdGU6IHN0cmluZyxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RnVlbFByaWNlS21EdG8+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWREYXRlID0gbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlKHRyYW5zRGF0ZSk7XHJcbiAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XHJcblxyXG4gIHF1ZXJ5LnNldChcInRyYW5zRGF0ZVwiLCBub3JtYWxpemVkRGF0ZSk7XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEZ1ZWxQcmljZUttRHRvPj4oXHJcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9mdWVsLXByaWNlLWttPyR7cXVlcnkudG9TdHJpbmcoKX1gLFxyXG4gICAge1xyXG4gICAgICAuLi5vcHRpb25zLFxyXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIENyZWF0ZXMgYW4gZXhwZW5zZSBzaGVldCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzLlxyXG5leHBvcnQgY29uc3QgY3JlYXRlRXhwZW5zZVNoZWV0ID0gYXN5bmMgKFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldENyZWF0ZVJlc3BvbnNlRGF0YT4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3QgbW9kZSA9IHBheWxvYWQubW9kZSA/PyAwO1xyXG4gIGNvbnN0IGxpbmVzID0gQXJyYXkuaXNBcnJheShwYXlsb2FkLmxpbmVzKSA/IHBheWxvYWQubGluZXMgOiBbXTtcclxuICBjb25zdCBub3JtYWxpemVkTGluZXMgPSBsaW5lcy5tYXAoKGxpbmUpID0+ICh7XHJcbiAgICAuLi5saW5lLFxyXG4gICAgdHJhbnNEYXRlOiBub3JtYWxpemVSZXF1aXJlZEFwaURhdGUobGluZS50cmFuc0RhdGUpLFxyXG4gIH0pKTtcclxuICBjb25zdCBoYXNJbnZhbGlkTGluZVBheWxvYWQgPSBub3JtYWxpemVkTGluZXMuc29tZSgobGluZSkgPT4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgIXNhZmVUZXh0KGxpbmUudHJhbnNEYXRlKSB8fFxyXG4gICAgICAhTnVtYmVyLmlzSW50ZWdlcihOdW1iZXIobGluZS50eXBlVmFsdWUpKSB8fFxyXG4gICAgICBOdW1iZXIobGluZS50eXBlVmFsdWUpIDw9IDAgfHxcclxuICAgICAgIWlzUG9zaXRpdmVOdW1iZXIobGluZS5xdHkpIHx8XHJcbiAgICAgICFpc1Bvc2l0aXZlTnVtYmVyKGxpbmUucHJpY2UpXHJcbiAgICApO1xyXG4gIH0pO1xyXG5cclxuICBpZiAocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMgIT09IHVuZGVmaW5lZCAmJiAhaXNOb25OZWdhdGl2ZU51bWJlcihwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cykpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhwZW5zZVNoZWV0U3RhdHVzIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byAwLlwiKTtcclxuICB9XHJcblxyXG4gIGlmIChwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUgIT09IHVuZGVmaW5lZCAmJiAhaXNOb25OZWdhdGl2ZU51bWJlcihwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUpKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4Y2hhbmdlUmF0ZU1vZGUgbXVzdCBiZSBncmVhdGVyIG9yIGVxdWFsIHRvIDAuXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSAhPT0gdW5kZWZpbmVkICYmIHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzID09PSB1bmRlZmluZWQpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhjaGFuZ2VSYXRlTW9kZSByZXF1aXJlcyBleHBlbnNlU2hlZXRTdGF0dXMuXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGhhc0ludmFsaWRMaW5lUGF5bG9hZCkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJFYWNoIGxpbmUgcmVxdWlyZXMgdHJhbnNEYXRlLCB0eXBlVmFsdWUsIHF0eSA+IDAgYW5kIHByaWNlID4gMC5cIik7XHJcbiAgfVxyXG5cclxuICBpZiAobW9kZSA9PT0gMCkge1xyXG4gICAgaWYgKCFzYWZlVGV4dChwYXlsb2FkLmRlc2NyaXB0aW9uKSB8fCAhc2FmZVRleHQocGF5bG9hZC5jdXJyZW5jeUNvZGUpIHx8IGxpbmVzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJJbnZhbGlkIGNyZWF0ZSBwYXlsb2FkIGZvciBtb2RlIDAuXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKG1vZGUgPT09IDEpIHtcclxuICAgIGlmICghc2FmZVRleHQocGF5bG9hZC5kZXNjcmlwdGlvbikgfHwgIXNhZmVUZXh0KHBheWxvYWQuY3VycmVuY3lDb2RlKSkge1xyXG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkludmFsaWQgY3JlYXRlIHBheWxvYWQgZm9yIG1vZGUgMS5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxpbmVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJNb2RlIDEgcmVxdWlyZXMgbGluZXMgdG8gYmUgbnVsbCBvciBlbXB0eS5cIik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAobW9kZSA9PT0gMikge1xyXG4gICAgaWYgKCFzYWZlVGV4dChwYXlsb2FkLmV4aXN0aW5nSG9qYUdhc3Rvc0lkKSB8fCBsaW5lcy5sZW5ndGggPCAxKSB7XHJcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiSW52YWxpZCBjcmVhdGUgcGF5bG9hZCBmb3IgbW9kZSAyLlwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IG5vcm1hbGl6ZWRQYXlsb2FkOiBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0ID0ge1xyXG4gICAgLi4ucGF5bG9hZCxcclxuICAgIG1vZGUsXHJcbiAgICBleGlzdGluZ0hvamFHYXN0b3NJZDogc2FmZVRleHQocGF5bG9hZC5leGlzdGluZ0hvamFHYXN0b3NJZCkgfHwgdW5kZWZpbmVkLFxyXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KHBheWxvYWQuZGVzY3JpcHRpb24pIHx8IHVuZGVmaW5lZCxcclxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQocGF5bG9hZC5jdXJyZW5jeUNvZGUpIHx8IHVuZGVmaW5lZCxcclxuICAgIHByb2pJZDogc2FmZVRleHQocGF5bG9hZC5wcm9qSWQpIHx8IHVuZGVmaW5lZCxcclxuICAgIGxpbmVzOiBtb2RlID09PSAxID8gW10gOiBub3JtYWxpemVkTGluZXMsXHJcbiAgfTtcclxuICBjb25zdCBpbmNsdWRlQXhVc2VyT3ZlcnJpZGUgPSBtb2RlID09PSAyO1xyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRDcmVhdGVSZXNwb25zZURhdGE+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHNcIiwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAvLyBIZWFkZXIgY3JlYXRlIGZsb3dzIG11c3QgYWx3YXlzIHJ1biBpbiB0aGUgc2lnbmVkLWluIHVzZXIgY29udGV4dC5cclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSwgaW5jbHVkZUF4VXNlck92ZXJyaWRlKSxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5vcm1hbGl6ZWRQYXlsb2FkKSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIFVwZGF0ZXMgaGVhZGVyIGZpZWxkcyB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9LlxyXG5leHBvcnQgY29uc3QgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyID0gYXN5bmMgKFxyXG4gIGhvamFHYXN0b3NJZDogc3RyaW5nLFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldEhlYWRlclVwZGF0ZVJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPHsgSG9qYUdhc3Rvc0lkOiBzdHJpbmcgfT4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xyXG5cclxuICBpZiAocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMgIT09IHVuZGVmaW5lZCAmJiAhaXNOb25OZWdhdGl2ZU51bWJlcihwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cykpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhwZW5zZVNoZWV0U3RhdHVzIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byAwLlwiKTtcclxuICB9XHJcblxyXG4gIGlmIChwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUgIT09IHVuZGVmaW5lZCAmJiAhaXNOb25OZWdhdGl2ZU51bWJlcihwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUpKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4Y2hhbmdlUmF0ZU1vZGUgbXVzdCBiZSBncmVhdGVyIG9yIGVxdWFsIHRvIDAuXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8eyBIb2phR2FzdG9zSWQ6IHN0cmluZyB9Pj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH1gLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gRGVsZXRlcyBhIGZ1bGwgZXhwZW5zZSBzaGVldCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9L2xpbmVzLzA/ZGVsZXRlV2hvbGVTaGVldD10cnVlLlxyXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0ID0gYXN5bmMgKFxyXG4gIGhvamFHYXN0b3NJZDogc3RyaW5nLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxudWxsPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlU2hlZXRJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8bnVsbD4+KFxyXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH0vbGluZXMvMD9kZWxldGVNb2RlPTImZGVsZXRlV2hvbGVTaGVldD10cnVlYCxcclxuICAgIHtcclxuICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxyXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBVcGRhdGVzIG9uZSBleHBlbnNlIGxpbmUgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS9saW5lcy97bGluZVJlY0lkfS5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4cGVuc2VTaGVldExpbmUgPSBhc3luYyAoXHJcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXHJcbiAgbGluZVJlY0lkOiBzdHJpbmcsXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXNwb25zZURhdGE+PiA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFRyYW5zRGF0ZSA9IG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZShwYXlsb2FkLnRyYW5zRGF0ZSk7XHJcbiAgaWYgKFxyXG4gICAgIU51bWJlci5pc0ludGVnZXIoTnVtYmVyKHBheWxvYWQudHlwZVZhbHVlKSkgfHxcclxuICAgIE51bWJlcihwYXlsb2FkLnR5cGVWYWx1ZSkgPD0gMCB8fFxyXG4gICAgIWlzUG9zaXRpdmVOdW1iZXIocGF5bG9hZC5xdHkpIHx8XHJcbiAgICAhaXNQb3NpdGl2ZU51bWJlcihwYXlsb2FkLnByaWNlKVxyXG4gICkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJ0cmFuc0RhdGUsIHR5cGVWYWx1ZSwgcXR5ID4gMCBhbmQgcHJpY2UgPiAwIGFyZSByZXF1aXJlZC5cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHNhZmVMaW5lSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGxpbmVSZWNJZCB8fCBcIlwiKS50cmltKCkpO1xyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVzcG9uc2VEYXRhPj4oXHJcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy8ke3NhZmVTaGVldElkfS9saW5lcy8ke3NhZmVMaW5lSWR9YCxcclxuICAgIHtcclxuICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgLi4ucGF5bG9hZCxcclxuICAgICAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZWRUcmFuc0RhdGUsXHJcbiAgICAgIH0pLFxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBEZWxldGVzIG9uZSBleHBlbnNlIGxpbmUgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS9saW5lcy97bGluZVJlY0lkfT9kZWxldGVXaG9sZVNoZWV0PWZhbHNlLlxyXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0TGluZSA9IGFzeW5jIChcclxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcclxuICBsaW5lUmVjSWQ6IHN0cmluZyxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHNhZmVMaW5lSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGxpbmVSZWNJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+PihcclxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9L2xpbmVzLyR7c2FmZUxpbmVJZH0/ZGVsZXRlTW9kZT0wJmRlbGV0ZVdob2xlU2hlZXQ9ZmFsc2VgLFxyXG4gICAge1xyXG4gICAgICAuLi5vcHRpb25zLFxyXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUV4cGVuc2VTaGVldHNBc2tSZXNwb25zZSA9IChyZXNwb25zZTogRXhwZW5zZVNoZWV0c0Fza1Jlc3VsdCk6IEV4cGVuc2VTaGVldHNBc2tSZXN1bHQgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgY29uc3QgcmF3RGF0YSA9IG5vcm1hbGl6ZWQ/LkRhdGE7XHJcbiAgaWYgKCFyYXdEYXRhIHx8IHR5cGVvZiByYXdEYXRhICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAuLi5ub3JtYWxpemVkLFxyXG4gICAgICBNZXNzYWdlOiBzYW5pdGl6ZUFzc2lzdGFudFRleHQobm9ybWFsaXplZD8uTWVzc2FnZSksXHJcbiAgICAgIEh0dHBTdGF0dXM6IHR5cGVvZiByZXNwb25zZT8uSHR0cFN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IHJlc3BvbnNlLkh0dHBTdGF0dXMgOiB1bmRlZmluZWQsXHJcbiAgICAgIFJldHJ5QWZ0ZXI6IHNhZmVUZXh0KHJlc3BvbnNlPy5SZXRyeUFmdGVyKSB8fCBudWxsLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJhd1dhcm5pbmdzID1cclxuICAgIChyYXdEYXRhIGFzIHsgV2FybmluZ3M/OiB1bmtub3duOyB3YXJuaW5ncz86IHVua25vd24gfSkuV2FybmluZ3MgPz9cclxuICAgIChyYXdEYXRhIGFzIHsgd2FybmluZ3M/OiB1bmtub3duIH0pLndhcm5pbmdzO1xyXG4gIGNvbnN0IHJhd0ZpbHRlcnNBcHBsaWVkID1cclxuICAgIChyYXdEYXRhIGFzIHsgRmlsdGVyc0FwcGxpZWQ/OiB1bmtub3duOyBmaWx0ZXJzQXBwbGllZD86IHVua25vd24gfSkuRmlsdGVyc0FwcGxpZWQgPz9cclxuICAgIChyYXdEYXRhIGFzIHsgZmlsdGVyc0FwcGxpZWQ/OiB1bmtub3duIH0pLmZpbHRlcnNBcHBsaWVkO1xyXG5cclxuICBjb25zdCBpc0lnbm9yYWJsZUFzc2lzdGFudFdhcm5pbmcgPSAod2FybmluZzogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgICBjb25zdCBub3JtYWxpemVkV2FybmluZyA9IHNhbml0aXplQXNzaXN0YW50VGV4dCh3YXJuaW5nKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKCFub3JtYWxpemVkV2FybmluZykgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZWRXYXJuaW5nLmluY2x1ZGVzKFwic291cmNlanNvblwiKSAmJlxyXG4gICAgICAobm9ybWFsaXplZFdhcm5pbmcuaW5jbHVkZXMoXCJza2lwcGVkXCIpIHx8IG5vcm1hbGl6ZWRXYXJuaW5nLmluY2x1ZGVzKFwib21pdFwiKSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLm5vcm1hbGl6ZWQsXHJcbiAgICBNZXNzYWdlOiBzYW5pdGl6ZUFzc2lzdGFudFRleHQobm9ybWFsaXplZD8uTWVzc2FnZSksXHJcbiAgICBIdHRwU3RhdHVzOiB0eXBlb2YgcmVzcG9uc2U/Lkh0dHBTdGF0dXMgPT09IFwibnVtYmVyXCIgPyByZXNwb25zZS5IdHRwU3RhdHVzIDogdW5kZWZpbmVkLFxyXG4gICAgUmV0cnlBZnRlcjogc2FmZVRleHQocmVzcG9uc2U/LlJldHJ5QWZ0ZXIpIHx8IG51bGwsXHJcbiAgICBEYXRhOiB7XHJcbiAgICAgIEFuc3dlcjogc2FuaXRpemVBc3Npc3RhbnRUZXh0KFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgQW5zd2VyPzogdW5rbm93bjsgYW5zd2VyPzogdW5rbm93biB9KS5BbnN3ZXIgPz8gKHJhd0RhdGEgYXMgeyBhbnN3ZXI/OiB1bmtub3duIH0pLmFuc3dlclxyXG4gICAgICApLFxyXG4gICAgICBNb2RlbDogc2FuaXRpemVBc3Npc3RhbnRUZXh0KFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgTW9kZWw/OiB1bmtub3duOyBtb2RlbD86IHVua25vd24gfSkuTW9kZWwgPz8gKHJhd0RhdGEgYXMgeyBtb2RlbD86IHVua25vd24gfSkubW9kZWxcclxuICAgICAgKSxcclxuICAgICAgU291cmNlS2V5OiBzYW5pdGl6ZUFzc2lzdGFudFRleHQoXHJcbiAgICAgICAgKHJhd0RhdGEgYXMgeyBTb3VyY2VLZXk/OiB1bmtub3duOyBzb3VyY2VLZXk/OiB1bmtub3duIH0pLlNvdXJjZUtleSA/P1xyXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBzb3VyY2VLZXk/OiB1bmtub3duIH0pLnNvdXJjZUtleVxyXG4gICAgICApLFxyXG4gICAgICBGaWx0ZXJzQXBwbGllZDpcclxuICAgICAgICByYXdGaWx0ZXJzQXBwbGllZCAmJiB0eXBlb2YgcmF3RmlsdGVyc0FwcGxpZWQgPT09IFwib2JqZWN0XCJcclxuICAgICAgICAgID8gY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlKHJhd0ZpbHRlcnNBcHBsaWVkIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KVxyXG4gICAgICAgICAgOiBudWxsLFxyXG4gICAgICBUb3RhbFNvdXJjZVJlY29yZHM6XHJcbiAgICAgICAgdG9OdWxsYWJsZU51bWJlcihcclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgVG90YWxTb3VyY2VSZWNvcmRzPzogdW5rbm93bjsgdG90YWxTb3VyY2VSZWNvcmRzPzogdW5rbm93biB9KS5Ub3RhbFNvdXJjZVJlY29yZHMgPz9cclxuICAgICAgICAgICAgKHJhd0RhdGEgYXMgeyB0b3RhbFNvdXJjZVJlY29yZHM/OiB1bmtub3duIH0pLnRvdGFsU291cmNlUmVjb3Jkc1xyXG4gICAgICAgICkgPz8gbnVsbCxcclxuICAgICAgUmVjb3Jkc1NlbnRUb01vZGVsOlxyXG4gICAgICAgIHRvTnVsbGFibGVOdW1iZXIoXHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IFJlY29yZHNTZW50VG9Nb2RlbD86IHVua25vd247IHJlY29yZHNTZW50VG9Nb2RlbD86IHVua25vd24gfSkuUmVjb3Jkc1NlbnRUb01vZGVsID8/XHJcbiAgICAgICAgICAgIChyYXdEYXRhIGFzIHsgcmVjb3Jkc1NlbnRUb01vZGVsPzogdW5rbm93biB9KS5yZWNvcmRzU2VudFRvTW9kZWxcclxuICAgICAgICApID8/IG51bGwsXHJcbiAgICAgIFJldHJpZXZhbE1vZGU6IHNhbml0aXplQXNzaXN0YW50VGV4dChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IFJldHJpZXZhbE1vZGU/OiB1bmtub3duOyByZXRyaWV2YWxNb2RlPzogdW5rbm93biB9KS5SZXRyaWV2YWxNb2RlID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IHJldHJpZXZhbE1vZGU/OiB1bmtub3duIH0pLnJldHJpZXZhbE1vZGVcclxuICAgICAgKSB8fCBudWxsLFxyXG4gICAgICBUcnVuY2F0ZWQ6IHRvTnVsbGFibGVCb29sKFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgVHJ1bmNhdGVkPzogdW5rbm93bjsgdHJ1bmNhdGVkPzogdW5rbm93biB9KS5UcnVuY2F0ZWQgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgdHJ1bmNhdGVkPzogdW5rbm93biB9KS50cnVuY2F0ZWRcclxuICAgICAgKSxcclxuICAgICAgV2FybmluZ3M6IEFycmF5LmlzQXJyYXkocmF3V2FybmluZ3MpXHJcbiAgICAgICAgPyByYXdXYXJuaW5nc1xyXG4gICAgICAgICAgICAubWFwKChlbnRyeSkgPT4gc2FuaXRpemVBc3Npc3RhbnRUZXh0KGVudHJ5KSlcclxuICAgICAgICAgICAgLmZpbHRlcigoZW50cnkpID0+IGVudHJ5ICYmICFpc0lnbm9yYWJsZUFzc2lzdGFudFdhcm5pbmcoZW50cnkpKVxyXG4gICAgICAgIDogW10sXHJcbiAgICB9LFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBBc2tzIGJ1c2luZXNzIHF1ZXN0aW9ucyBhYm91dCB0aGUgY3VycmVudCBleHBlbnNlIHNoZWV0IGxpc3QgdXNpbmcgL2FwaS9pYS9zZXJ2aWNlL2V4cGVuc2VzaGVldHMvYXNrLlxyXG5leHBvcnQgY29uc3QgYXNrRXhwZW5zZVNoZWV0c1F1ZXN0aW9uID0gYXN5bmMgKFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldHNBc2tSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxFeHBlbnNlU2hlZXRzQXNrUmVzdWx0PiA9PiB7XHJcbiAgY29uc3QgcXVlc3Rpb24gPSBzYWZlVGV4dChwYXlsb2FkPy5xdWVzdGlvbik7XHJcbiAgaWYgKCFxdWVzdGlvbikge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJxdWVzdGlvbiBpcyByZXF1aXJlZC5cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3QgY3NyZlRva2VuID0gZ2V0Q3NyZlRva2VuKCk7XHJcbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpKTtcclxuICBpZiAoY3NyZlRva2VuKSB7XHJcbiAgICBoZWFkZXJzLlJlcXVlc3RWZXJpZmljYXRpb25Ub2tlbiA9IGNzcmZUb2tlbjtcclxuICB9XHJcblxyXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRzQXNrUmVxdWVzdCA9IHtcclxuICAgIHF1ZXN0aW9uLFxyXG4gICAgYW5zd2VySW5zdHJ1Y3Rpb25zOiBzYWZlVGV4dChwYXlsb2FkPy5hbnN3ZXJJbnN0cnVjdGlvbnMpIHx8IHVuZGVmaW5lZCxcclxuICAgIGxpc3RSZXF1ZXN0OiBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUocGF5bG9hZC5saXN0UmVxdWVzdCksXHJcbiAgICBzb3VyY2VKc29uOlxyXG4gICAgICBwYXlsb2FkPy5zb3VyY2VKc29uID09PSBudWxsIHx8IHBheWxvYWQ/LnNvdXJjZUpzb24gPT09IHVuZGVmaW5lZFxyXG4gICAgICAgID8gdW5kZWZpbmVkXHJcbiAgICAgICAgOiBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUocGF5bG9hZC5zb3VyY2VKc29uKSxcclxuICB9O1xyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9pYS9zZXJ2aWNlL2V4cGVuc2VzaGVldHMvYXNrXCIsIHtcclxuICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnMsXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHJhdyA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcclxuICBjb25zdCByZXRyeUFmdGVyID0gc2FmZVRleHQocmVzcG9uc2UuaGVhZGVycy5nZXQoXCJSZXRyeS1BZnRlclwiKSk7XHJcblxyXG4gIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgIGNvbnN0IHJlbG9naW5SZXN1bHQgPSBhd2FpdCBoYW5kbGVBcGlBdXRoRmFpbHVyZTxFeHBlbnNlU2hlZXRzQXNrUmVzdWx0PihyYXcsIHJlc3BvbnNlLnN0YXR1cywgXCJleHBlbnNlLXNoZWV0cy1hc2tcIik7XHJcbiAgICBpZiAocmVsb2dpblJlc3VsdCAhPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gcmVsb2dpblJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IocmVhZEFwaU1lc3NhZ2VGcm9tUmF3KHJhdykgfHwgXCJQZXJtaXNzaW9uIGRlbmllZC5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgcGFyc2VkID0gdHJ5UGFyc2VKc29uKHJhdyk7XHJcbiAgaWYgKCFwYXJzZWQgfHwgdHlwZW9mIHBhcnNlZCAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihyZWFkQXBpTWVzc2FnZUZyb21SYXcocmF3KSB8fCBcIlJlcXVlc3QgZmFpbGVkLlwiLCByZXNwb25zZS5zdGF0dXMsIHJhdyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJJbnZhbGlkIHNlcnZlciByZXNwb25zZS5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUV4cGVuc2VTaGVldHNBc2tSZXNwb25zZSh7XHJcbiAgICAuLi4ocGFyc2VkIGFzIEV4cGVuc2VTaGVldHNBc2tSZXN1bHQpLFxyXG4gICAgSHR0cFN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxyXG4gICAgUmV0cnlBZnRlcjogcmV0cnlBZnRlciB8fCBudWxsLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gRXh0cmFjdHMgYW4gZXhwZW5zZSBkcmFmdCBmcm9tIGEgdGlja2V0IGltYWdlIHVzaW5nIC9hcGkvaWEvc2VydmljZS9leHBlbnNlZnJvbXRpY2tldC5cclxuZXhwb3J0IGNvbnN0IGV4dHJhY3RFeHBlbnNlRnJvbVRpY2tldERyYWZ0ID0gYXN5bmMgKFxyXG4gIHRpY2tldEltYWdlOiBGaWxlIHwgQmxvYixcclxuICBwZXJzaXN0VGlja2V0PzogYm9vbGVhbixcclxuICB0aWNrZXRVcmxGaWxlPzogc3RyaW5nLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXREcmFmdFJlc3BvbnNlPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgY29uc3Qgc2FmZVRpY2tldFVybCA9IHNhZmVUZXh0KHRpY2tldFVybEZpbGUpO1xyXG5cclxuICBpZiAodGlja2V0SW1hZ2UgaW5zdGFuY2VvZiBGaWxlKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcInRpY2tldEltYWdlXCIsIHRpY2tldEltYWdlLCBzYWZlVGV4dCh0aWNrZXRJbWFnZS5uYW1lKSB8fCBcInRpY2tldC5qcGdcIik7XHJcbiAgfSBlbHNlIHtcclxuICAgIGZvcm0uYXBwZW5kKFwidGlja2V0SW1hZ2VcIiwgdGlja2V0SW1hZ2UsIFwidGlja2V0LmpwZ1wiKTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2YgcGVyc2lzdFRpY2tldCA9PT0gXCJib29sZWFuXCIpIHtcclxuICAgIGZvcm0uYXBwZW5kKFwicGVyc2lzdFRpY2tldFwiLCBwZXJzaXN0VGlja2V0ID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHNhZmVUaWNrZXRVcmwpIHtcclxuICAgIGZvcm0uYXBwZW5kKFwidGlja2V0VXJsRmlsZVwiLCBzYWZlVGlja2V0VXJsKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldERyYWZ0UmVzcG9uc2U+PihcIi9hcGkvaWEvc2VydmljZS9leHBlbnNlZnJvbXRpY2tldFwiLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUZvcm1IZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gICAgYm9keTogZm9ybSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIENyZWF0ZXMgYW5kIGZpbmFsaXplcyBvbmUgdGlja2V0IGZyb20gYSBzaW5nbGUgbXVsdGlwYXJ0IHVwbG9hZCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvcXVpY2stY3JlYXRlLlxyXG5leHBvcnQgY29uc3QgY3JlYXRlRXhwZW5zZVNoZWV0VGlja2V0UXVpY2sgPSBhc3luYyAoXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlc3VsdD4gPT4ge1xyXG4gIGlmICghcGF5bG9hZD8udGlja2V0SW1hZ2UpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwidGlja2V0SW1hZ2UgaXMgcmVxdWlyZWQuXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgeyBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogX3N1cHByZXNzUGVybWlzc2lvbk1vZGFsLCAuLi5mZXRjaE9wdGlvbnMgfSA9IG9wdGlvbnMgfHwge307XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KGZldGNoT3B0aW9ucyk7XHJcbiAgY29uc3QgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gIGNvbnN0IHNhZmVDdXJyZW5jeUNvZGUgPSBzYWZlVGV4dChwYXlsb2FkPy5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3Qgc2FmZURlc2NyaXB0aW9uID0gc2FmZVRleHQocGF5bG9hZD8uZGVzY3JpcHRpb24pO1xyXG4gIGNvbnN0IHNhZmVDb21lbnRhcmlvID0gc2FmZVRleHQocGF5bG9hZD8uY29tZW50YXJpbyk7XHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChwYXlsb2FkPy5leGlzdGluZ0hvamFHYXN0b3NJZCk7XHJcbiAgY29uc3Qgc2FmZVByb2plY3RJZCA9IHNhZmVUZXh0KHBheWxvYWQ/LnByb2plY3RJZCk7XHJcbiAgY29uc3QgdGlja2V0SW1hZ2UgPSBwYXlsb2FkLnRpY2tldEltYWdlO1xyXG5cclxuICBpZiAodGlja2V0SW1hZ2UgaW5zdGFuY2VvZiBGaWxlKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcInRpY2tldEltYWdlXCIsIHRpY2tldEltYWdlLCBzYWZlVGV4dCh0aWNrZXRJbWFnZS5uYW1lKSB8fCBcInRpY2tldC5qcGdcIik7XHJcbiAgfSBlbHNlIHtcclxuICAgIGZvcm0uYXBwZW5kKFwidGlja2V0SW1hZ2VcIiwgdGlja2V0SW1hZ2UsIFwidGlja2V0LmpwZ1wiKTtcclxuICB9XHJcblxyXG4gIGlmIChzYWZlQ3VycmVuY3lDb2RlKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcImN1cnJlbmN5Q29kZVwiLCBzYWZlQ3VycmVuY3lDb2RlKTtcclxuICB9XHJcblxyXG4gIGlmIChcImRlc2NyaXB0aW9uXCIgaW4gcGF5bG9hZCkge1xyXG4gICAgZm9ybS5hcHBlbmQoXCJkZXNjcmlwdGlvblwiLCBzYWZlRGVzY3JpcHRpb24pO1xyXG4gIH1cclxuXHJcbiAgaWYgKFwiY29tZW50YXJpb1wiIGluIHBheWxvYWQpIHtcclxuICAgIGZvcm0uYXBwZW5kKFwiY29tZW50YXJpb1wiLCBzYWZlQ29tZW50YXJpbyk7XHJcbiAgfVxyXG5cclxuICBpZiAoc2FmZVNoZWV0SWQpIHtcclxuICAgIGZvcm0uYXBwZW5kKFwiZXhpc3RpbmdIb2phR2FzdG9zSWRcIiwgc2FmZVNoZWV0SWQpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHNhZmVTaGVldElkICYmIHNhZmVQcm9qZWN0SWQpIHtcclxuICAgIGZvcm0uYXBwZW5kKFwicHJvamVjdElkXCIsIHNhZmVQcm9qZWN0SWQpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY3NyZlRva2VuID0gZ2V0Q3NyZlRva2VuKCk7XHJcbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhidWlsZEV4cGVuc2VGb3JtSGVhZGVycyhjb250ZXh0LCBmZXRjaE9wdGlvbnMpKTtcclxuICBpZiAoY3NyZlRva2VuKSB7XHJcbiAgICBoZWFkZXJzLlJlcXVlc3RWZXJpZmljYXRpb25Ub2tlbiA9IGNzcmZUb2tlbjtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvcXVpY2stY3JlYXRlXCIsIHtcclxuICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXHJcbiAgICAuLi5mZXRjaE9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgaGVhZGVycyxcclxuICAgIGJvZHk6IGZvcm0sXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHJhdyA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcclxuICBjb25zdCByZXRyeUFmdGVyID0gc2FmZVRleHQocmVzcG9uc2UuaGVhZGVycy5nZXQoXCJSZXRyeS1BZnRlclwiKSk7XHJcblxyXG4gIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgIGNvbnN0IHJlbG9naW5SZXN1bHQgPSBhd2FpdCBoYW5kbGVBcGlBdXRoRmFpbHVyZTxFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlc3VsdD4oXHJcbiAgICAgIHJhdyxcclxuICAgICAgcmVzcG9uc2Uuc3RhdHVzLFxyXG4gICAgICBcInRpY2tldC1xdWljay1jcmVhdGVcIlxyXG4gICAgKTtcclxuICAgIGlmIChyZWxvZ2luUmVzdWx0ICE9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiByZWxvZ2luUmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMykge1xyXG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihyZWFkQXBpTWVzc2FnZUZyb21SYXcocmF3KSB8fCBcIlBlcm1pc3Npb24gZGVuaWVkLlwiLCByZXNwb25zZS5zdGF0dXMsIHJhdyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBwYXJzZWQgPSB0cnlQYXJzZUpzb24ocmF3KTtcclxuICBpZiAoIXBhcnNlZCB8fCB0eXBlb2YgcGFyc2VkICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKHJlYWRBcGlNZXNzYWdlRnJvbVJhdyhyYXcpIHx8IFwiUmVxdWVzdCBmYWlsZWQuXCIsIHJlc3BvbnNlLnN0YXR1cywgcmF3KTtcclxuICAgIH1cclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiSW52YWxpZCBzZXJ2ZXIgcmVzcG9uc2UuXCIsIHJlc3BvbnNlLnN0YXR1cywgcmF3KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVUaWNrZXRRdWlja0NyZWF0ZVJlc3BvbnNlKHtcclxuICAgIC4uLihwYXJzZWQgYXMgRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQpLFxyXG4gICAgSHR0cFN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxyXG4gICAgUmV0cnlBZnRlcjogcmV0cnlBZnRlciB8fCBudWxsLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gQ3JlYXRlcyBhIHRpY2tldCBoZWFkZXIvbGluZXMgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLlxyXG5leHBvcnQgY29uc3QgY3JlYXRlRXhwZW5zZVNoZWV0VGlja2V0ID0gYXN5bmMgKFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldENyZWF0ZVJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3QgbW9kZSA9IE51bWJlcihwYXlsb2FkPy5tb2RlKTtcbiAgY29uc3QgcmF3VHJhbnNEYXRlID0gc2FmZVRleHQocGF5bG9hZD8udHJhbnNEYXRlKTtcbiAgY29uc3QgcmF3VGlja2V0RGF0ZSA9IHNhZmVUZXh0KHBheWxvYWQ/LnRpY2tldERhdGUpO1xuICBjb25zdCBub3JtYWxpemVkVHJhbnNEYXRlID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlKHJhd1RyYW5zRGF0ZSk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRUaWNrZXREYXRlID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlKHJhd1RpY2tldERhdGUpO1xuXG4gIGlmIChyYXdUcmFuc0RhdGUgJiYgIW5vcm1hbGl6ZWRUcmFuc0RhdGUpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcbiAgfVxuICBpZiAocmF3VGlja2V0RGF0ZSAmJiAhbm9ybWFsaXplZFRpY2tldERhdGUpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcbiAgfVxuXHJcbiAgaWYgKChtb2RlID09PSAwIHx8IG1vZGUgPT09IDEpICYmICFub3JtYWxpemVkVHJhbnNEYXRlKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRDcmVhdGVSZXF1ZXN0ID0ge1xyXG4gICAgLi4ucGF5bG9hZCxcbiAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZWRUcmFuc0RhdGUgfHwgdW5kZWZpbmVkLFxuICAgIHRpY2tldERhdGU6IG5vcm1hbGl6ZWRUaWNrZXREYXRlIHx8IHVuZGVmaW5lZCxcbiAgICBnYXN0b1R5cGU6IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlKHBheWxvYWQ/Lmdhc3RvVHlwZSksXG4gIH07XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzXCIsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldEZpbHRlckNyaXRlcmlhUGF5bG9hZCA9IDxcclxuICBUIGV4dGVuZHMge1xyXG4gICAgY3JlYXRlZERhdGVGcm9tPzogc3RyaW5nO1xyXG4gICAgY3JlYXRlZERhdGVUbz86IHN0cmluZztcclxuICAgIHNlYXJjaEtleT86IHN0cmluZztcclxuICAgIGZpbHRlcj86IHN0cmluZztcclxuICAgIGN1cnJlbmN5Q29kZT86IHN0cmluZztcclxuICAgIGdhc3RvVHlwZT86IHVua25vd247XHJcbiAgICBwcm9jZXNzZWRCeUFJPzogdW5rbm93bjtcclxuICB9LFxyXG4+KFxyXG4gIHBheWxvYWQ6IFRcclxuKSA9PiB7XHJcbiAgY29uc3QgcmF3Q3JlYXRlZERhdGVGcm9tID0gc2FmZVRleHQocGF5bG9hZD8uY3JlYXRlZERhdGVGcm9tKTtcclxuICBjb25zdCByYXdDcmVhdGVkRGF0ZVRvID0gc2FmZVRleHQocGF5bG9hZD8uY3JlYXRlZERhdGVUbyk7XHJcbiAgY29uc3QgY3JlYXRlZERhdGVGcm9tID0gbm9ybWFsaXplVGlja2V0TGlzdERhdGUocmF3Q3JlYXRlZERhdGVGcm9tKTtcclxuICBjb25zdCBjcmVhdGVkRGF0ZVRvID0gbm9ybWFsaXplVGlja2V0TGlzdERhdGUocmF3Q3JlYXRlZERhdGVUbyk7XHJcbiAgaWYgKHJhd0NyZWF0ZWREYXRlRnJvbSAmJiAhY3JlYXRlZERhdGVGcm9tKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICB9XHJcbiAgaWYgKHJhd0NyZWF0ZWREYXRlVG8gJiYgIWNyZWF0ZWREYXRlVG8pIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcHJlZmVycmVkU2VhcmNoS2V5ID0gc2FmZVRleHQocGF5bG9hZD8uc2VhcmNoS2V5IHx8IHBheWxvYWQ/LmZpbHRlcik7XHJcbiAgY29uc3QgbGVnYWN5RmlsdGVyID0gc2FmZVRleHQocGF5bG9hZD8uZmlsdGVyIHx8IHByZWZlcnJlZFNlYXJjaEtleSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBjcmVhdGVkRGF0ZUZyb206IGNyZWF0ZWREYXRlRnJvbSB8fCB1bmRlZmluZWQsXHJcbiAgICBjcmVhdGVkRGF0ZVRvOiBjcmVhdGVkRGF0ZVRvIHx8IHVuZGVmaW5lZCxcclxuICAgIHNlYXJjaEtleTogcHJlZmVycmVkU2VhcmNoS2V5IHx8IHVuZGVmaW5lZCxcclxuICAgIGZpbHRlcjogbGVnYWN5RmlsdGVyIHx8IHVuZGVmaW5lZCxcclxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQocGF5bG9hZD8uY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpIHx8IHVuZGVmaW5lZCxcclxuICAgIGdhc3RvVHlwZTogbm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZShwYXlsb2FkPy5nYXN0b1R5cGUpLFxyXG4gICAgcHJvY2Vzc2VkQnlBSTogbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRQcm9jZXNzZWRCeUFJKHBheWxvYWQ/LnByb2Nlc3NlZEJ5QUkpLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVUaWNrZXRMaXN0RmlsdGVyUGF5bG9hZCA9IDxcclxuICBUIGV4dGVuZHMge1xyXG4gICAgcGFnZT86IG51bWJlcjtcclxuICAgIHBhZ2VTaXplPzogbnVtYmVyO1xyXG4gICAgY3JlYXRlZERhdGVGcm9tPzogc3RyaW5nO1xyXG4gICAgY3JlYXRlZERhdGVUbz86IHN0cmluZztcclxuICAgIHNlYXJjaEtleT86IHN0cmluZztcclxuICAgIGZpbHRlcj86IHN0cmluZztcclxuICAgIGN1cnJlbmN5Q29kZT86IHN0cmluZztcclxuICAgIGdhc3RvVHlwZT86IHVua25vd247XHJcbiAgICBwcm9jZXNzZWRCeUFJPzogdW5rbm93bjtcclxuICB9LFxyXG4+KFxyXG4gIHBheWxvYWQ6IFRcclxuKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHBhZ2U6IE51bWJlci5pc0Zpbml0ZShwYXlsb2FkPy5wYWdlKSAmJiBOdW1iZXIocGF5bG9hZC5wYWdlKSA+IDAgPyBNYXRoLmZsb29yKE51bWJlcihwYXlsb2FkLnBhZ2UpKSA6IDEsXHJcbiAgICBwYWdlU2l6ZTogTnVtYmVyLmlzRmluaXRlKHBheWxvYWQ/LnBhZ2VTaXplKSAmJiBOdW1iZXIocGF5bG9hZC5wYWdlU2l6ZSkgPiAwID8gTWF0aC5mbG9vcihOdW1iZXIocGF5bG9hZC5wYWdlU2l6ZSkpIDogNTAsXHJcbiAgICAuLi5ub3JtYWxpemVUaWNrZXRGaWx0ZXJDcml0ZXJpYVBheWxvYWQocGF5bG9hZCksXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIExvYWRzIHRpY2tldCBsaXN0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saXN0LlxyXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRzTGlzdCA9IGFzeW5jIChcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCxcclxuICBvcHRpb25zPzogRXhwZW5zZVRpY2tldExpc3RGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvPj4gPT4ge1xyXG4gIGNvbnN0IHsgYXhVc2VySWRPdmVycmlkZSwgLi4uYmFzZU9wdGlvbnMgfSA9IG9wdGlvbnMgfHwge307XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KGJhc2VPcHRpb25zKTtcclxuICBjb25zdCBzYWZlUGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QgPSB7XHJcbiAgICAuLi5ub3JtYWxpemVUaWNrZXRMaXN0RmlsdGVyUGF5bG9hZChwYXlsb2FkKSxcclxuICAgIHN0YXR1czogbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRTdGF0dXMocGF5bG9hZD8uc3RhdHVzKSxcclxuICB9O1xyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvPj4oXHJcbiAgICBcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saXN0XCIsXHJcbiAgICB7XHJcbiAgICAgIC4uLmJhc2VPcHRpb25zLFxyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBoZWFkZXJzOiBidWlsZFRpY2tldExpc3RIZWFkZXJzKGNvbnRleHQsIGJhc2VPcHRpb25zLCBheFVzZXJJZE92ZXJyaWRlKSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBMb2FkcyBsaW5rLW1vZGUgdGlja2V0IGxpc3QgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL2xpbmsvbGlzdC5cclxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3QgPSBhc3luYyAoXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBFeHBlbnNlVGlja2V0TGlzdEZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RJdGVtRHRvPj4gPT4ge1xyXG4gIGNvbnN0IHsgYXhVc2VySWRPdmVycmlkZSwgLi4uYmFzZU9wdGlvbnMgfSA9IG9wdGlvbnMgfHwge307XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KGJhc2VPcHRpb25zKTtcclxuICBjb25zdCBzYWZlUGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RSZXF1ZXN0ID0ge1xyXG4gICAgLi4ubm9ybWFsaXplVGlja2V0TGlzdEZpbHRlclBheWxvYWQocGF5bG9hZCksXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdEl0ZW1EdG8+PihcclxuICAgIFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL2xpbmsvbGlzdFwiLFxyXG4gICAge1xyXG4gICAgICAuLi5iYXNlT3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRUaWNrZXRMaXN0SGVhZGVycyhjb250ZXh0LCBiYXNlT3B0aW9ucywgYXhVc2VySWRPdmVycmlkZSksXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplVGlja2V0TGlua0xpc3RQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIExpbmtzIHNlbGVjdGVkIG9yIGZpbHRlcmVkIHRpY2tldHMgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL2xpbmsvYnVsay5cclxuZXhwb3J0IGNvbnN0IGxpbmtFeHBlbnNlU2hlZXRUaWNrZXRzQnVsayA9IGFzeW5jIChcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1JlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEV4cGVuc2VUaWNrZXRMaXN0RmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXN1bHREdG8+PiA9PiB7XHJcbiAgY29uc3QgeyBheFVzZXJJZE92ZXJyaWRlLCAuLi5iYXNlT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQoYmFzZU9wdGlvbnMpO1xyXG4gIGNvbnN0IHNlbGVjdGlvbk1vZGUgPSBwYXlsb2FkPy5zZWxlY3Rpb25Nb2RlID09PSBcImZpbHRlcmVkXCIgPyBcImZpbHRlcmVkXCIgOiBcInNlbGVjdGVkXCI7XHJcbiAgY29uc3QgdGlja2V0SWRzID0gQXJyYXkuaXNBcnJheShwYXlsb2FkPy50aWNrZXRJZHMpXHJcbiAgICA/IHBheWxvYWQudGlja2V0SWRzLm1hcCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5KSkuZmlsdGVyKEJvb2xlYW4pXHJcbiAgICA6IFtdO1xyXG4gIGNvbnN0IGV4Y2x1ZGVkSWRzID0gQXJyYXkuaXNBcnJheShwYXlsb2FkPy5leGNsdWRlZElkcylcclxuICAgID8gcGF5bG9hZC5leGNsdWRlZElkcy5tYXAoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeSkpLmZpbHRlcihCb29sZWFuKVxyXG4gICAgOiBbXTtcclxuXHJcbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVxdWVzdCA9IHtcclxuICAgIGV4cGVuc2VTaGVldElkOiBzYWZlVGV4dChwYXlsb2FkPy5leHBlbnNlU2hlZXRJZCksXHJcbiAgICBzZWxlY3Rpb25Nb2RlLFxyXG4gICAgdGlja2V0SWRzOiBzZWxlY3Rpb25Nb2RlID09PSBcInNlbGVjdGVkXCIgPyB0aWNrZXRJZHMgOiB1bmRlZmluZWQsXHJcbiAgICBmaWx0ZXJzOlxyXG4gICAgICBzZWxlY3Rpb25Nb2RlID09PSBcImZpbHRlcmVkXCIgJiYgcGF5bG9hZD8uZmlsdGVyc1xyXG4gICAgICAgID8ge1xyXG4gICAgICAgICAgICAuLi5ub3JtYWxpemVUaWNrZXRGaWx0ZXJDcml0ZXJpYVBheWxvYWQocGF5bG9hZC5maWx0ZXJzKSxcclxuICAgICAgICAgIH1cclxuICAgICAgICA6IHVuZGVmaW5lZCxcclxuICAgIGV4Y2x1ZGVkSWRzOiBzZWxlY3Rpb25Nb2RlID09PSBcImZpbHRlcmVkXCIgPyBleGNsdWRlZElkcyA6IHVuZGVmaW5lZCxcclxuICB9O1xyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0bz4+KFxyXG4gICAgXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGluay9idWxrXCIsXHJcbiAgICB7XHJcbiAgICAgIC4uLmJhc2VPcHRpb25zLFxyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBoZWFkZXJzOiBidWlsZFRpY2tldExpc3RIZWFkZXJzKGNvbnRleHQsIGJhc2VPcHRpb25zLCBheFVzZXJJZE92ZXJyaWRlKSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVUaWNrZXRMaW5rQnVsa1Jlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIExvYWRzIG9uZSB0aWNrZXQgZGV0YWlsIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS5cclxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0ID0gYXN5bmMgKFxyXG4gIGZpbGVJZDogc3RyaW5nLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldERldGFpbER0bz4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXREZXRhaWxEdG8+PihcclxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfWAsXHJcbiAgICB7XHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBEb3dubG9hZHMgb25lIHRpY2tldCBpbWFnZSBwcmV2aWV3IGJsb2IgdGhyb3VnaCB0aGUgaW50ZXJuYWwgcHJveHkgZW5kcG9pbnQuXHJcbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldFByZXZpZXdCbG9iID0gYXN5bmMgKFxyXG4gIGZpbGVJZDogc3RyaW5nLFxyXG4gIHVybEZpbGU6IHN0cmluZyxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8QmxvYj4gPT4ge1xyXG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBzYWZlVGV4dChmaWxlSWQpO1xyXG4gIGNvbnN0IHNhZmVVcmxGaWxlID0gc2FmZVRleHQodXJsRmlsZSk7XHJcbiAgaWYgKCFzYWZlRmlsZUlkIHx8ICFzYWZlVXJsRmlsZSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJNaXNzaW5nIHRpY2tldCBwcmV2aWV3IHBheWxvYWQuXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgeyBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogX3N1cHByZXNzUGVybWlzc2lvbk1vZGFsLCAuLi5mZXRjaE9wdGlvbnMgfSA9IG9wdGlvbnMgfHwge307XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IGNzcmZUb2tlbiA9IGdldENzcmZUb2tlbigpO1xyXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMoYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBmZXRjaE9wdGlvbnMsIHRydWUpKTtcclxuICBoZWFkZXJzLkFjY2VwdCA9IFwiaW1hZ2UvKlwiO1xyXG4gIGNvbnN0IHJlcXVlc3RIZWFkZXJzOiBIZWFkZXJzSW5pdCA9IHtcclxuICAgIEFjY2VwdDogXCJpbWFnZS8qXCIsXHJcbiAgICAuLi5oZWFkZXJzLFxyXG4gIH07XHJcblxyXG4gIGlmIChjc3JmVG9rZW4pIHtcclxuICAgIChyZXF1ZXN0SGVhZGVycyBhcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KVtcIlJlcXVlc3RWZXJpZmljYXRpb25Ub2tlblwiXSA9IGNzcmZUb2tlbjtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvcHJldmlld1wiLCB7XHJcbiAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxyXG4gICAgLi4uZmV0Y2hPcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnM6IHJlcXVlc3RIZWFkZXJzLFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICBmaWxlSWQ6IHNhZmVGaWxlSWQsXHJcbiAgICAgIHVybEZpbGU6IHNhZmVVcmxGaWxlLFxyXG4gICAgfSksXHJcbiAgfSk7XHJcblxyXG4gIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgIGNvbnN0IHJhdyA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcclxuICAgIGNvbnN0IHJlbG9naW5SZXN1bHQgPSBhd2FpdCBoYW5kbGVBcGlBdXRoRmFpbHVyZTxCbG9iPihyYXcsIHJlc3BvbnNlLnN0YXR1cywgXCJ0aWNrZXQtcHJldmlld1wiKTtcclxuICAgIGlmIChyZWxvZ2luUmVzdWx0ICE9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiByZWxvZ2luUmVzdWx0O1xyXG4gICAgfVxyXG4gICAgY29uc3QgbWVzc2FnZSA9IHJlYWRBcGlNZXNzYWdlRnJvbVJhdyhyYXcpO1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IobWVzc2FnZSB8fCBcIkNvdWxkIG5vdCBsb2FkIHRpY2tldCBwcmV2aWV3LlwiLCByZXNwb25zZS5zdGF0dXMsIHJhdyk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBibG9iID0gYXdhaXQgcmVzcG9uc2UuYmxvYigpO1xyXG4gIGlmICghYmxvYiB8fCBibG9iLnNpemUgPT09IDApIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiQ291bGQgbm90IGxvYWQgdGlja2V0IHByZXZpZXcuXCIpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGJsb2I7XHJcbn07XHJcblxyXG4vLyBVcGRhdGVzIHRpY2tldCBoZWFkZXIgbWV0YWRhdGEgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9LlxyXG5leHBvcnQgY29uc3QgdXBkYXRlRXhwZW5zZVNoZWV0VGlja2V0ID0gYXN5bmMgKFxyXG4gIGZpbGVJZDogc3RyaW5nLFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldFVwZGF0ZVJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJhd1RyYW5zRGF0ZSA9IHNhZmVUZXh0KHBheWxvYWQ/LnRyYW5zRGF0ZSk7XG4gIGNvbnN0IHJhd1RpY2tldERhdGUgPSBzYWZlVGV4dChwYXlsb2FkPy50aWNrZXREYXRlKTtcbiAgY29uc3Qgbm9ybWFsaXplZFRyYW5zRGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdUcmFuc0RhdGUpO1xuICBjb25zdCBub3JtYWxpemVkVGlja2V0RGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdUaWNrZXREYXRlKTtcblxuICBpZiAocmF3VHJhbnNEYXRlICYmICFub3JtYWxpemVkVHJhbnNEYXRlKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XG4gIH1cbiAgaWYgKHJhd1RpY2tldERhdGUgJiYgIW5vcm1hbGl6ZWRUaWNrZXREYXRlKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XG4gIH1cblxyXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0ID0ge1xyXG4gICAgLi4ucGF5bG9hZCxcbiAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZWRUcmFuc0RhdGUgfHwgdW5kZWZpbmVkLFxuICAgIHRpY2tldERhdGU6IG5vcm1hbGl6ZWRUaWNrZXREYXRlIHx8IHVuZGVmaW5lZCxcbiAgICBnYXN0b1R5cGU6IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlKHBheWxvYWQ/Lmdhc3RvVHlwZSksXG4gIH07XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfWAsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gRGVsZXRlcyBvbmUgdGlja2V0IG9yIG9uZSB0aWNrZXQgbGluZSB2aWEgcXVlcnkgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9LlxyXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0ID0gYXN5bmMgKFxyXG4gIGZpbGVJZDogc3RyaW5nLFxyXG4gIGxpbmVSZWNJZD86IG51bWJlcixcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XHJcbiAgaWYgKE51bWJlci5pc0ludGVnZXIoTnVtYmVyKGxpbmVSZWNJZCkpICYmIE51bWJlcihsaW5lUmVjSWQpID4gMCkge1xyXG4gICAgcXVlcnkuc2V0KFwibGluZVJlY0lkXCIsIFN0cmluZyhsaW5lUmVjSWQpKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHN1ZmZpeCA9IHF1ZXJ5LnRvU3RyaW5nKCk7XHJcbiAgY29uc3QgdXJsID0gc3VmZml4XHJcbiAgICA/IGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfT8ke3N1ZmZpeH1gXHJcbiAgICA6IGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfWA7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8bnVsbD4+KHVybCwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBBcHBsaWVzIElBIHBheWxvYWQgb3ZlciBhbiBleGlzdGluZyB0aWNrZXQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9L2lhLlxyXG5leHBvcnQgY29uc3QgYXBwbHlFeHBlbnNlU2hlZXRUaWNrZXRJYSA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3QgcmF3UGF5bG9hZCA9IChwYXlsb2FkIHx8IHt9KSBhcyBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3Q7XHJcbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCA9IHtcclxuICAgIC4uLnJhd1BheWxvYWQsXHJcbiAgfTtcclxuICBjb25zdCBub3JtYWxpemVkVHJhbnNEYXRlID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlKHJhd1BheWxvYWQudHJhbnNEYXRlKTtcclxuICBpZiAoIW5vcm1hbGl6ZWRUcmFuc0RhdGUpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xyXG4gIH1cclxuICBzYWZlUGF5bG9hZC50cmFuc0RhdGUgPSBub3JtYWxpemVkVHJhbnNEYXRlO1xyXG5cclxuICBjb25zdCBnYXN0b1R5cGUgPSBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZShyYXdQYXlsb2FkLmdhc3RvVHlwZSk7XHJcbiAgaWYgKGdhc3RvVHlwZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICBkZWxldGUgc2FmZVBheWxvYWQuZ2FzdG9UeXBlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzYWZlUGF5bG9hZC5nYXN0b1R5cGUgPSBnYXN0b1R5cGU7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vaWFgLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBDcmVhdGVzIG9uZSB0aWNrZXQgbGluZSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vbGluZXMuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVFeHBlbnNlU2hlZXRUaWNrZXRMaW5lID0gYXN5bmMgKFxyXG4gIGZpbGVJZDogc3RyaW5nLFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XHJcbiAgaWYgKCFzYWZlVGV4dChwYXlsb2FkPy5kZXNjcmlwdGlvbikgfHwgIWlzVmFsaWRUaWNrZXRMaW5lQW1vdW50KHBheWxvYWQpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJkZXNjcmlwdGlvbiBhbmQgYSB2YWxpZCBzaWduZWQgdGlja2V0IGxpbmUgYW1vdW50IGFyZSByZXF1aXJlZC5cIik7XG4gIH1cblxyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vbGluZXNgLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIFVwZGF0ZXMgb25lIHRpY2tldCBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9saW5lcy97bGluZVJlY0lkfS5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldExpbmUgPSBhc3luYyAoXHJcbiAgZmlsZUlkOiBzdHJpbmcsXHJcbiAgbGluZVJlY0lkOiBzdHJpbmcgfCBudW1iZXIsXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGluZVJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcclxuICBpZiAoIXNhZmVUZXh0KHBheWxvYWQ/LmRlc2NyaXB0aW9uKSB8fCAhaXNWYWxpZFRpY2tldExpbmVBbW91bnQocGF5bG9hZCkpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImRlc2NyaXB0aW9uIGFuZCBhIHZhbGlkIHNpZ25lZCB0aWNrZXQgbGluZSBhbW91bnQgYXJlIHJlcXVpcmVkLlwiKTtcbiAgfVxuXHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHNhZmVMaW5lSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGxpbmVSZWNJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+KFxyXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2xpbmVzLyR7c2FmZUxpbmVJZH1gLFxyXG4gICAge1xyXG4gICAgICAuLi5vcHRpb25zLFxyXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBEZWxldGVzIG9uZSB0aWNrZXQgbGluZSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vbGluZXMve2xpbmVSZWNJZH0uXHJcbmV4cG9ydCBjb25zdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRMaW5lID0gYXN5bmMgKFxyXG4gIGZpbGVJZDogc3RyaW5nLFxyXG4gIGxpbmVSZWNJZDogc3RyaW5nIHwgbnVtYmVyLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxudWxsPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCBzYWZlTGluZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhsaW5lUmVjSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxudWxsPj4oXHJcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vbGluZXMvJHtzYWZlTGluZUlkfWAsXHJcbiAgICB7XHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gVXBsb2Fkcy9yZXBsYWNlcyB0aWNrZXQgZmlsZSBjb250ZW50IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9maWxlLlxyXG5leHBvcnQgY29uc3QgdXBsb2FkRXhwZW5zZVNoZWV0VGlja2V0RmlsZSA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICBmaWxlOiBGaWxlIHwgQmxvYixcclxuICBleHRlbnNpb24/OiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3Qgc2FmZUV4dGVuc2lvbiA9IHNhZmVUZXh0KGV4dGVuc2lvbikucmVwbGFjZSgvXlxcLi8sIFwiXCIpO1xyXG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xyXG4gIGlmIChzYWZlRXh0ZW5zaW9uKSB7XHJcbiAgICBxdWVyeS5zZXQoXCJleHRlbnNpb25cIiwgc2FmZUV4dGVuc2lvbik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzdWZmaXggPSBxdWVyeS50b1N0cmluZygpO1xyXG4gIGNvbnN0IHVybCA9IHN1ZmZpeFxyXG4gICAgPyBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vZmlsZT8ke3N1ZmZpeH1gXHJcbiAgICA6IGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9maWxlYDtcclxuICBjb25zdCBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgaWYgKGZpbGUgaW5zdGFuY2VvZiBGaWxlKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcImZpbGVcIiwgZmlsZSwgc2FmZVRleHQoZmlsZS5uYW1lKSB8fCBgdGlja2V0LiR7c2FmZUV4dGVuc2lvbiB8fCBcImpwZ1wifWApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBmb3JtLmFwcGVuZChcImZpbGVcIiwgZmlsZSwgYHRpY2tldC4ke3NhZmVFeHRlbnNpb24gfHwgXCJqcGdcIn1gKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+KHVybCwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VGb3JtSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICAgIGJvZHk6IGZvcm0sXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBEZWxldGVzIHRpY2tldCBmaWxlIGNvbnRlbnQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9L2ZpbGUuXHJcbmV4cG9ydCBjb25zdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRGaWxlID0gYXN5bmMgKFxyXG4gIGZpbGVJZDogc3RyaW5nLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxudWxsPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxudWxsPj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2ZpbGVgLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIkRFTEVURVwiLFxyXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIFNlYXJjaGVzIHByb2plY3RzIGZvciBkcm9wZG93biB1c2FnZSBpbiBmaWx0ZXJzIGFuZCBlZGl0IGZvcm1zLlxyXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlUHJvamVjdHMgPSBhc3luYyAoXHJcbiAgdGVybTogc3RyaW5nLFxyXG4gIHBhZ2U6IG51bWJlcixcclxuICBwYWdlU2l6ZTogbnVtYmVyLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxQcm9qZWN0RHJvcGRvd25SZXNwb25zZT4gPT4ge1xyXG4gIGNvbnN0IHNhZmVUZXJtID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyh0ZXJtIHx8IFwiXCIpKTtcclxuICBjb25zdCBzYWZlUGFnZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlKSAmJiBwYWdlID4gMCA/IE1hdGguZmxvb3IocGFnZSkgOiAxO1xyXG4gIGNvbnN0IHNhZmVQYWdlU2l6ZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlU2l6ZSkgJiYgcGFnZVNpemUgPiAwID8gTWF0aC5mbG9vcihwYWdlU2l6ZSkgOiAyMDtcclxuXHJcbiAgcmV0dXJuIGZldGNoSnNvbjxQcm9qZWN0RHJvcGRvd25SZXNwb25zZT4oXHJcbiAgICBgL0dhc3Rvcy9HZXRQcm9qZWN0c0ZvckRyb3Bkb3duP3Rlcm09JHtzYWZlVGVybX0mcGFnZT0ke3NhZmVQYWdlfSZwYWdlU2l6ZT0ke3NhZmVQYWdlU2l6ZX1gLFxyXG4gICAge1xyXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICB9XHJcbiAgKTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQk8sSUFBTSw2QkFBNkIsQ0FDeEMsYUFDOEM7QUFDOUMsU0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBQ0gsT0FBTyxNQUFNLFFBQVEsVUFBVSxLQUFLLElBQUksU0FBUyxRQUFRLENBQUM7QUFBQSxFQUM1RDtBQUNGO0FBRU8sSUFBTSwrQkFBK0IsQ0FDMUMsYUFDNEM7QUFDNUMsU0FBTztBQUFBLElBQ0wsR0FBRztBQUFBLElBQ0gsT0FBTyxNQUFNLFFBQVEsVUFBVSxLQUFLLElBQUksU0FBUyxRQUFRLENBQUM7QUFBQSxFQUM1RDtBQUNGO0FBRU8sSUFBTSx1QkFBdUIsQ0FBSSxhQUFtRDtBQUN6RixTQUFPO0FBQUEsSUFDTCxHQUFHO0FBQUEsSUFDSCxRQUFRLE1BQU0sUUFBUSxVQUFVLE1BQU0sSUFBSSxTQUFTLFNBQVMsVUFBVSxVQUFVO0FBQUEsRUFDbEY7QUFDRjtBQUVPLElBQU0scUNBQXFDLENBQ2hELGFBQ3dDO0FBQ3hDLFFBQU0sYUFBYSxxQkFBcUIsUUFBUTtBQUNoRCxRQUFNLFVBQVUsWUFBWTtBQUM1QixNQUFJLENBQUMsV0FBVyxPQUFPLFlBQVksVUFBVTtBQUMzQyxXQUFPO0FBQUEsTUFDTCxHQUFHO0FBQUEsTUFDSCxZQUFZLE9BQU8sVUFBVSxlQUFlLFdBQVcsU0FBUyxhQUFhO0FBQUEsTUFDN0UsWUFBWSxTQUFTLFVBQVUsVUFBVSxLQUFLO0FBQUEsSUFDaEQ7QUFBQSxFQUNGO0FBRUEsUUFBTSxr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QUEsTUFDUixHQUFHO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFsic2FmZVRleHQiLCAic2FmZVRleHQiLCAidG9OdWxsYWJsZU51bWJlciIsICJpc05vbk5lZ2F0aXZlTnVtYmVyIiwgImlzUG9zaXRpdmVOdW1iZXIiLCAibm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUiLCAibm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZSIsICJub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1cyIsICJub3JtYWxpemVPcHRpb25hbEFwaURhdGUiLCAibm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlIiwgIm5vcm1hbGl6ZVRpY2tldExpc3REYXRlIiwgInRvTnVsbGFibGVCb29sIiwgIm5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSSIsICJub3JtYWxpemVFeHBlbnNlU2hlZXRMaXN0U3RhdHVzRmlsdGVyIiwgInRvRmxhZ0Jvb2wiLCAicmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lIiwgInNhZmVUZXh0IiwgIm5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlIiwgIm5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplQXBpUmVzcG9uc2UiLCAibm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZSIsICJub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVUaWNrZXRMaW5rTGlzdFBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVUaWNrZXRMaW5rQnVsa1Jlc3BvbnNlIiwgInRvTnVsbGFibGVOdW1iZXIiLCAibWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmQiLCAibWFwRXhwZW5zZVNoZWV0SGVhZGVyIiwgIm1hcEV4cGVuc2VTaGVldExpbmUiLCAiaXNQb3NpdGl2ZU51bWJlciIsICJpc05vbk5lZ2F0aXZlTnVtYmVyIl0KfQo=
