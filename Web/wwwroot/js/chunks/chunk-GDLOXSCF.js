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
var normalizeCurrencyCode = (value) => safeText3(value).trim().toUpperCase();
var hasMissingForeignLineSettlement = (line, localCurrencyCode) => {
  const lineCurrencyCode = normalizeCurrencyCode(line.currencyCode);
  const normalizedLocalCurrencyCode = normalizeCurrencyCode(localCurrencyCode) || "EUR";
  if (!lineCurrencyCode || lineCurrencyCode === normalizedLocalCurrencyCode) {
    return false;
  }
  const amount = Number(line.qty ?? 0) * Number(line.price ?? 0);
  const exchangeRate = toNullableNumber2(line.exchRate);
  const amountMST = toNullableNumber2(line.amountMST);
  return amount > 0 && !(exchangeRate != null && exchangeRate > 0) && !(amountMST != null && amountMST > 0);
};
var buildForeignLineSettlementError = () => new ApiFetchError(
  indT(
    "ExpenseSheets_Line_Validation_ForeignCurrencySettlement",
    "Foreign currency lines require an exchange rate greater than 0 or a reimbursement amount."
  )
);
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
  const localCurrencyCode = normalizeCurrencyCode(context.defaultCurrencyCode) || "EUR";
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
  if (normalizedLines.some((line) => hasMissingForeignLineSettlement(line, localCurrencyCode))) {
    throw buildForeignLineSettlementError();
  }
  if (mode === 0) {
    if (!safeText3(payload.description) || lines.length < 1) {
      throw new ApiFetchError("Invalid create payload for mode 0.");
    }
  }
  if (mode === 1) {
    if (!safeText3(payload.description)) {
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
    currencyCode: normalizeCurrencyCode(payload.currencyCode) || void 0,
    exchRate: toNullableNumber2(payload.exchRate) ?? void 0,
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
    currencyCode: normalizeCurrencyCode(payload.currencyCode) || void 0,
    exchRate: toNullableNumber2(payload.exchRate) ?? void 0,
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
  const context = await ensureExpenseApiContext(options);
  const localCurrencyCode = normalizeCurrencyCode(context.defaultCurrencyCode) || "EUR";
  const normalizedPayload = {
    ...payload,
    transDate: normalizedTransDate,
    reimbursableExpense: normalizeExpenseSheetReimbursable(payload.reimbursableExpense),
    currencyCode: normalizeCurrencyCode(payload.currencyCode) || void 0,
    amountMST: toNullableNumber2(payload.amountMST),
    exchRate: toNullableNumber2(payload.exchRate)
  };
  if (!Number.isInteger(Number(normalizedPayload.typeValue)) || Number(normalizedPayload.typeValue) <= 0 || !isPositiveNumber2(normalizedPayload.qty) || !isPositiveNumber2(normalizedPayload.price)) {
    throw new ApiFetchError("transDate, typeValue, qty > 0 and price > 0 are required.");
  }
  if (hasMissingForeignLineSettlement(normalizedPayload, localCurrencyCode)) {
    throw buildForeignLineSettlementError();
  }
  const safeSheetId = encodeURIComponent(String(hojaGastosId || "").trim());
  const safeLineId = encodeURIComponent(String(lineRecId || "").trim());
  const response = await fetchJson(
    `/api/crm/expensesheets/${safeSheetId}/lines/${safeLineId}`,
    {
      ...options,
      method: "PUT",
      headers: buildExpenseHeaders(context, options, true),
      body: JSON.stringify(normalizedPayload)
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
var adjustExpenseSheetTicketTotalAmount = async (fileId, payload, options) => {
  const context = await ensureExpenseApiContext(options);
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  const totalAmount = toNullableNumber2(payload?.totalAmount);
  if (!safeFileId || totalAmount == null || totalAmount < 0) {
    throw new ApiFetchError("Invalid ticket total adjustment payload.");
  }
  const response = await fetchJson(
    `/api/crm/expensesheets/tickets/${safeFileId}/total-adjustment`,
    {
      ...options,
      method: "POST",
      headers: buildExpenseHeaders(context, options, true),
      body: JSON.stringify({ totalAmount })
    }
  );
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
  adjustExpenseSheetTicketTotalAmount,
  deleteExpenseSheetTicket,
  applyExpenseSheetTicketIa,
  createExpenseSheetTicketLine,
  updateExpenseSheetTicketLine,
  deleteExpenseSheetTicketLine,
  uploadExpenseSheetTicketFile,
  deleteExpenseSheetTicketFile,
  fetchExpenseProjects
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlQXBpUmVzcG9uc2VOb3JtYWxpemVycy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VBcGlNYXBwZXJzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZVVpVXRpbHMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlVGlja2V0TGluZUFtb3VudC50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VBcGkudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB0eXBlIHtcclxuICBFeHBlbnNlU2hlZXRDdXJyZW5jeUR0byxcclxuICBFeHBlbnNlU2hlZXREZXRhaWxEdG8sXHJcbiAgRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG8sXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlc3VsdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0byxcclxuICBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byxcclxuICBJbmRBcGlSZXNwb25zZSxcclxuICBJbmRQYWdlZFJlc3BvbnNlLFxyXG59IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHtcbiAgc2FmZVRleHQsXG4gIHRvTnVsbGFibGVCb29sLFxuICB0b051bGxhYmxlR2FzdG9UeXBlQ29kZSxcbiAgdG9OdWxsYWJsZU51bWJlcixcbiAgdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGUsXHJcbn0gZnJvbSBcIi4vZXhwZW5zZUFwaVRyYW5zZm9ybXMudHNcIjtcbmltcG9ydCB7IG5vcm1hbGl6ZUV4cGVuc2VTaGVldFN1Ym9yZGluYXRlcyB9IGZyb20gXCIuL2V4cGVuc2VTdWJvcmRpbmF0ZU1hcHBlci50c1wiO1xuXG5jb25zdCBnZXRQYWdlZEl0ZW1zID0gPFQsPihyZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxUPik6IFRbXSA9PiB7XG4gIGNvbnN0IHJhdyA9IChyZXNwb25zZSB8fCB7fSkgYXMgeyBJdGVtcz86IHVua25vd247IGl0ZW1zPzogdW5rbm93biB9O1xuICBpZiAoQXJyYXkuaXNBcnJheShyYXcuSXRlbXMpKSByZXR1cm4gcmF3Lkl0ZW1zIGFzIFRbXTtcbiAgaWYgKEFycmF5LmlzQXJyYXkocmF3Lml0ZW1zKSkgcmV0dXJuIHJhdy5pdGVtcyBhcyBUW107XG4gIHJldHVybiBbXTtcbn07XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZSA9IChcbiAgcmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8+XG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldExpc3RJdGVtRHRvPiA9PiB7XG4gIGNvbnN0IGl0ZW1zID0gZ2V0UGFnZWRJdGVtcyhyZXNwb25zZSk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRJdGVtcyA9IGl0ZW1zLm1hcCgoaXRlbSkgPT4gKHtcbiAgICAuLi5pdGVtLFxuICAgIFJlaW1idXJzYWJsZUV4cGVuc2U6IHRvTnVsbGFibGVOdW1iZXIoaXRlbT8uUmVpbWJ1cnNhYmxlRXhwZW5zZSA/PyBpdGVtPy5yZWltYnVyc2FibGVFeHBlbnNlKSxcbiAgICBPd25lckF4VXNlcklkOiBzYWZlVGV4dChpdGVtPy5Pd25lckF4VXNlcklkID8/IGl0ZW0/Lm93bmVyQXhVc2VySWQpIHx8IG51bGwsXG4gICAgT3duZXJOYW1lOiBzYWZlVGV4dChpdGVtPy5Pd25lck5hbWUgPz8gaXRlbT8ub3duZXJOYW1lKSB8fCBudWxsLFxuICB9KSk7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5yZXNwb25zZSxcbiAgICBJdGVtczogbm9ybWFsaXplZEl0ZW1zLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UgPSAoXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldERldGFpbER0bz5cbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0RGV0YWlsRHRvPiA9PiB7XG4gIGNvbnN0IGl0ZW1zID0gZ2V0UGFnZWRJdGVtcyhyZXNwb25zZSk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRJdGVtcyA9IGl0ZW1zLm1hcCgoaXRlbSkgPT4ge1xuICAgIGNvbnN0IHJhd0xpbmVzID0gQXJyYXkuaXNBcnJheShpdGVtPy5MaW5lcylcbiAgICAgID8gaXRlbS5MaW5lc1xuICAgICAgOiAoQXJyYXkuaXNBcnJheShpdGVtPy5saW5lcykgPyBpdGVtLmxpbmVzIDogW10pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLml0ZW0sXG4gICAgICBIb2phR2FzdG9zSWQ6IHNhZmVUZXh0KGl0ZW0/LkhvamFHYXN0b3NJZCA/PyBpdGVtPy5ob2phR2FzdG9zSWQpLFxuICAgICAgVXNlcklkOiBzYWZlVGV4dChpdGVtPy5Vc2VySWQgPz8gaXRlbT8udXNlcklkKSxcbiAgICAgIFVzZXJOYW1lOiBzYWZlVGV4dChpdGVtPy5Vc2VyTmFtZSA/PyBpdGVtPy51c2VyTmFtZSkgfHwgbnVsbCxcbiAgICAgIE93bmVyQXhVc2VySWQ6IHNhZmVUZXh0KGl0ZW0/Lk93bmVyQXhVc2VySWQgPz8gaXRlbT8ub3duZXJBeFVzZXJJZCksXG4gICAgICBPd25lck5hbWU6IHNhZmVUZXh0KGl0ZW0/Lk93bmVyTmFtZSA/PyBpdGVtPy5vd25lck5hbWUpIHx8IG51bGwsXG4gICAgICBSZWltYnVyc2FibGVFeHBlbnNlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0/LlJlaW1idXJzYWJsZUV4cGVuc2UgPz8gaXRlbT8ucmVpbWJ1cnNhYmxlRXhwZW5zZSksXG4gICAgICBQcm9qSWQ6IHNhZmVUZXh0KGl0ZW0/LlByb2pJZCA/PyBpdGVtPy5wcm9qSWQpLFxuICAgICAgTGluZXM6IHJhd0xpbmVzLm1hcCgobGluZSkgPT4gKHtcbiAgICAgICAgLi4ubGluZSxcbiAgICAgICAgUmVjSWQ6IHNhZmVUZXh0KGxpbmU/LlJlY0lkID8/IGxpbmU/LnJlY0lkKSxcbiAgICAgICAgTGluZVJlY0lkOiBzYWZlVGV4dChsaW5lPy5MaW5lUmVjSWQgPz8gbGluZT8ubGluZVJlY0lkKSxcbiAgICAgICAgUHJvaklkOiBzYWZlVGV4dChsaW5lPy5Qcm9qSWQgPz8gbGluZT8ucHJvaklkKSxcbiAgICAgICAgUmVpbWJ1cnNhYmxlRXhwZW5zZTogdG9OdWxsYWJsZU51bWJlcihsaW5lPy5SZWltYnVyc2FibGVFeHBlbnNlID8/IGxpbmU/LnJlaW1idXJzYWJsZUV4cGVuc2UpLFxuICAgICAgICBDdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGxpbmU/LkN1cnJlbmN5Q29kZSA/PyBsaW5lPy5jdXJyZW5jeUNvZGUpLFxuICAgICAgICBBbW91bnRNU1Q6IHRvTnVsbGFibGVOdW1iZXIobGluZT8uQW1vdW50TVNUID8/IGxpbmU/LmFtb3VudE1TVCksXG4gICAgICAgIEV4Y2hSYXRlOiB0b051bGxhYmxlTnVtYmVyKGxpbmU/LkV4Y2hSYXRlID8/IGxpbmU/LmV4Y2hSYXRlKSxcbiAgICAgIH0pKSxcbiAgICB9O1xuICB9KTtcblxuICByZXR1cm4ge1xuICAgIC4uLnJlc3BvbnNlLFxuICAgIEl0ZW1zOiBub3JtYWxpemVkSXRlbXMsXG4gIH07XG59O1xuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVBcGlSZXNwb25zZSA9IDxUPihyZXNwb25zZTogSW5kQXBpUmVzcG9uc2U8VD4pOiBJbmRBcGlSZXNwb25zZTxUPiA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnJlc3BvbnNlLFxyXG4gICAgRXJyb3JzOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5FcnJvcnMpID8gcmVzcG9uc2UuRXJyb3JzIDogcmVzcG9uc2U/LkVycm9ycyA/PyBudWxsLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHRcclxuKTogRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgY29uc3QgcmF3RGF0YSA9IG5vcm1hbGl6ZWQ/LkRhdGE7XHJcbiAgaWYgKCFyYXdEYXRhIHx8IHR5cGVvZiByYXdEYXRhICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAuLi5ub3JtYWxpemVkLFxyXG4gICAgICBIdHRwU3RhdHVzOiB0eXBlb2YgcmVzcG9uc2U/Lkh0dHBTdGF0dXMgPT09IFwibnVtYmVyXCIgPyByZXNwb25zZS5IdHRwU3RhdHVzIDogdW5kZWZpbmVkLFxyXG4gICAgICBSZXRyeUFmdGVyOiBzYWZlVGV4dChyZXNwb25zZT8uUmV0cnlBZnRlcikgfHwgbnVsbCxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb25zdCByYXdTdGVwVHJhY2VJZHMgPVxyXG4gICAgKHJhd0RhdGEgYXMgeyBTdGVwVHJhY2VJZHM/OiB1bmtub3duOyBzdGVwVHJhY2VJZHM/OiB1bmtub3duIH0pLlN0ZXBUcmFjZUlkcyA/P1xyXG4gICAgKHJhd0RhdGEgYXMgeyBzdGVwVHJhY2VJZHM/OiB1bmtub3duIH0pLnN0ZXBUcmFjZUlkcztcclxuICBjb25zdCBzdGVwVHJhY2VJZHMgPSByYXdTdGVwVHJhY2VJZHMgJiYgdHlwZW9mIHJhd1N0ZXBUcmFjZUlkcyA9PT0gXCJvYmplY3RcIiA/IHJhd1N0ZXBUcmFjZUlkcyA6IG51bGw7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAuLi5ub3JtYWxpemVkLFxyXG4gICAgSHR0cFN0YXR1czogdHlwZW9mIHJlc3BvbnNlPy5IdHRwU3RhdHVzID09PSBcIm51bWJlclwiID8gcmVzcG9uc2UuSHR0cFN0YXR1cyA6IHVuZGVmaW5lZCxcclxuICAgIFJldHJ5QWZ0ZXI6IHNhZmVUZXh0KHJlc3BvbnNlPy5SZXRyeUFmdGVyKSB8fCBudWxsLFxyXG4gICAgRGF0YToge1xyXG4gICAgICBGaWxlSWQ6IHNhZmVUZXh0KChyYXdEYXRhIGFzIHsgRmlsZUlkPzogdW5rbm93bjsgZmlsZUlkPzogdW5rbm93biB9KS5GaWxlSWQgPz8gKHJhd0RhdGEgYXMgeyBmaWxlSWQ/OiB1bmtub3duIH0pLmZpbGVJZCksXHJcbiAgICAgIFVybEZpbGU6IHNhZmVUZXh0KFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgVXJsRmlsZT86IHVua25vd247IHVybEZpbGU/OiB1bmtub3duIH0pLlVybEZpbGUgPz8gKHJhd0RhdGEgYXMgeyB1cmxGaWxlPzogdW5rbm93biB9KS51cmxGaWxlXHJcbiAgICAgICksXHJcbiAgICAgIEZpbGVOYW1lOiBzYWZlVGV4dChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IEZpbGVOYW1lPzogdW5rbm93bjsgZmlsZU5hbWU/OiB1bmtub3duIH0pLkZpbGVOYW1lID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IGZpbGVOYW1lPzogdW5rbm93biB9KS5maWxlTmFtZVxyXG4gICAgICApLFxyXG4gICAgICBQcm9jZXNzZWRCeUFJOiB0b051bGxhYmxlQm9vbChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KS5Qcm9jZXNzZWRCeUFJID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pLnByb2Nlc3NlZEJ5QUlcclxuICAgICAgKSxcclxuICAgICAgTGlua2VkVG9TaGVldDpcclxuICAgICAgICB0b051bGxhYmxlQm9vbChcclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgTGlua2VkVG9TaGVldD86IHVua25vd247IGxpbmtlZFRvU2hlZXQ/OiB1bmtub3duIH0pLkxpbmtlZFRvU2hlZXQgPz9cclxuICAgICAgICAgICAgKHJhd0RhdGEgYXMgeyBsaW5rZWRUb1NoZWV0PzogdW5rbm93biB9KS5saW5rZWRUb1NoZWV0XHJcbiAgICAgICAgKSA9PT0gdHJ1ZSxcclxuICAgICAgSG9qYUdhc3Rvc0lkOlxyXG4gICAgICAgIHNhZmVUZXh0KFxyXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBIb2phR2FzdG9zSWQ/OiB1bmtub3duOyBob2phR2FzdG9zSWQ/OiB1bmtub3duIH0pLkhvamFHYXN0b3NJZCA/P1xyXG4gICAgICAgICAgICAocmF3RGF0YSBhcyB7IGhvamFHYXN0b3NJZD86IHVua25vd24gfSkuaG9qYUdhc3Rvc0lkXHJcbiAgICAgICAgKSB8fCBudWxsLFxyXG4gICAgICBDb21wbGV0ZWRTdGFnZTogc2FmZVRleHQoXHJcbiAgICAgICAgKHJhd0RhdGEgYXMgeyBDb21wbGV0ZWRTdGFnZT86IHVua25vd247IGNvbXBsZXRlZFN0YWdlPzogdW5rbm93biB9KS5Db21wbGV0ZWRTdGFnZSA/P1xyXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBjb21wbGV0ZWRTdGFnZT86IHVua25vd24gfSkuY29tcGxldGVkU3RhZ2VcclxuICAgICAgKSxcclxuICAgICAgU3RlcFRyYWNlSWRzOiBzdGVwVHJhY2VJZHNcclxuICAgICAgICA/IHtcclxuICAgICAgICAgICAgVGlja2V0Q3JlYXRlOiBzYWZlVGV4dChcclxuICAgICAgICAgICAgICAoc3RlcFRyYWNlSWRzIGFzIHsgVGlja2V0Q3JlYXRlPzogdW5rbm93bjsgdGlja2V0Q3JlYXRlPzogdW5rbm93biB9KS5UaWNrZXRDcmVhdGUgPz9cclxuICAgICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyB0aWNrZXRDcmVhdGU/OiB1bmtub3duIH0pLnRpY2tldENyZWF0ZVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBGaWxlVXBsb2FkOiBzYWZlVGV4dChcclxuICAgICAgICAgICAgICAoc3RlcFRyYWNlSWRzIGFzIHsgRmlsZVVwbG9hZD86IHVua25vd247IGZpbGVVcGxvYWQ/OiB1bmtub3duIH0pLkZpbGVVcGxvYWQgPz9cclxuICAgICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyBmaWxlVXBsb2FkPzogdW5rbm93biB9KS5maWxlVXBsb2FkXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIERyYWZ0RXh0cmFjdDogc2FmZVRleHQoXHJcbiAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IERyYWZ0RXh0cmFjdD86IHVua25vd247IGRyYWZ0RXh0cmFjdD86IHVua25vd24gfSkuRHJhZnRFeHRyYWN0ID8/XHJcbiAgICAgICAgICAgICAgICAoc3RlcFRyYWNlSWRzIGFzIHsgZHJhZnRFeHRyYWN0PzogdW5rbm93biB9KS5kcmFmdEV4dHJhY3RcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgVGlja2V0RmluYWxpemU6IHNhZmVUZXh0KFxyXG4gICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyBUaWNrZXRGaW5hbGl6ZT86IHVua25vd247IHRpY2tldEZpbmFsaXplPzogdW5rbm93biB9KS5UaWNrZXRGaW5hbGl6ZSA/P1xyXG4gICAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IHRpY2tldEZpbmFsaXplPzogdW5rbm93biB9KS50aWNrZXRGaW5hbGl6ZVxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBTaGVldExpbms6IHNhZmVUZXh0KFxyXG4gICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyBTaGVldExpbms/OiB1bmtub3duOyBzaGVldExpbms/OiB1bmtub3duIH0pLlNoZWV0TGluayA/P1xyXG4gICAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IHNoZWV0TGluaz86IHVua25vd24gfSkuc2hlZXRMaW5rXHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgOiBudWxsLFxyXG4gICAgfSxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZSA9IChcbiAgcmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+XG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPiA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4ucmVzcG9uc2UsXG4gICAgSXRlbXM6IGdldFBhZ2VkSXRlbXMocmVzcG9uc2UpLFxuICB9O1xufTtcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTx1bmtub3duPlxyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvPiA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEl0ZW1zID0gbm9ybWFsaXplRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVzKHJlc3BvbnNlPy5JdGVtcyk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAuLi5yZXNwb25zZSxcclxuICAgIEl0ZW1zOiBub3JtYWxpemVkSXRlbXMsXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZSA9IChcclxuICByZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz5cclxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz4gPT4ge1xyXG4gIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+ICh7XHJcbiAgICAuLi5pdGVtLFxyXG4gICAgU3RhdHVzOiB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZShcclxuICAgICAgKGl0ZW0gYXMgeyBTdGF0dXM/OiB1bmtub3duOyBzdGF0dXM/OiB1bmtub3duIH0pPy5TdGF0dXMgPz9cclxuICAgICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LnN0YXR1c1xyXG4gICAgKSxcclxuICAgIFByb2Nlc3NlZEJ5QUk6IHRvTnVsbGFibGVCb29sKFxyXG4gICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8uUHJvY2Vzc2VkQnlBSSA/P1xyXG4gICAgICAgIChpdGVtIGFzIHsgUHJvY2Vzc2VkQnlBST86IHVua25vd247IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pPy5wcm9jZXNzZWRCeUFJXHJcbiAgICApLFxyXG4gICAgR2FzdG9UeXBlOiB0b051bGxhYmxlR2FzdG9UeXBlQ29kZShcbiAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uR2FzdG9UeXBlID8/XG4gICAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uZ2FzdG9UeXBlXG4gICAgKSxcbiAgICBPd25lckF4VXNlcklkOiBzYWZlVGV4dChcbiAgICAgIChpdGVtIGFzIHsgT3duZXJBeFVzZXJJZD86IHVua25vd247IG93bmVyQXhVc2VySWQ/OiB1bmtub3duIH0pPy5Pd25lckF4VXNlcklkID8/XG4gICAgICAgIChpdGVtIGFzIHsgT3duZXJBeFVzZXJJZD86IHVua25vd247IG93bmVyQXhVc2VySWQ/OiB1bmtub3duIH0pPy5vd25lckF4VXNlcklkXG4gICAgKSxcbiAgICBPd25lck5hbWU6IHNhZmVUZXh0KFxuICAgICAgKGl0ZW0gYXMgeyBPd25lck5hbWU/OiB1bmtub3duOyBvd25lck5hbWU/OiB1bmtub3duIH0pPy5Pd25lck5hbWUgPz9cbiAgICAgICAgKGl0ZW0gYXMgeyBPd25lck5hbWU/OiB1bmtub3duOyBvd25lck5hbWU/OiB1bmtub3duIH0pPy5vd25lck5hbWVcbiAgICApIHx8IG51bGwsXG4gIH0pKTtcblxyXG4gIHJldHVybiB7XHJcbiAgICAuLi5yZXNwb25zZSxcclxuICAgIEl0ZW1zOiBub3JtYWxpemVkSXRlbXMsXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVUaWNrZXRMaW5rTGlzdFBhZ2VkUmVzcG9uc2UgPSAoXHJcbiAgcmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RJdGVtRHRvPlxyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0bz4gPT4ge1xyXG4gIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+ICh7XHJcbiAgICAuLi5pdGVtLFxyXG4gICAgUHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woXHJcbiAgICAgIChpdGVtIGFzIHsgUHJvY2Vzc2VkQnlBST86IHVua25vd247IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pPy5Qcm9jZXNzZWRCeUFJID8/XHJcbiAgICAgICAgKGl0ZW0gYXMgeyBQcm9jZXNzZWRCeUFJPzogdW5rbm93bjsgcHJvY2Vzc2VkQnlBST86IHVua25vd24gfSk/LnByb2Nlc3NlZEJ5QUlcclxuICAgICksXHJcbiAgICBHYXN0b1R5cGU6IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlKFxuICAgICAgKGl0ZW0gYXMgeyBHYXN0b1R5cGU/OiB1bmtub3duOyBnYXN0b1R5cGU/OiB1bmtub3duIH0pPy5HYXN0b1R5cGUgPz9cbiAgICAgICAgKGl0ZW0gYXMgeyBHYXN0b1R5cGU/OiB1bmtub3duOyBnYXN0b1R5cGU/OiB1bmtub3duIH0pPy5nYXN0b1R5cGVcbiAgICApLFxuICAgIE93bmVyQXhVc2VySWQ6IHNhZmVUZXh0KFxuICAgICAgKGl0ZW0gYXMgeyBPd25lckF4VXNlcklkPzogdW5rbm93bjsgb3duZXJBeFVzZXJJZD86IHVua25vd24gfSk/Lk93bmVyQXhVc2VySWQgPz9cbiAgICAgICAgKGl0ZW0gYXMgeyBPd25lckF4VXNlcklkPzogdW5rbm93bjsgb3duZXJBeFVzZXJJZD86IHVua25vd24gfSk/Lm93bmVyQXhVc2VySWRcbiAgICApLFxuICAgIE93bmVyTmFtZTogc2FmZVRleHQoXG4gICAgICAoaXRlbSBhcyB7IE93bmVyTmFtZT86IHVua25vd247IG93bmVyTmFtZT86IHVua25vd24gfSk/Lk93bmVyTmFtZSA/P1xuICAgICAgICAoaXRlbSBhcyB7IE93bmVyTmFtZT86IHVua25vd247IG93bmVyTmFtZT86IHVua25vd24gfSk/Lm93bmVyTmFtZVxuICAgICkgfHwgbnVsbCxcbiAgfSkpO1xuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnJlc3BvbnNlLFxyXG4gICAgSXRlbXM6IG5vcm1hbGl6ZWRJdGVtcyxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2UgPSAoXHJcbiAgcmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvPlxyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldERldGFpbER0bz4gPT4ge1xyXG4gIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+ICh7XHJcbiAgICAuLi5pdGVtLFxyXG4gICAgU3RhdHVzOiB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZShcclxuICAgICAgKGl0ZW0gYXMgeyBTdGF0dXM/OiB1bmtub3duOyBzdGF0dXM/OiB1bmtub3duIH0pPy5TdGF0dXMgPz9cclxuICAgICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LnN0YXR1c1xyXG4gICAgKSxcclxuICAgIFByb2Nlc3NlZEJ5QUk6IHRvTnVsbGFibGVCb29sKFxyXG4gICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8uUHJvY2Vzc2VkQnlBSSA/P1xyXG4gICAgICAgIChpdGVtIGFzIHsgUHJvY2Vzc2VkQnlBST86IHVua25vd247IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pPy5wcm9jZXNzZWRCeUFJXHJcbiAgICApLFxyXG4gICAgSG9qYUdhc3Rvc0lkRGlzcGxheTogc2FmZVRleHQoXHJcbiAgICAgIChpdGVtIGFzIHsgSG9qYUdhc3Rvc0lkRGlzcGxheT86IHVua25vd247IGhvamFHYXN0b3NJZERpc3BsYXk/OiB1bmtub3duIH0pPy5Ib2phR2FzdG9zSWREaXNwbGF5ID8/XHJcbiAgICAgICAgKGl0ZW0gYXMgeyBIb2phR2FzdG9zSWREaXNwbGF5PzogdW5rbm93bjsgaG9qYUdhc3Rvc0lkRGlzcGxheT86IHVua25vd24gfSk/LmhvamFHYXN0b3NJZERpc3BsYXlcclxuICAgICksXHJcbiAgICBHYXN0b1R5cGU6IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlKFxuICAgICAgKGl0ZW0gYXMgeyBHYXN0b1R5cGU/OiB1bmtub3duOyBnYXN0b1R5cGU/OiB1bmtub3duIH0pPy5HYXN0b1R5cGUgPz9cbiAgICAgICAgKGl0ZW0gYXMgeyBHYXN0b1R5cGU/OiB1bmtub3duOyBnYXN0b1R5cGU/OiB1bmtub3duIH0pPy5nYXN0b1R5cGVcbiAgICApLFxuICAgIE93bmVyQXhVc2VySWQ6IHNhZmVUZXh0KFxuICAgICAgKGl0ZW0gYXMgeyBPd25lckF4VXNlcklkPzogdW5rbm93bjsgb3duZXJBeFVzZXJJZD86IHVua25vd24gfSk/Lk93bmVyQXhVc2VySWQgPz9cbiAgICAgICAgKGl0ZW0gYXMgeyBPd25lckF4VXNlcklkPzogdW5rbm93bjsgb3duZXJBeFVzZXJJZD86IHVua25vd24gfSk/Lm93bmVyQXhVc2VySWRcbiAgICApLFxuICAgIE93bmVyTmFtZTogc2FmZVRleHQoXG4gICAgICAoaXRlbSBhcyB7IE93bmVyTmFtZT86IHVua25vd247IG93bmVyTmFtZT86IHVua25vd24gfSk/Lk93bmVyTmFtZSA/P1xuICAgICAgICAoaXRlbSBhcyB7IE93bmVyTmFtZT86IHVua25vd247IG93bmVyTmFtZT86IHVua25vd24gfSk/Lm93bmVyTmFtZVxuICAgICkgfHwgbnVsbCxcbiAgICBPY3JKc29uOiBzYWZlVGV4dChpdGVtPy5PY3JKc29uID8/IGl0ZW0/Lm9jckpzb24pIHx8IG51bGwsXG4gICAgTm9ybWFsaXplZEpzb246IHNhZmVUZXh0KGl0ZW0/Lk5vcm1hbGl6ZWRKc29uID8/IGl0ZW0/Lm5vcm1hbGl6ZWRKc29uKSB8fCBudWxsLFxuICAgIExpbmVzOiBBcnJheS5pc0FycmF5KGl0ZW0/LkxpbmVzKSA/IGl0ZW0uTGluZXMgOiBbXSxcbiAgfSkpO1xuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnJlc3BvbnNlLFxyXG4gICAgSXRlbXM6IG5vcm1hbGl6ZWRJdGVtcyxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVRpY2tldExpbmtCdWxrUmVzcG9uc2UgPSAoXHJcbiAgcmVzcG9uc2U6IEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvPlxyXG4pOiBJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0bz4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgY29uc3QgcmF3RGF0YSA9IG5vcm1hbGl6ZWQ/LkRhdGE7XHJcbiAgaWYgKCFyYXdEYXRhIHx8IHR5cGVvZiByYXdEYXRhICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICByZXR1cm4gbm9ybWFsaXplZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHRvSXNzdWVMaXN0ID0gKHZhbHVlOiB1bmtub3duKSA9PiB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gW107XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlLm1hcCgoZW50cnkpID0+ICh7XHJcbiAgICAgIHRpY2tldElkOiBzYWZlVGV4dChcclxuICAgICAgICAoZW50cnkgYXMgeyB0aWNrZXRJZD86IHVua25vd247IFRpY2tldElkPzogdW5rbm93biB9KT8udGlja2V0SWQgPz9cclxuICAgICAgICAgIChlbnRyeSBhcyB7IFRpY2tldElkPzogdW5rbm93biB9KS5UaWNrZXRJZFxyXG4gICAgICApLFxyXG4gICAgICByZWFzb246IHNhZmVUZXh0KFxyXG4gICAgICAgIChlbnRyeSBhcyB7IHJlYXNvbj86IHVua25vd247IFJlYXNvbj86IHVua25vd24gfSk/LnJlYXNvbiA/P1xyXG4gICAgICAgICAgKGVudHJ5IGFzIHsgUmVhc29uPzogdW5rbm93biB9KS5SZWFzb25cclxuICAgICAgKSxcclxuICAgIH0pKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBsaW5rZWRUaWNrZXRJZHNSYXcgPVxyXG4gICAgKHJhd0RhdGEgYXMgeyBsaW5rZWRUaWNrZXRJZHM/OiB1bmtub3duOyBMaW5rZWRUaWNrZXRJZHM/OiB1bmtub3duIH0pLmxpbmtlZFRpY2tldElkcyA/P1xyXG4gICAgKHJhd0RhdGEgYXMgeyBMaW5rZWRUaWNrZXRJZHM/OiB1bmtub3duIH0pLkxpbmtlZFRpY2tldElkcztcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLm5vcm1hbGl6ZWQsXHJcbiAgICBEYXRhOiB7XHJcbiAgICAgIGV4cGVuc2VTaGVldElkOiBzYWZlVGV4dChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IGV4cGVuc2VTaGVldElkPzogdW5rbm93bjsgRXhwZW5zZVNoZWV0SWQ/OiB1bmtub3duIH0pLmV4cGVuc2VTaGVldElkID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IEV4cGVuc2VTaGVldElkPzogdW5rbm93biB9KS5FeHBlbnNlU2hlZXRJZFxyXG4gICAgICApLFxyXG4gICAgICByZXF1ZXN0ZWRDb3VudDogdG9OdWxsYWJsZU51bWJlcihcclxuICAgICAgICAocmF3RGF0YSBhcyB7IHJlcXVlc3RlZENvdW50PzogdW5rbm93bjsgUmVxdWVzdGVkQ291bnQ/OiB1bmtub3duIH0pLnJlcXVlc3RlZENvdW50ID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IFJlcXVlc3RlZENvdW50PzogdW5rbm93biB9KS5SZXF1ZXN0ZWRDb3VudFxyXG4gICAgICApID8/IDAsXHJcbiAgICAgIGxpbmtlZENvdW50OiB0b051bGxhYmxlTnVtYmVyKFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgbGlua2VkQ291bnQ/OiB1bmtub3duOyBMaW5rZWRDb3VudD86IHVua25vd24gfSkubGlua2VkQ291bnQgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgTGlua2VkQ291bnQ/OiB1bmtub3duIH0pLkxpbmtlZENvdW50XHJcbiAgICAgICkgPz8gMCxcclxuICAgICAgc2tpcHBlZENvdW50OiB0b051bGxhYmxlTnVtYmVyKFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgc2tpcHBlZENvdW50PzogdW5rbm93bjsgU2tpcHBlZENvdW50PzogdW5rbm93biB9KS5za2lwcGVkQ291bnQgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgU2tpcHBlZENvdW50PzogdW5rbm93biB9KS5Ta2lwcGVkQ291bnRcclxuICAgICAgKSA/PyAwLFxyXG4gICAgICBmYWlsZWRDb3VudDogdG9OdWxsYWJsZU51bWJlcihcclxuICAgICAgICAocmF3RGF0YSBhcyB7IGZhaWxlZENvdW50PzogdW5rbm93bjsgRmFpbGVkQ291bnQ/OiB1bmtub3duIH0pLmZhaWxlZENvdW50ID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IEZhaWxlZENvdW50PzogdW5rbm93biB9KS5GYWlsZWRDb3VudFxyXG4gICAgICApID8/IDAsXHJcbiAgICAgIGxpbmtlZFRpY2tldElkczogQXJyYXkuaXNBcnJheShsaW5rZWRUaWNrZXRJZHNSYXcpXHJcbiAgICAgICAgPyBsaW5rZWRUaWNrZXRJZHNSYXcubWFwKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnkpKS5maWx0ZXIoQm9vbGVhbilcclxuICAgICAgICA6IFtdLFxyXG4gICAgICBza2lwcGVkOiB0b0lzc3VlTGlzdChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IHNraXBwZWQ/OiB1bmtub3duOyBTa2lwcGVkPzogdW5rbm93biB9KS5za2lwcGVkID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IFNraXBwZWQ/OiB1bmtub3duIH0pLlNraXBwZWRcclxuICAgICAgKSxcclxuICAgICAgZmFpbGVkOiB0b0lzc3VlTGlzdChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IGZhaWxlZD86IHVua25vd247IEZhaWxlZD86IHVua25vd24gfSkuZmFpbGVkID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IEZhaWxlZD86IHVua25vd24gfSkuRmFpbGVkXHJcbiAgICAgICksXHJcbiAgICB9LFxyXG4gIH07XHJcbn07XHJcbiIsICJcdUZFRkZpbXBvcnQgdHlwZSB7XHJcbiAgRXhwZW5zZVNoZWV0Q2FyZCxcclxuICBFeHBlbnNlU2hlZXREZXRhaWxEdG8sXHJcbiAgRXhwZW5zZVNoZWV0SGVhZGVyLFxyXG4gIEV4cGVuc2VTaGVldExpbmUsXHJcbiAgRXhwZW5zZVNoZWV0TGluZUR0byxcclxuICBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byxcclxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0LCB0b051bGxhYmxlQm9vbCwgdG9OdWxsYWJsZU51bWJlciB9IGZyb20gXCIuL2V4cGVuc2VBcGlUcmFuc2Zvcm1zLnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlR2FzdG9UeXBlT3B0aW9ucyB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZUdhc3RvVHlwZUNhdGFsb2cudHNcIjtcblxyXG5jb25zdCByZXNvbHZlVHlwZUxhYmVsID0gKHR5cGVWYWx1ZUNvZGU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGlmICghdHlwZVZhbHVlQ29kZSkge1xuICAgIHJldHVybiB0eXBlVmFsdWVDb2RlO1xuICB9XG5cbiAgY29uc3QgbWF0Y2ggPSBnZXRFeHBlbnNlR2FzdG9UeXBlT3B0aW9ucygpLmZpbmQoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeS52YWx1ZSkgPT09IHR5cGVWYWx1ZUNvZGUpO1xuXG4gIHJldHVybiBzYWZlVGV4dChtYXRjaD8udGV4dCkgfHwgdHlwZVZhbHVlQ29kZTtcbn07XG5cclxuLy8gTWFwcyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2xpc3QgaXRlbSBjb250cmFjdCB0byBsaXN0IGNhcmQgVUkgbW9kZWwuXHJcbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZCA9IChpdGVtOiBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byk6IEV4cGVuc2VTaGVldENhcmQgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBob2phR2FzdG9zSWQ6IHNhZmVUZXh0KGl0ZW0uSG9qYUdhc3Rvc0lkKSxcclxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChpdGVtLkRlc2NyaXB0aW9uKSxcclxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogdG9OdWxsYWJsZU51bWJlcihpdGVtLkV4cGVuc2VTaGVldFN0YXR1cyksXHJcbiAgICBlc3RhZG9Db21lbnRhcmlvczogc2FmZVRleHQoaXRlbS5Fc3RhZG9Db21lbnRhcmlvcykgfHwgbnVsbCxcbiAgICB1c2VySWQ6IHNhZmVUZXh0KGl0ZW0uVXNlcklkKSxcbiAgICB1c2VyTmFtZTogc2FmZVRleHQoaXRlbS5Vc2VyTmFtZSkgfHwgbnVsbCxcbiAgICBvd25lckF4VXNlcklkOiBzYWZlVGV4dChpdGVtLk93bmVyQXhVc2VySWQgPz8gaXRlbS5vd25lckF4VXNlcklkKSxcbiAgICBvd25lck5hbWU6IHNhZmVUZXh0KGl0ZW0uT3duZXJOYW1lID8/IGl0ZW0ub3duZXJOYW1lKSB8fCBudWxsLFxuICAgIHZvdWNoZXI6IHNhZmVUZXh0KGl0ZW0uVm91Y2hlciksXG4gICAgcHJvaklkOiBzYWZlVGV4dChpdGVtLlByb2pJZCksXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChpdGVtLkN1cnJlbmN5Q29kZSksXG4gICAgdG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5Ub3RhbEFtb3VudCksXG4gICAgZXhjaFJhdGU6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5FeGNoUmF0ZSksXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogdG9OdWxsYWJsZU51bWJlcihpdGVtLkV4Y2hhbmdlUmF0ZU1vZGUpLFxuICAgIHJlaW1idXJzYWJsZUV4cGVuc2U6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5SZWltYnVyc2FibGVFeHBlbnNlID8/IGl0ZW0ucmVpbWJ1cnNhYmxlRXhwZW5zZSksXG4gICAgY3JlYXRlZERhdGU6IHNhZmVUZXh0KGl0ZW0uQ3JlYXRlZERhdGUpLFxuICB9O1xufTtcblxyXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0gaGVhZGVyIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxyXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0SGVhZGVyID0gKHNoZWV0OiBFeHBlbnNlU2hlZXREZXRhaWxEdG8pOiBFeHBlbnNlU2hlZXRIZWFkZXIgPT4ge1xuICByZXR1cm4ge1xuICAgIGhvamFHYXN0b3NJZDogc2FmZVRleHQoc2hlZXQuSG9qYUdhc3Rvc0lkID8/IHNoZWV0LmhvamFHYXN0b3NJZCksXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KHNoZWV0LkRlc2NyaXB0aW9uID8/IHNoZWV0LmRlc2NyaXB0aW9uKSxcbiAgICB1c2VySWQ6IHNhZmVUZXh0KHNoZWV0LlVzZXJJZCA/PyBzaGVldC51c2VySWQpLFxuICAgIHVzZXJOYW1lOiBzYWZlVGV4dChzaGVldC5Vc2VyTmFtZSA/PyBzaGVldC51c2VyTmFtZSkgfHwgbnVsbCxcbiAgICBvd25lckF4VXNlcklkOiBzYWZlVGV4dChzaGVldC5Pd25lckF4VXNlcklkID8/IHNoZWV0Lm93bmVyQXhVc2VySWQpLFxuICAgIG93bmVyTmFtZTogc2FmZVRleHQoc2hlZXQuT3duZXJOYW1lID8/IHNoZWV0Lm93bmVyTmFtZSkgfHwgbnVsbCxcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IHRvTnVsbGFibGVOdW1iZXIoc2hlZXQuRXhwZW5zZVNoZWV0U3RhdHVzID8/IHNoZWV0LmV4cGVuc2VTaGVldFN0YXR1cyksXG4gICAgZXN0YWRvQ29tZW50YXJpb3M6IHNhZmVUZXh0KHNoZWV0LkVzdGFkb0NvbWVudGFyaW9zID8/IHNoZWV0LmVzdGFkb0NvbWVudGFyaW9zKSB8fCBudWxsLFxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQoc2hlZXQuQ3VycmVuY3lDb2RlID8/IHNoZWV0LmN1cnJlbmN5Q29kZSksXG4gICAgdG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoc2hlZXQuVG90YWxBbW91bnQgPz8gc2hlZXQudG90YWxBbW91bnQpLFxuICAgIGV4Y2hSYXRlOiBzYWZlVGV4dChzaGVldC5FeGNoUmF0ZSA/PyBzaGVldC5leGNoUmF0ZSksXG4gICAgZXhjaGFuZ2VSYXRlTW9kZTogdG9OdWxsYWJsZU51bWJlcihzaGVldC5FeGNoYW5nZVJhdGVNb2RlID8/IHNoZWV0LmV4Y2hhbmdlUmF0ZU1vZGUpLFxuICAgIHJlaW1idXJzYWJsZUV4cGVuc2U6IHRvTnVsbGFibGVOdW1iZXIoc2hlZXQuUmVpbWJ1cnNhYmxlRXhwZW5zZSA/PyBzaGVldC5yZWltYnVyc2FibGVFeHBlbnNlKSxcbiAgICBwcm9qSWQ6IHNhZmVUZXh0KHNoZWV0LlByb2pJZCA/PyBzaGVldC5wcm9qSWQpLFxuICAgIHZvdWNoZXI6IHNhZmVUZXh0KHNoZWV0LlZvdWNoZXIgPz8gc2hlZXQudm91Y2hlciksXG4gICAgY3JlYXRlZERhdGU6IHNhZmVUZXh0KHNoZWV0LkNyZWF0ZWREYXRlID8/IHNoZWV0LmNyZWF0ZWREYXRlKSxcbiAgfTtcbn07XG5cbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfSBsaW5lIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxuZXhwb3J0IGNvbnN0IG1hcEV4cGVuc2VTaGVldExpbmUgPSAobGluZTogRXhwZW5zZVNoZWV0TGluZUR0byk6IEV4cGVuc2VTaGVldExpbmUgPT4ge1xuICBjb25zdCB0eXBlVmFsdWVDb2RlID0gc2FmZVRleHQobGluZS5UeXBlVmFsdWVDb2RlID8/IGxpbmUudHlwZVZhbHVlQ29kZSA/PyBsaW5lLlR5cGVWYWx1ZSA/PyBsaW5lLnR5cGVWYWx1ZSk7XG4gIGNvbnN0IHR5cGVWYWx1ZUxhYmVsID0gc2FmZVRleHQobGluZS5UeXBlVmFsdWUgPz8gbGluZS50eXBlVmFsdWUpO1xuICBjb25zdCBleHBsaWNpdExpbmVSZWNJZCA9IHNhZmVUZXh0KGxpbmUuTGluZVJlY0lkID8/IGxpbmUubGluZVJlY0lkKTtcblxuICByZXR1cm4ge1xuICAgIGxpbmVSZWNJZDogZXhwbGljaXRMaW5lUmVjSWQgfHwgc2FmZVRleHQobGluZS5SZWNJZCA/PyBsaW5lLnJlY0lkKSxcbiAgICB0cmFuc0RhdGU6IHNhZmVUZXh0KGxpbmUuVHJhbnNEYXRlID8/IGxpbmUudHJhbnNEYXRlKSxcbiAgICB0eXBlVmFsdWVDb2RlLFxuICAgIHR5cGVWYWx1ZTogdHlwZVZhbHVlTGFiZWwgJiYgdHlwZVZhbHVlTGFiZWwgIT09IHR5cGVWYWx1ZUNvZGUgPyB0eXBlVmFsdWVMYWJlbCA6IHJlc29sdmVUeXBlTGFiZWwodHlwZVZhbHVlQ29kZSksXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KGxpbmUuRGVzY3JpcHRpb24gPz8gbGluZS5kZXNjcmlwdGlvbiksXG4gICAgaW50ZXJuYWNpb25hbDogdG9OdWxsYWJsZUJvb2wobGluZS5JbnRlcm5hY2lvbmFsID8/IGxpbmUuaW50ZXJuYWNpb25hbCksXG4gICAgZmlsZUlkOiBzYWZlVGV4dChsaW5lLkZpbGVJZCA/PyBsaW5lLmZpbGVJZCksXG4gICAgdGlja2V0OiB0b051bGxhYmxlQm9vbChsaW5lLlRpY2tldCA/PyBsaW5lLnRpY2tldCksXG4gICAgcHJpY2U6IHRvTnVsbGFibGVOdW1iZXIobGluZS5QcmljZSA/PyBsaW5lLnByaWNlKSxcbiAgICBxdHk6IHRvTnVsbGFibGVOdW1iZXIobGluZS5RdHkgPz8gbGluZS5xdHkpLFxuICAgIGFtb3VudDogdG9OdWxsYWJsZU51bWJlcihsaW5lLkFtb3VudCA/PyBsaW5lLmFtb3VudCksXG4gICAgcHJvaklkOiBzYWZlVGV4dChsaW5lLlByb2pJZCA/PyBsaW5lLnByb2pJZCksXG4gICAgcmVpbWJ1cnNhYmxlRXhwZW5zZTogdG9OdWxsYWJsZU51bWJlcihsaW5lLlJlaW1idXJzYWJsZUV4cGVuc2UgPz8gbGluZS5yZWltYnVyc2FibGVFeHBlbnNlKSxcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGxpbmUuQ3VycmVuY3lDb2RlID8/IGxpbmUuY3VycmVuY3lDb2RlKSxcbiAgICBhbW91bnRNU1Q6IHRvTnVsbGFibGVOdW1iZXIobGluZS5BbW91bnRNU1QgPz8gbGluZS5hbW91bnRNU1QpLFxuICAgIGV4Y2hSYXRlOiB0b051bGxhYmxlTnVtYmVyKGxpbmUuRXhjaFJhdGUgPz8gbGluZS5leGNoUmF0ZSksXG4gICAgaW5kQXR0YWNoRmlsZXM6IHNhZmVUZXh0KGxpbmUuSW5kQXR0YWNoRmlsZXMgPz8gbGluZS5pbmRBdHRhY2hGaWxlcyksXG4gIH07XG59O1xuIiwgImltcG9ydCB7IHBhcnNlRXhwZW5zZUFwaURhdGUgfSBmcm9tIFwiLi9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBFeHBlbnNlRGF0ZVBhcnRzID0ge1xyXG4gIHllYXI6IHN0cmluZztcclxuICBtb250aDogc3RyaW5nO1xyXG4gIGRheTogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBQYXJzZUV4cGVuc2VEYXRlT3B0aW9ucyA9IHtcclxuICBwcmVmZXJNb250aEZpcnN0T25TbGFzaD86IGJvb2xlYW47XHJcbn07XHJcblxyXG5jb25zdCBCQVNRVUVfTU9OVEhTX1NIT1JUID0gW1xyXG4gIFwidXJ0XCIsXHJcbiAgXCJvdHNcIixcclxuICBcIm1hclwiLFxyXG4gIFwiYXBpXCIsXHJcbiAgXCJtYWlcIixcclxuICBcImVrYVwiLFxyXG4gIFwidXp0XCIsXHJcbiAgXCJhYnVcIixcclxuICBcImlyYVwiLFxyXG4gIFwidXJyXCIsXHJcbiAgXCJhemFcIixcclxuICBcImFiZVwiLFxyXG5dO1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVWlMb2NhbGUgPSAobG9jYWxlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKGxvY2FsZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiZXMtRVNcIjtcclxuICBpZiAoL156aC1oYW5zL2kudGVzdCh2YWx1ZSkpIHJldHVybiBcInpoLUNOXCI7XHJcbiAgcmV0dXJuIHZhbHVlO1xyXG59O1xyXG5cclxuY29uc3QgaXNCYXNxdWVMb2NhbGUgPSAobG9jYWxlOiBzdHJpbmcpOiBib29sZWFuID0+IC9eZXVcXGIvaS50ZXN0KFN0cmluZyhsb2NhbGUgfHwgXCJcIikpO1xyXG5cclxuLy8gTm9ybWFsaXplIHVua25vd24gdmFsdWVzIHRvIGEgdHJpbW1lZCBzdHJpbmcuXHJcbmV4cG9ydCBjb25zdCBzYWZlVGV4dCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xyXG4gIHJldHVybiBTdHJpbmcodmFsdWUpLnRyaW0oKTtcclxufTtcclxuXHJcbi8vIENsZWFucyBjaGF0IHRleHQgd2hpbGUgcHJlc2VydmluZyBhY2NlbnRzIGFuZCByZWFkYWJsZSBwdW5jdHVhdGlvbi5cclxuZXhwb3J0IGNvbnN0IHNhbml0aXplQXNzaXN0YW50VGV4dCA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgc291cmNlID0gc2FmZVRleHQodmFsdWUpO1xyXG4gIGlmICghc291cmNlKSByZXR1cm4gXCJcIjtcclxuXHJcbiAgcmV0dXJuIHNvdXJjZVxyXG4gICAgLm5vcm1hbGl6ZShcIk5GQ1wiKVxyXG4gICAgLnJlcGxhY2UoL1xcdUZFRkYvZywgXCJcIilcclxuICAgIC5yZXBsYWNlKC9bXFx1MDAwMC1cXHUwMDA4XFx1MDAwQlxcdTAwMENcXHUwMDBFLVxcdTAwMUZcXHUwMDdGXS9nLCBcIlwiKVxyXG4gICAgLnJlcGxhY2UoL1tcXHUyMDBCLVxcdTIwMERcXHUyMDYwXS9nLCBcIlwiKVxyXG4gICAgLnJlcGxhY2UoL1xcclxcbj8vZywgXCJcXG5cIilcclxuICAgIC5yZXBsYWNlKC9bIFxcdF0rXFxuL2csIFwiXFxuXCIpXHJcbiAgICAucmVwbGFjZSgvXFxuezMsfS9nLCBcIlxcblxcblwiKVxyXG4gICAgLnRyaW0oKTtcclxufTtcclxuXHJcbi8vIE5vcm1hbGl6ZXMgY2FyZCB0aXRsZSB0ZXh0IG9ubHkgd2hlbiBpdCBjb21lcyBpbiBmdWxsIHVwcGVyIG9yIGZ1bGwgbG93ZXIgY2FzZS5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUNhcmRUaXRsZVRleHQgPSAodmFsdWU6IHVua25vd24sIGZhbGxiYWNrID0gXCItXCIpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHNvdXJjZSA9IHNhZmVUZXh0KHZhbHVlKTtcclxuICBpZiAoIXNvdXJjZSkgcmV0dXJuIGZhbGxiYWNrO1xyXG5cclxuICBjb25zdCBoYXNMZXR0ZXJzID0gL1tBLVphLXpcdTAwQzAtXHUwMEQ2XHUwMEQ4LVx1MDBGNlx1MDBGOC1cdTAwRkZdLy50ZXN0KHNvdXJjZSk7XHJcbiAgaWYgKCFoYXNMZXR0ZXJzKSByZXR1cm4gc291cmNlO1xyXG5cclxuICBjb25zdCBpc0FsbFVwcGVyID0gc291cmNlID09PSBzb3VyY2UudG9VcHBlckNhc2UoKSAmJiBzb3VyY2UgIT09IHNvdXJjZS50b0xvd2VyQ2FzZSgpO1xyXG4gIGNvbnN0IGlzQWxsTG93ZXIgPSBzb3VyY2UgPT09IHNvdXJjZS50b0xvd2VyQ2FzZSgpICYmIHNvdXJjZSAhPT0gc291cmNlLnRvVXBwZXJDYXNlKCk7XHJcbiAgaWYgKCFpc0FsbFVwcGVyICYmICFpc0FsbExvd2VyKSB7XHJcbiAgICByZXR1cm4gc291cmNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbG93ZXIgPSBzb3VyY2UudG9Mb3dlckNhc2UoKTtcclxuICByZXR1cm4gYCR7bG93ZXIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCl9JHtsb3dlci5zbGljZSgxKX1gO1xyXG59O1xyXG5cclxuLy8gUmV0dXJucyB0cnVlIG9ubHkgd2hlbiB2b3VjaGVyIGhhcyBhIG1lYW5pbmdmdWwgYXNzaWduZWQgdmFsdWUuXHJcbmV4cG9ydCBjb25zdCBoYXNBc3NpZ25lZFZvdWNoZXIgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICBjb25zdCB2b3VjaGVyID0gc2FmZVRleHQodmFsdWUpLnRvVXBwZXJDYXNlKCk7XHJcbiAgaWYgKCF2b3VjaGVyKSByZXR1cm4gZmFsc2U7XHJcbiAgcmV0dXJuIHZvdWNoZXIgIT09IFwiLVwiICYmIHZvdWNoZXIgIT09IFwiLlwiICYmIHZvdWNoZXIgIT09IFwiMFwiO1xyXG59O1xyXG5cclxuLy8gUmV0dXJuIGRhdGUgYXQgbG9jYWwgZGF5IHN0YXJ0LlxyXG5leHBvcnQgY29uc3Qgc3RhcnRPZkRheSA9IChkYXRlOiBEYXRlKTogRGF0ZSA9PiB7XHJcbiAgcmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSk7XHJcbn07XHJcblxyXG4vLyBGb3JtYXQgbG9jYWwgZGF0ZSB0byB5eXl5LU1NLWRkLlxyXG5leHBvcnQgY29uc3QgdG9Jc29EYXRlID0gKGRhdGU6IERhdGUpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBgJHtkYXRlLmdldEZ1bGxZZWFyKCl9LSR7U3RyaW5nKGRhdGUuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKX0tJHtTdHJpbmcoZGF0ZS5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKX1gO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlRGF0ZSA9ICh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyKTogRGF0ZSB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IGNhbmRpZGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoIC0gMSwgZGF5KTtcclxuICBpZiAoXHJcbiAgICBOdW1iZXIuaXNOYU4oY2FuZGlkYXRlLmdldFRpbWUoKSkgfHxcclxuICAgIGNhbmRpZGF0ZS5nZXRGdWxsWWVhcigpICE9PSB5ZWFyIHx8XHJcbiAgICBjYW5kaWRhdGUuZ2V0TW9udGgoKSAhPT0gbW9udGggLSAxIHx8XHJcbiAgICBjYW5kaWRhdGUuZ2V0RGF0ZSgpICE9PSBkYXlcclxuICApIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGNhbmRpZGF0ZTtcclxufTtcclxuXHJcbi8vIFBhcnNlIHN1cHBvcnRlZCBBUEkgZGF0ZSBmb3JtYXRzLlxyXG5leHBvcnQgY29uc3QgcGFyc2VFeHBlbnNlRGF0ZSA9IChyYXc/OiBzdHJpbmcsIG9wdGlvbnM/OiBQYXJzZUV4cGVuc2VEYXRlT3B0aW9ucyk6IERhdGUgfCBudWxsID0+IHtcclxuICBpZiAoIXJhdykgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcocmF3KS50cmltKCk7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IGRhdGVPbmx5ID0gdmFsdWUuc3BsaXQoXCJUXCIpWzBdLnNwbGl0KFwiIFwiKVswXTtcclxuXHJcbiAgLy8gS2VlcCBvcHRpb25hbCBtb250aC1maXJzdCBjb21wYXRpYmlsaXR5IGZvciBsZWdhY3kgc2xhc2ggZGF0ZXMgaW4gY2FyZHMuXHJcbiAgaWYgKG9wdGlvbnM/LnByZWZlck1vbnRoRmlyc3RPblNsYXNoICYmIC9eXFxkezJ9XFwvXFxkezJ9XFwvXFxkezR9JC8udGVzdChkYXRlT25seSkpIHtcclxuICAgIGNvbnN0IFtmaXJzdFBhcnQsIHNlY29uZFBhcnQsIHllYXJQYXJ0XSA9IGRhdGVPbmx5LnNwbGl0KC9bLi8tXS8pO1xyXG4gICAgY29uc3QgZmlyc3QgPSBOdW1iZXIoZmlyc3RQYXJ0KTtcclxuICAgIGNvbnN0IHNlY29uZCA9IE51bWJlcihzZWNvbmRQYXJ0KTtcclxuICAgIGNvbnN0IHllYXIgPSBOdW1iZXIoeWVhclBhcnQpO1xyXG4gICAgY29uc3QgbW9udGhGaXJzdERhdGUgPSBidWlsZEV4cGVuc2VEYXRlKHllYXIsIGZpcnN0LCBzZWNvbmQpO1xyXG4gICAgaWYgKG1vbnRoRmlyc3REYXRlKSB7XHJcbiAgICAgIHJldHVybiBtb250aEZpcnN0RGF0ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBwYXJzZUV4cGVuc2VBcGlEYXRlKHZhbHVlKTtcclxufTtcclxuXHJcbi8vIEZvcm1hdCBhIGRhdGUgZm9yIHJlYWQtb25seSBmaWVsZHMgdXNpbmcgdGhlIHNhbWUgb3V0cHV0IHN0eWxlIGFzIHZpc2l0cy5cclxuZXhwb3J0IGNvbnN0IGZvcm1hdEV4cGVuc2VEaXNwbGF5RGF0ZSA9IChyYXc/OiBzdHJpbmcsIGxvY2FsZSA9IFwiZXMtRVNcIiwgZmFsbGJhY2sgPSBcIi1cIik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgZGF0ZSA9IHBhcnNlRXhwZW5zZURhdGUocmF3KTtcclxuICBpZiAoIWRhdGUpIHJldHVybiBmYWxsYmFjaztcclxuXHJcbiAgY29uc3Qgc2FmZUxvY2FsZSA9IG5vcm1hbGl6ZVVpTG9jYWxlKGxvY2FsZSk7XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKHNhZmVMb2NhbGUpKSB7XHJcbiAgICByZXR1cm4gYCR7ZGF0ZS5nZXREYXRlKCl9ICR7QkFTUVVFX01PTlRIU19TSE9SVFtkYXRlLmdldE1vbnRoKCldfSAke2RhdGUuZ2V0RnVsbFllYXIoKX1gLnRvTG93ZXJDYXNlKCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZGF0ZVxyXG4gICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhzYWZlTG9jYWxlLCB7XHJcbiAgICAgIGRheTogXCJudW1lcmljXCIsXHJcbiAgICAgIG1vbnRoOiBcInNob3J0XCIsXHJcbiAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxyXG4gICAgfSlcclxuICAgIC5yZXBsYWNlKC9cXC4vZywgXCJcIilcclxuICAgIC50b0xvd2VyQ2FzZSgpO1xyXG59O1xyXG5cclxuLy8gQnVpbGQgdGltZWxpbmUgZGF0ZSBmcmFnbWVudHMgZm9yIGNhcmQgbGVmdCBwYW5lbC5cclxuZXhwb3J0IGNvbnN0IGZvcm1hdEV4cGVuc2VEYXRlUGFydHMgPSAocmF3Pzogc3RyaW5nLCBsb2NhbGUgPSBcImVzLUVTXCIsIG9wdGlvbnM/OiBQYXJzZUV4cGVuc2VEYXRlT3B0aW9ucyk6IEV4cGVuc2VEYXRlUGFydHMgPT4ge1xyXG4gIGNvbnN0IGRhdGUgPSBwYXJzZUV4cGVuc2VEYXRlKHJhdywgb3B0aW9ucyk7XHJcbiAgaWYgKCFkYXRlKSB7XHJcbiAgICByZXR1cm4geyB5ZWFyOiBcIlwiLCBtb250aDogXCJcIiwgZGF5OiBcIi0tXCIgfTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB5ZWFyOiBTdHJpbmcoZGF0ZS5nZXRGdWxsWWVhcigpKSxcclxuICAgIG1vbnRoOiBkYXRlLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgbW9udGg6IFwic2hvcnRcIiB9KS5yZXBsYWNlKC9cXC4vZywgXCJcIikudG9VcHBlckNhc2UoKSxcclxuICAgIGRheTogU3RyaW5nKGRhdGUuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIiksXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHRvTnVsbGFibGVOdW1iZXIgfSBmcm9tIFwiLi9leHBlbnNlQXBpVHJhbnNmb3Jtcy50c1wiO1xuXG50eXBlIFRpY2tldExpbmVBbW91bnRJbnB1dCA9IHtcbiAgcXR5PzogdW5rbm93bjtcbiAgcHJpY2U/OiB1bmtub3duO1xuICB0b3RhbEFtb3VudD86IHVua25vd247XG59O1xuXG4vLyBSZXNvbHZlcyB0aGUgc2lnbmVkIHRpY2tldCBsaW5lIGFtb3VudCwgcHJlc2VydmluZyB6ZXJvLXF1YW50aXR5IGRpc2NvdW50IGxpbmVzLlxuZXhwb3J0IGNvbnN0IHJlc29sdmVUaWNrZXRMaW5lQW1vdW50ID0gKGxpbmU6IFRpY2tldExpbmVBbW91bnRJbnB1dCB8IG51bGwgfCB1bmRlZmluZWQpOiBudW1iZXIgfCBudWxsID0+IHtcbiAgaWYgKCFsaW5lKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBleHBsaWNpdFRvdGFsID0gdG9OdWxsYWJsZU51bWJlcihsaW5lLnRvdGFsQW1vdW50KTtcbiAgaWYgKGV4cGxpY2l0VG90YWwgIT09IG51bGwpIHtcbiAgICByZXR1cm4gZXhwbGljaXRUb3RhbDtcbiAgfVxuXG4gIGNvbnN0IHF0eSA9IHRvTnVsbGFibGVOdW1iZXIobGluZS5xdHkpO1xuICBjb25zdCBwcmljZSA9IHRvTnVsbGFibGVOdW1iZXIobGluZS5wcmljZSk7XG4gIGlmIChxdHkgPT09IG51bGwgfHwgcHJpY2UgPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChxdHkgPT09IDAgJiYgcHJpY2UgPCAwKSB7XG4gICAgcmV0dXJuIHByaWNlO1xuICB9XG5cbiAgcmV0dXJuIHF0eSAqIHByaWNlO1xufTtcblxuLy8gVmFsaWRhdGVzIHRpY2tldCBsaW5lIGFtb3VudHMgd2hpbGUgYWxsb3dpbmcgcXR5PTAgb25seSBmb3IgbmVnYXRpdmUgZGlzY291bnRzLlxuZXhwb3J0IGNvbnN0IGlzVmFsaWRUaWNrZXRMaW5lQW1vdW50ID0gKGxpbmU6IFRpY2tldExpbmVBbW91bnRJbnB1dCB8IG51bGwgfCB1bmRlZmluZWQpOiBib29sZWFuID0+IHtcbiAgY29uc3QgcXR5ID0gdG9OdWxsYWJsZU51bWJlcihsaW5lPy5xdHkpO1xuICBjb25zdCBwcmljZSA9IHRvTnVsbGFibGVOdW1iZXIobGluZT8ucHJpY2UpO1xuICBpZiAocXR5ID09PSBudWxsIHx8IHByaWNlID09PSBudWxsIHx8IHF0eSA8IDAgfHwgcHJpY2UgPT09IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAocXR5ID4gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY29uc3QgbGluZUFtb3VudCA9IHJlc29sdmVUaWNrZXRMaW5lQW1vdW50KGxpbmUpO1xuICByZXR1cm4gbGluZUFtb3VudCAhPT0gbnVsbCAmJiBsaW5lQW1vdW50IDwgMDtcbn07XG4iLCAiaW1wb3J0IHtcclxuICBBcGlGZXRjaEVycm9yLFxyXG4gIGZldGNoSnNvbixcclxuICBnZXRDc3JmVG9rZW4sXHJcbiAgaGFuZGxlQXBpQXV0aEZhaWx1cmUsXHJcbiAgcmVhZEFwaU1lc3NhZ2VGcm9tUmF3LFxyXG4gIHR5cGUgQXBpRmV0Y2hPcHRpb25zLFxyXG59IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB0eXBlIHtcclxuICBFbnRyYUNvbnRleHREdG8sXHJcbiAgRW50cmFDb250ZXh0UmVxdWVzdCxcclxuICBFeGNoYW5nZVJhdGVEdG8sXHJcbiAgRnVlbFByaWNlS21EdG8sXHJcbiAgRXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8sXHJcbiAgRXhwZW5zZVNoZWV0Q3JlYXRlUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRDcmVhdGVSZXNwb25zZURhdGEsXHJcbiAgRXhwZW5zZVNoZWV0RGV0YWlsRHRvLFxyXG4gIEV4cGVuc2VTaGVldERyYWZ0UmVzcG9uc2UsXHJcbiAgRXhwZW5zZVNoZWV0SGVhZGVyVXBkYXRlUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRMaW5lRHRvLFxyXG4gIEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXNwb25zZURhdGEsXHJcbiAgRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8sXHJcbiAgRXhwZW5zZVNoZWV0TGlzdFJlc3BvbnNlRW52ZWxvcGUsXHJcbiAgRXhwZW5zZVNoZWV0c0Fza1JlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0c0Fza1Jlc3BvbnNlRGF0YSxcclxuICBFeHBlbnNlU2hlZXRzQXNrUmVzdWx0LFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldENyZWF0ZVJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdEl0ZW1EdG8sXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlc3VsdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5lUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldFRpY2tldFVwZGF0ZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldFRpY2tldFRvdGFsQWRqdXN0bWVudFJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldFRpY2tldFRvdGFsQWRqdXN0bWVudFJlc3VsdER0byxcbiAgRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG8sXG4gIEluZEFwaVJlc3BvbnNlLFxuICBJbmRQYWdlZFJlc3BvbnNlLFxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgaXNOb25OZWdhdGl2ZU51bWJlciBhcyBpc05vbk5lZ2F0aXZlTnVtYmVyVHJhbnNmb3JtLFxyXG4gIGlzUG9zaXRpdmVOdW1iZXIgYXMgaXNQb3NpdGl2ZU51bWJlclRyYW5zZm9ybSxcclxuICBub3JtYWxpemVFeHBlbnNlU2hlZXRMaXN0U3RhdHVzRmlsdGVyIGFzIG5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXJUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUgYXMgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGVUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRQcm9jZXNzZWRCeUFJIGFzIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1cyBhcyBub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1c1RyYW5zZm9ybSxcclxuICBub3JtYWxpemVPcHRpb25hbEFwaURhdGUgYXMgbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZSBhcyBub3JtYWxpemVSZXF1aXJlZEFwaURhdGVUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplVGlja2V0TGlzdERhdGUgYXMgbm9ybWFsaXplVGlja2V0TGlzdERhdGVUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZSBhcyBub3JtYWxpemVUaWNrZXRMaXN0R2FzdG9UeXBlVHJhbnNmb3JtLFxyXG4gIHNhZmVUZXh0IGFzIHNhZmVUZXh0VHJhbnNmb3JtLFxyXG4gIHRvRmxhZ0Jvb2wgYXMgdG9GbGFnQm9vbFRyYW5zZm9ybSxcclxuICB0b051bGxhYmxlQm9vbCBhcyB0b051bGxhYmxlQm9vbFRyYW5zZm9ybSxcclxuICB0b051bGxhYmxlR2FzdG9UeXBlQ29kZSBhcyB0b051bGxhYmxlR2FzdG9UeXBlQ29kZVRyYW5zZm9ybSxcclxuICB0b051bGxhYmxlTnVtYmVyIGFzIHRvTnVsbGFibGVOdW1iZXJUcmFuc2Zvcm0sXHJcbiAgdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGUgYXMgdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGVUcmFuc2Zvcm0sXHJcbn0gZnJvbSBcIi4vZXhwZW5zZUFwaVRyYW5zZm9ybXMudHNcIjtcclxuaW1wb3J0IHtcclxuICBub3JtYWxpemVBcGlSZXNwb25zZSBhcyBub3JtYWxpemVBcGlSZXNwb25zZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2UgYXMgbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UgYXMgbm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlIGFzIG5vcm1hbGl6ZVN1Ym9yZGluYXRlc1BhZ2VkUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplVGlja2V0TGlua0J1bGtSZXNwb25zZSBhcyBub3JtYWxpemVUaWNrZXRMaW5rQnVsa1Jlc3BvbnNlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVUaWNrZXRMaW5rTGlzdFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZVRpY2tldFF1aWNrQ3JlYXRlUmVzcG9uc2UgYXMgbm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcclxufSBmcm9tIFwiLi9leHBlbnNlQXBpUmVzcG9uc2VOb3JtYWxpemVycy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIG1hcEV4cGVuc2VTaGVldEhlYWRlciBhcyBtYXBFeHBlbnNlU2hlZXRIZWFkZXJDb3JlLFxyXG4gIG1hcEV4cGVuc2VTaGVldExpbmUgYXMgbWFwRXhwZW5zZVNoZWV0TGluZUNvcmUsXHJcbiAgbWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmQgYXMgbWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmRDb3JlLFxyXG59IGZyb20gXCIuL2V4cGVuc2VBcGlNYXBwZXJzLnRzXCI7XHJcbmltcG9ydCB7IHNhbml0aXplQXNzaXN0YW50VGV4dCB9IGZyb20gXCIuL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQgeyBFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFIH0gZnJvbSBcIi4vZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xuaW1wb3J0IHsgaXNWYWxpZFRpY2tldExpbmVBbW91bnQgfSBmcm9tIFwiLi9leHBlbnNlVGlja2V0TGluZUFtb3VudC50c1wiO1xuaW1wb3J0IHsgZ2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSB9IGZyb20gXCIuL2V4cGVuc2VBY3RpbmdVc2VyLnRzXCI7XG5pbXBvcnQgeyByZXNvbHZlRWZmZWN0aXZlQ29tcGFueUlkIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NvbXBhbnlTZWxlY3Rpb24udHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcblxyXG50eXBlIFByb2plY3REcm9wZG93bk9wdGlvbiA9IHtcbiAgdmFsdWU/OiBzdHJpbmc7XG4gIFZhbHVlPzogc3RyaW5nO1xuICB0ZXh0Pzogc3RyaW5nO1xuICBUZXh0Pzogc3RyaW5nO1xuICBwcm9qSWQ/OiBzdHJpbmc7XG4gIFByb2pJZD86IHN0cmluZztcbiAgbmFtZT86IHN0cmluZztcbiAgTmFtZT86IHN0cmluZztcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIERlc2NyaXB0aW9uPzogc3RyaW5nO1xufTtcblxudHlwZSBQcm9qZWN0RHJvcGRvd25SZXNwb25zZSA9IHtcbiAgdG90YWw/OiBudW1iZXI7XG4gIFRvdGFsPzogbnVtYmVyO1xuICBpdGVtcz86IFByb2plY3REcm9wZG93bk9wdGlvbltdO1xuICBJdGVtcz86IFByb2plY3REcm9wZG93bk9wdGlvbltdO1xufTtcblxyXG50eXBlIExlZ2FjeUV4cGVuc2VMaXN0SXRlbSA9IHtcclxuICBob2phR2FzdG9zSWQ/OiB1bmtub3duO1xyXG4gIGRlc2NyaXB0aW9uPzogdW5rbm93bjtcclxuICBlc3RhZG9Db21lbnRhcmlvcz86IHVua25vd247XHJcbiAgdm91Y2hlcj86IHVua25vd247XHJcbiAgcHJvaklkPzogdW5rbm93bjtcclxuICBjdXJyZW5jeUNvZGU/OiB1bmtub3duO1xyXG4gIHRvdGFsQW1vdW50PzogdW5rbm93bjtcclxuICB0b3RhbEFtb3VudE1TVD86IHVua25vd247XHJcbiAgZXhjaFJhdGU/OiB1bmtub3duO1xyXG4gIHVzZXJJZD86IHVua25vd247XG4gIHVzZXJOYW1lPzogdW5rbm93bjtcbiAgb3duZXJBeFVzZXJJZD86IHVua25vd247XG4gIG93bmVyTmFtZT86IHVua25vd247XG4gIGV4Y2hhbmdlUmF0ZU1vZGU/OiB1bmtub3duO1xuICByZWltYnVyc2FibGVFeHBlbnNlPzogdW5rbm93bjtcbiAgZXhwZW5zZVNoZWV0U3RhdHVzPzogdW5rbm93bjtcbiAgY3JlYXRlZERhdGU/OiB1bmtub3duO1xufTtcblxyXG50eXBlIExlZ2FjeUV4cGVuc2VMaXN0UmVzcG9uc2UgPSB7XHJcbiAgc3VjY2Vzcz86IGJvb2xlYW47XHJcbiAgbWVzc2FnZT86IHN0cmluZztcclxuICB0b3RhbD86IG51bWJlcjtcclxuICBwYWdlPzogbnVtYmVyO1xyXG4gIHBhZ2VTaXplPzogbnVtYmVyO1xyXG4gIGl0ZW1zPzogTGVnYWN5RXhwZW5zZUxpc3RJdGVtW107XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VBcGlDb250ZXh0ID0ge1xyXG4gIHRva2VuOiBzdHJpbmc7XHJcbiAgY29tcGFueUlkOiBzdHJpbmc7XHJcbiAgYXhVc2VySWQ6IHN0cmluZztcclxuICBjcm1Vc2VySWQ6IHN0cmluZztcclxuICBkZWZhdWx0Q3VycmVuY3lDb2RlOiBzdHJpbmc7XHJcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEV4cGVuc2VBcGlDb250ZXh0U25hcHNob3QgPSB7XHJcbiAgY29tcGFueUlkOiBzdHJpbmc7XHJcbiAgYXhVc2VySWQ6IHN0cmluZztcclxuICBjcm1Vc2VySWQ6IHN0cmluZztcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlQXBpQXV0aFNlZWQgPSB7XHJcbiAgdG9rZW46IHN0cmluZztcclxuICBlbnRyYU9pZDogc3RyaW5nO1xyXG4gIGFwcENvZGU6IHN0cmluZztcclxuICBzdHJpY3RBcGlSb3V0ZXM6IGJvb2xlYW47XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VXaW5kb3dSdW50aW1lID0ge1xyXG4gIF9fSU5EX0FQSV9UT0tFTl9fPzogc3RyaW5nO1xyXG4gIF9fSU5EX0VOVFJBX09JRF9fPzogc3RyaW5nO1xyXG4gIF9fSU5EX0FQUF9DT0RFX18/OiBzdHJpbmc7XHJcbiAgX19JTkRfU0VMRUNURURfQ09NUEFOWV9fPzogc3RyaW5nO1xyXG4gIF9fSU5EX0VYUEVOU0VfU1RSSUNUX0FQSV9fPzogYm9vbGVhbiB8IHN0cmluZztcclxuICBfX0VYUEVOU0VfR0FTVE9fVFlQRVNfXz86IEFycmF5PHtcclxuICAgIHZhbHVlPzogdW5rbm93bjtcclxuICAgIFZhbHVlPzogdW5rbm93bjtcclxuICAgIHRleHQ/OiB1bmtub3duO1xyXG4gICAgVGV4dD86IHVua25vd247XHJcbiAgfT47XHJcbn07XHJcblxyXG5jb25zdCBERUZBVUxUX0FQUF9DT0RFID0gXCJDUk1cIjtcclxuY29uc3QgSlNPTl9IRUFERVJTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG59O1xyXG5cclxubGV0IHJ1bnRpbWVBdXRoU2VlZDogUGFydGlhbDxFeHBlbnNlQXBpQXV0aFNlZWQ+ID0ge307XHJcbmxldCBjYWNoZWRDb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCB8IG51bGwgPSBudWxsO1xyXG5sZXQgY2FjaGVkQ29udGV4dEtleSA9IFwiXCI7XHJcbmxldCBjb250ZXh0UHJvbWlzZTogUHJvbWlzZTxFeHBlbnNlQXBpQ29udGV4dD4gfCBudWxsID0gbnVsbDtcclxuY29uc3QgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMgPSBuZXcgTWFwPHN0cmluZywgSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+KCk7XHJcbmNvbnN0IHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzID0gbmV3IE1hcDxzdHJpbmcsIFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+PigpO1xyXG5cclxuY29uc3Qgc2FmZVRleHQgPSBzYWZlVGV4dFRyYW5zZm9ybTtcclxuXHJcbmNvbnN0IHRvTnVsbGFibGVOdW1iZXIgPSB0b051bGxhYmxlTnVtYmVyVHJhbnNmb3JtO1xuY29uc3QgaXNOb25OZWdhdGl2ZU51bWJlciA9IGlzTm9uTmVnYXRpdmVOdW1iZXJUcmFuc2Zvcm07XG5jb25zdCBpc1Bvc2l0aXZlTnVtYmVyID0gaXNQb3NpdGl2ZU51bWJlclRyYW5zZm9ybTtcblxudHlwZSBFeHBlbnNlTGluZUN1cnJlbmN5UGF5bG9hZCA9IHtcbiAgY3VycmVuY3lDb2RlPzogc3RyaW5nIHwgbnVsbDtcbiAgYW1vdW50TVNUPzogbnVtYmVyIHwgbnVsbDtcbiAgZXhjaFJhdGU/OiBudW1iZXIgfCBudWxsO1xuICBxdHk/OiBudW1iZXIgfCBudWxsO1xuICBwcmljZT86IG51bWJlciB8IG51bGw7XG59O1xuXG5jb25zdCBub3JtYWxpemVDdXJyZW5jeUNvZGUgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4gc2FmZVRleHQodmFsdWUpLnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xuXG4vLyBWYWxpZGF0ZXMgdGhlIEFYIGxpbmUtY3VycmVuY3kgY29udHJhY3QgYmVmb3JlIHNlbmRpbmcgYSBsaW5lIHBheWxvYWQuXG5jb25zdCBoYXNNaXNzaW5nRm9yZWlnbkxpbmVTZXR0bGVtZW50ID0gKGxpbmU6IEV4cGVuc2VMaW5lQ3VycmVuY3lQYXlsb2FkLCBsb2NhbEN1cnJlbmN5Q29kZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IGxpbmVDdXJyZW5jeUNvZGUgPSBub3JtYWxpemVDdXJyZW5jeUNvZGUobGluZS5jdXJyZW5jeUNvZGUpO1xuICBjb25zdCBub3JtYWxpemVkTG9jYWxDdXJyZW5jeUNvZGUgPSBub3JtYWxpemVDdXJyZW5jeUNvZGUobG9jYWxDdXJyZW5jeUNvZGUpIHx8IFwiRVVSXCI7XG4gIGlmICghbGluZUN1cnJlbmN5Q29kZSB8fCBsaW5lQ3VycmVuY3lDb2RlID09PSBub3JtYWxpemVkTG9jYWxDdXJyZW5jeUNvZGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBhbW91bnQgPSBOdW1iZXIobGluZS5xdHkgPz8gMCkgKiBOdW1iZXIobGluZS5wcmljZSA/PyAwKTtcbiAgY29uc3QgZXhjaGFuZ2VSYXRlID0gdG9OdWxsYWJsZU51bWJlcihsaW5lLmV4Y2hSYXRlKTtcbiAgY29uc3QgYW1vdW50TVNUID0gdG9OdWxsYWJsZU51bWJlcihsaW5lLmFtb3VudE1TVCk7XG4gIHJldHVybiBhbW91bnQgPiAwICYmICEoZXhjaGFuZ2VSYXRlICE9IG51bGwgJiYgZXhjaGFuZ2VSYXRlID4gMCkgJiYgIShhbW91bnRNU1QgIT0gbnVsbCAmJiBhbW91bnRNU1QgPiAwKTtcbn07XG5cbmNvbnN0IGJ1aWxkRm9yZWlnbkxpbmVTZXR0bGVtZW50RXJyb3IgPSAoKTogQXBpRmV0Y2hFcnJvciA9PlxuICBuZXcgQXBpRmV0Y2hFcnJvcihcbiAgICBpbmRUKFxuICAgICAgXCJFeHBlbnNlU2hlZXRzX0xpbmVfVmFsaWRhdGlvbl9Gb3JlaWduQ3VycmVuY3lTZXR0bGVtZW50XCIsXG4gICAgICBcIkZvcmVpZ24gY3VycmVuY3kgbGluZXMgcmVxdWlyZSBhbiBleGNoYW5nZSByYXRlIGdyZWF0ZXIgdGhhbiAwIG9yIGEgcmVpbWJ1cnNlbWVudCBhbW91bnQuXCJcbiAgICApXG4gICk7XG5jb25zdCB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZSA9IHRvTnVsbGFibGVUaWNrZXRTdGF0dXNDb2RlVHJhbnNmb3JtO1xuY29uc3QgdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUgPSB0b051bGxhYmxlR2FzdG9UeXBlQ29kZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUgPSBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZSA9IG5vcm1hbGl6ZVRpY2tldExpc3RHYXN0b1R5cGVUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzID0gbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRTdGF0dXNUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlID0gbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZSA9IG5vcm1hbGl6ZVRpY2tldExpc3REYXRlVHJhbnNmb3JtO1xyXG5jb25zdCB0b051bGxhYmxlQm9vbCA9IHRvTnVsbGFibGVCb29sVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUkgPSBub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUlUcmFuc2Zvcm07XG5jb25zdCBub3JtYWxpemVFeHBlbnNlU2hlZXRMaXN0U3RhdHVzRmlsdGVyID0gbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlclRyYW5zZm9ybTtcbmNvbnN0IHRvRmxhZ0Jvb2wgPSB0b0ZsYWdCb29sVHJhbnNmb3JtO1xuXG5jb25zdCBub3JtYWxpemVFeHBlbnNlU2hlZXRSZWltYnVyc2FibGUgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcbiAgY29uc3QgcGFyc2VkID0gdG9OdWxsYWJsZU51bWJlcih2YWx1ZSk7XG4gIGlmIChwYXJzZWQgPT09IG51bGwgfHwgIU51bWJlci5pc0ludGVnZXIocGFyc2VkKSB8fCBwYXJzZWQgPCAwKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4gcGFyc2VkO1xufTtcblxuY29uc3QgcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lID0gKCk6IEV4cGVuc2VXaW5kb3dSdW50aW1lID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiB7fTtcclxuICByZXR1cm4gd2luZG93IGFzIHVua25vd24gYXMgRXhwZW5zZVdpbmRvd1J1bnRpbWU7XHJcbn07XHJcblxyXG5jb25zdCBzYW5pdGl6ZUhlYWRlcnMgPSAoaGVhZGVyczogSGVhZGVyc0luaXQgfCB1bmRlZmluZWQpOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0+IHtcclxuICBpZiAoIWhlYWRlcnMpIHJldHVybiB7fTtcclxuXHJcbiAgaWYgKGhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XHJcbiAgICBjb25zdCByZXN1bHQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcclxuICAgIGhlYWRlcnMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xyXG4gICAgICByZXN1bHRba2V5XSA9IHZhbHVlO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcclxuICAgIHJldHVybiBoZWFkZXJzLnJlZHVjZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PigoYWNjLCBba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgYWNjW1N0cmluZyhrZXkpXSA9IFN0cmluZyh2YWx1ZSk7XHJcbiAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9LCB7fSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gT2JqZWN0LmVudHJpZXMoaGVhZGVycykucmVkdWNlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+KChhY2MsIFtrZXksIHZhbHVlXSkgPT4ge1xyXG4gICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHJldHVybiBhY2M7XHJcbiAgICBhY2Nba2V5XSA9IFN0cmluZyh2YWx1ZSk7XHJcbiAgICByZXR1cm4gYWNjO1xyXG4gIH0sIHt9KTtcclxufTtcclxuXHJcbmNvbnN0IGdldEhlYWRlclZhbHVlID0gKGhlYWRlcnM6IEhlYWRlcnNJbml0IHwgdW5kZWZpbmVkLCBrZXk6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEtleSA9IGtleS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICBjb25zdCBlbnRyaWVzID0gT2JqZWN0LmVudHJpZXMoc2FuaXRpemVIZWFkZXJzKGhlYWRlcnMpKTtcclxuICBjb25zdCBtYXRjaCA9IGVudHJpZXMuZmluZCgoW2hlYWRlcktleV0pID0+IGhlYWRlcktleS50cmltKCkudG9Mb3dlckNhc2UoKSA9PT0gbm9ybWFsaXplZEtleSk7XHJcbiAgcmV0dXJuIHNhZmVUZXh0KG1hdGNoPy5bMV0pO1xyXG59O1xyXG5cclxuY29uc3QgcmVtb3ZlSGVhZGVyVmFsdWUgPSAoaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiwga2V5OiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkS2V5ID0ga2V5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGNvbnN0IHRvRGVsZXRlID0gT2JqZWN0LmtleXMoaGVhZGVycykuZmluZCgoaGVhZGVyS2V5KSA9PiBoZWFkZXJLZXkudHJpbSgpLnRvTG93ZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRLZXkpO1xyXG4gIGlmICghdG9EZWxldGUpIHJldHVybjtcclxuICBkZWxldGUgaGVhZGVyc1t0b0RlbGV0ZV07XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVBeFVzZXJJZEhlYWRlciA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IHNhZmVUZXh0KHZhbHVlKTtcclxuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBcIlwiO1xyXG4gIGlmICgvXi1cXGQrJC8udGVzdChub3JtYWxpemVkKSkge1xyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZWQ7XHJcbiAgfVxyXG5cclxuICBjb25zdCBsYWJlbFNlcGFyYXRvciA9IG5vcm1hbGl6ZWQuaW5kZXhPZihcIiAtIFwiKTtcclxuICBpZiAobGFiZWxTZXBhcmF0b3IgPiAwKSB7XHJcbiAgICByZXR1cm4gc2FmZVRleHQobm9ybWFsaXplZC5zbGljZSgwLCBsYWJlbFNlcGFyYXRvcikpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZWQ7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlQmVhcmVyVG9rZW4gPSAoaGVhZGVyczogSGVhZGVyc0luaXQgfCB1bmRlZmluZWQpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGF1dGhvcml6YXRpb24gPSBnZXRIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIkF1dGhvcml6YXRpb25cIik7XHJcbiAgaWYgKCFhdXRob3JpemF0aW9uKSByZXR1cm4gXCJcIjtcclxuXHJcbiAgaWYgKC9eYmVhcmVyXFxzKy9pLnRlc3QoYXV0aG9yaXphdGlvbikpIHtcclxuICAgIHJldHVybiBhdXRob3JpemF0aW9uLnJlcGxhY2UoL15iZWFyZXJcXHMrL2ksIFwiXCIpLnRyaW0oKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBhdXRob3JpemF0aW9uLnRyaW0oKTtcclxufTtcclxuXHJcbmNvbnN0IHJlYWRXaW5kb3dBdXRoU2VlZCA9ICgpOiBQYXJ0aWFsPEV4cGVuc2VBcGlBdXRoU2VlZD4gPT4ge1xyXG4gIGNvbnN0IHJ1bnRpbWVXaW5kb3cgPSByZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUoKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHRva2VuOiBzYWZlVGV4dChydW50aW1lV2luZG93Ll9fSU5EX0FQSV9UT0tFTl9fKSxcclxuICAgIGVudHJhT2lkOiBzYWZlVGV4dChydW50aW1lV2luZG93Ll9fSU5EX0VOVFJBX09JRF9fKSxcclxuICAgIGFwcENvZGU6IHNhZmVUZXh0KHJ1bnRpbWVXaW5kb3cuX19JTkRfQVBQX0NPREVfXyksXHJcbiAgICBzdHJpY3RBcGlSb3V0ZXM6IHRvRmxhZ0Jvb2wocnVudGltZVdpbmRvdy5fX0lORF9FWFBFTlNFX1NUUklDVF9BUElfXykgPT09IHRydWUsXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IHRyeVBhcnNlSnNvbiA9IChyYXc6IHN0cmluZyk6IHVua25vd24gfCBudWxsID0+IHtcclxuICBpZiAoIXJhdyB8fCAhcmF3LnRyaW0oKSkgcmV0dXJuIG51bGw7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBKU09OLnBhcnNlKHJhdyk7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUgPSA8VD4odmFsdWU6IFQpOiBUID0+IHtcclxuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodmFsdWUpKSBhcyBUO1xyXG59O1xyXG5cclxuY29uc3QgcmVhZFJ1bnRpbWVTdHJpY3RBcGlGbGFnID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gZmFsc2U7XHJcbiAgY29uc3QgcnVudGltZVdpbmRvdyA9IHJlYWRFeHBlbnNlV2luZG93UnVudGltZSgpO1xyXG5cclxuICBjb25zdCBleHBsaWNpdFdpbmRvd0ZsYWcgPSB0b0ZsYWdCb29sKHJ1bnRpbWVXaW5kb3cuX19JTkRfRVhQRU5TRV9TVFJJQ1RfQVBJX18pO1xyXG4gIHJldHVybiBleHBsaWNpdFdpbmRvd0ZsYWcgPT09IHRydWU7XHJcbn07XHJcblxyXG5jb25zdCByZWFkV2luZG93U2VsZWN0ZWRDb21wYW55ID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIHNhZmVUZXh0KHJlYWRFeHBlbnNlV2luZG93UnVudGltZSgpLl9fSU5EX1NFTEVDVEVEX0NPTVBBTllfXykudG9VcHBlckNhc2UoKTtcclxufTtcclxuXHJcbi8vIENyZWF0ZXMgb25lIHN0YW5kYXJkIGFib3J0IGVycm9yIHdpdGhvdXQgY2FuY2VsbGluZyB0aGUgc2hhcmVkIHVuZGVybHlpbmcgcmVxdWVzdC5cclxuY29uc3QgY3JlYXRlRXhwZW5zZUFib3J0RXJyb3IgPSAoKTogRE9NRXhjZXB0aW9uID0+IHtcclxuICByZXR1cm4gbmV3IERPTUV4Y2VwdGlvbihcIkFib3J0ZWRcIiwgXCJBYm9ydEVycm9yXCIpO1xyXG59O1xyXG5cclxuLy8gTGV0cyBvbmUgY2FsbGVyIHN0b3Agd2FpdGluZyBvbiBzaGFyZWQgY29udGV4dCByZXNvbHV0aW9uIHdpdGhvdXQgYWJvcnRpbmcgb3RoZXIgY29uc3VtZXJzLlxyXG5jb25zdCB3YWl0Rm9yQWJvcnRhYmxlRXhwZW5zZVJlc3VsdCA9IGFzeW5jIDxUPihwcm9taXNlOiBQcm9taXNlPFQ+LCBzaWduYWw/OiBBYm9ydFNpZ25hbCk6IFByb21pc2U8VD4gPT4ge1xyXG4gIGlmICghc2lnbmFsKSByZXR1cm4gcHJvbWlzZTtcclxuICBpZiAoc2lnbmFsLmFib3J0ZWQpIHtcclxuICAgIHRocm93IGNyZWF0ZUV4cGVuc2VBYm9ydEVycm9yKCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYXdhaXQgbmV3IFByb21pc2U8VD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgY29uc3QgaGFuZGxlQWJvcnQgPSAoKSA9PiB7XHJcbiAgICAgIHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgaGFuZGxlQWJvcnQpO1xyXG4gICAgICByZWplY3QoY3JlYXRlRXhwZW5zZUFib3J0RXJyb3IoKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgaGFuZGxlQWJvcnQsIHsgb25jZTogdHJ1ZSB9KTtcclxuICAgIHByb21pc2UudGhlbihcclxuICAgICAgKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCBoYW5kbGVBYm9ydCk7XHJcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgIHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgaGFuZGxlQWJvcnQpO1xyXG4gICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZENvbnRleHRLZXkgPSAoc2VlZDogRXhwZW5zZUFwaUF1dGhTZWVkKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gYCR7c2VlZC50b2tlbn18JHtzZWVkLmVudHJhT2lkfXwke3NlZWQuYXBwQ29kZX18JHtyZWFkV2luZG93U2VsZWN0ZWRDb21wYW55KCl9YDtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkRXhwZW5zZUhlYWRlcnMgPSAoXHJcbiAgY29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyxcclxuICBpbmNsdWRlSnNvbiA9IGZhbHNlLFxyXG4gIGluY2x1ZGVBeFVzZXJJZCA9IHRydWVcclxuKTogSGVhZGVyc0luaXQgPT4ge1xyXG4gIGNvbnN0IGJhc2UgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XHJcbiAgY29uc3QgbWVyZ2VkOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0geyAuLi5iYXNlIH07XHJcblxyXG4gIGlmIChzYWZlVGV4dChjb250ZXh0LnRva2VuKSkge1xyXG4gICAgbWVyZ2VkLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7Y29udGV4dC50b2tlbn1gO1xyXG4gIH1cclxuXHJcbiAgaWYgKHNhZmVUZXh0KGNvbnRleHQuY29tcGFueUlkKSkge1xyXG4gICAgbWVyZ2VkW1wiWC1JTkQtQ29tcGFueVwiXSA9IGNvbnRleHQuY29tcGFueUlkO1xyXG4gIH1cclxuXHJcbiAgaWYgKGluY2x1ZGVBeFVzZXJJZCkge1xyXG4gICAgY29uc3QgcmVxdWVzdEF4VXNlcklkID0gZ2V0SGVhZGVyVmFsdWUob3B0aW9ucz8uaGVhZGVycywgXCJYLUlORC1BeFVzZXJJZFwiKTtcclxuICAgIGNvbnN0IG92ZXJyaWRlQXhVc2VySWQgPSBnZXRFeHBlbnNlQWN0aW5nVXNlck92ZXJyaWRlKCk7XHJcbiAgICBjb25zdCByZXNvbHZlZEF4VXNlcklkID0gc2FmZVRleHQocmVxdWVzdEF4VXNlcklkIHx8IG92ZXJyaWRlQXhVc2VySWQgfHwgY29udGV4dC5heFVzZXJJZCk7XHJcbiAgICBpZiAocmVzb2x2ZWRBeFVzZXJJZCkge1xyXG4gICAgICBtZXJnZWRbXCJYLUlORC1BeFVzZXJJZFwiXSA9IHJlc29sdmVkQXhVc2VySWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZW1vdmVIZWFkZXJWYWx1ZShtZXJnZWQsIFwiWC1JTkQtQXhVc2VySWRcIik7XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHJlbW92ZUhlYWRlclZhbHVlKG1lcmdlZCwgXCJYLUlORC1BeFVzZXJJZFwiKTtcclxuICB9XHJcblxyXG4gIGlmIChpbmNsdWRlSnNvbikge1xyXG4gICAgbWVyZ2VkW1wiQ29udGVudC1UeXBlXCJdID0gXCJhcHBsaWNhdGlvbi9qc29uXCI7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbWVyZ2VkO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRFeHBlbnNlRm9ybUhlYWRlcnMgPSAoY29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQsIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBIZWFkZXJzSW5pdCA9PiB7XHJcbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIGZhbHNlKSk7XHJcbiAgcmVtb3ZlSGVhZGVyVmFsdWUoaGVhZGVycywgXCJDb250ZW50LVR5cGVcIik7XHJcbiAgcmV0dXJuIGhlYWRlcnM7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZENvbnRleHRIZWFkZXJzID0gKHRva2VuOiBzdHJpbmcsIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBIZWFkZXJzSW5pdCA9PiB7XHJcbiAgY29uc3QgYmFzZSA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcclxuICBjb25zdCBtZXJnZWQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgICAuLi5iYXNlLFxyXG4gICAgLi4uSlNPTl9IRUFERVJTLFxyXG4gIH07XHJcblxyXG4gIGlmIChzYWZlVGV4dCh0b2tlbikpIHtcclxuICAgIG1lcmdlZC5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke3Rva2VufWA7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbWVyZ2VkO1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZUF1dGhUb2tlbiA9IChvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogc3RyaW5nID0+IHtcclxuICBjb25zdCB0b2tlbkZyb21IZWFkZXJzID0gcmVzb2x2ZUJlYXJlclRva2VuKG9wdGlvbnM/LmhlYWRlcnMpO1xyXG4gIGNvbnN0IHdpbmRvd1NlZWQgPSByZWFkV2luZG93QXV0aFNlZWQoKTtcclxuICByZXR1cm4gc2FmZVRleHQodG9rZW5Gcm9tSGVhZGVycyB8fCBydW50aW1lQXV0aFNlZWQudG9rZW4gfHwgd2luZG93U2VlZC50b2tlbik7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlQXV0aFNlZWQgPSAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IEV4cGVuc2VBcGlBdXRoU2VlZCA9PiB7XHJcbiAgY29uc3Qgd2luZG93U2VlZCA9IHJlYWRXaW5kb3dBdXRoU2VlZCgpO1xyXG4gIGNvbnN0IHRva2VuID0gcmVzb2x2ZUF1dGhUb2tlbihvcHRpb25zKTtcclxuICBjb25zdCBlbnRyYU9pZCA9IHNhZmVUZXh0KHJ1bnRpbWVBdXRoU2VlZC5lbnRyYU9pZCB8fCB3aW5kb3dTZWVkLmVudHJhT2lkKTtcclxuICBjb25zdCBhcHBDb2RlID0gc2FmZVRleHQocnVudGltZUF1dGhTZWVkLmFwcENvZGUgfHwgd2luZG93U2VlZC5hcHBDb2RlIHx8IERFRkFVTFRfQVBQX0NPREUpIHx8IERFRkFVTFRfQVBQX0NPREU7XHJcbiAgY29uc3Qgc3RyaWN0QXBpUm91dGVzID1cclxuICAgIHR5cGVvZiBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzID09PSBcImJvb2xlYW5cIlxyXG4gICAgICA/IHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXNcclxuICAgICAgOiAod2luZG93U2VlZC5zdHJpY3RBcGlSb3V0ZXMgPT09IHRydWUpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdG9rZW4sXHJcbiAgICBlbnRyYU9pZCxcclxuICAgIGFwcENvZGUsXHJcbiAgICBzdHJpY3RBcGlSb3V0ZXMsXHJcbiAgfTtcclxufTtcclxuXHJcbnR5cGUgUmF3RW50cmFDb250ZXh0Q29tcGFueSA9IHtcclxuICBDb21wYW55SWQ/OiB1bmtub3duO1xyXG4gIGNvbXBhbnlJZD86IHVua25vd247XHJcbiAgSXNEZWZhdWx0PzogdW5rbm93bjtcclxuICBpc0RlZmF1bHQ/OiB1bmtub3duO1xyXG4gIEFsbG93U2VsZk1hbmFnZW1lbnQ/OiB1bmtub3duO1xyXG4gIGFsbG93U2VsZk1hbmFnZW1lbnQ/OiB1bmtub3duO1xyXG4gIENybVVzZXJJZD86IHVua25vd247XHJcbiAgY3JtVXNlcklkPzogdW5rbm93bjtcclxufTtcclxuXHJcbnR5cGUgTm9ybWFsaXplZEVudHJhQ29udGV4dENvbXBhbnkgPSB7XHJcbiAgY29tcGFueUlkOiBzdHJpbmc7XHJcbiAgaXNEZWZhdWx0OiBib29sZWFuO1xyXG4gIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGJvb2xlYW47XHJcbiAgY3JtVXNlcklkOiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIFJhd0VudHJhQ29udGV4dEhlYWRlciA9IHtcclxuICBBeFVzZXJJZD86IHVua25vd247XHJcbiAgYXhVc2VySWQ/OiB1bmtub3duO1xyXG4gIERlZmF1bHRDb21wYW55PzogdW5rbm93bjtcclxuICBkZWZhdWx0Q29tcGFueT86IHVua25vd247XHJcbiAgRGVmYXVsdEN1cnJlbmN5Q29kZT86IHVua25vd247XHJcbiAgZGVmYXVsdEN1cnJlbmN5Q29kZT86IHVua25vd247XHJcbn07XHJcblxyXG50eXBlIFJhd0VudHJhQ29udGV4dEl0ZW0gPSB7XHJcbiAgSGVhZGVyPzogUmF3RW50cmFDb250ZXh0SGVhZGVyO1xyXG4gIGhlYWRlcj86IFJhd0VudHJhQ29udGV4dEhlYWRlcjtcclxuICBDb21wYW5pZXM/OiB1bmtub3duO1xyXG4gIGNvbXBhbmllcz86IHVua25vd247XHJcbn07XHJcblxyXG4vLyBNYXBzIG9uZSBFbnRyYSBjb21wYW55IGl0ZW0gdG8gdGhlIGZyb250ZW5kLXNhZmUgc2hhcGUgdXNlZCBieSBjb250ZXh0IGNvbnN1bWVycy5cclxuY29uc3QgbWFwRW50cmFDb250ZXh0Q29tcGFueSA9IChpdGVtOiB1bmtub3duKTogTm9ybWFsaXplZEVudHJhQ29udGV4dENvbXBhbnkgfCBudWxsID0+IHtcclxuICBpZiAoIWl0ZW0gfHwgdHlwZW9mIGl0ZW0gIT09IFwib2JqZWN0XCIpIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCByYXcgPSBpdGVtIGFzIFJhd0VudHJhQ29udGV4dENvbXBhbnk7XHJcbiAgY29uc3QgY29tcGFueUlkID0gc2FmZVRleHQocmF3LkNvbXBhbnlJZCA/PyByYXcuY29tcGFueUlkKTtcclxuICBpZiAoIWNvbXBhbnlJZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBjb21wYW55SWQsXHJcbiAgICBpc0RlZmF1bHQ6IHRvRmxhZ0Jvb2wocmF3LklzRGVmYXVsdCA/PyByYXcuaXNEZWZhdWx0KSA9PT0gdHJ1ZSxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQ6IHRvRmxhZ0Jvb2wocmF3LkFsbG93U2VsZk1hbmFnZW1lbnQgPz8gcmF3LmFsbG93U2VsZk1hbmFnZW1lbnQpID09PSB0cnVlLFxyXG4gICAgY3JtVXNlcklkOiBzYWZlVGV4dChyYXcuQ3JtVXNlcklkID8/IHJhdy5jcm1Vc2VySWQpLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCB2YWxpZGF0ZUNvbnRleHRSZXNwb25zZSA9IChyZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFbnRyYUNvbnRleHREdG8+KTogRXhwZW5zZUFwaUNvbnRleHQgPT4ge1xyXG4gIGNvbnN0IHJhd1Jlc3BvbnNlID0gcmVzcG9uc2UgYXMge1xyXG4gICAgU3VjY2Vzcz86IHVua25vd247XHJcbiAgICBzdWNjZXNzPzogdW5rbm93bjtcclxuICAgIE1lc3NhZ2U/OiB1bmtub3duO1xyXG4gICAgbWVzc2FnZT86IHVua25vd247XHJcbiAgICBJdGVtcz86IHVua25vd247XHJcbiAgICBpdGVtcz86IHVua25vd247XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaXNTdWNjZXNzID0gdG9GbGFnQm9vbChyYXdSZXNwb25zZS5TdWNjZXNzID8/IHJhd1Jlc3BvbnNlLnN1Y2Nlc3MpO1xyXG4gIGlmIChpc1N1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihzYWZlVGV4dChyYXdSZXNwb25zZS5NZXNzYWdlID8/IHJhd1Jlc3BvbnNlLm1lc3NhZ2UpIHx8IFwiQ291bGQgbm90IGxvYWQgRW50cmEgY29udGV4dC5cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocmF3UmVzcG9uc2UuSXRlbXMpXHJcbiAgICA/IHJhd1Jlc3BvbnNlLkl0ZW1zXHJcbiAgICA6IChBcnJheS5pc0FycmF5KHJhd1Jlc3BvbnNlLml0ZW1zKSA/IHJhd1Jlc3BvbnNlLml0ZW1zIDogW10pO1xyXG4gIGNvbnN0IGZpcnN0ID0gaXRlbXNbMF0gYXMgUmF3RW50cmFDb250ZXh0SXRlbSB8IHVuZGVmaW5lZDtcclxuICBjb25zdCBoZWFkZXIgPSBmaXJzdD8uSGVhZGVyID8/IGZpcnN0Py5oZWFkZXI7XHJcbiAgaWYgKCFmaXJzdCB8fCAhaGVhZGVyKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkNvdWxkIG5vdCBsb2FkIEVudHJhIGNvbnRleHQuXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYXhVc2VySWQgPSBzYWZlVGV4dChoZWFkZXIuQXhVc2VySWQgPz8gaGVhZGVyLmF4VXNlcklkKTtcclxuICBjb25zdCBkZWZhdWx0Q29tcGFueSA9IHNhZmVUZXh0KGhlYWRlci5EZWZhdWx0Q29tcGFueSA/PyBoZWFkZXIuZGVmYXVsdENvbXBhbnkpO1xyXG4gIGNvbnN0IGRlZmF1bHRDdXJyZW5jeUNvZGUgPSBzYWZlVGV4dChoZWFkZXIuRGVmYXVsdEN1cnJlbmN5Q29kZSA/PyBoZWFkZXIuZGVmYXVsdEN1cnJlbmN5Q29kZSk7XHJcbiAgY29uc3QgY29tcGFuaWVzUmF3ID0gQXJyYXkuaXNBcnJheShmaXJzdC5Db21wYW5pZXMpXHJcbiAgICA/IGZpcnN0LkNvbXBhbmllc1xyXG4gICAgOiAoQXJyYXkuaXNBcnJheShmaXJzdC5jb21wYW5pZXMpID8gZmlyc3QuY29tcGFuaWVzIDogW10pO1xyXG4gIGNvbnN0IGNvbXBhbmllcyA9IGNvbXBhbmllc1Jhd1xyXG4gICAgLm1hcCgoaXRlbSkgPT4gbWFwRW50cmFDb250ZXh0Q29tcGFueShpdGVtKSlcclxuICAgIC5maWx0ZXIoKGl0ZW0pOiBpdGVtIGlzIE5vcm1hbGl6ZWRFbnRyYUNvbnRleHRDb21wYW55ID0+ICEhaXRlbSk7XHJcbiAgY29uc3Qgc2VsZWN0ZWRDb21wYW55SWQgPSByZWFkV2luZG93U2VsZWN0ZWRDb21wYW55KCk7XHJcbiAgY29uc3Qgc2VsZWN0ZWRDb21wYW55TWF0Y2ggPSBzZWxlY3RlZENvbXBhbnlJZFxyXG4gICAgPyBjb21wYW5pZXMuZmluZCgoaXRlbSkgPT4gc2FmZVRleHQoaXRlbS5jb21wYW55SWQpLnRvVXBwZXJDYXNlKCkgPT09IHNlbGVjdGVkQ29tcGFueUlkKVxyXG4gICAgOiBudWxsO1xyXG5cclxuICAvLyBOZXZlciBmYWxsIGJhY2sgdG8gYSBkaWZmZXJlbnQgY29tcGFueSB3aGVuIHRoZSB1c2VyIHNlbGVjdGVkIG9uZSBleHBsaWNpdGx5LlxyXG4gIGlmIChzZWxlY3RlZENvbXBhbnlJZCAmJiAhc2VsZWN0ZWRDb21wYW55TWF0Y2gpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFxyXG4gICAgICBpbmRUKFxyXG4gICAgICAgIFwiRXhwZW5zZV9Db250ZXh0X1NlbGVjdGVkQ29tcGFueVVuYXZhaWxhYmxlXCIsXHJcbiAgICAgICAgXCJUaGUgc2VsZWN0ZWQgY29tcGFueSBpcyBubyBsb25nZXIgYXZhaWxhYmxlLiBQbGVhc2UgY2hvb3NlIGl0IGFnYWluIGZyb20gdGhlIG1haW4gbWVudS5cIlxyXG4gICAgICApXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZmFsbGJhY2tDb21wYW55ID0gc2FmZVRleHQoY29tcGFuaWVzLmZpbmQoKGl0ZW0pID0+IGl0ZW0uaXNEZWZhdWx0KT8uY29tcGFueUlkKTtcclxuICBjb25zdCBjb21wYW55SWQgPVxyXG4gICAgc2VsZWN0ZWRDb21wYW55TWF0Y2g/LmNvbXBhbnlJZCB8fCByZXNvbHZlRWZmZWN0aXZlQ29tcGFueUlkKFwiXCIsIGNvbXBhbmllcywgZGVmYXVsdENvbXBhbnkgfHwgZmFsbGJhY2tDb21wYW55KTtcclxuICBjb25zdCBzZWxlY3RlZENvbXBhbnkgPVxyXG4gICAgc2VsZWN0ZWRDb21wYW55TWF0Y2ggfHwgY29tcGFuaWVzLmZpbmQoKGl0ZW0pID0+IHNhZmVUZXh0KGl0ZW0uY29tcGFueUlkKSA9PT0gY29tcGFueUlkKSB8fCBjb21wYW5pZXNbMF07XHJcbiAgY29uc3QgYWxsb3dTZWxmTWFuYWdlbWVudCA9IHNlbGVjdGVkQ29tcGFueT8uYWxsb3dTZWxmTWFuYWdlbWVudCA9PT0gdHJ1ZTtcclxuICBjb25zdCBjcm1Vc2VySWQgPSBzYWZlVGV4dChzZWxlY3RlZENvbXBhbnk/LmNybVVzZXJJZCk7XHJcblxyXG4gIGlmICghYXhVc2VySWQgfHwgIWNvbXBhbnlJZCkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJDb3VsZCBub3QgcmVzb2x2ZSBFbnRyYSBjb21wYW55IGNvbnRleHQuXCIpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHRva2VuOiBcIlwiLFxyXG4gICAgY29tcGFueUlkLFxyXG4gICAgYXhVc2VySWQsXHJcbiAgICBjcm1Vc2VySWQsXHJcbiAgICBkZWZhdWx0Q3VycmVuY3lDb2RlLFxyXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQgPSBhc3luYyAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IFByb21pc2U8RXhwZW5zZUFwaUNvbnRleHQ+ID0+IHtcclxuICBjb25zdCBzZWVkID0gcmVzb2x2ZUF1dGhTZWVkKG9wdGlvbnMpO1xyXG4gIGNvbnN0IGNvbnRleHRLZXkgPSBidWlsZENvbnRleHRLZXkoc2VlZCk7XHJcbiAgY29uc3QgeyBzaWduYWwsIC4uLmJhc2VPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuICBpZiAoY2FjaGVkQ29udGV4dCAmJiBjYWNoZWRDb250ZXh0S2V5ID09PSBjb250ZXh0S2V5KSB7XHJcbiAgICByZXR1cm4gd2FpdEZvckFib3J0YWJsZUV4cGVuc2VSZXN1bHQoUHJvbWlzZS5yZXNvbHZlKGNhY2hlZENvbnRleHQpLCBzaWduYWwpO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFjb250ZXh0UHJvbWlzZSB8fCBjYWNoZWRDb250ZXh0S2V5ICE9PSBjb250ZXh0S2V5KSB7XHJcbiAgICBjYWNoZWRDb250ZXh0S2V5ID0gY29udGV4dEtleTtcclxuICAgIGNvbnN0IHNoYXJlZENvbnRleHRQcm9taXNlID0gKGFzeW5jICgpID0+IHtcclxuICAgICAgY29uc3QgY29udGV4dFBheWxvYWQ6IEVudHJhQ29udGV4dFJlcXVlc3QgPSB7XHJcbiAgICAgICAgYXBwQ29kZTogc2VlZC5hcHBDb2RlLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKHNhZmVUZXh0KHNlZWQuZW50cmFPaWQpKSB7XHJcbiAgICAgICAgY29udGV4dFBheWxvYWQuZW50cmFPaWQgPSBzZWVkLmVudHJhT2lkO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjb250ZXh0UmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFbnRyYUNvbnRleHREdG8+PihcIi9hcGkvYXV0aC9lbnRyYS9jb250ZXh0XCIsIHtcclxuICAgICAgICAuLi5iYXNlT3B0aW9ucyxcclxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgIGhlYWRlcnM6IGJ1aWxkQ29udGV4dEhlYWRlcnMoc2VlZC50b2tlbiwgYmFzZU9wdGlvbnMpLFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGNvbnRleHRQYXlsb2FkKSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCByZXNvbHZlZCA9IHZhbGlkYXRlQ29udGV4dFJlc3BvbnNlKGNvbnRleHRSZXNwb25zZSk7XHJcbiAgICAgIGNvbnN0IG5leHRDb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCA9IHtcclxuICAgICAgICAuLi5yZXNvbHZlZCxcclxuICAgICAgICB0b2tlbjogc2VlZC50b2tlbixcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgd2luZG93Ll9fSU5EX0FMTE9XX1NFTEZfTUFOQUdFTUVOVF9fID0gbmV4dENvbnRleHQuYWxsb3dTZWxmTWFuYWdlbWVudDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY2FjaGVkQ29udGV4dCA9IG5leHRDb250ZXh0O1xyXG4gICAgICByZXR1cm4gbmV4dENvbnRleHQ7XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIGNvbnRleHRQcm9taXNlID0gc2hhcmVkQ29udGV4dFByb21pc2U7XHJcbiAgICB2b2lkIHNoYXJlZENvbnRleHRQcm9taXNlLmZpbmFsbHkoKCkgPT4ge1xyXG4gICAgICBpZiAoY29udGV4dFByb21pc2UgPT09IHNoYXJlZENvbnRleHRQcm9taXNlKSB7XHJcbiAgICAgICAgY29udGV4dFByb21pc2UgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBhd2FpdCB3YWl0Rm9yQWJvcnRhYmxlRXhwZW5zZVJlc3VsdChjb250ZXh0UHJvbWlzZSwgc2lnbmFsKTtcclxufTtcclxuXHJcbi8vIEV4cG9zZXMgcmVzb2x2ZWQgRW50cmEgY29udGV4dCB2YWx1ZXMgbmVlZGVkIGJ5IEdhc3RvcyBVSSBtYW5hZ2VtZW50IHN0YXRlLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZUFwaUNvbnRleHRTbmFwc2hvdCA9IGFzeW5jIChvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogUHJvbWlzZTxFeHBlbnNlQXBpQ29udGV4dFNuYXBzaG90PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIHJldHVybiB7XHJcbiAgICBjb21wYW55SWQ6IHNhZmVUZXh0KGNvbnRleHQuY29tcGFueUlkKS50b1VwcGVyQ2FzZSgpLFxyXG4gICAgYXhVc2VySWQ6IHNhZmVUZXh0KGNvbnRleHQuYXhVc2VySWQpLFxyXG4gICAgY3JtVXNlcklkOiBzYWZlVGV4dChjb250ZXh0LmNybVVzZXJJZCksXHJcbiAgICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBjb250ZXh0LmFsbG93U2VsZk1hbmFnZW1lbnQgPT09IHRydWUsXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlID0gbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVBcGlSZXNwb25zZSA9IG5vcm1hbGl6ZUFwaVJlc3BvbnNlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVUaWNrZXRRdWlja0NyZWF0ZVJlc3BvbnNlID0gbm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlID0gbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlID0gbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2UgPSBub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplVGlja2V0TGlua0xpc3RQYWdlZFJlc3BvbnNlID0gbm9ybWFsaXplVGlja2V0TGlua0xpc3RQYWdlZFJlc3BvbnNlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlID0gbm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplVGlja2V0TGlua0J1bGtSZXNwb25zZSA9IG5vcm1hbGl6ZVRpY2tldExpbmtCdWxrUmVzcG9uc2VUcmFuc2Zvcm07XHJcblxyXG5jb25zdCBsb29rc0xpa2VIdG1sRG9jdW1lbnQgPSAodmFsdWU6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICBjb25zdCByYXcgPSBzYWZlVGV4dCh2YWx1ZSkudG9Mb3dlckNhc2UoKTtcclxuICByZXR1cm4gcmF3LnN0YXJ0c1dpdGgoXCI8IWRvY3R5cGUgaHRtbFwiKSB8fCByYXcuc3RhcnRzV2l0aChcIjxodG1sXCIpO1xyXG59O1xyXG5cclxuY29uc3QgaXNBcGlSb3V0ZVVuYXZhaWxhYmxlID0gKGVycm9yOiB1bmtub3duKTogZXJyb3IgaXMgQXBpRmV0Y2hFcnJvciA9PiB7XHJcbiAgaWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSkgcmV0dXJuIGZhbHNlO1xyXG4gIGlmIChlcnJvci5zdGF0dXMgPT09IDQwNCB8fCBlcnJvci5zdGF0dXMgPT09IDQwNSkgcmV0dXJuIHRydWU7XHJcbiAgcmV0dXJuIGVycm9yLnN0YXR1cyA9PT0gdW5kZWZpbmVkICYmIGxvb2tzTGlrZUh0bWxEb2N1bWVudChlcnJvci5yZXNwb25zZUJvZHkpO1xyXG59O1xyXG5cclxuY29uc3QgaXNTdHJpY3RBcGlSb3V0ZXNFbmFibGVkID0gKCk6IGJvb2xlYW4gPT4ge1xyXG4gIGlmICh0eXBlb2YgcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcyA9PT0gXCJib29sZWFuXCIpIHtcclxuICAgIHJldHVybiBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlYWRSdW50aW1lU3RyaWN0QXBpRmxhZygpO1xyXG59O1xyXG5cclxuY29uc3Qgc2hvdWxkVXNlTGVnYWN5RmFsbGJhY2sgPSAoZXJyb3I6IHVua25vd24pOiBib29sZWFuID0+IHtcclxuICBpZiAoaXNTdHJpY3RBcGlSb3V0ZXNFbmFibGVkKCkpIHJldHVybiBmYWxzZTtcclxuICByZXR1cm4gaXNBcGlSb3V0ZVVuYXZhaWxhYmxlKGVycm9yKTtcclxufTtcclxuXHJcbmNvbnN0IHRvTGVnYWN5TGlzdFJlcXVlc3RQYXlsb2FkID0gKHBheWxvYWQ6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0KSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGZpbHRlcjogc2FmZVRleHQocGF5bG9hZC5maWx0ZXIpLFxyXG4gICAgaG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChwYXlsb2FkLmZpbHRlciksXHJcbiAgICBiaWxsZWRNb2RlOiBwYXlsb2FkLmJpbGxlZE1vZGUgPz8gMixcclxuICAgIGZyb21EYXRlOiBzYWZlVGV4dChwYXlsb2FkLmNyZWF0ZWREYXRlRnJvbSksXHJcbiAgICB0b0RhdGU6IHNhZmVUZXh0KHBheWxvYWQuY3JlYXRlZERhdGVUbyksXHJcbiAgICBwcm9qZWN0SWQ6IHNhZmVUZXh0KHBheWxvYWQucHJvaklkKSxcclxuICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQocGF5bG9hZC5jdXJyZW5jeUNvZGUpLFxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlcihwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyksXG4gICAgcmVpbWJ1cnNhYmxlRXhwZW5zZTogbm9ybWFsaXplRXhwZW5zZVNoZWV0UmVpbWJ1cnNhYmxlKHBheWxvYWQucmVpbWJ1cnNhYmxlRXhwZW5zZSksXG4gICAgaW5jbHVkZVN1Ym9yZGluYXRlczogcGF5bG9hZC5pbmNsdWRlU3Vib3JkaW5hdGVzID09PSB0cnVlLFxuICAgIHBhZ2U6IE51bWJlci5pc0Zpbml0ZShwYXlsb2FkLnBhZ2UpICYmIHBheWxvYWQucGFnZSA+IDAgPyBwYXlsb2FkLnBhZ2UgOiAxLFxyXG4gICAgcGFnZVNpemU6IE51bWJlci5pc0Zpbml0ZShwYXlsb2FkLnBhZ2VTaXplKSAmJiBwYXlsb2FkLnBhZ2VTaXplID4gMCA/IHBheWxvYWQucGFnZVNpemUgOiA1MCxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgbWFwTGVnYWN5TGlzdEl0ZW1Ub0FwaUxpc3RJdGVtID0gKGl0ZW06IExlZ2FjeUV4cGVuc2VMaXN0SXRlbSk6IEV4cGVuc2VTaGVldExpc3RJdGVtRHRvID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgSG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChpdGVtLmhvamFHYXN0b3NJZCksXHJcbiAgICBEZXNjcmlwdGlvbjogc2FmZVRleHQoaXRlbS5kZXNjcmlwdGlvbiksXHJcbiAgICBFeHBlbnNlU2hlZXRTdGF0dXM6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5leHBlbnNlU2hlZXRTdGF0dXMpLFxyXG4gICAgRXN0YWRvQ29tZW50YXJpb3M6IHNhZmVUZXh0KGl0ZW0uZXN0YWRvQ29tZW50YXJpb3MpIHx8IG51bGwsXHJcbiAgICBVc2VySWQ6IHNhZmVUZXh0KGl0ZW0udXNlcklkKSB8fCBudWxsLFxuICAgIFVzZXJOYW1lOiBzYWZlVGV4dChpdGVtLnVzZXJOYW1lKSB8fCBudWxsLFxuICAgIE93bmVyQXhVc2VySWQ6IHNhZmVUZXh0KGl0ZW0ub3duZXJBeFVzZXJJZCkgfHwgbnVsbCxcbiAgICBPd25lck5hbWU6IHNhZmVUZXh0KGl0ZW0ub3duZXJOYW1lKSB8fCBudWxsLFxuICAgIFZvdWNoZXI6IHNhZmVUZXh0KGl0ZW0udm91Y2hlciksXG4gICAgUHJvaklkOiBzYWZlVGV4dChpdGVtLnByb2pJZCksXHJcbiAgICBDdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGl0ZW0uY3VycmVuY3lDb2RlKSxcclxuICAgIFRvdGFsQW1vdW50OiB0b051bGxhYmxlTnVtYmVyKGl0ZW0udG90YWxBbW91bnQgPz8gaXRlbS50b3RhbEFtb3VudE1TVCksXG4gICAgRXhjaFJhdGU6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5leGNoUmF0ZSksXG4gICAgRXhjaGFuZ2VSYXRlTW9kZTogdG9OdWxsYWJsZU51bWJlcihpdGVtLmV4Y2hhbmdlUmF0ZU1vZGUpLFxuICAgIFJlaW1idXJzYWJsZUV4cGVuc2U6IG5vcm1hbGl6ZUV4cGVuc2VTaGVldFJlaW1idXJzYWJsZShpdGVtLnJlaW1idXJzYWJsZUV4cGVuc2UpLFxuICAgIENyZWF0ZWREYXRlOiBzYWZlVGV4dChpdGVtLmNyZWF0ZWREYXRlKSB8fCBudWxsLFxuICB9O1xufTtcblxyXG5jb25zdCBtYXBMZWdhY3lMaXN0UmVzcG9uc2UgPSAoXHJcbiAgbGVnYWN5OiBMZWdhY3lFeHBlbnNlTGlzdFJlc3BvbnNlLFxyXG4gIGZhbGxiYWNrUGFnZTogbnVtYmVyLFxyXG4gIGZhbGxiYWNrUGFnZVNpemU6IG51bWJlclxyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldExpc3RJdGVtRHRvPiA9PiB7XHJcbiAgY29uc3QgbGVnYWN5SXRlbXMgPSBBcnJheS5pc0FycmF5KGxlZ2FjeT8uaXRlbXMpID8gbGVnYWN5Lml0ZW1zIDogW107XHJcbiAgY29uc3QgbWFwcGVkSXRlbXMgPSBsZWdhY3lJdGVtcy5tYXAoKGVudHJ5KSA9PiBtYXBMZWdhY3lMaXN0SXRlbVRvQXBpTGlzdEl0ZW0oZW50cnkpKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIFN1Y2Nlc3M6IGxlZ2FjeS5zdWNjZXNzICE9PSBmYWxzZSxcclxuICAgIE1lc3NhZ2U6IHNhZmVUZXh0KGxlZ2FjeS5tZXNzYWdlKSB8fCBcIk9LXCIsXHJcbiAgICBUb3RhbDogdG9OdWxsYWJsZU51bWJlcihsZWdhY3kudG90YWwpID8/IG1hcHBlZEl0ZW1zLmxlbmd0aCxcclxuICAgIFBhZ2U6IHRvTnVsbGFibGVOdW1iZXIobGVnYWN5LnBhZ2UpID8/IGZhbGxiYWNrUGFnZSxcclxuICAgIFBhZ2VTaXplOiB0b051bGxhYmxlTnVtYmVyKGxlZ2FjeS5wYWdlU2l6ZSkgPz8gZmFsbGJhY2tQYWdlU2l6ZSxcclxuICAgIEl0ZW1zOiBtYXBwZWRJdGVtcyxcclxuICAgIFRyYWNlSWQ6IHVuZGVmaW5lZCxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gU2V0cyBydW50aW1lIGF1dGggaW5wdXRzIHVzZWQgdG8gcmVzb2x2ZSBFbnRyYSBjb250ZXh0IGFuZCBtYW5kYXRvcnkgZXhwZW5zZSBoZWFkZXJzLlxyXG5leHBvcnQgY29uc3QgY29uZmlndXJlRXhwZW5zZUFwaUF1dGggPSAoc2VlZDogUGFydGlhbDxFeHBlbnNlQXBpQXV0aFNlZWQ+KTogdm9pZCA9PiB7XHJcbiAgY29uc3Qgc3RyaWN0RnJvbVNlZWQgPSB0b0ZsYWdCb29sKHNlZWQuc3RyaWN0QXBpUm91dGVzKTtcclxuICBjb25zdCBzdHJpY3RGcm9tUnVudGltZSA9XHJcbiAgICB0eXBlb2YgcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcyA9PT0gXCJib29sZWFuXCIgPyBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzIDogcmVhZFJ1bnRpbWVTdHJpY3RBcGlGbGFnKCk7XHJcblxyXG4gIHJ1bnRpbWVBdXRoU2VlZCA9IHtcclxuICAgIC4uLnJ1bnRpbWVBdXRoU2VlZCxcclxuICAgIHRva2VuOiBzYWZlVGV4dChzZWVkLnRva2VuIHx8IHJ1bnRpbWVBdXRoU2VlZC50b2tlbiksXHJcbiAgICBlbnRyYU9pZDogc2FmZVRleHQoc2VlZC5lbnRyYU9pZCB8fCBydW50aW1lQXV0aFNlZWQuZW50cmFPaWQpLFxyXG4gICAgYXBwQ29kZTogc2FmZVRleHQoc2VlZC5hcHBDb2RlIHx8IHJ1bnRpbWVBdXRoU2VlZC5hcHBDb2RlIHx8IERFRkFVTFRfQVBQX0NPREUpLFxyXG4gICAgc3RyaWN0QXBpUm91dGVzOiBzdHJpY3RGcm9tU2VlZCA/PyBzdHJpY3RGcm9tUnVudGltZSxcclxuICB9O1xyXG5cclxuICBjYWNoZWRDb250ZXh0ID0gbnVsbDtcclxuICBjYWNoZWRDb250ZXh0S2V5ID0gXCJcIjtcclxuICBjb250ZXh0UHJvbWlzZSA9IG51bGw7XHJcbiAgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuY2xlYXIoKTtcclxuICBwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5jbGVhcigpO1xyXG59O1xyXG5cclxuLy8gTWFwcyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2xpc3QgaXRlbSBjb250cmFjdCB0byBsaXN0IGNhcmQgVUkgbW9kZWwuXHJcbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZCA9IG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkQ29yZTtcclxuXHJcbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfSBoZWFkZXIgY29udHJhY3QgdG8gVUkgbW9kZWwuXHJcbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRIZWFkZXIgPSBtYXBFeHBlbnNlU2hlZXRIZWFkZXJDb3JlO1xyXG5cclxuLy8gTWFwcyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9IGxpbmUgY29udHJhY3QgdG8gVUkgbW9kZWwuXHJcbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRMaW5lID0gbWFwRXhwZW5zZVNoZWV0TGluZUNvcmU7XHJcblxyXG5leHBvcnQgdHlwZSBFeHBlbnNlU2hlZXRMaXN0RmV0Y2hDYXB0dXJlID0ge1xyXG4gIHJlcXVlc3Q6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0O1xyXG4gIHJlc3BvbnNlOiBFeHBlbnNlU2hlZXRMaXN0UmVzcG9uc2VFbnZlbG9wZTtcclxuICBheFVzZXJJZE92ZXJyaWRlOiBzdHJpbmcgfCBudWxsO1xyXG4gIHNvdXJjZTogXCJhcGlcIiB8IFwibGVnYWN5XCI7XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBFeHBlbnNlU2hlZXRMaXN0RmV0Y2hPcHRpb25zID0gQXBpRmV0Y2hPcHRpb25zICYge1xyXG4gIGF4VXNlcklkT3ZlcnJpZGU/OiBzdHJpbmc7XHJcbiAgb25SZXF1ZXN0UHJlcGFyZWQ/OiAocmVxdWVzdDogRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3QpID0+IHZvaWQ7XHJcbiAgb25DYXB0dXJlPzogKGNhcHR1cmU6IEV4cGVuc2VTaGVldExpc3RGZXRjaENhcHR1cmUpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBFeHBlbnNlVGlja2V0TGlzdEZldGNoT3B0aW9ucyA9IEFwaUZldGNoT3B0aW9ucyAmIHtcclxuICBheFVzZXJJZE92ZXJyaWRlPzogc3RyaW5nO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgRXhwZW5zZVNoZWV0TGlzdFNvdXJjZUpzb25PcHRpb25zID0gQXBpRmV0Y2hPcHRpb25zICYge1xyXG4gIGF4VXNlcklkT3ZlcnJpZGU/OiBzdHJpbmc7XHJcbiAgc2VlZFJlc3BvbnNlPzogRXhwZW5zZVNoZWV0TGlzdFJlc3BvbnNlRW52ZWxvcGUgfCBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRUaWNrZXRMaXN0SGVhZGVycyA9IChcclxuICBjb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCxcclxuICBvcHRpb25zOiBBcGlGZXRjaE9wdGlvbnMgfCB1bmRlZmluZWQsXHJcbiAgYXhVc2VySWRPdmVycmlkZTogc3RyaW5nIHwgdW5kZWZpbmVkXHJcbik6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPT4ge1xyXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMoYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlLCBmYWxzZSkpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRPdmVycmlkZUF4VXNlcklkID0gbm9ybWFsaXplQXhVc2VySWRIZWFkZXIoYXhVc2VySWRPdmVycmlkZSk7XHJcbiAgY29uc3QgcmVzb2x2ZWRBeFVzZXJJZCA9IHNhZmVUZXh0KG5vcm1hbGl6ZWRPdmVycmlkZUF4VXNlcklkIHx8IGNvbnRleHQuYXhVc2VySWQpO1xyXG4gIGlmIChyZXNvbHZlZEF4VXNlcklkKSB7XHJcbiAgICBoZWFkZXJzW1wiWC1JTkQtQXhVc2VySWRcIl0gPSByZXNvbHZlZEF4VXNlcklkO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIlgtSU5ELUF4VXNlcklkXCIpO1xyXG4gIH1cclxuICByZXR1cm4gaGVhZGVycztcclxufTtcclxuXHJcbi8vIExvYWRzIHRoZSBleHBlbnNlIHNoZWV0IGxpc3QgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2xpc3QuXHJcbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldExpc3QgPSBhc3luYyAoXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEV4cGVuc2VTaGVldExpc3RGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldExpc3RJdGVtRHRvPj4gPT4ge1xyXG4gIGNvbnN0IHsgYXhVc2VySWRPdmVycmlkZSwgb25SZXF1ZXN0UHJlcGFyZWQsIG9uQ2FwdHVyZSwgLi4uYmFzZU9wdGlvbnMgfSA9IG9wdGlvbnMgfHwge307XHJcbiAgY29uc3QgcmF3Q3JlYXRlZERhdGVGcm9tID0gc2FmZVRleHQocGF5bG9hZD8uY3JlYXRlZERhdGVGcm9tKTtcclxuICBjb25zdCByYXdDcmVhdGVkRGF0ZVRvID0gc2FmZVRleHQocGF5bG9hZD8uY3JlYXRlZERhdGVUbyk7XHJcbiAgY29uc3QgY3JlYXRlZERhdGVGcm9tID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlKHJhd0NyZWF0ZWREYXRlRnJvbSk7XHJcbiAgY29uc3QgY3JlYXRlZERhdGVUbyA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdDcmVhdGVkRGF0ZVRvKTtcclxuXHJcbiAgaWYgKHJhd0NyZWF0ZWREYXRlRnJvbSAmJiAhY3JlYXRlZERhdGVGcm9tKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICB9XHJcbiAgaWYgKHJhd0NyZWF0ZWREYXRlVG8gJiYgIWNyZWF0ZWREYXRlVG8pIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0ID0ge1xyXG4gICAgLi4ucGF5bG9hZCxcclxuICAgIGNyZWF0ZWREYXRlRnJvbSxcbiAgICBjcmVhdGVkRGF0ZVRvLFxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlcihwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyksXG4gICAgcmVpbWJ1cnNhYmxlRXhwZW5zZTogbm9ybWFsaXplRXhwZW5zZVNoZWV0UmVpbWJ1cnNhYmxlKHBheWxvYWQucmVpbWJ1cnNhYmxlRXhwZW5zZSksXG4gICAgaW5jbHVkZVN1Ym9yZGluYXRlczogcGF5bG9hZC5pbmNsdWRlU3Vib3JkaW5hdGVzID09PSB0cnVlLFxuICB9O1xuICBjb25zdCBzZXJpYWxpemVkUGF5bG9hZCA9IGNsb25lSnNvbkNvbXBhdGlibGVWYWx1ZShzYWZlUGF5bG9hZCk7XHJcblxyXG4gIG9uUmVxdWVzdFByZXBhcmVkPy4oc2VyaWFsaXplZFBheWxvYWQpO1xyXG5cclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQoYmFzZU9wdGlvbnMpO1xyXG4gIGNvbnN0IGxpc3RIZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgYmFzZU9wdGlvbnMsIHRydWUsIGZhbHNlKSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZE92ZXJyaWRlQXhVc2VySWQgPSBub3JtYWxpemVBeFVzZXJJZEhlYWRlcihheFVzZXJJZE92ZXJyaWRlKTtcclxuICBjb25zdCByZXNvbHZlZEF4VXNlcklkID0gc2FmZVRleHQobm9ybWFsaXplZE92ZXJyaWRlQXhVc2VySWQgfHwgY29udGV4dC5heFVzZXJJZCk7XHJcbiAgaWYgKHJlc29sdmVkQXhVc2VySWQpIHtcclxuICAgIGxpc3RIZWFkZXJzW1wiWC1JTkQtQXhVc2VySWRcIl0gPSByZXNvbHZlZEF4VXNlcklkO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShsaXN0SGVhZGVycywgXCJYLUlORC1BeFVzZXJJZFwiKTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldExpc3RJdGVtRHRvPj4oXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL2xpc3RcIiwge1xyXG4gICAgICAuLi5iYXNlT3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczogbGlzdEhlYWRlcnMsXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcclxuICAgIH0pO1xyXG5cclxuICAgIG9uQ2FwdHVyZT8uKHtcclxuICAgICAgcmVxdWVzdDogc2VyaWFsaXplZFBheWxvYWQsXHJcbiAgICAgIHJlc3BvbnNlOiBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUocmVzcG9uc2UpLFxyXG4gICAgICBheFVzZXJJZE92ZXJyaWRlOiBub3JtYWxpemVkT3ZlcnJpZGVBeFVzZXJJZCB8fCBudWxsLFxyXG4gICAgICBzb3VyY2U6IFwiYXBpXCIsXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBpZiAoIXNob3VsZFVzZUxlZ2FjeUZhbGxiYWNrKGVycm9yKSkge1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBsZWdhY3lSZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxMZWdhY3lFeHBlbnNlTGlzdFJlc3BvbnNlPihcIi9HYXN0b3MvTGlzdEV4cGVuc2VTaGVldHNcIiwge1xyXG4gICAgICAuLi5iYXNlT3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIC4uLnNhbml0aXplSGVhZGVycyhiYXNlT3B0aW9ucz8uaGVhZGVycyksXHJcbiAgICAgICAgLi4uSlNPTl9IRUFERVJTLFxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh0b0xlZ2FjeUxpc3RSZXF1ZXN0UGF5bG9hZChzYWZlUGF5bG9hZCkpLFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgbWFwcGVkID0gbWFwTGVnYWN5TGlzdFJlc3BvbnNlKFxyXG4gICAgICBsZWdhY3lSZXNwb25zZSxcclxuICAgICAgTnVtYmVyLmlzRmluaXRlKHNhZmVQYXlsb2FkLnBhZ2UpICYmIHNhZmVQYXlsb2FkLnBhZ2UgPiAwID8gc2FmZVBheWxvYWQucGFnZSA6IDEsXHJcbiAgICAgIE51bWJlci5pc0Zpbml0ZShzYWZlUGF5bG9hZC5wYWdlU2l6ZSkgJiYgc2FmZVBheWxvYWQucGFnZVNpemUgPiAwID8gc2FmZVBheWxvYWQucGFnZVNpemUgOiA1MFxyXG4gICAgKTtcclxuXHJcbiAgICBvbkNhcHR1cmU/Lih7XHJcbiAgICAgIHJlcXVlc3Q6IHNlcmlhbGl6ZWRQYXlsb2FkLFxyXG4gICAgICByZXNwb25zZTogY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlKG1hcHBlZCksXHJcbiAgICAgIGF4VXNlcklkT3ZlcnJpZGU6IG5vcm1hbGl6ZWRPdmVycmlkZUF4VXNlcklkIHx8IG51bGwsXHJcbiAgICAgIHNvdXJjZTogXCJsZWdhY3lcIixcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZShtYXBwZWQpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVBvc2l0aXZlSW50ZWdlciA9ICh2YWx1ZTogdW5rbm93biwgZmFsbGJhY2tWYWx1ZTogbnVtYmVyKTogbnVtYmVyID0+IHtcclxuICBjb25zdCBwYXJzZWRWYWx1ZSA9IE51bWJlcih2YWx1ZSk7XHJcbiAgaWYgKE51bWJlci5pc0Zpbml0ZShwYXJzZWRWYWx1ZSkgJiYgcGFyc2VkVmFsdWUgPiAwKSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihwYXJzZWRWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZmFsbGJhY2tWYWx1ZTtcclxufTtcclxuXHJcbi8vIFJlYnVpbGRzIG9uZSBmdWxsIGxpc3QgZW52ZWxvcGUgZm9yIHRoZSBhc3Npc3RhbnQgYnkgbG9hZGluZyBldmVyeSBwYWdlIG9mIHRoZSBhY3RpdmUgcXVlcnkuXHJcbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldExpc3RTb3VyY2VKc29uID0gYXN5bmMgKFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBFeHBlbnNlU2hlZXRMaXN0U291cmNlSnNvbk9wdGlvbnNcclxuKTogUHJvbWlzZTxFeHBlbnNlU2hlZXRMaXN0UmVzcG9uc2VFbnZlbG9wZT4gPT4ge1xyXG4gIGNvbnN0IHsgc2VlZFJlc3BvbnNlLCAuLi5iYXNlT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcclxuICBjb25zdCBmYWxsYmFja1BhZ2UgPSBub3JtYWxpemVQb3NpdGl2ZUludGVnZXIocGF5bG9hZD8ucGFnZSwgMSk7XHJcbiAgY29uc3QgZmFsbGJhY2tQYWdlU2l6ZSA9IG5vcm1hbGl6ZVBvc2l0aXZlSW50ZWdlcihwYXlsb2FkPy5wYWdlU2l6ZSwgNTApO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRTZWVkUmVzcG9uc2UgPSBzZWVkUmVzcG9uc2UgPyBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZShjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUoc2VlZFJlc3BvbnNlKSkgOiBudWxsO1xyXG4gIGNvbnN0IGluaXRpYWxSZXNwb25zZSA9IG5vcm1hbGl6ZWRTZWVkUmVzcG9uc2UgPz8gKGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0TGlzdChwYXlsb2FkLCBiYXNlT3B0aW9ucykpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRJbml0aWFsUmVzcG9uc2UgPSBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZShjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUoaW5pdGlhbFJlc3BvbnNlKSk7XHJcblxyXG4gIGlmIChub3JtYWxpemVkSW5pdGlhbFJlc3BvbnNlLlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcclxuICAgICAgc2FmZVRleHQobm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5NZXNzYWdlKSB8fCBcIkNvdWxkIG5vdCBsb2FkIHRoZSBmdWxsIGV4cGVuc2Ugc2hlZXQgcXVlcnkuXCJcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB0b3RhbFJlY29yZHNSYXcgPSBOdW1iZXIobm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5Ub3RhbCk7XHJcbiAgY29uc3QgdG90YWxSZWNvcmRzID1cclxuICAgIE51bWJlci5pc0Zpbml0ZSh0b3RhbFJlY29yZHNSYXcpICYmIHRvdGFsUmVjb3Jkc1JhdyA+PSAwXHJcbiAgICAgID8gTWF0aC5mbG9vcih0b3RhbFJlY29yZHNSYXcpXHJcbiAgICAgIDogbm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5JdGVtcy5sZW5ndGg7XHJcbiAgY29uc3QgZWZmZWN0aXZlUGFnZVNpemUgPSBub3JtYWxpemVQb3NpdGl2ZUludGVnZXIobm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5QYWdlU2l6ZSwgZmFsbGJhY2tQYWdlU2l6ZSk7XHJcbiAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGgubWF4KDEsIE1hdGguY2VpbCh0b3RhbFJlY29yZHMgLyBNYXRoLm1heCgxLCBlZmZlY3RpdmVQYWdlU2l6ZSkpKTtcclxuICBjb25zdCBjdXJyZW50UGFnZSA9IE1hdGgubWluKFxyXG4gICAgdG90YWxQYWdlcyxcclxuICAgIG5vcm1hbGl6ZVBvc2l0aXZlSW50ZWdlcihub3JtYWxpemVkSW5pdGlhbFJlc3BvbnNlLlBhZ2UgPz8gZmFsbGJhY2tQYWdlLCBmYWxsYmFja1BhZ2UpXHJcbiAgKTtcclxuXHJcbiAgaWYgKHRvdGFsUGFnZXMgPD0gMSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLi4ubm9ybWFsaXplZEluaXRpYWxSZXNwb25zZSxcclxuICAgICAgVG90YWw6IHRvdGFsUmVjb3JkcyxcclxuICAgICAgUGFnZTogMSxcclxuICAgICAgUGFnZVNpemU6IGVmZmVjdGl2ZVBhZ2VTaXplLFxyXG4gICAgICBJdGVtczogY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlKG5vcm1hbGl6ZWRJbml0aWFsUmVzcG9uc2UuSXRlbXMpLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGl0ZW1zQnlQYWdlID0gbmV3IE1hcDxudW1iZXIsIEV4cGVuc2VTaGVldExpc3RJdGVtRHRvW10+KCk7XHJcbiAgaXRlbXNCeVBhZ2Uuc2V0KGN1cnJlbnRQYWdlLCBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUobm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5JdGVtcykpO1xyXG5cclxuICBmb3IgKGxldCBwYWdlTnVtYmVyID0gMTsgcGFnZU51bWJlciA8PSB0b3RhbFBhZ2VzOyBwYWdlTnVtYmVyICs9IDEpIHtcclxuICAgIGlmIChwYWdlTnVtYmVyID09PSBjdXJyZW50UGFnZSkge1xyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYWdlUmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldExpc3QoXHJcbiAgICAgIHtcclxuICAgICAgICAuLi5wYXlsb2FkLFxyXG4gICAgICAgIHBhZ2U6IHBhZ2VOdW1iZXIsXHJcbiAgICAgICAgcGFnZVNpemU6IGVmZmVjdGl2ZVBhZ2VTaXplLFxyXG4gICAgICB9LFxyXG4gICAgICBiYXNlT3B0aW9uc1xyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocGFnZVJlc3BvbnNlLlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFxyXG4gICAgICAgIHNhZmVUZXh0KHBhZ2VSZXNwb25zZS5NZXNzYWdlKSB8fCBgQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBwYWdlICR7cGFnZU51bWJlcn0uYFxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGl0ZW1zQnlQYWdlLnNldChwYWdlTnVtYmVyLCBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUocGFnZVJlc3BvbnNlLkl0ZW1zKSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhbGxJdGVtczogRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG9bXSA9IFtdO1xyXG4gIGZvciAobGV0IHBhZ2VOdW1iZXIgPSAxOyBwYWdlTnVtYmVyIDw9IHRvdGFsUGFnZXM7IHBhZ2VOdW1iZXIgKz0gMSkge1xyXG4gICAgY29uc3QgcGFnZUl0ZW1zID0gaXRlbXNCeVBhZ2UuZ2V0KHBhZ2VOdW1iZXIpO1xyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHBhZ2VJdGVtcykgfHwgcGFnZUl0ZW1zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuXHJcbiAgICBhbGxJdGVtcy5wdXNoKC4uLnBhZ2VJdGVtcyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgLi4ubm9ybWFsaXplZEluaXRpYWxSZXNwb25zZSxcclxuICAgIFRvdGFsOiB0b3RhbFJlY29yZHMsXHJcbiAgICBQYWdlOiAxLFxyXG4gICAgUGFnZVNpemU6IGVmZmVjdGl2ZVBhZ2VTaXplLFxyXG4gICAgSXRlbXM6IGFsbEl0ZW1zLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBMb2FkcyBvbmUgZXhwZW5zZSBzaGVldCBkZXRhaWwgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9LlxyXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwgPSBhc3luYyAoXHJcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0RGV0YWlsRHRvPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlU2hlZXRJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXREZXRhaWxEdG8+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy8ke3NhZmVTaGVldElkfWAsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBSZWFkcyBhdmFpbGFibGUgY3VycmVuY2llcyBmcm9tIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvY3VycmVuY2llcy5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTaGVldEN1cnJlbmNpZXMgPSBhc3luYyAoXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+PiA9PiB7XHJcbiAgbGV0IGNvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0IHwgbnVsbCA9IG51bGw7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgaWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSkge1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGNvbXBhbnlJZCA9IHNhZmVUZXh0KGNvbnRleHQ/LmNvbXBhbnlJZCB8fCByZWFkV2luZG93U2VsZWN0ZWRDb21wYW55KCkpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3QgY2FjaGVLZXkgPSBjb21wYW55SWQgfHwgXCItXCI7XHJcblxyXG4gIGlmIChjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcy5oYXMoY2FjaGVLZXkpKSB7XHJcbiAgICByZXR1cm4gY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuZ2V0KGNhY2hlS2V5KSBhcyBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPjtcclxuICB9XHJcblxyXG4gIGlmIChwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5oYXMoY2FjaGVLZXkpKSB7XHJcbiAgICByZXR1cm4gcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuZ2V0KGNhY2hlS2V5KSBhcyBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+PjtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlcXVlc3RQcm9taXNlID0gKGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XHJcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIkF1dGhvcml6YXRpb25cIik7XHJcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIlgtSU5ELUF4VXNlcklkXCIpO1xyXG5cclxuICAgIGlmIChjb21wYW55SWQpIHtcclxuICAgICAgaGVhZGVyc1tcIlgtSU5ELUNvbXBhbnlcIl0gPSBjb21wYW55SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9jdXJyZW5jaWVzXCIsIHtcclxuICAgICAgICAuLi5vcHRpb25zLFxyXG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICBoZWFkZXJzLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRSZXNwb25zZSA9IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgICAgIGlmIChub3JtYWxpemVkUmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgIGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLnNldChjYWNoZUtleSwgbm9ybWFsaXplZFJlc3BvbnNlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRSZXNwb25zZTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGlmICghc2hvdWxkVXNlTGVnYWN5RmFsbGJhY2soZXJyb3IpKSB7XHJcbiAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGxlZ2FjeUxpc3RSZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxMZWdhY3lFeHBlbnNlTGlzdFJlc3BvbnNlPihcIi9HYXN0b3MvTGlzdEV4cGVuc2VTaGVldHNcIiwge1xyXG4gICAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAuLi5zYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyksXHJcbiAgICAgICAgICAuLi5KU09OX0hFQURFUlMsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICBmaWx0ZXI6IFwiXCIsXHJcbiAgICAgICAgICBob2phR2FzdG9zSWQ6IFwiXCIsXHJcbiAgICAgICAgICBiaWxsZWRNb2RlOiAyLFxyXG4gICAgICAgICAgZnJvbURhdGU6IFwiXCIsXHJcbiAgICAgICAgICB0b0RhdGU6IFwiXCIsXHJcbiAgICAgICAgICBwcm9qZWN0SWQ6IFwiXCIsXHJcbiAgICAgICAgICBjdXJyZW5jeUNvZGU6IFwiXCIsXHJcbiAgICAgICAgICBwYWdlOiAxLFxyXG4gICAgICAgICAgcGFnZVNpemU6IDIwMCxcclxuICAgICAgICB9KSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBzZWVuQ29kZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcclxuICAgICAgY29uc3Qgc291cmNlSXRlbXMgPSBBcnJheS5pc0FycmF5KGxlZ2FjeUxpc3RSZXNwb25zZS5pdGVtcykgPyBsZWdhY3lMaXN0UmVzcG9uc2UuaXRlbXMgOiBbXTtcclxuICAgICAgY29uc3QgZmFsbGJhY2tJdGVtczogRXhwZW5zZVNoZWV0Q3VycmVuY3lEdG9bXSA9IHNvdXJjZUl0ZW1zXHJcbiAgICAgICAgLm1hcCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5LmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSlcclxuICAgICAgICAuZmlsdGVyKChjb2RlKSA9PiAhIWNvZGUpXHJcbiAgICAgICAgLmZpbHRlcigoY29kZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHNlZW5Db2Rlcy5oYXMoY29kZSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIHNlZW5Db2Rlcy5hZGQoY29kZSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5tYXAoKGNvZGUpID0+ICh7XHJcbiAgICAgICAgICBDdXJyZW5jeUNvZGU6IGNvZGUsXHJcbiAgICAgICAgICBDdXJyZW5jeUNvZGVJU086IGNvZGUsXHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgY29uc3QgZmFsbGJhY2tSZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4gPSB7XHJcbiAgICAgICAgU3VjY2VzczogbGVnYWN5TGlzdFJlc3BvbnNlLnN1Y2Nlc3MgIT09IGZhbHNlLFxyXG4gICAgICAgIE1lc3NhZ2U6IHNhZmVUZXh0KGxlZ2FjeUxpc3RSZXNwb25zZS5tZXNzYWdlKSB8fCBcIk9LXCIsXHJcbiAgICAgICAgVG90YWw6IGZhbGxiYWNrSXRlbXMubGVuZ3RoLFxyXG4gICAgICAgIFBhZ2U6IDEsXHJcbiAgICAgICAgUGFnZVNpemU6IGZhbGxiYWNrSXRlbXMubGVuZ3RoLFxyXG4gICAgICAgIEl0ZW1zOiBmYWxsYmFja0l0ZW1zLFxyXG4gICAgICAgIFRyYWNlSWQ6IHVuZGVmaW5lZCxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRGYWxsYmFjayA9IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZShmYWxsYmFja1Jlc3BvbnNlKTtcclxuICAgICAgaWYgKG5vcm1hbGl6ZWRGYWxsYmFjay5TdWNjZXNzKSB7XHJcbiAgICAgICAgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuc2V0KGNhY2hlS2V5LCBub3JtYWxpemVkRmFsbGJhY2spO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbm9ybWFsaXplZEZhbGxiYWNrO1xyXG4gICAgfVxyXG4gIH0pKCk7XHJcblxyXG4gIHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLnNldChjYWNoZUtleSwgcmVxdWVzdFByb21pc2UpO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gYXdhaXQgcmVxdWVzdFByb21pc2U7XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLmRlbGV0ZShjYWNoZUtleSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gUmVhZHMgYXZhaWxhYmxlIHN1Ym9yZGluYXRlcyBmcm9tIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvc3Vib3JkaW5hdGVzLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVzID0gYXN5bmMgKFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICAvLyBTdWJvcmRpbmF0ZXMgbXVzdCBhbHdheXMgcmVzb2x2ZSBmcm9tIHRoZSBsb2dnZWQgY29udGV4dCB1c2VyLCBub3QgZnJvbSBhY3RpbmctdXNlciBvdmVycmlkZXMuXHJcbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIGZhbHNlLCBmYWxzZSkpO1xyXG4gIGNvbnN0IGNvbnRleHRBeFVzZXJJZCA9IHNhZmVUZXh0KGNvbnRleHQuYXhVc2VySWQpO1xyXG4gIGlmIChjb250ZXh0QXhVc2VySWQpIHtcclxuICAgIGhlYWRlcnNbXCJYLUlORC1BeFVzZXJJZFwiXSA9IGNvbnRleHRBeFVzZXJJZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8dW5rbm93bj4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9zdWJvcmRpbmF0ZXNcIiwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgIGhlYWRlcnMsXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIEV4cG9zZXMgdGhlIGRlZmF1bHQgY3VycmVuY3kgcmVzb2x2ZWQgZnJvbSBFbnRyYSBjb250ZXh0IGZvciBpbml0aWFsIHNlbGVjdGlvbnMuXHJcbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlID0gYXN5bmMgKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgICByZXR1cm4gc2FmZVRleHQoY29udGV4dC5kZWZhdWx0Q3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gUmVhZHMgZXhjaGFuZ2UgcmF0ZSBmcm9tIC9hcGkvc3lzdGVtL2V4Y2hhbmdlLXJhdGUuXHJcbmV4cG9ydCBjb25zdCBnZXRFeGNoYW5nZVJhdGUgPSBhc3luYyAoXHJcbiAgYmFzZUN1cnJlbmN5OiBzdHJpbmcsXHJcbiAgdGFyZ2V0Q3VycmVuY3k6IHN0cmluZyxcclxuICBkYXRlPzogc3RyaW5nLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeGNoYW5nZVJhdGVEdG8+PiA9PiB7XHJcbiAgY29uc3QgdG9rZW4gPSByZXNvbHZlQXV0aFRva2VuKG9wdGlvbnMpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kgPSBzYWZlVGV4dChiYXNlQ3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFRhcmdldEN1cnJlbmN5ID0gc2FmZVRleHQodGFyZ2V0Q3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZERhdGUgPSBzYWZlVGV4dChkYXRlKTtcclxuICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcclxuXHJcbiAgcXVlcnkuc2V0KFwiYmFzZUN1cnJlbmN5XCIsIG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kpO1xyXG4gIHF1ZXJ5LnNldChcInRhcmdldEN1cnJlbmN5XCIsIG5vcm1hbGl6ZWRUYXJnZXRDdXJyZW5jeSk7XHJcbiAgaWYgKG5vcm1hbGl6ZWREYXRlKSB7XHJcbiAgICBxdWVyeS5zZXQoXCJkYXRlXCIsIG5vcm1hbGl6ZWREYXRlKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XHJcbiAgaWYgKHRva2VuKSB7XHJcbiAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7dG9rZW59YDtcclxuICB9XHJcblxyXG4gIHJldHVybiBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhjaGFuZ2VSYXRlRHRvPj4oYC9hcGkvc3lzdGVtL2V4Y2hhbmdlLXJhdGU/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICBoZWFkZXJzLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gUmVhZHMgZXhjaGFuZ2UgcmF0ZSBmcm9tIC9hcGkvc3lzdGVtL2V4Y2hhbmdlLXJhdGUvcHVibGljLWRpcmVjdC5cclxuZXhwb3J0IGNvbnN0IGdldEV4Y2hhbmdlUmF0ZVB1YmxpY0RpcmVjdCA9IGFzeW5jIChcclxuICBiYXNlQ3VycmVuY3k6IHN0cmluZyxcclxuICB0YXJnZXRDdXJyZW5jeTogc3RyaW5nLFxyXG4gIGRhdGU/OiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4Y2hhbmdlUmF0ZUR0bz4+ID0+IHtcclxuICBjb25zdCB0b2tlbiA9IHJlc29sdmVBdXRoVG9rZW4ob3B0aW9ucyk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSA9IHNhZmVUZXh0KGJhc2VDdXJyZW5jeSkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBub3JtYWxpemVkVGFyZ2V0Q3VycmVuY3kgPSBzYWZlVGV4dCh0YXJnZXRDdXJyZW5jeSkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBub3JtYWxpemVkRGF0ZSA9IHNhZmVUZXh0KGRhdGUpO1xyXG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xyXG5cclxuICBxdWVyeS5zZXQoXCJiYXNlQ3VycmVuY3lcIiwgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSk7XHJcbiAgcXVlcnkuc2V0KFwidGFyZ2V0Q3VycmVuY3lcIiwgbm9ybWFsaXplZFRhcmdldEN1cnJlbmN5KTtcclxuICBpZiAobm9ybWFsaXplZERhdGUpIHtcclxuICAgIHF1ZXJ5LnNldChcImRhdGVcIiwgbm9ybWFsaXplZERhdGUpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcclxuICBpZiAodG9rZW4pIHtcclxuICAgIGhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeGNoYW5nZVJhdGVEdG8+PihgL2FwaS9zeXN0ZW0vZXhjaGFuZ2UtcmF0ZS9wdWJsaWMtZGlyZWN0PyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgaGVhZGVycyxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIFJlYWRzIGZ1ZWwgcHJpY2UgcGVyIGttIGZyb20gL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9mdWVsLXByaWNlLWttLlxyXG5leHBvcnQgY29uc3QgZ2V0RnVlbFByaWNlS20gPSBhc3luYyAoXHJcbiAgdHJhbnNEYXRlOiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEZ1ZWxQcmljZUttRHRvPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBub3JtYWxpemVkRGF0ZSA9IG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZSh0cmFuc0RhdGUpO1xyXG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xyXG5cclxuICBxdWVyeS5zZXQoXCJ0cmFuc0RhdGVcIiwgbm9ybWFsaXplZERhdGUpO1xyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxGdWVsUHJpY2VLbUR0bz4+KFxyXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvZnVlbC1wcmljZS1rbT8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCxcclxuICAgIHtcclxuICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBDcmVhdGVzIGFuIGV4cGVuc2Ugc2hlZXQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUV4cGVuc2VTaGVldCA9IGFzeW5jIChcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRDcmVhdGVSZXNwb25zZURhdGE+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xuICBjb25zdCBtb2RlID0gcGF5bG9hZC5tb2RlID8/IDA7XG4gIGNvbnN0IGxpbmVzID0gQXJyYXkuaXNBcnJheShwYXlsb2FkLmxpbmVzKSA/IHBheWxvYWQubGluZXMgOiBbXTtcbiAgY29uc3QgbG9jYWxDdXJyZW5jeUNvZGUgPSBub3JtYWxpemVDdXJyZW5jeUNvZGUoY29udGV4dC5kZWZhdWx0Q3VycmVuY3lDb2RlKSB8fCBcIkVVUlwiO1xuICBjb25zdCBub3JtYWxpemVkTGluZXMgPSBsaW5lcy5tYXAoKGxpbmUpID0+ICh7XG4gICAgLi4ubGluZSxcbiAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZShsaW5lLnRyYW5zRGF0ZSksXG4gICAgcmVpbWJ1cnNhYmxlRXhwZW5zZTogbm9ybWFsaXplRXhwZW5zZVNoZWV0UmVpbWJ1cnNhYmxlKGxpbmUucmVpbWJ1cnNhYmxlRXhwZW5zZSksXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChsaW5lLmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSB8fCB1bmRlZmluZWQsXG4gICAgYW1vdW50TVNUOiB0b051bGxhYmxlTnVtYmVyKGxpbmUuYW1vdW50TVNUKSxcbiAgICBleGNoUmF0ZTogdG9OdWxsYWJsZU51bWJlcihsaW5lLmV4Y2hSYXRlKSxcbiAgfSkpO1xuICBjb25zdCBoYXNJbnZhbGlkTGluZVBheWxvYWQgPSBub3JtYWxpemVkTGluZXMuc29tZSgobGluZSkgPT4ge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgIXNhZmVUZXh0KGxpbmUudHJhbnNEYXRlKSB8fFxyXG4gICAgICAhTnVtYmVyLmlzSW50ZWdlcihOdW1iZXIobGluZS50eXBlVmFsdWUpKSB8fFxyXG4gICAgICBOdW1iZXIobGluZS50eXBlVmFsdWUpIDw9IDAgfHxcclxuICAgICAgIWlzUG9zaXRpdmVOdW1iZXIobGluZS5xdHkpIHx8XHJcbiAgICAgICFpc1Bvc2l0aXZlTnVtYmVyKGxpbmUucHJpY2UpXHJcbiAgICApO1xyXG4gIH0pO1xyXG5cclxuICBpZiAocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMgIT09IHVuZGVmaW5lZCAmJiAhaXNOb25OZWdhdGl2ZU51bWJlcihwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cykpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhwZW5zZVNoZWV0U3RhdHVzIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byAwLlwiKTtcclxuICB9XHJcblxyXG4gIGlmIChwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUgIT09IHVuZGVmaW5lZCAmJiAhaXNOb25OZWdhdGl2ZU51bWJlcihwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUpKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImV4Y2hhbmdlUmF0ZU1vZGUgbXVzdCBiZSBncmVhdGVyIG9yIGVxdWFsIHRvIDAuXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSAhPT0gdW5kZWZpbmVkICYmIHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzID09PSB1bmRlZmluZWQpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhjaGFuZ2VSYXRlTW9kZSByZXF1aXJlcyBleHBlbnNlU2hlZXRTdGF0dXMuXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGhhc0ludmFsaWRMaW5lUGF5bG9hZCkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiRWFjaCBsaW5lIHJlcXVpcmVzIHRyYW5zRGF0ZSwgdHlwZVZhbHVlLCBxdHkgPiAwIGFuZCBwcmljZSA+IDAuXCIpO1xuICB9XG5cbiAgaWYgKG5vcm1hbGl6ZWRMaW5lcy5zb21lKChsaW5lKSA9PiBoYXNNaXNzaW5nRm9yZWlnbkxpbmVTZXR0bGVtZW50KGxpbmUsIGxvY2FsQ3VycmVuY3lDb2RlKSkpIHtcbiAgICB0aHJvdyBidWlsZEZvcmVpZ25MaW5lU2V0dGxlbWVudEVycm9yKCk7XG4gIH1cblxuICBpZiAobW9kZSA9PT0gMCkge1xuICAgIGlmICghc2FmZVRleHQocGF5bG9hZC5kZXNjcmlwdGlvbikgfHwgbGluZXMubGVuZ3RoIDwgMSkge1xuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJJbnZhbGlkIGNyZWF0ZSBwYXlsb2FkIGZvciBtb2RlIDAuXCIpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChtb2RlID09PSAxKSB7XG4gICAgaWYgKCFzYWZlVGV4dChwYXlsb2FkLmRlc2NyaXB0aW9uKSkge1xuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJJbnZhbGlkIGNyZWF0ZSBwYXlsb2FkIGZvciBtb2RlIDEuXCIpO1xuICAgIH1cblxyXG4gICAgaWYgKGxpbmVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJNb2RlIDEgcmVxdWlyZXMgbGluZXMgdG8gYmUgbnVsbCBvciBlbXB0eS5cIik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAobW9kZSA9PT0gMikge1xyXG4gICAgaWYgKCFzYWZlVGV4dChwYXlsb2FkLmV4aXN0aW5nSG9qYUdhc3Rvc0lkKSB8fCBsaW5lcy5sZW5ndGggPCAxKSB7XHJcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiSW52YWxpZCBjcmVhdGUgcGF5bG9hZCBmb3IgbW9kZSAyLlwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IG5vcm1hbGl6ZWRQYXlsb2FkOiBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0ID0ge1xyXG4gICAgLi4ucGF5bG9hZCxcclxuICAgIG1vZGUsXG4gICAgZXhpc3RpbmdIb2phR2FzdG9zSWQ6IHNhZmVUZXh0KHBheWxvYWQuZXhpc3RpbmdIb2phR2FzdG9zSWQpIHx8IHVuZGVmaW5lZCxcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQocGF5bG9hZC5kZXNjcmlwdGlvbikgfHwgdW5kZWZpbmVkLFxuICAgIGN1cnJlbmN5Q29kZTogbm9ybWFsaXplQ3VycmVuY3lDb2RlKHBheWxvYWQuY3VycmVuY3lDb2RlKSB8fCB1bmRlZmluZWQsXG4gICAgZXhjaFJhdGU6IHRvTnVsbGFibGVOdW1iZXIocGF5bG9hZC5leGNoUmF0ZSkgPz8gdW5kZWZpbmVkLFxuICAgIHByb2pJZDogc2FmZVRleHQocGF5bG9hZC5wcm9qSWQpIHx8IHVuZGVmaW5lZCxcbiAgICByZWltYnVyc2FibGVFeHBlbnNlOiBub3JtYWxpemVFeHBlbnNlU2hlZXRSZWltYnVyc2FibGUocGF5bG9hZC5yZWltYnVyc2FibGVFeHBlbnNlKSxcbiAgICBsaW5lczogbW9kZSA9PT0gMSA/IFtdIDogbm9ybWFsaXplZExpbmVzLFxuICB9O1xuICBjb25zdCBpbmNsdWRlQXhVc2VyT3ZlcnJpZGUgPSBtb2RlID09PSAyO1xyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRDcmVhdGVSZXNwb25zZURhdGE+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHNcIiwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAvLyBIZWFkZXIgY3JlYXRlIGZsb3dzIG11c3QgYWx3YXlzIHJ1biBpbiB0aGUgc2lnbmVkLWluIHVzZXIgY29udGV4dC5cclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSwgaW5jbHVkZUF4VXNlck92ZXJyaWRlKSxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG5vcm1hbGl6ZWRQYXlsb2FkKSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIFVwZGF0ZXMgaGVhZGVyIGZpZWxkcyB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9LlxyXG5leHBvcnQgY29uc3QgdXBkYXRlRXhwZW5zZVNoZWV0SGVhZGVyID0gYXN5bmMgKFxyXG4gIGhvamFHYXN0b3NJZDogc3RyaW5nLFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldEhlYWRlclVwZGF0ZVJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPHsgSG9qYUdhc3Rvc0lkOiBzdHJpbmcgfT4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xyXG5cclxuICBpZiAocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMgIT09IHVuZGVmaW5lZCAmJiAhaXNOb25OZWdhdGl2ZU51bWJlcihwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cykpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhwZW5zZVNoZWV0U3RhdHVzIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byAwLlwiKTtcclxuICB9XHJcblxyXG4gIGlmIChwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUgIT09IHVuZGVmaW5lZCAmJiAhaXNOb25OZWdhdGl2ZU51bWJlcihwYXlsb2FkLmV4Y2hhbmdlUmF0ZU1vZGUpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleGNoYW5nZVJhdGVNb2RlIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byAwLlwiKTtcbiAgfVxuXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRIZWFkZXJVcGRhdGVSZXF1ZXN0ID0ge1xuICAgIC4uLnBheWxvYWQsXG4gICAgY3VycmVuY3lDb2RlOiBub3JtYWxpemVDdXJyZW5jeUNvZGUocGF5bG9hZC5jdXJyZW5jeUNvZGUpIHx8IHVuZGVmaW5lZCxcbiAgICBleGNoUmF0ZTogdG9OdWxsYWJsZU51bWJlcihwYXlsb2FkLmV4Y2hSYXRlKSA/PyB1bmRlZmluZWQsXG4gICAgcmVpbWJ1cnNhYmxlRXhwZW5zZTogbm9ybWFsaXplRXhwZW5zZVNoZWV0UmVpbWJ1cnNhYmxlKHBheWxvYWQucmVpbWJ1cnNhYmxlRXhwZW5zZSksXG4gIH07XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8eyBIb2phR2FzdG9zSWQ6IHN0cmluZyB9Pj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH1gLCB7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXG4gIH0pO1xuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIERlbGV0ZXMgYSBmdWxsIGV4cGVuc2Ugc2hlZXQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS9saW5lcy8wP2RlbGV0ZVdob2xlU2hlZXQ9dHJ1ZS5cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VTaGVldCA9IGFzeW5jIChcclxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+PihcclxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9L2xpbmVzLzA/ZGVsZXRlTW9kZT0yJmRlbGV0ZVdob2xlU2hlZXQ9dHJ1ZWAsXHJcbiAgICB7XHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gVXBkYXRlcyBvbmUgZXhwZW5zZSBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0vbGluZXMve2xpbmVSZWNJZH0uXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVFeHBlbnNlU2hlZXRMaW5lID0gYXN5bmMgKFxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcbiAgbGluZVJlY0lkOiBzdHJpbmcsXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXF1ZXN0LFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXNwb25zZURhdGE+PiA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc0RhdGUgPSBub3JtYWxpemVSZXF1aXJlZEFwaURhdGUocGF5bG9hZC50cmFuc0RhdGUpO1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XG4gIGNvbnN0IGxvY2FsQ3VycmVuY3lDb2RlID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKGNvbnRleHQuZGVmYXVsdEN1cnJlbmN5Q29kZSkgfHwgXCJFVVJcIjtcbiAgY29uc3Qgbm9ybWFsaXplZFBheWxvYWQ6IEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXF1ZXN0ID0ge1xuICAgIC4uLnBheWxvYWQsXG4gICAgdHJhbnNEYXRlOiBub3JtYWxpemVkVHJhbnNEYXRlLFxuICAgIHJlaW1idXJzYWJsZUV4cGVuc2U6IG5vcm1hbGl6ZUV4cGVuc2VTaGVldFJlaW1idXJzYWJsZShwYXlsb2FkLnJlaW1idXJzYWJsZUV4cGVuc2UpLFxuICAgIGN1cnJlbmN5Q29kZTogbm9ybWFsaXplQ3VycmVuY3lDb2RlKHBheWxvYWQuY3VycmVuY3lDb2RlKSB8fCB1bmRlZmluZWQsXG4gICAgYW1vdW50TVNUOiB0b051bGxhYmxlTnVtYmVyKHBheWxvYWQuYW1vdW50TVNUKSxcbiAgICBleGNoUmF0ZTogdG9OdWxsYWJsZU51bWJlcihwYXlsb2FkLmV4Y2hSYXRlKSxcbiAgfTtcbiAgaWYgKFxuICAgICFOdW1iZXIuaXNJbnRlZ2VyKE51bWJlcihub3JtYWxpemVkUGF5bG9hZC50eXBlVmFsdWUpKSB8fFxuICAgIE51bWJlcihub3JtYWxpemVkUGF5bG9hZC50eXBlVmFsdWUpIDw9IDAgfHxcbiAgICAhaXNQb3NpdGl2ZU51bWJlcihub3JtYWxpemVkUGF5bG9hZC5xdHkpIHx8XG4gICAgIWlzUG9zaXRpdmVOdW1iZXIobm9ybWFsaXplZFBheWxvYWQucHJpY2UpXG4gICkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwidHJhbnNEYXRlLCB0eXBlVmFsdWUsIHF0eSA+IDAgYW5kIHByaWNlID4gMCBhcmUgcmVxdWlyZWQuXCIpO1xuICB9XG5cbiAgaWYgKGhhc01pc3NpbmdGb3JlaWduTGluZVNldHRsZW1lbnQobm9ybWFsaXplZFBheWxvYWQsIGxvY2FsQ3VycmVuY3lDb2RlKSkge1xuICAgIHRocm93IGJ1aWxkRm9yZWlnbkxpbmVTZXR0bGVtZW50RXJyb3IoKTtcbiAgfVxuXG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcbiAgY29uc3Qgc2FmZUxpbmVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcobGluZVJlY0lkIHx8IFwiXCIpLnRyaW0oKSk7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlc3BvbnNlRGF0YT4+KFxyXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH0vbGluZXMvJHtzYWZlTGluZUlkfWAsXHJcbiAgICB7XHJcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobm9ybWFsaXplZFBheWxvYWQpLFxuICAgIH1cbiAgKTtcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBEZWxldGVzIG9uZSBleHBlbnNlIGxpbmUgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS9saW5lcy97bGluZVJlY0lkfT9kZWxldGVXaG9sZVNoZWV0PWZhbHNlLlxyXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0TGluZSA9IGFzeW5jIChcclxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcclxuICBsaW5lUmVjSWQ6IHN0cmluZyxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHNhZmVMaW5lSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGxpbmVSZWNJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+PihcclxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9L2xpbmVzLyR7c2FmZUxpbmVJZH0/ZGVsZXRlTW9kZT0wJmRlbGV0ZVdob2xlU2hlZXQ9ZmFsc2VgLFxyXG4gICAge1xyXG4gICAgICAuLi5vcHRpb25zLFxyXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUV4cGVuc2VTaGVldHNBc2tSZXNwb25zZSA9IChyZXNwb25zZTogRXhwZW5zZVNoZWV0c0Fza1Jlc3VsdCk6IEV4cGVuc2VTaGVldHNBc2tSZXN1bHQgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgY29uc3QgcmF3RGF0YSA9IG5vcm1hbGl6ZWQ/LkRhdGE7XHJcbiAgaWYgKCFyYXdEYXRhIHx8IHR5cGVvZiByYXdEYXRhICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAuLi5ub3JtYWxpemVkLFxyXG4gICAgICBNZXNzYWdlOiBzYW5pdGl6ZUFzc2lzdGFudFRleHQobm9ybWFsaXplZD8uTWVzc2FnZSksXHJcbiAgICAgIEh0dHBTdGF0dXM6IHR5cGVvZiByZXNwb25zZT8uSHR0cFN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IHJlc3BvbnNlLkh0dHBTdGF0dXMgOiB1bmRlZmluZWQsXHJcbiAgICAgIFJldHJ5QWZ0ZXI6IHNhZmVUZXh0KHJlc3BvbnNlPy5SZXRyeUFmdGVyKSB8fCBudWxsLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJhd1dhcm5pbmdzID1cclxuICAgIChyYXdEYXRhIGFzIHsgV2FybmluZ3M/OiB1bmtub3duOyB3YXJuaW5ncz86IHVua25vd24gfSkuV2FybmluZ3MgPz9cclxuICAgIChyYXdEYXRhIGFzIHsgd2FybmluZ3M/OiB1bmtub3duIH0pLndhcm5pbmdzO1xyXG4gIGNvbnN0IHJhd0ZpbHRlcnNBcHBsaWVkID1cclxuICAgIChyYXdEYXRhIGFzIHsgRmlsdGVyc0FwcGxpZWQ/OiB1bmtub3duOyBmaWx0ZXJzQXBwbGllZD86IHVua25vd24gfSkuRmlsdGVyc0FwcGxpZWQgPz9cclxuICAgIChyYXdEYXRhIGFzIHsgZmlsdGVyc0FwcGxpZWQ/OiB1bmtub3duIH0pLmZpbHRlcnNBcHBsaWVkO1xyXG5cclxuICBjb25zdCBpc0lnbm9yYWJsZUFzc2lzdGFudFdhcm5pbmcgPSAod2FybmluZzogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgICBjb25zdCBub3JtYWxpemVkV2FybmluZyA9IHNhbml0aXplQXNzaXN0YW50VGV4dCh3YXJuaW5nKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKCFub3JtYWxpemVkV2FybmluZykgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZWRXYXJuaW5nLmluY2x1ZGVzKFwic291cmNlanNvblwiKSAmJlxyXG4gICAgICAobm9ybWFsaXplZFdhcm5pbmcuaW5jbHVkZXMoXCJza2lwcGVkXCIpIHx8IG5vcm1hbGl6ZWRXYXJuaW5nLmluY2x1ZGVzKFwib21pdFwiKSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLm5vcm1hbGl6ZWQsXHJcbiAgICBNZXNzYWdlOiBzYW5pdGl6ZUFzc2lzdGFudFRleHQobm9ybWFsaXplZD8uTWVzc2FnZSksXHJcbiAgICBIdHRwU3RhdHVzOiB0eXBlb2YgcmVzcG9uc2U/Lkh0dHBTdGF0dXMgPT09IFwibnVtYmVyXCIgPyByZXNwb25zZS5IdHRwU3RhdHVzIDogdW5kZWZpbmVkLFxyXG4gICAgUmV0cnlBZnRlcjogc2FmZVRleHQocmVzcG9uc2U/LlJldHJ5QWZ0ZXIpIHx8IG51bGwsXHJcbiAgICBEYXRhOiB7XHJcbiAgICAgIEFuc3dlcjogc2FuaXRpemVBc3Npc3RhbnRUZXh0KFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgQW5zd2VyPzogdW5rbm93bjsgYW5zd2VyPzogdW5rbm93biB9KS5BbnN3ZXIgPz8gKHJhd0RhdGEgYXMgeyBhbnN3ZXI/OiB1bmtub3duIH0pLmFuc3dlclxyXG4gICAgICApLFxyXG4gICAgICBNb2RlbDogc2FuaXRpemVBc3Npc3RhbnRUZXh0KFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgTW9kZWw/OiB1bmtub3duOyBtb2RlbD86IHVua25vd24gfSkuTW9kZWwgPz8gKHJhd0RhdGEgYXMgeyBtb2RlbD86IHVua25vd24gfSkubW9kZWxcclxuICAgICAgKSxcclxuICAgICAgU291cmNlS2V5OiBzYW5pdGl6ZUFzc2lzdGFudFRleHQoXHJcbiAgICAgICAgKHJhd0RhdGEgYXMgeyBTb3VyY2VLZXk/OiB1bmtub3duOyBzb3VyY2VLZXk/OiB1bmtub3duIH0pLlNvdXJjZUtleSA/P1xyXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBzb3VyY2VLZXk/OiB1bmtub3duIH0pLnNvdXJjZUtleVxyXG4gICAgICApLFxyXG4gICAgICBGaWx0ZXJzQXBwbGllZDpcclxuICAgICAgICByYXdGaWx0ZXJzQXBwbGllZCAmJiB0eXBlb2YgcmF3RmlsdGVyc0FwcGxpZWQgPT09IFwib2JqZWN0XCJcclxuICAgICAgICAgID8gY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlKHJhd0ZpbHRlcnNBcHBsaWVkIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KVxyXG4gICAgICAgICAgOiBudWxsLFxyXG4gICAgICBUb3RhbFNvdXJjZVJlY29yZHM6XHJcbiAgICAgICAgdG9OdWxsYWJsZU51bWJlcihcclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgVG90YWxTb3VyY2VSZWNvcmRzPzogdW5rbm93bjsgdG90YWxTb3VyY2VSZWNvcmRzPzogdW5rbm93biB9KS5Ub3RhbFNvdXJjZVJlY29yZHMgPz9cclxuICAgICAgICAgICAgKHJhd0RhdGEgYXMgeyB0b3RhbFNvdXJjZVJlY29yZHM/OiB1bmtub3duIH0pLnRvdGFsU291cmNlUmVjb3Jkc1xyXG4gICAgICAgICkgPz8gbnVsbCxcclxuICAgICAgUmVjb3Jkc1NlbnRUb01vZGVsOlxyXG4gICAgICAgIHRvTnVsbGFibGVOdW1iZXIoXHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IFJlY29yZHNTZW50VG9Nb2RlbD86IHVua25vd247IHJlY29yZHNTZW50VG9Nb2RlbD86IHVua25vd24gfSkuUmVjb3Jkc1NlbnRUb01vZGVsID8/XHJcbiAgICAgICAgICAgIChyYXdEYXRhIGFzIHsgcmVjb3Jkc1NlbnRUb01vZGVsPzogdW5rbm93biB9KS5yZWNvcmRzU2VudFRvTW9kZWxcclxuICAgICAgICApID8/IG51bGwsXHJcbiAgICAgIFJldHJpZXZhbE1vZGU6IHNhbml0aXplQXNzaXN0YW50VGV4dChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IFJldHJpZXZhbE1vZGU/OiB1bmtub3duOyByZXRyaWV2YWxNb2RlPzogdW5rbm93biB9KS5SZXRyaWV2YWxNb2RlID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IHJldHJpZXZhbE1vZGU/OiB1bmtub3duIH0pLnJldHJpZXZhbE1vZGVcclxuICAgICAgKSB8fCBudWxsLFxyXG4gICAgICBUcnVuY2F0ZWQ6IHRvTnVsbGFibGVCb29sKFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgVHJ1bmNhdGVkPzogdW5rbm93bjsgdHJ1bmNhdGVkPzogdW5rbm93biB9KS5UcnVuY2F0ZWQgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgdHJ1bmNhdGVkPzogdW5rbm93biB9KS50cnVuY2F0ZWRcclxuICAgICAgKSxcclxuICAgICAgV2FybmluZ3M6IEFycmF5LmlzQXJyYXkocmF3V2FybmluZ3MpXHJcbiAgICAgICAgPyByYXdXYXJuaW5nc1xyXG4gICAgICAgICAgICAubWFwKChlbnRyeSkgPT4gc2FuaXRpemVBc3Npc3RhbnRUZXh0KGVudHJ5KSlcclxuICAgICAgICAgICAgLmZpbHRlcigoZW50cnkpID0+IGVudHJ5ICYmICFpc0lnbm9yYWJsZUFzc2lzdGFudFdhcm5pbmcoZW50cnkpKVxyXG4gICAgICAgIDogW10sXHJcbiAgICB9LFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBBc2tzIGJ1c2luZXNzIHF1ZXN0aW9ucyBhYm91dCB0aGUgY3VycmVudCBleHBlbnNlIHNoZWV0IGxpc3QgdXNpbmcgL2FwaS9pYS9zZXJ2aWNlL2V4cGVuc2VzaGVldHMvYXNrLlxyXG5leHBvcnQgY29uc3QgYXNrRXhwZW5zZVNoZWV0c1F1ZXN0aW9uID0gYXN5bmMgKFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldHNBc2tSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxFeHBlbnNlU2hlZXRzQXNrUmVzdWx0PiA9PiB7XHJcbiAgY29uc3QgcXVlc3Rpb24gPSBzYWZlVGV4dChwYXlsb2FkPy5xdWVzdGlvbik7XHJcbiAgaWYgKCFxdWVzdGlvbikge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJxdWVzdGlvbiBpcyByZXF1aXJlZC5cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3QgY3NyZlRva2VuID0gZ2V0Q3NyZlRva2VuKCk7XHJcbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpKTtcclxuICBpZiAoY3NyZlRva2VuKSB7XHJcbiAgICBoZWFkZXJzLlJlcXVlc3RWZXJpZmljYXRpb25Ub2tlbiA9IGNzcmZUb2tlbjtcclxuICB9XHJcblxyXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRzQXNrUmVxdWVzdCA9IHtcclxuICAgIHF1ZXN0aW9uLFxyXG4gICAgYW5zd2VySW5zdHJ1Y3Rpb25zOiBzYWZlVGV4dChwYXlsb2FkPy5hbnN3ZXJJbnN0cnVjdGlvbnMpIHx8IHVuZGVmaW5lZCxcclxuICAgIGxpc3RSZXF1ZXN0OiBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUocGF5bG9hZC5saXN0UmVxdWVzdCksXHJcbiAgICBzb3VyY2VKc29uOlxyXG4gICAgICBwYXlsb2FkPy5zb3VyY2VKc29uID09PSBudWxsIHx8IHBheWxvYWQ/LnNvdXJjZUpzb24gPT09IHVuZGVmaW5lZFxyXG4gICAgICAgID8gdW5kZWZpbmVkXHJcbiAgICAgICAgOiBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUocGF5bG9hZC5zb3VyY2VKc29uKSxcclxuICB9O1xyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9pYS9zZXJ2aWNlL2V4cGVuc2VzaGVldHMvYXNrXCIsIHtcclxuICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnMsXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHJhdyA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcclxuICBjb25zdCByZXRyeUFmdGVyID0gc2FmZVRleHQocmVzcG9uc2UuaGVhZGVycy5nZXQoXCJSZXRyeS1BZnRlclwiKSk7XHJcblxyXG4gIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgIGNvbnN0IHJlbG9naW5SZXN1bHQgPSBhd2FpdCBoYW5kbGVBcGlBdXRoRmFpbHVyZTxFeHBlbnNlU2hlZXRzQXNrUmVzdWx0PihyYXcsIHJlc3BvbnNlLnN0YXR1cywgXCJleHBlbnNlLXNoZWV0cy1hc2tcIik7XHJcbiAgICBpZiAocmVsb2dpblJlc3VsdCAhPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gcmVsb2dpblJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IocmVhZEFwaU1lc3NhZ2VGcm9tUmF3KHJhdykgfHwgXCJQZXJtaXNzaW9uIGRlbmllZC5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgcGFyc2VkID0gdHJ5UGFyc2VKc29uKHJhdyk7XHJcbiAgaWYgKCFwYXJzZWQgfHwgdHlwZW9mIHBhcnNlZCAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihyZWFkQXBpTWVzc2FnZUZyb21SYXcocmF3KSB8fCBcIlJlcXVlc3QgZmFpbGVkLlwiLCByZXNwb25zZS5zdGF0dXMsIHJhdyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJJbnZhbGlkIHNlcnZlciByZXNwb25zZS5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUV4cGVuc2VTaGVldHNBc2tSZXNwb25zZSh7XHJcbiAgICAuLi4ocGFyc2VkIGFzIEV4cGVuc2VTaGVldHNBc2tSZXN1bHQpLFxyXG4gICAgSHR0cFN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxyXG4gICAgUmV0cnlBZnRlcjogcmV0cnlBZnRlciB8fCBudWxsLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gRXh0cmFjdHMgYW4gZXhwZW5zZSBkcmFmdCBmcm9tIGEgdGlja2V0IGltYWdlIHVzaW5nIC9hcGkvaWEvc2VydmljZS9leHBlbnNlZnJvbXRpY2tldC5cclxuZXhwb3J0IGNvbnN0IGV4dHJhY3RFeHBlbnNlRnJvbVRpY2tldERyYWZ0ID0gYXN5bmMgKFxyXG4gIHRpY2tldEltYWdlOiBGaWxlIHwgQmxvYixcclxuICBwZXJzaXN0VGlja2V0PzogYm9vbGVhbixcclxuICB0aWNrZXRVcmxGaWxlPzogc3RyaW5nLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXREcmFmdFJlc3BvbnNlPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgY29uc3Qgc2FmZVRpY2tldFVybCA9IHNhZmVUZXh0KHRpY2tldFVybEZpbGUpO1xyXG5cclxuICBpZiAodGlja2V0SW1hZ2UgaW5zdGFuY2VvZiBGaWxlKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcInRpY2tldEltYWdlXCIsIHRpY2tldEltYWdlLCBzYWZlVGV4dCh0aWNrZXRJbWFnZS5uYW1lKSB8fCBcInRpY2tldC5qcGdcIik7XHJcbiAgfSBlbHNlIHtcclxuICAgIGZvcm0uYXBwZW5kKFwidGlja2V0SW1hZ2VcIiwgdGlja2V0SW1hZ2UsIFwidGlja2V0LmpwZ1wiKTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2YgcGVyc2lzdFRpY2tldCA9PT0gXCJib29sZWFuXCIpIHtcclxuICAgIGZvcm0uYXBwZW5kKFwicGVyc2lzdFRpY2tldFwiLCBwZXJzaXN0VGlja2V0ID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHNhZmVUaWNrZXRVcmwpIHtcclxuICAgIGZvcm0uYXBwZW5kKFwidGlja2V0VXJsRmlsZVwiLCBzYWZlVGlja2V0VXJsKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldERyYWZ0UmVzcG9uc2U+PihcIi9hcGkvaWEvc2VydmljZS9leHBlbnNlZnJvbXRpY2tldFwiLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUZvcm1IZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gICAgYm9keTogZm9ybSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIENyZWF0ZXMgYW5kIGZpbmFsaXplcyBvbmUgdGlja2V0IGZyb20gYSBzaW5nbGUgbXVsdGlwYXJ0IHVwbG9hZCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvcXVpY2stY3JlYXRlLlxyXG5leHBvcnQgY29uc3QgY3JlYXRlRXhwZW5zZVNoZWV0VGlja2V0UXVpY2sgPSBhc3luYyAoXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlc3VsdD4gPT4ge1xuICBpZiAoIXBheWxvYWQ/LnRpY2tldEltYWdlKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcInRpY2tldEltYWdlIGlzIHJlcXVpcmVkLlwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IF9zdXBwcmVzc1Blcm1pc3Npb25Nb2RhbCwgLi4uZmV0Y2hPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChmZXRjaE9wdGlvbnMpO1xyXG4gIGNvbnN0IGZvcm0gPSBuZXcgRm9ybURhdGEoKTtcclxuICBjb25zdCBzYWZlQ3VycmVuY3lDb2RlID0gc2FmZVRleHQocGF5bG9hZD8uY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpO1xyXG4gIGNvbnN0IHNhZmVEZXNjcmlwdGlvbiA9IHNhZmVUZXh0KHBheWxvYWQ/LmRlc2NyaXB0aW9uKTtcbiAgY29uc3Qgc2FmZUNvbWVudGFyaW8gPSBzYWZlVGV4dChwYXlsb2FkPy5jb21lbnRhcmlvKTtcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChwYXlsb2FkPy5leGlzdGluZ0hvamFHYXN0b3NJZCk7XG4gIGNvbnN0IHNhZmVQcm9qZWN0SWQgPSBzYWZlVGV4dChwYXlsb2FkPy5wcm9qSWQgfHwgcGF5bG9hZD8ucHJvamVjdElkKTtcbiAgY29uc3QgdGlja2V0SW1hZ2UgPSBwYXlsb2FkLnRpY2tldEltYWdlO1xuXHJcbiAgaWYgKHRpY2tldEltYWdlIGluc3RhbmNlb2YgRmlsZSkge1xyXG4gICAgZm9ybS5hcHBlbmQoXCJ0aWNrZXRJbWFnZVwiLCB0aWNrZXRJbWFnZSwgc2FmZVRleHQodGlja2V0SW1hZ2UubmFtZSkgfHwgXCJ0aWNrZXQuanBnXCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBmb3JtLmFwcGVuZChcInRpY2tldEltYWdlXCIsIHRpY2tldEltYWdlLCBcInRpY2tldC5qcGdcIik7XHJcbiAgfVxyXG5cclxuICBpZiAoc2FmZUN1cnJlbmN5Q29kZSkge1xyXG4gICAgZm9ybS5hcHBlbmQoXCJjdXJyZW5jeUNvZGVcIiwgc2FmZUN1cnJlbmN5Q29kZSk7XHJcbiAgfVxyXG5cclxuICBpZiAoXCJkZXNjcmlwdGlvblwiIGluIHBheWxvYWQpIHtcclxuICAgIGZvcm0uYXBwZW5kKFwiZGVzY3JpcHRpb25cIiwgc2FmZURlc2NyaXB0aW9uKTtcclxuICB9XHJcblxyXG4gIGlmIChcImNvbWVudGFyaW9cIiBpbiBwYXlsb2FkKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcImNvbWVudGFyaW9cIiwgc2FmZUNvbWVudGFyaW8pO1xyXG4gIH1cclxuXHJcbiAgaWYgKHNhZmVTaGVldElkKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcImV4aXN0aW5nSG9qYUdhc3Rvc0lkXCIsIHNhZmVTaGVldElkKTtcclxuICB9XHJcblxyXG4gIGlmIChzYWZlU2hlZXRJZCAmJiBzYWZlUHJvamVjdElkKSB7XG4gICAgZm9ybS5hcHBlbmQoXCJwcm9qSWRcIiwgc2FmZVByb2plY3RJZCk7XG4gIH1cblxyXG4gIGNvbnN0IGNzcmZUb2tlbiA9IGdldENzcmZUb2tlbigpO1xyXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMoYnVpbGRFeHBlbnNlRm9ybUhlYWRlcnMoY29udGV4dCwgZmV0Y2hPcHRpb25zKSk7XHJcbiAgaWYgKGNzcmZUb2tlbikge1xyXG4gICAgaGVhZGVycy5SZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW4gPSBjc3JmVG9rZW47XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3F1aWNrLWNyZWF0ZVwiLCB7XHJcbiAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxyXG4gICAgLi4uZmV0Y2hPcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnMsXHJcbiAgICBib2R5OiBmb3JtLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCByYXcgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgY29uc3QgcmV0cnlBZnRlciA9IHNhZmVUZXh0KHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiUmV0cnktQWZ0ZXJcIikpO1xyXG5cclxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICBjb25zdCByZWxvZ2luUmVzdWx0ID0gYXdhaXQgaGFuZGxlQXBpQXV0aEZhaWx1cmU8RXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQ+KFxyXG4gICAgICByYXcsXHJcbiAgICAgIHJlc3BvbnNlLnN0YXR1cyxcclxuICAgICAgXCJ0aWNrZXQtcXVpY2stY3JlYXRlXCJcclxuICAgICk7XHJcbiAgICBpZiAocmVsb2dpblJlc3VsdCAhPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gcmVsb2dpblJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IocmVhZEFwaU1lc3NhZ2VGcm9tUmF3KHJhdykgfHwgXCJQZXJtaXNzaW9uIGRlbmllZC5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgcGFyc2VkID0gdHJ5UGFyc2VKc29uKHJhdyk7XHJcbiAgaWYgKCFwYXJzZWQgfHwgdHlwZW9mIHBhcnNlZCAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihyZWFkQXBpTWVzc2FnZUZyb21SYXcocmF3KSB8fCBcIlJlcXVlc3QgZmFpbGVkLlwiLCByZXNwb25zZS5zdGF0dXMsIHJhdyk7XHJcbiAgICB9XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkludmFsaWQgc2VydmVyIHJlc3BvbnNlLlwiLCByZXNwb25zZS5zdGF0dXMsIHJhdyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZSh7XHJcbiAgICAuLi4ocGFyc2VkIGFzIEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVzdWx0KSxcclxuICAgIEh0dHBTdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcclxuICAgIFJldHJ5QWZ0ZXI6IHJldHJ5QWZ0ZXIgfHwgbnVsbCxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIENyZWF0ZXMgYSB0aWNrZXQgaGVhZGVyL2xpbmVzIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRDcmVhdGVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IG1vZGUgPSBOdW1iZXIocGF5bG9hZD8ubW9kZSk7XG4gIGNvbnN0IHJhd1RyYW5zRGF0ZSA9IHNhZmVUZXh0KHBheWxvYWQ/LnRyYW5zRGF0ZSk7XG4gIGNvbnN0IHJhd1RpY2tldERhdGUgPSBzYWZlVGV4dChwYXlsb2FkPy50aWNrZXREYXRlKTtcbiAgY29uc3Qgbm9ybWFsaXplZFRyYW5zRGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdUcmFuc0RhdGUpO1xuICBjb25zdCBub3JtYWxpemVkVGlja2V0RGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdUaWNrZXREYXRlKTtcblxuICBpZiAocmF3VHJhbnNEYXRlICYmICFub3JtYWxpemVkVHJhbnNEYXRlKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XG4gIH1cbiAgaWYgKHJhd1RpY2tldERhdGUgJiYgIW5vcm1hbGl6ZWRUaWNrZXREYXRlKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XG4gIH1cblxyXG4gIGlmICgobW9kZSA9PT0gMCB8fCBtb2RlID09PSAxKSAmJiAhbm9ybWFsaXplZFRyYW5zRGF0ZSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzYWZlUGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0Q3JlYXRlUmVxdWVzdCA9IHtcclxuICAgIC4uLnBheWxvYWQsXG4gICAgdHJhbnNEYXRlOiBub3JtYWxpemVkVHJhbnNEYXRlIHx8IHVuZGVmaW5lZCxcbiAgICB0aWNrZXREYXRlOiBub3JtYWxpemVkVGlja2V0RGF0ZSB8fCB1bmRlZmluZWQsXG4gICAgZ2FzdG9UeXBlOiBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZShwYXlsb2FkPy5nYXN0b1R5cGUpLFxuICB9O1xuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0c1wiLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVUaWNrZXRGaWx0ZXJDcml0ZXJpYVBheWxvYWQgPSA8XHJcbiAgVCBleHRlbmRzIHtcclxuICAgIGNyZWF0ZWREYXRlRnJvbT86IHN0cmluZztcclxuICAgIGNyZWF0ZWREYXRlVG8/OiBzdHJpbmc7XHJcbiAgICBzZWFyY2hLZXk/OiBzdHJpbmc7XHJcbiAgICBmaWx0ZXI/OiBzdHJpbmc7XHJcbiAgICBjdXJyZW5jeUNvZGU/OiBzdHJpbmc7XHJcbiAgICBnYXN0b1R5cGU/OiB1bmtub3duO1xyXG4gICAgcHJvY2Vzc2VkQnlBST86IHVua25vd247XHJcbiAgfSxcclxuPihcclxuICBwYXlsb2FkOiBUXHJcbikgPT4ge1xyXG4gIGNvbnN0IHJhd0NyZWF0ZWREYXRlRnJvbSA9IHNhZmVUZXh0KHBheWxvYWQ/LmNyZWF0ZWREYXRlRnJvbSk7XHJcbiAgY29uc3QgcmF3Q3JlYXRlZERhdGVUbyA9IHNhZmVUZXh0KHBheWxvYWQ/LmNyZWF0ZWREYXRlVG8pO1xyXG4gIGNvbnN0IGNyZWF0ZWREYXRlRnJvbSA9IG5vcm1hbGl6ZVRpY2tldExpc3REYXRlKHJhd0NyZWF0ZWREYXRlRnJvbSk7XHJcbiAgY29uc3QgY3JlYXRlZERhdGVUbyA9IG5vcm1hbGl6ZVRpY2tldExpc3REYXRlKHJhd0NyZWF0ZWREYXRlVG8pO1xyXG4gIGlmIChyYXdDcmVhdGVkRGF0ZUZyb20gJiYgIWNyZWF0ZWREYXRlRnJvbSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgfVxyXG4gIGlmIChyYXdDcmVhdGVkRGF0ZVRvICYmICFjcmVhdGVkRGF0ZVRvKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHByZWZlcnJlZFNlYXJjaEtleSA9IHNhZmVUZXh0KHBheWxvYWQ/LnNlYXJjaEtleSB8fCBwYXlsb2FkPy5maWx0ZXIpO1xyXG4gIGNvbnN0IGxlZ2FjeUZpbHRlciA9IHNhZmVUZXh0KHBheWxvYWQ/LmZpbHRlciB8fCBwcmVmZXJyZWRTZWFyY2hLZXkpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY3JlYXRlZERhdGVGcm9tOiBjcmVhdGVkRGF0ZUZyb20gfHwgdW5kZWZpbmVkLFxyXG4gICAgY3JlYXRlZERhdGVUbzogY3JlYXRlZERhdGVUbyB8fCB1bmRlZmluZWQsXHJcbiAgICBzZWFyY2hLZXk6IHByZWZlcnJlZFNlYXJjaEtleSB8fCB1bmRlZmluZWQsXHJcbiAgICBmaWx0ZXI6IGxlZ2FjeUZpbHRlciB8fCB1bmRlZmluZWQsXHJcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KHBheWxvYWQ/LmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSB8fCB1bmRlZmluZWQsXHJcbiAgICBnYXN0b1R5cGU6IG5vcm1hbGl6ZVRpY2tldExpc3RHYXN0b1R5cGUocGF5bG9hZD8uZ2FzdG9UeXBlKSxcclxuICAgIHByb2Nlc3NlZEJ5QUk6IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSShwYXlsb2FkPy5wcm9jZXNzZWRCeUFJKSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdEZpbHRlclBheWxvYWQgPSA8XHJcbiAgVCBleHRlbmRzIHtcclxuICAgIHBhZ2U/OiBudW1iZXI7XHJcbiAgICBwYWdlU2l6ZT86IG51bWJlcjtcclxuICAgIGNyZWF0ZWREYXRlRnJvbT86IHN0cmluZztcclxuICAgIGNyZWF0ZWREYXRlVG8/OiBzdHJpbmc7XHJcbiAgICBzZWFyY2hLZXk/OiBzdHJpbmc7XHJcbiAgICBmaWx0ZXI/OiBzdHJpbmc7XHJcbiAgICBjdXJyZW5jeUNvZGU/OiBzdHJpbmc7XHJcbiAgICBnYXN0b1R5cGU/OiB1bmtub3duO1xyXG4gICAgcHJvY2Vzc2VkQnlBST86IHVua25vd247XHJcbiAgfSxcclxuPihcclxuICBwYXlsb2FkOiBUXHJcbikgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBwYWdlOiBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZD8ucGFnZSkgJiYgTnVtYmVyKHBheWxvYWQucGFnZSkgPiAwID8gTWF0aC5mbG9vcihOdW1iZXIocGF5bG9hZC5wYWdlKSkgOiAxLFxyXG4gICAgcGFnZVNpemU6IE51bWJlci5pc0Zpbml0ZShwYXlsb2FkPy5wYWdlU2l6ZSkgJiYgTnVtYmVyKHBheWxvYWQucGFnZVNpemUpID4gMCA/IE1hdGguZmxvb3IoTnVtYmVyKHBheWxvYWQucGFnZVNpemUpKSA6IDUwLFxyXG4gICAgLi4ubm9ybWFsaXplVGlja2V0RmlsdGVyQ3JpdGVyaWFQYXlsb2FkKHBheWxvYWQpLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBMb2FkcyB0aWNrZXQgbGlzdCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGlzdC5cclxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0c0xpc3QgPSBhc3luYyAoXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEV4cGVuc2VUaWNrZXRMaXN0RmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz4+ID0+IHtcclxuICBjb25zdCB7IGF4VXNlcklkT3ZlcnJpZGUsIC4uLmJhc2VPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChiYXNlT3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0ID0ge1xyXG4gICAgLi4ubm9ybWFsaXplVGlja2V0TGlzdEZpbHRlclBheWxvYWQocGF5bG9hZCksXHJcbiAgICBzdGF0dXM6IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzKHBheWxvYWQ/LnN0YXR1cyksXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaXN0SXRlbUR0bz4+KFxyXG4gICAgXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGlzdFwiLFxyXG4gICAge1xyXG4gICAgICAuLi5iYXNlT3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRUaWNrZXRMaXN0SGVhZGVycyhjb250ZXh0LCBiYXNlT3B0aW9ucywgYXhVc2VySWRPdmVycmlkZSksXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gTG9hZHMgbGluay1tb2RlIHRpY2tldCBsaXN0IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saW5rL2xpc3QuXHJcbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0ID0gYXN5bmMgKFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0UmVxdWVzdCxcclxuICBvcHRpb25zPzogRXhwZW5zZVRpY2tldExpc3RGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0bz4+ID0+IHtcclxuICBjb25zdCB7IGF4VXNlcklkT3ZlcnJpZGUsIC4uLmJhc2VPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChiYXNlT3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0UmVxdWVzdCA9IHtcclxuICAgIC4uLm5vcm1hbGl6ZVRpY2tldExpc3RGaWx0ZXJQYXlsb2FkKHBheWxvYWQpLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RJdGVtRHRvPj4oXHJcbiAgICBcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saW5rL2xpc3RcIixcclxuICAgIHtcclxuICAgICAgLi4uYmFzZU9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkVGlja2V0TGlzdEhlYWRlcnMoY29udGV4dCwgYmFzZU9wdGlvbnMsIGF4VXNlcklkT3ZlcnJpZGUpLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBMaW5rcyBzZWxlY3RlZCBvciBmaWx0ZXJlZCB0aWNrZXRzIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saW5rL2J1bGsuXHJcbmV4cG9ydCBjb25zdCBsaW5rRXhwZW5zZVNoZWV0VGlja2V0c0J1bGsgPSBhc3luYyAoXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBFeHBlbnNlVGlja2V0TGlzdEZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvPj4gPT4ge1xyXG4gIGNvbnN0IHsgYXhVc2VySWRPdmVycmlkZSwgLi4uYmFzZU9wdGlvbnMgfSA9IG9wdGlvbnMgfHwge307XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KGJhc2VPcHRpb25zKTtcclxuICBjb25zdCBzZWxlY3Rpb25Nb2RlID0gcGF5bG9hZD8uc2VsZWN0aW9uTW9kZSA9PT0gXCJmaWx0ZXJlZFwiID8gXCJmaWx0ZXJlZFwiIDogXCJzZWxlY3RlZFwiO1xyXG4gIGNvbnN0IHRpY2tldElkcyA9IEFycmF5LmlzQXJyYXkocGF5bG9hZD8udGlja2V0SWRzKVxyXG4gICAgPyBwYXlsb2FkLnRpY2tldElkcy5tYXAoKGVudHJ5KSA9PiBzYWZlVGV4dChlbnRyeSkpLmZpbHRlcihCb29sZWFuKVxyXG4gICAgOiBbXTtcclxuICBjb25zdCBleGNsdWRlZElkcyA9IEFycmF5LmlzQXJyYXkocGF5bG9hZD8uZXhjbHVkZWRJZHMpXHJcbiAgICA/IHBheWxvYWQuZXhjbHVkZWRJZHMubWFwKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnkpKS5maWx0ZXIoQm9vbGVhbilcclxuICAgIDogW107XHJcblxyXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1JlcXVlc3QgPSB7XHJcbiAgICBleHBlbnNlU2hlZXRJZDogc2FmZVRleHQocGF5bG9hZD8uZXhwZW5zZVNoZWV0SWQpLFxyXG4gICAgc2VsZWN0aW9uTW9kZSxcclxuICAgIHRpY2tldElkczogc2VsZWN0aW9uTW9kZSA9PT0gXCJzZWxlY3RlZFwiID8gdGlja2V0SWRzIDogdW5kZWZpbmVkLFxyXG4gICAgZmlsdGVyczpcclxuICAgICAgc2VsZWN0aW9uTW9kZSA9PT0gXCJmaWx0ZXJlZFwiICYmIHBheWxvYWQ/LmZpbHRlcnNcclxuICAgICAgICA/IHtcclxuICAgICAgICAgICAgLi4ubm9ybWFsaXplVGlja2V0RmlsdGVyQ3JpdGVyaWFQYXlsb2FkKHBheWxvYWQuZmlsdGVycyksXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgOiB1bmRlZmluZWQsXHJcbiAgICBleGNsdWRlZElkczogc2VsZWN0aW9uTW9kZSA9PT0gXCJmaWx0ZXJlZFwiID8gZXhjbHVkZWRJZHMgOiB1bmRlZmluZWQsXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXN1bHREdG8+PihcclxuICAgIFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL2xpbmsvYnVsa1wiLFxyXG4gICAge1xyXG4gICAgICAuLi5iYXNlT3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRUaWNrZXRMaXN0SGVhZGVycyhjb250ZXh0LCBiYXNlT3B0aW9ucywgYXhVc2VySWRPdmVycmlkZSksXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplVGlja2V0TGlua0J1bGtSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBMb2FkcyBvbmUgdGlja2V0IGRldGFpbCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0uXHJcbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXREZXRhaWxEdG8+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvPj4oXHJcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH1gLFxyXG4gICAge1xyXG4gICAgICAuLi5vcHRpb25zLFxyXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gRG93bmxvYWRzIG9uZSB0aWNrZXQgaW1hZ2UgcHJldmlldyBibG9iIHRocm91Z2ggdGhlIGludGVybmFsIHByb3h5IGVuZHBvaW50LlxyXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRQcmV2aWV3QmxvYiA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICB1cmxGaWxlOiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEJsb2I+ID0+IHtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gc2FmZVRleHQoZmlsZUlkKTtcclxuICBjb25zdCBzYWZlVXJsRmlsZSA9IHNhZmVUZXh0KHVybEZpbGUpO1xyXG4gIGlmICghc2FmZUZpbGVJZCB8fCAhc2FmZVVybEZpbGUpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiTWlzc2luZyB0aWNrZXQgcHJldmlldyBwYXlsb2FkLlwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHsgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IF9zdXBwcmVzc1Blcm1pc3Npb25Nb2RhbCwgLi4uZmV0Y2hPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBjc3JmVG9rZW4gPSBnZXRDc3JmVG9rZW4oKTtcclxuICBjb25zdCBoZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgZmV0Y2hPcHRpb25zLCB0cnVlKSk7XHJcbiAgaGVhZGVycy5BY2NlcHQgPSBcImltYWdlLypcIjtcclxuICBjb25zdCByZXF1ZXN0SGVhZGVyczogSGVhZGVyc0luaXQgPSB7XHJcbiAgICBBY2NlcHQ6IFwiaW1hZ2UvKlwiLFxyXG4gICAgLi4uaGVhZGVycyxcclxuICB9O1xyXG5cclxuICBpZiAoY3NyZlRva2VuKSB7XHJcbiAgICAocmVxdWVzdEhlYWRlcnMgYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPilbXCJSZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW5cIl0gPSBjc3JmVG9rZW47XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3ByZXZpZXdcIiwge1xyXG4gICAgY3JlZGVudGlhbHM6IFwic2FtZS1vcmlnaW5cIixcclxuICAgIC4uLmZldGNoT3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICBoZWFkZXJzOiByZXF1ZXN0SGVhZGVycyxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgZmlsZUlkOiBzYWZlRmlsZUlkLFxyXG4gICAgICB1cmxGaWxlOiBzYWZlVXJsRmlsZSxcclxuICAgIH0pLFxyXG4gIH0pO1xyXG5cclxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICBjb25zdCByYXcgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgICBjb25zdCByZWxvZ2luUmVzdWx0ID0gYXdhaXQgaGFuZGxlQXBpQXV0aEZhaWx1cmU8QmxvYj4ocmF3LCByZXNwb25zZS5zdGF0dXMsIFwidGlja2V0LXByZXZpZXdcIik7XHJcbiAgICBpZiAocmVsb2dpblJlc3VsdCAhPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gcmVsb2dpblJlc3VsdDtcclxuICAgIH1cclxuICAgIGNvbnN0IG1lc3NhZ2UgPSByZWFkQXBpTWVzc2FnZUZyb21SYXcocmF3KTtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKG1lc3NhZ2UgfHwgXCJDb3VsZCBub3QgbG9hZCB0aWNrZXQgcHJldmlldy5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYmxvYiA9IGF3YWl0IHJlc3BvbnNlLmJsb2IoKTtcclxuICBpZiAoIWJsb2IgfHwgYmxvYi5zaXplID09PSAwKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkNvdWxkIG5vdCBsb2FkIHRpY2tldCBwcmV2aWV3LlwiKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBibG9iO1xyXG59O1xyXG5cclxuLy8gVXBkYXRlcyB0aWNrZXQgaGVhZGVyIG1ldGFkYXRhIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldFVwZGF0ZVJlcXVlc3QsXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4gPT4ge1xuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHJhd1RyYW5zRGF0ZSA9IHNhZmVUZXh0KHBheWxvYWQ/LnRyYW5zRGF0ZSk7XG4gIGNvbnN0IHJhd1RpY2tldERhdGUgPSBzYWZlVGV4dChwYXlsb2FkPy50aWNrZXREYXRlKTtcbiAgY29uc3Qgbm9ybWFsaXplZFRyYW5zRGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdUcmFuc0RhdGUpO1xuICBjb25zdCBub3JtYWxpemVkVGlja2V0RGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdUaWNrZXREYXRlKTtcblxuICBpZiAocmF3VHJhbnNEYXRlICYmICFub3JtYWxpemVkVHJhbnNEYXRlKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XG4gIH1cbiAgaWYgKHJhd1RpY2tldERhdGUgJiYgIW5vcm1hbGl6ZWRUaWNrZXREYXRlKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XG4gIH1cblxyXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRVcGRhdGVSZXF1ZXN0ID0ge1xyXG4gICAgLi4ucGF5bG9hZCxcbiAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZWRUcmFuc0RhdGUgfHwgdW5kZWZpbmVkLFxuICAgIHRpY2tldERhdGU6IG5vcm1hbGl6ZWRUaWNrZXREYXRlIHx8IHVuZGVmaW5lZCxcbiAgICBnYXN0b1R5cGU6IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlKHBheWxvYWQ/Lmdhc3RvVHlwZSksXG4gIH07XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfWAsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxyXG4gIH0pO1xyXG5cbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcbn07XG5cbi8vIEFkanVzdHMgYSB0aWNrZXQgaGVhZGVyIHRvdGFsIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS90b3RhbC1hZGp1c3RtZW50LlxuZXhwb3J0IGNvbnN0IGFkanVzdEV4cGVuc2VTaGVldFRpY2tldFRvdGFsQW1vdW50ID0gYXN5bmMgKFxuICBmaWxlSWQ6IHN0cmluZyxcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0VG90YWxBZGp1c3RtZW50UmVxdWVzdCxcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRUb3RhbEFkanVzdG1lbnRSZXN1bHREdG8+PiA9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XG4gIGNvbnN0IHRvdGFsQW1vdW50ID0gdG9OdWxsYWJsZU51bWJlcihwYXlsb2FkPy50b3RhbEFtb3VudCk7XG4gIGlmICghc2FmZUZpbGVJZCB8fCB0b3RhbEFtb3VudCA9PSBudWxsIHx8IHRvdGFsQW1vdW50IDwgMCkge1xuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiSW52YWxpZCB0aWNrZXQgdG90YWwgYWRqdXN0bWVudCBwYXlsb2FkLlwiKTtcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldFRvdGFsQWRqdXN0bWVudFJlc3VsdER0bz4+KFxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS90b3RhbC1hZGp1c3RtZW50YCxcbiAgICB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHRvdGFsQW1vdW50IH0pLFxuICAgIH1cbiAgKTtcblxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xufTtcblxuLy8gRGVsZXRlcyBvbmUgdGlja2V0IG9yIG9uZSB0aWNrZXQgbGluZSB2aWEgcXVlcnkgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9LlxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIGxpbmVSZWNJZD86IG51bWJlcixcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XHJcbiAgaWYgKE51bWJlci5pc0ludGVnZXIoTnVtYmVyKGxpbmVSZWNJZCkpICYmIE51bWJlcihsaW5lUmVjSWQpID4gMCkge1xyXG4gICAgcXVlcnkuc2V0KFwibGluZVJlY0lkXCIsIFN0cmluZyhsaW5lUmVjSWQpKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHN1ZmZpeCA9IHF1ZXJ5LnRvU3RyaW5nKCk7XHJcbiAgY29uc3QgdXJsID0gc3VmZml4XHJcbiAgICA/IGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfT8ke3N1ZmZpeH1gXHJcbiAgICA6IGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfWA7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8bnVsbD4+KHVybCwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBBcHBsaWVzIElBIHBheWxvYWQgb3ZlciBhbiBleGlzdGluZyB0aWNrZXQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9L2lhLlxyXG5leHBvcnQgY29uc3QgYXBwbHlFeHBlbnNlU2hlZXRUaWNrZXRJYSA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3QgcmF3UGF5bG9hZCA9IChwYXlsb2FkIHx8IHt9KSBhcyBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3Q7XHJcbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCA9IHtcclxuICAgIC4uLnJhd1BheWxvYWQsXHJcbiAgfTtcclxuICBjb25zdCBub3JtYWxpemVkVHJhbnNEYXRlID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlKHJhd1BheWxvYWQudHJhbnNEYXRlKTtcclxuICBpZiAoIW5vcm1hbGl6ZWRUcmFuc0RhdGUpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xyXG4gIH1cclxuICBzYWZlUGF5bG9hZC50cmFuc0RhdGUgPSBub3JtYWxpemVkVHJhbnNEYXRlO1xyXG5cclxuICBjb25zdCBnYXN0b1R5cGUgPSBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZShyYXdQYXlsb2FkLmdhc3RvVHlwZSk7XHJcbiAgaWYgKGdhc3RvVHlwZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICBkZWxldGUgc2FmZVBheWxvYWQuZ2FzdG9UeXBlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzYWZlUGF5bG9hZC5nYXN0b1R5cGUgPSBnYXN0b1R5cGU7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vaWFgLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBDcmVhdGVzIG9uZSB0aWNrZXQgbGluZSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vbGluZXMuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVFeHBlbnNlU2hlZXRUaWNrZXRMaW5lID0gYXN5bmMgKFxyXG4gIGZpbGVJZDogc3RyaW5nLFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XHJcbiAgaWYgKCFzYWZlVGV4dChwYXlsb2FkPy5kZXNjcmlwdGlvbikgfHwgIWlzVmFsaWRUaWNrZXRMaW5lQW1vdW50KHBheWxvYWQpKSB7XG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJkZXNjcmlwdGlvbiBhbmQgYSB2YWxpZCBzaWduZWQgdGlja2V0IGxpbmUgYW1vdW50IGFyZSByZXF1aXJlZC5cIik7XG4gIH1cblxyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vbGluZXNgLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIFVwZGF0ZXMgb25lIHRpY2tldCBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9saW5lcy97bGluZVJlY0lkfS5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldExpbmUgPSBhc3luYyAoXHJcbiAgZmlsZUlkOiBzdHJpbmcsXHJcbiAgbGluZVJlY0lkOiBzdHJpbmcgfCBudW1iZXIsXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGluZVJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcclxuICBpZiAoIXNhZmVUZXh0KHBheWxvYWQ/LmRlc2NyaXB0aW9uKSB8fCAhaXNWYWxpZFRpY2tldExpbmVBbW91bnQocGF5bG9hZCkpIHtcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImRlc2NyaXB0aW9uIGFuZCBhIHZhbGlkIHNpZ25lZCB0aWNrZXQgbGluZSBhbW91bnQgYXJlIHJlcXVpcmVkLlwiKTtcbiAgfVxuXHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHNhZmVMaW5lSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGxpbmVSZWNJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+KFxyXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2xpbmVzLyR7c2FmZUxpbmVJZH1gLFxyXG4gICAge1xyXG4gICAgICAuLi5vcHRpb25zLFxyXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBEZWxldGVzIG9uZSB0aWNrZXQgbGluZSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vbGluZXMve2xpbmVSZWNJZH0uXHJcbmV4cG9ydCBjb25zdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRMaW5lID0gYXN5bmMgKFxyXG4gIGZpbGVJZDogc3RyaW5nLFxyXG4gIGxpbmVSZWNJZDogc3RyaW5nIHwgbnVtYmVyLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxudWxsPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCBzYWZlTGluZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhsaW5lUmVjSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxudWxsPj4oXHJcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vbGluZXMvJHtzYWZlTGluZUlkfWAsXHJcbiAgICB7XHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gVXBsb2Fkcy9yZXBsYWNlcyB0aWNrZXQgZmlsZSBjb250ZW50IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9maWxlLlxyXG5leHBvcnQgY29uc3QgdXBsb2FkRXhwZW5zZVNoZWV0VGlja2V0RmlsZSA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICBmaWxlOiBGaWxlIHwgQmxvYixcclxuICBleHRlbnNpb24/OiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3Qgc2FmZUV4dGVuc2lvbiA9IHNhZmVUZXh0KGV4dGVuc2lvbikucmVwbGFjZSgvXlxcLi8sIFwiXCIpO1xyXG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xyXG4gIGlmIChzYWZlRXh0ZW5zaW9uKSB7XHJcbiAgICBxdWVyeS5zZXQoXCJleHRlbnNpb25cIiwgc2FmZUV4dGVuc2lvbik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzdWZmaXggPSBxdWVyeS50b1N0cmluZygpO1xyXG4gIGNvbnN0IHVybCA9IHN1ZmZpeFxyXG4gICAgPyBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vZmlsZT8ke3N1ZmZpeH1gXHJcbiAgICA6IGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9maWxlYDtcclxuICBjb25zdCBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgaWYgKGZpbGUgaW5zdGFuY2VvZiBGaWxlKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcImZpbGVcIiwgZmlsZSwgc2FmZVRleHQoZmlsZS5uYW1lKSB8fCBgdGlja2V0LiR7c2FmZUV4dGVuc2lvbiB8fCBcImpwZ1wifWApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBmb3JtLmFwcGVuZChcImZpbGVcIiwgZmlsZSwgYHRpY2tldC4ke3NhZmVFeHRlbnNpb24gfHwgXCJqcGdcIn1gKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+KHVybCwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VGb3JtSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICAgIGJvZHk6IGZvcm0sXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBEZWxldGVzIHRpY2tldCBmaWxlIGNvbnRlbnQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9L2ZpbGUuXHJcbmV4cG9ydCBjb25zdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRGaWxlID0gYXN5bmMgKFxyXG4gIGZpbGVJZDogc3RyaW5nLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxudWxsPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxudWxsPj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2ZpbGVgLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIkRFTEVURVwiLFxyXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIFNlYXJjaGVzIHByb2plY3RzIGZvciBkcm9wZG93biB1c2FnZSBpbiBmaWx0ZXJzIGFuZCBlZGl0IGZvcm1zLlxyXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlUHJvamVjdHMgPSBhc3luYyAoXG4gIHRlcm06IHN0cmluZyxcbiAgcGFnZTogbnVtYmVyLFxuICBwYWdlU2l6ZTogbnVtYmVyLFxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXG4pOiBQcm9taXNlPFByb2plY3REcm9wZG93blJlc3BvbnNlPiA9PiB7XG4gIGNvbnN0IHNhZmVUZXJtID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyh0ZXJtIHx8IFwiXCIpKTtcbiAgY29uc3Qgc2FmZVBhZ2UgPSBOdW1iZXIuaXNGaW5pdGUocGFnZSkgJiYgcGFnZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2UpIDogMTtcbiAgY29uc3Qgc2FmZVBhZ2VTaXplID0gTnVtYmVyLmlzRmluaXRlKHBhZ2VTaXplKSAmJiBwYWdlU2l6ZSA+IDAgPyBNYXRoLmZsb29yKHBhZ2VTaXplKSA6IDUwO1xuXG4gIHJldHVybiBmZXRjaEpzb248UHJvamVjdERyb3Bkb3duUmVzcG9uc2U+KFxuICAgIGAvYXBpL2NybS9wcm9qZWN0cy9saXN0P2ZpbHRlcj0ke3NhZmVUZXJtfSZwYWdlPSR7c2FmZVBhZ2V9JnBhZ2VTaXplPSR7c2FmZVBhZ2VTaXplfWAsXG4gICAge1xuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLElBQU0sZ0JBQWdCLENBQUssYUFBdUM7QUFDaEUsUUFBTSxNQUFPLFlBQVksQ0FBQztBQUMxQixNQUFJLE1BQU0sUUFBUSxJQUFJLEtBQUssRUFBRyxRQUFPLElBQUk7QUFDekMsTUFBSSxNQUFNLFFBQVEsSUFBSSxLQUFLLEVBQUcsUUFBTyxJQUFJO0FBQ3pDLFNBQU8sQ0FBQztBQUNWO0FBRU8sSUFBTSw2QkFBNkIsQ0FDeEMsYUFDOEM7QUFDOUMsUUFBTSxRQUFRLGNBQWMsUUFBUTtBQUNwQyxRQUFNLGtCQUFrQixNQUFNLElBQUksQ0FBQyxVQUFVO0FBQUEsSUFDM0MsR0FBRztBQUFBLElBQ0gscUJBQXFCLGlCQUFpQixNQUFNLHVCQUF1QixNQUFNLG1CQUFtQjtBQUFBLElBQzVGLGVBQWUsU0FBUyxNQUFNLGlCQUFpQixNQUFNLGFBQWEs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QUFRLEVBQUUsQ0FBQztBQUN0RCxRQUFNLFdBQVcsT0FBTyxTQUFTLElBQUksS0FBSyxPQUFPLElBQUksS0FBSyxNQUFNLElBQUksSUFBSTtBQUN4RSxRQUFNLGVBQWUsT0FBTyxTQUFTLFFBQVEsS0FBSyxXQUFXLElBQUksS0FBSyxNQUFNLFFBQVEsSUFBSTtBQUV4RixTQUFPO0FBQUEsSUFDTCxpQ0FBaUMsUUFBUSxTQUFTLFFBQVEsYUFBYSxZQUFZO0FBQUEsSUFDbkY7QUFBQSxNQUNFLFFBQVE7QUFBQSxNQUNSLEdBQUc7QUFBQSxJQUNMO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogWyJzYWZlVGV4dCIsICJzYWZlVGV4dCIsICJ0b051bGxhYmxlTnVtYmVyIiwgImlzTm9uTmVnYXRpdmVOdW1iZXIiLCAiaXNQb3NpdGl2ZU51bWJlciIsICJub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZSIsICJub3JtYWxpemVUaWNrZXRMaXN0R2FzdG9UeXBlIiwgIm5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzIiwgIm5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZSIsICJub3JtYWxpemVSZXF1aXJlZEFwaURhdGUiLCAibm9ybWFsaXplVGlja2V0TGlzdERhdGUiLCAidG9OdWxsYWJsZUJvb2wiLCAibm9ybWFsaXplT3B0aW9uYWxUaWNrZXRQcm9jZXNzZWRCeUFJIiwgIm5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXIiLCAidG9GbGFnQm9vbCIsICJ0b051bGxhYmxlTnVtYmVyIiwgInNhZmVUZXh0IiwgIm5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlIiwgIm5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplQXBpUmVzcG9uc2UiLCAibm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZSIsICJub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVUaWNrZXRMaW5rTGlzdFBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVUaWNrZXRMaW5rQnVsa1Jlc3BvbnNlIiwgIm1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkIiwgIm1hcEV4cGVuc2VTaGVldEhlYWRlciIsICJtYXBFeHBlbnNlU2hlZXRMaW5lIiwgImlzUG9zaXRpdmVOdW1iZXIiLCAiaXNOb25OZWdhdGl2ZU51bWJlciJdCn0K
