import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const middlewarePath = path.join(repositoryRoot, "App", "Middleware", "ExpectedCompanyContextMiddleware.cs");
const programPath = path.join(repositoryRoot, "Program.cs");
const companyControllerPath = path.join(
  repositoryRoot,
  "Web",
  "Controllers",
  "System",
  "INDCompanyController.cs"
);

const [middleware, program, companyController] = await Promise.all([
  readFile(middlewarePath, "utf8"),
  readFile(programPath, "utf8"),
  readFile(companyControllerPath, "utf8"),
]);

test("matching and legacy company contexts continue to the requested endpoint", () => {
  assert.match(middleware, /if \(!ShouldReject\([\s\S]*?\)\)\s*\{\s*await _next\(context\);\s*return;/u);
  assert.match(middleware, /expected\.Length > 0[\s\S]*selected\.Length > 0[\s\S]*!string\.Equals\(expected, selected, StringComparison\.OrdinalIgnoreCase\)/u);
  assert.match(middleware, /Missing values remain allowed for legacy requests/u);
});

test("a mismatch returns 409 without calling the next middleware or upstream", () => {
  const rejectionStart = middleware.indexOf("_logger.LogWarning(");
  const rejectionBlock = middleware.slice(rejectionStart, middleware.indexOf("public static bool ShouldReject"));

  assert.ok(rejectionStart >= 0);
  assert.match(rejectionBlock, /StatusCodes\.Status409Conflict/u);
  assert.match(rejectionBlock, /X-IND-Company-Context-Stale|StaleContextHeader/u);
  assert.doesNotMatch(rejectionBlock, /_next\(context\)/u);

  const guardIndex = program.indexOf("UseMiddleware<ExpectedCompanyContextMiddleware>");
  const tokenRefreshIndex = program.indexOf("UseMiddleware<TokenRefreshMiddleware>");
  const contextRefreshIndex = program.indexOf("UseMiddleware<IndContextRefreshMiddleware>");
  assert.ok(guardIndex >= 0 && guardIndex < tokenRefreshIndex && guardIndex < contextRefreshIndex);
});

test("authentication recovery and company selection remain compatible", () => {
  for (const route of ["/Auth/Login", "/Auth/Logout", "/Auth/ForceRelogin", "/INDCompany/SetCompany"]) {
    assert.ok(middleware.includes(`IsRoute(path, "${route}")`));
  }
  assert.match(middleware, /if \(!isAuthenticated \|\| IsCompatibilityRoute\(requestPath\)\)\s*return false;/u);
});

test("SetCompany refreshes authorization before writing and rejects unknown companies", () => {
  const validationIndex = companyController.indexOf("FindAuthorizedCompanyId(cachedContext, trimmed)");
  const refreshIndex = companyController.indexOf("EnsureContextAsync(forceRefresh: true)");
  const denialIndex = companyController.indexOf("StatusCodes.Status403Forbidden");
  const sessionWriteIndex = companyController.indexOf('Session.SetString("INDCompanySelected"');
  const preferenceWriteIndex = companyController.indexOf("RememberSelectedCompanyPreference(trimmed)");

  assert.ok(validationIndex >= 0);
  assert.ok(refreshIndex > validationIndex);
  assert.ok(denialIndex > refreshIndex && denialIndex < sessionWriteIndex);
  assert.ok(sessionWriteIndex > denialIndex);
  assert.ok(preferenceWriteIndex > denialIndex);
  assert.match(companyController, /authorizedCompany == null[\s\S]*EnsureContextAsync\(forceRefresh: true\)[\s\S]*authorizedCompany == null/u);
});
