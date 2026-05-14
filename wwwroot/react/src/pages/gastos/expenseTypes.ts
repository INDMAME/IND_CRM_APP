export type ExpenseStatusCode = 0 | 1 | 2 | 3 | 4;
export type ExpenseStatusFilterCode = ExpenseStatusCode | 5;
export type ExpenseExchangeRateModeCode = 0 | 1;
export type ExpenseSheetCreateMode = 0 | 1 | 2;
export type ExpenseGastoTypeCode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 14;
// Backend date contract for gastos/tickets:
// request accepts DDMMYYYY or DD.MM.YYYY, response returns DD.MM.YYYY.
export type ExpenseApiDate = string;

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
  entraOid?: string;
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
  crmUserId?: string;
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
  crmUserId: string;
  axUserId: string;
  name: string;
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
  TransDate: ExpenseApiDate;
};

// /api/crm/expensesheets/list request contract.
export type ExpenseSheetListApiRequest = {
  filter: string;
  page: number;
  pageSize: number;
  billedMode?: 0 | 1 | 2;
  createdDateFrom?: ExpenseApiDate;
  createdDateTo?: ExpenseApiDate;
  projId?: string;
  currencyCode?: string;
  expenseSheetStatus?: number | null;
  includeSubordinates?: boolean;
};

// /api/crm/expensesheets/list item contract.
export type ExpenseSheetListItemDto = {
  HojaGastosId: string;
  Description: string;
  ExpenseSheetStatus: number | null;
  EstadoComentarios: string | null;
  UserId: string | null;
  UserName: string | null;
  Voucher: string;
  ProjId: string;
  CurrencyCode: string;
  TotalAmount: number | null;
  ExchRate: number | null;
  ExchangeRateMode: number | null;
  CreatedDate: ExpenseApiDate | null;
};

export type ExpenseSheetListResponseEnvelope = IndPagedResponse<ExpenseSheetListItemDto>;

export type ExpenseSheetsAskSourceJson = Record<string, unknown> | unknown[];

export type ExpenseSheetsAskRequest = {
  question: string;
  answerInstructions?: string;
  listRequest: ExpenseSheetListApiRequest;
  sourceJson?: ExpenseSheetsAskSourceJson | null;
};

export type ExpenseSheetsAskResponseData = {
  Answer: string;
  Model: string;
  SourceKey: string;
  FiltersApplied?: Record<string, unknown> | null;
  TotalSourceRecords?: number | null;
  RecordsSentToModel?: number | null;
  RetrievalMode?: string | null;
  Truncated?: boolean | null;
  Warnings?: string[] | null;
};

export type ExpenseSheetsAskResult = IndApiResponse<ExpenseSheetsAskResponseData> & {
  HttpStatus?: number;
  RetryAfter?: string | null;
};

// /api/crm/expensesheets/{hojaGastosId} line contract.
export type ExpenseSheetLineDto = {
  RecId: string;
  LineRecId?: string;
  TransDate: ExpenseApiDate;
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
  CreatedDate: ExpenseApiDate | null;
  Lines: ExpenseSheetLineDto[];
};

export type ExpenseSheetCreateLineRequest = {
  transDate: ExpenseApiDate;
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

export type ExpenseSheetTicketQuickCreateRequest = {
  ticketImage: File | Blob;
  currencyCode?: string;
  description?: string;
  comentario?: string;
  existingHojaGastosId?: string;
  projectId?: string;
};

export type ExpenseSheetTicketQuickCreateCompletedStage =
  | "ticket-created"
  | "file-uploaded"
  | "draft-extracted"
  | "ticket-finalized"
  | "sheet-linked";

export type ExpenseSheetTicketQuickCreateStepTraceIds = {
  TicketCreate?: string;
  FileUpload?: string;
  DraftExtract?: string;
  TicketFinalize?: string;
  SheetLink?: string;
};

export type ExpenseSheetTicketQuickCreateResponseData = {
  FileId: string;
  UrlFile: string;
  FileName: string;
  ProcessedByAI?: boolean | null;
  LinkedToSheet: boolean;
  HojaGastosId?: string | null;
  CompletedStage: ExpenseSheetTicketQuickCreateCompletedStage | string;
  StepTraceIds?: ExpenseSheetTicketQuickCreateStepTraceIds | null;
};

export type ExpenseSheetTicketQuickCreateResult = IndApiResponse<ExpenseSheetTicketQuickCreateResponseData> & {
  HttpStatus?: number;
  RetryAfter?: string | null;
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
  transDate: ExpenseApiDate;
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
  managedUserId: string;
  includeSubordinates: boolean;
};

// UI model used by list cards.
export type ExpenseSheetCard = {
  hojaGastosId: string;
  description?: string;
  expenseSheetStatus?: number | null;
  estadoComentarios?: string | null;
  userId?: string;
  userName?: string | null;
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
  transDate?: ExpenseApiDate;
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
  createdDateFrom?: ExpenseApiDate;
  createdDateTo?: ExpenseApiDate;
  searchKey?: string;
  filter?: string;
  status?: 0 | 1 | null;
  currencyCode?: string;
  gastoType?: ExpenseGastoTypeCode | null;
  processedByAI?: boolean | null;
};

export type ExpenseSheetTicketLinkListRequest = {
  page: number;
  pageSize: number;
  createdDateFrom?: ExpenseApiDate;
  createdDateTo?: ExpenseApiDate;
  searchKey?: string;
  filter?: string;
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
  transDate?: ExpenseApiDate;
  ticketDate?: ExpenseApiDate;
  ticketTime?: string;
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
  ticketDate?: string;
  ticketTime?: string;
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
  ProcessedByAI: boolean | null;
  CurrencyCode: string;
  TotalAmount: number | null;
  TransDate: ExpenseApiDate;
  TicketDate: ExpenseApiDate;
  TicketTime: string;
  FileName: string;
  GastoType: ExpenseGastoTypeCode | null;
};

export type ExpenseSheetTicketLinkListItemDto = {
  FileId: string;
  Description: string;
  ProcessedByAI: boolean | null;
  CurrencyCode: string;
  TotalAmount: number | null;
  TransDate: ExpenseApiDate;
  TicketDate: ExpenseApiDate;
  TicketTime: string;
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
  TransDate: ExpenseApiDate;
  TicketDate: ExpenseApiDate;
  TicketTime: string;
  Comentario: string;
  UrlFile: string;
  FileName: string;
  GastoType: ExpenseGastoTypeCode | null;
  Lines: ExpenseSheetTicketLineDto[];
};

export type ExpenseSheetTicketLinkBulkIssueDto = {
  ticketId: string;
  reason: string;
};

export type ExpenseSheetTicketLinkBulkFilters = {
  searchKey?: string;
  filter?: string;
  createdDateFrom?: ExpenseApiDate;
  createdDateTo?: ExpenseApiDate;
  currencyCode?: string;
  gastoType?: ExpenseGastoTypeCode | null;
  processedByAI?: boolean | null;
};

export type ExpenseSheetTicketLinkBulkRequest = {
  expenseSheetId: string;
  selectionMode?: "selected" | "filtered";
  ticketIds?: string[];
  filters?: ExpenseSheetTicketLinkBulkFilters | null;
  excludedIds?: string[];
};

export type ExpenseSheetTicketLinkBulkResultDto = {
  expenseSheetId: string;
  requestedCount: number;
  linkedCount: number;
  skippedCount: number;
  failedCount: number;
  linkedTicketIds: string[];
  skipped: ExpenseSheetTicketLinkBulkIssueDto[];
  failed: ExpenseSheetTicketLinkBulkIssueDto[];
};

export type ExpenseSheetCreateLineDraft = {
  localId: string;
  transDate: ExpenseApiDate;
  typeValueCode: string;
  description: string;
  internacional: boolean;
  ticket: boolean;
  qty: string;
  price: string;
  projId: string;
  indAttachFiles: string;
};
