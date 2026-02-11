import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDir, "..");
const localizationRoot = join(
  repositoryRoot,
  "App",
  "Resources",
  "Infrastructure",
  "Localization",
);

const suspiciousPatterns = [
  { name: "replacement-char", regex: /\uFFFD/gu },
  { name: "c3-mojibake", regex: /Ã[\u00A0-\u00BF]/gu },
  { name: "c2-mojibake", regex: /Â[\u00A0-\u00BF ]/gu },
  { name: "e2-mojibake", regex: /â[\u0080-\u00FF\u2000-\u203F]/gu },
];

/**
 * Collect files recursively for a given extension.
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
 * Translate a string index to 1-based line and column.
 */
function getLineAndColumn(content, index) {
  const textBefore = content.slice(0, index);
  const lines = textBefore.split(/\r?\n/u);
  const line = lines.length;
  const column = lines[lines.length - 1].length + 1;
  return { line, column };
}

/**
 * Find suspicious encoding markers in a file content.
 */
function findSuspiciousMarkers(content) {
  const findings = [];

  for (const pattern of suspiciousPatterns) {
    pattern.regex.lastIndex = 0;

    let match = pattern.regex.exec(content);
    while (match) {
      const { line, column } = getLineAndColumn(content, match.index);
      findings.push({
        line,
        column,
        marker: match[0],
        type: pattern.name,
      });
      match = pattern.regex.exec(content);
    }
  }

  findings.sort((a, b) => (a.line - b.line) || (a.column - b.column));
  return findings;
}

/**
 * Run encoding guard check for localization resources.
 */
function runCheck() {
  const resxFiles = collectFilesRecursively(localizationRoot, ".resx");
  const allFindings = [];

  for (const filePath of resxFiles) {
    const content = readFileSync(filePath, "utf8");
    const findings = findSuspiciousMarkers(content);
    if (findings.length === 0) {
      continue;
    }

    allFindings.push({
      filePath,
      findings,
    });
  }

  if (allFindings.length === 0) {
    console.log("[ok] RESX encoding guard passed.");
    return;
  }

  console.error("[error] Potential encoding corruption detected in localization files.");
  console.error("[error] The publish/commit is blocked to avoid mojibake in UI texts.");

  for (const fileResult of allFindings) {
    const relativePath = relative(repositoryRoot, fileResult.filePath);
    const sampleFindings = fileResult.findings.slice(0, 8);
    for (const finding of sampleFindings) {
      console.error(
        `- ${relativePath}:${finding.line}:${finding.column} ${finding.type} "${finding.marker}"`,
      );
    }
    if (fileResult.findings.length > sampleFindings.length) {
      console.error(
        `- ${relativePath}: +${fileResult.findings.length - sampleFindings.length} more marker(s)`,
      );
    }
  }

  console.error(
    "[hint] Re-open and save affected .resx files as UTF-8, then run the publish again.",
  );
  process.exitCode = 1;
}

runCheck();
