import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { build } from "esbuild";

const repoRoot = path.resolve(import.meta.dirname, "..");
const helpRoot = path.join(repoRoot, "Web", "wwwroot", "react", "src", "pages", "system", "homeHelp");
const localeBundle = await build({
  entryPoints: [path.join(helpRoot, "helpLocale.ts")],
  bundle: true,
  format: "esm",
  platform: "node",
  write: false,
  logLevel: "silent",
});
const localeModuleUrl = `data:text/javascript;base64,${Buffer.from(localeBundle.outputFiles[0]?.text || "").toString("base64")}`;
const { normalizeHelpResponseLocale } = await import(localeModuleUrl);

const [
  assistantSource,
  assistantPageSource,
  cardSource,
  calloutSource,
  launcherSource,
  shellSource,
  quickActionsSource,
  assistantHookSource,
  expenseAssistantSource,
  moduleSelectorSource,
  helpTypesSource,
  manualSource,
  homeViewSource,
  sidebarSource,
  helpControllerSource,
  apiClientSource,
  answerInstructionsSource,
  defaultResourceSource,
  spanishResourceSource,
] = await Promise.all([
  readFile(path.join(helpRoot, "HomeHelpAssistant.tsx"), "utf8"),
  readFile(path.join(helpRoot, "HomeHelpAssistantPage.tsx"), "utf8"),
  readFile(path.join(helpRoot, "HomeHelpCard.tsx"), "utf8"),
  readFile(path.join(helpRoot, "HomeHelpBotCallout.tsx"), "utf8"),
  readFile(path.join(repoRoot, "Web", "wwwroot", "react", "src", "components", "commons", "chat", "AssistantLauncherButton.tsx"), "utf8"),
  readFile(path.join(repoRoot, "Web", "wwwroot", "react", "src", "components", "commons", "chat", "AssistantChatShell.tsx"), "utf8"),
  readFile(path.join(repoRoot, "Web", "wwwroot", "react", "src", "components", "commons", "chat", "AssistantQuickActions.tsx"), "utf8"),
  readFile(path.join(helpRoot, "useHomeHelpAssistant.ts"), "utf8"),
  readFile(path.join(repoRoot, "Web", "wwwroot", "react", "src", "pages", "gastos", "list", "ExpenseSheetsAssistant.tsx"), "utf8"),
  readFile(path.join(helpRoot, "HomeHelpModuleSelector.tsx"), "utf8"),
  readFile(path.join(helpRoot, "helpTypes.ts"), "utf8"),
  readFile(path.join(helpRoot, "ManualHelpView.tsx"), "utf8"),
  readFile(path.join(repoRoot, "Web", "Views", "Home", "Index.cshtml"), "utf8"),
  readFile(path.join(repoRoot, "Web", "Views", "Shared", "_Sidebar.cshtml"), "utf8"),
  readFile(path.join(repoRoot, "Web", "Controllers", "System", "HomeController.cs"), "utf8"),
  readFile(path.join(repoRoot, "App", "Services", "ApiClientService.cs"), "utf8"),
  readFile(path.join(repoRoot, "App", "Services", "CrmHelpAnswerInstructions.cs"), "utf8"),
  readFile(path.join(repoRoot, "App", "Resources", "Infrastructure", "Localization", "INDSharedResource.resx"), "utf8"),
  readFile(path.join(repoRoot, "App", "Resources", "Infrastructure", "Localization", "INDSharedResource.es-ES.resx"), "utf8"),
]);

test("assistant response locale follows the supported global app culture", () => {
  assert.equal(normalizeHelpResponseLocale("en"), "en");
  assert.equal(normalizeHelpResponseLocale("ZH-hans"), "zh-Hans");
  assert.equal(normalizeHelpResponseLocale("unsupported"), "es-ES");
});

test("Home card presents the requested chatbot guidance", () => {
  const englishCopy = "Do you have questions about how to use the CRM? Ask the chatbot and receive clear, simple help about how the web application works.";
  const spanishCopy = "¿Tienes dudas sobre cómo usar el CRM? Pregunta al chatbot y recibe ayuda clara y sencilla sobre el funcionamiento de la aplicación web.";

  assert.ok(assistantPageSource.includes(`indT("HomeHelp_CardBody", "${englishCopy}")`));
  assert.ok(defaultResourceSource.includes(`<value>${spanishCopy}</value>`));
  assert.ok(spanishResourceSource.includes(`<value>${spanishCopy}</value>`));
});

test("chat requires one global module and manual input before enabling its composer", () => {
  assert.match(assistantSource, /normalizeHelpResponseLocale\(initialLocale\)/u);
  assert.match(assistantSource, /<HomeHelpModuleSelector[\s\S]*variant="choices"/u);
  assert.match(assistantSource, /composerState=\{selectedModule \? "enabled" : "blocked"\}/u);
  assert.match(assistantSource, /conversationStarted && selectedModule/u);
  assert.doesNotMatch(assistantSource, /quickActions=|quickActionsLayout=|onQuickAction=/u);
  assert.doesNotMatch(assistantSource, /textareaRef\.current\?\.focus/u);
  assert.match(shellSource, /composerState = "enabled"/u);
  assert.match(shellSource, /composerState === "blocked"/u);
  assert.match(shellSource, /quickActions\?: AssistantChatQuickAction/u);
  assert.match(shellSource, /onQuickAction\?: \(question: string\) => void/u);
  assert.match(shellSource, /quickActions && quickActions\.length > 0 && onQuickAction/u);
  assert.match(shellSource, /quickActionsLayout = "inline"/u);
  assert.match(quickActionsSource, /isStacked \? "flex-col" : "whitespace-nowrap"/u);
  assert.match(quickActionsSource, /isStacked \? "whitespace-normal break-words text-left leading-4" : "truncate"/u);
  assert.match(expenseAssistantSource, /quickActions=\{visualQuickActions\}/u);
  assert.match(expenseAssistantSource, /onQuickAction=/u);
  assert.match(moduleSelectorSource, /\{module\.title\}/u);
  assert.doesNotMatch(moduleSelectorSource, /module\.description|module\.topics/u);
  assert.doesNotMatch(assistantSource, /HomeHelpLocaleSelect|HomeHelpTopicBrowser|catalogOpen/u);
});

test("Home sends the selected module while keeping answer instructions server-owned", () => {
  assert.match(helpTypesSource, /selectedModuleId: string/u);
  assert.doesNotMatch(helpTypesSource, /answerInstructions/u);
  assert.match(assistantHookSource, /if \(!question \|\| !selectedModuleId \|\| askInFlightRef\.current\)/u);
  assert.match(assistantHookSource, /selectedModuleId,\s+selectedTopicId/u);
  assert.doesNotMatch(assistantHookSource, /AssistantChatQuickAction|HomeHelp_TopicQuestionTemplate|\bquickActions\b/u);
  assert.match(helpControllerSource, /request\.AnswerInstructions = CrmHelpAnswerInstructions\.Value/u);
  assert.match(helpControllerSource, /MaxSelectedModuleIdLength = 80/u);
  assert.match(helpControllerSource, /request\.SelectedModuleId\.Length == 0[\s\S]*"INVALID_MODULE_ID"/u);
  assert.match(apiClientSource, /SelectedModuleId = NormalizeOptionalText\(request\.SelectedModuleId\)/u);
  assert.match(apiClientSource, /AnswerInstructions = CrmHelpAnswerInstructions\.Value/u);
  assert.match(answerInstructionsSource, /Synthesize and paraphrase/u);
  assert.match(answerInstructionsSource, /Never return quotations, excerpts, source passages/u);
});

test("Home owns technical details and no longer renders welcome or suggestion controls", () => {
  assert.match(cardSource, /Microsoft Navision Axapta 3\.0/u);
  assert.match(cardSource, /technicalInfo\.isDev/u);
  assert.match(cardSource, /<h1 id="home-help-card-title"/u);
  assert.doesNotMatch(cardSource, /suggestions\.map|suggestionsLabel/u);
  assert.doesNotMatch(homeViewSource, /Home_Welcome|Home_SelectLeftMenu/u);
});

test("Home stretches the assistant card while reserving the floating launcher area", () => {
  assert.match(homeViewSource, /homePageSpacingClass = helpAssistantEnabled/u);
  assert.match(homeViewSource, /pb-\[calc\(7rem\+env\(safe-area-inset-bottom,0px\)\)\]/u);
  assert.match(homeViewSource, /: "py-4 md:py-8"/u);
  assert.match(homeViewSource, /items-stretch @homePageSpacingClass/u);
  assert.match(homeViewSource, /class="relative z-10 flex min-h-0 w-full"/u);
  assert.match(cardSource, /relative flex min-h-0 w-full flex-1 flex-col/u);
  assert.match(cardSource, /overflow-x-hidden overflow-y-auto/u);
  assert.match(cardSource, /relative z-10 flex flex-1/u);
  assert.match(cardSource, /relative z-10 shrink-0/u);
});

test("Home reuses the compact left assistant launcher and keeps its rotating callout", () => {
  assert.match(calloutSource, /<AssistantLauncherButton/u);
  assert.match(calloutSource, /imageSources=\{launcherImageSources\}/u);
  assert.match(calloutSource, /desktopPlacement="viewport-start"/u);
  assert.match(calloutSource, /currentMessage/u);
  assert.doesNotMatch(calloutSource, /kaloria_horno|172px|188px/u);
  assert.doesNotMatch(cardSource, /HomeHelpBotCallout/u);
  assert.match(shellSource, /<AssistantLauncherButton/u);
  assert.match(launcherSource, /h-\[60px\] w-\[60px\]/u);
  assert.match(launcherSource, /h-\[54px\] w-\[54px\]/u);
});

test("Manual reuses the topic browser and is linked after the expense section", () => {
  assert.match(manualSource, /<HomeHelpTopicBrowser/u);
  assert.match(manualSource, /<ManualHelpTopicContent/u);
  assert.match(manualSource, /ManualHelp_TopicLoading/u);
  const expenseIndex = sidebarSource.indexOf('SR["Nav_Expenses"]');
  const manualIndex = sidebarSource.indexOf('asp-action="Manual"');
  assert.ok(expenseIndex >= 0 && manualIndex > expenseIndex);
});
