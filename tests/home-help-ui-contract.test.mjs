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
const localizedResourceSources = await Promise.all(
  [
    "INDSharedResource.resx",
    "INDSharedResource.es-ES.resx",
    "INDSharedResource.en.resx",
    "INDSharedResource.eu-ES.resx",
    "INDSharedResource.pt.resx",
    "INDSharedResource.it.resx",
    "INDSharedResource.zh-Hans.resx",
  ].map((fileName) => readFile(
    path.join(repoRoot, "App", "Resources", "Infrastructure", "Localization", fileName),
    "utf8"
  ))
);

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
  assert.match(assistantSource, /emptyStateContent=\{!selectedModule \?/u);
  assert.match(assistantSource, /messagesHeaderContent=\{selectedModule \?/u);
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

test("Home hides getting started and lets the selected section return to a clean selector", () => {
  assert.match(assistantSource, /const HIDDEN_HOME_HELP_MODULE_ID = "introduction"/u);
  assert.match(assistantSource, /selectableModules = modules\.filter\([\s\S]*HIDDEN_HOME_HELP_MODULE_ID/u);
  assert.match(assistantSource, /modules=\{selectableModules\}/u);
  assert.match(assistantSource, /backAriaLabel=\{indT\("HomeHelp_ChangeModule"/u);
  assert.match(assistantSource, /onBack=\{returnToModuleSelection\}/u);
  assert.match(assistantSource, /firstOptionRef=\{firstModuleButtonRef\}/u);
  assert.match(moduleSelectorSource, /ChevronLeftIcon/u);
  assert.match(moduleSelectorSource, /aria-label=\{props\.backAriaLabel\}/u);
  assert.match(moduleSelectorSource, /onClick=\{props\.onBack\}/u);
  assert.match(moduleSelectorSource, /ref=\{index === 0 \? props\.firstOptionRef : undefined\}/u);
  assert.match(homeViewSource, /HomeHelp_ChangeModule = SR\["HomeHelp_ChangeModule"\]\.Value/u);
  localizedResourceSources.forEach((resourceSource) => {
    assert.match(resourceSource, /<data name="HomeHelp_ChangeModule"/u);
  });

  const returnStart = assistantSource.indexOf("const returnToModuleSelection");
  const returnEnd = assistantSource.indexOf("\n\n  if (!isOpen)", returnStart);
  const returnBlock = assistantSource.slice(returnStart, returnEnd);
  assert.ok(returnStart >= 0 && returnEnd > returnStart);
  assert.ok(returnBlock.indexOf("resetConversation();") < returnBlock.indexOf('setSelectedModuleId("");'));
  assert.match(returnBlock, /dialogRef\.current\?\.focus\(\{ preventScroll: true \}\)/u);
  assert.match(returnBlock, /requestAnimationFrame\([\s\S]*firstModuleButtonRef\.current\?\.focus/u);
  assert.doesNotMatch(returnBlock, /onClose|textareaRef/u);
});

test("Home conversation reset invalidates stale requests and clears all topic state", () => {
  const resetStart = assistantHookSource.indexOf("const resetConversation");
  const resetEnd = assistantHookSource.indexOf("\n\n  return {", resetStart);
  const resetBlock = assistantHookSource.slice(resetStart, resetEnd);
  assert.ok(resetStart >= 0 && resetEnd > resetStart);
  assert.ok(resetBlock.indexOf("askControllerRef.current = null") < resetBlock.indexOf("controller?.abort()"));
  assert.match(resetBlock, /askInFlightRef\.current = false/u);
  assert.match(resetBlock, /retryTopicByMessageIdRef\.current\.clear\(\)/u);
  assert.match(resetBlock, /setIsSending\(false\)/u);
  assert.match(resetBlock, /setDraftQuestion\(""\)/u);
  assert.match(resetBlock, /setMessages\(\[\]\)/u);
  assert.match(resetBlock, /setAnswerDetailsByMessageId\(\{\}\)/u);
  assert.ok((assistantHookSource.match(/askControllerRef\.current !== controller/gu) || []).length >= 2);
  assert.match(assistantHookSource, /finally \{\s*const ownsActiveRequest = askControllerRef\.current === controller;\s*if \(ownsActiveRequest\) \{\s*askControllerRef\.current = null;\s*askInFlightRef\.current = false;\s*\}\s*setIsSending\(\(current\) => ownsActiveRequest \? false : current\);/u);
  assert.match(assistantHookSource, /top: messages\.length === 0 \? 0 : container\.scrollHeight/u);
  assert.match(assistantHookSource, /behavior: messages\.length === 0 \? "auto" : "smooth"/u);
});

test("shared chat grows for long text or accumulated messages", () => {
  assert.match(shellSource, /LARGE_MARKDOWN_CONTENT_THRESHOLD = 360/u);
  assert.match(shellSource, /LARGE_MARKDOWN_LINE_THRESHOLD = 6/u);
  assert.match(shellSource, /LARGE_CONVERSATION_MESSAGE_THRESHOLD = 4/u);
  assert.match(shellSource, /shouldUseExpandedContentLayout\(messages\)/u);
  assert.match(shellSource, /markdownCharacterCount >= LARGE_MARKDOWN_CONTENT_THRESHOLD/u);
  assert.match(shellSource, /markdownLineCount >= LARGE_MARKDOWN_LINE_THRESHOLD/u);
  assert.match(shellSource, /h-\[84dvh\]/u);
  assert.match(shellSource, /lg:h-\[min\(800px,calc\(100dvh-4rem\)\)\]/u);
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

test("Home stretches the assistant card into the former launcher clearance", () => {
  assert.doesNotMatch(homeViewSource, /pb-\[calc\(7rem\+env\(safe-area-inset-bottom,0px\)\)\]/u);
  assert.match(homeViewSource, /items-stretch py-4 md:py-8/u);
  assert.match(homeViewSource, /class="relative z-10 flex min-h-0 w-full"/u);
  assert.match(cardSource, /relative flex min-h-0 w-full flex-1 flex-col/u);
  assert.match(cardSource, /overflow-x-hidden overflow-y-auto/u);
  assert.match(cardSource, /relative z-10 flex flex-1/u);
  assert.match(cardSource, /justify-evenly gap-5/u);
  assert.match(cardSource, /\{children \? \(/u);
  assert.match(cardSource, /relative z-10 shrink-0/u);
});

test("Home composes one inline launcher with a two-line callout inside its card", () => {
  const cardStart = assistantPageSource.indexOf("<HomeHelpCard");
  const callout = assistantPageSource.indexOf("<HomeHelpBotCallout");
  const cardEnd = assistantPageSource.indexOf("</HomeHelpCard>");

  assert.ok(cardStart >= 0 && callout > cardStart && cardEnd > callout);
  assert.equal((assistantPageSource.match(/<HomeHelpBotCallout\b/gu) || []).length, 1);
  assert.match(calloutSource, /<AssistantLauncherButton/u);
  assert.match(calloutSource, /imageSources=\{launcherImageSources\}/u);
  assert.match(calloutSource, /layoutVariant="inline"/u);
  assert.doesNotMatch(calloutSource, /desktopPlacement=|bottomInset=|FLOATING_BOTTOM_INSET/u);
  assert.match(calloutSource, /currentMessage/u);
  assert.match(calloutSource, /line-clamp-2/u);
  assert.match(calloutSource, /-bottom-2 left-1\/2/u);
  assert.match(calloutSource, /aria-haspopup="dialog"/u);
  assert.match(calloutSource, /aria-controls="home-help-assistant-dialog"/u);
  assert.match(calloutSource, /aria-expanded=\{chatOpen\}/u);
  assert.doesNotMatch(calloutSource, /kaloria_horno|172px|188px/u);
  assert.match(shellSource, /<AssistantLauncherButton/u);
  assert.match(launcherSource, /AssistantLauncherLayoutVariant = "floating" \| "inline"/u);
  assert.match(launcherSource, /layoutVariant = "floating"/u);
  assert.match(launcherSource, /floating: "fixed[^\n]*\[bottom:var\(--assistant-bottom-inset\)\][^\n]*\[left:var\(--assistant-page-inset\)\]/u);
  assert.match(launcherSource, /inline: "relative z-20 flex-col-reverse/u);
  assert.match(launcherSource, /layoutVariant === "floating" \? DESKTOP_PLACEMENT_CLASS_NAMES\[desktopPlacement\] : ""/u);
  assert.match(launcherSource, /h-\[60px\] w-\[60px\]/u);
  assert.match(launcherSource, /h-\[54px\] w-\[54px\]/u);
});

test("Manual reuses the topic browser and is linked after the expense section", () => {
  assert.match(manualSource, /<HomeHelpTopicBrowser/u);
  assert.match(manualSource, /<ManualHelpTopicContent/u);
  assert.match(manualSource, /ManualHelp_TopicLoading/u);
  assert.doesNotMatch(manualSource, /BookOpenIcon|HomeHelp_KnowledgeVersion|<header className="text-center"/u);
  const expenseIndex = sidebarSource.indexOf('SR["Nav_Expenses"]');
  const manualIndex = sidebarSource.indexOf('asp-action="Manual"');
  assert.ok(expenseIndex >= 0 && manualIndex > expenseIndex);
});
