import { isNoDataRow, isNoDataText } from "./noData.ts";

export type AccountItem = {
  value: string;
  text: string;
  cargo?: string;
  empresa?: string;
};

export const mapAccountItem = (item: unknown): AccountItem | null => {
  if (isNoDataRow(item)) return null;
  if (Array.isArray(item)) {
    const code = (item[0] || "").toString().trim();
    const desc = (item[2] || (item as any)[1] || "").toString().trim();
    if (!code || isNoDataText(code) || isNoDataText(desc)) return null;
    const text = desc ? `${desc} (${code})` : code;
    return {
      value: code,
      text,
      cargo: "",
      empresa: item[2] as string,
    };
  }
  if (item && typeof item === "object") {
    const raw = item as any;
    const code = (raw.accountNum || raw.AccountNum || "").toString().trim();
    const desc = (raw.nombreComercial || raw.NombreComercial || raw.razonSocial || raw.RazonSocial || "")
      .toString()
      .trim();
    if (!code || isNoDataText(code) || isNoDataText(desc)) return null;
    const text = desc ? `${desc} (${code})` : code;
    return { value: code, text };
  }
  return null;
};
