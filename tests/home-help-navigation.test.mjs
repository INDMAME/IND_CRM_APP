import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { build } from "esbuild";

const sourcePath = path.resolve(
  import.meta.dirname,
  "..",
  "Web",
  "wwwroot",
  "react",
  "src",
  "pages",
  "system",
  "homeHelp",
  "helpNavigation.ts"
);

const bundled = await build({
  entryPoints: [sourcePath],
  bundle: true,
  format: "esm",
  platform: "node",
  write: false,
  logLevel: "silent",
});
const moduleUrl = `data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0]?.text || "").toString("base64")}`;
const { resolveHelpNavigation } = await import(moduleUrl);
const [footerSource, authorizeFilterSource, moduleRegistrySource] = await Promise.all([
  readFile(path.resolve(import.meta.dirname, "..", "Web", "wwwroot", "react", "src", "pages", "system", "homeHelp", "HomeHelpMessageFooter.tsx"), "utf8"),
  readFile(path.resolve(import.meta.dirname, "..", "App", "Infrastructure", "Security", "Filters", "INDModuleAuthorizeFilter.cs"), "utf8"),
  readFile(path.resolve(import.meta.dirname, "..", "App", "Infrastructure", "Security", "Modules", "INDModuleRegistry.cs"), "utf8"),
]);

test("help navigation resolves only fixed local destinations", () => {
  const access = { VISITAS_GESTION: 1 };
  const resolved = resolveHelpNavigation(
    { type: "navigate", routeKey: "visits.history", label: "Open visits" },
    access
  );

  assert.deepEqual(resolved, { href: "/Historial/History", label: "Open visits" });
  assert.equal(
    resolveHelpNavigation({ type: "navigate", routeKey: "https://example.test", label: "Unsafe" }, access),
    null
  );
});

test("help navigation omits destinations without module view access", () => {
  assert.equal(
    resolveHelpNavigation(
      { type: "navigate", routeKey: "expenses.sheets", label: "Open sheets" },
      { GASTOS_HOJA_GASTO: 0 }
    ),
    null
  );
  assert.deepEqual(
    resolveHelpNavigation({ type: "navigate", routeKey: "home", label: "Home" }, {}),
    { href: "/Home/Index", label: "Home" }
  );
});

test("allowlisted navigation renders native links", () => {
  assert.match(footerSource, /<a\s+[\s\S]*?href=\{action\.href\}/u);
  assert.doesNotMatch(footerSource, /window\.location\.assign\(action\.href\)/u);
});

test("help authorization reuses Home accessible modules without a fixed registry list", () => {
  assert.match(
    authorizeFilterSource,
    /if \(IsHelpPath\(path\)\)\s+return GetAccessibleModuleCandidates\(company\);[\s\S]*TryResolveSharedRouteCandidates/u
  );
  assert.match(authorizeFilterSource, /string\.Equals\(path, "\/api\/help"/u);
  assert.match(authorizeFilterSource, /path\.StartsWith\("\/api\/help\/"/u);
  assert.doesNotMatch(moduleRegistrySource, /\["\/api\/help"\]/u);
});
