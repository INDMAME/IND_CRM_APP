$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

function Assert-True {
    # Fails this standalone test when a gate condition is not satisfied.
    param(
        [Parameter(Mandatory = $true)]
        [bool]$Condition,
        [Parameter(Mandatory = $true)]
        [string]$Message
    )

    if (-not $Condition) {
        throw $Message
    }
}

function Assert-ThrowsLike {
    # Verifies that a guarded call fails with the expected message fragment.
    param(
        [Parameter(Mandatory = $true)]
        [scriptblock]$Action,
        [Parameter(Mandatory = $true)]
        [string]$ExpectedMessage
    )

    try {
        & $Action
    }
    catch {
        Assert-True `
            -Condition ($_.Exception.Message -like "*$ExpectedMessage*") `
            -Message "Expected error containing '$ExpectedMessage' but received '$($_.Exception.Message)'."
        return
    }

    throw "Expected guarded call to fail with '$ExpectedMessage'."
}

$publishPath = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot "..\publish.ps1"))
$tokens = $null
$parseErrors = $null
$ast = [System.Management.Automation.Language.Parser]::ParseFile(
    $publishPath,
    [ref]$tokens,
    [ref]$parseErrors)

Assert-True -Condition ($parseErrors.Count -eq 0) -Message "publish.ps1 contains PowerShell parse errors."

$functionNames = @(
    "Normalize-BranchEnvironment",
    "Resolve-GitCommit",
    "Get-FileSha256",
    "Get-AssemblyProductCommit",
    "Assert-HotfixProtectedPathsUnchanged",
    "Assert-HotfixWorkingTreeClean",
    "Assert-DeployedHotfixBase",
    "Assert-PublishedRuntimeContract",
    "Assert-StagedHotfixAssembly",
    "Invoke-LiveProductionHotfixDeploy"
)

$loadedFunctions = @{}
# Load only function definitions so this test cannot execute build or deployment statements.
foreach ($functionName in $functionNames) {
    $functionAst = $ast.Find(
        {
            param($node)
            $node -is [System.Management.Automation.Language.FunctionDefinitionAst] -and
            $node.Name -eq $functionName
        },
        $true)

    Assert-True -Condition ($null -ne $functionAst) -Message "Missing function '$functionName' in publish.ps1."
    $loadedFunctions[$functionName] = $functionAst.Extent.Text
    Invoke-Expression $functionAst.Extent.Text
}

$selectiveDeployText = $loadedFunctions["Invoke-LiveProductionHotfixDeploy"]
Assert-True `
    -Condition ($selectiveDeployText -notmatch '(?i)robocopy|/MIR') `
    -Message "Selective hotfix deploy must not mirror the IIS site."
Assert-True `
    -Condition ($selectiveDeployText -match 'IND_CRM_APP\.pdb' -and $selectiveDeployText -match 'IND_CRM_APP\.dll') `
    -Message "Selective hotfix deploy must contain only the main DLL and PDB copy list."

$publishText = Get-Content -LiteralPath $publishPath -Raw
Assert-True `
    -Condition ($publishText -match 'if \(\$IsLiveProductionHotfix\)[\s\S]*Skipping frontend build and wwwroot sync[\s\S]*else[\s\S]*npm run build:react:prod') `
    -Message "Live hotfix flow must skip frontend generation while normal publish retains it."

$script:MockBaseCommit = "1111111111111111111111111111111111111111"
$script:MockHeadCommit = "2222222222222222222222222222222222222222"
$script:MockLiveSha256 = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
$script:MockLiveProductCommit = $script:MockBaseCommit
$script:MockStagedProductCommit = $script:MockHeadCommit
$script:MockAncestorExitCode = 0
$script:MockChangedProtectedPaths = @()
$script:MockUntrackedProtectedPaths = @()
$script:MockWorkingTreeEntries = @()
$script:MockRuntimeMismatch = $false

function git {
    # Simulates only the read-only git commands used by the hotfix gate.
    param(
        [Parameter(ValueFromRemainingArguments = $true)]
        [string[]]$Arguments
    )

    $command = $Arguments -join " "
    if ($command -eq "rev-parse --verify $($script:MockBaseCommit)^{commit}") {
        Set-Variable -Name LASTEXITCODE -Value 0 -Scope 1
        return $script:MockBaseCommit
    }

    if ($command -eq "rev-parse --verify HEAD^{commit}") {
        Set-Variable -Name LASTEXITCODE -Value 0 -Scope 1
        return $script:MockHeadCommit
    }

    if ($command -eq "merge-base --is-ancestor $($script:MockBaseCommit) HEAD") {
        Set-Variable -Name LASTEXITCODE -Value $script:MockAncestorExitCode -Scope 1
        return
    }

    if ($command.StartsWith("diff --name-only $($script:MockBaseCommit) ", [System.StringComparison]::Ordinal)) {
        Set-Variable -Name LASTEXITCODE -Value 0 -Scope 1
        return $script:MockChangedProtectedPaths
    }

    if ($command.StartsWith("ls-files --others --exclude-standard ", [System.StringComparison]::Ordinal)) {
        Set-Variable -Name LASTEXITCODE -Value 0 -Scope 1
        return $script:MockUntrackedProtectedPaths
    }

    if ($command -eq "status --porcelain=v1 --untracked-files=all") {
        Set-Variable -Name LASTEXITCODE -Value 0 -Scope 1
        return $script:MockWorkingTreeEntries
    }

    throw "Unexpected git command in isolated gate test: $command"
}

function Get-FileSha256 {
    # Supplies deterministic live and staged hashes without reading deployment files.
    param(
        [Parameter(Mandatory = $true)]
        [string]$Path
    )

    $fileName = [System.IO.Path]::GetFileName($Path)
    if ($fileName -eq "IND_CRM_APP.dll") {
        return $script:MockLiveSha256
    }

    if ($fileName -in @("IND_CRM_APP.deps.json", "IND_CRM_APP.runtimeconfig.json")) {
        if ($script:MockRuntimeMismatch -and $Path -like "*live*") {
            return "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
        }

        return "cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc"
    }

    throw "Unexpected hash path in isolated gate test: $Path"
}

function Get-AssemblyProductCommit {
    # Supplies ProductVersion commits without loading a real deployment assembly.
    param(
        [Parameter(Mandatory = $true)]
        [string]$AssemblyPath
    )

    if ($AssemblyPath -like "*stage*") {
        return $script:MockStagedProductCommit
    }

    return $script:MockLiveProductCommit
}

function Test-Path {
    # The isolated staged-PDB check uses a synthetic path and performs no file access.
    param(
        [string]$LiteralPath,
        [object]$PathType
    )

    return $true
}

$result = Assert-DeployedHotfixBase `
    -BranchName "hotfix/company-owner" `
    -ExplicitTargetEnvironment "PROD" `
    -BaseCommit $script:MockBaseCommit `
    -BaseSha256 $script:MockLiveSha256 `
    -IisPath "C:\live" `
    -RestartIisRequested $true
Assert-True -Condition ($result.Commit -eq $script:MockBaseCommit) -Message "Valid deployed-base hotfix was rejected."
Assert-True -Condition ($result.Sha256 -eq $script:MockLiveSha256) -Message "Validated live SHA256 was not returned."

Assert-HotfixProtectedPathsUnchanged -BaseCommit $script:MockBaseCommit
Assert-HotfixWorkingTreeClean
Assert-PublishedRuntimeContract -SourcePath "C:\stage" -TargetPath "C:\live"
$stagedCommit = Assert-StagedHotfixAssembly -SourcePath "C:\stage"
Assert-True -Condition ($stagedCommit -eq $script:MockHeadCommit) -Message "Staged hotfix commit was not validated."

Assert-ThrowsLike `
    -Action { Assert-DeployedHotfixBase -BranchName "hotfix/company-owner" -ExplicitTargetEnvironment "PROD" -BaseCommit "abc" -BaseSha256 $script:MockLiveSha256 -IisPath "C:\live" -RestartIisRequested $true } `
    -ExpectedMessage "exactly 40 hexadecimal"
Assert-ThrowsLike `
    -Action { Assert-DeployedHotfixBase -BranchName "hotfix/company-owner" -ExplicitTargetEnvironment "PROD" -BaseCommit $script:MockBaseCommit -BaseSha256 "abc" -IisPath "C:\live" -RestartIisRequested $true } `
    -ExpectedMessage "exactly 64 hexadecimal"
Assert-ThrowsLike `
    -Action { Assert-DeployedHotfixBase -BranchName "hotfix/company-owner" -ExplicitTargetEnvironment "DEV" -BaseCommit $script:MockBaseCommit -BaseSha256 $script:MockLiveSha256 -IisPath "C:\live" -RestartIisRequested $true } `
    -ExpectedMessage "requires explicit -TargetEnvironment PROD"
Assert-ThrowsLike `
    -Action { Assert-DeployedHotfixBase -BranchName "PROD" -ExplicitTargetEnvironment "PROD" -BaseCommit $script:MockBaseCommit -BaseSha256 $script:MockLiveSha256 -IisPath "C:\live" -RestartIisRequested $true } `
    -ExpectedMessage "only valid from a 'hotfix/*' branch"
Assert-ThrowsLike `
    -Action { Assert-DeployedHotfixBase -BranchName "hotfix/company-owner" -ExplicitTargetEnvironment "PROD" -BaseCommit $script:MockBaseCommit -BaseSha256 $script:MockLiveSha256 -IisPath "C:\live" -RestartIisRequested $false } `
    -ExpectedMessage "requires IIS restart protection"

$script:MockAncestorExitCode = 1
Assert-ThrowsLike `
    -Action { Assert-DeployedHotfixBase -BranchName "hotfix/company-owner" -ExplicitTargetEnvironment "PROD" -BaseCommit $script:MockBaseCommit -BaseSha256 $script:MockLiveSha256 -IisPath "C:\live" -RestartIisRequested $true } `
    -ExpectedMessage "is not an ancestor of HEAD"
$script:MockAncestorExitCode = 0

$script:MockLiveSha256 = "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
Assert-ThrowsLike `
    -Action { Assert-DeployedHotfixBase -BranchName "hotfix/company-owner" -ExplicitTargetEnvironment "PROD" -BaseCommit $script:MockBaseCommit -BaseSha256 "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" -IisPath "C:\live" -RestartIisRequested $true } `
    -ExpectedMessage "SHA256 no longer matches"
$script:MockLiveSha256 = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"

$script:MockLiveProductCommit = "3333333333333333333333333333333333333333"
Assert-ThrowsLike `
    -Action { Assert-DeployedHotfixBase -BranchName "hotfix/company-owner" -ExplicitTargetEnvironment "PROD" -BaseCommit $script:MockBaseCommit -BaseSha256 $script:MockLiveSha256 -IisPath "C:\live" -RestartIisRequested $true } `
    -ExpectedMessage "ProductVersion commit"
$script:MockLiveProductCommit = $script:MockBaseCommit

$script:MockChangedProtectedPaths = @("Program.cs")
Assert-ThrowsLike `
    -Action { Assert-HotfixProtectedPathsUnchanged -BaseCommit $script:MockBaseCommit } `
    -ExpectedMessage "Protected hotfix inputs differ"
$script:MockChangedProtectedPaths = @()

$script:MockWorkingTreeEntries = @(" M Web/Controllers/Gastos/GastosController.cs")
Assert-ThrowsLike `
    -Action { Assert-HotfixWorkingTreeClean } `
    -ExpectedMessage "requires a clean git working tree"
$script:MockWorkingTreeEntries = @()

$script:MockRuntimeMismatch = $true
Assert-ThrowsLike `
    -Action { Assert-PublishedRuntimeContract -SourcePath "C:\stage" -TargetPath "C:\live" } `
    -ExpectedMessage "runtime contract mismatch"
$script:MockRuntimeMismatch = $false

$script:MockStagedProductCommit = "4444444444444444444444444444444444444444"
Assert-ThrowsLike `
    -Action { Assert-StagedHotfixAssembly -SourcePath "C:\stage" } `
    -ExpectedMessage "does not match HEAD"

Assert-True `
    -Condition ((Normalize-BranchEnvironment -BranchName "PROD") -eq "PROD") `
    -Message "Regular PROD branch mapping changed unexpectedly."

Write-Host "publish live hotfix gate tests passed"
