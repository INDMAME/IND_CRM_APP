import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";

const baseline = resolve("tests/fixtures/visit-visibility-prod-before.xpo.txt");
const provenance = JSON.parse(readFileSync(resolve("tests/fixtures/visit-visibility-prod-provenance.json"), "utf8"));
const canonical = process.env.IND_AX_CANONICAL;
const mirror = resolve(".codex/Axapta");
const decode = (path) => new TextDecoder("windows-1252").decode(readFileSync(path));
const utility = decode(resolve(mirror, "INDCRMUtilityService.xpo"));
const resolver = decode(resolve(mirror, "INDControlDataVisibilityResolver.xpo"));
const before = decode(baseline);
const methods = (source) => new Map([...source.matchAll(/^      SOURCE #(\w+)\r\n([\s\S]*?)^      ENDSOURCE/gm)]
  .map((m) => [m[1], m[2].replace(/^        #/gm, "")]));
const oldMethods = methods(before);
const newMethods = methods(utility);
const resolverMethods = methods(resolver);

test("PROD provenance, CP1252/CRLF and method boundaries", () => {
  for (const name of ["INDCRMUtilityService.xpo", "INDControlDataVisibilityResolver.xpo"]) {
    const bytes = readFileSync(resolve(mirror, name));
    assert.notDeepEqual([...bytes.subarray(0, 3)], [239, 187, 191]);
    assert.ok(!/(?<!\r)\n/.test(bytes.toString("latin1")), "XPO must keep CRLF");
    const text = decode(resolve(mirror, name));
    const names = [...text.matchAll(/^      SOURCE #(\w+)/gm)].map((m) => m[1]);
    assert.equal(new Set(names).size, names.length);
    assert.equal(names.length, [...text.matchAll(/^      ENDSOURCE/gm)].length);
  }
  const hash = (path) => createHash("sha256").update(readFileSync(path)).digest("hex").toUpperCase();
  assert.equal(hash(baseline), provenance.UtilitySha256);
  assert.equal(hash(resolve(mirror, "INDControlDataVisibilityResolver.xpo")), provenance.ResolverSha256);
  assert.deepEqual([...newMethods.keys()], [...oldMethods.keys()]);
  for (const [name, body] of oldMethods) {
    if (name !== "ctrlGetVisibleUsers") assert.equal(newMethods.get(name), body, name + " must remain unchanged");
  }
  const oldBody = oldMethods.get("ctrlGetVisibleUsers");
  const newBody = newMethods.get("ctrlGetVisibleUsers");
  assert.equal(newBody.slice(newBody.indexOf("            lines +=")), oldBody.slice(oldBody.indexOf("            lines +=")), "Output container contract must remain byte-identical");
});

test("API/APP XPO parity", { skip: !canonical }, () => {
  for (const name of ["INDCRMUtilityService.xpo", "INDControlDataVisibilityResolver.xpo"]) {
    assert.deepEqual(readFileSync(resolve(mirror, name)), readFileSync(resolve(canonical, name)));
  }
});

// Execute the actual changed decision block against the original PROD resolver logic.
// This checks boolean semantics with controlled lookup results; AX compilation remains separate.
const translate = (source) => source.replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/\b(?:INDWebModuleAccessLevel|INDPersonaTable|Set)\s+(\w+)\s*;/g, "let $1;")
  .replace(/::/g, ".").replace(/changecompany\s*\([^)]*\)/g, "");
const compileResolver = (name, parameters) => {
  const source = resolverMethods.get(name);
  const body = source.slice(source.indexOf("{") + 1, source.lastIndexOf("}"));
  return new Function("env", `const {${parameters.join(",")},INDControlDataVisibilityResolver,today}=env;${translate(body)}`);
};
const mutate = compileResolver("canMutateOwnerAxUserId", ["_viewerAxUserId", "_companyId", "_appCode", "_moduleCode", "_ownerAxUserId"]);
const viewOwner = compileResolver("canViewOwnerAxUserId", ["_viewerAxUserId", "_companyId", "_appCode", "_moduleCode", "_ownerAxUserId"]);
const viewAlias = compileResolver("canViewPersonAlias", ["_viewerAxUserId", "_companyId", "_appCode", "_moduleCode", "_ownerAlias"]);
const body = newMethods.get("ctrlGetVisibleUsers");
const decision = body.slice(body.indexOf("            // MMS 2026.11.05"), body.indexOf("            lines +="));
const optimized = new Function("env", `let {viewerAxUserId,companyId,appCode,moduleCode,axUserId,moduleAccessLevel,mutationAliases,mutationOwner,INDControlDataVisibilityResolver,INDMutationPolicy,Set,Types,today}=env;let canMutate;${translate(decision)};return {allowed:!!canMutate,aliases:mutationAliases};`);
const policy = { SameAsVisibility: 1, OwnOnly: 2, ModuleBusinessRules: 3 };
// Enum names in the original source are fixed to the same fixture values as the new block.
const originalMutate = new Function("fn", "env", "INDMutationPolicy", `return (${mutate.toString()})(env);`);

class AliasSet {
  constructor(values = []) { this.values = new Set(Array.isArray(values) ? values : []); }
  in(value) { return this.values.has(value); }
}

for (const mutationPolicy of [0, 1, 2, 3]) {
  for (const hasAccess of [false, true]) {
    test(`policy=${mutationPolicy}, access=${hasAccess}: canonical owners, empty aliases and current-day visibility`, () => {
      for (const visible of [[], ["self"], ["other"], ["self", "other"], ["historical-only"]]) {
        let calls = 0;
        const access = { RecId: hasAccess ? 10 : 0, MutationPolicy: mutationPolicy };
        const people = { VIEWER: { RecId: 1, Alias: "self" }, OTHER: { RecId: 2, Alias: "other" }, DUPLICATE: { RecId: 3, Alias: "canonical-hidden" }, EMPTY: { RecId: 4, Alias: "" } };
        const api = {
          findModuleAccessLevel: () => access,
          resolveActivePersonByAxUserId: (id) => people[id] || { RecId: 0, Alias: "" },
          resolveVisiblePersonAliases: (_user, _company, _app, _module, date) => {
            assert.equal(date, "TODAY", "Mutation permissions must not reuse a historical listing date");
            calls++;
            return new AliasSet(visible);
          },
          canViewOwnerAxUserId: (user, company, app, module, owner) => viewOwner({ ...env, _viewerAxUserId: user, _companyId: company, _appCode: app, _moduleCode: module, _ownerAxUserId: owner }),
          canViewPersonAlias: (user, company, app, module, alias) => viewAlias({ ...env, _viewerAxUserId: user, _companyId: company, _appCode: app, _moduleCode: module, _ownerAlias: alias }),
        };
        const env = { INDControlDataVisibilityResolver: api, today: () => "TODAY", _viewerAxUserId: "VIEWER", _companyId: "AZM", _appCode: "CRM", _moduleCode: "VISITAS_GESTION" };
        const owners = ["VIEWER", "OTHER", "DUPLICATE", "EMPTY", "MISSING", "OTHER", "VIEWER"];
        const expected = owners.map((owner) => !!originalMutate(mutate, { ...env, _ownerAxUserId: owner }, policy));
        calls = 0;
        let aliases;
        const actual = owners.map((owner) => {
          const result = optimized({ ...env, viewerAxUserId: "VIEWER", companyId: "AZM", appCode: "CRM", moduleCode: "VISITAS_GESTION", axUserId: owner,
            moduleAccessLevel: access, mutationAliases: aliases, INDMutationPolicy: policy, Set: AliasSet, Types: { String: 1 } });
          aliases = result.aliases;
          return result.allowed;
        });
        assert.deepEqual(actual, expected);
        assert.ok(calls <= 1, "Hierarchy/target resolution must run at most once per call");
      }
    });
  }
}
