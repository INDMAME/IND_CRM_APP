param(
    [string]$ProjectPath = ".\\IND_CRM_APP.csproj",
    [string]$OutputPath = ".\\.publish_tmp",
    [string]$Configuration = "Release",
    [string]$IisPath = "C:\\inetpub\\wwwroot\\IND_CRM_APP",
    [switch]$RestartIis = $true,
    [ValidateSet("DEV", "PROD")]
    [string]$TargetEnvironment,
    [string]$DeployedHotfixBaseCommit = "",
    [string]$DeployedHotfixBaseSha256 = "",
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

function Resolve-GitCommit {
    # Resolves a revision to one full commit id without changing repository state.
    param(
        [Parameter(Mandatory = $true)]
        [string]$Revision
    )

    $commit = git rev-parse --verify "$Revision`^{commit}" 2>$null
    if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($commit)) {
        throw "Unable to resolve git revision '$Revision'. Publish is blocked for safety."
    }

    return $commit.Trim().ToLowerInvariant()
}

function Get-FileSha256 {
    # Returns a normalized SHA256 for one required deployment file.
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path
    )

    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
        throw "Required deployment file '$Path' does not exist."
    }

    return (Get-FileHash -Algorithm SHA256 -LiteralPath $Path).Hash.ToLowerInvariant()
}

function Get-AssemblyProductCommit {
    # Extracts the source commit embedded in the .NET assembly ProductVersion.
    param(
        [Parameter(Mandatory = $true)]
        [string]$AssemblyPath
    )

    if (-not (Test-Path -LiteralPath $AssemblyPath -PathType Leaf)) {
        throw "Required assembly '$AssemblyPath' does not exist."
    }

    $productVersion = [System.Diagnostics.FileVersionInfo]::GetVersionInfo($AssemblyPath).ProductVersion
    $commitMatches = [regex]::Matches([string]$productVersion, '(?i)[0-9a-f]{40}')
    if ($commitMatches.Count -ne 1) {
        throw "Assembly '$AssemblyPath' ProductVersion does not contain exactly one full source commit."
    }

    return $commitMatches[0].Value.ToLowerInvariant()
}

function Assert-HotfixProtectedPathsUnchanged {
    # Keeps project, startup, dependency lock, and resource inputs identical to the deployed base.
    param(
        [Parameter(Mandatory = $true)]
        [string]$BaseCommit
    )

    $protectedPaths = @(
        "IND_CRM_APP.csproj",
        "Program.cs",
        "package-lock.json",
        "packages.lock.json",
        "Directory.Build.props",
        "Directory.Build.targets",
        "Directory.Packages.props",
        "global.json",
        "App/Resources",
        "App/Infrastructure/Localization"
    )

    $changedPaths = @(git diff --name-only $BaseCommit -- $protectedPaths 2>$null)
    if ($LASTEXITCODE -ne 0) {
        throw "Unable to compare protected hotfix inputs with base '$BaseCommit'."
    }

    $untrackedPaths = @(git ls-files --others --exclude-standard -- $protectedPaths 2>$null)
    if ($LASTEXITCODE -ne 0) {
        throw "Unable to inspect untracked protected hotfix inputs."
    }

    $unexpectedPaths = @($changedPaths + $untrackedPaths | Where-Object { -not [string]::IsNullOrWhiteSpace($_) } | Sort-Object -Unique)
    if ($unexpectedPaths.Count -gt 0) {
        throw "Protected hotfix inputs differ from deployed base '$BaseCommit': $($unexpectedPaths -join ', ')."
    }
}

function Assert-HotfixWorkingTreeClean {
    # Prevents uncommitted or untracked content from entering a commit-stamped hotfix DLL.
    $statusLines = @(git status --porcelain=v1 --untracked-files=all 2>$null)
    if ($LASTEXITCODE -ne 0) {
        throw "Unable to verify the hotfix working tree state."
    }

    $dirtyEntries = @($statusLines | Where-Object { -not [string]::IsNullOrWhiteSpace($_) })
    if ($dirtyEntries.Count -gt 0) {
        throw "A live production hotfix requires a clean git working tree. Commit or remove these entries: $($dirtyEntries -join ', ')."
    }
}

function Assert-DeployedHotfixBase {
    # Authorizes a PROD hotfix only when IIS still runs the explicitly declared base build.
    param(
        [Parameter(Mandatory = $true)]
        [string]$BranchName,
        [string]$ExplicitTargetEnvironment,
        [string]$BaseCommit,
        [string]$BaseSha256,
        [Parameter(Mandatory = $true)]
        [string]$IisPath,
        [Parameter(Mandatory = $true)]
        [bool]$RestartIisRequested
    )

    if ($BranchName -notmatch '(?i)^hotfix/.+') {
        throw "DeployedHotfixBaseCommit and DeployedHotfixBaseSha256 are only valid from a 'hotfix/*' branch. Current branch: '$BranchName'."
    }

    if ([string]::IsNullOrWhiteSpace($ExplicitTargetEnvironment) -or
        -not [string]::Equals($ExplicitTargetEnvironment.Trim(), "PROD", [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "A 'hotfix/*' publish requires explicit -TargetEnvironment PROD."
    }

    if (-not $RestartIisRequested) {
        throw "A live production hotfix requires IIS restart protection. Do not pass -RestartIis:`$false."
    }

    if ([string]::IsNullOrWhiteSpace($BaseCommit) -or $BaseCommit.Trim() -notmatch '^[0-9a-fA-F]{40}$') {
        throw "A 'hotfix/*' publish requires -DeployedHotfixBaseCommit with exactly 40 hexadecimal characters."
    }

    if ([string]::IsNullOrWhiteSpace($BaseSha256) -or $BaseSha256.Trim() -notmatch '^[0-9a-fA-F]{64}$') {
        throw "A 'hotfix/*' publish requires -DeployedHotfixBaseSha256 with exactly 64 hexadecimal characters."
    }

    $normalizedBaseCommit = $BaseCommit.Trim().ToLowerInvariant()
    $resolvedBaseCommit = Resolve-GitCommit -Revision $normalizedBaseCommit
    if (-not [string]::Equals($normalizedBaseCommit, $resolvedBaseCommit, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Declared deployed hotfix base '$normalizedBaseCommit' did not resolve to the same full commit '$resolvedBaseCommit'."
    }

    git merge-base --is-ancestor $resolvedBaseCommit HEAD 2>$null
    if ($LASTEXITCODE -ne 0) {
        throw "Deployed hotfix base '$resolvedBaseCommit' is not an ancestor of HEAD. Publish is blocked for safety."
    }

    $liveAssemblyPath = Join-Path $IisPath "IND_CRM_APP.dll"
    $normalizedBaseSha256 = $BaseSha256.Trim().ToLowerInvariant()
    $liveSha256 = Get-FileSha256 -Path $liveAssemblyPath
    if (-not [string]::Equals($liveSha256, $normalizedBaseSha256, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Live IIS assembly SHA256 no longer matches the declared deployed hotfix base. Another deployment may have occurred."
    }

    $liveProductCommit = Get-AssemblyProductCommit -AssemblyPath $liveAssemblyPath
    if (-not [string]::Equals($liveProductCommit, $resolvedBaseCommit, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Live IIS assembly ProductVersion commit '$liveProductCommit' does not match deployed hotfix base '$resolvedBaseCommit'."
    }

    return [pscustomobject]@{
        Commit = $resolvedBaseCommit
        Sha256 = $liveSha256
        AssemblyPath = $liveAssemblyPath
    }
}

function Assert-PublishedRuntimeContract {
    # Requires dependency metadata from the new stage to remain byte-identical to live IIS.
    param(
        [Parameter(Mandatory = $true)]
        [string]$SourcePath,
        [Parameter(Mandatory = $true)]
        [string]$TargetPath
    )

    foreach ($fileName in @("IND_CRM_APP.deps.json", "IND_CRM_APP.runtimeconfig.json")) {
        $sourceFile = Join-Path $SourcePath $fileName
        $targetFile = Join-Path $TargetPath $fileName
        $sourceSha256 = Get-FileSha256 -Path $sourceFile
        $targetSha256 = Get-FileSha256 -Path $targetFile
        if (-not [string]::Equals($sourceSha256, $targetSha256, [System.StringComparison]::OrdinalIgnoreCase)) {
            throw "Hotfix runtime contract mismatch for '$fileName'. Selective DLL deployment is blocked."
        }
    }
}

function Assert-StagedHotfixAssembly {
    # Ensures the newly published DLL identifies the exact commit being deployed.
    param(
        [Parameter(Mandatory = $true)]
        [string]$SourcePath
    )

    $headCommit = Resolve-GitCommit -Revision "HEAD"
    $stagedAssemblyPath = Join-Path $SourcePath "IND_CRM_APP.dll"
    $stagedProductCommit = Get-AssemblyProductCommit -AssemblyPath $stagedAssemblyPath
    if (-not [string]::Equals($stagedProductCommit, $headCommit, [System.StringComparison]::OrdinalIgnoreCase)) {
        throw "Staged IIS assembly ProductVersion commit '$stagedProductCommit' does not match HEAD '$headCommit'."
    }

    $stagedPdbPath = Join-Path $SourcePath "IND_CRM_APP.pdb"
    if (-not (Test-Path -LiteralPath $stagedPdbPath -PathType Leaf)) {
        throw "Publish output is missing required hotfix symbol file 'IND_CRM_APP.pdb'."
    }

    return $headCommit
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

function Invoke-LiveProductionHotfixDeploy {
    # Replaces only the main application assembly and symbols for a base-pinned hotfix.
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
        throw "Refusing selective IIS hotfix deploy to unexpected path '$resolvedTargetPath'."
    }

    if (-not (Test-Path -LiteralPath $resolvedTargetPath -PathType Container)) {
        throw "Live IIS path '$resolvedTargetPath' does not exist. Selective hotfix deploy is blocked."
    }

    $hotfixFiles = @("IND_CRM_APP.pdb", "IND_CRM_APP.dll")
    foreach ($fileName in $hotfixFiles) {
        $sourceFile = Join-Path $resolvedSourcePath $fileName
        if (-not (Test-Path -LiteralPath $sourceFile -PathType Leaf)) {
            throw "Publish output is missing required hotfix file '$fileName'."
        }
    }

    Write-Host ("Selective IIS hotfix deploy: {0} -> {1}" -f ($hotfixFiles -join ", "), $resolvedTargetPath)
    Write-Host "Preserving deployed frontend, configuration, resources, dependencies, and logs."

    # Copy symbols first so a failed DLL copy leaves the running application binary unchanged.
    foreach ($fileName in $hotfixFiles) {
        $sourceFile = Join-Path $resolvedSourcePath $fileName
        $targetFile = Join-Path $resolvedTargetPath $fileName
        Copy-Item -LiteralPath $sourceFile -Destination $targetFile -Force -ErrorAction Stop

        $sourceSha256 = Get-FileSha256 -Path $sourceFile
        $targetSha256 = Get-FileSha256 -Path $targetFile
        if (-not [string]::Equals($sourceSha256, $targetSha256, [System.StringComparison]::OrdinalIgnoreCase)) {
            throw "Selective IIS hotfix copy verification failed for '$fileName'."
        }
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
$HasDeployedHotfixBaseCommit = -not [string]::IsNullOrWhiteSpace($DeployedHotfixBaseCommit)
$HasDeployedHotfixBaseSha256 = -not [string]::IsNullOrWhiteSpace($DeployedHotfixBaseSha256)
$IsLiveProductionHotfix = $CurrentBranch -match '(?i)^hotfix/.+'
$ValidatedDeployedHotfixBase = $null

if ($IsLiveProductionHotfix) {
    $ValidatedDeployedHotfixBase = Assert-DeployedHotfixBase `
        -BranchName $CurrentBranch `
        -ExplicitTargetEnvironment $TargetEnvironment `
        -BaseCommit $DeployedHotfixBaseCommit `
        -BaseSha256 $DeployedHotfixBaseSha256 `
        -IisPath $IisPath `
        -RestartIisRequested ([bool]$RestartIis)
    Assert-HotfixProtectedPathsUnchanged -BaseCommit $ValidatedDeployedHotfixBase.Commit
    Assert-HotfixWorkingTreeClean
    $CurrentBranchEnvironment = "PROD"
}
elseif ($HasDeployedHotfixBaseCommit -or $HasDeployedHotfixBaseSha256) {
    throw "DeployedHotfixBaseCommit and DeployedHotfixBaseSha256 are only valid from a 'hotfix/*' branch. Current branch: '$CurrentBranch'."
}
elseif ([string]::IsNullOrWhiteSpace($CurrentBranchEnvironment)) {
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
if ($IsLiveProductionHotfix) {
    Write-Host ("Live production hotfix guard: deployedCommit={0}; deployedSha256={1}; ancestorOfHead=true; deployFiles=IND_CRM_APP.dll,IND_CRM_APP.pdb" -f $ValidatedDeployedHotfixBase.Commit, $ValidatedDeployedHotfixBase.Sha256)
}

# Block deployment if any localization file has encoding corruption markers.
node scripts/check-resx-encoding.mjs
if ($LASTEXITCODE -ne 0) {
    throw "RESX encoding validation failed with exit code $LASTEXITCODE."
}

node scripts/check-localization-keys.mjs
if ($LASTEXITCODE -ne 0) {
    throw "Localization key coverage validation failed with exit code $LASTEXITCODE."
}

if ($IsLiveProductionHotfix) {
    # The selective hotfix preserves every deployed frontend file and skips asset generation.
    Write-Host "Skipping frontend build and wwwroot sync for selective live production hotfix."
}
else {
    # Build frontend assets and sync Web/wwwroot -> wwwroot for normal deployments.
    npm run build:react:prod
    if ($LASTEXITCODE -ne 0) {
        throw "React frontend build failed with exit code $LASTEXITCODE."
    }

    npm run build:css
    if ($LASTEXITCODE -ne 0) {
        throw "CSS build failed with exit code $LASTEXITCODE."
    }

    Sync-WebWwwrootMirror
}

# Publish the project directly to avoid solution-level output warnings.
$ResolvedOutputPath = Resolve-PublishOutputPath -OutputPath $OutputPath -RepositoryRoot $PSScriptRoot
Clear-PublishOutput -ResolvedOutputPath $ResolvedOutputPath
dotnet publish $ProjectPath -c $Configuration -o $ResolvedOutputPath
if ($LASTEXITCODE -ne 0) {
    throw "Publish failed with exit code $LASTEXITCODE."
}

if ($IsLiveProductionHotfix) {
    $null = Assert-StagedHotfixAssembly -SourcePath $ResolvedOutputPath
    Assert-PublishedRuntimeContract -SourcePath $ResolvedOutputPath -TargetPath $IisPath

    # Revalidate immediately before stopping IIS so a concurrent deployment blocks this hotfix.
    $null = Assert-DeployedHotfixBase `
        -BranchName $CurrentBranch `
        -ExplicitTargetEnvironment $TargetEnvironment `
        -BaseCommit $DeployedHotfixBaseCommit `
        -BaseSha256 $DeployedHotfixBaseSha256 `
        -IisPath $IisPath `
        -RestartIisRequested ([bool]$RestartIis)
}

$deploymentFailure = $null
try {
    # Always attempt recovery even when stopping IIS fails partway through.
    if ($RestartIis) {
        iisreset /stop
        if ($LASTEXITCODE -ne 0) {
            throw "Failed to stop IIS."
        }
    }

    if ($IsLiveProductionHotfix) {
        # Recheck after IIS stops and immediately before copying either hotfix file.
        Assert-PublishedRuntimeContract -SourcePath $ResolvedOutputPath -TargetPath $IisPath
        $null = Assert-DeployedHotfixBase `
            -BranchName $CurrentBranch `
            -ExplicitTargetEnvironment $TargetEnvironment `
            -BaseCommit $DeployedHotfixBaseCommit `
            -BaseSha256 $DeployedHotfixBaseSha256 `
            -IisPath $IisPath `
            -RestartIisRequested ([bool]$RestartIis)
        Invoke-LiveProductionHotfixDeploy -SourcePath $ResolvedOutputPath -TargetPath $IisPath -CanonicalTargetPath $CanonicalIisPath
    }
    else {
        Invoke-CleanIisDeploy -SourcePath $ResolvedOutputPath -TargetPath $IisPath -CanonicalTargetPath $CanonicalIisPath
    }
}
catch {
    $deploymentFailure = $_
    throw
}
finally {
    if ($RestartIis) {
        iisreset /start
        if ($LASTEXITCODE -ne 0) {
            $failureDetail = if ($null -ne $deploymentFailure) { " Deployment also failed: $($deploymentFailure.Exception.Message)" } else { "" }
            throw "Failed to start IIS after deployment.$failureDetail"
        }
    }
}
