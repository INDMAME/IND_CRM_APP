import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

// Compiles a small harness that reflects over the real controller guard.
test("expense mutations honor company-scoped CRM and AX ownership", () => {
  const root = path.resolve(import.meta.dirname, "..");
  const directory = mkdtempSync(path.join(tmpdir(), "ind-expense-owner-"));
  const project = path.join(directory, "ExpenseOwnerGuard.csproj");
  const app = path.join(root, "IND_CRM_APP.csproj");
  const fixture = path.join(root, "tests", "fixtures", "expense-sheet-company-owner-guard.cs.fixture");
  const xml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;");

  try {
    writeFileSync(project, `<Project Sdk="Microsoft.NET.Sdk">
      <PropertyGroup><OutputType>Exe</OutputType><TargetFramework>net10.0</TargetFramework><ImplicitUsings>enable</ImplicitUsings><Nullable>enable</Nullable><EnableDefaultCompileItems>false</EnableDefaultCompileItems></PropertyGroup>
      <ItemGroup><FrameworkReference Include="Microsoft.AspNetCore.App"/><ProjectReference Include="${xml(app)}"/><Compile Include="${xml(fixture)}" Link="Program.cs"/></ItemGroup>
    </Project>`);
    const result = spawnSync("dotnet", ["run", "--project", project], {
      cwd: directory, encoding: "utf8", timeout: 120000,
    });
    assert.equal(result.status, 0, result.stdout + result.stderr);
    assert.match(result.stdout, /Verified 50 company-scoped expense owner guard cases\./u);
  } finally {
    const resolved = path.resolve(directory);
    assert.equal(path.dirname(resolved), path.resolve(tmpdir()));
    assert.ok(path.basename(resolved).startsWith("ind-expense-owner-"));
    rmSync(resolved, { recursive: true, force: true });
  }
});
