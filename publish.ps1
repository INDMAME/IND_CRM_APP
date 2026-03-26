param(
    [string]$ProjectPath = ".\\IND_CRM_APP.csproj",
    [string]$OutputPath = ".\\.publish_tmp",
    [string]$Configuration = "Release",
    [string]$IisPath = "C:\\inetpub\\wwwroot\\IND_CRM_APP",
    [switch]$RestartIis = $true,
    [ValidateSet("DEV", "PROD")]
    [string]$TargetEnvironment,
    [switch]$AllowBranchEnvironmentMismatch = $false
)

function Get-EnvironmentValue {
    param(
        [Parameter(Mandatory = $true)]
        [string]$Name
    )

    foreach ($scope in @("Process", "User", "Machine")) {
        $value = [Environment]::GetEnvironmentVariable($Name, $scope)
        if (-not [string]::IsNullOrWhiteSpace($value)) {
            return $value.Trim()
        }
    }

    return ""
}

function Resolve-TargetEnvironment {
    param(
        [string]$ExplicitTargetEnvironment
    )

    if (-not [string]::IsNullOrWhiteSpace($ExplicitTargetEnvironment)) {
        return $ExplicitTargetEnvironment.Trim().ToUpperInvariant()
    }

    $configuredEnvironment = Get-EnvironmentValue -Name "IND_ENV"
    if ([string]::IsNullOrWhiteSpace($configuredEnvironment)) {
        throw "IND_ENV is not configured. Set IND_ENV on the machine or pass -TargetEnvironment DEV/PROD."
    }

    $normalized = $configuredEnvironment.Trim().ToUpperInvariant()
    if ($normalized -notin @("DEV", "PROD")) {
        throw "IND_ENV must be DEV or PROD. Current value: '$configuredEnvironment'."
    }

    return $normalized
}

function Get-ExpectedAspNetCoreEnvironment {
    param(
        [Parameter(Mandatory = $true)]
        [string]$TargetEnvironmentName
    )

    switch ($TargetEnvironmentName.Trim().ToUpperInvariant()) {
        "DEV" { return "Development" }
        "PROD" { return "Production" }
        default { throw "Unsupported target environment '$TargetEnvironmentName'." }
    }
}

function Resolve-AspNetCoreEnvironment {
    $configuredEnvironment = Get-EnvironmentValue -Name "ASPNETCORE_ENVIRONMENT"
    if ([string]::IsNullOrWhiteSpace($configuredEnvironment)) {
        throw "ASPNETCORE_ENVIRONMENT is not configured. Set it on the machine before publishing IND_CRM_APP."
    }

    return $configuredEnvironment.Trim()
}

function Get-CurrentGitBranch {
    $branch = git rev-parse --abbrev-ref HEAD 2>$null
    if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($branch)) {
        throw "Unable to resolve the current git branch. Publish is blocked for safety."
    }

    return $branch.Trim()
}

function Normalize-BranchEnvironment {
    param(
        [Parameter(Mandatory = $true)]
        [string]$BranchName
    )

    switch ($BranchName.Trim().ToUpperInvariant()) {
        "DEV" { return "DEV" }
        "PROD" { return "PROD" }
        "MAIN" { return "PROD" }
        default { return "" }
    }
}

function Get-EffectiveApiBaseUrl {
    $directValue = Get-EnvironmentValue -Name "ApiSettings__BaseUrl"
    if (-not [string]::IsNullOrWhiteSpace($directValue)) {
        return $directValue
    }

    return Get-EnvironmentValue -Name "INDCRM_BASE_URL"
}

# Enforce the canonical IIS deployment directory for this project.
$CanonicalIisPath = "C:\\inetpub\\wwwroot\\IND_CRM_APP"
$ResolvedIisPath = [System.IO.Path]::GetFullPath($IisPath).TrimEnd("\\")
$ResolvedCanonicalIisPath = [System.IO.Path]::GetFullPath($CanonicalIisPath).TrimEnd("\\")
if (-not [System.StringComparer]::OrdinalIgnoreCase.Equals($ResolvedIisPath, $ResolvedCanonicalIisPath)) {
    throw "IIS publish path must be '$CanonicalIisPath'. Received '$IisPath'."
}
$IisPath = $CanonicalIisPath

$ResolvedTargetEnvironment = Resolve-TargetEnvironment -ExplicitTargetEnvironment $TargetEnvironment
$ExpectedAspNetCoreEnvironment = Get-ExpectedAspNetCoreEnvironment -TargetEnvironmentName $ResolvedTargetEnvironment
$ResolvedAspNetCoreEnvironment = Resolve-AspNetCoreEnvironment
$CurrentBranch = Get-CurrentGitBranch
$CurrentBranchEnvironment = Normalize-BranchEnvironment -BranchName $CurrentBranch
if ([string]::IsNullOrWhiteSpace($CurrentBranchEnvironment)) {
    throw "Current git branch '$CurrentBranch' does not map to DEV or PROD. Publish is blocked for safety."
}

if (-not $AllowBranchEnvironmentMismatch -and $CurrentBranchEnvironment -ne $ResolvedTargetEnvironment) {
    throw "Branch/environment mismatch. Current branch '$CurrentBranch' maps to '$CurrentBranchEnvironment' but target environment is '$ResolvedTargetEnvironment'."
}

if (-not [string]::Equals($ResolvedAspNetCoreEnvironment, $ExpectedAspNetCoreEnvironment, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "ASPNETCORE_ENVIRONMENT mismatch. Expected '$ExpectedAspNetCoreEnvironment' for target '$ResolvedTargetEnvironment' but found '$ResolvedAspNetCoreEnvironment'."
}

$EffectiveApiBaseUrl = Get-EffectiveApiBaseUrl
if ([string]::IsNullOrWhiteSpace($EffectiveApiBaseUrl)) {
    throw "Neither ApiSettings__BaseUrl nor INDCRM_BASE_URL is configured. Publish is blocked because the deployed app would not know which API environment to use."
}

if ($ResolvedTargetEnvironment -eq "PROD" -and $EffectiveApiBaseUrl.StartsWith("http://", [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "INDCRM_BASE_URL must use HTTPS for PROD."
}

Write-Host ("Publish guard: branch={0}; targetEnvironment={1}; aspNetCoreEnvironment={2}; apiBaseUrl={3}" -f $CurrentBranch, $ResolvedTargetEnvironment, $ResolvedAspNetCoreEnvironment, $EffectiveApiBaseUrl)

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
