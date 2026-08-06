import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const repoRoot = path.resolve(import.meta.dirname, "..");
const helpRoot = path.join(repoRoot, "Web", "wwwroot", "react", "src", "pages", "system", "homeHelp");
const glossaryRoot = path.join(repoRoot, "docs", "crm-help", "modules", "glossary", "topics", "glosario-basico");
const spanishLocalizationPath = path.join(repoRoot, "docs", "crm-help", "localizations", "es-ES.json");

const [
  viewSource,
  contentSource,
  browserSource,
  glossarySource,
  homeControllerSource,
  sidebarSource,
  authorizeFilterSource,
  spanishLocalizationSource,
] = await Promise.all([
  readFile(path.join(helpRoot, "ManualHelpView.tsx"), "utf8"),
  readFile(path.join(helpRoot, "ManualHelpTopicContent.tsx"), "utf8"),
  readFile(path.join(helpRoot, "HomeHelpTopicBrowser.tsx"), "utf8"),
  readFile(path.join(glossaryRoot, "content.es-ES.md"), "utf8"),
  readFile(path.join(repoRoot, "Web", "Controllers", "System", "HomeController.cs"), "utf8"),
  readFile(path.join(repoRoot, "Web", "Views", "Shared", "_Sidebar.cshtml"), "utf8"),
  readFile(path.join(repoRoot, "App", "Infrastructure", "Security", "Filters", "INDModuleAuthorizeFilter.cs"), "utf8"),
  readFile(spanishLocalizationPath, "utf8"),
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
  assert.match(viewSource, /id="manual-help-topic-detail" aria-busy=\{topicLoading\}/u);
  assert.match(contentSource, /tabIndex=\{-1\}/u);
  assert.match(contentSource, /focus:ring-2/u);
  assert.match(browserSource, /aria-controls=\{detailRegionId\}/u);
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

test("the glossary article retains definitions from the beginning, middle, and end", () => {
  assert.match(glossarySource, /Aplicaci[oó]n web/u);
  assert.match(glossarySource, /Responsable/u);
  assert.match(glossarySource, /Voucher o justificante/u);
});
