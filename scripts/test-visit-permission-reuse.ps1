param([string]$AssemblyPath = "")
$ErrorActionPreference = "Stop"
$repo = Split-Path $PSScriptRoot -Parent
if (-not $AssemblyPath) { $AssemblyPath = Join-Path $repo "bin\Release\net10.0\IND_CRM_APP.dll" }
$assembly = (Resolve-Path -LiteralPath $AssemblyPath).Path
$testRoot = Join-Path ([IO.Path]::GetTempPath()) ("visit-permission-tests-" + [guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path $testRoot | Out-Null
# Use the installed SDK and shared framework without adding test package dependencies.
$escapedAssembly = [Security.SecurityElement]::Escape($assembly)
@"
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup><OutputType>Exe</OutputType><TargetFramework>net10.0</TargetFramework><ImplicitUsings>enable</ImplicitUsings><Nullable>enable</Nullable></PropertyGroup>
  <ItemGroup><FrameworkReference Include="Microsoft.AspNetCore.App" /><Reference Include="IND_CRM_APP"><HintPath>$escapedAssembly</HintPath></Reference></ItemGroup>
</Project>
"@ | Set-Content -LiteralPath (Join-Path $testRoot "Tests.csproj") -Encoding UTF8
Copy-Item -LiteralPath (Join-Path $repo "tests\fixtures\visit-permission-reuse.cs.txt") -Destination (Join-Path $testRoot "Program.cs")
# Keep the standalone harness independent from an unrelated checkout SDK pin.
Push-Location $testRoot
try {
    dotnet run --project (Join-Path $testRoot "Tests.csproj") --configuration Release
    if ($LASTEXITCODE -ne 0) { throw "Visit permission reuse tests failed." }
}
finally { Pop-Location }
