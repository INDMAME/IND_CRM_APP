import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { build } from "esbuild";

const repoRoot = path.resolve(import.meta.dirname, "..");
const helpRoot = path.join(repoRoot, "Web", "wwwroot", "react", "src", "pages", "system", "homeHelp");
const glossaryRoot = path.join(repoRoot, "docs", "crm-help", "modules", "glossary", "topics", "glosario-basico");
const spanishLocalizationPath = path.join(repoRoot, "docs", "crm-help", "localizations", "es-ES.json");
const filterBundle = await build({
  stdin: {
    contents: 'export { filterHelpModules } from "./Web/wwwroot/react/src/pages/system/homeHelp/HomeHelpTopicBrowser.tsx";',
    resolveDir: repoRoot,
  },
  bundle: true,
  format: "esm",
  platform: "node",
  write: false,
  logLevel: "silent",
});
const filterModuleUrl = `data:text/javascript;base64,${Buffer.from(filterBundle.outputFiles[0]?.text || "").toString("base64")}`;
const { filterHelpModules } = await import(filterModuleUrl);

const [
  viewSource,
  contentSource,
  browserSource,
  glossarySource,
  homeControllerSource,
  sidebarSource,
  authorizeFilterSource,
  spanishLocalizationSource,
  manualPageSource,
] = await Promise.all([
  readFile(path.join(helpRoot, "ManualHelpView.tsx"), "utf8"),
  readFile(path.join(helpRoot, "ManualHelpTopicContent.tsx"), "utf8"),
  readFile(path.join(helpRoot, "HomeHelpTopicBrowser.tsx"), "utf8"),
  readFile(path.join(glossaryRoot, "content.es-ES.md"), "utf8"),
  readFile(path.join(repoRoot, "Web", "Controllers", "System", "HomeController.cs"), "utf8"),
  readFile(path.join(repoRoot, "Web", "Views", "Shared", "_Sidebar.cshtml"), "utf8"),
  readFile(path.join(repoRoot, "App", "Infrastructure", "Security", "Filters", "INDModuleAuthorizeFilter.cs"), "utf8"),
  readFile(spanishLocalizationPath, "utf8"),
  readFile(path.join(repoRoot, "Web", "Views", "Home", "Manual.cshtml"), "utf8"),
]);

test("Manual access is global for authenticated app users while the feature is enabled", () => {
  const manualActionStart = homeControllerSource.indexOf("public async Task<IActionResult> Manual()");
  const manualActionEnd = homeControllerSource.indexOf("public async Task<IActionResult> ApiHelpCatalog", manualActionStart);
  const manualAction = homeControllerSource.slice(manualActionStart, manualActionEnd);
  const manualLinkStart = sidebarSource.indexOf('asp-action="Manual"');
  const manualLinkContext = sidebarSource.slice(Math.max(0, manualLinkStart - 250), manualLinkStart + 250);

  assert.ok(manualActionStart >= 0 && manualActionEnd > manualActionStart);
  assert.match(manualAction, /IsHelpAssistantEnabled\(\)/u);
  assert.doesNotMatch(manualAction, /Module|AccessRights|Authorize/u);
  assert.ok(manualLinkStart >= 0);
  assert.match(manualLinkContext, /helpAssistantEnabled/u);
  assert.doesNotMatch(manualLinkContext, /canView/u);
  assert.match(authorizeFilterSource, /if \(IsHomePath\(path\) \|\| IsContextActionPath\(path\)\)\s+return GetAccessibleModuleCandidates\(company\)/u);
  assert.match(authorizeFilterSource, /AccessRightsInt >= IndAccessRights\.View/u);
});

test("Manual focuses and reveals a topic only after its article is mounted", () => {
  assert.match(viewSource, /useEffect\(\(\) => \{[\s\S]*pendingFocusTopicIdRef\.current !== topic\.id/u);
  assert.match(viewSource, /topicContentRef\.current\?\.focus\(\{ preventScroll: true \}\)/u);
  assert.match(viewSource, /topicContentRef\.current\?\.scrollIntoView\(\{ block: "start" \}\)/u);
  assert.match(viewSource, /\}, \[topic\?\.id\]\)/u);
  assert.match(viewSource, /id="manual-help-topic-detail" hidden=\{!hasTopicDetail\} aria-busy=\{topicLoading\}/u);
  assert.match(contentSource, /tabIndex=\{-1\}/u);
  assert.match(contentSource, /focus:ring-2/u);
  assert.match(browserSource, /aria-controls=\{detailRegionId\}/u);
});

test("Manual returns focus from the detail header to the selected topic", () => {
  assert.match(viewSource, /selectedTopicButtonRef/u);
  assert.match(viewSource, /selectedTopicButton\.focus\(\{ preventScroll: true \}\)/u);
  assert.match(viewSource, /selectedTopicButton\.scrollIntoView\(\{ block: "center" \}\)/u);
  assert.match(browserSource, /ref=\{selected \? selectedTopicButtonRef : undefined\}/u);
  assert.match(contentSource, /<ChevronLeftIcon/u);
  assert.match(contentSource, /aria-label=\{backLabel\}/u);
  assert.match(contentSource, /onClick=\{onBack\}/u);
});

test("Manual topic choices show concise summaries and never render article chunks", () => {
  assert.match(browserSource, /topic\.summary/u);
  assert.doesNotMatch(browserSource, /topic\.chunks/u);

  const spanishLocalization = JSON.parse(spanishLocalizationSource);
  const glossaryDisplay = spanishLocalization.topics.find((topic) => topic.id === "glossary.glosario-basico");
  assert.ok(glossaryDisplay);
  assert.ok(glossaryDisplay.summary.length <= 120);
  assert.doesNotMatch(glossaryDisplay.summary, /^Aplicaci[oó]n web:/u);
});

test("Manual search hides stale catalog content and renders only matching topics", () => {
  const filterStart = browserSource.indexOf("export const filterHelpModules");
  const filterEnd = browserSource.indexOf("// Provides a complete", filterStart);
  const filterSource = browserSource.slice(filterStart, filterEnd);
  const pendingBranchStart = browserSource.indexOf("{isSearchPending ? (");
  const resultMapStart = browserSource.indexOf("filteredModules.map", pendingBranchStart);

  assert.ok(filterStart >= 0 && filterEnd > filterStart);
  assert.match(filterSource, /module\.topics\.filter/u);
  assert.match(filterSource, /topic\.title[\s\S]*topic\.summary/u);
  assert.doesNotMatch(filterSource, /moduleMatches|module\.title|module\.description/u);
  assert.match(browserSource, /const deferredQuery = useDeferredValue\(query\)/u);
  assert.match(browserSource, /const isSearchPending = normalizedQuery !== deferredNormalizedQuery/u);
  assert.match(browserSource, /aria-busy=\{isSearchPending\}/u);
  assert.ok(pendingBranchStart >= 0 && resultMapStart > pendingBranchStart);
  assert.match(browserSource, /const moduleDescriptionId = !normalizedQuery && module\.description/u);
  assert.match(viewSource, /loadingLabel=\{indT\("HomeHelp_CatalogLoading"/u);
});

test("Manual search filters topic copy without expanding module-only matches", () => {
  const modules = [
    {
      id: "common-ui",
      title: "Pantalla, empresa y permisos",
      description: "Controles comunes de la aplicacion.",
      topics: [
        { id: "language", title: "Cambiar el idioma", summary: "Selecciona el idioma de la aplicacion." },
        { id: "save", title: "Editar, guardar y cancelar", summary: "Aprende cuándo guardar cambios." },
      ],
    },
    {
      id: "visits",
      title: "Visitas",
      description: "Consulta el historial.",
      topics: [
        { id: "history", title: "Filtrar el historial", summary: "Limita las visitas por periodo." },
      ],
    },
  ];

  assert.strictEqual(filterHelpModules(modules, ""), modules);
  assert.strictEqual(filterHelpModules(modules, "   "), modules);
  assert.deepEqual(filterHelpModules(modules, "IDIOMA"), [{ ...modules[0], topics: [modules[0].topics[0]] }]);
  assert.deepEqual(filterHelpModules(modules, "CUANDO"), [{ ...modules[0], topics: [modules[0].topics[1]] }]);
  assert.deepEqual(filterHelpModules(modules, "historial"), [{ ...modules[1], topics: [modules[1].topics[0]] }]);
  assert.deepEqual(filterHelpModules(modules, "pantalla"), []);
  assert.deepEqual(filterHelpModules(modules, "sin coincidencias"), []);
});

test("Manual modules use a one-open-or-none accordion with stable scrolling", () => {
  assert.match(browserSource, /const \[openModuleId, setOpenModuleId\] = useState\(""\)/u);
  assert.match(browserSource, /setOpenModuleId\(\(current\) => current === moduleId \? "" : moduleId\)/u);
  assert.match(browserSource, /const open = openModuleId === module\.id/u);
  assert.match(browserSource, /onClick=\{\(event\) => \{[\s\S]*event\.preventDefault\(\)[\s\S]*handleModuleToggle\(module\.id\)/u);
  assert.match(browserSource, /setOpenModuleId\(normalizedNextQuery \? nextFilteredModules\[0\]\?\.id \|\| "" : ""\)/u);
  assert.match(browserSource, /overflow-y-auto[^"\n]*\[scrollbar-gutter:stable\]/u);
  assert.doesNotMatch(browserSource, /openModuleIds|new Set\(|onToggle=/u);
});

test("Manual topic cards use one hit target for title and summary", () => {
  const topicsStart = browserSource.indexOf("module.topics.map");
  const topicButtonStart = browserSource.indexOf("<button", topicsStart);
  const topicButtonEnd = browserSource.indexOf("</button>", topicButtonStart);
  const topicSummaryStart = browserSource.indexOf("{topic.summary ?", topicButtonStart);

  assert.ok(topicsStart >= 0 && topicButtonStart > topicsStart);
  assert.ok(topicButtonEnd > topicButtonStart && topicSummaryStart > topicButtonStart);
  assert.ok(topicSummaryStart < topicButtonEnd);
  assert.match(browserSource, /aria-describedby=\{topicSummaryId\}/u);
  assert.match(browserSource, /<ChevronRightIcon/u);
  assert.match(browserSource, /hover:border-primary\/25/u);
  assert.match(browserSource, /module\.description/u);
  assert.doesNotMatch(contentSource, /\{topic\.summary/u);
});

test("Manual hides the unused global topbar navigation arrows", () => {
  assert.match(manualPageSource, /ViewData\["HideNavArrows"\] = true;/u);
});

test("Manual keeps troubleshooting and glossary visible without chatbot filtering", () => {
  const spanishLocalization = JSON.parse(spanishLocalizationSource);
  const moduleIds = spanishLocalization.modules.map((module) => module.id);

  assert.ok(moduleIds.includes("troubleshooting"));
  assert.ok(moduleIds.includes("glossary"));
  assert.match(viewSource, /modules=\{catalog\?\.modules \|\| \[\]\}/u);
  assert.doesNotMatch(viewSource, /HIDDEN_HOME_HELP_MODULE_IDS|\.filter\(/u);
});

test("Manual bounds the topic list so filtered mobile results remain scrollable", () => {
  assert.match(manualPageSource, /class="flex min-h-0 w-full flex-1 flex-col py-4 md:py-8"/u);
  assert.match(viewSource, /flex min-h-0 w-full max-w-3xl flex-1 flex-col/u);
  assert.match(viewSource, /flex min-h-0 flex-1 flex-col rounded/u);
  assert.match(browserSource, /flex min-h-0 w-full flex-1 flex-col/u);
  assert.match(
    browserSource,
    /mt-3 max-h-\[min\(65dvh,36rem\)\] min-h-0 flex-1[^"]*overflow-y-auto[^"]*overscroll-contain/u,
  );
});

test("the glossary article retains definitions from the beginning, middle, and end", () => {
  assert.match(glossarySource, /Aplicaci[oó]n web/u);
  assert.match(glossarySource, /Responsable/u);
  assert.match(glossarySource, /Voucher o justificante/u);
});
