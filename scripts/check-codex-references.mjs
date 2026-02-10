import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDir, "..");
const codexRoot = join(repositoryRoot, ".codex");
const referencesDir = join(codexRoot, "skills", "ind-crm-codex-guardrails", "references");

/**
 * Return sorted top-level markdown files from a directory.
 */
function getTopLevelMarkdownFiles(dirPath) {
  return readdirSync(dirPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".md"))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

/**
 * Compare source and reference markdown files and report drift.
 */
function checkCodexReferenceSync() {
  const sourceFiles = getTopLevelMarkdownFiles(codexRoot);
  const referenceFiles = getTopLevelMarkdownFiles(referencesDir);

  const sourceSet = new Set(sourceFiles);
  const referenceSet = new Set(referenceFiles);

  const missingInReferences = sourceFiles.filter((fileName) => !referenceSet.has(fileName));
  const staleInReferences = referenceFiles.filter((fileName) => !sourceSet.has(fileName));
  const contentMismatches = [];

  for (const fileName of sourceFiles) {
    if (!referenceSet.has(fileName)) {
      continue;
    }

    const sourcePath = join(codexRoot, fileName);
    const referencePath = join(referencesDir, fileName);
    const sourceContent = readFileSync(sourcePath, "utf8");
    const referenceContent = readFileSync(referencePath, "utf8");

    if (sourceContent !== referenceContent) {
      contentMismatches.push(fileName);
    }
  }

  const hasDrift =
    missingInReferences.length > 0 ||
    staleInReferences.length > 0 ||
    contentMismatches.length > 0;

  if (!hasDrift) {
    console.log("[ok] .codex references are synchronized.");
    return;
  }

  console.error("[error] .codex references are out of sync.");

  if (missingInReferences.length > 0) {
    console.error("- Missing in references:", missingInReferences.join(", "));
  }

  if (staleInReferences.length > 0) {
    console.error("- Stale in references:", staleInReferences.join(", "));
  }

  if (contentMismatches.length > 0) {
    console.error("- Content mismatch:", contentMismatches.join(", "));
  }

  console.error("Run: npm run sync:codex:references");
  process.exitCode = 1;
}

checkCodexReferenceSync();
