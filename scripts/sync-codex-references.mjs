import { mkdirSync, readdirSync, rmSync, watch, copyFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const WATCH_FLAG = "--watch";
const DEBOUNCE_MS = 200;

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDir, "..");
const codexRoot = join(repositoryRoot, ".codex");
const referencesDir = join(
  codexRoot,
  "skills",
  "ind-crm-codex-guardrails",
  "references",
);

/**
 * Return top-level markdown files from .codex.
 * These files are the source of truth for references.
 */
function getSourceMarkdownFiles() {
  return readdirSync(codexRoot, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".md"))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

/**
 * Copy .codex markdown files to the skill references folder and remove stale copies.
 */
function syncOnce() {
  mkdirSync(referencesDir, { recursive: true });

  const sourceFiles = getSourceMarkdownFiles();
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
    if (!entry.isFile() || !entry.name.toLowerCase().endsWith(".md")) {
      continue;
    }

    if (!sourceSet.has(entry.name)) {
      rmSync(join(referencesDir, entry.name), { force: true });
      removedCount += 1;
      console.log(`[remove] ${entry.name}`);
    }
  }

  console.log(
    `[done] Synced ${copiedCount} markdown file(s) and removed ${removedCount} stale file(s).`,
  );
}

/**
 * Keep references synchronized whenever .codex markdown files are edited.
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
    if (!fileName || !fileName.toLowerCase().endsWith(".md")) {
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
