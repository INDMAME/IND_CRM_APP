export type ExpenseStatusCode = 0 | 1 | 2 | 3 | 4;
export type ExpenseStatusFilterCode = ExpenseStatusCode | 5;
export type ExpenseExchangeRateModeCode = 0 | 1;
export type ExpenseSheetCreateMode = 0 | 1 | 2;
export type ExpenseGastoTypeCode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 14;

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
  AllowSelfManagement: boolean;
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

// /api/crm/expensesheets/subordinates item contract.
export type ExpenseSheetSubordinateDto = {
  UserId: string;
  Name: string;
};

// /api/system/exchange-rate response contract.
export type ExchangeRateDto = {
  BaseCurrency: string;
  TargetCurrency: string;
  Rate: number;
  Date: string;
  Source: string;
};

// /api/crm/expensesheets/fuel-price-km response contract.
export type FuelPriceKmDto = {
  PriceKm: number | null;
  Source: string;
  TransDate: string;
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
  expenseSheetStatus?: number | null;
};

// /api/crm/expensesheets/list item contract.
export type ExpenseSheetListItemDto = {
  HojaGastosId: string;
  Description: string;
  ExpenseSheetStatus: number | null;
  EstadoComentarios: string | null;
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
  FileId: string;
  Ticket: boolean | null;
  Price: number | null;
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
  EstadoComentarios: string | null;
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
  fileId?: string;
  ticket: boolean;
  qty: number;
  price: number;
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

// /api/ia/service/expensefromticket response contract.
export type ExpenseSheetDraftResponse = ExpenseSheetCreateRequest & {
  gastoType?: ExpenseGastoTypeCode | null;
  Confidence?: number | null;
  Warnings?: string[] | null;
  RawCurrency?: string | null;
  Merchant?: string | null;
  TicketCreation?: ExpenseSheetDraftTicketCreationResult | null;
};

export type ExpenseSheetDraftTicketCreationResult = {
  Persisted?: boolean;
  ProcessedByAI?: boolean;
  FileId?: string;
  TicketRecId?: string;
  LineRecIds?: Array<number | string>;
  UrlFile?: string;
  FileName?: string;
  FileNameFinalized?: boolean;
  Message?: string;
};

// /api/crm/expensesheets/{hojaGastosId} update header request contract.
export type ExpenseSheetHeaderUpdateRequest = {
  description: string;
  currencyCode: string;
  exchRate: number;
  projId?: string;
  expenseSheetStatus?: number;
  exchangeRateMode?: number;
  estadoComentarios?: string;
};

// /api/crm/expensesheets/{hojaGastosId}/lines/{lineRecId} update line request contract.
export type ExpenseSheetLineUpdateRequest = {
  transDate: string;
  typeValue: number;
  description: string;
  internacional: boolean;
  fileId?: string;
  ticket: boolean;
  qty: number;
  price: number;
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
  estadoComentarios?: string | null;
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
  estadoComentarios?: string | null;
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
  fileId?: string;
  ticket?: boolean | null;
  price?: number | null;
  qty?: number | null;
  amount?: number | null;
  projId?: string;
  indAttachFiles?: string;
};

export type ExpenseSheetTicketListRequest = {
  page: number;
  pageSize: number;
  createdDateFrom?: string;
  createdDateTo?: string;
  searchKey?: string;
  filter?: string;
  status?: 0 | 1 | null;
  currencyCode?: string;
  gastoType?: ExpenseGastoTypeCode | null;
  processedByAI?: boolean | null;
};

export type ExpenseSheetTicketLineRequest = {
  description: string;
  qty: number;
  price: number;
  totalAmount?: number;
};

export type ExpenseSheetTicketCreateRequest = {
  mode: 0 | 1 | 2;
  existingFileId?: string;
  description?: string;
  currencyCode?: string;
  totalAmount?: number;
  status?: number;
  transDate?: string;
  comentario?: string;
  urlFile?: string;
  fileName?: string;
  fileExtension?: string;
  processedByAI?: boolean;
  gastoType?: ExpenseGastoTypeCode;
  lines?: ExpenseSheetTicketLineRequest[] | null;
};

export type ExpenseSheetTicketUpdateRequest = {
  description?: string;
  currencyCode?: string;
  totalAmount?: number;
  status?: number;
  transDate?: string;
  comentario?: string;
  urlFile?: string;
  fileName?: string;
  processedByAI?: boolean;
  fileExtension?: string;
  gastoType?: ExpenseGastoTypeCode;
};

export type ExpenseSheetTicketIaRequest = {
  gastoType?: ExpenseGastoTypeCode;
  [key: string]: unknown;
};

export type ExpenseSheetTicketLineDto = {
  RecId: string;
  Description: string;
  Qty: number | null;
  Price: number | null;
  TotalAmount: number | null;
  RefRecIdTable: string;
  CreatedByUserId: string;
};

export type ExpenseSheetTicketListItemDto = {
  FileId: string;
  Description: string;
  Status: number | null;
  HojaGastosIdDisplay: string;
  ProcessedByAI: boolean | null;
  CurrencyCode: string;
  TotalAmount: number | null;
  CreatedByUserId: string;
  TransDate: string;
  UrlFile: string;
  FileName: string;
  GastoType: ExpenseGastoTypeCode | null;
};

export type ExpenseSheetTicketDetailDto = {
  FileId: string;
  Description: string;
  Status: number | null;
  HojaGastosIdDisplay: string;
  ProcessedByAI: boolean | null;
  CurrencyCode: string;
  TotalAmount: number | null;
  CreatedByUserId: string;
  TransDate: string;
  Comentario: string;
  UrlFile: string;
  FileName: string;
  GastoType: ExpenseGastoTypeCode | null;
  Lines: ExpenseSheetTicketLineDto[];
};

export type ExpenseSheetCreateLineDraft = {
  localId: string;
  transDate: string;
  typeValueCode: string;
  description: string;
  internacional: boolean;
  ticket: boolean;
  qty: string;
  price: string;
  projId: string;
  indAttachFiles: string;
};
