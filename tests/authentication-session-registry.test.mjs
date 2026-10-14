import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

// Runs the production registry with a deterministic clock and bounded parallel admission.
test("authentication registry preserves live closures, bounds admission and consumes attempts once", () => {
  const root = path.resolve(import.meta.dirname, "..");
  const fixture = mkdtempSync(path.join(tmpdir(), "ind-authentication-registry-"));
  try {
    writeFileSync(path.join(fixture, "global.json"), readFileSync(path.join(root, "global.json")));
    writeFileSync(path.join(fixture, "Registry.csproj"), `<Project Sdk="Microsoft.NET.Sdk">
      <PropertyGroup><OutputType>Exe</OutputType><TargetFramework>net10.0</TargetFramework><ImplicitUsings>enable</ImplicitUsings><Nullable>enable</Nullable></PropertyGroup>
      <ItemGroup><Compile Include="${path.join(root, "App/Infrastructure/Session/AuthenticationSessionRegistry.cs")}" /></ItemGroup>
    </Project>`);
    writeFileSync(path.join(fixture, "Program.cs"), readFileSync(path.join(root, "tests/fixtures/authentication-session-registry.cs.fixture")));
    const result = spawnSync("dotnet", ["run", "--configuration", "Release", "--project", path.join(fixture, "Registry.csproj")],
      { cwd: fixture, encoding: "utf8", timeout: 180000 });
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.match(result.stdout, /Verified bounded authentication admission, single-use activation, closure retention and recovery/u);
  } finally {
    // Remove only the exact temporary fixture created by this test.
    rmSync(fixture, { recursive: true, force: true });
  }
});
