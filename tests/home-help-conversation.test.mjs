import assert from "node:assert/strict";
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
  "helpConversation.ts"
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
const {
  HELP_CATALOG_LOCALE,
  buildBoundedHelpHistory,
  resolveReusableHelpTurn,
  shouldLoadCanonicalHelpCatalog,
} = await import(moduleUrl);

const markdownMessage = (id, role, markdown, state = "done") => ({
  id,
  role,
  state,
  message: { type: "markdown", markdown },
});

test("canonical catalog stays in es-ES and is reused by presence", () => {
  assert.equal(HELP_CATALOG_LOCALE, "es-ES");
  assert.equal(shouldLoadCanonicalHelpCatalog(false, null), false);
  assert.equal(shouldLoadCanonicalHelpCatalog(true, null), true);
  assert.equal(
    shouldLoadCanonicalHelpCatalog(true, { responseLocale: "es-ES", modules: [] }),
    false
  );
});

test("retry or candidate selection reuses the pending turn and excludes it from history", () => {
  const messages = [
    markdownMessage("user-1", "user", "Earlier question"),
    markdownMessage("assistant-1", "assistant", "Earlier answer"),
    markdownMessage("user-2", "user", "Repeated question"),
    markdownMessage("assistant-2", "assistant", "Choose a topic"),
  ];

  const reusable = resolveReusableHelpTurn(messages, "assistant-2", "Repeated question");

  assert.ok(reusable);
  assert.equal(reusable.userMessageId, "user-2");
  assert.equal(reusable.assistantMessage.id, "assistant-2");
  assert.deepEqual(reusable.history, [
    { role: "user", content: "Earlier question" },
    { role: "assistant", content: "Earlier answer" },
  ]);
  assert.equal(messages.filter((message) => message.role === "user").length, 2);
});

test("reusable turn lookup rejects mismatched questions", () => {
  const messages = [
    markdownMessage("user-1", "user", "Expected question"),
    markdownMessage("assistant-1", "assistant", "Failed answer", "error"),
  ];

  assert.equal(resolveReusableHelpTurn(messages, "assistant-1", "Different question"), null);
  assert.deepEqual(buildBoundedHelpHistory(messages), [
    { role: "user", content: "Expected question" },
  ]);
});
