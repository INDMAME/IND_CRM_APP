import { mkdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build } from "esbuild";

const repoRoot = path.resolve(import.meta.dirname, "..");
const outDir = path.join(repoRoot, ".playwright", ".tmp");
const outFile = path.join(outDir, "gastos-currency-settlement.test.mjs");

await mkdir(outDir, { recursive: true });
await build({
  entryPoints: [path.join(repoRoot, "tests", "gastos-currency-settlement.test.ts")],
  outfile: outFile,
  bundle: true,
  platform: "node",
  format: "esm",
  logLevel: "silent",
});

await import(pathToFileURL(outFile).href);
