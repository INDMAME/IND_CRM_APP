import { fetchJson, type ApiFetchOptions } from "../../../services/apiService.ts";
import type {
  ExpenseSheetDetailResponse,
  ExpenseSheetHeaderUpdateRequest,
  ExpenseSheetLineDetailResponse,
  ExpenseSheetLineUpdateRequest,
  ExpenseSheetListRequest,
  ExpenseSheetListResponse,
} from "../expenseTypes.ts";

type IndSimpleResponse = {
  success?: boolean;
  message?: string;
};

export type ExpenseSheetCreateRequest = {
  mode?: number;
  existingHojaGastosId?: string | null;
  description: string;
  currencyCode: string;
  exchRate: number;
  projId?: string | null;
  lines: Array<unknown>;
};

export type ExpenseSheetCreateResponse = {
  success?: boolean;
  message?: string;
  errorCode?: string;
  traceId?: string;
  errors?: Array<unknown>;
  data?: {
    hojaGastosId?: string;
    HojaGastosId?: string;
    lineRecIds?: Array<string | number>;
    LineRecIds?: Array<string | number>;
  };
};

type ProjectDropdownResponse = {
  total?: number;
  items?: Array<{ value?: string; text?: string }>;
};

const JSON_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
};

const mergeHeaders = (options?: ApiFetchOptions): HeadersInit => {
  return {
    ...JSON_HEADERS,
    ...(options?.headers || {}),
  };
};

// Loads the expense sheet list using the backend list endpoint.
export const fetchExpenseSheetList = async (
  payload: ExpenseSheetListRequest,
  options?: ApiFetchOptions
): Promise<ExpenseSheetListResponse> => {
  return fetchJson<ExpenseSheetListResponse>("/Gastos/ListExpenseSheets", {
    ...options,
    method: "POST",
    headers: mergeHeaders(options),
    body: JSON.stringify(payload),
  });
};

// Loads one expense sheet header and lines by sheet id.
export const fetchExpenseSheetDetail = async (
  hojaGastosId: string,
  options?: ApiFetchOptions
): Promise<ExpenseSheetDetailResponse> => {
  const safeSheetId = encodeURIComponent(String(hojaGastosId || "").trim());
  return fetchJson<ExpenseSheetDetailResponse>(`/Gastos/GetExpenseSheetDetail?hojaGastosId=${safeSheetId}`, {
    method: "GET",
    ...options,
  });
};

// Loads one expense line detail by sheet id and line id.
export const fetchExpenseSheetLineDetail = async (
  hojaGastosId: string,
  lineRecId: string,
  options?: ApiFetchOptions
): Promise<ExpenseSheetLineDetailResponse> => {
  const safeSheetId = encodeURIComponent(String(hojaGastosId || "").trim());
  const safeLineId = encodeURIComponent(String(lineRecId || "").trim());
  return fetchJson<ExpenseSheetLineDetailResponse>(
    `/Gastos/GetExpenseSheetLineDetail?hojaGastosId=${safeSheetId}&lineRecId=${safeLineId}`,
    {
      method: "GET",
      ...options,
    }
  );
};

// Creates a new expense sheet header.
export const createExpenseSheet = async (
  payload: ExpenseSheetCreateRequest,
  options?: ApiFetchOptions
): Promise<ExpenseSheetCreateResponse> => {
  return fetchJson<ExpenseSheetCreateResponse>("/Gastos/CreateExpenseSheet", {
    ...options,
    method: "POST",
    headers: mergeHeaders(options),
    body: JSON.stringify(payload),
  });
};

// Updates the header fields for an existing expense sheet.
export const updateExpenseSheetHeader = async (
  hojaGastosId: string,
  payload: ExpenseSheetHeaderUpdateRequest,
  options?: ApiFetchOptions
): Promise<IndSimpleResponse> => {
  const safeSheetId = encodeURIComponent(String(hojaGastosId || "").trim());
  return fetchJson<IndSimpleResponse>(`/Gastos/UpdateExpenseSheetHeader/${safeSheetId}`, {
    ...options,
    method: "PUT",
    headers: mergeHeaders(options),
    body: JSON.stringify(payload),
  });
};

// Deletes a full expense sheet by id.
export const deleteExpenseSheet = async (
  hojaGastosId: string,
  options?: ApiFetchOptions
): Promise<IndSimpleResponse> => {
  const safeSheetId = encodeURIComponent(String(hojaGastosId || "").trim());
  return fetchJson<IndSimpleResponse>(`/Gastos/DeleteExpenseSheet/${safeSheetId}`, {
    ...options,
    method: "DELETE",
  });
};

// Updates one expense line; use lineRecId "0" when creating through update endpoint.
export const updateExpenseSheetLine = async (
  hojaGastosId: string,
  lineRecId: string,
  payload: ExpenseSheetLineUpdateRequest,
  options?: ApiFetchOptions
): Promise<IndSimpleResponse> => {
  const safeSheetId = encodeURIComponent(String(hojaGastosId || "").trim());
  const safeLineId = encodeURIComponent(String(lineRecId || "").trim());
  return fetchJson<IndSimpleResponse>(`/Gastos/UpdateExpenseSheetLine/${safeSheetId}/${safeLineId}`, {
    ...options,
    method: "PUT",
    headers: mergeHeaders(options),
    body: JSON.stringify(payload),
  });
};

// Deletes one expense line by sheet id and line id.
export const deleteExpenseSheetLine = async (
  hojaGastosId: string,
  lineRecId: string,
  options?: ApiFetchOptions
): Promise<IndSimpleResponse> => {
  const safeSheetId = encodeURIComponent(String(hojaGastosId || "").trim());
  const safeLineId = encodeURIComponent(String(lineRecId || "").trim());
  return fetchJson<IndSimpleResponse>(`/Gastos/DeleteExpenseSheetLine/${safeSheetId}/${safeLineId}`, {
    ...options,
    method: "DELETE",
  });
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
