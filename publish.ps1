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

    Assert-RegularPublishPath -Path $sourcePath -CheckChildren
    Assert-RegularPublishPath -Path $targetPath -CheckChildren

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

    Assert-RegularPublishPath -Path $resolvedSourcePath -CheckChildren
    Assert-RegularPublishPath -Path $resolvedTargetPath -CheckChildren

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

    $allowedOutputRoot = Join-Path $resolvedRepositoryRoot ".publish_tmp"
    if (-not [System.StringComparer]::OrdinalIgnoreCase.Equals($resolvedOutputPath, $allowedOutputRoot) -and
        -not $resolvedOutputPath.StartsWith($allowedOutputRoot + "\", [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Publish output must be '.publish_tmp' or a custom directory beneath it. Refusing '$resolvedOutputPath'."
    }

    Assert-RegularPublishPath -Path $resolvedOutputPath -CheckChildren
    return $resolvedOutputPath
}

function Assert-RegularPublishPath {
    # Rejects links before recursive cleanup or mirroring can cross a trusted directory.
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path,
        [switch]$CheckChildren
    )

    $resolvedPath = [System.IO.Path]::GetFullPath($Path).TrimEnd("\")
    if ($resolvedPath -match '(^|[\\/])\.git([\\/]|$)') {
        throw "Publish paths cannot include Git metadata: '$resolvedPath'."
    }

    $ancestorPath = $resolvedPath
    while (-not [string]::IsNullOrWhiteSpace($ancestorPath)) {
        if (Test-Path -LiteralPath $ancestorPath -ErrorAction Stop) {
            $item = Get-Item -LiteralPath $ancestorPath -Force -ErrorAction Stop
            if (($item.Attributes -band [System.IO.FileAttributes]::ReparsePoint) -ne 0) {
                throw "Publish paths cannot traverse a reparse point: '$ancestorPath'."
            }
        }
        $ancestorPath = [System.IO.Path]::GetDirectoryName($ancestorPath)
    }

    if ($CheckChildren -and (Test-Path -LiteralPath $resolvedPath -PathType Container)) {
        $pendingDirectories = New-Object 'System.Collections.Generic.Stack[string]'
        $pendingDirectories.Push($resolvedPath)
        while ($pendingDirectories.Count -gt 0) {
            foreach ($item in Get-ChildItem -LiteralPath $pendingDirectories.Pop() -Force -ErrorAction Stop) {
                if (($item.Attributes -band [System.IO.FileAttributes]::ReparsePoint) -ne 0 -or $item.Name -eq '.git') {
                    throw "Publish directory contains a link or Git metadata: '$($item.FullName)'."
                }
                if ($item.PSIsContainer) {
                    $pendingDirectories.Push($item.FullName)
                }
            }
        }
    }
}

function Clear-PublishOutput {
    # Removes stale local publish files before creating a fresh deploy package.
    param(
        [Parameter(Mandatory = $true)]
        [string]$ResolvedOutputPath,
        [Parameter(Mandatory = $true)]
        [string]$RepositoryRoot
    )

    $safeOutputPath = Resolve-PublishOutputPath -OutputPath $ResolvedOutputPath -RepositoryRoot $RepositoryRoot
    if (Test-Path -LiteralPath $safeOutputPath) {
        Write-Host ("Cleaning local publish output: {0}" -f $safeOutputPath)
        Remove-Item -LiteralPath $safeOutputPath -Recurse -Force -ErrorAction Stop
    }
}

function Invoke-CrmAppCmd {
    # Uses the native IIS tool consistently in Windows PowerShell and PowerShell 7.
    param([Parameter(Mandatory = $true)][string[]]$Arguments)

    $appCmdPath = Join-Path $env:windir "System32\inetsrv\appcmd.exe"
    if (-not (Test-Path -LiteralPath $appCmdPath -PathType Leaf)) {
        throw "IIS appcmd.exe is unavailable."
    }
    $output = & $appCmdPath @Arguments 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "IIS command failed with exit code ${LASTEXITCODE}: $($output -join ' ')"
    }
    return ($output -join [Environment]::NewLine).Trim()
}

function Get-CrmIisDeploymentTarget {
    # Confirms the CRM root and exclusive pool before touching deployed files or state.
    param([Parameter(Mandatory = $true)][string]$CanonicalTargetPath)

    $siteName = "IND_CRM_APP"
    $poolName = "IND_CRM_APP"
    $appName = "$siteName/"
    [xml]$applications = Invoke-CrmAppCmd -Arguments @("list", "app", "/xml")
    [xml]$virtualDirectories = Invoke-CrmAppCmd -Arguments @("list", "vdir", "/xml")
    $application = @($applications.appcmd.APP | Where-Object { $_.'APP.NAME' -eq $appName })
    $rootDirectory = @($virtualDirectories.appcmd.VDIR | Where-Object { $_.'APP.NAME' -eq $appName -and $_.path -eq '/' })
    if ($application.Count -ne 1 -or $application[0].'SITE.NAME' -ne $siteName -or
        $application[0].'APPPOOL.NAME' -ne $poolName -or $rootDirectory.Count -ne 1) {
        throw "The canonical CRM IIS site, application or pool could not be verified."
    }
    $resolvedPhysicalPath = [System.IO.Path]::GetFullPath(
        [Environment]::ExpandEnvironmentVariables($rootDirectory[0].physicalPath)).TrimEnd("\")
    $expectedPhysicalPath = [System.IO.Path]::GetFullPath($CanonicalTargetPath).TrimEnd("\")
    if (-not [System.StringComparer]::OrdinalIgnoreCase.Equals($resolvedPhysicalPath, $expectedPhysicalPath)) {
        throw "CRM IIS physical path '$resolvedPhysicalPath' does not match '$expectedPhysicalPath'."
    }
    $sharedApplications = @($applications.appcmd.APP | Where-Object {
        $_.'APPPOOL.NAME' -eq $poolName -and $_.'APP.NAME' -ne $appName
    })
    if ($sharedApplications.Count -gt 0) {
        throw "CRM application pool is shared with another application. Scoped deployment is blocked."
    }
    Assert-RegularPublishPath -Path $resolvedPhysicalPath -CheckChildren
    $poolState = Invoke-CrmAppCmd -Arguments @("list", "apppool", $poolName, "/text:state")
    if ($poolState -notin @("Started", "Stopped")) {
        throw "CRM application pool has an unexpected or transitional state '$poolState'."
    }
    return [pscustomobject]@{ PoolName = $poolName; State = $poolState }
}

function Set-CrmIisPoolState {
    # Waits for the requested state and treats command or transition failures as deployment failures.
    param(
        [Parameter(Mandatory = $true)][string]$PoolName,
        [Parameter(Mandatory = $true)][ValidateSet("Started", "Stopped")][string]$State
    )

    $currentState = Invoke-CrmAppCmd -Arguments @("list", "apppool", $PoolName, "/text:state")
    if ($currentState -eq $State) { return }
    $verb = if ($State -eq "Started") { "start" } else { "stop" }
    Invoke-CrmAppCmd -Arguments @($verb, "apppool", "/apppool.name:$PoolName") | Out-Null
    $deadline = [DateTime]::UtcNow.AddSeconds(30)
    do {
        $currentState = Invoke-CrmAppCmd -Arguments @("list", "apppool", $PoolName, "/text:state")
        if ($currentState -eq $State) { return }
        Start-Sleep -Milliseconds 250
    } while ([DateTime]::UtcNow -lt $deadline)
    throw "CRM application pool '$PoolName' did not reach '$State'. Last state: '$currentState'."
}

function Invoke-CrmScopedIisDeploy {
    # Restores only a previously running CRM pool, including when copying fails.
    param(
        [Parameter(Mandatory = $true)][string]$SourcePath,
        [Parameter(Mandatory = $true)][string]$CanonicalTargetPath,
        [bool]$RestartPool = $true
    )

    $target = Get-CrmIisDeploymentTarget -CanonicalTargetPath $CanonicalTargetPath
    $restoreRunningPool = $RestartPool -and $target.State -eq "Started"
    try {
        if ($restoreRunningPool) {
            Set-CrmIisPoolState -PoolName $target.PoolName -State "Stopped"
        }
        Invoke-CleanIisDeploy -SourcePath $SourcePath -TargetPath $CanonicalTargetPath -CanonicalTargetPath $CanonicalTargetPath
    }
    finally {
        if ($restoreRunningPool) {
            Set-CrmIisPoolState -PoolName $target.PoolName -State "Started"
        }
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
Clear-PublishOutput -ResolvedOutputPath $ResolvedOutputPath -RepositoryRoot $PSScriptRoot
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

# Keep the existing switch name while limiting restarts to the verified CRM pool.
Invoke-CrmScopedIisDeploy -SourcePath $ResolvedOutputPath -CanonicalTargetPath $CanonicalIisPath -RestartPool ([bool]$RestartIis)
