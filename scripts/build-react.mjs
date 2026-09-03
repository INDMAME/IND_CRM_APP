import { rmSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { build } from "esbuild";

const isProd = process.argv.includes("--prod");
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
  "home-help": "Web/wwwroot/react/src/pages/system/homeHelp/HomeHelpAssistantPage.tsx",
  "manual-help": "Web/wwwroot/react/src/pages/system/homeHelp/ManualHelpPage.tsx",
  "ind-audio-worklet": "Web/wwwroot/react/audio-recorder/ind-audio-worklet.ts",
};

const browserStateEntryPoint = {
  "ind-browser-state": "Web/wwwroot/react/src/legacy/ind-browser-state.ts",
};

// Keep the chunk folder clean so old hashed files do not accumulate between builds.
rmSync("Web/wwwroot/js/chunks", { recursive: true, force: true });

await build({
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
});

// Build the early browser-state guard as a classic script so it runs synchronously in Razor layouts.
await build({
  entryPoints: browserStateEntryPoint,
  bundle: true,
  splitting: false,
  format: "iife",
  platform: "browser",
  outdir: "Web/wwwroot/js",
  entryNames: "[name]",
  sourcemap: isProd ? true : "inline",
  minify: isProd,
  loader: { ".ts": "ts" },
});
