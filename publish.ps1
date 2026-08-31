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
        # DEV publishes against the development ASP.NET Core environment.
        "DEV" { return "Development" }
        "PROD" { return "Production" }
        default { throw "Unsupported target environment '$TargetEnvironmentName'." }
    }
}

function Get-ExpectedApiBaseUrl {
    param(
        [Parameter(Mandatory = $true)]
        [string]$TargetEnvironmentName
    )

    switch ($TargetEnvironmentName.Trim().ToUpperInvariant()) {
        "DEV" { return "https://dev.insertec.biz:2083" }
        "PROD" { return "https://crm.insertec.biz:7776" }
        default { throw "Unsupported target environment '$TargetEnvironmentName'." }
    }
}

function Get-ExpectedWebEndpoint {
    param(
        [Parameter(Mandatory = $true)]
        [string]$TargetEnvironmentName
    )

    switch ($TargetEnvironmentName.Trim().ToUpperInvariant()) {
        "DEV" {
            return [pscustomobject]@{
                BaseUrl = "https://dev.insertec.biz:2053"
                Host = "dev.insertec.biz"
                Port = "2053"
            }
        }
        "PROD" {
            return [pscustomobject]@{
                BaseUrl = "https://crm.insertec.biz:7702"
                Host = "crm.insertec.biz"
                Port = "7702"
            }
        }
        default { throw "Unsupported target environment '$TargetEnvironmentName'." }
    }
}

function Normalize-BaseUrl {
    param(
        [Parameter(Mandatory = $true)]
        [string]$BaseUrl
    )

    return $BaseUrl.Trim().TrimEnd("/")
}

function Get-UriPort {
    param(
        [Parameter(Mandatory = $true)]
        [System.Uri]$Uri
    )

    if (-not $Uri.IsDefaultPort) {
        return [string]$Uri.Port
    }

    switch ($Uri.Scheme.ToLowerInvariant()) {
        "https" { return "443" }
        "http" { return "80" }
        default { return "" }
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

function Get-EffectiveWebBaseUrl {
    return Get-EnvironmentValue -Name "INDCRM_WEB_BASE_URL"
}

function Sync-WebWwwrootMirror {
    # Keeps the compatibility wwwroot mirror aligned before dotnet publish packages static assets.
    $repoRoot = [System.IO.Path]::GetFullPath($PSScriptRoot).TrimEnd("\")
    $sourcePath = [System.IO.Path]::GetFullPath((Join-Path $repoRoot "Web\wwwroot")).TrimEnd("\")
    $targetPath = [System.IO.Path]::GetFullPath((Join-Path $repoRoot "wwwroot")).TrimEnd("\")

    if (-not (Test-Path -LiteralPath $sourcePath -PathType Container)) {
        throw "Canonical web root '$sourcePath' does not exist."
    }

    $expectedTargetPath = [System.IO.Path]::GetFullPath((Join-Path $repoRoot "wwwroot")).TrimEnd("\")
    if (-not [System.StringComparer]::OrdinalIgnoreCase.Equals($targetPath, $expectedTargetPath)) {
        throw "Refusing to sync unexpected wwwroot mirror path '$targetPath'."
    }

    if (-not $sourcePath.StartsWith($repoRoot + "\", [System.StringComparison]::OrdinalIgnoreCase) -or
        -not $targetPath.StartsWith($repoRoot + "\", [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Refusing to sync web roots outside repository '$repoRoot'."
    }

    Write-Host ("Syncing static assets: {0} -> {1}" -f $sourcePath, $targetPath)
    robocopy $sourcePath $targetPath /MIR /NFL /NDL /NJH /NJS /NP /R:1 /W:1
    $rc = $LASTEXITCODE
    # Robocopy codes 0-7 are success, 8+ are failures.
    if ($rc -ge 8) {
        throw "Static asset sync failed with robocopy exit code $rc."
    }
}

function Invoke-CleanIisDeploy {
    # Mirrors the publish output into IIS and removes stale deployed files.
    param(
        [Parameter(Mandatory = $true)]
        [string]$SourcePath,
        [Parameter(Mandatory = $true)]
        [string]$TargetPath,
        [Parameter(Mandatory = $true)]
        [string]$CanonicalTargetPath
    )

    $resolvedSourcePath = [System.IO.Path]::GetFullPath($SourcePath).TrimEnd("\")
    $resolvedTargetPath = [System.IO.Path]::GetFullPath($TargetPath).TrimEnd("\")
    $resolvedCanonicalTargetPath = [System.IO.Path]::GetFullPath($CanonicalTargetPath).TrimEnd("\")

    if (-not (Test-Path -LiteralPath $resolvedSourcePath -PathType Container)) {
        throw "Publish output '$resolvedSourcePath' does not exist."
    }

    if (-not [System.StringComparer]::OrdinalIgnoreCase.Equals($resolvedTargetPath, $resolvedCanonicalTargetPath)) {
        throw "Refusing clean IIS deploy to unexpected path '$resolvedTargetPath'."
    }

    foreach ($requiredFile in @("IND_CRM_APP.dll", "IND_CRM_APP.runtimeconfig.json", "web.config")) {
        $requiredPath = Join-Path $resolvedSourcePath $requiredFile
        if (-not (Test-Path -LiteralPath $requiredPath -PathType Leaf)) {
            throw "Publish output is missing required file '$requiredFile'. Clean IIS deploy is blocked."
        }
    }

    if (-not (Test-Path -LiteralPath $resolvedTargetPath -PathType Container)) {
        New-Item -Path $resolvedTargetPath -ItemType Directory -Force | Out-Null
    }

    $logsPath = Join-Path $resolvedTargetPath "Logs"
    Write-Host ("Clean deploying published files: {0} -> {1}" -f $resolvedSourcePath, $resolvedTargetPath)
    Write-Host ("Preserving runtime logs: {0}" -f $logsPath)
    robocopy $resolvedSourcePath $resolvedTargetPath /MIR /XD $logsPath /NFL /NDL /NJH /NJS /NP /R:1 /W:1
    $rc = $LASTEXITCODE
    # Robocopy codes 0-7 are success, 8+ are failures.
    if ($rc -ge 8) {
        throw "Clean IIS deploy failed with robocopy exit code $rc."
    }
}

function Resolve-PublishOutputPath {
    # Resolves and validates the local publish output path before cleanup.
    param(
        [Parameter(Mandatory = $true)]
        [string]$OutputPath,
        [Parameter(Mandatory = $true)]
        [string]$RepositoryRoot
    )

    $resolvedRepositoryRoot = [System.IO.Path]::GetFullPath($RepositoryRoot).TrimEnd("\")
    $candidateOutputPath = if ([System.IO.Path]::IsPathRooted($OutputPath)) {
        $OutputPath
    }
    else {
        Join-Path $resolvedRepositoryRoot $OutputPath
    }
    $resolvedOutputPath = [System.IO.Path]::GetFullPath($candidateOutputPath).TrimEnd("\")

    if ([System.StringComparer]::OrdinalIgnoreCase.Equals($resolvedOutputPath, $resolvedRepositoryRoot)) {
        throw "Refusing to clean publish output because it resolves to the repository root."
    }

    if (-not $resolvedOutputPath.StartsWith($resolvedRepositoryRoot + "\", [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Refusing to clean publish output outside repository '$resolvedRepositoryRoot'."
    }

    return $resolvedOutputPath
}

function Clear-PublishOutput {
    # Removes stale local publish files before creating a fresh deploy package.
    param(
        [Parameter(Mandatory = $true)]
        [string]$ResolvedOutputPath
    )

    if (Test-Path -LiteralPath $resolvedOutputPath) {
        Write-Host ("Cleaning local publish output: {0}" -f $resolvedOutputPath)
        Remove-Item -LiteralPath $resolvedOutputPath -Recurse -Force
    }
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

if ($EffectiveApiBaseUrl.StartsWith("http://", [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "INDCRM_BASE_URL must use HTTPS for published DEV and PROD deployments."
}

$ExpectedApiBaseUrl = Get-ExpectedApiBaseUrl -TargetEnvironmentName $ResolvedTargetEnvironment
$NormalizedEffectiveApiBaseUrl = Normalize-BaseUrl -BaseUrl $EffectiveApiBaseUrl
if (-not [string]::Equals($NormalizedEffectiveApiBaseUrl, $ExpectedApiBaseUrl, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "API BaseUrl mismatch. Expected '$ExpectedApiBaseUrl' for target '$ResolvedTargetEnvironment' but found '$NormalizedEffectiveApiBaseUrl'."
}

$ExpectedWebEndpoint = Get-ExpectedWebEndpoint -TargetEnvironmentName $ResolvedTargetEnvironment
$EffectiveWebBaseUrl = Get-EffectiveWebBaseUrl
$WebPublicHost = Get-EnvironmentValue -Name "INDCRM_WEB_PUBLIC_HOST"
$WebPublicPort = Get-EnvironmentValue -Name "INDCRM_WEB_PUBLIC_PORT"

if ([string]::IsNullOrWhiteSpace($EffectiveWebBaseUrl)) {
    throw "INDCRM_WEB_BASE_URL is not configured. Publish is blocked because the deployed web endpoint cannot be validated for '$ResolvedTargetEnvironment'."
}

if ([string]::IsNullOrWhiteSpace($WebPublicHost)) {
    throw "INDCRM_WEB_PUBLIC_HOST is not configured. Publish is blocked because the deployed web host cannot be validated for '$ResolvedTargetEnvironment'."
}

if ([string]::IsNullOrWhiteSpace($WebPublicPort)) {
    throw "INDCRM_WEB_PUBLIC_PORT is not configured. Publish is blocked because the deployed web port cannot be validated for '$ResolvedTargetEnvironment'."
}

if ($EffectiveWebBaseUrl.StartsWith("http://", [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "INDCRM_WEB_BASE_URL must use HTTPS for published DEV and PROD deployments."
}

$NormalizedEffectiveWebBaseUrl = Normalize-BaseUrl -BaseUrl $EffectiveWebBaseUrl
try {
    $EffectiveWebUri = [System.Uri]$NormalizedEffectiveWebBaseUrl
}
catch {
    throw "INDCRM_WEB_BASE_URL must be an absolute HTTPS URL. Current value: '$EffectiveWebBaseUrl'."
}

if (-not $EffectiveWebUri.IsAbsoluteUri -or -not [string]::Equals($EffectiveWebUri.Scheme, "https", [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "INDCRM_WEB_BASE_URL must be an absolute HTTPS URL. Current value: '$EffectiveWebBaseUrl'."
}

$EffectiveWebUriPort = Get-UriPort -Uri $EffectiveWebUri
$NormalizedWebPublicHost = $WebPublicHost.Trim()
$NormalizedWebPublicPort = $WebPublicPort.Trim()
if (-not [string]::Equals($NormalizedWebPublicHost, $ExpectedWebEndpoint.Host, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Web public host mismatch. Expected '$($ExpectedWebEndpoint.Host)' for target '$ResolvedTargetEnvironment' but found '$NormalizedWebPublicHost'."
}

if (-not [string]::Equals($NormalizedWebPublicPort, $ExpectedWebEndpoint.Port, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Web public port mismatch. Expected '$($ExpectedWebEndpoint.Port)' for target '$ResolvedTargetEnvironment' but found '$NormalizedWebPublicPort'."
}

if (-not [string]::Equals($NormalizedEffectiveWebBaseUrl, $ExpectedWebEndpoint.BaseUrl, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Web BaseUrl mismatch. Expected '$($ExpectedWebEndpoint.BaseUrl)' for target '$ResolvedTargetEnvironment' but found '$NormalizedEffectiveWebBaseUrl'."
}

if (-not [string]::Equals($EffectiveWebUri.Host, $NormalizedWebPublicHost, [System.StringComparison]::OrdinalIgnoreCase) -or
    -not [string]::Equals($EffectiveWebUriPort, $NormalizedWebPublicPort, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "INDCRM_WEB_BASE_URL must match INDCRM_WEB_PUBLIC_HOST and INDCRM_WEB_PUBLIC_PORT. BaseUrl='$NormalizedEffectiveWebBaseUrl'; Host='$NormalizedWebPublicHost'; Port='$NormalizedWebPublicPort'."
}

Write-Host ("Publish guard: branch={0}; targetEnvironment={1}; aspNetCoreEnvironment={2}; apiBaseUrl={3}; webBaseUrl={4}" -f $CurrentBranch, $ResolvedTargetEnvironment, $ResolvedAspNetCoreEnvironment, $EffectiveApiBaseUrl, $EffectiveWebBaseUrl)

# Block deployment if any localization file has encoding corruption markers.
node scripts/check-resx-encoding.mjs
if ($LASTEXITCODE -ne 0) {
    throw "RESX encoding validation failed with exit code $LASTEXITCODE."
}

node scripts/check-localization-keys.mjs
if ($LASTEXITCODE -ne 0) {
    throw "Localization key coverage validation failed with exit code $LASTEXITCODE."
}

npm run test:static-chunks
if ($LASTEXITCODE -ne 0) {
    throw "Static chunk retention tests failed with exit code $LASTEXITCODE."
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

Sync-WebWwwrootMirror

# Publish the project directly to avoid solution-level output warnings.
$ResolvedOutputPath = Resolve-PublishOutputPath -OutputPath $OutputPath -RepositoryRoot $PSScriptRoot
Clear-PublishOutput -ResolvedOutputPath $ResolvedOutputPath
dotnet publish $ProjectPath -c $Configuration -o $ResolvedOutputPath
if ($LASTEXITCODE -ne 0) {
    throw "Publish failed with exit code $LASTEXITCODE."
}

# Preserve one prior hashed chunk generation for browser tabs opened before this deployment.
$StaticChunkRetentionScriptPath = Join-Path $PSScriptRoot "scripts\preserve-static-chunks.ps1"
if (-not (Test-Path -LiteralPath $StaticChunkRetentionScriptPath -PathType Leaf)) {
    throw "Static chunk retention script '$StaticChunkRetentionScriptPath' is missing."
}

& $StaticChunkRetentionScriptPath `
    -PublishOutputPath $ResolvedOutputPath `
    -IisPath $IisPath

if ($RestartIis) {
    iisreset /stop
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to stop IIS."
    }
}

try {
    Invoke-CleanIisDeploy -SourcePath $ResolvedOutputPath -TargetPath $IisPath -CanonicalTargetPath $CanonicalIisPath
}
finally {
    if ($RestartIis) {
        iisreset /start
    }
}
