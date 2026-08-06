import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
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
      await access(path.join(sourceTopic.directory, `content.${locale}.md`));
    }
  }
});

test("each non-source locale contains a full Manual rendition", async () => {
  const sourceEntries = await Promise.all(topics.map(async (topic) => ({
    id: topic.id,
    content: await readFile(path.join(topic.directory, `content.${knowledge.defaultLocale}.md`), "utf8"),
  })));
  const sourceContent = sourceEntries.map((entry) => entry.content).join("\n");

  for (const locale of knowledge.supportedResponseLocales.filter((value) => value !== knowledge.defaultLocale)) {
    const localizedEntries = await Promise.all(topics.map(async (topic) => ({
      id: topic.id,
      content: await readFile(path.join(topic.directory, `content.${locale}.md`), "utf8"),
    })));
    for (const localizedEntry of localizedEntries) {
      const sourceEntry = sourceEntries.find((entry) => entry.id === localizedEntry.id);
      assert.ok(sourceEntry);
      assert.notEqual(localizedEntry.content, sourceEntry.content, `${localizedEntry.id} still duplicates Spanish in ${locale}`);
    }
    const localizedContent = localizedEntries.map((entry) => entry.content).join("\n");
    assert.notEqual(localizedContent, sourceContent, `${locale} still duplicates the Spanish Manual`);
    const minimumLengthRatio = locale === "zh-Hans" ? 0.25 : 0.45;
    assert.ok(localizedContent.length >= sourceContent.length * minimumLengthRatio, `${locale} Manual is unexpectedly incomplete`);
  }
});

test("the glossary keeps all 23 definitions in every locale", async () => {
  const glossary = topics.find((topic) => topic.id === "glossary.glosario-basico");
  assert.ok(glossary);

  for (const locale of knowledge.supportedResponseLocales) {
    const content = await readFile(path.join(glossary.directory, `content.${locale}.md`), "utf8");
    const definitionBlocks = content
      .split(/(?:\r?\n){2,}/u)
      .map((value) => value.trim())
      .filter((value) => value && !value.startsWith("#") && !value.startsWith("<!--"));
    assert.equal(definitionBlocks.length, 23, `${locale} glossary does not contain 23 definition blocks`);
  }
});
