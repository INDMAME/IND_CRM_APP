import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

// Compiles the real MVC actions and HTTP client against deterministic local dependencies.
test("whole-sheet deletion preserves authorization, durable recovery, HTTP status, and line-only behavior", () => {
  const root = path.resolve(import.meta.dirname, "..");
  const fixture = mkdtempSync(path.join(tmpdir(), "ind-sheet-deletion-"));
  const sourceFiles = [
    "Web/Controllers/Gastos/GastosController*.cs", "Web/Controllers/System/BaseMvcController.cs",
    "App/Models/**/*.cs", "App/Services/ICrmApiClient.cs", "App/Services/ITokenSessionService.cs",
    "App/Services/IIndAuthContextService.cs", "App/Services/ITicketBlobPreviewService.cs",
    "App/Services/Enums/ICrmEnumCatalog.cs", "App/Services/ApiClientService.cs", "App/Services/ApiClientDtos.cs",
    "App/Services/ApiException.cs", "App/Services/CrmHelpAnswerInstructions.cs", "App/Services/ApiHelpers/*.cs", "App/Services/Http/*.cs",
    "App/Infrastructure/Localization/INDSharedResource.cs", "App/Extensions/INDTempDataActionMarkExtensions.cs",
  ];
  const escapeXml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
  try {
    writeFileSync(path.join(fixture, "global.json"), readFileSync(path.join(root, "global.json")));
    writeFileSync(path.join(fixture, "Deletion.csproj"), `<Project Sdk="Microsoft.NET.Sdk.Web">
      <PropertyGroup><TargetFramework>net10.0</TargetFramework><ImplicitUsings>enable</ImplicitUsings><Nullable>enable</Nullable></PropertyGroup>
      <ItemGroup>${sourceFiles.map((file) => `<Compile Include="${escapeXml(path.join(root, file))}" />`).join("")}</ItemGroup>
    </Project>`);
    writeFileSync(path.join(fixture, "Program.cs"), readFileSync(path.join(root, "tests/fixtures/expense-sheet-deletion.cs.fixture")));
    const result = spawnSync("dotnet", ["run", "--project", path.join(fixture, "Deletion.csproj")],
      { cwd: fixture, encoding: "utf8", timeout: 120000 });
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.match(result.stdout, /Verified 24 durable deletion cases\./u);
  } finally {
    const resolved = path.resolve(fixture);
    assert.equal(path.dirname(resolved), path.resolve(tmpdir()));
    assert.ok(path.basename(resolved).startsWith("ind-sheet-deletion-"));
    rmSync(resolved, { recursive: true, force: true });
  }
});
