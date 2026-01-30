param(
    [string]$ProjectPath = ".\\IND_CRM_APP.csproj",
    [string]$OutputPath = ".\\.publish_tmp",
    [string]$Configuration = "Release",
    [string]$IisPath = "C:\\inetpub\\wwwroot\\IND_CRM_APP",
    [switch]$RestartIis = $true
)

# Build frontend assets and sync Web/wwwroot -> wwwroot.
npm run build
if ($LASTEXITCODE -ne 0) {
    throw "Frontend build failed with exit code $LASTEXITCODE."
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
