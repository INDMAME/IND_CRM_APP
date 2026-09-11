import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

// Runs real cookie and OIDC middleware with a local simulated identity provider.
test("authentication generations isolate requests and recover without changing cookie lifetime", (t) => {
  const root = path.resolve(import.meta.dirname, "..");
  const fixture = mkdtempSync(path.join(tmpdir(), "ind-auth-lifecycle-"));
  try {
    writeFileSync(path.join(fixture, "global.json"), readFileSync(path.join(root, "global.json")));
    writeFileSync(path.join(fixture, "Lifecycle.csproj"), `<Project Sdk="Microsoft.NET.Sdk.Web">
      <PropertyGroup><TargetFramework>net10.0</TargetFramework><ImplicitUsings>enable</ImplicitUsings><Nullable>enable</Nullable></PropertyGroup>
      <ItemGroup><PackageReference Include="Microsoft.AspNetCore.Authentication.OpenIdConnect" Version="10.0.0" /></ItemGroup>
      <ItemGroup>
        <Compile Include="${path.join(root, "App/Infrastructure/Session/*.cs")}" />
        <Compile Include="${path.join(root, "App/Infrastructure/Security/Auth/AuthenticationSessionEvents.cs")}" />
        <Compile Include="${path.join(root, "App/Infrastructure/Security/Auth/IndAuthEnv.cs")}" />
      </ItemGroup>
    </Project>`);
    writeFileSync(path.join(fixture, "Program.cs"), readFileSync(path.join(root, "tests/fixtures/authentication-session-lifecycle.cs.fixture")));
    const result = spawnSync("dotnet", ["run", "--configuration", "Release", "--project", path.join(fixture, "Lifecycle.csproj")],
      { cwd: fixture, encoding: "utf8", timeout: 180000 });
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.match(result.stdout, /Verified authentication lifecycle: .* checks/u);
    t.diagnostic(result.stdout.match(/Verified authentication lifecycle: .* checks/u)[0]);
  } finally {
    // Delete only the exact temporary directory created by this test.
    rmSync(fixture, { recursive: true, force: true });
  }
});
