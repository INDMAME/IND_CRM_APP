import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import vm from "node:vm";

const layout = readFileSync(new URL("../Web/Views/Shared/_Layout.cshtml", import.meta.url), "utf8");
const binding = layout.slice(layout.indexOf("function bindCompanyForms()"), layout.indexOf("const runDefaultBack ="));

// Executes the actual Razor binding with overlapping responses and real promise scheduling.
const createHarness = () => {
  const requests = [];
  const navigations = [];
  const events = [];
  const forms = ["B", "C"].map((company) => ({
    company, action: "/INDCompany/SetCompany", dataset: {},
    addEventListener(name, callback) { this.submit = callback; },
  }));
  const context = vm.createContext({
    document: { querySelectorAll: () => forms },
    FormData: class { constructor(form) { this.company = form.company; } },
    fetch: (url, options) => new Promise((resolve, reject) => requests.push({ url, options, resolve, reject })),
    window: {
      IND: { browserState: {
        prepareForCompanyChange: () => events.push("prepare"),
        completeCompanyChange: () => events.push("complete"),
      } },
      __indBypassNavigationGuardOnce: () => events.push("bypass"),
      location: { replace: (url) => navigations.push(url) },
    },
    HTMLFormElement: { prototype: { submit: () => events.push("native-submit") } },
  });
  vm.runInContext(`${binding}\nbindCompanyForms();`, context);
  forms.forEach((form) => form.submit({ preventDefault() {} }));
  return { requests, navigations, events };
};

const settle = () => new Promise((resolve) => setImmediate(resolve));

test("an earlier company response cannot navigate while the last selection is pending", async () => {
  const { requests, navigations, events } = createHarness();
  assert.equal(requests.length, 2);
  assert.equal(requests[1].options.method, "POST");
  assert.equal(requests[1].options.body.company, "C");
  assert.equal(requests[1].options.headers["X-Requested-With"], "XMLHttpRequest");
  requests[0].resolve({ ok: true });
  await settle();
  assert.equal(navigations.length, 0, "The pending last choice must finish before leaving the page");
  assert.equal(events.includes("complete"), false);
  requests[1].resolve({ ok: true });
  await settle();
  assert.deepEqual(navigations, ["/"]);
  assert.equal(events.filter((event) => event === "bypass").length, 1);
});

test("a late failed company response cannot navigate or resubmit after the last choice succeeds", async () => {
  const { requests, navigations, events } = createHarness();
  requests[1].resolve({ ok: true });
  await settle();
  requests[0].reject(new Error("Earlier request failed"));
  await settle();
  assert.deepEqual(navigations, ["/"]);
  assert.equal(events.filter((event) => event === "complete").length, 1);
  assert.equal(events.includes("native-submit"), false);
});
