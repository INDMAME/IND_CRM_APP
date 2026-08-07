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
  desktopWindowHookSource,
  desktopWindowGeometrySource,
  expenseAssistantSource,
  expenseAssistantHookSource,
  expenseAssistantI18nSource,
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
  readFile(path.join(helpRoot, "useHomeHelpDesktopWindow.ts"), "utf8"),
  readFile(path.join(helpRoot, "homeHelpDesktopWindowGeometry.ts"), "utf8"),
  readFile(path.join(repoRoot, "Web", "wwwroot", "react", "src", "pages", "gastos", "list", "ExpenseSheetsAssistant.tsx"), "utf8"),
  readFile(path.join(repoRoot, "Web", "wwwroot", "react", "src", "pages", "gastos", "list", "useExpenseSheetsAssistant.ts"), "utf8"),
  readFile(path.join(repoRoot, "Web", "wwwroot", "react", "src", "pages", "gastos", "list", "expenseSheetsAssistantI18n.ts"), "utf8"),
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
  assert.match(assistantSource, /emptyStateBody=\{selectedModule\s+\? ""\s+: indT\("HomeHelp_ModuleSelectionBody"/u);
  assert.doesNotMatch(assistantSource, /indT\("HomeHelp_EmptyBody"/u);
  assert.match(shellSource, /const emptyStateDescription = toText\(hasContext \? emptyStateBody : noContextBody\)/u);
  assert.match(shellSource, /\{emptyStateDescription \? \(\s+<p/u);
  assert.match(quickActionsSource, /isStacked \? "flex-col" : "whitespace-nowrap"/u);
  assert.match(quickActionsSource, /isStacked \? "whitespace-normal break-words text-left leading-4" : "truncate"/u);
  assert.match(expenseAssistantSource, /quickActions=\{visualQuickActions\}/u);
  assert.match(expenseAssistantSource, /onQuickAction=/u);
  assert.match(moduleSelectorSource, /\{module\.title\}/u);
  assert.doesNotMatch(moduleSelectorSource, /module\.description|module\.topics/u);
  assert.doesNotMatch(assistantSource, /HomeHelpLocaleSelect|HomeHelpTopicBrowser|catalogOpen/u);
});

test("Home hides manual-only sections and lets the selected section return to a clean selector", () => {
  assert.match(assistantSource, /const HIDDEN_HOME_HELP_MODULE_IDS = new Set\(\["introduction", "troubleshooting", "glossary"\]\)/u);
  assert.match(assistantSource, /selectableModules = modules\.filter\([\s\S]*!HIDDEN_HOME_HELP_MODULE_IDS\.has\(module\.id\)/u);
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
  const returnEndOffset = assistantSource.slice(returnStart).search(/\r?\n\r?\n  if \(!isOpen\)/u);
  const returnEnd = returnEndOffset < 0 ? -1 : returnStart + returnEndOffset;
  const returnBlock = assistantSource.slice(returnStart, returnEnd);
  assert.ok(returnStart >= 0 && returnEnd > returnStart);
  assert.ok(returnBlock.indexOf("resetConversation();") < returnBlock.indexOf('setSelectedModuleId("");'));
  assert.match(returnBlock, /dialogRef\.current\?\.focus\(\{ preventScroll: true \}\)/u);
  assert.match(returnBlock, /requestAnimationFrame\([\s\S]*firstModuleButtonRef\.current\?\.focus/u);
  assert.doesNotMatch(returnBlock, /onClose|textareaRef/u);
});

test("Home conversation reset invalidates stale requests and clears all topic state", () => {
  const resetStart = assistantHookSource.indexOf("const resetConversation");
  const resetEndOffset = assistantHookSource.slice(resetStart).search(/\r?\n\r?\n  return \{/u);
  const resetEnd = resetEndOffset < 0 ? -1 : resetStart + resetEndOffset;
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

test("Home opts into a movable double-width desktop window without changing Gastos or mobile", () => {
  assert.match(assistantSource, /useHomeHelpDesktopWindow\(\{/u);
  assert.match(assistantSource, /desktopWindow=\{desktopWindow\}/u);
  assert.doesNotMatch(expenseAssistantSource, /desktopWindow=/u);
  assert.match(shellSource, /desktopWindow\?: AssistantChatDesktopWindow/u);
  assert.match(shellSource, /style=\{desktopWindow\?\.panelStyle\}/u);
  assert.match(shellSource, /lg:inline-flex/u);
  assert.match(desktopWindowGeometrySource, /HOME_HELP_DESKTOP_STANDARD_WIDTH_PX = 368/u);
  assert.match(desktopWindowGeometrySource, /HOME_HELP_DESKTOP_INITIAL_WIDTH_PX = HOME_HELP_DESKTOP_STANDARD_WIDTH_PX \* 2/u);
  assert.match(desktopWindowGeometrySource, /HOME_HELP_DESKTOP_BREAKPOINT_PX = 1024/u);
  assert.match(desktopWindowHookSource, /right: windowState\.position \? "auto" : HOME_HELP_DESKTOP_EDGE_INSET_PX/u);
  assert.match(desktopWindowHookSource, /bottom: windowState\.position \? "auto" : HOME_HELP_DESKTOP_EDGE_INSET_PX/u);
  assert.match(desktopWindowHookSource, /useLayoutEffect\(\(\) => \{[\s\S]*commitWindowState\(INITIAL_WINDOW_STATE\)/u);
  assert.match(desktopWindowHookSource, /removeEventListener\("resize", keepWindowInsideViewport\)/u);
  assert.doesNotMatch(desktopWindowHookSource, /localStorage|sessionStorage/u);
});

test("Home localizes the desktop move and resize controls in every supported culture", () => {
  assert.match(assistantSource, /indT\("HomeHelp_MoveWindow"/u);
  assert.match(assistantSource, /indT\("HomeHelp_ResizeWindow"/u);
  assert.match(homeViewSource, /HomeHelp_MoveWindow = SR\["HomeHelp_MoveWindow"\]\.Value/u);
  assert.match(homeViewSource, /HomeHelp_ResizeWindow = SR\["HomeHelp_ResizeWindow"\]\.Value/u);
  localizedResourceSources.forEach((resourceSource) => {
    assert.match(resourceSource, /<data name="HomeHelp_MoveWindow"/u);
    assert.match(resourceSource, /<data name="HomeHelp_ResizeWindow"/u);
  });
});

test("both assistants explain the configured 15-minute query limit in every supported culture", () => {
  const localizedRateLimitMessages = [
    "Se ha superado el límite de consultas. Por favor, vuelva a intentarlo dentro de 15 minutos.",
    "Se ha superado el límite de consultas. Por favor, vuelva a intentarlo dentro de 15 minutos.",
    "The query limit has been exceeded. Please try again in 15 minutes.",
    "Kontsulta-muga gainditu da. Mesedez, saiatu berriro 15 minutu barru.",
    "O limite de consultas foi excedido. Por favor, tente novamente dentro de 15 minutos.",
    "È stato superato il limite di richieste. Riprova tra 15 minuti.",
    "已超过查询次数限制。请在 15 分钟后重试。",
  ];

  assert.match(assistantHookSource, /The query limit has been exceeded\. Please try again in 15 minutes\./u);
  assert.match(assistantHookSource, /ASSISTANT_QUERY_RATE_LIMIT_EXCEEDED/u);
  assert.match(assistantHookSource, /if \(isAssistantQueryRateLimitError\(error\)\)[\s\S]*retryable: false/u);
  assert.match(assistantHookSource, /if \(error\.status === 429\)[\s\S]*retryable: true/u);
  assert.match(expenseAssistantI18nSource, /The query limit has been exceeded\. Please try again in 15 minutes\./u);
  assert.match(expenseAssistantHookSource, /ASSISTANT_QUERY_RATE_LIMIT_EXCEEDED/u);
  assert.match(expenseAssistantHookSource, /if \(isAssistantQueryRateLimit\(status, errorCode\)\) return false;/u);
  assert.match(expenseAssistantHookSource, /return status === 429 \|\| status === 500 \|\| status === 502 \|\| status === 503 \|\| status === 504;/u);
  assert.doesNotMatch(expenseAssistantHookSource, /formatExpenseSheetsRetryAfterMessage/u);

  const responseRateLimitStart = expenseAssistantHookSource.indexOf("if (isAssistantQueryRateLimit(response.HttpStatus");
  const responseRateLimitEnd = expenseAssistantHookSource.indexOf("if (response.HttpStatus === 429)", responseRateLimitStart);
  const responseRateLimitBlock = expenseAssistantHookSource.slice(responseRateLimitStart, responseRateLimitEnd);
  assert.match(responseRateLimitBlock, /return assistantCopy\.errorRateLimit;/u);
  assert.doesNotMatch(responseRateLimitBlock, /responseMessage|RetryAfter/u);

  const thrownRateLimitStart = expenseAssistantHookSource.indexOf("if (isAssistantQueryRateLimit(error.status");
  const thrownRateLimitEnd = expenseAssistantHookSource.indexOf("if (error.status === 500)", thrownRateLimitStart);
  const thrownRateLimitBlock = expenseAssistantHookSource.slice(thrownRateLimitStart, thrownRateLimitEnd);
  assert.match(thrownRateLimitBlock, /message: assistantCopy\.errorRateLimit/u);
  assert.doesNotMatch(thrownRateLimitBlock, /sanitizeAssistantText\(error\.message\)/u);

  localizedResourceSources.forEach((resourceSource, index) => {
    const localizedMessage = `<value>${localizedRateLimitMessages[index]}</value>`;
    assert.equal(resourceSource.split(localizedMessage).length - 1, 2);
  });
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
  assert.match(answerInstructionsSource, /When the question is short or ambiguous/u);
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

test("Home uses standard page spacing and stretches its assistant card through the available height", () => {
  assert.doesNotMatch(homeViewSource, /homePageSpacingClass|7rem/u);
  assert.match(homeViewSource, /items-stretch py-4 md:py-8/u);
  assert.match(homeViewSource, /class="relative z-10 flex min-h-0 w-full"/u);
  assert.match(cardSource, /relative flex min-h-0 w-full flex-1 flex-col/u);
  assert.match(cardSource, /overflow-x-hidden overflow-y-auto/u);
  assert.match(cardSource, /relative z-10 flex flex-1/u);
  assert.match(cardSource, /flex w-full flex-col justify-center px-5 py-6/u);
  assert.match(cardSource, /children\?: ReactNode/u);
  assert.match(cardSource, /mt-10 flex w-full justify-center sm:mt-12/u);
  assert.doesNotMatch(cardSource, /justify-evenly/u);
  assert.match(cardSource, /relative z-10 shrink-0/u);
});

test("Home composes one vertical inline launcher below the card copy", () => {
  const cardStart = assistantPageSource.indexOf("<HomeHelpCard");
  const callout = assistantPageSource.indexOf("<HomeHelpBotCallout");
  const cardEnd = assistantPageSource.indexOf("</HomeHelpCard>", cardStart);

  assert.ok(cardStart >= 0 && callout > cardStart && cardEnd > callout);
  assert.equal((assistantPageSource.match(/<HomeHelpBotCallout\b/gu) || []).length, 1);
  assert.match(calloutSource, /<AssistantLauncherButton/u);
  assert.match(calloutSource, /imageSources=\{launcherImageSources\}/u);
  assert.match(calloutSource, /layoutVariant="inline"/u);
  assert.match(calloutSource, /className="flex-col"/u);
  assert.doesNotMatch(calloutSource, /FLOATING_BOTTOM_INSET|desktopPlacement=|bottomInset=/u);
  assert.match(calloutSource, /currentMessage/u);
  assert.match(calloutSource, /order-first inline-flex/u);
  assert.match(calloutSource, /inline-flex max-w-\[min\(18rem,calc\(100vw-4rem\)\)\][^"]*whitespace-normal[^"]*break-words/u);
  assert.doesNotMatch(calloutSource, /order-first w-full|min-h-12 w-full/u);
  assert.doesNotMatch(calloutSource, /truncate|whitespace-nowrap|line-clamp/u);
  assert.match(calloutSource, /bottom-\[-6px\] left-1\/2/u);
  assert.match(calloutSource, /rotate-45 rounded-\[4px\] border border-sky-100/u);
  assert.doesNotMatch(calloutSource, /-left-2 top-1\/2/u);
  assert.match(calloutSource, /aria-haspopup="dialog"/u);
  assert.match(calloutSource, /aria-controls="home-help-assistant-dialog"/u);
  assert.match(calloutSource, /aria-expanded=\{chatOpen\}/u);
  assert.doesNotMatch(calloutSource, /kaloria_horno|172px|188px/u);
  assert.match(shellSource, /<AssistantLauncherButton/u);
  assert.match(launcherSource, /AssistantLauncherLayoutVariant = "floating" \| "inline"/u);
  assert.match(launcherSource, /layoutVariant = "floating"/u);
  assert.match(launcherSource, /floating: "fixed[^\n]*\[bottom:var\(--assistant-bottom-inset\)\][^\n]*\[left:var\(--assistant-page-inset\)\]/u);
  assert.match(launcherSource, /inline: "relative z-20 max-w-full gap-3 self-center"/u);
  assert.match(launcherSource, /layoutVariant === "floating" \? DESKTOP_PLACEMENT_CLASS_NAMES\[desktopPlacement\] : ""/u);
  assert.match(launcherSource, /h-\[60px\] w-\[60px\]/u);
  assert.match(launcherSource, /h-\[54px\] w-\[54px\]/u);
  assert.match(launcherSource, /focus-visible:ring-2/u);
  assert.doesNotMatch(launcherSource, /focus:ring-4/u);
});

test("Home distinguishes localized quality, provider, manual, and quota failures", () => {
  assert.match(assistantHookSource, /HELP_ANSWER_REWRITE_REQUIRED/u);
  assert.match(assistantHookSource, /AI_RATE_LIMIT_EXCEEDED/u);
  assert.match(assistantHookSource, /AI_SERVICE_UNAVAILABLE/u);
  assert.match(assistantHookSource, /HELP_FEATURE_DISABLED/u);
  assert.match(assistantHookSource, /HELP_KNOWLEDGE_UNAVAILABLE/u);
  assert.match(assistantHookSource, /HomeHelp_ErrorRewriteRequired/u);
  assert.match(assistantHookSource, /HomeHelp_ErrorAiRateLimit/u);
  assert.match(assistantHookSource, /HomeHelp_ErrorAiUnavailable/u);
  assert.match(assistantHookSource, /HomeHelp_ErrorFeatureDisabled/u);
  assert.match(assistantHookSource, /HomeHelp_ErrorKnowledgeUnavailable/u);
  assert.match(assistantHookSource, /HomeHelp_ErrorRequest/u);
  assert.doesNotMatch(assistantHookSource, /if \(error\.status === 429\)[\s\S]{0,300}text: error\.message/u);
  assert.match(assistantHookSource, /traceId: resolvedError\.traceId/u);
  assert.match(homeViewSource, /HomeHelp_ErrorRewriteRequired = SR\["HomeHelp_ErrorRewriteRequired"\]\.Value/u);
  assert.match(homeViewSource, /HomeHelp_ErrorAiUnavailable = SR\["HomeHelp_ErrorAiUnavailable"\]\.Value/u);
  assert.match(homeViewSource, /HomeHelp_ErrorAiRateLimit = SR\["HomeHelp_ErrorAiRateLimit"\]\.Value/u);
  assert.match(homeViewSource, /HomeHelp_ErrorFeatureDisabled = SR\["HomeHelp_ErrorFeatureDisabled"\]\.Value/u);
  assert.match(homeViewSource, /HomeHelp_ErrorKnowledgeUnavailable = SR\["HomeHelp_ErrorKnowledgeUnavailable"\]\.Value/u);
  localizedResourceSources.forEach((resourceSource) => {
    assert.match(resourceSource, /<data name="HomeHelp_ErrorRewriteRequired"/u);
    assert.match(resourceSource, /<data name="HomeHelp_ErrorAiUnavailable"/u);
    assert.match(resourceSource, /<data name="HomeHelp_ErrorAiRateLimit"/u);
    assert.match(resourceSource, /<data name="HomeHelp_ErrorFeatureDisabled"/u);
    assert.match(resourceSource, /<data name="HomeHelp_ErrorKnowledgeUnavailable"/u);
  });
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
