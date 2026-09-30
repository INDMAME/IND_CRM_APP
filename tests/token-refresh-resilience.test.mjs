import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import test from "node:test";

// Compiles the real client and middleware without rebuilding the web application.
test("token refresh preserves valid sessions only after confirmed transient failures", (t) => {
  const root = path.resolve(import.meta.dirname, "..");
  const fixture = mkdtempSync(path.join(tmpdir(), "ind-token-refresh-"));
  try {
    writeFileSync(path.join(fixture, "global.json"), readFileSync(path.join(root, "global.json")));
    const focusedSources = ["App/Services/ApiClientService.cs", "App/Middleware/TokenRefreshMiddleware.cs"];
    for (const source of focusedSources) {
      const content = process.env.IND_TOKEN_REFRESH_BASELINE === "1"
        ? execFileSync("git", ["show", `HEAD:${source}`], { cwd: root })
        : readFileSync(path.join(root, source));
      writeFileSync(path.join(fixture, path.basename(source)), content);
    }
    const sources = [
      "App/Models/Activities/*.cs", "App/Models/CRM/*.cs", "App/Models/Shared/*.cs",
      "App/Services/ApiHelpers/*.cs", "App/Services/Http/*.cs", "App/Services/ApiClientDtos.cs",
      "App/Services/ApiException.cs", "App/Services/ICrmApiClient.cs", "App/Services/CrmHelpAnswerInstructions.cs",
      "App/Services/TokenSessionService.cs", "App/Services/ITokenSessionService.cs",
      "App/Infrastructure/Security/Auth/IndErrorEndpointAttribute.cs",
      "App/Infrastructure/Security/Auth/LocalReturnUrlHelper.cs",
    ];
    writeFileSync(path.join(fixture, "Refresh.csproj"), `<Project Sdk="Microsoft.NET.Sdk.Web">
      <PropertyGroup><TargetFramework>net10.0</TargetFramework><ImplicitUsings>enable</ImplicitUsings><Nullable>enable</Nullable></PropertyGroup>
      <ItemGroup>${sources.map(source => `<Compile Include="${path.join(root, source)}" />`).join("\n")}</ItemGroup>
    </Project>`);
    writeFileSync(path.join(fixture, "Program.cs"), readFileSync(path.join(root, "tests/fixtures/token-refresh-resilience.cs.fixture")));
    const result = spawnSync("dotnet", ["run", "--configuration", "Release", "--project", path.join(fixture, "Refresh.csproj")],
      { cwd: fixture, encoding: "utf8", timeout: 180000 });
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.match(result.stdout, /Verified token refresh resilience: \d+ checks/u);
    t.diagnostic(result.stdout.match(/Verified token refresh resilience: \d+ checks/u)[0]);
  } finally {
    // Remove only the exact temporary directory created for this fixture.
    assert.equal(path.dirname(path.resolve(fixture)), path.resolve(tmpdir()));
    assert.ok(path.basename(fixture).startsWith("ind-token-refresh-"));
    rmSync(fixture, { recursive: true, force: true });
  }
});
