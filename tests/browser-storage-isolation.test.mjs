import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { build } from "esbuild";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const scopePath = path.join(repositoryRoot, "Web", "wwwroot", "react", "src", "utils", "browserStorageScope.ts");
const coordinatorPath = path.join(
  repositoryRoot,
  "Web",
  "wwwroot",
  "react",
  "src",
  "legacy",
  "ind-browser-state.ts"
);
const generatedCoordinatorPath = path.join(repositoryRoot, "Web", "wwwroot", "js", "ind-browser-state.js");
const quickTicketPath = path.join(
  repositoryRoot,
  "Web",
  "wwwroot",
  "react",
  "src",
  "pages",
  "gastos",
  "detail",
  "useExpenseSheetQuickTicketFlowCore.ts"
);

const [scopeBuild, quickTicketBuild, coordinatorSource] = await Promise.all([
  build({
    entryPoints: [scopePath],
    bundle: true,
    format: "iife",
    globalName: "BrowserStorageScope",
    platform: "browser",
    write: false,
    logLevel: "silent",
  }),
  build({
    entryPoints: [quickTicketPath],
    bundle: true,
    format: "iife",
    globalName: "QuickTicketFlow",
    platform: "browser",
    write: false,
    logLevel: "silent",
  }),
  readFile(generatedCoordinatorPath, "utf8"),
]);

const scopeSource = scopeBuild.outputFiles[0]?.text || "";
const quickTicketSource = quickTicketBuild.outputFiles[0]?.text || "";

class MockStorage {
  constructor(entries = []) {
    this.values = new Map(entries);
  }

  get length() {
    return this.values.size;
  }

  key(index) {
    return [...this.values.keys()][index] ?? null;
  }

  getItem(key) {
    return this.values.has(String(key)) ? this.values.get(String(key)) : null;
  }

  setItem(key, value) {
    this.values.set(String(key), String(value));
  }

  removeItem(key) {
    this.values.delete(String(key));
  }
}

class MockCache {
  constructor() {
    this.entries = new Map();
  }

  async put(request, response) {
    this.entries.set(String(request?.url || request), response);
  }

  async match(request) {
    return this.entries.get(String(request?.url || request)) || null;
  }

  async delete(request) {
    return this.entries.delete(String(request?.url || request));
  }
}

class MockCacheStorage {
  constructor() {
    this.values = new Map();
  }

  async keys() {
    return [...this.values.keys()];
  }

  async open(name) {
    if (!this.values.has(name)) this.values.set(name, new MockCache());
    return this.values.get(name);
  }

  async delete(name) {
    return this.values.delete(name);
  }
}

class DeferredDeleteCacheStorage extends MockCacheStorage {
  constructor() {
    super();
    this.deleteStarted = new Promise((resolve) => {
      this.resolveDeleteStarted = resolve;
    });
    this.deleteGate = new Promise((resolve) => {
      this.resolveDeleteGate = resolve;
    });
  }

  async delete(name) {
    this.resolveDeleteStarted();
    await this.deleteGate;
    return super.delete(name);
  }
}

class BroadcastHub {
  constructor() {
    this.channels = [];
  }

  createChannelClass() {
    const hub = this;
    return class MockBroadcastChannel {
      constructor(name) {
        this.name = name;
        this.listeners = [];
        hub.channels.push(this);
      }

      addEventListener(type, listener) {
        if (type === "message") this.listeners.push(listener);
      }

      postMessage(data) {
        for (const channel of hub.channels) {
          if (channel === this || channel.name !== this.name) continue;
          queueMicrotask(() => channel.listeners.forEach((listener) => listener({ data })));
        }
      }
    };
  }
}

const createLocation = (pathname = "/Home/Index") => ({
  origin: "https://dev.insertec.biz:2053",
  pathname,
  search: "",
  hash: "",
  href: `https://dev.insertec.biz:2053${pathname}`,
  replaceCalls: [],
  reloadCalls: 0,
  replace(target) {
    this.replaceCalls.push(String(target));
  },
  reload() {
    this.reloadCalls += 1;
  },
});

const createCoordinatorHarness = ({
  oid,
  company = "ceu",
  localStorage = new MockStorage(),
  sessionStorage = new MockStorage(),
  caches = new MockCacheStorage(),
  hub = new BroadcastHub(),
  pathname = "/Home/Index",
  csrfToken = "csrf-token",
  fetchImpl,
} = {}) => {
  const listeners = new Map();
  const location = createLocation(pathname);
  const fetchCalls = [];

  class MockHtmlFormElement {
    constructor() {
      this.children = [];
      this.nativeSubmitCalls = 0;
    }

    appendChild(child) {
      this.children.push(child);
    }

    submit() {
      this.nativeSubmitCalls += 1;
    }
  }

  const document = {
    body: { appendChild: () => {} },
    createElement: (tagName) => (tagName === "form" ? new MockHtmlFormElement() : {}),
    querySelector: (selector) => (selector === 'meta[name="csrf-token"]' ? { content: csrfToken } : null),
    querySelectorAll: () => [],
  };
  const window = {
    __IND_ENTRA_OID__: oid,
    __IND_SELECTED_COMPANY__: company,
    IND: undefined,
    caches,
    localStorage,
    sessionStorage,
    location,
    addEventListener(type, listener) {
      const values = listeners.get(type) || [];
      values.push(listener);
      listeners.set(type, values);
    },
  };

  class MockFormData {
    constructor(form) {
      this.form = form;
    }
  }

  const defaultFetch = async (url, options) => {
    fetchCalls.push({ url: String(url), options });
    return {
      ok: true,
      status: 200,
      redirected: true,
      url: `${location.origin}/Auth/Login?loggedOut=true`,
      headers: new Headers(),
      json: async () => ({ loginUrl: "/Auth/Login?loggedOut=true" }),
    };
  };
  window.fetch = fetchImpl || defaultFetch;
  const context = vm.createContext({
    BroadcastChannel: hub.createChannelClass(),
    FormData: MockFormData,
    Headers,
    HTMLFormElement: MockHtmlFormElement,
    Request,
    Response,
    URL,
    console,
    crypto: { randomUUID: () => `nonce-${Math.random()}` },
    document,
    fetch: fetchImpl || defaultFetch,
    location,
    queueMicrotask,
    window,
  });

  vm.runInContext(coordinatorSource, context, { filename: generatedCoordinatorPath });
  const dispatchWindowEvent = (type, event) => {
    (listeners.get(type) || []).forEach((listener) => listener(event));
  };
  return { caches, context, dispatchWindowEvent, fetchCalls, localStorage, location, sessionStorage, window };
};

const evaluateScope = ({ oid, company, allowed = true, epoch = 0 }) => {
  const browserState = {
    epoch,
    allowed,
    getEpoch() {
      return this.epoch;
    },
    isPersistenceAllowed() {
      return this.allowed;
    },
  };
  const window = {
    __IND_ENTRA_OID__: oid,
    __IND_SELECTED_COMPANY__: company,
    IND: { browserState },
  };
  const context = vm.createContext({ console, window });
  vm.runInContext(scopeSource, context, { filename: scopePath });
  return { api: context.BrowserStorageScope, browserState };
};

test("scope tokens isolate two users across two companies and fail closed", () => {
  const tokens = new Set();
  for (const oid of ["User-A", "User-B"]) {
    for (const company of ["ceu", "ind"]) {
      const { api } = evaluateScope({ oid, company });
      const token = api.getBrowserStorageScopeToken();
      assert.ok(token.startsWith("v2_u"));
      tokens.add(token);
    }
  }

  assert.equal(tokens.size, 4);
  assert.equal(evaluateScope({ oid: "", company: "ceu" }).api.getBrowserStorageScopeToken(), "");
  assert.equal(evaluateScope({ oid: "user-a", company: "" }).api.canPersistSensitiveBrowserState(), false);
  assert.equal(evaluateScope({ oid: "user-a", company: "ceu", allowed: false }).api.canPersistSensitiveBrowserState(), false);

  const current = evaluateScope({ oid: "user-a", company: "ceu", epoch: 7 });
  const snapshot = current.api.captureSensitiveBrowserState();
  assert.ok(snapshot.endsWith("::7"));
  current.browserState.epoch += 1;
  assert.equal(current.api.isSensitiveBrowserStateCurrent(snapshot), false);
});

test("first guarded load removes unknown legacy state but preserves unrelated browser data", async () => {
  const localStorage = new MockStorage([
    ["expense_recent_currencies_v1_legacy", "[\"EUR\"]"],
    ["theme", "dark"],
  ]);
  const sessionStorage = new MockStorage([
    ["visitas_draft", "private"],
    ["ind_texteditor_field", "private"],
    ["other_app_state", "keep"],
  ]);
  const caches = new MockCacheStorage();
  await caches.open("ind-expense-ticket-image-v1");
  await caches.open("ind-static-assets-v1");

  const harness = createCoordinatorHarness({ oid: "USER-A", localStorage, sessionStorage, caches });
  await harness.window.IND.browserState.ready;

  assert.equal(harness.window.IND.browserState.isPersistenceAllowed(), true);
  assert.equal(localStorage.getItem("ind_browser_identity_v1"), "user-a");
  assert.equal(localStorage.getItem("expense_recent_currencies_v1_legacy"), null);
  assert.equal(localStorage.getItem("theme"), "dark");
  assert.equal(sessionStorage.getItem("visitas_draft"), null);
  assert.equal(sessionStorage.getItem("ind_texteditor_field"), null);
  assert.equal(sessionStorage.getItem("other_app_state"), "keep");
  assert.deepEqual(await caches.keys(), ["ind-static-assets-v1"]);
});

test("an invalidation during initial cleanup cannot re-enable stale persistence", async () => {
  const caches = new DeferredDeleteCacheStorage();
  await caches.open("ind-expense-ticket-image-v1");
  const harness = createCoordinatorHarness({ oid: "user-a", company: "ceu", caches });

  await caches.deleteStarted;
  harness.window.IND.browserState.prepareForCompanyChange();
  caches.resolveDeleteGate();
  await harness.window.IND.browserState.ready;

  assert.equal(harness.window.IND.browserState.isPersistenceAllowed(), false);
  assert.deepEqual(await caches.keys(), []);
});

test("identity changes invalidate another tab without deleting static caches", async () => {
  const hub = new BroadcastHub();
  const localStorage = new MockStorage([["ind_browser_identity_v1", "user-a"]]);
  const caches = new MockCacheStorage();
  await caches.open("ind-expense-ticket-image-v2-user-a");
  await caches.open("pwa-static-v1");

  const tabASession = new MockStorage([
    ["expense_sheets_filter_v2_user-a", "private"],
    ["unrelated", "keep"],
  ]);
  const tabA = createCoordinatorHarness({
    oid: "user-a",
    localStorage,
    sessionStorage: tabASession,
    caches,
    hub,
  });
  await tabA.window.IND.browserState.ready;

  localStorage.setItem("expense_recent_currencies_v1_user-a", "[\"EUR\"]");
  const tabB = createCoordinatorHarness({
    oid: "user-b",
    localStorage,
    sessionStorage: new MockStorage(),
    caches,
    hub,
  });
  await tabB.window.IND.browserState.ready;
  await new Promise((resolve) => setImmediate(resolve));

  assert.equal(localStorage.getItem("ind_browser_identity_v1"), "user-b");
  assert.equal(localStorage.getItem("expense_recent_currencies_v1_user-a"), null);
  assert.equal(tabASession.getItem("expense_sheets_filter_v2_user-a"), null);
  assert.equal(tabASession.getItem("unrelated"), "keep");
  assert.equal(tabA.window.IND.browserState.isPersistenceAllowed(), false);
  assert.equal(tabA.location.reloadCalls, 1);
  assert.deepEqual(await caches.keys(), ["pwa-static-v1"]);
});

test("a company transition stops stale-tab writes and reloads after confirmation", async () => {
  const hub = new BroadcastHub();
  const localStorage = new MockStorage([["ind_browser_identity_v1", "user-a"]]);
  const tabA = createCoordinatorHarness({ oid: "user-a", company: "ceu", localStorage, hub });
  const tabBSession = new MockStorage([["visitas_draft_v2_user-a-ceu", "keep-scoped"]]);
  const tabB = createCoordinatorHarness({
    oid: "user-a",
    company: "ceu",
    localStorage,
    sessionStorage: tabBSession,
    hub,
  });
  await Promise.all([tabA.window.IND.browserState.ready, tabB.window.IND.browserState.ready]);

  tabA.window.IND.browserState.prepareForCompanyChange();
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(tabB.window.IND.browserState.isPersistenceAllowed(), false);
  assert.equal(tabB.location.reloadCalls, 0);
  assert.equal(tabBSession.getItem("visitas_draft_v2_user-a-ceu"), "keep-scoped");

  tabA.window.IND.browserState.completeCompanyChange();
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(tabB.location.reloadCalls, 1);
  assert.equal(tabBSession.getItem("visitas_draft_v2_user-a-ceu"), "keep-scoped");
});

test("same-origin fetches carry the company rendered with the page", async () => {
  const harness = createCoordinatorHarness({ oid: "user-a", company: "ceu" });
  await harness.window.IND.browserState.ready;

  await harness.window.fetch("/api/crm/expensesheets/list", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  assert.equal(harness.fetchCalls.length, 1);
  assert.equal(harness.fetchCalls[0].options.headers.get("X-IND-Expected-Company"), "ceu");
  assert.equal(harness.fetchCalls[0].options.headers.get("Content-Type"), "application/json");
});

test("cross-origin fetches do not disclose the selected company", async () => {
  const harness = createCoordinatorHarness({ oid: "user-a", company: "ceu" });
  await harness.window.IND.browserState.ready;

  await harness.window.fetch("https://example.org/catalog", { method: "GET" });

  assert.equal(harness.fetchCalls.length, 1);
  assert.equal(harness.fetchCalls[0].options?.headers, undefined);
});

test("a stale-company response stops persistence and reloads the current tab", async () => {
  const calls = [];
  const harness = createCoordinatorHarness({
    oid: "user-a",
    company: "ceu",
    fetchImpl: async (url, options) => {
      calls.push({ url, options });
      return {
        ok: false,
        status: 409,
        headers: new Headers({ "X-IND-Company-Context-Stale": "true" }),
      };
    },
  });
  await harness.window.IND.browserState.ready;

  let requestSettled = false;
  void harness.window.fetch("/api/crm/expensesheets/list", { method: "POST" }).then(
    () => {
      requestSettled = true;
    },
    () => {
      requestSettled = true;
    }
  );
  await new Promise((resolve) => setImmediate(resolve));

  assert.equal(calls.length, 1);
  assert.equal(calls[0].options.headers.get("X-IND-Expected-Company"), "ceu");
  assert.equal(harness.window.IND.browserState.isPersistenceAllowed(), false);
  assert.equal(harness.location.reloadCalls, 1);
  assert.equal(requestSettled, false);
});

test("login without an identity clears state but does not redirect in a loop", async () => {
  const localStorage = new MockStorage([
    ["ind_browser_identity_v1", "user-a"],
    ["expense_recent_currencies_v1_user-a", "[\"EUR\"]"],
  ]);
  const sessionStorage = new MockStorage([["visitas_history_filter_v1", "private"]]);
  const harness = createCoordinatorHarness({
    oid: "",
    company: "",
    localStorage,
    sessionStorage,
    pathname: "/Auth/Login",
  });
  await harness.window.IND.browserState.ready;

  assert.equal(harness.window.IND.browserState.isPersistenceAllowed(), false);
  assert.equal(localStorage.getItem("ind_browser_identity_v1"), null);
  assert.equal(localStorage.getItem("expense_recent_currencies_v1_user-a"), null);
  assert.equal(sessionStorage.getItem("visitas_history_filter_v1"), null);
  assert.deepEqual(harness.location.replaceCalls, []);
});

test("an authenticated page with no identity clears the server session before Login", async () => {
  const harness = createCoordinatorHarness({ oid: "", company: "ceu", pathname: "/Home/Index" });
  await harness.window.IND.browserState.ready;

  assert.equal(harness.fetchCalls.length, 1);
  assert.equal(harness.fetchCalls[0].url, "/Auth/ForceRelogin?reason=missing-identity");
  assert.equal(harness.fetchCalls[0].options.headers.RequestVerificationToken, "csrf-token");
  assert.deepEqual(harness.location.replaceCalls, ["/Auth/Login?loggedOut=true"]);
});

test("a bfcache restore applies an invalidation missed while the page was frozen", async () => {
  const localStorage = new MockStorage([["ind_browser_identity_v1", "user-a"]]);
  const sessionStorage = new MockStorage([["ind_visit_draft_private", "private"]]);
  const harness = createCoordinatorHarness({ oid: "user-a", localStorage, sessionStorage });
  await harness.window.IND.browserState.ready;

  localStorage.setItem(
    "ind_browser_invalidation_v1",
    JSON.stringify({
      version: 1,
      nonce: "missed-logout",
      reason: "explicit-logout",
      mode: "login",
      targetUrl: "/Auth/Login?loggedOut=true",
      removeIdentityMarker: true,
    })
  );
  harness.dispatchWindowEvent("pageshow", { persisted: true });
  await new Promise((resolve) => setImmediate(resolve));

  assert.equal(sessionStorage.getItem("ind_visit_draft_private"), null);
  assert.equal(localStorage.getItem("ind_browser_identity_v1"), null);
  assert.deepEqual(harness.location.replaceCalls, ["/Auth/Login?loggedOut=true"]);
});

class DeferredOpenCacheStorage extends MockCacheStorage {
  constructor() {
    super();
    this.openStarted = new Promise((resolve) => {
      this.resolveOpenStarted = resolve;
    });
    this.openGate = new Promise((resolve) => {
      this.resolveOpenGate = resolve;
    });
  }

  async open(name) {
    this.resolveOpenStarted();
    await this.openGate;
    return super.open(name);
  }
}

class DeferredPutCache extends MockCache {
  constructor() {
    super();
    this.putStarted = new Promise((resolve) => {
      this.resolvePutStarted = resolve;
    });
    this.putGate = new Promise((resolve) => {
      this.resolvePutGate = resolve;
    });
  }

  async put(request, response) {
    this.resolvePutStarted();
    await this.putGate;
    await super.put(request, response);
  }
}

class DeferredPutCacheStorage extends MockCacheStorage {
  constructor() {
    super();
    this.cache = new DeferredPutCache();
  }

  async open(name) {
    this.values.set(name, this.cache);
    return this.cache;
  }
}

const createQuickTicketHarness = (caches) => {
  const browserState = {
    allowed: true,
    epoch: 1,
    isPersistenceAllowed() {
      return this.allowed;
    },
    getEpoch() {
      return this.epoch;
    },
  };
  const window = {
    __IND_ENTRA_OID__: "user-a",
    __IND_SELECTED_COMPANY__: "ceu",
    IND: { browserState },
    caches,
  };
  const context = vm.createContext({
    Blob,
    Request: class MockRequest {
      constructor(url) {
        this.url = String(url);
      }
    },
    Response: class MockResponse {
      constructor(body, options) {
        this.body = body;
        this.options = options;
      }
    },
    URL,
    caches,
    console,
    document: { documentElement: { lang: "en" } },
    navigator: { language: "en" },
    window,
  });
  vm.runInContext(quickTicketSource, context, { filename: quickTicketPath });
  return { browserState, context };
};

test("an invalidation racing cache open cannot recreate a ticket image cache", async () => {
  const caches = new DeferredOpenCacheStorage();
  const { browserState, context } = createQuickTicketHarness(caches);

  const cachePromise = context.QuickTicketFlow.cacheImageFile("ticket-1", new Blob(["private"], { type: "image/png" }));
  await caches.openStarted;
  browserState.allowed = false;
  browserState.epoch += 1;
  caches.resolveOpenGate();
  await cachePromise;

  assert.deepEqual(await caches.keys(), []);
});

test("an invalidation racing cache put removes the completed private write", async () => {
  const caches = new DeferredPutCacheStorage();
  const { browserState, context } = createQuickTicketHarness(caches);
  const cachePromise = context.QuickTicketFlow.cacheImageFile("ticket-2", new Blob(["private"], { type: "image/png" }));
  await caches.cache.putStarted;

  browserState.allowed = false;
  browserState.epoch += 1;
  for (const name of await caches.keys()) {
    await caches.delete(name);
  }
  caches.cache.resolvePutGate();
  await cachePromise;

  assert.deepEqual(await caches.keys(), []);
  assert.equal(caches.cache.entries.size, 0);
});

test("successful-flow cleanup waits for a parallel image-cache write", async () => {
  const caches = new DeferredPutCacheStorage();
  const { context } = createQuickTicketHarness(caches);
  const cacheWritePromise = context.QuickTicketFlow.cacheImageFile(
    "ticket-success",
    new Blob(["private"], { type: "image/png" })
  );
  await caches.cache.putStarted;

  let cleanupCompleted = false;
  const cleanupPromise = context.QuickTicketFlow
    .removeCachedImageFileAfterWrite("ticket-success", cacheWritePromise)
    .then(() => {
      cleanupCompleted = true;
    });
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(cleanupCompleted, false);

  caches.cache.resolvePutGate();
  await cleanupPromise;
  assert.equal(caches.cache.entries.size, 0);
});

test("layout and relogin contracts keep cleanup behind confirmed navigation", async () => {
  const layoutPath = path.join(repositoryRoot, "Web", "Views", "Shared", "_Layout.cshtml");
  const loginPath = path.join(repositoryRoot, "Web", "Views", "Auth", "Login.cshtml");
  const sidebarPath = path.join(repositoryRoot, "Web", "Views", "Shared", "_Sidebar.cshtml");
  const quickTicketHookPath = path.join(
    repositoryRoot,
    "Web",
    "wwwroot",
    "react",
    "src",
    "pages",
    "gastos",
    "detail",
    "useExpenseSheetQuickTicketFlow.ts"
  );
  const buildScriptPath = path.join(repositoryRoot, "scripts", "build-react.mjs");
  const apiServicePath = path.join(
    repositoryRoot,
    "Web",
    "wwwroot",
    "react",
    "src",
    "services",
    "apiService.ts"
  );
  const [layout, login, sidebar, coordinator, generatedCoordinator, apiService, quickTicket, quickTicketHook, buildScript] = await Promise.all([
    readFile(layoutPath, "utf8"),
    readFile(loginPath, "utf8"),
    readFile(sidebarPath, "utf8"),
    readFile(coordinatorPath, "utf8"),
    readFile(generatedCoordinatorPath, "utf8"),
    readFile(apiServicePath, "utf8"),
    readFile(quickTicketPath, "utf8"),
    readFile(quickTicketHookPath, "utf8"),
    readFile(buildScriptPath, "utf8"),
  ]);

  const identityIndex = layout.indexOf("window.__IND_ENTRA_OID__");
  const coordinatorIndex = layout.indexOf('src="~/js/ind-browser-state.js"');
  const pageScriptsIndex = layout.indexOf('@RenderSection("Scripts"');
  assert.ok(identityIndex >= 0 && identityIndex < coordinatorIndex);
  assert.ok(coordinatorIndex >= 0 && coordinatorIndex < pageScriptsIndex);
  assert.match(login, /src="~\/js\/ind-browser-state\.js"[^>]*asp-append-version="true"/u);
  assert.match(sidebar, /<form[^>]*data-ind-browser-state-logout/u);
  assert.doesNotMatch(sidebar, /<button[^>]*data-clear-expense-cache/u);

  assert.doesNotMatch(coordinator, /querySelectorAll<HTMLFormElement>|bindLogoutForms/u);
  assert.match(layout, /if \(!guard\.active \|\| guard\.bypass\)[\s\S]*submitForm\(\);[\s\S]*requestNavigation\(submitForm\)/u);
  assert.match(layout, /HTMLFormElement\.prototype\.submit\.call\(form\)/u);
  assert.doesNotMatch(generatedCoordinator, /^\s*(?:import|export)\s/mu);
  assert.match(buildScript, /browserStateEntryPoint[\s\S]*format: "iife"/u);
  assert.ok(layout.indexOf("prepareForCompanyChange") < layout.indexOf("fetch(form.action"));
  assert.ok(layout.indexOf("completeCompanyChange") < layout.indexOf('window.location.replace("/")'));
  assert.match(coordinator, /forceServerRelogin\("missing-identity"\)/u);

  const forcedReloginBlock = apiService.slice(apiService.indexOf("forcedReloginPromise = (async"));
  assert.ok(forcedReloginBlock.indexOf("prepareForRelogin") < forcedReloginBlock.indexOf("requestForcedRelogin"));
  assert.ok(quickTicket.indexOf("isSensitiveBrowserStateCurrent(stateSnapshot)") < quickTicket.indexOf("await cache.put"));
  assert.ok(quickTicket.lastIndexOf("isSensitiveBrowserStateCurrent(stateSnapshot)") > quickTicket.indexOf("await cache.put"));
  assert.match(quickTicketHook, /removeCachedImageFileAfterWrite\(cacheKey, cacheWritePromise\)/u);
});
