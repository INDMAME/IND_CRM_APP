import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

// Executes the production session store against the real framework cache and middleware.
test("concurrent requests preserve company, logout, tokens and independent session writes", () => {
  const root = path.resolve(import.meta.dirname, "..");
  const fixture = mkdtempSync(path.join(tmpdir(), "ind-session-concurrency-"));
  try {
    writeFileSync(path.join(fixture, "global.json"), readFileSync(path.join(root, "global.json")));
    writeFileSync(path.join(fixture, "SessionConcurrency.csproj"), `<Project Sdk="Microsoft.NET.Sdk.Web">
      <PropertyGroup><TargetFramework>net10.0</TargetFramework><ImplicitUsings>enable</ImplicitUsings><Nullable>enable</Nullable></PropertyGroup>
      <ItemGroup><Compile Include="${path.join(root, "App/Infrastructure/Session/*.cs")}" /></ItemGroup>
    </Project>`);
    writeFileSync(path.join(fixture, "Program.cs"), readFileSync(path.join(root, "tests/fixtures/session-concurrency.cs.fixture")));
    const result = spawnSync("dotnet", ["run", "--configuration", "Release", "--project", path.join(fixture, "SessionConcurrency.csproj")],
      { cwd: fixture, encoding: "utf8", timeout: 180000 });
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.match(result.stdout, /Verified session concurrency, expiry, logout and real HTTP cookie flow/u);
    const baseline = spawnSync("dotnet", ["run", "--no-build", "--configuration", "Release", "--project",
      path.join(fixture, "SessionConcurrency.csproj"), "--", "--baseline"],
      { cwd: fixture, encoding: "utf8", timeout: 30000 });
    assert.notEqual(baseline.status, 0, "The regression must fail with the original framework session store");
    assert.match(baseline.stdout + baseline.stderr, /slow request must not undo company switch/u);
    const program = readFileSync(path.join(root, "Program.cs"), "utf8");
    assert.match(program, /AddSingleton<Microsoft\.AspNetCore\.Session\.ISessionStore, ConcurrentSessionStore>/u);
  } finally {
    // The deletion target is the exact temporary directory created for this test.
    rmSync(fixture, { recursive: true, force: true });
  }
});
