import { ApiFetchError, fetchJson, type ApiFetchOptions } from "../../../services/apiService.ts";
import type {
  EntraContextDto,
  EntraContextRequest,
  ExchangeRateDto,
  ExpenseSheetCard,
  ExpenseSheetCurrencyDto,
  ExpenseSheetCreateRequest,
  ExpenseSheetCreateResponseData,
  ExpenseSheetDetailDto,
  ExpenseSheetHeader,
  ExpenseSheetHeaderUpdateRequest,
  ExpenseSheetLine,
  ExpenseSheetLineDto,
  ExpenseSheetLineUpdateRequest,
  ExpenseSheetLineUpdateResponseData,
  ExpenseSheetListApiRequest,
  ExpenseSheetListItemDto,
  IndApiResponse,
  IndPagedResponse,
} from "../expenseTypes.ts";

type ProjectDropdownResponse = {
  total?: number;
  items?: Array<{ value?: string; text?: string }>;
};

type LegacyExpenseListItem = {
  hojaGastosId?: unknown;
  description?: unknown;
  voucher?: unknown;
  projId?: unknown;
  currencyCode?: unknown;
  totalAmount?: unknown;
  totalAmountMST?: unknown;
  exchRate?: unknown;
  userId?: unknown;
  exchangeRateMode?: unknown;
  expenseSheetStatus?: unknown;
  createdDate?: unknown;
};

type LegacyExpenseListResponse = {
  success?: boolean;
  message?: string;
  total?: number;
  page?: number;
  pageSize?: number;
  items?: LegacyExpenseListItem[];
};

type LegacyExpenseDetailLine = {
  lineRecId?: unknown;
  transDate?: unknown;
  typeValue?: unknown;
  typeValueCode?: unknown;
  description?: unknown;
  internacional?: unknown;
  ticket?: unknown;
  qty?: unknown;
  amount?: unknown;
  projId?: unknown;
  indAttachFiles?: unknown;
};

type LegacyExpenseDetailHeader = {
  hojaGastosId?: unknown;
  userId?: unknown;
  description?: unknown;
  currencyCode?: unknown;
  totalAmount?: unknown;
  totalAmountMST?: unknown;
  exchRate?: unknown;
  projId?: unknown;
  voucher?: unknown;
  createdDate?: unknown;
  expenseSheetStatus?: unknown;
  exchangeRateMode?: unknown;
};

type LegacyExpenseDetailResponse = {
  success?: boolean;
  message?: string;
  data?: {
    header?: LegacyExpenseDetailHeader;
    lines?: LegacyExpenseDetailLine[];
  };
};

type LegacyCommandResponse<T> = {
  success?: boolean;
  message?: string;
  data?: T;
};

type ExpenseApiContext = {
  token: string;
  companyId: string;
  axUserId: string;
  defaultCurrencyCode: string;
};

type ExpenseApiAuthSeed = {
  token: string;
  entraOid: string;
  appCode: string;
  strictApiRoutes: boolean;
};

const DEFAULT_APP_CODE = "CRM";
const JSON_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
};

let runtimeAuthSeed: Partial<ExpenseApiAuthSeed> = {};
let cachedContext: ExpenseApiContext | null = null;
let cachedContextKey = "";
let contextPromise: Promise<ExpenseApiContext> | null = null;
const cachedCurrencyResponses = new Map<string, IndPagedResponse<ExpenseSheetCurrencyDto>>();
const pendingCurrencyRequests = new Map<string, Promise<IndPagedResponse<ExpenseSheetCurrencyDto>>>();

const safeText = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  return String(value).trim();
};

const toNullableNumber = (value: unknown): number | null => {
  if (value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const isNonNegativeNumber = (value: unknown): boolean => {
  const parsed = toNullableNumber(value);
  return parsed !== null && parsed >= 0;
};

const toNullableBool = (value: unknown): boolean | null => {
  if (value === null || value === undefined) return null;
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true" || normalized === "1") return true;
    if (normalized === "false" || normalized === "0") return false;
  }
  if (typeof value === "number") {
    if (value === 1) return true;
    if (value === 0) return false;
  }
  return null;
};

const toFlagBool = (value: unknown): boolean | null => {
  const normalizedBool = toNullableBool(value);
  if (normalizedBool !== null) return normalizedBool;

  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return null;
  if (normalized === "on" || normalized === "yes" || normalized === "y") return true;
  if (normalized === "off" || normalized === "no" || normalized === "n") return false;
  return null;
};

const sanitizeHeaders = (headers: HeadersInit | undefined): Record<string, string> => {
  if (!headers) return {};

  if (headers instanceof Headers) {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  if (Array.isArray(headers)) {
    return headers.reduce<Record<string, string>>((acc, [key, value]) => {
      acc[String(key)] = String(value);
      return acc;
    }, {});
  }

  return Object.entries(headers).reduce<Record<string, string>>((acc, [key, value]) => {
    if (value === undefined || value === null) return acc;
    acc[key] = String(value);
    return acc;
  }, {});
};

const getHeaderValue = (headers: HeadersInit | undefined, key: string): string => {
  const normalizedKey = key.trim().toLowerCase();
  const entries = Object.entries(sanitizeHeaders(headers));
  const match = entries.find(([headerKey]) => headerKey.trim().toLowerCase() === normalizedKey);
  return safeText(match?.[1]);
};

const resolveBearerToken = (headers: HeadersInit | undefined): string => {
  const authorization = getHeaderValue(headers, "Authorization");
  if (!authorization) return "";

  if (/^bearer\s+/i.test(authorization)) {
    return authorization.replace(/^bearer\s+/i, "").trim();
  }

  return authorization.trim();
};

const readWindowAuthSeed = (): Partial<ExpenseApiAuthSeed> => {
  if (typeof window === "undefined") return {};

  return {
    token: safeText(window.__IND_API_TOKEN__),
    entraOid: safeText(window.__IND_ENTRA_OID__),
    appCode: safeText(window.__IND_APP_CODE__),
    strictApiRoutes: toFlagBool(window.__IND_EXPENSE_STRICT_API__) === true,
  };
};

const readRuntimeStrictApiFlag = (): boolean => {
  if (typeof window === "undefined") return false;

  const explicitWindowFlag = toFlagBool(window.__IND_EXPENSE_STRICT_API__);
  if (explicitWindowFlag !== null) return explicitWindowFlag;

  const queryFlag = toFlagBool(new URLSearchParams(window.location.search).get("strictExpenseApi"));
  if (queryFlag !== null) return queryFlag;

  try {
    const localStorageFlag = toFlagBool(window.localStorage?.getItem("ind_expense_strict_api"));
    if (localStorageFlag !== null) return localStorageFlag;
  } catch {
    // Ignore storage read issues and keep default behavior.
  }

  return false;
};

const readWindowSelectedCompany = (): string => {
  if (typeof window === "undefined") return "";
  return safeText(window.__IND_SELECTED_COMPANY__).toUpperCase();
};

const buildContextKey = (seed: ExpenseApiAuthSeed): string => {
  return `${seed.token}|${seed.entraOid}|${seed.appCode}|${readWindowSelectedCompany()}`;
};

const buildExpenseHeaders = (
  context: ExpenseApiContext,
  options?: ApiFetchOptions,
  includeJson = false,
  includeAxUserId = true
): HeadersInit => {
  const base = sanitizeHeaders(options?.headers);
  const merged: Record<string, string> = { ...base };

  if (safeText(context.token)) {
    merged.Authorization = `Bearer ${context.token}`;
  }

  if (safeText(context.companyId)) {
    merged["X-IND-Company"] = context.companyId;
  }

  if (includeAxUserId && safeText(context.axUserId)) {
    merged["X-IND-AxUserId"] = context.axUserId;
  }

  if (includeJson) {
    merged["Content-Type"] = "application/json";
  }

  return merged;
};

const buildContextHeaders = (token: string, options?: ApiFetchOptions): HeadersInit => {
  const base = sanitizeHeaders(options?.headers);
  const merged: Record<string, string> = {
    ...base,
    ...JSON_HEADERS,
  };

  if (safeText(token)) {
    merged.Authorization = `Bearer ${token}`;
  }

  return merged;
};

const resolveAuthToken = (options?: ApiFetchOptions): string => {
  const tokenFromHeaders = resolveBearerToken(options?.headers);
  const windowSeed = readWindowAuthSeed();
  return safeText(tokenFromHeaders || runtimeAuthSeed.token || windowSeed.token);
};

const resolveAuthSeed = (options?: ApiFetchOptions): ExpenseApiAuthSeed => {
  const windowSeed = readWindowAuthSeed();
  const token = resolveAuthToken(options);
  const entraOid = safeText(runtimeAuthSeed.entraOid || windowSeed.entraOid);
  const appCode = safeText(runtimeAuthSeed.appCode || windowSeed.appCode || DEFAULT_APP_CODE) || DEFAULT_APP_CODE;
  const strictApiRoutes =
    typeof runtimeAuthSeed.strictApiRoutes === "boolean"
      ? runtimeAuthSeed.strictApiRoutes
      : (windowSeed.strictApiRoutes === true);

  return {
    token,
    entraOid,
    appCode,
    strictApiRoutes,
  };
};

const validateContextResponse = (response: IndPagedResponse<EntraContextDto>): ExpenseApiContext => {
  if (!response.Success) {
    throw new ApiFetchError(response.Message || "Could not load Entra context.");
  }

  const first = Array.isArray(response.Items) ? response.Items[0] : null;
  if (!first || !first.Header) {
    throw new ApiFetchError("Could not load Entra context.");
  }

  const axUserId = safeText(first.Header.AxUserId);
  const defaultCompany = safeText(first.Header.DefaultCompany);
  const defaultCurrencyCode = safeText(first.Header.DefaultCurrencyCode);
  const companies = Array.isArray(first.Companies) ? first.Companies : [];
  const fallbackCompany = safeText(companies.find((item) => item.IsDefault)?.CompanyId);
  const companyId = defaultCompany || fallbackCompany;

  if (!axUserId || !companyId) {
    throw new ApiFetchError("Could not resolve Entra company context.");
  }

  return {
    token: "",
    companyId,
    axUserId,
    defaultCurrencyCode,
  };
};

const ensureExpenseApiContext = async (options?: ApiFetchOptions): Promise<ExpenseApiContext> => {
  const seed = resolveAuthSeed(options);
  const contextKey = buildContextKey(seed);

  if (cachedContext && cachedContextKey === contextKey) {
    return cachedContext;
  }

  if (contextPromise && cachedContextKey === contextKey) {
    return contextPromise;
  }

  const fallbackCompanyId = readWindowSelectedCompany();
  if (!safeText(seed.entraOid) && fallbackCompanyId) {
    const fallbackContext: ExpenseApiContext = {
      token: seed.token,
      companyId: fallbackCompanyId,
      axUserId: "",
      defaultCurrencyCode: "",
    };

    cachedContext = fallbackContext;
    cachedContextKey = contextKey;
    return fallbackContext;
  }

  if (!safeText(seed.entraOid)) {
    throw new ApiFetchError("Missing Entra OID for Entra context request.");
  }

  cachedContextKey = contextKey;
  contextPromise = (async () => {
    const contextPayload: EntraContextRequest = {
      entraOid: seed.entraOid,
      appCode: seed.appCode,
    };

    const contextResponse = await fetchJson<IndPagedResponse<EntraContextDto>>("/api/auth/entra/context", {
      ...options,
      method: "POST",
      headers: buildContextHeaders(seed.token, options),
      body: JSON.stringify(contextPayload),
    });

    const resolved = validateContextResponse(contextResponse);
    const nextContext: ExpenseApiContext = {
      ...resolved,
      token: seed.token,
    };

    cachedContext = nextContext;
    return nextContext;
  })();

  try {
    return await contextPromise;
  } finally {
    contextPromise = null;
  }
};

const normalizeListPagedResponse = (
  response: IndPagedResponse<ExpenseSheetListItemDto>
): IndPagedResponse<ExpenseSheetListItemDto> => {
  return {
    ...response,
    Items: Array.isArray(response?.Items) ? response.Items : [],
  };
};

const normalizeDetailPagedResponse = (
  response: IndPagedResponse<ExpenseSheetDetailDto>
): IndPagedResponse<ExpenseSheetDetailDto> => {
  return {
    ...response,
    Items: Array.isArray(response?.Items) ? response.Items : [],
  };
};

const normalizeApiResponse = <T>(response: IndApiResponse<T>): IndApiResponse<T> => {
  return {
    ...response,
    Errors: Array.isArray(response?.Errors) ? response.Errors : response?.Errors ?? null,
  };
};

const normalizeCurrencyPagedResponse = (
  response: IndPagedResponse<ExpenseSheetCurrencyDto>
): IndPagedResponse<ExpenseSheetCurrencyDto> => {
  return {
    ...response,
    Items: Array.isArray(response?.Items) ? response.Items : [],
  };
};

const looksLikeHtmlDocument = (value: unknown): boolean => {
  const raw = safeText(value).toLowerCase();
  return raw.startsWith("<!doctype html") || raw.startsWith("<html");
};

const isApiRouteUnavailable = (error: unknown): error is ApiFetchError => {
  if (!(error instanceof ApiFetchError)) return false;
  if (error.status !== 404) return false;
  return looksLikeHtmlDocument(error.responseBody);
};

const isStrictApiRoutesEnabled = (): boolean => {
  if (typeof runtimeAuthSeed.strictApiRoutes === "boolean") {
    return runtimeAuthSeed.strictApiRoutes;
  }

  return readRuntimeStrictApiFlag();
};

const shouldUseLegacyFallback = (error: unknown): boolean => {
  if (isStrictApiRoutesEnabled()) return false;
  return isApiRouteUnavailable(error);
};

const toLegacyListRequestPayload = (payload: ExpenseSheetListApiRequest) => {
  return {
    filter: safeText(payload.filter),
    hojaGastosId: safeText(payload.filter),
    billedMode: payload.billedMode ?? 0,
    fromDate: safeText(payload.createdDateFrom),
    toDate: safeText(payload.createdDateTo),
    projectId: safeText(payload.projId),
    currencyCode: safeText(payload.currencyCode),
    page: Number.isFinite(payload.page) && payload.page > 0 ? payload.page : 1,
    pageSize: Number.isFinite(payload.pageSize) && payload.pageSize > 0 ? payload.pageSize : 50,
  };
};

const mapLegacyListItemToApiListItem = (item: LegacyExpenseListItem): ExpenseSheetListItemDto => {
  return {
    HojaGastosId: safeText(item.hojaGastosId),
    Description: safeText(item.description),
    ExpenseSheetStatus: toNullableNumber(item.expenseSheetStatus),
    UserId: safeText(item.userId) || null,
    Voucher: safeText(item.voucher),
    ProjId: safeText(item.projId),
    CurrencyCode: safeText(item.currencyCode),
    TotalAmount: toNullableNumber(item.totalAmount ?? item.totalAmountMST),
    ExchRate: toNullableNumber(item.exchRate),
    ExchangeRateMode: toNullableNumber(item.exchangeRateMode),
    CreatedDate: safeText(item.createdDate) || null,
  };
};

const mapLegacyListResponse = (
  legacy: LegacyExpenseListResponse,
  fallbackPage: number,
  fallbackPageSize: number
): IndPagedResponse<ExpenseSheetListItemDto> => {
  const legacyItems = Array.isArray(legacy?.items) ? legacy.items : [];
  const mappedItems = legacyItems.map((entry) => mapLegacyListItemToApiListItem(entry));

  return {
    Success: legacy.success !== false,
    Message: safeText(legacy.message) || "OK",
    Total: toNullableNumber(legacy.total) ?? mappedItems.length,
    Page: toNullableNumber(legacy.page) ?? fallbackPage,
    PageSize: toNullableNumber(legacy.pageSize) ?? fallbackPageSize,
    Items: mappedItems,
    TraceId: undefined,
  };
};

const mapLegacyDetailResponse = (legacy: LegacyExpenseDetailResponse): IndPagedResponse<ExpenseSheetDetailDto> => {
  const header = legacy?.data?.header ?? {};
  const lines = Array.isArray(legacy?.data?.lines) ? legacy.data.lines : [];
  const mappedLines: ExpenseSheetLineDto[] = lines.map((line) => {
    const rawTypeValueCode = safeText(line.typeValueCode || line.typeValue);
    const parsedTypeValue = Number(rawTypeValueCode);
    const typeValue = Number.isFinite(parsedTypeValue) ? parsedTypeValue : null;

    return {
      RecId: safeText(line.lineRecId),
      TransDate: safeText(line.transDate),
      TypeValue: typeValue,
      Description: safeText(line.description),
      Internacional: toNullableBool(line.internacional),
      Ticket: toNullableBool(line.ticket),
      Qty: toNullableNumber(line.qty),
      Amount: toNullableNumber(line.amount),
      ProjId: safeText(line.projId),
      IndAttachFiles: safeText(line.indAttachFiles),
    };
  });

  const mappedItem: ExpenseSheetDetailDto = {
    HojaGastosId: safeText(header.hojaGastosId),
    UserId: safeText(header.userId),
    Description: safeText(header.description),
    ExpenseSheetStatus: toNullableNumber(header.expenseSheetStatus),
    CurrencyCode: safeText(header.currencyCode),
    TotalAmount: toNullableNumber(header.totalAmount ?? header.totalAmountMST),
    ExchRate: toNullableNumber(header.exchRate),
    ExchangeRateMode: toNullableNumber(header.exchangeRateMode),
    ProjId: safeText(header.projId),
    Voucher: safeText(header.voucher),
    CreatedDate: safeText(header.createdDate) || null,
    Lines: mappedLines,
  };

  return {
    Success: legacy.success !== false,
    Message: safeText(legacy.message) || "OK",
    Total: 1,
    Page: 1,
    PageSize: 1,
    Items: mappedItem.HojaGastosId ? [mappedItem] : [],
    TraceId: undefined,
  };
};

const toMappedCreateResponse = (
  legacy: LegacyCommandResponse<Record<string, unknown>>
): IndApiResponse<ExpenseSheetCreateResponseData> => {
  const rawData = legacy?.data ?? {};
  const hojaGastosId = safeText(rawData.HojaGastosId ?? rawData.hojaGastosId);
  const rawLineIds = Array.isArray(rawData.LineRecIds)
    ? rawData.LineRecIds
    : (Array.isArray(rawData.lineRecIds) ? rawData.lineRecIds : []);
  const lineRecIds = rawLineIds
    .map((entry) => Number(entry))
    .filter((entry) => Number.isFinite(entry));

  return normalizeApiResponse({
    Success: legacy.success !== false,
    Message: safeText(legacy.message) || "",
    ErrorCode: null,
    Data: hojaGastosId ? { HojaGastosId: hojaGastosId, LineRecIds: lineRecIds } : null,
    Errors: null,
    TraceId: undefined,
  });
};

const toMappedHeaderUpdateResponse = (
  legacy: LegacyCommandResponse<Record<string, unknown>>,
  hojaGastosId: string
): IndApiResponse<{ HojaGastosId: string }> => {
  const rawData = legacy?.data ?? {};
  const resolvedSheetId = safeText(rawData.HojaGastosId ?? rawData.hojaGastosId) || safeText(hojaGastosId);

  return normalizeApiResponse({
    Success: legacy.success !== false,
    Message: safeText(legacy.message) || "",
    ErrorCode: null,
    Data: resolvedSheetId ? { HojaGastosId: resolvedSheetId } : null,
    Errors: null,
    TraceId: undefined,
  });
};

const toMappedLineUpdateResponse = (
  legacy: LegacyCommandResponse<Record<string, unknown>>,
  hojaGastosId: string,
  lineRecId: string
): IndApiResponse<ExpenseSheetLineUpdateResponseData> => {
  const rawData = legacy?.data ?? {};
  const resolvedSheetId = safeText(rawData.HojaGastosId ?? rawData.hojaGastosId) || safeText(hojaGastosId);
  const resolvedLineRecId =
    toNullableNumber(rawData.LineRecId ?? rawData.lineRecId) ?? toNullableNumber(lineRecId) ?? 0;

  return normalizeApiResponse({
    Success: legacy.success !== false,
    Message: safeText(legacy.message) || "",
    ErrorCode: null,
    Data: resolvedSheetId ? { HojaGastosId: resolvedSheetId, LineRecId: resolvedLineRecId } : null,
    Errors: null,
    TraceId: undefined,
  });
};

const toMappedNullCommandResponse = (
  legacy: LegacyCommandResponse<unknown>
): IndApiResponse<null> => {
  return normalizeApiResponse({
    Success: legacy.success !== false,
    Message: safeText(legacy.message) || "",
    ErrorCode: null,
    Data: null,
    Errors: null,
    TraceId: undefined,
  });
};

const resolveTypeLabel = (typeValueCode: string): string => {
  if (!typeValueCode || typeof window === "undefined") {
    return typeValueCode;
  }

  const rawCatalog = Array.isArray(window.__EXPENSE_GASTO_TYPES__) ? window.__EXPENSE_GASTO_TYPES__ : [];
  const match = rawCatalog.find((entry) => {
    const entryCode = safeText(entry?.value || entry?.Value);
    return entryCode === typeValueCode;
  });

  return safeText(match?.text || match?.Text) || typeValueCode;
};

// Sets runtime auth inputs used to resolve Entra context and mandatory expense headers.
export const configureExpenseApiAuth = (seed: Partial<ExpenseApiAuthSeed>): void => {
  const strictFromSeed = toFlagBool(seed.strictApiRoutes);
  const strictFromRuntime =
    typeof runtimeAuthSeed.strictApiRoutes === "boolean" ? runtimeAuthSeed.strictApiRoutes : readRuntimeStrictApiFlag();

  runtimeAuthSeed = {
    ...runtimeAuthSeed,
    token: safeText(seed.token || runtimeAuthSeed.token),
    entraOid: safeText(seed.entraOid || runtimeAuthSeed.entraOid),
    appCode: safeText(seed.appCode || runtimeAuthSeed.appCode || DEFAULT_APP_CODE),
    strictApiRoutes: strictFromSeed ?? strictFromRuntime,
  };

  cachedContext = null;
  cachedContextKey = "";
  contextPromise = null;
  cachedCurrencyResponses.clear();
  pendingCurrencyRequests.clear();
};

// Maps /api/crm/expensesheets/list item contract to list card UI model.
export const mapExpenseSheetListItemToCard = (item: ExpenseSheetListItemDto): ExpenseSheetCard => {
  return {
    hojaGastosId: safeText(item.HojaGastosId),
    description: safeText(item.Description),
    expenseSheetStatus: toNullableNumber(item.ExpenseSheetStatus),
    userId: safeText(item.UserId),
    voucher: safeText(item.Voucher),
    projId: safeText(item.ProjId),
    currencyCode: safeText(item.CurrencyCode),
    totalAmount: toNullableNumber(item.TotalAmount),
    exchRate: toNullableNumber(item.ExchRate),
    exchangeRateMode: toNullableNumber(item.ExchangeRateMode),
    createdDate: safeText(item.CreatedDate),
  };
};

// Maps /api/crm/expensesheets/{hojaGastosId} header contract to UI model.
export const mapExpenseSheetHeader = (sheet: ExpenseSheetDetailDto): ExpenseSheetHeader => {
  return {
    hojaGastosId: safeText(sheet.HojaGastosId),
    description: safeText(sheet.Description),
    userId: safeText(sheet.UserId),
    expenseSheetStatus: toNullableNumber(sheet.ExpenseSheetStatus),
    currencyCode: safeText(sheet.CurrencyCode),
    totalAmount: toNullableNumber(sheet.TotalAmount),
    exchRate: safeText(sheet.ExchRate),
    exchangeRateMode: toNullableNumber(sheet.ExchangeRateMode),
    projId: safeText(sheet.ProjId),
    voucher: safeText(sheet.Voucher),
    createdDate: safeText(sheet.CreatedDate),
  };
};

// Maps /api/crm/expensesheets/{hojaGastosId} line contract to UI model.
export const mapExpenseSheetLine = (line: ExpenseSheetLineDto): ExpenseSheetLine => {
  const typeValueCode = safeText(line.TypeValue);

  return {
    lineRecId: safeText(line.RecId),
    transDate: safeText(line.TransDate),
    typeValueCode,
    typeValue: resolveTypeLabel(typeValueCode),
    description: safeText(line.Description),
    internacional: toNullableBool(line.Internacional),
    ticket: toNullableBool(line.Ticket),
    qty: toNullableNumber(line.Qty),
    amount: toNullableNumber(line.Amount),
    projId: safeText(line.ProjId),
    indAttachFiles: safeText(line.IndAttachFiles),
  };
};

// Loads the expense sheet list from /api/crm/expensesheets/list.
export const fetchExpenseSheetList = async (
  payload: ExpenseSheetListApiRequest,
  options?: ApiFetchOptions
): Promise<IndPagedResponse<ExpenseSheetListItemDto>> => {
  const context = await ensureExpenseApiContext(options);
  try {
    const response = await fetchJson<IndPagedResponse<ExpenseSheetListItemDto>>("/api/crm/expensesheets/list", {
      ...options,
      method: "POST",
      headers: buildExpenseHeaders(context, options, true),
      body: JSON.stringify(payload),
    });

    return normalizeListPagedResponse(response);
  } catch (error) {
    if (!shouldUseLegacyFallback(error)) {
      throw error;
    }

    const legacyResponse = await fetchJson<LegacyExpenseListResponse>("/Gastos/ListExpenseSheets", {
      ...options,
      method: "POST",
      headers: {
        ...sanitizeHeaders(options?.headers),
        ...JSON_HEADERS,
      },
      body: JSON.stringify(toLegacyListRequestPayload(payload)),
    });

    const mapped = mapLegacyListResponse(
      legacyResponse,
      Number.isFinite(payload.page) && payload.page > 0 ? payload.page : 1,
      Number.isFinite(payload.pageSize) && payload.pageSize > 0 ? payload.pageSize : 50
    );
    return normalizeListPagedResponse(mapped);
  }
};

// Loads one expense sheet detail from /api/crm/expensesheets/{hojaGastosId}.
export const fetchExpenseSheetDetail = async (
  hojaGastosId: string,
  options?: ApiFetchOptions
): Promise<IndPagedResponse<ExpenseSheetDetailDto>> => {
  const context = await ensureExpenseApiContext(options);
  const safeSheetId = encodeURIComponent(String(hojaGastosId || "").trim());

  try {
    const response = await fetchJson<IndPagedResponse<ExpenseSheetDetailDto>>(`/api/crm/expensesheets/${safeSheetId}`, {
      ...options,
      method: "GET",
      headers: buildExpenseHeaders(context, options),
    });

    return normalizeDetailPagedResponse(response);
  } catch (error) {
    if (!shouldUseLegacyFallback(error)) {
      throw error;
    }

    const legacyResponse = await fetchJson<LegacyExpenseDetailResponse>(
      `/Gastos/GetExpenseSheetDetail?hojaGastosId=${safeSheetId}`,
      {
        ...options,
        method: "GET",
      }
    );

    const mapped = mapLegacyDetailResponse(legacyResponse);
    return normalizeDetailPagedResponse(mapped);
  }
};

// Reads available currencies from /api/crm/expensesheets/currencies.
export const getExpenseSheetCurrencies = async (
  options?: ApiFetchOptions
): Promise<IndPagedResponse<ExpenseSheetCurrencyDto>> => {
  let context: ExpenseApiContext | null = null;
  try {
    context = await ensureExpenseApiContext(options);
  } catch (error) {
    if (!(error instanceof ApiFetchError)) {
      throw error;
    }
  }

  const token = safeText(context?.token || resolveAuthToken(options));
  const companyId = safeText(context?.companyId || readWindowSelectedCompany()).toUpperCase();
  const cacheKey = `${token}|${companyId || "-"}`;

  if (cachedCurrencyResponses.has(cacheKey)) {
    return cachedCurrencyResponses.get(cacheKey) as IndPagedResponse<ExpenseSheetCurrencyDto>;
  }

  if (pendingCurrencyRequests.has(cacheKey)) {
    return pendingCurrencyRequests.get(cacheKey) as Promise<IndPagedResponse<ExpenseSheetCurrencyDto>>;
  }

  const requestPromise = (async () => {
    const headers = sanitizeHeaders(context ? buildExpenseHeaders(context, options, false, false) : options?.headers);
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    if (companyId) {
      headers["X-IND-Company"] = companyId;
    }

    try {
      const response = await fetchJson<IndPagedResponse<ExpenseSheetCurrencyDto>>("/api/crm/expensesheets/currencies", {
        ...options,
        method: "GET",
        headers,
      });

      const normalizedResponse = normalizeCurrencyPagedResponse(response);
      if (normalizedResponse.Success) {
        cachedCurrencyResponses.set(cacheKey, normalizedResponse);
      }

      return normalizedResponse;
    } catch (error) {
      if (!shouldUseLegacyFallback(error)) {
        throw error;
      }

      const legacyListResponse = await fetchJson<LegacyExpenseListResponse>("/Gastos/ListExpenseSheets", {
        ...options,
        method: "POST",
        headers: {
          ...sanitizeHeaders(options?.headers),
          ...JSON_HEADERS,
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
          pageSize: 200,
        }),
      });

      const seenCodes = new Set<string>();
      const sourceItems = Array.isArray(legacyListResponse.items) ? legacyListResponse.items : [];
      const fallbackItems: ExpenseSheetCurrencyDto[] = sourceItems
        .map((entry) => safeText(entry.currencyCode).toUpperCase())
        .filter((code) => !!code)
        .filter((code) => {
          if (seenCodes.has(code)) return false;
          seenCodes.add(code);
          return true;
        })
        .map((code) => ({
          CurrencyCode: code,
          CurrencyCodeISO: code,
        }));

      const fallbackResponse: IndPagedResponse<ExpenseSheetCurrencyDto> = {
        Success: legacyListResponse.success !== false,
        Message: safeText(legacyListResponse.message) || "OK",
        Total: fallbackItems.length,
        Page: 1,
        PageSize: fallbackItems.length,
        Items: fallbackItems,
        TraceId: undefined,
      };

      const normalizedFallback = normalizeCurrencyPagedResponse(fallbackResponse);
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

// Exposes the default currency resolved from Entra context for initial selections.
export const getExpenseSheetDefaultCurrencyCode = async (options?: ApiFetchOptions): Promise<string> => {
  try {
    const context = await ensureExpenseApiContext(options);
    return safeText(context.defaultCurrencyCode).toUpperCase();
  } catch {
    return "";
  }
};

// Reads exchange rate from /api/system/exchange-rate.
export const getExchangeRate = async (
  baseCurrency: string,
  targetCurrency: string,
  date?: string,
  options?: ApiFetchOptions
): Promise<IndApiResponse<ExchangeRateDto>> => {
  const token = resolveAuthToken(options);
  const normalizedBaseCurrency = safeText(baseCurrency).toUpperCase();
  const normalizedTargetCurrency = safeText(targetCurrency).toUpperCase();
  const normalizedDate = safeText(date);
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

  return fetchJson<IndApiResponse<ExchangeRateDto>>(`/api/system/exchange-rate?${query.toString()}`, {
    ...options,
    method: "GET",
    headers,
  });
};

// Creates an expense sheet using /api/crm/expensesheets.
export const createExpenseSheet = async (
  payload: ExpenseSheetCreateRequest,
  options?: ApiFetchOptions
): Promise<IndApiResponse<ExpenseSheetCreateResponseData>> => {
  const context = await ensureExpenseApiContext(options);
  const mode = payload.mode ?? 0;
  const lines = Array.isArray(payload.lines) ? payload.lines : [];

  if (payload.expenseSheetStatus !== undefined && !isNonNegativeNumber(payload.expenseSheetStatus)) {
    throw new ApiFetchError("expenseSheetStatus must be greater or equal to 0.");
  }

  if (payload.exchangeRateMode !== undefined && !isNonNegativeNumber(payload.exchangeRateMode)) {
    throw new ApiFetchError("exchangeRateMode must be greater or equal to 0.");
  }

  if (payload.exchangeRateMode !== undefined && payload.expenseSheetStatus === undefined) {
    throw new ApiFetchError("exchangeRateMode requires expenseSheetStatus.");
  }

  if (mode === 0) {
    if (!safeText(payload.description) || !safeText(payload.currencyCode) || lines.length < 1) {
      throw new ApiFetchError("Invalid create payload for mode 0.");
    }
  }

  if (mode === 1) {
    if (!safeText(payload.description) || !safeText(payload.currencyCode)) {
      throw new ApiFetchError("Invalid create payload for mode 1.");
    }

    if (lines.length > 0) {
      throw new ApiFetchError("Mode 1 requires lines to be null or empty.");
    }
  }

  if (mode === 2) {
    if (!safeText(payload.existingHojaGastosId) || lines.length < 1) {
      throw new ApiFetchError("Invalid create payload for mode 2.");
    }
  }

  const normalizedPayload: ExpenseSheetCreateRequest = {
    ...payload,
    mode,
    existingHojaGastosId: safeText(payload.existingHojaGastosId) || undefined,
    description: safeText(payload.description) || undefined,
    currencyCode: safeText(payload.currencyCode) || undefined,
    projId: safeText(payload.projId) || undefined,
    lines: mode === 1 ? [] : lines,
  };

  try {
    const response = await fetchJson<IndApiResponse<ExpenseSheetCreateResponseData>>("/api/crm/expensesheets", {
      ...options,
      method: "POST",
      headers: buildExpenseHeaders(context, options, true),
      body: JSON.stringify(normalizedPayload),
    });

    return normalizeApiResponse(response);
  } catch (error) {
    if (!shouldUseLegacyFallback(error)) {
      throw error;
    }

    const legacyResponse = await fetchJson<LegacyCommandResponse<Record<string, unknown>>>("/Gastos/CreateExpenseSheet", {
      ...options,
      method: "POST",
      headers: {
        ...sanitizeHeaders(options?.headers),
        ...JSON_HEADERS,
      },
      body: JSON.stringify(normalizedPayload),
    });

    return toMappedCreateResponse(legacyResponse);
  }
};

// Updates header fields using /api/crm/expensesheets/{hojaGastosId}.
export const updateExpenseSheetHeader = async (
  hojaGastosId: string,
  payload: ExpenseSheetHeaderUpdateRequest,
  options?: ApiFetchOptions
): Promise<IndApiResponse<{ HojaGastosId: string }>> => {
  const context = await ensureExpenseApiContext(options);
  const safeSheetId = encodeURIComponent(String(hojaGastosId || "").trim());

  if (payload.expenseSheetStatus !== undefined && !isNonNegativeNumber(payload.expenseSheetStatus)) {
    throw new ApiFetchError("expenseSheetStatus must be greater or equal to 0.");
  }

  if (payload.exchangeRateMode !== undefined && !isNonNegativeNumber(payload.exchangeRateMode)) {
    throw new ApiFetchError("exchangeRateMode must be greater or equal to 0.");
  }

  if (payload.exchangeRateMode !== undefined && payload.expenseSheetStatus === undefined) {
    throw new ApiFetchError("exchangeRateMode requires expenseSheetStatus.");
  }

  try {
    const response = await fetchJson<IndApiResponse<{ HojaGastosId: string }>>(`/api/crm/expensesheets/${safeSheetId}`, {
      ...options,
      method: "PUT",
      headers: buildExpenseHeaders(context, options, true),
      body: JSON.stringify(payload),
    });

    return normalizeApiResponse(response);
  } catch (error) {
    if (!shouldUseLegacyFallback(error)) {
      throw error;
    }

    const legacyResponse = await fetchJson<LegacyCommandResponse<Record<string, unknown>>>(
      `/Gastos/UpdateExpenseSheetHeader/${safeSheetId}`,
      {
        ...options,
        method: "PUT",
        headers: {
          ...sanitizeHeaders(options?.headers),
          ...JSON_HEADERS,
        },
        body: JSON.stringify(payload),
      }
    );

    return toMappedHeaderUpdateResponse(legacyResponse, hojaGastosId);
  }
};

// Deletes a full expense sheet using /api/crm/expensesheets/{hojaGastosId}/lines/0?deleteWholeSheet=true.
export const deleteExpenseSheet = async (
  hojaGastosId: string,
  options?: ApiFetchOptions
): Promise<IndApiResponse<null>> => {
  const context = await ensureExpenseApiContext(options);
  const safeSheetId = encodeURIComponent(String(hojaGastosId || "").trim());

  try {
    const response = await fetchJson<IndApiResponse<null>>(
      `/api/crm/expensesheets/${safeSheetId}/lines/0?deleteWholeSheet=true`,
      {
        ...options,
        method: "DELETE",
        headers: buildExpenseHeaders(context, options),
      }
    );

    return normalizeApiResponse(response);
  } catch (error) {
    if (!shouldUseLegacyFallback(error)) {
      throw error;
    }

    const legacyResponse = await fetchJson<LegacyCommandResponse<unknown>>(`/Gastos/DeleteExpenseSheet/${safeSheetId}`, {
      ...options,
      method: "DELETE",
    });

    return toMappedNullCommandResponse(legacyResponse);
  }
};

// Updates one expense line using /api/crm/expensesheets/{hojaGastosId}/lines/{lineRecId}.
export const updateExpenseSheetLine = async (
  hojaGastosId: string,
  lineRecId: string,
  payload: ExpenseSheetLineUpdateRequest,
  options?: ApiFetchOptions
): Promise<IndApiResponse<ExpenseSheetLineUpdateResponseData>> => {
  const context = await ensureExpenseApiContext(options);
  const safeSheetId = encodeURIComponent(String(hojaGastosId || "").trim());
  const safeLineId = encodeURIComponent(String(lineRecId || "").trim());

  try {
    const response = await fetchJson<IndApiResponse<ExpenseSheetLineUpdateResponseData>>(
      `/api/crm/expensesheets/${safeSheetId}/lines/${safeLineId}`,
      {
        ...options,
        method: "PUT",
        headers: buildExpenseHeaders(context, options, true),
        body: JSON.stringify(payload),
      }
    );

    return normalizeApiResponse(response);
  } catch (error) {
    if (!shouldUseLegacyFallback(error)) {
      throw error;
    }

    const legacyPayload = {
      transDate: payload.transDate,
      typeValue: payload.typeValue,
      description: payload.description,
      internacional: payload.internacional,
      ticket: payload.ticket,
      qty: payload.qty,
      amount: payload.Amount,
      projId: payload.projId,
      indAttachFiles: payload.indAttachFiles,
    };

    const legacyResponse = await fetchJson<LegacyCommandResponse<Record<string, unknown>>>(
      `/Gastos/UpdateExpenseSheetLine/${safeSheetId}/${safeLineId}`,
      {
        ...options,
        method: "PUT",
        headers: {
          ...sanitizeHeaders(options?.headers),
          ...JSON_HEADERS,
        },
        body: JSON.stringify(legacyPayload),
      }
    );

    return toMappedLineUpdateResponse(legacyResponse, hojaGastosId, lineRecId);
  }
};

// Deletes one expense line using /api/crm/expensesheets/{hojaGastosId}/lines/{lineRecId}?deleteWholeSheet=false.
export const deleteExpenseSheetLine = async (
  hojaGastosId: string,
  lineRecId: string,
  options?: ApiFetchOptions
): Promise<IndApiResponse<null>> => {
  const context = await ensureExpenseApiContext(options);
  const safeSheetId = encodeURIComponent(String(hojaGastosId || "").trim());
  const safeLineId = encodeURIComponent(String(lineRecId || "").trim());

  try {
    const response = await fetchJson<IndApiResponse<null>>(
      `/api/crm/expensesheets/${safeSheetId}/lines/${safeLineId}?deleteWholeSheet=false`,
      {
        ...options,
        method: "DELETE",
        headers: buildExpenseHeaders(context, options),
      }
    );

    return normalizeApiResponse(response);
  } catch (error) {
    if (!shouldUseLegacyFallback(error)) {
      throw error;
    }

    const legacyResponse = await fetchJson<LegacyCommandResponse<unknown>>(
      `/Gastos/DeleteExpenseSheetLine/${safeSheetId}/${safeLineId}`,
      {
        ...options,
        method: "DELETE",
      }
    );

    return toMappedNullCommandResponse(legacyResponse);
  }
};

// Searches projects for dropdown usage in filters and edit forms.
export const fetchExpenseProjects = async (
  term: string,
  page: number,
  pageSize: number,
  options?: ApiFetchOptions
): Promise<ProjectDropdownResponse> => {
  const safeTerm = encodeURIComponent(String(term || ""));
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const safePageSize = Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : 20;

  return fetchJson<ProjectDropdownResponse>(
    `/Gastos/GetProjectsForDropdown?term=${safeTerm}&page=${safePage}&pageSize=${safePageSize}`,
    {
      method: "GET",
      ...options,
    }
  );
};
