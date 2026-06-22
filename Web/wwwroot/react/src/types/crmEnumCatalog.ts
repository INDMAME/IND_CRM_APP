export type CrmEnumOptionDto = {
  Value?: number | null;
  value?: number | null;
  EnumIndex?: number | null;
  enumIndex?: number | null;
  Label?: string;
  label?: string;
  Description?: string;
  description?: string;
  Active?: boolean;
  active?: boolean;
  SortOrder?: number | null;
  sortOrder?: number | null;
  AxEnumsTableRefRecId?: number | null;
  axEnumsTableRefRecId?: number | null;
};

export type CrmEnumCatalogDto = {
  Company?: string;
  company?: string;
  AppCode?: string;
  appCode?: string;
  AxEnumName?: string;
  axEnumName?: string;
  AxEnumId?: number | null;
  axEnumId?: number | null;
  Found?: boolean;
  found?: boolean;
  Options?: CrmEnumOptionDto[];
  options?: CrmEnumOptionDto[];
};

export type CrmEnumSelectOption = {
  value: string;
  text: string;
  numericValue: number;
  option: CrmEnumOptionDto;
};

export type CrmEnumCatalogResponse = {
  Success?: boolean;
  success?: boolean;
  Message?: string;
  message?: string;
  Total?: number;
  total?: number;
  Page?: number;
  page?: number;
  PageSize?: number;
  pageSize?: number;
  Items?: CrmEnumCatalogDto[];
  items?: CrmEnumCatalogDto[];
  TraceId?: string;
  traceId?: string;
};
