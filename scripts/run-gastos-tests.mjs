import { mkdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const repoRoot = path.resolve(import.meta.dirname, "..");
const outDir = path.join(repoRoot, ".playwright", ".tmp");
const testFiles = [
  "gastos-currency-settlement.test.ts",
  "gastos-expense-gasto-type-warning.test.ts",
  "gastos-expense-project-validation.test.ts",
  "gastos-expense-sheet-status-transition.test.ts",
];

await mkdir(outDir, { recursive: true });

for (const testFile of testFiles) {
  const outFile = path.join(outDir, testFile.replace(/\.ts$/, ".mjs"));
  await build({
    entryPoints: [path.join(repoRoot, "tests", testFile)],
    outfile: outFile,
    bundle: true,
    platform: "node",
    format: "esm",
    logLevel: "silent",
  });

  await import(pathToFileURL(outFile).href);
}
