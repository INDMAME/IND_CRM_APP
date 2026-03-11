import type {
  ExpenseSheetCurrencyDto,
  ExpenseSheetDetailDto,
  ExpenseSheetSubordinateDto,
  ExpenseSheetTicketDetailDto,
  ExpenseSheetTicketLinkBulkResultDto,
  ExpenseSheetTicketLinkListItemDto,
  ExpenseSheetTicketListItemDto,
  ExpenseSheetListItemDto,
  IndApiResponse,
  IndPagedResponse,
} from "../expenseTypes.ts";
import {
  safeText,
  toNullableBool,
  toNullableGastoTypeCode,
  toNullableNumber,
  toNullableTicketStatusCode,
} from "./expenseApiTransforms.ts";
import { normalizeExpenseSheetSubordinates } from "./expenseSubordinateMapper.ts";

export const normalizeListPagedResponse = (
  response: IndPagedResponse<ExpenseSheetListItemDto>
): IndPagedResponse<ExpenseSheetListItemDto> => {
  return {
    ...response,
    Items: Array.isArray(response?.Items) ? response.Items : [],
  };
};

export const normalizeDetailPagedResponse = (
  response: IndPagedResponse<ExpenseSheetDetailDto>
): IndPagedResponse<ExpenseSheetDetailDto> => {
  return {
    ...response,
    Items: Array.isArray(response?.Items) ? response.Items : [],
  };
};

export const normalizeApiResponse = <T>(response: IndApiResponse<T>): IndApiResponse<T> => {
  return {
    ...response,
    Errors: Array.isArray(response?.Errors) ? response.Errors : response?.Errors ?? null,
  };
};

export const normalizeCurrencyPagedResponse = (
  response: IndPagedResponse<ExpenseSheetCurrencyDto>
): IndPagedResponse<ExpenseSheetCurrencyDto> => {
  return {
    ...response,
    Items: Array.isArray(response?.Items) ? response.Items : [],
  };
};

export const normalizeSubordinatesPagedResponse = (
  response: IndPagedResponse<unknown>
): IndPagedResponse<ExpenseSheetSubordinateDto> => {
  const normalizedItems = normalizeExpenseSheetSubordinates(response?.Items);

  return {
    ...response,
    Items: normalizedItems,
  };
};

export const normalizeTicketListPagedResponse = (
  response: IndPagedResponse<ExpenseSheetTicketListItemDto>
): IndPagedResponse<ExpenseSheetTicketListItemDto> => {
  const items = Array.isArray(response?.Items) ? response.Items : [];
  const normalizedItems = items.map((item) => ({
    ...item,
    Status: toNullableTicketStatusCode(
      (item as { Status?: unknown; status?: unknown })?.Status ??
        (item as { Status?: unknown; status?: unknown })?.status
    ),
    ProcessedByAI: toNullableBool(
      (item as { ProcessedByAI?: unknown; processedByAI?: unknown })?.ProcessedByAI ??
        (item as { ProcessedByAI?: unknown; processedByAI?: unknown })?.processedByAI
    ),
    GastoType: toNullableGastoTypeCode(
      (item as { GastoType?: unknown; gastoType?: unknown })?.GastoType ??
        (item as { GastoType?: unknown; gastoType?: unknown })?.gastoType
    ),
  }));

  return {
    ...response,
    Items: normalizedItems,
  };
};

export const normalizeTicketLinkListPagedResponse = (
  response: IndPagedResponse<ExpenseSheetTicketLinkListItemDto>
): IndPagedResponse<ExpenseSheetTicketLinkListItemDto> => {
  const items = Array.isArray(response?.Items) ? response.Items : [];
  const normalizedItems = items.map((item) => ({
    ...item,
    ProcessedByAI: toNullableBool(
      (item as { ProcessedByAI?: unknown; processedByAI?: unknown })?.ProcessedByAI ??
        (item as { ProcessedByAI?: unknown; processedByAI?: unknown })?.processedByAI
    ),
    GastoType: toNullableGastoTypeCode(
      (item as { GastoType?: unknown; gastoType?: unknown })?.GastoType ??
        (item as { GastoType?: unknown; gastoType?: unknown })?.gastoType
    ),
  }));

  return {
    ...response,
    Items: normalizedItems,
  };
};

export const normalizeTicketDetailPagedResponse = (
  response: IndPagedResponse<ExpenseSheetTicketDetailDto>
): IndPagedResponse<ExpenseSheetTicketDetailDto> => {
  const items = Array.isArray(response?.Items) ? response.Items : [];
  const normalizedItems = items.map((item) => ({
    ...item,
    Status: toNullableTicketStatusCode(
      (item as { Status?: unknown; status?: unknown })?.Status ??
        (item as { Status?: unknown; status?: unknown })?.status
    ),
    ProcessedByAI: toNullableBool(
      (item as { ProcessedByAI?: unknown; processedByAI?: unknown })?.ProcessedByAI ??
        (item as { ProcessedByAI?: unknown; processedByAI?: unknown })?.processedByAI
    ),
    HojaGastosIdDisplay: safeText(
      (item as { HojaGastosIdDisplay?: unknown; hojaGastosIdDisplay?: unknown })?.HojaGastosIdDisplay ??
        (item as { HojaGastosIdDisplay?: unknown; hojaGastosIdDisplay?: unknown })?.hojaGastosIdDisplay
    ),
    GastoType: toNullableGastoTypeCode(
      (item as { GastoType?: unknown; gastoType?: unknown })?.GastoType ??
        (item as { GastoType?: unknown; gastoType?: unknown })?.gastoType
    ),
    Lines: Array.isArray(item?.Lines) ? item.Lines : [],
  }));

  return {
    ...response,
    Items: normalizedItems,
  };
};

export const normalizeTicketLinkBulkResponse = (
  response: IndApiResponse<ExpenseSheetTicketLinkBulkResultDto>
): IndApiResponse<ExpenseSheetTicketLinkBulkResultDto> => {
  const normalized = normalizeApiResponse(response);
  const rawData = normalized?.Data;
  if (!rawData || typeof rawData !== "object") {
    return normalized;
  }

  const toIssueList = (value: unknown) => {
    if (!Array.isArray(value)) return [];

    return value.map((entry) => ({
      ticketId: safeText(
        (entry as { ticketId?: unknown; TicketId?: unknown })?.ticketId ??
          (entry as { TicketId?: unknown }).TicketId
      ),
      reason: safeText(
        (entry as { reason?: unknown; Reason?: unknown })?.reason ??
          (entry as { Reason?: unknown }).Reason
      ),
    }));
  };

  const linkedTicketIdsRaw =
    (rawData as { linkedTicketIds?: unknown; LinkedTicketIds?: unknown }).linkedTicketIds ??
    (rawData as { LinkedTicketIds?: unknown }).LinkedTicketIds;

  return {
    ...normalized,
    Data: {
      expenseSheetId: safeText(
        (rawData as { expenseSheetId?: unknown; ExpenseSheetId?: unknown }).expenseSheetId ??
          (rawData as { ExpenseSheetId?: unknown }).ExpenseSheetId
      ),
      requestedCount: toNullableNumber(
        (rawData as { requestedCount?: unknown; RequestedCount?: unknown }).requestedCount ??
          (rawData as { RequestedCount?: unknown }).RequestedCount
      ) ?? 0,
      linkedCount: toNullableNumber(
        (rawData as { linkedCount?: unknown; LinkedCount?: unknown }).linkedCount ??
          (rawData as { LinkedCount?: unknown }).LinkedCount
      ) ?? 0,
      skippedCount: toNullableNumber(
        (rawData as { skippedCount?: unknown; SkippedCount?: unknown }).skippedCount ??
          (rawData as { SkippedCount?: unknown }).SkippedCount
      ) ?? 0,
      failedCount: toNullableNumber(
        (rawData as { failedCount?: unknown; FailedCount?: unknown }).failedCount ??
          (rawData as { FailedCount?: unknown }).FailedCount
      ) ?? 0,
      linkedTicketIds: Array.isArray(linkedTicketIdsRaw)
        ? linkedTicketIdsRaw.map((entry) => safeText(entry)).filter(Boolean)
        : [],
      skipped: toIssueList(
        (rawData as { skipped?: unknown; Skipped?: unknown }).skipped ??
          (rawData as { Skipped?: unknown }).Skipped
      ),
      failed: toIssueList(
        (rawData as { failed?: unknown; Failed?: unknown }).failed ??
          (rawData as { Failed?: unknown }).Failed
      ),
    },
  };
};
