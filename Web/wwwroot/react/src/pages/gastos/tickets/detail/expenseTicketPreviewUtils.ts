import { safeText } from "../../utils/expenseUiUtils.ts";

const IMAGE_EXTENSIONS = new Set<string>(["jpg", "jpeg", "png", "webp", "gif", "bmp", "heic", "heif", "avif"]);

const getFileExtensionFromPath = (value: string): string => {
  const source = safeText(value).toLowerCase();
  if (!source) return "";

  const withoutQuery = source.split("?")[0].split("#")[0];
  const parts = withoutQuery.split(".");
  if (parts.length < 2) return "";

  const rawExt = safeText(parts[parts.length - 1]).replace(/[^a-z0-9]/g, "");
  return rawExt === "jpeg" ? "jpg" : rawExt;
};

// Detects whether one ticket source can render as an inline image preview.
export const hasExpenseTicketImagePreviewSource = (urlValue: string): boolean => {
  const normalizedUrl = safeText(urlValue);
  if (!normalizedUrl) return false;

  if (normalizedUrl.toLowerCase().startsWith("data:image/")) return true;

  const extension = getFileExtensionFromPath(normalizedUrl);
  if (extension && IMAGE_EXTENSIONS.has(extension)) return true;

  const normalizedLower = normalizedUrl.toLowerCase();
  if (normalizedLower.includes("blob.core.windows.net") && normalizedLower.includes("image")) return true;

  return false;
};
