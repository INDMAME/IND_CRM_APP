import { readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REQUIRED_LOCAL_SKILL = "ind-crm-frontend-guardrails";
const GLOBAL_SKILLS_PATH = "C:\\Users\\marco.meza\\.codex\\skills";
const REFERENCE_CONFIG_FILE = "config.toml";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDir, "..");
const codexRoot = join(repositoryRoot, ".codex");
const localSkillsRoot = join(codexRoot, "skills");
const referencesDir = join(codexRoot, "skills", "ind-crm-frontend-guardrails", "references");

/**
 * Check whether a top-level file should be mirrored into references.
 */
function isReferenceSourceFile(fileName) {
  const normalizedFileName = fileName.toLowerCase();
  return normalizedFileName.endsWith(".md") || normalizedFileName === REFERENCE_CONFIG_FILE;
}

/**
 * Return sorted top-level reference files from a directory.
 */
function getTopLevelReferenceFiles(dirPath) {
  return readdirSync(dirPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isReferenceSourceFile(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

/**
 * Validate that only the required local skill exists in this repository.
 */
function checkLocalSkillLayout() {
  const localSkillDirectories = readdirSync(localSkillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  const hasRequiredSkill = localSkillDirectories.includes(REQUIRED_LOCAL_SKILL);
  const extraSkills = localSkillDirectories.filter((skillName) => skillName !== REQUIRED_LOCAL_SKILL);

  if (!hasRequiredSkill) {
    console.error(
      `[error] Missing local required skill '${REQUIRED_LOCAL_SKILL}' in ${localSkillsRoot}.`,
    );
    return false;
  }

  if (extraSkills.length > 0) {
    console.error(
      `[error] Unexpected local skill(s): ${extraSkills.join(", ")}. Move shared skills to ${GLOBAL_SKILLS_PATH}.`,
    );
    return false;
  }

  return true;
}

/**
 * Compare source and reference markdown files and report drift.
 */
function checkCodexReferenceSync() {
  if (!checkLocalSkillLayout()) {
    process.exitCode = 1;
    return;
  }

  const sourceFiles = getTopLevelReferenceFiles(codexRoot);
  const referenceFiles = getTopLevelReferenceFiles(referencesDir);

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

  console.error("Run: npm run sync:skill:local:references");
  process.exitCode = 1;
}

checkCodexReferenceSync();
