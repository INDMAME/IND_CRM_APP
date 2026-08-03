import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { build } from "esbuild";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const globalActionMarkPath = path.join(repositoryRoot, "Web", "wwwroot", "js", "ind-action-mark.js");
const fallbackActionMarkPath = path.join(
  repositoryRoot,
  "Web",
  "wwwroot",
  "react",
  "src",
  "utils",
  "visitasHistory.ts"
);

const [globalActionMarkSource, fallbackBuild] = await Promise.all([
  readFile(globalActionMarkPath, "utf8"),
  build({
    entryPoints: [fallbackActionMarkPath],
    bundle: true,
    format: "iife",
    globalName: "ActionMarkFallback",
    platform: "browser",
    write: false,
    logLevel: "silent",
  }),
]);

const fallbackActionMarkSource = fallbackBuild.outputFiles[0]?.text || "";

class MockClassList {
  constructor() {
    this.values = new Set();
  }

  add(...values) {
    values.forEach((value) => this.values.add(value));
  }

  remove(...values) {
    values.forEach((value) => this.values.delete(value));
  }
}

class MockStyle {
  constructor() {
    this.values = new Map();
  }

  setProperty(name, value) {
    this.values.set(name, value);
  }

  removeProperty(name) {
    this.values.delete(name);
  }
}

class MockElement {
  constructor(id = "") {
    this.id = id;
    this.attributes = new Map();
    this.classList = new MockClassList();
    this.style = new MockStyle();
    this.hidden = false;
    this.isConnected = true;
    this.focusCalls = [];
  }

  setAttribute(name, value) {
    this.attributes.set(name, String(value));
  }

  getAttribute(name) {
    return this.attributes.has(name) ? this.attributes.get(name) : null;
  }

  focus(options) {
    this.focusCalls.push(options);
  }
}

const createBrowserHarness = () => {
  const elements = new Map(
    ["indActionMark", "indActionMarkWrap", "indMarkCheck", "indMarkWarning", "indMarkError"].map((id) => [
      id,
      new MockElement(id),
    ])
  );
  const feedbackNodes = [];
  const frameCallbacks = new Map();
  const scrollCalls = [];
  let nextFrameId = 1;

  const document = {
    body: new MockElement("body"),
    documentElement: new MockElement("html"),
    getElementById: (id) => elements.get(id) || null,
    querySelectorAll: (selector) => (selector === "[data-ind-action-feedback]" ? [...feedbackNodes] : []),
    createElement: (tagName) => new MockElement(tagName),
  };
  document.body.appendChild = (element) => {
    if (element?.id) elements.set(element.id, element);
  };

  const window = {
    IND: undefined,
    requestAnimationFrame: (callback) => {
      const id = nextFrameId;
      nextFrameId += 1;
      frameCallbacks.set(id, callback);
      return id;
    },
    cancelAnimationFrame: (id) => {
      frameCallbacks.delete(id);
    },
    scrollTo: (options) => {
      scrollCalls.push(options);
    },
    setTimeout: () => 1,
    clearTimeout: () => {},
  };

  const context = vm.createContext({
    console,
    document,
    HTMLElement: MockElement,
    window,
    setTimeout: window.setTimeout,
    clearTimeout: window.clearTimeout,
  });

  const addFeedback = (scope) => {
    const element = new MockElement(`feedback-${feedbackNodes.length + 1}`);
    element.setAttribute("data-ind-action-feedback", scope);
    feedbackNodes.push(element);
    return element;
  };

  const flushAnimationFrames = () => {
    let cycle = 0;
    while (frameCallbacks.size > 0) {
      cycle += 1;
      assert.ok(cycle < 10, "ActionMark attention scheduling must settle.");
      const callbacks = [...frameCallbacks.values()];
      frameCallbacks.clear();
      callbacks.forEach((callback) => callback(0));
    }
  };

  return {
    addFeedback,
    context,
    flushAnimationFrames,
    scrollCalls,
    window,
  };
};

const createGlobalHarness = () => {
  const harness = createBrowserHarness();
  vm.runInContext(globalActionMarkSource, harness.context, { filename: globalActionMarkPath });
  return {
    ...harness,
    flash: harness.window.IND.flashActionMark,
  };
};

const createFallbackHarness = () => {
  const harness = createBrowserHarness();
  vm.runInContext(fallbackActionMarkSource, harness.context, { filename: fallbackActionMarkPath });
  return {
    ...harness,
    flash: harness.context.ActionMarkFallback.flashActionMark,
  };
};

const assertFocusedWithoutScroll = (element) => {
  assert.equal(element.focusCalls.length, 1);
  assert.equal(element.focusCalls[0]?.preventScroll, true);
};

const assertScrolledToPageTop = (scrollCalls) => {
  assert.equal(scrollCalls.length, 1);
  assert.equal(scrollCalls[0]?.top, 0);
  assert.equal(scrollCalls[0]?.left, 0);
  assert.equal(scrollCalls[0]?.behavior, "auto");
};

for (const type of ["errorProcess", "warningProcess"]) {
  test(`global ${type} waits for page feedback, focuses it, and moves to the top`, () => {
    const harness = createGlobalHarness();

    harness.flash({ type, durationMs: 0 });
    const feedback = harness.addFeedback("page");
    harness.flushAnimationFrames();

    assertFocusedWithoutScroll(feedback);
    assertScrolledToPageTop(harness.scrollCalls);
  });
}

test("global success marks preserve the current page position and focus", () => {
  for (const type of ["okProcess", "okDelProcess"]) {
    const harness = createGlobalHarness();
    const feedback = harness.addFeedback("page");

    harness.flash({ type, durationMs: 0 });
    harness.flushAnimationFrames();

    assert.equal(feedback.focusCalls.length, 0);
    assert.equal(harness.scrollCalls.length, 0);
  }
});

test("modal feedback has priority and does not scroll the document", () => {
  const harness = createGlobalHarness();
  const pageFeedback = harness.addFeedback("page");

  harness.flash({ type: "errorProcess", durationMs: 0 });
  const modalFeedback = harness.addFeedback("modal");
  harness.flushAnimationFrames();

  assert.equal(pageFeedback.focusCalls.length, 0);
  assertFocusedWithoutScroll(modalFeedback);
  assert.equal(harness.scrollCalls.length, 0);
});

test("a later success mark cancels pending error attention", () => {
  const harness = createGlobalHarness();
  const feedback = harness.addFeedback("page");

  harness.flash({ type: "errorProcess", durationMs: 0 });
  harness.flash({ type: "okProcess", durationMs: 0 });
  harness.flushAnimationFrames();

  assert.equal(feedback.focusCalls.length, 0);
  assert.equal(harness.scrollCalls.length, 0);
});

test("React fallback matches the global error attention behavior", () => {
  const harness = createFallbackHarness();

  harness.flash("errorProcess", 0);
  const feedback = harness.addFeedback("page");
  harness.flushAnimationFrames();

  assertFocusedWithoutScroll(feedback);
  assertScrolledToPageTop(harness.scrollCalls);
});

test("shared modal and quick-ticket feedback expose the attention contract", async () => {
  const sourcePaths = [
    path.join(repositoryRoot, "Web", "wwwroot", "react", "src", "components", "commons", "ConfirmModal.tsx"),
    path.join(
      repositoryRoot,
      "Web",
      "wwwroot",
      "react",
      "src",
      "pages",
      "gastos",
      "detail",
      "ExpenseSheetDetailOverlays.tsx"
    ),
    path.join(
      repositoryRoot,
      "Web",
      "wwwroot",
      "react",
      "src",
      "pages",
      "gastos",
      "tickets",
      "ExpenseTicketsPage.tsx"
    ),
  ];
  const [modalSource, sheetSource, ticketsSource] = await Promise.all(sourcePaths.map((sourcePath) => readFile(sourcePath, "utf8")));

  assert.match(modalSource, /data-ind-action-feedback="modal"/u);
  assert.match(sheetSource, /data-ind-action-feedback="page"/u);
  assert.match(ticketsSource, /data-ind-action-feedback="page"/u);
  for (const source of [modalSource, sheetSource, ticketsSource]) {
    assert.match(source, /role="alert"/u);
    assert.match(source, /tabIndex=\{-1\}/u);
  }
});
