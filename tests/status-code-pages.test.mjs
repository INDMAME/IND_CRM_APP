import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

// Runs real MVC routes, views, filters and session middleware on a temporary loopback host.
test("status pages and auth recovery preserve the real MVC contracts", () => {
  const root = path.resolve(import.meta.dirname, "..");
  const fixture = mkdtempSync(path.join(tmpdir(), "ind-status-pages-"));
  try {
    writeFileSync(path.join(fixture, "global.json"), readFileSync(path.join(root, "global.json")));
    writeFileSync(path.join(fixture, "StatusPages.csproj"), `<Project Sdk="Microsoft.NET.Sdk.Web">
      <PropertyGroup><TargetFramework>net10.0</TargetFramework><ImplicitUsings>enable</ImplicitUsings><Nullable>enable</Nullable></PropertyGroup>
      <ItemGroup><ProjectReference Include="${path.join(root, "IND_CRM_APP.csproj")}" /></ItemGroup>
    </Project>`);
    writeFileSync(path.join(fixture, "Program.cs"),
      readFileSync(path.join(root, "tests/fixtures/status-code-pages.cs.fixture")));
    const result = spawnSync("dotnet", ["run", "--configuration", "Release", "--project", path.join(fixture, "StatusPages.csproj"), "--", root],
      { cwd: fixture, encoding: "utf8", timeout: 180000 });
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.match(result.stdout, /Verified 180 real HTTP status cases/u);
    assert.match(result.stdout, /Verified exception recovery, anonymous errors, antiforgery and fresh signed context/u);
  } finally {
    // The deletion target is the exact temporary directory created for this test.
    rmSync(fixture, { recursive: true, force: true });
  }
});
