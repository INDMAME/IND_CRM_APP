import { copyFileSync, mkdirSync, readdirSync, rmSync, watch } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const WATCH_FLAG = "--watch";
const DEBOUNCE_MS = 200;
const REQUIRED_LOCAL_SKILL = "ind-crm-frontend-guardrails";
const GLOBAL_SKILLS_PATH = "C:\\Users\\marco.meza\\.codex\\skills";
const REFERENCE_CONFIG_FILE = "config.toml";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDir, "..");
const codexRoot = join(repositoryRoot, ".codex");
const localSkillsRoot = join(codexRoot, "skills");
const referencesDir = join(localSkillsRoot, REQUIRED_LOCAL_SKILL, "references");

/**
 * Return top-level local skill directory names from .codex/skills.
 */
function getLocalSkillNames() {
  return readdirSync(localSkillsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

/**
 * Enforce that this repository keeps only the required local guardrail skill.
 */
function assertLocalSkillLayout() {
  const localSkillNames = getLocalSkillNames();
  const hasRequiredSkill = localSkillNames.includes(REQUIRED_LOCAL_SKILL);
  const extraSkills = localSkillNames.filter((skillName) => skillName !== REQUIRED_LOCAL_SKILL);

  if (!hasRequiredSkill) {
    throw new Error(
      `[layout] Missing local required skill '${REQUIRED_LOCAL_SKILL}' in ${localSkillsRoot}.`,
    );
  }

  if (extraSkills.length > 0) {
    const listedSkills = extraSkills.join(", ");
    throw new Error(
      `[layout] Unexpected local skill(s): ${listedSkills}. Move shared skills to ${GLOBAL_SKILLS_PATH}.`,
    );
  }
}

/**
 * Check whether a top-level .codex file should be mirrored into references.
 */
function isReferenceSourceFile(fileName) {
  const normalizedFileName = fileName.toLowerCase();
  return normalizedFileName.endsWith(".md") || normalizedFileName === REFERENCE_CONFIG_FILE;
}

/**
 * Return top-level source files from .codex that should be mirrored.
 */
function getSourceReferenceFiles() {
  return readdirSync(codexRoot, { withFileTypes: true })
    .filter((entry) => entry.isFile() && isReferenceSourceFile(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

/**
 * Copy root .codex reference files to the local skill references folder and remove stale copies.
 */
function syncOnce() {
  assertLocalSkillLayout();
  mkdirSync(referencesDir, { recursive: true });

  const sourceFiles = getSourceReferenceFiles();
  const sourceSet = new Set(sourceFiles);

  let copiedCount = 0;
  for (const fileName of sourceFiles) {
    const sourcePath = join(codexRoot, fileName);
    const destinationPath = join(referencesDir, fileName);
    copyFileSync(sourcePath, destinationPath);
    copiedCount += 1;
    console.log(`[sync] ${fileName}`);
  }

  let removedCount = 0;
  const referenceEntries = readdirSync(referencesDir, { withFileTypes: true });
  for (const entry of referenceEntries) {
    if (!entry.isFile() || !isReferenceSourceFile(entry.name)) {
      continue;
    }

    if (!sourceSet.has(entry.name)) {
      rmSync(join(referencesDir, entry.name), { force: true });
      removedCount += 1;
      console.log(`[remove] ${entry.name}`);
    }
  }

  console.log(
    `[done] Synced ${copiedCount} reference file(s) and removed ${removedCount} stale file(s).`,
  );
}

/**
 * Keep local skill references synchronized whenever root .codex source references are edited.
 */
function watchAndSync() {
  syncOnce();
  console.log("[watch] Listening for changes in .codex/*.md");

  let syncTimer = null;
  const scheduleSync = () => {
    if (syncTimer) {
      clearTimeout(syncTimer);
    }

    syncTimer = setTimeout(() => {
      syncOnce();
      syncTimer = null;
    }, DEBOUNCE_MS);
  };

  watch(codexRoot, { persistent: true }, (_eventType, fileName) => {
    if (!fileName || !isReferenceSourceFile(fileName)) {
      return;
    }

    scheduleSync();
  });
}

if (process.argv.includes(WATCH_FLAG)) {
  watchAndSync();
} else {
  syncOnce();
}
