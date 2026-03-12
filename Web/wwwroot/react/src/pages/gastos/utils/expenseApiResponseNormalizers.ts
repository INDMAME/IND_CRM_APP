import type {
  ExpenseSheetCurrencyDto,
  ExpenseSheetDetailDto,
  ExpenseSheetSubordinateDto,
  ExpenseSheetTicketDetailDto,
  ExpenseSheetTicketLinkBulkResultDto,
  ExpenseSheetTicketLinkListItemDto,
  ExpenseSheetTicketQuickCreateResult,
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

export const normalizeTicketQuickCreateResponse = (
  response: ExpenseSheetTicketQuickCreateResult
): ExpenseSheetTicketQuickCreateResult => {
  const normalized = normalizeApiResponse(response);
  const rawData = normalized?.Data;
  if (!rawData || typeof rawData !== "object") {
    return {
      ...normalized,
      HttpStatus: typeof response?.HttpStatus === "number" ? response.HttpStatus : undefined,
      RetryAfter: safeText(response?.RetryAfter) || null,
    };
  }

  const rawStepTraceIds =
    (rawData as { StepTraceIds?: unknown; stepTraceIds?: unknown }).StepTraceIds ??
    (rawData as { stepTraceIds?: unknown }).stepTraceIds;
  const stepTraceIds = rawStepTraceIds && typeof rawStepTraceIds === "object" ? rawStepTraceIds : null;

  return {
    ...normalized,
    HttpStatus: typeof response?.HttpStatus === "number" ? response.HttpStatus : undefined,
    RetryAfter: safeText(response?.RetryAfter) || null,
    Data: {
      FileId: safeText((rawData as { FileId?: unknown; fileId?: unknown }).FileId ?? (rawData as { fileId?: unknown }).fileId),
      UrlFile: safeText(
        (rawData as { UrlFile?: unknown; urlFile?: unknown }).UrlFile ?? (rawData as { urlFile?: unknown }).urlFile
      ),
      FileName: safeText(
        (rawData as { FileName?: unknown; fileName?: unknown }).FileName ??
          (rawData as { fileName?: unknown }).fileName
      ),
      ProcessedByAI: toNullableBool(
        (rawData as { ProcessedByAI?: unknown; processedByAI?: unknown }).ProcessedByAI ??
          (rawData as { processedByAI?: unknown }).processedByAI
      ),
      LinkedToSheet:
        toNullableBool(
          (rawData as { LinkedToSheet?: unknown; linkedToSheet?: unknown }).LinkedToSheet ??
            (rawData as { linkedToSheet?: unknown }).linkedToSheet
        ) === true,
      HojaGastosId:
        safeText(
          (rawData as { HojaGastosId?: unknown; hojaGastosId?: unknown }).HojaGastosId ??
            (rawData as { hojaGastosId?: unknown }).hojaGastosId
        ) || null,
      CompletedStage: safeText(
        (rawData as { CompletedStage?: unknown; completedStage?: unknown }).CompletedStage ??
          (rawData as { completedStage?: unknown }).completedStage
      ),
      StepTraceIds: stepTraceIds
        ? {
            TicketCreate: safeText(
              (stepTraceIds as { TicketCreate?: unknown; ticketCreate?: unknown }).TicketCreate ??
                (stepTraceIds as { ticketCreate?: unknown }).ticketCreate
            ),
            FileUpload: safeText(
              (stepTraceIds as { FileUpload?: unknown; fileUpload?: unknown }).FileUpload ??
                (stepTraceIds as { fileUpload?: unknown }).fileUpload
            ),
            DraftExtract: safeText(
              (stepTraceIds as { DraftExtract?: unknown; draftExtract?: unknown }).DraftExtract ??
                (stepTraceIds as { draftExtract?: unknown }).draftExtract
            ),
            TicketFinalize: safeText(
              (stepTraceIds as { TicketFinalize?: unknown; ticketFinalize?: unknown }).TicketFinalize ??
                (stepTraceIds as { ticketFinalize?: unknown }).ticketFinalize
            ),
            SheetLink: safeText(
              (stepTraceIds as { SheetLink?: unknown; sheetLink?: unknown }).SheetLink ??
                (stepTraceIds as { sheetLink?: unknown }).sheetLink
            ),
          }
        : null,
    },
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
