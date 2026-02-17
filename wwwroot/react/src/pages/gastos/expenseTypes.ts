export type ExpenseStatusCode = 0 | 1 | 2 | 3 | 4;
export type ExpenseStatusFilterCode = ExpenseStatusCode | 5;
export type ExpenseExchangeRateModeCode = 0 | 1;
export type ExpenseSheetCreateMode = 0 | 1 | 2;

// Shared validation envelope item used by IndApiResponse errors.
export type IndValidationError = {
  Field: string;
  Message: string;
};

// Standard command envelope returned by IND_CRM_API.
export type IndApiResponse<T> = {
  Success: boolean;
  Message: string | null;
  ErrorCode?: string | null;
  Data?: T | null;
  Errors?: IndValidationError[] | null;
  TraceId?: string;
};

// Error envelope returned by API failures.
export type IndApiError = {
  Success: false;
  Message: string;
  ErrorCode?: string;
  Errors?: IndValidationError[];
  TraceId?: string;
};

// Standard paged envelope returned by IND_CRM_API.
export type IndPagedResponse<T> = {
  Success: boolean;
  Message: string;
  Total?: number | null;
  Page?: number | null;
  PageSize?: number | null;
  Items: T[];
  TraceId?: string;
};

// /api/auth/entra/context request contract.
export type EntraContextRequest = {
  entraOid: string;
  appCode: string;
};

export type EntraContextModuleDto = {
  ModuleCode: string;
  Description: string;
  IsActive: boolean;
  AccessRightsInt: number;
};

export type EntraContextCompanyDto = {
  CompanyId: string;
  IsDefault: boolean;
  CompanyName: string;
  CurrencyCode: string;
  Modules: EntraContextModuleDto[];
};

export type EntraContextHeaderDto = {
  Success: boolean;
  Message: string;
  AxUserId: string;
  UserActive: boolean;
  AppActive: boolean;
  DefaultCompany: string;
  DefaultCurrencyCode: string;
};

export type EntraContextDto = {
  Header: EntraContextHeaderDto;
  Companies: EntraContextCompanyDto[];
};

// /api/crm/expensesheets/currencies item contract.
export type ExpenseSheetCurrencyDto = {
  CurrencyCode: string;
  CurrencyCodeISO: string;
};

// /api/system/exchange-rate response contract.
export type ExchangeRateDto = {
  BaseCurrency: string;
  TargetCurrency: string;
  Rate: number;
  Date: string;
  Source: string;
};

// /api/crm/expensesheets/list request contract.
export type ExpenseSheetListApiRequest = {
  filter: string;
  page: number;
  pageSize: number;
  billedMode?: 0 | 1 | 2;
  createdDateFrom?: string;
  createdDateTo?: string;
  projId?: string;
  currencyCode?: string;
  expenseSheetStatus?: number;
};

// /api/crm/expensesheets/list item contract.
export type ExpenseSheetListItemDto = {
  HojaGastosId: string;
  Description: string;
  ExpenseSheetStatus: number | null;
  UserId: string | null;
  Voucher: string;
  ProjId: string;
  CurrencyCode: string;
  TotalAmount: number | null;
  ExchRate: number | null;
  ExchangeRateMode: number | null;
  CreatedDate: string | null;
};

// /api/crm/expensesheets/{hojaGastosId} line contract.
export type ExpenseSheetLineDto = {
  RecId: string;
  TransDate: string;
  TypeValue: number | null;
  Description: string;
  Internacional: boolean | null;
  Ticket: boolean | null;
  Qty: number | null;
  Amount: number | null;
  ProjId: string;
  IndAttachFiles: string;
};

// /api/crm/expensesheets/{hojaGastosId} detail contract.
export type ExpenseSheetDetailDto = {
  HojaGastosId: string;
  UserId: string;
  Description: string;
  ExpenseSheetStatus: number | null;
  CurrencyCode: string;
  TotalAmount: number | null;
  ExchRate: number | null;
  ExchangeRateMode: number | null;
  ProjId: string;
  Voucher: string;
  CreatedDate: string | null;
  Lines: ExpenseSheetLineDto[];
};

export type ExpenseSheetCreateLineRequest = {
  transDate: string;
  typeValue: number;
  description: string;
  internacional: boolean;
  ticket: boolean;
  qty: number;
  amount: number;
  projId?: string;
  indAttachFiles?: string;
};

// /api/crm/expensesheets create request contract.
export type ExpenseSheetCreateRequest = {
  userId?: string;
  mode?: ExpenseSheetCreateMode;
  existingHojaGastosId?: string;
  description?: string;
  currencyCode?: string;
  exchRate?: number;
  projId?: string;
  expenseSheetStatus?: number;
  exchangeRateMode?: number;
  lines?: ExpenseSheetCreateLineRequest[] | null;
};

export type ExpenseSheetCreateResponseData = {
  HojaGastosId: string;
  LineRecIds: number[];
};

// /api/crm/expensesheets/{hojaGastosId} update header request contract.
export type ExpenseSheetHeaderUpdateRequest = {
  description: string;
  currencyCode: string;
  exchRate: number;
  projId?: string;
  expenseSheetStatus?: number;
  exchangeRateMode?: number;
};

// /api/crm/expensesheets/{hojaGastosId}/lines/{lineRecId} update line request contract.
export type ExpenseSheetLineUpdateRequest = {
  transDate: string;
  typeValue: number;
  description: string;
  internacional: boolean;
  ticket: boolean;
  qty: number;
  Amount: number;
  projId?: string;
  indAttachFiles?: string;
};

// /api/crm/expensesheets/{hojaGastosId}/lines/{lineRecId} update line response contract.
export type ExpenseSheetLineUpdateResponseData = {
  HojaGastosId: string;
  LineRecId: number;
};

// UI filter state used by list page.
export type ExpenseSheetListFilters = {
  filter?: string;
  statusFilter: ExpenseStatusFilterCode;
  exchangeRateMode: ExpenseExchangeRateModeCode | null;
  fromDate: string;
  toDate: string;
  projectId: string;
  hojaGastosId: string;
  currencyCode: string;
};

// UI model used by list cards.
export type ExpenseSheetCard = {
  hojaGastosId: string;
  description?: string;
  expenseSheetStatus?: number | null;
  userId?: string;
  voucher?: string;
  projId?: string;
  currencyCode?: string;
  totalAmount?: number | null;
  exchRate?: number | null;
  exchangeRateMode?: number | null;
  createdDate?: string;
};

// UI model used by detail header.
export type ExpenseSheetHeader = {
  hojaGastosId: string;
  description?: string;
  userId?: string;
  expenseSheetStatus?: number | null;
  currencyCode?: string;
  totalAmount?: number | null;
  exchRate?: string;
  exchangeRateMode?: number | null;
  projId?: string;
  voucher?: string;
  createdDate?: string;
};

// UI model used by line detail components.
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
