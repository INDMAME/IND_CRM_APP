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
  buildBoundedHelpHistory,
  resolveLatestRepeatableHelpTurn,
  resolveReusableHelpTurn,
} = await import(moduleUrl);

const markdownMessage = (id, role, markdown, state = "done", meta) => ({
  id,
  role,
  state,
  message: { type: "markdown", markdown },
  ...(meta ? { meta } : {}),
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
  assert.deepEqual(buildBoundedHelpHistory(messages), []);
});

test("conversation history keeps only complete eligible user and assistant turns", () => {
  const messages = [
    markdownMessage("user-1", "user", "Documented question"),
    markdownMessage("assistant-1", "assistant", "Documented answer"),
    markdownMessage("user-2", "user", "Question without an answer"),
    markdownMessage("assistant-2", "assistant", "Request failed", "error"),
    markdownMessage("user-3", "user", "False negative question"),
    markdownMessage("assistant-3", "assistant", "Not documented", "done", { includeInHistory: false }),
  ];

  assert.deepEqual(buildBoundedHelpHistory(messages), [
    { role: "user", content: "Documented question" },
    { role: "assistant", content: "Documented answer" },
  ]);
});

test("conversation history keeps the four latest complete turns", () => {
  const messages = Array.from({ length: 6 }, (_, index) => [
    markdownMessage(`user-${index}`, "user", `Question ${index}`),
    markdownMessage(`assistant-${index}`, "assistant", `Answer ${index}`),
  ]).flat();

  assert.deepEqual(buildBoundedHelpHistory(messages), [
    { role: "user", content: "Question 2" },
    { role: "assistant", content: "Answer 2" },
    { role: "user", content: "Question 3" },
    { role: "assistant", content: "Answer 3" },
    { role: "user", content: "Question 4" },
    { role: "assistant", content: "Answer 4" },
    { role: "user", content: "Question 5" },
    { role: "assistant", content: "Answer 5" },
  ]);
});

test("manual resubmission reuses the latest failed or undocumented turn", () => {
  const failedMessages = [
    markdownMessage("user-1", "user", "How do I create a visit?"),
    markdownMessage("assistant-1", "assistant", "Try later", "error"),
  ];
  const undocumentedMessages = [
    markdownMessage("user-2", "user", "How do I create a visit?"),
    markdownMessage("assistant-2", "assistant", "Not documented", "done", { includeInHistory: false }),
  ];

  assert.equal(resolveLatestRepeatableHelpTurn(failedMessages, "How do I create a visit?")?.assistantMessage.id, "assistant-1");
  assert.equal(resolveLatestRepeatableHelpTurn(undocumentedMessages, "How do I create a visit?")?.assistantMessage.id, "assistant-2");
  assert.equal(resolveLatestRepeatableHelpTurn(failedMessages, "Another question"), null);
});
