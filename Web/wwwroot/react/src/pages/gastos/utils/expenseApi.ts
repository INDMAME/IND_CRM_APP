import { ApiFetchError, fetchJson, getCsrfToken, type ApiFetchOptions } from "../../../services/apiService.ts";
import type {
  EntraContextDto,
  EntraContextRequest,
  ExchangeRateDto,
  FuelPriceKmDto,
  ExpenseSheetCurrencyDto,
  ExpenseSheetCreateRequest,
  ExpenseSheetCreateResponseData,
  ExpenseSheetDetailDto,
  ExpenseSheetDraftResponse,
  ExpenseSheetHeaderUpdateRequest,
  ExpenseSheetLineDto,
  ExpenseSheetLineUpdateRequest,
  ExpenseSheetLineUpdateResponseData,
  ExpenseSheetListApiRequest,
  ExpenseSheetListItemDto,
  ExpenseSheetTicketCreateRequest,
  ExpenseSheetTicketDetailDto,
  ExpenseSheetTicketLineRequest,
  ExpenseSheetTicketListItemDto,
  ExpenseSheetTicketListRequest,
  ExpenseSheetTicketIaRequest,
  ExpenseSheetTicketUpdateRequest,
  ExpenseSheetSubordinateDto,
  IndApiResponse,
  IndPagedResponse,
} from "../expenseTypes.ts";
import {
  isNonNegativeNumber as isNonNegativeNumberTransform,
  isPositiveNumber as isPositiveNumberTransform,
  normalizeExpenseSheetListStatusFilter as normalizeExpenseSheetListStatusFilterTransform,
  normalizeOptionalTicketGastoType as normalizeOptionalTicketGastoTypeTransform,
  normalizeOptionalTicketProcessedByAI as normalizeOptionalTicketProcessedByAITransform,
  normalizeOptionalTicketStatus as normalizeOptionalTicketStatusTransform,
  normalizeTicketListDate as normalizeTicketListDateTransform,
  normalizeTicketListGastoType as normalizeTicketListGastoTypeTransform,
  safeText as safeTextTransform,
  toFlagBool as toFlagBoolTransform,
  toNullableBool as toNullableBoolTransform,
  toNullableGastoTypeCode as toNullableGastoTypeCodeTransform,
  toNullableNumber as toNullableNumberTransform,
  toNullableTicketStatusCode as toNullableTicketStatusCodeTransform,
} from "./expenseApiTransforms.ts";
import {
  normalizeApiResponse as normalizeApiResponseTransform,
  normalizeCurrencyPagedResponse as normalizeCurrencyPagedResponseTransform,
  normalizeDetailPagedResponse as normalizeDetailPagedResponseTransform,
  normalizeListPagedResponse as normalizeListPagedResponseTransform,
  normalizeSubordinatesPagedResponse as normalizeSubordinatesPagedResponseTransform,
  normalizeTicketDetailPagedResponse as normalizeTicketDetailPagedResponseTransform,
  normalizeTicketListPagedResponse as normalizeTicketListPagedResponseTransform,
} from "./expenseApiResponseNormalizers.ts";
import {
  mapExpenseSheetHeader as mapExpenseSheetHeaderCore,
  mapExpenseSheetLine as mapExpenseSheetLineCore,
  mapExpenseSheetListItemToCard as mapExpenseSheetListItemToCardCore,
} from "./expenseApiMappers.ts";

type ProjectDropdownResponse = {
  total?: number;
  items?: Array<{ value?: string; text?: string }>;
};

type LegacyExpenseListItem = {
  hojaGastosId?: unknown;
  description?: unknown;
  estadoComentarios?: unknown;
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

type ExpenseApiContext = {
  token: string;
  companyId: string;
  axUserId: string;
  defaultCurrencyCode: string;
  allowSelfManagement: boolean;
};

type ExpenseApiAuthSeed = {
  token: string;
  entraOid: string;
  appCode: string;
  strictApiRoutes: boolean;
};

type ExpenseWindowRuntime = {
  __IND_API_TOKEN__?: string;
  __IND_ENTRA_OID__?: string;
  __IND_APP_CODE__?: string;
  __IND_SELECTED_COMPANY__?: string;
  __IND_EXPENSE_STRICT_API__?: boolean | string;
  __EXPENSE_GASTO_TYPES__?: Array<{
    value?: unknown;
    Value?: unknown;
    text?: unknown;
    Text?: unknown;
  }>;
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

const safeText = safeTextTransform;

const tryParseJsonRecord = (raw: string): Record<string, unknown> | null => {
  if (!raw || !raw.trim()) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : null;
  } catch {
    return null;
  }
};

const readApiMessage = (raw: string): string => {
  const payload = tryParseJsonRecord(raw);
  if (!payload) return "";

  const value = payload.Message ?? payload.message;
  return typeof value === "string" ? value.trim() : "";
};

const toNullableNumber = toNullableNumberTransform;
const isNonNegativeNumber = isNonNegativeNumberTransform;
const isPositiveNumber = isPositiveNumberTransform;
const toNullableTicketStatusCode = toNullableTicketStatusCodeTransform;
const toNullableGastoTypeCode = toNullableGastoTypeCodeTransform;
const normalizeOptionalTicketGastoType = normalizeOptionalTicketGastoTypeTransform;
const normalizeTicketListGastoType = normalizeTicketListGastoTypeTransform;
const normalizeOptionalTicketStatus = normalizeOptionalTicketStatusTransform;
const normalizeTicketListDate = normalizeTicketListDateTransform;
const toNullableBool = toNullableBoolTransform;
const normalizeOptionalTicketProcessedByAI = normalizeOptionalTicketProcessedByAITransform;
const normalizeExpenseSheetListStatusFilter = normalizeExpenseSheetListStatusFilterTransform;
const toFlagBool = toFlagBoolTransform;

const readExpenseWindowRuntime = (): ExpenseWindowRuntime => {
  if (typeof window === "undefined") return {};
  return window as unknown as ExpenseWindowRuntime;
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

const removeHeaderValue = (headers: Record<string, string>, key: string): void => {
  const normalizedKey = key.trim().toLowerCase();
  const toDelete = Object.keys(headers).find((headerKey) => headerKey.trim().toLowerCase() === normalizedKey);
  if (!toDelete) return;
  delete headers[toDelete];
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
  const runtimeWindow = readExpenseWindowRuntime();

  return {
    token: safeText(runtimeWindow.__IND_API_TOKEN__),
    entraOid: safeText(runtimeWindow.__IND_ENTRA_OID__),
    appCode: safeText(runtimeWindow.__IND_APP_CODE__),
    strictApiRoutes: toFlagBool(runtimeWindow.__IND_EXPENSE_STRICT_API__) === true,
  };
};

const readRuntimeStrictApiFlag = (): boolean => {
  if (typeof window === "undefined") return false;
  const runtimeWindow = readExpenseWindowRuntime();

  const explicitWindowFlag = toFlagBool(runtimeWindow.__IND_EXPENSE_STRICT_API__);
  return explicitWindowFlag === true;
};

const readWindowSelectedCompany = (): string => {
  return safeText(readExpenseWindowRuntime().__IND_SELECTED_COMPANY__).toUpperCase();
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

const buildExpenseFormHeaders = (context: ExpenseApiContext, options?: ApiFetchOptions): HeadersInit => {
  const headers = sanitizeHeaders(buildExpenseHeaders(context, options, false));
  removeHeaderValue(headers, "Content-Type");
  return headers;
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
  const selectedCompany = companies.find((item) => safeText(item.CompanyId) === companyId) || companies[0];
  const allowSelfManagement = selectedCompany?.AllowSelfManagement === true;

  if (!axUserId || !companyId) {
    throw new ApiFetchError("Could not resolve Entra company context.");
  }

  return {
    token: "",
    companyId,
    axUserId,
    defaultCurrencyCode,
    allowSelfManagement,
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
      allowSelfManagement: globalThis.__IND_ALLOW_SELF_MANAGEMENT__ === true,
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

const normalizeListPagedResponse = normalizeListPagedResponseTransform;
const normalizeDetailPagedResponse = normalizeDetailPagedResponseTransform;
const normalizeApiResponse = normalizeApiResponseTransform;
const normalizeCurrencyPagedResponse = normalizeCurrencyPagedResponseTransform;
const normalizeSubordinatesPagedResponse = normalizeSubordinatesPagedResponseTransform;
const normalizeTicketListPagedResponse = normalizeTicketListPagedResponseTransform;
const normalizeTicketDetailPagedResponse = normalizeTicketDetailPagedResponseTransform;

const looksLikeHtmlDocument = (value: unknown): boolean => {
  const raw = safeText(value).toLowerCase();
  return raw.startsWith("<!doctype html") || raw.startsWith("<html");
};

const isApiRouteUnavailable = (error: unknown): error is ApiFetchError => {
  if (!(error instanceof ApiFetchError)) return false;
  if (error.status === 404 || error.status === 405) return true;
  return error.status === undefined && looksLikeHtmlDocument(error.responseBody);
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
    billedMode: payload.billedMode ?? 2,
    fromDate: safeText(payload.createdDateFrom),
    toDate: safeText(payload.createdDateTo),
    projectId: safeText(payload.projId),
    currencyCode: safeText(payload.currencyCode),
    expenseSheetStatus: normalizeExpenseSheetListStatusFilter(payload.expenseSheetStatus),
    page: Number.isFinite(payload.page) && payload.page > 0 ? payload.page : 1,
    pageSize: Number.isFinite(payload.pageSize) && payload.pageSize > 0 ? payload.pageSize : 50,
  };
};

const mapLegacyListItemToApiListItem = (item: LegacyExpenseListItem): ExpenseSheetListItemDto => {
  return {
    HojaGastosId: safeText(item.hojaGastosId),
    Description: safeText(item.description),
    ExpenseSheetStatus: toNullableNumber(item.expenseSheetStatus),
    EstadoComentarios: safeText(item.estadoComentarios) || null,
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
export const mapExpenseSheetListItemToCard = mapExpenseSheetListItemToCardCore;

// Maps /api/crm/expensesheets/{hojaGastosId} header contract to UI model.
export const mapExpenseSheetHeader = mapExpenseSheetHeaderCore;

// Maps /api/crm/expensesheets/{hojaGastosId} line contract to UI model.
export const mapExpenseSheetLine = mapExpenseSheetLineCore;

// Loads the expense sheet list from /api/crm/expensesheets/list.
export const fetchExpenseSheetList = async (
  payload: ExpenseSheetListApiRequest,
  options?: ApiFetchOptions
): Promise<IndPagedResponse<ExpenseSheetListItemDto>> => {
  const safePayload: ExpenseSheetListApiRequest = {
    ...payload,
    expenseSheetStatus: normalizeExpenseSheetListStatusFilter(payload.expenseSheetStatus),
  };

  const context = await ensureExpenseApiContext(options);
  try {
    const response = await fetchJson<IndPagedResponse<ExpenseSheetListItemDto>>("/api/crm/expensesheets/list", {
      ...options,
      method: "POST",
      headers: buildExpenseHeaders(context, options, true),
      body: JSON.stringify(safePayload),
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
      body: JSON.stringify(toLegacyListRequestPayload(safePayload)),
    });

    const mapped = mapLegacyListResponse(
      legacyResponse,
      Number.isFinite(safePayload.page) && safePayload.page > 0 ? safePayload.page : 1,
      Number.isFinite(safePayload.pageSize) && safePayload.pageSize > 0 ? safePayload.pageSize : 50
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
  const response = await fetchJson<IndPagedResponse<ExpenseSheetDetailDto>>(`/api/crm/expensesheets/${safeSheetId}`, {
    ...options,
    method: "GET",
    headers: buildExpenseHeaders(context, options),
  });

  return normalizeDetailPagedResponse(response);
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

  const companyId = safeText(context?.companyId || readWindowSelectedCompany()).toUpperCase();
  const cacheKey = companyId || "-";

  if (cachedCurrencyResponses.has(cacheKey)) {
    return cachedCurrencyResponses.get(cacheKey) as IndPagedResponse<ExpenseSheetCurrencyDto>;
  }

  if (pendingCurrencyRequests.has(cacheKey)) {
    return pendingCurrencyRequests.get(cacheKey) as Promise<IndPagedResponse<ExpenseSheetCurrencyDto>>;
  }

  const requestPromise = (async () => {
    const headers = sanitizeHeaders(options?.headers);
    removeHeaderValue(headers, "Authorization");
    removeHeaderValue(headers, "X-IND-AxUserId");

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

// Reads available subordinates from /api/crm/expensesheets/subordinates.
export const getExpenseSheetSubordinates = async (
  options?: ApiFetchOptions
): Promise<IndPagedResponse<ExpenseSheetSubordinateDto>> => {
  const context = await ensureExpenseApiContext(options);
  const response = await fetchJson<IndPagedResponse<ExpenseSheetSubordinateDto>>("/api/crm/expensesheets/subordinates", {
    ...options,
    method: "GET",
    headers: buildExpenseHeaders(context, options),
  });

  return normalizeSubordinatesPagedResponse(response);
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

// Reads exchange rate from /api/system/exchange-rate/public-direct.
export const getExchangeRatePublicDirect = async (
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

  return fetchJson<IndApiResponse<ExchangeRateDto>>(`/api/system/exchange-rate/public-direct?${query.toString()}`, {
    ...options,
    method: "GET",
    headers,
  });
};

// Reads fuel price per km from /api/crm/expensesheets/fuel-price-km.
export const getFuelPriceKm = async (
  transDate: string,
  options?: ApiFetchOptions
): Promise<IndApiResponse<FuelPriceKmDto>> => {
  const context = await ensureExpenseApiContext(options);
  const normalizedDate = safeText(transDate);
  const query = new URLSearchParams();

  query.set("transDate", normalizedDate);

  const response = await fetchJson<IndApiResponse<FuelPriceKmDto>>(
    `/api/crm/expensesheets/fuel-price-km?${query.toString()}`,
    {
      ...options,
      method: "GET",
      headers: buildExpenseHeaders(context, options),
    }
  );

  return normalizeApiResponse(response);
};

// Creates an expense sheet using /api/crm/expensesheets.
export const createExpenseSheet = async (
  payload: ExpenseSheetCreateRequest,
  options?: ApiFetchOptions
): Promise<IndApiResponse<ExpenseSheetCreateResponseData>> => {
  const context = await ensureExpenseApiContext(options);
  const mode = payload.mode ?? 0;
  const lines = Array.isArray(payload.lines) ? payload.lines : [];
  const hasInvalidLinePayload = lines.some((line) => {
    return (
      !safeText(line.transDate) ||
      !Number.isInteger(Number(line.typeValue)) ||
      Number(line.typeValue) <= 0 ||
      !isPositiveNumber(line.qty) ||
      !isPositiveNumber(line.price)
    );
  });

  if (payload.expenseSheetStatus !== undefined && !isNonNegativeNumber(payload.expenseSheetStatus)) {
    throw new ApiFetchError("expenseSheetStatus must be greater or equal to 0.");
  }

  if (payload.exchangeRateMode !== undefined && !isNonNegativeNumber(payload.exchangeRateMode)) {
    throw new ApiFetchError("exchangeRateMode must be greater or equal to 0.");
  }

  if (payload.exchangeRateMode !== undefined && payload.expenseSheetStatus === undefined) {
    throw new ApiFetchError("exchangeRateMode requires expenseSheetStatus.");
  }

  if (hasInvalidLinePayload) {
    throw new ApiFetchError("Each line requires transDate, typeValue, qty > 0 and price > 0.");
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

  const response = await fetchJson<IndApiResponse<ExpenseSheetCreateResponseData>>("/api/crm/expensesheets", {
    ...options,
    method: "POST",
    headers: buildExpenseHeaders(context, options, true),
    body: JSON.stringify(normalizedPayload),
  });

  return normalizeApiResponse(response);
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

  const response = await fetchJson<IndApiResponse<{ HojaGastosId: string }>>(`/api/crm/expensesheets/${safeSheetId}`, {
    ...options,
    method: "PUT",
    headers: buildExpenseHeaders(context, options, true),
    body: JSON.stringify(payload),
  });

  return normalizeApiResponse(response);
};

// Deletes a full expense sheet using /api/crm/expensesheets/{hojaGastosId}/lines/0?deleteWholeSheet=true.
export const deleteExpenseSheet = async (
  hojaGastosId: string,
  options?: ApiFetchOptions
): Promise<IndApiResponse<null>> => {
  const context = await ensureExpenseApiContext(options);
  const safeSheetId = encodeURIComponent(String(hojaGastosId || "").trim());
  const response = await fetchJson<IndApiResponse<null>>(
    `/api/crm/expensesheets/${safeSheetId}/lines/0?deleteMode=2&deleteWholeSheet=true`,
    {
      ...options,
      method: "DELETE",
      headers: buildExpenseHeaders(context, options),
    }
  );

  return normalizeApiResponse(response);
};

// Updates one expense line using /api/crm/expensesheets/{hojaGastosId}/lines/{lineRecId}.
export const updateExpenseSheetLine = async (
  hojaGastosId: string,
  lineRecId: string,
  payload: ExpenseSheetLineUpdateRequest,
  options?: ApiFetchOptions
): Promise<IndApiResponse<ExpenseSheetLineUpdateResponseData>> => {
  if (
    !safeText(payload.transDate) ||
    !Number.isInteger(Number(payload.typeValue)) ||
    Number(payload.typeValue) <= 0 ||
    !isPositiveNumber(payload.qty) ||
    !isPositiveNumber(payload.price)
  ) {
    throw new ApiFetchError("transDate, typeValue, qty > 0 and price > 0 are required.");
  }

  const context = await ensureExpenseApiContext(options);
  const safeSheetId = encodeURIComponent(String(hojaGastosId || "").trim());
  const safeLineId = encodeURIComponent(String(lineRecId || "").trim());

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
  const response = await fetchJson<IndApiResponse<null>>(
    `/api/crm/expensesheets/${safeSheetId}/lines/${safeLineId}?deleteMode=0&deleteWholeSheet=false`,
    {
      ...options,
      method: "DELETE",
      headers: buildExpenseHeaders(context, options),
    }
  );

  return normalizeApiResponse(response);
};

// Extracts an expense draft from a ticket image using /api/ia/service/expensefromticket.
export const extractExpenseFromTicketDraft = async (
  ticketImage: File | Blob,
  persistTicket?: boolean,
  ticketUrlFile?: string,
  options?: ApiFetchOptions
): Promise<IndApiResponse<ExpenseSheetDraftResponse>> => {
  const context = await ensureExpenseApiContext(options);
  const form = new FormData();
  const safeTicketUrl = safeText(ticketUrlFile);

  if (ticketImage instanceof File) {
    form.append("ticketImage", ticketImage, safeText(ticketImage.name) || "ticket.jpg");
  } else {
    form.append("ticketImage", ticketImage, "ticket.jpg");
  }

  if (typeof persistTicket === "boolean") {
    form.append("persistTicket", persistTicket ? "true" : "false");
  }

  if (safeTicketUrl) {
    form.append("ticketUrlFile", safeTicketUrl);
  }

  const response = await fetchJson<IndApiResponse<ExpenseSheetDraftResponse>>("/api/ia/service/expensefromticket", {
    ...options,
    method: "POST",
    headers: buildExpenseFormHeaders(context, options),
    body: form,
  });

  return normalizeApiResponse(response);
};

// Creates a ticket header/lines using /api/crm/expensesheets/tickets.
export const createExpenseSheetTicket = async (
  payload: ExpenseSheetTicketCreateRequest,
  options?: ApiFetchOptions
): Promise<IndApiResponse<object>> => {
  const context = await ensureExpenseApiContext(options);
  const safePayload: ExpenseSheetTicketCreateRequest = {
    ...payload,
    gastoType: normalizeOptionalTicketGastoType(payload?.gastoType),
  };
  const response = await fetchJson<IndApiResponse<object>>("/api/crm/expensesheets/tickets", {
    ...options,
    method: "POST",
    headers: buildExpenseHeaders(context, options, true),
    body: JSON.stringify(safePayload),
  });

  return normalizeApiResponse(response);
};

// Loads ticket list using /api/crm/expensesheets/tickets/list.
export const fetchExpenseSheetTicketsList = async (
  payload: ExpenseSheetTicketListRequest,
  options?: ApiFetchOptions
): Promise<IndPagedResponse<ExpenseSheetTicketListItemDto>> => {
  const context = await ensureExpenseApiContext(options);
  const rawCreatedDateFrom = safeText(payload?.createdDateFrom);
  const rawCreatedDateTo = safeText(payload?.createdDateTo);
  const createdDateFrom = normalizeTicketListDate(rawCreatedDateFrom);
  const createdDateTo = normalizeTicketListDate(rawCreatedDateTo);
  if (rawCreatedDateFrom && !createdDateFrom) {
    throw new ApiFetchError("createdDateFrom must be in yyyy-MM-dd format.");
  }
  if (rawCreatedDateTo && !createdDateTo) {
    throw new ApiFetchError("createdDateTo must be in yyyy-MM-dd format.");
  }

  const preferredSearchKey = safeText(payload?.searchKey || payload?.filter);
  const legacyFilter = safeText(payload?.filter || preferredSearchKey);
  const safePayload: ExpenseSheetTicketListRequest = {
    page: Number.isFinite(payload?.page) && payload.page > 0 ? Math.floor(payload.page) : 1,
    pageSize: Number.isFinite(payload?.pageSize) && payload.pageSize > 0 ? Math.floor(payload.pageSize) : 50,
    createdDateFrom: createdDateFrom || undefined,
    createdDateTo: createdDateTo || undefined,
    searchKey: preferredSearchKey || undefined,
    filter: legacyFilter || undefined,
    status: normalizeOptionalTicketStatus(payload?.status),
    currencyCode: safeText(payload?.currencyCode).toUpperCase() || undefined,
    gastoType: normalizeTicketListGastoType(payload?.gastoType),
    processedByAI: normalizeOptionalTicketProcessedByAI(payload?.processedByAI),
  };

  const response = await fetchJson<IndPagedResponse<ExpenseSheetTicketListItemDto>>(
    "/api/crm/expensesheets/tickets/list",
    {
      ...options,
      method: "POST",
      headers: buildExpenseHeaders(context, options, true),
      body: JSON.stringify(safePayload),
    }
  );

  return normalizeTicketListPagedResponse(response);
};

// Loads one ticket detail using /api/crm/expensesheets/tickets/{fileId}.
export const fetchExpenseSheetTicket = async (
  fileId: string,
  options?: ApiFetchOptions
): Promise<IndPagedResponse<ExpenseSheetTicketDetailDto>> => {
  const context = await ensureExpenseApiContext(options);
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  const response = await fetchJson<IndPagedResponse<ExpenseSheetTicketDetailDto>>(
    `/api/crm/expensesheets/tickets/${safeFileId}`,
    {
      ...options,
      method: "GET",
      headers: buildExpenseHeaders(context, options),
    }
  );

  return normalizeTicketDetailPagedResponse(response);
};

// Downloads one ticket image preview blob through the internal proxy endpoint.
export const fetchExpenseSheetTicketPreviewBlob = async (
  urlFile: string,
  options?: ApiFetchOptions
): Promise<Blob> => {
  const safeUrlFile = safeText(urlFile);
  if (!safeUrlFile) {
    throw new ApiFetchError("Missing ticket urlFile.");
  }

  const { suppressPermissionModal: _suppressPermissionModal, ...fetchOptions } = options || {};
  const csrfToken = getCsrfToken();
  const headers: HeadersInit = {
    Accept: "image/*",
    "Content-Type": "application/json",
    ...(fetchOptions.headers || {}),
  };

  if (csrfToken) {
    (headers as Record<string, string>)["RequestVerificationToken"] = csrfToken;
  }

  const response = await fetch("/api/crm/expensesheets/tickets/preview", {
    credentials: "same-origin",
    ...fetchOptions,
    method: "POST",
    headers,
    body: JSON.stringify({ urlFile: safeUrlFile }),
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

// Updates ticket header metadata using /api/crm/expensesheets/tickets/{fileId}.
export const updateExpenseSheetTicket = async (
  fileId: string,
  payload: ExpenseSheetTicketUpdateRequest,
  options?: ApiFetchOptions
): Promise<IndApiResponse<object>> => {
  const context = await ensureExpenseApiContext(options);
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  const safePayload: ExpenseSheetTicketUpdateRequest = {
    ...payload,
    gastoType: normalizeOptionalTicketGastoType(payload?.gastoType),
  };
  const response = await fetchJson<IndApiResponse<object>>(`/api/crm/expensesheets/tickets/${safeFileId}`, {
    ...options,
    method: "PUT",
    headers: buildExpenseHeaders(context, options, true),
    body: JSON.stringify(safePayload),
  });

  return normalizeApiResponse(response);
};

// Deletes one ticket or one ticket line via query using /api/crm/expensesheets/tickets/{fileId}.
export const deleteExpenseSheetTicket = async (
  fileId: string,
  lineRecId?: number,
  options?: ApiFetchOptions
): Promise<IndApiResponse<null>> => {
  const context = await ensureExpenseApiContext(options);
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  const query = new URLSearchParams();
  if (Number.isInteger(Number(lineRecId)) && Number(lineRecId) > 0) {
    query.set("lineRecId", String(lineRecId));
  }

  const suffix = query.toString();
  const url = suffix
    ? `/api/crm/expensesheets/tickets/${safeFileId}?${suffix}`
    : `/api/crm/expensesheets/tickets/${safeFileId}`;
  const response = await fetchJson<IndApiResponse<null>>(url, {
    ...options,
    method: "DELETE",
    headers: buildExpenseHeaders(context, options),
  });

  return normalizeApiResponse(response);
};

// Applies IA payload over an existing ticket using /api/crm/expensesheets/tickets/{fileId}/ia.
export const applyExpenseSheetTicketIa = async (
  fileId: string,
  payload: ExpenseSheetTicketIaRequest,
  options?: ApiFetchOptions
): Promise<IndApiResponse<object>> => {
  const context = await ensureExpenseApiContext(options);
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  const rawPayload = (payload || {}) as ExpenseSheetTicketIaRequest;
  const safePayload: ExpenseSheetTicketIaRequest = {
    ...rawPayload,
  };
  const gastoType = normalizeOptionalTicketGastoType(rawPayload.gastoType);
  if (gastoType === undefined) {
    delete safePayload.gastoType;
  } else {
    safePayload.gastoType = gastoType;
  }

  const response = await fetchJson<IndApiResponse<object>>(`/api/crm/expensesheets/tickets/${safeFileId}/ia`, {
    ...options,
    method: "POST",
    headers: buildExpenseHeaders(context, options, true),
    body: JSON.stringify(safePayload),
  });

  return normalizeApiResponse(response);
};

// Creates one ticket line using /api/crm/expensesheets/tickets/{fileId}/lines.
export const createExpenseSheetTicketLine = async (
  fileId: string,
  payload: ExpenseSheetTicketLineRequest,
  options?: ApiFetchOptions
): Promise<IndApiResponse<object>> => {
  if (!safeText(payload?.description) || !isPositiveNumber(payload?.qty) || !isPositiveNumber(payload?.price)) {
    throw new ApiFetchError("description, qty > 0 and price > 0 are required.");
  }

  const context = await ensureExpenseApiContext(options);
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  const response = await fetchJson<IndApiResponse<object>>(`/api/crm/expensesheets/tickets/${safeFileId}/lines`, {
    ...options,
    method: "POST",
    headers: buildExpenseHeaders(context, options, true),
    body: JSON.stringify(payload),
  });

  return normalizeApiResponse(response);
};

// Updates one ticket line using /api/crm/expensesheets/tickets/{fileId}/lines/{lineRecId}.
export const updateExpenseSheetTicketLine = async (
  fileId: string,
  lineRecId: string | number,
  payload: ExpenseSheetTicketLineRequest,
  options?: ApiFetchOptions
): Promise<IndApiResponse<object>> => {
  if (!safeText(payload?.description) || !isPositiveNumber(payload?.qty) || !isPositiveNumber(payload?.price)) {
    throw new ApiFetchError("description, qty > 0 and price > 0 are required.");
  }

  const context = await ensureExpenseApiContext(options);
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  const safeLineId = encodeURIComponent(String(lineRecId || "").trim());
  const response = await fetchJson<IndApiResponse<object>>(
    `/api/crm/expensesheets/tickets/${safeFileId}/lines/${safeLineId}`,
    {
      ...options,
      method: "PUT",
      headers: buildExpenseHeaders(context, options, true),
      body: JSON.stringify(payload),
    }
  );

  return normalizeApiResponse(response);
};

// Deletes one ticket line using /api/crm/expensesheets/tickets/{fileId}/lines/{lineRecId}.
export const deleteExpenseSheetTicketLine = async (
  fileId: string,
  lineRecId: string | number,
  options?: ApiFetchOptions
): Promise<IndApiResponse<null>> => {
  const context = await ensureExpenseApiContext(options);
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  const safeLineId = encodeURIComponent(String(lineRecId || "").trim());
  const response = await fetchJson<IndApiResponse<null>>(
    `/api/crm/expensesheets/tickets/${safeFileId}/lines/${safeLineId}`,
    {
      ...options,
      method: "DELETE",
      headers: buildExpenseHeaders(context, options),
    }
  );

  return normalizeApiResponse(response);
};

// Uploads/replaces ticket file content using /api/crm/expensesheets/tickets/{fileId}/file.
export const uploadExpenseSheetTicketFile = async (
  fileId: string,
  file: File | Blob,
  extension?: string,
  options?: ApiFetchOptions
): Promise<IndApiResponse<object>> => {
  const context = await ensureExpenseApiContext(options);
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  const safeExtension = safeText(extension).replace(/^\./, "");
  const query = new URLSearchParams();
  if (safeExtension) {
    query.set("extension", safeExtension);
  }

  const suffix = query.toString();
  const url = suffix
    ? `/api/crm/expensesheets/tickets/${safeFileId}/file?${suffix}`
    : `/api/crm/expensesheets/tickets/${safeFileId}/file`;
  const form = new FormData();
  if (file instanceof File) {
    form.append("file", file, safeText(file.name) || `ticket.${safeExtension || "jpg"}`);
  } else {
    form.append("file", file, `ticket.${safeExtension || "jpg"}`);
  }

  const response = await fetchJson<IndApiResponse<object>>(url, {
    ...options,
    method: "POST",
    headers: buildExpenseFormHeaders(context, options),
    body: form,
  });

  return normalizeApiResponse(response);
};

// Deletes ticket file content using /api/crm/expensesheets/tickets/{fileId}/file.
export const deleteExpenseSheetTicketFile = async (
  fileId: string,
  options?: ApiFetchOptions
): Promise<IndApiResponse<null>> => {
  const context = await ensureExpenseApiContext(options);
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  const response = await fetchJson<IndApiResponse<null>>(`/api/crm/expensesheets/tickets/${safeFileId}/file`, {
    ...options,
    method: "DELETE",
    headers: buildExpenseHeaders(context, options),
  });

  return normalizeApiResponse(response);
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
