import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const repoRoot = path.resolve(import.meta.dirname, "..");
const helpRoot = path.join(repoRoot, "docs", "crm-help");
const knowledge = JSON.parse(await readFile(path.join(helpRoot, "knowledge.json"), "utf8"));
const modules = await Promise.all(knowledge.modulePaths.map(async (relativePath) => {
  const modulePath = path.join(helpRoot, ...relativePath.split("/"));
  const value = JSON.parse(await readFile(modulePath, "utf8"));
  return { ...value, directory: path.dirname(modulePath) };
}));
const topics = (await Promise.all(modules.flatMap((module) => module.topicIds.map(async (topicId) => {
  const topicDirectory = path.join(module.directory, "topics", topicId.split(".").at(-1));
  const value = JSON.parse(await readFile(path.join(topicDirectory, "topic.json"), "utf8"));
  return { ...value, directory: topicDirectory };
})))).flat();

test("Manual localization metadata covers every supported module and topic", async () => {
  const expectedModuleIds = modules.map((module) => module.id);
  const expectedTopicIds = topics.map((topic) => topic.id);

  for (const locale of knowledge.supportedResponseLocales) {
    const metadataRelativePath = knowledge.localizationMetadataPaths[locale];
    assert.ok(metadataRelativePath, `missing metadata path for ${locale}`);
    const metadata = JSON.parse(await readFile(path.join(helpRoot, ...metadataRelativePath.split("/")), "utf8"));
    assert.equal(metadata.locale, locale);
    assert.deepEqual(metadata.modules.map((module) => module.id), expectedModuleIds);
    assert.deepEqual(metadata.topics.map((topic) => topic.id), expectedTopicIds);

    for (const topic of metadata.topics) {
      assert.ok(topic.title.trim(), `${topic.id} has no ${locale} title`);
      assert.ok(topic.summary.trim(), `${topic.id} has no ${locale} summary`);
      assert.ok(topic.summary.length <= 120, `${topic.id} ${locale} summary is longer than 120 characters`);
      const sourceTopic = topics.find((candidate) => candidate.id === topic.id);
      assert.equal(sourceTopic.summary, topic.summary, `${topic.id} canonical summary differs from Spanish metadata`);
      await access(path.join(sourceTopic.directory, `content.${locale}.md`));
    }
  }
});

test("Manual publishes Spanish only and contains no capture placeholders", async () => {
  assert.equal(knowledge.defaultLocale, "es-ES");
  assert.deepEqual(knowledge.supportedResponseLocales, ["es-ES"]);
  assert.deepEqual(Object.keys(knowledge.localizationMetadataPaths), ["es-ES"]);
  assert.deepEqual(await readdir(path.join(helpRoot, "localizations")), ["es-ES.json"]);

  for (const module of modules) {
    assert.deepEqual(Object.keys(module.aliases), ["es-ES"], `${module.id} contains non-Spanish aliases`);
  }

  for (const topic of topics) {
    assert.deepEqual(Object.keys(topic.aliases), ["es-ES"], `${topic.id} contains non-Spanish aliases`);
    assert.deepEqual(Object.keys(topic.sampleQuestions), ["es-ES"], `${topic.id} contains non-Spanish sample questions`);
    assert.deepEqual(Object.keys(topic.translationCoverage), ["es-ES"], `${topic.id} contains non-Spanish coverage`);

    const contentFiles = (await readdir(topic.directory))
      .filter((name) => /^content\..+\.md$/u.test(name))
      .sort();
    assert.deepEqual(contentFiles, ["content.es-ES.md"], `${topic.id} contains a translated content file`);

    const content = await readFile(path.join(topic.directory, "content.es-ES.md"), "utf8");
    assert.doesNotMatch(content, /^!\[/mu, `${topic.id} contains a Markdown image declaration`);
    assert.doesNotMatch(content, /Captura de referencia/iu, `${topic.id} contains a capture placeholder`);
  }

  const generatedBundle = await readFile(path.join(helpRoot, "generated", "crm-help.bundle.json"), "utf8");
  assert.doesNotMatch(generatedBundle, /Captura de referencia/iu);
});

test("the Spanish glossary keeps all 23 definitions", async () => {
  const glossary = topics.find((topic) => topic.id === "glossary.glosario-basico");
  assert.ok(glossary);

  const content = await readFile(path.join(glossary.directory, "content.es-ES.md"), "utf8");
  const definitionBlocks = content
    .split(/(?:\r?\n){2,}/u)
    .map((value) => value.trim())
    .filter((value) => value && !value.startsWith("#") && !value.startsWith("<!--"));
  assert.equal(definitionBlocks.length, 23, "Spanish glossary does not contain 23 definition blocks");
});

test("Manual uses the clarified module title and keeps expense approval next to expense sheets", async () => {
  const expectedModuleIds = [
    "common-ui",
    "visits",
    "expenses",
    "expense-approval",
    "tickets",
    "axapta",
    "troubleshooting",
    "glossary",
  ];
  const spanishMetadata = JSON.parse(await readFile(path.join(helpRoot, "localizations", "es-ES.json"), "utf8"));
  const commonModule = modules.find((module) => module.id === "common-ui");
  const approvalModule = modules.find((module) => module.id === "expense-approval");
  const ticketsModule = modules.find((module) => module.id === "tickets");

  assert.deepEqual(modules.map((module) => module.id), expectedModuleIds);
  assert.deepEqual(spanishMetadata.modules.map((module) => module.id), expectedModuleIds);
  assert.equal(commonModule?.title, "Uso general, empresa y permisos");
  assert.equal(spanishMetadata.modules.find((module) => module.id === "common-ui")?.title, commonModule?.title);
  assert.equal(approvalModule?.order, 6);
  assert.equal(ticketsModule?.order, 7);
});
