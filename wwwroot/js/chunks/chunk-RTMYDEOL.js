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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlQXBpUmVzcG9uc2VOb3JtYWxpemVycy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VBcGlNYXBwZXJzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZVVpVXRpbHMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3V0aWxzL2NvbXBhbnlTZWxlY3Rpb24udHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlQXBpLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7XHJcbiAgRXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8sXHJcbiAgRXhwZW5zZVNoZWV0RGV0YWlsRHRvLFxyXG4gIEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldERldGFpbER0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdEl0ZW1EdG8sXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8sXHJcbiAgRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8sXHJcbiAgSW5kQXBpUmVzcG9uc2UsXHJcbiAgSW5kUGFnZWRSZXNwb25zZSxcclxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgc2FmZVRleHQsXHJcbiAgdG9OdWxsYWJsZUJvb2wsXHJcbiAgdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUsXHJcbiAgdG9OdWxsYWJsZU51bWJlcixcclxuICB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZSxcclxufSBmcm9tIFwiLi9leHBlbnNlQXBpVHJhbnNmb3Jtcy50c1wiO1xyXG5pbXBvcnQgeyBub3JtYWxpemVFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZXMgfSBmcm9tIFwiLi9leHBlbnNlU3Vib3JkaW5hdGVNYXBwZXIudHNcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz5cclxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz4gPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICAuLi5yZXNwb25zZSxcclxuICAgIEl0ZW1zOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXREZXRhaWxEdG8+XHJcbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0RGV0YWlsRHRvPiA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnJlc3BvbnNlLFxyXG4gICAgSXRlbXM6IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW10sXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVBcGlSZXNwb25zZSA9IDxUPihyZXNwb25zZTogSW5kQXBpUmVzcG9uc2U8VD4pOiBJbmRBcGlSZXNwb25zZTxUPiA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnJlc3BvbnNlLFxyXG4gICAgRXJyb3JzOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5FcnJvcnMpID8gcmVzcG9uc2UuRXJyb3JzIDogcmVzcG9uc2U/LkVycm9ycyA/PyBudWxsLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHRcclxuKTogRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgY29uc3QgcmF3RGF0YSA9IG5vcm1hbGl6ZWQ/LkRhdGE7XHJcbiAgaWYgKCFyYXdEYXRhIHx8IHR5cGVvZiByYXdEYXRhICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAuLi5ub3JtYWxpemVkLFxyXG4gICAgICBIdHRwU3RhdHVzOiB0eXBlb2YgcmVzcG9uc2U/Lkh0dHBTdGF0dXMgPT09IFwibnVtYmVyXCIgPyByZXNwb25zZS5IdHRwU3RhdHVzIDogdW5kZWZpbmVkLFxyXG4gICAgICBSZXRyeUFmdGVyOiBzYWZlVGV4dChyZXNwb25zZT8uUmV0cnlBZnRlcikgfHwgbnVsbCxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb25zdCByYXdTdGVwVHJhY2VJZHMgPVxyXG4gICAgKHJhd0RhdGEgYXMgeyBTdGVwVHJhY2VJZHM/OiB1bmtub3duOyBzdGVwVHJhY2VJZHM/OiB1bmtub3duIH0pLlN0ZXBUcmFjZUlkcyA/P1xyXG4gICAgKHJhd0RhdGEgYXMgeyBzdGVwVHJhY2VJZHM/OiB1bmtub3duIH0pLnN0ZXBUcmFjZUlkcztcclxuICBjb25zdCBzdGVwVHJhY2VJZHMgPSByYXdTdGVwVHJhY2VJZHMgJiYgdHlwZW9mIHJhd1N0ZXBUcmFjZUlkcyA9PT0gXCJvYmplY3RcIiA/IHJhd1N0ZXBUcmFjZUlkcyA6IG51bGw7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAuLi5ub3JtYWxpemVkLFxyXG4gICAgSHR0cFN0YXR1czogdHlwZW9mIHJlc3BvbnNlPy5IdHRwU3RhdHVzID09PSBcIm51bWJlclwiID8gcmVzcG9uc2UuSHR0cFN0YXR1cyA6IHVuZGVmaW5lZCxcclxuICAgIFJldHJ5QWZ0ZXI6IHNhZmVUZXh0KHJlc3BvbnNlPy5SZXRyeUFmdGVyKSB8fCBudWxsLFxyXG4gICAgRGF0YToge1xyXG4gICAgICBGaWxlSWQ6IHNhZmVUZXh0KChyYXdEYXRhIGFzIHsgRmlsZUlkPzogdW5rbm93bjsgZmlsZUlkPzogdW5rbm93biB9KS5GaWxlSWQgPz8gKHJhd0RhdGEgYXMgeyBmaWxlSWQ/OiB1bmtub3duIH0pLmZpbGVJZCksXHJcbiAgICAgIFVybEZpbGU6IHNhZmVUZXh0KFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgVXJsRmlsZT86IHVua25vd247IHVybEZpbGU/OiB1bmtub3duIH0pLlVybEZpbGUgPz8gKHJhd0RhdGEgYXMgeyB1cmxGaWxlPzogdW5rbm93biB9KS51cmxGaWxlXHJcbiAgICAgICksXHJcbiAgICAgIEZpbGVOYW1lOiBzYWZlVGV4dChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IEZpbGVOYW1lPzogdW5rbm93bjsgZmlsZU5hbWU/OiB1bmtub3duIH0pLkZpbGVOYW1lID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IGZpbGVOYW1lPzogdW5rbm93biB9KS5maWxlTmFtZVxyXG4gICAgICApLFxyXG4gICAgICBQcm9jZXNzZWRCeUFJOiB0b051bGxhYmxlQm9vbChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KS5Qcm9jZXNzZWRCeUFJID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pLnByb2Nlc3NlZEJ5QUlcclxuICAgICAgKSxcclxuICAgICAgTGlua2VkVG9TaGVldDpcclxuICAgICAgICB0b051bGxhYmxlQm9vbChcclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgTGlua2VkVG9TaGVldD86IHVua25vd247IGxpbmtlZFRvU2hlZXQ/OiB1bmtub3duIH0pLkxpbmtlZFRvU2hlZXQgPz9cclxuICAgICAgICAgICAgKHJhd0RhdGEgYXMgeyBsaW5rZWRUb1NoZWV0PzogdW5rbm93biB9KS5saW5rZWRUb1NoZWV0XHJcbiAgICAgICAgKSA9PT0gdHJ1ZSxcclxuICAgICAgSG9qYUdhc3Rvc0lkOlxyXG4gICAgICAgIHNhZmVUZXh0KFxyXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBIb2phR2FzdG9zSWQ/OiB1bmtub3duOyBob2phR2FzdG9zSWQ/OiB1bmtub3duIH0pLkhvamFHYXN0b3NJZCA/P1xyXG4gICAgICAgICAgICAocmF3RGF0YSBhcyB7IGhvamFHYXN0b3NJZD86IHVua25vd24gfSkuaG9qYUdhc3Rvc0lkXHJcbiAgICAgICAgKSB8fCBudWxsLFxyXG4gICAgICBDb21wbGV0ZWRTdGFnZTogc2FmZVRleHQoXHJcbiAgICAgICAgKHJhd0RhdGEgYXMgeyBDb21wbGV0ZWRTdGFnZT86IHVua25vd247IGNvbXBsZXRlZFN0YWdlPzogdW5rbm93biB9KS5Db21wbGV0ZWRTdGFnZSA/P1xyXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBjb21wbGV0ZWRTdGFnZT86IHVua25vd24gfSkuY29tcGxldGVkU3RhZ2VcclxuICAgICAgKSxcclxuICAgICAgU3RlcFRyYWNlSWRzOiBzdGVwVHJhY2VJZHNcclxuICAgICAgICA/IHtcclxuICAgICAgICAgICAgVGlja2V0Q3JlYXRlOiBzYWZlVGV4dChcclxuICAgICAgICAgICAgICAoc3RlcFRyYWNlSWRzIGFzIHsgVGlja2V0Q3JlYXRlPzogdW5rbm93bjsgdGlja2V0Q3JlYXRlPzogdW5rbm93biB9KS5UaWNrZXRDcmVhdGUgPz9cclxuICAgICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyB0aWNrZXRDcmVhdGU/OiB1bmtub3duIH0pLnRpY2tldENyZWF0ZVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBGaWxlVXBsb2FkOiBzYWZlVGV4dChcclxuICAgICAgICAgICAgICAoc3RlcFRyYWNlSWRzIGFzIHsgRmlsZVVwbG9hZD86IHVua25vd247IGZpbGVVcGxvYWQ/OiB1bmtub3duIH0pLkZpbGVVcGxvYWQgPz9cclxuICAgICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyBmaWxlVXBsb2FkPzogdW5rbm93biB9KS5maWxlVXBsb2FkXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIERyYWZ0RXh0cmFjdDogc2FmZVRleHQoXHJcbiAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IERyYWZ0RXh0cmFjdD86IHVua25vd247IGRyYWZ0RXh0cmFjdD86IHVua25vd24gfSkuRHJhZnRFeHRyYWN0ID8/XHJcbiAgICAgICAgICAgICAgICAoc3RlcFRyYWNlSWRzIGFzIHsgZHJhZnRFeHRyYWN0PzogdW5rbm93biB9KS5kcmFmdEV4dHJhY3RcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgVGlja2V0RmluYWxpemU6IHNhZmVUZXh0KFxyXG4gICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyBUaWNrZXRGaW5hbGl6ZT86IHVua25vd247IHRpY2tldEZpbmFsaXplPzogdW5rbm93biB9KS5UaWNrZXRGaW5hbGl6ZSA/P1xyXG4gICAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IHRpY2tldEZpbmFsaXplPzogdW5rbm93biB9KS50aWNrZXRGaW5hbGl6ZVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBTaGVldExpbms6IHNhZmVUZXh0KFxyXG4gICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyBTaGVldExpbms/OiB1bmtub3duOyBzaGVldExpbms/OiB1bmtub3duIH0pLlNoZWV0TGluayA/P1xyXG4gICAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IHNoZWV0TGluaz86IHVua25vd24gfSkuc2hlZXRMaW5rXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgOiBudWxsLFxyXG4gICAgfSxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz5cclxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4gPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICAuLi5yZXNwb25zZSxcclxuICAgIEl0ZW1zOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTx1bmtub3duPlxyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvPiA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEl0ZW1zID0gbm9ybWFsaXplRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVzKHJlc3BvbnNlPy5JdGVtcyk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAuLi5yZXNwb25zZSxcclxuICAgIEl0ZW1zOiBub3JtYWxpemVkSXRlbXMsXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz5cclxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz4gPT4ge1xyXG4gIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+ICh7XHJcbiAgICAuLi5pdGVtLFxyXG4gICAgU3RhdHVzOiB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZShcclxuICAgICAgKGl0ZW0gYXMgeyBTdGF0dXM/OiB1bmtub3duOyBzdGF0dXM/OiB1bmtub3duIH0pPy5TdGF0dXMgPz9cclxuICAgICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LnN0YXR1c1xyXG4gICAgKSxcclxuICAgIFByb2Nlc3NlZEJ5QUk6IHRvTnVsbGFibGVCb29sKFxyXG4gICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8uUHJvY2Vzc2VkQnlBSSA/P1xyXG4gICAgICAgIChpdGVtIGFzIHsgUHJvY2Vzc2VkQnlBST86IHVua25vd247IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pPy5wcm9jZXNzZWRCeUFJXHJcbiAgICApLFxyXG4gICAgR2FzdG9UeXBlOiB0b051bGxhYmxlR2FzdG9UeXBlQ29kZShcclxuICAgICAgKGl0ZW0gYXMgeyBHYXN0b1R5cGU/OiB1bmtub3duOyBnYXN0b1R5cGU/OiB1bmtub3duIH0pPy5HYXN0b1R5cGUgPz9cclxuICAgICAgICAoaXRlbSBhcyB7IEdhc3RvVHlwZT86IHVua25vd247IGdhc3RvVHlwZT86IHVua25vd24gfSk/Lmdhc3RvVHlwZVxyXG4gICAgKSxcclxuICB9KSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAuLi5yZXNwb25zZSxcclxuICAgIEl0ZW1zOiBub3JtYWxpemVkSXRlbXMsXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVUaWNrZXRMaW5rTGlzdFBhZ2VkUmVzcG9uc2UgPSAoXHJcbiAgcmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RJdGVtRHRvPlxyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0bz4gPT4ge1xyXG4gIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+ICh7XHJcbiAgICAuLi5pdGVtLFxyXG4gICAgUHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woXHJcbiAgICAgIChpdGVtIGFzIHsgUHJvY2Vzc2VkQnlBST86IHVua25vd247IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pPy5Qcm9jZXNzZWRCeUFJID8/XHJcbiAgICAgICAgKGl0ZW0gYXMgeyBQcm9jZXNzZWRCeUFJPzogdW5rbm93bjsgcHJvY2Vzc2VkQnlBST86IHVua25vd24gfSk/LnByb2Nlc3NlZEJ5QUlcclxuICAgICksXHJcbiAgICBHYXN0b1R5cGU6IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlKFxyXG4gICAgICAoaXRlbSBhcyB7IEdhc3RvVHlwZT86IHVua25vd247IGdhc3RvVHlwZT86IHVua25vd24gfSk/Lkdhc3RvVHlwZSA/P1xyXG4gICAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uZ2FzdG9UeXBlXHJcbiAgICApLFxyXG4gIH0pKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnJlc3BvbnNlLFxyXG4gICAgSXRlbXM6IG5vcm1hbGl6ZWRJdGVtcyxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2UgPSAoXHJcbiAgcmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvPlxyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldERldGFpbER0bz4gPT4ge1xyXG4gIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+ICh7XHJcbiAgICAuLi5pdGVtLFxyXG4gICAgU3RhdHVzOiB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZShcclxuICAgICAgKGl0ZW0gYXMgeyBTdGF0dXM/OiB1bmtub3duOyBzdGF0dXM/OiB1bmtub3duIH0pPy5TdGF0dXMgPz9cclxuICAgICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LnN0YXR1c1xyXG4gICAgKSxcclxuICAgIFByb2Nlc3NlZEJ5QUk6IHRvTnVsbGFibGVCb29sKFxyXG4gICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8uUHJvY2Vzc2VkQnlBSSA/P1xyXG4gICAgICAgIChpdGVtIGFzIHsgUHJvY2Vzc2VkQnlBST86IHVua25vd247IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pPy5wcm9jZXNzZWRCeUFJXHJcbiAgICApLFxyXG4gICAgSG9qYUdhc3Rvc0lkRGlzcGxheTogc2FmZVRleHQoXHJcbiAgICAgIChpdGVtIGFzIHsgSG9qYUdhc3Rvc0lkRGlzcGxheT86IHVua25vd247IGhvamFHYXN0b3NJZERpc3BsYXk/OiB1bmtub3duIH0pPy5Ib2phR2FzdG9zSWREaXNwbGF5ID8/XHJcbiAgICAgICAgKGl0ZW0gYXMgeyBIb2phR2FzdG9zSWREaXNwbGF5PzogdW5rbm93bjsgaG9qYUdhc3Rvc0lkRGlzcGxheT86IHVua25vd24gfSk/LmhvamFHYXN0b3NJZERpc3BsYXlcclxuICAgICksXHJcbiAgICBHYXN0b1R5cGU6IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlKFxyXG4gICAgICAoaXRlbSBhcyB7IEdhc3RvVHlwZT86IHVua25vd247IGdhc3RvVHlwZT86IHVua25vd24gfSk/Lkdhc3RvVHlwZSA/P1xyXG4gICAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uZ2FzdG9UeXBlXHJcbiAgICApLFxyXG4gICAgTGluZXM6IEFycmF5LmlzQXJyYXkoaXRlbT8uTGluZXMpID8gaXRlbS5MaW5lcyA6IFtdLFxyXG4gIH0pKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnJlc3BvbnNlLFxyXG4gICAgSXRlbXM6IG5vcm1hbGl6ZWRJdGVtcyxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVRpY2tldExpbmtCdWxrUmVzcG9uc2UgPSAoXHJcbiAgcmVzcG9uc2U6IEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvPlxyXG4pOiBJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0bz4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgY29uc3QgcmF3RGF0YSA9IG5vcm1hbGl6ZWQ/LkRhdGE7XHJcbiAgaWYgKCFyYXdEYXRhIHx8IHR5cGVvZiByYXdEYXRhICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICByZXR1cm4gbm9ybWFsaXplZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHRvSXNzdWVMaXN0ID0gKHZhbHVlOiB1bmtub3duKSA9PiB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gW107XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlLm1hcCgoZW50cnkpID0+ICh7XHJcbiAgICAgIHRpY2tldElkOiBzYWZlVGV4dChcclxuICAgICAgICAoZW50cnkgYXMgeyB0aWNrZXRJZD86IHVua25vd247IFRpY2tldElkPzogdW5rbm93biB9KT8udGlja2V0SWQgPz9cclxuICAgICAgICAgIChlbnRyeSBhcyB7IFRpY2tldElkPzogdW5rbm93biB9KS5UaWNrZXRJZFxyXG4gICAgICApLFxyXG4gICAgICByZWFzb246IHNhZmVUZXh0KFxyXG4gICAgICAgIChlbnRyeSBhcyB7IHJlYXNvbj86IHVua25vd247IFJlYXNvbj86IHVua25vd24gfSk/LnJlYXNvbiA/P1xyXG4gICAgICAgICAgKGVudHJ5IGFzIHsgUmVhc29uPzogdW5rbm93biB9KS5SZWFzb25cclxuICAgICAgKSxcclxuICAgIH0pKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBsaW5rZWRUaWNrZXRJZHNSYXcgPVxyXG4gICAgKHJhd0RhdGEgYXMgeyBsaW5rZWRUaWNrZXRJZHM/OiB1bmtub3duOyBMaW5rZWRUaWNrZXRJZHM/OiB1bmtub3duIH0pLmxpbmtlZFRpY2tldElkcyA/P1xyXG4gICAgKHJhd0RhdGEgYXMgeyBMaW5rZWRUaWNrZXRJZHM/OiB1bmtub3duIH0pLkxpbmtlZFRpY2tldElkcztcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLm5vcm1hbGl6ZWQsXHJcbiAgICBEYXRhOiB7XHJcbiAgICAgIGV4cGVuc2VTaGVldElkOiBzYWZlVGV4dChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IGV4cGVuc2VTaGVldElkPzogdW5rbm93bjsgRXhwZW5zZVNoZWV0SWQ/OiB1bmtub3duIH0pLmV4cGVuc2VTaGVldElkID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IEV4cGVuc2VTaGVldElkPzogdW5rbm93biB9KS5FeHBlbnNlU2hlZXRJZFxyXG4gICAgICApLFxyXG4gICAgICByZXF1ZXN0ZWRDb3VudDogdG9OdWxsYWJsZU51bWJlcihcclxuICAgICAgICAocmF3RGF0YSBhcyB7IHJlcXVlc3RlZENvdW50PzogdW5rbm93bjsgUmVxdWVzdGVkQ291bnQ/OiB1bmtub3duIH0pLnJlcXVlc3RlZENvdW50ID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IFJlcXVlc3RlZENvdW50PzogdW5rbm93biB9KS5SZXF1ZXN0ZWRDb3VudFxyXG4gICAgICApID8/IDAsXHJcbiAgICAgIGxpbmtlZENvdW50OiB0b051bGxhYmxlTnVtYmVyKFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgbGlua2VkQ291bnQ/OiB1bmtub3duOyBMaW5rZWRDb3VudD86IHVua25vd24gfSkubGlua2VkQ291bnQgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgTGlua2VkQ291bnQ/OiB1bmtub3duIH0pLkxpbmtlZENvdW50XHJcbiAgICAgICkgPz8gMCxcclxuICAgICAgc2tpcHBlZENvdW50OiB0b051bGxhYmxlTnVtYmVyKFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgc2tpcHBlZENvdW50PzogdW5rbm93bjsgU2tpcHBlZENvdW50PzogdW5rbm93biB9KS5za2lwcGVkQ291bnQgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgU2tpcHBlZENvdW50PzogdW5rbm93biB9KS5Ta2lwcGVkQ291bnRcclxuICAgICAgKSA/PyAwLFxyXG4gICAgICBmYWlsZWRDb3VudDogdG9OdWxsYWJsZU51bWJlcihcclxuICAgICAgICAocmF3RGF0YSBhcyB7IGZhaWxlZENvdW50PzogdW5rbm93bjsgRmFpbGVkQ291bnQ/OiB1bmtub3duIH0pLmZhaWxlZENvdW50ID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IEZhaWxlZENvdW50PzogdW5rbm93biB9KS5GYWlsZWRDb3VudFxyXG4gICAgICApID8/IDAsXHJcbiAgICAgIGxpbmtlZFRpY2tldElkczogQXJyYXkuaXNBcnJheShsaW5rZWRUaWNrZXRJZHNSYXcpXHJcbiAgICAgICAgPyBsaW5rZWRUaWNrZXRJZHNSYXcubWFwKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnkpKS5maWx0ZXIoQm9vbGVhbilcclxuICAgICAgICA6IFtdLFxyXG4gICAgICBza2lwcGVkOiB0b0lzc3VlTGlzdChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IHNraXBwZWQ/OiB1bmtub3duOyBTa2lwcGVkPzogdW5rbm93biB9KS5za2lwcGVkID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IFNraXBwZWQ/OiB1bmtub3duIH0pLlNraXBwZWRcclxuICAgICAgKSxcclxuICAgICAgZmFpbGVkOiB0b0lzc3VlTGlzdChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IGZhaWxlZD86IHVua25vd247IEZhaWxlZD86IHVua25vd24gfSkuZmFpbGVkID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IEZhaWxlZD86IHVua25vd24gfSkuRmFpbGVkXHJcbiAgICAgICksXHJcbiAgICB9LFxyXG4gIH07XHJcbn07XHJcbiIsICJcdUZFRkZpbXBvcnQgdHlwZSB7XHJcbiAgRXhwZW5zZVNoZWV0Q2FyZCxcclxuICBFeHBlbnNlU2hlZXREZXRhaWxEdG8sXHJcbiAgRXhwZW5zZVNoZWV0SGVhZGVyLFxyXG4gIEV4cGVuc2VTaGVldExpbmUsXHJcbiAgRXhwZW5zZVNoZWV0TGluZUR0byxcclxuICBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byxcclxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0LCB0b051bGxhYmxlQm9vbCwgdG9OdWxsYWJsZU51bWJlciB9IGZyb20gXCIuL2V4cGVuc2VBcGlUcmFuc2Zvcm1zLnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VXaW5kb3dSdW50aW1lID0ge1xyXG4gIF9fRVhQRU5TRV9HQVNUT19UWVBFU19fPzogQXJyYXk8e1xyXG4gICAgdmFsdWU/OiB1bmtub3duO1xyXG4gICAgVmFsdWU/OiB1bmtub3duO1xyXG4gICAgdGV4dD86IHVua25vd247XHJcbiAgICBUZXh0PzogdW5rbm93bjtcclxuICB9PjtcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZUdhc3RvVHlwZUVudHJ5ID0gTm9uTnVsbGFibGU8RXhwZW5zZVdpbmRvd1J1bnRpbWVbXCJfX0VYUEVOU0VfR0FTVE9fVFlQRVNfX1wiXT5bbnVtYmVyXTtcclxuXHJcbmNvbnN0IHJlYWRFeHBlbnNlV2luZG93UnVudGltZSA9ICgpOiBFeHBlbnNlV2luZG93UnVudGltZSA9PiB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiB7fTtcclxuICByZXR1cm4gd2luZG93IGFzIHVua25vd24gYXMgRXhwZW5zZVdpbmRvd1J1bnRpbWU7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlVHlwZUxhYmVsID0gKHR5cGVWYWx1ZUNvZGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKCF0eXBlVmFsdWVDb2RlIHx8IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIHJldHVybiB0eXBlVmFsdWVDb2RlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmF3Q2F0YWxvZ1NvdXJjZSA9IHJlYWRFeHBlbnNlV2luZG93UnVudGltZSgpLl9fRVhQRU5TRV9HQVNUT19UWVBFU19fO1xyXG4gIGNvbnN0IHJhd0NhdGFsb2cgPSBBcnJheS5pc0FycmF5KHJhd0NhdGFsb2dTb3VyY2UpID8gcmF3Q2F0YWxvZ1NvdXJjZSA6IFtdO1xyXG4gIGNvbnN0IG1hdGNoID0gcmF3Q2F0YWxvZy5maW5kKChlbnRyeTogRXhwZW5zZUdhc3RvVHlwZUVudHJ5KSA9PiB7XHJcbiAgICBjb25zdCBlbnRyeUNvZGUgPSBzYWZlVGV4dChlbnRyeT8udmFsdWUgfHwgZW50cnk/LlZhbHVlKTtcclxuICAgIHJldHVybiBlbnRyeUNvZGUgPT09IHR5cGVWYWx1ZUNvZGU7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBzYWZlVGV4dChtYXRjaD8udGV4dCB8fCBtYXRjaD8uVGV4dCkgfHwgdHlwZVZhbHVlQ29kZTtcclxufTtcclxuXHJcbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9saXN0IGl0ZW0gY29udHJhY3QgdG8gbGlzdCBjYXJkIFVJIG1vZGVsLlxyXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmQgPSAoaXRlbTogRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8pOiBFeHBlbnNlU2hlZXRDYXJkID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgaG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChpdGVtLkhvamFHYXN0b3NJZCksXHJcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQoaXRlbS5EZXNjcmlwdGlvbiksXHJcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5FeHBlbnNlU2hlZXRTdGF0dXMpLFxyXG4gICAgZXN0YWRvQ29tZW50YXJpb3M6IHNhZmVUZXh0KGl0ZW0uRXN0YWRvQ29tZW50YXJpb3MpIHx8IG51bGwsXHJcbiAgICB1c2VySWQ6IHNhZmVUZXh0KGl0ZW0uVXNlcklkKSxcclxuICAgIHVzZXJOYW1lOiBzYWZlVGV4dChpdGVtLlVzZXJOYW1lKSB8fCBudWxsLFxyXG4gICAgdm91Y2hlcjogc2FmZVRleHQoaXRlbS5Wb3VjaGVyKSxcclxuICAgIHByb2pJZDogc2FmZVRleHQoaXRlbS5Qcm9qSWQpLFxyXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChpdGVtLkN1cnJlbmN5Q29kZSksXHJcbiAgICB0b3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihpdGVtLlRvdGFsQW1vdW50KSxcclxuICAgIGV4Y2hSYXRlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uRXhjaFJhdGUpLFxyXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogdG9OdWxsYWJsZU51bWJlcihpdGVtLkV4Y2hhbmdlUmF0ZU1vZGUpLFxyXG4gICAgY3JlYXRlZERhdGU6IHNhZmVUZXh0KGl0ZW0uQ3JlYXRlZERhdGUpLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0gaGVhZGVyIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxyXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0SGVhZGVyID0gKHNoZWV0OiBFeHBlbnNlU2hlZXREZXRhaWxEdG8pOiBFeHBlbnNlU2hlZXRIZWFkZXIgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBob2phR2FzdG9zSWQ6IHNhZmVUZXh0KHNoZWV0LkhvamFHYXN0b3NJZCksXHJcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQoc2hlZXQuRGVzY3JpcHRpb24pLFxyXG4gICAgdXNlcklkOiBzYWZlVGV4dChzaGVldC5Vc2VySWQpLFxyXG4gICAgZXhwZW5zZVNoZWV0U3RhdHVzOiB0b051bGxhYmxlTnVtYmVyKHNoZWV0LkV4cGVuc2VTaGVldFN0YXR1cyksXHJcbiAgICBlc3RhZG9Db21lbnRhcmlvczogc2FmZVRleHQoc2hlZXQuRXN0YWRvQ29tZW50YXJpb3MpIHx8IG51bGwsXHJcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KHNoZWV0LkN1cnJlbmN5Q29kZSksXHJcbiAgICB0b3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihzaGVldC5Ub3RhbEFtb3VudCksXHJcbiAgICBleGNoUmF0ZTogc2FmZVRleHQoc2hlZXQuRXhjaFJhdGUpLFxyXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogdG9OdWxsYWJsZU51bWJlcihzaGVldC5FeGNoYW5nZVJhdGVNb2RlKSxcclxuICAgIHByb2pJZDogc2FmZVRleHQoc2hlZXQuUHJvaklkKSxcclxuICAgIHZvdWNoZXI6IHNhZmVUZXh0KHNoZWV0LlZvdWNoZXIpLFxyXG4gICAgY3JlYXRlZERhdGU6IHNhZmVUZXh0KHNoZWV0LkNyZWF0ZWREYXRlKSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gTWFwcyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9IGxpbmUgY29udHJhY3QgdG8gVUkgbW9kZWwuXHJcbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRMaW5lID0gKGxpbmU6IEV4cGVuc2VTaGVldExpbmVEdG8pOiBFeHBlbnNlU2hlZXRMaW5lID0+IHtcclxuICBjb25zdCB0eXBlVmFsdWVDb2RlID0gc2FmZVRleHQobGluZS5UeXBlVmFsdWUpO1xyXG4gIGNvbnN0IGxlZ2FjeVByaWNlID0gKGxpbmUgYXMgeyBwcmljZT86IHVua25vd24gfSkucHJpY2U7XHJcbiAgY29uc3QgbGVnYWN5RmlsZUlkID0gKGxpbmUgYXMgeyBmaWxlSWQ/OiB1bmtub3duIH0pLmZpbGVJZDtcclxuICBjb25zdCBleHBsaWNpdExpbmVSZWNJZCA9IHNhZmVUZXh0KFxyXG4gICAgKGxpbmUgYXMgeyBMaW5lUmVjSWQ/OiB1bmtub3duOyBsaW5lUmVjSWQ/OiB1bmtub3duIH0pLkxpbmVSZWNJZCA/P1xyXG4gICAgICAobGluZSBhcyB7IGxpbmVSZWNJZD86IHVua25vd24gfSkubGluZVJlY0lkXHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGxpbmVSZWNJZDogZXhwbGljaXRMaW5lUmVjSWQgfHwgc2FmZVRleHQobGluZS5SZWNJZCksXHJcbiAgICB0cmFuc0RhdGU6IHNhZmVUZXh0KGxpbmUuVHJhbnNEYXRlKSxcclxuICAgIHR5cGVWYWx1ZUNvZGUsXHJcbiAgICB0eXBlVmFsdWU6IHJlc29sdmVUeXBlTGFiZWwodHlwZVZhbHVlQ29kZSksXHJcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQobGluZS5EZXNjcmlwdGlvbiksXHJcbiAgICBpbnRlcm5hY2lvbmFsOiB0b051bGxhYmxlQm9vbChsaW5lLkludGVybmFjaW9uYWwpLFxyXG4gICAgZmlsZUlkOiBzYWZlVGV4dChsaW5lLkZpbGVJZCA/PyBsZWdhY3lGaWxlSWQpLFxyXG4gICAgdGlja2V0OiB0b051bGxhYmxlQm9vbChsaW5lLlRpY2tldCksXHJcbiAgICBwcmljZTogdG9OdWxsYWJsZU51bWJlcihsaW5lLlByaWNlID8/IGxlZ2FjeVByaWNlKSxcclxuICAgIHF0eTogdG9OdWxsYWJsZU51bWJlcihsaW5lLlF0eSksXHJcbiAgICBhbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIobGluZS5BbW91bnQpLFxyXG4gICAgcHJvaklkOiBzYWZlVGV4dChsaW5lLlByb2pJZCksXHJcbiAgICBpbmRBdHRhY2hGaWxlczogc2FmZVRleHQobGluZS5JbmRBdHRhY2hGaWxlcyksXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHBhcnNlRXhwZW5zZUFwaURhdGUgfSBmcm9tIFwiLi9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBFeHBlbnNlRGF0ZVBhcnRzID0ge1xyXG4gIHllYXI6IHN0cmluZztcclxuICBtb250aDogc3RyaW5nO1xyXG4gIGRheTogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBQYXJzZUV4cGVuc2VEYXRlT3B0aW9ucyA9IHtcclxuICBwcmVmZXJNb250aEZpcnN0T25TbGFzaD86IGJvb2xlYW47XHJcbn07XHJcblxyXG5jb25zdCBCQVNRVUVfTU9OVEhTX1NIT1JUID0gW1xyXG4gIFwidXJ0XCIsXHJcbiAgXCJvdHNcIixcclxuICBcIm1hclwiLFxyXG4gIFwiYXBpXCIsXHJcbiAgXCJtYWlcIixcclxuICBcImVrYVwiLFxyXG4gIFwidXp0XCIsXHJcbiAgXCJhYnVcIixcclxuICBcImlyYVwiLFxyXG4gIFwidXJyXCIsXHJcbiAgXCJhemFcIixcclxuICBcImFiZVwiLFxyXG5dO1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVWlMb2NhbGUgPSAobG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKGxvY2FsZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiZXMtRVNcIjtcclxuICBpZiAoL156aC1oYW5zL2kudGVzdCh2YWx1ZSkpIHJldHVybiBcInpoLUNOXCI7XHJcbiAgcmV0dXJuIHZhbHVlO1xyXG59O1xyXG5cclxuY29uc3QgaXNCYXNxdWVMb2NhbGUgPSAobG9jYWxlOiBzdHJpbmcpOiBib29sZWFuID0+IC9eZXVcXGIvaS50ZXN0KFN0cmluZyhsb2NhbGUgfHwgXCJcIikpO1xyXG5cclxuLy8gTm9ybWFsaXplIHVua25vd24gdmFsdWVzIHRvIGEgdHJpbW1lZCBzdHJpbmcuXG5leHBvcnQgY29uc3Qgc2FmZVRleHQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFwiXCI7XG4gIHJldHVybiBTdHJpbmcodmFsdWUpLnRyaW0oKTtcbn07XG5cbi8vIENsZWFucyBjaGF0IHRleHQgd2hpbGUgcHJlc2VydmluZyBhY2NlbnRzIGFuZCByZWFkYWJsZSBwdW5jdHVhdGlvbi5cbmV4cG9ydCBjb25zdCBzYW5pdGl6ZUFzc2lzdGFudFRleHQgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBzb3VyY2UgPSBzYWZlVGV4dCh2YWx1ZSk7XG4gIGlmICghc291cmNlKSByZXR1cm4gXCJcIjtcblxuICByZXR1cm4gc291cmNlXG4gICAgLm5vcm1hbGl6ZShcIk5GQ1wiKVxuICAgIC5yZXBsYWNlKC9cXHVGRUZGL2csIFwiXCIpXG4gICAgLnJlcGxhY2UoL1tcXHUwMDAwLVxcdTAwMDhcXHUwMDBCXFx1MDAwQ1xcdTAwMEUtXFx1MDAxRlxcdTAwN0ZdL2csIFwiXCIpXG4gICAgLnJlcGxhY2UoL1tcXHUyMDBCLVxcdTIwMERcXHUyMDYwXS9nLCBcIlwiKVxuICAgIC5yZXBsYWNlKC9cXHJcXG4/L2csIFwiXFxuXCIpXG4gICAgLnJlcGxhY2UoL1sgXFx0XStcXG4vZywgXCJcXG5cIilcbiAgICAucmVwbGFjZSgvXFxuezMsfS9nLCBcIlxcblxcblwiKVxuICAgIC50cmltKCk7XG59O1xuXHJcbi8vIE5vcm1hbGl6ZXMgY2FyZCB0aXRsZSB0ZXh0IG9ubHkgd2hlbiBpdCBjb21lcyBpbiBmdWxsIHVwcGVyIG9yIGZ1bGwgbG93ZXIgY2FzZS5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUNhcmRUaXRsZVRleHQgPSAodmFsdWU6IHVua25vd24sIGZhbGxiYWNrID0gXCItXCIpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHNvdXJjZSA9IHNhZmVUZXh0KHZhbHVlKTtcclxuICBpZiAoIXNvdXJjZSkgcmV0dXJuIGZhbGxiYWNrO1xyXG5cclxuICBjb25zdCBoYXNMZXR0ZXJzID0gL1tBLVphLXpcdTAwQzAtXHUwMEQ2XHUwMEQ4LVx1MDBGNlx1MDBGOC1cdTAwRkZdLy50ZXN0KHNvdXJjZSk7XHJcbiAgaWYgKCFoYXNMZXR0ZXJzKSByZXR1cm4gc291cmNlO1xyXG5cclxuICBjb25zdCBpc0FsbFVwcGVyID0gc291cmNlID09PSBzb3VyY2UudG9VcHBlckNhc2UoKSAmJiBzb3VyY2UgIT09IHNvdXJjZS50b0xvd2VyQ2FzZSgpO1xyXG4gIGNvbnN0IGlzQWxsTG93ZXIgPSBzb3VyY2UgPT09IHNvdXJjZS50b0xvd2VyQ2FzZSgpICYmIHNvdXJjZSAhPT0gc291cmNlLnRvVXBwZXJDYXNlKCk7XHJcbiAgaWYgKCFpc0FsbFVwcGVyICYmICFpc0FsbExvd2VyKSB7XHJcbiAgICByZXR1cm4gc291cmNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbG93ZXIgPSBzb3VyY2UudG9Mb3dlckNhc2UoKTtcclxuICByZXR1cm4gYCR7bG93ZXIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCl9JHtsb3dlci5zbGljZSgxKX1gO1xyXG59O1xyXG5cclxuLy8gUmV0dXJucyB0cnVlIG9ubHkgd2hlbiB2b3VjaGVyIGhhcyBhIG1lYW5pbmdmdWwgYXNzaWduZWQgdmFsdWUuXHJcbmV4cG9ydCBjb25zdCBoYXNBc3NpZ25lZFZvdWNoZXIgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICBjb25zdCB2b3VjaGVyID0gc2FmZVRleHQodmFsdWUpLnRvVXBwZXJDYXNlKCk7XHJcbiAgaWYgKCF2b3VjaGVyKSByZXR1cm4gZmFsc2U7XHJcbiAgcmV0dXJuIHZvdWNoZXIgIT09IFwiLVwiICYmIHZvdWNoZXIgIT09IFwiLlwiICYmIHZvdWNoZXIgIT09IFwiMFwiO1xyXG59O1xyXG5cclxuLy8gUmV0dXJuIGRhdGUgYXQgbG9jYWwgZGF5IHN0YXJ0LlxyXG5leHBvcnQgY29uc3Qgc3RhcnRPZkRheSA9IChkYXRlOiBEYXRlKTogRGF0ZSA9PiB7XHJcbiAgcmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSk7XHJcbn07XHJcblxyXG4vLyBGb3JtYXQgbG9jYWwgZGF0ZSB0byB5eXl5LU1NLWRkLlxyXG5leHBvcnQgY29uc3QgdG9Jc29EYXRlID0gKGRhdGU6IERhdGUpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBgJHtkYXRlLmdldEZ1bGxZZWFyKCl9LSR7U3RyaW5nKGRhdGUuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKX0tJHtTdHJpbmcoZGF0ZS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKX1gO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlRGF0ZSA9ICh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKTogRGF0ZSB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IGNhbmRpZGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcclxuICBpZiAoXHJcbiAgICBOdW1iZXIuaXNOYU4oY2FuZGlkYXRlLmdldFRpbWUoKSkgfHxcclxuICAgIGNhbmRpZGF0ZS5nZXRGdWxsWWVhcigpICE9PSB5ZWFyIHx8XHJcbiAgICBjYW5kaWRhdGUuZ2V0TW9udGgoKSAhPT0gbW9udGggLSAxIHx8XHJcbiAgICBjYW5kaWRhdGUuZ2V0RGF0ZSgpICE9PSBkYXlcclxuICApIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGNhbmRpZGF0ZTtcclxufTtcclxuXHJcbi8vIFBhcnNlIHN1cHBvcnRlZCBBUEkgZGF0ZSBmb3JtYXRzLlxyXG5leHBvcnQgY29uc3QgcGFyc2VFeHBlbnNlRGF0ZSA9IChyYXc/OiBzdHJpbmcsIG9wdGlvbnM/OiBQYXJzZUV4cGVuc2VEYXRlT3B0aW9ucyk6IERhdGUgfCBudWxsID0+IHtcclxuICBpZiAoIXJhdykgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcocmF3KS50cmltKCk7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IGRhdGVPbmx5ID0gdmFsdWUuc3BsaXQoXCJUXCIpWzBdLnNwbGl0KFwiIFwiKVswXTtcclxuXHJcbiAgLy8gS2VlcCBvcHRpb25hbCBtb250aC1maXJzdCBjb21wYXRpYmlsaXR5IGZvciBsZWdhY3kgc2xhc2ggZGF0ZXMgaW4gY2FyZHMuXHJcbiAgaWYgKG9wdGlvbnM/LnByZWZlck1vbnRoRmlyc3RPblNsYXNoICYmIC9eXFxkezJ9XFwvXFxkezJ9XFwvXFxkezR9JC8udGVzdChkYXRlT25seSkpIHtcclxuICAgIGNvbnN0IFtmaXJzdFBhcnQsIHNlY29uZFBhcnQsIHllYXJQYXJ0XSA9IGRhdGVPbmx5LnNwbGl0KC9bLi8tXS8pO1xyXG4gICAgY29uc3QgZmlyc3QgPSBOdW1iZXIoZmlyc3RQYXJ0KTtcclxuICAgIGNvbnN0IHNlY29uZCA9IE51bWJlcihzZWNvbmRQYXJ0KTtcclxuICAgIGNvbnN0IHllYXIgPSBOdW1iZXIoeWVhclBhcnQpO1xyXG4gICAgY29uc3QgbW9udGhGaXJzdERhdGUgPSBidWlsZEV4cGVuc2VEYXRlKHllYXIsIGZpcnN0LCBzZWNvbmQpO1xyXG4gICAgaWYgKG1vbnRoRmlyc3REYXRlKSB7XHJcbiAgICAgIHJldHVybiBtb250aEZpcnN0RGF0ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBwYXJzZUV4cGVuc2VBcGlEYXRlKHZhbHVlKTtcclxufTtcclxuXHJcbi8vIEZvcm1hdCBhIGRhdGUgZm9yIHJlYWQtb25seSBmaWVsZHMgdXNpbmcgdGhlIHNhbWUgb3V0cHV0IHN0eWxlIGFzIHZpc2l0cy5cclxuZXhwb3J0IGNvbnN0IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSA9IChyYXc/OiBzdHJpbmcsIGxvY2FsZSA9IFwiZXMtRVNcIiwgZmFsbGJhY2sgPSBcIi1cIik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgZGF0ZSA9IHBhcnNlRXhwZW5zZURhdGUocmF3KTtcclxuICBpZiAoIWRhdGUpIHJldHVybiBmYWxsYmFjaztcclxuXHJcbiAgY29uc3Qgc2FmZUxvY2FsZSA9IG5vcm1hbGl6ZVVpTG9jYWxlKGxvY2FsZSk7XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKHNhZmVMb2NhbGUpKSB7XHJcbiAgICByZXR1cm4gYCR7ZGF0ZS5nZXREYXRlKCl9ICR7QkFTUVVFX01PTlRIU19TSE9SVFtkYXRlLmdldE1vbnRoKCldfSAke2RhdGUuZ2V0RnVsbFllYXIoKX1gLnRvTG93ZXJDYXNlKCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZGF0ZVxyXG4gICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhzYWZlTG9jYWxlLCB7XHJcbiAgICAgIGRheTogXCJudW1lcmljXCIsXHJcbiAgICAgIG1vbnRoOiBcInNob3J0XCIsXHJcbiAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxyXG4gICAgfSlcclxuICAgIC5yZXBsYWNlKC9cXC4vZywgXCJcIilcclxuICAgIC50b0xvd2VyQ2FzZSgpO1xyXG59O1xyXG5cclxuLy8gQnVpbGQgdGltZWxpbmUgZGF0ZSBmcmFnbWVudHMgZm9yIGNhcmQgbGVmdCBwYW5lbC5cclxuZXhwb3J0IGNvbnN0IGZvcm1hdEV4cGVuc2VEYXRlUGFydHMgPSAocmF3Pzogc3RyaW5nLCBsb2NhbGUgPSBcImVzLUVTXCIsIG9wdGlvbnM/OiBQYXJzZUV4cGVuc2VEYXRlT3B0aW9ucyk6IEV4cGVuc2VEYXRlUGFydHMgPT4ge1xyXG4gIGNvbnN0IGRhdGUgPSBwYXJzZUV4cGVuc2VEYXRlKHJhdywgb3B0aW9ucyk7XHJcbiAgaWYgKCFkYXRlKSB7XHJcbiAgICByZXR1cm4geyB5ZWFyOiBcIlwiLCBtb250aDogXCJcIiwgZGF5OiBcIi0tXCIgfTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB5ZWFyOiBTdHJpbmcoZGF0ZS5nZXRGdWxsWWVhcigpKSxcclxuICAgIG1vbnRoOiBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgbW9udGg6IFwic2hvcnRcIiB9KS5yZXBsYWNlKC9cXC4vZywgXCJcIikudG9VcHBlckNhc2UoKSxcclxuICAgIGRheTogU3RyaW5nKGRhdGUuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIiksXHJcbiAgfTtcclxufTtcclxuIiwgInR5cGUgQ29tcGFueVNlbGVjdGlvbkNhbmRpZGF0ZSA9IHtcclxuICBjb21wYW55SWQ6IHN0cmluZztcclxuICBpc0RlZmF1bHQ/OiBib29sZWFuO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplQ29tcGFueUlkID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IFN0cmluZyh2YWx1ZSB8fCBcIlwiKS50cmltKCkudG9VcHBlckNhc2UoKTtcclxuXHJcbmNvbnN0IGZpbmRDb21wYW55TWF0Y2ggPSAoXHJcbiAgY2FuZGlkYXRlczogQ29tcGFueVNlbGVjdGlvbkNhbmRpZGF0ZVtdLFxyXG4gIHJlcXVlc3RlZENvbXBhbnlJZDogc3RyaW5nXHJcbik6IENvbXBhbnlTZWxlY3Rpb25DYW5kaWRhdGUgfCBudWxsID0+IHtcclxuICBpZiAoIXJlcXVlc3RlZENvbXBhbnlJZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGZvciAoY29uc3QgY2FuZGlkYXRlIG9mIGNhbmRpZGF0ZXMpIHtcclxuICAgIGlmIChub3JtYWxpemVDb21wYW55SWQoY2FuZGlkYXRlLmNvbXBhbnlJZCkgPT09IHJlcXVlc3RlZENvbXBhbnlJZCkge1xyXG4gICAgICByZXR1cm4gY2FuZGlkYXRlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG4vLyBSZXNvbHZlcyB0aGUgZWZmZWN0aXZlIGNvbXBhbnkgZm9yIEFQSSBjYWxsczogbWFudWFsIHNlbGVjdGlvbiB3aW5zIG9ubHkgd2hlbiBpdCBleGlzdHMgaW4gdGhlIGN1cnJlbnQgY29udGV4dC5cclxuZXhwb3J0IGNvbnN0IHJlc29sdmVFZmZlY3RpdmVDb21wYW55SWQgPSAoXHJcbiAgc2VsZWN0ZWRDb21wYW55SWQ6IHVua25vd24sXHJcbiAgY29tcGFuaWVzOiBDb21wYW55U2VsZWN0aW9uQ2FuZGlkYXRlW10sXHJcbiAgZGVmYXVsdENvbXBhbnlJZD86IHVua25vd25cclxuKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkU2VsZWN0ZWRDb21wYW55SWQgPSBub3JtYWxpemVDb21wYW55SWQoc2VsZWN0ZWRDb21wYW55SWQpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWREZWZhdWx0Q29tcGFueUlkID0gbm9ybWFsaXplQ29tcGFueUlkKGRlZmF1bHRDb21wYW55SWQpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRDb21wYW5pZXMgPSBBcnJheS5pc0FycmF5KGNvbXBhbmllcylcclxuICAgID8gY29tcGFuaWVzLmZpbHRlcigoY2FuZGlkYXRlKSA9PiBub3JtYWxpemVDb21wYW55SWQoY2FuZGlkYXRlLmNvbXBhbnlJZCkpXHJcbiAgICA6IFtdO1xyXG5cclxuICBjb25zdCBzZWxlY3RlZE1hdGNoID0gZmluZENvbXBhbnlNYXRjaChub3JtYWxpemVkQ29tcGFuaWVzLCBub3JtYWxpemVkU2VsZWN0ZWRDb21wYW55SWQpO1xyXG4gIGlmIChzZWxlY3RlZE1hdGNoKSB7XHJcbiAgICByZXR1cm4gc2VsZWN0ZWRNYXRjaC5jb21wYW55SWQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkZWZhdWx0TWF0Y2ggPVxyXG4gICAgZmluZENvbXBhbnlNYXRjaChub3JtYWxpemVkQ29tcGFuaWVzLCBub3JtYWxpemVkRGVmYXVsdENvbXBhbnlJZCkgfHxcclxuICAgIG5vcm1hbGl6ZWRDb21wYW5pZXMuZmluZCgoY2FuZGlkYXRlKSA9PiBjYW5kaWRhdGUuaXNEZWZhdWx0ID09PSB0cnVlKSB8fFxyXG4gICAgbm9ybWFsaXplZENvbXBhbmllc1swXSB8fFxyXG4gICAgbnVsbDtcclxuXHJcbiAgcmV0dXJuIGRlZmF1bHRNYXRjaD8uY29tcGFueUlkIHx8IFwiXCI7XHJcbn07XHJcbiIsICJpbXBvcnQge1xyXG4gIEFwaUZldGNoRXJyb3IsXHJcbiAgZmV0Y2hKc29uLFxyXG4gIGdldENzcmZUb2tlbixcclxuICBoYW5kbGVBcGlBdXRoRmFpbHVyZSxcclxuICByZWFkQXBpTWVzc2FnZUZyb21SYXcsXHJcbiAgdHlwZSBBcGlGZXRjaE9wdGlvbnMsXHJcbn0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHR5cGUge1xyXG4gIEVudHJhQ29udGV4dER0byxcclxuICBFbnRyYUNvbnRleHRSZXF1ZXN0LFxyXG4gIEV4Y2hhbmdlUmF0ZUR0byxcclxuICBGdWVsUHJpY2VLbUR0byxcclxuICBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0byxcclxuICBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldENyZWF0ZVJlc3BvbnNlRGF0YSxcclxuICBFeHBlbnNlU2hlZXREZXRhaWxEdG8sXHJcbiAgRXhwZW5zZVNoZWV0RHJhZnRSZXNwb25zZSxcclxuICBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldExpbmVEdG8sXHJcbiAgRXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlc3BvbnNlRGF0YSxcclxuICBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8sXG4gIEV4cGVuc2VTaGVldExpc3RSZXNwb25zZUVudmVsb3BlLFxuICBFeHBlbnNlU2hlZXRzQXNrUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0c0Fza1Jlc3BvbnNlRGF0YSxcbiAgRXhwZW5zZVNoZWV0c0Fza1Jlc3VsdCxcbiAgRXhwZW5zZVNoZWV0VGlja2V0Q3JlYXRlUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvLFxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1JlcXVlc3QsXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdFJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVzdWx0LFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmVSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvLFxyXG4gIEluZEFwaVJlc3BvbnNlLFxyXG4gIEluZFBhZ2VkUmVzcG9uc2UsXHJcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIGlzTm9uTmVnYXRpdmVOdW1iZXIgYXMgaXNOb25OZWdhdGl2ZU51bWJlclRyYW5zZm9ybSxcclxuICBpc1Bvc2l0aXZlTnVtYmVyIGFzIGlzUG9zaXRpdmVOdW1iZXJUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlciBhcyBub3JtYWxpemVFeHBlbnNlU2hlZXRMaXN0U3RhdHVzRmlsdGVyVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlIGFzIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSSBhcyBub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUlUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRTdGF0dXMgYXMgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRTdGF0dXNUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlIGFzIG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVSZXF1aXJlZEFwaURhdGUgYXMgbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZVRpY2tldExpc3REYXRlIGFzIG5vcm1hbGl6ZVRpY2tldExpc3REYXRlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZVRpY2tldExpc3RHYXN0b1R5cGUgYXMgbm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZVRyYW5zZm9ybSxcclxuICBzYWZlVGV4dCBhcyBzYWZlVGV4dFRyYW5zZm9ybSxcclxuICB0b0ZsYWdCb29sIGFzIHRvRmxhZ0Jvb2xUcmFuc2Zvcm0sXHJcbiAgdG9OdWxsYWJsZUJvb2wgYXMgdG9OdWxsYWJsZUJvb2xUcmFuc2Zvcm0sXHJcbiAgdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUgYXMgdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGVUcmFuc2Zvcm0sXHJcbiAgdG9OdWxsYWJsZU51bWJlciBhcyB0b051bGxhYmxlTnVtYmVyVHJhbnNmb3JtLFxyXG4gIHRvTnVsbGFibGVUaWNrZXRTdGF0dXNDb2RlIGFzIHRvTnVsbGFibGVUaWNrZXRTdGF0dXNDb2RlVHJhbnNmb3JtLFxyXG59IGZyb20gXCIuL2V4cGVuc2VBcGlUcmFuc2Zvcm1zLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgbm9ybWFsaXplQXBpUmVzcG9uc2UgYXMgbm9ybWFsaXplQXBpUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlIGFzIG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlIGFzIG5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UgYXMgbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZVRpY2tldExpbmtCdWxrUmVzcG9uc2UgYXMgbm9ybWFsaXplVGlja2V0TGlua0J1bGtSZXNwb25zZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVUaWNrZXRMaW5rTGlzdFBhZ2VkUmVzcG9uc2UgYXMgbm9ybWFsaXplVGlja2V0TGlua0xpc3RQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2UgYXMgbm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVUaWNrZXRRdWlja0NyZWF0ZVJlc3BvbnNlIGFzIG5vcm1hbGl6ZVRpY2tldFF1aWNrQ3JlYXRlUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2UgYXMgbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbn0gZnJvbSBcIi4vZXhwZW5zZUFwaVJlc3BvbnNlTm9ybWFsaXplcnMudHNcIjtcclxuaW1wb3J0IHtcbiAgbWFwRXhwZW5zZVNoZWV0SGVhZGVyIGFzIG1hcEV4cGVuc2VTaGVldEhlYWRlckNvcmUsXG4gIG1hcEV4cGVuc2VTaGVldExpbmUgYXMgbWFwRXhwZW5zZVNoZWV0TGluZUNvcmUsXG4gIG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkIGFzIG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkQ29yZSxcbn0gZnJvbSBcIi4vZXhwZW5zZUFwaU1hcHBlcnMudHNcIjtcbmltcG9ydCB7IHNhbml0aXplQXNzaXN0YW50VGV4dCB9IGZyb20gXCIuL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFIH0gZnJvbSBcIi4vZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xyXG5pbXBvcnQgeyBnZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlIH0gZnJvbSBcIi4vZXhwZW5zZUFjdGluZ1VzZXIudHNcIjtcbmltcG9ydCB7IHJlc29sdmVFZmZlY3RpdmVDb21wYW55SWQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY29tcGFueVNlbGVjdGlvbi50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5cclxudHlwZSBQcm9qZWN0RHJvcGRvd25SZXNwb25zZSA9IHtcclxuICB0b3RhbD86IG51bWJlcjtcclxuICBpdGVtcz86IEFycmF5PHsgdmFsdWU/OiBzdHJpbmc7IHRleHQ/OiBzdHJpbmcgfT47XHJcbn07XHJcblxyXG50eXBlIExlZ2FjeUV4cGVuc2VMaXN0SXRlbSA9IHtcclxuICBob2phR2FzdG9zSWQ/OiB1bmtub3duO1xyXG4gIGRlc2NyaXB0aW9uPzogdW5rbm93bjtcclxuICBlc3RhZG9Db21lbnRhcmlvcz86IHVua25vd247XHJcbiAgdm91Y2hlcj86IHVua25vd247XHJcbiAgcHJvaklkPzogdW5rbm93bjtcclxuICBjdXJyZW5jeUNvZGU/OiB1bmtub3duO1xyXG4gIHRvdGFsQW1vdW50PzogdW5rbm93bjtcclxuICB0b3RhbEFtb3VudE1TVD86IHVua25vd247XHJcbiAgZXhjaFJhdGU/OiB1bmtub3duO1xyXG4gIHVzZXJJZD86IHVua25vd247XHJcbiAgdXNlck5hbWU/OiB1bmtub3duO1xyXG4gIGV4Y2hhbmdlUmF0ZU1vZGU/OiB1bmtub3duO1xyXG4gIGV4cGVuc2VTaGVldFN0YXR1cz86IHVua25vd247XHJcbiAgY3JlYXRlZERhdGU/OiB1bmtub3duO1xyXG59O1xyXG5cclxudHlwZSBMZWdhY3lFeHBlbnNlTGlzdFJlc3BvbnNlID0ge1xyXG4gIHN1Y2Nlc3M/OiBib29sZWFuO1xyXG4gIG1lc3NhZ2U/OiBzdHJpbmc7XHJcbiAgdG90YWw/OiBudW1iZXI7XHJcbiAgcGFnZT86IG51bWJlcjtcclxuICBwYWdlU2l6ZT86IG51bWJlcjtcclxuICBpdGVtcz86IExlZ2FjeUV4cGVuc2VMaXN0SXRlbVtdO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlQXBpQ29udGV4dCA9IHtcclxuICB0b2tlbjogc3RyaW5nO1xyXG4gIGNvbXBhbnlJZDogc3RyaW5nO1xyXG4gIGF4VXNlcklkOiBzdHJpbmc7XHJcbiAgY3JtVXNlcklkOiBzdHJpbmc7XHJcbiAgZGVmYXVsdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGJvb2xlYW47XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBFeHBlbnNlQXBpQ29udGV4dFNuYXBzaG90ID0ge1xyXG4gIGNvbXBhbnlJZDogc3RyaW5nO1xyXG4gIGF4VXNlcklkOiBzdHJpbmc7XHJcbiAgY3JtVXNlcklkOiBzdHJpbmc7XHJcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZUFwaUF1dGhTZWVkID0ge1xyXG4gIHRva2VuOiBzdHJpbmc7XHJcbiAgZW50cmFPaWQ6IHN0cmluZztcclxuICBhcHBDb2RlOiBzdHJpbmc7XHJcbiAgc3RyaWN0QXBpUm91dGVzOiBib29sZWFuO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlV2luZG93UnVudGltZSA9IHtcclxuICBfX0lORF9BUElfVE9LRU5fXz86IHN0cmluZztcclxuICBfX0lORF9FTlRSQV9PSURfXz86IHN0cmluZztcclxuICBfX0lORF9BUFBfQ09ERV9fPzogc3RyaW5nO1xyXG4gIF9fSU5EX1NFTEVDVEVEX0NPTVBBTllfXz86IHN0cmluZztcclxuICBfX0lORF9FWFBFTlNFX1NUUklDVF9BUElfXz86IGJvb2xlYW4gfCBzdHJpbmc7XHJcbiAgX19FWFBFTlNFX0dBU1RPX1RZUEVTX18/OiBBcnJheTx7XHJcbiAgICB2YWx1ZT86IHVua25vd247XHJcbiAgICBWYWx1ZT86IHVua25vd247XHJcbiAgICB0ZXh0PzogdW5rbm93bjtcclxuICAgIFRleHQ/OiB1bmtub3duO1xyXG4gIH0+O1xyXG59O1xyXG5cclxuY29uc3QgREVGQVVMVF9BUFBfQ09ERSA9IFwiQ1JNXCI7XHJcbmNvbnN0IEpTT05fSEVBREVSUzogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcclxuICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxufTtcclxuXHJcbmxldCBydW50aW1lQXV0aFNlZWQ6IFBhcnRpYWw8RXhwZW5zZUFwaUF1dGhTZWVkPiA9IHt9O1xyXG5sZXQgY2FjaGVkQ29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQgfCBudWxsID0gbnVsbDtcclxubGV0IGNhY2hlZENvbnRleHRLZXkgPSBcIlwiO1xyXG5sZXQgY29udGV4dFByb21pc2U6IFByb21pc2U8RXhwZW5zZUFwaUNvbnRleHQ+IHwgbnVsbCA9IG51bGw7XHJcbmNvbnN0IGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzID0gbmV3IE1hcDxzdHJpbmcsIEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+PigpO1xyXG5jb25zdCBwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cyA9IG5ldyBNYXA8c3RyaW5nLCBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+Pj4oKTtcclxuXHJcbmNvbnN0IHNhZmVUZXh0ID0gc2FmZVRleHRUcmFuc2Zvcm07XHJcblxyXG5jb25zdCB0b051bGxhYmxlTnVtYmVyID0gdG9OdWxsYWJsZU51bWJlclRyYW5zZm9ybTtcclxuY29uc3QgaXNOb25OZWdhdGl2ZU51bWJlciA9IGlzTm9uTmVnYXRpdmVOdW1iZXJUcmFuc2Zvcm07XHJcbmNvbnN0IGlzUG9zaXRpdmVOdW1iZXIgPSBpc1Bvc2l0aXZlTnVtYmVyVHJhbnNmb3JtO1xyXG5jb25zdCB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZSA9IHRvTnVsbGFibGVUaWNrZXRTdGF0dXNDb2RlVHJhbnNmb3JtO1xyXG5jb25zdCB0b051bGxhYmxlR2FzdG9UeXBlQ29kZSA9IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZSA9IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVUaWNrZXRMaXN0R2FzdG9UeXBlID0gbm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRTdGF0dXMgPSBub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1c1RyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVSZXF1aXJlZEFwaURhdGUgPSBub3JtYWxpemVSZXF1aXJlZEFwaURhdGVUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpc3REYXRlID0gbm9ybWFsaXplVGlja2V0TGlzdERhdGVUcmFuc2Zvcm07XHJcbmNvbnN0IHRvTnVsbGFibGVCb29sID0gdG9OdWxsYWJsZUJvb2xUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSSA9IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlciA9IG5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXJUcmFuc2Zvcm07XHJcbmNvbnN0IHRvRmxhZ0Jvb2wgPSB0b0ZsYWdCb29sVHJhbnNmb3JtO1xyXG5cclxuY29uc3QgcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lID0gKCk6IEV4cGVuc2VXaW5kb3dSdW50aW1lID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIHt9O1xyXG4gIHJldHVybiB3aW5kb3cgYXMgdW5rbm93biBhcyBFeHBlbnNlV2luZG93UnVudGltZTtcclxufTtcclxuXHJcbmNvbnN0IHNhbml0aXplSGVhZGVycyA9IChoZWFkZXJzOiBIZWFkZXJzSW5pdCB8IHVuZGVmaW5lZCk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPT4ge1xyXG4gIGlmICghaGVhZGVycykgcmV0dXJuIHt9O1xyXG5cclxuICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcclxuICAgIGNvbnN0IHJlc3VsdDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xyXG4gICAgaGVhZGVycy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XHJcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBpZiAoQXJyYXkuaXNBcnJheShoZWFkZXJzKSkge1xyXG4gICAgcmV0dXJuIGhlYWRlcnMucmVkdWNlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+KChhY2MsIFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgICBhY2NbU3RyaW5nKGtleSldID0gU3RyaW5nKHZhbHVlKTtcclxuICAgICAgcmV0dXJuIGFjYztcclxuICAgIH0sIHt9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBPYmplY3QuZW50cmllcyhoZWFkZXJzKS5yZWR1Y2U8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4oKGFjYywgW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuIGFjYztcclxuICAgIGFjY1trZXldID0gU3RyaW5nKHZhbHVlKTtcclxuICAgIHJldHVybiBhY2M7XHJcbiAgfSwge30pO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0SGVhZGVyVmFsdWUgPSAoaGVhZGVyczogSGVhZGVyc0luaXQgfCB1bmRlZmluZWQsIGtleTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkS2V5ID0ga2V5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhzYW5pdGl6ZUhlYWRlcnMoaGVhZGVycykpO1xyXG4gIGNvbnN0IG1hdGNoID0gZW50cmllcy5maW5kKChbaGVhZGVyS2V5XSkgPT4gaGVhZGVyS2V5LnRyaW0oKS50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkS2V5KTtcclxuICByZXR1cm4gc2FmZVRleHQobWF0Y2g/LlsxXSk7XHJcbn07XHJcblxyXG5jb25zdCByZW1vdmVIZWFkZXJWYWx1ZSA9IChoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+LCBrZXk6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRLZXkgPSBrZXkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgY29uc3QgdG9EZWxldGUgPSBPYmplY3Qua2V5cyhoZWFkZXJzKS5maW5kKChoZWFkZXJLZXkpID0+IGhlYWRlcktleS50cmltKCkudG9Mb3dlckNhc2UoKSA9PT0gbm9ybWFsaXplZEtleSk7XHJcbiAgaWYgKCF0b0RlbGV0ZSkgcmV0dXJuO1xyXG4gIGRlbGV0ZSBoZWFkZXJzW3RvRGVsZXRlXTtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUF4VXNlcklkSGVhZGVyID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IHNhZmVUZXh0KHZhbHVlKTtcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gXCJcIjtcbiAgaWYgKC9eLVxcZCskLy50ZXN0KG5vcm1hbGl6ZWQpKSB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZWQ7XG4gIH1cblxuICBjb25zdCBsYWJlbFNlcGFyYXRvciA9IG5vcm1hbGl6ZWQuaW5kZXhPZihcIiAtIFwiKTtcbiAgaWYgKGxhYmVsU2VwYXJhdG9yID4gMCkge1xuICAgIHJldHVybiBzYWZlVGV4dChub3JtYWxpemVkLnNsaWNlKDAsIGxhYmVsU2VwYXJhdG9yKSk7XG4gIH1cblxuICByZXR1cm4gbm9ybWFsaXplZDtcbn07XG5cclxuY29uc3QgcmVzb2x2ZUJlYXJlclRva2VuID0gKGhlYWRlcnM6IEhlYWRlcnNJbml0IHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBhdXRob3JpemF0aW9uID0gZ2V0SGVhZGVyVmFsdWUoaGVhZGVycywgXCJBdXRob3JpemF0aW9uXCIpO1xyXG4gIGlmICghYXV0aG9yaXphdGlvbikgcmV0dXJuIFwiXCI7XHJcblxyXG4gIGlmICgvXmJlYXJlclxccysvaS50ZXN0KGF1dGhvcml6YXRpb24pKSB7XHJcbiAgICByZXR1cm4gYXV0aG9yaXphdGlvbi5yZXBsYWNlKC9eYmVhcmVyXFxzKy9pLCBcIlwiKS50cmltKCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYXV0aG9yaXphdGlvbi50cmltKCk7XHJcbn07XHJcblxyXG5jb25zdCByZWFkV2luZG93QXV0aFNlZWQgPSAoKTogUGFydGlhbDxFeHBlbnNlQXBpQXV0aFNlZWQ+ID0+IHtcclxuICBjb25zdCBydW50aW1lV2luZG93ID0gcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lKCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0b2tlbjogc2FmZVRleHQocnVudGltZVdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXHJcbiAgICBlbnRyYU9pZDogc2FmZVRleHQocnVudGltZVdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXHJcbiAgICBhcHBDb2RlOiBzYWZlVGV4dChydW50aW1lV2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxyXG4gICAgc3RyaWN0QXBpUm91dGVzOiB0b0ZsYWdCb29sKHJ1bnRpbWVXaW5kb3cuX19JTkRfRVhQRU5TRV9TVFJJQ1RfQVBJX18pID09PSB0cnVlLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCB0cnlQYXJzZUpzb24gPSAocmF3OiBzdHJpbmcpOiB1bmtub3duIHwgbnVsbCA9PiB7XG4gIGlmICghcmF3IHx8ICFyYXcudHJpbSgpKSByZXR1cm4gbnVsbDtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShyYXcpO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuY29uc3QgY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlID0gPFQ+KHZhbHVlOiBUKTogVCA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodmFsdWUpKSBhcyBUO1xufTtcblxyXG5jb25zdCByZWFkUnVudGltZVN0cmljdEFwaUZsYWcgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBmYWxzZTtcclxuICBjb25zdCBydW50aW1lV2luZG93ID0gcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lKCk7XHJcblxyXG4gIGNvbnN0IGV4cGxpY2l0V2luZG93RmxhZyA9IHRvRmxhZ0Jvb2wocnVudGltZVdpbmRvdy5fX0lORF9FWFBFTlNFX1NUUklDVF9BUElfXyk7XHJcbiAgcmV0dXJuIGV4cGxpY2l0V2luZG93RmxhZyA9PT0gdHJ1ZTtcclxufTtcclxuXHJcbmNvbnN0IHJlYWRXaW5kb3dTZWxlY3RlZENvbXBhbnkgPSAoKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gc2FmZVRleHQocmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lKCkuX19JTkRfU0VMRUNURURfQ09NUEFOWV9fKS50b1VwcGVyQ2FzZSgpO1xyXG59O1xyXG5cclxuLy8gQ3JlYXRlcyBvbmUgc3RhbmRhcmQgYWJvcnQgZXJyb3Igd2l0aG91dCBjYW5jZWxsaW5nIHRoZSBzaGFyZWQgdW5kZXJseWluZyByZXF1ZXN0LlxyXG5jb25zdCBjcmVhdGVFeHBlbnNlQWJvcnRFcnJvciA9ICgpOiBET01FeGNlcHRpb24gPT4ge1xyXG4gIHJldHVybiBuZXcgRE9NRXhjZXB0aW9uKFwiQWJvcnRlZFwiLCBcIkFib3J0RXJyb3JcIik7XHJcbn07XHJcblxyXG4vLyBMZXRzIG9uZSBjYWxsZXIgc3RvcCB3YWl0aW5nIG9uIHNoYXJlZCBjb250ZXh0IHJlc29sdXRpb24gd2l0aG91dCBhYm9ydGluZyBvdGhlciBjb25zdW1lcnMuXHJcbmNvbnN0IHdhaXRGb3JBYm9ydGFibGVFeHBlbnNlUmVzdWx0ID0gYXN5bmMgPFQ+KHByb21pc2U6IFByb21pc2U8VD4sIHNpZ25hbD86IEFib3J0U2lnbmFsKTogUHJvbWlzZTxUPiA9PiB7XHJcbiAgaWYgKCFzaWduYWwpIHJldHVybiBwcm9taXNlO1xyXG4gIGlmIChzaWduYWwuYWJvcnRlZCkge1xyXG4gICAgdGhyb3cgY3JlYXRlRXhwZW5zZUFib3J0RXJyb3IoKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBhd2FpdCBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBjb25zdCBoYW5kbGVBYm9ydCA9ICgpID0+IHtcclxuICAgICAgc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBoYW5kbGVBYm9ydCk7XHJcbiAgICAgIHJlamVjdChjcmVhdGVFeHBlbnNlQWJvcnRFcnJvcigpKTtcclxuICAgIH07XHJcblxyXG4gICAgc2lnbmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBoYW5kbGVBYm9ydCwgeyBvbmNlOiB0cnVlIH0pO1xyXG4gICAgcHJvbWlzZS50aGVuKFxyXG4gICAgICAodmFsdWUpID0+IHtcclxuICAgICAgICBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGhhbmRsZUFib3J0KTtcclxuICAgICAgICByZXNvbHZlKHZhbHVlKTtcclxuICAgICAgfSxcclxuICAgICAgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBoYW5kbGVBYm9ydCk7XHJcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkQ29udGV4dEtleSA9IChzZWVkOiBFeHBlbnNlQXBpQXV0aFNlZWQpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBgJHtzZWVkLnRva2VufXwke3NlZWQuZW50cmFPaWR9fCR7c2VlZC5hcHBDb2RlfXwke3JlYWRXaW5kb3dTZWxlY3RlZENvbXBhbnkoKX1gO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlSGVhZGVycyA9IChcclxuICBjb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zLFxyXG4gIGluY2x1ZGVKc29uID0gZmFsc2UsXHJcbiAgaW5jbHVkZUF4VXNlcklkID0gdHJ1ZVxyXG4pOiBIZWFkZXJzSW5pdCA9PiB7XHJcbiAgY29uc3QgYmFzZSA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcclxuICBjb25zdCBtZXJnZWQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7IC4uLmJhc2UgfTtcclxuXHJcbiAgaWYgKHNhZmVUZXh0KGNvbnRleHQudG9rZW4pKSB7XHJcbiAgICBtZXJnZWQuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHtjb250ZXh0LnRva2VufWA7XHJcbiAgfVxyXG5cclxuICBpZiAoc2FmZVRleHQoY29udGV4dC5jb21wYW55SWQpKSB7XHJcbiAgICBtZXJnZWRbXCJYLUlORC1Db21wYW55XCJdID0gY29udGV4dC5jb21wYW55SWQ7XHJcbiAgfVxyXG5cclxuICBpZiAoaW5jbHVkZUF4VXNlcklkKSB7XHJcbiAgICBjb25zdCByZXF1ZXN0QXhVc2VySWQgPSBnZXRIZWFkZXJWYWx1ZShvcHRpb25zPy5oZWFkZXJzLCBcIlgtSU5ELUF4VXNlcklkXCIpO1xyXG4gICAgY29uc3Qgb3ZlcnJpZGVBeFVzZXJJZCA9IGdldEV4cGVuc2VBY3RpbmdVc2VyT3ZlcnJpZGUoKTtcclxuICAgIGNvbnN0IHJlc29sdmVkQXhVc2VySWQgPSBzYWZlVGV4dChyZXF1ZXN0QXhVc2VySWQgfHwgb3ZlcnJpZGVBeFVzZXJJZCB8fCBjb250ZXh0LmF4VXNlcklkKTtcclxuICAgIGlmIChyZXNvbHZlZEF4VXNlcklkKSB7XHJcbiAgICAgIG1lcmdlZFtcIlgtSU5ELUF4VXNlcklkXCJdID0gcmVzb2x2ZWRBeFVzZXJJZDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlbW92ZUhlYWRlclZhbHVlKG1lcmdlZCwgXCJYLUlORC1BeFVzZXJJZFwiKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgcmVtb3ZlSGVhZGVyVmFsdWUobWVyZ2VkLCBcIlgtSU5ELUF4VXNlcklkXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGluY2x1ZGVKc29uKSB7XHJcbiAgICBtZXJnZWRbXCJDb250ZW50LVR5cGVcIl0gPSBcImFwcGxpY2F0aW9uL2pzb25cIjtcclxuICB9XHJcblxyXG4gIHJldHVybiBtZXJnZWQ7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZEV4cGVuc2VGb3JtSGVhZGVycyA9IChjb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCwgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IEhlYWRlcnNJbml0ID0+IHtcclxuICBjb25zdCBoZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgZmFsc2UpKTtcclxuICByZW1vdmVIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIkNvbnRlbnQtVHlwZVwiKTtcclxuICByZXR1cm4gaGVhZGVycztcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkQ29udGV4dEhlYWRlcnMgPSAodG9rZW46IHN0cmluZywgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IEhlYWRlcnNJbml0ID0+IHtcclxuICBjb25zdCBiYXNlID0gc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpO1xyXG4gIGNvbnN0IG1lcmdlZDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcclxuICAgIC4uLmJhc2UsXHJcbiAgICAuLi5KU09OX0hFQURFUlMsXHJcbiAgfTtcclxuXHJcbiAgaWYgKHNhZmVUZXh0KHRva2VuKSkge1xyXG4gICAgbWVyZ2VkLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7dG9rZW59YDtcclxuICB9XHJcblxyXG4gIHJldHVybiBtZXJnZWQ7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlQXV0aFRva2VuID0gKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHRva2VuRnJvbUhlYWRlcnMgPSByZXNvbHZlQmVhcmVyVG9rZW4ob3B0aW9ucz8uaGVhZGVycyk7XHJcbiAgY29uc3Qgd2luZG93U2VlZCA9IHJlYWRXaW5kb3dBdXRoU2VlZCgpO1xyXG4gIHJldHVybiBzYWZlVGV4dCh0b2tlbkZyb21IZWFkZXJzIHx8IHJ1bnRpbWVBdXRoU2VlZC50b2tlbiB8fCB3aW5kb3dTZWVkLnRva2VuKTtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVBdXRoU2VlZCA9IChvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogRXhwZW5zZUFwaUF1dGhTZWVkID0+IHtcclxuICBjb25zdCB3aW5kb3dTZWVkID0gcmVhZFdpbmRvd0F1dGhTZWVkKCk7XHJcbiAgY29uc3QgdG9rZW4gPSByZXNvbHZlQXV0aFRva2VuKG9wdGlvbnMpO1xyXG4gIGNvbnN0IGVudHJhT2lkID0gc2FmZVRleHQocnVudGltZUF1dGhTZWVkLmVudHJhT2lkIHx8IHdpbmRvd1NlZWQuZW50cmFPaWQpO1xyXG4gIGNvbnN0IGFwcENvZGUgPSBzYWZlVGV4dChydW50aW1lQXV0aFNlZWQuYXBwQ29kZSB8fCB3aW5kb3dTZWVkLmFwcENvZGUgfHwgREVGQVVMVF9BUFBfQ09ERSkgfHwgREVGQVVMVF9BUFBfQ09ERTtcclxuICBjb25zdCBzdHJpY3RBcGlSb3V0ZXMgPVxyXG4gICAgdHlwZW9mIHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXMgPT09IFwiYm9vbGVhblwiXHJcbiAgICAgID8gcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlc1xyXG4gICAgICA6ICh3aW5kb3dTZWVkLnN0cmljdEFwaVJvdXRlcyA9PT0gdHJ1ZSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0b2tlbixcclxuICAgIGVudHJhT2lkLFxyXG4gICAgYXBwQ29kZSxcclxuICAgIHN0cmljdEFwaVJvdXRlcyxcclxuICB9O1xyXG59O1xyXG5cclxudHlwZSBSYXdFbnRyYUNvbnRleHRDb21wYW55ID0ge1xyXG4gIENvbXBhbnlJZD86IHVua25vd247XHJcbiAgY29tcGFueUlkPzogdW5rbm93bjtcclxuICBJc0RlZmF1bHQ/OiB1bmtub3duO1xyXG4gIGlzRGVmYXVsdD86IHVua25vd247XHJcbiAgQWxsb3dTZWxmTWFuYWdlbWVudD86IHVua25vd247XHJcbiAgYWxsb3dTZWxmTWFuYWdlbWVudD86IHVua25vd247XHJcbiAgQ3JtVXNlcklkPzogdW5rbm93bjtcclxuICBjcm1Vc2VySWQ/OiB1bmtub3duO1xyXG59O1xyXG5cclxudHlwZSBOb3JtYWxpemVkRW50cmFDb250ZXh0Q29tcGFueSA9IHtcclxuICBjb21wYW55SWQ6IHN0cmluZztcclxuICBpc0RlZmF1bHQ6IGJvb2xlYW47XHJcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcclxuICBjcm1Vc2VySWQ6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgUmF3RW50cmFDb250ZXh0SGVhZGVyID0ge1xyXG4gIEF4VXNlcklkPzogdW5rbm93bjtcclxuICBheFVzZXJJZD86IHVua25vd247XHJcbiAgRGVmYXVsdENvbXBhbnk/OiB1bmtub3duO1xyXG4gIGRlZmF1bHRDb21wYW55PzogdW5rbm93bjtcclxuICBEZWZhdWx0Q3VycmVuY3lDb2RlPzogdW5rbm93bjtcclxuICBkZWZhdWx0Q3VycmVuY3lDb2RlPzogdW5rbm93bjtcclxufTtcclxuXHJcbnR5cGUgUmF3RW50cmFDb250ZXh0SXRlbSA9IHtcclxuICBIZWFkZXI/OiBSYXdFbnRyYUNvbnRleHRIZWFkZXI7XHJcbiAgaGVhZGVyPzogUmF3RW50cmFDb250ZXh0SGVhZGVyO1xyXG4gIENvbXBhbmllcz86IHVua25vd247XHJcbiAgY29tcGFuaWVzPzogdW5rbm93bjtcclxufTtcclxuXHJcbi8vIE1hcHMgb25lIEVudHJhIGNvbXBhbnkgaXRlbSB0byB0aGUgZnJvbnRlbmQtc2FmZSBzaGFwZSB1c2VkIGJ5IGNvbnRleHQgY29uc3VtZXJzLlxyXG5jb25zdCBtYXBFbnRyYUNvbnRleHRDb21wYW55ID0gKGl0ZW06IHVua25vd24pOiBOb3JtYWxpemVkRW50cmFDb250ZXh0Q29tcGFueSB8IG51bGwgPT4ge1xyXG4gIGlmICghaXRlbSB8fCB0eXBlb2YgaXRlbSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IHJhdyA9IGl0ZW0gYXMgUmF3RW50cmFDb250ZXh0Q29tcGFueTtcclxuICBjb25zdCBjb21wYW55SWQgPSBzYWZlVGV4dChyYXcuQ29tcGFueUlkID8/IHJhdy5jb21wYW55SWQpO1xyXG4gIGlmICghY29tcGFueUlkKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGNvbXBhbnlJZCxcclxuICAgIGlzRGVmYXVsdDogdG9GbGFnQm9vbChyYXcuSXNEZWZhdWx0ID8/IHJhdy5pc0RlZmF1bHQpID09PSB0cnVlLFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudDogdG9GbGFnQm9vbChyYXcuQWxsb3dTZWxmTWFuYWdlbWVudCA/PyByYXcuYWxsb3dTZWxmTWFuYWdlbWVudCkgPT09IHRydWUsXHJcbiAgICBjcm1Vc2VySWQ6IHNhZmVUZXh0KHJhdy5Dcm1Vc2VySWQgPz8gcmF3LmNybVVzZXJJZCksXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IHZhbGlkYXRlQ29udGV4dFJlc3BvbnNlID0gKHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEVudHJhQ29udGV4dER0bz4pOiBFeHBlbnNlQXBpQ29udGV4dCA9PiB7XG4gIGNvbnN0IHJhd1Jlc3BvbnNlID0gcmVzcG9uc2UgYXMge1xyXG4gICAgU3VjY2Vzcz86IHVua25vd247XHJcbiAgICBzdWNjZXNzPzogdW5rbm93bjtcclxuICAgIE1lc3NhZ2U/OiB1bmtub3duO1xyXG4gICAgbWVzc2FnZT86IHVua25vd247XHJcbiAgICBJdGVtcz86IHVua25vd247XHJcbiAgICBpdGVtcz86IHVua25vd247XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaXNTdWNjZXNzID0gdG9GbGFnQm9vbChyYXdSZXNwb25zZS5TdWNjZXNzID8/IHJhd1Jlc3BvbnNlLnN1Y2Nlc3MpO1xyXG4gIGlmIChpc1N1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihzYWZlVGV4dChyYXdSZXNwb25zZS5NZXNzYWdlID8/IHJhd1Jlc3BvbnNlLm1lc3NhZ2UpIHx8IFwiQ291bGQgbm90IGxvYWQgRW50cmEgY29udGV4dC5cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocmF3UmVzcG9uc2UuSXRlbXMpXHJcbiAgICA/IHJhd1Jlc3BvbnNlLkl0ZW1zXHJcbiAgICA6IChBcnJheS5pc0FycmF5KHJhd1Jlc3BvbnNlLml0ZW1zKSA/IHJhd1Jlc3BvbnNlLml0ZW1zIDogW10pO1xyXG4gIGNvbnN0IGZpcnN0ID0gaXRlbXNbMF0gYXMgUmF3RW50cmFDb250ZXh0SXRlbSB8IHVuZGVmaW5lZDtcclxuICBjb25zdCBoZWFkZXIgPSBmaXJzdD8uSGVhZGVyID8/IGZpcnN0Py5oZWFkZXI7XHJcbiAgaWYgKCFmaXJzdCB8fCAhaGVhZGVyKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkNvdWxkIG5vdCBsb2FkIEVudHJhIGNvbnRleHQuXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYXhVc2VySWQgPSBzYWZlVGV4dChoZWFkZXIuQXhVc2VySWQgPz8gaGVhZGVyLmF4VXNlcklkKTtcclxuICBjb25zdCBkZWZhdWx0Q29tcGFueSA9IHNhZmVUZXh0KGhlYWRlci5EZWZhdWx0Q29tcGFueSA/PyBoZWFkZXIuZGVmYXVsdENvbXBhbnkpO1xyXG4gIGNvbnN0IGRlZmF1bHRDdXJyZW5jeUNvZGUgPSBzYWZlVGV4dChoZWFkZXIuRGVmYXVsdEN1cnJlbmN5Q29kZSA/PyBoZWFkZXIuZGVmYXVsdEN1cnJlbmN5Q29kZSk7XHJcbiAgY29uc3QgY29tcGFuaWVzUmF3ID0gQXJyYXkuaXNBcnJheShmaXJzdC5Db21wYW5pZXMpXHJcbiAgICA/IGZpcnN0LkNvbXBhbmllc1xyXG4gICAgOiAoQXJyYXkuaXNBcnJheShmaXJzdC5jb21wYW5pZXMpID8gZmlyc3QuY29tcGFuaWVzIDogW10pO1xyXG4gIGNvbnN0IGNvbXBhbmllcyA9IGNvbXBhbmllc1Jhd1xuICAgIC5tYXAoKGl0ZW0pID0+IG1hcEVudHJhQ29udGV4dENvbXBhbnkoaXRlbSkpXG4gICAgLmZpbHRlcigoaXRlbSk6IGl0ZW0gaXMgTm9ybWFsaXplZEVudHJhQ29udGV4dENvbXBhbnkgPT4gISFpdGVtKTtcbiAgY29uc3Qgc2VsZWN0ZWRDb21wYW55SWQgPSByZWFkV2luZG93U2VsZWN0ZWRDb21wYW55KCk7XG4gIGNvbnN0IHNlbGVjdGVkQ29tcGFueU1hdGNoID0gc2VsZWN0ZWRDb21wYW55SWRcbiAgICA/IGNvbXBhbmllcy5maW5kKChpdGVtKSA9PiBzYWZlVGV4dChpdGVtLmNvbXBhbnlJZCkudG9VcHBlckNhc2UoKSA9PT0gc2VsZWN0ZWRDb21wYW55SWQpXG4gICAgOiBudWxsO1xuXG4gIC8vIE5ldmVyIGZhbGwgYmFjayB0byBhIGRpZmZlcmVudCBjb21wYW55IHdoZW4gdGhlIHVzZXIgc2VsZWN0ZWQgb25lIGV4cGxpY2l0bHkuXG4gIGlmIChzZWxlY3RlZENvbXBhbnlJZCAmJiAhc2VsZWN0ZWRDb21wYW55TWF0Y2gpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcbiAgICAgIGluZFQoXG4gICAgICAgIFwiRXhwZW5zZV9Db250ZXh0X1NlbGVjdGVkQ29tcGFueVVuYXZhaWxhYmxlXCIsXG4gICAgICAgIFwiVGhlIHNlbGVjdGVkIGNvbXBhbnkgaXMgbm8gbG9uZ2VyIGF2YWlsYWJsZS4gUGxlYXNlIGNob29zZSBpdCBhZ2FpbiBmcm9tIHRoZSBtYWluIG1lbnUuXCJcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgY29uc3QgZmFsbGJhY2tDb21wYW55ID0gc2FmZVRleHQoY29tcGFuaWVzLmZpbmQoKGl0ZW0pID0+IGl0ZW0uaXNEZWZhdWx0KT8uY29tcGFueUlkKTtcbiAgY29uc3QgY29tcGFueUlkID1cbiAgICBzZWxlY3RlZENvbXBhbnlNYXRjaD8uY29tcGFueUlkIHx8IHJlc29sdmVFZmZlY3RpdmVDb21wYW55SWQoXCJcIiwgY29tcGFuaWVzLCBkZWZhdWx0Q29tcGFueSB8fCBmYWxsYmFja0NvbXBhbnkpO1xuICBjb25zdCBzZWxlY3RlZENvbXBhbnkgPVxuICAgIHNlbGVjdGVkQ29tcGFueU1hdGNoIHx8IGNvbXBhbmllcy5maW5kKChpdGVtKSA9PiBzYWZlVGV4dChpdGVtLmNvbXBhbnlJZCkgPT09IGNvbXBhbnlJZCkgfHwgY29tcGFuaWVzWzBdO1xuICBjb25zdCBhbGxvd1NlbGZNYW5hZ2VtZW50ID0gc2VsZWN0ZWRDb21wYW55Py5hbGxvd1NlbGZNYW5hZ2VtZW50ID09PSB0cnVlO1xuICBjb25zdCBjcm1Vc2VySWQgPSBzYWZlVGV4dChzZWxlY3RlZENvbXBhbnk/LmNybVVzZXJJZCk7XG5cclxuICBpZiAoIWF4VXNlcklkIHx8ICFjb21wYW55SWQpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiQ291bGQgbm90IHJlc29sdmUgRW50cmEgY29tcGFueSBjb250ZXh0LlwiKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0b2tlbjogXCJcIixcclxuICAgIGNvbXBhbnlJZCxcclxuICAgIGF4VXNlcklkLFxyXG4gICAgY3JtVXNlcklkLFxyXG4gICAgZGVmYXVsdEN1cnJlbmN5Q29kZSxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0ID0gYXN5bmMgKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBQcm9taXNlPEV4cGVuc2VBcGlDb250ZXh0PiA9PiB7XHJcbiAgY29uc3Qgc2VlZCA9IHJlc29sdmVBdXRoU2VlZChvcHRpb25zKTtcclxuICBjb25zdCBjb250ZXh0S2V5ID0gYnVpbGRDb250ZXh0S2V5KHNlZWQpO1xyXG4gIGNvbnN0IHsgc2lnbmFsLCAuLi5iYXNlT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgaWYgKGNhY2hlZENvbnRleHQgJiYgY2FjaGVkQ29udGV4dEtleSA9PT0gY29udGV4dEtleSkge1xyXG4gICAgcmV0dXJuIHdhaXRGb3JBYm9ydGFibGVFeHBlbnNlUmVzdWx0KFByb21pc2UucmVzb2x2ZShjYWNoZWRDb250ZXh0KSwgc2lnbmFsKTtcclxuICB9XHJcblxyXG4gIGlmICghY29udGV4dFByb21pc2UgfHwgY2FjaGVkQ29udGV4dEtleSAhPT0gY29udGV4dEtleSkge1xyXG4gICAgY2FjaGVkQ29udGV4dEtleSA9IGNvbnRleHRLZXk7XHJcbiAgICBjb25zdCBzaGFyZWRDb250ZXh0UHJvbWlzZSA9IChhc3luYyAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbnRleHRQYXlsb2FkOiBFbnRyYUNvbnRleHRSZXF1ZXN0ID0ge1xyXG4gICAgICAgIGFwcENvZGU6IHNlZWQuYXBwQ29kZSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChzYWZlVGV4dChzZWVkLmVudHJhT2lkKSkge1xyXG4gICAgICAgIGNvbnRleHRQYXlsb2FkLmVudHJhT2lkID0gc2VlZC5lbnRyYU9pZDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY29udGV4dFJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RW50cmFDb250ZXh0RHRvPj4oXCIvYXBpL2F1dGgvZW50cmEvY29udGV4dFwiLCB7XHJcbiAgICAgICAgLi4uYmFzZU9wdGlvbnMsXHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiBidWlsZENvbnRleHRIZWFkZXJzKHNlZWQudG9rZW4sIGJhc2VPcHRpb25zKSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjb250ZXh0UGF5bG9hZCksXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgcmVzb2x2ZWQgPSB2YWxpZGF0ZUNvbnRleHRSZXNwb25zZShjb250ZXh0UmVzcG9uc2UpO1xyXG4gICAgICBjb25zdCBuZXh0Q29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQgPSB7XHJcbiAgICAgICAgLi4ucmVzb2x2ZWQsXHJcbiAgICAgICAgdG9rZW46IHNlZWQudG9rZW4sXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIHdpbmRvdy5fX0lORF9BTExPV19TRUxGX01BTkFHRU1FTlRfXyA9IG5leHRDb250ZXh0LmFsbG93U2VsZk1hbmFnZW1lbnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNhY2hlZENvbnRleHQgPSBuZXh0Q29udGV4dDtcclxuICAgICAgcmV0dXJuIG5leHRDb250ZXh0O1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICBjb250ZXh0UHJvbWlzZSA9IHNoYXJlZENvbnRleHRQcm9taXNlO1xyXG4gICAgdm9pZCBzaGFyZWRDb250ZXh0UHJvbWlzZS5maW5hbGx5KCgpID0+IHtcclxuICAgICAgaWYgKGNvbnRleHRQcm9taXNlID09PSBzaGFyZWRDb250ZXh0UHJvbWlzZSkge1xyXG4gICAgICAgIGNvbnRleHRQcm9taXNlID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYXdhaXQgd2FpdEZvckFib3J0YWJsZUV4cGVuc2VSZXN1bHQoY29udGV4dFByb21pc2UsIHNpZ25hbCk7XHJcbn07XHJcblxyXG4vLyBFeHBvc2VzIHJlc29sdmVkIEVudHJhIGNvbnRleHQgdmFsdWVzIG5lZWRlZCBieSBHYXN0b3MgVUkgbWFuYWdlbWVudCBzdGF0ZS5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VBcGlDb250ZXh0U25hcHNob3QgPSBhc3luYyAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IFByb21pc2U8RXhwZW5zZUFwaUNvbnRleHRTbmFwc2hvdD4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICByZXR1cm4ge1xyXG4gICAgY29tcGFueUlkOiBzYWZlVGV4dChjb250ZXh0LmNvbXBhbnlJZCkudG9VcHBlckNhc2UoKSxcclxuICAgIGF4VXNlcklkOiBzYWZlVGV4dChjb250ZXh0LmF4VXNlcklkKSxcclxuICAgIGNybVVzZXJJZDogc2FmZVRleHQoY29udGV4dC5jcm1Vc2VySWQpLFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudDogY29udGV4dC5hbGxvd1NlbGZNYW5hZ2VtZW50ID09PSB0cnVlLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlID0gbm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplQXBpUmVzcG9uc2UgPSBub3JtYWxpemVBcGlSZXNwb25zZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZSA9IG5vcm1hbGl6ZVRpY2tldFF1aWNrQ3JlYXRlUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZVN1Ym9yZGluYXRlc1BhZ2VkUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlID0gbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpbmtCdWxrUmVzcG9uc2UgPSBub3JtYWxpemVUaWNrZXRMaW5rQnVsa1Jlc3BvbnNlVHJhbnNmb3JtO1xyXG5cclxuY29uc3QgbG9va3NMaWtlSHRtbERvY3VtZW50ID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgcmF3ID0gc2FmZVRleHQodmFsdWUpLnRvTG93ZXJDYXNlKCk7XHJcbiAgcmV0dXJuIHJhdy5zdGFydHNXaXRoKFwiPCFkb2N0eXBlIGh0bWxcIikgfHwgcmF3LnN0YXJ0c1dpdGgoXCI8aHRtbFwiKTtcclxufTtcclxuXHJcbmNvbnN0IGlzQXBpUm91dGVVbmF2YWlsYWJsZSA9IChlcnJvcjogdW5rbm93bik6IGVycm9yIGlzIEFwaUZldGNoRXJyb3IgPT4ge1xyXG4gIGlmICghKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikpIHJldHVybiBmYWxzZTtcclxuICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDQgfHwgZXJyb3Iuc3RhdHVzID09PSA0MDUpIHJldHVybiB0cnVlO1xyXG4gIHJldHVybiBlcnJvci5zdGF0dXMgPT09IHVuZGVmaW5lZCAmJiBsb29rc0xpa2VIdG1sRG9jdW1lbnQoZXJyb3IucmVzcG9uc2VCb2R5KTtcclxufTtcclxuXHJcbmNvbnN0IGlzU3RyaWN0QXBpUm91dGVzRW5hYmxlZCA9ICgpOiBib29sZWFuID0+IHtcclxuICBpZiAodHlwZW9mIHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXMgPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICByZXR1cm4gcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcztcclxuICB9XHJcblxyXG4gIHJldHVybiByZWFkUnVudGltZVN0cmljdEFwaUZsYWcoKTtcclxufTtcclxuXHJcbmNvbnN0IHNob3VsZFVzZUxlZ2FjeUZhbGxiYWNrID0gKGVycm9yOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKGlzU3RyaWN0QXBpUm91dGVzRW5hYmxlZCgpKSByZXR1cm4gZmFsc2U7XHJcbiAgcmV0dXJuIGlzQXBpUm91dGVVbmF2YWlsYWJsZShlcnJvcik7XHJcbn07XHJcblxyXG5jb25zdCB0b0xlZ2FjeUxpc3RSZXF1ZXN0UGF5bG9hZCA9IChwYXlsb2FkOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBmaWx0ZXI6IHNhZmVUZXh0KHBheWxvYWQuZmlsdGVyKSxcclxuICAgIGhvamFHYXN0b3NJZDogc2FmZVRleHQocGF5bG9hZC5maWx0ZXIpLFxyXG4gICAgYmlsbGVkTW9kZTogcGF5bG9hZC5iaWxsZWRNb2RlID8/IDIsXHJcbiAgICBmcm9tRGF0ZTogc2FmZVRleHQocGF5bG9hZC5jcmVhdGVkRGF0ZUZyb20pLFxyXG4gICAgdG9EYXRlOiBzYWZlVGV4dChwYXlsb2FkLmNyZWF0ZWREYXRlVG8pLFxyXG4gICAgcHJvamVjdElkOiBzYWZlVGV4dChwYXlsb2FkLnByb2pJZCksXHJcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KHBheWxvYWQuY3VycmVuY3lDb2RlKSxcclxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlcihwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyksXHJcbiAgICBpbmNsdWRlU3Vib3JkaW5hdGVzOiBwYXlsb2FkLmluY2x1ZGVTdWJvcmRpbmF0ZXMgPT09IHRydWUsXHJcbiAgICBwYWdlOiBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZC5wYWdlKSAmJiBwYXlsb2FkLnBhZ2UgPiAwID8gcGF5bG9hZC5wYWdlIDogMSxcclxuICAgIHBhZ2VTaXplOiBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZC5wYWdlU2l6ZSkgJiYgcGF5bG9hZC5wYWdlU2l6ZSA+IDAgPyBwYXlsb2FkLnBhZ2VTaXplIDogNTAsXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IG1hcExlZ2FjeUxpc3RJdGVtVG9BcGlMaXN0SXRlbSA9IChpdGVtOiBMZWdhY3lFeHBlbnNlTGlzdEl0ZW0pOiBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIEhvamFHYXN0b3NJZDogc2FmZVRleHQoaXRlbS5ob2phR2FzdG9zSWQpLFxyXG4gICAgRGVzY3JpcHRpb246IHNhZmVUZXh0KGl0ZW0uZGVzY3JpcHRpb24pLFxyXG4gICAgRXhwZW5zZVNoZWV0U3RhdHVzOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uZXhwZW5zZVNoZWV0U3RhdHVzKSxcclxuICAgIEVzdGFkb0NvbWVudGFyaW9zOiBzYWZlVGV4dChpdGVtLmVzdGFkb0NvbWVudGFyaW9zKSB8fCBudWxsLFxyXG4gICAgVXNlcklkOiBzYWZlVGV4dChpdGVtLnVzZXJJZCkgfHwgbnVsbCxcclxuICAgIFVzZXJOYW1lOiBzYWZlVGV4dChpdGVtLnVzZXJOYW1lKSB8fCBudWxsLFxyXG4gICAgVm91Y2hlcjogc2FmZVRleHQoaXRlbS52b3VjaGVyKSxcclxuICAgIFByb2pJZDogc2FmZVRleHQoaXRlbS5wcm9qSWQpLFxyXG4gICAgQ3VycmVuY3lDb2RlOiBzYWZlVGV4dChpdGVtLmN1cnJlbmN5Q29kZSksXHJcbiAgICBUb3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihpdGVtLnRvdGFsQW1vdW50ID8/IGl0ZW0udG90YWxBbW91bnRNU1QpLFxyXG4gICAgRXhjaFJhdGU6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5leGNoUmF0ZSksXHJcbiAgICBFeGNoYW5nZVJhdGVNb2RlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uZXhjaGFuZ2VSYXRlTW9kZSksXHJcbiAgICBDcmVhdGVkRGF0ZTogc2FmZVRleHQoaXRlbS5jcmVhdGVkRGF0ZSkgfHwgbnVsbCxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgbWFwTGVnYWN5TGlzdFJlc3BvbnNlID0gKFxyXG4gIGxlZ2FjeTogTGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZSxcclxuICBmYWxsYmFja1BhZ2U6IG51bWJlcixcclxuICBmYWxsYmFja1BhZ2VTaXplOiBudW1iZXJcclxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz4gPT4ge1xyXG4gIGNvbnN0IGxlZ2FjeUl0ZW1zID0gQXJyYXkuaXNBcnJheShsZWdhY3k/Lml0ZW1zKSA/IGxlZ2FjeS5pdGVtcyA6IFtdO1xyXG4gIGNvbnN0IG1hcHBlZEl0ZW1zID0gbGVnYWN5SXRlbXMubWFwKChlbnRyeSkgPT4gbWFwTGVnYWN5TGlzdEl0ZW1Ub0FwaUxpc3RJdGVtKGVudHJ5KSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBTdWNjZXNzOiBsZWdhY3kuc3VjY2VzcyAhPT0gZmFsc2UsXHJcbiAgICBNZXNzYWdlOiBzYWZlVGV4dChsZWdhY3kubWVzc2FnZSkgfHwgXCJPS1wiLFxyXG4gICAgVG90YWw6IHRvTnVsbGFibGVOdW1iZXIobGVnYWN5LnRvdGFsKSA/PyBtYXBwZWRJdGVtcy5sZW5ndGgsXHJcbiAgICBQYWdlOiB0b051bGxhYmxlTnVtYmVyKGxlZ2FjeS5wYWdlKSA/PyBmYWxsYmFja1BhZ2UsXHJcbiAgICBQYWdlU2l6ZTogdG9OdWxsYWJsZU51bWJlcihsZWdhY3kucGFnZVNpemUpID8/IGZhbGxiYWNrUGFnZVNpemUsXHJcbiAgICBJdGVtczogbWFwcGVkSXRlbXMsXHJcbiAgICBUcmFjZUlkOiB1bmRlZmluZWQsXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIFNldHMgcnVudGltZSBhdXRoIGlucHV0cyB1c2VkIHRvIHJlc29sdmUgRW50cmEgY29udGV4dCBhbmQgbWFuZGF0b3J5IGV4cGVuc2UgaGVhZGVycy5cclxuZXhwb3J0IGNvbnN0IGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoID0gKHNlZWQ6IFBhcnRpYWw8RXhwZW5zZUFwaUF1dGhTZWVkPik6IHZvaWQgPT4ge1xyXG4gIGNvbnN0IHN0cmljdEZyb21TZWVkID0gdG9GbGFnQm9vbChzZWVkLnN0cmljdEFwaVJvdXRlcyk7XHJcbiAgY29uc3Qgc3RyaWN0RnJvbVJ1bnRpbWUgPVxyXG4gICAgdHlwZW9mIHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXMgPT09IFwiYm9vbGVhblwiID8gcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcyA6IHJlYWRSdW50aW1lU3RyaWN0QXBpRmxhZygpO1xyXG5cclxuICBydW50aW1lQXV0aFNlZWQgPSB7XHJcbiAgICAuLi5ydW50aW1lQXV0aFNlZWQsXHJcbiAgICB0b2tlbjogc2FmZVRleHQoc2VlZC50b2tlbiB8fCBydW50aW1lQXV0aFNlZWQudG9rZW4pLFxyXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHNlZWQuZW50cmFPaWQgfHwgcnVudGltZUF1dGhTZWVkLmVudHJhT2lkKSxcclxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHNlZWQuYXBwQ29kZSB8fCBydW50aW1lQXV0aFNlZWQuYXBwQ29kZSB8fCBERUZBVUxUX0FQUF9DT0RFKSxcclxuICAgIHN0cmljdEFwaVJvdXRlczogc3RyaWN0RnJvbVNlZWQgPz8gc3RyaWN0RnJvbVJ1bnRpbWUsXHJcbiAgfTtcclxuXHJcbiAgY2FjaGVkQ29udGV4dCA9IG51bGw7XHJcbiAgY2FjaGVkQ29udGV4dEtleSA9IFwiXCI7XHJcbiAgY29udGV4dFByb21pc2UgPSBudWxsO1xyXG4gIGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLmNsZWFyKCk7XHJcbiAgcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuY2xlYXIoKTtcclxufTtcclxuXHJcbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9saXN0IGl0ZW0gY29udHJhY3QgdG8gbGlzdCBjYXJkIFVJIG1vZGVsLlxyXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmQgPSBtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZENvcmU7XHJcblxyXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0gaGVhZGVyIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxyXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0SGVhZGVyID0gbWFwRXhwZW5zZVNoZWV0SGVhZGVyQ29yZTtcclxuXHJcbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfSBsaW5lIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldExpbmUgPSBtYXBFeHBlbnNlU2hlZXRMaW5lQ29yZTtcblxuZXhwb3J0IHR5cGUgRXhwZW5zZVNoZWV0TGlzdEZldGNoQ2FwdHVyZSA9IHtcbiAgcmVxdWVzdDogRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3Q7XG4gIHJlc3BvbnNlOiBFeHBlbnNlU2hlZXRMaXN0UmVzcG9uc2VFbnZlbG9wZTtcbiAgYXhVc2VySWRPdmVycmlkZTogc3RyaW5nIHwgbnVsbDtcbiAgc291cmNlOiBcImFwaVwiIHwgXCJsZWdhY3lcIjtcbn07XG5cbmV4cG9ydCB0eXBlIEV4cGVuc2VTaGVldExpc3RGZXRjaE9wdGlvbnMgPSBBcGlGZXRjaE9wdGlvbnMgJiB7XG4gIGF4VXNlcklkT3ZlcnJpZGU/OiBzdHJpbmc7XG4gIG9uUmVxdWVzdFByZXBhcmVkPzogKHJlcXVlc3Q6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0KSA9PiB2b2lkO1xuICBvbkNhcHR1cmU/OiAoY2FwdHVyZTogRXhwZW5zZVNoZWV0TGlzdEZldGNoQ2FwdHVyZSkgPT4gdm9pZDtcbn07XG5cclxuZXhwb3J0IHR5cGUgRXhwZW5zZVRpY2tldExpc3RGZXRjaE9wdGlvbnMgPSBBcGlGZXRjaE9wdGlvbnMgJiB7XG4gIGF4VXNlcklkT3ZlcnJpZGU/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBFeHBlbnNlU2hlZXRMaXN0U291cmNlSnNvbk9wdGlvbnMgPSBBcGlGZXRjaE9wdGlvbnMgJiB7XG4gIGF4VXNlcklkT3ZlcnJpZGU/OiBzdHJpbmc7XG4gIHNlZWRSZXNwb25zZT86IEV4cGVuc2VTaGVldExpc3RSZXNwb25zZUVudmVsb3BlIHwgbnVsbDtcbn07XG5cclxuY29uc3QgYnVpbGRUaWNrZXRMaXN0SGVhZGVycyA9IChcclxuICBjb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCxcclxuICBvcHRpb25zOiBBcGlGZXRjaE9wdGlvbnMgfCB1bmRlZmluZWQsXHJcbiAgYXhVc2VySWRPdmVycmlkZTogc3RyaW5nIHwgdW5kZWZpbmVkXHJcbik6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPT4ge1xyXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMoYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlLCBmYWxzZSkpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRPdmVycmlkZUF4VXNlcklkID0gbm9ybWFsaXplQXhVc2VySWRIZWFkZXIoYXhVc2VySWRPdmVycmlkZSk7XHJcbiAgY29uc3QgcmVzb2x2ZWRBeFVzZXJJZCA9IHNhZmVUZXh0KG5vcm1hbGl6ZWRPdmVycmlkZUF4VXNlcklkIHx8IGNvbnRleHQuYXhVc2VySWQpO1xyXG4gIGlmIChyZXNvbHZlZEF4VXNlcklkKSB7XHJcbiAgICBoZWFkZXJzW1wiWC1JTkQtQXhVc2VySWRcIl0gPSByZXNvbHZlZEF4VXNlcklkO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIlgtSU5ELUF4VXNlcklkXCIpO1xyXG4gIH1cclxuICByZXR1cm4gaGVhZGVycztcclxufTtcclxuXHJcbi8vIExvYWRzIHRoZSBleHBlbnNlIHNoZWV0IGxpc3QgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2xpc3QuXHJcbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldExpc3QgPSBhc3luYyAoXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0LFxuICBvcHRpb25zPzogRXhwZW5zZVNoZWV0TGlzdEZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldExpc3RJdGVtRHRvPj4gPT4ge1xuICBjb25zdCB7IGF4VXNlcklkT3ZlcnJpZGUsIG9uUmVxdWVzdFByZXBhcmVkLCBvbkNhcHR1cmUsIC4uLmJhc2VPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xuICBjb25zdCByYXdDcmVhdGVkRGF0ZUZyb20gPSBzYWZlVGV4dChwYXlsb2FkPy5jcmVhdGVkRGF0ZUZyb20pO1xuICBjb25zdCByYXdDcmVhdGVkRGF0ZVRvID0gc2FmZVRleHQocGF5bG9hZD8uY3JlYXRlZERhdGVUbyk7XG4gIGNvbnN0IGNyZWF0ZWREYXRlRnJvbSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdDcmVhdGVkRGF0ZUZyb20pO1xuICBjb25zdCBjcmVhdGVkRGF0ZVRvID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlKHJhd0NyZWF0ZWREYXRlVG8pO1xuXHJcbiAgaWYgKHJhd0NyZWF0ZWREYXRlRnJvbSAmJiAhY3JlYXRlZERhdGVGcm9tKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICB9XHJcbiAgaWYgKHJhd0NyZWF0ZWREYXRlVG8gJiYgIWNyZWF0ZWREYXRlVG8pIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0ID0ge1xyXG4gICAgLi4ucGF5bG9hZCxcclxuICAgIGNyZWF0ZWREYXRlRnJvbSxcclxuICAgIGNyZWF0ZWREYXRlVG8sXHJcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IG5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXIocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMpLFxuICAgIGluY2x1ZGVTdWJvcmRpbmF0ZXM6IHBheWxvYWQuaW5jbHVkZVN1Ym9yZGluYXRlcyA9PT0gdHJ1ZSxcbiAgfTtcbiAgY29uc3Qgc2VyaWFsaXplZFBheWxvYWQgPSBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUoc2FmZVBheWxvYWQpO1xuXG4gIG9uUmVxdWVzdFByZXBhcmVkPy4oc2VyaWFsaXplZFBheWxvYWQpO1xuXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChiYXNlT3B0aW9ucyk7XG4gIGNvbnN0IGxpc3RIZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgYmFzZU9wdGlvbnMsIHRydWUsIGZhbHNlKSk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRPdmVycmlkZUF4VXNlcklkID0gbm9ybWFsaXplQXhVc2VySWRIZWFkZXIoYXhVc2VySWRPdmVycmlkZSk7XHJcbiAgY29uc3QgcmVzb2x2ZWRBeFVzZXJJZCA9IHNhZmVUZXh0KG5vcm1hbGl6ZWRPdmVycmlkZUF4VXNlcklkIHx8IGNvbnRleHQuYXhVc2VySWQpO1xyXG4gIGlmIChyZXNvbHZlZEF4VXNlcklkKSB7XHJcbiAgICBsaXN0SGVhZGVyc1tcIlgtSU5ELUF4VXNlcklkXCJdID0gcmVzb2x2ZWRBeFVzZXJJZDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmVtb3ZlSGVhZGVyVmFsdWUobGlzdEhlYWRlcnMsIFwiWC1JTkQtQXhVc2VySWRcIik7XHJcbiAgfVxyXG5cclxuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvbGlzdFwiLCB7XG4gICAgICAuLi5iYXNlT3B0aW9ucyxcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBoZWFkZXJzOiBsaXN0SGVhZGVycyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcbiAgICB9KTtcblxuICAgIG9uQ2FwdHVyZT8uKHtcbiAgICAgIHJlcXVlc3Q6IHNlcmlhbGl6ZWRQYXlsb2FkLFxuICAgICAgcmVzcG9uc2U6IGNsb25lSnNvbkNvbXBhdGlibGVWYWx1ZShyZXNwb25zZSksXG4gICAgICBheFVzZXJJZE92ZXJyaWRlOiBub3JtYWxpemVkT3ZlcnJpZGVBeFVzZXJJZCB8fCBudWxsLFxuICAgICAgc291cmNlOiBcImFwaVwiLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoIXNob3VsZFVzZUxlZ2FjeUZhbGxiYWNrKGVycm9yKSkge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxlZ2FjeVJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPExlZ2FjeUV4cGVuc2VMaXN0UmVzcG9uc2U+KFwiL0dhc3Rvcy9MaXN0RXhwZW5zZVNoZWV0c1wiLCB7XHJcbiAgICAgIC4uLmJhc2VPcHRpb25zLFxyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgLi4uc2FuaXRpemVIZWFkZXJzKGJhc2VPcHRpb25zPy5oZWFkZXJzKSxcclxuICAgICAgICAuLi5KU09OX0hFQURFUlMsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHRvTGVnYWN5TGlzdFJlcXVlc3RQYXlsb2FkKHNhZmVQYXlsb2FkKSksXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBtYXBwZWQgPSBtYXBMZWdhY3lMaXN0UmVzcG9uc2UoXG4gICAgICBsZWdhY3lSZXNwb25zZSxcbiAgICAgIE51bWJlci5pc0Zpbml0ZShzYWZlUGF5bG9hZC5wYWdlKSAmJiBzYWZlUGF5bG9hZC5wYWdlID4gMCA/IHNhZmVQYXlsb2FkLnBhZ2UgOiAxLFxuICAgICAgTnVtYmVyLmlzRmluaXRlKHNhZmVQYXlsb2FkLnBhZ2VTaXplKSAmJiBzYWZlUGF5bG9hZC5wYWdlU2l6ZSA+IDAgPyBzYWZlUGF5bG9hZC5wYWdlU2l6ZSA6IDUwXG4gICAgKTtcblxuICAgIG9uQ2FwdHVyZT8uKHtcbiAgICAgIHJlcXVlc3Q6IHNlcmlhbGl6ZWRQYXlsb2FkLFxuICAgICAgcmVzcG9uc2U6IGNsb25lSnNvbkNvbXBhdGlibGVWYWx1ZShtYXBwZWQpLFxuICAgICAgYXhVc2VySWRPdmVycmlkZTogbm9ybWFsaXplZE92ZXJyaWRlQXhVc2VySWQgfHwgbnVsbCxcbiAgICAgIHNvdXJjZTogXCJsZWdhY3lcIixcbiAgICB9KTtcblxuICAgIHJldHVybiBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZShtYXBwZWQpO1xuICB9XG59O1xuXG5jb25zdCBub3JtYWxpemVQb3NpdGl2ZUludGVnZXIgPSAodmFsdWU6IHVua25vd24sIGZhbGxiYWNrVmFsdWU6IG51bWJlcik6IG51bWJlciA9PiB7XG4gIGNvbnN0IHBhcnNlZFZhbHVlID0gTnVtYmVyKHZhbHVlKTtcbiAgaWYgKE51bWJlci5pc0Zpbml0ZShwYXJzZWRWYWx1ZSkgJiYgcGFyc2VkVmFsdWUgPiAwKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IocGFyc2VkVmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIGZhbGxiYWNrVmFsdWU7XG59O1xuXG4vLyBSZWJ1aWxkcyBvbmUgZnVsbCBsaXN0IGVudmVsb3BlIGZvciB0aGUgYXNzaXN0YW50IGJ5IGxvYWRpbmcgZXZlcnkgcGFnZSBvZiB0aGUgYWN0aXZlIHF1ZXJ5LlxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0TGlzdFNvdXJjZUpzb24gPSBhc3luYyAoXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0LFxuICBvcHRpb25zPzogRXhwZW5zZVNoZWV0TGlzdFNvdXJjZUpzb25PcHRpb25zXG4pOiBQcm9taXNlPEV4cGVuc2VTaGVldExpc3RSZXNwb25zZUVudmVsb3BlPiA9PiB7XG4gIGNvbnN0IHsgc2VlZFJlc3BvbnNlLCAuLi5iYXNlT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3QgZmFsbGJhY2tQYWdlID0gbm9ybWFsaXplUG9zaXRpdmVJbnRlZ2VyKHBheWxvYWQ/LnBhZ2UsIDEpO1xuICBjb25zdCBmYWxsYmFja1BhZ2VTaXplID0gbm9ybWFsaXplUG9zaXRpdmVJbnRlZ2VyKHBheWxvYWQ/LnBhZ2VTaXplLCA1MCk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRTZWVkUmVzcG9uc2UgPSBzZWVkUmVzcG9uc2UgPyBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZShjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUoc2VlZFJlc3BvbnNlKSkgOiBudWxsO1xuICBjb25zdCBpbml0aWFsUmVzcG9uc2UgPSBub3JtYWxpemVkU2VlZFJlc3BvbnNlID8/IChhd2FpdCBmZXRjaEV4cGVuc2VTaGVldExpc3QocGF5bG9hZCwgYmFzZU9wdGlvbnMpKTtcbiAgY29uc3Qgbm9ybWFsaXplZEluaXRpYWxSZXNwb25zZSA9IG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlKGNsb25lSnNvbkNvbXBhdGlibGVWYWx1ZShpbml0aWFsUmVzcG9uc2UpKTtcblxuICBpZiAobm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFxuICAgICAgc2FmZVRleHQobm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5NZXNzYWdlKSB8fCBcIkNvdWxkIG5vdCBsb2FkIHRoZSBmdWxsIGV4cGVuc2Ugc2hlZXQgcXVlcnkuXCJcbiAgICApO1xuICB9XG5cbiAgY29uc3QgdG90YWxSZWNvcmRzUmF3ID0gTnVtYmVyKG5vcm1hbGl6ZWRJbml0aWFsUmVzcG9uc2UuVG90YWwpO1xuICBjb25zdCB0b3RhbFJlY29yZHMgPVxuICAgIE51bWJlci5pc0Zpbml0ZSh0b3RhbFJlY29yZHNSYXcpICYmIHRvdGFsUmVjb3Jkc1JhdyA+PSAwXG4gICAgICA/IE1hdGguZmxvb3IodG90YWxSZWNvcmRzUmF3KVxuICAgICAgOiBub3JtYWxpemVkSW5pdGlhbFJlc3BvbnNlLkl0ZW1zLmxlbmd0aDtcbiAgY29uc3QgZWZmZWN0aXZlUGFnZVNpemUgPSBub3JtYWxpemVQb3NpdGl2ZUludGVnZXIobm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5QYWdlU2l6ZSwgZmFsbGJhY2tQYWdlU2l6ZSk7XG4gIGNvbnN0IHRvdGFsUGFnZXMgPSBNYXRoLm1heCgxLCBNYXRoLmNlaWwodG90YWxSZWNvcmRzIC8gTWF0aC5tYXgoMSwgZWZmZWN0aXZlUGFnZVNpemUpKSk7XG4gIGNvbnN0IGN1cnJlbnRQYWdlID0gTWF0aC5taW4oXG4gICAgdG90YWxQYWdlcyxcbiAgICBub3JtYWxpemVQb3NpdGl2ZUludGVnZXIobm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5QYWdlID8/IGZhbGxiYWNrUGFnZSwgZmFsbGJhY2tQYWdlKVxuICApO1xuXG4gIGlmICh0b3RhbFBhZ2VzIDw9IDEpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4ubm9ybWFsaXplZEluaXRpYWxSZXNwb25zZSxcbiAgICAgIFRvdGFsOiB0b3RhbFJlY29yZHMsXG4gICAgICBQYWdlOiAxLFxuICAgICAgUGFnZVNpemU6IGVmZmVjdGl2ZVBhZ2VTaXplLFxuICAgICAgSXRlbXM6IGNsb25lSnNvbkNvbXBhdGlibGVWYWx1ZShub3JtYWxpemVkSW5pdGlhbFJlc3BvbnNlLkl0ZW1zKSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgaXRlbXNCeVBhZ2UgPSBuZXcgTWFwPG51bWJlciwgRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG9bXT4oKTtcbiAgaXRlbXNCeVBhZ2Uuc2V0KGN1cnJlbnRQYWdlLCBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUobm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5JdGVtcykpO1xuXG4gIGZvciAobGV0IHBhZ2VOdW1iZXIgPSAxOyBwYWdlTnVtYmVyIDw9IHRvdGFsUGFnZXM7IHBhZ2VOdW1iZXIgKz0gMSkge1xuICAgIGlmIChwYWdlTnVtYmVyID09PSBjdXJyZW50UGFnZSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgY29uc3QgcGFnZVJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRMaXN0KFxuICAgICAge1xuICAgICAgICAuLi5wYXlsb2FkLFxuICAgICAgICBwYWdlOiBwYWdlTnVtYmVyLFxuICAgICAgICBwYWdlU2l6ZTogZWZmZWN0aXZlUGFnZVNpemUsXG4gICAgICB9LFxuICAgICAgYmFzZU9wdGlvbnNcbiAgICApO1xuXG4gICAgaWYgKHBhZ2VSZXNwb25zZS5TdWNjZXNzID09PSBmYWxzZSkge1xuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXG4gICAgICAgIHNhZmVUZXh0KHBhZ2VSZXNwb25zZS5NZXNzYWdlKSB8fCBgQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBwYWdlICR7cGFnZU51bWJlcn0uYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpdGVtc0J5UGFnZS5zZXQocGFnZU51bWJlciwgY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlKHBhZ2VSZXNwb25zZS5JdGVtcykpO1xuICB9XG5cbiAgY29uc3QgYWxsSXRlbXM6IEV4cGVuc2VTaGVldExpc3RJdGVtRHRvW10gPSBbXTtcbiAgZm9yIChsZXQgcGFnZU51bWJlciA9IDE7IHBhZ2VOdW1iZXIgPD0gdG90YWxQYWdlczsgcGFnZU51bWJlciArPSAxKSB7XG4gICAgY29uc3QgcGFnZUl0ZW1zID0gaXRlbXNCeVBhZ2UuZ2V0KHBhZ2VOdW1iZXIpO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShwYWdlSXRlbXMpIHx8IHBhZ2VJdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGFsbEl0ZW1zLnB1c2goLi4ucGFnZUl0ZW1zKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLi4ubm9ybWFsaXplZEluaXRpYWxSZXNwb25zZSxcbiAgICBUb3RhbDogdG90YWxSZWNvcmRzLFxuICAgIFBhZ2U6IDEsXG4gICAgUGFnZVNpemU6IGVmZmVjdGl2ZVBhZ2VTaXplLFxuICAgIEl0ZW1zOiBhbGxJdGVtcyxcbiAgfTtcbn07XG5cclxuLy8gTG9hZHMgb25lIGV4cGVuc2Ugc2hlZXQgZGV0YWlsIGZyb20gL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS5cclxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsID0gYXN5bmMgKFxyXG4gIGhvamFHYXN0b3NJZDogc3RyaW5nLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldERldGFpbER0bz4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0RGV0YWlsRHRvPj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH1gLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gUmVhZHMgYXZhaWxhYmxlIGN1cnJlbmNpZXMgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2N1cnJlbmNpZXMuXHJcbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlU2hlZXRDdXJyZW5jaWVzID0gYXN5bmMgKFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj4gPT4ge1xyXG4gIGxldCBjb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCB8IG51bGwgPSBudWxsO1xyXG4gIHRyeSB7XHJcbiAgICBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGlmICghKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikpIHtcclxuICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBjb21wYW55SWQgPSBzYWZlVGV4dChjb250ZXh0Py5jb21wYW55SWQgfHwgcmVhZFdpbmRvd1NlbGVjdGVkQ29tcGFueSgpKS50b1VwcGVyQ2FzZSgpO1xyXG4gIGNvbnN0IGNhY2hlS2V5ID0gY29tcGFueUlkIHx8IFwiLVwiO1xyXG5cclxuICBpZiAoY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuaGFzKGNhY2hlS2V5KSkge1xyXG4gICAgcmV0dXJuIGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLmdldChjYWNoZUtleSkgYXMgSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz47XHJcbiAgfVxyXG5cclxuICBpZiAocGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuaGFzKGNhY2hlS2V5KSkge1xyXG4gICAgcmV0dXJuIHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLmdldChjYWNoZUtleSkgYXMgUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj47XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXF1ZXN0UHJvbWlzZSA9IChhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBoZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpO1xyXG4gICAgcmVtb3ZlSGVhZGVyVmFsdWUoaGVhZGVycywgXCJBdXRob3JpemF0aW9uXCIpO1xyXG4gICAgcmVtb3ZlSGVhZGVyVmFsdWUoaGVhZGVycywgXCJYLUlORC1BeFVzZXJJZFwiKTtcclxuXHJcbiAgICBpZiAoY29tcGFueUlkKSB7XHJcbiAgICAgIGhlYWRlcnNbXCJYLUlORC1Db21wYW55XCJdID0gY29tcGFueUlkO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvY3VycmVuY2llc1wiLCB7XHJcbiAgICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgaGVhZGVycyxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBub3JtYWxpemVkUmVzcG9uc2UgPSBub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xyXG4gICAgICBpZiAobm9ybWFsaXplZFJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICBjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcy5zZXQoY2FjaGVLZXksIG5vcm1hbGl6ZWRSZXNwb25zZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBub3JtYWxpemVkUmVzcG9uc2U7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBpZiAoIXNob3VsZFVzZUxlZ2FjeUZhbGxiYWNrKGVycm9yKSkge1xyXG4gICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBsZWdhY3lMaXN0UmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248TGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZT4oXCIvR2FzdG9zL0xpc3RFeHBlbnNlU2hlZXRzXCIsIHtcclxuICAgICAgICAuLi5vcHRpb25zLFxyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgLi4uc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpLFxyXG4gICAgICAgICAgLi4uSlNPTl9IRUFERVJTLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgZmlsdGVyOiBcIlwiLFxyXG4gICAgICAgICAgaG9qYUdhc3Rvc0lkOiBcIlwiLFxyXG4gICAgICAgICAgYmlsbGVkTW9kZTogMixcclxuICAgICAgICAgIGZyb21EYXRlOiBcIlwiLFxyXG4gICAgICAgICAgdG9EYXRlOiBcIlwiLFxyXG4gICAgICAgICAgcHJvamVjdElkOiBcIlwiLFxyXG4gICAgICAgICAgY3VycmVuY3lDb2RlOiBcIlwiLFxyXG4gICAgICAgICAgcGFnZTogMSxcclxuICAgICAgICAgIHBhZ2VTaXplOiAyMDAsXHJcbiAgICAgICAgfSksXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3Qgc2VlbkNvZGVzID0gbmV3IFNldDxzdHJpbmc+KCk7XHJcbiAgICAgIGNvbnN0IHNvdXJjZUl0ZW1zID0gQXJyYXkuaXNBcnJheShsZWdhY3lMaXN0UmVzcG9uc2UuaXRlbXMpID8gbGVnYWN5TGlzdFJlc3BvbnNlLml0ZW1zIDogW107XHJcbiAgICAgIGNvbnN0IGZhbGxiYWNrSXRlbXM6IEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvW10gPSBzb3VyY2VJdGVtc1xyXG4gICAgICAgIC5tYXAoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeS5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCkpXHJcbiAgICAgICAgLmZpbHRlcigoY29kZSkgPT4gISFjb2RlKVxyXG4gICAgICAgIC5maWx0ZXIoKGNvZGUpID0+IHtcclxuICAgICAgICAgIGlmIChzZWVuQ29kZXMuaGFzKGNvZGUpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICBzZWVuQ29kZXMuYWRkKGNvZGUpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAubWFwKChjb2RlKSA9PiAoe1xyXG4gICAgICAgICAgQ3VycmVuY3lDb2RlOiBjb2RlLFxyXG4gICAgICAgICAgQ3VycmVuY3lDb2RlSVNPOiBjb2RlLFxyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgIGNvbnN0IGZhbGxiYWNrUmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+ID0ge1xyXG4gICAgICAgIFN1Y2Nlc3M6IGxlZ2FjeUxpc3RSZXNwb25zZS5zdWNjZXNzICE9PSBmYWxzZSxcclxuICAgICAgICBNZXNzYWdlOiBzYWZlVGV4dChsZWdhY3lMaXN0UmVzcG9uc2UubWVzc2FnZSkgfHwgXCJPS1wiLFxyXG4gICAgICAgIFRvdGFsOiBmYWxsYmFja0l0ZW1zLmxlbmd0aCxcclxuICAgICAgICBQYWdlOiAxLFxyXG4gICAgICAgIFBhZ2VTaXplOiBmYWxsYmFja0l0ZW1zLmxlbmd0aCxcclxuICAgICAgICBJdGVtczogZmFsbGJhY2tJdGVtcyxcclxuICAgICAgICBUcmFjZUlkOiB1bmRlZmluZWQsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjb25zdCBub3JtYWxpemVkRmFsbGJhY2sgPSBub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2UoZmFsbGJhY2tSZXNwb25zZSk7XHJcbiAgICAgIGlmIChub3JtYWxpemVkRmFsbGJhY2suU3VjY2Vzcykge1xyXG4gICAgICAgIGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLnNldChjYWNoZUtleSwgbm9ybWFsaXplZEZhbGxiYWNrKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRGYWxsYmFjaztcclxuICAgIH1cclxuICB9KSgpO1xyXG5cclxuICBwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5zZXQoY2FjaGVLZXksIHJlcXVlc3RQcm9taXNlKTtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGF3YWl0IHJlcXVlc3RQcm9taXNlO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICBwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5kZWxldGUoY2FjaGVLZXkpO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIFJlYWRzIGF2YWlsYWJsZSBzdWJvcmRpbmF0ZXMgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3N1Ym9yZGluYXRlcy5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlcyA9IGFzeW5jIChcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0bz4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgLy8gU3Vib3JkaW5hdGVzIG11c3QgYWx3YXlzIHJlc29sdmUgZnJvbSB0aGUgbG9nZ2VkIGNvbnRleHQgdXNlciwgbm90IGZyb20gYWN0aW5nLXVzZXIgb3ZlcnJpZGVzLlxyXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMoYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCBmYWxzZSwgZmFsc2UpKTtcclxuICBjb25zdCBjb250ZXh0QXhVc2VySWQgPSBzYWZlVGV4dChjb250ZXh0LmF4VXNlcklkKTtcclxuICBpZiAoY29udGV4dEF4VXNlcklkKSB7XHJcbiAgICBoZWFkZXJzW1wiWC1JTkQtQXhVc2VySWRcIl0gPSBjb250ZXh0QXhVc2VySWQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPHVua25vd24+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvc3Vib3JkaW5hdGVzXCIsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICBoZWFkZXJzLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBFeHBvc2VzIHRoZSBkZWZhdWx0IGN1cnJlbmN5IHJlc29sdmVkIGZyb20gRW50cmEgY29udGV4dCBmb3IgaW5pdGlhbCBzZWxlY3Rpb25zLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVNoZWV0RGVmYXVsdEN1cnJlbmN5Q29kZSA9IGFzeW5jIChvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIHNhZmVUZXh0KGNvbnRleHQuZGVmYXVsdEN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKTtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIFJlYWRzIGV4Y2hhbmdlIHJhdGUgZnJvbSAvYXBpL3N5c3RlbS9leGNoYW5nZS1yYXRlLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhjaGFuZ2VSYXRlID0gYXN5bmMgKFxyXG4gIGJhc2VDdXJyZW5jeTogc3RyaW5nLFxyXG4gIHRhcmdldEN1cnJlbmN5OiBzdHJpbmcsXHJcbiAgZGF0ZT86IHN0cmluZyxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RXhjaGFuZ2VSYXRlRHRvPj4gPT4ge1xyXG4gIGNvbnN0IHRva2VuID0gcmVzb2x2ZUF1dGhUb2tlbihvcHRpb25zKTtcclxuICBjb25zdCBub3JtYWxpemVkQmFzZUN1cnJlbmN5ID0gc2FmZVRleHQoYmFzZUN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRUYXJnZXRDdXJyZW5jeSA9IHNhZmVUZXh0KHRhcmdldEN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWREYXRlID0gc2FmZVRleHQoZGF0ZSk7XHJcbiAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XHJcblxyXG4gIHF1ZXJ5LnNldChcImJhc2VDdXJyZW5jeVwiLCBub3JtYWxpemVkQmFzZUN1cnJlbmN5KTtcclxuICBxdWVyeS5zZXQoXCJ0YXJnZXRDdXJyZW5jeVwiLCBub3JtYWxpemVkVGFyZ2V0Q3VycmVuY3kpO1xyXG4gIGlmIChub3JtYWxpemVkRGF0ZSkge1xyXG4gICAgcXVlcnkuc2V0KFwiZGF0ZVwiLCBub3JtYWxpemVkRGF0ZSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBoZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpO1xyXG4gIGlmICh0b2tlbikge1xyXG4gICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke3Rva2VufWA7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4Y2hhbmdlUmF0ZUR0bz4+KGAvYXBpL3N5c3RlbS9leGNoYW5nZS1yYXRlPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgaGVhZGVycyxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIFJlYWRzIGV4Y2hhbmdlIHJhdGUgZnJvbSAvYXBpL3N5c3RlbS9leGNoYW5nZS1yYXRlL3B1YmxpYy1kaXJlY3QuXHJcbmV4cG9ydCBjb25zdCBnZXRFeGNoYW5nZVJhdGVQdWJsaWNEaXJlY3QgPSBhc3luYyAoXHJcbiAgYmFzZUN1cnJlbmN5OiBzdHJpbmcsXHJcbiAgdGFyZ2V0Q3VycmVuY3k6IHN0cmluZyxcclxuICBkYXRlPzogc3RyaW5nLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeGNoYW5nZVJhdGVEdG8+PiA9PiB7XHJcbiAgY29uc3QgdG9rZW4gPSByZXNvbHZlQXV0aFRva2VuKG9wdGlvbnMpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kgPSBzYWZlVGV4dChiYXNlQ3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFRhcmdldEN1cnJlbmN5ID0gc2FmZVRleHQodGFyZ2V0Q3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZERhdGUgPSBzYWZlVGV4dChkYXRlKTtcclxuICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcclxuXHJcbiAgcXVlcnkuc2V0KFwiYmFzZUN1cnJlbmN5XCIsIG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kpO1xyXG4gIHF1ZXJ5LnNldChcInRhcmdldEN1cnJlbmN5XCIsIG5vcm1hbGl6ZWRUYXJnZXRDdXJyZW5jeSk7XHJcbiAgaWYgKG5vcm1hbGl6ZWREYXRlKSB7XHJcbiAgICBxdWVyeS5zZXQoXCJkYXRlXCIsIG5vcm1hbGl6ZWREYXRlKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XHJcbiAgaWYgKHRva2VuKSB7XHJcbiAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7dG9rZW59YDtcclxuICB9XHJcblxyXG4gIHJldHVybiBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhjaGFuZ2VSYXRlRHRvPj4oYC9hcGkvc3lzdGVtL2V4Y2hhbmdlLXJhdGUvcHVibGljLWRpcmVjdD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgIGhlYWRlcnMsXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyBSZWFkcyBmdWVsIHByaWNlIHBlciBrbSBmcm9tIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvZnVlbC1wcmljZS1rbS5cclxuZXhwb3J0IGNvbnN0IGdldEZ1ZWxQcmljZUttID0gYXN5bmMgKFxyXG4gIHRyYW5zRGF0ZTogc3RyaW5nLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxGdWVsUHJpY2VLbUR0bz4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZERhdGUgPSBub3JtYWxpemVSZXF1aXJlZEFwaURhdGUodHJhbnNEYXRlKTtcclxuICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcclxuXHJcbiAgcXVlcnkuc2V0KFwidHJhbnNEYXRlXCIsIG5vcm1hbGl6ZWREYXRlKTtcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RnVlbFByaWNlS21EdG8+PihcclxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2Z1ZWwtcHJpY2Uta20/JHtxdWVyeS50b1N0cmluZygpfWAsXHJcbiAgICB7XHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gQ3JlYXRlcyBhbiBleHBlbnNlIHNoZWV0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVFeHBlbnNlU2hlZXQgPSBhc3luYyAoXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3JlYXRlUmVzcG9uc2VEYXRhPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBtb2RlID0gcGF5bG9hZC5tb2RlID8/IDA7XHJcbiAgY29uc3QgbGluZXMgPSBBcnJheS5pc0FycmF5KHBheWxvYWQubGluZXMpID8gcGF5bG9hZC5saW5lcyA6IFtdO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRMaW5lcyA9IGxpbmVzLm1hcCgobGluZSkgPT4gKHtcclxuICAgIC4uLmxpbmUsXHJcbiAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZShsaW5lLnRyYW5zRGF0ZSksXHJcbiAgfSkpO1xyXG4gIGNvbnN0IGhhc0ludmFsaWRMaW5lUGF5bG9hZCA9IG5vcm1hbGl6ZWRMaW5lcy5zb21lKChsaW5lKSA9PiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAhc2FmZVRleHQobGluZS50cmFuc0RhdGUpIHx8XHJcbiAgICAgICFOdW1iZXIuaXNJbnRlZ2VyKE51bWJlcihsaW5lLnR5cGVWYWx1ZSkpIHx8XHJcbiAgICAgIE51bWJlcihsaW5lLnR5cGVWYWx1ZSkgPD0gMCB8fFxyXG4gICAgICAhaXNQb3NpdGl2ZU51bWJlcihsaW5lLnF0eSkgfHxcclxuICAgICAgIWlzUG9zaXRpdmVOdW1iZXIobGluZS5wcmljZSlcclxuICAgICk7XHJcbiAgfSk7XHJcblxyXG4gIGlmIChwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyAhPT0gdW5kZWZpbmVkICYmICFpc05vbk5lZ2F0aXZlTnVtYmVyKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzKSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleHBlbnNlU2hlZXRTdGF0dXMgbXVzdCBiZSBncmVhdGVyIG9yIGVxdWFsIHRvIDAuXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSAhPT0gdW5kZWZpbmVkICYmICFpc05vbk5lZ2F0aXZlTnVtYmVyKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSkpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhjaGFuZ2VSYXRlTW9kZSBtdXN0IGJlIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMC5cIik7XHJcbiAgfVxyXG5cclxuICBpZiAocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlICE9PSB1bmRlZmluZWQgJiYgcGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleGNoYW5nZVJhdGVNb2RlIHJlcXVpcmVzIGV4cGVuc2VTaGVldFN0YXR1cy5cIik7XHJcbiAgfVxyXG5cclxuICBpZiAoaGFzSW52YWxpZExpbmVQYXlsb2FkKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkVhY2ggbGluZSByZXF1aXJlcyB0cmFuc0RhdGUsIHR5cGVWYWx1ZSwgcXR5ID4gMCBhbmQgcHJpY2UgPiAwLlwiKTtcclxuICB9XHJcblxyXG4gIGlmIChtb2RlID09PSAwKSB7XHJcbiAgICBpZiAoIXNhZmVUZXh0KHBheWxvYWQuZGVzY3JpcHRpb24pIHx8ICFzYWZlVGV4dChwYXlsb2FkLmN1cnJlbmN5Q29kZSkgfHwgbGluZXMubGVuZ3RoIDwgMSkge1xyXG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkludmFsaWQgY3JlYXRlIHBheWxvYWQgZm9yIG1vZGUgMC5cIik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAobW9kZSA9PT0gMSkge1xyXG4gICAgaWYgKCFzYWZlVGV4dChwYXlsb2FkLmRlc2NyaXB0aW9uKSB8fCAhc2FmZVRleHQocGF5bG9hZC5jdXJyZW5jeUNvZGUpKSB7XHJcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiSW52YWxpZCBjcmVhdGUgcGF5bG9hZCBmb3IgbW9kZSAxLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGluZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIk1vZGUgMSByZXF1aXJlcyBsaW5lcyB0byBiZSBudWxsIG9yIGVtcHR5LlwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChtb2RlID09PSAyKSB7XHJcbiAgICBpZiAoIXNhZmVUZXh0KHBheWxvYWQuZXhpc3RpbmdIb2phR2FzdG9zSWQpIHx8IGxpbmVzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJJbnZhbGlkIGNyZWF0ZSBwYXlsb2FkIGZvciBtb2RlIDIuXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3Qgbm9ybWFsaXplZFBheWxvYWQ6IEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QgPSB7XHJcbiAgICAuLi5wYXlsb2FkLFxyXG4gICAgbW9kZSxcclxuICAgIGV4aXN0aW5nSG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChwYXlsb2FkLmV4aXN0aW5nSG9qYUdhc3Rvc0lkKSB8fCB1bmRlZmluZWQsXHJcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQocGF5bG9hZC5kZXNjcmlwdGlvbikgfHwgdW5kZWZpbmVkLFxyXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChwYXlsb2FkLmN1cnJlbmN5Q29kZSkgfHwgdW5kZWZpbmVkLFxyXG4gICAgcHJvaklkOiBzYWZlVGV4dChwYXlsb2FkLnByb2pJZCkgfHwgdW5kZWZpbmVkLFxyXG4gICAgbGluZXM6IG1vZGUgPT09IDEgPyBbXSA6IG5vcm1hbGl6ZWRMaW5lcyxcclxuICB9O1xyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRDcmVhdGVSZXNwb25zZURhdGE+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHNcIiwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkobm9ybWFsaXplZFBheWxvYWQpLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gVXBkYXRlcyBoZWFkZXIgZmllbGRzIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0uXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVFeHBlbnNlU2hlZXRIZWFkZXIgPSBhc3luYyAoXHJcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0SGVhZGVyVXBkYXRlUmVxdWVzdCxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8eyBIb2phR2FzdG9zSWQ6IHN0cmluZyB9Pj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlU2hlZXRJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSk7XHJcblxyXG4gIGlmIChwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyAhPT0gdW5kZWZpbmVkICYmICFpc05vbk5lZ2F0aXZlTnVtYmVyKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzKSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleHBlbnNlU2hlZXRTdGF0dXMgbXVzdCBiZSBncmVhdGVyIG9yIGVxdWFsIHRvIDAuXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSAhPT0gdW5kZWZpbmVkICYmICFpc05vbk5lZ2F0aXZlTnVtYmVyKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSkpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhjaGFuZ2VSYXRlTW9kZSBtdXN0IGJlIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMC5cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTx7IEhvamFHYXN0b3NJZDogc3RyaW5nIH0+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy8ke3NhZmVTaGVldElkfWAsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBEZWxldGVzIGEgZnVsbCBleHBlbnNlIHNoZWV0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0vbGluZXMvMD9kZWxldGVXaG9sZVNoZWV0PXRydWUuXHJcbmV4cG9ydCBjb25zdCBkZWxldGVFeHBlbnNlU2hlZXQgPSBhc3luYyAoXHJcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG51bGw+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxudWxsPj4oXHJcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy8ke3NhZmVTaGVldElkfS9saW5lcy8wP2RlbGV0ZU1vZGU9MiZkZWxldGVXaG9sZVNoZWV0PXRydWVgLFxyXG4gICAge1xyXG4gICAgICAuLi5vcHRpb25zLFxyXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIFVwZGF0ZXMgb25lIGV4cGVuc2UgbGluZSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9L2xpbmVzL3tsaW5lUmVjSWR9LlxyXG5leHBvcnQgY29uc3QgdXBkYXRlRXhwZW5zZVNoZWV0TGluZSA9IGFzeW5jIChcclxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcclxuICBsaW5lUmVjSWQ6IHN0cmluZyxcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVxdWVzdCxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlc3BvbnNlRGF0YT4+ID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkVHJhbnNEYXRlID0gbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlKHBheWxvYWQudHJhbnNEYXRlKTtcclxuICBpZiAoXHJcbiAgICAhTnVtYmVyLmlzSW50ZWdlcihOdW1iZXIocGF5bG9hZC50eXBlVmFsdWUpKSB8fFxyXG4gICAgTnVtYmVyKHBheWxvYWQudHlwZVZhbHVlKSA8PSAwIHx8XHJcbiAgICAhaXNQb3NpdGl2ZU51bWJlcihwYXlsb2FkLnF0eSkgfHxcclxuICAgICFpc1Bvc2l0aXZlTnVtYmVyKHBheWxvYWQucHJpY2UpXHJcbiAgKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcInRyYW5zRGF0ZSwgdHlwZVZhbHVlLCBxdHkgPiAwIGFuZCBwcmljZSA+IDAgYXJlIHJlcXVpcmVkLlwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlU2hlZXRJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3Qgc2FmZUxpbmVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcobGluZVJlY0lkIHx8IFwiXCIpLnRyaW0oKSk7XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXNwb25zZURhdGE+PihcclxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9L2xpbmVzLyR7c2FmZUxpbmVJZH1gLFxyXG4gICAge1xyXG4gICAgICAuLi5vcHRpb25zLFxyXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAuLi5wYXlsb2FkLFxyXG4gICAgICAgIHRyYW5zRGF0ZTogbm9ybWFsaXplZFRyYW5zRGF0ZSxcclxuICAgICAgfSksXHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIERlbGV0ZXMgb25lIGV4cGVuc2UgbGluZSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9L2xpbmVzL3tsaW5lUmVjSWR9P2RlbGV0ZVdob2xlU2hlZXQ9ZmFsc2UuXHJcbmV4cG9ydCBjb25zdCBkZWxldGVFeHBlbnNlU2hlZXRMaW5lID0gYXN5bmMgKFxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcbiAgbGluZVJlY0lkOiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHNhZmVMaW5lSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGxpbmVSZWNJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+PihcclxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9L2xpbmVzLyR7c2FmZUxpbmVJZH0/ZGVsZXRlTW9kZT0wJmRlbGV0ZVdob2xlU2hlZXQ9ZmFsc2VgLFxyXG4gICAge1xyXG4gICAgICAuLi5vcHRpb25zLFxyXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXHJcbiAgICB9XHJcbiAgKTtcclxuXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XG59O1xuXG5jb25zdCBub3JtYWxpemVFeHBlbnNlU2hlZXRzQXNrUmVzcG9uc2UgPSAocmVzcG9uc2U6IEV4cGVuc2VTaGVldHNBc2tSZXN1bHQpOiBFeHBlbnNlU2hlZXRzQXNrUmVzdWx0ID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbiAgY29uc3QgcmF3RGF0YSA9IG5vcm1hbGl6ZWQ/LkRhdGE7XG4gIGlmICghcmF3RGF0YSB8fCB0eXBlb2YgcmF3RGF0YSAhPT0gXCJvYmplY3RcIikge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5ub3JtYWxpemVkLFxuICAgICAgTWVzc2FnZTogc2FuaXRpemVBc3Npc3RhbnRUZXh0KG5vcm1hbGl6ZWQ/Lk1lc3NhZ2UpLFxuICAgICAgSHR0cFN0YXR1czogdHlwZW9mIHJlc3BvbnNlPy5IdHRwU3RhdHVzID09PSBcIm51bWJlclwiID8gcmVzcG9uc2UuSHR0cFN0YXR1cyA6IHVuZGVmaW5lZCxcbiAgICAgIFJldHJ5QWZ0ZXI6IHNhZmVUZXh0KHJlc3BvbnNlPy5SZXRyeUFmdGVyKSB8fCBudWxsLFxuICAgIH07XG4gIH1cblxuICBjb25zdCByYXdXYXJuaW5ncyA9XG4gICAgKHJhd0RhdGEgYXMgeyBXYXJuaW5ncz86IHVua25vd247IHdhcm5pbmdzPzogdW5rbm93biB9KS5XYXJuaW5ncyA/P1xuICAgIChyYXdEYXRhIGFzIHsgd2FybmluZ3M/OiB1bmtub3duIH0pLndhcm5pbmdzO1xuICBjb25zdCByYXdGaWx0ZXJzQXBwbGllZCA9XG4gICAgKHJhd0RhdGEgYXMgeyBGaWx0ZXJzQXBwbGllZD86IHVua25vd247IGZpbHRlcnNBcHBsaWVkPzogdW5rbm93biB9KS5GaWx0ZXJzQXBwbGllZCA/P1xuICAgIChyYXdEYXRhIGFzIHsgZmlsdGVyc0FwcGxpZWQ/OiB1bmtub3duIH0pLmZpbHRlcnNBcHBsaWVkO1xuXG4gIGNvbnN0IGlzSWdub3JhYmxlQXNzaXN0YW50V2FybmluZyA9ICh3YXJuaW5nOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICBjb25zdCBub3JtYWxpemVkV2FybmluZyA9IHNhbml0aXplQXNzaXN0YW50VGV4dCh3YXJuaW5nKS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICghbm9ybWFsaXplZFdhcm5pbmcpIHJldHVybiB0cnVlO1xuXG4gICAgcmV0dXJuIG5vcm1hbGl6ZWRXYXJuaW5nLmluY2x1ZGVzKFwic291cmNlanNvblwiKSAmJlxuICAgICAgKG5vcm1hbGl6ZWRXYXJuaW5nLmluY2x1ZGVzKFwic2tpcHBlZFwiKSB8fCBub3JtYWxpemVkV2FybmluZy5pbmNsdWRlcyhcIm9taXRcIikpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgLi4ubm9ybWFsaXplZCxcbiAgICBNZXNzYWdlOiBzYW5pdGl6ZUFzc2lzdGFudFRleHQobm9ybWFsaXplZD8uTWVzc2FnZSksXG4gICAgSHR0cFN0YXR1czogdHlwZW9mIHJlc3BvbnNlPy5IdHRwU3RhdHVzID09PSBcIm51bWJlclwiID8gcmVzcG9uc2UuSHR0cFN0YXR1cyA6IHVuZGVmaW5lZCxcbiAgICBSZXRyeUFmdGVyOiBzYWZlVGV4dChyZXNwb25zZT8uUmV0cnlBZnRlcikgfHwgbnVsbCxcbiAgICBEYXRhOiB7XG4gICAgICBBbnN3ZXI6IHNhbml0aXplQXNzaXN0YW50VGV4dChcbiAgICAgICAgKHJhd0RhdGEgYXMgeyBBbnN3ZXI/OiB1bmtub3duOyBhbnN3ZXI/OiB1bmtub3duIH0pLkFuc3dlciA/PyAocmF3RGF0YSBhcyB7IGFuc3dlcj86IHVua25vd24gfSkuYW5zd2VyXG4gICAgICApLFxuICAgICAgTW9kZWw6IHNhbml0aXplQXNzaXN0YW50VGV4dChcbiAgICAgICAgKHJhd0RhdGEgYXMgeyBNb2RlbD86IHVua25vd247IG1vZGVsPzogdW5rbm93biB9KS5Nb2RlbCA/PyAocmF3RGF0YSBhcyB7IG1vZGVsPzogdW5rbm93biB9KS5tb2RlbFxuICAgICAgKSxcbiAgICAgIFNvdXJjZUtleTogc2FuaXRpemVBc3Npc3RhbnRUZXh0KFxuICAgICAgICAocmF3RGF0YSBhcyB7IFNvdXJjZUtleT86IHVua25vd247IHNvdXJjZUtleT86IHVua25vd24gfSkuU291cmNlS2V5ID8/XG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBzb3VyY2VLZXk/OiB1bmtub3duIH0pLnNvdXJjZUtleVxuICAgICAgKSxcbiAgICAgIEZpbHRlcnNBcHBsaWVkOlxuICAgICAgICByYXdGaWx0ZXJzQXBwbGllZCAmJiB0eXBlb2YgcmF3RmlsdGVyc0FwcGxpZWQgPT09IFwib2JqZWN0XCJcbiAgICAgICAgICA/IGNsb25lSnNvbkNvbXBhdGlibGVWYWx1ZShyYXdGaWx0ZXJzQXBwbGllZCBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPilcbiAgICAgICAgICA6IG51bGwsXG4gICAgICBUb3RhbFNvdXJjZVJlY29yZHM6XG4gICAgICAgIHRvTnVsbGFibGVOdW1iZXIoXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBUb3RhbFNvdXJjZVJlY29yZHM/OiB1bmtub3duOyB0b3RhbFNvdXJjZVJlY29yZHM/OiB1bmtub3duIH0pLlRvdGFsU291cmNlUmVjb3JkcyA/P1xuICAgICAgICAgICAgKHJhd0RhdGEgYXMgeyB0b3RhbFNvdXJjZVJlY29yZHM/OiB1bmtub3duIH0pLnRvdGFsU291cmNlUmVjb3Jkc1xuICAgICAgICApID8/IG51bGwsXG4gICAgICBSZWNvcmRzU2VudFRvTW9kZWw6XG4gICAgICAgIHRvTnVsbGFibGVOdW1iZXIoXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBSZWNvcmRzU2VudFRvTW9kZWw/OiB1bmtub3duOyByZWNvcmRzU2VudFRvTW9kZWw/OiB1bmtub3duIH0pLlJlY29yZHNTZW50VG9Nb2RlbCA/P1xuICAgICAgICAgICAgKHJhd0RhdGEgYXMgeyByZWNvcmRzU2VudFRvTW9kZWw/OiB1bmtub3duIH0pLnJlY29yZHNTZW50VG9Nb2RlbFxuICAgICAgICApID8/IG51bGwsXG4gICAgICBSZXRyaWV2YWxNb2RlOiBzYW5pdGl6ZUFzc2lzdGFudFRleHQoXG4gICAgICAgIChyYXdEYXRhIGFzIHsgUmV0cmlldmFsTW9kZT86IHVua25vd247IHJldHJpZXZhbE1vZGU/OiB1bmtub3duIH0pLlJldHJpZXZhbE1vZGUgPz9cbiAgICAgICAgICAocmF3RGF0YSBhcyB7IHJldHJpZXZhbE1vZGU/OiB1bmtub3duIH0pLnJldHJpZXZhbE1vZGVcbiAgICAgICkgfHwgbnVsbCxcbiAgICAgIFRydW5jYXRlZDogdG9OdWxsYWJsZUJvb2woXG4gICAgICAgIChyYXdEYXRhIGFzIHsgVHJ1bmNhdGVkPzogdW5rbm93bjsgdHJ1bmNhdGVkPzogdW5rbm93biB9KS5UcnVuY2F0ZWQgPz9cbiAgICAgICAgICAocmF3RGF0YSBhcyB7IHRydW5jYXRlZD86IHVua25vd24gfSkudHJ1bmNhdGVkXG4gICAgICApLFxuICAgICAgV2FybmluZ3M6IEFycmF5LmlzQXJyYXkocmF3V2FybmluZ3MpXG4gICAgICAgID8gcmF3V2FybmluZ3NcbiAgICAgICAgICAgIC5tYXAoKGVudHJ5KSA9PiBzYW5pdGl6ZUFzc2lzdGFudFRleHQoZW50cnkpKVxuICAgICAgICAgICAgLmZpbHRlcigoZW50cnkpID0+IGVudHJ5ICYmICFpc0lnbm9yYWJsZUFzc2lzdGFudFdhcm5pbmcoZW50cnkpKVxuICAgICAgICA6IFtdLFxuICAgIH0sXG4gIH07XG59O1xuXG4vLyBBc2tzIGJ1c2luZXNzIHF1ZXN0aW9ucyBhYm91dCB0aGUgY3VycmVudCBleHBlbnNlIHNoZWV0IGxpc3QgdXNpbmcgL2FwaS9pYS9zZXJ2aWNlL2V4cGVuc2VzaGVldHMvYXNrLlxuZXhwb3J0IGNvbnN0IGFza0V4cGVuc2VTaGVldHNRdWVzdGlvbiA9IGFzeW5jIChcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0c0Fza1JlcXVlc3QsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8RXhwZW5zZVNoZWV0c0Fza1Jlc3VsdD4gPT4ge1xuICBjb25zdCBxdWVzdGlvbiA9IHNhZmVUZXh0KHBheWxvYWQ/LnF1ZXN0aW9uKTtcbiAgaWYgKCFxdWVzdGlvbikge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwicXVlc3Rpb24gaXMgcmVxdWlyZWQuXCIpO1xuICB9XG5cbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBjc3JmVG9rZW4gPSBnZXRDc3JmVG9rZW4oKTtcbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpKTtcbiAgaWYgKGNzcmZUb2tlbikge1xuICAgIGhlYWRlcnMuUmVxdWVzdFZlcmlmaWNhdGlvblRva2VuID0gY3NyZlRva2VuO1xuICB9XG5cbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldHNBc2tSZXF1ZXN0ID0ge1xuICAgIHF1ZXN0aW9uLFxuICAgIGFuc3dlckluc3RydWN0aW9uczogc2FmZVRleHQocGF5bG9hZD8uYW5zd2VySW5zdHJ1Y3Rpb25zKSB8fCB1bmRlZmluZWQsXG4gICAgbGlzdFJlcXVlc3Q6IGNsb25lSnNvbkNvbXBhdGlibGVWYWx1ZShwYXlsb2FkLmxpc3RSZXF1ZXN0KSxcbiAgICBzb3VyY2VKc29uOlxuICAgICAgcGF5bG9hZD8uc291cmNlSnNvbiA9PT0gbnVsbCB8fCBwYXlsb2FkPy5zb3VyY2VKc29uID09PSB1bmRlZmluZWRcbiAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgOiBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUocGF5bG9hZC5zb3VyY2VKc29uKSxcbiAgfTtcblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9pYS9zZXJ2aWNlL2V4cGVuc2VzaGVldHMvYXNrXCIsIHtcbiAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxuICAgIC4uLm9wdGlvbnMsXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICBoZWFkZXJzLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcbiAgfSk7XG5cbiAgY29uc3QgcmF3ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICBjb25zdCByZXRyeUFmdGVyID0gc2FmZVRleHQocmVzcG9uc2UuaGVhZGVycy5nZXQoXCJSZXRyeS1BZnRlclwiKSk7XG5cbiAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgIGNvbnN0IHJlbG9naW5SZXN1bHQgPSBhd2FpdCBoYW5kbGVBcGlBdXRoRmFpbHVyZTxFeHBlbnNlU2hlZXRzQXNrUmVzdWx0PihyYXcsIHJlc3BvbnNlLnN0YXR1cywgXCJleHBlbnNlLXNoZWV0cy1hc2tcIik7XG4gICAgaWYgKHJlbG9naW5SZXN1bHQgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiByZWxvZ2luUmVzdWx0O1xuICAgIH1cblxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMykge1xuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IocmVhZEFwaU1lc3NhZ2VGcm9tUmF3KHJhdykgfHwgXCJQZXJtaXNzaW9uIGRlbmllZC5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBhcnNlZCA9IHRyeVBhcnNlSnNvbihyYXcpO1xuICBpZiAoIXBhcnNlZCB8fCB0eXBlb2YgcGFyc2VkICE9PSBcIm9iamVjdFwiKSB7XG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IocmVhZEFwaU1lc3NhZ2VGcm9tUmF3KHJhdykgfHwgXCJSZXF1ZXN0IGZhaWxlZC5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiSW52YWxpZCBzZXJ2ZXIgcmVzcG9uc2UuXCIsIHJlc3BvbnNlLnN0YXR1cywgcmF3KTtcbiAgfVxuXG4gIHJldHVybiBub3JtYWxpemVFeHBlbnNlU2hlZXRzQXNrUmVzcG9uc2Uoe1xuICAgIC4uLihwYXJzZWQgYXMgRXhwZW5zZVNoZWV0c0Fza1Jlc3VsdCksXG4gICAgSHR0cFN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgIFJldHJ5QWZ0ZXI6IHJldHJ5QWZ0ZXIgfHwgbnVsbCxcbiAgfSk7XG59O1xuXG4vLyBFeHRyYWN0cyBhbiBleHBlbnNlIGRyYWZ0IGZyb20gYSB0aWNrZXQgaW1hZ2UgdXNpbmcgL2FwaS9pYS9zZXJ2aWNlL2V4cGVuc2Vmcm9tdGlja2V0LlxuZXhwb3J0IGNvbnN0IGV4dHJhY3RFeHBlbnNlRnJvbVRpY2tldERyYWZ0ID0gYXN5bmMgKFxuICB0aWNrZXRJbWFnZTogRmlsZSB8IEJsb2IsXG4gIHBlcnNpc3RUaWNrZXQ/OiBib29sZWFuLFxyXG4gIHRpY2tldFVybEZpbGU/OiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldERyYWZ0UmVzcG9uc2U+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcclxuICBjb25zdCBzYWZlVGlja2V0VXJsID0gc2FmZVRleHQodGlja2V0VXJsRmlsZSk7XHJcblxyXG4gIGlmICh0aWNrZXRJbWFnZSBpbnN0YW5jZW9mIEZpbGUpIHtcclxuICAgIGZvcm0uYXBwZW5kKFwidGlja2V0SW1hZ2VcIiwgdGlja2V0SW1hZ2UsIHNhZmVUZXh0KHRpY2tldEltYWdlLm5hbWUpIHx8IFwidGlja2V0LmpwZ1wiKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZm9ybS5hcHBlbmQoXCJ0aWNrZXRJbWFnZVwiLCB0aWNrZXRJbWFnZSwgXCJ0aWNrZXQuanBnXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHR5cGVvZiBwZXJzaXN0VGlja2V0ID09PSBcImJvb2xlYW5cIikge1xyXG4gICAgZm9ybS5hcHBlbmQoXCJwZXJzaXN0VGlja2V0XCIsIHBlcnNpc3RUaWNrZXQgPyBcInRydWVcIiA6IFwiZmFsc2VcIik7XHJcbiAgfVxyXG5cclxuICBpZiAoc2FmZVRpY2tldFVybCkge1xyXG4gICAgZm9ybS5hcHBlbmQoXCJ0aWNrZXRVcmxGaWxlXCIsIHNhZmVUaWNrZXRVcmwpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0RHJhZnRSZXNwb25zZT4+KFwiL2FwaS9pYS9zZXJ2aWNlL2V4cGVuc2Vmcm9tdGlja2V0XCIsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlRm9ybUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXHJcbiAgICBib2R5OiBmb3JtLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gQ3JlYXRlcyBhbmQgZmluYWxpemVzIG9uZSB0aWNrZXQgZnJvbSBhIHNpbmdsZSBtdWx0aXBhcnQgdXBsb2FkIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9xdWljay1jcmVhdGUuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVFeHBlbnNlU2hlZXRUaWNrZXRRdWljayA9IGFzeW5jIChcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVzdWx0PiA9PiB7XHJcbiAgaWYgKCFwYXlsb2FkPy50aWNrZXRJbWFnZSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJ0aWNrZXRJbWFnZSBpcyByZXF1aXJlZC5cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCB7IHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiBfc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWwsIC4uLmZldGNoT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQoZmV0Y2hPcHRpb25zKTtcclxuICBjb25zdCBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgY29uc3Qgc2FmZUN1cnJlbmN5Q29kZSA9IHNhZmVUZXh0KHBheWxvYWQ/LmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBzYWZlRGVzY3JpcHRpb24gPSBzYWZlVGV4dChwYXlsb2FkPy5kZXNjcmlwdGlvbik7XHJcbiAgY29uc3Qgc2FmZUNvbWVudGFyaW8gPSBzYWZlVGV4dChwYXlsb2FkPy5jb21lbnRhcmlvKTtcclxuICBjb25zdCBzYWZlU2hlZXRJZCA9IHNhZmVUZXh0KHBheWxvYWQ/LmV4aXN0aW5nSG9qYUdhc3Rvc0lkKTtcclxuICBjb25zdCBzYWZlUHJvamVjdElkID0gc2FmZVRleHQocGF5bG9hZD8ucHJvamVjdElkKTtcclxuICBjb25zdCB0aWNrZXRJbWFnZSA9IHBheWxvYWQudGlja2V0SW1hZ2U7XHJcblxyXG4gIGlmICh0aWNrZXRJbWFnZSBpbnN0YW5jZW9mIEZpbGUpIHtcclxuICAgIGZvcm0uYXBwZW5kKFwidGlja2V0SW1hZ2VcIiwgdGlja2V0SW1hZ2UsIHNhZmVUZXh0KHRpY2tldEltYWdlLm5hbWUpIHx8IFwidGlja2V0LmpwZ1wiKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZm9ybS5hcHBlbmQoXCJ0aWNrZXRJbWFnZVwiLCB0aWNrZXRJbWFnZSwgXCJ0aWNrZXQuanBnXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHNhZmVDdXJyZW5jeUNvZGUpIHtcclxuICAgIGZvcm0uYXBwZW5kKFwiY3VycmVuY3lDb2RlXCIsIHNhZmVDdXJyZW5jeUNvZGUpO1xyXG4gIH1cclxuXHJcbiAgaWYgKFwiZGVzY3JpcHRpb25cIiBpbiBwYXlsb2FkKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcImRlc2NyaXB0aW9uXCIsIHNhZmVEZXNjcmlwdGlvbik7XHJcbiAgfVxyXG5cclxuICBpZiAoXCJjb21lbnRhcmlvXCIgaW4gcGF5bG9hZCkge1xyXG4gICAgZm9ybS5hcHBlbmQoXCJjb21lbnRhcmlvXCIsIHNhZmVDb21lbnRhcmlvKTtcclxuICB9XHJcblxyXG4gIGlmIChzYWZlU2hlZXRJZCkge1xyXG4gICAgZm9ybS5hcHBlbmQoXCJleGlzdGluZ0hvamFHYXN0b3NJZFwiLCBzYWZlU2hlZXRJZCk7XHJcbiAgfVxyXG5cclxuICBpZiAoc2FmZVNoZWV0SWQgJiYgc2FmZVByb2plY3RJZCkge1xyXG4gICAgZm9ybS5hcHBlbmQoXCJwcm9qZWN0SWRcIiwgc2FmZVByb2plY3RJZCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjc3JmVG9rZW4gPSBnZXRDc3JmVG9rZW4oKTtcclxuICBjb25zdCBoZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKGJ1aWxkRXhwZW5zZUZvcm1IZWFkZXJzKGNvbnRleHQsIGZldGNoT3B0aW9ucykpO1xyXG4gIGlmIChjc3JmVG9rZW4pIHtcclxuICAgIGhlYWRlcnMuUmVxdWVzdFZlcmlmaWNhdGlvblRva2VuID0gY3NyZlRva2VuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9xdWljay1jcmVhdGVcIiwge1xyXG4gICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcclxuICAgIC4uLmZldGNoT3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICBoZWFkZXJzLFxyXG4gICAgYm9keTogZm9ybSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgcmF3ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xyXG4gIGNvbnN0IHJldHJ5QWZ0ZXIgPSBzYWZlVGV4dChyZXNwb25zZS5oZWFkZXJzLmdldChcIlJldHJ5LUFmdGVyXCIpKTtcclxuXHJcbiAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgY29uc3QgcmVsb2dpblJlc3VsdCA9IGF3YWl0IGhhbmRsZUFwaUF1dGhGYWlsdXJlPEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVzdWx0PihcclxuICAgICAgcmF3LFxyXG4gICAgICByZXNwb25zZS5zdGF0dXMsXHJcbiAgICAgIFwidGlja2V0LXF1aWNrLWNyZWF0ZVwiXHJcbiAgICApO1xyXG4gICAgaWYgKHJlbG9naW5SZXN1bHQgIT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIHJlbG9naW5SZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKHJlYWRBcGlNZXNzYWdlRnJvbVJhdyhyYXcpIHx8IFwiUGVybWlzc2lvbiBkZW5pZWQuXCIsIHJlc3BvbnNlLnN0YXR1cywgcmF3KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlZCA9IHRyeVBhcnNlSnNvbihyYXcpO1xyXG4gIGlmICghcGFyc2VkIHx8IHR5cGVvZiBwYXJzZWQgIT09IFwib2JqZWN0XCIpIHtcclxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IocmVhZEFwaU1lc3NhZ2VGcm9tUmF3KHJhdykgfHwgXCJSZXF1ZXN0IGZhaWxlZC5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xyXG4gICAgfVxyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJJbnZhbGlkIHNlcnZlciByZXNwb25zZS5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZVRpY2tldFF1aWNrQ3JlYXRlUmVzcG9uc2Uoe1xyXG4gICAgLi4uKHBhcnNlZCBhcyBFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlc3VsdCksXHJcbiAgICBIdHRwU3RhdHVzOiByZXNwb25zZS5zdGF0dXMsXHJcbiAgICBSZXRyeUFmdGVyOiByZXRyeUFmdGVyIHx8IG51bGwsXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyBDcmVhdGVzIGEgdGlja2V0IGhlYWRlci9saW5lcyB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVFeHBlbnNlU2hlZXRUaWNrZXQgPSBhc3luYyAoXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0Q3JlYXRlUmVxdWVzdCxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBtb2RlID0gTnVtYmVyKHBheWxvYWQ/Lm1vZGUpO1xyXG4gIGNvbnN0IHJhd1RyYW5zRGF0ZSA9IHNhZmVUZXh0KHBheWxvYWQ/LnRyYW5zRGF0ZSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFRyYW5zRGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdUcmFuc0RhdGUpO1xyXG5cclxuICBpZiAocmF3VHJhbnNEYXRlICYmICFub3JtYWxpemVkVHJhbnNEYXRlKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICB9XHJcblxyXG4gIGlmICgobW9kZSA9PT0gMCB8fCBtb2RlID09PSAxKSAmJiAhbm9ybWFsaXplZFRyYW5zRGF0ZSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzYWZlUGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0Q3JlYXRlUmVxdWVzdCA9IHtcclxuICAgIC4uLnBheWxvYWQsXHJcbiAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZWRUcmFuc0RhdGUgfHwgdW5kZWZpbmVkLFxyXG4gICAgZ2FzdG9UeXBlOiBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZShwYXlsb2FkPy5nYXN0b1R5cGUpLFxyXG4gIH07XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4oXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHNcIiwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVGlja2V0RmlsdGVyQ3JpdGVyaWFQYXlsb2FkID0gPFxyXG4gIFQgZXh0ZW5kcyB7XHJcbiAgICBjcmVhdGVkRGF0ZUZyb20/OiBzdHJpbmc7XHJcbiAgICBjcmVhdGVkRGF0ZVRvPzogc3RyaW5nO1xyXG4gICAgc2VhcmNoS2V5Pzogc3RyaW5nO1xyXG4gICAgZmlsdGVyPzogc3RyaW5nO1xyXG4gICAgY3VycmVuY3lDb2RlPzogc3RyaW5nO1xyXG4gICAgZ2FzdG9UeXBlPzogdW5rbm93bjtcclxuICAgIHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duO1xyXG4gIH0sXHJcbj4oXHJcbiAgcGF5bG9hZDogVFxyXG4pID0+IHtcclxuICBjb25zdCByYXdDcmVhdGVkRGF0ZUZyb20gPSBzYWZlVGV4dChwYXlsb2FkPy5jcmVhdGVkRGF0ZUZyb20pO1xyXG4gIGNvbnN0IHJhd0NyZWF0ZWREYXRlVG8gPSBzYWZlVGV4dChwYXlsb2FkPy5jcmVhdGVkRGF0ZVRvKTtcclxuICBjb25zdCBjcmVhdGVkRGF0ZUZyb20gPSBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZShyYXdDcmVhdGVkRGF0ZUZyb20pO1xyXG4gIGNvbnN0IGNyZWF0ZWREYXRlVG8gPSBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZShyYXdDcmVhdGVkRGF0ZVRvKTtcclxuICBpZiAocmF3Q3JlYXRlZERhdGVGcm9tICYmICFjcmVhdGVkRGF0ZUZyb20pIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xyXG4gIH1cclxuICBpZiAocmF3Q3JlYXRlZERhdGVUbyAmJiAhY3JlYXRlZERhdGVUbykge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwcmVmZXJyZWRTZWFyY2hLZXkgPSBzYWZlVGV4dChwYXlsb2FkPy5zZWFyY2hLZXkgfHwgcGF5bG9hZD8uZmlsdGVyKTtcclxuICBjb25zdCBsZWdhY3lGaWx0ZXIgPSBzYWZlVGV4dChwYXlsb2FkPy5maWx0ZXIgfHwgcHJlZmVycmVkU2VhcmNoS2V5KTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGNyZWF0ZWREYXRlRnJvbTogY3JlYXRlZERhdGVGcm9tIHx8IHVuZGVmaW5lZCxcclxuICAgIGNyZWF0ZWREYXRlVG86IGNyZWF0ZWREYXRlVG8gfHwgdW5kZWZpbmVkLFxyXG4gICAgc2VhcmNoS2V5OiBwcmVmZXJyZWRTZWFyY2hLZXkgfHwgdW5kZWZpbmVkLFxyXG4gICAgZmlsdGVyOiBsZWdhY3lGaWx0ZXIgfHwgdW5kZWZpbmVkLFxyXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChwYXlsb2FkPy5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCkgfHwgdW5kZWZpbmVkLFxyXG4gICAgZ2FzdG9UeXBlOiBub3JtYWxpemVUaWNrZXRMaXN0R2FzdG9UeXBlKHBheWxvYWQ/Lmdhc3RvVHlwZSksXHJcbiAgICBwcm9jZXNzZWRCeUFJOiBub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUkocGF5bG9hZD8ucHJvY2Vzc2VkQnlBSSksXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpc3RGaWx0ZXJQYXlsb2FkID0gPFxyXG4gIFQgZXh0ZW5kcyB7XHJcbiAgICBwYWdlPzogbnVtYmVyO1xyXG4gICAgcGFnZVNpemU/OiBudW1iZXI7XHJcbiAgICBjcmVhdGVkRGF0ZUZyb20/OiBzdHJpbmc7XHJcbiAgICBjcmVhdGVkRGF0ZVRvPzogc3RyaW5nO1xyXG4gICAgc2VhcmNoS2V5Pzogc3RyaW5nO1xyXG4gICAgZmlsdGVyPzogc3RyaW5nO1xyXG4gICAgY3VycmVuY3lDb2RlPzogc3RyaW5nO1xyXG4gICAgZ2FzdG9UeXBlPzogdW5rbm93bjtcclxuICAgIHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duO1xyXG4gIH0sXHJcbj4oXHJcbiAgcGF5bG9hZDogVFxyXG4pID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgcGFnZTogTnVtYmVyLmlzRmluaXRlKHBheWxvYWQ/LnBhZ2UpICYmIE51bWJlcihwYXlsb2FkLnBhZ2UpID4gMCA/IE1hdGguZmxvb3IoTnVtYmVyKHBheWxvYWQucGFnZSkpIDogMSxcclxuICAgIHBhZ2VTaXplOiBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZD8ucGFnZVNpemUpICYmIE51bWJlcihwYXlsb2FkLnBhZ2VTaXplKSA+IDAgPyBNYXRoLmZsb29yKE51bWJlcihwYXlsb2FkLnBhZ2VTaXplKSkgOiA1MCxcclxuICAgIC4uLm5vcm1hbGl6ZVRpY2tldEZpbHRlckNyaXRlcmlhUGF5bG9hZChwYXlsb2FkKSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gTG9hZHMgdGlja2V0IGxpc3QgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL2xpc3QuXHJcbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0ID0gYXN5bmMgKFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBFeHBlbnNlVGlja2V0TGlzdEZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8+PiA9PiB7XHJcbiAgY29uc3QgeyBheFVzZXJJZE92ZXJyaWRlLCAuLi5iYXNlT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQoYmFzZU9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCA9IHtcclxuICAgIC4uLm5vcm1hbGl6ZVRpY2tldExpc3RGaWx0ZXJQYXlsb2FkKHBheWxvYWQpLFxyXG4gICAgc3RhdHVzOiBub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1cyhwYXlsb2FkPy5zdGF0dXMpLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8+PihcclxuICAgIFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL2xpc3RcIixcclxuICAgIHtcclxuICAgICAgLi4uYmFzZU9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkVGlja2V0TGlzdEhlYWRlcnMoY29udGV4dCwgYmFzZU9wdGlvbnMsIGF4VXNlcklkT3ZlcnJpZGUpLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIExvYWRzIGxpbmstbW9kZSB0aWNrZXQgbGlzdCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGluay9saXN0LlxyXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdCA9IGFzeW5jIChcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdFJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEV4cGVuc2VUaWNrZXRMaXN0RmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdEl0ZW1EdG8+PiA9PiB7XHJcbiAgY29uc3QgeyBheFVzZXJJZE92ZXJyaWRlLCAuLi5iYXNlT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQoYmFzZU9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdFJlcXVlc3QgPSB7XHJcbiAgICAuLi5ub3JtYWxpemVUaWNrZXRMaXN0RmlsdGVyUGF5bG9hZChwYXlsb2FkKSxcclxuICB9O1xyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0bz4+KFxyXG4gICAgXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGluay9saXN0XCIsXHJcbiAgICB7XHJcbiAgICAgIC4uLmJhc2VPcHRpb25zLFxyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBoZWFkZXJzOiBidWlsZFRpY2tldExpc3RIZWFkZXJzKGNvbnRleHQsIGJhc2VPcHRpb25zLCBheFVzZXJJZE92ZXJyaWRlKSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVUaWNrZXRMaW5rTGlzdFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gTGlua3Mgc2VsZWN0ZWQgb3IgZmlsdGVyZWQgdGlja2V0cyB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGluay9idWxrLlxyXG5leHBvcnQgY29uc3QgbGlua0V4cGVuc2VTaGVldFRpY2tldHNCdWxrID0gYXN5bmMgKFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVxdWVzdCxcclxuICBvcHRpb25zPzogRXhwZW5zZVRpY2tldExpc3RGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0bz4+ID0+IHtcclxuICBjb25zdCB7IGF4VXNlcklkT3ZlcnJpZGUsIC4uLmJhc2VPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChiYXNlT3B0aW9ucyk7XHJcbiAgY29uc3Qgc2VsZWN0aW9uTW9kZSA9IHBheWxvYWQ/LnNlbGVjdGlvbk1vZGUgPT09IFwiZmlsdGVyZWRcIiA/IFwiZmlsdGVyZWRcIiA6IFwic2VsZWN0ZWRcIjtcclxuICBjb25zdCB0aWNrZXRJZHMgPSBBcnJheS5pc0FycmF5KHBheWxvYWQ/LnRpY2tldElkcylcclxuICAgID8gcGF5bG9hZC50aWNrZXRJZHMubWFwKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnkpKS5maWx0ZXIoQm9vbGVhbilcclxuICAgIDogW107XHJcbiAgY29uc3QgZXhjbHVkZWRJZHMgPSBBcnJheS5pc0FycmF5KHBheWxvYWQ/LmV4Y2x1ZGVkSWRzKVxyXG4gICAgPyBwYXlsb2FkLmV4Y2x1ZGVkSWRzLm1hcCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5KSkuZmlsdGVyKEJvb2xlYW4pXHJcbiAgICA6IFtdO1xyXG5cclxuICBjb25zdCBzYWZlUGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXF1ZXN0ID0ge1xyXG4gICAgZXhwZW5zZVNoZWV0SWQ6IHNhZmVUZXh0KHBheWxvYWQ/LmV4cGVuc2VTaGVldElkKSxcclxuICAgIHNlbGVjdGlvbk1vZGUsXHJcbiAgICB0aWNrZXRJZHM6IHNlbGVjdGlvbk1vZGUgPT09IFwic2VsZWN0ZWRcIiA/IHRpY2tldElkcyA6IHVuZGVmaW5lZCxcclxuICAgIGZpbHRlcnM6XHJcbiAgICAgIHNlbGVjdGlvbk1vZGUgPT09IFwiZmlsdGVyZWRcIiAmJiBwYXlsb2FkPy5maWx0ZXJzXHJcbiAgICAgICAgPyB7XHJcbiAgICAgICAgICAgIC4uLm5vcm1hbGl6ZVRpY2tldEZpbHRlckNyaXRlcmlhUGF5bG9hZChwYXlsb2FkLmZpbHRlcnMpLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIDogdW5kZWZpbmVkLFxyXG4gICAgZXhjbHVkZWRJZHM6IHNlbGVjdGlvbk1vZGUgPT09IFwiZmlsdGVyZWRcIiA/IGV4Y2x1ZGVkSWRzIDogdW5kZWZpbmVkLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvPj4oXHJcbiAgICBcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saW5rL2J1bGtcIixcclxuICAgIHtcclxuICAgICAgLi4uYmFzZU9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkVGlja2V0TGlzdEhlYWRlcnMoY29udGV4dCwgYmFzZU9wdGlvbnMsIGF4VXNlcklkT3ZlcnJpZGUpLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZVRpY2tldExpbmtCdWxrUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gTG9hZHMgb25lIHRpY2tldCBkZXRhaWwgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9LlxyXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXQgPSBhc3luYyAoXHJcbiAgZmlsZUlkOiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldERldGFpbER0bz4+KFxyXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9YCxcclxuICAgIHtcclxuICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIERvd25sb2FkcyBvbmUgdGlja2V0IGltYWdlIHByZXZpZXcgYmxvYiB0aHJvdWdoIHRoZSBpbnRlcm5hbCBwcm94eSBlbmRwb2ludC5cclxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0UHJldmlld0Jsb2IgPSBhc3luYyAoXHJcbiAgZmlsZUlkOiBzdHJpbmcsXHJcbiAgdXJsRmlsZTogc3RyaW5nLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxCbG9iPiA9PiB7XHJcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IHNhZmVUZXh0KGZpbGVJZCk7XHJcbiAgY29uc3Qgc2FmZVVybEZpbGUgPSBzYWZlVGV4dCh1cmxGaWxlKTtcclxuICBpZiAoIXNhZmVGaWxlSWQgfHwgIXNhZmVVcmxGaWxlKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIk1pc3NpbmcgdGlja2V0IHByZXZpZXcgcGF5bG9hZC5cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCB7IHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiBfc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWwsIC4uLmZldGNoT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3QgY3NyZlRva2VuID0gZ2V0Q3NyZlRva2VuKCk7XHJcbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIGZldGNoT3B0aW9ucywgdHJ1ZSkpO1xyXG4gIGhlYWRlcnMuQWNjZXB0ID0gXCJpbWFnZS8qXCI7XHJcbiAgY29uc3QgcmVxdWVzdEhlYWRlcnM6IEhlYWRlcnNJbml0ID0ge1xyXG4gICAgQWNjZXB0OiBcImltYWdlLypcIixcclxuICAgIC4uLmhlYWRlcnMsXHJcbiAgfTtcclxuXHJcbiAgaWYgKGNzcmZUb2tlbikge1xyXG4gICAgKHJlcXVlc3RIZWFkZXJzIGFzIFJlY29yZDxzdHJpbmcsIHN0cmluZz4pW1wiUmVxdWVzdFZlcmlmaWNhdGlvblRva2VuXCJdID0gY3NyZlRva2VuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9wcmV2aWV3XCIsIHtcclxuICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXHJcbiAgICAuLi5mZXRjaE9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgaGVhZGVyczogcmVxdWVzdEhlYWRlcnMsXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgIGZpbGVJZDogc2FmZUZpbGVJZCxcclxuICAgICAgdXJsRmlsZTogc2FmZVVybEZpbGUsXHJcbiAgICB9KSxcclxuICB9KTtcclxuXHJcbiAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgY29uc3QgcmF3ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xyXG4gICAgY29uc3QgcmVsb2dpblJlc3VsdCA9IGF3YWl0IGhhbmRsZUFwaUF1dGhGYWlsdXJlPEJsb2I+KHJhdywgcmVzcG9uc2Uuc3RhdHVzLCBcInRpY2tldC1wcmV2aWV3XCIpO1xyXG4gICAgaWYgKHJlbG9naW5SZXN1bHQgIT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIHJlbG9naW5SZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBjb25zdCBtZXNzYWdlID0gcmVhZEFwaU1lc3NhZ2VGcm9tUmF3KHJhdyk7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihtZXNzYWdlIHx8IFwiQ291bGQgbm90IGxvYWQgdGlja2V0IHByZXZpZXcuXCIsIHJlc3BvbnNlLnN0YXR1cywgcmF3KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGJsb2IgPSBhd2FpdCByZXNwb25zZS5ibG9iKCk7XHJcbiAgaWYgKCFibG9iIHx8IGJsb2Iuc2l6ZSA9PT0gMCkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJDb3VsZCBub3QgbG9hZCB0aWNrZXQgcHJldmlldy5cIik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYmxvYjtcclxufTtcclxuXHJcbi8vIFVwZGF0ZXMgdGlja2V0IGhlYWRlciBtZXRhZGF0YSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0uXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVFeHBlbnNlU2hlZXRUaWNrZXQgPSBhc3luYyAoXHJcbiAgZmlsZUlkOiBzdHJpbmcsXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdCxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCByYXdUcmFuc0RhdGUgPSBzYWZlVGV4dChwYXlsb2FkPy50cmFuc0RhdGUpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc0RhdGUgPSBub3JtYWxpemVPcHRpb25hbEFwaURhdGUocmF3VHJhbnNEYXRlKTtcclxuXHJcbiAgaWYgKHJhd1RyYW5zRGF0ZSAmJiAhbm9ybWFsaXplZFRyYW5zRGF0ZSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzYWZlUGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdCA9IHtcclxuICAgIC4uLnBheWxvYWQsXHJcbiAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZWRUcmFuc0RhdGUgfHwgdW5kZWZpbmVkLFxyXG4gICAgZ2FzdG9UeXBlOiBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZShwYXlsb2FkPy5nYXN0b1R5cGUpLFxyXG4gIH07XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9YCwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBEZWxldGVzIG9uZSB0aWNrZXQgb3Igb25lIHRpY2tldCBsaW5lIHZpYSBxdWVyeSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0uXHJcbmV4cG9ydCBjb25zdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXQgPSBhc3luYyAoXHJcbiAgZmlsZUlkOiBzdHJpbmcsXHJcbiAgbGluZVJlY0lkPzogbnVtYmVyLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxudWxsPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcclxuICBpZiAoTnVtYmVyLmlzSW50ZWdlcihOdW1iZXIobGluZVJlY0lkKSkgJiYgTnVtYmVyKGxpbmVSZWNJZCkgPiAwKSB7XHJcbiAgICBxdWVyeS5zZXQoXCJsaW5lUmVjSWRcIiwgU3RyaW5nKGxpbmVSZWNJZCkpO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgc3VmZml4ID0gcXVlcnkudG9TdHJpbmcoKTtcclxuICBjb25zdCB1cmwgPSBzdWZmaXhcclxuICAgID8gYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9PyR7c3VmZml4fWBcclxuICAgIDogYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9YDtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxudWxsPj4odXJsLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIkRFTEVURVwiLFxyXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIEFwcGxpZXMgSUEgcGF5bG9hZCBvdmVyIGFuIGV4aXN0aW5nIHRpY2tldCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vaWEuXHJcbmV4cG9ydCBjb25zdCBhcHBseUV4cGVuc2VTaGVldFRpY2tldElhID0gYXN5bmMgKFxyXG4gIGZpbGVJZDogc3RyaW5nLFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCByYXdQYXlsb2FkID0gKHBheWxvYWQgfHwge30pIGFzIEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdDtcclxuICBjb25zdCBzYWZlUGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0ID0ge1xyXG4gICAgLi4ucmF3UGF5bG9hZCxcclxuICB9O1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc0RhdGUgPSBub3JtYWxpemVPcHRpb25hbEFwaURhdGUocmF3UGF5bG9hZC50cmFuc0RhdGUpO1xyXG4gIGlmICghbm9ybWFsaXplZFRyYW5zRGF0ZSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgfVxyXG4gIHNhZmVQYXlsb2FkLnRyYW5zRGF0ZSA9IG5vcm1hbGl6ZWRUcmFuc0RhdGU7XHJcblxyXG4gIGNvbnN0IGdhc3RvVHlwZSA9IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlKHJhd1BheWxvYWQuZ2FzdG9UeXBlKTtcclxuICBpZiAoZ2FzdG9UeXBlID09PSB1bmRlZmluZWQpIHtcclxuICAgIGRlbGV0ZSBzYWZlUGF5bG9hZC5nYXN0b1R5cGU7XHJcbiAgfSBlbHNlIHtcclxuICAgIHNhZmVQYXlsb2FkLmdhc3RvVHlwZSA9IGdhc3RvVHlwZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9pYWAsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIENyZWF0ZXMgb25lIHRpY2tldCBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9saW5lcy5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUV4cGVuc2VTaGVldFRpY2tldExpbmUgPSBhc3luYyAoXHJcbiAgZmlsZUlkOiBzdHJpbmcsXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGluZVJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcclxuICBpZiAoIXNhZmVUZXh0KHBheWxvYWQ/LmRlc2NyaXB0aW9uKSB8fCAhaXNQb3NpdGl2ZU51bWJlcihwYXlsb2FkPy5xdHkpIHx8ICFpc1Bvc2l0aXZlTnVtYmVyKHBheWxvYWQ/LnByaWNlKSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJkZXNjcmlwdGlvbiwgcXR5ID4gMCBhbmQgcHJpY2UgPiAwIGFyZSByZXF1aXJlZC5cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2xpbmVzYCwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBVcGRhdGVzIG9uZSB0aWNrZXQgbGluZSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vbGluZXMve2xpbmVSZWNJZH0uXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVFeHBlbnNlU2hlZXRUaWNrZXRMaW5lID0gYXN5bmMgKFxyXG4gIGZpbGVJZDogc3RyaW5nLFxyXG4gIGxpbmVSZWNJZDogc3RyaW5nIHwgbnVtYmVyLFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XHJcbiAgaWYgKCFzYWZlVGV4dChwYXlsb2FkPy5kZXNjcmlwdGlvbikgfHwgIWlzUG9zaXRpdmVOdW1iZXIocGF5bG9hZD8ucXR5KSB8fCAhaXNQb3NpdGl2ZU51bWJlcihwYXlsb2FkPy5wcmljZSkpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZGVzY3JpcHRpb24sIHF0eSA+IDAgYW5kIHByaWNlID4gMCBhcmUgcmVxdWlyZWQuXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHNhZmVMaW5lSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGxpbmVSZWNJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+KFxyXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2xpbmVzLyR7c2FmZUxpbmVJZH1gLFxyXG4gICAge1xyXG4gICAgICAuLi5vcHRpb25zLFxyXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBEZWxldGVzIG9uZSB0aWNrZXQgbGluZSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vbGluZXMve2xpbmVSZWNJZH0uXHJcbmV4cG9ydCBjb25zdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRMaW5lID0gYXN5bmMgKFxyXG4gIGZpbGVJZDogc3RyaW5nLFxyXG4gIGxpbmVSZWNJZDogc3RyaW5nIHwgbnVtYmVyLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxudWxsPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCBzYWZlTGluZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhsaW5lUmVjSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxudWxsPj4oXHJcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vbGluZXMvJHtzYWZlTGluZUlkfWAsXHJcbiAgICB7XHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gVXBsb2Fkcy9yZXBsYWNlcyB0aWNrZXQgZmlsZSBjb250ZW50IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9maWxlLlxyXG5leHBvcnQgY29uc3QgdXBsb2FkRXhwZW5zZVNoZWV0VGlja2V0RmlsZSA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICBmaWxlOiBGaWxlIHwgQmxvYixcclxuICBleHRlbnNpb24/OiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3Qgc2FmZUV4dGVuc2lvbiA9IHNhZmVUZXh0KGV4dGVuc2lvbikucmVwbGFjZSgvXlxcLi8sIFwiXCIpO1xyXG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xyXG4gIGlmIChzYWZlRXh0ZW5zaW9uKSB7XHJcbiAgICBxdWVyeS5zZXQoXCJleHRlbnNpb25cIiwgc2FmZUV4dGVuc2lvbik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzdWZmaXggPSBxdWVyeS50b1N0cmluZygpO1xyXG4gIGNvbnN0IHVybCA9IHN1ZmZpeFxyXG4gICAgPyBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vZmlsZT8ke3N1ZmZpeH1gXHJcbiAgICA6IGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9maWxlYDtcclxuICBjb25zdCBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgaWYgKGZpbGUgaW5zdGFuY2VvZiBGaWxlKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcImZpbGVcIiwgZmlsZSwgc2FmZVRleHQoZmlsZS5uYW1lKSB8fCBgdGlja2V0LiR7c2FmZUV4dGVuc2lvbiB8fCBcImpwZ1wifWApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBmb3JtLmFwcGVuZChcImZpbGVcIiwgZmlsZSwgYHRpY2tldC4ke3NhZmVFeHRlbnNpb24gfHwgXCJqcGdcIn1gKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+KHVybCwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VGb3JtSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICAgIGJvZHk6IGZvcm0sXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBEZWxldGVzIHRpY2tldCBmaWxlIGNvbnRlbnQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9L2ZpbGUuXHJcbmV4cG9ydCBjb25zdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRGaWxlID0gYXN5bmMgKFxyXG4gIGZpbGVJZDogc3RyaW5nLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxudWxsPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxudWxsPj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2ZpbGVgLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIkRFTEVURVwiLFxyXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIFNlYXJjaGVzIHByb2plY3RzIGZvciBkcm9wZG93biB1c2FnZSBpbiBmaWx0ZXJzIGFuZCBlZGl0IGZvcm1zLlxyXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlUHJvamVjdHMgPSBhc3luYyAoXHJcbiAgdGVybTogc3RyaW5nLFxyXG4gIHBhZ2U6IG51bWJlcixcclxuICBwYWdlU2l6ZTogbnVtYmVyLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxQcm9qZWN0RHJvcGRvd25SZXNwb25zZT4gPT4ge1xyXG4gIGNvbnN0IHNhZmVUZXJtID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyh0ZXJtIHx8IFwiXCIpKTtcclxuICBjb25zdCBzYWZlUGFnZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlKSAmJiBwYWdlID4gMCA/IE1hdGguZmxvb3IocGFnZSkgOiAxO1xyXG4gIGNvbnN0IHNhZmVQYWdlU2l6ZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlU2l6ZSkgJiYgcGFnZVNpemUgPiAwID8gTWF0aC5mbG9vcihwYWdlU2l6ZSkgOiAyMDtcclxuXHJcbiAgcmV0dXJuIGZldGNoSnNvbjxQcm9qZWN0RHJvcGRvd25SZXNwb25zZT4oXHJcbiAgICBgL0dhc3Rvcy9HZXRQcm9qZWN0c0ZvckRyb3Bkb3duP3Rlcm09JHtzYWZlVGVybX0mcGFnZT0ke3NhZmVQYWdlfSZwYWdlU2l6ZT0ke3NhZmVQYWdlU2l6ZX1gLFxyXG4gICAge1xyXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAg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QUU7QUFBQSxFQUM5RDtBQUVBLFFBQU0sV0FBVyxNQUFNLFVBQWtDLEtBQUs7QUFBQSxJQUM1RCxHQUFHO0FBQUEsSUFDSCxRQUFRO0FBQUEsSUFDUixTQUFTLHdCQUF3QixTQUFTLE9BQU87QUFBQSxJQUNqRCxNQUFNO0FBQUEsRUFDUixDQUFDO0FBRUQsU0FBT0csc0JBQXFCLFFBQVE7QUFDdEM7QUFHTyxJQUFNLCtCQUErQixPQUMxQyxRQUNBLFlBQ2tDO0FBQ2xDLFFBQU0sVUFBVSxNQUFNLHdCQUF3QixPQUFPO0FBQ3JELFFBQU0sYUFBYSxtQkFBbUIsT0FBTyxVQUFVLEVBQUUsRUFBRSxLQUFLLENBQUM7QUFDakUsUUFBTSxXQUFXLE1BQU0sVUFBZ0Msa0NBQWtDLFVBQVUsU0FBUztBQUFBLElBQzFHLEdBQUc7QUFBQSxJQUNILFFBQVE7QUFBQSxJQUNSLFNBQVMsb0JBQW9CLFNBQVMsT0FBTztBQUFBLEVBQy9DLENBQUM7QUFFRCxTQUFPQSxzQkFBcUIsUUFBUTtBQUN0QztBQUdPLElBQU0sdUJBQXVCLE9BQ2xDLE1BQ0EsTUFDQSxVQUNBLFlBQ3FDO0FBQ3JDLFFBQU0sV0FBVyxtQkFBbUIsT0FBTyxRQUFRLEVBQUUsQ0FBQztBQUN0RCxRQUFNLFdBQVcsT0FBTyxTQUFTLElBQUksS0FBSyxPQUFPLElBQUksS0FBSyxNQUFNLElBQUksSUFBSTtBQUN4RSxRQUFNLGVBQWUsT0FBTyxTQUFTLFFBQVEsS0FBSyxXQUFXLElBQUksS0FBSyxNQUFNLFFBQVEsSUFBSTtBQUV4RixTQUFPO0FBQUEsSUFDTCx1Q0FBdUMsUUFBUSxTQUFTLFFBQVEsYUFBYSxZQUFZO0FBQUEsSUFDekY7QUFBQSxNQUNFLFFBQVE7QUFBQSxNQUNSLEdBQUc7QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogWyJzYWZlVGV4dCIsICJzYWZlVGV4dCIsICJ0b051bGxhYmxlTnVtYmVyIiwgImlzTm9uTmVnYXRpdmVOdW1iZXIiLCAiaXNQb3NpdGl2ZU51bWJlciIsICJub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZSIsICJub3JtYWxpemVUaWNrZXRMaXN0R2FzdG9UeXBlIiwgIm5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzIiwgIm5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZSIsICJub3JtYWxpemVSZXF1aXJlZEFwaURhdGUiLCAibm9ybWFsaXplVGlja2V0TGlzdERhdGUiLCAidG9OdWxsYWJsZUJvb2wiLCAibm9ybWFsaXplT3B0aW9uYWxUaWNrZXRQcm9jZXNzZWRCeUFJIiwgIm5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXIiLCAidG9GbGFnQm9vbCIsICJyZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUiLCAic2FmZVRleHQiLCAibm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVBcGlSZXNwb25zZSIsICJub3JtYWxpemVUaWNrZXRRdWlja0NyZWF0ZVJlc3BvbnNlIiwgIm5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlIiwgIm5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlIiwgIm5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlIiwgIm5vcm1hbGl6ZVRpY2tldExpbmtCdWxrUmVzcG9uc2UiLCAidG9OdWxsYWJsZU51bWJlciIsICJtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZCIsICJtYXBFeHBlbnNlU2hlZXRIZWFkZXIiLCAibWFwRXhwZW5zZVNoZWV0TGluZSIsICJpc1Bvc2l0aXZlTnVtYmVyIiwgImlzTm9uTmVnYXRpdmVOdW1iZXIiXQp9Cg==
