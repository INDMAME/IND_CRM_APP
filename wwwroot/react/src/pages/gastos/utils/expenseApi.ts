import {
  ApiFetchError,
  fetchJson,
  getCsrfToken,
  handleApiAuthFailure,
  readApiMessageFromRaw,
  type ApiFetchOptions,
} from "../../../services/apiService.ts";
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
  ExpenseSheetLineTicketRequest,
  ExpenseSheetLineTicketResultDto,
  ExpenseSheetLineUpdateRequest,
  ExpenseSheetLineUpdateResponseData,
  ExpenseSheetListApiRequest,
  ExpenseSheetListItemDto,
  ExpenseSheetListResponseEnvelope,
  ExpenseSheetsAskRequest,
  ExpenseSheetsAskResponseData,
  ExpenseSheetsAskResult,
  ExpenseSheetTicketCreateRequest,
  ExpenseSheetTicketDetailDto,
  ExpenseSheetTicketLinkBulkRequest,
  ExpenseSheetTicketLinkBulkResultDto,
  ExpenseSheetTicketLinkListItemDto,
  ExpenseSheetTicketLinkListRequest,
  ExpenseSheetTicketQuickCreateRequest,
  ExpenseSheetTicketQuickCreateResult,
  ExpenseSheetTicketLineRequest,
  ExpenseSheetTicketListItemDto,
  ExpenseSheetTicketListRequest,
  ExpenseSheetTicketIaRequest,
  ExpenseSheetTicketUpdateRequest,
  ExpenseSheetTicketTotalAdjustmentRequest,
  ExpenseSheetTicketTotalAdjustmentResultDto,
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
  normalizeOptionalApiDate as normalizeOptionalApiDateTransform,
  normalizeRequiredApiDate as normalizeRequiredApiDateTransform,
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
  normalizeTicketLinkBulkResponse as normalizeTicketLinkBulkResponseTransform,
  normalizeTicketLinkListPagedResponse as normalizeTicketLinkListPagedResponseTransform,
  normalizeTicketDetailPagedResponse as normalizeTicketDetailPagedResponseTransform,
  normalizeTicketQuickCreateResponse as normalizeTicketQuickCreateResponseTransform,
  normalizeTicketListPagedResponse as normalizeTicketListPagedResponseTransform,
} from "./expenseApiResponseNormalizers.ts";
import {
  mapExpenseSheetHeader as mapExpenseSheetHeaderCore,
  mapExpenseSheetLine as mapExpenseSheetLineCore,
  mapExpenseSheetListItemToCard as mapExpenseSheetListItemToCardCore,
} from "./expenseApiMappers.ts";
import { normalizeDescriptionText, sanitizeAssistantText } from "./expenseUiUtils.ts";
import { EXPENSE_API_DATE_FORMAT_MESSAGE } from "./expenseApiDateUtils.ts";
import { isValidTicketLineAmount } from "./expenseTicketLineAmount.ts";
import { getExpenseActingUserOverride } from "./expenseActingUser.ts";
import { toExpenseGastoTypeCode } from "../constants/expenseGastoTypeCatalog.ts";
import { resolveEffectiveCompanyId } from "../../../utils/companySelection.ts";
import { indT } from "../../../utils/indI18n.ts";
import {
  toExpenseSheetLineReimbursableExpense,
  toExpenseSheetReimbursableExpense,
} from "./expenseSheetTotals.ts";

type ProjectDropdownOption = {
  value?: string;
  Value?: string;
  text?: string;
  Text?: string;
  projId?: string;
  ProjId?: string;
  name?: string;
  Name?: string;
  description?: string;
  Description?: string;
};

type ProjectDropdownResponse = {
  total?: number;
  Total?: number;
  items?: ProjectDropdownOption[];
  Items?: ProjectDropdownOption[];
};

type LegacyExpenseListItem = {
  hojaGastosId?: unknown;
  description?: unknown;
  estadoComentarios?: unknown;
  voucher?: unknown;
  projId?: unknown;
  currencyCode?: unknown;
  totalAmount?: unknown;
  totalAmountCurrency?: unknown;
  totalAmountMST?: unknown;
  totalGrossAmountMST?: unknown;
  totalReimbursableAmount?: unknown;
  exchRate?: unknown;
  userId?: unknown;
  userName?: unknown;
  ownerAxUserId?: unknown;
  ownerName?: unknown;
  exchangeRateMode?: unknown;
  reimbursableExpense?: unknown;
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
  userName: string;
  crmUserId: string;
  defaultCurrencyCode: string;
  allowSelfManagement: boolean;
};

export type ExpenseApiContextSnapshot = {
  companyId: string;
  axUserId: string;
  userName: string;
  crmUserId: string;
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

const toNullableNumber = toNullableNumberTransform;
const isNonNegativeNumber = isNonNegativeNumberTransform;
const isPositiveNumber = isPositiveNumberTransform;

type ExpenseLineCurrencyPayload = {
  currencyCode?: string | null;
  amountMST?: number | null;
  exchRate?: number | null;
  qty?: number | null;
  price?: number | null;
};

const normalizeCurrencyCode = (value: unknown): string => safeText(value).trim().toUpperCase();

// Validates the AX line-currency contract before sending a line payload.
const hasMissingForeignLineSettlement = (line: ExpenseLineCurrencyPayload, localCurrencyCode: string): boolean => {
  const lineCurrencyCode = normalizeCurrencyCode(line.currencyCode);
  const normalizedLocalCurrencyCode = normalizeCurrencyCode(localCurrencyCode);
  if (!lineCurrencyCode || !normalizedLocalCurrencyCode || lineCurrencyCode === normalizedLocalCurrencyCode) {
    return false;
  }

  const amount = Number(line.qty ?? 0) * Number(line.price ?? 0);
  const exchangeRate = toNullableNumber(line.exchRate);
  const amountMST = toNullableNumber(line.amountMST);
  return amount > 0 && !(exchangeRate != null && exchangeRate > 0) && !(amountMST != null && amountMST > 0);
};

const buildForeignLineSettlementError = (): ApiFetchError =>
  new ApiFetchError(
    indT(
      "ExpenseSheets_Line_Validation_ForeignCurrencyGrossAmount",
      "Foreign currency lines require an exchange rate greater than 0 or a gross amount in company currency."
    )
  );
const toNullableTicketStatusCode = toNullableTicketStatusCodeTransform;
const toNullableGastoTypeCode = toNullableGastoTypeCodeTransform;
const normalizeOptionalTicketGastoType = normalizeOptionalTicketGastoTypeTransform;
const normalizeTicketListGastoType = normalizeTicketListGastoTypeTransform;
const normalizeOptionalTicketStatus = normalizeOptionalTicketStatusTransform;
const normalizeOptionalApiDate = normalizeOptionalApiDateTransform;
const normalizeRequiredApiDate = normalizeRequiredApiDateTransform;
const normalizeTicketListDate = normalizeTicketListDateTransform;
const toNullableBool = toNullableBoolTransform;
const normalizeOptionalTicketProcessedByAI = normalizeOptionalTicketProcessedByAITransform;
const normalizeExpenseSheetListStatusFilter = normalizeExpenseSheetListStatusFilterTransform;
const toFlagBool = toFlagBoolTransform;

const normalizeExpenseSheetReimbursable = toExpenseSheetReimbursableExpense;

// Rejects invalid line enum values instead of forwarding the header-only Both value.
const normalizeExpenseSheetLineReimbursable = (value: unknown) => {
  const normalized = toExpenseSheetLineReimbursableExpense(value);
  if (value !== null && value !== undefined && value !== "" && normalized === null) {
    throw new ApiFetchError(indT("Api_RequestFailed", "Request failed."));
  }

  return normalized;
};

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

const normalizeAxUserIdHeader = (value: unknown): string => {
  const normalized = safeText(value);
  if (!normalized) return "";
  if (/^-\d+$/.test(normalized)) {
    return normalized;
  }

  const labelSeparator = normalized.indexOf(" - ");
  if (labelSeparator > 0) {
    return safeText(normalized.slice(0, labelSeparator));
  }

  return normalized;
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

const tryParseJson = (raw: string): unknown | null => {
  if (!raw || !raw.trim()) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const cloneJsonCompatibleValue = <T>(value: T): T => {
  if (value === undefined || value === null) {
    return value;
  }

  return JSON.parse(JSON.stringify(value)) as T;
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

// Creates one standard abort error without cancelling the shared underlying request.
const createExpenseAbortError = (): DOMException => {
  return new DOMException("Aborted", "AbortError");
};

// Lets one caller stop waiting on shared context resolution without aborting other consumers.
const waitForAbortableExpenseResult = async <T>(promise: Promise<T>, signal?: AbortSignal): Promise<T> => {
  if (!signal) return promise;
  if (signal.aborted) {
    throw createExpenseAbortError();
  }

  return await new Promise<T>((resolve, reject) => {
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

  if (includeAxUserId) {
    const requestAxUserId = getHeaderValue(options?.headers, "X-IND-AxUserId");
    const overrideAxUserId = getExpenseActingUserOverride();
    const resolvedAxUserId = safeText(requestAxUserId || overrideAxUserId || context.axUserId);
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

type RawEntraContextCompany = {
  CompanyId?: unknown;
  companyId?: unknown;
  IsDefault?: unknown;
  isDefault?: unknown;
  AllowSelfManagement?: unknown;
  allowSelfManagement?: unknown;
  CrmUserId?: unknown;
  crmUserId?: unknown;
  CurrencyCode?: unknown;
  currencyCode?: unknown;
};

type NormalizedEntraContextCompany = {
  companyId: string;
  isDefault: boolean;
  allowSelfManagement: boolean;
  crmUserId: string;
  currencyCode: string;
};

type RawEntraContextHeader = {
  AxUserId?: unknown;
  axUserId?: unknown;
  UserName?: unknown;
  userName?: unknown;
  DefaultCompany?: unknown;
  defaultCompany?: unknown;
  DefaultCurrencyCode?: unknown;
  defaultCurrencyCode?: unknown;
};

type RawEntraContextItem = {
  Header?: RawEntraContextHeader;
  header?: RawEntraContextHeader;
  Companies?: unknown;
  companies?: unknown;
};

// Maps one Entra company item to the frontend-safe shape used by context consumers.
const mapEntraContextCompany = (item: unknown): NormalizedEntraContextCompany | null => {
  if (!item || typeof item !== "object") return null;

  const raw = item as RawEntraContextCompany;
  const companyId = safeText(raw.CompanyId ?? raw.companyId);
  if (!companyId) return null;

  return {
    companyId,
    isDefault: toFlagBool(raw.IsDefault ?? raw.isDefault) === true,
    allowSelfManagement: toFlagBool(raw.AllowSelfManagement ?? raw.allowSelfManagement) === true,
    crmUserId: safeText(raw.CrmUserId ?? raw.crmUserId),
    currencyCode: safeText(raw.CurrencyCode ?? raw.currencyCode).toUpperCase(),
  };
};

const validateContextResponse = (response: IndPagedResponse<EntraContextDto>): ExpenseApiContext => {
  const rawResponse = response as {
    Success?: unknown;
    success?: unknown;
    Message?: unknown;
    message?: unknown;
    Items?: unknown;
    items?: unknown;
  };

  const isSuccess = toFlagBool(rawResponse.Success ?? rawResponse.success);
  if (isSuccess === false) {
    throw new ApiFetchError(safeText(rawResponse.Message ?? rawResponse.message) || "Could not load Entra context.");
  }

  const items = Array.isArray(rawResponse.Items)
    ? rawResponse.Items
    : (Array.isArray(rawResponse.items) ? rawResponse.items : []);
  const first = items[0] as RawEntraContextItem | undefined;
  const header = first?.Header ?? first?.header;
  if (!first || !header) {
    throw new ApiFetchError("Could not load Entra context.");
  }

  const axUserId = safeText(header.AxUserId ?? header.axUserId);
  const userName = safeText(header.UserName ?? header.userName);
  const defaultCompany = safeText(header.DefaultCompany ?? header.defaultCompany);
  const headerDefaultCurrencyCode = safeText(header.DefaultCurrencyCode ?? header.defaultCurrencyCode).toUpperCase();
  const companiesRaw = Array.isArray(first.Companies)
    ? first.Companies
    : (Array.isArray(first.companies) ? first.companies : []);
  const companies = companiesRaw
    .map((item) => mapEntraContextCompany(item))
    .filter((item): item is NormalizedEntraContextCompany => !!item);
  const selectedCompanyId = readWindowSelectedCompany();
  const selectedCompanyMatch = selectedCompanyId
    ? companies.find((item) => safeText(item.companyId).toUpperCase() === selectedCompanyId)
    : null;

  // Never fall back to a different company when the user selected one explicitly.
  if (selectedCompanyId && !selectedCompanyMatch) {
    throw new ApiFetchError(
      indT(
        "Expense_Context_SelectedCompanyUnavailable",
        "The selected company is no longer available. Please choose it again from the main menu."
      )
    );
  }

  const fallbackCompany = safeText(companies.find((item) => item.isDefault)?.companyId);
  const companyId =
    selectedCompanyMatch?.companyId || resolveEffectiveCompanyId("", companies, defaultCompany || fallbackCompany);
  const selectedCompany =
    selectedCompanyMatch || companies.find((item) => safeText(item.companyId) === companyId) || companies[0];
  const allowSelfManagement = selectedCompany?.allowSelfManagement === true;
  const crmUserId = safeText(selectedCompany?.crmUserId);
  const defaultCurrencyCode = safeText(selectedCompany?.currencyCode) || headerDefaultCurrencyCode;

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
    allowSelfManagement,
  };
};

const ensureExpenseApiContext = async (options?: ApiFetchOptions): Promise<ExpenseApiContext> => {
  const seed = resolveAuthSeed(options);
  const contextKey = buildContextKey(seed);
  const { signal, ...baseOptions } = options || {};

  if (cachedContext && cachedContextKey === contextKey) {
    return waitForAbortableExpenseResult(Promise.resolve(cachedContext), signal);
  }

  if (!contextPromise || cachedContextKey !== contextKey) {
    cachedContextKey = contextKey;
    const sharedContextPromise = (async () => {
      const contextPayload: EntraContextRequest = {
        appCode: seed.appCode,
      };

      if (safeText(seed.entraOid)) {
        contextPayload.entraOid = seed.entraOid;
      }

      const contextResponse = await fetchJson<IndPagedResponse<EntraContextDto>>("/api/auth/entra/context", {
        ...baseOptions,
        method: "POST",
        headers: buildContextHeaders(seed.token, baseOptions),
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

    contextPromise = sharedContextPromise;
    void sharedContextPromise.finally(() => {
      if (contextPromise === sharedContextPromise) {
        contextPromise = null;
      }
    });
  }

  return await waitForAbortableExpenseResult(contextPromise, signal);
};

// Exposes resolved Entra context values needed by Gastos UI management state.
export const getExpenseApiContextSnapshot = async (options?: ApiFetchOptions): Promise<ExpenseApiContextSnapshot> => {
  const context = await ensureExpenseApiContext(options);
  return {
    companyId: safeText(context.companyId).toUpperCase(),
    axUserId: safeText(context.axUserId),
    userName: safeText(context.userName),
    crmUserId: safeText(context.crmUserId),
    allowSelfManagement: context.allowSelfManagement === true,
  };
};

const normalizeListPagedResponse = normalizeListPagedResponseTransform;
const normalizeDetailPagedResponse = normalizeDetailPagedResponseTransform;
const normalizeApiResponse = normalizeApiResponseTransform;
const normalizeTicketQuickCreateResponse = normalizeTicketQuickCreateResponseTransform;
const normalizeCurrencyPagedResponse = normalizeCurrencyPagedResponseTransform;
const normalizeSubordinatesPagedResponse = normalizeSubordinatesPagedResponseTransform;
const normalizeTicketListPagedResponse = normalizeTicketListPagedResponseTransform;
const normalizeTicketLinkListPagedResponse = normalizeTicketLinkListPagedResponseTransform;
const normalizeTicketDetailPagedResponse = normalizeTicketDetailPagedResponseTransform;
const normalizeTicketLinkBulkResponse = normalizeTicketLinkBulkResponseTransform;

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
    reimbursableExpense: normalizeExpenseSheetReimbursable(payload.reimbursableExpense),
    includeSubordinates: payload.includeSubordinates === true,
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
    UserName: safeText(item.userName) || null,
    OwnerAxUserId: safeText(item.ownerAxUserId) || null,
    OwnerName: safeText(item.ownerName) || null,
    Voucher: safeText(item.voucher),
    ProjId: safeText(item.projId),
    CurrencyCode: safeText(item.currencyCode),
    TotalAmount: toNullableNumber(item.totalAmountCurrency ?? item.totalAmount),
    TotalAmountCurrency: toNullableNumber(item.totalAmountCurrency ?? item.totalAmount),
    TotalAmountMST: toNullableNumber(item.totalAmountMST),
    TotalGrossAmountMST: toNullableNumber(item.totalGrossAmountMST),
    TotalReimbursableAmount: toNullableNumber(item.totalReimbursableAmount),
    ExchRate: toNullableNumber(item.exchRate),
    ExchangeRateMode: toNullableNumber(item.exchangeRateMode),
    ReimbursableExpense: normalizeExpenseSheetReimbursable(item.reimbursableExpense),
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

export type ExpenseSheetListFetchCapture = {
  request: ExpenseSheetListApiRequest;
  response: ExpenseSheetListResponseEnvelope;
  axUserIdOverride: string | null;
  source: "api" | "legacy";
};

export type ExpenseSheetListFetchOptions = ApiFetchOptions & {
  axUserIdOverride?: string;
  onRequestPrepared?: (request: ExpenseSheetListApiRequest) => void;
  onCapture?: (capture: ExpenseSheetListFetchCapture) => void;
};

export type ExpenseTicketListFetchOptions = ApiFetchOptions & {
  axUserIdOverride?: string;
};

export type ExpenseSheetListSourceJsonOptions = ApiFetchOptions & {
  axUserIdOverride?: string;
  seedResponse?: ExpenseSheetListResponseEnvelope | null;
};

const buildTicketListHeaders = (
  context: ExpenseApiContext,
  options: ApiFetchOptions | undefined,
  axUserIdOverride: string | undefined
): Record<string, string> => {
  const headers = sanitizeHeaders(buildExpenseHeaders(context, options, true, false));
  const normalizedOverrideAxUserId = normalizeAxUserIdHeader(axUserIdOverride);
  const resolvedAxUserId = safeText(normalizedOverrideAxUserId || context.axUserId);
  if (resolvedAxUserId) {
    headers["X-IND-AxUserId"] = resolvedAxUserId;
  } else {
    removeHeaderValue(headers, "X-IND-AxUserId");
  }
  return headers;
};

// Loads the expense sheet list from /api/crm/expensesheets/list.
export const fetchExpenseSheetList = async (
  payload: ExpenseSheetListApiRequest,
  options?: ExpenseSheetListFetchOptions
): Promise<IndPagedResponse<ExpenseSheetListItemDto>> => {
  const { axUserIdOverride, onRequestPrepared, onCapture, ...baseOptions } = options || {};
  const rawCreatedDateFrom = safeText(payload?.createdDateFrom);
  const rawCreatedDateTo = safeText(payload?.createdDateTo);
  const createdDateFrom = normalizeOptionalApiDate(rawCreatedDateFrom);
  const createdDateTo = normalizeOptionalApiDate(rawCreatedDateTo);

  if (rawCreatedDateFrom && !createdDateFrom) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }
  if (rawCreatedDateTo && !createdDateTo) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }

  const safePayload: ExpenseSheetListApiRequest = {
    ...payload,
    createdDateFrom,
    createdDateTo,
    expenseSheetStatus: normalizeExpenseSheetListStatusFilter(payload.expenseSheetStatus),
    reimbursableExpense: normalizeExpenseSheetReimbursable(payload.reimbursableExpense),
    includeSubordinates: payload.includeSubordinates === true,
  };
  const serializedPayload = cloneJsonCompatibleValue(safePayload);

  onRequestPrepared?.(serializedPayload);

  const context = await ensureExpenseApiContext(baseOptions);
  const listHeaders = sanitizeHeaders(buildExpenseHeaders(context, baseOptions, true, false));
  const normalizedOverrideAxUserId = normalizeAxUserIdHeader(axUserIdOverride);
  const resolvedAxUserId = safeText(normalizedOverrideAxUserId || context.axUserId);
  if (resolvedAxUserId) {
    listHeaders["X-IND-AxUserId"] = resolvedAxUserId;
  } else {
    removeHeaderValue(listHeaders, "X-IND-AxUserId");
  }

  try {
    const response = await fetchJson<IndPagedResponse<ExpenseSheetListItemDto>>("/api/crm/expensesheets/list", {
      ...baseOptions,
      method: "POST",
      headers: listHeaders,
      body: JSON.stringify(safePayload),
    });

    onCapture?.({
      request: serializedPayload,
      response: cloneJsonCompatibleValue(response),
      axUserIdOverride: normalizedOverrideAxUserId || null,
      source: "api",
    });

    return normalizeListPagedResponse(response);
  } catch (error) {
    if (!shouldUseLegacyFallback(error)) {
      throw error;
    }

    const legacyResponse = await fetchJson<LegacyExpenseListResponse>("/Gastos/ListExpenseSheets", {
      ...baseOptions,
      method: "POST",
      headers: {
        ...sanitizeHeaders(baseOptions?.headers),
        ...JSON_HEADERS,
      },
      body: JSON.stringify(toLegacyListRequestPayload(safePayload)),
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
      source: "legacy",
    });

    return normalizeListPagedResponse(mapped);
  }
};

const normalizePositiveInteger = (value: unknown, fallbackValue: number): number => {
  const parsedValue = Number(value);
  if (Number.isFinite(parsedValue) && parsedValue > 0) {
    return Math.floor(parsedValue);
  }

  return fallbackValue;
};

// Rebuilds one full list envelope for the assistant by loading every page of the active query.
export const fetchExpenseSheetListSourceJson = async (
  payload: ExpenseSheetListApiRequest,
  options?: ExpenseSheetListSourceJsonOptions
): Promise<ExpenseSheetListResponseEnvelope> => {
  const { seedResponse, ...baseOptions } = options || {};
  const fallbackPage = normalizePositiveInteger(payload?.page, 1);
  const fallbackPageSize = normalizePositiveInteger(payload?.pageSize, 50);
  const normalizedSeedResponse = seedResponse ? normalizeListPagedResponse(cloneJsonCompatibleValue(seedResponse)) : null;
  const initialResponse = normalizedSeedResponse ?? (await fetchExpenseSheetList(payload, baseOptions));
  const normalizedInitialResponse = normalizeListPagedResponse(cloneJsonCompatibleValue(initialResponse));

  if (normalizedInitialResponse.Success === false) {
    throw new ApiFetchError(
      safeText(normalizedInitialResponse.Message) || "Could not load the full expense sheet query."
    );
  }

  const totalRecordsRaw = Number(normalizedInitialResponse.Total);
  const totalRecords =
    Number.isFinite(totalRecordsRaw) && totalRecordsRaw >= 0
      ? Math.floor(totalRecordsRaw)
      : normalizedInitialResponse.Items.length;
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
      Items: cloneJsonCompatibleValue(normalizedInitialResponse.Items),
    };
  }

  const itemsByPage = new Map<number, ExpenseSheetListItemDto[]>();
  itemsByPage.set(currentPage, cloneJsonCompatibleValue(normalizedInitialResponse.Items));

  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
    if (pageNumber === currentPage) {
      continue;
    }

    const pageResponse = await fetchExpenseSheetList(
      {
        ...payload,
        page: pageNumber,
        pageSize: effectivePageSize,
      },
      baseOptions
    );

    if (pageResponse.Success === false) {
      throw new ApiFetchError(
        safeText(pageResponse.Message) || `Could not load expense sheet page ${pageNumber}.`
      );
    }

    itemsByPage.set(pageNumber, cloneJsonCompatibleValue(pageResponse.Items));
  }

  const allItems: ExpenseSheetListItemDto[] = [];
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
    Items: allItems,
  };
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
  // Subordinates must always resolve from the logged context user, not from acting-user overrides.
  const headers = sanitizeHeaders(buildExpenseHeaders(context, options, false, false));
  const contextAxUserId = safeText(context.axUserId);
  if (contextAxUserId) {
    headers["X-IND-AxUserId"] = contextAxUserId;
  }

  const response = await fetchJson<IndPagedResponse<unknown>>("/api/crm/expensesheets/subordinates", {
    ...options,
    method: "GET",
    headers,
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
  const normalizedDate = normalizeRequiredApiDate(transDate);
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
  const localCurrencyCode = normalizeCurrencyCode(context.defaultCurrencyCode);
  const normalizedLines = lines.map((line) => ({
    ...line,
    transDate: normalizeRequiredApiDate(line.transDate),
    typeValue: toExpenseGastoTypeCode(line.typeValue, { allowNone: false }) ?? line.typeValue,
    description: normalizeDescriptionText(line.description, ""),
    reimbursableExpense: normalizeExpenseSheetLineReimbursable(line.reimbursableExpense),
    currencyCode: safeText(line.currencyCode).toUpperCase() || undefined,
    amountMST: toNullableNumber(line.amountMST),
    exchRate: toNullableNumber(line.exchRate),
  }));
  const hasInvalidLinePayload = normalizedLines.some((line) => {
    return (
      !safeText(line.transDate) ||
      toExpenseGastoTypeCode(line.typeValue, { allowNone: false }) === null ||
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

  if (normalizedLines.some((line) => hasMissingForeignLineSettlement(line, localCurrencyCode))) {
    throw buildForeignLineSettlementError();
  }

  if (mode === 0) {
    if (!safeText(payload.description) || lines.length < 1) {
      throw new ApiFetchError("Invalid create payload for mode 0.");
    }
  }

  if (mode === 1) {
    if (!safeText(payload.description)) {
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
    description:
      payload.description === undefined ? undefined : normalizeDescriptionText(payload.description, "") || undefined,
    currencyCode: normalizeCurrencyCode(payload.currencyCode) || undefined,
    exchRate: toNullableNumber(payload.exchRate) ?? undefined,
    projId: safeText(payload.projId) || undefined,
    reimbursableExpense: normalizeExpenseSheetReimbursable(payload.reimbursableExpense),
    lines: mode === 1 ? [] : normalizedLines,
  };
  const includeAxUserOverride = mode === 2;

  const response = await fetchJson<IndApiResponse<ExpenseSheetCreateResponseData>>("/api/crm/expensesheets", {
    ...options,
    method: "POST",
    // Header create flows must always run in the signed-in user context.
    headers: buildExpenseHeaders(context, options, true, includeAxUserOverride),
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

  const safePayload: ExpenseSheetHeaderUpdateRequest = {
    ...payload,
    description: normalizeDescriptionText(payload.description, ""),
    currencyCode: normalizeCurrencyCode(payload.currencyCode) || undefined,
    exchRate: toNullableNumber(payload.exchRate) ?? undefined,
    reimbursableExpense: normalizeExpenseSheetReimbursable(payload.reimbursableExpense),
  };

  const response = await fetchJson<IndApiResponse<{ HojaGastosId: string }>>(`/api/crm/expensesheets/${safeSheetId}`, {
    ...options,
    method: "PUT",
    headers: buildExpenseHeaders(context, options, true),
    body: JSON.stringify(safePayload),
  });

  return normalizeApiResponse(response);
};

// Propagates the current non-mixed header value through the dedicated server endpoint.
export const propagateExpenseSheetReimbursableExpense = async (
  hojaGastosId: string,
  options?: ApiFetchOptions
): Promise<IndApiResponse<null>> => {
  const context = await ensureExpenseApiContext(options);
  const safeSheetId = encodeURIComponent(String(hojaGastosId || "").trim());
  if (!safeSheetId) {
    throw new ApiFetchError(indT("Api_RequestFailed", "Request failed."));
  }

  const response = await fetchJson<IndApiResponse<null>>(
    `/api/crm/expensesheets/${safeSheetId}/reimbursable-expense/propagate`,
    {
      ...options,
      method: "POST",
      headers: buildExpenseHeaders(context, options, true),
      body: "{}",
    }
  );

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
  const normalizedTransDate = normalizeRequiredApiDate(payload.transDate);
  const context = await ensureExpenseApiContext(options);
  const localCurrencyCode = normalizeCurrencyCode(context.defaultCurrencyCode);
  const normalizedTypeValue = toExpenseGastoTypeCode(payload.typeValue, { allowNone: false });
  const normalizedPayload: ExpenseSheetLineUpdateRequest = {
    ...payload,
    transDate: normalizedTransDate,
    typeValue: normalizedTypeValue ?? payload.typeValue,
    description: normalizeDescriptionText(payload.description, ""),
    reimbursableExpense: normalizeExpenseSheetLineReimbursable(payload.reimbursableExpense),
    currencyCode: normalizeCurrencyCode(payload.currencyCode) || undefined,
    amountMST: toNullableNumber(payload.amountMST),
    exchRate: toNullableNumber(payload.exchRate),
  };
  if (
    normalizedTypeValue === null ||
    !isPositiveNumber(normalizedPayload.qty) ||
    !isPositiveNumber(normalizedPayload.price)
  ) {
    throw new ApiFetchError("transDate, typeValue, qty > 0 and price > 0 are required.");
  }

  if (hasMissingForeignLineSettlement(normalizedPayload, localCurrencyCode)) {
    throw buildForeignLineSettlementError();
  }

  const safeSheetId = encodeURIComponent(String(hojaGastosId || "").trim());
  const safeLineId = encodeURIComponent(String(lineRecId || "").trim());

  const response = await fetchJson<IndApiResponse<ExpenseSheetLineUpdateResponseData>>(
    `/api/crm/expensesheets/${safeSheetId}/lines/${safeLineId}`,
    {
      ...options,
      method: "PUT",
      headers: buildExpenseHeaders(context, options, true),
      body: JSON.stringify(normalizedPayload),
    }
  );

  return normalizeApiResponse(response);
};

// MMS - Attaches an existing ticket to a manual line through the atomic endpoint. - 2026.08.04
export const attachExpenseSheetLineTicket = async (
  hojaGastosId: string,
  lineRecId: string,
  payload: ExpenseSheetLineTicketRequest,
  options?: ExpenseTicketListFetchOptions
): Promise<IndApiResponse<ExpenseSheetLineTicketResultDto>> => {
  const { axUserIdOverride, ...baseOptions } = options || {};
  const context = await ensureExpenseApiContext(baseOptions);
  const safeSheetId = encodeURIComponent(safeText(hojaGastosId));
  const safeLineId = encodeURIComponent(safeText(lineRecId));
  const safeFileId = safeText(payload?.fileId);
  if (!safeSheetId || !safeLineId || !safeFileId) {
    throw new ApiFetchError(indT("Api_RequestFailed", "Request failed."));
  }

  const response = await fetchJson<IndApiResponse<ExpenseSheetLineTicketResultDto>>(
    `/api/crm/expensesheets/${safeSheetId}/lines/${safeLineId}/ticket`,
    {
      ...baseOptions,
      method: "PUT",
      headers: buildTicketListHeaders(context, baseOptions, axUserIdOverride),
      body: JSON.stringify({ fileId: safeFileId }),
    }
  );

  return normalizeApiResponse(response);
};

// MMS - Detaches a ticket while preserving the line, ticket header, and file. - 2026.08.04
export const detachExpenseSheetLineTicket = async (
  hojaGastosId: string,
  lineRecId: string,
  options?: ApiFetchOptions
): Promise<IndApiResponse<ExpenseSheetLineTicketResultDto>> => {
  const context = await ensureExpenseApiContext(options);
  const safeSheetId = encodeURIComponent(safeText(hojaGastosId));
  const safeLineId = encodeURIComponent(safeText(lineRecId));
  if (!safeSheetId || !safeLineId) {
    throw new ApiFetchError(indT("Api_RequestFailed", "Request failed."));
  }

  const response = await fetchJson<IndApiResponse<ExpenseSheetLineTicketResultDto>>(
    `/api/crm/expensesheets/${safeSheetId}/lines/${safeLineId}/ticket`,
    {
      ...options,
      method: "DELETE",
      headers: buildExpenseHeaders(context, options),
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

const normalizeExpenseSheetsAskResponse = (response: ExpenseSheetsAskResult): ExpenseSheetsAskResult => {
  const normalized = normalizeApiResponse(response);
  const rawData = normalized?.Data;
  if (!rawData || typeof rawData !== "object") {
    return {
      ...normalized,
      Message: sanitizeAssistantText(normalized?.Message),
      HttpStatus: typeof response?.HttpStatus === "number" ? response.HttpStatus : undefined,
      RetryAfter: safeText(response?.RetryAfter) || null,
    };
  }

  const rawWarnings =
    (rawData as { Warnings?: unknown; warnings?: unknown }).Warnings ??
    (rawData as { warnings?: unknown }).warnings;
  const rawFiltersApplied =
    (rawData as { FiltersApplied?: unknown; filtersApplied?: unknown }).FiltersApplied ??
    (rawData as { filtersApplied?: unknown }).filtersApplied;

  const isIgnorableAssistantWarning = (warning: string): boolean => {
    const normalizedWarning = sanitizeAssistantText(warning).toLowerCase();
    if (!normalizedWarning) return true;

    return normalizedWarning.includes("sourcejson") &&
      (normalizedWarning.includes("skipped") || normalizedWarning.includes("omit"));
  };

  return {
    ...normalized,
    Message: sanitizeAssistantText(normalized?.Message),
    HttpStatus: typeof response?.HttpStatus === "number" ? response.HttpStatus : undefined,
    RetryAfter: safeText(response?.RetryAfter) || null,
    Data: {
      Answer: sanitizeAssistantText(
        (rawData as { Answer?: unknown; answer?: unknown }).Answer ?? (rawData as { answer?: unknown }).answer
      ),
      Model: sanitizeAssistantText(
        (rawData as { Model?: unknown; model?: unknown }).Model ?? (rawData as { model?: unknown }).model
      ),
      SourceKey: sanitizeAssistantText(
        (rawData as { SourceKey?: unknown; sourceKey?: unknown }).SourceKey ??
          (rawData as { sourceKey?: unknown }).sourceKey
      ),
      FiltersApplied:
        rawFiltersApplied && typeof rawFiltersApplied === "object"
          ? cloneJsonCompatibleValue(rawFiltersApplied as Record<string, unknown>)
          : null,
      TotalSourceRecords:
        toNullableNumber(
          (rawData as { TotalSourceRecords?: unknown; totalSourceRecords?: unknown }).TotalSourceRecords ??
            (rawData as { totalSourceRecords?: unknown }).totalSourceRecords
        ) ?? null,
      RecordsSentToModel:
        toNullableNumber(
          (rawData as { RecordsSentToModel?: unknown; recordsSentToModel?: unknown }).RecordsSentToModel ??
            (rawData as { recordsSentToModel?: unknown }).recordsSentToModel
        ) ?? null,
      RetrievalMode: sanitizeAssistantText(
        (rawData as { RetrievalMode?: unknown; retrievalMode?: unknown }).RetrievalMode ??
          (rawData as { retrievalMode?: unknown }).retrievalMode
      ) || null,
      Truncated: toNullableBool(
        (rawData as { Truncated?: unknown; truncated?: unknown }).Truncated ??
          (rawData as { truncated?: unknown }).truncated
      ),
      Warnings: Array.isArray(rawWarnings)
        ? rawWarnings
            .map((entry) => sanitizeAssistantText(entry))
            .filter((entry) => entry && !isIgnorableAssistantWarning(entry))
        : [],
    },
  };
};

// Asks business questions about the current expense sheet list using /api/ia/service/expensesheets/ask.
export const askExpenseSheetsQuestion = async (
  payload: ExpenseSheetsAskRequest,
  options?: ApiFetchOptions
): Promise<ExpenseSheetsAskResult> => {
  const question = safeText(payload?.question);
  if (!question) {
    throw new ApiFetchError("question is required.");
  }

  const context = await ensureExpenseApiContext(options);
  const csrfToken = getCsrfToken();
  const headers = sanitizeHeaders(buildExpenseHeaders(context, options, true));
  if (csrfToken) {
    headers.RequestVerificationToken = csrfToken;
  }

  const safePayload: ExpenseSheetsAskRequest = {
    question,
    answerInstructions: safeText(payload?.answerInstructions) || undefined,
    listRequest: cloneJsonCompatibleValue(payload.listRequest),
    sourceJson:
      payload?.sourceJson === null || payload?.sourceJson === undefined
        ? undefined
        : cloneJsonCompatibleValue(payload.sourceJson),
  };

  const response = await fetch("/api/ia/service/expensesheets/ask", {
    credentials: "same-origin",
    ...options,
    method: "POST",
    headers,
    body: JSON.stringify(safePayload),
  });

  const raw = await response.text();
  const retryAfter = safeText(response.headers.get("Retry-After"));

  if (!response.ok) {
    const reloginResult = await handleApiAuthFailure<ExpenseSheetsAskResult>(raw, response.status, "expense-sheets-ask");
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
    ...(parsed as ExpenseSheetsAskResult),
    HttpStatus: response.status,
    RetryAfter: retryAfter || null,
  });
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

// Creates and finalizes one ticket from a single multipart upload using /api/crm/expensesheets/tickets/quick-create.
export const createExpenseSheetTicketQuick = async (
  payload: ExpenseSheetTicketQuickCreateRequest,
  options?: ApiFetchOptions
): Promise<ExpenseSheetTicketQuickCreateResult> => {
  if (!payload?.ticketImage) {
    throw new ApiFetchError("ticketImage is required.");
  }

  const { suppressPermissionModal: _suppressPermissionModal, ...fetchOptions } = options || {};
  const context = await ensureExpenseApiContext(fetchOptions);
  const form = new FormData();
  const safeCurrencyCode = safeText(payload?.currencyCode).toUpperCase();
  const safeDescription = normalizeDescriptionText(payload?.description, "");
  const safeComentario = safeText(payload?.comentario);
  const safeSheetId = safeText(payload?.existingHojaGastosId);
  const safeProjectId = safeText(payload?.projId || payload?.projectId);
  const ticketImage = payload.ticketImage;

  if (ticketImage instanceof File) {
    form.append("ticketImage", ticketImage, safeText(ticketImage.name) || "ticket.jpg");
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
    body: form,
  });

  const raw = await response.text();
  const retryAfter = safeText(response.headers.get("Retry-After"));

  if (!response.ok) {
    const reloginResult = await handleApiAuthFailure<ExpenseSheetTicketQuickCreateResult>(
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

  return normalizeTicketQuickCreateResponse({
    ...(parsed as ExpenseSheetTicketQuickCreateResult),
    HttpStatus: response.status,
    RetryAfter: retryAfter || null,
  });
};

// Creates a ticket header/lines using /api/crm/expensesheets/tickets.
export const createExpenseSheetTicket = async (
  payload: ExpenseSheetTicketCreateRequest,
  options?: ApiFetchOptions
): Promise<IndApiResponse<object>> => {
  const context = await ensureExpenseApiContext(options);
  const mode = Number(payload?.mode);
  const rawTransDate = safeText(payload?.transDate);
  const rawTicketDate = safeText(payload?.ticketDate);
  const normalizedTransDate = normalizeOptionalApiDate(rawTransDate);
  const normalizedTicketDate = normalizeOptionalApiDate(rawTicketDate);

  if (rawTransDate && !normalizedTransDate) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }
  if (rawTicketDate && !normalizedTicketDate) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }

  if ((mode === 0 || mode === 1) && !normalizedTransDate) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }

  const safePayload: ExpenseSheetTicketCreateRequest = {
    ...payload,
    description:
      payload.description === undefined ? undefined : normalizeDescriptionText(payload.description, "") || undefined,
    transDate: normalizedTransDate || undefined,
    ticketDate: normalizedTicketDate || undefined,
    gastoType: normalizeOptionalTicketGastoType(payload?.gastoType),
    lines: Array.isArray(payload.lines)
      ? payload.lines.map((line) => ({
          ...line,
          description: normalizeDescriptionText(line.description, ""),
        }))
      : payload.lines,
  };
  const response = await fetchJson<IndApiResponse<object>>("/api/crm/expensesheets/tickets", {
    ...options,
    method: "POST",
    headers: buildExpenseHeaders(context, options, true),
    body: JSON.stringify(safePayload),
  });

  return normalizeApiResponse(response);
};

const normalizeTicketFilterCriteriaPayload = <
  T extends {
    createdDateFrom?: string;
    createdDateTo?: string;
    searchKey?: string;
    filter?: string;
    currencyCode?: string;
    gastoType?: unknown;
    processedByAI?: unknown;
  },
>(
  payload: T
) => {
  const rawCreatedDateFrom = safeText(payload?.createdDateFrom);
  const rawCreatedDateTo = safeText(payload?.createdDateTo);
  const createdDateFrom = normalizeTicketListDate(rawCreatedDateFrom);
  const createdDateTo = normalizeTicketListDate(rawCreatedDateTo);
  if (rawCreatedDateFrom && !createdDateFrom) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }
  if (rawCreatedDateTo && !createdDateTo) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }

  const preferredSearchKey = safeText(payload?.searchKey || payload?.filter);
  const legacyFilter = safeText(payload?.filter || preferredSearchKey);

  return {
    createdDateFrom: createdDateFrom || undefined,
    createdDateTo: createdDateTo || undefined,
    searchKey: preferredSearchKey || undefined,
    filter: legacyFilter || undefined,
    currencyCode: safeText(payload?.currencyCode).toUpperCase() || undefined,
    gastoType: normalizeTicketListGastoType(payload?.gastoType),
    processedByAI: normalizeOptionalTicketProcessedByAI(payload?.processedByAI),
  };
};

const normalizeTicketListFilterPayload = <
  T extends {
    page?: number;
    pageSize?: number;
    createdDateFrom?: string;
    createdDateTo?: string;
    searchKey?: string;
    filter?: string;
    currencyCode?: string;
    gastoType?: unknown;
    processedByAI?: unknown;
  },
>(
  payload: T
) => {
  return {
    page: Number.isFinite(payload?.page) && Number(payload.page) > 0 ? Math.floor(Number(payload.page)) : 1,
    pageSize: Number.isFinite(payload?.pageSize) && Number(payload.pageSize) > 0 ? Math.floor(Number(payload.pageSize)) : 50,
    ...normalizeTicketFilterCriteriaPayload(payload),
  };
};

// Loads ticket list using /api/crm/expensesheets/tickets/list.
export const fetchExpenseSheetTicketsList = async (
  payload: ExpenseSheetTicketListRequest,
  options?: ExpenseTicketListFetchOptions
): Promise<IndPagedResponse<ExpenseSheetTicketListItemDto>> => {
  const { axUserIdOverride, ...baseOptions } = options || {};
  const context = await ensureExpenseApiContext(baseOptions);
  const safePayload: ExpenseSheetTicketListRequest = {
    ...normalizeTicketListFilterPayload(payload),
    status: normalizeOptionalTicketStatus(payload?.status),
  };

  const response = await fetchJson<IndPagedResponse<ExpenseSheetTicketListItemDto>>(
    "/api/crm/expensesheets/tickets/list",
    {
      ...baseOptions,
      method: "POST",
      headers: buildTicketListHeaders(context, baseOptions, axUserIdOverride),
      body: JSON.stringify(safePayload),
    }
  );

  return normalizeTicketListPagedResponse(response);
};

// Loads link-mode ticket list using /api/crm/expensesheets/tickets/link/list.
export const fetchExpenseSheetTicketLinkList = async (
  payload: ExpenseSheetTicketLinkListRequest,
  options?: ExpenseTicketListFetchOptions
): Promise<IndPagedResponse<ExpenseSheetTicketLinkListItemDto>> => {
  const { axUserIdOverride, ...baseOptions } = options || {};
  const context = await ensureExpenseApiContext(baseOptions);
  const safePayload: ExpenseSheetTicketLinkListRequest = {
    ...normalizeTicketListFilterPayload(payload),
  };

  const response = await fetchJson<IndPagedResponse<ExpenseSheetTicketLinkListItemDto>>(
    "/api/crm/expensesheets/tickets/link/list",
    {
      ...baseOptions,
      method: "POST",
      headers: buildTicketListHeaders(context, baseOptions, axUserIdOverride),
      body: JSON.stringify(safePayload),
    }
  );

  return normalizeTicketLinkListPagedResponse(response);
};

// Links selected or filtered tickets using /api/crm/expensesheets/tickets/link/bulk.
export const linkExpenseSheetTicketsBulk = async (
  payload: ExpenseSheetTicketLinkBulkRequest,
  options?: ExpenseTicketListFetchOptions
): Promise<IndApiResponse<ExpenseSheetTicketLinkBulkResultDto>> => {
  const { axUserIdOverride, ...baseOptions } = options || {};
  const context = await ensureExpenseApiContext(baseOptions);
  const selectionMode = payload?.selectionMode === "filtered" ? "filtered" : "selected";
  const ticketIds = Array.isArray(payload?.ticketIds)
    ? payload.ticketIds.map((entry) => safeText(entry)).filter(Boolean)
    : [];
  const excludedIds = Array.isArray(payload?.excludedIds)
    ? payload.excludedIds.map((entry) => safeText(entry)).filter(Boolean)
    : [];

  const safePayload: ExpenseSheetTicketLinkBulkRequest = {
    expenseSheetId: safeText(payload?.expenseSheetId),
    selectionMode,
    ticketIds: selectionMode === "selected" ? ticketIds : undefined,
    filters:
      selectionMode === "filtered" && payload?.filters
        ? {
            ...normalizeTicketFilterCriteriaPayload(payload.filters),
          }
        : undefined,
    excludedIds: selectionMode === "filtered" ? excludedIds : undefined,
  };

  const response = await fetchJson<IndApiResponse<ExpenseSheetTicketLinkBulkResultDto>>(
    "/api/crm/expensesheets/tickets/link/bulk",
    {
      ...baseOptions,
      method: "POST",
      headers: buildTicketListHeaders(context, baseOptions, axUserIdOverride),
      body: JSON.stringify(safePayload),
    }
  );

  return normalizeTicketLinkBulkResponse(response);
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
  fileId: string,
  urlFile: string,
  options?: ApiFetchOptions
): Promise<Blob> => {
  const safeFileId = safeText(fileId);
  const safeUrlFile = safeText(urlFile);
  if (!safeFileId || !safeUrlFile) {
    throw new ApiFetchError("Missing ticket preview payload.");
  }

  const { suppressPermissionModal: _suppressPermissionModal, ...fetchOptions } = options || {};
  const context = await ensureExpenseApiContext(options);
  const csrfToken = getCsrfToken();
  const headers = sanitizeHeaders(buildExpenseHeaders(context, fetchOptions, true));
  headers.Accept = "image/*";
  const requestHeaders: HeadersInit = {
    Accept: "image/*",
    ...headers,
  };

  if (csrfToken) {
    (requestHeaders as Record<string, string>)["RequestVerificationToken"] = csrfToken;
  }

  const response = await fetch("/api/crm/expensesheets/tickets/preview", {
    credentials: "same-origin",
    ...fetchOptions,
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify({
      fileId: safeFileId,
      urlFile: safeUrlFile,
    }),
  });

  if (!response.ok) {
    const raw = await response.text();
    const reloginResult = await handleApiAuthFailure<Blob>(raw, response.status, "ticket-preview");
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

// Updates ticket header metadata using /api/crm/expensesheets/tickets/{fileId}.
export const updateExpenseSheetTicket = async (
  fileId: string,
  payload: ExpenseSheetTicketUpdateRequest,
  options?: ApiFetchOptions
): Promise<IndApiResponse<object>> => {
  const context = await ensureExpenseApiContext(options);
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  const rawTransDate = safeText(payload?.transDate);
  const rawTicketDate = safeText(payload?.ticketDate);
  const normalizedTransDate = normalizeOptionalApiDate(rawTransDate);
  const normalizedTicketDate = normalizeOptionalApiDate(rawTicketDate);

  if (rawTransDate && !normalizedTransDate) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }
  if (rawTicketDate && !normalizedTicketDate) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }

  const safePayload: ExpenseSheetTicketUpdateRequest = {
    ...payload,
    description:
      payload.description === undefined ? undefined : normalizeDescriptionText(payload.description, "") || undefined,
    transDate: normalizedTransDate || undefined,
    ticketDate: normalizedTicketDate || undefined,
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

// Adjusts a ticket header total using /api/crm/expensesheets/tickets/{fileId}/total-adjustment.
export const adjustExpenseSheetTicketTotalAmount = async (
  fileId: string,
  payload: ExpenseSheetTicketTotalAdjustmentRequest,
  options?: ApiFetchOptions
): Promise<IndApiResponse<ExpenseSheetTicketTotalAdjustmentResultDto>> => {
  const context = await ensureExpenseApiContext(options);
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  const totalAmount = toNullableNumber(payload?.totalAmount);
  if (!safeFileId || totalAmount == null || totalAmount < 0) {
    throw new ApiFetchError("Invalid ticket total adjustment payload.");
  }

  const response = await fetchJson<IndApiResponse<ExpenseSheetTicketTotalAdjustmentResultDto>>(
    `/api/crm/expensesheets/tickets/${safeFileId}/total-adjustment`,
    {
      ...options,
      method: "POST",
      headers: buildExpenseHeaders(context, options, true),
      body: JSON.stringify({ totalAmount }),
    }
  );

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
  const normalizedTransDate = normalizeOptionalApiDate(rawPayload.transDate);
  if (!normalizedTransDate) {
    throw new ApiFetchError(EXPENSE_API_DATE_FORMAT_MESSAGE);
  }
  safePayload.transDate = normalizedTransDate;

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
  if (!safeText(payload?.description) || !isValidTicketLineAmount(payload)) {
    throw new ApiFetchError("description and a valid signed ticket line amount are required.");
  }

  const context = await ensureExpenseApiContext(options);
  const safePayload: ExpenseSheetTicketLineRequest = {
    ...payload,
    description: normalizeDescriptionText(payload.description, ""),
  };
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  const response = await fetchJson<IndApiResponse<object>>(`/api/crm/expensesheets/tickets/${safeFileId}/lines`, {
    ...options,
    method: "POST",
    headers: buildExpenseHeaders(context, options, true),
    body: JSON.stringify(safePayload),
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
  if (!safeText(payload?.description) || !isValidTicketLineAmount(payload)) {
    throw new ApiFetchError("description and a valid signed ticket line amount are required.");
  }

  const context = await ensureExpenseApiContext(options);
  const safePayload: ExpenseSheetTicketLineRequest = {
    ...payload,
    description: normalizeDescriptionText(payload.description, ""),
  };
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  const safeLineId = encodeURIComponent(String(lineRecId || "").trim());
  const response = await fetchJson<IndApiResponse<object>>(
    `/api/crm/expensesheets/tickets/${safeFileId}/lines/${safeLineId}`,
    {
      ...options,
      method: "PUT",
      headers: buildExpenseHeaders(context, options, true),
      body: JSON.stringify(safePayload),
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
  const safePageSize = Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : 50;

  return fetchJson<ProjectDropdownResponse>(
    `/api/crm/projects/list?filter=${safeTerm}&page=${safePage}&pageSize=${safePageSize}`,
    {
      method: "GET",
      ...options,
    }
  );
};
