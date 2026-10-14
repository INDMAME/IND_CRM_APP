import { ApiFetchError } from "../../../services/apiService.ts";
import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseSheetListApiRequest, ExpenseSheetListResponseEnvelope } from "../expenseTypes.ts";
import { normalizeListPagedResponse } from "./expenseApiResponseNormalizers.ts";

// These limits match CrmExpenseSheetsController and INDExpenseSheetsAiController.
const SOURCE_PAGE_SIZE = 50;
const MAX_SOURCE_RECORDS = 6000;
const MAX_SOURCE_BYTES = 4 * 1024 * 1024;

// Rejects oversized data explicitly instead of analyzing an incomplete query.
export const assertExpenseAssistantSourceSize = (value: unknown, recordCount = 0): void => {
  if (recordCount > MAX_SOURCE_RECORDS || new TextEncoder().encode(JSON.stringify(value)).byteLength > MAX_SOURCE_BYTES) {
    throw new ApiFetchError(indT("ExpenseSheets_Assistant_SourceTooLarge", "Narrow the filters before asking: the assistant supports up to 6000 expense sheets and 4 MB of data."), 400);
  }
};

// Stops when a paged query changes during extraction rather than returning missing or duplicate rows.
const throwChangedQuery = (): never => {
  throw new ApiFetchError(indT("ExpenseSheets_Assistant_SourceChanged", "The expense list changed while loading. Refresh the list and try again."), 409);
};

// Loads the entire query with the API page size, preserving complete single-page snapshots.
export const loadExpenseAssistantSource = async (
  payload: ExpenseSheetListApiRequest,
  seed: ExpenseSheetListResponseEnvelope | null | undefined,
  fetchPage: (request: ExpenseSheetListApiRequest) => Promise<ExpenseSheetListResponseEnvelope>,
  signal?: AbortSignal
): Promise<ExpenseSheetListResponseEnvelope> => {
  const checkResponse = (response: ExpenseSheetListResponseEnvelope): void => {
    if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
    if (response.Success === false) throw new ApiFetchError(response.Message || "Could not load expense sheets.");
    assertExpenseAssistantSourceSize(response, Number(response.Total));
  };
  if (seed) {
    checkResponse(seed);
    if (Number(seed.Total) === seed.Items.length && Number(seed.Page) === 1) {
      return { ...seed, Items: [...seed.Items] };
    }
  }

  // A different page size changes offsets, so the visible page cannot seed this extraction.
  const first = await fetchPage({ ...payload, page: 1, pageSize: SOURCE_PAGE_SIZE });
  checkResponse(first);
  const total = Number(first.Total);
  const pageSize = Number(first.PageSize);
  if (!Number.isInteger(total) || total < 0 || !Number.isInteger(pageSize) || pageSize < 1 || pageSize > SOURCE_PAGE_SIZE) {
    return throwChangedQuery();
  }
  const items: ExpenseSheetListResponseEnvelope["Items"] = [];
  const ids = new Set<string>();
  let sourceBytes = 0;
  const appendPage = (response: ExpenseSheetListResponseEnvelope, page: number): void => {
    checkResponse(response);
    const expectedRows = Math.min(pageSize, Math.max(0, total - (page - 1) * pageSize));
    if (Number(response.Total) !== total || Number(response.Page) !== page || Number(response.PageSize) !== pageSize || response.Items.length !== expectedRows) {
      throwChangedQuery();
    }
    for (const item of response.Items) {
      const id = String(item.HojaGastosId || "").trim();
      if (id && ids.has(id)) throwChangedQuery();
      if (id) ids.add(id);
      sourceBytes += new TextEncoder().encode(JSON.stringify(item)).byteLength;
      if (sourceBytes > MAX_SOURCE_BYTES) assertExpenseAssistantSourceSize(null, MAX_SOURCE_RECORDS + 1);
      items.push(item);
    }
  };
  appendPage(first, 1);
  for (let page = 2; page <= Math.ceil(total / pageSize); page += 1) {
    if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
    appendPage(await fetchPage({ ...payload, page, pageSize }), page);
  }
  const result = { ...first, Total: total, Page: 1, Items: items };
  assertExpenseAssistantSourceSize(result, items.length);
  return result;
};

// Identifies one business query independently of the visible pagination controls.
export const getExpenseAssistantQueryKey = (payload: ExpenseSheetListApiRequest, userId: string, scope: string): string => {
  const filters = Object.fromEntries(Object.entries(payload).filter(([key]) => key !== "page" && key !== "pageSize").sort(([left], [right]) => left.localeCompare(right)));
  return JSON.stringify([scope, userId, filters]);
};

// Reuses a full snapshot only while the current page still agrees with its content.
export const expenseAssistantSourceMatchesPage = (source: ExpenseSheetListResponseEnvelope, page: ExpenseSheetListResponseEnvelope): boolean => {
  if (page.Success === false || Number(source.Total) !== Number(page.Total)) return false;
  const byId = new Map(source.Items.map((item) => [item.HojaGastosId, item]));
  return normalizeListPagedResponse(page).Items.every((item) => {
    const cached = byId.get(item.HojaGastosId);
    return cached !== undefined && JSON.stringify(cached) === JSON.stringify(item);
  });
};

// Holds one short-lived complete query and cancels obsolete extraction work.
export const createExpenseAssistantSourceCache = () => {
  let activeKey = "";
  let cached: { response: ExpenseSheetListResponseEnvelope; expiresAt: number } | null = null;
  let pending: { controller: AbortController; promise: Promise<ExpenseSheetListResponseEnvelope> } | null = null;

  const selectQuery = (queryKey: string): void => {
    if (activeKey === queryKey) return;
    activeKey = queryKey;
    cached = null;
    pending?.controller.abort();
    pending = null;
  };

  const load = (
    queryKey: string,
    page: ExpenseSheetListResponseEnvelope,
    fetchSource: (signal: AbortSignal) => Promise<ExpenseSheetListResponseEnvelope>
  ): Promise<ExpenseSheetListResponseEnvelope> => {
    selectQuery(queryKey);
    if (cached && cached.expiresAt > Date.now() && expenseAssistantSourceMatchesPage(cached.response, page)) {
      return Promise.resolve(cached.response);
    }
    cached = null;
    if (pending) return pending.promise;
    const controller = new AbortController();
    const promise = Promise.resolve().then(() => fetchSource(controller.signal)).then((response) => {
      if (controller.signal.aborted || activeKey !== queryKey) throw new DOMException("Aborted", "AbortError");
      cached = { response, expiresAt: Date.now() + 2 * 60 * 1000 };
      return response;
    });
    pending = { controller, promise };
    const clearPending = () => {
      if (pending?.promise === promise) pending = null;
    };
    void promise.then(clearPending, clearPending);
    return promise;
  };

  return { selectQuery, load, clear: () => selectQuery("") };
};
