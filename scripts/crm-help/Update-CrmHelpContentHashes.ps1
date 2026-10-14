[CmdletBinding()]
param(
    [string]$RootPath
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
if (-not $RootPath) {
    $RootPath = Join-Path $repoRoot "docs\crm-help"
}
$RootPath = (Resolve-Path -LiteralPath $RootPath).Path

$updated = 0
foreach ($topicFile in Get-ChildItem -LiteralPath (Join-Path $RootPath "modules") -Recurse -Filter "topic.json" -File | Sort-Object FullName) {
    $contentPath = Join-Path $topicFile.DirectoryName "content.es-ES.md"
    if (-not (Test-Path -LiteralPath $contentPath -PathType Leaf)) {
        throw "Missing canonical content for '$($topicFile.FullName)'."
    }

    $hash = (Get-FileHash -Algorithm SHA256 -LiteralPath $contentPath).Hash
    $json = [IO.File]::ReadAllText($topicFile.FullName, $Utf8NoBom)
    $pattern = '("contentHash"\s*:\s*")[A-Fa-f0-9]{64}(")'
    $matches = [regex]::Matches($json, $pattern)
    if ($matches.Count -ne 1) {
        throw "Expected exactly one contentHash in '$($topicFile.FullName)', found $($matches.Count)."
    }

    $currentHash = $matches[0].Groups[0].Value
    if ($currentHash -notmatch [regex]::Escape($hash)) {
        $updatedJson = [regex]::Replace($json, $pattern, "`${1}$hash`${2}")
        [IO.File]::WriteAllText($topicFile.FullName, ($updatedJson -replace "`r`n", "`n"), $Utf8NoBom)
        $updated++
    }
}

[pscustomobject][ordered]@{
    updatedTopicHashes = $updated
    rootPath = $RootPath
} | ConvertTo-Json
