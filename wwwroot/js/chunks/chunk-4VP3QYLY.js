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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlQXBpUmVzcG9uc2VOb3JtYWxpemVycy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VBcGlNYXBwZXJzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZVVpVXRpbHMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL2NvbXBhbnlTZWxlY3Rpb24udHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlQXBpLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7XHJcbiAgRXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8sXHJcbiAgRXhwZW5zZVNoZWV0RGV0YWlsRHRvLFxyXG4gIEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldERldGFpbER0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdEl0ZW1EdG8sXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8sXHJcbiAgRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8sXHJcbiAgSW5kQXBpUmVzcG9uc2UsXHJcbiAgSW5kUGFnZWRSZXNwb25zZSxcclxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgc2FmZVRleHQsXHJcbiAgdG9OdWxsYWJsZUJvb2wsXHJcbiAgdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUsXHJcbiAgdG9OdWxsYWJsZU51bWJlcixcclxuICB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZSxcclxufSBmcm9tIFwiLi9leHBlbnNlQXBpVHJhbnNmb3Jtcy50c1wiO1xyXG5pbXBvcnQgeyBub3JtYWxpemVFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZXMgfSBmcm9tIFwiLi9leHBlbnNlU3Vib3JkaW5hdGVNYXBwZXIudHNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz5cclxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz4gPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICAuLi5yZXNwb25zZSxcclxuICAgIEl0ZW1zOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXREZXRhaWxEdG8+XHJcbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0RGV0YWlsRHRvPiA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnJlc3BvbnNlLFxyXG4gICAgSXRlbXM6IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW10sXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVBcGlSZXNwb25zZSA9IDxUPihyZXNwb25zZTogSW5kQXBpUmVzcG9uc2U8VD4pOiBJbmRBcGlSZXNwb25zZTxUPiA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnJlc3BvbnNlLFxyXG4gICAgRXJyb3JzOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5FcnJvcnMpID8gcmVzcG9uc2UuRXJyb3JzIDogcmVzcG9uc2U/LkVycm9ycyA/PyBudWxsLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHRcclxuKTogRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgY29uc3QgcmF3RGF0YSA9IG5vcm1hbGl6ZWQ/LkRhdGE7XHJcbiAgaWYgKCFyYXdEYXRhIHx8IHR5cGVvZiByYXdEYXRhICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAuLi5ub3JtYWxpemVkLFxyXG4gICAgICBIdHRwU3RhdHVzOiB0eXBlb2YgcmVzcG9uc2U/Lkh0dHBTdGF0dXMgPT09IFwibnVtYmVyXCIgPyByZXNwb25zZS5IdHRwU3RhdHVzIDogdW5kZWZpbmVkLFxyXG4gICAgICBSZXRyeUFmdGVyOiBzYWZlVGV4dChyZXNwb25zZT8uUmV0cnlBZnRlcikgfHwgbnVsbCxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb25zdCByYXdTdGVwVHJhY2VJZHMgPVxyXG4gICAgKHJhd0RhdGEgYXMgeyBTdGVwVHJhY2VJZHM/OiB1bmtub3duOyBzdGVwVHJhY2VJZHM/OiB1bmtub3duIH0pLlN0ZXBUcmFjZUlkcyA/P1xyXG4gICAgKHJhd0RhdGEgYXMgeyBzdGVwVHJhY2VJZHM/OiB1bmtub3duIH0pLnN0ZXBUcmFjZUlkcztcclxuICBjb25zdCBzdGVwVHJhY2VJZHMgPSByYXdTdGVwVHJhY2VJZHMgJiYgdHlwZW9mIHJhd1N0ZXBUcmFjZUlkcyA9PT0gXCJvYmplY3RcIiA/IHJhd1N0ZXBUcmFjZUlkcyA6IG51bGw7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAuLi5ub3JtYWxpemVkLFxyXG4gICAgSHR0cFN0YXR1czogdHlwZW9mIHJlc3BvbnNlPy5IdHRwU3RhdHVzID09PSBcIm51bWJlclwiID8gcmVzcG9uc2UuSHR0cFN0YXR1cyA6IHVuZGVmaW5lZCxcclxuICAgIFJldHJ5QWZ0ZXI6IHNhZmVUZXh0KHJlc3BvbnNlPy5SZXRyeUFmdGVyKSB8fCBudWxsLFxyXG4gICAgRGF0YToge1xyXG4gICAgICBGaWxlSWQ6IHNhZmVUZXh0KChyYXdEYXRhIGFzIHsgRmlsZUlkPzogdW5rbm93bjsgZmlsZUlkPzogdW5rbm93biB9KS5GaWxlSWQgPz8gKHJhd0RhdGEgYXMgeyBmaWxlSWQ/OiB1bmtub3duIH0pLmZpbGVJZCksXHJcbiAgICAgIFVybEZpbGU6IHNhZmVUZXh0KFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgVXJsRmlsZT86IHVua25vd247IHVybEZpbGU/OiB1bmtub3duIH0pLlVybEZpbGUgPz8gKHJhd0RhdGEgYXMgeyB1cmxGaWxlPzogdW5rbm93biB9KS51cmxGaWxlXHJcbiAgICAgICksXHJcbiAgICAgIEZpbGVOYW1lOiBzYWZlVGV4dChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IEZpbGVOYW1lPzogdW5rbm93bjsgZmlsZU5hbWU/OiB1bmtub3duIH0pLkZpbGVOYW1lID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IGZpbGVOYW1lPzogdW5rbm93biB9KS5maWxlTmFtZVxyXG4gICAgICApLFxyXG4gICAgICBQcm9jZXNzZWRCeUFJOiB0b051bGxhYmxlQm9vbChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KS5Qcm9jZXNzZWRCeUFJID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pLnByb2Nlc3NlZEJ5QUlcclxuICAgICAgKSxcclxuICAgICAgTGlua2VkVG9TaGVldDpcclxuICAgICAgICB0b051bGxhYmxlQm9vbChcclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgTGlua2VkVG9TaGVldD86IHVua25vd247IGxpbmtlZFRvU2hlZXQ/OiB1bmtub3duIH0pLkxpbmtlZFRvU2hlZXQgPz9cclxuICAgICAgICAgICAgKHJhd0RhdGEgYXMgeyBsaW5rZWRUb1NoZWV0PzogdW5rbm93biB9KS5saW5rZWRUb1NoZWV0XHJcbiAgICAgICAgKSA9PT0gdHJ1ZSxcclxuICAgICAgSG9qYUdhc3Rvc0lkOlxyXG4gICAgICAgIHNhZmVUZXh0KFxyXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBIb2phR2FzdG9zSWQ/OiB1bmtub3duOyBob2phR2FzdG9zSWQ/OiB1bmtub3duIH0pLkhvamFHYXN0b3NJZCA/P1xyXG4gICAgICAgICAgICAocmF3RGF0YSBhcyB7IGhvamFHYXN0b3NJZD86IHVua25vd24gfSkuaG9qYUdhc3Rvc0lkXHJcbiAgICAgICAgKSB8fCBudWxsLFxyXG4gICAgICBDb21wbGV0ZWRTdGFnZTogc2FmZVRleHQoXHJcbiAgICAgICAgKHJhd0RhdGEgYXMgeyBDb21wbGV0ZWRTdGFnZT86IHVua25vd247IGNvbXBsZXRlZFN0YWdlPzogdW5rbm93biB9KS5Db21wbGV0ZWRTdGFnZSA/P1xyXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBjb21wbGV0ZWRTdGFnZT86IHVua25vd24gfSkuY29tcGxldGVkU3RhZ2VcclxuICAgICAgKSxcclxuICAgICAgU3RlcFRyYWNlSWRzOiBzdGVwVHJhY2VJZHNcclxuICAgICAgICA/IHtcclxuICAgICAgICAgICAgVGlja2V0Q3JlYXRlOiBzYWZlVGV4dChcclxuICAgICAgICAgICAgICAoc3RlcFRyYWNlSWRzIGFzIHsgVGlja2V0Q3JlYXRlPzogdW5rbm93bjsgdGlja2V0Q3JlYXRlPzogdW5rbm93biB9KS5UaWNrZXRDcmVhdGUgPz9cclxuICAgICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyB0aWNrZXRDcmVhdGU/OiB1bmtub3duIH0pLnRpY2tldENyZWF0ZVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBGaWxlVXBsb2FkOiBzYWZlVGV4dChcclxuICAgICAgICAgICAgICAoc3RlcFRyYWNlSWRzIGFzIHsgRmlsZVVwbG9hZD86IHVua25vd247IGZpbGVVcGxvYWQ/OiB1bmtub3duIH0pLkZpbGVVcGxvYWQgPz9cclxuICAgICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyBmaWxlVXBsb2FkPzogdW5rbm93biB9KS5maWxlVXBsb2FkXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIERyYWZ0RXh0cmFjdDogc2FmZVRleHQoXHJcbiAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IERyYWZ0RXh0cmFjdD86IHVua25vd247IGRyYWZ0RXh0cmFjdD86IHVua25vd24gfSkuRHJhZnRFeHRyYWN0ID8/XHJcbiAgICAgICAgICAgICAgICAoc3RlcFRyYWNlSWRzIGFzIHsgZHJhZnRFeHRyYWN0PzogdW5rbm93biB9KS5kcmFmdEV4dHJhY3RcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgVGlja2V0RmluYWxpemU6IHNhZmVUZXh0KFxyXG4gICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyBUaWNrZXRGaW5hbGl6ZT86IHVua25vd247IHRpY2tldEZpbmFsaXplPzogdW5rbm93biB9KS5UaWNrZXRGaW5hbGl6ZSA/P1xyXG4gICAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IHRpY2tldEZpbmFsaXplPzogdW5rbm93biB9KS50aWNrZXRGaW5hbGl6ZVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBTaGVldExpbms6IHNhZmVUZXh0KFxyXG4gICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyBTaGVldExpbms/OiB1bmtub3duOyBzaGVldExpbms/OiB1bmtub3duIH0pLlNoZWV0TGluayA/P1xyXG4gICAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IHNoZWV0TGluaz86IHVua25vd24gfSkuc2hlZXRMaW5rXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgOiBudWxsLFxyXG4gICAgfSxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz5cclxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4gPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICAuLi5yZXNwb25zZSxcclxuICAgIEl0ZW1zOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTx1bmtub3duPlxyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvPiA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEl0ZW1zID0gbm9ybWFsaXplRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVzKHJlc3BvbnNlPy5JdGVtcyk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAuLi5yZXNwb25zZSxcclxuICAgIEl0ZW1zOiBub3JtYWxpemVkSXRlbXMsXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz5cclxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz4gPT4ge1xyXG4gIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+ICh7XHJcbiAgICAuLi5pdGVtLFxyXG4gICAgU3RhdHVzOiB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZShcclxuICAgICAgKGl0ZW0gYXMgeyBTdGF0dXM/OiB1bmtub3duOyBzdGF0dXM/OiB1bmtub3duIH0pPy5TdGF0dXMgPz9cclxuICAgICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LnN0YXR1c1xyXG4gICAgKSxcclxuICAgIFByb2Nlc3NlZEJ5QUk6IHRvTnVsbGFibGVCb29sKFxyXG4gICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8uUHJvY2Vzc2VkQnlBSSA/P1xyXG4gICAgICAgIChpdGVtIGFzIHsgUHJvY2Vzc2VkQnlBST86IHVua25vd247IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pPy5wcm9jZXNzZWRCeUFJXHJcbiAgICApLFxyXG4gICAgR2FzdG9UeXBlOiB0b051bGxhYmxlR2FzdG9UeXBlQ29kZShcclxuICAgICAgKGl0ZW0gYXMgeyBHYXN0b1R5cGU/OiB1bmtub3duOyBnYXN0b1R5cGU/OiB1bmtub3duIH0pPy5HYXN0b1R5cGUgPz9cclxuICAgICAgICAoaXRlbSBhcyB7IEdhc3RvVHlwZT86IHVua25vd247IGdhc3RvVHlwZT86IHVua25vd24gfSk/Lmdhc3RvVHlwZVxyXG4gICAgKSxcclxuICB9KSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAuLi5yZXNwb25zZSxcclxuICAgIEl0ZW1zOiBub3JtYWxpemVkSXRlbXMsXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVUaWNrZXRMaW5rTGlzdFBhZ2VkUmVzcG9uc2UgPSAoXHJcbiAgcmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RJdGVtRHRvPlxyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0bz4gPT4ge1xyXG4gIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+ICh7XHJcbiAgICAuLi5pdGVtLFxyXG4gICAgUHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woXHJcbiAgICAgIChpdGVtIGFzIHsgUHJvY2Vzc2VkQnlBST86IHVua25vd247IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pPy5Qcm9jZXNzZWRCeUFJID8/XHJcbiAgICAgICAgKGl0ZW0gYXMgeyBQcm9jZXNzZWRCeUFJPzogdW5rbm93bjsgcHJvY2Vzc2VkQnlBST86IHVua25vd24gfSk/LnByb2Nlc3NlZEJ5QUlcclxuICAgICksXHJcbiAgICBHYXN0b1R5cGU6IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlKFxyXG4gICAgICAoaXRlbSBhcyB7IEdhc3RvVHlwZT86IHVua25vd247IGdhc3RvVHlwZT86IHVua25vd24gfSk/Lkdhc3RvVHlwZSA/P1xyXG4gICAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uZ2FzdG9UeXBlXHJcbiAgICApLFxyXG4gIH0pKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnJlc3BvbnNlLFxyXG4gICAgSXRlbXM6IG5vcm1hbGl6ZWRJdGVtcyxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2UgPSAoXHJcbiAgcmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvPlxyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldERldGFpbER0bz4gPT4ge1xyXG4gIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+ICh7XHJcbiAgICAuLi5pdGVtLFxyXG4gICAgU3RhdHVzOiB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZShcclxuICAgICAgKGl0ZW0gYXMgeyBTdGF0dXM/OiB1bmtub3duOyBzdGF0dXM/OiB1bmtub3duIH0pPy5TdGF0dXMgPz9cclxuICAgICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LnN0YXR1c1xyXG4gICAgKSxcclxuICAgIFByb2Nlc3NlZEJ5QUk6IHRvTnVsbGFibGVCb29sKFxyXG4gICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8uUHJvY2Vzc2VkQnlBSSA/P1xyXG4gICAgICAgIChpdGVtIGFzIHsgUHJvY2Vzc2VkQnlBST86IHVua25vd247IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pPy5wcm9jZXNzZWRCeUFJXHJcbiAgICApLFxyXG4gICAgSG9qYUdhc3Rvc0lkRGlzcGxheTogc2FmZVRleHQoXHJcbiAgICAgIChpdGVtIGFzIHsgSG9qYUdhc3Rvc0lkRGlzcGxheT86IHVua25vd247IGhvamFHYXN0b3NJZERpc3BsYXk/OiB1bmtub3duIH0pPy5Ib2phR2FzdG9zSWREaXNwbGF5ID8/XHJcbiAgICAgICAgKGl0ZW0gYXMgeyBIb2phR2FzdG9zSWREaXNwbGF5PzogdW5rbm93bjsgaG9qYUdhc3Rvc0lkRGlzcGxheT86IHVua25vd24gfSk/LmhvamFHYXN0b3NJZERpc3BsYXlcclxuICAgICksXHJcbiAgICBHYXN0b1R5cGU6IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlKFxyXG4gICAgICAoaXRlbSBhcyB7IEdhc3RvVHlwZT86IHVua25vd247IGdhc3RvVHlwZT86IHVua25vd24gfSk/Lkdhc3RvVHlwZSA/P1xyXG4gICAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uZ2FzdG9UeXBlXHJcbiAgICApLFxyXG4gICAgTGluZXM6IEFycmF5LmlzQXJyYXkoaXRlbT8uTGluZXMpID8gaXRlbS5MaW5lcyA6IFtdLFxyXG4gIH0pKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnJlc3BvbnNlLFxyXG4gICAgSXRlbXM6IG5vcm1hbGl6ZWRJdGVtcyxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVRpY2tldExpbmtCdWxrUmVzcG9uc2UgPSAoXHJcbiAgcmVzcG9uc2U6IEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvPlxyXG4pOiBJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0bz4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgY29uc3QgcmF3RGF0YSA9IG5vcm1hbGl6ZWQ/LkRhdGE7XHJcbiAgaWYgKCFyYXdEYXRhIHx8IHR5cGVvZiByYXdEYXRhICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICByZXR1cm4gbm9ybWFsaXplZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHRvSXNzdWVMaXN0ID0gKHZhbHVlOiB1bmtub3duKSA9PiB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gW107XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlLm1hcCgoZW50cnkpID0+ICh7XHJcbiAgICAgIHRpY2tldElkOiBzYWZlVGV4dChcclxuICAgICAgICAoZW50cnkgYXMgeyB0aWNrZXRJZD86IHVua25vd247IFRpY2tldElkPzogdW5rbm93biB9KT8udGlja2V0SWQgPz9cclxuICAgICAgICAgIChlbnRyeSBhcyB7IFRpY2tldElkPzogdW5rbm93biB9KS5UaWNrZXRJZFxyXG4gICAgICApLFxyXG4gICAgICByZWFzb246IHNhZmVUZXh0KFxyXG4gICAgICAgIChlbnRyeSBhcyB7IHJlYXNvbj86IHVua25vd247IFJlYXNvbj86IHVua25vd24gfSk/LnJlYXNvbiA/P1xyXG4gICAgICAgICAgKGVudHJ5IGFzIHsgUmVhc29uPzogdW5rbm93biB9KS5SZWFzb25cclxuICAgICAgKSxcclxuICAgIH0pKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBsaW5rZWRUaWNrZXRJZHNSYXcgPVxyXG4gICAgKHJhd0RhdGEgYXMgeyBsaW5rZWRUaWNrZXRJZHM/OiB1bmtub3duOyBMaW5rZWRUaWNrZXRJZHM/OiB1bmtub3duIH0pLmxpbmtlZFRpY2tldElkcyA/P1xyXG4gICAgKHJhd0RhdGEgYXMgeyBMaW5rZWRUaWNrZXRJZHM/OiB1bmtub3duIH0pLkxpbmtlZFRpY2tldElkcztcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLm5vcm1hbGl6ZWQsXHJcbiAgICBEYXRhOiB7XHJcbiAgICAgIGV4cGVuc2VTaGVldElkOiBzYWZlVGV4dChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IGV4cGVuc2VTaGVldElkPzogdW5rbm93bjsgRXhwZW5zZVNoZWV0SWQ/OiB1bmtub3duIH0pLmV4cGVuc2VTaGVldElkID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IEV4cGVuc2VTaGVldElkPzogdW5rbm93biB9KS5FeHBlbnNlU2hlZXRJZFxyXG4gICAgICApLFxyXG4gICAgICByZXF1ZXN0ZWRDb3VudDogdG9OdWxsYWJsZU51bWJlcihcclxuICAgICAgICAocmF3RGF0YSBhcyB7IHJlcXVlc3RlZENvdW50PzogdW5rbm93bjsgUmVxdWVzdGVkQ291bnQ/OiB1bmtub3duIH0pLnJlcXVlc3RlZENvdW50ID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IFJlcXVlc3RlZENvdW50PzogdW5rbm93biB9KS5SZXF1ZXN0ZWRDb3VudFxyXG4gICAgICApID8/IDAsXHJcbiAgICAgIGxpbmtlZENvdW50OiB0b051bGxhYmxlTnVtYmVyKFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgbGlua2VkQ291bnQ/OiB1bmtub3duOyBMaW5rZWRDb3VudD86IHVua25vd24gfSkubGlua2VkQ291bnQgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgTGlua2VkQ291bnQ/OiB1bmtub3duIH0pLkxpbmtlZENvdW50XHJcbiAgICAgICkgPz8gMCxcclxuICAgICAgc2tpcHBlZENvdW50OiB0b051bGxhYmxlTnVtYmVyKFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgc2tpcHBlZENvdW50PzogdW5rbm93bjsgU2tpcHBlZENvdW50PzogdW5rbm93biB9KS5za2lwcGVkQ291bnQgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgU2tpcHBlZENvdW50PzogdW5rbm93biB9KS5Ta2lwcGVkQ291bnRcclxuICAgICAgKSA/PyAwLFxyXG4gICAgICBmYWlsZWRDb3VudDogdG9OdWxsYWJsZU51bWJlcihcclxuICAgICAgICAocmF3RGF0YSBhcyB7IGZhaWxlZENvdW50PzogdW5rbm93bjsgRmFpbGVkQ291bnQ/OiB1bmtub3duIH0pLmZhaWxlZENvdW50ID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IEZhaWxlZENvdW50PzogdW5rbm93biB9KS5GYWlsZWRDb3VudFxyXG4gICAgICApID8/IDAsXHJcbiAgICAgIGxpbmtlZFRpY2tldElkczogQXJyYXkuaXNBcnJheShsaW5rZWRUaWNrZXRJZHNSYXcpXHJcbiAgICAgICAgPyBsaW5rZWRUaWNrZXRJZHNSYXcubWFwKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnkpKS5maWx0ZXIoQm9vbGVhbilcclxuICAgICAgICA6IFtdLFxyXG4gICAgICBza2lwcGVkOiB0b0lzc3VlTGlzdChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IHNraXBwZWQ/OiB1bmtub3duOyBTa2lwcGVkPzogdW5rbm93biB9KS5za2lwcGVkID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IFNraXBwZWQ/OiB1bmtub3duIH0pLlNraXBwZWRcclxuICAgICAgKSxcclxuICAgICAgZmFpbGVkOiB0b0lzc3VlTGlzdChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IGZhaWxlZD86IHVua25vd247IEZhaWxlZD86IHVua25vd24gfSkuZmFpbGVkID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IEZhaWxlZD86IHVua25vd24gfSkuRmFpbGVkXHJcbiAgICAgICksXHJcbiAgICB9LFxyXG4gIH07XHJcbn07XHJcbiIsICJcdUZFRkZpbXBvcnQgdHlwZSB7XHJcbiAgRXhwZW5zZVNoZWV0Q2FyZCxcclxuICBFeHBlbnNlU2hlZXREZXRhaWxEdG8sXHJcbiAgRXhwZW5zZVNoZWV0SGVhZGVyLFxyXG4gIEV4cGVuc2VTaGVldExpbmUsXHJcbiAgRXhwZW5zZVNoZWV0TGluZUR0byxcclxuICBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byxcclxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0LCB0b051bGxhYmxlQm9vbCwgdG9OdWxsYWJsZU51bWJlciB9IGZyb20gXCIuL2V4cGVuc2VBcGlUcmFuc2Zvcm1zLnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VXaW5kb3dSdW50aW1lID0ge1xyXG4gIF9fRVhQRU5TRV9HQVNUT19UWVBFU19fPzogQXJyYXk8e1xyXG4gICAgdmFsdWU/OiB1bmtub3duO1xyXG4gICAgVmFsdWU/OiB1bmtub3duO1xyXG4gICAgdGV4dD86IHVua25vd247XHJcbiAgICBUZXh0PzogdW5rbm93bjtcclxuICB9PjtcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZUdhc3RvVHlwZUVudHJ5ID0gTm9uTnVsbGFibGU8RXhwZW5zZVdpbmRvd1J1bnRpbWVbXCJfX0VYUEVOU0VfR0FTVE9fVFlQRVNfX1wiXT5bbnVtYmVyXTtcclxuXHJcbmNvbnN0IHJlYWRFeHBlbnNlV2luZG93UnVudGltZSA9ICgpOiBFeHBlbnNlV2luZG93UnVudGltZSA9PiB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiB7fTtcclxuICByZXR1cm4gd2luZG93IGFzIHVua25vd24gYXMgRXhwZW5zZVdpbmRvd1J1bnRpbWU7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlVHlwZUxhYmVsID0gKHR5cGVWYWx1ZUNvZGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKCF0eXBlVmFsdWVDb2RlIHx8IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIHJldHVybiB0eXBlVmFsdWVDb2RlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmF3Q2F0YWxvZ1NvdXJjZSA9IHJlYWRFeHBlbnNlV2luZG93UnVudGltZSgpLl9fRVhQRU5TRV9HQVNUT19UWVBFU19fO1xyXG4gIGNvbnN0IHJhd0NhdGFsb2cgPSBBcnJheS5pc0FycmF5KHJhd0NhdGFsb2dTb3VyY2UpID8gcmF3Q2F0YWxvZ1NvdXJjZSA6IFtdO1xyXG4gIGNvbnN0IG1hdGNoID0gcmF3Q2F0YWxvZy5maW5kKChlbnRyeTogRXhwZW5zZUdhc3RvVHlwZUVudHJ5KSA9PiB7XHJcbiAgICBjb25zdCBlbnRyeUNvZGUgPSBzYWZlVGV4dChlbnRyeT8udmFsdWUgfHwgZW50cnk/LlZhbHVlKTtcclxuICAgIHJldHVybiBlbnRyeUNvZGUgPT09IHR5cGVWYWx1ZUNvZGU7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBzYWZlVGV4dChtYXRjaD8udGV4dCB8fCBtYXRjaD8uVGV4dCkgfHwgdHlwZVZhbHVlQ29kZTtcclxufTtcclxuXHJcbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9saXN0IGl0ZW0gY29udHJhY3QgdG8gbGlzdCBjYXJkIFVJIG1vZGVsLlxyXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmQgPSAoaXRlbTogRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8pOiBFeHBlbnNlU2hlZXRDYXJkID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgaG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChpdGVtLkhvamFHYXN0b3NJZCksXHJcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQoaXRlbS5EZXNjcmlwdGlvbiksXHJcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5FeHBlbnNlU2hlZXRTdGF0dXMpLFxyXG4gICAgZXN0YWRvQ29tZW50YXJpb3M6IHNhZmVUZXh0KGl0ZW0uRXN0YWRvQ29tZW50YXJpb3MpIHx8IG51bGwsXHJcbiAgICB1c2VySWQ6IHNhZmVUZXh0KGl0ZW0uVXNlcklkKSxcclxuICAgIHVzZXJOYW1lOiBzYWZlVGV4dChpdGVtLlVzZXJOYW1lKSB8fCBudWxsLFxyXG4gICAgdm91Y2hlcjogc2FmZVRleHQoaXRlbS5Wb3VjaGVyKSxcclxuICAgIHByb2pJZDogc2FmZVRleHQoaXRlbS5Qcm9qSWQpLFxyXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChpdGVtLkN1cnJlbmN5Q29kZSksXHJcbiAgICB0b3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihpdGVtLlRvdGFsQW1vdW50KSxcclxuICAgIGV4Y2hSYXRlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uRXhjaFJhdGUpLFxyXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogdG9OdWxsYWJsZU51bWJlcihpdGVtLkV4Y2hhbmdlUmF0ZU1vZGUpLFxyXG4gICAgY3JlYXRlZERhdGU6IHNhZmVUZXh0KGl0ZW0uQ3JlYXRlZERhdGUpLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0gaGVhZGVyIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxyXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0SGVhZGVyID0gKHNoZWV0OiBFeHBlbnNlU2hlZXREZXRhaWxEdG8pOiBFeHBlbnNlU2hlZXRIZWFkZXIgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBob2phR2FzdG9zSWQ6IHNhZmVUZXh0KHNoZWV0LkhvamFHYXN0b3NJZCksXHJcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQoc2hlZXQuRGVzY3JpcHRpb24pLFxyXG4gICAgdXNlcklkOiBzYWZlVGV4dChzaGVldC5Vc2VySWQpLFxyXG4gICAgZXhwZW5zZVNoZWV0U3RhdHVzOiB0b051bGxhYmxlTnVtYmVyKHNoZWV0LkV4cGVuc2VTaGVldFN0YXR1cyksXHJcbiAgICBlc3RhZG9Db21lbnRhcmlvczogc2FmZVRleHQoc2hlZXQuRXN0YWRvQ29tZW50YXJpb3MpIHx8IG51bGwsXHJcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KHNoZWV0LkN1cnJlbmN5Q29kZSksXHJcbiAgICB0b3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihzaGVldC5Ub3RhbEFtb3VudCksXHJcbiAgICBleGNoUmF0ZTogc2FmZVRleHQoc2hlZXQuRXhjaFJhdGUpLFxyXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogdG9OdWxsYWJsZU51bWJlcihzaGVldC5FeGNoYW5nZVJhdGVNb2RlKSxcclxuICAgIHByb2pJZDogc2FmZVRleHQoc2hlZXQuUHJvaklkKSxcclxuICAgIHZvdWNoZXI6IHNhZmVUZXh0KHNoZWV0LlZvdWNoZXIpLFxyXG4gICAgY3JlYXRlZERhdGU6IHNhZmVUZXh0KHNoZWV0LkNyZWF0ZWREYXRlKSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gTWFwcyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9IGxpbmUgY29udHJhY3QgdG8gVUkgbW9kZWwuXHJcbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRMaW5lID0gKGxpbmU6IEV4cGVuc2VTaGVldExpbmVEdG8pOiBFeHBlbnNlU2hlZXRMaW5lID0+IHtcclxuICBjb25zdCB0eXBlVmFsdWVDb2RlID0gc2FmZVRleHQobGluZS5UeXBlVmFsdWUpO1xyXG4gIGNvbnN0IGxlZ2FjeVByaWNlID0gKGxpbmUgYXMgeyBwcmljZT86IHVua25vd24gfSkucHJpY2U7XHJcbiAgY29uc3QgbGVnYWN5RmlsZUlkID0gKGxpbmUgYXMgeyBmaWxlSWQ/OiB1bmtub3duIH0pLmZpbGVJZDtcclxuICBjb25zdCBleHBsaWNpdExpbmVSZWNJZCA9IHNhZmVUZXh0KFxyXG4gICAgKGxpbmUgYXMgeyBMaW5lUmVjSWQ/OiB1bmtub3duOyBsaW5lUmVjSWQ/OiB1bmtub3duIH0pLkxpbmVSZWNJZCA/P1xyXG4gICAgICAobGluZSBhcyB7IGxpbmVSZWNJZD86IHVua25vd24gfSkubGluZVJlY0lkXHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGxpbmVSZWNJZDogZXhwbGljaXRMaW5lUmVjSWQgfHwgc2FmZVRleHQobGluZS5SZWNJZCksXHJcbiAgICB0cmFuc0RhdGU6IHNhZmVUZXh0KGxpbmUuVHJhbnNEYXRlKSxcclxuICAgIHR5cGVWYWx1ZUNvZGUsXHJcbiAgICB0eXBlVmFsdWU6IHJlc29sdmVUeXBlTGFiZWwodHlwZVZhbHVlQ29kZSksXHJcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQobGluZS5EZXNjcmlwdGlvbiksXHJcbiAgICBpbnRlcm5hY2lvbmFsOiB0b051bGxhYmxlQm9vbChsaW5lLkludGVybmFjaW9uYWwpLFxyXG4gICAgZmlsZUlkOiBzYWZlVGV4dChsaW5lLkZpbGVJZCA/PyBsZWdhY3lGaWxlSWQpLFxyXG4gICAgdGlja2V0OiB0b051bGxhYmxlQm9vbChsaW5lLlRpY2tldCksXHJcbiAgICBwcmljZTogdG9OdWxsYWJsZU51bWJlcihsaW5lLlByaWNlID8/IGxlZ2FjeVByaWNlKSxcclxuICAgIHF0eTogdG9OdWxsYWJsZU51bWJlcihsaW5lLlF0eSksXHJcbiAgICBhbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIobGluZS5BbW91bnQpLFxyXG4gICAgcHJvaklkOiBzYWZlVGV4dChsaW5lLlByb2pJZCksXHJcbiAgICBpbmRBdHRhY2hGaWxlczogc2FmZVRleHQobGluZS5JbmRBdHRhY2hGaWxlcyksXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHBhcnNlRXhwZW5zZUFwaURhdGUgfSBmcm9tIFwiLi9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBFeHBlbnNlRGF0ZVBhcnRzID0ge1xyXG4gIHllYXI6IHN0cmluZztcclxuICBtb250aDogc3RyaW5nO1xyXG4gIGRheTogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBQYXJzZUV4cGVuc2VEYXRlT3B0aW9ucyA9IHtcclxuICBwcmVmZXJNb250aEZpcnN0T25TbGFzaD86IGJvb2xlYW47XHJcbn07XHJcblxyXG5jb25zdCBCQVNRVUVfTU9OVEhTX1NIT1JUID0gW1xyXG4gIFwidXJ0XCIsXHJcbiAgXCJvdHNcIixcclxuICBcIm1hclwiLFxyXG4gIFwiYXBpXCIsXHJcbiAgXCJtYWlcIixcclxuICBcImVrYVwiLFxyXG4gIFwidXp0XCIsXHJcbiAgXCJhYnVcIixcclxuICBcImlyYVwiLFxyXG4gIFwidXJyXCIsXHJcbiAgXCJhemFcIixcclxuICBcImFiZVwiLFxyXG5dO1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVWlMb2NhbGUgPSAobG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKGxvY2FsZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiZXMtRVNcIjtcclxuICBpZiAoL156aC1oYW5zL2kudGVzdCh2YWx1ZSkpIHJldHVybiBcInpoLUNOXCI7XHJcbiAgcmV0dXJuIHZhbHVlO1xyXG59O1xyXG5cclxuY29uc3QgaXNCYXNxdWVMb2NhbGUgPSAobG9jYWxlOiBzdHJpbmcpOiBib29sZWFuID0+IC9eZXVcXGIvaS50ZXN0KFN0cmluZyhsb2NhbGUgfHwgXCJcIikpO1xyXG5cclxuLy8gTm9ybWFsaXplIHVua25vd24gdmFsdWVzIHRvIGEgdHJpbW1lZCBzdHJpbmcuXG5leHBvcnQgY29uc3Qgc2FmZVRleHQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XG4gIHJldHVybiBTdHJpbmcodmFsdWUpLnRyaW0oKTtcbn07XG5cbi8vIENsZWFucyBjaGF0IHRleHQgd2hpbGUgcHJlc2VydmluZyBhY2NlbnRzIGFuZCByZWFkYWJsZSBwdW5jdHVhdGlvbi5cbmV4cG9ydCBjb25zdCBzYW5pdGl6ZUFzc2lzdGFudFRleHQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBzb3VyY2UgPSBzYWZlVGV4dCh2YWx1ZSk7XG4gIGlmICghc291cmNlKSByZXR1cm4gXCJcIjtcblxuICByZXR1cm4gc291cmNlXG4gICAgLm5vcm1hbGl6ZShcIk5GQ1wiKVxuICAgIC5yZXBsYWNlKC9cXHVGRUZGL2csIFwiXCIpXG4gICAgLnJlcGxhY2UoL1tcXHUwMDAwLVxcdTAwMDhcXHUwMDBCXFx1MDAwQ1xcdTAwMEUtXFx1MDAxRlxcdTAwN0ZdL2csIFwiXCIpXG4gICAgLnJlcGxhY2UoL1tcXHUyMDBCLVxcdTIwMERcXHUyMDYwXS9nLCBcIlwiKVxuICAgIC5yZXBsYWNlKC9cXHJcXG4/L2csIFwiXFxuXCIpXG4gICAgLnJlcGxhY2UoL1sgXFx0XStcXG4vZywgXCJcXG5cIilcbiAgICAucmVwbGFjZSgvXFxuezMsfS9nLCBcIlxcblxcblwiKVxuICAgIC50cmltKCk7XG59O1xuXHJcbi8vIE5vcm1hbGl6ZXMgY2FyZCB0aXRsZSB0ZXh0IG9ubHkgd2hlbiBpdCBjb21lcyBpbiBmdWxsIHVwcGVyIG9yIGZ1bGwgbG93ZXIgY2FzZS5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUNhcmRUaXRsZVRleHQgPSAodmFsdWU6IHVua25vd24sIGZhbGxiYWNrID0gXCItXCIpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHNvdXJjZSA9IHNhZmVUZXh0KHZhbHVlKTtcclxuICBpZiAoIXNvdXJjZSkgcmV0dXJuIGZhbGxiYWNrO1xyXG5cclxuICBjb25zdCBoYXNMZXR0ZXJzID0gL1tBLVphLXpcdTAwQzAtXHUwMEQ2XHUwMEQ4LVx1MDBGNlx1MDBGOC1cdTAwRkZdLy50ZXN0KHNvdXJjZSk7XHJcbiAgaWYgKCFoYXNMZXR0ZXJzKSByZXR1cm4gc291cmNlO1xyXG5cclxuICBjb25zdCBpc0FsbFVwcGVyID0gc291cmNlID09PSBzb3VyY2UudG9VcHBlckNhc2UoKSAmJiBzb3VyY2UgIT09IHNvdXJjZS50b0xvd2VyQ2FzZSgpO1xyXG4gIGNvbnN0IGlzQWxsTG93ZXIgPSBzb3VyY2UgPT09IHNvdXJjZS50b0xvd2VyQ2FzZSgpICYmIHNvdXJjZSAhPT0gc291cmNlLnRvVXBwZXJDYXNlKCk7XHJcbiAgaWYgKCFpc0FsbFVwcGVyICYmICFpc0FsbExvd2VyKSB7XHJcbiAgICByZXR1cm4gc291cmNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbG93ZXIgPSBzb3VyY2UudG9Mb3dlckNhc2UoKTtcclxuICByZXR1cm4gYCR7bG93ZXIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCl9JHtsb3dlci5zbGljZSgxKX1gO1xyXG59O1xyXG5cclxuLy8gUmV0dXJucyB0cnVlIG9ubHkgd2hlbiB2b3VjaGVyIGhhcyBhIG1lYW5pbmdmdWwgYXNzaWduZWQgdmFsdWUuXHJcbmV4cG9ydCBjb25zdCBoYXNBc3NpZ25lZFZvdWNoZXIgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICBjb25zdCB2b3VjaGVyID0gc2FmZVRleHQodmFsdWUpLnRvVXBwZXJDYXNlKCk7XHJcbiAgaWYgKCF2b3VjaGVyKSByZXR1cm4gZmFsc2U7XHJcbiAgcmV0dXJuIHZvdWNoZXIgIT09IFwiLVwiICYmIHZvdWNoZXIgIT09IFwiLlwiICYmIHZvdWNoZXIgIT09IFwiMFwiO1xyXG59O1xyXG5cclxuLy8gUmV0dXJuIGRhdGUgYXQgbG9jYWwgZGF5IHN0YXJ0LlxyXG5leHBvcnQgY29uc3Qgc3RhcnRPZkRheSA9IChkYXRlOiBEYXRlKTogRGF0ZSA9PiB7XHJcbiAgcmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSk7XHJcbn07XHJcblxyXG4vLyBGb3JtYXQgbG9jYWwgZGF0ZSB0byB5eXl5LU1NLWRkLlxyXG5leHBvcnQgY29uc3QgdG9Jc29EYXRlID0gKGRhdGU6IERhdGUpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBgJHtkYXRlLmdldEZ1bGxZZWFyKCl9LSR7U3RyaW5nKGRhdGUuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKX0tJHtTdHJpbmcoZGF0ZS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKX1gO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlRGF0ZSA9ICh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKTogRGF0ZSB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IGNhbmRpZGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcclxuICBpZiAoXHJcbiAgICBOdW1iZXIuaXNOYU4oY2FuZGlkYXRlLmdldFRpbWUoKSkgfHxcclxuICAgIGNhbmRpZGF0ZS5nZXRGdWxsWWVhcigpICE9PSB5ZWFyIHx8XHJcbiAgICBjYW5kaWRhdGUuZ2V0TW9udGgoKSAhPT0gbW9udGggLSAxIHx8XHJcbiAgICBjYW5kaWRhdGUuZ2V0RGF0ZSgpICE9PSBkYXlcclxuICApIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGNhbmRpZGF0ZTtcclxufTtcclxuXHJcbi8vIFBhcnNlIHN1cHBvcnRlZCBBUEkgZGF0ZSBmb3JtYXRzLlxyXG5leHBvcnQgY29uc3QgcGFyc2VFeHBlbnNlRGF0ZSA9IChyYXc/OiBzdHJpbmcsIG9wdGlvbnM/OiBQYXJzZUV4cGVuc2VEYXRlT3B0aW9ucyk6IERhdGUgfCBudWxsID0+IHtcclxuICBpZiAoIXJhdykgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcocmF3KS50cmltKCk7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IGRhdGVPbmx5ID0gdmFsdWUuc3BsaXQoXCJUXCIpWzBdLnNwbGl0KFwiIFwiKVswXTtcclxuXHJcbiAgLy8gS2VlcCBvcHRpb25hbCBtb250aC1maXJzdCBjb21wYXRpYmlsaXR5IGZvciBsZWdhY3kgc2xhc2ggZGF0ZXMgaW4gY2FyZHMuXHJcbiAgaWYgKG9wdGlvbnM/LnByZWZlck1vbnRoRmlyc3RPblNsYXNoICYmIC9eXFxkezJ9XFwvXFxkezJ9XFwvXFxkezR9JC8udGVzdChkYXRlT25seSkpIHtcclxuICAgIGNvbnN0IFtmaXJzdFBhcnQsIHNlY29uZFBhcnQsIHllYXJQYXJ0XSA9IGRhdGVPbmx5LnNwbGl0KC9bLi8tXS8pO1xyXG4gICAgY29uc3QgZmlyc3QgPSBOdW1iZXIoZmlyc3RQYXJ0KTtcclxuICAgIGNvbnN0IHNlY29uZCA9IE51bWJlcihzZWNvbmRQYXJ0KTtcclxuICAgIGNvbnN0IHllYXIgPSBOdW1iZXIoeWVhclBhcnQpO1xyXG4gICAgY29uc3QgbW9udGhGaXJzdERhdGUgPSBidWlsZEV4cGVuc2VEYXRlKHllYXIsIGZpcnN0LCBzZWNvbmQpO1xyXG4gICAgaWYgKG1vbnRoRmlyc3REYXRlKSB7XHJcbiAgICAgIHJldHVybiBtb250aEZpcnN0RGF0ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBwYXJzZUV4cGVuc2VBcGlEYXRlKHZhbHVlKTtcclxufTtcclxuXHJcbi8vIEZvcm1hdCBhIGRhdGUgZm9yIHJlYWQtb25seSBmaWVsZHMgdXNpbmcgdGhlIHNhbWUgb3V0cHV0IHN0eWxlIGFzIHZpc2l0cy5cclxuZXhwb3J0IGNvbnN0IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSA9IChyYXc/OiBzdHJpbmcsIGxvY2FsZSA9IFwiZXMtRVNcIiwgZmFsbGJhY2sgPSBcIi1cIik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgZGF0ZSA9IHBhcnNlRXhwZW5zZURhdGUocmF3KTtcclxuICBpZiAoIWRhdGUpIHJldHVybiBmYWxsYmFjaztcclxuXHJcbiAgY29uc3Qgc2FmZUxvY2FsZSA9IG5vcm1hbGl6ZVVpTG9jYWxlKGxvY2FsZSk7XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKHNhZmVMb2NhbGUpKSB7XHJcbiAgICByZXR1cm4gYCR7ZGF0ZS5nZXREYXRlKCl9ICR7QkFTUVVFX01PTlRIU19TSE9SVFtkYXRlLmdldE1vbnRoKCldfSAke2RhdGUuZ2V0RnVsbFllYXIoKX1gLnRvTG93ZXJDYXNlKCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZGF0ZVxyXG4gICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhzYWZlTG9jYWxlLCB7XHJcbiAgICAgIGRheTogXCJudW1lcmljXCIsXHJcbiAgICAgIG1vbnRoOiBcInNob3J0XCIsXHJcbiAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxyXG4gICAgfSlcclxuICAgIC5yZXBsYWNlKC9cXC4vZywgXCJcIilcclxuICAgIC50b0xvd2VyQ2FzZSgpO1xyXG59O1xyXG5cclxuLy8gQnVpbGQgdGltZWxpbmUgZGF0ZSBmcmFnbWVudHMgZm9yIGNhcmQgbGVmdCBwYW5lbC5cclxuZXhwb3J0IGNvbnN0IGZvcm1hdEV4cGVuc2VEYXRlUGFydHMgPSAocmF3Pzogc3RyaW5nLCBsb2NhbGUgPSBcImVzLUVTXCIsIG9wdGlvbnM/OiBQYXJzZUV4cGVuc2VEYXRlT3B0aW9ucyk6IEV4cGVuc2VEYXRlUGFydHMgPT4ge1xyXG4gIGNvbnN0IGRhdGUgPSBwYXJzZUV4cGVuc2VEYXRlKHJhdywgb3B0aW9ucyk7XHJcbiAgaWYgKCFkYXRlKSB7XHJcbiAgICByZXR1cm4geyB5ZWFyOiBcIlwiLCBtb250aDogXCJcIiwgZGF5OiBcIi0tXCIgfTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB5ZWFyOiBTdHJpbmcoZGF0ZS5nZXRGdWxsWWVhcigpKSxcclxuICAgIG1vbnRoOiBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgbW9udGg6IFwic2hvcnRcIiB9KS5yZXBsYWNlKC9cXC4vZywgXCJcIikudG9VcHBlckNhc2UoKSxcclxuICAgIGRheTogU3RyaW5nKGRhdGUuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIiksXHJcbiAgfTtcclxufTtcclxuIiwgInR5cGUgQ29tcGFueVNlbGVjdGlvbkNhbmRpZGF0ZSA9IHtcclxuICBjb21wYW55SWQ6IHN0cmluZztcclxuICBpc0RlZmF1bHQ/OiBib29sZWFuO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplQ29tcGFueUlkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcclxuXHJcbmNvbnN0IGZpbmRDb21wYW55TWF0Y2ggPSAoXHJcbiAgY2FuZGlkYXRlczogQ29tcGFueVNlbGVjdGlvbkNhbmRpZGF0ZVtdLFxyXG4gIHJlcXVlc3RlZENvbXBhbnlJZDogc3RyaW5nXHJcbik6IENvbXBhbnlTZWxlY3Rpb25DYW5kaWRhdGUgfCBudWxsID0+IHtcclxuICBpZiAoIXJlcXVlc3RlZENvbXBhbnlJZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGZvciAoY29uc3QgY2FuZGlkYXRlIG9mIGNhbmRpZGF0ZXMpIHtcclxuICAgIGlmIChub3JtYWxpemVDb21wYW55SWQoY2FuZGlkYXRlLmNvbXBhbnlJZCkgPT09IHJlcXVlc3RlZENvbXBhbnlJZCkge1xyXG4gICAgICByZXR1cm4gY2FuZGlkYXRlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG4vLyBSZXNvbHZlcyB0aGUgZWZmZWN0aXZlIGNvbXBhbnkgZm9yIEFQSSBjYWxsczogbWFudWFsIHNlbGVjdGlvbiB3aW5zIG9ubHkgd2hlbiBpdCBleGlzdHMgaW4gdGhlIGN1cnJlbnQgY29udGV4dC5cclxuZXhwb3J0IGNvbnN0IHJlc29sdmVFZmZlY3RpdmVDb21wYW55SWQgPSAoXHJcbiAgc2VsZWN0ZWRDb21wYW55SWQ6IHVua25vd24sXHJcbiAgY29tcGFuaWVzOiBDb21wYW55U2VsZWN0aW9uQ2FuZGlkYXRlW10sXHJcbiAgZGVmYXVsdENvbXBhbnlJZD86IHVua25vd25cclxuKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkU2VsZWN0ZWRDb21wYW55SWQgPSBub3JtYWxpemVDb21wYW55SWQoc2VsZWN0ZWRDb21wYW55SWQpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWREZWZhdWx0Q29tcGFueUlkID0gbm9ybWFsaXplQ29tcGFueUlkKGRlZmF1bHRDb21wYW55SWQpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRDb21wYW5pZXMgPSBBcnJheS5pc0FycmF5KGNvbXBhbmllcylcclxuICAgID8gY29tcGFuaWVzLmZpbHRlcigoY2FuZGlkYXRlKSA9PiBub3JtYWxpemVDb21wYW55SWQoY2FuZGlkYXRlLmNvbXBhbnlJZCkpXHJcbiAgICA6IFtdO1xyXG5cclxuICBjb25zdCBzZWxlY3RlZE1hdGNoID0gZmluZENvbXBhbnlNYXRjaChub3JtYWxpemVkQ29tcGFuaWVzLCBub3JtYWxpemVkU2VsZWN0ZWRDb21wYW55SWQpO1xyXG4gIGlmIChzZWxlY3RlZE1hdGNoKSB7XHJcbiAgICByZXR1cm4gc2VsZWN0ZWRNYXRjaC5jb21wYW55SWQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkZWZhdWx0TWF0Y2ggPVxyXG4gICAgZmluZENvbXBhbnlNYXRjaChub3JtYWxpemVkQ29tcGFuaWVzLCBub3JtYWxpemVkRGVmYXVsdENvbXBhbnlJZCkgfHxcclxuICAgIG5vcm1hbGl6ZWRDb21wYW5pZXMuZmluZCgoY2FuZGlkYXRlKSA9PiBjYW5kaWRhdGUuaXNEZWZhdWx0ID09PSB0cnVlKSB8fFxyXG4gICAgbm9ybWFsaXplZENvbXBhbmllc1swXSB8fFxyXG4gICAgbnVsbDtcclxuXHJcbiAgcmV0dXJuIGRlZmF1bHRNYXRjaD8uY29tcGFueUlkIHx8IFwiXCI7XHJcbn07XHJcbiIsICJpbXBvcnQge1xyXG4gIEFwaUZldGNoRXJyb3IsXHJcbiAgZmV0Y2hKc29uLFxyXG4gIGdldENzcmZUb2tlbixcclxuICBoYW5kbGVBcGlBdXRoRmFpbHVyZSxcclxuICByZWFkQXBpTWVzc2FnZUZyb21SYXcsXHJcbiAgdHlwZSBBcGlGZXRjaE9wdGlvbnMsXHJcbn0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHR5cGUge1xyXG4gIEVudHJhQ29udGV4dER0byxcclxuICBFbnRyYUNvbnRleHRSZXF1ZXN0LFxyXG4gIEV4Y2hhbmdlUmF0ZUR0byxcclxuICBGdWVsUHJpY2VLbUR0byxcclxuICBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0byxcclxuICBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldENyZWF0ZVJlc3BvbnNlRGF0YSxcclxuICBFeHBlbnNlU2hlZXREZXRhaWxEdG8sXHJcbiAgRXhwZW5zZVNoZWV0RHJhZnRSZXNwb25zZSxcclxuICBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldExpbmVEdG8sXHJcbiAgRXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlc3BvbnNlRGF0YSxcclxuICBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byxcclxuICBFeHBlbnNlU2hlZXRMaXN0UmVzcG9uc2VFbnZlbG9wZSxcclxuICBFeHBlbnNlU2hlZXRzQXNrUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRzQXNrUmVzcG9uc2VEYXRhLFxyXG4gIEV4cGVuc2VTaGVldHNBc2tSZXN1bHQsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0Q3JlYXRlUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXREZXRhaWxEdG8sXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdFJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVzdWx0LFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmVSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvLFxyXG4gIEluZEFwaVJlc3BvbnNlLFxyXG4gIEluZFBhZ2VkUmVzcG9uc2UsXHJcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGlzTm9uTmVnYXRpdmVOdW1iZXIgYXMgaXNOb25OZWdhdGl2ZU51bWJlclRyYW5zZm9ybSxcclxuICBpc1Bvc2l0aXZlTnVtYmVyIGFzIGlzUG9zaXRpdmVOdW1iZXJUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlciBhcyBub3JtYWxpemVFeHBlbnNlU2hlZXRMaXN0U3RhdHVzRmlsdGVyVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlIGFzIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSSBhcyBub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUlUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRTdGF0dXMgYXMgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRTdGF0dXNUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlIGFzIG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVSZXF1aXJlZEFwaURhdGUgYXMgbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZVRpY2tldExpc3REYXRlIGFzIG5vcm1hbGl6ZVRpY2tldExpc3REYXRlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZVRpY2tldExpc3RHYXN0b1R5cGUgYXMgbm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZVRyYW5zZm9ybSxcclxuICBzYWZlVGV4dCBhcyBzYWZlVGV4dFRyYW5zZm9ybSxcclxuICB0b0ZsYWdCb29sIGFzIHRvRmxhZ0Jvb2xUcmFuc2Zvcm0sXHJcbiAgdG9OdWxsYWJsZUJvb2wgYXMgdG9OdWxsYWJsZUJvb2xUcmFuc2Zvcm0sXHJcbiAgdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUgYXMgdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGVUcmFuc2Zvcm0sXHJcbiAgdG9OdWxsYWJsZU51bWJlciBhcyB0b051bGxhYmxlTnVtYmVyVHJhbnNmb3JtLFxyXG4gIHRvTnVsbGFibGVUaWNrZXRTdGF0dXNDb2RlIGFzIHRvTnVsbGFibGVUaWNrZXRTdGF0dXNDb2RlVHJhbnNmb3JtLFxyXG59IGZyb20gXCIuL2V4cGVuc2VBcGlUcmFuc2Zvcm1zLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgbm9ybWFsaXplQXBpUmVzcG9uc2UgYXMgbm9ybWFsaXplQXBpUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlIGFzIG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlIGFzIG5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UgYXMgbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZVRpY2tldExpbmtCdWxrUmVzcG9uc2UgYXMgbm9ybWFsaXplVGlja2V0TGlua0J1bGtSZXNwb25zZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVUaWNrZXRMaW5rTGlzdFBhZ2VkUmVzcG9uc2UgYXMgbm9ybWFsaXplVGlja2V0TGlua0xpc3RQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2UgYXMgbm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVUaWNrZXRRdWlja0NyZWF0ZVJlc3BvbnNlIGFzIG5vcm1hbGl6ZVRpY2tldFF1aWNrQ3JlYXRlUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2UgYXMgbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbn0gZnJvbSBcIi4vZXhwZW5zZUFwaVJlc3BvbnNlTm9ybWFsaXplcnMudHNcIjtcclxuaW1wb3J0IHtcclxuICBtYXBFeHBlbnNlU2hlZXRIZWFkZXIgYXMgbWFwRXhwZW5zZVNoZWV0SGVhZGVyQ29yZSxcclxuICBtYXBFeHBlbnNlU2hlZXRMaW5lIGFzIG1hcEV4cGVuc2VTaGVldExpbmVDb3JlLFxyXG4gIG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkIGFzIG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkQ29yZSxcclxufSBmcm9tIFwiLi9leHBlbnNlQXBpTWFwcGVycy50c1wiO1xyXG5pbXBvcnQgeyBzYW5pdGl6ZUFzc2lzdGFudFRleHQgfSBmcm9tIFwiLi9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFIH0gZnJvbSBcIi4vZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlIH0gZnJvbSBcIi4vZXhwZW5zZUFjdGluZ1VzZXIudHNcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZUVmZmVjdGl2ZUNvbXBhbnlJZCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jb21wYW55U2VsZWN0aW9uLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxudHlwZSBQcm9qZWN0RHJvcGRvd25SZXNwb25zZSA9IHtcclxuICB0b3RhbD86IG51bWJlcjtcclxuICBpdGVtcz86IEFycmF5PHsgdmFsdWU/OiBzdHJpbmc7IHRleHQ/OiBzdHJpbmcgfT47XHJcbn07XHJcblxyXG50eXBlIExlZ2FjeUV4cGVuc2VMaXN0SXRlbSA9IHtcclxuICBob2phR2FzdG9zSWQ/OiB1bmtub3duO1xyXG4gIGRlc2NyaXB0aW9uPzogdW5rbm93bjtcclxuICBlc3RhZG9Db21lbnRhcmlvcz86IHVua25vd247XHJcbiAgdm91Y2hlcj86IHVua25vd247XHJcbiAgcHJvaklkPzogdW5rbm93bjtcclxuICBjdXJyZW5jeUNvZGU/OiB1bmtub3duO1xyXG4gIHRvdGFsQW1vdW50PzogdW5rbm93bjtcclxuICB0b3RhbEFtb3VudE1TVD86IHVua25vd247XHJcbiAgZXhjaFJhdGU/OiB1bmtub3duO1xyXG4gIHVzZXJJZD86IHVua25vd247XHJcbiAgdXNlck5hbWU/OiB1bmtub3duO1xyXG4gIGV4Y2hhbmdlUmF0ZU1vZGU/OiB1bmtub3duO1xyXG4gIGV4cGVuc2VTaGVldFN0YXR1cz86IHVua25vd247XHJcbiAgY3JlYXRlZERhdGU/OiB1bmtub3duO1xyXG59O1xyXG5cclxudHlwZSBMZWdhY3lFeHBlbnNlTGlzdFJlc3BvbnNlID0ge1xyXG4gIHN1Y2Nlc3M/OiBib29sZWFuO1xyXG4gIG1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgdG90YWw/OiBudW1iZXI7XHJcbiAgcGFnZT86IG51bWJlcjtcclxuICBwYWdlU2l6ZT86IG51bWJlcjtcclxuICBpdGVtcz86IExlZ2FjeUV4cGVuc2VMaXN0SXRlbVtdO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlQXBpQ29udGV4dCA9IHtcclxuICB0b2tlbjogc3RyaW5nO1xyXG4gIGNvbXBhbnlJZDogc3RyaW5nO1xyXG4gIGF4VXNlcklkOiBzdHJpbmc7XHJcbiAgY3JtVXNlcklkOiBzdHJpbmc7XHJcbiAgZGVmYXVsdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGJvb2xlYW47XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBFeHBlbnNlQXBpQ29udGV4dFNuYXBzaG90ID0ge1xyXG4gIGNvbXBhbnlJZDogc3RyaW5nO1xyXG4gIGF4VXNlcklkOiBzdHJpbmc7XHJcbiAgY3JtVXNlcklkOiBzdHJpbmc7XHJcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZUFwaUF1dGhTZWVkID0ge1xyXG4gIHRva2VuOiBzdHJpbmc7XHJcbiAgZW50cmFPaWQ6IHN0cmluZztcclxuICBhcHBDb2RlOiBzdHJpbmc7XHJcbiAgc3RyaWN0QXBpUm91dGVzOiBib29sZWFuO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlV2luZG93UnVudGltZSA9IHtcclxuICBfX0lORF9BUElfVE9LRU5fXz86IHN0cmluZztcclxuICBfX0lORF9FTlRSQV9PSURfXz86IHN0cmluZztcclxuICBfX0lORF9BUFBfQ09ERV9fPzogc3RyaW5nO1xyXG4gIF9fSU5EX1NFTEVDVEVEX0NPTVBBTllfXz86IHN0cmluZztcclxuICBfX0lORF9FWFBFTlNFX1NUUklDVF9BUElfXz86IGJvb2xlYW4gfCBzdHJpbmc7XHJcbiAgX19FWFBFTlNFX0dBU1RPX1RZUEVTX18/OiBBcnJheTx7XHJcbiAgICB2YWx1ZT86IHVua25vd247XHJcbiAgICBWYWx1ZT86IHVua25vd247XHJcbiAgICB0ZXh0PzogdW5rbm93bjtcclxuICAgIFRleHQ/OiB1bmtub3duO1xyXG4gIH0+O1xyXG59O1xyXG5cclxuY29uc3QgREVGQVVMVF9BUFBfQ09ERSA9IFwiQ1JNXCI7XHJcbmNvbnN0IEpTT05fSEVBREVSUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcclxuICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxufTtcclxuXHJcbmxldCBydW50aW1lQXV0aFNlZWQ6IFBhcnRpYWw8RXhwZW5zZUFwaUF1dGhTZWVkPiA9IHt9O1xyXG5sZXQgY2FjaGVkQ29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQgfCBudWxsID0gbnVsbDtcclxubGV0IGNhY2hlZENvbnRleHRLZXkgPSBcIlwiO1xyXG5sZXQgY29udGV4dFByb21pc2U6IFByb21pc2U8RXhwZW5zZUFwaUNvbnRleHQ+IHwgbnVsbCA9IG51bGw7XHJcbmNvbnN0IGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzID0gbmV3IE1hcDxzdHJpbmcsIEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+PigpO1xyXG5jb25zdCBwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cyA9IG5ldyBNYXA8c3RyaW5nLCBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+Pj4oKTtcclxuXHJcbmNvbnN0IHNhZmVUZXh0ID0gc2FmZVRleHRUcmFuc2Zvcm07XHJcblxyXG5jb25zdCB0b051bGxhYmxlTnVtYmVyID0gdG9OdWxsYWJsZU51bWJlclRyYW5zZm9ybTtcclxuY29uc3QgaXNOb25OZWdhdGl2ZU51bWJlciA9IGlzTm9uTmVnYXRpdmVOdW1iZXJUcmFuc2Zvcm07XHJcbmNvbnN0IGlzUG9zaXRpdmVOdW1iZXIgPSBpc1Bvc2l0aXZlTnVtYmVyVHJhbnNmb3JtO1xyXG5jb25zdCB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZSA9IHRvTnVsbGFibGVUaWNrZXRTdGF0dXNDb2RlVHJhbnNmb3JtO1xyXG5jb25zdCB0b051bGxhYmxlR2FzdG9UeXBlQ29kZSA9IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZSA9IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVUaWNrZXRMaXN0R2FzdG9UeXBlID0gbm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRTdGF0dXMgPSBub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1c1RyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVSZXF1aXJlZEFwaURhdGUgPSBub3JtYWxpemVSZXF1aXJlZEFwaURhdGVUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpc3REYXRlID0gbm9ybWFsaXplVGlja2V0TGlzdERhdGVUcmFuc2Zvcm07XHJcbmNvbnN0IHRvTnVsbGFibGVCb29sID0gdG9OdWxsYWJsZUJvb2xUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSSA9IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlciA9IG5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXJUcmFuc2Zvcm07XHJcbmNvbnN0IHRvRmxhZ0Jvb2wgPSB0b0ZsYWdCb29sVHJhbnNmb3JtO1xyXG5cclxuY29uc3QgcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lID0gKCk6IEV4cGVuc2VXaW5kb3dSdW50aW1lID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHt9O1xyXG4gIHJldHVybiB3aW5kb3cgYXMgdW5rbm93biBhcyBFeHBlbnNlV2luZG93UnVudGltZTtcclxufTtcclxuXHJcbmNvbnN0IHNhbml0aXplSGVhZGVycyA9IChoZWFkZXJzOiBIZWFkZXJzSW5pdCB8IHVuZGVmaW5lZCk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPT4ge1xyXG4gIGlmICghaGVhZGVycykgcmV0dXJuIHt9O1xyXG5cclxuICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcclxuICAgIGNvbnN0IHJlc3VsdDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xyXG4gICAgaGVhZGVycy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XHJcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBpZiAoQXJyYXkuaXNBcnJheShoZWFkZXJzKSkge1xyXG4gICAgcmV0dXJuIGhlYWRlcnMucmVkdWNlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+KChhY2MsIFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICBhY2NbU3RyaW5nKGtleSldID0gU3RyaW5nKHZhbHVlKTtcclxuICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIHt9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBPYmplY3QuZW50cmllcyhoZWFkZXJzKS5yZWR1Y2U8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4oKGFjYywgW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuIGFjYztcclxuICAgIGFjY1trZXldID0gU3RyaW5nKHZhbHVlKTtcclxuICAgIHJldHVybiBhY2M7XHJcbiAgfSwge30pO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0SGVhZGVyVmFsdWUgPSAoaGVhZGVyczogSGVhZGVyc0luaXQgfCB1bmRlZmluZWQsIGtleTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkS2V5ID0ga2V5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhzYW5pdGl6ZUhlYWRlcnMoaGVhZGVycykpO1xyXG4gIGNvbnN0IG1hdGNoID0gZW50cmllcy5maW5kKChbaGVhZGVyS2V5XSkgPT4gaGVhZGVyS2V5LnRyaW0oKS50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkS2V5KTtcclxuICByZXR1cm4gc2FmZVRleHQobWF0Y2g/LlsxXSk7XHJcbn07XHJcblxyXG5jb25zdCByZW1vdmVIZWFkZXJWYWx1ZSA9IChoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+LCBrZXk6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRLZXkgPSBrZXkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgY29uc3QgdG9EZWxldGUgPSBPYmplY3Qua2V5cyhoZWFkZXJzKS5maW5kKChoZWFkZXJLZXkpID0+IGhlYWRlcktleS50cmltKCkudG9Mb3dlckNhc2UoKSA9PT0gbm9ybWFsaXplZEtleSk7XHJcbiAgaWYgKCF0b0RlbGV0ZSkgcmV0dXJuO1xyXG4gIGRlbGV0ZSBoZWFkZXJzW3RvRGVsZXRlXTtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUF4VXNlcklkSGVhZGVyID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkID0gc2FmZVRleHQodmFsdWUpO1xyXG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIFwiXCI7XHJcbiAgaWYgKC9eLVxcZCskLy50ZXN0KG5vcm1hbGl6ZWQpKSB7XHJcbiAgICByZXR1cm4gbm9ybWFsaXplZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGxhYmVsU2VwYXJhdG9yID0gbm9ybWFsaXplZC5pbmRleE9mKFwiIC0gXCIpO1xyXG4gIGlmIChsYWJlbFNlcGFyYXRvciA+IDApIHtcclxuICAgIHJldHVybiBzYWZlVGV4dChub3JtYWxpemVkLnNsaWNlKDAsIGxhYmVsU2VwYXJhdG9yKSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbm9ybWFsaXplZDtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVCZWFyZXJUb2tlbiA9IChoZWFkZXJzOiBIZWFkZXJzSW5pdCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgYXV0aG9yaXphdGlvbiA9IGdldEhlYWRlclZhbHVlKGhlYWRlcnMsIFwiQXV0aG9yaXphdGlvblwiKTtcclxuICBpZiAoIWF1dGhvcml6YXRpb24pIHJldHVybiBcIlwiO1xyXG5cclxuICBpZiAoL15iZWFyZXJcXHMrL2kudGVzdChhdXRob3JpemF0aW9uKSkge1xyXG4gICAgcmV0dXJuIGF1dGhvcml6YXRpb24ucmVwbGFjZSgvXmJlYXJlclxccysvaSwgXCJcIikudHJpbSgpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGF1dGhvcml6YXRpb24udHJpbSgpO1xyXG59O1xyXG5cclxuY29uc3QgcmVhZFdpbmRvd0F1dGhTZWVkID0gKCk6IFBhcnRpYWw8RXhwZW5zZUFwaUF1dGhTZWVkPiA9PiB7XHJcbiAgY29uc3QgcnVudGltZVdpbmRvdyA9IHJlYWRFeHBlbnNlV2luZG93UnVudGltZSgpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdG9rZW46IHNhZmVUZXh0KHJ1bnRpbWVXaW5kb3cuX19JTkRfQVBJX1RPS0VOX18pLFxyXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHJ1bnRpbWVXaW5kb3cuX19JTkRfRU5UUkFfT0lEX18pLFxyXG4gICAgYXBwQ29kZTogc2FmZVRleHQocnVudGltZVdpbmRvdy5fX0lORF9BUFBfQ09ERV9fKSxcclxuICAgIHN0cmljdEFwaVJvdXRlczogdG9GbGFnQm9vbChydW50aW1lV2luZG93Ll9fSU5EX0VYUEVOU0VfU1RSSUNUX0FQSV9fKSA9PT0gdHJ1ZSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgdHJ5UGFyc2VKc29uID0gKHJhdzogc3RyaW5nKTogdW5rbm93biB8IG51bGwgPT4ge1xyXG4gIGlmICghcmF3IHx8ICFyYXcudHJpbSgpKSByZXR1cm4gbnVsbDtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UocmF3KTtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGNsb25lSnNvbkNvbXBhdGlibGVWYWx1ZSA9IDxUPih2YWx1ZTogVCk6IFQgPT4ge1xyXG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh2YWx1ZSkpIGFzIFQ7XHJcbn07XHJcblxyXG5jb25zdCByZWFkUnVudGltZVN0cmljdEFwaUZsYWcgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBmYWxzZTtcclxuICBjb25zdCBydW50aW1lV2luZG93ID0gcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lKCk7XHJcblxyXG4gIGNvbnN0IGV4cGxpY2l0V2luZG93RmxhZyA9IHRvRmxhZ0Jvb2wocnVudGltZVdpbmRvdy5fX0lORF9FWFBFTlNFX1NUUklDVF9BUElfXyk7XHJcbiAgcmV0dXJuIGV4cGxpY2l0V2luZG93RmxhZyA9PT0gdHJ1ZTtcclxufTtcclxuXHJcbmNvbnN0IHJlYWRXaW5kb3dTZWxlY3RlZENvbXBhbnkgPSAoKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gc2FmZVRleHQocmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lKCkuX19JTkRfU0VMRUNURURfQ09NUEFOWV9fKS50b1VwcGVyQ2FzZSgpO1xyXG59O1xyXG5cclxuLy8gQ3JlYXRlcyBvbmUgc3RhbmRhcmQgYWJvcnQgZXJyb3Igd2l0aG91dCBjYW5jZWxsaW5nIHRoZSBzaGFyZWQgdW5kZXJseWluZyByZXF1ZXN0LlxyXG5jb25zdCBjcmVhdGVFeHBlbnNlQWJvcnRFcnJvciA9ICgpOiBET01FeGNlcHRpb24gPT4ge1xyXG4gIHJldHVybiBuZXcgRE9NRXhjZXB0aW9uKFwiQWJvcnRlZFwiLCBcIkFib3J0RXJyb3JcIik7XHJcbn07XHJcblxyXG4vLyBMZXRzIG9uZSBjYWxsZXIgc3RvcCB3YWl0aW5nIG9uIHNoYXJlZCBjb250ZXh0IHJlc29sdXRpb24gd2l0aG91dCBhYm9ydGluZyBvdGhlciBjb25zdW1lcnMuXHJcbmNvbnN0IHdhaXRGb3JBYm9ydGFibGVFeHBlbnNlUmVzdWx0ID0gYXN5bmMgPFQ+KHByb21pc2U6IFByb21pc2U8VD4sIHNpZ25hbD86IEFib3J0U2lnbmFsKTogUHJvbWlzZTxUPiA9PiB7XHJcbiAgaWYgKCFzaWduYWwpIHJldHVybiBwcm9taXNlO1xyXG4gIGlmIChzaWduYWwuYWJvcnRlZCkge1xyXG4gICAgdGhyb3cgY3JlYXRlRXhwZW5zZUFib3J0RXJyb3IoKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBjb25zdCBoYW5kbGVBYm9ydCA9ICgpID0+IHtcclxuICAgICAgc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBoYW5kbGVBYm9ydCk7XHJcbiAgICAgIHJlamVjdChjcmVhdGVFeHBlbnNlQWJvcnRFcnJvcigpKTtcclxuICAgIH07XHJcblxyXG4gICAgc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBoYW5kbGVBYm9ydCwgeyBvbmNlOiB0cnVlIH0pO1xyXG4gICAgcHJvbWlzZS50aGVuKFxyXG4gICAgICAodmFsdWUpID0+IHtcclxuICAgICAgICBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGhhbmRsZUFib3J0KTtcclxuICAgICAgICByZXNvbHZlKHZhbHVlKTtcclxuICAgICAgfSxcclxuICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBoYW5kbGVBYm9ydCk7XHJcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkQ29udGV4dEtleSA9IChzZWVkOiBFeHBlbnNlQXBpQXV0aFNlZWQpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBgJHtzZWVkLnRva2VufXwke3NlZWQuZW50cmFPaWR9fCR7c2VlZC5hcHBDb2RlfXwke3JlYWRXaW5kb3dTZWxlY3RlZENvbXBhbnkoKX1gO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlSGVhZGVycyA9IChcclxuICBjb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zLFxyXG4gIGluY2x1ZGVKc29uID0gZmFsc2UsXHJcbiAgaW5jbHVkZUF4VXNlcklkID0gdHJ1ZVxyXG4pOiBIZWFkZXJzSW5pdCA9PiB7XHJcbiAgY29uc3QgYmFzZSA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcclxuICBjb25zdCBtZXJnZWQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7IC4uLmJhc2UgfTtcclxuXHJcbiAgaWYgKHNhZmVUZXh0KGNvbnRleHQudG9rZW4pKSB7XHJcbiAgICBtZXJnZWQuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHtjb250ZXh0LnRva2VufWA7XHJcbiAgfVxyXG5cclxuICBpZiAoc2FmZVRleHQoY29udGV4dC5jb21wYW55SWQpKSB7XHJcbiAgICBtZXJnZWRbXCJYLUlORC1Db21wYW55XCJdID0gY29udGV4dC5jb21wYW55SWQ7XHJcbiAgfVxyXG5cclxuICBpZiAoaW5jbHVkZUF4VXNlcklkKSB7XHJcbiAgICBjb25zdCByZXF1ZXN0QXhVc2VySWQgPSBnZXRIZWFkZXJWYWx1ZShvcHRpb25zPy5oZWFkZXJzLCBcIlgtSU5ELUF4VXNlcklkXCIpO1xyXG4gICAgY29uc3Qgb3ZlcnJpZGVBeFVzZXJJZCA9IGdldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUoKTtcclxuICAgIGNvbnN0IHJlc29sdmVkQXhVc2VySWQgPSBzYWZlVGV4dChyZXF1ZXN0QXhVc2VySWQgfHwgb3ZlcnJpZGVBeFVzZXJJZCB8fCBjb250ZXh0LmF4VXNlcklkKTtcclxuICAgIGlmIChyZXNvbHZlZEF4VXNlcklkKSB7XHJcbiAgICAgIG1lcmdlZFtcIlgtSU5ELUF4VXNlcklkXCJdID0gcmVzb2x2ZWRBeFVzZXJJZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlbW92ZUhlYWRlclZhbHVlKG1lcmdlZCwgXCJYLUlORC1BeFVzZXJJZFwiKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgcmVtb3ZlSGVhZGVyVmFsdWUobWVyZ2VkLCBcIlgtSU5ELUF4VXNlcklkXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGluY2x1ZGVKc29uKSB7XHJcbiAgICBtZXJnZWRbXCJDb250ZW50LVR5cGVcIl0gPSBcImFwcGxpY2F0aW9uL2pzb25cIjtcclxuICB9XHJcblxyXG4gIHJldHVybiBtZXJnZWQ7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZEV4cGVuc2VGb3JtSGVhZGVycyA9IChjb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCwgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IEhlYWRlcnNJbml0ID0+IHtcclxuICBjb25zdCBoZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgZmFsc2UpKTtcclxuICByZW1vdmVIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIkNvbnRlbnQtVHlwZVwiKTtcclxuICByZXR1cm4gaGVhZGVycztcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkQ29udGV4dEhlYWRlcnMgPSAodG9rZW46IHN0cmluZywgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IEhlYWRlcnNJbml0ID0+IHtcclxuICBjb25zdCBiYXNlID0gc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpO1xyXG4gIGNvbnN0IG1lcmdlZDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcclxuICAgIC4uLmJhc2UsXHJcbiAgICAuLi5KU09OX0hFQURFUlMsXHJcbiAgfTtcclxuXHJcbiAgaWYgKHNhZmVUZXh0KHRva2VuKSkge1xyXG4gICAgbWVyZ2VkLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7dG9rZW59YDtcclxuICB9XHJcblxyXG4gIHJldHVybiBtZXJnZWQ7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlQXV0aFRva2VuID0gKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHRva2VuRnJvbUhlYWRlcnMgPSByZXNvbHZlQmVhcmVyVG9rZW4ob3B0aW9ucz8uaGVhZGVycyk7XHJcbiAgY29uc3Qgd2luZG93U2VlZCA9IHJlYWRXaW5kb3dBdXRoU2VlZCgpO1xyXG4gIHJldHVybiBzYWZlVGV4dCh0b2tlbkZyb21IZWFkZXJzIHx8IHJ1bnRpbWVBdXRoU2VlZC50b2tlbiB8fCB3aW5kb3dTZWVkLnRva2VuKTtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVBdXRoU2VlZCA9IChvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogRXhwZW5zZUFwaUF1dGhTZWVkID0+IHtcclxuICBjb25zdCB3aW5kb3dTZWVkID0gcmVhZFdpbmRvd0F1dGhTZWVkKCk7XHJcbiAgY29uc3QgdG9rZW4gPSByZXNvbHZlQXV0aFRva2VuKG9wdGlvbnMpO1xyXG4gIGNvbnN0IGVudHJhT2lkID0gc2FmZVRleHQocnVudGltZUF1dGhTZWVkLmVudHJhT2lkIHx8IHdpbmRvd1NlZWQuZW50cmFPaWQpO1xyXG4gIGNvbnN0IGFwcENvZGUgPSBzYWZlVGV4dChydW50aW1lQXV0aFNlZWQuYXBwQ29kZSB8fCB3aW5kb3dTZWVkLmFwcENvZGUgfHwgREVGQVVMVF9BUFBfQ09ERSkgfHwgREVGQVVMVF9BUFBfQ09ERTtcclxuICBjb25zdCBzdHJpY3RBcGlSb3V0ZXMgPVxyXG4gICAgdHlwZW9mIHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXMgPT09IFwiYm9vbGVhblwiXHJcbiAgICAgID8gcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlc1xyXG4gICAgICA6ICh3aW5kb3dTZWVkLnN0cmljdEFwaVJvdXRlcyA9PT0gdHJ1ZSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0b2tlbixcclxuICAgIGVudHJhT2lkLFxyXG4gICAgYXBwQ29kZSxcclxuICAgIHN0cmljdEFwaVJvdXRlcyxcclxuICB9O1xyXG59O1xyXG5cclxudHlwZSBSYXdFbnRyYUNvbnRleHRDb21wYW55ID0ge1xyXG4gIENvbXBhbnlJZD86IHVua25vd247XHJcbiAgY29tcGFueUlkPzogdW5rbm93bjtcclxuICBJc0RlZmF1bHQ/OiB1bmtub3duO1xyXG4gIGlzRGVmYXVsdD86IHVua25vd247XHJcbiAgQWxsb3dTZWxmTWFuYWdlbWVudD86IHVua25vd247XHJcbiAgYWxsb3dTZWxmTWFuYWdlbWVudD86IHVua25vd247XHJcbiAgQ3JtVXNlcklkPzogdW5rbm93bjtcclxuICBjcm1Vc2VySWQ/OiB1bmtub3duO1xyXG59O1xyXG5cclxudHlwZSBOb3JtYWxpemVkRW50cmFDb250ZXh0Q29tcGFueSA9IHtcclxuICBjb21wYW55SWQ6IHN0cmluZztcclxuICBpc0RlZmF1bHQ6IGJvb2xlYW47XHJcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcclxuICBjcm1Vc2VySWQ6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgUmF3RW50cmFDb250ZXh0SGVhZGVyID0ge1xyXG4gIEF4VXNlcklkPzogdW5rbm93bjtcclxuICBheFVzZXJJZD86IHVua25vd247XHJcbiAgRGVmYXVsdENvbXBhbnk/OiB1bmtub3duO1xyXG4gIGRlZmF1bHRDb21wYW55PzogdW5rbm93bjtcclxuICBEZWZhdWx0Q3VycmVuY3lDb2RlPzogdW5rbm93bjtcclxuICBkZWZhdWx0Q3VycmVuY3lDb2RlPzogdW5rbm93bjtcclxufTtcclxuXHJcbnR5cGUgUmF3RW50cmFDb250ZXh0SXRlbSA9IHtcclxuICBIZWFkZXI/OiBSYXdFbnRyYUNvbnRleHRIZWFkZXI7XHJcbiAgaGVhZGVyPzogUmF3RW50cmFDb250ZXh0SGVhZGVyO1xyXG4gIENvbXBhbmllcz86IHVua25vd247XHJcbiAgY29tcGFuaWVzPzogdW5rbm93bjtcclxufTtcclxuXHJcbi8vIE1hcHMgb25lIEVudHJhIGNvbXBhbnkgaXRlbSB0byB0aGUgZnJvbnRlbmQtc2FmZSBzaGFwZSB1c2VkIGJ5IGNvbnRleHQgY29uc3VtZXJzLlxyXG5jb25zdCBtYXBFbnRyYUNvbnRleHRDb21wYW55ID0gKGl0ZW06IHVua25vd24pOiBOb3JtYWxpemVkRW50cmFDb250ZXh0Q29tcGFueSB8IG51bGwgPT4ge1xyXG4gIGlmICghaXRlbSB8fCB0eXBlb2YgaXRlbSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IHJhdyA9IGl0ZW0gYXMgUmF3RW50cmFDb250ZXh0Q29tcGFueTtcclxuICBjb25zdCBjb21wYW55SWQgPSBzYWZlVGV4dChyYXcuQ29tcGFueUlkID8/IHJhdy5jb21wYW55SWQpO1xyXG4gIGlmICghY29tcGFueUlkKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGNvbXBhbnlJZCxcclxuICAgIGlzRGVmYXVsdDogdG9GbGFnQm9vbChyYXcuSXNEZWZhdWx0ID8/IHJhdy5pc0RlZmF1bHQpID09PSB0cnVlLFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudDogdG9GbGFnQm9vbChyYXcuQWxsb3dTZWxmTWFuYWdlbWVudCA/PyByYXcuYWxsb3dTZWxmTWFuYWdlbWVudCkgPT09IHRydWUsXHJcbiAgICBjcm1Vc2VySWQ6IHNhZmVUZXh0KHJhdy5Dcm1Vc2VySWQgPz8gcmF3LmNybVVzZXJJZCksXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IHZhbGlkYXRlQ29udGV4dFJlc3BvbnNlID0gKHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEVudHJhQ29udGV4dER0bz4pOiBFeHBlbnNlQXBpQ29udGV4dCA9PiB7XHJcbiAgY29uc3QgcmF3UmVzcG9uc2UgPSByZXNwb25zZSBhcyB7XHJcbiAgICBTdWNjZXNzPzogdW5rbm93bjtcclxuICAgIHN1Y2Nlc3M/OiB1bmtub3duO1xyXG4gICAgTWVzc2FnZT86IHVua25vd247XHJcbiAgICBtZXNzYWdlPzogdW5rbm93bjtcclxuICAgIEl0ZW1zPzogdW5rbm93bjtcclxuICAgIGl0ZW1zPzogdW5rbm93bjtcclxuICB9O1xyXG5cclxuICBjb25zdCBpc1N1Y2Nlc3MgPSB0b0ZsYWdCb29sKHJhd1Jlc3BvbnNlLlN1Y2Nlc3MgPz8gcmF3UmVzcG9uc2Uuc3VjY2Vzcyk7XHJcbiAgaWYgKGlzU3VjY2VzcyA9PT0gZmFsc2UpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKHNhZmVUZXh0KHJhd1Jlc3BvbnNlLk1lc3NhZ2UgPz8gcmF3UmVzcG9uc2UubWVzc2FnZSkgfHwgXCJDb3VsZCBub3QgbG9hZCBFbnRyYSBjb250ZXh0LlwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyYXdSZXNwb25zZS5JdGVtcylcclxuICAgID8gcmF3UmVzcG9uc2UuSXRlbXNcclxuICAgIDogKEFycmF5LmlzQXJyYXkocmF3UmVzcG9uc2UuaXRlbXMpID8gcmF3UmVzcG9uc2UuaXRlbXMgOiBbXSk7XHJcbiAgY29uc3QgZmlyc3QgPSBpdGVtc1swXSBhcyBSYXdFbnRyYUNvbnRleHRJdGVtIHwgdW5kZWZpbmVkO1xyXG4gIGNvbnN0IGhlYWRlciA9IGZpcnN0Py5IZWFkZXIgPz8gZmlyc3Q/LmhlYWRlcjtcclxuICBpZiAoIWZpcnN0IHx8ICFoZWFkZXIpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiQ291bGQgbm90IGxvYWQgRW50cmEgY29udGV4dC5cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBheFVzZXJJZCA9IHNhZmVUZXh0KGhlYWRlci5BeFVzZXJJZCA/PyBoZWFkZXIuYXhVc2VySWQpO1xyXG4gIGNvbnN0IGRlZmF1bHRDb21wYW55ID0gc2FmZVRleHQoaGVhZGVyLkRlZmF1bHRDb21wYW55ID8/IGhlYWRlci5kZWZhdWx0Q29tcGFueSk7XHJcbiAgY29uc3QgZGVmYXVsdEN1cnJlbmN5Q29kZSA9IHNhZmVUZXh0KGhlYWRlci5EZWZhdWx0Q3VycmVuY3lDb2RlID8/IGhlYWRlci5kZWZhdWx0Q3VycmVuY3lDb2RlKTtcclxuICBjb25zdCBjb21wYW5pZXNSYXcgPSBBcnJheS5pc0FycmF5KGZpcnN0LkNvbXBhbmllcylcclxuICAgID8gZmlyc3QuQ29tcGFuaWVzXHJcbiAgICA6IChBcnJheS5pc0FycmF5KGZpcnN0LmNvbXBhbmllcykgPyBmaXJzdC5jb21wYW5pZXMgOiBbXSk7XHJcbiAgY29uc3QgY29tcGFuaWVzID0gY29tcGFuaWVzUmF3XHJcbiAgICAubWFwKChpdGVtKSA9PiBtYXBFbnRyYUNvbnRleHRDb21wYW55KGl0ZW0pKVxyXG4gICAgLmZpbHRlcigoaXRlbSk6IGl0ZW0gaXMgTm9ybWFsaXplZEVudHJhQ29udGV4dENvbXBhbnkgPT4gISFpdGVtKTtcclxuICBjb25zdCBzZWxlY3RlZENvbXBhbnlJZCA9IHJlYWRXaW5kb3dTZWxlY3RlZENvbXBhbnkoKTtcclxuICBjb25zdCBzZWxlY3RlZENvbXBhbnlNYXRjaCA9IHNlbGVjdGVkQ29tcGFueUlkXHJcbiAgICA/IGNvbXBhbmllcy5maW5kKChpdGVtKSA9PiBzYWZlVGV4dChpdGVtLmNvbXBhbnlJZCkudG9VcHBlckNhc2UoKSA9PT0gc2VsZWN0ZWRDb21wYW55SWQpXHJcbiAgICA6IG51bGw7XHJcblxyXG4gIC8vIE5ldmVyIGZhbGwgYmFjayB0byBhIGRpZmZlcmVudCBjb21wYW55IHdoZW4gdGhlIHVzZXIgc2VsZWN0ZWQgb25lIGV4cGxpY2l0bHkuXHJcbiAgaWYgKHNlbGVjdGVkQ29tcGFueUlkICYmICFzZWxlY3RlZENvbXBhbnlNYXRjaCkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXHJcbiAgICAgIGluZFQoXHJcbiAgICAgICAgXCJFeHBlbnNlX0NvbnRleHRfU2VsZWN0ZWRDb21wYW55VW5hdmFpbGFibGVcIixcclxuICAgICAgICBcIlRoZSBzZWxlY3RlZCBjb21wYW55IGlzIG5vIGxvbmdlciBhdmFpbGFibGUuIFBsZWFzZSBjaG9vc2UgaXQgYWdhaW4gZnJvbSB0aGUgbWFpbiBtZW51LlwiXHJcbiAgICAgIClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBmYWxsYmFja0NvbXBhbnkgPSBzYWZlVGV4dChjb21wYW5pZXMuZmluZCgoaXRlbSkgPT4gaXRlbS5pc0RlZmF1bHQpPy5jb21wYW55SWQpO1xyXG4gIGNvbnN0IGNvbXBhbnlJZCA9XHJcbiAgICBzZWxlY3RlZENvbXBhbnlNYXRjaD8uY29tcGFueUlkIHx8IHJlc29sdmVFZmZlY3RpdmVDb21wYW55SWQoXCJcIiwgY29tcGFuaWVzLCBkZWZhdWx0Q29tcGFueSB8fCBmYWxsYmFja0NvbXBhbnkpO1xyXG4gIGNvbnN0IHNlbGVjdGVkQ29tcGFueSA9XHJcbiAgICBzZWxlY3RlZENvbXBhbnlNYXRjaCB8fCBjb21wYW5pZXMuZmluZCgoaXRlbSkgPT4gc2FmZVRleHQoaXRlbS5jb21wYW55SWQpID09PSBjb21wYW55SWQpIHx8IGNvbXBhbmllc1swXTtcclxuICBjb25zdCBhbGxvd1NlbGZNYW5hZ2VtZW50ID0gc2VsZWN0ZWRDb21wYW55Py5hbGxvd1NlbGZNYW5hZ2VtZW50ID09PSB0cnVlO1xyXG4gIGNvbnN0IGNybVVzZXJJZCA9IHNhZmVUZXh0KHNlbGVjdGVkQ29tcGFueT8uY3JtVXNlcklkKTtcclxuXHJcbiAgaWYgKCFheFVzZXJJZCB8fCAhY29tcGFueUlkKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkNvdWxkIG5vdCByZXNvbHZlIEVudHJhIGNvbXBhbnkgY29udGV4dC5cIik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdG9rZW46IFwiXCIsXHJcbiAgICBjb21wYW55SWQsXHJcbiAgICBheFVzZXJJZCxcclxuICAgIGNybVVzZXJJZCxcclxuICAgIGRlZmF1bHRDdXJyZW5jeUNvZGUsXHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50LFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dCA9IGFzeW5jIChvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogUHJvbWlzZTxFeHBlbnNlQXBpQ29udGV4dD4gPT4ge1xyXG4gIGNvbnN0IHNlZWQgPSByZXNvbHZlQXV0aFNlZWQob3B0aW9ucyk7XHJcbiAgY29uc3QgY29udGV4dEtleSA9IGJ1aWxkQ29udGV4dEtleShzZWVkKTtcclxuICBjb25zdCB7IHNpZ25hbCwgLi4uYmFzZU9wdGlvbnMgfSA9IG9wdGlvbnMgfHwge307XHJcblxyXG4gIGlmIChjYWNoZWRDb250ZXh0ICYmIGNhY2hlZENvbnRleHRLZXkgPT09IGNvbnRleHRLZXkpIHtcclxuICAgIHJldHVybiB3YWl0Rm9yQWJvcnRhYmxlRXhwZW5zZVJlc3VsdChQcm9taXNlLnJlc29sdmUoY2FjaGVkQ29udGV4dCksIHNpZ25hbCk7XHJcbiAgfVxyXG5cclxuICBpZiAoIWNvbnRleHRQcm9taXNlIHx8IGNhY2hlZENvbnRleHRLZXkgIT09IGNvbnRleHRLZXkpIHtcclxuICAgIGNhY2hlZENvbnRleHRLZXkgPSBjb250ZXh0S2V5O1xyXG4gICAgY29uc3Qgc2hhcmVkQ29udGV4dFByb21pc2UgPSAoYXN5bmMgKCkgPT4ge1xyXG4gICAgICBjb25zdCBjb250ZXh0UGF5bG9hZDogRW50cmFDb250ZXh0UmVxdWVzdCA9IHtcclxuICAgICAgICBhcHBDb2RlOiBzZWVkLmFwcENvZGUsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAoc2FmZVRleHQoc2VlZC5lbnRyYU9pZCkpIHtcclxuICAgICAgICBjb250ZXh0UGF5bG9hZC5lbnRyYU9pZCA9IHNlZWQuZW50cmFPaWQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGNvbnRleHRSZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEVudHJhQ29udGV4dER0bz4+KFwiL2FwaS9hdXRoL2VudHJhL2NvbnRleHRcIiwge1xyXG4gICAgICAgIC4uLmJhc2VPcHRpb25zLFxyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczogYnVpbGRDb250ZXh0SGVhZGVycyhzZWVkLnRva2VuLCBiYXNlT3B0aW9ucyksXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoY29udGV4dFBheWxvYWQpLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IHJlc29sdmVkID0gdmFsaWRhdGVDb250ZXh0UmVzcG9uc2UoY29udGV4dFJlc3BvbnNlKTtcclxuICAgICAgY29uc3QgbmV4dENvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0ID0ge1xyXG4gICAgICAgIC4uLnJlc29sdmVkLFxyXG4gICAgICAgIHRva2VuOiBzZWVkLnRva2VuLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICB3aW5kb3cuX19JTkRfQUxMT1dfU0VMRl9NQU5BR0VNRU5UX18gPSBuZXh0Q29udGV4dC5hbGxvd1NlbGZNYW5hZ2VtZW50O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjYWNoZWRDb250ZXh0ID0gbmV4dENvbnRleHQ7XHJcbiAgICAgIHJldHVybiBuZXh0Q29udGV4dDtcclxuICAgIH0pKCk7XHJcblxyXG4gICAgY29udGV4dFByb21pc2UgPSBzaGFyZWRDb250ZXh0UHJvbWlzZTtcclxuICAgIHZvaWQgc2hhcmVkQ29udGV4dFByb21pc2UuZmluYWxseSgoKSA9PiB7XHJcbiAgICAgIGlmIChjb250ZXh0UHJvbWlzZSA9PT0gc2hhcmVkQ29udGV4dFByb21pc2UpIHtcclxuICAgICAgICBjb250ZXh0UHJvbWlzZSA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGF3YWl0IHdhaXRGb3JBYm9ydGFibGVFeHBlbnNlUmVzdWx0KGNvbnRleHRQcm9taXNlLCBzaWduYWwpO1xyXG59O1xyXG5cclxuLy8gRXhwb3NlcyByZXNvbHZlZCBFbnRyYSBjb250ZXh0IHZhbHVlcyBuZWVkZWQgYnkgR2FzdG9zIFVJIG1hbmFnZW1lbnQgc3RhdGUuXHJcbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlQXBpQ29udGV4dFNuYXBzaG90ID0gYXN5bmMgKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBQcm9taXNlPEV4cGVuc2VBcGlDb250ZXh0U25hcHNob3Q+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgcmV0dXJuIHtcclxuICAgIGNvbXBhbnlJZDogc2FmZVRleHQoY29udGV4dC5jb21wYW55SWQpLnRvVXBwZXJDYXNlKCksXHJcbiAgICBheFVzZXJJZDogc2FmZVRleHQoY29udGV4dC5heFVzZXJJZCksXHJcbiAgICBjcm1Vc2VySWQ6IHNhZmVUZXh0KGNvbnRleHQuY3JtVXNlcklkKSxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGNvbnRleHQuYWxsb3dTZWxmTWFuYWdlbWVudCA9PT0gdHJ1ZSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZUFwaVJlc3BvbnNlID0gbm9ybWFsaXplQXBpUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldFF1aWNrQ3JlYXRlUmVzcG9uc2UgPSBub3JtYWxpemVUaWNrZXRRdWlja0NyZWF0ZVJlc3BvbnNlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVN1Ym9yZGluYXRlc1BhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVUaWNrZXRMaW5rTGlzdFBhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVUaWNrZXRMaW5rTGlzdFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVUaWNrZXRMaW5rQnVsa1Jlc3BvbnNlID0gbm9ybWFsaXplVGlja2V0TGlua0J1bGtSZXNwb25zZVRyYW5zZm9ybTtcclxuXHJcbmNvbnN0IGxvb2tzTGlrZUh0bWxEb2N1bWVudCA9ICh2YWx1ZTogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IHJhdyA9IHNhZmVUZXh0KHZhbHVlKS50b0xvd2VyQ2FzZSgpO1xyXG4gIHJldHVybiByYXcuc3RhcnRzV2l0aChcIjwhZG9jdHlwZSBodG1sXCIpIHx8IHJhdy5zdGFydHNXaXRoKFwiPGh0bWxcIik7XHJcbn07XHJcblxyXG5jb25zdCBpc0FwaVJvdXRlVW5hdmFpbGFibGUgPSAoZXJyb3I6IHVua25vd24pOiBlcnJvciBpcyBBcGlGZXRjaEVycm9yID0+IHtcclxuICBpZiAoIShlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpKSByZXR1cm4gZmFsc2U7XHJcbiAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDA0IHx8IGVycm9yLnN0YXR1cyA9PT0gNDA1KSByZXR1cm4gdHJ1ZTtcclxuICByZXR1cm4gZXJyb3Iuc3RhdHVzID09PSB1bmRlZmluZWQgJiYgbG9va3NMaWtlSHRtbERvY3VtZW50KGVycm9yLnJlc3BvbnNlQm9keSk7XHJcbn07XHJcblxyXG5jb25zdCBpc1N0cmljdEFwaVJvdXRlc0VuYWJsZWQgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKHR5cGVvZiBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzID09PSBcImJvb2xlYW5cIikge1xyXG4gICAgcmV0dXJuIHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXM7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmVhZFJ1bnRpbWVTdHJpY3RBcGlGbGFnKCk7XHJcbn07XHJcblxyXG5jb25zdCBzaG91bGRVc2VMZWdhY3lGYWxsYmFjayA9IChlcnJvcjogdW5rbm93bik6IGJvb2xlYW4gPT4ge1xyXG4gIGlmIChpc1N0cmljdEFwaVJvdXRlc0VuYWJsZWQoKSkgcmV0dXJuIGZhbHNlO1xyXG4gIHJldHVybiBpc0FwaVJvdXRlVW5hdmFpbGFibGUoZXJyb3IpO1xyXG59O1xyXG5cclxuY29uc3QgdG9MZWdhY3lMaXN0UmVxdWVzdFBheWxvYWQgPSAocGF5bG9hZDogRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3QpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgZmlsdGVyOiBzYWZlVGV4dChwYXlsb2FkLmZpbHRlciksXHJcbiAgICBob2phR2FzdG9zSWQ6IHNhZmVUZXh0KHBheWxvYWQuZmlsdGVyKSxcclxuICAgIGJpbGxlZE1vZGU6IHBheWxvYWQuYmlsbGVkTW9kZSA/PyAyLFxyXG4gICAgZnJvbURhdGU6IHNhZmVUZXh0KHBheWxvYWQuY3JlYXRlZERhdGVGcm9tKSxcclxuICAgIHRvRGF0ZTogc2FmZVRleHQocGF5bG9hZC5jcmVhdGVkRGF0ZVRvKSxcclxuICAgIHByb2plY3RJZDogc2FmZVRleHQocGF5bG9hZC5wcm9qSWQpLFxyXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChwYXlsb2FkLmN1cnJlbmN5Q29kZSksXHJcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IG5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXIocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMpLFxyXG4gICAgaW5jbHVkZVN1Ym9yZGluYXRlczogcGF5bG9hZC5pbmNsdWRlU3Vib3JkaW5hdGVzID09PSB0cnVlLFxyXG4gICAgcGFnZTogTnVtYmVyLmlzRmluaXRlKHBheWxvYWQucGFnZSkgJiYgcGF5bG9hZC5wYWdlID4gMCA/IHBheWxvYWQucGFnZSA6IDEsXHJcbiAgICBwYWdlU2l6ZTogTnVtYmVyLmlzRmluaXRlKHBheWxvYWQucGFnZVNpemUpICYmIHBheWxvYWQucGFnZVNpemUgPiAwID8gcGF5bG9hZC5wYWdlU2l6ZSA6IDUwLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBtYXBMZWdhY3lMaXN0SXRlbVRvQXBpTGlzdEl0ZW0gPSAoaXRlbTogTGVnYWN5RXhwZW5zZUxpc3RJdGVtKTogRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8gPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBIb2phR2FzdG9zSWQ6IHNhZmVUZXh0KGl0ZW0uaG9qYUdhc3Rvc0lkKSxcclxuICAgIERlc2NyaXB0aW9uOiBzYWZlVGV4dChpdGVtLmRlc2NyaXB0aW9uKSxcclxuICAgIEV4cGVuc2VTaGVldFN0YXR1czogdG9OdWxsYWJsZU51bWJlcihpdGVtLmV4cGVuc2VTaGVldFN0YXR1cyksXHJcbiAgICBFc3RhZG9Db21lbnRhcmlvczogc2FmZVRleHQoaXRlbS5lc3RhZG9Db21lbnRhcmlvcykgfHwgbnVsbCxcclxuICAgIFVzZXJJZDogc2FmZVRleHQoaXRlbS51c2VySWQpIHx8IG51bGwsXHJcbiAgICBVc2VyTmFtZTogc2FmZVRleHQoaXRlbS51c2VyTmFtZSkgfHwgbnVsbCxcclxuICAgIFZvdWNoZXI6IHNhZmVUZXh0KGl0ZW0udm91Y2hlciksXHJcbiAgICBQcm9qSWQ6IHNhZmVUZXh0KGl0ZW0ucHJvaklkKSxcclxuICAgIEN1cnJlbmN5Q29kZTogc2FmZVRleHQoaXRlbS5jdXJyZW5jeUNvZGUpLFxyXG4gICAgVG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS50b3RhbEFtb3VudCA/PyBpdGVtLnRvdGFsQW1vdW50TVNUKSxcclxuICAgIEV4Y2hSYXRlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uZXhjaFJhdGUpLFxyXG4gICAgRXhjaGFuZ2VSYXRlTW9kZTogdG9OdWxsYWJsZU51bWJlcihpdGVtLmV4Y2hhbmdlUmF0ZU1vZGUpLFxyXG4gICAgQ3JlYXRlZERhdGU6IHNhZmVUZXh0KGl0ZW0uY3JlYXRlZERhdGUpIHx8IG51bGwsXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IG1hcExlZ2FjeUxpc3RSZXNwb25zZSA9IChcclxuICBsZWdhY3k6IExlZ2FjeUV4cGVuc2VMaXN0UmVzcG9uc2UsXHJcbiAgZmFsbGJhY2tQYWdlOiBudW1iZXIsXHJcbiAgZmFsbGJhY2tQYWdlU2l6ZTogbnVtYmVyXHJcbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+ID0+IHtcclxuICBjb25zdCBsZWdhY3lJdGVtcyA9IEFycmF5LmlzQXJyYXkobGVnYWN5Py5pdGVtcykgPyBsZWdhY3kuaXRlbXMgOiBbXTtcclxuICBjb25zdCBtYXBwZWRJdGVtcyA9IGxlZ2FjeUl0ZW1zLm1hcCgoZW50cnkpID0+IG1hcExlZ2FjeUxpc3RJdGVtVG9BcGlMaXN0SXRlbShlbnRyeSkpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgU3VjY2VzczogbGVnYWN5LnN1Y2Nlc3MgIT09IGZhbHNlLFxyXG4gICAgTWVzc2FnZTogc2FmZVRleHQobGVnYWN5Lm1lc3NhZ2UpIHx8IFwiT0tcIixcclxuICAgIFRvdGFsOiB0b051bGxhYmxlTnVtYmVyKGxlZ2FjeS50b3RhbCkgPz8gbWFwcGVkSXRlbXMubGVuZ3RoLFxyXG4gICAgUGFnZTogdG9OdWxsYWJsZU51bWJlcihsZWdhY3kucGFnZSkgPz8gZmFsbGJhY2tQYWdlLFxyXG4gICAgUGFnZVNpemU6IHRvTnVsbGFibGVOdW1iZXIobGVnYWN5LnBhZ2VTaXplKSA/PyBmYWxsYmFja1BhZ2VTaXplLFxyXG4gICAgSXRlbXM6IG1hcHBlZEl0ZW1zLFxyXG4gICAgVHJhY2VJZDogdW5kZWZpbmVkLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBTZXRzIHJ1bnRpbWUgYXV0aCBpbnB1dHMgdXNlZCB0byByZXNvbHZlIEVudHJhIGNvbnRleHQgYW5kIG1hbmRhdG9yeSBleHBlbnNlIGhlYWRlcnMuXHJcbmV4cG9ydCBjb25zdCBjb25maWd1cmVFeHBlbnNlQXBpQXV0aCA9IChzZWVkOiBQYXJ0aWFsPEV4cGVuc2VBcGlBdXRoU2VlZD4pOiB2b2lkID0+IHtcclxuICBjb25zdCBzdHJpY3RGcm9tU2VlZCA9IHRvRmxhZ0Jvb2woc2VlZC5zdHJpY3RBcGlSb3V0ZXMpO1xyXG4gIGNvbnN0IHN0cmljdEZyb21SdW50aW1lID1cclxuICAgIHR5cGVvZiBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzID09PSBcImJvb2xlYW5cIiA/IHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXMgOiByZWFkUnVudGltZVN0cmljdEFwaUZsYWcoKTtcclxuXHJcbiAgcnVudGltZUF1dGhTZWVkID0ge1xyXG4gICAgLi4ucnVudGltZUF1dGhTZWVkLFxyXG4gICAgdG9rZW46IHNhZmVUZXh0KHNlZWQudG9rZW4gfHwgcnVudGltZUF1dGhTZWVkLnRva2VuKSxcclxuICAgIGVudHJhT2lkOiBzYWZlVGV4dChzZWVkLmVudHJhT2lkIHx8IHJ1bnRpbWVBdXRoU2VlZC5lbnRyYU9pZCksXHJcbiAgICBhcHBDb2RlOiBzYWZlVGV4dChzZWVkLmFwcENvZGUgfHwgcnVudGltZUF1dGhTZWVkLmFwcENvZGUgfHwgREVGQVVMVF9BUFBfQ09ERSksXHJcbiAgICBzdHJpY3RBcGlSb3V0ZXM6IHN0cmljdEZyb21TZWVkID8/IHN0cmljdEZyb21SdW50aW1lLFxyXG4gIH07XHJcblxyXG4gIGNhY2hlZENvbnRleHQgPSBudWxsO1xyXG4gIGNhY2hlZENvbnRleHRLZXkgPSBcIlwiO1xyXG4gIGNvbnRleHRQcm9taXNlID0gbnVsbDtcclxuICBjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcy5jbGVhcigpO1xyXG4gIHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLmNsZWFyKCk7XHJcbn07XHJcblxyXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvbGlzdCBpdGVtIGNvbnRyYWN0IHRvIGxpc3QgY2FyZCBVSSBtb2RlbC5cclxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkID0gbWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmRDb3JlO1xyXG5cclxuLy8gTWFwcyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9IGhlYWRlciBjb250cmFjdCB0byBVSSBtb2RlbC5cclxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldEhlYWRlciA9IG1hcEV4cGVuc2VTaGVldEhlYWRlckNvcmU7XHJcblxyXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0gbGluZSBjb250cmFjdCB0byBVSSBtb2RlbC5cclxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldExpbmUgPSBtYXBFeHBlbnNlU2hlZXRMaW5lQ29yZTtcclxuXHJcbmV4cG9ydCB0eXBlIEV4cGVuc2VTaGVldExpc3RGZXRjaENhcHR1cmUgPSB7XHJcbiAgcmVxdWVzdDogRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3Q7XHJcbiAgcmVzcG9uc2U6IEV4cGVuc2VTaGVldExpc3RSZXNwb25zZUVudmVsb3BlO1xyXG4gIGF4VXNlcklkT3ZlcnJpZGU6IHN0cmluZyB8IG51bGw7XHJcbiAgc291cmNlOiBcImFwaVwiIHwgXCJsZWdhY3lcIjtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEV4cGVuc2VTaGVldExpc3RGZXRjaE9wdGlvbnMgPSBBcGlGZXRjaE9wdGlvbnMgJiB7XHJcbiAgYXhVc2VySWRPdmVycmlkZT86IHN0cmluZztcclxuICBvblJlcXVlc3RQcmVwYXJlZD86IChyZXF1ZXN0OiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCkgPT4gdm9pZDtcclxuICBvbkNhcHR1cmU/OiAoY2FwdHVyZTogRXhwZW5zZVNoZWV0TGlzdEZldGNoQ2FwdHVyZSkgPT4gdm9pZDtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEV4cGVuc2VUaWNrZXRMaXN0RmV0Y2hPcHRpb25zID0gQXBpRmV0Y2hPcHRpb25zICYge1xyXG4gIGF4VXNlcklkT3ZlcnJpZGU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBFeHBlbnNlU2hlZXRMaXN0U291cmNlSnNvbk9wdGlvbnMgPSBBcGlGZXRjaE9wdGlvbnMgJiB7XHJcbiAgYXhVc2VySWRPdmVycmlkZT86IHN0cmluZztcclxuICBzZWVkUmVzcG9uc2U/OiBFeHBlbnNlU2hlZXRMaXN0UmVzcG9uc2VFbnZlbG9wZSB8IG51bGw7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZFRpY2tldExpc3RIZWFkZXJzID0gKFxyXG4gIGNvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0LFxyXG4gIG9wdGlvbnM6IEFwaUZldGNoT3B0aW9ucyB8IHVuZGVmaW5lZCxcclxuICBheFVzZXJJZE92ZXJyaWRlOiBzdHJpbmcgfCB1bmRlZmluZWRcclxuKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9PiB7XHJcbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUsIGZhbHNlKSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZE92ZXJyaWRlQXhVc2VySWQgPSBub3JtYWxpemVBeFVzZXJJZEhlYWRlcihheFVzZXJJZE92ZXJyaWRlKTtcclxuICBjb25zdCByZXNvbHZlZEF4VXNlcklkID0gc2FmZVRleHQobm9ybWFsaXplZE92ZXJyaWRlQXhVc2VySWQgfHwgY29udGV4dC5heFVzZXJJZCk7XHJcbiAgaWYgKHJlc29sdmVkQXhVc2VySWQpIHtcclxuICAgIGhlYWRlcnNbXCJYLUlORC1BeFVzZXJJZFwiXSA9IHJlc29sdmVkQXhVc2VySWQ7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJlbW92ZUhlYWRlclZhbHVlKGhlYWRlcnMsIFwiWC1JTkQtQXhVc2VySWRcIik7XHJcbiAgfVxyXG4gIHJldHVybiBoZWFkZXJzO1xyXG59O1xyXG5cclxuLy8gTG9hZHMgdGhlIGV4cGVuc2Ugc2hlZXQgbGlzdCBmcm9tIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvbGlzdC5cclxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0TGlzdCA9IGFzeW5jIChcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCxcclxuICBvcHRpb25zPzogRXhwZW5zZVNoZWV0TGlzdEZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+PiA9PiB7XHJcbiAgY29uc3QgeyBheFVzZXJJZE92ZXJyaWRlLCBvblJlcXVlc3RQcmVwYXJlZCwgb25DYXB0dXJlLCAuLi5iYXNlT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcclxuICBjb25zdCByYXdDcmVhdGVkRGF0ZUZyb20gPSBzYWZlVGV4dChwYXlsb2FkPy5jcmVhdGVkRGF0ZUZyb20pO1xyXG4gIGNvbnN0IHJhd0NyZWF0ZWREYXRlVG8gPSBzYWZlVGV4dChwYXlsb2FkPy5jcmVhdGVkRGF0ZVRvKTtcclxuICBjb25zdCBjcmVhdGVkRGF0ZUZyb20gPSBub3JtYWxpemVPcHRpb25hbEFwaURhdGUocmF3Q3JlYXRlZERhdGVGcm9tKTtcclxuICBjb25zdCBjcmVhdGVkRGF0ZVRvID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlKHJhd0NyZWF0ZWREYXRlVG8pO1xyXG5cclxuICBpZiAocmF3Q3JlYXRlZERhdGVGcm9tICYmICFjcmVhdGVkRGF0ZUZyb20pIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xyXG4gIH1cclxuICBpZiAocmF3Q3JlYXRlZERhdGVUbyAmJiAhY3JlYXRlZERhdGVUbykge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzYWZlUGF5bG9hZDogRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3QgPSB7XHJcbiAgICAuLi5wYXlsb2FkLFxyXG4gICAgY3JlYXRlZERhdGVGcm9tLFxyXG4gICAgY3JlYXRlZERhdGVUbyxcclxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlcihwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyksXHJcbiAgICBpbmNsdWRlU3Vib3JkaW5hdGVzOiBwYXlsb2FkLmluY2x1ZGVTdWJvcmRpbmF0ZXMgPT09IHRydWUsXHJcbiAgfTtcclxuICBjb25zdCBzZXJpYWxpemVkUGF5bG9hZCA9IGNsb25lSnNvbkNvbXBhdGlibGVWYWx1ZShzYWZlUGF5bG9hZCk7XHJcblxyXG4gIG9uUmVxdWVzdFByZXBhcmVkPy4oc2VyaWFsaXplZFBheWxvYWQpO1xyXG5cclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQoYmFzZU9wdGlvbnMpO1xyXG4gIGNvbnN0IGxpc3RIZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgYmFzZU9wdGlvbnMsIHRydWUsIGZhbHNlKSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZE92ZXJyaWRlQXhVc2VySWQgPSBub3JtYWxpemVBeFVzZXJJZEhlYWRlcihheFVzZXJJZE92ZXJyaWRlKTtcclxuICBjb25zdCByZXNvbHZlZEF4VXNlcklkID0gc2FmZVRleHQobm9ybWFsaXplZE92ZXJyaWRlQXhVc2VySWQgfHwgY29udGV4dC5heFVzZXJJZCk7XHJcbiAgaWYgKHJlc29sdmVkQXhVc2VySWQpIHtcclxuICAgIGxpc3RIZWFkZXJzW1wiWC1JTkQtQXhVc2VySWRcIl0gPSByZXNvbHZlZEF4VXNlcklkO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShsaXN0SGVhZGVycywgXCJYLUlORC1BeFVzZXJJZFwiKTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldExpc3RJdGVtRHRvPj4oXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL2xpc3RcIiwge1xyXG4gICAgICAuLi5iYXNlT3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczogbGlzdEhlYWRlcnMsXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcclxuICAgIH0pO1xyXG5cclxuICAgIG9uQ2FwdHVyZT8uKHtcclxuICAgICAgcmVxdWVzdDogc2VyaWFsaXplZFBheWxvYWQsXHJcbiAgICAgIHJlc3BvbnNlOiBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUocmVzcG9uc2UpLFxyXG4gICAgICBheFVzZXJJZE92ZXJyaWRlOiBub3JtYWxpemVkT3ZlcnJpZGVBeFVzZXJJZCB8fCBudWxsLFxyXG4gICAgICBzb3VyY2U6IFwiYXBpXCIsXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBpZiAoIXNob3VsZFVzZUxlZ2FjeUZhbGxiYWNrKGVycm9yKSkge1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBsZWdhY3lSZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxMZWdhY3lFeHBlbnNlTGlzdFJlc3BvbnNlPihcIi9HYXN0b3MvTGlzdEV4cGVuc2VTaGVldHNcIiwge1xyXG4gICAgICAuLi5iYXNlT3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIC4uLnNhbml0aXplSGVhZGVycyhiYXNlT3B0aW9ucz8uaGVhZGVycyksXHJcbiAgICAgICAgLi4uSlNPTl9IRUFERVJTLFxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh0b0xlZ2FjeUxpc3RSZXF1ZXN0UGF5bG9hZChzYWZlUGF5bG9hZCkpLFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgbWFwcGVkID0gbWFwTGVnYWN5TGlzdFJlc3BvbnNlKFxyXG4gICAgICBsZWdhY3lSZXNwb25zZSxcclxuICAgICAgTnVtYmVyLmlzRmluaXRlKHNhZmVQYXlsb2FkLnBhZ2UpICYmIHNhZmVQYXlsb2FkLnBhZ2UgPiAwID8gc2FmZVBheWxvYWQucGFnZSA6IDEsXHJcbiAgICAgIE51bWJlci5pc0Zpbml0ZShzYWZlUGF5bG9hZC5wYWdlU2l6ZSkgJiYgc2FmZVBheWxvYWQucGFnZVNpemUgPiAwID8gc2FmZVBheWxvYWQucGFnZVNpemUgOiA1MFxyXG4gICAgKTtcclxuXHJcbiAgICBvbkNhcHR1cmU/Lih7XHJcbiAgICAgIHJlcXVlc3Q6IHNlcmlhbGl6ZWRQYXlsb2FkLFxyXG4gICAgICByZXNwb25zZTogY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlKG1hcHBlZCksXHJcbiAgICAgIGF4VXNlcklkT3ZlcnJpZGU6IG5vcm1hbGl6ZWRPdmVycmlkZUF4VXNlcklkIHx8IG51bGwsXHJcbiAgICAgIHNvdXJjZTogXCJsZWdhY3lcIixcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZShtYXBwZWQpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVBvc2l0aXZlSW50ZWdlciA9ICh2YWx1ZTogdW5rbm93biwgZmFsbGJhY2tWYWx1ZTogbnVtYmVyKTogbnVtYmVyID0+IHtcclxuICBjb25zdCBwYXJzZWRWYWx1ZSA9IE51bWJlcih2YWx1ZSk7XHJcbiAgaWYgKE51bWJlci5pc0Zpbml0ZShwYXJzZWRWYWx1ZSkgJiYgcGFyc2VkVmFsdWUgPiAwKSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihwYXJzZWRWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZmFsbGJhY2tWYWx1ZTtcclxufTtcclxuXHJcbi8vIFJlYnVpbGRzIG9uZSBmdWxsIGxpc3QgZW52ZWxvcGUgZm9yIHRoZSBhc3Npc3RhbnQgYnkgbG9hZGluZyBldmVyeSBwYWdlIG9mIHRoZSBhY3RpdmUgcXVlcnkuXHJcbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldExpc3RTb3VyY2VKc29uID0gYXN5bmMgKFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBFeHBlbnNlU2hlZXRMaXN0U291cmNlSnNvbk9wdGlvbnNcclxuKTogUHJvbWlzZTxFeHBlbnNlU2hlZXRMaXN0UmVzcG9uc2VFbnZlbG9wZT4gPT4ge1xyXG4gIGNvbnN0IHsgc2VlZFJlc3BvbnNlLCAuLi5iYXNlT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcclxuICBjb25zdCBmYWxsYmFja1BhZ2UgPSBub3JtYWxpemVQb3NpdGl2ZUludGVnZXIocGF5bG9hZD8ucGFnZSwgMSk7XHJcbiAgY29uc3QgZmFsbGJhY2tQYWdlU2l6ZSA9IG5vcm1hbGl6ZVBvc2l0aXZlSW50ZWdlcihwYXlsb2FkPy5wYWdlU2l6ZSwgNTApO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRTZWVkUmVzcG9uc2UgPSBzZWVkUmVzcG9uc2UgPyBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZShjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUoc2VlZFJlc3BvbnNlKSkgOiBudWxsO1xyXG4gIGNvbnN0IGluaXRpYWxSZXNwb25zZSA9IG5vcm1hbGl6ZWRTZWVkUmVzcG9uc2UgPz8gKGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0TGlzdChwYXlsb2FkLCBiYXNlT3B0aW9ucykpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRJbml0aWFsUmVzcG9uc2UgPSBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZShjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUoaW5pdGlhbFJlc3BvbnNlKSk7XHJcblxyXG4gIGlmIChub3JtYWxpemVkSW5pdGlhbFJlc3BvbnNlLlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcclxuICAgICAgc2FmZVRleHQobm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5NZXNzYWdlKSB8fCBcIkNvdWxkIG5vdCBsb2FkIHRoZSBmdWxsIGV4cGVuc2Ugc2hlZXQgcXVlcnkuXCJcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB0b3RhbFJlY29yZHNSYXcgPSBOdW1iZXIobm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5Ub3RhbCk7XHJcbiAgY29uc3QgdG90YWxSZWNvcmRzID1cclxuICAgIE51bWJlci5pc0Zpbml0ZSh0b3RhbFJlY29yZHNSYXcpICYmIHRvdGFsUmVjb3Jkc1JhdyA+PSAwXHJcbiAgICAgID8gTWF0aC5mbG9vcih0b3RhbFJlY29yZHNSYXcpXHJcbiAgICAgIDogbm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5JdGVtcy5sZW5ndGg7XHJcbiAgY29uc3QgZWZmZWN0aXZlUGFnZVNpemUgPSBub3JtYWxpemVQb3NpdGl2ZUludGVnZXIobm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5QYWdlU2l6ZSwgZmFsbGJhY2tQYWdlU2l6ZSk7XHJcbiAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGgubWF4KDEsIE1hdGguY2VpbCh0b3RhbFJlY29yZHMgLyBNYXRoLm1heCgxLCBlZmZlY3RpdmVQYWdlU2l6ZSkpKTtcclxuICBjb25zdCBjdXJyZW50UGFnZSA9IE1hdGgubWluKFxyXG4gICAgdG90YWxQYWdlcyxcclxuICAgIG5vcm1hbGl6ZVBvc2l0aXZlSW50ZWdlcihub3JtYWxpemVkSW5pdGlhbFJlc3BvbnNlLlBhZ2UgPz8gZmFsbGJhY2tQYWdlLCBmYWxsYmFja1BhZ2UpXHJcbiAgKTtcclxuXHJcbiAgaWYgKHRvdGFsUGFnZXMgPD0gMSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLi4ubm9ybWFsaXplZEluaXRpYWxSZXNwb25zZSxcclxuICAgICAgVG90YWw6IHRvdGFsUmVjb3JkcyxcclxuICAgICAgUGFnZTogMSxcclxuICAgICAgUGFnZVNpemU6IGVmZmVjdGl2ZVBhZ2VTaXplLFxyXG4gICAgICBJdGVtczogY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlKG5vcm1hbGl6ZWRJbml0aWFsUmVzcG9uc2UuSXRlbXMpLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGl0ZW1zQnlQYWdlID0gbmV3IE1hcDxudW1iZXIsIEV4cGVuc2VTaGVldExpc3RJdGVtRHRvW10+KCk7XHJcbiAgaXRlbXNCeVBhZ2Uuc2V0KGN1cnJlbnRQYWdlLCBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUobm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5JdGVtcykpO1xyXG5cclxuICBmb3IgKGxldCBwYWdlTnVtYmVyID0gMTsgcGFnZU51bWJlciA8PSB0b3RhbFBhZ2VzOyBwYWdlTnVtYmVyICs9IDEpIHtcclxuICAgIGlmIChwYWdlTnVtYmVyID09PSBjdXJyZW50UGFnZSkge1xyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYWdlUmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldExpc3QoXHJcbiAgICAgIHtcclxuICAgICAgICAuLi5wYXlsb2FkLFxyXG4gICAgICAgIHBhZ2U6IHBhZ2VOdW1iZXIsXHJcbiAgICAgICAgcGFnZVNpemU6IGVmZmVjdGl2ZVBhZ2VTaXplLFxyXG4gICAgICB9LFxyXG4gICAgICBiYXNlT3B0aW9uc1xyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocGFnZVJlc3BvbnNlLlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFxyXG4gICAgICAgIHNhZmVUZXh0KHBhZ2VSZXNwb25zZS5NZXNzYWdlKSB8fCBgQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBwYWdlICR7cGFnZU51bWJlcn0uYFxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGl0ZW1zQnlQYWdlLnNldChwYWdlTnVtYmVyLCBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUocGFnZVJlc3BvbnNlLkl0ZW1zKSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhbGxJdGVtczogRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG9bXSA9IFtdO1xyXG4gIGZvciAobGV0IHBhZ2VOdW1iZXIgPSAxOyBwYWdlTnVtYmVyIDw9IHRvdGFsUGFnZXM7IHBhZ2VOdW1iZXIgKz0gMSkge1xyXG4gICAgY29uc3QgcGFnZUl0ZW1zID0gaXRlbXNCeVBhZ2UuZ2V0KHBhZ2VOdW1iZXIpO1xyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHBhZ2VJdGVtcykgfHwgcGFnZUl0ZW1zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuXHJcbiAgICBhbGxJdGVtcy5wdXNoKC4uLnBhZ2VJdGVtcyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgLi4ubm9ybWFsaXplZEluaXRpYWxSZXNwb25zZSxcclxuICAgIFRvdGFsOiB0b3RhbFJlY29yZHMsXHJcbiAgICBQYWdlOiAxLFxyXG4gICAgUGFnZVNpemU6IGVmZmVjdGl2ZVBhZ2VTaXplLFxyXG4gICAgSXRlbXM6IGFsbEl0ZW1zLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBMb2FkcyBvbmUgZXhwZW5zZSBzaGVldCBkZXRhaWwgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9LlxyXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwgPSBhc3luYyAoXHJcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0RGV0YWlsRHRvPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlU2hlZXRJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXREZXRhaWxEdG8+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy8ke3NhZmVTaGVldElkfWAsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBSZWFkcyBhdmFpbGFibGUgY3VycmVuY2llcyBmcm9tIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvY3VycmVuY2llcy5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTaGVldEN1cnJlbmNpZXMgPSBhc3luYyAoXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+PiA9PiB7XHJcbiAgbGV0IGNvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0IHwgbnVsbCA9IG51bGw7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgaWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSkge1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGNvbXBhbnlJZCA9IHNhZmVUZXh0KGNvbnRleHQ/LmNvbXBhbnlJZCB8fCByZWFkV2luZG93U2VsZWN0ZWRDb21wYW55KCkpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3QgY2FjaGVLZXkgPSBjb21wYW55SWQgfHwgXCItXCI7XHJcblxyXG4gIGlmIChjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcy5oYXMoY2FjaGVLZXkpKSB7XHJcbiAgICByZXR1cm4gY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuZ2V0KGNhY2hlS2V5KSBhcyBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPjtcclxuICB9XHJcblxyXG4gIGlmIChwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5oYXMoY2FjaGVLZXkpKSB7XHJcbiAgICByZXR1cm4gcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuZ2V0KGNhY2hlS2V5KSBhcyBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+PjtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlcXVlc3RQcm9taXNlID0gKGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XHJcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIkF1dGhvcml6YXRpb25cIik7XHJcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIlgtSU5ELUF4VXNlcklkXCIpO1xyXG5cclxuICAgIGlmIChjb21wYW55SWQpIHtcclxuICAgICAgaGVhZGVyc1tcIlgtSU5ELUNvbXBhbnlcIl0gPSBjb21wYW55SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9jdXJyZW5jaWVzXCIsIHtcclxuICAgICAgICAuLi5vcHRpb25zLFxyXG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICBoZWFkZXJzLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRSZXNwb25zZSA9IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgICAgIGlmIChub3JtYWxpemVkUmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgIGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLnNldChjYWNoZUtleSwgbm9ybWFsaXplZFJlc3BvbnNlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRSZXNwb25zZTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGlmICghc2hvdWxkVXNlTGVnYWN5RmFsbGJhY2soZXJyb3IpKSB7XHJcbiAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGxlZ2FjeUxpc3RSZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxMZWdhY3lFeHBlbnNlTGlzdFJlc3BvbnNlPihcIi9HYXN0b3MvTGlzdEV4cGVuc2VTaGVldHNcIiwge1xyXG4gICAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAuLi5zYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyksXHJcbiAgICAgICAgICAuLi5KU09OX0hFQURFUlMsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICBmaWx0ZXI6IFwiXCIsXHJcbiAgICAgICAgICBob2phR2FzdG9zSWQ6IFwiXCIsXHJcbiAgICAgICAgICBiaWxsZWRNb2RlOiAyLFxyXG4gICAgICAgICAgZnJvbURhdGU6IFwiXCIsXHJcbiAgICAgICAgICB0b0RhdGU6IFwiXCIsXHJcbiAgICAgICAgICBwcm9qZWN0SWQ6IFwiXCIsXHJcbiAgICAgICAgICBjdXJyZW5jeUNvZGU6IFwiXCIsXHJcbiAgICAgICAgICBwYWdlOiAxLFxyXG4gICAgICAgICAgcGFnZVNpemU6IDIwMCxcclxuICAgICAgICB9KSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBzZWVuQ29kZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcclxuICAgICAgY29uc3Qgc291cmNlSXRlbXMgPSBBcnJheS5pc0FycmF5KGxlZ2FjeUxpc3RSZXNwb25zZS5pdGVtcykgPyBsZWdhY3lMaXN0UmVzcG9uc2UuaXRlbXMgOiBbXTtcclxuICAgICAgY29uc3QgZmFsbGJhY2tJdGVtczogRXhwZW5zZVNoZWV0Q3VycmVuY3lEdG9bXSA9IHNvdXJjZUl0ZW1zXHJcbiAgICAgICAgLm1hcCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5LmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSlcclxuICAgICAgICAuZmlsdGVyKChjb2RlKSA9PiAhIWNvZGUpXHJcbiAgICAgICAgLmZpbHRlcigoY29kZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHNlZW5Db2Rlcy5oYXMoY29kZSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIHNlZW5Db2Rlcy5hZGQoY29kZSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5tYXAoKGNvZGUpID0+ICh7XHJcbiAgICAgICAgICBDdXJyZW5jeUNvZGU6IGNvZGUsXHJcbiAgICAgICAgICBDdXJyZW5jeUNvZGVJU086IGNvZGUsXHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgY29uc3QgZmFsbGJhY2tSZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4gPSB7XHJcbiAgICAgICAgU3VjY2VzczogbGVnYWN5TGlzdFJlc3BvbnNlLnN1Y2Nlc3MgIT09IGZhbHNlLFxyXG4gICAgICAgIE1lc3NhZ2U6IHNhZmVUZXh0KGxlZ2FjeUxpc3RSZXNwb25zZS5tZXNzYWdlKSB8fCBcIk9LXCIsXHJcbiAgICAgICAgVG90YWw6IGZhbGxiYWNrSXRlbXMubGVuZ3RoLFxyXG4gICAgICAgIFBhZ2U6IDEsXHJcbiAgICAgICAgUGFnZVNpemU6IGZhbGxiYWNrSXRlbXMubGVuZ3RoLFxyXG4gICAgICAgIEl0ZW1zOiBmYWxsYmFja0l0ZW1zLFxyXG4gICAgICAgIFRyYWNlSWQ6IHVuZGVmaW5lZCxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRGYWxsYmFjayA9IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZShmYWxsYmFja1Jlc3BvbnNlKTtcclxuICAgICAgaWYgKG5vcm1hbGl6ZWRGYWxsYmFjay5TdWNjZXNzKSB7XHJcbiAgICAgICAgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuc2V0KGNhY2hlS2V5LCBub3JtYWxpemVkRmFsbGJhY2spO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbm9ybWFsaXplZEZhbGxiYWNrO1xyXG4gICAgfVxyXG4gIH0pKCk7XHJcblxyXG4gIHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLnNldChjYWNoZUtleSwgcmVxdWVzdFByb21pc2UpO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gYXdhaXQgcmVxdWVzdFByb21pc2U7XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLmRlbGV0ZShjYWNoZUtleSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gUmVhZHMgYXZhaWxhYmxlIHN1Ym9yZGluYXRlcyBmcm9tIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvc3Vib3JkaW5hdGVzLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVzID0gYXN5bmMgKFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICAvLyBTdWJvcmRpbmF0ZXMgbXVzdCBhbHdheXMgcmVzb2x2ZSBmcm9tIHRoZSBsb2dnZWQgY29udGV4dCB1c2VyLCBub3QgZnJvbSBhY3RpbmctdXNlciBvdmVycmlkZXMuXHJcbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIGZhbHNlLCBmYWxzZSkpO1xyXG4gIGNvbnN0IGNvbnRleHRBeFVzZXJJZCA9IHNhZmVUZXh0KGNvbnRleHQuYXhVc2VySWQpO1xyXG4gIGlmIChjb250ZXh0QXhVc2VySWQpIHtcclxuICAgIGhlYWRlcnNbXCJYLUlORC1BeFVzZXJJZFwiXSA9IGNvbnRleHRBeFVzZXJJZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8dW5rbm93bj4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9zdWJvcmRpbmF0ZXNcIiwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgIGhlYWRlcnMsXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIEV4cG9zZXMgdGhlIGRlZmF1bHQgY3VycmVuY3kgcmVzb2x2ZWQgZnJvbSBFbnRyYSBjb250ZXh0IGZvciBpbml0aWFsIHNlbGVjdGlvbnMuXHJcbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlID0gYXN5bmMgKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgICByZXR1cm4gc2FmZVRleHQoY29udGV4dC5kZWZhdWx0Q3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gUmVhZHMgZXhjaGFuZ2UgcmF0ZSBmcm9tIC9hcGkvc3lzdGVtL2V4Y2hhbmdlLXJhdGUuXHJcbmV4cG9ydCBjb25zdCBnZXRFeGNoYW5nZVJhdGUgPSBhc3luYyAoXHJcbiAgYmFzZUN1cnJlbmN5OiBzdHJpbmcsXHJcbiAgdGFyZ2V0Q3VycmVuY3k6IHN0cmluZyxcclxuICBkYXRlPzogc3RyaW5nLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeGNoYW5nZVJhdGVEdG8+PiA9PiB7XHJcbiAgY29uc3QgdG9rZW4gPSByZXNvbHZlQXV0aFRva2VuKG9wdGlvbnMpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kgPSBzYWZlVGV4dChiYXNlQ3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFRhcmdldEN1cnJlbmN5ID0gc2FmZVRleHQodGFyZ2V0Q3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZERhdGUgPSBzYWZlVGV4dChkYXRlKTtcclxuICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcclxuXHJcbiAgcXVlcnkuc2V0KFwiYmFzZUN1cnJlbmN5XCIsIG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kpO1xyXG4gIHF1ZXJ5LnNldChcInRhcmdldEN1cnJlbmN5XCIsIG5vcm1hbGl6ZWRUYXJnZXRDdXJyZW5jeSk7XHJcbiAgaWYgKG5vcm1hbGl6ZWREYXRlKSB7XHJcbiAgICBxdWVyeS5zZXQoXCJkYXRlXCIsIG5vcm1hbGl6ZWREYXRlKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XHJcbiAgaWYgKHRva2VuKSB7XHJcbiAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7dG9rZW59YDtcclxuICB9XHJcblxyXG4gIHJldHVybiBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhjaGFuZ2VSYXRlRHRvPj4oYC9hcGkvc3lzdGVtL2V4Y2hhbmdlLXJhdGU/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICBoZWFkZXJzLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gUmVhZHMgZXhjaGFuZ2UgcmF0ZSBmcm9tIC9hcGkvc3lzdGVtL2V4Y2hhbmdlLXJhdGUvcHVibGljLWRpcmVjdC5cclxuZXhwb3J0IGNvbnN0IGdldEV4Y2hhbmdlUmF0ZVB1YmxpY0RpcmVjdCA9IGFzeW5jIChcclxuICBiYXNlQ3VycmVuY3k6IHN0cmluZyxcclxuICB0YXJnZXRDdXJyZW5jeTogc3RyaW5nLFxyXG4gIGRhdGU/OiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4Y2hhbmdlUmF0ZUR0bz4+ID0+IHtcclxuICBjb25zdCB0b2tlbiA9IHJlc29sdmVBdXRoVG9rZW4ob3B0aW9ucyk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSA9IHNhZmVUZXh0KGJhc2VDdXJyZW5jeSkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBub3JtYWxpemVkVGFyZ2V0Q3VycmVuY3kgPSBzYWZlVGV4dCh0YXJnZXRDdXJyZW5jeSkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBub3JtYWxpemVkRGF0ZSA9IHNhZmVUZXh0KGRhdGUpO1xyXG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xyXG5cclxuICBxdWVyeS5zZXQoXCJiYXNlQ3VycmVuY3lcIiwgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSk7XHJcbiAgcXVlcnkuc2V0KFwidGFyZ2V0Q3VycmVuY3lcIiwgbm9ybWFsaXplZFRhcmdldEN1cnJlbmN5KTtcclxuICBpZiAobm9ybWFsaXplZERhdGUpIHtcclxuICAgIHF1ZXJ5LnNldChcImRhdGVcIiwgbm9ybWFsaXplZERhdGUpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcclxuICBpZiAodG9rZW4pIHtcclxuICAgIGhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeGNoYW5nZVJhdGVEdG8+PihgL2FwaS9zeXN0ZW0vZXhjaGFuZ2UtcmF0ZS9wdWJsaWMtZGlyZWN0PyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgaGVhZGVycyxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIFJlYWRzIGZ1ZWwgcHJpY2UgcGVyIGttIGZyb20gL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9mdWVsLXByaWNlLWttLlxyXG5leHBvcnQgY29uc3QgZ2V0RnVlbFByaWNlS20gPSBhc3luYyAoXHJcbiAgdHJhbnNEYXRlOiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEZ1ZWxQcmljZUttRHRvPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBub3JtYWxpemVkRGF0ZSA9IG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZSh0cmFuc0RhdGUpO1xyXG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xyXG5cclxuICBxdWVyeS5zZXQoXCJ0cmFuc0RhdGVcIiwgbm9ybWFsaXplZERhdGUpO1xyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxGdWVsUHJpY2VLbUR0bz4+KFxyXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvZnVlbC1wcmljZS1rbT8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCxcclxuICAgIHtcclxuICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBDcmVhdGVzIGFuIGV4cGVuc2Ugc2hlZXQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUV4cGVuc2VTaGVldCA9IGFzeW5jIChcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRDcmVhdGVSZXNwb25zZURhdGE+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IG1vZGUgPSBwYXlsb2FkLm1vZGUgPz8gMDtcclxuICBjb25zdCBsaW5lcyA9IEFycmF5LmlzQXJyYXkocGF5bG9hZC5saW5lcykgPyBwYXlsb2FkLmxpbmVzIDogW107XHJcbiAgY29uc3Qgbm9ybWFsaXplZExpbmVzID0gbGluZXMubWFwKChsaW5lKSA9PiAoe1xyXG4gICAgLi4ubGluZSxcclxuICAgIHRyYW5zRGF0ZTogbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlKGxpbmUudHJhbnNEYXRlKSxcclxuICB9KSk7XHJcbiAgY29uc3QgaGFzSW52YWxpZExpbmVQYXlsb2FkID0gbm9ybWFsaXplZExpbmVzLnNvbWUoKGxpbmUpID0+IHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICFzYWZlVGV4dChsaW5lLnRyYW5zRGF0ZSkgfHxcclxuICAgICAgIU51bWJlci5pc0ludGVnZXIoTnVtYmVyKGxpbmUudHlwZVZhbHVlKSkgfHxcclxuICAgICAgTnVtYmVyKGxpbmUudHlwZVZhbHVlKSA8PSAwIHx8XHJcbiAgICAgICFpc1Bvc2l0aXZlTnVtYmVyKGxpbmUucXR5KSB8fFxyXG4gICAgICAhaXNQb3NpdGl2ZU51bWJlcihsaW5lLnByaWNlKVxyXG4gICAgKTtcclxuICB9KTtcclxuXHJcbiAgaWYgKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzICE9PSB1bmRlZmluZWQgJiYgIWlzTm9uTmVnYXRpdmVOdW1iZXIocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMpKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4cGVuc2VTaGVldFN0YXR1cyBtdXN0IGJlIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMC5cIik7XHJcbiAgfVxyXG5cclxuICBpZiAocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlICE9PSB1bmRlZmluZWQgJiYgIWlzTm9uTmVnYXRpdmVOdW1iZXIocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlKSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleGNoYW5nZVJhdGVNb2RlIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byAwLlwiKTtcclxuICB9XHJcblxyXG4gIGlmIChwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUgIT09IHVuZGVmaW5lZCAmJiBwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4Y2hhbmdlUmF0ZU1vZGUgcmVxdWlyZXMgZXhwZW5zZVNoZWV0U3RhdHVzLlwiKTtcclxuICB9XHJcblxyXG4gIGlmIChoYXNJbnZhbGlkTGluZVBheWxvYWQpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiRWFjaCBsaW5lIHJlcXVpcmVzIHRyYW5zRGF0ZSwgdHlwZVZhbHVlLCBxdHkgPiAwIGFuZCBwcmljZSA+IDAuXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKG1vZGUgPT09IDApIHtcclxuICAgIGlmICghc2FmZVRleHQocGF5bG9hZC5kZXNjcmlwdGlvbikgfHwgIXNhZmVUZXh0KHBheWxvYWQuY3VycmVuY3lDb2RlKSB8fCBsaW5lcy5sZW5ndGggPCAxKSB7XHJcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiSW52YWxpZCBjcmVhdGUgcGF5bG9hZCBmb3IgbW9kZSAwLlwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChtb2RlID09PSAxKSB7XHJcbiAgICBpZiAoIXNhZmVUZXh0KHBheWxvYWQuZGVzY3JpcHRpb24pIHx8ICFzYWZlVGV4dChwYXlsb2FkLmN1cnJlbmN5Q29kZSkpIHtcclxuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJJbnZhbGlkIGNyZWF0ZSBwYXlsb2FkIGZvciBtb2RlIDEuXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsaW5lcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiTW9kZSAxIHJlcXVpcmVzIGxpbmVzIHRvIGJlIG51bGwgb3IgZW1wdHkuXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKG1vZGUgPT09IDIpIHtcclxuICAgIGlmICghc2FmZVRleHQocGF5bG9hZC5leGlzdGluZ0hvamFHYXN0b3NJZCkgfHwgbGluZXMubGVuZ3RoIDwgMSkge1xyXG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkludmFsaWQgY3JlYXRlIHBheWxvYWQgZm9yIG1vZGUgMi5cIik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBub3JtYWxpemVkUGF5bG9hZDogRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCA9IHtcclxuICAgIC4uLnBheWxvYWQsXHJcbiAgICBtb2RlLFxyXG4gICAgZXhpc3RpbmdIb2phR2FzdG9zSWQ6IHNhZmVUZXh0KHBheWxvYWQuZXhpc3RpbmdIb2phR2FzdG9zSWQpIHx8IHVuZGVmaW5lZCxcclxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChwYXlsb2FkLmRlc2NyaXB0aW9uKSB8fCB1bmRlZmluZWQsXHJcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KHBheWxvYWQuY3VycmVuY3lDb2RlKSB8fCB1bmRlZmluZWQsXHJcbiAgICBwcm9qSWQ6IHNhZmVUZXh0KHBheWxvYWQucHJvaklkKSB8fCB1bmRlZmluZWQsXHJcbiAgICBsaW5lczogbW9kZSA9PT0gMSA/IFtdIDogbm9ybWFsaXplZExpbmVzLFxyXG4gIH07XHJcbiAgY29uc3QgaW5jbHVkZUF4VXNlck92ZXJyaWRlID0gbW9kZSA9PT0gMjtcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3JlYXRlUmVzcG9uc2VEYXRhPj4oXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzXCIsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgLy8gSGVhZGVyIGNyZWF0ZSBmbG93cyBtdXN0IGFsd2F5cyBydW4gaW4gdGhlIHNpZ25lZC1pbiB1c2VyIGNvbnRleHQuXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUsIGluY2x1ZGVBeFVzZXJPdmVycmlkZSksXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShub3JtYWxpemVkUGF5bG9hZCksXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBVcGRhdGVzIGhlYWRlciBmaWVsZHMgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4cGVuc2VTaGVldEhlYWRlciA9IGFzeW5jIChcclxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTx7IEhvamFHYXN0b3NJZDogc3RyaW5nIH0+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcclxuXHJcbiAgaWYgKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzICE9PSB1bmRlZmluZWQgJiYgIWlzTm9uTmVnYXRpdmVOdW1iZXIocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMpKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4cGVuc2VTaGVldFN0YXR1cyBtdXN0IGJlIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMC5cIik7XHJcbiAgfVxyXG5cclxuICBpZiAocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlICE9PSB1bmRlZmluZWQgJiYgIWlzTm9uTmVnYXRpdmVOdW1iZXIocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlKSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleGNoYW5nZVJhdGVNb2RlIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byAwLlwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPHsgSG9qYUdhc3Rvc0lkOiBzdHJpbmcgfT4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9YCwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIERlbGV0ZXMgYSBmdWxsIGV4cGVuc2Ugc2hlZXQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS9saW5lcy8wP2RlbGV0ZVdob2xlU2hlZXQ9dHJ1ZS5cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VTaGVldCA9IGFzeW5jIChcclxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+PihcclxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9L2xpbmVzLzA/ZGVsZXRlTW9kZT0yJmRlbGV0ZVdob2xlU2hlZXQ9dHJ1ZWAsXHJcbiAgICB7XHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gVXBkYXRlcyBvbmUgZXhwZW5zZSBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0vbGluZXMve2xpbmVSZWNJZH0uXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVFeHBlbnNlU2hlZXRMaW5lID0gYXN5bmMgKFxyXG4gIGhvamFHYXN0b3NJZDogc3RyaW5nLFxyXG4gIGxpbmVSZWNJZDogc3RyaW5nLFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVzcG9uc2VEYXRhPj4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc0RhdGUgPSBub3JtYWxpemVSZXF1aXJlZEFwaURhdGUocGF5bG9hZC50cmFuc0RhdGUpO1xyXG4gIGlmIChcclxuICAgICFOdW1iZXIuaXNJbnRlZ2VyKE51bWJlcihwYXlsb2FkLnR5cGVWYWx1ZSkpIHx8XHJcbiAgICBOdW1iZXIocGF5bG9hZC50eXBlVmFsdWUpIDw9IDAgfHxcclxuICAgICFpc1Bvc2l0aXZlTnVtYmVyKHBheWxvYWQucXR5KSB8fFxyXG4gICAgIWlzUG9zaXRpdmVOdW1iZXIocGF5bG9hZC5wcmljZSlcclxuICApIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwidHJhbnNEYXRlLCB0eXBlVmFsdWUsIHF0eSA+IDAgYW5kIHByaWNlID4gMCBhcmUgcmVxdWlyZWQuXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCBzYWZlTGluZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhsaW5lUmVjSWQgfHwgXCJcIikudHJpbSgpKTtcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlc3BvbnNlRGF0YT4+KFxyXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH0vbGluZXMvJHtzYWZlTGluZUlkfWAsXHJcbiAgICB7XHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgIC4uLnBheWxvYWQsXHJcbiAgICAgICAgdHJhbnNEYXRlOiBub3JtYWxpemVkVHJhbnNEYXRlLFxyXG4gICAgICB9KSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gRGVsZXRlcyBvbmUgZXhwZW5zZSBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0vbGluZXMve2xpbmVSZWNJZH0/ZGVsZXRlV2hvbGVTaGVldD1mYWxzZS5cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VTaGVldExpbmUgPSBhc3luYyAoXHJcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXHJcbiAgbGluZVJlY0lkOiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG51bGw+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCBzYWZlTGluZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhsaW5lUmVjSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxudWxsPj4oXHJcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy8ke3NhZmVTaGVldElkfS9saW5lcy8ke3NhZmVMaW5lSWR9P2RlbGV0ZU1vZGU9MCZkZWxldGVXaG9sZVNoZWV0PWZhbHNlYCxcclxuICAgIHtcclxuICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxyXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVFeHBlbnNlU2hlZXRzQXNrUmVzcG9uc2UgPSAocmVzcG9uc2U6IEV4cGVuc2VTaGVldHNBc2tSZXN1bHQpOiBFeHBlbnNlU2hlZXRzQXNrUmVzdWx0ID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG4gIGNvbnN0IHJhd0RhdGEgPSBub3JtYWxpemVkPy5EYXRhO1xyXG4gIGlmICghcmF3RGF0YSB8fCB0eXBlb2YgcmF3RGF0YSAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLi4ubm9ybWFsaXplZCxcclxuICAgICAgTWVzc2FnZTogc2FuaXRpemVBc3Npc3RhbnRUZXh0KG5vcm1hbGl6ZWQ/Lk1lc3NhZ2UpLFxyXG4gICAgICBIdHRwU3RhdHVzOiB0eXBlb2YgcmVzcG9uc2U/Lkh0dHBTdGF0dXMgPT09IFwibnVtYmVyXCIgPyByZXNwb25zZS5IdHRwU3RhdHVzIDogdW5kZWZpbmVkLFxyXG4gICAgICBSZXRyeUFmdGVyOiBzYWZlVGV4dChyZXNwb25zZT8uUmV0cnlBZnRlcikgfHwgbnVsbCxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb25zdCByYXdXYXJuaW5ncyA9XHJcbiAgICAocmF3RGF0YSBhcyB7IFdhcm5pbmdzPzogdW5rbm93bjsgd2FybmluZ3M/OiB1bmtub3duIH0pLldhcm5pbmdzID8/XHJcbiAgICAocmF3RGF0YSBhcyB7IHdhcm5pbmdzPzogdW5rbm93biB9KS53YXJuaW5ncztcclxuICBjb25zdCByYXdGaWx0ZXJzQXBwbGllZCA9XHJcbiAgICAocmF3RGF0YSBhcyB7IEZpbHRlcnNBcHBsaWVkPzogdW5rbm93bjsgZmlsdGVyc0FwcGxpZWQ/OiB1bmtub3duIH0pLkZpbHRlcnNBcHBsaWVkID8/XHJcbiAgICAocmF3RGF0YSBhcyB7IGZpbHRlcnNBcHBsaWVkPzogdW5rbm93biB9KS5maWx0ZXJzQXBwbGllZDtcclxuXHJcbiAgY29uc3QgaXNJZ25vcmFibGVBc3Npc3RhbnRXYXJuaW5nID0gKHdhcm5pbmc6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZFdhcm5pbmcgPSBzYW5pdGl6ZUFzc2lzdGFudFRleHQod2FybmluZykudG9Mb3dlckNhc2UoKTtcclxuICAgIGlmICghbm9ybWFsaXplZFdhcm5pbmcpIHJldHVybiB0cnVlO1xyXG5cclxuICAgIHJldHVybiBub3JtYWxpemVkV2FybmluZy5pbmNsdWRlcyhcInNvdXJjZWpzb25cIikgJiZcclxuICAgICAgKG5vcm1hbGl6ZWRXYXJuaW5nLmluY2x1ZGVzKFwic2tpcHBlZFwiKSB8fCBub3JtYWxpemVkV2FybmluZy5pbmNsdWRlcyhcIm9taXRcIikpO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAuLi5ub3JtYWxpemVkLFxyXG4gICAgTWVzc2FnZTogc2FuaXRpemVBc3Npc3RhbnRUZXh0KG5vcm1hbGl6ZWQ/Lk1lc3NhZ2UpLFxyXG4gICAgSHR0cFN0YXR1czogdHlwZW9mIHJlc3BvbnNlPy5IdHRwU3RhdHVzID09PSBcIm51bWJlclwiID8gcmVzcG9uc2UuSHR0cFN0YXR1cyA6IHVuZGVmaW5lZCxcclxuICAgIFJldHJ5QWZ0ZXI6IHNhZmVUZXh0KHJlc3BvbnNlPy5SZXRyeUFmdGVyKSB8fCBudWxsLFxyXG4gICAgRGF0YToge1xyXG4gICAgICBBbnN3ZXI6IHNhbml0aXplQXNzaXN0YW50VGV4dChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IEFuc3dlcj86IHVua25vd247IGFuc3dlcj86IHVua25vd24gfSkuQW5zd2VyID8/IChyYXdEYXRhIGFzIHsgYW5zd2VyPzogdW5rbm93biB9KS5hbnN3ZXJcclxuICAgICAgKSxcclxuICAgICAgTW9kZWw6IHNhbml0aXplQXNzaXN0YW50VGV4dChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IE1vZGVsPzogdW5rbm93bjsgbW9kZWw/OiB1bmtub3duIH0pLk1vZGVsID8/IChyYXdEYXRhIGFzIHsgbW9kZWw/OiB1bmtub3duIH0pLm1vZGVsXHJcbiAgICAgICksXHJcbiAgICAgIFNvdXJjZUtleTogc2FuaXRpemVBc3Npc3RhbnRUZXh0KFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgU291cmNlS2V5PzogdW5rbm93bjsgc291cmNlS2V5PzogdW5rbm93biB9KS5Tb3VyY2VLZXkgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgc291cmNlS2V5PzogdW5rbm93biB9KS5zb3VyY2VLZXlcclxuICAgICAgKSxcclxuICAgICAgRmlsdGVyc0FwcGxpZWQ6XHJcbiAgICAgICAgcmF3RmlsdGVyc0FwcGxpZWQgJiYgdHlwZW9mIHJhd0ZpbHRlcnNBcHBsaWVkID09PSBcIm9iamVjdFwiXHJcbiAgICAgICAgICA/IGNsb25lSnNvbkNvbXBhdGlibGVWYWx1ZShyYXdGaWx0ZXJzQXBwbGllZCBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPilcclxuICAgICAgICAgIDogbnVsbCxcclxuICAgICAgVG90YWxTb3VyY2VSZWNvcmRzOlxyXG4gICAgICAgIHRvTnVsbGFibGVOdW1iZXIoXHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IFRvdGFsU291cmNlUmVjb3Jkcz86IHVua25vd247IHRvdGFsU291cmNlUmVjb3Jkcz86IHVua25vd24gfSkuVG90YWxTb3VyY2VSZWNvcmRzID8/XHJcbiAgICAgICAgICAgIChyYXdEYXRhIGFzIHsgdG90YWxTb3VyY2VSZWNvcmRzPzogdW5rbm93biB9KS50b3RhbFNvdXJjZVJlY29yZHNcclxuICAgICAgICApID8/IG51bGwsXHJcbiAgICAgIFJlY29yZHNTZW50VG9Nb2RlbDpcclxuICAgICAgICB0b051bGxhYmxlTnVtYmVyKFxyXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBSZWNvcmRzU2VudFRvTW9kZWw/OiB1bmtub3duOyByZWNvcmRzU2VudFRvTW9kZWw/OiB1bmtub3duIH0pLlJlY29yZHNTZW50VG9Nb2RlbCA/P1xyXG4gICAgICAgICAgICAocmF3RGF0YSBhcyB7IHJlY29yZHNTZW50VG9Nb2RlbD86IHVua25vd24gfSkucmVjb3Jkc1NlbnRUb01vZGVsXHJcbiAgICAgICAgKSA/PyBudWxsLFxyXG4gICAgICBSZXRyaWV2YWxNb2RlOiBzYW5pdGl6ZUFzc2lzdGFudFRleHQoXHJcbiAgICAgICAgKHJhd0RhdGEgYXMgeyBSZXRyaWV2YWxNb2RlPzogdW5rbm93bjsgcmV0cmlldmFsTW9kZT86IHVua25vd24gfSkuUmV0cmlldmFsTW9kZSA/P1xyXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyByZXRyaWV2YWxNb2RlPzogdW5rbm93biB9KS5yZXRyaWV2YWxNb2RlXHJcbiAgICAgICkgfHwgbnVsbCxcclxuICAgICAgVHJ1bmNhdGVkOiB0b051bGxhYmxlQm9vbChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IFRydW5jYXRlZD86IHVua25vd247IHRydW5jYXRlZD86IHVua25vd24gfSkuVHJ1bmNhdGVkID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IHRydW5jYXRlZD86IHVua25vd24gfSkudHJ1bmNhdGVkXHJcbiAgICAgICksXHJcbiAgICAgIFdhcm5pbmdzOiBBcnJheS5pc0FycmF5KHJhd1dhcm5pbmdzKVxyXG4gICAgICAgID8gcmF3V2FybmluZ3NcclxuICAgICAgICAgICAgLm1hcCgoZW50cnkpID0+IHNhbml0aXplQXNzaXN0YW50VGV4dChlbnRyeSkpXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeSAmJiAhaXNJZ25vcmFibGVBc3Npc3RhbnRXYXJuaW5nKGVudHJ5KSlcclxuICAgICAgICA6IFtdLFxyXG4gICAgfSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gQXNrcyBidXNpbmVzcyBxdWVzdGlvbnMgYWJvdXQgdGhlIGN1cnJlbnQgZXhwZW5zZSBzaGVldCBsaXN0IHVzaW5nIC9hcGkvaWEvc2VydmljZS9leHBlbnNlc2hlZXRzL2Fzay5cclxuZXhwb3J0IGNvbnN0IGFza0V4cGVuc2VTaGVldHNRdWVzdGlvbiA9IGFzeW5jIChcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRzQXNrUmVxdWVzdCxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8RXhwZW5zZVNoZWV0c0Fza1Jlc3VsdD4gPT4ge1xyXG4gIGNvbnN0IHF1ZXN0aW9uID0gc2FmZVRleHQocGF5bG9hZD8ucXVlc3Rpb24pO1xyXG4gIGlmICghcXVlc3Rpb24pIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwicXVlc3Rpb24gaXMgcmVxdWlyZWQuXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IGNzcmZUb2tlbiA9IGdldENzcmZUb2tlbigpO1xyXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMoYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSk7XHJcbiAgaWYgKGNzcmZUb2tlbikge1xyXG4gICAgaGVhZGVycy5SZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW4gPSBjc3JmVG9rZW47XHJcbiAgfVxyXG5cclxuICBjb25zdCBzYWZlUGF5bG9hZDogRXhwZW5zZVNoZWV0c0Fza1JlcXVlc3QgPSB7XHJcbiAgICBxdWVzdGlvbixcclxuICAgIGFuc3dlckluc3RydWN0aW9uczogc2FmZVRleHQocGF5bG9hZD8uYW5zd2VySW5zdHJ1Y3Rpb25zKSB8fCB1bmRlZmluZWQsXHJcbiAgICBsaXN0UmVxdWVzdDogY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlKHBheWxvYWQubGlzdFJlcXVlc3QpLFxyXG4gICAgc291cmNlSnNvbjpcclxuICAgICAgcGF5bG9hZD8uc291cmNlSnNvbiA9PT0gbnVsbCB8fCBwYXlsb2FkPy5zb3VyY2VKc29uID09PSB1bmRlZmluZWRcclxuICAgICAgICA/IHVuZGVmaW5lZFxyXG4gICAgICAgIDogY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlKHBheWxvYWQuc291cmNlSnNvbiksXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcIi9hcGkvaWEvc2VydmljZS9leHBlbnNlc2hlZXRzL2Fza1wiLCB7XHJcbiAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICBoZWFkZXJzLFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCByYXcgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgY29uc3QgcmV0cnlBZnRlciA9IHNhZmVUZXh0KHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiUmV0cnktQWZ0ZXJcIikpO1xyXG5cclxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICBjb25zdCByZWxvZ2luUmVzdWx0ID0gYXdhaXQgaGFuZGxlQXBpQXV0aEZhaWx1cmU8RXhwZW5zZVNoZWV0c0Fza1Jlc3VsdD4ocmF3LCByZXNwb25zZS5zdGF0dXMsIFwiZXhwZW5zZS1zaGVldHMtYXNrXCIpO1xyXG4gICAgaWYgKHJlbG9naW5SZXN1bHQgIT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIHJlbG9naW5SZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKHJlYWRBcGlNZXNzYWdlRnJvbVJhdyhyYXcpIHx8IFwiUGVybWlzc2lvbiBkZW5pZWQuXCIsIHJlc3BvbnNlLnN0YXR1cywgcmF3KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlZCA9IHRyeVBhcnNlSnNvbihyYXcpO1xyXG4gIGlmICghcGFyc2VkIHx8IHR5cGVvZiBwYXJzZWQgIT09IFwib2JqZWN0XCIpIHtcclxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IocmVhZEFwaU1lc3NhZ2VGcm9tUmF3KHJhdykgfHwgXCJSZXF1ZXN0IGZhaWxlZC5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xyXG4gICAgfVxyXG5cclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiSW52YWxpZCBzZXJ2ZXIgcmVzcG9uc2UuXCIsIHJlc3BvbnNlLnN0YXR1cywgcmF3KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVFeHBlbnNlU2hlZXRzQXNrUmVzcG9uc2Uoe1xyXG4gICAgLi4uKHBhcnNlZCBhcyBFeHBlbnNlU2hlZXRzQXNrUmVzdWx0KSxcclxuICAgIEh0dHBTdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcclxuICAgIFJldHJ5QWZ0ZXI6IHJldHJ5QWZ0ZXIgfHwgbnVsbCxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIEV4dHJhY3RzIGFuIGV4cGVuc2UgZHJhZnQgZnJvbSBhIHRpY2tldCBpbWFnZSB1c2luZyAvYXBpL2lhL3NlcnZpY2UvZXhwZW5zZWZyb210aWNrZXQuXHJcbmV4cG9ydCBjb25zdCBleHRyYWN0RXhwZW5zZUZyb21UaWNrZXREcmFmdCA9IGFzeW5jIChcclxuICB0aWNrZXRJbWFnZTogRmlsZSB8IEJsb2IsXHJcbiAgcGVyc2lzdFRpY2tldD86IGJvb2xlYW4sXHJcbiAgdGlja2V0VXJsRmlsZT86IHN0cmluZyxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0RHJhZnRSZXNwb25zZT4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3QgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gIGNvbnN0IHNhZmVUaWNrZXRVcmwgPSBzYWZlVGV4dCh0aWNrZXRVcmxGaWxlKTtcclxuXHJcbiAgaWYgKHRpY2tldEltYWdlIGluc3RhbmNlb2YgRmlsZSkge1xyXG4gICAgZm9ybS5hcHBlbmQoXCJ0aWNrZXRJbWFnZVwiLCB0aWNrZXRJbWFnZSwgc2FmZVRleHQodGlja2V0SW1hZ2UubmFtZSkgfHwgXCJ0aWNrZXQuanBnXCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBmb3JtLmFwcGVuZChcInRpY2tldEltYWdlXCIsIHRpY2tldEltYWdlLCBcInRpY2tldC5qcGdcIik7XHJcbiAgfVxyXG5cclxuICBpZiAodHlwZW9mIHBlcnNpc3RUaWNrZXQgPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcInBlcnNpc3RUaWNrZXRcIiwgcGVyc2lzdFRpY2tldCA/IFwidHJ1ZVwiIDogXCJmYWxzZVwiKTtcclxuICB9XHJcblxyXG4gIGlmIChzYWZlVGlja2V0VXJsKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcInRpY2tldFVybEZpbGVcIiwgc2FmZVRpY2tldFVybCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXREcmFmdFJlc3BvbnNlPj4oXCIvYXBpL2lhL3NlcnZpY2UvZXhwZW5zZWZyb210aWNrZXRcIiwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VGb3JtSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICAgIGJvZHk6IGZvcm0sXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBDcmVhdGVzIGFuZCBmaW5hbGl6ZXMgb25lIHRpY2tldCBmcm9tIGEgc2luZ2xlIG11bHRpcGFydCB1cGxvYWQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3F1aWNrLWNyZWF0ZS5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUV4cGVuc2VTaGVldFRpY2tldFF1aWNrID0gYXN5bmMgKFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVxdWVzdCxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8RXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQ+ID0+IHtcclxuICBpZiAoIXBheWxvYWQ/LnRpY2tldEltYWdlKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcInRpY2tldEltYWdlIGlzIHJlcXVpcmVkLlwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IF9zdXBwcmVzc1Blcm1pc3Npb25Nb2RhbCwgLi4uZmV0Y2hPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChmZXRjaE9wdGlvbnMpO1xyXG4gIGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcclxuICBjb25zdCBzYWZlQ3VycmVuY3lDb2RlID0gc2FmZVRleHQocGF5bG9hZD8uY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpO1xyXG4gIGNvbnN0IHNhZmVEZXNjcmlwdGlvbiA9IHNhZmVUZXh0KHBheWxvYWQ/LmRlc2NyaXB0aW9uKTtcclxuICBjb25zdCBzYWZlQ29tZW50YXJpbyA9IHNhZmVUZXh0KHBheWxvYWQ/LmNvbWVudGFyaW8pO1xyXG4gIGNvbnN0IHNhZmVTaGVldElkID0gc2FmZVRleHQocGF5bG9hZD8uZXhpc3RpbmdIb2phR2FzdG9zSWQpO1xyXG4gIGNvbnN0IHNhZmVQcm9qZWN0SWQgPSBzYWZlVGV4dChwYXlsb2FkPy5wcm9qZWN0SWQpO1xyXG4gIGNvbnN0IHRpY2tldEltYWdlID0gcGF5bG9hZC50aWNrZXRJbWFnZTtcclxuXHJcbiAgaWYgKHRpY2tldEltYWdlIGluc3RhbmNlb2YgRmlsZSkge1xyXG4gICAgZm9ybS5hcHBlbmQoXCJ0aWNrZXRJbWFnZVwiLCB0aWNrZXRJbWFnZSwgc2FmZVRleHQodGlja2V0SW1hZ2UubmFtZSkgfHwgXCJ0aWNrZXQuanBnXCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBmb3JtLmFwcGVuZChcInRpY2tldEltYWdlXCIsIHRpY2tldEltYWdlLCBcInRpY2tldC5qcGdcIik7XHJcbiAgfVxyXG5cclxuICBpZiAoc2FmZUN1cnJlbmN5Q29kZSkge1xyXG4gICAgZm9ybS5hcHBlbmQoXCJjdXJyZW5jeUNvZGVcIiwgc2FmZUN1cnJlbmN5Q29kZSk7XHJcbiAgfVxyXG5cclxuICBpZiAoXCJkZXNjcmlwdGlvblwiIGluIHBheWxvYWQpIHtcclxuICAgIGZvcm0uYXBwZW5kKFwiZGVzY3JpcHRpb25cIiwgc2FmZURlc2NyaXB0aW9uKTtcclxuICB9XHJcblxyXG4gIGlmIChcImNvbWVudGFyaW9cIiBpbiBwYXlsb2FkKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcImNvbWVudGFyaW9cIiwgc2FmZUNvbWVudGFyaW8pO1xyXG4gIH1cclxuXHJcbiAgaWYgKHNhZmVTaGVldElkKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcImV4aXN0aW5nSG9qYUdhc3Rvc0lkXCIsIHNhZmVTaGVldElkKTtcclxuICB9XHJcblxyXG4gIGlmIChzYWZlU2hlZXRJZCAmJiBzYWZlUHJvamVjdElkKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcInByb2plY3RJZFwiLCBzYWZlUHJvamVjdElkKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNzcmZUb2tlbiA9IGdldENzcmZUb2tlbigpO1xyXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMoYnVpbGRFeHBlbnNlRm9ybUhlYWRlcnMoY29udGV4dCwgZmV0Y2hPcHRpb25zKSk7XHJcbiAgaWYgKGNzcmZUb2tlbikge1xyXG4gICAgaGVhZGVycy5SZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW4gPSBjc3JmVG9rZW47XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3F1aWNrLWNyZWF0ZVwiLCB7XHJcbiAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxyXG4gICAgLi4uZmV0Y2hPcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnMsXHJcbiAgICBib2R5OiBmb3JtLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCByYXcgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgY29uc3QgcmV0cnlBZnRlciA9IHNhZmVUZXh0KHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiUmV0cnktQWZ0ZXJcIikpO1xyXG5cclxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICBjb25zdCByZWxvZ2luUmVzdWx0ID0gYXdhaXQgaGFuZGxlQXBpQXV0aEZhaWx1cmU8RXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQ+KFxyXG4gICAgICByYXcsXHJcbiAgICAgIHJlc3BvbnNlLnN0YXR1cyxcclxuICAgICAgXCJ0aWNrZXQtcXVpY2stY3JlYXRlXCJcclxuICAgICk7XHJcbiAgICBpZiAocmVsb2dpblJlc3VsdCAhPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gcmVsb2dpblJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IocmVhZEFwaU1lc3NhZ2VGcm9tUmF3KHJhdykgfHwgXCJQZXJtaXNzaW9uIGRlbmllZC5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgcGFyc2VkID0gdHJ5UGFyc2VKc29uKHJhdyk7XHJcbiAgaWYgKCFwYXJzZWQgfHwgdHlwZW9mIHBhcnNlZCAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihyZWFkQXBpTWVzc2FnZUZyb21SYXcocmF3KSB8fCBcIlJlcXVlc3QgZmFpbGVkLlwiLCByZXNwb25zZS5zdGF0dXMsIHJhdyk7XHJcbiAgICB9XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkludmFsaWQgc2VydmVyIHJlc3BvbnNlLlwiLCByZXNwb25zZS5zdGF0dXMsIHJhdyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZSh7XHJcbiAgICAuLi4ocGFyc2VkIGFzIEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVzdWx0KSxcclxuICAgIEh0dHBTdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcclxuICAgIFJldHJ5QWZ0ZXI6IHJldHJ5QWZ0ZXIgfHwgbnVsbCxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIENyZWF0ZXMgYSB0aWNrZXQgaGVhZGVyL2xpbmVzIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRDcmVhdGVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IG1vZGUgPSBOdW1iZXIocGF5bG9hZD8ubW9kZSk7XHJcbiAgY29uc3QgcmF3VHJhbnNEYXRlID0gc2FmZVRleHQocGF5bG9hZD8udHJhbnNEYXRlKTtcclxuICBjb25zdCBub3JtYWxpemVkVHJhbnNEYXRlID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlKHJhd1RyYW5zRGF0ZSk7XHJcblxyXG4gIGlmIChyYXdUcmFuc0RhdGUgJiYgIW5vcm1hbGl6ZWRUcmFuc0RhdGUpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xyXG4gIH1cclxuXHJcbiAgaWYgKChtb2RlID09PSAwIHx8IG1vZGUgPT09IDEpICYmICFub3JtYWxpemVkVHJhbnNEYXRlKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRDcmVhdGVSZXF1ZXN0ID0ge1xyXG4gICAgLi4ucGF5bG9hZCxcclxuICAgIHRyYW5zRGF0ZTogbm9ybWFsaXplZFRyYW5zRGF0ZSB8fCB1bmRlZmluZWQsXHJcbiAgICBnYXN0b1R5cGU6IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlKHBheWxvYWQ/Lmdhc3RvVHlwZSksXHJcbiAgfTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0c1wiLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVUaWNrZXRGaWx0ZXJDcml0ZXJpYVBheWxvYWQgPSA8XHJcbiAgVCBleHRlbmRzIHtcclxuICAgIGNyZWF0ZWREYXRlRnJvbT86IHN0cmluZztcclxuICAgIGNyZWF0ZWREYXRlVG8/OiBzdHJpbmc7XHJcbiAgICBzZWFyY2hLZXk/OiBzdHJpbmc7XHJcbiAgICBmaWx0ZXI/OiBzdHJpbmc7XHJcbiAgICBjdXJyZW5jeUNvZGU/OiBzdHJpbmc7XHJcbiAgICBnYXN0b1R5cGU/OiB1bmtub3duO1xyXG4gICAgcHJvY2Vzc2VkQnlBST86IHVua25vd247XHJcbiAgfSxcclxuPihcclxuICBwYXlsb2FkOiBUXHJcbikgPT4ge1xyXG4gIGNvbnN0IHJhd0NyZWF0ZWREYXRlRnJvbSA9IHNhZmVUZXh0KHBheWxvYWQ/LmNyZWF0ZWREYXRlRnJvbSk7XHJcbiAgY29uc3QgcmF3Q3JlYXRlZERhdGVUbyA9IHNhZmVUZXh0KHBheWxvYWQ/LmNyZWF0ZWREYXRlVG8pO1xyXG4gIGNvbnN0IGNyZWF0ZWREYXRlRnJvbSA9IG5vcm1hbGl6ZVRpY2tldExpc3REYXRlKHJhd0NyZWF0ZWREYXRlRnJvbSk7XHJcbiAgY29uc3QgY3JlYXRlZERhdGVUbyA9IG5vcm1hbGl6ZVRpY2tldExpc3REYXRlKHJhd0NyZWF0ZWREYXRlVG8pO1xyXG4gIGlmIChyYXdDcmVhdGVkRGF0ZUZyb20gJiYgIWNyZWF0ZWREYXRlRnJvbSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgfVxyXG4gIGlmIChyYXdDcmVhdGVkRGF0ZVRvICYmICFjcmVhdGVkRGF0ZVRvKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHByZWZlcnJlZFNlYXJjaEtleSA9IHNhZmVUZXh0KHBheWxvYWQ/LnNlYXJjaEtleSB8fCBwYXlsb2FkPy5maWx0ZXIpO1xyXG4gIGNvbnN0IGxlZ2FjeUZpbHRlciA9IHNhZmVUZXh0KHBheWxvYWQ/LmZpbHRlciB8fCBwcmVmZXJyZWRTZWFyY2hLZXkpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY3JlYXRlZERhdGVGcm9tOiBjcmVhdGVkRGF0ZUZyb20gfHwgdW5kZWZpbmVkLFxyXG4gICAgY3JlYXRlZERhdGVUbzogY3JlYXRlZERhdGVUbyB8fCB1bmRlZmluZWQsXHJcbiAgICBzZWFyY2hLZXk6IHByZWZlcnJlZFNlYXJjaEtleSB8fCB1bmRlZmluZWQsXHJcbiAgICBmaWx0ZXI6IGxlZ2FjeUZpbHRlciB8fCB1bmRlZmluZWQsXHJcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KHBheWxvYWQ/LmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSB8fCB1bmRlZmluZWQsXHJcbiAgICBnYXN0b1R5cGU6IG5vcm1hbGl6ZVRpY2tldExpc3RHYXN0b1R5cGUocGF5bG9hZD8uZ2FzdG9UeXBlKSxcclxuICAgIHByb2Nlc3NlZEJ5QUk6IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSShwYXlsb2FkPy5wcm9jZXNzZWRCeUFJKSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdEZpbHRlclBheWxvYWQgPSA8XHJcbiAgVCBleHRlbmRzIHtcclxuICAgIHBhZ2U/OiBudW1iZXI7XHJcbiAgICBwYWdlU2l6ZT86IG51bWJlcjtcclxuICAgIGNyZWF0ZWREYXRlRnJvbT86IHN0cmluZztcclxuICAgIGNyZWF0ZWREYXRlVG8/OiBzdHJpbmc7XHJcbiAgICBzZWFyY2hLZXk/OiBzdHJpbmc7XHJcbiAgICBmaWx0ZXI/OiBzdHJpbmc7XHJcbiAgICBjdXJyZW5jeUNvZGU/OiBzdHJpbmc7XHJcbiAgICBnYXN0b1R5cGU/OiB1bmtub3duO1xyXG4gICAgcHJvY2Vzc2VkQnlBST86IHVua25vd247XHJcbiAgfSxcclxuPihcclxuICBwYXlsb2FkOiBUXHJcbikgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBwYWdlOiBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZD8ucGFnZSkgJiYgTnVtYmVyKHBheWxvYWQucGFnZSkgPiAwID8gTWF0aC5mbG9vcihOdW1iZXIocGF5bG9hZC5wYWdlKSkgOiAxLFxyXG4gICAgcGFnZVNpemU6IE51bWJlci5pc0Zpbml0ZShwYXlsb2FkPy5wYWdlU2l6ZSkgJiYgTnVtYmVyKHBheWxvYWQucGFnZVNpemUpID4gMCA/IE1hdGguZmxvb3IoTnVtYmVyKHBheWxvYWQucGFnZVNpemUpKSA6IDUwLFxyXG4gICAgLi4ubm9ybWFsaXplVGlja2V0RmlsdGVyQ3JpdGVyaWFQYXlsb2FkKHBheWxvYWQpLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBMb2FkcyB0aWNrZXQgbGlzdCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGlzdC5cclxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QgPSBhc3luYyAoXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEV4cGVuc2VUaWNrZXRMaXN0RmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz4+ID0+IHtcclxuICBjb25zdCB7IGF4VXNlcklkT3ZlcnJpZGUsIC4uLmJhc2VPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChiYXNlT3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0ID0ge1xyXG4gICAgLi4ubm9ybWFsaXplVGlja2V0TGlzdEZpbHRlclBheWxvYWQocGF5bG9hZCksXHJcbiAgICBzdGF0dXM6IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzKHBheWxvYWQ/LnN0YXR1cyksXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz4+KFxyXG4gICAgXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGlzdFwiLFxyXG4gICAge1xyXG4gICAgICAuLi5iYXNlT3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRUaWNrZXRMaXN0SGVhZGVycyhjb250ZXh0LCBiYXNlT3B0aW9ucywgYXhVc2VySWRPdmVycmlkZSksXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gTG9hZHMgbGluay1tb2RlIHRpY2tldCBsaXN0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saW5rL2xpc3QuXHJcbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0ID0gYXN5bmMgKFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0UmVxdWVzdCxcclxuICBvcHRpb25zPzogRXhwZW5zZVRpY2tldExpc3RGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0bz4+ID0+IHtcclxuICBjb25zdCB7IGF4VXNlcklkT3ZlcnJpZGUsIC4uLmJhc2VPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChiYXNlT3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0UmVxdWVzdCA9IHtcclxuICAgIC4uLm5vcm1hbGl6ZVRpY2tldExpc3RGaWx0ZXJQYXlsb2FkKHBheWxvYWQpLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RJdGVtRHRvPj4oXHJcbiAgICBcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saW5rL2xpc3RcIixcclxuICAgIHtcclxuICAgICAgLi4uYmFzZU9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkVGlja2V0TGlzdEhlYWRlcnMoY29udGV4dCwgYmFzZU9wdGlvbnMsIGF4VXNlcklkT3ZlcnJpZGUpLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBMaW5rcyBzZWxlY3RlZCBvciBmaWx0ZXJlZCB0aWNrZXRzIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saW5rL2J1bGsuXHJcbmV4cG9ydCBjb25zdCBsaW5rRXhwZW5zZVNoZWV0VGlja2V0c0J1bGsgPSBhc3luYyAoXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBFeHBlbnNlVGlja2V0TGlzdEZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvPj4gPT4ge1xyXG4gIGNvbnN0IHsgYXhVc2VySWRPdmVycmlkZSwgLi4uYmFzZU9wdGlvbnMgfSA9IG9wdGlvbnMgfHwge307XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KGJhc2VPcHRpb25zKTtcclxuICBjb25zdCBzZWxlY3Rpb25Nb2RlID0gcGF5bG9hZD8uc2VsZWN0aW9uTW9kZSA9PT0gXCJmaWx0ZXJlZFwiID8gXCJmaWx0ZXJlZFwiIDogXCJzZWxlY3RlZFwiO1xyXG4gIGNvbnN0IHRpY2tldElkcyA9IEFycmF5LmlzQXJyYXkocGF5bG9hZD8udGlja2V0SWRzKVxyXG4gICAgPyBwYXlsb2FkLnRpY2tldElkcy5tYXAoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeSkpLmZpbHRlcihCb29sZWFuKVxyXG4gICAgOiBbXTtcclxuICBjb25zdCBleGNsdWRlZElkcyA9IEFycmF5LmlzQXJyYXkocGF5bG9hZD8uZXhjbHVkZWRJZHMpXHJcbiAgICA/IHBheWxvYWQuZXhjbHVkZWRJZHMubWFwKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnkpKS5maWx0ZXIoQm9vbGVhbilcclxuICAgIDogW107XHJcblxyXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1JlcXVlc3QgPSB7XHJcbiAgICBleHBlbnNlU2hlZXRJZDogc2FmZVRleHQocGF5bG9hZD8uZXhwZW5zZVNoZWV0SWQpLFxyXG4gICAgc2VsZWN0aW9uTW9kZSxcclxuICAgIHRpY2tldElkczogc2VsZWN0aW9uTW9kZSA9PT0gXCJzZWxlY3RlZFwiID8gdGlja2V0SWRzIDogdW5kZWZpbmVkLFxyXG4gICAgZmlsdGVyczpcclxuICAgICAgc2VsZWN0aW9uTW9kZSA9PT0gXCJmaWx0ZXJlZFwiICYmIHBheWxvYWQ/LmZpbHRlcnNcclxuICAgICAgICA/IHtcclxuICAgICAgICAgICAgLi4ubm9ybWFsaXplVGlja2V0RmlsdGVyQ3JpdGVyaWFQYXlsb2FkKHBheWxvYWQuZmlsdGVycyksXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgOiB1bmRlZmluZWQsXHJcbiAgICBleGNsdWRlZElkczogc2VsZWN0aW9uTW9kZSA9PT0gXCJmaWx0ZXJlZFwiID8gZXhjbHVkZWRJZHMgOiB1bmRlZmluZWQsXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXN1bHREdG8+PihcclxuICAgIFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL2xpbmsvYnVsa1wiLFxyXG4gICAge1xyXG4gICAgICAuLi5iYXNlT3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRUaWNrZXRMaXN0SGVhZGVycyhjb250ZXh0LCBiYXNlT3B0aW9ucywgYXhVc2VySWRPdmVycmlkZSksXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplVGlja2V0TGlua0J1bGtSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBMb2FkcyBvbmUgdGlja2V0IGRldGFpbCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0uXHJcbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXREZXRhaWxEdG8+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvPj4oXHJcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH1gLFxyXG4gICAge1xyXG4gICAgICAuLi5vcHRpb25zLFxyXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gRG93bmxvYWRzIG9uZSB0aWNrZXQgaW1hZ2UgcHJldmlldyBibG9iIHRocm91Z2ggdGhlIGludGVybmFsIHByb3h5IGVuZHBvaW50LlxyXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRQcmV2aWV3QmxvYiA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICB1cmxGaWxlOiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEJsb2I+ID0+IHtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gc2FmZVRleHQoZmlsZUlkKTtcclxuICBjb25zdCBzYWZlVXJsRmlsZSA9IHNhZmVUZXh0KHVybEZpbGUpO1xyXG4gIGlmICghc2FmZUZpbGVJZCB8fCAhc2FmZVVybEZpbGUpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiTWlzc2luZyB0aWNrZXQgcHJldmlldyBwYXlsb2FkLlwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IF9zdXBwcmVzc1Blcm1pc3Npb25Nb2RhbCwgLi4uZmV0Y2hPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBjc3JmVG9rZW4gPSBnZXRDc3JmVG9rZW4oKTtcclxuICBjb25zdCBoZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgZmV0Y2hPcHRpb25zLCB0cnVlKSk7XHJcbiAgaGVhZGVycy5BY2NlcHQgPSBcImltYWdlLypcIjtcclxuICBjb25zdCByZXF1ZXN0SGVhZGVyczogSGVhZGVyc0luaXQgPSB7XHJcbiAgICBBY2NlcHQ6IFwiaW1hZ2UvKlwiLFxyXG4gICAgLi4uaGVhZGVycyxcclxuICB9O1xyXG5cclxuICBpZiAoY3NyZlRva2VuKSB7XHJcbiAgICAocmVxdWVzdEhlYWRlcnMgYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPilbXCJSZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW5cIl0gPSBjc3JmVG9rZW47XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3ByZXZpZXdcIiwge1xyXG4gICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcclxuICAgIC4uLmZldGNoT3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICBoZWFkZXJzOiByZXF1ZXN0SGVhZGVycyxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgZmlsZUlkOiBzYWZlRmlsZUlkLFxyXG4gICAgICB1cmxGaWxlOiBzYWZlVXJsRmlsZSxcclxuICAgIH0pLFxyXG4gIH0pO1xyXG5cclxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICBjb25zdCByYXcgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgICBjb25zdCByZWxvZ2luUmVzdWx0ID0gYXdhaXQgaGFuZGxlQXBpQXV0aEZhaWx1cmU8QmxvYj4ocmF3LCByZXNwb25zZS5zdGF0dXMsIFwidGlja2V0LXByZXZpZXdcIik7XHJcbiAgICBpZiAocmVsb2dpblJlc3VsdCAhPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gcmVsb2dpblJlc3VsdDtcclxuICAgIH1cclxuICAgIGNvbnN0IG1lc3NhZ2UgPSByZWFkQXBpTWVzc2FnZUZyb21SYXcocmF3KTtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKG1lc3NhZ2UgfHwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXQgcHJldmlldy5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYmxvYiA9IGF3YWl0IHJlc3BvbnNlLmJsb2IoKTtcclxuICBpZiAoIWJsb2IgfHwgYmxvYi5zaXplID09PSAwKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkNvdWxkIG5vdCBsb2FkIHRpY2tldCBwcmV2aWV3LlwiKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBibG9iO1xyXG59O1xyXG5cclxuLy8gVXBkYXRlcyB0aWNrZXQgaGVhZGVyIG1ldGFkYXRhIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJhd1RyYW5zRGF0ZSA9IHNhZmVUZXh0KHBheWxvYWQ/LnRyYW5zRGF0ZSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFRyYW5zRGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdUcmFuc0RhdGUpO1xyXG5cclxuICBpZiAocmF3VHJhbnNEYXRlICYmICFub3JtYWxpemVkVHJhbnNEYXRlKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0ID0ge1xyXG4gICAgLi4ucGF5bG9hZCxcclxuICAgIHRyYW5zRGF0ZTogbm9ybWFsaXplZFRyYW5zRGF0ZSB8fCB1bmRlZmluZWQsXHJcbiAgICBnYXN0b1R5cGU6IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlKHBheWxvYWQ/Lmdhc3RvVHlwZSksXHJcbiAgfTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH1gLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIERlbGV0ZXMgb25lIHRpY2tldCBvciBvbmUgdGlja2V0IGxpbmUgdmlhIHF1ZXJ5IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS5cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICBsaW5lUmVjSWQ/OiBudW1iZXIsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG51bGw+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xyXG4gIGlmIChOdW1iZXIuaXNJbnRlZ2VyKE51bWJlcihsaW5lUmVjSWQpKSAmJiBOdW1iZXIobGluZVJlY0lkKSA+IDApIHtcclxuICAgIHF1ZXJ5LnNldChcImxpbmVSZWNJZFwiLCBTdHJpbmcobGluZVJlY0lkKSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzdWZmaXggPSBxdWVyeS50b1N0cmluZygpO1xyXG4gIGNvbnN0IHVybCA9IHN1ZmZpeFxyXG4gICAgPyBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0/JHtzdWZmaXh9YFxyXG4gICAgOiBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH1gO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+Pih1cmwsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gQXBwbGllcyBJQSBwYXlsb2FkIG92ZXIgYW4gZXhpc3RpbmcgdGlja2V0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9pYS5cclxuZXhwb3J0IGNvbnN0IGFwcGx5RXhwZW5zZVNoZWV0VGlja2V0SWEgPSBhc3luYyAoXHJcbiAgZmlsZUlkOiBzdHJpbmcsXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJhd1BheWxvYWQgPSAocGF5bG9hZCB8fCB7fSkgYXMgRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0O1xyXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3QgPSB7XHJcbiAgICAuLi5yYXdQYXlsb2FkLFxyXG4gIH07XHJcbiAgY29uc3Qgbm9ybWFsaXplZFRyYW5zRGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdQYXlsb2FkLnRyYW5zRGF0ZSk7XHJcbiAgaWYgKCFub3JtYWxpemVkVHJhbnNEYXRlKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICB9XHJcbiAgc2FmZVBheWxvYWQudHJhbnNEYXRlID0gbm9ybWFsaXplZFRyYW5zRGF0ZTtcclxuXHJcbiAgY29uc3QgZ2FzdG9UeXBlID0gbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUocmF3UGF5bG9hZC5nYXN0b1R5cGUpO1xyXG4gIGlmIChnYXN0b1R5cGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgZGVsZXRlIHNhZmVQYXlsb2FkLmdhc3RvVHlwZTtcclxuICB9IGVsc2Uge1xyXG4gICAgc2FmZVBheWxvYWQuZ2FzdG9UeXBlID0gZ2FzdG9UeXBlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2lhYCwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gQ3JlYXRlcyBvbmUgdGlja2V0IGxpbmUgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9L2xpbmVzLlxyXG5leHBvcnQgY29uc3QgY3JlYXRlRXhwZW5zZVNoZWV0VGlja2V0TGluZSA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5lUmVxdWVzdCxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4gPT4ge1xyXG4gIGlmICghc2FmZVRleHQocGF5bG9hZD8uZGVzY3JpcHRpb24pIHx8ICFpc1Bvc2l0aXZlTnVtYmVyKHBheWxvYWQ/LnF0eSkgfHwgIWlzUG9zaXRpdmVOdW1iZXIocGF5bG9hZD8ucHJpY2UpKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImRlc2NyaXB0aW9uLCBxdHkgPiAwIGFuZCBwcmljZSA+IDAgYXJlIHJlcXVpcmVkLlwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vbGluZXNgLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIFVwZGF0ZXMgb25lIHRpY2tldCBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9saW5lcy97bGluZVJlY0lkfS5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldExpbmUgPSBhc3luYyAoXHJcbiAgZmlsZUlkOiBzdHJpbmcsXHJcbiAgbGluZVJlY0lkOiBzdHJpbmcgfCBudW1iZXIsXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGluZVJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcclxuICBpZiAoIXNhZmVUZXh0KHBheWxvYWQ/LmRlc2NyaXB0aW9uKSB8fCAhaXNQb3NpdGl2ZU51bWJlcihwYXlsb2FkPy5xdHkpIHx8ICFpc1Bvc2l0aXZlTnVtYmVyKHBheWxvYWQ/LnByaWNlKSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJkZXNjcmlwdGlvbiwgcXR5ID4gMCBhbmQgcHJpY2UgPiAwIGFyZSByZXF1aXJlZC5cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3Qgc2FmZUxpbmVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcobGluZVJlY0lkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4oXHJcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vbGluZXMvJHtzYWZlTGluZUlkfWAsXHJcbiAgICB7XHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIERlbGV0ZXMgb25lIHRpY2tldCBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9saW5lcy97bGluZVJlY0lkfS5cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldExpbmUgPSBhc3luYyAoXHJcbiAgZmlsZUlkOiBzdHJpbmcsXHJcbiAgbGluZVJlY0lkOiBzdHJpbmcgfCBudW1iZXIsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG51bGw+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHNhZmVMaW5lSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGxpbmVSZWNJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+PihcclxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9saW5lcy8ke3NhZmVMaW5lSWR9YCxcclxuICAgIHtcclxuICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIkRFTEVURVwiLFxyXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBVcGxvYWRzL3JlcGxhY2VzIHRpY2tldCBmaWxlIGNvbnRlbnQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9L2ZpbGUuXHJcbmV4cG9ydCBjb25zdCB1cGxvYWRFeHBlbnNlU2hlZXRUaWNrZXRGaWxlID0gYXN5bmMgKFxyXG4gIGZpbGVJZDogc3RyaW5nLFxyXG4gIGZpbGU6IEZpbGUgfCBCbG9iLFxyXG4gIGV4dGVuc2lvbj86IHN0cmluZyxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCBzYWZlRXh0ZW5zaW9uID0gc2FmZVRleHQoZXh0ZW5zaW9uKS5yZXBsYWNlKC9eXFwuLywgXCJcIik7XHJcbiAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XHJcbiAgaWYgKHNhZmVFeHRlbnNpb24pIHtcclxuICAgIHF1ZXJ5LnNldChcImV4dGVuc2lvblwiLCBzYWZlRXh0ZW5zaW9uKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHN1ZmZpeCA9IHF1ZXJ5LnRvU3RyaW5nKCk7XHJcbiAgY29uc3QgdXJsID0gc3VmZml4XHJcbiAgICA/IGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9maWxlPyR7c3VmZml4fWBcclxuICAgIDogYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2ZpbGVgO1xyXG4gIGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcclxuICBpZiAoZmlsZSBpbnN0YW5jZW9mIEZpbGUpIHtcclxuICAgIGZvcm0uYXBwZW5kKFwiZmlsZVwiLCBmaWxlLCBzYWZlVGV4dChmaWxlLm5hbWUpIHx8IGB0aWNrZXQuJHtzYWZlRXh0ZW5zaW9uIHx8IFwianBnXCJ9YCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGZvcm0uYXBwZW5kKFwiZmlsZVwiLCBmaWxlLCBgdGlja2V0LiR7c2FmZUV4dGVuc2lvbiB8fCBcImpwZ1wifWApO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4odXJsLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUZvcm1IZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gICAgYm9keTogZm9ybSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIERlbGV0ZXMgdGlja2V0IGZpbGUgY29udGVudCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vZmlsZS5cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldEZpbGUgPSBhc3luYyAoXHJcbiAgZmlsZUlkOiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG51bGw+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vZmlsZWAsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gU2VhcmNoZXMgcHJvamVjdHMgZm9yIGRyb3Bkb3duIHVzYWdlIGluIGZpbHRlcnMgYW5kIGVkaXQgZm9ybXMuXHJcbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VQcm9qZWN0cyA9IGFzeW5jIChcclxuICB0ZXJtOiBzdHJpbmcsXHJcbiAgcGFnZTogbnVtYmVyLFxyXG4gIHBhZ2VTaXplOiBudW1iZXIsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPFByb2plY3REcm9wZG93blJlc3BvbnNlPiA9PiB7XHJcbiAgY29uc3Qgc2FmZVRlcm0gPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKHRlcm0gfHwgXCJcIikpO1xyXG4gIGNvbnN0IHNhZmVQYWdlID0gTnVtYmVyLmlzRmluaXRlKHBhZ2UpICYmIHBhZ2UgPiAwID8gTWF0aC5mbG9vcihwYWdlKSA6IDE7XHJcbiAgY29uc3Qgc2FmZVBhZ2VTaXplID0gTnVtYmVyLmlzRmluaXRlKHBhZ2VTaXplKSAmJiBwYWdlU2l6ZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2VTaXplKSA6IDIwO1xyXG5cclxuICByZXR1cm4gZmV0Y2hKc29uPFByb2plY3REcm9wZG93blJlc3BvbnNlPihcclxuICAgIGAvR2FzdG9zL0dldFByb2plY3RzRm9yRHJvcGRvd24/dGVybT0ke3NhZmVUZXJtfSZwYWdlPSR7c2FmZVBhZ2V9JnBhZ2VTaXplPSR7c2FmZVBhZ2VTaXplfWAsXHJcbiAgICB7XHJcbiAgICAgIG1ldGhvZDog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bWJlciIsICJpc05vbk5lZ2F0aXZlTnVtYmVyIiwgImlzUG9zaXRpdmVOdW1iZXIiLCAibm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUiLCAibm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZSIsICJub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1cyIsICJub3JtYWxpemVPcHRpb25hbEFwaURhdGUiLCAibm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlIiwgIm5vcm1hbGl6ZVRpY2tldExpc3REYXRlIiwgInRvTnVsbGFibGVCb29sIiwgIm5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSSIsICJub3JtYWxpemVFeHBlbnNlU2hlZXRMaXN0U3RhdHVzRmlsdGVyIiwgInRvRmxhZ0Jvb2wiLCAicmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lIiwgInNhZmVUZXh0IiwgIm5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlIiwgIm5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplQXBpUmVzcG9uc2UiLCAibm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZSIsICJub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVUaWNrZXRMaW5rTGlzdFBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVUaWNrZXRMaW5rQnVsa1Jlc3BvbnNlIiwgInRvTnVsbGFibGVOdW1iZXIiLCAibWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmQiLCAibWFwRXhwZW5zZVNoZWV0SGVhZGVyIiwgIm1hcEV4cGVuc2VTaGVldExpbmUiLCAiaXNQb3NpdGl2ZU51bWJlciIsICJpc05vbk5lZ2F0aXZlTnVtYmVyIl0KfQo=
