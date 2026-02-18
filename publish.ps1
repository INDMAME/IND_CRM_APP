param(
    [string]$ProjectPath = ".\\IND_CRM_APP.csproj",
    [string]$OutputPath = ".\\.publish_tmp",
    [string]$Configuration = "Release",
    [string]$IisPath = "C:\\inetpub\\wwwroot\\IND_CRM_APP",
    [switch]$RestartIis = $true
)

# Enforce the canonical IIS deployment directory for this project.
$CanonicalIisPath = "C:\\inetpub\\wwwroot\\IND_CRM_APP"
$ResolvedIisPath = [System.IO.Path]::GetFullPath($IisPath).TrimEnd("\\")
$ResolvedCanonicalIisPath = [System.IO.Path]::GetFullPath($CanonicalIisPath).TrimEnd("\\")
if (-not [System.StringComparer]::OrdinalIgnoreCase.Equals($ResolvedIisPath, $ResolvedCanonicalIisPath)) {
    throw "IIS publish path must be '$CanonicalIisPath'. Received '$IisPath'."
}
$IisPath = $CanonicalIisPath

# Block deployment if any localization file has encoding corruption markers.
node scripts/check-resx-encoding.mjs
if ($LASTEXITCODE -ne 0) {
    throw "RESX encoding validation failed with exit code $LASTEXITCODE."
}

node scripts/check-localization-keys.mjs
if ($LASTEXITCODE -ne 0) {
    throw "Localization key coverage validation failed with exit code $LASTEXITCODE."
}

# Build frontend assets and sync Web/wwwroot -> wwwroot.
# Use the production React bundle for publish deployments.
npm run build:react:prod
if ($LASTEXITCODE -ne 0) {
    throw "React frontend build failed with exit code $LASTEXITCODE."
}

npm run build:css
if ($LASTEXITCODE -ne 0) {
    throw "CSS build failed with exit code $LASTEXITCODE."
}

# Publish the project directly to avoid solution-level output warnings.
dotnet publish $ProjectPath -c $Configuration -o $OutputPath
if ($LASTEXITCODE -ne 0) {
    throw "Publish failed with exit code $LASTEXITCODE."
}

if ($RestartIis) {
    iisreset /stop
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to stop IIS."
    }
}

try {
    robocopy $OutputPath $IisPath /E /NFL /NDL /NJH /NJS /NP /R:1 /W:1
    $rc = $LASTEXITCODE
    # Robocopy codes 0-7 are success, 8+ are failures.
    if ($rc -ge 8) {
        throw "Robocopy failed with exit code $rc."
    }
}
finally {
    if ($RestartIis) {
        iisreset /start
    }
}
