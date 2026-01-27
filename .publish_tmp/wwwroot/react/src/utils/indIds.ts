export const indExtractId = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string" || typeof value === "number") return String(value).trim();
  if (typeof value === "object") {
    const candidate =
      (value as any).recId ??
      (value as any).RecId ??
      (value as any).id ??
      (value as any).Id ??
      (value as any).value ??
      (value as any).Value;
    if (typeof candidate === "string" || typeof candidate === "number") return String(candidate).trim();
  }
  return "";
};

export const indExtractNumericId = (value: unknown, depth = 0): string => {
  if (depth > 3) return "";
  if (value === null || value === undefined) return "";
  if (typeof value === "number" && Number.isFinite(value)) return String(Math.trunc(value));
  if (typeof value === "string") {
    const raw = value.trim();
    if (!raw) return "";
    if (/^\d+$/.test(raw)) return raw;
    const m = raw.match(/(\d{3,})/);
    return m ? m[1] : "";
  }
  if (typeof value !== "object") return "";
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = indExtractNumericId(item, depth + 1);
      if (found) return found;
    }
    return "";
  }

  const keys = [
    "recId",
    "RecId",
    "refRecIdActividad",
    "RefRecIdActividad",
    "actividadRecId",
    "ActividadRecId",
    "id",
    "Id",
    "value",
    "Value",
    "result",
    "Result",
    "data",
    "Data",
    "message",
    "Message",
  ];

  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(value, k)) {
      const found = indExtractNumericId((value as any)[k], depth + 1);
      if (found) return found;
    }
  }

  for (const v of Object.values(value as Record<string, unknown>)) {
    const found = indExtractNumericId(v, depth + 1);
    if (found) return found;
  }

  return "";
};

export const indExtractSignedId = (value: unknown, depth = 0): string => {
  if (depth > 3) return "";
  if (value === null || value === undefined) return "";
  if (typeof value === "number" && Number.isFinite(value)) return String(Math.trunc(value));
  if (typeof value === "string") {
    const raw = value.trim();
    if (!raw) return "";
    const match = raw.match(/-?\d{3,}/);
    return match ? match[0] : "";
  }
  if (typeof value !== "object") return "";
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = indExtractSignedId(item, depth + 1);
      if (found) return found;
    }
    return "";
  }

  const keys = [
    "recId",
    "RecId",
    "refRecIdActividad",
    "RefRecIdActividad",
    "actividadRecId",
    "ActividadRecId",
    "message",
    "Message",
    "result",
    "Result",
    "data",
    "Data",
  ];

  for (const k of keys) {
    if (Object.prototype.hasOwnProperty.call(value, k)) {
      const found = indExtractSignedId((value as any)[k], depth + 1);
      if (found) return found;
    }
  }

  for (const v of Object.values(value as Record<string, unknown>)) {
    const found = indExtractSignedId(v, depth + 1);
    if (found) return found;
  }

  return "";
};
