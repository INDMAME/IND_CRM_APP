import {
  EXPENSE_API_DATE_FORMAT_MESSAGE,
  getExpenseActingUserOverride,
  getExpenseGastoTypeOptions,
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
} from "./chunk-HGU6IHIX.js";
import {
  resolveEffectiveCompanyId
} from "./chunk-DY2B5JHI.js";
import {
  ApiFetchError,
  fetchJson,
  getCsrfToken,
  handleApiAuthFailure,
  indT,
  readApiMessageFromRaw
} from "./chunk-63VW7TTG.js";

// Web/wwwroot/react/src/pages/gastos/utils/expenseApiResponseNormalizers.ts
var getPagedItems = (response) => {
  const raw = response || {};
  if (Array.isArray(raw.Items)) return raw.Items;
  if (Array.isArray(raw.items)) return raw.items;
  return [];
};
var normalizeListPagedResponse = (response) => {
  const items = getPagedItems(response);
  const normalizedItems = items.map((item) => ({
    ...item,
    ReimbursableExpense: toNullableNumber(item?.ReimbursableExpense ?? item?.reimbursableExpense),
    OwnerAxUserId: safeText(item?.OwnerAxUserId ?? item?.ownerAxUserId) || null,
    OwnerName: safeText(item?.OwnerName ?? item?.ownerName) || null
  }));
  return {
    ...response,
    Items: normalizedItems
  };
};
var normalizeDetailPagedResponse = (response) => {
  const items = getPagedItems(response);
  const normalizedItems = items.map((item) => {
    const rawLines = Array.isArray(item?.Lines) ? item.Lines : Array.isArray(item?.lines) ? item.lines : [];
    return {
      ...item,
      HojaGastosId: safeText(item?.HojaGastosId ?? item?.hojaGastosId),
      UserId: safeText(item?.UserId ?? item?.userId),
      UserName: safeText(item?.UserName ?? item?.userName) || null,
      OwnerAxUserId: safeText(item?.OwnerAxUserId ?? item?.ownerAxUserId),
      OwnerName: safeText(item?.OwnerName ?? item?.ownerName) || null,
      ReimbursableExpense: toNullableNumber(item?.ReimbursableExpense ?? item?.reimbursableExpense),
      ProjId: safeText(item?.ProjId ?? item?.projId),
      Lines: rawLines.map((line) => ({
        ...line,
        RecId: safeText(line?.RecId ?? line?.recId),
        LineRecId: safeText(line?.LineRecId ?? line?.lineRecId),
        ProjId: safeText(line?.ProjId ?? line?.projId),
        ReimbursableExpense: toNullableNumber(line?.ReimbursableExpense ?? line?.reimbursableExpense),
        CurrencyCode: safeText(line?.CurrencyCode ?? line?.currencyCode),
        AmountMST: toNullableNumber(line?.AmountMST ?? line?.amountMST),
        ExchRate: toNullableNumber(line?.ExchRate ?? line?.exchRate)
      }))
    };
  });
  return {
    ...response,
    Items: normalizedItems
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
    Items: getPagedItems(response)
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
    ),
    OwnerAxUserId: safeText(
      item?.OwnerAxUserId ?? item?.ownerAxUserId
    ),
    OwnerName: safeText(
      item?.OwnerName ?? item?.ownerName
    ) || null
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
    ),
    OwnerAxUserId: safeText(
      item?.OwnerAxUserId ?? item?.ownerAxUserId
    ),
    OwnerName: safeText(
      item?.OwnerName ?? item?.ownerName
    ) || null
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
    OwnerAxUserId: safeText(
      item?.OwnerAxUserId ?? item?.ownerAxUserId
    ),
    OwnerName: safeText(
      item?.OwnerName ?? item?.ownerName
    ) || null,
    OcrJson: safeText(item?.OcrJson ?? item?.ocrJson) || null,
    NormalizedJson: safeText(item?.NormalizedJson ?? item?.normalizedJson) || null,
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
var resolveTypeLabel = (typeValueCode) => {
  if (!typeValueCode) {
    return typeValueCode;
  }
  const match = getExpenseGastoTypeOptions().find((entry) => safeText(entry.value) === typeValueCode);
  return safeText(match?.text) || typeValueCode;
};
var mapExpenseSheetListItemToCard = (item) => {
  return {
    hojaGastosId: safeText(item.HojaGastosId),
    description: safeText(item.Description),
    expenseSheetStatus: toNullableNumber(item.ExpenseSheetStatus),
    estadoComentarios: safeText(item.EstadoComentarios) || null,
    userId: safeText(item.UserId),
    userName: safeText(item.UserName) || null,
    ownerAxUserId: safeText(item.OwnerAxUserId ?? item.ownerAxUserId),
    ownerName: safeText(item.OwnerName ?? item.ownerName) || null,
    voucher: safeText(item.Voucher),
    projId: safeText(item.ProjId),
    currencyCode: safeText(item.CurrencyCode),
    totalAmount: toNullableNumber(item.TotalAmount),
    exchRate: toNullableNumber(item.ExchRate),
    exchangeRateMode: toNullableNumber(item.ExchangeRateMode),
    reimbursableExpense: toNullableNumber(item.ReimbursableExpense ?? item.reimbursableExpense),
    createdDate: safeText(item.CreatedDate)
  };
};
var mapExpenseSheetHeader = (sheet) => {
  return {
    hojaGastosId: safeText(sheet.HojaGastosId ?? sheet.hojaGastosId),
    description: safeText(sheet.Description ?? sheet.description),
    userId: safeText(sheet.UserId ?? sheet.userId),
    userName: safeText(sheet.UserName ?? sheet.userName) || null,
    ownerAxUserId: safeText(sheet.OwnerAxUserId ?? sheet.ownerAxUserId),
    ownerName: safeText(sheet.OwnerName ?? sheet.ownerName) || null,
    expenseSheetStatus: toNullableNumber(sheet.ExpenseSheetStatus ?? sheet.expenseSheetStatus),
    estadoComentarios: safeText(sheet.EstadoComentarios ?? sheet.estadoComentarios) || null,
    currencyCode: safeText(sheet.CurrencyCode ?? sheet.currencyCode),
    totalAmount: toNullableNumber(sheet.TotalAmount ?? sheet.totalAmount),
    exchRate: safeText(sheet.ExchRate ?? sheet.exchRate),
    exchangeRateMode: toNullableNumber(sheet.ExchangeRateMode ?? sheet.exchangeRateMode),
    reimbursableExpense: toNullableNumber(sheet.ReimbursableExpense ?? sheet.reimbursableExpense),
    projId: safeText(sheet.ProjId ?? sheet.projId),
    voucher: safeText(sheet.Voucher ?? sheet.voucher),
    createdDate: safeText(sheet.CreatedDate ?? sheet.createdDate)
  };
};
var mapExpenseSheetLine = (line) => {
  const typeValueCode = safeText(line.TypeValueCode ?? line.typeValueCode ?? line.TypeValue ?? line.typeValue);
  const typeValueLabel = safeText(line.TypeValue ?? line.typeValue);
  const explicitLineRecId = safeText(line.LineRecId ?? line.lineRecId);
  return {
    lineRecId: explicitLineRecId || safeText(line.RecId ?? line.recId),
    transDate: safeText(line.TransDate ?? line.transDate),
    typeValueCode,
    typeValue: typeValueLabel && typeValueLabel !== typeValueCode ? typeValueLabel : resolveTypeLabel(typeValueCode),
    description: safeText(line.Description ?? line.description),
    internacional: toNullableBool(line.Internacional ?? line.internacional),
    fileId: safeText(line.FileId ?? line.fileId),
    ticket: toNullableBool(line.Ticket ?? line.ticket),
    price: toNullableNumber(line.Price ?? line.price),
    qty: toNullableNumber(line.Qty ?? line.qty),
    amount: toNullableNumber(line.Amount ?? line.amount),
    projId: safeText(line.ProjId ?? line.projId),
    reimbursableExpense: toNullableNumber(line.ReimbursableExpense ?? line.reimbursableExpense),
    currencyCode: safeText(line.CurrencyCode ?? line.currencyCode),
    amountMST: toNullableNumber(line.AmountMST ?? line.amountMST),
    exchRate: toNullableNumber(line.ExchRate ?? line.exchRate),
    indAttachFiles: safeText(line.IndAttachFiles ?? line.indAttachFiles)
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
var normalizeExpenseSheetReimbursable = (value) => {
  const parsed = toNullableNumber2(value);
  if (parsed === null || !Number.isInteger(parsed) || parsed < 0) {
    return null;
  }
  return parsed;
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
  const runtimeWindow = readExpenseWindowRuntime();
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
  const runtimeWindow = readExpenseWindowRuntime();
  const explicitWindowFlag = toFlagBool2(runtimeWindow.__IND_EXPENSE_STRICT_API__);
  return explicitWindowFlag === true;
};
var readWindowSelectedCompany = () => {
  return safeText3(readExpenseWindowRuntime().__IND_SELECTED_COMPANY__).toUpperCase();
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
    reimbursableExpense: normalizeExpenseSheetReimbursable(payload.reimbursableExpense),
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
    OwnerAxUserId: safeText3(item.ownerAxUserId) || null,
    OwnerName: safeText3(item.ownerName) || null,
    Voucher: safeText3(item.voucher),
    ProjId: safeText3(item.projId),
    CurrencyCode: safeText3(item.currencyCode),
    TotalAmount: toNullableNumber2(item.totalAmount ?? item.totalAmountMST),
    ExchRate: toNullableNumber2(item.exchRate),
    ExchangeRateMode: toNullableNumber2(item.exchangeRateMode),
    ReimbursableExpense: normalizeExpenseSheetReimbursable(item.reimbursableExpense),
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
    reimbursableExpense: normalizeExpenseSheetReimbursable(payload.reimbursableExpense),
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
    transDate: normalizeRequiredApiDate2(line.transDate),
    reimbursableExpense: normalizeExpenseSheetReimbursable(line.reimbursableExpense),
    currencyCode: safeText3(line.currencyCode).toUpperCase() || void 0,
    amountMST: toNullableNumber2(line.amountMST),
    exchRate: toNullableNumber2(line.exchRate)
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
    reimbursableExpense: normalizeExpenseSheetReimbursable(payload.reimbursableExpense),
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
  const safePayload = {
    ...payload,
    reimbursableExpense: normalizeExpenseSheetReimbursable(payload.reimbursableExpense)
  };
  const response = await fetchJson(`/api/crm/expensesheets/${safeSheetId}`, {
    ...options,
    method: "PUT",
    headers: buildExpenseHeaders(context, options, true),
    body: JSON.stringify(safePayload)
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
        transDate: normalizedTransDate,
        reimbursableExpense: normalizeExpenseSheetReimbursable(payload.reimbursableExpense),
        currencyCode: safeText3(payload.currencyCode).toUpperCase() || void 0,
        amountMST: toNullableNumber2(payload.amountMST),
        exchRate: toNullableNumber2(payload.exchRate)
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
  const safeProjectId = safeText3(payload?.projId || payload?.projectId);
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
    form.append("projId", safeProjectId);
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
  const safePageSize = Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : 50;
  return fetchJson(
    `/api/crm/projects/list?filter=${safeTerm}&page=${safePage}&pageSize=${safePageSize}`,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlQXBpUmVzcG9uc2VOb3JtYWxpemVycy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VBcGlNYXBwZXJzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZVVpVXRpbHMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlVGlja2V0TGluZUFtb3VudC50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VBcGkudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB0eXBlIHtcclxuICBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0byxcclxuICBFeHBlbnNlU2hlZXREZXRhaWxEdG8sXHJcbiAgRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG8sXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlc3VsdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0byxcclxuICBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byxcclxuICBJbmRBcGlSZXNwb25zZSxcclxuICBJbmRQYWdlZFJlc3BvbnNlLFxyXG59IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHtcbiAgc2FmZVRleHQsXG4gIHRvTnVsbGFibGVCb29sLFxuICB0b051bGxhYmxlR2FzdG9UeXBlQ29kZSxcbiAgdG9OdWxsYWJsZU51bWJlcixcbiAgdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGUsXHJcbn0gZnJvbSBcIi4vZXhwZW5zZUFwaVRyYW5zZm9ybXMudHNcIjtcbmltcG9ydCB7IG5vcm1hbGl6ZUV4cGVuc2VTaGVldFN1Ym9yZGluYXRlcyB9IGZyb20gXCIuL2V4cGVuc2VTdWJvcmRpbmF0ZU1hcHBlci50c1wiO1xuXG5jb25zdCBnZXRQYWdlZEl0ZW1zID0gPFQsPihyZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxUPik6IFRbXSA9PiB7XG4gIGNvbnN0IHJhdyA9IChyZXNwb25zZSB8fCB7fSkgYXMgeyBJdGVtcz86IHVua25vd247IGl0ZW1zPzogdW5rbm93biB9O1xuICBpZiAoQXJyYXkuaXNBcnJheShyYXcuSXRlbXMpKSByZXR1cm4gcmF3Lkl0ZW1zIGFzIFRbXTtcbiAgaWYgKEFycmF5LmlzQXJyYXkocmF3Lml0ZW1zKSkgcmV0dXJuIHJhdy5pdGVtcyBhcyBUW107XG4gIHJldHVybiBbXTtcbn07XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZSA9IChcbiAgcmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+XG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldExpc3RJdGVtRHRvPiA9PiB7XG4gIGNvbnN0IGl0ZW1zID0gZ2V0UGFnZWRJdGVtcyhyZXNwb25zZSk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRJdGVtcyA9IGl0ZW1zLm1hcCgoaXRlbSkgPT4gKHtcbiAgICAuLi5pdGVtLFxuICAgIFJlaW1idXJzYWJsZUV4cGVuc2U6IHRvTnVsbGFibGVOdW1iZXIoaXRlbT8uUmVpbWJ1cnNhYmxlRXhwZW5zZSA/PyBpdGVtPy5yZWltYnVyc2FibGVFeHBlbnNlKSxcbiAgICBPd25lckF4VXNlcklkOiBzYWZlVGV4dChpdGVtPy5Pd25lckF4VXNlcklkID8/IGl0ZW0/Lm93bmVyQXhVc2VySWQpIHx8IG51bGwsXG4gICAgT3duZXJOYW1lOiBzYWZlVGV4dChpdGVtPy5Pd25lck5hbWUgPz8gaXRlbT8ub3duZXJOYW1lKSB8fCBudWxsLFxuICB9KSk7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5yZXNwb25zZSxcbiAgICBJdGVtczogbm9ybWFsaXplZEl0ZW1zLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UgPSAoXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldERldGFpbER0bz5cbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0RGV0YWlsRHRvPiA9PiB7XG4gIGNvbnN0IGl0ZW1zID0gZ2V0UGFnZWRJdGVtcyhyZXNwb25zZSk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRJdGVtcyA9IGl0ZW1zLm1hcCgoaXRlbSkgPT4ge1xuICAgIGNvbnN0IHJhd0xpbmVzID0gQXJyYXkuaXNBcnJheShpdGVtPy5MaW5lcylcbiAgICAgID8gaXRlbS5MaW5lc1xuICAgICAgOiAoQXJyYXkuaXNBcnJheShpdGVtPy5saW5lcykgPyBpdGVtLmxpbmVzIDogW10pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLml0ZW0sXG4gICAgICBIb2phR2FzdG9zSWQ6IHNhZmVUZXh0KGl0ZW0/LkhvamFHYXN0b3NJZCA/PyBpdGVtPy5ob2phR2FzdG9zSWQpLFxuICAgICAgVXNlcklkOiBzYWZlVGV4dChpdGVtPy5Vc2VySWQgPz8gaXRlbT8udXNlcklkKSxcbiAgICAgIFVzZXJOYW1lOiBzYWZlVGV4dChpdGVtPy5Vc2VyTmFtZSA/PyBpdGVtPy51c2VyTmFtZSkgfHwgbnVsbCxcbiAgICAgIE93bmVyQXhVc2VySWQ6IHNhZmVUZXh0KGl0ZW0/Lk93bmVyQXhVc2VySWQgPz8gaXRlbT8ub3duZXJBeFVzZXJJZCksXG4gICAgICBPd25lck5hbWU6IHNhZmVUZXh0KGl0ZW0/Lk93bmVyTmFtZSA/PyBpdGVtPy5vd25lck5hbWUpIHx8IG51bGwsXG4gICAgICBSZWltYnVyc2FibGVFeHBlbnNlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0/LlJlaW1idXJzYWJsZUV4cGVuc2UgPz8gaXRlbT8ucmVpbWJ1cnNhYmxlRXhwZW5zZSksXG4gICAgICBQcm9qSWQ6IHNhZmVUZXh0KGl0ZW0/LlByb2pJZCA/PyBpdGVtPy5wcm9qSWQpLFxuICAgICAgTGluZXM6IHJhd0xpbmVzLm1hcCgobGluZSkgPT4gKHtcbiAgICAgICAgLi4ubGluZSxcbiAgICAgICAgUmVjSWQ6IHNhZmVUZXh0KGxpbmU/LlJlY0lkID8/IGxpbmU/LnJlY0lkKSxcbiAgICAgICAgTGluZVJlY0lkOiBzYWZlVGV4dChsaW5lPy5MaW5lUmVjSWQgPz8gbGluZT8ubGluZVJlY0lkKSxcbiAgICAgICAgUHJvaklkOiBzYWZlVGV4dChsaW5lPy5Qcm9qSWQgPz8gbGluZT8ucHJvaklkKSxcbiAgICAgICAgUmVpbWJ1cnNhYmxlRXhwZW5zZTogdG9OdWxsYWJsZU51bWJlcihsaW5lPy5SZWltYnVyc2FibGVFeHBlbnNlID8/IGxpbmU/LnJlaW1idXJzYWJsZUV4cGVuc2UpLFxuICAgICAgICBDdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGxpbmU/LkN1cnJlbmN5Q29kZSA/PyBsaW5lPy5jdXJyZW5jeUNvZGUpLFxuICAgICAgICBBbW91bnRNU1Q6IHRvTnVsbGFibGVOdW1iZXIobGluZT8uQW1vdW50TVNUID8/IGxpbmU/LmFtb3VudE1TVCksXG4gICAgICAgIEV4Y2hSYXRlOiB0b051bGxhYmxlTnVtYmVyKGxpbmU/LkV4Y2hSYXRlID8/IGxpbmU/LmV4Y2hSYXRlKSxcbiAgICAgIH0pKSxcbiAgICB9O1xuICB9KTtcblxuICByZXR1cm4ge1xuICAgIC4uLnJlc3BvbnNlLFxuICAgIEl0ZW1zOiBub3JtYWxpemVkSXRlbXMsXG4gIH07XG59O1xuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVBcGlSZXNwb25zZSA9IDxUPihyZXNwb25zZTogSW5kQXBpUmVzcG9uc2U8VD4pOiBJbmRBcGlSZXNwb25zZTxUPiA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnJlc3BvbnNlLFxyXG4gICAgRXJyb3JzOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5FcnJvcnMpID8gcmVzcG9uc2UuRXJyb3JzIDogcmVzcG9uc2U/LkVycm9ycyA/PyBudWxsLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHRcclxuKTogRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgY29uc3QgcmF3RGF0YSA9IG5vcm1hbGl6ZWQ/LkRhdGE7XHJcbiAgaWYgKCFyYXdEYXRhIHx8IHR5cGVvZiByYXdEYXRhICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAuLi5ub3JtYWxpemVkLFxyXG4gICAgICBIdHRwU3RhdHVzOiB0eXBlb2YgcmVzcG9uc2U/Lkh0dHBTdGF0dXMgPT09IFwibnVtYmVyXCIgPyByZXNwb25zZS5IdHRwU3RhdHVzIDogdW5kZWZpbmVkLFxyXG4gICAgICBSZXRyeUFmdGVyOiBzYWZlVGV4dChyZXNwb25zZT8uUmV0cnlBZnRlcikgfHwgbnVsbCxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb25zdCByYXdTdGVwVHJhY2VJZHMgPVxyXG4gICAgKHJhd0RhdGEgYXMgeyBTdGVwVHJhY2VJZHM/OiB1bmtub3duOyBzdGVwVHJhY2VJZHM/OiB1bmtub3duIH0pLlN0ZXBUcmFjZUlkcyA/P1xyXG4gICAgKHJhd0RhdGEgYXMgeyBzdGVwVHJhY2VJZHM/OiB1bmtub3duIH0pLnN0ZXBUcmFjZUlkcztcclxuICBjb25zdCBzdGVwVHJhY2VJZHMgPSByYXdTdGVwVHJhY2VJZHMgJiYgdHlwZW9mIHJhd1N0ZXBUcmFjZUlkcyA9PT0gXCJvYmplY3RcIiA/IHJhd1N0ZXBUcmFjZUlkcyA6IG51bGw7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAuLi5ub3JtYWxpemVkLFxyXG4gICAgSHR0cFN0YXR1czogdHlwZW9mIHJlc3BvbnNlPy5IdHRwU3RhdHVzID09PSBcIm51bWJlclwiID8gcmVzcG9uc2UuSHR0cFN0YXR1cyA6IHVuZGVmaW5lZCxcclxuICAgIFJldHJ5QWZ0ZXI6IHNhZmVUZXh0KHJlc3BvbnNlPy5SZXRyeUFmdGVyKSB8fCBudWxsLFxyXG4gICAgRGF0YToge1xyXG4gICAgICBGaWxlSWQ6IHNhZmVUZXh0KChyYXdEYXRhIGFzIHsgRmlsZUlkPzogdW5rbm93bjsgZmlsZUlkPzogdW5rbm93biB9KS5GaWxlSWQgPz8gKHJhd0RhdGEgYXMgeyBmaWxlSWQ/OiB1bmtub3duIH0pLmZpbGVJZCksXHJcbiAgICAgIFVybEZpbGU6IHNhZmVUZXh0KFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgVXJsRmlsZT86IHVua25vd247IHVybEZpbGU/OiB1bmtub3duIH0pLlVybEZpbGUgPz8gKHJhd0RhdGEgYXMgeyB1cmxGaWxlPzogdW5rbm93biB9KS51cmxGaWxlXHJcbiAgICAgICksXHJcbiAgICAgIEZpbGVOYW1lOiBzYWZlVGV4dChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IEZpbGVOYW1lPzogdW5rbm93bjsgZmlsZU5hbWU/OiB1bmtub3duIH0pLkZpbGVOYW1lID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IGZpbGVOYW1lPzogdW5rbm93biB9KS5maWxlTmFtZVxyXG4gICAgICApLFxyXG4gICAgICBQcm9jZXNzZWRCeUFJOiB0b051bGxhYmxlQm9vbChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KS5Qcm9jZXNzZWRCeUFJID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pLnByb2Nlc3NlZEJ5QUlcclxuICAgICAgKSxcclxuICAgICAgTGlua2VkVG9TaGVldDpcclxuICAgICAgICB0b051bGxhYmxlQm9vbChcclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgTGlua2VkVG9TaGVldD86IHVua25vd247IGxpbmtlZFRvU2hlZXQ/OiB1bmtub3duIH0pLkxpbmtlZFRvU2hlZXQgPz9cclxuICAgICAgICAgICAgKHJhd0RhdGEgYXMgeyBsaW5rZWRUb1NoZWV0PzogdW5rbm93biB9KS5saW5rZWRUb1NoZWV0XHJcbiAgICAgICAgKSA9PT0gdHJ1ZSxcclxuICAgICAgSG9qYUdhc3Rvc0lkOlxyXG4gICAgICAgIHNhZmVUZXh0KFxyXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBIb2phR2FzdG9zSWQ/OiB1bmtub3duOyBob2phR2FzdG9zSWQ/OiB1bmtub3duIH0pLkhvamFHYXN0b3NJZCA/P1xyXG4gICAgICAgICAgICAocmF3RGF0YSBhcyB7IGhvamFHYXN0b3NJZD86IHVua25vd24gfSkuaG9qYUdhc3Rvc0lkXHJcbiAgICAgICAgKSB8fCBudWxsLFxyXG4gICAgICBDb21wbGV0ZWRTdGFnZTogc2FmZVRleHQoXHJcbiAgICAgICAgKHJhd0RhdGEgYXMgeyBDb21wbGV0ZWRTdGFnZT86IHVua25vd247IGNvbXBsZXRlZFN0YWdlPzogdW5rbm93biB9KS5Db21wbGV0ZWRTdGFnZSA/P1xyXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBjb21wbGV0ZWRTdGFnZT86IHVua25vd24gfSkuY29tcGxldGVkU3RhZ2VcclxuICAgICAgKSxcclxuICAgICAgU3RlcFRyYWNlSWRzOiBzdGVwVHJhY2VJZHNcclxuICAgICAgICA/IHtcclxuICAgICAgICAgICAgVGlja2V0Q3JlYXRlOiBzYWZlVGV4dChcclxuICAgICAgICAgICAgICAoc3RlcFRyYWNlSWRzIGFzIHsgVGlja2V0Q3JlYXRlPzogdW5rbm93bjsgdGlja2V0Q3JlYXRlPzogdW5rbm93biB9KS5UaWNrZXRDcmVhdGUgPz9cclxuICAgICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyB0aWNrZXRDcmVhdGU/OiB1bmtub3duIH0pLnRpY2tldENyZWF0ZVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBGaWxlVXBsb2FkOiBzYWZlVGV4dChcclxuICAgICAgICAgICAgICAoc3RlcFRyYWNlSWRzIGFzIHsgRmlsZVVwbG9hZD86IHVua25vd247IGZpbGVVcGxvYWQ/OiB1bmtub3duIH0pLkZpbGVVcGxvYWQgPz9cclxuICAgICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyBmaWxlVXBsb2FkPzogdW5rbm93biB9KS5maWxlVXBsb2FkXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIERyYWZ0RXh0cmFjdDogc2FmZVRleHQoXHJcbiAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IERyYWZ0RXh0cmFjdD86IHVua25vd247IGRyYWZ0RXh0cmFjdD86IHVua25vd24gfSkuRHJhZnRFeHRyYWN0ID8/XHJcbiAgICAgICAgICAgICAgICAoc3RlcFRyYWNlSWRzIGFzIHsgZHJhZnRFeHRyYWN0PzogdW5rbm93biB9KS5kcmFmdEV4dHJhY3RcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgVGlja2V0RmluYWxpemU6IHNhZmVUZXh0KFxyXG4gICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyBUaWNrZXRGaW5hbGl6ZT86IHVua25vd247IHRpY2tldEZpbmFsaXplPzogdW5rbm93biB9KS5UaWNrZXRGaW5hbGl6ZSA/P1xyXG4gICAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IHRpY2tldEZpbmFsaXplPzogdW5rbm93biB9KS50aWNrZXRGaW5hbGl6ZVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBTaGVldExpbms6IHNhZmVUZXh0KFxyXG4gICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyBTaGVldExpbms/OiB1bmtub3duOyBzaGVldExpbms/OiB1bmtub3duIH0pLlNoZWV0TGluayA/P1xyXG4gICAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IHNoZWV0TGluaz86IHVua25vd24gfSkuc2hlZXRMaW5rXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgOiBudWxsLFxyXG4gICAgfSxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZSA9IChcbiAgcmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+XG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPiA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4ucmVzcG9uc2UsXG4gICAgSXRlbXM6IGdldFBhZ2VkSXRlbXMocmVzcG9uc2UpLFxuICB9O1xufTtcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTx1bmtub3duPlxyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvPiA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEl0ZW1zID0gbm9ybWFsaXplRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVzKHJlc3BvbnNlPy5JdGVtcyk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAuLi5yZXNwb25zZSxcclxuICAgIEl0ZW1zOiBub3JtYWxpemVkSXRlbXMsXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz5cclxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz4gPT4ge1xyXG4gIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+ICh7XHJcbiAgICAuLi5pdGVtLFxyXG4gICAgU3RhdHVzOiB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZShcclxuICAgICAgKGl0ZW0gYXMgeyBTdGF0dXM/OiB1bmtub3duOyBzdGF0dXM/OiB1bmtub3duIH0pPy5TdGF0dXMgPz9cclxuICAgICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LnN0YXR1c1xyXG4gICAgKSxcclxuICAgIFByb2Nlc3NlZEJ5QUk6IHRvTnVsbGFibGVCb29sKFxyXG4gICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8uUHJvY2Vzc2VkQnlBSSA/P1xyXG4gICAgICAgIChpdGVtIGFzIHsgUHJvY2Vzc2VkQnlBST86IHVua25vd247IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pPy5wcm9jZXNzZWRCeUFJXHJcbiAgICApLFxyXG4gICAgR2FzdG9UeXBlOiB0b051bGxhYmxlR2FzdG9UeXBlQ29kZShcbiAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uR2FzdG9UeXBlID8/XG4gICAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uZ2FzdG9UeXBlXG4gICAgKSxcbiAgICBPd25lckF4VXNlcklkOiBzYWZlVGV4dChcbiAgICAgIChpdGVtIGFzIHsgT3duZXJBeFVzZXJJZD86IHVua25vd247IG93bmVyQXhVc2VySWQ/OiB1bmtub3duIH0pPy5Pd25lckF4VXNlcklkID8/XG4gICAgICAgIChpdGVtIGFzIHsgT3duZXJBeFVzZXJJZD86IHVua25vd247IG93bmVyQXhVc2VySWQ/OiB1bmtub3duIH0pPy5vd25lckF4VXNlcklkXG4gICAgKSxcbiAgICBPd25lck5hbWU6IHNhZmVUZXh0KFxuICAgICAgKGl0ZW0gYXMgeyBPd25lck5hbWU/OiB1bmtub3duOyBvd25lck5hbWU/OiB1bmtub3duIH0pPy5Pd25lck5hbWUgPz9cbiAgICAgICAgKGl0ZW0gYXMgeyBPd25lck5hbWU/OiB1bmtub3duOyBvd25lck5hbWU/OiB1bmtub3duIH0pPy5vd25lck5hbWVcbiAgICApIHx8IG51bGwsXG4gIH0pKTtcblxyXG4gIHJldHVybiB7XHJcbiAgICAuLi5yZXNwb25zZSxcclxuICAgIEl0ZW1zOiBub3JtYWxpemVkSXRlbXMsXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVUaWNrZXRMaW5rTGlzdFBhZ2VkUmVzcG9uc2UgPSAoXHJcbiAgcmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RJdGVtRHRvPlxyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0bz4gPT4ge1xyXG4gIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+ICh7XHJcbiAgICAuLi5pdGVtLFxyXG4gICAgUHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woXHJcbiAgICAgIChpdGVtIGFzIHsgUHJvY2Vzc2VkQnlBST86IHVua25vd247IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pPy5Qcm9jZXNzZWRCeUFJID8/XHJcbiAgICAgICAgKGl0ZW0gYXMgeyBQcm9jZXNzZWRCeUFJPzogdW5rbm93bjsgcHJvY2Vzc2VkQnlBST86IHVua25vd24gfSk/LnByb2Nlc3NlZEJ5QUlcclxuICAgICksXHJcbiAgICBHYXN0b1R5cGU6IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlKFxuICAgICAgKGl0ZW0gYXMgeyBHYXN0b1R5cGU/OiB1bmtub3duOyBnYXN0b1R5cGU/OiB1bmtub3duIH0pPy5HYXN0b1R5cGUgPz9cbiAgICAgICAgKGl0ZW0gYXMgeyBHYXN0b1R5cGU/OiB1bmtub3duOyBnYXN0b1R5cGU/OiB1bmtub3duIH0pPy5nYXN0b1R5cGVcbiAgICApLFxuICAgIE93bmVyQXhVc2VySWQ6IHNhZmVUZXh0KFxuICAgICAgKGl0ZW0gYXMgeyBPd25lckF4VXNlcklkPzogdW5rbm93bjsgb3duZXJBeFVzZXJJZD86IHVua25vd24gfSk/Lk93bmVyQXhVc2VySWQgPz9cbiAgICAgICAgKGl0ZW0gYXMgeyBPd25lckF4VXNlcklkPzogdW5rbm93bjsgb3duZXJBeFVzZXJJZD86IHVua25vd24gfSk/Lm93bmVyQXhVc2VySWRcbiAgICApLFxuICAgIE93bmVyTmFtZTogc2FmZVRleHQoXG4gICAgICAoaXRlbSBhcyB7IE93bmVyTmFtZT86IHVua25vd247IG93bmVyTmFtZT86IHVua25vd24gfSk/Lk93bmVyTmFtZSA/P1xuICAgICAgICAoaXRlbSBhcyB7IE93bmVyTmFtZT86IHVua25vd247IG93bmVyTmFtZT86IHVua25vd24gfSk/Lm93bmVyTmFtZVxuICAgICkgfHwgbnVsbCxcbiAgfSkpO1xuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnJlc3BvbnNlLFxyXG4gICAgSXRlbXM6IG5vcm1hbGl6ZWRJdGVtcyxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2UgPSAoXHJcbiAgcmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvPlxyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldERldGFpbER0bz4gPT4ge1xyXG4gIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+ICh7XHJcbiAgICAuLi5pdGVtLFxyXG4gICAgU3RhdHVzOiB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZShcclxuICAgICAgKGl0ZW0gYXMgeyBTdGF0dXM/OiB1bmtub3duOyBzdGF0dXM/OiB1bmtub3duIH0pPy5TdGF0dXMgPz9cclxuICAgICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LnN0YXR1c1xyXG4gICAgKSxcclxuICAgIFByb2Nlc3NlZEJ5QUk6IHRvTnVsbGFibGVCb29sKFxyXG4gICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8uUHJvY2Vzc2VkQnlBSSA/P1xyXG4gICAgICAgIChpdGVtIGFzIHsgUHJvY2Vzc2VkQnlBST86IHVua25vd247IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pPy5wcm9jZXNzZWRCeUFJXHJcbiAgICApLFxyXG4gICAgSG9qYUdhc3Rvc0lkRGlzcGxheTogc2FmZVRleHQoXHJcbiAgICAgIChpdGVtIGFzIHsgSG9qYUdhc3Rvc0lkRGlzcGxheT86IHVua25vd247IGhvamFHYXN0b3NJZERpc3BsYXk/OiB1bmtub3duIH0pPy5Ib2phR2FzdG9zSWREaXNwbGF5ID8/XHJcbiAgICAgICAgKGl0ZW0gYXMgeyBIb2phR2FzdG9zSWREaXNwbGF5PzogdW5rbm93bjsgaG9qYUdhc3Rvc0lkRGlzcGxheT86IHVua25vd24gfSk/LmhvamFHYXN0b3NJZERpc3BsYXlcclxuICAgICksXHJcbiAgICBHYXN0b1R5cGU6IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlKFxuICAgICAgKGl0ZW0gYXMgeyBHYXN0b1R5cGU/OiB1bmtub3duOyBnYXN0b1R5cGU/OiB1bmtub3duIH0pPy5HYXN0b1R5cGUgPz9cbiAgICAgICAgKGl0ZW0gYXMgeyBHYXN0b1R5cGU/OiB1bmtub3duOyBnYXN0b1R5cGU/OiB1bmtub3duIH0pPy5nYXN0b1R5cGVcbiAgICApLFxuICAgIE93bmVyQXhVc2VySWQ6IHNhZmVUZXh0KFxuICAgICAgKGl0ZW0gYXMgeyBPd25lckF4VXNlcklkPzogdW5rbm93bjsgb3duZXJBeFVzZXJJZD86IHVua25vd24gfSk/Lk93bmVyQXhVc2VySWQgPz9cbiAgICAgICAgKGl0ZW0gYXMgeyBPd25lckF4VXNlcklkPzogdW5rbm93bjsgb3duZXJBeFVzZXJJZD86IHVua25vd24gfSk/Lm93bmVyQXhVc2VySWRcbiAgICApLFxuICAgIE93bmVyTmFtZTogc2FmZVRleHQoXG4gICAgICAoaXRlbSBhcyB7IE93bmVyTmFtZT86IHVua25vd247IG93bmVyTmFtZT86IHVua25vd24gfSk/Lk93bmVyTmFtZSA/P1xuICAgICAgICAoaXRlbSBhcyB7IE93bmVyTmFtZT86IHVua25vd247IG93bmVyTmFtZT86IHVua25vd24gfSk/Lm93bmVyTmFtZVxuICAgICkgfHwgbnVsbCxcbiAgICBPY3JKc29uOiBzYWZlVGV4dChpdGVtPy5PY3JKc29uID8/IGl0ZW0/Lm9jckpzb24pIHx8IG51bGwsXG4gICAgTm9ybWFsaXplZEpzb246IHNhZmVUZXh0KGl0ZW0/Lk5vcm1hbGl6ZWRKc29uID8/IGl0ZW0/Lm5vcm1hbGl6ZWRKc29uKSB8fCBudWxsLFxuICAgIExpbmVzOiBBcnJheS5pc0FycmF5KGl0ZW0/LkxpbmVzKSA/IGl0ZW0uTGluZXMgOiBbXSxcbiAgfSkpO1xuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnJlc3BvbnNlLFxyXG4gICAgSXRlbXM6IG5vcm1hbGl6ZWRJdGVtcyxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVRpY2tldExpbmtCdWxrUmVzcG9uc2UgPSAoXHJcbiAgcmVzcG9uc2U6IEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvPlxyXG4pOiBJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0bz4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgY29uc3QgcmF3RGF0YSA9IG5vcm1hbGl6ZWQ/LkRhdGE7XHJcbiAgaWYgKCFyYXdEYXRhIHx8IHR5cGVvZiByYXdEYXRhICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICByZXR1cm4gbm9ybWFsaXplZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHRvSXNzdWVMaXN0ID0gKHZhbHVlOiB1bmtub3duKSA9PiB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gW107XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlLm1hcCgoZW50cnkpID0+ICh7XHJcbiAgICAgIHRpY2tldElkOiBzYWZlVGV4dChcclxuICAgICAgICAoZW50cnkgYXMgeyB0aWNrZXRJZD86IHVua25vd247IFRpY2tldElkPzogdW5rbm93biB9KT8udGlja2V0SWQgPz9cclxuICAgICAgICAgIChlbnRyeSBhcyB7IFRpY2tldElkPzogdW5rbm93biB9KS5UaWNrZXRJZFxyXG4gICAgICApLFxyXG4gICAgICByZWFzb246IHNhZmVUZXh0KFxyXG4gICAgICAgIChlbnRyeSBhcyB7IHJlYXNvbj86IHVua25vd247IFJlYXNvbj86IHVua25vd24gfSk/LnJlYXNvbiA/P1xyXG4gICAgICAgICAgKGVudHJ5IGFzIHsgUmVhc29uPzogdW5rbm93biB9KS5SZWFzb25cclxuICAgICAgKSxcclxuICAgIH0pKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBsaW5rZWRUaWNrZXRJZHNSYXcgPVxyXG4gICAgKHJhd0RhdGEgYXMgeyBsaW5rZWRUaWNrZXRJZHM/OiB1bmtub3duOyBMaW5rZWRUaWNrZXRJZHM/OiB1bmtub3duIH0pLmxpbmtlZFRpY2tldElkcyA/P1xyXG4gICAgKHJhd0RhdGEgYXMgeyBMaW5rZWRUaWNrZXRJZHM/OiB1bmtub3duIH0pLkxpbmtlZFRpY2tldElkcztcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLm5vcm1hbGl6ZWQsXHJcbiAgICBEYXRhOiB7XHJcbiAgICAgIGV4cGVuc2VTaGVldElkOiBzYWZlVGV4dChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IGV4cGVuc2VTaGVldElkPzogdW5rbm93bjsgRXhwZW5zZVNoZWV0SWQ/OiB1bmtub3duIH0pLmV4cGVuc2VTaGVldElkID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IEV4cGVuc2VTaGVldElkPzogdW5rbm93biB9KS5FeHBlbnNlU2hlZXRJZFxyXG4gICAgICApLFxyXG4gICAgICByZXF1ZXN0ZWRDb3VudDogdG9OdWxsYWJsZU51bWJlcihcclxuICAgICAgICAocmF3RGF0YSBhcyB7IHJlcXVlc3RlZENvdW50PzogdW5rbm93bjsgUmVxdWVzdGVkQ291bnQ/OiB1bmtub3duIH0pLnJlcXVlc3RlZENvdW50ID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IFJlcXVlc3RlZENvdW50PzogdW5rbm93biB9KS5SZXF1ZXN0ZWRDb3VudFxyXG4gICAgICApID8/IDAsXHJcbiAgICAgIGxpbmtlZENvdW50OiB0b051bGxhYmxlTnVtYmVyKFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgbGlua2VkQ291bnQ/OiB1bmtub3duOyBMaW5rZWRDb3VudD86IHVua25vd24gfSkubGlua2VkQ291bnQgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgTGlua2VkQ291bnQ/OiB1bmtub3duIH0pLkxpbmtlZENvdW50XHJcbiAgICAgICkgPz8gMCxcclxuICAgICAgc2tpcHBlZENvdW50OiB0b051bGxhYmxlTnVtYmVyKFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgc2tpcHBlZENvdW50PzogdW5rbm93bjsgU2tpcHBlZENvdW50PzogdW5rbm93biB9KS5za2lwcGVkQ291bnQgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgU2tpcHBlZENvdW50PzogdW5rbm93biB9KS5Ta2lwcGVkQ291bnRcclxuICAgICAgKSA/PyAwLFxyXG4gICAgICBmYWlsZWRDb3VudDogdG9OdWxsYWJsZU51bWJlcihcclxuICAgICAgICAocmF3RGF0YSBhcyB7IGZhaWxlZENvdW50PzogdW5rbm93bjsgRmFpbGVkQ291bnQ/OiB1bmtub3duIH0pLmZhaWxlZENvdW50ID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IEZhaWxlZENvdW50PzogdW5rbm93biB9KS5GYWlsZWRDb3VudFxyXG4gICAgICApID8/IDAsXHJcbiAgICAgIGxpbmtlZFRpY2tldElkczogQXJyYXkuaXNBcnJheShsaW5rZWRUaWNrZXRJZHNSYXcpXHJcbiAgICAgICAgPyBsaW5rZWRUaWNrZXRJZHNSYXcubWFwKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnkpKS5maWx0ZXIoQm9vbGVhbilcclxuICAgICAgICA6IFtdLFxyXG4gICAgICBza2lwcGVkOiB0b0lzc3VlTGlzdChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IHNraXBwZWQ/OiB1bmtub3duOyBTa2lwcGVkPzogdW5rbm93biB9KS5za2lwcGVkID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IFNraXBwZWQ/OiB1bmtub3duIH0pLlNraXBwZWRcclxuICAgICAgKSxcclxuICAgICAgZmFpbGVkOiB0b0lzc3VlTGlzdChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IGZhaWxlZD86IHVua25vd247IEZhaWxlZD86IHVua25vd24gfSkuZmFpbGVkID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IEZhaWxlZD86IHVua25vd24gfSkuRmFpbGVkXHJcbiAgICAgICksXHJcbiAgICB9LFxyXG4gIH07XHJcbn07XHJcbiIsICJcdUZFRkZpbXBvcnQgdHlwZSB7XHJcbiAgRXhwZW5zZVNoZWV0Q2FyZCxcclxuICBFeHBlbnNlU2hlZXREZXRhaWxEdG8sXHJcbiAgRXhwZW5zZVNoZWV0SGVhZGVyLFxyXG4gIEV4cGVuc2VTaGVldExpbmUsXHJcbiAgRXhwZW5zZVNoZWV0TGluZUR0byxcclxuICBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byxcclxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0LCB0b051bGxhYmxlQm9vbCwgdG9OdWxsYWJsZU51bWJlciB9IGZyb20gXCIuL2V4cGVuc2VBcGlUcmFuc2Zvcm1zLnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlR2FzdG9UeXBlT3B0aW9ucyB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZUdhc3RvVHlwZUNhdGFsb2cudHNcIjtcblxyXG5jb25zdCByZXNvbHZlVHlwZUxhYmVsID0gKHR5cGVWYWx1ZUNvZGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGlmICghdHlwZVZhbHVlQ29kZSkge1xuICAgIHJldHVybiB0eXBlVmFsdWVDb2RlO1xuICB9XG5cbiAgY29uc3QgbWF0Y2ggPSBnZXRFeHBlbnNlR2FzdG9UeXBlT3B0aW9ucygpLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeS52YWx1ZSkgPT09IHR5cGVWYWx1ZUNvZGUpO1xuXG4gIHJldHVybiBzYWZlVGV4dChtYXRjaD8udGV4dCkgfHwgdHlwZVZhbHVlQ29kZTtcbn07XG5cclxuLy8gTWFwcyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2xpc3QgaXRlbSBjb250cmFjdCB0byBsaXN0IGNhcmQgVUkgbW9kZWwuXHJcbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZCA9IChpdGVtOiBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byk6IEV4cGVuc2VTaGVldENhcmQgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBob2phR2FzdG9zSWQ6IHNhZmVUZXh0KGl0ZW0uSG9qYUdhc3Rvc0lkKSxcclxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChpdGVtLkRlc2NyaXB0aW9uKSxcclxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogdG9OdWxsYWJsZU51bWJlcihpdGVtLkV4cGVuc2VTaGVldFN0YXR1cyksXHJcbiAgICBlc3RhZG9Db21lbnRhcmlvczogc2FmZVRleHQoaXRlbS5Fc3RhZG9Db21lbnRhcmlvcykgfHwgbnVsbCxcbiAgICB1c2VySWQ6IHNhZmVUZXh0KGl0ZW0uVXNlcklkKSxcbiAgICB1c2VyTmFtZTogc2FmZVRleHQoaXRlbS5Vc2VyTmFtZSkgfHwgbnVsbCxcbiAgICBvd25lckF4VXNlcklkOiBzYWZlVGV4dChpdGVtLk93bmVyQXhVc2VySWQgPz8gaXRlbS5vd25lckF4VXNlcklkKSxcbiAgICBvd25lck5hbWU6IHNhZmVUZXh0KGl0ZW0uT3duZXJOYW1lID8/IGl0ZW0ub3duZXJOYW1lKSB8fCBudWxsLFxuICAgIHZvdWNoZXI6IHNhZmVUZXh0KGl0ZW0uVm91Y2hlciksXG4gICAgcHJvaklkOiBzYWZlVGV4dChpdGVtLlByb2pJZCksXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChpdGVtLkN1cnJlbmN5Q29kZSksXG4gICAgdG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5Ub3RhbEFtb3VudCksXG4gICAgZXhjaFJhdGU6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5FeGNoUmF0ZSksXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogdG9OdWxsYWJsZU51bWJlcihpdGVtLkV4Y2hhbmdlUmF0ZU1vZGUpLFxuICAgIHJlaW1idXJzYWJsZUV4cGVuc2U6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5SZWltYnVyc2FibGVFeHBlbnNlID8/IGl0ZW0ucmVpbWJ1cnNhYmxlRXhwZW5zZSksXG4gICAgY3JlYXRlZERhdGU6IHNhZmVUZXh0KGl0ZW0uQ3JlYXRlZERhdGUpLFxuICB9O1xufTtcblxyXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0gaGVhZGVyIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxyXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0SGVhZGVyID0gKHNoZWV0OiBFeHBlbnNlU2hlZXREZXRhaWxEdG8pOiBFeHBlbnNlU2hlZXRIZWFkZXIgPT4ge1xuICByZXR1cm4ge1xuICAgIGhvamFHYXN0b3NJZDogc2FmZVRleHQoc2hlZXQuSG9qYUdhc3Rvc0lkID8/IHNoZWV0LmhvamFHYXN0b3NJZCksXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KHNoZWV0LkRlc2NyaXB0aW9uID8/IHNoZWV0LmRlc2NyaXB0aW9uKSxcbiAgICB1c2VySWQ6IHNhZmVUZXh0KHNoZWV0LlVzZXJJZCA/PyBzaGVldC51c2VySWQpLFxuICAgIHVzZXJOYW1lOiBzYWZlVGV4dChzaGVldC5Vc2VyTmFtZSA/PyBzaGVldC51c2VyTmFtZSkgfHwgbnVsbCxcbiAgICBvd25lckF4VXNlcklkOiBzYWZlVGV4dChzaGVldC5Pd25lckF4VXNlcklkID8/IHNoZWV0Lm93bmVyQXhVc2VySWQpLFxuICAgIG93bmVyTmFtZTogc2FmZVRleHQoc2hlZXQuT3duZXJOYW1lID8/IHNoZWV0Lm93bmVyTmFtZSkgfHwgbnVsbCxcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IHRvTnVsbGFibGVOdW1iZXIoc2hlZXQuRXhwZW5zZVNoZWV0U3RhdHVzID8/IHNoZWV0LmV4cGVuc2VTaGVldFN0YXR1cyksXG4gICAgZXN0YWRvQ29tZW50YXJpb3M6IHNhZmVUZXh0KHNoZWV0LkVzdGFkb0NvbWVudGFyaW9zID8/IHNoZWV0LmVzdGFkb0NvbWVudGFyaW9zKSB8fCBudWxsLFxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQoc2hlZXQuQ3VycmVuY3lDb2RlID8/IHNoZWV0LmN1cnJlbmN5Q29kZSksXG4gICAgdG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoc2hlZXQuVG90YWxBbW91bnQgPz8gc2hlZXQudG90YWxBbW91bnQpLFxuICAgIGV4Y2hSYXRlOiBzYWZlVGV4dChzaGVldC5FeGNoUmF0ZSA/PyBzaGVldC5leGNoUmF0ZSksXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogdG9OdWxsYWJsZU51bWJlcihzaGVldC5FeGNoYW5nZVJhdGVNb2RlID8/IHNoZWV0LmV4Y2hhbmdlUmF0ZU1vZGUpLFxuICAgIHJlaW1idXJzYWJsZUV4cGVuc2U6IHRvTnVsbGFibGVOdW1iZXIoc2hlZXQuUmVpbWJ1cnNhYmxlRXhwZW5zZSA/PyBzaGVldC5yZWltYnVyc2FibGVFeHBlbnNlKSxcbiAgICBwcm9qSWQ6IHNhZmVUZXh0KHNoZWV0LlByb2pJZCA/PyBzaGVldC5wcm9qSWQpLFxuICAgIHZvdWNoZXI6IHNhZmVUZXh0KHNoZWV0LlZvdWNoZXIgPz8gc2hlZXQudm91Y2hlciksXG4gICAgY3JlYXRlZERhdGU6IHNhZmVUZXh0KHNoZWV0LkNyZWF0ZWREYXRlID8/IHNoZWV0LmNyZWF0ZWREYXRlKSxcbiAgfTtcbn07XG5cbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfSBsaW5lIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldExpbmUgPSAobGluZTogRXhwZW5zZVNoZWV0TGluZUR0byk6IEV4cGVuc2VTaGVldExpbmUgPT4ge1xuICBjb25zdCB0eXBlVmFsdWVDb2RlID0gc2FmZVRleHQobGluZS5UeXBlVmFsdWVDb2RlID8/IGxpbmUudHlwZVZhbHVlQ29kZSA/PyBsaW5lLlR5cGVWYWx1ZSA/PyBsaW5lLnR5cGVWYWx1ZSk7XG4gIGNvbnN0IHR5cGVWYWx1ZUxhYmVsID0gc2FmZVRleHQobGluZS5UeXBlVmFsdWUgPz8gbGluZS50eXBlVmFsdWUpO1xuICBjb25zdCBleHBsaWNpdExpbmVSZWNJZCA9IHNhZmVUZXh0KGxpbmUuTGluZVJlY0lkID8/IGxpbmUubGluZVJlY0lkKTtcblxuICByZXR1cm4ge1xuICAgIGxpbmVSZWNJZDogZXhwbGljaXRMaW5lUmVjSWQgfHwgc2FmZVRleHQobGluZS5SZWNJZCA/PyBsaW5lLnJlY0lkKSxcbiAgICB0cmFuc0RhdGU6IHNhZmVUZXh0KGxpbmUuVHJhbnNEYXRlID8/IGxpbmUudHJhbnNEYXRlKSxcbiAgICB0eXBlVmFsdWVDb2RlLFxuICAgIHR5cGVWYWx1ZTogdHlwZVZhbHVlTGFiZWwgJiYgdHlwZVZhbHVlTGFiZWwgIT09IHR5cGVWYWx1ZUNvZGUgPyB0eXBlVmFsdWVMYWJlbCA6IHJlc29sdmVUeXBlTGFiZWwodHlwZVZhbHVlQ29kZSksXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KGxpbmUuRGVzY3JpcHRpb24gPz8gbGluZS5kZXNjcmlwdGlvbiksXG4gICAgaW50ZXJuYWNpb25hbDogdG9OdWxsYWJsZUJvb2wobGluZS5JbnRlcm5hY2lvbmFsID8/IGxpbmUuaW50ZXJuYWNpb25hbCksXG4gICAgZmlsZUlkOiBzYWZlVGV4dChsaW5lLkZpbGVJZCA/PyBsaW5lLmZpbGVJZCksXG4gICAgdGlja2V0OiB0b051bGxhYmxlQm9vbChsaW5lLlRpY2tldCA/PyBsaW5lLnRpY2tldCksXG4gICAgcHJpY2U6IHRvTnVsbGFibGVOdW1iZXIobGluZS5QcmljZSA/PyBsaW5lLnByaWNlKSxcbiAgICBxdHk6IHRvTnVsbGFibGVOdW1iZXIobGluZS5RdHkgPz8gbGluZS5xdHkpLFxuICAgIGFtb3VudDogdG9OdWxsYWJsZU51bWJlcihsaW5lLkFtb3VudCA/PyBsaW5lLmFtb3VudCksXG4gICAgcHJvaklkOiBzYWZlVGV4dChsaW5lLlByb2pJZCA/PyBsaW5lLnByb2pJZCksXG4gICAgcmVpbWJ1cnNhYmxlRXhwZW5zZTogdG9OdWxsYWJsZU51bWJlcihsaW5lLlJlaW1idXJzYWJsZUV4cGVuc2UgPz8gbGluZS5yZWltYnVyc2FibGVFeHBlbnNlKSxcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGxpbmUuQ3VycmVuY3lDb2RlID8/IGxpbmUuY3VycmVuY3lDb2RlKSxcbiAgICBhbW91bnRNU1Q6IHRvTnVsbGFibGVOdW1iZXIobGluZS5BbW91bnRNU1QgPz8gbGluZS5hbW91bnRNU1QpLFxuICAgIGV4Y2hSYXRlOiB0b051bGxhYmxlTnVtYmVyKGxpbmUuRXhjaFJhdGUgPz8gbGluZS5leGNoUmF0ZSksXG4gICAgaW5kQXR0YWNoRmlsZXM6IHNhZmVUZXh0KGxpbmUuSW5kQXR0YWNoRmlsZXMgPz8gbGluZS5pbmRBdHRhY2hGaWxlcyksXG4gIH07XG59O1xuIiwgImltcG9ydCB7IHBhcnNlRXhwZW5zZUFwaURhdGUgfSBmcm9tIFwiLi9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBFeHBlbnNlRGF0ZVBhcnRzID0ge1xyXG4gIHllYXI6IHN0cmluZztcclxuICBtb250aDogc3RyaW5nO1xyXG4gIGRheTogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBQYXJzZUV4cGVuc2VEYXRlT3B0aW9ucyA9IHtcclxuICBwcmVmZXJNb250aEZpcnN0T25TbGFzaD86IGJvb2xlYW47XHJcbn07XHJcblxyXG5jb25zdCBCQVNRVUVfTU9OVEhTX1NIT1JUID0gW1xyXG4gIFwidXJ0XCIsXHJcbiAgXCJvdHNcIixcclxuICBcIm1hclwiLFxyXG4gIFwiYXBpXCIsXHJcbiAgXCJtYWlcIixcclxuICBcImVrYVwiLFxyXG4gIFwidXp0XCIsXHJcbiAgXCJhYnVcIixcclxuICBcImlyYVwiLFxyXG4gIFwidXJyXCIsXHJcbiAgXCJhemFcIixcclxuICBcImFiZVwiLFxyXG5dO1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVWlMb2NhbGUgPSAobG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKGxvY2FsZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiZXMtRVNcIjtcclxuICBpZiAoL156aC1oYW5zL2kudGVzdCh2YWx1ZSkpIHJldHVybiBcInpoLUNOXCI7XHJcbiAgcmV0dXJuIHZhbHVlO1xyXG59O1xyXG5cclxuY29uc3QgaXNCYXNxdWVMb2NhbGUgPSAobG9jYWxlOiBzdHJpbmcpOiBib29sZWFuID0+IC9eZXVcXGIvaS50ZXN0KFN0cmluZyhsb2NhbGUgfHwgXCJcIikpO1xyXG5cclxuLy8gTm9ybWFsaXplIHVua25vd24gdmFsdWVzIHRvIGEgdHJpbW1lZCBzdHJpbmcuXHJcbmV4cG9ydCBjb25zdCBzYWZlVGV4dCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xyXG4gIHJldHVybiBTdHJpbmcodmFsdWUpLnRyaW0oKTtcclxufTtcclxuXHJcbi8vIENsZWFucyBjaGF0IHRleHQgd2hpbGUgcHJlc2VydmluZyBhY2NlbnRzIGFuZCByZWFkYWJsZSBwdW5jdHVhdGlvbi5cclxuZXhwb3J0IGNvbnN0IHNhbml0aXplQXNzaXN0YW50VGV4dCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgc291cmNlID0gc2FmZVRleHQodmFsdWUpO1xyXG4gIGlmICghc291cmNlKSByZXR1cm4gXCJcIjtcclxuXHJcbiAgcmV0dXJuIHNvdXJjZVxyXG4gICAgLm5vcm1hbGl6ZShcIk5GQ1wiKVxyXG4gICAgLnJlcGxhY2UoL1xcdUZFRkYvZywgXCJcIilcclxuICAgIC5yZXBsYWNlKC9bXFx1MDAwMC1cXHUwMDA4XFx1MDAwQlxcdTAwMENcXHUwMDBFLVxcdTAwMUZcXHUwMDdGXS9nLCBcIlwiKVxyXG4gICAgLnJlcGxhY2UoL1tcXHUyMDBCLVxcdTIwMERcXHUyMDYwXS9nLCBcIlwiKVxyXG4gICAgLnJlcGxhY2UoL1xcclxcbj8vZywgXCJcXG5cIilcclxuICAgIC5yZXBsYWNlKC9bIFxcdF0rXFxuL2csIFwiXFxuXCIpXHJcbiAgICAucmVwbGFjZSgvXFxuezMsfS9nLCBcIlxcblxcblwiKVxyXG4gICAgLnRyaW0oKTtcclxufTtcclxuXHJcbi8vIE5vcm1hbGl6ZXMgY2FyZCB0aXRsZSB0ZXh0IG9ubHkgd2hlbiBpdCBjb21lcyBpbiBmdWxsIHVwcGVyIG9yIGZ1bGwgbG93ZXIgY2FzZS5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUNhcmRUaXRsZVRleHQgPSAodmFsdWU6IHVua25vd24sIGZhbGxiYWNrID0gXCItXCIpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHNvdXJjZSA9IHNhZmVUZXh0KHZhbHVlKTtcclxuICBpZiAoIXNvdXJjZSkgcmV0dXJuIGZhbGxiYWNrO1xyXG5cclxuICBjb25zdCBoYXNMZXR0ZXJzID0gL1tBLVphLXpcdTAwQzAtXHUwMEQ2XHUwMEQ4LVx1MDBGNlx1MDBGOC1cdTAwRkZdLy50ZXN0KHNvdXJjZSk7XHJcbiAgaWYgKCFoYXNMZXR0ZXJzKSByZXR1cm4gc291cmNlO1xyXG5cclxuICBjb25zdCBpc0FsbFVwcGVyID0gc291cmNlID09PSBzb3VyY2UudG9VcHBlckNhc2UoKSAmJiBzb3VyY2UgIT09IHNvdXJjZS50b0xvd2VyQ2FzZSgpO1xyXG4gIGNvbnN0IGlzQWxsTG93ZXIgPSBzb3VyY2UgPT09IHNvdXJjZS50b0xvd2VyQ2FzZSgpICYmIHNvdXJjZSAhPT0gc291cmNlLnRvVXBwZXJDYXNlKCk7XHJcbiAgaWYgKCFpc0FsbFVwcGVyICYmICFpc0FsbExvd2VyKSB7XHJcbiAgICByZXR1cm4gc291cmNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbG93ZXIgPSBzb3VyY2UudG9Mb3dlckNhc2UoKTtcclxuICByZXR1cm4gYCR7bG93ZXIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCl9JHtsb3dlci5zbGljZSgxKX1gO1xyXG59O1xyXG5cclxuLy8gUmV0dXJucyB0cnVlIG9ubHkgd2hlbiB2b3VjaGVyIGhhcyBhIG1lYW5pbmdmdWwgYXNzaWduZWQgdmFsdWUuXHJcbmV4cG9ydCBjb25zdCBoYXNBc3NpZ25lZFZvdWNoZXIgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICBjb25zdCB2b3VjaGVyID0gc2FmZVRleHQodmFsdWUpLnRvVXBwZXJDYXNlKCk7XHJcbiAgaWYgKCF2b3VjaGVyKSByZXR1cm4gZmFsc2U7XHJcbiAgcmV0dXJuIHZvdWNoZXIgIT09IFwiLVwiICYmIHZvdWNoZXIgIT09IFwiLlwiICYmIHZvdWNoZXIgIT09IFwiMFwiO1xyXG59O1xyXG5cclxuLy8gUmV0dXJuIGRhdGUgYXQgbG9jYWwgZGF5IHN0YXJ0LlxyXG5leHBvcnQgY29uc3Qgc3RhcnRPZkRheSA9IChkYXRlOiBEYXRlKTogRGF0ZSA9PiB7XHJcbiAgcmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSk7XHJcbn07XHJcblxyXG4vLyBGb3JtYXQgbG9jYWwgZGF0ZSB0byB5eXl5LU1NLWRkLlxyXG5leHBvcnQgY29uc3QgdG9Jc29EYXRlID0gKGRhdGU6IERhdGUpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBgJHtkYXRlLmdldEZ1bGxZZWFyKCl9LSR7U3RyaW5nKGRhdGUuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKX0tJHtTdHJpbmcoZGF0ZS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKX1gO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlRGF0ZSA9ICh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKTogRGF0ZSB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IGNhbmRpZGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcclxuICBpZiAoXHJcbiAgICBOdW1iZXIuaXNOYU4oY2FuZGlkYXRlLmdldFRpbWUoKSkgfHxcclxuICAgIGNhbmRpZGF0ZS5nZXRGdWxsWWVhcigpICE9PSB5ZWFyIHx8XHJcbiAgICBjYW5kaWRhdGUuZ2V0TW9udGgoKSAhPT0gbW9udGggLSAxIHx8XHJcbiAgICBjYW5kaWRhdGUuZ2V0RGF0ZSgpICE9PSBkYXlcclxuICApIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGNhbmRpZGF0ZTtcclxufTtcclxuXHJcbi8vIFBhcnNlIHN1cHBvcnRlZCBBUEkgZGF0ZSBmb3JtYXRzLlxyXG5leHBvcnQgY29uc3QgcGFyc2VFeHBlbnNlRGF0ZSA9IChyYXc/OiBzdHJpbmcsIG9wdGlvbnM/OiBQYXJzZUV4cGVuc2VEYXRlT3B0aW9ucyk6IERhdGUgfCBudWxsID0+IHtcclxuICBpZiAoIXJhdykgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcocmF3KS50cmltKCk7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IGRhdGVPbmx5ID0gdmFsdWUuc3BsaXQoXCJUXCIpWzBdLnNwbGl0KFwiIFwiKVswXTtcclxuXHJcbiAgLy8gS2VlcCBvcHRpb25hbCBtb250aC1maXJzdCBjb21wYXRpYmlsaXR5IGZvciBsZWdhY3kgc2xhc2ggZGF0ZXMgaW4gY2FyZHMuXHJcbiAgaWYgKG9wdGlvbnM/LnByZWZlck1vbnRoRmlyc3RPblNsYXNoICYmIC9eXFxkezJ9XFwvXFxkezJ9XFwvXFxkezR9JC8udGVzdChkYXRlT25seSkpIHtcclxuICAgIGNvbnN0IFtmaXJzdFBhcnQsIHNlY29uZFBhcnQsIHllYXJQYXJ0XSA9IGRhdGVPbmx5LnNwbGl0KC9bLi8tXS8pO1xyXG4gICAgY29uc3QgZmlyc3QgPSBOdW1iZXIoZmlyc3RQYXJ0KTtcclxuICAgIGNvbnN0IHNlY29uZCA9IE51bWJlcihzZWNvbmRQYXJ0KTtcclxuICAgIGNvbnN0IHllYXIgPSBOdW1iZXIoeWVhclBhcnQpO1xyXG4gICAgY29uc3QgbW9udGhGaXJzdERhdGUgPSBidWlsZEV4cGVuc2VEYXRlKHllYXIsIGZpcnN0LCBzZWNvbmQpO1xyXG4gICAgaWYgKG1vbnRoRmlyc3REYXRlKSB7XHJcbiAgICAgIHJldHVybiBtb250aEZpcnN0RGF0ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBwYXJzZUV4cGVuc2VBcGlEYXRlKHZhbHVlKTtcclxufTtcclxuXHJcbi8vIEZvcm1hdCBhIGRhdGUgZm9yIHJlYWQtb25seSBmaWVsZHMgdXNpbmcgdGhlIHNhbWUgb3V0cHV0IHN0eWxlIGFzIHZpc2l0cy5cclxuZXhwb3J0IGNvbnN0IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSA9IChyYXc/OiBzdHJpbmcsIGxvY2FsZSA9IFwiZXMtRVNcIiwgZmFsbGJhY2sgPSBcIi1cIik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgZGF0ZSA9IHBhcnNlRXhwZW5zZURhdGUocmF3KTtcclxuICBpZiAoIWRhdGUpIHJldHVybiBmYWxsYmFjaztcclxuXHJcbiAgY29uc3Qgc2FmZUxvY2FsZSA9IG5vcm1hbGl6ZVVpTG9jYWxlKGxvY2FsZSk7XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKHNhZmVMb2NhbGUpKSB7XHJcbiAgICByZXR1cm4gYCR7ZGF0ZS5nZXREYXRlKCl9ICR7QkFTUVVFX01PTlRIU19TSE9SVFtkYXRlLmdldE1vbnRoKCldfSAke2RhdGUuZ2V0RnVsbFllYXIoKX1gLnRvTG93ZXJDYXNlKCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZGF0ZVxyXG4gICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhzYWZlTG9jYWxlLCB7XHJcbiAgICAgIGRheTogXCJudW1lcmljXCIsXHJcbiAgICAgIG1vbnRoOiBcInNob3J0XCIsXHJcbiAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxyXG4gICAgfSlcclxuICAgIC5yZXBsYWNlKC9cXC4vZywgXCJcIilcclxuICAgIC50b0xvd2VyQ2FzZSgpO1xyXG59O1xyXG5cclxuLy8gQnVpbGQgdGltZWxpbmUgZGF0ZSBmcmFnbWVudHMgZm9yIGNhcmQgbGVmdCBwYW5lbC5cclxuZXhwb3J0IGNvbnN0IGZvcm1hdEV4cGVuc2VEYXRlUGFydHMgPSAocmF3Pzogc3RyaW5nLCBsb2NhbGUgPSBcImVzLUVTXCIsIG9wdGlvbnM/OiBQYXJzZUV4cGVuc2VEYXRlT3B0aW9ucyk6IEV4cGVuc2VEYXRlUGFydHMgPT4ge1xyXG4gIGNvbnN0IGRhdGUgPSBwYXJzZUV4cGVuc2VEYXRlKHJhdywgb3B0aW9ucyk7XHJcbiAgaWYgKCFkYXRlKSB7XHJcbiAgICByZXR1cm4geyB5ZWFyOiBcIlwiLCBtb250aDogXCJcIiwgZGF5OiBcIi0tXCIgfTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB5ZWFyOiBTdHJpbmcoZGF0ZS5nZXRGdWxsWWVhcigpKSxcclxuICAgIG1vbnRoOiBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgbW9udGg6IFwic2hvcnRcIiB9KS5yZXBsYWNlKC9cXC4vZywgXCJcIikudG9VcHBlckNhc2UoKSxcclxuICAgIGRheTogU3RyaW5nKGRhdGUuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIiksXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHRvTnVsbGFibGVOdW1iZXIgfSBmcm9tIFwiLi9leHBlbnNlQXBpVHJhbnNmb3Jtcy50c1wiO1xuXG50eXBlIFRpY2tldExpbmVBbW91bnRJbnB1dCA9IHtcbiAgcXR5PzogdW5rbm93bjtcbiAgcHJpY2U/OiB1bmtub3duO1xuICB0b3RhbEFtb3VudD86IHVua25vd247XG59O1xuXG4vLyBSZXNvbHZlcyB0aGUgc2lnbmVkIHRpY2tldCBsaW5lIGFtb3VudCwgcHJlc2VydmluZyB6ZXJvLXF1YW50aXR5IGRpc2NvdW50IGxpbmVzLlxuZXhwb3J0IGNvbnN0IHJlc29sdmVUaWNrZXRMaW5lQW1vdW50ID0gKGxpbmU6IFRpY2tldExpbmVBbW91bnRJbnB1dCB8IG51bGwgfCB1bmRlZmluZWQpOiBudW1iZXIgfCBudWxsID0+IHtcbiAgaWYgKCFsaW5lKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBleHBsaWNpdFRvdGFsID0gdG9OdWxsYWJsZU51bWJlcihsaW5lLnRvdGFsQW1vdW50KTtcbiAgaWYgKGV4cGxpY2l0VG90YWwgIT09IG51bGwpIHtcbiAgICByZXR1cm4gZXhwbGljaXRUb3RhbDtcbiAgfVxuXG4gIGNvbnN0IHF0eSA9IHRvTnVsbGFibGVOdW1iZXIobGluZS5xdHkpO1xuICBjb25zdCBwcmljZSA9IHRvTnVsbGFibGVOdW1iZXIobGluZS5wcmljZSk7XG4gIGlmIChxdHkgPT09IG51bGwgfHwgcHJpY2UgPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChxdHkgPT09IDAgJiYgcHJpY2UgPCAwKSB7XG4gICAgcmV0dXJuIHByaWNlO1xuICB9XG5cbiAgcmV0dXJuIHF0eSAqIHByaWNlO1xufTtcblxuLy8gVmFsaWRhdGVzIHRpY2tldCBsaW5lIGFtb3VudHMgd2hpbGUgYWxsb3dpbmcgcXR5PTAgb25seSBmb3IgbmVnYXRpdmUgZGlzY291bnRzLlxuZXhwb3J0IGNvbnN0IGlzVmFsaWRUaWNrZXRMaW5lQW1vdW50ID0gKGxpbmU6IFRpY2tldExpbmVBbW91bnRJbnB1dCB8IG51bGwgfCB1bmRlZmluZWQpOiBib29sZWFuID0+IHtcbiAgY29uc3QgcXR5ID0gdG9OdWxsYWJsZU51bWJlcihsaW5lPy5xdHkpO1xuICBjb25zdCBwcmljZSA9IHRvTnVsbGFibGVOdW1iZXIobGluZT8ucHJpY2UpO1xuICBpZiAocXR5ID09PSBudWxsIHx8IHByaWNlID09PSBudWxsIHx8IHF0eSA8IDAgfHwgcHJpY2UgPT09IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAocXR5ID4gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY29uc3QgbGluZUFtb3VudCA9IHJlc29sdmVUaWNrZXRMaW5lQW1vdW50KGxpbmUpO1xuICByZXR1cm4gbGluZUFtb3VudCAhPT0gbnVsbCAmJiBsaW5lQW1vdW50IDwgMDtcbn07XG4iLCAiaW1wb3J0IHtcclxuICBBcGlGZXRjaEVycm9yLFxyXG4gIGZldGNoSnNvbixcclxuICBnZXRDc3JmVG9rZW4sXHJcbiAgaGFuZGxlQXBpQXV0aEZhaWx1cmUsXHJcbiAgcmVhZEFwaU1lc3NhZ2VGcm9tUmF3LFxyXG4gIHR5cGUgQXBpRmV0Y2hPcHRpb25zLFxyXG59IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB0eXBlIHtcclxuICBFbnRyYUNvbnRleHREdG8sXHJcbiAgRW50cmFDb250ZXh0UmVxdWVzdCxcclxuICBFeGNoYW5nZVJhdGVEdG8sXHJcbiAgRnVlbFByaWNlS21EdG8sXHJcbiAgRXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8sXHJcbiAgRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRDcmVhdGVSZXNwb25zZURhdGEsXHJcbiAgRXhwZW5zZVNoZWV0RGV0YWlsRHRvLFxyXG4gIEV4cGVuc2VTaGVldERyYWZ0UmVzcG9uc2UsXHJcbiAgRXhwZW5zZVNoZWV0SGVhZGVyVXBkYXRlUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRMaW5lRHRvLFxyXG4gIEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXNwb25zZURhdGEsXHJcbiAgRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8sXHJcbiAgRXhwZW5zZVNoZWV0TGlzdFJlc3BvbnNlRW52ZWxvcGUsXHJcbiAgRXhwZW5zZVNoZWV0c0Fza1JlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0c0Fza1Jlc3BvbnNlRGF0YSxcclxuICBFeHBlbnNlU2hlZXRzQXNrUmVzdWx0LFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldENyZWF0ZVJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdEl0ZW1EdG8sXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlc3VsdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5lUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0byxcclxuICBJbmRBcGlSZXNwb25zZSxcclxuICBJbmRQYWdlZFJlc3BvbnNlLFxyXG59IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHtcclxuICBpc05vbk5lZ2F0aXZlTnVtYmVyIGFzIGlzTm9uTmVnYXRpdmVOdW1iZXJUcmFuc2Zvcm0sXHJcbiAgaXNQb3NpdGl2ZU51bWJlciBhcyBpc1Bvc2l0aXZlTnVtYmVyVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXIgYXMgbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlclRyYW5zZm9ybSxcclxuICBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZSBhcyBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUkgYXMgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRQcm9jZXNzZWRCeUFJVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzIGFzIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZSBhcyBub3JtYWxpemVPcHRpb25hbEFwaURhdGVUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlIGFzIG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZSBhcyBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVUaWNrZXRMaXN0R2FzdG9UeXBlIGFzIG5vcm1hbGl6ZVRpY2tldExpc3RHYXN0b1R5cGVUcmFuc2Zvcm0sXHJcbiAgc2FmZVRleHQgYXMgc2FmZVRleHRUcmFuc2Zvcm0sXHJcbiAgdG9GbGFnQm9vbCBhcyB0b0ZsYWdCb29sVHJhbnNmb3JtLFxyXG4gIHRvTnVsbGFibGVCb29sIGFzIHRvTnVsbGFibGVCb29sVHJhbnNmb3JtLFxyXG4gIHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlIGFzIHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlVHJhbnNmb3JtLFxyXG4gIHRvTnVsbGFibGVOdW1iZXIgYXMgdG9OdWxsYWJsZU51bWJlclRyYW5zZm9ybSxcclxuICB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZSBhcyB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZVRyYW5zZm9ybSxcclxufSBmcm9tIFwiLi9leHBlbnNlQXBpVHJhbnNmb3Jtcy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIG5vcm1hbGl6ZUFwaVJlc3BvbnNlIGFzIG5vcm1hbGl6ZUFwaVJlc3BvbnNlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlIGFzIG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZVN1Ym9yZGluYXRlc1BhZ2VkUmVzcG9uc2UgYXMgbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVUaWNrZXRMaW5rQnVsa1Jlc3BvbnNlIGFzIG5vcm1hbGl6ZVRpY2tldExpbmtCdWxrUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplVGlja2V0TGlua0xpc3RQYWdlZFJlc3BvbnNlIGFzIG5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlIGFzIG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZSBhcyBub3JtYWxpemVUaWNrZXRRdWlja0NyZWF0ZVJlc3BvbnNlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlIGFzIG5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxyXG59IGZyb20gXCIuL2V4cGVuc2VBcGlSZXNwb25zZU5vcm1hbGl6ZXJzLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgbWFwRXhwZW5zZVNoZWV0SGVhZGVyIGFzIG1hcEV4cGVuc2VTaGVldEhlYWRlckNvcmUsXHJcbiAgbWFwRXhwZW5zZVNoZWV0TGluZSBhcyBtYXBFeHBlbnNlU2hlZXRMaW5lQ29yZSxcclxuICBtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZCBhcyBtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZENvcmUsXHJcbn0gZnJvbSBcIi4vZXhwZW5zZUFwaU1hcHBlcnMudHNcIjtcclxuaW1wb3J0IHsgc2FuaXRpemVBc3Npc3RhbnRUZXh0IH0gZnJvbSBcIi4vZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UgfSBmcm9tIFwiLi9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBpc1ZhbGlkVGlja2V0TGluZUFtb3VudCB9IGZyb20gXCIuL2V4cGVuc2VUaWNrZXRMaW5lQW1vdW50LnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlIH0gZnJvbSBcIi4vZXhwZW5zZUFjdGluZ1VzZXIudHNcIjtcbmltcG9ydCB7IHJlc29sdmVFZmZlY3RpdmVDb21wYW55SWQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY29tcGFueVNlbGVjdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuXHJcbnR5cGUgUHJvamVjdERyb3Bkb3duT3B0aW9uID0ge1xuICB2YWx1ZT86IHN0cmluZztcbiAgVmFsdWU/OiBzdHJpbmc7XG4gIHRleHQ/OiBzdHJpbmc7XG4gIFRleHQ/OiBzdHJpbmc7XG4gIHByb2pJZD86IHN0cmluZztcbiAgUHJvaklkPzogc3RyaW5nO1xuICBuYW1lPzogc3RyaW5nO1xuICBOYW1lPzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgRGVzY3JpcHRpb24/OiBzdHJpbmc7XG59O1xuXG50eXBlIFByb2plY3REcm9wZG93blJlc3BvbnNlID0ge1xuICB0b3RhbD86IG51bWJlcjtcbiAgVG90YWw/OiBudW1iZXI7XG4gIGl0ZW1zPzogUHJvamVjdERyb3Bkb3duT3B0aW9uW107XG4gIEl0ZW1zPzogUHJvamVjdERyb3Bkb3duT3B0aW9uW107XG59O1xuXHJcbnR5cGUgTGVnYWN5RXhwZW5zZUxpc3RJdGVtID0ge1xyXG4gIGhvamFHYXN0b3NJZD86IHVua25vd247XHJcbiAgZGVzY3JpcHRpb24/OiB1bmtub3duO1xyXG4gIGVzdGFkb0NvbWVudGFyaW9zPzogdW5rbm93bjtcclxuICB2b3VjaGVyPzogdW5rbm93bjtcclxuICBwcm9qSWQ/OiB1bmtub3duO1xyXG4gIGN1cnJlbmN5Q29kZT86IHVua25vd247XHJcbiAgdG90YWxBbW91bnQ/OiB1bmtub3duO1xyXG4gIHRvdGFsQW1vdW50TVNUPzogdW5rbm93bjtcclxuICBleGNoUmF0ZT86IHVua25vd247XHJcbiAgdXNlcklkPzogdW5rbm93bjtcbiAgdXNlck5hbWU/OiB1bmtub3duO1xuICBvd25lckF4VXNlcklkPzogdW5rbm93bjtcbiAgb3duZXJOYW1lPzogdW5rbm93bjtcbiAgZXhjaGFuZ2VSYXRlTW9kZT86IHVua25vd247XG4gIHJlaW1idXJzYWJsZUV4cGVuc2U/OiB1bmtub3duO1xuICBleHBlbnNlU2hlZXRTdGF0dXM/OiB1bmtub3duO1xuICBjcmVhdGVkRGF0ZT86IHVua25vd247XG59O1xuXHJcbnR5cGUgTGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZSA9IHtcclxuICBzdWNjZXNzPzogYm9vbGVhbjtcclxuICBtZXNzYWdlPzogc3RyaW5nO1xyXG4gIHRvdGFsPzogbnVtYmVyO1xyXG4gIHBhZ2U/OiBudW1iZXI7XHJcbiAgcGFnZVNpemU/OiBudW1iZXI7XHJcbiAgaXRlbXM/OiBMZWdhY3lFeHBlbnNlTGlzdEl0ZW1bXTtcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZUFwaUNvbnRleHQgPSB7XHJcbiAgdG9rZW46IHN0cmluZztcclxuICBjb21wYW55SWQ6IHN0cmluZztcclxuICBheFVzZXJJZDogc3RyaW5nO1xyXG4gIGNybVVzZXJJZDogc3RyaW5nO1xyXG4gIGRlZmF1bHRDdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgRXhwZW5zZUFwaUNvbnRleHRTbmFwc2hvdCA9IHtcclxuICBjb21wYW55SWQ6IHN0cmluZztcclxuICBheFVzZXJJZDogc3RyaW5nO1xyXG4gIGNybVVzZXJJZDogc3RyaW5nO1xyXG4gIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGJvb2xlYW47XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VBcGlBdXRoU2VlZCA9IHtcclxuICB0b2tlbjogc3RyaW5nO1xyXG4gIGVudHJhT2lkOiBzdHJpbmc7XHJcbiAgYXBwQ29kZTogc3RyaW5nO1xyXG4gIHN0cmljdEFwaVJvdXRlczogYm9vbGVhbjtcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZVdpbmRvd1J1bnRpbWUgPSB7XHJcbiAgX19JTkRfQVBJX1RPS0VOX18/OiBzdHJpbmc7XHJcbiAgX19JTkRfRU5UUkFfT0lEX18/OiBzdHJpbmc7XHJcbiAgX19JTkRfQVBQX0NPREVfXz86IHN0cmluZztcclxuICBfX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18/OiBzdHJpbmc7XHJcbiAgX19JTkRfRVhQRU5TRV9TVFJJQ1RfQVBJX18/OiBib29sZWFuIHwgc3RyaW5nO1xyXG4gIF9fRVhQRU5TRV9HQVNUT19UWVBFU19fPzogQXJyYXk8e1xyXG4gICAgdmFsdWU/OiB1bmtub3duO1xyXG4gICAgVmFsdWU/OiB1bmtub3duO1xyXG4gICAgdGV4dD86IHVua25vd247XHJcbiAgICBUZXh0PzogdW5rbm93bjtcclxuICB9PjtcclxufTtcclxuXHJcbmNvbnN0IERFRkFVTFRfQVBQX0NPREUgPSBcIkNSTVwiO1xyXG5jb25zdCBKU09OX0hFQURFUlM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbn07XHJcblxyXG5sZXQgcnVudGltZUF1dGhTZWVkOiBQYXJ0aWFsPEV4cGVuc2VBcGlBdXRoU2VlZD4gPSB7fTtcclxubGV0IGNhY2hlZENvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0IHwgbnVsbCA9IG51bGw7XHJcbmxldCBjYWNoZWRDb250ZXh0S2V5ID0gXCJcIjtcclxubGV0IGNvbnRleHRQcm9taXNlOiBQcm9taXNlPEV4cGVuc2VBcGlDb250ZXh0PiB8IG51bGwgPSBudWxsO1xyXG5jb25zdCBjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcyA9IG5ldyBNYXA8c3RyaW5nLCBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj4oKTtcclxuY29uc3QgcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMgPSBuZXcgTWFwPHN0cmluZywgUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj4+KCk7XHJcblxyXG5jb25zdCBzYWZlVGV4dCA9IHNhZmVUZXh0VHJhbnNmb3JtO1xyXG5cclxuY29uc3QgdG9OdWxsYWJsZU51bWJlciA9IHRvTnVsbGFibGVOdW1iZXJUcmFuc2Zvcm07XG5jb25zdCBpc05vbk5lZ2F0aXZlTnVtYmVyID0gaXNOb25OZWdhdGl2ZU51bWJlclRyYW5zZm9ybTtcbmNvbnN0IGlzUG9zaXRpdmVOdW1iZXIgPSBpc1Bvc2l0aXZlTnVtYmVyVHJhbnNmb3JtO1xuY29uc3QgdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGUgPSB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZVRyYW5zZm9ybTtcbmNvbnN0IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlID0gdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGVUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlID0gbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGVUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpc3RHYXN0b1R5cGUgPSBub3JtYWxpemVUaWNrZXRMaXN0R2FzdG9UeXBlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1cyA9IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVPcHRpb25hbEFwaURhdGUgPSBub3JtYWxpemVPcHRpb25hbEFwaURhdGVUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZSA9IG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdERhdGUgPSBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZVRyYW5zZm9ybTtcclxuY29uc3QgdG9OdWxsYWJsZUJvb2wgPSB0b051bGxhYmxlQm9vbFRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRQcm9jZXNzZWRCeUFJID0gbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRQcm9jZXNzZWRCeUFJVHJhbnNmb3JtO1xuY29uc3Qgbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlciA9IG5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXJUcmFuc2Zvcm07XG5jb25zdCB0b0ZsYWdCb29sID0gdG9GbGFnQm9vbFRyYW5zZm9ybTtcblxuY29uc3Qgbm9ybWFsaXplRXhwZW5zZVNoZWV0UmVpbWJ1cnNhYmxlID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHRvTnVsbGFibGVOdW1iZXIodmFsdWUpO1xuICBpZiAocGFyc2VkID09PSBudWxsIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgfHwgcGFyc2VkIDwgMCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG5cbmNvbnN0IHJlYWRFeHBlbnNlV2luZG93UnVudGltZSA9ICgpOiBFeHBlbnNlV2luZG93UnVudGltZSA9PiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4ge307XHJcbiAgcmV0dXJuIHdpbmRvdyBhcyB1bmtub3duIGFzIEV4cGVuc2VXaW5kb3dSdW50aW1lO1xyXG59O1xyXG5cclxuY29uc3Qgc2FuaXRpemVIZWFkZXJzID0gKGhlYWRlcnM6IEhlYWRlcnNJbml0IHwgdW5kZWZpbmVkKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9PiB7XHJcbiAgaWYgKCFoZWFkZXJzKSByZXR1cm4ge307XHJcblxyXG4gIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xyXG4gICAgY29uc3QgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XHJcbiAgICBoZWFkZXJzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcclxuICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIGlmIChBcnJheS5pc0FycmF5KGhlYWRlcnMpKSB7XHJcbiAgICByZXR1cm4gaGVhZGVycy5yZWR1Y2U8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4oKGFjYywgW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgIGFjY1tTdHJpbmcoa2V5KV0gPSBTdHJpbmcodmFsdWUpO1xyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwge30pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGhlYWRlcnMpLnJlZHVjZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PigoYWNjLCBba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSByZXR1cm4gYWNjO1xyXG4gICAgYWNjW2tleV0gPSBTdHJpbmcodmFsdWUpO1xyXG4gICAgcmV0dXJuIGFjYztcclxuICB9LCB7fSk7XHJcbn07XHJcblxyXG5jb25zdCBnZXRIZWFkZXJWYWx1ZSA9IChoZWFkZXJzOiBIZWFkZXJzSW5pdCB8IHVuZGVmaW5lZCwga2V5OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRLZXkgPSBrZXkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHNhbml0aXplSGVhZGVycyhoZWFkZXJzKSk7XHJcbiAgY29uc3QgbWF0Y2ggPSBlbnRyaWVzLmZpbmQoKFtoZWFkZXJLZXldKSA9PiBoZWFkZXJLZXkudHJpbSgpLnRvTG93ZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRLZXkpO1xyXG4gIHJldHVybiBzYWZlVGV4dChtYXRjaD8uWzFdKTtcclxufTtcclxuXHJcbmNvbnN0IHJlbW92ZUhlYWRlclZhbHVlID0gKGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sIGtleTogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEtleSA9IGtleS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICBjb25zdCB0b0RlbGV0ZSA9IE9iamVjdC5rZXlzKGhlYWRlcnMpLmZpbmQoKGhlYWRlcktleSkgPT4gaGVhZGVyS2V5LnRyaW0oKS50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkS2V5KTtcclxuICBpZiAoIXRvRGVsZXRlKSByZXR1cm47XHJcbiAgZGVsZXRlIGhlYWRlcnNbdG9EZWxldGVdO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplQXhVc2VySWRIZWFkZXIgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBzYWZlVGV4dCh2YWx1ZSk7XHJcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gXCJcIjtcclxuICBpZiAoL14tXFxkKyQvLnRlc3Qobm9ybWFsaXplZCkpIHtcclxuICAgIHJldHVybiBub3JtYWxpemVkO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbGFiZWxTZXBhcmF0b3IgPSBub3JtYWxpemVkLmluZGV4T2YoXCIgLSBcIik7XHJcbiAgaWYgKGxhYmVsU2VwYXJhdG9yID4gMCkge1xyXG4gICAgcmV0dXJuIHNhZmVUZXh0KG5vcm1hbGl6ZWQuc2xpY2UoMCwgbGFiZWxTZXBhcmF0b3IpKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVkO1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZUJlYXJlclRva2VuID0gKGhlYWRlcnM6IEhlYWRlcnNJbml0IHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBhdXRob3JpemF0aW9uID0gZ2V0SGVhZGVyVmFsdWUoaGVhZGVycywgXCJBdXRob3JpemF0aW9uXCIpO1xyXG4gIGlmICghYXV0aG9yaXphdGlvbikgcmV0dXJuIFwiXCI7XHJcblxyXG4gIGlmICgvXmJlYXJlclxccysvaS50ZXN0KGF1dGhvcml6YXRpb24pKSB7XHJcbiAgICByZXR1cm4gYXV0aG9yaXphdGlvbi5yZXBsYWNlKC9eYmVhcmVyXFxzKy9pLCBcIlwiKS50cmltKCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYXV0aG9yaXphdGlvbi50cmltKCk7XHJcbn07XHJcblxyXG5jb25zdCByZWFkV2luZG93QXV0aFNlZWQgPSAoKTogUGFydGlhbDxFeHBlbnNlQXBpQXV0aFNlZWQ+ID0+IHtcclxuICBjb25zdCBydW50aW1lV2luZG93ID0gcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lKCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0b2tlbjogc2FmZVRleHQocnVudGltZVdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXHJcbiAgICBlbnRyYU9pZDogc2FmZVRleHQocnVudGltZVdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXHJcbiAgICBhcHBDb2RlOiBzYWZlVGV4dChydW50aW1lV2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxyXG4gICAgc3RyaWN0QXBpUm91dGVzOiB0b0ZsYWdCb29sKHJ1bnRpbWVXaW5kb3cuX19JTkRfRVhQRU5TRV9TVFJJQ1RfQVBJX18pID09PSB0cnVlLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCB0cnlQYXJzZUpzb24gPSAocmF3OiBzdHJpbmcpOiB1bmtub3duIHwgbnVsbCA9PiB7XHJcbiAgaWYgKCFyYXcgfHwgIXJhdy50cmltKCkpIHJldHVybiBudWxsO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShyYXcpO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlID0gPFQ+KHZhbHVlOiBUKTogVCA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHZhbHVlKSkgYXMgVDtcclxufTtcclxuXHJcbmNvbnN0IHJlYWRSdW50aW1lU3RyaWN0QXBpRmxhZyA9ICgpOiBib29sZWFuID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGZhbHNlO1xyXG4gIGNvbnN0IHJ1bnRpbWVXaW5kb3cgPSByZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUoKTtcclxuXHJcbiAgY29uc3QgZXhwbGljaXRXaW5kb3dGbGFnID0gdG9GbGFnQm9vbChydW50aW1lV2luZG93Ll9fSU5EX0VYUEVOU0VfU1RSSUNUX0FQSV9fKTtcclxuICByZXR1cm4gZXhwbGljaXRXaW5kb3dGbGFnID09PSB0cnVlO1xyXG59O1xyXG5cclxuY29uc3QgcmVhZFdpbmRvd1NlbGVjdGVkQ29tcGFueSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBzYWZlVGV4dChyZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUoKS5fX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18pLnRvVXBwZXJDYXNlKCk7XHJcbn07XHJcblxyXG4vLyBDcmVhdGVzIG9uZSBzdGFuZGFyZCBhYm9ydCBlcnJvciB3aXRob3V0IGNhbmNlbGxpbmcgdGhlIHNoYXJlZCB1bmRlcmx5aW5nIHJlcXVlc3QuXHJcbmNvbnN0IGNyZWF0ZUV4cGVuc2VBYm9ydEVycm9yID0gKCk6IERPTUV4Y2VwdGlvbiA9PiB7XHJcbiAgcmV0dXJuIG5ldyBET01FeGNlcHRpb24oXCJBYm9ydGVkXCIsIFwiQWJvcnRFcnJvclwiKTtcclxufTtcclxuXHJcbi8vIExldHMgb25lIGNhbGxlciBzdG9wIHdhaXRpbmcgb24gc2hhcmVkIGNvbnRleHQgcmVzb2x1dGlvbiB3aXRob3V0IGFib3J0aW5nIG90aGVyIGNvbnN1bWVycy5cclxuY29uc3Qgd2FpdEZvckFib3J0YWJsZUV4cGVuc2VSZXN1bHQgPSBhc3luYyA8VD4ocHJvbWlzZTogUHJvbWlzZTxUPiwgc2lnbmFsPzogQWJvcnRTaWduYWwpOiBQcm9taXNlPFQ+ID0+IHtcclxuICBpZiAoIXNpZ25hbCkgcmV0dXJuIHByb21pc2U7XHJcbiAgaWYgKHNpZ25hbC5hYm9ydGVkKSB7XHJcbiAgICB0aHJvdyBjcmVhdGVFeHBlbnNlQWJvcnRFcnJvcigpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGNvbnN0IGhhbmRsZUFib3J0ID0gKCkgPT4ge1xyXG4gICAgICBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGhhbmRsZUFib3J0KTtcclxuICAgICAgcmVqZWN0KGNyZWF0ZUV4cGVuc2VBYm9ydEVycm9yKCkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzaWduYWwuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGhhbmRsZUFib3J0LCB7IG9uY2U6IHRydWUgfSk7XHJcbiAgICBwcm9taXNlLnRoZW4oXHJcbiAgICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgaGFuZGxlQWJvcnQpO1xyXG4gICAgICAgIHJlc29sdmUodmFsdWUpO1xyXG4gICAgICB9LFxyXG4gICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGhhbmRsZUFib3J0KTtcclxuICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRDb250ZXh0S2V5ID0gKHNlZWQ6IEV4cGVuc2VBcGlBdXRoU2VlZCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIGAke3NlZWQudG9rZW59fCR7c2VlZC5lbnRyYU9pZH18JHtzZWVkLmFwcENvZGV9fCR7cmVhZFdpbmRvd1NlbGVjdGVkQ29tcGFueSgpfWA7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZEV4cGVuc2VIZWFkZXJzID0gKFxyXG4gIGNvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMsXHJcbiAgaW5jbHVkZUpzb24gPSBmYWxzZSxcclxuICBpbmNsdWRlQXhVc2VySWQgPSB0cnVlXHJcbik6IEhlYWRlcnNJbml0ID0+IHtcclxuICBjb25zdCBiYXNlID0gc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpO1xyXG4gIGNvbnN0IG1lcmdlZDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHsgLi4uYmFzZSB9O1xyXG5cclxuICBpZiAoc2FmZVRleHQoY29udGV4dC50b2tlbikpIHtcclxuICAgIG1lcmdlZC5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke2NvbnRleHQudG9rZW59YDtcclxuICB9XHJcblxyXG4gIGlmIChzYWZlVGV4dChjb250ZXh0LmNvbXBhbnlJZCkpIHtcclxuICAgIG1lcmdlZFtcIlgtSU5ELUNvbXBhbnlcIl0gPSBjb250ZXh0LmNvbXBhbnlJZDtcclxuICB9XHJcblxyXG4gIGlmIChpbmNsdWRlQXhVc2VySWQpIHtcclxuICAgIGNvbnN0IHJlcXVlc3RBeFVzZXJJZCA9IGdldEhlYWRlclZhbHVlKG9wdGlvbnM/LmhlYWRlcnMsIFwiWC1JTkQtQXhVc2VySWRcIik7XHJcbiAgICBjb25zdCBvdmVycmlkZUF4VXNlcklkID0gZ2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSgpO1xyXG4gICAgY29uc3QgcmVzb2x2ZWRBeFVzZXJJZCA9IHNhZmVUZXh0KHJlcXVlc3RBeFVzZXJJZCB8fCBvdmVycmlkZUF4VXNlcklkIHx8IGNvbnRleHQuYXhVc2VySWQpO1xyXG4gICAgaWYgKHJlc29sdmVkQXhVc2VySWQpIHtcclxuICAgICAgbWVyZ2VkW1wiWC1JTkQtQXhVc2VySWRcIl0gPSByZXNvbHZlZEF4VXNlcklkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVtb3ZlSGVhZGVyVmFsdWUobWVyZ2VkLCBcIlgtSU5ELUF4VXNlcklkXCIpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShtZXJnZWQsIFwiWC1JTkQtQXhVc2VySWRcIik7XHJcbiAgfVxyXG5cclxuICBpZiAoaW5jbHVkZUpzb24pIHtcclxuICAgIG1lcmdlZFtcIkNvbnRlbnQtVHlwZVwiXSA9IFwiYXBwbGljYXRpb24vanNvblwiO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1lcmdlZDtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkRXhwZW5zZUZvcm1IZWFkZXJzID0gKGNvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0LCBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogSGVhZGVyc0luaXQgPT4ge1xyXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMoYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCBmYWxzZSkpO1xyXG4gIHJlbW92ZUhlYWRlclZhbHVlKGhlYWRlcnMsIFwiQ29udGVudC1UeXBlXCIpO1xyXG4gIHJldHVybiBoZWFkZXJzO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRDb250ZXh0SGVhZGVycyA9ICh0b2tlbjogc3RyaW5nLCBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogSGVhZGVyc0luaXQgPT4ge1xyXG4gIGNvbnN0IGJhc2UgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XHJcbiAgY29uc3QgbWVyZ2VkOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICAgLi4uYmFzZSxcclxuICAgIC4uLkpTT05fSEVBREVSUyxcclxuICB9O1xyXG5cclxuICBpZiAoc2FmZVRleHQodG9rZW4pKSB7XHJcbiAgICBtZXJnZWQuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1lcmdlZDtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVBdXRoVG9rZW4gPSAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgdG9rZW5Gcm9tSGVhZGVycyA9IHJlc29sdmVCZWFyZXJUb2tlbihvcHRpb25zPy5oZWFkZXJzKTtcclxuICBjb25zdCB3aW5kb3dTZWVkID0gcmVhZFdpbmRvd0F1dGhTZWVkKCk7XHJcbiAgcmV0dXJuIHNhZmVUZXh0KHRva2VuRnJvbUhlYWRlcnMgfHwgcnVudGltZUF1dGhTZWVkLnRva2VuIHx8IHdpbmRvd1NlZWQudG9rZW4pO1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZUF1dGhTZWVkID0gKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBFeHBlbnNlQXBpQXV0aFNlZWQgPT4ge1xyXG4gIGNvbnN0IHdpbmRvd1NlZWQgPSByZWFkV2luZG93QXV0aFNlZWQoKTtcclxuICBjb25zdCB0b2tlbiA9IHJlc29sdmVBdXRoVG9rZW4ob3B0aW9ucyk7XHJcbiAgY29uc3QgZW50cmFPaWQgPSBzYWZlVGV4dChydW50aW1lQXV0aFNlZWQuZW50cmFPaWQgfHwgd2luZG93U2VlZC5lbnRyYU9pZCk7XHJcbiAgY29uc3QgYXBwQ29kZSA9IHNhZmVUZXh0KHJ1bnRpbWVBdXRoU2VlZC5hcHBDb2RlIHx8IHdpbmRvd1NlZWQuYXBwQ29kZSB8fCBERUZBVUxUX0FQUF9DT0RFKSB8fCBERUZBVUxUX0FQUF9DT0RFO1xyXG4gIGNvbnN0IHN0cmljdEFwaVJvdXRlcyA9XHJcbiAgICB0eXBlb2YgcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcyA9PT0gXCJib29sZWFuXCJcclxuICAgICAgPyBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzXHJcbiAgICAgIDogKHdpbmRvd1NlZWQuc3RyaWN0QXBpUm91dGVzID09PSB0cnVlKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHRva2VuLFxyXG4gICAgZW50cmFPaWQsXHJcbiAgICBhcHBDb2RlLFxyXG4gICAgc3RyaWN0QXBpUm91dGVzLFxyXG4gIH07XHJcbn07XHJcblxyXG50eXBlIFJhd0VudHJhQ29udGV4dENvbXBhbnkgPSB7XHJcbiAgQ29tcGFueUlkPzogdW5rbm93bjtcclxuICBjb21wYW55SWQ/OiB1bmtub3duO1xyXG4gIElzRGVmYXVsdD86IHVua25vd247XHJcbiAgaXNEZWZhdWx0PzogdW5rbm93bjtcclxuICBBbGxvd1NlbGZNYW5hZ2VtZW50PzogdW5rbm93bjtcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50PzogdW5rbm93bjtcclxuICBDcm1Vc2VySWQ/OiB1bmtub3duO1xyXG4gIGNybVVzZXJJZD86IHVua25vd247XHJcbn07XHJcblxyXG50eXBlIE5vcm1hbGl6ZWRFbnRyYUNvbnRleHRDb21wYW55ID0ge1xyXG4gIGNvbXBhbnlJZDogc3RyaW5nO1xyXG4gIGlzRGVmYXVsdDogYm9vbGVhbjtcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xyXG4gIGNybVVzZXJJZDogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBSYXdFbnRyYUNvbnRleHRIZWFkZXIgPSB7XHJcbiAgQXhVc2VySWQ/OiB1bmtub3duO1xyXG4gIGF4VXNlcklkPzogdW5rbm93bjtcclxuICBEZWZhdWx0Q29tcGFueT86IHVua25vd247XHJcbiAgZGVmYXVsdENvbXBhbnk/OiB1bmtub3duO1xyXG4gIERlZmF1bHRDdXJyZW5jeUNvZGU/OiB1bmtub3duO1xyXG4gIGRlZmF1bHRDdXJyZW5jeUNvZGU/OiB1bmtub3duO1xyXG59O1xyXG5cclxudHlwZSBSYXdFbnRyYUNvbnRleHRJdGVtID0ge1xyXG4gIEhlYWRlcj86IFJhd0VudHJhQ29udGV4dEhlYWRlcjtcclxuICBoZWFkZXI/OiBSYXdFbnRyYUNvbnRleHRIZWFkZXI7XHJcbiAgQ29tcGFuaWVzPzogdW5rbm93bjtcclxuICBjb21wYW5pZXM/OiB1bmtub3duO1xyXG59O1xyXG5cclxuLy8gTWFwcyBvbmUgRW50cmEgY29tcGFueSBpdGVtIHRvIHRoZSBmcm9udGVuZC1zYWZlIHNoYXBlIHVzZWQgYnkgY29udGV4dCBjb25zdW1lcnMuXHJcbmNvbnN0IG1hcEVudHJhQ29udGV4dENvbXBhbnkgPSAoaXRlbTogdW5rbm93bik6IE5vcm1hbGl6ZWRFbnRyYUNvbnRleHRDb21wYW55IHwgbnVsbCA9PiB7XHJcbiAgaWYgKCFpdGVtIHx8IHR5cGVvZiBpdGVtICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgcmF3ID0gaXRlbSBhcyBSYXdFbnRyYUNvbnRleHRDb21wYW55O1xyXG4gIGNvbnN0IGNvbXBhbnlJZCA9IHNhZmVUZXh0KHJhdy5Db21wYW55SWQgPz8gcmF3LmNvbXBhbnlJZCk7XHJcbiAgaWYgKCFjb21wYW55SWQpIHJldHVybiBudWxsO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY29tcGFueUlkLFxyXG4gICAgaXNEZWZhdWx0OiB0b0ZsYWdCb29sKHJhdy5Jc0RlZmF1bHQgPz8gcmF3LmlzRGVmYXVsdCkgPT09IHRydWUsXHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50OiB0b0ZsYWdCb29sKHJhdy5BbGxvd1NlbGZNYW5hZ2VtZW50ID8/IHJhdy5hbGxvd1NlbGZNYW5hZ2VtZW50KSA9PT0gdHJ1ZSxcclxuICAgIGNybVVzZXJJZDogc2FmZVRleHQocmF3LkNybVVzZXJJZCA/PyByYXcuY3JtVXNlcklkKSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgdmFsaWRhdGVDb250ZXh0UmVzcG9uc2UgPSAocmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RW50cmFDb250ZXh0RHRvPik6IEV4cGVuc2VBcGlDb250ZXh0ID0+IHtcclxuICBjb25zdCByYXdSZXNwb25zZSA9IHJlc3BvbnNlIGFzIHtcclxuICAgIFN1Y2Nlc3M/OiB1bmtub3duO1xyXG4gICAgc3VjY2Vzcz86IHVua25vd247XHJcbiAgICBNZXNzYWdlPzogdW5rbm93bjtcclxuICAgIG1lc3NhZ2U/OiB1bmtub3duO1xyXG4gICAgSXRlbXM/OiB1bmtub3duO1xyXG4gICAgaXRlbXM/OiB1bmtub3duO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGlzU3VjY2VzcyA9IHRvRmxhZ0Jvb2wocmF3UmVzcG9uc2UuU3VjY2VzcyA/PyByYXdSZXNwb25zZS5zdWNjZXNzKTtcclxuICBpZiAoaXNTdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3Ioc2FmZVRleHQocmF3UmVzcG9uc2UuTWVzc2FnZSA/PyByYXdSZXNwb25zZS5tZXNzYWdlKSB8fCBcIkNvdWxkIG5vdCBsb2FkIEVudHJhIGNvbnRleHQuXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHJhd1Jlc3BvbnNlLkl0ZW1zKVxyXG4gICAgPyByYXdSZXNwb25zZS5JdGVtc1xyXG4gICAgOiAoQXJyYXkuaXNBcnJheShyYXdSZXNwb25zZS5pdGVtcykgPyByYXdSZXNwb25zZS5pdGVtcyA6IFtdKTtcclxuICBjb25zdCBmaXJzdCA9IGl0ZW1zWzBdIGFzIFJhd0VudHJhQ29udGV4dEl0ZW0gfCB1bmRlZmluZWQ7XHJcbiAgY29uc3QgaGVhZGVyID0gZmlyc3Q/LkhlYWRlciA/PyBmaXJzdD8uaGVhZGVyO1xyXG4gIGlmICghZmlyc3QgfHwgIWhlYWRlcikge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJDb3VsZCBub3QgbG9hZCBFbnRyYSBjb250ZXh0LlwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGF4VXNlcklkID0gc2FmZVRleHQoaGVhZGVyLkF4VXNlcklkID8/IGhlYWRlci5heFVzZXJJZCk7XHJcbiAgY29uc3QgZGVmYXVsdENvbXBhbnkgPSBzYWZlVGV4dChoZWFkZXIuRGVmYXVsdENvbXBhbnkgPz8gaGVhZGVyLmRlZmF1bHRDb21wYW55KTtcclxuICBjb25zdCBkZWZhdWx0Q3VycmVuY3lDb2RlID0gc2FmZVRleHQoaGVhZGVyLkRlZmF1bHRDdXJyZW5jeUNvZGUgPz8gaGVhZGVyLmRlZmF1bHRDdXJyZW5jeUNvZGUpO1xyXG4gIGNvbnN0IGNvbXBhbmllc1JhdyA9IEFycmF5LmlzQXJyYXkoZmlyc3QuQ29tcGFuaWVzKVxyXG4gICAgPyBmaXJzdC5Db21wYW5pZXNcclxuICAgIDogKEFycmF5LmlzQXJyYXkoZmlyc3QuY29tcGFuaWVzKSA/IGZpcnN0LmNvbXBhbmllcyA6IFtdKTtcclxuICBjb25zdCBjb21wYW5pZXMgPSBjb21wYW5pZXNSYXdcclxuICAgIC5tYXAoKGl0ZW0pID0+IG1hcEVudHJhQ29udGV4dENvbXBhbnkoaXRlbSkpXHJcbiAgICAuZmlsdGVyKChpdGVtKTogaXRlbSBpcyBOb3JtYWxpemVkRW50cmFDb250ZXh0Q29tcGFueSA9PiAhIWl0ZW0pO1xyXG4gIGNvbnN0IHNlbGVjdGVkQ29tcGFueUlkID0gcmVhZFdpbmRvd1NlbGVjdGVkQ29tcGFueSgpO1xyXG4gIGNvbnN0IHNlbGVjdGVkQ29tcGFueU1hdGNoID0gc2VsZWN0ZWRDb21wYW55SWRcclxuICAgID8gY29tcGFuaWVzLmZpbmQoKGl0ZW0pID0+IHNhZmVUZXh0KGl0ZW0uY29tcGFueUlkKS50b1VwcGVyQ2FzZSgpID09PSBzZWxlY3RlZENvbXBhbnlJZClcclxuICAgIDogbnVsbDtcclxuXHJcbiAgLy8gTmV2ZXIgZmFsbCBiYWNrIHRvIGEgZGlmZmVyZW50IGNvbXBhbnkgd2hlbiB0aGUgdXNlciBzZWxlY3RlZCBvbmUgZXhwbGljaXRseS5cclxuICBpZiAoc2VsZWN0ZWRDb21wYW55SWQgJiYgIXNlbGVjdGVkQ29tcGFueU1hdGNoKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcclxuICAgICAgaW5kVChcclxuICAgICAgICBcIkV4cGVuc2VfQ29udGV4dF9TZWxlY3RlZENvbXBhbnlVbmF2YWlsYWJsZVwiLFxyXG4gICAgICAgIFwiVGhlIHNlbGVjdGVkIGNvbXBhbnkgaXMgbm8gbG9uZ2VyIGF2YWlsYWJsZS4gUGxlYXNlIGNob29zZSBpdCBhZ2FpbiBmcm9tIHRoZSBtYWluIG1lbnUuXCJcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGZhbGxiYWNrQ29tcGFueSA9IHNhZmVUZXh0KGNvbXBhbmllcy5maW5kKChpdGVtKSA9PiBpdGVtLmlzRGVmYXVsdCk/LmNvbXBhbnlJZCk7XHJcbiAgY29uc3QgY29tcGFueUlkID1cclxuICAgIHNlbGVjdGVkQ29tcGFueU1hdGNoPy5jb21wYW55SWQgfHwgcmVzb2x2ZUVmZmVjdGl2ZUNvbXBhbnlJZChcIlwiLCBjb21wYW5pZXMsIGRlZmF1bHRDb21wYW55IHx8IGZhbGxiYWNrQ29tcGFueSk7XHJcbiAgY29uc3Qgc2VsZWN0ZWRDb21wYW55ID1cclxuICAgIHNlbGVjdGVkQ29tcGFueU1hdGNoIHx8IGNvbXBhbmllcy5maW5kKChpdGVtKSA9PiBzYWZlVGV4dChpdGVtLmNvbXBhbnlJZCkgPT09IGNvbXBhbnlJZCkgfHwgY29tcGFuaWVzWzBdO1xyXG4gIGNvbnN0IGFsbG93U2VsZk1hbmFnZW1lbnQgPSBzZWxlY3RlZENvbXBhbnk/LmFsbG93U2VsZk1hbmFnZW1lbnQgPT09IHRydWU7XHJcbiAgY29uc3QgY3JtVXNlcklkID0gc2FmZVRleHQoc2VsZWN0ZWRDb21wYW55Py5jcm1Vc2VySWQpO1xyXG5cclxuICBpZiAoIWF4VXNlcklkIHx8ICFjb21wYW55SWQpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiQ291bGQgbm90IHJlc29sdmUgRW50cmEgY29tcGFueSBjb250ZXh0LlwiKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0b2tlbjogXCJcIixcclxuICAgIGNvbXBhbnlJZCxcclxuICAgIGF4VXNlcklkLFxyXG4gICAgY3JtVXNlcklkLFxyXG4gICAgZGVmYXVsdEN1cnJlbmN5Q29kZSxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQsXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0ID0gYXN5bmMgKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBQcm9taXNlPEV4cGVuc2VBcGlDb250ZXh0PiA9PiB7XHJcbiAgY29uc3Qgc2VlZCA9IHJlc29sdmVBdXRoU2VlZChvcHRpb25zKTtcclxuICBjb25zdCBjb250ZXh0S2V5ID0gYnVpbGRDb250ZXh0S2V5KHNlZWQpO1xyXG4gIGNvbnN0IHsgc2lnbmFsLCAuLi5iYXNlT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgaWYgKGNhY2hlZENvbnRleHQgJiYgY2FjaGVkQ29udGV4dEtleSA9PT0gY29udGV4dEtleSkge1xyXG4gICAgcmV0dXJuIHdhaXRGb3JBYm9ydGFibGVFeHBlbnNlUmVzdWx0KFByb21pc2UucmVzb2x2ZShjYWNoZWRDb250ZXh0KSwgc2lnbmFsKTtcclxuICB9XHJcblxyXG4gIGlmICghY29udGV4dFByb21pc2UgfHwgY2FjaGVkQ29udGV4dEtleSAhPT0gY29udGV4dEtleSkge1xyXG4gICAgY2FjaGVkQ29udGV4dEtleSA9IGNvbnRleHRLZXk7XHJcbiAgICBjb25zdCBzaGFyZWRDb250ZXh0UHJvbWlzZSA9IChhc3luYyAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbnRleHRQYXlsb2FkOiBFbnRyYUNvbnRleHRSZXF1ZXN0ID0ge1xyXG4gICAgICAgIGFwcENvZGU6IHNlZWQuYXBwQ29kZSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChzYWZlVGV4dChzZWVkLmVudHJhT2lkKSkge1xyXG4gICAgICAgIGNvbnRleHRQYXlsb2FkLmVudHJhT2lkID0gc2VlZC5lbnRyYU9pZDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY29udGV4dFJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RW50cmFDb250ZXh0RHRvPj4oXCIvYXBpL2F1dGgvZW50cmEvY29udGV4dFwiLCB7XHJcbiAgICAgICAgLi4uYmFzZU9wdGlvbnMsXHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiBidWlsZENvbnRleHRIZWFkZXJzKHNlZWQudG9rZW4sIGJhc2VPcHRpb25zKSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjb250ZXh0UGF5bG9hZCksXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgcmVzb2x2ZWQgPSB2YWxpZGF0ZUNvbnRleHRSZXNwb25zZShjb250ZXh0UmVzcG9uc2UpO1xyXG4gICAgICBjb25zdCBuZXh0Q29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQgPSB7XHJcbiAgICAgICAgLi4ucmVzb2x2ZWQsXHJcbiAgICAgICAgdG9rZW46IHNlZWQudG9rZW4sXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIHdpbmRvdy5fX0lORF9BTExPV19TRUxGX01BTkFHRU1FTlRfXyA9IG5leHRDb250ZXh0LmFsbG93U2VsZk1hbmFnZW1lbnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNhY2hlZENvbnRleHQgPSBuZXh0Q29udGV4dDtcclxuICAgICAgcmV0dXJuIG5leHRDb250ZXh0O1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICBjb250ZXh0UHJvbWlzZSA9IHNoYXJlZENvbnRleHRQcm9taXNlO1xyXG4gICAgdm9pZCBzaGFyZWRDb250ZXh0UHJvbWlzZS5maW5hbGx5KCgpID0+IHtcclxuICAgICAgaWYgKGNvbnRleHRQcm9taXNlID09PSBzaGFyZWRDb250ZXh0UHJvbWlzZSkge1xyXG4gICAgICAgIGNvbnRleHRQcm9taXNlID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYXdhaXQgd2FpdEZvckFib3J0YWJsZUV4cGVuc2VSZXN1bHQoY29udGV4dFByb21pc2UsIHNpZ25hbCk7XHJcbn07XHJcblxyXG4vLyBFeHBvc2VzIHJlc29sdmVkIEVudHJhIGNvbnRleHQgdmFsdWVzIG5lZWRlZCBieSBHYXN0b3MgVUkgbWFuYWdlbWVudCBzdGF0ZS5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VBcGlDb250ZXh0U25hcHNob3QgPSBhc3luYyAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IFByb21pc2U8RXhwZW5zZUFwaUNvbnRleHRTbmFwc2hvdD4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICByZXR1cm4ge1xyXG4gICAgY29tcGFueUlkOiBzYWZlVGV4dChjb250ZXh0LmNvbXBhbnlJZCkudG9VcHBlckNhc2UoKSxcclxuICAgIGF4VXNlcklkOiBzYWZlVGV4dChjb250ZXh0LmF4VXNlcklkKSxcclxuICAgIGNybVVzZXJJZDogc2FmZVRleHQoY29udGV4dC5jcm1Vc2VySWQpLFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudDogY29udGV4dC5hbGxvd1NlbGZNYW5hZ2VtZW50ID09PSB0cnVlLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlID0gbm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplQXBpUmVzcG9uc2UgPSBub3JtYWxpemVBcGlSZXNwb25zZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZSA9IG5vcm1hbGl6ZVRpY2tldFF1aWNrQ3JlYXRlUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZVN1Ym9yZGluYXRlc1BhZ2VkUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlID0gbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpbmtCdWxrUmVzcG9uc2UgPSBub3JtYWxpemVUaWNrZXRMaW5rQnVsa1Jlc3BvbnNlVHJhbnNmb3JtO1xyXG5cclxuY29uc3QgbG9va3NMaWtlSHRtbERvY3VtZW50ID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgcmF3ID0gc2FmZVRleHQodmFsdWUpLnRvTG93ZXJDYXNlKCk7XHJcbiAgcmV0dXJuIHJhdy5zdGFydHNXaXRoKFwiPCFkb2N0eXBlIGh0bWxcIikgfHwgcmF3LnN0YXJ0c1dpdGgoXCI8aHRtbFwiKTtcclxufTtcclxuXHJcbmNvbnN0IGlzQXBpUm91dGVVbmF2YWlsYWJsZSA9IChlcnJvcjogdW5rbm93bik6IGVycm9yIGlzIEFwaUZldGNoRXJyb3IgPT4ge1xyXG4gIGlmICghKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikpIHJldHVybiBmYWxzZTtcclxuICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDQgfHwgZXJyb3Iuc3RhdHVzID09PSA0MDUpIHJldHVybiB0cnVlO1xyXG4gIHJldHVybiBlcnJvci5zdGF0dXMgPT09IHVuZGVmaW5lZCAmJiBsb29rc0xpa2VIdG1sRG9jdW1lbnQoZXJyb3IucmVzcG9uc2VCb2R5KTtcclxufTtcclxuXHJcbmNvbnN0IGlzU3RyaWN0QXBpUm91dGVzRW5hYmxlZCA9ICgpOiBib29sZWFuID0+IHtcclxuICBpZiAodHlwZW9mIHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXMgPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICByZXR1cm4gcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcztcclxuICB9XHJcblxyXG4gIHJldHVybiByZWFkUnVudGltZVN0cmljdEFwaUZsYWcoKTtcclxufTtcclxuXHJcbmNvbnN0IHNob3VsZFVzZUxlZ2FjeUZhbGxiYWNrID0gKGVycm9yOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKGlzU3RyaWN0QXBpUm91dGVzRW5hYmxlZCgpKSByZXR1cm4gZmFsc2U7XHJcbiAgcmV0dXJuIGlzQXBpUm91dGVVbmF2YWlsYWJsZShlcnJvcik7XHJcbn07XHJcblxyXG5jb25zdCB0b0xlZ2FjeUxpc3RSZXF1ZXN0UGF5bG9hZCA9IChwYXlsb2FkOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBmaWx0ZXI6IHNhZmVUZXh0KHBheWxvYWQuZmlsdGVyKSxcclxuICAgIGhvamFHYXN0b3NJZDogc2FmZVRleHQocGF5bG9hZC5maWx0ZXIpLFxyXG4gICAgYmlsbGVkTW9kZTogcGF5bG9hZC5iaWxsZWRNb2RlID8/IDIsXHJcbiAgICBmcm9tRGF0ZTogc2FmZVRleHQocGF5bG9hZC5jcmVhdGVkRGF0ZUZyb20pLFxyXG4gICAgdG9EYXRlOiBzYWZlVGV4dChwYXlsb2FkLmNyZWF0ZWREYXRlVG8pLFxyXG4gICAgcHJvamVjdElkOiBzYWZlVGV4dChwYXlsb2FkLnByb2pJZCksXHJcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KHBheWxvYWQuY3VycmVuY3lDb2RlKSxcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IG5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXIocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMpLFxuICAgIHJlaW1idXJzYWJsZUV4cGVuc2U6IG5vcm1hbGl6ZUV4cGVuc2VTaGVldFJlaW1idXJzYWJsZShwYXlsb2FkLnJlaW1idXJzYWJsZUV4cGVuc2UpLFxuICAgIGluY2x1ZGVTdWJvcmRpbmF0ZXM6IHBheWxvYWQuaW5jbHVkZVN1Ym9yZGluYXRlcyA9PT0gdHJ1ZSxcbiAgICBwYWdlOiBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZC5wYWdlKSAmJiBwYXlsb2FkLnBhZ2UgPiAwID8gcGF5bG9hZC5wYWdlIDogMSxcclxuICAgIHBhZ2VTaXplOiBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZC5wYWdlU2l6ZSkgJiYgcGF5bG9hZC5wYWdlU2l6ZSA+IDAgPyBwYXlsb2FkLnBhZ2VTaXplIDogNTAsXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IG1hcExlZ2FjeUxpc3RJdGVtVG9BcGlMaXN0SXRlbSA9IChpdGVtOiBMZWdhY3lFeHBlbnNlTGlzdEl0ZW0pOiBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIEhvamFHYXN0b3NJZDogc2FmZVRleHQoaXRlbS5ob2phR2FzdG9zSWQpLFxyXG4gICAgRGVzY3JpcHRpb246IHNhZmVUZXh0KGl0ZW0uZGVzY3JpcHRpb24pLFxyXG4gICAgRXhwZW5zZVNoZWV0U3RhdHVzOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uZXhwZW5zZVNoZWV0U3RhdHVzKSxcclxuICAgIEVzdGFkb0NvbWVudGFyaW9zOiBzYWZlVGV4dChpdGVtLmVzdGFkb0NvbWVudGFyaW9zKSB8fCBudWxsLFxyXG4gICAgVXNlcklkOiBzYWZlVGV4dChpdGVtLnVzZXJJZCkgfHwgbnVsbCxcbiAgICBVc2VyTmFtZTogc2FmZVRleHQoaXRlbS51c2VyTmFtZSkgfHwgbnVsbCxcbiAgICBPd25lckF4VXNlcklkOiBzYWZlVGV4dChpdGVtLm93bmVyQXhVc2VySWQpIHx8IG51bGwsXG4gICAgT3duZXJOYW1lOiBzYWZlVGV4dChpdGVtLm93bmVyTmFtZSkgfHwgbnVsbCxcbiAgICBWb3VjaGVyOiBzYWZlVGV4dChpdGVtLnZvdWNoZXIpLFxuICAgIFByb2pJZDogc2FmZVRleHQoaXRlbS5wcm9qSWQpLFxyXG4gICAgQ3VycmVuY3lDb2RlOiBzYWZlVGV4dChpdGVtLmN1cnJlbmN5Q29kZSksXHJcbiAgICBUb3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihpdGVtLnRvdGFsQW1vdW50ID8/IGl0ZW0udG90YWxBbW91bnRNU1QpLFxuICAgIEV4Y2hSYXRlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uZXhjaFJhdGUpLFxuICAgIEV4Y2hhbmdlUmF0ZU1vZGU6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5leGNoYW5nZVJhdGVNb2RlKSxcbiAgICBSZWltYnVyc2FibGVFeHBlbnNlOiBub3JtYWxpemVFeHBlbnNlU2hlZXRSZWltYnVyc2FibGUoaXRlbS5yZWltYnVyc2FibGVFeHBlbnNlKSxcbiAgICBDcmVhdGVkRGF0ZTogc2FmZVRleHQoaXRlbS5jcmVhdGVkRGF0ZSkgfHwgbnVsbCxcbiAgfTtcbn07XG5cclxuY29uc3QgbWFwTGVnYWN5TGlzdFJlc3BvbnNlID0gKFxyXG4gIGxlZ2FjeTogTGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZSxcclxuICBmYWxsYmFja1BhZ2U6IG51bWJlcixcclxuICBmYWxsYmFja1BhZ2VTaXplOiBudW1iZXJcclxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz4gPT4ge1xyXG4gIGNvbnN0IGxlZ2FjeUl0ZW1zID0gQXJyYXkuaXNBcnJheShsZWdhY3k/Lml0ZW1zKSA/IGxlZ2FjeS5pdGVtcyA6IFtdO1xyXG4gIGNvbnN0IG1hcHBlZEl0ZW1zID0gbGVnYWN5SXRlbXMubWFwKChlbnRyeSkgPT4gbWFwTGVnYWN5TGlzdEl0ZW1Ub0FwaUxpc3RJdGVtKGVudHJ5KSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBTdWNjZXNzOiBsZWdhY3kuc3VjY2VzcyAhPT0gZmFsc2UsXHJcbiAgICBNZXNzYWdlOiBzYWZlVGV4dChsZWdhY3kubWVzc2FnZSkgfHwgXCJPS1wiLFxyXG4gICAgVG90YWw6IHRvTnVsbGFibGVOdW1iZXIobGVnYWN5LnRvdGFsKSA/PyBtYXBwZWRJdGVtcy5sZW5ndGgsXHJcbiAgICBQYWdlOiB0b051bGxhYmxlTnVtYmVyKGxlZ2FjeS5wYWdlKSA/PyBmYWxsYmFja1BhZ2UsXHJcbiAgICBQYWdlU2l6ZTogdG9OdWxsYWJsZU51bWJlcihsZWdhY3kucGFnZVNpemUpID8/IGZhbGxiYWNrUGFnZVNpemUsXHJcbiAgICBJdGVtczogbWFwcGVkSXRlbXMsXHJcbiAgICBUcmFjZUlkOiB1bmRlZmluZWQsXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIFNldHMgcnVudGltZSBhdXRoIGlucHV0cyB1c2VkIHRvIHJlc29sdmUgRW50cmEgY29udGV4dCBhbmQgbWFuZGF0b3J5IGV4cGVuc2UgaGVhZGVycy5cclxuZXhwb3J0IGNvbnN0IGNvbmZpZ3VyZUV4cGVuc2VBcGlBdXRoID0gKHNlZWQ6IFBhcnRpYWw8RXhwZW5zZUFwaUF1dGhTZWVkPik6IHZvaWQgPT4ge1xyXG4gIGNvbnN0IHN0cmljdEZyb21TZWVkID0gdG9GbGFnQm9vbChzZWVkLnN0cmljdEFwaVJvdXRlcyk7XHJcbiAgY29uc3Qgc3RyaWN0RnJvbVJ1bnRpbWUgPVxyXG4gICAgdHlwZW9mIHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXMgPT09IFwiYm9vbGVhblwiID8gcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcyA6IHJlYWRSdW50aW1lU3RyaWN0QXBpRmxhZygpO1xyXG5cclxuICBydW50aW1lQXV0aFNlZWQgPSB7XHJcbiAgICAuLi5ydW50aW1lQXV0aFNlZWQsXHJcbiAgICB0b2tlbjogc2FmZVRleHQoc2VlZC50b2tlbiB8fCBydW50aW1lQXV0aFNlZWQudG9rZW4pLFxyXG4gICAgZW50cmFPaWQ6IHNhZmVUZXh0KHNlZWQuZW50cmFPaWQgfHwgcnVudGltZUF1dGhTZWVkLmVudHJhT2lkKSxcclxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHNlZWQuYXBwQ29kZSB8fCBydW50aW1lQXV0aFNlZWQuYXBwQ29kZSB8fCBERUZBVUxUX0FQUF9DT0RFKSxcclxuICAgIHN0cmljdEFwaVJvdXRlczogc3RyaWN0RnJvbVNlZWQgPz8gc3RyaWN0RnJvbVJ1bnRpbWUsXHJcbiAgfTtcclxuXHJcbiAgY2FjaGVkQ29udGV4dCA9IG51bGw7XHJcbiAgY2FjaGVkQ29udGV4dEtleSA9IFwiXCI7XHJcbiAgY29udGV4dFByb21pc2UgPSBudWxsO1xyXG4gIGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLmNsZWFyKCk7XHJcbiAgcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuY2xlYXIoKTtcclxufTtcclxuXHJcbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9saXN0IGl0ZW0gY29udHJhY3QgdG8gbGlzdCBjYXJkIFVJIG1vZGVsLlxyXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmQgPSBtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZENvcmU7XHJcblxyXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0gaGVhZGVyIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxyXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0SGVhZGVyID0gbWFwRXhwZW5zZVNoZWV0SGVhZGVyQ29yZTtcclxuXHJcbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfSBsaW5lIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxyXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0TGluZSA9IG1hcEV4cGVuc2VTaGVldExpbmVDb3JlO1xyXG5cclxuZXhwb3J0IHR5cGUgRXhwZW5zZVNoZWV0TGlzdEZldGNoQ2FwdHVyZSA9IHtcclxuICByZXF1ZXN0OiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdDtcclxuICByZXNwb25zZTogRXhwZW5zZVNoZWV0TGlzdFJlc3BvbnNlRW52ZWxvcGU7XHJcbiAgYXhVc2VySWRPdmVycmlkZTogc3RyaW5nIHwgbnVsbDtcclxuICBzb3VyY2U6IFwiYXBpXCIgfCBcImxlZ2FjeVwiO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgRXhwZW5zZVNoZWV0TGlzdEZldGNoT3B0aW9ucyA9IEFwaUZldGNoT3B0aW9ucyAmIHtcclxuICBheFVzZXJJZE92ZXJyaWRlPzogc3RyaW5nO1xyXG4gIG9uUmVxdWVzdFByZXBhcmVkPzogKHJlcXVlc3Q6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0KSA9PiB2b2lkO1xyXG4gIG9uQ2FwdHVyZT86IChjYXB0dXJlOiBFeHBlbnNlU2hlZXRMaXN0RmV0Y2hDYXB0dXJlKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgRXhwZW5zZVRpY2tldExpc3RGZXRjaE9wdGlvbnMgPSBBcGlGZXRjaE9wdGlvbnMgJiB7XHJcbiAgYXhVc2VySWRPdmVycmlkZT86IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEV4cGVuc2VTaGVldExpc3RTb3VyY2VKc29uT3B0aW9ucyA9IEFwaUZldGNoT3B0aW9ucyAmIHtcclxuICBheFVzZXJJZE92ZXJyaWRlPzogc3RyaW5nO1xyXG4gIHNlZWRSZXNwb25zZT86IEV4cGVuc2VTaGVldExpc3RSZXNwb25zZUVudmVsb3BlIHwgbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkVGlja2V0TGlzdEhlYWRlcnMgPSAoXHJcbiAgY29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQsXHJcbiAgb3B0aW9uczogQXBpRmV0Y2hPcHRpb25zIHwgdW5kZWZpbmVkLFxyXG4gIGF4VXNlcklkT3ZlcnJpZGU6IHN0cmluZyB8IHVuZGVmaW5lZFxyXG4pOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0+IHtcclxuICBjb25zdCBoZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSwgZmFsc2UpKTtcclxuICBjb25zdCBub3JtYWxpemVkT3ZlcnJpZGVBeFVzZXJJZCA9IG5vcm1hbGl6ZUF4VXNlcklkSGVhZGVyKGF4VXNlcklkT3ZlcnJpZGUpO1xyXG4gIGNvbnN0IHJlc29sdmVkQXhVc2VySWQgPSBzYWZlVGV4dChub3JtYWxpemVkT3ZlcnJpZGVBeFVzZXJJZCB8fCBjb250ZXh0LmF4VXNlcklkKTtcclxuICBpZiAocmVzb2x2ZWRBeFVzZXJJZCkge1xyXG4gICAgaGVhZGVyc1tcIlgtSU5ELUF4VXNlcklkXCJdID0gcmVzb2x2ZWRBeFVzZXJJZDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmVtb3ZlSGVhZGVyVmFsdWUoaGVhZGVycywgXCJYLUlORC1BeFVzZXJJZFwiKTtcclxuICB9XHJcbiAgcmV0dXJuIGhlYWRlcnM7XHJcbn07XHJcblxyXG4vLyBMb2FkcyB0aGUgZXhwZW5zZSBzaGVldCBsaXN0IGZyb20gL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9saXN0LlxyXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXRMaXN0ID0gYXN5bmMgKFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBFeHBlbnNlU2hlZXRMaXN0RmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz4+ID0+IHtcclxuICBjb25zdCB7IGF4VXNlcklkT3ZlcnJpZGUsIG9uUmVxdWVzdFByZXBhcmVkLCBvbkNhcHR1cmUsIC4uLmJhc2VPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xyXG4gIGNvbnN0IHJhd0NyZWF0ZWREYXRlRnJvbSA9IHNhZmVUZXh0KHBheWxvYWQ/LmNyZWF0ZWREYXRlRnJvbSk7XHJcbiAgY29uc3QgcmF3Q3JlYXRlZERhdGVUbyA9IHNhZmVUZXh0KHBheWxvYWQ/LmNyZWF0ZWREYXRlVG8pO1xyXG4gIGNvbnN0IGNyZWF0ZWREYXRlRnJvbSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdDcmVhdGVkRGF0ZUZyb20pO1xyXG4gIGNvbnN0IGNyZWF0ZWREYXRlVG8gPSBub3JtYWxpemVPcHRpb25hbEFwaURhdGUocmF3Q3JlYXRlZERhdGVUbyk7XHJcblxyXG4gIGlmIChyYXdDcmVhdGVkRGF0ZUZyb20gJiYgIWNyZWF0ZWREYXRlRnJvbSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgfVxyXG4gIGlmIChyYXdDcmVhdGVkRGF0ZVRvICYmICFjcmVhdGVkRGF0ZVRvKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCA9IHtcclxuICAgIC4uLnBheWxvYWQsXHJcbiAgICBjcmVhdGVkRGF0ZUZyb20sXG4gICAgY3JlYXRlZERhdGVUbyxcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IG5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXIocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMpLFxuICAgIHJlaW1idXJzYWJsZUV4cGVuc2U6IG5vcm1hbGl6ZUV4cGVuc2VTaGVldFJlaW1idXJzYWJsZShwYXlsb2FkLnJlaW1idXJzYWJsZUV4cGVuc2UpLFxuICAgIGluY2x1ZGVTdWJvcmRpbmF0ZXM6IHBheWxvYWQuaW5jbHVkZVN1Ym9yZGluYXRlcyA9PT0gdHJ1ZSxcbiAgfTtcbiAgY29uc3Qgc2VyaWFsaXplZFBheWxvYWQgPSBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUoc2FmZVBheWxvYWQpO1xyXG5cclxuICBvblJlcXVlc3RQcmVwYXJlZD8uKHNlcmlhbGl6ZWRQYXlsb2FkKTtcclxuXHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KGJhc2VPcHRpb25zKTtcclxuICBjb25zdCBsaXN0SGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIGJhc2VPcHRpb25zLCB0cnVlLCBmYWxzZSkpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRPdmVycmlkZUF4VXNlcklkID0gbm9ybWFsaXplQXhVc2VySWRIZWFkZXIoYXhVc2VySWRPdmVycmlkZSk7XHJcbiAgY29uc3QgcmVzb2x2ZWRBeFVzZXJJZCA9IHNhZmVUZXh0KG5vcm1hbGl6ZWRPdmVycmlkZUF4VXNlcklkIHx8IGNvbnRleHQuYXhVc2VySWQpO1xyXG4gIGlmIChyZXNvbHZlZEF4VXNlcklkKSB7XHJcbiAgICBsaXN0SGVhZGVyc1tcIlgtSU5ELUF4VXNlcklkXCJdID0gcmVzb2x2ZWRBeFVzZXJJZDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmVtb3ZlSGVhZGVyVmFsdWUobGlzdEhlYWRlcnMsIFwiWC1JTkQtQXhVc2VySWRcIik7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRMaXN0SXRlbUR0bz4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9saXN0XCIsIHtcclxuICAgICAgLi4uYmFzZU9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnM6IGxpc3RIZWFkZXJzLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXHJcbiAgICB9KTtcclxuXHJcbiAgICBvbkNhcHR1cmU/Lih7XHJcbiAgICAgIHJlcXVlc3Q6IHNlcmlhbGl6ZWRQYXlsb2FkLFxyXG4gICAgICByZXNwb25zZTogY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlKHJlc3BvbnNlKSxcclxuICAgICAgYXhVc2VySWRPdmVycmlkZTogbm9ybWFsaXplZE92ZXJyaWRlQXhVc2VySWQgfHwgbnVsbCxcclxuICAgICAgc291cmNlOiBcImFwaVwiLFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgaWYgKCFzaG91bGRVc2VMZWdhY3lGYWxsYmFjayhlcnJvcikpIHtcclxuICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbGVnYWN5UmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248TGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZT4oXCIvR2FzdG9zL0xpc3RFeHBlbnNlU2hlZXRzXCIsIHtcclxuICAgICAgLi4uYmFzZU9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAuLi5zYW5pdGl6ZUhlYWRlcnMoYmFzZU9wdGlvbnM/LmhlYWRlcnMpLFxyXG4gICAgICAgIC4uLkpTT05fSEVBREVSUyxcclxuICAgICAgfSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkodG9MZWdhY3lMaXN0UmVxdWVzdFBheWxvYWQoc2FmZVBheWxvYWQpKSxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IG1hcHBlZCA9IG1hcExlZ2FjeUxpc3RSZXNwb25zZShcclxuICAgICAgbGVnYWN5UmVzcG9uc2UsXHJcbiAgICAgIE51bWJlci5pc0Zpbml0ZShzYWZlUGF5bG9hZC5wYWdlKSAmJiBzYWZlUGF5bG9hZC5wYWdlID4gMCA/IHNhZmVQYXlsb2FkLnBhZ2UgOiAxLFxyXG4gICAgICBOdW1iZXIuaXNGaW5pdGUoc2FmZVBheWxvYWQucGFnZVNpemUpICYmIHNhZmVQYXlsb2FkLnBhZ2VTaXplID4gMCA/IHNhZmVQYXlsb2FkLnBhZ2VTaXplIDogNTBcclxuICAgICk7XHJcblxyXG4gICAgb25DYXB0dXJlPy4oe1xyXG4gICAgICByZXF1ZXN0OiBzZXJpYWxpemVkUGF5bG9hZCxcclxuICAgICAgcmVzcG9uc2U6IGNsb25lSnNvbkNvbXBhdGlibGVWYWx1ZShtYXBwZWQpLFxyXG4gICAgICBheFVzZXJJZE92ZXJyaWRlOiBub3JtYWxpemVkT3ZlcnJpZGVBeFVzZXJJZCB8fCBudWxsLFxyXG4gICAgICBzb3VyY2U6IFwibGVnYWN5XCIsXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UobWFwcGVkKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVQb3NpdGl2ZUludGVnZXIgPSAodmFsdWU6IHVua25vd24sIGZhbGxiYWNrVmFsdWU6IG51bWJlcik6IG51bWJlciA9PiB7XHJcbiAgY29uc3QgcGFyc2VkVmFsdWUgPSBOdW1iZXIodmFsdWUpO1xyXG4gIGlmIChOdW1iZXIuaXNGaW5pdGUocGFyc2VkVmFsdWUpICYmIHBhcnNlZFZhbHVlID4gMCkge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IocGFyc2VkVmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZhbGxiYWNrVmFsdWU7XHJcbn07XHJcblxyXG4vLyBSZWJ1aWxkcyBvbmUgZnVsbCBsaXN0IGVudmVsb3BlIGZvciB0aGUgYXNzaXN0YW50IGJ5IGxvYWRpbmcgZXZlcnkgcGFnZSBvZiB0aGUgYWN0aXZlIHF1ZXJ5LlxyXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXRMaXN0U291cmNlSnNvbiA9IGFzeW5jIChcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCxcclxuICBvcHRpb25zPzogRXhwZW5zZVNoZWV0TGlzdFNvdXJjZUpzb25PcHRpb25zXHJcbik6IFByb21pc2U8RXhwZW5zZVNoZWV0TGlzdFJlc3BvbnNlRW52ZWxvcGU+ID0+IHtcclxuICBjb25zdCB7IHNlZWRSZXNwb25zZSwgLi4uYmFzZU9wdGlvbnMgfSA9IG9wdGlvbnMgfHwge307XHJcbiAgY29uc3QgZmFsbGJhY2tQYWdlID0gbm9ybWFsaXplUG9zaXRpdmVJbnRlZ2VyKHBheWxvYWQ/LnBhZ2UsIDEpO1xyXG4gIGNvbnN0IGZhbGxiYWNrUGFnZVNpemUgPSBub3JtYWxpemVQb3NpdGl2ZUludGVnZXIocGF5bG9hZD8ucGFnZVNpemUsIDUwKTtcclxuICBjb25zdCBub3JtYWxpemVkU2VlZFJlc3BvbnNlID0gc2VlZFJlc3BvbnNlID8gbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UoY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlKHNlZWRSZXNwb25zZSkpIDogbnVsbDtcclxuICBjb25zdCBpbml0aWFsUmVzcG9uc2UgPSBub3JtYWxpemVkU2VlZFJlc3BvbnNlID8/IChhd2FpdCBmZXRjaEV4cGVuc2VTaGVldExpc3QocGF5bG9hZCwgYmFzZU9wdGlvbnMpKTtcclxuICBjb25zdCBub3JtYWxpemVkSW5pdGlhbFJlc3BvbnNlID0gbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UoY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlKGluaXRpYWxSZXNwb25zZSkpO1xyXG5cclxuICBpZiAobm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5TdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXHJcbiAgICAgIHNhZmVUZXh0KG5vcm1hbGl6ZWRJbml0aWFsUmVzcG9uc2UuTWVzc2FnZSkgfHwgXCJDb3VsZCBub3QgbG9hZCB0aGUgZnVsbCBleHBlbnNlIHNoZWV0IHF1ZXJ5LlwiXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdG90YWxSZWNvcmRzUmF3ID0gTnVtYmVyKG5vcm1hbGl6ZWRJbml0aWFsUmVzcG9uc2UuVG90YWwpO1xyXG4gIGNvbnN0IHRvdGFsUmVjb3JkcyA9XHJcbiAgICBOdW1iZXIuaXNGaW5pdGUodG90YWxSZWNvcmRzUmF3KSAmJiB0b3RhbFJlY29yZHNSYXcgPj0gMFxyXG4gICAgICA/IE1hdGguZmxvb3IodG90YWxSZWNvcmRzUmF3KVxyXG4gICAgICA6IG5vcm1hbGl6ZWRJbml0aWFsUmVzcG9uc2UuSXRlbXMubGVuZ3RoO1xyXG4gIGNvbnN0IGVmZmVjdGl2ZVBhZ2VTaXplID0gbm9ybWFsaXplUG9zaXRpdmVJbnRlZ2VyKG5vcm1hbGl6ZWRJbml0aWFsUmVzcG9uc2UuUGFnZVNpemUsIGZhbGxiYWNrUGFnZVNpemUpO1xyXG4gIGNvbnN0IHRvdGFsUGFnZXMgPSBNYXRoLm1heCgxLCBNYXRoLmNlaWwodG90YWxSZWNvcmRzIC8gTWF0aC5tYXgoMSwgZWZmZWN0aXZlUGFnZVNpemUpKSk7XHJcbiAgY29uc3QgY3VycmVudFBhZ2UgPSBNYXRoLm1pbihcclxuICAgIHRvdGFsUGFnZXMsXHJcbiAgICBub3JtYWxpemVQb3NpdGl2ZUludGVnZXIobm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5QYWdlID8/IGZhbGxiYWNrUGFnZSwgZmFsbGJhY2tQYWdlKVxyXG4gICk7XHJcblxyXG4gIGlmICh0b3RhbFBhZ2VzIDw9IDEpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIC4uLm5vcm1hbGl6ZWRJbml0aWFsUmVzcG9uc2UsXHJcbiAgICAgIFRvdGFsOiB0b3RhbFJlY29yZHMsXHJcbiAgICAgIFBhZ2U6IDEsXHJcbiAgICAgIFBhZ2VTaXplOiBlZmZlY3RpdmVQYWdlU2l6ZSxcclxuICAgICAgSXRlbXM6IGNsb25lSnNvbkNvbXBhdGlibGVWYWx1ZShub3JtYWxpemVkSW5pdGlhbFJlc3BvbnNlLkl0ZW1zKSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb25zdCBpdGVtc0J5UGFnZSA9IG5ldyBNYXA8bnVtYmVyLCBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0b1tdPigpO1xyXG4gIGl0ZW1zQnlQYWdlLnNldChjdXJyZW50UGFnZSwgY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlKG5vcm1hbGl6ZWRJbml0aWFsUmVzcG9uc2UuSXRlbXMpKTtcclxuXHJcbiAgZm9yIChsZXQgcGFnZU51bWJlciA9IDE7IHBhZ2VOdW1iZXIgPD0gdG90YWxQYWdlczsgcGFnZU51bWJlciArPSAxKSB7XHJcbiAgICBpZiAocGFnZU51bWJlciA9PT0gY3VycmVudFBhZ2UpIHtcclxuICAgICAgY29udGludWU7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFnZVJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlU2hlZXRMaXN0KFxyXG4gICAgICB7XHJcbiAgICAgICAgLi4ucGF5bG9hZCxcclxuICAgICAgICBwYWdlOiBwYWdlTnVtYmVyLFxyXG4gICAgICAgIHBhZ2VTaXplOiBlZmZlY3RpdmVQYWdlU2l6ZSxcclxuICAgICAgfSxcclxuICAgICAgYmFzZU9wdGlvbnNcclxuICAgICk7XHJcblxyXG4gICAgaWYgKHBhZ2VSZXNwb25zZS5TdWNjZXNzID09PSBmYWxzZSkge1xyXG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcclxuICAgICAgICBzYWZlVGV4dChwYWdlUmVzcG9uc2UuTWVzc2FnZSkgfHwgYENvdWxkIG5vdCBsb2FkIGV4cGVuc2Ugc2hlZXQgcGFnZSAke3BhZ2VOdW1iZXJ9LmBcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBpdGVtc0J5UGFnZS5zZXQocGFnZU51bWJlciwgY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlKHBhZ2VSZXNwb25zZS5JdGVtcykpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYWxsSXRlbXM6IEV4cGVuc2VTaGVldExpc3RJdGVtRHRvW10gPSBbXTtcclxuICBmb3IgKGxldCBwYWdlTnVtYmVyID0gMTsgcGFnZU51bWJlciA8PSB0b3RhbFBhZ2VzOyBwYWdlTnVtYmVyICs9IDEpIHtcclxuICAgIGNvbnN0IHBhZ2VJdGVtcyA9IGl0ZW1zQnlQYWdlLmdldChwYWdlTnVtYmVyKTtcclxuICAgIGlmICghQXJyYXkuaXNBcnJheShwYWdlSXRlbXMpIHx8IHBhZ2VJdGVtcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgY29udGludWU7XHJcbiAgICB9XHJcblxyXG4gICAgYWxsSXRlbXMucHVzaCguLi5wYWdlSXRlbXMpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLm5vcm1hbGl6ZWRJbml0aWFsUmVzcG9uc2UsXHJcbiAgICBUb3RhbDogdG90YWxSZWNvcmRzLFxyXG4gICAgUGFnZTogMSxcclxuICAgIFBhZ2VTaXplOiBlZmZlY3RpdmVQYWdlU2l6ZSxcclxuICAgIEl0ZW1zOiBhbGxJdGVtcyxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gTG9hZHMgb25lIGV4cGVuc2Ugc2hlZXQgZGV0YWlsIGZyb20gL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS5cclxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0RGV0YWlsID0gYXN5bmMgKFxyXG4gIGhvamFHYXN0b3NJZDogc3RyaW5nLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldERldGFpbER0bz4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0RGV0YWlsRHRvPj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH1gLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gUmVhZHMgYXZhaWxhYmxlIGN1cnJlbmNpZXMgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2N1cnJlbmNpZXMuXHJcbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlU2hlZXRDdXJyZW5jaWVzID0gYXN5bmMgKFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj4gPT4ge1xyXG4gIGxldCBjb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCB8IG51bGwgPSBudWxsO1xyXG4gIHRyeSB7XHJcbiAgICBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGlmICghKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikpIHtcclxuICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBjb21wYW55SWQgPSBzYWZlVGV4dChjb250ZXh0Py5jb21wYW55SWQgfHwgcmVhZFdpbmRvd1NlbGVjdGVkQ29tcGFueSgpKS50b1VwcGVyQ2FzZSgpO1xyXG4gIGNvbnN0IGNhY2hlS2V5ID0gY29tcGFueUlkIHx8IFwiLVwiO1xyXG5cclxuICBpZiAoY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuaGFzKGNhY2hlS2V5KSkge1xyXG4gICAgcmV0dXJuIGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLmdldChjYWNoZUtleSkgYXMgSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz47XHJcbiAgfVxyXG5cclxuICBpZiAocGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuaGFzKGNhY2hlS2V5KSkge1xyXG4gICAgcmV0dXJuIHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLmdldChjYWNoZUtleSkgYXMgUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPj47XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXF1ZXN0UHJvbWlzZSA9IChhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBoZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpO1xyXG4gICAgcmVtb3ZlSGVhZGVyVmFsdWUoaGVhZGVycywgXCJBdXRob3JpemF0aW9uXCIpO1xyXG4gICAgcmVtb3ZlSGVhZGVyVmFsdWUoaGVhZGVycywgXCJYLUlORC1BeFVzZXJJZFwiKTtcclxuXHJcbiAgICBpZiAoY29tcGFueUlkKSB7XHJcbiAgICAgIGhlYWRlcnNbXCJYLUlORC1Db21wYW55XCJdID0gY29tcGFueUlkO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvY3VycmVuY2llc1wiLCB7XHJcbiAgICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgICAgaGVhZGVycyxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBub3JtYWxpemVkUmVzcG9uc2UgPSBub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xyXG4gICAgICBpZiAobm9ybWFsaXplZFJlc3BvbnNlLlN1Y2Nlc3MpIHtcclxuICAgICAgICBjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcy5zZXQoY2FjaGVLZXksIG5vcm1hbGl6ZWRSZXNwb25zZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBub3JtYWxpemVkUmVzcG9uc2U7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBpZiAoIXNob3VsZFVzZUxlZ2FjeUZhbGxiYWNrKGVycm9yKSkge1xyXG4gICAgICAgIHRocm93IGVycm9yO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBsZWdhY3lMaXN0UmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248TGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZT4oXCIvR2FzdG9zL0xpc3RFeHBlbnNlU2hlZXRzXCIsIHtcclxuICAgICAgICAuLi5vcHRpb25zLFxyXG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgLi4uc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpLFxyXG4gICAgICAgICAgLi4uSlNPTl9IRUFERVJTLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgZmlsdGVyOiBcIlwiLFxyXG4gICAgICAgICAgaG9qYUdhc3Rvc0lkOiBcIlwiLFxyXG4gICAgICAgICAgYmlsbGVkTW9kZTogMixcclxuICAgICAgICAgIGZyb21EYXRlOiBcIlwiLFxyXG4gICAgICAgICAgdG9EYXRlOiBcIlwiLFxyXG4gICAgICAgICAgcHJvamVjdElkOiBcIlwiLFxyXG4gICAgICAgICAgY3VycmVuY3lDb2RlOiBcIlwiLFxyXG4gICAgICAgICAgcGFnZTogMSxcclxuICAgICAgICAgIHBhZ2VTaXplOiAyMDAsXHJcbiAgICAgICAgfSksXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3Qgc2VlbkNvZGVzID0gbmV3IFNldDxzdHJpbmc+KCk7XHJcbiAgICAgIGNvbnN0IHNvdXJjZUl0ZW1zID0gQXJyYXkuaXNBcnJheShsZWdhY3lMaXN0UmVzcG9uc2UuaXRlbXMpID8gbGVnYWN5TGlzdFJlc3BvbnNlLml0ZW1zIDogW107XHJcbiAgICAgIGNvbnN0IGZhbGxiYWNrSXRlbXM6IEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvW10gPSBzb3VyY2VJdGVtc1xyXG4gICAgICAgIC5tYXAoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeS5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCkpXHJcbiAgICAgICAgLmZpbHRlcigoY29kZSkgPT4gISFjb2RlKVxyXG4gICAgICAgIC5maWx0ZXIoKGNvZGUpID0+IHtcclxuICAgICAgICAgIGlmIChzZWVuQ29kZXMuaGFzKGNvZGUpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICBzZWVuQ29kZXMuYWRkKGNvZGUpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAubWFwKChjb2RlKSA9PiAoe1xyXG4gICAgICAgICAgQ3VycmVuY3lDb2RlOiBjb2RlLFxyXG4gICAgICAgICAgQ3VycmVuY3lDb2RlSVNPOiBjb2RlLFxyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICAgIGNvbnN0IGZhbGxiYWNrUmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+ID0ge1xyXG4gICAgICAgIFN1Y2Nlc3M6IGxlZ2FjeUxpc3RSZXNwb25zZS5zdWNjZXNzICE9PSBmYWxzZSxcclxuICAgICAgICBNZXNzYWdlOiBzYWZlVGV4dChsZWdhY3lMaXN0UmVzcG9uc2UubWVzc2FnZSkgfHwgXCJPS1wiLFxyXG4gICAgICAgIFRvdGFsOiBmYWxsYmFja0l0ZW1zLmxlbmd0aCxcclxuICAgICAgICBQYWdlOiAxLFxyXG4gICAgICAgIFBhZ2VTaXplOiBmYWxsYmFja0l0ZW1zLmxlbmd0aCxcclxuICAgICAgICBJdGVtczogZmFsbGJhY2tJdGVtcyxcclxuICAgICAgICBUcmFjZUlkOiB1bmRlZmluZWQsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBjb25zdCBub3JtYWxpemVkRmFsbGJhY2sgPSBub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2UoZmFsbGJhY2tSZXNwb25zZSk7XHJcbiAgICAgIGlmIChub3JtYWxpemVkRmFsbGJhY2suU3VjY2Vzcykge1xyXG4gICAgICAgIGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLnNldChjYWNoZUtleSwgbm9ybWFsaXplZEZhbGxiYWNrKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRGYWxsYmFjaztcclxuICAgIH1cclxuICB9KSgpO1xyXG5cclxuICBwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5zZXQoY2FjaGVLZXksIHJlcXVlc3RQcm9taXNlKTtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGF3YWl0IHJlcXVlc3RQcm9taXNlO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICBwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5kZWxldGUoY2FjaGVLZXkpO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIFJlYWRzIGF2YWlsYWJsZSBzdWJvcmRpbmF0ZXMgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3N1Ym9yZGluYXRlcy5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlcyA9IGFzeW5jIChcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0bz4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgLy8gU3Vib3JkaW5hdGVzIG11c3QgYWx3YXlzIHJlc29sdmUgZnJvbSB0aGUgbG9nZ2VkIGNvbnRleHQgdXNlciwgbm90IGZyb20gYWN0aW5nLXVzZXIgb3ZlcnJpZGVzLlxyXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMoYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCBmYWxzZSwgZmFsc2UpKTtcclxuICBjb25zdCBjb250ZXh0QXhVc2VySWQgPSBzYWZlVGV4dChjb250ZXh0LmF4VXNlcklkKTtcclxuICBpZiAoY29udGV4dEF4VXNlcklkKSB7XHJcbiAgICBoZWFkZXJzW1wiWC1JTkQtQXhVc2VySWRcIl0gPSBjb250ZXh0QXhVc2VySWQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPHVua25vd24+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvc3Vib3JkaW5hdGVzXCIsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICBoZWFkZXJzLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBFeHBvc2VzIHRoZSBkZWZhdWx0IGN1cnJlbmN5IHJlc29sdmVkIGZyb20gRW50cmEgY29udGV4dCBmb3IgaW5pdGlhbCBzZWxlY3Rpb25zLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVNoZWV0RGVmYXVsdEN1cnJlbmN5Q29kZSA9IGFzeW5jIChvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIHNhZmVUZXh0KGNvbnRleHQuZGVmYXVsdEN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKTtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIFJlYWRzIGV4Y2hhbmdlIHJhdGUgZnJvbSAvYXBpL3N5c3RlbS9leGNoYW5nZS1yYXRlLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhjaGFuZ2VSYXRlID0gYXN5bmMgKFxyXG4gIGJhc2VDdXJyZW5jeTogc3RyaW5nLFxyXG4gIHRhcmdldEN1cnJlbmN5OiBzdHJpbmcsXHJcbiAgZGF0ZT86IHN0cmluZyxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RXhjaGFuZ2VSYXRlRHRvPj4gPT4ge1xyXG4gIGNvbnN0IHRva2VuID0gcmVzb2x2ZUF1dGhUb2tlbihvcHRpb25zKTtcclxuICBjb25zdCBub3JtYWxpemVkQmFzZUN1cnJlbmN5ID0gc2FmZVRleHQoYmFzZUN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRUYXJnZXRDdXJyZW5jeSA9IHNhZmVUZXh0KHRhcmdldEN1cnJlbmN5KS50b1VwcGVyQ2FzZSgpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWREYXRlID0gc2FmZVRleHQoZGF0ZSk7XHJcbiAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XHJcblxyXG4gIHF1ZXJ5LnNldChcImJhc2VDdXJyZW5jeVwiLCBub3JtYWxpemVkQmFzZUN1cnJlbmN5KTtcclxuICBxdWVyeS5zZXQoXCJ0YXJnZXRDdXJyZW5jeVwiLCBub3JtYWxpemVkVGFyZ2V0Q3VycmVuY3kpO1xyXG4gIGlmIChub3JtYWxpemVkRGF0ZSkge1xyXG4gICAgcXVlcnkuc2V0KFwiZGF0ZVwiLCBub3JtYWxpemVkRGF0ZSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBoZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpO1xyXG4gIGlmICh0b2tlbikge1xyXG4gICAgaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke3Rva2VufWA7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4Y2hhbmdlUmF0ZUR0bz4+KGAvYXBpL3N5c3RlbS9leGNoYW5nZS1yYXRlPyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgaGVhZGVycyxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIFJlYWRzIGV4Y2hhbmdlIHJhdGUgZnJvbSAvYXBpL3N5c3RlbS9leGNoYW5nZS1yYXRlL3B1YmxpYy1kaXJlY3QuXHJcbmV4cG9ydCBjb25zdCBnZXRFeGNoYW5nZVJhdGVQdWJsaWNEaXJlY3QgPSBhc3luYyAoXHJcbiAgYmFzZUN1cnJlbmN5OiBzdHJpbmcsXHJcbiAgdGFyZ2V0Q3VycmVuY3k6IHN0cmluZyxcclxuICBkYXRlPzogc3RyaW5nLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeGNoYW5nZVJhdGVEdG8+PiA9PiB7XHJcbiAgY29uc3QgdG9rZW4gPSByZXNvbHZlQXV0aFRva2VuKG9wdGlvbnMpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kgPSBzYWZlVGV4dChiYXNlQ3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFRhcmdldEN1cnJlbmN5ID0gc2FmZVRleHQodGFyZ2V0Q3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZERhdGUgPSBzYWZlVGV4dChkYXRlKTtcclxuICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcclxuXHJcbiAgcXVlcnkuc2V0KFwiYmFzZUN1cnJlbmN5XCIsIG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kpO1xyXG4gIHF1ZXJ5LnNldChcInRhcmdldEN1cnJlbmN5XCIsIG5vcm1hbGl6ZWRUYXJnZXRDdXJyZW5jeSk7XHJcbiAgaWYgKG5vcm1hbGl6ZWREYXRlKSB7XHJcbiAgICBxdWVyeS5zZXQoXCJkYXRlXCIsIG5vcm1hbGl6ZWREYXRlKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XHJcbiAgaWYgKHRva2VuKSB7XHJcbiAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7dG9rZW59YDtcclxuICB9XHJcblxyXG4gIHJldHVybiBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhjaGFuZ2VSYXRlRHRvPj4oYC9hcGkvc3lzdGVtL2V4Y2hhbmdlLXJhdGUvcHVibGljLWRpcmVjdD8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgIGhlYWRlcnMsXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyBSZWFkcyBmdWVsIHByaWNlIHBlciBrbSBmcm9tIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvZnVlbC1wcmljZS1rbS5cclxuZXhwb3J0IGNvbnN0IGdldEZ1ZWxQcmljZUttID0gYXN5bmMgKFxyXG4gIHRyYW5zRGF0ZTogc3RyaW5nLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxGdWVsUHJpY2VLbUR0bz4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZERhdGUgPSBub3JtYWxpemVSZXF1aXJlZEFwaURhdGUodHJhbnNEYXRlKTtcclxuICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcclxuXHJcbiAgcXVlcnkuc2V0KFwidHJhbnNEYXRlXCIsIG5vcm1hbGl6ZWREYXRlKTtcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RnVlbFByaWNlS21EdG8+PihcclxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2Z1ZWwtcHJpY2Uta20/JHtxdWVyeS50b1N0cmluZygpfWAsXHJcbiAgICB7XHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gQ3JlYXRlcyBhbiBleHBlbnNlIHNoZWV0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVFeHBlbnNlU2hlZXQgPSBhc3luYyAoXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3JlYXRlUmVzcG9uc2VEYXRhPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBtb2RlID0gcGF5bG9hZC5tb2RlID8/IDA7XHJcbiAgY29uc3QgbGluZXMgPSBBcnJheS5pc0FycmF5KHBheWxvYWQubGluZXMpID8gcGF5bG9hZC5saW5lcyA6IFtdO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRMaW5lcyA9IGxpbmVzLm1hcCgobGluZSkgPT4gKHtcbiAgICAuLi5saW5lLFxuICAgIHRyYW5zRGF0ZTogbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlKGxpbmUudHJhbnNEYXRlKSxcbiAgICByZWltYnVyc2FibGVFeHBlbnNlOiBub3JtYWxpemVFeHBlbnNlU2hlZXRSZWltYnVyc2FibGUobGluZS5yZWltYnVyc2FibGVFeHBlbnNlKSxcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGxpbmUuY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpIHx8IHVuZGVmaW5lZCxcbiAgICBhbW91bnRNU1Q6IHRvTnVsbGFibGVOdW1iZXIobGluZS5hbW91bnRNU1QpLFxuICAgIGV4Y2hSYXRlOiB0b051bGxhYmxlTnVtYmVyKGxpbmUuZXhjaFJhdGUpLFxuICB9KSk7XG4gIGNvbnN0IGhhc0ludmFsaWRMaW5lUGF5bG9hZCA9IG5vcm1hbGl6ZWRMaW5lcy5zb21lKChsaW5lKSA9PiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAhc2FmZVRleHQobGluZS50cmFuc0RhdGUpIHx8XHJcbiAgICAgICFOdW1iZXIuaXNJbnRlZ2VyKE51bWJlcihsaW5lLnR5cGVWYWx1ZSkpIHx8XHJcbiAgICAgIE51bWJlcihsaW5lLnR5cGVWYWx1ZSkgPD0gMCB8fFxyXG4gICAgICAhaXNQb3NpdGl2ZU51bWJlcihsaW5lLnF0eSkgfHxcclxuICAgICAgIWlzUG9zaXRpdmVOdW1iZXIobGluZS5wcmljZSlcclxuICAgICk7XHJcbiAgfSk7XHJcblxyXG4gIGlmIChwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyAhPT0gdW5kZWZpbmVkICYmICFpc05vbk5lZ2F0aXZlTnVtYmVyKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzKSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleHBlbnNlU2hlZXRTdGF0dXMgbXVzdCBiZSBncmVhdGVyIG9yIGVxdWFsIHRvIDAuXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSAhPT0gdW5kZWZpbmVkICYmICFpc05vbk5lZ2F0aXZlTnVtYmVyKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSkpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhjaGFuZ2VSYXRlTW9kZSBtdXN0IGJlIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMC5cIik7XHJcbiAgfVxyXG5cclxuICBpZiAocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlICE9PSB1bmRlZmluZWQgJiYgcGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleGNoYW5nZVJhdGVNb2RlIHJlcXVpcmVzIGV4cGVuc2VTaGVldFN0YXR1cy5cIik7XHJcbiAgfVxyXG5cclxuICBpZiAoaGFzSW52YWxpZExpbmVQYXlsb2FkKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkVhY2ggbGluZSByZXF1aXJlcyB0cmFuc0RhdGUsIHR5cGVWYWx1ZSwgcXR5ID4gMCBhbmQgcHJpY2UgPiAwLlwiKTtcclxuICB9XHJcblxyXG4gIGlmIChtb2RlID09PSAwKSB7XHJcbiAgICBpZiAoIXNhZmVUZXh0KHBheWxvYWQuZGVzY3JpcHRpb24pIHx8ICFzYWZlVGV4dChwYXlsb2FkLmN1cnJlbmN5Q29kZSkgfHwgbGluZXMubGVuZ3RoIDwgMSkge1xyXG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkludmFsaWQgY3JlYXRlIHBheWxvYWQgZm9yIG1vZGUgMC5cIik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAobW9kZSA9PT0gMSkge1xyXG4gICAgaWYgKCFzYWZlVGV4dChwYXlsb2FkLmRlc2NyaXB0aW9uKSB8fCAhc2FmZVRleHQocGF5bG9hZC5jdXJyZW5jeUNvZGUpKSB7XHJcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiSW52YWxpZCBjcmVhdGUgcGF5bG9hZCBmb3IgbW9kZSAxLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGluZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIk1vZGUgMSByZXF1aXJlcyBsaW5lcyB0byBiZSBudWxsIG9yIGVtcHR5LlwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChtb2RlID09PSAyKSB7XHJcbiAgICBpZiAoIXNhZmVUZXh0KHBheWxvYWQuZXhpc3RpbmdIb2phR2FzdG9zSWQpIHx8IGxpbmVzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJJbnZhbGlkIGNyZWF0ZSBwYXlsb2FkIGZvciBtb2RlIDIuXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3Qgbm9ybWFsaXplZFBheWxvYWQ6IEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QgPSB7XHJcbiAgICAuLi5wYXlsb2FkLFxyXG4gICAgbW9kZSxcclxuICAgIGV4aXN0aW5nSG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChwYXlsb2FkLmV4aXN0aW5nSG9qYUdhc3Rvc0lkKSB8fCB1bmRlZmluZWQsXHJcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQocGF5bG9hZC5kZXNjcmlwdGlvbikgfHwgdW5kZWZpbmVkLFxyXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChwYXlsb2FkLmN1cnJlbmN5Q29kZSkgfHwgdW5kZWZpbmVkLFxuICAgIHByb2pJZDogc2FmZVRleHQocGF5bG9hZC5wcm9qSWQpIHx8IHVuZGVmaW5lZCxcbiAgICByZWltYnVyc2FibGVFeHBlbnNlOiBub3JtYWxpemVFeHBlbnNlU2hlZXRSZWltYnVyc2FibGUocGF5bG9hZC5yZWltYnVyc2FibGVFeHBlbnNlKSxcbiAgICBsaW5lczogbW9kZSA9PT0gMSA/IFtdIDogbm9ybWFsaXplZExpbmVzLFxuICB9O1xuICBjb25zdCBpbmNsdWRlQXhVc2VyT3ZlcnJpZGUgPSBtb2RlID09PSAyO1xyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRDcmVhdGVSZXNwb25zZURhdGE+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHNcIiwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAvLyBIZWFkZXIgY3JlYXRlIGZsb3dzIG11c3QgYWx3YXlzIHJ1biBpbiB0aGUgc2lnbmVkLWluIHVzZXIgY29udGV4dC5cclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSwgaW5jbHVkZUF4VXNlck92ZXJyaWRlKSxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5vcm1hbGl6ZWRQYXlsb2FkKSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIFVwZGF0ZXMgaGVhZGVyIGZpZWxkcyB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9LlxyXG5leHBvcnQgY29uc3QgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyID0gYXN5bmMgKFxyXG4gIGhvamFHYXN0b3NJZDogc3RyaW5nLFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldEhlYWRlclVwZGF0ZVJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPHsgSG9qYUdhc3Rvc0lkOiBzdHJpbmcgfT4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xyXG5cclxuICBpZiAocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMgIT09IHVuZGVmaW5lZCAmJiAhaXNOb25OZWdhdGl2ZU51bWJlcihwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cykpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhwZW5zZVNoZWV0U3RhdHVzIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byAwLlwiKTtcclxuICB9XHJcblxyXG4gIGlmIChwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUgIT09IHVuZGVmaW5lZCAmJiAhaXNOb25OZWdhdGl2ZU51bWJlcihwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleGNoYW5nZVJhdGVNb2RlIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byAwLlwiKTtcbiAgfVxuXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0ID0ge1xuICAgIC4uLnBheWxvYWQsXG4gICAgcmVpbWJ1cnNhYmxlRXhwZW5zZTogbm9ybWFsaXplRXhwZW5zZVNoZWV0UmVpbWJ1cnNhYmxlKHBheWxvYWQucmVpbWJ1cnNhYmxlRXhwZW5zZSksXG4gIH07XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8eyBIb2phR2FzdG9zSWQ6IHN0cmluZyB9Pj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH1gLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXG4gIH0pO1xuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIERlbGV0ZXMgYSBmdWxsIGV4cGVuc2Ugc2hlZXQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS9saW5lcy8wP2RlbGV0ZVdob2xlU2hlZXQ9dHJ1ZS5cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VTaGVldCA9IGFzeW5jIChcclxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+PihcclxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9L2xpbmVzLzA/ZGVsZXRlTW9kZT0yJmRlbGV0ZVdob2xlU2hlZXQ9dHJ1ZWAsXHJcbiAgICB7XHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gVXBkYXRlcyBvbmUgZXhwZW5zZSBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0vbGluZXMve2xpbmVSZWNJZH0uXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVFeHBlbnNlU2hlZXRMaW5lID0gYXN5bmMgKFxyXG4gIGhvamFHYXN0b3NJZDogc3RyaW5nLFxyXG4gIGxpbmVSZWNJZDogc3RyaW5nLFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVzcG9uc2VEYXRhPj4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc0RhdGUgPSBub3JtYWxpemVSZXF1aXJlZEFwaURhdGUocGF5bG9hZC50cmFuc0RhdGUpO1xyXG4gIGlmIChcclxuICAgICFOdW1iZXIuaXNJbnRlZ2VyKE51bWJlcihwYXlsb2FkLnR5cGVWYWx1ZSkpIHx8XHJcbiAgICBOdW1iZXIocGF5bG9hZC50eXBlVmFsdWUpIDw9IDAgfHxcclxuICAgICFpc1Bvc2l0aXZlTnVtYmVyKHBheWxvYWQucXR5KSB8fFxyXG4gICAgIWlzUG9zaXRpdmVOdW1iZXIocGF5bG9hZC5wcmljZSlcclxuICApIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwidHJhbnNEYXRlLCB0eXBlVmFsdWUsIHF0eSA+IDAgYW5kIHByaWNlID4gMCBhcmUgcmVxdWlyZWQuXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCBzYWZlTGluZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhsaW5lUmVjSWQgfHwgXCJcIikudHJpbSgpKTtcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlc3BvbnNlRGF0YT4+KFxyXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH0vbGluZXMvJHtzYWZlTGluZUlkfWAsXHJcbiAgICB7XHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIC4uLnBheWxvYWQsXG4gICAgICAgIHRyYW5zRGF0ZTogbm9ybWFsaXplZFRyYW5zRGF0ZSxcbiAgICAgICAgcmVpbWJ1cnNhYmxlRXhwZW5zZTogbm9ybWFsaXplRXhwZW5zZVNoZWV0UmVpbWJ1cnNhYmxlKHBheWxvYWQucmVpbWJ1cnNhYmxlRXhwZW5zZSksXG4gICAgICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQocGF5bG9hZC5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCkgfHwgdW5kZWZpbmVkLFxuICAgICAgICBhbW91bnRNU1Q6IHRvTnVsbGFibGVOdW1iZXIocGF5bG9hZC5hbW91bnRNU1QpLFxuICAgICAgICBleGNoUmF0ZTogdG9OdWxsYWJsZU51bWJlcihwYXlsb2FkLmV4Y2hSYXRlKSxcbiAgICAgIH0pLFxuICAgIH1cbiAgKTtcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBEZWxldGVzIG9uZSBleHBlbnNlIGxpbmUgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS9saW5lcy97bGluZVJlY0lkfT9kZWxldGVXaG9sZVNoZWV0PWZhbHNlLlxyXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0TGluZSA9IGFzeW5jIChcclxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcclxuICBsaW5lUmVjSWQ6IHN0cmluZyxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHNhZmVMaW5lSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGxpbmVSZWNJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+PihcclxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9L2xpbmVzLyR7c2FmZUxpbmVJZH0/ZGVsZXRlTW9kZT0wJmRlbGV0ZVdob2xlU2hlZXQ9ZmFsc2VgLFxyXG4gICAge1xyXG4gICAgICAuLi5vcHRpb25zLFxyXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUV4cGVuc2VTaGVldHNBc2tSZXNwb25zZSA9IChyZXNwb25zZTogRXhwZW5zZVNoZWV0c0Fza1Jlc3VsdCk6IEV4cGVuc2VTaGVldHNBc2tSZXN1bHQgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgY29uc3QgcmF3RGF0YSA9IG5vcm1hbGl6ZWQ/LkRhdGE7XHJcbiAgaWYgKCFyYXdEYXRhIHx8IHR5cGVvZiByYXdEYXRhICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAuLi5ub3JtYWxpemVkLFxyXG4gICAgICBNZXNzYWdlOiBzYW5pdGl6ZUFzc2lzdGFudFRleHQobm9ybWFsaXplZD8uTWVzc2FnZSksXHJcbiAgICAgIEh0dHBTdGF0dXM6IHR5cGVvZiByZXNwb25zZT8uSHR0cFN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IHJlc3BvbnNlLkh0dHBTdGF0dXMgOiB1bmRlZmluZWQsXHJcbiAgICAgIFJldHJ5QWZ0ZXI6IHNhZmVUZXh0KHJlc3BvbnNlPy5SZXRyeUFmdGVyKSB8fCBudWxsLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJhd1dhcm5pbmdzID1cclxuICAgIChyYXdEYXRhIGFzIHsgV2FybmluZ3M/OiB1bmtub3duOyB3YXJuaW5ncz86IHVua25vd24gfSkuV2FybmluZ3MgPz9cclxuICAgIChyYXdEYXRhIGFzIHsgd2FybmluZ3M/OiB1bmtub3duIH0pLndhcm5pbmdzO1xyXG4gIGNvbnN0IHJhd0ZpbHRlcnNBcHBsaWVkID1cclxuICAgIChyYXdEYXRhIGFzIHsgRmlsdGVyc0FwcGxpZWQ/OiB1bmtub3duOyBmaWx0ZXJzQXBwbGllZD86IHVua25vd24gfSkuRmlsdGVyc0FwcGxpZWQgPz9cclxuICAgIChyYXdEYXRhIGFzIHsgZmlsdGVyc0FwcGxpZWQ/OiB1bmtub3duIH0pLmZpbHRlcnNBcHBsaWVkO1xyXG5cclxuICBjb25zdCBpc0lnbm9yYWJsZUFzc2lzdGFudFdhcm5pbmcgPSAod2FybmluZzogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgICBjb25zdCBub3JtYWxpemVkV2FybmluZyA9IHNhbml0aXplQXNzaXN0YW50VGV4dCh3YXJuaW5nKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKCFub3JtYWxpemVkV2FybmluZykgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZWRXYXJuaW5nLmluY2x1ZGVzKFwic291cmNlanNvblwiKSAmJlxyXG4gICAgICAobm9ybWFsaXplZFdhcm5pbmcuaW5jbHVkZXMoXCJza2lwcGVkXCIpIHx8IG5vcm1hbGl6ZWRXYXJuaW5nLmluY2x1ZGVzKFwib21pdFwiKSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLm5vcm1hbGl6ZWQsXHJcbiAgICBNZXNzYWdlOiBzYW5pdGl6ZUFzc2lzdGFudFRleHQobm9ybWFsaXplZD8uTWVzc2FnZSksXHJcbiAgICBIdHRwU3RhdHVzOiB0eXBlb2YgcmVzcG9uc2U/Lkh0dHBTdGF0dXMgPT09IFwibnVtYmVyXCIgPyByZXNwb25zZS5IdHRwU3RhdHVzIDogdW5kZWZpbmVkLFxyXG4gICAgUmV0cnlBZnRlcjogc2FmZVRleHQocmVzcG9uc2U/LlJldHJ5QWZ0ZXIpIHx8IG51bGwsXHJcbiAgICBEYXRhOiB7XHJcbiAgICAgIEFuc3dlcjogc2FuaXRpemVBc3Npc3RhbnRUZXh0KFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgQW5zd2VyPzogdW5rbm93bjsgYW5zd2VyPzogdW5rbm93biB9KS5BbnN3ZXIgPz8gKHJhd0RhdGEgYXMgeyBhbnN3ZXI/OiB1bmtub3duIH0pLmFuc3dlclxyXG4gICAgICApLFxyXG4gICAgICBNb2RlbDogc2FuaXRpemVBc3Npc3RhbnRUZXh0KFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgTW9kZWw/OiB1bmtub3duOyBtb2RlbD86IHVua25vd24gfSkuTW9kZWwgPz8gKHJhd0RhdGEgYXMgeyBtb2RlbD86IHVua25vd24gfSkubW9kZWxcclxuICAgICAgKSxcclxuICAgICAgU291cmNlS2V5OiBzYW5pdGl6ZUFzc2lzdGFudFRleHQoXHJcbiAgICAgICAgKHJhd0RhdGEgYXMgeyBTb3VyY2VLZXk/OiB1bmtub3duOyBzb3VyY2VLZXk/OiB1bmtub3duIH0pLlNvdXJjZUtleSA/P1xyXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBzb3VyY2VLZXk/OiB1bmtub3duIH0pLnNvdXJjZUtleVxyXG4gICAgICApLFxyXG4gICAgICBGaWx0ZXJzQXBwbGllZDpcclxuICAgICAgICByYXdGaWx0ZXJzQXBwbGllZCAmJiB0eXBlb2YgcmF3RmlsdGVyc0FwcGxpZWQgPT09IFwib2JqZWN0XCJcclxuICAgICAgICAgID8gY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlKHJhd0ZpbHRlcnNBcHBsaWVkIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KVxyXG4gICAgICAgICAgOiBudWxsLFxyXG4gICAgICBUb3RhbFNvdXJjZVJlY29yZHM6XHJcbiAgICAgICAgdG9OdWxsYWJsZU51bWJlcihcclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgVG90YWxTb3VyY2VSZWNvcmRzPzogdW5rbm93bjsgdG90YWxTb3VyY2VSZWNvcmRzPzogdW5rbm93biB9KS5Ub3RhbFNvdXJjZVJlY29yZHMgPz9cclxuICAgICAgICAgICAgKHJhd0RhdGEgYXMgeyB0b3RhbFNvdXJjZVJlY29yZHM/OiB1bmtub3duIH0pLnRvdGFsU291cmNlUmVjb3Jkc1xyXG4gICAgICAgICkgPz8gbnVsbCxcclxuICAgICAgUmVjb3Jkc1NlbnRUb01vZGVsOlxyXG4gICAgICAgIHRvTnVsbGFibGVOdW1iZXIoXHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IFJlY29yZHNTZW50VG9Nb2RlbD86IHVua25vd247IHJlY29yZHNTZW50VG9Nb2RlbD86IHVua25vd24gfSkuUmVjb3Jkc1NlbnRUb01vZGVsID8/XHJcbiAgICAgICAgICAgIChyYXdEYXRhIGFzIHsgcmVjb3Jkc1NlbnRUb01vZGVsPzogdW5rbm93biB9KS5yZWNvcmRzU2VudFRvTW9kZWxcclxuICAgICAgICApID8/IG51bGwsXHJcbiAgICAgIFJldHJpZXZhbE1vZGU6IHNhbml0aXplQXNzaXN0YW50VGV4dChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IFJldHJpZXZhbE1vZGU/OiB1bmtub3duOyByZXRyaWV2YWxNb2RlPzogdW5rbm93biB9KS5SZXRyaWV2YWxNb2RlID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IHJldHJpZXZhbE1vZGU/OiB1bmtub3duIH0pLnJldHJpZXZhbE1vZGVcclxuICAgICAgKSB8fCBudWxsLFxyXG4gICAgICBUcnVuY2F0ZWQ6IHRvTnVsbGFibGVCb29sKFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgVHJ1bmNhdGVkPzogdW5rbm93bjsgdHJ1bmNhdGVkPzogdW5rbm93biB9KS5UcnVuY2F0ZWQgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgdHJ1bmNhdGVkPzogdW5rbm93biB9KS50cnVuY2F0ZWRcclxuICAgICAgKSxcclxuICAgICAgV2FybmluZ3M6IEFycmF5LmlzQXJyYXkocmF3V2FybmluZ3MpXHJcbiAgICAgICAgPyByYXdXYXJuaW5nc1xyXG4gICAgICAgICAgICAubWFwKChlbnRyeSkgPT4gc2FuaXRpemVBc3Npc3RhbnRUZXh0KGVudHJ5KSlcclxuICAgICAgICAgICAgLmZpbHRlcigoZW50cnkpID0+IGVudHJ5ICYmICFpc0lnbm9yYWJsZUFzc2lzdGFudFdhcm5pbmcoZW50cnkpKVxyXG4gICAgICAgIDogW10sXHJcbiAgICB9LFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBBc2tzIGJ1c2luZXNzIHF1ZXN0aW9ucyBhYm91dCB0aGUgY3VycmVudCBleHBlbnNlIHNoZWV0IGxpc3QgdXNpbmcgL2FwaS9pYS9zZXJ2aWNlL2V4cGVuc2VzaGVldHMvYXNrLlxyXG5leHBvcnQgY29uc3QgYXNrRXhwZW5zZVNoZWV0c1F1ZXN0aW9uID0gYXN5bmMgKFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldHNBc2tSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxFeHBlbnNlU2hlZXRzQXNrUmVzdWx0PiA9PiB7XHJcbiAgY29uc3QgcXVlc3Rpb24gPSBzYWZlVGV4dChwYXlsb2FkPy5xdWVzdGlvbik7XHJcbiAgaWYgKCFxdWVzdGlvbikge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJxdWVzdGlvbiBpcyByZXF1aXJlZC5cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3QgY3NyZlRva2VuID0gZ2V0Q3NyZlRva2VuKCk7XHJcbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpKTtcclxuICBpZiAoY3NyZlRva2VuKSB7XHJcbiAgICBoZWFkZXJzLlJlcXVlc3RWZXJpZmljYXRpb25Ub2tlbiA9IGNzcmZUb2tlbjtcclxuICB9XHJcblxyXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRzQXNrUmVxdWVzdCA9IHtcclxuICAgIHF1ZXN0aW9uLFxyXG4gICAgYW5zd2VySW5zdHJ1Y3Rpb25zOiBzYWZlVGV4dChwYXlsb2FkPy5hbnN3ZXJJbnN0cnVjdGlvbnMpIHx8IHVuZGVmaW5lZCxcclxuICAgIGxpc3RSZXF1ZXN0OiBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUocGF5bG9hZC5saXN0UmVxdWVzdCksXHJcbiAgICBzb3VyY2VKc29uOlxyXG4gICAgICBwYXlsb2FkPy5zb3VyY2VKc29uID09PSBudWxsIHx8IHBheWxvYWQ/LnNvdXJjZUpzb24gPT09IHVuZGVmaW5lZFxyXG4gICAgICAgID8gdW5kZWZpbmVkXHJcbiAgICAgICAgOiBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUocGF5bG9hZC5zb3VyY2VKc29uKSxcclxuICB9O1xyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9pYS9zZXJ2aWNlL2V4cGVuc2VzaGVldHMvYXNrXCIsIHtcclxuICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnMsXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHJhdyA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcclxuICBjb25zdCByZXRyeUFmdGVyID0gc2FmZVRleHQocmVzcG9uc2UuaGVhZGVycy5nZXQoXCJSZXRyeS1BZnRlclwiKSk7XHJcblxyXG4gIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgIGNvbnN0IHJlbG9naW5SZXN1bHQgPSBhd2FpdCBoYW5kbGVBcGlBdXRoRmFpbHVyZTxFeHBlbnNlU2hlZXRzQXNrUmVzdWx0PihyYXcsIHJlc3BvbnNlLnN0YXR1cywgXCJleHBlbnNlLXNoZWV0cy1hc2tcIik7XHJcbiAgICBpZiAocmVsb2dpblJlc3VsdCAhPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gcmVsb2dpblJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IocmVhZEFwaU1lc3NhZ2VGcm9tUmF3KHJhdykgfHwgXCJQZXJtaXNzaW9uIGRlbmllZC5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgcGFyc2VkID0gdHJ5UGFyc2VKc29uKHJhdyk7XHJcbiAgaWYgKCFwYXJzZWQgfHwgdHlwZW9mIHBhcnNlZCAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihyZWFkQXBpTWVzc2FnZUZyb21SYXcocmF3KSB8fCBcIlJlcXVlc3QgZmFpbGVkLlwiLCByZXNwb25zZS5zdGF0dXMsIHJhdyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJJbnZhbGlkIHNlcnZlciByZXNwb25zZS5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUV4cGVuc2VTaGVldHNBc2tSZXNwb25zZSh7XHJcbiAgICAuLi4ocGFyc2VkIGFzIEV4cGVuc2VTaGVldHNBc2tSZXN1bHQpLFxyXG4gICAgSHR0cFN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxyXG4gICAgUmV0cnlBZnRlcjogcmV0cnlBZnRlciB8fCBudWxsLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gRXh0cmFjdHMgYW4gZXhwZW5zZSBkcmFmdCBmcm9tIGEgdGlja2V0IGltYWdlIHVzaW5nIC9hcGkvaWEvc2VydmljZS9leHBlbnNlZnJvbXRpY2tldC5cclxuZXhwb3J0IGNvbnN0IGV4dHJhY3RFeHBlbnNlRnJvbVRpY2tldERyYWZ0ID0gYXN5bmMgKFxyXG4gIHRpY2tldEltYWdlOiBGaWxlIHwgQmxvYixcclxuICBwZXJzaXN0VGlja2V0PzogYm9vbGVhbixcclxuICB0aWNrZXRVcmxGaWxlPzogc3RyaW5nLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXREcmFmdFJlc3BvbnNlPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgY29uc3Qgc2FmZVRpY2tldFVybCA9IHNhZmVUZXh0KHRpY2tldFVybEZpbGUpO1xyXG5cclxuICBpZiAodGlja2V0SW1hZ2UgaW5zdGFuY2VvZiBGaWxlKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcInRpY2tldEltYWdlXCIsIHRpY2tldEltYWdlLCBzYWZlVGV4dCh0aWNrZXRJbWFnZS5uYW1lKSB8fCBcInRpY2tldC5qcGdcIik7XHJcbiAgfSBlbHNlIHtcclxuICAgIGZvcm0uYXBwZW5kKFwidGlja2V0SW1hZ2VcIiwgdGlja2V0SW1hZ2UsIFwidGlja2V0LmpwZ1wiKTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2YgcGVyc2lzdFRpY2tldCA9PT0gXCJib29sZWFuXCIpIHtcclxuICAgIGZvcm0uYXBwZW5kKFwicGVyc2lzdFRpY2tldFwiLCBwZXJzaXN0VGlja2V0ID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHNhZmVUaWNrZXRVcmwpIHtcclxuICAgIGZvcm0uYXBwZW5kKFwidGlja2V0VXJsRmlsZVwiLCBzYWZlVGlja2V0VXJsKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldERyYWZ0UmVzcG9uc2U+PihcIi9hcGkvaWEvc2VydmljZS9leHBlbnNlZnJvbXRpY2tldFwiLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUZvcm1IZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gICAgYm9keTogZm9ybSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIENyZWF0ZXMgYW5kIGZpbmFsaXplcyBvbmUgdGlja2V0IGZyb20gYSBzaW5nbGUgbXVsdGlwYXJ0IHVwbG9hZCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvcXVpY2stY3JlYXRlLlxyXG5leHBvcnQgY29uc3QgY3JlYXRlRXhwZW5zZVNoZWV0VGlja2V0UXVpY2sgPSBhc3luYyAoXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlc3VsdD4gPT4ge1xuICBpZiAoIXBheWxvYWQ/LnRpY2tldEltYWdlKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcInRpY2tldEltYWdlIGlzIHJlcXVpcmVkLlwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IF9zdXBwcmVzc1Blcm1pc3Npb25Nb2RhbCwgLi4uZmV0Y2hPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChmZXRjaE9wdGlvbnMpO1xyXG4gIGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcclxuICBjb25zdCBzYWZlQ3VycmVuY3lDb2RlID0gc2FmZVRleHQocGF5bG9hZD8uY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpO1xyXG4gIGNvbnN0IHNhZmVEZXNjcmlwdGlvbiA9IHNhZmVUZXh0KHBheWxvYWQ/LmRlc2NyaXB0aW9uKTtcbiAgY29uc3Qgc2FmZUNvbWVudGFyaW8gPSBzYWZlVGV4dChwYXlsb2FkPy5jb21lbnRhcmlvKTtcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChwYXlsb2FkPy5leGlzdGluZ0hvamFHYXN0b3NJZCk7XG4gIGNvbnN0IHNhZmVQcm9qZWN0SWQgPSBzYWZlVGV4dChwYXlsb2FkPy5wcm9qSWQgfHwgcGF5bG9hZD8ucHJvamVjdElkKTtcbiAgY29uc3QgdGlja2V0SW1hZ2UgPSBwYXlsb2FkLnRpY2tldEltYWdlO1xuXHJcbiAgaWYgKHRpY2tldEltYWdlIGluc3RhbmNlb2YgRmlsZSkge1xyXG4gICAgZm9ybS5hcHBlbmQoXCJ0aWNrZXRJbWFnZVwiLCB0aWNrZXRJbWFnZSwgc2FmZVRleHQodGlja2V0SW1hZ2UubmFtZSkgfHwgXCJ0aWNrZXQuanBnXCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBmb3JtLmFwcGVuZChcInRpY2tldEltYWdlXCIsIHRpY2tldEltYWdlLCBcInRpY2tldC5qcGdcIik7XHJcbiAgfVxyXG5cclxuICBpZiAoc2FmZUN1cnJlbmN5Q29kZSkge1xyXG4gICAgZm9ybS5hcHBlbmQoXCJjdXJyZW5jeUNvZGVcIiwgc2FmZUN1cnJlbmN5Q29kZSk7XHJcbiAgfVxyXG5cclxuICBpZiAoXCJkZXNjcmlwdGlvblwiIGluIHBheWxvYWQpIHtcclxuICAgIGZvcm0uYXBwZW5kKFwiZGVzY3JpcHRpb25cIiwgc2FmZURlc2NyaXB0aW9uKTtcclxuICB9XHJcblxyXG4gIGlmIChcImNvbWVudGFyaW9cIiBpbiBwYXlsb2FkKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcImNvbWVudGFyaW9cIiwgc2FmZUNvbWVudGFyaW8pO1xyXG4gIH1cclxuXHJcbiAgaWYgKHNhZmVTaGVldElkKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcImV4aXN0aW5nSG9qYUdhc3Rvc0lkXCIsIHNhZmVTaGVldElkKTtcclxuICB9XHJcblxyXG4gIGlmIChzYWZlU2hlZXRJZCAmJiBzYWZlUHJvamVjdElkKSB7XG4gICAgZm9ybS5hcHBlbmQoXCJwcm9qSWRcIiwgc2FmZVByb2plY3RJZCk7XG4gIH1cblxyXG4gIGNvbnN0IGNzcmZUb2tlbiA9IGdldENzcmZUb2tlbigpO1xyXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMoYnVpbGRFeHBlbnNlRm9ybUhlYWRlcnMoY29udGV4dCwgZmV0Y2hPcHRpb25zKSk7XHJcbiAgaWYgKGNzcmZUb2tlbikge1xyXG4gICAgaGVhZGVycy5SZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW4gPSBjc3JmVG9rZW47XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3F1aWNrLWNyZWF0ZVwiLCB7XHJcbiAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxyXG4gICAgLi4uZmV0Y2hPcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnMsXHJcbiAgICBib2R5OiBmb3JtLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCByYXcgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgY29uc3QgcmV0cnlBZnRlciA9IHNhZmVUZXh0KHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiUmV0cnktQWZ0ZXJcIikpO1xyXG5cclxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICBjb25zdCByZWxvZ2luUmVzdWx0ID0gYXdhaXQgaGFuZGxlQXBpQXV0aEZhaWx1cmU8RXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQ+KFxyXG4gICAgICByYXcsXHJcbiAgICAgIHJlc3BvbnNlLnN0YXR1cyxcclxuICAgICAgXCJ0aWNrZXQtcXVpY2stY3JlYXRlXCJcclxuICAgICk7XHJcbiAgICBpZiAocmVsb2dpblJlc3VsdCAhPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gcmVsb2dpblJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IocmVhZEFwaU1lc3NhZ2VGcm9tUmF3KHJhdykgfHwgXCJQZXJtaXNzaW9uIGRlbmllZC5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgcGFyc2VkID0gdHJ5UGFyc2VKc29uKHJhdyk7XHJcbiAgaWYgKCFwYXJzZWQgfHwgdHlwZW9mIHBhcnNlZCAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihyZWFkQXBpTWVzc2FnZUZyb21SYXcocmF3KSB8fCBcIlJlcXVlc3QgZmFpbGVkLlwiLCByZXNwb25zZS5zdGF0dXMsIHJhdyk7XHJcbiAgICB9XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkludmFsaWQgc2VydmVyIHJlc3BvbnNlLlwiLCByZXNwb25zZS5zdGF0dXMsIHJhdyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZSh7XHJcbiAgICAuLi4ocGFyc2VkIGFzIEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVzdWx0KSxcclxuICAgIEh0dHBTdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcclxuICAgIFJldHJ5QWZ0ZXI6IHJldHJ5QWZ0ZXIgfHwgbnVsbCxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIENyZWF0ZXMgYSB0aWNrZXQgaGVhZGVyL2xpbmVzIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRDcmVhdGVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IG1vZGUgPSBOdW1iZXIocGF5bG9hZD8ubW9kZSk7XG4gIGNvbnN0IHJhd1RyYW5zRGF0ZSA9IHNhZmVUZXh0KHBheWxvYWQ/LnRyYW5zRGF0ZSk7XG4gIGNvbnN0IHJhd1RpY2tldERhdGUgPSBzYWZlVGV4dChwYXlsb2FkPy50aWNrZXREYXRlKTtcbiAgY29uc3Qgbm9ybWFsaXplZFRyYW5zRGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdUcmFuc0RhdGUpO1xuICBjb25zdCBub3JtYWxpemVkVGlja2V0RGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdUaWNrZXREYXRlKTtcblxuICBpZiAocmF3VHJhbnNEYXRlICYmICFub3JtYWxpemVkVHJhbnNEYXRlKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XG4gIH1cbiAgaWYgKHJhd1RpY2tldERhdGUgJiYgIW5vcm1hbGl6ZWRUaWNrZXREYXRlKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XG4gIH1cblxyXG4gIGlmICgobW9kZSA9PT0gMCB8fCBtb2RlID09PSAxKSAmJiAhbm9ybWFsaXplZFRyYW5zRGF0ZSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzYWZlUGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0Q3JlYXRlUmVxdWVzdCA9IHtcclxuICAgIC4uLnBheWxvYWQsXG4gICAgdHJhbnNEYXRlOiBub3JtYWxpemVkVHJhbnNEYXRlIHx8IHVuZGVmaW5lZCxcbiAgICB0aWNrZXREYXRlOiBub3JtYWxpemVkVGlja2V0RGF0ZSB8fCB1bmRlZmluZWQsXG4gICAgZ2FzdG9UeXBlOiBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZShwYXlsb2FkPy5nYXN0b1R5cGUpLFxuICB9O1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0c1wiLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVUaWNrZXRGaWx0ZXJDcml0ZXJpYVBheWxvYWQgPSA8XHJcbiAgVCBleHRlbmRzIHtcclxuICAgIGNyZWF0ZWREYXRlRnJvbT86IHN0cmluZztcclxuICAgIGNyZWF0ZWREYXRlVG8/OiBzdHJpbmc7XHJcbiAgICBzZWFyY2hLZXk/OiBzdHJpbmc7XHJcbiAgICBmaWx0ZXI/OiBzdHJpbmc7XHJcbiAgICBjdXJyZW5jeUNvZGU/OiBzdHJpbmc7XHJcbiAgICBnYXN0b1R5cGU/OiB1bmtub3duO1xyXG4gICAgcHJvY2Vzc2VkQnlBST86IHVua25vd247XHJcbiAgfSxcclxuPihcclxuICBwYXlsb2FkOiBUXHJcbikgPT4ge1xyXG4gIGNvbnN0IHJhd0NyZWF0ZWREYXRlRnJvbSA9IHNhZmVUZXh0KHBheWxvYWQ/LmNyZWF0ZWREYXRlRnJvbSk7XHJcbiAgY29uc3QgcmF3Q3JlYXRlZERhdGVUbyA9IHNhZmVUZXh0KHBheWxvYWQ/LmNyZWF0ZWREYXRlVG8pO1xyXG4gIGNvbnN0IGNyZWF0ZWREYXRlRnJvbSA9IG5vcm1hbGl6ZVRpY2tldExpc3REYXRlKHJhd0NyZWF0ZWREYXRlRnJvbSk7XHJcbiAgY29uc3QgY3JlYXRlZERhdGVUbyA9IG5vcm1hbGl6ZVRpY2tldExpc3REYXRlKHJhd0NyZWF0ZWREYXRlVG8pO1xyXG4gIGlmIChyYXdDcmVhdGVkRGF0ZUZyb20gJiYgIWNyZWF0ZWREYXRlRnJvbSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgfVxyXG4gIGlmIChyYXdDcmVhdGVkRGF0ZVRvICYmICFjcmVhdGVkRGF0ZVRvKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHByZWZlcnJlZFNlYXJjaEtleSA9IHNhZmVUZXh0KHBheWxvYWQ/LnNlYXJjaEtleSB8fCBwYXlsb2FkPy5maWx0ZXIpO1xyXG4gIGNvbnN0IGxlZ2FjeUZpbHRlciA9IHNhZmVUZXh0KHBheWxvYWQ/LmZpbHRlciB8fCBwcmVmZXJyZWRTZWFyY2hLZXkpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY3JlYXRlZERhdGVGcm9tOiBjcmVhdGVkRGF0ZUZyb20gfHwgdW5kZWZpbmVkLFxyXG4gICAgY3JlYXRlZERhdGVUbzogY3JlYXRlZERhdGVUbyB8fCB1bmRlZmluZWQsXHJcbiAgICBzZWFyY2hLZXk6IHByZWZlcnJlZFNlYXJjaEtleSB8fCB1bmRlZmluZWQsXHJcbiAgICBmaWx0ZXI6IGxlZ2FjeUZpbHRlciB8fCB1bmRlZmluZWQsXHJcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KHBheWxvYWQ/LmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSB8fCB1bmRlZmluZWQsXHJcbiAgICBnYXN0b1R5cGU6IG5vcm1hbGl6ZVRpY2tldExpc3RHYXN0b1R5cGUocGF5bG9hZD8uZ2FzdG9UeXBlKSxcclxuICAgIHByb2Nlc3NlZEJ5QUk6IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSShwYXlsb2FkPy5wcm9jZXNzZWRCeUFJKSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdEZpbHRlclBheWxvYWQgPSA8XHJcbiAgVCBleHRlbmRzIHtcclxuICAgIHBhZ2U/OiBudW1iZXI7XHJcbiAgICBwYWdlU2l6ZT86IG51bWJlcjtcclxuICAgIGNyZWF0ZWREYXRlRnJvbT86IHN0cmluZztcclxuICAgIGNyZWF0ZWREYXRlVG8/OiBzdHJpbmc7XHJcbiAgICBzZWFyY2hLZXk/OiBzdHJpbmc7XHJcbiAgICBmaWx0ZXI/OiBzdHJpbmc7XHJcbiAgICBjdXJyZW5jeUNvZGU/OiBzdHJpbmc7XHJcbiAgICBnYXN0b1R5cGU/OiB1bmtub3duO1xyXG4gICAgcHJvY2Vzc2VkQnlBST86IHVua25vd247XHJcbiAgfSxcclxuPihcclxuICBwYXlsb2FkOiBUXHJcbikgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBwYWdlOiBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZD8ucGFnZSkgJiYgTnVtYmVyKHBheWxvYWQucGFnZSkgPiAwID8gTWF0aC5mbG9vcihOdW1iZXIocGF5bG9hZC5wYWdlKSkgOiAxLFxyXG4gICAgcGFnZVNpemU6IE51bWJlci5pc0Zpbml0ZShwYXlsb2FkPy5wYWdlU2l6ZSkgJiYgTnVtYmVyKHBheWxvYWQucGFnZVNpemUpID4gMCA/IE1hdGguZmxvb3IoTnVtYmVyKHBheWxvYWQucGFnZVNpemUpKSA6IDUwLFxyXG4gICAgLi4ubm9ybWFsaXplVGlja2V0RmlsdGVyQ3JpdGVyaWFQYXlsb2FkKHBheWxvYWQpLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBMb2FkcyB0aWNrZXQgbGlzdCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGlzdC5cclxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QgPSBhc3luYyAoXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEV4cGVuc2VUaWNrZXRMaXN0RmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz4+ID0+IHtcclxuICBjb25zdCB7IGF4VXNlcklkT3ZlcnJpZGUsIC4uLmJhc2VPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChiYXNlT3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0ID0ge1xyXG4gICAgLi4ubm9ybWFsaXplVGlja2V0TGlzdEZpbHRlclBheWxvYWQocGF5bG9hZCksXHJcbiAgICBzdGF0dXM6IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzKHBheWxvYWQ/LnN0YXR1cyksXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz4+KFxyXG4gICAgXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGlzdFwiLFxyXG4gICAge1xyXG4gICAgICAuLi5iYXNlT3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRUaWNrZXRMaXN0SGVhZGVycyhjb250ZXh0LCBiYXNlT3B0aW9ucywgYXhVc2VySWRPdmVycmlkZSksXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gTG9hZHMgbGluay1tb2RlIHRpY2tldCBsaXN0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saW5rL2xpc3QuXHJcbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0ID0gYXN5bmMgKFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0UmVxdWVzdCxcclxuICBvcHRpb25zPzogRXhwZW5zZVRpY2tldExpc3RGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0bz4+ID0+IHtcclxuICBjb25zdCB7IGF4VXNlcklkT3ZlcnJpZGUsIC4uLmJhc2VPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChiYXNlT3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0UmVxdWVzdCA9IHtcclxuICAgIC4uLm5vcm1hbGl6ZVRpY2tldExpc3RGaWx0ZXJQYXlsb2FkKHBheWxvYWQpLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RJdGVtRHRvPj4oXHJcbiAgICBcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saW5rL2xpc3RcIixcclxuICAgIHtcclxuICAgICAgLi4uYmFzZU9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkVGlja2V0TGlzdEhlYWRlcnMoY29udGV4dCwgYmFzZU9wdGlvbnMsIGF4VXNlcklkT3ZlcnJpZGUpLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBMaW5rcyBzZWxlY3RlZCBvciBmaWx0ZXJlZCB0aWNrZXRzIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saW5rL2J1bGsuXHJcbmV4cG9ydCBjb25zdCBsaW5rRXhwZW5zZVNoZWV0VGlja2V0c0J1bGsgPSBhc3luYyAoXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBFeHBlbnNlVGlja2V0TGlzdEZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvPj4gPT4ge1xyXG4gIGNvbnN0IHsgYXhVc2VySWRPdmVycmlkZSwgLi4uYmFzZU9wdGlvbnMgfSA9IG9wdGlvbnMgfHwge307XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KGJhc2VPcHRpb25zKTtcclxuICBjb25zdCBzZWxlY3Rpb25Nb2RlID0gcGF5bG9hZD8uc2VsZWN0aW9uTW9kZSA9PT0gXCJmaWx0ZXJlZFwiID8gXCJmaWx0ZXJlZFwiIDogXCJzZWxlY3RlZFwiO1xyXG4gIGNvbnN0IHRpY2tldElkcyA9IEFycmF5LmlzQXJyYXkocGF5bG9hZD8udGlja2V0SWRzKVxyXG4gICAgPyBwYXlsb2FkLnRpY2tldElkcy5tYXAoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeSkpLmZpbHRlcihCb29sZWFuKVxyXG4gICAgOiBbXTtcclxuICBjb25zdCBleGNsdWRlZElkcyA9IEFycmF5LmlzQXJyYXkocGF5bG9hZD8uZXhjbHVkZWRJZHMpXHJcbiAgICA/IHBheWxvYWQuZXhjbHVkZWRJZHMubWFwKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnkpKS5maWx0ZXIoQm9vbGVhbilcclxuICAgIDogW107XHJcblxyXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1JlcXVlc3QgPSB7XHJcbiAgICBleHBlbnNlU2hlZXRJZDogc2FmZVRleHQocGF5bG9hZD8uZXhwZW5zZVNoZWV0SWQpLFxyXG4gICAgc2VsZWN0aW9uTW9kZSxcclxuICAgIHRpY2tldElkczogc2VsZWN0aW9uTW9kZSA9PT0gXCJzZWxlY3RlZFwiID8gdGlja2V0SWRzIDogdW5kZWZpbmVkLFxyXG4gICAgZmlsdGVyczpcclxuICAgICAgc2VsZWN0aW9uTW9kZSA9PT0gXCJmaWx0ZXJlZFwiICYmIHBheWxvYWQ/LmZpbHRlcnNcclxuICAgICAgICA/IHtcclxuICAgICAgICAgICAgLi4ubm9ybWFsaXplVGlja2V0RmlsdGVyQ3JpdGVyaWFQYXlsb2FkKHBheWxvYWQuZmlsdGVycyksXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgOiB1bmRlZmluZWQsXHJcbiAgICBleGNsdWRlZElkczogc2VsZWN0aW9uTW9kZSA9PT0gXCJmaWx0ZXJlZFwiID8gZXhjbHVkZWRJZHMgOiB1bmRlZmluZWQsXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXN1bHREdG8+PihcclxuICAgIFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL2xpbmsvYnVsa1wiLFxyXG4gICAge1xyXG4gICAgICAuLi5iYXNlT3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRUaWNrZXRMaXN0SGVhZGVycyhjb250ZXh0LCBiYXNlT3B0aW9ucywgYXhVc2VySWRPdmVycmlkZSksXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplVGlja2V0TGlua0J1bGtSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBMb2FkcyBvbmUgdGlja2V0IGRldGFpbCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0uXHJcbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXREZXRhaWxEdG8+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvPj4oXHJcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH1gLFxyXG4gICAge1xyXG4gICAgICAuLi5vcHRpb25zLFxyXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gRG93bmxvYWRzIG9uZSB0aWNrZXQgaW1hZ2UgcHJldmlldyBibG9iIHRocm91Z2ggdGhlIGludGVybmFsIHByb3h5IGVuZHBvaW50LlxyXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRQcmV2aWV3QmxvYiA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICB1cmxGaWxlOiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEJsb2I+ID0+IHtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gc2FmZVRleHQoZmlsZUlkKTtcclxuICBjb25zdCBzYWZlVXJsRmlsZSA9IHNhZmVUZXh0KHVybEZpbGUpO1xyXG4gIGlmICghc2FmZUZpbGVJZCB8fCAhc2FmZVVybEZpbGUpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiTWlzc2luZyB0aWNrZXQgcHJldmlldyBwYXlsb2FkLlwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IF9zdXBwcmVzc1Blcm1pc3Npb25Nb2RhbCwgLi4uZmV0Y2hPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBjc3JmVG9rZW4gPSBnZXRDc3JmVG9rZW4oKTtcclxuICBjb25zdCBoZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgZmV0Y2hPcHRpb25zLCB0cnVlKSk7XHJcbiAgaGVhZGVycy5BY2NlcHQgPSBcImltYWdlLypcIjtcclxuICBjb25zdCByZXF1ZXN0SGVhZGVyczogSGVhZGVyc0luaXQgPSB7XHJcbiAgICBBY2NlcHQ6IFwiaW1hZ2UvKlwiLFxyXG4gICAgLi4uaGVhZGVycyxcclxuICB9O1xyXG5cclxuICBpZiAoY3NyZlRva2VuKSB7XHJcbiAgICAocmVxdWVzdEhlYWRlcnMgYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPilbXCJSZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW5cIl0gPSBjc3JmVG9rZW47XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3ByZXZpZXdcIiwge1xyXG4gICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcclxuICAgIC4uLmZldGNoT3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICBoZWFkZXJzOiByZXF1ZXN0SGVhZGVycyxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgZmlsZUlkOiBzYWZlRmlsZUlkLFxyXG4gICAgICB1cmxGaWxlOiBzYWZlVXJsRmlsZSxcclxuICAgIH0pLFxyXG4gIH0pO1xyXG5cclxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICBjb25zdCByYXcgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgICBjb25zdCByZWxvZ2luUmVzdWx0ID0gYXdhaXQgaGFuZGxlQXBpQXV0aEZhaWx1cmU8QmxvYj4ocmF3LCByZXNwb25zZS5zdGF0dXMsIFwidGlja2V0LXByZXZpZXdcIik7XHJcbiAgICBpZiAocmVsb2dpblJlc3VsdCAhPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gcmVsb2dpblJlc3VsdDtcclxuICAgIH1cclxuICAgIGNvbnN0IG1lc3NhZ2UgPSByZWFkQXBpTWVzc2FnZUZyb21SYXcocmF3KTtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKG1lc3NhZ2UgfHwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXQgcHJldmlldy5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYmxvYiA9IGF3YWl0IHJlc3BvbnNlLmJsb2IoKTtcclxuICBpZiAoIWJsb2IgfHwgYmxvYi5zaXplID09PSAwKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkNvdWxkIG5vdCBsb2FkIHRpY2tldCBwcmV2aWV3LlwiKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBibG9iO1xyXG59O1xyXG5cclxuLy8gVXBkYXRlcyB0aWNrZXQgaGVhZGVyIG1ldGFkYXRhIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xuICBjb25zdCByYXdUcmFuc0RhdGUgPSBzYWZlVGV4dChwYXlsb2FkPy50cmFuc0RhdGUpO1xuICBjb25zdCByYXdUaWNrZXREYXRlID0gc2FmZVRleHQocGF5bG9hZD8udGlja2V0RGF0ZSk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc0RhdGUgPSBub3JtYWxpemVPcHRpb25hbEFwaURhdGUocmF3VHJhbnNEYXRlKTtcbiAgY29uc3Qgbm9ybWFsaXplZFRpY2tldERhdGUgPSBub3JtYWxpemVPcHRpb25hbEFwaURhdGUocmF3VGlja2V0RGF0ZSk7XG5cbiAgaWYgKHJhd1RyYW5zRGF0ZSAmJiAhbm9ybWFsaXplZFRyYW5zRGF0ZSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xuICB9XG4gIGlmIChyYXdUaWNrZXREYXRlICYmICFub3JtYWxpemVkVGlja2V0RGF0ZSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xuICB9XG5cclxuICBjb25zdCBzYWZlUGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdCA9IHtcclxuICAgIC4uLnBheWxvYWQsXG4gICAgdHJhbnNEYXRlOiBub3JtYWxpemVkVHJhbnNEYXRlIHx8IHVuZGVmaW5lZCxcbiAgICB0aWNrZXREYXRlOiBub3JtYWxpemVkVGlja2V0RGF0ZSB8fCB1bmRlZmluZWQsXG4gICAgZ2FzdG9UeXBlOiBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZShwYXlsb2FkPy5nYXN0b1R5cGUpLFxuICB9O1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH1gLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIERlbGV0ZXMgb25lIHRpY2tldCBvciBvbmUgdGlja2V0IGxpbmUgdmlhIHF1ZXJ5IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS5cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICBsaW5lUmVjSWQ/OiBudW1iZXIsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG51bGw+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xyXG4gIGlmIChOdW1iZXIuaXNJbnRlZ2VyKE51bWJlcihsaW5lUmVjSWQpKSAmJiBOdW1iZXIobGluZVJlY0lkKSA+IDApIHtcclxuICAgIHF1ZXJ5LnNldChcImxpbmVSZWNJZFwiLCBTdHJpbmcobGluZVJlY0lkKSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzdWZmaXggPSBxdWVyeS50b1N0cmluZygpO1xyXG4gIGNvbnN0IHVybCA9IHN1ZmZpeFxyXG4gICAgPyBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0/JHtzdWZmaXh9YFxyXG4gICAgOiBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH1gO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+Pih1cmwsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gQXBwbGllcyBJQSBwYXlsb2FkIG92ZXIgYW4gZXhpc3RpbmcgdGlja2V0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9pYS5cclxuZXhwb3J0IGNvbnN0IGFwcGx5RXhwZW5zZVNoZWV0VGlja2V0SWEgPSBhc3luYyAoXHJcbiAgZmlsZUlkOiBzdHJpbmcsXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJhd1BheWxvYWQgPSAocGF5bG9hZCB8fCB7fSkgYXMgRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0O1xyXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3QgPSB7XHJcbiAgICAuLi5yYXdQYXlsb2FkLFxyXG4gIH07XHJcbiAgY29uc3Qgbm9ybWFsaXplZFRyYW5zRGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdQYXlsb2FkLnRyYW5zRGF0ZSk7XHJcbiAgaWYgKCFub3JtYWxpemVkVHJhbnNEYXRlKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICB9XHJcbiAgc2FmZVBheWxvYWQudHJhbnNEYXRlID0gbm9ybWFsaXplZFRyYW5zRGF0ZTtcclxuXHJcbiAgY29uc3QgZ2FzdG9UeXBlID0gbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUocmF3UGF5bG9hZC5nYXN0b1R5cGUpO1xyXG4gIGlmIChnYXN0b1R5cGUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgZGVsZXRlIHNhZmVQYXlsb2FkLmdhc3RvVHlwZTtcclxuICB9IGVsc2Uge1xyXG4gICAgc2FmZVBheWxvYWQuZ2FzdG9UeXBlID0gZ2FzdG9UeXBlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2lhYCwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gQ3JlYXRlcyBvbmUgdGlja2V0IGxpbmUgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9L2xpbmVzLlxyXG5leHBvcnQgY29uc3QgY3JlYXRlRXhwZW5zZVNoZWV0VGlja2V0TGluZSA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5lUmVxdWVzdCxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4gPT4ge1xyXG4gIGlmICghc2FmZVRleHQocGF5bG9hZD8uZGVzY3JpcHRpb24pIHx8ICFpc1ZhbGlkVGlja2V0TGluZUFtb3VudChwYXlsb2FkKSkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZGVzY3JpcHRpb24gYW5kIGEgdmFsaWQgc2lnbmVkIHRpY2tldCBsaW5lIGFtb3VudCBhcmUgcmVxdWlyZWQuXCIpO1xuICB9XG5cclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2xpbmVzYCwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBVcGRhdGVzIG9uZSB0aWNrZXQgbGluZSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vbGluZXMve2xpbmVSZWNJZH0uXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVFeHBlbnNlU2hlZXRUaWNrZXRMaW5lID0gYXN5bmMgKFxyXG4gIGZpbGVJZDogc3RyaW5nLFxyXG4gIGxpbmVSZWNJZDogc3RyaW5nIHwgbnVtYmVyLFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XHJcbiAgaWYgKCFzYWZlVGV4dChwYXlsb2FkPy5kZXNjcmlwdGlvbikgfHwgIWlzVmFsaWRUaWNrZXRMaW5lQW1vdW50KHBheWxvYWQpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJkZXNjcmlwdGlvbiBhbmQgYSB2YWxpZCBzaWduZWQgdGlja2V0IGxpbmUgYW1vdW50IGFyZSByZXF1aXJlZC5cIik7XG4gIH1cblxyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCBzYWZlTGluZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhsaW5lUmVjSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihcclxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9saW5lcy8ke3NhZmVMaW5lSWR9YCxcclxuICAgIHtcclxuICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gRGVsZXRlcyBvbmUgdGlja2V0IGxpbmUgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9L2xpbmVzL3tsaW5lUmVjSWR9LlxyXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0TGluZSA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICBsaW5lUmVjSWQ6IHN0cmluZyB8IG51bWJlcixcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3Qgc2FmZUxpbmVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcobGluZVJlY0lkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8bnVsbD4+KFxyXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2xpbmVzLyR7c2FmZUxpbmVJZH1gLFxyXG4gICAge1xyXG4gICAgICAuLi5vcHRpb25zLFxyXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIFVwbG9hZHMvcmVwbGFjZXMgdGlja2V0IGZpbGUgY29udGVudCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vZmlsZS5cclxuZXhwb3J0IGNvbnN0IHVwbG9hZEV4cGVuc2VTaGVldFRpY2tldEZpbGUgPSBhc3luYyAoXHJcbiAgZmlsZUlkOiBzdHJpbmcsXHJcbiAgZmlsZTogRmlsZSB8IEJsb2IsXHJcbiAgZXh0ZW5zaW9uPzogc3RyaW5nLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHNhZmVFeHRlbnNpb24gPSBzYWZlVGV4dChleHRlbnNpb24pLnJlcGxhY2UoL15cXC4vLCBcIlwiKTtcclxuICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcclxuICBpZiAoc2FmZUV4dGVuc2lvbikge1xyXG4gICAgcXVlcnkuc2V0KFwiZXh0ZW5zaW9uXCIsIHNhZmVFeHRlbnNpb24pO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgc3VmZml4ID0gcXVlcnkudG9TdHJpbmcoKTtcclxuICBjb25zdCB1cmwgPSBzdWZmaXhcclxuICAgID8gYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2ZpbGU/JHtzdWZmaXh9YFxyXG4gICAgOiBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vZmlsZWA7XHJcbiAgY29uc3QgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gIGlmIChmaWxlIGluc3RhbmNlb2YgRmlsZSkge1xyXG4gICAgZm9ybS5hcHBlbmQoXCJmaWxlXCIsIGZpbGUsIHNhZmVUZXh0KGZpbGUubmFtZSkgfHwgYHRpY2tldC4ke3NhZmVFeHRlbnNpb24gfHwgXCJqcGdcIn1gKTtcclxuICB9IGVsc2Uge1xyXG4gICAgZm9ybS5hcHBlbmQoXCJmaWxlXCIsIGZpbGUsIGB0aWNrZXQuJHtzYWZlRXh0ZW5zaW9uIHx8IFwianBnXCJ9YCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+Pih1cmwsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlRm9ybUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXHJcbiAgICBib2R5OiBmb3JtLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gRGVsZXRlcyB0aWNrZXQgZmlsZSBjb250ZW50IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9maWxlLlxyXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0RmlsZSA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8bnVsbD4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9maWxlYCwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBTZWFyY2hlcyBwcm9qZWN0cyBmb3IgZHJvcGRvd24gdXNhZ2UgaW4gZmlsdGVycyBhbmQgZWRpdCBmb3Jtcy5cclxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVByb2plY3RzID0gYXN5bmMgKFxuICB0ZXJtOiBzdHJpbmcsXG4gIHBhZ2U6IG51bWJlcixcbiAgcGFnZVNpemU6IG51bWJlcixcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxQcm9qZWN0RHJvcGRvd25SZXNwb25zZT4gPT4ge1xuICBjb25zdCBzYWZlVGVybSA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcodGVybSB8fCBcIlwiKSk7XG4gIGNvbnN0IHNhZmVQYWdlID0gTnVtYmVyLmlzRmluaXRlKHBhZ2UpICYmIHBhZ2UgPiAwID8gTWF0aC5mbG9vcihwYWdlKSA6IDE7XG4gIGNvbnN0IHNhZmVQYWdlU2l6ZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlU2l6ZSkgJiYgcGFnZVNpemUgPiAwID8gTWF0aC5mbG9vcihwYWdlU2l6ZSkgOiA1MDtcblxuICByZXR1cm4gZmV0Y2hKc29uPFByb2plY3REcm9wZG93blJlc3BvbnNlPihcbiAgICBgL2FwaS9jcm0vcHJvamVjdHMvbGlzdD9maWx0ZXI9JHtzYWZlVGVybX0mcGFnZT0ke3NhZmVQYWdlfSZwYWdlU2l6ZT0ke3NhZmVQYWdlU2l6ZX1gLFxuICAgIHtcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgfVxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxJQUFNLGdCQUFnQixDQUFLLGFBQXVDO0FBQ2hFLFFBQU0sTUFBTyxZQUFZLENBQUM7QUFDMUIsTUFBSSxNQUFNLFFBQVEsSUFBSSxLQUFLLEVBQUcsUUFBTyxJQUFJO0FBQ3pDLE1BQUksTUFBTSxRQUFRLElBQUksS0FBSyxFQUFHLFFBQU8sSUFBSTtBQUN6QyxTQUFPLENBQUM7QUFDVjtBQUVPLElBQU0sNkJBQTZCLENBQ3hDLGFBQzhDO0FBQzlDLFFBQU0sUUFBUSxjQUFjLFFBQVE7QUFDcEMsUUFBTSxrQkFBa0IsTUFBTSxJQUFJLENBQUMsVUFBVTtBQUFBLElBQzNDLEdBQUc7QUFBQSxJQUNILHFCQUFxQixpQkFBaUIsTUFBTSx1QkFBdUIsTUFBTSxtQkFBbUI7QUFBQSxJQUM1RixlQUFlLFNBQVMsTUFBTSxpQkFBaUIsTUFBTSxhQUFhLEtBQUs7QUFBQSxJQUN2RSxXQUFXLFNBQVMsTUFBTSxhQUFhLE1BQU0sU0FBUyxLQUFLO0FBQUEsRUFDN0QsRUFBRTtBQUVGLFNBQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUNILE9BQU87QUFBQSxFQUNUO0FBQ0Y7QUFFTyxJQUFNLCtCQUErQixDQUMxQyxhQUM0QztBQUM1QyxRQUFNLFFBQVEsY0FBYyxRQUFRO0FBQ3BDLFFBQU0sa0JBQWtCLE1BQU0sSUFBSSxDQUFDLFNBQVM7QUFDMUMsVUFBTSxXQUFXLE1BQU0sUUFBUSxNQUFNLEtBQUssSUFDdEMsS0FBSyxRQUNKLE1BQU0sUUFBUSxNQUFNLEtBQUssSUFBSSxLQUFLLFFBQVEsQ0FBQztBQUVoRCxXQUFPO0FBQUEsTUFDTCxHQUFHO0FBQUEsTUFDSCxjQUFjLFNBQVMsTUFBTSxnQkFBZ0IsTUFB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Q0gsUUFBUTtBQUFBLElBQ1IsU0FBUyxvQkFBb0IsU0FBUyxPQUFPO0FBQUEsRUFDL0MsQ0FBQztBQUVELFNBQU9BLHNCQUFxQixRQUFRO0FBQ3RDO0FBR08sSUFBTSx1QkFBdUIsT0FDbEMsTUFDQSxNQUNBLFVBQ0EsWUFDcUM7QUFDckMsUUFBTSxXQUFXLG1CQUFtQixPQUFPLFFBQVEsRUFBRSxDQUFDO0FBQ3RELFFBQU0sV0FBVyxPQUFPLFNBQVMsSUFBSSxLQUFLLE9BQU8sSUFBSSxLQUFLLE1BQU0sSUFBSSxJQUFJO0FBQ3hFLFFBQU0sZUFBZSxPQUFPLFNBQVMsUUFBUSxLQUFLLFdBQVcsSUFBSSxLQUFLLE1BQU0sUUFBUSxJQUFJO0FBRXhGLFNBQU87QUFBQSxJQUNMLGlDQUFpQyxRQUFRLFNBQVMsUUFBUSxhQUFhLFlBQVk7QUFBQSxJQUNuRjtBQUFBLE1BQ0UsUUFBUTtBQUFBLE1BQ1IsR0FBRztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQ0Y7IiwKICAibmFtZXMiOiBbInNhZmVUZXh0IiwgInNhZmVUZXh0IiwgInRvTnVsbGFibGVOdW1iZXIiLCAiaXNOb25OZWdhdGl2ZU51bWJlciIsICJpc1Bvc2l0aXZlTnVtYmVyIiwgIm5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlIiwgIm5vcm1hbGl6ZVRpY2tldExpc3RHYXN0b1R5cGUiLCAibm9ybWFsaXplT3B0aW9uYWxUaWNrZXRTdGF0dXMiLCAibm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlIiwgIm5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZSIsICJub3JtYWxpemVUaWNrZXRMaXN0RGF0ZSIsICJ0b051bGxhYmxlQm9vbCIsICJub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUkiLCAibm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlciIsICJ0b0ZsYWdCb29sIiwgInRvTnVsbGFibGVOdW1iZXIiLCAic2FmZVRleHQiLCAibm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVBcGlSZXNwb25zZSIsICJub3JtYWxpemVUaWNrZXRRdWlja0NyZWF0ZVJlc3BvbnNlIiwgIm5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlIiwgIm5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlIiwgIm5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlIiwgIm5vcm1hbGl6ZVRpY2tldExpbmtCdWxrUmVzcG9uc2UiLCAibWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmQiLCAibWFwRXhwZW5zZVNoZWV0SGVhZGVyIiwgIm1hcEV4cGVuc2VTaGVldExpbmUiLCAiaXNQb3NpdGl2ZU51bWJlciIsICJpc05vbk5lZ2F0aXZlTnVtYmVyIl0KfQo=
