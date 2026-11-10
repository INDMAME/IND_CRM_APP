import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { build } from "esbuild";

const isProd = process.argv.includes("--prod");
const visitsHotfix = process.argv.includes("--visits-hotfix");
const expensesHotfix = process.argv.includes("--expenses-hotfix");
const selectiveHotfix = visitsHotfix || expensesHotfix;
const typecheckScriptPath = resolve("node_modules", "typescript", "bin", "tsc");
const typecheckResult = spawnSync(process.execPath, [typecheckScriptPath, "--noEmit", "-p", "tsconfig.json"], {
  stdio: "inherit",
});

if (typecheckResult.error) {
  console.error(typecheckResult.error.message);
  process.exit(1);
}

if (typecheckResult.status !== 0) {
  process.exit(typecheckResult.status ?? 1);
}

const entryPoints = {
  "api-error-host": "Web/wwwroot/react/src/pages/system/ApiErrorHost.tsx",
  create: "Web/wwwroot/react/src/pages/visitas/creacion/CreatePage.tsx",
  detail: "Web/wwwroot/react/src/pages/visitas/detail/DetailPage.tsx",
  history: "Web/wwwroot/react/src/pages/visitas/historial/HistoryPage.tsx",
  "expense-sheets": "Web/wwwroot/react/src/pages/gastos/list/ExpenseSheetsPage.tsx",
  "expense-tickets": "Web/wwwroot/react/src/pages/gastos/tickets/ExpenseTicketsPage.tsx",
  "expense-ticket-detail": "Web/wwwroot/react/src/pages/gastos/tickets/detail/ExpenseTicketDetailPage.tsx",
  "expense-ticket-line-detail": "Web/wwwroot/react/src/pages/gastos/tickets/line/ExpenseTicketLineDetailPage.tsx",
  "expense-sheet-detail": "Web/wwwroot/react/src/pages/gastos/detail/ExpenseSheetDetailPage.tsx",
  "expense-line-detail": "Web/wwwroot/react/src/pages/gastos/line/ExpenseSheetLineDetailPage.tsx",
  "ind-text-editor": "Web/wwwroot/react/src/pages/system/TextEditor.tsx",
  "audio-recorder": "Web/wwwroot/react/src/pages/system/AudioRecorder.tsx",
  "ind-audio-worklet": "Web/wwwroot/react/audio-recorder/ind-audio-worklet.ts",
};

// Keep the chunk folder clean so old hashed files do not accumulate between builds.
if (!selectiveHotfix) rmSync("Web/wwwroot/js/chunks", { recursive: true, force: true });

const result = await build({
  entryPoints,
  bundle: true,
  splitting: true,
  format: "esm",
  platform: "browser",
  outdir: "Web/wwwroot/js",
  entryNames: "[name]",
  chunkNames: "chunks/[name]-[hash]",
  sourcemap: isProd ? true : "inline",
  minify: isProd,
  jsx: "automatic",
  loader: { ".ts": "ts", ".tsx": "tsx" },
  write: !selectiveHotfix,
  metafile: selectiveHotfix,
});

// Preserve other entries and cached chunks when preparing a selective visit release.
if (selectiveHotfix) {
  const selected = new Set();
  const visit = (path) => {
    if (selected.has(path)) return;
    const output = result.metafile.outputs[path];
    if (!output) throw new Error(`Missing hotfix output: ${path}`);
    selected.add(path);
    if (result.metafile.outputs[path + ".map"]) selected.add(path + ".map");
    for (const dependency of output.imports) {
      if (!dependency.external) visit(dependency.path);
    }
  };
  const selectedEntries = expensesHotfix
    ? Object.keys(entryPoints).filter((name) => name.startsWith("expense-"))
    : ["history"];
  for (const name of selectedEntries) visit(`Web/wwwroot/js/${name}.js`);
  const paths = new Set([...selected].map((path) => resolve(path)));
  for (const file of result.outputFiles) {
    if (!paths.has(file.path)) continue;
    mkdirSync(dirname(file.path), { recursive: true });
    writeFileSync(file.path, file.contents);
  }
  if (expensesHotfix) {
    mkdirSync(".publish_expenses", { recursive: true });
    writeFileSync(".publish_expenses/assets.json", JSON.stringify([...selected], null, 2));
  }
  console.log(`Selective hotfix: wrote ${paths.size} reachable files; retained other bundles.`);
}
