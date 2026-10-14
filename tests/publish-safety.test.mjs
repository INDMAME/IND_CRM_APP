import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

// Runs only extracted functions; appcmd and IIS copying are replaced before any deployment call.
for (const shell of ["powershell.exe", "pwsh.exe"]) {
  test(`publish guards preserve files and scope pool actions in ${shell}`, () => {
    const repoRoot = path.resolve(import.meta.dirname, "..");
    const fixture = mkdtempSync(path.join(tmpdir(), "ind-publish-safety-"));
    const harness = path.join(fixture, "Verify.ps1");
    try {
      writeFileSync(harness, `
param([string]$PublishScript, [string]$FixtureRoot)
$ErrorActionPreference = 'Stop'
$FixtureRoot = [System.IO.Path]::GetFullPath($FixtureRoot)
$parseErrors = $null
$tokens = $null
$ast = [System.Management.Automation.Language.Parser]::ParseFile($PublishScript, [ref]$tokens, [ref]$parseErrors)
if ($parseErrors.Count -gt 0) { throw ($parseErrors -join '; ') }
foreach ($definition in $ast.FindAll({ param($node) $node -is [System.Management.Automation.Language.FunctionDefinitionAst] }, $false)) {
    . ([scriptblock]::Create($definition.Extent.Text))
}

# Counts public helper behaviors with real disposable filesystem fixtures.
$script:checks = 0
function Require([bool]$Condition, [string]$Message) {
    if (-not $Condition) { throw $Message }
    $script:checks++
}
function Reject([scriptblock]$Action, [string]$Message) {
    $rejected = $false
    try { & $Action | Out-Null } catch { $rejected = $true }
    Require $rejected $Message
}
$repository = Join-Path $FixtureRoot 'repo'
$staging = Join-Path $repository '.publish_tmp'
$custom = Join-Path $staging 'custom'
$source = Join-Path $repository 'Web'
New-Item -Path $custom, $source -ItemType Directory -Force | Out-Null
$sentinel = Join-Path $source 'preserve.txt'
Set-Content -LiteralPath $sentinel -Value 'preserve'
Require ((Resolve-PublishOutputPath '.publish_tmp' $repository) -eq $staging) 'Default staging rejected'
Require ((Resolve-PublishOutputPath '.publish_tmp/custom' $repository) -eq $custom) 'Custom staging rejected'
foreach ($unsafe in @('.', 'Web', 'App', '.git', '.publish_tmp/../Web', '.publish_tmp/.git', $FixtureRoot)) {
    Reject { Resolve-PublishOutputPath $unsafe $repository } "Unsafe output accepted: $unsafe"
}
Reject { Clear-PublishOutput -ResolvedOutputPath $source -RepositoryRoot $repository } 'Direct cleanup bypassed validation'
Require (Test-Path -LiteralPath $sentinel) 'Source file was removed'

# Reject both an output junction and one nested below the cleanup root.
$junction = Join-Path $staging 'linked'
New-Item -ItemType Junction -Path $junction -Target $source | Out-Null
try {
    Reject { Resolve-PublishOutputPath $junction $repository } 'Output junction accepted'
    Reject { Resolve-PublishOutputPath (Join-Path $junction 'child') $repository } 'Ancestor junction accepted'
    Reject { Clear-PublishOutput -ResolvedOutputPath $staging -RepositoryRoot $repository } 'Nested junction accepted'
    Require (Test-Path -LiteralPath $sentinel) 'Junction target file was removed'
} finally {
    [System.IO.Directory]::Delete($junction)
}
Set-Content -LiteralPath (Join-Path $custom 'stale.txt') -Value 'stale'
Clear-PublishOutput -ResolvedOutputPath $custom -RepositoryRoot $repository
Require (-not (Test-Path -LiteralPath $custom)) 'Safe stale output was not removed'
Require (Test-Path -LiteralPath $sentinel) 'Safe cleanup changed source'

# Replace the external boundary with deterministic appcmd responses and state transitions.
$script:canonical = Join-Path $FixtureRoot 'iis'
New-Item -Path $script:canonical -ItemType Directory -Force | Out-Null
function Reset-Mocks {
    $script:poolState = 'Started'
    $script:commands = New-Object 'System.Collections.Generic.List[string]'
    $script:deployCount = 0
    $script:copyFails = $false
    $script:startFails = $false
    $script:stopFails = $false
    $script:sharedPool = $false
    $script:wrongPath = $false
    $script:wrongPool = $false
}
function Invoke-CrmAppCmd {
    param([string[]]$Arguments)
    $command = $Arguments -join ' '
    $script:commands.Add($command)
    if ($command -eq 'list app /xml') {
        $crmPool = if ($script:wrongPool) { 'WrongPool' } else { 'IND_CRM_APP' }
        $bookingPool = if ($script:sharedPool) { 'IND_CRM_APP' } else { 'BookingPool' }
        return "<appcmd><APP path='/' APP.NAME='IND_CRM_APP/' APPPOOL.NAME='$crmPool' SITE.NAME='IND_CRM_APP' /><APP path='/' APP.NAME='Booking/' APPPOOL.NAME='$bookingPool' SITE.NAME='Booking' /></appcmd>"
    }
    if ($command -eq 'list vdir /xml') {
        $physical = if ($script:wrongPath) { Join-Path $FixtureRoot 'booking' } else { $script:canonical }
        $physical = [System.Security.SecurityElement]::Escape($physical)
        return "<appcmd><VDIR physicalPath='$physical' path='/' APP.NAME='IND_CRM_APP/' /></appcmd>"
    }
    if ($command -eq 'list apppool IND_CRM_APP /text:state') { return $script:poolState }
    if ($command -eq 'stop apppool /apppool.name:IND_CRM_APP') {
        if ($script:stopFails) { throw 'Simulated pool stop failure' }
        $script:poolState = 'Stopped'
        return ''
    }
    if ($command -eq 'start apppool /apppool.name:IND_CRM_APP') {
        if ($script:startFails) { throw 'Simulated pool start failure' }
        $script:poolState = 'Started'
        return ''
    }
    throw "Unexpected IIS command: $command"
}
function Invoke-CleanIisDeploy {
    param([string]$SourcePath, [string]$TargetPath, [string]$CanonicalTargetPath)
    Require ($TargetPath -eq $script:canonical -and $CanonicalTargetPath -eq $script:canonical) 'Wrong deploy target'
    $script:deployCount++
    if ($script:copyFails) { throw 'Simulated copy failure' }
}

Reset-Mocks
Invoke-CrmScopedIisDeploy -SourcePath $staging -CanonicalTargetPath $script:canonical
Require ($script:deployCount -eq 1 -and $script:poolState -eq 'Started') 'Running pool was not restored'
Require (@($script:commands | Where-Object { $_ -like 'stop *' }).Count -eq 1) 'Expected one CRM stop'
Require (@($script:commands | Where-Object { $_ -like 'start *' }).Count -eq 1) 'Expected one CRM start'

Reset-Mocks
$script:poolState = 'Stopped'
Invoke-CrmScopedIisDeploy -SourcePath $staging -CanonicalTargetPath $script:canonical
Require ($script:poolState -eq 'Stopped' -and $script:deployCount -eq 1) 'Initially stopped pool was started'
Require (@($script:commands | Where-Object { $_ -match '^(start|stop) ' }).Count -eq 0) 'Stopped pool was mutated'

Reset-Mocks
$script:copyFails = $true
Reject { Invoke-CrmScopedIisDeploy -SourcePath $staging -CanonicalTargetPath $script:canonical } 'Copy failure was swallowed'
Require ($script:poolState -eq 'Started') 'Copy failure left CRM stopped'

Reset-Mocks
$script:startFails = $true
Reject { Invoke-CrmScopedIisDeploy -SourcePath $staging -CanonicalTargetPath $script:canonical } 'Restart failure was swallowed'

Reset-Mocks
$script:stopFails = $true
Reject { Invoke-CrmScopedIisDeploy -SourcePath $staging -CanonicalTargetPath $script:canonical } 'Stop failure was swallowed'
Require ($script:poolState -eq 'Started' -and $script:deployCount -eq 0) 'Stop failure copied files or left CRM stopped'

Reset-Mocks
$script:poolState = 'Starting'
Reject { Invoke-CrmScopedIisDeploy -SourcePath $staging -CanonicalTargetPath $script:canonical } 'Transitional pool state accepted'
Require ($script:deployCount -eq 0) 'Transitional pool copied files'

Reset-Mocks
Invoke-CrmScopedIisDeploy -SourcePath $staging -CanonicalTargetPath $script:canonical -RestartPool $false
Require (@($script:commands | Where-Object { $_ -match '^(start|stop) ' }).Count -eq 0) 'Disabled restart changed pool state'

foreach ($badConfig in @('sharedPool', 'wrongPath', 'wrongPool')) {
    Reset-Mocks
    Set-Variable -Name $badConfig -Value $true -Scope Script
    Reject { Invoke-CrmScopedIisDeploy -SourcePath $staging -CanonicalTargetPath $script:canonical } "Invalid IIS config accepted: $badConfig"
    Require ($script:deployCount -eq 0) 'Invalid IIS config copied files'
    Require (@($script:commands | Where-Object { $_ -match '^(start|stop) ' }).Count -eq 0) 'Invalid IIS config changed pool state'
}
Write-Output "Verified $script:checks publish safety checks."
`);
      const result = spawnSync(shell, ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", harness,
        "-PublishScript", path.join(repoRoot, "publish.ps1"), "-FixtureRoot", fixture],
      { cwd: fixture, encoding: "utf8", timeout: 120000 });
      assert.equal(result.status, 0, result.stdout + result.stderr);
      assert.match(result.stdout, /Verified \d+ publish safety checks\./u);
    } finally {
      const resolved = path.resolve(fixture);
      assert.equal(path.dirname(resolved), path.resolve(tmpdir()));
      assert.ok(path.basename(resolved).startsWith("ind-publish-safety-"));
      rmSync(resolved, { recursive: true, force: true });
    }
  });
}
