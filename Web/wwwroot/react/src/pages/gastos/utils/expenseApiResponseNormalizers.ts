import type {
  ExpenseSheetCurrencyDto,
  ExpenseSheetDetailDto,
  ExpenseSheetSubordinateDto,
  ExpenseSheetTicketDetailDto,
  ExpenseSheetTicketListItemDto,
  ExpenseSheetListItemDto,
  IndApiResponse,
  IndPagedResponse,
} from "../expenseTypes.ts";
import { safeText, toNullableBool, toNullableGastoTypeCode, toNullableTicketStatusCode } from "./expenseApiTransforms.ts";
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
    HojaGastosIdDisplay: safeText(
      (item as { HojaGastosIdDisplay?: unknown; hojaGastosIdDisplay?: unknown })?.HojaGastosIdDisplay ??
        (item as { HojaGastosIdDisplay?: unknown; hojaGastosIdDisplay?: unknown })?.hojaGastosIdDisplay
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
