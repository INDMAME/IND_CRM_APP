import { ApiFetchError } from "../../../services/apiService.ts";
import type {
  ExpenseGastoTypeCode,
  ExpenseSheetCreateLineRequest,
  ExpenseSheetDraftResponse,
  ExpenseSheetTicketIaRequest,
} from "../expenseTypes.ts";
import {
  getDefaultExpenseGastoTypeCode,
  toExpenseGastoTypeCode,
} from "../constants/expenseGastoTypeCatalog.ts";
import { safeText } from "../utils/expenseUiUtils.ts";
import { toExpenseApiDdMmYyyy } from "../utils/expenseApiDateUtils.ts";
import { resolveTicketLineAmount } from "../utils/expenseTicketLineAmount.ts";
import {
  canPersistSensitiveBrowserState,
  captureSensitiveBrowserState,
  getBrowserStorageScopeToken,
  isSensitiveBrowserStateCurrent,
} from "../../../utils/browserStorageScope.ts";

const TICKET_BROWSER_SCOPE = getBrowserStorageScopeToken() || "scope-unavailable";
const TICKET_IMAGE_CACHE_NAME = `ind-expense-ticket-image-v2-${TICKET_BROWSER_SCOPE}`;
const TICKET_IMAGE_CACHE_PREFIX = "/__ind_cache__/ticket-image/";
const TICKET_TRACE_STORAGE_KEY = `expense_sheet_ticket_quick_flow_trace_v2_${TICKET_BROWSER_SCOPE}`;

export const MAX_TICKET_IMAGE_SIZE_BYTES = 50 * 1024 * 1024;
export const TICKET_IMAGE_ACCEPT_ATTRIBUTE =
  ".jpg,.jpeg,.png,.webp,image/jpeg,image/pjpeg,image/png,image/webp";
const ALLOWED_TICKET_IMAGE_MIME_TYPES = new Set<string>(["image/jpeg", "image/pjpeg", "image/png", "image/webp"]);
const ALLOWED_TICKET_IMAGE_EXTENSIONS = new Set<string>(["jpg", "jpeg", "png", "webp"]);
const TICKET_MIME_TO_EXTENSION: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/pjpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};
const PREFERRED_TICKET_GASTO_TYPE = 8;
export const DEFAULT_CREATE_MODE = "manual" as "ia" | "manual";

export type TicketImageSource = "camera" | "gallery";

export type TicketTraceEntry = {
  step: string;
  traceId: string;
  at: string;
};

type NormalizedDraftLine = {
  transDate: string;
  typeValue: number;
  description: string;
  qty: number;
  price: number;
  totalAmount: number;
};

export type NormalizedDraft = {
  description: string;
  currencyCode: string;
  totalAmount: number;
  transDate: string;
  ticketDate: string;
  ticketTime: string;
  comentario: string;
  gastoType: number | null;
  lines: NormalizedDraftLine[];
};

export type PendingUploadRetry =
  | {
      strategy: "ia-ready";
      fileId: string;
      extension: string;
      cacheKey: string;
      draft: NormalizedDraft;
      fileNameHint: string;
    }
  | {
      strategy: "manual-post-upload-draft";
      fileId: string;
      extension: string;
      cacheKey: string;
      fileNameHint: string;
    };

export type UploadSyncResult = {
  urlFile: string;
  fileName: string;
};

export type UseExpenseSheetQuickTicketFlowArgs = {
  sheetId?: string;
  projectId?: string;
  currencyCode?: string;
  axUserIdOverride?: string;
  canCreateExpense: boolean;
  isCreateMode: boolean;
  isSheetLocked: boolean;
  linkToSheet?: boolean;
  onForbidden: () => void;
  onCompleted?: (result: { fileId: string; linkedToSheet: boolean; processedByAI: boolean | null }) => void;
};

export type QuickFlowProgressKey =
  | "uploadingImage"
  | "creatingTicket"
  | "syncingFile"
  | "finalizingIa"
  | "linkingExpenseLine"
  | "done";

const asRecord = (value: unknown): Record<string, unknown> => {
  if (!value || typeof value !== "object") return {};
  return value as Record<string, unknown>;
};

const getFirstDefined = (record: Record<string, unknown>, keys: string[]): unknown => {
  for (const key of keys) {
    if (key in record) {
      return record[key];
    }
  }
  return undefined;
};

const toNumber = (value: unknown): number | null => {
  if (value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const toPositiveNumber = (value: unknown): number | null => {
  const parsed = toNumber(value);
  return parsed !== null && parsed > 0 ? parsed : null;
};

const toDdMmYyyy = (value: unknown): string => {
  return toExpenseApiDdMmYyyy(value);
};

const toTicketTime = (value: unknown): string => {
  const raw = safeText(value).replace(/\./g, ":");
  if (!raw) return "";
  const match = raw.match(/^(\d{1,2}):([0-5]\d)(?::([0-5]\d))?$/);
  if (!match) return "";
  const hours = Number(match[1]);
  if (!Number.isInteger(hours) || hours < 0 || hours > 23) return "";
  return `${String(hours).padStart(2, "0")}:${match[2]}:${match[3] || "00"}`;
};

export const getTodayDdMmYyyy = (): string => {
  return toDdMmYyyy(new Date());
};

const normalizeGastoType = (value: unknown): number | null => {
  return toExpenseGastoTypeCode(value);
};

const normalizeImageExtension = (value: string): string => {
  const normalized = safeText(value).toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!normalized) return "";
  if (normalized === "jpeg") return "jpg";
  return ALLOWED_TICKET_IMAGE_EXTENSIONS.has(normalized) ? normalized : "";
};

const resolveExtensionFromFileName = (file: File): string => {
  const fromName = safeText(file.name).split(".").pop() || "";
  return normalizeImageExtension(fromName);
};

export const inferExtension = (file: File): string => {
  const type = safeText(file.type).toLowerCase();
  const fromMime = TICKET_MIME_TO_EXTENSION[type];
  if (fromMime) return fromMime;

  const fromName = resolveExtensionFromFileName(file);
  if (fromName) return fromName;

  return "jpg";
};

export const isSupportedTicketImageFile = (file: File): boolean => {
  const normalizedType = safeText(file.type).toLowerCase();
  if (normalizedType && ALLOWED_TICKET_IMAGE_MIME_TYPES.has(normalizedType)) {
    return true;
  }

  const extension = resolveExtensionFromFileName(file);
  return !!extension;
};

export const resolveRandomKey = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

export const sanitizeFileName = (value: string): string => {
  const base = safeText(value).replace(/[<>:"/\\|?*\u0000-\u001F]/g, "_");
  return base || "ticket-image";
};

export const extractTraceIdFromError = (error: ApiFetchError): string => {
  const payload = safeText(error.responseBody);
  if (!payload) return "";
  try {
    const json = JSON.parse(payload) as Record<string, unknown>;
    const traceId = safeText(json.TraceId ?? json.traceId);
    return traceId;
  } catch {
    return "";
  }
};

export const normalizeDraftFromIaResponse = (rawData: unknown): NormalizedDraft => {
  const data = asRecord(rawData);
  const draftDescription = safeText(getFirstDefined(data, ["description", "Description"]));
  const draftCurrency = safeText(getFirstDefined(data, ["currencyCode", "CurrencyCode"])).toUpperCase();
  const draftTotalAmount = toNumber(getFirstDefined(data, ["totalAmount", "TotalAmount"]));
  const draftTransDate = toDdMmYyyy(getFirstDefined(data, ["transDate", "TransDate"])) || getTodayDdMmYyyy();
  const draftTicketDate =
    toDdMmYyyy(getFirstDefined(data, ["ticketDate", "TicketDate"])) || draftTransDate;
  const draftTicketTime = toTicketTime(getFirstDefined(data, ["ticketTime", "TicketTime"]));
  const draftComment = safeText(getFirstDefined(data, ["comentario", "Comentario"]));
  const draftGastoType = normalizeGastoType(getFirstDefined(data, ["gastoType", "GastoType"]));

  const rawLines = getFirstDefined(data, ["lines", "Lines"]);
  const lineArray = Array.isArray(rawLines) ? rawLines : [];

  const lines: NormalizedDraftLine[] = lineArray
    .map((entry) => {
      const lineRecord = asRecord(entry);
      const qtyCandidate = toNumber(getFirstDefined(lineRecord, ["qty", "Qty"]));
      const qty = qtyCandidate !== null && qtyCandidate >= 0 ? qtyCandidate : 1;
      const price = toNumber(getFirstDefined(lineRecord, ["price", "Price"]));
      const explicitTotal = toNumber(getFirstDefined(lineRecord, ["totalAmount", "TotalAmount"]));
      const computedTotal = resolveTicketLineAmount({ qty, price, totalAmount: explicitTotal });
      if (computedTotal === null || !Number.isFinite(computedTotal) || computedTotal === 0) return null;

      const effectivePrice = price !== null && price !== 0 ? price : qty > 0 ? computedTotal / qty : computedTotal;
      if (effectivePrice === 0 || (qty === 0 && computedTotal >= 0)) return null;

      const candidateTypeValue = toPositiveNumber(getFirstDefined(lineRecord, ["typeValue", "TypeValue"]));
      const safeTypeValue = toExpenseGastoTypeCode(candidateTypeValue, { allowNone: false });
      const safeDraftGastoType = toExpenseGastoTypeCode(draftGastoType, { allowNone: false });
      const defaultGastoType = getDefaultExpenseGastoTypeCode(PREFERRED_TICKET_GASTO_TYPE);
      const typeValue = safeTypeValue ?? safeDraftGastoType ?? defaultGastoType;
      const description = safeText(getFirstDefined(lineRecord, ["description", "Description"])) || draftDescription;
      const transDate = toDdMmYyyy(getFirstDefined(lineRecord, ["transDate", "TransDate"])) || draftTransDate;

      return {
        transDate,
        typeValue,
        description: description || "Ticket",
        qty,
        price: effectivePrice,
        totalAmount: computedTotal,
      };
    })
    .filter((entry): entry is NormalizedDraftLine => entry !== null);

  return {
    description: draftDescription || "Ticket",
    currencyCode: draftCurrency || "EUR",
    totalAmount: draftTotalAmount !== null ? draftTotalAmount : lines.reduce((sum, line) => sum + line.totalAmount, 0),
    transDate: draftTransDate,
    ticketDate: draftTicketDate,
    ticketTime: draftTicketTime,
    comentario: draftComment,
    gastoType: draftGastoType,
    lines,
  };
};

export const resolveTicketFileIdFromDraftResponse = (rawData: unknown): string => {
  const data = asRecord(rawData);
  const creationRaw = getFirstDefined(data, ["TicketCreation", "ticketCreation"]);
  const creation = asRecord(creationRaw);
  return safeText(getFirstDefined(creation, ["FileId", "fileId"]));
};

export const resolveUploadResult = (responseData: unknown): UploadSyncResult => {
  const data = asRecord(responseData);
  return {
    urlFile: safeText(getFirstDefined(data, ["UrlFile", "urlFile"])),
    fileName: safeText(getFirstDefined(data, ["FileName", "fileName"])),
  };
};

export const buildTicketIaPayload = (draft: NormalizedDraft, upload: UploadSyncResult): ExpenseSheetTicketIaRequest => {
  const iaLines = draft.lines.map((line) => ({
    description: line.description,
    qty: line.qty,
    price: line.price,
    totalAmount: line.totalAmount,
  }));

  const payload: ExpenseSheetTicketIaRequest = {
    description: draft.description,
    currencyCode: draft.currencyCode,
    totalAmount: draft.totalAmount !== 0 ? draft.totalAmount : undefined,
    transDate: draft.transDate,
    ticketDate: draft.ticketDate || draft.transDate,
    ticketTime: draft.ticketTime || undefined,
    comentario: draft.comentario || undefined,
    urlFile: upload.urlFile || undefined,
    fileName: upload.fileName || undefined,
    lines: iaLines,
  };

  if (draft.gastoType !== null) {
    payload.gastoType = draft.gastoType as ExpenseGastoTypeCode;
  }

  return payload;
};

export const buildSheetLinePayload = (
  draft: NormalizedDraft,
  fileId: string,
  projectId: string
): ExpenseSheetCreateLineRequest | null => {
  const lineFromDraft = draft.lines[0];
  // Build a single expense line from ticket header data to avoid line-level description leakage.
  const headerTotal = draft.totalAmount > 0 ? draft.totalAmount : 0;
  const fallbackTotal = lineFromDraft?.totalAmount || 0;
  const effectiveTotal = headerTotal > 0 ? headerTotal : fallbackTotal;
  if (!(effectiveTotal > 0)) return null;

  const defaultGastoType = getDefaultExpenseGastoTypeCode(PREFERRED_TICKET_GASTO_TYPE);
  const typeValueCandidate = draft.gastoType || lineFromDraft?.typeValue || defaultGastoType;
  const typeValue = toExpenseGastoTypeCode(typeValueCandidate, { allowNone: false }) ?? defaultGastoType;

  return {
    transDate: draft.transDate || lineFromDraft?.transDate || getTodayDdMmYyyy(),
    typeValue,
    description: safeText(draft.description) || "Ticket",
    internacional: false,
    fileId,
    ticket: true,
    qty: 1,
    price: effectiveTotal,
    projId: safeText(projectId),
    projIdProvided: true,
  };
};

export const persistTraceList = (traceList: TicketTraceEntry[]): void => {
  if (!canPersistSensitiveBrowserState()) return;
  try {
    sessionStorage.setItem(TICKET_TRACE_STORAGE_KEY, JSON.stringify(traceList));
  } catch {
    // Ignore storage failures in restricted browser contexts.
  }
};

export const cacheImageFile = async (cacheKey: string, file: File): Promise<void> => {
  const stateSnapshot = captureSensitiveBrowserState();
  if (!stateSnapshot || typeof window === "undefined" || !("caches" in window)) return;
  const cache = await caches.open(TICKET_IMAGE_CACHE_NAME);
  const requestUrl = `${TICKET_IMAGE_CACHE_PREFIX}${encodeURIComponent(cacheKey)}`;
  if (!isSensitiveBrowserStateCurrent(stateSnapshot)) {
    await caches.delete(TICKET_IMAGE_CACHE_NAME).catch(() => false);
    return;
  }
  await cache.put(
    new Request(requestUrl),
    new Response(file, {
      headers: {
        "Content-Type": safeText(file.type) || "application/octet-stream",
      },
    })
  );
  if (!isSensitiveBrowserStateCurrent(stateSnapshot)) {
    await cache.delete(requestUrl).catch(() => false);
    await caches.delete(TICKET_IMAGE_CACHE_NAME).catch(() => false);
  }
};

export const readCachedImageFile = async (cacheKey: string): Promise<Blob | null> => {
  const stateSnapshot = captureSensitiveBrowserState();
  if (!stateSnapshot || typeof window === "undefined" || !("caches" in window)) return null;
  const cache = await caches.open(TICKET_IMAGE_CACHE_NAME);
  const requestUrl = `${TICKET_IMAGE_CACHE_PREFIX}${encodeURIComponent(cacheKey)}`;
  const cachedResponse = await cache.match(requestUrl);
  if (!cachedResponse || !isSensitiveBrowserStateCurrent(stateSnapshot)) return null;
  const blob = await cachedResponse.blob();
  return isSensitiveBrowserStateCurrent(stateSnapshot) ? blob : null;
};

export const removeCachedImageFile = async (cacheKey: string): Promise<void> => {
  if (typeof window === "undefined" || !("caches" in window)) return;
  const stateSnapshot = captureSensitiveBrowserState();
  if (!stateSnapshot) {
    await caches.delete(TICKET_IMAGE_CACHE_NAME).catch(() => false);
    return;
  }
  const cache = await caches.open(TICKET_IMAGE_CACHE_NAME);
  if (!isSensitiveBrowserStateCurrent(stateSnapshot)) {
    await caches.delete(TICKET_IMAGE_CACHE_NAME).catch(() => false);
    return;
  }
  const requestUrl = `${TICKET_IMAGE_CACHE_PREFIX}${encodeURIComponent(cacheKey)}`;
  await cache.delete(requestUrl);
  if (!isSensitiveBrowserStateCurrent(stateSnapshot)) {
    await caches.delete(TICKET_IMAGE_CACHE_NAME).catch(() => false);
  }
};

// Waits for a parallel cache write before removing the successful-flow recovery image.
export const removeCachedImageFileAfterWrite = async (
  cacheKey: string,
  pendingWrite: Promise<void>
): Promise<void> => {
  await pendingWrite.catch(() => undefined);
  await removeCachedImageFile(cacheKey);
};
