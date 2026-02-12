export type ExpenseSheetListFilters = {
  filter?: string;
  billedMode: number;
  fromDate: string;
  toDate: string;
  projectId: string;
  hojaGastosId: string;
  currencyCode: string;
};

// UI payload used by Web controller endpoint /Gastos/ListExpenseSheets.
export type ExpenseSheetListRequest = ExpenseSheetListFilters & {
  page: number;
  pageSize: number;
};

// Upstream API payload contract used by backend adapter.
export type ExpenseSheetListApiRequest = {
  filter?: string;
  billedMode?: number | null;
  createdDateFrom?: string;
  createdDateTo?: string;
  projId?: string;
  currencyCode?: string;
  page: number;
  pageSize: number;
};

export type ExpenseSheetCard = {
  hojaGastosId: string;
  description?: string;
  voucher?: string;
  projId?: string;
  currencyCode?: string;
  totalAmountMST?: number | null;
  createdDate?: string;
  transDate?: string;
  exchRate?: string;
  lineCount?: number;
};

export type ExpenseSheetListResponse = {
  success?: boolean;
  message?: string;
  total?: number;
  page?: number;
  pageSize?: number;
  items?: ExpenseSheetCard[];
};

export type ExpenseSheetHeader = {
  hojaGastosId: string;
  description?: string;
  userId?: string;
  voucher?: string;
  projId?: string;
  currencyCode?: string;
  totalAmountMST?: number | null;
  transDate?: string;
  exchRate?: string;
};

export type ExpenseSheetLine = {
  lineRecId: string;
  transDate?: string;
  typeValue?: string;
  typeValueCode?: string;
  description?: string;
  internacional?: boolean | null;
  ticket?: boolean | null;
  qty?: number | null;
  amount?: number | null;
  projId?: string;
  indAttachFiles?: string;
};

export type ExpenseSheetDetailData = {
  header: ExpenseSheetHeader;
  lines: ExpenseSheetLine[];
};

export type ExpenseSheetDetailResponse = {
  success?: boolean;
  message?: string;
  data?: ExpenseSheetDetailData;
};

export type ExpenseSheetLineDetailData = {
  header: ExpenseSheetHeader;
  line: ExpenseSheetLine;
};

export type ExpenseSheetLineDetailResponse = {
  success?: boolean;
  message?: string;
  data?: ExpenseSheetLineDetailData;
};

// Payload used by /Gastos/UpdateExpenseSheetHeader/{hojaGastosId}.
export type ExpenseSheetHeaderUpdateRequest = {
  description: string;
  currencyCode: string;
  exchRate: number;
  projId?: string | null;
};

// Payload used by /Gastos/UpdateExpenseSheetLine/{hojaGastosId}/{lineRecId}.
export type ExpenseSheetLineUpdateRequest = {
  transDate: string;
  typeValue: number;
  description: string;
  internacional: boolean;
  ticket: boolean;
  qty: number;
  amount: number;
  projId?: string | null;
  indAttachFiles: string;
};

export type ExpenseSheetCreateMode = 0 | 1 | 2;

export type ExpenseSheetCreateLineDraft = {
  localId: string;
  transDate: string;
  typeValueCode: string;
  description: string;
  internacional: boolean;
  ticket: boolean;
  qty: string;
  amount: string;
  projId: string;
  indAttachFiles: string;
};
