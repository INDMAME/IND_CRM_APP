import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDir, "..");
const viewsRoot = join(repositoryRoot, "Web", "Views");
const localizationRoot = join(
  repositoryRoot,
  "App",
  "Resources",
  "Infrastructure",
  "Localization",
);

/**
 * Collect files recursively using extension filtering.
 */
function collectFilesRecursively(dirPath, extension, output = []) {
  const entries = readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      collectFilesRecursively(fullPath, extension, output);
      continue;
    }

    if (entry.isFile() && entry.name.toLowerCase().endsWith(extension)) {
      output.push(fullPath);
    }
  }

  return output;
}

/**
 * Parse all localizer keys used in Razor via SR["KeyName"].
 */
function getUsedRazorLocalizationKeys() {
  const viewFiles = collectFilesRecursively(viewsRoot, ".cshtml");
  const keys = new Set();
  const keyRegex = /SR\["([^"]+)"\]/gu;

  for (const viewPath of viewFiles) {
    const content = readFileSync(viewPath, "utf8");
    keyRegex.lastIndex = 0;
    let match = keyRegex.exec(content);
    while (match) {
      keys.add(match[1]);
      match = keyRegex.exec(content);
    }
  }

  return [...keys].sort((a, b) => a.localeCompare(b));
}

/**
 * Parse data names from one resx file.
 */
function getResxKeys(filePath) {
  const content = readFileSync(filePath, "utf8");
  const keys = new Set();
  const keyRegex = /<data name="([^"]+)"/gu;

  keyRegex.lastIndex = 0;
  let match = keyRegex.exec(content);
  while (match) {
    keys.add(match[1]);
    match = keyRegex.exec(content);
  }

  return keys;
}

/**
 * Validate every used Razor key exists in each INDSharedResource localization file.
 */
function runCheck() {
  const usedKeys = getUsedRazorLocalizationKeys();
  const resxFiles = collectFilesRecursively(localizationRoot, ".resx")
    .filter((filePath) => /INDSharedResource.*\.resx$/u.test(filePath))
    .sort((a, b) => a.localeCompare(b));

  const failures = [];

  for (const resxFilePath of resxFiles) {
    const resxKeys = getResxKeys(resxFilePath);
    const missing = usedKeys.filter((key) => !resxKeys.has(key));
    if (missing.length > 0) {
      failures.push({
        resxFilePath,
        missing,
      });
    }
  }

  if (failures.length === 0) {
    console.log("[ok] Localization key coverage check passed.");
    return;
  }

  console.error("[error] Missing localization keys detected in INDSharedResource files.");
  for (const failure of failures) {
    const rel = relative(repositoryRoot, failure.resxFilePath);
    const preview = failure.missing.slice(0, 12).join(", ");
    const extraCount = failure.missing.length > 12 ? failure.missing.length - 12 : 0;
    console.error(`- ${rel}: ${preview}${extraCount > 0 ? ` (+${extraCount} more)` : ""}`);
  }
  console.error("[hint] Add missing keys in every INDSharedResource*.resx file.");
  process.exitCode = 1;
}

runCheck();
