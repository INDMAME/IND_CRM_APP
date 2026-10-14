[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [string]$PublishOutputPath,
    [Parameter(Mandatory = $true)]
    [string]$IisPath
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$ManifestFileName = "ind-static-chunks-v1.json"
$MaximumManifestFiles = 1000

# Rejects path traversal and non-esbuild file names before any copy.
function Test-SafeChunkFileName {
    param(
        [AllowNull()]
        [string]$FileName
    )

    if ([string]::IsNullOrWhiteSpace($FileName) -or $FileName.Contains("..")) {
        return $false
    }

    if (-not [string]::Equals(
        [System.IO.Path]::GetFileName($FileName),
        $FileName,
        [System.StringComparison]::Ordinal)) {
        return $false
    }

    return $FileName -match '^[A-Za-z0-9][A-Za-z0-9_-]*-[A-Za-z0-9]{8}\.js$'
}

# Normalizes and bounds a collection of generated chunk names.
function Get-SafeChunkNames {
    param(
        [object[]]$Names
    )

    $safeNames = @(
        $Names |
            ForEach-Object { [string]$_ } |
            Where-Object { Test-SafeChunkFileName -FileName $_ } |
            Sort-Object -Unique
    )

    if ($safeNames.Count -gt $MaximumManifestFiles) {
        throw "Chunk manifest exceeds the safe limit of $MaximumManifestFiles files."
    }

    return $safeNames
}

# Reads a deployed chunk directory through the same name validation.
function Get-DeployedChunkNames {
    param(
        [Parameter(Mandatory = $true)]
        [string]$ChunkPath
    )

    if (-not (Test-Path -LiteralPath $ChunkPath -PathType Container)) {
        return @()
    }

    return @(
        Get-SafeChunkNames -Names @(
            Get-ChildItem -LiteralPath $ChunkPath -File -Filter "*.js" |
                Select-Object -ExpandProperty Name
        )
    )
}

# Keeps one prior generated chunk set so an already-open tab survives the next deploy.
$resolvedPublishOutputPath = [System.IO.Path]::GetFullPath($PublishOutputPath).TrimEnd("\")
$resolvedIisPath = [System.IO.Path]::GetFullPath($IisPath).TrimEnd("\")
$publishChunkPath = Join-Path $resolvedPublishOutputPath "wwwroot\js\chunks"
$deployedChunkPath = Join-Path $resolvedIisPath "wwwroot\js\chunks"
$deployedManifestPath = Join-Path $resolvedIisPath $ManifestFileName
$publishManifestPath = Join-Path $resolvedPublishOutputPath $ManifestFileName

if (-not (Test-Path -LiteralPath $resolvedPublishOutputPath -PathType Container)) {
    throw "Publish output '$resolvedPublishOutputPath' does not exist."
}

if (-not (Test-Path -LiteralPath $publishChunkPath -PathType Container)) {
    throw "Published chunk directory '$publishChunkPath' does not exist."
}

$currentChunkNames = @(
    Get-SafeChunkNames -Names @(
        Get-ChildItem -LiteralPath $publishChunkPath -File -Filter "*.js" |
            Select-Object -ExpandProperty Name
    )
)

if ($currentChunkNames.Count -eq 0) {
    throw "Published chunk directory '$publishChunkPath' contains no valid generated JavaScript chunks."
}

$previousChunkNames = @()
if (Test-Path -LiteralPath $deployedManifestPath -PathType Leaf) {
    try {
        $previousManifest = Get-Content -LiteralPath $deployedManifestPath -Raw | ConvertFrom-Json
        if ([int]$previousManifest.version -ne 1) {
            throw "Unsupported chunk manifest version."
        }

        $filesProperty = $previousManifest.PSObject.Properties["files"]
        if ($null -eq $filesProperty) {
            throw "Chunk manifest files are missing."
        }

        $manifestChunkNames = @($filesProperty.Value)
        $previousChunkNames = @(Get-SafeChunkNames -Names $manifestChunkNames)
        if ($manifestChunkNames.Count -eq 0 -or $previousChunkNames.Count -eq 0) {
            throw "Chunk manifest contains no valid files."
        }
    }
    catch {
        Write-Warning "Ignoring invalid deployed chunk manifest '$deployedManifestPath': $($_.Exception.Message)"
        $previousChunkNames = @(Get-DeployedChunkNames -ChunkPath $deployedChunkPath)
    }
}
elseif (Test-Path -LiteralPath $deployedChunkPath -PathType Container) {
    # The first guarded deployment adopts the currently deployed generation.
    $previousChunkNames = @(Get-DeployedChunkNames -ChunkPath $deployedChunkPath)
}

$preservedCount = 0
foreach ($chunkName in $previousChunkNames) {
    $sourcePath = Join-Path $deployedChunkPath $chunkName
    $destinationPath = Join-Path $publishChunkPath $chunkName
    if ((Test-Path -LiteralPath $sourcePath -PathType Leaf) -and
        -not (Test-Path -LiteralPath $destinationPath -PathType Leaf)) {
        Copy-Item -LiteralPath $sourcePath -Destination $destinationPath
        $preservedCount += 1
    }
}

$manifest = [ordered]@{
    version = 1
    files = @($currentChunkNames)
}
$manifestJson = $manifest | ConvertTo-Json -Depth 3
[System.IO.File]::WriteAllText(
    $publishManifestPath,
    $manifestJson + [Environment]::NewLine,
    [System.Text.UTF8Encoding]::new($false)
)

Write-Host ("Static chunk retention: current={0}; preservedPrevious={1}" -f $currentChunkNames.Count, $preservedCount)
