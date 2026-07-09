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
  toExpenseGastoTypeCode,
  toFlagBool,
  toNullableBool,
  toNullableGastoTypeCode,
  toNullableNumber,
  toNullableTicketStatusCode
} from "./chunk-UYN2TXUI.js";
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
} from "./chunk-PNIKV5DC.js";

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
    TotalAmountCurrency: toNullableNumber(
      item?.TotalAmountCurrency ?? item?.totalAmountCurrency
    ),
    TotalAmountMST: toNullableNumber(
      item?.TotalAmountMST ?? item?.totalAmountMST
    ),
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
      TotalAmountCurrency: toNullableNumber(item?.TotalAmountCurrency ?? item?.totalAmountCurrency),
      TotalAmountMST: toNullableNumber(item?.TotalAmountMST ?? item?.totalAmountMST),
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
        TotalAmountCurrency: toNullableNumber(line?.TotalAmountCurrency ?? line?.totalAmountCurrency),
        TotalAmountMST: toNullableNumber(line?.TotalAmountMST ?? line?.totalAmountMST),
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
    TotalAmountCurrency: toNullableNumber(
      item?.TotalAmountCurrency ?? item?.totalAmountCurrency
    ),
    TotalAmountMST: toNullableNumber(
      item?.TotalAmountMST ?? item?.totalAmountMST
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
    TotalAmountCurrency: toNullableNumber(
      item?.TotalAmountCurrency ?? item?.totalAmountCurrency
    ),
    TotalAmountMST: toNullableNumber(
      item?.TotalAmountMST ?? item?.totalAmountMST
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
    TotalAmountCurrency: toNullableNumber(
      item?.TotalAmountCurrency ?? item?.totalAmountCurrency
    ),
    TotalAmountMST: toNullableNumber(
      item?.TotalAmountMST ?? item?.totalAmountMST
    ),
    AmountMST: toNullableNumber(item?.TotalAmountMST ?? item?.AmountMST ?? item?.amountMST),
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

// Web/wwwroot/react/src/pages/gastos/utils/expenseVisibleTotals.ts
function getVisibleReimbursableTotal(row) {
  return row.TotalAmountMST ?? row.AmountMST ?? row.TotalAmountCurrency ?? row.TotalAmount ?? row.Amount ?? null;
}

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
    totalAmount: getVisibleReimbursableTotal({
      TotalAmountMST: toNullableNumber(item.TotalAmountMST),
      TotalAmountCurrency: toNullableNumber(item.TotalAmountCurrency),
      TotalAmount: toNullableNumber(item.TotalAmount)
    }),
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
    totalAmount: getVisibleReimbursableTotal({
      TotalAmountMST: toNullableNumber(sheet.TotalAmountMST ?? sheet.totalAmountMST),
      TotalAmountCurrency: toNullableNumber(sheet.TotalAmountCurrency ?? sheet.totalAmountCurrency),
      TotalAmount: toNullableNumber(sheet.TotalAmount ?? sheet.totalAmount)
    }),
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
    visibleReimbursableTotal: getVisibleReimbursableTotal({
      TotalAmountMST: toNullableNumber(line.TotalAmountMST ?? line.totalAmountMST),
      AmountMST: toNullableNumber(line.AmountMST ?? line.amountMST),
      TotalAmountCurrency: toNullableNumber(line.TotalAmountCurrency ?? line.totalAmountCurrency),
      Amount: toNullableNumber(line.Amount ?? line.amount)
    }),
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
  const userName = safeText3(header.UserName ?? header.userName);
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
    userName,
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
    userName: safeText3(context.userName),
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
    TotalAmount: toNullableNumber2(item.totalAmountCurrency ?? item.totalAmount),
    TotalAmountCurrency: toNullableNumber2(item.totalAmountCurrency ?? item.totalAmount),
    TotalAmountMST: toNullableNumber2(item.totalAmountMST),
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
    typeValue: toExpenseGastoTypeCode(line.typeValue, { allowNone: false }) ?? line.typeValue,
    reimbursableExpense: normalizeExpenseSheetReimbursable(line.reimbursableExpense),
    currencyCode: safeText3(line.currencyCode).toUpperCase() || void 0,
    amountMST: toNullableNumber2(line.amountMST),
    exchRate: toNullableNumber2(line.exchRate)
  }));
  const hasInvalidLinePayload = normalizedLines.some((line) => {
    return !safeText3(line.transDate) || toExpenseGastoTypeCode(line.typeValue, { allowNone: false }) === null || !isPositiveNumber2(line.qty) || !isPositiveNumber2(line.price);
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
  const normalizedTypeValue = toExpenseGastoTypeCode(payload.typeValue, { allowNone: false });
  const normalizedPayload = {
    ...payload,
    transDate: normalizedTransDate,
    typeValue: normalizedTypeValue ?? payload.typeValue,
    reimbursableExpense: normalizeExpenseSheetReimbursable(payload.reimbursableExpense),
    currencyCode: normalizeCurrencyCode(payload.currencyCode) || void 0,
    amountMST: toNullableNumber2(payload.amountMST),
    exchRate: toNullableNumber2(payload.exchRate)
  };
  if (normalizedTypeValue === null || !isPositiveNumber2(normalizedPayload.qty) || !isPositiveNumber2(normalizedPayload.price)) {
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
  getVisibleReimbursableTotal,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlQXBpUmVzcG9uc2VOb3JtYWxpemVycy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VWaXNpYmxlVG90YWxzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZUFwaU1hcHBlcnMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy91dGlscy9leHBlbnNlVWlVdGlscy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL3V0aWxzL2V4cGVuc2VUaWNrZXRMaW5lQW1vdW50LnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdXRpbHMvZXhwZW5zZUFwaS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHR5cGUge1xyXG4gIEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvLFxyXG4gIEV4cGVuc2VTaGVldERldGFpbER0byxcclxuICBFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZUR0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXREZXRhaWxEdG8sXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXN1bHREdG8sXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RJdGVtRHRvLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVzdWx0LFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvLFxyXG4gIEV4cGVuc2VTaGVldExpc3RJdGVtRHRvLFxyXG4gIEluZEFwaVJlc3BvbnNlLFxyXG4gIEluZFBhZ2VkUmVzcG9uc2UsXHJcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIHNhZmVUZXh0LFxyXG4gIHRvTnVsbGFibGVCb29sLFxyXG4gIHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlLFxyXG4gIHRvTnVsbGFibGVOdW1iZXIsXHJcbiAgdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGUsXHJcbn0gZnJvbSBcIi4vZXhwZW5zZUFwaVRyYW5zZm9ybXMudHNcIjtcclxuaW1wb3J0IHsgbm9ybWFsaXplRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVzIH0gZnJvbSBcIi4vZXhwZW5zZVN1Ym9yZGluYXRlTWFwcGVyLnRzXCI7XHJcblxyXG5jb25zdCBnZXRQYWdlZEl0ZW1zID0gPFQsPihyZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxUPik6IFRbXSA9PiB7XHJcbiAgY29uc3QgcmF3ID0gKHJlc3BvbnNlIHx8IHt9KSBhcyB7IEl0ZW1zPzogdW5rbm93bjsgaXRlbXM/OiB1bmtub3duIH07XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkocmF3Lkl0ZW1zKSkgcmV0dXJuIHJhdy5JdGVtcyBhcyBUW107XHJcbiAgaWYgKEFycmF5LmlzQXJyYXkocmF3Lml0ZW1zKSkgcmV0dXJuIHJhdy5pdGVtcyBhcyBUW107XHJcbiAgcmV0dXJuIFtdO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlID0gKFxyXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldExpc3RJdGVtRHRvPlxyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldExpc3RJdGVtRHRvPiA9PiB7XHJcbiAgY29uc3QgaXRlbXMgPSBnZXRQYWdlZEl0ZW1zKHJlc3BvbnNlKTtcclxuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+ICh7XHJcbiAgICAuLi5pdGVtLFxuICAgIFRvdGFsQW1vdW50Q3VycmVuY3k6IHRvTnVsbGFibGVOdW1iZXIoXG4gICAgICAoaXRlbSBhcyB7IFRvdGFsQW1vdW50Q3VycmVuY3k/OiB1bmtub3duOyB0b3RhbEFtb3VudEN1cnJlbmN5PzogdW5rbm93biB9KT8uVG90YWxBbW91bnRDdXJyZW5jeSA/P1xuICAgICAgICAoaXRlbSBhcyB7IHRvdGFsQW1vdW50Q3VycmVuY3k/OiB1bmtub3duIH0pPy50b3RhbEFtb3VudEN1cnJlbmN5XG4gICAgKSxcbiAgICBUb3RhbEFtb3VudE1TVDogdG9OdWxsYWJsZU51bWJlcihcbiAgICAgIChpdGVtIGFzIHsgVG90YWxBbW91bnRNU1Q/OiB1bmtub3duOyB0b3RhbEFtb3VudE1TVD86IHVua25vd24gfSk/LlRvdGFsQW1vdW50TVNUID8/XG4gICAgICAgIChpdGVtIGFzIHsgdG90YWxBbW91bnRNU1Q/OiB1bmtub3duIH0pPy50b3RhbEFtb3VudE1TVFxuICAgICksXG4gICAgUmVpbWJ1cnNhYmxlRXhwZW5zZTogdG9OdWxsYWJsZU51bWJlcihpdGVtPy5SZWltYnVyc2FibGVFeHBlbnNlID8/IGl0ZW0/LnJlaW1idXJzYWJsZUV4cGVuc2UpLFxuICAgIE93bmVyQXhVc2VySWQ6IHNhZmVUZXh0KGl0ZW0/Lk93bmVyQXhVc2VySWQgPz8gaXRlbT8ub3duZXJBeFVzZXJJZCkgfHwgbnVsbCxcclxuICAgIE93bmVyTmFtZTogc2FmZVRleHQoaXRlbT8uT3duZXJOYW1lID8/IGl0ZW0/Lm93bmVyTmFtZSkgfHwgbnVsbCxcclxuICB9KSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAuLi5yZXNwb25zZSxcclxuICAgIEl0ZW1zOiBub3JtYWxpemVkSXRlbXMsXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlID0gKFxyXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldERldGFpbER0bz5cclxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXREZXRhaWxEdG8+ID0+IHtcclxuICBjb25zdCBpdGVtcyA9IGdldFBhZ2VkSXRlbXMocmVzcG9uc2UpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRJdGVtcyA9IGl0ZW1zLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgY29uc3QgcmF3TGluZXMgPSBBcnJheS5pc0FycmF5KGl0ZW0/LkxpbmVzKVxyXG4gICAgICA/IGl0ZW0uTGluZXNcclxuICAgICAgOiAoQXJyYXkuaXNBcnJheShpdGVtPy5saW5lcykgPyBpdGVtLmxpbmVzIDogW10pO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIC4uLml0ZW0sXHJcbiAgICAgIEhvamFHYXN0b3NJZDogc2FmZVRleHQoaXRlbT8uSG9qYUdhc3Rvc0lkID8/IGl0ZW0/LmhvamFHYXN0b3NJZCksXHJcbiAgICAgIFVzZXJJZDogc2FmZVRleHQoaXRlbT8uVXNlcklkID8/IGl0ZW0/LnVzZXJJZCksXHJcbiAgICAgIFVzZXJOYW1lOiBzYWZlVGV4dChpdGVtPy5Vc2VyTmFtZSA/PyBpdGVtPy51c2VyTmFtZSkgfHwgbnVsbCxcclxuICAgICAgT3duZXJBeFVzZXJJZDogc2FmZVRleHQoaXRlbT8uT3duZXJBeFVzZXJJZCA/PyBpdGVtPy5vd25lckF4VXNlcklkKSxcclxuICAgICAgT3duZXJOYW1lOiBzYWZlVGV4dChpdGVtPy5Pd25lck5hbWUgPz8gaXRlbT8ub3duZXJOYW1lKSB8fCBudWxsLFxuICAgICAgVG90YWxBbW91bnRDdXJyZW5jeTogdG9OdWxsYWJsZU51bWJlcihpdGVtPy5Ub3RhbEFtb3VudEN1cnJlbmN5ID8/IGl0ZW0/LnRvdGFsQW1vdW50Q3VycmVuY3kpLFxuICAgICAgVG90YWxBbW91bnRNU1Q6IHRvTnVsbGFibGVOdW1iZXIoaXRlbT8uVG90YWxBbW91bnRNU1QgPz8gaXRlbT8udG90YWxBbW91bnRNU1QpLFxuICAgICAgUmVpbWJ1cnNhYmxlRXhwZW5zZTogdG9OdWxsYWJsZU51bWJlcihpdGVtPy5SZWltYnVyc2FibGVFeHBlbnNlID8/IGl0ZW0/LnJlaW1idXJzYWJsZUV4cGVuc2UpLFxuICAgICAgUHJvaklkOiBzYWZlVGV4dChpdGVtPy5Qcm9qSWQgPz8gaXRlbT8ucHJvaklkKSxcclxuICAgICAgTGluZXM6IHJhd0xpbmVzLm1hcCgobGluZSkgPT4gKHtcclxuICAgICAgICAuLi5saW5lLFxyXG4gICAgICAgIFJlY0lkOiBzYWZlVGV4dChsaW5lPy5SZWNJZCA/PyBsaW5lPy5yZWNJZCksXHJcbiAgICAgICAgTGluZVJlY0lkOiBzYWZlVGV4dChsaW5lPy5MaW5lUmVjSWQgPz8gbGluZT8ubGluZVJlY0lkKSxcclxuICAgICAgICBQcm9qSWQ6IHNhZmVUZXh0KGxpbmU/LlByb2pJZCA/PyBsaW5lPy5wcm9qSWQpLFxyXG4gICAgICAgIFJlaW1idXJzYWJsZUV4cGVuc2U6IHRvTnVsbGFibGVOdW1iZXIobGluZT8uUmVpbWJ1cnNhYmxlRXhwZW5zZSA/PyBsaW5lPy5yZWltYnVyc2FibGVFeHBlbnNlKSxcclxuICAgICAgICBDdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGxpbmU/LkN1cnJlbmN5Q29kZSA/PyBsaW5lPy5jdXJyZW5jeUNvZGUpLFxuICAgICAgICBBbW91bnRNU1Q6IHRvTnVsbGFibGVOdW1iZXIobGluZT8uQW1vdW50TVNUID8/IGxpbmU/LmFtb3VudE1TVCksXG4gICAgICAgIFRvdGFsQW1vdW50Q3VycmVuY3k6IHRvTnVsbGFibGVOdW1iZXIobGluZT8uVG90YWxBbW91bnRDdXJyZW5jeSA/PyBsaW5lPy50b3RhbEFtb3VudEN1cnJlbmN5KSxcbiAgICAgICAgVG90YWxBbW91bnRNU1Q6IHRvTnVsbGFibGVOdW1iZXIobGluZT8uVG90YWxBbW91bnRNU1QgPz8gbGluZT8udG90YWxBbW91bnRNU1QpLFxuICAgICAgICBFeGNoUmF0ZTogdG9OdWxsYWJsZU51bWJlcihsaW5lPy5FeGNoUmF0ZSA/PyBsaW5lPy5leGNoUmF0ZSksXG4gICAgICB9KSksXHJcbiAgICB9O1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgLi4ucmVzcG9uc2UsXHJcbiAgICBJdGVtczogbm9ybWFsaXplZEl0ZW1zLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplQXBpUmVzcG9uc2UgPSA8VD4ocmVzcG9uc2U6IEluZEFwaVJlc3BvbnNlPFQ+KTogSW5kQXBpUmVzcG9uc2U8VD4gPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICAuLi5yZXNwb25zZSxcclxuICAgIEVycm9yczogQXJyYXkuaXNBcnJheShyZXNwb25zZT8uRXJyb3JzKSA/IHJlc3BvbnNlLkVycm9ycyA6IHJlc3BvbnNlPy5FcnJvcnMgPz8gbnVsbCxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVRpY2tldFF1aWNrQ3JlYXRlUmVzcG9uc2UgPSAoXHJcbiAgcmVzcG9uc2U6IEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVzdWx0XHJcbik6IEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVzdWx0ID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG4gIGNvbnN0IHJhd0RhdGEgPSBub3JtYWxpemVkPy5EYXRhO1xyXG4gIGlmICghcmF3RGF0YSB8fCB0eXBlb2YgcmF3RGF0YSAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLi4ubm9ybWFsaXplZCxcclxuICAgICAgSHR0cFN0YXR1czogdHlwZW9mIHJlc3BvbnNlPy5IdHRwU3RhdHVzID09PSBcIm51bWJlclwiID8gcmVzcG9uc2UuSHR0cFN0YXR1cyA6IHVuZGVmaW5lZCxcclxuICAgICAgUmV0cnlBZnRlcjogc2FmZVRleHQocmVzcG9uc2U/LlJldHJ5QWZ0ZXIpIHx8IG51bGwsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmF3U3RlcFRyYWNlSWRzID1cclxuICAgIChyYXdEYXRhIGFzIHsgU3RlcFRyYWNlSWRzPzogdW5rbm93bjsgc3RlcFRyYWNlSWRzPzogdW5rbm93biB9KS5TdGVwVHJhY2VJZHMgPz9cclxuICAgIChyYXdEYXRhIGFzIHsgc3RlcFRyYWNlSWRzPzogdW5rbm93biB9KS5zdGVwVHJhY2VJZHM7XHJcbiAgY29uc3Qgc3RlcFRyYWNlSWRzID0gcmF3U3RlcFRyYWNlSWRzICYmIHR5cGVvZiByYXdTdGVwVHJhY2VJZHMgPT09IFwib2JqZWN0XCIgPyByYXdTdGVwVHJhY2VJZHMgOiBudWxsO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgLi4ubm9ybWFsaXplZCxcclxuICAgIEh0dHBTdGF0dXM6IHR5cGVvZiByZXNwb25zZT8uSHR0cFN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IHJlc3BvbnNlLkh0dHBTdGF0dXMgOiB1bmRlZmluZWQsXHJcbiAgICBSZXRyeUFmdGVyOiBzYWZlVGV4dChyZXNwb25zZT8uUmV0cnlBZnRlcikgfHwgbnVsbCxcclxuICAgIERhdGE6IHtcclxuICAgICAgRmlsZUlkOiBzYWZlVGV4dCgocmF3RGF0YSBhcyB7IEZpbGVJZD86IHVua25vd247IGZpbGVJZD86IHVua25vd24gfSkuRmlsZUlkID8/IChyYXdEYXRhIGFzIHsgZmlsZUlkPzogdW5rbm93biB9KS5maWxlSWQpLFxyXG4gICAgICBVcmxGaWxlOiBzYWZlVGV4dChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IFVybEZpbGU/OiB1bmtub3duOyB1cmxGaWxlPzogdW5rbm93biB9KS5VcmxGaWxlID8/IChyYXdEYXRhIGFzIHsgdXJsRmlsZT86IHVua25vd24gfSkudXJsRmlsZVxyXG4gICAgICApLFxyXG4gICAgICBGaWxlTmFtZTogc2FmZVRleHQoXHJcbiAgICAgICAgKHJhd0RhdGEgYXMgeyBGaWxlTmFtZT86IHVua25vd247IGZpbGVOYW1lPzogdW5rbm93biB9KS5GaWxlTmFtZSA/P1xyXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBmaWxlTmFtZT86IHVua25vd24gfSkuZmlsZU5hbWVcclxuICAgICAgKSxcclxuICAgICAgUHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woXHJcbiAgICAgICAgKHJhd0RhdGEgYXMgeyBQcm9jZXNzZWRCeUFJPzogdW5rbm93bjsgcHJvY2Vzc2VkQnlBST86IHVua25vd24gfSkuUHJvY2Vzc2VkQnlBSSA/P1xyXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KS5wcm9jZXNzZWRCeUFJXHJcbiAgICAgICksXHJcbiAgICAgIExpbmtlZFRvU2hlZXQ6XHJcbiAgICAgICAgdG9OdWxsYWJsZUJvb2woXHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IExpbmtlZFRvU2hlZXQ/OiB1bmtub3duOyBsaW5rZWRUb1NoZWV0PzogdW5rbm93biB9KS5MaW5rZWRUb1NoZWV0ID8/XHJcbiAgICAgICAgICAgIChyYXdEYXRhIGFzIHsgbGlua2VkVG9TaGVldD86IHVua25vd24gfSkubGlua2VkVG9TaGVldFxyXG4gICAgICAgICkgPT09IHRydWUsXHJcbiAgICAgIEhvamFHYXN0b3NJZDpcclxuICAgICAgICBzYWZlVGV4dChcclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgSG9qYUdhc3Rvc0lkPzogdW5rbm93bjsgaG9qYUdhc3Rvc0lkPzogdW5rbm93biB9KS5Ib2phR2FzdG9zSWQgPz9cclxuICAgICAgICAgICAgKHJhd0RhdGEgYXMgeyBob2phR2FzdG9zSWQ/OiB1bmtub3duIH0pLmhvamFHYXN0b3NJZFxyXG4gICAgICAgICkgfHwgbnVsbCxcclxuICAgICAgQ29tcGxldGVkU3RhZ2U6IHNhZmVUZXh0KFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgQ29tcGxldGVkU3RhZ2U/OiB1bmtub3duOyBjb21wbGV0ZWRTdGFnZT86IHVua25vd24gfSkuQ29tcGxldGVkU3RhZ2UgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgY29tcGxldGVkU3RhZ2U/OiB1bmtub3duIH0pLmNvbXBsZXRlZFN0YWdlXHJcbiAgICAgICksXHJcbiAgICAgIFN0ZXBUcmFjZUlkczogc3RlcFRyYWNlSWRzXHJcbiAgICAgICAgPyB7XHJcbiAgICAgICAgICAgIFRpY2tldENyZWF0ZTogc2FmZVRleHQoXHJcbiAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IFRpY2tldENyZWF0ZT86IHVua25vd247IHRpY2tldENyZWF0ZT86IHVua25vd24gfSkuVGlja2V0Q3JlYXRlID8/XHJcbiAgICAgICAgICAgICAgICAoc3RlcFRyYWNlSWRzIGFzIHsgdGlja2V0Q3JlYXRlPzogdW5rbm93biB9KS50aWNrZXRDcmVhdGVcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgRmlsZVVwbG9hZDogc2FmZVRleHQoXHJcbiAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IEZpbGVVcGxvYWQ/OiB1bmtub3duOyBmaWxlVXBsb2FkPzogdW5rbm93biB9KS5GaWxlVXBsb2FkID8/XHJcbiAgICAgICAgICAgICAgICAoc3RlcFRyYWNlSWRzIGFzIHsgZmlsZVVwbG9hZD86IHVua25vd24gfSkuZmlsZVVwbG9hZFxyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBEcmFmdEV4dHJhY3Q6IHNhZmVUZXh0KFxyXG4gICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyBEcmFmdEV4dHJhY3Q/OiB1bmtub3duOyBkcmFmdEV4dHJhY3Q/OiB1bmtub3duIH0pLkRyYWZ0RXh0cmFjdCA/P1xyXG4gICAgICAgICAgICAgICAgKHN0ZXBUcmFjZUlkcyBhcyB7IGRyYWZ0RXh0cmFjdD86IHVua25vd24gfSkuZHJhZnRFeHRyYWN0XHJcbiAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIFRpY2tldEZpbmFsaXplOiBzYWZlVGV4dChcclxuICAgICAgICAgICAgICAoc3RlcFRyYWNlSWRzIGFzIHsgVGlja2V0RmluYWxpemU/OiB1bmtub3duOyB0aWNrZXRGaW5hbGl6ZT86IHVua25vd24gfSkuVGlja2V0RmluYWxpemUgPz9cclxuICAgICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyB0aWNrZXRGaW5hbGl6ZT86IHVua25vd24gfSkudGlja2V0RmluYWxpemVcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgU2hlZXRMaW5rOiBzYWZlVGV4dChcclxuICAgICAgICAgICAgICAoc3RlcFRyYWNlSWRzIGFzIHsgU2hlZXRMaW5rPzogdW5rbm93bjsgc2hlZXRMaW5rPzogdW5rbm93biB9KS5TaGVldExpbmsgPz9cclxuICAgICAgICAgICAgICAgIChzdGVwVHJhY2VJZHMgYXMgeyBzaGVldExpbms/OiB1bmtub3duIH0pLnNoZWV0TGlua1xyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIDogbnVsbCxcclxuICAgIH0sXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2UgPSAoXHJcbiAgcmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+XHJcbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+ID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgLi4ucmVzcG9uc2UsXHJcbiAgICBJdGVtczogZ2V0UGFnZWRJdGVtcyhyZXNwb25zZSksXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlID0gKFxyXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPHVua25vd24+XHJcbik6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG8+ID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBub3JtYWxpemVFeHBlbnNlU2hlZXRTdWJvcmRpbmF0ZXMocmVzcG9uc2U/Lkl0ZW1zKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnJlc3BvbnNlLFxyXG4gICAgSXRlbXM6IG5vcm1hbGl6ZWRJdGVtcyxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlID0gKFxyXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvPlxyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpc3RJdGVtRHRvPiA9PiB7XHJcbiAgY29uc3QgaXRlbXMgPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5JdGVtcykgPyByZXNwb25zZS5JdGVtcyA6IFtdO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRJdGVtcyA9IGl0ZW1zLm1hcCgoaXRlbSkgPT4gKHtcclxuICAgIC4uLml0ZW0sXHJcbiAgICBTdGF0dXM6IHRvTnVsbGFibGVUaWNrZXRTdGF0dXNDb2RlKFxyXG4gICAgICAoaXRlbSBhcyB7IFN0YXR1cz86IHVua25vd247IHN0YXR1cz86IHVua25vd24gfSk/LlN0YXR1cyA/P1xyXG4gICAgICAgIChpdGVtIGFzIHsgU3RhdHVzPzogdW5rbm93bjsgc3RhdHVzPzogdW5rbm93biB9KT8uc3RhdHVzXHJcbiAgICApLFxyXG4gICAgUHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woXG4gICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8uUHJvY2Vzc2VkQnlBSSA/P1xyXG4gICAgICAgIChpdGVtIGFzIHsgUHJvY2Vzc2VkQnlBST86IHVua25vd247IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pPy5wcm9jZXNzZWRCeUFJXHJcbiAgICApLFxuICAgIFRvdGFsQW1vdW50Q3VycmVuY3k6IHRvTnVsbGFibGVOdW1iZXIoXG4gICAgICAoaXRlbSBhcyB7IFRvdGFsQW1vdW50Q3VycmVuY3k/OiB1bmtub3duOyB0b3RhbEFtb3VudEN1cnJlbmN5PzogdW5rbm93biB9KT8uVG90YWxBbW91bnRDdXJyZW5jeSA/P1xuICAgICAgICAoaXRlbSBhcyB7IHRvdGFsQW1vdW50Q3VycmVuY3k/OiB1bmtub3duIH0pPy50b3RhbEFtb3VudEN1cnJlbmN5XG4gICAgKSxcbiAgICBUb3RhbEFtb3VudE1TVDogdG9OdWxsYWJsZU51bWJlcihcbiAgICAgIChpdGVtIGFzIHsgVG90YWxBbW91bnRNU1Q/OiB1bmtub3duOyB0b3RhbEFtb3VudE1TVD86IHVua25vd24gfSk/LlRvdGFsQW1vdW50TVNUID8/XG4gICAgICAgIChpdGVtIGFzIHsgdG90YWxBbW91bnRNU1Q/OiB1bmtub3duIH0pPy50b3RhbEFtb3VudE1TVFxuICAgICksXG4gICAgR2FzdG9UeXBlOiB0b051bGxhYmxlR2FzdG9UeXBlQ29kZShcbiAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uR2FzdG9UeXBlID8/XHJcbiAgICAgICAgKGl0ZW0gYXMgeyBHYXN0b1R5cGU/OiB1bmtub3duOyBnYXN0b1R5cGU/OiB1bmtub3duIH0pPy5nYXN0b1R5cGVcclxuICAgICksXHJcbiAgICBPd25lckF4VXNlcklkOiBzYWZlVGV4dChcclxuICAgICAgKGl0ZW0gYXMgeyBPd25lckF4VXNlcklkPzogdW5rbm93bjsgb3duZXJBeFVzZXJJZD86IHVua25vd24gfSk/Lk93bmVyQXhVc2VySWQgPz9cclxuICAgICAgICAoaXRlbSBhcyB7IE93bmVyQXhVc2VySWQ/OiB1bmtub3duOyBvd25lckF4VXNlcklkPzogdW5rbm93biB9KT8ub3duZXJBeFVzZXJJZFxyXG4gICAgKSxcclxuICAgIE93bmVyTmFtZTogc2FmZVRleHQoXHJcbiAgICAgIChpdGVtIGFzIHsgT3duZXJOYW1lPzogdW5rbm93bjsgb3duZXJOYW1lPzogdW5rbm93biB9KT8uT3duZXJOYW1lID8/XHJcbiAgICAgICAgKGl0ZW0gYXMgeyBPd25lck5hbWU/OiB1bmtub3duOyBvd25lck5hbWU/OiB1bmtub3duIH0pPy5vd25lck5hbWVcclxuICAgICkgfHwgbnVsbCxcclxuICB9KSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAuLi5yZXNwb25zZSxcclxuICAgIEl0ZW1zOiBub3JtYWxpemVkSXRlbXMsXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVUaWNrZXRMaW5rTGlzdFBhZ2VkUmVzcG9uc2UgPSAoXHJcbiAgcmVzcG9uc2U6IEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RJdGVtRHRvPlxyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0bz4gPT4ge1xyXG4gIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShyZXNwb25zZT8uSXRlbXMpID8gcmVzcG9uc2UuSXRlbXMgOiBbXTtcclxuICBjb25zdCBub3JtYWxpemVkSXRlbXMgPSBpdGVtcy5tYXAoKGl0ZW0pID0+ICh7XHJcbiAgICAuLi5pdGVtLFxyXG4gICAgUHJvY2Vzc2VkQnlBSTogdG9OdWxsYWJsZUJvb2woXG4gICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8uUHJvY2Vzc2VkQnlBSSA/P1xyXG4gICAgICAgIChpdGVtIGFzIHsgUHJvY2Vzc2VkQnlBST86IHVua25vd247IHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duIH0pPy5wcm9jZXNzZWRCeUFJXHJcbiAgICApLFxuICAgIFRvdGFsQW1vdW50Q3VycmVuY3k6IHRvTnVsbGFibGVOdW1iZXIoXG4gICAgICAoaXRlbSBhcyB7IFRvdGFsQW1vdW50Q3VycmVuY3k/OiB1bmtub3duOyB0b3RhbEFtb3VudEN1cnJlbmN5PzogdW5rbm93biB9KT8uVG90YWxBbW91bnRDdXJyZW5jeSA/P1xuICAgICAgICAoaXRlbSBhcyB7IHRvdGFsQW1vdW50Q3VycmVuY3k/OiB1bmtub3duIH0pPy50b3RhbEFtb3VudEN1cnJlbmN5XG4gICAgKSxcbiAgICBUb3RhbEFtb3VudE1TVDogdG9OdWxsYWJsZU51bWJlcihcbiAgICAgIChpdGVtIGFzIHsgVG90YWxBbW91bnRNU1Q/OiB1bmtub3duOyB0b3RhbEFtb3VudE1TVD86IHVua25vd24gfSk/LlRvdGFsQW1vdW50TVNUID8/XG4gICAgICAgIChpdGVtIGFzIHsgdG90YWxBbW91bnRNU1Q/OiB1bmtub3duIH0pPy50b3RhbEFtb3VudE1TVFxuICAgICksXG4gICAgR2FzdG9UeXBlOiB0b051bGxhYmxlR2FzdG9UeXBlQ29kZShcbiAgICAgIChpdGVtIGFzIHsgR2FzdG9UeXBlPzogdW5rbm93bjsgZ2FzdG9UeXBlPzogdW5rbm93biB9KT8uR2FzdG9UeXBlID8/XHJcbiAgICAgICAgKGl0ZW0gYXMgeyBHYXN0b1R5cGU/OiB1bmtub3duOyBnYXN0b1R5cGU/OiB1bmtub3duIH0pPy5nYXN0b1R5cGVcclxuICAgICksXHJcbiAgICBPd25lckF4VXNlcklkOiBzYWZlVGV4dChcclxuICAgICAgKGl0ZW0gYXMgeyBPd25lckF4VXNlcklkPzogdW5rbm93bjsgb3duZXJBeFVzZXJJZD86IHVua25vd24gfSk/Lk93bmVyQXhVc2VySWQgPz9cclxuICAgICAgICAoaXRlbSBhcyB7IE93bmVyQXhVc2VySWQ/OiB1bmtub3duOyBvd25lckF4VXNlcklkPzogdW5rbm93biB9KT8ub3duZXJBeFVzZXJJZFxyXG4gICAgKSxcclxuICAgIE93bmVyTmFtZTogc2FmZVRleHQoXHJcbiAgICAgIChpdGVtIGFzIHsgT3duZXJOYW1lPzogdW5rbm93bjsgb3duZXJOYW1lPzogdW5rbm93biB9KT8uT3duZXJOYW1lID8/XHJcbiAgICAgICAgKGl0ZW0gYXMgeyBPd25lck5hbWU/OiB1bmtub3duOyBvd25lck5hbWU/OiB1bmtub3duIH0pPy5vd25lck5hbWVcclxuICAgICkgfHwgbnVsbCxcclxuICB9KSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICAuLi5yZXNwb25zZSxcclxuICAgIEl0ZW1zOiBub3JtYWxpemVkSXRlbXMsXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlID0gKFxyXG4gIHJlc3BvbnNlOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldERldGFpbER0bz5cclxuKTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXREZXRhaWxEdG8+ID0+IHtcclxuICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2U/Lkl0ZW1zKSA/IHJlc3BvbnNlLkl0ZW1zIDogW107XHJcbiAgY29uc3Qgbm9ybWFsaXplZEl0ZW1zID0gaXRlbXMubWFwKChpdGVtKSA9PiAoe1xyXG4gICAgLi4uaXRlbSxcclxuICAgIFN0YXR1czogdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGUoXHJcbiAgICAgIChpdGVtIGFzIHsgU3RhdHVzPzogdW5rbm93bjsgc3RhdHVzPzogdW5rbm93biB9KT8uU3RhdHVzID8/XHJcbiAgICAgICAgKGl0ZW0gYXMgeyBTdGF0dXM/OiB1bmtub3duOyBzdGF0dXM/OiB1bmtub3duIH0pPy5zdGF0dXNcclxuICAgICksXHJcbiAgICBQcm9jZXNzZWRCeUFJOiB0b051bGxhYmxlQm9vbChcclxuICAgICAgKGl0ZW0gYXMgeyBQcm9jZXNzZWRCeUFJPzogdW5rbm93bjsgcHJvY2Vzc2VkQnlBST86IHVua25vd24gfSk/LlByb2Nlc3NlZEJ5QUkgPz9cclxuICAgICAgICAoaXRlbSBhcyB7IFByb2Nlc3NlZEJ5QUk/OiB1bmtub3duOyBwcm9jZXNzZWRCeUFJPzogdW5rbm93biB9KT8ucHJvY2Vzc2VkQnlBSVxyXG4gICAgKSxcclxuICAgIEhvamFHYXN0b3NJZERpc3BsYXk6IHNhZmVUZXh0KFxuICAgICAgKGl0ZW0gYXMgeyBIb2phR2FzdG9zSWREaXNwbGF5PzogdW5rbm93bjsgaG9qYUdhc3Rvc0lkRGlzcGxheT86IHVua25vd24gfSk/LkhvamFHYXN0b3NJZERpc3BsYXkgPz9cclxuICAgICAgICAoaXRlbSBhcyB7IEhvamFHYXN0b3NJZERpc3BsYXk/OiB1bmtub3duOyBob2phR2FzdG9zSWREaXNwbGF5PzogdW5rbm93biB9KT8uaG9qYUdhc3Rvc0lkRGlzcGxheVxyXG4gICAgKSxcbiAgICBUb3RhbEFtb3VudEN1cnJlbmN5OiB0b051bGxhYmxlTnVtYmVyKFxuICAgICAgKGl0ZW0gYXMgeyBUb3RhbEFtb3VudEN1cnJlbmN5PzogdW5rbm93bjsgdG90YWxBbW91bnRDdXJyZW5jeT86IHVua25vd24gfSk/LlRvdGFsQW1vdW50Q3VycmVuY3kgPz9cbiAgICAgICAgKGl0ZW0gYXMgeyB0b3RhbEFtb3VudEN1cnJlbmN5PzogdW5rbm93biB9KT8udG90YWxBbW91bnRDdXJyZW5jeVxuICAgICksXG4gICAgVG90YWxBbW91bnRNU1Q6IHRvTnVsbGFibGVOdW1iZXIoXG4gICAgICAoaXRlbSBhcyB7IFRvdGFsQW1vdW50TVNUPzogdW5rbm93bjsgdG90YWxBbW91bnRNU1Q/OiB1bmtub3duIH0pPy5Ub3RhbEFtb3VudE1TVCA/P1xuICAgICAgICAoaXRlbSBhcyB7IHRvdGFsQW1vdW50TVNUPzogdW5rbm93biB9KT8udG90YWxBbW91bnRNU1RcbiAgICApLFxuICAgIEFtb3VudE1TVDogdG9OdWxsYWJsZU51bWJlcihpdGVtPy5Ub3RhbEFtb3VudE1TVCA/PyBpdGVtPy5BbW91bnRNU1QgPz8gaXRlbT8uYW1vdW50TVNUKSxcbiAgICBHYXN0b1R5cGU6IHRvTnVsbGFibGVHYXN0b1R5cGVDb2RlKFxuICAgICAgKGl0ZW0gYXMgeyBHYXN0b1R5cGU/OiB1bmtub3duOyBnYXN0b1R5cGU/OiB1bmtub3duIH0pPy5HYXN0b1R5cGUgPz9cclxuICAgICAgICAoaXRlbSBhcyB7IEdhc3RvVHlwZT86IHVua25vd247IGdhc3RvVHlwZT86IHVua25vd24gfSk/Lmdhc3RvVHlwZVxyXG4gICAgKSxcclxuICAgIE93bmVyQXhVc2VySWQ6IHNhZmVUZXh0KFxyXG4gICAgICAoaXRlbSBhcyB7IE93bmVyQXhVc2VySWQ/OiB1bmtub3duOyBvd25lckF4VXNlcklkPzogdW5rbm93biB9KT8uT3duZXJBeFVzZXJJZCA/P1xyXG4gICAgICAgIChpdGVtIGFzIHsgT3duZXJBeFVzZXJJZD86IHVua25vd247IG93bmVyQXhVc2VySWQ/OiB1bmtub3duIH0pPy5vd25lckF4VXNlcklkXHJcbiAgICApLFxyXG4gICAgT3duZXJOYW1lOiBzYWZlVGV4dChcclxuICAgICAgKGl0ZW0gYXMgeyBPd25lck5hbWU/OiB1bmtub3duOyBvd25lck5hbWU/OiB1bmtub3duIH0pPy5Pd25lck5hbWUgPz9cclxuICAgICAgICAoaXRlbSBhcyB7IE93bmVyTmFtZT86IHVua25vd247IG93bmVyTmFtZT86IHVua25vd24gfSk/Lm93bmVyTmFtZVxyXG4gICAgKSB8fCBudWxsLFxyXG4gICAgT2NySnNvbjogc2FmZVRleHQoaXRlbT8uT2NySnNvbiA/PyBpdGVtPy5vY3JKc29uKSB8fCBudWxsLFxyXG4gICAgTm9ybWFsaXplZEpzb246IHNhZmVUZXh0KGl0ZW0/Lk5vcm1hbGl6ZWRKc29uID8/IGl0ZW0/Lm5vcm1hbGl6ZWRKc29uKSB8fCBudWxsLFxyXG4gICAgTGluZXM6IEFycmF5LmlzQXJyYXkoaXRlbT8uTGluZXMpID8gaXRlbS5MaW5lcyA6IFtdLFxyXG4gIH0pKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLnJlc3BvbnNlLFxyXG4gICAgSXRlbXM6IG5vcm1hbGl6ZWRJdGVtcyxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZVRpY2tldExpbmtCdWxrUmVzcG9uc2UgPSAoXHJcbiAgcmVzcG9uc2U6IEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvPlxyXG4pOiBJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0bz4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgY29uc3QgcmF3RGF0YSA9IG5vcm1hbGl6ZWQ/LkRhdGE7XHJcbiAgaWYgKCFyYXdEYXRhIHx8IHR5cGVvZiByYXdEYXRhICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICByZXR1cm4gbm9ybWFsaXplZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHRvSXNzdWVMaXN0ID0gKHZhbHVlOiB1bmtub3duKSA9PiB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gW107XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlLm1hcCgoZW50cnkpID0+ICh7XHJcbiAgICAgIHRpY2tldElkOiBzYWZlVGV4dChcclxuICAgICAgICAoZW50cnkgYXMgeyB0aWNrZXRJZD86IHVua25vd247IFRpY2tldElkPzogdW5rbm93biB9KT8udGlja2V0SWQgPz9cclxuICAgICAgICAgIChlbnRyeSBhcyB7IFRpY2tldElkPzogdW5rbm93biB9KS5UaWNrZXRJZFxyXG4gICAgICApLFxyXG4gICAgICByZWFzb246IHNhZmVUZXh0KFxyXG4gICAgICAgIChlbnRyeSBhcyB7IHJlYXNvbj86IHVua25vd247IFJlYXNvbj86IHVua25vd24gfSk/LnJlYXNvbiA/P1xyXG4gICAgICAgICAgKGVudHJ5IGFzIHsgUmVhc29uPzogdW5rbm93biB9KS5SZWFzb25cclxuICAgICAgKSxcclxuICAgIH0pKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBsaW5rZWRUaWNrZXRJZHNSYXcgPVxyXG4gICAgKHJhd0RhdGEgYXMgeyBsaW5rZWRUaWNrZXRJZHM/OiB1bmtub3duOyBMaW5rZWRUaWNrZXRJZHM/OiB1bmtub3duIH0pLmxpbmtlZFRpY2tldElkcyA/P1xyXG4gICAgKHJhd0RhdGEgYXMgeyBMaW5rZWRUaWNrZXRJZHM/OiB1bmtub3duIH0pLkxpbmtlZFRpY2tldElkcztcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLm5vcm1hbGl6ZWQsXHJcbiAgICBEYXRhOiB7XHJcbiAgICAgIGV4cGVuc2VTaGVldElkOiBzYWZlVGV4dChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IGV4cGVuc2VTaGVldElkPzogdW5rbm93bjsgRXhwZW5zZVNoZWV0SWQ/OiB1bmtub3duIH0pLmV4cGVuc2VTaGVldElkID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IEV4cGVuc2VTaGVldElkPzogdW5rbm93biB9KS5FeHBlbnNlU2hlZXRJZFxyXG4gICAgICApLFxyXG4gICAgICByZXF1ZXN0ZWRDb3VudDogdG9OdWxsYWJsZU51bWJlcihcclxuICAgICAgICAocmF3RGF0YSBhcyB7IHJlcXVlc3RlZENvdW50PzogdW5rbm93bjsgUmVxdWVzdGVkQ291bnQ/OiB1bmtub3duIH0pLnJlcXVlc3RlZENvdW50ID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IFJlcXVlc3RlZENvdW50PzogdW5rbm93biB9KS5SZXF1ZXN0ZWRDb3VudFxyXG4gICAgICApID8/IDAsXHJcbiAgICAgIGxpbmtlZENvdW50OiB0b051bGxhYmxlTnVtYmVyKFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgbGlua2VkQ291bnQ/OiB1bmtub3duOyBMaW5rZWRDb3VudD86IHVua25vd24gfSkubGlua2VkQ291bnQgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgTGlua2VkQ291bnQ/OiB1bmtub3duIH0pLkxpbmtlZENvdW50XHJcbiAgICAgICkgPz8gMCxcclxuICAgICAgc2tpcHBlZENvdW50OiB0b051bGxhYmxlTnVtYmVyKFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgc2tpcHBlZENvdW50PzogdW5rbm93bjsgU2tpcHBlZENvdW50PzogdW5rbm93biB9KS5za2lwcGVkQ291bnQgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgU2tpcHBlZENvdW50PzogdW5rbm93biB9KS5Ta2lwcGVkQ291bnRcclxuICAgICAgKSA/PyAwLFxyXG4gICAgICBmYWlsZWRDb3VudDogdG9OdWxsYWJsZU51bWJlcihcclxuICAgICAgICAocmF3RGF0YSBhcyB7IGZhaWxlZENvdW50PzogdW5rbm93bjsgRmFpbGVkQ291bnQ/OiB1bmtub3duIH0pLmZhaWxlZENvdW50ID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IEZhaWxlZENvdW50PzogdW5rbm93biB9KS5GYWlsZWRDb3VudFxyXG4gICAgICApID8/IDAsXHJcbiAgICAgIGxpbmtlZFRpY2tldElkczogQXJyYXkuaXNBcnJheShsaW5rZWRUaWNrZXRJZHNSYXcpXHJcbiAgICAgICAgPyBsaW5rZWRUaWNrZXRJZHNSYXcubWFwKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnkpKS5maWx0ZXIoQm9vbGVhbilcclxuICAgICAgICA6IFtdLFxyXG4gICAgICBza2lwcGVkOiB0b0lzc3VlTGlzdChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IHNraXBwZWQ/OiB1bmtub3duOyBTa2lwcGVkPzogdW5rbm93biB9KS5za2lwcGVkID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IFNraXBwZWQ/OiB1bmtub3duIH0pLlNraXBwZWRcclxuICAgICAgKSxcclxuICAgICAgZmFpbGVkOiB0b0lzc3VlTGlzdChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IGZhaWxlZD86IHVua25vd247IEZhaWxlZD86IHVua25vd24gfSkuZmFpbGVkID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IEZhaWxlZD86IHVua25vd24gfSkuRmFpbGVkXHJcbiAgICAgICksXHJcbiAgICB9LFxyXG4gIH07XHJcbn07XHJcbiIsICIvLyBTZWxlY3RzIHRoZSByZWltYnVyc2FibGUgYW1vdW50IHRoYXQgc2hvdWxkIGJlIHZpc2libGUgaW4gZXhwZW5zZSBzdW1tYXJpZXMuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmlzaWJsZVJlaW1idXJzYWJsZVRvdGFsKHJvdzoge1xuICBUb3RhbEFtb3VudE1TVD86IG51bWJlciB8IG51bGw7XG4gIEFtb3VudE1TVD86IG51bWJlciB8IG51bGw7XG4gIFRvdGFsQW1vdW50Q3VycmVuY3k/OiBudW1iZXIgfCBudWxsO1xuICBUb3RhbEFtb3VudD86IG51bWJlciB8IG51bGw7XG4gIEFtb3VudD86IG51bWJlciB8IG51bGw7XG59KSB7XG4gIHJldHVybiByb3cuVG90YWxBbW91bnRNU1RcbiAgICA/PyByb3cuQW1vdW50TVNUXG4gICAgPz8gcm93LlRvdGFsQW1vdW50Q3VycmVuY3lcbiAgICA/PyByb3cuVG90YWxBbW91bnRcbiAgICA/PyByb3cuQW1vdW50XG4gICAgPz8gbnVsbDtcbn1cbiIsICJcdUZFRkZpbXBvcnQgdHlwZSB7XHJcbiAgRXhwZW5zZVNoZWV0Q2FyZCxcclxuICBFeHBlbnNlU2hlZXREZXRhaWxEdG8sXHJcbiAgRXhwZW5zZVNoZWV0SGVhZGVyLFxyXG4gIEV4cGVuc2VTaGVldExpbmUsXHJcbiAgRXhwZW5zZVNoZWV0TGluZUR0byxcclxuICBFeHBlbnNlU2hlZXRMaXN0SXRlbUR0byxcclxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0LCB0b051bGxhYmxlQm9vbCwgdG9OdWxsYWJsZU51bWJlciB9IGZyb20gXCIuL2V4cGVuc2VBcGlUcmFuc2Zvcm1zLnRzXCI7XG5pbXBvcnQgeyBnZXRFeHBlbnNlR2FzdG9UeXBlT3B0aW9ucyB9IGZyb20gXCIuLi9jb25zdGFudHMvZXhwZW5zZUdhc3RvVHlwZUNhdGFsb2cudHNcIjtcbmltcG9ydCB7IGdldFZpc2libGVSZWltYnVyc2FibGVUb3RhbCB9IGZyb20gXCIuL2V4cGVuc2VWaXNpYmxlVG90YWxzLnRzXCI7XG5cclxuY29uc3QgcmVzb2x2ZVR5cGVMYWJlbCA9ICh0eXBlVmFsdWVDb2RlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICghdHlwZVZhbHVlQ29kZSkge1xyXG4gICAgcmV0dXJuIHR5cGVWYWx1ZUNvZGU7XHJcbiAgfVxyXG5cclxuICBjb25zdCBtYXRjaCA9IGdldEV4cGVuc2VHYXN0b1R5cGVPcHRpb25zKCkuZmluZCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5LnZhbHVlKSA9PT0gdHlwZVZhbHVlQ29kZSk7XHJcblxyXG4gIHJldHVybiBzYWZlVGV4dChtYXRjaD8udGV4dCkgfHwgdHlwZVZhbHVlQ29kZTtcclxufTtcclxuXHJcbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9saXN0IGl0ZW0gY29udHJhY3QgdG8gbGlzdCBjYXJkIFVJIG1vZGVsLlxyXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmQgPSAoaXRlbTogRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG8pOiBFeHBlbnNlU2hlZXRDYXJkID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgaG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChpdGVtLkhvamFHYXN0b3NJZCksXHJcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQoaXRlbS5EZXNjcmlwdGlvbiksXHJcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5FeHBlbnNlU2hlZXRTdGF0dXMpLFxyXG4gICAgZXN0YWRvQ29tZW50YXJpb3M6IHNhZmVUZXh0KGl0ZW0uRXN0YWRvQ29tZW50YXJpb3MpIHx8IG51bGwsXHJcbiAgICB1c2VySWQ6IHNhZmVUZXh0KGl0ZW0uVXNlcklkKSxcclxuICAgIHVzZXJOYW1lOiBzYWZlVGV4dChpdGVtLlVzZXJOYW1lKSB8fCBudWxsLFxyXG4gICAgb3duZXJBeFVzZXJJZDogc2FmZVRleHQoaXRlbS5Pd25lckF4VXNlcklkID8/IGl0ZW0ub3duZXJBeFVzZXJJZCksXHJcbiAgICBvd25lck5hbWU6IHNhZmVUZXh0KGl0ZW0uT3duZXJOYW1lID8/IGl0ZW0ub3duZXJOYW1lKSB8fCBudWxsLFxyXG4gICAgdm91Y2hlcjogc2FmZVRleHQoaXRlbS5Wb3VjaGVyKSxcclxuICAgIHByb2pJZDogc2FmZVRleHQoaXRlbS5Qcm9qSWQpLFxyXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChpdGVtLkN1cnJlbmN5Q29kZSksXHJcbiAgICB0b3RhbEFtb3VudDogZ2V0VmlzaWJsZVJlaW1idXJzYWJsZVRvdGFsKHtcbiAgICAgIFRvdGFsQW1vdW50TVNUOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uVG90YWxBbW91bnRNU1QpLFxuICAgICAgVG90YWxBbW91bnRDdXJyZW5jeTogdG9OdWxsYWJsZU51bWJlcihpdGVtLlRvdGFsQW1vdW50Q3VycmVuY3kpLFxuICAgICAgVG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5Ub3RhbEFtb3VudCksXG4gICAgfSksXG4gICAgZXhjaFJhdGU6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5FeGNoUmF0ZSksXHJcbiAgICBleGNoYW5nZVJhdGVNb2RlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uRXhjaGFuZ2VSYXRlTW9kZSksXHJcbiAgICByZWltYnVyc2FibGVFeHBlbnNlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uUmVpbWJ1cnNhYmxlRXhwZW5zZSA/PyBpdGVtLnJlaW1idXJzYWJsZUV4cGVuc2UpLFxyXG4gICAgY3JlYXRlZERhdGU6IHNhZmVUZXh0KGl0ZW0uQ3JlYXRlZERhdGUpLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBNYXBzIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0gaGVhZGVyIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxyXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0SGVhZGVyID0gKHNoZWV0OiBFeHBlbnNlU2hlZXREZXRhaWxEdG8pOiBFeHBlbnNlU2hlZXRIZWFkZXIgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBob2phR2FzdG9zSWQ6IHNhZmVUZXh0KHNoZWV0LkhvamFHYXN0b3NJZCA/PyBzaGVldC5ob2phR2FzdG9zSWQpLFxyXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KHNoZWV0LkRlc2NyaXB0aW9uID8/IHNoZWV0LmRlc2NyaXB0aW9uKSxcclxuICAgIHVzZXJJZDogc2FmZVRleHQoc2hlZXQuVXNlcklkID8/IHNoZWV0LnVzZXJJZCksXHJcbiAgICB1c2VyTmFtZTogc2FmZVRleHQoc2hlZXQuVXNlck5hbWUgPz8gc2hlZXQudXNlck5hbWUpIHx8IG51bGwsXHJcbiAgICBvd25lckF4VXNlcklkOiBzYWZlVGV4dChzaGVldC5Pd25lckF4VXNlcklkID8/IHNoZWV0Lm93bmVyQXhVc2VySWQpLFxyXG4gICAgb3duZXJOYW1lOiBzYWZlVGV4dChzaGVldC5Pd25lck5hbWUgPz8gc2hlZXQub3duZXJOYW1lKSB8fCBudWxsLFxyXG4gICAgZXhwZW5zZVNoZWV0U3RhdHVzOiB0b051bGxhYmxlTnVtYmVyKHNoZWV0LkV4cGVuc2VTaGVldFN0YXR1cyA/PyBzaGVldC5leHBlbnNlU2hlZXRTdGF0dXMpLFxyXG4gICAgZXN0YWRvQ29tZW50YXJpb3M6IHNhZmVUZXh0KHNoZWV0LkVzdGFkb0NvbWVudGFyaW9zID8/IHNoZWV0LmVzdGFkb0NvbWVudGFyaW9zKSB8fCBudWxsLFxyXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChzaGVldC5DdXJyZW5jeUNvZGUgPz8gc2hlZXQuY3VycmVuY3lDb2RlKSxcclxuICAgIHRvdGFsQW1vdW50OiBnZXRWaXNpYmxlUmVpbWJ1cnNhYmxlVG90YWwoe1xuICAgICAgVG90YWxBbW91bnRNU1Q6IHRvTnVsbGFibGVOdW1iZXIoc2hlZXQuVG90YWxBbW91bnRNU1QgPz8gc2hlZXQudG90YWxBbW91bnRNU1QpLFxuICAgICAgVG90YWxBbW91bnRDdXJyZW5jeTogdG9OdWxsYWJsZU51bWJlcihzaGVldC5Ub3RhbEFtb3VudEN1cnJlbmN5ID8/IHNoZWV0LnRvdGFsQW1vdW50Q3VycmVuY3kpLFxuICAgICAgVG90YWxBbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIoc2hlZXQuVG90YWxBbW91bnQgPz8gc2hlZXQudG90YWxBbW91bnQpLFxuICAgIH0pLFxuICAgIGV4Y2hSYXRlOiBzYWZlVGV4dChzaGVldC5FeGNoUmF0ZSA/PyBzaGVldC5leGNoUmF0ZSksXHJcbiAgICBleGNoYW5nZVJhdGVNb2RlOiB0b051bGxhYmxlTnVtYmVyKHNoZWV0LkV4Y2hhbmdlUmF0ZU1vZGUgPz8gc2hlZXQuZXhjaGFuZ2VSYXRlTW9kZSksXHJcbiAgICByZWltYnVyc2FibGVFeHBlbnNlOiB0b051bGxhYmxlTnVtYmVyKHNoZWV0LlJlaW1idXJzYWJsZUV4cGVuc2UgPz8gc2hlZXQucmVpbWJ1cnNhYmxlRXhwZW5zZSksXHJcbiAgICBwcm9qSWQ6IHNhZmVUZXh0KHNoZWV0LlByb2pJZCA/PyBzaGVldC5wcm9qSWQpLFxyXG4gICAgdm91Y2hlcjogc2FmZVRleHQoc2hlZXQuVm91Y2hlciA/PyBzaGVldC52b3VjaGVyKSxcclxuICAgIGNyZWF0ZWREYXRlOiBzYWZlVGV4dChzaGVldC5DcmVhdGVkRGF0ZSA/PyBzaGVldC5jcmVhdGVkRGF0ZSksXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfSBsaW5lIGNvbnRyYWN0IHRvIFVJIG1vZGVsLlxyXG5leHBvcnQgY29uc3QgbWFwRXhwZW5zZVNoZWV0TGluZSA9IChsaW5lOiBFeHBlbnNlU2hlZXRMaW5lRHRvKTogRXhwZW5zZVNoZWV0TGluZSA9PiB7XHJcbiAgY29uc3QgdHlwZVZhbHVlQ29kZSA9IHNhZmVUZXh0KGxpbmUuVHlwZVZhbHVlQ29kZSA/PyBsaW5lLnR5cGVWYWx1ZUNvZGUgPz8gbGluZS5UeXBlVmFsdWUgPz8gbGluZS50eXBlVmFsdWUpO1xyXG4gIGNvbnN0IHR5cGVWYWx1ZUxhYmVsID0gc2FmZVRleHQobGluZS5UeXBlVmFsdWUgPz8gbGluZS50eXBlVmFsdWUpO1xyXG4gIGNvbnN0IGV4cGxpY2l0TGluZVJlY0lkID0gc2FmZVRleHQobGluZS5MaW5lUmVjSWQgPz8gbGluZS5saW5lUmVjSWQpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgbGluZVJlY0lkOiBleHBsaWNpdExpbmVSZWNJZCB8fCBzYWZlVGV4dChsaW5lLlJlY0lkID8/IGxpbmUucmVjSWQpLFxyXG4gICAgdHJhbnNEYXRlOiBzYWZlVGV4dChsaW5lLlRyYW5zRGF0ZSA/PyBsaW5lLnRyYW5zRGF0ZSksXHJcbiAgICB0eXBlVmFsdWVDb2RlLFxyXG4gICAgdHlwZVZhbHVlOiB0eXBlVmFsdWVMYWJlbCAmJiB0eXBlVmFsdWVMYWJlbCAhPT0gdHlwZVZhbHVlQ29kZSA/IHR5cGVWYWx1ZUxhYmVsIDogcmVzb2x2ZVR5cGVMYWJlbCh0eXBlVmFsdWVDb2RlKSxcclxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChsaW5lLkRlc2NyaXB0aW9uID8/IGxpbmUuZGVzY3JpcHRpb24pLFxyXG4gICAgaW50ZXJuYWNpb25hbDogdG9OdWxsYWJsZUJvb2wobGluZS5JbnRlcm5hY2lvbmFsID8/IGxpbmUuaW50ZXJuYWNpb25hbCksXHJcbiAgICBmaWxlSWQ6IHNhZmVUZXh0KGxpbmUuRmlsZUlkID8/IGxpbmUuZmlsZUlkKSxcclxuICAgIHRpY2tldDogdG9OdWxsYWJsZUJvb2wobGluZS5UaWNrZXQgPz8gbGluZS50aWNrZXQpLFxyXG4gICAgcHJpY2U6IHRvTnVsbGFibGVOdW1iZXIobGluZS5QcmljZSA/PyBsaW5lLnByaWNlKSxcclxuICAgIHF0eTogdG9OdWxsYWJsZU51bWJlcihsaW5lLlF0eSA/PyBsaW5lLnF0eSksXHJcbiAgICBhbW91bnQ6IHRvTnVsbGFibGVOdW1iZXIobGluZS5BbW91bnQgPz8gbGluZS5hbW91bnQpLFxuICAgIHZpc2libGVSZWltYnVyc2FibGVUb3RhbDogZ2V0VmlzaWJsZVJlaW1idXJzYWJsZVRvdGFsKHtcbiAgICAgIFRvdGFsQW1vdW50TVNUOiB0b051bGxhYmxlTnVtYmVyKGxpbmUuVG90YWxBbW91bnRNU1QgPz8gbGluZS50b3RhbEFtb3VudE1TVCksXG4gICAgICBBbW91bnRNU1Q6IHRvTnVsbGFibGVOdW1iZXIobGluZS5BbW91bnRNU1QgPz8gbGluZS5hbW91bnRNU1QpLFxuICAgICAgVG90YWxBbW91bnRDdXJyZW5jeTogdG9OdWxsYWJsZU51bWJlcihsaW5lLlRvdGFsQW1vdW50Q3VycmVuY3kgPz8gbGluZS50b3RhbEFtb3VudEN1cnJlbmN5KSxcbiAgICAgIEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihsaW5lLkFtb3VudCA/PyBsaW5lLmFtb3VudCksXG4gICAgfSksXG4gICAgcHJvaklkOiBzYWZlVGV4dChsaW5lLlByb2pJZCA/PyBsaW5lLnByb2pJZCksXHJcbiAgICByZWltYnVyc2FibGVFeHBlbnNlOiB0b051bGxhYmxlTnVtYmVyKGxpbmUuUmVpbWJ1cnNhYmxlRXhwZW5zZSA/PyBsaW5lLnJlaW1idXJzYWJsZUV4cGVuc2UpLFxyXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChsaW5lLkN1cnJlbmN5Q29kZSA/PyBsaW5lLmN1cnJlbmN5Q29kZSksXHJcbiAgICBhbW91bnRNU1Q6IHRvTnVsbGFibGVOdW1iZXIobGluZS5BbW91bnRNU1QgPz8gbGluZS5hbW91bnRNU1QpLFxyXG4gICAgZXhjaFJhdGU6IHRvTnVsbGFibGVOdW1iZXIobGluZS5FeGNoUmF0ZSA/PyBsaW5lLmV4Y2hSYXRlKSxcclxuICAgIGluZEF0dGFjaEZpbGVzOiBzYWZlVGV4dChsaW5lLkluZEF0dGFjaEZpbGVzID8/IGxpbmUuaW5kQXR0YWNoRmlsZXMpLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyBwYXJzZUV4cGVuc2VBcGlEYXRlIH0gZnJvbSBcIi4vZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgRXhwZW5zZURhdGVQYXJ0cyA9IHtcclxuICB5ZWFyOiBzdHJpbmc7XHJcbiAgbW9udGg6IHN0cmluZztcclxuICBkYXk6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgUGFyc2VFeHBlbnNlRGF0ZU9wdGlvbnMgPSB7XHJcbiAgcHJlZmVyTW9udGhGaXJzdE9uU2xhc2g/OiBib29sZWFuO1xyXG59O1xyXG5cclxuY29uc3QgQkFTUVVFX01PTlRIU19TSE9SVCA9IFtcclxuICBcInVydFwiLFxyXG4gIFwib3RzXCIsXHJcbiAgXCJtYXJcIixcclxuICBcImFwaVwiLFxyXG4gIFwibWFpXCIsXHJcbiAgXCJla2FcIixcclxuICBcInV6dFwiLFxyXG4gIFwiYWJ1XCIsXHJcbiAgXCJpcmFcIixcclxuICBcInVyclwiLFxyXG4gIFwiYXphXCIsXHJcbiAgXCJhYmVcIixcclxuXTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVVpTG9jYWxlID0gKGxvY2FsZTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhsb2NhbGUgfHwgXCJcIikudHJpbSgpO1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBcImVzLUVTXCI7XHJcbiAgaWYgKC9eemgtaGFucy9pLnRlc3QodmFsdWUpKSByZXR1cm4gXCJ6aC1DTlwiO1xyXG4gIHJldHVybiB2YWx1ZTtcclxufTtcclxuXHJcbmNvbnN0IGlzQmFzcXVlTG9jYWxlID0gKGxvY2FsZTogc3RyaW5nKTogYm9vbGVhbiA9PiAvXmV1XFxiL2kudGVzdChTdHJpbmcobG9jYWxlIHx8IFwiXCIpKTtcclxuXHJcbi8vIE5vcm1hbGl6ZSB1bmtub3duIHZhbHVlcyB0byBhIHRyaW1tZWQgc3RyaW5nLlxuZXhwb3J0IGNvbnN0IHNhZmVUZXh0ID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBcIlwiO1xuICByZXR1cm4gU3RyaW5nKHZhbHVlKS50cmltKCk7XG59O1xuXG4vLyBDbGVhbnMgY2hhdCB0ZXh0IHdoaWxlIHByZXNlcnZpbmcgYWNjZW50cyBhbmQgcmVhZGFibGUgcHVuY3R1YXRpb24uXG5leHBvcnQgY29uc3Qgc2FuaXRpemVBc3Npc3RhbnRUZXh0ID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgc291cmNlID0gc2FmZVRleHQodmFsdWUpO1xuICBpZiAoIXNvdXJjZSkgcmV0dXJuIFwiXCI7XG5cbiAgcmV0dXJuIHNvdXJjZVxuICAgIC5ub3JtYWxpemUoXCJORkNcIilcbiAgICAucmVwbGFjZSgvXFx1RkVGRi9nLCBcIlwiKVxuICAgIC5yZXBsYWNlKC9bXFx1MDAwMC1cXHUwMDA4XFx1MDAwQlxcdTAwMENcXHUwMDBFLVxcdTAwMUZcXHUwMDdGXS9nLCBcIlwiKVxuICAgIC5yZXBsYWNlKC9bXFx1MjAwQi1cXHUyMDBEXFx1MjA2MF0vZywgXCJcIilcbiAgICAucmVwbGFjZSgvXFxyXFxuPy9nLCBcIlxcblwiKVxuICAgIC5yZXBsYWNlKC9bIFxcdF0rXFxuL2csIFwiXFxuXCIpXG4gICAgLnJlcGxhY2UoL1xcbnszLH0vZywgXCJcXG5cXG5cIilcbiAgICAudHJpbSgpO1xufTtcblxyXG4vLyBOb3JtYWxpemVzIGNhcmQgdGl0bGUgdGV4dCBvbmx5IHdoZW4gaXQgY29tZXMgaW4gZnVsbCB1cHBlciBvciBmdWxsIGxvd2VyIGNhc2UuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVDYXJkVGl0bGVUZXh0ID0gKHZhbHVlOiB1bmtub3duLCBmYWxsYmFjayA9IFwiLVwiKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBzb3VyY2UgPSBzYWZlVGV4dCh2YWx1ZSk7XHJcbiAgaWYgKCFzb3VyY2UpIHJldHVybiBmYWxsYmFjaztcclxuXHJcbiAgY29uc3QgaGFzTGV0dGVycyA9IC9bQS1aYS16XHUwMEMwLVx1MDBENlx1MDBEOC1cdTAwRjZcdTAwRjgtXHUwMEZGXS8udGVzdChzb3VyY2UpO1xyXG4gIGlmICghaGFzTGV0dGVycykgcmV0dXJuIHNvdXJjZTtcclxuXHJcbiAgY29uc3QgaXNBbGxVcHBlciA9IHNvdXJjZSA9PT0gc291cmNlLnRvVXBwZXJDYXNlKCkgJiYgc291cmNlICE9PSBzb3VyY2UudG9Mb3dlckNhc2UoKTtcclxuICBjb25zdCBpc0FsbExvd2VyID0gc291cmNlID09PSBzb3VyY2UudG9Mb3dlckNhc2UoKSAmJiBzb3VyY2UgIT09IHNvdXJjZS50b1VwcGVyQ2FzZSgpO1xyXG4gIGlmICghaXNBbGxVcHBlciAmJiAhaXNBbGxMb3dlcikge1xyXG4gICAgcmV0dXJuIHNvdXJjZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGxvd2VyID0gc291cmNlLnRvTG93ZXJDYXNlKCk7XHJcbiAgcmV0dXJuIGAke2xvd2VyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpfSR7bG93ZXIuc2xpY2UoMSl9YDtcclxufTtcclxuXHJcbi8vIFJldHVybnMgdHJ1ZSBvbmx5IHdoZW4gdm91Y2hlciBoYXMgYSBtZWFuaW5nZnVsIGFzc2lnbmVkIHZhbHVlLlxyXG5leHBvcnQgY29uc3QgaGFzQXNzaWduZWRWb3VjaGVyID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3Qgdm91Y2hlciA9IHNhZmVUZXh0KHZhbHVlKS50b1VwcGVyQ2FzZSgpO1xyXG4gIGlmICghdm91Y2hlcikgcmV0dXJuIGZhbHNlO1xyXG4gIHJldHVybiB2b3VjaGVyICE9PSBcIi1cIiAmJiB2b3VjaGVyICE9PSBcIi5cIiAmJiB2b3VjaGVyICE9PSBcIjBcIjtcclxufTtcclxuXHJcbi8vIFJldHVybiBkYXRlIGF0IGxvY2FsIGRheSBzdGFydC5cclxuZXhwb3J0IGNvbnN0IHN0YXJ0T2ZEYXkgPSAoZGF0ZTogRGF0ZSk6IERhdGUgPT4ge1xyXG4gIHJldHVybiBuZXcgRGF0ZShkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCkpO1xyXG59O1xyXG5cclxuLy8gRm9ybWF0IGxvY2FsIGRhdGUgdG8geXl5eS1NTS1kZC5cclxuZXhwb3J0IGNvbnN0IHRvSXNvRGF0ZSA9IChkYXRlOiBEYXRlKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gYCR7ZGF0ZS5nZXRGdWxsWWVhcigpfS0ke1N0cmluZyhkYXRlLmdldE1vbnRoKCkgKyAxKS5wYWRTdGFydCgyLCBcIjBcIil9LSR7U3RyaW5nKGRhdGUuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIil9YDtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkRXhwZW5zZURhdGUgPSAoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXk6IG51bWJlcik6IERhdGUgfCBudWxsID0+IHtcclxuICBjb25zdCBjYW5kaWRhdGUgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCAtIDEsIGRheSk7XHJcbiAgaWYgKFxyXG4gICAgTnVtYmVyLmlzTmFOKGNhbmRpZGF0ZS5nZXRUaW1lKCkpIHx8XHJcbiAgICBjYW5kaWRhdGUuZ2V0RnVsbFllYXIoKSAhPT0geWVhciB8fFxyXG4gICAgY2FuZGlkYXRlLmdldE1vbnRoKCkgIT09IG1vbnRoIC0gMSB8fFxyXG4gICAgY2FuZGlkYXRlLmdldERhdGUoKSAhPT0gZGF5XHJcbiAgKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiBjYW5kaWRhdGU7XHJcbn07XHJcblxyXG4vLyBQYXJzZSBzdXBwb3J0ZWQgQVBJIGRhdGUgZm9ybWF0cy5cclxuZXhwb3J0IGNvbnN0IHBhcnNlRXhwZW5zZURhdGUgPSAocmF3Pzogc3RyaW5nLCBvcHRpb25zPzogUGFyc2VFeHBlbnNlRGF0ZU9wdGlvbnMpOiBEYXRlIHwgbnVsbCA9PiB7XHJcbiAgaWYgKCFyYXcpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKHJhdykudHJpbSgpO1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCBkYXRlT25seSA9IHZhbHVlLnNwbGl0KFwiVFwiKVswXS5zcGxpdChcIiBcIilbMF07XHJcblxyXG4gIC8vIEtlZXAgb3B0aW9uYWwgbW9udGgtZmlyc3QgY29tcGF0aWJpbGl0eSBmb3IgbGVnYWN5IHNsYXNoIGRhdGVzIGluIGNhcmRzLlxyXG4gIGlmIChvcHRpb25zPy5wcmVmZXJNb250aEZpcnN0T25TbGFzaCAmJiAvXlxcZHsyfVxcL1xcZHsyfVxcL1xcZHs0fSQvLnRlc3QoZGF0ZU9ubHkpKSB7XHJcbiAgICBjb25zdCBbZmlyc3RQYXJ0LCBzZWNvbmRQYXJ0LCB5ZWFyUGFydF0gPSBkYXRlT25seS5zcGxpdCgvWy4vLV0vKTtcclxuICAgIGNvbnN0IGZpcnN0ID0gTnVtYmVyKGZpcnN0UGFydCk7XHJcbiAgICBjb25zdCBzZWNvbmQgPSBOdW1iZXIoc2Vjb25kUGFydCk7XHJcbiAgICBjb25zdCB5ZWFyID0gTnVtYmVyKHllYXJQYXJ0KTtcclxuICAgIGNvbnN0IG1vbnRoRmlyc3REYXRlID0gYnVpbGRFeHBlbnNlRGF0ZSh5ZWFyLCBmaXJzdCwgc2Vjb25kKTtcclxuICAgIGlmIChtb250aEZpcnN0RGF0ZSkge1xyXG4gICAgICByZXR1cm4gbW9udGhGaXJzdERhdGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcGFyc2VFeHBlbnNlQXBpRGF0ZSh2YWx1ZSk7XHJcbn07XHJcblxyXG4vLyBGb3JtYXQgYSBkYXRlIGZvciByZWFkLW9ubHkgZmllbGRzIHVzaW5nIHRoZSBzYW1lIG91dHB1dCBzdHlsZSBhcyB2aXNpdHMuXHJcbmV4cG9ydCBjb25zdCBmb3JtYXRFeHBlbnNlRGlzcGxheURhdGUgPSAocmF3Pzogc3RyaW5nLCBsb2NhbGUgPSBcImVzLUVTXCIsIGZhbGxiYWNrID0gXCItXCIpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGRhdGUgPSBwYXJzZUV4cGVuc2VEYXRlKHJhdyk7XHJcbiAgaWYgKCFkYXRlKSByZXR1cm4gZmFsbGJhY2s7XHJcblxyXG4gIGNvbnN0IHNhZmVMb2NhbGUgPSBub3JtYWxpemVVaUxvY2FsZShsb2NhbGUpO1xyXG4gIGlmIChpc0Jhc3F1ZUxvY2FsZShzYWZlTG9jYWxlKSkge1xyXG4gICAgcmV0dXJuIGAke2RhdGUuZ2V0RGF0ZSgpfSAke0JBU1FVRV9NT05USFNfU0hPUlRbZGF0ZS5nZXRNb250aCgpXX0gJHtkYXRlLmdldEZ1bGxZZWFyKCl9YC50b0xvd2VyQ2FzZSgpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGRhdGVcclxuICAgIC50b0xvY2FsZURhdGVTdHJpbmcoc2FmZUxvY2FsZSwge1xyXG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxyXG4gICAgICBtb250aDogXCJzaG9ydFwiLFxyXG4gICAgICB5ZWFyOiBcIm51bWVyaWNcIixcclxuICAgIH0pXHJcbiAgICAucmVwbGFjZSgvXFwuL2csIFwiXCIpXHJcbiAgICAudG9Mb3dlckNhc2UoKTtcclxufTtcclxuXHJcbi8vIEJ1aWxkIHRpbWVsaW5lIGRhdGUgZnJhZ21lbnRzIGZvciBjYXJkIGxlZnQgcGFuZWwuXHJcbmV4cG9ydCBjb25zdCBmb3JtYXRFeHBlbnNlRGF0ZVBhcnRzID0gKHJhdz86IHN0cmluZywgbG9jYWxlID0gXCJlcy1FU1wiLCBvcHRpb25zPzogUGFyc2VFeHBlbnNlRGF0ZU9wdGlvbnMpOiBFeHBlbnNlRGF0ZVBhcnRzID0+IHtcclxuICBjb25zdCBkYXRlID0gcGFyc2VFeHBlbnNlRGF0ZShyYXcsIG9wdGlvbnMpO1xyXG4gIGlmICghZGF0ZSkge1xyXG4gICAgcmV0dXJuIHsgeWVhcjogXCJcIiwgbW9udGg6IFwiXCIsIGRheTogXCItLVwiIH07XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgeWVhcjogU3RyaW5nKGRhdGUuZ2V0RnVsbFllYXIoKSksXHJcbiAgICBtb250aDogZGF0ZS50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7IG1vbnRoOiBcInNob3J0XCIgfSkucmVwbGFjZSgvXFwuL2csIFwiXCIpLnRvVXBwZXJDYXNlKCksXHJcbiAgICBkYXk6IFN0cmluZyhkYXRlLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgeyB0b051bGxhYmxlTnVtYmVyIH0gZnJvbSBcIi4vZXhwZW5zZUFwaVRyYW5zZm9ybXMudHNcIjtcclxuXHJcbnR5cGUgVGlja2V0TGluZUFtb3VudElucHV0ID0ge1xyXG4gIHF0eT86IHVua25vd247XHJcbiAgcHJpY2U/OiB1bmtub3duO1xyXG4gIHRvdGFsQW1vdW50PzogdW5rbm93bjtcclxufTtcclxuXHJcbi8vIFJlc29sdmVzIHRoZSBzaWduZWQgdGlja2V0IGxpbmUgYW1vdW50LCBwcmVzZXJ2aW5nIHplcm8tcXVhbnRpdHkgZGlzY291bnQgbGluZXMuXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlVGlja2V0TGluZUFtb3VudCA9IChsaW5lOiBUaWNrZXRMaW5lQW1vdW50SW5wdXQgfCBudWxsIHwgdW5kZWZpbmVkKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgaWYgKCFsaW5lKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgZXhwbGljaXRUb3RhbCA9IHRvTnVsbGFibGVOdW1iZXIobGluZS50b3RhbEFtb3VudCk7XHJcbiAgaWYgKGV4cGxpY2l0VG90YWwgIT09IG51bGwpIHtcclxuICAgIHJldHVybiBleHBsaWNpdFRvdGFsO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcXR5ID0gdG9OdWxsYWJsZU51bWJlcihsaW5lLnF0eSk7XHJcbiAgY29uc3QgcHJpY2UgPSB0b051bGxhYmxlTnVtYmVyKGxpbmUucHJpY2UpO1xyXG4gIGlmIChxdHkgPT09IG51bGwgfHwgcHJpY2UgPT09IG51bGwpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgaWYgKHF0eSA9PT0gMCAmJiBwcmljZSA8IDApIHtcclxuICAgIHJldHVybiBwcmljZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBxdHkgKiBwcmljZTtcclxufTtcclxuXHJcbi8vIFZhbGlkYXRlcyB0aWNrZXQgbGluZSBhbW91bnRzIHdoaWxlIGFsbG93aW5nIHF0eT0wIG9ubHkgZm9yIG5lZ2F0aXZlIGRpc2NvdW50cy5cclxuZXhwb3J0IGNvbnN0IGlzVmFsaWRUaWNrZXRMaW5lQW1vdW50ID0gKGxpbmU6IFRpY2tldExpbmVBbW91bnRJbnB1dCB8IG51bGwgfCB1bmRlZmluZWQpOiBib29sZWFuID0+IHtcclxuICBjb25zdCBxdHkgPSB0b051bGxhYmxlTnVtYmVyKGxpbmU/LnF0eSk7XHJcbiAgY29uc3QgcHJpY2UgPSB0b051bGxhYmxlTnVtYmVyKGxpbmU/LnByaWNlKTtcclxuICBpZiAocXR5ID09PSBudWxsIHx8IHByaWNlID09PSBudWxsIHx8IHF0eSA8IDAgfHwgcHJpY2UgPT09IDApIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGlmIChxdHkgPiAwKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGxpbmVBbW91bnQgPSByZXNvbHZlVGlja2V0TGluZUFtb3VudChsaW5lKTtcclxuICByZXR1cm4gbGluZUFtb3VudCAhPT0gbnVsbCAmJiBsaW5lQW1vdW50IDwgMDtcclxufTtcclxuIiwgImltcG9ydCB7XHJcbiAgQXBpRmV0Y2hFcnJvcixcclxuICBmZXRjaEpzb24sXHJcbiAgZ2V0Q3NyZlRva2VuLFxyXG4gIGhhbmRsZUFwaUF1dGhGYWlsdXJlLFxyXG4gIHJlYWRBcGlNZXNzYWdlRnJvbVJhdyxcclxuICB0eXBlIEFwaUZldGNoT3B0aW9ucyxcclxufSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgdHlwZSB7XHJcbiAgRW50cmFDb250ZXh0RHRvLFxyXG4gIEVudHJhQ29udGV4dFJlcXVlc3QsXHJcbiAgRXhjaGFuZ2VSYXRlRHRvLFxyXG4gIEZ1ZWxQcmljZUttRHRvLFxyXG4gIEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvLFxyXG4gIEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0Q3JlYXRlUmVzcG9uc2VEYXRhLFxyXG4gIEV4cGVuc2VTaGVldERldGFpbER0byxcclxuICBFeHBlbnNlU2hlZXREcmFmdFJlc3BvbnNlLFxyXG4gIEV4cGVuc2VTaGVldEhlYWRlclVwZGF0ZVJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0TGluZUR0byxcclxuICBFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVzcG9uc2VEYXRhLFxyXG4gIEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldExpc3RJdGVtRHRvLFxyXG4gIEV4cGVuc2VTaGVldExpc3RSZXNwb25zZUVudmVsb3BlLFxyXG4gIEV4cGVuc2VTaGVldHNBc2tSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldHNBc2tSZXNwb25zZURhdGEsXHJcbiAgRXhwZW5zZVNoZWV0c0Fza1Jlc3VsdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRDcmVhdGVSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldERldGFpbER0byxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1JlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXN1bHREdG8sXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlua0xpc3RJdGVtRHRvLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0UmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGluZVJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8sXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0TGlzdFJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldFVwZGF0ZVJlcXVlc3QsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0VG90YWxBZGp1c3RtZW50UmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXRUaWNrZXRUb3RhbEFkanVzdG1lbnRSZXN1bHREdG8sXHJcbiAgRXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVEdG8sXHJcbiAgSW5kQXBpUmVzcG9uc2UsXHJcbiAgSW5kUGFnZWRSZXNwb25zZSxcclxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgaXNOb25OZWdhdGl2ZU51bWJlciBhcyBpc05vbk5lZ2F0aXZlTnVtYmVyVHJhbnNmb3JtLFxyXG4gIGlzUG9zaXRpdmVOdW1iZXIgYXMgaXNQb3NpdGl2ZU51bWJlclRyYW5zZm9ybSxcclxuICBub3JtYWxpemVFeHBlbnNlU2hlZXRMaXN0U3RhdHVzRmlsdGVyIGFzIG5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXJUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUgYXMgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGVUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRQcm9jZXNzZWRCeUFJIGFzIG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0UHJvY2Vzc2VkQnlBSVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1cyBhcyBub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1c1RyYW5zZm9ybSxcclxuICBub3JtYWxpemVPcHRpb25hbEFwaURhdGUgYXMgbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZSBhcyBub3JtYWxpemVSZXF1aXJlZEFwaURhdGVUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplVGlja2V0TGlzdERhdGUgYXMgbm9ybWFsaXplVGlja2V0TGlzdERhdGVUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZSBhcyBub3JtYWxpemVUaWNrZXRMaXN0R2FzdG9UeXBlVHJhbnNmb3JtLFxyXG4gIHNhZmVUZXh0IGFzIHNhZmVUZXh0VHJhbnNmb3JtLFxyXG4gIHRvRmxhZ0Jvb2wgYXMgdG9GbGFnQm9vbFRyYW5zZm9ybSxcclxuICB0b051bGxhYmxlQm9vbCBhcyB0b051bGxhYmxlQm9vbFRyYW5zZm9ybSxcclxuICB0b051bGxhYmxlR2FzdG9UeXBlQ29kZSBhcyB0b051bGxhYmxlR2FzdG9UeXBlQ29kZVRyYW5zZm9ybSxcclxuICB0b051bGxhYmxlTnVtYmVyIGFzIHRvTnVsbGFibGVOdW1iZXJUcmFuc2Zvcm0sXHJcbiAgdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGUgYXMgdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGVUcmFuc2Zvcm0sXHJcbn0gZnJvbSBcIi4vZXhwZW5zZUFwaVRyYW5zZm9ybXMudHNcIjtcclxuaW1wb3J0IHtcclxuICBub3JtYWxpemVBcGlSZXNwb25zZSBhcyBub3JtYWxpemVBcGlSZXNwb25zZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVDdXJyZW5jeVBhZ2VkUmVzcG9uc2UgYXMgbm9ybWFsaXplQ3VycmVuY3lQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZURldGFpbFBhZ2VkUmVzcG9uc2UgYXMgbm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlIGFzIG5vcm1hbGl6ZVN1Ym9yZGluYXRlc1BhZ2VkUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplVGlja2V0TGlua0J1bGtSZXNwb25zZSBhcyBub3JtYWxpemVUaWNrZXRMaW5rQnVsa1Jlc3BvbnNlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVUaWNrZXRMaW5rTGlzdFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm0sXHJcbiAgbm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlVHJhbnNmb3JtLFxyXG4gIG5vcm1hbGl6ZVRpY2tldFF1aWNrQ3JlYXRlUmVzcG9uc2UgYXMgbm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZVRyYW5zZm9ybSxcclxuICBub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZSBhcyBub3JtYWxpemVUaWNrZXRMaXN0UGFnZWRSZXNwb25zZVRyYW5zZm9ybSxcclxufSBmcm9tIFwiLi9leHBlbnNlQXBpUmVzcG9uc2VOb3JtYWxpemVycy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIG1hcEV4cGVuc2VTaGVldEhlYWRlciBhcyBtYXBFeHBlbnNlU2hlZXRIZWFkZXJDb3JlLFxyXG4gIG1hcEV4cGVuc2VTaGVldExpbmUgYXMgbWFwRXhwZW5zZVNoZWV0TGluZUNvcmUsXHJcbiAgbWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmQgYXMgbWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmRDb3JlLFxyXG59IGZyb20gXCIuL2V4cGVuc2VBcGlNYXBwZXJzLnRzXCI7XHJcbmltcG9ydCB7IHNhbml0aXplQXNzaXN0YW50VGV4dCB9IGZyb20gXCIuL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UgfSBmcm9tIFwiLi9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IGlzVmFsaWRUaWNrZXRMaW5lQW1vdW50IH0gZnJvbSBcIi4vZXhwZW5zZVRpY2tldExpbmVBbW91bnQudHNcIjtcclxuaW1wb3J0IHsgZ2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSB9IGZyb20gXCIuL2V4cGVuc2VBY3RpbmdVc2VyLnRzXCI7XHJcbmltcG9ydCB7IHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUgfSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VHYXN0b1R5cGVDYXRhbG9nLnRzXCI7XHJcbmltcG9ydCB7IHJlc29sdmVFZmZlY3RpdmVDb21wYW55SWQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY29tcGFueVNlbGVjdGlvbi50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuXHJcbnR5cGUgUHJvamVjdERyb3Bkb3duT3B0aW9uID0ge1xyXG4gIHZhbHVlPzogc3RyaW5nO1xyXG4gIFZhbHVlPzogc3RyaW5nO1xyXG4gIHRleHQ/OiBzdHJpbmc7XHJcbiAgVGV4dD86IHN0cmluZztcclxuICBwcm9qSWQ/OiBzdHJpbmc7XHJcbiAgUHJvaklkPzogc3RyaW5nO1xyXG4gIG5hbWU/OiBzdHJpbmc7XHJcbiAgTmFtZT86IHN0cmluZztcclxuICBkZXNjcmlwdGlvbj86IHN0cmluZztcclxuICBEZXNjcmlwdGlvbj86IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgUHJvamVjdERyb3Bkb3duUmVzcG9uc2UgPSB7XHJcbiAgdG90YWw/OiBudW1iZXI7XHJcbiAgVG90YWw/OiBudW1iZXI7XHJcbiAgaXRlbXM/OiBQcm9qZWN0RHJvcGRvd25PcHRpb25bXTtcclxuICBJdGVtcz86IFByb2plY3REcm9wZG93bk9wdGlvbltdO1xyXG59O1xyXG5cclxudHlwZSBMZWdhY3lFeHBlbnNlTGlzdEl0ZW0gPSB7XHJcbiAgaG9qYUdhc3Rvc0lkPzogdW5rbm93bjtcclxuICBkZXNjcmlwdGlvbj86IHVua25vd247XHJcbiAgZXN0YWRvQ29tZW50YXJpb3M/OiB1bmtub3duO1xyXG4gIHZvdWNoZXI/OiB1bmtub3duO1xyXG4gIHByb2pJZD86IHVua25vd247XHJcbiAgY3VycmVuY3lDb2RlPzogdW5rbm93bjtcbiAgdG90YWxBbW91bnQ/OiB1bmtub3duO1xuICB0b3RhbEFtb3VudEN1cnJlbmN5PzogdW5rbm93bjtcbiAgdG90YWxBbW91bnRNU1Q/OiB1bmtub3duO1xuICBleGNoUmF0ZT86IHVua25vd247XHJcbiAgdXNlcklkPzogdW5rbm93bjtcclxuICB1c2VyTmFtZT86IHVua25vd247XHJcbiAgb3duZXJBeFVzZXJJZD86IHVua25vd247XHJcbiAgb3duZXJOYW1lPzogdW5rbm93bjtcclxuICBleGNoYW5nZVJhdGVNb2RlPzogdW5rbm93bjtcclxuICByZWltYnVyc2FibGVFeHBlbnNlPzogdW5rbm93bjtcclxuICBleHBlbnNlU2hlZXRTdGF0dXM/OiB1bmtub3duO1xyXG4gIGNyZWF0ZWREYXRlPzogdW5rbm93bjtcclxufTtcclxuXHJcbnR5cGUgTGVnYWN5RXhwZW5zZUxpc3RSZXNwb25zZSA9IHtcclxuICBzdWNjZXNzPzogYm9vbGVhbjtcclxuICBtZXNzYWdlPzogc3RyaW5nO1xyXG4gIHRvdGFsPzogbnVtYmVyO1xyXG4gIHBhZ2U/OiBudW1iZXI7XHJcbiAgcGFnZVNpemU/OiBudW1iZXI7XHJcbiAgaXRlbXM/OiBMZWdhY3lFeHBlbnNlTGlzdEl0ZW1bXTtcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZUFwaUNvbnRleHQgPSB7XG4gIHRva2VuOiBzdHJpbmc7XG4gIGNvbXBhbnlJZDogc3RyaW5nO1xuICBheFVzZXJJZDogc3RyaW5nO1xuICB1c2VyTmFtZTogc3RyaW5nO1xuICBjcm1Vc2VySWQ6IHN0cmluZztcbiAgZGVmYXVsdEN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xufTtcblxyXG5leHBvcnQgdHlwZSBFeHBlbnNlQXBpQ29udGV4dFNuYXBzaG90ID0ge1xyXG4gIGNvbXBhbnlJZDogc3RyaW5nO1xuICBheFVzZXJJZDogc3RyaW5nO1xuICB1c2VyTmFtZTogc3RyaW5nO1xuICBjcm1Vc2VySWQ6IHN0cmluZztcbiAgYWxsb3dTZWxmTWFuYWdlbWVudDogYm9vbGVhbjtcbn07XG5cclxudHlwZSBFeHBlbnNlQXBpQXV0aFNlZWQgPSB7XHJcbiAgdG9rZW46IHN0cmluZztcclxuICBlbnRyYU9pZDogc3RyaW5nO1xyXG4gIGFwcENvZGU6IHN0cmluZztcclxuICBzdHJpY3RBcGlSb3V0ZXM6IGJvb2xlYW47XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VXaW5kb3dSdW50aW1lID0ge1xyXG4gIF9fSU5EX0FQSV9UT0tFTl9fPzogc3RyaW5nO1xyXG4gIF9fSU5EX0VOVFJBX09JRF9fPzogc3RyaW5nO1xyXG4gIF9fSU5EX0FQUF9DT0RFX18/OiBzdHJpbmc7XHJcbiAgX19JTkRfU0VMRUNURURfQ09NUEFOWV9fPzogc3RyaW5nO1xyXG4gIF9fSU5EX0VYUEVOU0VfU1RSSUNUX0FQSV9fPzogYm9vbGVhbiB8IHN0cmluZztcclxuICBfX0VYUEVOU0VfR0FTVE9fVFlQRVNfXz86IEFycmF5PHtcclxuICAgIHZhbHVlPzogdW5rbm93bjtcclxuICAgIFZhbHVlPzogdW5rbm93bjtcclxuICAgIHRleHQ/OiB1bmtub3duO1xyXG4gICAgVGV4dD86IHVua25vd247XHJcbiAgfT47XHJcbn07XHJcblxyXG5jb25zdCBERUZBVUxUX0FQUF9DT0RFID0gXCJDUk1cIjtcclxuY29uc3QgSlNPTl9IRUFERVJTOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG59O1xyXG5cclxubGV0IHJ1bnRpbWVBdXRoU2VlZDogUGFydGlhbDxFeHBlbnNlQXBpQXV0aFNlZWQ+ID0ge307XHJcbmxldCBjYWNoZWRDb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCB8IG51bGwgPSBudWxsO1xyXG5sZXQgY2FjaGVkQ29udGV4dEtleSA9IFwiXCI7XHJcbmxldCBjb250ZXh0UHJvbWlzZTogUHJvbWlzZTxFeHBlbnNlQXBpQ29udGV4dD4gfCBudWxsID0gbnVsbDtcclxuY29uc3QgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMgPSBuZXcgTWFwPHN0cmluZywgSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+KCk7XHJcbmNvbnN0IHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzID0gbmV3IE1hcDxzdHJpbmcsIFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+PigpO1xyXG5cclxuY29uc3Qgc2FmZVRleHQgPSBzYWZlVGV4dFRyYW5zZm9ybTtcclxuXHJcbmNvbnN0IHRvTnVsbGFibGVOdW1iZXIgPSB0b051bGxhYmxlTnVtYmVyVHJhbnNmb3JtO1xyXG5jb25zdCBpc05vbk5lZ2F0aXZlTnVtYmVyID0gaXNOb25OZWdhdGl2ZU51bWJlclRyYW5zZm9ybTtcclxuY29uc3QgaXNQb3NpdGl2ZU51bWJlciA9IGlzUG9zaXRpdmVOdW1iZXJUcmFuc2Zvcm07XHJcblxyXG50eXBlIEV4cGVuc2VMaW5lQ3VycmVuY3lQYXlsb2FkID0ge1xyXG4gIGN1cnJlbmN5Q29kZT86IHN0cmluZyB8IG51bGw7XHJcbiAgYW1vdW50TVNUPzogbnVtYmVyIHwgbnVsbDtcclxuICBleGNoUmF0ZT86IG51bWJlciB8IG51bGw7XHJcbiAgcXR5PzogbnVtYmVyIHwgbnVsbDtcclxuICBwcmljZT86IG51bWJlciB8IG51bGw7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVDdXJyZW5jeUNvZGUgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4gc2FmZVRleHQodmFsdWUpLnRyaW0oKS50b1VwcGVyQ2FzZSgpO1xyXG5cclxuLy8gVmFsaWRhdGVzIHRoZSBBWCBsaW5lLWN1cnJlbmN5IGNvbnRyYWN0IGJlZm9yZSBzZW5kaW5nIGEgbGluZSBwYXlsb2FkLlxyXG5jb25zdCBoYXNNaXNzaW5nRm9yZWlnbkxpbmVTZXR0bGVtZW50ID0gKGxpbmU6IEV4cGVuc2VMaW5lQ3VycmVuY3lQYXlsb2FkLCBsb2NhbEN1cnJlbmN5Q29kZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgbGluZUN1cnJlbmN5Q29kZSA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShsaW5lLmN1cnJlbmN5Q29kZSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZExvY2FsQ3VycmVuY3lDb2RlID0gbm9ybWFsaXplQ3VycmVuY3lDb2RlKGxvY2FsQ3VycmVuY3lDb2RlKSB8fCBcIkVVUlwiO1xyXG4gIGlmICghbGluZUN1cnJlbmN5Q29kZSB8fCBsaW5lQ3VycmVuY3lDb2RlID09PSBub3JtYWxpemVkTG9jYWxDdXJyZW5jeUNvZGUpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGFtb3VudCA9IE51bWJlcihsaW5lLnF0eSA/PyAwKSAqIE51bWJlcihsaW5lLnByaWNlID8/IDApO1xyXG4gIGNvbnN0IGV4Y2hhbmdlUmF0ZSA9IHRvTnVsbGFibGVOdW1iZXIobGluZS5leGNoUmF0ZSk7XHJcbiAgY29uc3QgYW1vdW50TVNUID0gdG9OdWxsYWJsZU51bWJlcihsaW5lLmFtb3VudE1TVCk7XHJcbiAgcmV0dXJuIGFtb3VudCA+IDAgJiYgIShleGNoYW5nZVJhdGUgIT0gbnVsbCAmJiBleGNoYW5nZVJhdGUgPiAwKSAmJiAhKGFtb3VudE1TVCAhPSBudWxsICYmIGFtb3VudE1TVCA+IDApO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRGb3JlaWduTGluZVNldHRsZW1lbnRFcnJvciA9ICgpOiBBcGlGZXRjaEVycm9yID0+XHJcbiAgbmV3IEFwaUZldGNoRXJyb3IoXHJcbiAgICBpbmRUKFxyXG4gICAgICBcIkV4cGVuc2VTaGVldHNfTGluZV9WYWxpZGF0aW9uX0ZvcmVpZ25DdXJyZW5jeVNldHRsZW1lbnRcIixcclxuICAgICAgXCJGb3JlaWduIGN1cnJlbmN5IGxpbmVzIHJlcXVpcmUgYW4gZXhjaGFuZ2UgcmF0ZSBncmVhdGVyIHRoYW4gMCBvciBhIHJlaW1idXJzZW1lbnQgYW1vdW50LlwiXHJcbiAgICApXHJcbiAgKTtcclxuY29uc3QgdG9OdWxsYWJsZVRpY2tldFN0YXR1c0NvZGUgPSB0b051bGxhYmxlVGlja2V0U3RhdHVzQ29kZVRyYW5zZm9ybTtcclxuY29uc3QgdG9OdWxsYWJsZUdhc3RvVHlwZUNvZGUgPSB0b051bGxhYmxlR2FzdG9UeXBlQ29kZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUgPSBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplVGlja2V0TGlzdEdhc3RvVHlwZSA9IG5vcm1hbGl6ZVRpY2tldExpc3RHYXN0b1R5cGVUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0U3RhdHVzID0gbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRTdGF0dXNUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlID0gbm9ybWFsaXplUmVxdWlyZWRBcGlEYXRlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZSA9IG5vcm1hbGl6ZVRpY2tldExpc3REYXRlVHJhbnNmb3JtO1xyXG5jb25zdCB0b051bGxhYmxlQm9vbCA9IHRvTnVsbGFibGVCb29sVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUkgPSBub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUlUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXIgPSBub3JtYWxpemVFeHBlbnNlU2hlZXRMaXN0U3RhdHVzRmlsdGVyVHJhbnNmb3JtO1xyXG5jb25zdCB0b0ZsYWdCb29sID0gdG9GbGFnQm9vbFRyYW5zZm9ybTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUV4cGVuc2VTaGVldFJlaW1idXJzYWJsZSA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IHBhcnNlZCA9IHRvTnVsbGFibGVOdW1iZXIodmFsdWUpO1xyXG4gIGlmIChwYXJzZWQgPT09IG51bGwgfHwgIU51bWJlci5pc0ludGVnZXIocGFyc2VkKSB8fCBwYXJzZWQgPCAwKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHJldHVybiBwYXJzZWQ7XHJcbn07XHJcblxyXG5jb25zdCByZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUgPSAoKTogRXhwZW5zZVdpbmRvd1J1bnRpbWUgPT4ge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4ge307XHJcbiAgcmV0dXJuIHdpbmRvdyBhcyB1bmtub3duIGFzIEV4cGVuc2VXaW5kb3dSdW50aW1lO1xyXG59O1xyXG5cclxuY29uc3Qgc2FuaXRpemVIZWFkZXJzID0gKGhlYWRlcnM6IEhlYWRlcnNJbml0IHwgdW5kZWZpbmVkKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9PiB7XHJcbiAgaWYgKCFoZWFkZXJzKSByZXR1cm4ge307XHJcblxyXG4gIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xyXG4gICAgY29uc3QgcmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XHJcbiAgICBoZWFkZXJzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcclxuICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIGlmIChBcnJheS5pc0FycmF5KGhlYWRlcnMpKSB7XHJcbiAgICByZXR1cm4gaGVhZGVycy5yZWR1Y2U8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4oKGFjYywgW2tleSwgdmFsdWVdKSA9PiB7XHJcbiAgICAgIGFjY1tTdHJpbmcoa2V5KV0gPSBTdHJpbmcodmFsdWUpO1xyXG4gICAgICByZXR1cm4gYWNjO1xyXG4gICAgfSwge30pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKGhlYWRlcnMpLnJlZHVjZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PigoYWNjLCBba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSBudWxsKSByZXR1cm4gYWNjO1xyXG4gICAgYWNjW2tleV0gPSBTdHJpbmcodmFsdWUpO1xyXG4gICAgcmV0dXJuIGFjYztcclxuICB9LCB7fSk7XHJcbn07XHJcblxyXG5jb25zdCBnZXRIZWFkZXJWYWx1ZSA9IChoZWFkZXJzOiBIZWFkZXJzSW5pdCB8IHVuZGVmaW5lZCwga2V5OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRLZXkgPSBrZXkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHNhbml0aXplSGVhZGVycyhoZWFkZXJzKSk7XHJcbiAgY29uc3QgbWF0Y2ggPSBlbnRyaWVzLmZpbmQoKFtoZWFkZXJLZXldKSA9PiBoZWFkZXJLZXkudHJpbSgpLnRvTG93ZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWRLZXkpO1xyXG4gIHJldHVybiBzYWZlVGV4dChtYXRjaD8uWzFdKTtcclxufTtcclxuXHJcbmNvbnN0IHJlbW92ZUhlYWRlclZhbHVlID0gKGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sIGtleTogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEtleSA9IGtleS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxuICBjb25zdCB0b0RlbGV0ZSA9IE9iamVjdC5rZXlzKGhlYWRlcnMpLmZpbmQoKGhlYWRlcktleSkgPT4gaGVhZGVyS2V5LnRyaW0oKS50b0xvd2VyQ2FzZSgpID09PSBub3JtYWxpemVkS2V5KTtcclxuICBpZiAoIXRvRGVsZXRlKSByZXR1cm47XHJcbiAgZGVsZXRlIGhlYWRlcnNbdG9EZWxldGVdO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplQXhVc2VySWRIZWFkZXIgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBzYWZlVGV4dCh2YWx1ZSk7XHJcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gXCJcIjtcclxuICBpZiAoL14tXFxkKyQvLnRlc3Qobm9ybWFsaXplZCkpIHtcclxuICAgIHJldHVybiBub3JtYWxpemVkO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbGFiZWxTZXBhcmF0b3IgPSBub3JtYWxpemVkLmluZGV4T2YoXCIgLSBcIik7XHJcbiAgaWYgKGxhYmVsU2VwYXJhdG9yID4gMCkge1xyXG4gICAgcmV0dXJuIHNhZmVUZXh0KG5vcm1hbGl6ZWQuc2xpY2UoMCwgbGFiZWxTZXBhcmF0b3IpKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVkO1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZUJlYXJlclRva2VuID0gKGhlYWRlcnM6IEhlYWRlcnNJbml0IHwgdW5kZWZpbmVkKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBhdXRob3JpemF0aW9uID0gZ2V0SGVhZGVyVmFsdWUoaGVhZGVycywgXCJBdXRob3JpemF0aW9uXCIpO1xyXG4gIGlmICghYXV0aG9yaXphdGlvbikgcmV0dXJuIFwiXCI7XHJcblxyXG4gIGlmICgvXmJlYXJlclxccysvaS50ZXN0KGF1dGhvcml6YXRpb24pKSB7XHJcbiAgICByZXR1cm4gYXV0aG9yaXphdGlvbi5yZXBsYWNlKC9eYmVhcmVyXFxzKy9pLCBcIlwiKS50cmltKCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYXV0aG9yaXphdGlvbi50cmltKCk7XHJcbn07XHJcblxyXG5jb25zdCByZWFkV2luZG93QXV0aFNlZWQgPSAoKTogUGFydGlhbDxFeHBlbnNlQXBpQXV0aFNlZWQ+ID0+IHtcclxuICBjb25zdCBydW50aW1lV2luZG93ID0gcmVhZEV4cGVuc2VXaW5kb3dSdW50aW1lKCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0b2tlbjogc2FmZVRleHQocnVudGltZVdpbmRvdy5fX0lORF9BUElfVE9LRU5fXyksXHJcbiAgICBlbnRyYU9pZDogc2FmZVRleHQocnVudGltZVdpbmRvdy5fX0lORF9FTlRSQV9PSURfXyksXHJcbiAgICBhcHBDb2RlOiBzYWZlVGV4dChydW50aW1lV2luZG93Ll9fSU5EX0FQUF9DT0RFX18pLFxyXG4gICAgc3RyaWN0QXBpUm91dGVzOiB0b0ZsYWdCb29sKHJ1bnRpbWVXaW5kb3cuX19JTkRfRVhQRU5TRV9TVFJJQ1RfQVBJX18pID09PSB0cnVlLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCB0cnlQYXJzZUpzb24gPSAocmF3OiBzdHJpbmcpOiB1bmtub3duIHwgbnVsbCA9PiB7XHJcbiAgaWYgKCFyYXcgfHwgIXJhdy50cmltKCkpIHJldHVybiBudWxsO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gSlNPTi5wYXJzZShyYXcpO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlID0gPFQ+KHZhbHVlOiBUKTogVCA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcclxuICAgIHJldHVybiB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHZhbHVlKSkgYXMgVDtcclxufTtcclxuXHJcbmNvbnN0IHJlYWRSdW50aW1lU3RyaWN0QXBpRmxhZyA9ICgpOiBib29sZWFuID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGZhbHNlO1xyXG4gIGNvbnN0IHJ1bnRpbWVXaW5kb3cgPSByZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUoKTtcclxuXHJcbiAgY29uc3QgZXhwbGljaXRXaW5kb3dGbGFnID0gdG9GbGFnQm9vbChydW50aW1lV2luZG93Ll9fSU5EX0VYUEVOU0VfU1RSSUNUX0FQSV9fKTtcclxuICByZXR1cm4gZXhwbGljaXRXaW5kb3dGbGFnID09PSB0cnVlO1xyXG59O1xyXG5cclxuY29uc3QgcmVhZFdpbmRvd1NlbGVjdGVkQ29tcGFueSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiBzYWZlVGV4dChyZWFkRXhwZW5zZVdpbmRvd1J1bnRpbWUoKS5fX0lORF9TRUxFQ1RFRF9DT01QQU5ZX18pLnRvVXBwZXJDYXNlKCk7XHJcbn07XHJcblxyXG4vLyBDcmVhdGVzIG9uZSBzdGFuZGFyZCBhYm9ydCBlcnJvciB3aXRob3V0IGNhbmNlbGxpbmcgdGhlIHNoYXJlZCB1bmRlcmx5aW5nIHJlcXVlc3QuXHJcbmNvbnN0IGNyZWF0ZUV4cGVuc2VBYm9ydEVycm9yID0gKCk6IERPTUV4Y2VwdGlvbiA9PiB7XHJcbiAgcmV0dXJuIG5ldyBET01FeGNlcHRpb24oXCJBYm9ydGVkXCIsIFwiQWJvcnRFcnJvclwiKTtcclxufTtcclxuXHJcbi8vIExldHMgb25lIGNhbGxlciBzdG9wIHdhaXRpbmcgb24gc2hhcmVkIGNvbnRleHQgcmVzb2x1dGlvbiB3aXRob3V0IGFib3J0aW5nIG90aGVyIGNvbnN1bWVycy5cclxuY29uc3Qgd2FpdEZvckFib3J0YWJsZUV4cGVuc2VSZXN1bHQgPSBhc3luYyA8VD4ocHJvbWlzZTogUHJvbWlzZTxUPiwgc2lnbmFsPzogQWJvcnRTaWduYWwpOiBQcm9taXNlPFQ+ID0+IHtcclxuICBpZiAoIXNpZ25hbCkgcmV0dXJuIHByb21pc2U7XHJcbiAgaWYgKHNpZ25hbC5hYm9ydGVkKSB7XHJcbiAgICB0aHJvdyBjcmVhdGVFeHBlbnNlQWJvcnRFcnJvcigpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGF3YWl0IG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgIGNvbnN0IGhhbmRsZUFib3J0ID0gKCkgPT4ge1xyXG4gICAgICBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGhhbmRsZUFib3J0KTtcclxuICAgICAgcmVqZWN0KGNyZWF0ZUV4cGVuc2VBYm9ydEVycm9yKCkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzaWduYWwuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGhhbmRsZUFib3J0LCB7IG9uY2U6IHRydWUgfSk7XHJcbiAgICBwcm9taXNlLnRoZW4oXHJcbiAgICAgICh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHNpZ25hbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgaGFuZGxlQWJvcnQpO1xyXG4gICAgICAgIHJlc29sdmUodmFsdWUpO1xyXG4gICAgICB9LFxyXG4gICAgICAoZXJyb3IpID0+IHtcclxuICAgICAgICBzaWduYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIGhhbmRsZUFib3J0KTtcclxuICAgICAgICByZWplY3QoZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRDb250ZXh0S2V5ID0gKHNlZWQ6IEV4cGVuc2VBcGlBdXRoU2VlZCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIGAke3NlZWQudG9rZW59fCR7c2VlZC5lbnRyYU9pZH18JHtzZWVkLmFwcENvZGV9fCR7cmVhZFdpbmRvd1NlbGVjdGVkQ29tcGFueSgpfWA7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZEV4cGVuc2VIZWFkZXJzID0gKFxyXG4gIGNvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMsXHJcbiAgaW5jbHVkZUpzb24gPSBmYWxzZSxcclxuICBpbmNsdWRlQXhVc2VySWQgPSB0cnVlXHJcbik6IEhlYWRlcnNJbml0ID0+IHtcclxuICBjb25zdCBiYXNlID0gc2FuaXRpemVIZWFkZXJzKG9wdGlvbnM/LmhlYWRlcnMpO1xyXG4gIGNvbnN0IG1lcmdlZDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHsgLi4uYmFzZSB9O1xyXG5cclxuICBpZiAoc2FmZVRleHQoY29udGV4dC50b2tlbikpIHtcclxuICAgIG1lcmdlZC5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke2NvbnRleHQudG9rZW59YDtcclxuICB9XHJcblxyXG4gIGlmIChzYWZlVGV4dChjb250ZXh0LmNvbXBhbnlJZCkpIHtcclxuICAgIG1lcmdlZFtcIlgtSU5ELUNvbXBhbnlcIl0gPSBjb250ZXh0LmNvbXBhbnlJZDtcclxuICB9XHJcblxyXG4gIGlmIChpbmNsdWRlQXhVc2VySWQpIHtcclxuICAgIGNvbnN0IHJlcXVlc3RBeFVzZXJJZCA9IGdldEhlYWRlclZhbHVlKG9wdGlvbnM/LmhlYWRlcnMsIFwiWC1JTkQtQXhVc2VySWRcIik7XHJcbiAgICBjb25zdCBvdmVycmlkZUF4VXNlcklkID0gZ2V0RXhwZW5zZUFjdGluZ1VzZXJPdmVycmlkZSgpO1xyXG4gICAgY29uc3QgcmVzb2x2ZWRBeFVzZXJJZCA9IHNhZmVUZXh0KHJlcXVlc3RBeFVzZXJJZCB8fCBvdmVycmlkZUF4VXNlcklkIHx8IGNvbnRleHQuYXhVc2VySWQpO1xyXG4gICAgaWYgKHJlc29sdmVkQXhVc2VySWQpIHtcclxuICAgICAgbWVyZ2VkW1wiWC1JTkQtQXhVc2VySWRcIl0gPSByZXNvbHZlZEF4VXNlcklkO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVtb3ZlSGVhZGVyVmFsdWUobWVyZ2VkLCBcIlgtSU5ELUF4VXNlcklkXCIpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShtZXJnZWQsIFwiWC1JTkQtQXhVc2VySWRcIik7XHJcbiAgfVxyXG5cclxuICBpZiAoaW5jbHVkZUpzb24pIHtcclxuICAgIG1lcmdlZFtcIkNvbnRlbnQtVHlwZVwiXSA9IFwiYXBwbGljYXRpb24vanNvblwiO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1lcmdlZDtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkRXhwZW5zZUZvcm1IZWFkZXJzID0gKGNvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0LCBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogSGVhZGVyc0luaXQgPT4ge1xyXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMoYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCBmYWxzZSkpO1xyXG4gIHJlbW92ZUhlYWRlclZhbHVlKGhlYWRlcnMsIFwiQ29udGVudC1UeXBlXCIpO1xyXG4gIHJldHVybiBoZWFkZXJzO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRDb250ZXh0SGVhZGVycyA9ICh0b2tlbjogc3RyaW5nLCBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zKTogSGVhZGVyc0luaXQgPT4ge1xyXG4gIGNvbnN0IGJhc2UgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XHJcbiAgY29uc3QgbWVyZ2VkOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gICAgLi4uYmFzZSxcclxuICAgIC4uLkpTT05fSEVBREVSUyxcclxuICB9O1xyXG5cclxuICBpZiAoc2FmZVRleHQodG9rZW4pKSB7XHJcbiAgICBtZXJnZWQuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1lcmdlZDtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVBdXRoVG9rZW4gPSAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgdG9rZW5Gcm9tSGVhZGVycyA9IHJlc29sdmVCZWFyZXJUb2tlbihvcHRpb25zPy5oZWFkZXJzKTtcclxuICBjb25zdCB3aW5kb3dTZWVkID0gcmVhZFdpbmRvd0F1dGhTZWVkKCk7XHJcbiAgcmV0dXJuIHNhZmVUZXh0KHRva2VuRnJvbUhlYWRlcnMgfHwgcnVudGltZUF1dGhTZWVkLnRva2VuIHx8IHdpbmRvd1NlZWQudG9rZW4pO1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZUF1dGhTZWVkID0gKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBFeHBlbnNlQXBpQXV0aFNlZWQgPT4ge1xyXG4gIGNvbnN0IHdpbmRvd1NlZWQgPSByZWFkV2luZG93QXV0aFNlZWQoKTtcclxuICBjb25zdCB0b2tlbiA9IHJlc29sdmVBdXRoVG9rZW4ob3B0aW9ucyk7XHJcbiAgY29uc3QgZW50cmFPaWQgPSBzYWZlVGV4dChydW50aW1lQXV0aFNlZWQuZW50cmFPaWQgfHwgd2luZG93U2VlZC5lbnRyYU9pZCk7XHJcbiAgY29uc3QgYXBwQ29kZSA9IHNhZmVUZXh0KHJ1bnRpbWVBdXRoU2VlZC5hcHBDb2RlIHx8IHdpbmRvd1NlZWQuYXBwQ29kZSB8fCBERUZBVUxUX0FQUF9DT0RFKSB8fCBERUZBVUxUX0FQUF9DT0RFO1xyXG4gIGNvbnN0IHN0cmljdEFwaVJvdXRlcyA9XHJcbiAgICB0eXBlb2YgcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcyA9PT0gXCJib29sZWFuXCJcclxuICAgICAgPyBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzXHJcbiAgICAgIDogKHdpbmRvd1NlZWQuc3RyaWN0QXBpUm91dGVzID09PSB0cnVlKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHRva2VuLFxyXG4gICAgZW50cmFPaWQsXHJcbiAgICBhcHBDb2RlLFxyXG4gICAgc3RyaWN0QXBpUm91dGVzLFxyXG4gIH07XHJcbn07XHJcblxyXG50eXBlIFJhd0VudHJhQ29udGV4dENvbXBhbnkgPSB7XHJcbiAgQ29tcGFueUlkPzogdW5rbm93bjtcclxuICBjb21wYW55SWQ/OiB1bmtub3duO1xyXG4gIElzRGVmYXVsdD86IHVua25vd247XHJcbiAgaXNEZWZhdWx0PzogdW5rbm93bjtcclxuICBBbGxvd1NlbGZNYW5hZ2VtZW50PzogdW5rbm93bjtcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50PzogdW5rbm93bjtcclxuICBDcm1Vc2VySWQ/OiB1bmtub3duO1xyXG4gIGNybVVzZXJJZD86IHVua25vd247XHJcbn07XHJcblxyXG50eXBlIE5vcm1hbGl6ZWRFbnRyYUNvbnRleHRDb21wYW55ID0ge1xyXG4gIGNvbXBhbnlJZDogc3RyaW5nO1xyXG4gIGlzRGVmYXVsdDogYm9vbGVhbjtcclxuICBhbGxvd1NlbGZNYW5hZ2VtZW50OiBib29sZWFuO1xyXG4gIGNybVVzZXJJZDogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBSYXdFbnRyYUNvbnRleHRIZWFkZXIgPSB7XHJcbiAgQXhVc2VySWQ/OiB1bmtub3duO1xuICBheFVzZXJJZD86IHVua25vd247XG4gIFVzZXJOYW1lPzogdW5rbm93bjtcbiAgdXNlck5hbWU/OiB1bmtub3duO1xuICBEZWZhdWx0Q29tcGFueT86IHVua25vd247XG4gIGRlZmF1bHRDb21wYW55PzogdW5rbm93bjtcbiAgRGVmYXVsdEN1cnJlbmN5Q29kZT86IHVua25vd247XHJcbiAgZGVmYXVsdEN1cnJlbmN5Q29kZT86IHVua25vd247XHJcbn07XHJcblxyXG50eXBlIFJhd0VudHJhQ29udGV4dEl0ZW0gPSB7XHJcbiAgSGVhZGVyPzogUmF3RW50cmFDb250ZXh0SGVhZGVyO1xyXG4gIGhlYWRlcj86IFJhd0VudHJhQ29udGV4dEhlYWRlcjtcclxuICBDb21wYW5pZXM/OiB1bmtub3duO1xyXG4gIGNvbXBhbmllcz86IHVua25vd247XHJcbn07XHJcblxyXG4vLyBNYXBzIG9uZSBFbnRyYSBjb21wYW55IGl0ZW0gdG8gdGhlIGZyb250ZW5kLXNhZmUgc2hhcGUgdXNlZCBieSBjb250ZXh0IGNvbnN1bWVycy5cclxuY29uc3QgbWFwRW50cmFDb250ZXh0Q29tcGFueSA9IChpdGVtOiB1bmtub3duKTogTm9ybWFsaXplZEVudHJhQ29udGV4dENvbXBhbnkgfCBudWxsID0+IHtcclxuICBpZiAoIWl0ZW0gfHwgdHlwZW9mIGl0ZW0gIT09IFwib2JqZWN0XCIpIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCByYXcgPSBpdGVtIGFzIFJhd0VudHJhQ29udGV4dENvbXBhbnk7XHJcbiAgY29uc3QgY29tcGFueUlkID0gc2FmZVRleHQocmF3LkNvbXBhbnlJZCA/PyByYXcuY29tcGFueUlkKTtcclxuICBpZiAoIWNvbXBhbnlJZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBjb21wYW55SWQsXHJcbiAgICBpc0RlZmF1bHQ6IHRvRmxhZ0Jvb2wocmF3LklzRGVmYXVsdCA/PyByYXcuaXNEZWZhdWx0KSA9PT0gdHJ1ZSxcclxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQ6IHRvRmxhZ0Jvb2wocmF3LkFsbG93U2VsZk1hbmFnZW1lbnQgPz8gcmF3LmFsbG93U2VsZk1hbmFnZW1lbnQpID09PSB0cnVlLFxyXG4gICAgY3JtVXNlcklkOiBzYWZlVGV4dChyYXcuQ3JtVXNlcklkID8/IHJhdy5jcm1Vc2VySWQpLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCB2YWxpZGF0ZUNvbnRleHRSZXNwb25zZSA9IChyZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFbnRyYUNvbnRleHREdG8+KTogRXhwZW5zZUFwaUNvbnRleHQgPT4ge1xyXG4gIGNvbnN0IHJhd1Jlc3BvbnNlID0gcmVzcG9uc2UgYXMge1xyXG4gICAgU3VjY2Vzcz86IHVua25vd247XHJcbiAgICBzdWNjZXNzPzogdW5rbm93bjtcclxuICAgIE1lc3NhZ2U/OiB1bmtub3duO1xyXG4gICAgbWVzc2FnZT86IHVua25vd247XHJcbiAgICBJdGVtcz86IHVua25vd247XHJcbiAgICBpdGVtcz86IHVua25vd247XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaXNTdWNjZXNzID0gdG9GbGFnQm9vbChyYXdSZXNwb25zZS5TdWNjZXNzID8/IHJhd1Jlc3BvbnNlLnN1Y2Nlc3MpO1xyXG4gIGlmIChpc1N1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihzYWZlVGV4dChyYXdSZXNwb25zZS5NZXNzYWdlID8/IHJhd1Jlc3BvbnNlLm1lc3NhZ2UpIHx8IFwiQ291bGQgbm90IGxvYWQgRW50cmEgY29udGV4dC5cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBpdGVtcyA9IEFycmF5LmlzQXJyYXkocmF3UmVzcG9uc2UuSXRlbXMpXHJcbiAgICA/IHJhd1Jlc3BvbnNlLkl0ZW1zXHJcbiAgICA6IChBcnJheS5pc0FycmF5KHJhd1Jlc3BvbnNlLml0ZW1zKSA/IHJhd1Jlc3BvbnNlLml0ZW1zIDogW10pO1xyXG4gIGNvbnN0IGZpcnN0ID0gaXRlbXNbMF0gYXMgUmF3RW50cmFDb250ZXh0SXRlbSB8IHVuZGVmaW5lZDtcclxuICBjb25zdCBoZWFkZXIgPSBmaXJzdD8uSGVhZGVyID8/IGZpcnN0Py5oZWFkZXI7XHJcbiAgaWYgKCFmaXJzdCB8fCAhaGVhZGVyKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkNvdWxkIG5vdCBsb2FkIEVudHJhIGNvbnRleHQuXCIpO1xyXG4gIH1cclxuXG4gIGNvbnN0IGF4VXNlcklkID0gc2FmZVRleHQoaGVhZGVyLkF4VXNlcklkID8/IGhlYWRlci5heFVzZXJJZCk7XG4gIGNvbnN0IHVzZXJOYW1lID0gc2FmZVRleHQoaGVhZGVyLlVzZXJOYW1lID8/IGhlYWRlci51c2VyTmFtZSk7XG4gIGNvbnN0IGRlZmF1bHRDb21wYW55ID0gc2FmZVRleHQoaGVhZGVyLkRlZmF1bHRDb21wYW55ID8/IGhlYWRlci5kZWZhdWx0Q29tcGFueSk7XG4gIGNvbnN0IGRlZmF1bHRDdXJyZW5jeUNvZGUgPSBzYWZlVGV4dChoZWFkZXIuRGVmYXVsdEN1cnJlbmN5Q29kZSA/PyBoZWFkZXIuZGVmYXVsdEN1cnJlbmN5Q29kZSk7XG4gIGNvbnN0IGNvbXBhbmllc1JhdyA9IEFycmF5LmlzQXJyYXkoZmlyc3QuQ29tcGFuaWVzKVxyXG4gICAgPyBmaXJzdC5Db21wYW5pZXNcclxuICAgIDogKEFycmF5LmlzQXJyYXkoZmlyc3QuY29tcGFuaWVzKSA/IGZpcnN0LmNvbXBhbmllcyA6IFtdKTtcclxuICBjb25zdCBjb21wYW5pZXMgPSBjb21wYW5pZXNSYXdcclxuICAgIC5tYXAoKGl0ZW0pID0+IG1hcEVudHJhQ29udGV4dENvbXBhbnkoaXRlbSkpXHJcbiAgICAuZmlsdGVyKChpdGVtKTogaXRlbSBpcyBOb3JtYWxpemVkRW50cmFDb250ZXh0Q29tcGFueSA9PiAhIWl0ZW0pO1xyXG4gIGNvbnN0IHNlbGVjdGVkQ29tcGFueUlkID0gcmVhZFdpbmRvd1NlbGVjdGVkQ29tcGFueSgpO1xyXG4gIGNvbnN0IHNlbGVjdGVkQ29tcGFueU1hdGNoID0gc2VsZWN0ZWRDb21wYW55SWRcclxuICAgID8gY29tcGFuaWVzLmZpbmQoKGl0ZW0pID0+IHNhZmVUZXh0KGl0ZW0uY29tcGFueUlkKS50b1VwcGVyQ2FzZSgpID09PSBzZWxlY3RlZENvbXBhbnlJZClcclxuICAgIDogbnVsbDtcclxuXHJcbiAgLy8gTmV2ZXIgZmFsbCBiYWNrIHRvIGEgZGlmZmVyZW50IGNvbXBhbnkgd2hlbiB0aGUgdXNlciBzZWxlY3RlZCBvbmUgZXhwbGljaXRseS5cclxuICBpZiAoc2VsZWN0ZWRDb21wYW55SWQgJiYgIXNlbGVjdGVkQ29tcGFueU1hdGNoKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcclxuICAgICAgaW5kVChcclxuICAgICAgICBcIkV4cGVuc2VfQ29udGV4dF9TZWxlY3RlZENvbXBhbnlVbmF2YWlsYWJsZVwiLFxyXG4gICAgICAgIFwiVGhlIHNlbGVjdGVkIGNvbXBhbnkgaXMgbm8gbG9uZ2VyIGF2YWlsYWJsZS4gUGxlYXNlIGNob29zZSBpdCBhZ2FpbiBmcm9tIHRoZSBtYWluIG1lbnUuXCJcclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGZhbGxiYWNrQ29tcGFueSA9IHNhZmVUZXh0KGNvbXBhbmllcy5maW5kKChpdGVtKSA9PiBpdGVtLmlzRGVmYXVsdCk/LmNvbXBhbnlJZCk7XHJcbiAgY29uc3QgY29tcGFueUlkID1cclxuICAgIHNlbGVjdGVkQ29tcGFueU1hdGNoPy5jb21wYW55SWQgfHwgcmVzb2x2ZUVmZmVjdGl2ZUNvbXBhbnlJZChcIlwiLCBjb21wYW5pZXMsIGRlZmF1bHRDb21wYW55IHx8IGZhbGxiYWNrQ29tcGFueSk7XHJcbiAgY29uc3Qgc2VsZWN0ZWRDb21wYW55ID1cclxuICAgIHNlbGVjdGVkQ29tcGFueU1hdGNoIHx8IGNvbXBhbmllcy5maW5kKChpdGVtKSA9PiBzYWZlVGV4dChpdGVtLmNvbXBhbnlJZCkgPT09IGNvbXBhbnlJZCkgfHwgY29tcGFuaWVzWzBdO1xyXG4gIGNvbnN0IGFsbG93U2VsZk1hbmFnZW1lbnQgPSBzZWxlY3RlZENvbXBhbnk/LmFsbG93U2VsZk1hbmFnZW1lbnQgPT09IHRydWU7XHJcbiAgY29uc3QgY3JtVXNlcklkID0gc2FmZVRleHQoc2VsZWN0ZWRDb21wYW55Py5jcm1Vc2VySWQpO1xyXG5cclxuICBpZiAoIWF4VXNlcklkIHx8ICFjb21wYW55SWQpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiQ291bGQgbm90IHJlc29sdmUgRW50cmEgY29tcGFueSBjb250ZXh0LlwiKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0b2tlbjogXCJcIixcbiAgICBjb21wYW55SWQsXG4gICAgYXhVc2VySWQsXG4gICAgdXNlck5hbWUsXG4gICAgY3JtVXNlcklkLFxuICAgIGRlZmF1bHRDdXJyZW5jeUNvZGUsXG4gICAgYWxsb3dTZWxmTWFuYWdlbWVudCxcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0ID0gYXN5bmMgKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBQcm9taXNlPEV4cGVuc2VBcGlDb250ZXh0PiA9PiB7XHJcbiAgY29uc3Qgc2VlZCA9IHJlc29sdmVBdXRoU2VlZChvcHRpb25zKTtcclxuICBjb25zdCBjb250ZXh0S2V5ID0gYnVpbGRDb250ZXh0S2V5KHNlZWQpO1xyXG4gIGNvbnN0IHsgc2lnbmFsLCAuLi5iYXNlT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgaWYgKGNhY2hlZENvbnRleHQgJiYgY2FjaGVkQ29udGV4dEtleSA9PT0gY29udGV4dEtleSkge1xyXG4gICAgcmV0dXJuIHdhaXRGb3JBYm9ydGFibGVFeHBlbnNlUmVzdWx0KFByb21pc2UucmVzb2x2ZShjYWNoZWRDb250ZXh0KSwgc2lnbmFsKTtcclxuICB9XHJcblxyXG4gIGlmICghY29udGV4dFByb21pc2UgfHwgY2FjaGVkQ29udGV4dEtleSAhPT0gY29udGV4dEtleSkge1xyXG4gICAgY2FjaGVkQ29udGV4dEtleSA9IGNvbnRleHRLZXk7XHJcbiAgICBjb25zdCBzaGFyZWRDb250ZXh0UHJvbWlzZSA9IChhc3luYyAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbnRleHRQYXlsb2FkOiBFbnRyYUNvbnRleHRSZXF1ZXN0ID0ge1xyXG4gICAgICAgIGFwcENvZGU6IHNlZWQuYXBwQ29kZSxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChzYWZlVGV4dChzZWVkLmVudHJhT2lkKSkge1xyXG4gICAgICAgIGNvbnRleHRQYXlsb2FkLmVudHJhT2lkID0gc2VlZC5lbnRyYU9pZDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY29udGV4dFJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RW50cmFDb250ZXh0RHRvPj4oXCIvYXBpL2F1dGgvZW50cmEvY29udGV4dFwiLCB7XHJcbiAgICAgICAgLi4uYmFzZU9wdGlvbnMsXHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiBidWlsZENvbnRleHRIZWFkZXJzKHNlZWQudG9rZW4sIGJhc2VPcHRpb25zKSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShjb250ZXh0UGF5bG9hZCksXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgcmVzb2x2ZWQgPSB2YWxpZGF0ZUNvbnRleHRSZXNwb25zZShjb250ZXh0UmVzcG9uc2UpO1xyXG4gICAgICBjb25zdCBuZXh0Q29udGV4dDogRXhwZW5zZUFwaUNvbnRleHQgPSB7XHJcbiAgICAgICAgLi4ucmVzb2x2ZWQsXHJcbiAgICAgICAgdG9rZW46IHNlZWQudG9rZW4sXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIHdpbmRvdy5fX0lORF9BTExPV19TRUxGX01BTkFHRU1FTlRfXyA9IG5leHRDb250ZXh0LmFsbG93U2VsZk1hbmFnZW1lbnQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNhY2hlZENvbnRleHQgPSBuZXh0Q29udGV4dDtcclxuICAgICAgcmV0dXJuIG5leHRDb250ZXh0O1xyXG4gICAgfSkoKTtcclxuXHJcbiAgICBjb250ZXh0UHJvbWlzZSA9IHNoYXJlZENvbnRleHRQcm9taXNlO1xyXG4gICAgdm9pZCBzaGFyZWRDb250ZXh0UHJvbWlzZS5maW5hbGx5KCgpID0+IHtcclxuICAgICAgaWYgKGNvbnRleHRQcm9taXNlID09PSBzaGFyZWRDb250ZXh0UHJvbWlzZSkge1xyXG4gICAgICAgIGNvbnRleHRQcm9taXNlID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYXdhaXQgd2FpdEZvckFib3J0YWJsZUV4cGVuc2VSZXN1bHQoY29udGV4dFByb21pc2UsIHNpZ25hbCk7XHJcbn07XHJcblxyXG4vLyBFeHBvc2VzIHJlc29sdmVkIEVudHJhIGNvbnRleHQgdmFsdWVzIG5lZWRlZCBieSBHYXN0b3MgVUkgbWFuYWdlbWVudCBzdGF0ZS5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VBcGlDb250ZXh0U25hcHNob3QgPSBhc3luYyAob3B0aW9ucz86IEFwaUZldGNoT3B0aW9ucyk6IFByb21pc2U8RXhwZW5zZUFwaUNvbnRleHRTbmFwc2hvdD4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICByZXR1cm4ge1xyXG4gICAgY29tcGFueUlkOiBzYWZlVGV4dChjb250ZXh0LmNvbXBhbnlJZCkudG9VcHBlckNhc2UoKSxcbiAgICBheFVzZXJJZDogc2FmZVRleHQoY29udGV4dC5heFVzZXJJZCksXG4gICAgdXNlck5hbWU6IHNhZmVUZXh0KGNvbnRleHQudXNlck5hbWUpLFxuICAgIGNybVVzZXJJZDogc2FmZVRleHQoY29udGV4dC5jcm1Vc2VySWQpLFxuICAgIGFsbG93U2VsZk1hbmFnZW1lbnQ6IGNvbnRleHQuYWxsb3dTZWxmTWFuYWdlbWVudCA9PT0gdHJ1ZSxcbiAgfTtcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZUxpc3RQYWdlZFJlc3BvbnNlVHJhbnNmb3JtO1xyXG5jb25zdCBub3JtYWxpemVEZXRhaWxQYWdlZFJlc3BvbnNlID0gbm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplQXBpUmVzcG9uc2UgPSBub3JtYWxpemVBcGlSZXNwb25zZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZSA9IG5vcm1hbGl6ZVRpY2tldFF1aWNrQ3JlYXRlUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplU3Vib3JkaW5hdGVzUGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZVN1Ym9yZGluYXRlc1BhZ2VkUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlID0gbm9ybWFsaXplVGlja2V0TGlzdFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZVRyYW5zZm9ybTtcclxuY29uc3Qgbm9ybWFsaXplVGlja2V0RGV0YWlsUGFnZWRSZXNwb25zZSA9IG5vcm1hbGl6ZVRpY2tldERldGFpbFBhZ2VkUmVzcG9uc2VUcmFuc2Zvcm07XHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpbmtCdWxrUmVzcG9uc2UgPSBub3JtYWxpemVUaWNrZXRMaW5rQnVsa1Jlc3BvbnNlVHJhbnNmb3JtO1xyXG5cclxuY29uc3QgbG9va3NMaWtlSHRtbERvY3VtZW50ID0gKHZhbHVlOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3QgcmF3ID0gc2FmZVRleHQodmFsdWUpLnRvTG93ZXJDYXNlKCk7XHJcbiAgcmV0dXJuIHJhdy5zdGFydHNXaXRoKFwiPCFkb2N0eXBlIGh0bWxcIikgfHwgcmF3LnN0YXJ0c1dpdGgoXCI8aHRtbFwiKTtcclxufTtcclxuXHJcbmNvbnN0IGlzQXBpUm91dGVVbmF2YWlsYWJsZSA9IChlcnJvcjogdW5rbm93bik6IGVycm9yIGlzIEFwaUZldGNoRXJyb3IgPT4ge1xyXG4gIGlmICghKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikpIHJldHVybiBmYWxzZTtcclxuICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDQgfHwgZXJyb3Iuc3RhdHVzID09PSA0MDUpIHJldHVybiB0cnVlO1xyXG4gIHJldHVybiBlcnJvci5zdGF0dXMgPT09IHVuZGVmaW5lZCAmJiBsb29rc0xpa2VIdG1sRG9jdW1lbnQoZXJyb3IucmVzcG9uc2VCb2R5KTtcclxufTtcclxuXHJcbmNvbnN0IGlzU3RyaWN0QXBpUm91dGVzRW5hYmxlZCA9ICgpOiBib29sZWFuID0+IHtcclxuICBpZiAodHlwZW9mIHJ1bnRpbWVBdXRoU2VlZC5zdHJpY3RBcGlSb3V0ZXMgPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICByZXR1cm4gcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcztcclxuICB9XHJcblxyXG4gIHJldHVybiByZWFkUnVudGltZVN0cmljdEFwaUZsYWcoKTtcclxufTtcclxuXHJcbmNvbnN0IHNob3VsZFVzZUxlZ2FjeUZhbGxiYWNrID0gKGVycm9yOiB1bmtub3duKTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKGlzU3RyaWN0QXBpUm91dGVzRW5hYmxlZCgpKSByZXR1cm4gZmFsc2U7XHJcbiAgcmV0dXJuIGlzQXBpUm91dGVVbmF2YWlsYWJsZShlcnJvcik7XHJcbn07XHJcblxyXG5jb25zdCB0b0xlZ2FjeUxpc3RSZXF1ZXN0UGF5bG9hZCA9IChwYXlsb2FkOiBFeHBlbnNlU2hlZXRMaXN0QXBpUmVxdWVzdCkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBmaWx0ZXI6IHNhZmVUZXh0KHBheWxvYWQuZmlsdGVyKSxcclxuICAgIGhvamFHYXN0b3NJZDogc2FmZVRleHQocGF5bG9hZC5maWx0ZXIpLFxyXG4gICAgYmlsbGVkTW9kZTogcGF5bG9hZC5iaWxsZWRNb2RlID8/IDIsXHJcbiAgICBmcm9tRGF0ZTogc2FmZVRleHQocGF5bG9hZC5jcmVhdGVkRGF0ZUZyb20pLFxyXG4gICAgdG9EYXRlOiBzYWZlVGV4dChwYXlsb2FkLmNyZWF0ZWREYXRlVG8pLFxyXG4gICAgcHJvamVjdElkOiBzYWZlVGV4dChwYXlsb2FkLnByb2pJZCksXHJcbiAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KHBheWxvYWQuY3VycmVuY3lDb2RlKSxcclxuICAgIGV4cGVuc2VTaGVldFN0YXR1czogbm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlcihwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyksXHJcbiAgICByZWltYnVyc2FibGVFeHBlbnNlOiBub3JtYWxpemVFeHBlbnNlU2hlZXRSZWltYnVyc2FibGUocGF5bG9hZC5yZWltYnVyc2FibGVFeHBlbnNlKSxcclxuICAgIGluY2x1ZGVTdWJvcmRpbmF0ZXM6IHBheWxvYWQuaW5jbHVkZVN1Ym9yZGluYXRlcyA9PT0gdHJ1ZSxcclxuICAgIHBhZ2U6IE51bWJlci5pc0Zpbml0ZShwYXlsb2FkLnBhZ2UpICYmIHBheWxvYWQucGFnZSA+IDAgPyBwYXlsb2FkLnBhZ2UgOiAxLFxyXG4gICAgcGFnZVNpemU6IE51bWJlci5pc0Zpbml0ZShwYXlsb2FkLnBhZ2VTaXplKSAmJiBwYXlsb2FkLnBhZ2VTaXplID4gMCA/IHBheWxvYWQucGFnZVNpemUgOiA1MCxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgbWFwTGVnYWN5TGlzdEl0ZW1Ub0FwaUxpc3RJdGVtID0gKGl0ZW06IExlZ2FjeUV4cGVuc2VMaXN0SXRlbSk6IEV4cGVuc2VTaGVldExpc3RJdGVtRHRvID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgSG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChpdGVtLmhvamFHYXN0b3NJZCksXHJcbiAgICBEZXNjcmlwdGlvbjogc2FmZVRleHQoaXRlbS5kZXNjcmlwdGlvbiksXHJcbiAgICBFeHBlbnNlU2hlZXRTdGF0dXM6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5leHBlbnNlU2hlZXRTdGF0dXMpLFxyXG4gICAgRXN0YWRvQ29tZW50YXJpb3M6IHNhZmVUZXh0KGl0ZW0uZXN0YWRvQ29tZW50YXJpb3MpIHx8IG51bGwsXHJcbiAgICBVc2VySWQ6IHNhZmVUZXh0KGl0ZW0udXNlcklkKSB8fCBudWxsLFxyXG4gICAgVXNlck5hbWU6IHNhZmVUZXh0KGl0ZW0udXNlck5hbWUpIHx8IG51bGwsXHJcbiAgICBPd25lckF4VXNlcklkOiBzYWZlVGV4dChpdGVtLm93bmVyQXhVc2VySWQpIHx8IG51bGwsXHJcbiAgICBPd25lck5hbWU6IHNhZmVUZXh0KGl0ZW0ub3duZXJOYW1lKSB8fCBudWxsLFxyXG4gICAgVm91Y2hlcjogc2FmZVRleHQoaXRlbS52b3VjaGVyKSxcclxuICAgIFByb2pJZDogc2FmZVRleHQoaXRlbS5wcm9qSWQpLFxyXG4gICAgQ3VycmVuY3lDb2RlOiBzYWZlVGV4dChpdGVtLmN1cnJlbmN5Q29kZSksXHJcbiAgICBUb3RhbEFtb3VudDogdG9OdWxsYWJsZU51bWJlcihpdGVtLnRvdGFsQW1vdW50Q3VycmVuY3kgPz8gaXRlbS50b3RhbEFtb3VudCksXG4gICAgVG90YWxBbW91bnRDdXJyZW5jeTogdG9OdWxsYWJsZU51bWJlcihpdGVtLnRvdGFsQW1vdW50Q3VycmVuY3kgPz8gaXRlbS50b3RhbEFtb3VudCksXG4gICAgVG90YWxBbW91bnRNU1Q6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS50b3RhbEFtb3VudE1TVCksXG4gICAgRXhjaFJhdGU6IHRvTnVsbGFibGVOdW1iZXIoaXRlbS5leGNoUmF0ZSksXHJcbiAgICBFeGNoYW5nZVJhdGVNb2RlOiB0b051bGxhYmxlTnVtYmVyKGl0ZW0uZXhjaGFuZ2VSYXRlTW9kZSksXHJcbiAgICBSZWltYnVyc2FibGVFeHBlbnNlOiBub3JtYWxpemVFeHBlbnNlU2hlZXRSZWltYnVyc2FibGUoaXRlbS5yZWltYnVyc2FibGVFeHBlbnNlKSxcclxuICAgIENyZWF0ZWREYXRlOiBzYWZlVGV4dChpdGVtLmNyZWF0ZWREYXRlKSB8fCBudWxsLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBtYXBMZWdhY3lMaXN0UmVzcG9uc2UgPSAoXHJcbiAgbGVnYWN5OiBMZWdhY3lFeHBlbnNlTGlzdFJlc3BvbnNlLFxyXG4gIGZhbGxiYWNrUGFnZTogbnVtYmVyLFxyXG4gIGZhbGxiYWNrUGFnZVNpemU6IG51bWJlclxyXG4pOiBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldExpc3RJdGVtRHRvPiA9PiB7XHJcbiAgY29uc3QgbGVnYWN5SXRlbXMgPSBBcnJheS5pc0FycmF5KGxlZ2FjeT8uaXRlbXMpID8gbGVnYWN5Lml0ZW1zIDogW107XHJcbiAgY29uc3QgbWFwcGVkSXRlbXMgPSBsZWdhY3lJdGVtcy5tYXAoKGVudHJ5KSA9PiBtYXBMZWdhY3lMaXN0SXRlbVRvQXBpTGlzdEl0ZW0oZW50cnkpKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIFN1Y2Nlc3M6IGxlZ2FjeS5zdWNjZXNzICE9PSBmYWxzZSxcclxuICAgIE1lc3NhZ2U6IHNhZmVUZXh0KGxlZ2FjeS5tZXNzYWdlKSB8fCBcIk9LXCIsXHJcbiAgICBUb3RhbDogdG9OdWxsYWJsZU51bWJlcihsZWdhY3kudG90YWwpID8/IG1hcHBlZEl0ZW1zLmxlbmd0aCxcclxuICAgIFBhZ2U6IHRvTnVsbGFibGVOdW1iZXIobGVnYWN5LnBhZ2UpID8/IGZhbGxiYWNrUGFnZSxcclxuICAgIFBhZ2VTaXplOiB0b051bGxhYmxlTnVtYmVyKGxlZ2FjeS5wYWdlU2l6ZSkgPz8gZmFsbGJhY2tQYWdlU2l6ZSxcclxuICAgIEl0ZW1zOiBtYXBwZWRJdGVtcyxcclxuICAgIFRyYWNlSWQ6IHVuZGVmaW5lZCxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gU2V0cyBydW50aW1lIGF1dGggaW5wdXRzIHVzZWQgdG8gcmVzb2x2ZSBFbnRyYSBjb250ZXh0IGFuZCBtYW5kYXRvcnkgZXhwZW5zZSBoZWFkZXJzLlxyXG5leHBvcnQgY29uc3QgY29uZmlndXJlRXhwZW5zZUFwaUF1dGggPSAoc2VlZDogUGFydGlhbDxFeHBlbnNlQXBpQXV0aFNlZWQ+KTogdm9pZCA9PiB7XHJcbiAgY29uc3Qgc3RyaWN0RnJvbVNlZWQgPSB0b0ZsYWdCb29sKHNlZWQuc3RyaWN0QXBpUm91dGVzKTtcclxuICBjb25zdCBzdHJpY3RGcm9tUnVudGltZSA9XHJcbiAgICB0eXBlb2YgcnVudGltZUF1dGhTZWVkLnN0cmljdEFwaVJvdXRlcyA9PT0gXCJib29sZWFuXCIgPyBydW50aW1lQXV0aFNlZWQuc3RyaWN0QXBpUm91dGVzIDogcmVhZFJ1bnRpbWVTdHJpY3RBcGlGbGFnKCk7XHJcblxyXG4gIHJ1bnRpbWVBdXRoU2VlZCA9IHtcclxuICAgIC4uLnJ1bnRpbWVBdXRoU2VlZCxcclxuICAgIHRva2VuOiBzYWZlVGV4dChzZWVkLnRva2VuIHx8IHJ1bnRpbWVBdXRoU2VlZC50b2tlbiksXHJcbiAgICBlbnRyYU9pZDogc2FmZVRleHQoc2VlZC5lbnRyYU9pZCB8fCBydW50aW1lQXV0aFNlZWQuZW50cmFPaWQpLFxyXG4gICAgYXBwQ29kZTogc2FmZVRleHQoc2VlZC5hcHBDb2RlIHx8IHJ1bnRpbWVBdXRoU2VlZC5hcHBDb2RlIHx8IERFRkFVTFRfQVBQX0NPREUpLFxyXG4gICAgc3RyaWN0QXBpUm91dGVzOiBzdHJpY3RGcm9tU2VlZCA/PyBzdHJpY3RGcm9tUnVudGltZSxcclxuICB9O1xyXG5cclxuICBjYWNoZWRDb250ZXh0ID0gbnVsbDtcclxuICBjYWNoZWRDb250ZXh0S2V5ID0gXCJcIjtcclxuICBjb250ZXh0UHJvbWlzZSA9IG51bGw7XHJcbiAgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuY2xlYXIoKTtcclxuICBwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5jbGVhcigpO1xyXG59O1xyXG5cclxuLy8gTWFwcyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2xpc3QgaXRlbSBjb250cmFjdCB0byBsaXN0IGNhcmQgVUkgbW9kZWwuXHJcbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRMaXN0SXRlbVRvQ2FyZCA9IG1hcEV4cGVuc2VTaGVldExpc3RJdGVtVG9DYXJkQ29yZTtcclxuXHJcbi8vIE1hcHMgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfSBoZWFkZXIgY29udHJhY3QgdG8gVUkgbW9kZWwuXHJcbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRIZWFkZXIgPSBtYXBFeHBlbnNlU2hlZXRIZWFkZXJDb3JlO1xyXG5cclxuLy8gTWFwcyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9IGxpbmUgY29udHJhY3QgdG8gVUkgbW9kZWwuXHJcbmV4cG9ydCBjb25zdCBtYXBFeHBlbnNlU2hlZXRMaW5lID0gbWFwRXhwZW5zZVNoZWV0TGluZUNvcmU7XHJcblxyXG5leHBvcnQgdHlwZSBFeHBlbnNlU2hlZXRMaXN0RmV0Y2hDYXB0dXJlID0ge1xyXG4gIHJlcXVlc3Q6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0O1xyXG4gIHJlc3BvbnNlOiBFeHBlbnNlU2hlZXRMaXN0UmVzcG9uc2VFbnZlbG9wZTtcclxuICBheFVzZXJJZE92ZXJyaWRlOiBzdHJpbmcgfCBudWxsO1xyXG4gIHNvdXJjZTogXCJhcGlcIiB8IFwibGVnYWN5XCI7XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBFeHBlbnNlU2hlZXRMaXN0RmV0Y2hPcHRpb25zID0gQXBpRmV0Y2hPcHRpb25zICYge1xyXG4gIGF4VXNlcklkT3ZlcnJpZGU/OiBzdHJpbmc7XHJcbiAgb25SZXF1ZXN0UHJlcGFyZWQ/OiAocmVxdWVzdDogRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3QpID0+IHZvaWQ7XHJcbiAgb25DYXB0dXJlPzogKGNhcHR1cmU6IEV4cGVuc2VTaGVldExpc3RGZXRjaENhcHR1cmUpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBFeHBlbnNlVGlja2V0TGlzdEZldGNoT3B0aW9ucyA9IEFwaUZldGNoT3B0aW9ucyAmIHtcclxuICBheFVzZXJJZE92ZXJyaWRlPzogc3RyaW5nO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgRXhwZW5zZVNoZWV0TGlzdFNvdXJjZUpzb25PcHRpb25zID0gQXBpRmV0Y2hPcHRpb25zICYge1xyXG4gIGF4VXNlcklkT3ZlcnJpZGU/OiBzdHJpbmc7XHJcbiAgc2VlZFJlc3BvbnNlPzogRXhwZW5zZVNoZWV0TGlzdFJlc3BvbnNlRW52ZWxvcGUgfCBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRUaWNrZXRMaXN0SGVhZGVycyA9IChcclxuICBjb250ZXh0OiBFeHBlbnNlQXBpQ29udGV4dCxcclxuICBvcHRpb25zOiBBcGlGZXRjaE9wdGlvbnMgfCB1bmRlZmluZWQsXHJcbiAgYXhVc2VySWRPdmVycmlkZTogc3RyaW5nIHwgdW5kZWZpbmVkXHJcbik6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPT4ge1xyXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMoYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlLCBmYWxzZSkpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRPdmVycmlkZUF4VXNlcklkID0gbm9ybWFsaXplQXhVc2VySWRIZWFkZXIoYXhVc2VySWRPdmVycmlkZSk7XHJcbiAgY29uc3QgcmVzb2x2ZWRBeFVzZXJJZCA9IHNhZmVUZXh0KG5vcm1hbGl6ZWRPdmVycmlkZUF4VXNlcklkIHx8IGNvbnRleHQuYXhVc2VySWQpO1xyXG4gIGlmIChyZXNvbHZlZEF4VXNlcklkKSB7XHJcbiAgICBoZWFkZXJzW1wiWC1JTkQtQXhVc2VySWRcIl0gPSByZXNvbHZlZEF4VXNlcklkO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIlgtSU5ELUF4VXNlcklkXCIpO1xyXG4gIH1cclxuICByZXR1cm4gaGVhZGVycztcclxufTtcclxuXHJcbi8vIExvYWRzIHRoZSBleHBlbnNlIHNoZWV0IGxpc3QgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL2xpc3QuXHJcbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldExpc3QgPSBhc3luYyAoXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0TGlzdEFwaVJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEV4cGVuc2VTaGVldExpc3RGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldExpc3RJdGVtRHRvPj4gPT4ge1xyXG4gIGNvbnN0IHsgYXhVc2VySWRPdmVycmlkZSwgb25SZXF1ZXN0UHJlcGFyZWQsIG9uQ2FwdHVyZSwgLi4uYmFzZU9wdGlvbnMgfSA9IG9wdGlvbnMgfHwge307XHJcbiAgY29uc3QgcmF3Q3JlYXRlZERhdGVGcm9tID0gc2FmZVRleHQocGF5bG9hZD8uY3JlYXRlZERhdGVGcm9tKTtcclxuICBjb25zdCByYXdDcmVhdGVkRGF0ZVRvID0gc2FmZVRleHQocGF5bG9hZD8uY3JlYXRlZERhdGVUbyk7XHJcbiAgY29uc3QgY3JlYXRlZERhdGVGcm9tID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlKHJhd0NyZWF0ZWREYXRlRnJvbSk7XHJcbiAgY29uc3QgY3JlYXRlZERhdGVUbyA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdDcmVhdGVkRGF0ZVRvKTtcclxuXHJcbiAgaWYgKHJhd0NyZWF0ZWREYXRlRnJvbSAmJiAhY3JlYXRlZERhdGVGcm9tKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICB9XHJcbiAgaWYgKHJhd0NyZWF0ZWREYXRlVG8gJiYgIWNyZWF0ZWREYXRlVG8pIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0ID0ge1xyXG4gICAgLi4ucGF5bG9hZCxcclxuICAgIGNyZWF0ZWREYXRlRnJvbSxcclxuICAgIGNyZWF0ZWREYXRlVG8sXHJcbiAgICBleHBlbnNlU2hlZXRTdGF0dXM6IG5vcm1hbGl6ZUV4cGVuc2VTaGVldExpc3RTdGF0dXNGaWx0ZXIocGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMpLFxyXG4gICAgcmVpbWJ1cnNhYmxlRXhwZW5zZTogbm9ybWFsaXplRXhwZW5zZVNoZWV0UmVpbWJ1cnNhYmxlKHBheWxvYWQucmVpbWJ1cnNhYmxlRXhwZW5zZSksXHJcbiAgICBpbmNsdWRlU3Vib3JkaW5hdGVzOiBwYXlsb2FkLmluY2x1ZGVTdWJvcmRpbmF0ZXMgPT09IHRydWUsXHJcbiAgfTtcclxuICBjb25zdCBzZXJpYWxpemVkUGF5bG9hZCA9IGNsb25lSnNvbkNvbXBhdGlibGVWYWx1ZShzYWZlUGF5bG9hZCk7XHJcblxyXG4gIG9uUmVxdWVzdFByZXBhcmVkPy4oc2VyaWFsaXplZFBheWxvYWQpO1xyXG5cclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQoYmFzZU9wdGlvbnMpO1xyXG4gIGNvbnN0IGxpc3RIZWFkZXJzID0gc2FuaXRpemVIZWFkZXJzKGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgYmFzZU9wdGlvbnMsIHRydWUsIGZhbHNlKSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZE92ZXJyaWRlQXhVc2VySWQgPSBub3JtYWxpemVBeFVzZXJJZEhlYWRlcihheFVzZXJJZE92ZXJyaWRlKTtcclxuICBjb25zdCByZXNvbHZlZEF4VXNlcklkID0gc2FmZVRleHQobm9ybWFsaXplZE92ZXJyaWRlQXhVc2VySWQgfHwgY29udGV4dC5heFVzZXJJZCk7XHJcbiAgaWYgKHJlc29sdmVkQXhVc2VySWQpIHtcclxuICAgIGxpc3RIZWFkZXJzW1wiWC1JTkQtQXhVc2VySWRcIl0gPSByZXNvbHZlZEF4VXNlcklkO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShsaXN0SGVhZGVycywgXCJYLUlORC1BeFVzZXJJZFwiKTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldExpc3RJdGVtRHRvPj4oXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL2xpc3RcIiwge1xyXG4gICAgICAuLi5iYXNlT3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczogbGlzdEhlYWRlcnMsXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcclxuICAgIH0pO1xyXG5cclxuICAgIG9uQ2FwdHVyZT8uKHtcclxuICAgICAgcmVxdWVzdDogc2VyaWFsaXplZFBheWxvYWQsXHJcbiAgICAgIHJlc3BvbnNlOiBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUocmVzcG9uc2UpLFxyXG4gICAgICBheFVzZXJJZE92ZXJyaWRlOiBub3JtYWxpemVkT3ZlcnJpZGVBeFVzZXJJZCB8fCBudWxsLFxyXG4gICAgICBzb3VyY2U6IFwiYXBpXCIsXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBpZiAoIXNob3VsZFVzZUxlZ2FjeUZhbGxiYWNrKGVycm9yKSkge1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBsZWdhY3lSZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxMZWdhY3lFeHBlbnNlTGlzdFJlc3BvbnNlPihcIi9HYXN0b3MvTGlzdEV4cGVuc2VTaGVldHNcIiwge1xyXG4gICAgICAuLi5iYXNlT3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIC4uLnNhbml0aXplSGVhZGVycyhiYXNlT3B0aW9ucz8uaGVhZGVycyksXHJcbiAgICAgICAgLi4uSlNPTl9IRUFERVJTLFxyXG4gICAgICB9LFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh0b0xlZ2FjeUxpc3RSZXF1ZXN0UGF5bG9hZChzYWZlUGF5bG9hZCkpLFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgbWFwcGVkID0gbWFwTGVnYWN5TGlzdFJlc3BvbnNlKFxyXG4gICAgICBsZWdhY3lSZXNwb25zZSxcclxuICAgICAgTnVtYmVyLmlzRmluaXRlKHNhZmVQYXlsb2FkLnBhZ2UpICYmIHNhZmVQYXlsb2FkLnBhZ2UgPiAwID8gc2FmZVBheWxvYWQucGFnZSA6IDEsXHJcbiAgICAgIE51bWJlci5pc0Zpbml0ZShzYWZlUGF5bG9hZC5wYWdlU2l6ZSkgJiYgc2FmZVBheWxvYWQucGFnZVNpemUgPiAwID8gc2FmZVBheWxvYWQucGFnZVNpemUgOiA1MFxyXG4gICAgKTtcclxuXHJcbiAgICBvbkNhcHR1cmU/Lih7XHJcbiAgICAgIHJlcXVlc3Q6IHNlcmlhbGl6ZWRQYXlsb2FkLFxyXG4gICAgICByZXNwb25zZTogY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlKG1hcHBlZCksXHJcbiAgICAgIGF4VXNlcklkT3ZlcnJpZGU6IG5vcm1hbGl6ZWRPdmVycmlkZUF4VXNlcklkIHx8IG51bGwsXHJcbiAgICAgIHNvdXJjZTogXCJsZWdhY3lcIixcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZShtYXBwZWQpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVBvc2l0aXZlSW50ZWdlciA9ICh2YWx1ZTogdW5rbm93biwgZmFsbGJhY2tWYWx1ZTogbnVtYmVyKTogbnVtYmVyID0+IHtcclxuICBjb25zdCBwYXJzZWRWYWx1ZSA9IE51bWJlcih2YWx1ZSk7XHJcbiAgaWYgKE51bWJlci5pc0Zpbml0ZShwYXJzZWRWYWx1ZSkgJiYgcGFyc2VkVmFsdWUgPiAwKSB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihwYXJzZWRWYWx1ZSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZmFsbGJhY2tWYWx1ZTtcclxufTtcclxuXHJcbi8vIFJlYnVpbGRzIG9uZSBmdWxsIGxpc3QgZW52ZWxvcGUgZm9yIHRoZSBhc3Npc3RhbnQgYnkgbG9hZGluZyBldmVyeSBwYWdlIG9mIHRoZSBhY3RpdmUgcXVlcnkuXHJcbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldExpc3RTb3VyY2VKc29uID0gYXN5bmMgKFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldExpc3RBcGlSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBFeHBlbnNlU2hlZXRMaXN0U291cmNlSnNvbk9wdGlvbnNcclxuKTogUHJvbWlzZTxFeHBlbnNlU2hlZXRMaXN0UmVzcG9uc2VFbnZlbG9wZT4gPT4ge1xyXG4gIGNvbnN0IHsgc2VlZFJlc3BvbnNlLCAuLi5iYXNlT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcclxuICBjb25zdCBmYWxsYmFja1BhZ2UgPSBub3JtYWxpemVQb3NpdGl2ZUludGVnZXIocGF5bG9hZD8ucGFnZSwgMSk7XHJcbiAgY29uc3QgZmFsbGJhY2tQYWdlU2l6ZSA9IG5vcm1hbGl6ZVBvc2l0aXZlSW50ZWdlcihwYXlsb2FkPy5wYWdlU2l6ZSwgNTApO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRTZWVkUmVzcG9uc2UgPSBzZWVkUmVzcG9uc2UgPyBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZShjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUoc2VlZFJlc3BvbnNlKSkgOiBudWxsO1xyXG4gIGNvbnN0IGluaXRpYWxSZXNwb25zZSA9IG5vcm1hbGl6ZWRTZWVkUmVzcG9uc2UgPz8gKGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0TGlzdChwYXlsb2FkLCBiYXNlT3B0aW9ucykpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRJbml0aWFsUmVzcG9uc2UgPSBub3JtYWxpemVMaXN0UGFnZWRSZXNwb25zZShjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUoaW5pdGlhbFJlc3BvbnNlKSk7XHJcblxyXG4gIGlmIChub3JtYWxpemVkSW5pdGlhbFJlc3BvbnNlLlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcclxuICAgICAgc2FmZVRleHQobm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5NZXNzYWdlKSB8fCBcIkNvdWxkIG5vdCBsb2FkIHRoZSBmdWxsIGV4cGVuc2Ugc2hlZXQgcXVlcnkuXCJcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB0b3RhbFJlY29yZHNSYXcgPSBOdW1iZXIobm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5Ub3RhbCk7XHJcbiAgY29uc3QgdG90YWxSZWNvcmRzID1cclxuICAgIE51bWJlci5pc0Zpbml0ZSh0b3RhbFJlY29yZHNSYXcpICYmIHRvdGFsUmVjb3Jkc1JhdyA+PSAwXHJcbiAgICAgID8gTWF0aC5mbG9vcih0b3RhbFJlY29yZHNSYXcpXHJcbiAgICAgIDogbm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5JdGVtcy5sZW5ndGg7XHJcbiAgY29uc3QgZWZmZWN0aXZlUGFnZVNpemUgPSBub3JtYWxpemVQb3NpdGl2ZUludGVnZXIobm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5QYWdlU2l6ZSwgZmFsbGJhY2tQYWdlU2l6ZSk7XHJcbiAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGgubWF4KDEsIE1hdGguY2VpbCh0b3RhbFJlY29yZHMgLyBNYXRoLm1heCgxLCBlZmZlY3RpdmVQYWdlU2l6ZSkpKTtcclxuICBjb25zdCBjdXJyZW50UGFnZSA9IE1hdGgubWluKFxyXG4gICAgdG90YWxQYWdlcyxcclxuICAgIG5vcm1hbGl6ZVBvc2l0aXZlSW50ZWdlcihub3JtYWxpemVkSW5pdGlhbFJlc3BvbnNlLlBhZ2UgPz8gZmFsbGJhY2tQYWdlLCBmYWxsYmFja1BhZ2UpXHJcbiAgKTtcclxuXHJcbiAgaWYgKHRvdGFsUGFnZXMgPD0gMSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLi4ubm9ybWFsaXplZEluaXRpYWxSZXNwb25zZSxcclxuICAgICAgVG90YWw6IHRvdGFsUmVjb3JkcyxcclxuICAgICAgUGFnZTogMSxcclxuICAgICAgUGFnZVNpemU6IGVmZmVjdGl2ZVBhZ2VTaXplLFxyXG4gICAgICBJdGVtczogY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlKG5vcm1hbGl6ZWRJbml0aWFsUmVzcG9uc2UuSXRlbXMpLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGl0ZW1zQnlQYWdlID0gbmV3IE1hcDxudW1iZXIsIEV4cGVuc2VTaGVldExpc3RJdGVtRHRvW10+KCk7XHJcbiAgaXRlbXNCeVBhZ2Uuc2V0KGN1cnJlbnRQYWdlLCBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUobm9ybWFsaXplZEluaXRpYWxSZXNwb25zZS5JdGVtcykpO1xyXG5cclxuICBmb3IgKGxldCBwYWdlTnVtYmVyID0gMTsgcGFnZU51bWJlciA8PSB0b3RhbFBhZ2VzOyBwYWdlTnVtYmVyICs9IDEpIHtcclxuICAgIGlmIChwYWdlTnVtYmVyID09PSBjdXJyZW50UGFnZSkge1xyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYWdlUmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldExpc3QoXHJcbiAgICAgIHtcclxuICAgICAgICAuLi5wYXlsb2FkLFxyXG4gICAgICAgIHBhZ2U6IHBhZ2VOdW1iZXIsXHJcbiAgICAgICAgcGFnZVNpemU6IGVmZmVjdGl2ZVBhZ2VTaXplLFxyXG4gICAgICB9LFxyXG4gICAgICBiYXNlT3B0aW9uc1xyXG4gICAgKTtcclxuXHJcbiAgICBpZiAocGFnZVJlc3BvbnNlLlN1Y2Nlc3MgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFxyXG4gICAgICAgIHNhZmVUZXh0KHBhZ2VSZXNwb25zZS5NZXNzYWdlKSB8fCBgQ291bGQgbm90IGxvYWQgZXhwZW5zZSBzaGVldCBwYWdlICR7cGFnZU51bWJlcn0uYFxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGl0ZW1zQnlQYWdlLnNldChwYWdlTnVtYmVyLCBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUocGFnZVJlc3BvbnNlLkl0ZW1zKSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhbGxJdGVtczogRXhwZW5zZVNoZWV0TGlzdEl0ZW1EdG9bXSA9IFtdO1xyXG4gIGZvciAobGV0IHBhZ2VOdW1iZXIgPSAxOyBwYWdlTnVtYmVyIDw9IHRvdGFsUGFnZXM7IHBhZ2VOdW1iZXIgKz0gMSkge1xyXG4gICAgY29uc3QgcGFnZUl0ZW1zID0gaXRlbXNCeVBhZ2UuZ2V0KHBhZ2VOdW1iZXIpO1xyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHBhZ2VJdGVtcykgfHwgcGFnZUl0ZW1zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBjb250aW51ZTtcclxuICAgIH1cclxuXHJcbiAgICBhbGxJdGVtcy5wdXNoKC4uLnBhZ2VJdGVtcyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgLi4ubm9ybWFsaXplZEluaXRpYWxSZXNwb25zZSxcclxuICAgIFRvdGFsOiB0b3RhbFJlY29yZHMsXHJcbiAgICBQYWdlOiAxLFxyXG4gICAgUGFnZVNpemU6IGVmZmVjdGl2ZVBhZ2VTaXplLFxyXG4gICAgSXRlbXM6IGFsbEl0ZW1zLFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBMb2FkcyBvbmUgZXhwZW5zZSBzaGVldCBkZXRhaWwgZnJvbSAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3tob2phR2FzdG9zSWR9LlxyXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXREZXRhaWwgPSBhc3luYyAoXHJcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0RGV0YWlsRHRvPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlU2hlZXRJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXREZXRhaWxEdG8+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy8ke3NhZmVTaGVldElkfWAsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBSZWFkcyBhdmFpbGFibGUgY3VycmVuY2llcyBmcm9tIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvY3VycmVuY2llcy5cclxuZXhwb3J0IGNvbnN0IGdldEV4cGVuc2VTaGVldEN1cnJlbmNpZXMgPSBhc3luYyAoXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+PiA9PiB7XHJcbiAgbGV0IGNvbnRleHQ6IEV4cGVuc2VBcGlDb250ZXh0IHwgbnVsbCA9IG51bGw7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgaWYgKCEoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSkge1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbnN0IGNvbXBhbnlJZCA9IHNhZmVUZXh0KGNvbnRleHQ/LmNvbXBhbnlJZCB8fCByZWFkV2luZG93U2VsZWN0ZWRDb21wYW55KCkpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3QgY2FjaGVLZXkgPSBjb21wYW55SWQgfHwgXCItXCI7XHJcblxyXG4gIGlmIChjYWNoZWRDdXJyZW5jeVJlc3BvbnNlcy5oYXMoY2FjaGVLZXkpKSB7XHJcbiAgICByZXR1cm4gY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuZ2V0KGNhY2hlS2V5KSBhcyBJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldEN1cnJlbmN5RHRvPjtcclxuICB9XHJcblxyXG4gIGlmIChwZW5kaW5nQ3VycmVuY3lSZXF1ZXN0cy5oYXMoY2FjaGVLZXkpKSB7XHJcbiAgICByZXR1cm4gcGVuZGluZ0N1cnJlbmN5UmVxdWVzdHMuZ2V0KGNhY2hlS2V5KSBhcyBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0Q3VycmVuY3lEdG8+PjtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlcXVlc3RQcm9taXNlID0gKGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XHJcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIkF1dGhvcml6YXRpb25cIik7XHJcbiAgICByZW1vdmVIZWFkZXJWYWx1ZShoZWFkZXJzLCBcIlgtSU5ELUF4VXNlcklkXCIpO1xyXG5cclxuICAgIGlmIChjb21wYW55SWQpIHtcclxuICAgICAgaGVhZGVyc1tcIlgtSU5ELUNvbXBhbnlcIl0gPSBjb21wYW55SWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9jdXJyZW5jaWVzXCIsIHtcclxuICAgICAgICAuLi5vcHRpb25zLFxyXG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgICAgICBoZWFkZXJzLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRSZXNwb25zZSA9IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgICAgIGlmIChub3JtYWxpemVkUmVzcG9uc2UuU3VjY2Vzcykge1xyXG4gICAgICAgIGNhY2hlZEN1cnJlbmN5UmVzcG9uc2VzLnNldChjYWNoZUtleSwgbm9ybWFsaXplZFJlc3BvbnNlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRSZXNwb25zZTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGlmICghc2hvdWxkVXNlTGVnYWN5RmFsbGJhY2soZXJyb3IpKSB7XHJcbiAgICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGxlZ2FjeUxpc3RSZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxMZWdhY3lFeHBlbnNlTGlzdFJlc3BvbnNlPihcIi9HYXN0b3MvTGlzdEV4cGVuc2VTaGVldHNcIiwge1xyXG4gICAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAuLi5zYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyksXHJcbiAgICAgICAgICAuLi5KU09OX0hFQURFUlMsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICBmaWx0ZXI6IFwiXCIsXHJcbiAgICAgICAgICBob2phR2FzdG9zSWQ6IFwiXCIsXHJcbiAgICAgICAgICBiaWxsZWRNb2RlOiAyLFxyXG4gICAgICAgICAgZnJvbURhdGU6IFwiXCIsXHJcbiAgICAgICAgICB0b0RhdGU6IFwiXCIsXHJcbiAgICAgICAgICBwcm9qZWN0SWQ6IFwiXCIsXHJcbiAgICAgICAgICBjdXJyZW5jeUNvZGU6IFwiXCIsXHJcbiAgICAgICAgICBwYWdlOiAxLFxyXG4gICAgICAgICAgcGFnZVNpemU6IDIwMCxcclxuICAgICAgICB9KSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBzZWVuQ29kZXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcclxuICAgICAgY29uc3Qgc291cmNlSXRlbXMgPSBBcnJheS5pc0FycmF5KGxlZ2FjeUxpc3RSZXNwb25zZS5pdGVtcykgPyBsZWdhY3lMaXN0UmVzcG9uc2UuaXRlbXMgOiBbXTtcclxuICAgICAgY29uc3QgZmFsbGJhY2tJdGVtczogRXhwZW5zZVNoZWV0Q3VycmVuY3lEdG9bXSA9IHNvdXJjZUl0ZW1zXHJcbiAgICAgICAgLm1hcCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5LmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSlcclxuICAgICAgICAuZmlsdGVyKChjb2RlKSA9PiAhIWNvZGUpXHJcbiAgICAgICAgLmZpbHRlcigoY29kZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKHNlZW5Db2Rlcy5oYXMoY29kZSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIHNlZW5Db2Rlcy5hZGQoY29kZSk7XHJcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5tYXAoKGNvZGUpID0+ICh7XHJcbiAgICAgICAgICBDdXJyZW5jeUNvZGU6IGNvZGUsXHJcbiAgICAgICAgICBDdXJyZW5jeUNvZGVJU086IGNvZGUsXHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgICAgY29uc3QgZmFsbGJhY2tSZXNwb25zZTogSW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRDdXJyZW5jeUR0bz4gPSB7XHJcbiAgICAgICAgU3VjY2VzczogbGVnYWN5TGlzdFJlc3BvbnNlLnN1Y2Nlc3MgIT09IGZhbHNlLFxyXG4gICAgICAgIE1lc3NhZ2U6IHNhZmVUZXh0KGxlZ2FjeUxpc3RSZXNwb25zZS5tZXNzYWdlKSB8fCBcIk9LXCIsXHJcbiAgICAgICAgVG90YWw6IGZhbGxiYWNrSXRlbXMubGVuZ3RoLFxyXG4gICAgICAgIFBhZ2U6IDEsXHJcbiAgICAgICAgUGFnZVNpemU6IGZhbGxiYWNrSXRlbXMubGVuZ3RoLFxyXG4gICAgICAgIEl0ZW1zOiBmYWxsYmFja0l0ZW1zLFxyXG4gICAgICAgIFRyYWNlSWQ6IHVuZGVmaW5lZCxcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRGYWxsYmFjayA9IG5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZShmYWxsYmFja1Jlc3BvbnNlKTtcclxuICAgICAgaWYgKG5vcm1hbGl6ZWRGYWxsYmFjay5TdWNjZXNzKSB7XHJcbiAgICAgICAgY2FjaGVkQ3VycmVuY3lSZXNwb25zZXMuc2V0KGNhY2hlS2V5LCBub3JtYWxpemVkRmFsbGJhY2spO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbm9ybWFsaXplZEZhbGxiYWNrO1xyXG4gICAgfVxyXG4gIH0pKCk7XHJcblxyXG4gIHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLnNldChjYWNoZUtleSwgcmVxdWVzdFByb21pc2UpO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gYXdhaXQgcmVxdWVzdFByb21pc2U7XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIHBlbmRpbmdDdXJyZW5jeVJlcXVlc3RzLmRlbGV0ZShjYWNoZUtleSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gUmVhZHMgYXZhaWxhYmxlIHN1Ym9yZGluYXRlcyBmcm9tIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvc3Vib3JkaW5hdGVzLlxyXG5leHBvcnQgY29uc3QgZ2V0RXhwZW5zZVNoZWV0U3Vib3JkaW5hdGVzID0gYXN5bmMgKFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFN1Ym9yZGluYXRlRHRvPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICAvLyBTdWJvcmRpbmF0ZXMgbXVzdCBhbHdheXMgcmVzb2x2ZSBmcm9tIHRoZSBsb2dnZWQgY29udGV4dCB1c2VyLCBub3QgZnJvbSBhY3RpbmctdXNlciBvdmVycmlkZXMuXHJcbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIGZhbHNlLCBmYWxzZSkpO1xyXG4gIGNvbnN0IGNvbnRleHRBeFVzZXJJZCA9IHNhZmVUZXh0KGNvbnRleHQuYXhVc2VySWQpO1xyXG4gIGlmIChjb250ZXh0QXhVc2VySWQpIHtcclxuICAgIGhlYWRlcnNbXCJYLUlORC1BeFVzZXJJZFwiXSA9IGNvbnRleHRBeFVzZXJJZDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8dW5rbm93bj4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9zdWJvcmRpbmF0ZXNcIiwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJHRVRcIixcclxuICAgIGhlYWRlcnMsXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIEV4cG9zZXMgdGhlIGRlZmF1bHQgY3VycmVuY3kgcmVzb2x2ZWQgZnJvbSBFbnRyYSBjb250ZXh0IGZvciBpbml0aWFsIHNlbGVjdGlvbnMuXHJcbmV4cG9ydCBjb25zdCBnZXRFeHBlbnNlU2hlZXREZWZhdWx0Q3VycmVuY3lDb2RlID0gYXN5bmMgKG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnMpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgICByZXR1cm4gc2FmZVRleHQoY29udGV4dC5kZWZhdWx0Q3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gUmVhZHMgZXhjaGFuZ2UgcmF0ZSBmcm9tIC9hcGkvc3lzdGVtL2V4Y2hhbmdlLXJhdGUuXHJcbmV4cG9ydCBjb25zdCBnZXRFeGNoYW5nZVJhdGUgPSBhc3luYyAoXHJcbiAgYmFzZUN1cnJlbmN5OiBzdHJpbmcsXHJcbiAgdGFyZ2V0Q3VycmVuY3k6IHN0cmluZyxcclxuICBkYXRlPzogc3RyaW5nLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeGNoYW5nZVJhdGVEdG8+PiA9PiB7XHJcbiAgY29uc3QgdG9rZW4gPSByZXNvbHZlQXV0aFRva2VuKG9wdGlvbnMpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kgPSBzYWZlVGV4dChiYXNlQ3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFRhcmdldEN1cnJlbmN5ID0gc2FmZVRleHQodGFyZ2V0Q3VycmVuY3kpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZERhdGUgPSBzYWZlVGV4dChkYXRlKTtcclxuICBjb25zdCBxdWVyeSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcclxuXHJcbiAgcXVlcnkuc2V0KFwiYmFzZUN1cnJlbmN5XCIsIG5vcm1hbGl6ZWRCYXNlQ3VycmVuY3kpO1xyXG4gIHF1ZXJ5LnNldChcInRhcmdldEN1cnJlbmN5XCIsIG5vcm1hbGl6ZWRUYXJnZXRDdXJyZW5jeSk7XHJcbiAgaWYgKG5vcm1hbGl6ZWREYXRlKSB7XHJcbiAgICBxdWVyeS5zZXQoXCJkYXRlXCIsIG5vcm1hbGl6ZWREYXRlKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMob3B0aW9ucz8uaGVhZGVycyk7XHJcbiAgaWYgKHRva2VuKSB7XHJcbiAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmVhcmVyICR7dG9rZW59YDtcclxuICB9XHJcblxyXG4gIHJldHVybiBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhjaGFuZ2VSYXRlRHRvPj4oYC9hcGkvc3lzdGVtL2V4Y2hhbmdlLXJhdGU/JHtxdWVyeS50b1N0cmluZygpfWAsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICBoZWFkZXJzLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gUmVhZHMgZXhjaGFuZ2UgcmF0ZSBmcm9tIC9hcGkvc3lzdGVtL2V4Y2hhbmdlLXJhdGUvcHVibGljLWRpcmVjdC5cclxuZXhwb3J0IGNvbnN0IGdldEV4Y2hhbmdlUmF0ZVB1YmxpY0RpcmVjdCA9IGFzeW5jIChcclxuICBiYXNlQ3VycmVuY3k6IHN0cmluZyxcclxuICB0YXJnZXRDdXJyZW5jeTogc3RyaW5nLFxyXG4gIGRhdGU/OiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEV4Y2hhbmdlUmF0ZUR0bz4+ID0+IHtcclxuICBjb25zdCB0b2tlbiA9IHJlc29sdmVBdXRoVG9rZW4ob3B0aW9ucyk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSA9IHNhZmVUZXh0KGJhc2VDdXJyZW5jeSkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBub3JtYWxpemVkVGFyZ2V0Q3VycmVuY3kgPSBzYWZlVGV4dCh0YXJnZXRDdXJyZW5jeSkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBub3JtYWxpemVkRGF0ZSA9IHNhZmVUZXh0KGRhdGUpO1xyXG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xyXG5cclxuICBxdWVyeS5zZXQoXCJiYXNlQ3VycmVuY3lcIiwgbm9ybWFsaXplZEJhc2VDdXJyZW5jeSk7XHJcbiAgcXVlcnkuc2V0KFwidGFyZ2V0Q3VycmVuY3lcIiwgbm9ybWFsaXplZFRhcmdldEN1cnJlbmN5KTtcclxuICBpZiAobm9ybWFsaXplZERhdGUpIHtcclxuICAgIHF1ZXJ5LnNldChcImRhdGVcIiwgbm9ybWFsaXplZERhdGUpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhvcHRpb25zPy5oZWFkZXJzKTtcclxuICBpZiAodG9rZW4pIHtcclxuICAgIGhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeGNoYW5nZVJhdGVEdG8+PihgL2FwaS9zeXN0ZW0vZXhjaGFuZ2UtcmF0ZS9wdWJsaWMtZGlyZWN0PyR7cXVlcnkudG9TdHJpbmcoKX1gLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgaGVhZGVycyxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIFJlYWRzIGZ1ZWwgcHJpY2UgcGVyIGttIGZyb20gL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy9mdWVsLXByaWNlLWttLlxyXG5leHBvcnQgY29uc3QgZ2V0RnVlbFByaWNlS20gPSBhc3luYyAoXHJcbiAgdHJhbnNEYXRlOiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPEZ1ZWxQcmljZUttRHRvPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBub3JtYWxpemVkRGF0ZSA9IG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZSh0cmFuc0RhdGUpO1xyXG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xyXG5cclxuICBxdWVyeS5zZXQoXCJ0cmFuc0RhdGVcIiwgbm9ybWFsaXplZERhdGUpO1xyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxGdWVsUHJpY2VLbUR0bz4+KFxyXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvZnVlbC1wcmljZS1rbT8ke3F1ZXJ5LnRvU3RyaW5nKCl9YCxcclxuICAgIHtcclxuICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBDcmVhdGVzIGFuIGV4cGVuc2Ugc2hlZXQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUV4cGVuc2VTaGVldCA9IGFzeW5jIChcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRDcmVhdGVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRDcmVhdGVSZXNwb25zZURhdGE+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IG1vZGUgPSBwYXlsb2FkLm1vZGUgPz8gMDtcclxuICBjb25zdCBsaW5lcyA9IEFycmF5LmlzQXJyYXkocGF5bG9hZC5saW5lcykgPyBwYXlsb2FkLmxpbmVzIDogW107XHJcbiAgY29uc3QgbG9jYWxDdXJyZW5jeUNvZGUgPSBub3JtYWxpemVDdXJyZW5jeUNvZGUoY29udGV4dC5kZWZhdWx0Q3VycmVuY3lDb2RlKSB8fCBcIkVVUlwiO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRMaW5lcyA9IGxpbmVzLm1hcCgobGluZSkgPT4gKHtcclxuICAgIC4uLmxpbmUsXHJcbiAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZShsaW5lLnRyYW5zRGF0ZSksXHJcbiAgICB0eXBlVmFsdWU6IHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUobGluZS50eXBlVmFsdWUsIHsgYWxsb3dOb25lOiBmYWxzZSB9KSA/PyBsaW5lLnR5cGVWYWx1ZSxcclxuICAgIHJlaW1idXJzYWJsZUV4cGVuc2U6IG5vcm1hbGl6ZUV4cGVuc2VTaGVldFJlaW1idXJzYWJsZShsaW5lLnJlaW1idXJzYWJsZUV4cGVuc2UpLFxyXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChsaW5lLmN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSB8fCB1bmRlZmluZWQsXHJcbiAgICBhbW91bnRNU1Q6IHRvTnVsbGFibGVOdW1iZXIobGluZS5hbW91bnRNU1QpLFxyXG4gICAgZXhjaFJhdGU6IHRvTnVsbGFibGVOdW1iZXIobGluZS5leGNoUmF0ZSksXHJcbiAgfSkpO1xyXG4gIGNvbnN0IGhhc0ludmFsaWRMaW5lUGF5bG9hZCA9IG5vcm1hbGl6ZWRMaW5lcy5zb21lKChsaW5lKSA9PiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAhc2FmZVRleHQobGluZS50cmFuc0RhdGUpIHx8XHJcbiAgICAgIHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUobGluZS50eXBlVmFsdWUsIHsgYWxsb3dOb25lOiBmYWxzZSB9KSA9PT0gbnVsbCB8fFxyXG4gICAgICAhaXNQb3NpdGl2ZU51bWJlcihsaW5lLnF0eSkgfHxcclxuICAgICAgIWlzUG9zaXRpdmVOdW1iZXIobGluZS5wcmljZSlcclxuICAgICk7XHJcbiAgfSk7XHJcblxyXG4gIGlmIChwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyAhPT0gdW5kZWZpbmVkICYmICFpc05vbk5lZ2F0aXZlTnVtYmVyKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzKSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleHBlbnNlU2hlZXRTdGF0dXMgbXVzdCBiZSBncmVhdGVyIG9yIGVxdWFsIHRvIDAuXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSAhPT0gdW5kZWZpbmVkICYmICFpc05vbk5lZ2F0aXZlTnVtYmVyKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSkpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhjaGFuZ2VSYXRlTW9kZSBtdXN0IGJlIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMC5cIik7XHJcbiAgfVxyXG5cclxuICBpZiAocGF5bG9hZC5leGNoYW5nZVJhdGVNb2RlICE9PSB1bmRlZmluZWQgJiYgcGF5bG9hZC5leHBlbnNlU2hlZXRTdGF0dXMgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleGNoYW5nZVJhdGVNb2RlIHJlcXVpcmVzIGV4cGVuc2VTaGVldFN0YXR1cy5cIik7XHJcbiAgfVxyXG5cclxuICBpZiAoaGFzSW52YWxpZExpbmVQYXlsb2FkKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkVhY2ggbGluZSByZXF1aXJlcyB0cmFuc0RhdGUsIHR5cGVWYWx1ZSwgcXR5ID4gMCBhbmQgcHJpY2UgPiAwLlwiKTtcclxuICB9XHJcblxyXG4gIGlmIChub3JtYWxpemVkTGluZXMuc29tZSgobGluZSkgPT4gaGFzTWlzc2luZ0ZvcmVpZ25MaW5lU2V0dGxlbWVudChsaW5lLCBsb2NhbEN1cnJlbmN5Q29kZSkpKSB7XHJcbiAgICB0aHJvdyBidWlsZEZvcmVpZ25MaW5lU2V0dGxlbWVudEVycm9yKCk7XHJcbiAgfVxyXG5cclxuICBpZiAobW9kZSA9PT0gMCkge1xyXG4gICAgaWYgKCFzYWZlVGV4dChwYXlsb2FkLmRlc2NyaXB0aW9uKSB8fCBsaW5lcy5sZW5ndGggPCAxKSB7XHJcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiSW52YWxpZCBjcmVhdGUgcGF5bG9hZCBmb3IgbW9kZSAwLlwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChtb2RlID09PSAxKSB7XHJcbiAgICBpZiAoIXNhZmVUZXh0KHBheWxvYWQuZGVzY3JpcHRpb24pKSB7XHJcbiAgICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiSW52YWxpZCBjcmVhdGUgcGF5bG9hZCBmb3IgbW9kZSAxLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGluZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIk1vZGUgMSByZXF1aXJlcyBsaW5lcyB0byBiZSBudWxsIG9yIGVtcHR5LlwiKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmIChtb2RlID09PSAyKSB7XHJcbiAgICBpZiAoIXNhZmVUZXh0KHBheWxvYWQuZXhpc3RpbmdIb2phR2FzdG9zSWQpIHx8IGxpbmVzLmxlbmd0aCA8IDEpIHtcclxuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJJbnZhbGlkIGNyZWF0ZSBwYXlsb2FkIGZvciBtb2RlIDIuXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3Qgbm9ybWFsaXplZFBheWxvYWQ6IEV4cGVuc2VTaGVldENyZWF0ZVJlcXVlc3QgPSB7XHJcbiAgICAuLi5wYXlsb2FkLFxyXG4gICAgbW9kZSxcclxuICAgIGV4aXN0aW5nSG9qYUdhc3Rvc0lkOiBzYWZlVGV4dChwYXlsb2FkLmV4aXN0aW5nSG9qYUdhc3Rvc0lkKSB8fCB1bmRlZmluZWQsXHJcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQocGF5bG9hZC5kZXNjcmlwdGlvbikgfHwgdW5kZWZpbmVkLFxyXG4gICAgY3VycmVuY3lDb2RlOiBub3JtYWxpemVDdXJyZW5jeUNvZGUocGF5bG9hZC5jdXJyZW5jeUNvZGUpIHx8IHVuZGVmaW5lZCxcclxuICAgIGV4Y2hSYXRlOiB0b051bGxhYmxlTnVtYmVyKHBheWxvYWQuZXhjaFJhdGUpID8/IHVuZGVmaW5lZCxcclxuICAgIHByb2pJZDogc2FmZVRleHQocGF5bG9hZC5wcm9qSWQpIHx8IHVuZGVmaW5lZCxcclxuICAgIHJlaW1idXJzYWJsZUV4cGVuc2U6IG5vcm1hbGl6ZUV4cGVuc2VTaGVldFJlaW1idXJzYWJsZShwYXlsb2FkLnJlaW1idXJzYWJsZUV4cGVuc2UpLFxyXG4gICAgbGluZXM6IG1vZGUgPT09IDEgPyBbXSA6IG5vcm1hbGl6ZWRMaW5lcyxcclxuICB9O1xyXG4gIGNvbnN0IGluY2x1ZGVBeFVzZXJPdmVycmlkZSA9IG1vZGUgPT09IDI7XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldENyZWF0ZVJlc3BvbnNlRGF0YT4+KFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0c1wiLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIC8vIEhlYWRlciBjcmVhdGUgZmxvd3MgbXVzdCBhbHdheXMgcnVuIGluIHRoZSBzaWduZWQtaW4gdXNlciBjb250ZXh0LlxyXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlLCBpbmNsdWRlQXhVc2VyT3ZlcnJpZGUpLFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkobm9ybWFsaXplZFBheWxvYWQpLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gVXBkYXRlcyBoZWFkZXIgZmllbGRzIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0uXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVFeHBlbnNlU2hlZXRIZWFkZXIgPSBhc3luYyAoXHJcbiAgaG9qYUdhc3Rvc0lkOiBzdHJpbmcsXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0SGVhZGVyVXBkYXRlUmVxdWVzdCxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8eyBIb2phR2FzdG9zSWQ6IHN0cmluZyB9Pj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlU2hlZXRJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoaG9qYUdhc3Rvc0lkIHx8IFwiXCIpLnRyaW0oKSk7XHJcblxyXG4gIGlmIChwYXlsb2FkLmV4cGVuc2VTaGVldFN0YXR1cyAhPT0gdW5kZWZpbmVkICYmICFpc05vbk5lZ2F0aXZlTnVtYmVyKHBheWxvYWQuZXhwZW5zZVNoZWV0U3RhdHVzKSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJleHBlbnNlU2hlZXRTdGF0dXMgbXVzdCBiZSBncmVhdGVyIG9yIGVxdWFsIHRvIDAuXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSAhPT0gdW5kZWZpbmVkICYmICFpc05vbk5lZ2F0aXZlTnVtYmVyKHBheWxvYWQuZXhjaGFuZ2VSYXRlTW9kZSkpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZXhjaGFuZ2VSYXRlTW9kZSBtdXN0IGJlIGdyZWF0ZXIgb3IgZXF1YWwgdG8gMC5cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzYWZlUGF5bG9hZDogRXhwZW5zZVNoZWV0SGVhZGVyVXBkYXRlUmVxdWVzdCA9IHtcclxuICAgIC4uLnBheWxvYWQsXHJcbiAgICBjdXJyZW5jeUNvZGU6IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShwYXlsb2FkLmN1cnJlbmN5Q29kZSkgfHwgdW5kZWZpbmVkLFxyXG4gICAgZXhjaFJhdGU6IHRvTnVsbGFibGVOdW1iZXIocGF5bG9hZC5leGNoUmF0ZSkgPz8gdW5kZWZpbmVkLFxyXG4gICAgcmVpbWJ1cnNhYmxlRXhwZW5zZTogbm9ybWFsaXplRXhwZW5zZVNoZWV0UmVpbWJ1cnNhYmxlKHBheWxvYWQucmVpbWJ1cnNhYmxlRXhwZW5zZSksXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8eyBIb2phR2FzdG9zSWQ6IHN0cmluZyB9Pj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH1gLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcclxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHNhZmVQYXlsb2FkKSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIERlbGV0ZXMgYSBmdWxsIGV4cGVuc2Ugc2hlZXQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS9saW5lcy8wP2RlbGV0ZVdob2xlU2hlZXQ9dHJ1ZS5cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUV4cGVuc2VTaGVldCA9IGFzeW5jIChcclxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+PihcclxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9L2xpbmVzLzA/ZGVsZXRlTW9kZT0yJmRlbGV0ZVdob2xlU2hlZXQ9dHJ1ZWAsXHJcbiAgICB7XHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gVXBkYXRlcyBvbmUgZXhwZW5zZSBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMve2hvamFHYXN0b3NJZH0vbGluZXMve2xpbmVSZWNJZH0uXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVFeHBlbnNlU2hlZXRMaW5lID0gYXN5bmMgKFxyXG4gIGhvamFHYXN0b3NJZDogc3RyaW5nLFxyXG4gIGxpbmVSZWNJZDogc3RyaW5nLFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldExpbmVVcGRhdGVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRMaW5lVXBkYXRlUmVzcG9uc2VEYXRhPj4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc0RhdGUgPSBub3JtYWxpemVSZXF1aXJlZEFwaURhdGUocGF5bG9hZC50cmFuc0RhdGUpO1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBsb2NhbEN1cnJlbmN5Q29kZSA9IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShjb250ZXh0LmRlZmF1bHRDdXJyZW5jeUNvZGUpIHx8IFwiRVVSXCI7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFR5cGVWYWx1ZSA9IHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUocGF5bG9hZC50eXBlVmFsdWUsIHsgYWxsb3dOb25lOiBmYWxzZSB9KTtcclxuICBjb25zdCBub3JtYWxpemVkUGF5bG9hZDogRXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlcXVlc3QgPSB7XHJcbiAgICAuLi5wYXlsb2FkLFxyXG4gICAgdHJhbnNEYXRlOiBub3JtYWxpemVkVHJhbnNEYXRlLFxyXG4gICAgdHlwZVZhbHVlOiBub3JtYWxpemVkVHlwZVZhbHVlID8/IHBheWxvYWQudHlwZVZhbHVlLFxyXG4gICAgcmVpbWJ1cnNhYmxlRXhwZW5zZTogbm9ybWFsaXplRXhwZW5zZVNoZWV0UmVpbWJ1cnNhYmxlKHBheWxvYWQucmVpbWJ1cnNhYmxlRXhwZW5zZSksXHJcbiAgICBjdXJyZW5jeUNvZGU6IG5vcm1hbGl6ZUN1cnJlbmN5Q29kZShwYXlsb2FkLmN1cnJlbmN5Q29kZSkgfHwgdW5kZWZpbmVkLFxyXG4gICAgYW1vdW50TVNUOiB0b051bGxhYmxlTnVtYmVyKHBheWxvYWQuYW1vdW50TVNUKSxcclxuICAgIGV4Y2hSYXRlOiB0b051bGxhYmxlTnVtYmVyKHBheWxvYWQuZXhjaFJhdGUpLFxyXG4gIH07XHJcbiAgaWYgKFxyXG4gICAgbm9ybWFsaXplZFR5cGVWYWx1ZSA9PT0gbnVsbCB8fFxyXG4gICAgIWlzUG9zaXRpdmVOdW1iZXIobm9ybWFsaXplZFBheWxvYWQucXR5KSB8fFxyXG4gICAgIWlzUG9zaXRpdmVOdW1iZXIobm9ybWFsaXplZFBheWxvYWQucHJpY2UpXHJcbiAgKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcInRyYW5zRGF0ZSwgdHlwZVZhbHVlLCBxdHkgPiAwIGFuZCBwcmljZSA+IDAgYXJlIHJlcXVpcmVkLlwiKTtcclxuICB9XHJcblxyXG4gIGlmIChoYXNNaXNzaW5nRm9yZWlnbkxpbmVTZXR0bGVtZW50KG5vcm1hbGl6ZWRQYXlsb2FkLCBsb2NhbEN1cnJlbmN5Q29kZSkpIHtcclxuICAgIHRocm93IGJ1aWxkRm9yZWlnbkxpbmVTZXR0bGVtZW50RXJyb3IoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHNhZmVTaGVldElkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhob2phR2FzdG9zSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCBzYWZlTGluZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhsaW5lUmVjSWQgfHwgXCJcIikudHJpbSgpKTtcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8RXhwZW5zZVNoZWV0TGluZVVwZGF0ZVJlc3BvbnNlRGF0YT4+KFxyXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvJHtzYWZlU2hlZXRJZH0vbGluZXMvJHtzYWZlTGluZUlkfWAsXHJcbiAgICB7XHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJQVVRcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkobm9ybWFsaXplZFBheWxvYWQpLFxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBEZWxldGVzIG9uZSBleHBlbnNlIGxpbmUgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy97aG9qYUdhc3Rvc0lkfS9saW5lcy97bGluZVJlY0lkfT9kZWxldGVXaG9sZVNoZWV0PWZhbHNlLlxyXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0TGluZSA9IGFzeW5jIChcclxuICBob2phR2FzdG9zSWQ6IHN0cmluZyxcclxuICBsaW5lUmVjSWQ6IHN0cmluZyxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGhvamFHYXN0b3NJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHNhZmVMaW5lSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGxpbmVSZWNJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG51bGw+PihcclxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzLyR7c2FmZVNoZWV0SWR9L2xpbmVzLyR7c2FmZUxpbmVJZH0/ZGVsZXRlTW9kZT0wJmRlbGV0ZVdob2xlU2hlZXQ9ZmFsc2VgLFxyXG4gICAge1xyXG4gICAgICAuLi5vcHRpb25zLFxyXG4gICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUV4cGVuc2VTaGVldHNBc2tSZXNwb25zZSA9IChyZXNwb25zZTogRXhwZW5zZVNoZWV0c0Fza1Jlc3VsdCk6IEV4cGVuc2VTaGVldHNBc2tSZXN1bHQgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbiAgY29uc3QgcmF3RGF0YSA9IG5vcm1hbGl6ZWQ/LkRhdGE7XHJcbiAgaWYgKCFyYXdEYXRhIHx8IHR5cGVvZiByYXdEYXRhICE9PSBcIm9iamVjdFwiKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAuLi5ub3JtYWxpemVkLFxyXG4gICAgICBNZXNzYWdlOiBzYW5pdGl6ZUFzc2lzdGFudFRleHQobm9ybWFsaXplZD8uTWVzc2FnZSksXHJcbiAgICAgIEh0dHBTdGF0dXM6IHR5cGVvZiByZXNwb25zZT8uSHR0cFN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IHJlc3BvbnNlLkh0dHBTdGF0dXMgOiB1bmRlZmluZWQsXHJcbiAgICAgIFJldHJ5QWZ0ZXI6IHNhZmVUZXh0KHJlc3BvbnNlPy5SZXRyeUFmdGVyKSB8fCBudWxsLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJhd1dhcm5pbmdzID1cclxuICAgIChyYXdEYXRhIGFzIHsgV2FybmluZ3M/OiB1bmtub3duOyB3YXJuaW5ncz86IHVua25vd24gfSkuV2FybmluZ3MgPz9cclxuICAgIChyYXdEYXRhIGFzIHsgd2FybmluZ3M/OiB1bmtub3duIH0pLndhcm5pbmdzO1xyXG4gIGNvbnN0IHJhd0ZpbHRlcnNBcHBsaWVkID1cclxuICAgIChyYXdEYXRhIGFzIHsgRmlsdGVyc0FwcGxpZWQ/OiB1bmtub3duOyBmaWx0ZXJzQXBwbGllZD86IHVua25vd24gfSkuRmlsdGVyc0FwcGxpZWQgPz9cclxuICAgIChyYXdEYXRhIGFzIHsgZmlsdGVyc0FwcGxpZWQ/OiB1bmtub3duIH0pLmZpbHRlcnNBcHBsaWVkO1xyXG5cclxuICBjb25zdCBpc0lnbm9yYWJsZUFzc2lzdGFudFdhcm5pbmcgPSAod2FybmluZzogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgICBjb25zdCBub3JtYWxpemVkV2FybmluZyA9IHNhbml0aXplQXNzaXN0YW50VGV4dCh3YXJuaW5nKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgaWYgKCFub3JtYWxpemVkV2FybmluZykgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZWRXYXJuaW5nLmluY2x1ZGVzKFwic291cmNlanNvblwiKSAmJlxyXG4gICAgICAobm9ybWFsaXplZFdhcm5pbmcuaW5jbHVkZXMoXCJza2lwcGVkXCIpIHx8IG5vcm1hbGl6ZWRXYXJuaW5nLmluY2x1ZGVzKFwib21pdFwiKSk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIC4uLm5vcm1hbGl6ZWQsXHJcbiAgICBNZXNzYWdlOiBzYW5pdGl6ZUFzc2lzdGFudFRleHQobm9ybWFsaXplZD8uTWVzc2FnZSksXHJcbiAgICBIdHRwU3RhdHVzOiB0eXBlb2YgcmVzcG9uc2U/Lkh0dHBTdGF0dXMgPT09IFwibnVtYmVyXCIgPyByZXNwb25zZS5IdHRwU3RhdHVzIDogdW5kZWZpbmVkLFxyXG4gICAgUmV0cnlBZnRlcjogc2FmZVRleHQocmVzcG9uc2U/LlJldHJ5QWZ0ZXIpIHx8IG51bGwsXHJcbiAgICBEYXRhOiB7XHJcbiAgICAgIEFuc3dlcjogc2FuaXRpemVBc3Npc3RhbnRUZXh0KFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgQW5zd2VyPzogdW5rbm93bjsgYW5zd2VyPzogdW5rbm93biB9KS5BbnN3ZXIgPz8gKHJhd0RhdGEgYXMgeyBhbnN3ZXI/OiB1bmtub3duIH0pLmFuc3dlclxyXG4gICAgICApLFxyXG4gICAgICBNb2RlbDogc2FuaXRpemVBc3Npc3RhbnRUZXh0KFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgTW9kZWw/OiB1bmtub3duOyBtb2RlbD86IHVua25vd24gfSkuTW9kZWwgPz8gKHJhd0RhdGEgYXMgeyBtb2RlbD86IHVua25vd24gfSkubW9kZWxcclxuICAgICAgKSxcclxuICAgICAgU291cmNlS2V5OiBzYW5pdGl6ZUFzc2lzdGFudFRleHQoXHJcbiAgICAgICAgKHJhd0RhdGEgYXMgeyBTb3VyY2VLZXk/OiB1bmtub3duOyBzb3VyY2VLZXk/OiB1bmtub3duIH0pLlNvdXJjZUtleSA/P1xyXG4gICAgICAgICAgKHJhd0RhdGEgYXMgeyBzb3VyY2VLZXk/OiB1bmtub3duIH0pLnNvdXJjZUtleVxyXG4gICAgICApLFxyXG4gICAgICBGaWx0ZXJzQXBwbGllZDpcclxuICAgICAgICByYXdGaWx0ZXJzQXBwbGllZCAmJiB0eXBlb2YgcmF3RmlsdGVyc0FwcGxpZWQgPT09IFwib2JqZWN0XCJcclxuICAgICAgICAgID8gY2xvbmVKc29uQ29tcGF0aWJsZVZhbHVlKHJhd0ZpbHRlcnNBcHBsaWVkIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+KVxyXG4gICAgICAgICAgOiBudWxsLFxyXG4gICAgICBUb3RhbFNvdXJjZVJlY29yZHM6XHJcbiAgICAgICAgdG9OdWxsYWJsZU51bWJlcihcclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgVG90YWxTb3VyY2VSZWNvcmRzPzogdW5rbm93bjsgdG90YWxTb3VyY2VSZWNvcmRzPzogdW5rbm93biB9KS5Ub3RhbFNvdXJjZVJlY29yZHMgPz9cclxuICAgICAgICAgICAgKHJhd0RhdGEgYXMgeyB0b3RhbFNvdXJjZVJlY29yZHM/OiB1bmtub3duIH0pLnRvdGFsU291cmNlUmVjb3Jkc1xyXG4gICAgICAgICkgPz8gbnVsbCxcclxuICAgICAgUmVjb3Jkc1NlbnRUb01vZGVsOlxyXG4gICAgICAgIHRvTnVsbGFibGVOdW1iZXIoXHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IFJlY29yZHNTZW50VG9Nb2RlbD86IHVua25vd247IHJlY29yZHNTZW50VG9Nb2RlbD86IHVua25vd24gfSkuUmVjb3Jkc1NlbnRUb01vZGVsID8/XHJcbiAgICAgICAgICAgIChyYXdEYXRhIGFzIHsgcmVjb3Jkc1NlbnRUb01vZGVsPzogdW5rbm93biB9KS5yZWNvcmRzU2VudFRvTW9kZWxcclxuICAgICAgICApID8/IG51bGwsXHJcbiAgICAgIFJldHJpZXZhbE1vZGU6IHNhbml0aXplQXNzaXN0YW50VGV4dChcclxuICAgICAgICAocmF3RGF0YSBhcyB7IFJldHJpZXZhbE1vZGU/OiB1bmtub3duOyByZXRyaWV2YWxNb2RlPzogdW5rbm93biB9KS5SZXRyaWV2YWxNb2RlID8/XHJcbiAgICAgICAgICAocmF3RGF0YSBhcyB7IHJldHJpZXZhbE1vZGU/OiB1bmtub3duIH0pLnJldHJpZXZhbE1vZGVcclxuICAgICAgKSB8fCBudWxsLFxyXG4gICAgICBUcnVuY2F0ZWQ6IHRvTnVsbGFibGVCb29sKFxyXG4gICAgICAgIChyYXdEYXRhIGFzIHsgVHJ1bmNhdGVkPzogdW5rbm93bjsgdHJ1bmNhdGVkPzogdW5rbm93biB9KS5UcnVuY2F0ZWQgPz9cclxuICAgICAgICAgIChyYXdEYXRhIGFzIHsgdHJ1bmNhdGVkPzogdW5rbm93biB9KS50cnVuY2F0ZWRcclxuICAgICAgKSxcclxuICAgICAgV2FybmluZ3M6IEFycmF5LmlzQXJyYXkocmF3V2FybmluZ3MpXHJcbiAgICAgICAgPyByYXdXYXJuaW5nc1xyXG4gICAgICAgICAgICAubWFwKChlbnRyeSkgPT4gc2FuaXRpemVBc3Npc3RhbnRUZXh0KGVudHJ5KSlcclxuICAgICAgICAgICAgLmZpbHRlcigoZW50cnkpID0+IGVudHJ5ICYmICFpc0lnbm9yYWJsZUFzc2lzdGFudFdhcm5pbmcoZW50cnkpKVxyXG4gICAgICAgIDogW10sXHJcbiAgICB9LFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBBc2tzIGJ1c2luZXNzIHF1ZXN0aW9ucyBhYm91dCB0aGUgY3VycmVudCBleHBlbnNlIHNoZWV0IGxpc3QgdXNpbmcgL2FwaS9pYS9zZXJ2aWNlL2V4cGVuc2VzaGVldHMvYXNrLlxyXG5leHBvcnQgY29uc3QgYXNrRXhwZW5zZVNoZWV0c1F1ZXN0aW9uID0gYXN5bmMgKFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldHNBc2tSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxFeHBlbnNlU2hlZXRzQXNrUmVzdWx0PiA9PiB7XHJcbiAgY29uc3QgcXVlc3Rpb24gPSBzYWZlVGV4dChwYXlsb2FkPy5xdWVzdGlvbik7XHJcbiAgaWYgKCFxdWVzdGlvbikge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJxdWVzdGlvbiBpcyByZXF1aXJlZC5cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3QgY3NyZlRva2VuID0gZ2V0Q3NyZlRva2VuKCk7XHJcbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpKTtcclxuICBpZiAoY3NyZlRva2VuKSB7XHJcbiAgICBoZWFkZXJzLlJlcXVlc3RWZXJpZmljYXRpb25Ub2tlbiA9IGNzcmZUb2tlbjtcclxuICB9XHJcblxyXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRzQXNrUmVxdWVzdCA9IHtcclxuICAgIHF1ZXN0aW9uLFxyXG4gICAgYW5zd2VySW5zdHJ1Y3Rpb25zOiBzYWZlVGV4dChwYXlsb2FkPy5hbnN3ZXJJbnN0cnVjdGlvbnMpIHx8IHVuZGVmaW5lZCxcclxuICAgIGxpc3RSZXF1ZXN0OiBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUocGF5bG9hZC5saXN0UmVxdWVzdCksXHJcbiAgICBzb3VyY2VKc29uOlxyXG4gICAgICBwYXlsb2FkPy5zb3VyY2VKc29uID09PSBudWxsIHx8IHBheWxvYWQ/LnNvdXJjZUpzb24gPT09IHVuZGVmaW5lZFxyXG4gICAgICAgID8gdW5kZWZpbmVkXHJcbiAgICAgICAgOiBjbG9uZUpzb25Db21wYXRpYmxlVmFsdWUocGF5bG9hZC5zb3VyY2VKc29uKSxcclxuICB9O1xyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9pYS9zZXJ2aWNlL2V4cGVuc2VzaGVldHMvYXNrXCIsIHtcclxuICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnMsXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHJhdyA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcclxuICBjb25zdCByZXRyeUFmdGVyID0gc2FmZVRleHQocmVzcG9uc2UuaGVhZGVycy5nZXQoXCJSZXRyeS1BZnRlclwiKSk7XHJcblxyXG4gIGlmICghcmVzcG9uc2Uub2spIHtcclxuICAgIGNvbnN0IHJlbG9naW5SZXN1bHQgPSBhd2FpdCBoYW5kbGVBcGlBdXRoRmFpbHVyZTxFeHBlbnNlU2hlZXRzQXNrUmVzdWx0PihyYXcsIHJlc3BvbnNlLnN0YXR1cywgXCJleHBlbnNlLXNoZWV0cy1hc2tcIik7XHJcbiAgICBpZiAocmVsb2dpblJlc3VsdCAhPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gcmVsb2dpblJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IocmVhZEFwaU1lc3NhZ2VGcm9tUmF3KHJhdykgfHwgXCJQZXJtaXNzaW9uIGRlbmllZC5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgcGFyc2VkID0gdHJ5UGFyc2VKc29uKHJhdyk7XHJcbiAgaWYgKCFwYXJzZWQgfHwgdHlwZW9mIHBhcnNlZCAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihyZWFkQXBpTWVzc2FnZUZyb21SYXcocmF3KSB8fCBcIlJlcXVlc3QgZmFpbGVkLlwiLCByZXNwb25zZS5zdGF0dXMsIHJhdyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJJbnZhbGlkIHNlcnZlciByZXNwb25zZS5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUV4cGVuc2VTaGVldHNBc2tSZXNwb25zZSh7XHJcbiAgICAuLi4ocGFyc2VkIGFzIEV4cGVuc2VTaGVldHNBc2tSZXN1bHQpLFxyXG4gICAgSHR0cFN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxyXG4gICAgUmV0cnlBZnRlcjogcmV0cnlBZnRlciB8fCBudWxsLFxyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gRXh0cmFjdHMgYW4gZXhwZW5zZSBkcmFmdCBmcm9tIGEgdGlja2V0IGltYWdlIHVzaW5nIC9hcGkvaWEvc2VydmljZS9leHBlbnNlZnJvbXRpY2tldC5cclxuZXhwb3J0IGNvbnN0IGV4dHJhY3RFeHBlbnNlRnJvbVRpY2tldERyYWZ0ID0gYXN5bmMgKFxyXG4gIHRpY2tldEltYWdlOiBGaWxlIHwgQmxvYixcclxuICBwZXJzaXN0VGlja2V0PzogYm9vbGVhbixcclxuICB0aWNrZXRVcmxGaWxlPzogc3RyaW5nLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXREcmFmdFJlc3BvbnNlPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgY29uc3Qgc2FmZVRpY2tldFVybCA9IHNhZmVUZXh0KHRpY2tldFVybEZpbGUpO1xyXG5cclxuICBpZiAodGlja2V0SW1hZ2UgaW5zdGFuY2VvZiBGaWxlKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcInRpY2tldEltYWdlXCIsIHRpY2tldEltYWdlLCBzYWZlVGV4dCh0aWNrZXRJbWFnZS5uYW1lKSB8fCBcInRpY2tldC5qcGdcIik7XHJcbiAgfSBlbHNlIHtcclxuICAgIGZvcm0uYXBwZW5kKFwidGlja2V0SW1hZ2VcIiwgdGlja2V0SW1hZ2UsIFwidGlja2V0LmpwZ1wiKTtcclxuICB9XHJcblxyXG4gIGlmICh0eXBlb2YgcGVyc2lzdFRpY2tldCA9PT0gXCJib29sZWFuXCIpIHtcclxuICAgIGZvcm0uYXBwZW5kKFwicGVyc2lzdFRpY2tldFwiLCBwZXJzaXN0VGlja2V0ID8gXCJ0cnVlXCIgOiBcImZhbHNlXCIpO1xyXG4gIH1cclxuXHJcbiAgaWYgKHNhZmVUaWNrZXRVcmwpIHtcclxuICAgIGZvcm0uYXBwZW5kKFwidGlja2V0VXJsRmlsZVwiLCBzYWZlVGlja2V0VXJsKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldERyYWZ0UmVzcG9uc2U+PihcIi9hcGkvaWEvc2VydmljZS9leHBlbnNlZnJvbXRpY2tldFwiLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUZvcm1IZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gICAgYm9keTogZm9ybSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIENyZWF0ZXMgYW5kIGZpbmFsaXplcyBvbmUgdGlja2V0IGZyb20gYSBzaW5nbGUgbXVsdGlwYXJ0IHVwbG9hZCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvcXVpY2stY3JlYXRlLlxyXG5leHBvcnQgY29uc3QgY3JlYXRlRXhwZW5zZVNoZWV0VGlja2V0UXVpY2sgPSBhc3luYyAoXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlc3VsdD4gPT4ge1xyXG4gIGlmICghcGF5bG9hZD8udGlja2V0SW1hZ2UpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwidGlja2V0SW1hZ2UgaXMgcmVxdWlyZWQuXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgeyBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogX3N1cHByZXNzUGVybWlzc2lvbk1vZGFsLCAuLi5mZXRjaE9wdGlvbnMgfSA9IG9wdGlvbnMgfHwge307XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KGZldGNoT3B0aW9ucyk7XHJcbiAgY29uc3QgZm9ybSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gIGNvbnN0IHNhZmVDdXJyZW5jeUNvZGUgPSBzYWZlVGV4dChwYXlsb2FkPy5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3Qgc2FmZURlc2NyaXB0aW9uID0gc2FmZVRleHQocGF5bG9hZD8uZGVzY3JpcHRpb24pO1xyXG4gIGNvbnN0IHNhZmVDb21lbnRhcmlvID0gc2FmZVRleHQocGF5bG9hZD8uY29tZW50YXJpbyk7XHJcbiAgY29uc3Qgc2FmZVNoZWV0SWQgPSBzYWZlVGV4dChwYXlsb2FkPy5leGlzdGluZ0hvamFHYXN0b3NJZCk7XHJcbiAgY29uc3Qgc2FmZVByb2plY3RJZCA9IHNhZmVUZXh0KHBheWxvYWQ/LnByb2pJZCB8fCBwYXlsb2FkPy5wcm9qZWN0SWQpO1xyXG4gIGNvbnN0IHRpY2tldEltYWdlID0gcGF5bG9hZC50aWNrZXRJbWFnZTtcclxuXHJcbiAgaWYgKHRpY2tldEltYWdlIGluc3RhbmNlb2YgRmlsZSkge1xyXG4gICAgZm9ybS5hcHBlbmQoXCJ0aWNrZXRJbWFnZVwiLCB0aWNrZXRJbWFnZSwgc2FmZVRleHQodGlja2V0SW1hZ2UubmFtZSkgfHwgXCJ0aWNrZXQuanBnXCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBmb3JtLmFwcGVuZChcInRpY2tldEltYWdlXCIsIHRpY2tldEltYWdlLCBcInRpY2tldC5qcGdcIik7XHJcbiAgfVxyXG5cclxuICBpZiAoc2FmZUN1cnJlbmN5Q29kZSkge1xyXG4gICAgZm9ybS5hcHBlbmQoXCJjdXJyZW5jeUNvZGVcIiwgc2FmZUN1cnJlbmN5Q29kZSk7XHJcbiAgfVxyXG5cclxuICBpZiAoXCJkZXNjcmlwdGlvblwiIGluIHBheWxvYWQpIHtcclxuICAgIGZvcm0uYXBwZW5kKFwiZGVzY3JpcHRpb25cIiwgc2FmZURlc2NyaXB0aW9uKTtcclxuICB9XHJcblxyXG4gIGlmIChcImNvbWVudGFyaW9cIiBpbiBwYXlsb2FkKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcImNvbWVudGFyaW9cIiwgc2FmZUNvbWVudGFyaW8pO1xyXG4gIH1cclxuXHJcbiAgaWYgKHNhZmVTaGVldElkKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcImV4aXN0aW5nSG9qYUdhc3Rvc0lkXCIsIHNhZmVTaGVldElkKTtcclxuICB9XHJcblxyXG4gIGlmIChzYWZlU2hlZXRJZCAmJiBzYWZlUHJvamVjdElkKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcInByb2pJZFwiLCBzYWZlUHJvamVjdElkKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNzcmZUb2tlbiA9IGdldENzcmZUb2tlbigpO1xyXG4gIGNvbnN0IGhlYWRlcnMgPSBzYW5pdGl6ZUhlYWRlcnMoYnVpbGRFeHBlbnNlRm9ybUhlYWRlcnMoY29udGV4dCwgZmV0Y2hPcHRpb25zKSk7XHJcbiAgaWYgKGNzcmZUb2tlbikge1xyXG4gICAgaGVhZGVycy5SZXF1ZXN0VmVyaWZpY2F0aW9uVG9rZW4gPSBjc3JmVG9rZW47XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3F1aWNrLWNyZWF0ZVwiLCB7XHJcbiAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxyXG4gICAgLi4uZmV0Y2hPcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnMsXHJcbiAgICBib2R5OiBmb3JtLFxyXG4gIH0pO1xyXG5cclxuICBjb25zdCByYXcgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgY29uc3QgcmV0cnlBZnRlciA9IHNhZmVUZXh0KHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiUmV0cnktQWZ0ZXJcIikpO1xyXG5cclxuICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICBjb25zdCByZWxvZ2luUmVzdWx0ID0gYXdhaXQgaGFuZGxlQXBpQXV0aEZhaWx1cmU8RXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQ+KFxyXG4gICAgICByYXcsXHJcbiAgICAgIHJlc3BvbnNlLnN0YXR1cyxcclxuICAgICAgXCJ0aWNrZXQtcXVpY2stY3JlYXRlXCJcclxuICAgICk7XHJcbiAgICBpZiAocmVsb2dpblJlc3VsdCAhPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gcmVsb2dpblJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IocmVhZEFwaU1lc3NhZ2VGcm9tUmF3KHJhdykgfHwgXCJQZXJtaXNzaW9uIGRlbmllZC5cIiwgcmVzcG9uc2Uuc3RhdHVzLCByYXcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3QgcGFyc2VkID0gdHJ5UGFyc2VKc29uKHJhdyk7XHJcbiAgaWYgKCFwYXJzZWQgfHwgdHlwZW9mIHBhcnNlZCAhPT0gXCJvYmplY3RcIikge1xyXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihyZWFkQXBpTWVzc2FnZUZyb21SYXcocmF3KSB8fCBcIlJlcXVlc3QgZmFpbGVkLlwiLCByZXNwb25zZS5zdGF0dXMsIHJhdyk7XHJcbiAgICB9XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkludmFsaWQgc2VydmVyIHJlc3BvbnNlLlwiLCByZXNwb25zZS5zdGF0dXMsIHJhdyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbm9ybWFsaXplVGlja2V0UXVpY2tDcmVhdGVSZXNwb25zZSh7XHJcbiAgICAuLi4ocGFyc2VkIGFzIEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVzdWx0KSxcclxuICAgIEh0dHBTdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcclxuICAgIFJldHJ5QWZ0ZXI6IHJldHJ5QWZ0ZXIgfHwgbnVsbCxcclxuICB9KTtcclxufTtcclxuXHJcbi8vIENyZWF0ZXMgYSB0aWNrZXQgaGVhZGVyL2xpbmVzIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy5cclxuZXhwb3J0IGNvbnN0IGNyZWF0ZUV4cGVuc2VTaGVldFRpY2tldCA9IGFzeW5jIChcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRDcmVhdGVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IG1vZGUgPSBOdW1iZXIocGF5bG9hZD8ubW9kZSk7XHJcbiAgY29uc3QgcmF3VHJhbnNEYXRlID0gc2FmZVRleHQocGF5bG9hZD8udHJhbnNEYXRlKTtcclxuICBjb25zdCByYXdUaWNrZXREYXRlID0gc2FmZVRleHQocGF5bG9hZD8udGlja2V0RGF0ZSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFRyYW5zRGF0ZSA9IG5vcm1hbGl6ZU9wdGlvbmFsQXBpRGF0ZShyYXdUcmFuc0RhdGUpO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRUaWNrZXREYXRlID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlKHJhd1RpY2tldERhdGUpO1xyXG5cclxuICBpZiAocmF3VHJhbnNEYXRlICYmICFub3JtYWxpemVkVHJhbnNEYXRlKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICB9XHJcbiAgaWYgKHJhd1RpY2tldERhdGUgJiYgIW5vcm1hbGl6ZWRUaWNrZXREYXRlKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihFWFBFTlNFX0FQSV9EQVRFX0ZPUk1BVF9NRVNTQUdFKTtcclxuICB9XHJcblxyXG4gIGlmICgobW9kZSA9PT0gMCB8fCBtb2RlID09PSAxKSAmJiAhbm9ybWFsaXplZFRyYW5zRGF0ZSkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzYWZlUGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0Q3JlYXRlUmVxdWVzdCA9IHtcclxuICAgIC4uLnBheWxvYWQsXHJcbiAgICB0cmFuc0RhdGU6IG5vcm1hbGl6ZWRUcmFuc0RhdGUgfHwgdW5kZWZpbmVkLFxyXG4gICAgdGlja2V0RGF0ZTogbm9ybWFsaXplZFRpY2tldERhdGUgfHwgdW5kZWZpbmVkLFxyXG4gICAgZ2FzdG9UeXBlOiBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZShwYXlsb2FkPy5nYXN0b1R5cGUpLFxyXG4gIH07XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4oXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHNcIiwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplVGlja2V0RmlsdGVyQ3JpdGVyaWFQYXlsb2FkID0gPFxyXG4gIFQgZXh0ZW5kcyB7XHJcbiAgICBjcmVhdGVkRGF0ZUZyb20/OiBzdHJpbmc7XHJcbiAgICBjcmVhdGVkRGF0ZVRvPzogc3RyaW5nO1xyXG4gICAgc2VhcmNoS2V5Pzogc3RyaW5nO1xyXG4gICAgZmlsdGVyPzogc3RyaW5nO1xyXG4gICAgY3VycmVuY3lDb2RlPzogc3RyaW5nO1xyXG4gICAgZ2FzdG9UeXBlPzogdW5rbm93bjtcclxuICAgIHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duO1xyXG4gIH0sXHJcbj4oXHJcbiAgcGF5bG9hZDogVFxyXG4pID0+IHtcclxuICBjb25zdCByYXdDcmVhdGVkRGF0ZUZyb20gPSBzYWZlVGV4dChwYXlsb2FkPy5jcmVhdGVkRGF0ZUZyb20pO1xyXG4gIGNvbnN0IHJhd0NyZWF0ZWREYXRlVG8gPSBzYWZlVGV4dChwYXlsb2FkPy5jcmVhdGVkRGF0ZVRvKTtcclxuICBjb25zdCBjcmVhdGVkRGF0ZUZyb20gPSBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZShyYXdDcmVhdGVkRGF0ZUZyb20pO1xyXG4gIGNvbnN0IGNyZWF0ZWREYXRlVG8gPSBub3JtYWxpemVUaWNrZXRMaXN0RGF0ZShyYXdDcmVhdGVkRGF0ZVRvKTtcclxuICBpZiAocmF3Q3JlYXRlZERhdGVGcm9tICYmICFjcmVhdGVkRGF0ZUZyb20pIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xyXG4gIH1cclxuICBpZiAocmF3Q3JlYXRlZERhdGVUbyAmJiAhY3JlYXRlZERhdGVUbykge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoRVhQRU5TRV9BUElfREFURV9GT1JNQVRfTUVTU0FHRSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwcmVmZXJyZWRTZWFyY2hLZXkgPSBzYWZlVGV4dChwYXlsb2FkPy5zZWFyY2hLZXkgfHwgcGF5bG9hZD8uZmlsdGVyKTtcclxuICBjb25zdCBsZWdhY3lGaWx0ZXIgPSBzYWZlVGV4dChwYXlsb2FkPy5maWx0ZXIgfHwgcHJlZmVycmVkU2VhcmNoS2V5KTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGNyZWF0ZWREYXRlRnJvbTogY3JlYXRlZERhdGVGcm9tIHx8IHVuZGVmaW5lZCxcclxuICAgIGNyZWF0ZWREYXRlVG86IGNyZWF0ZWREYXRlVG8gfHwgdW5kZWZpbmVkLFxyXG4gICAgc2VhcmNoS2V5OiBwcmVmZXJyZWRTZWFyY2hLZXkgfHwgdW5kZWZpbmVkLFxyXG4gICAgZmlsdGVyOiBsZWdhY3lGaWx0ZXIgfHwgdW5kZWZpbmVkLFxyXG4gICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChwYXlsb2FkPy5jdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCkgfHwgdW5kZWZpbmVkLFxyXG4gICAgZ2FzdG9UeXBlOiBub3JtYWxpemVUaWNrZXRMaXN0R2FzdG9UeXBlKHBheWxvYWQ/Lmdhc3RvVHlwZSksXHJcbiAgICBwcm9jZXNzZWRCeUFJOiBub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUkocGF5bG9hZD8ucHJvY2Vzc2VkQnlBSSksXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZVRpY2tldExpc3RGaWx0ZXJQYXlsb2FkID0gPFxyXG4gIFQgZXh0ZW5kcyB7XHJcbiAgICBwYWdlPzogbnVtYmVyO1xyXG4gICAgcGFnZVNpemU/OiBudW1iZXI7XHJcbiAgICBjcmVhdGVkRGF0ZUZyb20/OiBzdHJpbmc7XHJcbiAgICBjcmVhdGVkRGF0ZVRvPzogc3RyaW5nO1xyXG4gICAgc2VhcmNoS2V5Pzogc3RyaW5nO1xyXG4gICAgZmlsdGVyPzogc3RyaW5nO1xyXG4gICAgY3VycmVuY3lDb2RlPzogc3RyaW5nO1xyXG4gICAgZ2FzdG9UeXBlPzogdW5rbm93bjtcclxuICAgIHByb2Nlc3NlZEJ5QUk/OiB1bmtub3duO1xyXG4gIH0sXHJcbj4oXHJcbiAgcGF5bG9hZDogVFxyXG4pID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgcGFnZTogTnVtYmVyLmlzRmluaXRlKHBheWxvYWQ/LnBhZ2UpICYmIE51bWJlcihwYXlsb2FkLnBhZ2UpID4gMCA/IE1hdGguZmxvb3IoTnVtYmVyKHBheWxvYWQucGFnZSkpIDogMSxcclxuICAgIHBhZ2VTaXplOiBOdW1iZXIuaXNGaW5pdGUocGF5bG9hZD8ucGFnZVNpemUpICYmIE51bWJlcihwYXlsb2FkLnBhZ2VTaXplKSA+IDAgPyBNYXRoLmZsb29yKE51bWJlcihwYXlsb2FkLnBhZ2VTaXplKSkgOiA1MCxcclxuICAgIC4uLm5vcm1hbGl6ZVRpY2tldEZpbHRlckNyaXRlcmlhUGF5bG9hZChwYXlsb2FkKSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gTG9hZHMgdGlja2V0IGxpc3QgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL2xpc3QuXHJcbmV4cG9ydCBjb25zdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldHNMaXN0ID0gYXN5bmMgKFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpc3RSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBFeHBlbnNlVGlja2V0TGlzdEZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8+PiA9PiB7XHJcbiAgY29uc3QgeyBheFVzZXJJZE92ZXJyaWRlLCAuLi5iYXNlT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQoYmFzZU9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaXN0UmVxdWVzdCA9IHtcclxuICAgIC4uLm5vcm1hbGl6ZVRpY2tldExpc3RGaWx0ZXJQYXlsb2FkKHBheWxvYWQpLFxyXG4gICAgc3RhdHVzOiBub3JtYWxpemVPcHRpb25hbFRpY2tldFN0YXR1cyhwYXlsb2FkPy5zdGF0dXMpLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0TGlzdEl0ZW1EdG8+PihcclxuICAgIFwiL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL2xpc3RcIixcclxuICAgIHtcclxuICAgICAgLi4uYmFzZU9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkVGlja2V0TGlzdEhlYWRlcnMoY29udGV4dCwgYmFzZU9wdGlvbnMsIGF4VXNlcklkT3ZlcnJpZGUpLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIExvYWRzIGxpbmstbW9kZSB0aWNrZXQgbGlzdCB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGluay9saXN0LlxyXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdCA9IGFzeW5jIChcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdFJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEV4cGVuc2VUaWNrZXRMaXN0RmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kUGFnZWRSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdEl0ZW1EdG8+PiA9PiB7XHJcbiAgY29uc3QgeyBheFVzZXJJZE92ZXJyaWRlLCAuLi5iYXNlT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQoYmFzZU9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRMaW5rTGlzdFJlcXVlc3QgPSB7XHJcbiAgICAuLi5ub3JtYWxpemVUaWNrZXRMaXN0RmlsdGVyUGF5bG9hZChwYXlsb2FkKSxcclxuICB9O1xyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtMaXN0SXRlbUR0bz4+KFxyXG4gICAgXCIvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGluay9saXN0XCIsXHJcbiAgICB7XHJcbiAgICAgIC4uLmJhc2VPcHRpb25zLFxyXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICBoZWFkZXJzOiBidWlsZFRpY2tldExpc3RIZWFkZXJzKGNvbnRleHQsIGJhc2VPcHRpb25zLCBheFVzZXJJZE92ZXJyaWRlKSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVUaWNrZXRMaW5rTGlzdFBhZ2VkUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gTGlua3Mgc2VsZWN0ZWQgb3IgZmlsdGVyZWQgdGlja2V0cyB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvbGluay9idWxrLlxyXG5leHBvcnQgY29uc3QgbGlua0V4cGVuc2VTaGVldFRpY2tldHNCdWxrID0gYXN5bmMgKFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVxdWVzdCxcclxuICBvcHRpb25zPzogRXhwZW5zZVRpY2tldExpc3RGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRMaW5rQnVsa1Jlc3VsdER0bz4+ID0+IHtcclxuICBjb25zdCB7IGF4VXNlcklkT3ZlcnJpZGUsIC4uLmJhc2VPcHRpb25zIH0gPSBvcHRpb25zIHx8IHt9O1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChiYXNlT3B0aW9ucyk7XHJcbiAgY29uc3Qgc2VsZWN0aW9uTW9kZSA9IHBheWxvYWQ/LnNlbGVjdGlvbk1vZGUgPT09IFwiZmlsdGVyZWRcIiA/IFwiZmlsdGVyZWRcIiA6IFwic2VsZWN0ZWRcIjtcclxuICBjb25zdCB0aWNrZXRJZHMgPSBBcnJheS5pc0FycmF5KHBheWxvYWQ/LnRpY2tldElkcylcclxuICAgID8gcGF5bG9hZC50aWNrZXRJZHMubWFwKChlbnRyeSkgPT4gc2FmZVRleHQoZW50cnkpKS5maWx0ZXIoQm9vbGVhbilcclxuICAgIDogW107XHJcbiAgY29uc3QgZXhjbHVkZWRJZHMgPSBBcnJheS5pc0FycmF5KHBheWxvYWQ/LmV4Y2x1ZGVkSWRzKVxyXG4gICAgPyBwYXlsb2FkLmV4Y2x1ZGVkSWRzLm1hcCgoZW50cnkpID0+IHNhZmVUZXh0KGVudHJ5KSkuZmlsdGVyKEJvb2xlYW4pXHJcbiAgICA6IFtdO1xyXG5cclxuICBjb25zdCBzYWZlUGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGlua0J1bGtSZXF1ZXN0ID0ge1xyXG4gICAgZXhwZW5zZVNoZWV0SWQ6IHNhZmVUZXh0KHBheWxvYWQ/LmV4cGVuc2VTaGVldElkKSxcclxuICAgIHNlbGVjdGlvbk1vZGUsXHJcbiAgICB0aWNrZXRJZHM6IHNlbGVjdGlvbk1vZGUgPT09IFwic2VsZWN0ZWRcIiA/IHRpY2tldElkcyA6IHVuZGVmaW5lZCxcclxuICAgIGZpbHRlcnM6XHJcbiAgICAgIHNlbGVjdGlvbk1vZGUgPT09IFwiZmlsdGVyZWRcIiAmJiBwYXlsb2FkPy5maWx0ZXJzXHJcbiAgICAgICAgPyB7XHJcbiAgICAgICAgICAgIC4uLm5vcm1hbGl6ZVRpY2tldEZpbHRlckNyaXRlcmlhUGF5bG9hZChwYXlsb2FkLmZpbHRlcnMpLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIDogdW5kZWZpbmVkLFxyXG4gICAgZXhjbHVkZWRJZHM6IHNlbGVjdGlvbk1vZGUgPT09IFwiZmlsdGVyZWRcIiA/IGV4Y2x1ZGVkSWRzIDogdW5kZWZpbmVkLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldExpbmtCdWxrUmVzdWx0RHRvPj4oXHJcbiAgICBcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9saW5rL2J1bGtcIixcclxuICAgIHtcclxuICAgICAgLi4uYmFzZU9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkVGlja2V0TGlzdEhlYWRlcnMoY29udGV4dCwgYmFzZU9wdGlvbnMsIGF4VXNlcklkT3ZlcnJpZGUpLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXHJcbiAgICB9XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZVRpY2tldExpbmtCdWxrUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gTG9hZHMgb25lIHRpY2tldCBkZXRhaWwgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9LlxyXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXQgPSBhc3luYyAoXHJcbiAgZmlsZUlkOiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZFBhZ2VkUmVzcG9uc2U8RXhwZW5zZVNoZWV0VGlja2V0RGV0YWlsRHRvPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRQYWdlZFJlc3BvbnNlPEV4cGVuc2VTaGVldFRpY2tldERldGFpbER0bz4+KFxyXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9YCxcclxuICAgIHtcclxuICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxyXG4gICAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMpLFxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIERvd25sb2FkcyBvbmUgdGlja2V0IGltYWdlIHByZXZpZXcgYmxvYiB0aHJvdWdoIHRoZSBpbnRlcm5hbCBwcm94eSBlbmRwb2ludC5cclxuZXhwb3J0IGNvbnN0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0UHJldmlld0Jsb2IgPSBhc3luYyAoXHJcbiAgZmlsZUlkOiBzdHJpbmcsXHJcbiAgdXJsRmlsZTogc3RyaW5nLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxCbG9iPiA9PiB7XHJcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IHNhZmVUZXh0KGZpbGVJZCk7XHJcbiAgY29uc3Qgc2FmZVVybEZpbGUgPSBzYWZlVGV4dCh1cmxGaWxlKTtcclxuICBpZiAoIXNhZmVGaWxlSWQgfHwgIXNhZmVVcmxGaWxlKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIk1pc3NpbmcgdGlja2V0IHByZXZpZXcgcGF5bG9hZC5cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCB7IHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiBfc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWwsIC4uLmZldGNoT3B0aW9ucyB9ID0gb3B0aW9ucyB8fCB7fTtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3QgY3NyZlRva2VuID0gZ2V0Q3NyZlRva2VuKCk7XHJcbiAgY29uc3QgaGVhZGVycyA9IHNhbml0aXplSGVhZGVycyhidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIGZldGNoT3B0aW9ucywgdHJ1ZSkpO1xyXG4gIGhlYWRlcnMuQWNjZXB0ID0gXCJpbWFnZS8qXCI7XHJcbiAgY29uc3QgcmVxdWVzdEhlYWRlcnM6IEhlYWRlcnNJbml0ID0ge1xyXG4gICAgQWNjZXB0OiBcImltYWdlLypcIixcclxuICAgIC4uLmhlYWRlcnMsXHJcbiAgfTtcclxuXHJcbiAgaWYgKGNzcmZUb2tlbikge1xyXG4gICAgKHJlcXVlc3RIZWFkZXJzIGFzIFJlY29yZDxzdHJpbmcsIHN0cmluZz4pW1wiUmVxdWVzdFZlcmlmaWNhdGlvblRva2VuXCJdID0gY3NyZlRva2VuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcIi9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy9wcmV2aWV3XCIsIHtcclxuICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXHJcbiAgICAuLi5mZXRjaE9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgaGVhZGVyczogcmVxdWVzdEhlYWRlcnMsXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgIGZpbGVJZDogc2FmZUZpbGVJZCxcclxuICAgICAgdXJsRmlsZTogc2FmZVVybEZpbGUsXHJcbiAgICB9KSxcclxuICB9KTtcclxuXHJcbiAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgY29uc3QgcmF3ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xyXG4gICAgY29uc3QgcmVsb2dpblJlc3VsdCA9IGF3YWl0IGhhbmRsZUFwaUF1dGhGYWlsdXJlPEJsb2I+KHJhdywgcmVzcG9uc2Uuc3RhdHVzLCBcInRpY2tldC1wcmV2aWV3XCIpO1xyXG4gICAgaWYgKHJlbG9naW5SZXN1bHQgIT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIHJlbG9naW5SZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBjb25zdCBtZXNzYWdlID0gcmVhZEFwaU1lc3NhZ2VGcm9tUmF3KHJhdyk7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihtZXNzYWdlIHx8IFwiQ291bGQgbm90IGxvYWQgdGlja2V0IHByZXZpZXcuXCIsIHJlc3BvbnNlLnN0YXR1cywgcmF3KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGJsb2IgPSBhd2FpdCByZXNwb25zZS5ibG9iKCk7XHJcbiAgaWYgKCFibG9iIHx8IGJsb2Iuc2l6ZSA9PT0gMCkge1xyXG4gICAgdGhyb3cgbmV3IEFwaUZldGNoRXJyb3IoXCJDb3VsZCBub3QgbG9hZCB0aWNrZXQgcHJldmlldy5cIik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYmxvYjtcclxufTtcclxuXHJcbi8vIFVwZGF0ZXMgdGlja2V0IGhlYWRlciBtZXRhZGF0YSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0uXHJcbmV4cG9ydCBjb25zdCB1cGRhdGVFeHBlbnNlU2hlZXRUaWNrZXQgPSBhc3luYyAoXHJcbiAgZmlsZUlkOiBzdHJpbmcsXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0VXBkYXRlUmVxdWVzdCxcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8b2JqZWN0Pj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCByYXdUcmFuc0RhdGUgPSBzYWZlVGV4dChwYXlsb2FkPy50cmFuc0RhdGUpO1xyXG4gIGNvbnN0IHJhd1RpY2tldERhdGUgPSBzYWZlVGV4dChwYXlsb2FkPy50aWNrZXREYXRlKTtcclxuICBjb25zdCBub3JtYWxpemVkVHJhbnNEYXRlID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlKHJhd1RyYW5zRGF0ZSk7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFRpY2tldERhdGUgPSBub3JtYWxpemVPcHRpb25hbEFwaURhdGUocmF3VGlja2V0RGF0ZSk7XHJcblxyXG4gIGlmIChyYXdUcmFuc0RhdGUgJiYgIW5vcm1hbGl6ZWRUcmFuc0RhdGUpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xyXG4gIH1cclxuICBpZiAocmF3VGlja2V0RGF0ZSAmJiAhbm9ybWFsaXplZFRpY2tldERhdGUpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldFVwZGF0ZVJlcXVlc3QgPSB7XHJcbiAgICAuLi5wYXlsb2FkLFxyXG4gICAgdHJhbnNEYXRlOiBub3JtYWxpemVkVHJhbnNEYXRlIHx8IHVuZGVmaW5lZCxcclxuICAgIHRpY2tldERhdGU6IG5vcm1hbGl6ZWRUaWNrZXREYXRlIHx8IHVuZGVmaW5lZCxcclxuICAgIGdhc3RvVHlwZTogbm9ybWFsaXplT3B0aW9uYWxUaWNrZXRHYXN0b1R5cGUocGF5bG9hZD8uZ2FzdG9UeXBlKSxcclxuICB9O1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+KGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfWAsIHtcclxuICAgIC4uLm9wdGlvbnMsXHJcbiAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VIZWFkZXJzKGNvbnRleHQsIG9wdGlvbnMsIHRydWUpLFxyXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoc2FmZVBheWxvYWQpLFxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gQWRqdXN0cyBhIHRpY2tldCBoZWFkZXIgdG90YWwgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9L3RvdGFsLWFkanVzdG1lbnQuXHJcbmV4cG9ydCBjb25zdCBhZGp1c3RFeHBlbnNlU2hlZXRUaWNrZXRUb3RhbEFtb3VudCA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRUb3RhbEFkanVzdG1lbnRSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRUb3RhbEFkanVzdG1lbnRSZXN1bHREdG8+PiA9PiB7XHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHRvdGFsQW1vdW50ID0gdG9OdWxsYWJsZU51bWJlcihwYXlsb2FkPy50b3RhbEFtb3VudCk7XHJcbiAgaWYgKCFzYWZlRmlsZUlkIHx8IHRvdGFsQW1vdW50ID09IG51bGwgfHwgdG90YWxBbW91bnQgPCAwKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcIkludmFsaWQgdGlja2V0IHRvdGFsIGFkanVzdG1lbnQgcGF5bG9hZC5cIik7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxFeHBlbnNlU2hlZXRUaWNrZXRUb3RhbEFkanVzdG1lbnRSZXN1bHREdG8+PihcclxuICAgIGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS90b3RhbC1hZGp1c3RtZW50YCxcclxuICAgIHtcclxuICAgICAgLi4ub3B0aW9ucyxcclxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zLCB0cnVlKSxcclxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyB0b3RhbEFtb3VudCB9KSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gRGVsZXRlcyBvbmUgdGlja2V0IG9yIG9uZSB0aWNrZXQgbGluZSB2aWEgcXVlcnkgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9LlxyXG5leHBvcnQgY29uc3QgZGVsZXRlRXhwZW5zZVNoZWV0VGlja2V0ID0gYXN5bmMgKFxyXG4gIGZpbGVJZDogc3RyaW5nLFxyXG4gIGxpbmVSZWNJZD86IG51bWJlcixcclxuICBvcHRpb25zPzogQXBpRmV0Y2hPcHRpb25zXHJcbik6IFByb21pc2U8SW5kQXBpUmVzcG9uc2U8bnVsbD4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3QgcXVlcnkgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XHJcbiAgaWYgKE51bWJlci5pc0ludGVnZXIoTnVtYmVyKGxpbmVSZWNJZCkpICYmIE51bWJlcihsaW5lUmVjSWQpID4gMCkge1xyXG4gICAgcXVlcnkuc2V0KFwibGluZVJlY0lkXCIsIFN0cmluZyhsaW5lUmVjSWQpKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHN1ZmZpeCA9IHF1ZXJ5LnRvU3RyaW5nKCk7XHJcbiAgY29uc3QgdXJsID0gc3VmZml4XHJcbiAgICA/IGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfT8ke3N1ZmZpeH1gXHJcbiAgICA6IGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfWA7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEpzb248SW5kQXBpUmVzcG9uc2U8bnVsbD4+KHVybCwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucyksXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBBcHBsaWVzIElBIHBheWxvYWQgb3ZlciBhbiBleGlzdGluZyB0aWNrZXQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9L2lhLlxyXG5leHBvcnQgY29uc3QgYXBwbHlFeHBlbnNlU2hlZXRUaWNrZXRJYSA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3QgcmF3UGF5bG9hZCA9IChwYXlsb2FkIHx8IHt9KSBhcyBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3Q7XHJcbiAgY29uc3Qgc2FmZVBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCA9IHtcclxuICAgIC4uLnJhd1BheWxvYWQsXHJcbiAgfTtcclxuICBjb25zdCBub3JtYWxpemVkVHJhbnNEYXRlID0gbm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlKHJhd1BheWxvYWQudHJhbnNEYXRlKTtcclxuICBpZiAoIW5vcm1hbGl6ZWRUcmFuc0RhdGUpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKEVYUEVOU0VfQVBJX0RBVEVfRk9STUFUX01FU1NBR0UpO1xyXG4gIH1cclxuICBzYWZlUGF5bG9hZC50cmFuc0RhdGUgPSBub3JtYWxpemVkVHJhbnNEYXRlO1xyXG5cclxuICBjb25zdCBnYXN0b1R5cGUgPSBub3JtYWxpemVPcHRpb25hbFRpY2tldEdhc3RvVHlwZShyYXdQYXlsb2FkLmdhc3RvVHlwZSk7XHJcbiAgaWYgKGdhc3RvVHlwZSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICBkZWxldGUgc2FmZVBheWxvYWQuZ2FzdG9UeXBlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBzYWZlUGF5bG9hZC5nYXN0b1R5cGUgPSBnYXN0b1R5cGU7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vaWFgLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShzYWZlUGF5bG9hZCksXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBDcmVhdGVzIG9uZSB0aWNrZXQgbGluZSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vbGluZXMuXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVFeHBlbnNlU2hlZXRUaWNrZXRMaW5lID0gYXN5bmMgKFxyXG4gIGZpbGVJZDogc3RyaW5nLFxyXG4gIHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldExpbmVSZXF1ZXN0LFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PiA9PiB7XHJcbiAgaWYgKCFzYWZlVGV4dChwYXlsb2FkPy5kZXNjcmlwdGlvbikgfHwgIWlzVmFsaWRUaWNrZXRMaW5lQW1vdW50KHBheWxvYWQpKSB7XHJcbiAgICB0aHJvdyBuZXcgQXBpRmV0Y2hFcnJvcihcImRlc2NyaXB0aW9uIGFuZCBhIHZhbGlkIHNpZ25lZCB0aWNrZXQgbGluZSBhbW91bnQgYXJlIHJlcXVpcmVkLlwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxvYmplY3Q+PihgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vbGluZXNgLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXHJcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIFVwZGF0ZXMgb25lIHRpY2tldCBsaW5lIHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9saW5lcy97bGluZVJlY0lkfS5cclxuZXhwb3J0IGNvbnN0IHVwZGF0ZUV4cGVuc2VTaGVldFRpY2tldExpbmUgPSBhc3luYyAoXHJcbiAgZmlsZUlkOiBzdHJpbmcsXHJcbiAgbGluZVJlY0lkOiBzdHJpbmcgfCBudW1iZXIsXHJcbiAgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0TGluZVJlcXVlc3QsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcclxuICBpZiAoIXNhZmVUZXh0KHBheWxvYWQ/LmRlc2NyaXB0aW9uKSB8fCAhaXNWYWxpZFRpY2tldExpbmVBbW91bnQocGF5bG9hZCkpIHtcclxuICAgIHRocm93IG5ldyBBcGlGZXRjaEVycm9yKFwiZGVzY3JpcHRpb24gYW5kIGEgdmFsaWQgc2lnbmVkIHRpY2tldCBsaW5lIGFtb3VudCBhcmUgcmVxdWlyZWQuXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY29udGV4dCA9IGF3YWl0IGVuc3VyZUV4cGVuc2VBcGlDb250ZXh0KG9wdGlvbnMpO1xyXG4gIGNvbnN0IHNhZmVGaWxlSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGZpbGVJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHNhZmVMaW5lSWQgPSBlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGxpbmVSZWNJZCB8fCBcIlwiKS50cmltKCkpO1xyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+KFxyXG4gICAgYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2xpbmVzLyR7c2FmZUxpbmVJZH1gLFxyXG4gICAge1xyXG4gICAgICAuLi5vcHRpb25zLFxyXG4gICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgIGhlYWRlcnM6IGJ1aWxkRXhwZW5zZUhlYWRlcnMoY29udGV4dCwgb3B0aW9ucywgdHJ1ZSksXHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxyXG4gICAgfVxyXG4gICk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBEZWxldGVzIG9uZSB0aWNrZXQgbGluZSB1c2luZyAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMve2ZpbGVJZH0vbGluZXMve2xpbmVSZWNJZH0uXHJcbmV4cG9ydCBjb25zdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRMaW5lID0gYXN5bmMgKFxyXG4gIGZpbGVJZDogc3RyaW5nLFxyXG4gIGxpbmVSZWNJZDogc3RyaW5nIHwgbnVtYmVyLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxudWxsPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCBzYWZlTGluZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhsaW5lUmVjSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxudWxsPj4oXHJcbiAgICBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vbGluZXMvJHtzYWZlTGluZUlkfWAsXHJcbiAgICB7XHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuICAgICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICAgIH1cclxuICApO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplQXBpUmVzcG9uc2UocmVzcG9uc2UpO1xyXG59O1xyXG5cclxuLy8gVXBsb2Fkcy9yZXBsYWNlcyB0aWNrZXQgZmlsZSBjb250ZW50IHVzaW5nIC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy97ZmlsZUlkfS9maWxlLlxyXG5leHBvcnQgY29uc3QgdXBsb2FkRXhwZW5zZVNoZWV0VGlja2V0RmlsZSA9IGFzeW5jIChcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICBmaWxlOiBGaWxlIHwgQmxvYixcclxuICBleHRlbnNpb24/OiBzdHJpbmcsXHJcbiAgb3B0aW9ucz86IEFwaUZldGNoT3B0aW9uc1xyXG4pOiBQcm9taXNlPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+ID0+IHtcclxuICBjb25zdCBjb250ZXh0ID0gYXdhaXQgZW5zdXJlRXhwZW5zZUFwaUNvbnRleHQob3B0aW9ucyk7XHJcbiAgY29uc3Qgc2FmZUZpbGVJZCA9IGVuY29kZVVSSUNvbXBvbmVudChTdHJpbmcoZmlsZUlkIHx8IFwiXCIpLnRyaW0oKSk7XHJcbiAgY29uc3Qgc2FmZUV4dGVuc2lvbiA9IHNhZmVUZXh0KGV4dGVuc2lvbikucmVwbGFjZSgvXlxcLi8sIFwiXCIpO1xyXG4gIGNvbnN0IHF1ZXJ5ID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpO1xyXG4gIGlmIChzYWZlRXh0ZW5zaW9uKSB7XHJcbiAgICBxdWVyeS5zZXQoXCJleHRlbnNpb25cIiwgc2FmZUV4dGVuc2lvbik7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzdWZmaXggPSBxdWVyeS50b1N0cmluZygpO1xyXG4gIGNvbnN0IHVybCA9IHN1ZmZpeFxyXG4gICAgPyBgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzLyR7c2FmZUZpbGVJZH0vZmlsZT8ke3N1ZmZpeH1gXHJcbiAgICA6IGAvYXBpL2NybS9leHBlbnNlc2hlZXRzL3RpY2tldHMvJHtzYWZlRmlsZUlkfS9maWxlYDtcclxuICBjb25zdCBmb3JtID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgaWYgKGZpbGUgaW5zdGFuY2VvZiBGaWxlKSB7XHJcbiAgICBmb3JtLmFwcGVuZChcImZpbGVcIiwgZmlsZSwgc2FmZVRleHQoZmlsZS5uYW1lKSB8fCBgdGlja2V0LiR7c2FmZUV4dGVuc2lvbiB8fCBcImpwZ1wifWApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBmb3JtLmFwcGVuZChcImZpbGVcIiwgZmlsZSwgYHRpY2tldC4ke3NhZmVFeHRlbnNpb24gfHwgXCJqcGdcIn1gKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hKc29uPEluZEFwaVJlc3BvbnNlPG9iamVjdD4+KHVybCwge1xyXG4gICAgLi4ub3B0aW9ucyxcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICBoZWFkZXJzOiBidWlsZEV4cGVuc2VGb3JtSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICAgIGJvZHk6IGZvcm0sXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBub3JtYWxpemVBcGlSZXNwb25zZShyZXNwb25zZSk7XHJcbn07XHJcblxyXG4vLyBEZWxldGVzIHRpY2tldCBmaWxlIGNvbnRlbnQgdXNpbmcgL2FwaS9jcm0vZXhwZW5zZXNoZWV0cy90aWNrZXRzL3tmaWxlSWR9L2ZpbGUuXHJcbmV4cG9ydCBjb25zdCBkZWxldGVFeHBlbnNlU2hlZXRUaWNrZXRGaWxlID0gYXN5bmMgKFxyXG4gIGZpbGVJZDogc3RyaW5nLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxJbmRBcGlSZXNwb25zZTxudWxsPj4gPT4ge1xyXG4gIGNvbnN0IGNvbnRleHQgPSBhd2FpdCBlbnN1cmVFeHBlbnNlQXBpQ29udGV4dChvcHRpb25zKTtcclxuICBjb25zdCBzYWZlRmlsZUlkID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhmaWxlSWQgfHwgXCJcIikudHJpbSgpKTtcclxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxJbmRBcGlSZXNwb25zZTxudWxsPj4oYC9hcGkvY3JtL2V4cGVuc2VzaGVldHMvdGlja2V0cy8ke3NhZmVGaWxlSWR9L2ZpbGVgLCB7XHJcbiAgICAuLi5vcHRpb25zLFxyXG4gICAgbWV0aG9kOiBcIkRFTEVURVwiLFxyXG4gICAgaGVhZGVyczogYnVpbGRFeHBlbnNlSGVhZGVycyhjb250ZXh0LCBvcHRpb25zKSxcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUFwaVJlc3BvbnNlKHJlc3BvbnNlKTtcclxufTtcclxuXHJcbi8vIFNlYXJjaGVzIHByb2plY3RzIGZvciBkcm9wZG93biB1c2FnZSBpbiBmaWx0ZXJzIGFuZCBlZGl0IGZvcm1zLlxyXG5leHBvcnQgY29uc3QgZmV0Y2hFeHBlbnNlUHJvamVjdHMgPSBhc3luYyAoXHJcbiAgdGVybTogc3RyaW5nLFxyXG4gIHBhZ2U6IG51bWJlcixcclxuICBwYWdlU2l6ZTogbnVtYmVyLFxyXG4gIG9wdGlvbnM/OiBBcGlGZXRjaE9wdGlvbnNcclxuKTogUHJvbWlzZTxQcm9qZWN0RHJvcGRvd25SZXNwb25zZT4gPT4ge1xyXG4gIGNvbnN0IHNhZmVUZXJtID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyh0ZXJtIHx8IFwiXCIpKTtcclxuICBjb25zdCBzYWZlUGFnZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlKSAmJiBwYWdlID4gMCA/IE1hdGguZmxvb3IocGFnZSkgOiAxO1xyXG4gIGNvbnN0IHNhZmVQYWdlU2l6ZSA9IE51bWJlci5pc0Zpbml0ZShwYWdlU2l6ZSkgJiYgcGFnZVNpemUgPiAwID8gTWF0aC5mbG9vcihwYWdlU2l6ZSkgOiA1MDtcclxuXHJcbiAgcmV0dXJuIGZldGNoSnNvbjxQcm9qZWN0RHJvcGRvd25SZXNwb25zZT4oXHJcbiAgICBgL2FwaS9jcm0vcHJvamVjdHMvbGlzdD9maWx0ZXI9JHtzYWZlVGVybX0mcGFnZT0ke3NhZmVQYWdlfSZwYWdlU2l6ZT0ke3NhZmVQYWdlU2l6ZX1gLFxyXG4gICAge1xyXG4gICAgICBtZXRob2Q6IFwiR0VUXCIsXHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICB9XHJcbiAgKTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxJQUFNLGdCQUFnQixDQUFLLGFBQXVDO0FBQ2hFLFFBQU0sTUFBTyxZQUFZLENBQUM7QUFDMUIsTUFBSSxNQUFNLFFBQVEsSUFBSSxLQUFLLEVBQUcsUUFBTyxJQUFJO0FBQ3pDLE1BQUksTUFBTSxRQUFRLElBQUksS0FBSyxFQUFHLFFBQU8sSUFBSTtBQUN6QyxTQUFPLENBQUM7QUFDVjtBQUVPLElBQU0sNkJBQTZCLENBQ3hDLGFBQzhDO0FBQzlDLFFBQU0sUUFBUSxjQUFjLFFBQVE7QUFDcEMsUUFBTSxrQkFBa0IsTUFBTSxJQUFJLENBQUMsVUFBVTtBQUFBLElBQzNDLEdBQUc7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ2xCLE1BQTJFLHVCQUN6RSxNQUE0QztBQUFBLElBQ2pEO0FBQUEsSUFDQSxnQkFBZ0I7QUFBQSxNQUNiLE1BQWlFLGtCQUMvRCxNQUF1QztBQUFBLElBQzVDO0FBQUEsSUFDQSxxQkFBcUIsaUJBQWlCLE1BQU0sdUJBQXVCLE1BQU0sbUJBQW1CO0FBQUEsSUFDNUYsZUFBZSxTQUFTLE1BQU0saUJBQWlCLE1BQU0sYUFBYSxLQUFLO0FBQUEsSUFDdkUsV0FBVyxTQUFTLE1BQU0sYUFBYSxNQUFNLFNBQVMsS0FBSztBQUFBLEVB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QUNSLFNBQVMsd0JBQXdCLFNBQVMsT0FBTztBQUFBLElBQ2pELE1BQU07QUFBQSxFQUNSLENBQUM7QUFFRCxTQUFPRyxzQkFBcUIsUUFBUTtBQUN0QztBQUdPLElBQU0sK0JBQStCLE9BQzFDLFFBQ0EsWUFDa0M7QUFDbEMsUUFBTSxVQUFVLE1BQU0sd0JBQXdCLE9BQU87QUFDckQsUUFBTSxhQUFhLG1CQUFtQixPQUFPLFVBQVUsRUFBRSxFQUFFLEtBQUssQ0FBQztBQUNqRSxRQUFNLFdBQVcsTUFBTSxVQUFnQyxrQ0FBa0MsVUFBVSxTQUFTO0FBQUEsSUFDMUcsR0FBRztBQUFBLElBQ0gsUUFBUTtBQUFBLElBQ1IsU0FBUyxvQkFBb0IsU0FBUyxPQUFPO0FBQUEsRUFDL0MsQ0FBQztBQUVELFNBQU9BLHNCQUFxQixRQUFRO0FBQ3RDO0FBR08sSUFBTSx1QkFBdUIsT0FDbEMsTUFDQSxNQUNBLFVBQ0EsWUFDcUM7QUFDckMsUUFBTSxXQUFXLG1CQUFtQixPQUFPLFFBQVEsRUFBRSxDQUFDO0FBQ3RELFFBQU0sV0FBVyxPQUFPLFNBQVMsSUFBSSxLQUFLLE9BQU8sSUFBSSxLQUFLLE1BQU0sSUFBSSxJQUFJO0FBQ3hFLFFBQU0sZUFBZSxPQUFPLFNBQVMsUUFBUSxLQUFLLFdBQVcsSUFBSSxLQUFLLE1BQU0sUUFBUSxJQUFJO0FBRXhGLFNBQU87QUFBQSxJQUNMLGlDQUFpQyxRQUFRLFNBQVMsUUFBUSxhQUFhLFlBQVk7QUFBQSxJQUNuRjtBQUFBLE1BQ0UsUUFBUTtBQUFBLE1BQ1IsR0FBRztBQUFBLElBQ0w7QUFBQSxFQUNGO0FBQ0Y7IiwKICAibmFtZXMiOiBbInNhZmVUZXh0IiwgInNhZmVUZXh0IiwgInRvTnVsbGFibGVOdW1iZXIiLCAiaXNOb25OZWdhdGl2ZU51bWJlciIsICJpc1Bvc2l0aXZlTnVtYmVyIiwgIm5vcm1hbGl6ZU9wdGlvbmFsVGlja2V0R2FzdG9UeXBlIiwgIm5vcm1hbGl6ZVRpY2tldExpc3RHYXN0b1R5cGUiLCAibm9ybWFsaXplT3B0aW9uYWxUaWNrZXRTdGF0dXMiLCAibm9ybWFsaXplT3B0aW9uYWxBcGlEYXRlIiwgIm5vcm1hbGl6ZVJlcXVpcmVkQXBpRGF0ZSIsICJub3JtYWxpemVUaWNrZXRMaXN0RGF0ZSIsICJ0b051bGxhYmxlQm9vbCIsICJub3JtYWxpemVPcHRpb25hbFRpY2tldFByb2Nlc3NlZEJ5QUkiLCAibm9ybWFsaXplRXhwZW5zZVNoZWV0TGlzdFN0YXR1c0ZpbHRlciIsICJ0b0ZsYWdCb29sIiwgInRvTnVsbGFibGVOdW1iZXIiLCAic2FmZVRleHQiLCAibm9ybWFsaXplTGlzdFBhZ2VkUmVzcG9uc2UiLCAibm9ybWFsaXplRGV0YWlsUGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVBcGlSZXNwb25zZSIsICJub3JtYWxpemVUaWNrZXRRdWlja0NyZWF0ZVJlc3BvbnNlIiwgIm5vcm1hbGl6ZUN1cnJlbmN5UGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVTdWJvcmRpbmF0ZXNQYWdlZFJlc3BvbnNlIiwgIm5vcm1hbGl6ZVRpY2tldExpc3RQYWdlZFJlc3BvbnNlIiwgIm5vcm1hbGl6ZVRpY2tldExpbmtMaXN0UGFnZWRSZXNwb25zZSIsICJub3JtYWxpemVUaWNrZXREZXRhaWxQYWdlZFJlc3BvbnNlIiwgIm5vcm1hbGl6ZVRpY2tldExpbmtCdWxrUmVzcG9uc2UiLCAibWFwRXhwZW5zZVNoZWV0TGlzdEl0ZW1Ub0NhcmQiLCAibWFwRXhwZW5zZVNoZWV0SGVhZGVyIiwgIm1hcEV4cGVuc2VTaGVldExpbmUiLCAiaXNQb3NpdGl2ZU51bWJlciIsICJpc05vbk5lZ2F0aXZlTnVtYmVyIl0KfQo=
